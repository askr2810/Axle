// ============================================================
//  add_vgs_m.js – Matematikk 1P (Vg1) og 2P (Vg2), praktisk matematikk etter LK20.
//  Figurene kobles til enhetene i figs_vgs.js.
// ============================================================
GROUP_NAMES["VGS: fellesfag"] = ["Fellesfag", "Common core subjects"];
NEWCOURSE({ code: "VG1P", study: "vgs", group: "VGS: matematikk", nb: "Matematikk 1P", en: "Mathematics 1P", s: ["1P", "1P"], eqText: VG_EQ("Vg1 praktisk matematikk (LK20)", "Year 11, practical maths (Norwegian curriculum)"), units: [] });
NEWCOURSE({ code: "VG2P", study: "vgs", group: "VGS: matematikk", nb: "Matematikk 2P", en: "Mathematics 2P", s: ["2P", "2P"], eqText: VG_EQ("Vg2 praktisk matematikk (LK20)", "Year 12, practical maths (Norwegian curriculum)"), units: [] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });

// ================= 1P =================
const P_PCT = ADDUNIT("VG1P", "Prosent og vekstfaktor", "Percentages and growth factors");
TH("VG1P", P_PCT, `## Hva handler det om?
Prosent betyr «per hundre». Salg, renter, lønnsøkning og prisstigning er prosentregning. Med **vekstfaktoren** regner du alt i ett steg.

## Begreper og formler
- $p\\,\\% = \\dfrac{p}{100}$. For eksempel er $25\\,\\% = 0{,}25$.
- **Prosentdel**: $\\text{del} = \\text{hele} \\cdot \\dfrac{p}{100}$.
- **Vekstfaktor** ved økning på $p\\,\\%$: $1 + \\dfrac{p}{100}$. Ved nedgang: $1 - \\dfrac{p}{100}$.
- **Ny verdi** = gammel verdi · vekstfaktor. **Gammel verdi** = ny verdi / vekstfaktor.
- Flere endringer etter hverandre: gang vekstfaktorene. $+10\\,\\%$ og så $-10\\,\\%$ gir $1{,}1 \\cdot 0{,}9 = 0{,}99$, altså $1\\,\\%$ lavere enn start.
- **Prosentpoeng** er forskjellen mellom to prosenter: fra 20 % til 25 % er 5 prosentpoeng, men 25 % økning.

### Eksempel
En jakke koster 800 kr og settes ned 30 %. Vekstfaktoren er 0,70, så ny pris er $800 \\cdot 0{,}70 = 560$ kr.

> Ny verdi = gammel verdi · vekstfaktor.`,
`## What is it about?
Percent means "per hundred". Sales, interest, pay rises and inflation are all percentage calculations. With the **growth factor** you do it all in one step.

## Concepts and formulas
- $p\\,\\% = \\dfrac{p}{100}$. For example $25\\,\\% = 0.25$.
- **Part**: $\\text{part} = \\text{whole} \\cdot \\dfrac{p}{100}$.
- **Growth factor** for an increase of $p\\,\\%$: $1 + \\dfrac{p}{100}$. For a decrease: $1 - \\dfrac{p}{100}$.
- **New value** = old value · growth factor. **Old value** = new value / growth factor.
- Several changes in a row: multiply the growth factors. $+10\\,\\%$ then $-10\\,\\%$ gives $1.1 \\cdot 0.9 = 0.99$, i.e. $1\\,\\%$ below the start.
- **Percentage points** are the difference between two percentages: from 20 % to 25 % is 5 percentage points, but a 25 % increase.

### Example
A jacket costs 800 NOK and is reduced by 30 %. The growth factor is 0.70, so the new price is $800 \\cdot 0.70 = 560$ NOK.

> New value = old value · growth factor.`);
BIQ("VG1P", P_PCT, [
 ["Hva er 15 % av 600?", { n: 90, tol: 0, u: "" }, "$600 \\cdot 0{,}15 = 90$.", "What is 15 % of 600?", null, "$600 \\cdot 0.15 = 90$."],
 ["Hva er vekstfaktoren når prisen øker med 8 %?", { n: 1.08, tol: 0.0001, u: "" }, "$1 + 0{,}08 = 1{,}08$.", "What is the growth factor when the price rises by 8 %?", null, "$1 + 0.08 = 1.08$."],
 ["Hva er vekstfaktoren ved 35 % rabatt?", { n: 0.65, tol: 0.0001, u: "" }, "$1 - 0{,}35 = 0{,}65$.", "What is the growth factor for a 35 % discount?", null, "$1 - 0.35 = 0.65$."],
 ["En vare koster 450 kr etter 10 % prisøkning. Hva kostet den før?", { n: 409.09, tol: 0.01, u: "kr" }, "$\\dfrac{450}{1{,}10} = 409{,}09$ kr.", "An item costs 450 NOK after a 10 % price rise. What did it cost before?", null, "$\\dfrac{450}{1.10} = 409.09$ NOK."],
 ["Renten går fra 4 % til 5 %. Hvor mange prosentpoeng har den økt?", { n: 1, tol: 0, u: "" }, "$5 - 4 = 1$ prosentpoeng (men 25 % økning).", "The interest rate goes from 4 % to 5 %. By how many percentage points has it risen?", null, "$5 - 4 = 1$ percentage point (but a 25 % increase)."],
 ["Prisen øker 20 % og settes så ned 20 %. Hva skjer?", ["Den ender 4 % lavere enn start", "Den er som før", "Den ender 4 % høyere", "Den ender 40 % lavere"], "$1{,}2 \\cdot 0{,}8 = 0{,}96$.", "The price rises 20 % and then falls 20 %. What happens?", ["It ends 4 % below the start", "It is back where it was", "It ends 4 % higher", "It ends 40 % lower"], "$1.2 \\cdot 0.8 = 0.96$."]
]);
GEN("VG1P", P_PCT,
 () => { const pris = R.p([200, 350, 480, 600, 900, 1200, 2500]), p = R.p([10, 15, 20, 25, 30, 40, 50]), ned = Math.random() < 0.6, f = ned ? 1 - p / 100 : 1 + p / 100, ny = pris * f;
   return [T(`En vare koster ${pris} kr. Prisen ${ned ? "settes ned" : "øker"} med ${p} %. Hva er ny pris?`, `An item costs ${pris} NOK. The price ${ned ? "is reduced" : "rises"} by ${p} %. What is the new price?`), { n: ny, tol: 0.01, u: "kr" },
     T(`Vekstfaktor $${mf(f, 2)}$, så $${pris} \\cdot ${mf(f, 2)} = ${mf(ny, 2)}$ kr.`, `Growth factor $${mf(f, 2)}$, so $${pris} \\cdot ${mf(f, 2)} = ${mf(ny, 2)}$ NOK.`)]; },
 () => { const a = R.p([40, 60, 80, 120, 150, 200, 250]), b = Math.round(a * R.p([1.1, 1.2, 1.25, 1.5, 0.8, 0.75, 0.9])), p = (b - a) / a * 100;
   return [T(`Et tall endres fra ${a} til ${b}. Hvor mange prosent er endringen?`, `A number changes from ${a} to ${b}. By what percentage does it change?`), { n: p, tol: 0.05, u: "%" },
     T(`$\\dfrac{${b} - ${a}}{${a}} \\cdot 100\\,\\% = ${mf(p, 1)}\\,\\%$${p < 0 ? " (nedgang)" : ""}.`, `$\\dfrac{${b} - ${a}}{${a}} \\cdot 100\\,\\% = ${mf(p, 1)}\\,\\%$${p < 0 ? " (a decrease)" : ""}.`)]; }
);

