// Rask pennskrift på kladdearket (oppgave 31): skriver hundrevis av korte, raske pennestrøk (pointerType «pen», flere punkter per bilde
// som Apple Pencil) på et iPad-stort ark, og kontrollerer at
//  - skjermen er piksel for piksel lik en full omtegning etterpå (bare området rundt pennen kopieres til skjermen underveis),
//  - ingen strøk blir borte (antall streker = antall strøk),
//  - tegnearbeidet per bilde holder seg lavt også når arket er fullt, og at slutten av et strøk ikke tegner hele arket på nytt.
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_pen.js [--webkit]
let pw; try{ pw = require('playwright'); }catch(e){ pw = require('playwright-core'); }
const WEBKIT = process.argv.includes('--webkit'); // Safari-motoren (npx playwright install webkit); ellers Chrome
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const STROKES = +(process.env.AXLE_PEN_STROKES || 500);
(async () => {
  const b = WEBKIT ? await pw.webkit.launch() : await pw.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const c = await b.newContext({ viewport: { width: 1024, height: 1366 }, deviceScaleFactor: 2, hasTouch: true, isMobile: !WEBKIT,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  const p = await c.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL0); await p.waitForTimeout(900);
  try{ await p.click('[data-s=vgs]', { timeout: 2000 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(400); await p.click('[data-v=start]', { timeout: 2000 }); }catch(e){}
  await p.evaluate(() => { startUnitLesson('VG1T', 0, 0); }); await p.waitForTimeout(500);
  await p.evaluate(() => { document.querySelector('[data-a=scratch]').click(); }); await p.waitForTimeout(800);
  const r = await p.evaluate(async (N) => {
    const cv = document.getElementById('sccv'), R = cv.getBoundingClientRect();
    // tid brukt i hvert bilde (requestAnimationFrame-kallene til scDraw)
    const times = []; let tag = 'move'; const raf0 = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = f => raf0(t => { const a = performance.now(); f(t); times.push([tag, performance.now() - a]); });
    const frame = () => new Promise(res => raf0(() => res()));
    const ev = (type, x, y, id, pr) => cv.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'pen', isPrimary: true, bubbles: true, cancelable: true,
      clientX: R.left + x, clientY: R.top + y, pressure: pr, buttons: type === 'pointerup' ? 0 : 1, button: type === 'pointermove' ? -1 : 0 }));
    let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const cols = Math.floor((R.width - 40) / 26), t0 = performance.now(); let late = 0;
    for(let k = 0; k < N; k++){
      // bokstavlignende strøk i linjer nedover arket; 4 punkter per bilde (240 Hz penn, 60 Hz skjerm)
      const cx = 20 + (k % cols) * 26, cy = 30 + (Math.floor(k / cols) % Math.floor((R.height - 60) / 34)) * 34, n = 8 + Math.floor(rnd() * 20), id = 2;
      tag = 'start'; ev('pointerdown', cx, cy, id, 0.4); await frame(); tag = 'move';
      for(let i = 1; i <= n; i++){ const a = i / n * Math.PI * (1.5 + rnd()); ev('pointermove', cx + 9 * Math.sin(a) + i * 0.6, cy + 12 * Math.cos(a * 1.3), id, 0.3 + 0.5 * rnd()); if(i % 4 === 0) await frame(); }
      tag = 'slutt'; ev('pointerup', cx + 12, cy + 4, id, 0); await frame();
      if(k === N - 120) late = times.length; // de siste 120 strøkene: arket er fullt
    }
    await frame(); await frame(); window.requestAnimationFrame = raf0;
    const ctx = cv.getContext('2d'), A = ctx.getImageData(0, 0, cv.width, cv.height).data;
    scDraw(); await frame(); await frame();
    const B = ctx.getImageData(0, 0, cv.width, cv.height).data; let diff = 0;
    for(let i = 0; i < A.length; i += 4) if(Math.abs(A[i] - B[i]) > 2 || Math.abs(A[i + 1] - B[i + 1]) > 2 || Math.abs(A[i + 2] - B[i + 2]) > 2 || Math.abs(A[i + 3] - B[i + 3]) > 2) diff++;
    const lt = times.slice(late), st = tg => lt.filter(x => x[0] === tg).map(x => x[1]).sort((a, b) => a - b), q = (a, f) => a.length ? +a[Math.min(a.length - 1, Math.floor(a.length * f))].toFixed(2) : 0;
    const mv = st('move'), sl = st('slutt'), sa = st('start');
    return { diff, px: A.length / 4, strokes: scratchState().strokes.length, w: cv.width, h: cv.height, sek: +((performance.now() - t0) / 1000).toFixed(1),
      move: [q(mv, 0.5), q(mv, 0.95)], start: [q(sa, 0.5), q(sa, 0.95)], slutt: [q(sl, 0.5), q(sl, 0.95)] };
  }, STROKES);
  await b.close();
  const fails = [];
  if(r.strokes !== STROKES) fails.push(`${STROKES} strøk, men ${r.strokes} streker på arket`);
  if(r.diff > 0) fails.push(`skjermen avviker fra full omtegning i ${r.diff} piksler`);
  // grenser i headless Chrome på Mac: tegning per bilde skal ikke vokse med mengden kladd
  if(r.slutt[1] > 4 || r.move[1] > 4) fails.push(`for tregt per bilde: strek ${r.move.join('/')} ms, slutt på strøk ${r.slutt.join('/')} ms (median/95 %)`);
  if(errs.length) fails.push('JS-feil: ' + errs.slice(0, 2).join(' | '));
  console.log(`pennskrift (${WEBKIT ? 'WebKit' : 'Chrome'}): ${r.strokes} strøk på ${r.w}×${r.h} lerretspiksler (${r.sek} s). Per bilde med fullt ark (median/95 %): strek ${r.move.join('/')} ms, start ${r.start.join('/')} ms, slutt ${r.slutt.join('/')} ms. Avvik fra full omtegning: ${r.diff} piksler. Feil: ${fails.length}`);
  fails.forEach(f => console.log(' - ' + f)); process.exit(fails.length ? 1 : 0);
})();
