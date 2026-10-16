// Stasjonen «Steg for steg» i enhetssirkelen (trig.js, oppgave 38): sinus, cosinus og tangens for 0°–90°.
// Kontrollerer uavhengig av teksten: verdiene mot Math.sin/cos/tan, huskeregelen (√k/2), at cos er sin baklengs,
// at tan 90° ikke er definert (og ikke vises som tall), radianene, grafpunktene i steg 4 (periode 2π, toppunkter,
// cos v = sin(v + π/2)), spørsmålene i steg 6, og at alle tekster finnes på norsk og engelsk og lar seg tegne med KaTeX.
// Bruk: node tools/test_trig_learn.js
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..'), katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
const learn = fs.readFileSync(path.join(ROOT, 'learn.js'), 'utf8'), mcSrc = learn.slice(learn.indexOf('// ---------- farger i formler'), learn.indexOf('// ---------- teori ----------'));
const stub = 'var LANG = "nb"; const T = (a, b) => LANG === "en" ? b : a; const esc = s => String(s); const tex = s => s; const rich = s => s; const nf = (x, d = 2) => String(+(+x).toFixed(d)); const mf = nf;' +
  'const UI = { nb: {}, en: {} }; const S = {}; const shuffle = a => a.slice().sort(() => Math.random() - 0.5);\n';
const f = path.join(os.tmpdir(), 'axle_tgl_' + process.pid + '.js');
fs.writeFileSync(f, mcSrc + stub + fs.readFileSync(path.join(ROOT, 'trig.js'), 'utf8') + '\n;module.exports={TGL_V,TGL_TAN,TGL_TXT,TGL_POOL,TG,TG_GX,TG_GW,TG_GR,TG_CY,tglCurve,tglX,tglY,tglAnswer,tglNewQ,tglLearn,setLang:l=>{LANG=l}};');
const M = require(f); fs.unlinkSync(f);
const errs = []; const E = (w, m) => errs.push(w + ': ' + m); let n = 0;
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
// Enkel lesing av verdiene: 0, 1, \tfrac12, \tfrac{\sqrt k}{2}, \tfrac{\sqrt3}{3}, \sqrt3, \tfrac{\pi}{k}
function num(t){
  if(t === null) return null; let m;
  if(t === '0') return 0; if(t === '1') return 1; if(t === '\\tfrac12') return 0.5; if(t === '\\sqrt3') return Math.sqrt(3);
  if((m = t.match(/^\\tfrac\{\\sqrt\{?(\d)\}?\}\{(\d)\}$/))) return Math.sqrt(+m[1]) / +m[2];
  if((m = t.match(/^\\tfrac\{\\pi\}\{(\d)\}$/))) return Math.PI / +m[1];
  throw new Error('kan ikke lese ' + t);
}
const rad = d => d * Math.PI / 180;
// 1) verdiene
const degs = M.TGL_V.map(v => v[0]);
if(JSON.stringify(degs) !== '[0,30,45,60,90]') E('vinkler', 'skal være 0, 30, 45, 60, 90 i rekkefølge: ' + degs);
M.TGL_V.forEach(([d, r, root, s, c, t], k) => { const w = d + '°';
  try{
    if(!close(num(r), rad(d))) E(w, `radianer ${r} ≠ ${d}·π/180`); n++;
    const rk = root.match(/^\\tfrac\{\\sqrt(\d)\}\{2\}$/); if(!rk || +rk[1] !== k) E(w, `huskeregelen: sinus skal stå som √${k}/2, ikke ${root}`); n++;
    if(!close(num(root), Math.sin(rad(d)))) E(w, `√${k}/2 ≠ sin ${d}°`); if(!close(num(s), Math.sin(rad(d)))) E(w, `sin ${d}° ≠ ${s}`); if(!close(num(c), Math.cos(rad(d)), 1e-12)) E(w, `cos ${d}° ≠ ${c}`); n += 3;
    if(d === 90){ if(t !== null) E(w, 'tan 90° skal være ikke definert (null), ikke ' + t); if(M.TGL_TAN[k] !== null) E(w, 'utregningen av tan 90° skal ikke gi et tall'); }
    else { if(!close(num(t), Math.tan(rad(d)), 1e-12)) E(w, `tan ${d}° ≠ ${t}`); if(!close(num(t), num(s) / num(c))) E(w, 'tan ≠ sin/cos'); const last = M.TGL_TAN[k].split('=').pop().trim().replace(/^\\frac/, '\\tfrac'); if(!close(num(last), num(t))) E(w, `utregningen av tan ender på ${last}, ikke ${t}`); }
    n += 2;
  }catch(e){ E(w, e.message); } });
// cos er sin baklengs
const sinS = M.TGL_V.map(v => v[3]), cosS = M.TGL_V.map(v => v[4]);
if(JSON.stringify(cosS) !== JSON.stringify(sinS.slice().reverse())) E('cos', 'cosinusverdiene er ikke sinusverdiene i motsatt rekkefølge'); n++;
// 2) grafene i steg 4
const sin = M.tglCurve('sin'), cos = M.tglCurve('cos');
if(sin[0][0] !== 0 || sin[sin.length - 1][0] !== 360) E('graf', 'grafene skal gå fra 0 til 2π (360°)');
const Y = y => M.TG_CY - y * M.TG_GR;
for(const [d, x, y] of sin){ if(!close(x, M.TG_GX + d * M.TG_GW / 360) || !close(y, Y(Math.sin(rad(d))), 1e-9)) { E('sinusgrafen', `feil punkt ved ${d}°`); break; } }
for(const [d, , y] of cos){ if(!close(y, Y(Math.cos(rad(d))), 1e-9)) { E('cosinusgrafen', `feil punkt ved ${d}°`); break; }
  if(!close(Math.cos(rad(d)), Math.sin(rad(d + 90)), 1e-12)) E('fase', `cos ${d}° ≠ sin(${d}° + 90°)`); }
