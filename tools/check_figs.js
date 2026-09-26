// Sjekker figurene for tekst som er vanskelig å lese: etiketter oppå hverandre, etiketter som krysser streker
// eller fylte former, og tekst utenfor rammen. Tegner alle figurene i Chromium med appens eget stilark og måler.
//   node tools/check_figs.js            (krever Playwright og at release/www er bygget: npm run build)
//   node tools/check_figs.js --json     (maskinlesbar liste)
// Dekker emnefigurene (TOPIC_DB), teorifigurene (FIGS) og «Prøv selv» (SIMS, startverdier + min/maks), på norsk og engelsk.
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..');
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ console.log('Playwright mangler – hopper over figursjekken.'); process.exit(0); }

// ---------- hent figurene ----------
const ls = re => fs.readdirSync(ROOT).filter(f => re.test(f)).sort();
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} }; global.document = { addEventListener(){} };
const tmp = path.join(os.tmpdir(), 'axle_figs_' + process.pid + '.js');
const src = ['config.js', 'i18n.js', 'data.js', 'topics.js', ...ls(/^top_.*\.js$/)].map(read).join('\n;\n') +
  '\n;var S = {}; const esc = s => String(s); const I = new Proxy({}, { get: () => "" }); const nf = (x, d = 2) => String(+(+x).toFixed(d));\n' +
  read('figures.js') + '\n;\n' + read('sims.js') + '\n;\n' + read('sims2.js') +
  '\n;module.exports = { TOPIC_DB, FIGS, SIMS, setLang: l => { LANG = l; } };';
fs.writeFileSync(tmp, src); const M = require(tmp); fs.unlinkSync(tmp);
const items = [];
for(const code in M.TOPIC_DB) (M.TOPIC_DB[code] || []).forEach(list => (list || []).forEach(tp => { if(tp.fig) items.push({ id: `emne ${code}/${tp.id}`, kind: 'tp', svg: tp.fig }); }));
for(const lang of ['nb', 'en']){
  M.setLang(lang);
  for(const name in M.FIGS){ try{ const f = M.FIGS[name](); items.push({ id: `teori ${name} (${lang})`, kind: 'fig', svg: `<svg viewBox="0 0 320 180">${f.svg}</svg>` }); }catch(e){} }
  for(const name in M.SIMS){
    const S0 = M.SIMS[name], sets = [['start', p => p[5]], ['min', p => p[2]], ['maks', p => p[3]]];
    for(const [lab, pick] of sets){ const v = { _g: 0 }; S0.p.forEach(p => v[p[0]] = pick(p)); try{ items.push({ id: `sim ${name} ${lab} (${lang})`, kind: 'sim', svg: `<svg viewBox="0 0 320 180">${S0.f(v).svg}</svg>` }); }catch(e){} }
  }
}

