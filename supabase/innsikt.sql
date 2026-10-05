-- Axle: innsikt for admin – hva folk øver på, hvilke sider de bruker, og hvordan det går.
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql, venner.sql, admin.sql, varsler.sql og tilbakemelding.sql er kjørt først.
--
--   Appen sender små hendelser (skjermbytte, ferdig økt, teori åpnet, opplesing …) i bunter via log_events.
--   Ingen fritekst og ingen svar lagres – bare hva slags hendelse, fag/enhet og tall. Brukeren kan slå det av i Innstillinger.
--   Hendelser eldre enn 180 dager slettes automatisk når nye kommer inn.
--   Mod/admin ser tallene i adminpanelet (fanen «Innsikt») og aktiviteten til hver bruker (fanen «Brukere»).
--   Claude kan hente et sammendrag med samme hemmelige nøkkel som tilbakemeldingene (feedback_export_keys).

create table if not exists public.app_events (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete cascade,
  device text not null check (char_length(device) <= 40),   -- tilfeldig id per nettleser, også uten konto
  ev text not null check (char_length(ev) <= 30),           -- screen, lesson, theory, tts, game, push, signup …
  a text check (char_length(a) <= 60),                      -- f.eks. skjermnavn eller fagkode
  b text check (char_length(b) <= 60),                      -- f.eks. enhet eller modus
  n int,                                                    -- f.eks. antall riktige
  m int,                                                    -- f.eks. antall oppgaver eller sekunder
  lang text, platform text
);
alter table public.app_events enable row level security; -- ingen policyer: bare funksjonene under slipper til
revoke all on public.app_events from anon, authenticated;
create index if not exists app_events_at on public.app_events (at desc);
create index if not exists app_events_user on public.app_events (user_id, at desc);
create index if not exists app_events_ev on public.app_events (ev, at desc);
create index if not exists app_events_dev on public.app_events (device);

