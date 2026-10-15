// Sjekker alle illustrasjoner på de statiske sidene: tekst som krysser streker, overlapper annen tekst eller havner utenfor.
// Bruk: python3 build.py && node tools/seo.js && (cd release/www && python3 -m http.server 8080) & node tools/check_figs.js [filter]
// Krever Playwright (NODE_PATH til en global installasjon). Resultat i figcheck.json.
// Med --lf sjekkes i stedet figurene i «Lær først»-leksjonene (lessons.js), tegnet i appen med alle verdiene i «Prøv selv».
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); } const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', 'release', 'www');
const pages = []; (function walk(d, rel){ for(const f of fs.readdirSync(d)){ const p = path.join(d, f), r = rel + '/' + f;
  if(['vendor','icons','.well-known'].includes(f)) continue; if(fs.statSync(p).isDirectory()) walk(p, r); else if(f === 'index.html' && rel) pages.push(rel + '/'); } })(ROOT, '');
const { CHECK } = require('./figcheck_lib.js');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const p = await b.newPage({ viewport: { width: 420, height: 900 } });
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  const out = [];
  if(process.argv.includes('--lf')){ // leksjonsfigurene: tegnes inn i appen og sjekkes på samme måte
    await p.goto('http://localhost:8080/', { waitUntil: 'load' });
    for(const theme of ['light', 'dark']){
      await p.evaluate(th => { document.documentElement.setAttribute('data-theme', th); const box = document.createElement('div'); box.id = 'lfcheck'; document.body.innerHTML = ''; document.body.appendChild(box);
        for(const L of LESSONS) L.cards.forEach((c, i) => { const add = (name, prm) => { const r = FIGS[name] && FIGS[name](prm); if(r) box.insertAdjacentHTML('beforeend', `<figure class="fig" data-w="${L.id} kort ${i + 1} ${JSON.stringify(prm).slice(0, 60)}"><svg viewBox="0 0 320 180">${r.svg}</svg></figure>`); };
          if(c.fig) add(c.fig[0], c.fig[1] || {});
          if(c.try && c.try.fig){ const tr = c.try, st = lfTryInit(tr), sol = lfSolve(tr); add(tr.fig, lfFigParams(tr, st)); if(sol) add(tr.fig, lfFigParams(tr, sol));
            if(tr.ctl){ const v = { ...st.v }; tr.ctl.forEach(k => { for(let x = k.min; x <= lfMax(k, v); x += (k.step || 1) * Math.max(1, Math.round((lfMax(k, v) - k.min) / (k.step || 1) / 6))){ add(tr.fig, lfFigParams(tr, { v: { ...v, [k.k]: x } })); } }); } } }); }, theme);
      const res = await p.evaluate(CHECK); const names = await p.evaluate(() => [...document.querySelectorAll('#lfcheck figure')].map(f => f.dataset.w));
      if(res.length) out.push({ u: 'lf ' + theme, res: res.map(r => ({ ...r, w: names[r.fi] })) });
    }
    fs.writeFileSync('figcheck.json', JSON.stringify(out, null, 1));
    const cnt = {}; out.forEach(o => o.res.forEach(r => cnt[r.k] = (cnt[r.k] || 0) + 1));
    console.log('leksjonsfigurer, funn:', cnt); out.forEach(o => o.res.slice(0, 40).forEach(r => console.log(' -', o.u, r.w, r.k, r.lab, r.who || '')));
    await b.close(); return;
  }
  const only = process.argv[2] && !process.argv[2].startsWith('--') ? new RegExp(process.argv[2]) : null;
  for(const u of pages){ if(only && !only.test(u)) continue;
    const html = fs.readFileSync(ROOT + u + 'index.html', 'utf8'); if(!/class="(fig|tpart)/.test(html)) continue;
    await p.goto('http://localhost:8080' + u, { waitUntil: 'domcontentloaded' });
    const res = await p.evaluate(CHECK);
    if(res.length) out.push({ u, res });
  }
  fs.writeFileSync('figcheck.json', JSON.stringify(out, null, 1));
  const cnt = {}; out.forEach(o => o.res.forEach(r => cnt[r.k] = (cnt[r.k] || 0) + 1));
  console.log('sider med funn:', out.length, cnt);
  await b.close();
})();
