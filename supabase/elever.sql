-- ============================================================
--  ELEVER – lærerens klasser og elevprofiler uten e-post (teach.js, cloud.js, functions/elever).
--  Kjør i Supabase → SQL Editor etter oppsett.sql (progress) og hoderegning.sql (mq_results). Trygg å kjøre flere ganger.
--  Appen virker uten denne fila; da viser lærerverktøyet hvordan elevprofiler slås på (se supabase/ELEVER.md).
--
--  Modell: en elevprofil er en vanlig Supabase-bruker uten ekte e-post. Den interne adressen er <brukernavn>.<klassetagg>@elev.axle.no
--  og brukes bare til innlogging med passord (det kommer aldri e-post dit). Da virker synkronisert fremgang (progress, RLS) og lekser
--  (mq_submit) uendret for eleven, og eleven kan aldri komme inn på lærerens konto.
--  Innloggingsnavnet eleven skriver, er <brukernavn>.<klassetagg>, f.eks. «ola.k7mq». Brukernavnet er unikt i klassen; klassetaggen er unik.
--
--  Opprettelse og nytt passord krever Supabase sitt admin-API og går derfor gjennom Edge Function «elever» (service_role).
--  Funksjonene som bare den skal kalle, er låst til service_role. Lærerens egne funksjoner sjekker auth.uid().
--  Grense: høyst 200 elevprofiler per lærer. Den håndheves av en trigger med en transaksjonslås per lærer, så samtidige
--  opprettelser venter på hverandre og kan ikke gå forbi grensen. Plassen reserveres før brukeren lages i Auth.
--
--  Personvern: lagrer bare brukernavn, visningsnavn (gjerne bare fornavn) og klasse. Ingen e-post, fødselsdato eller telefon.
--  Passord lagres bare som hash i Supabase Auth og vises én gang for læreren når det lages.
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.teacher_classes (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 40),
  tag         text not null unique check (tag ~ '^[a-z0-9]{4,6}$'),
  join_code   text unique check (join_code ~ '^[A-Z0-9]{6}$'),   -- klassekode for selvregistrering; null = av
  created_at  timestamptz not null default now()
);
create index if not exists teacher_classes_owner_idx on public.teacher_classes (owner);

create table if not exists public.class_students (
  id            uuid primary key default gen_random_uuid(),
  teacher       uuid not null references auth.users (id) on delete cascade,
  class_id      uuid not null references public.teacher_classes (id) on delete cascade,
  user_id       uuid unique references auth.users (id) on delete cascade,   -- null mens profilen lages i Auth
  username      text not null check (username ~ '^[a-z0-9][a-z0-9_-]{1,19}$'),
  display_name  text not null check (char_length(display_name) between 1 and 40),
  self_joined   boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (class_id, username)
);
create index if not exists class_students_teacher_idx on public.class_students (teacher);

alter table public.teacher_classes enable row level security;
alter table public.class_students enable row level security;
revoke all on public.teacher_classes, public.class_students from anon, authenticated;   -- all tilgang går gjennom funksjonene under

-- ---------- grensen: høyst 200 elevprofiler per lærer (også ved samtidige opprettelser) ----------
create or replace function public.class_students_limit()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  -- én lås per lærer, holdt til transaksjonen er ferdig: neste opprettelse for samme lærer venter og teller på nytt
  perform pg_advisory_xact_lock(hashtextextended('axle.elever:' || new.teacher::text, 0));
  if (select count(*) from public.class_students where teacher = new.teacher) >= 200 then raise exception 'too_many_students'; end if;
  return new;
end $$;
drop trigger if exists class_students_limit on public.class_students;
create trigger class_students_limit before insert on public.class_students for each row execute function public.class_students_limit();

-- hjelpere
create or replace function public.is_student(uid uuid)
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.class_students where user_id = uid) $$;

create or replace function public.elev_rand(n int, alphabet text)
returns text language sql volatile set search_path = ''
as $$ select string_agg(substr(alphabet, 1 + (get_byte(b, i) % char_length(alphabet)), 1), '' order by i)
  from (select extensions.gen_random_bytes(n) b) x, generate_series(0, n - 1) i $$;

-- brukernavn fra et navn: små bokstaver, æøå → ae o a, bare a–z, 0–9, - og _, 2–16 tegn
create or replace function public.elev_slug(p text)
returns text language sql immutable set search_path = ''
as $$ select left(regexp_replace(regexp_replace(translate(lower(btrim(coalesce(p, ''))), 'æøåäöüéèêáàíóú', 'aoaaouaeeaaiou'), '\s+', '-', 'g'), '[^a-z0-9_-]', '', 'g'), 16) $$;

