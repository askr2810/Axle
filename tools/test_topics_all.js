// Kjører tools/test_topics.js for alle top_*.js (brukes av npm test).
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const ROOT = path.join(__dirname, '..'); let bad = 0, n = 0;
for (const f of fs.readdirSync(ROOT).filter(f => /^top_.*\.js$/.test(f)).sort()) {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'test_topics.js'), f], { cwd: ROOT, encoding: 'utf8' });
  n++; if (r.status !== 0) { bad++; console.log(r.stdout.split('\n').filter(l => /FEIL| - |IKKE/.test(l)).slice(0, 30).join('\n')); }
}
console.log(`emnesider: ${n} filer, ${bad} med feil`); process.exit(bad ? 1 : 0);
