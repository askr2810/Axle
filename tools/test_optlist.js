// Flervalgsoppgaver skal ikke ramse opp svaralternativene i oppgaveteksten («Hvilket tall er størst: 12, 40, 7 eller 33?»).
// Feiler hvis alle alternativene (minst tre) står ramset opp i teksten med «eller»/«or» (kodeoppgaver unntatt: der står svarene naturlig i koden). Faste oppgaver og generatorer, norsk og engelsk.
// Bruk: node tools/test_optlist.js [antall kjøringer per generator, standard 60]
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort()];
const tmp = path.join(require('os').tmpdir(), 'axle_ol_' + process.pid + '.js');
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES,ENQ,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const RUNS = +process.argv[2] || 60, errs = new Map();
const norm = s => String(s).replace(/\$/g, ' ').replace(/\\[,;!]/g, '').replace(/−/g, '-').replace(/\{,\}/g, ',').replace(/\s+/g, ' ').trim().toLowerCase();
// Er alternativet nevnt som et eget ord/tall i teksten (ikke bare som del av et lengre tall eller ord)?
function listed(prompt, opt){
  const o = norm(opt), p = norm(prompt); if(!o) return false;
  let i = p.indexOf(o);
  while(i >= 0){ const a = p[i - 1] || ' ', b = p[i + o.length] || ' ';
    if(!/[\p{L}\p{N}.]/u.test(a) && !/[\p{L}\p{N}]/u.test(b)) return true; i = p.indexOf(o, i + 1); }
  return false;
}
function check(q, w){ if(!Array.isArray(q) || !Array.isArray(q[1]) || q[1].length < 3 || /```/.test(q[0])) return; // kode: alternativene står naturlig i koden
  // Oppramsingen «a, b, c eller d» (to av alternativene bundet sammen med eller/or). Et datasett i teksten («typetallet i 3, 5, 5, 7»)
  // eller en reaksjonslikning er nødvendig for oppgaven og teller ikke.
  const p = norm(q[0]), alt = q[1].some(a => q[1].some(b => a !== b && (p.includes(norm(a) + ' eller ' + norm(b)) || p.includes(norm(a) + ' or ' + norm(b)))));
  if(alt && q[1].every(o => listed(q[0], o))) { if(!errs.has(w)) errs.set(w, q[0].slice(0, 110)); } }
let n = 0;
for(const lang of ['nb', 'en']){ M.setLang(lang);
  for(const c of M.COURSES) c.units.forEach((u, ui) => {
    u.qs.forEach((q, i) => { n++; let qq = q; if(lang === 'en'){ const e = M.ENQ[c.code] && M.ENQ[c.code][ui] && M.ENQ[c.code][ui][i]; if(!e) return; qq = [e[0], Array.isArray(q[1]) ? (e[1] || q[1]) : q[1], e[2]]; } check(qq, `${lang} ${c.code} ${ui}.${i}`); });
    (u.gen || []).forEach((g, j) => { for(let k = 0; k < RUNS; k++){ n++; check(g(), `${lang} ${c.code} ${ui}.g${j}`); } });
  }); }
console.log(`flervalg sjekket: ${n}, med alternativene ramset opp i teksten: ${errs.size}`);
[...errs].forEach(([w, p]) => console.log(' - ' + w + ': ' + p)); process.exit(errs.size ? 1 : 0);