const P_OKO = ADDUNIT("VG1P", "Personlig økonomi", "Personal finance");
TH("VG1P", P_OKO, `## Hva handler det om?
Lønn, skatt, budsjett og lån er matte du bruker hele livet. Et budsjett gir oversikt, og renteregning viser hva et lån egentlig koster.

## Begreper og formler
- **Bruttolønn**: lønn før skatt. **Nettolønn**: det du får utbetalt etter skatt.
- **Skattetrekk** i prosent: $\\text{netto} = \\text{brutto} \\cdot (1 - \\text{skatteprosent})$ (forenklet).
- **Budsjett**: planlagte inntekter og utgifter. Overskudd = inntekter − utgifter.
- **Rente**: det du betaler for å låne (eller får for å spare). Etter $n$ år med fast rente: $K_n = K_0 \\cdot \\left(1 + \\dfrac{p}{100}\\right)^n$.
- **Effektiv rente** tar med gebyrer, og er den du bør sammenligne lån med.
- **Kredittkort og forbrukslån** har ofte svært høy rente.

### Eksempel
Du sparer 10 000 kr med 3 % rente. Etter 5 år: $10\\,000 \\cdot 1{,}03^5 = 11\\,592{,}74$ kr.

> Sammenlign lån med effektiv rente, ikke nominell.`,
`## What is it about?
Pay, tax, budgets and loans are maths you use your whole life. A budget gives you an overview, and interest calculations show what a loan really costs.

## Concepts and formulas
- **Gross pay**: pay before tax. **Net pay**: what you receive after tax.
- **Tax deduction** in percent: $\\text{net} = \\text{gross} \\cdot (1 - \\text{tax rate})$ (simplified).
- **Budget**: planned income and expenses. Surplus = income − expenses.
- **Interest**: what you pay to borrow (or earn to save). After $n$ years at a fixed rate: $K_n = K_0 \\cdot \\left(1 + \\dfrac{p}{100}\\right)^n$.
- **Effective interest rate** includes fees, and is the one to compare loans with.
- **Credit cards and consumer loans** often have very high interest.

### Example
You save 10,000 NOK at 3 % interest. After 5 years: $10\\,000 \\cdot 1.03^5 = 11\\,592.74$ NOK.

> Compare loans by effective rate, not nominal rate.`);
BIQ("VG1P", P_OKO, [
 ["Bruttolønnen er 30 000 kr og skattetrekket 30 %. Hva er nettolønnen?", { n: 21000, tol: 0, u: "kr" }, "$30\\,000 \\cdot 0{,}70 = 21\\,000$ kr.", "Gross pay is 30,000 NOK and the tax deduction 30 %. What is the net pay?", null, "$30\\,000 \\cdot 0.70 = 21\\,000$ NOK."],
 ["Hva er forskjellen på brutto- og nettolønn?", ["Brutto er før skatt, netto er etter skatt", "Brutto er etter skatt", "Det er det samme", "Netto er med feriepenger"], "Netto er det som kommer inn på kontoen.", "What is the difference between gross and net pay?", ["Gross is before tax, net is after tax", "Gross is after tax", "They are the same", "Net includes holiday pay"], "Net is what reaches your account."],
 ["Hvilken rente bør du bruke for å sammenligne lån?", ["Effektiv rente", "Nominell rente", "Styringsrenten", "Den laveste som står i reklamen"], "Effektiv rente tar med gebyrer.", "Which rate should you use to compare loans?", ["The effective rate", "The nominal rate", "The policy rate", "The lowest one in the advert"], "The effective rate includes fees."],
 ["Inntekter 18 000 kr, utgifter 16 500 kr per måned. Hva er overskuddet?", { n: 1500, tol: 0, u: "kr" }, "$18\\,000 - 16\\,500 = 1500$ kr.", "Income 18,000 NOK, expenses 16,500 NOK per month. What is the surplus?", null, "$18\\,000 - 16\\,500 = 1500$ NOK."],
 ["Du setter inn 5000 kr med 2 % rente. Hvor mye har du etter 3 år?", { n: 5306.04, tol: 0.01, u: "kr" }, "$5000 \\cdot 1{,}02^3 = 5306{,}04$ kr.", "You deposit 5000 NOK at 2 % interest. How much do you have after 3 years?", null, "$5000 \\cdot 1.02^3 = 5306.04$ NOK."]
]);
GEN("VG1P", P_OKO,
 () => { const k = R.p([2000, 5000, 10000, 20000, 50000]), p = R.p([1.5, 2, 3, 4, 5]), n = R.i(2, 10), v = k * (1 + p / 100) ** n;
   return [T(`Du sparer ${nf(k, 0)} kr med ${nf(p)} % årlig rente. Hvor mye står på kontoen etter ${n} år?`, `You save ${nf(k, 0)} NOK at ${nf(p)} % annual interest. How much is in the account after ${n} years?`), { n: v, tol: 0.5, u: "kr" },
     T(`$${k} \\cdot ${mf(1 + p / 100, 3)}^{${n}} = ${mf(v, 2)}$ kr.`, `$${k} \\cdot ${mf(1 + p / 100, 3)}^{${n}} = ${mf(v, 2)}$ NOK.`)]; },
 () => { const b = R.p([25000, 32000, 38000, 45000]), s = R.p([25, 28, 30, 33, 35]), n = b * (1 - s / 100);
   return [T(`Bruttolønnen er ${nf(b, 0)} kr i måneden, og skattetrekket er ${s} %. Hva blir nettolønnen?`, `Gross pay is ${nf(b, 0)} NOK a month, and the tax deduction is ${s} %. What is the net pay?`), { n, tol: 0.5, u: "kr" },
     T(`$${b} \\cdot ${mf(1 - s / 100, 2)} = ${mf(n, 0)}$ kr.`, `$${b} \\cdot ${mf(1 - s / 100, 2)} = ${mf(n, 0)}$ NOK.`)]; }
);

