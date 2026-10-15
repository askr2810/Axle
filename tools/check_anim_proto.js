// Visuell kontroll av animasjonsprototypene (oppgave 21): hver replikk ved p = 0,5 og 1 på 375, 768 og 1280 px, lyst og mørkt tema.
// Samme kollisjonsregel som check_figs.js (tekst over streker, tekst over tekst, tekst utenfor figuren) og DOMCHECK for kortene.
// Sjekker også avspilleren: tastatur (Mellomrom, →), at tenkepausen faktisk stopper, trinnmodus og kontrollspørsmålet.
// Bruk: (cd prototypes/animasjoner && python3 -m http.server 8090) & node tools/check_anim_proto.js [--shots mappe]
// Krever Playwright (eller playwright-core og CHROMIUM=sti til Chrome). ANIM_URL kan peke til en annen server.
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const { CHECK, DOMCHECK } = require('./figcheck_lib.js');
const URL0 = process.env.ANIM_URL || 'http://localhost:8090/';
const shots = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
const DIR = path.join(__dirname, '..', 'prototypes', 'animasjoner');
const ids = fs.readdirSync(DIR).filter(d => fs.existsSync(path.join(DIR, d, 'anim.js')));
const SIZES = [[375, 760, 'light'], [375, 760, 'dark'], [768, 1024, 'light'], [1280, 860, 'light'], [1280, 860, 'dark']];

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const all = [], fail = m => all.push({ k: 'flyt', lab: m });
  if (shots) fs.mkdirSync(shots, { recursive: true });
  for (const id of ids) for (const [w, h, theme] of SIZES) for (const lang of ['nb', 'en']) {
    if (lang === 'en' && w !== 375) continue;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900 });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(`${URL0}${id}/?lang=${lang}`); await p.waitForFunction(() => window.AXANIM);
    const tag = `${id} ${w}px ${theme} ${lang}`;
    const n = await p.evaluate(() => ANIM.lines.length);
    for (let i = 0; i < n; i++) for (const q of [0.5, 1]) {
      const res = await p.evaluate(({ i, q, CHECK, DOMCHECK }) => {
        const chk = eval('(' + CHECK + ')'), dom = eval('(' + DOMCHECK + ')'), X = window.AXANIM, s = X.starts();
        const end = i + 1 < s.length ? s[i + 1] : X.total(); X.seek(s[i] + (end - s[i]) * q - (q === 1 ? 1e-3 : 0));
        return [...chk('#stage svg'), ...dom('main', '.card')]; }, { i, q, CHECK: CHECK.toString(), DOMCHECK: DOMCHECK.toString() });
      res.forEach(r => all.push({ tag, line: i + 1, q, ...r }));
      if (shots && q === 1 && (w === 375 || i % 3 === 0)) await p.locator('#stage').screenshot({ path: path.join(shots, `${id}_${w}_${theme}_${lang}_${String(i + 1).padStart(2, '0')}.png`) });
    }
    // Hele siden må passe i bredden (ingen vannrett rulling).
    if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) all.push({ tag, k: 'bredde', lab: 'siden ruller vannrett' });
    if (w === 375 && theme === 'light' && lang === 'nb') {
      // Tastatur: Mellomrom starter, tenkepausen stopper og viser «Fortsett», → går til neste scene.
      await p.evaluate(() => { AXANIM.seek(0); document.activeElement && document.activeElement.blur(); });
      await p.keyboard.press('Space'); await p.waitForTimeout(300);
      if (!(await p.evaluate(() => AXANIM.st.playing))) fail(`${tag}: Mellomrom startet ikke avspillingen`);
      await p.keyboard.press('Space');
      const wi = await p.evaluate(() => ANIM.lines.findIndex(l => l.wait));
      await p.evaluate(wi => { const s = AXANIM.starts(); AXANIM.seek(s[wi + 1] - 0.4); document.getElementById('play').click(); }, wi);
      await p.waitForTimeout(1200);
      const ws = await p.evaluate(() => ({ playing: AXANIM.st.playing, waitAt: AXANIM.st.waitAt, btn: document.getElementById('play').textContent, vis: !document.getElementById('wait').hidden }));
      if (ws.playing || ws.waitAt !== wi || ws.btn !== 'Fortsett' || !ws.vis) fail(`${tag}: tenkepausen stoppet ikke (${JSON.stringify(ws)})`);
      const before = await p.evaluate(() => AXANIM.at(AXANIM.st.t)[0]);
      await p.keyboard.press('ArrowRight');
      const after = await p.evaluate(() => AXANIM.at(AXANIM.st.t)[0]);
      if (after <= before) fail(`${tag}: → gikk ikke til neste scene`);
      // Slutt: kontrollspørsmålet vises, feil svar gir ✗ og forklaring.
      await p.evaluate(() => { AXANIM.seek(AXANIM.total() - 0.05); document.getElementById('play').click(); }); await p.waitForTimeout(400);
      if (await p.locator('#chk').isHidden()) fail(`${tag}: kontrollspørsmålet vises ikke etter slutt`);
      else { await p.locator('#chk-o button').nth(1).click(); const fb = await p.locator('#chk-f').textContent();
        if (!/Ikke helt/.test(fb) || !(await p.locator('#chk-o button.ok').count())) fail(`${tag}: kontrollspørsmålet gir ikke tilbakemelding`); }
      if ((await p.locator('#play').textContent()) !== 'Spill på nytt') fail(`${tag}: knappen heter ikke «Spill på nytt» etter slutt`);
    }
    if (errs.length) fail(`${tag}: JS-feil ${errs.join(' | ')}`);
    await ctx.close();
  }
  // Redusert bevegelse: trinnmodus, ingen automatisk avspilling, Neste går én replikk.
  for (const id of ids) {
    const ctx = await b.newContext({ viewport: { width: 375, height: 760 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(`${URL0}${id}/`); await p.waitForFunction(() => window.AXANIM);
    const r = await p.evaluate(() => { const s0 = AXANIM.st.step; document.getElementById('next').click(); const i1 = AXANIM.at(AXANIM.st.t)[0];
      document.getElementById('play').click(); const i2 = AXANIM.at(AXANIM.st.t)[0]; return { s0, i1, i2, playing: AXANIM.st.playing }; });
    if (!r.s0 || r.i1 !== 1 || r.i2 !== 2 || r.playing) fail(`${id} redusert bevegelse: ${JSON.stringify(r)}`);
    await ctx.close();
  }
  await b.close();
  const by = {}; all.forEach(r => { const k = r.k + ' ' + (r.lab || ''); by[k] = by[k] || []; by[k].push(`${r.tag || ''} #${r.line || ''}${r.q === 0.5 ? '½' : ''}`); });
  Object.entries(by).forEach(([k, v]) => console.log(`${k}  (${v.length}×) ${v.slice(0, 4).join(', ')}`));
  console.log(all.length ? `\n${all.length} funn` : 'Animasjonsprototyper: 0 funn');
  process.exit(all.length ? 1 : 0);
})();
