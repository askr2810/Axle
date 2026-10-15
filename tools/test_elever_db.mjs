// Databasetest for elevprofiler (supabase/elever.sql) mot en ekte Postgres: tilgangsgrenser, lærer–elev-tilknytning, klassekode,
// sletting og grensen på 200 per lærer også ved samtidige opprettelser. Supabase etterlignes: auth.users, auth.uid() fra JWT-kravet,
// rollene anon/authenticated/service_role, pgcrypto i skjemaet extensions og tabellene progress og mq_results.
// Bruk: AXLE_PG_URL=postgres://… node tools/test_elever_db.mjs   (tom database der testen får lage skjemaer og roller)
//   eller uten AXLE_PG_URL: starter en midlertidig server med npm-pakken embedded-postgres (må finnes i NODE_PATH, f.eks. installert i en
//   egen mappe: npm i embedded-postgres pg) og sletter den etterpå.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url), ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pg = require('pg');

let stopServer = async () => {}, url = process.env.AXLE_PG_URL;
if (!url) {
  const EP = require('embedded-postgres').default || require('embedded-postgres'), dir = fs.mkdtempSync(path.join(os.tmpdir(), 'axle-pg-'));
  const port = 54400 + Math.floor(Math.random() * 400), db = new EP({ databaseDir: dir, user: 'postgres', password: 'pw', port, persistent: false, onLog: () => {}, onError: () => {} });
  await db.initialise(); await db.start(); url = `postgres://postgres:pw@localhost:${port}/postgres`;
  stopServer = async () => { await db.stop(); fs.rmSync(dir, { recursive: true, force: true }); };
}
const errs = []; let n = 0; const ok = (c, m) => { n++; if (!c) errs.push(m); };
const main = new pg.Client({ connectionString: url }); await main.connect();
const q = (sql, a) => main.query(sql, a);

// ---- Supabase-lignende oppsett ----
await q(`
  do $$ begin
    if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
    if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
    if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin bypassrls; end if;
  end $$;
  drop schema if exists auth cascade; drop schema if exists extensions cascade;
  drop table if exists public.class_students, public.teacher_classes, public.progress, public.mq_results cascade;
  create schema auth; create schema extensions; create extension if not exists pgcrypto with schema extensions;
  create table auth.users (id uuid primary key default gen_random_uuid(), email text unique);
  create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  grant usage on schema auth, public, extensions to anon, authenticated, service_role;
  grant execute on function auth.uid() to anon, authenticated, service_role;
  create table public.progress (user_id uuid primary key references auth.users (id) on delete cascade, state jsonb not null, updated_at timestamptz not null default now());
  create table public.mq_results (ckey text not null, uid uuid not null references auth.users (id) on delete cascade, name text not null default '', av text, score int not null, ok int not null, created_at timestamptz not null default now(), primary key (ckey, uid));
`);
await q(fs.readFileSync(path.join(ROOT, 'supabase', 'elever.sql'), 'utf8'));
await q(fs.readFileSync(path.join(ROOT, 'supabase', 'elever.sql'), 'utf8')); // trygg å kjøre to ganger

// en forbindelse som en bestemt bruker (rolle + auth.uid())
async function as(role, uid){ const c = new pg.Client({ connectionString: url }); await c.connect();
  await c.query(`set role ${role}`); if (uid) await c.query(`select set_config('request.jwt.claim.sub', $1, false)`, [uid]); return c; }
const user = async email => (await q('insert into auth.users (email) values ($1) returning id', [email])).rows[0].id;
const fails = async (fn, re) => { try { await fn(); return false; } catch (e) { return re ? re.test(e.message) : true; } };
const rpc = async (c, sql, a) => (await c.query(sql, a)).rows[0];

const A = await user('a@skole.no'), B = await user('b@skole.no');
const ta = await as('authenticated', A), tb = await as('authenticated', B), svc = await as('service_role'), anon = await as('anon');

// ---- lærer A lager klasse, elever via Edge-funksjonene (service_role) ----
const kl = (await rpc(ta, 'select public.klasse_create($1) r', ['7A'])).r;
ok(/^[a-z0-9]{4}$/.test(kl.tag), 'klassetaggen har feil format');
const mk = async (teacher, cls, base, name) => { const r = (await rpc(svc, 'select public.elev_reserve($1,$2,$3,$4) r', [teacher, cls, base, name])).r;
  const uid = await user(`${r.login}@elev.axle.no`); await svc.query('select public.elev_bind($1,$2)', [r.row, uid]); return { ...r, uid }; };
