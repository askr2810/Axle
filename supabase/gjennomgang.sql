-- Axle: gjennomgang av innhold for fagpersoner (#/gjennomgang).
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at oppsett.sql er kjørt (auth.users). Appen virker uten denne filen; da er siden stengt
-- og merket «Kontrollert av fagperson» vises ikke.
--
-- Ingen invitasjonslenke. Tilgang gis bare til en konto som allerede finnes.
--
-- 1) Første eier (bytt e-post). Personen må ha logget inn i Axle minst én gang:
--    insert into public.reviewers (user_id, name, subjects, role, active)
--    select id, 'Ask', array['*'], 'owner', true from auth.users
--    where lower(email) = lower('EIER-EPOST')
--    on conflict (user_id) do update
--      set name = excluded.name, subjects = excluded.subjects, role = 'owner', active = true;
--
-- 2) Legg til en fagperson (fagkoder, eller '*' for alle):
--    insert into public.reviewers (user_id, name, subjects, role, active)
--    select id, 'Kari Nordmann', array['VG1T','VG2P'], 'reviewer', true from auth.users
--    where lower(email) = lower('kari@skole.no')
--    on conflict (user_id) do update
--      set name = excluded.name, subjects = excluded.subjects, role = excluded.role, active = true;
--
-- 3) Ta tilgangen:
--    update public.reviewers set active = false
--    where user_id = (select id from auth.users where lower(email) = lower('kari@skole.no'));
--
-- Etter at eieren finnes, kan hen også gjøre 2 og 3 på siden (fanen Fagpersoner).
-- Eier ser alle vurderinger. Fagperson ser bare fagene i subjects.
-- Forslag skrives aldri inn i innholdet. Eier/agent lister dem med tools/gjennomgang.mjs
-- (AXLE_FEEDBACK_KEY). Nøkkelen kan være den samme som i tilbakemelding.sql, eller registreres her:
--    insert into public.review_export_keys (key_hash, label)
--    values (encode(sha256(convert_to('LIM-INN-NØKKELEN-HER', 'UTF8')), 'hex'), 'eier')
--    on conflict do nothing;

-- ---------- hvem ----------
create table if not exists public.reviewers (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text not null check (char_length(btrim(name)) between 1 and 60),
  subjects   text[] not null check (cardinality(subjects) >= 1),
  role       text not null default 'reviewer' check (role in ('reviewer', 'owner')),
  active     boolean not null default true,
  granted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.reviewers enable row level security;
revoke all on public.reviewers from public, anon, authenticated;

-- ---------- vurderinger (godkjent / flagg). Ny rad per handling, så tidspunkt og hash beholdes. ----------
create table if not exists public.content_reviews (
  id           bigint generated always as identity primary key,
  topic_id     text not null check (topic_id ~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$'),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{16}$'),
  verdict      text not null check (verdict in ('approved', 'flagged')),
  comment      text check (comment is null or char_length(comment) between 2 and 500),
  reviewer_id  uuid not null references auth.users (id) on delete cascade,
  created_at   timestamptz not null default now(),
  handled      boolean not null default false,
  handled_at   timestamptz,
  check (
    (verdict = 'approved' and comment is null)
    or (verdict = 'flagged' and comment is not null)
  )
);
create index if not exists content_reviews_topic_idx on public.content_reviews (topic_id, created_at desc);
create index if not exists content_reviews_reviewer_idx on public.content_reviews (reviewer_id, created_at desc);
alter table public.content_reviews enable row level security;
revoke all on public.content_reviews from public, anon, authenticated;

-- ---------- forslag. Publiseres aldri av seg selv (ingen skriving til innholdet). ----------
create table if not exists public.content_suggestions (
  id           bigint generated always as identity primary key,
  topic_id     text not null check (topic_id ~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$'),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{16}$'),
  field        text not null check (field ~ '^(theory|example|tip|q[0-9]{1,3})$'),
  lang         text not null check (lang in ('nb', 'en')),
  before_text  text not null check (char_length(before_text) <= 8000),
  after_text   text not null check (char_length(btrim(after_text)) between 1 and 8000),
  reviewer_id  uuid not null references auth.users (id) on delete cascade,
  created_at   timestamptz not null default now(),
  status       text not null default 'pending' check (status in ('pending', 'handled')),
  handled_at   timestamptz
);
create index if not exists content_suggestions_status_idx on public.content_suggestions (status, created_at desc);
alter table public.content_suggestions enable row level security;
revoke all on public.content_suggestions from public, anon, authenticated;

create table if not exists public.review_export_keys (
  key_hash   text primary key,
  label      text,
  created_at timestamptz not null default now()
);
alter table public.review_export_keys enable row level security;
revoke all on public.review_export_keys from public, anon, authenticated;

-- ---------- interne hjelpere (ikke til klienten) ----------
create or replace function public.review_is_owner()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.reviewers w
    where w.user_id = auth.uid() and w.active and w.role = 'owner')
