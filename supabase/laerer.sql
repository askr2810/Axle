-- ============================================================
--  LÆRER – egne oppgavesett til lekser og quiz (teach.js).
--  Kjør i Supabase → SQL Editor etter oppsett.sql, venner.sql (is_clean) og fellesskap.sql (valid_questions).
--  Trygg å kjøre flere ganger. Appen virker uten denne filen; da kan læreren bare bruke Axles egne oppgaver.
--
--  Et sett er privat for læreren, men alle som har lenken (også elever uten konto) kan hente oppgavene
--  med lekse_get – akkurat som en lenke til et dokument. Spørsmålsformatet er det samme som i Fellesskap:
--  { t: 'mc' | 'tf' | 'num', q, o: [...], a, n, tol (%), u, e }. Maks 50 spørsmål per sett, 200 sett per lærer.
--  Tabellen har RLS uten policyer: all tilgang går gjennom funksjonene under.
--
--  DELING (nederst i fila): hvem som helst med konto kan dele et sett med fellesskapet (is_public). Delte sett kan
--  søkes opp av alle (også uten konto), brukes i lekser og quiz, kopieres og endres som sitt eget, og rapporteres.
--  Sett som rapporteres av tre eller flere, skjules fra søket til en moderator har sett på dem.
-- ============================================================

create table if not exists public.lekse_sets (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users (id) on delete cascade,
  title       text not null check (char_length(title) between 1 and 80),
  questions   jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists lekse_sets_owner_idx on public.lekse_sets (owner, updated_at desc);
alter table public.lekse_sets enable row level security;
revoke all on public.lekse_sets from anon, authenticated;

-- Lagre (nytt eller endre eget). Returnerer id-en.
create or replace function public.lekse_save(p_id uuid, p_title text, p_questions jsonb)
returns uuid language plpgsql volatile security definer set search_path = ''
as $$
declare me uuid := auth.uid(); new_id uuid;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if char_length(btrim(coalesce(p_title, ''))) not between 1 and 80 then raise exception 'bad_title'; end if;
  if jsonb_array_length(coalesce(p_questions, '[]'::jsonb)) < 1 or not public.valid_questions(p_questions) then raise exception 'bad_questions'; end if;
  if p_id is not null then
    update public.lekse_sets set title = btrim(p_title), questions = p_questions, updated_at = now() where id = p_id and owner = me returning id into new_id;
    if new_id is null then raise exception 'not_found'; end if;
    return new_id;
  end if;
  if (select count(*) from public.lekse_sets where owner = me) >= 200 then raise exception 'too_many'; end if;
  insert into public.lekse_sets (owner, title, questions) values (me, btrim(p_title), p_questions) returning id into new_id;
  return new_id;
end $$;

-- Mine sett (uten selve spørsmålene)
create or replace function public.lekse_mine()
returns jsonb language sql stable security definer set search_path = ''
as $$ select coalesce(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'n', jsonb_array_length(questions), 'updated_at', updated_at) order by updated_at desc), '[]'::jsonb)
  from public.lekse_sets where owner = auth.uid() $$;

-- Hent et sett med lenken (åpen for alle, også uten konto)
create or replace function public.lekse_get(p_id uuid)
returns jsonb language sql stable security definer set search_path = ''
as $$ select jsonb_build_object('id', id, 'title', title, 'questions', questions, 'mine', owner = auth.uid()) from public.lekse_sets where id = p_id $$;

create or replace function public.lekse_delete(p_id uuid)
returns void language sql volatile security definer set search_path = ''
as $$ delete from public.lekse_sets where id = p_id and owner = auth.uid() $$;

revoke all on function public.lekse_save(uuid, text, jsonb), public.lekse_mine(), public.lekse_get(uuid), public.lekse_delete(uuid) from public, anon;
grant execute on function public.lekse_save(uuid, text, jsonb), public.lekse_mine(), public.lekse_delete(uuid) to authenticated;
grant execute on function public.lekse_get(uuid) to anon, authenticated;

-- ============================================================
--  DELING MED FELLESSKAPET
-- ============================================================
alter table public.lekse_sets add column if not exists is_public boolean not null default false;
alter table public.lekse_sets add column if not exists subject text not null default 'annet';
alter table public.lekse_sets add column if not exists level text not null default 'alle';
alter table public.lekse_sets add column if not exists author text;
alter table public.lekse_sets add column if not exists uses integer not null default 0;
create index if not exists lekse_sets_public_idx on public.lekse_sets (uses desc, updated_at desc) where is_public;

create table if not exists public.lekse_reports (
  set_id     uuid not null references public.lekse_sets (id) on delete cascade,
  reporter   uuid not null references auth.users (id) on delete cascade,
  reason     text,
  created_at timestamptz not null default now(),
  primary key (set_id, reporter)
);
alter table public.lekse_reports enable row level security;
revoke all on public.lekse_reports from anon, authenticated;