const P_GEO = ADDUNIT("VG1P", "Geometri og målestokk", "Geometry and scale");
TH("VG1P", P_GEO, `## Hva handler det om?
Areal av en leilighet, maling til en vegg, volum av en tank eller avstander på et kart: geometri og målestokk brukes overalt.

## Begreper og formler
- **Rektangel**: $A = l \\cdot b$. **Trekant**: $A = \\dfrac{g \\cdot h}{2}$. **Sirkel**: $A = \\pi r^2$, omkrets $O = 2\\pi r$.
- **Prisme og sylinder**: $V = G \\cdot h$ (grunnflate ganger høyde). Sylinder: $V = \\pi r^2 h$.
- **Pytagoras**: i en rettvinklet trekant er $a^2 + b^2 = c^2$.
- **Målestokk** 1 : 50 000 betyr at 1 cm på kartet er 50 000 cm = 500 m i virkeligheten.
- **Enheter**: 1 m² = 10 000 cm². 1 m³ = 1000 liter. 1 dm³ = 1 liter.

### Eksempel
To byer er 7 cm fra hverandre på et kart i målestokk 1 : 200 000. I virkeligheten er avstanden $7 \\cdot 200\\,000 = 1\\,400\\,000$ cm = 14 km.

> Gjør om til samme enhet før du regner.`,
`## What is it about?
The floor area of a flat, paint for a wall, the volume of a tank or distances on a map: geometry and scale are everywhere.

## Concepts and formulas
- **Rectangle**: $A = l \\cdot w$. **Triangle**: $A = \\dfrac{b \\cdot h}{2}$. **Circle**: $A = \\pi r^2$, circumference $C = 2\\pi r$.
- **Prism and cylinder**: $V = B \\cdot h$ (base times height). Cylinder: $V = \\pi r^2 h$.
- **Pythagoras**: in a right triangle $a^2 + b^2 = c^2$.
- **Scale** 1 : 50,000 means 1 cm on the map is 50,000 cm = 500 m in reality.
- **Units**: 1 m² = 10,000 cm². 1 m³ = 1000 litres. 1 dm³ = 1 litre.

### Example
Two towns are 7 cm apart on a map at scale 1 : 200,000. In reality the distance is $7 \\cdot 200\\,000 = 1\\,400\\,000$ cm = 14 km.

> Convert to the same unit before calculating.`);
BIQ("VG1P", P_GEO, [
 ["Et rom er 4 m langt og 3,5 m bredt. Hva er arealet?", { n: 14, tol: 0, u: "m²" }, "$4 \\cdot 3{,}5 = 14$ m².", "A room is 4 m long and 3.5 m wide. What is the area?", null, "$4 \\cdot 3.5 = 14$ m²."],
 ["En rettvinklet trekant har kateter 6 og 8. Hvor lang er hypotenusen?", { n: 10, tol: 0, u: "" }, "$\\sqrt{36 + 64} = 10$.", "A right triangle has legs 6 and 8. How long is the hypotenuse?", null, "$\\sqrt{36 + 64} = 10$."],
 ["Hvor mange liter er 1 m³?", { n: 1000, tol: 0, u: "L" }, "1 m³ = 1000 dm³ = 1000 liter.", "How many litres is 1 m³?", null, "1 m³ = 1000 dm³ = 1000 litres."],
 ["Målestokk 1 : 50 000. Hvor langt er 4 cm på kartet i virkeligheten?", { n: 2, tol: 0, u: "km" }, "$4 \\cdot 50\\,000 = 200\\,000$ cm = 2 km.", "Scale 1 : 50,000. How far is 4 cm on the map in reality?", null, "$4 \\cdot 50\\,000 = 200\\,000$ cm = 2 km."],
 ["En sylinder har radius 1 m og høyde 2 m. Omtrent hvor mange liter rommer den?", { n: 6283, tol: 5, u: "L" }, "$\\pi \\cdot 1^2 \\cdot 2 = 6{,}283$ m³ = 6283 liter.", "A cylinder has radius 1 m and height 2 m. Roughly how many litres does it hold?", null, "$\\pi \\cdot 1^2 \\cdot 2 = 6.283$ m³ = 6283 litres."]
]);
GEN("VG1P", P_GEO,
 () => { const m = R.p([10000, 25000, 50000, 100000, 250000]), cm = R.p([2, 3, 4, 5, 6, 8, 12]), km = cm * m / 100000;
   return [T(`Kartet har målestokk 1 : ${nf(m, 0)}. Hvor mange km er ${cm} cm på kartet?`, `The map has scale 1 : ${nf(m, 0)}. How many km is ${cm} cm on the map?`), { n: km, tol: 0.001, u: "km" },
     T(`$${cm} \\cdot ${m} = ${cm * m}$ cm $= ${mf(km, 3)}$ km.`, `$${cm} \\cdot ${m} = ${cm * m}$ cm $= ${mf(km, 3)}$ km.`)]; },
 () => { const [a, b] = R.p([[3, 4], [5, 12], [6, 8], [8, 15], [9, 12], [7, 24], [2, 3], [4, 7]]), c = Math.sqrt(a * a + b * b);
   return [T(`En stige står mot en vegg. Foten er ${a} m fra veggen, og stigen når ${b} m opp. Hvor lang er stigen?`, `A ladder leans against a wall. The foot is ${a} m from the wall and it reaches ${b} m up. How long is the ladder?`), { n: c, tol: 0.01, u: "m" },
     T(`Pytagoras: $\\sqrt{${a}^2 + ${b}^2} = ${mf(c, 2)}$ m.`, `Pythagoras: $\\sqrt{${a}^2 + ${b}^2} = ${mf(c, 2)}$ m.`)]; }
);

