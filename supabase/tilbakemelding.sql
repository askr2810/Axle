-- Axle: tilbakemeldinger og feilrapporter fra appen lagres her, i stedet for bare på e-post.
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.
-- Krever at venner.sql og admin.sql er kjørt først (app_roles og staff_level).
--
--   Alle (også uten konto) kan sende inn via submit_feedback – aldri lese.
--   Mod/admin leser og markerer som behandlet i adminpanelet (fanen «Tilbakemeldinger»). Bare admin ser e-postadressen.
--   Claude (eller et skript) kan hente dem med en hemmelig eksportnøkkel, se nederst. Nøkkelen lagres bare som hash.

create table if not exists public.app_feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid(),
  kind text, category text, message text, email text,
  course text, unit text, level text, qid text, prompt text, correct text, user_answer text,
  lang text, version text, platform text,
  handled boolean not null default false, handled_at timestamptz, note text
);
alter table public.app_feedback enable row level security; -- ingen policyer: bare funksjonene under slipper til
create index if not exists app_feedback_open on public.app_feedback (handled, created_at desc);

create table if not exists public.feedback_export_keys (key_hash text primary key, label text, created_at timestamptz not null default now());
alter table public.feedback_export_keys enable row level security;

-- ---------- sende inn (alle) ----------
create or replace function public.submit_feedback(p jsonb)
returns void language plpgsql security definer set search_path = '' as $$
declare msg text := left(coalesce(p->>'message', ''), 3000);
begin
  if coalesce(p->>'kind', '') not in ('feedback', 'report') then raise exception 'bad_kind'; end if;
  if p->>'kind' = 'feedback' and length(trim(msg)) = 0 then raise exception 'empty'; end if;
  -- enkel søppelbrems: maks 20 per bruker per time, og 400 totalt per time
  if auth.uid() is not null and (select count(*) from public.app_feedback f where f.user_id = auth.uid() and f.created_at > now() - interval '1 hour') >= 20 then raise exception 'rate'; end if;
  if (select count(*) from public.app_feedback f where f.created_at > now() - interval '1 hour') >= 400 then raise exception 'rate'; end if;
  insert into public.app_feedback (kind, category, message, email, course, unit, level, qid, prompt, correct, user_answer, lang, version, platform)
  values (p->>'kind', left(p->>'category', 80), msg, left(nullif(p->>'email', ''), 200), left(p->>'course', 20), left(p->>'unit', 10), left(p->>'level', 20),
    left(p->>'qid', 40), left(p->>'prompt', 1500), left(p->>'correct', 500), left(p->>'userAnswer', 500), left(p->>'lang', 5), left(p->>'version', 20), left(p->>'platform', 20));
end $$;
revoke all on function public.submit_feedback(jsonb) from public;
grant execute on function public.submit_feedback(jsonb) to anon, authenticated;

-- ---------- adminpanelet (mod/admin) ----------
drop function if exists public.admin_feedback(boolean);
create function public.admin_feedback(p_handled boolean default false)
returns table (id bigint, created_at timestamptz, kind text, category text, message text, email text, course text, unit text, level text, qid text,
  prompt text, correct text, user_answer text, lang text, version text, platform text, handled boolean, note text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  return query select f.id, f.created_at, f.kind, f.category, f.message, case when public.staff_level() >= 2 then f.email else null end, f.course, f.unit, f.level, f.qid,
    f.prompt, f.correct, f.user_answer, f.lang, f.version, f.platform, f.handled, f.note
    from public.app_feedback f where f.handled = p_handled order by f.created_at desc limit 300;
end $$;
revoke all on function public.admin_feedback(boolean) from public, anon;
grant execute on function public.admin_feedback(boolean) to authenticated;

create or replace function public.admin_feedback_mark(p_id bigint, p_handled boolean)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if public.staff_level() < 1 then raise exception 'not_staff'; end if;
  update public.app_feedback set handled = p_handled, handled_at = case when p_handled then now() else null end where id = p_id;
end $$;
revoke all on function public.admin_feedback_mark(bigint, boolean) from public, anon;
grant execute on function public.admin_feedback_mark(bigint, boolean) to authenticated;

-- ---------- eksport for Claude (hemmelig nøkkel) ----------
-- Lag en nøkkel (en lang tilfeldig tekst) og registrer hashen av den slik (bytt ut teksten):
--   insert into public.feedback_export_keys (key_hash, label) values (encode(sha256(convert_to('LIM-INN-NØKKELEN-HER', 'UTF8')), 'hex'), 'claude') on conflict do nothing;
-- Selve nøkkelen legges bare som hemmelighet (AXLE_FEEDBACK_KEY) i miljøet der Claude kjører – aldri i appen eller i repoet.
create or replace function public.feedback_key_ok(p_key text)
returns boolean language sql stable security definer set search_path = '' as $$
  select length(coalesce(p_key, '')) >= 24 and exists (select 1 from public.feedback_export_keys k where k.key_hash = encode(sha256(convert_to(p_key, 'UTF8')), 'hex'))
$$;
revoke all on function public.feedback_key_ok(text) from public, anon, authenticated;

create or replace function public.feedback_export(p_key text, p_all boolean default false)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.feedback_key_ok(p_key) then raise exception 'bad_key'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', f.id, 'at', f.created_at, 'kind', f.kind, 'category', f.category, 'message', f.message,
      'course', f.course, 'unit', f.unit, 'level', f.level, 'qid', f.qid, 'prompt', f.prompt, 'correct', f.correct, 'answer', f.user_answer,
      'lang', f.lang, 'version', f.version, 'platform', f.platform, 'handled', f.handled, 'note', f.note) order by f.created_at desc)
    from (select * from public.app_feedback f2 where p_all or not f2.handled order by f2.created_at desc limit 500) f), '[]'::jsonb);
end $$;
revoke all on function public.feedback_export(text, boolean) from public;
grant execute on function public.feedback_export(text, boolean) to anon, authenticated;

-- Claude markerer det som er fikset (med en kort merknad om hva som ble gjort).
create or replace function public.feedback_export_mark(p_key text, p_ids bigint[], p_note text default null)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if not public.feedback_key_ok(p_key) then raise exception 'bad_key'; end if;
  update public.app_feedback set handled = true, handled_at = now(), note = coalesce(left(p_note, 500), note) where id = any(p_ids);
  get diagnostics n = row_count; return n;
end $$;
revoke all on function public.feedback_export_mark(text, bigint[], text) from public;
grant execute on function public.feedback_export_mark(text, bigint[], text) to anon, authenticated;
