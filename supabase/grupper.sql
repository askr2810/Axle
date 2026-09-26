-- Axle: venneliste synlig for vennene dine («folk du kanskje kjenner») og grupper med egen toppliste.
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql og venner.sql er kjørt først (profiles, friendships, is_clean, is_blocked_between, content_reports).

-- ============================================================
--  1) Vennelista synlig for vennene dine (av som standard)
-- ============================================================
alter table public.profiles add column if not exists friends_public boolean not null default false;
grant insert (friends_public), update (friends_public) on public.profiles to authenticated;

-- Vennene til en venn – bare hvis dere er venner og hen har valgt å vise lista si.
drop function if exists public.get_friend_friends(uuid);
create function public.get_friend_friends(fid uuid)
returns table (user_id uuid, display_name text, username text, avatar text, photo text, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo,
         case when p.user_id = auth.uid() then 'me'
              when exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = p.user_id) then 'friend'
              when exists (select 1 from public.friend_requests r where r.from_id = auth.uid() and r.to_id = p.user_id) then 'sent'
              when exists (select 1 from public.friend_requests r where r.from_id = p.user_id and r.to_id = auth.uid()) then 'incoming'
              else 'none' end
  from public.profiles p
  where auth.uid() is not null
    and exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = fid)
    and exists (select 1 from public.profiles o where o.user_id = fid and o.friends_public)
    and p.user_id in (select f.friend_id from public.friendships f where f.user_id = fid)
    and not public.is_blocked_between(auth.uid(), p.user_id)
  order by p.display_name
  limit 300;
$$;

-- Forslag: venner av venner som har åpen venneliste, sortert etter antall felles venner.
drop function if exists public.get_suggestions();
create function public.get_suggestions()
returns table (user_id uuid, display_name text, username text, avatar text, photo text, mutual integer, via text)
language sql
stable
security definer
set search_path = ''
as $$
  with me as (select auth.uid() as id),
  mine as (select f.friend_id from public.friendships f, me where f.user_id = me.id),
  pub as (select m.friend_id from mine m join public.profiles p on p.user_id = m.friend_id where p.friends_public),
  cand as (select f.friend_id as uid, f.user_id as via from public.friendships f where f.user_id in (select friend_id from pub))
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, count(distinct c.via)::int,
         (select string_agg(x.display_name, ', ') from (select distinct vp.display_name from cand c2 join public.profiles vp on vp.user_id = c2.via where c2.uid = p.user_id order by vp.display_name limit 2) x)
  from cand c join public.profiles p on p.user_id = c.uid, me
  where me.id is not null
    and c.uid <> me.id
    and c.uid not in (select friend_id from mine)
    and not exists (select 1 from public.friend_requests r where (r.from_id = me.id and r.to_id = c.uid) or (r.from_id = c.uid and r.to_id = me.id))
    and not public.is_blocked_between(me.id, c.uid)
  group by p.user_id, p.display_name, p.username, p.avatar, p.photo
  order by count(distinct c.via) desc, p.display_name
  limit 20;
$$;

