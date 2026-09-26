// ============================================================
//  add_vgs_b.js – VIDEREGÅENDE: Matematikk R2, Fysikk 1, Kjemi 1 og Biologi 1
// ============================================================
(() => {
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });

// ================= VGR2 0: Integrasjon =================
TH("VGR2", 0, `## Hva handler det om?
Integrasjon er det motsatte av derivasjon. Det bestemte integralet gir arealet mellom grafen og $x$-aksen (med fortegn).

## Begreper og formler
- $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ ($n \\ne -1$), $\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$, $\\int e^{kx}\\,dx = \\dfrac{1}{k}e^{kx} + C$.
- $\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$.
- Bestemt integral: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.
- Delvis integrasjon: $\\int u'v\\,dx = uv - \\int uv'\\,dx$. Substitusjon: sett $u = g(x)$.
- Omdreiningsvolum om $x$-aksen: $V = \\pi\\int_a^b f(x)^2\\,dx$.

> Finn en antiderivert $F$, og regn ut $F(b) - F(a)$.`,
`## What is it about?
Integration is the opposite of differentiation. The definite integral gives the area between the graph and the $x$-axis (with sign).

## Concepts and formulas
- $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ ($n \\ne -1$), $\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$, $\\int e^{kx}\\,dx = \\dfrac{1}{k}e^{kx} + C$.
- $\\int \\sin x\\,dx = -\\cos x + C$, $\\int \\cos x\\,dx = \\sin x + C$.
- Definite integral: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.
- Integration by parts: $\\int u'v\\,dx = uv - \\int uv'\\,dx$. Substitution: let $u = g(x)$.
- Volume of revolution about the $x$-axis: $V = \\pi\\int_a^b f(x)^2\\,dx$.

> Find an antiderivative $F$, then calculate $F(b) - F(a)$.`);
BIQ("VGR2", 0, [
 ["Hva er $\\int 3x^2\\,dx$?", ["$x^3 + C$", "$6x + C$", "$3x^3 + C$", "$x^2 + C$"], "$3 \\cdot \\dfrac{x^3}{3} = x^3$.", "What is $\\int 3x^2\\,dx$?", ["$x^3 + C$", "$6x + C$", "$3x^3 + C$", "$x^2 + C$"], "$3 \\cdot \\dfrac{x^3}{3} = x^3$."],
 ["Hva er $\\int_0^1 2x\\,dx$?", { n: 1, tol: 0, u: "" }, "$[x^2]_0^1 = 1 - 0 = 1$.", "What is $\\int_0^1 2x\\,dx$?", null, "$[x^2]_0^1 = 1 - 0 = 1$."],
 ["Hva er $\\int \\dfrac{1}{x}\\,dx$?", ["$\\ln|x| + C$", "$-\\dfrac{1}{x^2} + C$", "$\\dfrac{x^0}{0} + C$", "$e^x + C$"], "Potensregelen virker ikke for $n = -1$.",
  "What is $\\int \\dfrac{1}{x}\\,dx$?", ["$\\ln|x| + C$", "$-\\dfrac{1}{x^2} + C$", "$\\dfrac{x^0}{0} + C$", "$e^x + C$"], "The power rule does not work for $n = -1$."]
]);
GEN("VGR2", 0,
 () => { const a = R.p([1, 2, 3, -1]), b = R.i(-4, 4), c = R.i(-3, 5), lo = R.i(-2, 1), hi = lo + R.i(1, 3);
   const F = x => a * x ** 3 / 3 + b * x ** 2 / 2 + c * x, v = F(hi) - F(lo);
   return [T(`Regn ut $\\displaystyle\\int_{${lo}}^{${hi}} (${pl([[a, "x^2"], [b, "x"], [c, ""]])})\\,dx$.`, `Calculate $\\displaystyle\\int_{${lo}}^{${hi}} (${pl([[a, "x^2"], [b, "x"], [c, ""]])})\\,dx$.`), { n: v, tol: 0.01, u: "" },
     T(`En antiderivert er $F(x) = ${mf(a / 3, 3)}x^3 + ${mf(b / 2, 2)}x^2 + ${c}x$. $F(${hi}) - F(${lo}) \\approx ${mf(v, 3)}$.`, `An antiderivative is $F(x) = ${mf(a / 3, 3)}x^3 + ${mf(b / 2, 2)}x^2 + ${c}x$. $F(${hi}) - F(${lo}) \\approx ${mf(v, 3)}$.`)]; },
 () => { const k = R.p([1, 2, 0.5]), b = R.p([1, 2, 3]); const v = (Math.exp(k * b) - 1) / k;
   return [T(`Regn ut $\\displaystyle\\int_0^{${b}} e^{${mf(k, 1)}x}\\,dx$.`, `Calculate $\\displaystyle\\int_0^{${b}} e^{${mf(k, 1)}x}\\,dx$.`), { n: v, tol: rel(v, 0.003), u: "" },
     T(`$\\left[\\tfrac{1}{${mf(k, 1)}}e^{${mf(k, 1)}x}\\right]_0^{${b}} = \\tfrac{1}{${mf(k, 1)}}(e^{${mf(k * b, 1)}} - 1) \\approx ${mf(v, 3)}$.`, `$\\left[\\tfrac{1}{${mf(k, 1)}}e^{${mf(k, 1)}x}\\right]_0^{${b}} = \\tfrac{1}{${mf(k, 1)}}(e^{${mf(k * b, 1)}} - 1) \\approx ${mf(v, 3)}$.`)]; }
);

// ================= VGR2 1: Følger og rekker =================
TH("VGR2", 1, `## Hva handler det om?
En følge er en liste med tall. En rekke er summen av leddene i en følge.

## Begreper og formler
- Aritmetisk følge (fast differanse $d$): $a_n = a_1 + (n-1)d$, sum $S_n = \\dfrac{n(a_1 + a_n)}{2}$.
- Geometrisk følge (fast kvotient $k$): $a_n = a_1 k^{n-1}$, sum $S_n = a_1\\dfrac{k^n - 1}{k - 1}$.
- Uendelig geometrisk rekke konvergerer når $|k| < 1$, med sum $S = \\dfrac{a_1}{1 - k}$.

> Fast differanse: aritmetisk. Fast faktor: geometrisk. Konvergens krever $|k| < 1$.`,
`## What is it about?
A sequence is a list of numbers. A series is the sum of the terms of a sequence.

## Concepts and formulas
- Arithmetic sequence (constant difference $d$): $a_n = a_1 + (n-1)d$, sum $S_n = \\dfrac{n(a_1 + a_n)}{2}$.
- Geometric sequence (constant ratio $k$): $a_n = a_1 k^{n-1}$, sum $S_n = a_1\\dfrac{k^n - 1}{k - 1}$.
- An infinite geometric series converges when $|k| < 1$, with sum $S = \\dfrac{a_1}{1 - k}$.

> Constant difference: arithmetic. Constant factor: geometric. Convergence requires $|k| < 1$.`);
BIQ("VGR2", 1, [
 ["Når konvergerer en uendelig geometrisk rekke?", ["Når $|k| < 1$", "Når $k > 1$", "Alltid", "Når $a_1 < 1$"], "Da blir leddene mindre og mindre, og summen nærmer seg $a_1/(1-k)$.",
  "When does an infinite geometric series converge?", ["When $|k| < 1$", "When $k > 1$", "Always", "When $a_1 < 1$"], "Then the terms get smaller and smaller, and the sum approaches $a_1/(1-k)$."],
 ["Hva er summen av $1 + \\tfrac12 + \\tfrac14 + \\dots$?", { n: 2, tol: 0, u: "" }, "$S = \\dfrac{1}{1 - 1/2} = 2$.", "What is the sum of $1 + \\tfrac12 + \\tfrac14 + \\dots$?", null, "$S = \\dfrac{1}{1 - 1/2} = 2$."]
]);
GEN("VGR2", 1,
 () => { const a1 = R.i(-5, 10), d = R.p([-3, -2, 2, 3, 4, 5]), n = R.i(8, 30); const an = a1 + (n - 1) * d;
   return [T(`En aritmetisk følge har $a_1 = ${a1}$ og $d = ${d}$. Finn $a_{${n}}$.`, `An arithmetic sequence has $a_1 = ${a1}$ and $d = ${d}$. Find $a_{${n}}$.`), { n: an, tol: 0, u: "" }, T(`$a_{${n}} = ${a1} + (${n} - 1)\\cdot(${d}) = ${an}$.`, `$a_{${n}} = ${a1} + (${n} - 1)\\cdot(${d}) = ${an}$.`)]; },
 () => { const a1 = R.p([1, 2, 3, 5, 10, 20]), k = R.p([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, -0.5]); const S = a1 / (1 - k);
   return [T(`Finn summen av den uendelige geometriske rekken med $a_1 = ${a1}$ og $k = ${mf(k, 2)}$.`, `Find the sum of the infinite geometric series with $a_1 = ${a1}$ and $k = ${mf(k, 2)}$.`), { n: S, tol: 0.01, u: "" },
     T(`$S = \\dfrac{${a1}}{1 - (${mf(k, 2)})} \\approx ${mf(S, 3)}$.`, `$S = \\dfrac{${a1}}{1 - (${mf(k, 2)})} \\approx ${mf(S, 3)}$.`)]; },
 () => { const a1 = R.p([1, 2, 3, 5]), k = R.p([2, 3]), n = R.i(4, 9); const S = a1 * (k ** n - 1) / (k - 1);
   return [T(`Finn summen av de ${n} første leddene i den geometriske rekken med $a_1 = ${a1}$ og $k = ${k}$.`, `Find the sum of the first ${n} terms of the geometric series with $a_1 = ${a1}$ and $k = ${k}$.`), { n: S, tol: 0, u: "" },
     T(`$S_{${n}} = ${a1}\\cdot\\dfrac{${k}^{${n}} - 1}{${k} - 1} = ${S}$.`, `$S_{${n}} = ${a1}\\cdot\\dfrac{${k}^{${n}} - 1}{${k} - 1} = ${S}$.`)]; }
);

