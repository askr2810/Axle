-- Axle: venner og poengtavle.
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql er kjørt først.

-- Venne-kode: 8 tegn uten forvekslbare tegn (ingen 0/O, 1/I/L).
create or replace function public.gen_friend_code()
returns text
language sql
volatile
set search_path = ''
as $$
  select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + floor(random() * 31)::int, 1), '')
  from generate_series(1, 8);
$$;

-- Profil: visningsnavn, venne-kode og tallene vennene ser.
create table if not exists public.profiles (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 24),
  friend_code  text not null unique default public.gen_friend_code(),
  xp           integer not null default 0 check (xp >= 0),
  streak       integer not null default 0 check (streak >= 0),
  streak_last  text,
  week_xp      integer not null default 0 check (week_xp >= 0),
  week_key     text,
  crowns       integer not null default 0 check (crowns >= 0),
  levels       integer not null default 0 check (levels >= 0),
  course       text,
  updated_at   timestamptz not null default now()
);

-- Vennskap lagres begge veier (A→B og B→A).
create table if not exists public.friendships (
  user_id    uuid not null references auth.users (id) on delete cascade,
  friend_id  uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

-- Avatar (tegnet figur, lagret som kort kode). Legges til også hvis tabellen fantes fra før.
alter table public.profiles add column if not exists prev_week_xp integer not null default 0 check (prev_week_xp >= 0);
alter table public.profiles add column if not exists prev_week_key text;
alter table public.profiles add column if not exists username text check (username is null or username ~ '^[a-z0-9_.]{3,20}$');
create unique index if not exists profiles_username_key on public.profiles (username);
-- Profilbilde (valgfritt): lite JPEG-bilde (160×160) lagret som data-URL, vises bare for vennene dine.
alter table public.profiles add column if not exists photo text check (photo is null or (char_length(photo) < 24000 and photo ~ '^data:image/jpeg;base64,[A-Za-z0-9+/=]+$'));
alter table public.profiles add column if not exists avatar text check (avatar is null or avatar ~ '^[0-9]{1,2}(-[0-9]{1,2}){3,12}$');

alter table public.profiles    enable row level security;
alter table public.friendships enable row level security;

-- Egen profil: lese, lage og endre (men ikke venne-koden).
drop policy if exists "egen profil - lese"  on public.profiles;
drop policy if exists "egen profil - lage"  on public.profiles;
drop policy if exists "egen profil - endre" on public.profiles;
create policy "egen profil - lese"  on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "egen profil - lage"  on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "egen profil - endre" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant insert (user_id, display_name, username, photo, xp, streak, streak_last, week_xp, week_key, crowns, levels, course, avatar, prev_week_xp, prev_week_key, updated_at) on public.profiles to authenticated;
grant update (display_name, username, photo, xp, streak, streak_last, week_xp, week_key, crowns, levels, course, avatar, prev_week_xp, prev_week_key, updated_at) on public.profiles to authenticated;

-- Vennskap endres bare via funksjonene under.
revoke all on public.friendships from anon, authenticated;

-- Deg selv og vennene dine, med tallene til poengtavla. Venne-koden vises bare for deg selv.
drop function if exists public.get_friends();
create function public.get_friends()
returns table (
  user_id uuid, display_name text, username text, friend_code text, xp integer, streak integer, streak_last text,
  week_xp integer, week_key text, crowns integer, levels integer, course text, avatar text, photo text, prev_week_xp integer, prev_week_key text, updated_at timestamptz, is_me boolean,
  friends_since timestamptz, member_since timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username,
         case when p.user_id = auth.uid() then p.friend_code end,
         p.xp, p.streak, p.streak_last, p.week_xp, p.week_key, p.crowns, p.levels, p.course, p.avatar, p.photo, p.prev_week_xp, p.prev_week_key, p.updated_at,
         p.user_id = auth.uid(),
         (select f.created_at from public.friendships f where f.user_id = auth.uid() and f.friend_id = p.user_id), -- venner siden
         case when p.user_id = auth.uid() then (select u.created_at from auth.users u where u.id = auth.uid()) end   -- kontoen din ble laget
  from public.profiles p
  where p.user_id = auth.uid()
     or p.user_id in (select f.friend_id from public.friendships f where f.user_id = auth.uid());
$$;

-- Legg til venn med koden deres. Returnerer navnet til vennen.
create or replace function public.add_friend(code text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  fid uuid;
  fname text;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  select p.user_id, p.display_name into fid, fname
    from public.profiles p
    where p.friend_code = upper(regexp_replace(coalesce(code, ''), '[^A-Za-z0-9]', '', 'g'));
  if fid is null then raise exception 'not_found'; end if;
  if fid = me then raise exception 'self'; end if;
  if (select count(*) from public.friendships where user_id = me) >= 200 then raise exception 'too_many'; end if;
  insert into public.friendships (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing;
  return fname;
end;
$$;

-- Fjern venn (begge veier).
create or replace function public.remove_friend(fid uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.friendships
  where (user_id = auth.uid() and friend_id = fid)
     or (user_id = fid and friend_id = auth.uid());
$$;

revoke all on function public.get_friends()        from public, anon;
revoke all on function public.add_friend(text)     from public, anon;
revoke all on function public.remove_friend(uuid)  from public, anon;
revoke all on function public.gen_friend_code()    from public, anon;
grant execute on function public.gen_friend_code()   to authenticated;
grant execute on function public.get_friends()       to authenticated;
grant execute on function public.add_friend(text)    to authenticated;
grant execute on function public.remove_friend(uuid) to authenticated;

-- ============================================================
-- Brukernavn, søk og venneforespørsler.
-- Søk finner andre på brukernavn eller navn. Å legge til via søk sender en forespørsel
-- som den andre må godta. Deler du koden eller lenken din, blir dere venner med en gang.
-- ============================================================
create table if not exists public.friend_requests (
  from_id    uuid not null references auth.users (id) on delete cascade,
  to_id      uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (from_id, to_id),
  check (from_id <> to_id)
);
alter table public.friend_requests enable row level security;
revoke all on public.friend_requests from anon, authenticated;

-- Søk: minst 2 tegn, maks 12 treff, ikke deg selv.
drop function if exists public.search_users(text);
create function public.search_users(q text)
returns table (user_id uuid, display_name text, username text, avatar text, photo text, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo,
         case when exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = p.user_id) then 'friend'
              when exists (select 1 from public.friend_requests r where r.from_id = auth.uid() and r.to_id = p.user_id) then 'sent'
              when exists (select 1 from public.friend_requests r where r.from_id = p.user_id and r.to_id = auth.uid()) then 'incoming'
              else 'none' end
  from public.profiles p
  where auth.uid() is not null
    and char_length(btrim(coalesce(q, ''))) >= 2
    and p.user_id <> auth.uid()
    and (starts_with(p.username, lower(regexp_replace(btrim(q), '^@', '')))
         or starts_with(lower(p.display_name), lower(btrim(q))))
  order by (p.username = lower(regexp_replace(btrim(q), '^@', ''))) desc, p.username nulls last, p.display_name
  limit 12;
$$;

-- Send forespørsel. Har den andre allerede spurt deg, blir dere venner med en gang.
create or replace function public.request_friend(fid uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if fid = me then raise exception 'self'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  if not exists (select 1 from public.profiles where user_id = fid) then raise exception 'not_found'; end if;
  if exists (select 1 from public.friendships where user_id = me and friend_id = fid) then return 'friend'; end if;
  if exists (select 1 from public.friend_requests where from_id = fid and to_id = me) then
    delete from public.friend_requests where (from_id = fid and to_id = me) or (from_id = me and to_id = fid);
    insert into public.friendships (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing;
    return 'friend';
  end if;
  if (select count(*) from public.friend_requests where from_id = me) >= 50 then raise exception 'too_many'; end if;
  insert into public.friend_requests (from_id, to_id) values (me, fid) on conflict do nothing;
  return 'sent';
end;
$$;

-- Innkommende forespørsler.
drop function if exists public.get_friend_requests();
create function public.get_friend_requests()
returns table (user_id uuid, display_name text, username text, avatar text, photo text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, r.created_at
  from public.friend_requests r join public.profiles p on p.user_id = r.from_id
  where r.to_id = auth.uid()
  order by r.created_at desc;
$$;

-- Godta eller avslå.
create or replace function public.answer_friend_request(fid uuid, accept boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.friend_requests where from_id = fid and to_id = me) then raise exception 'not_found'; end if;
  delete from public.friend_requests where (from_id = fid and to_id = me) or (from_id = me and to_id = fid);
  if accept then insert into public.friendships (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing; end if;
end;
$$;

revoke all on function public.search_users(text)                    from public, anon;
revoke all on function public.request_friend(uuid)                  from public, anon;
revoke all on function public.get_friend_requests()                 from public, anon;
revoke all on function public.answer_friend_request(uuid, boolean)  from public, anon;
grant execute on function public.search_users(text)                   to authenticated;
grant execute on function public.request_friend(uuid)                 to authenticated;
grant execute on function public.get_friend_requests()                to authenticated;
grant execute on function public.answer_friend_request(uuid, boolean) to authenticated;

-- ============================================================
-- Moderering (krav fra App Store og Google Play for innhold brukerne lager selv):
-- ordfilter på navn og brukernavn, blokkering og rapportering.
-- Rapporter ligger i tabellen content_reports (se dem i Table Editor).
-- Et navn/brukernavn eller profilbilde som får rapporter fra 3 forskjellige brukere, skjules automatisk.
-- ============================================================

-- Ordfilter. Teksten normaliseres (små bokstaver, 0→o, 1→i, 3→e, 4→a, 5→s, 7→t, @→a, $→s) før sjekk.
create or replace function public.is_clean(txt text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  with n as (
    select translate(lower(coalesce(txt, '')), '013457@$', 'oieaastas') as t
  ), s as (
    select regexp_replace(t, '[^a-zæøå]', '', 'g') as squashed, regexp_replace(t, '[^a-zæøå]+', ' ', 'g') as words from n
  )
  select not (
    squashed ~ '(fuck|fukk|føkk|cunt|nigg|faggot|retard|hitler|porn|whore|bitch|jævl|jaevl|kukk|horunge|motherf|asshole|wank|dildo|penis|vagina|nazi)'
    or (' ' || words || ' ') ~ ' (sex|sexy|dick|cock|pussy|kuk|hore|faen|neger|mongo|rape|shit|tits|anal|cum|piss|homse|slut|sluts|fitte|fitta|pikk|pikken|kkk|bastard) '
  ) from s;
$$;

create or replace function public.profiles_clean()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not public.is_clean(new.display_name) or not public.is_clean(new.username) then raise exception 'bad_word'; end if;
  return new;
end;
$$;
drop trigger if exists profiles_clean on public.profiles;
create trigger profiles_clean before insert or update of display_name, username on public.profiles
  for each row execute function public.profiles_clean();

-- Blokkering.
create table if not exists public.user_blocks (
  blocker    uuid not null references auth.users (id) on delete cascade,
  blocked    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker, blocked),
  check (blocker <> blocked)
);
alter table public.user_blocks enable row level security;
revoke all on public.user_blocks from anon, authenticated;

create or replace function public.is_blocked_between(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  -- svarer bare om blokkeringer som gjelder den innloggede brukeren selv
  select (a = auth.uid() or b = auth.uid())
     and exists (select 1 from public.user_blocks where (blocker = a and blocked = b) or (blocker = b and blocked = a));
$$;

create or replace function public.block_user(fid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if fid = me then raise exception 'self'; end if;
  insert into public.user_blocks (blocker, blocked) values (me, fid) on conflict do nothing;
  delete from public.friendships where (user_id = me and friend_id = fid) or (user_id = fid and friend_id = me);
  delete from public.friend_requests where (from_id = me and to_id = fid) or (from_id = fid and to_id = me);
end;
$$;

create or replace function public.unblock_user(fid uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.user_blocks where blocker = auth.uid() and blocked = fid;
$$;

drop function if exists public.get_blocks();
create function public.get_blocks()
returns table (user_id uuid, display_name text, username text)
language sql
stable
security definer
set search_path = ''
as $$
  select b.blocked, coalesce(p.display_name, '?'), p.username
  from public.user_blocks b left join public.profiles p on p.user_id = b.blocked
  where b.blocker = auth.uid()
  order by b.created_at desc;
$$;

-- Søk, forespørsler og venne-kode tar hensyn til blokkering.
drop function if exists public.search_users(text);
create function public.search_users(q text)
returns table (user_id uuid, display_name text, username text, avatar text, photo text, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo,
         case when exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = p.user_id) then 'friend'
              when exists (select 1 from public.friend_requests r where r.from_id = auth.uid() and r.to_id = p.user_id) then 'sent'
              when exists (select 1 from public.friend_requests r where r.from_id = p.user_id and r.to_id = auth.uid()) then 'incoming'
              else 'none' end
  from public.profiles p
  where auth.uid() is not null
    and char_length(btrim(coalesce(q, ''))) >= 2
    and p.user_id <> auth.uid()
    and not public.is_blocked_between(auth.uid(), p.user_id)
    and (starts_with(p.username, lower(regexp_replace(btrim(q), '^@', '')))
         or starts_with(lower(p.display_name), lower(btrim(q))))
  order by (p.username = lower(regexp_replace(btrim(q), '^@', ''))) desc, p.username nulls last, p.display_name
  limit 12;
$$;

drop function if exists public.get_friend_requests();
create function public.get_friend_requests()
returns table (user_id uuid, display_name text, username text, avatar text, photo text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, r.created_at
  from public.friend_requests r join public.profiles p on p.user_id = r.from_id
  where r.to_id = auth.uid() and not public.is_blocked_between(auth.uid(), r.from_id)
  order by r.created_at desc;
$$;

create or replace function public.request_friend(fid uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if fid = me then raise exception 'self'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  if not exists (select 1 from public.profiles where user_id = fid) or public.is_blocked_between(me, fid) then raise exception 'not_found'; end if;
  if exists (select 1 from public.friendships where user_id = me and friend_id = fid) then return 'friend'; end if;
  if exists (select 1 from public.friend_requests where from_id = fid and to_id = me) then
    delete from public.friend_requests where (from_id = fid and to_id = me) or (from_id = me and to_id = fid);
    insert into public.friendships (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing;
    return 'friend';
  end if;
  if (select count(*) from public.friend_requests where from_id = me) >= 50 then raise exception 'too_many'; end if;
  insert into public.friend_requests (from_id, to_id) values (me, fid) on conflict do nothing;
  return 'sent';
end;
$$;

create or replace function public.add_friend(code text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  fid uuid;
  fname text;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.profiles where user_id = me) then raise exception 'no_profile'; end if;
  select p.user_id, p.display_name into fid, fname
    from public.profiles p
    where p.friend_code = upper(regexp_replace(coalesce(code, ''), '[^A-Za-z0-9]', '', 'g'));
  if fid is null or public.is_blocked_between(me, fid) then raise exception 'not_found'; end if;
  if fid = me then raise exception 'self'; end if;
  if (select count(*) from public.friendships where user_id = me) >= 200 then raise exception 'too_many'; end if;
  insert into public.friendships (user_id, friend_id) values (me, fid), (fid, me) on conflict do nothing;
  return fname;
end;
$$;

-- Rapporter. kind: 'name' (navn/brukernavn), 'photo', 'user' (oppførsel), 'course' (fellesskapskurs).
create table if not exists public.content_reports (
  id          bigint generated always as identity primary key,
  reporter    uuid not null references auth.users (id) on delete cascade,
  target_user uuid references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('name', 'photo', 'user', 'course', 'group')),
  target_id   text check (char_length(target_id) < 100),
  reason      text not null check (char_length(reason) < 60),
  note        text check (char_length(note) <= 500),
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists content_reports_target_idx on public.content_reports (target_user, kind);
alter table public.content_reports enable row level security;
revoke all on public.content_reports from anon, authenticated;

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

revoke all on function public.is_clean(text)                                   from public, anon;
revoke all on function public.is_blocked_between(uuid, uuid)                   from public, anon;
grant execute on function public.is_blocked_between(uuid, uuid)                to authenticated;
revoke all on function public.block_user(uuid)                                 from public, anon;
revoke all on function public.unblock_user(uuid)                               from public, anon;
revoke all on function public.get_blocks()                                     from public, anon;
revoke all on function public.search_users(text)                               from public, anon;
revoke all on function public.get_friend_requests()                            from public, anon;
revoke all on function public.report_content(text, uuid, text, text, text)     from public, anon;
grant execute on function public.is_clean(text)                                to authenticated;
grant execute on function public.block_user(uuid)                              to authenticated;
grant execute on function public.unblock_user(uuid)                            to authenticated;
grant execute on function public.get_blocks()                                  to authenticated;
grant execute on function public.search_users(text)                            to authenticated;
grant execute on function public.get_friend_requests()                         to authenticated;
grant execute on function public.report_content(text, uuid, text, text, text)  to authenticated;

-- ============================================================
--  Medlemsnummer (for «Pioner»-merket til de 500 første). Nummeret er fast når det først er gitt.
--  Kontoer som finnes når denne fila kjøres, nummereres etter når de ble laget; nye får neste nummer.
-- ============================================================
create table if not exists public.member_numbers (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  number     integer not null unique check (number > 0),
  created_at timestamptz not null default now()
);
alter table public.member_numbers enable row level security;
revoke all on public.member_numbers from anon, authenticated;
insert into public.member_numbers (user_id, number)
select u.id, (select coalesce(max(number), 0) from public.member_numbers) + row_number() over (order by u.created_at, u.id)
from auth.users u where not exists (select 1 from public.member_numbers m where m.user_id = u.id)
on conflict do nothing;

create or replace function public.my_member_number()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); n int;
begin
  if me is null then return null; end if;
  select number into n from public.member_numbers where user_id = me;
  if n is not null then return n; end if;
  perform pg_advisory_xact_lock(4715001); -- to som får nummer samtidig, får ikke samme
  select coalesce(max(number), 0) + 1 into n from public.member_numbers;
  insert into public.member_numbers (user_id, number) values (me, n);
  return n;
end;
$$;
revoke all on function public.my_member_number() from public, anon;
grant execute on function public.my_member_number() to authenticated;

-- ============================================================
--  Profilside for andre + merker man selv velger å vise.
--  profiles.badges = merker som vises på profilen, f.eks. "first,st7,pioneer" (tom = vis ingen).
-- ============================================================
alter table public.profiles add column if not exists badges text check (badges is null or (char_length(badges) <= 800 and badges ~ '^([a-z0-9]{1,12}(,[a-z0-9]{1,12})*)?$'));
grant insert (badges), update (badges) on public.profiles to authenticated;
-- stats_public = alle innloggede kan se statistikken på profilen (standard av: bare venner og folk i samme gruppe).
alter table public.profiles add column if not exists stats_public boolean not null default false;
grant insert (stats_public), update (stats_public) on public.profiles to authenticated;

-- Profilen til en annen bruker. Full statistikk for deg selv, venner og folk du deler gruppe med
-- (og for alle hvis personen har slått på stats_public); andre ser navn, bilde og merker. Ingenting hvis dere har blokkert hverandre.
drop function if exists public.get_profile(uuid);
create function public.get_profile(uid uuid)
returns table (
  user_id uuid, display_name text, username text, avatar text, photo text, badges text, member_no integer,
  xp integer, streak integer, streak_last text, week_xp integer, week_key text, prev_week_xp integer, prev_week_key text,
  crowns integer, levels integer, course text, updated_at timestamptz,
  is_me boolean, is_friend boolean, full_access boolean, friends_since timestamptz, friends_public boolean,
  status text, mutual_friends integer, shared_groups text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); fr boolean; grp boolean := false; full_ boolean; sg text; pub boolean;
begin
  if me is null or public.is_blocked_between(me, uid) then return; end if;
  fr := exists (select 1 from public.friendships f where f.user_id = me and f.friend_id = uid);
  if to_regclass('public.group_members') is not null then -- grupper.sql kan være kjørt etter denne fila
    execute 'select string_agg(g.emoji || '' '' || g.name, '', '' order by g.name) from public.groups g
             where exists (select 1 from public.group_members a where a.group_id = g.id and a.user_id = $1)
               and exists (select 1 from public.group_members b where b.group_id = g.id and b.user_id = $2)' into sg using me, uid;
    grp := sg is not null;
  end if;
  select coalesce((to_jsonb(p) ->> 'stats_public')::boolean, false) into pub from public.profiles p where p.user_id = uid;
  full_ := uid = me or fr or grp or coalesce(pub, false);
  return query
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, p.badges,
         (select n.number from public.member_numbers n where n.user_id = p.user_id),
         case when full_ then p.xp end, case when full_ then p.streak end, case when full_ then p.streak_last end,
         case when full_ then p.week_xp end, case when full_ then p.week_key end, case when full_ then p.prev_week_xp end, case when full_ then p.prev_week_key end,
         case when full_ then p.crowns end, case when full_ then p.levels end, case when full_ then p.course end, case when full_ then p.updated_at end,
         p.user_id = me, fr, full_,
         (select f.created_at from public.friendships f where f.user_id = me and f.friend_id = uid),
         case when fr then coalesce((to_jsonb(p) ->> 'friends_public')::boolean, false) else false end,
         case when p.user_id = me then 'me' when fr then 'friend'
              when exists (select 1 from public.friend_requests r where r.from_id = me and r.to_id = uid) then 'sent'
              when exists (select 1 from public.friend_requests r where r.from_id = uid and r.to_id = me) then 'incoming' else 'none' end,
         (select count(*)::int from public.friendships a join public.friendships b on a.friend_id = b.friend_id where a.user_id = me and b.user_id = uid),
         sg
  from public.profiles p where p.user_id = uid;
end;
$$;
revoke all on function public.get_profile(uuid) from public, anon;
grant execute on function public.get_profile(uuid) to authenticated;

