// «Lær først»-leksjonene (lessons.js): hver leksjon har norsk og engelsk, 3–6 kort, minst ett kort med figur,
// én «Prøv selv» som kan løses (og ikke er løst fra starten) og ett kontrollspørsmål der det riktige svaret er gyldig.
// Figurene tegnes for alle verdiene i «Prøv selv» på begge språk, og all matte sjekkes med KaTeX.
// Bruk: node tools/test_lessons.js
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
const katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort(),
  'figures.js', 'figs_vgs.js', 'figs_gs.js', 'figs_lf.js', 'lessons.js'];
const tmp = path.join(require('os').tmpdir(), 'axle_lf_' + process.pid + '.js');
fs.writeFileSync(tmp, 'const esc = s => String(s);\n' + files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') +
  ';module.exports={COURSES,LESSONS,FIGS,lfUnits,lfSolve,lfTryInit,lfAtGoal,lfFigParams,lfTryArg,lfMax,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const errs = []; const E = (w, m) => errs.push(w + ': ' + m);
let nMath = 0, nFig = 0;
const pair = (p, w) => { if(!Array.isArray(p) || p.length !== 2 || p.some(x => typeof x !== 'string' || !x.trim())) { E(w, 'mangler norsk eller engelsk tekst: ' + JSON.stringify(p)); return false; }
  if(/[æøåÆØÅ«»]/.test(p[1].replace(/øre\b/g, ''))) E(w, 'norske tegn i engelsk tekst: ' + p[1].slice(0, 80)); text(p[0], w); text(p[1], w); return true; };
function text(s, w){
  if(/NaN|undefined|Infinity|\[object/.test(s)) E(w, 'ugyldig verdi: ' + s.slice(0, 80));
  const parts = s.split('$'); if(parts.length % 2 === 0) return E(w, 'ubalansert $: ' + s.slice(0, 80));
  parts.forEach((m, i) => { if(i % 2){ nMath++; try{ katex.renderToString(m.replace(/\{,\}/g, ','), { throwOnError: true, output: 'mathml' }); }catch(e){ E(w, 'KaTeX: ' + e.message.split('\n')[0].slice(0, 80) + ' i $' + m + '$'); } } });
}
function fig(name, p, w){ const f = M.FIGS[name]; if(!f) return E(w, 'ukjent figur ' + name);
  for(const lang of ['nb', 'en']){ M.setLang(lang); let r; try{ r = f(p); }catch(e){ return E(w, `${name} kastet ${e.message}`); }
    if(!r) return E(w, `${name} ga ingen figur for ${JSON.stringify(p)}`);
    if(/NaN|undefined|Infinity/.test(r.svg + r.cap)) E(w, `${name} har ugyldige tall for ${JSON.stringify(p)}`); nFig++; }
  M.setLang('nb'); }
// alle tilstandene i en «Prøv selv» med + og − (eller et utvalg når det er veldig mange)
function* states(tr){ const ks = tr.ctl, v = {}; const out = [];
  const rec = i => { if(out.length > 400) return; if(i === ks.length){ out.push({ v: { ...v } }); return; } const c = ks[i]; for(let x = c.min; x <= M.lfMax(c, v); x += c.step || 1){ v[c.k] = x; rec(i + 1); } };
  rec(0); yield* out; }

const ids = new Set();
for(const L of M.LESSONS){ const w = 'leksjon ' + L.id;
  if(ids.has(L.id)) E(w, 'id brukt to ganger'); ids.add(L.id);
  pair(L.t, w + ' tittel');
  const at = M.lfUnits(L); if(at.length !== L.at.length) E(w, 'finner ikke enheten ' + JSON.stringify(L.at));
  for(const [code] of at){ const c = M.COURSES.find(x => x.code === code), st = [].concat(c.study); if(!st.some(s => ['barn', 'ungdom'].includes(s))) E(w, code + ' er ikke i barn eller ungdom'); }
  const n = L.cards.length; if(n < 3 || n > 6) E(w, `har ${n} kort (skal ha 3–6)`);
  let figs = 0, tries = 0, checks = 0;
  L.cards.forEach((c, i) => { const cw = `${w} kort ${i + 1}`;
    if(c.fig){ figs++; pair(c.say, cw); fig(c.fig[0], c.fig[1] || {}, cw); }
    else if(c.try){ tries++; const tr = c.try; pair(tr.ask, cw + ' oppgave');
      if(typeof tr.goal !== 'function') E(cw, 'mangler goal');
      const init = M.lfTryInit(tr); if(M.lfAtGoal(tr, init)) E(cw, 'målet er nådd før barnet har gjort noe');
      const sol = M.lfSolve(tr); if(!sol) E(cw, 'målet kan ikke nås'); else if(!M.lfAtGoal(tr, sol)) E(cw, 'løsningen når ikke målet');
      const look = s => { for(const lang of ['nb', 'en']){ M.setLang(lang); const a = M.lfTryArg(tr, s);
          if(tr.say) pair(tr.say(...a), cw + ' say'); } M.setLang('nb');
        if(tr.fig) fig(tr.fig, M.lfFigParams(tr, s), cw); };
      if(tr.ctl){ for(const s of states(tr)) look(s); tr.ctl.forEach(k => { if(k.v != null && (k.v < k.min || k.v > (typeof k.max === 'function' ? k.max(init.v) : k.max))) E(cw, `startverdien for ${k.k} er utenfor`); pair(Array.isArray(k.l) ? k.l : [k.l, k.l], cw + ' etikett'); }); }
      else { look(init); if(sol) look(sol); if(tr.items) tr.items.forEach((it, j) => pair(Array.isArray(it.l) ? it.l : [it.l, it.l], cw + ' ting ' + j)); }
      if(sol) pair(typeof tr.ok === 'function' ? tr.ok(...M.lfTryArg(tr, sol)) : tr.ok, cw + ' ok'); }
    else if(c.q){ checks++; const q = c.q;
      if(!Array.isArray(q) || q.length !== 6) { E(cw, 'kontrollspørsmålet skal ha 6 deler (nb tekst, alternativer, forklaring, en …)'); return; }
      pair([q[0], q[3]], cw + ' spørsmål'); pair([q[2], q[5]], cw + ' forklaring');
      const nb = q[1], en = q[4] || q[1];
      if(!Array.isArray(nb) || nb.length < 2) E(cw, 'for få alternativer');
      if(new Set(nb).size !== nb.length || new Set(en).size !== en.length) E(cw, 'like alternativer');
      if(en.length !== nb.length) E(cw, 'ulikt antall alternativer på norsk og engelsk');
      nb.forEach((o, j) => pair([o, en[j]], cw + ' alternativ ' + j));
      if(c.chk){ const want = String(c.chk()); if(want !== nb[0]) E(cw, `fasiten «${nb[0]}» stemmer ikke med utregningen «${want}»`); } }
    else E(cw, 'ukjent korttype'); });
  if(!figs) E(w, 'ingen kort med figur'); if(!tries) E(w, 'ingen «Prøv selv»'); if(!checks) E(w, 'ikke noe kontrollspørsmål');
}
// begrepene oppgavelista ber om, skal ha en leksjon
const MUST = ['croc', 'place', 'nline', 'bridge10', 'times', 'share', 'pizza', 'decimal', 'clock', 'ruler', 'area', 'sym', 'chance', 'therm', 'lift', 'eqkids', 'eqbal', 'percent', 'ratio', 'power', 'pyth', 'machine', 'coord'];
MUST.filter(id => !ids.has(id)).forEach(id => E('dekning', 'mangler leksjonen ' + id));
const units = []; for(const c of M.COURSES) if([].concat(c.study).some(s => ['barn', 'ungdom'].includes(s))) c.units.forEach((u, i) => { if(!M.LESSONS.some(L => M.lfUnits(L).some(([cc, uu]) => cc === c.code && uu === i))) units.push(`${c.code}:${i} ${u.title}`); });
console.log(`leksjoner: ${M.LESSONS.length}, figurer tegnet: ${nFig}, matteuttrykk: ${nMath}, feil: ${errs.length}`);
if(units.length) console.log(`enheter uten «Lær først» (${units.length}): ${units.join(', ')}`);
[...new Set(errs)].slice(0, 60).forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