// ================= VGR2 2: Differensiallikninger =================
TH("VGR2", 2, `## Hva handler det om?
En differensiallikning er en likning der den ukjente er en funksjon, og likningen inneholder den deriverte. De beskriver vekst, avkjøling, fall med luftmotstand og mye mer.

## Begreper og formler
- $y' = ky$ har løsningen $y = Ce^{kx}$. Med $y(0) = y_0$ blir $C = y_0$.
- Separable likninger $y' = f(x)g(y)$: skill variablene og integrer begge sider: $\\int \\dfrac{dy}{g(y)} = \\int f(x)\\,dx$.
- Førsteordens lineære $y' + ay = b$: løsning $y = \\dfrac{b}{a} + Ce^{-ax}$.
- Logistisk vekst: $y' = ky(M - y)$, der $M$ er bæreevnen.

> $y' = ky$ gir eksponentiell vekst eller nedgang: $y = y_0e^{kx}$.`,
`## What is it about?
A differential equation is an equation where the unknown is a function, and the equation contains the derivative. They describe growth, cooling, falling with air resistance and much more.

## Concepts and formulas
- $y' = ky$ has the solution $y = Ce^{kx}$. With $y(0) = y_0$, $C = y_0$.
- Separable equations $y' = f(x)g(y)$: separate the variables and integrate both sides: $\\int \\dfrac{dy}{g(y)} = \\int f(x)\\,dx$.
- First-order linear $y' + ay = b$: solution $y = \\dfrac{b}{a} + Ce^{-ax}$.
- Logistic growth: $y' = ky(M - y)$, where $M$ is the carrying capacity.

> $y' = ky$ gives exponential growth or decay: $y = y_0e^{kx}$.`);
BIQ("VGR2", 2, [
 ["Hva er den generelle løsningen av $y' = 3y$?", ["$y = Ce^{3x}$", "$y = 3x + C$", "$y = Ce^{x/3}$", "$y = 3e^x$"], "$y' = ky$ gir $y = Ce^{kx}$.", "What is the general solution of $y' = 3y$?", ["$y = Ce^{3x}$", "$y = 3x + C$", "$y = Ce^{x/3}$", "$y = 3e^x$"], "$y' = ky$ gives $y = Ce^{kx}$."],
 ["Hva betyr $M$ i logistisk vekst $y' = ky(M - y)$?", ["Bæreevnen (den øvre grensen)", "Startverdien", "Veksthastigheten", "Tiden"], "Når $y$ nærmer seg $M$, går veksten mot null.",
  "What does $M$ mean in logistic growth $y' = ky(M - y)$?", ["The carrying capacity (the upper limit)", "The starting value", "The growth rate", "The time"], "As $y$ approaches $M$, the growth goes to zero."]
]);
GEN("VGR2", 2,
 () => { const y0 = R.p([2, 5, 10, 50, 100]), k = R.p([0.1, 0.2, 0.5, -0.1, -0.3]), x = R.p([1, 2, 3, 5]); const y = y0 * Math.exp(k * x);
   return [T(`$y' = ${mf(k, 1)}y$ og $y(0) = ${y0}$. Finn $y(${x})$.`, `$y' = ${mf(k, 1)}y$ and $y(0) = ${y0}$. Find $y(${x})$.`), { n: y, tol: rel(y, 0.003), u: "" },
     T(`$y = ${y0}e^{${mf(k, 1)}x}$, så $y(${x}) = ${y0}e^{${mf(k * x, 2)}} \\approx ${mf(y, 3)}$.`, `$y = ${y0}e^{${mf(k, 1)}x}$, so $y(${x}) = ${y0}e^{${mf(k * x, 2)}} \\approx ${mf(y, 3)}$.`)]; },
 () => { const a = R.p([1, 2, 4, 5]), b = R.p([10, 20, 40, 50]); const lim = b / a;
   return [T(`Løsningene av $y' + ${a === 1 ? "" : a}y = ${b}$ nærmer seg en fast verdi når $x \\to \\infty$. Hvilken?`, `The solutions of $y' + ${a === 1 ? "" : a}y = ${b}$ approach a fixed value as $x \\to \\infty$. Which?`), { n: lim, tol: 0.001, u: "" },
     T(`$y = \\dfrac{${b}}{${a}} + Ce^{-${a === 1 ? "" : a}x} \\to ${mf(lim, 2)}$.`, `$y = \\dfrac{${b}}{${a}} + Ce^{-${a === 1 ? "" : a}x} \\to ${mf(lim, 2)}$.`)]; }
);

// ================= VGR2 3: Trigonometriske funksjoner =================
TH("VGR2", 3, `## Hva handler det om?
Sinus- og cosinusfunksjoner beskriver alt som svinger: lyd, tidevann, vekselstrøm og dagslengde.

## Begreper og formler
- $f(x) = A\\sin(cx + \\varphi) + d$: amplitude $|A|$, periode $p = \\dfrac{2\\pi}{c}$, likevektslinje $y = d$.
- $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$.
- Vinkler i radianer: $180^\\circ = \\pi$.
- $\\sin x = a$ har løsningene $x = \\sin^{-1}a + n\\cdot 2\\pi$ og $x = \\pi - \\sin^{-1}a + n\\cdot 2\\pi$.

> Periode $= 2\\pi/c$. Amplitude = halve avstanden mellom topp og bunn.`,
`## What is it about?
Sine and cosine functions describe everything that oscillates: sound, tides, alternating current and day length.

## Concepts and formulas
- $f(x) = A\\sin(cx + \\varphi) + d$: amplitude $|A|$, period $p = \\dfrac{2\\pi}{c}$, equilibrium line $y = d$.
- $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$.
- Angles in radians: $180^\\circ = \\pi$.
- $\\sin x = a$ has the solutions $x = \\sin^{-1}a + n\\cdot 2\\pi$ and $x = \\pi - \\sin^{-1}a + n\\cdot 2\\pi$.

> Period $= 2\\pi/c$. Amplitude = half the distance between the top and bottom.`);
BIQ("VGR2", 3, [
 ["Hva er $(\\cos x)'$?", ["$-\\sin x$", "$\\sin x$", "$\\cos x$", "$-\\cos x$"], "Cosinus deriveres til minus sinus.", "What is $(\\cos x)'$?", ["$-\\sin x$", "$\\sin x$", "$\\cos x$", "$-\\cos x$"], "Cosine differentiates to minus sine."],
 ["Hvor mange radianer er 90°?", ["$\\dfrac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\dfrac{\\pi}{4}$"], "$180^\\circ = \\pi$, så $90^\\circ = \\pi/2$.", "How many radians is 90°?", ["$\\dfrac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\dfrac{\\pi}{4}$"], "$180^\\circ = \\pi$, so $90^\\circ = \\pi/2$."]
]);
GEN("VGR2", 3,
 () => { const A = R.i(1, 6), c = R.p([1, 2, 3, 4, 0.5]), d = R.i(-3, 5); const p = 2 * Math.PI / c;
   return [T(`Hva er perioden til $f(x) = ${A}\\sin(${mf(c, 1)}x) ${d < 0 ? "-" : "+"} ${Math.abs(d)}$?`, `What is the period of $f(x) = ${A}\\sin(${mf(c, 1)}x) ${d < 0 ? "-" : "+"} ${Math.abs(d)}$?`), { n: p, tol: 0.01, u: "" },
     T(`$p = 2\\pi/${mf(c, 1)} \\approx ${mf(p, 3)}$. (Amplituden er ${A} og likevektslinjen $y = ${d}$.)`, `$p = 2\\pi/${mf(c, 1)} \\approx ${mf(p, 3)}$. (The amplitude is ${A} and the equilibrium line $y = ${d}$.)`)]; },
 () => { const top = R.i(3, 15), bot = R.i(-8, 2); const A = (top - bot) / 2;
   return [T(`En sinusfunksjon har toppunkter med $y = ${top}$ og bunnpunkter med $y = ${bot}$. Hva er amplituden?`, `A sine function has maxima at $y = ${top}$ and minima at $y = ${bot}$. What is the amplitude?`), { n: A, tol: 0.001, u: "" },
     T(`$A = (${top} - (${bot}))/2 = ${mf(A, 1)}$.`, `$A = (${top} - (${bot}))/2 = ${mf(A, 1)}$.`)]; }
);

