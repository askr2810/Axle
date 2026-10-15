// Mobilvisning og zoom (oppgave 30): på vanlige mobilbredder skal ingen skjermer flyte ut sideveis, alle tekstfelt skal være minst 16 px
// (ellers zoomer iPhone inn når feltet får fokus), siden skal ha touch-action: manipulation (ingen dobbelttrykkzoom, rulling og klyping virker),
// tegneflate og dra-kontroller skal beholde touch-action: none, og iPhone skal få maximum-scale=1 i viewport (ikke Android).
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_mobile.js [--shots mappe]
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const shots = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36';
const SIZES = [[320, 640, IPHONE], [360, 780, ANDROID], [375, 667, IPHONE], [390, 844, IPHONE], [414, 896, IPHONE], [430, 932, IPHONE]];
// skjermene: navn → kode som åpner dem
const SCREENS = [
  ['start', () => { screen = 'home'; render(); }],
  ['øv', () => { screen = 'practice'; render(); }],
  ['teori', () => { location.hash = '#/les/VG1T/3'; }],
  ['oppgave', () => { startUnitLesson('VG1T', 0, 0); }],
  ['kladdeark', () => { startUnitLesson('VG1T', 0, 0); setTimeout(() => { const b = document.querySelector('[data-a=scratch]'); if(b) b.click(); }, 400); }],
  ['kartspill', () => { geStart('europe', 'find'); }],
  ['innstillinger', () => { screen = 'settings'; SET_SEC = null; render(); }],
  ['lærerverktøy', () => { tcOpen('home'); }],
  ['elevprofiler', () => { location.hash = '#/elever'; }],
  ['animasjon', () => { location.hash = '#/animasjon/derivasjon'; }],
  ['innlogging', () => { screen = 'home'; render(); overlay = { login: 1, step: 'email', email: '' }; renderOverlay(); }],
  ['elevinnlogging', () => { overlay = { login: 1, step: 'join', code: 'ABC123' }; renderOverlay(); }],
  ['hoderegning', () => { mqOpen(null, 'home'); }]
];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const fails = [], fail = (t, m) => fails.push(`${t}: ${m}`); let n = 0;
  if(shots) fs.mkdirSync(shots, { recursive: true });
  for(const [w, h, ua] of SIZES){
    const ios = ua === IPHONE, c = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 3, userAgent: ua }), p = await c.newPage(), errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL0); await p.waitForTimeout(900);
    try{ await p.click('[data-s=vgs]', { timeout: 2000 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(400); await p.click('[data-v=start]', { timeout: 2000 }); }catch(e){}
    const meta = await p.evaluate(() => document.querySelector('meta[name=viewport]').content);
    n++; if(ios !== /maximum-scale=1/.test(meta)) fail(`${w}px`, `viewport på ${ios ? 'iPhone' : 'Android'}: «${meta}»`);
    n++; if(!/width=device-width/.test(meta) || /user-scalable=no/.test(meta)) fail(`${w}px`, `viewport skal være width=device-width og ikke sperre zoom i nettleseren («${meta}»)`);
    for(const [name, open] of SCREENS){
      await p.evaluate(`(${open.toString()})()`).catch(e => fail(`${w}px ${name}`, 'kunne ikke åpnes: ' + e.message)); await p.waitForTimeout(name === 'kladdeark' || name === 'teori' || name === 'animasjon' || name === 'elevprofiler' ? 1300 : 600);
      const r = await p.evaluate(() => {
        const vw = innerWidth, over = document.documentElement.scrollWidth - vw;
        const wide = [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); if(s.position === 'fixed' || s.display === 'none' || s.visibility === 'hidden') return false; const r = e.getBoundingClientRect(); if(!r.width) return false;
          let a = e.parentElement; while(a && a !== document.body){ const o = getComputedStyle(a); if(/auto|scroll|hidden|clip/.test(o.overflowX)) return false; a = a.parentElement; } return r.right > vw + 1 || r.left < -1; }).slice(0, 3).map(e => (e.tagName + '.' + String(e.className).split(' ')[0]).slice(0, 40));
        // knapper og lukkeknapper skal være helt innenfor skjermen (også inne i beholdere som klipper)
        const cut = [...document.querySelectorAll('button,[role=button],a.big')].filter(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && e.offsetParent && !e.closest('.hscroll,.chips,.favbar,.study-tabs,.tg-tabs,.ave-tabs,.sw-row,.cd-keys,.bk-toc,.ib-fresh,.sh-friends,.adm-tabs,.mp-steps') && (r.right > vw + 1 || r.left < -1); }).slice(0, 3).map(e => (e.getAttribute('aria-label') || e.textContent || e.className).toString().trim().slice(0, 30));
        const small = [...document.querySelectorAll('input:not([type=range]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden]),select,textarea')].filter(e => e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 16).map(e => (e.id || e.className || e.tagName).toString().slice(0, 30));
        const ta = getComputedStyle(document.documentElement).touchAction;
        const draw = [...document.querySelectorAll('.sc-canvas canvas,.tg-svg,.crop-view,.mv-hit,.ct-h')].map(e => getComputedStyle(e).touchAction).filter(t => t !== 'none');
        return { over, wide, small, ta, draw, cut }; });
      n++;
      if(r.over > 1) fail(`${w}px ${name}`, `siden flyter ${r.over} px ut sideveis (${r.wide.join(', ')})`);
      if(r.cut.length) fail(`${w}px ${name}`, `knapper delvis utenfor skjermen: ${r.cut.join(', ')}`);
      if(r.small.length) fail(`${w}px ${name}`, `tekstfelt under 16 px (iPhone zoomer inn ved fokus): ${r.small.join(', ')}`);
      if(r.ta !== 'manipulation') fail(`${w}px ${name}`, `touch-action på siden er «${r.ta}», skal være manipulation`);
      if(r.draw.length) fail(`${w}px ${name}`, `tegneflate/dra-kontroll har mistet touch-action: none (${r.draw.join(', ')})`);
      if(shots && (w === 320 || w === 390)) await p.screenshot({ path: path.join(shots, `${w}_${name}.png`) });
      await p.evaluate(() => { overlay = null; try{ renderOverlay(); }catch(e){} });
    }
    if(errs.length) fail(`${w}px`, 'JS-feil: ' + errs.slice(0, 2).join(' | '));
    await c.close();
  }
  await b.close();
  console.log(`mobilvisning: ${SIZES.length} bredder × ${SCREENS.length} skjermer, ${n} kontroller, feil: ${fails.length}`); fails.forEach(f => console.log(' - ' + f));
  process.exit(fails.length ? 1 : 0);
})();
