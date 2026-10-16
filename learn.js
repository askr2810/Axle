// ============================================================
//  Læring: teori per enhet, tospråklige tilleggsoppgaver,
//  forkunnskaper (hvilke fag et fag bygger på) og forkurs.
//  Lastes etter oppgavebanken og en_static_*.js, før theory_*/course_*/gens_x*.
// ============================================================

// ---------- farger i formler (samme betydning i teori, emnesider, eksempler og oppgaver) ----------
//   blå     mcA  første ledd eller størrelse (a i kvadratsetningene, den første brøken, x-leddene i en likning)
//   oransje mcB  andre ledd eller størrelse (b, den andre brøken, tallene uten x)
//   magenta mcC  det som er nytt i steget: leddet som oppstår av begge (2ab), det du gjør på begge sider,
//                eller det du setter inn
// Fargen er alltid bare en hjelp: bokstaven, plasseringen og teksten ved siden av forteller det samme.
// KaTeX tar ikke CSS-variabler, så formlene får den lyse fargen som hex. tex()/texD() (app.js) og seo.js legger på
// klassen mc-a/mc-b/mc-c, og styles.css bytter til lysere farger i mørkt tema. Kontrast ≥ 4,5:1 i begge temaer,
// og blå/oransje/magenta skilles ved de vanligste formene for fargeblindhet (rød-grønn).
const MC = { a: "#1D5FC2", b: "#A64300", c: "#B5177A" };
const mcA = s => `\\textcolor{${MC.a}}{${s}}`, mcB = s => `\\textcolor{${MC.b}}{${s}}`, mcC = s => `\\textcolor{${MC.c}}{${s}}`;
const mcClass = html => String(html).replace(/mathcolor="(#[0-9a-f]{6})"/gi, (m, h) => { const k = Object.keys(MC).find(x => MC[x].toLowerCase() === h.toLowerCase()); return k ? `${m} class="mc-${k}"` : m; });

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

// ---------- figur laget av oppgavens egne tall ----------
// FIGQ({ f: "gs_place", p: { n: 63 }, after: { … }, only: "after" }, [tekst, svar, forklaring]) – legger ved hvilken figur
// som viser akkurat denne oppgaven (qart.js tegner den). Før svaret tegnes den med p.hide (uten det som avslører svaret),
// etter svaret med p + after. only: "after" = figuren vises først når svaret er gitt. Uten spec (null) gir den bare q tilbake.
function FIGQ(spec, q){ if(spec && q) q.fig = spec; return q; }

// ---------- tospråklige tilleggsoppgaver ----------
// BIQ(kode, enhet, [ [nbTekst, nbSvar, nbForklaring, enTekst, enAlternativer|null, enForklaring], ... ])
// nbSvar: [RIKTIG, feil, ...] eller {n, tol, u}. enAlternativer: samme rekkefølge (første riktig), null for tallsvar.
function BIQ(code, u, list) {
  const c = COURSES.find(x => x.code === code);
  if (!c || !c.units[u]) throw new Error("BIQ: ukjent fag/enhet " + code + " " + u);
  const unit = c.units[u], en = ((ENQ[code] ||= [])[u] ||= []);
  for (const q of list) {
    unit.qs.push(FIGQ(q[6] || null, [q[0], q[1], q[2]])); // q[6]: figur med oppgavens tall (se FIGQ)
    en[unit.qs.length - 1] = [q[3], q[4], q[5]];
  }
}

// ---------- fordypning (add_zdeep_*.js) ----------
function DEEP(code, title, nb, en, keepHead){
  const c = COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u < 0) return;
  const doc = theoryOf(code, u); if(!doc) return;
  // Fordypningen legges før «Slik løser du oppgavene» (så eksempelet blir stående der det hører hjemme), ellers før første eksempel.
  const put = (src, add) => { const lines = String(src).split("\n"), h = lines.findIndex(l => /^##\s+(Slik løser du|How to solve)/i.test(l.trim())),
    i = h >= 0 ? h : lines.findIndex(l => /^###?\s+(Eksempel|Example)/i.test(l.trim()));
    if(i < 0){ // ingen eksempel: legg fordypningen foran huskeregelen (> …) helt til slutt, ellers bakerst
      let k = lines.length - 1; while(k > 0 && !lines[k].trim()) k--;
      if(k > 0 && /^>/.test(lines[k].trim())){ while(k > 0 && /^>/.test(lines[k - 1].trim())) k--; lines.splice(k, 0, add, ""); return lines.join("\n"); }
      return src + "\n\n" + add; }
    lines.splice(i, 0, add, ""); return lines.join("\n"); };
  // Har fordypningen en overskrift som allerede finnes, erstatter den den korte seksjonen (ellers står overskriften to ganger).
  // En figur fra den korte seksjonen flyttes rett under samme overskrift i fordypningen, hvis den ikke er der fra før.
  const merge = (src, add) => { const heads = new Set(String(add).split("\n").filter(l => /^## /.test(l)).map(l => l.trim())), figs = {}, keep = []; let cut = null;
    for(const l of String(src).split("\n")){ if(/^## /.test(l)) cut = heads.has(l.trim()) ? l.trim() : null;
      if(!cut){ keep.push(l); continue; } if(/^!\[(fig|pic):/.test(l.trim()) && !String(add).includes(l.trim())) (figs[cut] ||= []).push(l.trim()); }
    const out = []; for(const l of String(add).split("\n")){ out.push(l); if(figs[l.trim()]) out.push("", ...figs[l.trim()], ""); }
    return put(keep.join("\n").replace(/\n{3,}/g, "\n\n"), out.join("\n")); };
  const ren = (s, a, b) => keepHead ? String(s) : String(s).replace(a, b);
  THEORY(code, u, { nb: ren(merge(doc.nb, nb), /^## (Begreper og formler|Begreper og regler|Begreper)$/m, "## Kort oppsummert"), en: ren(merge(doc.en || doc.nb, en), /^## (Concepts and formulas|Key concepts and rules|Concepts)$/m, "## In short") });
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
