// Teoribok – emnesider for Matematikk S1 og S2 (VGS1, VGS2), LK20, med regnesjekk (chk) der eksemplet har tall (AX-18).
// Tallene følger eksemplene i add_vgs_c.js, add_vgs_e.js og add_vgs_f.js. Test: node tools/test_topics.js top_vgs.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VGS1 0: Algebra og likninger ----------
TOPICS("VGS1", 0, [
{ id: "brok-forkorting", chk: ["(25-9)/(5+3) ≈ 2", "5-3 ≈ 2"],
  nb: O("Forkorte brøker",
    R`En brøk med bokstaver forkortes bare når teller og nevner har en felles faktor. Ledd som er lagt sammen, kan ikke strykes mot hverandre. Faktoriser først, forkort felles faktorer, og skriv til slutt opp hvilke verdier som gjør nevneren null. Der er brøken ikke definert, selv om det forkortede uttrykket gir et tall. Konjugatsetningen er den vanligste faktoriseringen i S1.`,
    [[R`\frac{x^2 - a^2}{x - a} = x + a`, "for x ulik a"], [R`x^2 - a^2 = (x - a)(x + a)`, "konjugatsetningen"]],
    [["x", "variabelen", ""], ["a", "et tall", ""]],
    R`$\dfrac{x^2 - 9}{x + 3} = x - 3$ for $x \ne -3$. Kontroll med $x = 5$: $\dfrac{25 - 9}{5 + 3} = 2$ og $5 - 3 = 2$.`,
    R`Forkort faktorer, ikke ledd. Sjekk alltid at nevneren ikke blir null.`),
  en: O("Simplifying fractions",
    R`A fraction with letters cancels only when the numerator and the denominator share a factor. Terms that are added cannot be struck against each other. Factorise first, cancel common factors, and finally write down the values that make the denominator zero. The fraction is not defined there, even if the simplified expression gives a number. The difference of squares is the most common factorisation in this course.`,
    [[R`\frac{x^2 - a^2}{x - a} = x + a`, "for x not equal to a"], [R`x^2 - a^2 = (x - a)(x + a)`, "difference of squares"]],
    [["x", "the variable", ""], ["a", "a number", ""]],
    R`$\dfrac{x^2 - 9}{x + 3} = x - 3$ for $x \ne -3$. Check with $x = 5$: $\dfrac{25 - 9}{5 + 3} = 2$ and $5 - 3 = 2$.`,
    R`Cancel factors, not terms. Always check that the denominator does not become zero.`) },
{ id: "broklikning", chk: ["5/(1/2+1/3) ≈ 6", "6/2+6/3 ≈ 5"],
  nb: O("Likninger med brøk",
    R`I en likning med brøker ganger du hvert ledd med fellesnevneren, slik at brøkene forsvinner. Deretter løser du den nye likningen som vanlig. Til slutt setter du løsningen inn i de opprinnelige nevnerne. En verdi som gjør en nevner lik null, er ikke en løsning, selv om den dukket opp etter at du ganget. Skriv derfor definisjonsmengden før du begynner.`,
    [[R`\frac{x}{a} + \frac{x}{b} = c`, "brøklikning"], [R`bx + ax = abc`, "etter gangning med ab"]],
    [["a,\\ b", "nevnerne", ""], ["c", "høyresiden", ""]],
    R`$\dfrac{x}{2} + \dfrac{x}{3} = 5$. Gang med 6: $3x + 2x = 30$, så $x = 6$.
Kontroll: $\dfrac{6}{2} + \dfrac{6}{3} = 5$.`,
    R`Gang med fellesnevneren, og kast løsninger som gjør en nevner null.`),
  en: O("Equations with fractions",
    R`In an equation with fractions you multiply every term by the common denominator, so that the fractions disappear. Then you solve the new equation as usual. Finally you insert the solution into the original denominators. A value that makes a denominator zero is not a solution, even if it appeared after you multiplied. Write the domain before you start.`,
    [[R`\frac{x}{a} + \frac{x}{b} = c`, "equation with fractions"], [R`bx + ax = abc`, "after multiplying by ab"]],
    [["a,\\ b", "the denominators", ""], ["c", "the right side", ""]],
    R`$\dfrac{x}{2} + \dfrac{x}{3} = 5$. Multiply by 6: $3x + 2x = 30$, so $x = 6$.
Check: $\dfrac{6}{2} + \dfrac{6}{3} = 5$.`,
    R`Multiply by the common denominator, and discard solutions that make a denominator zero.`) },
{ id: "ulikhet-negativ", chk: ["6/(-2) ≈ -3"],
  nb: O("Ulikhet og negativ faktor",
    R`En ulikhet løses nesten som en likning, med ett viktig unntak. Ganger eller deler du med et negativt tall, snur ulikhetstegnet. Ganger du med et positivt tall, blir tegnet stående. Et minustegn foran x er det samme som å gange med minus én, så tegnet skal snus. Sjekk svaret ved å sette inn ett tall fra løsningsmengden og ett tall utenfor.`,
    [[R`-2x > 6 \Rightarrow x < -3`, "del på negativt og snu"], [R`x < \frac{6}{-2}`, "grensen"]],
    [["x", "den ukjente", ""]],
    R`$-2x > 6$. Del på $-2$ og snu tegnet: $x < -3$, fordi $\dfrac{6}{-2} = -3$.
$x = -4$ stemmer, $x = 0$ gjør ikke det.`,
    R`Negativ faktor snur tegnet. Positiv faktor lar det stå.`),
  en: O("Inequality and a negative factor",
    R`An inequality is solved almost like an equation, with one important exception. If you multiply or divide by a negative number, you reverse the inequality sign. If you multiply by a positive number, the sign stays. A minus sign in front of x is the same as multiplying by negative one, so the sign must be reversed. Check the answer by inserting one number from the solution set and one number outside it.`,
    [[R`-2x > 6 \Rightarrow x < -3`, "divide by a negative and reverse"], [R`x < \frac{6}{-2}`, "the boundary"]],
    [["x", "the unknown", ""]],
    R`$-2x > 6$. Divide by $-2$ and reverse the sign: $x < -3$, because $\dfrac{6}{-2} = -3$.
$x = -4$ works, $x = 0$ does not.`,
    R`A negative factor reverses the sign. A positive factor leaves it.`) }
]);

// ---------- VGS1 1: Funksjoner og modeller ----------
TOPICS("VGS1", 1, [
{ id: "lineaer-kostnad", chk: ["5000+40*10 ≈ 5400"],
  nb: O("Lineær kostnadsmodell",
    R`En lineær modell passer når noe øker med et fast beløp per enhet. Kostnaden kan være et fast beløp pluss en fast pris per enhet. Stigningstallet er prisen per enhet, og konstantleddet er kostnaden når antall enheter er null. Grafen er en rett linje. Fast prosentvis vekst er derimot eksponentiell, så du må se om økningen er et fast tall eller en fast prosent.`,
    [[R`K(x) = ax + b`, "lineær kostnad"], [R`a = \frac{K(x_2) - K(x_1)}{x_2 - x_1}`, "stigningstall"]],
    [["a", "pris per enhet", "kr"], ["b", "fast kostnad", "kr"], ["x", "antall enheter", ""]],
    R`$K(x) = 5000 + 40x$. Ti enheter koster $5000 + 40 \cdot 10 = 5400$ kr.
Hver nye enhet koster 40 kr mer.`,
    R`Fast tillegg gir en rett linje. Fast prosent gir en krum graf.`),
  en: O("A linear cost model",
    R`A linear model fits when something increases by a fixed amount per unit. The cost can be a fixed amount plus a fixed price per unit. The slope is the price per unit, and the constant term is the cost when the number of units is zero. The graph is a straight line. A fixed percentage growth is exponential instead, so you must see whether the increase is a fixed amount or a fixed percentage.`,
    [[R`C(x) = ax + b`, "linear cost"], [R`a = \frac{C(x_2) - C(x_1)}{x_2 - x_1}`, "slope"]],
    [["a", "price per unit", "NOK"], ["b", "fixed cost", "NOK"], ["x", "number of units", ""]],
    R`$C(x) = 5000 + 40x$. Ten units cost $5000 + 40 \cdot 10 = 5400$ NOK.
Each new unit costs 40 NOK more.`,
    R`A fixed addition gives a straight line. A fixed percentage gives a curved graph.`) },
{ id: "prosentvekst", chk: ["20000*1.02^5 ≈ 22081.6"],
  nb: O("Prosentvis vekst",
    R`Vokser en størrelse med samme prosent hver periode, ganger du med samme vekstfaktor hver gang. Vekstfaktoren er 1 pluss prosenten som desimaltall. Startverdien ganges med vekstfaktoren opphøyd i antall perioder. Modellen brukes for befolkning, priser og renter når prosenten ligger fast. En fast kronesum per år er lineær, ikke eksponentiell.`,
    [[R`f(x) = a \cdot b^x`, "eksponentiell modell"], [R`b = 1 + \frac{p}{100}`, "vekstfaktor"]],
    [["a", "startverdi", ""], ["b", "vekstfaktor", ""], ["p", "prosent per periode", "%"]],
    R`20 000 innbyggere og 2 % vekst i året. Etter 5 år: $20\,000 \cdot 1{,}02^5 \approx 22\,081{,}6$.`,
    R`Ved nedgang på p prosent er vekstfaktoren 1 minus p/100.`),
  en: O("Percentage growth",
    R`If a quantity grows by the same percentage each period, you multiply by the same growth factor every time. The growth factor is 1 plus the percentage as a decimal. The starting value is multiplied by the growth factor raised to the number of periods. The model is used for population, prices and interest when the percentage stays fixed. A fixed amount of money per year is linear, not exponential.`,
    [[R`f(x) = a \cdot b^x`, "exponential model"], [R`b = 1 + \frac{p}{100}`, "growth factor"]],
    [["a", "starting value", ""], ["b", "growth factor", ""], ["p", "percent per period", "%"]],
    R`20,000 inhabitants and 2% growth per year. After 5 years: $20\,000 \cdot 1.02^5 \approx 22\,081.6$.`,
    R`For a decrease of p percent the growth factor is 1 minus p/100.`) },
{ id: "balansepunkt", chk: ["5000/(90-40) ≈ 100", "90*100-(40*100+5000) ≈ 0"],
  nb: O("Balansepunkt",
    R`Overskuddet er inntekt minus kostnad. Balansepunktet er der overskuddet er null, altså der inntekten akkurat dekker kostnaden. Med fast pris og lineær kostnad deler du den faste kostnaden på dekningsbidraget, som er pris minus kostnad per enhet. Selger du færre, går du med underskudd. Selger du flere, blir overskuddet positivt.`,
    [[R`O(x) = px - (ax + b)`, "overskudd"], [R`x = \frac{b}{p - a}`, "balanse når p > a"]],
    [["p", "pris per enhet", "kr"], ["a", "kostnad per enhet", "kr"], ["b", "fast kostnad", "kr"]],
    R`Fast kostnad 5000 kr, 40 kr per enhet, pris 90 kr.
$x = \dfrac{5000}{90 - 40} = 100$. Da er overskuddet $90 \cdot 100 - (40 \cdot 100 + 5000) = 0$ kr.`,
    R`Dekningsbidraget må være positivt, ellers dekker salget aldri de faste kostnadene.`),
  en: O("Break-even point",
    R`Profit is income minus cost. The break-even point is where the profit is zero, that is where the income just covers the cost. With a fixed price and a linear cost you divide the fixed cost by the contribution margin, which is price minus cost per unit. If you sell fewer, you make a loss. If you sell more, the profit becomes positive.`,
    [[R`P(x) = px - (ax + b)`, "profit"], [R`x = \frac{b}{p - a}`, "break-even when p > a"]],
    [["p", "price per unit", "NOK"], ["a", "cost per unit", "NOK"], ["b", "fixed cost", "NOK"]],
    R`Fixed cost 5000 NOK, 40 NOK per unit, price 90 NOK.
$x = \dfrac{5000}{90 - 40} = 100$. Then the profit is $90 \cdot 100 - (40 \cdot 100 + 5000) = 0$ NOK.`,
    R`The contribution margin must be positive, otherwise sales never cover the fixed costs.`) }
]);

