// Læringskartene (laeringskart_data.js): fagkodene finnes, kantene peker på noder i samme kart,
// forkunnskaper ligger i samme eller et tidligere trinn, ingen sykler, og ansvarsfraskrivelsen er med.
// Bruk: node tools/test_laeringskart.js   (i npm test)
const fs = require('fs'), path = require('path'), os = require('os'); const ROOT = path.join(__dirname, '..');
const ls = re => fs.readdirSync(ROOT).filter(f => re.test(f)).sort();
const files = ['config.js', 'i18n.js', 'data.js', 'gens.js', 'gens_b.js', 'more.js', 'more2.js', 'more2_b.js', 'subjects2.js', 'subjects2_b.js', 'more3.js', ...ls(/^en_static_.*\.js$/), 'learn.js', ...ls(/^add_.*\.js$/)];
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const tmp = path.join(os.tmpdir(), 'axle_lk_' + process.pid + '.js');
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES};');
const { COURSES } = require(tmp); fs.unlinkSync(tmp);
const { LK_MAPS, LK_DISCLAIMER } = require(path.join(ROOT, 'laeringskart_data.js'));
let bad = 0; const fail = m => { bad++; console.log('FEIL: ' + m); };
if(LK_DISCLAIMER !== 'Forslag til læringsvei, ikke et offisielt studieløp. Innholdet er AI-laget og ikke kvalitetssikret av lærere.') fail('ansvarsfraskrivelsen er endret');
const js = fs.readFileSync(path.join(ROOT, 'laeringskart.js'), 'utf8'); if(!js.includes('LK_DISCLAIMER')) fail('laeringskart.js viser ikke ansvarsfraskrivelsen');
for(const [f, re, what] of [['profile.js', /\["lk", "map", "tabMaps"\]/, 'fanen «Læringskart» i hovedmenyen'], ['i18n.js', /tabMaps: "Læringskart"/, 'teksten «Læringskart» i menyen'], ['book.js', /lkChipHTML\(c\.code\)/, '«Del av»-lenken på emnesidene'], ['route.js', /k === "lk"/, 'adressen #\/laeringskart']])
  if(!re.test(fs.readFileSync(path.join(ROOT, f), 'utf8'))) fail(f + ': mangler ' + what);
const build = fs.readFileSync(path.join(ROOT, 'build.py'), 'utf8'); for(const f of ['laeringskart_data.js', 'laeringskart.js']) if(!build.includes('"' + f + '"')) fail(f + ' mangler i build.py');
const ids = new Set(); let linked = 0, soon = 0;
for(const m of LK_MAPS){
  if(!/^[a-z0-9-]+$/.test(m.id) || ids.has(m.id)) fail('ugyldig eller dobbel kart-id: ' + m.id); ids.add(m.id);
  if(!m.t || !m.intro || !m.sections.length || !m.nodes.length) fail(m.id + ': mangler tittel, ingress, trinn eller noder');
  const sec = m.sections.map(s => s.id), nid = new Map();
  for(const n of m.nodes){
    if(nid.has(n.id)) fail(`${m.id}: node-id brukt to ganger: ${n.id}`); nid.set(n.id, n);
    if(!sec.includes(n.sec)) fail(`${m.id}/${n.id}: ukjent trinn ${n.sec}`);
    if(!(m.areas || []).some(a => a.id === n.area)) fail(`${m.id}/${n.id}: ukjent fagområde ${n.area}`);
    if(!fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8').includes('.lk-a-' + n.area + '{')) fail(`${m.id}/${n.id}: fargen .lk-a-${n.area} mangler i styles.css`);
    if(!n.t || !n.why) fail(`${m.id}/${n.id}: mangler tittel eller beskrivelse`);
    if(n.code){ if(!COURSES.some(c => c.code === n.code)) fail(`${m.id}/${n.id}: faget ${n.code} finnes ikke i COURSES`); else linked++; } else soon++;
  }
  const seen = new Set();
  for(const [a, b] of m.edges){
    const A = nid.get(a), B = nid.get(b); if(!A || !B){ fail(`${m.id}: kant ${a}→${b} peker på ukjent node`); continue; }
    if(seen.has(a + '>' + b)) fail(`${m.id}: kant ${a}→${b} to ganger`); seen.add(a + '>' + b);
    if(sec.indexOf(A.sec) > sec.indexOf(B.sec)) fail(`${m.id}: ${b} ligger før forkunnskapen ${a}`);
  }
  // ingen sykler
  const st = {}; const dfs = v => { st[v] = 1; for(const [a, b] of m.edges) if(a === v){ if(st[b] === 1) fail(`${m.id}: sykel via ${b}`); else if(!st[b]) dfs(b); } st[v] = 2; };
  for(const n of m.nodes) if(!st[n.id]) dfs(n.id);
}
console.log(`læringskart: ${LK_MAPS.length} kart, ${linked} noder lenket til fag, ${soon} «kommer», ${bad} feil`);
process.exit(bad ? 1 : 0);
