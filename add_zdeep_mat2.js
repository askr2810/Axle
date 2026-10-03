// ============================================================
//  add_zdeep_mat2.js – fordypning i S1, S2 og temaer som deles med R1/R2 og økonomifagene (OMAT, OSTAT).
//  DEEPT legger samme tekst på alle enheter med samme tittel.
// ============================================================
(() => {
const ALL = ["VGS1", "VGS2", "VGR1", "VGR2", "OMAT", "OSTAT"];
const M = (titles, nb, en) => DEEPT(titles, nb, en, true, ALL);

M("Funksjoner og modeller",
`## Fra virkelighet til funksjon
En **matematisk modell** er en forenklet beskrivelse av en sammenheng i virkeligheten. Slik lager du en:
1. Finn ut hva som er **variabelen** ($x$, for eksempel tid eller antall) og hva som avhenger av den ($y$).
2. Se på **mønsteret**: Øker det like mye hver gang (**lineær**)? Like mange **prosent** (**eksponentiell**)? Har det et topp- eller bunnpunkt (**andregrads**)? Øker det stadig saktere (**potens** eller **logaritmisk**)?
3. Lag funksjonsuttrykket – fra opplysninger i teksten eller med **regresjon**.
4. **Kontroller**: passer modellen til dataene? For hvilke $x$ er den gyldig?

## Oversikt over modelltyper
- **Lineær**: $f(x) = ax + b$ – fast økning per enhet (taxipris, lønn per time).
- **Andregrads**: $f(x) = ax^2 + bx + c$ – ett toppunkt eller bunnpunkt (kast, overskudd).
- **Eksponentiell**: $f(x) = a\\cdot b^x$ – fast prosentvis endring (renter, befolkning).
- **Potens**: $f(x) = a\\cdot x^b$ – for eksempel areal og volum som funksjon av lengde.
- **Rasjonal**: $f(x) = \\tfrac{a}{x} + b$ – for eksempel kostnad per enhet, som synker når antallet øker.

## Regresjon
Med **regresjon** i GeoGebra eller regneark finner datamaskinen den funksjonen av en valgt type som passer best til punktene (minste kvadraters metode). Velg modelltype ut fra **sammenhengen** og **formen** på punktene – ikke bare ut fra hvilken som gir best tall. **Forklaringsgraden** $R^2$ (mellom 0 og 1) sier hvor godt modellen passer.

### Regneeksempel
Antall abonnenter på en strømmetjeneste var 20, 26, 34 og 44 tusen etter 0, 1, 2 og 3 år. Forholdene $\\tfrac{26}{20} = 1{,}30$, $\\tfrac{34}{26} \\approx 1{,}31$, $\\tfrac{44}{34} \\approx 1{,}29$ er nesten like – en eksponentiell modell $A(x) = 20\\cdot 1{,}3^x$ passer godt. Etter 5 år gir modellen $20\\cdot 1{,}3^5 \\approx 74$ tusen.

## Tolk modellen
Bruk modellen til å svare på praktiske spørsmål: Når passeres en grense? Hva er største verdi? Hvor raskt vokser det nå (**vekstfart**)? Svar med **enheter** og hele setninger.

## Modellens begrensninger
Alle modeller er forenklinger. En eksponentiell modell for abonnenter vil til slutt gi flere kunder enn det finnes mennesker. Vurder alltid **gyldighetsområdet**, og si noe om **forutsetningene**.`,
`## From reality to a function
A **mathematical model** is a simplified description of a real relationship. How to build one:
1. Decide which is the **variable** ($x$, e.g. time or quantity) and what depends on it ($y$).
2. Look at the **pattern**: does it rise by the same amount each time (**linear**)? By the same **percentage** (**exponential**)? Does it have a maximum or minimum (**quadratic**)? Does it grow ever more slowly (**power** or **logarithmic**)?
3. Write the function – from the information given or by **regression**.
4. **Check**: does the model fit the data? For which $x$ is it valid?

## Overview of model types
- **Linear**: $f(x) = ax + b$ – fixed increase per unit (taxi fares, hourly pay).
- **Quadratic**: $f(x) = ax^2 + bx + c$ – one maximum or minimum (projectiles, profit).
- **Exponential**: $f(x) = a\\cdot b^x$ – fixed percentage change (interest, population).
- **Power**: $f(x) = a\\cdot x^b$ – e.g. area and volume as functions of length.
- **Rational**: $f(x) = \\tfrac{a}{x} + b$ – e.g. cost per unit, which falls as the quantity rises.

## Regression
With **regression** in GeoGebra or a spreadsheet the computer finds the function of a chosen type that best fits the points (least squares). Choose the model type from the **context** and the **shape** of the points – not just whichever gives the best number. The **coefficient of determination** $R^2$ (between 0 and 1) says how well the model fits.

### Worked example
Subscribers to a streaming service were 20, 26, 34 and 44 thousand after 0, 1, 2 and 3 years. The ratios $\\tfrac{26}{20} = 1.30$, $\\tfrac{34}{26} \\approx 1.31$, $\\tfrac{44}{34} \\approx 1.29$ are almost equal – an exponential model $A(x) = 20\\cdot 1.3^x$ fits well. After 5 years it gives $20\\cdot 1.3^5 \\approx 74$ thousand.

## Interpret the model
Use the model to answer practical questions: when is a limit passed? What is the largest value? How fast is it growing now (**rate of change**)? Answer with **units** and full sentences.

## Limitations
All models are simplifications. An exponential model of subscribers will eventually give more customers than there are people. Always consider the **range of validity** and state the **assumptions**.`);

M(["Derivasjon og optimering", "Optimering"],
`## Hva er optimering?
**Optimering** er å finne den **største** eller **minste** verdien en størrelse kan få: størst overskudd, minst materialbruk, kortest tid. Den deriverte er verktøyet: i et **toppunkt** eller **bunnpunkt** på en glatt graf er tangenten vannrett, så $f'(x) = 0$.

## Fremgangsmåte
1. **Les oppgaven** og finn ut hva som skal maksimeres eller minimeres.
2. **Lag en funksjon** av én variabel for størrelsen. Ofte må du bruke en **bibetingelse** (en sammenheng mellom to variabler) til å bli kvitt den ene.
3. Finn **definisjonsmengden** – hvilke verdier variabelen kan ha i praksis.
4. **Deriver**, og løs $f'(x) = 0$.
5. Bruk **fortegnslinje** for $f'$ (eller den andrederiverte) for å avgjøre om det er topp eller bunn.
6. Sjekk også **endepunktene** i definisjonsmengden – største eller minste verdi kan ligge der.
7. **Svar** på spørsmålet med enheter.

### Regneeksempel 1: Største areal
Du har 40 m gjerde og skal lage en rektangulær innhegning inntil en husvegg (vegg på én side). Hvilke mål gir størst areal?
- La bredden ut fra veggen være $x$. Da er lengden langs veggen $40 - 2x$.
- Areal: $A(x) = x(40 - 2x) = 40x - 2x^2$, med $0 < x < 20$.
- $A'(x) = 40 - 4x = 0$ gir $x = 10$. $A'$ går fra + til −, så det er et **toppunkt**.
- Svar: 10 m ut fra veggen og 20 m langs den gir $A = 200$ m².

### Regneeksempel 2: Største overskudd
En bedrift har overskuddet $O(x) = -0{,}5x^2 + 120x - 3000$ kr ved salg av $x$ enheter. $O'(x) = -x + 120 = 0$ gir $x = 120$ enheter, og $O(120) = 4200$ kr.

## Den andrederiverte
$f''(x)$ forteller hvordan stigningen endrer seg – om grafen **krummer** opp eller ned. Er $f'(a) = 0$ og $f''(a) < 0$, er det et **toppunkt**; er $f''(a) > 0$, er det et **bunnpunkt**. **Vendepunkt** er der krumningen skifter, og $f''$ skifter fortegn.

## Vanlige feil
- Å ikke bruke bibetingelsen og dermed ha to ukjente.
- Å glemme å sjekke endepunktene.
- Å svare med $x$-verdien når spørsmålet var den **største verdien** (eller omvendt).`,
`## What is optimisation?
**Optimisation** is finding the **largest** or **smallest** value a quantity can take: the biggest profit, the least material, the shortest time. The derivative is the tool: at a **maximum** or **minimum** of a smooth graph the tangent is horizontal, so $f'(x) = 0$.

## Method
1. **Read the problem** and decide what is to be maximised or minimised.
2. **Write a function** of one variable for that quantity. Often you must use a **constraint** (a relation between two variables) to eliminate one.
3. Find the **domain** – which values the variable can take in practice.
4. **Differentiate** and solve $f'(x) = 0$.
5. Use a **sign chart** for $f'$ (or the second derivative) to decide max or min.
6. Also check the **endpoints** of the domain – the largest or smallest value may be there.
7. **Answer** the question with units.

### Worked example 1: Largest area
You have 40 m of fencing for a rectangular pen against a house wall (wall on one side). Which dimensions give the largest area?
- Let the width out from the wall be $x$. Then the length along the wall is $40 - 2x$.
- Area: $A(x) = x(40 - 2x) = 40x - 2x^2$, with $0 < x < 20$.
- $A'(x) = 40 - 4x = 0$ gives $x = 10$. $A'$ goes from + to −, so it's a **maximum**.
- Answer: 10 m out from the wall and 20 m along it give $A = 200$ m².

### Worked example 2: Maximum profit
A company's profit is $O(x) = -0.5x^2 + 120x - 3000$ kr from selling $x$ units. $O'(x) = -x + 120 = 0$ gives $x = 120$ units, and $O(120) = 4200$ kr.

## The second derivative
$f''(x)$ tells how the gradient changes – whether the graph **curves** up or down. If $f'(a) = 0$ and $f''(a) < 0$, it's a **maximum**; if $f''(a) > 0$, a **minimum**. An **inflection point** is where the curvature changes and $f''$ changes sign.

## Common mistakes
- Not using the constraint and so having two unknowns.
- Forgetting to check the endpoints.
- Answering with the $x$-value when the question asked for the **largest value** (or vice versa).`);

M("Kostnad, inntekt og overskudd",
`## De tre funksjonene
- **Kostnadsfunksjonen** $K(x)$: hva det koster å produsere $x$ enheter. Den består av **faste kostnader** (husleie, maskiner – uavhengig av $x$) og **variable kostnader** (råvarer, timelønn – øker med $x$).
- **Inntektsfunksjonen** $I(x)$: hva bedriften får inn. Med fast pris $p$ er $I(x) = p\\cdot x$. Hvis prisen må senkes for å selge flere, blir $I(x)$ ofte en andregradsfunksjon.
- **Overskuddsfunksjonen** $O(x) = I(x) - K(x)$.

## Viktige begreper
- **Nullpunkt / break-even**: der $I(x) = K(x)$, altså $O(x) = 0$. Selger bedriften mer, går den med overskudd.
- **Enhetskostnad** (gjennomsnittskostnad): $E(x) = \\dfrac{K(x)}{x}$ – kostnaden per enhet. Den er ofte høy ved små kvanta (faste kostnader fordeles på få enheter) og lavest ved et bestemt antall.
- **Grensekostnad** $K'(x)$: omtrent hva det koster å lage **én enhet til**.
- **Grenseinntekt** $I'(x)$: omtrent hva én solgt enhet til gir i inntekt.

## Største overskudd
Overskuddet er størst der $O'(x) = 0$, altså der
$$I'(x) = K'(x)$$
– **grenseinntekt = grensekostnad**. Er grenseinntekten større enn grensekostnaden, lønner det seg å produsere mer; er den mindre, lønner det seg å produsere mindre.

### Regneeksempel
En bedrift har $K(x) = 0{,}2x^2 + 20x + 5000$ og selger til fast pris 100 kr, så $I(x) = 100x$.
- $O(x) = 100x - 0{,}2x^2 - 20x - 5000 = -0{,}2x^2 + 80x - 5000$.
- $O'(x) = -0{,}4x + 80 = 0$ gir $x = 200$ enheter.
- $O(200) = -8000 + 16\\,000 - 5000 = 3000$ kr.
- Kontroll: $K'(200) = 0{,}4\\cdot 200 + 20 = 100 = I'(200)$ ✓.

## Lavest enhetskostnad
Enhetskostnaden er lavest der $E'(x) = 0$. Et nyttig resultat: der er **enhetskostnaden lik grensekostnaden**. I eksemplet: $E(x) = 0{,}2x + 20 + \\tfrac{5000}{x}$, og $E'(x) = 0{,}2 - \\tfrac{5000}{x^2} = 0$ gir $x \\approx 158$.

## Tolkning
Svar alltid i **sammenhengen**: «Bedriften bør produsere og selge 200 enheter per uke. Da blir overskuddet 3000 kr.» Vurder også om svaret er realistisk – for eksempel om produksjonskapasiteten holder.`,
`## The three functions
- **The cost function** $K(x)$: what it costs to produce $x$ units. It consists of **fixed costs** (rent, machines – independent of $x$) and **variable costs** (materials, hourly wages – rising with $x$).
- **The revenue function** $I(x)$: what the firm takes in. At a fixed price $p$, $I(x) = p\\cdot x$. If the price must be cut to sell more, $I(x)$ is often quadratic.
- **The profit function** $O(x) = I(x) - K(x)$.

## Key ideas
- **Break-even**: where $I(x) = K(x)$, i.e. $O(x) = 0$. Sell more and the firm makes a profit.
- **Unit cost** (average cost): $E(x) = \\dfrac{K(x)}{x}$ – cost per unit. Often high at small volumes (fixed costs spread over few units) and lowest at a particular quantity.
- **Marginal cost** $K'(x)$: roughly what it costs to make **one more unit**.
- **Marginal revenue** $I'(x)$: roughly what one more unit sold brings in.

## Maximum profit
Profit is greatest where $O'(x) = 0$, i.e. where
$$I'(x) = K'(x)$$
– **marginal revenue = marginal cost**. If marginal revenue exceeds marginal cost, it pays to produce more; if it's less, it pays to produce less.

### Worked example
A firm has $K(x) = 0.2x^2 + 20x + 5000$ and sells at a fixed price of 100 kr, so $I(x) = 100x$.
- $O(x) = 100x - 0.2x^2 - 20x - 5000 = -0.2x^2 + 80x - 5000$.
- $O'(x) = -0.4x + 80 = 0$ gives $x = 200$ units.
- $O(200) = -8000 + 16,000 - 5000 = 3000$ kr.
- Check: $K'(200) = 0.4\\cdot 200 + 20 = 100 = I'(200)$ ✓.

## Lowest unit cost
Unit cost is lowest where $E'(x) = 0$. A useful result: there the **unit cost equals the marginal cost**. In the example: $E(x) = 0.2x + 20 + \\tfrac{5000}{x}$, and $E'(x) = 0.2 - \\tfrac{5000}{x^2} = 0$ gives $x \\approx 158$.

## Interpretation
Always answer in **context**: 'The firm should produce and sell 200 units a week. Profit will then be 3000 kr.' Also consider whether the answer is realistic – e.g. whether production capacity suffices.`);

M("Følger og rekker",
`## Følger
En **følge** er en ordnet liste av tall: $a_1, a_2, a_3, \\dots$. Den kan beskrives med en **eksplisitt formel** ($a_n = 3n + 1$) eller **rekursivt** (hvert ledd ut fra det forrige: $a_{n+1} = a_n + 3$, $a_1 = 4$).

## Aritmetiske følger og rekker
I en **aritmetisk** følge er **differansen** $d$ mellom to påfølgende ledd konstant: 4, 7, 10, 13, …
- $n$-te ledd: $a_n = a_1 + (n-1)d$.
- Summen av de $n$ første leddene (en **aritmetisk rekke**):
$$S_n = \\frac{n(a_1 + a_n)}{2}$$
Gauss skal som barn ha funnet summen $1 + 2 + \\dots + 100 = \\tfrac{100\\cdot 101}{2} = 5050$ ved å legge sammen første og siste, andre og nest siste osv.

## Geometriske følger og rekker
I en **geometrisk** følge er **forholdet** (kvotienten) $k$ mellom to påfølgende ledd konstant: 3, 6, 12, 24, …
- $n$-te ledd: $a_n = a_1\\cdot k^{n-1}$.
- Summen av de $n$ første leddene:
$$S_n = a_1\\cdot\\frac{k^n - 1}{k - 1}$$

## Uendelige geometriske rekker
Hvis $|k| < 1$, blir leddene stadig mindre, og summen **konvergerer** mot
$$S = \\frac{a_1}{1 - k}$$
Eksempel: $1 + \\tfrac12 + \\tfrac14 + \\tfrac18 + \\dots = \\tfrac{1}{1 - 1/2} = 2$. Hvis $|k| \\ge 1$, **divergerer** rekka.

### Regneeksempel: sparing
Du setter inn 10 000 kr i begynnelsen av hvert år i 10 år, til 4 % rente. Hvor mye har du rett etter siste innskudd? Det første innskuddet har vokst i 9 år, det siste i 0 år:
$$S = 10\\,000\\,(1 + 1{,}04 + \\dots + 1{,}04^9) = 10\\,000\\cdot\\frac{1{,}04^{10} - 1}{0{,}04} \\approx 120\\,061\\ \\text{kr}$$

## Bruk
Følger og rekker brukes til **sparing og lån** (annuiteter), **avskrivninger**, **medisinkonsentrasjon** over tid (gjentatte doser) og **fraktaler**. **Regneark** er et godt verktøy: én celle per ledd, og summer med en formel.

## Vanlige feil
- Å bruke $n$ i stedet for $n - 1$ i formelen for $a_n$.
- Å bruke formelen for uendelig rekke når $|k| \\ge 1$.
- Å telle feil antall ledd i spareoppgaver.`,
`## Sequences
A **sequence** is an ordered list of numbers: $a_1, a_2, a_3, \\dots$. It can be described by an **explicit formula** ($a_n = 3n + 1$) or **recursively** (each term from the previous: $a_{n+1} = a_n + 3$, $a_1 = 4$).

## Arithmetic sequences and series
In an **arithmetic** sequence the **difference** $d$ between successive terms is constant: 4, 7, 10, 13, …
- $n$th term: $a_n = a_1 + (n-1)d$.
- Sum of the first $n$ terms (an **arithmetic series**):
$$S_n = \\frac{n(a_1 + a_n)}{2}$$
As a boy Gauss is said to have found $1 + 2 + \\dots + 100 = \\tfrac{100\\cdot 101}{2} = 5050$ by pairing first and last, second and second-last, and so on.

## Geometric sequences and series
In a **geometric** sequence the **ratio** $k$ between successive terms is constant: 3, 6, 12, 24, …
- $n$th term: $a_n = a_1\\cdot k^{n-1}$.
- Sum of the first $n$ terms:
$$S_n = a_1\\cdot\\frac{k^n - 1}{k - 1}$$

## Infinite geometric series
If $|k| < 1$ the terms keep shrinking and the sum **converges** to
$$S = \\frac{a_1}{1 - k}$$
Example: $1 + \\tfrac12 + \\tfrac14 + \\tfrac18 + \\dots = \\tfrac{1}{1 - 1/2} = 2$. If $|k| \\ge 1$ the series **diverges**.

### Worked example: saving
You deposit 10,000 kr at the start of each year for 10 years at 4%. How much do you have just after the last deposit? The first deposit has grown for 9 years, the last for 0:
$$S = 10,000\\,(1 + 1.04 + \\dots + 1.04^9) = 10,000\\cdot\\frac{1.04^{10} - 1}{0.04} \\approx 120,061\\ \\text{kr}$$

## Uses
Sequences and series are used for **saving and loans** (annuities), **depreciation**, **drug concentration** over time (repeated doses) and **fractals**. A **spreadsheet** is a good tool: one cell per term, summed with a formula.

## Common mistakes
- Using $n$ instead of $n - 1$ in the formula for $a_n$.
- Using the infinite-series formula when $|k| \\ge 1$.
- Counting the wrong number of terms in savings problems.`);

M("Sparing, lån og nåverdi",
`## Tidsverdien av penger
1000 kr i dag er verdt mer enn 1000 kr om fem år – du kan sette dem i banken og få rente, og prisene stiger. Derfor må vi **flytte** beløp i tid før vi kan sammenligne dem.
- **Sluttverdi** (framtidsverdi): $K_n = K_0\\cdot(1 + r)^n$
- **Nåverdi**: $K_0 = \\dfrac{K_n}{(1 + r)^n}$ – hva et framtidig beløp er verdt i dag.
Her er $r$ renta per periode (som desimaltall).

### Regneeksempel
Hva er 50 000 kr om 6 år verdt i dag med 5 % rente? $\\dfrac{50\\,000}{1{,}05^6} \\approx 37\\,311$ kr.

## Annuiteter
En **annuitet** er en rekke **like store** beløp med fast mellomrom – for eksempel månedlig sparing eller terminbeløp på et lån. Summen av nåverdiene er en **geometrisk rekke**:
$$\\text{Nåverdi} = A\\cdot\\frac{1 - (1 + r)^{-n}}{r}$$
der $A$ er beløpet hver termin og $n$ antall terminer.

## Annuitetslån og serielån
- **Annuitetslån**: like store **terminbeløp** gjennom hele lånetiden. I starten går mesteparten til **renter**, mot slutten mest til **avdrag**. Terminbeløpet finnes ved å løse formelen over for $A$:
$$A = L\\cdot\\frac{r}{1 - (1 + r)^{-n}}$$
- **Serielån**: like store **avdrag** ($\\tfrac{L}{n}$) hver termin. Rentene – og dermed terminbeløpet – blir mindre for hver gang. Totalt betaler du **mindre rente** enn med annuitetslån, men de første terminene er tyngre.

### Regneeksempel
Et lån på 200 000 kr skal betales med 10 årlige terminer, renta er 6 %. Annuitet: $A = 200\\,000\\cdot\\dfrac{0{,}06}{1 - 1{,}06^{-10}} \\approx 27\\,174$ kr per år, totalt om lag 271 700 kr. Serielån: første termin $20\\,000 + 12\\,000 = 32\\,000$ kr, siste $20\\,000 + 1200 = 21\\,200$ kr, totalt 266 000 kr.

## Effektiv rente
Banker oppgir **nominell rente** per år, men legger ofte til renter **månedlig**. Da blir den **effektive renta** høyere: 12 % nominell rente med månedlig renteberegning gir $1{,}01^{12} - 1 \\approx 12{,}7\\,\\%$ effektiv rente. Gebyrer øker den ytterligere. Sammenlign alltid lån med effektiv rente.

## Investeringer og nåverdimetoden
En investering er **lønnsom** hvis **netto nåverdi** – summen av nåverdiene av alle framtidige inn- og utbetalinger minus investeringen – er **positiv**. Renta man bruker, kalles **kalkulasjonsrenten** (avkastningskravet).`,
`## The time value of money
1000 kr today is worth more than 1000 kr in five years – you can bank it and earn interest, and prices rise. So we must **move** amounts in time before comparing them.
- **Future value**: $K_n = K_0\\cdot(1 + r)^n$
- **Present value**: $K_0 = \\dfrac{K_n}{(1 + r)^n}$ – what a future amount is worth today.
Here $r$ is the interest rate per period (as a decimal).

### Worked example
What is 50,000 kr in 6 years worth today at 5%? $\\dfrac{50,000}{1.05^6} \\approx 37,311$ kr.

## Annuities
An **annuity** is a series of **equal** amounts at fixed intervals – e.g. monthly saving or loan instalments. The sum of their present values is a **geometric series**:
$$\\text{Present value} = A\\cdot\\frac{1 - (1 + r)^{-n}}{r}$$
where $A$ is the amount each period and $n$ the number of periods.

## Annuity and serial loans
- **Annuity loan**: equal **instalments** throughout. At first most goes to **interest**, towards the end mostly to **repayment**. The instalment is found by solving the formula above for $A$:
$$A = L\\cdot\\frac{r}{1 - (1 + r)^{-n}}$$
- **Serial loan**: equal **repayments** ($\\tfrac{L}{n}$) each period. Interest – and so the instalment – falls each time. In total you pay **less interest** than with an annuity loan, but the first instalments are heavier.

### Worked example
A 200,000 kr loan is repaid in 10 annual instalments at 6%. Annuity: $A = 200,000\\cdot\\dfrac{0.06}{1 - 1.06^{-10}} \\approx 27,174$ kr a year, about 271,700 kr in total. Serial loan: first instalment $20,000 + 12,000 = 32,000$ kr, last $20,000 + 1200 = 21,200$ kr, 266,000 kr in total.

## Effective interest
Banks quote a **nominal** annual rate but often add interest **monthly**. The **effective rate** is then higher: 12% nominal with monthly compounding gives $1.01^{12} - 1 \\approx 12.7\\%$ effective. Fees raise it further. Always compare loans by effective rate.

## Investments and net present value
An investment is **profitable** if its **net present value** – the sum of the present values of all future cash flows minus the investment – is **positive**. The rate used is the **discount rate** (required return).`);

M("Derivasjonsregler i praksis",
`## Reglene du trenger
- **Potens**: $(x^n)' = nx^{n-1}$, også for brøk- og negative eksponenter: $(\\sqrt x)' = \\tfrac{1}{2\\sqrt x}$ og $\\left(\\tfrac1x\\right)' = -\\tfrac{1}{x^2}$.
- **Eksponential**: $(e^x)' = e^x$ og $(a^x)' = a^x\\ln a$.
- **Logaritme**: $(\\ln x)' = \\tfrac1x$.
- **Produktregelen**: $(u\\cdot v)' = u'v + uv'$.
- **Kvotientregelen**: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.
- **Kjerneregelen** (kjederegelen): $\\big(g(u(x))\\big)' = g'(u)\\cdot u'(x)$ – «deriver det ytre, behold kjernen, og gang med den deriverte av kjernen».

## Slik kjenner du igjen hvilken regel
- To funksjoner **ganget** sammen → produktregelen.
- En funksjon **delt** på en annen → kvotientregelen.
- En funksjon **inni** en annen (en «kjerne») → kjerneregelen. Typiske kjerner: $(3x+1)^5$, $e^{-0{,}2x}$, $\\ln(x^2+1)$, $\\sqrt{4 - x^2}$.
Ofte må du kombinere flere regler.

### Regneeksempler
1. $f(x) = x^2e^x$: produktregel gir $f'(x) = 2xe^x + x^2e^x = xe^x(2 + x)$.
2. $g(x) = \\dfrac{x}{x^2 + 1}$: kvotientregel gir $g'(x) = \\dfrac{(x^2+1) - x\\cdot 2x}{(x^2+1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}$.
3. $h(x) = (3x + 1)^5$: kjerne $u = 3x + 1$, så $h'(x) = 5(3x+1)^4\\cdot 3 = 15(3x+1)^4$.
4. $k(t) = 200e^{-0{,}05t}$: $k'(t) = 200\\cdot(-0{,}05)e^{-0{,}05t} = -10e^{-0{,}05t}$.

## Tolkning i praksis
- Er $N(t) = 5000\\cdot e^{0{,}03t}$ antall innbyggere, er $N'(t) = 150e^{0{,}03t}$ hvor mange **flere per år** befolkningen øker med på tidspunktet $t$.
- Er $C(t)$ konsentrasjonen av et legemiddel, viser $C'(t)$ om den stiger eller synker, og hvor raskt.
- **Elastisitet** i økonomi bruker også den deriverte: hvor mange prosent etterspørselen endres når prisen endres med 1 %.

## Forenkle svaret
Faktoriser gjerne svaret (som $xe^x(2 + x)$) – da er det lett å finne nullpunktene til $f'$ og lage fortegnslinje. Husk at $e^x$ **alltid er positiv**.

## Vanlige feil
- $(uv)' = u'v'$ – feil, det er $u'v + uv'$.
- Å glemme å gange med den deriverte av kjernen.
- Fortegnsfeil i telleren i kvotientregelen: det er $u'v - uv'$, i den rekkefølgen.`,
`## The rules you need
- **Power**: $(x^n)' = nx^{n-1}$, also for fractional and negative exponents: $(\\sqrt x)' = \\tfrac{1}{2\\sqrt x}$ and $\\left(\\tfrac1x\\right)' = -\\tfrac{1}{x^2}$.
- **Exponential**: $(e^x)' = e^x$ and $(a^x)' = a^x\\ln a$.
- **Logarithm**: $(\\ln x)' = \\tfrac1x$.
- **Product rule**: $(u\\cdot v)' = u'v + uv'$.
- **Quotient rule**: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.
- **Chain rule**: $\\big(g(u(x))\\big)' = g'(u)\\cdot u'(x)$ – 'differentiate the outside, keep the inside, and multiply by the derivative of the inside'.

## How to tell which rule
- Two functions **multiplied** → product rule.
- One function **divided** by another → quotient rule.
- A function **inside** another (an 'inner function') → chain rule. Typical inner functions: $(3x+1)^5$, $e^{-0.2x}$, $\\ln(x^2+1)$, $\\sqrt{4 - x^2}$.
Often you must combine several rules.

### Worked examples
1. $f(x) = x^2e^x$: product rule gives $f'(x) = 2xe^x + x^2e^x = xe^x(2 + x)$.
2. $g(x) = \\dfrac{x}{x^2 + 1}$: quotient rule gives $g'(x) = \\dfrac{(x^2+1) - x\\cdot 2x}{(x^2+1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}$.
3. $h(x) = (3x + 1)^5$: inner $u = 3x + 1$, so $h'(x) = 5(3x+1)^4\\cdot 3 = 15(3x+1)^4$.
4. $k(t) = 200e^{-0.05t}$: $k'(t) = 200\\cdot(-0.05)e^{-0.05t} = -10e^{-0.05t}$.

## Interpretation in practice
- If $N(t) = 5000\\cdot e^{0.03t}$ is a population, $N'(t) = 150e^{0.03t}$ is how many **more per year** it is growing by at time $t$.
- If $C(t)$ is a drug concentration, $C'(t)$ shows whether it's rising or falling, and how fast.
- **Elasticity** in economics also uses the derivative: by how many per cent demand changes when the price changes by 1%.

## Simplify the answer
Factorise the answer (like $xe^x(2 + x)$) – then it's easy to find the zeros of $f'$ and draw a sign chart. Remember $e^x$ is **always positive**.

## Common mistakes
- $(uv)' = u'v'$ – wrong, it's $u'v + uv'$.
- Forgetting to multiply by the derivative of the inner function.
- Sign errors in the quotient rule numerator: it's $u'v - uv'$, in that order.`);

M("Sannsynlighetsfordelinger",
`## Stokastiske variabler
En **stokastisk variabel** $X$ er et tall som avhenger av utfallet av et tilfeldig forsøk – for eksempel antall seksere på ti kast, eller antall defekte varer i en eske. En **sannsynlighetsfordeling** viser hvilke verdier $X$ kan få, og sannsynligheten for hver.

## Forventning og standardavvik
- **Forventningsverdien** er det gjennomsnittet vi får i det lange løp: $E(X) = \\mu = \\sum x\\cdot P(X = x)$.
- **Variansen** måler spredningen: $\\text{Var}(X) = \\sum (x - \\mu)^2P(X = x)$, og **standardavviket** er $\\sigma = \\sqrt{\\text{Var}(X)}$.
I et lotteri der loddet koster 20 kr og forventet gevinst er 12 kr, taper du i gjennomsnitt 8 kr per lodd.

## Binomisk fordeling
Brukes når et forsøk gjentas $n$ **uavhengige** ganger, hvert med bare **to utfall** (suksess/fiasko) og **samme** sannsynlighet $p$ for suksess:
$$P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}$$
med $E(X) = np$ og $\\sigma = \\sqrt{np(1-p)}$.

### Regneeksempel
10 % av varene fra en maskin er defekte. Du tar ut 20 varer. Sannsynligheten for at **ingen** er defekte er $0{,}9^{20} \\approx 0{,}12$, og for **minst én** er $1 - 0{,}12 = 0{,}88$. Forventet antall defekte er $20\\cdot 0{,}1 = 2$.

## Hypergeometrisk fordeling
Når du trekker **uten tilbakelegging** fra en liten gruppe (for eksempel 5 kort fra en kortstokk), endres sannsynligheten for hver trekning. Da brukes den **hypergeometriske** fordelingen:
$$P(X = k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}$$
der $N$ er totalt antall, $M$ antall «spesielle» og $n$ antall trukket.

## Normalfordelingen
Mange målinger – høyde, måleusikkerhet, prøveresultater – fordeler seg som en **klokkeformet** kurve, **normalfordelingen**, bestemt av $\\mu$ og $\\sigma$:
- om lag **68 %** av verdiene ligger innenfor $\\mu \\pm \\sigma$,
- om lag **95 %** innenfor $\\mu \\pm 2\\sigma$,
- om lag **99,7 %** innenfor $\\mu \\pm 3\\sigma$.
For å finne sannsynligheter **standardiserer** vi: $Z = \\dfrac{X - \\mu}{\\sigma}$ og slår opp i tabell eller bruker sannsynlighetskalkulatoren i GeoGebra.

### Regneeksempel
Høyden til 18-årige gutter er normalfordelt med $\\mu = 180$ cm og $\\sigma = 7$ cm. Andelen over 194 cm: $Z = \\tfrac{194 - 180}{7} = 2$, og $P(Z > 2) \\approx 2{,}3\\,\\%$.

## Sentralgrenseteoremet
Gjennomsnittet av mange uavhengige målinger er tilnærmet **normalfordelt**, uansett hvordan enkeltmålingene er fordelt. Derfor er normalfordelingen så viktig i statistikk – og en binomisk fordeling med stor $n$ kan tilnærmes med en normalfordeling.`,
`## Random variables
A **random variable** $X$ is a number that depends on the outcome of a random experiment – e.g. the number of sixes in ten throws, or defective items in a box. A **probability distribution** shows which values $X$ can take and the probability of each.

## Expectation and standard deviation
- The **expected value** is the long-run average: $E(X) = \\mu = \\sum x\\cdot P(X = x)$.
- The **variance** measures spread: $\\text{Var}(X) = \\sum (x - \\mu)^2P(X = x)$, and the **standard deviation** is $\\sigma = \\sqrt{\\text{Var}(X)}$.
In a lottery where a ticket costs 20 kr and the expected prize is 12 kr, you lose 8 kr per ticket on average.

## The binomial distribution
Used when an experiment is repeated $n$ **independent** times, each with only **two outcomes** (success/failure) and the **same** probability $p$ of success:
$$P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}$$
with $E(X) = np$ and $\\sigma = \\sqrt{np(1-p)}$.

### Worked example
10% of a machine's items are defective. You take 20. The probability that **none** are defective is $0.9^{20} \\approx 0.12$, and of **at least one** is $1 - 0.12 = 0.88$. The expected number of defects is $20\\cdot 0.1 = 2$.

## The hypergeometric distribution
When you draw **without replacement** from a small group (e.g. 5 cards from a deck), the probability changes with each draw. Then we use the **hypergeometric** distribution:
$$P(X = k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}$$
where $N$ is the total, $M$ the number of 'special' items and $n$ the number drawn.

## The normal distribution
Many measurements – height, measurement error, test scores – follow a **bell-shaped** curve, the **normal distribution**, defined by $\\mu$ and $\\sigma$:
- about **68%** of values lie within $\\mu \\pm \\sigma$,
- about **95%** within $\\mu \\pm 2\\sigma$,
- about **99.7%** within $\\mu \\pm 3\\sigma$.
To find probabilities we **standardise**: $Z = \\dfrac{X - \\mu}{\\sigma}$ and use a table or GeoGebra's probability calculator.

### Worked example
Heights of 18-year-old boys are normally distributed with $\\mu = 180$ cm and $\\sigma = 7$ cm. The share above 194 cm: $Z = \\tfrac{194 - 180}{7} = 2$, and $P(Z > 2) \\approx 2.3\\%$.

## The central limit theorem
The mean of many independent measurements is approximately **normally distributed**, whatever the distribution of the individual measurements. That's why the normal distribution is so important in statistics – and a binomial distribution with large $n$ can be approximated by a normal distribution.`);

M("Hypotesetesting",
`## Ideen
I en **hypotesetest** bruker vi data fra et **utvalg** til å avgjøre om vi har grunn til å tro at noe har **endret seg** eller er **annerledes** enn påstått. Tankegangen ligner en rettssak: vi antar «uskyld» til bevisene er sterke nok.

## Hypotesene
- **Nullhypotesen** $H_0$: «ingen endring» – det etablerte eller påståtte. For eksempel: «Andelen defekte varer er 5 %» ($p = 0{,}05$).
- **Alternativ hypotese** $H_1$: det vi vil undersøke om vi har grunnlag for. For eksempel: «Andelen er større enn 5 %» ($p > 0{,}05$, **ensidig** test) eller «andelen er forskjellig fra 5 %» (**tosidig** test).
Hypotesene skal formuleres **før** vi ser på dataene.

## Signifikansnivå og p-verdi
- **Signifikansnivået** $\\alpha$ (ofte 5 %) er hvor liten risiko vi godtar for å forkaste en sann nullhypotese.
- **P-verdien** er sannsynligheten for å få et resultat **minst like ekstremt** som det vi observerte, **hvis $H_0$ er sann**.
- **Konklusjon**: Er p-verdien **mindre enn** $\\alpha$, **forkaster** vi $H_0$ – resultatet er **statistisk signifikant**. Ellers har vi **ikke grunnlag** for å forkaste $H_0$ (det betyr ikke at $H_0$ er bevist sann!).

### Regneeksempel (binomisk)
En produsent påstår at bare 5 % av varene er defekte. Du sjekker 50 varer og finner 6 defekte. Test med $\\alpha = 0{,}05$ om andelen er større.
- $H_0$: $p = 0{,}05$. $H_1$: $p > 0{,}05$.
- Under $H_0$ er $X$ binomisk med $n = 50$, $p = 0{,}05$ (forventet 2,5 defekte).
- P-verdi: $P(X \\ge 6) \\approx 0{,}038$.
- $0{,}038 < 0{,}05$, så vi **forkaster $H_0$**: det er grunn til å tro at andelen defekte er større enn 5 %.

## Feiltyper
- **Type I-feil**: forkaste $H_0$ selv om den er **sann** (falsk alarm). Sannsynligheten er høyst $\\alpha$.
- **Type II-feil**: **ikke** forkaste $H_0$ selv om den er **usann** (oversett endring).
Et lavere $\\alpha$ gir færre type I-feil, men flere type II-feil. Større **utvalg** reduserer begge.

## Test av gjennomsnitt
For målinger (vekt, tid, karakterer) tester vi ofte om **gjennomsnittet** $\\mu$ har endret seg, med normalfordelingen (eller **t-fordelingen** når standardavviket er ukjent og utvalget lite). Testobservatoren er
$$Z = \\frac{\\bar x - \\mu_0}{\\sigma/\\sqrt n}$$

## Statistisk og praktisk signifikans
Et resultat kan være **statistisk signifikant** uten å være **viktig** i praksis – med store utvalg blir selv bittesmå forskjeller signifikante. Vurder alltid **hvor stor** effekten er, og om utvalget er tilfeldig og representativt.`,
`## The idea
In a **hypothesis test** we use data from a **sample** to decide whether there is reason to believe something has **changed** or is **different** from what is claimed. The reasoning is like a trial: we assume 'innocence' until the evidence is strong enough.

## The hypotheses
- **Null hypothesis** $H_0$: 'no change' – the established or claimed situation. E.g.: 'The defect rate is 5%' ($p = 0.05$).
- **Alternative hypothesis** $H_1$: what we want to see if we have evidence for. E.g.: 'The rate is higher than 5%' ($p > 0.05$, a **one-sided** test) or 'the rate differs from 5%' (**two-sided**).
The hypotheses must be stated **before** looking at the data.

## Significance level and p-value
- The **significance level** $\\alpha$ (often 5%) is the risk we accept of rejecting a true null hypothesis.
- The **p-value** is the probability of a result **at least as extreme** as the one observed, **if $H_0$ is true**.
- **Conclusion**: if the p-value is **less than** $\\alpha$, we **reject** $H_0$ – the result is **statistically significant**. Otherwise we have **no grounds** to reject $H_0$ (which doesn't prove $H_0$ true!).

### Worked example (binomial)
A manufacturer claims only 5% of items are defective. You check 50 and find 6 defective. Test at $\\alpha = 0.05$ whether the rate is higher.
- $H_0$: $p = 0.05$. $H_1$: $p > 0.05$.
- Under $H_0$, $X$ is binomial with $n = 50$, $p = 0.05$ (2.5 expected).
- p-value: $P(X \\ge 6) \\approx 0.038$.
- $0.038 < 0.05$, so we **reject $H_0$**: there is reason to believe the defect rate exceeds 5%.

## Types of error
- **Type I error**: rejecting $H_0$ when it is **true** (false alarm). Its probability is at most $\\alpha$.
- **Type II error**: **not** rejecting $H_0$ when it is **false** (missing a real change).
A lower $\\alpha$ gives fewer type I but more type II errors. A larger **sample** reduces both.

## Testing a mean
For measurements (weight, time, grades) we often test whether the **mean** $\\mu$ has changed, using the normal distribution (or the **t-distribution** when the standard deviation is unknown and the sample small). The test statistic is
$$Z = \\frac{\\bar x - \\mu_0}{\\sigma/\\sqrt n}$$

## Statistical and practical significance
A result can be **statistically significant** without being **important** in practice – with large samples even tiny differences become significant. Always consider **how large** the effect is, and whether the sample is random and representative.`);
})();
