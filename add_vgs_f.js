// ============================================================
//  add_vgs_f.js – Matematikk S1 og S2 (samfunnsfaglig matematikk)
//  Mye av pensumet overlapper med 1T, R1 og R2. Slike enheter deles med SHAREUNIT
//  (samme oppgaver og teori, egen fremgang), så S-elevene får alt uten dobbeltarbeid for oss.
// ============================================================
(() => {
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const kr = x => mf(Math.round(x * 100) / 100, 2);
// Standard normalfordeling: Φ(z)
const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
const nCk = (n, k) => { let r = 1; for(let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

// ================= S1: felles enheter + økonomi =================
SHAREUNIT("VGS1", "VG1T", "Ulikheter og fortegnslinjer", "1T", "1T");
SHAREUNIT("VGS1", "VGR1", 0, "R1", "R1"); // logaritmer og eksponentiallikninger
SHAREUNIT("VGS1", "VG1T", "Eksponentielle modeller", "1T", "1T");
const S1_OK = ADDUNIT("VGS1", "Kostnad, inntekt og overskudd", "Cost, revenue and profit");

TH("VGS1", S1_OK, `## Hva handler det om?
Bedrifter bruker funksjoner for å beskrive hva det koster å produsere $x$ enheter, hva de tjener, og når overskuddet blir størst. Den deriverte kalles her **grensekostnad** og **grenseinntekt**.

## Begreper og formler
- Kostnadsfunksjon $K(x)$: faste kostnader (konstantleddet) pluss variable kostnader. Eksempel: $K(x) = 0{,}02x^2 + 20x + 5000$.
- Inntektsfunksjon ved fast pris $p$: $I(x) = p \\cdot x$.
- Overskudd: $O(x) = I(x) - K(x)$.
- Grensekostnad $K'(x)$: omtrent hva det koster å lage én enhet til. Grenseinntekt $I'(x)$ på samme måte.
- Størst overskudd når $O'(x) = 0$, altså når **grenseinntekt = grensekostnad**: $I'(x) = K'(x)$.
- Enhetskostnad $E(x) = \\dfrac{K(x)}{x}$. Den er minst der $E(x) = K'(x)$.

### Eksempel
$K(x) = 0{,}02x^2 + 20x + 5000$ og prisen er 100 kr. $O'(x) = 100 - (0{,}04x + 20) = 0$ gir $x = 2000$ enheter.
Overskuddet er da $O(2000) = 200\\,000 - (80\\,000 + 40\\,000 + 5000) = 75\\,000$ kr.

> Produser så lenge én enhet til gir mer inntekt enn den koster.`,
`## What is it about?
Businesses use functions to describe what it costs to produce $x$ units, what they earn, and when the profit is largest. The derivative is here called **marginal cost** and **marginal revenue**.

## Concepts and formulas
- Cost function $K(x)$: fixed costs (the constant term) plus variable costs. Example: $K(x) = 0.02x^2 + 20x + 5000$.
- Revenue function at a fixed price $p$: $I(x) = p \\cdot x$.
- Profit: $O(x) = I(x) - K(x)$.
- Marginal cost $K'(x)$: roughly what it costs to make one more unit. Marginal revenue $I'(x)$ likewise.
- Largest profit when $O'(x) = 0$, i.e. when **marginal revenue = marginal cost**: $I'(x) = K'(x)$.
- Unit cost $E(x) = \\dfrac{K(x)}{x}$. It is smallest where $E(x) = K'(x)$.

### Example
$K(x) = 0.02x^2 + 20x + 5000$ and the price is 100 NOK. $O'(x) = 100 - (0.04x + 20) = 0$ gives $x = 2000$ units.
The profit is then $O(2000) = 200\\,000 - (80\\,000 + 40\\,000 + 5000) = 75\\,000$ NOK.

> Keep producing as long as one more unit brings in more than it costs.`);
BIQ("VGS1", S1_OK, [
 ["Hva er grensekostnad?", ["Den deriverte av kostnadsfunksjonen", "Den største kostnaden", "Kostnaden delt på antall enheter", "De faste kostnadene"], "$K'(x)$ er omtrent kostnaden ved å lage én enhet til.",
  "What is marginal cost?", ["The derivative of the cost function", "The largest cost", "The cost divided by the number of units", "The fixed costs"], "$K'(x)$ is roughly the cost of making one more unit."],
 ["Overskuddet er størst når …", ["grenseinntekt = grensekostnad", "inntekt = kostnad", "kostnaden er minst", "prisen er høyest"], "$O'(x) = I'(x) - K'(x) = 0$.",
  "The profit is largest when …", ["marginal revenue = marginal cost", "revenue = cost", "the cost is smallest", "the price is highest"], "$O'(x) = I'(x) - K'(x) = 0$."],
 ["$K(x) = 0{,}5x^2 + 10x + 200$. Hva er grensekostnaden ved $x = 20$?", { n: 30, tol: 0, u: "kr" }, "$K'(x) = x + 10$, så $K'(20) = 30$ kr.",
  "$K(x) = 0.5x^2 + 10x + 200$. What is the marginal cost at $x = 20$?", null, "$K'(x) = x + 10$, so $K'(20) = 30$ NOK."],
 ["$K(x) = 0{,}5x^2 + 10x + 200$. Hva er enhetskostnaden ved $x = 20$?", { n: 30, tol: 0, u: "kr" }, "$E(20) = \\dfrac{200 + 200 + 200}{20} = \\dfrac{600}{20} = 30$ kr. Her er $E = K'$, så dette er minste enhetskostnad.",
  "$K(x) = 0.5x^2 + 10x + 200$. What is the unit cost at $x = 20$?", null, "$E(20) = \\dfrac{200 + 200 + 200}{20} = \\dfrac{600}{20} = 30$ NOK. Here $E = K'$, so this is the minimum unit cost."],
 ["Hva er de faste kostnadene i $K(x) = 3x^2 + 50x + 8000$?", { n: 8000, tol: 0, u: "kr" }, "Konstantleddet er kostnaden selv når $x = 0$: 8000 kr.",
  "What are the fixed costs in $K(x) = 3x^2 + 50x + 8000$?", null, "The constant term is the cost even when $x = 0$: 8000 NOK."]
]);
GEN("VGS1", S1_OK,
 () => { const a = R.p([0.01, 0.02, 0.05, 0.1, 0.5]), b = R.p([10, 20, 30, 40]), c = R.p([1000, 2000, 5000, 10000]), p = b + R.p([20, 40, 60, 80]), x = (p - b) / (2 * a), O = p * x - (a * x * x + b * x + c);
   return [T(`$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$ og prisen er ${p} kr per enhet. Hvor mange enheter gir størst overskudd?`, `$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$ and the price is ${p} NOK per unit. How many units give the largest profit?`), { n: x, tol: 0.5, u: "" },
     T(`$O'(x) = ${p} - (${mf(2 * a)}x + ${b}) = 0$ gir $x = ${mf(x)}$. Overskuddet blir $${mf(O, 0)}$ kr.`, `$O'(x) = ${p} - (${mf(2 * a)}x + ${b}) = 0$ gives $x = ${mf(x)}$. The profit becomes $${mf(O, 0)}$ NOK.`)]; },
 () => { const a = R.p([0.1, 0.2, 0.5, 1, 2]), b = R.p([5, 10, 20]), c = R.p([200, 500, 800, 1800]), x = Math.sqrt(c / a), E = a * x + b + c / x;
   return [T(`$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$. For hvilken $x$ er enhetskostnaden $E(x) = K(x)/x$ minst?`, `$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$. For which $x$ is the unit cost $E(x) = K(x)/x$ smallest?`), { n: x, tol: rel(x, 0.01, 0.05), u: "" },
     T(`$E(x) = ${mf(a)}x + ${b} + \\dfrac{${c}}{x}$, $E'(x) = ${mf(a)} - \\dfrac{${c}}{x^2} = 0$ gir $x = \\sqrt{${mf(c / a)}} = ${mf(x, 2)}$. Enhetskostnaden er da $${mf(E, 2)}$ kr.`, `$E(x) = ${mf(a)}x + ${b} + \\dfrac{${c}}{x}$, $E'(x) = ${mf(a)} - \\dfrac{${c}}{x^2} = 0$ gives $x = \\sqrt{${mf(c / a)}} = ${mf(x, 2)}$. The unit cost is then $${mf(E, 2)}$ NOK.`)]; },
 () => { const a = R.p([0.5, 1, 2, 0.1]), b = R.p([4, 10, 20]), c = R.p([100, 300, 500]), x = R.p([10, 20, 30, 50]), m = 2 * a * x + b;
   return [T(`$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$. Hva er grensekostnaden ved $x = ${x}$?`, `$K(x) = ${mf(a)}x^2 + ${b}x + ${c}$. What is the marginal cost at $x = ${x}$?`), { n: m, tol: 0.01, u: "kr" },
     T(`$K'(x) = ${mf(2 * a)}x + ${b}$, så $K'(${x}) = ${mf(m)}$ kr.`, `$K'(x) = ${mf(2 * a)}x + ${b}$, so $K'(${x}) = ${mf(m)}$ NOK.`)]; }
);

// ================= S2 =================
NEWCOURSE({ code: "VGS2", study: "vgs", group: "VGS: matematikk", nb: "Matematikk S2", en: "Mathematics S2", s: ["S2", "S2"], eqText: VG_EQ("Vg3 samfunnsfaglig matematikk (LK20)", "Year 13, social science maths (Norwegian curriculum)"), units: [] });
SHAREUNIT("VGS2", "VGR2", 1, "R2", "R2"); // følger og rekker
const S2_OK = ADDUNIT("VGS2", "Sparing, lån og nåverdi", "Savings, loans and present value");
SHAREUNIT("VGS2", "VGR1", "Derivasjonsregler i praksis", "R1", "R1");
SHAREUNIT("VGS2", "VGS1", S1_OK, "S1", "S1");
const S2_FORD = ADDUNIT("VGS2", "Sannsynlighetsfordelinger", "Probability distributions");
const S2_HYP = ADDUNIT("VGS2", "Hypotesetesting", "Hypothesis testing");

TH("VGS2", S2_OK, `## Hva handler det om?
Sparing, lån og investeringer er geometriske rekker i forkledning. Hver innbetaling vokser (eller diskonteres) med samme faktor, så summen blir en geometrisk rekke.

## Begreper og formler
- Vekstfaktor per termin: $k = 1 + r$, der $r$ er renten per termin som desimaltall.
- **Sparing** (sluttverdi): $a$ kr settes inn på slutten av hver termin i $n$ terminer. Rett etter siste innskudd er saldoen $S = a \\cdot \\dfrac{k^n - 1}{k - 1}$.
- **Nåverdi**: et beløp $B$ om $n$ terminer er verdt $\\dfrac{B}{k^n}$ i dag. Nåverdien av $n$ like beløp $a$ (første om én termin) er $N = a \\cdot \\dfrac{1 - k^{-n}}{r}$.
- **Annuitetslån**: like store terminbeløp. Lånet $L$ er nåverdien av alle terminbeløpene, så $a = \\dfrac{L \\cdot r}{1 - (1 + r)^{-n}}$.
- **Serielån**: like store avdrag $L/n$. Renten regnes av restlånet, så terminbeløpet synker over tid.

### Eksempel
Lån på 1 000 000 kr, 5 % rente, 20 årlige terminer (annuitet): $a = \\dfrac{1\\,000\\,000 \\cdot 0{,}05}{1 - 1{,}05^{-20}} \\approx 80\\,243$ kr per år.
Som serielån er første terminbeløp $50\\,000 + 50\\,000 = 100\\,000$ kr, og det synker med 2500 kr hvert år.

> Tegn en tidslinje med innbetalingene, og flytt alt til samme tidspunkt før du summerer.`,
`## What is it about?
Savings, loans and investments are geometric series in disguise. Each payment grows (or is discounted) by the same factor, so the sum becomes a geometric series.

## Concepts and formulas
- Growth factor per period: $k = 1 + r$, where $r$ is the interest rate per period as a decimal.
- **Savings** (future value): $a$ NOK is deposited at the end of each period for $n$ periods. Right after the last deposit the balance is $S = a \\cdot \\dfrac{k^n - 1}{k - 1}$.
- **Present value**: an amount $B$ in $n$ periods is worth $\\dfrac{B}{k^n}$ today. The present value of $n$ equal amounts $a$ (the first in one period) is $N = a \\cdot \\dfrac{1 - k^{-n}}{r}$.
- **Annuity loan**: equal instalments. The loan $L$ is the present value of all instalments, so $a = \\dfrac{L \\cdot r}{1 - (1 + r)^{-n}}$.
- **Serial loan**: equal repayments $L/n$. Interest is charged on the remaining loan, so the instalment decreases over time.

### Example
A loan of 1,000,000 NOK, 5 % interest, 20 annual instalments (annuity): $a = \\dfrac{1\\,000\\,000 \\cdot 0.05}{1 - 1.05^{-20}} \\approx 80\\,243$ NOK per year.
As a serial loan, the first instalment is $50\\,000 + 50\\,000 = 100\\,000$ NOK, and it decreases by 2500 NOK each year.

> Draw a timeline with the payments, and move everything to the same point in time before adding.`);
BIQ("VGS2", S2_OK, [
 ["Du setter inn 10 000 kr på slutten av hvert år i 5 år med 4 % rente. Hva har du rett etter siste innskudd?", { n: 54163.2, tol: 2, u: "kr" }, "$10\\,000 \\cdot \\dfrac{1{,}04^5 - 1}{0{,}04} = 54\\,163{,}2$ kr.",
  "You deposit 10,000 NOK at the end of each year for 5 years at 4 % interest. What do you have right after the last deposit?", null, "$10\\,000 \\cdot \\dfrac{1.04^5 - 1}{0.04} = 54\\,163.2$ NOK."],
 ["Hva er nåverdien av 1000 kr om ett, to og tre år, med 10 % rente?", { n: 2486.85, tol: 0.5, u: "kr" }, "$\\dfrac{1000}{1{,}1} + \\dfrac{1000}{1{,}1^2} + \\dfrac{1000}{1{,}1^3} = 2486{,}85$ kr.",
  "What is the present value of 1000 NOK in one, two and three years, at 10 % interest?", null, "$\\dfrac{1000}{1.1} + \\dfrac{1000}{1.1^2} + \\dfrac{1000}{1.1^3} = 2486.85$ NOK."],
 ["Hva kjennetegner et serielån?", ["Like store avdrag, synkende terminbeløp", "Like store terminbeløp", "Ingen renter", "Økende avdrag"], "Avdraget er $L/n$ hver gang, og renten av restlånet synker.",
  "What characterises a serial loan?", ["Equal repayments, decreasing instalments", "Equal instalments", "No interest", "Increasing repayments"], "The repayment is $L/n$ each time, and the interest on the remaining loan decreases."],
 ["Serielån på 600 000 kr over 20 år med 4 % rente. Hva er første terminbeløp?", { n: 54000, tol: 0, u: "kr" }, "Avdrag $600\\,000/20 = 30\\,000$ og rente $0{,}04 \\cdot 600\\,000 = 24\\,000$, til sammen 54 000 kr.",
  "Serial loan of 600,000 NOK over 20 years at 4 % interest. What is the first instalment?", null, "Repayment $600\\,000/20 = 30\\,000$ and interest $0.04 \\cdot 600\\,000 = 24\\,000$, 54,000 NOK in total."],
 ["Hvorfor er nåverdien av 1000 kr om 10 år mindre enn 1000 kr?", ["Pengene kunne vokst med renter i mellomtiden", "På grunn av skatt", "Fordi kronen blir sterkere", "Det er den ikke"], "Et mindre beløp i dag vokser til 1000 kr med renter.",
  "Why is the present value of 1000 NOK in 10 years less than 1000 NOK?", ["The money could have grown with interest in the meantime", "Because of tax", "Because the currency gets stronger", "It isn't"], "A smaller amount today grows to 1000 NOK with interest."]
]);
GEN("VGS2", S2_OK,
 () => { const a = R.p([500, 1000, 2000, 5000, 10000]), r = R.p([2, 3, 4, 5, 6]) / 100, n = R.i(3, 25), k = 1 + r, S = a * (k ** n - 1) / r;
   return [T(`Du sparer ${nf(a, 0)} kr på slutten av hvert år i ${n} år med ${nf(r * 100)} % rente. Hva er saldoen rett etter siste innskudd?`, `You save ${nf(a, 0)} NOK at the end of each year for ${n} years at ${nf(r * 100)} % interest. What is the balance right after the last deposit?`), { n: S, tol: rel(S, 0.002, 1), u: "kr" },
     T(`$S = ${a} \\cdot \\dfrac{${mf(k)}^{${n}} - 1}{${mf(r)}} = ${kr(S)}$ kr.`, `$S = ${a} \\cdot \\dfrac{${mf(k)}^{${n}} - 1}{${mf(r)}} = ${kr(S)}$ NOK.`)]; },
 () => { const L = R.p([200000, 500000, 1000000, 2500000, 3000000]), r = R.p([3, 4, 5, 6]) / 100, n = R.p([10, 15, 20, 25, 30]), a = L * r / (1 - (1 + r) ** -n);
   return [T(`Et annuitetslån på ${nf(L, 0)} kr har ${nf(r * 100)} % rente og ${n} årlige terminer. Hva er terminbeløpet?`, `An annuity loan of ${nf(L, 0)} NOK has ${nf(r * 100)} % interest and ${n} annual instalments. What is the instalment?`), { n: a, tol: rel(a, 0.002, 1), u: "kr" },
     T(`$a = \\dfrac{${L} \\cdot ${mf(r)}}{1 - ${mf(1 + r)}^{-${n}}} = ${kr(a)}$ kr.`, `$a = \\dfrac{${L} \\cdot ${mf(r)}}{1 - ${mf(1 + r)}^{-${n}}} = ${kr(a)}$ NOK.`)]; },
 () => { const a = R.p([1000, 5000, 20000, 50000]), r = R.p([4, 5, 6, 8, 10]) / 100, n = R.i(3, 15), N = a * (1 - (1 + r) ** -n) / r;
   return [T(`En investering gir ${nf(a, 0)} kr hvert år i ${n} år, første gang om ett år. Hva er nåverdien med ${nf(r * 100)} % kalkulasjonsrente?`, `An investment pays ${nf(a, 0)} NOK every year for ${n} years, the first in one year. What is the present value at a ${nf(r * 100)} % discount rate?`), { n: N, tol: rel(N, 0.002, 1), u: "kr" },
     T(`$N = ${a} \\cdot \\dfrac{1 - ${mf(1 + r)}^{-${n}}}{${mf(r)}} = ${kr(N)}$ kr.`, `$N = ${a} \\cdot \\dfrac{1 - ${mf(1 + r)}^{-${n}}}{${mf(r)}} = ${kr(N)}$ NOK.`)]; },
 () => { const L = R.p([300000, 600000, 1200000, 2000000]), n = R.p([10, 20, 25]), r = R.p([3, 4, 5]) / 100, t = R.i(1, 8), avd = L / n, rest = L - (t - 1) * avd, T_ = avd + r * rest;
   return [T(`Serielån på ${nf(L, 0)} kr, ${n} årlige terminer, ${nf(r * 100)} % rente. Hva er terminbeløp nummer ${t}?`, `Serial loan of ${nf(L, 0)} NOK, ${n} annual instalments, ${nf(r * 100)} % interest. What is instalment number ${t}?`), { n: T_, tol: 1, u: "kr" },
     T(`Avdrag $${mf(avd, 0)}$ kr. Restlånet før termin ${t} er $${mf(rest, 0)}$ kr, renten $${mf(r * rest, 0)}$ kr. Terminbeløpet er $${mf(T_, 0)}$ kr.`, `Repayment $${mf(avd, 0)}$ NOK. The remaining loan before instalment ${t} is $${mf(rest, 0)}$ NOK, the interest $${mf(r * rest, 0)}$ NOK. The instalment is $${mf(T_, 0)}$ NOK.`)]; }
);

TH("VGS2", S2_FORD, `## Hva handler det om?
En sannsynlighetsfordeling forteller hvor sannsynlig hvert mulig utfall er. Med forventning og standardavvik beskriver du «midten» og «spredningen». De to viktigste fordelingene er binomisk fordeling og normalfordelingen.

## Begreper og formler
- Forventningsverdi: $E(X) = \\sum x \\cdot P(X = x)$. For en terning: $E(X) = 3{,}5$.
- Varians $\\text{Var}(X) = \\sum (x - \\mu)^2 P(X = x)$, standardavvik $\\sigma = \\sqrt{\\text{Var}(X)}$.
- **Binomisk fordeling** ($n$ uavhengige forsøk, sannsynlighet $p$ for suksess): $P(X = k) = \\binom{n}{k}p^k(1 - p)^{n - k}$, $E(X) = np$, $\\sigma = \\sqrt{np(1 - p)}$.
- **Normalfordelingen** $N(\\mu, \\sigma)$: klokkeformet. Omtrent 68 % ligger innenfor $\\mu \\pm \\sigma$, 95 % innenfor $\\mu \\pm 2\\sigma$ og 99,7 % innenfor $\\mu \\pm 3\\sigma$.
- Standardisering: $Z = \\dfrac{X - \\mu}{\\sigma}$, og $P(X < a) = \\Phi\\!\\left(\\dfrac{a - \\mu}{\\sigma}\\right)$. Viktige verdier: $\\Phi(1{,}645) = 0{,}95$, $\\Phi(1{,}96) = 0{,}975$.
- Sentralgrenseteoremet: summer og gjennomsnitt av mange uavhengige variabler blir tilnærmet normalfordelt.

### Eksempel
Høyden til 18-åringer er $N(175, 7)$ cm. Andelen under 182 cm er $\\Phi\\!\\left(\\dfrac{182 - 175}{7}\\right) = \\Phi(1) \\approx 0{,}841$.

> Binomisk: tell suksesser i faste forsøk. Normal: målinger som samler seg rundt et gjennomsnitt.`,
`## What is it about?
A probability distribution tells you how likely each possible outcome is. With the expected value and the standard deviation you describe the "centre" and the "spread". The two most important distributions are the binomial distribution and the normal distribution.

## Concepts and formulas
- Expected value: $E(X) = \\sum x \\cdot P(X = x)$. For a die: $E(X) = 3.5$.
- Variance $\\text{Var}(X) = \\sum (x - \\mu)^2 P(X = x)$, standard deviation $\\sigma = \\sqrt{\\text{Var}(X)}$.
- **Binomial distribution** ($n$ independent trials, probability $p$ of success): $P(X = k) = \\binom{n}{k}p^k(1 - p)^{n - k}$, $E(X) = np$, $\\sigma = \\sqrt{np(1 - p)}$.
- **The normal distribution** $N(\\mu, \\sigma)$: bell-shaped. About 68 % lies within $\\mu \\pm \\sigma$, 95 % within $\\mu \\pm 2\\sigma$ and 99.7 % within $\\mu \\pm 3\\sigma$.
- Standardisation: $Z = \\dfrac{X - \\mu}{\\sigma}$, and $P(X < a) = \\Phi\\!\\left(\\dfrac{a - \\mu}{\\sigma}\\right)$. Key values: $\\Phi(1.645) = 0.95$, $\\Phi(1.96) = 0.975$.
- The central limit theorem: sums and averages of many independent variables become approximately normally distributed.

### Example
The height of 18-year-olds is $N(175, 7)$ cm. The share below 182 cm is $\\Phi\\!\\left(\\dfrac{182 - 175}{7}\\right) = \\Phi(1) \\approx 0.841$.

> Binomial: count successes in a fixed number of trials. Normal: measurements clustering around an average.`);
BIQ("VGS2", S2_FORD, [
 ["Hva er forventningsverdien når du kaster én terning?", { n: 3.5, tol: 0, u: "" }, "$\\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3{,}5$.",
  "What is the expected value when you roll one die?", null, "$\\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5$."],
 ["Du kaster fire mynter. Hva er $P(\\text{nøyaktig 2 kron})$?", { n: 0.375, tol: 0.0001, u: "" }, "$\\binom{4}{2}0{,}5^4 = 6/16 = 0{,}375$.",
  "You toss four coins. What is $P(\\text{exactly 2 heads})$?", null, "$\\binom{4}{2}0.5^4 = 6/16 = 0.375$."],
 ["$X$ er binomisk med $n = 20$ og $p = 0{,}3$. Hva er $E(X)$?", { n: 6, tol: 0, u: "" }, "$E(X) = np = 20 \\cdot 0{,}3 = 6$.",
  "$X$ is binomial with $n = 20$ and $p = 0.3$. What is $E(X)$?", null, "$E(X) = np = 20 \\cdot 0.3 = 6$."],
 ["Omtrent hvor stor andel av en normalfordeling ligger innenfor $\\mu \\pm 2\\sigma$?", ["95 %", "68 %", "99,7 %", "50 %"], "68–95–99,7-regelen.",
  "Approximately what share of a normal distribution lies within $\\mu \\pm 2\\sigma$?", ["95 %", "68 %", "99.7 %", "50 %"], "The 68–95–99.7 rule."],
 ["$X \\sim N(175, 7)$. Hva er $Z$-verdien til $X = 189$?", { n: 2, tol: 0, u: "" }, "$Z = \\dfrac{189 - 175}{7} = 2$.",
  "$X \\sim N(175, 7)$. What is the $Z$-value of $X = 189$?", null, "$Z = \\dfrac{189 - 175}{7} = 2$."],
 ["Hvilken situasjon passer for binomisk fordeling?", ["Antall riktige av 10 gjettede flervalgsoppgaver", "Høyden til elever", "Ventetiden på bussen", "Temperaturen i morgen"], "Faste, uavhengige forsøk med samme sannsynlighet, og vi teller suksesser.",
  "Which situation suits the binomial distribution?", ["The number correct out of 10 guessed multiple-choice questions", "The height of students", "The waiting time for the bus", "Tomorrow's temperature"], "Fixed, independent trials with the same probability, counting successes."]
]);
GEN("VGS2", S2_FORD,
 () => { const n = R.i(4, 15), p = R.p([0.1, 0.2, 0.25, 0.3, 0.5, 0.6, 0.8]), k = R.i(0, Math.min(n, 6)), P = nCk(n, k) * p ** k * (1 - p) ** (n - k);
   return [T(`$X$ er binomisk fordelt med $n = ${n}$ og $p = ${mf(p)}$. Finn $P(X = ${k})$.`, `$X$ is binomially distributed with $n = ${n}$ and $p = ${mf(p)}$. Find $P(X = ${k})$.`), { n: P, tol: Math.max(0.0005, P * 0.005), u: "" },
     T(`$\\binom{${n}}{${k}} \\cdot ${mf(p)}^{${k}} \\cdot ${mf(1 - p)}^{${n - k}} = ${nCk(n, k)} \\cdot ${mf(p ** k, 5)} \\cdot ${mf((1 - p) ** (n - k), 5)} = ${mf(P, 4)}$.`, `$\\binom{${n}}{${k}} \\cdot ${mf(p)}^{${k}} \\cdot ${mf(1 - p)}^{${n - k}} = ${nCk(n, k)} \\cdot ${mf(p ** k, 5)} \\cdot ${mf((1 - p) ** (n - k), 5)} = ${mf(P, 4)}$.`)]; },
 () => { const n = R.p([20, 50, 100, 200, 400]), p = R.p([0.1, 0.2, 0.25, 0.4, 0.5]), s = Math.sqrt(n * p * (1 - p));
   return [T(`$X$ er binomisk med $n = ${n}$ og $p = ${mf(p)}$. Hva er standardavviket?`, `$X$ is binomial with $n = ${n}$ and $p = ${mf(p)}$. What is the standard deviation?`), { n: s, tol: rel(s, 0.005), u: "" },
     T(`$\\sigma = \\sqrt{${n} \\cdot ${mf(p)} \\cdot ${mf(1 - p)}} = \\sqrt{${mf(n * p * (1 - p))}} = ${mf(s, 3)}$. (Forventningen er $${mf(n * p)}$.)`, `$\\sigma = \\sqrt{${n} \\cdot ${mf(p)} \\cdot ${mf(1 - p)}} = \\sqrt{${mf(n * p * (1 - p))}} = ${mf(s, 3)}$. (The expected value is $${mf(n * p)}$.)`)]; },
 () => { const [mu, s, unit] = R.p([[175, 7, "cm"], [100, 15, ""], [500, 20, "g"], [70, 10, "kg"], [30, 4, "min"]]), z = R.p([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2]), a = mu + z * s, P = Phi(z);
   return [T(`$X \\sim N(${mu}, ${s})$${unit ? " (" + unit + ")" : ""}. Finn $P(X < ${mf(a)})$.`, `$X \\sim N(${mu}, ${s})$${unit ? " (" + unit + ")" : ""}. Find $P(X < ${mf(a)})$.`), { n: P, tol: 0.003, u: "" },
     T(`$Z = \\dfrac{${mf(a)} - ${mu}}{${s}} = ${mf(z)}$, og $\\Phi(${mf(z)}) = ${mf(P, 4)}$.`, `$Z = \\dfrac{${mf(a)} - ${mu}}{${s}} = ${mf(z)}$, and $\\Phi(${mf(z)}) = ${mf(P, 4)}$.`)]; },
 () => { const xs = [0, 1, 2, 3], ps = R.p([[0.1, 0.3, 0.4, 0.2], [0.25, 0.25, 0.25, 0.25], [0.4, 0.3, 0.2, 0.1], [0.05, 0.15, 0.5, 0.3]]), E = xs.reduce((s, x, i) => s + x * ps[i], 0);
   return [T(`$X$ har fordelingen $P(X = 0) = ${mf(ps[0])}$, $P(X = 1) = ${mf(ps[1])}$, $P(X = 2) = ${mf(ps[2])}$ og $P(X = 3) = ${mf(ps[3])}$. Hva er $E(X)$?`, `$X$ has the distribution $P(X = 0) = ${mf(ps[0])}$, $P(X = 1) = ${mf(ps[1])}$, $P(X = 2) = ${mf(ps[2])}$ and $P(X = 3) = ${mf(ps[3])}$. What is $E(X)$?`), { n: E, tol: 0.001, u: "" },
     T(`$E(X) = 0 \\cdot ${mf(ps[0])} + 1 \\cdot ${mf(ps[1])} + 2 \\cdot ${mf(ps[2])} + 3 \\cdot ${mf(ps[3])} = ${mf(E, 3)}$.`, `$E(X) = 0 \\cdot ${mf(ps[0])} + 1 \\cdot ${mf(ps[1])} + 2 \\cdot ${mf(ps[2])} + 3 \\cdot ${mf(ps[3])} = ${mf(E, 3)}$.`)]; }
);

TH("VGS2", S2_HYP, `## Hva handler det om?
En hypotesetest avgjør om data gir **grunn nok** til å forkaste en påstand. Er en mynt skjev? Virker en ny medisin? Har et nytt opplegg hevet snittkarakteren?

## Begreper og formler
- **Nullhypotesen** $H_0$: «ingen endring», for eksempel $p = 0{,}5$.
- **Alternativ hypotese** $H_1$: det vi vil vise, for eksempel $p > 0{,}5$ (ensidig) eller $p \\ne 0{,}5$ (tosidig).
- **Signifikansnivå** $\\alpha$: vanligvis 5 %. Det er sannsynligheten for å forkaste $H_0$ selv om den er sann (type I-feil).
- **P-verdi**: sannsynligheten for et resultat minst like ekstremt som det vi observerte, **gitt at $H_0$ er sann**.
- Beslutning: er p-verdien mindre enn $\\alpha$, **forkaster** vi $H_0$. Ellers har vi ikke nok bevis (det betyr ikke at $H_0$ er bevist).
- Testobservator for gjennomsnitt: $Z = \\dfrac{\\bar x - \\mu_0}{\\sigma/\\sqrt{n}}$. For en andel: $Z = \\dfrac{X - np_0}{\\sqrt{np_0(1 - p_0)}}$.
- Ensidig test på 5 %-nivå: forkast når $Z > 1{,}645$. Tosidig: når $|Z| > 1{,}96$.

### Eksempel
En mynt gir 60 kron på 100 kast. $H_0: p = 0{,}5$, $H_1: p > 0{,}5$.
$Z = \\dfrac{60 - 50}{\\sqrt{100 \\cdot 0{,}5 \\cdot 0{,}5}} = \\dfrac{10}{5} = 2$. P-verdien er $1 - \\Phi(2) \\approx 0{,}023 < 0{,}05$, så vi forkaster $H_0$: mynten ser ut til å være skjev.

> Liten p-verdi → resultatet er usannsynlig hvis $H_0$ stemmer → forkast $H_0$.`,
`## What is it about?
A hypothesis test decides whether data give **enough reason** to reject a claim. Is a coin biased? Does a new medicine work? Has a new teaching method raised the average grade?

## Concepts and formulas
- **The null hypothesis** $H_0$: "no change", for example $p = 0.5$.
- **The alternative hypothesis** $H_1$: what we want to show, for example $p > 0.5$ (one-sided) or $p \\ne 0.5$ (two-sided).
- **Significance level** $\\alpha$: usually 5 %. It is the probability of rejecting $H_0$ even though it is true (type I error).
- **P-value**: the probability of a result at least as extreme as the one observed, **given that $H_0$ is true**.
- Decision: if the p-value is less than $\\alpha$, we **reject** $H_0$. Otherwise we do not have enough evidence (that does not mean $H_0$ is proved).
- Test statistic for a mean: $Z = \\dfrac{\\bar x - \\mu_0}{\\sigma/\\sqrt{n}}$. For a proportion: $Z = \\dfrac{X - np_0}{\\sqrt{np_0(1 - p_0)}}$.
- One-sided test at the 5 % level: reject when $Z > 1.645$. Two-sided: when $|Z| > 1.96$.

### Example
A coin gives 60 heads in 100 tosses. $H_0: p = 0.5$, $H_1: p > 0.5$.
$Z = \\dfrac{60 - 50}{\\sqrt{100 \\cdot 0.5 \\cdot 0.5}} = \\dfrac{10}{5} = 2$. The p-value is $1 - \\Phi(2) \\approx 0.023 < 0.05$, so we reject $H_0$: the coin appears to be biased.

> Small p-value → the result is unlikely if $H_0$ holds → reject $H_0$.`);
BIQ("VGS2", S2_HYP, [
 ["Hva er p-verdien?", ["Sannsynligheten for et minst like ekstremt resultat hvis $H_0$ er sann", "Sannsynligheten for at $H_0$ er sann", "Sannsynligheten for at $H_1$ er sann", "Signifikansnivået"], "P-verdien regnes ut under forutsetningen at $H_0$ stemmer.",
  "What is the p-value?", ["The probability of a result at least as extreme if $H_0$ is true", "The probability that $H_0$ is true", "The probability that $H_1$ is true", "The significance level"], "The p-value is calculated assuming that $H_0$ holds."],
 ["P-verdien er 0,03 og $\\alpha = 0{,}05$. Hva konkluderer du?", ["Forkast $H_0$", "Behold $H_0$ som bevist", "Forkast $H_1$", "Testen er ugyldig"], "$0{,}03 < 0{,}05$, så resultatet er signifikant.",
  "The p-value is 0.03 and $\\alpha = 0.05$. What do you conclude?", ["Reject $H_0$", "Keep $H_0$ as proved", "Reject $H_1$", "The test is invalid"], "$0.03 < 0.05$, so the result is significant."],
 ["Hva er en type I-feil?", ["Å forkaste $H_0$ når den er sann", "Å beholde $H_0$ når den er gal", "Å regne feil", "Å velge feil $\\alpha$"], "Sannsynligheten for type I-feil er signifikansnivået $\\alpha$.",
  "What is a type I error?", ["Rejecting $H_0$ when it is true", "Keeping $H_0$ when it is false", "Calculating wrongly", "Choosing the wrong $\\alpha$"], "The probability of a type I error is the significance level $\\alpha$."],
 ["60 kron på 100 kast. Hva er $Z$ under $H_0: p = 0{,}5$?", { n: 2, tol: 0.001, u: "" }, "$Z = \\dfrac{60 - 50}{\\sqrt{25}} = 2$.",
  "60 heads in 100 tosses. What is $Z$ under $H_0: p = 0.5$?", null, "$Z = \\dfrac{60 - 50}{\\sqrt{25}} = 2$."],
 ["Du vil teste om en ny metode gir **høyere** snitt. Hvilken $H_1$ bruker du?", ["$\\mu > \\mu_0$", "$\\mu \\ne \\mu_0$", "$\\mu < \\mu_0$", "$\\mu = \\mu_0$"], "Retningen er gitt, så testen er ensidig oppover.",
  "You want to test whether a new method gives a **higher** mean. Which $H_1$ do you use?", ["$\\mu > \\mu_0$", "$\\mu \\ne \\mu_0$", "$\\mu < \\mu_0$", "$\\mu = \\mu_0$"], "The direction is given, so the test is one-sided upwards."]
]);
GEN("VGS2", S2_HYP,
 () => { const n = R.p([50, 100, 200, 400]), p0 = R.p([0.5, 0.2, 0.1, 0.25]), sd = Math.sqrt(n * p0 * (1 - p0)), X = Math.round(n * p0 + R.p([0.8, 1.2, 1.5, 1.8, 2.2, 2.6]) * sd), z = (X - n * p0) / sd;
   return [T(`$H_0: p = ${mf(p0)}$. I ${n} forsøk fikk du ${X} suksesser. Regn ut testobservatoren $Z$.`, `$H_0: p = ${mf(p0)}$. In ${n} trials you got ${X} successes. Calculate the test statistic $Z$.`), { n: z, tol: 0.01, u: "" },
     T(`$Z = \\dfrac{${X} - ${mf(n * p0)}}{\\sqrt{${n} \\cdot ${mf(p0)} \\cdot ${mf(1 - p0)}}} = \\dfrac{${mf(X - n * p0)}}{${mf(sd, 3)}} = ${mf(z, 3)}$. ${z > 1.645 ? "Større enn 1,645: forkast $H_0$ ved ensidig test på 5 %-nivå." : "Mindre enn 1,645: ikke nok grunn til å forkaste $H_0$ (ensidig, 5 %)."}`,
       `$Z = \\dfrac{${X} - ${mf(n * p0)}}{\\sqrt{${n} \\cdot ${mf(p0)} \\cdot ${mf(1 - p0)}}} = \\dfrac{${mf(X - n * p0)}}{${mf(sd, 3)}} = ${mf(z, 3)}$. ${z > 1.645 ? "Greater than 1.645: reject $H_0$ in a one-sided test at the 5 % level." : "Less than 1.645: not enough reason to reject $H_0$ (one-sided, 5 %)."}`)]; },
 () => { const mu0 = R.p([50, 100, 250, 500]), s = R.p([4, 5, 10, 12, 20]), n = R.p([16, 25, 36, 64, 100]), z0 = R.p([0.9, 1.3, 1.7, 2.1, 2.5]), xb = Math.round((mu0 + z0 * s / Math.sqrt(n)) * 100) / 100, z = (xb - mu0) / (s / Math.sqrt(n)), p = 1 - Phi(z);
   return [T(`$H_0: \\mu = ${mu0}$, $H_1: \\mu > ${mu0}$, $\\sigma = ${s}$. Et utvalg på ${n} ga $\\bar x = ${mf(xb)}$. Hva er p-verdien?`, `$H_0: \\mu = ${mu0}$, $H_1: \\mu > ${mu0}$, $\\sigma = ${s}$. A sample of ${n} gave $\\bar x = ${mf(xb)}$. What is the p-value?`), { n: p, tol: 0.003, u: "" },
     T(`$Z = \\dfrac{${mf(xb)} - ${mu0}}{${s}/\\sqrt{${n}}} = ${mf(z, 3)}$. P-verdien er $1 - \\Phi(${mf(z, 3)}) = ${mf(p, 4)}$, ${p < 0.05 ? "under 0,05: forkast $H_0$." : "over 0,05: behold $H_0$."}`,
       `$Z = \\dfrac{${mf(xb)} - ${mu0}}{${s}/\\sqrt{${n}}} = ${mf(z, 3)}$. The p-value is $1 - \\Phi(${mf(z, 3)}) = ${mf(p, 4)}$, ${p < 0.05 ? "below 0.05: reject $H_0$." : "above 0.05: keep $H_0$."}`)]; },
 () => { const p = R.p([0.001, 0.01, 0.02, 0.04, 0.06, 0.08, 0.2, 0.35]), a = R.p([0.05, 0.01]), rej = p < a;
   return [T(`P-verdien er ${nf(p, 3)} og signifikansnivået er ${nf(a * 100)} %. Hva konkluderer du?`, `The p-value is ${nf(p, 3)} and the significance level is ${nf(a * 100)} %. What do you conclude?`),
     rej ? [T("Forkast $H_0$", "Reject $H_0$"), T("Ikke forkast $H_0$", "Do not reject $H_0$"), T("$H_0$ er bevist", "$H_0$ is proved"), T("Forkast $H_1$", "Reject $H_1$")]
         : [T("Ikke forkast $H_0$", "Do not reject $H_0$"), T("Forkast $H_0$", "Reject $H_0$"), T("$H_0$ er bevist", "$H_0$ is proved"), T("$H_1$ er bevist", "$H_1$ is proved")],
     rej ? T(`${nf(p, 3)} < ${nf(a, 2)}: resultatet er signifikant, så vi forkaster $H_0$.`, `${nf(p, 3)} < ${nf(a, 2)}: the result is significant, so we reject $H_0$.`)
         : T(`${nf(p, 3)} ≥ ${nf(a, 2)}: ikke nok grunn til å forkaste $H_0$. Det betyr ikke at $H_0$ er bevist.`, `${nf(p, 3)} ≥ ${nf(a, 2)}: not enough reason to reject $H_0$. That does not mean $H_0$ is proved.`)]; }
);

// Simuleringer i de nye enhetene
const U = (c, t) => COURSES.find(x => x.code === c).units.findIndex(u => u.title === t);
for(const [c, t, sim] of [["VG1T", "Ulikheter og fortegnslinjer", "quad"], ["VG1T", "Eksponentielle modeller", "expo"], ["VG1T", "Potenser, røtter og logaritmer", "expo"],
  ["VGR1", "Grenseverdier og kontinuitet", "tangent"], ["VGR1", "Derivasjonsregler i praksis", "tangent"], ["VGR1", "Optimering", "quad"], ["VGR1", "Parameterframstillinger", "projectile"],
  ["VGR2", "Areal og volum med integral", "riemann"], ["VGR2", "Integrasjonsmetoder", "riemann"], ["VGR2", "Linjer og plan i rommet", "vector"],
  ["VGS1", "Ulikheter og fortegnslinjer", "quad"], ["VGS1", "Eksponentielle modeller", "expo"], ["VGS1", "Kostnad, inntekt og overskudd", "quad"],
  ["VGS2", "Følger og rekker", "geoseries"], ["VGS2", "Sparing, lån og nåverdi", "npv"], ["VGS2", "Sparing, lån og nåverdi", "geoseries"], ["VGS2", "Sannsynlighetsfordelinger", "binom"],
  ["VGS2", "Sannsynlighetsfordelinger", "normal"], ["VGS2", "Hypotesetesting", "normal"], ["VGS2", "Derivasjonsregler i praksis", "tangent"]]){
  const u = U(c, t); if(u < 0) continue; (globalThis.SIM_EXTRA ||= []).push([c + ":" + u, sim]);
}
})();