// ---------- VGS1 2: Derivasjon og optimering ----------
TOPICS("VGS1", 2, [
{ id: "potensregel", chk: ["2*2^3 ≈ 16", "6*2^2 ≈ 24"],
  nb: O("Potensregelen",
    R`Den deriverte forteller hvor bratt grafen er, altså hvor raskt funksjonsverdien endrer seg. For en potens tar du ned eksponenten som faktor og minker eksponenten med 1. En konstant foran x følger med. En konstant alene har derivert null, fordi en vannrett linje ikke stiger. Regn ut funksjonsverdien og den deriverte hver for seg når oppgaven ber om begge.`,
    [[R`(ax^n)' = anx^{n-1}`, "potensregelen"], [R`(c)' = 0`, "konstant"]],
    [["a", "koeffisient", ""], ["n", "eksponent", ""]],
    R`$f(x) = 2x^3$. Da er $f(2) = 2 \cdot 2^3 = 16$ og $f'(x) = 6x^2$, så $f'(2) = 6 \cdot 2^2 = 24$.`,
    R`Eksponenten minker med 1. Glemmer du det, deriverer du feil.`),
  en: O("The power rule",
    R`The derivative tells how steep the graph is, that is how fast the function value changes. For a power you bring the exponent down as a factor and reduce the exponent by 1. A constant in front of x stays. A constant on its own has derivative zero, because a horizontal line does not rise. Calculate the function value and the derivative separately when the task asks for both.`,
    [[R`(ax^n)' = anx^{n-1}`, "the power rule"], [R`(c)' = 0`, "a constant"]],
    [["a", "coefficient", ""], ["n", "exponent", ""]],
    R`$f(x) = 2x^3$. Then $f(2) = 2 \cdot 2^3 = 16$ and $f'(x) = 6x^2$, so $f'(2) = 6 \cdot 2^2 = 24$.`,
    R`The exponent decreases by 1. If you forget that, the derivative is wrong.`) },
{ id: "grensekostnad", chk: ["20+10 ≈ 30", "(0.5*20^2+10*20+200)/20 ≈ 30"],
  nb: O("Grensekostnad og enhetskostnad",
    R`Grensekostnaden er den deriverte av kostnadsfunksjonen. Den sier omtrent hva det koster å lage én enhet til. Enhetskostnaden er hele kostnaden delt på antall enheter, altså gjennomsnittet så langt. De to er ikke det samme. Enhetskostnaden er minst der den er lik grensekostnaden. I eksemplet under treffer det akkurat ved 20 enheter.`,
    [[R`K'(x)`, "grensekostnad"], [R`E(x) = \frac{K(x)}{x}`, "enhetskostnad"]],
    [["K", "kostnad", "kr"], ["x", "antall enheter", ""], ["E", "enhetskostnad", "kr"]],
    R`$K(x) = 0{,}5x^2 + 10x + 200$. $K'(x) = x + 10$, så $K'(20) = 30$ kr.
$E(20) = \dfrac{0{,}5 \cdot 20^2 + 10 \cdot 20 + 200}{20} = 30$ kr.`,
    R`Grensekostnad er den deriverte. Enhetskostnad er gjennomsnittet.`),
  en: O("Marginal cost and unit cost",
    R`The marginal cost is the derivative of the cost function. It says roughly what it costs to make one more unit. The unit cost is the whole cost divided by the number of units, that is the average so far. The two are not the same. The unit cost is smallest where it equals the marginal cost. In the example below that happens exactly at 20 units.`,
    [[R`C'(x)`, "marginal cost"], [R`A(x) = \frac{C(x)}{x}`, "unit cost"]],
    [["C", "cost", "NOK"], ["x", "number of units", ""], ["A", "unit cost", "NOK"]],
    R`$C(x) = 0.5x^2 + 10x + 200$. $C'(x) = x + 10$, so $C'(20) = 30$ NOK.
$A(20) = \dfrac{0.5 \cdot 20^2 + 10 \cdot 20 + 200}{20} = 30$ NOK.`,
    R`Marginal cost is the derivative. Unit cost is the average.`) },
{ id: "overskudd-topp", chk: ["40/(2*1) ≈ 20", "40*20-20^2-100 ≈ 300"],
  nb: O("Størst overskudd",
    R`Et overskudd som er en andregradsfunksjon med negativ x i andre, har et toppunkt. Toppunktet ligger på symmetrilinjen, der den deriverte er null. Du finner x-verdien, setter den inn i overskuddet og sjekker at grafen vender ned. Det er produksjonen som gir størst overskudd. Endepunktene i et lukket intervall må også sjekkes hvis oppgaven begrenser antall enheter.`,
    [[R`O(x) = -ax^2 + bx + c`, "overskudd, a > 0"], [R`x = \frac{b}{2a}`, "toppunkt"]],
    [["a,\\ b,\\ c", "koeffisienter", ""], ["O", "overskudd", "kr"]],
    R`$O(x) = -x^2 + 40x - 100$. $x = \dfrac{40}{2} = 20$.
$O(20) = -20^2 + 40 \cdot 20 - 100 = 300$ kr.`,
    R`Negativ koeffisient foran x i andre gir toppunkt, ikke bunnpunkt.`),
  en: O("Largest profit",
    R`A profit that is a quadratic with a negative coefficient of x squared has a maximum. The maximum lies on the line of symmetry, where the derivative is zero. You find the x-value, insert it into the profit and check that the graph opens downwards. That is the production that gives the largest profit. The endpoints of a closed interval must also be checked if the task limits the number of units.`,
    [[R`P(x) = -ax^2 + bx + c`, "profit, a > 0"], [R`x = \frac{b}{2a}`, "maximum"]],
    [["a,\\ b,\\ c", "coefficients", ""], ["P", "profit", "NOK"]],
    R`$P(x) = -x^2 + 40x - 100$. $x = \dfrac{40}{2} = 20$.
$P(20) = -20^2 + 40 \cdot 20 - 100 = 300$ NOK.`,
    R`A negative coefficient of x squared gives a maximum, not a minimum.`) }
]);

// ---------- VGS1 3: Sannsynlighet ----------
TOPICS("VGS1", 3, [
{ id: "uavhengige-hendelser", chk: ["0.3*0.4 ≈ 0.12"],
  nb: O("Uavhengige hendelser",
    R`To hendelser er uavhengige når den ene ikke endrer sannsynligheten for den andre. Da er sannsynligheten for begge produktet av sannsynlighetene. Et valgtre med ett tall på hver gren viser det samme. Er hendelsene avhengige, som trekking uten tilbakelegging, kan du ikke bare gange de opprinnelige sannsynlighetene. Skriv derfor ned om forsøkene påvirker hverandre.`,
    [[R`P(A \cap B) = P(A) \cdot P(B)`, "uavhengige hendelser"]],
    [["P(A)", "sannsynlighet for A", ""], ["P(B)", "sannsynlighet for B", ""]],
    R`Sannsynligheten for regn er 0,3 og for at bussen er forsinket 0,4, uavhengig av hverandre.
$P(\text{begge}) = 0{,}3 \cdot 0{,}4 = 0{,}12$.`,
    R`Uavhengig: gang. Avhengig: regn ut den betingede sannsynligheten.`),
  en: O("Independent events",
    R`Two events are independent when one does not change the probability of the other. Then the probability of both is the product of the probabilities. A tree diagram with one number on each branch shows the same thing. If the events are dependent, as in drawing without replacement, you cannot just multiply the original probabilities. Write down whether the trials affect each other.`,
    [[R`P(A \cap B) = P(A) \cdot P(B)`, "independent events"]],
    [["P(A)", "probability of A", ""], ["P(B)", "probability of B", ""]],
    R`The probability of rain is 0.3 and of the bus being late 0.4, independently.
$P(\text{both}) = 0.3 \cdot 0.4 = 0.12$.`,
    R`Independent: multiply. Dependent: calculate the conditional probability.`) },
{ id: "minst-en", chk: ["1-0.8^3 ≈ 0.488"],
  nb: O("Minst én",
    R`Sannsynligheten for minst én suksess er 1 minus sannsynligheten for ingen suksesser. Det er ofte kortere enn å legge sammen én, to og flere. Når forsøkene er uavhengige og har samme sannsynlighet for å mislykkes, blir «ingen» den sannsynligheten opphøyd i antall forsøk. Svaret ligger mellom 0 og 1. Jo flere forsøk, jo større er sjansen for minst én.`,
    [[R`P(\text{minst én}) = 1 - P(\text{ingen})`, "komplementsetningen"], [R`P(\text{ingen}) = (1 - p)^n`, "uavhengige forsøk"]],
    [["p", "sannsynlighet for treff i ett forsøk", ""], ["n", "antall forsøk", ""]],
    R`Hver dag er sannsynligheten for opphold 0,8, uavhengig av de andre dagene.
På tre dager er $P(\text{minst ett regnvær}) = 1 - 0{,}8^3 = 0{,}488$.`,
    R`«Minst én» er komplementet til «ingen».`),
  en: O("At least one",
    R`The probability of at least one success is 1 minus the probability of no successes. That is often shorter than adding one, two and more. When the trials are independent and have the same probability of failure, "none" is that probability raised to the number of trials. The answer lies between 0 and 1. The more trials, the greater the chance of at least one.`,
    [[R`P(\text{at least one}) = 1 - P(\text{none})`, "the complement rule"], [R`P(\text{none}) = (1 - p)^n`, "independent trials"]],
    [["p", "probability of a hit in one trial", ""], ["n", "number of trials", ""]],
    R`Each day the probability of dry weather is 0.8, independently of the other days.
Over three days, $P(\text{at least one rainy day}) = 1 - 0.8^3 = 0.488$.`,
    R`"At least one" is the complement of "none".`) },
{ id: "hypergeometrisk", chk: ["4*3/2 ≈ 6", "10*9/2 ≈ 45", "6/45 ≈ 0.1333"],
  nb: O("Trekking uten tilbakelegging",
    R`Når du trekker flere enheter uten å legge tilbake, endrer sannsynligheten seg for hvert trekk. Antall måter å velge k av n på, uten rekkefølge, er binomialkoeffisienten. Hypergeometrisk sannsynlighet er antall gunstige valg delt på antall mulige valg. Telleren er produktet av måtene å velge fra hver gruppe. Rekkefølgen inne i trekket teller ikke.`,
    [[R`\binom{n}{k} = \frac{n!}{k!(n-k)!}`, "kombinasjoner"], [R`P = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}`, "hypergeometrisk"]],
    [["N", "antall i alt", ""], ["K", "antall gunstige i alt", ""], ["n", "antall som trekkes", ""]],
    R`4 røde og 6 blå, trekk 2. $P(\text{to røde}) = \dfrac{\binom{4}{2}}{\binom{10}{2}} = \dfrac{6}{45} \approx 0{,}1333$.`,
    R`Uten tilbakelegging: kombinasjoner. Med tilbakelegging og uavhengighet: produkt.`),
  en: O("Drawing without replacement",
    R`When you draw several items without putting them back, the probability changes at each draw. The number of ways to choose k of n, without order, is the binomial coefficient. A hypergeometric probability is the number of favourable choices divided by the number of possible choices. The numerator is the product of the ways of choosing from each group. The order inside the draw does not matter.`,
    [[R`\binom{n}{k} = \frac{n!}{k!(n-k)!}`, "combinations"], [R`P = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}`, "hypergeometric"]],
    [["N", "total number", ""], ["K", "number of favourable items", ""], ["n", "number drawn", ""]],
    R`4 red and 6 blue, draw 2. $P(\text{two red}) = \dfrac{\binom{4}{2}}{\binom{10}{2}} = \dfrac{6}{45} \approx 0.1333$.`,
    R`Without replacement: combinations. With replacement and independence: a product.`) }
]);

