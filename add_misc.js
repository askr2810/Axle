// ============================================================
//  add_misc.js – teori, faste oppgaver og generatorer for
//  OKON (Ingeniørøkonomi), PROD (Produktutvikling) og
//  STKD6610 (Teknologi, etikk og bærekraft)
// ============================================================
(() => {

// tallformatering for FASTE (statiske) oppgaver, uavhengig av LANG ved innlasting
const nbnum = (x, d = 0) => x.toLocaleString("nb-NO", { minimumFractionDigits: d, maximumFractionDigits: d });
const ennum = (x, d = 0) => x.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

// ================= OKON – enhet 0: Rente og tidsverdi =================
THEORY("OKON", 0, {
nb: `## Hva handler det om?
Penger har en tidsverdi: 100 kr i dag er verdt mer enn 100 kr om et år, fordi beløpet kan forrentes i mellomtiden. Dette er selve grunnlaget for ingeniørøkonomi: skal du sammenligne to investeringer, et lån eller en sparing som strekker seg over flere år, må du regne alle beløp om til samme tidspunkt før du kan sammenligne dem direkte. Verktøyet for det er rentesregning – sluttverdi når du regner fremover i tid, og nåverdi (diskontering) når du regner bakover.

## Begreper og formler
- Sluttverdi (fremtidig verdi) av et beløp $P$ etter $n$ år med årlig rente $r$: $F = P(1+r)^n$.
- Nåverdi av et beløp $F$ som kommer om $n$ år: $P = F/(1+r)^n$. Å regne om et fremtidig beløp til nåverdi kalles diskontering, og $r$ kalles da kalkulasjonsrenten.
- Rentes rente betyr at renten i en periode også beregnes av tidligere opptjente renter, ikke bare av det opprinnelige beløpet. Det gir eksponentiell vekst.
- Nominell rente er den oppgitte årlige renten. Effektiv rente er den faktiske årlige renten når man tar hensyn til hvor ofte renten legges til (rentes rente) og eventuelle gebyrer: med månedlig forrentning av nominell rente $r$ blir effektiv rente $(1 + r/12)^{12} - 1$.
- Realrente er renten justert for inflasjon: $(1 + r_{real}) = (1 + r_{nom})/(1 + i)$, der $i$ er inflasjonen. Realrenten forteller hvor mye kjøpekraften din faktisk vokser.
- Tommelfingerregelen om 72: et beløp dobles på omtrent $72/r_{\\%}$ år.

## Slik løser du oppgavene
1. Avgjør om du skal fremover i tid (sluttverdi) eller bakover (nåverdi).
2. Sjekk om renten er nominell eller effektiv, og om den forrentes oftere enn årlig. Regn eventuelt om til effektiv årsrente først.
3. Sett inn i riktig formel og regn ut.
4. Hvis oppgaven handler om kjøpekraft over tid, bruk realrenten i stedet for den nominelle.

### Eksempel
Du setter inn 50 000 kr til 6 % nominell rente med månedlig forrentning. Hvor mye har du etter 4 år, i dagens kjøpekraft, hvis inflasjonen er 3 % per år?
1. Sluttverdi (nominelle kroner): $F = 50\\,000\\cdot(1 + 0{,}06/12)^{12\\cdot 4} \\approx 63\\,524$ kr.
2. Realverdien i dagens kroner: $P = F/(1+i)^n = 63\\,524/1{,}03^{4} \\approx 56\\,441$ kr.

Svar: omtrent 56 441 kr i dagens kjøpekraft, selv om kontoen viser 63 524 kr.

## Vanlige feil
- Å blande nominell og effektiv rente uten å regne om.
- Å bruke nominell rente når oppgaven egentlig spør om kjøpekraft (da skal realrenten brukes).
- Å glemme å regne om måneder/år konsekvent i eksponenten.
- Å tro at rentes rente bare betyr «litt mer rente» – over lang tid er forskjellen fra enkel rente stor.

> Fremover i tid: gang med $(1+r)^n$. Bakover i tid: del på $(1+r)^n$. Spør oppgaven etter kjøpekraft, bruk realrenten.`,
en: `## What is it about?
Money has a time value: 100 NOK today is worth more than 100 NOK in a year, because the amount can earn interest in the meantime. This is the foundation of engineering economics: to compare two investments, a loan or savings spread over several years, you must convert every amount to the same point in time before comparing them directly. The tool for that is interest calculation – future value when you move forward in time, and present value (discounting) when you move backward.

## Concepts and formulas
- Future value of an amount $P$ after $n$ years at annual interest rate $r$: $F = P(1+r)^n$.
- Present value of an amount $F$ received in $n$ years: $P = F/(1+r)^n$. Converting a future amount to present value is called discounting, and $r$ is then called the discount rate.
- Compound interest means that the interest in a period is also calculated on interest already earned, not just on the original amount. That gives exponential growth.
- The nominal rate is the stated annual rate. The effective rate is the actual annual rate once you account for how often interest is added (compounding) and any fees: with monthly compounding of a nominal rate $r$, the effective rate is $(1 + r/12)^{12} - 1$.
- The real interest rate is the rate adjusted for inflation: $(1 + r_{real}) = (1 + r_{nom})/(1 + i)$, where $i$ is inflation. The real rate tells you how much your purchasing power actually grows.
- Rule of 72: an amount doubles in about $72/r_{\\%}$ years.

## How to solve the problems
1. Decide whether you are moving forward in time (future value) or backward (present value).
2. Check whether the rate is nominal or effective, and whether it compounds more often than annually. Convert to an effective annual rate first if needed.
3. Insert into the right formula and calculate.
4. If the problem is about purchasing power over time, use the real rate instead of the nominal rate.

### Example
You deposit 50,000 NOK at a nominal rate of 6% with monthly compounding. How much do you have after 4 years, in today's purchasing power, if inflation is 3% per year?
1. Future value (nominal NOK): $F = 50{,}000\\cdot(1 + 0.06/12)^{12\\cdot 4} \\approx 63{,}524$ NOK.
2. The real value in today's money: $P = F/(1+i)^n = 63{,}524/1.03^{4} \\approx 56{,}441$ NOK.

Answer: about 56,441 NOK in today's purchasing power, even though the account shows 63,524 NOK.

## Common mistakes
- Mixing nominal and effective rates without converting.
- Using the nominal rate when the problem is really about purchasing power (then the real rate should be used).
- Forgetting to keep months/years consistent in the exponent.
- Thinking compound interest is only "a little extra" – over a long time the difference from simple interest is large.

> Forward in time: multiply by $(1+r)^n$. Backward in time: divide by $(1+r)^n$. If the question asks about purchasing power, use the real rate.`
});

const _o0rr = (1.06 / 1.025) - 1, _o0P = 200000 / Math.pow(1 + _o0rr, 8);
BIQ("OKON", 0, [
 ["Hva er sluttverdien (fremtidig verdi) av et beløp $P$ om $n$ år med årlig rente $r$?",
  ["$P(1+r)^n$", "$P(1+r)/n$", "$P + Prn$", "$P/(1+r)^n$"],
  "Sluttverdien fås ved å gange med rentefaktoren $n$ ganger: $F = P(1+r)^n$. Det siste alternativet er formelen for nåverdi, ikke sluttverdi.",
  "What is the future value of an amount $P$ after $n$ years at annual interest rate $r$?",
  ["$P(1+r)^n$", "$P(1+r)/n$", "$P + Prn$", "$P/(1+r)^n$"],
  "The future value is found by multiplying by the interest factor $n$ times: $F = P(1+r)^n$. The last option is the present-value formula, not the future-value formula."],
 ["Hva skjer med nåverdien av et fast fremtidig beløp $F$ hvis kalkulasjonsrenten $r$ økes, alt annet likt?",
  ["Nåverdien synker", "Nåverdien øker", "Nåverdien er uendret", "Det kommer an på om $F$ er positivt eller negativt"],
  "$P = F/(1+r)^n$: når $r$ øker, blir nevneren større, så $P$ blir mindre. Et høyt avkastningskrav straffer fremtidige beløp hardere.",
  "What happens to the present value of a fixed future amount $F$ if the discount rate $r$ is increased, all else equal?",
  ["The present value decreases", "The present value increases", "The present value is unchanged", "It depends on whether $F$ is positive or negative"],
  "$P = F/(1+r)^n$: as $r$ increases, the denominator grows, so $P$ becomes smaller. A high required return discounts future amounts more heavily."],
 ["To sparekonti har samme nominelle rente. Konto A forrentes månedlig, konto B forrentes årlig. Hvilken konto gir høyest effektiv rente?",
  ["Konto A", "Konto B", "De gir alltid nøyaktig samme effektive rente", "Det kommer an på beløpets størrelse"],
  "Jo oftere renten legges til, desto mer renter regnes det renter av i løpet av året, så effektiv rente øker med forrentningsfrekvensen: $(1+r/12)^{12} - 1 > r$.",
  "Two savings accounts have the same nominal interest rate. Account A compounds monthly, account B compounds annually. Which account gives the higher effective interest rate?",
  ["Account A", "Account B", "They always give exactly the same effective rate", "It depends on the size of the amount"],
  "The more often interest is added, the more interest is earned on interest during the year, so the effective rate increases with the compounding frequency: $(1+r/12)^{12} - 1 > r$."],
 ["Du ønsker at sparepengene dine skal tilsvare en kjøpekraft på 200 000 kr (dagens pengeverdi) om 8 år. Nominell rente er 6 % og forventet inflasjon er 2,5 % per år. Hvor mye må du sette inn i dag?",
  { n: _o0P, tol: rel(_o0P), u: "kr" },
  `Realrenten er $(1{,}06/1{,}025) - 1 \\approx 0{,}0341$, altså 3,41 %. Nåverdien med realrenten er $P = 200\\,000/1{,}0341^{8} \\approx ${nbnum(Math.round(_o0P))}$ kr.`,
  "You want your savings to correspond to a purchasing power of 200,000 NOK (today's money) in 8 years. The nominal interest rate is 6% and expected inflation is 2.5% per year. How much must you deposit today?",
  null,
  `The real rate is $(1.06/1.025) - 1 \\approx 0.0341$, i.e. 3.41%. The present value using the real rate is $P = 200{,}000/1.0341^{8} \\approx ${ennum(Math.round(_o0P))}$ NOK.`]
]);

GEN("OKON", 0,
 // enkel: hvor lang tid tar det å vokse fra P til et gitt mål F
 () => { const P = R.p([5000, 10000, 20000, 50000, 100000]), r = R.p([0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1]), mult = R.f(1.3, 3, 0.1);
   const F = P * mult, yrs = Math.log(mult) / Math.log(1 + r);
   return [T(`Du setter inn ${nf(P)} kr til ${nf(r * 100)} % årlig rente. Hvor mange år tar det før beløpet har vokst til ${nf(F, 0)} kr?`,
             `You deposit ${nf(P)} NOK at ${nf(r * 100)}% annual interest. How many years does it take for the amount to grow to ${nf(F, 0)} NOK?`),
     { n: yrs, tol: 0.05, u: "år" },
     T(`Løs $P(1+r)^n = F$ for $n$: $n = \\dfrac{\\ln(F/P)}{\\ln(1+r)} = \\dfrac{\\ln ${mf(mult, 3)}}{\\ln ${mf(1 + r)}} \\approx ${mf(yrs, 2)}$ år.`,
       `Solve $P(1+r)^n = F$ for $n$: $n = \\dfrac{\\ln(F/P)}{\\ln(1+r)} = \\dfrac{\\ln ${mf(mult, 3)}}{\\ln ${mf(1 + r)}} \\approx ${mf(yrs, 2)}$ years.`)]; },
 // middels: finn nominell rente som gir en gitt effektiv rente (månedlig forrentning)
 () => { const reff = R.f(0.03, 0.12, 0.005); const rnom = 12 * (Math.pow(1 + reff, 1 / 12) - 1) * 100;
   return [T(`Du ønsker en effektiv årsrente på ${nf(reff * 100)} % med månedlig forrentning. Hvilken nominell årsrente tilsvarer det?`,
             `You want an effective annual rate of ${nf(reff * 100)}% with monthly compounding. What nominal annual rate does that correspond to?`),
     { n: rnom, tol: 0.02, u: "%" },
     T(`Løs $(1+r_{nom}/12)^{12} = 1+r_{eff}$ for $r_{nom}$: $r_{nom} = 12\\big((1+r_{eff})^{1/12}-1\\big) = 12\\big(${mf(1 + reff)}^{1/12}-1\\big) \\approx ${mf(rnom, 3)}$ %.`,
       `Solve $(1+r_{nom}/12)^{12} = 1+r_{eff}$ for $r_{nom}$: $r_{nom} = 12\\big((1+r_{eff})^{1/12}-1\\big) = 12\\big(${mf(1 + reff)}^{1/12}-1\\big) \\approx ${mf(rnom, 3)}$ %.`)]; },
 // eksamen: sparing med nominell rente og månedlig forrentning, deflatert med inflasjon
 () => { const P = R.p([20000, 30000, 50000, 80000, 100000]), rnom = R.p([0.03, 0.04, 0.05, 0.06, 0.07]), yrs = R.i(3, 15), infl = R.p([0.02, 0.025, 0.03, 0.035, 0.04]);
   const Fnom = P * Math.pow(1 + rnom / 12, 12 * yrs), Freal = Fnom / Math.pow(1 + infl, yrs);
   return [T(`Du setter inn ${nf(P)} kr til ${nf(rnom * 100)} % nominell rente med månedlig forrentning, i ${yrs} år. Inflasjonen forventes å være ${nf(infl * 100)} % per år. Hvor mye er beløpet verdt i dagens kjøpekraft når de ${yrs} årene er gått?`,
             `You deposit ${nf(P)} NOK at a nominal rate of ${nf(rnom * 100)}% with monthly compounding, for ${yrs} years. Inflation is expected to be ${nf(infl * 100)}% per year. What is the amount worth in today's purchasing power after the ${yrs} years?`),
     { n: Freal, tol: rel(Freal), u: "kr" },
     T(`Sluttverdi i nominelle kroner: $F = ${nf(P)}(1+${mf(rnom)}/12)^{12\\cdot ${yrs}} \\approx ${nf(Fnom, 0)}$ kr. Justert for inflasjon: $P_{reell} = F/(1+i)^n = ${nf(Fnom, 0)}/${mf(1 + infl)}^{${yrs}} \\approx ${nf(Freal, 0)}$ kr.`,
       `Future value in nominal kroner: $F = ${nf(P)}(1+${mf(rnom)}/12)^{12\\cdot ${yrs}} \\approx ${nf(Fnom, 0)}$ NOK. Adjusted for inflation: $P_{real} = F/(1+i)^n = ${nf(Fnom, 0)}/${mf(1 + infl)}^{${yrs}} \\approx ${nf(Freal, 0)}$ NOK.`)]; }
);

// ================= OKON – enhet 1: Investeringsanalyse =================
THEORY("OKON", 1, {
nb: `## Hva handler det om?
Investeringsanalyse handler om å avgjøre om et prosjekt er lønnsomt nok til å gjennomføres, og å sammenligne lånealternativer. Fordi utbetalinger og innbetalinger skjer på ulike tidspunkt, kan du ikke bare summere kronebeløpene – du må diskontere alle kontantstrømmer til samme tidspunkt (vanligvis i dag) med en kalkulasjonsrente som gjenspeiler avkastningskravet og risikoen. De tre viktigste metodene er netto nåverdi (NPV), internrente (IRR) og tilbakebetalingstid.

## Begreper og formler
- Netto nåverdi: $NPV = -I_0 + \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t}$, der $I_0$ er investeringen og $CF_t$ kontantstrømmen i år $t$. Lønnsomt hvis $NPV > 0$.
- Når kontantstrømmen er like stor $A$ hvert år, kan summen skrives med annuitetsfaktoren: $NPV = -I_0 + A\\cdot\\dfrac{1-(1+r)^{-n}}{r}$.
- Internrente (IRR): den kalkulasjonsrenten som gir $NPV = 0$. Lønnsomt hvis IRR er høyere enn avkastningskravet.
- Enkel tilbakebetalingstid: $I_0$ delt på årlig innsparing/kontantstrøm. Enkel å forstå, men ignorerer tidsverdien og alt som skjer etter tilbakebetalingstiden.
- Annuitetslån: like store terminbeløp $A = P\\cdot\\dfrac{r}{1-(1+r)^{-n}}$ hvert år (rente + avdrag).
- Serielån: like store avdrag, så terminbeløpet – og de totale rentene – blir lavere enn for et annuitetslån med samme rente og løpetid.
- Kalkulasjonsrenten settes gjerne høyere enn bankrenten for å ta hensyn til risiko og alternativ avkastning (hva pengene ellers kunne gitt).

## Slik løser du oppgavene
1. List opp investeringen $I_0$ og kontantstrømmene $CF_t$ år for år, med fortegn (utbetaling negativ, innbetaling positiv).
2. Er kontantstrømmen lik hvert år? Bruk annuitetsfaktoren. Er den ulik? Diskonter hvert år for seg og summer.
3. Sammenlign $NPV$ med null, eller finn $IRR$ og sammenlign med avkastningskravet.
4. Husk at tilbakebetalingstiden bare er et grovt tilleggsmål, ikke en erstatning for NPV/IRR.

### Eksempel
En maskin koster 400 000 kr og sparer 90 000 kr i året i 6 år. Kalkulasjonsrenten er 8 %. Er investeringen lønnsom?
1. Annuitetsfaktor: $\\dfrac{1-1{,}08^{-6}}{0{,}08} \\approx 4{,}623$.
2. $NPV = -400\\,000 + 90\\,000\\cdot 4{,}623 \\approx 16\\,059$ kr.

Svar: $NPV > 0$, så investeringen er lønnsom.

## Vanlige feil
- Å bruke annuitetsfaktoren når kontantstrømmene faktisk er ulike fra år til år.
- Å blande kalkulasjonsrente og bankrente – kalkulasjonsrenten skal reflektere risikoen i akkurat dette prosjektet.
- Å konkludere ut fra tilbakebetalingstid alene og se bort fra kontantstrømmer etter den.
- Å glemme at investeringen $I_0$ skal være negativ (en utbetaling) i NPV-formelen.

> $NPV > 0$ eller $IRR >$ avkastningskravet betyr lønnsomt. Ulike kontantstrømmer: diskonter hvert år for seg – bruk aldri annuitetsfaktoren da.`,
en: `## What is it about?
Investment analysis is about deciding whether a project is profitable enough to carry out, and about comparing loan alternatives. Because payments and receipts occur at different times, you cannot simply add up the amounts – you must discount every cash flow to the same point in time (usually today) using a discount rate that reflects the required return and the risk. The three main methods are net present value (NPV), internal rate of return (IRR) and the payback period.

## Concepts and formulas
- Net present value: $NPV = -I_0 + \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t}$, where $I_0$ is the investment and $CF_t$ the cash flow in year $t$. Profitable if $NPV > 0$.
- When the cash flow is the same amount $A$ every year, the sum can be written with the annuity factor: $NPV = -I_0 + A\\cdot\\dfrac{1-(1+r)^{-n}}{r}$.
- Internal rate of return (IRR): the discount rate that makes $NPV = 0$. Profitable if the IRR is higher than the required return.
- Simple payback period: $I_0$ divided by the annual saving/cash flow. Easy to understand, but ignores the time value of money and everything that happens after the payback period.
- Annuity loan: equal payments each year, $A = P\\cdot\\dfrac{r}{1-(1+r)^{-n}}$ (interest + principal).
- Serial loan: equal principal repayments, so the payment – and the total interest – ends up lower than for an annuity loan with the same rate and term.
- The discount rate is usually set higher than the bank rate to account for risk and alternative returns (what the money could otherwise earn).

## How to solve the problems
1. List the investment $I_0$ and the cash flows $CF_t$ year by year, with signs (payments negative, receipts positive).
2. Is the cash flow the same every year? Use the annuity factor. Is it different? Discount each year separately and add.
3. Compare $NPV$ with zero, or find the $IRR$ and compare it with the required return.
4. Remember that the payback period is only a rough extra measure, not a replacement for NPV/IRR.

### Example
A machine costs 400,000 NOK and saves 90,000 NOK per year for 6 years. The discount rate is 8%. Is the investment profitable?
1. Annuity factor: $\\dfrac{1-1.08^{-6}}{0.08} \\approx 4.623$.
2. $NPV = -400{,}000 + 90{,}000\\cdot 4.623 \\approx 16{,}059$ NOK.

Answer: $NPV > 0$, so the investment is profitable.

## Common mistakes
- Using the annuity factor when the cash flows actually differ from year to year.
- Mixing up the discount rate and the bank rate – the discount rate should reflect the risk of this specific project.
- Concluding from the payback period alone and ignoring cash flows after it.
- Forgetting that the investment $I_0$ must be negative (a payment) in the NPV formula.

> $NPV > 0$ or $IRR >$ required return means profitable. Different cash flows: discount each year separately – never use the annuity factor then.`
});

const _o1I0 = 300000, _o1CF1 = 100000, _o1CF2 = 150000, _o1CF3 = 180000, _o1r = 0.08;
const _o1NPV = -_o1I0 + _o1CF1 / (1 + _o1r) + _o1CF2 / Math.pow(1 + _o1r, 2) + _o1CF3 / Math.pow(1 + _o1r, 3);
BIQ("OKON", 1, [
 ["Hva trenger du for å kunne regne netto nåverdi (NPV) av et prosjekt?",
  ["Investeringsbeløpet, forventede kontantstrømmer i hver periode, og en kalkulasjonsrente", "Bare kalkulasjonsrenten", "Bare investeringsbeløpet", "Fjorårets regnskapstall"],
  "NPV summerer diskonterte kontantstrømmer minus investeringen. Uten kontantstrømmene og en kalkulasjonsrente er det ingenting å diskontere.",
  "What do you need in order to calculate the net present value (NPV) of a project?",
  ["The investment amount, expected cash flows in each period, and a discount rate", "Just the discount rate", "Just the investment amount", "Last year's accounting figures"],
  "NPV sums the discounted cash flows minus the investment. Without the cash flows and a discount rate there is nothing to discount."],
 ["Hva skjer med netto nåverdien til et prosjekt hvis kalkulasjonsrenten økes, alt annet likt?",
  ["Den synker, fordi fremtidige kontantstrømmer diskonteres hardere", "Den øker", "Den er uendret", "Den blir alltid negativ"],
  "Hver ledd $CF_t/(1+r)^t$ blir mindre når $r$ øker, så summen – og dermed NPV – synker.",
  "What happens to a project's net present value if the discount rate is increased, all else equal?",
  ["It decreases, because future cash flows are discounted more heavily", "It increases", "It is unchanged", "It always becomes negative"],
  "Each term $CF_t/(1+r)^t$ becomes smaller as $r$ increases, so the sum – and hence the NPV – decreases."],
 ["Et prosjekt har kontantstrømmer som er ulike fra år til år (ikke like store hvert år). Hvordan finner du riktig netto nåverdi?",
  ["Diskonter hver kontantstrøm for seg og summer: $NPV = -I_0 + \\sum CF_t/(1+r)^t$", "Bruk annuitetsfaktoren på gjennomsnittlig kontantstrøm", "Bruk annuitetsfaktoren på den siste kontantstrømmen", "Legg sammen kontantstrømmene udiskontert og trekk fra investeringen"],
  "Annuitetsfaktoren forutsetter like store kontantstrømmer hvert år. Når de er ulike, må hvert år diskonteres for seg.",
  "A project has cash flows that differ from year to year (not the same amount every year). How do you find the correct net present value?",
  ["Discount each cash flow separately and add them: $NPV = -I_0 + \\sum CF_t/(1+r)^t$", "Apply the annuity factor to the average cash flow", "Apply the annuity factor to the last cash flow", "Add the cash flows without discounting and subtract the investment"],
  "The annuity factor assumes an equal cash flow every year. When they differ, each year must be discounted separately."],
 ["Et prosjekt krever en investering på 300 000 kr. Det gir kontantstrømmer på 100 000 kr etter år 1, 150 000 kr etter år 2 og 180 000 kr etter år 3. Kalkulasjonsrenten er 8 %. Hva er netto nåverdi?",
  { n: _o1NPV, tol: rel(_o1NPV), u: "kr" },
  `Diskonter hvert år for seg: $NPV = -300\\,000 + \\dfrac{100\\,000}{1{,}08} + \\dfrac{150\\,000}{1{,}08^2} + \\dfrac{180\\,000}{1{,}08^3} \\approx ${nbnum(Math.round(_o1NPV))}$ kr.`,
  "A project requires an investment of 300,000 NOK. It generates cash flows of 100,000 NOK after year 1, 150,000 NOK after year 2 and 180,000 NOK after year 3. The discount rate is 8%. What is the net present value?",
  null,
  `Discount each year separately: $NPV = -300{,}000 + \\dfrac{100{,}000}{1.08} + \\dfrac{150{,}000}{1.08^2} + \\dfrac{180{,}000}{1.08^3} \\approx ${ennum(Math.round(_o1NPV))}$ NOK.`]
]);

GEN("OKON", 1,
 // enkel: ett-års internrente
 () => { const I0 = R.p([20000, 50000, 100000, 150000, 200000, 300000]), CF1 = R.f(I0 * 1.02, I0 * 1.5, 500); const irr = (CF1 / I0 - 1) * 100;
   return [T(`Du investerer ${nf(I0)} kr i dag og får ${nf(CF1, 0)} kr tilbake om ett år. Hva er internrenten (avkastningen) på investeringen?`,
             `You invest ${nf(I0)} NOK today and receive ${nf(CF1, 0)} NOK back in one year. What is the internal rate of return on the investment?`),
     { n: irr, tol: rel(irr, 0.01, 0.05), u: "%" },
     T(`For ett år er internrenten rett og slett avkastningen: $r = CF_1/I_0 - 1 = ${nf(CF1, 0)}/${nf(I0)} - 1 \\approx ${mf(irr, 2)}$ %.`,
       `For a single year, the internal rate of return is simply the return: $r = CF_1/I_0 - 1 = ${nf(CF1, 0)}/${nf(I0)} - 1 \\approx ${mf(irr, 2)}$ %.`)]; },
 // middels: minste levetid for at NPV skal bli null eller positiv
 () => { let I0, A, r, yrs; do { I0 = R.p([100000, 150000, 200000, 300000, 400000, 500000]); A = R.f(15000, 120000, 1000); r = R.p([0.05, 0.06, 0.07, 0.08, 0.09, 0.1]); yrs = -Math.log(1 - I0 * r / A) / Math.log(1 + r); } while (!(yrs > 1 && yrs < 40));
   return [T(`En investering på ${nf(I0)} kr gir en årlig kontantstrøm på ${nf(A)} kr, med kalkulasjonsrente ${nf(r * 100)} %. Hvor mange år må prosjektet minst vare for at netto nåverdien skal bli null eller positiv?`,
             `An investment of ${nf(I0)} NOK gives an annual cash flow of ${nf(A)} NOK, with a discount rate of ${nf(r * 100)}%. What is the minimum project lifetime, in years, for the net present value to reach zero or positive?`),
     { n: yrs, tol: 0.05, u: "år" },
     T(`Løs $I_0 = A\\cdot\\dfrac{1-(1+r)^{-n}}{r}$ for $n$: $n = -\\dfrac{\\ln(1 - I_0 r/A)}{\\ln(1+r)} \\approx ${mf(yrs, 2)}$ år.`,
       `Solve $I_0 = A\\cdot\\dfrac{1-(1+r)^{-n}}{r}$ for $n$: $n = -\\dfrac{\\ln(1 - I_0 r/A)}{\\ln(1+r)} \\approx ${mf(yrs, 2)}$ years.`)]; },
 // eksamen: NPV med annuitet og restverdi
 () => { const I0 = R.p([200000, 300000, 400000, 500000, 600000]), A = R.f(30000, 120000, 2000), S = R.p([0, 20000, 40000, 60000, 80000]), r = R.p([0.06, 0.07, 0.08, 0.09, 0.1]), yrs = R.i(5, 15);
   const af = (1 - Math.pow(1 + r, -yrs)) / r, npv = -I0 + A * af + S / Math.pow(1 + r, yrs);
   return [T(`En maskin koster ${nf(I0)} kr og gir en årlig innsparing på ${nf(A)} kr i ${yrs} år. Ved slutten av levetiden har maskinen en restverdi på ${nf(S)} kr. Kalkulasjonsrenten er ${nf(r * 100)} %. Hva er netto nåverdi av investeringen?`,
             `A machine costs ${nf(I0)} NOK and gives an annual saving of ${nf(A)} NOK for ${yrs} years. At the end of its life the machine has a salvage value of ${nf(S)} NOK. The discount rate is ${nf(r * 100)}%. What is the net present value of the investment?`),
     { n: npv, tol: Math.max(Math.abs(npv) * 0.01, 50), u: "kr" },
     T(`Annuitetsfaktor: $\\dfrac{1-(1+r)^{-n}}{r} = ${mf(af, 4)}$. $NPV = -${nf(I0)} + ${nf(A)}\\cdot ${mf(af, 4)} + ${nf(S)}/${mf(1 + r)}^{${yrs}} \\approx ${mf(npv, 0)}$ kr.`,
       `Annuity factor: $\\dfrac{1-(1+r)^{-n}}{r} = ${mf(af, 4)}$. $NPV = -${nf(I0)} + ${nf(A)}\\cdot ${mf(af, 4)} + ${nf(S)}/${mf(1 + r)}^{${yrs}} \\approx ${mf(npv, 0)}$ NOK.`)]; }
);

// ================= OKON – enhet 2: Kostnader og lønnsomhet =================
THEORY("OKON", 2, {
nb: `## Hva handler det om?
Før du kan si om et produkt eller prosjekt er lønnsomt, må du forstå hvordan kostnadene oppfører seg. Noen kostnader er faste uansett hvor mye du produserer, andre er variable og følger produksjonsvolumet. Skillet ligger til grunn for nullpunktsanalyse (break-even), prisdiskusjoner og beslutninger om for eksempel å velge en produksjonsmetode fremfor en annen.

## Begreper og formler
- Faste kostnader $FK$: endres ikke med produsert mengde (husleie, fastlønn, forsikring).
- Variabel kostnad $v$ per enhet: øker proporsjonalt med antall produserte enheter (råvarer, strøm per stk).
- Dekningsbidrag per enhet: $db = p - v$, der $p$ er salgsprisen. Dekningsgraden er $db/p$ (andelen av prisen som blir igjen til å dekke faste kostnader og gi overskudd).
- Nullpunkt (break-even) i antall enheter: $Q_0 = FK/(p - v)$. I omsetning: $Q_0\\cdot p$.
- Ønsket overskudd $Z$: antallet som må selges er $Q = (FK + Z)/(p - v)$ – samme formel som nullpunktet, bare med $Z$ lagt til de faste kostnadene.
- Lineær avskrivning: $(I - \\text{restverdi})/n$ per år, samme beløp hvert år.
- Saldoavskrivning (degressiv avskrivning): bokført verdi reduseres med en fast prosent $d$ hvert år: $V_n = I(1-d)^n$. Gir høyere avskrivning tidlig og lavere sent, i motsetning til lineær avskrivning.
- Alternativkostnad: verdien av det beste alternativet du gir opp. Sunk cost: kostnader som allerede er brukt og ikke kan hentes inn – skal ikke påvirke nye beslutninger.
- Skalafordeler: kostnaden per enhet synker når volumet øker, fordi de faste kostnadene fordeles på flere enheter.

## Slik løser du oppgavene
1. Sorter kostnadene i faste og variable.
2. Sett opp resultatet som (pris − variabel kostnad) × antall − faste kostnader, og sett det lik null (eller lik ønsket overskudd) for å finne nullpunktet.
3. For avskrivning: avgjør om metoden er lineær eller degressiv, og bruk riktig formel.
4. Se bort fra sunk cost og ta med riktig alternativkostnad når du sammenligner alternativer.

### Eksempel
En bedrift har faste kostnader på 180 000 kr i året. Produktet selges for 320 kr og koster 200 kr i variable kostnader per stk. Hvor mange må selges for å oppnå et overskudd på 60 000 kr?
1. Dekningsbidrag: $db = 320 - 200 = 120$ kr per stk.
2. $Q = (FK + Z)/db = (180\\,000 + 60\\,000)/120 = 2\\,000$ stk.

Svar: 2 000 stk.

## Vanlige feil
- Å regne nullpunktet med hele salgsprisen i stedet for dekningsbidraget.
- Å bruke lineær avskrivningsformel når oppgaven beskriver en fast prosentsats per år (da er det saldoavskrivning).
- Å la en sunk cost påvirke en ny beslutning («vi har jo allerede brukt så mye på dette»).
- Å glemme at faste kostnader per enhet endrer seg med volumet, selv om totale faste kostnader ikke gjør det.

> Nullpunkt: $Q_0 = FK/db$. Legg til ønsket overskudd i telleren for å finne et salgsmål. Saldoavskrivning ganger med $(1-d)$ hvert år; lineær trekker fra samme beløp hvert år.`,
en: `## What is it about?
Before you can say whether a product or project is profitable, you need to understand how costs behave. Some costs are fixed no matter how much you produce, others are variable and follow the production volume. This distinction underlies break-even analysis, pricing decisions and choices such as picking one production method over another.

## Concepts and formulas
- Fixed costs $FC$: do not change with the quantity produced (rent, fixed salaries, insurance).
- Variable cost $v$ per unit: increases in proportion to the number of units produced (raw materials, electricity per unit).
- Contribution margin per unit: $cm = p - v$, where $p$ is the selling price. The contribution margin ratio is $cm/p$ (the share of the price left to cover fixed costs and provide profit).
- Break-even in units: $Q_0 = FC/(p - v)$. In revenue: $Q_0\\cdot p$.
- Target profit $Z$: the number that must be sold is $Q = (FC + Z)/(p - v)$ – the same formula as break-even, just with $Z$ added to the fixed costs.
- Straight-line depreciation: $(I - \\text{salvage value})/n$ per year, the same amount every year.
- Declining-balance depreciation: the book value is reduced by a fixed percentage $d$ each year: $V_n = I(1-d)^n$. It gives higher depreciation early and lower later, unlike straight-line depreciation.
- Opportunity cost: the value of the best alternative you give up. Sunk cost: costs already incurred that cannot be recovered – they should not affect new decisions.
- Economies of scale: the cost per unit falls as volume increases, because the fixed costs are spread over more units.

## How to solve the problems
1. Sort the costs into fixed and variable.
2. Set up the result as (price − variable cost) × quantity − fixed costs, and set it equal to zero (or to the target profit) to find the break-even point.
3. For depreciation: decide whether the method is straight-line or declining-balance, and use the right formula.
4. Ignore sunk costs and include the correct opportunity cost when comparing alternatives.

### Example
A company has fixed costs of 180,000 NOK per year. The product sells for 320 NOK and costs 200 NOK in variable cost per unit. How many must be sold to achieve a profit of 60,000 NOK?
1. Contribution margin: $cm = 320 - 200 = 120$ NOK per unit.
2. $Q = (FC + Z)/cm = (180{,}000 + 60{,}000)/120 = 2{,}000$ units.

Answer: 2,000 units.

## Common mistakes
- Computing the break-even point with the full selling price instead of the contribution margin.
- Using the straight-line formula when the problem describes a fixed percentage rate per year (that is declining-balance depreciation).
- Letting a sunk cost affect a new decision ("we've already spent so much on this").
- Forgetting that the fixed cost per unit changes with volume, even though the total fixed cost does not.

> Break-even: $Q_0 = FC/cm$. Add the target profit to the numerator to find a sales goal. Declining-balance multiplies by $(1-d)$ each year; straight-line subtracts the same amount every year.`
});

BIQ("OKON", 2, [
 ["Hva er dekningsgrad (contribution margin ratio)?",
  ["Dekningsbidrag per enhet delt på prisen", "Prisen delt på variabel kostnad", "Fast kostnad delt på prisen", "Variabel kostnad delt på prisen"],
  "Dekningsgraden $db/p$ viser hvor stor andel av hver solgte krone som blir igjen til å dekke faste kostnader og gi overskudd.",
  "What is the contribution margin ratio?",
  ["Contribution margin per unit divided by the price", "The price divided by the variable cost", "Fixed cost divided by the price", "Variable cost divided by the price"],
  "The contribution margin ratio $cm/p$ shows how large a share of each krone (or dollar) sold is left to cover fixed costs and provide profit."],
 ["Hva skjer med nullpunktsomsetningen (break-even i kr) hvis de faste kostnadene øker, alt annet likt?",
  ["Den øker", "Den synker", "Den er uendret", "Den blir null"],
  "Nullpunktet $Q_0 = FK/db$ vokser med $FK$: høyere faste kostnader krever at flere enheter selges før driften går i null.",
  "What happens to the break-even revenue if fixed costs increase, all else equal?",
  ["It increases", "It decreases", "It is unchanged", "It becomes zero"],
  "The break-even point $Q_0 = FC/cm$ grows with $FC$: higher fixed costs require more units to be sold before the business breaks even."],
 ["En bedrift har allerede dekket sine faste kostnader denne måneden gjennom salget så langt. Hva bidrar hvert nytt solgte produkt med til resultatet resten av måneden?",
  ["Hele dekningsbidraget per enhet (pris minus variabel kostnad)", "Hele salgsprisen", "Ingenting, fordi de faste kostnadene allerede er dekket", "Bare den variable kostnaden"],
  "Når de faste kostnadene er dekket, går resten av dekningsbidraget rett til overskudd – de variable kostnadene må fortsatt trekkes fra, men ikke flere faste kostnader.",
  "A company has already covered its fixed costs for the month through sales so far. What does each additional unit sold contribute to the result for the rest of the month?",
  ["The full contribution margin per unit (price minus variable cost)", "The full selling price", "Nothing, because the fixed costs are already covered", "Only the variable cost"],
  "Once the fixed costs are covered, the rest of the contribution margin goes straight to profit – the variable cost still has to be subtracted, but no more fixed costs do."],
 ["Faste kostnader er 150 000 kr, prisen er 250 kr/stk og variabel kostnad er 150 kr/stk. Hvor mange enheter må selges for å oppnå et overskudd på 50 000 kr?",
  { n: 2000, tol: 0, u: "stk" },
  "$Q = (FK+Z)/(p-v) = (150\\,000 + 50\\,000)/(250-150) = 200\\,000/100 = 2\\,000$ stk.",
  "Fixed costs are 150,000 NOK, the price is 250 NOK/unit and the variable cost is 150 NOK/unit. How many units must be sold to achieve a profit of 50,000 NOK?",
  null,
  "$Q = (FC+Z)/(p-v) = (150{,}000 + 50{,}000)/(250-150) = 200{,}000/100 = 2{,}000$ units."]
]);

GEN("OKON", 2,
 // enkel: nullpunktsomsetning (break-even i kr)
 () => { const FK = R.p([50000, 80000, 100000, 120000, 150000, 200000, 250000]), p = R.f(100, 800, 10), v = +(R.f(0.4, 0.8, 0.02) * p).toFixed(2);
   const be = FK * p / (p - v);
   return [T(`Faste kostnader er ${nf(FK)} kr. Et produkt selges for ${nf(p)} kr/stk og har variabel kostnad ${nf(v, 0)} kr/stk. Hva er nullpunktsomsetningen, altså salgsinntekten ved break-even (i kr)?`,
             `Fixed costs are ${nf(FK)} NOK. A product sells for ${nf(p)} NOK/unit and has a variable cost of ${nf(v, 0)} NOK/unit. What is the break-even revenue, i.e. the sales income at break-even (in NOK)?`),
     { n: be, tol: rel(be), u: "kr" },
     T(`Nullpunkt i antall: $Q_0 = FK/(p-v) = ${nf(FK)}/(${nf(p)}-${nf(v, 0)})$. Omsetning ved nullpunktet: $Q_0\\cdot p \\approx ${nf(be, 0)}$ kr.`,
       `Break-even quantity: $Q_0 = FC/(p-v) = ${nf(FK)}/(${nf(p)}-${nf(v, 0)})$. Revenue at break-even: $Q_0\\cdot p \\approx ${nf(be, 0)}$ NOK.`)]; },
 // middels: nødvendig pris for et gitt overskuddsmål
 () => { const FK = R.p([40000, 60000, 80000, 100000, 120000]), v = R.f(50, 300, 10), Z = R.p([10000, 20000, 30000, 50000]), Q = R.i(200, 2000);
   const p = v + (FK + Z) / Q;
   return [T(`Faste kostnader er ${nf(FK)} kr og variabel kostnad er ${nf(v)} kr/stk. Bedriften regner med å selge ${Q} stk, og ønsker et overskudd på ${nf(Z)} kr. Hvilken pris må produktet minst selges for?`,
             `Fixed costs are ${nf(FK)} NOK and the variable cost is ${nf(v)} NOK/unit. The company expects to sell ${Q} units, and wants a profit of ${nf(Z)} NOK. What is the minimum price the product must be sold for?`),
     { n: p, tol: rel(p, 0.01, 0.05), u: "kr" },
     T(`$Q(p-v) = FK+Z \\Rightarrow p = v + \\dfrac{FK+Z}{Q} = ${nf(v)} + \\dfrac{${nf(FK)}+${nf(Z)}}{${Q}} \\approx ${mf(p, 2)}$ kr.`,
       `$Q(p-v) = FC+Z \\Rightarrow p = v + \\dfrac{FC+Z}{Q} = ${nf(v)} + \\dfrac{${nf(FK)}+${nf(Z)}}{${Q}} \\approx ${mf(p, 2)}$ NOK.`)]; },
 // eksamen: saldoavskrivning (degressiv)
 () => { const I = R.p([200000, 300000, 400000, 500000, 600000, 800000]), d = R.p([0.1, 0.15, 0.2, 0.25, 0.3]), yrs = R.i(2, 8);
   const V = I * Math.pow(1 - d, yrs);
   return [T(`En maskin koster ${nf(I)} kr og avskrives med saldometoden (degressivt) med ${nf(d * 100)} % per år. Hva er bokført verdi etter ${yrs} år?`,
             `A machine costs ${nf(I)} NOK and is depreciated using the declining-balance method at ${nf(d * 100)}% per year. What is the book value after ${yrs} years?`),
     { n: V, tol: rel(V), u: "kr" },
     T(`Saldoavskrivning: $V_n = I(1-d)^n = ${nf(I)}\\cdot(1-${mf(d)})^{${yrs}} \\approx ${nf(V, 0)}$ kr.`,
       `Declining-balance depreciation: $V_n = I(1-d)^n = ${nf(I)}\\cdot(1-${mf(d)})^{${yrs}} \\approx ${nf(V, 0)}$ NOK.`)]; }
);

// ================= PROD – enhet 0: Prosess og kundebehov =================
THEORY("PROD", 0, {
nb: `## Hva handler det om?
Produktutviklingsprosessen starter ikke med en løsning, men med å forstå hva brukeren faktisk trenger. All erfaring viser at endringer blir stadig dyrere jo lenger ut i prosessen du kommer – en endring i konseptfasen koster nesten ingenting, mens den samme endringen etter produksjonsoppstart kan koste hundre ganger så mye. Derfor bruker gode utviklingsteam mye tid tidlig på å samle inn og forstå kundebehov før de i det hele tatt begynner å tenke på løsninger.

## Begreper og formler
- Kundebehov: et utsagn på kundens eget språk om hva de ønsker å oppnå (f.eks. «jeg vil at sekken skal tåle regn»), uavhengig av løsning.
- Spesifikasjon (krav): en målbar størrelse avledet fra behovet, med enhet og en mål- eller grenseverdi (f.eks. «vanntetthet ≥ 5000 mm vannsøyle»).
- Viktighet (vekting) $w_i$: hvor mye kunden vektlegger behov $i$, ofte funnet gjennom spørreundersøkelse eller parvis sammenligning. Antall parvise sammenligninger av $n$ behov er $\\binom{n}{2} = \\frac{n(n-1)}{2}$.
- House of Quality (QFD): en matrise som kobler kundebehov (med vekt $w_i$) til tekniske egenskaper via en relasjonsstyrke $r_{ij}$ (typisk 1, 3 eller 9 for svak, middels, sterk sammenheng). Teknisk viktighet for egenskap $j$: $I_j = \\sum_i w_i r_{ij}$.
- Funksjonsanalyse: bryter produktet ned i hva det skal gjøre (funksjoner), ikke hvordan – dette åpner løsningsrommet.
- Stage-gate: utviklingen deles i faser atskilt av beslutningspunkter (gates) der prosjektet vurderes før det får fortsette.

## Slik løser du oppgavene
1. Skill klart mellom behov (kundens språk) og spesifikasjon (målbar, med enhet).
2. Når du skal rangere eller vekte behov: bruk parvis sammenligning eller oppgitte vekter direkte.
3. For QFD-oppgaver: multipliser vekten til hvert behov med relasjonsstyrken til den tekniske egenskapen, og summer.
4. Husk at «hva produktet skal gjøre» (funksjon) kommer før «hvordan det skal gjøres» (løsning).

### Eksempel
Tre kundebehov har vektene $w_1=0{,}5$, $w_2=0{,}3$ og $w_3=0{,}2$. I QFD-matrisen har de relasjonsstyrke 9, 3 og 1 til den tekniske egenskapen «vekt». Hva er teknisk viktighet for vekt?
$I = 0{,}5\\cdot 9 + 0{,}3\\cdot 3 + 0{,}2\\cdot 1 = 4{,}5 + 0{,}9 + 0{,}2 = 5{,}6$.

Svar: teknisk viktighet 5,6 – dette er den høyeste blant de tekniske egenskapene som testes mot disse behovene, så egenskapen «vekt» bør prioriteres i det videre designarbeidet.

## Vanlige feil
- Å skrive en spesifikasjon som egentlig er en løsning («bruk aluminium») i stedet for et mål («masse < 1,2 kg»).
- Å hoppe rett til løsninger før behovene er forstått og prioritert.
- Å tro at kundens første forslag til løsning ER behovet – spør «hvorfor» for å finne det underliggende behovet.
- Å glemme at relasjonsstyrken i QFD skal reflektere hvor mye en teknisk egenskap faktisk påvirker behovet, ikke bare om den gjør det.

> Behov er hva kunden vil oppnå; spesifikasjon er et målbart tall med enhet. Teknisk viktighet i QFD: $I_j = \\sum_i w_i r_{ij}$.`,
en: `## What is it about?
Product development doesn't start with a solution, but with understanding what the user actually needs. Experience shows that changes become steadily more expensive the later in the process you make them – a change in the concept phase costs almost nothing, while the same change after production ramp-up can cost a hundred times as much. That's why good development teams spend a lot of time early on gathering and understanding customer needs before they even start thinking about solutions.

## Concepts and formulas
- Customer need: a statement in the customer's own words about what they want to achieve (e.g. "I want the backpack to keep out rain"), independent of any solution.
- Specification (requirement): a measurable quantity derived from the need, with a unit and a target or limit value (e.g. "waterproofness ≥ 5000 mm water column").
- Importance (weight) $w_i$: how much the customer values need $i$, often found through a survey or pairwise comparison. The number of pairwise comparisons of $n$ needs is $\\binom{n}{2} = \\frac{n(n-1)}{2}$.
- House of Quality (QFD): a matrix linking customer needs (with weight $w_i$) to technical characteristics through a relationship strength $r_{ij}$ (typically 1, 3 or 9 for weak, medium, strong). Technical importance of characteristic $j$: $I_j = \\sum_i w_i r_{ij}$.
- Function analysis: breaks the product down into what it must do (functions), not how – this opens up the solution space.
- Stage-gate: development is split into phases separated by decision points (gates) where the project is reviewed before being allowed to continue.

## How to solve the problems
1. Clearly separate need (customer's language) from specification (measurable, with a unit).
2. When ranking or weighting needs: use pairwise comparison or given weights directly.
3. For QFD problems: multiply each need's weight by the relationship strength to the technical characteristic, and sum.
4. Remember that "what the product must do" (function) comes before "how it will do it" (solution).

### Example
Three customer needs have weights $w_1=0.5$, $w_2=0.3$ and $w_3=0.2$. In the QFD matrix they have relationship strength 9, 3 and 1 to the technical characteristic "weight". What is the technical importance of weight?
$I = 0.5\\cdot 9 + 0.3\\cdot 3 + 0.2\\cdot 1 = 4.5 + 0.9 + 0.2 = 5.6$.

Answer: technical importance 5.6 – this is the highest among the technical characteristics tested against these needs, so "weight" should be prioritized in the further design work.

## Common mistakes
- Writing a specification that is really a solution ("use aluminum") instead of a target ("mass < 1.2 kg").
- Jumping straight to solutions before the needs are understood and prioritized.
- Assuming the customer's first suggested solution IS the need – ask "why" to find the underlying need.
- Forgetting that the relationship strength in QFD should reflect how much a technical characteristic actually affects the need, not just whether it does.

> A need is what the customer wants to achieve; a specification is a measurable number with a unit. Technical importance in QFD: $I_j = \\sum_i w_i r_{ij}$.`
});

BIQ("PROD", 0, [
 ["En kunde sier: «Jeg vil ha en sterkere lommelykt.» Hva er sannsynligvis det egentlige behovet bak dette utsagnet?",
  ["Nok lys til å se langt nok i mørket", "En sterkere lommelykt", "En billigere lommelykt", "En lommelykt i en annen farge"],
  "Kundens forslag til løsning («sterkere lommelykt») skjuler ofte et mer grunnleggende behov. Ved å spørre «hvorfor» finner man at det egentlig handler om å se langt nok, noe som åpner for flere løsninger enn bare en sterkere lyskilde.",
  "A customer says: \"I want a stronger flashlight.\" What is probably the real underlying need behind this statement?",
  ["Enough light to see far enough in the dark", "A stronger flashlight", "A cheaper flashlight", "A flashlight in a different color"],
  "The customer's suggested solution (\"a stronger flashlight\") often hides a more fundamental need. Asking \"why\" reveals that it is really about seeing far enough, which opens up more solutions than just a stronger light source."],
 ["Et team skriver kravspesifikasjonen før de har samlet inn kundebehov gjennom intervjuer og observasjon. Hva er den mest sannsynlige konsekvensen?",
  ["Kravene risikerer å være basert på antakelser i stedet for faktiske behov, og viktige krav kan mangle eller være feil", "Kravspesifikasjonen blir automatisk mer presis", "Det sparer alltid tid uten ulemper", "QFD-matrisen blir overflødig"],
  "Krav skal utledes fra kundebehov. Uten grundig behovsinnsamling risikerer man å spesifisere feil ting, eller basere kravene på egne antakelser om hva kunden vil ha.",
  "A team writes the requirements specification before gathering customer needs through interviews and observation. What is the most likely consequence?",
  ["The requirements risk being based on assumptions instead of real needs, and important requirements may be missing or wrong", "The requirements specification automatically becomes more precise", "It always saves time with no downside", "The QFD matrix becomes unnecessary"],
  "Requirements must be derived from customer needs. Without thorough needs-gathering, the team risks specifying the wrong things, or basing requirements on their own assumptions about what the customer wants."],
 ["I en QFD-matrise har to kundebehov vektene 0,6 og 0,4. Til den tekniske egenskapen «robusthet» har de relasjonsstyrke 3 og 9. Hva er teknisk viktighet for robusthet?",
  { n: 5.4, tol: 0.02, u: "" },
  "$I = 0{,}6\\cdot 3 + 0{,}4\\cdot 9 = 1{,}8 + 3{,}6 = 5{,}4$.",
  "In a QFD matrix, two customer needs have weights 0.6 and 0.4. For the technical characteristic \"robustness\" they have relationship strength 3 and 9. What is the technical importance of robustness?",
  null,
  "$I = 0.6\\cdot 3 + 0.4\\cdot 9 = 1.8 + 3.6 = 5.4$."]
]);

GEN("PROD", 0,
 // enkel: gjennomsnittlig viktighetsvurdering fra flere kunder
 () => { const n = R.i(4, 6); const ratings = Array.from({ length: n }, () => R.i(1, 5)); const avg = ratings.reduce((a, b) => a + b, 0) / n;
   return [T(`${n} kunder ga en idé følgende viktighetsvurdering (skala 1–5): ${ratings.join(", ")}. Hva er gjennomsnittlig viktighet?`,
             `${n} customers rated an idea's importance as follows (scale 1–5): ${ratings.join(", ")}. What is the average importance rating?`),
     { n: avg, tol: 0.05, u: "" },
     T(`Gjennomsnitt: $(${ratings.join(" + ")})/${n} = ${mf(avg, 2)}$.`, `Average: $(${ratings.join(" + ")})/${n} = ${mf(avg, 2)}$.`)]; },
 // eksamen: teknisk viktighet i QFD med tre behov
 () => { const w = R.p([[0.5, 0.3, 0.2], [0.4, 0.4, 0.2], [0.6, 0.25, 0.15], [0.5, 0.25, 0.25], [0.45, 0.35, 0.2]]);
   const rset = [1, 3, 9]; const r = [R.p(rset), R.p(rset), R.p(rset)]; const I = w.reduce((a, x, i) => a + x * r[i], 0);
   return [T(`I en QFD-matrise har tre kundebehov vektene ${w.map(x => nf(x)).join(", ")}. Til en teknisk egenskap har de relasjonsstyrke ${r.join(", ")}. Hva er teknisk viktighet for denne egenskapen?`,
             `In a QFD matrix, three customer needs have weights ${w.map(x => nf(x)).join(", ")}. For a technical characteristic they have relationship strength ${r.join(", ")}. What is the technical importance of this characteristic?`),
     { n: I, tol: rel(I, 0.01, 0.05), u: "" },
     T(`$I = ${w.map((x, i) => `${mf(x)}\\cdot ${r[i]}`).join(" + ")} = ${mf(I, 2)}$.`,
       `$I = ${w.map((x, i) => `${mf(x)}\\cdot ${r[i]}`).join(" + ")} = ${mf(I, 2)}$.`)]; }
);

// ================= PROD – enhet 1: Konseptutvikling og valg =================
THEORY("PROD", 1, {
nb: `## Hva handler det om?
Når kundebehovene er forstått, skal teamet finne og velge blant flere mulige løsninger. Målet er ikke å finne «den perfekte idéen» med en gang, men å systematisk generere mange konsepter og deretter sile dem ned i flere runder. Erfaring viser gjennomgående at team som utforsker flere konsepter før de bestemmer seg, ender opp med bedre løsninger enn team som låser seg til den første idéen.

## Begreper og formler
- Idémyldring (brainstorming): generer mange idéer uten å kritisere underveis; vurdering kommer senere.
- Morfologisk matrise: deler produktet i delfunksjoner, lister løsningsalternativer for hver, og kombinerer dem til konsepter. Antall mulige kombinasjoner (uten hensyn til om de faktisk er gjennomførbare) er produktet av antall alternativer for hver delfunksjon: $N = n_1\\cdot n_2\\cdots n_k$.
- Konseptscreening (Pugh-matrise): hvert konsept vurderes kriterie for kriterie med +, 0 eller − mot et referansekonsept. Nettoscore = antall pluss − antall minus (nullene teller ikke). Brukes til å luke ut de svakeste konseptene raskt.
- Konseptscoring: en mer finmasket vurdering av de gjenværende konseptene, der hvert kriterium får en vekt $w_i$ (som gjerne summerer til 1, eller oppgis i prosent) og hvert konsept en poengsum $s_i$ på hvert kriterium. Vektet totalscore: $S = \\sum_i w_i s_i$.
- Prototyp: en tidlig, forenklet utgave av produktet. En «works-like»-prototyp tester funksjon, en «looks-like»-prototyp tester utseende og ergonomi – sjelden begge deler i samme prototyp tidlig i prosessen.

## Slik løser du oppgavene
1. For antall konsepter fra en morfologisk matrise: multipliser antall alternativer for hver delfunksjon.
2. For Pugh-nettoscore: tell pluss og minus, trekk fra hverandre. Nuller påvirker ikke resultatet.
3. For vektet konseptscoring: multipliser hver poengsum med tilhørende vekt, og summer. Sjekk at vektene faktisk representerer det teamet mener er viktigst.
4. Husk at en høy poengsum på ett kriterium ikke kan «kjøpe bort» et konsept som ikke oppfyller et absolutt krav (f.eks. sikkerhet) – slike krav bør sjekkes som et eget, absolutt filter før vekting.

### Eksempel
Et konsept vurderes på tre kriterier med vektene 0,5, 0,3 og 0,2, og får poengsummene 4, 2 og 5.
$S = 0{,}5\\cdot 4 + 0{,}3\\cdot 2 + 0{,}2\\cdot 5 = 2{,}0 + 0{,}6 + 1{,}0 = 3{,}6$.

Svar: vektet totalscore 3,6.

## Vanlige feil
- Å velge det første konseptet som dukker opp, uten å sammenligne det med alternativer.
- Å kritisere idéer under selve idémyldringen – det kveler kreativiteten og gir færre idéer.
- Å stole blindt på en høy vektet score selv om konseptet stryker på et kritisk krav (f.eks. sikkerhet) som ikke er tatt med i vektingen.
- Å blande sammen konseptscreening (grov, +/0/−) og konseptscoring (finere, tallpoeng) – de har ulike formål.

> Screening luker ut de svake konseptene raskt (+/0/−); scoring rangerer de gjenværende presist ($S = \\sum w_i s_i$). Multipliser alternativer for morfologisk antall: $N = n_1\\cdot n_2\\cdots n_k$.`,
en: `## What is it about?
Once the customer needs are understood, the team must find and choose among several possible solutions. The goal is not to find "the perfect idea" right away, but to systematically generate many concepts and then narrow them down in several rounds. Experience consistently shows that teams who explore several concepts before deciding end up with better solutions than teams who lock onto the first idea.

## Concepts and formulas
- Brainstorming: generate many ideas without criticizing along the way; evaluation comes later.
- Morphological matrix: splits the product into sub-functions, lists solution alternatives for each, and combines them into concepts. The number of possible combinations (regardless of whether they are actually feasible) is the product of the number of alternatives for each sub-function: $N = n_1\\cdot n_2\\cdots n_k$.
- Concept screening (Pugh matrix): each concept is rated criterion by criterion with +, 0 or − against a reference concept. Net score = number of pluses − number of minuses (zeros don't count). Used to quickly weed out the weakest concepts.
- Concept scoring: a finer-grained evaluation of the remaining concepts, where each criterion gets a weight $w_i$ (often summing to 1, or given in percent) and each concept a score $s_i$ on each criterion. Weighted total score: $S = \\sum_i w_i s_i$.
- Prototype: an early, simplified version of the product. A "works-like" prototype tests function, a "looks-like" prototype tests appearance and ergonomics – rarely both in the same prototype early in the process.

## How to solve the problems
1. For the number of concepts from a morphological matrix: multiply the number of alternatives for each sub-function.
2. For the Pugh net score: count the pluses and minuses, subtract. Zeros don't affect the result.
3. For weighted concept scoring: multiply each score by its weight, and sum. Check that the weights actually represent what the team considers most important.
4. Remember that a high score on one criterion cannot "buy off" a concept that fails an absolute requirement (e.g. safety) – such requirements should be checked as a separate, absolute filter before weighting.

### Example
A concept is rated on three criteria with weights 0.5, 0.3 and 0.2, and receives the scores 4, 2 and 5.
$S = 0.5\\cdot 4 + 0.3\\cdot 2 + 0.2\\cdot 5 = 2.0 + 0.6 + 1.0 = 3.6$.

Answer: weighted total score 3.6.

## Common mistakes
- Choosing the first concept that comes up, without comparing it to alternatives.
- Criticizing ideas during the brainstorming itself – it stifles creativity and produces fewer ideas.
- Blindly trusting a high weighted score even though the concept fails a critical requirement (e.g. safety) that isn't included in the weighting.
- Confusing concept screening (rough, +/0/−) with concept scoring (finer, numeric points) – they serve different purposes.

> Screening quickly weeds out weak concepts (+/0/−); scoring ranks the remaining ones precisely ($S = \\sum w_i s_i$). Multiply alternatives for the morphological count: $N = n_1\\cdot n_2\\cdots n_k$.`
});

BIQ("PROD", 1, [
 ["Hva er hovedforskjellen på konseptscreening (Pugh-matrise) og konseptscoring?",
  ["Screening gir en rask, grov +/0/−-vurdering mot et referansekonsept; scoring gir en mer finmasket vektet poengsum", "De er akkurat det samme", "Scoring brukes bare til å luke ut de svakeste konseptene", "Screening krever numeriske vekter for hvert kriterium"],
  "Screening er rask og grov og brukes tidlig for å luke ut svake konsepter. Scoring er mer tidkrevende og finmasket, og brukes på de gjenværende, sterkeste konseptene.",
  "What is the main difference between concept screening (Pugh matrix) and concept scoring?",
  ["Screening gives a quick, rough +/0/− rating against a reference concept; scoring gives a more fine-grained weighted score", "They are exactly the same", "Scoring is only used to weed out the weakest concepts", "Screening requires numeric weights for each criterion"],
  "Screening is quick and rough and is used early to weed out weak concepts. Scoring is more time-consuming and fine-grained, and is used on the remaining, strongest concepts."],
 ["Et konsept får den høyeste vektede totalscoren i en konseptscoring, men konseptet oppfyller ikke et absolutt sikkerhetskrav som ikke er en del av vektingen. Hva bør teamet gjøre?",
  ["Forkaste eller endre konseptet uansett score, siden absolutte krav må oppfylles først", "Velge konseptet siden det har høyest score", "Fjerne sikkerhetskravet fra kravspesifikasjonen", "Gi sikkerhetskravet vekt 0 og se bort fra det"],
  "En vektet score rangerer konsepter opp mot hverandre, men kan ikke oppheve et absolutt krav. Slike krav (f.eks. sikkerhet) må sjekkes som et eget filter før eller uavhengig av vektingen.",
  "A concept gets the highest weighted total score in a concept scoring, but the concept does not meet an absolute safety requirement that is not part of the weighting. What should the team do?",
  ["Reject or revise the concept regardless of its score, since absolute requirements must be met first", "Choose the concept since it has the highest score", "Remove the safety requirement from the specification", "Give the safety requirement a weight of 0 and ignore it"],
  "A weighted score ranks concepts against each other, but it cannot override an absolute requirement. Such requirements (e.g. safety) must be checked as a separate filter before or independent of the weighting."],
 ["Et konsept vurderes på 8 kriterier i en Pugh-matrise. Det får 5 pluss og 2 minus. Hvor mange kriterier ble vurdert som uavgjort (0)?",
  { n: 1, tol: 0, u: "" },
  "Summen av pluss, null og minus må være lik antall kriterier: $0 = 8 - 5 - 2 = 1$.",
  "A concept is evaluated on 8 criteria in a Pugh matrix. It gets 5 pluses and 2 minuses. How many criteria were rated as ties (0)?",
  null,
  "The sum of pluses, zeros and minuses must equal the number of criteria: $0 = 8 - 5 - 2 = 1$."]
]);

GEN("PROD", 1,
 // enkel: antall idéer fra idémyldring
 () => { const m = R.i(10, 45), rate = R.f(0.5, 3, 0.25); const ideas = m * rate;
   return [T(`Et team idémyldrer i ${m} minutter og genererer i snitt ${nf(rate)} idéer per minutt. Hvor mange idéer har de totalt?`,
             `A team brainstorms for ${m} minutes, generating an average of ${nf(rate)} ideas per minute. How many ideas do they have in total?`),
     { n: ideas, tol: rel(ideas, 0.01, 0.5), u: "" },
     T(`Antall idéer $= ${m}\\cdot ${mf(rate)} = ${mf(ideas, 1)}$.`, `Number of ideas $= ${m}\\cdot ${mf(rate)} = ${mf(ideas, 1)}$.`)]; },
 // eksamen: morfologisk antall kombinasjoner minus ugjennomførbare
 () => { const k = R.i(3, 5); const opts = Array.from({ length: k }, () => R.i(2, 5)); const total = opts.reduce((a, b) => a * b, 1);
   const infeasPct = R.p([10, 15, 20, 25, 30]); const feasible = Math.round(total * (1 - infeasPct / 100));
   return [T(`En morfologisk matrise med ${k} delfunksjoner (${opts.join(", ")} alternativer) gir ${total} mulige kombinasjoner. Teamet finner at ${infeasPct} % av disse er ugjennomførbare på grunn av inkompatible grensesnitt. Hvor mange gjennomførbare konsepter gjenstår?`,
             `A morphological matrix with ${k} sub-functions (${opts.join(", ")} alternatives) gives ${total} possible combinations. The team finds that ${infeasPct}% of these are infeasible due to incompatible interfaces. How many feasible concepts remain?`),
     { n: feasible, tol: rel(feasible, 0.02, 1), u: "" },
     T(`Gjenstående $= ${total}\\cdot(1-${infeasPct}/100) \\approx ${feasible}$.`, `Remaining $= ${total}\\cdot(1-${infeasPct}/100) \\approx ${feasible}$.`)]; }
);

// ================= PROD – enhet 2: Design for X og produksjon =================
THEORY("PROD", 2, {
nb: `## Hva handler det om?
Et konsept må også kunne produseres billig og pålitelig i det antallet du faktisk skal lage. «Design for X» (DFX) er en samlebetegnelse for å designe produktet med et bestemt mål for øye allerede fra start – for eksempel enkel montering (DFA), billig produksjon (DFM), eller enkel demontering og gjenvinning. Valg av produksjonsmetode, toleranser og materialer får store konsekvenser for kostnad, spesielt når volumet øker.

## Begreper og formler
- DFA (Design for Assembly): færre deler, enklere og raskere montering. Spør for hver del: må den være separat?
- DFM (Design for Manufacturing): utforme deler slik at de er enkle og billige å produsere – jevn godstykkelse, standardiserte hullmål, riktig slippvinkel for støping.
- Faste kostnader vs. stykkpris: prototyping (3D-print) har lav fast kostnad men høy stykkpris; sprøytestøping har høy fast kostnad (formen) men lav stykkpris. Likevektspunktet: $Q^* = \\dfrac{FK}{c_p - c_m}$, der $FK$ er formkostnaden, $c_p$ stykkprisen ved den dyre metoden og $c_m$ stykkprisen ved den billige.
- Materialkostnad: masse $= V\\cdot\\rho$, kostnad $= \\dfrac{\\text{masse}}{1000}\\cdot\\text{pris per kg}$. Legg gjerne til en sløsefaktor for materiale som går tapt (sponer, anløp, støtte).
- Toleransekjede (verste fall): når flere dimensjoner med hver sin toleranse $\\pm t_i$ ligger i en rett kjede, blir total toleranse i verste fall summen $T = \\sum_i t_i$. En mer realistisk statistisk metode (RSS – root sum square) gir $T_{RSS} = \\sqrt{\\sum_i t_i^2}$, som normalt gir en mindre (mer optimistisk) total toleranse fordi det er lite sannsynlig at alle avvikene er maksimale samtidig.
- Standardisering: bruk av like deler (f.eks. samme skruetype) på tvers av produkter reduserer lager-, innkjøps- og monteringskompleksitet.

## Slik løser du oppgavene
1. Identifiser om spørsmålet gjelder montering (DFA), produksjon (DFM), materialkostnad eller toleranser.
2. For metodevalg: sett opp totalkostnad som funksjon av antall for hver metode, og finn hvor kurvene krysser.
3. For materialkostnad: regn ut masse fra volum og tetthet først, konverter til kg, og gang med prisen. Legg til eventuell sløsefaktor.
4. For toleransekjede: bruk sum av toleranser for verste fall, eller kvadratrot av kvadratsum (RSS) hvis oppgaven ber om en statistisk vurdering.

### Eksempel
En lineær kjede av tre dimensjoner har toleransene ±0,05 mm, ±0,08 mm og ±0,12 mm. Hva er total toleranse i verste fall, og med RSS-metoden?
1. Verste fall: $T = 0{,}05 + 0{,}08 + 0{,}12 = 0{,}25$ mm.
2. RSS: $T_{RSS} = \\sqrt{0{,}05^2 + 0{,}08^2 + 0{,}12^2} = \\sqrt{0{,}0233} \\approx 0{,}153$ mm.

Svar: 0,25 mm i verste fall, men bare omtrent 0,15 mm med den statistiske RSS-metoden.

## Vanlige feil
- Å sette unødvendig stramme toleranser «for sikkerhets skyld» – det øker kostnaden uten funksjonell gevinst.
- Å bruke verste-fall-summen når oppgaven egentlig spør om statistisk (RSS) toleransekjede, eller omvendt.
- Å glemme sløsefaktoren i materialkostnad når produksjonsmetoden gir mye kapp eller sponer.
- Å velge produksjonsmetode kun ut fra stykkpris uten å ta hensyn til de faste kostnadene (formkostnad) og forventet volum.

> Verste-fall toleransekjede: summer. Statistisk (RSS): kvadratrot av kvadratsum – alltid mindre enn eller lik verste fall. Likevekt mellom to produksjonsmetoder: $Q^* = FK/(c_p - c_m)$.`,
en: `## What is it about?
A concept also has to be manufacturable, cheaply and reliably, in the quantity you actually need. "Design for X" (DFX) is an umbrella term for designing the product with a specific goal in mind from the start – for example easy assembly (DFA), cheap production (DFM), or easy disassembly and recycling. The choice of production method, tolerances and materials has major cost consequences, especially as volume increases.

## Concepts and formulas
- DFA (Design for Assembly): fewer parts, simpler and faster assembly. Ask for every part: does it need to be separate?
- DFM (Design for Manufacturing): designing parts so they are easy and cheap to produce – uniform wall thickness, standardized hole sizes, correct draft angle for molding.
- Fixed cost vs. unit price: prototyping (3D printing) has low fixed cost but high unit price; injection molding has high fixed cost (the mold) but low unit price. The break-even point: $Q^* = \\dfrac{FC}{c_p - c_m}$, where $FC$ is the mold cost, $c_p$ the unit price of the expensive method and $c_m$ the unit price of the cheap one.
- Material cost: mass $= V\\cdot\\rho$, cost $= \\dfrac{\\text{mass}}{1000}\\cdot\\text{price per kg}$. Consider adding a waste factor for material lost to chips, sprues or supports.
- Tolerance stack-up (worst case): when several dimensions with individual tolerances $\\pm t_i$ lie in a straight chain, the total worst-case tolerance is the sum $T = \\sum_i t_i$. A more realistic statistical method (RSS – root sum square) gives $T_{RSS} = \\sqrt{\\sum_i t_i^2}$, which is normally smaller (more optimistic) because it is unlikely that all deviations are at their maximum at the same time.
- Standardization: using identical parts (e.g. the same screw type) across products reduces inventory, purchasing and assembly complexity.

## How to solve the problems
1. Identify whether the question concerns assembly (DFA), manufacturing (DFM), material cost or tolerances.
2. For method choice: set up total cost as a function of quantity for each method, and find where the curves cross.
3. For material cost: compute the mass from volume and density first, convert to kg, and multiply by the price. Add any waste factor.
4. For a tolerance chain: use the sum of tolerances for the worst case, or the root of the sum of squares (RSS) if the problem asks for a statistical assessment.

### Example
A linear chain of three dimensions has tolerances ±0.05 mm, ±0.08 mm and ±0.12 mm. What is the total tolerance in the worst case, and with the RSS method?
1. Worst case: $T = 0.05 + 0.08 + 0.12 = 0.25$ mm.
2. RSS: $T_{RSS} = \\sqrt{0.05^2 + 0.08^2 + 0.12^2} = \\sqrt{0.0233} \\approx 0.153$ mm.

Answer: 0.25 mm in the worst case, but only about 0.15 mm with the statistical RSS method.

## Common mistakes
- Setting unnecessarily tight tolerances "just to be safe" – this increases cost without any functional benefit.
- Using the worst-case sum when the problem actually asks for a statistical (RSS) tolerance stack-up, or vice versa.
- Forgetting the waste factor in material cost when the production method produces a lot of chips or scrap.
- Choosing a production method based on unit price alone, without considering the fixed cost (mold cost) and expected volume.

> Worst-case tolerance stack-up: add them up. Statistical (RSS): square root of the sum of squares – always smaller than or equal to the worst case. Break-even between two production methods: $Q^* = FC/(c_p - c_m)$.`
});

BIQ("PROD", 2, [
 ["Hvorfor reduserer standardisering av deler (f.eks. samme skruetype på flere produkter) kostnadene?",
  ["Det øker innkjøpsvolumet per del, gir bedre priser og reduserer lager- og monteringskompleksitet", "Det gjør hver del dyrere, men raskere å produsere", "Det er bare en fordel for design, ikke for kostnad", "Det reduserer antall leverandører til null"],
  "Færre unike deltyper betyr høyere volum per del (bedre innkjøpspris), enklere lagerstyring og mindre risiko for montasjefeil fordi arbeiderne ikke må skille mellom like deler med ulik størrelse.",
  "Why does standardizing parts (e.g. the same screw type across several products) reduce costs?",
  ["It increases the purchase volume per part, gives better prices and reduces inventory and assembly complexity", "It makes each part more expensive but faster to produce", "It is only a design benefit, not a cost benefit", "It reduces the number of suppliers to zero"],
  "Fewer unique part types means higher volume per part (better purchase price), simpler inventory management and lower risk of assembly errors, since workers don't need to distinguish between similar parts of different sizes."],
 ["En bedrift bytter ut to ulike festemidler (skruestørrelser) på et produkt med én standard skruestørrelse. Hva skjer med monteringstiden, alt annet likt?",
  ["Den synker, fordi arbeiderne slipper å lete etter og skille mellom ulike skruer", "Den øker, fordi standardskruer alltid er vanskeligere å bruke", "Den er uendret, fordi antall skruer er det samme", "Den blir uforutsigbar"],
  "Når arbeiderne bare trenger å håndtere én type skrue, går identifisering og henting raskere, og risikoen for å bruke feil skrue synker.",
  "A company replaces two different fasteners (screw sizes) on a product with a single standard screw size. What happens to the assembly time, all else equal?",
  ["It decreases, because workers no longer need to search for and distinguish between different screws", "It increases, because standard screws are always harder to use", "It is unchanged, because the number of screws is the same", "It becomes unpredictable"],
  "When workers only need to handle one type of screw, identifying and picking parts goes faster, and the risk of using the wrong screw decreases."],
 ["En lineær kjede av fire dimensjoner har toleransene ±0,03 mm, ±0,06 mm, ±0,04 mm og ±0,10 mm. Hva er total toleranse i verste fall?",
  { n: 0.23, tol: 0.005, u: "mm" },
  "Verste-fall toleransekjede er summen: $0{,}03 + 0{,}06 + 0{,}04 + 0{,}10 = 0{,}23$ mm.",
  "A linear chain of four dimensions has tolerances ±0.03 mm, ±0.06 mm, ±0.04 mm and ±0.10 mm. What is the total tolerance in the worst case?",
  null,
  "The worst-case tolerance stack-up is the sum: $0.03 + 0.06 + 0.04 + 0.10 = 0.23$ mm."]
]);

GEN("PROD", 2,
 // middels: materialkostnad inkludert svinn
 () => { const V = R.p([15, 20, 30, 40, 60, 80, 100]), matset = R.p([["POM", 1.41], ["messing", 8.5], ["polykarbonat", 1.2], ["titan", 4.5]]),
     pr = R.p([70, 90, 180, 300, 400]), waste = R.p([5, 10, 15, 20, 25]);
   const mEff = V * matset[1] * (1 + waste / 100); const cost = mEff / 1000 * pr;
   const matEN = { "POM": "POM", "messing": "brass", "polykarbonat": "polycarbonate", "titan": "titanium" }[matset[0]];
   return [T(`En del på ${V} cm³ lages i ${matset[0]} (${nf(matset[1], 2)} g/cm³) som koster ${pr} kr/kg. Produksjonen gir ${waste} % ekstra materialsvinn (kapp/sponer). Hva er materialkostnaden inkludert svinn?`,
             `A part of ${V} cm³ is made of ${matEN} (${nf(matset[1], 2)} g/cm³), which costs ${pr} NOK/kg. Production creates ${waste}% extra material waste (scrap/chips). What is the material cost including waste?`),
     { n: cost, tol: rel(cost, 0.01, 0.02), u: "kr" },
     T(`Effektiv masse: $${V}\\cdot ${mf(matset[1], 2)}\\cdot(1+${waste}/100) \\approx ${mf(mEff, 1)}$ g. Kostnad: $${mf(mEff / 1000, 4)}\\cdot ${pr} \\approx ${mf(cost, 2)}$ kr.`,
       `Effective mass: $${V}\\cdot ${mf(matset[1], 2)}\\cdot(1+${waste}/100) \\approx ${mf(mEff, 1)}$ g. Cost: $${mf(mEff / 1000, 4)}\\cdot ${pr} \\approx ${mf(cost, 2)}$ NOK.`)]; },
 // eksamen: statistisk (RSS) toleransekjede
 () => { const k = R.i(3, 5); const ts = Array.from({ length: k }, () => R.f(0.02, 0.15, 0.01));
   const rss = Math.sqrt(ts.reduce((a, t) => a + t * t, 0));
   return [T(`En lineær toleransekjede har ${k} dimensjoner med toleransene ${ts.map(t => "±" + nf(t, 2)).join(", ")} mm. Hva er total toleranse med den statistiske RSS-metoden (kvadratrot av kvadratsum)?`,
             `A linear tolerance chain has ${k} dimensions with tolerances ${ts.map(t => "±" + nf(t, 2)).join(", ")} mm. What is the total tolerance using the statistical RSS method (root sum square)?`),
     { n: rss, tol: rel(rss, 0.02, 0.005), u: "mm" },
     T(`$T_{RSS} = \\sqrt{${ts.map(t => `${mf(t, 2)}^2`).join(" + ")}} \\approx ${mf(rss, 3)}$ mm.`,
       `$T_{RSS} = \\sqrt{${ts.map(t => `${mf(t, 2)}^2`).join(" + ")}} \\approx ${mf(rss, 3)}$ mm.`)]; }
);

// ================= STKD6610 – enhet 0: Bærekraft =================
THEORY("STKD6610", 0, {
nb: `## Hva handler det om?
Bærekraft handler om å forstå og redusere den totale belastningen et produkt, en tjeneste eller en aktivitet har på miljø og samfunn – fra uttak av råvarer til det til slutt blir avfall. For en ingeniør er dette ikke bare etikk, men også regnestykker: du må kunne kvantifisere utslipp og energibruk for å sammenligne alternativer og vise at et tiltak faktisk virker.

## Begreper og formler
- Livsløpsanalyse (LCA): kartlegger miljøbelastningen «fra vugge til grav» (råvarer → produksjon → transport → bruk → avhending), eventuelt «fra vugge til vugge» hvis materialene går tilbake i kretsløpet.
- Funksjonell enhet: den felles referansen produkter sammenlignes per (f.eks. «transport av én person 1 km»), avgjørende for en rettferdig sammenligning.
- Karbonfotavtrykk / klimagassregnskap: summen av utslipp regnet om til CO₂-ekvivalenter, $E = \\sum_i A_i\\cdot EF_i$, der $A_i$ er aktivitetsdata (f.eks. km kjørt, kWh brukt) og $EF_i$ er utslippsfaktoren for den kilden.
- CO₂-ekvivalenter (GWP): andre klimagasser enn CO₂ (f.eks. metan, lystgass) vektes etter hvor mye mer oppvarmingseffekt de har enn CO₂ over en gitt tidshorisont (Global Warming Potential, GWP). Total i CO₂-ekvivalenter: $CO_2e = \\sum_i m_i\\cdot GWP_i$.
- Scope 1, 2 og 3: direkte utslipp (1), utslipp fra innkjøpt energi (2), og resten av verdikjedens indirekte utslipp (3).
- Sirkulær økonomi: hold materialer og produkter i bruk lengst mulig, i prioritert rekkefølge omtrent som: reduser bruk → reparer → bruk om igjen → gjenvinn materialet.
- Energitilbakebetalingstid: innebygd (embodied) energi i et produkt delt på årlig energibesparelse eller -produksjon, gir antall år før produktet har «tjent inn» sin egen produksjonsenergi.

## Slik løser du oppgavene
1. Identifiser aktivitetsdataene (mengde, distanse, energi) og finn riktig utslipps- eller GWP-faktor.
2. Gang aktivitetsdata med faktoren for hver kilde, og summer om det er flere kilder eller gasser.
3. Pass på enhetene – utslippsfaktorer oppgis ofte i gram, mens svaret ofte skal være i kilogram eller tonn.
4. For livsløps- og energispørsmål: sjekk om du sammenligner én fase (f.eks. bruk) eller hele livsløpet, og bruk samme funksjonelle enhet for begge alternativer du sammenligner.

### Eksempel
En bilreise er 350 km lang, og bilen slipper ut 120 g CO₂ per km. Hvor mange kg CO₂ slipper turen ut totalt?
1. Totalt utslipp: $E = 350\\cdot 120 = 42\\,000$ g.
2. Konverter til kg: $42\\,000/1000 = 42$ kg CO₂.

Svar: 42 kg CO₂.

## Vanlige feil
- Å sammenligne to produkter uten en felles funksjonell enhet (f.eks. «per kilo» mot «per stk»).
- Å glemme å konvertere mellom gram, kilogram og tonn i utslippsberegninger.
- Å tro at gjenvinning alltid er det beste alternativet – ombruk og å redusere forbruket ligger som regel høyere i avfallshierarkiet.
- Å se bort fra rebound-effekten: en mer energieffektiv løsning kan føre til at man bruker den mer, slik at deler av gevinsten forsvinner.

> Utslipp = aktivitetsdata × utslippsfaktor, summert over kilder: $E = \\sum_i A_i\\cdot EF_i$. Sjekk alltid enhetene (g, kg, tonn) og bruk samme funksjonelle enhet når du sammenligner.`,
en: `## What is it about?
Sustainability is about understanding and reducing the total impact a product, service or activity has on the environment and society – from the extraction of raw materials to when it eventually becomes waste. For an engineer this isn't just ethics, it's also arithmetic: you need to be able to quantify emissions and energy use in order to compare alternatives and show that a measure actually works.

## Concepts and formulas
- Life cycle assessment (LCA): maps the environmental impact "from cradle to grave" (raw materials → production → transport → use → disposal), or "cradle to cradle" if the materials go back into the loop.
- Functional unit: the common reference products are compared per (e.g. "transporting one person 1 km"), essential for a fair comparison.
- Carbon footprint / greenhouse gas account: the sum of emissions converted to CO₂-equivalents, $E = \\sum_i A_i\\cdot EF_i$, where $A_i$ is activity data (e.g. km driven, kWh used) and $EF_i$ is the emission factor for that source.
- CO₂-equivalents (GWP): greenhouse gases other than CO₂ (e.g. methane, nitrous oxide) are weighted by how much more warming effect they have than CO₂ over a given time horizon (Global Warming Potential, GWP). Total in CO₂-equivalents: $CO_2e = \\sum_i m_i\\cdot GWP_i$.
- Scope 1, 2 and 3: direct emissions (1), emissions from purchased energy (2), and the rest of the value chain's indirect emissions (3).
- Circular economy: keep materials and products in use as long as possible, roughly in priority order: reduce use → repair → reuse → recycle the material.
- Energy payback time: embodied energy in a product divided by the annual energy savings or generation, giving the number of years before the product has "paid back" its own production energy.

## How to solve the problems
1. Identify the activity data (amount, distance, energy) and find the right emission or GWP factor.
2. Multiply the activity data by the factor for each source, and sum if there are several sources or gases.
3. Watch the units – emission factors are often given in grams, while the answer often needs to be in kilograms or tonnes.
4. For life cycle and energy questions: check whether you are comparing one phase (e.g. use) or the whole life cycle, and use the same functional unit for both alternatives you compare.

### Example
A car trip is 350 km long, and the car emits 120 g CO₂ per km. How many kg CO₂ does the trip emit in total?
1. Total emissions: $E = 350\\cdot 120 = 42{,}000$ g.
2. Convert to kg: $42{,}000/1000 = 42$ kg CO₂.

Answer: 42 kg CO₂.

## Common mistakes
- Comparing two products without a common functional unit (e.g. "per kilogram" versus "per unit").
- Forgetting to convert between grams, kilograms and tonnes in emission calculations.
- Assuming recycling is always the best option – reuse and reducing consumption usually rank higher in the waste hierarchy.
- Ignoring the rebound effect: a more energy-efficient solution can lead to more use, eating up part of the benefit.

> Emissions = activity data × emission factor, summed over sources: $E = \\sum_i A_i\\cdot EF_i$. Always check the units (g, kg, tonnes) and use the same functional unit when comparing.`
});

BIQ("STKD6610", 0, [
 ["Hvorfor vektes metan (CH₄) tyngre enn CO₂ når man regner om til CO₂-ekvivalenter?",
  ["Fordi metan har en høyere oppvarmingseffekt (GWP) per kilo enn CO₂ over en gitt tidshorisont", "Fordi det finnes mer metan enn CO₂ i atmosfæren", "Fordi metan er giftig for mennesker", "Fordi metan aldri brytes ned"],
  "GWP (Global Warming Potential) måler hvor mye mer varme en gass fanger enn CO₂ per kilo over f.eks. 100 år. Metan har en mye høyere GWP enn CO₂, selv om det finnes mindre av det i atmosfæren.",
  "Why is methane (CH₄) weighted more heavily than CO₂ when converting to CO₂-equivalents?",
  ["Because methane has a higher warming effect (GWP) per kilogram than CO₂ over a given time horizon", "Because there is more methane than CO₂ in the atmosphere", "Because methane is toxic to humans", "Because methane never breaks down"],
  "GWP (Global Warming Potential) measures how much more heat a gas traps than CO₂ per kilogram over, e.g., 100 years. Methane has a much higher GWP than CO₂, even though there is less of it in the atmosphere."],
 ["Et produkts levetid dobles fordi det er lettere å reparere, i stedet for at man kjøper et nytt hvert år. Hva skjer typisk med klimaavtrykket per bruksår?",
  ["Det synker, fordi den ofte utslippstunge produksjonsfasen fordeles over flere års bruk", "Det øker, fordi reparasjon alltid bruker mer energi enn ny produksjon", "Det er uendret, fordi det er det samme produktet", "Det påvirker bare avhendingsfasen"],
  "Produksjonsfasen står ofte for en stor del av et produkts totale utslipp. Når produktet varer dobbelt så lenge, fordeles disse utslippene over flere år, og klimaavtrykket per bruksår synker.",
  "A product's lifetime is doubled because it is easier to repair, instead of buying a new one every year. What typically happens to its climate footprint per year of use?",
  ["It decreases, because the often emission-heavy production phase is spread over more years of use", "It increases, because repair always uses more energy than new production", "It is unchanged, because it is the same product", "It only affects the disposal phase"],
  "The production phase often accounts for a large share of a product's total emissions. When the product lasts twice as long, these emissions are spread over more years, and the climate footprint per year of use decreases."],
 ["Hva er et eksempel på et allokeringsproblem i en livsløpsanalyse (LCA)?",
  ["Å fordele utslippene fra én prosess som gir flere produkter samtidig (biprodukter), rettferdig mellom disse produktene", "Å velge hvilken farge produktet skal ha", "Å bestemme prisen på produktet", "Å velge hvilket språk rapporten skal skrives på"],
  "Når én prosess (f.eks. et raffineri eller et sagbruk) gir flere produkter samtidig, må man bestemme hvordan de totale utslippene skal fordeles mellom produktene – for eksempel etter masse eller økonomisk verdi. Dette kalles et allokeringsproblem.",
  "What is an example of an allocation problem in a life cycle assessment (LCA)?",
  ["Distributing the emissions from one process that yields several products at once (co-products) fairly between those products", "Choosing what color the product should be", "Deciding the price of the product", "Choosing what language the report should be written in"],
  "When a single process (e.g. a refinery or a sawmill) yields several products at once, you must decide how to distribute the total emissions between the products – for example by mass or economic value. This is called an allocation problem."]
]);

GEN("STKD6610", 0,
 // enkel: karbonfotavtrykk fra en reise
 () => { const modes = [["bensinbil", "petrol car", 170], ["dieselbil", "diesel car", 160], ["elbil", "electric car", 20], ["buss", "bus", 90], ["tog", "train", 40], ["fly (innenlands)", "domestic flight", 250]];
   const mo = R.p(modes); const d = R.i(20, 600); const totalG = d * mo[2]; const kg = totalG / 1000;
   return [T(`En reise med ${mo[0]} er ${d} km lang. Utslippsfaktoren er ${mo[2]} g CO₂ per km. Hvor mange kg CO₂ slipper reisen ut totalt?`,
             `A trip by ${mo[1]} is ${d} km long. The emission factor is ${mo[2]} g CO₂ per km. How many kg CO₂ does the trip emit in total?`),
     { n: kg, tol: rel(kg, 0.01, 0.05), u: "kg" },
     T(`$E = ${d}\\cdot ${mo[2]} = ${nf(totalG)}$ g $= ${mf(kg, 2)}$ kg CO₂.`, `$E = ${d}\\cdot ${mo[2]} = ${nf(totalG)}$ g $= ${mf(kg, 2)}$ kg CO₂.`)]; },
 // eksamen: netto energibesparelse over levetid (livsløpsenergiregnskap)
 () => { let embodied, annualSave, life, net;
   do { embodied = R.p([800, 1200, 1500, 2000, 2500, 3000]); annualSave = R.p([150, 200, 250, 300, 400, 500]); life = R.i(10, 25); net = annualSave * life - embodied; } while (net < embodied * 0.5);
   const payback = embodied / annualSave;
   return [T(`Å produsere en varmepumpe krever ${nf(embodied)} kWh innebygd energi. Den sparer ${nf(annualSave)} kWh per år sammenlignet med den gamle løsningen, og har en forventet levetid på ${life} år. Hva er netto energibesparelse over hele levetiden, når man trekker fra den innebygde energien?`,
             `Manufacturing a heat pump requires ${nf(embodied)} kWh of embodied energy. It saves ${nf(annualSave)} kWh per year compared to the old solution, and has an expected lifetime of ${life} years. What is the net energy saving over its whole lifetime, once the embodied energy is subtracted?`),
     { n: net, tol: rel(net, 0.01, 5), u: "kWh" },
     T(`Total besparelse: $${nf(annualSave)}\\cdot ${life} = ${nf(annualSave * life)}$ kWh. Netto etter innebygd energi: $${nf(annualSave * life)} - ${nf(embodied)} = ${nf(net)}$ kWh. (Energitilbakebetalingstid: $${nf(embodied)}/${nf(annualSave)} \\approx ${mf(payback, 1)}$ år.)`,
       `Total savings: $${nf(annualSave)}\\cdot ${life} = ${nf(annualSave * life)}$ kWh. Net after embodied energy: $${nf(annualSave * life)} - ${nf(embodied)} = ${nf(net)}$ kWh. (Energy payback time: $${nf(embodied)}/${nf(annualSave)} \\approx ${mf(payback, 1)}$ years.)`)]; }
);

// ================= STKD6610 – enhet 1: Etikk og ansvar =================
THEORY("STKD6610", 1, {
nb: `## Hva handler det om?
Ingeniører tar hele tiden beslutninger som påvirker andre mennesker, samfunnet og miljøet – ofte lenge før konsekvensene blir synlige. Etikk gir deg verktøy til å tenke systematisk gjennom slike beslutninger, i tillegg til loven, som bare setter et minstekrav. Profesjonelle koder (f.eks. fra Tekna eller NITO) slår fast at ingeniørens ansvar for samfunnets sikkerhet, helse og velferd går foran oppdragsgiverens interesser.

## Begreper og formler
- Konsekvensetikk (f.eks. utilitarisme): vurderer en handling ut fra resultatene den fører til – størst mulig nytte for flest mulig.
- Pliktetikk (f.eks. Kant): vurderer en handling ut fra om den følger en moralsk plikt eller regel, uavhengig av utfallet.
- Dydsetikk: legger vekt på hvilken karakter og hvilke egenskaper en god person eller ingeniør har, ikke bare enkelthandlinger.
- Føre-var-prinsippet: mangel på full vitenskapelig sikkerhet skal ikke brukes som grunn til å utsette tiltak mot alvorlig eller irreversibel skade.
- Interessentanalyse: kartlegging av hvem som påvirkes av, eller kan påvirke, et prosjekt – gjøres tidlig for å fange opp konflikter før de blir dyre.
- Interessekonflikt: når personlige interesser (økonomiske, faglige, relasjonelle) kan påvirke en profesjonell vurdering. Håndteres ved å opplyse om den eller trekke seg fra saken (inhabilitet).
- Varsling: å si fra om kritikkverdige forhold, som regel gjennom interne kanaler først, og eksternt hvis det ikke fører frem.
- Dobbeltbruk (dual use): samme teknologi kan brukes både sivilt og militært, eller til både gode og skadelige formål.
- Ansvarlig innovasjon (RRI): å ta hensyn til samfunnsmessige og etiske konsekvenser tidlig i utviklingsprosessen, ikke som en etterpåklokskap.
- Personvern (GDPR): sentrale prinsipper er dataminimering (samle bare inn det som trengs) og formålsbegrensning.

## Slik løser du oppgavene
1. Kartlegg fakta og hvem som er berørt (interessentanalyse).
2. Identifiser relevante prinsipper: lovkrav, profesjonelle koder (sikkerhet først), personvernregler.
3. Vurder saken fra flere etiske vinkler: konsekvenser (utilitaristisk), plikter/regler (deontologisk), og hvilken karakter en god ingeniør ville vist (dydsetikk).
4. Bestem en handling, dokumenter begrunnelsen, og bruk interne kanaler før du eventuelt varsler eksternt.

### Eksempel
Du oppdager en programvarefeil i et medisinsk utstyr rett før lansering. Feilen kan i sjeldne tilfeller gi feil dosering. Prosjektlederen presser på for å lansere som planlagt. Hva gjør du?
1. Interessenter: pasienter (størst risiko), sykehus, arbeidsgiver, kolleger.
2. Prinsipp: koder for ingeniøretikk setter sikkerhet foran tidsfrister og kostnad.
3. Konsekvensvurdering: risikoen for pasientskade veier tyngre enn kostnaden ved forsinkelse.
4. Konklusjon: du melder fra internt umiddelbart og insisterer på at feilen rettes, eller at risikoen dokumenteres og aksepteres av rette instans, før lansering; hvis dette ignoreres, vurderer du å eskalere videre eller varsle eksternt.

Svar: sikkerhet før tidsfrist – meld fra internt først, eskaler eller varsle hvis det ikke blir hørt.

## Vanlige feil
- Å tro at «det som er lovlig, er automatisk etisk riktig» – loven er et minstekrav, ikke et etisk tak.
- Å bare vurdere konsekvensene for egen bedrift, og glemme andre berørte parter.
- Å se på varsling som første steg i stedet for siste utvei etter at interne kanaler er forsøkt.
- Å anta at teknologi er nøytral og at ingeniøren ikke har ansvar for hvordan den brukes.

> Sikkerhet, helse og velferd for samfunnet går foran oppdragsgiverens interesser. Bruk flere etiske linser (konsekvenser, plikter, karakter), kartlegg interessenter tidlig, og varsle internt før eksternt.`,
en: `## What is it about?
Engineers are constantly making decisions that affect other people, society and the environment – often long before the consequences become visible. Ethics gives you tools for thinking systematically through such decisions, in addition to the law, which only sets a minimum requirement. Professional codes (e.g. from engineering associations) state that the engineer's responsibility for public safety, health and welfare comes before the client's interests.

## Concepts and formulas
- Consequentialist ethics (e.g. utilitarianism): judges an action by the outcomes it leads to – the greatest good for the greatest number.
- Duty ethics (e.g. Kant): judges an action by whether it follows a moral duty or rule, regardless of the outcome.
- Virtue ethics: emphasizes what character and qualities a good person or engineer has, not just individual actions.
- The precautionary principle: lack of full scientific certainty must not be used as a reason to postpone measures against serious or irreversible harm.
- Stakeholder analysis: mapping who is affected by, or can affect, a project – done early to catch conflicts before they become costly.
- Conflict of interest: when personal interests (financial, professional, relational) can influence a professional judgment. Handled by disclosing it or stepping aside from the matter (recusal).
- Whistleblowing: speaking up about wrongdoing, usually through internal channels first, and externally if that doesn't work.
- Dual use: the same technology can be used for both civilian and military purposes, or for both good and harmful ends.
- Responsible innovation (RRI): considering social and ethical consequences early in the development process, not as an afterthought.
- Privacy (GDPR): key principles are data minimization (only collect what is needed) and purpose limitation.

## How to solve the problems
1. Map the facts and who is affected (stakeholder analysis).
2. Identify relevant principles: legal requirements, professional codes (safety first), privacy rules.
3. Consider the case from several ethical angles: consequences (utilitarian), duties/rules (deontological), and what character a good engineer would show (virtue ethics).
4. Decide on an action, document the reasoning, and use internal channels before considering external whistleblowing.

### Example
You discover a software bug in a medical device right before launch. In rare cases the bug can cause an incorrect dose. The project manager is pushing to launch as planned. What do you do?
1. Stakeholders: patients (highest risk), hospitals, employer, colleagues.
2. Principle: codes of engineering ethics put safety ahead of deadlines and cost.
3. Consequence assessment: the risk of patient harm outweighs the cost of a delay.
4. Conclusion: you report it internally immediately and insist that the bug is fixed, or that the risk is documented and accepted by the right authority, before launch; if this is ignored, you consider escalating further or whistleblowing externally.

Answer: safety before deadline – report internally first, escalate or blow the whistle if it isn't heard.

## Common mistakes
- Assuming "if it's legal, it's automatically ethical" – the law is a minimum requirement, not an ethical ceiling.
- Only considering the consequences for your own company, forgetting other affected parties.
- Treating whistleblowing as the first step instead of the last resort after internal channels have been tried.
- Assuming technology is neutral and that the engineer has no responsibility for how it is used.

> Public safety, health and welfare come before the client's interests. Use several ethical lenses (consequences, duties, character), map stakeholders early, and report internally before going external.`
});

BIQ("STKD6610", 1, [
 ["Hva er forholdet mellom loven og profesjonell etikk for ingeniører?",
  ["Etikk krever ofte mer enn det juridiske minstekravet – noe kan være lovlig, men likevel uetisk", "De er alltid identiske", "Etikk er mindre strengt enn loven", "Etikk gjelder bare der det ikke finnes lovverk"],
  "Loven setter et minstekrav, mens profesjonell etikk (f.eks. koder fra Tekna eller NITO) ofte forventer mer – man kan handle innenfor loven og likevel bryte med god ingeniørskikk.",
  "What is the relationship between the law and professional ethics for engineers?",
  ["Ethics often demands more than the legal minimum – something can be legal but still unethical", "They are always identical", "Ethics is less strict than the law", "Ethics only applies where there is no legislation"],
  "The law sets a minimum requirement, while professional ethics (e.g. codes from engineering associations) often expect more – you can act within the law and still violate good engineering practice."],
 ["Hva skjer vanligvis hvis et prosjektteam ikke gjennomfører en interessentanalyse før sent i utviklingen?",
  ["Konflikter og dyre, sene endringer blir mer sannsynlige, fordi berørte gruppers behov eller innvendinger dukker opp for sent", "Ingenting, berørte parter melder seg alltid selv i tide", "Prosjektet blir automatisk billigere", "Det påvirker bare markedsføringen"],
  "Interessentanalyse tidlig i prosjektet avdekker hvem som blir påvirket og hva de bryr seg om. Uten den oppdages ofte konflikter og motstand først når endringer er dyre å gjennomføre.",
  "What usually happens if a project team does not carry out a stakeholder analysis until late in development?",
  ["Conflicts and costly, late-stage changes become more likely, because affected groups' needs or objections surface too late", "Nothing, affected parties always come forward in time by themselves", "The project automatically becomes cheaper", "It only affects marketing"],
  "A stakeholder analysis early in the project reveals who is affected and what they care about. Without it, conflicts and resistance are often only discovered once changes have become expensive to make."],
 ["En ingeniør oppdager at et produkt må hoppe over en sikkerhetstest som ingeniøretiske retningslinjer krever, for å rekke leveringsfristen. Lederen presser på for å levere uansett. Hva bør ingeniøren gjøre, i tråd med ingeniøretiske retningslinjer?",
  ["Nekte å hoppe over den påkrevde sikkerhetstesten, ta opp bekymringen internt, og eskalere videre (om nødvendig varsle) hvis den blir ignorert", "Følge lederens ønske for å beholde jobben", "Levere produktet og håpe det går bra, uten å si noe", "Bare nevne det hvis en kunde klager senere"],
  "Ingeniøretiske retningslinjer setter samfunnets sikkerhet foran tidsfrister og press fra ledelsen. Riktig fremgangsmåte er å ta opp bekymringen internt først, og eskalere (eventuelt varsle) hvis den ikke blir hørt.",
  "An engineer discovers that a product must skip a safety test required by engineering codes of ethics in order to meet a delivery deadline. The manager is pushing to ship anyway. What should the engineer do, in line with engineering codes of ethics?",
  ["Refuse to skip the required safety test, raise the concern internally, and escalate further (including whistleblowing if necessary) if it is ignored", "Go along with the manager's wishes to keep the job", "Ship the product and hope for the best, without saying anything", "Only mention it if a customer complains later"],
  "Engineering codes of ethics put public safety ahead of deadlines and management pressure. The right approach is to raise the concern internally first, and escalate (including whistleblowing if necessary) if it isn't heard."]
]);

const _stkdConcepts = [
 { nb: "Et selskap velger den løsningen som gir størst mulig nytte for flest mulig, selv om noen få taper på det.", nbL: "Konsekvensetikk (utilitarisme)",
   en: "A company chooses the solution that gives the greatest benefit to the greatest number, even though a few lose out.", enL: "Consequentialist ethics (utilitarianism)" },
 { nb: "En ingeniør nekter å bryte en sikkerhetsregel, selv om det ville spart penger og trolig ingen ville blitt skadet denne gangen.", nbL: "Pliktetikk (deontologi)",
   en: "An engineer refuses to break a safety rule, even though it would save money and no one would likely be harmed this time.", enL: "Duty ethics (deontology)" },
 { nb: "En ingeniør stopper opp og spør seg selv hva en ærlig og ansvarlig fagperson ville gjort, før hun tar en beslutning.", nbL: "Dydsetikk",
   en: "An engineer stops to ask what an honest and responsible professional would do, before making a decision.", enL: "Virtue ethics" },
 { nb: "Et nytt kjemikalie kan kanskje være skadelig, men forskningen er ikke helt sikker ennå. Myndighetene innfører strenge grenseverdier likevel.", nbL: "Føre-var-prinsippet",
   en: "A new chemical might be harmful, but the research isn't fully conclusive yet. The authorities impose strict limits anyway.", enL: "The precautionary principle" },
 { nb: "En ansatt melder internt fra om at bedriften bevisst jukser med utslippsmålinger, og går til Arbeidstilsynet da ingenting skjer.", nbL: "Varsling",
   en: "An employee reports internally that the company is deliberately falsifying emissions data, and goes to the labor inspectorate when nothing happens.", enL: "Whistleblowing" },
 { nb: "En droneteknologi utviklet for landbruksovervåking viser seg også å kunne brukes til militær overvåking.", nbL: "Dobbeltbruk (dual use)",
   en: "A drone technology developed for agricultural monitoring turns out to also be usable for military surveillance.", enL: "Dual use" },
 { nb: "En innkjøpsansvarlig eier aksjer i en av leverandørene som konkurrerer om en kontrakt, og opplyser om dette før beslutningen tas.", nbL: "Interessekonflikt",
   en: "A purchasing manager owns shares in one of the suppliers competing for a contract, and discloses this before the decision is made.", enL: "Conflict of interest" }
];
const _stkdActions = [
 { nb: "Du blir bedt om å samle inn mer persondata enn det som faktisk trengs til prosjektet, angivelig for sikkerhets skyld.",
   en: "You are asked to collect more personal data than the project actually needs, supposedly just to be safe.",
   aNb: "Si nei og begrense innsamlingen til det som faktisk trengs (dataminimering)", aEn: "Say no and limit collection to what is actually needed (data minimisation)",
   exNb: "GDPR bygger på dataminimering: man skal bare samle inn det som faktisk trengs til formålet, ikke mer «for sikkerhets skyld».",
   exEn: "The GDPR is built on data minimisation: you should only collect what is actually needed for the purpose, not more \"just to be safe.\"" },
 { nb: "Et prosjekt er godt i gang før noen spør hvem som egentlig blir påvirket av det.",
   en: "A project is well underway before anyone asks who is actually affected by it.",
   aNb: "Gjennomføre en interessentanalyse så snart som mulig, selv om det er sent", aEn: "Carry out a stakeholder analysis as soon as possible, even though it is late",
   exNb: "Selv om det er sent, er det bedre å kartlegge berørte parter nå enn å la konflikter dukke opp uventet senere.",
   exEn: "Even though it is late, it is better to map the affected parties now than to let conflicts surface unexpectedly later." },
 { nb: "Du oppdager at en kollega har økonomiske interesser i et firma som konkurrerer om en kontrakt dere vurderer, og kollegaen sier ingenting om det.",
   en: "You discover that a colleague has a financial interest in a company competing for a contract you are evaluating, and the colleague says nothing about it.",
   aNb: "Be kollegaen opplyse om interessekonflikten, eller melde fra selv hvis det ikke skjer", aEn: "Ask the colleague to disclose the conflict of interest, or report it yourself if they don't",
   exNb: "En udeklarert interessekonflikt kan påvirke beslutningen og svekke tilliten til prosessen. Den bør opplyses om, eller håndteres ved at personen trekker seg fra saken.",
   exEn: "An undisclosed conflict of interest can influence the decision and undermine trust in the process. It should be disclosed, or handled by the person stepping aside from the matter." },
 { nb: "Et nytt produkt kan i sjeldne tilfeller skade brukere, men det er ikke helt sikkert ennå, og mer forskning vil ta år.",
   en: "A new product might harm users in rare cases, but this isn't fully certain yet, and more research would take years.",
   aNb: "Bruke føre-var-prinsippet og innføre forsiktighetstiltak selv uten full vitenskapelig sikkerhet", aEn: "Apply the precautionary principle and introduce safeguards even without full scientific certainty",
   exNb: "Føre-var-prinsippet sier at manglende full sikkerhet ikke skal brukes som grunn til å utsette tiltak mot mulig alvorlig skade.",
   exEn: "The precautionary principle says that a lack of full certainty should not be used as a reason to postpone measures against possible serious harm." },
 { nb: "Interne kanaler er brukt gjentatte ganger for å si fra om et alvorlig, ulovlig forhold, uten respons eller endring.",
   en: "Internal channels have been used repeatedly to report a serious, unlawful practice, with no response or change.",
   aNb: "Vurdere ekstern varsling (f.eks. til en tilsynsmyndighet), som siste utvei", aEn: "Consider external whistleblowing (e.g. to a regulator), as a last resort",
   exNb: "Når interne kanaler er forsøkt gjentatte ganger uten resultat for et alvorlig forhold, er ekstern varsling et legitimt neste steg.",
   exEn: "When internal channels have been tried repeatedly without result for a serious matter, external whistleblowing is a legitimate next step." }
];
GEN("STKD6610", 1,
 // enkel: kjenne igjen det etiske begrepet i et scenario
 () => { const idx = R.i(0, _stkdConcepts.length - 1); const item = _stkdConcepts[idx]; const others = _stkdConcepts.filter((_, i) => i !== idx);
   const wrongIdx = []; while (wrongIdx.length < 3) { const j = R.i(0, others.length - 1); if (!wrongIdx.includes(j)) wrongIdx.push(j); }
   const wrongsNb = wrongIdx.map(j => others[j].nbL); const wrongsEn = wrongIdx.map(j => others[j].enL);
   return [T(`«${item.nb}» — hvilket etisk begrep illustrerer dette best?`, `"${item.en}" — which ethical concept does this best illustrate?`),
     T([item.nbL, ...wrongsNb], [item.enL, ...wrongsEn]),
     T(`Dette er et eksempel på ${item.nbL.toLowerCase()}.`, `This is an example of ${item.enL.toLowerCase()}.`)]; },
 // eksamen: velge riktig førstesteg i en etisk dilemma-situasjon
 () => { const idx = R.i(0, _stkdActions.length - 1); const it = _stkdActions[idx];
   const wrongsNb = ["Ignorere det og fortsette som planlagt", "Vente og håpe at noen andre tar tak i det", "Gjøre det som er billigst, uansett risiko"];
   const wrongsEn = ["Ignore it and continue as planned", "Wait and hope someone else deals with it", "Do whatever is cheapest, regardless of the risk"];
   return [T(`«${it.nb}» — hva er riktig førstesteg i denne situasjonen?`, `"${it.en}" — what is the right first step in this situation?`),
     T([it.aNb, ...wrongsNb], [it.aEn, ...wrongsEn]),
     T(it.exNb, it.exEn)]; }
);

// __SLUTT_OKON__
})();
