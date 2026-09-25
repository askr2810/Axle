// Lager åpne, statiske sider for Google: én side per fag (axle.no/<fag>/), én per emne (axle.no/<fag>/<emne>/),
// en oversikt (axle.no/fag/), sitemap.xml og robots.txt. Kjøres etter build.py (npm run build).
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
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') +
  ';module.exports={COURSES,META,THEORY_DB,TOPIC_DB,GROUP_NAMES,CONFIG,nf,courseName:typeof courseName!=="undefined"?courseName:null};');
const M = require(tmp); fs.unlinkSync(tmp);
const { COURSES, META, THEORY_DB, TOPIC_DB, CONFIG } = M;

// Emnekoder for fagene som ikke har dem i META (bare koder vi er sikre på).
const EXTRA_CODES = { DISK: [['NTNU', 'TMA4140']], DBNET: [['NTNU', 'TDT4145']], ML: [['NTNU', 'TDT4172']] };
// Forkortelse i tittelen der folk faktisk søker på den.
const ABBR = { FEM: 'FEM', MEK1300: 'Python', DAVE3705: 'PDE', ML: 'ML' };

// ---------- hjelpere ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => String(s).toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const name = c => (META[c.code] && META[c.code].nb) || c.name;
const unitName = (c, u) => c.units[u].title;
const codesOf = c => [...((META[c.code] && META[c.code].eq) || []), ...(EXTRA_CODES[c.code] || [])];
function tex(m, display){ try{ return katex.renderToString(m, { output: 'mathml', displayMode: !!display, throwOnError: false, strict: 'ignore' }); }catch(e){ return esc(m); } }
function inline(s){ // tekst med $matte$, **fet** og `kode`
  return String(s).split(/(```[\s\S]*?```)/).map((blk, j) => {
    if(j % 2) return '<pre><code>' + esc(blk.replace(/^```\n?|\n?```$/g, '')) + '</code></pre>';
    return blk.split('$').map((p, i) => i % 2 ? tex(p) : esc(p).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>')).join('');
  }).join('');
}
const plain = s => String(s).replace(/\$[^$]*\$/g, ' ').replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ').trim();
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
    if(/^!\[(fig|sim):/.test(L)) continue;
    if((m = L.match(/^\$\$(.+)\$\$$/))){ fa(); out.push('<div class="dm">' + tex(m[1], true) + '</div>'); continue; }
    if((m = L.match(/^>\s?(.*)$/))){ fp(); fl(); box.push(m[1]); continue; }
    if((m = L.match(/^-\s+(.*)$/)) || (m = L.match(/^\d+[.)]\s+(.*)$/))){ fp(); fb(); const t = /^-/.test(L) ? 'ul' : 'ol'; if(!list || list.t !== t){ fl(); list = { t, items: [] }; } list.items.push(m[1]); continue; }
    fl(); fb(); para.push(L);
  }
  if(code) out.push('<pre><code>' + esc(code.join('\n')) + '</code></pre>');
  fa(); return out.join('\n');
}
const theory = (c, u) => { const d = (THEORY_DB[c.code] || [])[u]; return d ? String(d.nb || '') : ''; };
function lead(src){ // første vanlige avsnitt, som ingress
  const p = src.split(/\n\s*\n/).map(x => x.replace(/^##.*\n?/, '').trim()).find(x => x && !/^(#|>|-|!\[|\d+[.)]|\$\$|```)/.test(x));
  return p ? plain(p) : '';
}
const topicsOf = (c, u) => ((TOPIC_DB[c.code] || [])[u] || []);
const fmtNum = x => M.nf(x, 3);

// ---------- felles ramme ----------
const CSS = `:root{--ink:#16202A;--muted:#5B6773;--bg:#F6F8F4;--card:#fff;--line:#DCE3DA;--acc:#2B59C3;--accs:#E3EAFA;--ok:#1E9A5E;--bad:#D23F3A;--gold:#B77C00}
@media (prefers-color-scheme:dark){:root{--ink:#E8EEF3;--muted:#9AA7B2;--bg:#0F151B;--card:#17212A;--line:#27333E;--acc:#7EA2FF;--accs:#1C2A45;--ok:#3CC47F;--bad:#FF6B66;--gold:#F0B429}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--acc)}header,main,footer{max-width:760px;margin:0 auto;padding:0 18px}
header{display:flex;align-items:center;justify-content:space-between;padding-top:14px}header a.logo{font-weight:900;font-size:22px;text-decoration:none;color:var(--ink)}
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
.fig svg *{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.fig svg text,.fig svg tspan{fill:currentColor;stroke:none;font-size:15px;font-style:italic}
.fig .b{stroke-width:5}.fig .dim{stroke:var(--muted);stroke-width:1.2}.fig .a{stroke:var(--acc);stroke-width:2.6}.fig .af{fill:var(--acc);stroke:var(--acc)}.fig .t{stroke:var(--gold)}.fig .tf{fill:var(--gold);stroke:var(--gold)}
.fig .g{stroke:var(--ok)}.fig .gf{fill:var(--ok);stroke:var(--ok)}.fig .r{stroke:var(--bad)}.fig .rf{fill:var(--bad);stroke:var(--bad)}.fig .fill{fill:var(--accs);stroke:var(--acc)}.fig .dash{stroke-dasharray:5 5;stroke:var(--muted)}
footer{margin-top:40px;padding-bottom:40px;font-size:14px;color:var(--muted)}footer .more a{display:inline-block;margin:0 10px 6px 0}`;
function page({ url, title, desc, body, jsonld, crumbs }){
  return `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Axle"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${SITE}${url}"><meta property="og:image" content="${SITE}/icons/icon-512.png">
<meta name="theme-color" content="#2B59C3"><link rel="icon" type="image/png" href="/icons/icon-192.png">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
<style>${CSS}</style>
</head>
<body>
<header><a class="logo" href="/">Axle</a><a href="/fag/">Alle fag</a></header>
<main>
${crumbs ? `<p class="crumbs">${crumbs}</p>` : ''}
${body}
</main>
<footer><p class="more">${COURSES.map(c => `<a href="/${courseSlug(c)}/">${esc(name(c))}</a>`).join(' ')}</p>
<p>Axle er gratis øving i ingeniørfag på norsk: teori, oppgaver med nye tall, prøveeksamener og daglige utfordringer. <a href="/privacy.html">Personvern</a> · <a href="mailto:${esc(CONFIG.contactEmail)}">Kontakt</a></p></footer>
</body>
</html>
`;
}
const SLUGS = new Map();
function courseSlug(c){
  if(SLUGS.has(c.code)) return SLUGS.get(c.code);
  let s = slug(name(c)) || c.code.toLowerCase(); const used = new Set(SLUGS.values()); if(used.has(s) || ['fag', 'icons', 'vendor'].includes(s)) s += '-' + c.code.toLowerCase();
  SLUGS.set(c.code, s); return s;
}
const appLink = c => `/?fag=${encodeURIComponent(c.code)}`;

// ---------- eksempeloppgaver (faste oppgaver, ikke generatorer) ----------
function samples(c, n = 4){
  const out = [];
  for(let round = 0; out.length < n && round < 6; round++) c.units.forEach((unit, u) => { const q = unit.qs[round]; if(q && out.length < n) out.push({ u, q }); });
  return out.map(({ u, q }) => {
    const [prompt, ans, expl] = q;
    const answer = Array.isArray(ans) ? inline(ans[0]) : esc(fmtNum(ans.n) + (ans.u ? ' ' + ans.u : ''));
    return `<details><summary>${esc(unitName(c, u))}: ${inline(prompt)}</summary><p><span class="ok">Svar:</span> ${answer}</p>${expl ? `<p>${inline(expl)}</p>` : ''}</details>`;
  }).join('\n');
}
function topicBlock(c, tp){
  const x = tp.nb, f = (x.f || [])[0];
  return `<a href="/${courseSlug(c)}/${tp.id}/"><b>${esc(x.t)}</b><span>${esc(plain(x.intro).slice(0, 110))}${plain(x.intro).length > 110 ? '…' : ''}</span></a>`;
}

// ---------- fagside ----------
function coursePage(c){
  const s = courseSlug(c), nm = name(c), abbr = ABBR[c.code], codes = codesOf(c);
  const nQ = c.units.reduce((n, u) => n + u.qs.length, 0), nG = c.units.reduce((n, u) => n + (u.gen || []).length, 0);
  const nT = (TOPIC_DB[c.code] || []).flat().filter(Boolean).length;
  const title = `${nm}${abbr ? ` (${abbr})` : ''} – gratis øving, teori og oppgaver`;
  const intro = lead(theory(c, 0)) || `Øv på ${nm} med teori, oppgaver og prøveeksamen.`;
  const desc = `Øv på ${nm.toLowerCase()} gratis: ${nQ + nG} oppgaver med løsningsforslag, ${c.units.length} deler med teori og formler, og prøveeksamen.${codes.length ? ' Passer for ' + codes.map(e => e[1]).slice(0, 3).join(', ') + '.' : ''}`.slice(0, 300);
  const units = c.units.map((_, u) => {
    const src = theory(c, u), tps = topicsOf(c, u);
    return `<section class="unit" id="del-${u + 1}"><h2>${u + 1}. ${esc(unitName(c, u))}</h2>
${src ? mdToHtml(src) : ''}
${tps.length ? `<h3>Begreper i denne delen</h3><div class="tp">${tps.map(tp => topicBlock(c, tp)).join('')}</div>` : ''}
<p><a class="cta" href="${appLink(c)}">Øv på ${esc(unitName(c, u).toLowerCase())} i appen →</a></p></section>`;
  }).join('\n');
  const body = `<h1>${esc(nm)}${abbr ? ` (${esc(abbr)})` : ''}: gratis øving, teori og oppgaver</h1>
<p class="lead">${esc(intro)}</p>
<div class="facts"><span>${c.units.length} deler</span><span>${nQ + nG} oppgaver</span>${nT ? `<span>${nT} begreper forklart</span>` : ''}<span>Prøveeksamen</span><span>Gratis</span></div>
<a class="cta" href="${appLink(c)}">Start å øve gratis →</a>
<h2>Innhold</h2><ol>${c.units.map((_, u) => `<li><a href="#del-${u + 1}">${esc(unitName(c, u))}</a></li>`).join('')}</ol>
${units}
<h2>Eksempeloppgaver med løsning</h2>
<p>Her er noen av oppgavene i ${esc(nm.toLowerCase())}. I appen får regneoppgavene nye tall hver gang, så du kan øve til det sitter – og ta en prøveeksamen med karakter før eksamen.</p>
${samples(c)}
<a class="cta" href="${appLink(c)}">Øv på alle oppgavene →</a>
${codes.length ? `<h2>Passer for disse emnene</h2><p>Innholdet dekker pensum som går igjen i ingeniørutdanningene, blant annet:</p><ul class="codes">${codes.map(([sch, k]) => `<li><b>${esc(k)}</b> (${esc(sch)})</li>`).join('')}</ul>` : ''}`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'Course', name: nm, description: desc, inLanguage: 'nb', isAccessibleForFree: true,
    url: `${SITE}/${s}/`, provider: { '@type': 'Organization', name: 'Axle', sameAs: SITE }, ...(codes[0] ? { courseCode: codes[0][1] } : {}),
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT10M' },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'NOK', category: 'Free' } };
  return page({ url: `/${s}/`, title: `${title} | Axle`, desc, body, jsonld, crumbs: `<a href="/fag/">Alle fag</a> › ${esc(nm)}` });
}
// ---------- emneside ----------
function topicPage(c, u, tp, prev, next){
  const s = courseSlug(c), x = tp.nb, nm = name(c);
  const title = `${x.t} – forklaring, formel og eksempel | ${nm} | Axle`;
  const desc = plain(x.intro).slice(0, 155);
  const body = `<h1>${esc(x.t)}</h1>
${tp.fig ? `<div class="fig" aria-hidden="true">${tp.fig}</div>` : ''}
<p class="lead">${inline(x.intro)}</p>
${(x.f || []).map(([l, d]) => `<div class="fbox">${tex(l, true)}${d ? `<small>${inline(d)}</small>` : ''}</div>`).join('')}
${(x.legend || []).length ? `<h2>Symboler</h2><table>${x.legend.map(([sy, m, un]) => `<tr><td>${tex(sy)}</td><td>${inline(m)}</td><td>${esc(un || '')}</td></tr>`).join('')}</table>` : ''}
${x.ex ? `<h2>Eksempel</h2>${String(x.ex).split('\n').map(l => `<p>${inline(l)}</p>`).join('')}` : ''}
${x.tip ? `<div class="note">${inline(x.tip)}</div>` : ''}
<a class="cta" href="${appLink(c)}">Øv på ${esc(unitName(c, u).toLowerCase())} gratis →</a>
<p>${prev ? `← <a href="/${s}/${prev.id}/">${esc(prev.nb.t)}</a>` : ''}${prev && next ? ' · ' : ''}${next ? `<a href="/${s}/${next.id}/">${esc(next.nb.t)}</a> →` : ''}</p>
<p>Del av <a href="/${s}/#del-${u + 1}">${esc(nm)}: ${esc(unitName(c, u))}</a>.</p>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: x.t, description: desc, inLanguage: 'nb', isAccessibleForFree: true,
    learningResourceType: 'Concept overview', url: `${SITE}/${s}/${tp.id}/`, isPartOf: { '@type': 'Course', name: nm, url: `${SITE}/${s}/` } };
  return page({ url: `/${s}/${tp.id}/`, title, desc, body, jsonld, crumbs: `<a href="/fag/">Alle fag</a> › <a href="/${s}/">${esc(nm)}</a> › ${esc(x.t)}` });
}
// ---------- oversikt ----------
function hubPage(){
  const groups = new Map(); for(const c of COURSES){ if(!groups.has(c.group)) groups.set(c.group, []); groups.get(c.group).push(c); }
  const gname = g => (M.GROUP_NAMES[g] ? M.GROUP_NAMES[g][0] : g);
  const body = `<h1>Gratis øving i ingeniørfag</h1>
<p class="lead">Teori, oppgaver med løsningsforslag og prøveeksamener i ${COURSES.length} fag – fra grunnleggende matematikk til elementmetoden, reguleringsteknikk og maskinlæring.</p>
<a class="cta" href="/">Åpne Axle →</a>
${[...groups].map(([g, list]) => `<h2>${esc(gname(g))}</h2><div class="tp">${list.map(c => `<a href="/${courseSlug(c)}/"><b>${esc(name(c))}</b><span>${esc(lead(theory(c, 0)).slice(0, 100))}…</span></a>`).join('')}</div>`).join('\n')}`;
  return page({ url: '/fag/', title: 'Gratis øving i ingeniørfag – teori og oppgaver | Axle', desc: `Gratis øving i ${COURSES.length} ingeniørfag: teori, oppgaver med løsningsforslag og prøveeksamener. Kalkulus, statikk, fasthetslære, elektro, FEM og mer.`, body, crumbs: '' });
}

// ---------- skriv ut ----------
const write = (rel, html) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };
const urls = ['/', '/fag/']; let nTopic = 0;
COURSES.forEach(courseSlug);
write('fag/index.html', hubPage());
for(const c of COURSES){
  const s = courseSlug(c); write(`${s}/index.html`, coursePage(c)); urls.push(`/${s}/`);
  const flat = (TOPIC_DB[c.code] || []).flatMap((list, u) => (list || []).map(tp => ({ u, tp })));
  flat.forEach(({ u, tp }, i) => { write(`${s}/${tp.id}/index.html`, topicPage(c, u, tp, flat[i - 1] && flat[i - 1].tp, flat[i + 1] && flat[i + 1].tp)); urls.push(`/${s}/${tp.id}/`); nTopic++; });
}
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`  seo: ${COURSES.length} fagsider, ${nTopic} emnesider, oversikt, sitemap.xml og robots.txt`);
