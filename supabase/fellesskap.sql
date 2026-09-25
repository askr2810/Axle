-- Axle: fellesskapskurs – brukere lager egne kurs (maks 5 per bruker, maks 50 spørsmål per kurs).
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql og venner.sql er kjørt først (bruker profiles, is_clean, is_blocked_between og content_reports).

create table if not exists public.community_courses (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users (id) on delete cascade,
  title       text not null check (char_length(btrim(title)) between 3 and 60),
  description text not null default '' check (char_length(description) <= 300),
  emoji       text not null default '📘' check (char_length(emoji) <= 8),
  subject     text not null default 'annet' check (subject ~ '^[a-z]{2,20}$'),
  lang        text not null default 'nb' check (lang in ('nb', 'en')),
  questions   jsonb not null default '[]'::jsonb,
  published   boolean not null default false,
  hidden      boolean not null default false,   -- skjult av moderering (rapporter)
  plays       integer not null default 0,
  likes       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists community_courses_owner_idx on public.community_courses (owner);
create index if not exists community_courses_pub_idx on public.community_courses (published, hidden, likes desc);

-- Sjekker spørsmålene: 0–50 stk., typene mc (flervalg), tf (sant/usant) og num (tallsvar), rimelige lengder.
create or replace function public.valid_questions(q jsonb)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare x jsonb; t text; n int;
begin
  if jsonb_typeof(q) <> 'array' or jsonb_array_length(q) > 50 or octet_length(q::text) > 150000 then return false; end if;
  for x in select * from jsonb_array_elements(q) loop
    if jsonb_typeof(x) <> 'object' then return false; end if;
    t := x->>'t';
    if t not in ('mc', 'tf', 'num') then return false; end if;
    if char_length(coalesce(x->>'q', '')) not between 1 and 500 then return false; end if;
    if char_length(coalesce(x->>'e', '')) > 600 then return false; end if;
    if t = 'mc' then
      if jsonb_typeof(x->'o') <> 'array' then return false; end if;
      n := jsonb_array_length(x->'o');
      if n not between 2 and 4 then return false; end if;
      if exists (select 1 from jsonb_array_elements_text(x->'o') o where char_length(o) not between 1 and 150) then return false; end if;
      if (x->>'a') !~ '^[0-3]$' or (x->>'a')::int >= n then return false; end if;
    elsif t = 'tf' then
      if (x->>'a') not in ('0', '1') then return false; end if;
    else
      if jsonb_typeof(x->'n') <> 'number' then return false; end if;
      if char_length(coalesce(x->>'u', '')) > 20 then return false; end if;
    end if;
  end loop;
  return true;
end;
$$;

create or replace function public.community_courses_check()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' and (select count(*) from public.community_courses where owner = new.owner) >= 5 then raise exception 'too_many_courses'; end if;
  if not public.valid_questions(new.questions) then raise exception 'bad_questions'; end if;
  if not public.is_clean(new.title) or not public.is_clean(new.description) then raise exception 'bad_word'; end if;
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists community_courses_check on public.community_courses;
create trigger community_courses_check before insert or update on public.community_courses
  for each row execute function public.community_courses_check();

alter table public.community_courses enable row level security;
drop policy if exists "kurs - lese" on public.community_courses;
drop policy if exists "kurs - lage" on public.community_courses;
drop policy if exists "kurs - endre" on public.community_courses;
drop policy if exists "kurs - slette" on public.community_courses;
create policy "kurs - lese" on public.community_courses for select to authenticated
  using ((select auth.uid()) = owner or (published and not hidden and not public.is_blocked_between((select auth.uid()), owner)));
create policy "kurs - lage" on public.community_courses for insert to authenticated with check ((select auth.uid()) = owner);
create policy "kurs - endre" on public.community_courses for update to authenticated using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "kurs - slette" on public.community_courses for delete to authenticated using ((select auth.uid()) = owner);
revoke all on public.community_courses from anon, authenticated;
grant select, delete on public.community_courses to authenticated;
grant insert (owner, title, description, emoji, subject, lang, questions, published) on public.community_courses to authenticated;
grant update (title, description, emoji, subject, lang, questions, published) on public.community_courses to authenticated;
grant execute on function public.is_blocked_between(uuid, uuid) to authenticated; -- trengs av lese-regelen

-- Liker og spilt (én gang per bruker og kurs).
create table if not exists public.community_likes (
  user_id   uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.community_courses (id) on delete cascade,
  primary key (user_id, course_id)
);
create table if not exists public.community_plays (
  user_id   uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.community_courses (id) on delete cascade,
  primary key (user_id, course_id)
);
alter table public.community_likes enable row level security;
alter table public.community_plays enable row level security;
revoke all on public.community_likes, public.community_plays from anon, authenticated;

-- Liste til «Utforsk» og «Mine kurs». sort: 'popular' | 'new' | 'mine'.
drop function if exists public.list_community(text, text);
create function public.list_community(q text, sort text)
returns table (id uuid, title text, description text, emoji text, subject text, lang text, n_questions integer, plays integer, likes integer,
               published boolean, hidden boolean, author text, author_username text, liked boolean, mine boolean, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select c.id, c.title, c.description, c.emoji, c.subject, c.lang, jsonb_array_length(c.questions), c.plays, c.likes,
         c.published, c.hidden, coalesce(p.display_name, '?'), p.username,
         exists (select 1 from public.community_likes l where l.user_id = auth.uid() and l.course_id = c.id),
         c.owner = auth.uid(), c.updated_at
  from public.community_courses c left join public.profiles p on p.user_id = c.owner
  where auth.uid() is not null
    and (case when sort = 'mine' then c.owner = auth.uid()
              else c.published and not c.hidden and jsonb_array_length(c.questions) > 0 and not public.is_blocked_between(auth.uid(), c.owner) end)
    and (coalesce(btrim(q), '') = '' or c.title ilike '%' || btrim(q) || '%' or c.description ilike '%' || btrim(q) || '%' or c.subject = lower(btrim(q)))
  order by case when sort = 'new' or sort = 'mine' then extract(epoch from c.updated_at) else c.likes * 3 + c.plays end desc
  limit 60;
$$;

create or replace function public.toggle_like(cid uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid(); n int;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if not exists (select 1 from public.community_courses where id = cid and published and not hidden) then raise exception 'not_found'; end if;
  if exists (select 1 from public.community_likes where user_id = me and course_id = cid) then
    delete from public.community_likes where user_id = me and course_id = cid;
  else
    insert into public.community_likes (user_id, course_id) values (me, cid);
  end if;
  select count(*) into n from public.community_likes where course_id = cid;
  update public.community_courses set likes = n where id = cid;
  return n;
end;
$$;

create or replace function public.count_play(cid uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare me uuid := auth.uid();
begin
  if me is null then return; end if;
  insert into public.community_plays (user_id, course_id) values (me, cid) on conflict do nothing;
  if found then update public.community_courses set plays = plays + 1 where id = cid and owner <> me; end if;
end;
$$;

-- Et kurs som rapporteres av 3 forskjellige brukere, skjules automatisk.
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
  end if;
end;
$$;

revoke all on function public.valid_questions(jsonb)                            from public, anon;
revoke all on function public.list_community(text, text)                        from public, anon;
revoke all on function public.toggle_like(uuid)                                 from public, anon;
revoke all on function public.count_play(uuid)                                  from public, anon;
revoke all on function public.report_content(text, uuid, text, text, text)      from public, anon;
grant execute on function public.valid_questions(jsonb)                         to authenticated;
grant execute on function public.list_community(text, text)                     to authenticated;
grant execute on function public.toggle_like(uuid)                              to authenticated;
grant execute on function public.count_play(uuid)                               to authenticated;
grant execute on function public.report_content(text, uuid, text, text, text)   to authenticated;
