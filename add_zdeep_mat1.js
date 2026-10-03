// ============================================================
//  add_zdeep_mat1.js – fordypning i matematikk 1P, 2P og 1T: forklaringer, regneeksempler og vanlige feil.
// ============================================================
(() => {
const M = (code, title, nb, en) => DEEP(code, title, nb, en, true);
// ===================== 1P =====================
M("VG1P", "Prosent og vekstfaktor",
`## Forstå prosent
Prosent betyr «av hundre». 7 % av noe er 7 av hver 100. Tre spørsmål går igjen:
1. **Hvor mye er p % av et tall?** Gang tallet med $\\tfrac{p}{100}$: 15 % av 600 er $600\\cdot 0{,}15 = 90$.
2. **Hvor mange prosent utgjør en del?** Del delen på det hele: 45 av 300 er $\\tfrac{45}{300} = 0{,}15 = 15\\,\\%$.
3. **Hvor mange prosent har noe økt?** Endring delt på **opprinnelig** verdi: fra 80 til 92 kr er $\\tfrac{12}{80} = 0{,}15 = 15\\,\\%$.

## Vekstfaktoren gjør det enklere
I stedet for å regne ut økningen og legge den til, ganger du med **vekstfaktoren**:
- 20 % økning: vekstfaktor 1,20. 20 % rabatt: vekstfaktor 0,80.
- **Finn tilbake** til opprinnelig pris: del på vekstfaktoren. En vare koster 750 kr etter 25 % avslag: $\\tfrac{750}{0{,}75} = 1000$ kr.
- **Mange endringer**: gang vekstfaktorene. En aksje stiger 10 % og faller så 10 %: $1{,}10\\cdot 0{,}90 = 0{,}99$ – du har tapt 1 %.
- **Samme endring mange ganger**: opphøy vekstfaktoren. 3 % rente i 5 år: $1{,}03^5 \\approx 1{,}159$, altså 15,9 % økning.

### Regneeksempel: moms
En vare koster 400 kr **uten** merverdiavgift (25 %). Med moms: $400\\cdot 1{,}25 = 500$ kr. Koster den 500 kr **med** moms, er momsen $500 - \\tfrac{500}{1{,}25} = 100$ kr – ikke $0{,}25\\cdot 500 = 125$ kr!

## Prosent og prosentpoeng
Stiger renta fra 4 % til 5 %, har den økt med **1 prosentpoeng**, men med **25 prosent** ($\\tfrac{1}{4}$). Mediene blander dette ofte.

## Vanlige feil
- Å trekke 20 % fra og legge 20 % til igjen gir **ikke** samme tall: $100\\cdot 0{,}8\\cdot 1{,}2 = 96$.
- Å finne opprinnelig pris ved å legge prosenten til den nye prisen i stedet for å dele på vekstfaktoren.
- Å dele på den nye verdien i stedet for den **opprinnelige** når du regner ut prosentvis endring.`,
`## Understanding percent
Percent means 'out of a hundred'. 7% of something is 7 in every 100. Three questions keep coming up:
1. **What is p% of a number?** Multiply by $\\tfrac{p}{100}$: 15% of 600 is $600\\cdot 0.15 = 90$.
2. **What percentage is a part?** Divide the part by the whole: 45 of 300 is $\\tfrac{45}{300} = 0.15 = 15\\%$.
3. **By what percentage has something grown?** Change divided by the **original** value: from 80 to 92 kr is $\\tfrac{12}{80} = 0.15 = 15\\%$.

## The growth factor makes it easier
Instead of working out the increase and adding it, multiply by the **growth factor**:
- 20% increase: factor 1.20. 20% discount: factor 0.80.
- **Back to the original**: divide by the growth factor. An item costs 750 kr after a 25% discount: $\\tfrac{750}{0.75} = 1000$ kr.
- **Several changes**: multiply the factors. A share rises 10% then falls 10%: $1.10\\cdot 0.90 = 0.99$ – you've lost 1%.
- **The same change many times**: raise the factor to a power. 3% interest for 5 years: $1.03^5 \\approx 1.159$, i.e. a 15.9% increase.

### Worked example: VAT
An item costs 400 kr **excluding** VAT (25%). Including VAT: $400\\cdot 1.25 = 500$ kr. If it costs 500 kr **including** VAT, the VAT is $500 - \\tfrac{500}{1.25} = 100$ kr – not $0.25\\cdot 500 = 125$ kr!

## Percent and percentage points
If the interest rate rises from 4% to 5%, it has risen by **1 percentage point** but by **25 percent** ($\\tfrac{1}{4}$). The media often mix these up.

## Common mistakes
- Taking 20% off and adding 20% back does **not** give the same number: $100\\cdot 0.8\\cdot 1.2 = 96$.
- Finding the original price by adding the percentage to the new price instead of dividing by the growth factor.
- Dividing by the new value instead of the **original** when calculating percentage change.`);

M("VG1P", "Personlig økonomi",
`## Budsjett og regnskap
Et **budsjett** er en plan for inntekter og utgifter framover, og et **regnskap** viser hva som faktisk skjedde. Dele utgiftene i **faste** (husleie, strøm, abonnementer, forsikring) og **variable** (mat, klær, fritid). Går budsjettet i **underskudd**, må du øke inntektene eller kutte utgifter. En god tommelfingerregel er å ha en **bufferkonto** som dekker et par måneders utgifter.

## Lønn, skatt og trekk
- **Bruttolønn** er lønna før skatt; **nettolønn** er det du får utbetalt.
- **Skattetrekket** står på **skattekortet**, som **tabelltrekk** eller **prosenttrekk**. Unge med lav inntekt kan ha **frikort** opp til et visst beløp.
- **Feriepenger** (vanligvis 10,2 % av fjorårets lønn) utbetales i juni i stedet for vanlig lønn.
- Overtid og **timelønn**: 37,5 timer i uka er vanlig full stilling.

## Sparing og rente
Penger i banken gir **rente**. Med **renters rente** får du rente også på renta fra før:
$$K_n = K_0\\cdot\\left(1 + \\tfrac{p}{100}\\right)^n$$
Setter du inn 10 000 kr til 4 % i 10 år, får du $10\\,000\\cdot 1{,}04^{10} \\approx 14\\,802$ kr. Jo tidligere du begynner å spare, jo mer jobber tiden for deg. **BSU** (boligsparing for ungdom) gir skattefradrag.

## Lån og kreditt
- **Nominell rente** er den oppgitte renta. **Effektiv rente** inkluderer gebyrer og hvor ofte renta legges til – bruk den når du sammenligner lån.
- **Serielån**: like store **avdrag** hver gang; terminbeløpet blir mindre over tid.
- **Annuitetslån**: like store **terminbeløp** hele tiden; i starten er det mest renter.
- **Forbrukslån** og **kredittkort** har svært høy rente (ofte 15–25 % effektiv). Betaler du ikke hele kredittkortregningen, kan gjelda vokse raskt. **Kjøp nå – betal senere** er også kreditt.

### Regneeksempel
Et forbrukslån på 20 000 kr med 20 % rente som ikke betales ned på ett år, har vokst til $20\\,000\\cdot 1{,}20 = 24\\,000$ kr. Etter tre år: $20\\,000\\cdot 1{,}2^3 \\approx 34\\,560$ kr.

## Priser og prisindeks
**Konsumprisindeksen (KPI)** måler prisutviklingen. **Reallønn** er lønna justert for prisstigning: har lønna økt 3 % og prisene 4 %, har **reallønna falt**.`,
`## Budgets and accounts
A **budget** is a plan for future income and spending, and **accounts** show what actually happened. Split costs into **fixed** (rent, electricity, subscriptions, insurance) and **variable** (food, clothes, leisure). If the budget shows a **deficit**, you must raise income or cut costs. A good rule of thumb is a **buffer account** covering a couple of months' expenses.

## Pay, tax and deductions
- **Gross pay** is pay before tax; **net pay** is what you receive.
- Tax deduction is set by your **tax card**, as a **table deduction** or **percentage deduction**. Young people on low incomes may have a **tax-exemption card** up to a certain amount.
- **Holiday pay** (usually 10.2% of last year's pay) is paid in June instead of normal pay.
- Overtime and **hourly pay**: 37.5 hours a week is a usual full-time job.

## Saving and interest
Money in the bank earns **interest**. With **compound interest** you also earn interest on earlier interest:
$$K_n = K_0\\cdot\\left(1 + \\tfrac{p}{100}\\right)^n$$
Deposit 10,000 kr at 4% for 10 years and you get $10,000\\cdot 1.04^{10} \\approx 14,802$ kr. The earlier you start saving, the more time works for you. **BSU** (home savings for young people) gives a tax deduction.

## Loans and credit
- **Nominal interest** is the stated rate. **Effective interest** includes fees and how often interest is added – use it to compare loans.
- **Serial loan**: equal **repayments** each time; the instalment shrinks over time.
- **Annuity loan**: equal **instalments** throughout; at first it's mostly interest.
- **Consumer loans** and **credit cards** have very high interest (often 15–25% effective). If you don't pay the whole card bill, debt can grow fast. **Buy now, pay later** is credit too.

### Worked example
A 20,000 kr consumer loan at 20% not repaid for a year has grown to $20,000\\cdot 1.20 = 24,000$ kr. After three years: $20,000\\cdot 1.2^3 \\approx 34,560$ kr.

## Prices and price index
The **consumer price index (CPI)** measures price development. **Real wages** are wages adjusted for inflation: if pay rose 3% and prices 4%, **real wages fell**.`);

M("VG1P", "Geometri og målestokk",
`## Omkrets, areal og volum
- **Omkrets** er lengden rundt en figur (meter). Sirkel: $O = 2\\pi r$.
- **Areal** er hvor stor flate den dekker (m²). Rektangel $l\\cdot b$, trekant $\\tfrac{g\\cdot h}{2}$, sirkel $\\pi r^2$, trapes $\\tfrac{(a+b)h}{2}$.
- **Volum** er hvor mye plass en gjenstand tar (m³). Prisme og sylinder: grunnflate · høyde ($\\pi r^2 h$). Kjegle og pyramide: $\\tfrac13$ av det. Kule: $\\tfrac43\\pi r^3$.
- **1 dm³ = 1 liter**, og 1 m³ = 1000 liter.

## Enhetsomregning – den vanligste feilen
Lengde: 1 m = 10 dm = 100 cm. Men **areal** har to dimensjoner, så 1 m² = 100 dm² = **10 000 cm²**. Og **volum** har tre: 1 m³ = 1000 dm³ = **1 000 000 cm³**. Tenk på en kvadratmeter: den er 100 cm × 100 cm.

## Pytagoras' setning
I en **rettvinklet** trekant er $a^2 + b^2 = c^2$, der $c$ er **hypotenusen** (lengst, motsatt den rette vinkelen). Brukes til å finne en ukjent side, eller sjekke om en vinkel er rett: snekkere bruker **3-4-5-regelen** ($3^2 + 4^2 = 5^2$).

### Regneeksempel
En stige på 5 m står 1,4 m ut fra veggen. Hvor høyt når den? $h = \\sqrt{5^2 - 1{,}4^2} = \\sqrt{23{,}04} = 4{,}8$ m.

## Formlike figurer og målestokk
To figurer er **formlike** når vinklene er like og sidene har samme forhold. Forstørres alle lengder med faktoren $k$, blir **arealet** $k^2$ ganger større og **volumet** $k^3$ ganger større.
**Målestokk** 1 : 50 000 betyr at 1 cm på kartet er 50 000 cm = 500 m i virkeligheten. Slik regner du:
- **Kart → virkelighet**: gang med målestokktallet. 4,2 cm på kartet = $4{,}2\\cdot 50\\,000$ cm = 2,1 km.
- **Virkelighet → kart**: del på målestokktallet. 3 km = 300 000 cm gir $\\tfrac{300\\,000}{50\\,000} = 6$ cm.
- **Areal på kart**: husk å gange med målestokktallet **i andre**.

## Vanlige feil
- Å glemme at areal- og volumenheter går i hopp på 100 og 1000.
- Å bruke Pytagoras på en trekant som ikke er rettvinklet.
- Å bruke diameter i stedet for radius i sirkelformlene.`,
`## Perimeter, area and volume
- **Perimeter** is the length around a shape (metres). Circle: $O = 2\\pi r$.
- **Area** is how much surface it covers (m²). Rectangle $l\\cdot w$, triangle $\\tfrac{b\\cdot h}{2}$, circle $\\pi r^2$, trapezium $\\tfrac{(a+b)h}{2}$.
- **Volume** is how much space an object takes (m³). Prism and cylinder: base area · height ($\\pi r^2 h$). Cone and pyramid: $\\tfrac13$ of that. Sphere: $\\tfrac43\\pi r^3$.
- **1 dm³ = 1 litre**, and 1 m³ = 1000 litres.

## Unit conversion – the commonest mistake
Length: 1 m = 10 dm = 100 cm. But **area** has two dimensions, so 1 m² = 100 dm² = **10,000 cm²**. And **volume** has three: 1 m³ = 1000 dm³ = **1,000,000 cm³**. Think of a square metre: it's 100 cm × 100 cm.

## Pythagoras' theorem
In a **right-angled** triangle $a^2 + b^2 = c^2$, where $c$ is the **hypotenuse** (longest, opposite the right angle). Use it to find an unknown side or check a right angle: carpenters use the **3-4-5 rule** ($3^2 + 4^2 = 5^2$).

### Worked example
A 5 m ladder stands 1.4 m out from a wall. How high does it reach? $h = \\sqrt{5^2 - 1.4^2} = \\sqrt{23.04} = 4.8$ m.

## Similar figures and scale
Two figures are **similar** when their angles are equal and their sides have the same ratio. If all lengths are scaled by $k$, the **area** grows $k^2$ times and the **volume** $k^3$ times.
**Scale** 1 : 50,000 means 1 cm on the map is 50,000 cm = 500 m in reality. Method:
- **Map → reality**: multiply by the scale number. 4.2 cm on the map = $4.2\\cdot 50,000$ cm = 2.1 km.
- **Reality → map**: divide by the scale number. 3 km = 300,000 cm gives $\\tfrac{300,000}{50,000} = 6$ cm.
- **Area on a map**: remember to multiply by the scale number **squared**.

## Common mistakes
- Forgetting that area and volume units jump by 100 and 1000.
- Using Pythagoras on a triangle that isn't right-angled.
- Using the diameter instead of the radius in circle formulas.`);

M("VG1P", "Lineære modeller og grafer",
`## Hva er en lineær sammenheng?
En sammenheng er **lineær** når noe øker eller minker med **like mye** for hver enhet. Grafen blir en **rett linje**, og funksjonsuttrykket er
$$f(x) = ax + b$$
- **$a$ – stigningstallet**: hvor mye $f(x)$ endrer seg når $x$ øker med 1. Positivt $a$: linja stiger. Negativt $a$: linja synker.
- **$b$ – konstantleddet**: verdien når $x = 0$, altså der linja skjærer $y$-aksen. Ofte en **fast startverdi**.

## Lag en modell fra en tekst
«Et taxiselskap tar 60 kr i startpris og 15 kr per kilometer.» Startprisen er $b = 60$, og prisen per kilometer er $a = 15$: $P(x) = 15x + 60$. En tur på 12 km koster $15\\cdot 12 + 60 = 240$ kr.

## Finn stigningstallet fra to punkter
$$a = \\frac{y_2 - y_1}{x_2 - x_1}$$
Linja gjennom (2, 7) og (6, 19) har $a = \\tfrac{19-7}{6-2} = 3$. Sett inn ett av punktene for å finne $b$: $7 = 3\\cdot 2 + b$, så $b = 1$ og $f(x) = 3x + 1$.

## Les av grafen
- **Verdien** for en gitt $x$: gå loddrett opp til grafen og vannrett bort til $y$-aksen.
- **Hvor** grafen har en bestemt verdi: løs $f(x) = k$, eller les av skjæringspunktet med den vannrette linja $y = k$.
- **Skjæringspunktet mellom to linjer** viser hvor to tilbud koster like mye – nyttig for å sammenligne abonnementer.

### Regneeksempel: hvilket abonnement?
Abonnement A: 199 kr i måneden + 0,50 kr per minutt. Abonnement B: 349 kr i måneden og fri bruk. Like dyre når $199 + 0{,}5x = 349$, altså $x = 300$ minutter. Snakker du mer enn 300 minutter i måneden, lønner B seg.

## Proporsjonalitet
Hvis $b = 0$, er sammenhengen **proporsjonal**: dobbelt så mye $x$ gir dobbelt så mye $y$ (som pris per kilo). Er $x\\cdot y$ konstant, er sammenhengen **omvendt proporsjonal** (dobbelt så mange arbeidere gir halve tiden).

## Vanlige feil
- Å bytte om $a$ og $b$ – startverdien er **konstantleddet**, endringen per enhet er **stigningstallet**.
- Å bruke en lineær modell utenfor området den gjelder for.
- Å glemme enhetene på aksene.`,
`## What is a linear relationship?
A relationship is **linear** when something rises or falls by the **same amount** for each unit. The graph is a **straight line**, and the function is
$$f(x) = ax + b$$
- **$a$ – the gradient**: how much $f(x)$ changes when $x$ increases by 1. Positive $a$: the line rises. Negative $a$: it falls.
- **$b$ – the constant term**: the value when $x = 0$, where the line crosses the $y$-axis. Often a **fixed starting value**.

## Build a model from text
'A taxi firm charges 60 kr to start and 15 kr per kilometre.' The start price is $b = 60$, the price per km is $a = 15$: $P(x) = 15x + 60$. A 12 km trip costs $15\\cdot 12 + 60 = 240$ kr.

## Find the gradient from two points
$$a = \\frac{y_2 - y_1}{x_2 - x_1}$$
The line through (2, 7) and (6, 19) has $a = \\tfrac{19-7}{6-2} = 3$. Substitute one point to find $b$: $7 = 3\\cdot 2 + b$, so $b = 1$ and $f(x) = 3x + 1$.

## Reading the graph
- **The value** for a given $x$: go straight up to the graph and across to the $y$-axis.
- **Where** the graph has a certain value: solve $f(x) = k$, or read off the intersection with the horizontal line $y = k$.
- **The intersection of two lines** shows where two offers cost the same – useful for comparing subscriptions.

### Worked example: which subscription?
Plan A: 199 kr a month + 0.50 kr per minute. Plan B: 349 kr a month, unlimited. Equal when $199 + 0.5x = 349$, i.e. $x = 300$ minutes. Talk more than 300 minutes a month and B pays off.

## Proportionality
If $b = 0$, the relationship is **proportional**: twice as much $x$ gives twice as much $y$ (like price per kilo). If $x\\cdot y$ is constant, it is **inversely proportional** (twice as many workers take half the time).

## Common mistakes
- Swapping $a$ and $b$ – the starting value is the **constant term**, the change per unit is the **gradient**.
- Using a linear model outside the range where it applies.
- Forgetting the units on the axes.`);

M("VG1P", "Sannsynlighet",
`## Grunnbegreper
- Et **forsøk** har flere mulige **utfall** (terningkast: 1–6). Alle utfallene til sammen er **utfallsrommet**.
- En **hendelse** er ett eller flere utfall («partall» = {2, 4, 6}).
- **Sannsynlighet** er et tall mellom **0** (umulig) og **1** (sikkert). Ved **like sannsynlige** utfall:
$$P(A) = \\frac{\\text{gunstige utfall}}{\\text{mulige utfall}}$$
Sannsynligheten for partall er $\\tfrac36 = \\tfrac12$.

## Komplementsetningen
Sannsynligheten for at A **ikke** skjer er $P(\\bar A) = 1 - P(A)$. Ofte er det lettere å regne ut det motsatte: Sannsynligheten for **minst én** sekser på tre kast er $1 - \\left(\\tfrac56\\right)^3 \\approx 0{,}42$.

## Flere forsøk etter hverandre
- **Uavhengige** forsøk (kast med mynt, terning, trekning **med** tilbakelegging): **gang** sannsynlighetene. To seksere på rad: $\\tfrac16\\cdot\\tfrac16 = \\tfrac{1}{36}$.
- **Avhengige** forsøk (trekning **uten** tilbakelegging): sannsynligheten endres. Trekk to røde kuler fra en bolle med 3 røde og 2 blå: $\\tfrac35\\cdot\\tfrac24 = \\tfrac{6}{20} = 0{,}3$.
- Et **valgtre** gir oversikt: gang langs greinene, og **legg sammen** de greinene som gir hendelsen du er ute etter.

## Krysstabell og venndiagram
Med en **krysstabell** kan du lese av sannsynligheter direkte. I en klasse på 30 har 18 mobilabonnement A, 12 har B, og 10 av A-brukerne er jenter. Da er sannsynligheten for at en tilfeldig elev er jente **og** har A, $\\tfrac{10}{30}$. **Venndiagram** viser hendelser som overlapper: $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$.

## Relativ frekvens
I virkeligheten vet vi ofte ikke sannsynligheten på forhånd, men kan **anslå** den med forsøk: **relativ frekvens** = antall ganger hendelsen skjedde / antall forsøk. Jo flere forsøk, jo nærmere kommer den den virkelige sannsynligheten (**store talls lov**).

## Vanlige feil
- **Spillerens feilslutning**: etter fem røde på rulett er det **ikke** større sjanse for svart. Uavhengige forsøk har ingen hukommelse.
- Å legge sammen når du skal gange (og omvendt): «og» etter hverandre → gange, «eller» → legge sammen (når hendelsene ikke kan skje samtidig).
- Å glemme at sannsynligheten endres når du trekker uten tilbakelegging.`,
`## Basic ideas
- An **experiment** has several possible **outcomes** (a die: 1–6). All outcomes together form the **sample space**.
- An **event** is one or more outcomes ('even' = {2, 4, 6}).
- **Probability** is a number between **0** (impossible) and **1** (certain). With **equally likely** outcomes:
$$P(A) = \\frac{\\text{favourable outcomes}}{\\text{possible outcomes}}$$
The probability of an even number is $\\tfrac36 = \\tfrac12$.

## The complement rule
The probability that A does **not** happen is $P(\\bar A) = 1 - P(A)$. It's often easier to work out the opposite: the probability of **at least one** six in three throws is $1 - \\left(\\tfrac56\\right)^3 \\approx 0.42$.

## Several experiments in a row
- **Independent** experiments (coins, dice, drawing **with** replacement): **multiply** probabilities. Two sixes in a row: $\\tfrac16\\cdot\\tfrac16 = \\tfrac{1}{36}$.
- **Dependent** experiments (drawing **without** replacement): probabilities change. Draw two red balls from a bowl with 3 red and 2 blue: $\\tfrac35\\cdot\\tfrac24 = \\tfrac{6}{20} = 0.3$.
- A **tree diagram** gives an overview: multiply along branches and **add** the branches that give the event you want.

## Two-way tables and Venn diagrams
With a **two-way table** you can read probabilities directly. In a class of 30, 18 have phone plan A, 12 have B, and 10 of the A users are girls. Then the probability that a random pupil is a girl **and** has A is $\\tfrac{10}{30}$. **Venn diagrams** show overlapping events: $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$.

## Relative frequency
In reality we often don't know the probability in advance but can **estimate** it by experiment: **relative frequency** = number of times the event happened / number of trials. The more trials, the closer it gets to the true probability (the **law of large numbers**).

## Common mistakes
- **The gambler's fallacy**: after five reds at roulette, black is **not** more likely. Independent trials have no memory.
- Adding when you should multiply (and vice versa): 'and' in sequence → multiply, 'or' → add (when the events can't both happen).
- Forgetting that probabilities change when drawing without replacement.`);

// ===================== 2P =====================
M("VG2P", "Statistikk",
`## Fra data til innsikt
Statistikk handler om å **samle inn**, **ordne**, **framstille** og **tolke** data. Data kan være **kategoriske** (favorittfarge, parti) eller **numeriske** (høyde, tid, inntekt).

## Sentralmål – hva er «typisk»?
- **Gjennomsnitt**: summen delt på antallet. Påvirkes mye av **ekstreme verdier**.
- **Median**: den **midterste** verdien når dataene er sortert (gjennomsnittet av de to midterste ved et partall). Påvirkes lite av ekstremverdier – derfor brukes median ofte for lønn og boligpriser.
- **Typetall** (modus): verdien som forekommer **oftest**. Det eneste sentralmålet som kan brukes på kategoriske data.

### Regneeksempel
Månedslønnene i en liten bedrift er 32, 35, 36, 38 og 120 (tusen kr). Gjennomsnittet er $\\tfrac{261}{5} = 52{,}2$ tusen – men bare én tjener så mye. Medianen er **36 tusen** og gir et mer riktig bilde av en «vanlig» lønn.

## Spredningsmål – hvor like er dataene?
- **Variasjonsbredde**: største minus minste verdi.
- **Kvartilbredde**: forskjellen mellom øvre og nedre **kvartil** (midten av øvre og nedre halvdel). Viser spredningen til de midterste 50 %.
- **Standardavvik**: hvor langt verdiene i gjennomsnitt ligger fra gjennomsnittet. Lite standardavvik betyr at dataene er samlet; stort betyr stor spredning. Regnes ut med regneark eller kalkulator.

## Grupperte data
Når dataene er delt i **klasser** (for eksempel 0–10, 10–20 …), bruker vi **klassemidtpunktet** for å anslå gjennomsnittet, og vi kan lage **histogram** og **kumulativ frekvens** (hvor mange som er under en viss verdi).

## Diagrammer – og hvordan de kan lure
- **Søylediagram** for kategorier, **histogram** for grupperte tall, **linjediagram** for utvikling over tid, **sektordiagram** for andeler av en helhet, og **boksplott** for median og kvartiler.
- Vær kritisk: En **y-akse som ikke starter på null** kan få små forskjeller til å se enorme ut. Skjeve **utvalg** gir misvisende resultater, og **korrelasjon** betyr ikke **årsakssammenheng**.

## Utvalg og populasjon
Spør du 1000 tilfeldig valgte nordmenn, er de et **utvalg** av **populasjonen**. Utvalget må være **representativt** – en spørreundersøkelse bare på Instagram når ikke de som ikke bruker Instagram. Jo større og mer tilfeldig utvalget er, jo sikrere er resultatet, men det er alltid en **feilmargin**.`,
`## From data to insight
Statistics is about **collecting**, **organising**, **presenting** and **interpreting** data. Data can be **categorical** (favourite colour, party) or **numerical** (height, time, income).

## Measures of centre – what is 'typical'?
- **Mean**: the sum divided by the count. Strongly affected by **extreme values**.
- **Median**: the **middle** value when the data are sorted (the mean of the two middle values for an even count). Little affected by extremes – that's why the median is used for pay and house prices.
- **Mode**: the value that occurs **most often**. The only measure of centre usable for categorical data.

### Worked example
Monthly pay in a small firm is 32, 35, 36, 38 and 120 (thousand kr). The mean is $\\tfrac{261}{5} = 52.2$ thousand – but only one person earns that much. The median is **36 thousand** and gives a truer picture of 'normal' pay.

## Measures of spread – how alike are the data?
- **Range**: largest minus smallest value.
- **Interquartile range**: the difference between the upper and lower **quartiles** (the middles of the upper and lower halves). Shows the spread of the middle 50%.
- **Standard deviation**: how far the values lie from the mean on average. Small means the data are clustered; large means widely spread. Calculated with a spreadsheet or calculator.

## Grouped data
When data are split into **classes** (e.g. 0–10, 10–20 …), we use the **class midpoint** to estimate the mean, and can draw a **histogram** and **cumulative frequency** (how many are below a value).

## Charts – and how they can mislead
- **Bar charts** for categories, **histograms** for grouped numbers, **line charts** for change over time, **pie charts** for shares of a whole, and **box plots** for median and quartiles.
- Be critical: a **y-axis not starting at zero** can make small differences look huge. Biased **samples** give misleading results, and **correlation** isn't **causation**.

## Sample and population
Ask 1000 randomly chosen Norwegians and they form a **sample** of the **population**. The sample must be **representative** – a survey only on Instagram misses those who don't use it. The larger and more random the sample, the more reliable the result, but there is always a **margin of error**.`);

M("VG2P", "Eksponentiell vekst",
`## Lineær eller eksponentiell?
- **Lineær vekst**: like stor **økning** hver gang (+500 kr per år).
- **Eksponentiell vekst**: like stor **prosentvis** økning hver gang (+5 % per år). Økningen blir større og større fordi den regnes av et stadig større tall.
Modellen er
$$f(x) = a\\cdot b^x$$
der $a$ er **startverdien** og $b$ er **vekstfaktoren** per tidsenhet. $b > 1$ gir vekst, $0 < b < 1$ gir nedgang (**eksponentiell avtakning**).

## Eksempler
- **Sparing**: 20 000 kr til 4 % rente: $f(x) = 20\\,000\\cdot 1{,}04^x$.
- **Verdifall på bil**: en bil til 400 000 kr som taper 15 % i året: $V(x) = 400\\,000\\cdot 0{,}85^x$. Etter 5 år: $400\\,000\\cdot 0{,}85^5 \\approx 177\\,000$ kr.
- **Befolkning**, **bakterier** og **smittespredning** i starten av en epidemi.
- **Radioaktivt henfall** og **medisin** som brytes ned i kroppen.

## Doblingstid og halveringstid
**Doblingstiden** er tiden det tar før verdien har **doblet** seg. Med 7 % vekst dobles verdien omtrent hvert 10. år. En nyttig tommelfingerregel er **70-regelen**: doblingstid ≈ $\\tfrac{70}{p}$. **Halveringstiden** er tilsvarende tiden det tar å halvere seg. Finn den nøyaktig ved å løse $b^x = 2$ (eller $\\tfrac12$) grafisk eller med logaritmer.

## Finn vekstfaktoren
Fra to verdier: hvis noe har gått fra 500 til 800 på 6 år, er $b^6 = \\tfrac{800}{500} = 1{,}6$, så $b = 1{,}6^{1/6} \\approx 1{,}081$ – en årlig vekst på 8,1 %.
Med **regresjon** i et digitalt verktøy kan du finne den eksponentielle modellen som passer best til en datatabell.

## Hvorfor eksponentiell vekst overrasker oss
Hjernen vår tenker lineært. Et kjent eksempel: legger du 1 riskorn på første rute på et sjakkbrett, 2 på neste, 4 på neste og så videre, trenger du på den siste ruten $2^{63}$ korn – mer ris enn det har blitt dyrket i hele verdens historie. Derfor er det viktig å oppdage eksponentiell vekst **tidlig**, som ved smitte eller gjeld.

## Vanlige feil
- Å bruke $1{,}15$ i stedet for $0{,}85$ ved 15 % nedgang.
- Å tro at 10 % økning i fem år er 50 % – det er $1{,}1^5 \\approx 1{,}61$, altså 61 %.
- Å bruke en eksponentiell modell langt utenfor dataene – ingen vekst kan fortsette eksponentielt for alltid.`,
`## Linear or exponential?
- **Linear growth**: the same **increase** each time (+500 kr a year).
- **Exponential growth**: the same **percentage** increase each time (+5% a year). The increase gets bigger and bigger because it's taken of an ever larger number.
The model is
$$f(x) = a\\cdot b^x$$
where $a$ is the **starting value** and $b$ the **growth factor** per time unit. $b > 1$ gives growth, $0 < b < 1$ decline (**exponential decay**).

## Examples
- **Savings**: 20,000 kr at 4% interest: $f(x) = 20,000\\cdot 1.04^x$.
- **Car depreciation**: a 400,000 kr car losing 15% a year: $V(x) = 400,000\\cdot 0.85^x$. After 5 years: $400,000\\cdot 0.85^5 \\approx 177,000$ kr.
- **Population**, **bacteria** and **infection** early in an epidemic.
- **Radioactive decay** and **medicine** broken down in the body.

## Doubling time and half-life
The **doubling time** is the time for the value to **double**. At 7% growth it doubles roughly every 10 years. A useful rule of thumb is the **rule of 70**: doubling time ≈ $\\tfrac{70}{p}$. The **half-life** is likewise the time to halve. Find it exactly by solving $b^x = 2$ (or $\\tfrac12$) graphically or with logarithms.

## Finding the growth factor
From two values: if something went from 500 to 800 in 6 years, $b^6 = \\tfrac{800}{500} = 1.6$, so $b = 1.6^{1/6} \\approx 1.081$ – an annual growth of 8.1%.
With **regression** in a digital tool you can find the exponential model that best fits a data table.

## Why exponential growth surprises us
Our brains think linearly. A classic example: put 1 grain of rice on the first square of a chessboard, 2 on the next, 4 on the next and so on, and the last square needs $2^{63}$ grains – more rice than has been grown in all of history. That's why it's important to spot exponential growth **early**, as with infection or debt.

## Common mistakes
- Using $1.15$ instead of $0.85$ for a 15% decrease.
- Thinking 10% a year for five years is 50% – it's $1.1^5 \\approx 1.61$, i.e. 61%.
- Using an exponential model far outside the data – no growth can stay exponential for ever.`);

M("VG2P", "Potenser og standardform",
`## Potenser
En potens $a^n$ betyr $a$ ganget med seg selv $n$ ganger: $2^5 = 2\\cdot 2\\cdot 2\\cdot 2\\cdot 2 = 32$. $a$ er **grunntallet** og $n$ er **eksponenten**.

## Potensreglene
- $a^m\\cdot a^n = a^{m+n}$ (gange: **legg sammen** eksponentene)
- $\\dfrac{a^m}{a^n} = a^{m-n}$ (dele: **trekk fra**)
- $(a^m)^n = a^{m\\cdot n}$
- $(a\\cdot b)^n = a^n\\cdot b^n$
- $a^0 = 1$ (for $a \\ne 0$)
- $a^{-n} = \\dfrac{1}{a^n}$ – en negativ eksponent betyr «én delt på»: $10^{-3} = \\tfrac{1}{1000} = 0{,}001$.

## Standardform
Svært store og svært små tall skrives på **standardform**: $a\\cdot 10^n$, der $1 \\le a < 10$ og $n$ er et helt tall.
- Avstanden til sola: 150 000 000 km = $1{,}5\\cdot 10^8$ km.
- Diameteren til et rødt blodlegeme: 0,000 007 m = $7\\cdot 10^{-6}$ m.
**Slik gjør du det**: flytt kommaet til det står ett siffer (ikke null) foran. Eksponenten er antall plasser du flyttet – **positiv** hvis tallet var stort, **negativ** hvis det var lite.

## Regning med standardform
- **Gange**: gang tallene og legg sammen eksponentene. $(3\\cdot 10^4)(2\\cdot 10^5) = 6\\cdot 10^9$.
- **Dele**: del tallene og trekk fra eksponentene. $\\dfrac{8\\cdot 10^6}{4\\cdot 10^2} = 2\\cdot 10^4$.
- Hvis tallet foran blir 10 eller større, juster: $15\\cdot 10^3 = 1{,}5\\cdot 10^4$.
- **Legge sammen**: skriv om til samme tierpotens først.

### Regneeksempel
Lyset går $3{,}0\\cdot 10^8$ m/s. Hvor lang tid bruker det fra sola ($1{,}5\\cdot 10^{11}$ m)?
$$t = \\frac{1{,}5\\cdot 10^{11}}{3{,}0\\cdot 10^8} = 0{,}5\\cdot 10^3 = 500\\ \\text{s} \\approx 8\\ \\text{min}$$

## Prefikser
Mange enheter bruker tierpotenser: **kilo** ($10^3$), **mega** ($10^6$), **giga** ($10^9$), **milli** ($10^{-3}$), **mikro** ($10^{-6}$) og **nano** ($10^{-9}$). 1 GB = $10^9$ byte, og 1 µm = $10^{-6}$ m.

## Vanlige feil
- $2^3\\cdot 2^4 = 2^{12}$ – feil! Det er $2^7$.
- $(-3)^2 = 9$, men $-3^2 = -9$ (potensen regnes før minustegnet).
- Å skrive $25\\cdot 10^3$ som standardform – tallet foran må være mindre enn 10: $2{,}5\\cdot 10^4$.`,
`## Powers
A power $a^n$ means $a$ multiplied by itself $n$ times: $2^5 = 2\\cdot 2\\cdot 2\\cdot 2\\cdot 2 = 32$. $a$ is the **base** and $n$ the **exponent**.

## The laws of indices
- $a^m\\cdot a^n = a^{m+n}$ (multiply: **add** the exponents)
- $\\dfrac{a^m}{a^n} = a^{m-n}$ (divide: **subtract**)
- $(a^m)^n = a^{m\\cdot n}$
- $(a\\cdot b)^n = a^n\\cdot b^n$
- $a^0 = 1$ (for $a \\ne 0$)
- $a^{-n} = \\dfrac{1}{a^n}$ – a negative exponent means 'one over': $10^{-3} = \\tfrac{1}{1000} = 0.001$.

## Standard form
Very large and very small numbers are written in **standard form**: $a\\cdot 10^n$, where $1 \\le a < 10$ and $n$ is an integer.
- Distance to the Sun: 150,000,000 km = $1.5\\cdot 10^8$ km.
- Diameter of a red blood cell: 0.000007 m = $7\\cdot 10^{-6}$ m.
**How to do it**: move the decimal point until one non-zero digit is in front. The exponent is the number of places moved – **positive** if the number was large, **negative** if it was small.

## Calculating in standard form
- **Multiply**: multiply the numbers and add the exponents. $(3\\cdot 10^4)(2\\cdot 10^5) = 6\\cdot 10^9$.
- **Divide**: divide the numbers and subtract the exponents. $\\dfrac{8\\cdot 10^6}{4\\cdot 10^2} = 2\\cdot 10^4$.
- If the front number becomes 10 or more, adjust: $15\\cdot 10^3 = 1.5\\cdot 10^4$.
- **Add**: rewrite to the same power of ten first.

### Worked example
Light travels at $3.0\\cdot 10^8$ m/s. How long does it take from the Sun ($1.5\\cdot 10^{11}$ m)?
$$t = \\frac{1.5\\cdot 10^{11}}{3.0\\cdot 10^8} = 0.5\\cdot 10^3 = 500\\ \\text{s} \\approx 8\\ \\text{min}$$

## Prefixes
Many units use powers of ten: **kilo** ($10^3$), **mega** ($10^6$), **giga** ($10^9$), **milli** ($10^{-3}$), **micro** ($10^{-6}$) and **nano** ($10^{-9}$). 1 GB = $10^9$ bytes, and 1 µm = $10^{-6}$ m.

## Common mistakes
- $2^3\\cdot 2^4 = 2^{12}$ – wrong! It's $2^7$.
- $(-3)^2 = 9$, but $-3^2 = -9$ (the power is evaluated before the minus sign).
- Writing $25\\cdot 10^3$ as standard form – the front number must be less than 10: $2.5\\cdot 10^4$.`);

// ===================== 1T =====================
M("VG1T", "Algebra og likninger",
`## Regnerekkefølge og forenkling
Regn i denne rekkefølgen: **parenteser → potenser → gange og dele → pluss og minus**. Når du forenkler, samler du **like ledd**: $3x + 5 - x + 2 = 2x + 7$. Du kan bare legge sammen ledd med **samme bokstav og samme potens** – $x$ og $x^2$ er ikke like ledd.

## Kvadratsetningene
- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- $(a + b)(a - b) = a^2 - b^2$ (**konjugatsetningen**)
De brukes begge veier: til å **gange ut** og til å **faktorisere**. $x^2 - 9 = (x+3)(x-3)$.

## Likninger av første grad
Målet er å få $x$ alene. Du kan gjøre **det samme på begge sider**: legge til, trekke fra, gange eller dele med samme tall (ikke null).
$$3(x - 2) = x + 8 \\Rightarrow 3x - 6 = x + 8 \\Rightarrow 2x = 14 \\Rightarrow x = 7$$
**Sett prøve**: $3(7-2) = 15$ og $7 + 8 = 15$ ✓.

### Brøklikninger
Gang med **fellesnevneren** for å bli kvitt brøkene: $\\tfrac{x}{2} + \\tfrac{x}{3} = 5 \\Rightarrow 3x + 2x = 30 \\Rightarrow x = 6$.

## Likninger av andre grad
En andregradslikning kan skrives $ax^2 + bx + c = 0$ og har **0, 1 eller 2** løsninger.
- Mangler $c$: faktoriser ut $x$. $x^2 - 5x = 0 \\Rightarrow x(x-5) = 0 \\Rightarrow x = 0 \\lor x = 5$.
- Mangler $b$: $x^2 = 16 \\Rightarrow x = \\pm 4$.
- Generelt: **abc-formelen**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
**Diskriminanten** $b^2 - 4ac$ avgjør antall løsninger: positiv → 2, null → 1, negativ → ingen (reelle).

## Likningssett
To likninger med to ukjente kan løses med
- **innsettingsmetoden**: løs den ene for én ukjent og sett inn i den andre, eller
- **addisjonsmetoden**: legg sammen likningene slik at én ukjent forsvinner.
Grafisk er løsningen **skjæringspunktet** mellom to grafer.

### Regneeksempel
$x + y = 10$ og $2x - y = 5$. Legg sammen: $3x = 15$, så $x = 5$ og $y = 5$.

## Formler og omforming
Å løse en formel for en annen størrelse er det samme som å løse en likning: $v = \\tfrac{s}{t} \\Rightarrow t = \\tfrac{s}{v}$.

## Vanlige feil
- $(a + b)^2 = a^2 + b^2$ – glemmer det doble produktet $2ab$.
- Å dele på $x$ i en likning som $x^2 = 3x$ – da mister du løsningen $x = 0$.
- Fortegnsfeil når du ganger ut en minus foran en parentes: $-(x - 3) = -x + 3$.`,
`## Order of operations and simplifying
Calculate in this order: **brackets → powers → multiply and divide → add and subtract**. When simplifying, collect **like terms**: $3x + 5 - x + 2 = 2x + 7$. You can only add terms with the **same letter and power** – $x$ and $x^2$ are not like terms.

## The square identities
- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- $(a + b)(a - b) = a^2 - b^2$ (**difference of two squares**)
They work both ways: to **expand** and to **factorise**. $x^2 - 9 = (x+3)(x-3)$.

## Linear equations
The aim is to get $x$ alone. You can do **the same to both sides**: add, subtract, multiply or divide by the same number (not zero).
$$3(x - 2) = x + 8 \\Rightarrow 3x - 6 = x + 8 \\Rightarrow 2x = 14 \\Rightarrow x = 7$$
**Check**: $3(7-2) = 15$ and $7 + 8 = 15$ ✓.

### Equations with fractions
Multiply by the **common denominator** to clear fractions: $\\tfrac{x}{2} + \\tfrac{x}{3} = 5 \\Rightarrow 3x + 2x = 30 \\Rightarrow x = 6$.

## Quadratic equations
A quadratic equation can be written $ax^2 + bx + c = 0$ and has **0, 1 or 2** solutions.
- No $c$: factor out $x$. $x^2 - 5x = 0 \\Rightarrow x(x-5) = 0 \\Rightarrow x = 0 \\lor x = 5$.
- No $b$: $x^2 = 16 \\Rightarrow x = \\pm 4$.
- In general: the **quadratic formula**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
The **discriminant** $b^2 - 4ac$ decides the number of solutions: positive → 2, zero → 1, negative → none (real).

## Simultaneous equations
Two equations in two unknowns can be solved by
- **substitution**: solve one for one unknown and substitute into the other, or
- **elimination**: add the equations so one unknown disappears.
Graphically the solution is the **intersection** of two graphs.

### Worked example
$x + y = 10$ and $2x - y = 5$. Add: $3x = 15$, so $x = 5$ and $y = 5$.

## Formulas and rearranging
Solving a formula for another quantity is just like solving an equation: $v = \\tfrac{s}{t} \\Rightarrow t = \\tfrac{s}{v}$.

## Common mistakes
- $(a + b)^2 = a^2 + b^2$ – forgetting the double product $2ab$.
- Dividing by $x$ in an equation like $x^2 = 3x$ – you lose the solution $x = 0$.
- Sign errors when multiplying out a minus in front of brackets: $-(x - 3) = -x + 3$.`);

M("VG1T", "Funksjoner",
`## Hva er en funksjon?
En **funksjon** er en regel som gir **nøyaktig én** utverdi $f(x)$ for hver innverdi $x$. Mengden av tillatte $x$-verdier er **definisjonsmengden**, og mengden av $y$-verdier funksjonen kan få, er **verdimengden**. En funksjon kan beskrives med **uttrykk**, **tabell**, **graf** eller **ord**.

## Lineære funksjoner
$f(x) = ax + b$: rett linje med stigningstall $a$ og konstantledd $b$. Linja gjennom to punkter har $a = \\tfrac{y_2 - y_1}{x_2 - x_1}$, og **ettpunktsformelen** gir likningen: $y - y_1 = a(x - x_1)$.

## Andregradsfunksjoner
$f(x) = ax^2 + bx + c$ gir en **parabel**:
- $a > 0$: «smilende» parabel med **bunnpunkt**. $a < 0$: «sur» parabel med **toppunkt**.
- **Symmetrilinja** går gjennom topp- eller bunnpunktet: $x = -\\tfrac{b}{2a}$.
- **Nullpunktene** finnes ved å løse $f(x) = 0$.
- **Skjæring med y-aksen**: $f(0) = c$.

### Regneeksempel
$f(x) = x^2 - 4x + 3$. Symmetrilinje: $x = \\tfrac{4}{2} = 2$, bunnpunkt $f(2) = -1$, altså $(2, -1)$. Nullpunkter: $x^2 - 4x + 3 = (x-1)(x-3) = 0$ gir $x = 1$ og $x = 3$.

## Andre viktige funksjonstyper
- **Polynomfunksjoner** av høyere grad, som $x^3 - 3x$, kan ha flere topp- og bunnpunkter.
- **Rasjonale funksjoner** (brøkfunksjoner), som $f(x) = \\tfrac{1}{x}$, har **asymptoter** – linjer grafen nærmer seg uten å nå. $\\tfrac1x$ har en **vertikal asymptote** $x = 0$ og en **horisontal** $y = 0$.
- **Eksponentialfunksjoner** $f(x) = a\\cdot b^x$ og **potensfunksjoner** $f(x) = a\\cdot x^b$.

## Lese og tolke grafer
- **Nullpunkt**: der grafen skjærer $x$-aksen.
- **Ekstremalpunkt**: topp- og bunnpunkter.
- **Stigende/avtakende**: hvor grafen går opp eller ned.
- **Skjæringspunkt** mellom to grafer: løs $f(x) = g(x)$.
- **Gjennomsnittlig vekstfart** mellom $x_1$ og $x_2$: $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ – stigningstallet til linja gjennom de to punktene.

## Funksjoner som modeller
I virkeligheten bruker vi funksjoner som **modeller**: høyden til en ball (andregrads), temperatur over døgnet, kostnader i en bedrift. Med **regresjon** i GeoGebra kan du finne funksjonen som passer best til målte data. Vurder alltid **gyldighetsområdet** – en modell for høyden til en ball gjelder bare til den treffer bakken.`,
`## What is a function?
A **function** is a rule that gives **exactly one** output $f(x)$ for each input $x$. The set of allowed $x$-values is the **domain**, and the set of $y$-values it can take is the **range**. A function can be described by an **expression**, **table**, **graph** or **words**.

## Linear functions
$f(x) = ax + b$: a straight line with gradient $a$ and constant term $b$. The line through two points has $a = \\tfrac{y_2 - y_1}{x_2 - x_1}$, and the **point–slope form** gives the equation: $y - y_1 = a(x - x_1)$.

## Quadratic functions
$f(x) = ax^2 + bx + c$ gives a **parabola**:
- $a > 0$: a 'smiling' parabola with a **minimum**. $a < 0$: a 'frowning' one with a **maximum**.
- The **axis of symmetry** passes through the vertex: $x = -\\tfrac{b}{2a}$.
- **Zeros** are found by solving $f(x) = 0$.
- **y-intercept**: $f(0) = c$.

### Worked example
$f(x) = x^2 - 4x + 3$. Axis of symmetry: $x = \\tfrac{4}{2} = 2$, minimum $f(2) = -1$, i.e. $(2, -1)$. Zeros: $x^2 - 4x + 3 = (x-1)(x-3) = 0$ gives $x = 1$ and $x = 3$.

## Other important types
- **Polynomials** of higher degree, like $x^3 - 3x$, can have several turning points.
- **Rational functions**, like $f(x) = \\tfrac{1}{x}$, have **asymptotes** – lines the graph approaches but never reaches. $\\tfrac1x$ has a **vertical asymptote** $x = 0$ and a **horizontal** one $y = 0$.
- **Exponential functions** $f(x) = a\\cdot b^x$ and **power functions** $f(x) = a\\cdot x^b$.

## Reading and interpreting graphs
- **Zero**: where the graph crosses the $x$-axis.
- **Turning points**: maxima and minima.
- **Increasing/decreasing**: where the graph goes up or down.
- **Intersection** of two graphs: solve $f(x) = g(x)$.
- **Average rate of change** between $x_1$ and $x_2$: $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ – the gradient of the line through the two points.

## Functions as models
In real life we use functions as **models**: the height of a ball (quadratic), temperature through the day, a company's costs. With **regression** in GeoGebra you can find the function that best fits measured data. Always consider the **range of validity** – a model of a ball's height only applies until it hits the ground.`);

M("VG1T", "Derivasjon og vekstfart",
`## Gjennomsnittlig og momentan vekstfart
**Gjennomsnittlig vekstfart** mellom to punkter er stigningstallet til linja gjennom dem (en **sekant**). Den **momentane vekstfarten** i ett punkt er stigningstallet til **tangenten** – linja som så vidt berører grafen der. Den momentane vekstfarten kalles **den deriverte**, $f'(x)$.

Tenk på en bil: gjennomsnittsfarten på en tur er sekanten, mens det speedometeret viser i ett øyeblikk, er den deriverte av posisjonen.

## Definisjonen
Den deriverte er grenseverdien av gjennomsnittlig vekstfart når avstanden mellom punktene går mot null:
$$f'(x) = \\lim_{\\Delta x \\to 0}\\frac{f(x + \\Delta x) - f(x)}{\\Delta x}$$

## Derivasjonsreglene
- $(c)' = 0$ (konstanter forsvinner)
- $(x^n)' = n\\,x^{n-1}$ (**potensregelen**)
- $(c\\cdot f)' = c\\cdot f'$
- $(f + g)' = f' + g'$
Eksempel: $f(x) = 2x^3 - 5x^2 + 4x - 7$ gir $f'(x) = 6x^2 - 10x + 4$.

## Bruk av den deriverte
- **Tangentlikning** i punktet $(a, f(a))$: $y - f(a) = f'(a)(x - a)$.
- **Fortegnslinje for $f'$**: der $f' > 0$ er $f$ **voksende**, der $f' < 0$ er $f$ **avtakende**.
- **Topp- og bunnpunkter**: der $f'(x) = 0$ og $f'$ skifter fortegn. Fra + til − gir **toppunkt**, fra − til + gir **bunnpunkt**.

### Regneeksempel
$f(x) = x^3 - 3x$. $f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$, som er null for $x = \\pm 1$. Fortegnslinja viser $f' > 0$ for $x < -1$, $f' < 0$ mellom $-1$ og $1$, og $f' > 0$ for $x > 1$. Altså er $(-1, 2)$ et **toppunkt** og $(1, -2)$ et **bunnpunkt**.

## Praktiske tolkninger
- Er $s(t)$ posisjon, er $s'(t)$ **fart**.
- Er $K(x)$ kostnaden ved å produsere $x$ enheter, er $K'(x)$ **grensekostnaden** – omtrent hva én enhet til koster.
- Er $T(t)$ temperatur, forteller $T'(t)$ hvor raskt temperaturen endrer seg (°C per time).
Den deriverte har alltid **enheten** «enhet for $y$ per enhet for $x$».

## Vanlige feil
- $(x^3)' = 3x^3$ – feil, eksponenten reduseres: $3x^2$.
- Å glemme at konstantledd blir null.
- Å tro at $f'(a) = 0$ alltid er topp eller bunn – sjekk at fortegnet skifter ($x^3$ har $f'(0) = 0$, men verken topp eller bunn).`,
`## Average and instantaneous rate of change
The **average rate of change** between two points is the gradient of the line through them (a **secant**). The **instantaneous rate of change** at one point is the gradient of the **tangent** – the line that just touches the graph there. The instantaneous rate of change is called **the derivative**, $f'(x)$.

Think of a car: the average speed over a trip is the secant, while what the speedometer shows at an instant is the derivative of position.

## The definition
The derivative is the limit of the average rate of change as the distance between the points goes to zero:
$$f'(x) = \\lim_{\\Delta x \\to 0}\\frac{f(x + \\Delta x) - f(x)}{\\Delta x}$$

## Differentiation rules
- $(c)' = 0$ (constants vanish)
- $(x^n)' = n\\,x^{n-1}$ (the **power rule**)
- $(c\\cdot f)' = c\\cdot f'$
- $(f + g)' = f' + g'$
Example: $f(x) = 2x^3 - 5x^2 + 4x - 7$ gives $f'(x) = 6x^2 - 10x + 4$.

## Using the derivative
- **Tangent equation** at $(a, f(a))$: $y - f(a) = f'(a)(x - a)$.
- **Sign chart for $f'$**: where $f' > 0$, $f$ is **increasing**; where $f' < 0$, $f$ is **decreasing**.
- **Maxima and minima**: where $f'(x) = 0$ and $f'$ changes sign. From + to − gives a **maximum**, from − to + a **minimum**.

### Worked example
$f(x) = x^3 - 3x$. $f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$, which is zero at $x = \\pm 1$. The sign chart shows $f' > 0$ for $x < -1$, $f' < 0$ between $-1$ and $1$, and $f' > 0$ for $x > 1$. So $(-1, 2)$ is a **maximum** and $(1, -2)$ a **minimum**.

## Practical interpretations
- If $s(t)$ is position, $s'(t)$ is **velocity**.
- If $K(x)$ is the cost of producing $x$ units, $K'(x)$ is the **marginal cost** – roughly what one more unit costs.
- If $T(t)$ is temperature, $T'(t)$ tells how fast it changes (°C per hour).
The derivative always has the **unit** 'unit of $y$ per unit of $x$'.

## Common mistakes
- $(x^3)' = 3x^3$ – wrong, the exponent drops: $3x^2$.
- Forgetting that constant terms become zero.
- Thinking $f'(a) = 0$ is always a max or min – check the sign changes ($x^3$ has $f'(0) = 0$ but neither).`);

M("VG1T", "Trigonometri",
`## Trigonometri i rettvinklede trekanter
I en rettvinklet trekant med en spiss vinkel $v$ kaller vi sidene **hypotenusen** (lengst), **motstående katet** (overfor $v$) og **hosliggende katet** (inntil $v$):
$$\\sin v = \\frac{\\text{motstående}}{\\text{hypotenus}} \\qquad \\cos v = \\frac{\\text{hosliggende}}{\\text{hypotenus}} \\qquad \\tan v = \\frac{\\text{motstående}}{\\text{hosliggende}}$$
Huskeregel: **SOH – CAH – TOA**. Kjenner du en vinkel og en side, finner du de andre sidene; kjenner du to sider, finner du vinkelen med $\\sin^{-1}$, $\\cos^{-1}$ eller $\\tan^{-1}$.

### Regneeksempel
En rampe skal stige 0,6 m over en vannrett lengde på 7,2 m. Hvor bratt er den? $\\tan v = \\tfrac{0{,}6}{7{,}2} \\approx 0{,}083$, så $v \\approx 4{,}8°$.

## Arealsetningen
Kjenner du to sider og vinkelen mellom dem i **hvilken som helst** trekant:
$$A = \\tfrac12\\,ab\\sin C$$

## Sinussetningen
$$\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}$$
Brukes når du kjenner **to vinkler og en side**, eller **to sider og en vinkel som ikke ligger mellom dem**. Det siste tilfellet kan gi **to mulige trekanter**, fordi $\\sin v = \\sin(180° - v)$.

## Cosinussetningen
$$c^2 = a^2 + b^2 - 2ab\\cos C$$
Brukes når du kjenner **tre sider** (for å finne en vinkel) eller **to sider og vinkelen mellom dem** (for å finne den tredje siden). Er $C = 90°$, blir $\\cos C = 0$ og setningen blir **Pytagoras**.

### Regneeksempel
To veger går ut fra et kryss med 70° vinkel. Etter 3 km og 5 km: avstanden mellom punktene er $c = \\sqrt{3^2 + 5^2 - 2\\cdot 3\\cdot 5\\cos 70°} \\approx \\sqrt{23{,}7} \\approx 4{,}9$ km.

## Hvilken setning skal jeg bruke?
- Rettvinklet trekant → **sin, cos, tan** og **Pytagoras**.
- To sider + vinkelen mellom → **cosinussetningen** (side) eller **arealsetningen** (areal).
- Tre sider → **cosinussetningen** (vinkel).
- To vinkler + en side → **sinussetningen**.

## Enhetssirkelen
Vinkler over 90° defineres med **enhetssirkelen** (radius 1): punktet på sirkelen for vinkelen $v$ har koordinatene $(\\cos v, \\sin v)$. Derfor er $\\cos v$ negativ for stumpe vinkler.

## Vanlige feil
- Kalkulatoren står på **radianer** i stedet for **grader**.
- Å bruke sinus, cosinus og tangens i trekanter som ikke er rettvinklede.
- Å glemme den andre mulige vinkelen med sinussetningen.`,
`## Trigonometry in right-angled triangles
In a right-angled triangle with an acute angle $v$, the sides are the **hypotenuse** (longest), the **opposite** side (across from $v$) and the **adjacent** side (next to $v$):
$$\\sin v = \\frac{\\text{opposite}}{\\text{hypotenuse}} \\qquad \\cos v = \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\qquad \\tan v = \\frac{\\text{opposite}}{\\text{adjacent}}$$
Mnemonic: **SOH – CAH – TOA**. Know an angle and a side and you can find the other sides; know two sides and you can find the angle with $\\sin^{-1}$, $\\cos^{-1}$ or $\\tan^{-1}$.

### Worked example
A ramp must rise 0.6 m over a horizontal length of 7.2 m. How steep is it? $\\tan v = \\tfrac{0.6}{7.2} \\approx 0.083$, so $v \\approx 4.8°$.

## The area formula
If you know two sides and the angle between them in **any** triangle:
$$A = \\tfrac12\\,ab\\sin C$$

## The sine rule
$$\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}$$
Use it when you know **two angles and a side**, or **two sides and an angle not between them**. The latter can give **two possible triangles**, because $\\sin v = \\sin(180° - v)$.

## The cosine rule
$$c^2 = a^2 + b^2 - 2ab\\cos C$$
Use it when you know **three sides** (to find an angle) or **two sides and the angle between them** (to find the third side). If $C = 90°$, $\\cos C = 0$ and the rule becomes **Pythagoras**.

### Worked example
Two roads leave a junction at 70°. After 3 km and 5 km, the distance between the points is $c = \\sqrt{3^2 + 5^2 - 2\\cdot 3\\cdot 5\\cos 70°} \\approx \\sqrt{23.7} \\approx 4.9$ km.

## Which rule should I use?
- Right-angled triangle → **sin, cos, tan** and **Pythagoras**.
- Two sides + the angle between → **cosine rule** (side) or **area formula** (area).
- Three sides → **cosine rule** (angle).
- Two angles + a side → **sine rule**.

## The unit circle
Angles over 90° are defined with the **unit circle** (radius 1): the point on the circle for angle $v$ has coordinates $(\\cos v, \\sin v)$. That's why $\\cos v$ is negative for obtuse angles.

## Common mistakes
- The calculator is in **radians** instead of **degrees**.
- Using sine, cosine and tangent in triangles that aren't right-angled.
- Forgetting the second possible angle with the sine rule.`);

M("VG1T", "Ulikheter og fortegnslinjer",
`## Hva er en ulikhet?
En ulikhet sammenligner to uttrykk med $<$, $\\le$, $>$ eller $\\ge$. Løsningen er vanligvis et helt **intervall** av tall, ikke ett enkelt tall.

## Lineære ulikheter
Løses nesten som likninger – med én viktig regel: **ganger eller deler du med et negativt tall, snur ulikhetstegnet**.
$$-2x + 6 > 0 \\Rightarrow -2x > -6 \\Rightarrow x < 3$$
Prøv med et tall: $x = 0$ gir $6 > 0$ ✓ og $x = 5$ gir $-4 > 0$ ✗.

## Fortegnslinjer
For produkter og brøker lager vi en **fortegnslinje** for hver faktor:
1. Faktoriser uttrykket.
2. Finn **nullpunktene** til hver faktor.
3. Tegn en linje for hver faktor: heltrukket der den er **positiv**, stiplet der den er **negativ**, og **0** i nullpunktet.
4. Finn fortegnet til **produktet** (eller brøken) ved å telle minuser: et partall minuser gir pluss.
5. Les av hvor uttrykket har ønsket fortegn.

### Regneeksempel: andregrad
Løs $x^2 - x - 6 \\le 0$. Faktoriser: $(x - 3)(x + 2) \\le 0$. Nullpunkter: $x = -2$ og $x = 3$. Produktet er negativt **mellom** nullpunktene, og 0 i dem. Løsning: $-2 \\le x \\le 3$, altså $x \\in [-2, 3]$.

### Regneeksempel: brøk
Løs $\\dfrac{x + 1}{x - 2} > 0$. Nullpunkt i telleren: $x = -1$. Nevneren er null i $x = 2$ – der er uttrykket **ikke definert** (markeres med × på fortegnslinja). Brøken er positiv for $x < -1$ og $x > 2$.

## Intervaller
- $[a, b]$: lukket – endepunktene er med.
- $\\langle a, b\\rangle$ (eller $(a, b)$): åpent – endepunktene er ikke med.
- $\\langle\\leftarrow, a]$ og $[a, \\rightarrow\\rangle$: alt til venstre eller høyre for $a$.

## Grafisk løsning
Løsningen av $f(x) > g(x)$ er de $x$-verdiene der grafen til $f$ ligger **over** grafen til $g$. Finn skjæringspunktene og les av. Det er en god måte å kontrollere svaret på.

## Vanlige feil
- Å glemme å **snu tegnet** ved deling med negativt tall.
- Å dele på et uttrykk med $x$ (som kan være negativt) – bruk fortegnslinje i stedet.
- Å ta med verdier der nevneren er null.`,
`## What is an inequality?
An inequality compares two expressions with $<$, $\\le$, $>$ or $\\ge$. The solution is usually a whole **interval** of numbers, not a single number.

## Linear inequalities
Solved almost like equations – with one key rule: **if you multiply or divide by a negative number, flip the inequality sign**.
$$-2x + 6 > 0 \\Rightarrow -2x > -6 \\Rightarrow x < 3$$
Test a number: $x = 0$ gives $6 > 0$ ✓ and $x = 5$ gives $-4 > 0$ ✗.

## Sign charts
For products and fractions we draw a **sign line** for each factor:
1. Factorise the expression.
2. Find the **zeros** of each factor.
3. Draw a line for each factor: solid where it's **positive**, dashed where **negative**, and **0** at the zero.
4. Find the sign of the **product** (or fraction) by counting minuses: an even number gives plus.
5. Read off where the expression has the required sign.

### Worked example: quadratic
Solve $x^2 - x - 6 \\le 0$. Factorise: $(x - 3)(x + 2) \\le 0$. Zeros: $x = -2$ and $x = 3$. The product is negative **between** the zeros and 0 at them. Solution: $-2 \\le x \\le 3$, i.e. $x \\in [-2, 3]$.

### Worked example: fraction
Solve $\\dfrac{x + 1}{x - 2} > 0$. Zero of the numerator: $x = -1$. The denominator is zero at $x = 2$ – the expression is **undefined** there (marked × on the chart). The fraction is positive for $x < -1$ and $x > 2$.

## Intervals
- $[a, b]$: closed – the endpoints are included.
- $(a, b)$: open – the endpoints are excluded.
- $(-\\infty, a]$ and $[a, \\infty)$: everything left or right of $a$.

## Graphical solution
The solution of $f(x) > g(x)$ is the $x$-values where the graph of $f$ lies **above** that of $g$. Find the intersections and read off. It's a good way to check your answer.

## Common mistakes
- Forgetting to **flip the sign** when dividing by a negative number.
- Dividing by an expression containing $x$ (which may be negative) – use a sign chart instead.
- Including values where the denominator is zero.`);

M("VG1T", "Faktorisering og polynomdivisjon",
`## Hvorfor faktorisere?
Å **faktorisere** er å skrive et uttrykk som et **produkt**. Det gjør det lett å finne **nullpunkter** (et produkt er null når én faktor er null), å **forkorte brøker** og å lage **fortegnslinjer**.

## Metoder
1. **Felles faktor**: $6x^2 + 9x = 3x(2x + 3)$.
2. **Kvadratsetningene baklengs**: $x^2 + 10x + 25 = (x + 5)^2$, og $4x^2 - 9 = (2x + 3)(2x - 3)$.
3. **Andregradsuttrykk**: finn nullpunktene $x_1$ og $x_2$, og skriv
$$ax^2 + bx + c = a(x - x_1)(x - x_2)$$
Eksempel: $2x^2 - 2x - 12$ har nullpunktene $x = 3$ og $x = -2$, så det er $2(x - 3)(x + 2)$.
4. **Sum–produkt-metoden** (når $a = 1$): finn to tall som har **sum** $b$ og **produkt** $c$. For $x^2 + 5x + 6$: 2 og 3, altså $(x + 2)(x + 3)$.

## Forkorting av brøker
Du kan bare forkorte **faktorer**, ikke ledd:
$$\\frac{x^2 - 4}{x^2 + 2x} = \\frac{(x - 2)(x + 2)}{x(x + 2)} = \\frac{x - 2}{x}, \\quad x \\ne -2$$
Å «stryke» $x^2$ i $\\tfrac{x^2 + 1}{x^2}$ er en klassisk feil.

## Polynomdivisjon
Polynomer kan deles på samme måte som vanlige tall med «oppstilling». Hvis $x = a$ er et **nullpunkt** i polynomet $P(x)$, går divisjonen $P(x) : (x - a)$ **opp** – uten rest (**faktorteoremet**).

### Regneeksempel
$P(x) = x^3 - 6x^2 + 11x - 6$. Vi prøver $x = 1$: $1 - 6 + 11 - 6 = 0$, så $(x - 1)$ er en faktor. Polynomdivisjonen $P(x) : (x - 1)$ gir $x^2 - 5x + 6 = (x - 2)(x - 3)$. Dermed er
$$P(x) = (x - 1)(x - 2)(x - 3)$$
og nullpunktene er 1, 2 og 3.

**Tips**: Heltallige nullpunkter må være **faktorer i konstantleddet** (her ±1, ±2, ±3, ±6). Prøv dem først.

## Når polynomet ikke kan faktoriseres
Hvis diskriminanten $b^2 - 4ac < 0$, har andregradsuttrykket **ingen reelle nullpunkter** og kan ikke faktoriseres i førstegradsfaktorer. Da har det samme fortegn for alle $x$.

## Vanlige feil
- Å glemme $a$ foran i $a(x - x_1)(x - x_2)$.
- Fortegnsfeil: nullpunktet $x = -2$ gir faktoren $(x + 2)$.
- Å forkorte ledd i stedet for faktorer.`,
`## Why factorise?
To **factorise** is to write an expression as a **product**. That makes it easy to find **zeros** (a product is zero when one factor is zero), **simplify fractions** and draw **sign charts**.

## Methods
1. **Common factor**: $6x^2 + 9x = 3x(2x + 3)$.
2. **Square identities in reverse**: $x^2 + 10x + 25 = (x + 5)^2$, and $4x^2 - 9 = (2x + 3)(2x - 3)$.
3. **Quadratics**: find the zeros $x_1$ and $x_2$ and write
$$ax^2 + bx + c = a(x - x_1)(x - x_2)$$
Example: $2x^2 - 2x - 12$ has zeros $x = 3$ and $x = -2$, so it is $2(x - 3)(x + 2)$.
4. **Sum–product method** (when $a = 1$): find two numbers with **sum** $b$ and **product** $c$. For $x^2 + 5x + 6$: 2 and 3, so $(x + 2)(x + 3)$.

## Simplifying fractions
You can only cancel **factors**, not terms:
$$\\frac{x^2 - 4}{x^2 + 2x} = \\frac{(x - 2)(x + 2)}{x(x + 2)} = \\frac{x - 2}{x}, \\quad x \\ne -2$$
'Cancelling' $x^2$ in $\\tfrac{x^2 + 1}{x^2}$ is a classic mistake.

## Polynomial division
Polynomials can be divided like ordinary numbers using long division. If $x = a$ is a **zero** of the polynomial $P(x)$, the division $P(x) : (x - a)$ comes out **exactly** – with no remainder (the **factor theorem**).

### Worked example
$P(x) = x^3 - 6x^2 + 11x - 6$. Try $x = 1$: $1 - 6 + 11 - 6 = 0$, so $(x - 1)$ is a factor. Dividing $P(x)$ by $(x - 1)$ gives $x^2 - 5x + 6 = (x - 2)(x - 3)$. So
$$P(x) = (x - 1)(x - 2)(x - 3)$$
and the zeros are 1, 2 and 3.

**Tip**: integer zeros must be **factors of the constant term** (here ±1, ±2, ±3, ±6). Try them first.

## When a polynomial can't be factorised
If the discriminant $b^2 - 4ac < 0$, the quadratic has **no real zeros** and can't be factorised into linear factors. It then has the same sign for all $x$.

## Common mistakes
- Forgetting the $a$ in front of $a(x - x_1)(x - x_2)$.
- Sign errors: the zero $x = -2$ gives the factor $(x + 2)$.
- Cancelling terms instead of factors.`);

M("VG1T", "Potenser, røtter og logaritmer",
`## Røtter som potenser
En **kvadratrot** er det tallet som ganget med seg selv gir tallet under rottegnet: $\\sqrt{25} = 5$. Generelt er den $n$-te roten $\\sqrt[n]{a}$ det tallet som opphøyd i $n$ gir $a$. Røtter kan skrives som potenser med **brøkeksponent**:
$$\\sqrt{a} = a^{1/2}, \\qquad \\sqrt[n]{a} = a^{1/n}, \\qquad \\sqrt[n]{a^m} = a^{m/n}$$
Da gjelder alle potensreglene: $\\sqrt{x}\\cdot x^2 = x^{1/2 + 2} = x^{5/2}$.

## Regneregler for røtter
- $\\sqrt{a\\cdot b} = \\sqrt a\\cdot\\sqrt b$: $\\sqrt{50} = \\sqrt{25\\cdot 2} = 5\\sqrt 2$.
- $\\sqrt{\\tfrac{a}{b}} = \\tfrac{\\sqrt a}{\\sqrt b}$.
- Men $\\sqrt{a + b} \\ne \\sqrt a + \\sqrt b$! ($\\sqrt{9 + 16} = 5$, ikke 7.)
- **Rasjonalisering**: fjern rot fra nevneren ved å gange over og under: $\\tfrac{1}{\\sqrt 2} = \\tfrac{\\sqrt 2}{2}$.

## Logaritmer
**Logaritmen** svarer på spørsmålet «hva må jeg opphøye grunntallet i for å få dette tallet?». Med grunntall 10:
$$\\lg x = y \\iff 10^y = x$$
$\\lg 1000 = 3$ fordi $10^3 = 1000$, og $\\lg 0{,}01 = -2$. Logaritmen er bare definert for **positive** tall. Den **naturlige logaritmen** $\\ln x$ har grunntall $e \\approx 2{,}718$.

## Logaritmereglene
- $\\lg(a\\cdot b) = \\lg a + \\lg b$
- $\\lg\\tfrac{a}{b} = \\lg a - \\lg b$
- $\\lg a^x = x\\cdot\\lg a$ – den viktigste: den henter **eksponenten ned**.
- $\\lg 10 = 1$ og $\\lg 1 = 0$.

## Eksponentiallikninger
Når den ukjente står i **eksponenten**, tar vi logaritmen på begge sider:
$$5\\cdot 1{,}04^x = 8 \\Rightarrow 1{,}04^x = 1{,}6 \\Rightarrow x\\lg 1{,}04 = \\lg 1{,}6 \\Rightarrow x = \\frac{\\lg 1{,}6}{\\lg 1{,}04} \\approx 12{,}0$$
Det tar altså 12 år før et beløp med 4 % rente har vokst med 60 %.

## Logaritmer i virkeligheten
Mange skalaer er **logaritmiske**, fordi de dekker et enormt spenn: **pH** ($-\\lg[H_3O^+]$), **desibel** for lyd (10 dB mer = 10 ganger så mye lydintensitet) og **magnitude** for jordskjelv. Ett trinn opp betyr altså **mange ganger** mer.

## Vanlige feil
- $\\lg(a + b) = \\lg a + \\lg b$ – feil! Regelen gjelder **produkt**, ikke sum.
- Å ta logaritmen av null eller et negativt tall.
- Å glemme å isolere potensen før du tar logaritmen ($5\\cdot 1{,}04^x$ – del på 5 først).`,
`## Roots as powers
A **square root** is the number that multiplied by itself gives the number under the root: $\\sqrt{25} = 5$. In general the $n$th root $\\sqrt[n]{a}$ is the number which raised to $n$ gives $a$. Roots can be written as powers with **fractional exponents**:
$$\\sqrt{a} = a^{1/2}, \\qquad \\sqrt[n]{a} = a^{1/n}, \\qquad \\sqrt[n]{a^m} = a^{m/n}$$
Then all the index laws apply: $\\sqrt{x}\\cdot x^2 = x^{1/2 + 2} = x^{5/2}$.

## Rules for roots
- $\\sqrt{a\\cdot b} = \\sqrt a\\cdot\\sqrt b$: $\\sqrt{50} = \\sqrt{25\\cdot 2} = 5\\sqrt 2$.
- $\\sqrt{\\tfrac{a}{b}} = \\tfrac{\\sqrt a}{\\sqrt b}$.
- But $\\sqrt{a + b} \\ne \\sqrt a + \\sqrt b$! ($\\sqrt{9 + 16} = 5$, not 7.)
- **Rationalising**: remove a root from the denominator by multiplying top and bottom: $\\tfrac{1}{\\sqrt 2} = \\tfrac{\\sqrt 2}{2}$.

## Logarithms
The **logarithm** answers 'what power must I raise the base to, to get this number?'. With base 10:
$$\\lg x = y \\iff 10^y = x$$
$\\lg 1000 = 3$ because $10^3 = 1000$, and $\\lg 0.01 = -2$. The logarithm is only defined for **positive** numbers. The **natural logarithm** $\\ln x$ has base $e \\approx 2.718$.

## The laws of logarithms
- $\\lg(a\\cdot b) = \\lg a + \\lg b$
- $\\lg\\tfrac{a}{b} = \\lg a - \\lg b$
- $\\lg a^x = x\\cdot\\lg a$ – the most important: it **brings the exponent down**.
- $\\lg 10 = 1$ and $\\lg 1 = 0$.

## Exponential equations
When the unknown is in the **exponent**, take the logarithm of both sides:
$$5\\cdot 1.04^x = 8 \\Rightarrow 1.04^x = 1.6 \\Rightarrow x\\lg 1.04 = \\lg 1.6 \\Rightarrow x = \\frac{\\lg 1.6}{\\lg 1.04} \\approx 12.0$$
So it takes 12 years for a sum at 4% interest to grow by 60%.

## Logarithms in real life
Many scales are **logarithmic** because they cover a huge range: **pH** ($-\\lg[H_3O^+]$), **decibels** for sound (10 dB more = 10 times the sound intensity) and earthquake **magnitude**. One step up means **many times** more.

## Common mistakes
- $\\lg(a + b) = \\lg a + \\lg b$ – wrong! The rule is for a **product**, not a sum.
- Taking the logarithm of zero or a negative number.
- Forgetting to isolate the power before taking logs ($5\\cdot 1.04^x$ – divide by 5 first).`);

M("VG1T", "Eksponentielle modeller",
`## Når passer en eksponentiell modell?
En størrelse vokser eller avtar **eksponentielt** når den endrer seg med **samme prosent** per tidsenhet. Modellen er $f(t) = a\\cdot b^t$, der $a = f(0)$ er startverdien og $b$ er vekstfaktoren. Kjennetegn i en tabell: **forholdet** mellom to påfølgende verdier er konstant (ikke differansen, som ved lineær vekst).

## Lag modellen
- **Fra tekst**: «Befolkningen er 12 000 og vokser med 2,5 % i året» gir $B(t) = 12\\,000\\cdot 1{,}025^t$.
- **Fra to punkter**: hvis $f(0) = 400$ og $f(5) = 250$, er $b^5 = \\tfrac{250}{400} = 0{,}625$ og $b = 0{,}625^{1/5} \\approx 0{,}910$ – en nedgang på 9,0 % per tidsenhet.
- **Fra data**: bruk **eksponentiell regresjon** i GeoGebra eller regneark.

## Bruk modellen
- **Verdi ved et tidspunkt**: sett inn $t$.
- **Når nås en verdi?** Løs $a\\cdot b^t = k$ med logaritmer: $t = \\dfrac{\\lg(k/a)}{\\lg b}$ – eller grafisk.
- **Doblings- og halveringstid**: løs $b^t = 2$ eller $b^t = \\tfrac12$.

### Regneeksempel: medisin
Et legemiddel brytes ned slik at 30 % forsvinner hver time. En pasient får 400 mg. $M(t) = 400\\cdot 0{,}70^t$. Når er det under 50 mg igjen?
$$0{,}70^t = 0{,}125 \\Rightarrow t = \\frac{\\lg 0{,}125}{\\lg 0{,}70} \\approx 5{,}8\\ \\text{timer}$$
Halveringstiden er $\\tfrac{\\lg 0{,}5}{\\lg 0{,}7} \\approx 1{,}9$ timer.

## Vekst mot en grense
I virkeligheten kan ingen vekst fortsette eksponentielt for alltid – mat, plass eller andre ressurser tar slutt. Da passer ofte en **logistisk modell**, der veksten er eksponentiell i starten, men flater ut mot en **bæreevne** $K$:
$$f(t) = \\frac{K}{1 + a\\cdot e^{-kt}}$$
Smittespredning, salg av ny teknologi og populasjoner i et avgrenset område følger ofte slike S-kurver.

## Vurder modellen
Spør alltid: Passer modellen til dataene (se på grafen)? For hvilket **tidsrom** er den gyldig? Hva skjer hvis vi bruker den langt fram i tid? Hvilke **forutsetninger** ligger bak – for eksempel konstant rente eller uendret fødselstall?

## Vanlige feil
- Å bruke $t$ = årstall i stedet for antall år etter start.
- Å blande vekstfaktor og prosent: 3 % nedgang er $b = 0{,}97$, ikke $b = -0{,}03$.
- Å stole blindt på modellen langt utenfor dataene.`,
`## When does an exponential model fit?
A quantity grows or decays **exponentially** when it changes by the **same percentage** per time unit. The model is $f(t) = a\\cdot b^t$, where $a = f(0)$ is the starting value and $b$ the growth factor. A sign in a table: the **ratio** between successive values is constant (not the difference, as with linear growth).

## Build the model
- **From text**: 'The population is 12,000 and grows by 2.5% a year' gives $B(t) = 12,000\\cdot 1.025^t$.
- **From two points**: if $f(0) = 400$ and $f(5) = 250$, then $b^5 = \\tfrac{250}{400} = 0.625$ and $b = 0.625^{1/5} \\approx 0.910$ – a 9.0% decrease per time unit.
- **From data**: use **exponential regression** in GeoGebra or a spreadsheet.

## Use the model
- **Value at a time**: substitute $t$.
- **When is a value reached?** Solve $a\\cdot b^t = k$ with logs: $t = \\dfrac{\\lg(k/a)}{\\lg b}$ – or graphically.
- **Doubling time and half-life**: solve $b^t = 2$ or $b^t = \\tfrac12$.

### Worked example: medicine
A drug is broken down so that 30% disappears each hour. A patient receives 400 mg. $M(t) = 400\\cdot 0.70^t$. When is less than 50 mg left?
$$0.70^t = 0.125 \\Rightarrow t = \\frac{\\lg 0.125}{\\lg 0.70} \\approx 5.8\\ \\text{hours}$$
The half-life is $\\tfrac{\\lg 0.5}{\\lg 0.7} \\approx 1.9$ hours.

## Growth towards a limit
In reality no growth can stay exponential for ever – food, space or other resources run out. Then a **logistic model** often fits, with exponential growth at first that levels off towards a **carrying capacity** $K$:
$$f(t) = \\frac{K}{1 + a\\cdot e^{-kt}}$$
Epidemics, the uptake of new technology and populations in a limited area often follow such S-curves.

## Evaluate the model
Always ask: does the model fit the data (look at the graph)? Over what **time span** is it valid? What happens if we use it far into the future? What **assumptions** lie behind it – e.g. constant interest or unchanged birth rates?

## Common mistakes
- Using $t$ = the calendar year instead of years after the start.
- Mixing growth factor and percentage: a 3% decrease is $b = 0.97$, not $b = -0.03$.
- Trusting the model blindly far outside the data.`);
})();
