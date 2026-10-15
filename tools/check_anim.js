// Visuell kontroll og brukerflyt for animasjonene i appen (anim.js), i ekte nettleser.
// Ser etter tekst over streker, tekst over tekst og tekst utenfor figuren (samme regel som check_figs.js) hvert sekund av filmen,
// klippet tekst og vannrett rulling, på 375, 768 og 1280 px i lyst og mørkt tema. Sjekker også at Spill synes uten å rulle,
// tastatur (Mellomrom, →), tenkepausen, tidslinja, Spill på nytt, kontrollspørsmålet, trinnvis visning (redusert bevegelse),
// og at bildet venter på fortellerstemmen i stedet for å kutte den (enhetens stemme simuleres; lydfiler prøves hvis de finnes).
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_anim.js [--shots mappe]
// Krever Playwright (eller playwright-core og CHROMIUM=sti til Chrome). AXLE_URL kan peke til en annen server.
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const { CHECK, DOMCHECK } = require('./figcheck_lib.js');
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const shots = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
const SIZES = [[375, 667, 'light'], [375, 667, 'dark'], [768, 1024, 'light'], [1280, 860, 'light'], [1280, 860, 'dark']];

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const all = [], fail = (tag, m) => all.push(`${tag}: ${m}`);
  if(shots) fs.mkdirSync(shots, { recursive: true });
  const open = async (ctxOpts, hash) => { const c = await b.newContext(ctxOpts), p = await c.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL0); await p.waitForTimeout(900);
    try{ await p.click('[data-s=vgs]', { timeout: 2500 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(500); await p.click('[data-v=start]', { timeout: 2500 }); }catch(e){}
    await p.goto(URL0 + (hash || '#/animasjon/derivasjon')); await p.waitForTimeout(900); return { c, p, errs }; };
  for(const [w, h, theme] of SIZES){
    const tag = `${w}px ${theme}`, { c, p, errs } = await open({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900 });
    // Spill synes uten å rulle
    const pb = await p.locator('#an-play').boundingBox(); if(!pb || pb.y + pb.height > h) fail(tag, `Spill-knappen er under kanten (${pb ? Math.round(pb.y + pb.height) : '?'} > ${h})`);
    const end = await p.evaluate(() => ANIMS.derivasjon.end);
    for(let t = 0; t <= end; t += 1){
      const res = await p.evaluate(({ t, CHECK, DOMCHECK }) => { anSeek(t); const chk = eval('(' + CHECK + ')'), dom = eval('(' + DOMCHECK + ')');
        return { fig: chk('#an-stage svg', '.an-grid'), // rutenettet ligger under tallene med vilje (tallene har kant i bakgrunnsfarge)
        dom: dom('.an-player', '.an-player,.an-hud,.an-cap,.an-ctl button'), hs: document.documentElement.scrollWidth - innerWidth }; }, { t, CHECK: CHECK.toString(), DOMCHECK: DOMCHECK.toString() });
      res.fig.forEach(r => fail(tag, `t=${t}s figur: ${r.k} «${r.lab}»${r.who ? ' ' + r.who : ''}`)); res.dom.forEach(r => fail(tag, `t=${t}s ${r.k} ${r.lab}`));
      if(res.hs > 1) fail(tag, `t=${t}s siden ruller vannrett (${res.hs} px)`);
      if(shots && t % 6 === 0) await p.locator('.an-player').screenshot({ path: path.join(shots, `${w}_${theme}_${String(t).padStart(3, '0')}.png`) });
    }
    if(w === 375 && theme === 'light'){
      // tastatur og flyt
      await p.evaluate(() => { anSeek(0); document.activeElement && document.activeElement.blur(); });
      await p.keyboard.press('Space'); await p.waitForTimeout(400);
      if(!(await p.evaluate(() => AN.playing))) fail(tag, 'Mellomrom starter ikke');
      const t1 = await p.evaluate(() => AN.t); if(t1 <= 0) fail(tag, 'tiden går ikke');
      await p.keyboard.press('Space'); if(await p.evaluate(() => AN.playing)) fail(tag, 'Mellomrom pauser ikke');
      const wi = await p.evaluate(() => ANIMS.derivasjon.lines.findIndex(l => l.wait));
      await p.evaluate(wi => { const l = ANIMS.derivasjon.lines[wi]; anSeek(l.t0 + l.d - 0.3); anPlay(); }, wi); await p.waitForTimeout(900);
      const ws = await p.evaluate(() => ({ playing: AN.playing, waitAt: AN.waitAt, btn: document.getElementById('an-play').innerText.trim(), shown: !document.getElementById('an-wait').hidden }));
      if(ws.playing || ws.waitAt !== wi || ws.btn !== 'Fortsett' || !ws.shown) fail(tag, `tenkepausen stopper ikke (${JSON.stringify(ws)})`);
      await p.click('#an-play'); await p.waitForTimeout(300); if(!(await p.evaluate(() => AN.playing))) fail(tag, 'Fortsett starter ikke igjen');
      await p.click('#an-play');
      const s0 = await p.evaluate(() => ANIMS.derivasjon.lines[anLineAt(ANIMS.derivasjon, AN.t)].s);
      await p.keyboard.press('ArrowRight'); const s1 = await p.evaluate(() => ANIMS.derivasjon.lines[anLineAt(ANIMS.derivasjon, AN.t)].s); if(s1 !== s0 + 1) fail(tag, `→ går ikke til neste scene (${s0} → ${s1})`);
      // tidslinja
      await p.evaluate(() => { const r = document.getElementById('an-time'); r.value = '600'; r.dispatchEvent(new Event('input', { bubbles: true })); }); const ts = await p.evaluate(() => AN.t); if(Math.abs(ts - 60) > 0.05) fail(tag, `tidslinja hopper ikke til 60 s (${ts})`);
      // slutt, kontrollspørsmål og Spill på nytt
      await p.evaluate(() => { anSeek(ANIMS.derivasjon.end - 0.05); anPlay(); }); await p.waitForTimeout(500);
      if(await p.locator('#an-check').isHidden()) fail(tag, 'kontrollspørsmålet vises ikke etter slutt');
      else { await p.locator('.an-ans').nth(2).click(); const fb = await p.locator('.an-fb').innerText(); if(!/Ikke helt/.test(fb) || !(await p.locator('.an-ans.ok').count())) fail(tag, 'kontrollspørsmålet gir ikke tilbakemelding'); }
      if((await p.locator('#an-play').innerText()).trim() !== 'Spill på nytt') fail(tag, 'knappen heter ikke «Spill på nytt» etter slutt');
      await p.click('#an-play'); await p.waitForTimeout(300); const tr = await p.evaluate(() => ({ t: AN.t, playing: AN.playing, chk: document.getElementById('an-check').hidden }));
      if(!(tr.t < 1 && tr.playing && tr.chk)) fail(tag, `Spill på nytt starter ikke fra begynnelsen (${JSON.stringify(tr)})`);
      await p.evaluate(() => anPause());
      // teksting av og på
      await p.uncheck('#an-cc'); if(!(await p.locator('#an-cap').isHidden())) fail(tag, 'teksting slås ikke av'); await p.check('#an-cc');
      // fortellerstemmen: bildet venter ved slutten av replikken til stemmen er ferdig (enhetens stemme simuleres, 4× fart)
      const hold = await p.evaluate(async () => {
        const said = []; let cur = null;
        window.speechSynthesis.speak = u => { said.push(u.text); cur = u; const ms = u.text.length * 120 / 4; setTimeout(() => { if(cur === u){ cur = null; u.onend && u.onend(); } }, ms); };
        window.speechSynthesis.cancel = () => { cur = null; }; Object.defineProperty(window.speechSynthesis, 'speaking', { get: () => !!cur, configurable: true });
        AN.snd = 'device'; AN.speed = 4; anSeek(0); anPlay();
        const D = ANIMS.derivasjon, l0 = D.lines[0], need = l0.vo[0].length * 120 / 4 / 1000, endT = l0.t0 + l0.d; // stemmen varer need s (veggtid)
        await new Promise(r => setTimeout(r, (l0.d / 4) * 1000 + 300));
        const atEnd = AN.t, held = AN.hold;
        await new Promise(r => setTimeout(r, Math.max(0, need * 1000 - (l0.d / 4) * 1000) + 600));
        const after = AN.t; anPause(); AN.speed = 1; AN.snd = 'off';
        return { said: said.length, need, lineEnd: endT, atEnd, held, after };
      });
      if(hold.need > hold.lineEnd / 4){ if(!(hold.held && hold.atEnd <= hold.lineEnd + 1e-3 && hold.after > hold.lineEnd)) fail(tag, `bildet venter ikke på stemmen (${JSON.stringify(hold)})`); }
      if(hold.said < 1) fail(tag, 'enhetens stemme ble ikke brukt');
      // ferdige lydfiler (finnes bare hvis en innspilling ligger i bygget, eller er lagt inn lokalt med anim_voice.mjs --install)
      const files = await p.evaluate(() => fetch('anim/derivasjon/manifest.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).catch(() => null));
      if(files && files.nb){
        const r = await p.evaluate(async () => { AN_AUDIO.derivasjon = await fetch('anim/derivasjon/manifest.json', { cache: 'no-store' }).then(r => r.json()); renderAnim();
          const sel = document.getElementById('an-snd'); if(![...sel.options].some(o => o.value === 'file')) return { err: 'ingen lydfil-valg' };
          sel.value = 'file'; sel.dispatchEvent(new Event('change')); const D = ANIMS.derivasjon, l = D.lines[4];
          anSeek(l.t0 + l.d - 0.6); anPlay(); await new Promise(r => setTimeout(r, 1500));
          const src = AN_A.el && AN_A.el.src, line = anLineAt(D, AN.t), playing = AN_A.el && !AN_A.el.paused, ct = AN_A.el && AN_A.el.currentTime;
          anPause(); const paused = AN_A.el.paused; AN.snd = 'off'; return { src, line, playing, ct, paused }; });
        if(r.err) fail(tag, r.err); else { if(!/l05\./.test(r.src || '') || r.line !== 5 || !r.playing || !(r.ct > 0.3)) fail(tag, `lydfila følger ikke replikken (${JSON.stringify(r)})`); if(!r.paused) fail(tag, 'Pause stopper ikke lyden'); }
      }
    }
    if(errs.length) fail(tag, 'JS-feil: ' + errs.join(' | '));
    await c.close();
  }
  // redusert bevegelse: trinnvis, ingen automatisk avspilling, Neste går ett bilde fram
  { const { c, p } = await open({ viewport: { width: 375, height: 667 }, reducedMotion: 'reduce' });
    const r = await p.evaluate(() => { const s0 = AN.step; document.getElementById('an-next').click(); const i1 = anLineAt(ANIMS.derivasjon, AN.t); document.getElementById('an-play').click(); const i2 = anLineAt(ANIMS.derivasjon, AN.t); return { s0, i1, i2, playing: AN.playing }; });
    if(!r.s0 || r.i1 !== 1 || r.i2 !== 2 || r.playing) fail('redusert bevegelse', JSON.stringify(r)); await c.close(); }
  // kortet i teorien (VG1T, «Derivasjon og vekstfart») åpner animasjonen
  { const { c, p } = await open({ viewport: { width: 375, height: 667 } }, '#/les/VG1T/3'); await p.waitForTimeout(1500);
    await p.evaluate(() => { const b = document.querySelector('.an-card'); const d = b && b.closest('details'); if(d) d.open = true; }); await p.waitForTimeout(300);
    const card = p.locator('.an-card button').first(); if(!(await card.count())) fail('teori', 'fant ikke animasjonskortet i VG1T enhet 3');
    else { await card.click(); await p.waitForTimeout(700); if(!(await p.evaluate(() => screen === 'anim' && location.hash.includes('animasjon')))) fail('teori', 'kortet åpner ikke animasjonen'); }
    await c.close(); }
  await b.close();
  console.log(all.length ? all.slice(0, 60).join('\n') + `\n${all.length} funn` : 'animasjoner: 0 funn');
  process.exit(all.length ? 1 : 0);
})();
