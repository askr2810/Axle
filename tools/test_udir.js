// Lenken til tidligere eksamensoppgaver hos Udir (exam.js, udirExamsHTML): peker til Udirs egen søkeside,
// vises under «Eksamenstrening» i Øv bare for fag med sentralt gitt eksamen (VGS og matematikk 8.–10.),
// én gang per side, med tydelig lenketekst på norsk og engelsk, varsel om ny fane for skjermleser og ingen Udir-logo.
// Axle lenker bare: ingen nedlasting, kopi eller innbygging av oppgaver (se docs/OPPGAVER_TERMINAL.md, oppgave 32).
// Bruk: node tools/test_udir.js
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort(), 'exam.js'];
const tmp = path.join(require('os').tmpdir(), 'axle_udir_' + process.pid + '.js');
fs.writeFileSync(tmp, 'const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); var S = { exams: {}, examRun: null };\n' +
  files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') +
  ';module.exports={COURSES,examHomeSection,udirExamsHTML,udirExamsFor,UDIR_EXAMS_URL,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp);
const errs = []; const E = (w, m) => errs.push(w + ': ' + m);
const URL = 'https://sokeresultat.udir.no/eksamensoppgaver.html?ExCatalogTypeName=Eksamensoppgaver';
if (M.UDIR_EXAMS_URL !== URL) E('url', 'peker ikke til Udirs søkeside: ' + M.UDIR_EXAMS_URL);
const want = c => /^VGS:/.test(c.group) || c.code === 'GU810';
let shown = 0;
for (const lang of ['nb', 'en']) {
  M.setLang(lang);
  for (const c of M.COURSES) {
    const w = `${lang} ${c.code}`;
    if (M.udirExamsFor(c) !== want(c)) E(w, 'feil utvalg av fag');
    const sec = M.examHomeSection(c), links = (sec.match(/sokeresultat\.udir\.no/g) || []).length;
    if (!want(c)) { if (links) E(w, 'lenke til Udir i fag uten sentralt gitt eksamen'); continue; }
    if (links !== 1) { E(w, `lenken står ${links} ganger i eksamensseksjonen`); continue; }
    shown++;
    const a = (sec.match(/<a class="udx-a"[^>]*>[\s\S]*?<\/a>/) || [''])[0];
    const href = (a.match(/href="([^"]+)"/) || [])[1];
    if (href !== URL) E(w, 'href: ' + href);
    if (!/target="_blank"/.test(a) || !/rel="noopener noreferrer"/.test(a)) E(w, 'ny fane uten target/rel');
    const name = a.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const exp = lang === 'nb' ? 'Tidligere eksamensoppgaver fra Udir (åpnes i ny fane)' : 'Past exam papers from Udir (opens in a new tab)';
    if (name !== exp) E(w, 'lenketekst: ' + name);
    if (!/<svg[^>]*aria-hidden="true"/.test(a)) E(w, 'ikonet er ikke skjult for skjermleser');
    const did = (a.match(/aria-describedby="([^"]+)"/) || [])[1];
    const desc = did && (sec.match(new RegExp(`<p id="${did}">([^<]*)</p>`)) || [])[1];
    if (!desc) E(w, 'mangler beskrivelse');
    else if (lang === 'nb' ? !/fag.*år/.test(desc) || !/passord/.test(desc) : !/subject.*year/.test(desc) || !/password/.test(desc)) E(w, 'beskrivelsen forklarer ikke fag/år og passord: ' + desc);
    if (lang === 'en' && /[æøåÆØÅ]/.test(name + desc)) E(w, 'norske tegn i engelsk tekst');
    if (/<img|logo/i.test(sec.slice(sec.indexOf('class="udx"')))) E(w, 'bilde eller logo ved Udir-lenken');
    if (/<iframe|fetch\(/.test(sec)) E(w, 'innbygging av Udir-innhold');
  }
}
// Udir-innhold lastes aldri inn i Axle (ingen fetch, iframe eller nedlasting fra udir.no).
for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.js'))) {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  if (/(fetch|iframe|XMLHttpRequest)[^\n]{0,200}udir\.no/.test(s)) E(f, 'henter eller bygger inn innhold fra udir.no');
}
if (shown < 2 * 20) E('antall', `lenken vises bare i ${shown / 2} fag`);
if (errs.length) { console.log(errs.slice(0, 40).join('\n')); console.log(`FEIL: ${errs.length}`); process.exit(1); }
console.log(`OK: Udir-lenken vises én gang i ${shown / 2} fag (nb og en), riktig adresse, lenketekst og beskrivelse; ingen i andre fag`);