-- ---------- logging fra appen (alle) ----------
create or replace function public.log_events(p jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare dev text; e jsonb;
begin
  if jsonb_typeof(p) <> 'array' or jsonb_array_length(p) = 0 then return; end if;
  dev := left(coalesce(p->0->>'d', ''), 40);
  if dev = '' then return; end if;
  -- søppelbrems: maks 1500 hendelser per nettleser per døgn
  if (select count(*) from public.app_events x where x.device = dev and x.at > now() - interval '1 day') > 1500 then return; end if;
  for e in select * from jsonb_array_elements(p) limit 60 loop
    insert into public.app_events (at, device, ev, a, b, n, m, lang, platform)
    values (least(now(), greatest(now() - interval '2 days', coalesce((e->>'t')::timestamptz, now()))), dev,
      left(coalesce(e->>'e', '?'), 30), left(e->>'a', 60), left(e->>'b', 60),
      case when e->>'n' ~ '^-?\d{1,9}$' then (e->>'n')::int end, case when e->>'m' ~ '^-?\d{1,9}$' then (e->>'m')::int end,
      left(e->>'l', 5), left(e->>'p', 12));
  end loop;
  if random() < 0.01 then delete from public.app_events where at < now() - interval '180 days'; end if;
end $$;
revoke all on function public.log_events(jsonb) from public;
grant execute on function public.log_events(jsonb) to anon, authenticated;

-- Statistikken skal ikke telle admin og moderatorer (de tester mye og gir «falske» tall).
-- Hele enheten holdes utenfor hvis den noen gang er brukt av en mod/admin, også før innlogging.
create or replace view public.app_events_clean as
  select e.* from public.app_events e
  where not exists (select 1 from public.app_events x join public.app_roles r on r.user_id = x.user_id where x.device = e.device)
    and not exists (select 1 from public.app_roles r where r.user_id = e.user_id);
revoke all on public.app_events_clean from public, anon, authenticated;

-- ---------- sammendrag (brukes av adminpanelet og av eksporten til Claude) ----------
create or replace function public.insights_core(p_days int)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare since timestamptz := now() - make_interval(days => greatest(1, least(coalesce(p_days, 7), 180)));
begin
  return jsonb_build_object(
    'days', greatest(1, least(coalesce(p_days, 7), 180)),
    'devices', (select count(distinct device) from public.app_events_clean where at > since),
    'users', (select count(distinct user_id) from public.app_events_clean where at > since and user_id is not null),
    'events', (select count(*) from public.app_events_clean where at > since),
    'signups', (select count(*) from auth.users u where u.created_at > since and u.email_confirmed_at is not null and not exists (select 1 from public.app_roles r where r.user_id = u.id)),
    'push_users', (select count(distinct p.user_id) from public.push_subs p where not exists (select 1 from public.app_roles r where r.user_id = p.user_id)),
    'feedback_open', (select count(*) from public.app_feedback where not handled),
    'daily', coalesce((select jsonb_agg(x order by x.day) from (
        select to_char(date_trunc('day', at at time zone 'Europe/Oslo'), 'YYYY-MM-DD') as day, count(distinct device) as devices,
               count(distinct user_id) as users, count(*) filter (where ev = 'lesson') as lessons
        from public.app_events_clean where at > since group by 1) x), '[]'),
    'screens', coalesce((select jsonb_agg(x) from (
        select a as screen, count(*) as views, count(distinct device) as devices from public.app_events
        where at > since and ev = 'screen' group by a order by count(*) desc limit 25) x), '[]'),
    'features', coalesce((select jsonb_agg(x) from (
        select ev || coalesce(':' || case when ev in ('theory', 'push') then b end, '') as feature, count(*) as n, count(distinct device) as devices
        from public.app_events_clean where at > since and ev <> 'screen' group by 1 order by count(*) desc limit 30) x), '[]'),
    'courses', coalesce((select jsonb_agg(x) from (
        select a as course, count(*) as sessions, count(distinct device) as devices, sum(m) as questions,
               round(100.0 * sum(n) / nullif(sum(m) filter (where n is not null), 0)) as accuracy
        from public.app_events_clean where at > since and ev = 'lesson' group by a order by count(*) desc limit 30) x), '[]'),
    'hard_units', coalesce((select jsonb_agg(x) from (
        select a as course, b as unit, count(*) as sessions, round(100.0 * sum(n) / nullif(sum(m) filter (where n is not null), 0)) as accuracy
        from public.app_events_clean where at > since and ev = 'lesson' and b ~ '^\d+$' group by a, b having count(*) >= 3
        order by sum(n)::float / nullif(sum(m) filter (where n is not null), 0) asc nulls last limit 15) x), '[]'),
    'theory', coalesce((select jsonb_agg(x) from (
        select a as course, count(*) as opens, count(distinct device) as devices
        from public.app_events_clean where at > since and ev = 'theory' group by a order by count(*) desc limit 20) x), '[]'),
    'platforms', coalesce((select jsonb_object_agg(coalesce(platform, '?'), c) from (
        select platform, count(distinct device) as c from public.app_events_clean where at > since group by platform) x), '{}'),
    'langs', coalesce((select jsonb_object_agg(coalesce(lang, '?'), c) from (
        select lang, count(distinct device) as c from public.app_events_clean where at > since group by lang) x), '{}'),
    -- kommer nye brukere tilbake? (av dem som ble med i perioden: hvor mange var aktive en senere dag enn den første)
    'returning', (select jsonb_build_object('new', count(*), 'came_back', count(*) filter (where back)) from (
        select u.id, exists (select 1 from public.app_events_clean e where e.user_id = u.id and e.at > u.created_at + interval '20 hours') as back
        from auth.users u where u.created_at > since and u.email_confirmed_at is not null and not exists (select 1 from public.app_roles r where r.user_id = u.id)) z)
  );
end $$;
revoke all on function public.insights_core(int) from public, anon, authenticated;

create or replace function public.admin_insights(p_days int default 7)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return public.insights_core(p_days);
end $$;
revoke all on function public.admin_insights(int) from public, anon;
grant execute on function public.admin_insights(int) to authenticated;

-- ---------- én bruker: aktivitet, innstillinger og varsler ----------
create or replace function public.admin_user_activity(uid uuid)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare st jsonb := (select g.state from public.progress g where g.user_id = uid);
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return jsonb_build_object(
    'push', coalesce((select jsonb_agg(jsonb_build_object('since', s.created_at, 'at', s.remind_at, 'tz', s.tz, 'lang', s.lang, 'last', s.main_day,
        'kind', case when s.endpoint like '%fcm.googleapis%' then 'Chrome/Android' when s.endpoint like '%push.apple%' then 'Safari/iPhone'
                     when s.endpoint like '%mozilla%' then 'Firefox' else 'annen' end)) from public.push_subs s where s.user_id = uid), '[]'),
    'state', case when st is null then null else jsonb_build_object(
        'xp', st->'xp', 'streak', st->'streak', 'goal', st->'goal', 'lang', st->'lang', 'study', st->'study', 'studies', st->'studies',
        'current', st->'current', 'favs', st->'favs', 'reminder', st->'reminder', 'theme', st->'theme', 'updated', (select g.updated_at from public.progress g where g.user_id = uid),
        'courses', (select coalesce(jsonb_object_agg(k, jsonb_build_object('done', (select count(*) from jsonb_object_keys(coalesce(v->'done', '{}'))), 'wrong', jsonb_array_length(coalesce(v->'wrong', '[]')))), '{}')
                    from jsonb_each(coalesce(st->'subjects', '{}')) as t(k, v) where jsonb_typeof(v) = 'object'),
        'days', (select count(*) from jsonb_object_keys(coalesce(st->'daily', '{}'))),
        'theory_seen', (select count(*) from jsonb_object_keys(coalesce(st->'theorySeen', '{}'))),
        'badges', (select count(*) from jsonb_object_keys(case when jsonb_typeof(st->'badges') = 'object' then st->'badges' else '{}' end)),
        'stats_off', st->'noStats') end,
    'events', coalesce((select jsonb_agg(x order by x.at desc) from (
        select e.at, e.ev, e.a, e.b, e.n, e.m, e.platform from public.app_events e where e.user_id = uid order by e.at desc limit 250) x), '[]'),
    'summary', coalesce((select jsonb_agg(x) from (
        select e.a as course, count(*) as sessions, sum(e.m) as questions, round(100.0 * sum(e.n) / nullif(sum(e.m) filter (where e.n is not null), 0)) as accuracy, max(e.at) as last
        from public.app_events e where e.user_id = uid and e.ev = 'lesson' group by e.a order by count(*) desc) x), '[]')
  );
end $$;
revoke all on function public.admin_user_activity(uuid) from public, anon;
grant execute on function public.admin_user_activity(uuid) to authenticated;

-- ---------- eksport til Claude (samme nøkkel som tilbakemeldingene) ----------
create or replace function public.insights_export(p_key text, p_days int default 7)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.feedback_key_ok(p_key) then raise exception 'bad_key'; end if;
  return public.insights_core(p_days) || jsonb_build_object('feedback', public.feedback_export(p_key, false));
end $$;
revoke all on function public.insights_export(text, int) from public;
grant execute on function public.insights_export(text, int) to anon, authenticated;
