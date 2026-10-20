// Sjekker regneeksemplene på emnesidene (AX-05).
// Et emne kan ha `chk: ["uttrykk ≈ verdi", ...]`. Uttrykket regnes ut og må stemme med verdien
// (innenfor en halv enhet på siste viste siffer, eller 0,1 % relativt), og verdien må stå i
// eksempelteksten (`ex`) på både nb og en. Uttrykk: + - * / ^ ( ), tall som 2e6, og
// sqrt, pi, sin, cos, tan (radianer; bruk 30*deg for grader), deg, exp, ln, log10, abs.
// Bruk: node tools/test_examples.js [--v]
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
const files = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js',
  ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort(),
  'figlib.js', 'topics.js', ...fs.readdirSync(ROOT).filter(f => /^top_.*\.js$/.test(f)).sort()];
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const tmp = require('os').tmpdir() + '/tex_' + process.pid + '.js';
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={TOPIC_DB};');
const { TOPIC_DB } = require(tmp); fs.unlinkSync(tmp);
const verbose = process.argv.includes('--v');
const S = { sqrt: Math.sqrt, pi: Math.PI, sin: Math.sin, cos: Math.cos, tan: Math.tan, deg: Math.PI / 180,
  exp: Math.exp, ln: Math.log, log10: Math.log10, abs: Math.abs };
function evalExpr(e) {
  if (!/^[\d\s.+\-*/^()a-z0-9,]*$/i.test(e)) throw new Error('ugyldige tegn');
  for (const w of e.match(/(?<![\d.])[a-z][a-z0-9]*/gi) || []) if (!(w in S)) throw new Error('ukjent navn ' + w);
  return Function(...Object.keys(S), '"use strict"; return (' + e.replace(/\^/g, '**') + ');')(...Object.values(S));
}
// Alle tall i teksten, tolket både med komma/{,} som desimaltegn og som tusenskille.
function numbers(s) {
  const t = String(s || '').replace(/\\[,;!: ]/g, '').replace(/(\d) (?=\d{3}\b)/g, '$1').replace(/−/g, '-');
  const out = [];
  for (const m of t.matchAll(/\d+(?:(?:\{,\}|[.,])\d+)*/g)) {
    const x = m[0];
    for (const dec of [true, false]) { const v = parseFloat(x.replace(/\{,\}|,/g, dec ? '.' : '')); if (isFinite(v)) out.push(v); }
  }
  return out;
}
let bad = 0, n = 0, topics = 0, without = 0;
for (const [code, units] of Object.entries(TOPIC_DB)) (units || []).forEach((u, ui) => (u || []).forEach(t => {
  if (!t || !t.chk) { if (t && /\d/.test((t.nb && t.nb.ex) || '')) without++; return; }
  topics++; const w = `${code}:${ui} ${t.id}`;
  if (!Array.isArray(t.chk)) { bad++; return console.log(`FEIL ${w}: chk må være en liste`); }
  for (const c of t.chk) {
    n++; const m = /^(.+?)\s*≈\s*(-?[\d.]+(?:e-?\d+)?)\s*$/.exec(c);
    if (!m) { bad++; console.log(`FEIL ${w}: kan ikke lese «${c}»`); continue; }
    const want = parseFloat(m[2]), dp = (m[2].split('.')[1] || '').replace(/e.*/, '').length;
    let got; try { got = evalExpr(m[1]); } catch (e) { bad++; console.log(`FEIL ${w}: «${m[1]}»: ${e.message}`); continue; }
    const tol = Math.max(0.5 * 10 ** -dp + 1e-12, Math.abs(want) * 1e-3);
    if (!(Math.abs(got - want) <= tol)) { bad++; console.log(`FEIL ${w}: ${m[1]} = ${+got.toPrecision(6)}, men eksemplet sier ${m[2]}`); continue; }
    for (const L of ['nb', 'en']) {
      const ex = t[L] && t[L].ex;
      if (!numbers(ex).some(v => Math.abs(v - Math.abs(want)) <= 1e-9 * Math.max(1, Math.abs(want)))) { bad++; console.log(`FEIL ${w} (${L}): ${m[2]} står ikke i eksempelteksten`); }
    }
    if (verbose) console.log(`ok ${w}: ${m[1]} = ${+got.toPrecision(6)} ≈ ${m[2]}`);
  }
}));
console.log(`regneeksempler: ${n} kontroller i ${topics} emner, ${bad} feil (${without} emner med tall i eksemplet har ennå ikke chk)`);
process.exit(bad || !n ? 1 : 0);
