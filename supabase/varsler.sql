-- Axle: daglige påminnelser i nettleseren (web push).
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql er kjørt først, og at Edge Function «varsler» er lagt inn (se supabase/functions/varsler).

-- Én rad per nettleser som har slått på påminnelser.
create table if not exists public.push_subs (
  endpoint   text primary key check (char_length(endpoint) < 1000 and endpoint like 'https://%'),
  user_id    uuid not null references auth.users (id) on delete cascade,
  p256dh     text not null check (char_length(p256dh) < 200),
  auth       text not null check (char_length(auth) < 100),
  tz         text not null default 'Europe/Oslo' check (char_length(tz) < 64),
  remind_at  text not null default '19:00' check (remind_at ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  lang       text not null default 'nb' check (lang in ('nb', 'en')),
  main_day   text,   -- dagen (lokal dato) hovedpåminnelsen sist ble sendt
  late_day   text,   -- dagen «siste sjanse»-påminnelsen sist ble sendt
  created_at timestamptz not null default now()
);
create index if not exists push_subs_user_idx on public.push_subs (user_id);
alter table public.push_subs enable row level security;
revoke all on public.push_subs from anon, authenticated;

-- Lagre (eller flytte) et abonnement til den innloggede brukeren. Maks 10 nettlesere per bruker.
create or replace function public.save_push_sub(p_endpoint text, p_p256dh text, p_auth text, p_tz text, p_remind_at text, p_lang text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  delete from public.push_subs where endpoint = p_endpoint;
  if (select count(*) from public.push_subs where user_id = me) >= 10 then
    delete from public.push_subs where endpoint = (select endpoint from public.push_subs where user_id = me order by created_at limit 1);
  end if;
  insert into public.push_subs (endpoint, user_id, p256dh, auth, tz, remind_at, lang)
  values (p_endpoint, me, p_p256dh, p_auth, coalesce(nullif(p_tz, ''), 'Europe/Oslo'), coalesce(nullif(p_remind_at, ''), '19:00'), case when p_lang = 'en' then 'en' else 'nb' end);
end;
$$;

-- Slå av påminnelser for én nettleser.
create or replace function public.delete_push_sub(p_endpoint text)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.push_subs where endpoint = p_endpoint and user_id = auth.uid();
$$;

revoke all on function public.save_push_sub(text, text, text, text, text, text) from public, anon;
revoke all on function public.delete_push_sub(text) from public, anon;
grant execute on function public.save_push_sub(text, text, text, text, text, text) to authenticated;
grant execute on function public.delete_push_sub(text) to authenticated;

-- Kjør «varsler» hvert kvarter. Funksjonen sender bare når det er tid for det, og maks to ganger per dag per bruker,
-- så det er trygt at den kalles ofte.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.unschedule(jobid) from cron.job where jobname = 'axle-varsler';
select cron.schedule('axle-varsler', '*/15 * * * *', $cron$
  select net.http_post(
    url := 'https://yhzgdipjpdmovegbkybx.supabase.co/functions/v1/varsler',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
$cron$);
