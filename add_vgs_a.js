// ============================================================
//  add_vgs_a.js – VIDEREGÅENDE (studiespesialisering, LK20): fagene + Matematikk 1T og R1
// ============================================================
GROUP_NAMES["VGS: matematikk"] = ["Matematikk", "Mathematics"];
GROUP_NAMES["VGS: realfag"] = ["Fysikk, kjemi og biologi", "Physics, chemistry and biology"];
const VG_EQ = (nb, en) => ({ nb, en });
NEWCOURSE({ code: "VG1T", study: "vgs", group: "VGS: matematikk", nb: "Matematikk 1T", en: "Mathematics 1T", s: ["1T", "1T"], eqText: VG_EQ("Vg1 studiespesialisering (LK20)", "Year 11, general studies (Norwegian curriculum)"),
  units: [["Algebra og likninger", "Algebra and equations"], ["Funksjoner", "Functions"], ["Derivasjon og vekstfart", "Differentiation and rate of change"], ["Trigonometri", "Trigonometry"]] });
NEWCOURSE({ code: "VGR1", study: "vgs", group: "VGS: matematikk", nb: "Matematikk R1", en: "Mathematics R1", s: ["R1", "R1"], eqText: VG_EQ("Vg2 realfagsmatematikk (LK20)", "Year 12, advanced maths (Norwegian curriculum)"),
  units: [["Logaritmer og eksponentiallikninger", "Logarithms and exponential equations"], ["Derivasjon og drøfting", "Differentiation and curve analysis"], ["Vektorer i planet", "Vectors in the plane"], ["Sannsynlighet og kombinatorikk", "Probability and combinatorics"]] });
NEWCOURSE({ code: "VGR2", study: "vgs", group: "VGS: matematikk", nb: "Matematikk R2", en: "Mathematics R2", s: ["R2", "R2"], eqText: VG_EQ("Vg3 realfagsmatematikk (LK20)", "Year 13, advanced maths (Norwegian curriculum)"),
  units: [["Integrasjon", "Integration"], ["Følger og rekker", "Sequences and series"], ["Differensiallikninger", "Differential equations"], ["Trigonometriske funksjoner", "Trigonometric functions"], ["Vektorer i rommet", "Vectors in space"]] });
NEWCOURSE({ code: "VGFY1", study: "vgs", group: "VGS: realfag", nb: "Fysikk 1", en: "Physics 1", s: ["Fy", "Ph"], eqText: VG_EQ("Vg2 programfag (LK20)", "Year 12 elective (Norwegian curriculum)"),
  units: [["Bevegelse", "Motion"], ["Krefter og Newtons lover", "Forces and Newton's laws"], ["Energi og arbeid", "Energy and work"], ["Elektrisitet", "Electricity"], ["Atomer, stråling og universet", "Atoms, radiation and the universe"]] });
NEWCOURSE({ code: "VGKJ1", study: "vgs", group: "VGS: realfag", nb: "Kjemi 1", en: "Chemistry 1", s: ["Kj", "Ch"], eqText: VG_EQ("Vg2 programfag (LK20)", "Year 12 elective (Norwegian curriculum)"),
  units: [["Atomer og periodesystemet", "Atoms and the periodic table"], ["Kjemiske bindinger", "Chemical bonds"], ["Stoffmengde og konsentrasjon", "Amount of substance and concentration"], ["Syrer, baser og pH", "Acids, bases and pH"], ["Redoksreaksjoner", "Redox reactions"]] });
NEWCOURSE({ code: "VGBI1", study: "vgs", group: "VGS: realfag", nb: "Biologi 1", en: "Biology 1", s: ["Bi", "Bi"], eqText: VG_EQ("Vg2 programfag (LK20)", "Year 12 elective (Norwegian curriculum)"),
  units: [["Cellen", "The cell"], ["Arv og genetikk", "Heredity and genetics"], ["Økologi", "Ecology"], ["Evolusjon", "Evolution"]] });

