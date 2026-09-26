// ============================================================
//  add_vgs_j.js – flere oppgaver i de tynneste matte-enhetene: R1 drøfting, R2 (integrasjon, rekker, difflikninger,
//  trigonometriske funksjoner, vektorer i rommet) og S1 (algebra, funksjoner, derivasjon, sannsynlighet)
// ============================================================
(() => {
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
// ---- R1 1: Derivasjon og drøfting ----
BIQ("VGR1", 1, [
 ["$f'(x)$ skifter fortegn fra + til − i $x = 2$. Hva har $f$ der?", ["Et toppunkt", "Et bunnpunkt", "Et vendepunkt", "Et nullpunkt"], "Grafen stiger og så synker: toppunkt.", "$f'(x)$ changes sign from + to − at $x = 2$. What does $f$ have there?", ["A maximum", "A minimum", "An inflection point", "A zero"], "The graph rises and then falls: a maximum."],
 ["Hva forteller $f''(x) > 0$?", ["Grafen krummer opp (smiler)", "Grafen stiger", "Grafen synker", "Grafen har et nullpunkt"], "Den andrederiverte beskriver krumningen.", "What does $f''(x) > 0$ tell you?", ["The graph curves upwards (concave up)", "The graph is increasing", "The graph is decreasing", "The graph has a zero"], "The second derivative describes the curvature."],
 ["$f(x) = x^3 - 3x^2$. Hvor er vendepunktet?", { n: 1, tol: 0, u: "" }, "$f''(x) = 6x - 6 = 0$ gir $x = 1$, og $f''$ skifter fortegn der.", "$f(x) = x^3 - 3x^2$. Where is the inflection point?", null, "$f''(x) = 6x - 6 = 0$ gives $x = 1$, and $f''$ changes sign there."],
 ["$f'(a) = 0$ og $f''(a) < 0$. Hva er $(a, f(a))$?", ["Et toppunkt", "Et bunnpunkt", "Et vendepunkt", "Ingen ting spesielt"], "Vannrett tangent og graf som krummer ned: toppunkt.", "$f'(a) = 0$ and $f''(a) < 0$. What is $(a, f(a))$?", ["A maximum", "A minimum", "An inflection point", "Nothing special"], "Horizontal tangent and a graph curving down: maximum."]
]);
GEN("VGR1", 1,
 () => { const [a, b] = R.distinct(2, -4, 4).sort((x, y) => x - y), c = R.i(-5, 5); // f'(x) = 3(x-a)(x-b)
   const A = -1.5 * (a + b), B = 3 * a * b, f = x => x ** 3 + A * x * x + B * x + c;
   return [T(`$f(x) = x^3 ${A < 0 ? "-" : "+"} ${mf(Math.abs(A))}x^2 ${B < 0 ? "-" : "+"} ${Math.abs(B)}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}$. Hva er $x$-verdien til toppunktet?`, `$f(x) = x^3 ${A < 0 ? "-" : "+"} ${mf(Math.abs(A))}x^2 ${B < 0 ? "-" : "+"} ${Math.abs(B)}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}$. What is the $x$-value of the maximum?`), { n: a, tol: 0, u: "" },
     T(`$f'(x) = 3x^2 ${2 * A < 0 ? "-" : "+"} ${mf(Math.abs(2 * A))}x ${B < 0 ? "-" : "+"} ${Math.abs(B)} = 3(x - (${a}))(x - (${b}))$. $f'$ går fra + til − i $x = ${a}$: toppunkt $(${a}, ${mf(f(a))})$.`, `$f'(x) = 3x^2 ${2 * A < 0 ? "-" : "+"} ${mf(Math.abs(2 * A))}x ${B < 0 ? "-" : "+"} ${Math.abs(B)} = 3(x - (${a}))(x - (${b}))$. $f'$ goes from + to − at $x = ${a}$: maximum $(${a}, ${mf(f(a))})$.`)]; }
);
// ---- R2 0: Integrasjon ----
BIQ("VGR2", 0, [
 ["$\\int 3x^2\\,dx = $", ["$x^3 + C$", "$6x + C$", "$3x^3 + C$", "$x^2 + C$"], "Øk eksponenten med 1 og del på den nye: $3 \\cdot \\dfrac{x^3}{3}$.", "$\\int 3x^2\\,dx = $", ["$x^3 + C$", "$6x + C$", "$3x^3 + C$", "$x^2 + C$"], "Raise the exponent by 1 and divide by the new one: $3 \\cdot \\dfrac{x^3}{3}$."],
 ["$\\int_0^2 x\\,dx = $", { n: 2, tol: 0, u: "" }, "$\\left[\\tfrac{x^2}{2}\\right]_0^2 = 2 - 0 = 2$. (Arealet av en trekant med grunnlinje 2 og høyde 2.)", "$\\int_0^2 x\\,dx = $", null, "$\\left[\\tfrac{x^2}{2}\\right]_0^2 = 2 - 0 = 2$. (The area of a triangle with base 2 and height 2.)"],
 ["Hvorfor skriver vi $+ C$ i ubestemte integraler?", ["Den deriverte av en konstant er 0, så alle konstanter passer", "Det er en tradisjon", "C står for «cirka»", "For å gjøre svaret større"], "$F(x) + C$ har samme deriverte for alle $C$.", "Why do we write $+ C$ in indefinite integrals?", ["The derivative of a constant is 0, so every constant fits", "It is a tradition", "C stands for \"circa\"", "To make the answer larger"], "$F(x) + C$ has the same derivative for every $C$."],
 ["$\\int e^{2x}\\,dx = $", ["$\\tfrac12 e^{2x} + C$", "$2e^{2x} + C$", "$e^{2x} + C$", "$e^{x^2} + C$"], "Del på den indre deriverte 2.", "$\\int e^{2x}\\,dx = $", ["$\\tfrac12 e^{2x} + C$", "$2e^{2x} + C$", "$e^{2x} + C$", "$e^{x^2} + C$"], "Divide by the inner derivative 2."]
]);
GEN("VGR2", 0,
 () => { const a = R.p([1, 2, 3]), b = R.i(-3, 4), lo = R.i(0, 2), hi = lo + R.i(1, 3), F = x => a * x ** 3 / 3 + b * x, v = F(hi) - F(lo);
   return [T(`Regn ut $\\int_{${lo}}^{${hi}} (${pl([[a, "x^2"], [b, ""]])})\\,dx$.`, `Calculate $\\int_{${lo}}^{${hi}} (${pl([[a, "x^2"], [b, ""]])})\\,dx$.`), { n: v, tol: 0.01, u: "" },
     T(`$F(x) = ${a === 1 ? "" : a}\\dfrac{x^3}{3} ${b < 0 ? "-" : "+"} ${Math.abs(b)}x$. $F(${hi}) - F(${lo}) = ${mf(F(hi), 3)} - ${mf(F(lo), 3)} = ${mf(v, 3)}$.`, `$F(x) = ${a === 1 ? "" : a}\\dfrac{x^3}{3} ${b < 0 ? "-" : "+"} ${Math.abs(b)}x$. $F(${hi}) - F(${lo}) = ${mf(F(hi), 3)} - ${mf(F(lo), 3)} = ${mf(v, 3)}$.`)]; }
);
// ---- R2 1: Følger og rekker ----
BIQ("VGR2", 1, [
 ["Hva er det 10. leddet i $3, 7, 11, 15, \\dots$?", { n: 39, tol: 0, u: "" }, "Aritmetisk med $d = 4$: $a_{10} = 3 + 9 \\cdot 4 = 39$.", "What is the 10th term of $3, 7, 11, 15, \\dots$?", null, "Arithmetic with $d = 4$: $a_{10} = 3 + 9 \\cdot 4 = 39$."],
 ["Konvergerer $1 + 2 + 4 + 8 + \\dots$?", ["Nei, $k = 2$ og $|k| > 1$", "Ja, mot 2", "Ja, mot 16", "Ja, mot 1"], "En geometrisk rekke konvergerer bare når $|k| < 1$.", "Does $1 + 2 + 4 + 8 + \\dots$ converge?", ["No, $k = 2$ and $|k| > 1$", "Yes, to 2", "Yes, to 16", "Yes, to 1"], "A geometric series converges only when $|k| < 1$."],
 ["For hvilke $x$ konvergerer $1 + x + x^2 + \\dots$?", ["$-1 < x < 1$", "$x > 1$", "Alle $x$", "$x > 0$"], "Kvotienten er $x$, og kravet er $|x| < 1$.", "For which $x$ does $1 + x + x^2 + \\dots$ converge?", ["$-1 < x < 1$", "$x > 1$", "All $x$", "$x > 0$"], "The ratio is $x$, and the requirement is $|x| < 1$."]
]);
// ---- R2 2: Differensiallikninger ----
BIQ("VGR2", 2, [
 ["Hva er den generelle løsningen av $y' = 3y$?", ["$y = Ce^{3x}$", "$y = 3x + C$", "$y = e^{x} + 3$", "$y = Cx^3$"], "Separasjon: $\\dfrac{dy}{y} = 3\\,dx$ gir $\\ln|y| = 3x + c$.", "What is the general solution of $y' = 3y$?", ["$y = Ce^{3x}$", "$y = 3x + C$", "$y = e^{x} + 3$", "$y = Cx^3$"], "Separation: $\\dfrac{dy}{y} = 3\\,dx$ gives $\\ln|y| = 3x + c$."],
 ["$y' = 2y$, $y(0) = 5$. Hva er $y(1)$?", { n: 36.95, tol: 0.05, u: "" }, "$y = 5e^{2x}$, så $y(1) = 5e^2 = 36{,}95$.", "$y' = 2y$, $y(0) = 5$. What is $y(1)$?", null, "$y = 5e^{2x}$, so $y(1) = 5e^2 = 36.95$."],
 ["Hvilken likning beskriver logistisk vekst?", ["$y' = ky(1 - y/K)$", "$y' = ky$", "$y' = k$", "$y'' = -ky$"], "Veksten bremses når $y$ nærmer seg bæreevnen $K$.", "Which equation describes logistic growth?", ["$y' = ky(1 - y/K)$", "$y' = ky$", "$y' = k$", "$y'' = -ky$"], "Growth slows down as $y$ approaches the carrying capacity $K$."],
 ["Hvilken likning beskriver en fjær som svinger uten demping?", ["$y'' + \\omega^2 y = 0$", "$y' = ky$", "$y' + y = 1$", "$y'' = 0$"], "Løsningene er $A\\sin\\omega t + B\\cos\\omega t$.", "Which equation describes a spring oscillating without damping?", ["$y'' + \\omega^2 y = 0$", "$y' = ky$", "$y' + y = 1$", "$y'' = 0$"], "The solutions are $A\\sin\\omega t + B\\cos\\omega t$."]
]);
// ---- R2 3: Trigonometriske funksjoner ----
BIQ("VGR2", 3, [
 ["Hva er $\\sin\\dfrac{\\pi}{6}$?", { n: 0.5, tol: 0.0001, u: "" }, "$\\dfrac{\\pi}{6} = 30^\\circ$, og $\\sin 30^\\circ = 0{,}5$.", "What is $\\sin\\dfrac{\\pi}{6}$?", null, "$\\dfrac{\\pi}{6} = 30^\\circ$, and $\\sin 30^\\circ = 0.5$."],
 ["Hvor mange grader er 1 radian, omtrent?", { n: 57.3, tol: 0.1, u: "°" }, "$\\dfrac{180^\\circ}{\\pi} = 57{,}3^\\circ$.", "Roughly how many degrees is 1 radian?", null, "$\\dfrac{180^\\circ}{\\pi} = 57.3^\\circ$."],
 ["Hva er amplituden til $f(x) = 3\\sin(2x) + 1$?", { n: 3, tol: 0, u: "" }, "Amplituden er tallverdien av faktoren foran sinus: 3.", "What is the amplitude of $f(x) = 3\\sin(2x) + 1$?", null, "The amplitude is the absolute value of the factor in front of sine: 3."],
 ["$(\\sin x)'' = $", ["$-\\sin x$", "$\\cos x$", "$\\sin x$", "$-\\cos x$"], "$(\\sin x)' = \\cos x$ og $(\\cos x)' = -\\sin x$.", "$(\\sin x)'' = $", ["$-\\sin x$", "$\\cos x$", "$\\sin x$", "$-\\cos x$"], "$(\\sin x)' = \\cos x$ and $(\\cos x)' = -\\sin x$."]
]);
// ---- R2 4: Vektorer i rommet ----
BIQ("VGR2", 4, [
 ["Hva er lengden av $[2, 3, 6]$?", { n: 7, tol: 0, u: "" }, "$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.", "What is the length of $[2, 3, 6]$?", null, "$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$."],
 ["Hva er $[1, 2, 3] \\cdot [4, -1, 2]$?", { n: 8, tol: 0, u: "" }, "$4 - 2 + 6 = 8$.", "What is $[1, 2, 3] \\cdot [4, -1, 2]$?", null, "$4 - 2 + 6 = 8$."],
 ["Hva står $\\vec u \\times \\vec v$ vinkelrett på?", ["Både $\\vec u$ og $\\vec v$", "Bare $\\vec u$", "Ingen av dem", "$x$-aksen"], "Derfor brukes vektorproduktet til å finne normalvektorer.", "What is $\\vec u \\times \\vec v$ perpendicular to?", ["Both $\\vec u$ and $\\vec v$", "Only $\\vec u$", "Neither of them", "The $x$-axis"], "That is why the cross product is used to find normal vectors."],
 ["Hva er $[1, 0, 0] \\times [0, 1, 0]$?", ["$[0, 0, 1]$", "$[0, 0, -1]$", "$[1, 1, 0]$", "$0$"], "$\\vec i \\times \\vec j = \\vec k$ (høyrehåndsregelen).", "What is $[1, 0, 0] \\times [0, 1, 0]$?", ["$[0, 0, 1]$", "$[0, 0, -1]$", "$[1, 1, 0]$", "$0$"], "$\\vec i \\times \\vec j = \\vec k$ (the right-hand rule)."]
]);
// ---- S1 0–3 ----
BIQ("VGS1", 0, [
 ["Løs $2x + 5 = 17$.", { n: 6, tol: 0, u: "" }, "$2x = 12$, så $x = 6$.", "Solve $2x + 5 = 17$.", null, "$2x = 12$, so $x = 6$."],
 ["Forkort $\\dfrac{6x^2}{3x}$.", ["$2x$", "$2x^2$", "$3x$", "$\\dfrac{2}{x}$"], "$\\dfrac{6}{3} = 2$ og $\\dfrac{x^2}{x} = x$.", "Simplify $\\dfrac{6x^2}{3x}$.", ["$2x$", "$2x^2$", "$3x$", "$\\dfrac{2}{x}$"], "$\\dfrac{6}{3} = 2$ and $\\dfrac{x^2}{x} = x$."],
 ["Løs $x^2 = 49$.", ["$x = 7$ eller $x = -7$", "$x = 7$", "$x = 24{,}5$", "$x = \\pm 49$"], "Begge gir 49 når de kvadreres.", "Solve $x^2 = 49$.", ["$x = 7$ or $x = -7$", "$x = 7$", "$x = 24.5$", "$x = \\pm 49$"], "Both give 49 when squared."],
 ["En vare koster 400 kr etter 20 % rabatt. Hva var ordinær pris?", { n: 500, tol: 0, u: "kr" }, "$0{,}8x = 400$, så $x = 500$ kr.", "An item costs 400 NOK after a 20 % discount. What was the full price?", null, "$0.8x = 400$, so $x = 500$ NOK."]
]);
GEN("VGS1", 0,
 () => { const p = R.p([10, 15, 20, 25, 30, 40]), full = R.p([200, 400, 500, 800, 1200, 1500]), now = full * (1 - p / 100);
   return [T(`En jakke koster ${nf(now, 0)} kr etter ${p} % rabatt. Hva var ordinær pris?`, `A jacket costs ${nf(now, 0)} NOK after a ${p} % discount. What was the full price?`), { n: full, tol: 0.5, u: "kr" },
     T(`$${mf(1 - p / 100)}x = ${mf(now, 0)}$, så $x = ${full}$ kr.`, `$${mf(1 - p / 100)}x = ${mf(now, 0)}$, so $x = ${full}$ NOK.`)]; }
);
BIQ("VGS1", 1, [
 ["$f(x) = 50x + 1000$ er kostnaden ved å lage $x$ enheter. Hva betyr 1000?", ["De faste kostnadene", "Prisen per enhet", "Overskuddet", "Antall enheter"], "Konstantleddet er kostnaden når $x = 0$.", "$f(x) = 50x + 1000$ is the cost of making $x$ units. What does 1000 mean?", ["The fixed costs", "The price per unit", "The profit", "The number of units"], "The constant term is the cost when $x = 0$."],
 ["Hvilken modell passer når noe halveres hvert år?", ["Eksponentiell med vekstfaktor 0,5", "Lineær", "Andregrads", "Konstant"], "Samme faktor hvert år: $f(x) = a \\cdot 0{,}5^x$.", "Which model fits when something halves every year?", ["Exponential with growth factor 0.5", "Linear", "Quadratic", "Constant"], "The same factor each year: $f(x) = a \\cdot 0.5^x$."],
 ["$f(x) = -2x^2 + 8x$. Hva er største verdi?", { n: 8, tol: 0, u: "" }, "Toppunkt i $x = -\\dfrac{8}{2 \\cdot (-2)} = 2$, og $f(2) = -8 + 16 = 8$.", "$f(x) = -2x^2 + 8x$. What is the largest value?", null, "Maximum at $x = -\\dfrac{8}{2 \\cdot (-2)} = 2$, and $f(2) = -8 + 16 = 8$."]
]);
BIQ("VGS1", 2, [
 ["$f(x) = 5x^2 - 3x$. Hva er $f'(x)$?", ["$10x - 3$", "$5x - 3$", "$10x^2 - 3$", "$10x$"], "$(5x^2)' = 10x$ og $(-3x)' = -3$.", "$f(x) = 5x^2 - 3x$. What is $f'(x)$?", ["$10x - 3$", "$5x - 3$", "$10x^2 - 3$", "$10x$"], "$(5x^2)' = 10x$ and $(-3x)' = -3$."],
 ["Inntekten er $I(x) = 200x - 0{,}5x^2$. Ved hvilken $x$ er den størst?", { n: 200, tol: 0, u: "" }, "$I'(x) = 200 - x = 0$ gir $x = 200$.", "The revenue is $I(x) = 200x - 0.5x^2$. At which $x$ is it largest?", null, "$I'(x) = 200 - x = 0$ gives $x = 200$."],
 ["Hva betyr $f'(3) = 12$ hvis $f(t)$ er antall følgere etter $t$ dager?", ["Antall følgere øker med 12 per dag akkurat da", "Det er 12 følgere", "Etter 12 dager er det 3 følgere", "Veksten er 3 per dag"], "Den deriverte er momentan vekstfart.", "What does $f'(3) = 12$ mean if $f(t)$ is the number of followers after $t$ days?", ["The number of followers grows by 12 per day at that moment", "There are 12 followers", "After 12 days there are 3 followers", "The growth is 3 per day"], "The derivative is the instantaneous rate of change."]
]);
BIQ("VGS1", 3, [
 ["Du kaster to terninger. Hva er sannsynligheten for sum 7?", ["$\\tfrac16$", "$\\tfrac{7}{36}$", "$\\tfrac{1}{12}$", "$\\tfrac{1}{36}$"], "6 av 36 kombinasjoner gir 7: $\\tfrac{6}{36} = \\tfrac16$.", "You roll two dice. What is the probability of a sum of 7?", ["$\\tfrac16$", "$\\tfrac{7}{36}$", "$\\tfrac{1}{12}$", "$\\tfrac{1}{36}$"], "6 of 36 combinations give 7: $\\tfrac{6}{36} = \\tfrac16$."],
 ["$P(A) = 0{,}3$. Hva er $P(\\text{ikke } A)$?", { n: 0.7, tol: 0.001, u: "" }, "Komplementet: $1 - 0{,}3 = 0{,}7$.", "$P(A) = 0.3$. What is $P(\\text{not } A)$?", null, "The complement: $1 - 0.3 = 0.7$."],
 ["Hva er sannsynligheten for minst én sekser på 4 kast?", { n: 0.518, tol: 0.002, u: "" }, "$1 - \\left(\\tfrac56\\right)^4 = 1 - 0{,}482 = 0{,}518$.", "What is the probability of at least one six in 4 rolls?", null, "$1 - \\left(\\tfrac56\\right)^4 = 1 - 0.482 = 0.518$."],
 ["Hvor mange måter kan 3 personer velges ut av 10 (rekkefølgen spiller ingen rolle)?", { n: 120, tol: 0, u: "" }, "$\\binom{10}{3} = \\dfrac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = 120$.", "In how many ways can 3 people be chosen from 10 (order does not matter)?", null, "$\\binom{10}{3} = \\dfrac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = 120$."]
]);
GEN("VGS1", 3,
 () => { const n = R.i(2, 8), p = R.p([1 / 6, 0.1, 0.2, 0.25, 0.5]), P = 1 - (1 - p) ** n, pl_ = p === 1 / 6 ? "\\tfrac16" : mf(p);
   return [T(`Sannsynligheten for suksess i ett forsøk er $${pl_}$. Hva er sannsynligheten for minst én suksess på ${n} forsøk?`, `The probability of success in one trial is $${pl_}$. What is the probability of at least one success in ${n} trials?`), { n: P, tol: 0.002, u: "" },
     T(`Komplementet: $1 - (1 - ${pl_})^{${n}} = 1 - ${mf((1 - p) ** n, 4)} = ${mf(P, 4)}$.`, `The complement: $1 - (1 - ${pl_})^{${n}} = 1 - ${mf((1 - p) ** n, 4)} = ${mf(P, 4)}$.`)]; }
);
})();