// ================= VGR2 4: Vektorer i rommet =================
TH("VGR2", 4, `## Hva handler det om?
I rommet har vektorer tre koordinater $[x, y, z]$. Med skalarprodukt og vektorprodukt finner du vinkler, arealer, volumer og likninger for plan.

## Begreper og formler
- Lengde: $|[x, y, z]| = \\sqrt{x^2 + y^2 + z^2}$.
- Skalarprodukt: $\\vec u \\cdot \\vec v = x_1x_2 + y_1y_2 + z_1z_2$.
- Vektorproduktet $\\vec u \\times \\vec v$ står vinkelrett på begge, og lengden er arealet av parallellogrammet de utspenner.
- Plan gjennom $P(x_0, y_0, z_0)$ med normalvektor $[a, b, c]$: $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$.
- Kule med sentrum $(x_0, y_0, z_0)$ og radius $r$: $(x-x_0)^2 + (y-y_0)^2 + (z-z_0)^2 = r^2$.

> Normalvektor til et plan: vektorproduktet av to vektorer i planet.`,
`## What is it about?
In space, vectors have three coordinates $[x, y, z]$. With the dot product and the cross product you find angles, areas, volumes and equations of planes.

## Concepts and formulas
- Length: $|[x, y, z]| = \\sqrt{x^2 + y^2 + z^2}$.
- Dot product: $\\vec u \\cdot \\vec v = x_1x_2 + y_1y_2 + z_1z_2$.
- The cross product $\\vec u \\times \\vec v$ is perpendicular to both, and its length is the area of the parallelogram they span.
- Plane through $P(x_0, y_0, z_0)$ with normal vector $[a, b, c]$: $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$.
- Sphere with centre $(x_0, y_0, z_0)$ and radius $r$: $(x-x_0)^2 + (y-y_0)^2 + (z-z_0)^2 = r^2$.

> Normal vector of a plane: the cross product of two vectors in the plane.`);
BIQ("VGR2", 4, [
 ["Hva står vektorproduktet $\\vec u \\times \\vec v$ vinkelrett på?", ["Både $\\vec u$ og $\\vec v$", "Bare $\\vec u$", "Ingen av dem", "$x$-aksen"], "Derfor brukes det til å finne normalvektorer.",
  "What is the cross product $\\vec u \\times \\vec v$ perpendicular to?", ["Both $\\vec u$ and $\\vec v$", "Only $\\vec u$", "Neither of them", "The $x$-axis"], "That is why it is used to find normal vectors."],
 ["Hva er lengden av $[2, 3, 6]$?", { n: 7, tol: 0, u: "" }, "$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.", "What is the length of $[2, 3, 6]$?", null, "$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$."]
]);
GEN("VGR2", 4,
 () => { const u = [R.i(-5, 5), R.i(-5, 5), R.i(-5, 5)], v = [R.i(-5, 5), R.i(-5, 5), R.i(-5, 5)]; const s = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
   return [T(`Regn ut $[${u}] \\cdot [${v}]$.`, `Calculate $[${u}] \\cdot [${v}]$.`), { n: s, tol: 0, u: "" }, T(`$${u[0]}\\cdot${v[0]} + ${u[1]}\\cdot${v[1]} + ${u[2]}\\cdot${v[2]} = ${s}$.`, `$${u[0]}\\cdot${v[0]} + ${u[1]}\\cdot${v[1]} + ${u[2]}\\cdot${v[2]} = ${s}$.`)]; },
 () => { const u = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], v = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)]; const w = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], A = Math.hypot(...w);
   return [T(`Finn arealet av parallellogrammet utspent av $[${u}]$ og $[${v}]$.`, `Find the area of the parallelogram spanned by $[${u}]$ and $[${v}]$.`), { n: A, tol: 0.01, u: "" },
     T(`$\\vec u \\times \\vec v = [${w}]$, og arealet er $|\\vec u \\times \\vec v| \\approx ${mf(A, 3)}$.`, `$\\vec u \\times \\vec v = [${w}]$, and the area is $|\\vec u \\times \\vec v| \\approx ${mf(A, 3)}$.`)]; }
);

// ================= VGFY1 0: Bevegelse =================
TH("VGFY1", 0, `## Hva handler det om?
Bevegelseslikningene beskriver bevegelse med konstant akselerasjon, for eksempel fritt fall og en bil som bremser.

## Begreper og formler
- Fart: $v = \\dfrac{\\Delta s}{\\Delta t}$. Akselerasjon: $a = \\dfrac{\\Delta v}{\\Delta t}$.
- $v = v_0 + at$
- $s = v_0t + \\tfrac12 at^2$
- $v^2 - v_0^2 = 2as$
- $s = \\dfrac{v_0 + v}{2}t$
- Fritt fall: $a = g = 9{,}81\\ \\text{m/s}^2$ (uten luftmotstand).

> Skriv opp hva du vet ($v_0$, $v$, $a$, $s$, $t$) og velg likningen som mangler det du ikke vet.`,
`## What is it about?
The equations of motion describe motion with constant acceleration, for example free fall and a car braking.

## Concepts and formulas
- Speed: $v = \\dfrac{\\Delta s}{\\Delta t}$. Acceleration: $a = \\dfrac{\\Delta v}{\\Delta t}$.
- $v = v_0 + at$
- $s = v_0t + \\tfrac12 at^2$
- $v^2 - v_0^2 = 2as$
- $s = \\dfrac{v_0 + v}{2}t$
- Free fall: $a = g = 9.81\\ \\text{m/s}^2$ (without air resistance).

> Write down what you know ($v_0$, $v$, $a$, $s$, $t$) and pick the equation that lacks what you do not know.`);
BIQ("VGFY1", 0, [
 ["En bil kjører 90 km/t. Hvor mange m/s er det?", { n: 25, tol: 0, u: "m/s" }, "Del på 3,6: $90/3{,}6 = 25$ m/s.", "A car drives at 90 km/h. How many m/s is that?", null, "Divide by 3.6: $90/3.6 = 25$ m/s."],
 ["Hva er akselerasjonen i fritt fall uten luftmotstand?", ["$9{,}81\\ \\text{m/s}^2$", "$0$", "$1\\ \\text{m/s}^2$", "Den øker med tiden"], "Alle legemer faller med samme akselerasjon $g$ når luftmotstanden er neglisjerbar.",
  "What is the acceleration in free fall without air resistance?", ["$9.81\\ \\text{m/s}^2$", "$0$", "$1\\ \\text{m/s}^2$", "It increases with time"], "All bodies fall with the same acceleration $g$ when air resistance is negligible."]
]);
GEN("VGFY1", 0,
 () => { const t = R.p([1, 1.5, 2, 2.5, 3]); const s = 0.5 * G_ * t * t;
   return [T(`En stein slippes fra ro. Hvor langt har den falt etter ${nf(t, 1)} s? (Se bort fra luftmotstand, $g = 9{,}81\\ \\text{m/s}^2$.)`, `A stone is dropped from rest. How far has it fallen after ${nf(t, 1)} s? (Ignore air resistance, $g = 9.81\\ \\text{m/s}^2$.)`), { n: s, tol: 0.05, u: "m" },
     T(`$s = \\tfrac12 g t^2 = 0{,}5 \\cdot 9{,}81 \\cdot ${mf(t, 1)}^2 \\approx ${mf(s, 2)}$ m.`, `$s = \\tfrac12 g t^2 = 0.5 \\cdot 9.81 \\cdot ${mf(t, 1)}^2 \\approx ${mf(s, 2)}$ m.`)]; },
 () => { const v0 = R.p([10, 15, 20, 25, 30]), a = R.p([-2, -4, -5, -6, -8]); const s = -v0 * v0 / (2 * a);
   return [T(`En bil med fart ${v0} m/s bremser med ${-a} m/s². Hvor lang er bremselengden?`, `A car at ${v0} m/s brakes at ${-a} m/s². How long is the braking distance?`), { n: s, tol: 0.05, u: "m" },
     T(`$v^2 - v_0^2 = 2as$ med $v = 0$: $s = \\dfrac{-${v0}^2}{2 \\cdot (${a})} = ${mf(s, 2)}$ m.`, `$v^2 - v_0^2 = 2as$ with $v = 0$: $s = \\dfrac{-${v0}^2}{2 \\cdot (${a})} = ${mf(s, 2)}$ m.`)]; },
 () => { const v0 = R.p([0, 2, 5, 10]), a = R.p([1, 1.5, 2, 3]), t = R.i(2, 8); const v = v0 + a * t;
   return [T(`Et legeme har startfart ${v0} m/s og akselerasjon ${nf(a, 1)} m/s². Hva er farten etter ${t} s?`, `A body has initial speed ${v0} m/s and acceleration ${nf(a, 1)} m/s². What is its speed after ${t} s?`), { n: v, tol: 0.01, u: "m/s" },
     T(`$v = v_0 + at = ${v0} + ${mf(a, 1)} \\cdot ${t} = ${mf(v, 1)}$ m/s.`, `$v = v_0 + at = ${v0} + ${mf(a, 1)} \\cdot ${t} = ${mf(v, 1)}$ m/s.`)]; }
);