$$;
revoke all on function public.review_is_owner() from public, anon, authenticated;

create or replace function public.review_topic_ok(p_topic text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.reviewers w
    where w.user_id = auth.uid() and w.active
      and (w.role = 'owner' or '*' = any (w.subjects) or split_part(p_topic, '|', 1) = any (w.subjects)))
$$;
revoke all on function public.review_topic_ok(text) from public, anon, authenticated;

-- Siste aktive vurdering på denne hashen er godkjent. Eldre godkjenning teller ikke hvis noen har flagget etterpå.
-- Deaktivert fagperson teller ikke, så eieren kan trekke et merke ved å fjerne tilgangen.
create or replace function public.review_hash_ok(p_id text, p_hash text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((
    select c.verdict = 'approved'
    from public.content_reviews c
    join public.reviewers w on w.user_id = c.reviewer_id and w.active
    where c.topic_id = p_id and c.content_hash = p_hash
    order by c.created_at desc, c.id desc
    limit 1
  ), false)
$$;
revoke all on function public.review_hash_ok(text, text) from public, anon, authenticated;

-- ---------- klienten ----------
create or replace function public.review_me()
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare r public.reviewers;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'reason', 'auth'); end if;
  select * into r from public.reviewers where user_id = auth.uid();
  if r.user_id is null or not r.active then return jsonb_build_object('ok', false, 'reason', 'not_reviewer'); end if;
  return jsonb_build_object('ok', true, 'role', r.role, 'name', r.name, 'subjects', to_jsonb(r.subjects), 'active', r.active);
end;
$$;
revoke all on function public.review_me() from public, anon;
grant execute on function public.review_me() to authenticated;

create or replace function public.review_state(p_items jsonb)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  n int; i int; it jsonb; id text; h text; out jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not exists (select 1 from public.reviewers w where w.user_id = auth.uid() and w.active) then
    raise exception 'not_reviewer';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' then return '[]'::jsonb; end if;
  n := jsonb_array_length(p_items);
  if n > 400 then raise exception 'too_many'; end if;
  for i in 0 .. n - 1 loop
    it := p_items -> i; id := it->>'id'; h := it->>'hash';
    if id is null or h is null then continue; end if;
    if id !~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$' then continue; end if;
    if h !~ '^[0-9a-f]{16}$' then continue; end if;
    if not public.review_topic_ok(id) then continue; end if;
    out := out || jsonb_build_array(jsonb_build_object(
      'topic_id', id,
      'approved', public.review_hash_ok(id, h),
      'flags', (select count(*)::int from public.content_reviews c where c.topic_id = id and c.verdict = 'flagged'),
      'mine', (select case when c.content_hash = h then c.verdict else null end
               from public.content_reviews c
               where c.topic_id = id and c.reviewer_id = auth.uid()
               order by c.created_at desc, c.id desc limit 1)
    ));
  end loop;
  return out;
end;
$$;
revoke all on function public.review_state(jsonb) from public, anon;
grant execute on function public.review_state(jsonb) to authenticated;

create or replace function public.review_submit(p_topic text, p_hash text, p_verdict text, p_comment text)
returns void
language plpgsql volatile security definer set search_path = ''
as $$
declare cmt text := nullif(btrim(coalesce(p_comment, '')), '');
begin
  if not public.review_topic_ok(p_topic) then raise exception 'not_reviewer'; end if;
  if p_topic !~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$' then raise exception 'bad_topic'; end if;
  if p_hash !~ '^[0-9a-f]{16}$' then raise exception 'bad_hash'; end if;
  if p_verdict not in ('approved', 'flagged') then raise exception 'bad_verdict'; end if;
  if p_verdict = 'flagged' and (cmt is null or char_length(cmt) < 2 or char_length(cmt) > 500) then raise exception 'flag_comment'; end if;
  if (select count(*) from public.content_reviews c where c.reviewer_id = auth.uid() and c.created_at > now() - interval '1 hour') >= 400 then
    raise exception 'rate';
  end if;
  insert into public.content_reviews (topic_id, content_hash, verdict, comment, reviewer_id)
  values (p_topic, p_hash, p_verdict, case when p_verdict = 'flagged' then cmt else null end, auth.uid());
end;
$$;
revoke all on function public.review_submit(text, text, text, text) from public, anon;
grant execute on function public.review_submit(text, text, text, text) to authenticated;

