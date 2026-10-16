// Stasjonen «Steg for steg» i enhetssirkelen (trig.js, oppgave 38): sinus, cosinus og tangens for 0°–90°.
// Kontrollerer uavhengig av teksten: verdiene mot Math.sin/cos/tan, huskeregelen (√k/2), at cos er sin baklengs,
// at tan 90° ikke er definert (og ikke vises som tall), radianene, tabellen som bygges opp i steg 1 (rekkefølgen, én ting
// om gangen, hvert mellomsteg regnet ut på nytt), grafpunktene i steg 3 (periode 2π, toppunkter, cos v = sin(v + π/2),
// sinus forskjøvet π/2 = cosinus), spørsmålene i steg 5, og at alle tekster finnes på norsk og engelsk og lar seg tegne med KaTeX.
// Bruk: node tools/test_trig_learn.js
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..'), katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
const learn = fs.readFileSync(path.join(ROOT, 'learn.js'), 'utf8'), mcSrc = learn.slice(learn.indexOf('// ---------- farger i formler'), learn.indexOf('// ---------- teori ----------'));
const stub = 'var LANG = "nb"; const T = (a, b) => LANG === "en" ? b : a; const esc = s => String(s); const tex = s => s; const rich = s => s; const nf = (x, d = 2) => String(+(+x).toFixed(d)); const mf = nf;' +
  'const UI = { nb: {}, en: {} }; const S = {}; const shuffle = a => a.slice().sort(() => Math.random() - 0.5);\n';
const f = path.join(os.tmpdir(), 'axle_tgl_' + process.pid + '.js');
fs.writeFileSync(f, mcSrc + stub + fs.readFileSync(path.join(ROOT, 'trig.js'), 'utf8') + '\n;module.exports={TGL_V,TGL_TAN,TGL_TXT,TGL_POOL,TG,TG_GX,TG_GW,TG_GR,TG_CY,tglCurve,tglX,tglY,tglAnswer,tglNewQ,tglLearn,tglFrames,tglBigTable,tglRef,tglBuildHTML,setLang:l=>{LANG=l}};');
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
// 2) grafene i steg 3
const sin = M.tglCurve('sin'), cos = M.tglCurve('cos');
if(sin[0][0] !== 0 || sin[sin.length - 1][0] !== 360) E('graf', 'grafene skal gå fra 0 til 2π (360°)');
const Y = y => M.TG_CY - y * M.TG_GR;
for(const [d, x, y] of sin){ if(!close(x, M.TG_GX + d * M.TG_GW / 360) || !close(y, Y(Math.sin(rad(d))), 1e-9)) { E('sinusgrafen', `feil punkt ved ${d}°`); break; } }
for(const [d, , y] of cos){ if(!close(y, Y(Math.cos(rad(d))), 1e-9)) { E('cosinusgrafen', `feil punkt ved ${d}°`); break; }
  if(!close(Math.cos(rad(d)), Math.sin(rad(d + 90)), 1e-12)) E('fase', `cos ${d}° ≠ sin(${d}° + 90°)`); }