(() => {
// Skriver et polynom pent: pl([[3, "x^2"], [-2, "x"], [5, ""]]) → "3x^2 - 2x + 5" (nulledd hoppes over).
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
// ================= VG1T 0: Algebra og likninger =================
THEORY("VG1T", 0, {
nb: `## Hva handler det om?
Algebra er å regne med bokstaver. Du må kunne forenkle uttrykk, faktorisere og løse likninger av første og andre grad, og likningssett.

## Begreper og formler
- Potensregler: $a^m \\cdot a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$, $a^{-n} = \\dfrac{1}{a^n}$.
- Standardform: $a \\cdot 10^n$ med $1 \\le a < 10$.
- Kvadratsetningene: $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$.
- Andregradslikning $ax^2 + bx + c = 0$: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.
- Diskriminanten $b^2 - 4ac$: positiv gir to løsninger, null gir én, negativ gir ingen.
- Likningssett med to ukjente løses med innsettingsmetoden eller addisjonsmetoden.

### Eksempel
Løs $x^2 - 5x + 6 = 0$. Her er $b^2 - 4ac = 25 - 24 = 1$, så $x = \\dfrac{5 \\pm 1}{2}$, altså $x = 2$ eller $x = 3$.

> Sjekk alltid svaret ved å sette det inn i den opprinnelige likningen.`,
en: `## What is it about?
Algebra is calculating with letters. You must be able to simplify expressions, factorise, and solve first- and second-degree equations and systems of equations.

## Concepts and formulas
- Power rules: $a^m \\cdot a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$, $a^{-n} = \\dfrac{1}{a^n}$.
- Standard form: $a \\cdot 10^n$ with $1 \\le a < 10$.
- The square identities: $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$.
- Quadratic equation $ax^2 + bx + c = 0$: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.
- The discriminant $b^2 - 4ac$: positive gives two solutions, zero gives one, negative gives none.
- Systems with two unknowns are solved by substitution or elimination.

### Example
Solve $x^2 - 5x + 6 = 0$. Here $b^2 - 4ac = 25 - 24 = 1$, so $x = \\dfrac{5 \\pm 1}{2}$, i.e. $x = 2$ or $x = 3$.

> Always check the answer by inserting it into the original equation.`
});
BIQ("VG1T", 0, [
 ["Hva er $(a+b)^2$?", ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 + ab + b^2$", "$2a + 2b$"], "Første kvadratsetning. Det vanligste feilsvaret er å glemme leddet $2ab$.",
  "What is $(a+b)^2$?", ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 + ab + b^2$", "$2a + 2b$"], "The first square identity. The most common mistake is forgetting the $2ab$ term."],
 ["Hva er $2^{-3}$?", ["$\\dfrac{1}{8}$", "$-8$", "$-6$", "$\\dfrac{1}{6}$"], "$a^{-n} = 1/a^n$, så $2^{-3} = 1/8$.",
  "What is $2^{-3}$?", ["$\\dfrac{1}{8}$", "$-8$", "$-6$", "$\\dfrac{1}{6}$"], "$a^{-n} = 1/a^n$, so $2^{-3} = 1/8$."],
 ["Hvor mange løsninger har $x^2 + 2x + 5 = 0$?", ["Ingen", "Én", "To", "Uendelig mange"], "Diskriminanten er $4 - 20 = -16 < 0$, så det finnes ingen reelle løsninger.",
  "How many solutions does $x^2 + 2x + 5 = 0$ have?", ["None", "One", "Two", "Infinitely many"], "The discriminant is $4 - 20 = -16 < 0$, so there are no real solutions."],
 ["Skriv 0,00045 på standardform.", ["$4{,}5 \\cdot 10^{-4}$", "$45 \\cdot 10^{-5}$", "$4{,}5 \\cdot 10^{4}$", "$0{,}45 \\cdot 10^{-3}$"], "Flytt kommaet fire plasser til høyre: $4{,}5 \\cdot 10^{-4}$. Tallet foran må være mellom 1 og 10.",
  "Write 0.00045 in standard form.", ["$4.5 \\cdot 10^{-4}$", "$45 \\cdot 10^{-5}$", "$4.5 \\cdot 10^{4}$", "$0.45 \\cdot 10^{-3}$"], "Move the decimal point four places to the right: $4.5 \\cdot 10^{-4}$. The number in front must be between 1 and 10."]
]);
GEN("VG1T", 0,
 () => { const a = R.p([2, 3, 4, 5, -2, -3]), x = R.i(-9, 9), b = R.i(-12, 12); const c = a * x + b;
   return [T(`Løs likningen $${pl([[a, "x"], [b, ""]])} = ${c}$.`, `Solve the equation $${pl([[a, "x"], [b, ""]])} = ${c}$.`), { n: x, tol: 0.001, u: "" },
     T(`Trekk fra ${b} på begge sider og del på ${a}: $x = (${c} - (${b}))/${a} = ${x}$.`, `Subtract ${b} on both sides and divide by ${a}: $x = (${c} - (${b}))/${a} = ${x}$.`)]; },
 () => { const [r1, r2] = R.distinct(2, -8, 9); const b = -(r1 + r2), c = r1 * r2, big = Math.max(r1, r2);
   return [T(`Løs $${pl([[1, "x^2"], [b, "x"], [c, ""]])} = 0$. Oppgi den største løsningen.`, `Solve $${pl([[1, "x^2"], [b, "x"], [c, ""]])} = 0$. Give the largest solution.`), { n: big, tol: 0.001, u: "" },
     T(`Diskriminanten er $${b * b} - ${4 * c} = ${b * b - 4 * c}$. Løsningene er $x = ${Math.min(r1, r2)}$ og $x = ${big}$. Den største er ${big}.`, `The discriminant is $${b * b} - ${4 * c} = ${b * b - 4 * c}$. The solutions are $x = ${Math.min(r1, r2)}$ and $x = ${big}$. The largest is ${big}.`)]; },
 () => { const x = R.i(-6, 6), y = R.i(-6, 6), a = R.p([1, 2, 3]), b = R.p([1, 2, -1]); const s1 = x + y, s2 = a * x - b * y;
   return [T(`Løs likningssettet $x + y = ${s1}$ og $${pl([[a, "x"], [-b, "y"]])} = ${s2}$. Hva er $x$?`, `Solve the system $x + y = ${s1}$ and $${pl([[a, "x"], [-b, "y"]])} = ${s2}$. What is $x$?`), { n: x, tol: 0.001, u: "" },
     T(`Sett $y = ${s1} - x$ inn i den andre likningen og løs: $x = ${x}$ (og $y = ${y}$).`, `Insert $y = ${s1} - x$ into the second equation and solve: $x = ${x}$ (and $y = ${y}$).`)]; }
);

// ================= VG1T 1: Funksjoner =================
THEORY("VG1T", 1, {
nb: `## Hva handler det om?
En funksjon gir én $y$-verdi for hver $x$-verdi. I 1T jobber du med lineære funksjoner, andregradsfunksjoner og polynomer, og leser av nullpunkter, topp- og bunnpunkter.

## Begreper og formler
- Lineær funksjon: $f(x) = ax + b$. Stigningstallet $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$, konstantleddet $b$ er der grafen skjærer $y$-aksen.
- Andregradsfunksjon: $f(x) = ax^2 + bx + c$. Grafen er en parabel, som smiler når $a > 0$ og er sur når $a < 0$.
- Symmetrilinjen (og $x$-verdien til topp- eller bunnpunktet): $x = -\\dfrac{b}{2a}$.
- Nullpunkter er der $f(x) = 0$, altså der grafen skjærer $x$-aksen.

### Eksempel
$f(x) = x^2 - 4x + 1$ har bunnpunkt i $x = -(-4)/2 = 2$, og $f(2) = 4 - 8 + 1 = -3$. Bunnpunktet er $(2, -3)$.

> Stigningstall = endring i $y$ delt på endring i $x$. Toppunkt/bunnpunkt: $x = -b/(2a)$.`,
en: `## What is it about?
A function gives one $y$-value for each $x$-value. In 1T you work with linear functions, quadratic functions and polynomials, and read off zeros, maxima and minima.

## Concepts and formulas
- Linear function: $f(x) = ax + b$. The slope $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$, and the constant term $b$ is where the graph crosses the $y$-axis.
- Quadratic function: $f(x) = ax^2 + bx + c$. The graph is a parabola, opening upwards when $a > 0$ and downwards when $a < 0$.
- The axis of symmetry (and the $x$-value of the maximum or minimum): $x = -\\dfrac{b}{2a}$.
- Zeros are where $f(x) = 0$, i.e. where the graph crosses the $x$-axis.

### Example
$f(x) = x^2 - 4x + 1$ has its minimum at $x = -(-4)/2 = 2$, and $f(2) = 4 - 8 + 1 = -3$. The minimum point is $(2, -3)$.

> Slope = change in $y$ divided by change in $x$. Maximum/minimum: $x = -b/(2a)$.`
});
BIQ("VG1T", 1, [
 ["Hva forteller $a$ i $f(x) = ax + b$?", ["Stigningstallet", "Skjæringen med $y$-aksen", "Nullpunktet", "Toppunktet"], "$a$ er hvor mye $y$ øker når $x$ øker med 1.",
  "What does $a$ tell you in $f(x) = ax + b$?", ["The slope", "The $y$-intercept", "The zero", "The maximum"], "$a$ is how much $y$ increases when $x$ increases by 1."],
 ["Grafen til $f(x) = -2x^2 + 3x$ er …", ["en parabel med toppunkt", "en parabel med bunnpunkt", "en rett linje", "en hyperbel"], "Negativ $a$ gir en «sur» parabel med toppunkt.",
  "The graph of $f(x) = -2x^2 + 3x$ is …", ["a parabola with a maximum", "a parabola with a minimum", "a straight line", "a hyperbola"], "A negative $a$ gives a downward-opening parabola with a maximum."],
 ["Hvor skjærer $f(x) = 3x - 6$ $x$-aksen?", { n: 2, tol: 0, u: "" }, "Sett $3x - 6 = 0$, så $x = 2$.",
  "Where does $f(x) = 3x - 6$ cross the $x$-axis?", null, "Set $3x - 6 = 0$, so $x = 2$."]
]);
GEN("VG1T", 1,
 () => { const [x1, x2] = R.distinct(2, -5, 6), a = R.p([-3, -2, -1, 1, 2, 3, 0.5]), b = R.i(-5, 5); const y1 = a * x1 + b, y2 = a * x2 + b;
   return [T(`En rett linje går gjennom $(${x1}, ${mf(y1, 1)})$ og $(${x2}, ${mf(y2, 1)})$. Hva er stigningstallet?`, `A straight line passes through $(${x1}, ${mf(y1, 1)})$ and $(${x2}, ${mf(y2, 1)})$. What is the slope?`), { n: a, tol: 0.001, u: "" },
     T(`$a = \\dfrac{${mf(y2, 1)} - (${mf(y1, 1)})}{${x2} - (${x1})} = ${mf(a, 2)}$.`, `$a = \\dfrac{${mf(y2, 1)} - (${mf(y1, 1)})}{${x2} - (${x1})} = ${mf(a, 2)}$.`)]; },
 () => { const a = R.p([1, 2, -1, -2, 3]), h = R.i(-4, 4), k = R.i(-6, 6); const b = -2 * a * h, c = a * h * h + k;
   return [T(`Finn $y$-verdien i ${a > 0 ? "bunnpunktet" : "toppunktet"} til $f(x) = ${pl([[a, "x^2"], [b, "x"], [c, ""]])}$.`, `Find the $y$-value of the ${a > 0 ? "minimum" : "maximum"} of $f(x) = ${pl([[a, "x^2"], [b, "x"], [c, ""]])}$.`), { n: k, tol: 0.001, u: "" },
     T(`$x = -b/(2a) = ${-b}/${2 * a} = ${h}$. $f(${h}) = ${k}$.`, `$x = -b/(2a) = ${-b}/${2 * a} = ${h}$. $f(${h}) = ${k}$.`)]; }
);

// ================= VG1T 2: Derivasjon og vekstfart =================
THEORY("VG1T", 2, {
nb: `## Hva handler det om?
Den deriverte forteller hvor raskt en funksjon endrer seg i et bestemt punkt: stigningstallet til tangenten. Gjennomsnittlig vekstfart er stigningen mellom to punkter.

## Begreper og formler
- Gjennomsnittlig vekstfart fra $x_1$ til $x_2$: $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.
- Momentan vekstfart i $x$: den deriverte $f'(x)$.
- Derivasjonsregler for polynomer: $(x^n)' = n x^{n-1}$, $(k)' = 0$, $(k \\cdot f)' = k f'$, $(f + g)' = f' + g'$.
- Der $f'(x) = 0$ kan funksjonen ha topp- eller bunnpunkt. Fortegnet til $f'$ forteller om funksjonen vokser ($f' > 0$) eller avtar ($f' < 0$).

### Eksempel
$f(x) = x^3 - 3x$ gir $f'(x) = 3x^2 - 3$. $f'(x) = 0$ når $x = \\pm 1$.

> Deriver ledd for ledd: gang med eksponenten og trekk 1 fra den.`,
en: `## What is it about?
The derivative tells how fast a function is changing at a particular point: the slope of the tangent. The average rate of change is the slope between two points.

## Concepts and formulas
- Average rate of change from $x_1$ to $x_2$: $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.
- Instantaneous rate of change at $x$: the derivative $f'(x)$.
- Differentiation rules for polynomials: $(x^n)' = n x^{n-1}$, $(k)' = 0$, $(k \\cdot f)' = k f'$, $(f + g)' = f' + g'$.
- Where $f'(x) = 0$ the function may have a maximum or minimum. The sign of $f'$ tells whether the function is increasing ($f' > 0$) or decreasing ($f' < 0$).

### Example
$f(x) = x^3 - 3x$ gives $f'(x) = 3x^2 - 3$. $f'(x) = 0$ when $x = \\pm 1$.

> Differentiate term by term: multiply by the exponent and subtract 1 from it.`
});
BIQ("VG1T", 2, [
 ["Hva er den deriverte av $f(x) = 5x^3$?", ["$15x^2$", "$5x^2$", "$15x^3$", "$3x^2$"], "$(x^3)' = 3x^2$, ganget med 5 gir $15x^2$.",
  "What is the derivative of $f(x) = 5x^3$?", ["$15x^2$", "$5x^2$", "$15x^3$", "$3x^2$"], "$(x^3)' = 3x^2$, multiplied by 5 gives $15x^2$."],
 ["Hva betyr $f'(2) > 0$?", ["Funksjonen vokser i $x = 2$", "Funksjonen er positiv i $x = 2$", "Grafen har toppunkt i $x = 2$", "Funksjonen avtar i $x = 2$"], "Den deriverte er stigningen til tangenten. Positiv stigning betyr at funksjonen vokser.",
  "What does $f'(2) > 0$ mean?", ["The function is increasing at $x = 2$", "The function is positive at $x = 2$", "The graph has a maximum at $x = 2$", "The function is decreasing at $x = 2$"], "The derivative is the slope of the tangent. A positive slope means the function is increasing."],
 ["Hva er den deriverte av en konstant?", ["0", "1", "Konstanten selv", "Den finnes ikke"], "En konstant endrer seg ikke, så vekstfarten er 0.",
  "What is the derivative of a constant?", ["0", "1", "The constant itself", "It does not exist"], "A constant does not change, so the rate of change is 0."]
]);
GEN("VG1T", 2,
 () => { const a = R.p([1, 2, -1, 3]), b = R.i(-5, 5), c = R.i(-6, 6), x0 = R.i(-3, 3); const d = 3 * a * x0 * x0 + 2 * b * x0 + c;
   return [T(`$f(x) = ${pl([[a, "x^3"], [b, "x^2"], [c, "x"]])}$. Finn $f'(${x0})$.`, `$f(x) = ${pl([[a, "x^3"], [b, "x^2"], [c, "x"]])}$. Find $f'(${x0})$.`), { n: d, tol: 0.001, u: "" },
     T(`$f'(x) = ${pl([[3 * a, "x^2"], [2 * b, "x"], [c, ""]])}$, så $f'(${x0}) = ${d}$.`, `$f'(x) = ${pl([[3 * a, "x^2"], [2 * b, "x"], [c, ""]])}$, so $f'(${x0}) = ${d}$.`)]; },
 () => { const a = R.p([1, 2, -1]), b = R.i(-4, 4), [x1, x2] = R.distinct(2, -3, 4).sort((p, q) => p - q); const f = x => a * x * x + b * x, g = (f(x2) - f(x1)) / (x2 - x1);
   return [T(`Finn gjennomsnittlig vekstfart for $f(x) = ${pl([[a, "x^2"], [b, "x"]])}$ fra $x = ${x1}$ til $x = ${x2}$.`, `Find the average rate of change of $f(x) = ${pl([[a, "x^2"], [b, "x"]])}$ from $x = ${x1}$ to $x = ${x2}$.`), { n: g, tol: 0.001, u: "" },
     T(`$\\dfrac{f(${x2}) - f(${x1})}{${x2} - (${x1})} = \\dfrac{${f(x2)} - (${f(x1)})}{${x2 - x1}} = ${mf(g, 2)}$.`, `$\\dfrac{f(${x2}) - f(${x1})}{${x2} - (${x1})} = \\dfrac{${f(x2)} - (${f(x1)})}{${x2 - x1}} = ${mf(g, 2)}$.`)]; }
);

// ================= VG1T 3: Trigonometri =================
THEORY("VG1T", 3, {
nb: `## Hva handler det om?
Trigonometri knytter vinkler og sider i trekanter sammen. I rettvinklede trekanter bruker du sinus, cosinus og tangens. I andre trekanter bruker du sinussetningen, cosinussetningen og arealsetningen.

## Begreper og formler
- Rettvinklet trekant: $\\sin v = \\dfrac{\\text{motstående}}{\\text{hypotenus}}$, $\\cos v = \\dfrac{\\text{hosliggende}}{\\text{hypotenus}}$, $\\tan v = \\dfrac{\\text{motstående}}{\\text{hosliggende}}$.
- Pytagoras: $a^2 + b^2 = c^2$.
- Arealsetningen: $A = \\tfrac12 ab \\sin C$.
- Sinussetningen: $\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}$.
- Cosinussetningen: $c^2 = a^2 + b^2 - 2ab\\cos C$.

> Rettvinklet: sin, cos, tan. Ellers: sinus-, cosinus- eller arealsetningen.`,
en: `## What is it about?
Trigonometry connects angles and sides in triangles. In right-angled triangles you use sine, cosine and tangent. In other triangles you use the sine rule, the cosine rule and the area formula.

## Concepts and formulas
- Right-angled triangle: $\\sin v = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, $\\cos v = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$, $\\tan v = \\dfrac{\\text{opposite}}{\\text{adjacent}}$.
- Pythagoras: $a^2 + b^2 = c^2$.
- Area formula: $A = \\tfrac12 ab \\sin C$.
- Sine rule: $\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}$.
- Cosine rule: $c^2 = a^2 + b^2 - 2ab\\cos C$.

> Right-angled: sin, cos, tan. Otherwise: the sine rule, cosine rule or area formula.`
});
BIQ("VG1T", 3, [
 ["Hva er $\\sin v$ i en rettvinklet trekant?", ["Motstående katet delt på hypotenusen", "Hosliggende katet delt på hypotenusen", "Motstående delt på hosliggende", "Hypotenusen delt på motstående"], "Huskeregel: sin = mot/hyp, cos = hos/hyp, tan = mot/hos.",
  "What is $\\sin v$ in a right-angled triangle?", ["The opposite side divided by the hypotenuse", "The adjacent side divided by the hypotenuse", "Opposite divided by adjacent", "The hypotenuse divided by the opposite side"], "Mnemonic: sin = opp/hyp, cos = adj/hyp, tan = opp/adj."],
 ["Katetene i en rettvinklet trekant er 6 og 8. Hvor lang er hypotenusen?", { n: 10, tol: 0, u: "" }, "$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.",
  "The legs of a right-angled triangle are 6 and 8. How long is the hypotenuse?", null, "$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$."],
 ["Når bruker du cosinussetningen?", ["Når du kjenner to sider og vinkelen mellom dem, eller alle tre sidene", "Bare i rettvinklede trekanter", "Når du kjenner tre vinkler", "Når du skal finne arealet"], "Med to sider og mellomliggende vinkel finner du den tredje siden.",
  "When do you use the cosine rule?", ["When you know two sides and the angle between them, or all three sides", "Only in right-angled triangles", "When you know three angles", "When you need the area"], "With two sides and the included angle you find the third side."]
]);
GEN("VG1T", 3,
 () => { const h = R.i(5, 20), v = R.p([20, 25, 30, 35, 40, 50, 60]); const m = h * Math.sin(v * DEG);
   return [T(`I en rettvinklet trekant er hypotenusen ${h} og en vinkel ${v}°. Hvor lang er kateten motstående vinkelen?`, `In a right-angled triangle the hypotenuse is ${h} and one angle is ${v}°. How long is the leg opposite the angle?`), { n: m, tol: 0.02, u: "" },
     T(`$${h} \\cdot \\sin ${v}^\\circ \\approx ${mf(m, 2)}$.`, `$${h} \\cdot \\sin ${v}^\\circ \\approx ${mf(m, 2)}$.`)]; },
 () => { const a = R.i(4, 15), b = R.i(4, 15), C = R.p([30, 45, 60, 75, 100, 120]); const A = 0.5 * a * b * Math.sin(C * DEG);
   return [T(`To sider i en trekant er ${a} og ${b}, og vinkelen mellom dem er ${C}°. Hva er arealet?`, `Two sides of a triangle are ${a} and ${b}, and the angle between them is ${C}°. What is the area?`), { n: A, tol: 0.05, u: "" },
     T(`$A = \\tfrac12 \\cdot ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ \\approx ${mf(A, 2)}$.`, `$A = \\tfrac12 \\cdot ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ \\approx ${mf(A, 2)}$.`)]; },
 () => { const a = R.i(4, 12), b = R.i(4, 12), C = R.p([40, 60, 90, 110, 120]); const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * DEG));
   return [T(`I en trekant er $a = ${a}$, $b = ${b}$ og $C = ${C}^\\circ$. Finn siden $c$.`, `In a triangle $a = ${a}$, $b = ${b}$ and $C = ${C}^\\circ$. Find the side $c$.`), { n: c, tol: 0.02, u: "" },
     T(`$c = \\sqrt{${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cos ${C}^\\circ} \\approx ${mf(c, 2)}$.`, `$c = \\sqrt{${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cos ${C}^\\circ} \\approx ${mf(c, 2)}$.`)]; }
);

// ================= VGR1 0: Logaritmer og eksponentiallikninger =================
THEORY("VGR1", 0, {
nb: `## Hva handler det om?
Logaritmen svarer på spørsmålet «hvilken eksponent trenger jeg?». Den brukes for å løse likninger der den ukjente står i eksponenten, for eksempel ved vekst og nedbrytning.

## Begreper og formler
- $\\lg a = x \\iff 10^x = a$, og $\\ln a = x \\iff e^x = a$.
- $\\lg(ab) = \\lg a + \\lg b$, $\\lg\\dfrac{a}{b} = \\lg a - \\lg b$, $\\lg a^n = n \\lg a$ (tilsvarende for $\\ln$).
- $e^{kx} = a$ gir $x = \\dfrac{\\ln a}{k}$.
- Eksponentiell vekst: $f(x) = a \\cdot b^x$. Vekstfaktoren $b > 1$ gir vekst, $0 < b < 1$ gir nedgang.

### Eksempel
$3 \\cdot 2^x = 48$ gir $2^x = 16$, så $x = \\dfrac{\\lg 16}{\\lg 2} = 4$.

> Den ukjente i eksponenten? Ta logaritmen på begge sider.`,
en: `## What is it about?
The logarithm answers the question "which exponent do I need?". It is used to solve equations where the unknown is in the exponent, for example in growth and decay.

## Concepts and formulas
- $\\lg a = x \\iff 10^x = a$, and $\\ln a = x \\iff e^x = a$.
- $\\lg(ab) = \\lg a + \\lg b$, $\\lg\\dfrac{a}{b} = \\lg a - \\lg b$, $\\lg a^n = n \\lg a$ (similarly for $\\ln$).
- $e^{kx} = a$ gives $x = \\dfrac{\\ln a}{k}$.
- Exponential growth: $f(x) = a \\cdot b^x$. A growth factor $b > 1$ gives growth, $0 < b < 1$ gives decline.

### Example
$3 \\cdot 2^x = 48$ gives $2^x = 16$, so $x = \\dfrac{\\lg 16}{\\lg 2} = 4$.

> Unknown in the exponent? Take the logarithm of both sides.`
});
BIQ("VGR1", 0, [
 ["Hva er $\\lg 1000$?", { n: 3, tol: 0, u: "" }, "$10^3 = 1000$, så $\\lg 1000 = 3$.", "What is $\\lg 1000$?", null, "$10^3 = 1000$, so $\\lg 1000 = 3$."],
 ["Hva er $\\ln e^5$?", { n: 5, tol: 0, u: "" }, "$\\ln$ og $e^x$ opphever hverandre: $\\ln e^5 = 5$.", "What is $\\ln e^5$?", null, "$\\ln$ and $e^x$ cancel each other: $\\ln e^5 = 5$."],
 ["Hva er $\\lg a + \\lg b$?", ["$\\lg(ab)$", "$\\lg(a+b)$", "$\\lg a \\cdot \\lg b$", "$\\lg\\dfrac{a}{b}$"], "Summen av logaritmer er logaritmen til produktet.",
  "What is $\\lg a + \\lg b$?", ["$\\lg(ab)$", "$\\lg(a+b)$", "$\\lg a \\cdot \\lg b$", "$\\lg\\dfrac{a}{b}$"], "The sum of logarithms is the logarithm of the product."],
 ["En verdi synker med 8 % per år. Hva er vekstfaktoren?", ["0,92", "1,08", "0,08", "−8"], "Nedgang på 8 % betyr at 92 % er igjen hvert år: vekstfaktor 0,92.",
  "A value decreases by 8% per year. What is the growth factor?", ["0.92", "1.08", "0.08", "−8"], "A decrease of 8% means 92% remains each year: growth factor 0.92."]
]);
GEN("VGR1", 0,
 () => { const k = R.p([0.5, 1, 2, 3, 0.2]), a = R.p([2, 5, 10, 20, 50, 100]); const x = Math.log(a) / k;
   return [T(`Løs $e^{${mf(k, 1)}x} = ${a}$.`, `Solve $e^{${mf(k, 1)}x} = ${a}$.`), { n: x, tol: 0.01, u: "" }, T(`$x = \\dfrac{\\ln ${a}}{${mf(k, 1)}} \\approx ${mf(x, 3)}$.`, `$x = \\dfrac{\\ln ${a}}{${mf(k, 1)}} \\approx ${mf(x, 3)}$.`)]; },
 () => { const a = R.p([2, 3, 5, 10]), b = R.p([2, 3, 5]), n = R.i(2, 6); const rhs = a * Math.pow(b, n);
   return [T(`Løs $${a} \\cdot ${b}^x = ${rhs}$.`, `Solve $${a} \\cdot ${b}^x = ${rhs}$.`), { n, tol: 0.001, u: "" }, T(`$${b}^x = ${rhs / a}$, så $x = \\dfrac{\\lg ${rhs / a}}{\\lg ${b}} = ${n}$.`, `$${b}^x = ${rhs / a}$, so $x = \\dfrac{\\lg ${rhs / a}}{\\lg ${b}} = ${n}$.`)]; },
 () => { const P = R.p([1000, 5000, 10000, 50000]), p = R.p([2, 3, 4, 5, 8, 10]), F = R.p([1.5, 2, 3]); const n = Math.log(F) / Math.log(1 + p / 100);
   return [T(`Et beløp på ${nf(P)} kr vokser med ${p} % per år. Etter hvor mange år er det ${nf(F, 1)} ganger så stort?`, `An amount of ${nf(P)} NOK grows by ${p}% per year. After how many years is it ${nf(F, 1)} times as large?`), { n, tol: 0.05, u: T("år", "years") },
     T(`$${mf(1 + p / 100, 2)}^x = ${mf(F, 1)}$ gir $x = \\dfrac{\\lg ${mf(F, 1)}}{\\lg ${mf(1 + p / 100, 2)}} \\approx ${mf(n, 2)}$ år.`, `$${mf(1 + p / 100, 2)}^x = ${mf(F, 1)}$ gives $x = \\dfrac{\\lg ${mf(F, 1)}}{\\lg ${mf(1 + p / 100, 2)}} \\approx ${mf(n, 2)}$ years.`)]; }
);

// ================= VGR1 1: Derivasjon og drøfting =================
THEORY("VGR1", 1, {
nb: `## Hva handler det om?
I R1 deriverer du flere typer funksjoner og bruker den deriverte til å drøfte grafen: hvor den vokser og avtar, topp- og bunnpunkter, og vendepunkter.

## Begreper og formler
- $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$.
- Produktregelen: $(uv)' = u'v + uv'$.
- Kvotientregelen: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.
- Kjerneregelen: $\\big(g(u(x))\\big)' = g'(u) \\cdot u'(x)$.
- Toppunkt/bunnpunkt der $f'(x) = 0$ og $f'$ skifter fortegn. Vendepunkt der $f''(x) = 0$ og $f''$ skifter fortegn.

### Eksempel
$f(x) = (2x + 1)^3$ gir $f'(x) = 3(2x + 1)^2 \\cdot 2 = 6(2x+1)^2$.

> Kjerneregelen: deriver den ytre, behold kjernen, gang med den deriverte av kjernen.`,
en: `## What is it about?
In R1 you differentiate more types of functions and use the derivative to analyse the graph: where it increases and decreases, maxima and minima, and inflection points.

## Concepts and formulas
- $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$.
- Product rule: $(uv)' = u'v + uv'$.
- Quotient rule: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.
- Chain rule: $\\big(g(u(x))\\big)' = g'(u) \\cdot u'(x)$.
- Maximum/minimum where $f'(x) = 0$ and $f'$ changes sign. Inflection point where $f''(x) = 0$ and $f''$ changes sign.

### Example
$f(x) = (2x + 1)^3$ gives $f'(x) = 3(2x + 1)^2 \\cdot 2 = 6(2x+1)^2$.

> Chain rule: differentiate the outer function, keep the inside, multiply by the derivative of the inside.`
});
BIQ("VGR1", 1, [
 ["Hva er $(x e^x)'$?", ["$(x+1)e^x$", "$e^x$", "$x e^{x-1}$", "$x e^x$"], "Produktregelen: $1 \\cdot e^x + x \\cdot e^x = (x+1)e^x$.",
  "What is $(x e^x)'$?", ["$(x+1)e^x$", "$e^x$", "$x e^{x-1}$", "$x e^x$"], "Product rule: $1 \\cdot e^x + x \\cdot e^x = (x+1)e^x$."],
 ["Hva er $(\\ln(3x))'$?", ["$\\dfrac{1}{x}$", "$\\dfrac{3}{x}$", "$\\dfrac{1}{3x}$", "$3\\ln x$"], "Kjerneregelen: $\\dfrac{1}{3x} \\cdot 3 = \\dfrac{1}{x}$.",
  "What is $(\\ln(3x))'$?", ["$\\dfrac{1}{x}$", "$\\dfrac{3}{x}$", "$\\dfrac{1}{3x}$", "$3\\ln x$"], "Chain rule: $\\dfrac{1}{3x} \\cdot 3 = \\dfrac{1}{x}$."],
 ["Hva kjennetegner et vendepunkt?", ["$f''$ skifter fortegn", "$f'$ skifter fortegn", "$f = 0$", "$f'$ er størst"], "I et vendepunkt skifter grafen krumning, altså skifter $f''$ fortegn.",
  "What characterises an inflection point?", ["$f''$ changes sign", "$f'$ changes sign", "$f = 0$", "$f'$ is largest"], "At an inflection point the graph changes curvature, so $f''$ changes sign."]
]);
GEN("VGR1", 1,
 () => { const a = R.p([2, 3, -1, 4]), b = R.i(-3, 3), n = R.p([2, 3, 4]), x0 = R.i(-2, 2); const d = n * Math.pow(a * x0 + b, n - 1) * a;
   return [T(`$f(x) = (${pl([[a, "x"], [b, ""]])})^{${n}}$. Finn $f'(${x0})$.`, `$f(x) = (${pl([[a, "x"], [b, ""]])})^{${n}}$. Find $f'(${x0})$.`), { n: d, tol: 0.001, u: "" },
     T(`Kjerneregelen: $f'(x) = ${n}(${pl([[a, "x"], [b, ""]])})^{${n - 1}} \\cdot ${a}$, så $f'(${x0}) = ${d}$.`, `Chain rule: $f'(x) = ${n}(${pl([[a, "x"], [b, ""]])})^{${n - 1}} \\cdot ${a}$, so $f'(${x0}) = ${d}$.`)]; },
 () => { const k = R.p([2, 3, -1, 0.5]), x0 = R.p([0, 1, -1, 0.5]); const d = k * Math.exp(k * x0);
   return [T(`$f(x) = e^{${mf(k, 1)}x}$. Finn $f'(${mf(x0, 1)})$.`, `$f(x) = e^{${mf(k, 1)}x}$. Find $f'(${mf(x0, 1)})$.`), { n: d, tol: rel(d, 0.005), u: "" },
     T(`$f'(x) = ${mf(k, 1)}e^{${mf(k, 1)}x}$, så $f'(${mf(x0, 1)}) = ${mf(k, 1)}e^{${mf(k * x0, 2)}} \\approx ${mf(d, 3)}$.`, `$f'(x) = ${mf(k, 1)}e^{${mf(k, 1)}x}$, so $f'(${mf(x0, 1)}) = ${mf(k, 1)}e^{${mf(k * x0, 2)}} \\approx ${mf(d, 3)}$.`)]; }
);

// ================= VGR1 2: Vektorer i planet =================
THEORY("VGR1", 2, {
nb: `## Hva handler det om?
En vektor har både lengde og retning. I planet skrives den med koordinater $[x, y]$.

## Begreper og formler
- Vektor fra $A(x_1, y_1)$ til $B(x_2, y_2)$: $\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1]$.
- Lengde: $|[x, y]| = \\sqrt{x^2 + y^2}$.
- Skalarprodukt: $\\vec u \\cdot \\vec v = x_1x_2 + y_1y_2 = |\\vec u||\\vec v|\\cos v$.
- $\\vec u \\perp \\vec v \\iff \\vec u \\cdot \\vec v = 0$. Parallelle vektorer: $\\vec u = t\\vec v$.

> Skalarprodukt 0 betyr at vektorene står vinkelrett på hverandre.`,
en: `## What is it about?
A vector has both length and direction. In the plane it is written with coordinates $[x, y]$.

## Concepts and formulas
- Vector from $A(x_1, y_1)$ to $B(x_2, y_2)$: $\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1]$.
- Length: $|[x, y]| = \\sqrt{x^2 + y^2}$.
- Dot product: $\\vec u \\cdot \\vec v = x_1x_2 + y_1y_2 = |\\vec u||\\vec v|\\cos v$.
- $\\vec u \\perp \\vec v \\iff \\vec u \\cdot \\vec v = 0$. Parallel vectors: $\\vec u = t\\vec v$.

> A dot product of 0 means the vectors are perpendicular.`
});
BIQ("VGR1", 2, [
 ["Hva er lengden av $[3, 4]$?", { n: 5, tol: 0, u: "" }, "$\\sqrt{9 + 16} = 5$.", "What is the length of $[3, 4]$?", null, "$\\sqrt{9 + 16} = 5$."],
 ["Når står to vektorer vinkelrett på hverandre?", ["Når skalarproduktet er 0", "Når de er like lange", "Når skalarproduktet er 1", "Når de har samme retning"], "$\\vec u \\cdot \\vec v = |\\vec u||\\vec v|\\cos 90^\\circ = 0$.",
  "When are two vectors perpendicular?", ["When the dot product is 0", "When they have the same length", "When the dot product is 1", "When they point the same way"], "$\\vec u \\cdot \\vec v = |\\vec u||\\vec v|\\cos 90^\\circ = 0$."]
]);
GEN("VGR1", 2,
 () => { const [a, b, c, d] = [R.i(-6, 6), R.i(-6, 6), R.i(-6, 6), R.i(-6, 6)]; const s = a * c + b * d;
   return [T(`Regn ut $[${a}, ${b}] \\cdot [${c}, ${d}]$.`, `Calculate $[${a}, ${b}] \\cdot [${c}, ${d}]$.`), { n: s, tol: 0, u: "" }, T(`$${a} \\cdot ${c} + ${b} \\cdot ${d} = ${s}$.`, `$${a} \\cdot ${c} + ${b} \\cdot ${d} = ${s}$.`)]; },
 () => { const x1 = R.i(-5, 5), y1 = R.i(-5, 5), x2 = R.i(-5, 5), y2 = R.i(-5, 5); const L = Math.hypot(x2 - x1, y2 - y1);
   return [T(`Finn avstanden fra $A(${x1}, ${y1})$ til $B(${x2}, ${y2})$.`, `Find the distance from $A(${x1}, ${y1})$ to $B(${x2}, ${y2})$.`), { n: L, tol: 0.01, u: "" },
     T(`$\\overrightarrow{AB} = [${x2 - x1}, ${y2 - y1}]$ og $|\\overrightarrow{AB}| = \\sqrt{${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}} \\approx ${mf(L, 3)}$.`, `$\\overrightarrow{AB} = [${x2 - x1}, ${y2 - y1}]$ and $|\\overrightarrow{AB}| = \\sqrt{${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}} \\approx ${mf(L, 3)}$.`)]; }
);

// ================= VGR1 3: Sannsynlighet og kombinatorikk =================
THEORY("VGR1", 3, {
nb: `## Hva handler det om?
Kombinatorikk teller hvor mange muligheter det finnes. Sannsynlighet er gunstige utfall delt på mulige utfall, når alle er like sannsynlige.

## Begreper og formler
- Ordnet uten tilbakelegging: $n \\cdot (n-1) \\cdots (n-k+1)$. Uordnet: $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$.
- Betinget sannsynlighet: $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$. Uavhengige hendelser: $P(A \\cap B) = P(A)P(B)$.
- Bayes' setning: $P(A \\mid B) = \\dfrac{P(B \\mid A) P(A)}{P(B)}$.
- Binomisk fordeling: $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.

> Rekkefølgen viktig? Ordnet. Ikke viktig? Bruk $\\binom{n}{k}$.`,
en: `## What is it about?
Combinatorics counts how many possibilities there are. Probability is favourable outcomes divided by possible outcomes, when all are equally likely.

## Concepts and formulas
- Ordered without replacement: $n \\cdot (n-1) \\cdots (n-k+1)$. Unordered: $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$.
- Conditional probability: $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$. Independent events: $P(A \\cap B) = P(A)P(B)$.
- Bayes' theorem: $P(A \\mid B) = \\dfrac{P(B \\mid A) P(A)}{P(B)}$.
- Binomial distribution: $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.

> Does order matter? Ordered. If not, use $\\binom{n}{k}$.`
});
BIQ("VGR1", 3, [
 ["Hva er $\\binom{5}{2}$?", { n: 10, tol: 0, u: "" }, "$\\dfrac{5 \\cdot 4}{2 \\cdot 1} = 10$.", "What is $\\binom{5}{2}$?", null, "$\\dfrac{5 \\cdot 4}{2 \\cdot 1} = 10$."],
 ["Du kaster to terninger. Hva er sannsynligheten for to seksere?", ["$\\dfrac{1}{36}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{12}$"], "Uavhengige kast: $\\tfrac16 \\cdot \\tfrac16 = \\tfrac{1}{36}$.",
  "You throw two dice. What is the probability of two sixes?", ["$\\dfrac{1}{36}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{12}$"], "Independent throws: $\\tfrac16 \\cdot \\tfrac16 = \\tfrac{1}{36}$."]
]);
const C = (n, k) => { let r = 1; for(let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
GEN("VGR1", 3,
 () => { const n = R.i(5, 12), k = R.i(2, Math.min(5, n - 1)); const c = C(n, k);
   return [T(`På hvor mange måter kan du velge ${k} av ${n} personer til en komité (rekkefølgen er likegyldig)?`, `In how many ways can you choose ${k} of ${n} people for a committee (order does not matter)?`), { n: c, tol: 0, u: "" },
     T(`$\\binom{${n}}{${k}} = ${c}$.`, `$\\binom{${n}}{${k}} = ${c}$.`)]; },
 () => { const n = R.i(4, 10), k = R.i(0, 4), p = R.p([0.1, 0.2, 0.25, 0.3, 0.5]); const P = C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
   return [T(`Sannsynligheten for suksess er ${nf(p, 2)} i hvert av ${n} uavhengige forsøk. Hva er sannsynligheten for nøyaktig ${k} suksesser? (Svar med tre desimaler.)`, `The probability of success is ${nf(p, 2)} in each of ${n} independent trials. What is the probability of exactly ${k} successes? (Answer with three decimals.)`), { n: P, tol: 0.001, u: "" },
     T(`$P(X = ${k}) = \\binom{${n}}{${k}} \\cdot ${mf(p, 2)}^{${k}} \\cdot ${mf(1 - p, 2)}^{${n - k}} \\approx ${mf(P, 3)}$.`, `$P(X = ${k}) = \\binom{${n}}{${k}} \\cdot ${mf(p, 2)}^{${k}} \\cdot ${mf(1 - p, 2)}^{${n - k}} \\approx ${mf(P, 3)}$.`)]; }
);
})();
