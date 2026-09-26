// ============================================================
//  add_vgs_e.js – Matematikk R1 og R2: nye enheter + flere oppgaver i de gamle
//  R1: grenseverdier, derivasjonsregler, optimering, parameterframstilling, bevis
//  R2: integrasjonsmetoder, areal og volum, induksjon, linjer og plan i rommet
// ============================================================
(() => {
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const xm = a => a < 0 ? `x + ${-a}` : a === 0 ? "x" : `x - ${a}`;
const vec = v => `[${v.map(x => mf(x, 3)).join(", ")}]`;

// ============================================================
//  R1
// ============================================================
const R1_LIM = ADDUNIT("VGR1", "Grenseverdier og kontinuitet", "Limits and continuity");
const R1_DER = ADDUNIT("VGR1", "Derivasjonsregler i praksis", "Differentiation rules in practice");
const R1_OPT = ADDUNIT("VGR1", "Optimering", "Optimisation");
const R1_PAR = ADDUNIT("VGR1", "Parameterframstillinger", "Parametric curves");
const R1_BEV = ADDUNIT("VGR1", "Logikk og bevis", "Logic and proof");

// ---------------- Grenseverdier og kontinuitet ----------------
TH("VGR1", R1_LIM, `## Hva handler det om?
En grenseverdi beskriver hva $f(x)$ nærmer seg når $x$ nærmer seg et tall (eller går mot uendelig), selv om funksjonen ikke er definert akkurat der. Grenseverdier er grunnmuren under derivasjon.

## Begreper og formler
- $\\lim\\limits_{x \\to a} f(x) = L$: $f(x)$ kommer så nær $L$ vi vil når $x$ er nær nok $a$.
- «$\\tfrac{0}{0}$» betyr ikke at svaret er 0 eller 1. **Faktoriser og forkort** først: $\\lim\\limits_{x \\to 3}\\dfrac{x^2 - 9}{x - 3} = \\lim\\limits_{x \\to 3}(x + 3) = 6$.
- Når $x \\to \\infty$ i en brøk av polynomer: del på den høyeste potensen i nevneren. $\\lim\\limits_{x \\to \\infty}\\dfrac{2x + 1}{x - 4} = 2$.
- $f$ er **kontinuerlig** i $a$ når $f(a)$ finnes og $\\lim\\limits_{x \\to a} f(x) = f(a)$: grafen kan tegnes uten å løfte blyanten.
- Delt funksjonsforskrift: de to delene må gi samme verdi i skjøten for at $f$ skal være kontinuerlig.
- Definisjonen av den deriverte: $f'(x) = \\lim\\limits_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$.

### Eksempel
$f(x) = \\begin{cases} x^2 + k, & x < 1 \\\\ 2x + 3, & x \\ge 1 \\end{cases}$. Kontinuitet i $x = 1$ krever $1 + k = 5$, altså $k = 4$.

> «0 delt på 0» er et signal om å faktorisere, ikke et svar.`,
`## What is it about?
A limit describes what $f(x)$ approaches when $x$ approaches a number (or tends to infinity), even if the function is not defined exactly there. Limits are the foundation of differentiation.

## Concepts and formulas
- $\\lim\\limits_{x \\to a} f(x) = L$: $f(x)$ gets as close to $L$ as we like when $x$ is close enough to $a$.
- "$\\tfrac{0}{0}$" does not mean the answer is 0 or 1. **Factorise and cancel** first: $\\lim\\limits_{x \\to 3}\\dfrac{x^2 - 9}{x - 3} = \\lim\\limits_{x \\to 3}(x + 3) = 6$.
- When $x \\to \\infty$ in a fraction of polynomials: divide by the highest power in the denominator. $\\lim\\limits_{x \\to \\infty}\\dfrac{2x + 1}{x - 4} = 2$.
- $f$ is **continuous** at $a$ when $f(a)$ exists and $\\lim\\limits_{x \\to a} f(x) = f(a)$: the graph can be drawn without lifting the pencil.
- Piecewise function: the two parts must give the same value at the joint for $f$ to be continuous.
- The definition of the derivative: $f'(x) = \\lim\\limits_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$.

### Example
$f(x) = \\begin{cases} x^2 + k, & x < 1 \\\\ 2x + 3, & x \\ge 1 \\end{cases}$. Continuity at $x = 1$ requires $1 + k = 5$, so $k = 4$.

> "0 divided by 0" is a signal to factorise, not an answer.`);
BIQ("VGR1", R1_LIM, [
 ["Finn $\\lim\\limits_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}$.", { n: 6, tol: 0, u: "" }, "$\\dfrac{(x + 3)(x - 3)}{x - 3} = x + 3 \\to 6$.",
  "Find $\\lim\\limits_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}$.", null, "$\\dfrac{(x + 3)(x - 3)}{x - 3} = x + 3 \\to 6$."],
 ["Finn $\\lim\\limits_{x \\to \\infty}\\dfrac{2x + 1}{x - 4}$.", { n: 2, tol: 0, u: "" }, "Del på $x$: $\\dfrac{2 + 1/x}{1 - 4/x} \\to \\dfrac{2}{1} = 2$.",
  "Find $\\lim\\limits_{x \\to \\infty}\\dfrac{2x + 1}{x - 4}$.", null, "Divide by $x$: $\\dfrac{2 + 1/x}{1 - 4/x} \\to \\dfrac{2}{1} = 2$."],
 ["Finn $\\lim\\limits_{x \\to \\infty}\\dfrac{3x^2}{x^3 + 1}$.", { n: 0, tol: 0, u: "" }, "Nevneren vokser raskere (grad 3 mot grad 2), så brøken går mot 0.",
  "Find $\\lim\\limits_{x \\to \\infty}\\dfrac{3x^2}{x^3 + 1}$.", null, "The denominator grows faster (degree 3 against degree 2), so the fraction tends to 0."],
 ["Hva betyr det at $f$ er kontinuerlig i $x = a$?", ["$\\lim\\limits_{x \\to a} f(x) = f(a)$", "$f(a) = 0$", "$f'(a) = 0$", "$f$ er definert for alle $x$"], "Grenseverdien må finnes og være lik funksjonsverdien.",
  "What does it mean that $f$ is continuous at $x = a$?", ["$\\lim\\limits_{x \\to a} f(x) = f(a)$", "$f(a) = 0$", "$f'(a) = 0$", "$f$ is defined for all $x$"], "The limit must exist and equal the function value."],
 ["Hvilket uttrykk er definisjonen av $f'(x)$?", ["$\\lim\\limits_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$", "$\\lim\\limits_{h \\to 0}\\dfrac{f(x + h)}{h}$", "$\\dfrac{f(x + h) - f(x)}{x}$", "$\\lim\\limits_{x \\to 0} f(x)$"], "Stigningen til sekanten mellom $x$ og $x + h$, når $h$ går mot 0.",
  "Which expression is the definition of $f'(x)$?", ["$\\lim\\limits_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$", "$\\lim\\limits_{h \\to 0}\\dfrac{f(x + h)}{h}$", "$\\dfrac{f(x + h) - f(x)}{x}$", "$\\lim\\limits_{x \\to 0} f(x)$"], "The slope of the secant between $x$ and $x + h$, as $h$ tends to 0."],
 ["$\\lim\\limits_{x \\to 0}\\dfrac{1}{x^2}$ er …", ["uendelig (finnes ikke som tall)", "0", "1", "$-\\infty$"], "$\\dfrac{1}{x^2}$ blir vilkårlig stor når $x$ nærmer seg 0, fra begge sider.",
  "$\\lim\\limits_{x \\to 0}\\dfrac{1}{x^2}$ is …", ["infinite (does not exist as a number)", "0", "1", "$-\\infty$"], "$\\dfrac{1}{x^2}$ becomes arbitrarily large as $x$ approaches 0, from both sides."]
]);
GEN("VGR1", R1_LIM,
 () => { const a = R.p([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
   return [T(`Finn $\\lim\\limits_{x \\to ${a}}\\dfrac{x^2 - ${a * a}}{${xm(a)}}$.`, `Find $\\lim\\limits_{x \\to ${a}}\\dfrac{x^2 - ${a * a}}{${xm(a)}}$.`), { n: 2 * a, tol: 0, u: "" },
     T(`$\\dfrac{(${xm(-a)})(${xm(a)})}{${xm(a)}} = ${xm(-a)} \\to ${a} + ${a} = ${2 * a}$.`, `$\\dfrac{(${xm(-a)})(${xm(a)})}{${xm(a)}} = ${xm(-a)} \\to ${a} + ${a} = ${2 * a}$.`)]; },
 () => { const [r, s] = R.distinct(2, -5, 5); const b = -(r + s), c = r * s, v = r - s;
   return [T(`Finn $\\lim\\limits_{x \\to ${r}}\\dfrac{${pl([[1, "x^2"], [b, "x"], [c, ""]])}}{${xm(r)}}$.`, `Find $\\lim\\limits_{x \\to ${r}}\\dfrac{${pl([[1, "x^2"], [b, "x"], [c, ""]])}}{${xm(r)}}$.`), { n: v, tol: 0, u: "" },
     T(`Telleren er $(${xm(r)})(${xm(s)})$. Forkort: $${xm(s)} \\to ${r} - (${s}) = ${v}$.`, `The numerator is $(${xm(r)})(${xm(s)})$. Cancel: $${xm(s)} \\to ${r} - (${s}) = ${v}$.`)]; },
 () => { const a = R.p([1, 2, 3, 4, 5, -2, -3]), c = R.p([1, 2, 4, 5, -1]), b = R.i(-5, 5), d = R.i(-5, 5), v = a / c;
   return [T(`Finn $\\lim\\limits_{x \\to \\infty}\\dfrac{${pl([[a, "x^2"], [b, ""]])}}{${pl([[c, "x^2"], [d, "x"]])}}$.`, `Find $\\lim\\limits_{x \\to \\infty}\\dfrac{${pl([[a, "x^2"], [b, ""]])}}{${pl([[c, "x^2"], [d, "x"]])}}$.`), { n: v, tol: 0.001, u: "" },
     T(`Del på $x^2$: de andre leddene går mot 0, så grenseverdien er $\\dfrac{${a}}{${c}} = ${mf(v, 3)}$.`, `Divide by $x^2$: the other terms tend to 0, so the limit is $\\dfrac{${a}}{${c}} = ${mf(v, 3)}$.`)]; },
 () => { const p = R.p([1, 2, -1, 3]), a = R.i(-3, 4), b = R.i(-5, 5), k = a * p + b - p * p;
   return [T(`$f(x) = x^2 + k$ for $x < ${p}$ og $f(x) = ${pl([[a, "x"], [b, ""]])}$ for $x \\ge ${p}$. Hvilken $k$ gjør $f$ kontinuerlig?`, `$f(x) = x^2 + k$ for $x < ${p}$ and $f(x) = ${pl([[a, "x"], [b, ""]])}$ for $x \\ge ${p}$. Which $k$ makes $f$ continuous?`), { n: k, tol: 0, u: "" },
     T(`I $x = ${p}$ må $${p * p} + k = ${a * p + b}$, så $k = ${k}$.`, `At $x = ${p}$ we need $${p * p} + k = ${a * p + b}$, so $k = ${k}$.`)]; }
);

// ---------------- Derivasjonsregler i praksis ----------------
TH("VGR1", R1_DER, `## Hva handler det om?
Her trener du på reglene du trenger for å derivere alt i R1: potenser, $e^x$, $\\ln x$, og kombinasjoner med produkt-, brøk- og kjerneregelen.

## Begreper og formler
- $(x^n)' = nx^{n-1}$, $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$.
- Kjerneregelen: $\\big(e^{kx}\\big)' = ke^{kx}$, $\\big(\\ln u\\big)' = \\dfrac{u'}{u}$, $\\big((ax + b)^n\\big)' = na(ax + b)^{n-1}$.
- Produktregelen: $(uv)' = u'v + uv'$. Eksempel: $(x e^x)' = e^x + xe^x = (1 + x)e^x$.
- Brøkregelen: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$. Eksempel: $\\left(\\dfrac{x}{x + 1}\\right)' = \\dfrac{1}{(x + 1)^2}$.

### Fremgangsmåte
1. Se etter strukturen: er det et produkt, en brøk eller en funksjon av en funksjon?
2. Velg regel og skriv opp $u$, $v$ (eller kjernen $u$) og deres deriverte.
3. Sett sammen og forenkle. Sett inn tall helt til slutt.

> Kjernen deriveres alltid til slutt: «ytre derivert ganger indre derivert».`,
`## What is it about?
Here you practise the rules you need to differentiate everything in R1: powers, $e^x$, $\\ln x$, and combinations with the product, quotient and chain rules.

## Concepts and formulas
- $(x^n)' = nx^{n-1}$, $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$.
- The chain rule: $\\big(e^{kx}\\big)' = ke^{kx}$, $\\big(\\ln u\\big)' = \\dfrac{u'}{u}$, $\\big((ax + b)^n\\big)' = na(ax + b)^{n-1}$.
- The product rule: $(uv)' = u'v + uv'$. Example: $(x e^x)' = e^x + xe^x = (1 + x)e^x$.
- The quotient rule: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$. Example: $\\left(\\dfrac{x}{x + 1}\\right)' = \\dfrac{1}{(x + 1)^2}$.

### Method
1. Look at the structure: is it a product, a quotient or a function of a function?
2. Choose the rule and write down $u$, $v$ (or the inner function $u$) and their derivatives.
3. Put it together and simplify. Insert numbers at the very end.

> The inner function is always differentiated last: "outer derivative times inner derivative".`);
BIQ("VGR1", R1_DER, [
 ["Deriver $f(x) = e^{3x}$.", ["$3e^{3x}$", "$e^{3x}$", "$3xe^{3x - 1}$", "$e^{3}$"], "Kjerneregelen: $u = 3x$, $u' = 3$.",
  "Differentiate $f(x) = e^{3x}$.", ["$3e^{3x}$", "$e^{3x}$", "$3xe^{3x - 1}$", "$e^{3}$"], "The chain rule: $u = 3x$, $u' = 3$."],
 ["Deriver $f(x) = \\ln(x^2 + 1)$.", ["$\\dfrac{2x}{x^2 + 1}$", "$\\dfrac{1}{x^2 + 1}$", "$\\dfrac{1}{2x}$", "$2x\\ln(x^2 + 1)$"], "$(\\ln u)' = u'/u$ med $u = x^2 + 1$.",
  "Differentiate $f(x) = \\ln(x^2 + 1)$.", ["$\\dfrac{2x}{x^2 + 1}$", "$\\dfrac{1}{x^2 + 1}$", "$\\dfrac{1}{2x}$", "$2x\\ln(x^2 + 1)$"], "$(\\ln u)' = u'/u$ with $u = x^2 + 1$."],
 ["Deriver $f(x) = xe^x$.", ["$(1 + x)e^x$", "$e^x$", "$xe^x$", "$xe^{x - 1}$"], "Produktregelen: $1 \\cdot e^x + x \\cdot e^x$.",
  "Differentiate $f(x) = xe^x$.", ["$(1 + x)e^x$", "$e^x$", "$xe^x$", "$xe^{x - 1}$"], "The product rule: $1 \\cdot e^x + x \\cdot e^x$."],
 ["Deriver $f(x) = \\dfrac{x}{x + 1}$.", ["$\\dfrac{1}{(x + 1)^2}$", "$\\dfrac{1}{x + 1}$", "$1$", "$\\dfrac{2x + 1}{(x + 1)^2}$"], "$\\dfrac{1 \\cdot (x + 1) - x \\cdot 1}{(x + 1)^2} = \\dfrac{1}{(x + 1)^2}$.",
  "Differentiate $f(x) = \\dfrac{x}{x + 1}$.", ["$\\dfrac{1}{(x + 1)^2}$", "$\\dfrac{1}{x + 1}$", "$1$", "$\\dfrac{2x + 1}{(x + 1)^2}$"], "$\\dfrac{1 \\cdot (x + 1) - x \\cdot 1}{(x + 1)^2} = \\dfrac{1}{(x + 1)^2}$."],
 ["$f(x) = \\ln x$. Regn ut $f'(4)$.", { n: 0.25, tol: 0.0001, u: "" }, "$f'(x) = 1/x$, så $f'(4) = 1/4 = 0{,}25$.",
  "$f(x) = \\ln x$. Calculate $f'(4)$.", null, "$f'(x) = 1/x$, so $f'(4) = 1/4 = 0.25$."],
 ["$f(x) = (2x - 1)^5$. Regn ut $f'(1)$.", { n: 10, tol: 0, u: "" }, "$f'(x) = 5 \\cdot 2(2x - 1)^4$, så $f'(1) = 10 \\cdot 1 = 10$.",
  "$f(x) = (2x - 1)^5$. Calculate $f'(1)$.", null, "$f'(x) = 5 \\cdot 2(2x - 1)^4$, so $f'(1) = 10 \\cdot 1 = 10$."]
]);
GEN("VGR1", R1_DER,
 () => { const a = R.p([1, 2, 3, 5, -2]), k = R.p([-2, -1, -0.5, 0.5, 1, 2, 3]), x0 = R.p([0, 0.5, 1, 2, -1]), v = a * k * Math.exp(k * x0);
   return [T(`$f(x) = ${a === 1 ? "" : a}e^{${mf(k)}x}$. Regn ut $f'(${mf(x0)})$.`, `$f(x) = ${a === 1 ? "" : a}e^{${mf(k)}x}$. Calculate $f'(${mf(x0)})$.`), { n: v, tol: rel(v, 0.01, 0.01), u: "" },
     T(`$f'(x) = ${mf(a * k)}e^{${mf(k)}x}$, så $f'(${mf(x0)}) = ${mf(a * k)} \\cdot e^{${mf(k * x0)}} = ${mf(v, 3)}$.`, `$f'(x) = ${mf(a * k)}e^{${mf(k)}x}$, so $f'(${mf(x0)}) = ${mf(a * k)} \\cdot e^{${mf(k * x0)}} = ${mf(v, 3)}$.`)]; },
 () => { const a = R.p([1, 2, 3, 4]), b = R.i(1, 6), x0 = R.i(0, 5), v = a / (a * x0 + b);
   return [T(`$f(x) = \\ln(${pl([[a, "x"], [b, ""]])})$. Regn ut $f'(${x0})$.`, `$f(x) = \\ln(${pl([[a, "x"], [b, ""]])})$. Calculate $f'(${x0})$.`), { n: v, tol: 0.001, u: "" },
     T(`$f'(x) = \\dfrac{${a}}{${pl([[a, "x"], [b, ""]])}}$, så $f'(${x0}) = \\dfrac{${a}}{${a * x0 + b}} = ${mf(v, 4)}$.`, `$f'(x) = \\dfrac{${a}}{${pl([[a, "x"], [b, ""]])}}$, so $f'(${x0}) = \\dfrac{${a}}{${a * x0 + b}} = ${mf(v, 4)}$.`)]; },
 () => { const a = R.p([2, 3, -1, 1]), b = R.i(-3, 3), n = R.p([2, 3, 4]), x0 = R.i(-1, 2), v = n * a * (a * x0 + b) ** (n - 1);
   return [T(`$f(x) = (${pl([[a, "x"], [b, ""]])})^{${n}}$. Regn ut $f'(${x0})$.`, `$f(x) = (${pl([[a, "x"], [b, ""]])})^{${n}}$. Calculate $f'(${x0})$.`), { n: v, tol: 0, u: "" },
     T(`Kjerneregelen: $f'(x) = ${n} \\cdot ${a}(${pl([[a, "x"], [b, ""]])})^{${n - 1}}$, så $f'(${x0}) = ${n * a} \\cdot (${a * x0 + b})^{${n - 1}} = ${v}$.`, `The chain rule: $f'(x) = ${n} \\cdot ${a}(${pl([[a, "x"], [b, ""]])})^{${n - 1}}$, so $f'(${x0}) = ${n * a} \\cdot (${a * x0 + b})^{${n - 1}} = ${v}$.`)]; },
 () => { const n = R.p([1, 2, 3]), k = R.p([1, -1, 2]), x0 = R.p([1, 2, 0.5]), v = (n * x0 ** (n - 1) + k * x0 ** n) * Math.exp(k * x0);
   return [T(`$f(x) = x^{${n}}e^{${cf(k)}x}$. Regn ut $f'(${mf(x0)})$.`, `$f(x) = x^{${n}}e^{${cf(k)}x}$. Calculate $f'(${mf(x0)})$.`), { n: v, tol: rel(v, 0.01, 0.01), u: "" },
     T(`Produktregelen: $f'(x) = ${n === 1 ? "" : n}${n > 1 ? `x^{${n - 1}}` : ""}e^{${cf(k)}x} + ${k === 1 ? "" : k === -1 ? "-" : k}x^{${n}}e^{${cf(k)}x}$. I $x = ${mf(x0)}$: $${mf(v, 3)}$.`, `The product rule: $f'(x) = ${n === 1 ? "" : n}${n > 1 ? `x^{${n - 1}}` : ""}e^{${cf(k)}x} + ${k === 1 ? "" : k === -1 ? "-" : k}x^{${n}}e^{${cf(k)}x}$. At $x = ${mf(x0)}$: $${mf(v, 3)}$.`)]; },
 () => { const a = R.p([1, 2, 3]), b = R.i(-3, 3), c = 1, d = R.p([1, 2, 3, 4]), x0 = R.i(0, 3), v = (a * d - b * c) / (c * x0 + d) ** 2;
   return [T(`$f(x) = \\dfrac{${pl([[a, "x"], [b, ""]])}}{x + ${d}}$. Regn ut $f'(${x0})$.`, `$f(x) = \\dfrac{${pl([[a, "x"], [b, ""]])}}{x + ${d}}$. Calculate $f'(${x0})$.`), { n: v, tol: 0.001, u: "" },
     T(`Brøkregelen: $f'(x) = \\dfrac{${a}(x + ${d}) - (${pl([[a, "x"], [b, ""]])})}{(x + ${d})^2} = \\dfrac{${a * d - b}}{(x + ${d})^2}$. $f'(${x0}) = \\dfrac{${a * d - b}}{${(x0 + d) ** 2}} = ${mf(v, 4)}$.`, `The quotient rule: $f'(x) = \\dfrac{${a}(x + ${d}) - (${pl([[a, "x"], [b, ""]])})}{(x + ${d})^2} = \\dfrac{${a * d - b}}{(x + ${d})^2}$. $f'(${x0}) = \\dfrac{${a * d - b}}{${(x0 + d) ** 2}} = ${mf(v, 4)}$.`)]; }
);

// ---------------- Optimering ----------------
TH("VGR1", R1_OPT, `## Hva handler det om?
Optimering er å finne den største eller minste verdien av noe: størst areal, minst materialbruk, størst overskudd. Den deriverte er null i topp- og bunnpunktene, så det er der du leter.

## Fremgangsmåte
1. Tegn en figur og gi størrelsene navn.
2. Skriv størrelsen du vil optimere som en funksjon av **én** variabel. Bruk bibetingelsen (f.eks. fast omkrets) til å fjerne de andre.
3. Finn definisjonsmengden (lengder kan ikke være negative).
4. Løs $f'(x) = 0$ og sjekk med fortegnslinje eller $f''(x)$ at det er et topp- eller bunnpunkt.
5. Sjekk endepunktene og svar på spørsmålet med enhet.

### Eksempel: gjerde mot en vegg
Du har 40 m gjerde og vil gjerde inn et rektangel mot en vegg (veggen er den ene langsiden). Med bredde $x$ blir lengden $40 - 2x$, og arealet $A(x) = x(40 - 2x) = 40x - 2x^2$.
$A'(x) = 40 - 4x = 0$ gir $x = 10$ m. Da er lengden 20 m og arealet $A(10) = 200$ m².

### Eksempel: eske av en plate
Fra en kvadratisk plate med side 30 cm klipper du bort kvadrater med side $x$ i hjørnene og bretter opp. Volumet er $V(x) = x(30 - 2x)^2$, der $0 < x < 15$. $V'(x) = 0$ gir $x = 5$ cm og $V = 2000$ cm³.

> Et optimum er enten der $f'(x) = 0$ eller i et endepunkt. Sjekk begge.`,
`## What is it about?
Optimisation is finding the largest or smallest value of something: largest area, least material, largest profit. The derivative is zero at maxima and minima, so that is where you look.

## Method
1. Draw a figure and name the quantities.
2. Write the quantity you want to optimise as a function of **one** variable. Use the constraint (e.g. a fixed perimeter) to remove the others.
3. Find the domain (lengths cannot be negative).
4. Solve $f'(x) = 0$ and check with a sign chart or $f''(x)$ that it is a maximum or minimum.
5. Check the endpoints and answer the question with units.

### Example: a fence against a wall
You have 40 m of fence and want to enclose a rectangle against a wall (the wall is one long side). With width $x$ the length is $40 - 2x$, and the area is $A(x) = x(40 - 2x) = 40x - 2x^2$.
$A'(x) = 40 - 4x = 0$ gives $x = 10$ m. Then the length is 20 m and the area $A(10) = 200$ m².

### Example: a box from a sheet
From a square sheet with side 30 cm you cut away squares with side $x$ in the corners and fold up. The volume is $V(x) = x(30 - 2x)^2$, where $0 < x < 15$. $V'(x) = 0$ gives $x = 5$ cm and $V = 2000$ cm³.

> An optimum is either where $f'(x) = 0$ or at an endpoint. Check both.`);
BIQ("VGR1", R1_OPT, [
 ["Et rektangel har omkrets 40 m. Hva er det største mulige arealet?", { n: 100, tol: 0, u: "m²" }, "$A(x) = x(20 - x)$ har toppunkt i $x = 10$. Kvadratet $10 \\times 10$ gir 100 m².",
  "A rectangle has perimeter 40 m. What is the largest possible area?", null, "$A(x) = x(20 - x)$ has its maximum at $x = 10$. The $10 \\times 10$ square gives 100 m²."],
 ["$f(x) = -x^2 + 6x$ på $[0, 10]$. Hva er den største verdien?", { n: 9, tol: 0, u: "" }, "$f'(x) = -2x + 6 = 0$ gir $x = 3$ og $f(3) = 9$. Endepunktene gir $f(0) = 0$ og $f(10) = -40$.",
  "$f(x) = -x^2 + 6x$ on $[0, 10]$. What is the largest value?", null, "$f'(x) = -2x + 6 = 0$ gives $x = 3$ and $f(3) = 9$. The endpoints give $f(0) = 0$ and $f(10) = -40$."],
 ["Hvorfor må du sjekke endepunktene?", ["Største eller minste verdi kan ligge der selv om $f' \\ne 0$", "Fordi $f'$ alltid er null der", "Det må du ikke", "For å finne nullpunktene"], "På et lukket intervall kan ekstremverdien ligge i kanten, der grafen bare fortsetter å stige eller synke.",
  "Why must you check the endpoints?", ["The largest or smallest value can be there even if $f' \\ne 0$", "Because $f'$ is always zero there", "You don't have to", "To find the zeros"], "On a closed interval the extreme value can lie at the edge, where the graph just keeps rising or falling."],
 ["To positive tall har sum 12. Hva er det største mulige produktet?", { n: 36, tol: 0, u: "" }, "$P(x) = x(12 - x)$, $P'(x) = 12 - 2x = 0$ gir $x = 6$ og $P = 36$.",
  "Two positive numbers have sum 12. What is the largest possible product?", null, "$P(x) = x(12 - x)$, $P'(x) = 12 - 2x = 0$ gives $x = 6$ and $P = 36$."],
 ["Overskudd $O(x) = I(x) - K(x)$ er størst når …", ["$I'(x) = K'(x)$ (grenseinntekt = grensekostnad)", "$I(x) = K(x)$", "$K(x) = 0$", "$I'(x) = 0$"], "$O'(x) = I'(x) - K'(x) = 0$ gir $I'(x) = K'(x)$.",
  "Profit $O(x) = I(x) - K(x)$ is largest when …", ["$I'(x) = K'(x)$ (marginal revenue = marginal cost)", "$I(x) = K(x)$", "$K(x) = 0$", "$I'(x) = 0$"], "$O'(x) = I'(x) - K'(x) = 0$ gives $I'(x) = K'(x)$."]
]);
GEN("VGR1", R1_OPT,
 () => { const L = R.p([20, 24, 40, 60, 80, 100, 120]), x = L / 4, A = L * L / 8;
   return [T(`Du har ${L} m gjerde og skal gjerde inn et rektangel mot en vegg (veggen trenger ikke gjerde). Hva er det største arealet du kan få?`, `You have ${L} m of fence to enclose a rectangle against a wall (the wall needs no fence). What is the largest area you can get?`), { n: A, tol: 0.5, u: "m²" },
     T(`$A(x) = x(${L} - 2x)$, $A'(x) = ${L} - 4x = 0$ gir $x = ${mf(x)}$ m. Arealet er $${mf(x)} \\cdot ${mf(L / 2)} = ${mf(A)}$ m².`, `$A(x) = x(${L} - 2x)$, $A'(x) = ${L} - 4x = 0$ gives $x = ${mf(x)}$ m. The area is $${mf(x)} \\cdot ${mf(L / 2)} = ${mf(A)}$ m².`)]; },
 () => { const s = R.p([12, 18, 24, 30, 36, 60]), x = s / 6, V = x * (s - 2 * x) ** 2;
   return [T(`Fra en kvadratisk plate med side ${s} cm klippes like kvadrater ut av hjørnene, og kantene brettes opp til en åpen eske. Hvor stor side $x$ (cm) skal kvadratene ha for størst volum?`, `From a square sheet with side ${s} cm, equal squares are cut from the corners and the edges folded up into an open box. What side $x$ (cm) should the squares have for the largest volume?`), { n: x, tol: 0.01, u: "cm" },
     T(`$V(x) = x(${s} - 2x)^2$. $V'(x) = (${s} - 2x)(${s} - 6x) = 0$ gir $x = ${mf(x)}$ cm (den andre løsningen gir volum 0). Volumet blir $${mf(V)}$ cm³.`, `$V(x) = x(${s} - 2x)^2$. $V'(x) = (${s} - 2x)(${s} - 6x) = 0$ gives $x = ${mf(x)}$ cm (the other solution gives zero volume). The volume becomes $${mf(V)}$ cm³.`)]; },
 () => { const a = R.p([0.5, 1, 2, 0.2, 0.1]), b = R.p([40, 60, 80, 100, 120]), c = R.p([200, 500, 1000]), x = b / (2 * a), P = -a * x * x + b * x - c;
   return [T(`Overskuddet ved å selge $x$ enheter er $O(x) = -${mf(a)}x^2 + ${b}x - ${c}$. Hvor mange enheter gir størst overskudd?`, `The profit from selling $x$ units is $O(x) = -${mf(a)}x^2 + ${b}x - ${c}$. How many units give the largest profit?`), { n: x, tol: 0.5, u: "" },
     T(`$O'(x) = -${mf(2 * a)}x + ${b} = 0$ gir $x = ${mf(x)}$. Overskuddet er da $${mf(P)}$.`, `$O'(x) = -${mf(2 * a)}x + ${b} = 0$ gives $x = ${mf(x)}$. The profit is then $${mf(P)}$.`)]; },
 () => { const S = R.p([8, 10, 14, 20, 30, 50]), P = S * S / 4;
   return [T(`To positive tall har sum ${S}. Hva er det største mulige produktet?`, `Two positive numbers have sum ${S}. What is the largest possible product?`), { n: P, tol: 0, u: "" },
     T(`$P(x) = x(${S} - x)$, $P'(x) = ${S} - 2x = 0$ gir $x = ${mf(S / 2)}$ og $P = ${mf(P)}$.`, `$P(x) = x(${S} - x)$, $P'(x) = ${S} - 2x = 0$ gives $x = ${mf(S / 2)}$ and $P = ${mf(P)}$.`)]; }
);

// ---------------- Parameterframstillinger ----------------
TH("VGR1", R1_PAR, `## Hva handler det om?
En parameterframstilling beskriver en kurve ved at både $x$ og $y$ er funksjoner av en parameter $t$ (ofte tiden). Tenk på en ball eller en drone: posisjonen er $\\vec r(t) = [x(t), y(t)]$.

## Begreper og formler
- Rett linje gjennom punktet $P(x_0, y_0)$ med retningsvektor $[a, b]$: $x = x_0 + at$, $y = y_0 + bt$.
- Fartsvektoren er den deriverte: $\\vec v(t) = \\vec{r}^{\\,\\prime}(t) = [x'(t), y'(t)]$. Den peker langs tangenten.
- Farten (banefarten) er lengden: $|\\vec v(t)| = \\sqrt{x'(t)^2 + y'(t)^2}$.
- Akselerasjonen: $\\vec a(t) = \\vec{v}^{\\,\\prime}(t)$.
- Sirkel med sentrum i origo og radius $r$: $[r\\cos t, r\\sin t]$.
- Kurven skjærer $y$-aksen når $x(t) = 0$ og $x$-aksen når $y(t) = 0$.

### Eksempel
$\\vec r(t) = [2t, t^2]$. Da er $\\vec v(t) = [2, 2t]$, og ved $t = 2$ er farten $|[2, 4]| = \\sqrt{20} \\approx 4{,}47$.

> Løs for $t$ først, sett inn i den andre koordinaten etterpå.`,
`## What is it about?
A parametric representation describes a curve by letting both $x$ and $y$ be functions of a parameter $t$ (often time). Think of a ball or a drone: the position is $\\vec r(t) = [x(t), y(t)]$.

## Concepts and formulas
- Straight line through the point $P(x_0, y_0)$ with direction vector $[a, b]$: $x = x_0 + at$, $y = y_0 + bt$.
- The velocity vector is the derivative: $\\vec v(t) = \\vec{r}^{\\,\\prime}(t) = [x'(t), y'(t)]$. It points along the tangent.
- The speed is its length: $|\\vec v(t)| = \\sqrt{x'(t)^2 + y'(t)^2}$.
- The acceleration: $\\vec a(t) = \\vec{v}^{\\,\\prime}(t)$.
- Circle centred at the origin with radius $r$: $[r\\cos t, r\\sin t]$.
- The curve crosses the $y$-axis when $x(t) = 0$ and the $x$-axis when $y(t) = 0$.

### Example
$\\vec r(t) = [2t, t^2]$. Then $\\vec v(t) = [2, 2t]$, and at $t = 2$ the speed is $|[2, 4]| = \\sqrt{20} \\approx 4.47$.

> Solve for $t$ first, then insert into the other coordinate.`);
BIQ("VGR1", R1_PAR, [
 ["Hvilken parameterframstilling beskriver linjen gjennom $(1, 2)$ med retning $[3, -1]$?", ["$x = 1 + 3t,\\ y = 2 - t$", "$x = 3 + t,\\ y = -1 + 2t$", "$x = 1 - t,\\ y = 2 + 3t$", "$x = 3t,\\ y = -t$"], "Startpunkt pluss $t$ ganger retningsvektoren.",
  "Which parametric form describes the line through $(1, 2)$ with direction $[3, -1]$?", ["$x = 1 + 3t,\\ y = 2 - t$", "$x = 3 + t,\\ y = -1 + 2t$", "$x = 1 - t,\\ y = 2 + 3t$", "$x = 3t,\\ y = -t$"], "The starting point plus $t$ times the direction vector."],
 ["$\\vec r(t) = [2t, t^2]$. Hva er farten ved $t = 2$?", { n: 4.472, tol: 0.01, u: "" }, "$\\vec v = [2, 2t] = [2, 4]$, $|\\vec v| = \\sqrt{4 + 16} = \\sqrt{20} = 4{,}472$.",
  "$\\vec r(t) = [2t, t^2]$. What is the speed at $t = 2$?", null, "$\\vec v = [2, 2t] = [2, 4]$, $|\\vec v| = \\sqrt{4 + 16} = \\sqrt{20} = 4.472$."],
 ["$\\vec r(t) = [t - 3, t^2]$. For hvilken $t$ skjærer kurven $y$-aksen?", { n: 3, tol: 0, u: "" }, "$y$-aksen: $x(t) = t - 3 = 0$, så $t = 3$.",
  "$\\vec r(t) = [t - 3, t^2]$. For which $t$ does the curve cross the $y$-axis?", null, "The $y$-axis: $x(t) = t - 3 = 0$, so $t = 3$."],
 ["Hva beskriver $[4\\cos t, 4\\sin t]$?", ["En sirkel med radius 4", "En rett linje", "En parabel", "En sirkel med radius 16"], "$x^2 + y^2 = 16(\\cos^2 t + \\sin^2 t) = 16$, altså radius 4.",
  "What does $[4\\cos t, 4\\sin t]$ describe?", ["A circle with radius 4", "A straight line", "A parabola", "A circle with radius 16"], "$x^2 + y^2 = 16(\\cos^2 t + \\sin^2 t) = 16$, i.e. radius 4."],
 ["Hvilken retning har fartsvektoren?", ["Langs tangenten til banen", "Alltid mot origo", "Alltid loddrett", "Vinkelrett på banen"], "$\\vec{r}^{\\,\\prime}(t)$ er tangentvektoren.",
  "In which direction does the velocity vector point?", ["Along the tangent to the path", "Always towards the origin", "Always vertically", "Perpendicular to the path"], "$\\vec{r}^{\\,\\prime}(t)$ is the tangent vector."]
]);
GEN("VGR1", R1_PAR,
 () => { const a = R.p([1, 2, 3, -1, -2]), b = R.i(-3, 3), c = R.p([1, 2, -1, 0.5]), t0 = R.i(-2, 3), vx = a, vy = 2 * c * t0, s = Math.hypot(vx, vy);
   const yt = (c === 0.5 ? "\\tfrac12 " : cf(c)) + "t^2";
   return [T(`$\\vec r(t) = [${pl([[a, "t"], [b, ""]])}, ${yt}]$. Hva er farten ved $t = ${t0}$?`, `$\\vec r(t) = [${pl([[a, "t"], [b, ""]])}, ${yt}]$. What is the speed at $t = ${t0}$?`), { n: s, tol: rel(s, 0.01, 0.01), u: "" },
     T(`$\\vec v(t) = [${a}, ${mf(2 * c)}t]$, så $\\vec v(${t0}) = [${vx}, ${mf(vy)}]$ og $|\\vec v| = \\sqrt{${vx * vx} + ${mf(vy * vy)}} = ${mf(s, 3)}$.`, `$\\vec v(t) = [${a}, ${mf(2 * c)}t]$, so $\\vec v(${t0}) = [${vx}, ${mf(vy)}]$ and $|\\vec v| = \\sqrt{${vx * vx} + ${mf(vy * vy)}} = ${mf(s, 3)}$.`)]; },
 () => { const x0 = R.i(-4, 4), y0 = R.i(-4, 4), a = R.p([1, 2, -1, 3]), b = R.p([1, -2, 2, 3, -1]), t = R.i(-3, 3), X = x0 + a * t, Y = y0 + b * t;
   return [T(`Linjen $x = ${pl([[x0, ""], [a, "t"]])},\\ y = ${pl([[y0, ""], [b, "t"]])}$ går gjennom et punkt med $x = ${X}$. Hva er $y$-koordinaten der?`, `The line $x = ${pl([[x0, ""], [a, "t"]])},\\ y = ${pl([[y0, ""], [b, "t"]])}$ passes through a point with $x = ${X}$. What is the $y$-coordinate there?`), { n: Y, tol: 0, u: "" },
     T(`$${pl([[x0, ""], [a, "t"]])} = ${X}$ gir $t = ${t}$. Da er $y = ${y0} + ${b} \\cdot (${t}) = ${Y}$.`, `$${pl([[x0, ""], [a, "t"]])} = ${X}$ gives $t = ${t}$. Then $y = ${y0} + ${b} \\cdot (${t}) = ${Y}$.`)]; },
 () => { const v0 = R.p([10, 15, 20, 25]), ang = R.p([30, 45, 60]), vx = v0 * Math.cos(ang * DEG), vy = v0 * Math.sin(ang * DEG), tf = 2 * vy / 9.81, X = vx * tf;
   return [T(`En ball skytes ut med $\\vec r(t) = [${mf(vx, 2)}t,\\ ${mf(vy, 2)}t - 4{,}905t^2]$ (meter, sekunder). Hvor langt borte lander den ($y = 0$, $t > 0$)?`, `A ball is launched with $\\vec r(t) = [${mf(vx, 2)}t,\\ ${mf(vy, 2)}t - 4.905t^2]$ (metres, seconds). How far away does it land ($y = 0$, $t > 0$)?`), { n: X, tol: rel(X, 0.01), u: "m" },
     T(`$y = 0$ gir $t(${mf(vy, 2)} - 4{,}905t) = 0$, så $t = ${mf(tf, 3)}$ s. Da er $x = ${mf(vx, 2)} \\cdot ${mf(tf, 3)} = ${mf(X, 1)}$ m.`, `$y = 0$ gives $t(${mf(vy, 2)} - 4.905t) = 0$, so $t = ${mf(tf, 3)}$ s. Then $x = ${mf(vx, 2)} \\cdot ${mf(tf, 3)} = ${mf(X, 1)}$ m.`)]; }
);

// ---------------- Logikk og bevis ----------------
TH("VGR1", R1_BEV, `## Hva handler det om?
I matematikk er noe sant først når det er **bevist**. Du må kunne bruke symbolene for implikasjon og ekvivalens riktig, og føre enkle bevis.

## Begreper og formler
- $A \\Rightarrow B$ (implikasjon): hvis $A$ er sann, er $B$ sann. Eksempel: $x = 3 \\Rightarrow x^2 = 9$.
- $A \\Leftarrow B$: pilen går den andre veien. $x^2 = 9 \\Leftarrow x = 3$.
- $A \\Leftrightarrow B$ (ekvivalens): begge veier. $2x + 1 = 7 \\Leftrightarrow x = 3$.
- $x^2 = 9 \\Rightarrow x = 3$ er **galt**, for $x = -3$ er et moteksempel.
- **Direkte bevis**: start med det du vet, og regn deg fram til påstanden.
- **Kontrapositivt bevis**: $A \\Rightarrow B$ er det samme som $\\text{ikke } B \\Rightarrow \\text{ikke } A$.
- **Motsigelsesbevis**: anta at påstanden er gal, og vis at det fører til noe umulig.
- **Moteksempel**: ett eksempel er nok til å vise at en påstand er gal.

### Eksempel: direkte bevis
Påstand: summen av tre påfølgende heltall er delelig med 3.
Bevis: $n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$, som er delelig med 3. $\\blacksquare$

### Eksempel: partall
Et partall kan skrives $2n$ og et oddetall $2n + 1$. Summen av to oddetall: $(2m + 1) + (2n + 1) = 2(m + n + 1)$, altså et partall.

> Ett moteksempel knuser en påstand. Tusen eksempler beviser den ikke.`,
`## What is it about?
In mathematics something is true only once it is **proved**. You must be able to use the symbols for implication and equivalence correctly, and write simple proofs.

## Concepts and formulas
- $A \\Rightarrow B$ (implication): if $A$ is true, then $B$ is true. Example: $x = 3 \\Rightarrow x^2 = 9$.
- $A \\Leftarrow B$: the arrow goes the other way. $x^2 = 9 \\Leftarrow x = 3$.
- $A \\Leftrightarrow B$ (equivalence): both ways. $2x + 1 = 7 \\Leftrightarrow x = 3$.
- $x^2 = 9 \\Rightarrow x = 3$ is **false**, because $x = -3$ is a counterexample.
- **Direct proof**: start from what you know and work your way to the claim.
- **Contrapositive proof**: $A \\Rightarrow B$ is the same as $\\text{not } B \\Rightarrow \\text{not } A$.
- **Proof by contradiction**: assume the claim is false and show that this leads to something impossible.
- **Counterexample**: one example is enough to show that a claim is false.

### Example: direct proof
Claim: the sum of three consecutive integers is divisible by 3.
Proof: $n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$, which is divisible by 3. $\\blacksquare$

### Example: even numbers
An even number can be written $2n$ and an odd number $2n + 1$. The sum of two odd numbers: $(2m + 1) + (2n + 1) = 2(m + n + 1)$, i.e. an even number.

> One counterexample breaks a claim. A thousand examples do not prove it.`);
BIQ("VGR1", R1_BEV, [
 ["Hvilket symbol passer? $x = 3 \\ \\square\\ x^2 = 9$", ["$\\Rightarrow$", "$\\Leftarrow$", "$\\Leftrightarrow$", "$=$"], "Er $x = 3$, er $x^2 = 9$. Men $x^2 = 9$ kan også bety $x = -3$, så det gjelder bare én vei.",
  "Which symbol fits? $x = 3 \\ \\square\\ x^2 = 9$", ["$\\Rightarrow$", "$\\Leftarrow$", "$\\Leftrightarrow$", "$=$"], "If $x = 3$, then $x^2 = 9$. But $x^2 = 9$ can also mean $x = -3$, so it only holds one way."],
 ["Hva er et moteksempel til påstanden «$x^2 > x$ for alle $x$»?", ["$x = \\tfrac12$", "$x = 2$", "$x = 3$", "$x = -1$"], "$(\\tfrac12)^2 = \\tfrac14 < \\tfrac12$, så påstanden er gal.",
  "What is a counterexample to the claim \"$x^2 > x$ for all $x$\"?", ["$x = \\tfrac12$", "$x = 2$", "$x = 3$", "$x = -1$"], "$(\\tfrac12)^2 = \\tfrac14 < \\tfrac12$, so the claim is false."],
 ["Hva er det kontrapositive til «hvis $n^2$ er et partall, så er $n$ et partall»?", ["Hvis $n$ er et oddetall, så er $n^2$ et oddetall", "Hvis $n$ er et partall, så er $n^2$ et partall", "Hvis $n^2$ er et oddetall, så er $n$ et oddetall", "$n$ er alltid et partall"], "Snu og negér: ikke $B$ ⇒ ikke $A$.",
  "What is the contrapositive of \"if $n^2$ is even, then $n$ is even\"?", ["If $n$ is odd, then $n^2$ is odd", "If $n$ is even, then $n^2$ is even", "If $n^2$ is odd, then $n$ is odd", "$n$ is always even"], "Reverse and negate: not $B$ ⇒ not $A$."],
 ["Summen av tre påfølgende heltall er 42. Hva er det midterste tallet?", { n: 14, tol: 0, u: "" }, "$n + (n + 1) + (n + 2) = 3(n + 1) = 42$, så det midterste tallet er $n + 1 = 14$.",
  "The sum of three consecutive integers is 42. What is the middle number?", null, "$n + (n + 1) + (n + 2) = 3(n + 1) = 42$, so the middle number is $n + 1 = 14$."],
 ["Hvordan skriver du et vilkårlig oddetall?", ["$2n + 1$", "$2n$", "$n + 1$", "$n^2$"], "Et oddetall er ett mer enn et partall $2n$.",
  "How do you write an arbitrary odd number?", ["$2n + 1$", "$2n$", "$n + 1$", "$n^2$"], "An odd number is one more than an even number $2n$."],
 ["Er $x \\cdot y = 0 \\Leftrightarrow x = 0 \\text{ eller } y = 0$ riktig?", ["Ja, det gjelder begge veier", "Nei, bare $\\Rightarrow$", "Nei, bare $\\Leftarrow$", "Nei, ingen av veiene"], "Et produkt er null hvis og bare hvis minst én faktor er null.",
  "Is $x \\cdot y = 0 \\Leftrightarrow x = 0 \\text{ or } y = 0$ correct?", ["Yes, it holds both ways", "No, only $\\Rightarrow$", "No, only $\\Leftarrow$", "No, neither way"], "A product is zero if and only if at least one factor is zero."]
]);
const IMPL = [ // [A nb, B nb, A en, B en, riktig: 0 ⇒, 1 ⇐, 2 ⇔]
 ["$x = 5$", "$x^2 = 25$", "$x = 5$", "$x^2 = 25$", 0], ["$x^2 = 16$", "$x = 4$", "$x^2 = 16$", "$x = 4$", 1], ["$3x - 2 = 7$", "$x = 3$", "$3x - 2 = 7$", "$x = 3$", 2],
 ["$x > 2$", "$x > 5$", "$x > 2$", "$x > 5$", 1], ["$n$ er delelig med 6", "$n$ er delelig med 3", "$n$ is divisible by 6", "$n$ is divisible by 3", 0],
 ["trekanten er likesidet", "alle vinklene er $60^\\circ$", "the triangle is equilateral", "all angles are $60^\\circ$", 2], ["$x^2 > 0$", "$x > 0$", "$x^2 > 0$", "$x > 0$", 1],
 ["firkanten er et kvadrat", "firkanten er et rektangel", "the quadrilateral is a square", "the quadrilateral is a rectangle", 0], ["$n$ er et partall", "$n^2$ er et partall", "$n$ is even", "$n^2$ is even", 2],
 ["$\\ln x = 0$", "$x = 1$", "$\\ln x = 0$", "$x = 1$", 2], ["$x < -1$", "$x < 0$", "$x < -1$", "$x < 0$", 0], ["$|x| = 2$", "$x = -2$", "$|x| = 2$", "$x = -2$", 1],
 ["$e^x = 1$", "$x = 0$", "$e^x = 1$", "$x = 0$", 2], ["$n$ ender på 0", "$n$ er delelig med 5", "$n$ ends in 0", "$n$ is divisible by 5", 0]
];
GEN("VGR1", R1_BEV,
 () => { const [a, b, ae, be, k] = R.p(IMPL), sym = ["$\\Rightarrow$", "$\\Leftarrow$", "$\\Leftrightarrow$"], opts = [sym[k], ...sym.filter((_, i) => i !== k), T("Ingen av dem", "None of them")];
   const why = [T("Det gjelder bare fra venstre mot høyre.", "It only holds from left to right."), T("Det gjelder bare fra høyre mot venstre.", "It only holds from right to left."), T("Det gjelder begge veier.", "It holds both ways.")][k];
   return [T(`Hvilket symbol passer mellom påstandene? ${a} $\\ \\square\\ $ ${b}`, `Which symbol fits between the statements? ${ae} $\\ \\square\\ $ ${be}`), opts, why]; },
 () => { const m = R.i(-20, 40), S = 3 * m;
   return [T(`Summen av tre påfølgende heltall er ${S}. Hva er det minste av dem?`, `The sum of three consecutive integers is ${S}. What is the smallest of them?`), { n: m - 1, tol: 0, u: "" },
     T(`$(n) + (n + 1) + (n + 2) = 3(n + 1) = ${S}$ gir $n + 1 = ${m}$, så det minste tallet er ${m - 1}.`, `$(n) + (n + 1) + (n + 2) = 3(n + 1) = ${S}$ gives $n + 1 = ${m}$, so the smallest number is ${m - 1}.`)]; }
);

// ---------------- R1: flere oppgaver i de gamle enhetene ----------------
BIQ("VGR1", 0, [
 ["Løs $e^{2x} = 5$.", { n: 0.8047, tol: 0.001, u: "" }, "$2x = \\ln 5$, så $x = \\dfrac{\\ln 5}{2} = 0{,}8047$.",
  "Solve $e^{2x} = 5$.", null, "$2x = \\ln 5$, so $x = \\dfrac{\\ln 5}{2} = 0.8047$."],
 ["Forenkle $\\ln(e^3) + \\ln 1$.", { n: 3, tol: 0, u: "" }, "$\\ln e^3 = 3$ og $\\ln 1 = 0$.",
  "Simplify $\\ln(e^3) + \\ln 1$.", null, "$\\ln e^3 = 3$ and $\\ln 1 = 0$."],
 ["Løs $\\ln x + \\ln(x - 1) = \\ln 6$.", { n: 3, tol: 0, u: "" }, "$x(x - 1) = 6$ gir $x = 3$ eller $x = -2$. Bare $x = 3$ er gyldig (logaritmen krever $x > 1$).",
  "Solve $\\ln x + \\ln(x - 1) = \\ln 6$.", null, "$x(x - 1) = 6$ gives $x = 3$ or $x = -2$. Only $x = 3$ is valid (the logarithm requires $x > 1$)."]
]);
GEN("VGR1", 0,
 () => { const a = R.p([2, 3, 5, 10, 0.5]), k = R.p([1, 2, 3, -1, 0.5]), c = R.p([4, 6, 8, 20, 50]), x = Math.log(c / a) / k;
   const kk = k === 1 ? "" : k === -1 ? "-" : mf(k);
   return [T(`Løs $${mf(a)}e^{${kk}x} = ${c}$.`, `Solve $${mf(a)}e^{${kk}x} = ${c}$.`), { n: x, tol: rel(x, 0.01, 0.01), u: "" },
     T(`$e^{${mf(k)}x} = ${mf(c / a, 3)}$, så $x = \\dfrac{\\ln ${mf(c / a, 3)}}{${mf(k)}} = ${mf(x, 3)}$.`, `$e^{${mf(k)}x} = ${mf(c / a, 3)}$, so $x = \\dfrac{\\ln ${mf(c / a, 3)}}{${mf(k)}} = ${mf(x, 3)}$.`)]; },
 () => { const b = R.p([2, 3, 5, 10]), k = R.i(1, 4), x = b ** k;
   return [T(`Løs $\\log_{${b}} x = ${k}$.`, `Solve $\\log_{${b}} x = ${k}$.`), { n: x, tol: 0, u: "" },
     T(`$x = ${b}^{${k}} = ${x}$.`, `$x = ${b}^{${k}} = ${x}$.`)]; }
);
BIQ("VGR1", 2, [
 ["Hva er vinkelen mellom $[1, 0]$ og $[1, 1]$?", { n: 45, tol: 0.1, u: "°" }, "$\\cos v = \\dfrac{1}{1 \\cdot \\sqrt 2}$, så $v = 45^\\circ$.",
  "What is the angle between $[1, 0]$ and $[1, 1]$?", null, "$\\cos v = \\dfrac{1}{1 \\cdot \\sqrt 2}$, so $v = 45^\\circ$."],
 ["For hvilken $t$ er $[2, t]$ og $[3, -6]$ vinkelrette?", { n: 1, tol: 0, u: "" }, "$2 \\cdot 3 + t \\cdot (-6) = 0$ gir $t = 1$.",
  "For which $t$ are $[2, t]$ and $[3, -6]$ perpendicular?", null, "$2 \\cdot 3 + t \\cdot (-6) = 0$ gives $t = 1$."]
]);
GEN("VGR1", 2,
 () => { const u = [R.i(-5, 5) || 1, R.i(-5, 5)], v = [R.i(-5, 5), R.i(-5, 5) || 2], dot = u[0] * v[0] + u[1] * v[1], ang = Math.acos(Math.max(-1, Math.min(1, dot / Math.hypot(...u) / Math.hypot(...v)))) / DEG;
   return [T(`Finn vinkelen mellom $\\vec u = ${vec(u)}$ og $\\vec v = ${vec(v)}$ (i grader).`, `Find the angle between $\\vec u = ${vec(u)}$ and $\\vec v = ${vec(v)}$ (in degrees).`), { n: ang, tol: 0.2, u: "°" },
     T(`$\\cos v = \\dfrac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|} = \\dfrac{${dot}}{${mf(Math.hypot(...u), 3)} \\cdot ${mf(Math.hypot(...v), 3)}}$, så $v = ${mf(ang, 1)}^\\circ$.`, `$\\cos v = \\dfrac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|} = \\dfrac{${dot}}{${mf(Math.hypot(...u), 3)} \\cdot ${mf(Math.hypot(...v), 3)}}$, so $v = ${mf(ang, 1)}^\\circ$.`)]; },
 () => { const a = R.p([1, 2, 3, 4, -2]), b = R.p([2, 3, -1, 4]), c = R.p([1, 2, 3, 6, -3]), t = -a * c / b; // [a, t]·[c, b] = 0 → ac + tb = 0
   return [T(`For hvilken $t$ er $[${a}, t]$ og $[${c}, ${b}]$ vinkelrette?`, `For which $t$ are $[${a}, t]$ and $[${c}, ${b}]$ perpendicular?`), { n: t, tol: 0.001, u: "" },
     T(`Skalarproduktet må være null: $${a} \\cdot ${c} + ${b}t = 0$, så $t = ${mf(t, 3)}$.`, `The dot product must be zero: $${a} \\cdot ${c} + ${b}t = 0$, so $t = ${mf(t, 3)}$.`)]; }
);
BIQ("VGR1", 3, [
 ["En test for en sykdom er positiv hos 90 % av de syke og 5 % av de friske. 2 % har sykdommen. Hvor stor er $P(\\text{positiv})$?", { n: 0.067, tol: 0.001, u: "" }, "$0{,}02 \\cdot 0{,}9 + 0{,}98 \\cdot 0{,}05 = 0{,}018 + 0{,}049 = 0{,}067$.",
  "A test for a disease is positive for 90 % of the sick and 5 % of the healthy. 2 % have the disease. What is $P(\\text{positive})$?", null, "$0.02 \\cdot 0.9 + 0.98 \\cdot 0.05 = 0.018 + 0.049 = 0.067$."],
 ["Samme test: hvor stor er sannsynligheten for å være syk gitt positiv test?", { n: 0.2687, tol: 0.002, u: "" }, "Bayes: $\\dfrac{0{,}018}{0{,}067} = 0{,}2687$. Selv med positiv test er de fleste friske fordi sykdommen er sjelden.",
  "Same test: what is the probability of being sick given a positive test?", null, "Bayes: $\\dfrac{0.018}{0.067} = 0.2687$. Even with a positive test most are healthy because the disease is rare."]
]);
GEN("VGR1", 3,
 () => { const p = R.p([0.01, 0.02, 0.05, 0.1]), se = R.p([0.8, 0.9, 0.95, 0.99]), fp = R.p([0.02, 0.05, 0.1]), pos = p * se + (1 - p) * fp, post = p * se / pos;
   return [T(`${nf(p * 100)} % har en sykdom. Testen er positiv hos ${nf(se * 100)} % av de syke og ${nf(fp * 100)} % av de friske. Hva er $P(\\text{syk} \\mid \\text{positiv})$?`, `${nf(p * 100)} % have a disease. The test is positive for ${nf(se * 100)} % of the sick and ${nf(fp * 100)} % of the healthy. What is $P(\\text{sick} \\mid \\text{positive})$?`), { n: post, tol: 0.003, u: "" },
     T(`$P(\\text{pos}) = ${mf(p)} \\cdot ${mf(se)} + ${mf(1 - p)} \\cdot ${mf(fp)} = ${mf(pos, 4)}$. Bayes: $\\dfrac{${mf(p * se, 4)}}{${mf(pos, 4)}} = ${mf(post, 4)}$.`, `$P(\\text{pos}) = ${mf(p)} \\cdot ${mf(se)} + ${mf(1 - p)} \\cdot ${mf(fp)} = ${mf(pos, 4)}$. Bayes: $\\dfrac{${mf(p * se, 4)}}{${mf(pos, 4)}} = ${mf(post, 4)}$.`)]; },
 () => { const n = R.i(5, 12), k = R.i(2, 4), P = (() => { let r = 1; for(let i = 0; i < k; i++) r *= (n - i); return r; })();
   return [T(`${n} løpere deltar. På hvor mange måter kan gull, sølv${k > 2 ? ", bronse" : ""}${k > 3 ? " og 4.-plass" : ""} fordeles?`, `${n} runners take part. In how many ways can gold, silver${k > 2 ? ", bronze" : ""}${k > 3 ? " and 4th place" : ""} be awarded?`), { n: P, tol: 0, u: "" },
     T(`Rekkefølgen teller: $${Array.from({ length: k }, (_, i) => n - i).join(" \\cdot ")} = ${P}$.`, `Order matters: $${Array.from({ length: k }, (_, i) => n - i).join(" \\cdot ")} = ${P}$.`)]; }
);

// ============================================================
//  R2
// ============================================================
const R2_MET = ADDUNIT("VGR2", "Integrasjonsmetoder", "Integration techniques");
const R2_VOL = ADDUNIT("VGR2", "Areal og volum med integral", "Area and volume with integrals");
const R2_IND = ADDUNIT("VGR2", "Induksjonsbevis", "Proof by induction");
const R2_PLN = ADDUNIT("VGR2", "Linjer og plan i rommet", "Lines and planes in space");

TH("VGR2", R2_MET, `## Hva handler det om?
Mange integraler kan ikke løses direkte fra tabellen. Da trenger du en metode: **substitusjon** (baklengs kjerneregel), **delvis integrasjon** (baklengs produktregel) eller **delbrøkoppspalting**.

## Begreper og formler
- **Substitusjon**: ser du en funksjon og dens deriverte, sett $u = g(x)$ og $du = g'(x)\\,dx$.
  $\\int 2x(x^2 + 1)^3\\,dx$: med $u = x^2 + 1$ blir det $\\int u^3\\,du = \\dfrac{u^4}{4} + C = \\dfrac{(x^2 + 1)^4}{4} + C$.
- **Delvis integrasjon**: $\\int u'v\\,dx = uv - \\int uv'\\,dx$. Velg $v$ som blir enklere når den deriveres (ofte $x$ eller $\\ln x$).
  $\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = (x - 1)e^x + C$.
- **Delbrøk**: $\\dfrac{1}{x(x + 1)} = \\dfrac{1}{x} - \\dfrac{1}{x + 1}$, så $\\int \\dfrac{1}{x(x + 1)}\\,dx = \\ln|x| - \\ln|x + 1| + C$.
- Bestemt integral med substitusjon: bytt grensene til $u$-verdier, eller sett tilbake $x$ før du setter inn.

### Eksempel
$\\int_1^e \\ln x\\,dx$: delvis med $u' = 1$, $v = \\ln x$ gir $[x\\ln x - x]_1^e = (e - e) - (0 - 1) = 1$.

> Spør deg selv: er det en kjerne og dens deriverte (substitusjon), et produkt av ulike typer (delvis) eller en brøk med faktoriserbar nevner (delbrøk)?`,
`## What is it about?
Many integrals cannot be read directly from the table. Then you need a technique: **substitution** (the chain rule backwards), **integration by parts** (the product rule backwards) or **partial fractions**.

## Concepts and formulas
- **Substitution**: when you see a function and its derivative, set $u = g(x)$ and $du = g'(x)\\,dx$.
  $\\int 2x(x^2 + 1)^3\\,dx$: with $u = x^2 + 1$ this becomes $\\int u^3\\,du = \\dfrac{u^4}{4} + C = \\dfrac{(x^2 + 1)^4}{4} + C$.
- **Integration by parts**: $\\int u'v\\,dx = uv - \\int uv'\\,dx$. Choose $v$ as the factor that gets simpler when differentiated (often $x$ or $\\ln x$).
  $\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = (x - 1)e^x + C$.
- **Partial fractions**: $\\dfrac{1}{x(x + 1)} = \\dfrac{1}{x} - \\dfrac{1}{x + 1}$, so $\\int \\dfrac{1}{x(x + 1)}\\,dx = \\ln|x| - \\ln|x + 1| + C$.
- Definite integral with substitution: change the limits to $u$-values, or substitute back to $x$ before inserting.

### Example
$\\int_1^e \\ln x\\,dx$: by parts with $u' = 1$, $v = \\ln x$ gives $[x\\ln x - x]_1^e = (e - e) - (0 - 1) = 1$.

> Ask yourself: is there an inner function and its derivative (substitution), a product of different types (by parts) or a fraction with a factorisable denominator (partial fractions)?`);
BIQ("VGR2", R2_MET, [
 ["$\\int 2xe^{x^2}\\,dx = $", ["$e^{x^2} + C$", "$2e^{x^2} + C$", "$x^2e^{x^2} + C$", "$\\dfrac{e^{x^2}}{2x} + C$"], "Substitusjon $u = x^2$, $du = 2x\\,dx$: $\\int e^u\\,du = e^u + C$.",
  "$\\int 2xe^{x^2}\\,dx = $", ["$e^{x^2} + C$", "$2e^{x^2} + C$", "$x^2e^{x^2} + C$", "$\\dfrac{e^{x^2}}{2x} + C$"], "Substitution $u = x^2$, $du = 2x\\,dx$: $\\int e^u\\,du = e^u + C$."],
 ["$\\int xe^x\\,dx = $", ["$(x - 1)e^x + C$", "$xe^x + C$", "$\\tfrac12 x^2e^x + C$", "$(x + 1)e^x + C$"], "Delvis: $xe^x - \\int e^x\\,dx$. Sjekk ved å derivere: $((x - 1)e^x)' = xe^x$.",
  "$\\int xe^x\\,dx = $", ["$(x - 1)e^x + C$", "$xe^x + C$", "$\\tfrac12 x^2e^x + C$", "$(x + 1)e^x + C$"], "By parts: $xe^x - \\int e^x\\,dx$. Check by differentiating: $((x - 1)e^x)' = xe^x$."],
 ["Hvilken metode passer best for $\\int x\\cos x\\,dx$?", ["Delvis integrasjon", "Substitusjon", "Delbrøkoppspalting", "Ingen, den står i tabellen"], "Produkt av et polynom og en trigonometrisk funksjon: deriver $x$ bort med delvis integrasjon.",
  "Which method fits $\\int x\\cos x\\,dx$ best?", ["Integration by parts", "Substitution", "Partial fractions", "None, it is in the table"], "A product of a polynomial and a trigonometric function: differentiate $x$ away with integration by parts."],
 ["Regn ut $\\int_0^1 2x(x^2 + 1)^3\\,dx$.", { n: 3.75, tol: 0.001, u: "" }, "$\\left[\\dfrac{(x^2 + 1)^4}{4}\\right]_0^1 = \\dfrac{16 - 1}{4} = 3{,}75$.",
  "Calculate $\\int_0^1 2x(x^2 + 1)^3\\,dx$.", null, "$\\left[\\dfrac{(x^2 + 1)^4}{4}\\right]_0^1 = \\dfrac{16 - 1}{4} = 3.75$."],
 ["Regn ut $\\int_1^e \\ln x\\,dx$.", { n: 1, tol: 0.001, u: "" }, "$[x\\ln x - x]_1^e = 0 - (-1) = 1$.",
  "Calculate $\\int_1^e \\ln x\\,dx$.", null, "$[x\\ln x - x]_1^e = 0 - (-1) = 1$."],
 ["Spalt $\\dfrac{1}{x(x + 1)}$ i delbrøker.", ["$\\dfrac{1}{x} - \\dfrac{1}{x + 1}$", "$\\dfrac{1}{x} + \\dfrac{1}{x + 1}$", "$\\dfrac{1}{x + 1} - \\dfrac{1}{x}$", "$\\dfrac{2}{x} - \\dfrac{1}{x + 1}$"], "Sjekk: $\\dfrac{(x + 1) - x}{x(x + 1)} = \\dfrac{1}{x(x + 1)}$.",
  "Split $\\dfrac{1}{x(x + 1)}$ into partial fractions.", ["$\\dfrac{1}{x} - \\dfrac{1}{x + 1}$", "$\\dfrac{1}{x} + \\dfrac{1}{x + 1}$", "$\\dfrac{1}{x + 1} - \\dfrac{1}{x}$", "$\\dfrac{2}{x} - \\dfrac{1}{x + 1}$"], "Check: $\\dfrac{(x + 1) - x}{x(x + 1)} = \\dfrac{1}{x(x + 1)}$."]
]);
GEN("VGR2", R2_MET,
 () => { const m = R.p([0, 1, 2]), n = R.p([1, 2, 3]), c = R.p([1, 2]), v = ((c * c + m) ** (n + 1) - m ** (n + 1)) / (n + 1);
   return [T(`Regn ut $\\int_0^{${c}} 2x(x^2${m ? " + " + m : ""})^{${n}}\\,dx$.`, `Calculate $\\int_0^{${c}} 2x(x^2${m ? " + " + m : ""})^{${n}}\\,dx$.`), { n: v, tol: rel(v, 0.005, 0.01), u: "" },
     T(`Med $u = x^2${m ? " + " + m : ""}$: $\\left[\\dfrac{(x^2${m ? " + " + m : ""})^{${n + 1}}}{${n + 1}}\\right]_0^{${c}} = \\dfrac{${(c * c + m) ** (n + 1)} - ${m ** (n + 1)}}{${n + 1}} = ${mf(v, 3)}$.`, `With $u = x^2${m ? " + " + m : ""}$: $\\left[\\dfrac{(x^2${m ? " + " + m : ""})^{${n + 1}}}{${n + 1}}\\right]_0^{${c}} = \\dfrac{${(c * c + m) ** (n + 1)} - ${m ** (n + 1)}}{${n + 1}} = ${mf(v, 3)}$.`)]; },
 () => { const c = R.p([1, 2, 3]), v = (c - 1) * Math.exp(c) + 1;
   return [T(`Regn ut $\\int_0^{${c}} xe^x\\,dx$.`, `Calculate $\\int_0^{${c}} xe^x\\,dx$.`), { n: v, tol: rel(v, 0.005, 0.01), u: "" },
     T(`Delvis: $[(x - 1)e^x]_0^{${c}} = ${c - 1}e^{${c}} - (-1) = ${mf(v, 3)}$.`, `By parts: $[(x - 1)e^x]_0^{${c}} = ${c - 1}e^{${c}} - (-1) = ${mf(v, 3)}$.`)]; },
 () => { const c = R.p([2, 3, 4, 5, 9]), v = Math.log(2 * c / (c + 1));
   return [T(`Regn ut $\\int_1^{${c}} \\dfrac{1}{x(x + 1)}\\,dx$.`, `Calculate $\\int_1^{${c}} \\dfrac{1}{x(x + 1)}\\,dx$.`), { n: v, tol: 0.002, u: "" },
     T(`Delbrøk: $[\\ln x - \\ln(x + 1)]_1^{${c}} = \\ln\\dfrac{${c}}{${c + 1}} - \\ln\\dfrac12 = \\ln\\dfrac{${2 * c}}{${c + 1}} = ${mf(v, 4)}$.`, `Partial fractions: $[\\ln x - \\ln(x + 1)]_1^{${c}} = \\ln\\dfrac{${c}}{${c + 1}} - \\ln\\dfrac12 = \\ln\\dfrac{${2 * c}}{${c + 1}} = ${mf(v, 4)}$.`)]; },
 () => { const a = R.p([1, 2, 3]), b = R.p([1, 2, 4]), c = R.p([1, 2, 3, 5]), v = Math.log((a * c + b) / b);
   return [T(`Regn ut $\\int_0^{${c}} \\dfrac{${a}}{${pl([[a, "x"], [b, ""]])}}\\,dx$.`, `Calculate $\\int_0^{${c}} \\dfrac{${a}}{${pl([[a, "x"], [b, ""]])}}\\,dx$.`), { n: v, tol: 0.002, u: "" },
     T(`Telleren er den deriverte av nevneren: $[\\ln(${pl([[a, "x"], [b, ""]])})]_0^{${c}} = \\ln ${a * c + b} - \\ln ${b} = ${mf(v, 4)}$.`, `The numerator is the derivative of the denominator: $[\\ln(${pl([[a, "x"], [b, ""]])})]_0^{${c}} = \\ln ${a * c + b} - \\ln ${b} = ${mf(v, 4)}$.`)]; }
);

TH("VGR2", R2_VOL, `## Hva handler det om?
Integralet regner ut areal under grafer, areal **mellom** grafer og volum av figurer som lages når en graf roteres om $x$-aksen.

## Begreper og formler
- Areal mellom $f$ og $g$ der $f \\ge g$ på $[a, b]$: $A = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx$. Grensene er ofte skjæringspunktene, så løs $f(x) = g(x)$ først.
- Ligger grafen under $x$-aksen, gir integralet et **negativt** tall. Arealet er da tallverdien, og du må dele opp ved nullpunktene.
- Omdreiningsvolum om $x$-aksen: $V = \\pi\\int_a^b f(x)^2\\,dx$ (summen av tynne sirkelskiver med radius $f(x)$).
- Volum med kjent tverrsnitt $A(x)$: $V = \\int_a^b A(x)\\,dx$.

### Eksempel: areal mellom grafer
$y = x$ og $y = x^2$ skjærer i $x = 0$ og $x = 1$. På $[0, 1]$ er $x \\ge x^2$, så $A = \\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16$.

### Eksempel: kjegle
Rotér $y = \\dfrac{r}{h}x$ fra 0 til $h$: $V = \\pi\\int_0^h \\dfrac{r^2}{h^2}x^2\\,dx = \\dfrac{\\pi r^2 h}{3}$, den kjente kjegleformelen.

> Areal: øverste minus nederste. Volum: $\\pi$ ganger integralet av radius i andre.`,
`## What is it about?
The integral calculates the area under graphs, the area **between** graphs and the volume of solids formed when a graph is rotated about the $x$-axis.

## Concepts and formulas
- Area between $f$ and $g$ where $f \\ge g$ on $[a, b]$: $A = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx$. The limits are often the intersection points, so solve $f(x) = g(x)$ first.
- If the graph lies below the $x$-axis, the integral gives a **negative** number. The area is then the absolute value, and you must split at the zeros.
- Volume of revolution about the $x$-axis: $V = \\pi\\int_a^b f(x)^2\\,dx$ (the sum of thin circular discs with radius $f(x)$).
- Volume with known cross-section $A(x)$: $V = \\int_a^b A(x)\\,dx$.

### Example: area between graphs
$y = x$ and $y = x^2$ intersect at $x = 0$ and $x = 1$. On $[0, 1]$, $x \\ge x^2$, so $A = \\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16$.

### Example: cone
Rotate $y = \\dfrac{r}{h}x$ from 0 to $h$: $V = \\pi\\int_0^h \\dfrac{r^2}{h^2}x^2\\,dx = \\dfrac{\\pi r^2 h}{3}$, the familiar cone formula.

> Area: top minus bottom. Volume: $\\pi$ times the integral of the radius squared.`);
BIQ("VGR2", R2_VOL, [
 ["Hva er arealet mellom $y = x$ og $y = x^2$?", { n: 0.1667, tol: 0.001, u: "" }, "$\\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16 = 0{,}1667$.",
  "What is the area between $y = x$ and $y = x^2$?", null, "$\\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16 = 0.1667$."],
 ["$\\int_{-1}^{1} x^3\\,dx = 0$. Hva er arealet mellom grafen og $x$-aksen?", { n: 0.5, tol: 0.001, u: "" }, "Delene over og under aksen kansellerer i integralet. Arealet er $2\\int_0^1 x^3\\,dx = 2 \\cdot \\tfrac14 = 0{,}5$.",
  "$\\int_{-1}^{1} x^3\\,dx = 0$. What is the area between the graph and the $x$-axis?", null, "The parts above and below the axis cancel in the integral. The area is $2\\int_0^1 x^3\\,dx = 2 \\cdot \\tfrac14 = 0.5$."],
 ["Grafen til $y = \\sqrt{x}$, $0 \\le x \\le 4$, roteres om $x$-aksen. Hva er volumet?", { n: 25.13, tol: 0.05, u: "" }, "$V = \\pi\\int_0^4 x\\,dx = \\pi \\cdot 8 = 25{,}13$.",
  "The graph of $y = \\sqrt{x}$, $0 \\le x \\le 4$, is rotated about the $x$-axis. What is the volume?", null, "$V = \\pi\\int_0^4 x\\,dx = \\pi \\cdot 8 = 25.13$."],
 ["Hvilken formel gir omdreiningsvolumet om $x$-aksen?", ["$\\pi\\int_a^b f(x)^2\\,dx$", "$\\int_a^b \\pi f(x)\\,dx$", "$2\\pi\\int_a^b f(x)\\,dx$", "$\\pi\\left(\\int_a^b f(x)\\,dx\\right)^2$"], "Hver skive er en sirkel med areal $\\pi f(x)^2$.",
  "Which formula gives the volume of revolution about the $x$-axis?", ["$\\pi\\int_a^b f(x)^2\\,dx$", "$\\int_a^b \\pi f(x)\\,dx$", "$2\\pi\\int_a^b f(x)\\,dx$", "$\\pi\\left(\\int_a^b f(x)\\,dx\\right)^2$"], "Each slice is a circle with area $\\pi f(x)^2$."],
 ["Du vil finne arealet mellom to grafer. Hva gjør du først?", ["Finner skjæringspunktene", "Deriverer begge", "Legger dem sammen", "Setter $x = 0$"], "Skjæringspunktene gir grensene for integralet.",
  "You want the area between two graphs. What do you do first?", ["Find the intersection points", "Differentiate both", "Add them", "Set $x = 0$"], "The intersection points give the limits of the integral."]
]);
GEN("VGR2", R2_VOL,
 () => { const a = R.p([1, 2, 3, 4]), A = a ** 3 / 6;
   return [T(`Finn arealet mellom $y = ${a === 1 ? "" : a}x$ og $y = x^2$.`, `Find the area between $y = ${a === 1 ? "" : a}x$ and $y = x^2$.`), { n: A, tol: rel(A, 0.005, 0.001), u: "" },
     T(`Skjæring i $x = 0$ og $x = ${a}$. $\\int_0^{${a}} (${a === 1 ? "" : a}x - x^2)\\,dx = \\dfrac{${a}^3}{2} - \\dfrac{${a}^3}{3} = \\dfrac{${a ** 3}}{6} = ${mf(A, 4)}$.`, `Intersection at $x = 0$ and $x = ${a}$. $\\int_0^{${a}} (${a === 1 ? "" : a}x - x^2)\\,dx = \\dfrac{${a}^3}{2} - \\dfrac{${a}^3}{3} = \\dfrac{${a ** 3}}{6} = ${mf(A, 4)}$.`)]; },
 () => { const c = R.p([1, 2, 3, 4, 5, 9]), V = Math.PI * c * c / 2;
   return [T(`$y = \\sqrt{x}$, $0 \\le x \\le ${c}$, roteres om $x$-aksen. Hva er volumet?`, `$y = \\sqrt{x}$, $0 \\le x \\le ${c}$, is rotated about the $x$-axis. What is the volume?`), { n: V, tol: rel(V, 0.005), u: "" },
     T(`$V = \\pi\\int_0^{${c}} x\\,dx = \\pi \\cdot \\dfrac{${c * c}}{2} = ${mf(V, 2)}$.`, `$V = \\pi\\int_0^{${c}} x\\,dx = \\pi \\cdot \\dfrac{${c * c}}{2} = ${mf(V, 2)}$.`)]; },
 () => { const r = R.p([1, 2, 3, 4]), h = R.p([2, 3, 5, 6, 10]), V = Math.PI * r * r * h / 3;
   return [T(`Linjen $y = \\dfrac{${r}}{${h}}x$, $0 \\le x \\le ${h}$, roteres om $x$-aksen og lager en kjegle. Hva er volumet?`, `The line $y = \\dfrac{${r}}{${h}}x$, $0 \\le x \\le ${h}$, is rotated about the $x$-axis and forms a cone. What is the volume?`), { n: V, tol: rel(V, 0.005), u: "" },
     T(`$V = \\pi\\int_0^{${h}} \\dfrac{${r * r}}{${h * h}}x^2\\,dx = \\dfrac{\\pi \\cdot ${r * r} \\cdot ${h}}{3} = ${mf(V, 2)}$.`, `$V = \\pi\\int_0^{${h}} \\dfrac{${r * r}}{${h * h}}x^2\\,dx = \\dfrac{\\pi \\cdot ${r * r} \\cdot ${h}}{3} = ${mf(V, 2)}$.`)]; },
 () => { const c = R.p([1, 4, 9, 16]), s = Math.sqrt(c), A = 4 / 3 * s ** 3;
   return [T(`Finn arealet mellom grafen til $f(x) = ${c} - x^2$ og $x$-aksen.`, `Find the area between the graph of $f(x) = ${c} - x^2$ and the $x$-axis.`), { n: A, tol: rel(A, 0.005), u: "" },
     T(`Nullpunkter $x = \\pm ${s}$. $\\int_{-${s}}^{${s}} (${c} - x^2)\\,dx = 2\\left(${c * s} - \\dfrac{${s ** 3}}{3}\\right) = ${mf(A, 3)}$.`, `Zeros $x = \\pm ${s}$. $\\int_{-${s}}^{${s}} (${c} - x^2)\\,dx = 2\\left(${c * s} - \\dfrac{${s ** 3}}{3}\\right) = ${mf(A, 3)}$.`)]; }
);

TH("VGR2", R2_IND, `## Hva handler det om?
Induksjon er en bevismetode for påstander om **alle** naturlige tall $n$. Tenk på dominobrikker: velter den første, og hver brikke velter den neste, så velter alle.

## Fremgangsmåte
1. **Induksjonsgrunnlag**: vis at påstanden $P(1)$ er sann.
2. **Induksjonstrinn**: anta at $P(k)$ er sann (induksjonshypotesen), og vis at da er også $P(k + 1)$ sann.
3. Konklusjon: påstanden gjelder for alle $n \\ge 1$.

## Kjente summer
- $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$
- $1 + 3 + 5 + \\dots + (2n - 1) = n^2$
- $1^2 + 2^2 + \\dots + n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}$
- $1 + 2 + 4 + \\dots + 2^{n - 1} = 2^n - 1$

### Eksempel
Påstand: $1 + 3 + \\dots + (2n - 1) = n^2$.
Grunnlag: $n = 1$ gir $1 = 1^2$. ✓
Trinn: anta $1 + 3 + \\dots + (2k - 1) = k^2$. Legg til neste ledd $2(k + 1) - 1 = 2k + 1$:
$k^2 + 2k + 1 = (k + 1)^2$. ✓ Påstanden holder da også for $k + 1$. $\\blacksquare$

> I induksjonstrinnet **må** du bruke hypotesen. Hvis du ikke bruker den, har du ikke ført et induksjonsbevis.`,
`## What is it about?
Induction is a proof technique for claims about **all** natural numbers $n$. Think of dominoes: if the first one falls, and each one knocks over the next, then all fall.

## Method
1. **Base case**: show that the claim $P(1)$ is true.
2. **Induction step**: assume that $P(k)$ is true (the induction hypothesis), and show that then $P(k + 1)$ is also true.
3. Conclusion: the claim holds for all $n \\ge 1$.

## Known sums
- $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$
- $1 + 3 + 5 + \\dots + (2n - 1) = n^2$
- $1^2 + 2^2 + \\dots + n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}$
- $1 + 2 + 4 + \\dots + 2^{n - 1} = 2^n - 1$

### Example
Claim: $1 + 3 + \\dots + (2n - 1) = n^2$.
Base case: $n = 1$ gives $1 = 1^2$. ✓
Step: assume $1 + 3 + \\dots + (2k - 1) = k^2$. Add the next term $2(k + 1) - 1 = 2k + 1$:
$k^2 + 2k + 1 = (k + 1)^2$. ✓ The claim then also holds for $k + 1$. $\\blacksquare$

> In the induction step you **must** use the hypothesis. If you don't use it, you haven't written an induction proof.`);
BIQ("VGR2", R2_IND, [
 ["Hva er de to delene i et induksjonsbevis?", ["Grunnlag og induksjonstrinn", "Hypotese og konklusjon", "Moteksempel og bevis", "Derivasjon og integrasjon"], "Vis $P(1)$, og vis at $P(k) \\Rightarrow P(k + 1)$.",
  "What are the two parts of an induction proof?", ["Base case and induction step", "Hypothesis and conclusion", "Counterexample and proof", "Differentiation and integration"], "Show $P(1)$, and show that $P(k) \\Rightarrow P(k + 1)$."],
 ["Hva er $1 + 2 + \\dots + 100$?", { n: 5050, tol: 0, u: "" }, "$\\dfrac{100 \\cdot 101}{2} = 5050$.",
  "What is $1 + 2 + \\dots + 100$?", null, "$\\dfrac{100 \\cdot 101}{2} = 5050$."],
 ["Hva er summen av de 50 første oddetallene?", { n: 2500, tol: 0, u: "" }, "$1 + 3 + \\dots + 99 = 50^2 = 2500$.",
  "What is the sum of the first 50 odd numbers?", null, "$1 + 3 + \\dots + 99 = 50^2 = 2500$."],
 ["Påstand: $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$. Hva skal du vise i induksjonstrinnet?", ["$\\dfrac{k(k + 1)}{2} + (k + 1) = \\dfrac{(k + 1)(k + 2)}{2}$", "$\\dfrac{k(k + 1)}{2} = \\dfrac{(k + 1)(k + 2)}{2}$", "$1 = \\dfrac{1 \\cdot 2}{2}$", "$k + 1 = \\dfrac{k(k + 1)}{2}$"], "Start med summen til og med $k$ (hypotesen) og legg til neste ledd $k + 1$.",
  "Claim: $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$. What must you show in the induction step?", ["$\\dfrac{k(k + 1)}{2} + (k + 1) = \\dfrac{(k + 1)(k + 2)}{2}$", "$\\dfrac{k(k + 1)}{2} = \\dfrac{(k + 1)(k + 2)}{2}$", "$1 = \\dfrac{1 \\cdot 2}{2}$", "$k + 1 = \\dfrac{k(k + 1)}{2}$"], "Start with the sum up to $k$ (the hypothesis) and add the next term $k + 1$."],
 ["Hva er $1 + 2 + 4 + \\dots + 2^9$?", { n: 1023, tol: 0, u: "" }, "$2^{10} - 1 = 1023$.",
  "What is $1 + 2 + 4 + \\dots + 2^9$?", null, "$2^{10} - 1 = 1023$."]
]);
GEN("VGR2", R2_IND,
 () => { const n = R.i(10, 200), s = n * (n + 1) / 2;
   return [T(`Regn ut $1 + 2 + 3 + \\dots + ${n}$.`, `Calculate $1 + 2 + 3 + \\dots + ${n}$.`), { n: s, tol: 0, u: "" }, T(`$\\dfrac{${n} \\cdot ${n + 1}}{2} = ${s}$.`, `$\\dfrac{${n} \\cdot ${n + 1}}{2} = ${s}$.`)]; },
 () => { const n = R.i(5, 60), s = n * n;
   return [T(`Regn ut $1 + 3 + 5 + \\dots + ${2 * n - 1}$.`, `Calculate $1 + 3 + 5 + \\dots + ${2 * n - 1}$.`), { n: s, tol: 0, u: "" }, T(`Det er ${n} oddetall, så summen er $${n}^2 = ${s}$.`, `There are ${n} odd numbers, so the sum is $${n}^2 = ${s}$.`)]; },
 () => { const n = R.i(4, 20), s = n * (n + 1) * (2 * n + 1) / 6;
   return [T(`Regn ut $1^2 + 2^2 + \\dots + ${n}^2$.`, `Calculate $1^2 + 2^2 + \\dots + ${n}^2$.`), { n: s, tol: 0, u: "" }, T(`$\\dfrac{${n} \\cdot ${n + 1} \\cdot ${2 * n + 1}}{6} = ${s}$.`, `$\\dfrac{${n} \\cdot ${n + 1} \\cdot ${2 * n + 1}}{6} = ${s}$.`)]; },
 () => { const n = R.i(2, 8), v = (4 ** n - 1) / 3;
   return [T(`Induksjon viser at $4^n - 1$ alltid er delelig med 3. Hva er $\\dfrac{4^{${n}} - 1}{3}$?`, `Induction shows that $4^n - 1$ is always divisible by 3. What is $\\dfrac{4^{${n}} - 1}{3}$?`), { n: v, tol: 0, u: "" },
     T(`$4^{${n}} - 1 = ${4 ** n - 1}$, og $${4 ** n - 1} / 3 = ${v}$.`, `$4^{${n}} - 1 = ${4 ** n - 1}$, and $${4 ** n - 1} / 3 = ${v}$.`)]; }
);

TH("VGR2", R2_PLN, `## Hva handler det om?
I rommet beskrives linjer med parameterframstilling og plan med en likning. Med normalvektorer og skalarprodukt finner du skjæringspunkter, vinkler og avstander.

## Begreper og formler
- Linje gjennom $P(x_0, y_0, z_0)$ med retning $[a, b, c]$: $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$.
- Plan: $ax + by + cz + d = 0$, der $\\vec n = [a, b, c]$ er en **normalvektor** (vinkelrett på planet).
- Avstand fra punktet $Q(x_1, y_1, z_1)$ til planet: $\\dfrac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.
- Skjæring linje–plan: sett parameterframstillingen inn i planlikningen og løs for $t$.
- Vinkel mellom to plan = vinkelen mellom normalvektorene (eller $180^\\circ$ minus den).
- Volum av parallellepiped utspent av $\\vec a, \\vec b, \\vec c$: $|(\\vec a \\times \\vec b)\\cdot \\vec c|$.

### Eksempel
Linjen $[1 + t, 2 - t, 3t]$ og planet $x + y + z = 6$: $(1 + t) + (2 - t) + 3t = 6$ gir $t = 1$, altså punktet $(2, 1, 3)$.

> Normalvektoren kan leses rett av koeffisientene til $x$, $y$ og $z$.`,
`## What is it about?
In space, lines are described with parametric equations and planes with an equation. With normal vectors and the dot product you find intersection points, angles and distances.

## Concepts and formulas
- Line through $P(x_0, y_0, z_0)$ with direction $[a, b, c]$: $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$.
- Plane: $ax + by + cz + d = 0$, where $\\vec n = [a, b, c]$ is a **normal vector** (perpendicular to the plane).
- Distance from the point $Q(x_1, y_1, z_1)$ to the plane: $\\dfrac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.
- Line–plane intersection: insert the parametric form into the plane equation and solve for $t$.
- Angle between two planes = the angle between the normal vectors (or $180^\\circ$ minus it).
- Volume of the parallelepiped spanned by $\\vec a, \\vec b, \\vec c$: $|(\\vec a \\times \\vec b)\\cdot \\vec c|$.

### Example
The line $[1 + t, 2 - t, 3t]$ and the plane $x + y + z = 6$: $(1 + t) + (2 - t) + 3t = 6$ gives $t = 1$, i.e. the point $(2, 1, 3)$.

> The normal vector can be read straight from the coefficients of $x$, $y$ and $z$.`);
BIQ("VGR2", R2_PLN, [
 ["Hva er en normalvektor til planet $2x - y + 3z = 5$?", ["$[2, -1, 3]$", "$[2, -1, 3, 5]$", "$[2, 1, 3]$", "$[5, 2, -1]$"], "Koeffisientene foran $x$, $y$ og $z$.",
  "What is a normal vector to the plane $2x - y + 3z = 5$?", ["$[2, -1, 3]$", "$[2, -1, 3, 5]$", "$[2, 1, 3]$", "$[5, 2, -1]$"], "The coefficients of $x$, $y$ and $z$."],
 ["Hva er avstanden fra origo til planet $x + 2y + 2z = 6$?", { n: 2, tol: 0.001, u: "" }, "$\\dfrac{|0 + 0 + 0 - 6|}{\\sqrt{1 + 4 + 4}} = \\dfrac{6}{3} = 2$.",
  "What is the distance from the origin to the plane $x + 2y + 2z = 6$?", null, "$\\dfrac{|0 + 0 + 0 - 6|}{\\sqrt{1 + 4 + 4}} = \\dfrac{6}{3} = 2$."],
 ["Ligger punktet $(1, 1, 1)$ i planet $x + y - z = 1$?", ["Ja", "Nei"], "$1 + 1 - 1 = 1$, så punktet oppfyller likningen.",
  "Does the point $(1, 1, 1)$ lie in the plane $x + y - z = 1$?", ["Yes", "No"], "$1 + 1 - 1 = 1$, so the point satisfies the equation."],
 ["Linjen $[1 + t, 2 - t, 3t]$ skjærer planet $x + y + z = 6$. For hvilken $t$?", { n: 1, tol: 0, u: "" }, "$(1 + t) + (2 - t) + 3t = 3 + 3t = 6$, så $t = 1$.",
  "The line $[1 + t, 2 - t, 3t]$ intersects the plane $x + y + z = 6$. For which $t$?", null, "$(1 + t) + (2 - t) + 3t = 3 + 3t = 6$, so $t = 1$."],
 ["To plan har normalvektorer $[1, 0, 0]$ og $[0, 1, 0]$. Hva er vinkelen mellom planene?", { n: 90, tol: 0, u: "°" }, "Skalarproduktet er 0, så normalvektorene og planene står vinkelrett: $90^\\circ$.",
  "Two planes have normal vectors $[1, 0, 0]$ and $[0, 1, 0]$. What is the angle between the planes?", null, "The dot product is 0, so the normals and the planes are perpendicular: $90^\\circ$."]
]);
GEN("VGR2", R2_PLN,
 () => { const n = R.p([[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, -1, 2], [4, 4, 7], [6, 2, 3]]), d = R.i(-12, 12), Q = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], L = Math.hypot(...n), num = n[0] * Q[0] + n[1] * Q[1] + n[2] * Q[2] + d, D = Math.abs(num) / L;
   const eq = pl([[n[0], "x"], [n[1], "y"], [n[2], "z"], [d, ""]]);
   return [T(`Finn avstanden fra punktet $(${Q.join(", ")})$ til planet $${eq} = 0$.`, `Find the distance from the point $(${Q.join(", ")})$ to the plane $${eq} = 0$.`), { n: D, tol: 0.01, u: "" },
     T(`$\\dfrac{|${num}|}{\\sqrt{${n[0] ** 2} + ${n[1] ** 2} + ${n[2] ** 2}}} = \\dfrac{${Math.abs(num)}}{${L}} = ${mf(D, 3)}$.`, `$\\dfrac{|${num}|}{\\sqrt{${n[0] ** 2} + ${n[1] ** 2} + ${n[2] ** 2}}} = \\dfrac{${Math.abs(num)}}{${L}} = ${mf(D, 3)}$.`)]; },
 () => { const P = [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], v = [R.p([1, 2, -1]), R.p([1, -1, 2, 0]), R.p([1, 3, -2])], n = [R.p([1, 2]), R.p([1, -1, 1]), R.p([1, 1, 2])], t = R.i(-3, 3);
   const nv = n[0] * v[0] + n[1] * v[1] + n[2] * v[2]; if(nv === 0) return [T("Linjen $[t, 0, 0]$ skjærer planet $x = 4$. For hvilken $t$?", "The line $[t, 0, 0]$ intersects the plane $x = 4$. For which $t$?"), { n: 4, tol: 0, u: "" }, T("$t = 4$.", "$t = 4$.")];
   const X = P.map((p, i) => p + v[i] * t), rhs = n[0] * X[0] + n[1] * X[1] + n[2] * X[2], lp = i => pl([[P[i], ""], [v[i], "t"]]);
   return [T(`Linjen $[${lp(0)}, ${lp(1)}, ${lp(2)}]$ skjærer planet $${pl([[n[0], "x"], [n[1], "y"], [n[2], "z"]])} = ${rhs}$. For hvilken $t$?`, `The line $[${lp(0)}, ${lp(1)}, ${lp(2)}]$ intersects the plane $${pl([[n[0], "x"], [n[1], "y"], [n[2], "z"]])} = ${rhs}$. For which $t$?`), { n: t, tol: 0.001, u: "" },
     T(`Sett inn: $${n[0] * P[0] + n[1] * P[1] + n[2] * P[2]} + ${nv}t = ${rhs}$, så $t = ${t}$. Skjæringspunktet er $(${X.join(", ")})$.`, `Insert: $${n[0] * P[0] + n[1] * P[1] + n[2] * P[2]} + ${nv}t = ${rhs}$, so $t = ${t}$. The intersection point is $(${X.join(", ")})$.`)]; },
 () => { const a = [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], b = [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], c = [R.i(-3, 3), R.i(-3, 3), R.i(1, 4)];
   const x = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], V = Math.abs(x[0] * c[0] + x[1] * c[1] + x[2] * c[2]);
   return [T(`Finn volumet av parallellepipedet utspent av $\\vec a = ${vec(a)}$, $\\vec b = ${vec(b)}$ og $\\vec c = ${vec(c)}$.`, `Find the volume of the parallelepiped spanned by $\\vec a = ${vec(a)}$, $\\vec b = ${vec(b)}$ and $\\vec c = ${vec(c)}$.`), { n: V, tol: 0, u: "" },
     T(`$\\vec a \\times \\vec b = ${vec(x)}$, og $|(\\vec a \\times \\vec b) \\cdot \\vec c| = ${V}$.`, `$\\vec a \\times \\vec b = ${vec(x)}$, and $|(\\vec a \\times \\vec b) \\cdot \\vec c| = ${V}$.`)]; }
);

// ---------------- R2: flere oppgaver i de gamle enhetene ----------------
GEN("VGR2", 1,
 () => { const a1 = R.i(-5, 10), d = R.p([2, 3, 4, 5, -2, 0.5]), n = R.i(8, 40), an = a1 + (n - 1) * d, S = n * (a1 + an) / 2;
   return [T(`En aritmetisk rekke har $a_1 = ${a1}$ og differanse $d = ${mf(d)}$. Hva er summen av de ${n} første leddene?`, `An arithmetic series has $a_1 = ${a1}$ and difference $d = ${mf(d)}$. What is the sum of the first ${n} terms?`), { n: S, tol: 0.01, u: "" },
     T(`$a_{${n}} = ${a1} + ${n - 1} \\cdot ${mf(d)} = ${mf(an)}$. $S_{${n}} = \\dfrac{${n}(${a1} + ${mf(an)})}{2} = ${mf(S)}$.`, `$a_{${n}} = ${a1} + ${n - 1} \\cdot ${mf(d)} = ${mf(an)}$. $S_{${n}} = \\dfrac{${n}(${a1} + ${mf(an)})}{2} = ${mf(S)}$.`)]; },
 () => { const a = R.p([1, 2, 5, 10, 100]), k = R.p([0.5, 0.25, 0.2, 0.8, -0.5, 0.9]), S = a / (1 - k);
   return [T(`Finn summen av den uendelige geometriske rekken med $a_1 = ${a}$ og $k = ${mf(k)}$.`, `Find the sum of the infinite geometric series with $a_1 = ${a}$ and $k = ${mf(k)}$.`), { n: S, tol: rel(S, 0.002), u: "" },
     T(`$|k| < 1$, så rekken konvergerer: $S = \\dfrac{${a}}{1 - (${mf(k)})} = ${mf(S, 3)}$.`, `$|k| < 1$, so the series converges: $S = \\dfrac{${a}}{1 - (${mf(k)})} = ${mf(S, 3)}$.`)]; }
);
GEN("VGR2", 2,
 () => { const y0 = R.p([10, 50, 100, 200]), k = R.p([0.05, 0.1, 0.2, -0.1, -0.3]), t = R.i(2, 10), y = y0 * Math.exp(k * t);
   return [T(`$y' = ${mf(k)}y$ og $y(0) = ${y0}$. Hva er $y(${t})$?`, `$y' = ${mf(k)}y$ and $y(0) = ${y0}$. What is $y(${t})$?`), { n: y, tol: rel(y, 0.005), u: "" },
     T(`Løsningen er $y = ${y0}e^{${mf(k)}t}$, så $y(${t}) = ${y0}e^{${mf(k * t)}} = ${mf(y, 2)}$.`, `The solution is $y = ${y0}e^{${mf(k)}t}$, so $y(${t}) = ${y0}e^{${mf(k * t)}} = ${mf(y, 2)}$.`)]; },
 () => { const K = R.p([20, 25, 80, 100]), y0 = R.p([90, 60, 5, 0]), k = R.p([0.1, 0.2, 0.05]), t = R.i(3, 15), y = K + (y0 - K) * Math.exp(-k * t);
   return [T(`Newtons avkjølingslov: $T' = -${mf(k)}(T - ${K})$, $T(0) = ${y0}$. Hva er $T(${t})$?`, `Newton's law of cooling: $T' = -${mf(k)}(T - ${K})$, $T(0) = ${y0}$. What is $T(${t})$?`), { n: y, tol: rel(y, 0.005, 0.05), u: "" },
     T(`$T = ${K} + (${y0 - K})e^{-${mf(k)}t}$, så $T(${t}) = ${mf(y, 2)}$.`, `$T = ${K} + (${y0 - K})e^{-${mf(k)}t}$, so $T(${t}) = ${mf(y, 2)}$.`)]; }
);
GEN("VGR2", 3,
 () => { const A = R.p([1, 2, 3, 5]), c = R.p([1, 2, 3, 4, 0.5]), d = R.i(-3, 3), p = 2 * Math.PI / c;
   return [T(`$f(x) = ${A}\\sin(${mf(c)}x) ${d < 0 ? "-" : "+"} ${Math.abs(d)}$. Hva er perioden?`, `$f(x) = ${A}\\sin(${mf(c)}x) ${d < 0 ? "-" : "+"} ${Math.abs(d)}$. What is the period?`), { n: p, tol: 0.01, u: "" },
     T(`$p = \\dfrac{2\\pi}{${mf(c)}} = ${mf(p, 3)}$.`, `$p = \\dfrac{2\\pi}{${mf(c)}} = ${mf(p, 3)}$.`)]; },
 () => { const A = R.p([1, 2, 3]), x0 = R.p([0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2]), lab = ["0", "\\tfrac{\\pi}{6}", "\\tfrac{\\pi}{4}", "\\tfrac{\\pi}{3}", "\\tfrac{\\pi}{2}"][[0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2].indexOf(x0)], v = -A * Math.sin(x0);
   return [T(`$f(x) = ${A === 1 ? "" : A}\\cos x$. Regn ut $f'(${lab})$.`, `$f(x) = ${A === 1 ? "" : A}\\cos x$. Calculate $f'(${lab})$.`), { n: v, tol: 0.001, u: "" },
     T(`$f'(x) = -${A === 1 ? "" : A}\\sin x$, så $f'(${lab}) = ${mf(v, 4)}$.`, `$f'(x) = -${A === 1 ? "" : A}\\sin x$, so $f'(${lab}) = ${mf(v, 4)}$.`)]; }
);
GEN("VGR2", 4,
 () => { const u = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], v = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], x = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], A = Math.hypot(...x);
   return [T(`Finn arealet av parallellogrammet utspent av $${vec(u)}$ og $${vec(v)}$.`, `Find the area of the parallelogram spanned by $${vec(u)}$ and $${vec(v)}$.`), { n: A, tol: rel(A, 0.005, 0.01), u: "" },
     T(`$\\vec u \\times \\vec v = ${vec(x)}$, og lengden er $${mf(A, 3)}$.`, `$\\vec u \\times \\vec v = ${vec(x)}$, and its length is $${mf(A, 3)}$.`)]; }
);
})();
