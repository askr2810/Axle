-- ============================================================
--  HODEREGNING – Kahoot-stil mattespill (mq.js).
--  Kjør denne i Supabase → SQL Editor (etter oppsett.sql og venner.sql). Trygg å kjøre flere ganger.
--  Appen virker uten denne filen (alene-spill og utfordringslenker), men live-rom og topplister krever den.
--
--  Live: verten lager et rom (mq_create) og får en kode på 5 tegn. Andre blir med med koden (mq_join),
--  opptil 40 spillere. Verten starter (mq_start), og alle klientene følger samme tidsplan fra start_at.
--  Stykkene lages likt hos alle fra et tall (seed), så bare innstillingene lagres. Hver spiller sender sin
--  egen poengsum (mq_push) og leser alle andres (mq_get) omtrent hvert sekund.
--
--  Topplister: en utfordringslenke eller «Ukens hoderegning» har en nøkkel (ckey). mq_submit lagrer
--  din beste poengsum for nøkkelen, mq_board viser topplisten.
--  Tabellene har RLS uten policyer: all tilgang går gjennom funksjonene under.
-- ============================================================

create table if not exists public.mq_rooms (
  code        text primary key,
  host        uuid not null references auth.users (id) on delete cascade,
  cfg         jsonb not null,
  status      text not null default 'lobby' check (status in ('lobby', 'playing', 'done')),
  start_at    timestamptz,
  created_at  timestamptz not null default now()
);
create index if not exists mq_rooms_host_idx on public.mq_rooms (host, created_at);

create table if not exists public.mq_players (
  code       text not null references public.mq_rooms (code) on delete cascade,
  uid        uuid not null references auth.users (id) on delete cascade,
  name       text not null default '',
  av         text,
  st         jsonb not null default '{}'::jsonb,
  joined_at  timestamptz not null default now(),
  primary key (code, uid)
);

create table if not exists public.mq_results (
  ckey        text not null,
  uid         uuid not null references auth.users (id) on delete cascade,
  name        text not null default '',
  av          text,
  score       int not null,
  ok          int not null,
  created_at  timestamptz not null default now(),
  primary key (ckey, uid)
);
create index if not exists mq_results_key_idx on public.mq_results (ckey, score desc);

alter table public.mq_rooms enable row level security;
alter table public.mq_players enable row level security;
alter table public.mq_results enable row level security;
revoke all on public.mq_rooms, public.mq_players, public.mq_results from anon, authenticated;

-- Koder uten lett forvekslbare tegn (0/O, 1/I/L).
create or replace function public.mq_gen_code()
returns text language plpgsql volatile set search_path = public as $$
declare
  abc constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  c text;
begin
  loop
    c := '';
    for i in 1..5 loop c := c || substr(abc, 1 + floor(random() * length(abc))::int, 1); end loop;
    exit when not exists (select 1 from public.mq_rooms where code = c);
  end loop;
  return c;
end $$;

-- Rommet slik deltakerne ser det: innstillinger, tidsplan og alle spillerne.
create or replace function public.mq_room_json(p_code text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'code', r.code, 'cfg', r.cfg, 'status', r.status, 'start_at', r.start_at, 'now', now(),
    'is_host', r.host = auth.uid(),
    'players', coalesce((select jsonb_agg(jsonb_build_object('name', p.name, 'av', p.av, 'st', p.st, 'me', p.uid = auth.uid(), 'host', p.uid = r.host) order by p.joined_at)
                          from public.mq_players p where p.code = r.code), '[]'::jsonb))
  from public.mq_rooms r where r.code = p_code
$$;
revoke execute on function public.mq_room_json(text) from public, anon, authenticated;

