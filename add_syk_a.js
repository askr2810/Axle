// ============================================================
//  add_syk_a.js – SYKEPLEIE: fagene i studiet + Legemiddelregning (SLMR)
//  Legemiddelregning er et eget eksamenskrav i sykepleierutdanningen (100 % riktig for å bestå),
//  så her er det mange generatorer: nye tall hver gang.
//  Innholdet er øvingsmateriell. Gjeldende retningslinjer, Felleskatalogen og lærebøkene gjelder alltid.
// ============================================================
GROUP_NAMES["Sykepleie: legemidler"] = ["Legemidler", "Medicines"];
GROUP_NAMES["Sykepleie: kropp og helse"] = ["Kropp og helse", "Body and health"];
GROUP_NAMES["Sykepleie: klinisk"] = ["Klinisk sykepleie", "Clinical nursing"];
const SYK_EQ = { nb: "Bachelor i sykepleie, 1. og 2. studieår", en: "Bachelor of Nursing, years 1–2" };
NEWCOURSE({ code: "SLMR", study: "syk", group: "Sykepleie: legemidler", nb: "Legemiddelregning", en: "Drug Calculations", s: ["LR", "DC"], eqText: SYK_EQ,
  units: [["Enheter og omregning", "Units and conversion"], ["Tabletter, mikstur og dose per kg", "Tablets, oral solutions and dose per kg"],
          ["Infusjon og dråpetakt", "Infusions and drip rate"], ["Fortynning og løsninger", "Dilution and solutions"]] });
NEWCOURSE({ code: "SANA", study: "syk", group: "Sykepleie: kropp og helse", nb: "Anatomi og fysiologi", en: "Anatomy and Physiology", s: ["AF", "AP"], eqText: SYK_EQ,
  units: [["Celler, vev og homeostase", "Cells, tissues and homeostasis"], ["Hjerte og sirkulasjon", "Heart and circulation"], ["Respirasjon", "Respiration"],
          ["Nervesystemet", "The nervous system"], ["Nyrer, væske og elektrolytter", "Kidneys, fluids and electrolytes"], ["Fordøyelse og ernæring", "Digestion and nutrition"]] });
NEWCOURSE({ code: "SFARM", study: "syk", group: "Sykepleie: legemidler", nb: "Farmakologi", en: "Pharmacology", s: ["Fa", "Ph"], eqText: SYK_EQ,
  units: [["Farmakokinetikk", "Pharmacokinetics"], ["Farmakodynamikk og bivirkninger", "Pharmacodynamics and adverse effects"],
          ["Viktige legemiddelgrupper", "Important drug classes"], ["Legemiddelhåndtering", "Medication management"]] });
NEWCOURSE({ code: "SMIK", study: "syk", group: "Sykepleie: kropp og helse", nb: "Mikrobiologi og smittevern", en: "Microbiology and Infection Control", s: ["MS", "MI"], eqText: SYK_EQ,
  units: [["Mikroorganismer", "Microorganisms"], ["Smittekjeden og basale smittevernrutiner", "The chain of infection and standard precautions"], ["Antibiotika og resistens", "Antibiotics and resistance"]] });
NEWCOURSE({ code: "SKLIN", study: "syk", group: "Sykepleie: klinisk", nb: "Klinisk sykepleie", en: "Clinical Nursing", s: ["KS", "CN"], eqText: SYK_EQ,
  units: [["Vitale tegn og normalverdier", "Vital signs and normal values"], ["NEWS2 og den akutt syke pasienten", "NEWS2 and the acutely ill patient"], ["Væskebalanse, ernæring og BMI", "Fluid balance, nutrition and BMI"]] });