create or replace function public.review_suggest(p_topic text, p_hash text, p_field text, p_lang text, p_before text, p_after text)
returns void
language plpgsql volatile security definer set search_path = ''
as $$
begin
  if not public.review_topic_ok(p_topic) then raise exception 'not_reviewer'; end if;
  if p_topic !~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$' then raise exception 'bad_topic'; end if;
  if p_hash !~ '^[0-9a-f]{16}$' then raise exception 'bad_hash'; end if;
  if p_field !~ '^(theory|example|tip|q[0-9]{1,3})$' then raise exception 'bad_field'; end if;
  if p_lang not in ('nb', 'en') then raise exception 'bad_lang'; end if;
  if p_after is null or char_length(btrim(p_after)) < 1 or char_length(p_after) > 8000 then raise exception 'bad_text'; end if;
  if char_length(coalesce(p_before, '')) > 8000 then raise exception 'bad_text'; end if;
  if (select count(*) from public.content_suggestions s where s.reviewer_id = auth.uid() and s.created_at > now() - interval '1 hour') >= 200 then
    raise exception 'rate';
  end if;
  -- Forslaget lagres bare her. Det kopieres ikke til oppgaver, teori eller emnesider.
  insert into public.content_suggestions (topic_id, content_hash, field, lang, before_text, after_text, reviewer_id)
  values (p_topic, p_hash, p_field, p_lang, coalesce(p_before, ''), btrim(p_after), auth.uid());
end;
$$;
revoke all on function public.review_suggest(text, text, text, text, text, text) from public, anon;
grant execute on function public.review_suggest(text, text, text, text, text, text) to authenticated;

