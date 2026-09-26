// ============================================================
//  add_vgs_k.js – påfyll i de tynneste VGS-enhetene (S1, S2, R1, R2, Kjemi 2, Biologi 1 og 2).
//  Enhetene finnes med tittel, så rekkefølgen i de andre filene kan endres uten at dette går galt.
// ============================================================
(() => {
const UX = (c, t) => { const i = COURSES.find(x => x.code === c).units.findIndex(u => u.title === t); if(i < 0) throw new Error("add_vgs_k: fant ikke " + c + " / " + t); return i; };
const Q = (c, t, list) => BIQ(c, UX(c, t), list);
const G = (c, t, ...f) => GEN(c, UX(c, t), ...f);

// ---------------- S1 ----------------
Q("VGS1", "Algebra og likninger", [
 ["Løs likningen $3x - 7 = 2x + 5$.", { n: 12, tol: 0, u: "" }, "$3x - 2x = 5 + 7$, så $x = 12$.", "Solve the equation $3x - 7 = 2x + 5$.", null, "$3x - 2x = 5 + 7$, so $x = 12$."],
 ["Hva er $(a + b)^2$?", ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 - 2ab + b^2$", "$2a + 2b$"], "Første kvadratsetning.", "What is $(a + b)^2$?", ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 - 2ab + b^2$", "$2a + 2b$"], "The first square identity."],
 ["Løs $x^2 = 49$.", ["$x = 7$ eller $x = -7$", "$x = 7$", "$x = 24{,}5$", "$x = -7$"], "Både $7^2$ og $(-7)^2$ er 49.", "Solve $x^2 = 49$.", ["$x = 7$ or $x = -7$", "$x = 7$", "$x = 24.5$", "$x = -7$"], "Both $7^2$ and $(-7)^2$ are 49."],
 ["Løs likningssettet $x + y = 10$ og $x - y = 4$. Hva er $x$?", { n: 7, tol: 0, u: "" }, "Legg sammen: $2x = 14$, så $x = 7$ og $y = 3$.", "Solve the system $x + y = 10$ and $x - y = 4$. What is $x$?", null, "Add them: $2x = 14$, so $x = 7$ and $y = 3$."]
]);
G("VGS1", "Algebra og likninger",
 () => { const x = R.i(-6, 9), a = R.p([2, 3, 4, 5]), b = R.i(-9, 9), c = R.p([1, 2, 3].filter(v => v !== a)), d = (a - c) * x + b;
   return [T(`Løs likningen $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}$.`, `Solve the equation $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}$.`), { n: x, tol: 0, u: "" },
     T(`$${a}x - ${c}x = ${d} - (${b})$, altså $${a - c}x = ${d - b}$ og $x = ${x}$.`, `$${a}x - ${c}x = ${d} - (${b})$, so $${a - c}x = ${d - b}$ and $x = ${x}$.`)]; }
);
Q("VGS1", "Funksjoner og modeller", [
 ["En lineær modell er $f(x) = 250x + 1200$. Hva betyr tallet 250?", ["Endringen i $f$ når $x$ øker med 1", "Startverdien", "Nullpunktet", "Toppunktet"], "Stigningstallet er endringen per enhet.", "A linear model is $f(x) = 250x + 1200$. What does 250 mean?", ["The change in $f$ when $x$ increases by 1", "The starting value", "The zero", "The maximum"], "The slope is the change per unit."],
 ["Hva er $f(3)$ når $f(x) = 2x^2 - x$?", { n: 15, tol: 0, u: "" }, "$2 \\cdot 9 - 3 = 15$.", "What is $f(3)$ when $f(x) = 2x^2 - x$?", null, "$2 \\cdot 9 - 3 = 15$."],
 ["Hvilken modell passer når noe øker med samme prosent hvert år?", ["Eksponentiell", "Lineær", "Andregrads", "Konstant"], "Fast prosent gir $a \\cdot b^x$.", "Which model fits when something grows by the same percentage each year?", ["Exponential", "Linear", "Quadratic", "Constant"], "A fixed percentage gives $a \\cdot b^x$."],
 ["Et taxiselskap tar 60 kr i startpris og 15 kr per km. Hva koster 12 km?", { n: 240, tol: 0, u: "kr" }, "$60 + 15 \\cdot 12 = 240$ kr.", "A taxi company charges 60 NOK to start and 15 NOK per km. What do 12 km cost?", null, "$60 + 15 \\cdot 12 = 240$ NOK."]
]);
G("VGS1", "Funksjoner og modeller",
 () => { const a = R.p([8, 12, 15, 20, 25]), b = R.p([40, 50, 60, 80, 100]), k = R.i(3, 30), y = a * k + b;
   return [T(`Et abonnement koster ${b} kr i fastpris og ${a} kr per time. Hvor mange timer får du for ${y} kr?`, `A subscription costs ${b} NOK fixed and ${a} NOK per hour. How many hours do you get for ${y} NOK?`), { n: k, tol: 0, u: "" },
     T(`$${a}x + ${b} = ${y}$ gir $x = \\dfrac{${y - b}}{${a}} = ${k}$ timer.`, `$${a}x + ${b} = ${y}$ gives $x = \\dfrac{${y - b}}{${a}} = ${k}$ hours.`)]; }
);
Q("VGS1", "Derivasjon og optimering", [
 ["Deriver $f(x) = 4x^3 - 2x + 7$.", ["$12x^2 - 2$", "$4x^2 - 2$", "$12x^3 - 2x$", "$12x^2 + 7$"], "Potensregelen: $3 \\cdot 4 = 12$, og konstanten forsvinner.", "Differentiate $f(x) = 4x^3 - 2x + 7$.", ["$12x^2 - 2$", "$4x^2 - 2$", "$12x^3 - 2x$", "$12x^2 + 7$"], "Power rule: $3 \\cdot 4 = 12$, and the constant disappears."],
 ["$O(x) = -2x^2 + 80x - 300$. For hvilken $x$ er overskuddet størst?", { n: 20, tol: 0, u: "" }, "$O'(x) = -4x + 80 = 0$ gir $x = 20$.", "$P(x) = -2x^2 + 80x - 300$. For which $x$ is the profit largest?", null, "$P'(x) = -4x + 80 = 0$ gives $x = 20$."],
 ["Hva betyr $f'(2) = 5$?", ["Grafen stiger med 5 per enhet i $x = 2$", "$f(2) = 5$", "Grafen har et toppunkt i $x = 2$", "$f$ er 5 i snitt"], "Den deriverte er stigningstallet til tangenten.", "What does $f'(2) = 5$ mean?", ["The graph rises by 5 per unit at $x = 2$", "$f(2) = 5$", "The graph has a maximum at $x = 2$", "$f$ averages 5"], "The derivative is the slope of the tangent."],
 ["Hva er den gjennomsnittlige vekstfarten til $f(x) = x^2$ fra $x = 1$ til $x = 4$?", { n: 5, tol: 0, u: "" }, "$\\dfrac{16 - 1}{4 - 1} = 5$.", "What is the average rate of change of $f(x) = x^2$ from $x = 1$ to $x = 4$?", null, "$\\dfrac{16 - 1}{4 - 1} = 5$."]
]);
G("VGS1", "Derivasjon og optimering",
 () => { const a = R.p([1, 2, 3, 4, 5]), x0 = R.p([10, 15, 20, 25, 30, 40]), b = 2 * a * x0, c = R.p([100, 200, 500]);
   return [T(`Overskuddet er $O(x) = -${a === 1 ? "" : a}x^2 + ${b}x - ${c}$. Hvilken $x$ gir størst overskudd?`, `The profit is $P(x) = -${a === 1 ? "" : a}x^2 + ${b}x - ${c}$. Which $x$ gives the largest profit?`), { n: x0, tol: 0, u: "" },
     T(`$O'(x) = -${2 * a}x + ${b} = 0$ gir $x = ${x0}$.`, `$P'(x) = -${2 * a}x + ${b} = 0$ gives $x = ${x0}$.`)]; }
);
Q("VGS1", "Sannsynlighet", [
 ["Du kaster to terninger. Hva er sannsynligheten for sum 7?", ["$\\dfrac{1}{6}$", "$\\dfrac{1}{12}$", "$\\dfrac{7}{36}$", "$\\dfrac{1}{36}$"], "6 av 36 utfall gir sum 7.", "You roll two dice. What is the probability of a sum of 7?", ["$\\dfrac{1}{6}$", "$\\dfrac{1}{12}$", "$\\dfrac{7}{36}$", "$\\dfrac{1}{36}$"], "6 of 36 outcomes give a sum of 7."],
 ["$P(A) = 0{,}3$. Hva er $P(\\overline{A})$?", { n: 0.7, tol: 0.001, u: "" }, "$1 - 0{,}3 = 0{,}7$.", "$P(A) = 0.3$. What is $P(\\overline{A})$?", null, "$1 - 0.3 = 0.7$."],
 ["På hvor mange måter kan 4 personer stille seg i kø?", { n: 24, tol: 0, u: "" }, "$4! = 24$.", "In how many ways can 4 people form a queue?", null, "$4! = 24$."],
 ["Hvor mange måter kan du velge 2 av 5 elever (uten rekkefølge)?", { n: 10, tol: 0, u: "" }, "$\\binom{5}{2} = 10$.", "In how many ways can you choose 2 of 5 students (without order)?", null, "$\\binom{5}{2} = 10$."]
]);
G("VGS1", "Sannsynlighet",
 () => { const r = R.i(2, 8), b = R.i(2, 8), n = r + b, p = r * (r - 1) / (n * (n - 1));
   return [T(`En pose har ${r} røde og ${b} blå kuler. Du trekker 2 uten tilbakelegging. Hva er sannsynligheten for to røde?`, `A bag has ${r} red and ${b} blue balls. You draw 2 without replacement. What is the probability of two red?`), { n: p, tol: 0.002, u: "" },
     T(`$\\dfrac{${r}}{${n}} \\cdot \\dfrac{${r - 1}}{${n - 1}} = ${mf(p, 3)}$.`, `$\\dfrac{${r}}{${n}} \\cdot \\dfrac{${r - 1}}{${n - 1}} = ${mf(p, 3)}$.`)]; }
);
Q("VGS1", "Kostnad, inntekt og overskudd", [
 ["$K(x) = 0{,}5x^2 + 20x + 800$ og prisen er 80 kr. Hva er grenseinntekten?", { n: 80, tol: 0, u: "kr" }, "$I(x) = 80x$, så $I'(x) = 80$ kr.", "$C(x) = 0.5x^2 + 20x + 800$ and the price is 80 NOK. What is the marginal revenue?", null, "$R(x) = 80x$, so $R'(x) = 80$ NOK."],
 ["Når er overskuddet størst?", ["Når grenseinntekt = grensekostnad", "Når kostnaden er minst", "Når inntekten er størst", "Når prisen er 0"], "$O'(x) = I'(x) - K'(x) = 0$.", "When is profit largest?", ["When marginal revenue = marginal cost", "When cost is smallest", "When revenue is largest", "When the price is 0"], "$P'(x) = R'(x) - C'(x) = 0$."],
 ["Hva er enhetskostnaden?", ["$\\dfrac{K(x)}{x}$", "$K'(x)$", "$K(x) - I(x)$", "$x \\cdot K(x)$"], "Kostnad per produsert enhet.", "What is the unit cost?", ["$\\dfrac{C(x)}{x}$", "$C'(x)$", "$C(x) - R(x)$", "$x \\cdot C(x)$"], "The cost per unit produced."],
 ["$K(x) = 0{,}5x^2 + 20x + 800$, pris 80 kr. Hvilken $x$ gir størst overskudd?", { n: 60, tol: 0, u: "" }, "$K'(x) = x + 20 = 80$ gir $x = 60$.", "$C(x) = 0.5x^2 + 20x + 800$, price 80 NOK. Which $x$ gives the largest profit?", null, "$C'(x) = x + 20 = 80$ gives $x = 60$."]
]);

// ---------------- S2 ----------------
Q("VGS2", "Sparing, lån og nåverdi", [
 ["Du setter inn 10 000 kr med 4 % rente. Hvor mye har du etter 5 år?", { n: 12166.53, tol: 1, u: "kr" }, "$10\\,000 \\cdot 1{,}04^5 = 12\\,166{,}53$ kr.", "You deposit 10,000 NOK at 4 % interest. How much do you have after 5 years?", null, "$10\\,000 \\cdot 1.04^5 = 12\\,166.53$ NOK."],
 ["Hva er nåverdien av 50 000 kr om 3 år med 5 % rente?", { n: 43191.88, tol: 1, u: "kr" }, "$\\dfrac{50\\,000}{1{,}05^3} = 43\\,191{,}88$ kr.", "What is the present value of 50,000 NOK in 3 years at 5 % interest?", null, "$\\dfrac{50\\,000}{1.05^3} = 43\\,191.88$ NOK."],
 ["Hva kjennetegner et annuitetslån?", ["Like store terminbeløp hele tiden", "Like store avdrag", "Ingen renter", "Bare renter til slutt"], "Avdraget øker mens rentene synker, så summen er lik.", "What characterises an annuity loan?", ["Equal payments throughout", "Equal instalments of principal", "No interest", "Interest only at the end"], "The principal part grows while interest falls, so the sum stays the same."],
 ["Hva er summen av den geometriske rekken $1000 + 1000 \\cdot 1{,}1 + 1000 \\cdot 1{,}1^2$?", { n: 3310, tol: 0.01, u: "" }, "$1000 \\cdot \\dfrac{1{,}1^3 - 1}{0{,}1} = 3310$.", "What is the sum of the geometric series $1000 + 1000 \\cdot 1.1 + 1000 \\cdot 1.1^2$?", null, "$1000 \\cdot \\dfrac{1.1^3 - 1}{0.1} = 3310$."]
]);
G("VGS2", "Sparing, lån og nåverdi",
 () => { const k = R.p([500, 1000, 1500, 2000]), p = R.p([2, 3, 4, 5]), n = R.p([5, 10, 15, 20]), q = 1 + p / 100, s = k * (q ** n - 1) / (q - 1);
   return [T(`Du sparer ${k} kr hvert år i ${n} år med ${p} % rente. Hvor mye står på kontoen rett etter siste innskudd?`, `You save ${k} NOK every year for ${n} years at ${p} % interest. How much is in the account right after the last deposit?`), { n: s, tol: 2, u: "kr" },
     T(`Geometrisk rekke: $${k} \\cdot \\dfrac{${mf(q, 2)}^{${n}} - 1}{${mf(q - 1, 2)}} = ${mf(s, 2)}$ kr.`, `Geometric series: $${k} \\cdot \\dfrac{${mf(q, 2)}^{${n}} - 1}{${mf(q - 1, 2)}} = ${mf(s, 2)}$ NOK.`)]; }
);
Q("VGS2", "Hypotesetesting", [
 ["Hva er nullhypotesen $H_0$?", ["Påstanden om at ingenting har endret seg", "Det vi håper å vise", "Resultatet av testen", "Signifikansnivået"], "Vi prøver å forkaste $H_0$.", "What is the null hypothesis $H_0$?", ["The claim that nothing has changed", "What we hope to show", "The result of the test", "The significance level"], "We try to reject $H_0$."],
 ["P-verdien er 0,03 og signifikansnivået 5 %. Hva gjør vi?", ["Forkaster $H_0$", "Beholder $H_0$", "Øker utvalget", "Forkaster $H_1$"], "$0{,}03 < 0{,}05$, så resultatet er signifikant.", "The p-value is 0.03 and the significance level 5 %. What do we do?", ["Reject $H_0$", "Keep $H_0$", "Increase the sample", "Reject $H_1$"], "$0.03 < 0.05$, so the result is significant."],
 ["Hva er et forkastningsområde?", ["Verdier av testobservatoren som gjør at vi forkaster $H_0$", "Området der $H_0$ er sann", "Et konfidensintervall", "Alle mulige utfall"], "Havner vi der, er resultatet for usannsynlig under $H_0$.", "What is a rejection region?", ["Values of the test statistic that lead us to reject $H_0$", "The region where $H_0$ is true", "A confidence interval", "All possible outcomes"], "Landing there means the result is too unlikely under $H_0$."],
 ["Hva er en type I-feil?", ["Å forkaste en sann $H_0$", "Å beholde en usann $H_0$", "Å regne feil", "Å velge for lite utvalg"], "Sannsynligheten for den er signifikansnivået.", "What is a type I error?", ["Rejecting a true $H_0$", "Keeping a false $H_0$", "Calculating wrongly", "Choosing too small a sample"], "Its probability is the significance level."]
]);

// ---------------- R1 ----------------
Q("VGR1", "Vektorer i planet", [
 ["Hva er lengden til $\\vec{v} = [3, 4]$?", { n: 5, tol: 0, u: "" }, "$\\sqrt{3^2 + 4^2} = 5$.", "What is the length of $\\vec{v} = [3, 4]$?", null, "$\\sqrt{3^2 + 4^2} = 5$."],
 ["Regn ut $[2, -1] \\cdot [3, 4]$.", { n: 2, tol: 0, u: "" }, "$2 \\cdot 3 + (-1) \\cdot 4 = 2$.", "Calculate $[2, -1] \\cdot [3, 4]$.", null, "$2 \\cdot 3 + (-1) \\cdot 4 = 2$."],
 ["Når står to vektorer vinkelrett på hverandre?", ["Når skalarproduktet er 0", "Når de er like lange", "Når de er parallelle", "Når summen er 0"], "$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos 90^\\circ = 0$.", "When are two vectors perpendicular?", ["When the dot product is 0", "When they have equal length", "When they are parallel", "When their sum is 0"], "$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos 90^\\circ = 0$."],
 ["$A(1, 2)$ og $B(4, 6)$. Hva er $\\vec{AB}$?", ["$[3, 4]$", "$[5, 8]$", "$[-3, -4]$", "$[4, 3]$"], "Slutt minus start: $[4 - 1, 6 - 2]$.", "$A(1, 2)$ and $B(4, 6)$. What is $\\vec{AB}$?", ["$[3, 4]$", "$[5, 8]$", "$[-3, -4]$", "$[4, 3]$"], "End minus start: $[4 - 1, 6 - 2]$."]
]);
G("VGR1", "Vektorer i planet",
 () => { const a = [R.i(-5, 6), R.i(-5, 6)], b = [R.i(-5, 6), R.i(-5, 6)], d = a[0] * b[0] + a[1] * b[1];
   return [T(`Regn ut skalarproduktet $[${a}] \\cdot [${b}]$.`, `Calculate the dot product $[${a}] \\cdot [${b}]$.`), { n: d, tol: 0, u: "" },
     T(`$${a[0]} \\cdot ${b[0] < 0 ? "(" + b[0] + ")" : b[0]} + ${a[1]} \\cdot ${b[1] < 0 ? "(" + b[1] + ")" : b[1]} = ${d}$${d === 0 ? ", så vektorene står vinkelrett" : ""}.`, `$${a[0]} \\cdot ${b[0] < 0 ? "(" + b[0] + ")" : b[0]} + ${a[1]} \\cdot ${b[1] < 0 ? "(" + b[1] + ")" : b[1]} = ${d}$${d === 0 ? ", so the vectors are perpendicular" : ""}.`)]; }
);
Q("VGR1", "Sannsynlighet og kombinatorikk", [
 ["Hvor mange ord på 3 bokstaver kan lages av A, B, C, D, E uten gjentakelse?", { n: 60, tol: 0, u: "" }, "$5 \\cdot 4 \\cdot 3 = 60$.", "How many 3-letter words can be made from A, B, C, D, E without repetition?", null, "$5 \\cdot 4 \\cdot 3 = 60$."],
 ["Hva sier Bayes' setning?", ["$P(A|B) = \\dfrac{P(B|A)P(A)}{P(B)}$", "$P(A|B) = P(A)P(B)$", "$P(A|B) = P(B|A)$", "$P(A|B) = 1 - P(A)$"], "Snur betingelsen.", "What does Bayes' theorem say?", ["$P(A|B) = \\dfrac{P(B|A)P(A)}{P(B)}$", "$P(A|B) = P(A)P(B)$", "$P(A|B) = P(B|A)$", "$P(A|B) = 1 - P(A)$"], "It reverses the condition."],
 ["Du kaster en mynt 5 ganger. Hva er $P(\\text{nøyaktig 2 kron})$?", { n: 0.3125, tol: 0.001, u: "" }, "$\\binom{5}{2} \\cdot 0{,}5^5 = \\dfrac{10}{32} = 0{,}3125$.", "You toss a coin 5 times. What is $P(\\text{exactly 2 heads})$?", null, "$\\binom{5}{2} \\cdot 0.5^5 = \\dfrac{10}{32} = 0.3125$."],
 ["Når er $A$ og $B$ uavhengige?", ["Når $P(A \\cap B) = P(A) \\cdot P(B)$", "Når $P(A) = P(B)$", "Når $A \\cap B$ er tom", "Når $P(A) + P(B) = 1$"], "Da påvirker ikke $B$ sannsynligheten for $A$.", "When are $A$ and $B$ independent?", ["When $P(A \\cap B) = P(A) \\cdot P(B)$", "When $P(A) = P(B)$", "When $A \\cap B$ is empty", "When $P(A) + P(B) = 1$"], "Then $B$ does not affect the probability of $A$."]
]);
G("VGR1", "Sannsynlighet og kombinatorikk",
 () => { const n = R.i(5, 12), k = R.i(2, 4); let c = 1; for(let i = 0; i < k; i++) c = c * (n - i) / (i + 1);
   return [T(`En klasse har ${n} elever. På hvor mange måter kan du velge en gruppe på ${k}?`, `A class has ${n} students. In how many ways can you choose a group of ${k}?`), { n: c, tol: 0, u: "" },
     T(`$\\binom{${n}}{${k}} = ${c}$.`, `$\\binom{${n}}{${k}} = ${c}$.`)]; }
);
Q("VGR1", "Optimering", [
 ["Et rektangel har omkrets 40 cm. Hvilken sidelengde gir størst areal?", { n: 10, tol: 0, u: "cm" }, "$A(x) = x(20 - x)$, $A'(x) = 20 - 2x = 0$ gir $x = 10$ cm (et kvadrat).", "A rectangle has a perimeter of 40 cm. Which side length gives the largest area?", null, "$A(x) = x(20 - x)$, $A'(x) = 20 - 2x = 0$ gives $x = 10$ cm (a square)."],
 ["Hvordan sjekker du at et stasjonært punkt er et toppunkt?", ["$f''(x) < 0$ der", "$f''(x) > 0$ der", "$f(x) = 0$ der", "$f'(x) > 0$ der"], "Grafen krummer nedover i et toppunkt.", "How do you check that a stationary point is a maximum?", ["$f''(x) < 0$ there", "$f''(x) > 0$ there", "$f(x) = 0$ there", "$f'(x) > 0$ there"], "The graph curves downwards at a maximum."],
 ["Hvor kan største verdi på et lukket intervall ligge?", ["I et stasjonært punkt eller i et endepunkt", "Bare i et stasjonært punkt", "Bare i midten", "Bare i et endepunkt"], "Sjekk alle kandidatene.", "Where can the largest value on a closed interval be?", ["At a stationary point or an endpoint", "Only at a stationary point", "Only in the middle", "Only at an endpoint"], "Check all the candidates."],
 ["$f(x) = x^3 - 3x$. Hvor har $f$ et lokalt toppunkt?", { n: -1, tol: 0, u: "" }, "$f'(x) = 3x^2 - 3 = 0$ gir $x = \\pm 1$. $f''(-1) = -6 < 0$, så toppunkt i $x = -1$.", "$f(x) = x^3 - 3x$. Where does $f$ have a local maximum?", null, "$f'(x) = 3x^2 - 3 = 0$ gives $x = \\pm 1$. $f''(-1) = -6 < 0$, so a maximum at $x = -1$."]
]);
G("VGR1", "Optimering",
 () => { const P = R.p([20, 24, 32, 40, 60, 80, 100]), s = P / 4;
   return [T(`Et rektangulært gjerde har ${P} m gjerde totalt. Hvor lang skal hver side være for størst areal?`, `A rectangular fence uses ${P} m of fencing in total. How long should each side be for the largest area?`), { n: s, tol: 0, u: "m" },
     T(`$A(x) = x\\left(${P / 2} - x\\right)$ gir $A'(x) = ${P / 2} - 2x = 0$, altså $x = ${mf(s)}$ m.`, `$A(x) = x\\left(${P / 2} - x\\right)$ gives $A'(x) = ${P / 2} - 2x = 0$, so $x = ${mf(s)}$ m.`)]; }
);
Q("VGR1", "Parameterframstillinger", [
 ["$x = 1 + 2t$, $y = 3 - t$. Hvilket punkt får du for $t = 2$?", ["$(5, 1)$", "$(3, 2)$", "$(5, 5)$", "$(1, 3)$"], "$x = 1 + 4 = 5$, $y = 3 - 2 = 1$.", "$x = 1 + 2t$, $y = 3 - t$. Which point do you get for $t = 2$?", ["$(5, 1)$", "$(3, 2)$", "$(5, 5)$", "$(1, 3)$"], "$x = 1 + 4 = 5$, $y = 3 - 2 = 1$."],
 ["Hva er fartsvektoren til $\\vec{r}(t) = [t^2, 3t]$?", ["$[2t, 3]$", "$[t^2, 3]$", "$[2, 0]$", "$[2t, 3t]$"], "Deriver hver koordinat.", "What is the velocity vector of $\\vec{r}(t) = [t^2, 3t]$?", ["$[2t, 3]$", "$[t^2, 3]$", "$[2, 0]$", "$[2t, 3t]$"], "Differentiate each coordinate."],
 ["$x = \\cos t$, $y = \\sin t$. Hvilken kurve er dette?", ["En sirkel med radius 1", "En rett linje", "En parabel", "En ellipse med radius 2"], "$x^2 + y^2 = 1$.", "$x = \\cos t$, $y = \\sin t$. Which curve is this?", ["A circle of radius 1", "A straight line", "A parabola", "An ellipse of radius 2"], "$x^2 + y^2 = 1$."],
 ["Hva er farten (banefarten) når $\\vec{v} = [3, 4]$?", { n: 5, tol: 0, u: "" }, "$|\\vec{v}| = \\sqrt{9 + 16} = 5$.", "What is the speed when $\\vec{v} = [3, 4]$?", null, "$|\\vec{v}| = \\sqrt{9 + 16} = 5$."]
]);
Q("VGR1", "Logikk og bevis", [
 ["Hva betyr $P \\Rightarrow Q$?", ["Hvis $P$ er sann, er $Q$ sann", "$P$ og $Q$ er like", "$Q$ gir $P$", "$P$ er usann"], "Implikasjon: $P$ medfører $Q$.", "What does $P \\Rightarrow Q$ mean?", ["If $P$ is true, $Q$ is true", "$P$ and $Q$ are equal", "$Q$ implies $P$", "$P$ is false"], "Implication: $P$ implies $Q$."],
 ["Er «$x = 2 \\Rightarrow x^2 = 4$» en ekvivalens?", ["Nei, $x = -2$ gir også $x^2 = 4$", "Ja", "Bare for positive tall", "Ja, alltid"], "Den motsatte veien holder ikke.", "Is \"$x = 2 \\Rightarrow x^2 = 4$\" an equivalence?", ["No, $x = -2$ also gives $x^2 = 4$", "Yes", "Only for positive numbers", "Yes, always"], "The reverse direction fails."],
 ["Hva er et moteksempel?", ["Ett eksempel som viser at en påstand er usann", "Et bevis", "En definisjon", "En likning"], "Ett moteksempel er nok til å avkrefte en generell påstand.", "What is a counterexample?", ["One example showing a claim is false", "A proof", "A definition", "An equation"], "One counterexample is enough to disprove a general claim."],
 ["Hvordan fungerer et motsigelsesbevis?", ["Anta det motsatte og kom fram til noe umulig", "Prøv mange eksempler", "Tegn en figur", "Bruk induksjon"], "Eksempel: $\\sqrt{2}$ er irrasjonal.", "How does a proof by contradiction work?", ["Assume the opposite and reach something impossible", "Try many examples", "Draw a figure", "Use induction"], "Example: $\\sqrt{2}$ is irrational."]
]);

// ---------------- R2 ----------------
Q("VGR2", "Følger og rekker", [
 ["Hva er summen av den uendelige rekken $1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\dots$?", { n: 2, tol: 0, u: "" }, "$\\dfrac{a_1}{1 - k} = \\dfrac{1}{1 - 0{,}5} = 2$.", "What is the sum of the infinite series $1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\dots$?", null, "$\\dfrac{a_1}{1 - k} = \\dfrac{1}{1 - 0.5} = 2$."],
 ["Når konvergerer en geometrisk rekke?", ["Når $|k| < 1$", "Når $k > 1$", "Alltid", "Når $a_1 = 0$"], "Leddene må bli mindre og mindre.", "When does a geometric series converge?", ["When $|k| < 1$", "When $k > 1$", "Always", "When $a_1 = 0$"], "The terms must get smaller and smaller."],
 ["Hva er summen $1 + 2 + 3 + \\dots + 100$?", { n: 5050, tol: 0, u: "" }, "$\\dfrac{100 \\cdot 101}{2} = 5050$.", "What is the sum $1 + 2 + 3 + \\dots + 100$?", null, "$\\dfrac{100 \\cdot 101}{2} = 5050$."],
 ["Hva er $a_{10}$ i den aritmetiske følgen $3, 7, 11, \\dots$?", { n: 39, tol: 0, u: "" }, "$a_n = 3 + 4(n - 1)$, så $a_{10} = 39$.", "What is $a_{10}$ in the arithmetic sequence $3, 7, 11, \\dots$?", null, "$a_n = 3 + 4(n - 1)$, so $a_{10} = 39$."]
]);
Q("VGR2", "Vektorer i rommet", [
 ["Hva er $[1, 0, 0] \\times [0, 1, 0]$?", ["$[0, 0, 1]$", "$[0, 0, -1]$", "$[1, 1, 0]$", "$0$"], "$\\vec{i} \\times \\vec{j} = \\vec{k}$.", "What is $[1, 0, 0] \\times [0, 1, 0]$?", ["$[0, 0, 1]$", "$[0, 0, -1]$", "$[1, 1, 0]$", "$0$"], "$\\vec{i} \\times \\vec{j} = \\vec{k}$."],
 ["Hva er lengden til $[2, 3, 6]$?", { n: 7, tol: 0, u: "" }, "$\\sqrt{4 + 9 + 36} = 7$.", "What is the length of $[2, 3, 6]$?", null, "$\\sqrt{4 + 9 + 36} = 7$."],
 ["Hva kan kryssproduktet brukes til?", ["Å finne en normalvektor og arealet av et parallellogram", "Å finne vinkelen direkte", "Å finne midtpunktet", "Å løse likninger"], "$|\\vec{a} \\times \\vec{b}|$ er arealet.", "What can the cross product be used for?", ["Finding a normal vector and the area of a parallelogram", "Finding the angle directly", "Finding the midpoint", "Solving equations"], "$|\\vec{a} \\times \\vec{b}|$ is the area."],
 ["Hva er volumet av parallellepipedet utspent av $[1,0,0]$, $[0,2,0]$ og $[0,0,3]$?", { n: 6, tol: 0, u: "" }, "$|(\\vec{a} \\times \\vec{b}) \\cdot \\vec{c}| = 1 \\cdot 2 \\cdot 3 = 6$.", "What is the volume of the parallelepiped spanned by $[1,0,0]$, $[0,2,0]$ and $[0,0,3]$?", null, "$|(\\vec{a} \\times \\vec{b}) \\cdot \\vec{c}| = 1 \\cdot 2 \\cdot 3 = 6$."]
]);
G("VGR2", "Vektorer i rommet",
 () => { const a = [R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)], b = [R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)], d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
   return [T(`Regn ut $[${a.join(", ")}] \\cdot [${b.join(", ")}]$.`, `Calculate $[${a.join(", ")}] \\cdot [${b.join(", ")}]$.`), { n: d, tol: 0, u: "" },
     T(`Gang koordinatvis og legg sammen: $${d}$.`, `Multiply coordinate by coordinate and add: $${d}$.`)]; }
);
Q("VGR2", "Areal og volum med integral", [
 ["Hva er arealet mellom $y = x^2$ og $x$-aksen fra 0 til 3?", { n: 9, tol: 0, u: "" }, "$\\int_0^3 x^2\\,dx = \\dfrac{27}{3} = 9$.", "What is the area between $y = x^2$ and the $x$-axis from 0 to 3?", null, "$\\int_0^3 x^2\\,dx = \\dfrac{27}{3} = 9$."],
 ["Formelen for volum ved rotasjon om $x$-aksen?", ["$V = \\pi\\int_a^b f(x)^2\\,dx$", "$V = \\int_a^b f(x)\\,dx$", "$V = 2\\pi\\int_a^b f(x)\\,dx$", "$V = \\pi f(b)^2$"], "Summen av tynne sirkelskiver $\\pi r^2\\,dx$.", "The formula for volume of revolution about the $x$-axis?", ["$V = \\pi\\int_a^b f(x)^2\\,dx$", "$V = \\int_a^b f(x)\\,dx$", "$V = 2\\pi\\int_a^b f(x)\\,dx$", "$V = \\pi f(b)^2$"], "The sum of thin discs $\\pi r^2\\,dx$."],
 ["Areal mellom to grafer $f \\ge g$ fra $a$ til $b$?", ["$\\int_a^b (f(x) - g(x))\\,dx$", "$\\int_a^b f(x)g(x)\\,dx$", "$\\int_a^b (f(x) + g(x))\\,dx$", "$f(b) - g(a)$"], "Øverste minus nederste.", "The area between two graphs $f \\ge g$ from $a$ to $b$?", ["$\\int_a^b (f(x) - g(x))\\,dx$", "$\\int_a^b f(x)g(x)\\,dx$", "$\\int_a^b (f(x) + g(x))\\,dx$", "$f(b) - g(a)$"], "Top minus bottom."],
 ["$\\int_0^{\\pi} \\sin x\\,dx = ?$", { n: 2, tol: 0, u: "" }, "$[-\\cos x]_0^{\\pi} = 1 + 1 = 2$.", "$\\int_0^{\\pi} \\sin x\\,dx = ?$", null, "$[-\\cos x]_0^{\\pi} = 1 + 1 = 2$."]
]);
Q("VGR2", "Induksjonsbevis", [
 ["Hva er de to stegene i et induksjonsbevis?", ["Basissteg og induksjonssteg", "Anta og motsi", "Tegn og regn", "Gjett og sjekk"], "Vis for $n = 1$, og vis at $P(k) \\Rightarrow P(k + 1)$.", "What are the two steps of a proof by induction?", ["Base case and inductive step", "Assume and contradict", "Draw and compute", "Guess and check"], "Show for $n = 1$, and show that $P(k) \\Rightarrow P(k + 1)$."],
 ["I induksjonssteget antar vi at påstanden gjelder for ...", ["$n = k$", "alle $n$", "$n = 0$ bare", "$n = k + 1$"], "Induksjonshypotesen.", "In the inductive step, we assume the statement holds for ...", ["$n = k$", "all $n$", "$n = 0$ only", "$n = k + 1$"], "The induction hypothesis."],
 ["Hvorfor virker induksjon?", ["Som dominobrikker: den første faller, og hver brikke velter den neste", "Fordi vi sjekker mange tall", "Fordi det er en definisjon", "Fordi alle tall er like"], "Dermed gjelder det for alle $n$.", "Why does induction work?", ["Like dominoes: the first falls, and each one knocks over the next", "Because we check many numbers", "Because it is a definition", "Because all numbers are equal"], "So it holds for all $n$."],
 ["Påstand: $1 + 3 + 5 + \\dots + (2n - 1) = n^2$. Hva er summen for $n = 6$?", { n: 36, tol: 0, u: "" }, "$6^2 = 36$.", "Claim: $1 + 3 + 5 + \\dots + (2n - 1) = n^2$. What is the sum for $n = 6$?", null, "$6^2 = 36$."]
]);
Q("VGR2", "Linjer og plan i rommet", [
 ["Hva er en normalvektor til planet $2x - y + 3z = 5$?", ["$[2, -1, 3]$", "$[2, 1, 3]$", "$[5, 0, 0]$", "$[1, 1, 1]$"], "Koeffisientene foran $x$, $y$ og $z$.", "What is a normal vector to the plane $2x - y + 3z = 5$?", ["$[2, -1, 3]$", "$[2, 1, 3]$", "$[5, 0, 0]$", "$[1, 1, 1]$"], "The coefficients of $x$, $y$ and $z$."],
 ["Ligger punktet $(1, 1, 1)$ i planet $x + y + z = 3$?", ["Ja", "Nei", "Bare hvis $z = 0$", "Det kan ikke avgjøres"], "$1 + 1 + 1 = 3$.", "Does the point $(1, 1, 1)$ lie in the plane $x + y + z = 3$?", ["Yes", "No", "Only if $z = 0$", "It cannot be decided"], "$1 + 1 + 1 = 3$."],
 ["Avstanden fra origo til planet $2x + y + 2z = 9$?", { n: 3, tol: 0, u: "" }, "$\\dfrac{|0 - 9|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$.", "The distance from the origin to the plane $2x + y + 2z = 9$?", null, "$\\dfrac{|0 - 9|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$."],
 ["Hva trenger du for å lage en parameterframstilling av en linje?", ["Et punkt og en retningsvektor", "To normalvektorer", "Bare et punkt", "En likning"], "$(x, y, z) = P + t\\vec{r}$.", "What do you need for a parametric form of a line?", ["A point and a direction vector", "Two normal vectors", "Only a point", "An equation"], "$(x, y, z) = P + t\\vec{r}$."]
]);