// ---------- VGS1 4: Ulikheter og fortegnslinjer ----------
TOPICS("VGS1", 4, [
{ id: "fortegnslinje", chk: ["(4-sqrt(16-12))/2 ≈ 1", "(4+sqrt(16-12))/2 ≈ 3"],
  nb: O("Fortegnslinje",
    R`En andregradsulikhet løses ved å finne nullpunktene og studere fortegnet mellom dem. Nullpunktene deler tallinjen i intervaller. I hvert intervall har uttrykket samme fortegn, så det holder å teste ett tall der. Parabelen vender opp når koeffisienten foran x i andre er positiv, og da er uttrykket positivt utenfor nullpunktene. Husk om nullpunktene selv skal være med.`,
    [[R`ax^2 + bx + c = 0`, "nullpunktene"], [R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, "abc-formelen"]],
    [["a,\\ b,\\ c", "koeffisienter", ""]],
    R`$x^2 - 4x + 3 = 0$ har røtter $x = \dfrac{4 \pm \sqrt{16 - 12}}{2}$, altså $x = 1$ og $x = 3$.
$x^2 - 4x + 3 > 0$ når $x < 1$ eller $x > 3$.`,
    R`Ta med likhet bare når ulikheten har med «lik» i tegnet.`),
  en: O("Sign chart",
    R`A quadratic inequality is solved by finding the zeros and studying the sign between them. The zeros split the number line into intervals. In each interval the expression has the same sign, so it is enough to test one number there. The parabola opens upwards when the coefficient of x squared is positive, and then the expression is positive outside the zeros. Remember whether the zeros themselves should be included.`,
    [[R`ax^2 + bx + c = 0`, "the zeros"], [R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, "the quadratic formula"]],
    [["a,\\ b,\\ c", "coefficients", ""]],
    R`$x^2 - 4x + 3 = 0$ has roots $x = \dfrac{4 \pm \sqrt{16 - 12}}{2}$, that is $x = 1$ and $x = 3$.
$x^2 - 4x + 3 > 0$ when $x < 1$ or $x > 3$.`,
    R`Include equality only when the inequality sign includes "equal".`) },
{ id: "lineaer-ulikhet", chk: ["(6+6)/3 ≈ 4"],
  nb: O("Lineære ulikheter",
    R`En lineær ulikhet har løsninger som er et intervall, ikke ett enkelt tall. Du samler x-leddene på den ene siden og tallene på den andre, akkurat som i en likning. Deler du med et positivt tall, beholder du ulikhetstegnet. Parentes betyr at endepunktet ikke er med, og hakeparentes at det er med. En streng ulikhet får derfor parentes.`,
    [[R`ax + b < c`, "lineær ulikhet"], [R`x < \frac{c - b}{a}`, "når a er positiv"]],
    [["a", "koeffisienten foran x", ""], ["x", "den ukjente", ""]],
    R`$3(x - 2) < 6$ gir $3x - 6 < 6$, altså $3x < 12$ og $x < 4$.
Grensen er $\dfrac{6 + 6}{3} = 4$.`,
    R`Snu tegnet bare når du ganger eller deler med et negativt tall.`),
  en: O("Linear inequalities",
    R`A linear inequality has solutions that are an interval, not a single number. You gather the x-terms on one side and the numbers on the other, just as in an equation. If you divide by a positive number, you keep the inequality sign. A parenthesis means the endpoint is not included, and a bracket that it is. A strict inequality therefore gets a parenthesis.`,
    [[R`ax + b < c`, "linear inequality"], [R`x < \frac{c - b}{a}`, "when a is positive"]],
    [["a", "the coefficient of x", ""], ["x", "the unknown", ""]],
    R`$3(x - 2) < 6$ gives $3x - 6 < 6$, so $3x < 12$ and $x < 4$.
The boundary is $\dfrac{6 + 6}{3} = 4$.`,
    R`Reverse the sign only when you multiply or divide by a negative number.`) },
{ id: "dobbel-ulikhet", chk: ["(-1-1)/2 ≈ -1", "(5-1)/2 ≈ 2"],
  nb: O("Doble ulikheter",
    R`En dobbel ulikhet sier at et uttrykk ligger mellom to tall. Du gjør den samme operasjonen på alle tre delene. Trekker du fra et tall, gjør du det i venstre, midterste og høyre del. Deler du med et positivt tall, beholder du begge tegnene. Til slutt skal x stå alene i midten, med den minste verdien til venstre. Les løsningen som et intervall.`,
    [[R`a < bx + c < d`, "dobbel ulikhet"], [R`\frac{a - c}{b} < x < \frac{d - c}{b}`, "når b er positiv"]],
    [["b", "koeffisienten foran x", ""], ["x", "den ukjente", ""]],
    R`$-1 < 2x + 1 < 5$. Trekk fra 1: $-2 < 2x < 4$.
Del på 2: $-1 < x < 2$. Grensene er $\dfrac{-1 - 1}{2} = -1$ og $\dfrac{5 - 1}{2} = 2$.`,
    R`Gjør det samme på alle tre sider. Ikke løs de to ulikhetene med ulike steg.`),
  en: O("Double inequalities",
    R`A double inequality says that an expression lies between two numbers. You do the same operation on all three parts. If you subtract a number, you do it in the left, middle and right part. If you divide by a positive number, you keep both signs. In the end x should stand alone in the middle, with the smaller value on the left. Read the solution as an interval.`,
    [[R`a < bx + c < d`, "double inequality"], [R`\frac{a - c}{b} < x < \frac{d - c}{b}`, "when b is positive"]],
    [["b", "the coefficient of x", ""], ["x", "the unknown", ""]],
    R`$-1 < 2x + 1 < 5$. Subtract 1: $-2 < 2x < 4$.
Divide by 2: $-1 < x < 2$. The boundaries are $\dfrac{-1 - 1}{2} = -1$ and $\dfrac{5 - 1}{2} = 2$.`,
    R`Do the same on all three sides. Do not solve the two inequalities with different steps.`) }
]);

// ---------- VGS1 5: Logaritmer ----------
TOPICS("VGS1", 5, [
{ id: "tierlogaritmer", chk: ["log10(1000) ≈ 3", "log10(0.01) ≈ -2", "10^3 ≈ 1000"],
  nb: O("Tierlogaritmer",
    R`Tierlogaritmen sier hvilken eksponent 10 må ha for å gi tallet. Logaritmen til 10 i n-te er n, og logaritmen til et tall mellom 0 og 1 er negativ. Du kan bare ta logaritmen av positive tall. Regnereglene gjør om produkter til summer og kvotienter til differanser, og en potens blir en faktor foran logaritmen. Det er derfor logaritmer løser eksponentiallikninger.`,
    [[R`\log_{10}(10^n) = n`, "definisjonen"], [R`\log_{10}(ab) = \log_{10} a + \log_{10} b`, "produktregel"]],
    [["n", "eksponenten", ""]],
    R`$\log_{10} 1000 = 3$, fordi $10^3 = 1000$.
$\log_{10} 0{,}01 = -2$, fordi $10^{-2} = 0{,}01$.`,
    R`Argumentet må være positivt. Logaritmen av et negativt tall finnes ikke.`),
  en: O("Common logarithms",
    R`The common logarithm says which exponent 10 must have to give the number. The logarithm of 10 to the n is n, and the logarithm of a number between 0 and 1 is negative. You can only take the logarithm of positive numbers. The rules turn products into sums and quotients into differences, and a power becomes a factor in front of the logarithm. That is why logarithms solve exponential equations.`,
    [[R`\log_{10}(10^n) = n`, "the definition"], [R`\log_{10}(ab) = \log_{10} a + \log_{10} b`, "product rule"]],
    [["n", "the exponent", ""]],
    R`$\log_{10} 1000 = 3$, because $10^3 = 1000$.
$\log_{10} 0.01 = -2$, because $10^{-2} = 0.01$.`,
    R`The argument must be positive. The logarithm of a negative number does not exist.`) },
{ id: "basisbytte", chk: ["ln(32)/ln(2) ≈ 5", "2^5 ≈ 32"],
  nb: O("Bytte av base",
    R`En logaritme i en base kan skrives om til en brøk av logaritmer i en annen base. Telleren er logaritmen av argumentet, og nevneren er logaritmen av den gamle basen. Formelen gjelder både for tierlogaritmen og for den naturlige logaritmen. Den brukes når kalkulatoren ikke har den basen oppgaven spør etter. Svaret er eksponenten den opprinnelige basen må ha.`,
    [[R`\log_b a = \frac{\ln a}{\ln b}`, "basisbytte"], [R`b^n = a \Rightarrow n = \log_b a`, "eksponenten"]],
    [["b", "basen", ""], ["a", "argumentet", ""]],
    R`$\log_2 32 = \dfrac{\ln 32}{\ln 2} = 5$, fordi $2^5 = 32$.`,
    R`Nevneren er logaritmen av basen, ikke av argumentet.`),
  en: O("Change of base",
    R`A logarithm in one base can be rewritten as a fraction of logarithms in another base. The numerator is the logarithm of the argument, and the denominator is the logarithm of the old base. The formula applies both to the common logarithm and to the natural logarithm. It is used when the calculator does not have the base the task asks for. The answer is the exponent the original base must have.`,
    [[R`\log_b a = \frac{\ln a}{\ln b}`, "change of base"], [R`b^n = a \Rightarrow n = \log_b a`, "the exponent"]],
    [["b", "the base", ""], ["a", "the argument", ""]],
    R`$\log_2 32 = \dfrac{\ln 32}{\ln 2} = 5$, because $2^5 = 32$.`,
    R`The denominator is the logarithm of the base, not of the argument.`) },
{ id: "doblingstid", chk: ["ln(2)/ln(1.05) ≈ 14.21"],
  nb: O("Doblingstid",
    R`Doblingstiden er hvor mange perioder det tar før en størrelse er doblet, når vekstfaktoren ligger fast. Du setter vekstfaktoren opphøyd i tiden lik 2, og løser med logaritme. Tiden blir den naturlige logaritmen av 2, delt på den naturlige logaritmen av vekstfaktoren. Høyere rente gir kortere doblingstid. Formelen forutsetter at prosenten er den samme i hver periode.`,
    [[R`b^t = 2`, "dobling"], [R`t = \frac{\ln 2}{\ln b}`, "doblingstid"]],
    [["b", "vekstfaktor per periode", ""], ["t", "antall perioder", ""]],
    R`Med 5 % rente er vekstfaktoren 1,05.
$t = \dfrac{\ln 2}{\ln 1{,}05} \approx 14{,}21$ år.`,
    R`Bruk vekstfaktoren, ikke prosenten, i nevneren.`),
  en: O("Doubling time",
    R`The doubling time is how many periods it takes before a quantity has doubled, when the growth factor stays fixed. You set the growth factor raised to the time equal to 2, and solve with a logarithm. The time is the natural logarithm of 2, divided by the natural logarithm of the growth factor. A higher interest rate gives a shorter doubling time. The formula assumes that the percentage is the same in every period.`,
    [[R`b^t = 2`, "doubling"], [R`t = \frac{\ln 2}{\ln b}`, "doubling time"]],
    [["b", "growth factor per period", ""], ["t", "number of periods", ""]],
    R`At 5% interest the growth factor is 1.05.
$t = \dfrac{\ln 2}{\ln 1.05} \approx 14.21$ years.`,
    R`Use the growth factor, not the percentage, in the denominator.`) }
]);