n += sin.length + cos.length;
const top = pts => pts.reduce((b, p) => p[2] < b[2] - 1e-9 ? p : b)[0]; // minst y = høyest i SVG
if(top(cos) !== 0) E('graf', 'toppen til cosinus skal være ved 0'); if(top(sin) !== 90) E('graf', 'toppen til sinus skal være ved π/2 (90°)');
if(!close(cos[0][2], Y(1)) || !close(sin[0][2], Y(0))) E('graf', 'ved v = 0 skal cos starte på 1 og sin på 0');
if(!close(cos[cos.length - 1][2], cos[0][2]) || !close(sin[sin.length - 1][2], sin[0][2], 1e-9)) E('graf', 'perioden er ikke 2π (grafene ender ikke der de startet)');
if(!close(M.tglX(90) - M.tglX(0), M.TG_GW / 4)) E('graf', 'pila for forskyvningen skal være en kvart periode (π/2)');
n += 5;
// 3) spørsmålene i steg 6
for(const fn of ['sin', 'cos', 'tan']) for(let i = 0; i < 5; i++){ const a = M.tglAnswer(fn, i), d = M.TGL_V[i][0];
  const want = fn === 'sin' ? Math.sin(rad(d)) : fn === 'cos' ? Math.cos(rad(d)) : d === 90 ? null : Math.tan(rad(d));
  if(want === null ? a !== null : !close(num(a), want, 1e-12)) E('spørsmål', `${fn} ${d}° gir svaret ${a}`); n++; }
for(let k = 0; k < 300; k++){ M.tglNewQ(); const q = M.TG.lq, right = M.tglAnswer(q.fn, q.i);
  if(q.opts.length !== 4 || new Set(q.opts.map(String)).size !== 4) { E('spørsmål', 'skal ha fire ulike svar'); break; }
  if(q.opts.filter(o => o === right).length !== 1) { E('spørsmål', 'riktig svar skal stå nøyaktig én gang'); break; }
  if(q.fn !== 'tan' && q.opts.includes(null)) { E('spørsmål', '«ikke definert» skal bare være et svaralternativ for tangens'); break; }
  if(q.opts.some(o => o !== null && !Number.isFinite(num(o)))) { E('spørsmål', 'ugyldig svar'); break; } }
n++;
// 4) tekstene, alle steg tegnes på begge språk
if(M.TGL_TXT.length !== 6) E('steg', 'skal være 6 steg');
const kx = (m, w) => { try{ katex.renderToString(m.replace(/\{,\}/g, '.'), { throwOnError: true, output: 'mathml' }); n++; }catch(e){ E(w, 'KaTeX: ' + e.message.slice(0, 80)); } };
const mathOf = s => String(s).split('$').filter((_, i) => i % 2);
M.TGL_TXT.forEach((st, i) => ['t', 'p', 'f'].forEach(k => [0, 1].forEach(l => { const s = st[k][l], w = `steg ${i + 1} ${k} ${l ? 'en' : 'nb'}`;
  if(typeof s !== 'string' || (k !== 'f' && !s.trim()) || (k === 'f' && i < 5 && !s.trim())) E(w, 'mangler tekst');
  if((String(s).split('$').length - 1) % 2) E(w, 'ubalansert $');
  if(l && /[æøåÆØÅ«»]/.test(String(s).split('$').filter((_, j) => j % 2 === 0).join(''))) E(w, 'norske tegn i engelsk');
  mathOf(s).forEach(m => kx(m, w)); })));
M.TGL_V.forEach(v => v.slice(1).forEach(x => x && kx(x, 'verdi ' + v[0])));
M.TGL_TAN.forEach((x, i) => x && kx(x, 'tan ' + M.TGL_V[i][0]));
for(const lang of ['nb', 'en']){ M.setLang(lang); for(let s = 1; s <= 6; s++){ M.TG.ls = s; M.TG.lsel = 2; M.TG.v = 135; let r;
  try{ r = M.tglLearn(); }catch(e){ E(`steg ${s} ${lang}`, 'kunne ikke tegnes: ' + e.message); continue; }
  if(!r.svg || !/^<|\s/.test(r.svg) || !r.vb || !r.read) E(`steg ${s} ${lang}`, 'mangler figur, utsnitt eller tekst');
  if(/NaN|undefined|Infinity/.test(r.svg + r.read)) E(`steg ${s} ${lang}`, 'ugyldig verdi i figuren eller teksten');
  if(s === 5){ M.TG.lsel = 4; const t = M.tglLearn(); if(!/ikke definert|not defined/.test(t.read)) E(`steg 5 ${lang}`, 'tan 90° må vises som ikke definert'); if(/tan 90\^\\circ = \\dfrac\{1\}\{0\} = [\d]/.test(t.read)) E('steg 5', 'tan 90° vises som tall'); } } }
console.log(`steg for steg (sin, cos, tan): ${n} kontroller, feil: ${errs.length}`);
errs.slice(0, 30).forEach(x => console.log(' - ' + x));
process.exit(errs.length ? 1 : 0);
