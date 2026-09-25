// Kjører tools/test_topics.js for alle top_*.js (brukes av npm test).
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'); let bad = 0, n = 0;
for (const f of fs.readdirSync(ROOT).filter(f => /^top_.*\.js$/.test(f)).sort()) {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'test_topics.js'), f], { cwd: ROOT, encoding: 'utf8' });
  n++; if (r.status !== 0) { bad++; console.log(r.stdout.split('\n').filter(l => /FEIL| - |IKKE/.test(l)).slice(0, 30).join('\n')); }
}
// id-er må være unike innen hvert fag, også på tvers av filene
{ const files = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js',
    ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort(), 'topics.js', ...fs.readdirSync(ROOT).filter(f => /^top_.*\.js$/.test(f)).sort()];
  global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
  const tmp = require('os').tmpdir() + '/tpa_' + process.pid + '.js';
  fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES,TOPIC_DB};');
  const M = require(tmp); fs.unlinkSync(tmp); let tot = 0;
  for (const [code, units] of Object.entries(M.TOPIC_DB)) { const ids = (units || []).flat().filter(Boolean).map(t => t.id); tot += ids.length;
    const d = ids.filter((x, i) => ids.indexOf(x) !== i); if (d.length) { bad++; console.log(code + ': id brukt flere ganger: ' + [...new Set(d)].join(', ')); } }
  const empty = M.COURSES.flatMap(c => c.units.map((_, u) => ((M.TOPIC_DB[c.code] || [])[u] || []).length ? null : c.code + ':' + u)).filter(Boolean);
  console.log(`emnesider totalt: ${tot}, enheter uten emner: ${empty.length}${empty.length ? ' (' + empty.join(', ') + ')' : ''}`); }
console.log(`emnesider: ${n} filer, ${bad} med feil`); process.exit(bad ? 1 : 0);
