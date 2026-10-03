// Lager åpne, statiske sider for Google på norsk og engelsk: én side per fag (axle.no/<fag>/ og axle.no/en/<course>/),
// én per emne (…/<emne>/), oversikter (axle.no/fag/ og axle.no/en/courses/), sitemap.xml med språkkoblinger (hreflang)
// og robots.txt. Kjøres etter build.py (npm run build:web).
// Sidene hentes fra samme innhold som appen (teori, emnesider og faste oppgaver), og matte gjengis med KaTeX (MathML).
const fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'release', 'www'), SITE = 'https://axle.no';
const katex = require(path.join(ROOT, 'vendor', 'katex.min.js'));

// ---------- last innholdet slik appen gjør ----------
const order = ['config.js', 'i18n.js', 'data.js', 'gens.js', 'gens_b.js', 'more.js', 'more2.js', 'more2_b.js', 'subjects2.js', 'subjects2_b.js', 'more3.js'];
const ls = re => fs.readdirSync(ROOT).filter(f => re.test(f)).sort();
const files = [...order, ...ls(/^en_static_.*\.js$/), 'learn.js', ...ls(/^add_.*\.js$/), 'topics.js', ...ls(/^top_.*\.js$/)].filter(f => fs.existsSync(path.join(ROOT, f)));
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const tmp = path.join(os.tmpdir(), 'axle_seo_' + process.pid + '.js');
// Tegningene til førerkortsidene (skilt, kryss): drive_signs.js, drive_scenes.js og drive_pics.js. FIGS finnes ikke her, så den lages tom.
const drawFiles = ['drive_signs_ref.js', 'drive_signs.js', 'drive_scenes.js', 'drive_pics.js'].filter(f => fs.existsSync(path.join(ROOT, f)));
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + '\n;var FIGS = {};\n' + drawFiles.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') +
  ';module.exports={COURSES,META,THEORY_DB,TOPIC_DB,GROUP_NAMES,CONFIG,nf,ENQ,UNIT_EN,setLang:l=>{LANG=l},DRIVE_PICS:typeof DRIVE_PICS!=="undefined"?DRIVE_PICS:{}};');
const M = require(tmp); fs.unlinkSync(tmp);
const { COURSES, META, THEORY_DB, TOPIC_DB, CONFIG, ENQ, UNIT_EN } = M;

