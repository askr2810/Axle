-- ============================================================
--  INNHOLD – fagfolk og moderatorer retter oppgaver, teori og emnesider direkte i appen (edit.js).
--  Kjør i Supabase → SQL Editor etter oppsett.sql, venner.sql og admin.sql. Trygg å kjøre flere ganger.
--  Appen virker uten denne filen; da finnes bare innholdet i koden.
--
--  Hver retting er én rad i content_edits: nøkkel (fag|type|id|språk), ny verdi, verdien før, notat og hvem.
--  Alle klienter henter siste aktive retting per nøkkel (content_active) og legger den over innholdet i koden.
--  «Angre» markerer en retting som angret (reverted_at) – da gjelder forrige retting, eller originalen.
--  Ingenting slettes, så endringsloggen er komplett.
--
--  Hvem kan rette: mod og admin (app_roles), og fagfolk i content_editors.
--  Gi noen rettigheter:  insert into public.content_editors (user_id) select id from auth.users where email = 'navn@eksempel.no';
--  (eller trykk «Gjør til fagperson» på brukeren i adminpanelet, som admin).
-- ============================================================

create table if not exists public.content_editors (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  added_by   uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.content_editors enable row level security;
revoke all on public.content_editors from anon, authenticated;

create table if not exists public.content_edits (
  id           bigint generated always as identity primary key,
  ckey         text not null check (ckey ~ '^[A-Z0-9]+\|(q|th|tp)\|[A-Za-z0-9._-]+\|(nb|en)$' and char_length(ckey) < 120),
  val          jsonb not null check (length(val::text) < 60000),
  old          jsonb check (old is null or length(old::text) < 60000),
  note         text check (char_length(note) <= 300),
  author       uuid references auth.users (id) on delete set null,
  author_name  text not null default '',
  created_at   timestamptz not null default now(),
  reverted_at  timestamptz,
  reverted_by  uuid references auth.users (id) on delete set null
);
create index if not exists content_edits_key_idx on public.content_edits (ckey, created_at desc);
alter table public.content_edits enable row level security;
revoke all on public.content_edits from anon, authenticated;

create or replace function public.content_can_edit()
returns boolean language sql stable security definer set search_path = ''
as $$ select auth.uid() is not null and (
  exists (select 1 from public.app_roles r where r.user_id = auth.uid() and r.role in ('mod', 'admin'))
  or exists (select 1 from public.content_editors e where e.user_id = auth.uid())) $$;
revoke all on function public.content_can_edit() from public, anon;
grant execute on function public.content_can_edit() to authenticated;

-- Gjeldende rettinger (siste ikke-angrede per nøkkel). Åpen for alle, også uten konto.
create or replace function public.content_active()
returns jsonb language sql stable security definer set search_path = ''
as $$ select jsonb_build_object(
  'v', (select max(greatest(created_at, coalesce(reverted_at, created_at))) from public.content_edits),
  'items', coalesce((select jsonb_agg(jsonb_build_object('k', ckey, 'v', val)) from (
    select distinct on (ckey) ckey, val from public.content_edits where reverted_at is null order by ckey, created_at desc) x), '[]'::jsonb)) $$;
grant execute on function public.content_active() to anon, authenticated;

create or replace function public.content_save(p_key text, p_val jsonb, p_old jsonb, p_note text, p_name text)
returns bigint language plpgsql volatile security definer set search_path = ''
as $$
declare new_id bigint;
begin
  if not public.content_can_edit() then raise exception 'not_allowed'; end if;
  if (select count(*) from public.content_edits where author = auth.uid() and created_at > now() - interval '1 hour') >= 300 then raise exception 'rate'; end if;
  insert into public.content_edits (ckey, val, old, note, author, author_name)
    values (p_key, p_val, p_old, left(coalesce(btrim(p_note), ''), 300), auth.uid(), left(coalesce(btrim(p_name), ''), 40))
    returning id into new_id;
  return new_id;
end $$;
revoke all on function public.content_save(text, jsonb, jsonb, text, text) from public, anon;
grant execute on function public.content_save(text, jsonb, jsonb, text, text) to authenticated;

-- Endringsloggen: alle rettinger (også angrede), nyeste først. Valgfritt filter på nøkkel eller fag.
create or replace function public.content_log(p_key text default null, p_course text default null, p_limit int default 100)
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.content_can_edit() then raise exception 'not_allowed'; end if;
  return coalesce((select jsonb_agg(row_to_json(x) order by x.created_at desc) from (
    select e.id, e.ckey, e.val, e.old, e.note, e.author_name, e.created_at, e.reverted_at,
           (select p.display_name from public.profiles p where p.user_id = e.reverted_by) as reverted_name
      from public.content_edits e
     where (p_key is null or e.ckey = p_key) and (p_course is null or e.ckey like p_course || '|%')
     order by e.created_at desc limit least(greatest(p_limit, 1), 500)) x), '[]'::jsonb);
end $$;
revoke all on function public.content_log(text, text, int) from public, anon;
grant execute on function public.content_log(text, text, int) to authenticated;

-- Angre en retting, eller gjenopprett en som var angret.
create or replace function public.content_revert(p_id bigint, p_undo boolean default true)
returns void language plpgsql volatile security definer set search_path = ''
as $$
begin
  if not public.content_can_edit() then raise exception 'not_allowed'; end if;
  if p_undo then update public.content_edits set reverted_at = now(), reverted_by = auth.uid() where id = p_id and reverted_at is null;
  else update public.content_edits set reverted_at = null, reverted_by = null where id = p_id; end if;
end $$;
revoke all on function public.content_revert(bigint, boolean) from public, anon;
grant execute on function public.content_revert(bigint, boolean) to authenticated;

-- Admin: gi eller ta fagperson-rettigheter.
create or replace function public.admin_set_editor(p_user uuid, p_on boolean)
returns void language plpgsql volatile security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.app_roles r where r.user_id = auth.uid() and r.role = 'admin') then raise exception 'not_allowed'; end if;
  if p_on then insert into public.content_editors (user_id, added_by) values (p_user, auth.uid()) on conflict do nothing;
  else delete from public.content_editors where user_id = p_user; end if;
  insert into public.admin_log (actor, action, target_user, detail) values (auth.uid(), case when p_on then 'set_editor' else 'remove_editor' end, p_user, null);
end $$;
revoke all on function public.admin_set_editor(uuid, boolean) from public, anon;
grant execute on function public.admin_set_editor(uuid, boolean) to authenticated;
