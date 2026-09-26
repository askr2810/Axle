-- Axle: adminpanel for mod- og admin-brukere (roller i public.app_roles, se venner.sql).
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql, venner.sql, fellesskap.sql og grupper.sql er kjørt først.
--
--   mod:   oversikt, rapporter (behandle/avvise), finne brukere, nullstille navn og bilde, skjule kurs.
--   admin: alt over + e-post i brukersøk, gjøre folk til mod og ta mod fra dem, slette grupper og kunngjøringer til alle.
--   Admin kan ikke gis eller tas fra noen i appen – bare her i SQL Editor (se app_roles i venner.sql).
-- Alt som gjøres, lagres i public.admin_log (hvem, hva og når).

-- ---------- hjelpere ----------
create or replace function public.staff_level()
returns int language sql stable security definer set search_path = ''
as $$ select case (select r.role from public.app_roles r where r.user_id = auth.uid()) when 'admin' then 2 when 'mod' then 1 else 0 end $$;
revoke all on function public.staff_level() from public, anon, authenticated;

create table if not exists public.admin_log (
  id          bigint generated always as identity primary key,
  actor       uuid references auth.users (id) on delete set null,
  action      text not null check (char_length(action) < 40),
  target_user uuid references auth.users (id) on delete set null,
  target_id   text check (char_length(target_id) < 100),
  detail      text check (char_length(detail) <= 300),
  created_at  timestamptz not null default now()
);
alter table public.admin_log enable row level security;
revoke all on public.admin_log from anon, authenticated;

create or replace function public.admin_note(p_action text, p_user uuid, p_id text, p_detail text)
returns void language sql security definer set search_path = ''
as $$ insert into public.admin_log (actor, action, target_user, target_id, detail) values (auth.uid(), p_action, p_user, left(p_id, 99), left(p_detail, 300)) $$;
revoke all on function public.admin_note(text, uuid, text, text) from public, anon, authenticated;

-- Rolle-skinn i Samlingen: nr. 17 Kommandør og 19 Dino-konge bare for admin, 18 Vokter og 20 Agent for mod og admin.
-- Andre får det byttet til «ingen» når profilen lagres.
create or replace function public.guard_staff_avatar()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if new.avatar is not null and (
       (split_part(new.avatar, '-', 13) in ('17', '19') and not exists (select 1 from public.app_roles r where r.user_id = new.user_id and r.role = 'admin'))
    or (split_part(new.avatar, '-', 13) in ('18', '20') and not exists (select 1 from public.app_roles r where r.user_id = new.user_id))) then
    new.avatar := regexp_replace(new.avatar, '-[0-9]+$', '-0');
  end if;
  return new;
end;
$$;
drop trigger if exists profiles_staff_avatar on public.profiles;
create trigger profiles_staff_avatar before insert or update of avatar on public.profiles
  for each row execute function public.guard_staff_avatar();