const ola = await mk(A, kl.id, '', 'Ola'), ola2 = await mk(A, kl.id, '', 'Ola'), aase = await mk(A, kl.id, '', 'Åse Ø.');
ok(ola.username === 'ola' && ola2.username === 'ola2', `like navn skal få unike brukernavn i klassen (${ola.username}, ${ola2.username})`);
ok(aase.username === 'ase-o', `æøå skal bli a/o i brukernavnet (${aase.username})`);
ok(ola.login === `ola.${kl.tag}`, 'innloggingsnavnet skal være brukernavn.klassetagg');

// ---- tilgang: lærer B ser og styrer ikke As elever; elever kan ikke lage klasser eller fjerne andre ----
const sOla = await as('authenticated', ola.uid), sAase = await as('authenticated', aase.uid);
const listA = (await rpc(ta, 'select public.klasse_list() r')).r, listB = (await rpc(tb, 'select public.klasse_list() r')).r;
ok(listA.count === 3 && listA.classes[0].students.length === 3, 'lærer A skal se sine tre elever');
ok(listB.count === 0 && listB.classes.length === 0, 'lærer B skal ikke se As elever');
ok(await fails(() => tb.query('select public.elev_remove($1)', [ola.uid]), /not_found/), 'lærer B skal ikke kunne fjerne As elev');
ok(await fails(() => tb.query('select public.elev_results($1)', [ola.uid]), /not_found/), 'lærer B skal ikke se As elevs resultater');
ok(await fails(() => tb.query('select public.klasse_code($1, true)', [kl.id]), /not_found/), 'lærer B skal ikke styre As klassekode');
ok(await fails(() => sOla.query('select public.klasse_create($1)', ['hack']), /student_account/), 'en elev skal ikke kunne lage klasser');
ok(await fails(() => sOla.query('select public.elev_remove($1)', [aase.uid]), /not_found/), 'en elev skal ikke kunne fjerne en annen elev');
ok((await rpc(sOla, 'select public.klasse_list() r')).r.count === 0, 'en elev skal ikke se klasselister');
ok(await fails(() => sOla.query('select public.elev_results($1)', [aase.uid]), /not_found/), 'en elev skal ikke se en annen elevs resultater');
for (const [c, who] of [[ta, 'lærer'], [sOla, 'elev'], [anon, 'anonym']]) {
  ok(await fails(() => c.query('select public.elev_reserve($1,$2,$3,$4)', [A, kl.id, 'x', 'X']), /permission denied/), `${who} skal ikke kunne kalle elev_reserve direkte`);
  ok(await fails(() => c.query('select public.elev_bind($1,$2)', [ola.row, A]), /permission denied/), `${who} skal ikke kunne kalle elev_bind`);
  ok(await fails(() => c.query('select * from public.class_students'), /permission denied/), `${who} skal ikke kunne lese class_students direkte`);
}
ok(await fails(() => anon.query('select public.klasse_list()'), /permission denied/), 'anonym skal ikke kunne kalle klasse_list');
ok((await rpc(sOla, 'select public.elev_me() r')).r.login === ola.login, 'eleven skal se sitt eget innloggingsnavn');
ok((await rpc(svc, 'select public.elev_owned($1,$2) r', [A, ola.uid])).r === true && (await rpc(svc, 'select public.elev_owned($1,$2) r', [B, ola.uid])).r === false, 'elev_owned skal skille lærere');

// ---- fremgang og resultater knyttes til riktig elev ----
await q(`insert into public.progress (user_id, state) values ($1, $2)`, [ola.uid, { xp: 120, current: 'VG1T', daily: { [new Date().toISOString().slice(0, 10)]: 30, '2000-01-01': 999 } }]);
await q(`insert into public.mq_results (ckey, uid, score, ok) values ('LS:x', $1, 300, 3)`, [ola.uid]);
const st = (await rpc(ta, 'select public.klasse_list() r')).r.classes[0].students.find(s => s.uid === ola.uid);
ok(+st.xp === 120 && st.course === 'VG1T' && +st.week_xp === 30, `oversikten skal vise elevens egne tall (xp ${st.xp}, uke ${st.week_xp})`);
ok((await rpc(ta, 'select public.elev_results($1) r', [ola.uid])).r.length === 1 && (await rpc(ta, 'select public.elev_results($1) r', [aase.uid])).r.length === 0, 'resultatene skal høre til riktig elev');

