-- ============================================================
--  DUELL – live spill mot en venn (Kappløp og Tautrekking).
--  Kjør denne i Supabase → SQL Editor (etter oppsett.sql og venner.sql). Trygg å kjøre flere ganger.
--
--  Verten lager en duell med ferdige spørsmål (duel_create) og får en kode på 5 tegn.
--  Vennen blir med med koden, en lenke eller en invitasjon (duel_join). Begge sender sin egen
--  tilstand (spørsmålnummer, poeng) med duel_push og leser motstanderens med duel_get omtrent hvert sekund.
--  Tabellen har RLS uten policyer: all tilgang går gjennom funksjonene under, som sjekker at du er med i duellen.
--  Gamle dueller (over ett døgn) slettes automatisk når nye lages.
-- ============================================================

create table if not exists public.duels (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  mode        text not null check (mode in ('race', 'tug')),
  host        uuid not null references auth.users (id) on delete cascade,
  guest       uuid references auth.users (id) on delete cascade,
  invite_to   uuid references auth.users (id) on delete cascade,
  host_name   text not null default '',
  guest_name  text not null default '',
  host_av     text,
  guest_av    text,
  questions   jsonb not null,
  host_state  jsonb not null default '{}'::jsonb,
  guest_state jsonb not null default '{}'::jsonb,
  status      text not null default 'waiting' check (status in ('waiting', 'ready', 'playing', 'done', 'left')),
  start_at    timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists duels_invite_idx on public.duels (invite_to) where guest is null;
create index if not exists duels_host_idx on public.duels (host, created_at);
alter table public.duels enable row level security;
revoke all on public.duels from anon, authenticated;

-- Koder uten lett forvekslbare tegn (0/O, 1/I/L).
create or replace function public.gen_duel_code()
returns text language plpgsql volatile set search_path = public as $$
declare
  abc constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  c text;
begin
  loop
    c := '';
    for i in 1..5 loop c := c || substr(abc, 1 + floor(random() * length(abc))::int, 1); end loop;
    exit when not exists (select 1 from public.duels where code = c);
  end loop;
  return c;
end $$;

-- Det motstanderen og du ser: bare de to deltakerne får lese duellen.
create or replace function public.duel_row(d public.duels)
returns jsonb language sql stable set search_path = public as $$
  select jsonb_build_object(
    'code', d.code, 'mode', d.mode, 'status', d.status, 'questions', d.questions,
    'is_host', d.host = auth.uid(),
    'me', case when d.host = auth.uid() then d.host_state else d.guest_state end,
    'opp', case when d.host = auth.uid() then d.guest_state else d.host_state end,
    'opp_name', case when d.host = auth.uid() then d.guest_name else d.host_name end,
    'opp_av', case when d.host = auth.uid() then d.guest_av else d.host_av end,
    'has_guest', d.guest is not null,
    'start_at', d.start_at, 'now', now())
$$;

create or replace function public.duel_create(p_mode text, p_questions jsonb, p_name text, p_av text default null, p_invite uuid default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  d public.duels;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if p_mode not in ('race', 'tug') then raise exception 'bad_mode'; end if;
  if jsonb_typeof(p_questions) <> 'array' or jsonb_array_length(p_questions) not between 3 and 60 or length(p_questions::text) > 120000 then raise exception 'bad_questions'; end if;
  if (select count(*) from public.duels where host = me and created_at > now() - interval '1 hour') >= 30 then raise exception 'rate'; end if;
  if p_invite is not null and not exists (select 1 from public.friendships where user_id = me and friend_id = p_invite) then raise exception 'not_friend'; end if;
  delete from public.duels where created_at < now() - interval '1 day';
  insert into public.duels (code, mode, host, host_name, host_av, questions, invite_to)
    values (public.gen_duel_code(), p_mode, me, left(coalesce(btrim(p_name), ''), 24), left(p_av, 200), p_questions, p_invite)
    returning * into d;
  return public.duel_row(d);
end $$;

create or replace function public.duel_join(p_code text, p_name text, p_av text default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  d public.duels;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  select * into d from public.duels where code = upper(btrim(p_code)) for update;
  if not found or d.created_at < now() - interval '1 day' then raise exception 'not_found'; end if;
  if d.host = me or d.guest = me then return public.duel_row(d); end if;
  if d.guest is not null then raise exception 'full'; end if;
  if d.status <> 'waiting' then raise exception 'not_found'; end if;
  if exists (select 1 from public.user_blocks b where (b.blocker = d.host and b.blocked = me) or (b.blocker = me and b.blocked = d.host)) then raise exception 'not_found'; end if;
  update public.duels set guest = me, guest_name = left(coalesce(btrim(p_name), ''), 24), guest_av = left(p_av, 200), status = 'ready', updated_at = now()
    where id = d.id returning * into d;
  return public.duel_row(d);
end $$;

create or replace function public.duel_get(p_code text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare d public.duels;
begin
  select * into d from public.duels where code = upper(btrim(p_code)) and (host = auth.uid() or guest = auth.uid());
  if not found then raise exception 'not_found'; end if;
  return public.duel_row(d);
end $$;

-- Verten starter når vennen er med: begge klientene teller ned til start_at.
create or replace function public.duel_start(p_code text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare d public.duels;
begin
  update public.duels set status = 'playing', start_at = now() + interval '4 seconds', updated_at = now()
    where code = upper(btrim(p_code)) and host = auth.uid() and guest is not null and status = 'ready'
    returning * into d;
  if not found then select * into d from public.duels where code = upper(btrim(p_code)) and host = auth.uid(); if not found then raise exception 'not_found'; end if; end if;
  return public.duel_row(d);
end $$;

-- Egen tilstand (liten JSON: spørsmålnummer, poeng, ferdig …). Returnerer hele duellen, så én forespørsel holder.
create or replace function public.duel_push(p_code text, p_state jsonb)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare d public.duels;
begin
  if jsonb_typeof(p_state) <> 'object' or length(p_state::text) > 2000 then raise exception 'bad_state'; end if;
  update public.duels set
      host_state  = case when host  = auth.uid() then p_state else host_state end,
      guest_state = case when guest = auth.uid() then p_state else guest_state end,
      status = case when status = 'playing' and (p_state ->> 'done') = 'true'
                     and ((case when host = auth.uid() then guest_state else host_state end) ->> 'done') = 'true' then 'done' else status end,
      updated_at = now()
    where code = upper(btrim(p_code)) and (host = auth.uid() or guest = auth.uid()) and status in ('ready', 'playing', 'done')
    returning * into d;
  if not found then return public.duel_get(p_code); end if;
  return public.duel_row(d);
end $$;

create or replace function public.duel_leave(p_code text)
returns void language sql volatile security definer set search_path = public as $$
  update public.duels set status = 'left', updated_at = now()
   where code = upper(btrim(p_code)) and (host = auth.uid() or guest = auth.uid()) and status in ('waiting', 'ready', 'playing');
$$;

-- Inviter en venn til en duell du har laget (erstatter en tidligere invitasjon).
create or replace function public.duel_invite(p_code text, p_friend uuid)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if not exists (select 1 from public.friendships where user_id = auth.uid() and friend_id = p_friend) then raise exception 'not_friend'; end if;
  update public.duels set invite_to = p_friend, updated_at = now()
   where code = upper(btrim(p_code)) and host = auth.uid() and guest is null and status = 'waiting';
  if not found then raise exception 'not_found'; end if;
end $$;

-- Invitasjoner til meg fra venner (siste 15 minutter, ikke startet).
create or replace function public.duel_invites()
returns table (code text, mode text, host_name text, host_av text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select d.code, d.mode, d.host_name, d.host_av, d.created_at from public.duels d
   where d.invite_to = auth.uid() and d.guest is null and d.status = 'waiting' and d.created_at > now() - interval '15 minutes'
   order by d.created_at desc limit 5
$$;

revoke all on function public.gen_duel_code() from public, anon, authenticated;
revoke all on function public.duel_row(public.duels) from public, anon, authenticated;
revoke all on function public.duel_create(text, jsonb, text, text, uuid), public.duel_join(text, text, text), public.duel_get(text),
  public.duel_start(text), public.duel_push(text, jsonb), public.duel_leave(text), public.duel_invites(), public.duel_invite(text, uuid) from public, anon;
grant execute on function public.duel_create(text, jsonb, text, text, uuid), public.duel_join(text, text, text), public.duel_get(text),
  public.duel_start(text), public.duel_push(text, jsonb), public.duel_leave(text), public.duel_invites(), public.duel_invite(text, uuid) to authenticated;