-- ============================================================
--  2) Grupper: egen toppliste for vennegjengen, familien, klassen …
--     Maks 10 grupper per bruker og 50 medlemmer per gruppe. Inviteres med kode/lenke.
-- ============================================================
create table if not exists public.groups (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(btrim(name)) between 2 and 30),
  emoji      text not null default '👥' check (char_length(emoji) between 1 and 8),
  owner      uuid not null references auth.users (id) on delete cascade,
  code       text not null unique default public.gen_friend_code(),
  created_at timestamptz not null default now()
);
create table if not exists public.group_members (
  group_id  uuid not null references public.groups (id) on delete cascade,
  user_id   uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index if not exists group_members_user_idx on public.group_members (user_id);
-- Innstillinger per gruppe (bare eieren endrer dem): maks medlemmer, hvem kan invitere, og om lenke/kode virker.
alter table public.groups add column if not exists max_members integer not null default 50 check (max_members between 2 and 50);
alter table public.groups add column if not exists invite_policy text not null default 'all' check (invite_policy in ('all', 'owner'));
alter table public.groups add column if not exists link_enabled boolean not null default true;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
revoke all on public.groups, public.group_members from anon, authenticated; -- alt går via funksjonene under

create or replace function public.is_group_member(gid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.group_members m where m.group_id = gid and m.user_id = auth.uid()); $$;

create or replace function public.group_code_norm(c text)
returns text language sql immutable set search_path = ''
as $$ select upper(regexp_replace(coalesce(c, ''), '[^A-Za-z0-9]', '', 'g')); $$;

create or replace function public.create_group(p_name text, p_emoji text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); gid uuid;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  if char_length(btrim(coalesce(p_name, ''))) not between 2 and 30 then raise exception 'bad_name'; end if;
  if not public.is_clean(p_name) then raise exception 'bad_word'; end if;
  if (select count(*) from public.group_members where user_id = me) >= 10 then raise exception 'too_many_groups'; end if;
  if (select count(*) from public.groups where owner = me and created_at > now() - interval '1 day') >= 5 then raise exception 'too_many'; end if;
  insert into public.groups (name, emoji, owner) values (btrim(p_name), coalesce(nullif(left(btrim(coalesce(p_emoji, '')), 8), ''), '👥'), me) returning id into gid;
  insert into public.group_members (group_id, user_id) values (gid, me);
  return gid;
end;
$$;

create or replace function public.join_group(p_code text)
returns table (id uuid, name text, emoji text)
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); g public.groups;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  select * into g from public.groups where code = public.group_code_norm(p_code);
  if g.id is null then raise exception 'not_found'; end if;
  if not exists (select 1 from public.group_members where group_id = g.id and user_id = me) then
    if not g.link_enabled then raise exception 'link_off'; end if;
    if (select count(*) from public.group_members where user_id = me) >= 10 then raise exception 'too_many_groups'; end if;
    if (select count(*) from public.group_members where group_id = g.id) >= g.max_members then raise exception 'group_full'; end if;
    insert into public.group_members (group_id, user_id) values (g.id, me);
  end if;
  if to_regclass('public.group_invites') is not null then execute 'delete from public.group_invites where group_id = $1 and user_id = $2' using g.id, me; end if;
  return query select g.id, g.name, g.emoji;
end;
$$;

-- Å forlate: eier som går ut, gir eierskapet til den som har vært med lengst; tom gruppe slettes.
create or replace function public.leave_group(gid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); nxt uuid;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  delete from public.group_members where group_id = gid and user_id = me;
  if not exists (select 1 from public.group_members where group_id = gid) then delete from public.groups where id = gid; return; end if;
  if (select owner from public.groups where id = gid) = me then
    select user_id into nxt from public.group_members where group_id = gid order by joined_at limit 1;
    update public.groups set owner = nxt where id = gid;
  end if;
end;
$$;