// ---------- VGS1 6: Eksponentielle modeller ----------
TOPICS("VGS1", 6, [
{ id: "prosentvis-vekst", chk: ["8000*1.03^10 ≈ 10751.3"],
  nb: O("Vekst med fast prosent",
    R`En eksponentiell modell har en startverdi og en vekstfaktor. Vekstfaktoren 1,03 betyr 3 % økning per periode. Etter n perioder har startverdien blitt ganget med vekstfaktoren n ganger. Modellen passer for rente, prisstigning og befolkningsvekst når prosenten er den samme hver gang. Du setter inn antall perioder til slutt, og avrunder slik oppgaven ber om.`,
    [[R`f(n) = a \cdot b^n`, "etter n perioder"], [R`b = 1 + \frac{p}{100}`, "vekstfaktor"]],
    [["a", "startverdi", "kr"], ["p", "prosent per periode", "%"], ["n", "antall perioder", ""]],
    R`8 000 kr med 3 % rente i 10 år: $8\,000 \cdot 1{,}03^{10} \approx 10\,751{,}3$ kr.`,
    R`Eksponenten er antall perioder, ikke prosenten.`),
  en: O("Growth by a fixed percentage",
    R`An exponential model has a starting value and a growth factor. The growth factor 1.03 means a 3% increase per period. After n periods the starting value has been multiplied by the growth factor n times. The model fits interest, inflation and population growth when the percentage is the same every time. You insert the number of periods at the end, and round as the task asks.`,
    [[R`f(n) = a \cdot b^n`, "after n periods"], [R`b = 1 + \frac{p}{100}`, "growth factor"]],
    [["a", "starting value", "NOK"], ["p", "percent per period", "%"], ["n", "number of periods", ""]],
    R`8,000 NOK at 3% interest for 10 years: $8\,000 \cdot 1.03^{10} \approx 10\,751.3$ NOK.`,
    R`The exponent is the number of periods, not the percentage.`) },
{ id: "eksponentiell-nedgang", chk: ["500*0.9^5 ≈ 295.25"],
  nb: O("Eksponentiell nedgang",
    R`Synker en størrelse med samme prosent hver periode, er vekstfaktoren mindre enn 1 og større enn 0. Ti prosent nedgang gir vekstfaktoren 0,9, ikke minus 0,1. Du ganger startverdien med denne faktoren én gang per periode. Verdien blir mindre, men den blir ikke negativ av formelen alene. En fast kronesum i fradrag hver periode er lineær nedgang, ikke eksponentiell.`,
    [[R`f(n) = a \cdot b^n`, "nedgang når 0 < b < 1"], [R`b = 1 - \frac{p}{100}`, "vekstfaktor ved nedgang"]],
    [["a", "startverdi", ""], ["b", "vekstfaktor", ""], ["p", "prosent ned per periode", "%"]],
    R`En gjenstand til 500 kr taper 10 % av verdien hvert år.
Etter 5 år: $500 \cdot 0{,}9^5 \approx 295{,}25$ kr.`,
    R`Ti prosent nedgang er faktor 0,9. Ikke trekk fra 10 % av startverdien fem ganger.`),
  en: O("Exponential decrease",
    R`If a quantity falls by the same percentage each period, the growth factor is less than 1 and greater than 0. A ten percent decrease gives the growth factor 0.9, not minus 0.1. You multiply the starting value by this factor once per period. The value becomes smaller, but the formula alone does not make it negative. A fixed amount subtracted each period is linear decrease, not exponential.`,
    [[R`f(n) = a \cdot b^n`, "decrease when 0 < b < 1"], [R`b = 1 - \frac{p}{100}`, "growth factor for a decrease"]],
    [["a", "starting value", ""], ["b", "growth factor", ""], ["p", "percent down per period", "%"]],
    R`An item worth 500 NOK loses 10% of its value each year.
After 5 years: $500 \cdot 0.9^5 \approx 295.25$ NOK.`,
    R`A ten percent decrease is the factor 0.9. Do not subtract 10% of the starting value five times.`) },
{ id: "finn-vekstfaktor", chk: ["sqrt(1210/1000) ≈ 1.1", "(sqrt(1210/1000)-1)*100 ≈ 10"],
  nb: O("Finne vekstfaktoren",
    R`Kjenner du verdien ved to tidspunkter, finner du vekstfaktoren fra forholdet mellom dem. Etter n perioder er forholdet lik vekstfaktoren opphøyd i n, så du tar n-te rot. Prosenten er deretter vekstfaktoren minus 1, ganget med 100. Metoden forutsetter at prosenten har vært den samme i hele perioden. To punkter med ulik prosent underveis gir bare en gjennomsnittlig vekstfaktor.`,
    [[R`b = \sqrt[n]{\frac{f(n)}{f(0)}}`, "vekstfaktor"], [R`p = (b - 1) \cdot 100`, "prosent"]],
    [["b", "vekstfaktor per periode", ""], ["n", "antall perioder", ""], ["p", "prosent", "%"]],
    R`Fra 1000 til 1210 på 2 år: $b = \sqrt{1210/1000} = 1{,}1$.
Det er $(1{,}1 - 1) \cdot 100 = 10$ % per år.`,
    R`Roten har samme indeks som antall perioder.`),
  en: O("Finding the growth factor",
    R`If you know the value at two times, you find the growth factor from the ratio between them. After n periods the ratio equals the growth factor raised to n, so you take the n-th root. The percentage is then the growth factor minus 1, multiplied by 100. The method assumes that the percentage has been the same throughout the period. Two points with a changing percentage along the way give only an average growth factor.`,
    [[R`b = \sqrt[n]{\frac{f(n)}{f(0)}}`, "growth factor"], [R`p = (b - 1) \cdot 100`, "percent"]],
    [["b", "growth factor per period", ""], ["n", "number of periods", ""], ["p", "percent", "%"]],
    R`From 1000 to 1210 in 2 years: $b = \sqrt{1210/1000} = 1.1$.
That is $(1.1 - 1) \cdot 100 = 10$% per year.`,
    R`The root has the same index as the number of periods.`) }
]);