n += sin.length + cos.length;
const shifted = M.tglCurve('sin', 0, 360, 2, 90);
shifted.forEach((p, k) => { if(!close(p[2], cos[k][2], 1e-9)) E('forskyvning', `sin(v + π/2) ≠ cos v ved ${p[0]}°`); }); n++;
const top = pts => pts.reduce((b, p) => p[2] < b[2] - 1e-9 ? p : b)[0]; // minst y = høyest i SVG
if(top(cos) !== 0) E('graf', 'toppen til cosinus skal være ved 0'); if(top(sin) !== 90) E('graf', 'toppen til sinus skal være ved π/2 (90°)');
if(!close(cos[0][2], Y(1)) || !close(sin[0][2], Y(0))) E('graf', 'ved v = 0 skal cos starte på 1 og sin på 0');
if(!close(cos[cos.length - 1][2], cos[0][2]) || !close(sin[sin.length - 1][2], sin[0][2], 1e-9)) E('graf', 'perioden er ikke 2π (grafene ender ikke der de startet)');
if(!close(M.tglX(90) - M.tglX(0), M.TG_GW / 4)) E('graf', 'pila for forskyvningen skal være en kvart periode (π/2)');
n += 5;
// 3) spørsmålene i steg 5
for(const fn of ['sin', 'cos', 'tan']) for(let i = 0; i < 5; i++){ const a = M.tglAnswer(fn, i), d = M.TGL_V[i][0];
  const want = fn === 'sin' ? Math.sin(rad(d)) : fn === 'cos' ? Math.cos(rad(d)) : d === 90 ? null : Math.tan(rad(d));
  if(want === null ? a !== null : !close(num(a), want, 1e-12)) E('spørsmål', `${fn} ${d}° gir svaret ${a}`); n++; }
for(let k = 0; k < 300; k++){ M.tglNewQ(); const q = M.TG.lq, right = M.tglAnswer(q.fn, q.i);
  if(q.opts.length !== 4 || new Set(q.opts.map(String)).size !== 4) { E('spørsmål', 'skal ha fire ulike svar'); break; }
  if(q.opts.filter(o => o === right).length !== 1) { E('spørsmål', 'riktig svar skal stå nøyaktig én gang'); break; }
  if(q.fn !== 'tan' && q.opts.includes(null)) { E('spørsmål', '«ikke definert» skal bare være et svaralternativ for tangens'); break; }
  if(q.opts.some(o => o !== null && !Number.isFinite(num(o)))) { E('spørsmål', 'ugyldig svar'); break; } }