const P_FUN = ADDUNIT("VG1P", "Lineære modeller og grafer", "Linear models and graphs");
TH("VG1P", P_FUN, `## Hva handler det om?
Mange ting i hverdagen øker like mye hele tiden: taxipris per km, strømpris per kWh, lønn per time. Da passer en **lineær modell** $y = ax + b$.

## Begreper og formler
- $b$ er **startverdien** (der grafen skjærer $y$-aksen). $a$ er **stigningstallet**: hvor mye $y$ endres når $x$ øker med 1.
- Stigningstall mellom to punkter: $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$.
- **Proporsjonale** størrelser: $y = kx$ (ingen startverdi). Dobbelt så mye $x$ gir dobbelt så mye $y$.
- **Omvendt proporsjonale**: $x \\cdot y = k$. Dobbelt så mange arbeidere bruker halve tiden.
- Skjæringspunktet mellom to linjer: der de to modellene gir samme verdi.

### Eksempel
Et strømabonnement koster 49 kr i måneden pluss 1,20 kr per kWh: $K(x) = 1{,}2x + 49$. Bruker du 500 kWh, blir det $1{,}2 \\cdot 500 + 49 = 649$ kr.

> Stigningstallet er endringen per enhet.`,
`## What is it about?
Many everyday things increase by the same amount all the time: taxi price per km, electricity per kWh, pay per hour. Then a **linear model** $y = ax + b$ fits.

## Concepts and formulas
- $b$ is the **starting value** (where the graph crosses the $y$-axis). $a$ is the **slope**: how much $y$ changes when $x$ increases by 1.
- Slope between two points: $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$.
- **Proportional** quantities: $y = kx$ (no starting value). Twice the $x$ gives twice the $y$.
- **Inversely proportional**: $x \\cdot y = k$. Twice as many workers take half the time.
- The intersection of two lines: where the two models give the same value.

### Example
An electricity plan costs 49 NOK a month plus 1.20 NOK per kWh: $C(x) = 1.2x + 49$. Using 500 kWh costs $1.2 \\cdot 500 + 49 = 649$ NOK.

> The slope is the change per unit.`);
BIQ("VG1P", P_FUN, [
 ["$y = 3x + 5$. Hva er startverdien?", { n: 5, tol: 0, u: "" }, "Konstantleddet $b = 5$.", "$y = 3x + 5$. What is the starting value?", null, "The constant term $b = 5$."],
 ["4 arbeidere bruker 6 dager. Hvor mange dager bruker 8 arbeidere (omvendt proporsjonalt)?", { n: 3, tol: 0, u: "" }, "$4 \\cdot 6 = 24$ dagsverk, $24/8 = 3$ dager.", "4 workers need 6 days. How many days do 8 workers need (inversely proportional)?", null, "$4 \\cdot 6 = 24$ worker-days, $24/8 = 3$ days."],
 ["Hvilken er proporsjonal?", ["$y = 2{,}5x$", "$y = 2x + 1$", "$y = \\dfrac{10}{x}$", "$y = x^2$"], "Proporsjonal: $y = kx$ uten startverdi.", "Which is proportional?", ["$y = 2.5x$", "$y = 2x + 1$", "$y = \\dfrac{10}{x}$", "$y = x^2$"], "Proportional: $y = kx$ with no starting value."],
 ["Taxi: 80 kr i start og 15 kr per km. Hva koster 10 km?", { n: 230, tol: 0, u: "kr" }, "$80 + 15 \\cdot 10 = 230$ kr.", "Taxi: 80 NOK to start and 15 NOK per km. What do 10 km cost?", null, "$80 + 15 \\cdot 10 = 230$ NOK."],
 ["Tilbud A: $100 + 5x$. Tilbud B: $40 + 8x$. For hvilken $x$ koster de like mye?", { n: 20, tol: 0, u: "" }, "$100 + 5x = 40 + 8x$ gir $3x = 60$, $x = 20$.", "Offer A: $100 + 5x$. Offer B: $40 + 8x$. For which $x$ do they cost the same?", null, "$100 + 5x = 40 + 8x$ gives $3x = 60$, $x = 20$."]
]);
GEN("VG1P", P_FUN,
 () => { const a1 = R.p([3, 4, 5, 6]), b1 = R.p([100, 150, 200]), a2 = a1 + R.p([2, 3, 4, 5]), x = R.p([10, 15, 20, 25, 30, 40]), b2 = b1 - (a2 - a1) * x;
   if(b2 < 0) return [T(`Tilbud A koster $${b1} + ${a1}x$ kr. Hva koster tilbud A for $x = ${x}$?`, `Offer A costs $${b1} + ${a1}x$ NOK. What does offer A cost for $x = ${x}$?`), { n: b1 + a1 * x, tol: 0, u: "kr" }, T(`$${b1} + ${a1} \\cdot ${x} = ${b1 + a1 * x}$ kr.`, `$${b1} + ${a1} \\cdot ${x} = ${b1 + a1 * x}$ NOK.`)];
   return [T(`Tilbud A koster $${b1} + ${a1}x$ kr og tilbud B $${b2} + ${a2}x$ kr. For hvilken $x$ koster de like mye?`, `Offer A costs $${b1} + ${a1}x$ NOK and offer B $${b2} + ${a2}x$ NOK. For which $x$ do they cost the same?`), { n: x, tol: 0, u: "" },
     T(`$${b1} + ${a1}x = ${b2} + ${a2}x$ gir $${a2 - a1}x = ${b1 - b2}$, altså $x = ${x}$.`, `$${b1} + ${a1}x = ${b2} + ${a2}x$ gives $${a2 - a1}x = ${b1 - b2}$, so $x = ${x}$.`)]; }
);