// ---- klassekode: av som standard, kan slås på, fornyes og slås av; gir ikke tilgang til noe annet ----
ok(await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', ['ABCDEF', 'kari', 'Kari']), /bad_code/), 'uten klassekode skal selvregistrering avvises');
const code1 = (await rpc(ta, 'select public.klasse_code($1, true) r', [kl.id])).r;
const kari = (await rpc(svc, 'select public.elev_reserve_code($1,$2,$3) r', [code1.toLowerCase(), 'Kari', 'Kari'])).r;
ok(kari.login === `kari.${kl.tag}`, 'selvregistrering med kode skal gi brukernavn i klassen');
ok(await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', [code1, 'kari', 'Kari 2']), /username_taken/), 'tatt brukernavn i klassen skal avvises ved selvregistrering');
const code2 = (await rpc(ta, 'select public.klasse_code($1, true) r', [kl.id])).r;
ok(code2 !== code1 && await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', [code1, 'per', 'Per']), /bad_code/), 'fornyet kode skal gjøre den gamle ugyldig');
await ta.query('select public.klasse_code($1, false)', [kl.id]);
ok(await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', [code2, 'per', 'Per']), /bad_code/), 'avslått kode skal avvises');
await svc.query('select public.elev_unreserve($1)', [kari.row]);

// ---- fjerning: brukeren, fremgangen og resultatene forsvinner ----
await ta.query('select public.elev_remove($1)', [ola.uid]);
ok((await q('select count(*)::int n from auth.users where id = $1', [ola.uid])).rows[0].n === 0 && (await q('select count(*)::int n from public.progress where user_id = $1', [ola.uid])).rows[0].n === 0
  && (await q('select count(*)::int n from public.mq_results where uid = $1', [ola.uid])).rows[0].n === 0, 'fjernet elev skal slettes med fremgang og resultater');

// ---- grensen på 200, også ved samtidige opprettelser fra mange forbindelser ----
const kl2 = (await rpc(ta, 'select public.klasse_create($1) r', ['8B'])).r, before = (await rpc(ta, 'select public.klasse_list() r')).r.count;
const conns = await Promise.all(Array.from({ length: 24 }, () => as('service_role')));
let okN = 0, limN = 0, otherErr = [];
await Promise.all(conns.map(async (c, ci) => { for (let k = 0; k < 12; k++) { try { await c.query('select public.elev_reserve($1,$2,$3,$4)', [A, kl2.id, `e${ci}-${k}`, `Elev ${ci}-${k}`]); okN++; } catch (e) { if (/too_many_students/.test(e.message)) limN++; else otherErr.push(e.message); } } }));
const after = (await q('select count(*)::int n from public.class_students where teacher = $1', [A])).rows[0].n;
ok(after === 200, `lærer A skal ha nøyaktig 200 elevprofiler etter samtidige forsøk (har ${after})`);
ok(okN === 200 - before && limN === 24 * 12 - okN && !otherErr.length, `samtidige forsøk: ${okN} lyktes, ${limN} stoppet av grensen, andre feil: ${otherErr.slice(0, 2).join('; ')}`);
ok(await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', [(async () => '')(), 'x', 'X'])), 'ugyldig kall skal feile');
const code3 = (await rpc(ta, 'select public.klasse_code($1, true) r', [kl2.id])).r;
ok(await fails(() => svc.query('select public.elev_reserve_code($1,$2,$3)', [code3, 'sen', 'Sen']), /too_many_students/), 'klassekoden skal også stoppes av grensen');
// lærer B har sin egen grense
const klB = (await rpc(tb, 'select public.klasse_create($1) r', ['9C'])).r;
ok(!(await fails(() => svc.query('select public.elev_reserve($1,$2,$3,$4)', [B, klB.id, 'b1', 'B1']))), 'grensen gjelder per lærer');
ok(await fails(() => svc.query('select public.elev_reserve($1,$2,$3,$4)', [B, kl2.id, 'b2', 'B2']), /not_found/), 'en lærer skal ikke kunne legge elever i en annens klasse');

// ---- sletting av klasse fjerner elevprofilene i den ----
const nDel = (await rpc(ta, 'select public.klasse_delete($1) r', [kl.id])).r;
ok((await q('select count(*)::int n from public.teacher_classes where id = $1', [kl.id])).rows[0].n === 0 && nDel === 2, `klassen og elevprofilene skal slettes (${nDel})`);

for (const c of [ta, tb, svc, anon, sOla, sAase, ...conns]) await c.end().catch(() => {});
await main.end(); await stopServer();
console.log(`elevprofiler (database): ${n} sjekker, feil: ${errs.length}`); errs.forEach(e => console.log(' - ' + e));
process.exit(errs.length ? 1 : 0);