// ---------- mål i nettleseren ----------
(async () => {
  const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
  const b = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  const p = await b.newPage({ viewport: { width: 420, height: 800 } });
  await p.setContent(`<!doctype html><html><head><style>${css}</style></head><body><main class="wrap"><div id="host"></div></main></body></html>`);
  const found = await p.evaluate(items => {
    const host = document.getElementById('host'), out = [];
    const wrap = { tp: s => `<figure class="tpfig">${s}</figure>`, fig: s => `<figure class="fig">${s}</figure>`, sim: s => `<div class="sim fig">${s.replace('<svg ', '<svg class="sim-svg" ')}</div>` };
    for(const it of items){
      host.innerHTML = wrap[it.kind](it.svg);
      const svg = host.querySelector('svg'); if(!svg) continue;
      if(it.kind === 'sim') for(const tx of svg.querySelectorAll('text')){ const r = tx.getBBox(); if(!r.width) continue; // som simFit i sims.js
        const dx = Math.max(0, 3 - r.x) - Math.max(0, r.x + r.width - 317), dy = Math.max(0, 3 - r.y) - Math.max(0, r.y + r.height - 177); if(dx || dy) tx.setAttribute('transform', `translate(${dx} ${dy})`); }
      const vb = svg.viewBox.baseVal, texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim());
      const geo = [...svg.querySelectorAll('path,line,rect,circle,ellipse,polyline,polygon')].filter(g => !g.closest('text') && !g.closest('clipPath'));
      const boxes = texts.map(t => { const r = t.getBBox(), m = (t.getAttribute('transform') || '').match(/translate\(([-\d.]+) ([-\d.]+)\)/) || [0, 0, 0]; return { t: t.textContent.trim(), x: r.x + +m[1], y: r.y + +m[2], w: r.width, h: r.height, el: t }; });
      const issues = [];
      // 1) tekst oppå tekst (tåler 1 enhet)
      for(let i = 0; i < boxes.length; i++) for(let j = i + 1; j < boxes.length; j++){
        const A = boxes[i], B = boxes[j], ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
        if(ox > 1 && oy > 2) issues.push(`overlapp: «${A.t}» og «${B.t}» (${ox.toFixed(0)}×${oy.toFixed(0)})`);
      }
      // 2) utenfor rammen (mer enn 2 enheter)
      for(const A of boxes) if(A.x < vb.x - 2 || A.y < vb.y - 2 || A.x + A.w > vb.x + vb.width + 2 || A.y + A.h > vb.y + vb.height + 2) issues.push(`utenfor: «${A.t}»`);
      // 3) tekst som krysser streker/fylte former: prøv punkter inne i tekstboksen
      const pt = svg.createSVGPoint();
      for(const A of boxes){
        const ix = Math.min(2, A.w / 4), iy = Math.min(3, A.h / 4); let hits = 0, n = 0, who = null;
        for(let a = 0; a <= 4; a++) for(let c = 0; c <= 2; c++){
          pt.x = A.x + ix + (A.w - 2 * ix) * a / 4; pt.y = A.y + iy + (A.h - 2 * iy) * c / 2; n++;
          for(const g of geo){
            const cs = getComputedStyle(g), filled = cs.fill !== 'none' && cs.fillOpacity !== '0' && !/fg-fill|fill|fg-water|fg-hot|fg-cold|fg-mfill|fg-box/.test(g.getAttribute('class') || '') && g.tagName !== 'rect';
            let hit = false; try{ hit = (cs.stroke !== 'none' && g.isPointInStroke(pt)) || (filled && g.isPointInFill(pt)); }catch(e){}
            if(hit){ hits++; who = g.tagName + (g.getAttribute('class') ? '.' + g.getAttribute('class').split(' ')[0] : ''); break; }
          }
        }
        if(hits >= 3) issues.push(`krysser strek: «${A.t}» (${hits}/${n} punkter, ${who})`);
      }
      if(issues.length) out.push({ id: it.id, issues });
    }
    return out;
  }, items);
  if(process.argv.includes('--sheet')){
    const pick = new Set(found.map(f => f.id)), only = process.argv[process.argv.indexOf('--sheet') + 1] || '';
    const list = only.startsWith('=') ? only.slice(1).split(',') : null;
    const sel = list ? items.filter(it => list.some(x => it.id.includes(x)) && !/\((en)\)$/.test(it.id)) : items.filter(it => pick.has(it.id) && it.id.startsWith(only) && !/\((en)\)$/.test(it.id));
    const wrapS = { tp: s => `<figure class="tpfig">${s}</figure>`, fig: s => `<figure class="fig">${s}</figure>`, sim: s => `<div class="sim fig">${s.replace('<svg ', '<svg class="sim-svg" ')}</div>` };
    await p.setContent(`<!doctype html><html><head><style>${css} body{background:var(--paper)} .g{display:grid;grid-template-columns:repeat(4,300px);gap:8px;padding:8px} .c{background:var(--card);padding:6px;border-radius:8px} .c b{font:12px monospace;display:block}</style></head><body><div class="g">${sel.map(it => `<div class="c"><b>${it.id}</b>${wrapS[it.kind](it.svg)}</div>`).join('')}</div></body></html>`);
    await p.evaluate(found => { const m = new Map(found.map(f => [f.id, f.issues.join(' ')])); document.querySelectorAll('.c').forEach(c => { const iss = m.get(c.querySelector('b').textContent) || ''; c.querySelectorAll('svg text').forEach(t => { const tx = t.textContent.trim(); if(tx && iss.includes('«' + tx + '»')){ const r = t.getBBox(), R = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); R.setAttribute('x', r.x); R.setAttribute('y', r.y); R.setAttribute('width', r.width); R.setAttribute('height', r.height); R.setAttribute('style', 'fill:none;stroke:red;stroke-width:1'); t.parentNode.appendChild(R); } }); }); }, found);
    await p.setViewportSize({ width: 1260, height: 900 }); await p.screenshot({ path: process.argv[process.argv.indexOf('--sheet') + 2] || 'figs.png', fullPage: true });
  }
  await b.close();
  if(process.argv.includes('--json')){ console.log(JSON.stringify(found, null, 1)); return; }
  for(const f of found) console.log(f.id + '\n   ' + f.issues.join('\n   '));
  console.log(`\nfigurer sjekket: ${items.length}, med merknader: ${found.length}`);
})();