const P_SAN = ADDUNIT("VG1P", "Sannsynlighet", "Probability");
TH("VG1P", P_SAN, `## Hva handler det om?
Hvor stor er sjansen for å vinne i Lotto, få en sekser eller at det regner i morgen? Sannsynlighet er et tall mellom 0 (umulig) og 1 (sikkert).

## Begreper og formler
- **Uniform modell** (alle utfall like sannsynlige): $P(A) = \\dfrac{\\text{gunstige utfall}}{\\text{mulige utfall}}$.
- **Komplementsetningen**: $P(\\text{ikke } A) = 1 - P(A)$.
- **Uavhengige hendelser**: $P(A \\text{ og } B) = P(A) \\cdot P(B)$.
- **Relativ frekvens**: hvor ofte noe skjer i et forsøk. Med mange forsøk nærmer den seg sannsynligheten.
- Tabeller og **valgtre** gir oversikt når det er flere trinn.

### Eksempel
Sannsynligheten for minst én sekser på to terningkast er $1 - \\left(\\dfrac{5}{6}\\right)^2 = \\dfrac{11}{36} \\approx 0{,}31$.

> «Minst én» regner du enklest med komplementet.`,
`## What is it about?
What is the chance of winning the lottery, rolling a six or rain tomorrow? A probability is a number between 0 (impossible) and 1 (certain).

## Concepts and formulas
- **Uniform model** (all outcomes equally likely): $P(A) = \\dfrac{\\text{favourable outcomes}}{\\text{possible outcomes}}$.
- **Complement rule**: $P(\\text{not } A) = 1 - P(A)$.
- **Independent events**: $P(A \\text{ and } B) = P(A) \\cdot P(B)$.
- **Relative frequency**: how often something happens in an experiment. With many trials it approaches the probability.
- Tables and **tree diagrams** give an overview when there are several stages.

### Example
The probability of at least one six in two dice rolls is $1 - \\left(\\dfrac{5}{6}\\right)^2 = \\dfrac{11}{36} \\approx 0.31$.

> "At least one" is easiest with the complement.`);
BIQ("VG1P", P_SAN, [
 ["Hva er sannsynligheten for å få en sekser på ett terningkast?", ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{6}{6}$", "$\\dfrac{1}{3}$"], "Ett gunstig av seks mulige utfall.", "What is the probability of a six on one dice roll?", ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{6}{6}$", "$\\dfrac{1}{3}$"], "One favourable out of six possible outcomes."],
 ["Sannsynligheten for regn er 0,3. Hva er sannsynligheten for oppholdsvær?", { n: 0.7, tol: 0.001, u: "" }, "$1 - 0{,}3 = 0{,}7$.", "The probability of rain is 0.3. What is the probability of no rain?", null, "$1 - 0.3 = 0.7$."],
 ["Du kaster en mynt to ganger. Hva er sannsynligheten for to kron?", { n: 0.25, tol: 0.001, u: "" }, "$0{,}5 \\cdot 0{,}5 = 0{,}25$.", "You toss a coin twice. What is the probability of two heads?", null, "$0.5 \\cdot 0.5 = 0.25$."],
 ["I en klasse på 30 har 12 briller. Hva er sannsynligheten for at en tilfeldig elev har briller?", { n: 0.4, tol: 0.001, u: "" }, "$\\dfrac{12}{30} = 0{,}4$.", "In a class of 30, 12 wear glasses. What is the probability that a random student wears glasses?", null, "$\\dfrac{12}{30} = 0.4$."],
 ["Hva skjer med relativ frekvens når antall forsøk øker?", ["Den nærmer seg sannsynligheten", "Den blir alltid 0,5", "Den blir større og større", "Den blir null"], "Store talls lov.", "What happens to the relative frequency as the number of trials grows?", ["It approaches the probability", "It always becomes 0.5", "It keeps growing", "It becomes zero"], "The law of large numbers."]
]);
GEN("VG1P", P_SAN,
 () => { const n = R.p([2, 3, 4]), p = 1 - (5 / 6) ** n;
   return [T(`Du kaster ${n} terninger. Hva er sannsynligheten for minst én sekser?`, `You roll ${n} dice. What is the probability of at least one six?`), { n: p, tol: 0.002, u: "" },
     T(`$1 - \\left(\\dfrac{5}{6}\\right)^{${n}} = ${mf(p, 3)}$.`, `$1 - \\left(\\dfrac{5}{6}\\right)^{${n}} = ${mf(p, 3)}$.`)]; }
);