// «Prøv selv»-simuleringene (titler og hvilke enheter de hører til), lastet slik test_sims.js gjør.
const SIMDATA = (() => {
  const figSrc = fs.readFileSync(path.join(ROOT, 'figures.js'), 'utf8').split('\n'), fig = figSrc.slice(figSrc.findIndex(l => l.startsWith('const fgAr')), figSrc.findIndex(l => l.startsWith('const fgGround')) + 1);
  const stub = `var LANG = "nb"; const T = (a, b) => LANG === "en" ? b : a; const esc = s => String(s); const I = { bolt: "" }; const t = k => k; const S = {};
const decPoint = () => LANG === "en"; const nf = (x, d = 2) => String(x);`;
  const f = path.join(os.tmpdir(), 'axle_seo_sims_' + process.pid + '.js'); global.COURSES = COURSES;
  fs.writeFileSync(f, stub + '\n' + fig.join('\n') + '\n' + fs.readFileSync(path.join(ROOT, 'sims.js'), 'utf8').replace(/^document\.addEventListener[\s\S]*$/m, '') + '\n' +
    ['sims2.js', 'sims3.js', 'sims4.js', 'sims5.js'].map(x => fs.readFileSync(path.join(ROOT, x), 'utf8')).join('\n') + '\nmodule.exports = { SIMS, SIM_MAP };');
  try{ return require(f); }catch(e){ console.log('  seo: fant ikke simuleringene (' + e.message + ')'); return { SIMS: {}, SIM_MAP: {} }; }finally{ try{ fs.unlinkSync(f); }catch(e){} }
})();
// Interaktive laber (lab.js) for bestemte emner: [lab, nb-adresse, en-adresse, nb-tittel, en-tittel]
const LAB_TOPIC = {
  'GMAT:enhetssirkel': ['enhetssirkel/utforsk', 'unitcircle/explore', 'Enhetssirkelen: dra punktet og se sin, cos og tan', 'The unit circle: drag the point and see sin, cos and tan'],
  'GMAT:trigonometri': ['enhetssirkel/eksakte', 'unitcircle/exact', 'Eksakte verdier for sin og cos, med trekantene de kommer fra', 'Exact values of sin and cos, with the triangles they come from'],
  'MAPE1300:kraftkomponenter': ['krefter/snorer', 'forces/ropes', 'Lodd i to snorer: dekomponer kreftene og se hva vinklene gjør', 'A load in two ropes: decompose the forces and see what the angles do'],
  'MAPE1300:likevekt': ['krefter/trinser', 'forces/pulleys', 'Likevekt med trinser og motvekter', 'Equilibrium with pulleys and counterweights'],
  'GFYS:tyngde-normalkraft': ['krefter/snorer', 'forces/ropes', 'Lodd i to snorer: snordrag og tyngde', 'A load in two ropes: tension and weight']
};
// Laber per enhet (til fagsidene), samme som LABS[].units i lab.js.
const LAB_UNIT = { 'VG1T:3': 0, 'VGR2:3': 0, 'GMAT:5': 0, 'GFYS:2': 1, 'VGFY1:1': 1, 'MAPE1300:0': 1, 'MAPE1300:1': 1 };
const LAB_MAIN = [['enhetssirkel/utforsk', 'unitcircle/explore', 'Enhetssirkelen', 'The unit circle'], ['krefter/snorer', 'forces/ropes', 'Snorer, trinser og krefter', 'Ropes, pulleys and forces']];
const embedSrc = r => `/?embed=1${L === 'en' ? '&lang=en' : ''}#/${r}`;
const simsOf = (c, u) => [].concat(SIMDATA.SIM_MAP[c.code + ':' + u] || []).filter(n => SIMDATA.SIMS[n]);
const simTitle = n => SIMDATA.SIMS[n].t[L === 'en' ? 1 : 0];
const words = s => new Set(String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9æøå]+/).filter(w => w.length >= 4).map(w => w.slice(0, 5)).filter(w => !['forde', 'syste', 'orden', 'order', 'distr'].includes(w)));
// Det som passer best på en emneside: en lab, eller en simulering fra samme enhet med felles ord i tittelen (eller den eneste).
function topicLab(c, u, tp){
  const lab = LAB_TOPIC[c.code + ':' + tp.id]; if(lab) return { src: embedSrc(L === 'en' ? lab[1] : lab[0]), t: L === 'en' ? lab[3] : lab[2], h: 640 };
  const sims = simsOf(c, u); if(!sims.length) return null;
  const tw = words(tp.id + ' ' + tp.nb.t + ' ' + ((tp.en || {}).t || ''));
  const score = n => [...words(SIMDATA.SIMS[n].t[0] + ' ' + SIMDATA.SIMS[n].t[1])].filter(w => tw.has(w)).length;
  const best = sims.slice().sort((a, b) => score(b) - score(a))[0];
  if(score(best) < 1) return null; // bare når simuleringen handler om det samme (felles ord i tittelen)
  return { src: embedSrc('lab/' + best), t: simTitle(best), h: 560 };
}
const labFrame = x => `<section class="lab"><h2>${L === 'en' ? 'Try it yourself' : 'Prøv selv'}</h2><p class="labt">${esc(x.t)}</p><iframe class="lab" src="${x.src}" title="${esc(x.t)}" loading="lazy" style="height:${x.h}px" allow="clipboard-write"></iframe></section>`;
const labButton = (src, t) => `<button class="labbtn" data-lab="${src}" data-t="${esc(t)}">▶ ${L === 'en' ? 'Try it' : 'Prøv selv'}: ${esc(t)}</button>`;
const LAB_JS = `<script>addEventListener("message",function(e){if(e.origin!==location.origin||!e.data||!e.data.axleEmbed)return;document.querySelectorAll("iframe.lab").forEach(function(f){if(f.contentWindow===e.source)f.style.height=e.data.h+"px"})});document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-lab]");if(!b)return;var f=document.createElement("iframe");f.className="lab";f.src=b.getAttribute("data-lab");f.title=b.getAttribute("data-t");f.style.height="600px";b.replaceWith(f)})</script>`;

// Emnekoder for fagene som ikke har dem i META (bare koder vi er sikre på).
const EXTRA_CODES = { DISK: [['NTNU', 'TMA4140']], DBNET: [['NTNU', 'TDT4145']], ML: [['NTNU', 'TDT4172']] };
// Forkortelse i tittelen der folk faktisk søker på den.
const ABBR = { FEM: 'FEM', MEK1300: 'Python', DAVE3705: 'PDE', ML: 'ML' };

