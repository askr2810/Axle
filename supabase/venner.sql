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
grant insert (user_id, display_name, xp, streak, streak_last, week_xp, week_key, crowns, levels, course, avatar, prev_week_xp, prev_week_key, updated_at) on public.profiles to authenticated;
grant update (display_name, xp, streak, streak_last, week_xp, week_key, crowns, levels, course, avatar, prev_week_xp, prev_week_key, updated_at) on public.profiles to authenticated;

-- Vennskap endres bare via funksjonene under.
revoke all on public.friendships from anon, authenticated;

-- Deg selv og vennene dine, med tallene til poengtavla. Venne-koden vises bare for deg selv.
drop function if exists public.get_friends();
create function public.get_friends()
returns table (
  user_id uuid, display_name text, friend_code text, xp integer, streak integer, streak_last text,
  week_xp integer, week_key text, crowns integer, levels integer, course text, avatar text, prev_week_xp integer, prev_week_key text, updated_at timestamptz, is_me boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select p.user_id, p.display_name,
         case when p.user_id = auth.uid() then p.friend_code end,
         p.xp, p.streak, p.streak_last, p.week_xp, p.week_key, p.crowns, p.levels, p.course, p.avatar, p.prev_week_xp, p.prev_week_key, p.updated_at,
         p.user_id = auth.uid()
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