// ================= VGFY1 1: Krefter og Newtons lover =================
TH("VGFY1", 1, `## Hva handler det om?
Newtons lover forklarer hvordan krefter endrer bevegelse.

## Begreper og formler
- Newtons 1. lov: er summen av kreftene null, er farten konstant (eller legemet i ro).
- Newtons 2. lov: $\\sum F = ma$.
- Newtons 3. lov: virker A på B med en kraft, virker B på A med like stor, motsatt rettet kraft.
- Tyngde: $G = mg$. Friksjon: $R = \\mu N$.
- Sirkelbevegelse: sentripetalakselerasjon $a = \\dfrac{v^2}{r}$.

> Tegn alle kreftene, finn summen, bruk $\\sum F = ma$.`,
`## What is it about?
Newton's laws explain how forces change motion.

## Concepts and formulas
- Newton's 1st law: if the sum of forces is zero, the velocity is constant (or the body is at rest).
- Newton's 2nd law: $\\sum F = ma$.
- Newton's 3rd law: if A acts on B with a force, B acts on A with an equal and opposite force.
- Weight: $G = mg$. Friction: $R = \\mu N$.
- Circular motion: centripetal acceleration $a = \\dfrac{v^2}{r}$.

> Draw all the forces, find the sum, use $\\sum F = ma$.`);
BIQ("VGFY1", 1, [
 ["En heis beveger seg oppover med konstant fart. Hva er summen av kreftene på den?", ["Null", "Rettet oppover", "Rettet nedover", "Lik tyngden"], "Konstant fart betyr null akselerasjon, så $\\sum F = 0$ (Newtons 1. lov).",
  "A lift moves upwards at constant speed. What is the sum of the forces on it?", ["Zero", "Directed upwards", "Directed downwards", "Equal to its weight"], "Constant velocity means zero acceleration, so $\\sum F = 0$ (Newton's 1st law)."],
 ["Hva er tyngden av en person på 70 kg? ($g = 9{,}81\\ \\text{m/s}^2$)", { n: 686.7, tol: 0.5, u: "N" }, "$G = mg = 70 \\cdot 9{,}81 = 686{,}7$ N.", "What is the weight of a 70 kg person? ($g = 9.81\\ \\text{m/s}^2$)", null, "$G = mg = 70 \\cdot 9.81 = 686.7$ N."]
]);
GEN("VGFY1", 1,
 () => { const m = R.p([2, 5, 10, 20, 50, 1200]), F = R.p([10, 20, 50, 100, 300, 2400]); const a = F / m;
   return [T(`En netto kraft på ${nf(F)} N virker på et legeme med masse ${nf(m)} kg. Hva er akselerasjonen?`, `A net force of ${nf(F)} N acts on a body of mass ${nf(m)} kg. What is the acceleration?`), { n: a, tol: 0.01, u: "m/s²" },
     T(`$a = F/m = ${F}/${m} = ${mf(a, 2)}$ m/s².`, `$a = F/m = ${F}/${m} = ${mf(a, 2)}$ m/s².`)]; },
 () => { const m = R.p([5, 10, 20, 40]), mu = R.p([0.1, 0.2, 0.3, 0.4, 0.5]); const Rf = mu * m * G_;
   return [T(`En kasse på ${m} kg skyves langs et vannrett gulv. Friksjonstallet er ${nf(mu, 1)}. Hvor stor er friksjonskraften?`, `A ${m} kg box is pushed along a horizontal floor. The coefficient of friction is ${nf(mu, 1)}. How large is the friction force?`), { n: Rf, tol: 0.1, u: "N" },
     T(`$R = \\mu mg = ${mf(mu, 1)} \\cdot ${m} \\cdot 9{,}81 \\approx ${mf(Rf, 1)}$ N.`, `$R = \\mu mg = ${mf(mu, 1)} \\cdot ${m} \\cdot 9.81 \\approx ${mf(Rf, 1)}$ N.`)]; }
);

// ================= VGFY1 2: Energi og arbeid =================
TH("VGFY1", 2, `## Hva handler det om?
Energi kan verken skapes eller forsvinne, bare gå over fra én form til en annen. Arbeid er energi som overføres av en kraft.

## Begreper og formler
- Arbeid: $W = F s \\cos\\alpha$.
- Kinetisk energi: $E_k = \\tfrac12 mv^2$. Potensiell energi: $E_p = mgh$.
- Uten friksjon er mekanisk energi bevart: $E_k + E_p$ er konstant. Fall fra høyde $h$: $v = \\sqrt{2gh}$.
- Effekt: $P = \\dfrac{W}{t}$. Virkningsgrad: $\\eta = \\dfrac{\\text{nyttig energi}}{\\text{tilført energi}}$.

> Energibevaring: $\\tfrac12 mv^2 = mgh$ gir $v = \\sqrt{2gh}$.`,
`## What is it about?
Energy can neither be created nor destroyed, only converted from one form to another. Work is energy transferred by a force.

## Concepts and formulas
- Work: $W = F s \\cos\\alpha$.
- Kinetic energy: $E_k = \\tfrac12 mv^2$. Potential energy: $E_p = mgh$.
- Without friction, mechanical energy is conserved: $E_k + E_p$ is constant. Fall from height $h$: $v = \\sqrt{2gh}$.
- Power: $P = \\dfrac{W}{t}$. Efficiency: $\\eta = \\dfrac{\\text{useful energy}}{\\text{energy supplied}}$.

> Energy conservation: $\\tfrac12 mv^2 = mgh$ gives $v = \\sqrt{2gh}$.`);
BIQ("VGFY1", 2, [
 ["Farten dobles. Hva skjer med den kinetiske energien?", ["Den firedobles", "Den dobles", "Den halveres", "Den er uendret"], "$E_k = \\tfrac12 mv^2$: dobbel fart gir fire ganger så mye energi.",
  "The speed is doubled. What happens to the kinetic energy?", ["It is quadrupled", "It is doubled", "It is halved", "It is unchanged"], "$E_k = \\tfrac12 mv^2$: double the speed gives four times the energy."],
 ["Hva er enheten for effekt?", ["Watt (J/s)", "Joule", "Newton", "Pascal"], "1 W = 1 J/s.", "What is the unit of power?", ["Watt (J/s)", "Joule", "Newton", "Pascal"], "1 W = 1 J/s."]
]);
GEN("VGFY1", 2,
 () => { const h = R.p([1, 2, 5, 10, 20, 45]); const v = Math.sqrt(2 * G_ * h);
   return [T(`En ball slippes fra ${h} m høyde. Hva er farten rett før den treffer bakken? (Se bort fra luftmotstand.)`, `A ball is dropped from a height of ${h} m. What is its speed just before it hits the ground? (Ignore air resistance.)`), { n: v, tol: 0.02, u: "m/s" },
     T(`$v = \\sqrt{2gh} = \\sqrt{2 \\cdot 9{,}81 \\cdot ${h}} \\approx ${mf(v, 2)}$ m/s.`, `$v = \\sqrt{2gh} = \\sqrt{2 \\cdot 9.81 \\cdot ${h}} \\approx ${mf(v, 2)}$ m/s.`)]; },
 () => { const m = R.p([0.5, 2, 5, 60, 1000]), v = R.p([2, 5, 10, 20, 30]); const E = 0.5 * m * v * v;
   return [T(`Hva er den kinetiske energien til et legeme med masse ${nf(m, 1)} kg og fart ${v} m/s?`, `What is the kinetic energy of a body with mass ${nf(m, 1)} kg and speed ${v} m/s?`), { n: E, tol: rel(E, 0.002), u: "J" },
     T(`$E_k = \\tfrac12 \\cdot ${mf(m, 1)} \\cdot ${v}^2 = ${mf(E, 1)}$ J.`, `$E_k = \\tfrac12 \\cdot ${mf(m, 1)} \\cdot ${v}^2 = ${mf(E, 1)}$ J.`)]; },
 () => { const W = R.p([600, 1200, 3000, 6000, 12000]), t = R.p([2, 5, 10, 20, 60]); const P = W / t;
   return [T(`Et arbeid på ${nf(W)} J utføres på ${t} s. Hva er effekten?`, `Work of ${nf(W)} J is done in ${t} s. What is the power?`), { n: P, tol: 0.1, u: "W" }, T(`$P = W/t = ${W}/${t} = ${mf(P, 1)}$ W.`, `$P = W/t = ${W}/${t} = ${mf(P, 1)}$ W.`)]; }
);