-- ---------- lærerens funksjoner (innlogget lærer) ----------
create or replace function public.klasse_create(p_name text)
returns jsonb language plpgsql volatile security definer set search_path = ''
as $$
declare me uuid := auth.uid(); t text; r public.teacher_classes;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  if public.is_student(me) then raise exception 'student_account'; end if;
  if char_length(btrim(coalesce(p_name, ''))) not between 1 and 40 then raise exception 'bad_name'; end if;
  if (select count(*) from public.teacher_classes where owner = me) >= 30 then raise exception 'too_many_classes'; end if;
  loop
    t := public.elev_rand(4, 'abcdefghjkmnpqrstuvwxyz23456789');
    exit when not exists (select 1 from public.teacher_classes where tag = t);
  end loop;
  insert into public.teacher_classes (owner, name, tag) values (me, btrim(p_name), t) returning * into r;
  return jsonb_build_object('id', r.id, 'name', r.name, 'tag', r.tag);
end $$;

create or replace function public.klasse_rename(p_class uuid, p_name text)
returns void language plpgsql volatile security definer set search_path = ''
as $$
begin
  if char_length(btrim(coalesce(p_name, ''))) not between 1 and 40 then raise exception 'bad_name'; end if;
  update public.teacher_classes set name = btrim(p_name) where id = p_class and owner = auth.uid();
  if not found then raise exception 'not_found'; end if;
end $$;

-- sletter klassen og elevprofilene i den (brukerne i Auth, med fremgang og resultater)
create or replace function public.klasse_delete(p_class uuid)
returns int language plpgsql volatile security definer set search_path = ''
as $$
declare n int;
begin
  if not exists (select 1 from public.teacher_classes where id = p_class and owner = auth.uid()) then raise exception 'not_found'; end if;
  delete from auth.users where id in (select user_id from public.class_students where class_id = p_class and user_id is not null);
  get diagnostics n = row_count;
  delete from public.teacher_classes where id = p_class;
  return n;
end $$;

-- klassekode: p_on = true lager en ny kode (fornyer), false slår den av. Koden gir bare lov til å legge seg selv til i klassen.
create or replace function public.klasse_code(p_class uuid, p_on boolean)
returns text language plpgsql volatile security definer set search_path = ''
as $$
declare c text;
begin
  if not exists (select 1 from public.teacher_classes where id = p_class and owner = auth.uid()) then raise exception 'not_found'; end if;
  if not p_on then update public.teacher_classes set join_code = null where id = p_class; return null; end if;
  loop
    c := public.elev_rand(6, 'ABCDEFGHJKMNPQRSTUVWXYZ23456789');
    exit when not exists (select 1 from public.teacher_classes where join_code = c);
  end loop;
  update public.teacher_classes set join_code = c where id = p_class;
  return c;
end $$;

-- lærerens klasser med elever og en kort oversikt per elev (bare tall læreren trenger for å følge opp)
create or replace function public.klasse_list()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
declare me uuid := auth.uid(); has_mq boolean := to_regclass('public.mq_results') is not null; res jsonb;
begin
  if me is null then raise exception 'not_logged_in'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', c.id, 'name', c.name, 'tag', c.tag, 'code', c.join_code,
      'students', coalesce((select jsonb_agg(jsonb_build_object(
          'uid', s.user_id, 'username', s.username, 'login', s.username || '.' || c.tag, 'name', s.display_name, 'self', s.self_joined, 'created_at', s.created_at,
          'xp', coalesce((p.state ->> 'xp')::numeric, 0), 'course', p.state ->> 'current', 'active_at', p.updated_at,
          'week_xp', coalesce((select sum(case when jsonb_typeof(d.value) = 'number' then (d.value)::numeric else 0 end) from jsonb_each(coalesce(p.state -> 'daily', '{}'::jsonb)) d
                               where d.key >= to_char(now() - interval '6 days', 'YYYY-MM-DD')), 0)
        ) order by s.display_name, s.username)
        from public.class_students s left join public.progress p on p.user_id = s.user_id
        where s.class_id = c.id and s.user_id is not null), '[]'::jsonb)
    ) order by c.created_at), '[]'::jsonb)
  into res from public.teacher_classes c where c.owner = me;
  return jsonb_build_object('classes', res, 'count', (select count(*) from public.class_students where teacher = me), 'max', 200, 'mq', has_mq);
end $$;

-- leksesvarene til én av lærerens elever (fra mq_results, nøkkelen er lekselenken)
create or replace function public.elev_results(p_user uuid)
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
declare res jsonb;
begin
  if not exists (select 1 from public.class_students where user_id = p_user and teacher = auth.uid()) then raise exception 'not_found'; end if;
  if to_regclass('public.mq_results') is null then return '[]'::jsonb; end if;
  execute 'select coalesce(jsonb_agg(jsonb_build_object(''key'', ckey, ''score'', score, ''ok'', ok, ''at'', created_at) order by created_at desc), ''[]''::jsonb) from public.mq_results where uid = $1'
    into res using p_user;
  return res;
end $$;