-- ---------- oversikt ----------
create or replace function public.admin_stats()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return jsonb_build_object(
    'users',        (select count(*) from auth.users),
    'new_1d',       (select count(*) from auth.users where created_at > now() - interval '1 day'),
    'new_7d',       (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'active_1d',    (select count(*) from public.progress where updated_at > now() - interval '1 day'),
    'active_7d',    (select count(*) from public.progress where updated_at > now() - interval '7 days'),
    'profiles',     (select count(*) from public.profiles),
    'friendships',  (select count(*) / 2 from public.friendships),
    'groups',       (select count(*) from public.groups),
    'courses',      (select count(*) from public.community_courses where published and not hidden),
    'courses_hidden', (select count(*) from public.community_courses where hidden),
    'reports_open', (select count(*) from public.content_reports where not handled),
    'push',         (select count(*) from public.push_subs),
    'staff',        (select count(*) from public.app_roles),
    'xp_total',     (select coalesce(sum(xp), 0) from public.profiles)
  );
end;
$$;

-- ---------- rapporter ----------
drop function if exists public.admin_reports(boolean);
create function public.admin_reports(p_handled boolean default false)
returns table (id bigint, kind text, reason text, note text, created_at timestamptz, handled boolean,
               reporter_name text, target_user uuid, target_name text, target_username text, target_photo text, target_avatar text,
               target_id text, target_label text, open_count integer)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return query
  select r.id, r.kind, r.reason, r.note, r.created_at, r.handled,
         coalesce(rp.display_name, '?'), r.target_user, tp.display_name, tp.username,
         case when r.kind = 'photo' then tp.photo end, tp.avatar, r.target_id,
         case r.kind when 'course' then (select c.emoji || ' ' || c.title || case when c.hidden then ' (skjult)' else '' end from public.community_courses c where c.id::text = r.target_id)
                     when 'group'  then (select g.emoji || ' ' || g.name from public.groups g where g.id::text = r.target_id) end,
         (select count(*)::int from public.content_reports x where not x.handled and x.kind = r.kind
            and x.target_user is not distinct from r.target_user and x.target_id is not distinct from r.target_id)
  from public.content_reports r
  left join public.profiles rp on rp.user_id = r.reporter
  left join public.profiles tp on tp.user_id = r.target_user
  where r.handled = coalesce(p_handled, false)
  order by r.created_at desc limit 150;
end;
$$;

-- Behandle en rapport. dismiss = ingenting galt; de andre retter innholdet. Alle like rapporter lukkes.
create or replace function public.admin_resolve(p_report bigint, p_action text)
returns void language plpgsql security definer set search_path = ''
as $$
declare r public.content_reports; lvl int := public.staff_level();
begin
  if lvl < 1 then raise exception 'not_staff'; end if;
  select * into r from public.content_reports where id = p_report;
  if not found then raise exception 'not_found'; end if;
  if p_action = 'reset_name' and r.target_user is not null then
    update public.profiles set display_name = 'Bruker', username = null where user_id = r.target_user;
  elsif p_action = 'remove_photo' and r.target_user is not null then
    update public.profiles set photo = null where user_id = r.target_user;
  elsif p_action = 'hide_course' and r.target_id is not null then
    update public.community_courses set hidden = true where id::text = r.target_id;
  elsif p_action = 'reset_group' and r.target_id is not null then
    update public.groups set name = 'Gruppe', emoji = '👥' where id::text = r.target_id;
  elsif p_action = 'delete_group' and r.target_id is not null then
    if lvl < 2 then raise exception 'not_admin'; end if;
    delete from public.groups where id::text = r.target_id;
  elsif p_action <> 'dismiss' then raise exception 'bad_action';
  end if;
  update public.content_reports x set handled = true
   where x.kind = r.kind and x.target_user is not distinct from r.target_user and x.target_id is not distinct from r.target_id;
  perform public.admin_note(p_action, r.target_user, r.target_id, r.kind || ': ' || r.reason);
end;
$$;

-- ---------- brukere ----------
drop function if exists public.admin_find_users(text);
create function public.admin_find_users(q text)
returns table (user_id uuid, display_name text, username text, email text, created_at timestamptz, member_no integer,
               app_role text, xp integer, last_active timestamptz, reports integer, avatar text, photo text)
language plpgsql stable security definer set search_path = ''
as $$
declare lvl int := public.staff_level(); s text := lower(btrim(coalesce(q, '')));
begin
  if lvl < 1 then raise exception 'not_staff'; end if;
  return query
  select u.id, p.display_name, p.username, case when lvl >= 2 then u.email::text end, u.created_at,
         (select n.number from public.member_numbers n where n.user_id = u.id),
         (select r.role from public.app_roles r where r.user_id = u.id), p.xp,
         greatest(p.updated_at, (select g.updated_at from public.progress g where g.user_id = u.id)),
         (select count(*)::int from public.content_reports c where c.target_user = u.id),
         p.avatar, p.photo
  from auth.users u left join public.profiles p on p.user_id = u.id
  where s = '' or lower(coalesce(p.display_name, '')) like '%' || s || '%' or lower(coalesce(p.username, '')) like '%' || ltrim(s, '@') || '%'
     or (lvl >= 2 and lower(u.email::text) like '%' || s || '%')
  order by u.created_at desc limit 40;
end;
$$;

-- Handlinger på en bruker. Bare admin kan gi og ta mod; admin-rollen kan ikke endres fra appen i det hele tatt.
-- En mod kan ikke nullstille navn/bilde til en admin.
create or replace function public.admin_user_action(uid uuid, p_action text)
returns void language plpgsql security definer set search_path = ''
as $$
declare lvl int := public.staff_level(); target_role text := (select r.role from public.app_roles r where r.user_id = uid);
begin
  if lvl < 1 then raise exception 'not_staff'; end if;
  if target_role = 'admin' and (lvl < 2 or p_action in ('set_mod', 'remove_role')) then raise exception 'not_allowed'; end if;
  if p_action = 'reset_name' then update public.profiles set display_name = 'Bruker', username = null where user_id = uid;
  elsif p_action = 'remove_photo' then update public.profiles set photo = null where user_id = uid;
  elsif p_action in ('set_mod', 'remove_role') then
    if lvl < 2 then raise exception 'not_admin'; end if;
    if uid = auth.uid() then raise exception 'not_self'; end if;
    if p_action = 'remove_role' then delete from public.app_roles where user_id = uid and role = 'mod';
    else insert into public.app_roles (user_id, role) values (uid, 'mod') on conflict (user_id) do nothing; end if;
    update public.profiles set avatar = avatar where user_id = uid; -- vakten over fjerner rolle-skinn brukeren ikke lenger har
  else raise exception 'bad_action';
  end if;
  perform public.admin_note(p_action, uid, null, null);
end;
$$;

-- ---------- kunngjøring til alle (vises som banner på forsiden) ----------
create table if not exists public.app_notices (
  id         bigint generated always as identity primary key,
  text_nb    text not null check (char_length(btrim(text_nb)) between 1 and 280),
  text_en    text check (char_length(text_en) <= 280),
  active     boolean not null default true,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.app_notices enable row level security;
revoke all on public.app_notices from anon, authenticated;

drop function if exists public.get_notice();
create function public.get_notice()
returns table (id bigint, text_nb text, text_en text, created_at timestamptz)
language sql stable security definer set search_path = ''
as $$ select n.id, n.text_nb, n.text_en, n.created_at from public.app_notices n where n.active order by n.created_at desc limit 1 $$;

create or replace function public.admin_set_notice(p_nb text, p_en text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if public.staff_level() < 2 then raise exception 'not_admin'; end if;
  update public.app_notices set active = false where active;
  if coalesce(btrim(p_nb), '') <> '' then
    insert into public.app_notices (text_nb, text_en, created_by) values (left(btrim(p_nb), 280), nullif(left(btrim(coalesce(p_en, '')), 280), ''), auth.uid());
  end if;
  perform public.admin_note(case when coalesce(btrim(p_nb), '') = '' then 'notice_off' else 'notice' end, null, null, left(p_nb, 300));
end;
$$;

-- ---------- logg ----------
drop function if exists public.admin_log_list();
create function public.admin_log_list()
returns table (created_at timestamptz, actor_name text, action text, target_name text, target_id text, detail text)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return query
  select l.created_at, coalesce(a.display_name, '?'), l.action, t.display_name, l.target_id, l.detail
  from public.admin_log l left join public.profiles a on a.user_id = l.actor left join public.profiles t on t.user_id = l.target_user
  order by l.created_at desc limit 100;
end;
$$;

-- ---------- tilgang ----------
revoke all on function public.admin_stats()                     from public, anon;
revoke all on function public.admin_reports(boolean)            from public, anon;
revoke all on function public.admin_resolve(bigint, text)       from public, anon;
revoke all on function public.admin_find_users(text)            from public, anon;
revoke all on function public.admin_user_action(uuid, text)     from public, anon;
revoke all on function public.admin_set_notice(text, text)      from public, anon;
revoke all on function public.admin_log_list()                  from public, anon;
revoke all on function public.get_notice()                      from public;
grant execute on function public.admin_stats()                  to authenticated;
grant execute on function public.admin_reports(boolean)         to authenticated;
grant execute on function public.admin_resolve(bigint, text)    to authenticated;
grant execute on function public.admin_find_users(text)         to authenticated;
grant execute on function public.admin_user_action(uuid, text)  to authenticated;
grant execute on function public.admin_set_notice(text, text)   to authenticated;
grant execute on function public.admin_log_list()               to authenticated;
grant execute on function public.get_notice()                   to anon, authenticated;
