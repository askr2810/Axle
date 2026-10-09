// ============================================================
//  FAGFILER: tar teori og emnesider ut av hovedpakken og skriver dem til én fil per fag (release/www/c/<KODE>.js).
//  Kjøres av build.py etter at app.bundle.js er satt sammen. Kildefilene endres ikke.
//
//  1) Innholdsfilene (fram til og med top_*.js) kjøres i node. Alle tekstene som går inn i THEORY/DEEP/DEEPT blir notert.
//  2) c/<KODE>.js = CF("KODE", { th: [teori per enhet], tp: [emner per enhet] }) – ferdig teori (med fordypning) og emnesidene.
//  3) I hovedpakken byttes de noterte teoritekstene ut med "" (finnes de fortsatt: theoryOf gir et tomt dokument, så knappene
//     står der de skal), og TOPICS(...)-kallene fjernes. Øverst legges CF_V (versjon per fagfil) og CF_IDX (en liten
//     søkeindeks: ingress og stikkord per enhet, tittel og stikkord per emne – ikke full tekst).
//  4) Selvsjekk: den strippede pakken + fagfilene skal gi nøyaktig samme THEORY_DB og TOPIC_DB som før. Ellers stopper bygget.
//
//  Bruk (fra build.py): node tools/split.js <ut-mappe>   (fillista i pakkerekkefølge på stdin som JSON)
// ============================================================
const fs = require('fs'), path = require('path'), crypto = require('crypto'), os = require('os');
const ROOT = path.join(__dirname, '..');
const acorn = require(path.join(ROOT, 'node_modules', 'acorn'));
const OUT = process.argv[2]; if(!OUT) { console.error('mangler ut-mappe'); process.exit(2); }
const FILES = JSON.parse(fs.readFileSync(0, 'utf8'));
const BUNDLE = path.join(OUT, 'app.bundle.js');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// ---------- 1) kjør innholdet og noter teoritekstene ----------
const lastTop = FILES.reduce((k, f, i) => /^top_.*\.js$/.test(f) ? i : k, -1);
if(lastTop < 0) { console.error('fant ingen top_*.js'); process.exit(2); }
const CONTENT = FILES.slice(0, lastTop + 1);
const HOOK = ';(() => { const r = globalThis.__REC; const t = THEORY; THEORY = (c, u, d) => { if(d){ r(d.nb); r(d.en); } return t(c, u, d); };' +
  ' const d1 = DEEP; DEEP = (c, ti, nb, en, k) => { r(nb); r(en); return d1(c, ti, nb, en, k); };' +
  ' const d2 = DEEPT; DEEPT = (ti, nb, en, ...x) => { r(nb); r(en); return d2(ti, nb, en, ...x); }; })();\n';
function evalContent(srcOf, extra = ''){
  global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
  const src = 'const esc = s => String(s);\n' + CONTENT.map(f => srcOf(f) + (f === 'learn.js' ? '\n' + HOOK : '')).join('\n;\n') + '\n;' + extra +
    ';module.exports = { THEORY_DB, TOPIC_DB, COURSES, META, setLang: l => { LANG = l; } };';
  const tmp = path.join(os.tmpdir(), 'axle_split_' + process.pid + '_' + Math.random().toString(36).slice(2) + '.js');
  fs.writeFileSync(tmp, src); try { delete require.cache[tmp]; return require(tmp); } finally { fs.unlinkSync(tmp); }
}
const REC = new Set(); globalThis.__REC = s => { if(typeof s === 'string' && s.length >= 80) REC.add(s); };
const M = evalContent(read);
globalThis.__REC = () => {};

