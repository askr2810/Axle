// Sjekker at all matte ($...$ og $$...$$) i oppgaver, generatorer og teori kan tolkes av KaTeX (begge språk).
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
const katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort()];
const tmp = path.join(require('os').tmpdir(), 'axle_kx_' + process.pid + '.js');
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES,ENQ,THEORY_DB,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const RUNS = +process.argv[2] || 30; const errs = new Map(); let n = 0;
function mathOf(s, lang){ s = String(s); if (lang === 'en') s = s.replace(/\{,\}/g, '.'); s = s.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
  const out = []; s.replace(/\$\$([^$]+)\$\$/g, (m, x) => { out.push([x, true]); return ' '; }).split('$').forEach((p, i) => { if (i % 2) out.push([p, false]); }); return out; }
function check(s, where, lang){ for (const [m, disp] of mathOf(s, lang)) { n++; try { katex.renderToString(m, { throwOnError: true, displayMode: disp, output: 'mathml' }); } catch (e) { const k = e.message.split('\n')[0].slice(0, 120); if (!errs.has(where)) errs.set(where, `${k}  ::  $${m.slice(0, 90)}$`); } } }
function all(q, w, lang){ check(q[0], w, lang); check(q[2], w, lang); if (Array.isArray(q[1])) q[1].forEach(o => check(o, w, lang)); }
for (const lang of ['nb', 'en']) { M.setLang(lang);
  for (const c of M.COURSES) c.units.forEach((u, ui) => {
    u.qs.forEach((q, i) => { let qq = q; if (lang === 'en') { const e = M.ENQ[c.code] && M.ENQ[c.code][ui] && M.ENQ[c.code][ui][i]; if (e) qq = [e[0], e[1] || q[1], e[2]]; } all(qq, `${lang} ${c.code} ${ui}.${i}`, lang); });
    (u.gen || []).forEach((g, j) => { for (let k = 0; k < RUNS; k++) all(g(), `${lang} ${c.code} ${ui}.g${j}`, lang); });
    const th = M.THEORY_DB[c.code] && M.THEORY_DB[c.code][ui]; if (th) check(th[lang] || '', `${lang} ${c.code} ${ui} teori`, lang);
  }); }
console.log(`matteuttrykk sjekket: ${n}, steder med feil: ${errs.size}`);
[...errs].slice(0, 60).forEach(([w, e]) => console.log(' - ' + w + ': ' + e)); process.exit(errs.size ? 1 : 0);