// ================= 2P =================
const Q_STAT = ADDUNIT("VG2P", "Statistikk", "Statistics");
TH("VG2P", Q_STAT, `## Hva handler det om?
Statistikk er å samle, ordne og tolke tall: karakterer, lønn, temperaturer. Sentralmål forteller hva som er «typisk», spredningsmål hvor mye tallene varierer.

## Begreper og formler
- **Gjennomsnitt**: summen delt på antall. Påvirkes mye av ekstreme verdier.
- **Median**: den midterste verdien når tallene er sortert (snittet av de to midterste ved partall).
- **Typetall**: den verdien som forekommer oftest.
- **Variasjonsbredde**: største minus minste verdi.
- **Standardavvik** $\\sigma$: gjennomsnittlig avstand fra gjennomsnittet. Stort standardavvik = stor spredning.
- **Kvartiler**: $Q_1$ og $Q_3$ deler de sorterte dataene i fire. **Kvartilbredde** = $Q_3 - Q_1$.
- **Grupperte data**: bruk klassemidtpunkt når du regner gjennomsnitt.

### Eksempel
Lønningene 25, 27, 28, 30 og 90 (tusen kr): gjennomsnittet er 40, men medianen 28. Medianen beskriver det typiske bedre fordi 90 trekker opp.

> Median er robust mot ekstreme verdier. Gjennomsnitt er det ikke.`,
`## What is it about?
Statistics is collecting, ordering and interpreting numbers: grades, pay, temperatures. Measures of centre say what is "typical", measures of spread how much the numbers vary.

## Concepts and formulas
- **Mean**: the sum divided by the count. Strongly affected by extreme values.
- **Median**: the middle value once the numbers are sorted (the average of the two middle ones for an even count).
- **Mode**: the most frequent value.
- **Range**: largest minus smallest value.
- **Standard deviation** $\\sigma$: the typical distance from the mean. A large standard deviation = large spread.
- **Quartiles**: $Q_1$ and $Q_3$ split the sorted data into four. **Interquartile range** = $Q_3 - Q_1$.
- **Grouped data**: use class midpoints when calculating the mean.

### Example
Salaries 25, 27, 28, 30 and 90 (thousand NOK): the mean is 40, but the median 28. The median describes the typical case better because 90 pulls the mean up.

> The median is robust to extreme values. The mean is not.`);
BIQ("VG2P", Q_STAT, [
 ["Finn medianen til 3, 8, 5, 10, 7.", { n: 7, tol: 0, u: "" }, "Sortert: 3, 5, 7, 8, 10. Den midterste er 7.", "Find the median of 3, 8, 5, 10, 7.", null, "Sorted: 3, 5, 7, 8, 10. The middle one is 7."],
 ["Finn gjennomsnittet til 4, 6, 8, 10.", { n: 7, tol: 0, u: "" }, "$\\dfrac{28}{4} = 7$.", "Find the mean of 4, 6, 8, 10.", null, "$\\dfrac{28}{4} = 7$."],
 ["Finn typetallet til 2, 3, 3, 5, 3, 7, 2.", { n: 3, tol: 0, u: "" }, "3 forekommer tre ganger.", "Find the mode of 2, 3, 3, 5, 3, 7, 2.", null, "3 occurs three times."],
 ["Hvilket sentralmål påvirkes mest av én ekstremt høy verdi?", ["Gjennomsnittet", "Medianen", "Typetallet", "Ingen av dem"], "Den høye verdien drar summen opp.", "Which measure of centre is most affected by one extremely high value?", ["The mean", "The median", "The mode", "None of them"], "The high value pulls the sum up."],
 ["Hva måler standardavviket?", ["Spredningen rundt gjennomsnittet", "Den største verdien", "Antall observasjoner", "Den midterste verdien"], "Stort standardavvik betyr stor variasjon.", "What does the standard deviation measure?", ["The spread around the mean", "The largest value", "The number of observations", "The middle value"], "A large standard deviation means large variation."],
 ["Finn variasjonsbredden til 12, 4, 19, 7.", { n: 15, tol: 0, u: "" }, "$19 - 4 = 15$.", "Find the range of 12, 4, 19, 7.", null, "$19 - 4 = 15$."]
]);
GEN("VG2P", Q_STAT,
 () => { const n = R.p([5, 6, 7]), xs = Array.from({ length: n }, () => R.i(1, 20)), s = [...xs].sort((a, b) => a - b), med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
   return [T(`Finn medianen til ${xs.join(", ")}.`, `Find the median of ${xs.join(", ")}.`), { n: med, tol: 0, u: "" },
     T(`Sortert: ${s.join(", ")}. Medianen er ${nf(med, 1)}.`, `Sorted: ${s.join(", ")}. The median is ${nf(med, 1)}.`)]; },
 () => { const n = R.p([4, 5, 6]), xs = Array.from({ length: n }, () => R.i(2, 30)), m = xs.reduce((a, b) => a + b, 0) / n;
   return [T(`Finn gjennomsnittet til ${xs.join(", ")}.`, `Find the mean of ${xs.join(", ")}.`), { n: m, tol: 0.01, u: "" },
     T(`Summen er ${xs.reduce((a, b) => a + b, 0)}, og $\\dfrac{${xs.reduce((a, b) => a + b, 0)}}{${n}} = ${mf(m, 2)}$.`, `The sum is ${xs.reduce((a, b) => a + b, 0)}, and $\\dfrac{${xs.reduce((a, b) => a + b, 0)}}{${n}} = ${mf(m, 2)}$.`)]; }
);

