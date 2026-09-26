// Test av bevisene (proofs.js): all matte tåles av KaTeX, engelsk uten æøå, simuleringene finnes, enhetene finnes, spørsmålet har 4 unike svar.
const fs = require('fs'), path = require('path'), ROOT = path.join(__dirname, '..');
const katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
global.LANG = "nb"; const src = fs.readFileSync(path.join(ROOT, 'proofs.js'), 'utf8').replace(/^function[\s\S]*$/m, '').replace(/^const pf[\s\S]*$/m, '');
const PROOFS = new Function(src.split('\nconst pfById')[0] + '\nreturn PROOFS;')();
const simSrc = ['sims.js', 'sims2.js', 'sims3.js', 'sims4.js'].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
const simNames = new Set([...simSrc.matchAll(/^  (\w+): \{ t: /gm)].map(m => m[1]));
let bad = 0, n = 0; const fail = (...a) => { bad++; console.log(...a); };
const math = s => { const out = []; s.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => { out.push([m, true]); return ""; }).split('$').forEach((p, i) => { if(i % 2) out.push([p, false]); }); return out; };
for(const p of PROOFS){
  const texts = [...p.steps.flat(), ...p.t, ...p.sub, ...(p.q ? [...p.q.q, ...p.q.opts.flat(), ...p.q.expl] : [])];
  texts.forEach(s => { for(const [m, d] of math(s)){ n++; try{ katex.renderToString(m, { throwOnError: true, displayMode: d }); }catch(e){ fail('katex', p.id, e.message.slice(0, 90)); } } });
  [...p.steps.map(s => s[1]), p.t[1], p.sub[1], ...(p.q ? [p.q.q[1], ...p.q.opts.map(o => o[1]), p.q.expl[1]] : [])].forEach(s => { if(/[æøåÆØÅ]/.test(s.replace(/\\text\{[^}]*\}/g, ''))) fail('norsk i engelsk', p.id, s.slice(0, 60)); });
  p.steps.flat().forEach(s => [...s.matchAll(/!\[sim:(\w+)\]/g)].forEach(m => { if(!simNames.has(m[1])) fail('mangler sim', p.id, m[1]); }));
  if(p.q && new Set(p.q.opts.map(o => o[0])).size !== p.q.opts.length) fail('like svar', p.id);
}
if(new Set(PROOFS.map(p => p.id)).size !== PROOFS.length) fail('like id');
console.log(`bevis: ${PROOFS.length}, matteuttrykk: ${n}, feil: ${bad}`); process.exit(bad ? 1 : 0);
