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

-- ============================================================
-- GRUPPESAMTALER (som på Instagram): lag en gruppe med venner og send meldinger og sider til alle.
-- Kjør hele filen på nytt; alt under tåler å kjøres flere ganger.
-- ============================================================
create table if not exists public.chat_groups (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(btrim(name)) between 1 and 40),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists public.chat_members (
  group_id  uuid not null references public.chat_groups (id) on delete cascade,
  user_id   uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  last_read bigint not null default 0,
  primary key (group_id, user_id)
);
create index if not exists chat_members_user_idx on public.chat_members (user_id);
alter table public.chat_groups  enable row level security;
alter table public.chat_members enable row level security;
revoke all on public.chat_groups, public.chat_members from anon, authenticated;

-- Meldinger kan gå til én venn (to_id) eller til en gruppe (group_id).
alter table public.messages add column if not exists group_id uuid references public.chat_groups (id) on delete cascade;
alter table public.messages alter column to_id drop not null;
alter table public.messages drop constraint if exists messages_target_check;
alter table public.messages add constraint messages_target_check check ((to_id is null) <> (group_id is null));
create index if not exists messages_group_idx on public.messages (group_id, id desc) where group_id is not null;

create or replace function public.is_chat_member(gid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.chat_members where group_id = gid and user_id = auth.uid());
$$;

-- Lag en gruppe med vennene i p_members (du blir med automatisk). Returnerer id-en.
create or replace function public.create_chat(p_name text, p_members uuid[])
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); gid uuid; n text := left(btrim(coalesce(p_name, '')), 40); m uuid; cnt int := 0;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if n = '' then raise exception 'empty'; end if;
  if not public.is_clean(n) then raise exception 'unclean'; end if;
  if coalesce(array_length(p_members, 1), 0) < 1 then raise exception 'no_members'; end if;
  if array_length(p_members, 1) > 31 then raise exception 'too_many_members'; end if;
  if (select count(*) from public.chat_groups where created_by = me and created_at > now() - interval '1 day') >= 20 then raise exception 'too_many'; end if;
  foreach m in array p_members loop
    if m = me then continue; end if;
    if not exists (select 1 from public.friendships where user_id = me and friend_id = m) then raise exception 'not_friends'; end if;
    if exists (select 1 from public.user_blocks where (blocker = me and blocked = m) or (blocker = m and blocked = me)) then raise exception 'blocked'; end if;
  end loop;
  insert into public.chat_groups (name, created_by) values (n, me) returning id into gid;
  insert into public.chat_members (group_id, user_id) values (gid, me);
  foreach m in array p_members loop
    if m <> me then insert into public.chat_members (group_id, user_id) values (gid, m) on conflict do nothing; cnt := cnt + 1; end if;
  end loop;
  if cnt = 0 then raise exception 'no_members'; end if;
  return gid;
end;
$$;

-- Send til en gruppe man er med i.
create or replace function public.send_group_message(p_group uuid, p_body text, p_link text default null, p_title text default null)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); new_id bigint; b text := btrim(coalesce(p_body, ''));
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not public.is_chat_member(p_group) then raise exception 'not_member'; end if;
  if char_length(b) > 500 then raise exception 'too_long'; end if;
  if b = '' and nullif(btrim(coalesce(p_link, '')), '') is null then raise exception 'empty'; end if;
  if p_link is not null and btrim(p_link) <> '' and btrim(p_link) !~ '^#/[A-Za-z0-9_./%:-]{1,200}$' then raise exception 'bad_link'; end if;
  if b <> '' and not public.is_clean(b) then raise exception 'unclean'; end if;
  if (select count(*) from public.messages where from_id = me and created_at > now() - interval '1 hour') >= 120 then raise exception 'too_many'; end if;
  insert into public.messages (from_id, group_id, body, link, link_title)
  values (me, p_group, b, nullif(btrim(coalesce(p_link, '')), ''), nullif(left(btrim(coalesce(p_title, '')), 120), ''))
  returning id into new_id;
  update public.chat_members set last_read = new_id where group_id = p_group and user_id = me;
  return new_id;
end;
$$;