-- fjerner en elevprofil (brukeren i Auth, med fremgang og resultater)
create or replace function public.elev_remove(p_user uuid)
returns void language plpgsql volatile security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.class_students where user_id = p_user and teacher = auth.uid()) then raise exception 'not_found'; end if;
  delete from auth.users where id = p_user;
end $$;

-- eleven selv: hvilken klasse og lærer profilen hører til (vises i appen i stedet for e-post)
create or replace function public.elev_me()
returns jsonb language sql stable security definer set search_path = ''
as $$ select jsonb_build_object('login', s.username || '.' || c.tag, 'name', s.display_name, 'class', c.name)
  from public.class_students s join public.teacher_classes c on c.id = s.class_id where s.user_id = auth.uid() $$;

-- ---------- bare for Edge Function «elever» (service_role) ----------
-- reserverer en plass for lærerens elev; brukernavnet får et tall bak seg hvis det er tatt i klassen
create or replace function public.elev_reserve(p_teacher uuid, p_class uuid, p_base text, p_display text)
returns jsonb language plpgsql volatile security definer set search_path = ''
as $$
declare base text := public.elev_slug(coalesce(nullif(btrim(p_base), ''), p_display)); u text; k int := 1; r public.class_students; t text;
begin
  if public.is_student(p_teacher) then raise exception 'student_account'; end if;
  select tag into t from public.teacher_classes where id = p_class and owner = p_teacher;
  if t is null then raise exception 'not_found'; end if;
  if char_length(btrim(coalesce(p_display, ''))) not between 1 and 40 then raise exception 'bad_name'; end if;
  if char_length(base) < 2 then base := 'elev'; end if;
  loop
    u := case when k = 1 then base else left(base, 16) || k::text end;
    exit when not exists (select 1 from public.class_students where class_id = p_class and username = u);
    k := k + 1;
  end loop;
  insert into public.class_students (teacher, class_id, username, display_name) values (p_teacher, p_class, u, btrim(p_display)) returning * into r;
  return jsonb_build_object('row', r.id, 'username', u, 'login', u || '.' || t);
end $$;

-- selvregistrering med klassekode: eleven velger brukernavn selv; er det tatt i klassen, avvises det (eleven velger et annet)
create or replace function public.elev_reserve_code(p_code text, p_username text, p_display text)
returns jsonb language plpgsql volatile security definer set search_path = ''
as $$
declare c public.teacher_classes; u text := public.elev_slug(p_username); r public.class_students;
begin
  select * into c from public.teacher_classes where join_code = upper(btrim(coalesce(p_code, '')));
  if c.id is null then raise exception 'bad_code'; end if;
  if u !~ '^[a-z0-9][a-z0-9_-]{1,19}$' then raise exception 'bad_username'; end if;
  if char_length(btrim(coalesce(p_display, ''))) not between 1 and 40 then raise exception 'bad_name'; end if;
  if exists (select 1 from public.class_students where class_id = c.id and username = u) then raise exception 'username_taken'; end if;
  insert into public.class_students (teacher, class_id, username, display_name, self_joined) values (c.owner, c.id, u, btrim(p_display), true) returning * into r;
  return jsonb_build_object('row', r.id, 'username', u, 'login', u || '.' || c.tag);
end $$;

create or replace function public.elev_bind(p_row uuid, p_user uuid)
returns void language sql volatile security definer set search_path = ''
as $$ update public.class_students set user_id = p_user where id = p_row and user_id is null $$;

create or replace function public.elev_unreserve(p_row uuid)
returns void language sql volatile security definer set search_path = ''
as $$ delete from public.class_students where id = p_row and user_id is null $$;

create or replace function public.elev_owned(p_teacher uuid, p_user uuid)
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.class_students where user_id = p_user and teacher = p_teacher) $$;

-- rettigheter: lærerens funksjoner for innloggede, Edge-funksjonene bare for service_role
revoke all on function public.klasse_create(text), public.klasse_rename(uuid, text), public.klasse_delete(uuid), public.klasse_code(uuid, boolean),
  public.klasse_list(), public.elev_results(uuid), public.elev_remove(uuid), public.elev_me(), public.is_student(uuid), public.elev_rand(int, text), public.elev_slug(text),
  public.elev_reserve(uuid, uuid, text, text), public.elev_reserve_code(text, text, text), public.elev_bind(uuid, uuid), public.elev_unreserve(uuid), public.elev_owned(uuid, uuid),
  public.class_students_limit() from public, anon, authenticated;
grant execute on function public.klasse_create(text), public.klasse_rename(uuid, text), public.klasse_delete(uuid), public.klasse_code(uuid, boolean),
  public.klasse_list(), public.elev_results(uuid), public.elev_remove(uuid), public.elev_me() to authenticated;
grant execute on function public.elev_reserve(uuid, uuid, text, text), public.elev_reserve_code(text, text, text), public.elev_bind(uuid, uuid),
  public.elev_unreserve(uuid), public.elev_owned(uuid, uuid), public.elev_slug(text), public.elev_rand(int, text), public.is_student(uuid) to service_role;
