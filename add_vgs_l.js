// ============================================================
//  add_vgs_l.js – påfyll runde 2: 1T, R1, R2, S2, Fysikk 2 og Biologi 1 (enhetene med minst stoff).
// ============================================================
(() => {
const UX = (c, t) => { const i = COURSES.find(x => x.code === c).units.findIndex(u => u.title === t); if(i < 0) throw new Error("add_vgs_l: fant ikke " + c + " / " + t); return i; };
const Q = (c, t, list) => BIQ(c, UX(c, t), list);
const G = (c, t, ...f) => GEN(c, UX(c, t), ...f);
const sg = v => v < 0 ? "- " + Math.abs(v) : "+ " + v; // fortegn og tall til formler

// ---------------- 1T ----------------
Q("VG1T", "Funksjoner", [
 ["Hva er nullpunktet til $f(x) = 2x - 8$?", { n: 4, tol: 0, u: "" }, "$2x - 8 = 0$ gir $x = 4$.", "What is the zero of $f(x) = 2x - 8$?", null, "$2x - 8 = 0$ gives $x = 4$."],
 ["Hvor skjærer $f(x) = 3x + 5$ andreaksen?", { n: 5, tol: 0, u: "" }, "Sett $x = 0$: $f(0) = 5$.", "Where does $f(x) = 3x + 5$ cross the $y$-axis?", null, "Set $x = 0$: $f(0) = 5$."],
 ["Hva er definisjonsmengden til $f(x) = \\sqrt{x - 2}$?", ["$x \\ge 2$", "Alle reelle tall", "$x > 0$", "$x \\le 2$"], "Uttrykket under rottegnet kan ikke være negativt.", "What is the domain of $f(x) = \\sqrt{x - 2}$?", ["$x \\ge 2$", "All real numbers", "$x > 0$", "$x \\le 2$"], "The expression under the root cannot be negative."],
 ["En linje går gjennom $(1, 3)$ og $(3, 7)$. Hva er stigningstallet?", { n: 2, tol: 0, u: "" }, "$\\dfrac{7 - 3}{3 - 1} = 2$.", "A line passes through $(1, 3)$ and $(3, 7)$. What is the slope?", null, "$\\dfrac{7 - 3}{3 - 1} = 2$."]
]);
G("VG1T", "Funksjoner",
 () => { const a = R.p([-3, -2, -1, 1, 2, 3, 4]), x1 = R.i(-4, 3), x2 = x1 + R.i(1, 4), b = R.i(-5, 5), y1 = a * x1 + b, y2 = a * x2 + b;
   return [T(`En rett linje går gjennom $(${x1}, ${y1})$ og $(${x2}, ${y2})$. Hva er stigningstallet?`, `A straight line passes through $(${x1}, ${y1})$ and $(${x2}, ${y2})$. What is the slope?`), { n: a, tol: 0, u: "" },
     T(`$a = \\dfrac{${y2} - (${y1})}{${x2} - (${x1})} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${a}$.`, `$a = \\dfrac{${y2} - (${y1})}{${x2} - (${x1})} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${a}$.`)]; }
);
Q("VG1T", "Derivasjon og vekstfart", [
 ["Hva er $f'(x)$ når $f(x) = x^2 + 3x$?", ["$2x + 3$", "$x + 3$", "$2x^2 + 3$", "$2x$"], "Deriver ledd for ledd.", "What is $f'(x)$ when $f(x) = x^2 + 3x$?", ["$2x + 3$", "$x + 3$", "$2x^2 + 3$", "$2x$"], "Differentiate term by term."],
 ["$f(x) = x^2$. Hva er $f'(3)$?", { n: 6, tol: 0, u: "" }, "$f'(x) = 2x$, så $f'(3) = 6$.", "$f(x) = x^2$. What is $f'(3)$?", null, "$f'(x) = 2x$, so $f'(3) = 6$."],
 ["Hva er stigningstallet til tangenten i et toppunkt?", { n: 0, tol: 0, u: "" }, "Tangenten er vannrett: stigningstall 0.", "What is the slope of the tangent at a maximum?", null, "The tangent is horizontal: slope 0."],
 ["Hvis $f'(x) > 0$ på et intervall, er $f$ ...", ["voksende", "avtagende", "konstant", "negativ"], "Positiv derivert betyr at grafen stiger.", "If $f'(x) > 0$ on an interval, $f$ is ...", ["increasing", "decreasing", "constant", "negative"], "A positive derivative means the graph rises."]
]);
G("VG1T", "Derivasjon og vekstfart",
 () => { const a = R.p([1, 2, 3, -1, -2]), b = R.i(-6, 6), c = R.i(-5, 5), x = R.i(-3, 4), d = 2 * a * x + b;
   return [T(`$f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x^2 ${sg(b)}x ${sg(c)}$. Finn $f'(${x})$.`, `$f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x^2 ${sg(b)}x ${sg(c)}$. Find $f'(${x})$.`), { n: d, tol: 0, u: "" },
     T(`$f'(x) = ${2 * a}x ${sg(b)}$, så $f'(${x}) = ${d}$.`, `$f'(x) = ${2 * a}x ${sg(b)}$, so $f'(${x}) = ${d}$.`)]; }
);
Q("VG1T", "Faktorisering og polynomdivisjon", [
 ["Faktoriser $x^2 - 9$.", ["$(x - 3)(x + 3)$", "$(x - 3)^2$", "$(x - 9)(x + 1)$", "$x(x - 9)$"], "Konjugatsetningen: $a^2 - b^2 = (a - b)(a + b)$.", "Factorise $x^2 - 9$.", ["$(x - 3)(x + 3)$", "$(x - 3)^2$", "$(x - 9)(x + 1)$", "$x(x - 9)$"], "Difference of squares: $a^2 - b^2 = (a - b)(a + b)$."],
 ["Faktoriser $x^2 + 5x + 6$.", ["$(x + 2)(x + 3)$", "$(x + 1)(x + 6)$", "$(x - 2)(x - 3)$", "$(x + 5)(x + 1)$"], "To tall med produkt 6 og sum 5: 2 og 3.", "Factorise $x^2 + 5x + 6$.", ["$(x + 2)(x + 3)$", "$(x + 1)(x + 6)$", "$(x - 2)(x - 3)$", "$(x + 5)(x + 1)$"], "Two numbers with product 6 and sum 5: 2 and 3."],
 ["$P(x) = x^3 - 2x^2 - x + 2$ og $P(1) = 0$. Hvilken faktor har $P$?", ["$x - 1$", "$x + 1$", "$x - 2$ bare", "$x$"], "Nullpunktet $x = 1$ gir faktoren $x - 1$.", "$P(x) = x^3 - 2x^2 - x + 2$ and $P(1) = 0$. Which factor does $P$ have?", ["$x - 1$", "$x + 1$", "$x - 2$ only", "$x$"], "The zero $x = 1$ gives the factor $x - 1$."],
 ["Forkort $\\dfrac{x^2 - 4}{x - 2}$.", ["$x + 2$", "$x - 2$", "$x^2 - 2$", "$2$"], "$\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$ (for $x \\ne 2$).", "Simplify $\\dfrac{x^2 - 4}{x - 2}$.", ["$x + 2$", "$x - 2$", "$x^2 - 2$", "$2$"], "$\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$ (for $x \\ne 2$)."]
]);
Q("VG1T", "Eksponentielle modeller", [
 ["En verdi øker med 5 % per år. Hva er vekstfaktoren?", { n: 1.05, tol: 0.0001, u: "" }, "$1 + 0{,}05 = 1{,}05$.", "A value grows by 5 % per year. What is the growth factor?", null, "$1 + 0.05 = 1.05$."],
 ["En bil taper 15 % av verdien hvert år. Hva er vekstfaktoren?", { n: 0.85, tol: 0.0001, u: "" }, "$1 - 0{,}15 = 0{,}85$.", "A car loses 15 % of its value each year. What is the growth factor?", null, "$1 - 0.15 = 0.85$."],
 ["$N(t) = 200 \\cdot 2^t$. Hvor mange er det etter 3 timer?", { n: 1600, tol: 0, u: "" }, "$200 \\cdot 8 = 1600$.", "$N(t) = 200 \\cdot 2^t$. How many are there after 3 hours?", null, "$200 \\cdot 8 = 1600$."],
 ["Hva er halveringstid?", ["Tiden det tar før mengden er halvert", "Halvparten av levetiden", "Tiden til mengden er null", "Tiden til mengden er dobbel"], "Brukes for eksempel om radioaktive stoffer og legemidler.", "What is half-life?", ["The time it takes for the amount to halve", "Half of the lifetime", "The time until the amount is zero", "The time until the amount doubles"], "Used for example for radioactive substances and medicines."]
]);
G("VG1T", "Eksponentielle modeller",
 () => { const k = R.p([10000, 20000, 50000, 100000]), p = R.p([2, 3, 5, 8, 10, -10, -15, -20]), n = R.i(2, 8), v = k * (1 + p / 100) ** n;
   return [T(`En verdi er ${nf(k, 0)} kr og ${p > 0 ? "øker" : "synker"} med ${Math.abs(p)} % per år. Hva er verdien etter ${n} år?`, `A value is ${nf(k, 0)} NOK and ${p > 0 ? "grows" : "falls"} by ${Math.abs(p)} % per year. What is the value after ${n} years?`), { n: v, tol: 1, u: "kr" },
     T(`$${k} \\cdot ${mf(1 + p / 100, 2)}^{${n}} = ${mf(v, 0)}$ kr.`, `$${k} \\cdot ${mf(1 + p / 100, 2)}^{${n}} = ${mf(v, 0)}$ NOK.`)]; }
);
Q("VG1T", "Trigonometri", [
 ["En rettvinklet trekant har hypotenus 10 og en vinkel på $30^\\circ$. Hvor lang er motstående katet?", { n: 5, tol: 0, u: "" }, "$10 \\cdot \\sin 30^\\circ = 5$.", "A right triangle has hypotenuse 10 and an angle of $30^\\circ$. How long is the opposite side?", null, "$10 \\cdot \\sin 30^\\circ = 5$."],
 ["Hva er $\\tan v$ i en rettvinklet trekant?", ["$\\dfrac{\\text{motstående}}{\\text{hosliggende}}$", "$\\dfrac{\\text{hosliggende}}{\\text{hypotenus}}$", "$\\dfrac{\\text{motstående}}{\\text{hypotenus}}$", "$\\dfrac{\\text{hypotenus}}{\\text{motstående}}$"], "Tangens = motstående delt på hosliggende.", "What is $\\tan v$ in a right triangle?", ["$\\dfrac{\\text{opposite}}{\\text{adjacent}}$", "$\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$", "$\\dfrac{\\text{opposite}}{\\text{hypotenuse}}$", "$\\dfrac{\\text{hypotenuse}}{\\text{opposite}}$"], "Tangent = opposite over adjacent."],
 ["To sider er 6 og 8 med $90^\\circ$ mellom. Hva er arealet?", { n: 24, tol: 0, u: "" }, "$\\tfrac{1}{2} \\cdot 6 \\cdot 8 \\cdot \\sin 90^\\circ = 24$.", "Two sides are 6 and 8 with $90^\\circ$ between them. What is the area?", null, "$\\tfrac{1}{2} \\cdot 6 \\cdot 8 \\cdot \\sin 90^\\circ = 24$."],
 ["Når bruker du sinussetningen?", ["Når du kjenner en side og vinkelen rett overfor", "Bare i rettvinklede trekanter", "Når du kjenner tre sider", "Aldri i praksis"], "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$.", "When do you use the sine rule?", ["When you know a side and the angle opposite it", "Only in right triangles", "When you know three sides", "Never in practice"], "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$."]
]);

// ---------------- R1 ----------------
Q("VGR1", "Grenseverdier og kontinuitet", [
 ["$\\lim_{x \\to 2} (3x + 1) = ?$", { n: 7, tol: 0, u: "" }, "Sett inn: $3 \\cdot 2 + 1 = 7$.", "$\\lim_{x \\to 2} (3x + 1) = ?$", null, "Substitute: $3 \\cdot 2 + 1 = 7$."],
 ["$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3} = ?$", { n: 6, tol: 0, u: "" }, "$\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\to 6$.", "$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3} = ?$", null, "$\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\to 6$."],
 ["$\\lim_{x \\to \\infty} \\dfrac{1}{x} = ?$", { n: 0, tol: 0, u: "" }, "Brøken blir mindre og mindre: grensen er 0.", "$\\lim_{x \\to \\infty} \\dfrac{1}{x} = ?$", null, "The fraction gets smaller and smaller: the limit is 0."],
 ["Når er $f$ kontinuerlig i $x = a$?", ["Når $\\lim_{x \\to a} f(x) = f(a)$", "Når $f(a) = 0$", "Når $f'(a) = 0$", "Når $f$ er et polynom av grad 1"], "Grafen har ikke brudd der.", "When is $f$ continuous at $x = a$?", ["When $\\lim_{x \\to a} f(x) = f(a)$", "When $f(a) = 0$", "When $f'(a) = 0$", "When $f$ is a first-degree polynomial"], "The graph has no break there."]
]);
G("VGR1", "Grenseverdier og kontinuitet",
 () => { const a = R.i(-5, 6), b = R.i(-5, 6);
   return [T(`Finn $\\lim_{x \\to ${a}} \\dfrac{(x ${sg(-a)})(x ${sg(b)})}{x ${sg(-a)}}$.`, `Find $\\lim_{x \\to ${a}} \\dfrac{(x ${sg(-a)})(x ${sg(b)})}{x ${sg(-a)}}$.`), { n: a + b, tol: 0, u: "" },
     T(`Forkort: $x ${sg(b)} \\to ${a} ${sg(b)} = ${a + b}$.`, `Cancel: $x ${sg(b)} \\to ${a} ${sg(b)} = ${a + b}$.`)]; }
);
Q("VGR1", "Derivasjonsregler i praksis", [
 ["Deriver $f(x) = (2x + 1)^3$.", ["$6(2x + 1)^2$", "$3(2x + 1)^2$", "$6x^2$", "$(2x + 1)^2$"], "Kjerneregelen: $3(2x + 1)^2 \\cdot 2$.", "Differentiate $f(x) = (2x + 1)^3$.", ["$6(2x + 1)^2$", "$3(2x + 1)^2$", "$6x^2$", "$(2x + 1)^2$"], "Chain rule: $3(2x + 1)^2 \\cdot 2$."],
 ["Deriver $f(x) = x\\ln x$.", ["$\\ln x + 1$", "$\\dfrac{1}{x}$", "$\\ln x$", "$x + \\ln x$"], "Produktregelen: $1 \\cdot \\ln x + x \\cdot \\dfrac{1}{x}$.", "Differentiate $f(x) = x\\ln x$.", ["$\\ln x + 1$", "$\\dfrac{1}{x}$", "$\\ln x$", "$x + \\ln x$"], "Product rule: $1 \\cdot \\ln x + x \\cdot \\dfrac{1}{x}$."],
 ["Deriver $f(x) = e^{3x}$.", ["$3e^{3x}$", "$e^{3x}$", "$3xe^{3x - 1}$", "$\\dfrac{e^{3x}}{3}$"], "Kjerneregelen med $u = 3x$.", "Differentiate $f(x) = e^{3x}$.", ["$3e^{3x}$", "$e^{3x}$", "$3xe^{3x - 1}$", "$\\dfrac{e^{3x}}{3}$"], "Chain rule with $u = 3x$."],
 ["$f(x) = \\ln(x^2 + 1)$. Hva er $f'(1)$?", { n: 1, tol: 0, u: "" }, "$f'(x) = \\dfrac{2x}{x^2 + 1}$, så $f'(1) = \\dfrac{2}{2} = 1$.", "$f(x) = \\ln(x^2 + 1)$. What is $f'(1)$?", null, "$f'(x) = \\dfrac{2x}{x^2 + 1}$, so $f'(1) = \\dfrac{2}{2} = 1$."]
]);
Q("VGR1", "Derivasjon og drøfting", [
 ["Hva forteller $f''(x) > 0$?", ["Grafen krummer oppover (konveks)", "Grafen stiger", "Grafen har et toppunkt", "Grafen er null"], "Stigningstallet øker.", "What does $f''(x) > 0$ tell you?", ["The graph curves upwards (convex)", "The graph rises", "The graph has a maximum", "The graph is zero"], "The slope is increasing."],
 ["Hva er et vendepunkt?", ["Der grafen skifter krumning", "Der grafen skifter fortegn", "Der $f(x) = 0$", "Det høyeste punktet"], "$f''$ skifter fortegn der.", "What is an inflection point?", ["Where the graph changes curvature", "Where the graph changes sign", "Where $f(x) = 0$", "The highest point"], "$f''$ changes sign there."],
 ["$f(x) = x^3 - 6x^2$. Hvor er vendepunktet?", { n: 2, tol: 0, u: "" }, "$f''(x) = 6x - 12 = 0$ gir $x = 2$.", "$f(x) = x^3 - 6x^2$. Where is the inflection point?", null, "$f''(x) = 6x - 12 = 0$ gives $x = 2$."],
 ["$f(x) = x^2 - 4x + 1$. Hva er $x$-verdien til bunnpunktet?", { n: 2, tol: 0, u: "" }, "$f'(x) = 2x - 4 = 0$ gir $x = 2$.", "$f(x) = x^2 - 4x + 1$. What is the $x$-value of the minimum?", null, "$f'(x) = 2x - 4 = 0$ gives $x = 2$."]
]);

// ---------------- R2 ----------------
Q("VGR2", "Differensiallikninger", [
 ["Løs $y' = 3y$ med $y(0) = 2$.", ["$y = 2e^{3x}$", "$y = 3e^{2x}$", "$y = 2 + 3x$", "$y = e^{3x} + 2$"], "Løsningen av $y' = ky$ er $y = Ce^{kx}$.", "Solve $y' = 3y$ with $y(0) = 2$.", ["$y = 2e^{3x}$", "$y = 3e^{2x}$", "$y = 2 + 3x$", "$y = e^{3x} + 2$"], "The solution of $y' = ky$ is $y = Ce^{kx}$."],
 ["Hva er en separabel differensiallikning?", ["En som kan skrives $g(y)\\,y' = h(x)$", "En uten $y$", "En av andre orden", "En med konstante koeffisienter"], "Da kan $x$ og $y$ samles på hver sin side.", "What is a separable differential equation?", ["One that can be written $g(y)\\,y' = h(x)$", "One without $y$", "A second-order one", "One with constant coefficients"], "Then $x$ and $y$ can be gathered on separate sides."],
 ["$y' = 0{,}1y$, $y(0) = 100$. Hva er $y(10)$ (en desimal)?", { n: 271.8, tol: 0.1, u: "" }, "$100e^{0{,}1 \\cdot 10} = 100e = 271{,}8$.", "$y' = 0.1y$, $y(0) = 100$. What is $y(10)$ (one decimal)?", null, "$100e^{0.1 \\cdot 10} = 100e = 271.8$."],
 ["Hvilken modell beskriver begrenset vekst?", ["Logistisk vekst", "Lineær vekst", "Eksponentiell vekst", "Konstant"], "Veksten flater ut mot bæreevnen.", "Which model describes limited growth?", ["Logistic growth", "Linear growth", "Exponential growth", "Constant"], "Growth levels off towards the carrying capacity."]
]);
G("VGR2", "Differensiallikninger",
 () => { const k = R.p([0.1, 0.2, 0.3, 0.5, -0.1, -0.2]), C = R.p([10, 50, 100, 200]), x = R.p([1, 2, 3, 5]), y = C * Math.exp(k * x);
   return [T(`$y' = ${mf(k)}y$ og $y(0) = ${C}$. Finn $y(${x})$.`, `$y' = ${mf(k)}y$ and $y(0) = ${C}$. Find $y(${x})$.`), { n: y, tol: Math.max(0.01, y * 0.002), u: "" },
     T(`$y = ${C}e^{${mf(k)}x}$, så $y(${x}) = ${C}e^{${mf(k * x)}} = ${mf(y, 2)}$.`, `$y = ${C}e^{${mf(k)}x}$, so $y(${x}) = ${C}e^{${mf(k * x)}} = ${mf(y, 2)}$.`)]; }
);
Q("VGR2", "Trigonometriske funksjoner", [
 ["Hva er perioden til $f(x) = \\sin(2x)$?", ["$\\pi$", "$2\\pi$", "$4\\pi$", "$\\dfrac{\\pi}{2}$"], "$p = \\dfrac{2\\pi}{2} = \\pi$.", "What is the period of $f(x) = \\sin(2x)$?", ["$\\pi$", "$2\\pi$", "$4\\pi$", "$\\dfrac{\\pi}{2}$"], "$p = \\dfrac{2\\pi}{2} = \\pi$."],
 ["Hva er amplituden til $f(x) = 3\\sin x + 1$?", { n: 3, tol: 0, u: "" }, "Tallet foran sinus: 3.", "What is the amplitude of $f(x) = 3\\sin x + 1$?", null, "The number in front of sine: 3."],
 ["Hva er likevektslinjen til $f(x) = 2\\cos x - 4$?", { n: -4, tol: 0, u: "" }, "$y = -4$.", "What is the midline of $f(x) = 2\\cos x - 4$?", null, "$y = -4$."],
 ["$\\sin^2 x + \\cos^2 x = ?$", { n: 1, tol: 0, u: "" }, "Enhetssirkelen gir 1 (Pytagoras).", "$\\sin^2 x + \\cos^2 x = ?$", null, "The unit circle gives 1 (Pythagoras)."]
]);
Q("VGR2", "Integrasjonsmetoder", [
 ["Hvilken metode passer for $\\int x e^x\\,dx$?", ["Delvis integrasjon", "Variabelskifte", "Delbrøkoppspalting", "Ingen metode"], "$u = x$, $v' = e^x$.", "Which method suits $\\int x e^x\\,dx$?", ["Integration by parts", "Substitution", "Partial fractions", "No method"], "$u = x$, $v' = e^x$."],
 ["$\\int 2x(x^2 + 1)^3\\,dx = ?$", ["$\\dfrac{(x^2 + 1)^4}{4} + C$", "$(x^2 + 1)^4 + C$", "$\\dfrac{x^2 (x^2 + 1)^4}{4} + C$", "$6x(x^2 + 1)^2 + C$"], "Variabelskifte $u = x^2 + 1$, $du = 2x\\,dx$.", "$\\int 2x(x^2 + 1)^3\\,dx = ?$", ["$\\dfrac{(x^2 + 1)^4}{4} + C$", "$(x^2 + 1)^4 + C$", "$\\dfrac{x^2 (x^2 + 1)^4}{4} + C$", "$6x(x^2 + 1)^2 + C$"], "Substitution $u = x^2 + 1$, $du = 2x\\,dx$."],
 ["$\\int x e^x\\,dx = ?$", ["$(x - 1)e^x + C$", "$xe^x + C$", "$\\dfrac{x^2}{2}e^x + C$", "$(x + 1)e^x + C$"], "$xe^x - \\int e^x\\,dx = xe^x - e^x + C$.", "$\\int x e^x\\,dx = ?$", ["$(x - 1)e^x + C$", "$xe^x + C$", "$\\dfrac{x^2}{2}e^x + C$", "$(x + 1)e^x + C$"], "$xe^x - \\int e^x\\,dx = xe^x - e^x + C$."],
 ["Hvilken metode passer for $\\int \\dfrac{1}{(x - 1)(x + 2)}\\,dx$?", ["Delbrøkoppspalting", "Delvis integrasjon", "Ingen, den kan ikke løses", "Trigonometrisk identitet"], "Skriv brøken som $\\dfrac{A}{x - 1} + \\dfrac{B}{x + 2}$.", "Which method suits $\\int \\dfrac{1}{(x - 1)(x + 2)}\\,dx$?", ["Partial fractions", "Integration by parts", "None, it cannot be solved", "A trigonometric identity"], "Write the fraction as $\\dfrac{A}{x - 1} + \\dfrac{B}{x + 2}$."]
]);
Q("VGR2", "Integrasjon", [
 ["$\\int_0^2 3x^2\\,dx = ?$", { n: 8, tol: 0, u: "" }, "$[x^3]_0^2 = 8$.", "$\\int_0^2 3x^2\\,dx = ?$", null, "$[x^3]_0^2 = 8$."],
 ["$\\int e^{2x}\\,dx = ?$", ["$\\dfrac{1}{2}e^{2x} + C$", "$2e^{2x} + C$", "$e^{2x} + C$", "$\\dfrac{e^{2x + 1}}{2x + 1} + C$"], "Deriver svaret for å sjekke.", "$\\int e^{2x}\\,dx = ?$", ["$\\dfrac{1}{2}e^{2x} + C$", "$2e^{2x} + C$", "$e^{2x} + C$", "$\\dfrac{e^{2x + 1}}{2x + 1} + C$"], "Differentiate the answer to check."],
 ["$\\int_1^e \\dfrac{1}{x}\\,dx = ?$", { n: 1, tol: 0, u: "" }, "$\\ln e - \\ln 1 = 1$.", "$\\int_1^e \\dfrac{1}{x}\\,dx = ?$", null, "$\\ln e - \\ln 1 = 1$."],
 ["Hva betyr det at integralet er negativt?", ["Mer areal ligger under $x$-aksen enn over", "Du har regnet feil", "Funksjonen er avtagende", "Arealet er null"], "Areal under aksen teller negativt.", "What does it mean that the integral is negative?", ["More area lies below the $x$-axis than above", "You have made a mistake", "The function is decreasing", "The area is zero"], "Area below the axis counts negatively."]
]);

// ---------------- S2 ----------------
Q("VGS2", "Sannsynlighetsfordelinger", [
 ["$X$ er normalfordelt med $\\mu = 100$ og $\\sigma = 15$. Omtrent hvor stor andel ligger mellom 85 og 115?", ["68 %", "95 %", "50 %", "99,7 %"], "Innenfor ett standardavvik: omtrent 68 %.", "$X$ is normally distributed with $\\mu = 100$ and $\\sigma = 15$. Roughly what share lies between 85 and 115?", ["68%", "95%", "50%", "99.7%"], "Within one standard deviation: about 68 %."],
 ["Hva er forventningen $E(X)$ når $X$ er binomisk med $n = 20$ og $p = 0{,}3$?", { n: 6, tol: 0, u: "" }, "$np = 20 \\cdot 0{,}3 = 6$.", "What is the expectation $E(X)$ when $X$ is binomial with $n = 20$ and $p = 0.3$?", null, "$np = 20 \\cdot 0.3 = 6$."],
 ["Hva er variansen i en binomisk fordeling?", ["$np(1 - p)$", "$np$", "$\\sqrt{np}$", "$p(1 - p)$"], "Standardavviket er kvadratroten av dette.", "What is the variance of a binomial distribution?", ["$np(1 - p)$", "$np$", "$\\sqrt{np}$", "$p(1 - p)$"], "The standard deviation is the square root of this."],
 ["Omtrent hvor stor andel av en normalfordeling ligger innenfor to standardavvik?", ["95 %", "68 %", "80 %", "100 %"], "Tommelfingerregelen 68–95–99,7.", "Roughly what share of a normal distribution lies within two standard deviations?", ["95%", "68%", "80%", "100%"], "The 68–95–99.7 rule of thumb."]
]);
G("VGS2", "Sannsynlighetsfordelinger",
 () => { const n = R.p([10, 20, 25, 40, 50, 100]), p = R.p([0.1, 0.2, 0.25, 0.4, 0.5]), e = n * p, sd = Math.sqrt(n * p * (1 - p));
   return [T(`$X$ er binomisk fordelt med $n = ${n}$ og $p = ${mf(p)}$. Hva er standardavviket?`, `$X$ is binomial with $n = ${n}$ and $p = ${mf(p)}$. What is the standard deviation?`), { n: sd, tol: 0.01, u: "" },
     T(`$\\sigma = \\sqrt{np(1 - p)} = \\sqrt{${n} \\cdot ${mf(p)} \\cdot ${mf(1 - p)}} = ${mf(sd, 3)}$ (og $E(X) = ${mf(e)}$).`, `$\\sigma = \\sqrt{np(1 - p)} = \\sqrt{${n} \\cdot ${mf(p)} \\cdot ${mf(1 - p)}} = ${mf(sd, 3)}$ (and $E(X) = ${mf(e)}$).`)]; }
);

// ---------------- Fysikk 2 ----------------
Q("VGFY2", "Kast og bevegelse i to dimensjoner", [
 ["En ball kastes horisontalt. Hva er akselerasjonen i $x$-retning (uten luftmotstand)?", { n: 0, tol: 0, u: "m/s²" }, "Ingen krefter virker horisontalt, så $a_x = 0$ m/s².", "A ball is thrown horizontally. What is the acceleration in the $x$-direction (no air resistance)?", null, "No forces act horizontally, so $a_x = 0$ m/s²."],
 ["Hvilken utskytingsvinkel gir lengst kast på flat mark (uten luftmotstand)?", { n: 45, tol: 0, u: "°" }, "$\\sin(2 \\cdot 45^\\circ) = 1$ er størst.", "Which launch angle gives the longest throw on flat ground (no air resistance)?", null, "$\\sin(2 \\cdot 45^\\circ) = 1$ is the largest."],
 ["Hva er farten i toppunktet av et skrått kast?", ["Bare den horisontale komponenten", "Null", "Startfarten", "Bare den vertikale komponenten"], "$v_y = 0$ på toppen, men $v_x$ er uendret.", "What is the velocity at the top of an oblique throw?", ["Only the horizontal component", "Zero", "The initial speed", "Only the vertical component"], "$v_y = 0$ at the top, but $v_x$ is unchanged."],
 ["En stein slippes fra 20 m høyde. Omtrent hvor lang tid tar fallet ($g = 9{,}81$)?", { n: 2.02, tol: 0.01, u: "s" }, "$t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{40}{9{,}81}} = 2{,}02$ s.", "A stone is dropped from a height of 20 m. Roughly how long does the fall take ($g = 9.81$)?", null, "$t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{40}{9.81}} = 2.02$ s."]
]);
G("VGFY2", "Kast og bevegelse i to dimensjoner",
 () => { const h = R.p([1.25, 5, 10, 20, 45]), v = R.p([2, 5, 8, 10, 15]), t = Math.sqrt(2 * h / 9.81), x = v * t;
   return [T(`En ball trilles horisontalt av et bord med fart ${v} m/s. Bordet er ${nf(h)} m høyt. Hvor langt fra bordkanten treffer ballen gulvet?`, `A ball rolls horizontally off a table at ${v} m/s. The table is ${nf(h)} m high. How far from the edge does the ball hit the floor?`), { n: x, tol: 0.02, u: "m" },
     T(`$t = \\sqrt{\\dfrac{2 \\cdot ${mf(h)}}{9{,}81}} = ${mf(t, 3)}$ s, og $x = ${v} \\cdot ${mf(t, 3)} = ${mf(x, 2)}$ m.`, `$t = \\sqrt{\\dfrac{2 \\cdot ${mf(h)}}{9.81}} = ${mf(t, 3)}$ s, and $x = ${v} \\cdot ${mf(t, 3)} = ${mf(x, 2)}$ m.`)]; }
);
Q("VGFY2", "Sirkelbevegelse og gravitasjon", [
 ["Formel for sentripetalakselerasjon?", ["$a = \\dfrac{v^2}{r}$", "$a = vr$", "$a = \\dfrac{v}{r^2}$", "$a = \\dfrac{r}{v^2}$"], "Rettet inn mot sentrum.", "Formula for centripetal acceleration?", ["$a = \\dfrac{v^2}{r}$", "$a = vr$", "$a = \\dfrac{v}{r^2}$", "$a = \\dfrac{r}{v^2}$"], "Directed towards the centre."],
 ["En bil kjører i 20 m/s i en sving med radius 100 m. Hva er sentripetalakselerasjonen?", { n: 4, tol: 0, u: "m/s²" }, "$\\dfrac{20^2}{100} = 4$ m/s².", "A car drives at 20 m/s round a bend of radius 100 m. What is the centripetal acceleration?", null, "$\\dfrac{20^2}{100} = 4$ m/s²."],
 ["Hva skjer med gravitasjonskraften når avstanden dobles?", ["Den blir en fjerdedel", "Den halveres", "Den dobles", "Den er uendret"], "$F \\propto \\dfrac{1}{r^2}$.", "What happens to the gravitational force when the distance doubles?", ["It becomes a quarter", "It halves", "It doubles", "It is unchanged"], "$F \\propto \\dfrac{1}{r^2}$."],
 ["Hvorfor er astronauter i ISS vektløse?", ["De er i fritt fall rundt jorda sammen med stasjonen", "Det er ingen tyngdekraft der", "Stasjonen har skjold", "De er for langt unna jorda"], "Tyngdekraften er omtrent 90 % av den på bakken.", "Why are astronauts on the ISS weightless?", ["They are in free fall around the Earth together with the station", "There is no gravity there", "The station has shielding", "They are too far from Earth"], "Gravity there is about 90 % of that on the ground."]
]);
Q("VGFY2", "Elektromagnetisme", [
 ["Hva er kraften på en ladning $q$ som beveger seg med fart $v$ vinkelrett på et magnetfelt $B$?", ["$F = qvB$", "$F = qB$", "$F = \\dfrac{qv}{B}$", "$F = qE$"], "Lorentzkraften (magnetisk del).", "What is the force on a charge $q$ moving at speed $v$ perpendicular to a magnetic field $B$?", ["$F = qvB$", "$F = qB$", "$F = \\dfrac{qv}{B}$", "$F = qE$"], "The Lorentz force (magnetic part)."],
 ["Hva sier Faradays induksjonslov?", ["En endring i magnetisk fluks induserer en spenning", "Strøm lager alltid varme", "Ladninger frastøter hverandre", "Spenning er strøm ganger resistans"], "$\\varepsilon = -\\dfrac{d\\Phi}{dt}$.", "What does Faraday's law of induction say?", ["A change in magnetic flux induces a voltage", "Current always makes heat", "Charges repel each other", "Voltage is current times resistance"], "$\\varepsilon = -\\dfrac{d\\Phi}{dt}$."],
 ["En leder på 0,5 m fører 4 A vinkelrett på et felt på 0,2 T. Hvor stor er kraften?", { n: 0.4, tol: 0.001, u: "N" }, "$F = BIl = 0{,}2 \\cdot 4 \\cdot 0{,}5 = 0{,}4$ N.", "A 0.5 m conductor carries 4 A perpendicular to a 0.2 T field. How large is the force?", null, "$F = BIl = 0.2 \\cdot 4 \\cdot 0.5 = 0.4$ N."],
 ["Hva sier Lenz' regel?", ["Den induserte strømmen motvirker endringen som skapte den", "Strømmen går alltid med klokka", "Magnetfeltet forsvinner", "Spenningen blir dobbel"], "Derfor minustegnet i Faradays lov.", "What does Lenz's law say?", ["The induced current opposes the change that caused it", "Current always flows clockwise", "The magnetic field disappears", "The voltage doubles"], "Hence the minus sign in Faraday's law."]
]);
Q("VGFY2", "Kvantefysikk og relativitet", [
 ["Energien til et foton er ...", ["$E = hf$", "$E = mc$", "$E = \\tfrac{1}{2}mv^2$", "$E = qU$"], "Plancks konstant ganger frekvensen.", "The energy of a photon is ...", ["$E = hf$", "$E = mc$", "$E = \\tfrac{1}{2}mv^2$", "$E = qU$"], "Planck's constant times the frequency."],
 ["Hva viser den fotoelektriske effekten?", ["At lys kommer i energipakker (fotoner)", "At lys er bare en bølge", "At elektroner ikke har masse", "At lys går saktere i vann"], "Einstein fikk Nobelprisen for forklaringen.", "What does the photoelectric effect show?", ["That light comes in energy packets (photons)", "That light is only a wave", "That electrons have no mass", "That light is slower in water"], "Einstein won the Nobel Prize for the explanation."],
 ["Hva skjer med tiden for en klokke som beveger seg svært fort (sett fra oss)?", ["Den går saktere (tidsdilatasjon)", "Den går fortere", "Den stopper", "Ingenting"], "Spesiell relativitetsteori.", "What happens to time for a clock moving very fast (as seen by us)?", ["It runs slower (time dilation)", "It runs faster", "It stops", "Nothing"], "Special relativity."],
 ["Omtrent hvor mye energi tilsvarer 1 g masse ($c = 3 \\cdot 10^8$ m/s)?", ["$9 \\cdot 10^{13}$ J", "$3 \\cdot 10^{5}$ J", "$9 \\cdot 10^{16}$ J", "$1$ J"], "$E = mc^2 = 0{,}001 \\cdot (3 \\cdot 10^8)^2$.", "Roughly how much energy corresponds to 1 g of mass ($c = 3 \\cdot 10^8$ m/s)?", ["$9 \\cdot 10^{13}$ J", "$3 \\cdot 10^{5}$ J", "$9 \\cdot 10^{16}$ J", "$1$ J"], "$E = mc^2 = 0.001 \\cdot (3 \\cdot 10^8)^2$."]
]);

// ---------------- Biologi 1: generatorer ----------------
const B_PAIR = { A: "T", T: "A", G: "C", C: "G" };
G("VGBI1", "Cellen",
 () => { const s = Array.from({ length: 6 }, () => R.p(["A", "T", "G", "C"])).join(""), m = s.split("").map(x => B_PAIR[x]).join(""), o = [...new Set([s, m.split("").reverse().join(""), s.replace(/T/g, "U"), m.replace(/T/g, "U"), m.slice(1) + m[0]])].filter(x => x !== m);
   if(o.length < 3) return [T("Hvilken base parer med guanin i DNA?", "Which base pairs with guanine in DNA?"), [T("Cytosin", "Cytosine"), T("Adenin", "Adenine"), T("Tymin", "Thymine"), T("Uracil", "Uracil")], T("G parer med C, og A parer med T.", "G pairs with C, and A pairs with T.")];
   return [T(`En DNA-tråd er ${s}. Hva er den komplementære tråden?`, `A DNA strand is ${s}. What is the complementary strand?`), [m, ...o.slice(0, 3)], T(`A ↔ T og G ↔ C gir ${m}.`, `A ↔ T and G ↔ C gives ${m}.`)]; }
);
G("VGBI1", "Økologi",
 () => { const e = R.p([10000, 20000, 50000, 100000]), n = R.i(1, 3), r = e * 0.1 ** n;
   return [T(`Produsentene i et økosystem binder ${nf(e, 0)} kJ. Omtrent hvor mye energi når nivå ${n + 1} (10 %-regelen)?`, `The producers in an ecosystem fix ${nf(e, 0)} kJ. Roughly how much energy reaches level ${n + 1} (the 10 % rule)?`), { n: r, tol: 0.01, u: "kJ" },
     T(`$${e} \\cdot 0{,}1^{${n}} = ${mf(r, 1)}$ kJ.`, `$${e} \\cdot 0.1^{${n}} = ${mf(r, 1)}$ kJ.`)]; }
);
G("VGBI1", "Evolusjon",
 () => { const p = R.p([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]), q = 1 - p, het = 2 * p * q;
   return [T(`Allelfrekvensen for $A$ er ${nf(p, 1)} i en populasjon i Hardy–Weinberg-likevekt. Hvor stor andel er heterozygote ($Aa$)?`, `The allele frequency of $A$ is ${nf(p, 1)} in a population in Hardy–Weinberg equilibrium. What share is heterozygous ($Aa$)?`), { n: het, tol: 0.001, u: "" },
     T(`$2pq = 2 \\cdot ${mf(p)} \\cdot ${mf(q)} = ${mf(het, 2)}$.`, `$2pq = 2 \\cdot ${mf(p)} \\cdot ${mf(q)} = ${mf(het, 2)}$.`)]; }
);
})();
