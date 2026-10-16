// Fargede formler og utledninger (learn.js: MC, mcA/mcB/mcC; emnefeltet steps i top_*.js, vist av book.js og seo.js).
// Sjekker uavhengig av teksten:
//  1) Hvert mellomsteg: alle ledd i en kjede «… = … = …» har samme verdi. Regnes ut med tilfeldige tall for bokstavene
//     (identitet), eller med verdiene i gruppens chk (likninger og fysikkformler: { x: 10 } eller { R: 4, I: 3, U: 12, P: 36 }).
//  2) Det samme for eksempler, tips og formler på sider med farger, og for fargede $$-linjer i teoritekstene.
//  3) Norsk og engelsk: samme formler (LaTeX) i hvert trinn, samme antall trinn og samme farger i formlene.
//  4) Fargene: bare de tre MC-fargene brukes, klassen mc-a/b/c legges på, og kontrasten er minst 4,5:1 i lyst og mørkt tema.
// Bruk: node tools/test_mc.js
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..');
const katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));
const order = ['config.js', 'i18n.js', 'data.js', 'gens.js', 'gens_b.js', 'more.js', 'more2.js', 'more2_b.js', 'subjects2.js', 'subjects2_b.js', 'more3.js'];
const ls = re => fs.readdirSync(ROOT).filter(f => re.test(f)).sort();
const files = [...order, ...ls(/^en_static_.*\.js$/), 'learn.js', ...ls(/^add_.*\.js$/), 'figlib.js', 'topics.js', ...ls(/^top_.*\.js$/)];
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const tmp = path.join(os.tmpdir(), 'axle_mc_' + process.pid + '.js');
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={TOPIC_DB,THEORY_DB,MC,mcA,mcClass,COURSES,ENQ,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const errs = []; let nChecks = 0, nTopics = 0, nDocs = 0, nQs = 0; const E = (w, m) => errs.push(w + ': ' + m);
const HEX = Object.values(M.MC).map(h => h.toLowerCase());
const hasMC = s => HEX.some(h => String(s).toLowerCase().includes(h));

// ---------- liten LaTeX → tall-tolker (bare det som brukes i utledningene) ----------
function group(s, i){ // s[i] === '{' → [innhold, indeks etter }]
  let d = 0; for(let j = i; j < s.length; j++){ if(s[j] === '{') d++; else if(s[j] === '}'){ d--; if(!d) return [s.slice(i + 1, j), j + 1]; } }
  throw new Error('ubalanserte {}');
}
function arg(s, i){ while(s[i] === ' ') i++; if(s[i] === '{') return group(s, i); return [s[i], i + 1]; }
const unAlign = s => String(s).replace(/\\begin\{aligned\}|\\end\{aligned\}|&/g, '').replace(/\\\\/g, ' '); // flere linjer (aligned) → én
function toJS(src){
  let s = unAlign(src).replace(/\{,\}/g, '.').replace(/\\left|\\right/g, '').replace(/\\[,;!: ]|\\q?quad/g, ' ').replace(/−/g, '-');
  let out = '', i = 0;
  while(i < s.length){
    const rest = s.slice(i), cmd = rest.match(/^\\([a-zA-Z]+)/);
    if(cmd){
      const c = cmd[1]; i += cmd[0].length;
      if(c === 'textcolor'){ const [, j] = group(s, i); const [x, k] = arg(s, j); const y = toJS(x).trim(); out += /^[-+]/.test(y) ? ' ' + y + ' ' : '(' + y + ')'; i = k; } // «−2x» i farge er et ledd med fortegn
      else if(c === 'underbrace' || c === 'overbrace'){ const [x, j] = arg(s, i); let k = j; while(s[k] === ' ') k++; if(s[k] === '_' || s[k] === '^'){ const [, k2] = arg(s, k + 1); k = k2; } const y = toJS(x).trim(); out += /^[-+]/.test(y) ? ' ' + y + ' ' : '(' + y + ')'; i = k; }
      else if(/^[dt]?frac$/.test(c)){ const [a, j] = arg(s, i); const [b, k] = arg(s, j); out += '((' + toJS(a) + ')/(' + toJS(b) + '))'; i = k; }
      else if(c === 'sqrt'){ const [a, j] = arg(s, i); out += 'Math.sqrt(' + toJS(a) + ')'; i = j; }
      else if(c === 'cdot' || c === 'times') out += '*';
      else if(c === 'div') out += '/';
      else if(c === 'pi') out += '(Math.PI)';
      else if(c === 'text' || c === 'mathrm'){ const [x, j] = arg(s, i); const w = x.trim().toLowerCase().replace(/[^a-zæøå]/g, '').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'aa'); if(w) out += ' T_' + w + ' '; i = j; } // \text{gammel} → én størrelse
      else if(c === 'pm') out += '\u00b1';
      else throw new Error('ukjent kommando \\' + c);
      continue;
    }
    const ch = s[i];
    if(ch === '^'){ const [x, j] = arg(s, i + 1); out += '**(' + toJS(x) + ')'; i = j; continue; }
    if(ch === '_'){ const [x, j] = arg(s, i + 1); out += '_' + x.replace(/\W/g, '') + ' '; i = j; continue; } // v_0 → v_0 (ett navn)
    if(ch === '{'){ const [x, j] = group(s, i); const y = toJS(x).trim(); if(y) out += /^[-+]/.test(y) ? ' ' + y + ' ' : '(' + y + ')'; i = j; continue; }
    out += ch; i++;
  }
  return out;
}
// implisitt ganging: 2ab → 2*a*b, a(b) → a*(b), )( → )*(
function implicit(js){
  const t = js.match(/Math\.[a-z]+|\d+(?:\.\d+)?|[A-Za-z](?:_\w+)?|\*\*|[-+*/()]/g) || [];
  if(t.join('') !== js.replace(/\s+/g, '')) throw new Error('kan ikke lese «' + js + '»');
  const val = x => /^(\d|[A-Za-z]|\))/.test(x) && !/^Math/.test(x), start = x => /^(\d|[A-Za-z(]|Math)/.test(x);
  let out = ''; t.forEach((x, k) => { if(k && val(t[k - 1]) && start(x)) out += '*'; out += x; }); return out;
}
const varsOf = js => [...new Set((js.replace(/Math\.[a-z]+/g, '').match(/[A-Za-z](?:_\w+)?/g) || []))];
function value(js, env){ const v = varsOf(js); return Function(...v, 'return ' + js)(...v.map(n => { if(!(n in env)) throw new Error('mangler verdi for ' + n); return env[n]; })); }
// Én kjede «A = B ≈ C …» → liste av [uttrykk, omtrent?]
function chain(tex){
  if(/\\neq|\\ne\b|\\leq|\\geq|<|>|\\Rightarrow/.test(tex)) return null;
  return tex.split(/(=|\\approx)/).reduce((a, p, i, arr) => { if(i % 2 === 0 && p.trim()) a.push([p, arr[i - 1] === '\\approx']); return a; }, []);
}
// Sjekk én kjede. env = faste verdier (likning/fysikk) eller null (tilfeldige tall, flere forsøk).
function checkChain(parts, w, env, loose){
  // ± prøves med begge fortegn: kjeden holder hvis ett av dem går opp (abc-formelen gir begge løsningene)
  if(parts.some(([p]) => /\\pm/.test(p))){ const n0 = errs.length;
    for(const sg of ['+', '-']){ const before = errs.length; checkChain(parts.map(([p, ap]) => [p.replace(/\\pm/g, sg), ap]), w, env, loose); if(errs.length === before){ errs.length = n0; return; } }
    errs.length = n0 + 1; return; }
  let js; try{ js = parts.map(([p, ap]) => [implicit(toJS(p)), ap]); }catch(e){ return E(w, e.message); }
  // «s = …», «P = …», «ny = …»: en enslig størrelse er bare navnet på svaret når verdiene ikke er gitt
  if(loose || !env) js = js.filter(([x]) => !/^[A-Za-z](_\w+)?$/.test(x));
  if(js.length < 2) return;
  const names = [...new Set(js.flatMap(([x]) => varsOf(x)))];
  const trials = env ? [env] : Array.from({ length: 6 }, (_, k) => Object.fromEntries(names.map((n, j) => [n, [2.3, 1.7, 3.1, 0.6, 2.9, 1.9, 4.4, 0.8][(j * 3 + k) % 8] + k * 0.37])));
  for(const e of trials){
    let v; try{ v = js.map(([x]) => value(x, e)); }catch(err){ return E(w, err.message); }
    for(let k = 1; k < v.length; k++){
      const tol = (js[k][1] ? 5e-3 : 1e-9) * Math.max(1, Math.abs(v[0]));
      if(!Number.isFinite(v[k]) || Math.abs(v[k] - v[0]) > tol){ return E(w, `ulike verdier: «${parts[0][0].trim()}» = ${+v[0].toFixed(6)}, men «${parts[k][0].trim()}» = ${+v[k].toFixed(6)}` + (env ? ' med ' + JSON.stringify(e) : '')); }
    }
  }
  nChecks++;
}
const mathIn = s => [...String(s).matchAll(/\$\$([^$]+)\$\$|\$([^$]+)\$/g)].map(m => m[1] || m[2]);
const colors = s => (String(s).match(/#[0-9a-fA-F]{6}/g) || []).map(h => h.toLowerCase()).sort().join(' ');
const stripNb = s => String(s).replace(/\{,\}/g, '.').replace(/\\text\{[^}]*\}/g, '\\text{}'); // ord i \text{…} oversettes

// ---------- 1–3: emnesider ----------
for(const [code, units] of Object.entries(M.TOPIC_DB)) (units || []).forEach((list, u) => (list || []).forEach(tp => {
  if(!hasMC(JSON.stringify(tp)) && !(tp.nb && tp.nb.steps)) return;
  nTopics++;
  for(const lang of ['nb', 'en']){
    const x = tp[lang], w = `${code} ${tp.id} ${lang}`;
    for(const h of (JSON.stringify(x).match(/#[0-9a-fA-F]{6}/g) || [])) if(!HEX.includes(h.toLowerCase())) E(w, 'farge utenfor MC: ' + h);
    (x.steps || []).forEach((g, gi) => {
      if(!Array.isArray(g.rows) || !g.rows.length) return E(w, `steg ${gi}: mangler rows`);
      let cur = null; const env = g.chk && typeof g.chk === 'object' ? g.chk : null;
      const flush = () => { if(cur) checkChain(cur, `${w} steg ${gi + 1}`, env); cur = null; };
      g.rows.forEach(([l0, d], ri) => {
        const l = [].concat(l0).join(' '); // en lang formel kan være delt i flere linjer
        try{ katex.renderToString(l, { throwOnError: true, displayMode: true, output: 'mathml' }); }catch(e){ E(`${w} steg ${gi + 1}.${ri + 1}`, 'KaTeX: ' + e.message.slice(0, 80)); }
        if(!d || typeof d !== 'string') E(`${w} steg ${gi + 1}.${ri + 1}`, 'mangler forklaring');
        const c = chain(unAlign(l)); if(!c) return;
        if(/^\s*=/.test(unAlign(l))) cur = (cur || []).concat(c); else { flush(); cur = c; }
      });
      flush();
    });
    // formler, eksempel og tips: kjeder med = (enslige bokstaver som «s =» hoppes over i eksempler)
    (x.f || []).forEach(([l], k) => { const c = chain(l); if(c && hasMC(l)) checkChain(c, `${w} f${k}`, null); });
    for(const fld of ['ex', 'tip']){ let cur = null; const flush = () => { if(cur) checkChain(cur, `${w} ${fld}`, null, true); cur = null; };
      for(const m of mathIn(x[fld] || '')) { const c = chain(m); if(!c || !hasMC(m)) { flush(); continue; } if(/^\s*=/.test(m) && cur) cur = cur.concat(c); else { flush(); cur = c; } }
      flush(); }
  }
  // 3) språk: samme trinn, samme formler og samme farger
  const a = tp.nb, b = tp.en, w = `${code} ${tp.id}`;
  if(!b) return E(w, 'mangler engelsk');
  const sa = a.steps || [], sb = b.steps || [];
  if(sa.length !== sb.length) E(w, `ulikt antall utledninger (nb ${sa.length}, en ${sb.length})`);
  sa.forEach((g, gi) => { const h = sb[gi]; if(!h) return; if(g.rows.length !== h.rows.length) E(w, `utledning ${gi + 1}: ulikt antall trinn`);
    if(JSON.stringify(g.chk || null) !== JSON.stringify(h.chk || null)) E(w, `utledning ${gi + 1}: ulik chk`);
    g.rows.forEach(([l], ri) => { if(h.rows[ri] && stripNb([].concat(l).join(' ')) !== stripNb([].concat(h.rows[ri][0]).join(' '))) E(w, `trinn ${gi + 1}.${ri + 1}: formelen er ulik på norsk og engelsk`); }); });
  (a.f || []).forEach(([l], k) => { if(b.f && b.f[k] && colors(l) !== colors(b.f[k][0])) E(w, `f${k}: ulike farger på norsk og engelsk`); });
  if(colors(a.ex) !== colors(b.ex)) E(w, 'eksempelet har ulike farger på norsk og engelsk');
  if(colors(JSON.stringify(a.legend || [])) !== colors(JSON.stringify(b.legend || []))) E(w, 'symbolforklaringen har ulike farger på norsk og engelsk');
}));

// ---------- 2: fargede formler i teoritekstene ----------
for(const [code, units] of Object.entries(M.THEORY_DB)) (units || []).forEach((d, u) => {
  if(!d) return;
  for(const lang of ['nb', 'en']){
    const txt = d[lang] || ''; if(!hasMC(txt)) continue; nDocs++;
    for(const h of (txt.match(/#[0-9a-fA-F]{6}/g) || [])) if(!HEX.includes(h.toLowerCase())) E(`${code} ${u} ${lang}`, 'farge utenfor MC: ' + h);
    // $$-linjer som starter med «=», fortsetter kjeden fra linja over
    let cur = null, w0 = '';
    const flush = () => { if(cur) checkChain(cur, `${code} ${u} ${lang} teori «${w0.slice(0, 50)}…»`, null, true); cur = null; };
    for(const m of mathIn(txt)) { if(!hasMC(m)) { flush(); continue; } const c = chain(m); if(!c) { flush(); continue; }
      if(/^\s*=/.test(m) && cur) cur = cur.concat(c); else { flush(); cur = c; w0 = m; } }
    flush();
  }
  if(d.nb && d.en && colors(d.nb) !== colors(d.en)) E(`${code} ${u}`, 'teorien har ulike farger på norsk og engelsk');
});

// ---------- 5: oppgaver – fargede forklaringer regnes ut, og svaralternativer skal aldri være farget ----------
// (en farge bare på riktig alternativ ville avsløre svaret)
function checkQ(q, w){
  if(!q) return;
  if(Array.isArray(q[1]) && q[1].some(hasMC)) E(w, 'svaralternativ med farge – fargen avslører riktig svar');
  if(hasMC(q[0])) E(w, 'oppgaveteksten har farge – farg bare forklaringen');
  if(!hasMC(q[2])) return; nQs++;
  for(const m of mathIn(q[2])) { if(!hasMC(m)) continue; const c = chain(m); if(c) checkChain(c, `${w} forklaring`, null, true); }
}
for(const lang of ['nb', 'en']){
  M.setLang(lang);
  for(const c of M.COURSES) c.units.forEach((u, ui) => {
    u.qs.forEach((q, i) => checkQ(lang === 'en' && M.ENQ[c.code] && M.ENQ[c.code][ui] && M.ENQ[c.code][ui][i] ? M.ENQ[c.code][ui][i] : q, `${lang} ${c.code} ${ui}.${i}`));
    (u.gen || []).forEach((g, j) => { for(let k = 0; k < 25; k++){ let q; try{ q = g(); }catch(e){ break; } checkQ(q, `${lang} ${c.code} ${ui}.g${j}`); } });
  });
}
M.setLang('nb');
// drillkortene (drill.js): samme regel
{ const learn = fs.readFileSync(path.join(ROOT, 'learn.js'), 'utf8'), mcSrc = learn.slice(learn.indexOf('// ---------- farger i formler'), learn.indexOf('// ---------- teori ----------'));
  const dsrc = mcSrc + '\nvar LANG="nb";const T=(a,b)=>LANG==="en"?b:a;const esc=s=>s;const shuffle=a=>a;const dayKey=()=>"2026-01-01";\n' + fs.readFileSync(path.join(ROOT, 'drill.js'), 'utf8') + '\nmodule.exports={DRILL,setL:l=>LANG=l,drText};';
  const f = path.join(os.tmpdir(), 'axle_mcd_' + process.pid + '.js'); fs.writeFileSync(f, dsrc); const D = require(f); fs.unlinkSync(f);
  for(const lang of ['nb', 'en']){ D.setL(lang); for(const c of D.DRILL){ const t = D.drText; checkQ([t(c[2]), [t(c[3]), ...c[4].map(t)], t(c[5])], `${lang} drill ${c[0]}`); } } }

// ---------- 4: klassene og kontrasten ----------
const html = M.mcClass(katex.renderToString(M.mcA('a') + '+b', { output: 'mathml' }));
if(!/mathcolor="#1D5FC2" class="mc-a"/i.test(html)) E('mcClass', 'klassen mc-a mangler i ' + html.slice(0, 120));
const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const light = css.match(/:root\{--mc-a:(#\w{6});--mc-b:(#\w{6});--mc-c:(#\w{6})\}/), dark = css.match(/:root\[data-theme="dark"\]\{--mc-a:(#\w{6});--mc-b:(#\w{6});--mc-c:(#\w{6})\}/);
if(!light || !dark) E('styles.css', 'fant ikke --mc-a/b/c for lyst og mørkt tema');
else {
  ['a', 'b', 'c'].forEach((k, i) => { if(light[i + 1].toLowerCase() !== M.MC[k].toLowerCase()) E('styles.css', `--mc-${k} (${light[i + 1]}) er ikke lik MC.${k} (${M.MC[k]}) i learn.js`); });
  const bg = (re) => (css.match(re) || [])[1];
  const L = [bg(/--card:(#\w{6})/), bg(/--accent-soft:(#\w{6})/), bg(/--paper:(#\w{6})/)];
  const D = [bg(/\[data-theme="dark"\]\{[\s\S]*?--card:(#\w{6})/), bg(/\[data-theme="dark"\]\{[\s\S]*?--accent-soft:(#\w{6})/), bg(/\[data-theme="dark"\]\{[\s\S]*?--paper:(#\w{6})/)];
  for(const [cols, bgs, n] of [[light, L, 'lyst'], [dark, D, 'mørkt']]) for(let i = 1; i <= 3; i++) for(const b of bgs){ const r = ratio(cols[i], b); if(r < 4.5) E('kontrast', `${n} tema: ${cols[i]} mot ${b} er ${r.toFixed(2)}:1 (under 4,5)`); }
}

console.log(`fargede formler: ${nTopics} emnesider, ${nDocs} teoritekster, ${nQs} oppgaveforklaringer, ${nChecks} kjeder regnet ut, feil: ${errs.length}`);
errs.slice(0, 40).forEach(x => console.log(' - ' + x));
process.exit(errs.length ? 1 : 0);
