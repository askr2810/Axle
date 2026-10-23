// AX-23: skiltbildene (DRIVE_IMG) skal vises også når førerkort-quizen startes fra Teori («Sjekk deg selv» i boka/teorisiden,
// veiledet gjennomgang og vanlige økter), ikke bare i førerkortets egen øving (drive.js). Sjekker alle enheter i FKB og FKMC,
// også de delte (SHAREUNIT). Bruk: node tools/test_drive_img.js
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const grab = (f, re, what) => { const m = rd(f).match(re); if (!m) { console.log(`fant ikke ${what} i ${f}`); process.exit(1); } return m[0]; };
const learn = rd('learn.js'), lstart = learn.indexOf('const THEORY_DB'), lend = learn.indexOf('GROUP_NAMES["Forkurs"]');
const parts = [
  'const COURSES = [], META = {}, ENQ = {}, GROUP_NAMES = {}, UNIT_EN = {}; let LANG = "nb";',
  'const shuffle = a => a.slice(); const T = (a, b) => a; const esc = s => String(s); const rich = s => String(s); const richBig = s => String(s); const t = k => k; const I = { star16: "", pencil: "" };',
  'const fkSign = (n, s) => `<svg data-sign="${n}"></svg>`;',
  learn.slice(lstart, lend),
  learn.match(/function ADDUNIT[\s\S]*?\n\}\n/)[0], learn.match(/function SHAREUNIT[\s\S]*?\n\}\n/)[0],
  rd('add_forer.js'),
  grab('app.js', /const COURSE = code =>.*\n/, 'COURSE'),
  grab('app.js', /function makeItem[\s\S]*?\n\}\n/, 'makeItem'), grab('app.js', /function toMC[\s\S]*?\n\}\n/, 'toMC'),
  grab('app.js', /function rawQ[\s\S]*?\n\}\n/, 'rawQ'), grab('app.js', /function itemFromId[\s\S]*?\n\}\n/, 'itemFromId'),
  grab('drive.js', /const isDrive = .*\n/, 'isDrive'), grab('drive.js', /function dvQ[\s\S]*?\n\}\n/, 'dvQ'),
  (rd('drive.js').match(/function dvImg\([\s\S]*?\n\}\n/) || [''])[0], (rd('drive.js').match(/const dvImgHTML = .*\n/) || [''])[0],
  'let CY;', grab('book.js', /function cyHTML[\s\S]*?\n\}\n/, 'cyHTML'),
];
const M = new Function(parts.join('\n;\n') + ';return { COURSE, COURSES, DRIVE_IMG, itemFromId, dvQ, cyHTML, setCY: x => { CY = x; } };')();
const errs = [], E = m => errs.push(m), units = new Set();
const app = rd('app.js'), guided = rd('guided.js');
if (!/dvImgHTML\(it\) : ""\}\$\{qimgHTML\(it\.qimg, "lq"\)\}<div class="prompt">/.test(app)) E('vanlig økt (renderLesson) viser ikke skiltbildet');
if (!/<div class="gd-p">\$\{[^}]*dvImgHTML\(it\)/.test(guided)) E('veiledet gjennomgang (guided.js) viser ikke skiltbildet');
let n = 0;
for (const code of ['FKB', 'FKMC']) {
  const c = M.COURSE(code);
  c.units.forEach((unit, u) => unit.qs.forEach((_, i) => {
    const want = M.dvQ(code, u + ':' + i).img; if (!want) return; n++;
    let it; try { it = M.itemFromId(c, u + '.' + i, { mc: true }); } catch (e) { E(`${code}:${u}.${i}: itemFromId kastet ${e.message}`); return; }
    if (!it || it.dimg !== want) { units.add(code + ':' + u); E(`${code}:${u}.${i}: teoriquizen mangler skiltet «${want}» (fikk ${it && it.dimg})`); return; }
    M.setCY({ key: code + ':' + u + ':nb', items: [it], sel: [null] });
    if (!M.cyHTML(code, u).includes(`data-sign="${want}"`)) { units.add(code + ':' + u); E(`${code}:${u}.${i}: «Sjekk deg selv» tegner ikke skiltet`); }
  }));
}
if (!n) E('fant ingen spørsmål med skilt');
console.log(`spørsmål med skilt: ${n}, enheter med feil: ${[...units].join(', ') || 'ingen'}, feil: ${errs.length}`);
errs.slice(0, 20).forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