create or replace function public.mq_create(p_cfg jsonb, p_name text, p_av text default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  c text;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if jsonb_typeof(p_cfg) <> 'object' or length(p_cfg::text) > 300
     or (p_cfg ->> 'lvl')::int not between 1 and 4 or (p_cfg ->> 'n')::int not between 5 and 30 or (p_cfg ->> 'secs')::int not between 3 and 30 then raise exception 'bad_cfg'; end if;
  if (select count(*) from public.mq_rooms where host = me and created_at > now() - interval '1 hour') >= 30 then raise exception 'rate'; end if;
  delete from public.mq_rooms where created_at < now() - interval '1 day';
  c := public.mq_gen_code();
  insert into public.mq_rooms (code, host, cfg) values (c, me, p_cfg);
  insert into public.mq_players (code, uid, name, av) values (c, me, left(coalesce(btrim(p_name), ''), 24), left(p_av, 200));
  return public.mq_room_json(c);
end $$;

-- Bli med: i lobbyen eller midt i et spill (du starter da med 0 poeng på stykket som pågår).
create or replace function public.mq_join(p_code text, p_name text, p_av text default null)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  r public.mq_rooms;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  select * into r from public.mq_rooms where code = upper(btrim(p_code));
  if not found or r.created_at < now() - interval '1 day' or r.status = 'done' then raise exception 'not_found'; end if;
  if exists (select 1 from public.mq_players where code = r.code and uid = me) then return public.mq_room_json(r.code); end if;
  if (select count(*) from public.mq_players where code = r.code) >= 40 then raise exception 'full'; end if;
  if exists (select 1 from public.user_blocks b where (b.blocker = r.host and b.blocked = me) or (b.blocker = me and b.blocked = r.host)) then raise exception 'not_found'; end if;
  insert into public.mq_players (code, uid, name, av) values (r.code, me, left(coalesce(btrim(p_name), ''), 24), left(p_av, 200));
  return public.mq_room_json(r.code);
end $$;

create or replace function public.mq_get(p_code text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (select 1 from public.mq_players where code = upper(btrim(p_code)) and uid = auth.uid()) then raise exception 'not_found'; end if;
  return public.mq_room_json(upper(btrim(p_code)));
end $$;

-- Verten starter: alle teller ned til start_at og følger samme tidsplan.
create or replace function public.mq_start(p_code text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
begin
  update public.mq_rooms set status = 'playing', start_at = now() + interval '5 seconds'
    where code = upper(btrim(p_code)) and host = auth.uid() and status = 'lobby';
  return public.mq_get(p_code);
end $$;

-- Egen tilstand (liten JSON: stykke, poeng, riktige, på rad). Returnerer hele rommet, så én forespørsel holder.
create or replace function public.mq_push(p_code text, p_state jsonb)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
begin
  if jsonb_typeof(p_state) <> 'object' or length(p_state::text) > 400 then raise exception 'bad_state'; end if;
  update public.mq_players set st = p_state where code = upper(btrim(p_code)) and uid = auth.uid();
  -- ferdig når tidsplanen er over
  update public.mq_rooms set status = 'done'
    where code = upper(btrim(p_code)) and status = 'playing'
      and start_at + make_interval(secs => ((cfg ->> 'n')::int * ((cfg ->> 'secs')::int + 5)) + 2) < now();
  return public.mq_get(p_code);
end $$;

create or replace function public.mq_leave(p_code text)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  -- forlater verten lobbyen, stenges rommet; ellers går bare du ut
  delete from public.mq_rooms where code = upper(btrim(p_code)) and host = auth.uid() and status = 'lobby';
  delete from public.mq_players where code = upper(btrim(p_code)) and uid = auth.uid()
    and exists (select 1 from public.mq_rooms r where r.code = upper(btrim(p_code)) and r.status = 'lobby');
end $$;

-- ---------- topplister ----------
-- Nøkkel: «w2026-10-05» (ukens hoderegning) eller «seed.nivå.antall.sekunder» (utfordringslenke).
create or replace function public.mq_submit(p_key text, p_score int, p_ok int, p_name text, p_av text default null)
returns void language plpgsql volatile security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  n int;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if p_key !~ '^(w[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{1,10}\.[1-4]\.[0-9]{1,2}\.[0-9]{1,2})$' then raise exception 'bad_key'; end if;
  n := case when p_key like 'w%' then 15 else split_part(p_key, '.', 3)::int end;
  if p_ok not between 0 and n or p_score not between 0 and n * 1500 then raise exception 'bad_score'; end if;
  insert into public.mq_results (ckey, uid, name, av, score, ok) values (p_key, me, left(coalesce(btrim(p_name), ''), 24), left(p_av, 200), p_score, p_ok)
    on conflict (ckey, uid) do update set score = greatest(mq_results.score, excluded.score),
      ok = case when excluded.score > mq_results.score then excluded.ok else mq_results.ok end,
      name = excluded.name, av = excluded.av, created_at = case when excluded.score > mq_results.score then now() else mq_results.created_at end;
  if random() < 0.02 then delete from public.mq_results where created_at < now() - interval '90 days'; end if;
end $$;

-- Topp 30 for nøkkelen, pluss din egen plass. Venner merkes.
create or replace function public.mq_board(p_key text)
returns jsonb language sql stable security definer set search_path = public as $$
  with ranked as (
    select r.*, rank() over (order by r.score desc, r.created_at) as pos from public.mq_results r where r.ckey = p_key
  )
  select coalesce(jsonb_agg(jsonb_build_object('pos', pos, 'name', name, 'av', av, 'score', score, 'ok', ok, 'me', uid = auth.uid(),
           'friend', exists (select 1 from public.friendships f where f.user_id = auth.uid() and f.friend_id = ranked.uid)) order by pos), '[]'::jsonb)
  from ranked where pos <= 30 or uid = auth.uid()
$$;

grant execute on function public.mq_create(jsonb, text, text), public.mq_join(text, text, text), public.mq_get(text), public.mq_start(text),
  public.mq_push(text, jsonb), public.mq_leave(text), public.mq_submit(text, int, int, text, text), public.mq_board(text) to authenticated;