const Q_EXP = ADDUNIT("VG2P", "Eksponentiell vekst", "Exponential growth");
TH("VG2P", Q_EXP, `## Hva handler det om?
Når noe øker med samme **prosent** hver periode, vokser det raskere og raskere: sparepenger, befolkning, bakterier. Når det minker med fast prosent, som verdien på en bil, får vi eksponentiell nedgang.

## Begreper og formler
- **Eksponentiell modell**: $f(x) = a \\cdot b^x$. $a$ er startverdien, $b$ vekstfaktoren.
- $b > 1$ gir vekst, $0 < b < 1$ gir nedgang.
- **Doblingstid**: tiden det tar før mengden er doblet. Tommelfingerregel: $\\approx \\dfrac{70}{p}$ perioder ved $p\\,\\%$ vekst.
- **Halveringstid**: tiden det tar før mengden er halvert.
- **Lineær** vekst: fast tall per periode. **Eksponentiell** vekst: fast prosent per periode.

### Eksempel
En by har 20 000 innbyggere og vokser 2 % i året. Etter 10 år: $20\\,000 \\cdot 1{,}02^{10} \\approx 24\\,380$.

> Fast prosent gir eksponentiell modell, fast tall gir lineær.`,
`## What is it about?
When something grows by the same **percentage** each period, it grows faster and faster: savings, population, bacteria. When it shrinks by a fixed percentage, like the value of a car, we get exponential decay.

## Concepts and formulas
- **Exponential model**: $f(x) = a \\cdot b^x$. $a$ is the starting value, $b$ the growth factor.
- $b > 1$ gives growth, $0 < b < 1$ gives decay.
- **Doubling time**: the time it takes for the amount to double. Rule of thumb: $\\approx \\dfrac{70}{p}$ periods at $p\\,\\%$ growth.
- **Half-life**: the time it takes for the amount to halve.
- **Linear** growth: a fixed amount per period. **Exponential** growth: a fixed percentage per period.

### Example
A town has 20,000 inhabitants and grows by 2 % a year. After 10 years: $20\\,000 \\cdot 1.02^{10} \\approx 24\\,380$.

> A fixed percentage gives an exponential model, a fixed amount a linear one.`);
BIQ("VG2P", Q_EXP, [
 ["$f(x) = 500 \\cdot 1{,}04^x$. Hva er startverdien?", { n: 500, tol: 0, u: "" }, "$a = 500$.", "$f(x) = 500 \\cdot 1.04^x$. What is the starting value?", null, "$a = 500$."],
 ["$f(x) = 500 \\cdot 1{,}04^x$. Hvor mange prosent vokser $f$ per periode?", { n: 4, tol: 0, u: "%" }, "$b = 1{,}04$ betyr 4 % vekst.", "$f(x) = 500 \\cdot 1.04^x$. By what percentage does $f$ grow per period?", null, "$b = 1.04$ means 4 % growth."],
 ["Omtrent hvor mange år tar det å doble et beløp med 7 % rente?", { n: 10, tol: 0.5, u: "år" }, "$\\dfrac{70}{7} = 10$ år (70-regelen).", "Roughly how many years does it take to double an amount at 7 % interest?", null, "$\\dfrac{70}{7} = 10$ years (the rule of 70)."],
 ["Hvilken modell beskriver en bil som taper 15 % av verdien hvert år?", ["$V = V_0 \\cdot 0{,}85^x$", "$V = V_0 - 15x$", "$V = V_0 \\cdot 1{,}15^x$", "$V = 0{,}15x$"], "Fast prosent nedgang: vekstfaktor 0,85.", "Which model describes a car losing 15 % of its value each year?", ["$V = V_0 \\cdot 0.85^x$", "$V = V_0 - 15x$", "$V = V_0 \\cdot 1.15^x$", "$V = 0.15x$"], "A fixed percentage decrease: growth factor 0.85."],
 ["Et stoff har halveringstid 5 år. Hvor mye er igjen av 80 g etter 15 år?", { n: 10, tol: 0, u: "g" }, "Tre halveringer: $80 \\to 40 \\to 20 \\to 10$ g.", "A substance has a half-life of 5 years. How much of 80 g remains after 15 years?", null, "Three halvings: $80 \\to 40 \\to 20 \\to 10$ g."]
]);
GEN("VG2P", Q_EXP,
 () => { const a = R.p([1000, 5000, 20000, 50000]), p = R.p([2, 3, 5, 8, 10]), n = R.i(3, 15), v = a * (1 + p / 100) ** n;
   return [T(`En størrelse er ${nf(a, 0)} og vokser ${p} % i året. Hva er den etter ${n} år?`, `A quantity is ${nf(a, 0)} and grows by ${p} % a year. What is it after ${n} years?`), { n: v, tol: Math.max(0.5, v * 0.001), u: "" },
     T(`$${a} \\cdot ${mf(1 + p / 100, 2)}^{${n}} = ${mf(v, 1)}$.`, `$${a} \\cdot ${mf(1 + p / 100, 2)}^{${n}} = ${mf(v, 1)}$.`)]; }
);