-- Meldingene i en gruppe (de siste 60, eller eldre enn p_before), med avsenderens navn. Markerer som lest.
drop function if exists public.get_group_messages(uuid, bigint);
create function public.get_group_messages(p_group uuid, p_before bigint default null)
returns table (id bigint, from_me boolean, from_id uuid, from_name text, from_avatar text, from_photo text, body text, link text, link_title text, created_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not public.is_chat_member(p_group) then raise exception 'not_member'; end if;
  update public.chat_members cm set last_read = greatest(cm.last_read, coalesce((select max(m.id) from public.messages m where m.group_id = p_group), 0))
    where cm.group_id = p_group and cm.user_id = me;
  return query
    select m.id, m.from_id = me, m.from_id, coalesce(p.display_name, '?'), p.avatar, p.photo, m.body, m.link, m.link_title, m.created_at
    from public.messages m left join public.profiles p on p.user_id = m.from_id
    where m.group_id = p_group and (p_before is null or m.id < p_before)
    order by m.id desc
    limit 60;
end;
$$;

-- Medlemmene i en gruppe.
drop function if exists public.get_chat_members(uuid);
create function public.get_chat_members(p_group uuid)
returns table (user_id uuid, display_name text, username text, avatar text, photo text, is_me boolean)
language sql stable security definer set search_path = '' as $$
  select p.user_id, p.display_name, p.username, p.avatar, p.photo, p.user_id = auth.uid()
  from public.chat_members cm join public.profiles p on p.user_id = cm.user_id
  where cm.group_id = p_group and public.is_chat_member(p_group)
  order by cm.joined_at;
$$;

-- Forlat en gruppe (den slettes når ingen er igjen).
create or replace function public.leave_chat(p_group uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  delete from public.chat_members where group_id = p_group and user_id = auth.uid();
  if not exists (select 1 from public.chat_members where group_id = p_group) then delete from public.chat_groups where id = p_group; end if;
end;
$$;

-- Samtalene mine: venner (kind 'dm') og grupper (kind 'group'), nyeste først.
drop function if exists public.get_conversations();
create function public.get_conversations()
returns table (kind text, user_id uuid, group_id uuid, display_name text, username text, avatar text, photo text, members integer,
               last_body text, last_link_title text, last_from_me boolean, last_sender text, last_at timestamptz, unread integer)
language sql
stable
security definer
set search_path = ''
as $$
  with mine as (
    select m.*, case when m.from_id = auth.uid() then m.to_id else m.from_id end as other
    from public.messages m
    where auth.uid() is not null and m.group_id is null and (m.from_id = auth.uid() or m.to_id = auth.uid())
  ), last as (
    select distinct on (other) other, body, link_title, from_id = auth.uid() as from_me, created_at
    from mine order by other, id desc
  ), dms as (
    select 'dm'::text as kind, p.user_id, null::uuid as group_id, p.display_name, p.username, p.avatar, p.photo, 2 as members,
           l.body, l.link_title, l.from_me, null::text as sender, l.created_at,
           (select count(*)::int from mine x where x.other = l.other and x.to_id = auth.uid() and x.read_at is null) as unread
    from last l join public.profiles p on p.user_id = l.other
    where not exists (select 1 from public.user_blocks b where (b.blocker = auth.uid() and b.blocked = l.other) or (b.blocker = l.other and b.blocked = auth.uid()))
  ), grp as (
    select 'group'::text, null::uuid, g.id, g.name, null::text, null::text, null::text,
           (select count(*)::int from public.chat_members x where x.group_id = g.id),
           lm.body, lm.link_title, lm.from_id = auth.uid(), lp.display_name, coalesce(lm.created_at, g.created_at),
           (select count(*)::int from public.messages x where x.group_id = g.id and x.id > cm.last_read and x.from_id <> auth.uid())
    from public.chat_members cm join public.chat_groups g on g.id = cm.group_id
    left join lateral (select * from public.messages x where x.group_id = g.id order by x.id desc limit 1) lm on true
    left join public.profiles lp on lp.user_id = lm.from_id
    where cm.user_id = auth.uid()
  )
  select * from (select * from dms union all select * from grp) c order by c.created_at desc limit 100;
$$;

-- Uleste i alt (venner + grupper).
create or replace function public.unread_messages()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select (select count(*)::int from public.messages m
          where m.to_id = auth.uid() and m.read_at is null
            and not exists (select 1 from public.user_blocks b where (b.blocker = auth.uid() and b.blocked = m.from_id) or (b.blocker = m.from_id and b.blocked = auth.uid())))
       + (select count(*)::int from public.chat_members cm join public.messages m on m.group_id = cm.group_id
          where cm.user_id = auth.uid() and m.id > cm.last_read and m.from_id <> auth.uid());
$$;

revoke all on function public.is_chat_member(uuid)                         from public, anon;
revoke all on function public.create_chat(text, uuid[])                    from public, anon;
revoke all on function public.send_group_message(uuid, text, text, text)   from public, anon;
revoke all on function public.get_group_messages(uuid, bigint)             from public, anon;
revoke all on function public.get_chat_members(uuid)                       from public, anon;
revoke all on function public.leave_chat(uuid)                             from public, anon;
revoke all on function public.get_conversations()                          from public, anon;
revoke all on function public.unread_messages()                            from public, anon;
grant execute on function public.is_chat_member(uuid)                        to authenticated;
grant execute on function public.create_chat(text, uuid[])                   to authenticated;
grant execute on function public.send_group_message(uuid, text, text, text)  to authenticated;
grant execute on function public.get_group_messages(uuid, bigint)            to authenticated;
grant execute on function public.get_chat_members(uuid)                      to authenticated;
grant execute on function public.leave_chat(uuid)                            to authenticated;
grant execute on function public.get_conversations()                         to authenticated;
grant execute on function public.unread_messages()                           to authenticated;
