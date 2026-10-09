// Skiltene til førerkort: hvert skilt i FK_SIGN_INFO tegnes, har offisielt skiltnummer (FK_SIGN_NR), og skilt sporet fra
// de offisielle tegningene (FK_TRACE.sign) har kildefila tools/sign_refs/official/<nr>.svg med samme nummer.
// Fargene skal være de offisielle (rød #c4122f, gul #ffd500, blå #003d82). Bruk: node tools/test_signs.js
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
global.T = (a, b) => a; global.LANG = 'nb'; global.FIGS = {}; global.fgT = () => ''; global.fgAr = () => ''; global.esc = s => String(s);
const src = ['drive_signs_ref.js', 'drive_signs.js', 'drive_signs_more.js'].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
const M = new Function(src + ';return { FK_SIGNS, FK_SIGN_INFO, FK_SIGN_NR, FK_TRACE, FK_RED, FK_BLUE, FK_YEL };')();
const py = fs.readFileSync(path.join(ROOT, 'tools', 'trace_signs.py'), 'utf8');
const OFFICIAL = Object.fromEntries([...py.match(/OFFICIAL = \{([\s\S]*?)\n\}/)[1].matchAll(/"([a-z_0-9]+)": "([0-9.]+)"/g)].map(m => [m[1], m[2]]));
const errs = []; const E = m => errs.push(m);
if (M.FK_RED.toLowerCase() !== '#c4122f' || M.FK_BLUE.toLowerCase() !== '#003d82' || M.FK_YEL.toLowerCase() !== '#ffd500') E('fargene er ikke de offisielle');
for (const [name, group] of M.FK_SIGN_INFO) {
  const f = M.FK_SIGNS[name]; if (!f) { E(`${name}: mangler tegning`); continue; }
  let svg; try { svg = f(); } catch (e) { E(`${name}: kastet ${e.message}`); continue; }
  if (!svg || /undefined|NaN/.test(svg)) E(`${name}: ugyldig SVG`);
  if (['vik', 'fare', 'forbud', 'pabud', 'oppl'].includes(group) && !M.FK_SIGN_NR[name]) E(`${name}: mangler skiltnummer`);
}
for (const [name, nr] of Object.entries(OFFICIAL)) {
  if (M.FK_SIGN_NR[name] !== nr) E(`${name}: sporet fra ${nr}, men FK_SIGN_NR sier ${M.FK_SIGN_NR[name]}`);
  if (!fs.existsSync(path.join(ROOT, 'tools', 'sign_refs', 'official', nr + '.svg'))) E(`${name}: kildefila ${nr}.svg mangler`);
  if (!M.FK_TRACE.sign[name]) E(`${name}: ikke sporet (kjør tools/trace_signs.py)`);
}
// referansebildene for de første skiltene har nummeret først i filnavnet
for (const f of fs.readdirSync(path.join(ROOT, 'tools', 'sign_refs')).filter(f => /^\d/.test(f))) {
  const nr = f.match(/^([\d.]+?)_/)[1], hit = Object.entries(M.FK_SIGN_NR).filter(([, v]) => v === nr);
  if (!hit.length) E(`referansebildet ${f}: nummer ${nr} finnes ikke i FK_SIGN_NR`);
}
console.log(`skilt: ${M.FK_SIGN_INFO.length}, med skiltnummer: ${Object.keys(M.FK_SIGN_NR).length}, sporet fra offisielle tegninger: ${Object.keys(OFFICIAL).length}, feil: ${errs.length}`);
errs.forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