-- Del (eller slutt å dele) et eget sett. Fag og nivå fra faste lister; navnet som vises, sjekkes mot ordfilteret.
create or replace function public.lekse_publish(p_id uuid, p_public boolean, p_subject text, p_level text, p_author text)
returns void language plpgsql volatile security definer set search_path = ''
as $$
declare me uuid := auth.uid(); t text;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  select title into t from public.lekse_sets where id = p_id and owner = me;
  if t is null then raise exception 'not_found'; end if;
  if p_subject not in ('matte','norsk','engelsk','naturfag','samfunn','krle','fysikk','kjemi','biologi','historie','geografi','ingenior','helse','okonomi','forerkort','sprak','annet') then raise exception 'bad_subject'; end if;
  if p_level not in ('1-4','5-7','8-10','vgs','hoyere','alle') then raise exception 'bad_level'; end if;
  if coalesce(p_public, false) and (not public.is_clean(t) or not public.is_clean(coalesce(p_author, ''))) then raise exception 'bad_word'; end if;
  update public.lekse_sets set is_public = coalesce(p_public, false), subject = p_subject, level = p_level,
    author = nullif(left(btrim(coalesce(p_author, '')), 40), '') where id = p_id and owner = me;
end $$;

-- Søk i delte sett (åpen for alle). Skjuler sett med 3+ rapporter.
create or replace function public.lekse_search(p_q text, p_subject text, p_level text)
returns jsonb language sql stable security definer set search_path = ''
as $$ select coalesce(jsonb_agg(r order by (r->>'uses')::int desc, r->>'updated_at' desc), '[]'::jsonb) from (
  select jsonb_build_object('id', s.id, 'title', s.title, 'n', jsonb_array_length(s.questions), 'subject', s.subject, 'level', s.level,
    'author', coalesce(s.author, 'Anonym'), 'uses', s.uses, 'updated_at', s.updated_at, 'mine', s.owner = auth.uid()) as r
  from public.lekse_sets s
  where s.is_public
    and (select count(*) from public.lekse_reports x where x.set_id = s.id) < 3
    and (coalesce(p_q, '') = '' or s.title ilike '%' || replace(replace(left(p_q, 60), '%', ''), '_', '') || '%')
    and (coalesce(p_subject, '') = '' or s.subject = p_subject)
    and (coalesce(p_level, '') = '' or s.level = p_level or s.level = 'alle')
  order by s.uses desc, s.updated_at desc limit 60) q $$;

-- Noen brukte et delt sett i en lekse eller quiz (teller til «brukt N ganger»)
create or replace function public.lekse_use(p_id uuid)
returns void language sql volatile security definer set search_path = ''
as $$ update public.lekse_sets set uses = uses + 1 where id = p_id and is_public and owner <> auth.uid() $$;

-- Kopier et delt sett (eller et eget) til mine sett, så jeg kan endre det
create or replace function public.lekse_copy(p_id uuid)
returns uuid language plpgsql volatile security definer set search_path = ''
as $$
declare me uuid := auth.uid(); src public.lekse_sets; new_id uuid;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  select * into src from public.lekse_sets where id = p_id and (is_public or owner = me);
  if src.id is null then raise exception 'not_found'; end if;
  if (select count(*) from public.lekse_sets where owner = me) >= 200 then raise exception 'too_many'; end if;
  insert into public.lekse_sets (owner, title, questions, subject, level)
    values (me, left(src.title || ' (kopi)', 80), src.questions, src.subject, src.level) returning id into new_id;
  return new_id;
end $$;

-- Rapporter et delt sett (én gang per bruker)
create or replace function public.lekse_report(p_id uuid, p_reason text)
returns void language sql volatile security definer set search_path = ''
as $$ insert into public.lekse_reports (set_id, reporter, reason) select p_id, auth.uid(), left(coalesce(p_reason, ''), 200)
  where auth.uid() is not null and exists (select 1 from public.lekse_sets where id = p_id and is_public) on conflict do nothing $$;

-- Mine sett og ett sett: nå også med delingsinfo
create or replace function public.lekse_mine()
returns jsonb language sql stable security definer set search_path = ''
as $$ select coalesce(jsonb_agg(jsonb_build_object('id', id, 'title', title, 'n', jsonb_array_length(questions), 'updated_at', updated_at,
    'is_public', is_public, 'subject', subject, 'level', level, 'uses', uses) order by updated_at desc), '[]'::jsonb)
  from public.lekse_sets where owner = auth.uid() $$;
create or replace function public.lekse_get(p_id uuid)
returns jsonb language sql stable security definer set search_path = ''
as $$ select jsonb_build_object('id', id, 'title', title, 'questions', questions, 'mine', owner = auth.uid(),
    'is_public', is_public, 'subject', subject, 'level', level, 'author', author) from public.lekse_sets where id = p_id $$;

revoke all on function public.lekse_publish(uuid, boolean, text, text, text), public.lekse_search(text, text, text), public.lekse_use(uuid),
  public.lekse_copy(uuid), public.lekse_report(uuid, text) from public, anon;
grant execute on function public.lekse_publish(uuid, boolean, text, text, text), public.lekse_use(uuid), public.lekse_copy(uuid), public.lekse_report(uuid, text) to authenticated;
grant execute on function public.lekse_search(text, text, text) to anon, authenticated;
grant execute on function public.lekse_mine() to authenticated;
grant execute on function public.lekse_get(uuid) to anon, authenticated;