// ---------- språk ----------
// Alt som står på sidene rundt selve innholdet, på begge språk.
const TX = {
  nb: { all: 'Alle fag', hub: '/fag/', parts: n => `${n} deler`, probs: n => `${n} oppgaver`, concepts: n => `${n} begreper forklart`, exam: 'Prøveeksamen', free: 'Gratis',
    startFree: 'Start å øve gratis →', contents: 'Innhold', inPart: 'Begreper i denne delen', practisePart: u => `Øv på ${u} i appen →`, samplesH: 'Eksempeloppgaver med løsning',
    samplesP: n => `Her er noen av oppgavene i ${n}. I appen får regneoppgavene nye tall hver gang, så du kan øve til det sitter – og ta en prøveeksamen med karakter før eksamen.`,
    allProbs: 'Øv på alle oppgavene →', answer: 'Svar:', codesH: 'Passer for disse emnene', codesP: 'Innholdet dekker pensum som går igjen i ingeniørutdanningene, blant annet:',
    title: (n, a) => `${n}${a ? ` (${a})` : ''} – gratis øving, teori og oppgaver`, h1: (n, a) => `${n}${a ? ` (${a})` : ''}: gratis øving, teori og oppgaver`,
    intro: n => `Øv på ${n} med teori, oppgaver og prøveeksamen.`,
    desc: (n, q, u, codes) => `Øv på ${n.toLowerCase()} gratis: ${q} oppgaver med løsningsforslag, ${u} deler med teori og formler, og prøveeksamen.${codes.length ? ' Passer for ' + codes.slice(0, 3).join(', ') + '.' : ''}`,
    tpTitle: (t, n) => `${t} – forklaring, formel og eksempel | ${n} | Axle`, symbols: 'Symboler', example: 'Eksempel', practiseFree: u => `Øv på ${u} gratis →`, partOf: 'Del av',
    hubTitle: 'Gratis øving i ingeniørfag – teori og oppgaver | Axle', hubH1: 'Gratis øving i ingeniørfag',
    hubLead: n => `Teori, oppgaver med løsningsforslag og prøveeksamener i ${n} fag – fra grunnleggende matematikk til elementmetoden, reguleringsteknikk og maskinlæring.`,
    hubDesc: n => `Gratis øving i ${n} ingeniørfag: teori, oppgaver med løsningsforslag og prøveeksamener. Kalkulus, statikk, fasthetslære, elektro, FEM og mer.`,
    open: 'Åpne Axle →', about: 'Axle er gratis øving i ingeniørfag på norsk: teori, oppgaver med nye tall, prøveeksamener og daglige utfordringer.', privacy: 'Personvern', contact: 'Kontakt',
    other: 'English', currency: 'NOK' },
  en: { all: 'All courses', hub: '/en/courses/', parts: n => `${n} parts`, probs: n => `${n} problems`, concepts: n => `${n} concepts explained`, exam: 'Practice exam', free: 'Free',
    startFree: 'Start practising for free →', contents: 'Contents', inPart: 'Concepts in this part', practisePart: u => `Practise ${u} in the app →`, samplesH: 'Example problems with solutions',
    samplesP: n => `Here are some of the problems in ${n}. In the app, calculation problems get new numbers every time, so you can practise until it sticks – and take a graded practice exam before the real one.`,
    allProbs: 'Practise all the problems →', answer: 'Answer:', codesH: 'Matches these university courses', codesP: 'The content covers the syllabus found in engineering degrees, for example:',
    title: (n, a) => `${n}${a ? ` (${a})` : ''} – free practice problems, theory and exercises`, h1: (n, a) => `${n}${a ? ` (${a})` : ''}: free practice, theory and problems`,
    intro: n => `Practise ${n} with theory, problems and a practice exam.`,
    desc: (n, q, u, codes) => `Practise ${n} for free: ${q} problems with worked solutions, ${u} parts with theory and formulas, and a practice exam.${codes.length ? ' Matches ' + codes.slice(0, 3).join(', ') + '.' : ''}`,
    tpTitle: (t, n) => `${t} – explanation, formula and example | ${n} | Axle`, symbols: 'Symbols', example: 'Example', practiseFree: u => `Practise ${u} for free →`, partOf: 'Part of',
    hubTitle: 'Free engineering practice – theory and problems | Axle', hubH1: 'Free practice for engineering students',
    hubLead: n => `Theory, problems with worked solutions and practice exams in ${n} courses – from basic maths to the finite element method, control engineering and machine learning.`,
    hubDesc: n => `Free practice in ${n} engineering courses: theory, problems with worked solutions and practice exams. Calculus, statics, strength of materials, circuits, FEM and more.`,
    open: 'Open Axle →', about: 'Axle is free practice for engineering students: theory, problems with new numbers every time, practice exams and daily challenges.', privacy: 'Privacy', contact: 'Contact',
    other: 'Norsk', currency: 'NOK' }
};