// ================= VGFY1 3: Elektrisitet =================
TH("VGFY1", 3, `## Hva handler det om?
Elektrisk strøm er ladning som beveger seg. Spenningen driver strømmen, og resistansen bremser den.

## Begreper og formler
- Ohms lov: $U = RI$.
- Effekt: $P = UI = RI^2 = \\dfrac{U^2}{R}$.
- Seriekobling: $R = R_1 + R_2 + \\dots$, samme strøm gjennom alle.
- Parallellkobling: $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$, samme spenning over alle.
- Energi: $E = Pt$ (1 kWh = 3,6 MJ).

> $U = RI$. Serie: summer. Parallell: summer de omvendte verdiene.`,
`## What is it about?
Electric current is charge in motion. The voltage drives the current, and the resistance opposes it.

## Concepts and formulas
- Ohm's law: $U = RI$.
- Power: $P = UI = RI^2 = \\dfrac{U^2}{R}$.
- Series: $R = R_1 + R_2 + \\dots$, the same current through all.
- Parallel: $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$, the same voltage across all.
- Energy: $E = Pt$ (1 kWh = 3.6 MJ).

> $U = RI$. Series: add. Parallel: add the reciprocals.`);
BIQ("VGFY1", 3, [
 ["Hva blir samlet resistans når 10 Ω og 10 Ω kobles i parallell?", { n: 5, tol: 0, u: "Ω" }, "$1/R = 1/10 + 1/10 = 2/10$, så $R = 5$ Ω.", "What is the total resistance of 10 Ω and 10 Ω in parallel?", null, "$1/R = 1/10 + 1/10 = 2/10$, so $R = 5$ Ω."],
 ["I en seriekobling er … lik gjennom alle komponentene.", ["strømmen", "spenningen", "effekten", "resistansen"], "Det finnes bare én vei for strømmen.",
  "In a series circuit, the … is the same through all components.", ["current", "voltage", "power", "resistance"], "There is only one path for the current."]
]);
GEN("VGFY1", 3,
 () => { const U = R.p([4.5, 9, 12, 24, 230]), Rr = R.p([5, 10, 20, 50, 100, 470]); const I = U / Rr;
   return [T(`En motstand på ${Rr} Ω er koblet til ${nf(U, 1)} V. Hvor stor er strømmen?`, `A ${Rr} Ω resistor is connected to ${nf(U, 1)} V. How large is the current?`), { n: I, tol: rel(I, 0.005), u: "A" }, T(`$I = U/R = ${mf(U, 1)}/${Rr} \\approx ${mf(I, 3)}$ A.`, `$I = U/R = ${mf(U, 1)}/${Rr} \\approx ${mf(I, 3)}$ A.`)]; },
 () => { const r1 = R.p([10, 20, 30, 60]), r2 = R.p([10, 20, 30, 60, 90]), par = R.i(0, 1) === 1; const Rt = par ? 1 / (1 / r1 + 1 / r2) : r1 + r2;
   return [T(`${r1} Ω og ${r2} Ω kobles i ${par ? "parallell" : "serie"}. Hva er samlet resistans?`, `${r1} Ω and ${r2} Ω are connected in ${par ? "parallel" : "series"}. What is the total resistance?`), { n: Rt, tol: 0.01, u: "Ω" },
     T(par ? `$1/R = 1/${r1} + 1/${r2}$, så $R \\approx ${mf(Rt, 2)}$ Ω.` : `$R = ${r1} + ${r2} = ${Rt}$ Ω.`, par ? `$1/R = 1/${r1} + 1/${r2}$, so $R \\approx ${mf(Rt, 2)}$ Ω.` : `$R = ${r1} + ${r2} = ${Rt}$ Ω.`)]; },
 () => { const P = R.p([60, 100, 1000, 1500, 2000]), U = 230; const I = P / U;
   return [T(`En ${P} W ovn er koblet til ${U} V. Hvor stor strøm trekker den?`, `A ${P} W heater is connected to ${U} V. How much current does it draw?`), { n: I, tol: rel(I, 0.005), u: "A" }, T(`$I = P/U = ${P}/${U} \\approx ${mf(I, 2)}$ A.`, `$I = P/U = ${P}/${U} \\approx ${mf(I, 2)}$ A.`)]; }
);

// ================= VGFY1 4: Atomer, stråling og universet =================
TH("VGFY1", 4, `## Hva handler det om?
Atomkjerner kan være ustabile og sende ut stråling. Lys fra stjerner og galakser forteller oss hva de består av og hvordan universet utvikler seg.

## Begreper og formler
- Alfastråling (heliumkjerner), betastråling (elektroner eller positroner) og gammastråling (fotoner med høy energi).
- Halveringstid $T_{1/2}$: tiden det tar før halvparten av kjernene har omdannet seg. Igjen etter tid $t$: $N = N_0 \\left(\\tfrac12\\right)^{t/T_{1/2}}$.
- Fotonenergi: $E = hf = \\dfrac{hc}{\\lambda}$, med $h = 6{,}63 \\cdot 10^{-34}$ Js og $c = 3{,}00 \\cdot 10^{8}$ m/s.
- Linjespektre: hvert grunnstoff har sitt eget «fingeravtrykk» av bølgelengder.
- Rødforskyvning og Hubbles lov viser at universet utvider seg.

> Halveringstid: del på 2 for hver halveringstid som har gått.`,
`## What is it about?
Atomic nuclei can be unstable and emit radiation. Light from stars and galaxies tells us what they are made of and how the universe evolves.

## Concepts and formulas
- Alpha radiation (helium nuclei), beta radiation (electrons or positrons) and gamma radiation (high-energy photons).
- Half-life $T_{1/2}$: the time it takes for half of the nuclei to decay. Remaining after time $t$: $N = N_0 \\left(\\tfrac12\\right)^{t/T_{1/2}}$.
- Photon energy: $E = hf = \\dfrac{hc}{\\lambda}$, with $h = 6.63 \\cdot 10^{-34}$ Js and $c = 3.00 \\cdot 10^{8}$ m/s.
- Line spectra: every element has its own "fingerprint" of wavelengths.
- Redshift and Hubble's law show that the universe is expanding.

> Half-life: divide by 2 for each half-life that has passed.`);
BIQ("VGFY1", 4, [
 ["Hva består alfastråling av?", ["Heliumkjerner (2 protoner og 2 nøytroner)", "Elektroner", "Fotoner", "Nøytroner"], "Alfapartikler stoppes av et papirark, men er farlige hvis de kommer inn i kroppen.",
  "What does alpha radiation consist of?", ["Helium nuclei (2 protons and 2 neutrons)", "Electrons", "Photons", "Neutrons"], "Alpha particles are stopped by a sheet of paper but are dangerous if they get inside the body."],
 ["Hva forteller rødforskyvningen i lys fra fjerne galakser?", ["At de beveger seg bort fra oss", "At de er varme", "At de er små", "At de beveger seg mot oss"], "Lyset strekkes mot lengre bølgelengder når kilden fjerner seg. Det viser at universet utvider seg.",
  "What does redshift in light from distant galaxies tell us?", ["That they are moving away from us", "That they are hot", "That they are small", "That they are moving towards us"], "The light is stretched to longer wavelengths when the source moves away. It shows that the universe is expanding."]
]);
GEN("VGFY1", 4,
 () => { const T12 = R.p([2, 5, 8, 30, 5730]), n = R.i(1, 5), N0 = R.p([1000, 8000, 16000, 64000]); const N = N0 / 2 ** n, t = T12 * n;
   return [T(`Et radioaktivt stoff har halveringstid ${nf(T12)} år. Det er ${nf(N0)} kjerner i starten. Hvor mange er igjen etter ${nf(t)} år?`, `A radioactive substance has a half-life of ${nf(T12)} years. There are ${nf(N0)} nuclei at the start. How many remain after ${nf(t)} years?`), { n: N, tol: 0.5, u: "" },
     T(`${nf(t)} år er ${n} halveringstider: $${N0} \\cdot (1/2)^{${n}} = ${N}$.`, `${nf(t)} years is ${n} half-lives: $${N0} \\cdot (1/2)^{${n}} = ${N}$.`)]; },
 () => { const lam = R.p([400, 450, 500, 550, 600, 650, 700]); const E = 6.63e-34 * 3e8 / (lam * 1e-9); const Ez = E * 1e19;
   return [T(`Hva er energien til et foton med bølgelengde ${lam} nm? Oppgi svaret i enheten $10^{-19}$ J.`, `What is the energy of a photon with wavelength ${lam} nm? Give the answer in units of $10^{-19}$ J.`), { n: Ez, tol: 0.02, u: "·10⁻¹⁹ J" },
     T(`$E = \\dfrac{hc}{\\lambda} = \\dfrac{6{,}63 \\cdot 10^{-34} \\cdot 3{,}00 \\cdot 10^{8}}{${lam} \\cdot 10^{-9}} \\approx ${mf(Ez, 2)} \\cdot 10^{-19}$ J.`, `$E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63 \\cdot 10^{-34} \\cdot 3.00 \\cdot 10^{8}}{${lam} \\cdot 10^{-9}} \\approx ${mf(Ez, 2)} \\cdot 10^{-19}$ J.`)]; }
);

// ================= VGKJ1 0: Atomer og periodesystemet =================
TH("VGKJ1", 0, `## Hva handler det om?
Atomet har en kjerne med protoner og nøytroner, og elektroner rundt. Antall protoner bestemmer hvilket grunnstoff det er, og elektronene bestemmer kjemien.

## Begreper
- Atomnummer = antall protoner (= antall elektroner i et nøytralt atom).
- Massetall = protoner + nøytroner. Isotoper har like mange protoner, men ulikt antall nøytroner.
- Elektronene ligger i skall (2, 8, 8, …). Valenselektronene i ytterste skall styrer hvordan stoffet reagerer.
- Periodesystemet: grupper (loddrett) har like mange valenselektroner, perioder (vannrett) har like mange skall.
- Gruppe 1: alkalimetaller. Gruppe 17: halogener. Gruppe 18: edelgasser (fullt ytterskall, lite reaktive).

> Protoner avgjør grunnstoffet. Valenselektroner avgjør kjemien.`,
`## What is it about?
The atom has a nucleus with protons and neutrons, and electrons around it. The number of protons decides which element it is, and the electrons decide its chemistry.

## Concepts
- Atomic number = number of protons (= number of electrons in a neutral atom).
- Mass number = protons + neutrons. Isotopes have the same number of protons but different numbers of neutrons.
- Electrons are arranged in shells (2, 8, 8, …). The valence electrons in the outer shell control how the substance reacts.
- The periodic table: groups (columns) have the same number of valence electrons, periods (rows) have the same number of shells.
- Group 1: alkali metals. Group 17: halogens. Group 18: noble gases (full outer shell, not very reactive).

> Protons decide the element. Valence electrons decide the chemistry.`);
BIQ("VGKJ1", 0, [
 ["Karbon-14 har atomnummer 6. Hvor mange nøytroner har det?", { n: 8, tol: 0, u: "" }, "Nøytroner = massetall − protoner = 14 − 6 = 8.", "Carbon-14 has atomic number 6. How many neutrons does it have?", null, "Neutrons = mass number − protons = 14 − 6 = 8."],
 ["Hvorfor er edelgassene lite reaktive?", ["De har fullt ytterste elektronskall", "De har ingen elektroner", "De er radioaktive", "De har ingen nøytroner"], "Et fullt ytterskall er energimessig stabilt.",
  "Why are the noble gases not very reactive?", ["They have a full outer electron shell", "They have no electrons", "They are radioactive", "They have no neutrons"], "A full outer shell is energetically stable."],
 ["Hvor mange valenselektroner har natrium (gruppe 1)?", { n: 1, tol: 0, u: "" }, "Grupper med nummer 1 og 2 har like mange valenselektroner som gruppenummeret.", "How many valence electrons does sodium (group 1) have?", null, "Groups 1 and 2 have as many valence electrons as the group number."]
]);

