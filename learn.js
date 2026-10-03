// ============================================================
//  Læring: teori per enhet, tospråklige tilleggsoppgaver,
//  forkunnskaper (hvilke fag et fag bygger på) og forkurs.
//  Lastes etter oppgavebanken og en_static_*.js, før theory_*/course_*/gens_x*.
// ============================================================

// ---------- teori ----------
// THEORY(kode, enhet, { nb: "...", en: "..." })
// Markering (én regel per linje):
//   ## Overskrift        ### Underoverskrift
//   - punkt              1. nummerert punkt
//   > uthevet boks (huskeregel, viktig formel) – flere linjer på rad blir én boks
//   $$ ... $$            formel på egen linje (vist stort)
//   ```  ...  ```        kodeblokk
//   tom linje            nytt avsnitt
//   i teksten: $...$ (matte), `kode`, **fet**
const THEORY_DB = {};
function THEORY(code, u, doc) { (THEORY_DB[code] ||= [])[u] = doc; }
const theoryOf = (code, u) => (THEORY_DB[code] && THEORY_DB[code][u]) || null;

// ---------- tospråklige tilleggsoppgaver ----------
// BIQ(kode, enhet, [ [nbTekst, nbSvar, nbForklaring, enTekst, enAlternativer|null, enForklaring], ... ])
// nbSvar: [RIKTIG, feil, ...] eller {n, tol, u}. enAlternativer: samme rekkefølge (første riktig), null for tallsvar.
function BIQ(code, u, list) {
  const c = COURSES.find(x => x.code === code);
  if (!c || !c.units[u]) throw new Error("BIQ: ukjent fag/enhet " + code + " " + u);
  const unit = c.units[u], en = ((ENQ[code] ||= [])[u] ||= []);
  for (const q of list) {
    unit.qs.push([q[0], q[1], q[2]]);
    en[unit.qs.length - 1] = [q[3], q[4], q[5]];
  }
}

