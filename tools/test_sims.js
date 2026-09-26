// Test av «Prøv selv»-simuleringene (sims.js + sims2.js):
//  • alle kombinasjoner av glidebryterne (eller et tett utvalg når det blir for mange) gir tegning og tall uten NaN/uendelig/krasj
//  • hver oppgave kan løses med verdier glidebryterne faktisk kan ha, og oppgave 1 er ikke allerede løst ved start
//  • engelsk tekst har ikke norske bokstaver, og SIM_MAP peker bare på simuleringer som finnes
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..');
const figSrc = fs.readFileSync(path.join(ROOT, 'figures.js'), 'utf8').split('\n'), fig = figSrc.slice(figSrc.findIndex(l => l.startsWith('const fgAr')), figSrc.findIndex(l => l.startsWith('const fgGround')) + 1);
const stub = `var LANG = "nb"; const T = (a, b) => LANG === "en" ? b : a; const esc = s => String(s); const I = { bolt: "" }; const t = k => k; const S = {};
const nf = (x, d = 2) => Number.isFinite(x) ? String(+x.toFixed(d)).replace(".", LANG === "en" ? "." : ",") : "BAD";`;
const tmp = path.join(os.tmpdir(), 'axle_sims_' + process.pid + '.js');
fs.writeFileSync(tmp, stub + '\n' + fig.join('\n') + '\n' + fs.readFileSync(path.join(ROOT, 'sims.js'), 'utf8').replace(/^document\.addEventListener[\s\S]*$/m, '') + '\n' +
  fs.readFileSync(path.join(ROOT, 'sims2.js'), 'utf8') + '\n' + fs.readFileSync(path.join(ROOT, 'sims3.js'), 'utf8') + '\nmodule.exports = { SIMS, SIM_MAP, setL: l => LANG = l };');
const M = require(tmp); fs.unlinkSync(tmp);
const { SIMS, SIM_MAP } = M;
const NO = /[æøåÆØÅ]/, BADRE = /NaN|Infinity|undefined|BAD|\[object/;
const vals = p => { const n = Math.round((p[3] - p[2]) / p[4]); return Array.from({ length: n + 1 }, (_, i) => +(p[2] + i * p[4]).toFixed(10)); };
function* combos(ps, lists){ const idx = ps.map(() => 0); while(true){ const v = {}; ps.forEach((p, i) => v[p[0]] = lists[i][idx[i]]); yield v; let k = ps.length - 1; while(k >= 0 && ++idx[k] >= lists[k].length){ idx[k] = 0; k--; } if(k < 0) return; } }
let bad = 0, runs = 0; const fail = (...a) => { bad++; if(bad < 40) console.log(...a); };
const t0 = Date.now();
for(const [name, S0] of Object.entries(SIMS)){
  const full = S0.p.map(vals), size = full.reduce((a, l) => a * l.length, 1), MAX = 200000;
  // for mange kombinasjoner: tynn ut jevnt, men behold min, maks og startverdi
  let lists = full;
  if(size > MAX){ const per = Math.max(3, Math.floor(MAX ** (1 / S0.p.length))); lists = full.map((l, i) => { const keep = new Set([l[0], l[l.length - 1], S0.p[i][5]]); for(let k = 0; k < per; k++) keep.add(l[Math.round(k * (l.length - 1) / (per - 1))]); return [...keep].sort((a, b) => a - b); }); }
  const g = S0.g || [], useG = S0.f.toString().includes('_g'), found = g.map(() => false);
  for(const lang of ['nb', 'en']){
    M.setL(lang);
    if(lang === 'en'){ // engelsk tekst
      const txt = [S0.t[1], S0.q && S0.q[1], ...g.map(x => x[1]), ...S0.p.map(p => Array.isArray(p[1]) ? p[1][1] : p[1])];
      txt.forEach(x => { if(x && NO.test(x)) fail('NO in en', name, x); });
    }
    for(const v0 of combos(S0.p, lang === 'nb' ? lists : lists.map(l => [l[0], l[l.length - 1]]))){
      for(const gi of useG ? g.map((_, i) => i) : [0]){
        const v = { ...v0, _g: gi }; let r; runs++;
        try{ r = S0.f(v); }catch(e){ fail('CRASH', name, JSON.stringify(v), e.message); continue; }
        if(!r || typeof r.svg !== 'string' || !Array.isArray(r.out)){ fail('shape', name); continue; }
        if(BADRE.test(r.svg)) fail('svg', name, JSON.stringify(v), (r.svg.match(/.{0,40}(NaN|Infinity|undefined|BAD).{0,20}/) || [''])[0]);
        for(const [k, x] of r.out){ if(BADRE.test(String(k) + String(x))) fail('out', name, JSON.stringify(v), k, x); if(lang === 'en' && NO.test(String(k) + String(x))) fail('NO in en out', name, k, x); }
        if(lang === 'nb') g.forEach((gg, k) => { if(!found[k] && (!useG || gi === k)){ try{ if(gg[2](v, r.m || {})) found[k] = true; }catch(e){ fail('goal crash', name, k, e.message); } } });
      }
    }
  }
  found.forEach((f, k) => { if(!f) fail('goal unreachable', name, k + 1, g[k][0]); });
  if(g.length){ const v = { _g: 0 }; S0.p.forEach(p => v[p[0]] = p[5]); const r = S0.f(v); if(g[0][2](v, r.m || {})) fail('goal 1 solved at start', name); }
  S0.p.forEach(p => { if(p[5] < p[2] || p[5] > p[3] || Math.abs((p[5] - p[2]) / p[4] - Math.round((p[5] - p[2]) / p[4])) > 1e-9) fail('default off grid', name, p[0]); });
}
for(const [k, m] of Object.entries(SIM_MAP)) for(const n of [].concat(m)) if(!SIMS[n]) fail('SIM_MAP', k, n);
console.log(`simuleringer: ${Object.keys(SIMS).length}, oppgaver: ${Object.values(SIMS).reduce((a, s) => a + (s.g || []).length, 0)}, kjøringer: ${runs}, feil: ${bad} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
if(bad) process.exit(1);