// ================= VGKJ1 1: Kjemiske bindinger =================
TH("VGKJ1", 1, `## Hva handler det om?
Atomer binder seg sammen for å få et mer stabilt elektronoppsett. Bindingstypen bestemmer egenskaper som smeltepunkt og løselighet.

## Begreper
- Ionebinding: et metall gir fra seg elektroner til et ikke-metall. Eksempel: NaCl.
- Kovalent binding: ikke-metaller deler elektronpar. Eksempel: H₂O og CH₄.
- Elektronegativitet: hvor sterkt et atom trekker på elektronene. Stor forskjell gir polar binding eller ionebinding.
- Metallbinding: positive metallioner i et «hav» av frie elektroner. Gir ledningsevne.
- Mellom molekyler: hydrogenbindinger (sterkest, for eksempel mellom vannmolekyler), dipol-dipol-bindinger og van der Waals-krefter.

> Metall + ikke-metall: ionebinding. Ikke-metall + ikke-metall: kovalent binding.`,
`## What is it about?
Atoms bond together to get a more stable electron arrangement. The type of bond determines properties such as melting point and solubility.

## Concepts
- Ionic bond: a metal gives electrons to a non-metal. Example: NaCl.
- Covalent bond: non-metals share electron pairs. Example: H₂O and CH₄.
- Electronegativity: how strongly an atom attracts the electrons. A large difference gives a polar bond or an ionic bond.
- Metallic bond: positive metal ions in a "sea" of free electrons. Gives conductivity.
- Between molecules: hydrogen bonds (strongest, for example between water molecules), dipole–dipole forces and van der Waals forces.

> Metal + non-metal: ionic bond. Non-metal + non-metal: covalent bond.`);
BIQ("VGKJ1", 1, [
 ["Hvilken bindingstype finnes i koksalt (NaCl)?", ["Ionebinding", "Kovalent binding", "Metallbinding", "Hydrogenbinding"], "Natrium (metall) gir et elektron til klor (ikke-metall).",
  "What type of bond is found in table salt (NaCl)?", ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], "Sodium (a metal) gives an electron to chlorine (a non-metal)."],
 ["Hvorfor har vann høyt kokepunkt for et så lite molekyl?", ["Hydrogenbindinger mellom molekylene", "Ionebindinger i molekylet", "Metallbindinger", "Vann er tungt"], "Hydrogenbindingene må brytes før vannet kan koke.",
  "Why does water have a high boiling point for such a small molecule?", ["Hydrogen bonds between the molecules", "Ionic bonds within the molecule", "Metallic bonds", "Water is heavy"], "The hydrogen bonds must be broken before the water can boil."],
 ["Hvorfor leder metaller strøm?", ["De har frie elektroner", "De har mange protoner", "De er harde", "De har ionebindinger"], "Elektronene i metallbindingen kan bevege seg fritt.",
  "Why do metals conduct electricity?", ["They have free electrons", "They have many protons", "They are hard", "They have ionic bonds"], "The electrons in the metallic bond can move freely."]
]);

// ================= VGKJ1 2: Stoffmengde og konsentrasjon =================
TH("VGKJ1", 2, `## Hva handler det om?
Kjemikere teller partikler i mol. 1 mol er $6{,}02 \\cdot 10^{23}$ partikler (Avogadros tall).

## Begreper og formler
- Stoffmengde: $n = \\dfrac{m}{M}$ (masse delt på molar masse, g/mol).
- Molar masse finner du ved å summere atommassene: H 1,008, C 12,01, N 14,01, O 16,00, Na 22,99, Cl 35,45.
- Konsentrasjon: $c = \\dfrac{n}{V}$ (mol/L).
- Fortynning: $c_1V_1 = c_2V_2$.
- Reaksjonslikningen gir forholdet mellom stoffmengdene (støkiometri).

> $n = m/M$ og $c = n/V$. Sjekk alltid at likningen er balansert.`,
`## What is it about?
Chemists count particles in moles. 1 mole is $6.02 \\cdot 10^{23}$ particles (Avogadro's number).

## Concepts and formulas
- Amount of substance: $n = \\dfrac{m}{M}$ (mass divided by molar mass, g/mol).
- You find the molar mass by adding atomic masses: H 1.008, C 12.01, N 14.01, O 16.00, Na 22.99, Cl 35.45.
- Concentration: $c = \\dfrac{n}{V}$ (mol/L).
- Dilution: $c_1V_1 = c_2V_2$.
- The reaction equation gives the ratio between the amounts of substance (stoichiometry).

> $n = m/M$ and $c = n/V$. Always check that the equation is balanced.`);
BIQ("VGKJ1", 2, [
 ["Hva er molar masse for vann (H₂O)?", { n: 18.02, tol: 0.02, u: "g/mol" }, "$2 \\cdot 1{,}008 + 16{,}00 = 18{,}02$ g/mol.", "What is the molar mass of water (H₂O)?", null, "$2 \\cdot 1.008 + 16.00 = 18.02$ g/mol."],
 ["Hvor mange partikler er 1 mol?", ["$6{,}02 \\cdot 10^{23}$", "$1000$", "$6{,}02 \\cdot 10^{-23}$", "$3{,}00 \\cdot 10^{8}$"], "Avogadros tall.", "How many particles are in 1 mole?", ["$6.02 \\cdot 10^{23}$", "$1000$", "$6.02 \\cdot 10^{-23}$", "$3.00 \\cdot 10^{8}$"], "Avogadro's number."]
]);
const MM = { "H₂O": 18.02, "NaCl": 58.44, "CO₂": 44.01, "CH₄": 16.04, "NH₃": 17.03, "C₆H₁₂O₆": 180.16, "NaOH": 40.00, "HCl": 36.46 };
GEN("VGKJ1", 2,
 () => { const f = R.p(Object.keys(MM)), m = R.p([5, 10, 18, 25, 50, 100]); const n = m / MM[f];
   return [T(`Hvor mange mol er ${m} g ${f}? (Molar masse ${nf(MM[f], 2)} g/mol.)`, `How many moles is ${m} g of ${f}? (Molar mass ${nf(MM[f], 2)} g/mol.)`), { n, tol: rel(n, 0.005), u: "mol" },
     T(`$n = m/M = ${m}/${mf(MM[f], 2)} \\approx ${mf(n, 3)}$ mol.`, `$n = m/M = ${m}/${mf(MM[f], 2)} \\approx ${mf(n, 3)}$ mol.`)]; },
 () => { const f = R.p(["NaCl", "NaOH", "C₆H₁₂O₆"]), m = R.p([2, 4, 5, 10, 20]), V = R.p([0.1, 0.25, 0.5, 1, 2]); const c = m / MM[f] / V;
   return [T(`${m} g ${f} løses i vann til ${nf(V, 2)} L løsning. Hva er konsentrasjonen? (Molar masse ${nf(MM[f], 2)} g/mol.)`, `${m} g of ${f} is dissolved in water to make ${nf(V, 2)} L of solution. What is the concentration? (Molar mass ${nf(MM[f], 2)} g/mol.)`), { n: c, tol: rel(c, 0.005), u: "mol/L" },
     T(`$n = ${m}/${mf(MM[f], 2)} \\approx ${mf(m / MM[f], 4)}$ mol. $c = n/V \\approx ${mf(c, 3)}$ mol/L.`, `$n = ${m}/${mf(MM[f], 2)} \\approx ${mf(m / MM[f], 4)}$ mol. $c = n/V \\approx ${mf(c, 3)}$ mol/L.`)]; }
);