-- Åpent merke: sant bare når godkjent vurdering matcher hashen appen sender (nåværende innhold).
create or replace function public.review_seal(p_id text, p_hash text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select case
    when p_id ~ '^[A-Z0-9]{2,12}\|(tp|un)\|[A-Za-z0-9._-]{1,80}$' and p_hash ~ '^[0-9a-f]{16}$'
    then public.review_hash_ok(p_id, p_hash) else false end
$$;
revoke all on function public.review_seal(text, text) from public;
grant execute on function public.review_seal(text, text) to anon, authenticated;

-- ---------- eier ----------
create or replace function public.review_people()
returns table (user_id uuid, name text, email text, subjects text[], role text, active boolean, created_at timestamptz)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.review_is_owner() then raise exception 'not_owner'; end if;
  return query
  select w.user_id, w.name, u.email::text, w.subjects, w.role, w.active, w.created_at
  from public.reviewers w
  left join auth.users u on u.id = w.user_id
  order by w.role desc, w.name;
end;
$$;
revoke all on function public.review_people() from public, anon;
grant execute on function public.review_people() to authenticated;

create or replace function public.review_grant(p_email text, p_name text, p_subjects text[], p_role text, p_active boolean)
returns void
language plpgsql volatile security definer set search_path = ''
as $$
declare uid uuid; v_name text; v_role text; v_subjects text[]; was_role text; was_active boolean; n_owners int; s text;
begin
  if not public.review_is_owner() then raise exception 'not_owner'; end if;
  v_name := btrim(coalesce(p_name, ''));
  if char_length(v_name) < 1 or char_length(v_name) > 60 then raise exception 'bad_name'; end if;
  v_role := case when p_role = 'owner' then 'owner' else 'reviewer' end;
  if p_subjects is null or cardinality(p_subjects) < 1 then raise exception 'no_subjects'; end if;
  foreach s in array p_subjects loop
    if s is null or (s <> '*' and s !~ '^[A-Z0-9]{2,12}$') then raise exception 'bad_subject'; end if;
  end loop;
  v_subjects := case when v_role = 'owner' then array['*'] else p_subjects end;
  select u.id into uid from auth.users u where lower(u.email::text) = lower(btrim(coalesce(p_email, ''))) limit 1;
  if uid is null then raise exception 'no_user'; end if;
  select w.role, w.active into was_role, was_active from public.reviewers w where w.user_id = uid;
  select count(*) into n_owners from public.reviewers w where w.role = 'owner' and w.active;
  if was_role = 'owner' and was_active and (not coalesce(p_active, false) or v_role <> 'owner') and n_owners <= 1 then
    raise exception 'last_owner';
  end if;
  insert into public.reviewers (user_id, name, subjects, role, active, granted_by)
  values (uid, v_name, v_subjects, v_role, coalesce(p_active, true), auth.uid())
  on conflict (user_id) do update
    set name = excluded.name, subjects = excluded.subjects, role = excluded.role, active = excluded.active, granted_by = auth.uid();
end;
$$;
revoke all on function public.review_grant(text, text, text[], text, boolean) from public, anon;
grant execute on function public.review_grant(text, text, text[], text, boolean) to authenticated;

create or replace function public.review_set_active(p_user uuid, p_active boolean)
returns void
language plpgsql volatile security definer set search_path = ''
as $$
declare was_role text; was_active boolean; n_owners int;
begin
  if not public.review_is_owner() then raise exception 'not_owner'; end if;
  select w.role, w.active into was_role, was_active from public.reviewers w where w.user_id = p_user;
  if was_role is null then raise exception 'no_user'; end if;
  select count(*) into n_owners from public.reviewers w where w.role = 'owner' and w.active;
  if was_role = 'owner' and was_active and not coalesce(p_active, false) and n_owners <= 1 then raise exception 'last_owner'; end if;
  update public.reviewers set active = coalesce(p_active, false) where user_id = p_user;
end;
$$;
revoke all on function public.review_set_active(uuid, boolean) from public, anon;
grant execute on function public.review_set_active(uuid, boolean) to authenticated;

create or replace function public.review_log(p_limit int default 80)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.review_is_owner() then raise exception 'not_owner'; end if;
  return coalesce((select jsonb_agg(row_to_json(x) order by x.created_at desc) from (
    select c.id, c.topic_id, c.content_hash, c.verdict, c.comment, c.created_at, c.handled, w.name as reviewer_name
    from public.content_reviews c
    left join public.reviewers w on w.user_id = c.reviewer_id
    order by c.created_at desc
    limit least(greatest(coalesce(p_limit, 80), 1), 200)
  ) x), '[]'::jsonb);
end;
$$;
revoke all on function public.review_log(int) from public, anon;
grant execute on function public.review_log(int) to authenticated;

-- ---------- eksport for eier/agent (hemmelig nøkkel, samme mønster som tilbakemelding.sql) ----------
create or replace function public.review_key_ok(p_key text)
returns boolean
language plpgsql stable security definer set search_path = ''
as $$
begin
  if length(coalesce(p_key, '')) < 24 then return false; end if;
  if exists (select 1 from public.review_export_keys k where k.key_hash = encode(sha256(convert_to(p_key, 'UTF8')), 'hex')) then
    return true;
  end if;
  if to_regprocedure('public.feedback_key_ok(text)') is not null then
    return public.feedback_key_ok(p_key);
  end if;
  return false;
end;
$$;
revoke all on function public.review_key_ok(text) from public, anon, authenticated;

create or replace function public.review_export(p_key text, p_all boolean default false)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.review_key_ok(p_key) then raise exception 'bad_key'; end if;
  return jsonb_build_object(
    'flags', coalesce((select jsonb_agg(row_to_json(x) order by x.created_at desc) from (
      select c.id, c.topic_id, c.content_hash, c.comment, c.created_at, c.handled, c.reviewer_id, w.name as reviewer_name
      from public.content_reviews c
      left join public.reviewers w on w.user_id = c.reviewer_id
      where c.verdict = 'flagged' and (p_all or not c.handled)
      order by c.created_at desc limit 200) x), '[]'::jsonb),
    'suggestions', coalesce((select jsonb_agg(row_to_json(x) order by x.created_at desc) from (
      select s.id, s.topic_id, s.content_hash, s.field, s.lang, s.before_text, s.after_text, s.status, s.created_at, s.reviewer_id, w.name as reviewer_name
      from public.content_suggestions s
      left join public.reviewers w on w.user_id = s.reviewer_id
      where p_all or s.status = 'pending'
      order by s.created_at desc limit 200) x), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.review_export(text, boolean) from public;
grant execute on function public.review_export(text, boolean) to anon, authenticated;

create or replace function public.review_export_mark(p_key text, p_kind text, p_ids bigint[])
returns int
language plpgsql volatile security definer set search_path = ''
as $$
declare n int;
begin
  if not public.review_key_ok(p_key) then raise exception 'bad_key'; end if;
  if p_kind = 'flag' then
    update public.content_reviews set handled = true, handled_at = now()
    where verdict = 'flagged' and id = any (p_ids);
  elsif p_kind = 'suggestion' then
    update public.content_suggestions set status = 'handled', handled_at = now()
    where status = 'pending' and id = any (p_ids);
  else raise exception 'bad_kind'; end if;
  get diagnostics n = row_count; return n;
end;
$$;
revoke all on function public.review_export_mark(text, text, bigint[]) from public;
grant execute on function public.review_export_mark(text, text, bigint[]) to anon, authenticated;