// ---------------- Kjemi 2 ----------------
Q("VGKJ2", "Kjemisk likevekt", [
 ["Hva sier Le Châteliers prinsipp?", ["Likevekten forskyves for å motvirke en endring", "Likevekten forsvinner ved endring", "Reaksjonen stopper ved likevekt", "Konsentrasjonene blir like"], "Systemet «prøver» å motvirke påvirkningen.", "What does Le Chatelier's principle say?", ["The equilibrium shifts to counteract a change", "The equilibrium disappears when changed", "The reaction stops at equilibrium", "The concentrations become equal"], "The system counteracts the disturbance."],
 ["Hva skjer med $K$ hvis du tilsetter mer reaktant?", ["Ingenting, $K$ endres bare av temperaturen", "Den øker", "Den minker", "Den blir 1"], "Likevekten forskyves, men $K$ er den samme.", "What happens to $K$ if you add more reactant?", ["Nothing, $K$ only changes with temperature", "It increases", "It decreases", "It becomes 1"], "The equilibrium shifts, but $K$ stays the same."],
 ["Hva betyr en stor $K$ (for eksempel $10^8$)?", ["Likevekten ligger langt mot produktene", "Reaksjonen går sakte", "Det er mest reaktanter", "Temperaturen er høy"], "Mye produkt i forhold til reaktant.", "What does a large $K$ (for example $10^8$) mean?", ["The equilibrium lies far towards the products", "The reaction is slow", "Mostly reactants", "The temperature is high"], "Lots of product relative to reactant."],
 ["Er likevekt en tilstand der reaksjonen har stoppet?", ["Nei, fram- og tilbakereaksjonen går like fort", "Ja", "Bare i gass", "Bare ved høy temperatur"], "Dynamisk likevekt.", "Is equilibrium a state where the reaction has stopped?", ["No, the forward and reverse reactions run equally fast", "Yes", "Only in gases", "Only at high temperature"], "Dynamic equilibrium."]
]);
Q("VGKJ2", "Buffere og titrering", [
 ["Hva består en buffer av?", ["En svak syre og dens korresponderende base", "En sterk syre og en sterk base", "Bare vann", "Et salt og vann"], "For eksempel eddiksyre og acetat.", "What does a buffer consist of?", ["A weak acid and its conjugate base", "A strong acid and a strong base", "Only water", "A salt and water"], "For example acetic acid and acetate."],
 ["Hva er pH i en buffer der [syre] = [base] og $\\mathrm{p}K_a = 4{,}76$?", { n: 4.76, tol: 0.01, u: "" }, "Bufferlikningen: $\\mathrm{pH} = \\mathrm{p}K_a + \\lg 1 = 4{,}76$.", "What is the pH of a buffer where [acid] = [base] and $\\mathrm{p}K_a = 4.76$?", null, "The buffer equation: $\\mathrm{pH} = \\mathrm{p}K_a + \\lg 1 = 4.76$."],
 ["Hva er ekvivalenspunktet i en titrering?", ["Der stoffmengdene av syre og base er ekvivalente", "Der pH er 7 alltid", "Der fargen skifter", "Starten av titreringen"], "pH ved ekvivalens kan være ulik 7 for svake syrer.", "What is the equivalence point in a titration?", ["Where the amounts of acid and base are equivalent", "Where the pH is always 7", "Where the colour changes", "The start of the titration"], "The pH at equivalence can differ from 7 for weak acids."],
 ["Det går med 20,0 mL 0,100 mol/L NaOH for å nøytralisere en syre (1:1). Hvor mange mmol syre var det?", { n: 2, tol: 0.001, u: "mmol" }, "$20{,}0 \\cdot 0{,}100 = 2{,}00$ mmol.", "20.0 mL of 0.100 mol/L NaOH neutralises an acid (1:1). How many mmol of acid were there?", null, "$20.0 \\cdot 0.100 = 2.00$ mmol."]
]);
G("VGKJ2", "Buffere og titrering",
 () => { const V = R.p([10, 12.5, 15, 20, 25]), c = R.p([0.05, 0.1, 0.2]), Va = R.p([10, 20, 25]), ca = V * c / Va;
   return [T(`${nf(V, 1)} mL NaOH med konsentrasjon ${nf(c, 2)} mol/L nøytraliserer ${Va} mL HCl. Hva er konsentrasjonen av HCl (mol/L)?`, `${nf(V, 1)} mL NaOH with concentration ${nf(c, 2)} mol/L neutralises ${Va} mL HCl. What is the HCl concentration (mol/L)?`), { n: ca, tol: 0.0005, u: "mol/L" },
     T(`$n = ${mf(V, 1)} \\cdot ${mf(c, 2)} = ${mf(V * c, 3)}$ mmol, og $c = \\dfrac{${mf(V * c, 3)}}{${Va}} = ${mf(ca, 4)}$ mol/L.`, `$n = ${mf(V, 1)} \\cdot ${mf(c, 2)} = ${mf(V * c, 3)}$ mmol, and $c = \\dfrac{${mf(V * c, 3)}}{${Va}} = ${mf(ca, 4)}$ mol/L.`)]; }
);
Q("VGKJ2", "Elektrokjemi", [
 ["Hva skjer ved anoden i en galvanisk celle?", ["Oksidasjon", "Reduksjon", "Ingenting", "Nøytralisering"], "Huskeregel: «anode – oksidasjon», begge starter med vokal.", "What happens at the anode of a galvanic cell?", ["Oxidation", "Reduction", "Nothing", "Neutralisation"], "Mnemonic: \"an ox\": anode, oxidation."],
 ["Standardpotensialer: $\\mathrm{Cu^{2+}/Cu} = 0{,}34$ V og $\\mathrm{Zn^{2+}/Zn} = -0{,}76$ V. Hva er cellespenningen?", { n: 1.1, tol: 0.001, u: "V" }, "$0{,}34 - (-0{,}76) = 1{,}10$ V.", "Standard potentials: $\\mathrm{Cu^{2+}/Cu} = 0.34$ V and $\\mathrm{Zn^{2+}/Zn} = -0.76$ V. What is the cell voltage?", null, "$0.34 - (-0.76) = 1.10$ V."],
 ["Hva er elektrolyse?", ["Å bruke strøm til å drive en ikke-spontan redoksreaksjon", "En spontan reaksjon som gir strøm", "Å løse salt i vann", "Å måle pH"], "For eksempel spalting av vann.", "What is electrolysis?", ["Using current to drive a non-spontaneous redox reaction", "A spontaneous reaction that gives current", "Dissolving salt in water", "Measuring pH"], "For example splitting water."],
 ["Hvorfor ruster jern raskere i saltvann?", ["Saltvann leder strøm bedre og fremmer korrosjon", "Salt er en syre", "Salt reagerer med oksygen", "Jern løses i salt"], "Ioner gjør det lettere for elektroner å flytte seg.", "Why does iron rust faster in salt water?", ["Salt water conducts better and promotes corrosion", "Salt is an acid", "Salt reacts with oxygen", "Iron dissolves in salt"], "Ions make it easier for charge to move."]
]);