// ---------- 2) fagfilene ----------
const ALLOWED = new Set(['FL', 'LANG', 'Math', 'String', 'Number', 'Array', 'Object', 'JSON', 'undefined', 'Infinity', 'NaN']);
function freeIds(fnSrc){ // identifikatorer funksjonen bruker utenfra (grovt: alt som ikke er egenskapsnavn, parametre eller lokale navn)
  const ast = acorn.parseExpressionAt(fnSrc, 0, { ecmaVersion: 'latest' }), used = new Set(), decl = new Set();
  (function walk(n, parent, key){ if(!n || typeof n.type !== 'string') return;
    if(n.type === 'Identifier'){ if(!(parent && ((parent.type === 'MemberExpression' && key === 'property' && !parent.computed) || (parent.type === 'Property' && key === 'key' && !parent.computed)))) used.add(n.name); }
    if(/Function/.test(n.type)) (n.params || []).forEach(p => { if(p.type === 'Identifier') decl.add(p.name); });
    if(n.type === 'VariableDeclarator' && n.id.type === 'Identifier') decl.add(n.id.name);
    for(const k of Object.keys(n)){ const v = n[k]; if(Array.isArray(v)) v.forEach(x => walk(x, n, k)); else if(v && typeof v.type === 'string') walk(v, n, k); } })(ast, null, null);
  return [...used].filter(x => !decl.has(x));
}
function ser(v, where){
  if(typeof v === 'function'){ const s = v.toString(), bad = freeIds(s).filter(x => !ALLOWED.has(x));
    if(bad.length) throw new Error(`${where}: funksjonen bruker ${bad.join(', ')} – legg navnet til i ALLOWED og eksporter det i cfload.js (${s.slice(0, 80)})`); return s; }
  if(Array.isArray(v)) return '[' + Array.from(v, (x, i) => x === undefined ? 'null' : ser(x, where + '[' + i + ']')).join(',') + ']';
  if(v && typeof v === 'object') return '{' + Object.keys(v).filter(k => v[k] !== undefined).map(k => JSON.stringify(k) + ':' + ser(v[k], where + '.' + k)).join(',') + '}';
  return JSON.stringify(v);
}
const codes = [...new Set([...Object.keys(M.THEORY_DB), ...Object.keys(M.TOPIC_DB)])].filter(c => M.COURSES.some(x => x.code === c)).sort();
const CDIR = path.join(OUT, 'c'); fs.rmSync(CDIR, { recursive: true, force: true }); fs.mkdirSync(CDIR, { recursive: true });
const CF_V = {}; let cBytes = 0;
for(const code of codes){
  const th = Array.from(M.THEORY_DB[code] || [], d => d || null), tp = M.TOPIC_DB[code] ? Array.from(M.TOPIC_DB[code], l => l || null) : null;
  const body = `CF(${JSON.stringify(code)},{th:${ser(th, code + '.th')},tp:${ser(tp, code + '.tp')}});\n`;
  fs.writeFileSync(path.join(CDIR, code + '.js'), body); cBytes += Buffer.byteLength(body);
  CF_V[code] = crypto.createHash('sha1').update(body).digest('hex').slice(0, 10);
}