// ---------- fordypning (add_zdeep_*.js) ----------
function DEEP(code, title, nb, en, keepHead){
  const c = COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u < 0) return;
  const doc = theoryOf(code, u); if(!doc) return;
  const put = (src, add) => { const lines = String(src).split("\n"), i = lines.findIndex(l => /^###?\s+(Eksempel|Example)/i.test(l.trim()));
    if(i < 0){ // ingen eksempel: legg fordypningen foran huskeregelen (> …) helt til slutt, ellers bakerst
      let k = lines.length - 1; while(k > 0 && !lines[k].trim()) k--;
      if(k > 0 && /^>/.test(lines[k].trim())){ while(k > 0 && /^>/.test(lines[k - 1].trim())) k--; lines.splice(k, 0, add, ""); return lines.join("\n"); }
      return src + "\n\n" + add; }
    lines.splice(i, 0, add, ""); return lines.join("\n"); };
  const ren = (s, a, b) => keepHead ? String(s) : String(s).replace(a, b);
  THEORY(code, u, { nb: ren(put(doc.nb, nb), /^## (Begreper og formler|Begreper)$/m, "## Kort oppsummert"), en: ren(put(doc.en || doc.nb, en), /^## (Concepts and formulas|Concepts)$/m, "## In short") });
}
// Samme fordypning på alle enheter med en av titlene (f.eks. «Algebra og likninger» i både 1T og S1). codes begrenser til bestemte fag.
function DEEPT(titles, nb, en, keepHead, codes){
  for(const c of COURSES){ if(codes && !codes.includes(c.code)) continue;
    c.units.forEach((u, i) => { if([].concat(titles).includes(u.title) && theoryOf(c.code, i)) DEEP(c.code, u.title, nb, en, keepHead); }); }
}
function DQS(code, title, list){ const c = COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) BIQ(code, u, list); }

// ---------- nye fag ----------
// NEWCOURSE({ code, group, nb, en, s:[nbMerke, enMerke], eqText:{nb,en}, units:[[nbTittel, enTittel], ...] })
function NEWCOURSE(d) {
  COURSES.push({ code: d.code, name: d.nb, group: d.group, isNew: true, study: d.study || undefined, units: d.units.map(([nb]) => ({ title: nb, qs: [], gen: [] })) });
  META[d.code] = { nb: d.nb, en: d.en, s: d.s, eq: [], eqText: d.eqText, units: d.units.map(x => x[1]) };
}
GROUP_NAMES["Forkurs"] = ["Start her: grunnlag", "Start here: foundations"];

// ---------- nye enheter i eksisterende fag ----------
// ADDUNIT(kode, nbTittel, enTittel) → nummeret til den nye enheten (legges sist, så fremgangen i de andre enhetene beholdes)
function ADDUNIT(code, nb, en) {
  const c = COURSES.find(x => x.code === code); if (!c) throw new Error("ADDUNIT: ukjent fag " + code);
  c.units.push({ title: nb, qs: [], gen: [] });
  const m = META[code]; if (m) { m.units ||= []; m.units[c.units.length - 1] = en; }
  return c.units.length - 1;
}

// SHAREUNIT(tilFag, fraFag, enhet | "tittel", nbFag, enFag) → nummeret til enheten i tilFag.
// Samme stoff i to fag (f.eks. R1 og S2): oppgavene, generatorene og teorien deles, men fremgangen er egen per fag.
function SHAREUNIT(dst, src, u, nbSrc, enSrc) {
  const s = COURSES.find(x => x.code === src), d = COURSES.find(x => x.code === dst);
  if (!s || !d) throw new Error("SHAREUNIT: ukjent fag " + src + " / " + dst);
  const k0 = typeof u === "number" ? u : s.units.findIndex(x => x.title === u); const su = s.units[k0];
  if (!su) throw new Error("SHAREUNIT: ukjent enhet " + src + " " + u);
  d.units.push({ title: su.title, qs: su.qs, gen: (su.gen ||= []), shared: src, sharedU: k0 });
  const k = d.units.length - 1, m = META[dst]; if (m) { m.units ||= []; m.units[k] = META[src] && META[src].units ? META[src].units[k0] : su.title; }
  (ENQ[dst] ||= [])[k] = ((ENQ[src] ||= [])[k0] ||= []);
  const th = theoryOf(src, k0);
  if (th) THEORY(dst, k, { nb: `🔗 Felles pensum med **${nbSrc}**. Oppgavene er de samme, men fremgangen din telles for hvert fag.\n\n` + th.nb,
    en: `🔗 Shared curriculum with **${enSrc}**. The questions are the same, but your progress counts separately for each subject.\n\n` + th.en });
  return k;
}

NEWCOURSE({ code: "GMAT", group: "Forkurs", nb: "Grunnleggende matematikk", en: "Foundations of Mathematics", s: ["GM", "FM"],
  eqText: { nb: "Fra grunnskole til R2-nivå – start her", en: "From the basics to pre-university level – start here" },
  units: [
    ["Tall, brøk og prosent", "Numbers, fractions and percent"],
    ["Potenser, røtter og tierpotenser", "Powers, roots and scientific notation"],
    ["Algebra og ligninger", "Algebra and equations"],
    ["Funksjoner og grafer", "Functions and graphs"],
    ["Eksponential- og logaritmefunksjoner", "Exponential and logarithmic functions"],
    ["Trigonometri og geometri", "Trigonometry and geometry"],
    ["Vektorer", "Vectors"]
  ] });
NEWCOURSE({ code: "GFYS", group: "Forkurs", nb: "Grunnleggende fysikk", en: "Foundations of Physics", s: ["GF", "FP"],
  eqText: { nb: "Fysikk 1-nivå – før mekanikk og elektro", en: "Introductory physics – before mechanics and circuits" },
  units: [
    ["Størrelser, enheter og måling", "Quantities, units and measurement"],
    ["Bevegelse", "Motion"],
    ["Krefter og Newtons lover", "Forces and Newton's laws"],
    ["Arbeid, energi og effekt", "Work, energy and power"],
    ["Trykk, tetthet og varme", "Pressure, density and heat"],
    ["Elektrisitet", "Electricity"]
  ] });

// ---------- forkunnskaper ----------
// need = bygger på (bør være på plass først), nice = nyttig å ha
const PREREQ = {
  GMAT: { need: [] }, GFYS: { need: ["GMAT"] },
  MEK1000: { need: ["GMAT"] }, MEK1300: { need: [], nice: ["GMAT"] }, KJEMI: { need: ["GMAT"] }, OKON: { need: ["GMAT"] },
  STKD6610: { need: [] }, PROD: { need: [], nice: ["MATS1600"] },
  MEK2000: { need: ["MEK1000"] }, MEK2200: { need: ["MEK1000"] },
  DAVE3700: { need: ["MEK1000", "MEK2000"] }, DAVE3705: { need: ["MEK1000", "MEK2000"], nice: ["DAVE3700"] },
  MEK1400: { need: ["GFYS", "MEK1000"] }, MAPE1300: { need: ["GFYS", "MEK1000"] }, ELPE1300: { need: ["GFYS", "MEK1000"] },
  MEK3100: { need: ["MEK1300"] }, NUM: { need: ["MEK1000", "MEK2000", "MEK1300"] },
  MATS1500: { need: ["GFYS"], nice: ["KJEMI"] }, FAST: { need: ["MAPE1300"], nice: ["MATS1500"] },
  MATS1600: { need: ["MAPE1300", "FAST"], nice: ["MATS1500"] }, MATS2100: { need: ["MEK1400", "MEK1000"] },
  FLUID: { need: ["MAPE1300", "MEK1000"], nice: ["MATS2100"] }, VARME: { need: ["MATS2100", "MEK2000"], nice: ["FLUID"] },
  SVING: { need: ["MAPE1300", "MEK2000"] }, FEM: { need: ["FAST", "MEK2000"], nice: ["NUM", "DAVE3700"] },
  ELEK: { need: ["ELPE1300"] }, ELFT2500: { need: ["ELPE1300", "MEK1300"] },
  ELFT2400: { need: ["MEK1000", "MEK2000", "DAVE3705"], nice: ["ELPE1300", "MAPE1300"] },
  ELVE3610: { need: ["MEK2000", "MAPE1300"], nice: ["ELFT2400", "MEK1300"] }
};
const preOf = code => PREREQ[code] || { need: [] };
// «Trinn» i anbefalt rekkefølge: 1 + største trinn blant fagene det bygger på
const STEP_MEMO = {};
function courseStep(code, path = []) {
  if (STEP_MEMO[code]) return STEP_MEMO[code];
  if (path.includes(code)) return 1;
  const need = preOf(code).need.filter(k => COURSES.some(c => c.code === k));
  const v = need.length ? 1 + Math.max(...need.map(k => courseStep(k, [...path, code]))) : 1;
  return (STEP_MEMO[code] = v);
}