create or replace function public.update_group(gid uuid, p_name text, p_emoji text, p_new_code boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null or (select owner from public.groups where id = gid) is distinct from me then raise exception 'not_owner'; end if;
  if char_length(btrim(coalesce(p_name, ''))) not between 2 and 30 then raise exception 'bad_name'; end if;
  if not public.is_clean(p_name) then raise exception 'bad_word'; end if;
  update public.groups set name = btrim(p_name), emoji = coalesce(nullif(left(btrim(coalesce(p_emoji, '')), 8), ''), emoji),
         code = case when p_new_code then public.gen_friend_code() else code end
   where id = gid;
end;
$$;

create or replace function public.remove_group_member(gid uuid, uid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null or (select owner from public.groups where id = gid) is distinct from me then raise exception 'not_owner'; end if;
  if uid = me then raise exception 'use_leave'; end if;
  delete from public.group_members where group_id = gid and user_id = uid;
end;
$$;

create or replace function public.delete_group(gid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or (select owner from public.groups where id = gid) is distinct from auth.uid() then raise exception 'not_owner'; end if;
  delete from public.groups where id = gid;
end;
$$;

create or replace function public.update_group_settings(gid uuid, p_max integer, p_policy text, p_link boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null or (select owner from public.groups where id = gid) is distinct from me then raise exception 'not_owner'; end if;
  if p_max is null or p_max not between 2 and 50 then raise exception 'bad_max'; end if;
  if p_max < (select count(*) from public.group_members where group_id = gid) then raise exception 'below_members'; end if;
  if p_policy not in ('all', 'owner') then raise exception 'bad_policy'; end if;
  update public.groups set max_members = p_max, invite_policy = p_policy, link_enabled = coalesce(p_link, true) where id = gid;
end;
$$;
revoke all on function public.update_group_settings(uuid, integer, text, boolean) from public, anon;
grant execute on function public.update_group_settings(uuid, integer, text, boolean) to authenticated;

-- Gruppene mine, med antall medlemmer og samlet XP denne uka (week_key sammenlignes i appen).
drop function if exists public.list_my_groups();
create function public.list_my_groups()
returns table (id uuid, name text, emoji text, code text, is_owner boolean, members integer, created_at timestamptz, max_members integer, invite_policy text, link_enabled boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select g.id, g.name, g.emoji, case when g.link_enabled and (g.invite_policy = 'all' or g.owner = auth.uid()) then g.code end,
         g.owner = auth.uid(), (select count(*)::int from public.group_members m2 where m2.group_id = g.id), g.created_at, g.max_members, g.invite_policy, g.link_enabled
  from public.groups g join public.group_members m on m.group_id = g.id and m.user_id = auth.uid()
  order by g.created_at;
$$;

-- Topplista i en gruppe (samme kolonner som get_friends, pluss is_owner). Bare for medlemmer.
drop function if exists public.get_group(uuid);
create function public.get_group(gid uuid)
returns table (
  user_id uuid, display_name text, username text, xp integer, streak integer, streak_last text,
  week_xp integer, week_key text, crowns integer, levels integer, course text, avatar text, photo text, prev_week_xp integer, prev_week_key text,
  updated_at timestamptz, is_me boolean, is_owner boolean, is_friend boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.xp, p.streak, p.streak_last, p.week_xp, p.week_key, p.crowns, p.levels, p.course, p.avatar, p.photo,
         p.prev_week_xp, p.prev_week_key, p.updated_at, p.user_id = auth.uid(), p.user_id = g.owner,
         exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = p.user_id)
  from public.group_members m join public.groups g on g.id = m.group_id join public.profiles p on p.user_id = m.user_id
  where m.group_id = gid and public.is_group_member(gid)
    and (p.user_id = auth.uid() or not public.is_blocked_between(auth.uid(), p.user_id));
$$;

-- Navn og emoji på en gruppe fra invitasjonskoden (vises før man blir med). Krever innlogging.
drop function if exists public.peek_group(text);
create function public.peek_group(p_code text)
returns table (id uuid, name text, emoji text, members integer, is_member boolean, max_members integer)
language sql
stable
security definer
set search_path = ''
as $$
  select g.id, g.name, g.emoji, (select count(*)::int from public.group_members m where m.group_id = g.id), public.is_group_member(g.id), g.max_members
  from public.groups g where auth.uid() is not null and g.code = public.group_code_norm(p_code) and (g.link_enabled or public.is_group_member(g.id));
$$;

-- ============================================================
--  2b) Invitere venner direkte (uten lenke). Vennen godtar med ett trykk i appen.
-- ============================================================
create table if not exists public.group_invites (
  group_id   uuid not null references public.groups (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,  -- den som er invitert
  inviter    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index if not exists group_invites_user_idx on public.group_invites (user_id);
alter table public.group_invites enable row level security;
revoke all on public.group_invites from anon, authenticated;

-- Vennene dine sett fra en gruppe: med, invitert eller ikke. Bare for medlemmer.
drop function if exists public.group_friend_status(uuid);
create function public.group_friend_status(gid uuid)
returns table (user_id uuid, display_name text, username text, avatar text, photo text, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo,
         case when exists (select 1 from public.group_members m where m.group_id = gid and m.user_id = p.user_id) then 'member'
              when exists (select 1 from public.group_invites i where i.group_id = gid and i.user_id = p.user_id) then 'invited'
              else 'none' end
  from public.friendships f join public.profiles p on p.user_id = f.friend_id
  where f.user_id = auth.uid() and public.is_group_member(gid) and not public.is_blocked_between(auth.uid(), p.user_id)
  order by p.display_name;
$$;

-- Inviter venner (en eller flere). Returnerer hvor mange som ble invitert.
create or replace function public.invite_to_group(gid uuid, uids uuid[])
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); n int;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not public.is_group_member(gid) then raise exception 'not_member'; end if;
  if (select invite_policy from public.groups where id = gid) = 'owner' and (select owner from public.groups where id = gid) <> me then raise exception 'owner_only'; end if;
  if (select count(*) from public.group_members where group_id = gid) >= (select max_members from public.groups where id = gid) then raise exception 'group_full'; end if;
  if coalesce(array_length(uids, 1), 0) > 50 then raise exception 'too_many'; end if;
  insert into public.group_invites (group_id, user_id, inviter)
  select gid, u, me from unnest(uids) u
  where exists (select 1 from public.friendships f where f.user_id = me and f.friend_id = u)
    and not exists (select 1 from public.group_members m where m.group_id = gid and m.user_id = u)
    and not public.is_blocked_between(me, u)
  on conflict (group_id, user_id) do nothing;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- Invitasjonene mine.
drop function if exists public.get_group_invites();
create function public.get_group_invites()
returns table (id uuid, name text, emoji text, members integer, inviter text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select g.id, g.name, g.emoji, (select count(*)::int from public.group_members m where m.group_id = g.id), coalesce(p.display_name, '?'), i.created_at
  from public.group_invites i join public.groups g on g.id = i.group_id left join public.profiles p on p.user_id = i.inviter
  where i.user_id = auth.uid() and not public.is_blocked_between(auth.uid(), i.inviter)
  order by i.created_at desc;
$$;

-- Svar på en invitasjon. Samme grenser som å bli med via kode.
create or replace function public.answer_group_invite(gid uuid, accept boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.group_invites where group_id = gid and user_id = me) then raise exception 'not_found'; end if;
  if accept and not exists (select 1 from public.group_members where group_id = gid and user_id = me) then
    if (select count(*) from public.group_members where user_id = me) >= 10 then raise exception 'too_many_groups'; end if;
    if (select count(*) from public.group_members where group_id = gid) >= (select max_members from public.groups where id = gid) then raise exception 'group_full'; end if;
    insert into public.group_members (group_id, user_id) values (gid, me);
  end if;
  delete from public.group_invites where group_id = gid and user_id = me;
end;
$$;

revoke all on function public.group_friend_status(uuid)          from public, anon;
revoke all on function public.invite_to_group(uuid, uuid[])      from public, anon;
revoke all on function public.get_group_invites()                from public, anon;
revoke all on function public.answer_group_invite(uuid, boolean) from public, anon;
grant execute on function public.group_friend_status(uuid)          to authenticated;
grant execute on function public.invite_to_group(uuid, uuid[])      to authenticated;
grant execute on function public.get_group_invites()                to authenticated;
grant execute on function public.answer_group_invite(uuid, boolean) to authenticated;

-- ============================================================
--  3) Rapportering: navn, bilde, fellesskapskurs og gruppenavn. Skjules/nullstilles etter 3 rapporter.
--     (Samme funksjon som i fellesskap.sql, med grupper i tillegg.)
-- ============================================================
alter table public.content_reports drop constraint if exists content_reports_kind_check;
alter table public.content_reports add constraint content_reports_kind_check check (kind in ('name', 'photo', 'user', 'course', 'group'));
create or replace function public.report_content(p_kind text, p_target_user uuid, p_target_id text, p_reason text, p_note text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); n int;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if (select count(*) from public.content_reports where reporter = me and created_at > now() - interval '1 day') >= 20 then raise exception 'too_many'; end if;
  insert into public.content_reports (reporter, target_user, kind, target_id, reason, note)
  values (me, p_target_user, p_kind, left(p_target_id, 99), left(coalesce(p_reason, ''), 59), left(p_note, 500));
  if p_target_user is not null and p_kind in ('name', 'photo') then
    select count(distinct reporter) into n from public.content_reports where target_user = p_target_user and kind = p_kind and not handled;
    if n >= 3 then
      if p_kind = 'photo' then update public.profiles set photo = null where user_id = p_target_user;
      else update public.profiles set display_name = 'Bruker', username = null where user_id = p_target_user; end if;
      update public.content_reports set handled = true where target_user = p_target_user and kind = p_kind;
    end if;
  elsif p_kind = 'course' and p_target_id is not null and to_regclass('public.community_courses') is not null then
    select count(distinct reporter) into n from public.content_reports where kind = 'course' and target_id = p_target_id and not handled;
    if n >= 3 then
      execute 'update public.community_courses set hidden = true where id::text = $1' using p_target_id;
      update public.content_reports set handled = true where kind = 'course' and target_id = p_target_id;
    end if;
  elsif p_kind = 'group' and p_target_id is not null and to_regclass('public.groups') is not null then
    select count(distinct reporter) into n from public.content_reports where kind = 'group' and target_id = p_target_id and not handled;
    if n >= 3 then
      execute 'update public.groups set name = ''Gruppe'', emoji = ''👥'' where id::text = $1' using p_target_id;
      update public.content_reports set handled = true where kind = 'group' and target_id = p_target_id;
    end if;
  end if;
end;
$$;

-- ============================================================
--  Tilgang: bare innloggede brukere, bare via funksjonene
-- ============================================================
revoke all on function public.get_friend_friends(uuid)                           from public, anon;
revoke all on function public.get_suggestions()                                  from public, anon;
revoke all on function public.is_group_member(uuid)                              from public, anon;
revoke all on function public.create_group(text, text)                           from public, anon;
revoke all on function public.join_group(text)                                   from public, anon;
revoke all on function public.leave_group(uuid)                                  from public, anon;
revoke all on function public.update_group(uuid, text, text, boolean)            from public, anon;
revoke all on function public.remove_group_member(uuid, uuid)                    from public, anon;
revoke all on function public.delete_group(uuid)                                 from public, anon;
revoke all on function public.list_my_groups()                                   from public, anon;
revoke all on function public.get_group(uuid)                                    from public, anon;
revoke all on function public.peek_group(text)                                   from public, anon;
revoke all on function public.report_content(text, uuid, text, text, text)       from public, anon;
grant execute on function public.get_friend_friends(uuid)                        to authenticated;
grant execute on function public.get_suggestions()                               to authenticated;
grant execute on function public.is_group_member(uuid)                           to authenticated;
grant execute on function public.create_group(text, text)                        to authenticated;
grant execute on function public.join_group(text)                                to authenticated;
grant execute on function public.leave_group(uuid)                               to authenticated;
grant execute on function public.update_group(uuid, text, text, boolean)         to authenticated;
grant execute on function public.remove_group_member(uuid, uuid)                 to authenticated;
grant execute on function public.delete_group(uuid)                              to authenticated;
grant execute on function public.list_my_groups()                                to authenticated;
grant execute on function public.get_group(uuid)                                 to authenticated;
grant execute on function public.peek_group(text)                                to authenticated;
grant execute on function public.report_content(text, uuid, text, text, text)    to authenticated;