(() => {
const SYK_NOTE_NB = "> Øvingsoppgaver. I praksis gjelder alltid legens forordning, Felleskatalogen og lokale prosedyrer, og utregninger kontrolleres av to.";
const SYK_NOTE_EN = "> Practice problems. In real practice, the prescription, the product information and local procedures always apply, and calculations are double-checked.";

// ================= SLMR 0: Enheter og omregning =================
THEORY("SLMR", 0, {
nb: `## Hva handler det om?
Nesten alle feil i legemiddelregning skyldes feil enhet, ikke vanskelig matte. Du må kunne gå sikkert mellom gram, milligram og mikrogram, mellom liter og milliliter, og vite hva prosent betyr for en løsning.

## Begreper og formler
- 1 g = 1000 mg, 1 mg = 1000 µg (mikrogram). Gå ett trinn ned: gang med 1000. Ett trinn opp: del på 1000.
- 1 l = 1000 ml, 1 dl = 100 ml.
- Styrke oppgis ofte som mg/ml: hvor mange mg virkestoff det er i hver ml.
- Prosent i en løsning betyr gram per 100 ml: 5 % glukose = 5 g glukose per 100 ml = 50 mg/ml.
- Promille (‰) betyr gram per 1000 ml: 9 ‰ = 9 g per liter = 9 mg/ml.
- Mengde = styrke × volum. Volum = mengde / styrke.

## Slik løser du oppgavene
1. Skriv ned hva du har (styrke) og hva du skal gi (dose).
2. Gjør enhetene like før du regner (for eksempel alt i mg).
3. Regn ut, og sjekk om svaret er rimelig: et svar på 40 tabletter eller 0,001 ml er nesten alltid feil.

### Eksempel
Hvor mange mg glukose er det i 500 ml glukose 5 %?
1. 5 % = 5 g per 100 ml.
2. 500 ml er 5 ganger 100 ml, altså 25 g.
3. 25 g = 25 000 mg.

## Vanlige feil
- Å blande mg og µg. En faktor 1000 feil kan være livsfarlig.
- Å tro at 5 % betyr 5 mg/ml. Det betyr 50 mg/ml.
- Å glemme å sjekke om svaret er rimelig.

> Samme enhet først, så regning. Prosent = g per 100 ml. Promille = g per 1000 ml.
${SYK_NOTE_NB}`,
en: `## What is it about?
Almost every error in drug calculations comes from the wrong unit, not from difficult maths. You must move confidently between grams, milligrams and micrograms, between litres and millilitres, and know what a percentage means for a solution.

## Concepts and formulas
- 1 g = 1000 mg, 1 mg = 1000 µg (micrograms). One step down: multiply by 1000. One step up: divide by 1000.
- 1 L = 1000 mL, 1 dL = 100 mL.
- Strength is often given as mg/mL: how many mg of active substance there is in each mL.
- Percent in a solution means grams per 100 mL: 5% glucose = 5 g glucose per 100 mL = 50 mg/mL.
- Per mille (‰) means grams per 1000 mL: 9‰ = 9 g per litre = 9 mg/mL.
- Amount = strength × volume. Volume = amount / strength.

## How to solve the problems
1. Write down what you have (strength) and what you must give (dose).
2. Make the units equal before calculating (for example everything in mg).
3. Calculate, and check that the answer is reasonable: 40 tablets or 0.001 mL is almost always wrong.

### Example
How many mg of glucose are there in 500 mL of glucose 5%?
1. 5% = 5 g per 100 mL.
2. 500 mL is 5 times 100 mL, so 25 g.
3. 25 g = 25,000 mg.

## Common mistakes
- Mixing up mg and µg. A factor of 1000 can be life-threatening.
- Thinking 5% means 5 mg/mL. It means 50 mg/mL.
- Forgetting to check whether the answer is reasonable.

> Same unit first, then calculate. Percent = g per 100 mL. Per mille = g per 1000 mL.
${SYK_NOTE_EN}`
});
BIQ("SLMR", 0, [
 ["Hvor mange mikrogram (µg) er 0,25 mg?", { n: 250, tol: 0, u: "µg" }, "1 mg = 1000 µg, så 0,25 mg = 0,25 · 1000 = 250 µg.",
  "How many micrograms (µg) is 0.25 mg?", null, "1 mg = 1000 µg, so 0.25 mg = 0.25 · 1000 = 250 µg."],
 ["Hva betyr en løsning på 5 %?", ["5 g per 100 ml", "5 mg per ml", "5 g per liter", "5 mg per 100 ml"], "Prosent i en løsning betyr gram per 100 ml. 5 % er altså 50 mg/ml.",
  "What does a 5% solution mean?", ["5 g per 100 mL", "5 mg per mL", "5 g per litre", "5 mg per 100 mL"], "Percent in a solution means grams per 100 mL. 5% is therefore 50 mg/mL."],
 ["Hvor mange mg/ml tilsvarer NaCl 9 ‰ (promille)?", { n: 9, tol: 0, u: "mg/ml" }, "9 ‰ = 9 g per 1000 ml = 9000 mg / 1000 ml = 9 mg/ml.",
  "How many mg/mL does NaCl 9‰ (per mille) correspond to?", null, "9‰ = 9 g per 1000 mL = 9000 mg / 1000 mL = 9 mg/mL."],
 ["Hvor mange gram glukose er det i 1 liter glukose 5 %?", { n: 50, tol: 0, u: "g" }, "5 % = 5 g per 100 ml. 1000 ml er 10 ganger så mye: 50 g.",
  "How many grams of glucose are there in 1 litre of glucose 5%?", null, "5% = 5 g per 100 mL. 1000 mL is 10 times as much: 50 g."],
 ["Du skal gi 0,5 g. Hvor mange mg er det?", { n: 500, tol: 0, u: "mg" }, "1 g = 1000 mg, så 0,5 g = 500 mg.",
  "You must give 0.5 g. How many mg is that?", null, "1 g = 1000 mg, so 0.5 g = 500 mg."],
 ["Hvilken omregning er riktig?", ["1 mg = 1000 µg", "1 µg = 1000 mg", "1 g = 100 mg", "1 ml = 100 µl"], "Mikro er én tusendel av milli: 1 mg = 1000 µg. Og 1 ml = 1000 µl.",
  "Which conversion is correct?", ["1 mg = 1000 µg", "1 µg = 1000 mg", "1 g = 100 mg", "1 mL = 100 µL"], "Micro is one thousandth of milli: 1 mg = 1000 µg. And 1 mL = 1000 µL."],
 ["Hvorfor bør man unngå å skrive «µg» for hånd, og heller skrive «mikrogram»?", ["µ kan leses som m, og da blir dosen 1000 ganger for stor", "Det er ikke en SI-enhet", "Det tar lengre tid", "Det er ikke lov i Norge"], "Et utydelig µ kan forveksles med m. Da gir man 1000 ganger for mye. Derfor skrives «mikrogram» ofte helt ut.",
  "Why should you avoid handwriting \"µg\" and write \"micrograms\" instead?", ["µ can be read as m, making the dose 1000 times too large", "It is not an SI unit", "It takes longer", "It is not allowed in Norway"], "An unclear µ can be mistaken for m, giving 1000 times too much. That is why \"micrograms\" is often written out in full."]
]);
GEN("SLMR", 0,
 // mg ↔ µg ↔ g
 () => { const kind = R.i(0, 2);
   if(kind === 0){ const mg = R.p([0.05, 0.1, 0.125, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 1.5]); const ug = mg * 1000;
     return [T(`Hvor mange mikrogram er ${nf(mg, 3)} mg?`, `How many micrograms is ${nf(mg, 3)} mg?`), { n: ug, tol: 0.01, u: "µg" },
       T(`1 mg = 1000 µg, så ${nf(mg, 3)} mg = ${nf(mg, 3)} · 1000 = ${nf(ug, 1)} µg.`, `1 mg = 1000 µg, so ${nf(mg, 3)} mg = ${nf(mg, 3)} · 1000 = ${nf(ug, 1)} µg.`)]; }
   if(kind === 1){ const ug = R.p([50, 75, 100, 125, 150, 200, 250, 500, 800]); const mg = ug / 1000;
     return [T(`Hvor mange mg er ${nf(ug)} mikrogram?`, `How many mg is ${nf(ug)} micrograms?`), { n: mg, tol: 0.0001, u: "mg" },
       T(`Del på 1000: ${nf(ug)} µg = ${nf(mg, 3)} mg.`, `Divide by 1000: ${nf(ug)} µg = ${nf(mg, 3)} mg.`)]; }
   const g = R.p([0.1, 0.25, 0.5, 1, 1.5, 2]); const mg = g * 1000;
   return [T(`Hvor mange mg er ${nf(g, 2)} g?`, `How many mg is ${nf(g, 2)} g?`), { n: mg, tol: 0.1, u: "mg" },
     T(`1 g = 1000 mg, så ${nf(g, 2)} g = ${nf(mg)} mg.`, `1 g = 1000 mg, so ${nf(g, 2)} g = ${nf(mg)} mg.`)]; },
 // prosentløsning → g eller mg/ml
 () => { const pct = R.p([0.9, 2, 5, 10, 20, 50]), vol = R.p([100, 250, 500, 1000]); const g = pct * vol / 100;
   return [T(`Hvor mange gram virkestoff er det i ${nf(vol)} ml av en ${nf(pct, 1)} % løsning?`, `How many grams of active substance are there in ${nf(vol)} mL of a ${nf(pct, 1)}% solution?`), { n: g, tol: 0.01, u: "g" },
     T(`${nf(pct, 1)} % = ${nf(pct, 1)} g per 100 ml. ${nf(vol)} ml: ${nf(pct, 1)} · ${nf(vol)}/100 = ${nf(g, 2)} g.`, `${nf(pct, 1)}% = ${nf(pct, 1)} g per 100 mL. ${nf(vol)} mL: ${nf(pct, 1)} · ${nf(vol)}/100 = ${nf(g, 2)} g.`)]; },
 () => { const pct = R.p([0.5, 1, 2, 5, 10, 20]); const mgml = pct * 10;
   return [T(`En løsning er ${nf(pct, 1)} %. Hvor mange mg/ml er det?`, `A solution is ${nf(pct, 1)}%. How many mg/mL is that?`), { n: mgml, tol: 0.01, u: "mg/ml" },
     T(`${nf(pct, 1)} % = ${nf(pct, 1)} g per 100 ml = ${nf(pct * 1000)} mg per 100 ml = ${nf(mgml, 1)} mg/ml. (Huskeregel: prosent · 10 = mg/ml.)`, `${nf(pct, 1)}% = ${nf(pct, 1)} g per 100 mL = ${nf(pct * 1000)} mg per 100 mL = ${nf(mgml, 1)} mg/mL. (Rule of thumb: percent · 10 = mg/mL.)`)]; }
);

// ================= SLMR 1: Tabletter, mikstur og dose per kg =================
THEORY("SLMR", 1, {
nb: `## Hva handler det om?
Den vanligste utregningen på en avdeling: legen har forordnet en dose, og du må finne ut hvor mange tabletter eller hvor mange ml mikstur pasienten skal ha. Hos barn og ved en del legemidler beregnes dosen ut fra kroppsvekt.

## Begreper og formler
- Antall tabletter = forordnet dose / styrke per tablett.
- Volum mikstur (ml) = forordnet dose / styrke (mg/ml).
- Dose per kg: døgndose = mg/kg/døgn × vekt. Deles døgndosen på flere doser, er enkeltdosen = døgndose / antall doser.
- Døgndose = enkeltdose × antall doser per døgn.

## Slik løser du oppgavene
1. Finn forordnet dose og styrke, i samme enhet.
2. Del dosen på styrken.
3. Ved dosering per kg: regn ut døgndosen først, og del så på antall doser.
4. Sjekk at svaret er rimelig. Delte tabletter bør være halve (bruk delestrek), og store avvik fra vanlig dose skal alltid tas opp.

### Eksempel
Et barn på 18 kg skal ha 30 mg/kg/døgn fordelt på 3 doser. Mikstur 50 mg/ml. Hvor mange ml per dose?
1. Døgndose: 30 · 18 = 540 mg.
2. Per dose: 540 / 3 = 180 mg.
3. Volum: 180 / 50 = 3,6 ml.

## Vanlige feil
- Å bruke døgndosen som enkeltdose (tre ganger for mye).
- Å regne med styrken i feil enhet (g i stedet for mg).
- Å snu brøken: styrke/dose i stedet for dose/styrke.

> Dose delt på styrke. Per kg: gang med vekten først, del på antall doser etterpå.
${SYK_NOTE_NB}`,
en: `## What is it about?
The most common calculation on a ward: the doctor has prescribed a dose, and you must work out how many tablets or how many mL of oral solution the patient should have. For children and for some drugs, the dose is calculated from body weight.

## Concepts and formulas
- Number of tablets = prescribed dose / strength per tablet.
- Volume of oral solution (mL) = prescribed dose / strength (mg/mL).
- Dose per kg: daily dose = mg/kg/day × weight. If the daily dose is split into several doses, the single dose = daily dose / number of doses.
- Daily dose = single dose × number of doses per day.

## How to solve the problems
1. Find the prescribed dose and the strength, in the same unit.
2. Divide the dose by the strength.
3. For weight-based dosing: work out the daily dose first, then divide by the number of doses.
4. Check that the answer is reasonable. Split tablets should be halves (use the score line), and large deviations from the usual dose must always be raised.

### Example
A child weighing 18 kg is to have 30 mg/kg/day divided into 3 doses. Oral solution 50 mg/mL. How many mL per dose?
1. Daily dose: 30 · 18 = 540 mg.
2. Per dose: 540 / 3 = 180 mg.
3. Volume: 180 / 50 = 3.6 mL.

## Common mistakes
- Using the daily dose as a single dose (three times too much).
- Using the strength in the wrong unit (g instead of mg).
- Flipping the fraction: strength/dose instead of dose/strength.

> Dose divided by strength. Per kg: multiply by weight first, divide by the number of doses afterwards.
${SYK_NOTE_EN}`
});
BIQ("SLMR", 1, [
 ["Forordnet: 1 g paracetamol. Tabletter à 500 mg. Hvor mange tabletter?", { n: 2, tol: 0, u: "" }, "1 g = 1000 mg. 1000 / 500 = 2 tabletter.",
  "Prescribed: 1 g paracetamol. Tablets of 500 mg. How many tablets?", null, "1 g = 1000 mg. 1000 / 500 = 2 tablets."],
 ["Hva er riktig formel for volum mikstur?", ["Volum = dose / styrke", "Volum = styrke / dose", "Volum = dose · styrke", "Volum = styrke − dose"], "Styrken er mg per ml. Hvor mange ml du trenger, er dosen delt på mg per ml.",
  "What is the correct formula for the volume of oral solution?", ["Volume = dose / strength", "Volume = strength / dose", "Volume = dose · strength", "Volume = strength − dose"], "The strength is mg per mL. The number of mL you need is the dose divided by mg per mL."],
 ["Et barn skal ha 10 mg/kg per dose og veier 22 kg. Hvor mange mg per dose?", { n: 220, tol: 0, u: "mg" }, "10 mg/kg · 22 kg = 220 mg per dose.",
  "A child is to have 10 mg/kg per dose and weighs 22 kg. How many mg per dose?", null, "10 mg/kg · 22 kg = 220 mg per dose."],
 ["Forordnet 7,5 mg. Tabletter à 5 mg med delestrek. Hvor mange tabletter?", { n: 1.5, tol: 0, u: "" }, "7,5 / 5 = 1,5 tabletter: én hel og én halv (delt langs delestreken).",
  "Prescribed 7.5 mg. Scored tablets of 5 mg. How many tablets?", null, "7.5 / 5 = 1.5 tablets: one whole and one half (split along the score line)."],
 ["Du regner ut at pasienten skal ha 12 tabletter i én dose. Hva gjør du?", ["Regner på nytt og kontakter lege eller farmasøyt før noe gis", "Gir tablettene, det er det utregningen sier", "Gir halvparten", "Knuser tablettene"], "Et så uvanlig svar tyder nesten alltid på en feil i utregning, enhet eller forordning. Stopp og dobbeltsjekk.",
  "You calculate that the patient should have 12 tablets in one dose. What do you do?", ["Recalculate and contact the doctor or pharmacist before giving anything", "Give the tablets, that is what the calculation says", "Give half", "Crush the tablets"], "Such an unusual answer almost always points to an error in the calculation, the unit or the prescription. Stop and double-check."],
 ["Døgndosen er 1200 mg fordelt på 4 doser. Hvor stor er hver dose?", { n: 300, tol: 0, u: "mg" }, "1200 / 4 = 300 mg per dose.",
  "The daily dose is 1200 mg divided into 4 doses. How large is each dose?", null, "1200 / 4 = 300 mg per dose."]
]);
GEN("SLMR", 1,
 // antall tabletter
 () => { const str = R.p([2.5, 5, 10, 20, 25, 40, 50, 100, 250, 500]), k = R.p([0.5, 1, 1.5, 2, 3]); const dose = str * k;
   return [T(`Forordnet dose er ${nf(dose, 1)} mg. Tablettene er à ${nf(str, 1)} mg (med delestrek). Hvor mange tabletter skal pasienten ha?`, `The prescribed dose is ${nf(dose, 1)} mg. The tablets are ${nf(str, 1)} mg each (scored). How many tablets should the patient have?`),
     { n: k, tol: 0, u: T("tabletter", "tablets") }, T(`Dose / styrke = ${nf(dose, 1)} / ${nf(str, 1)} = ${nf(k, 1)} tabletter.`, `Dose / strength = ${nf(dose, 1)} / ${nf(str, 1)} = ${nf(k, 1)} tablets.`)]; },
 // ml mikstur
 () => { const str = R.p([10, 20, 24, 25, 40, 50, 100]), dose = R.p([60, 80, 100, 120, 150, 200, 240, 250, 300]); const ml = dose / str;
   return [T(`Forordnet ${nf(dose)} mg. Miksturen har styrke ${nf(str)} mg/ml. Hvor mange ml skal du trekke opp?`, `Prescribed ${nf(dose)} mg. The oral solution has a strength of ${nf(str)} mg/mL. How many mL should you draw up?`),
     { n: ml, tol: 0.05, u: "ml" }, T(`Volum = dose / styrke = ${nf(dose)} / ${nf(str)} = ${nf(ml, 2)} ml.`, `Volume = dose / strength = ${nf(dose)} / ${nf(str)} = ${nf(ml, 2)} mL.`)]; },
 // mg/kg/døgn → ml per dose
 () => { const w = R.i(8, 40), perkg = R.p([10, 15, 20, 30, 40, 50]), n = R.p([2, 3, 4]), str = R.p([20, 25, 40, 50, 100]);
   const day = perkg * w, one = day / n, ml = one / str;
   return [T(`Et barn på ${w} kg skal ha ${perkg} mg/kg/døgn fordelt på ${n} doser. Miksturen er ${str} mg/ml. Hvor mange ml per dose?`, `A child weighing ${w} kg is to have ${perkg} mg/kg/day divided into ${n} doses. The oral solution is ${str} mg/mL. How many mL per dose?`),
     { n: ml, tol: 0.05, u: "ml" },
     T(`Døgndose: ${perkg} · ${w} = ${nf(day)} mg. Per dose: ${nf(day)} / ${n} = ${nf(one, 1)} mg. Volum: ${nf(one, 1)} / ${str} = ${nf(ml, 2)} ml.`, `Daily dose: ${perkg} · ${w} = ${nf(day)} mg. Per dose: ${nf(day)} / ${n} = ${nf(one, 1)} mg. Volume: ${nf(one, 1)} / ${str} = ${nf(ml, 2)} mL.`)]; },
 // g forordnet, mg tabletter
 () => { const g = R.p([0.5, 1, 1.5, 2]), str = R.p([250, 500]); const k = g * 1000 / str;
   return [T(`Forordnet ${nf(g, 1)} g. Tabletter à ${str} mg. Hvor mange tabletter?`, `Prescribed ${nf(g, 1)} g. Tablets of ${str} mg. How many tablets?`), { n: k, tol: 0, u: T("tabletter", "tablets") },
     T(`${nf(g, 1)} g = ${nf(g * 1000)} mg. ${nf(g * 1000)} / ${str} = ${nf(k)} tabletter.`, `${nf(g, 1)} g = ${nf(g * 1000)} mg. ${nf(g * 1000)} / ${str} = ${nf(k)} tablets.`)]; }
);

// ================= SLMR 2: Infusjon og dråpetakt =================
THEORY("SLMR", 2, {
nb: `## Hva handler det om?
Intravenøs væske og legemidler gis ofte som infusjon over tid. Med infusjonspumpe stiller du inn ml per time. Uten pumpe (gravitasjon) teller du dråper per minutt, og da må du vite hvor mange dråper infusjonssettet gir per ml.

## Begreper og formler
- Infusjonshastighet: ml/t = volum (ml) / tid (timer).
- Dråpetakt: dråper/min = volum (ml) · dråpefaktor (dråper/ml) / tid (minutter).
- Vanlig infusjonssett: 20 dråper/ml. Mikrodryppsett: 60 dråper/ml (da er dråper/min = ml/t).
- Tid: timer = volum / (ml/t).

## Slik løser du oppgavene
1. Gjør tiden om til riktig enhet: timer for ml/t, minutter for dråper/min.
2. Sett inn i formelen.
3. Dråper rundes til nærmeste hele dråpe. Pumper kan stilles på desimaler.

### Eksempel
1000 ml NaCl skal gå over 8 timer med et sett på 20 dråper/ml. Hva blir dråpetakten?
1. Tid: 8 t = 480 min.
2. Dråper/min = 1000 · 20 / 480 ≈ 41,7.
3. Omtrent 42 dråper per minutt. (Med pumpe: 1000 / 8 = 125 ml/t.)

## Vanlige feil
- Å bruke timer der formelen krever minutter.
- Å glemme dråpefaktoren.
- Å regne ml/t når oppgaven spør om dråper/min, eller omvendt.

> ml/t = volum / timer. Dråper/min = volum · dråpefaktor / minutter.
${SYK_NOTE_NB}`,
en: `## What is it about?
Intravenous fluids and drugs are often given as an infusion over time. With an infusion pump you set mL per hour. Without a pump (gravity) you count drops per minute, and then you must know how many drops the giving set delivers per mL.

## Concepts and formulas
- Infusion rate: mL/h = volume (mL) / time (hours).
- Drip rate: drops/min = volume (mL) · drop factor (drops/mL) / time (minutes).
- Standard giving set: 20 drops/mL. Micro-drip set: 60 drops/mL (then drops/min = mL/h).
- Time: hours = volume / (mL/h).

## How to solve the problems
1. Convert the time to the right unit: hours for mL/h, minutes for drops/min.
2. Insert into the formula.
3. Drops are rounded to the nearest whole drop. Pumps can be set with decimals.

### Example
1000 mL of saline is to run over 8 hours with a set of 20 drops/mL. What is the drip rate?
1. Time: 8 h = 480 min.
2. Drops/min = 1000 · 20 / 480 ≈ 41.7.
3. About 42 drops per minute. (With a pump: 1000 / 8 = 125 mL/h.)

## Common mistakes
- Using hours where the formula needs minutes.
- Forgetting the drop factor.
- Calculating mL/h when the problem asks for drops/min, or the other way round.

> mL/h = volume / hours. Drops/min = volume · drop factor / minutes.
${SYK_NOTE_EN}`
});
BIQ("SLMR", 2, [
 ["500 ml skal gå over 4 timer på pumpe. Hvor mange ml/t?", { n: 125, tol: 0, u: "ml/t" }, "500 / 4 = 125 ml/t.",
  "500 mL is to run over 4 hours on a pump. How many mL/h?", null, "500 / 4 = 125 mL/h."],
 ["Hvor mange dråper per ml gir et vanlig infusjonssett (hvis ikke annet er oppgitt)?", ["20", "60", "10", "100"], "Standard infusjonssett gir 20 dråper/ml. Mikrodryppsett gir 60 dråper/ml.",
  "How many drops per mL does a standard giving set deliver (unless stated otherwise)?", ["20", "60", "10", "100"], "A standard giving set delivers 20 drops/mL. A micro-drip set delivers 60 drops/mL."],
 ["Med mikrodryppsett (60 dråper/ml): hvor mange dråper/min tilsvarer 30 ml/t?", { n: 30, tol: 0, u: "" }, "30 ml/t · 60 dråper/ml / 60 min = 30 dråper/min. Med 60-sett er dråper/min lik ml/t.",
  "With a micro-drip set (60 drops/mL): how many drops/min correspond to 30 mL/h?", null, "30 mL/h · 60 drops/mL / 60 min = 30 drops/min. With a 60-set, drops/min equals mL/h."],
 ["En infusjon går med 100 ml/t. Hvor lang tid tar 250 ml?", { n: 2.5, tol: 0, u: "t" }, "Tid = volum / hastighet = 250 / 100 = 2,5 timer (2 t 30 min).",
  "An infusion runs at 100 mL/h. How long do 250 mL take?", null, "Time = volume / rate = 250 / 100 = 2.5 hours (2 h 30 min)."],
 ["Hva er formelen for dråpetakt?", ["volum · dråpefaktor / minutter", "volum / (dråpefaktor · timer)", "minutter · dråpefaktor / volum", "volum · timer / dråpefaktor"], "Dråper totalt (volum · dråpefaktor) fordelt på antall minutter.",
  "What is the formula for drip rate?", ["volume · drop factor / minutes", "volume / (drop factor · hours)", "minutes · drop factor / volume", "volume · hours / drop factor"], "Total drops (volume · drop factor) spread over the number of minutes."]
]);
GEN("SLMR", 2,
 () => { const vol = R.p([100, 250, 500, 1000]), h = R.p([0.5, 1, 2, 3, 4, 6, 8, 12, 24]); const r = vol / h;
   return [T(`${nf(vol)} ml skal gis over ${nf(h, 1)} timer på infusjonspumpe. Hvor mange ml/t skal pumpen stilles på?`, `${nf(vol)} mL is to be given over ${nf(h, 1)} hours on an infusion pump. How many mL/h should the pump be set to?`),
     { n: r, tol: 0.1, u: T("ml/t", "mL/h") }, T(`ml/t = ${nf(vol)} / ${nf(h, 1)} = ${nf(r, 1)} ml/t.`, `mL/h = ${nf(vol)} / ${nf(h, 1)} = ${nf(r, 1)} mL/h.`)]; },
 () => { const vol = R.p([250, 500, 1000]), h = R.p([2, 3, 4, 6, 8, 10, 12]), df = 20; const min = h * 60, d = vol * df / min;
   return [T(`${nf(vol)} ml skal gå over ${h} timer. Infusjonssettet gir ${df} dråper/ml. Hvor mange dråper per minutt (rund til hele dråper)?`, `${nf(vol)} mL is to run over ${h} hours. The giving set delivers ${df} drops/mL. How many drops per minute (round to whole drops)?`),
     { n: Math.round(d), tol: 1, u: T("dråper/min", "drops/min") },
     T(`${h} t = ${min} min. Dråper/min = ${nf(vol)} · ${df} / ${min} = ${nf(d, 1)}, altså ${Math.round(d)} dråper/min.`, `${h} h = ${min} min. Drops/min = ${nf(vol)} · ${df} / ${min} = ${nf(d, 1)}, i.e. ${Math.round(d)} drops/min.`)]; },
 () => { const vol = R.p([100, 250, 500, 1000]), rate = R.p([25, 50, 75, 100, 125, 150, 200, 250]); const h = vol / rate;
   return [T(`En infusjon på ${nf(vol)} ml går med ${rate} ml/t. Hvor mange timer tar den?`, `An infusion of ${nf(vol)} mL runs at ${rate} mL/h. How many hours does it take?`), { n: h, tol: 0.02, u: T("timer", "hours") },
     T(`Tid = ${nf(vol)} / ${rate} = ${nf(h, 2)} timer.`, `Time = ${nf(vol)} / ${rate} = ${nf(h, 2)} hours.`)]; },
 // legemiddel i infusjon: mg/t → ml/t
 () => { const mg = R.p([50, 100, 200, 250, 500]), vol = R.p([50, 100, 250, 500]), want = R.p([5, 10, 12.5, 20, 25]); const conc = mg / vol, rate = want / conc;
   return [T(`${mg} mg legemiddel er løst i ${vol} ml. Pasienten skal ha ${nf(want, 1)} mg/t. Hvor mange ml/t skal pumpen gå på?`, `${mg} mg of drug is dissolved in ${vol} mL. The patient is to have ${nf(want, 1)} mg/h. How many mL/h should the pump run at?`),
     { n: rate, tol: 0.05, u: T("ml/t", "mL/h") },
     T(`Konsentrasjon: ${mg} / ${vol} = ${nf(conc, 3)} mg/ml. ml/t = ${nf(want, 1)} / ${nf(conc, 3)} = ${nf(rate, 2)} ml/t.`, `Concentration: ${mg} / ${vol} = ${nf(conc, 3)} mg/mL. mL/h = ${nf(want, 1)} / ${nf(conc, 3)} = ${nf(rate, 2)} mL/h.`)]; }
);

// ================= SLMR 3: Fortynning og løsninger =================
THEORY("SLMR", 3, {
nb: `## Hva handler det om?
Noen legemidler må fortynnes før de gis, og noen ganger må du trekke opp en bestemt dose fra en ampulle. Grunnregelen er at mengden virkestoff er den samme før og etter fortynning, bare fordelt på mer væske.

## Begreper og formler
- Mengde virkestoff = konsentrasjon · volum.
- Fortynning: $C_1 V_1 = C_2 V_2$. Konsentrasjon og volum før fortynning ganger sammen er lik konsentrasjon og volum etter.
- Væske som skal tilsettes = $V_2 - V_1$.
- Fra ampulle: volum å trekke opp = dose / konsentrasjon i ampullen.

## Slik løser du oppgavene
1. Finn hvilke tre av de fire størrelsene i $C_1V_1 = C_2V_2$ du kjenner.
2. Løs for den fjerde.
3. Spør oppgaven hvor mye som skal tilsettes, trekk fra startvolumet.

### Eksempel
Du har 10 ml av en løsning på 50 mg/ml og skal fortynne til 10 mg/ml. Hvor mye væske må tilsettes?
1. $V_2 = C_1V_1 / C_2 = 50 \\cdot 10 / 10 = 50$ ml.
2. Tilsett 50 − 10 = 40 ml.

## Vanlige feil
- Å svare med sluttvolumet når oppgaven spør hvor mye som skal tilsettes.
- Å blande prosent og mg/ml uten å regne om (1 % = 10 mg/ml).

> Mengden virkestoff endres ikke ved fortynning: $C_1 V_1 = C_2 V_2$.
${SYK_NOTE_NB}`,
en: `## What is it about?
Some drugs must be diluted before they are given, and sometimes you must draw up a specific dose from an ampoule. The basic rule is that the amount of active substance is the same before and after dilution, just spread over more fluid.

## Concepts and formulas
- Amount of active substance = concentration · volume.
- Dilution: $C_1 V_1 = C_2 V_2$. Concentration times volume before dilution equals concentration times volume after.
- Fluid to add = $V_2 - V_1$.
- From an ampoule: volume to draw up = dose / concentration in the ampoule.

## How to solve the problems
1. Find which three of the four quantities in $C_1V_1 = C_2V_2$ you know.
2. Solve for the fourth.
3. If the problem asks how much to add, subtract the starting volume.

### Example
You have 10 mL of a 50 mg/mL solution and must dilute it to 10 mg/mL. How much fluid must be added?
1. $V_2 = C_1V_1 / C_2 = 50 \\cdot 10 / 10 = 50$ mL.
2. Add 50 − 10 = 40 mL.

## Common mistakes
- Answering with the final volume when the problem asks how much to add.
- Mixing percent and mg/mL without converting (1% = 10 mg/mL).

> The amount of active substance does not change when you dilute: $C_1 V_1 = C_2 V_2$.
${SYK_NOTE_EN}`
});
BIQ("SLMR", 3, [
 ["En ampulle inneholder 10 mg/ml. Du skal gi 25 mg. Hvor mange ml trekker du opp?", { n: 2.5, tol: 0, u: "ml" }, "25 / 10 = 2,5 ml.",
  "An ampoule contains 10 mg/mL. You must give 25 mg. How many mL do you draw up?", null, "25 / 10 = 2.5 mL."],
 ["Hva sier fortynningsformelen?", ["$C_1V_1 = C_2V_2$", "$C_1/V_1 = C_2/V_2$", "$C_1 + V_1 = C_2 + V_2$", "$C_1V_2 = C_2V_1$"], "Mengden virkestoff (konsentrasjon · volum) er lik før og etter.",
  "What does the dilution formula say?", ["$C_1V_1 = C_2V_2$", "$C_1/V_1 = C_2/V_2$", "$C_1 + V_1 = C_2 + V_2$", "$C_1V_2 = C_2V_1$"], "The amount of active substance (concentration · volume) is the same before and after."],
 ["2 ml av 40 mg/ml fortynnes til 20 ml. Hva blir ny konsentrasjon?", { n: 4, tol: 0, u: "mg/ml" }, "$C_2 = C_1V_1/V_2 = 40 \\cdot 2 / 20 = 4$ mg/ml.",
  "2 mL of 40 mg/mL is diluted to 20 mL. What is the new concentration?", null, "$C_2 = C_1V_1/V_2 = 40 \\cdot 2 / 20 = 4$ mg/mL."],
 ["Du fortynner en løsning ved å tilsette væske. Hva skjer med mengden virkestoff?", ["Den er uendret", "Den øker", "Den synker", "Den halveres alltid"], "Du tilsetter bare løsningsmiddel, så antall mg er det samme. Det er konsentrasjonen som synker.",
  "You dilute a solution by adding fluid. What happens to the amount of active substance?", ["It is unchanged", "It increases", "It decreases", "It is always halved"], "You only add solvent, so the number of mg is the same. It is the concentration that falls."]
]);
GEN("SLMR", 3,
 () => { const c = R.p([2, 5, 10, 20, 25, 40, 50, 100]), k = R.p([0.2, 0.25, 0.4, 0.5, 0.75, 1, 1.5, 2, 3]); const dose = c * k;
   return [T(`Ampullen inneholder ${c} mg/ml. Forordnet dose er ${nf(dose, 1)} mg. Hvor mange ml skal du trekke opp?`, `The ampoule contains ${c} mg/mL. The prescribed dose is ${nf(dose, 1)} mg. How many mL should you draw up?`),
     { n: k, tol: 0.01, u: "ml" }, T(`Volum = ${nf(dose, 1)} / ${c} = ${nf(k, 2)} ml.`, `Volume = ${nf(dose, 1)} / ${c} = ${nf(k, 2)} mL.`)]; },
 () => { const c1 = R.p([20, 40, 50, 100]), v1 = R.p([1, 2, 5, 10]), c2 = R.p([1, 2, 4, 5, 10]); const v2 = c1 * v1 / c2, add = v2 - v1;
   return [T(`Du har ${v1} ml av en løsning på ${c1} mg/ml og skal fortynne til ${c2} mg/ml. Hvor mange ml væske må du tilsette?`, `You have ${v1} mL of a ${c1} mg/mL solution and must dilute it to ${c2} mg/mL. How many mL of fluid must you add?`),
     { n: add, tol: 0.05, u: "ml" },
     T(`Sluttvolum: $V_2 = ${c1} \\cdot ${v1} / ${c2} = ${mf(v2, 1)}$ ml. Tilsett ${nf(v2, 1)} − ${v1} = ${nf(add, 1)} ml.`, `Final volume: $V_2 = ${c1} \\cdot ${v1} / ${c2} = ${mf(v2, 1)}$ mL. Add ${nf(v2, 1)} − ${v1} = ${nf(add, 1)} mL.`)]; },
 () => { const pct = R.p([1, 2, 5]), dose = R.p([20, 40, 50, 100, 150, 200]); const mgml = pct * 10, ml = dose / mgml;
   return [T(`Du har en ${pct} % løsning. Pasienten skal ha ${dose} mg. Hvor mange ml?`, `You have a ${pct}% solution. The patient is to have ${dose} mg. How many mL?`), { n: ml, tol: 0.01, u: "ml" },
     T(`${pct} % = ${mgml} mg/ml. Volum = ${dose} / ${mgml} = ${nf(ml, 2)} ml.`, `${pct}% = ${mgml} mg/mL. Volume = ${dose} / ${mgml} = ${nf(ml, 2)} mL.`)]; }
);
})();
