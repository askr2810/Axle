// Brukerflyt for elevprofiler (elever.js) i ekte nettleser, med Supabase etterlignet i nettverkslaget (ingen data sendes til databasen).
// Lærer: lag klasse, legg til elever, se innlogginger (bare én gang), utskrift, finn elev, leksesvar, nytt passord, fjern, klassekode.
// Elev: logg inn med brukernavn og passord, bli med via #/klasse/KODE, ingen e-postbytte/sletting/venner for elevprofilen.
// Mangler databasen: tydelig melding. Alt på 375, 768 og 1280 px i lyst og mørkt tema, med klippkontroll (DOMCHECK) og skjermbilder.
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_elever.js [--shots mappe]
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const { DOMCHECK } = require('./figcheck_lib.js');
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const shots = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
const SIZES = [[375, 760, 'light'], [375, 760, 'dark'], [768, 1024, 'light'], [1280, 860, 'light'], [1280, 860, 'dark']];
const future = Math.floor(Date.now() / 1000) + 3600;

// etterlignet Supabase: lærer T1 med klasser og elever i minnet
function mockSupabase(page, opts = {}){
  const st = { classes: [], students: [], seq: 0, calls: [] };
  const json = (route, status, body) => route.fulfill({ status, contentType: 'application/json', body: body == null ? '' : JSON.stringify(body) });
  const list = () => ({ classes: st.classes.map(c => ({ ...c, students: st.students.filter(s => s.cls === c.id).map(s => ({ uid: s.uid, username: s.username, login: s.username + '.' + c.tag, name: s.name, self: false, xp: 50, week_xp: 30, active_at: new Date().toISOString(), course: 'VG1T' })) })), count: st.students.length, max: 200, mq: true });
  return page.route('**/*', async route => {
    const u = new URL(route.request().url()); if(!/supabase\.co$/.test(u.hostname)) return route.continue();
    const body = route.request().postDataJSON ? (() => { try{ return route.request().postDataJSON(); }catch(e){ return null; } })() : null;
    st.calls.push(u.pathname);
    if(u.pathname.startsWith('/rest/v1/rpc/')){
      const fn = u.pathname.split('/').pop();
      if(opts.notInstalled && /klasse|elev/.test(fn)) return json(route, 404, { code: 'PGRST202', message: 'Could not find the function public.klasse_list without parameters in the schema cache' });
      if(fn === 'klasse_list') return json(route, 200, list());
      if(fn === 'klasse_create'){ const c = { id: 'C' + (++st.seq), name: body.p_name, tag: 'k7mq', code: null }; st.classes.push(c); return json(route, 200, { id: c.id, name: c.name, tag: c.tag }); }
      if(fn === 'klasse_code'){ const c = st.classes.find(x => x.id === body.p_class); c.code = body.p_on ? 'ABC' + (++st.seq).toString().padStart(3, '0') : null; return json(route, 200, c.code); }
      if(fn === 'elev_remove'){ st.students = st.students.filter(s => s.uid !== body.p_user); return json(route, 200, null); }
      if(fn === 'elev_results') return json(route, 200, [{ key: 'LS:x', score: 300, ok: 3, at: new Date().toISOString() }]);
      if(fn === 'elev_me') return json(route, 200, { login: 'ola.k7mq', name: 'Ola', class: '7A' });
      return json(route, 200, null);
    }
    if(u.pathname === '/functions/v1/elever'){
      if(opts.noFunction) return route.fulfill({ status: 404, contentType: 'text/plain', body: 'Function not found' });
      if(body.action === 'create'){ const out = body.students.map(s => { const uid = 'U' + (++st.seq), username = s.name.toLowerCase().replace(/[^a-z]/g, '') || 'elev'; st.students.push({ uid, username, name: s.name, cls: body.class_id }); return { name: s.name, login: username + '.k7mq', password: 'sol-elg-hav-' + (10 + st.seq), uid }; }); return json(route, 200, { students: out }); }
      if(body.action === 'reset') return json(route, 200, { login: 'ola.k7mq', password: 'ny-ugle-fisk-42' });
      if(body.action === 'join') return body.code === 'ABC123' ? json(route, 200, { login: body.username + '.k7mq' }) : json(route, 400, { error: 'bad_code' });
    }
    if(u.pathname === '/auth/v1/token'){ const b = body || {}; if(b.password === 'feil') return json(route, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials' });
      return json(route, 200, { access_token: 'at', refresh_token: 'rt', expires_in: 3600, user: { id: 'S1', email: b.email } }); }
    if(u.pathname.startsWith('/rest/v1/progress')) return json(route, 200, []);
    return json(route, 200, null);
  }).then(() => st);
}
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const fails = [], fail = (tag, m) => fails.push(`${tag}: ${m}`);
  if(shots) fs.mkdirSync(shots, { recursive: true });
  const open = async (w, h, theme, auth, opts) => { const c = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900 }), p = await c.newPage(), errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept(d.type() === 'prompt' ? '7A' : undefined));
    const st = await mockSupabase(p, opts);
    await p.addInitScript(a => { try{ if(a) localStorage.setItem('axle.auth', JSON.stringify(a)); }catch(e){} }, auth);
    await p.goto(URL0); await p.waitForTimeout(900);
    try{ await p.click('[data-s=vgs]', { timeout: 2000 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(400); await p.click('[data-v=start]', { timeout: 2000 }); }catch(e){}
    return { c, p, st, errs }; };
  const dom = async p => p.evaluate(D => eval('(' + D + ')')('main', '.tc-card,.el-row,.dialog'), DOMCHECK.toString());
  const teacher = { at: 'tok', rt: 'rt', exp: future, uid: 'T1', email: 'laerer@skole.no' };
  for(const [w, h, theme] of SIZES){
    const tag = `${w}px ${theme}`, { c, p, st, errs } = await open(w, h, theme, teacher);
    // fra lærerverktøyet til elevprofiler
    await p.evaluate(() => { tcOpen('home'); }); await p.waitForTimeout(400);
    if(!(await p.locator('[data-a=elopen]').count())) fail(tag, 'fant ikke «Administrer elever» i lærerverktøyet');
    await p.click('[data-a=elopen]'); await p.waitForTimeout(500);
    if(!/elever|students/.test(await p.evaluate(() => location.hash))) fail(tag, 'adressen er ikke #/elever');
    await p.click('button[data-a=elnewcls] >> nth=0'); await p.waitForTimeout(500);
    if(!(await p.locator('.el-classes button.on').count())) fail(tag, 'klassen ble ikke valgt etter oppretting');
    await p.fill('#elnames', 'Ola\nKari\nAhmed\nSofie\nJonas\nMaja\nNils'); await p.click('[data-a=eladd]'); await p.waitForTimeout(600);
    const created = await p.locator('.el-new [role=row]').count(); if(created !== 7) fail(tag, `viser ${created} nye innlogginger, ventet 7`);
    if(!(await p.locator('.el-new code').first().isVisible())) fail(tag, 'innloggingen synes ikke');
    if(shots) await p.screenshot({ path: path.join(shots, `elever_${w}_${theme}_ny.png`), fullPage: true });
    const d1 = await dom(p); d1.forEach(r => fail(tag, `etter oppretting: ${r.k} ${r.lab}`));
    // utskrift: bare lappene
    const slips = await p.locator('#elprint .el-slip').count(); if(slips !== 7) fail(tag, `utskriften har ${slips} lapper, ventet 7`);
    await p.click('[data-a=eldone]'); await p.waitForTimeout(300);
    if(await p.locator('.el-new').count()) fail(tag, 'passordene vises fortsatt etter «Ferdig»');
    if(await p.locator('#elprint').count()) fail(tag, 'utskriften finnes fortsatt etter «Ferdig»');
    // finn elev
    await p.fill('#elq', 'kar'); await p.waitForTimeout(200);
    const rows = await p.locator('.el-row').count(); if(rows !== 1) fail(tag, `søk på «kar» viser ${rows} elever, ventet 1`);
    await p.fill('#elq', ''); await p.waitForTimeout(200);
    // leksesvar, nytt passord, fjern
    await p.locator('[data-a=elres]').first().click(); await p.waitForTimeout(400);
    if(!(await p.locator('.el-res li').count())) fail(tag, 'leksesvarene vises ikke');
    await p.locator('[data-a=elreset]').first().click(); await p.waitForTimeout(500);
    if(!/ny-ugle-fisk-42/.test(await p.locator('.el-new').innerText().catch(() => ''))) fail(tag, 'nytt passord vises ikke');
    if(shots) await p.screenshot({ path: path.join(shots, `elever_${w}_${theme}_liste.png`), fullPage: true });
    await p.click('[data-a=eldone]');
    const before = await p.locator('.el-row').count(); await p.locator('[data-a=elremove]').first().click(); await p.waitForTimeout(500);
    if(await p.locator('.el-row').count() !== before - 1) fail(tag, 'eleven ble ikke fjernet fra lista');
    // klassekode
    await p.click('[data-a=elcode][data-on="1"]'); await p.waitForTimeout(400);
    const code = await p.locator('.el-code b').innerText().catch(() => ''); if(!/^ABC\d{3}$/.test(code)) fail(tag, `klassekoden vises ikke (${code})`);
    if(!/#\/klasse\/ABC/.test(await p.locator('.el .tc-url').inputValue().catch(() => ''))) fail(tag, 'lenken med klassekoden vises ikke');
    await p.click('[data-a=elcode][data-on="0"]'); await p.waitForTimeout(400); if(await p.locator('.el-code').count()) fail(tag, 'klassekoden ble ikke slått av');
    const d2 = await dom(p); d2.forEach(r => fail(tag, `liste: ${r.k} ${r.lab}`));
    if(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) fail(tag, 'siden ruller vannrett');
    if(errs.length) fail(tag, 'JS-feil ' + errs.join(' | '));
    await c.close();
    // eleven: logg inn med brukernavn (også feil passord), ingen e-postbytte, sletting eller venner
    { const { c, p, errs } = await open(w, h, theme, null);
      await p.evaluate(() => { overlay = { login: 1, step: 'email', email: '' }; renderOverlay(); }); await p.waitForTimeout(200);
      if(!(await p.locator('[data-a=lgelev]').isVisible())) fail(tag, 'innloggingen har ikke «Elev? Logg inn med brukernavn»');
      await p.click('[data-a=lgelev]'); await p.fill('#lglogin', 'ola.k7mq'); await p.fill('#lgpw', 'feil'); await p.click('[data-a=lgelevgo]'); await p.waitForTimeout(400);
      if(!/Feil innloggingsnavn|Wrong login/.test(await p.locator('.lgerr').innerText().catch(() => ''))) fail(tag, 'feil passord gir ikke tydelig melding');
      await p.fill('#lgpw', 'sol-elg-hav-12'); await p.click('[data-a=lgelevgo]'); await p.waitForTimeout(800);
      const me = await p.evaluate(() => ({ elev: isElev(), login: elevLogin() })); if(!me.elev || me.login !== 'ola.k7mq') fail(tag, `eleven ble ikke logget inn (${JSON.stringify(me)})`);
      await p.evaluate(() => { screen = 'settings'; SET_SEC = 'account'; render(); }); await p.waitForTimeout(300);
      const acc = await p.evaluate(() => ({ shown: !!document.querySelector('[data-a=aclogout]'), email: !!document.querySelector('[data-a=acemail]'), del: !!document.querySelector('[data-a=acdelete]'), txt: document.body.innerText }));
      if(!acc.shown) fail(tag, 'kontodelen i innstillingene vises ikke');
      if(acc.email || acc.del) fail(tag, 'elevprofilen kan bytte e-post eller slette seg selv');
      if(!/ola\.k7mq/.test(acc.txt)) fail(tag, 'innstillingene viser ikke innloggingsnavnet');
      await p.evaluate(() => { screen = 'friends'; render(); }); await p.waitForTimeout(300);
      if(!/ikke slått på for elevprofiler|not enabled for student profiles/.test(await p.evaluate(() => document.body.innerText))) fail(tag, 'venner er ikke slått av for elevprofilen');
      if(errs.length) fail(tag, 'elev JS-feil ' + errs.join(' | '));
      await c.close(); }
    // eleven: bli med via lenke med klassekode
    { const { c, p, errs } = await open(w, h, theme, null);
      await p.goto(URL0 + '#/klasse/ABC123'); await p.waitForTimeout(1200);
      if(await p.locator('#lgjcode').inputValue().catch(() => '') !== 'ABC123') fail(tag, 'lenken fyller ikke inn klassekoden');
      if(shots) await p.screenshot({ path: path.join(shots, `elever_${w}_${theme}_bli-med.png`) });
      await p.fill('#lgjname', 'Per'); await p.fill('#lgjuser', 'per'); await p.fill('#lgjpw', 'hemmelig-passord'); await p.fill('#lgjpw2', 'annet-passord'); await p.click('[data-a=lgjoingo]'); await p.waitForTimeout(300);
      if(!/ikke like|do not match/.test(await p.locator('.lgerr').innerText().catch(() => ''))) fail(tag, 'ulike passord gir ikke melding');
      await p.fill('#lgjpw', 'hemmelig-passord'); await p.fill('#lgjpw2', 'hemmelig-passord'); await p.click('[data-a=lgjoingo]'); await p.waitForTimeout(900);
      if(!(await p.evaluate(() => isElev() && elevLogin() === 'per.k7mq'))) fail(tag, 'eleven kom ikke inn etter «Bli med»');
      const d3 = await p.evaluate(D => eval('(' + D + ')')('body', '.dialog'), DOMCHECK.toString()); d3.forEach(r => fail(tag, `bli med: ${r.k} ${r.lab}`));
      if(errs.length) fail(tag, 'bli med JS-feil ' + errs.join(' | '));
      await c.close(); }
  }
  // databasen eller funksjonen mangler: tydelig melding, ingen krasj
  for(const [opts, re] of [[{ notInstalled: true }, /supabase\/elever\.sql/], [{ noFunction: true }, /funksjonen «elever»|the «elever» function/]]){
    const { c, p, errs } = await open(375, 760, 'light', teacher, opts);
    await p.goto(URL0 + '#/elever'); await p.waitForTimeout(1200);
    if(opts.noFunction){ await p.click('button[data-a=elnewcls] >> nth=0'); await p.waitForTimeout(400); await p.fill('#elnames', 'Ola'); await p.click('[data-a=eladd]'); await p.waitForTimeout(600); }
    const txt = await p.evaluate(() => document.body.innerText);
    if(!re.test(txt)) fail('mangler oppsett', `${JSON.stringify(opts)}: ingen tydelig melding (${txt.slice(0, 120)})`);
    if(errs.length) fail('mangler oppsett', 'JS-feil ' + errs.join(' | '));
    if(shots) await p.screenshot({ path: path.join(shots, `elever_mangler_${Object.keys(opts)[0]}.png`) });
    await c.close();
  }
  await b.close();
  console.log(`elevprofiler (brukerflyt): ${SIZES.length} størrelser/temaer, feil: ${fails.length}`); fails.forEach(f => console.log(' - ' + f));
  process.exit(fails.length ? 1 : 0);
})();