// ---------- VGS1 7: Kostnad, inntekt og overskudd ----------
TOPICS("VGS1", 7, [
{ id: "maks-overskudd", chk: ["(100-20)/0.04 ≈ 2000", "2000*100-(0.02*2000^2+20*2000+5000) ≈ 75000"],
  nb: O("Produksjon og overskudd",
    R`Overskuddet er størst der grenseinntekten er lik grensekostnaden. Med fast pris er grenseinntekten selve prisen. Du deriverer kostnaden, setter prisen lik den deriverte og løser for antall enheter. Deretter regner du ut overskuddet ved å trekke kostnaden fra inntekten. At den deriverte er null, er ikke nok alene: for denne kostnaden, som krummer oppover, er det et toppunkt for overskuddet.`,
    [[R`O(x) = px - K(x)`, "overskudd"], [R`p = K'(x)`, "størst overskudd"]],
    [["p", "pris per enhet", "kr"], ["K", "kostnad", "kr"], ["x", "antall", ""]],
    R`$K(x) = 0{,}02x^2 + 20x + 5000$ og prisen er 100 kr.
$x = \dfrac{100 - 20}{0{,}04} = 2000$. $O(2000) = 200\,000 - (80\,000 + 40\,000 + 5000) = 75\,000$ kr.`,
    R`Produser så lenge én enhet til gir mer inntekt enn den koster.`),
  en: O("Production and profit",
    R`The profit is largest where marginal revenue equals marginal cost. With a fixed price the marginal revenue is the price itself. You differentiate the cost, set the price equal to the derivative and solve for the number of units. Then you calculate the profit by subtracting the cost from the revenue. That the derivative is zero is not enough on its own: for this cost, which curves upwards, it is a maximum of the profit.`,
    [[R`P(x) = px - C(x)`, "profit"], [R`p = C'(x)`, "largest profit"]],
    [["p", "price per unit", "NOK"], ["C", "cost", "NOK"], ["x", "number", ""]],
    R`$C(x) = 0.02x^2 + 20x + 5000$ and the price is 100 NOK.
$x = \dfrac{100 - 20}{0.04} = 2000$. $P(2000) = 200\,000 - (80\,000 + 40\,000 + 5000) = 75\,000$ NOK.`,
    R`Keep producing as long as one more unit brings in more than it costs.`) },
{ id: "min-enhetskostnad", chk: ["sqrt(100/1) ≈ 10", "10+100/10 ≈ 20"],
  nb: O("Minste enhetskostnad",
    R`Enhetskostnaden er kostnaden per enhet, altså kostnadsfunksjonen delt på antall. Den er minst der den er lik grensekostnaden. For en kostnad på formen ax i andre pluss et fast ledd, uten lineært ledd, ligger minimumet der x er kvadratroten av det faste leddet delt på a. Du setter den x-verdien inn i enhetskostnaden for å få selve beløpet.`,
    [[R`E(x) = ax + \frac{c}{x}`, "når K(x) = ax^2 + c"], [R`x = \sqrt{\frac{c}{a}}`, "minste enhetskostnad"]],
    [["a", "koeffisient", ""], ["c", "fast kostnad", "kr"], ["E", "enhetskostnad", "kr"]],
    R`$K(x) = x^2 + 100$. $E(x) = x + \dfrac{100}{x}$ er minst ved $x = \sqrt{100} = 10$.
Da er $E(10) = 10 + \dfrac{100}{10} = 20$ kr.`,
    R`Minimum når enhetskostnad er lik grensekostnad.`),
  en: O("Minimum unit cost",
    R`The unit cost is the cost per unit, that is the cost function divided by the number. It is smallest where it equals the marginal cost. For a cost of the form a times x squared plus a fixed term, with no linear term, the minimum is where x is the square root of the fixed term divided by a. You insert that x-value into the unit cost to get the amount itself.`,
    [[R`A(x) = ax + \frac{c}{x}`, "when C(x) = ax^2 + c"], [R`x = \sqrt{\frac{c}{a}}`, "minimum unit cost"]],
    [["a", "coefficient", ""], ["c", "fixed cost", "NOK"], ["A", "unit cost", "NOK"]],
    R`$C(x) = x^2 + 100$. $A(x) = x + \dfrac{100}{x}$ is smallest at $x = \sqrt{100} = 10$.
Then $A(10) = 10 + \dfrac{100}{10} = 20$ NOK.`,
    R`The minimum is where unit cost equals marginal cost.`) },
{ id: "grensekostnad-tall", chk: ["0.02*100+20 ≈ 22"],
  nb: O("Grensekostnad i et punkt",
    R`Grensekostnaden i et punkt er den deriverte regnet ut for det antallet. Du deriverer ledd for ledd, setter inn x og får et kronebeløp per enhet. Det er ikke det samme som enhetskostnaden, og heller ikke det samme som den totale kostnaden. Tallet sier hva den neste enheten omtrent koster når du allerede produserer så mange. Faste kostnader forsvinner når du deriverer.`,
    [[R`K'(x) = 2ax + b`, "når K(x) = ax^2 + bx + c"]],
    [["K'", "grensekostnad", "kr"], ["x", "antall enheter", ""]],
    R`$K(x) = 0{,}01x^2 + 20x + 5000$. $K'(x) = 0{,}02x + 20$.
$K'(100) = 0{,}02 \cdot 100 + 20 = 22$ kr per enhet.`,
    R`Den faste kostnaden er borte i den deriverte.`),
  en: O("Marginal cost at a point",
    R`The marginal cost at a point is the derivative evaluated at that number. You differentiate term by term, insert x and get an amount of money per unit. It is not the same as the unit cost, and not the same as the total cost. The number says roughly what the next unit costs when you are already producing that many. Fixed costs disappear when you differentiate.`,
    [[R`C'(x) = 2ax + b`, "when C(x) = ax^2 + bx + c"]],
    [["C'", "marginal cost", "NOK"], ["x", "number of units", ""]],
    R`$C(x) = 0.01x^2 + 20x + 5000$. $C'(x) = 0.02x + 20$.
$C'(100) = 0.02 \cdot 100 + 20 = 22$ NOK per unit.`,
    R`The fixed cost is gone in the derivative.`) }
]);

// ---------- VGS2 0: Følger og rekker ----------
TOPICS("VGS2", 0, [
{ id: "aritmetisk-rekke", chk: ["3+(10-1)*4 ≈ 39", "10*(3+39)/2 ≈ 210"],
  nb: O("Aritmetisk følge og rekke",
    R`I en aritmetisk følge er differansen mellom naboledd den samme. Ledd nummer n er det første leddet pluss differansen lagt til n minus 1 ganger. Summen av de n første leddene er antall ledd ganget med gjennomsnittet av det første og det siste. Du finner altså det siste leddet først. En fast differanse, ikke en fast faktor, er kjennetegnet.`,
    [[R`a_n = a_1 + (n-1)d`, "ledd nummer n"], [R`S_n = \frac{n(a_1 + a_n)}{2}`, "summen"]],
    [["a_1", "første ledd", ""], ["d", "differansen", ""], ["n", "antall ledd", ""]],
    R`$a_1 = 3$ og $d = 4$ gir $a_{10} = 3 + 9 \cdot 4 = 39$.
Summen er $\dfrac{10(3 + 39)}{2} = 210$.`,
    R`Det er n minus 1 steg fra første ledd til ledd nummer n.`),
  en: O("Arithmetic sequence and series",
    R`In an arithmetic sequence the difference between neighbouring terms is constant. Term number n is the first term plus the difference added n minus 1 times. The sum of the first n terms is the number of terms times the average of the first and the last. You therefore find the last term first. A constant difference, not a constant factor, is the sign to look for.`,
    [[R`a_n = a_1 + (n-1)d`, "term number n"], [R`S_n = \frac{n(a_1 + a_n)}{2}`, "the sum"]],
    [["a_1", "the first term", ""], ["d", "the difference", ""], ["n", "the number of terms", ""]],
    R`$a_1 = 3$ and $d = 4$ give $a_{10} = 3 + 9 \cdot 4 = 39$.
The sum is $\dfrac{10(3 + 39)}{2} = 210$.`,
    R`There are n minus 1 steps from the first term to term number n.`) },
{ id: "geometrisk-rekke", chk: ["2*3^(5-1) ≈ 162", "2*(3^5-1)/(3-1) ≈ 242"],
  nb: O("Geometrisk følge og rekke",
    R`I en geometrisk følge ganger du med samme kvotient for hvert nytt ledd. Ledd nummer n er det første leddet ganget med kvotienten opphøyd i n minus 1. Summen av de n første har en formel som gjelder når kvotienten ikke er 1. Du kan kontrollere ved å skrive ut de første leddene og legge dem sammen. En fast faktor er kjennetegnet.`,
    [[R`a_n = a_1 k^{n-1}`, "ledd nummer n"], [R`S_n = a_1\frac{k^n - 1}{k - 1}`, "summen"]],
    [["a_1", "første ledd", ""], ["k", "kvotienten", ""]],
    R`$a_1 = 2$ og $k = 3$ gir $a_5 = 2 \cdot 3^4 = 162$.
Summen av de fem første er $2 \cdot \dfrac{3^5 - 1}{3 - 1} = 242$.`,
    R`Eksponenten i ledd nummer n er n minus 1. I sumformelen er den n.`),
  en: O("Geometric sequence and series",
    R`In a geometric sequence you multiply by the same ratio for each new term. Term number n is the first term times the ratio raised to n minus 1. The sum of the first n terms has a formula that applies when the ratio is not 1. You can check by writing out the first terms and adding them. A constant factor is the sign to look for.`,
    [[R`a_n = a_1 k^{n-1}`, "term number n"], [R`S_n = a_1\frac{k^n - 1}{k - 1}`, "the sum"]],
    [["a_1", "the first term", ""], ["k", "the ratio", ""]],
    R`$a_1 = 2$ and $k = 3$ give $a_5 = 2 \cdot 3^4 = 162$.
The sum of the first five is $2 \cdot \dfrac{3^5 - 1}{3 - 1} = 242$.`,
    R`The exponent in term number n is n minus 1. In the sum formula it is n.`) },
{ id: "uendelig-geometrisk", chk: ["12/(1-0.25) ≈ 16", "1/(1-0.5) ≈ 2"],
  nb: O("Uendelig geometrisk rekke",
    R`En uendelig geometrisk rekke har en endelig sum bare når tallverdien av kvotienten er mindre enn 1. Da blir leddene mindre og mindre, og summen er det første leddet delt på 1 minus kvotienten. Er tallverdien større enn eller lik 1, vokser leddene eller holder seg like store, og summen finnes ikke som et tall. Sjekk kvotienten før du bruker formelen.`,
    [[R`S = \frac{a_1}{1 - k}`, "sum når |k| < 1"], [R`|k| < 1`, "vilkår"]],
    [["a_1", "første ledd", ""], ["k", "kvotienten", ""], ["S", "summen", ""]],
    R`$a_1 = 12$ og $k = 0{,}25$ gir $S = \dfrac{12}{1 - 0{,}25} = 16$.
Rekken $1 + \dfrac{1}{2} + \dfrac{1}{4} + \cdots$ har sum $\dfrac{1}{1 - 0{,}5} = 2$.`,
    R`Formelen gjelder ikke når kvotienten er 1 eller større.`),
  en: O("Infinite geometric series",
    R`An infinite geometric series has a finite sum only when the absolute value of the ratio is less than 1. Then the terms get smaller and smaller, and the sum is the first term divided by 1 minus the ratio. If the absolute value is greater than or equal to 1, the terms grow or stay the same size, and the sum does not exist as a number. Check the ratio before you use the formula.`,
    [[R`S = \frac{a_1}{1 - k}`, "sum when |k| < 1"], [R`|k| < 1`, "the condition"]],
    [["a_1", "the first term", ""], ["k", "the ratio", ""], ["S", "the sum", ""]],
    R`$a_1 = 12$ and $k = 0.25$ give $S = \dfrac{12}{1 - 0.25} = 16$.
The series $1 + \dfrac{1}{2} + \dfrac{1}{4} + \cdots$ has sum $\dfrac{1}{1 - 0.5} = 2$.`,
    R`The formula does not apply when the ratio is 1 or greater.`) }
]);