n++;
// 4) tabellen bygges opp i steg 1
// Leser LaTeX fra rutene og utregningene: \dfrac/\tfrac/\frac, \sqrt, \pi, \cdot, ganging ved siden av hverandre; \square = tom plass (NaN)
function ev(t){ const s = String(t).replace(/\\textcolor\{#[0-9a-fA-F]{6}\}/g, '').replace(/\\,|\\left|\\right|\s+/g, ''); let i = 0;
  const grp = () => { if(s[i] === '{'){ i++; const v = term(); if(s[i] !== '}') throw new Error('mangler } i ' + t); i++; return v; } if(/\d/.test(s[i])) return +s[i++]; return atom(); };
  const atom = () => { let m;
    if((m = s.slice(i).match(/^\\[dt]?frac/))){ i += m[0].length; const a = grp(), b = grp(); return a / b; }
    if(s.startsWith('\\sqrt', i)){ i += 5; return Math.sqrt(grp()); }
    if(s.startsWith('\\pi', i)){ i += 3; return Math.PI; }
    if(s.startsWith('\\square', i)){ i += 7; return NaN; }
    if(s[i] === '{') return grp();
    if((m = s.slice(i).match(/^\d+/))){ i += m[0].length; return +m[0]; }
    throw new Error('kan ikke lese ' + t + ' ved ' + s.slice(i)); };
  const term = () => { let v = atom(); while(i < s.length && s[i] !== '}'){ if(s.startsWith('\\cdot', i)) i += 5; v *= atom(); } return v; };
  const v = term(); if(i !== s.length) throw new Error('rest i ' + t); return v; }
for(const lang of ['nb', 'en']){ M.setLang(lang); const F = M.tglFrames(), w = 'tabell ' + lang;
  const order = ['start', 'sin', 'cos', 'tan', 'rad', 'done'], ph = F.map(f => f.ph);
  if(ph[0] !== 'start' || ph[ph.length - 1] !== 'done') E(w, 'skal starte med vinklene og ende med «ferdig»');
  for(let k = 1; k < ph.length; k++) if(order.indexOf(ph[k]) < order.indexOf(ph[k - 1])) { E(w, `delene kommer i feil rekkefølge (${ph[k - 1]} før ${ph[k]})`); break; }
  const rows = ['rad', 'sin', 'cos', 'tan'];
  if(rows.some(r => F[0].st[r].some(x => x !== ''))) E(w, 'første bilde skal ha tom tabell utenom vinklene');
  const sinF = F.filter(f => f.ph === 'sin');
  // brøkstrek og 2 i alle, så rottegn i alle, så 0..4 ett og ett, så forenkle ett og ett
  if(!sinF[0] || sinF[0].st.sin.some(x => x !== '\\dfrac{\\square}{2}')) E(w, 'første sinustrinn: brøkstrek med 2 i nevneren i alle fem rutene');
  if(!sinF[1] || sinF[1].st.sin.some(x => x !== '\\dfrac{\\sqrt{\\square}}{2}')) E(w, 'andre sinustrinn: rottegn i alle fem rutene');
  for(let k = 0; k < 5; k++){ const f = sinF[2 + k]; if(!f || f.st.sin[k] !== `\\dfrac{\\sqrt{${k}}}{2}` || f.hi.length !== 1 || f.hi[0][1] !== k) E(w, `trinn ${3 + k}: ${k} under roten ved ${M.TGL_V[k][0]}°`);
    else if(!close(ev(f.st.sin[k]), Math.sin(rad(M.TGL_V[k][0])))) E(w, `√${k}/2 ≠ sin ${M.TGL_V[k][0]}°`);
    const g = sinF[7 + k]; if(!g || g.hi[0][1] !== k) { E(w, `forenkling ${k} mangler`); continue; }
    const last = g.calc.split('=').pop().replace(/\\approx.*/, ''), first = g.calc.split(/=|\\approx/)[0];
    if(!close(ev(g.st.sin[k]), Math.sin(rad(M.TGL_V[k][0])), 1e-12) || !close(ev(first), ev(g.st.sin[k]), 1e-12) || !close(ev(last), ev(g.st.sin[k]), 1e-12)) E(w, `forenklingen ved ${M.TGL_V[k][0]}° er feil: ${g.calc}`);
    n += 2; }
  if(sinF.length !== 12) E(w, `sinus skal ha 12 trinn (2 + 5 + 5), har ${sinF.length}`);
  // cos: én og én, hentet fra sinus i motsatt ende
  const cosF = F.filter(f => f.ph === 'cos' && f.hi.length);
  if(cosF.length !== 5) E(w, 'cosinus skal fylles ut én rute om gangen');
  cosF.forEach((f, i) => { if(f.hi[0][1] !== i || f.src[0][0] !== 'sin' || f.src[0][1] !== 4 - i) E(w, `cos ${M.TGL_V[i][0]}° skal hentes fra sin ${M.TGL_V[4 - i][0]}°`);
    if(!close(ev(f.st.cos[i]), Math.cos(rad(M.TGL_V[i][0])), 1e-12)) E(w, `cos ${M.TGL_V[i][0]}° er feil i tabellen`); n++; });
  // tan: én vinkel om gangen, først sin/cos, så forenklet, aldri et tall ved 90°
  const tanF = F.filter(f => f.ph === 'tan' && f.hi.length === 1);
  for(let i = 0; i < 5; i++){ const fs = tanF.filter(f => f.hi[0][1] === i), d = M.TGL_V[i][0];
    if(fs.length < 2) { E(w, `tan ${d}° skal ha minst to trinn`); continue; }
    if(!fs[0].src.some(([r, j]) => r === 'sin' && j === i) || !fs[0].src.some(([r, j]) => r === 'cos' && j === i)) E(w, `tan ${d}°: første trinn skal vise at det er sin/cos`);
    const q = fs[0].st.tan[i], sv = Math.sin(rad(d)), cv = Math.cos(rad(d));
    if(d === 90){ if(!/\\dfrac\{1\}\{0\}/.test(q)) E(w, 'tan 90° skal først vise 1/0'); if(fs[fs.length - 1].st.tan[i] !== null) E(w, 'tan 90° skal ende som ikke definert');
      if(!/ikke definert|not defined/.test(fs[fs.length - 1].calc)) E(w, 'utregningen av tan 90° skal si ikke definert'); }
    else { if(!close(ev(q), sv / cv, 1e-12)) E(w, `tan ${d}°: ${q} er ikke sin/cos`);
      fs.forEach(f => { const v = f.st.tan[i]; if(!close(ev(v), Math.tan(rad(d)), 1e-12)) E(w, `tan ${d}°: mellomsteget ${v} har feil verdi`);
        f.calc.split('=').slice(f === fs[0] ? 2 : 0).forEach(part => { if(!close(ev(part), Math.tan(rad(d)), 1e-12)) E(w, `tan ${d}°: ledd i utregningen har feil verdi: ${part}`); }); n++; });
      if(ev(fs[fs.length - 1].st.tan[i]) !== ev(M.TGL_V[i][5].replace(/\\tfrac/g, '\\dfrac'))) E(w, `tan ${d}° ender ikke på tabellverdien`); } }
  if(F.some(f => f.st.tan[4] !== '' && f.st.tan[4] !== null && !/\{0\}/.test(f.st.tan[4]))) E(w, 'tan 90° vises som et tall i et bilde');
  // radianer: 180° = π, én og én
  const radF = F.filter(f => f.ph === 'rad' && f.hi.length === 1);
  if(radF.length !== 5) E(w, 'radianene skal fylles ut én og én');
  radF.forEach((f, i) => { const d = M.TGL_V[i][0]; if(!close(ev(f.st.rad[i]), rad(d))) E(w, `${d}° i radianer er feil`); f.calc.split('=').slice(1).forEach(part => { if(!close(ev(part.replace(/\^\\circ/, '')), rad(d))) E(w, `${d}°: utregningen ${part} er feil`); }); n++; });
  // hvert bilde endrer bare rutene som er markert
  for(let k = 1; k < F.length; k++){ const a = F[k - 1].st, b = F[k].st;
    for(const r of rows) for(let i = 0; i < 5; i++) if(a[r][i] !== b[r][i] && !F[k].hi.some(([x, j]) => x === r && j === i)) E(w, `bilde ${k + 1}: ${r} ${i} endres uten å være markert`); }
  // ferdig tabell = verdiene
  const L = F[F.length - 1].st;
  rows.forEach(r => L[r].forEach((x, i) => { const want = r === 'rad' ? M.TGL_V[i][1] : r === 'sin' ? M.TGL_V[i][3] : r === 'cos' ? M.TGL_V[i][4] : M.TGL_V[i][5];
    if(want === null ? x !== null : !close(ev(x), ev(want), 1e-12)) E(w, `ferdig tabell: ${r} ${M.TGL_V[i][0]}° er ${x}`); n++; }));
  // KaTeX og tekst for hvert bilde
  F.forEach((f, k) => { const ww = `${w} bilde ${k + 1}`; [f.txt[0], f.txt[1]].forEach((t, l) => { if(!t || !t.trim()) E(ww, 'mangler tekst'); if((t.split('$').length - 1) % 2) E(ww, 'ubalansert $');
      if(l && /[æøåÆØÅ«»]/.test(t.split('$').filter((_, j) => j % 2 === 0).join(''))) E(ww, 'norske tegn i engelsk');
      t.split('$').filter((_, j) => j % 2).forEach(m => { try{ katex.renderToString(m, { throwOnError: true, output: 'mathml' }); }catch(e){ E(ww, 'KaTeX: ' + e.message.slice(0, 80)); } }); });
    [f.calc, ...rows.flatMap(r => f.st[r])].filter(Boolean).forEach(m => { try{ katex.renderToString(m.replace(/\{,\}/g, '.'), { throwOnError: true, output: 'mathml' }); n++; }catch(e){ E(ww, 'KaTeX: ' + e.message.slice(0, 80)); } });
    if(f.ph !== 'done' && f.ph !== 'cos' && !f.hi.length) E(ww, 'ingenting er markert'); });
  for(let b = 0; b < F.length; b++){ M.TG.lb = b; const h = M.tglBuildHTML(); if(/NaN|undefined|Infinity/.test(h)) { E(w, `bilde ${b + 1} har ugyldig verdi`); break; } }
  const ref = M.tglRef(); if(ref.svg || !/ikke definert|not defined/.test(ref.read) || /NaN|undefined/.test(ref.read)) E(w, 'stasjonen Tabell'); n++; }
M.setLang('nb'); M.TG.lb = 0;
// 5) tekstene, alle steg tegnes på begge språk
if(M.TGL_TXT.length !== 5) E('steg', 'skal være 5 steg');
const kx = (m, w) => { try{ katex.renderToString(m.replace(/\{,\}/g, '.'), { throwOnError: true, output: 'mathml' }); n++; }catch(e){ E(w, 'KaTeX: ' + e.message.slice(0, 80)); } };
const mathOf = s => String(s).split('$').filter((_, i) => i % 2);
M.TGL_TXT.forEach((st, i) => ['t', 'p', 'f'].forEach(k => [0, 1].forEach(l => { const s = st[k][l], w = `steg ${i + 1} ${k} ${l ? 'en' : 'nb'}`;
  if(typeof s !== 'string' || (k !== 'f' && !s.trim()) || (k === 'f' && i > 0 && i < 4 && !s.trim())) E(w, 'mangler tekst');
  if((String(s).split('$').length - 1) % 2) E(w, 'ubalansert $');
  if(l && /[æøåÆØÅ«»]/.test(String(s).split('$').filter((_, j) => j % 2 === 0).join(''))) E(w, 'norske tegn i engelsk');
  mathOf(s).forEach(m => kx(m, w)); })));
M.TGL_V.forEach(v => v.slice(1).forEach(x => x && kx(x, 'verdi ' + v[0])));
M.TGL_TAN.forEach((x, i) => x && kx(x, 'tan ' + M.TGL_V[i][0]));
for(const lang of ['nb', 'en']){ M.setLang(lang); for(let s = 1; s <= 5; s++){ M.TG.ls = s; M.TG.lsel = 2; M.TG.v = 135; M.TG.wsh = s === 3 ? 90 : null; let r;
  try{ r = M.tglLearn(); }catch(e){ E(`steg ${s} ${lang}`, 'kunne ikke tegnes: ' + e.message); continue; }
  if(s === 1 ? r.svg || !r.read : !r.svg || !/^<|\s/.test(r.svg) || !r.vb || !r.read) E(`steg ${s} ${lang}`, 'mangler figur, utsnitt eller tekst');
  if(s === 3 && !/\\cos/.test(r.read)) E(`steg 3 ${lang}`, 'etter forskyvningen skal det stå at sin(v + π/2) = cos v');
  if(/NaN|undefined|Infinity/.test(r.svg + r.read)) E(`steg ${s} ${lang}`, 'ugyldig verdi i figuren eller teksten');
  if(s === 4){ M.TG.lsel = 4; const t = M.tglLearn(); if(!/ikke definert|not defined/.test(t.read)) E(`steg 4 ${lang}`, 'tan 90° må vises som ikke definert'); if(/tan 90\^\\circ = \\dfrac\{1\}\{0\} = [\d]/.test(t.read)) E('steg 4', 'tan 90° vises som tall'); } } }
M.TG.wsh = null;
console.log(`steg for steg (sin, cos, tan): ${n} kontroller, feil: ${errs.length}`);
errs.slice(0, 30).forEach(x => console.log(' - ' + x));
process.exit(errs.length ? 1 : 0);
