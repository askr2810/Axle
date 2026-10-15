// Test av Edge Function «elever» (supabase/functions/elever/index.ts) med en etterlignet Supabase i minnet. Kjøres i npm test.
// Sjekker: bare lærere (ikke elever eller anonyme) kan lage elever og gi nytt passord; læreren kan bare tilbakestille egne elever;
// passord sendes aldri til databasen og logges aldri; plassen frigjøres hvis brukeren ikke kan lages i Auth; passordkrav ved klassekode;
// tydelig svar når supabase/elever.sql ikke er kjørt.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = path.join(os.tmpdir(), `axle_elever_fn_${process.pid}.mjs`);
fs.writeFileSync(tmp, fs.readFileSync(path.join(ROOT, 'supabase', 'functions', 'elever', 'index.ts'), 'utf8'));
const F = await import(pathToFileURL(tmp).href); fs.unlinkSync(tmp);
const errs = []; let n = 0; const ok = (c, m) => { n++; if (!c) errs.push(m); };

// ---- etterlignet Supabase ----
function fake({ installed = true, authFails = false } = {}){
  const db = { rows: new Map(), users: new Map(), tokens: { 'tok-laerer': { id: 'T1', email: 'laerer@skole.no' }, 'tok-laerer2': { id: 'T2', email: 'l2@skole.no' }, 'tok-elev': { id: 'S9', email: 'ola.k7mq@elev.axle.no' } }, calls: [] };
  let seq = 0;
  const res = (status, body) => new Response(body == null ? '' : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const f = async (url, opts = {}) => {
    const u = new URL(url), body = opts.body ? JSON.parse(opts.body) : null, auth = (opts.headers || {}).Authorization || '';
    db.calls.push({ path: u.pathname, body, auth });
    if (u.pathname === '/auth/v1/user') { const t = db.tokens[auth.replace('Bearer ', '')]; return t ? res(200, t) : res(401, { msg: 'bad jwt' }); }
    if (u.pathname.startsWith('/rest/v1/rpc/')) {
      if (auth !== 'Bearer SERVICE') return res(401, {});
      if (!installed) return res(404, { message: 'Could not find the function public.elev_reserve in the schema cache' });
      const fn = u.pathname.split('/').pop();
      if (fn === 'elev_reserve') { if (body.p_class !== 'C1' || body.p_teacher !== 'T1') return res(400, { message: 'not_found' }); if (db.rows.size >= 200) return res(400, { message: 'too_many_students' });
        const id = 'r' + (++seq), login = (body.p_display.toLowerCase().replace(/[^a-z]/g, '') || 'elev') + seq + '.k7mq'; db.rows.set(id, { teacher: body.p_teacher, login, user: null }); return res(200, { row: id, username: login.split('.')[0], login }); }
      if (fn === 'elev_reserve_code') { if (body.p_code !== 'ABC123') return res(400, { message: 'bad_code' }); if ([...db.rows.values()].some(r => r.login === body.p_username + '.k7mq')) return res(400, { message: 'username_taken' });
        const id = 'r' + (++seq), login = body.p_username + '.k7mq'; db.rows.set(id, { teacher: 'T1', login, user: null }); return res(200, { row: id, username: body.p_username, login }); }
      if (fn === 'elev_bind') { db.rows.get(body.p_row).user = body.p_user; return res(200, null); }
      if (fn === 'elev_unreserve') { const r = db.rows.get(body.p_row); if (r && !r.user) db.rows.delete(body.p_row); return res(200, null); }
      if (fn === 'elev_owned') return res(200, [...db.rows.values()].some(r => r.user === body.p_user && r.teacher === body.p_teacher));
    }
    if (u.pathname === '/auth/v1/admin/users' && opts.method === 'POST') { if (auth !== 'Bearer SERVICE') return res(401, {}); if (authFails) return res(500, { msg: 'nope' });
      const id = 'U' + (++seq); db.users.set(id, { email: body.email, pwHash: 'h:' + body.password.length }); return res(200, { id, email: body.email }); }
    if (u.pathname.startsWith('/auth/v1/admin/users/') && opts.method === 'PUT') { const id = decodeURIComponent(u.pathname.split('/').pop()), usr = db.users.get(id); if (!usr) return res(404, {}); usr.pwHash = 'h:' + body.password.length; return res(200, { id, email: usr.email }); }
    return res(404, { msg: 'ukjent ' + u.pathname });
  };
  return { db, f };
}
const env = { URL: 'https://x.supabase.co', SERVICE: 'SERVICE', ANON: 'ANON' };
const call = async (fk, body, tok) => { const r = await F.handle(new Request('https://x/elever', { method: 'POST', headers: tok ? { authorization: 'Bearer ' + tok } : {}, body: JSON.stringify(body) }), env, fk.f);
  return { status: r.status, body: await r.json().catch(() => null) }; };

// passord skal aldri logges
const logged = []; for (const k of ['log', 'error', 'warn', 'info']) { const o = console[k]; console[k] = (...a) => { logged.push(a.join(' ')); }; console[k].orig = o; }

{ const fk = fake();
  ok((await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }] })).status === 401, 'uten innlogging skal create avvises');
  ok((await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }] }, 'ANON')).status === 401, 'med anon-nøkkelen skal create avvises');
  ok((await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }] }, 'tok-elev')).status === 401, 'en elevprofil skal ikke kunne lage elever');
  const r = await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }, { name: 'Kari' }, { name: '' }] }, 'tok-laerer');
  const st = r.body.students;
  ok(r.status === 200 && st.length === 3 && st[0].login && st[0].password && st[1].password && st[2].error === 'bad_name', 'læreren skal få innlogging og engangspassord for hver elev');
  ok(st[0].password !== st[1].password && /^[a-z]+-[a-z]+-[a-z]+-\d{2}$/.test(st[0].password), `passordet skal være tre ord og to sifre (${st[0].password})`);
  const pwSentToDb = fk.db.calls.some(c => c.path.startsWith('/rest/') && JSON.stringify(c.body || {}).includes(st[0].password));
  ok(!pwSentToDb, 'passordet skal ikke sendes til databasen (bare til Auth)');
  ok([...fk.db.users.values()].every(u => u.email.endsWith('@elev.axle.no')), 'elevprofilene skal ha intern adresse på elev.axle.no');
  ok((await call(fk, { action: 'create', class_id: 'C-annen', students: [{ name: 'X' }] }, 'tok-laerer2')).body.students[0].error === 'not_found', 'en annen lærer skal ikke kunne legge elever i klassen');
  ok((await call(fk, { action: 'create', class_id: 'C1', students: Array.from({ length: 51 }, () => ({ name: 'a' })) }, 'tok-laerer')).status === 400, 'mer enn 50 per kall skal avvises');
  // nytt passord
  const uid = st[0].uid;
  ok((await call(fk, { action: 'reset', user_id: uid }, 'tok-laerer2')).status === 404, 'en annen lærer skal ikke kunne gi nytt passord');
  ok((await call(fk, { action: 'reset', user_id: uid }, 'tok-elev')).status === 401, 'en elev skal ikke kunne gi nytt passord');
  const rs = await call(fk, { action: 'reset', user_id: uid }, 'tok-laerer');
  ok(rs.status === 200 && rs.body.password && rs.body.password !== st[0].password && rs.body.login === st[0].login, 'læreren skal få et nytt engangspassord for egen elev');
  ok(!fk.db.calls.some(c => c.path.startsWith('/rest/') && JSON.stringify(c.body || {}).includes(rs.body.password)), 'det nye passordet skal ikke sendes til databasen');
  // klassekode
  ok((await call(fk, { action: 'join', code: 'ABC123', username: 'per', name: 'Per', password: 'kort' })).body.error === 'weak_password', 'for kort passord skal avvises');
  ok((await call(fk, { action: 'join', code: 'ABC123', username: 'per', name: 'Per', password: 'per12345' })).body.error === 'weak_password', 'passord med brukernavnet skal avvises');
  ok((await call(fk, { action: 'join', code: 'FEIL00', username: 'per', name: 'Per', password: 'langt-nok-1' })).body.error === 'bad_code', 'feil klassekode skal avvises');
  const j = await call(fk, { action: 'join', code: 'ABC123', username: 'per', name: 'Per', password: 'langt-nok-1' });
  ok(j.status === 200 && j.body.login === 'per.k7mq' && !('password' in j.body), 'eleven skal få innloggingsnavnet (ikke passordet tilbake)');
  ok((await call(fk, { action: 'join', code: 'ABC123', username: 'per', name: 'Per 2', password: 'langt-nok-2' })).body.error === 'username_taken', 'tatt brukernavn skal avvises');
  ok((await call(fk, { action: 'nope' }, 'tok-laerer')).status === 400, 'ukjent handling skal avvises');
}
{ const fk = fake({ authFails: true });
  const r = await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }] }, 'tok-laerer');
  ok(r.body.students[0].error === 'auth' && fk.db.rows.size === 0, 'når Auth feiler, skal den reserverte plassen frigjøres');
  ok((await call(fk, { action: 'join', code: 'ABC123', username: 'per', name: 'Per', password: 'langt-nok-1' })).status === 502 && fk.db.rows.size === 0, 'når Auth feiler ved klassekode, skal plassen frigjøres');
}
{ const fk = fake({ installed: false });
  const r = await call(fk, { action: 'create', class_id: 'C1', students: [{ name: 'Ola' }, { name: 'Kari' }] }, 'tok-laerer');
  ok(r.body.students[0].error === 'not_installed' && r.body.students.length === 1, 'uten elever.sql skal svaret si at den ikke er installert');
}
ok((await F.handle(new Request('https://x/elever', { method: 'OPTIONS' }), env)).status === 204, 'CORS-forespørsel skal besvares');
const pwRand = new Set(Array.from({ length: 200 }, () => F.makePassword())); ok(pwRand.size > 190, 'engangspassordene skal variere');

for (const k of ['log', 'error', 'warn', 'info']) console[k] = console[k].orig;
ok(!logged.some(l => /-\d{2}\b/.test(l)), 'passord skal aldri logges');
console.log(`elevprofiler (Edge Function): ${n} sjekker, feil: ${errs.length}`); errs.forEach(e => console.log(' - ' + e));
process.exit(errs.length ? 1 : 0);
