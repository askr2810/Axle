// Test av animasjonsprototypene i prototypes/animasjoner (oppgave 21). Kjøres i npm test.
// Sjekker manus mot reglene i docs/ANIMASJONER.md (tid, taletempo, nb/en, tenkepause, kontrollspørsmål),
// regner tallene i fortellerteksten ut på nytt, og tegner hver replikk ved p = 0, 0,25, 0,5, 0,75 og 1 uten NaN.
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..', 'prototypes', 'animasjoner');
const errs = []; const E = (w, m) => errs.push(w + ': ' + m);
const words = s => s.trim().split(/\s+/).length;
let nFrames = 0;
const ids = fs.readdirSync(DIR).filter(d => fs.existsSync(path.join(DIR, d, 'anim.js')));
if (!ids.length) E('prototypes', 'ingen animasjoner funnet');
for (const id of ids) {
  const A = require(path.join(DIR, id, 'anim.js'));
  if (A.id !== id) E(id, 'id stemmer ikke med mappenavnet');
  if (!fs.existsSync(path.join(DIR, id, 'index.html'))) E(id, 'mangler index.html');
  const total = A.lines.reduce((n, l) => n + l.d, 0);
  if (total < 60 || total > 120) E(id, `total tid ${total} s, skal være 60–120 s`);
  // Scenene: 5–15 s, i rekkefølge uten hull.
  A.scenes.forEach((s, k) => {
    const ls = A.lines.filter(l => l.s === k), d = ls.reduce((n, l) => n + l.d, 0);
    if (!ls.length) E(id, `scene ${k + 1} har ingen replikker`);
    if (d < 5 || d > 15) E(id, `scene ${k + 1} «${s[0]}» varer ${d} s, skal være 5–15 s`);
    if (!s[0] || !s[1]) E(id, `scene ${k + 1} mangler nb/en-tittel`);
  });
  A.lines.forEach((l, i) => { if (i && l.s < A.lines[i - 1].s) E(id, `${l.id} kommer før forrige scene`); });
  if (new Set(A.lines.map(l => l.id)).size !== A.lines.length) E(id, 'like replikk-id-er');
  if (!A.lines.some(l => l.wait)) E(id, 'mangler tenkepause (wait)');
  for (const l of A.lines) {
    const w = `${id} ${l.id}`;
    if (!l.vo || !l.vo[0] || !l.vo[1]) E(w, 'mangler fortellertekst nb/en');
    if (!l.see || !l.see[0] || !l.see[1]) E(w, 'mangler beskrivelse av bildet nb/en (transkript)');
    // Taletempo: høyst 2,6 ord/s på norsk og 3,0 på engelsk i planlagt tid.
    if (words(l.vo[0]) / l.d > 2.6) E(w, `for raskt på norsk: ${words(l.vo[0])} ord på ${l.d} s`);
    if (words(l.vo[1]) / l.d > 3.0) E(w, `for raskt på engelsk: ${words(l.vo[1])} ord på ${l.d} s`);
    if (/[æøåÆØÅ«»]/.test(l.vo[1] + l.see[1])) E(w, 'norske tegn i engelsk tekst');
    for (const lang of ['nb', 'en']) {
      A.setLang(lang);
      for (const p of [0, 0.25, 0.5, 0.75, 1]) {
        let svg; try { svg = A.frame(A.lines.indexOf(l), p); } catch (e) { E(w, `krasj ved p=${p} (${lang}): ${e.message}`); continue; }
        nFrames++;
        if (typeof svg !== 'string' || !svg) E(w, `tom tegning ved p=${p}`);
        else if (/NaN|undefined|Infinity/.test(svg)) E(w, `ugyldig verdi i tegningen ved p=${p} (${lang})`);
        else if (lang === 'en' && /[æøåÆØÅ]/.test(svg.replace(/<[^>]*>/g, ''))) E(w, `norske tegn i engelsk tegning ved p=${p}`);
      }
    }
  }
  const c = A.check;
  if (!c || !c.q[0] || !c.q[1] || !c.why[0] || !c.why[1]) E(id, 'kontrollspørsmålet mangler tekst nb/en');
  else if (!(c.ans >= 0 && c.ans < c.opts.length) || new Set(c.opts).size !== c.opts.length) E(id, 'kontrollspørsmålet har ugyldig svar eller like alternativer');
}

// Faglig kontroll av derivasjonspiloten: tallene i manuset regnes ut på nytt (f(x) = x², P = (3, 9)).
{
  const A = require(path.join(DIR, 'derivasjon', 'anim.js')), F = A.facts, vo = A.lines.map(l => l.vo[0]).join(' ');
  const f = x => x * x, slope = h => (f(3 + h) - f(3)) / h, near = (a, b) => Math.abs(a - b) < 1e-9;
  if (!near(F.f(3), 9) || !near(F.f(5), 25)) E('derivasjon', 'f(3) eller f(5) er feil');
  if (!near(slope(2), 8) || !near(f(5) - f(3), 16)) E('derivasjon', 'sekanten 3→5 skal stige 16 på 2 (stigning 8)');
  if (!near(slope(1), 7)) E('derivasjon', 'sekanten 3→4 skal ha stigning 7');
  [[1, 7], [0.5, 6.5], [0.1, 6.1], [0.01, 6.01]].forEach(([h, m]) => { if (!near(slope(h), m) || !near(F.slope(h), m)) E('derivasjon', `stigningen for h=${h} skal være ${m}`); });
  // Grensen: (6h + h²)/h = 6 + h → 6.
  if (!near(slope(1e-7), 6) && Math.abs(slope(1e-7) - 6) > 1e-6) E('derivasjon', 'grensen skal være 6');
  [[1, 2], [2, 4], [3, 6]].forEach(([x, m]) => { if (Math.abs((f(x + 1e-7) - f(x)) / 1e-7 - m) > 1e-5) E('derivasjon', `f′(${x}) skal være ${m}`); });
  for (const s of ['stiger 16', 'delt på 2, altså 8', 'stigningstallet 7', 'er stigningen 7', 'den 6,5', 'den 6,1', 'nærmer seg 6', 'stigningene 2 og 4', 'lik 2x', 'av 3 lik 6'])
    if (!vo.includes(s)) E('derivasjon', `fortellerteksten mangler «${s}» (tallene er kontrollert mot den)`);
  if (A.check.opts[A.check.ans] !== String(2 * 5)) E('derivasjon', 'kontrollspørsmålet: f′(5) skal være 10');
}

if (errs.length) { console.log(errs.slice(0, 40).join('\n')); console.log(`\n${errs.length} feil i animasjonsprototypene`); process.exit(1); }
console.log(`Animasjonsprototyper OK: ${ids.length} animasjon(er), ${nFrames} tegninger kontrollert.`);
