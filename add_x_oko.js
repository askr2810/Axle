// ============================================================
//  add_x_oko.js – studiet ØKONOMI OG ADMINISTRASJON (første år på en bachelor, f.eks. BI/NHH/høgskolene)
//  Fem fag: bedriftsøkonomi, regnskap, matematikk for økonomer, statistikk og samfunnsøkonomi.
//  Enheter som allerede finnes (OKON, S1, S2, R1) deles med SHAREUNIT. Filnavnet starter med x så den lastes etter add_vgs_*.
// ============================================================
GROUP_NAMES["Økonomi"] = ["Økonomi og administrasjon", "Business and administration"];
const OKO_EQ = { nb: "Bachelor i økonomi og administrasjon, 1. år", en: "Bachelor in business administration, year 1" };
NEWCOURSE({ code: "OBED", study: "oko", group: "Økonomi", nb: "Bedriftsøkonomi", en: "Business Economics", s: ["BØ", "BE"], eqText: OKO_EQ, units: [] });
NEWCOURSE({ code: "OREG", study: "oko", group: "Økonomi", nb: "Regnskap", en: "Accounting", s: ["Rg", "Ac"], eqText: OKO_EQ, units: [] });
NEWCOURSE({ code: "OMAT", study: "oko", group: "Økonomi", nb: "Matematikk for økonomer", en: "Mathematics for Economists", s: ["MØ", "ME"], eqText: OKO_EQ, units: [] });
NEWCOURSE({ code: "OSTAT", study: "oko", group: "Økonomi", nb: "Statistikk", en: "Statistics", s: ["St", "St"], eqText: OKO_EQ, units: [] });
NEWCOURSE({ code: "OSAM", study: "oko", group: "Økonomi", nb: "Samfunnsøkonomi", en: "Economics", s: ["SØ", "Ec"], eqText: OKO_EQ, units: [] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const kr = x => mf(Math.round(x), 0);

// ================= BEDRIFTSØKONOMI =================
const B_DB = ADDUNIT("OBED", "Dekningsbidrag og nullpunkt", "Contribution margin and break-even");
TH("OBED", B_DB, `## Hva handler det om?
Hvor mange enheter må en bedrift selge for å gå i null? Svaret finner du med **dekningsbidraget**: det hver solgte enhet bidrar med til å dekke de faste kostnadene.

## Begreper og formler
- **Faste kostnader** (FK) er de samme uansett hvor mye du selger: husleie, faste lønninger.
- **Variable kostnader** (VEK per enhet) øker med antallet: råvarer, frakt.
- **Dekningsbidrag per enhet**: $\\text{DB} = \\text{pris} - \\text{VEK}$.
- **Dekningsgrad**: $\\text{DG} = \\dfrac{\\text{DB}}{\\text{pris}} \\cdot 100\\,\\%$.
- **Nullpunkt** (antall): $x_0 = \\dfrac{\\text{FK}}{\\text{DB}}$. Nullpunktsomsetning: $\\dfrac{\\text{FK}}{\\text{DG}}$.
- **Resultat**: $\\text{DB} \\cdot x - \\text{FK}$.
- **Sikkerhetsmargin**: hvor mye salget kan falle før du går i minus.

### Eksempel
Pris 200 kr, VEK 120 kr, FK 400 000 kr. DB = 80 kr og DG = 40 %. Nullpunkt: $400\\,000/80 = 5000$ enheter.

> Hver solgt enhet over nullpunktet gir hele dekningsbidraget i overskudd.`,
`## What is it about?
How many units must a company sell to break even? The answer comes from the **contribution margin**: what each unit sold contributes towards covering the fixed costs.

## Concepts and formulas
- **Fixed costs** (FC) are the same however much you sell: rent, fixed salaries.
- **Variable costs** (VC per unit) grow with volume: materials, shipping.
- **Contribution margin per unit**: $\\text{CM} = \\text{price} - \\text{VC}$.
- **Contribution margin ratio**: $\\dfrac{\\text{CM}}{\\text{price}} \\cdot 100\\,\\%$.
- **Break-even point** (units): $x_0 = \\dfrac{\\text{FC}}{\\text{CM}}$. Break-even revenue: $\\dfrac{\\text{FC}}{\\text{CM ratio}}$.
- **Profit**: $\\text{CM} \\cdot x - \\text{FC}$.
- **Margin of safety**: how much sales can fall before you make a loss.

### Example
Price 200 NOK, VC 120 NOK, FC 400,000 NOK. CM = 80 NOK and the ratio is 40 %. Break-even: $400\\,000/80 = 5000$ units.

> Every unit sold beyond break-even gives its whole contribution margin as profit.`);
BIQ("OBED", B_DB, [
 ["Pris 150 kr, variable kostnader 90 kr per enhet. Hva er dekningsbidraget per enhet?", { n: 60, tol: 0, u: "kr" }, "$150 - 90 = 60$ kr.", "Price 150 NOK, variable costs 90 NOK per unit. What is the contribution margin per unit?", null, "$150 - 90 = 60$ NOK."],
 ["Hvilken kostnad er fast?", ["Husleie", "Råvarer", "Frakt per pakke", "Provisjon per salg"], "Husleien endrer seg ikke med antall solgte enheter.", "Which cost is fixed?", ["Rent", "Materials", "Shipping per parcel", "Commission per sale"], "The rent does not change with the number of units sold."],
 ["DB = 50 kr og faste kostnader 200 000 kr. Hvor mange enheter må selges for å gå i null?", { n: 4000, tol: 0, u: "" }, "$200\\,000/50 = 4000$ enheter.", "CM = 50 NOK and fixed costs 200,000 NOK. How many units must be sold to break even?", null, "$200\\,000/50 = 4000$ units."],
 ["Pris 200 kr, DB 50 kr. Hva er dekningsgraden?", { n: 25, tol: 0, u: "%" }, "$50/200 = 0{,}25 = 25$ %.", "Price 200 NOK, CM 50 NOK. What is the contribution margin ratio?", null, "$50/200 = 0.25 = 25$ %."],
 ["Hva skjer med nullpunktet hvis de faste kostnadene øker?", ["Det øker", "Det synker", "Det er uendret", "Det blir null"], "Flere faste kostnader må dekkes av dekningsbidraget.", "What happens to the break-even point if the fixed costs increase?", ["It increases", "It decreases", "It is unchanged", "It becomes zero"], "More fixed costs must be covered by the contribution margin."]
]);
GEN("OBED", B_DB,
 () => { const p = R.p([80, 120, 150, 200, 250, 400]), v = Math.round(p * R.p([0.4, 0.5, 0.6, 0.7])), fk = R.p([100000, 250000, 400000, 600000, 1000000]), db = p - v, x0 = fk / db;
   return [T(`Pris ${p} kr, variable kostnader ${v} kr per enhet og faste kostnader ${nf(fk, 0)} kr. Hvor mange enheter må selges for å gå i null?`, `Price ${p} NOK, variable costs ${v} NOK per unit and fixed costs ${nf(fk, 0)} NOK. How many units must be sold to break even?`), { n: x0, tol: Math.max(1, x0 * 0.002), u: "" },
     T(`$\\text{DB} = ${p} - ${v} = ${db}$ kr. Nullpunkt $= \\dfrac{${fk}}{${db}} = ${mf(x0, 1)}$, altså ${Math.ceil(x0 - 1e-9)} hele enheter.`, `$\\text{CM} = ${p} - ${v} = ${db}$ NOK. Break-even $= \\dfrac{${fk}}{${db}} = ${mf(x0, 1)}$, i.e. ${Math.ceil(x0 - 1e-9)} whole units.`)]; },
 () => { const p = R.p([100, 200, 300]), v = Math.round(p * R.p([0.5, 0.6])), fk = R.p([200000, 300000, 500000]), x = R.p([3000, 5000, 8000, 10000]), res = (p - v) * x - fk;
   return [T(`Pris ${p} kr, VEK ${v} kr, faste kostnader ${nf(fk, 0)} kr. Hva blir resultatet ved salg av ${nf(x, 0)} enheter?`, `Price ${p} NOK, VC ${v} NOK, fixed costs ${nf(fk, 0)} NOK. What is the profit when selling ${nf(x, 0)} units?`), { n: res, tol: 1, u: "kr" },
     T(`$(${p} - ${v}) \\cdot ${x} - ${fk} = ${kr(res)}$ kr${res < 0 ? " (underskudd)" : ""}.`, `$(${p} - ${v}) \\cdot ${x} - ${fk} = ${kr(res)}$ NOK${res < 0 ? " (a loss)" : ""}.`)]; },
 () => { const fk = R.p([120000, 300000, 450000]), dg = R.p([20, 25, 30, 40, 50]), oms = fk / (dg / 100);
   return [T(`Faste kostnader ${nf(fk, 0)} kr og dekningsgrad ${dg} %. Hva er nullpunktsomsetningen?`, `Fixed costs ${nf(fk, 0)} NOK and contribution margin ratio ${dg} %. What is the break-even revenue?`), { n: oms, tol: 1, u: "kr" },
     T(`$\\dfrac{${fk}}{${mf(dg / 100)}} = ${kr(oms)}$ kr.`, `$\\dfrac{${fk}}{${mf(dg / 100)}} = ${kr(oms)}$ NOK.`)]; }
);
SHAREUNIT("OBED", "OKON", 2, "Ingeniørøkonomi", "Engineering economics"); // kostnader og lønnsomhet
SHAREUNIT("OBED", "OKON", 0, "Ingeniørøkonomi", "Engineering economics"); // rente og tidsverdi
SHAREUNIT("OBED", "OKON", 1, "Ingeniørøkonomi", "Engineering economics"); // investeringsanalyse
const B_BUD = ADDUNIT("OBED", "Budsjett og likviditet", "Budgets and liquidity");
TH("OBED", B_BUD, `## Hva handler det om?
Et budsjett er en plan for fremtiden i kroner. **Resultatbudsjettet** viser om bedriften tjener penger. **Likviditetsbudsjettet** viser om den har penger i banken til å betale regningene. En lønnsom bedrift kan likevel gå konkurs hvis likviditeten svikter.

## Begreper og formler
- **Inntekt og kostnad** (resultat) registreres når salget/forbruket skjer. **Innbetaling og utbetaling** (likviditet) når pengene faktisk flyttes.
- Salg på kreditt: inntekten kommer nå, innbetalingen senere (for eksempel 30 dagers kreditt).
- Likviditetsbudsjett: $\\text{UB} = \\text{IB} + \\text{innbetalinger} - \\text{utbetalinger}$ (IB/UB = inngående/utgående beholdning).
- Avskrivninger er en **kostnad**, men ingen **utbetaling**.
- Kjøp av en maskin er en **utbetaling** med en gang, men kostnadsføres gradvis via avskrivninger.

### Eksempel
IB i banken 50 000 kr. Innbetalinger 120 000 kr, utbetalinger 150 000 kr. UB $= 50\\,000 + 120\\,000 - 150\\,000 = 20\\,000$ kr.

> Resultat = tjener vi penger? Likviditet = har vi penger nå?`,
`## What is it about?
A budget is a plan for the future in money. The **income budget** shows whether the company makes a profit. The **cash budget** shows whether it has money in the bank to pay the bills. A profitable company can still go bankrupt if liquidity fails.

## Concepts and formulas
- **Revenue and expense** (profit) are recorded when the sale/consumption happens. **Receipts and payments** (liquidity) when the money actually moves.
- Sales on credit: the revenue comes now, the receipt later (for example 30 days' credit).
- Cash budget: closing balance = opening balance + receipts − payments.
- Depreciation is an **expense**, but not a **payment**.
- Buying a machine is a **payment** straight away, but is expensed gradually via depreciation.

### Example
Opening bank balance 50,000 NOK. Receipts 120,000 NOK, payments 150,000 NOK. Closing $= 50\\,000 + 120\\,000 - 150\\,000 = 20\\,000$ NOK.

> Profit = are we making money? Liquidity = do we have money now?`);
BIQ("OBED", B_BUD, [
 ["Er avskrivning en utbetaling?", ["Nei, en kostnad uten utbetaling", "Ja", "Bare hvis maskinen selges", "Bare i desember"], "Pengene gikk ut da maskinen ble kjøpt. Avskrivningen fordeler kostnaden.", "Is depreciation a payment?", ["No, an expense without a payment", "Yes", "Only if the machine is sold", "Only in December"], "The money left when the machine was bought. Depreciation spreads the cost."],
 ["Bank 30 000 kr ved start. Innbetalinger 80 000, utbetalinger 95 000. Hva er beholdningen ved slutten?", { n: 15000, tol: 0, u: "kr" }, "$30\\,000 + 80\\,000 - 95\\,000 = 15\\,000$ kr.", "Bank 30,000 NOK at the start. Receipts 80,000, payments 95,000. What is the closing balance?", null, "$30\\,000 + 80\\,000 - 95\\,000 = 15\\,000$ NOK."],
 ["Kan en lønnsom bedrift gå konkurs?", ["Ja, hvis den mangler likviditet", "Nei, aldri", "Bare hvis den har for mye penger", "Bare om sommeren"], "Kundene betaler kanskje for sent mens regningene forfaller.", "Can a profitable company go bankrupt?", ["Yes, if it lacks liquidity", "No, never", "Only if it has too much money", "Only in summer"], "Customers may pay late while the bills fall due."],
 ["Du selger for 100 000 kr i januar med 30 dagers kreditt. Når kommer innbetalingen?", ["I februar", "I januar", "I desember", "Aldri"], "Inntekten er i januar, innbetalingen 30 dager senere.", "You sell for 100,000 NOK in January with 30 days' credit. When does the receipt come?", ["In February", "In January", "In December", "Never"], "The revenue is in January, the receipt 30 days later."]
]);
GEN("OBED", B_BUD,
 () => { const ib = R.p([20000, 50000, 100000]), inn = R.p([80000, 120000, 200000]), ut = R.p([90000, 150000, 180000, 250000]), ub = ib + inn - ut;
   return [T(`Inngående bankbeholdning ${nf(ib, 0)} kr. Innbetalinger ${nf(inn, 0)} kr og utbetalinger ${nf(ut, 0)} kr. Hva er utgående beholdning?`, `Opening bank balance ${nf(ib, 0)} NOK. Receipts ${nf(inn, 0)} NOK and payments ${nf(ut, 0)} NOK. What is the closing balance?`), { n: ub, tol: 0, u: "kr" },
     T(`$${ib} + ${inn} - ${ut} = ${ub}$ kr${ub < 0 ? ": minus, bedriften trenger kassekreditt" : ""}.`, `$${ib} + ${inn} - ${ut} = ${ub}$ NOK${ub < 0 ? ": negative, the company needs an overdraft" : ""}.`)]; }
);

// ================= REGNSKAP =================
const R_GR = ADDUNIT("OREG", "Resultat og balanse", "Income statement and balance sheet");
TH("OREG", R_GR, `## Hva handler det om?
Regnskapet forteller hvordan det har gått. **Resultatregnskapet** viser inntekter og kostnader i en periode. **Balansen** viser hva bedriften eier og skylder på én dag.

## Begreper og formler
- Resultat: $\\text{inntekter} - \\text{kostnader} = \\text{årsresultat}$.
- Balansen: $\\text{eiendeler} = \\text{egenkapital} + \\text{gjeld}$. Den balanserer alltid.
- **Eiendeler**: anleggsmidler (maskiner, bygg) og omløpsmidler (varelager, kundefordringer, bank).
- **Gjeld**: langsiktig (lån) og kortsiktig (leverandørgjeld, skyldig mva).
- **Dobbelt bokføring**: hver transaksjon føres på to kontoer, én i debet og én i kredit, med samme beløp.
- Eiendeler og kostnader øker i **debet**. Gjeld, egenkapital og inntekter øker i **kredit**.

### Eksempel
Bedriften kjøper varer for 10 000 kr kontant: varelager (debet) +10 000, bank (kredit) −10 000. Balansen er fortsatt i balanse.

> Resultat = en film av perioden. Balanse = et bilde av én dag.`,
`## What is it about?
The accounts tell you how things went. The **income statement** shows revenue and expenses over a period. The **balance sheet** shows what the company owns and owes on one day.

## Concepts and formulas
- Profit: $\\text{revenue} - \\text{expenses} = \\text{net income}$.
- Balance sheet: $\\text{assets} = \\text{equity} + \\text{liabilities}$. It always balances.
- **Assets**: non-current (machines, buildings) and current (inventory, receivables, bank).
- **Liabilities**: long-term (loans) and short-term (payables, VAT owed).
- **Double-entry bookkeeping**: every transaction is posted to two accounts, one debit and one credit, with the same amount.
- Assets and expenses increase on the **debit** side. Liabilities, equity and revenue increase on the **credit** side.

### Example
The company buys goods for 10,000 NOK in cash: inventory (debit) +10,000, bank (credit) −10,000. The balance sheet still balances.

> Income statement = a film of the period. Balance sheet = a photo of one day.`);
BIQ("OREG", R_GR, [
 ["Eiendeler er 800 000 kr og gjeld 500 000 kr. Hva er egenkapitalen?", { n: 300000, tol: 0, u: "kr" }, "$800\\,000 - 500\\,000 = 300\\,000$ kr.", "Assets are 800,000 NOK and liabilities 500,000 NOK. What is the equity?", null, "$800\\,000 - 500\\,000 = 300\\,000$ NOK."],
 ["Hvilken side øker en eiendel på?", ["Debet", "Kredit", "Begge", "Ingen"], "Eiendeler og kostnader øker i debet.", "On which side does an asset increase?", ["Debit", "Credit", "Both", "Neither"], "Assets and expenses increase on the debit side."],
 ["Er et banklån en eiendel eller gjeld?", ["Gjeld", "Eiendel", "Egenkapital", "Inntekt"], "Lånet må betales tilbake.", "Is a bank loan an asset or a liability?", ["A liability", "An asset", "Equity", "Revenue"], "The loan must be repaid."],
 ["Hva viser resultatregnskapet?", ["Inntekter og kostnader i en periode", "Eiendeler på én dag", "Bankbeholdningen", "Antall ansatte"], "Balansen viser eiendeler og gjeld på én dag.", "What does the income statement show?", ["Revenue and expenses over a period", "Assets on one day", "The bank balance", "The number of employees"], "The balance sheet shows assets and liabilities on one day."],
 ["Varer kjøpes på kreditt. Hvilken konto krediteres?", ["Leverandørgjeld", "Bank", "Varekostnad", "Egenkapital"], "Du har ikke betalt ennå, så gjelden øker (kredit).", "Goods are bought on credit. Which account is credited?", ["Accounts payable", "Bank", "Cost of goods", "Equity"], "You have not paid yet, so the liability increases (credit)."]
]);
GEN("OREG", R_GR,
 () => { const ei = R.p([500, 800, 1200, 2000]) * 1000, gj = Math.round(ei * R.p([0.4, 0.5, 0.6, 0.7]) / 1000) * 1000, ek = ei - gj, ekpct = ek / ei * 100;
   return [T(`Eiendeler ${nf(ei, 0)} kr og gjeld ${nf(gj, 0)} kr. Hva er egenkapitalandelen i prosent?`, `Assets ${nf(ei, 0)} NOK and liabilities ${nf(gj, 0)} NOK. What is the equity ratio in percent?`), { n: ekpct, tol: 0.1, u: "%" },
     T(`Egenkapital $= ${ei} - ${gj} = ${ek}$ kr. Andel: $\\dfrac{${ek}}{${ei}} = ${mf(ekpct, 1)}$ %.`, `Equity $= ${ei} - ${gj} = ${ek}$ NOK. Ratio: $\\dfrac{${ek}}{${ei}} = ${mf(ekpct, 1)}$ %.`)]; }
);
const R_AVS = ADDUNIT("OREG", "Avskrivninger", "Depreciation");
TH("OREG", R_AVS, `## Hva handler det om?
En maskin som varer i fem år, skal ikke belaste regnskapet med hele prisen det første året. Kostnaden fordeles over levetiden med **avskrivninger**.

## Begreper og formler
- **Lineær avskrivning**: like mye hvert år. $\\text{årlig avskrivning} = \\dfrac{\\text{kostpris} - \\text{restverdi}}{\\text{levetid}}$.
- **Saldoavskrivning** (skatt): en fast prosent av den gjenværende verdien hvert år. Verdien etter $n$ år: $K(1 - p)^n$.
- **Bokført verdi** = kostpris minus samlede avskrivninger.
- Avskrivning er en kostnad som reduserer resultatet (og skatten), men ingen utbetaling.

### Eksempel
Maskin 500 000 kr, restverdi 50 000 kr, levetid 5 år. Lineær avskrivning: $\\dfrac{450\\,000}{5} = 90\\,000$ kr per år.

> Lineær: samme beløp hvert år. Saldo: samme prosent hvert år.`,
`## What is it about?
A machine that lasts five years should not charge the full price to the accounts in the first year. The cost is spread over its life with **depreciation**.

## Concepts and formulas
- **Straight-line depreciation**: the same amount each year. $\\text{annual depreciation} = \\dfrac{\\text{cost} - \\text{residual value}}{\\text{useful life}}$.
- **Declining balance** (tax): a fixed percentage of the remaining value each year. Value after $n$ years: $K(1 - p)^n$.
- **Book value** = cost minus accumulated depreciation.
- Depreciation is an expense that reduces profit (and tax), but it is not a payment.

### Example
Machine 500,000 NOK, residual value 50,000 NOK, life 5 years. Straight line: $\\dfrac{450\\,000}{5} = 90\\,000$ NOK per year.

> Straight line: the same amount each year. Declining balance: the same percentage each year.`);
BIQ("OREG", R_AVS, [
 ["Maskin 300 000 kr, restverdi 0, levetid 6 år. Hva er lineær avskrivning per år?", { n: 50000, tol: 0, u: "kr" }, "$300\\,000/6 = 50\\,000$ kr.", "Machine 300,000 NOK, residual value 0, life 6 years. What is the straight-line depreciation per year?", null, "$300\\,000/6 = 50\\,000$ NOK."],
 ["Hva er forskjellen på lineær og saldoavskrivning?", ["Lineær gir samme beløp, saldo samme prosent", "De er like", "Saldo gir samme beløp", "Lineær brukes bare for bygg"], "Saldoavskrivningen blir mindre i kroner hvert år.", "What is the difference between straight-line and declining-balance depreciation?", ["Straight line gives the same amount, declining balance the same percentage", "They are the same", "Declining balance gives the same amount", "Straight line is only for buildings"], "Declining balance gets smaller in kroner each year."],
 ["Hvorfor avskriver man i stedet for å kostnadsføre alt med en gang?", ["Kostnaden fordeles over årene maskinen brukes", "For å slippe skatt helt", "Det er ulovlig å kostnadsføre", "For å øke likviditeten"], "Sammenstillingsprinsippet: kostnader føres i samme periode som inntektene de hjelper å skape.", "Why depreciate instead of expensing everything at once?", ["The cost is spread over the years the machine is used", "To avoid tax completely", "Expensing is illegal", "To increase liquidity"], "The matching principle: expenses are recognised in the same period as the revenue they help create."]
]);
GEN("OREG", R_AVS,
 () => { const K = R.p([200, 300, 450, 600, 1000]) * 1000, rv = R.p([0, 0.1, 0.2]) * K, n = R.p([4, 5, 8, 10]), a = (K - rv) / n, yr = R.i(1, n - 1), bv = K - yr * a;
   return [T(`En maskin koster ${nf(K, 0)} kr, har restverdi ${nf(rv, 0)} kr og levetid ${n} år. Hva er bokført verdi etter ${yr} år med lineær avskrivning?`, `A machine costs ${nf(K, 0)} NOK, has residual value ${nf(rv, 0)} NOK and a life of ${n} years. What is the book value after ${yr} years of straight-line depreciation?`), { n: bv, tol: 1, u: "kr" },
     T(`Årlig: $\\dfrac{${K} - ${rv}}{${n}} = ${kr(a)}$ kr. Etter ${yr} år: $${K} - ${yr} \\cdot ${kr(a)} = ${kr(bv)}$ kr.`, `Annual: $\\dfrac{${K} - ${rv}}{${n}} = ${kr(a)}$ NOK. After ${yr} years: $${K} - ${yr} \\cdot ${kr(a)} = ${kr(bv)}$ NOK.`)]; },
 () => { const K = R.p([100, 250, 500]) * 1000, p = R.p([20, 25, 30]), n = R.i(1, 5), v = K * (1 - p / 100) ** n;
   return [T(`Et driftsmiddel på ${nf(K, 0)} kr saldoavskrives med ${p} % per år. Hva er saldoen etter ${n} år?`, `An asset of ${nf(K, 0)} NOK is depreciated on a declining balance at ${p} % per year. What is the balance after ${n} years?`), { n: v, tol: 1, u: "kr" },
     T(`$${K} \\cdot ${mf(1 - p / 100)}^{${n}} = ${kr(v)}$ kr.`, `$${K} \\cdot ${mf(1 - p / 100)}^{${n}} = ${kr(v)}$ NOK.`)]; }
);
const R_NT = ADDUNIT("OREG", "Nøkkeltall og analyse", "Key ratios and analysis");
TH("OREG", R_NT, `## Hva handler det om?
Nøkkeltall gjør det mulig å sammenligne bedrifter av ulik størrelse. De viser lønnsomhet, likviditet og soliditet.

## Begreper og formler
- **Resultatgrad** (driftsmargin): $\\dfrac{\\text{driftsresultat}}{\\text{salgsinntekt}} \\cdot 100\\,\\%$.
- **Totalkapitalrentabilitet**: $\\dfrac{\\text{driftsresultat} + \\text{finansinntekter}}{\\text{totalkapital}} \\cdot 100\\,\\%$.
- **Egenkapitalrentabilitet**: $\\dfrac{\\text{resultat før skatt}}{\\text{egenkapital}} \\cdot 100\\,\\%$.
- **Likviditetsgrad 1**: $\\dfrac{\\text{omløpsmidler}}{\\text{kortsiktig gjeld}}$. Tommelfingerregel: over 2.
- **Egenkapitalandel** (soliditet): $\\dfrac{\\text{egenkapital}}{\\text{totalkapital}} \\cdot 100\\,\\%$.

> Lønnsomhet: tjener vi nok? Likviditet: kan vi betale regningene? Soliditet: tåler vi tap?`,
`## What is it about?
Key ratios make it possible to compare companies of different sizes. They show profitability, liquidity and solvency.

## Concepts and formulas
- **Operating margin**: $\\dfrac{\\text{operating profit}}{\\text{sales revenue}} \\cdot 100\\,\\%$.
- **Return on assets**: $\\dfrac{\\text{operating profit} + \\text{financial income}}{\\text{total assets}} \\cdot 100\\,\\%$.
- **Return on equity**: $\\dfrac{\\text{profit before tax}}{\\text{equity}} \\cdot 100\\,\\%$.
- **Current ratio**: $\\dfrac{\\text{current assets}}{\\text{current liabilities}}$. Rule of thumb: above 2.
- **Equity ratio** (solvency): $\\dfrac{\\text{equity}}{\\text{total assets}} \\cdot 100\\,\\%$.

> Profitability: do we earn enough? Liquidity: can we pay the bills? Solvency: can we withstand losses?`);
BIQ("OREG", R_NT, [
 ["Omløpsmidler 400 000 kr, kortsiktig gjeld 200 000 kr. Hva er likviditetsgrad 1?", { n: 2, tol: 0, u: "" }, "$400\\,000/200\\,000 = 2$.", "Current assets 400,000 NOK, current liabilities 200,000 NOK. What is the current ratio?", null, "$400\\,000/200\\,000 = 2$."],
 ["Hvilket nøkkeltall måler soliditet?", ["Egenkapitalandel", "Likviditetsgrad", "Resultatgrad", "Omsetning"], "Høy egenkapitalandel gjør bedriften robust mot tap.", "Which ratio measures solvency?", ["Equity ratio", "Current ratio", "Operating margin", "Revenue"], "A high equity ratio makes the company robust against losses."],
 ["Driftsresultat 150 000 kr og salgsinntekt 1 500 000 kr. Hva er resultatgraden?", { n: 10, tol: 0, u: "%" }, "$150\\,000/1\\,500\\,000 = 10$ %.", "Operating profit 150,000 NOK and sales 1,500,000 NOK. What is the operating margin?", null, "$150\\,000/1\\,500\\,000 = 10$ %."]
]);
GEN("OREG", R_NT,
 () => { const ek = R.p([200, 400, 600, 1000]) * 1000, res = Math.round(ek * R.p([0.05, 0.08, 0.12, 0.15, 0.2]) / 1000) * 1000, r = res / ek * 100;
   return [T(`Resultat før skatt er ${nf(res, 0)} kr og egenkapitalen ${nf(ek, 0)} kr. Hva er egenkapitalrentabiliteten?`, `Profit before tax is ${nf(res, 0)} NOK and equity ${nf(ek, 0)} NOK. What is the return on equity?`), { n: r, tol: 0.1, u: "%" },
     T(`$\\dfrac{${res}}{${ek}} = ${mf(r, 1)}$ %.`, `$\\dfrac{${res}}{${ek}} = ${mf(r, 1)}$ %.`)]; },
 () => { const om = R.p([150, 300, 450, 600]) * 1000, kg = R.p([100, 200, 250, 300]) * 1000, lg = om / kg;
   return [T(`Omløpsmidler ${nf(om, 0)} kr og kortsiktig gjeld ${nf(kg, 0)} kr. Hva er likviditetsgrad 1?`, `Current assets ${nf(om, 0)} NOK and current liabilities ${nf(kg, 0)} NOK. What is the current ratio?`), { n: lg, tol: 0.01, u: "" },
     T(`$\\dfrac{${om}}{${kg}} = ${mf(lg, 2)}$. ${lg >= 2 ? "Over 2: god likviditet." : "Under 2: svakere enn tommelfingerregelen."}`, `$\\dfrac{${om}}{${kg}} = ${mf(lg, 2)}$. ${lg >= 2 ? "Above 2: good liquidity." : "Below 2: weaker than the rule of thumb."}`)]; }
);
const R_MVA = ADDUNIT("OREG", "Merverdiavgift", "Value added tax");
TH("OREG", R_MVA, `## Hva handler det om?
Merverdiavgift (mva) er en skatt på forbruk. Bedriften krever den inn fra kundene og betaler den videre til staten, men trekker fra mvaen den selv har betalt på innkjøp.

## Begreper og formler
- Satser i Norge: **25 %** (alminnelig), **15 %** (mat og drikke), **12 %** (persontransport, hotell, kino).
- Fra pris uten mva til pris med mva: gang med $1{,}25$ (ved 25 %).
- Fra pris med mva til pris uten: del på $1{,}25$. Mvaen i en pris med mva er $\\text{pris} \\cdot \\dfrac{25}{125} = \\dfrac{\\text{pris}}{5}$.
- **Utgående mva**: på salget. **Inngående mva**: på innkjøp. Å betale: $\\text{utgående} - \\text{inngående}$.

### Eksempel
En vare koster 1250 kr inkl. mva. Uten mva: $1250/1{,}25 = 1000$ kr. Mvaen er 250 kr.

> Pris med 25 % mva delt på 5 = mvaen.`,
`## What is it about?
Value added tax (VAT) is a tax on consumption. The company collects it from customers and passes it on to the state, but deducts the VAT it has paid on its own purchases.

## Concepts and formulas
- Rates in Norway: **25 %** (standard), **15 %** (food and drink), **12 %** (passenger transport, hotels, cinema).
- From price excl. VAT to incl. VAT: multiply by $1.25$ (at 25 %).
- From incl. VAT to excl. VAT: divide by $1.25$. The VAT in a price incl. VAT is $\\text{price} \\cdot \\dfrac{25}{125} = \\dfrac{\\text{price}}{5}$.
- **Output VAT**: on sales. **Input VAT**: on purchases. To pay: $\\text{output} - \\text{input}$.

### Example
An item costs 1250 NOK incl. VAT. Excl. VAT: $1250/1.25 = 1000$ NOK. The VAT is 250 NOK.

> A price incl. 25 % VAT divided by 5 = the VAT.`);
BIQ("OREG", R_MVA, [
 ["En vare koster 800 kr uten mva. Hva koster den med 25 % mva?", { n: 1000, tol: 0, u: "kr" }, "$800 \\cdot 1{,}25 = 1000$ kr.", "An item costs 800 NOK excl. VAT. What does it cost incl. 25 % VAT?", null, "$800 \\cdot 1.25 = 1000$ NOK."],
 ["Hvor mye mva er det i en pris på 500 kr inkl. 25 % mva?", { n: 100, tol: 0, u: "kr" }, "$500/5 = 100$ kr.", "How much VAT is in a price of 500 NOK incl. 25 % VAT?", null, "$500/5 = 100$ NOK."],
 ["Hvilken mvasats gjelder for matvarer i butikk?", ["15 %", "25 %", "12 %", "0 %"], "Næringsmidler har redusert sats på 15 %.", "Which VAT rate applies to food in shops?", ["15 %", "25 %", "12 %", "0 %"], "Foodstuffs have a reduced rate of 15 %."],
 ["Utgående mva 50 000 kr og inngående mva 30 000 kr. Hvor mye skal betales til staten?", { n: 20000, tol: 0, u: "kr" }, "$50\\,000 - 30\\,000 = 20\\,000$ kr.", "Output VAT 50,000 NOK and input VAT 30,000 NOK. How much must be paid to the state?", null, "$50\\,000 - 30\\,000 = 20\\,000$ NOK."]
]);
GEN("OREG", R_MVA,
 () => { const rate = R.p([25, 15, 12]), inkl = R.p([100, 250, 460, 1150, 2400, 5000]), eks = inkl / (1 + rate / 100), mva = inkl - eks;
   return [T(`En pris er ${inkl} kr inkludert ${rate} % mva. Hvor mye av prisen er mva?`, `A price is ${inkl} NOK including ${rate} % VAT. How much of the price is VAT?`), { n: mva, tol: 0.01, u: "kr" },
     T(`Uten mva: $\\dfrac{${inkl}}{${mf(1 + rate / 100)}} = ${mf(eks, 2)}$ kr. Mva: $${inkl} - ${mf(eks, 2)} = ${mf(mva, 2)}$ kr.`, `Excl. VAT: $\\dfrac{${inkl}}{${mf(1 + rate / 100)}} = ${mf(eks, 2)}$ NOK. VAT: $${inkl} - ${mf(eks, 2)} = ${mf(mva, 2)}$ NOK.`)]; }
);

// ================= MATEMATIKK FOR ØKONOMER =================
const M_EL = ADDUNIT("OMAT", "Funksjoner, marginalanalyse og elastisitet", "Functions, marginal analysis and elasticity");
TH("OMAT", M_EL, `## Hva handler det om?
Økonomer bruker funksjoner for kostnad, inntekt og etterspørsel. Den deriverte kalles **marginal** (hva skjer med én enhet til), og **elastisitet** måler hvor følsom etterspørselen er for pris.

## Begreper og formler
- Grensekostnad $K'(x)$, grenseinntekt $I'(x)$. Maks overskudd der $I'(x) = K'(x)$.
- Lineær etterspørsel: $x = a - bp$. Inntekt: $I = p \\cdot x$.
- **Priselastisitet**: $E_p = \\dfrac{dx}{dp}\\cdot\\dfrac{p}{x}$. Tolkning: prosent endring i etterspurt mengde når prisen øker med 1 %.
- $|E_p| > 1$: **elastisk** (prisøkning gir lavere inntekt). $|E_p| < 1$: **uelastisk** (prisøkning gir høyere inntekt).
- Inntekten er størst der $|E_p| = 1$.

### Eksempel
$x = 1000 - 5p$ og $p = 80$: $x = 600$, $\\dfrac{dx}{dp} = -5$, $E_p = -5 \\cdot \\dfrac{80}{600} = -0{,}67$. Uelastisk: en prisøkning gir mer inntekt.

> Elastisitet = prosent på prosent.`,
`## What is it about?
Economists use functions for cost, revenue and demand. The derivative is called **marginal** (what happens with one more unit), and **elasticity** measures how sensitive demand is to price.

## Concepts and formulas
- Marginal cost $K'(x)$, marginal revenue $I'(x)$. Maximum profit where $I'(x) = K'(x)$.
- Linear demand: $x = a - bp$. Revenue: $I = p \\cdot x$.
- **Price elasticity**: $E_p = \\dfrac{dx}{dp}\\cdot\\dfrac{p}{x}$. Interpretation: the percentage change in quantity demanded when the price rises by 1 %.
- $|E_p| > 1$: **elastic** (a price rise gives lower revenue). $|E_p| < 1$: **inelastic** (a price rise gives higher revenue).
- Revenue is largest where $|E_p| = 1$.

### Example
$x = 1000 - 5p$ and $p = 80$: $x = 600$, $\\dfrac{dx}{dp} = -5$, $E_p = -5 \\cdot \\dfrac{80}{600} = -0.67$. Inelastic: a price rise gives more revenue.

> Elasticity = percent over percent.`);
BIQ("OMAT", M_EL, [
 ["$E_p = -2$. Hva skjer med etterspurt mengde når prisen øker med 1 %?", ["Den synker med omtrent 2 %", "Den øker med 2 %", "Den synker med 0,5 %", "Ingenting"], "Elastisitet er prosent endring i mengde per prosent endring i pris.", "$E_p = -2$. What happens to quantity demanded when the price rises by 1 %?", ["It falls by about 2 %", "It rises by 2 %", "It falls by 0.5 %", "Nothing"], "Elasticity is the percentage change in quantity per percentage change in price."],
 ["Etterspørselen er uelastisk. Hva skjer med inntekten hvis prisen økes litt?", ["Den øker", "Den synker", "Den er uendret", "Den blir null"], "Mengden faller mindre enn prisen stiger.", "Demand is inelastic. What happens to revenue if the price is raised a little?", ["It increases", "It decreases", "It is unchanged", "It becomes zero"], "Quantity falls less than the price rises."],
 ["$x = 500 - 2p$. For hvilken pris er inntekten størst?", { n: 125, tol: 0, u: "kr" }, "$I = p(500 - 2p)$, $I'(p) = 500 - 4p = 0$ gir $p = 125$.", "$x = 500 - 2p$. For which price is revenue largest?", null, "$I = p(500 - 2p)$, $I'(p) = 500 - 4p = 0$ gives $p = 125$."]
]);
GEN("OMAT", M_EL,
 () => { const a = R.p([600, 800, 1000, 1200]), b = R.p([2, 4, 5, 10]), p = R.p([20, 40, 50, 60, 80]), x = a - b * p; if(x <= 0) return [T(`$x = ${a} - ${b}p$. Hva er $x$ når $p = 10$?`, `$x = ${a} - ${b}p$. What is $x$ when $p = 10$?`), { n: a - 10 * b, tol: 0, u: "" }, T(`$${a} - ${b} \\cdot 10 = ${a - 10 * b}$.`, `$${a} - ${b} \\cdot 10 = ${a - 10 * b}$.`)];
   const E = -b * p / x;
   return [T(`Etterspørselen er $x = ${a} - ${b}p$. Hva er priselastisiteten når $p = ${p}$?`, `Demand is $x = ${a} - ${b}p$. What is the price elasticity when $p = ${p}$?`), { n: E, tol: 0.01, u: "" },
     T(`$x = ${x}$, $\\dfrac{dx}{dp} = -${b}$. $E_p = -${b} \\cdot \\dfrac{${p}}{${x}} = ${mf(E, 3)}$: ${Math.abs(E) > 1 ? "elastisk" : "uelastisk"}.`, `$x = ${x}$, $\\dfrac{dx}{dp} = -${b}$. $E_p = -${b} \\cdot \\dfrac{${p}}{${x}} = ${mf(E, 3)}$: ${Math.abs(E) > 1 ? "elastic" : "inelastic"}.`)]; },
 () => { const a = R.p([400, 600, 1000, 1500]), b = R.p([2, 4, 5]), p = a / (2 * b);
   return [T(`Etterspørselen er $x = ${a} - ${b}p$. Hvilken pris gir størst inntekt?`, `Demand is $x = ${a} - ${b}p$. Which price gives maximum revenue?`), { n: p, tol: 0.01, u: "kr" },
     T(`$I(p) = ${a}p - ${b}p^2$, $I'(p) = ${a} - ${2 * b}p = 0$ gir $p = ${mf(p, 2)}$ kr.`, `$I(p) = ${a}p - ${b}p^2$, $I'(p) = ${a} - ${2 * b}p = 0$ gives $p = ${mf(p, 2)}$ NOK.`)]; }
);
SHAREUNIT("OMAT", "VGS1", "Kostnad, inntekt og overskudd", "Matematikk S1", "Mathematics S1");
SHAREUNIT("OMAT", "VGR1", "Derivasjonsregler i praksis", "Matematikk R1", "Mathematics R1");
SHAREUNIT("OMAT", "VGS2", "Sparing, lån og nåverdi", "Matematikk S2", "Mathematics S2");

// ================= STATISTIKK =================
const S_BESK = ADDUNIT("OSTAT", "Beskrivende statistikk", "Descriptive statistics");
TH("OSTAT", S_BESK, `## Hva handler det om?
Beskrivende statistikk oppsummerer data med noen få tall: hvor ligger midten, og hvor mye sprer dataene seg?

## Begreper og formler
- **Gjennomsnitt**: $\\bar x = \\dfrac{\\sum x_i}{n}$.
- **Median**: det midterste tallet når dataene er sortert. Påvirkes lite av ekstreme verdier.
- **Typetall**: den verdien som forekommer oftest.
- **Variasjonsbredde**: største minus minste verdi.
- **Utvalgsstandardavvik**: $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar x)^2}{n - 1}}$.
- Ved skjeve fordelinger (for eksempel inntekt) er medianen ofte mer representativ enn gjennomsnittet.

### Eksempel
Lønninger 400, 450, 500, 520 og 2000 (tusen kr): gjennomsnitt 774, median 500. Én høy lønn drar gjennomsnittet opp.

> Median for skjeve data, gjennomsnitt for symmetriske.`,
`## What is it about?
Descriptive statistics summarise data with a few numbers: where is the centre, and how much do the data spread?

## Concepts and formulas
- **Mean**: $\\bar x = \\dfrac{\\sum x_i}{n}$.
- **Median**: the middle value when the data are sorted. Little affected by extreme values.
- **Mode**: the most frequent value.
- **Range**: largest minus smallest value.
- **Sample standard deviation**: $s = \\sqrt{\\dfrac{\\sum (x_i - \\bar x)^2}{n - 1}}$.
- For skewed distributions (for example income) the median is often more representative than the mean.

### Example
Salaries 400, 450, 500, 520 and 2000 (thousand NOK): mean 774, median 500. One high salary pulls the mean up.

> Median for skewed data, mean for symmetric data.`);
BIQ("OSTAT", S_BESK, [
 ["Hva er medianen av 3, 7, 2, 9, 5?", { n: 5, tol: 0, u: "" }, "Sortert: 2, 3, 5, 7, 9. Midterste er 5.", "What is the median of 3, 7, 2, 9, 5?", null, "Sorted: 2, 3, 5, 7, 9. The middle one is 5."],
 ["Hvilket mål påvirkes minst av én ekstremt høy verdi?", ["Medianen", "Gjennomsnittet", "Variasjonsbredden", "Standardavviket"], "Medianen bryr seg bare om rekkefølgen.", "Which measure is least affected by one extremely high value?", ["The median", "The mean", "The range", "The standard deviation"], "The median only cares about the order."],
 ["Hvorfor deler man på $n - 1$ i utvalgsstandardavviket?", ["For å korrigere for at gjennomsnittet er estimert fra de samme dataene", "Det er en skrivefeil", "For å få et større tall uten grunn", "Fordi $n$ alltid er partall"], "Det gir et forventningsrett estimat av variansen.", "Why divide by $n - 1$ in the sample standard deviation?", ["To correct for the mean being estimated from the same data", "It is a typo", "To get a bigger number for no reason", "Because $n$ is always even"], "It gives an unbiased estimate of the variance."]
]);
GEN("OSTAT", S_BESK,
 () => { const n = R.p([5, 6, 7]), xs = Array.from({ length: n }, () => R.i(1, 20)), mean = xs.reduce((a, b) => a + b, 0) / n;
   return [T(`Finn gjennomsnittet av ${xs.join(", ")}.`, `Find the mean of ${xs.join(", ")}.`), { n: mean, tol: 0.01, u: "" },
     T(`Summen er ${xs.reduce((a, b) => a + b, 0)}, og $${xs.reduce((a, b) => a + b, 0)}/${n} = ${mf(mean, 3)}$.`, `The sum is ${xs.reduce((a, b) => a + b, 0)}, and $${xs.reduce((a, b) => a + b, 0)}/${n} = ${mf(mean, 3)}$.`)]; },
 () => { const n = R.p([5, 7, 8]), xs = Array.from({ length: n }, () => R.i(1, 50)), s = [...xs].sort((a, b) => a - b), med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
   return [T(`Finn medianen av ${xs.join(", ")}.`, `Find the median of ${xs.join(", ")}.`), { n: med, tol: 0, u: "" },
     T(`Sortert: ${s.join(", ")}. ${n % 2 ? `Den midterste er ${med}.` : `Snittet av de to midterste: $(${s[n / 2 - 1]} + ${s[n / 2]})/2 = ${mf(med, 1)}$.`}`, `Sorted: ${s.join(", ")}. ${n % 2 ? `The middle one is ${med}.` : `The mean of the two middle ones: $(${s[n / 2 - 1]} + ${s[n / 2]})/2 = ${mf(med, 1)}$.`}`)]; }
);
SHAREUNIT("OSTAT", "VGS2", "Sannsynlighetsfordelinger", "Matematikk S2", "Mathematics S2");
const S_KI = ADDUNIT("OSTAT", "Konfidensintervall", "Confidence intervals");
TH("OSTAT", S_KI, `## Hva handler det om?
Et utvalg gir et **estimat**, men hvor sikkert er det? Et konfidensintervall gir et område som med en gitt sikkerhet (ofte 95 %) inneholder den sanne verdien.

## Begreper og formler
- 95 % konfidensintervall for gjennomsnitt (kjent $\\sigma$ eller stort utvalg): $\\bar x \\pm 1{,}96\\cdot\\dfrac{\\sigma}{\\sqrt n}$.
- For en andel $\\hat p$: $\\hat p \\pm 1{,}96\\sqrt{\\dfrac{\\hat p(1 - \\hat p)}{n}}$.
- **Feilmarginen** $1{,}96\\,\\sigma/\\sqrt n$ halveres når utvalget blir **fire ganger** så stort.
- 95 % betyr: gjentar vi undersøkelsen mange ganger, treffer omtrent 95 % av intervallene den sanne verdien.

### Eksempel
En meningsmåling med 1000 personer gir 30 % oppslutning. Feilmargin: $1{,}96\\sqrt{0{,}3 \\cdot 0{,}7/1000} = 0{,}028$, altså 30 % ± 2,8 prosentpoeng.

> Større utvalg → smalere intervall, men bare med kvadratroten.`,
`## What is it about?
A sample gives an **estimate**, but how certain is it? A confidence interval gives a range that, with a given confidence (often 95 %), contains the true value.

## Concepts and formulas
- 95 % confidence interval for a mean (known $\\sigma$ or large sample): $\\bar x \\pm 1.96\\cdot\\dfrac{\\sigma}{\\sqrt n}$.
- For a proportion $\\hat p$: $\\hat p \\pm 1.96\\sqrt{\\dfrac{\\hat p(1 - \\hat p)}{n}}$.
- The **margin of error** $1.96\\,\\sigma/\\sqrt n$ halves when the sample becomes **four times** as large.
- 95 % means: if we repeat the survey many times, about 95 % of the intervals contain the true value.

### Example
A poll of 1000 people gives 30 % support. Margin of error: $1.96\\sqrt{0.3 \\cdot 0.7/1000} = 0.028$, i.e. 30 % ± 2.8 percentage points.

> Larger sample → narrower interval, but only with the square root.`);
BIQ("OSTAT", S_KI, [
 ["Hvor mye større må utvalget bli for å halvere feilmarginen?", { n: 4, tol: 0, u: T("ganger", "times") }, "Feilmarginen er proporsjonal med $1/\\sqrt n$, og $\\sqrt 4 = 2$.", "How much larger must the sample be to halve the margin of error?", null, "The margin of error is proportional to $1/\\sqrt n$, and $\\sqrt 4 = 2$."],
 ["Hvilket tall brukes for et 95 % konfidensintervall (normalfordeling)?", ["1,96", "1,645", "2,576", "1"], "$P(-1{,}96 < Z < 1{,}96) = 0{,}95$.", "Which number is used for a 95 % confidence interval (normal distribution)?", ["1.96", "1.645", "2.576", "1"], "$P(-1.96 < Z < 1.96) = 0.95$."],
 ["Et 99 % konfidensintervall er … enn et 95 % intervall.", ["bredere", "smalere", "like bredt", "alltid feil"], "Mer sikkerhet krever et større område.", "A 99 % confidence interval is … than a 95 % interval.", ["wider", "narrower", "as wide", "always wrong"], "More confidence requires a larger range."]
]);
GEN("OSTAT", S_KI,
 () => { const n = R.p([400, 600, 1000, 1500, 2000]), p = R.p([0.1, 0.2, 0.3, 0.4, 0.5]), m = 1.96 * Math.sqrt(p * (1 - p) / n) * 100;
   return [T(`En måling blant ${n} personer gir ${p * 100} % oppslutning. Hva er feilmarginen i prosentpoeng (95 %)?`, `A poll of ${n} people gives ${p * 100} % support. What is the margin of error in percentage points (95 %)?`), { n: m, tol: 0.05, u: T("prosentpoeng", "percentage points") },
     T(`$1{,}96\\sqrt{\\dfrac{${mf(p)} \\cdot ${mf(1 - p)}}{${n}}} = ${mf(m / 100, 4)}$, altså ${nf(m, 2)} prosentpoeng.`, `$1.96\\sqrt{\\dfrac{${mf(p)} \\cdot ${mf(1 - p)}}{${n}}} = ${mf(m / 100, 4)}$, i.e. ${nf(m, 2)} percentage points.`)]; },
 () => { const xb = R.p([50, 120, 250, 500]), s = R.p([5, 10, 20, 30]), n = R.p([25, 36, 64, 100]), m = 1.96 * s / Math.sqrt(n), up = xb + m;
   return [T(`$\\bar x = ${xb}$, $\\sigma = ${s}$ og $n = ${n}$. Hva er øvre grense i et 95 % konfidensintervall?`, `$\\bar x = ${xb}$, $\\sigma = ${s}$ and $n = ${n}$. What is the upper limit of a 95 % confidence interval?`), { n: up, tol: 0.01, u: "" },
     T(`$${xb} + 1{,}96\\cdot\\dfrac{${s}}{\\sqrt{${n}}} = ${xb} + ${mf(m, 3)} = ${mf(up, 3)}$.`, `$${xb} + 1.96\\cdot\\dfrac{${s}}{\\sqrt{${n}}} = ${xb} + ${mf(m, 3)} = ${mf(up, 3)}$.`)]; }
);
SHAREUNIT("OSTAT", "VGS2", "Hypotesetesting", "Matematikk S2", "Mathematics S2");

// ================= SAMFUNNSØKONOMI =================
const E_TE = ADDUNIT("OSAM", "Tilbud og etterspørsel", "Supply and demand");
TH("OSAM", E_TE, `## Hva handler det om?
I et marked bestemmes pris og mengde av tilbud og etterspørsel. Der kurvene krysser, er markedet i **likevekt**.

## Begreper og formler
- **Etterspørselskurven** heller nedover: høyere pris gir lavere etterspurt mengde.
- **Tilbudskurven** heller oppover: høyere pris gjør det lønnsomt å produsere mer.
- **Likevekt**: tilbudt mengde = etterspurt mengde. Løs $x_T(p) = x_E(p)$.
- Forskyvninger: økt inntekt eller populære trender flytter etterspørselen ut; billigere råvarer flytter tilbudet ut.
- **Konsumentoverskudd**: forskjellen mellom hva kundene er villige til å betale og hva de betaler. **Produsentoverskudd** tilsvarende for selgerne.
- **Makspris** under likevekt gir mangel (køer). **Minstepris** over likevekt gir overskudd.

### Eksempel
$x_E = 100 - 2p$ og $x_T = 20 + 2p$. Likevekt: $100 - 2p = 20 + 2p$ gir $p = 20$ og $x = 60$.

> Høyere etterspørsel → høyere pris og større mengde. Høyere tilbud → lavere pris og større mengde.`,
`## What is it about?
In a market, price and quantity are determined by supply and demand. Where the curves cross, the market is in **equilibrium**.

## Concepts and formulas
- The **demand curve** slopes downwards: a higher price gives a lower quantity demanded.
- The **supply curve** slopes upwards: a higher price makes it profitable to produce more.
- **Equilibrium**: quantity supplied = quantity demanded. Solve $x_S(p) = x_D(p)$.
- Shifts: higher income or popular trends shift demand out; cheaper inputs shift supply out.
- **Consumer surplus**: the difference between what customers are willing to pay and what they pay. **Producer surplus** likewise for sellers.
- A **price ceiling** below equilibrium gives shortage (queues). A **price floor** above equilibrium gives surplus.

### Example
$x_D = 100 - 2p$ and $x_S = 20 + 2p$. Equilibrium: $100 - 2p = 20 + 2p$ gives $p = 20$ and $x = 60$.

> Higher demand → higher price and larger quantity. Higher supply → lower price and larger quantity.`);
BIQ("OSAM", E_TE, [
 ["Hva skjer med likevektsprisen når etterspørselen øker?", ["Den øker", "Den synker", "Den er uendret", "Den blir null"], "Etterspørselskurven flytter seg utover.", "What happens to the equilibrium price when demand increases?", ["It rises", "It falls", "It is unchanged", "It becomes zero"], "The demand curve shifts outwards."],
 ["En makspris settes under likevektsprisen. Hva skjer?", ["Mangel: flere vil kjøpe enn det som tilbys", "Overskudd av varer", "Ingenting", "Prisen stiger"], "Klassisk eksempel: husleieregulering gir boligmangel.", "A price ceiling is set below the equilibrium price. What happens?", ["Shortage: more want to buy than is offered", "A surplus of goods", "Nothing", "The price rises"], "Classic example: rent control causes housing shortages."],
 ["$x_E = 120 - 3p$ og $x_T = 2p + 20$. Hva er likevektsprisen?", { n: 20, tol: 0, u: "kr" }, "$120 - 3p = 2p + 20$ gir $5p = 100$, $p = 20$.", "$x_D = 120 - 3p$ and $x_S = 2p + 20$. What is the equilibrium price?", null, "$120 - 3p = 2p + 20$ gives $5p = 100$, $p = 20$."]
]);
GEN("OSAM", E_TE,
 () => { const b = R.p([1, 2, 3, 4]), d = R.p([1, 2, 3]), p = R.p([10, 15, 20, 25, 30]), c = R.p([0, 10, 20]), a = c + (b + d) * p, x = a - b * p;
   return [T(`Etterspørsel $x_E = ${a} - ${b}p$ og tilbud $x_T = ${c ? c + " + " : ""}${d === 1 ? "" : d}p$. Hva er likevektsmengden?`, `Demand $x_D = ${a} - ${b}p$ and supply $x_S = ${c ? c + " + " : ""}${d === 1 ? "" : d}p$. What is the equilibrium quantity?`), { n: x, tol: 0, u: "" },
     T(`$${a} - ${b}p = ${c ? c + " + " : ""}${d === 1 ? "" : d}p$ gir $p = ${p}$. Mengde: $${a} - ${b} \\cdot ${p} = ${x}$.`, `$${a} - ${b}p = ${c ? c + " + " : ""}${d === 1 ? "" : d}p$ gives $p = ${p}$. Quantity: $${a} - ${b} \\cdot ${p} = ${x}$.`)]; }
);
const E_MF = ADDUNIT("OSAM", "Markedsformer og konkurranse", "Market structures and competition");
TH("OSAM", E_MF, `## Hva handler det om?
Hvor mange bedrifter som konkurrerer, avgjør hvor høy pris de kan ta. Samfunnsøkonomer skiller mellom fullkommen konkurranse, monopol og alt imellom.

## Begreper og formler
- **Fullkommen konkurranse**: mange små bedrifter, like varer. Pris = grensekostnad. Ingen kan påvirke prisen.
- **Monopol**: én selger. Velger mengden der grenseinntekt = grensekostnad og tar høyere pris. Gir et **effektivitetstap** for samfunnet.
- **Oligopol**: få store aktører (for eksempel dagligvarekjedene). Strategisk samspill.
- **Monopolistisk konkurranse**: mange bedrifter med litt ulike varer (frisører, kafeer).
- Konkurransetilsynet passer på at bedrifter ikke samarbeider om priser (kartell).

> Mer konkurranse → lavere priser og mer effektiv ressursbruk.`,
`## What is it about?
How many firms compete decides how high a price they can charge. Economists distinguish between perfect competition, monopoly and everything in between.

## Concepts and formulas
- **Perfect competition**: many small firms, identical goods. Price = marginal cost. Nobody can influence the price.
- **Monopoly**: one seller. Chooses the quantity where marginal revenue = marginal cost and charges a higher price. Causes a **deadweight loss** to society.
- **Oligopoly**: a few large players (for example the grocery chains). Strategic interaction.
- **Monopolistic competition**: many firms with slightly different goods (hairdressers, cafés).
- The Competition Authority makes sure firms do not collude on prices (cartels).

> More competition → lower prices and more efficient use of resources.`);
BIQ("OSAM", E_MF, [
 ["Hva kjennetegner fullkommen konkurranse?", ["Mange små aktører og pris lik grensekostnad", "Én selger", "Få store selgere", "Ingen kjøpere"], "Ingen enkeltbedrift kan påvirke prisen.", "What characterises perfect competition?", ["Many small players and price equal to marginal cost", "One seller", "A few large sellers", "No buyers"], "No single firm can influence the price."],
 ["Hvorfor gir monopol et effektivitetstap?", ["Monopolisten produserer mindre og tar høyere pris enn det som er samfunnsøkonomisk best", "Monopolisten produserer for mye", "Staten tar all fortjenesten", "Det gir det ikke"], "Noen handler som hadde vært lønnsomme for samfunnet, blir ikke gjennomført.", "Why does a monopoly cause a deadweight loss?", ["The monopolist produces less and charges more than is socially optimal", "The monopolist produces too much", "The state takes all the profit", "It doesn't"], "Some trades that would benefit society do not happen."],
 ["De norske dagligvarekjedene er et eksempel på …", ["oligopol", "fullkommen konkurranse", "monopol", "planøkonomi"], "Tre store aktører dominerer markedet.", "The Norwegian grocery chains are an example of …", ["oligopoly", "perfect competition", "monopoly", "planned economy"], "Three large players dominate the market."]
]);
const E_MAK = ADDUNIT("OSAM", "Makroøkonomi: BNP, inflasjon og rente", "Macroeconomics: GDP, inflation and interest rates");
TH("OSAM", E_MAK, `## Hva handler det om?
Makroøkonomi ser på hele økonomien: hvor mye som produseres (BNP), hvor fort prisene stiger (inflasjon), og hvordan Norges Bank bruker renten til å styre.

## Begreper og formler
- **BNP** (bruttonasjonalprodukt): verdien av alt som produseres i landet på et år.
- **Realvekst** tar hensyn til prisøkningen: $\\text{realvekst} \\approx \\text{nominell vekst} - \\text{inflasjon}$.
- **Inflasjon** måles med konsumprisindeksen (KPI): $\\text{inflasjon} = \\dfrac{\\text{KPI}_{\\text{ny}} - \\text{KPI}_{\\text{gammel}}}{\\text{KPI}_{\\text{gammel}}}$.
- **Reallønn**: lønnsvekst minus prisvekst.
- **Pengepolitikk**: Norges Bank setter **styringsrenten**. Høyere rente demper etterspørselen og inflasjonen. Inflasjonsmålet er 2 %.
- **Finanspolitikk**: statens bruk av skatter og utgifter (statsbudsjettet, handlingsregelen for oljefondet).
- **Arbeidsledighet**: andelen av arbeidsstyrken som ønsker jobb, men ikke har.

> Høy inflasjon → Norges Bank hever renten. Lav aktivitet → renten settes ned.`,
`## What is it about?
Macroeconomics looks at the whole economy: how much is produced (GDP), how fast prices rise (inflation), and how the central bank uses the interest rate to steer.

## Concepts and formulas
- **GDP** (gross domestic product): the value of everything produced in the country in a year.
- **Real growth** accounts for price increases: $\\text{real growth} \\approx \\text{nominal growth} - \\text{inflation}$.
- **Inflation** is measured with the consumer price index (CPI): $\\text{inflation} = \\dfrac{\\text{CPI}_{\\text{new}} - \\text{CPI}_{\\text{old}}}{\\text{CPI}_{\\text{old}}}$.
- **Real wage**: wage growth minus price growth.
- **Monetary policy**: Norges Bank sets the **policy rate**. A higher rate dampens demand and inflation. The inflation target is 2 %.
- **Fiscal policy**: the state's use of taxes and spending (the national budget, the fiscal rule for the oil fund).
- **Unemployment**: the share of the labour force who want work but do not have it.

> High inflation → the central bank raises the rate. Low activity → the rate is cut.`);
BIQ("OSAM", E_MAK, [
 ["KPI stiger fra 120 til 126. Hva er inflasjonen?", { n: 5, tol: 0, u: "%" }, "$\\dfrac{126 - 120}{120} = 0{,}05 = 5$ %.", "The CPI rises from 120 to 126. What is the inflation?", null, "$\\dfrac{126 - 120}{120} = 0.05 = 5$ %."],
 ["Lønnen øker med 4 % og prisene med 5 %. Hva skjer med reallønnen?", ["Den synker med omtrent 1 %", "Den øker med 9 %", "Den øker med 1 %", "Den er uendret"], "Reallønn ≈ lønnsvekst − prisvekst $= 4 - 5 = -1$ %.", "Wages rise by 4 % and prices by 5 %. What happens to the real wage?", ["It falls by about 1 %", "It rises by 9 %", "It rises by 1 %", "It is unchanged"], "Real wage ≈ wage growth − price growth $= 4 - 5 = -1$ %."],
 ["Hva gjør Norges Bank vanligvis når inflasjonen er høy?", ["Hever styringsrenten", "Senker styringsrenten", "Trykker flere penger", "Senker skattene"], "Høyere rente gjør lån dyrere og demper etterspørselen.", "What does Norges Bank usually do when inflation is high?", ["Raises the policy rate", "Cuts the policy rate", "Prints more money", "Cuts taxes"], "A higher rate makes loans more expensive and dampens demand."],
 ["Hva er inflasjonsmålet til Norges Bank?", { n: 2, tol: 0, u: "%" }, "Målet er en årlig prisvekst på om lag 2 % over tid.", "What is Norges Bank's inflation target?", null, "The target is annual price growth of about 2 % over time."]
]);
GEN("OSAM", E_MAK,
 () => { const k0 = R.p([100, 110, 118, 125, 130]), inf = R.p([1.5, 2, 2.5, 3, 4, 5, 6]), k1 = Math.round(k0 * (1 + inf / 100) * 10) / 10, r = (k1 - k0) / k0 * 100;
   return [T(`KPI var ${nf(k0, 1)} i fjor og er ${nf(k1, 1)} i år. Hva er inflasjonen?`, `The CPI was ${nf(k0, 1)} last year and is ${nf(k1, 1)} this year. What is the inflation?`), { n: r, tol: 0.05, u: "%" },
     T(`$\\dfrac{${mf(k1, 1)} - ${mf(k0, 1)}}{${mf(k0, 1)}} = ${mf(r, 2)}$ %.`, `$\\dfrac{${mf(k1, 1)} - ${mf(k0, 1)}}{${mf(k0, 1)}} = ${mf(r, 2)}$ %.`)]; },
 () => { const w = R.p([2.5, 3, 4, 5, 5.5]), inf = R.p([1.5, 2, 3, 4.5, 6]), real = ((1 + w / 100) / (1 + inf / 100) - 1) * 100;
   return [T(`Lønnen stiger ${nf(w)} % og prisene ${nf(inf)} %. Hva er reallønnsveksten (eksakt)?`, `Wages rise ${nf(w)} % and prices ${nf(inf)} %. What is the real wage growth (exact)?`), { n: real, tol: 0.02, u: "%" },
     T(`$\\dfrac{${mf(1 + w / 100, 3)}}{${mf(1 + inf / 100, 3)}} - 1 = ${mf(real, 2)}$ % (tilnærmet ${nf(w - inf, 1)} %).`, `$\\dfrac{${mf(1 + w / 100, 3)}}{${mf(1 + inf / 100, 3)}} - 1 = ${mf(real, 2)}$ % (approximately ${nf(w - inf, 1)} %).`)]; }
);
const E_UT = ADDUNIT("OSAM", "Utenrikshandel og valuta", "Trade and exchange rates");
TH("OSAM", E_UT, `## Hva handler det om?
Norge er en liten, åpen økonomi som eksporterer olje, gass og fisk og importerer mye av det vi bruker. Kronekursen påvirker både priser og hvor konkurransedyktig næringslivet er.

## Begreper og formler
- **Komparative fortrinn**: land tjener på å spesialisere seg i det de er *relativt* best på og handle med resten.
- **Valutakurs**: prisen på én utenlandsk enhet i kroner, for eksempel 11,50 kr per euro.
- **Svak krone** (flere kroner per euro): import blir dyrere, eksport blir billigere for utlandet. Kan gi høyere inflasjon.
- **Sterk krone**: billigere import, vanskeligere for eksportbedrifter.
- **Handelsbalanse**: eksport minus import av varer.
- Omregning: beløp i euro $\\cdot$ kurs = beløp i kroner.

> Svak krone: bra for eksport og turisme til Norge, dyrere ferie i utlandet.`,
`## What is it about?
Norway is a small open economy that exports oil, gas and fish and imports much of what we use. The krone exchange rate affects both prices and how competitive businesses are.

## Concepts and formulas
- **Comparative advantage**: countries gain from specialising in what they are *relatively* best at and trading for the rest.
- **Exchange rate**: the price of one foreign unit in kroner, for example 11.50 NOK per euro.
- **Weak krone** (more kroner per euro): imports become more expensive, exports cheaper for foreigners. Can cause higher inflation.
- **Strong krone**: cheaper imports, harder for exporters.
- **Trade balance**: exports minus imports of goods.
- Conversion: amount in euros $\\cdot$ rate = amount in kroner.

> Weak krone: good for exports and tourism to Norway, more expensive holidays abroad.`);
BIQ("OSAM", E_UT, [
 ["Kursen går fra 10 til 12 kr per euro. Hva har skjedd med kronen?", ["Den har svekket seg", "Den har styrket seg", "Ingenting", "Den er avskaffet"], "Du må betale flere kroner for én euro.", "The rate goes from 10 to 12 NOK per euro. What has happened to the krone?", ["It has weakened", "It has strengthened", "Nothing", "It has been abolished"], "You must pay more kroner for one euro."],
 ["Hvem tjener på en svak krone?", ["Eksportbedrifter", "Nordmenn på ferie i utlandet", "Importører", "Ingen"], "Norske varer blir billigere for utenlandske kjøpere.", "Who benefits from a weak krone?", ["Exporters", "Norwegians on holiday abroad", "Importers", "Nobody"], "Norwegian goods become cheaper for foreign buyers."],
 ["En jakke koster 150 euro. Kursen er 11,5. Hva koster den i kroner?", { n: 1725, tol: 0, u: "kr" }, "$150 \\cdot 11{,}5 = 1725$ kr.", "A jacket costs 150 euros. The rate is 11.5. What does it cost in kroner?", null, "$150 \\cdot 11.5 = 1725$ NOK."]
]);
GEN("OSAM", E_UT,
 () => { const [cur, en, rate] = R.p([["euro", "euros", R.p([10.8, 11.2, 11.5, 11.9])], ["dollar", "dollars", R.p([9.8, 10.4, 10.9, 11.3])], ["svenske kroner", "Swedish kronor", R.p([0.95, 0.98, 1.02])]]), amt = R.p([20, 50, 120, 250, 800, 1500]), nok = amt * rate;
   return [T(`Hva koster ${amt} ${cur} i norske kroner når kursen er ${nf(rate, 2)}?`, `What do ${amt} ${en} cost in Norwegian kroner when the rate is ${nf(rate, 2)}?`), { n: nok, tol: 0.01, u: "kr" },
     T(`$${amt} \\cdot ${mf(rate, 2)} = ${mf(nok, 2)}$ kr.`, `$${amt} \\cdot ${mf(rate, 2)} = ${mf(nok, 2)}$ NOK.`)]; }
);
})();