// ---------- VGS2 1: Sparing, lån og nåverdi ----------
TOPICS("VGS2", 1, [
{ id: "sparebelop", chk: ["10000*(1.04^5-1)/0.04 ≈ 54163.2"],
  nb: O("Sparekonto",
    R`Setter du inn samme beløp på slutten av hver termin, og renten ligger fast, blir saldoen en geometrisk rekke. Hvert innskudd har rukket å vokse like mange terminer som de som står igjen etter det. Rett etter siste innskudd har det siste innskuddet ikke rukket å få rente. Formelen bruker vekstfaktoren og antall innskudd. Første innskudd i starten av perioden er en annen situasjon.`,
    [[R`S = a \cdot \frac{k^n - 1}{k - 1}`, "rett etter siste innskudd"], [R`k = 1 + r`, "vekstfaktor"]],
    [["a", "innskudd per termin", "kr"], ["r", "rente per termin", ""], ["n", "antall terminer", ""]],
    R`10 000 kr på slutten av hvert år i 5 år, 4 % rente.
$S = 10\,000 \cdot \dfrac{1{,}04^5 - 1}{0{,}04} \approx 54\,163{,}2$ kr.`,
    R`Formelens tidspunkt er rett etter siste innskudd.`),
  en: O("A savings account",
    R`If you deposit the same amount at the end of each period, and the interest stays fixed, the balance becomes a geometric series. Each deposit has had time to grow for as many periods as remain after it. Right after the last deposit, that last deposit has not yet earned interest. The formula uses the growth factor and the number of deposits. A first deposit at the start of the period is a different situation.`,
    [[R`S = a \cdot \frac{k^n - 1}{k - 1}`, "right after the last deposit"], [R`k = 1 + r`, "growth factor"]],
    [["a", "deposit per period", "NOK"], ["r", "interest per period", ""], ["n", "number of periods", ""]],
    R`10,000 NOK at the end of each year for 5 years, at 4% interest.
$S = 10\,000 \cdot \dfrac{1.04^5 - 1}{0.04} \approx 54\,163.2$ NOK.`,
    R`The formula's moment is right after the last deposit.`) },
{ id: "naaverdi", chk: ["1000/1.1+1000/1.1^2+1000/1.1^3 ≈ 2486.85"],
  nb: O("Nåverdi",
    R`En krone i fremtiden er mindre verdt enn en krone i dag, fordi dagens krone kan stå og få rente. Nåverdien er det beløpet du må sette inn i dag for å ha det fremtidige beløpet når tiden er gått. Du deler på vekstfaktoren én gang per termin. Flere like beløp, med det første om ett år, er en geometrisk rekke av slike diskonterte beløp. Kalkulasjonsrenten er renten du bruker i delingen.`,
    [[R`N = \frac{B}{k^n}`, "ett beløp om n terminer"], [R`N = a \cdot \frac{1 - k^{-n}}{r}`, "n like beløp"]],
    [["k", "vekstfaktor", ""], ["r", "rente per termin", ""], ["a", "beløp per termin", "kr"]],
    R`1000 kr om ett, to og tre år, med 10 % rente.
$N = \dfrac{1000}{1{,}1} + \dfrac{1000}{1{,}1^2} + \dfrac{1000}{1{,}1^3} \approx 2486{,}85$ kr.`,
    R`Flytt alle beløp til samme tidspunkt før du legger dem sammen.`),
  en: O("Present value",
    R`One krone in the future is worth less than one krone today, because today's krone can earn interest. The present value is the amount you must deposit today in order to have the future amount when the time has passed. You divide by the growth factor once per period. Several equal amounts, the first in one year, are a geometric series of such discounted amounts. The discount rate is the interest rate you use in the division.`,
    [[R`V = \frac{B}{k^n}`, "one amount in n periods"], [R`V = a \cdot \frac{1 - k^{-n}}{r}`, "n equal amounts"]],
    [["k", "growth factor", ""], ["r", "interest per period", ""], ["a", "amount per period", "NOK"]],
    R`1000 NOK in one, two and three years, at 10% interest.
$V = \dfrac{1000}{1.1} + \dfrac{1000}{1.1^2} + \dfrac{1000}{1.1^3} \approx 2486.85$ NOK.`,
    R`Move every amount to the same point in time before you add them.`) },
{ id: "annuitetslan", chk: ["1000000*0.05/(1-1.05^-20) ≈ 80242.6"],
  nb: O("Annuitetslån",
    R`Et annuitetslån betales med like store terminbeløp. Lånet i dag er nåverdien av alle disse beløpene. Derfor kan terminbeløpet skrives som lånet ganget med renten, delt på 1 minus vekstfaktoren opphøyd i minus antall terminer. I begynnelsen er en stor del av terminbeløpet rente. Mot slutten er nesten hele beløpet avdrag. Renten i formelen er renten per termin, ikke nødvendigvis per år.`,
    [[R`a = \frac{L \cdot r}{1 - (1 + r)^{-n}}`, "terminbeløp"]],
    [["L", "lånet", "kr"], ["r", "rente per termin", ""], ["n", "antall terminer", ""], ["a", "terminbeløp", "kr"]],
    R`Lån på 1 000 000 kr, 5 % rente, 20 årlige terminer.
$a = \dfrac{1\,000\,000 \cdot 0{,}05}{1 - 1{,}05^{-20}} \approx 80\,242{,}6$ kr per år.`,
    R`Avrundet til nærmeste krone er dette 80 243 kr, som i kursets eksempel.`),
  en: O("Annuity loan",
    R`An annuity loan is paid with equal instalments. The loan today is the present value of all these amounts. The instalment can therefore be written as the loan times the interest, divided by 1 minus the growth factor raised to minus the number of periods. At the start a large part of the instalment is interest. Towards the end almost the whole amount is repayment. The interest in the formula is the interest per period, not necessarily per year.`,
    [[R`a = \frac{L \cdot r}{1 - (1 + r)^{-n}}`, "instalment"]],
    [["L", "the loan", "NOK"], ["r", "interest per period", ""], ["n", "number of periods", ""], ["a", "instalment", "NOK"]],
    R`A loan of 1,000,000 NOK, 5% interest, 20 annual instalments.
$a = \dfrac{1\,000\,000 \cdot 0.05}{1 - 1.05^{-20}} \approx 80\,242.6$ NOK per year.`,
    R`Rounded to the nearest krone this is 80,243 NOK, as in the course example.`) },
{ id: "serielan", chk: ["1000000/20 ≈ 50000", "0.05*1000000 ≈ 50000", "50000+50000 ≈ 100000", "0.05*50000 ≈ 2500"],
  nb: O("Serielån",
    R`Et serielån har like store avdrag. Avdraget er lånet delt på antall terminer. Renten regnes av det som står igjen, så første termin har høyest rente og høyest terminbeløp. For hver termin synker restlånet med ett avdrag, og renten synker med renten av ett avdrag. Terminbeløpet blir derfor mindre og mindre. Det skiller serielånet fra annuitetslånet, der terminbeløpet er konstant.`,
    [[R`\text{avdrag} = \frac{L}{n}`, "likt hver termin"], [R`\text{rente} = r \cdot \text{restlån}`, "synker"]],
    [["L", "lånet", "kr"], ["n", "antall terminer", ""], ["r", "rente per termin", ""]],
    R`Lån på 1 000 000 kr, 20 år, 5 % rente. Avdrag $1\,000\,000/20 = 50\,000$ kr.
Første rente $0{,}05 \cdot 1\,000\,000 = 50\,000$ kr, så første termin er $100\,000$ kr.
Den synker med $0{,}05 \cdot 50\,000 = 2500$ kr per år.`,
    R`Avdraget er fast. Terminbeløpet synker.`),
  en: O("Serial loan",
    R`A serial loan has equal repayments. The repayment is the loan divided by the number of periods. Interest is charged on what remains, so the first period has the highest interest and the highest instalment. Each period the remaining loan falls by one repayment, and the interest falls by the interest on one repayment. The instalment therefore becomes smaller and smaller. That distinguishes the serial loan from the annuity loan, where the instalment is constant.`,
    [[R`\text{repayment} = \frac{L}{n}`, "equal each period"], [R`\text{interest} = r \cdot \text{remaining}`, "decreases"]],
    [["L", "the loan", "NOK"], ["n", "number of periods", ""], ["r", "interest per period", ""]],
    R`A loan of 1,000,000 NOK, 20 years, 5% interest. Repayment $1\,000\,000/20 = 50\,000$ NOK.
First interest $0.05 \cdot 1\,000\,000 = 50\,000$ NOK, so the first instalment is $100\,000$ NOK.
It decreases by $0.05 \cdot 50\,000 = 2500$ NOK per year.`,
    R`The repayment is fixed. The instalment decreases.`) }
]);

// ---------- VGS2 2: Derivasjonsregler i praksis ----------
TOPICS("VGS2", 2, [
{ id: "kjerneregel", chk: ["5*2*(2*1-1)^4 ≈ 10", "3*exp(0) ≈ 3"],
  nb: O("Kjerneregelen",
    R`Kjerneregelen deriverer en funksjon som står rundt en annen funksjon. Du deriverer den ytre funksjonen, lar kjernen stå, og ganger med den deriverte av kjernen. For en potens av en lineær kjerne kommer både den gamle eksponenten og stigningstallet i kjernen med som faktorer. Eksponentialfunksjonen med grunntall e er sin egen deriverte, så en koeffisient i eksponenten blir en faktor foran.`,
    [[R`((ax+b)^n)' = na(ax+b)^{n-1}`, "potens av lineær kjerne"], [R`(e^{kx})' = ke^{kx}`, "eksponential"]],
    [["a", "stigningstall i kjernen", ""], ["k", "koeffisient i eksponenten", ""]],
    R`$f(x) = (2x - 1)^5$ gir $f'(x) = 10(2x - 1)^4$, så $f'(1) = 10$.
$(e^{3x})' = 3e^{3x}$, som er $3$ når $x = 0$.`,
    R`Ytre derivert ganger indre derivert.`),
  en: O("The chain rule",
    R`The chain rule differentiates a function wrapped around another function. You differentiate the outer function, leave the inner function in place, and multiply by the derivative of the inner function. For a power of a linear inner function both the old exponent and the slope of the inner function appear as factors. The exponential function with base e is its own derivative, so a coefficient in the exponent becomes a factor in front.`,
    [[R`((ax+b)^n)' = na(ax+b)^{n-1}`, "power of a linear inner function"], [R`(e^{kx})' = ke^{kx}`, "exponential"]],
    [["a", "slope of the inner function", ""], ["k", "coefficient in the exponent", ""]],
    R`$f(x) = (2x - 1)^5$ gives $f'(x) = 10(2x - 1)^4$, so $f'(1) = 10$.
$(e^{3x})' = 3e^{3x}$, which is $3$ when $x = 0$.`,
    R`Outer derivative times inner derivative.`) },
{ id: "derivert-ln", chk: ["1/4 ≈ 0.25", "(2*2)/(4+1) ≈ 0.8"],
  nb: O("Den deriverte av ln",
    R`Den deriverte av den naturlige logaritmen av x er 1 delt på x, for positive x. Står det en funksjon inni logaritmen, deler du den deriverte av innsiden på innsiden selv. Nevneren er altså kjernen, ikke den deriverte. Ln vokser for alle positive x, så den deriverte er positiv der. Du kan bare derivere ln der argumentet er positivt.`,
    [[R`(\ln x)' = \frac{1}{x}`, "grunntilfellet"], [R`(\ln u)' = \frac{u'}{u}`, "med kjerne"]],
    [["u", "kjernen, positiv", ""], ["u'", "den deriverte av kjernen", ""]],
    R`$(\ln x)'$ i $x = 4$ er $\dfrac{1}{4} = 0{,}25$.
$(\ln(x^2 + 1))'$ i $x = 2$ er $\dfrac{2 \cdot 2}{2^2 + 1} = 0{,}8$.`,
    R`Brøken er den deriverte av kjernen delt på kjernen.`),
  en: O("The derivative of ln",
    R`The derivative of the natural logarithm of x is 1 divided by x, for positive x. If a function sits inside the logarithm, you divide the derivative of the inside by the inside itself. The denominator is therefore the inner function, not its derivative. Ln increases for every positive x, so the derivative is positive there. You can only differentiate ln where the argument is positive.`,
    [[R`(\ln x)' = \frac{1}{x}`, "the basic case"], [R`(\ln u)' = \frac{u'}{u}`, "with an inner function"]],
    [["u", "the inner function, positive", ""], ["u'", "the derivative of the inner function", ""]],
    R`$(\ln x)'$ at $x = 4$ is $\dfrac{1}{4} = 0.25$.
$(\ln(x^2 + 1))'$ at $x = 2$ is $\dfrac{2 \cdot 2}{2^2 + 1} = 0.8$.`,
    R`The fraction is the derivative of the inner function divided by the inner function.`) },
{ id: "produkt-og-brok", chk: ["(1+0)*exp(0) ≈ 1", "(1*(1+1)-1*1)/(1+1)^2 ≈ 0.25"],
  nb: O("Produktregelen og brøkregelen",
    R`Produktregelen deriverer et produkt ved å ta den deriverte av den ene faktoren ganger den andre, pluss omvendt. Brøkregelen tar den deriverte av telleren ganger nevneren, minus telleren ganger den deriverte av nevneren, og deler på nevneren i andre. Minuset gjør at rekkefølgen teller. Skriv opp u og v og de deriverte før du setter sammen, så bytter du ikke om leddene.`,
    [[R`(uv)' = u'v + uv'`, "produktregelen"], [R`\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}`, "brøkregelen"]],
    [["u,\\ v", "faktorene eller teller og nevner", ""]],
    R`$(xe^x)' = e^x + xe^x = (1 + x)e^x$, som er $1$ når $x = 0$.
$\left(\dfrac{x}{x + 1}\right)' = \dfrac{1}{(x + 1)^2}$, som er $0{,}25$ når $x = 1$.`,
    R`I brøkregelen står minus mellom leddene. Bytter du dem, får du feil fortegn.`),
  en: O("The product rule and the quotient rule",
    R`The product rule differentiates a product by taking the derivative of one factor times the other, plus the other way round. The quotient rule takes the derivative of the numerator times the denominator, minus the numerator times the derivative of the denominator, and divides by the denominator squared. The minus sign makes the order matter. Write down u and v and the derivatives before you assemble them, so you do not swap the terms.`,
    [[R`(uv)' = u'v + uv'`, "the product rule"], [R`\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}`, "the quotient rule"]],
    [["u,\\ v", "the factors, or numerator and denominator", ""]],
    R`$(xe^x)' = e^x + xe^x = (1 + x)e^x$, which is $1$ when $x = 0$.
$\left(\dfrac{x}{x + 1}\right)' = \dfrac{1}{(x + 1)^2}$, which is $0.25$ when $x = 1$.`,
    R`In the quotient rule there is a minus between the terms. If you swap them, the sign is wrong.`) }
]);

