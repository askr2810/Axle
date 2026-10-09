// Illustrasjonene over oppgavene (qart.js) skal aldri forvirre. Går gjennom alle oppgavene i barn og ungdom (og FIG_MAP-figurene
// i de andre fagene) på begge språk, før og etter svaret, og sjekker at:
//  - hver figur som vises enten er laget av oppgavens egne tall (it.fig) eller er merket «Eksempel» – og i grunnskolen aldri et eksempel,
//  - figuren før svaret ikke viser svaret (tallet står ikke i figuren, med mindre det også står i oppgaveteksten),
//  - figurspesifikasjonene peker på figurer som finnes.
// Bruk: node tools/test_qart.js [antall kjøringer per generator, standard 40]
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort(),
  'figures.js', 'figs_vgs.js', 'figs_gs.js', 'figs_lf.js', 'qart.js'];
const stub = 'const esc = s => String(s); const COURSE = code => COURSES.find(c => c.code === code); const topicsOf = () => []; const tpText = x => x;\n';
const tmp = path.join(require('os').tmpdir(), 'axle_qa_' + process.pid + '.js');
fs.writeFileSync(tmp, stub + files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES,ENQ,FIGS,qArt,qaSvgNums,qaNums,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const RUNS = +process.argv[2] || 40, errs = new Map(); const E = (w, m) => { if(!errs.has(w)) errs.set(w, m); };
let nItems = 0, nOwn = 0, nPic = 0, nEx = 0;
const item = (q, c, u, id) => { const fig = q.fig || null;
  if(Array.isArray(q[1])) return [{ id, cc: c.code, cu: u, type: 'mc', prompt: q[0], opts: q[1].map((t, i) => ({ t, ok: i === 0 })), fig }];
  const num = { id, cc: c.code, cu: u, type: 'num', prompt: q[0], n: q[1].n, fig };
  return [num, { ...num, type: 'mc', ansN: q[1].n, opts: [{ t: String(q[1].n), ok: true }] }]; };
function check(it, kid, w){
  nItems++;
  if(it.fig && !M.FIGS[it.fig.f]) return E(w, 'ukjent figur ' + it.fig.f);
  for(const answered of [false, true]){ let a; try{ a = M.qArt(it, answered); }catch(e){ return E(w, 'qArt kastet ' + e.message); }
    if(!a.fig){ if(!answered) nPic++; continue; }
    if(/NaN|undefined|Infinity/.test(a.fig)) E(w, 'ugyldige tall i figuren');
    const ex = /q-exb/.test(a.fig);
    if(!a.own && !ex) E(w, 'figuren er verken laget av oppgavens tall eller merket «Eksempel»');
    if(kid && !a.own) E(w, 'grunnskolen skal vise piktogrammet, ikke et eksempel');
    if(!answered){ if(a.own) nOwn++; else nEx++; }
    if(!answered && a.own){ const inFig = new Set(M.qaSvgNums(a.fig)), inQ = new Set(M.qaNums(it.prompt).map(Math.abs));
      const ans = it.type === 'num' ? [it.n] : it.opts.filter(o => o.ok).flatMap(o => M.qaNums(o.t));
      const bad = ans.filter(x => Math.abs(x) > 2 && inFig.has(x) && !inQ.has(Math.abs(x)));
      if(bad.length) E(w, `figuren viser svaret (${bad.join(', ')}) før det er gitt: ${it.prompt.slice(0, 70)}`); } }
}
for(const lang of ['nb', 'en']){ M.setLang(lang);
  for(const c of M.COURSES){ const kid = [].concat(c.study || []).some(s => ['barn', 'ungdom'].includes(s));
    c.units.forEach((u, ui) => {
      u.qs.forEach((q0, i) => { let q = q0; if(lang === 'en'){ const e = M.ENQ[c.code] && M.ENQ[c.code][ui] && M.ENQ[c.code][ui][i]; if(e){ q = [e[0], Array.isArray(q0[1]) ? (e[1] || q0[1]) : q0[1], e[2]]; q.fig = q0.fig; } }
        item(q, c, ui, ui + '.' + i).forEach(it => check(it, kid, `${lang} ${c.code} ${ui}.${i}`)); });
      if(kid) (u.gen || []).forEach((g, j) => { for(let k = 0; k < RUNS; k++) item(g(), c, ui, ui + '.g' + j).forEach(it => check(it, kid, `${lang} ${c.code} ${ui}.g${j}`)); });
    }); } }
console.log(`oppgaver sjekket: ${nItems}, med egen figur: ${nOwn}, eksempel (merket): ${nEx}, bare piktogram: ${nPic}, feil: ${errs.size}`);
[...errs].slice(0, 60).forEach(([w, m]) => console.log(' - ' + w + ': ' + m)); process.exit(errs.size ? 1 : 0);