// ================= VGKJ1 3: Syrer, baser og pH =================
TH("VGKJ1", 3, `## Hva handler det om?
En syre gir fra seg H⁺ (protoner), en base tar dem opp. pH-skalaen viser hvor sur en løsning er.

## Begreper og formler
- $\\text{pH} = -\\lg[\\text{H}_3\\text{O}^+]$ og $[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}$.
- pH 7 er nøytralt (ved 25 °C), under 7 er surt, over 7 er basisk.
- Én pH-enhet er en tidobling av konsentrasjonen av oksoniumioner.
- Sterke syrer (HCl, HNO₃) protolyseres fullstendig: $[\\text{H}_3\\text{O}^+] = c$.
- Nøytralisering: syre + base → salt + vann.
- Buffer: en blanding av en svak syre og dens korresponderende base, som motstår endring i pH.

> pH 3 er ti ganger surere enn pH 4.`,
`## What is it about?
An acid donates H⁺ (protons), a base accepts them. The pH scale shows how acidic a solution is.

## Concepts and formulas
- $\\text{pH} = -\\lg[\\text{H}_3\\text{O}^+]$ and $[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}$.
- pH 7 is neutral (at 25 °C), below 7 is acidic, above 7 is basic.
- One pH unit is a tenfold change in the concentration of oxonium ions.
- Strong acids (HCl, HNO₃) are completely protolysed: $[\\text{H}_3\\text{O}^+] = c$.
- Neutralisation: acid + base → salt + water.
- Buffer: a mixture of a weak acid and its conjugate base, which resists changes in pH.

> pH 3 is ten times more acidic than pH 4.`);
BIQ("VGKJ1", 3, [
 ["Hva er pH i 0,01 mol/L HCl?", { n: 2, tol: 0.01, u: "" }, "Sterk syre: $[\\text{H}_3\\text{O}^+] = 0{,}01$, så $\\text{pH} = -\\lg 0{,}01 = 2$.", "What is the pH of 0.01 mol/L HCl?", null, "Strong acid: $[\\text{H}_3\\text{O}^+] = 0.01$, so $\\text{pH} = -\\lg 0.01 = 2$."],
 ["Hvor mye surere er pH 3 enn pH 5?", ["100 ganger", "2 ganger", "10 ganger", "20 ganger"], "To pH-enheter er $10^2 = 100$ ganger så høy konsentrasjon av oksoniumioner.",
  "How much more acidic is pH 3 than pH 5?", ["100 times", "2 times", "10 times", "20 times"], "Two pH units is $10^2 = 100$ times the concentration of oxonium ions."],
 ["Hva er en buffer?", ["En løsning som motstår endring i pH", "En sterk syre", "Rent vann", "En løsning med pH 7"], "En buffer består av en svak syre og dens korresponderende base.",
  "What is a buffer?", ["A solution that resists changes in pH", "A strong acid", "Pure water", "A solution with pH 7"], "A buffer consists of a weak acid and its conjugate base."]
]);
GEN("VGKJ1", 3,
 () => { const c = R.p([0.1, 0.05, 0.02, 0.01, 0.005, 0.001, 0.0005]); const pH = -Math.log10(c);
   return [T(`Hva er pH i en ${nf(c, 4)} mol/L løsning av den sterke syren HCl?`, `What is the pH of a ${nf(c, 4)} mol/L solution of the strong acid HCl?`), { n: pH, tol: 0.01, u: "" },
     T(`$\\text{pH} = -\\lg ${mf(c, 4)} \\approx ${mf(pH, 2)}$.`, `$\\text{pH} = -\\lg ${mf(c, 4)} \\approx ${mf(pH, 2)}$.`)]; },
 () => { const pH = R.p([1.5, 2, 2.5, 3, 4, 5.5]); const h = Math.pow(10, -pH);
   return [T(`En løsning har pH ${nf(pH, 1)}. Hva er $[\\text{H}_3\\text{O}^+]$ i mol/L?`, `A solution has pH ${nf(pH, 1)}. What is $[\\text{H}_3\\text{O}^+]$ in mol/L?`), { n: h, tol: rel(h, 0.01), u: "mol/L" },
     T(`$[\\text{H}_3\\text{O}^+] = 10^{-${mf(pH, 1)}} \\approx ${mf(h, 6)}$ mol/L.`, `$[\\text{H}_3\\text{O}^+] = 10^{-${mf(pH, 1)}} \\approx ${mf(h, 6)}$ mol/L.`)]; }
);

// ================= VGKJ1 4: Redoksreaksjoner =================
TH("VGKJ1", 4, `## Hva handler det om?
I en redoksreaksjon flyttes elektroner. Batterier, korrosjon (rust) og forbrenning er redoksreaksjoner.

## Begreper
- Oksidasjon: tap av elektroner (oksidasjonstallet øker). Reduksjon: opptak av elektroner (oksidasjonstallet synker).
- Huskeregel: OIL RIG, oxidation is loss, reduction is gain.
- Oksidasjonsmiddelet blir selv redusert, reduksjonsmiddelet blir selv oksidert.
- Oksidasjonstall: grunnstoffer i ren form har 0, O har vanligvis −2, H har vanligvis +1, og summen i en forbindelse er 0.
- Spenningsrekken viser hvilke metaller som lettest gir fra seg elektroner. Et uedelt metall kan beskytte et edlere (offeranode).

> Oksidasjon = tap av elektroner. Reduksjon = opptak av elektroner.`,
`## What is it about?
In a redox reaction, electrons are transferred. Batteries, corrosion (rust) and combustion are redox reactions.

## Concepts
- Oxidation: loss of electrons (the oxidation number increases). Reduction: gain of electrons (the oxidation number decreases).
- Mnemonic: OIL RIG, oxidation is loss, reduction is gain.
- The oxidising agent is itself reduced, the reducing agent is itself oxidised.
- Oxidation numbers: elements in pure form have 0, O usually has −2, H usually has +1, and the sum in a compound is 0.
- The electrochemical series shows which metals most easily give up electrons. A less noble metal can protect a nobler one (sacrificial anode).

> Oxidation = loss of electrons. Reduction = gain of electrons.`);
BIQ("VGKJ1", 4, [
 ["Hva er oksidasjonstallet til S i H₂SO₄?", { n: 6, tol: 0, u: "" }, "$2 \\cdot (+1) + S + 4 \\cdot (-2) = 0$ gir $S = +6$.", "What is the oxidation number of S in H₂SO₄?", null, "$2 \\cdot (+1) + S + 4 \\cdot (-2) = 0$ gives $S = +6$."],
 ["Hva skjer med et stoff som oksideres?", ["Det gir fra seg elektroner", "Det tar opp elektroner", "Det tar opp oksygen, alltid", "Det mister protoner"], "OIL RIG: oxidation is loss (of electrons).",
  "What happens to a substance that is oxidised?", ["It gives up electrons", "It gains electrons", "It always gains oxygen", "It loses protons"], "OIL RIG: oxidation is loss (of electrons)."],
 ["Hvorfor festes sinkanoder på skipsskrog av stål?", ["Sink oksideres lettere enn jern og beskytter stålet", "Sink er sterkere enn stål", "Sink gjør skipet lettere", "Sink hindrer alger"], "Sink er et uedlere metall og ofres i stedet for jernet (offeranode).",
  "Why are zinc anodes attached to steel ship hulls?", ["Zinc is oxidised more easily than iron and protects the steel", "Zinc is stronger than steel", "Zinc makes the ship lighter", "Zinc prevents algae"], "Zinc is a less noble metal and is sacrificed instead of the iron (sacrificial anode)."]
]);

// ================= VGBI1 0: Cellen =================
TH("VGBI1", 0, `## Hva handler det om?
Alt levende er bygd av celler. Cellene tar opp næring, lager energi, bygger proteiner og deler seg.

## Begreper
- Prokaryote celler (bakterier) har ingen cellekjerne. Eukaryote celler (planter, dyr, sopp) har cellekjerne og organeller.
- Mitokondriene lager ATP ved celleånding: glukose + oksygen → karbondioksid + vann + energi.
- Kloroplastene (i planter) driver fotosyntese: karbondioksid + vann + lysenergi → glukose + oksygen.
- Plantecellen har cellevegg, kloroplaster og en stor vakuole, som dyrecellen mangler.
- Cellemembranen er et dobbelt lag av fosfolipider med proteiner. Stoffer passerer ved diffusjon, osmose eller aktiv transport.

> Celleånding og fotosyntese er hverandres motsatte.`,
`## What is it about?
All living things are made of cells. Cells take up nutrients, produce energy, build proteins and divide.

## Concepts
- Prokaryotic cells (bacteria) have no nucleus. Eukaryotic cells (plants, animals, fungi) have a nucleus and organelles.
- The mitochondria produce ATP by cellular respiration: glucose + oxygen → carbon dioxide + water + energy.
- The chloroplasts (in plants) carry out photosynthesis: carbon dioxide + water + light energy → glucose + oxygen.
- The plant cell has a cell wall, chloroplasts and a large vacuole, which the animal cell lacks.
- The cell membrane is a double layer of phospholipids with proteins. Substances pass by diffusion, osmosis or active transport.

> Cellular respiration and photosynthesis are each other's opposites.`);
BIQ("VGBI1", 0, [
 ["Hva mangler prokaryote celler?", ["Cellekjerne", "Cellemembran", "Ribosomer", "DNA"], "Bakterier har DNA, men det ligger fritt i cellen, ikke i en kjerne.",
  "What do prokaryotic cells lack?", ["A nucleus", "A cell membrane", "Ribosomes", "DNA"], "Bacteria have DNA, but it lies freely in the cell, not in a nucleus."],
 ["Hvor foregår fotosyntesen?", ["I kloroplastene", "I mitokondriene", "I cellekjernen", "I ribosomene"], "Kloroplastene inneholder klorofyll, som fanger lysenergi.",
  "Where does photosynthesis take place?", ["In the chloroplasts", "In the mitochondria", "In the nucleus", "In the ribosomes"], "The chloroplasts contain chlorophyll, which captures light energy."],
 ["Hva er osmose?", ["Diffusjon av vann gjennom en halvgjennomtrengelig membran", "Aktiv transport av salter", "Celledeling", "Proteinsyntese"], "Vann går fra der det er lite oppløst stoff til der det er mye.",
  "What is osmosis?", ["Diffusion of water through a semi-permeable membrane", "Active transport of salts", "Cell division", "Protein synthesis"], "Water moves from where there is little dissolved substance to where there is a lot."]
]);