// ---------- hjelpere ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => String(s).toLowerCase().replace(/['’]/g, '').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
let L = 'nb'; // språket som skrives ut nå
const setL = l => { L = l; M.setLang(l); };
const X = () => TX[L];
const dec = s => L === 'en' ? String(s).replace(/\{,\}/g, '.') : String(s); // {,} = desimalkomma i norsk matte
const name = c => (META[c.code] && META[c.code][L]) || c.name;
const unitName = (c, u) => (L === 'en' && META[c.code] && META[c.code].units && META[c.code].units[u]) || c.units[u].title;
const codesOf = c => [...((META[c.code] && META[c.code].eq) || []), ...(EXTRA_CODES[c.code] || [])];
function tex(m, display){ try{ return katex.renderToString(dec(m), { output: 'mathml', displayMode: !!display, throwOnError: false, strict: 'ignore' }); }catch(e){ return esc(m); } }
function inline(s){ // tekst med $matte$, **fet** og `kode`
  return dec(s).split(/(```[\s\S]*?```)/).map((blk, j) => {
    if(j % 2) return '<pre><code>' + esc(blk.replace(/^```\n?|\n?```$/g, '')) + '</code></pre>';
    return blk.split('$').map((p, i) => i % 2 ? tex(p) : esc(p).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>')).join('');
  }).join('');
}
const plain = s => dec(s).replace(/\$[^$]*\$/g, ' ').replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ').trim();
const curLang = () => L; // språket som skrives nå (L skygges av linjevariabelen under)
function mdToHtml(src){ // samme markering som teorien i appen (##, ###, lister, >, $$, ```)
  const out = []; let para = [], list = null, box = [], code = null;
  const fp = () => { if(para.length){ out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const fl = () => { if(list){ out.push(`<${list.t}>` + list.items.map(x => '<li>' + inline(x) + '</li>').join('') + `</${list.t}>`); list = null; } };
  const fb = () => { if(box.length){ out.push('<div class="note">' + box.map(inline).join('<br>') + '</div>'); box = []; } };
  const fa = () => { fp(); fl(); fb(); };
  for(const raw of String(src).split('\n')){
    const L = raw.trim();
    if(code){ if(/^```/.test(L)){ out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>'); code = null; } else code.push(raw); continue; }
    if(/^```/.test(L)){ fa(); code = []; continue; }
    if(!L){ fa(); continue; }
    let m;
    if((m = L.match(/^(#{2,3})\s+(.*)$/))){ fa(); const h = m[1].length === 2 ? 'h3' : 'h4'; out.push(`<${h}>${inline(m[2])}</${h}>`); continue; }
    if((m = L.match(/^!\[pic:([\w-]+)\]$/)) && M.DRIVE_PICS[m[1]]){ fa(); const p = M.DRIVE_PICS[m[1]](curLang()); out.push(`<figure class="pic">${p.svg}<figcaption>${esc(p.cap)}</figcaption></figure>`); continue; }
    if(/^!\[(fig|sim|pic):/.test(L)) continue;
    if((m = L.match(/^\$\$(.+)\$\$$/))){ fa(); out.push('<div class="dm">' + tex(m[1], true) + '</div>'); continue; }
    if((m = L.match(/^>\s?(.*)$/))){ fp(); fl(); box.push(m[1]); continue; }
    if((m = L.match(/^-\s+(.*)$/)) || (m = L.match(/^\d+[.)]\s+(.*)$/))){ fp(); fb(); const t = /^-/.test(L) ? 'ul' : 'ol'; if(!list || list.t !== t){ fl(); list = { t, items: [] }; } list.items.push(m[1]); continue; }
    fl(); fb(); para.push(L);
  }
  if(code) out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
  fa(); return out.join('\n');
}
const theory = (c, u) => { const d = (THEORY_DB[c.code] || [])[u]; return d ? String(d[L] || d.nb || '') : ''; };
function lead(src){ // første vanlige avsnitt, som ingress
  const p = src.split(/\n\s*\n/).map(x => x.replace(/^##.*\n?/, '').trim()).find(x => x && !/^(#|>|-|!\[|\d+[.)]|\$\$|```)/.test(x));
  return p ? plain(p) : '';
}
const topicsOf = (c, u) => ((TOPIC_DB[c.code] || [])[u] || []);
const fmtNum = x => M.nf(x, 3);

// ---------- stil ----------
const CSS = `figure.pic{margin:14px 0;padding:12px;background:#fff;border:2px solid #D5DDD3;border-radius:16px}figure.pic>svg{display:block;width:100%;height:auto}figure.pic figcaption{margin-top:8px;font-size:15px;color:#3A4651;text-align:center}iframe.lab{display:block;width:100%;border:2px solid var(--line);border-radius:18px;background:var(--bg);margin:6px 0 14px;min-height:360px}
.lab h2{margin-bottom:2px}.labt{margin:0 0 4px;color:var(--muted)}
.labbtn{display:block;width:100%;text-align:left;margin:8px 0;padding:12px 14px;border-radius:14px;border:2px dashed var(--acc);background:var(--accs);color:var(--acc);font:inherit;font-weight:700;cursor:pointer}
:root{--ink:#16202A;--muted:#5B6773;--bg:#F6F8F4;--card:#fff;--line:#DCE3DA;--acc:#2B59C3;--accs:#E3EAFA;--ok:#1E9A5E;--bad:#D23F3A;--gold:#B77C00}
@media (prefers-color-scheme:dark){:root{--ink:#E8EEF3;--muted:#9AA7B2;--bg:#0F151B;--card:#17212A;--line:#27333E;--acc:#7EA2FF;--accs:#1C2A45;--ok:#3CC47F;--bad:#FF6B66;--gold:#F0B429}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--acc)}header,main,footer{max-width:760px;margin:0 auto;padding:0 18px}
header{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px}header nav{font-size:15px}header a.logo{font-weight:900;font-size:22px;text-decoration:none;color:var(--ink)}
.crumbs{font-size:14px;color:var(--muted);margin:14px 0 0}.crumbs a{color:var(--muted)}
h1{font-size:32px;line-height:1.15;margin:10px 0 12px}h2{font-size:24px;margin:34px 0 8px}h3{font-size:19px;margin:22px 0 6px}h4{font-size:17px;margin:16px 0 4px}
.lead{font-size:19px;color:var(--muted)}.cta{display:inline-block;margin:14px 0;padding:14px 22px;border-radius:14px;background:var(--acc);color:#fff;font-weight:800;text-decoration:none;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.facts{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.facts span{background:var(--accs);color:var(--acc);font-weight:700;font-size:14px;padding:4px 12px;border-radius:99px}
.unit{background:var(--card);border:2px solid var(--line);border-radius:16px;padding:6px 18px 12px;margin:14px 0}
.note{background:var(--accs);border-radius:12px;padding:10px 14px;margin:10px 0;font-weight:600}.dm{overflow-x:auto;text-align:center;margin:8px 0}
.tp{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));margin:10px 0}.tp a{display:block;background:var(--card);border:2px solid var(--line);border-radius:14px;padding:10px 12px;text-decoration:none;color:var(--ink)}.tp a b{display:block}.tp a span{font-size:14px;color:var(--muted)}
details{background:var(--card);border:2px solid var(--line);border-radius:14px;padding:10px 14px;margin:10px 0}summary{cursor:pointer;font-weight:700;color:var(--acc)}
.ok{color:var(--ok);font-weight:800}.codes{columns:2;font-size:15px}pre{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px}
.fbox{border:2px solid var(--acc);background:var(--accs);border-radius:14px;padding:10px 14px;margin:10px 0;text-align:center}.fbox small{display:block;color:var(--muted)}
table{border-collapse:collapse;width:100%;background:var(--card);border:2px solid var(--line);border-radius:12px;overflow:hidden}td{padding:6px 10px;border-top:1px solid var(--line)}
.fig{background:var(--card);border:2px solid var(--line);border-radius:14px;padding:10px;color:var(--ink)}.fig svg{display:block;width:100%;max-height:230px;overflow:visible}
.fig svg *{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.fig svg text,.fig svg tspan{fill:currentColor;stroke:none;font-style:italic}.fig svg text{font-size:15px}
.fig .b{stroke-width:5}.fig .dim{stroke:var(--muted);stroke-width:1.2}.fig .a{stroke:var(--acc);stroke-width:2.6}.fig .af{fill:var(--acc);stroke:var(--acc)}.fig .t{stroke:var(--gold)}.fig .tf{fill:var(--gold);stroke:var(--gold)}
.fig .g{stroke:var(--ok)}.fig .gf{fill:var(--ok);stroke:var(--ok)}.fig .r{stroke:var(--bad)}.fig .rf{fill:var(--bad);stroke:var(--bad)}.fig .fill{fill:var(--accs);stroke:var(--acc)}.fig .dash{stroke-dasharray:5 5;stroke:var(--muted)}
footer{margin-top:40px;padding-bottom:40px;font-size:14px;color:var(--muted)}footer .more a{display:inline-block;margin:0 10px 6px 0}`;
// ---------- adresser ----------
const SLUGS = { nb: new Map(), en: new Map() }, TPS = new Map(); // TPS: kode → Map(emne-id → engelsk slug)
const RESERVED = ['fag', 'icons', 'vendor', 'en', 'english', 'courses', 'privacy-html'];
function courseSlug(c, l = L){
  const m = SLUGS[l]; if(m.has(c.code)) return m.get(c.code);
  const nm = (META[c.code] && META[c.code][l]) || c.name;
  let s = slug(nm) || c.code.toLowerCase(); if(new Set(m.values()).has(s) || RESERVED.includes(s)) s += '-' + c.code.toLowerCase();
  m.set(c.code, s); return s;
}
function topicSlug(c, tp, l = L){
  if(l === 'nb') return tp.id;
  if(!TPS.has(c.code)){ const used = new Set(), map = new Map();
    for(const list of TOPIC_DB[c.code] || []) for(const t of list || []){ let s = slug((t.en && t.en.t) || t.id) || t.id; if(used.has(s)) s += '-' + t.id; used.add(s); map.set(t.id, s); }
    TPS.set(c.code, map); }
  return TPS.get(c.code).get(tp.id) || tp.id;
}
const hubUrl = (l = L) => l === 'nb' ? '/fag/' : '/en/courses/';
const courseUrl = (c, l = L) => l === 'nb' ? `/${courseSlug(c, 'nb')}/` : `/en/${courseSlug(c, 'en')}/`;
const topicUrl = (c, tp, l = L) => courseUrl(c, l) + topicSlug(c, tp, l) + '/';
const appLink = c => L === 'nb' ? `/?fag=${encodeURIComponent(c.code)}` : `/?lang=en&fag=${encodeURIComponent(c.code)}`;
const other = () => L === 'nb' ? 'en' : 'nb';

// ---------- felles ramme ----------
function page({ url, alt, title, desc, body, jsonld, crumbs }){
  const nbUrl = L === 'nb' ? url : alt, enUrl = L === 'en' ? url : alt;
  return `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url}">
${alt ? `<link rel="alternate" hreflang="nb" href="${SITE}${nbUrl}"><link rel="alternate" hreflang="en" href="${SITE}${enUrl}"><link rel="alternate" hreflang="x-default" href="${SITE}${nbUrl}">` : ''}
<meta property="og:type" content="website"><meta property="og:site_name" content="Axle"><meta property="og:title" content="${esc(title)}"><meta property="og:locale" content="${L === 'nb' ? 'nb_NO' : 'en_GB'}">
<meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${SITE}${url}"><meta property="og:image" content="${SITE}/icons/icon-512.png">
<meta name="theme-color" content="#2B59C3"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
<style>${CSS}</style>
</head>
<body>
<header><a class="logo" href="${L === 'nb' ? '/' : '/?lang=en'}">Axle</a><nav><a href="${hubUrl()}">${X().all}</a>${alt ? ` · <a href="${alt}" hreflang="${other()}" lang="${other()}">${X().other}</a>` : ''}</nav></header>
<main>
${crumbs ? `<p class="crumbs">${crumbs}</p>` : ''}
${body}
</main>
${/data-lab=|iframe class="lab"/.test(body) ? LAB_JS : ''}
<footer><p class="more">${COURSES.map(c => `<a href="${courseUrl(c)}">${esc(name(c))}</a>`).join(' ')}</p>
<p>${X().about} <a href="/privacy.html">${X().privacy}</a> · <a href="/terms.html">${L === 'nb' ? 'Vilkår' : 'Terms'}</a> · <a href="mailto:${esc(CONFIG.contactEmail)}">${X().contact}</a></p></footer>
</body>
</html>
`;
}

// ---------- eksempeloppgaver (faste oppgaver, ikke generatorer) ----------
function samples(c, n = 4){
  const out = [];
  for(let round = 0; out.length < n && round < 6; round++) c.units.forEach((unit, u) => { const q = unit.qs[round]; if(q && out.length < n) out.push({ u, q, i: round }); });
  return out.map(({ u, q, i }) => {
    let [prompt, ans, expl] = q; const en = L === 'en' && ((ENQ[c.code] || [])[u] || [])[i];
    let answer;
    if(Array.isArray(ans)) answer = inline(en && en[1] ? en[1][0] : ans[0]);
    else { const un = ans.u ? (L === 'en' ? (UNIT_EN[ans.u] || ans.u) : ans.u) : ''; answer = esc(fmtNum(ans.n) + (un ? ' ' + un : '')); }
    if(en){ prompt = en[0]; expl = en[2]; }
    return `<details><summary>${esc(unitName(c, u))}: ${inline(prompt)}</summary><p><span class="ok">${X().answer}</span> ${answer}</p>${expl ? `<p>${inline(expl)}</p>` : ''}</details>`;
  }).join('\n');
}
const tpX = tp => (L === 'en' && tp.en && tp.en.t) ? tp.en : tp.nb;
function topicBlock(c, tp){
  const x = tpX(tp);
  return `<a href="${topicUrl(c, tp)}"><b>${esc(x.t)}</b><span>${esc(plain(x.intro).slice(0, 110))}${plain(x.intro).length > 110 ? '…' : ''}</span></a>`;
}

// Knapper som åpner de interaktive figurene for en enhet rett på fagsiden.
function unitLabs(c, u){
  const k = c.code + ':' + u, out = [];
  if(LAB_UNIT[k] !== undefined){ const l = LAB_MAIN[LAB_UNIT[k]]; out.push(labButton(embedSrc(L === 'en' ? l[1] : l[0]), L === 'en' ? l[3] : l[2])); }
  simsOf(c, u).slice(0, 3).forEach(n => out.push(labButton(embedSrc('lab/' + n), simTitle(n))));
  return out.join('');
}
// ---------- fagside ----------
function coursePage(c){
  const nm = name(c), abbr = ABBR[c.code], codes = codesOf(c);
  const nQ = c.units.reduce((n, u) => n + u.qs.length, 0), nG = c.units.reduce((n, u) => n + (u.gen || []).length, 0);
  const nT = (TOPIC_DB[c.code] || []).flat().filter(Boolean).length;
  const intro = lead(theory(c, 0)) || X().intro(nm);
  const drv = c.group === 'Førerkort', mc = c.code === 'FKMC'; // førerkort: folk søker på «teoriprøve», ikke «oppgaver og formler»
  const DX = !drv ? null : L === 'nb'
    ? { title: mc ? 'Teoriprøve MC (A1, A2 og A) – gratis øvingsprøve med forklaringer' : 'Teoriprøve bil (klasse B) – gratis øvingsprøve med forklaringer',
        h1: mc ? 'Teoriprøve for MC: øv gratis til førerkort A1, A2 og A' : 'Teoriprøve for bil: øv gratis til førerkort klasse B',
        desc: `Øv gratis til teoriprøven for ${mc ? 'motorsykkel (A1, A2 og A)' : 'bil (klasse B)'}: ${nQ} spørsmål med forklaring, øvingsprøve med 45 spørsmål på 90 minutter som på den ekte prøven, skilt, animerte trafikksituasjoner og oversikt over hvor du ligger an.`,
        facts: ['45 spørsmål · 90 min', `${nQ} spørsmål`, 'Skilt og trafikksituasjoner', 'Gratis'] }
    : { title: mc ? 'Norwegian motorcycle theory test (A1, A2, A) – free practice test' : 'Norwegian driving theory test (class B) – free practice test',
        h1: mc ? 'Norwegian motorcycle theory test: free practice for A1, A2 and A' : 'Norwegian driving theory test: free practice for class B',
        desc: `Practise for the Norwegian ${mc ? 'motorcycle' : 'car'} theory test for free: ${nQ} questions with explanations, a 45-question 90-minute mock test like the real one, road signs, animated traffic situations and a readiness score.`,
        facts: ['45 questions · 90 min', `${nQ} questions`, 'Signs and traffic situations', 'Free'] };
  const desc = (DX ? DX.desc : X().desc(nm, nQ + nG, c.units.length, codes.map(e => e[1]))).slice(0, 300);
  const lc = s => L === 'nb' ? s.toLowerCase() : s.charAt(0).toLowerCase() + s.slice(1);
  const units = c.units.map((_, u) => {
    const src = theory(c, u), tps = topicsOf(c, u);
    return `<section class="unit" id="${L === 'nb' ? 'del' : 'part'}-${u + 1}"><h2>${u + 1}. ${esc(unitName(c, u))}</h2>
${src ? mdToHtml(src) : ''}
${tps.length ? `<h3>${X().inPart}</h3><div class="tp">${tps.map(tp => topicBlock(c, tp)).join('')}</div>` : ''}
${unitLabs(c, u)}
<p><a class="cta" href="${appLink(c)}">${esc(X().practisePart(lc(unitName(c, u))))}</a></p></section>`;
  }).join('\n');
  const body = `<h1>${esc(DX ? DX.h1 : X().h1(nm, abbr))}</h1>
<p class="lead">${esc(intro)}</p>
<div class="facts">${DX ? DX.facts.map(f => `<span>${esc(f)}</span>`).join('') : `<span>${X().parts(c.units.length)}</span><span>${X().probs(nQ + nG)}</span>${nT ? `<span>${X().concepts(nT)}</span>` : ''}<span>${X().exam}</span><span>${X().free}</span>`}</div>
<a class="cta" href="${appLink(c)}">${X().startFree}</a>
<h2>${X().contents}</h2><ol>${c.units.map((_, u) => `<li><a href="#${L === 'nb' ? 'del' : 'part'}-${u + 1}">${esc(unitName(c, u))}</a></li>`).join('')}</ol>
${units}
<h2>${X().samplesH}</h2>
<p>${esc(X().samplesP(lc(nm)))}</p>
${samples(c)}
<a class="cta" href="${appLink(c)}">${X().allProbs}</a>
${codes.length ? `<h2>${X().codesH}</h2><p>${X().codesP}</p><ul class="codes">${codes.map(([sch, k]) => `<li><b>${esc(k)}</b> (${esc(sch)})</li>`).join('')}</ul>` : ''}`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'Course', name: nm, description: desc, inLanguage: L, isAccessibleForFree: true,
    url: `${SITE}${courseUrl(c)}`, provider: { '@type': 'Organization', name: 'Axle', sameAs: SITE }, ...(codes[0] ? { courseCode: codes[0][1] } : {}),
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT10M' },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'NOK', category: 'Free' } };
  return page({ url: courseUrl(c), alt: courseUrl(c, other()), title: `${DX ? DX.title : X().title(nm, abbr)} | Axle`, desc, body, jsonld, crumbs: `<a href="${hubUrl()}">${X().all}</a> › ${esc(nm)}` });
}
// ---------- emneside ----------
function topicPage(c, u, tp, prev, next){
  const x = tpX(tp), nm = name(c), cu = courseUrl(c);
  const desc = plain(x.intro).slice(0, 155);
  const lc = s => L === 'nb' ? s.toLowerCase() : s.charAt(0).toLowerCase() + s.slice(1);
  const body = `<h1>${esc(x.t)}</h1>
${tp.fig ? `<div class="fig" aria-hidden="true">${tp.fig}</div>` : ''}
${tp.pic && M.DRIVE_PICS[tp.pic] ? (p => `<figure class="pic">${p.svg}<figcaption>${esc(p.cap)}</figcaption></figure>`)(M.DRIVE_PICS[tp.pic](L)) : ''}
<p class="lead">${inline(x.intro)}</p>
${(() => { const lb = topicLab(c, u, tp); return lb ? labFrame(lb) : ''; })()}
${(x.f || []).map(([l, d]) => `<div class="fbox">${tex(l, true)}${d ? `<small>${inline(d)}</small>` : ''}</div>`).join('')}
${(x.legend || []).length ? `<h2>${X().symbols}</h2><table>${x.legend.map(([sy, m, un]) => `<tr><td>${tex(sy)}</td><td>${inline(m)}</td><td>${/\\/.test(un || '') ? tex(un) : esc(String(un || '').replace(/\{,\}/g, L === 'en' ? '.' : ','))}</td></tr>`).join('')}</table>` : ''}
${x.ex ? `<h2>${X().example}</h2>${String(x.ex).split('\n').map(l => `<p>${inline(l)}</p>`).join('')}` : ''}
${x.tip ? `<div class="note">${inline(x.tip)}</div>` : ''}
<a class="cta" href="${appLink(c)}">${esc(X().practiseFree(lc(unitName(c, u))))}</a>
<p>${prev ? `← <a href="${topicUrl(c, prev)}">${esc(tpX(prev).t)}</a>` : ''}${prev && next ? ' · ' : ''}${next ? `<a href="${topicUrl(c, next)}">${esc(tpX(next).t)}</a> →` : ''}</p>
<p>${X().partOf} <a href="${cu}#${L === 'nb' ? 'del' : 'part'}-${u + 1}">${esc(nm)}: ${esc(unitName(c, u))}</a>.</p>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: x.t, description: desc, inLanguage: L, isAccessibleForFree: true,
    learningResourceType: 'Concept overview', url: `${SITE}${topicUrl(c, tp)}`, isPartOf: { '@type': 'Course', name: nm, url: `${SITE}${cu}` } };
  return page({ url: topicUrl(c, tp), alt: topicUrl(c, tp, other()), title: X().tpTitle(x.t, nm), desc, body, jsonld, crumbs: `<a href="${hubUrl()}">${X().all}</a> › <a href="${cu}">${esc(nm)}</a> › ${esc(x.t)}` });
}
// ---------- oversikt ----------
function hubPage(){
  const groups = new Map(); for(const c of COURSES){ if(!groups.has(c.group)) groups.set(c.group, []); groups.get(c.group).push(c); }
  const gname = g => (M.GROUP_NAMES[g] ? M.GROUP_NAMES[g][L === 'nb' ? 0 : 1] : g);
  const body = `<h1>${X().hubH1}</h1>
<p class="lead">${X().hubLead(COURSES.length)}</p>
<a class="cta" href="${L === 'nb' ? '/' : '/?lang=en'}">${X().open}</a>
${[...groups].map(([g, list]) => `<h2>${esc(gname(g))}</h2><div class="tp">${list.map(c => `<a href="${courseUrl(c)}"><b>${esc(name(c))}</b><span>${esc(lead(theory(c, 0)).slice(0, 100))}…</span></a>`).join('')}</div>`).join('\n')}`;
  return page({ url: hubUrl(), alt: hubUrl(other()), title: X().hubTitle, desc: X().hubDesc(COURSES.length), body, crumbs: '' });
}

// ---------- skriv ut ----------
const write = (rel, html) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };
const pairs = [['/', null]]; let nTopic = 0; // [url, url på det andre språket]
for(const l of ['nb', 'en']){ setL(l); COURSES.forEach(c => courseSlug(c)); }
for(const l of ['nb', 'en']){
  setL(l);
  write(hubUrl().slice(1) + 'index.html', hubPage()); pairs.push([hubUrl(), hubUrl(other())]);
  for(const c of COURSES){
    write(courseUrl(c).slice(1) + 'index.html', coursePage(c)); pairs.push([courseUrl(c), courseUrl(c, other())]);
    const flat = (TOPIC_DB[c.code] || []).flatMap((list, u) => (list || []).map(tp => ({ u, tp })));
    flat.forEach(({ u, tp }, i) => { write(topicUrl(c, tp).slice(1) + 'index.html', topicPage(c, u, tp, flat[i - 1] && flat[i - 1].tp, flat[i + 1] && flat[i + 1].tp)); pairs.push([topicUrl(c, tp), topicUrl(c, tp, other())]); if(l === 'nb') nTopic++; });
  }
}
setL('nb');
// Korte adresser for førerkort (axle.no/teoriprove): videresender til fagsiden, med kanonisk adresse dit.
for(const [alias, code] of [['teoriprove', 'FKB'], ['teoriprove-bil', 'FKB'], ['teoriprove-mc', 'FKMC']]){
  const c = COURSES.find(x => x.code === code); if(!c) continue; const to = courseUrl(c);
  write(alias + '/index.html', `<!doctype html><html lang="nb"><head><meta charset="utf-8"><title>Teoriprøve – Axle</title><link rel="canonical" href="${SITE}${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"></head><body><a href="${to}">Teoriprøve</a></body></html>`);
}
const today = new Date().toISOString().slice(0, 10), langOf = u => u.startsWith('/en/') ? 'en' : 'nb';
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pairs.map(([u, a]) => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod>${a ? [[langOf(u), u], [langOf(a), a]].sort().map(([l, x]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${x}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${langOf(u) === 'nb' ? u : a}"/>` : ''}</url>`).join('\n')}\n</urlset>\n`);
// axle.no/en og axle.no/english: starter appen på engelsk (appen leser ?lang=en og husker valget).
const enPage = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Axle – free engineering practice in English</title>
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><link rel="canonical" href="${SITE}/en/courses/">
<meta http-equiv="refresh" content="0; url=/?lang=en"><script>location.replace("/?lang=en" + location.hash)</script></head>
<body><p><a href="/?lang=en">Open Axle in English</a> · <a href="/en/courses/">All courses</a></p></body></html>`;
write('en/index.html', enPage); write('english/index.html', enPage);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`  seo: ${COURSES.length} fagsider og ${nTopic} emnesider på norsk og engelsk, oversikter, /en, sitemap.xml (${pairs.length} adresser) og robots.txt`);
