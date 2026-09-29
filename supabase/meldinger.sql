-- ============================================================
-- MELDINGER mellom venner i Axle (kjør etter venner.sql).
-- Korte tekstmeldinger og delte sider (en lenke inne i appen, f.eks. #/enhetssirkel/utforsk).
-- Bare venner kan skrive til hverandre, og ikke hvis en av dem har blokkert den andre.
-- Alt går gjennom funksjonene under (security definer); tabellen er stengt for direkte lesing.
-- ============================================================
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  from_id    uuid not null references auth.users (id) on delete cascade,
  to_id      uuid not null references auth.users (id) on delete cascade,
  body       text not null default '' check (char_length(body) <= 500),
  link       text check (link is null or link ~ '^#/[A-Za-z0-9_./%:-]{1,200}$'),
  link_title text check (link_title is null or char_length(link_title) <= 120),
  created_at timestamptz not null default now(),
  read_at    timestamptz,
  check (from_id <> to_id),
  check (char_length(btrim(body)) > 0 or link is not null)
);
create index if not exists messages_pair_idx on public.messages (least(from_id, to_id), greatest(from_id, to_id), id desc);
create index if not exists messages_to_unread_idx on public.messages (to_id) where read_at is null;
alter table public.messages enable row level security;
revoke all on public.messages from anon, authenticated;

-- Send en melding (tekst, lenke eller begge) til en venn.
create or replace function public.send_message(p_to uuid, p_body text, p_link text default null, p_title text default null)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); new_id bigint; b text := btrim(coalesce(p_body, ''));
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if p_to = me then raise exception 'self'; end if;
  if not exists (select 1 from public.friendships where user_id = me and friend_id = p_to) then raise exception 'not_friends'; end if;
  if exists (select 1 from public.user_blocks where (blocker = me and blocked = p_to) or (blocker = p_to and blocked = me)) then raise exception 'blocked'; end if;
  if char_length(b) > 500 then raise exception 'too_long'; end if;
  if b = '' and nullif(btrim(coalesce(p_link, '')), '') is null then raise exception 'empty'; end if;
  if p_link is not null and btrim(p_link) <> '' and btrim(p_link) !~ '^#/[A-Za-z0-9_./%:-]{1,200}$' then raise exception 'bad_link'; end if;
  if b <> '' and not public.is_clean(b) then raise exception 'unclean'; end if;
  if (select count(*) from public.messages where from_id = me and created_at > now() - interval '1 hour') >= 120 then raise exception 'too_many'; end if;
  insert into public.messages (from_id, to_id, body, link, link_title)
  values (me, p_to, b, nullif(btrim(coalesce(p_link, '')), ''), nullif(left(btrim(coalesce(p_title, '')), 120), ''))
  returning id into new_id;
  return new_id;
end;
$$;

-- Samtalene mine: én rad per venn med siste melding og antall uleste.
drop function if exists public.get_conversations();
create function public.get_conversations()
returns table (user_id uuid, display_name text, username text, avatar text, photo text, last_body text, last_link_title text, last_from_me boolean, last_at timestamptz, unread integer)
language sql
stable
security definer
set search_path = ''
as $$
  with mine as (
    select m.*, case when m.from_id = auth.uid() then m.to_id else m.from_id end as other
    from public.messages m
    where auth.uid() is not null and (m.from_id = auth.uid() or m.to_id = auth.uid())
  ), last as (
    select distinct on (other) other, body, link_title, from_id = auth.uid() as from_me, created_at
    from mine order by other, id desc
  )
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, l.body, l.link_title, l.from_me, l.created_at,
         (select count(*)::int from mine x where x.other = l.other and x.to_id = auth.uid() and x.read_at is null)
  from last l join public.profiles p on p.user_id = l.other
  where not exists (select 1 from public.user_blocks b where (b.blocker = auth.uid() and b.blocked = l.other) or (b.blocker = l.other and b.blocked = auth.uid()))
  order by l.created_at desc
  limit 100;
$$;

-- Meldingene med én venn (de siste 60, eller eldre enn p_before). Markerer mottatte som lest.
drop function if exists public.get_messages(uuid, bigint);
create function public.get_messages(p_with uuid, p_before bigint default null)
returns table (id bigint, from_me boolean, body text, link text, link_title text, created_at timestamptz, read_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  update public.messages m set read_at = now() where m.to_id = me and m.from_id = p_with and m.read_at is null;
  return query
    select m.id, m.from_id = me, m.body, m.link, m.link_title, m.created_at, m.read_at
    from public.messages m
    where ((m.from_id = me and m.to_id = p_with) or (m.from_id = p_with and m.to_id = me))
      and (p_before is null or m.id < p_before)
    order by m.id desc
    limit 60;
end;
$$;

-- Antall uleste (til prikken på Venner-fanen).
create or replace function public.unread_messages()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::int from public.messages m
  where m.to_id = auth.uid() and m.read_at is null
    and not exists (select 1 from public.user_blocks b where (b.blocker = auth.uid() and b.blocked = m.from_id) or (b.blocker = m.from_id and b.blocked = auth.uid()));
$$;

-- Slett en melding jeg har sendt (forsvinner for begge).
create or replace function public.delete_message(p_id bigint)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.messages where id = p_id and from_id = auth.uid();
$$;

-- Rapporter en melding: bruker content_reports fra venner.sql med kind 'message'.
alter table public.content_reports drop constraint if exists content_reports_kind_check;
alter table public.content_reports add constraint content_reports_kind_check check (kind in ('name', 'photo', 'user', 'course', 'group', 'message'));

revoke all on function public.send_message(uuid, text, text, text) from public, anon;
revoke all on function public.get_conversations()                  from public, anon;
revoke all on function public.get_messages(uuid, bigint)           from public, anon;
revoke all on function public.unread_messages()                    from public, anon;
revoke all on function public.delete_message(bigint)               from public, anon;
grant execute on function public.send_message(uuid, text, text, text) to authenticated;
grant execute on function public.get_conversations()                  to authenticated;
grant execute on function public.get_messages(uuid, bigint)           to authenticated;
grant execute on function public.unread_messages()                    to authenticated;
grant execute on function public.delete_message(bigint)               to authenticated;