// ---------------- Biologi 1 og 2 ----------------
Q("VGBI1", "Fotosyntese og celleånding", [
 ["Hvor i cellen skjer fotosyntesen?", ["I kloroplastene", "I mitokondriene", "I cellekjernen", "I ribosomene"], "Klorofyll fanger lysenergi.", "Where in the cell does photosynthesis happen?", ["In the chloroplasts", "In the mitochondria", "In the nucleus", "In the ribosomes"], "Chlorophyll captures light energy."],
 ["Hvilket molekyl er cellens «energivaluta»?", ["ATP", "DNA", "Glukose", "$\\mathrm{CO_2}$"], "ATP frigjør energi når en fosfatgruppe spaltes av.", "Which molecule is the cell's \"energy currency\"?", ["ATP", "DNA", "Glucose", "$\\mathrm{CO_2}$"], "ATP releases energy when a phosphate group is split off."],
 ["Hva er sluttproduktene av celleånding?", ["$\\mathrm{CO_2}$, vann og ATP", "Glukose og oksygen", "Melkesyre alene", "Protein"], "Glukose + oksygen gir karbondioksid, vann og energi.", "What are the end products of cellular respiration?", ["$\\mathrm{CO_2}$, water and ATP", "Glucose and oxygen", "Lactic acid only", "Protein"], "Glucose + oxygen gives carbon dioxide, water and energy."],
 ["Hva lager musklene når de mangler oksygen?", ["Melkesyre (laktat)", "Alkohol", "Klorofyll", "Stivelse"], "Anaerob forbrenning i muskler gir laktat.", "What do muscles make when they lack oxygen?", ["Lactic acid (lactate)", "Alcohol", "Chlorophyll", "Starch"], "Anaerobic respiration in muscles gives lactate."]
]);
Q("VGBI1", "Biologisk mangfold og klassifisering", [
 ["Hva er rekkefølgen i systematikken, fra stort til smått?", ["Rike, rekke, klasse, orden, familie, slekt, art", "Art, slekt, familie, orden, klasse, rekke, rike", "Rike, klasse, rekke, art", "Familie, art, rike"], "Huskeregel: «Rikard rekker klassen og ordner familien sin slekt og art».", "What is the order of classification, from largest to smallest?", ["Kingdom, phylum, class, order, family, genus, species", "Species, genus, family, order, class, phylum, kingdom", "Kingdom, class, phylum, species", "Family, species, kingdom"], "From the broadest group to the single species."],
 ["Hva består et vitenskapelig artsnavn av?", ["Slektsnavn og artsnavn", "Familie og orden", "Norsk og latinsk navn", "Rike og art"], "For eksempel Homo sapiens.", "What does a scientific species name consist of?", ["Genus and species", "Family and order", "Norwegian and Latin name", "Kingdom and species"], "For example Homo sapiens."],
 ["Hva er biologisk mangfold?", ["Variasjonen i gener, arter og økosystemer", "Antall dyr i Norge", "Bare antall arter", "Hvor store dyrene er"], "Mangfold på tre nivåer.", "What is biodiversity?", ["The variety of genes, species and ecosystems", "The number of animals in Norway", "Only the number of species", "How big the animals are"], "Diversity at three levels."],
 ["Hva er den største trusselen mot biologisk mangfold?", ["Endret arealbruk (tap av leveområder)", "Månen", "For mye regn alene", "Fotosyntese"], "Nedbygging og ødeleggelse av leveområder.", "What is the greatest threat to biodiversity?", ["Land-use change (habitat loss)", "The moon", "Too much rain alone", "Photosynthesis"], "Development and destruction of habitats."]
]);
Q("VGBI2", "Fra gen til protein", [
 ["Hva heter prosessen der DNA kopieres til mRNA?", ["Transkripsjon", "Translasjon", "Replikasjon", "Mutasjon"], "Skjer i cellekjernen.", "What is the process where DNA is copied to mRNA called?", ["Transcription", "Translation", "Replication", "Mutation"], "It happens in the nucleus."],
 ["Hvor mange baser er et kodon?", { n: 3, tol: 0, u: "" }, "3 baser koder for én aminosyre.", "How many bases make up a codon?", null, "3 bases code for one amino acid."],
 ["Hvor skjer translasjonen?", ["På ribosomene", "I cellekjernen", "I mitokondriene", "I cellemembranen"], "Ribosomene leser mRNA og setter sammen aminosyrer.", "Where does translation happen?", ["On the ribosomes", "In the nucleus", "In the mitochondria", "In the cell membrane"], "The ribosomes read mRNA and join amino acids."],
 ["Hvilken base finnes i RNA, men ikke i DNA?", ["Uracil", "Tymin", "Adenin", "Guanin"], "U erstatter T.", "Which base is found in RNA but not in DNA?", ["Uracil", "Thymine", "Adenine", "Guanine"], "U replaces T."]
]);
G("VGBI2", "Fra gen til protein",
 () => { const b = "ATGC", pair = { A: "U", T: "A", G: "C", C: "G" }, s = Array.from({ length: 6 }, () => R.p(b.split(""))).join(""), m = s.split("").map(x => pair[x]).join("");
   const wrong = [...new Set([s.replace(/T/g, "U"), m.split("").reverse().join(""), s.split("").map(x => ({ A: "T", T: "A", G: "C", C: "G" })[x]).join(""), m.slice(1) + m[0], m.slice(-1) + m.slice(0, -1)])].filter(x => x !== m);
   if(wrong.length < 3) return [T("Hva heter prosessen der mRNA oversettes til protein?", "What is the process where mRNA is translated into protein called?"), [T("Translasjon", "Translation"), T("Transkripsjon", "Transcription"), T("Replikasjon", "Replication"), T("Mutasjon", "Mutation")], T("Translasjon skjer på ribosomene.", "Translation happens on the ribosomes.")];
   return [T(`DNA-malstrengen er ${s}. Hva blir mRNA?`, `The DNA template strand is ${s}. What is the mRNA?`), [m, ...wrong.slice(0, 3)],
     T(`A → U, T → A, G → C og C → G gir ${m}.`, `A → U, T → A, G → C and C → G gives ${m}.`)]; }
);
Q("VGBI2", "Bioteknologi", [
 ["Hva brukes PCR til?", ["Å lage mange kopier av en DNA-bit", "Å farge celler", "Å måle blodtrykk", "Å lage vaksiner direkte"], "Polymerasekjedereaksjon dobler DNA i hver syklus.", "What is PCR used for?", ["Making many copies of a piece of DNA", "Staining cells", "Measuring blood pressure", "Making vaccines directly"], "The polymerase chain reaction doubles DNA each cycle."],
 ["Hvor mange kopier får du av ett DNA-molekyl etter 10 PCR-sykluser?", { n: 1024, tol: 0, u: "" }, "$2^{10} = 1024$.", "How many copies of one DNA molecule do you get after 10 PCR cycles?", null, "$2^{10} = 1024$."],
 ["Hva er CRISPR?", ["Et verktøy for å redigere gener presist", "En type bakterie som gir sykdom", "En vaksine", "Et mikroskop"], "Kommer fra bakterienes forsvar mot virus.", "What is CRISPR?", ["A tool for editing genes precisely", "A disease-causing bacterium", "A vaccine", "A microscope"], "It comes from bacteria's defence against viruses."],
 ["Hva skiller DNA-bitene i gelelektroforese?", ["Størrelsen", "Fargen", "Smaken", "Temperaturen"], "Små biter vandrer lengst.", "What separates DNA pieces in gel electrophoresis?", ["Size", "Colour", "Taste", "Temperature"], "Small pieces travel furthest."]
]);
G("VGBI2", "Bioteknologi",
 () => { const n = R.i(5, 20), k = R.p([1, 2, 5, 10]), c = k * 2 ** n;
   return [T(`Du starter med ${k} DNA-molekyl${k > 1 ? "er" : ""} og kjører ${n} PCR-sykluser. Hvor mange kopier får du (i teorien)?`, `You start with ${k} DNA molecule${k > 1 ? "s" : ""} and run ${n} PCR cycles. How many copies do you get (in theory)?`), { n: c, tol: 0, u: "" },
     T(`Antallet dobles hver syklus: $${k} \\cdot 2^{${n}} = ${c}$.`, `The number doubles every cycle: $${k} \\cdot 2^{${n}} = ${c}$.`)]; }
);
Q("VGBI2", "Nervesystemet og hormoner", [
 ["Hva kalles overgangen mellom to nerveceller?", ["Synapse", "Akson", "Dendritt", "Myelin"], "Signalstoffer krysser synapsespalten.", "What is the junction between two nerve cells called?", ["Synapse", "Axon", "Dendrite", "Myelin"], "Neurotransmitters cross the synaptic cleft."],
 ["Hvilket hormon senker blodsukkeret?", ["Insulin", "Glukagon", "Adrenalin", "Tyroksin"], "Insulin fra bukspyttkjertelen.", "Which hormone lowers blood sugar?", ["Insulin", "Glucagon", "Adrenaline", "Thyroxine"], "Insulin from the pancreas."],
 ["Hva gjør myelinskjeden?", ["Gjør at nervesignalet går raskere", "Lager hormoner", "Stopper signalet", "Lagrer minner"], "Signalet hopper mellom Ranviers innsnøringer.", "What does the myelin sheath do?", ["Makes the nerve signal travel faster", "Makes hormones", "Stops the signal", "Stores memories"], "The signal jumps between the nodes of Ranvier."],
 ["Hva er negativ tilbakekobling?", ["En endring gir en respons som motvirker endringen", "En endring forsterkes", "Hormoner stopper for alltid", "Nervene slutter å virke"], "Holder kroppen i balanse (homeostase).", "What is negative feedback?", ["A change triggers a response that counteracts it", "A change is amplified", "Hormones stop for good", "The nerves stop working"], "Keeps the body in balance (homeostasis)."]
]);
Q("VGBI2", "Immunforsvaret", [
 ["Hva lager B-cellene?", ["Antistoffer", "Hormoner", "Enzymer til fordøyelse", "Blodplater"], "Antistoffer binder seg til antigener.", "What do B cells make?", ["Antibodies", "Hormones", "Digestive enzymes", "Platelets"], "Antibodies bind to antigens."],
 ["Hvordan virker en vaksine?", ["Den lærer immunforsvaret å kjenne igjen smittestoffet", "Den dreper alle bakterier", "Den er et antibiotikum", "Den gir sykdommen"], "Hukommelsesceller gir rask respons senere.", "How does a vaccine work?", ["It teaches the immune system to recognise the pathogen", "It kills all bacteria", "It is an antibiotic", "It gives you the disease"], "Memory cells give a fast response later."],
 ["Virker antibiotika mot virus?", ["Nei", "Ja", "Bare mot forkjølelse", "Bare hos barn"], "Antibiotika virker mot bakterier.", "Do antibiotics work against viruses?", ["No", "Yes", "Only against colds", "Only in children"], "Antibiotics work against bacteria."],
 ["Hva er flokkimmunitet?", ["Når nok mennesker er immune til at smitten ikke sprer seg", "Når alle er syke", "Når dyr er vaksinert", "Når ingen er vaksinert"], "Beskytter også de som ikke kan vaksineres.", "What is herd immunity?", ["When enough people are immune that the infection cannot spread", "When everyone is ill", "When animals are vaccinated", "When nobody is vaccinated"], "It also protects those who cannot be vaccinated."]
]);
})();
