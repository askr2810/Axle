// Innholdstest: kjører alle faste oppgaver og generatorer på norsk og engelsk.
// Bruk: node tools/test_content.js [antall kjøringer per generator, standard 300]
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const extra = [...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort()];
const files = [...order, ...extra.filter(f => !order.includes(f))].filter(f => fs.existsSync(path.join(ROOT, f)));
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const src = files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') +
  ';module.exports={COURSES,ENQ,META,UNIT_EN,setLang:l=>{LANG=l},TH:typeof THEORY_DB!=="undefined"?THEORY_DB:{},PRE:typeof PREREQ!=="undefined"?PREREQ:{}};';
const tmp = path.join(require('os').tmpdir(), 'axle_content_' + process.pid + '.js'); fs.writeFileSync(tmp, src);
const M = require(tmp); fs.unlinkSync(tmp);
const RUNS = +process.argv[2] || 300;
const errs = []; const E = (w, m) => errs.push(w + ': ' + m);
function checkText(s, w, lang){
  if (typeof s !== 'string') return E(w, 'ikke streng');
  if (/NaN|undefined|Infinity|\[object/.test(s)) E(w, 'ugyldig verdi: ' + s.slice(0, 100));
  const parts = s.split(/```[\s\S]*?```/).join('').split('$');
  if (parts.length % 2 === 0) E(w, 'ubalansert $: ' + s.slice(0, 100));
  parts.forEach((p, i) => { if (i % 2 === 0 && p.includes('{,}')) E(w, '{,} utenfor matte: ' + p.slice(0, 80));
    if (i % 2) { let d = 0; for (const ch of p.replace(/\\[{}]/g, '')) { if (ch === '{') d++; if (ch === '}') d--; if (d < 0) break; } if (d !== 0) E(w, 'ubalanserte {} i ' + p.slice(0, 80)); } });
  if (lang === 'en') { const t = s.replace(/\\text\{[^}]*\}/g, '').replace(/Ø(?=\d)/g, ''); if (/[æøåÆØÅ«»]/.test(t) && !/len\("ingeniør"\)/.test(t)) E(w, 'norske tegn i engelsk: ' + s.slice(0, 120)); }
}
function nums(s){ s = s.replace(/\{,\}/g, '.').replace(/(\d),(\d)/g, '$1.$2').replace(/−/g, '-').replace(/\\,/g, '').replace(/(\d)[  ](\d{3})/g, '$1$2').replace(/(\d),(\d{3})/g,'$1$2');
  return (s.match(/-?\d+(\.\d+)?(e-?\d+)?/g) || []).map(Number); }
function ansInExpl(q){ const n = q[1].n, tol = q[1].tol ?? Math.abs(n) * 0.01; const t = Math.max(tol, Math.abs(n) * 0.012, 1e-9);
  return nums(q[2]).some(x => [1, 1000, 0.001, 100, 0.01, 1e6, 1e-6].some(f => Math.abs(x * f - n) <= t || Math.abs(-x * f - n) <= t)); }
function checkQ(q, w, lang, strict){
  if (!Array.isArray(q) || q.length < 3) return E(w, 'feil format');
  checkText(q[0], w + ' tekst', lang); checkText(q[2], w + ' forklaring', lang);
  if (Array.isArray(q[1])) { if (q[1].length < 2) E(w, '<2 alternativer'); if (new Set(q[1]).size !== q[1].length) E(w, 'like alternativer ' + JSON.stringify(q[1])); q[1].forEach((o, i) => checkText(o, w + ' alt' + i, lang)); }
  else { if (!Number.isFinite(q[1].n)) E(w, 'svar ikke tall'); if (!(q[1].tol >= 0)) E(w, 'tol'); if (strict && !ansInExpl(q)) E(w, 'svaret finnes ikke i forklaringen: ' + q[2].slice(0, 100)); }
}
let nStat = 0, nGen = 0;
for (const lang of ['nb', 'en']) {
  M.setLang(lang);
  for (const c of M.COURSES) c.units.forEach((u, ui) => {
    u.qs.forEach((q, i) => { const w = `${lang} ${c.code} ${ui}.${i}`; if (lang === 'nb') nStat++;
      let qq = q; if (lang === 'en') { const e = M.ENQ[c.code] && M.ENQ[c.code][ui] && M.ENQ[c.code][ui][i]; if (!e) return E(w, 'mangler engelsk oversettelse');
        if (Array.isArray(q[1]) !== !!e[1] && e[1] !== null) {} qq = [e[0], Array.isArray(q[1]) ? (e[1] || q[1]) : q[1], e[2]];
        if (Array.isArray(q[1]) && e[1] && e[1].length !== q[1].length) E(w, 'ulikt antall alternativer'); if (!Array.isArray(q[1]) && e[1]) E(w, 'engelsk har alternativer på tallsvar'); }
      checkQ(qq, w, lang, true); });
    (u.gen || []).forEach((g, j) => { if (lang === 'nb') nGen++; const w = `${lang} ${c.code} ${ui}.g${j}`; let bad = 0;
      for (let k = 0; k < RUNS && bad < 1; k++) { let q; try { q = g(); } catch (e) { E(w, 'kastet ' + e.message); break; } const n0 = errs.length; checkQ(q, w, lang, true); if (errs.length > n0) bad++; } });
  });
}
// enhetstitler, fagnavn og teori
M.setLang('nb');
for (const c of M.COURSES) { const m = M.META[c.code]; if (!m) { E(c.code, 'mangler META'); continue; }
  if (!m.units || m.units.length !== c.units.length) E(c.code, `META.units har ${m.units ? m.units.length : 0}, faget har ${c.units.length} enheter`); }
const uniq = [...new Set(errs)];
console.log(`faste: ${nStat}  generatorer: ${nGen}  fag: ${M.COURSES.length}  feil: ${uniq.length}`);
uniq.slice(0, 80).forEach(e => console.log(' - ' + e)); if (uniq.length > 80) console.log(`   ... og ${uniq.length - 80} til`);
process.exit(uniq.length ? 1 : 0);
