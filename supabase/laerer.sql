-- ============================================================
--  LÆRER – egne oppgavesett til lekser og quiz (teach.js).
--  Kjør i Supabase → SQL Editor etter oppsett.sql og fellesskap.sql (bruker valid_questions derfra).
--  Trygg å kjøre flere ganger. Appen virker uten denne filen; da kan læreren bare bruke Axles egne oppgaver.
--
--  Et sett er privat for læreren, men alle som har lenken (også elever uten konto) kan hente oppgavene
--  med lekse_get – akkurat som en lenke til et dokument. Spørsmålsformatet er det samme som i Fellesskap:
--  { t: 'mc' | 'tf' | 'num', q, o: [...], a, n, tol (%), u, e }. Maks 50 spørsmål per sett, 200 sett per lærer.
--  Tabellen har RLS uten policyer: all tilgang går gjennom funksjonene under.
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