// ================= VGBI1 1: Arv og genetikk =================
TH("VGBI1", 1, `## Hva handler det om?
Genene ligger i DNA og bestemmer hvilke proteiner cellene lager. Ved kjønnet formering får avkommet halvparten av genene fra hver forelder.

## Begreper
- DNA består av nukleotider med basene A, T, C og G (A parer med T, C med G).
- Et gen er en DNA-bit som koder for et protein. Transkripsjon: DNA → mRNA. Translasjon: mRNA → protein (i ribosomene).
- Mitose gir to like celler (vekst og reparasjon). Meiose gir kjønnsceller med halvt antall kromosomer.
- Alleler er varianter av et gen. Dominant allel (A) skjuler recessiv allel (a).
- Krysning Aa × Aa gir forholdet 1 AA : 2 Aa : 1 aa, altså 25 % sannsynlighet for recessiv egenskap.

> Mitose: like kopier. Meiose: halvt kromosomtall og variasjon.`,
`## What is it about?
Genes are found in DNA and determine which proteins the cells make. In sexual reproduction, the offspring gets half its genes from each parent.

## Concepts
- DNA consists of nucleotides with the bases A, T, C and G (A pairs with T, C with G).
- A gene is a piece of DNA that codes for a protein. Transcription: DNA → mRNA. Translation: mRNA → protein (in the ribosomes).
- Mitosis gives two identical cells (growth and repair). Meiosis gives sex cells with half the number of chromosomes.
- Alleles are variants of a gene. A dominant allele (A) masks a recessive allele (a).
- The cross Aa × Aa gives the ratio 1 AA : 2 Aa : 1 aa, i.e. a 25% probability of the recessive trait.

> Mitosis: identical copies. Meiosis: half the chromosome number and variation.`);
BIQ("VGBI1", 1, [
 ["Hvilken base parer med A i DNA?", ["T", "C", "G", "U"], "A–T og C–G. (I RNA parer A med U.)", "Which base pairs with A in DNA?", ["T", "C", "G", "U"], "A–T and C–G. (In RNA, A pairs with U.)"],
 ["To foreldre er begge Aa. Hvor stor er sannsynligheten for at et barn er aa (i prosent)?", { n: 25, tol: 0, u: "%" }, "Krysningsskjemaet gir AA, Aa, aA og aa: 1 av 4 = 25 %.", "Both parents are Aa. What is the probability that a child is aa (in percent)?", null, "The Punnett square gives AA, Aa, aA and aa: 1 in 4 = 25%."],
 ["Hvilken celledeling lager kjønnsceller?", ["Meiose", "Mitose", "Binær deling", "Knoppskyting"], "Meiosen halverer kromosomtallet.", "Which type of cell division produces sex cells?", ["Meiosis", "Mitosis", "Binary fission", "Budding"], "Meiosis halves the chromosome number."],
 ["Hva skjer i translasjonen?", ["mRNA oversettes til et protein i ribosomene", "DNA kopieres", "DNA oversettes til mRNA", "Cellen deler seg"], "Transkripsjon lager mRNA, translasjon bruker mRNA til å lage proteinet.",
  "What happens in translation?", ["mRNA is translated into a protein in the ribosomes", "DNA is copied", "DNA is transcribed into mRNA", "The cell divides"], "Transcription makes mRNA, translation uses mRNA to make the protein."]
]);

// ================= VGBI1 2: Økologi =================
TH("VGBI1", 2, `## Hva handler det om?
Økologi handler om samspillet mellom organismer og miljøet de lever i.

## Begreper
- Produsenter (planter) lager organisk stoff med fotosyntese. Konsumenter spiser andre organismer. Nedbrytere bryter ned dødt materiale.
- Næringskjede: gress → hare → rev. Næringsnett: mange kjeder som henger sammen.
- Bare omtrent 10 % av energien går videre fra ett trofisk nivå til det neste. Resten brukes til celleånding og tapes som varme.
- Stoffer går i kretsløp (karbon, nitrogen), mens energi strømmer gjennom økosystemet.
- Bæreevne: den største bestanden miljøet tåler over tid.

> Energi strømmer, stoffer går i kretsløp. Omtrent 10 % går videre per nivå.`,
`## What is it about?
Ecology is about the interactions between organisms and the environment they live in.

## Concepts
- Producers (plants) make organic matter by photosynthesis. Consumers eat other organisms. Decomposers break down dead material.
- Food chain: grass → hare → fox. Food web: many chains linked together.
- Only about 10% of the energy passes from one trophic level to the next. The rest is used in cellular respiration and lost as heat.
- Matter cycles (carbon, nitrogen), while energy flows through the ecosystem.
- Carrying capacity: the largest population the environment can support over time.

> Energy flows, matter cycles. About 10% passes on per level.`);
BIQ("VGBI1", 2, [
 ["Omtrent hvor mye av energien går videre fra ett trofisk nivå til det neste?", ["10 %", "50 %", "90 %", "100 %"], "Resten brukes til livsprosesser og tapes som varme.",
  "About how much of the energy passes from one trophic level to the next?", ["10%", "50%", "90%", "100%"], "The rest is used for life processes and lost as heat."],
 ["Produsentene har 100 000 kJ. Hvor mye energi når omtrent sekundærkonsumentene (to nivåer opp)?", { n: 1000, tol: 0, u: "kJ" }, "10 % av 10 % er 1 %: 100 000 · 0,01 = 1000 kJ.", "The producers have 100,000 kJ. Roughly how much energy reaches the secondary consumers (two levels up)?", null, "10% of 10% is 1%: 100,000 · 0.01 = 1000 kJ."],
 ["Hva gjør nedbryterne?", ["Bryter ned dødt organisk materiale og frigjør næringsstoffer", "Lager oksygen", "Spiser planter", "Driver fotosyntese"], "Uten nedbrytere ville ikke næringsstoffene gått i kretsløp.",
  "What do decomposers do?", ["Break down dead organic material and release nutrients", "Produce oxygen", "Eat plants", "Carry out photosynthesis"], "Without decomposers, nutrients would not cycle."]
]);

// ================= VGBI1 3: Evolusjon =================
TH("VGBI1", 3, `## Hva handler det om?
Evolusjon er endring i arveegenskapene til en populasjon over generasjoner. Den viktigste drivkraften er naturlig seleksjon.

## Begreper
- Variasjon: individer i en populasjon er forskjellige, blant annet på grunn av mutasjoner og kjønnet formering.
- Naturlig seleksjon: individer med egenskaper som passer godt til miljøet, får flere avkom, så disse egenskapene blir vanligere.
- Tilpasning: en egenskap som øker sjansen for å overleve og formere seg.
- Artsdannelse skjer ofte når populasjoner blir isolert fra hverandre.
- Bevis for evolusjon: fossiler, DNA-likheter, homologe organer og observert evolusjon (for eksempel antibiotikaresistens).

> Variasjon + seleksjon + arv + tid = evolusjon.`,
`## What is it about?
Evolution is change in the heritable traits of a population over generations. The main driving force is natural selection.

## Concepts
- Variation: individuals in a population differ, partly because of mutations and sexual reproduction.
- Natural selection: individuals with traits that suit the environment well have more offspring, so these traits become more common.
- Adaptation: a trait that increases the chance of surviving and reproducing.
- Speciation often happens when populations become isolated from each other.
- Evidence for evolution: fossils, DNA similarities, homologous organs and observed evolution (for example antibiotic resistance).

> Variation + selection + inheritance + time = evolution.`);
BIQ("VGBI1", 3, [
 ["Hva er naturlig seleksjon?", ["At individer med gunstige egenskaper får flere avkom", "At individer endrer seg for å passe inn", "At alle individer overlever", "At mennesker velger dyr for avl"], "Individene endrer seg ikke selv. Det er andelen av egenskapene i populasjonen som endres.",
  "What is natural selection?", ["Individuals with favourable traits having more offspring", "Individuals changing to fit in", "All individuals surviving", "Humans choosing animals for breeding"], "Individuals do not change themselves. It is the proportion of traits in the population that changes."],
 ["Hva er den opprinnelige kilden til ny genetisk variasjon?", ["Mutasjoner", "Naturlig seleksjon", "Tilpasning", "Konkurranse"], "Mutasjoner gir nye alleler. Seleksjonen avgjør hvilke som blir vanlige.",
  "What is the original source of new genetic variation?", ["Mutations", "Natural selection", "Adaptation", "Competition"], "Mutations produce new alleles. Selection decides which ones become common."],
 ["Hvorfor er antibiotikaresistens et eksempel på evolusjon?", ["Resistente bakterier overlever og formerer seg når antibiotika dreper de andre", "Bakteriene lærer seg å tåle antibiotika", "Antibiotika gjør bakteriene større", "Det er ikke evolusjon"], "Antibiotikaen selekterer for bakterier som tilfeldigvis allerede er resistente.",
  "Why is antibiotic resistance an example of evolution?", ["Resistant bacteria survive and multiply when antibiotics kill the others", "The bacteria learn to tolerate antibiotics", "Antibiotics make the bacteria bigger", "It is not evolution"], "The antibiotic selects for bacteria that happen to be resistant already."]
]);
})();
