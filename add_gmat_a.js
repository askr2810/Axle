// ============================================================
//  GMAT – Grunnleggende matematikk, enhet 0–3
//  (tall/brøk/prosent, potenser/røtter/tierpotenser, algebra/ligninger, funksjoner/grafer)
//  Teori, faste oppgaver (BIQ) og generatorer (GEN). Alt i en IIFE så hjelperne ikke kolliderer med andre filer.
// ============================================================
;(() => {
// ---------- lokale hjelpere ----------
const gd = (a, b) => b ? gd(b, a % b) : Math.abs(a);
const lcm = (a, b) => a / gd(a, b) * b;
const par = n => n < 0 ? `(${n})` : `${n}`;                 // negativt tall i parentes
const sg = n => n < 0 ? `- ${-n}` : `+ ${n}`;                // fortegn + tall: "+ 3" / "- 3"
// ett ledd med koeffisient n og variabel v ("x^2", "x", ""), first = første ledd i uttrykket
const term = (n, v, first) => { if (n === 0) return ""; const a = Math.abs(n), body = v ? (a === 1 ? v : a + v) : String(a);
  return (first ? (n < 0 ? "-" : "") : (n < 0 ? " - " : " + ")) + body; };
// polynom fra høyeste grad: poly(A,B,C) = Ax^2 + Bx + C
const poly = (...cs) => { const d = cs.length - 1; let s = ""; cs.forEach((c, i) => { const p = d - i; s += term(c, p === 0 ? "" : p === 1 ? "x" : "x^" + p, s === ""); }); return s || "0"; };
// forkortet brøk i LaTeX (heltall hvis nevneren blir 1)
const fr = (p, q) => { if (q < 0) { p = -p; q = -q; } const g = gd(Math.abs(p), q) || 1; p /= g; q /= g;
  return q === 1 ? `${p}` : (p < 0 ? `-\\frac{${-p}}{${q}}` : `\\frac{${p}}{${q}}`); };
const uniq = (arr, n) => { const out = []; for (const x of arr) if (!out.includes(x)) out.push(x); return out.slice(0, n); };
const ap = x => Math.abs(Math.round(x * 1e4) - x * 1e4) < 1e-6 ? "=" : "\\approx";   // "=" hvis eksakt med 4 desimaler

// =====================================================================
//  ENHET 0: Tall, brøk og prosent
// =====================================================================
THEORY("GMAT", 0, {
nb: `## Hva handler det om?
All ingeniørmatematikk bygger på vanlig tallregning. Før du kan derivere, løse ligninger eller regne på krefter og strømmer, må du kunne regne sikkert med negative tall, brøk, desimaltall og prosent – uten å gjette på rekkefølgen. Denne enheten starter helt fra bunnen og gir deg reglene du kommer til å bruke i alle de andre fagene.

Brøk og prosent er to måter å beskrive **en del av en helhet** på. En ingeniør bruker dem hele tiden: virkningsgrad, stigning på en vei, blandingsforhold i betong, toleranser og prisendringer.

## Begreper og regler
- **Regnerekkefølge:** 1) parenteser, 2) potenser, 3) ganging og deling (fra venstre mot høyre), 4) pluss og minus (fra venstre mot høyre). Eksempel: $2 + 3\\cdot 4 = 2 + 12 = 14$.
- **Negative tall:** minus ganger minus gir pluss, og minus ganger pluss gir minus. Å trekke fra et negativt tall er det samme som å legge til: $5 - (-3) = 5 + 3 = 8$.
- **Brøk:** $\\frac{a}{b}$ betyr $a$ delt på $b$. Tallet $a$ over brøkstreken er **telleren**, og $b$ under er **nevneren**. Nevneren kan aldri være 0.
- **Forkorte og utvide:** du kan dele (eller gange) teller og nevner med samme tall uten å endre verdien: $\\frac{6}{8} = \\frac{3}{4}$.
- **Pluss og minus med brøk:** skriv brøkene med **felles nevner** først, og legg så sammen tellerne: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.
- **Ganging:** teller ganger teller og nevner ganger nevner: $\\frac{2}{3}\\cdot\\frac{3}{5} = \\frac{6}{15} = \\frac{2}{5}$.
- **Deling:** gang med den omvendte brøken: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b}\\cdot\\frac{d}{c}$.
- **Prosent** betyr hundredeler: $p\\,\\% = \\frac{p}{100}$. Altså er $25\\,\\% = 0{,}25 = \\frac{1}{4}$.
- **Forhold:** $1 : 2 : 3$ betyr 1 del, 2 deler og 3 deler, til sammen 6 like store deler.
- **Vekstfaktor:** en økning på $p\\,\\%$ er det samme som å gange med $1 + \\frac{p}{100}$, og en nedgang på $p\\,\\%$ er å gange med $1 - \\frac{p}{100}$.

$$\\text{prosentvis endring} = \\frac{\\text{ny verdi} - \\text{gammel verdi}}{\\text{gammel verdi}}\\cdot 100\\,\\%$$

## Slik løser du oppgavene
1. Se etter parenteser og regn dem ut først. Deretter potenser, så ganging og deling, og til slutt pluss og minus.
2. Sett negative tall i parentes når du setter dem inn i et uttrykk, for eksempel $3\\cdot(-2)$.
3. Brøk: finn felles nevner ved pluss og minus, gang rett over ved ganging, og snu den andre brøken ved deling. Forkort til slutt.
4. Prosent: skriv prosenten som desimaltall eller som vekstfaktor, og gang. Flere endringer etter hverandre gir flere vekstfaktorer som ganges sammen.
5. Kontroller svaret: er størrelsen rimelig? Et prisavslag skal for eksempel gi lavere pris.

### Eksempel
Regn ut $\\frac{2}{3} + \\frac{1}{4}\\cdot 2$.

Ganging først: $\\frac{1}{4}\\cdot 2 = \\frac{2}{4} = \\frac{1}{2}$. Felles nevner er 6:

$$\\frac{2}{3} + \\frac{1}{2} = \\frac{4}{6} + \\frac{3}{6} = \\frac{7}{6} \\approx 1{,}17$$

En elektromotor koster 8000 kr. Prisen økes med 25 %, og senere settes den ned med 20 %. Vekstfaktorene er $1{,}25$ og $0{,}80$:

$$8000\\cdot 1{,}25\\cdot 0{,}80 = 8000\\cdot 1{,}00 = 8000\\ \\text{kr}$$

Prisen er altså tilbake der den startet, selv om 25 og 20 ikke er like tall. Grunnen er at de 20 prosentene regnes av et større beløp enn de 25 prosentene ble regnet av.

## Vanlige feil
- Å regne fra venstre mot høyre uten å tenke på rekkefølgen: $2 + 3\\cdot 4$ er 14, ikke 20.
- Å tro at $-3^2 = 9$. Potensen gjelder bare tallet 3, så $-3^2 = -9$, mens $(-3)^2 = 9$.
- Å legge sammen nevnerne: $\\frac{1}{2} + \\frac{1}{3}$ er **ikke** $\\frac{2}{5}$.
- Å tro at +20 % og deretter −20 % gir samme verdi som før. Riktig er $1{,}2\\cdot 0{,}8 = 0{,}96$, altså 4 % lavere.
- Å blande prosent og prosentpoeng. Når renten går fra 2 % til 3 %, har den økt med 1 prosentpoeng, men med 50 %.
- Å dele på feil tall ved prosentvis endring. Del alltid på den **gamle** verdien.

> Regnerekkefølge: parenteser – potenser – ganging og deling – pluss og minus. Prosent er hundredeler, og prosentvise endringer regnes med vekstfaktorer som ganges sammen.`,
en: `## What is it about?
All engineering mathematics rests on ordinary arithmetic. Before you can differentiate, solve equations or calculate forces and currents, you must be able to work confidently with negative numbers, fractions, decimals and percentages – without guessing the order of operations. This unit starts from scratch and gives you the rules you will use in every other course.

Fractions and percentages are two ways of describing **a part of a whole**. Engineers use them all the time: efficiency, the gradient of a road, mixing ratios in concrete, tolerances and price changes.

## Concepts and rules
- **Order of operations:** 1) parentheses, 2) powers, 3) multiplication and division (left to right), 4) addition and subtraction (left to right). Example: $2 + 3\\cdot 4 = 2 + 12 = 14$.
- **Negative numbers:** minus times minus gives plus, and minus times plus gives minus. Subtracting a negative number is the same as adding: $5 - (-3) = 5 + 3 = 8$.
- **Fraction:** $\\frac{a}{b}$ means $a$ divided by $b$. The number $a$ above the fraction bar is the **numerator**, and $b$ below it is the **denominator**. The denominator can never be 0.
- **Simplifying and expanding:** you can divide (or multiply) the numerator and the denominator by the same number without changing the value: $\\frac{6}{8} = \\frac{3}{4}$.
- **Adding and subtracting fractions:** first write the fractions with a **common denominator**, then add the numerators: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.
- **Multiplication:** numerator times numerator and denominator times denominator: $\\frac{2}{3}\\cdot\\frac{3}{5} = \\frac{6}{15} = \\frac{2}{5}$.
- **Division:** multiply by the reciprocal (the fraction turned upside down): $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b}\\cdot\\frac{d}{c}$.
- **Percent** means hundredths: $p\\% = \\frac{p}{100}$. So $25\\% = 0.25 = \\frac{1}{4}$.
- **Ratio:** $1 : 2 : 3$ means 1 part, 2 parts and 3 parts, making 6 equal parts in total.
- **Growth factor:** an increase of $p\\%$ is the same as multiplying by $1 + \\frac{p}{100}$, and a decrease of $p\\%$ means multiplying by $1 - \\frac{p}{100}$.

$$\\text{percentage change} = \\frac{\\text{new value} - \\text{old value}}{\\text{old value}}\\cdot 100\\%$$

## How to solve the problems
1. Look for parentheses and evaluate them first. Then powers, then multiplication and division, and finally addition and subtraction.
2. Put negative numbers in parentheses when you substitute them into an expression, for example $3\\cdot(-2)$.
3. Fractions: find a common denominator for addition and subtraction, multiply straight across for multiplication, and flip the second fraction for division. Simplify at the end.
4. Percent: write the percentage as a decimal or as a growth factor, and multiply. Several changes in a row give several growth factors that are multiplied together.
5. Check the answer: is the size reasonable? A discount, for example, must give a lower price.

### Example
Calculate $\\frac{2}{3} + \\frac{1}{4}\\cdot 2$.

Multiplication first: $\\frac{1}{4}\\cdot 2 = \\frac{2}{4} = \\frac{1}{2}$. The common denominator is 6:

$$\\frac{2}{3} + \\frac{1}{2} = \\frac{4}{6} + \\frac{3}{6} = \\frac{7}{6} \\approx 1.17$$

An electric motor costs NOK 8000. The price is raised by 25%, and later it is reduced by 20%. The growth factors are $1.25$ and $0.80$:

$$8000\\cdot 1.25\\cdot 0.80 = 8000\\cdot 1.00 = 8000\\ \\text{NOK}$$

So the price is back where it started, even though 25 and 20 are different numbers. The reason is that the 20 percent is taken of a larger amount than the 25 percent was.

## Common mistakes
- Working from left to right without thinking about the order: $2 + 3\\cdot 4$ is 14, not 20.
- Believing that $-3^2 = 9$. The power applies only to the number 3, so $-3^2 = -9$, while $(-3)^2 = 9$.
- Adding the denominators: $\\frac{1}{2} + \\frac{1}{3}$ is **not** $\\frac{2}{5}$.
- Believing that +20% followed by −20% gives the original value. The correct result is $1.2\\cdot 0.8 = 0.96$, i.e. 4% lower.
- Mixing up percent and percentage points. When an interest rate goes from 2% to 3%, it has increased by 1 percentage point, but by 50%.
- Dividing by the wrong number in a percentage change. Always divide by the **old** value.

> Order of operations: parentheses – powers – multiplication and division – addition and subtraction. Percent means hundredths, and percentage changes are handled with growth factors that are multiplied together.`
});

BIQ("GMAT", 0, [
  ["Hva er $2 + 3\\cdot 4$?", ["14", "20", "24", "9"],
   "Ganging før pluss: $3\\cdot 4 = 12$, og $2 + 12 = 14$. Svaret 20 får du hvis du feilaktig regner $2 + 3$ først.",
   "What is $2 + 3\\cdot 4$?", ["14", "20", "24", "9"],
   "Multiplication before addition: $3\\cdot 4 = 12$, and $2 + 12 = 14$. You get 20 if you wrongly add $2 + 3$ first."],
  ["Hva er $-3^2$?", ["$-9$", "$9$", "$-6$", "$6$"],
   "Potensen gjelder bare tallet 3, ikke minustegnet: $-3^2 = -(3\\cdot 3) = -9$. Med parentes blir det annerledes: $(-3)^2 = (-3)\\cdot(-3) = 9$.",
   "What is $-3^2$?", ["$-9$", "$9$", "$-6$", "$6$"],
   "The power applies only to the number 3, not to the minus sign: $-3^2 = -(3\\cdot 3) = -9$. With parentheses it is different: $(-3)^2 = (-3)\\cdot(-3) = 9$."],
  ["Hva er $\\frac{1}{2} + \\frac{1}{3}$?", ["$\\frac{5}{6}$", "$\\frac{2}{5}$", "$\\frac{2}{6}$", "$\\frac{1}{6}$"],
   "Felles nevner er 6: $\\frac{1}{2} = \\frac{3}{6}$ og $\\frac{1}{3} = \\frac{2}{6}$, så summen er $\\frac{5}{6}$. Nevnerne skal aldri legges sammen.",
   "What is $\\frac{1}{2} + \\frac{1}{3}$?", ["$\\frac{5}{6}$", "$\\frac{2}{5}$", "$\\frac{2}{6}$", "$\\frac{1}{6}$"],
   "The common denominator is 6: $\\frac{1}{2} = \\frac{3}{6}$ and $\\frac{1}{3} = \\frac{2}{6}$, so the sum is $\\frac{5}{6}$. The denominators are never added."],
  ["Prisen på en vare økes med 20 %, og deretter settes den ned med 20 %. Hva har skjedd med prisen totalt?",
   ["Den er 4 % lavere enn før", "Den er den samme som før", "Den er 4 % høyere enn før", "Den er 20 % lavere enn før"],
   "Vekstfaktorene ganges: $1{,}20\\cdot 0{,}80 = 0{,}96$. Prisen er 96 % av den opprinnelige, altså 4 % lavere. Nedgangen regnes av et større beløp enn økningen.",
   "The price of an item is raised by 20%, and then it is reduced by 20%. What has happened to the price overall?",
   ["It is 4% lower than before", "It is the same as before", "It is 4% higher than before", "It is 20% lower than before"],
   "The growth factors are multiplied: $1.20\\cdot 0.80 = 0.96$. The price is 96% of the original, i.e. 4% lower. The decrease is taken of a larger amount than the increase."],
  ["Renten på et lån øker fra 2 % til 3 %. Hvilket utsagn er riktig?",
   ["Renten har økt med 1 prosentpoeng, som er en økning på 50 %", "Renten har økt med 1 %", "Renten har økt med 50 prosentpoeng", "Renten har økt med 33 %"],
   "Forskjellen mellom to prosentsatser måles i prosentpoeng: $3 - 2 = 1$ prosentpoeng. Den relative økningen er $\\frac{3 - 2}{2}\\cdot 100\\,\\% = 50\\,\\%$.",
   "The interest rate on a loan rises from 2% to 3%. Which statement is correct?",
   ["The rate has risen by 1 percentage point, which is an increase of 50%", "The rate has risen by 1%", "The rate has risen by 50 percentage points", "The rate has risen by 33%"],
   "A difference between two percentages is measured in percentage points: $3 - 2 = 1$ percentage point. The relative increase is $\\frac{3 - 2}{2}\\cdot 100\\% = 50\\%$."],
  ["Hva er $\\frac{3}{4} : \\frac{3}{8}$?", { n: 2, tol: 0, u: "" },
   "Å dele på en brøk er å gange med den omvendte brøken: $\\frac{3}{4}\\cdot\\frac{8}{3} = \\frac{24}{12} = 2$.",
   "What is $\\frac{3}{4} \\div \\frac{3}{8}$?", null,
   "Dividing by a fraction means multiplying by its reciprocal: $\\frac{3}{4}\\cdot\\frac{8}{3} = \\frac{24}{12} = 2$."],
  ["Hva er 15 % av 240?", { n: 36, tol: 0, u: "" },
   "$15\\,\\% = 0{,}15$, og $0{,}15\\cdot 240 = 36$.",
   "What is 15% of 240?", null,
   "$15\\% = 0.15$, and $0.15\\cdot 240 = 36$."],
  ["Betong blandes i forholdet 1 : 2 : 3 (sement : sand : pukk) etter vekt. Hvor mange kg sand går med i 480 kg ferdig blanding?", { n: 160, tol: 0.5, u: "kg" },
   "Til sammen $1 + 2 + 3 = 6$ deler, så én del er $\\frac{480}{6} = 80$ kg. Sand er 2 deler: $2\\cdot 80 = 160$ kg.",
   "Concrete is mixed in the ratio 1 : 2 : 3 (cement : sand : gravel) by weight. How many kg of sand go into 480 kg of finished mix?", null,
   "In total $1 + 2 + 3 = 6$ parts, so one part is $\\frac{480}{6} = 80$ kg. Sand is 2 parts: $2\\cdot 80 = 160$ kg."]
]);

GEN("GMAT", 0,
 // 1) regnerekkefølge (ett steg)
 () => { const k = R.i(0, 2), a = R.i(2, 20), b = R.i(2, 9), c = R.i(2, 9), d = R.i(1, 15);
   let ex, v, nb, en;
   if (k === 0) { v = a + b * c - d; ex = `${a} + ${b}\\cdot ${c} - ${d}`;
     nb = `Ganging før pluss og minus: $${b}\\cdot ${c} = ${b * c}$. Så $${a} + ${b * c} - ${d} = ${v}$.`;
     en = `Multiplication before addition and subtraction: $${b}\\cdot ${c} = ${b * c}$. Then $${a} + ${b * c} - ${d} = ${v}$.`; }
   else if (k === 1) { v = (a + b) * c - d; ex = `(${a} + ${b})\\cdot ${c} - ${d}`;
     nb = `Parentesen først: $${a} + ${b} = ${a + b}$. Så $${a + b}\\cdot ${c} - ${d} = ${(a + b) * c} - ${d} = ${v}$.`;
     en = `Parentheses first: $${a} + ${b} = ${a + b}$. Then $${a + b}\\cdot ${c} - ${d} = ${(a + b) * c} - ${d} = ${v}$.`; }
   else { const s = a - d; v = s * b + c; ex = `(${a} - ${d})\\cdot ${b} + ${c}`;
     nb = `Parentesen først: $${a} - ${d} = ${s}$. Så $${par(s)}\\cdot ${b} + ${c} = ${s * b} + ${c} = ${v}$.`;
     en = `Parentheses first: $${a} - ${d} = ${s}$. Then $${par(s)}\\cdot ${b} + ${c} = ${s * b} + ${c} = ${v}$.`; }
   return [T(`Hva er $${ex}$?`, `What is $${ex}$?`), { n: v, tol: 0, u: "" }, T(nb, en)]; },
 // 2) negative tall og parenteser
 () => { let a; do { a = R.i(-12, 12); } while (a === 0);
   const b = R.i(2, 6), c = R.i(-9, 9), d = R.i(-9, 9), s = c - d, p = b * s, v = a - p;
   const ex = `${a} - ${b}\\cdot(${c} - ${par(d)})`;
   return [T(`Hva er $${ex}$?`, `What is $${ex}$?`), { n: v, tol: 0, u: "" },
     T(`Parentesen først: $${c} - ${par(d)} = ${s}$. Så ganging: $${b}\\cdot ${par(s)} = ${p}$. Til slutt: $${a} - ${par(p)} = ${v}$. Husk at å trekke fra et negativt tall er det samme som å legge til.`,
       `Parentheses first: $${c} - ${par(d)} = ${s}$. Then multiplication: $${b}\\cdot ${par(s)} = ${p}$. Finally: $${a} - ${par(p)} = ${v}$. Remember that subtracting a negative number is the same as adding.`)]; },
 // 3) addisjon av brøker (flervalg, typiske feil)
 () => { let b, d; do { b = R.p([2, 3, 4, 5, 6, 8, 10]); d = R.p([3, 4, 5, 6, 8, 9, 12]); } while (b === d);
   const a = R.i(1, b - 1), c = R.i(1, d - 1), L = lcm(b, d), n1 = a * L / b, n2 = c * L / d, num = n1 + n2;
   const red = fr(num, L), raw = `\\frac{${num}}{${L}}`, tail = red === raw ? "" : ` = ${red}`;
   const opts = uniq([fr(num, L), fr(a + c, b + d), fr(a + c, b * d), fr(a * c, b * d)], 4).map(s => `$${s}$`);
   const ex = `\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}}`;
   return [T(`Hva er $${ex}$?`, `What is $${ex}$?`), opts,
     T(`Felles nevner er ${L}: $\\frac{${a}}{${b}} = \\frac{${n1}}{${L}}$ og $\\frac{${c}}{${d}} = \\frac{${n2}}{${L}}$. Summen er $${raw}${tail}$. Nevnerne skal ikke legges sammen.`,
       `The common denominator is ${L}: $\\frac{${a}}{${b}} = \\frac{${n1}}{${L}}$ and $\\frac{${c}}{${d}} = \\frac{${n2}}{${L}}$. The sum is $${raw}${tail}$. The denominators must not be added.`)]; },
 // 4) ganging og deling av brøker (tallsvar)
 () => { const div = R.i(0, 1), a = R.i(1, 9), b = R.i(2, 9), c = R.i(1, 9), d = R.i(2, 9);
   const P = div ? a * d : a * c, Q = div ? b * c : b * d, v = P / Q;
   const exN = `\\frac{${a}}{${b}} ${div ? ":" : "\\cdot"} \\frac{${c}}{${d}}`, exE = `\\frac{${a}}{${b}} ${div ? "\\div" : "\\cdot"} \\frac{${c}}{${d}}`;
   const red = fr(P, Q), raw = `\\frac{${P}}{${Q}}`, tail = (red === raw ? "" : ` = ${red}`) + (Number.isInteger(v) ? "" : ` ${ap(v)} ${mf(v, 3)}`);
   const stepN = div ? `Del på en brøk ved å gange med den omvendte: $${exN} = \\frac{${a}}{${b}}\\cdot\\frac{${d}}{${c}} = ${raw}${tail}$.`
                     : `Gang teller med teller og nevner med nevner: $${exN} = \\frac{${a}\\cdot ${c}}{${b}\\cdot ${d}} = ${raw}${tail}$.`;
   const stepE = div ? `Divide by a fraction by multiplying by its reciprocal: $${exE} = \\frac{${a}}{${b}}\\cdot\\frac{${d}}{${c}} = ${raw}${tail}$.`
                     : `Multiply numerator by numerator and denominator by denominator: $${exE} = \\frac{${a}\\cdot ${c}}{${b}\\cdot ${d}} = ${raw}${tail}$.`;
   return [T(`Hva er $${exN}$ (svar med brøk, f.eks. 3/8, eller desimaltall)?`, `What is $${exE}$ (answer as a fraction, e.g. 3/8, or as a decimal)?`),
     { n: v, tol: Math.max(v * 0.01, 0.005), u: "" }, T(stepN, stepE)]; },
 // 5) prosentvis endring
 () => { const old = R.i(20, 300) * 10; let nw; do { nw = Math.round(old * (1 + R.f(-0.4, 0.6, 0.01)) / 10) * 10; } while (nw === old || nw <= 0);
   const d = nw - old, p = d / old * 100;
   return [T(`Prisen på en komponent endres fra ${old} kr til ${nw} kr. Hva er den prosentvise endringen (negativ ved nedgang)?`,
             `The price of a component changes from NOK ${old} to NOK ${nw}. What is the percentage change (negative for a decrease)?`),
     { n: p, tol: rel(p, 0.01, 0.05), u: "%" },
     T(`Del endringen på den gamle verdien: $\\frac{${nw} - ${old}}{${old}}\\cdot 100\\,\\% = \\frac{${d}}{${old}}\\cdot 100\\,\\% \\approx ${mf(p, 1)}\\,\\%$.`,
       `Divide the change by the old value: $\\frac{${nw} - ${old}}{${old}}\\cdot 100\\% = \\frac{${d}}{${old}}\\cdot 100\\% \\approx ${mf(p, 1)}\\%$.`)]; },
 // 6) flere prosentendringer baklengs (eksamensnivå)
 () => { const X = R.i(2, 30) * 400, p = R.p([5, 10, 15, 20, 25, 30, 40, 50]), q = R.p([5, 10, 15, 20, 25, 30]);
   const f1 = 1 + p / 100, f2 = 1 - q / 100, F = f1 * f2, Y = Math.round(X * F), tot = (F - 1) * 100;
   return [T(`Prisen på en maskin ble først økt med ${p} % og deretter satt ned med ${q} %. Nå koster den ${Y} kr. Hva kostet den opprinnelig?`,
             `The price of a machine was first raised by ${p}% and then reduced by ${q}%. It now costs NOK ${Y}. What did it cost originally?`),
     { n: Y / F, tol: rel(Y / F), u: "kr" },
     T(`Vekstfaktorene er $${mf(f1)}$ og $${mf(f2)}$, til sammen $${mf(f1)}\\cdot ${mf(f2)} = ${mf(F, 4)}$. Opprinnelig pris: $\\frac{${Y}}{${mf(F, 4)}} = ${X}$ kr. Den samlede endringen er $${mf(tot, 2)}\\,\\%$, ikke $${p - q}\\,\\%$.`,
       `The growth factors are $${mf(f1)}$ and $${mf(f2)}$, together $${mf(f1)}\\cdot ${mf(f2)} = ${mf(F, 4)}$. Original price: $\\frac{${Y}}{${mf(F, 4)}} = ${X}$ NOK. The total change is $${mf(tot, 2)}\\%$, not $${p - q}\\%$.`)]; }
);

// =====================================================================
//  ENHET 1: Potenser, røtter og tierpotenser
// =====================================================================
THEORY("GMAT", 1, {
nb: `## Hva handler det om?
Potenser er en snarvei for å skrive gjentatt multiplikasjon: i stedet for å skrive $5\\cdot5\\cdot5\\cdot5$ skriver vi $5^4$. Ingeniører bruker potenser hele tiden - i formler for areal, volum, energi og elektrisk effekt, og når størrelser vokser eller avtar raskt. Røtter er det motsatte av potenser, og tierpotenser (potenser av 10) gir en kompakt måte å skrive svært store eller svært små tall på, for eksempel avstanden til en stjerne eller diameteren til et atom.

Denne enheten bygger opp reglene for potenser og røtter fra bunnen, og viser hvordan de brukes til å regne med normalform og enhetsprefikser som kilo, milli og mikro.

## Begreper og formler
- Potens: $a^n = a\\cdot a\\cdots a$ ($n$ faktorer). $a$ kalles grunntall, $n$ eksponent.
- Potensregler (samme grunntall $a\\neq0$):

$$a^m\\cdot a^n=a^{m+n}\\qquad \\frac{a^m}{a^n}=a^{m-n}\\qquad (a^m)^n=a^{mn}$$

- $(ab)^n=a^nb^n$ og $\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}$.
- Spesielle eksponenter: $a^0=1$ (for $a\\neq0$), og $a^{-n}=\\frac{1}{a^n}$ (negativ eksponent snur brøken).
- Rot: $\\sqrt[n]{a}$ er tallet som opphøyd i $n$-te gir $a$. Kvadratrot skrives bare $\\sqrt{a}$ (altså $n=2$). Som brøkeksponent: $a^{1/n}=\\sqrt[n]{a}$ og $a^{m/n}=\\left(\\sqrt[n]{a}\\right)^m$.
- Regneregler for røtter: $\\sqrt{ab}=\\sqrt{a}\\cdot\\sqrt{b}$ og $\\sqrt{\\frac{a}{b}}=\\frac{\\sqrt{a}}{\\sqrt{b}}$, men $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.
- Normalform (vitenskapelig notasjon): et tall skrives som $t=a\\cdot10^n$, der $1\\le|a|<10$ og $n$ er et helt tall. Store tall gir positiv $n$, tall mellom 0 og 1 gir negativ $n$.
- Enhetsprefikser bygger på tierpotenser: giga (G) $=10^9$, mega (M) $=10^6$, kilo (k) $=10^3$, milli (m) $=10^{-3}$, mikro ($\\mu$) $=10^{-6}$, nano (n) $=10^{-9}$.

## Slik løser du oppgavene
1. Har uttrykket samme grunntall: legg sammen eksponentene ved ganging, trekk fra ved deling, gang eksponentene ved potens i potens.
2. Negativ eksponent: skriv om til brøk med positiv eksponent i nevneren.
3. Rot: skriv om til brøkeksponent når det gjør regningen enklere, eller finn roten direkte hvis tallet er et kjent kvadrat- eller kubikktall.
4. Tierpotenser: regn tallene foran (mantissene) for seg, og legg sammen eller trekk fra eksponentene til tierpotensene for seg.
5. Skriv svaret i normalform hvis oppgaven ber om det, og pass på at mantissen er mellom 1 og 10.
6. Sjekk størrelsesorden til slutt: er svaret rimelig stort eller lite?

### Eksempel
Regn ut $\\dfrac{(2{,}0\\cdot10^5)\\cdot(3{,}0\\cdot10^{-2})}{4{,}0\\cdot10^3}$.

Regn mantissene for seg: $\\dfrac{2{,}0\\cdot3{,}0}{4{,}0}=1{,}5$. Regn tierpotensene for seg: $\\dfrac{10^5\\cdot10^{-2}}{10^3}=10^{5-2-3}=10^0=1$. Svaret er

$$1{,}5\\cdot10^0=1{,}5$$

Finn også $\\sqrt[3]{64}\\cdot 4^{-1}$. Kubikkroten av 64 er 4 (siden $4^3=64$), og $4^{-1}=\\frac14$, så svaret blir $4\\cdot\\frac14=1$.

## Vanlige feil
- Å tro $a^m\\cdot a^n=a^{mn}$. Riktig regel er å legge sammen eksponentene: $a^{m+n}$.
- Å blande $a^{-n}$ med $-a^n$. Et minustegn i eksponenten betyr «snu brøken», ikke «gjør tallet negativt»: $2^{-3}=\\frac18$, ikke $-8$.
- Å tro $\\sqrt{a^2}=a$ for alle $a$. Riktig er $\\sqrt{a^2}=|a|$, som blir positivt selv om $a$ er negativt.
- Å legge sammen under rottegnet: $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.
- Feil fortegn på eksponenten i normalform, for eksempel å skrive $4{,}5\\cdot10^4$ i stedet for $4{,}5\\cdot10^{-4}$ for et lite tall.
- Å glemme at mantissen i normalform skal være mellom 1 og 10 (ikke for eksempel $45\\cdot10^{-5}$).

> Ved ganging av like grunntall legges eksponentene sammen, ved deling trekkes de fra, og ved potens i potens ganges de. En rot er en potens med brøkeksponent: $\\sqrt[n]{a}=a^{1/n}$.`,
en: `## What is it about?
Powers are a shorthand for repeated multiplication: instead of writing $5\\cdot5\\cdot5\\cdot5$ we write $5^4$. Engineers use powers all the time - in formulas for area, volume, energy and electrical power, and whenever quantities grow or shrink quickly. Roots are the opposite of powers, and powers of ten give a compact way of writing very large or very small numbers, such as the distance to a star or the diameter of an atom.

This unit builds up the rules for powers and roots from scratch, and shows how they are used to work with scientific notation and unit prefixes such as kilo, milli and micro.

## Concepts and formulas
- Power: $a^n = a\\cdot a\\cdots a$ ($n$ factors). $a$ is called the base, $n$ the exponent.
- Power rules (same base $a\\neq0$):

$$a^m\\cdot a^n=a^{m+n}\\qquad \\frac{a^m}{a^n}=a^{m-n}\\qquad (a^m)^n=a^{mn}$$

- $(ab)^n=a^nb^n$ and $\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}$.
- Special exponents: $a^0=1$ (for $a\\neq0$), and $a^{-n}=\\frac{1}{a^n}$ (a negative exponent flips the fraction).
- Root: $\\sqrt[n]{a}$ is the number that, raised to the $n$-th power, gives $a$. A square root is written simply $\\sqrt{a}$ ($n=2$). As a fractional exponent: $a^{1/n}=\\sqrt[n]{a}$ and $a^{m/n}=\\left(\\sqrt[n]{a}\\right)^m$.
- Rules for roots: $\\sqrt{ab}=\\sqrt{a}\\cdot\\sqrt{b}$ and $\\sqrt{\\frac{a}{b}}=\\frac{\\sqrt{a}}{\\sqrt{b}}$, but $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.
- Scientific notation: a number is written as $t=a\\cdot10^n$, where $1\\le|a|<10$ and $n$ is an integer. Large numbers give a positive $n$, numbers between 0 and 1 give a negative $n$.
- Unit prefixes are built on powers of ten: giga (G) $=10^9$, mega (M) $=10^6$, kilo (k) $=10^3$, milli (m) $=10^{-3}$, micro ($\\mu$) $=10^{-6}$, nano (n) $=10^{-9}$.

## How to solve the problems
1. Same base: add the exponents for multiplication, subtract for division, multiply the exponents for a power of a power.
2. Negative exponent: rewrite as a fraction with a positive exponent in the denominator.
3. Root: rewrite as a fractional exponent when that makes the calculation easier, or find the root directly if the number is a known square or cube.
4. Powers of ten: handle the numbers in front (the mantissas) separately, and add or subtract the exponents of the powers of ten separately.
5. Write the answer in scientific notation if asked to, making sure the mantissa is between 1 and 10.
6. Check the order of magnitude at the end: is the answer a reasonable size?

### Example
Calculate $\\dfrac{(2.0\\cdot10^5)\\cdot(3.0\\cdot10^{-2})}{4.0\\cdot10^3}$.

Handle the mantissas separately: $\\dfrac{2.0\\cdot3.0}{4.0}=1.5$. Handle the powers of ten separately: $\\dfrac{10^5\\cdot10^{-2}}{10^3}=10^{5-2-3}=10^0=1$. The answer is

$$1.5\\cdot10^0=1.5$$

Also find $\\sqrt[3]{64}\\cdot 4^{-1}$. The cube root of 64 is 4 (since $4^3=64$), and $4^{-1}=\\frac14$, so the answer is $4\\cdot\\frac14=1$.

## Common mistakes
- Believing $a^m\\cdot a^n=a^{mn}$. The correct rule is to add the exponents: $a^{m+n}$.
- Confusing $a^{-n}$ with $-a^n$. A minus sign in the exponent means "flip the fraction", not "make the number negative": $2^{-3}=\\frac18$, not $-8$.
- Believing $\\sqrt{a^2}=a$ for every $a$. The correct result is $\\sqrt{a^2}=|a|$, which is positive even when $a$ is negative.
- Adding inside the root sign: $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.
- The wrong sign on the exponent in scientific notation, for example writing $4.5\\cdot10^4$ instead of $4.5\\cdot10^{-4}$ for a small number.
- Forgetting that the mantissa in scientific notation must be between 1 and 10 (not, for example, $45\\cdot10^{-5}$).

> When multiplying the same base, the exponents are added; when dividing, they are subtracted; and for a power of a power, they are multiplied. A root is a power with a fractional exponent: $\\sqrt[n]{a}=a^{1/n}$.`
});

BIQ("GMAT", 1, [
  ["Hva er $10^0$?", ["$1$", "$0$", "$10$", "$100$"],
   "Ethvert tall ulik null opphøyd i 0 er 1. Det følger av mønsteret $10^1/10^1=10^{1-1}=10^0=1$.",
   "What is $10^0$?", ["$1$", "$0$", "$10$", "$100$"],
   "Any nonzero number raised to the power 0 is 1. This follows from the pattern $10^1/10^1=10^{1-1}=10^0=1$."],
  ["Hva er $2^{-3}$?", ["$\\frac{1}{8}$", "$-8$", "$-\\frac{1}{8}$", "$8$"],
   "Negativ eksponent betyr «snu brøken»: $2^{-3}=\\frac{1}{2^3}=\\frac{1}{8}$. Minustegnet gjør IKKE tallet negativt.",
   "What is $2^{-3}$?", ["$\\frac{1}{8}$", "$-8$", "$-\\frac{1}{8}$", "$8$"],
   "A negative exponent means \"flip the fraction\": $2^{-3}=\\frac{1}{2^3}=\\frac{1}{8}$. The minus sign does NOT make the number negative."],
  ["Hvilket uttrykk er det samme som $a^5\\cdot a^3$ (for $a\\neq0$)?", ["$a^{8}$", "$a^{15}$", "$a^{2}$", "$2a^{8}$"],
   "Samme grunntall: legg sammen eksponentene, $5+3=8$, så $a^5\\cdot a^3=a^8$. Du skal ALDRI multiplisere eksponentene ved ganging.",
   "Which expression equals $a^5\\cdot a^3$ (for $a\\neq0$)?", ["$a^{8}$", "$a^{15}$", "$a^{2}$", "$2a^{8}$"],
   "Same base: add the exponents, $5+3=8$, so $a^5\\cdot a^3=a^8$. You must NEVER multiply the exponents for multiplication."],
  ["Hva er $\\sqrt{(-5)^2}$?", ["$5$", "$-5$", "$25$", "$-25$"],
   "Først kvadratet: $(-5)^2=25$. Kvadratroten av 25 er alltid det ikke-negative tallet 5, altså $\\sqrt{a^2}=|a|$.",
   "What is $\\sqrt{(-5)^2}$?", ["$5$", "$-5$", "$25$", "$-25$"],
   "First the square: $(-5)^2=25$. The square root of 25 is always the non-negative number 5, i.e. $\\sqrt{a^2}=|a|$."],
  ["Hvilket tall er $0,00045$ skrevet i normalform?", ["$4{,}5\\cdot10^{-4}$", "$4{,}5\\cdot10^{4}$", "$45\\cdot10^{-5}$", "$0{,}45\\cdot10^{-3}$"],
   "Flytt desimaltegnet 4 plasser til høyre for å få en mantisse mellom 1 og 10: $0,00045=4{,}5\\cdot10^{-4}$. Eksponenten er negativ siden tallet er mindre enn 1.",
   "Which number is $0.00045$ written in scientific notation?", ["$4.5\\cdot10^{-4}$", "$4.5\\cdot10^{4}$", "$45\\cdot10^{-5}$", "$0.45\\cdot10^{-3}$"],
   "Move the decimal point 4 places to the right to get a mantissa between 1 and 10: $0.00045=4.5\\cdot10^{-4}$. The exponent is negative because the number is less than 1."],
  ["Hva er $\\sqrt[3]{125}$?", { n: 5, tol: 0, u: "" },
   "$5^3=5\\cdot5\\cdot5=125$, så $\\sqrt[3]{125}=5$.",
   "What is $\\sqrt[3]{125}$?", null,
   "$5^3=5\\cdot5\\cdot5=125$, so $\\sqrt[3]{125}=5$."],
  ["Hva er $27^{2/3}$?", { n: 9, tol: 0, u: "" },
   "Brøkeksponenten betyr «ta kubikkroten, opphøy så i 2»: $\\sqrt[3]{27}=3$, og $3^2=9$.",
   "What is $27^{2/3}$?", null,
   "The fractional exponent means \"take the cube root, then square it\": $\\sqrt[3]{27}=3$, and $3^2=9$."],
  ["En kraft på $2{,}4\\cdot10^3$ N virker jevnt fordelt over et areal på $4{,}0\\cdot10^{-2}$ m². Hvor stort er trykket $p=F/A$, i pascal (Pa)?", { n: 60000, tol: 600, u: "Pa" },
   "Del mantissene: $\\frac{2{,}4}{4{,}0}=0{,}6$. Trekk fra eksponentene til tierpotensene: $10^{3-(-2)}=10^5$. Svaret er $0{,}6\\cdot10^5=6{,}0\\cdot10^4=60000$ Pa.",
   "A force of $2.4\\cdot10^3$ N acts evenly distributed over an area of $4.0\\cdot10^{-2}$ m². How large is the pressure $p=F/A$, in pascal (Pa)?", null,
   "Divide the mantissas: $\\frac{2.4}{4.0}=0.6$. Subtract the exponents of the powers of ten: $10^{3-(-2)}=10^5$. The answer is $0.6\\cdot10^5=6.0\\cdot10^4=60000$ Pa."]
]);

GEN("GMAT", 1,
 // 1) produktregelen (ett steg)
 () => { const b = R.p([2, 3, 4, 5, 6]), m = R.i(1, 3), n = R.i(1, 3), v = Math.pow(b, m + n);
   const ex = `${b}^{${m}}\\cdot ${b}^{${n}}`;
   return [T(`Hva er $${ex}$ skrevet som ett tall?`, `What is $${ex}$ written as a single number?`),
     { n: v, tol: 0, u: "" },
     T(`Legg sammen eksponentene: $${ex} = ${b}^{${m + n}} = ${v}$.`, `Add the exponents: $${ex} = ${b}^{${m + n}} = ${v}$.`)]; },
 // 2) kvotientregelen (inkl. a^0 = 1 som spesialtilfelle)
 () => { const a = R.i(2, 9); let m = R.i(1, 5), n = R.i(1, 5); if (n > m) { const t = m; m = n; n = t; }
   const v = Math.pow(a, m - n), ex = `\\dfrac{${a}^{${m}}}{${a}^{${n}}}`;
   const tail = m === n ? T(` Eksponentene er like, så svaret er $${a}^0=1$.`, ` The exponents are equal, so the answer is $${a}^0=1$.`) : "";
   return [T(`Hva er $${ex}$ skrevet som ett tall?`, `What is $${ex}$ written as a single number?`),
     { n: v, tol: 0, u: "" },
     T(`Trekk fra eksponentene: $${ex} = ${a}^{${m - n}} = ${v}$.${tail}`, `Subtract the exponents: $${ex} = ${a}^{${m - n}} = ${v}$.${tail}`)]; },
 // 3) negativ eksponent (desimalsvar)
 () => { const b = R.p([2, 3, 4, 5]), n = R.i(1, 3), v = 1 / Math.pow(b, n);
   const ex = `${b}^{-${n}}`;
   return [T(`Hva er $${ex}$ (svar som desimaltall)?`, `What is $${ex}$ (answer as a decimal number)?`),
     { n: v, tol: rel(v, 0.01, 1e-4), u: "" },
     T(`Negativ eksponent betyr «snu brøken»: $${ex} = \\dfrac{1}{${b}^{${n}}} = \\dfrac{1}{${Math.pow(b, n)}} ${ap(v)} ${mf(v, 4)}$.`,
       `A negative exponent means "flip the fraction": $${ex} = \\dfrac{1}{${b}^{${n}}} = \\dfrac{1}{${Math.pow(b, n)}} ${ap(v)} ${mf(v, 4)}$.`)]; },
 // 4) røtter av kjente kvadrat-/kubikktall
 () => { const n = R.p([2, 3]), k = n === 2 ? R.i(2, 15) : R.i(2, 9), a = Math.pow(k, n);
   const rootTex = n === 2 ? `\\sqrt{${a}}` : `\\sqrt[3]{${a}}`;
   return [T(`Hva er $${rootTex}$?`, `What is $${rootTex}$?`),
     { n: k, tol: 0, u: "" },
     T(`Siden $${k}^{${n}} = ${a}$, er $${rootTex} = ${k}$.`, `Since $${k}^{${n}} = ${a}$, $${rootTex} = ${k}$.`)]; },
 // 5) brøkeksponent (rot og potens kombinert)
 () => { const n = R.p([2, 3]), k = n === 2 ? R.i(2, 9) : R.i(2, 6), m = R.i(1, 3), a = Math.pow(k, n), v = Math.pow(k, m);
   const rootTex = n === 2 ? `\\sqrt{${a}}` : `\\sqrt[3]{${a}}`, ex = `${a}^{${m}/${n}}`;
   return [T(`Hva er $${ex}$?`, `What is $${ex}$?`),
     { n: v, tol: 0, u: "" },
     T(`Brøkeksponent: $${ex} = \\left(${rootTex}\\right)^{${m}} = ${k}^{${m}} = ${v}$.`,
       `Fractional exponent: $${ex} = \\left(${rootTex}\\right)^{${m}} = ${k}^{${m}} = ${v}$.`)]; },
 // 6) tierpotenser og enhetsprefikser i en ingeniørsituasjon (eksamensnivå)
 () => { const X = R.i(2, 50), Tns = 1000 / X;
   return [T(`Et signal har frekvens $f=${X}$ MHz. Hva er perioden $T=1/f$, i nanosekunder (ns)?`,
             `A signal has frequency $f=${X}$ MHz. What is the period $T=1/f$, in nanoseconds (ns)?`),
     { n: Tns, tol: rel(Tns, 0.01, 0.02), u: "ns" },
     T(`Gjør om til Hz: $f=${X}\\cdot10^6$ Hz, så $T=\\dfrac{1}{f}=\\dfrac{1}{${X}\\cdot10^6}$ s. Gjort om til nanosekunder ($1$ s $=10^9$ ns): $T=\\dfrac{10^9}{${X}\\cdot10^6}=\\dfrac{1000}{${X}} ${ap(Tns)} ${mf(Tns, 3)}$ ns.`,
       `Convert to Hz: $f=${X}\\cdot10^6$ Hz, so $T=\\dfrac{1}{f}=\\dfrac{1}{${X}\\cdot10^6}$ s. Converted to nanoseconds ($1$ s $=10^9$ ns): $T=\\dfrac{10^9}{${X}\\cdot10^6}=\\dfrac{1000}{${X}} ${ap(Tns)} ${mf(Tns, 3)}$ ns.`)]; }
);

// =====================================================================
//  ENHET 2: Algebra og ligninger
// =====================================================================
THEORY("GMAT", 2, {
nb: `## Hva handler det om?
I mange ingeniørformler er det en ukjent størrelse vi skal finne - da bruker vi bokstaver (variabler) og løser en ligning. Algebra er språket vi bruker for å regne med ukjente størrelser i stedet for bare tall, og gir oss en fast oppskrift som virker uansett hvilke tall som står i formelen. Å kunne regne med bokstavuttrykk, løse ligninger og snu om på formler er en av de aller viktigste ferdighetene i ingeniørfag - du kommer til å bruke det i så godt som alle emner.

## Begreper og formler
- Uttrykk, ledd, koeffisient: i uttrykket $3x^2-5x+2$ er $3x^2$, $-5x$ og $2$ ledd, og 3 og -5 er koeffisienter foran x.
- Å multiplisere inn i en parentes (distributiv lov): $a(b+c)=ab+ac$. Minus foran en parentes snur fortegnet på alle ledd: $-(a-b)=-a+b$.
- Kvadratsetningene:

$$(a+b)^2=a^2+2ab+b^2 \\qquad (a-b)^2=a^2-2ab+b^2 \\qquad (a+b)(a-b)=a^2-b^2$$

- Faktorisering: å skrive et uttrykk som et produkt, motsatt av å multiplisere ut. Se etter felles faktor: $6x^2-9x=3x(2x-3)$.
- Ligning: et utsagn om at to uttrykk er like, sant for bestemte verdier av x. Å løse en ligning betyr å finne disse verdiene.
- Likevektsprinsippet: du kan gjøre samme operasjon (+, -, ×, ÷ med tall $\\neq0$) på begge sider av likhetstegnet uten at løsningen endres.
- Andregradsligning $ax^2+bx+c=0$ ($a\\neq0$) løses med abc-formelen:

$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$

  Uttrykket under rottegnet, $b^2-4ac$, kalles diskriminanten. Er den positiv, er det to løsninger; er den null, én (dobbel) løsning; er den negativ, ingen reelle løsninger.
- To ligninger med to ukjente (lineært ligningssystem) løses ved innsetting eller addisjon: du eliminerer én av de ukjente.

## Slik løser du oppgavene
1. Forenkle hver side for seg: multipliser ut parenteser og slå sammen like ledd.
2. Flytt alle ledd med x til én side og tallene til den andre (bytt fortegn når du flytter over likhetstegnet).
3. Del på koeffisienten foran x til slutt.
4. For andregradsligninger: få alt over på formen $ax^2+bx+c=0$ og sett inn i abc-formelen. Regn diskriminanten først.
5. Skal du løse ut en variabel fra en formel: behandle den som den ukjente x, og gjør akkurat de samme operasjonene.
6. Sjekk svaret ved å sette det inn i den opprinnelige ligningen.

### Eksempel
Løs ligningen $3(x-2) = 2x+4$.

Multipliser ut parentesen: $3x-6=2x+4$. Flytt $2x$ over: $3x-2x-6=4$, altså $x-6=4$. Legg til 6 på begge sider: $x=10$.

Løs også $x^2-2x-8=0$. Her er $a=1,\\,b=-2,\\,c=-8$. Diskriminanten er $b^2-4ac=(-2)^2-4\\cdot1\\cdot(-8)=4+32=36$. Da er

$$x=\\frac{-(-2)\\pm\\sqrt{36}}{2\\cdot1}=\\frac{2\\pm6}{2}$$

som gir $x=4$ eller $x=-2$.

## Vanlige feil
- Å glemme å gange ut alle ledd i en parentes, spesielt med minus foran: $-(x-3)=-x+3$, ikke $-x-3$.
- Å tro $(a+b)^2=a^2+b^2$. Det mangler leddet $2ab$.
- Fortegnsfeil når et ledd flyttes over likhetstegnet.
- Å dele bare én side av ligningen, eller dele på et uttrykk som kan være null.
- Å bytte om $b$ og $-b$ eller glemme $\\pm$ i abc-formelen.
- Å tro andregradsligninger alltid har to løsninger - sjekk diskriminanten.

> Det du gjør på den ene siden av likhetstegnet, må du gjøre på den andre. Andregradsligninger løses med abc-formelen; diskriminanten forteller hvor mange løsninger du får.`,
en: `## What is it about?
In many engineering formulas there is an unknown quantity to find - that is when we use letters (variables) and solve an equation. Algebra is the language we use to calculate with unknown quantities instead of just numbers, and it gives us a fixed recipe that works no matter which numbers appear in the formula. Being able to work with algebraic expressions, solve equations and rearrange formulas is one of the most important skills in engineering - you will use it in almost every course.

## Concepts and formulas
- Expression, term, coefficient: in the expression $3x^2-5x+2$, the terms are $3x^2$, $-5x$ and $2$, and 3 and -5 are the coefficients in front of x.
- Multiplying into a parenthesis (the distributive law): $a(b+c)=ab+ac$. A minus sign in front of a parenthesis flips the sign of every term: $-(a-b)=-a+b$.
- The special product formulas:

$$(a+b)^2=a^2+2ab+b^2 \\qquad (a-b)^2=a^2-2ab+b^2 \\qquad (a+b)(a-b)=a^2-b^2$$

- Factoring: writing an expression as a product, the reverse of expanding. Look for a common factor: $6x^2-9x=3x(2x-3)$.
- Equation: a statement that two expressions are equal, true for particular values of x. Solving an equation means finding those values.
- The balance principle: you can apply the same operation (+, -, ×, ÷ by a number $\\neq0$) to both sides of the equals sign without changing the solution.
- Quadratic equation $ax^2+bx+c=0$ ($a\\neq0$) is solved with the quadratic formula:

$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$

  The expression under the root sign, $b^2-4ac$, is called the discriminant. If it is positive, there are two solutions; if it is zero, one (double) solution; if it is negative, no real solutions.
- Two equations with two unknowns (a linear system) are solved by substitution or elimination: you eliminate one of the unknowns.

## How to solve the problems
1. Simplify each side separately: expand any parentheses and combine like terms.
2. Move all the x-terms to one side and the numbers to the other (flip the sign when a term crosses the equals sign).
3. Divide by the coefficient in front of x at the end.
4. For quadratic equations: get everything into the form $ax^2+bx+c=0$ and substitute into the quadratic formula. Calculate the discriminant first.
5. To isolate a variable in a formula: treat it as the unknown x, and perform exactly the same operations.
6. Check the answer by substituting it back into the original equation.

### Example
Solve the equation $3(x-2)=2x+4$.

Expand the parenthesis: $3x-6=2x+4$. Move $2x$ over: $3x-2x-6=4$, i.e. $x-6=4$. Add 6 to both sides: $x=10$.

Also solve $x^2-2x-8=0$. Here $a=1,\\,b=-2,\\,c=-8$. The discriminant is $b^2-4ac=(-2)^2-4\\cdot1\\cdot(-8)=4+32=36$. Then

$$x=\\frac{-(-2)\\pm\\sqrt{36}}{2\\cdot1}=\\frac{2\\pm6}{2}$$

which gives $x=4$ or $x=-2$.

## Common mistakes
- Forgetting to multiply out every term in a parenthesis, especially with a minus sign in front: $-(x-3)=-x+3$, not $-x-3$.
- Believing $(a+b)^2=a^2+b^2$. The term $2ab$ is missing.
- Sign errors when a term is moved across the equals sign.
- Dividing only one side of the equation, or dividing by an expression that could be zero.
- Swapping $b$ and $-b$, or forgetting the $\\pm$ in the quadratic formula.
- Believing quadratic equations always have two solutions - check the discriminant.

> Whatever you do to one side of the equals sign, you must do to the other. Quadratic equations are solved with the quadratic formula; the discriminant tells you how many solutions you get.`
});

BIQ("GMAT", 2, [
  ["Hva er $3(x-2)$ multiplisert ut?", ["$3x-6$", "$3x-2$", "$x-6$", "$3x+6$"],
   "Multipliser 3 inn i parentesen: $3\\cdot x - 3\\cdot 2 = 3x-6$.",
   "What is $3(x-2)$ expanded?", ["$3x-6$", "$3x-2$", "$x-6$", "$3x+6$"],
   "Multiply 3 into the parenthesis: $3\\cdot x - 3\\cdot 2 = 3x-6$."],
  ["Hva er $-(x-4)$?", ["$-x+4$", "$-x-4$", "$x-4$", "$x+4$"],
   "Minus foran parentesen snur fortegnet på begge ledd: $-(x-4) = -x+4$.",
   "What is $-(x-4)$?", ["$-x+4$", "$-x-4$", "$x-4$", "$x+4$"],
   "A minus sign in front of the parenthesis flips the sign of both terms: $-(x-4) = -x+4$."],
  ["Løs ligningen $5x-3=2x+9$.", { n: 4, tol: 0, u: "" },
   "Flytt $2x$ over: $3x-3=9$. Legg til 3: $3x=12$. Del på 3: $x=4$.",
   "Solve the equation $5x-3=2x+9$.", null,
   "Move $2x$ over: $3x-3=9$. Add 3: $3x=12$. Divide by 3: $x=4$."],
  ["Hva er $(x+3)^2$ multiplisert ut?", ["$x^2+6x+9$", "$x^2+9$", "$x^2+6x-9$", "$x^2-6x+9$"],
   "Bruk $(a+b)^2=a^2+2ab+b^2$ med $a=x,b=3$: $x^2+2\\cdot x\\cdot3+3^2=x^2+6x+9$.",
   "What is $(x+3)^2$ expanded?", ["$x^2+6x+9$", "$x^2+9$", "$x^2+6x-9$", "$x^2-6x+9$"],
   "Use $(a+b)^2=a^2+2ab+b^2$ with $a=x,b=3$: $x^2+2\\cdot x\\cdot3+3^2=x^2+6x+9$."],
  ["Hva er $4x^2-8x$ faktorisert (skrevet som et produkt)?", ["$4x(x-2)$", "$4x(x+2)$", "$4x(x-8)$", "$4(x-2)$"],
   "Felles faktor er $4x$: $4x^2-8x=4x(x-2)$. Sjekk: $4x\\cdot x - 4x\\cdot 2 = 4x^2-8x$.",
   "What is $4x^2-8x$ factored (written as a product)?", ["$4x(x-2)$", "$4x(x+2)$", "$4x(x-8)$", "$4(x-2)$"],
   "The common factor is $4x$: $4x^2-8x=4x(x-2)$. Check: $4x\\cdot x - 4x\\cdot 2 = 4x^2-8x$."],
  ["Formelen for omkretsen av en sirkel er $O=2\\pi r$. Løs ut r, og finn r når $O=31{,}4$ cm (bruk $\\pi\\approx3{,}14$).", { n: 5, tol: 0.05, u: "cm" },
   "Løs ut r: $r=\\dfrac{O}{2\\pi}$. Sett inn: $r=\\dfrac{31{,}4}{2\\cdot3{,}14}=\\dfrac{31{,}4}{6{,}28}=5$ cm.",
   "The formula for the circumference of a circle is $O=2\\pi r$. Solve for r, and find r when $O=31.4$ cm (use $\\pi\\approx3.14$).", null,
   "Solve for r: $r=\\dfrac{O}{2\\pi}$. Substitute: $r=\\dfrac{31.4}{2\\cdot3.14}=\\dfrac{31.4}{6.28}=5$ cm."],
  ["Andregradsligningen $x^2+2x+5=0$ har diskriminant $-16$. Hvor mange reelle løsninger har den?", ["Ingen", "Én", "To", "Uendelig mange"],
   "Diskriminanten er negativ, og da finnes ingen reelle løsninger (kvadratroten av et negativt tall er ikke et reelt tall).",
   "The quadratic equation $x^2+2x+5=0$ has discriminant $-16$. How many real solutions does it have?", ["None", "One", "Two", "Infinitely many"],
   "The discriminant is negative, so there are no real solutions (the square root of a negative number is not a real number)."],
  ["Et rektangel har areal $100$ cm², og lengden er $5$ cm mer enn bredden. Hvor bred er rektangelet?", { n: (-5 + Math.sqrt(425)) / 2, tol: 0.05, u: "cm" },
   "La bredden være $b$. Da er $b(b+5)=100$, altså $b^2+5b-100=0$. abc-formelen: $b=\\dfrac{-5+\\sqrt{25+400}}{2}=\\dfrac{-5+\\sqrt{425}}{2}\\approx\\dfrac{-5+20{,}62}{2}\\approx7{,}81$ cm (den negative løsningen gir ikke mening for en lengde).",
   "A rectangle has an area of $100$ cm², and the length is $5$ cm more than the width. How wide is the rectangle?", null,
   "Let the width be $b$. Then $b(b+5)=100$, i.e. $b^2+5b-100=0$. The quadratic formula: $b=\\dfrac{-5+\\sqrt{25+400}}{2}=\\dfrac{-5+\\sqrt{425}}{2}\\approx\\dfrac{-5+20.62}{2}\\approx7.81$ cm (the negative solution does not make sense for a length)."]
]);

GEN("GMAT", 2,
 // 1) lineær ligning (ett steg)
 () => { const a = R.i(2, 9), x0 = R.i(-9, 9), b = R.i(-9, 9), c = a * x0 + b;
   const eq = `${a}x ${sg(b)} = ${c}`;
   return [T(`Løs ligningen $${eq}$.`, `Solve the equation $${eq}$.`),
     { n: x0, tol: 0, u: "" },
     T(`Flytt konstantleddet over: $${a}x = ${c} - (${b}) = ${c - b}$. Del på ${a}: $x = \\dfrac{${c - b}}{${a}} = ${x0}$.`,
       `Move the constant term over: $${a}x = ${c} - (${b}) = ${c - b}$. Divide by ${a}: $x = \\dfrac{${c - b}}{${a}} = ${x0}$.`)]; },
 // 2) multiplisere ut to parenteser (flervalg)
 () => { let a, b; do { a = R.i(1, 9) * R.p([1, -1]); b = R.i(1, 9) * R.p([1, -1]); } while (a + b === 0 || a === b);
   const p = a + b, q = a * b, correct = poly(1, p, q);
   const opts = uniq([correct, poly(1, p, -q), poly(1, -p, q), poly(1, q, p)], 4).map(s => `$${s}$`);
   return [T(`Hva er $(x ${sg(a)})(x ${sg(b)})$ multiplisert ut?`, `What is $(x ${sg(a)})(x ${sg(b)})$ expanded?`),
     opts,
     T(`Bruk $(x+a)(x+b)=x^2+(a+b)x+ab$ med $a=${a}$ og $b=${b}$: $a+b=${p}$ og $ab=${q}$, som gir $${correct}$.`,
       `Use $(x+a)(x+b)=x^2+(a+b)x+ab$ with $a=${a}$ and $b=${b}$: $a+b=${p}$ and $ab=${q}$, which gives $${correct}$.`)]; },
 // 3) konjugatsetningen (flervalg)
 () => { const m = R.i(2, 12), m2 = m * m, correct = poly(1, 0, -m2);
   const opts = uniq([correct, poly(1, 0, m2), poly(1, -2 * m, m2), poly(1, 2 * m, m2)], 4).map(s => `$${s}$`);
   return [T(`Hva er $(x+${m})(x-${m})$ multiplisert ut?`, `What is $(x+${m})(x-${m})$ expanded?`),
     opts,
     T(`Konjugatsetningen: $(x+${m})(x-${m}) = x^2-${m2}$.`, `The conjugate rule (difference of squares): $(x+${m})(x-${m}) = x^2-${m2}$.`)]; },
 // 4) løse ut en variabel fra en formel (sirkelareal, krever rot)
 () => { const r0 = R.i(2, 20), A = Math.round(Math.PI * r0 * r0 * 100) / 100;
   return [T(`Arealet av en sirkel er $A=\\pi r^2$. Hvor stor er radien når arealet er $A=${nf(A)}$ cm²?`,
             `The area of a circle is $A=\\pi r^2$. How large is the radius when the area is $A=${nf(A)}$ cm²?`),
     { n: r0, tol: rel(r0, 0.01, 0.02), u: "cm" },
     T(`Løs ut r: $r=\\sqrt{\\dfrac{A}{\\pi}}=\\sqrt{\\dfrac{${nf(A)}}{\\pi}} \\approx ${mf(r0, 3)}$ cm.`,
       `Solve for r: $r=\\sqrt{\\dfrac{A}{\\pi}}=\\sqrt{\\dfrac{${nf(A)}}{\\pi}} \\approx ${mf(r0, 3)}$ cm.`)]; },
 // 5) andregradsligning med abc-formelen (heltallsrøtter, oppgi den største)
 () => { let r1, r2; do { r1 = R.i(-9, 9); } while (r1 === 0); do { r2 = R.i(-9, 9); } while (r2 === 0 || r2 === r1);
   if (r1 > r2) { const t = r1; r1 = r2; r2 = t; }
   const b = -(r1 + r2), c = r1 * r2, disc = b * b - 4 * c, eq = `x^2 ${sg(b)}x ${sg(c)} = 0`;
   return [T(`Løs andregradsligningen $${eq}$. Oppgi den største løsningen.`, `Solve the quadratic equation $${eq}$. Give the largest solution.`),
     { n: r2, tol: 0, u: "" },
     T(`abc-formelen med $a=1,\\,b=${b},\\,c=${c}$: diskriminanten er $b^2-4ac=${disc}$, og $x=\\dfrac{-(${b})\\pm\\sqrt{${disc}}}{2}$, som gir $x=${r1}$ eller $x=${r2}$.`,
       `The quadratic formula with $a=1,\\,b=${b},\\,c=${c}$: the discriminant is $b^2-4ac=${disc}$, and $x=\\dfrac{-(${b})\\pm\\sqrt{${disc}}}{2}$, which gives $x=${r1}$ or $x=${r2}$.`)]; },
 // 6) ligningssystem med to ukjente, innkjøp (eksamensnivå)
 () => { let p, q; do { p = R.i(5, 40); q = R.i(5, 40); } while (p === q);
   const nA = R.i(3, 30), nB = R.i(3, 30), N = nA + nB, total = p * nA + q * nB;
   return [T(`En bedrift kjøper til sammen ${N} komponenter av type A og type B for totalt ${total} kr. Type A koster ${p} kr/stk og type B koster ${q} kr/stk. Hvor mange komponenter av type A ble kjøpt?`,
             `A company buys a total of ${N} components of type A and type B for a total of NOK ${total}. Type A costs NOK ${p}/unit and type B costs NOK ${q}/unit. How many components of type A were bought?`),
     { n: nA, tol: 0, u: "stk" },
     T(`La $x$ = antall A og $y$ = antall B. Ligningene er $x+y=${N}$ og $${p}x+${q}y=${total}$. Sett $y=${N}-x$ inn i den andre: $${p}x+${q}(${N}-x)=${total}$, som gir $x=${nA}$ (og $y=${nB}$).`,
       `Let $x$ = number of A and $y$ = number of B. The equations are $x+y=${N}$ and $${p}x+${q}y=${total}$. Substitute $y=${N}-x$ into the second: $${p}x+${q}(${N}-x)=${total}$, which gives $x=${nA}$ (and $y=${nB}$).`)]; }
);

// =====================================================================
//  ENHET 3: Funksjoner og grafer (lineære funksjoner, stigningstall, andregradsfunksjoner, tolke grafer)
// =====================================================================
THEORY("GMAT", 3, {
nb: `## Hva handler det om?
En funksjon er en oppskrift som gir nøyaktig én utverdi for hver innverdi. Vi skriver $f(x)$ for verdien funksjonen gir når vi setter inn $x$. Ingeniører bruker funksjoner til å modellere sammenhenger mellom størrelser - hvordan strekning avhenger av tid, hvordan kostnad avhenger av antall, hvordan spenning avhenger av strøm. Grafen til en funksjon er et bilde av denne sammenhengen, og å kunne lese av og bygge grafer er helt sentralt for å forstå hva en formel faktisk sier.

Denne enheten dekker de to viktigste funksjonstypene i dette kurset: lineære funksjoner (rette linjer) og andregradsfunksjoner (parabler), og hvordan du leser informasjon ut av grafene deres.

## Begreper og formler
- Funksjon $f(x)$: for hver x-verdi (definisjonsmengden) gir funksjonen nøyaktig én y-verdi ($f(x)$, verdimengden).
- Lineær funksjon: $f(x)=ax+b$, grafen er en rett linje. $a$ er stigningstallet (endring i y per endring i x), og $b$ er skjæringspunktet med y-aksen (der $x=0$).
- Stigningstall mellom to punkter: $a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{\\Delta y}{\\Delta x}$.
- Positiv $a$ gir en stigende graf, negativ $a$ en synkende graf, og $a=0$ en vannrett linje. Større $|a|$ gir en brattere linje.
- Linje gjennom et punkt med kjent stigningstall: $y-y_1=a(x-x_1)$.
- Andregradsfunksjon: $f(x)=ax^2+bx+c$ ($a\\neq0$), grafen er en parabel. $a>0$: parabelen vender oppover (har et bunnpunkt/minimum); $a<0$: den vender nedover (har et toppunkt/maksimum).
- Toppunkt/bunnpunkt: x-koordinaten er $x_t=-\\dfrac{b}{2a}$; sett den inn i funksjonen for å finne y-koordinaten.
- Nullpunkter (der grafen krysser x-aksen): løs $ax^2+bx+c=0$ med abc-formelen (fra forrige enhet).
- Symmetrilinjen til parabelen er den loddrette linja $x=x_t$ gjennom toppunktet/bunnpunktet.

## Slik løser du oppgavene
1. Skal du finne stigningstall mellom to punkter: sett inn i formelen $a=\\Delta y/\\Delta x$, og pass på rekkefølgen.
2. Skal du finne funksjonsuttrykket til en rett linje: finn $a$ først, sett så inn ett punkt for å finne $b$.
3. Skal du lese av en graf: se hvor den skjærer aksene, om den stiger eller synker, og (for parabler) hvor toppunktet/bunnpunktet er.
4. Skal du finne toppunkt/bunnpunkt for en parabel: bruk $x_t=-b/2a$, sett så inn i funksjonen for å finne y-verdien.
5. Skal du finne nullpunkter: sett $f(x)=0$ og løs andregradsligningen.
6. Sjekk svaret: sett x-verdien inn igjen i funksjonsuttrykket og se at du får riktig y-verdi.

### Eksempel
En rett linje går gjennom punktene $(1,3)$ og $(4,12)$. Finn funksjonsuttrykket.

Stigningstall: $a=\\dfrac{12-3}{4-1}=\\dfrac{9}{3}=3$. Sett inn punktet $(1,3)$: $3=3\\cdot1+b \\Rightarrow b=0$. Funksjonen er $f(x)=3x$.

Finn toppunktet til $f(x)=-2x^2+8x+3$. Her er $a=-2,b=8$, så $x_t=-\\dfrac{8}{2\\cdot(-2)}=2$. Da er $f(2)=-2\\cdot4+16+3=11$. Toppunktet er $(2,11)$, og siden $a<0$ er dette et maksimum.

## Vanlige feil
- Å bytte om $\\Delta y$ og $\\Delta x$ i stigningstallet (husk: endring i y over endring i x).
- Å tro at $b$ i $f(x)=ax+b$ er stigningstallet - det er $a$ som er stigningstallet.
- Fortegnsfeil i $x_t=-b/2a$, spesielt når $b$ eller $a$ er negativ.
- Å tro alle andregradsfunksjoner har nullpunkter - ligger toppunktet over x-aksen (parabel som vender nedover) eller bunnpunktet under x-aksen (parabel som vender oppover), kan det være ingen nullpunkter. Dette henger sammen med fortegnet til diskriminanten.
- Å lese av grafen feil vei (forveksle x- og y-aksen) eller lese av feil skala.

> Stigningstall $a=\\Delta y/\\Delta x$ forteller hvor bratt og i hvilken retning en rett linje går. For en parabel $f(x)=ax^2+bx+c$ finner du toppunktet/bunnpunktet med $x_t=-b/2a$, og nullpunktene med abc-formelen.`,
en: `## What is it about?
A function is a rule that gives exactly one output value for each input value. We write $f(x)$ for the value the function gives at $x$. Engineers use functions to model relationships between quantities - how distance depends on time, how cost depends on quantity, how voltage depends on current. The graph of a function is a picture of this relationship, and being able to read and build graphs is central to understanding what a formula actually says.

This unit covers the two most important function types in this course: linear functions (straight lines) and quadratic functions (parabolas), and how to read information out of their graphs.

## Concepts and formulas
- Function $f(x)$: for every x-value (the domain) the function gives exactly one y-value ($f(x)$, the range).
- Linear function: $f(x)=ax+b$, the graph is a straight line. $a$ is the slope (the change in y per change in x), and $b$ is the y-intercept (where the line crosses the y-axis, at $x=0$).
- Slope between two points: $a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{\\Delta y}{\\Delta x}$.
- A positive $a$ gives a rising graph, a negative $a$ a falling graph, and $a=0$ a horizontal line. A larger $|a|$ gives a steeper line.
- A line through a point with a known slope: $y-y_1=a(x-x_1)$.
- Quadratic function: $f(x)=ax^2+bx+c$ ($a\\neq0$), the graph is a parabola. $a>0$: the parabola opens upward (has a minimum); $a<0$: it opens downward (has a maximum).
- Vertex: the x-coordinate is $x_t=-\\dfrac{b}{2a}$; substitute it back into the function to find the y-coordinate.
- Zeros (where the graph crosses the x-axis): solve $ax^2+bx+c=0$ with the quadratic formula (from the previous unit).
- The axis of symmetry of the parabola is the vertical line $x=x_t$ through the vertex.

## How to solve the problems
1. To find the slope between two points: substitute into $a=\\Delta y/\\Delta x$, being careful with the order.
2. To find the function expression of a straight line: find $a$ first, then substitute one point to find $b$.
3. To read a graph: look at where it crosses the axes, whether it rises or falls, and (for parabolas) where the vertex is.
4. To find the vertex of a parabola: use $x_t=-b/2a$, then substitute it into the function for the y-value.
5. To find the zeros: set $f(x)=0$ and solve the quadratic equation.
6. Check the answer: substitute the x-value back into the function expression and see that you get the right y-value.

### Example
A straight line passes through the points $(1,3)$ and $(4,12)$. Find the function expression.

Slope: $a=\\dfrac{12-3}{4-1}=\\dfrac{9}{3}=3$. Substitute the point $(1,3)$: $3=3\\cdot1+b \\Rightarrow b=0$. The function is $f(x)=3x$.

Find the vertex of $f(x)=-2x^2+8x+3$. Here $a=-2,b=8$, so $x_t=-\\dfrac{8}{2\\cdot(-2)}=2$. Then $f(2)=-2\\cdot4+16+3=11$. The vertex is $(2,11)$, and since $a<0$ this is a maximum.

## Common mistakes
- Swapping $\\Delta y$ and $\\Delta x$ in the slope formula (remember: change in y over change in x).
- Believing that $b$ in $f(x)=ax+b$ is the slope - it is $a$ that is the slope.
- Sign errors in $x_t=-b/2a$, especially when $b$ or $a$ is negative.
- Believing every quadratic function has zeros - if the vertex lies above the x-axis (parabola opening downward) or below the x-axis (parabola opening upward), there may be no zeros. This connects to the sign of the discriminant.
- Reading the graph the wrong way round (mixing up the x- and y-axis) or misreading the scale.

> The slope $a=\\Delta y/\\Delta x$ tells you how steep a straight line is and in which direction it goes. For a parabola $f(x)=ax^2+bx+c$, find the vertex with $x_t=-b/2a$, and the zeros with the quadratic formula.`
});

BIQ("GMAT", 3, [
  ["Hva er stigningstallet til $f(x)=4x-7$?", ["4", "-7", "-4", "7"],
   "Stigningstallet er koeffisienten foran x, altså 4. Tallet -7 er konstantleddet (skjæringspunktet med y-aksen), ikke stigningstallet.",
   "What is the slope of $f(x)=4x-7$?", ["4", "-7", "-4", "7"],
   "The slope is the coefficient in front of x, i.e. 4. The number -7 is the constant term (the y-intercept), not the slope."],
  ["En rett linje går gjennom punktene $(2,5)$ og $(6,13)$. Hva er stigningstallet?", { n: 2, tol: 0, u: "" },
   "$a=\\dfrac{13-5}{6-2}=\\dfrac{8}{4}=2$.",
   "A straight line passes through the points $(2,5)$ and $(6,13)$. What is the slope?", null,
   "$a=\\dfrac{13-5}{6-2}=\\dfrac{8}{4}=2$."],
  ["Grafen til $f(x)=-3x^2+2x+1$ vender...", ["nedover, med et toppunkt (maksimum)", "oppover, med et bunnpunkt (minimum)", "er en rett linje", "har ingen topp- eller bunnpunkt"],
   "Siden $a=-3<0$, vender parabelen nedover og har et toppunkt (maksimum).",
   "The graph of $f(x)=-3x^2+2x+1$ opens...", ["downward, with a vertex point (maximum)", "upward, with a vertex point (minimum)", "is a straight line", "has no vertex point"],
   "Since $a=-3<0$, the parabola opens downward and has a maximum (vertex point)."],
  ["Finn x-koordinaten til bunnpunktet for $f(x)=x^2-6x+5$.", { n: 3, tol: 0, u: "" },
   "$x_t=-\\dfrac{b}{2a}=-\\dfrac{-6}{2\\cdot1}=3$.",
   "Find the x-coordinate of the vertex of $f(x)=x^2-6x+5$.", null,
   "$x_t=-\\dfrac{b}{2a}=-\\dfrac{-6}{2\\cdot1}=3$."],
  ["Hva er skjæringspunktet med y-aksen for grafen til $f(x)=-x^2+4x+6$?", ["$(0,6)$", "$(0,-1)$", "$(0,4)$", "$(6,0)$"],
   "Skjæring med y-aksen er der $x=0$: $f(0)=6$, altså punktet $(0,6)$. Konstantleddet $c$ er alltid y-verdien når $x=0$.",
   "What is the y-intercept of the graph of $f(x)=-x^2+4x+6$?", ["$(0,6)$", "$(0,-1)$", "$(0,4)$", "$(6,0)$"],
   "The y-intercept is where $x=0$: $f(0)=6$, i.e. the point $(0,6)$. The constant term $c$ is always the y-value when $x=0$."],
  ["En parabel har $a>0$ (vender oppover), og bunnpunktet ligger over x-aksen. Hvor mange nullpunkter har funksjonen?", ["Ingen", "Én", "To", "Uendelig mange"],
   "Vender parabelen oppover og bunnpunktet er over x-aksen, ligger hele grafen over x-aksen, og den krysser aldri x-aksen. Diskriminanten er da negativ, og det finnes ingen reelle nullpunkter.",
   "A parabola has $a>0$ (opens upward), and its vertex lies above the x-axis. How many zeros does the function have?", ["None", "One", "Two", "Infinitely many"],
   "If the parabola opens upward and the vertex is above the x-axis, the whole graph lies above the x-axis and it never crosses the x-axis. The discriminant is then negative, and there are no real zeros."],
  ["En rett linje er parallell med $f(x)=3x+1$ og går gjennom origo $(0,0)$. Hva er funksjonsuttrykket til den nye linja?", ["$g(x)=3x$", "$g(x)=3x+1$", "$g(x)=-3x$", "$g(x)=\\frac{1}{3}x$"],
   "Parallelle linjer har samme stigningstall, så $a=3$. Linja går gjennom origo, så $b=0$. Da er $g(x)=3x$.",
   "A straight line is parallel to $f(x)=3x+1$ and passes through the origin $(0,0)$. What is the function expression for the new line?", ["$g(x)=3x$", "$g(x)=3x+1$", "$g(x)=-3x$", "$g(x)=\\frac{1}{3}x$"],
   "Parallel lines have the same slope, so $a=3$. The line passes through the origin, so $b=0$. This gives $g(x)=3x$."],
  ["Høyden til en ball som kastes rett opp, er gitt ved $h(t)=-5t^2+20t+1{,}5$ (meter, $t$ i sekunder). Hvor høyt er ballen når den er på sitt høyeste?", { n: 21.5, tol: 0.1, u: "m" },
   "Toppunktet: $t_t=-\\dfrac{20}{2\\cdot(-5)}=2$ s. Sett inn: $h(2)=-5\\cdot2^2+20\\cdot2+1{,}5=-20+40+1{,}5=21{,}5$ m.",
   "The height of a ball thrown straight up is given by $h(t)=-5t^2+20t+1.5$ (meters, $t$ in seconds). How high is the ball at its highest point?", null,
   "The vertex: $t_t=-\\dfrac{20}{2\\cdot(-5)}=2$ s. Substitute: $h(2)=-5\\cdot2^2+20\\cdot2+1.5=-20+40+1.5=21.5$ m."]
]);

GEN("GMAT", 3,
 // 1) stigningstall mellom to punkter
 () => { let a; do { a = R.i(-8, 8); } while (a === 0);
   const x1 = R.i(-6, 6), dx = R.i(1, 8), x2 = x1 + dx, b = R.i(-9, 9), y1 = a * x1 + b, y2 = a * x2 + b;
   return [T(`En rett linje går gjennom punktene $(${x1}, ${y1})$ og $(${x2}, ${y2})$. Hva er stigningstallet?`,
             `A straight line passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$. What is the slope?`),
     { n: a, tol: 0, u: "" },
     T(`$a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{${y2}-(${y1})}{${x2}-(${x1})}=\\dfrac{${y2 - y1}}{${x2 - x1}}=${a}$.`,
       `$a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{${y2}-(${y1})}{${x2}-(${x1})}=\\dfrac{${y2 - y1}}{${x2 - x1}}=${a}$.`)]; },
 // 2) finn konstantleddet b når a og ett punkt er kjent
 () => { let a; do { a = R.i(-6, 6); } while (a === 0);
   const x1 = R.i(-8, 8), y1 = R.i(-20, 20), b = y1 - a * x1;
   return [T(`En rett linje har stigningstall $a=${a}$ og går gjennom punktet $(${x1}, ${y1})$. Hva er konstantleddet $b$ i $f(x)=ax+b$?`,
             `A straight line has slope $a=${a}$ and passes through the point $(${x1}, ${y1})$. What is the constant term $b$ in $f(x)=ax+b$?`),
     { n: b, tol: 0, u: "" },
     T(`Sett punktet inn i $y=ax+b$: $${y1}=${a}\\cdot(${x1})+b$, som gir $b=${y1}-(${a * x1})=${b}$.`,
       `Substitute the point into $y=ax+b$: $${y1}=${a}\\cdot(${x1})+b$, which gives $b=${y1}-(${a * x1})=${b}$.`)]; },
 // 3) evaluere en andregradsfunksjon
 () => { let a; do { a = R.i(-4, 4); } while (a === 0);
   const bC = R.i(-6, 6), c = R.i(-9, 9), x0 = R.i(-5, 5), v = a * x0 * x0 + bC * x0 + c, fx = poly(a, bC, c);
   return [T(`Funksjonen er $f(x)=${fx}$. Hva er $f(${x0})$?`, `The function is $f(x)=${fx}$. What is $f(${x0})$?`),
     { n: v, tol: 0, u: "" },
     T(`Sett inn $x=${x0}$: $f(${x0})=${a}\\cdot(${x0})^2 + (${bC})\\cdot(${x0}) + (${c}) = ${v}$.`,
       `Substitute $x=${x0}$: $f(${x0})=${a}\\cdot(${x0})^2 + (${bC})\\cdot(${x0}) + (${c}) = ${v}$.`)]; },
 // 4) toppunkt/bunnpunkt, y-koordinat
 () => { let a; do { a = R.i(-5, 5); } while (a === 0);
   const bC = R.i(-10, 10), c = R.i(-9, 9), xt = -bC / (2 * a), yt = a * xt * xt + bC * xt + c, fx = poly(a, bC, c);
   return [T(`Finn y-koordinaten til toppunktet/bunnpunktet for $f(x)=${fx}$.`, `Find the y-coordinate of the vertex of $f(x)=${fx}$.`),
     { n: yt, tol: rel(yt, 0.01, 0.02), u: "" },
     T(`$x_t=-\\dfrac{b}{2a}=-\\dfrac{${bC}}{2\\cdot(${a})}=${mf(xt, 3)}$. Sett inn: $f(${mf(xt, 3)})=${a}\\cdot(${mf(xt, 3)})^2+(${bC})\\cdot(${mf(xt, 3)})+(${c})=${mf(yt, 3)}$.`,
       `$x_t=-\\dfrac{b}{2a}=-\\dfrac{${bC}}{2\\cdot(${a})}=${mf(xt, 3)}$. Substitute: $f(${mf(xt, 3)})=${a}\\cdot(${mf(xt, 3)})^2+(${bC})\\cdot(${mf(xt, 3)})+(${c})=${mf(yt, 3)}$.`)]; },
 // 5) nullpunkter med abc-formelen (heltallsrøtter, oppgi den største)
 () => { let r1, r2; do { r1 = R.i(-9, 9); } while (r1 === 0); do { r2 = R.i(-9, 9); } while (r2 === 0 || r2 === r1);
   if (r1 > r2) { const t = r1; r1 = r2; r2 = t; }
   const a = R.p([1, 2, 3]), bC = -a * (r1 + r2), c = a * r1 * r2, fx = poly(a, bC, c);
   return [T(`Finn det største nullpunktet til $f(x)=${fx}$.`, `Find the largest zero of $f(x)=${fx}$.`),
     { n: r2, tol: 0, u: "" },
     T(`Sett $f(x)=0$: $${fx}=0$. abc-formelen med $a=${a},\\,b=${bC},\\,c=${c}$ gir $x=${r1}$ eller $x=${r2}$; det største er $x=${r2}$.`,
       `Set $f(x)=0$: $${fx}=0$. The quadratic formula with $a=${a},\\,b=${bC},\\,c=${c}$ gives $x=${r1}$ or $x=${r2}$; the largest is $x=${r2}$.`)]; },
 // 6) optimering: maksimal inntekt (eksamensnivå)
 () => { const a = R.p([-1, -2, -3, -4]), xt = R.i(10, 60), bC = -2 * a * xt, fx = poly(a, bC, 0), yt = a * xt * xt + bC * xt;
   return [T(`Inntekten (kr) ved å selge $x$ enheter av et produkt er gitt ved $I(x)=${fx}$. Hvor mange enheter gir størst inntekt, og hva er den høyeste inntekten (i kr)?`,
             `The revenue (NOK) from selling $x$ units of a product is given by $I(x)=${fx}$. How many units give the greatest revenue, and what is the maximum revenue (in NOK)?`),
     { n: yt, tol: 0, u: "kr" },
     T(`Toppunktet: $x_t=-\\dfrac{b}{2a}=-\\dfrac{${bC}}{2\\cdot(${a})}=${xt}$ enheter. Høyeste inntekt: $I(${xt})=${a}\\cdot${xt}^2+(${bC})\\cdot${xt}=${yt}$ kr.`,
       `The vertex: $x_t=-\\dfrac{b}{2a}=-\\dfrac{${bC}}{2\\cdot(${a})}=${xt}$ units. Maximum revenue: $I(${xt})=${a}\\cdot${xt}^2+(${bC})\\cdot${xt}=${yt}$ NOK.`)]; }
);

})();
