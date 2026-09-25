// Bruk: node tools/test_topics.js top_<navn>.js [--units KODE:0,1] [--all]
// Sjekker emnesidene (TOPICS) i fila: felt, lengder, begge språk, KaTeX, figurer.
const fs = require('fs'); const path = require('path'); const APP = path.join(__dirname, '..') + '/';
const target = process.argv[2]; const showAll = process.argv.includes('--all');
if (!target || !/^top_.*\.js$/.test(target) || !fs.existsSync(APP + target)) { console.log('Bruk: node check_top.js top_<navn>.js'); process.exit(2); }
const katex = require(APP + 'vendor/katex.min.js');
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const base = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js',
  ...fs.readdirSync(APP).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(APP).filter(f => /^add_.*\.js$/.test(f)).sort(), 'topics.js'];
const bf = require('os').tmpdir() + '/ct_' + process.pid + '.js';
fs.writeFileSync(bf, base.map(f => fs.readFileSync(APP + f, 'utf8')).join('\n;\n') + '\n;\n' + fs.readFileSync(APP + target, 'utf8') + '\n;module.exports={COURSES,META,TOPIC_DB};');
let M; try { M = require(bf); } catch (e) { console.log('SYNTAKS/LASTEFEIL: ' + e.stack.split('\n').slice(0, 5).join('\n')); try { fs.unlinkSync(bf); } catch (_) {} process.exit(1); }
fs.unlinkSync(bf);
const txt = fs.readFileSync(APP + target, 'utf8');
const touched = [...new Set([...txt.matchAll(/TOPICS\(\s*"([A-Z0-9]+)"\s*,\s*(\d+)/g)].map(m => m[1] + ':' + m[2]))];
const errs = [], info = []; const E = (w, m) => errs.push(w + ': ' + m);
const stripMath = s => String(s).split('$').filter((_, i) => i % 2 === 0).join(' ');
function kx(m, w, disp) { try { katex.renderToString(m, { throwOnError: true, displayMode: disp, output: 'mathml', strict: 'ignore' }); } catch (e) { E(w, 'KaTeX: ' + e.message.split('\n')[0].slice(0, 100) + ' i «' + m.slice(0, 60) + '»'); } }
function inl(s, w, lang) {
  if (typeof s !== 'string' || !s.trim()) return E(w, 'mangler tekst');
  let x = lang === 'en' ? s.replace(/\{,\}/g, '.') : s;
  const parts = x.split('$'); if (parts.length % 2 === 0) return E(w, 'ubalansert $');
  parts.forEach((p, i) => { if (i % 2) kx(p, w, false); else { if (p.includes('{,}')) E(w, '{,} utenfor matte'); if (/<\/?[a-z]/i.test(p)) E(w, 'HTML ikke tillatt'); } });
  if (lang === 'en' && /[æøåÆØÅ«»]/.test(stripMath(x).replace(/Ø(?=\d)/g, ''))) E(w, 'norske tegn i engelsk');
  if (lang === 'nb' && /\d\.\d/.test(stripMath(x))) E(w, 'norsk tekst: bruk desimalkomma (9,81)');
}
function words(s) { return stripMath(s).split(/\s+/).filter(Boolean).length; }
function svgCheck(svg, w) {
  if (typeof svg !== 'string') return E(w, 'fig må være streng');
  const s = svg.trim();
  if (!/^<svg viewBox="0 0 240 140">/.test(s) || !/<\/svg>$/.test(s)) E(w, 'figur må starte med <svg viewBox="0 0 240 140"> og slutte med </svg>');
  if (/<script|on[a-z]+=|href|xlink|<image|<foreignObject|<style|style=|<defs|<marker|\bid=|url\(/i.test(s)) E(w, 'figur: ikke tillatt (script/on*/href/image/style/defs/marker/id/url)');
  if (/#[0-9a-f]{3,6}\b|rgb\(|fill="(?!none)|stroke="/i.test(s)) E(w, 'figur: bruk class (a, af, d, b, dim, t, tf, g, gf, r, rf, fill, dash) i stedet for farger/fill/stroke');
  const bad = [...s.matchAll(/<text[^>]*>([^<]*)</g)].map(m => m[1]).filter(t => t.replace(/\s/g, '').length > 4);
  if (bad.length) E(w, 'figur: tekst skal bare være symboler (≤4 tegn), ikke ord: ' + bad.slice(0, 3).join(' | '));
  const open = (s.match(/<(g|text|svg|tspan)\b[^>]*[^/]>/g) || []).length, close = (s.match(/<\/(g|text|svg|tspan)>/g) || []).length;
  if (open !== close) E(w, `figur: ubalanserte tagger (${open} åpne, ${close} lukkede)`);
  if (s.length > 2500) E(w, 'figur for stor (maks 2500 tegn)');
}
for (const key of touched) {
  const [code, u] = key.split(':'); const c = M.COURSES.find(x => x.code === code);
  if (!c || !c.units[+u]) { E(key, 'ukjent fag/enhet'); continue; }
  const list = (M.TOPIC_DB[code] || [])[+u] || [];
  info.push(`${code} ${u} (${c.units[+u].title}): ${list.length} emner – ${list.map(t => t.id).join(', ')}`);
  if (list.length < 3) E(key, `bare ${list.length} emner (minst 3)`);
  list.forEach((tp, i) => {
    const w = `${code} ${u}.${tp.id || i}`;
    if (!/^[a-z0-9-]+$/.test(tp.id || '')) E(w, 'id må være a–z, 0–9, bindestrek');
    if (tp.fig != null) svgCheck(tp.fig, w);
    for (const lang of ['nb', 'en']) {
      const x = tp[lang], wl = w + ' ' + lang; if (!x) { E(wl, 'mangler språk'); continue; }
      if (!x.t || x.t.length > 40) E(wl, 'tittel mangler eller er for lang (maks 40 tegn)');
      inl(x.intro, wl + ' intro', lang); const wi = words(x.intro || ''); if (wi < 20 || wi > 110) E(wl, `intro ${wi} ord (20–110)`);
      if (!Array.isArray(x.f) || x.f.length < 1 || x.f.length > 4) E(wl, 'f: 1–4 formler');
      (x.f || []).forEach(([l, d], k) => { kx(lang === 'en' ? l.replace(/\{,\}/g, '.') : l, wl + ' f' + k, true); if (/\$/.test(l)) E(wl + ' f' + k, 'formel skal ikke ha $'); inl(d || ' - ', wl + ' f' + k + ' tekst', lang); });
      (x.legend || []).forEach(([s, m, un], k) => { kx(s, wl + ' legend' + k, false); inl(m, wl + ' legend' + k, lang); if (typeof un !== 'string') E(wl, 'legend-enhet må være streng'); });
      inl(x.ex, wl + ' ex', lang); if (words(x.ex || '') > 90) E(wl, 'eksempel for langt (maks ca. 90 ord)');
      inl(x.tip, wl + ' tip', lang);
    }
  });
  const ids = list.map(t => t.id); if (new Set(ids).size !== ids.length) E(key, 'like id-er');
}
// unike id-er innen hvert fag på tvers av enheter
for (const code of new Set(touched.map(k => k.split(':')[0]))) { const all = (M.TOPIC_DB[code] || []).flat().map(t => t.id); const d = all.filter((x, i) => all.indexOf(x) !== i); if (d.length) E(code, 'id brukt flere ganger i faget: ' + [...new Set(d)].join(', ')); }
console.log('Fil: ' + target); info.forEach(x => console.log('   ' + x));
const lim = showAll ? 1e9 : 25; console.log(`\n== FEIL: ${errs.length}`); errs.slice(0, lim).forEach(x => console.log(' - ' + x)); if (errs.length > lim) console.log(`   ... og ${errs.length - lim} til (--all)`);
console.log(errs.length ? `\nIKKE FERDIG: ${errs.length} problemer` : '\nOK: alt bestått'); process.exit(errs.length ? 1 : 0);