// ---------- søkeindeks (liten): ingress og stikkord per enhet, tittel og stikkord per emne ----------
const clean = s => String(s || '').replace(/```[\s\S]*?```/g, ' ').replace(/\$\$[^$]*\$\$/g, ' ').replace(/\$[^$]*\$/g, ' ').replace(/\*\*|`|\\/g, '').replace(/!\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
const lead = src => { const p = String(src || '').split(/\n\s*\n/).map(x => x.replace(/^##.*\n?/, '').trim()).find(x => x && !/^(#|>|-|!\[|\d+[.)]|\$\$|```)/.test(x)); const s = clean(p); return s.length > 90 ? s.slice(0, 88).replace(/\s+\S*$/, '') + ' …' : s; };
const kw = (src, extra = [], max = 200) => { const out = [], seen = new Set(), add = w => { w = clean(w).replace(/[:.,;]+$/, ''); const k = w.toLowerCase(); if(w && w.length < 48 && !seen.has(k)){ seen.add(k); out.push(w); } };
  extra.forEach(add); for(const l of String(src || '').split('\n')){ const h = l.match(/^#{2,3}\s+(.+)/); if(h) add(h[1]); } (String(src || '').match(/\*\*([^*]{2,40})\*\*/g) || []).forEach(m => add(m.slice(2, -2)));
  const j = out.join(' · '); return j.length > max ? j.slice(0, max).replace(/ · [^·]*$/, '') : j; };
const IDX = { th: {}, tp: {} };
for(const code of codes){
  const th = M.THEORY_DB[code] || [], tps = M.TOPIC_DB[code] || [];
  th.forEach((d, u) => { if(d) (IDX.th[code] ||= {})[u] = [lead(d.nb), kw(d.nb), lead(d.en || d.nb), kw(d.en || d.nb)]; });
  if(tps.some(l => l && l.length)) IDX.tp[code] = Array.from(tps, l => l ? l.map(tp => { const nb = tp.nb || {}, en = tp.en || nb;
    return [tp.id, nb.t || '', en.t || nb.t || '', kw('', (nb.legend || []).map(x => x[1]), 90), kw('', (en.legend || []).map(x => x[1]), 90)]; }) : null);
}

// ---------- 3) strip hovedpakken ----------
const full = fs.readFileSync(BUNDLE, 'utf8');
const ast = acorn.parse(full, { ecmaVersion: 'latest', sourceType: 'script' });
const edits = []; let nTopics = 0, nTheory = 0; const found = new Set();
(function walk(n, parent){ if(!n || typeof n.type !== 'string') return;
  if(n.type === 'ExpressionStatement' && n.expression.type === 'CallExpression' && n.expression.callee.type === 'Identifier' && n.expression.callee.name === 'TOPICS'){ edits.push([n.start, n.end, ';']); nTopics++; return; }
  // Teorikallene: tekstargumentene byttes ut der kallet står, uansett hvordan teksten er skrevet (md`…`, ${…}, +)
  const ARGS = { THEORY: [2], DEEP: [2, 3], DEEPT: [1, 2] };
  if(n.type === 'CallExpression' && n.callee.type === 'Identifier' && ARGS[n.callee.name]){
    for(const i of ARGS[n.callee.name]){ const a = n.arguments[i]; if(!a || a.type === 'Identifier' || a.type === 'SpreadElement') continue;
      edits.push([a.start, a.end, n.callee.name === 'THEORY' ? '{ nb: "", en: "" }' : '""']); nTheory++; }
    for(const [k, a] of n.arguments.entries()) if(!(ARGS[n.callee.name].includes(k))) walk(a, n);
    return; }
  let val = null;
  if(n.type === 'Literal' && typeof n.value === 'string') val = [n.value];
  else if(n.type === 'TemplateLiteral' && !n.expressions.length && !(parent && parent.type === 'TaggedTemplateExpression')) val = [n.quasis[0].value.cooked];
  else if(n.type === 'TaggedTemplateExpression' && !n.quasi.expressions.length) val = [n.quasi.quasis[0].value.raw, n.quasi.quasis[0].value.cooked];
  if(val){ const hit = val.find(v => v != null && REC.has(v)); if(hit){ edits.push([n.start, n.end, '""']); nTheory++; found.add(hit); return; } }
  for(const k of Object.keys(n)){ const v = n[k]; if(Array.isArray(v)) v.forEach(x => walk(x, n)); else if(v && typeof v.type === 'string') walk(v, n); } })(ast, null);
edits.sort((a, b) => b[0] - a[0]);
let out = full; for(const [s, e, r] of edits) out = out.slice(0, s) + r + out.slice(e);
out = `const CF_V = ${JSON.stringify(CF_V)}, CF_IDX = ${JSON.stringify(IDX)}; // fagfiler (tools/split.js)\n` + out;

// ---------- 4) selvsjekk ----------
const parts = {}; out.split(/^\/\/ ===== (\S+) =====$/m).forEach((x, i, a) => { if(i % 2) parts[x] = a[i + 1]; });
const missing = CONTENT.filter(f => parts[f] == null); if(missing.length) { console.error('fant ikke i pakken: ' + missing.join(', ')); process.exit(1); }
const loader = 'const CF = (code, d) => { d.th.forEach((x, u) => { if(x) (THEORY_DB[code] ||= [])[u] = x; }); if(d.tp) TOPIC_DB[code] = d.tp; };\n' + codes.map(c => fs.readFileSync(path.join(CDIR, c + '.js'), 'utf8')).join('\n');
const S2 = evalContent(f => parts[f], loader);
const snap = X => JSON.stringify({ th: X.THEORY_DB, tp: X.TOPIC_DB }, (k, v) => typeof v === 'function' ? v.toString() : v);
{
  const a = JSON.parse(snap(M)), b = JSON.parse(snap(S2)), diffs = []; // innholdet må være likt (rekkefølgen på fagene spiller ingen rolle)
  (function cmp(x, y, p){ if(diffs.length > 8) return; if(JSON.stringify(x) === JSON.stringify(y)) return;
    if(x && y && typeof x === 'object' && typeof y === 'object'){ for(const k of new Set([...Object.keys(x), ...Object.keys(y)])) cmp(x[k], y[k], p + '.' + k); return; }
    diffs.push(p + ': ' + String(JSON.stringify(x)).slice(0, 90) + '  ≠  ' + String(JSON.stringify(y)).slice(0, 90)); })(a, b, '');
  if(diffs.length){ console.error('SELVSJEKK FEILET: teori/emner etter splitting er ikke lik originalen\n  ' + diffs.join('\n  ')); process.exit(1); } }
fs.writeFileSync(BUNDLE, out);
const kb = n => Math.round(n / 1024) + ' kB';
if(process.env.SPLIT_DEBUG){ const left = [...REC].filter(x => !found.has(x) && out.includes(x.slice(20, 80))); console.log('ikke funnet:', kb(left.reduce((a, x) => a + x.length, 0))); left.slice(0, 5).forEach(x => console.log('   «' + x.slice(0, 100).replace(/\n/g, ' ') + '»')); }
console.log(`  fagfiler: ${codes.length} i c/ (${kb(cBytes)}), teoritekster tatt ut: ${nTheory} (${found.size}/${REC.size} unike), TOPICS-kall: ${nTopics}, pakken ${kb(Buffer.byteLength(full))} → ${kb(Buffer.byteLength(out))}, indeks ${kb(JSON.stringify(IDX).length)}`);