const Q_POT = ADDUNIT("VG2P", "Potenser og standardform", "Powers and standard form");
TH("VG2P", Q_POT, `## Hva handler det om?
Veldig store og veldig små tall, som avstanden til sola eller størrelsen på et virus, skrives enklest på **standardform**.

## Begreper og formler
- $a^n$ betyr $a$ ganget med seg selv $n$ ganger. $a^0 = 1$ og $a^{-n} = \\dfrac{1}{a^n}$.
- **Regneregler**: $a^m \\cdot a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.
- **Standardform**: $k \\cdot 10^n$ der $1 \\le k < 10$. For eksempel $150\\,000\\,000 = 1{,}5 \\cdot 10^8$.
- Små tall: $0{,}000\\,03 = 3 \\cdot 10^{-5}$.
- **Prefikser**: kilo $= 10^3$, mega $= 10^6$, giga $= 10^9$, milli $= 10^{-3}$, mikro $= 10^{-6}$.

### Eksempel
Avstanden til sola er om lag $1{,}5 \\cdot 10^{8}$ km. Lyset går $3 \\cdot 10^{5}$ km/s, så det bruker $\\dfrac{1{,}5 \\cdot 10^8}{3 \\cdot 10^5} = 500$ sekunder, drøyt 8 minutter.

> Standardform: ett siffer foran komma, så en tierpotens.`,
`## What is it about?
Very large and very small numbers, like the distance to the Sun or the size of a virus, are easiest to write in **standard form**.

## Concepts and formulas
- $a^n$ means $a$ multiplied by itself $n$ times. $a^0 = 1$ and $a^{-n} = \\dfrac{1}{a^n}$.
- **Rules**: $a^m \\cdot a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.
- **Standard form**: $k \\cdot 10^n$ with $1 \\le k < 10$. For example $150\\,000\\,000 = 1.5 \\cdot 10^8$.
- Small numbers: $0.000\\,03 = 3 \\cdot 10^{-5}$.
- **Prefixes**: kilo $= 10^3$, mega $= 10^6$, giga $= 10^9$, milli $= 10^{-3}$, micro $= 10^{-6}$.

### Example
The distance to the Sun is about $1.5 \\cdot 10^{8}$ km. Light travels $3 \\cdot 10^{5}$ km/s, so it takes $\\dfrac{1.5 \\cdot 10^8}{3 \\cdot 10^5} = 500$ seconds, just over 8 minutes.

> Standard form: one digit before the decimal point, then a power of ten.`);
BIQ("VG2P", Q_POT, [
 ["Skriv 45 000 på standardform.", ["$4{,}5 \\cdot 10^4$", "$45 \\cdot 10^3$", "$4{,}5 \\cdot 10^3$", "$0{,}45 \\cdot 10^5$"], "Ett siffer foran komma: 4,5, og kommaet flyttes 4 plasser.", "Write 45,000 in standard form.", ["$4.5 \\cdot 10^4$", "$45 \\cdot 10^3$", "$4.5 \\cdot 10^3$", "$0.45 \\cdot 10^5$"], "One digit before the point: 4.5, and the point moves 4 places."],
 ["Hva er $2^3 \\cdot 2^4$?", { n: 128, tol: 0, u: "" }, "$2^{3+4} = 2^7 = 128$.", "What is $2^3 \\cdot 2^4$?", null, "$2^{3+4} = 2^7 = 128$."],
 ["Hva er $10^{-2}$?", { n: 0.01, tol: 0, u: "" }, "$\\dfrac{1}{100} = 0{,}01$.", "What is $10^{-2}$?", null, "$\\dfrac{1}{100} = 0.01$."],
 ["Hvor mange meter er 3 km?", { n: 3000, tol: 0, u: "m" }, "Kilo = $10^3$: $3 \\cdot 1000 = 3000$ m.", "How many metres are 3 km?", null, "Kilo = $10^3$: $3 \\cdot 1000 = 3000$ m."],
 ["Hva er $(3 \\cdot 10^4) \\cdot (2 \\cdot 10^3)$?", ["$6 \\cdot 10^7$", "$6 \\cdot 10^{12}$", "$5 \\cdot 10^7$", "$6 \\cdot 10^1$"], "Gang tallene og legg sammen eksponentene.", "What is $(3 \\cdot 10^4) \\cdot (2 \\cdot 10^3)$?", ["$6 \\cdot 10^7$", "$6 \\cdot 10^{12}$", "$5 \\cdot 10^7$", "$6 \\cdot 10^1$"], "Multiply the numbers and add the exponents."]
]);
GEN("VG2P", Q_POT,
 () => { const k = R.p([1.2, 2.5, 3.4, 4.8, 6, 7.5, 9.1]), n = R.i(3, 9), v = k * 10 ** n;
   return [T(`Hvilken eksponent $n$ gir $${mf(k, 1)} \\cdot 10^{n} = ${Math.round(v)}$?`, `Which exponent $n$ gives $${mf(k, 1)} \\cdot 10^{n} = ${Math.round(v)}$?`), { n, tol: 0, u: "" },
     T(`Kommaet flyttes ${n} plasser, så $n = ${n}$.`, `The decimal point moves ${n} places, so $n = ${n}$.`)]; }
);
})();