// ---------- VGS2 3: Kostnad (delt med S1, egne tall) ----------
TOPICS("VGS2", 3, [
{ id: "optimal-produksjon", chk: ["(50-10)/0.2 ≈ 200", "200*50-(0.1*200^2+10*200+1000) ≈ 3000"],
  nb: O("Optimal produksjon",
    R`Med en annen pris og en annen kostnadsfunksjon enn i S1-eksemplet er regelen den samme. Overskuddet er størst der prisen er lik grensekostnaden. Du løser den likningen, setter antall inn i inntekt minus kostnad, og får overskuddet i kroner. Fordi kostnaden har positiv x i andre, er grensekostnaden voksende, og punktet er et toppunkt for overskuddet.`,
    [[R`O'(x) = p - K'(x) = 0`, "vilkår"], [R`O(x) = px - K(x)`, "overskudd"]],
    [["p", "pris", "kr"], ["K", "kostnad", "kr"], ["x", "antall", ""]],
    R`Pris 50 kr og $K(x) = 0{,}1x^2 + 10x + 1000$.
$x = \dfrac{50 - 10}{0{,}2} = 200$. $O(200) = 10\,000 - 7000 = 3000$ kr.`,
    R`Grenseinntekt lik grensekostnad. Regn ut overskuddet etterpå.`),
  en: O("Optimal production",
    R`With a different price and a different cost function from the S1 example, the rule is the same. The profit is largest where the price equals the marginal cost. You solve that equation, insert the number into revenue minus cost, and get the profit in money. Because the cost has a positive coefficient of x squared, the marginal cost is increasing, and the point is a maximum of the profit.`,
    [[R`P'(x) = p - C'(x) = 0`, "the condition"], [R`P(x) = px - C(x)`, "profit"]],
    [["p", "price", "NOK"], ["C", "cost", "NOK"], ["x", "number", ""]],
    R`Price 50 NOK and $C(x) = 0.1x^2 + 10x + 1000$.
$x = \dfrac{50 - 10}{0.2} = 200$. $P(200) = 10\,000 - 7000 = 3000$ NOK.`,
    R`Marginal revenue equals marginal cost. Calculate the profit afterwards.`) },
{ id: "enhetskostnad-min", chk: ["sqrt(200/2) ≈ 10", "2*10+50+200/10 ≈ 90"],
  nb: O("Minste enhetskostnad",
    R`Enhetskostnaden deler hele kostnaden på antall enheter. Med både et kvadratisk ledd, et lineært ledd og et fast ledd er den et uttrykk med x, en konstant og et ledd med x i nevneren. Den deriverte er null når det kvadratiske bidraget og det faste bidraget veier likt, altså når x er kvadratroten av det faste leddet delt på koeffisienten foran x i andre. Sett inn for å få kronebeløpet.`,
    [[R`E(x) = ax + b + \frac{c}{x}`, "enhetskostnad"], [R`x = \sqrt{\frac{c}{a}}`, "minimum"]],
    [["a,\\ b,\\ c", "koeffisienter i K", ""], ["E", "enhetskostnad", "kr"]],
    R`$K(x) = 2x^2 + 50x + 200$. Minimum ved $x = \sqrt{200/2} = 10$.
$E(10) = 2 \cdot 10 + 50 + \dfrac{200}{10} = 90$ kr.`,
    R`x er positiv i en produksjon, så vi tar den positive roten.`),
  en: O("Minimum unit cost",
    R`The unit cost divides the whole cost by the number of units. With a quadratic term, a linear term and a fixed term it is an expression with x, a constant and a term with x in the denominator. The derivative is zero when the quadratic contribution and the fixed contribution weigh the same, that is when x is the square root of the fixed term divided by the coefficient of x squared. Insert it to get the amount.`,
    [[R`A(x) = ax + b + \frac{c}{x}`, "unit cost"], [R`x = \sqrt{\frac{c}{a}}`, "the minimum"]],
    [["a,\\ b,\\ c", "coefficients in C", ""], ["A", "unit cost", "NOK"]],
    R`$C(x) = 2x^2 + 50x + 200$. The minimum is at $x = \sqrt{200/2} = 10$.
$A(10) = 2 \cdot 10 + 50 + \dfrac{200}{10} = 90$ NOK.`,
    R`x is positive in a production, so we take the positive root.`) },
{ id: "grensekostnad-verdi", chk: ["0.5*40+12 ≈ 32"],
  nb: O("Grensekostnad",
    R`Grensekostnaden er den deriverte av kostnaden, regnet ut ved det antallet du allerede produserer. Et kvadratisk ledd gir et ledd med x i den deriverte, og et lineært ledd blir en konstant. Det faste leddet forsvinner. Tallet er kroner per ekstra enhet, ikke den samlede kostnaden. Du bruker det når du skal sammenligne med prisen på én enhet til.`,
    [[R`K'(x) = 2ax + b`, "grensekostnad"]],
    [["K'", "grensekostnad", "kr"], ["x", "antall", ""]],
    R`$K(x) = 0{,}25x^2 + 12x + 300$. $K'(x) = 0{,}5x + 12$.
$K'(40) = 0{,}5 \cdot 40 + 12 = 32$ kr.`,
    R`Sammenlign grensekostnaden med prisen før du lager én enhet til.`),
  en: O("Marginal cost",
    R`The marginal cost is the derivative of the cost, evaluated at the number you are already producing. A quadratic term gives a term with x in the derivative, and a linear term becomes a constant. The fixed term disappears. The number is money per extra unit, not the total cost. You use it when you compare with the price of one more unit.`,
    [[R`C'(x) = 2ax + b`, "marginal cost"]],
    [["C'", "marginal cost", "NOK"], ["x", "number", ""]],
    R`$C(x) = 0.25x^2 + 12x + 300$. $C'(x) = 0.5x + 12$.
$C'(40) = 0.5 \cdot 40 + 12 = 32$ NOK.`,
    R`Compare the marginal cost with the price before you make one more unit.`) }
]);

// ---------- VGS2 4: Sannsynlighetsfordelinger ----------
TOPICS("VGS2", 4, [
{ id: "forventning-terning", chk: ["(1+2+3+4+5+6)/6 ≈ 3.5"],
  nb: O("Forventningsverdi",
    R`Forventningsverdien er det veide gjennomsnittet av verdiene, der vektene er sannsynlighetene. For en rettferdig terning er hvert utfall like sannsynlig, så forventningen er det vanlige gjennomsnittet av sidene. Den trenger ikke være et utfall du kan få. Over mange kast nærmer gjennomsnittet seg forventningen. Det er det store talls lov, ikke et løfte om neste kast.`,
    [[R`E(X) = \sum x \cdot P(X = x)`, "forventning"]],
    [["X", "den tilfeldige variabelen", ""], ["E(X)", "forventningsverdien", ""]],
    R`Én rettferdig terning: $E(X) = \dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3{,}5$.`,
    R`Forventning er et snitt på lang sikt, ikke det mest sannsynlige ene utfallet.`),
  en: O("Expected value",
    R`The expected value is the weighted average of the values, where the weights are the probabilities. For a fair die every outcome is equally likely, so the expectation is the ordinary average of the faces. It need not be an outcome you can get. Over many rolls the average approaches the expectation. That is the law of large numbers, not a promise about the next roll.`,
    [[R`E(X) = \sum x \cdot P(X = x)`, "expectation"]],
    [["X", "the random variable", ""], ["E(X)", "the expected value", ""]],
    R`One fair die: $E(X) = \dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5$.`,
    R`Expectation is a long-run average, not the single most likely outcome.`) },
{ id: "binomisk-fordeling", chk: ["10*0.2 ≈ 2", "sqrt(10*0.2*0.8) ≈ 1.265", "45*0.2^2*0.8^8 ≈ 0.302"],
  nb: O("Binomisk fordeling",
    R`Binomisk fordeling teller antall suksesser i et fast antall uavhengige forsøk, med samme sannsynlighet hver gang. Forventningen er antall forsøk ganget med sannsynligheten. Standardavviket er kvadratroten av forventningen ganget med sannsynligheten for fiasko. Sannsynligheten for akkurat k suksesser bruker binomialkoeffisienten, fordi rekkefølgen av suksessene ikke teller. Uten fast antall forsøk er modellen ikke binomisk.`,
    [[R`E(X) = np`, "forventning"], [R`\sigma = \sqrt{np(1-p)}`, "standardavvik"], [R`P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}`, "punktsannsynlighet"]],
    [["n", "antall forsøk", ""], ["p", "sannsynlighet for suksess", ""], ["k", "antall suksesser", ""]],
    R`$n = 10$ og $p = 0{,}2$. $E(X) = 2$ og $\sigma = \sqrt{1{,}6} \approx 1{,}265$.
$P(X = 2) = \binom{10}{2} \cdot 0{,}2^2 \cdot 0{,}8^8 \approx 0{,}302$.`,
    R`Samme p, uavhengige forsøk, fast n, og vi teller suksesser.`),
  en: O("The binomial distribution",
    R`The binomial distribution counts the number of successes in a fixed number of independent trials, with the same probability each time. The expectation is the number of trials times the probability. The standard deviation is the square root of the expectation times the probability of failure. The probability of exactly k successes uses the binomial coefficient, because the order of the successes does not matter. Without a fixed number of trials the model is not binomial.`,
    [[R`E(X) = np`, "expectation"], [R`\sigma = \sqrt{np(1-p)}`, "standard deviation"], [R`P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}`, "point probability"]],
    [["n", "number of trials", ""], ["p", "probability of success", ""], ["k", "number of successes", ""]],
    R`$n = 10$ and $p = 0.2$. $E(X) = 2$ and $\sigma = \sqrt{1.6} \approx 1.265$.
$P(X = 2) = \binom{10}{2} \cdot 0.2^2 \cdot 0.8^8 \approx 0.302$.`,
    R`The same p, independent trials, fixed n, and we count successes.`) },
{ id: "normal-standard", chk: ["(182-175)/7 ≈ 1", "175-7 ≈ 168", "175+7 ≈ 182"],
  nb: O("Normalfordeling og Z",
    R`Normalfordelingen er klokkeformet om gjennomsnittet. Standardisering trekker fra gjennomsnittet og deler på standardavviket, så du får en Z-verdi å slå opp. Én standardavvik under og over gjennomsnittet er et intervall kurset knytter til omtrent 68 % av observasjonene. Selve oppslaget i tabellen, for eksempel at Φ av 1 er omtrent 0,841, er en tabellverdi og ikke et regnestykke med de fire regneartene.`,
    [[R`Z = \frac{X - \mu}{\sigma}`, "standardisering"], [R`\mu \pm \sigma`, "ett standardavvik ut"]],
    [["\\mu", "gjennomsnitt", ""], ["\\sigma", "standardavvik", ""], ["Z", "standardisert verdi", ""]],
    R`Høyde $N(175, 7)$ cm. $Z$ for 182 cm er $\dfrac{182 - 175}{7} = 1$.
Intervallet $\mu \pm \sigma$ går fra $175 - 7 = 168$ cm til $175 + 7 = 182$ cm.`,
    R`Regn ut Z. Andelen leser du i normalfordelingstabellen.`),
  en: O("The normal distribution and Z",
    R`The normal distribution is bell-shaped about the mean. Standardising subtracts the mean and divides by the standard deviation, so you get a Z-value to look up. One standard deviation below and above the mean is an interval the course links to about 68% of the observations. The table look-up itself, for example that Φ of 1 is about 0.841, is a table value and not an arithmetic calculation with the four operations.`,
    [[R`Z = \frac{X - \mu}{\sigma}`, "standardising"], [R`\mu \pm \sigma`, "one standard deviation out"]],
    [["\\mu", "mean", ""], ["\\sigma", "standard deviation", ""], ["Z", "standardised value", ""]],
    R`Height $N(175, 7)$ cm. $Z$ for 182 cm is $\dfrac{182 - 175}{7} = 1$.
The interval $\mu \pm \sigma$ runs from $175 - 7 = 168$ cm to $175 + 7 = 182$ cm.`,
    R`Calculate Z. You read the proportion in the normal table.`) }
]);

// ---------- VGS2 5: Hypotesetesting ----------
TOPICS("VGS2", 5, [
{ id: "mynt-test", chk: ["(60-100*0.5)/sqrt(100*0.5*0.5) ≈ 2"],
  nb: O("Test av en andel",
    R`En hypotesetest spør om dataene gir grunn nok til å forkaste en påstand. Nullhypotesen er påstanden om ingen endring, her at mynten er rettferdig. Testobservatoren sammenligner det observerte antallet med det nullhypotesen venter, og deler på standardavviket under nullhypotesen. Kursets normalfordelingstabell gir p-verdien 1 minus Φ av 2, omtrent 0,023. Den verdien slås opp, den regnes ikke ut med de fire regneartene. Ensidig 5 %-test forkaster når Z er større enn tabellverdien 1,645.`,
    [[R`Z = \frac{X - np_0}{\sqrt{np_0(1-p_0)}}`, "test av andel"]],
    [["p_0", "andelen i nullhypotesen", ""], ["n", "antall forsøk", ""], ["X", "antall suksesser", ""]],
    R`60 kron på 100 kast, $H_0: p = 0{,}5$.
$Z = \dfrac{60 - 50}{\sqrt{100 \cdot 0{,}5 \cdot 0{,}5}} = \dfrac{10}{5} = 2$.`,
    R`Liten p-verdi, under 0,05, betyr at vi forkaster nullhypotesen. Det beviser ikke den alternative.`),
  en: O("A test of a proportion",
    R`A hypothesis test asks whether the data give enough reason to reject a claim. The null hypothesis is the claim of no change, here that the coin is fair. The test statistic compares the observed count with what the null hypothesis expects, and divides by the standard deviation under the null hypothesis. The course normal table gives the p-value 1 minus Φ of 2, about 0.023. That value is looked up, not calculated with the four operations. A one-sided 5% test rejects when Z is greater than the table value 1.645.`,
    [[R`Z = \frac{X - np_0}{\sqrt{np_0(1-p_0)}}`, "test of a proportion"]],
    [["p_0", "the proportion in the null hypothesis", ""], ["n", "number of trials", ""], ["X", "number of successes", ""]],
    R`60 heads in 100 tosses, $H_0: p = 0.5$.
$Z = \dfrac{60 - 50}{\sqrt{100 \cdot 0.5 \cdot 0.5}} = \dfrac{10}{5} = 2$.`,
    R`A small p-value, below 0.05, means we reject the null hypothesis. It does not prove the alternative.`) },
{ id: "gjennomsnittstest", chk: ["(104-100)/(10/sqrt(25)) ≈ 2"],
  nb: O("Test av et gjennomsnitt",
    R`Når du tester et gjennomsnitt og kjenner standardavviket, er testobservatoren avviket fra nullhypotesens gjennomsnitt, delt på standardfeilen. Standardfeilen er standardavviket delt på kvadratroten av antall observasjoner. Stort utvalg gir liten standardfeil, så samme avvik blir mer overraskende. Fortegnet viser om utvalget ligger over eller under nullhypotesen. Ensidig test oppover brukes når alternativet er at gjennomsnittet er høyere.`,
    [[R`Z = \frac{\bar x - \mu_0}{\sigma/\sqrt{n}}`, "test av gjennomsnitt"]],
    [["\\mu_0", "gjennomsnitt i nullhypotesen", ""], ["\\sigma", "standardavvik", ""], ["n", "utvalgsstørrelse", ""]],
    R`$H_0: \mu = 100$, $\sigma = 10$, $n = 25$ og $\bar x = 104$.
$Z = \dfrac{104 - 100}{10/\sqrt{25}} = \dfrac{4}{2} = 2$.`,
    R`Del på standardfeilen, ikke på standardavviket alene.`),
  en: O("A test of a mean",
    R`When you test a mean and know the standard deviation, the test statistic is the deviation from the null hypothesis mean, divided by the standard error. The standard error is the standard deviation divided by the square root of the number of observations. A large sample gives a small standard error, so the same deviation becomes more surprising. The sign shows whether the sample lies above or below the null hypothesis. A one-sided test upwards is used when the alternative is that the mean is higher.`,
    [[R`Z = \frac{\bar x - \mu_0}{\sigma/\sqrt{n}}`, "test of a mean"]],
    [["\\mu_0", "mean in the null hypothesis", ""], ["\\sigma", "standard deviation", ""], ["n", "sample size", ""]],
    R`$H_0: \mu = 100$, $\sigma = 10$, $n = 25$ and $\bar x = 104$.
$Z = \dfrac{104 - 100}{10/\sqrt{25}} = \dfrac{4}{2} = 2$.`,
    R`Divide by the standard error, not by the standard deviation alone.`) },
{ id: "tosidig-test", chk: ["(120-400*0.25)/sqrt(400*0.25*0.75) ≈ 2.31"],
  nb: O("Tosidig test",
    R`En tosidig test brukes når alternativet er at andelen er ulik verdien i nullhypotesen, uten at retningen er gitt på forhånd. Du regner ut samme Z som i den ensidige testen, og ser på tallverdien. Kursets tommelfingerregel på 5 %-nivå er å forkaste når tallverdien er større enn tabellverdien 1,96. Den grensen kommer fra normalfordelingstabellen, der Φ av 1,96 er 0,975. Selve Z-verdien kan regnes ut direkte.`,
    [[R`Z = \frac{X - np_0}{\sqrt{np_0(1-p_0)}}`, "samme observator"], [R`|Z| > 1{,}96`, "tosidig 5 %-regel, tabell"]],
    [["p_0", "andelen i nullhypotesen", ""], ["X", "observert antall", ""]],
    R`$H_0: p = 0{,}25$, $n = 400$ og $X = 120$.
$Z = \dfrac{120 - 100}{\sqrt{400 \cdot 0{,}25 \cdot 0{,}75}} \approx 2{,}31$.`,
    R`Tosidig: se på tallverdien av Z. Ensidig: se på fortegnet også.`),
  en: O("A two-sided test",
    R`A two-sided test is used when the alternative is that the proportion differs from the value in the null hypothesis, without the direction being given in advance. You calculate the same Z as in the one-sided test, and look at the absolute value. The course rule of thumb at the 5% level is to reject when the absolute value is greater than the table value 1.96. That boundary comes from the normal table, where Φ of 1.96 is 0.975. The Z-value itself can be calculated directly.`,
    [[R`Z = \frac{X - np_0}{\sqrt{np_0(1-p_0)}}`, "the same statistic"], [R`|Z| > 1.96`, "two-sided 5% rule, from the table"]],
    [["p_0", "the proportion in the null hypothesis", ""], ["X", "observed count", ""]],
    R`$H_0: p = 0.25$, $n = 400$ and $X = 120$.
$Z = \dfrac{120 - 100}{\sqrt{400 \cdot 0.25 \cdot 0.75}} \approx 2.31$.`,
    R`Two-sided: look at the absolute value of Z. One-sided: look at the sign as well.`) }
]);
})();
