// ============================================================
//  add_math.js – teori, flere faste oppgaver og generatorer for
//  MEK1000 (Kalkulus), MEK2000 (Lineær algebra og differensialligninger),
//  DAVE3700 (Flervariabel analyse), DAVE3705 (Laplace, Fourier og PDE)
// ============================================================
(() => {
// ---------- små hjelpere (lokale for denne fila) ----------
// polynom/lineærkombinasjon med riktige fortegn: poly([[3,"x^2"],[-1,"x"],[5,""]]) -> "3x^2 - x + 5"
const poly = terms => { let s = ""; for (const [k, t] of terms) { if (k === 0) continue; const ab = Math.abs(k); const co = (ab === 1 && t) ? "" : String(ab);
  if (!s) s = (k < 0 ? "-" : "") + co + t; else s += ` ${k < 0 ? "-" : "+"} ${co}${t}`; } return s || "0"; };
const par = v => v < 0 ? `(${v})` : `${v}`;
const m2 = M => `\\begin{pmatrix}${M[0][0]}&${M[0][1]}\\\\${M[1][0]}&${M[1][1]}\\end{pmatrix}`;
const m3 = M => `\\begin{pmatrix}${M.map(r => r.join("&")).join("\\\\")}\\end{pmatrix}`;
const ekx = (k, v = "x") => k === 0 ? "" : k === 1 ? `e^{${v}}` : k === -1 ? `e^{-${v}}` : `e^{${k}${v}}`;
const sci = x => { const e = Math.floor(Math.log10(Math.abs(x))); return `${mf(x / 10 ** e)}\\cdot 10^{${e}}`; };

// ================================================================
//  MEK1000 Kalkulus
// ================================================================
THEORY("MEK1000", 0, {
nb: `## Hva handler det om?

Den deriverte $f'(x)$ måler hvor raskt en størrelse endrer seg. Geometrisk er den stigningstallet til tangenten i punktet. For en ingeniør er den overalt: fart er den deriverte av posisjon, strøm er den deriverte av ladning, og effekt er den deriverte av energi. Når du leter etter et optimum – minst materialbruk, størst effekt, lavest kostnad – setter du den deriverte lik null.

Formelt er den deriverte grensen av stigningen over et lite intervall:

$$f'(x) = \\lim_{h\\to 0}\\frac{f(x+h) - f(x)}{h}$$

## Begreper og formler

- Potensregelen: $(x^n)' = nx^{n-1}$. Konstante faktorer står igjen, og konstantledd forsvinner: $(5x^3 + 7)' = 15x^2$.
- Standardderiverte: $(e^x)' = e^x$, $(\\ln x)' = \\frac1x$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\arctan x)' = \\frac{1}{1+x^2}$.
- Produktregelen: $(fg)' = f'g + fg'$.
- Brøkregelen: $\\left(\\frac fg\\right)' = \\frac{f'g - fg'}{g^2}$.
- Kjerneregelen: $\\big(f(u(x))\\big)' = f'(u)\\cdot u'(x)$ – ytre derivert ganger indre derivert.
- $f' > 0$: $f$ vokser. $f' < 0$: $f$ avtar. $f'' > 0$: grafen krummer oppover. $f'' < 0$: grafen krummer nedover.
- Tangenten i $x = a$: $y = f(a) + f'(a)(x - a)$.

## Slik løser du oppgavene

1. Finn den ytterste operasjonen i uttrykket (sum, produkt, brøk eller sammensetning), og velg regel etter den.
2. Deriver del for del. Skriv mellomregningen, spesielt den indre deriverte i kjerneregelen.
3. Ekstremalpunkter: løs $f'(x) = 0$. Sjekk fortegnet til $f'$ på hver side, eller fortegnet til $f''$ i punktet.
4. På et lukket intervall $[a, b]$ må du også sjekke endepunktene.
5. Optimering med to ukjente: bruk bibetingelsen til å uttrykke alt med én variabel før du deriverer.

### Eksempel

Finn toppunktet til $f(x) = x\\,e^{-2x}$ for $x \\ge 0$.

1. Produktregelen med kjerneregelen: $f'(x) = 1\\cdot e^{-2x} + x\\cdot(-2)e^{-2x} = e^{-2x}(1 - 2x)$.
2. $e^{-2x}$ er aldri null, så $f'(x) = 0$ gir $1 - 2x = 0$, altså $x = \\frac12$.
3. Fortegn: $f' > 0$ for $x < \\frac12$ og $f' < 0$ for $x > \\frac12$. Det er et toppunkt.
4. Verdien: $f\\left(\\frac12\\right) = \\frac12e^{-1} \\approx 0{,}184$.

Svar: toppunkt i $x = 0{,}5$, med funksjonsverdi omtrent $0{,}184$.

## Vanlige feil

- Å glemme den indre deriverte: $(\\sin 3x)' = 3\\cos 3x$, ikke $\\cos 3x$.
- Å derivere et produkt faktor for faktor: $(fg)' \\neq f'g'$.
- Fortegnsfeil i brøkregelen: telleren er $f'g - fg'$, i den rekkefølgen.
- Å tro at $f'(a) = 0$ alltid betyr topp eller bunn. $f(x) = x^3$ har $f'(0) = 0$, men et terrassepunkt.
- Å glemme endepunktene når du leter etter største og minste verdi på et intervall.

> Deriver utenfra og inn: ytre derivert ganger indre derivert. Et optimum finner du der $f' = 0$ – men sjekk alltid at det faktisk er et maksimum eller minimum.`,
en: `## What is it about?

The derivative $f'(x)$ measures how fast a quantity changes. Geometrically, it is the slope of the tangent line at a point. For an engineer it is everywhere: velocity is the derivative of position, current is the derivative of charge, and power is the derivative of energy. Whenever you look for an optimum – least material, highest power, lowest cost – you set the derivative equal to zero.

Formally, the derivative is the limit of the slope over a small interval:

$$f'(x) = \\lim_{h\\to 0}\\frac{f(x+h) - f(x)}{h}$$

## Key concepts and formulas

- Power rule: $(x^n)' = nx^{n-1}$. Constant factors stay, constant terms vanish: $(5x^3 + 7)' = 15x^2$.
- Standard derivatives: $(e^x)' = e^x$, $(\\ln x)' = \\frac1x$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\arctan x)' = \\frac{1}{1+x^2}$.
- Product rule: $(fg)' = f'g + fg'$.
- Quotient rule: $\\left(\\frac fg\\right)' = \\frac{f'g - fg'}{g^2}$.
- Chain rule: $\\big(f(u(x))\\big)' = f'(u)\\cdot u'(x)$ – outer derivative times inner derivative.
- $f' > 0$: $f$ is increasing. $f' < 0$: $f$ is decreasing. $f'' > 0$: the graph is concave up. $f'' < 0$: concave down.
- Tangent line at $x = a$: $y = f(a) + f'(a)(x - a)$.

## How to solve the problems

1. Identify the outermost operation in the expression (sum, product, quotient or composition) and choose the rule accordingly.
2. Differentiate piece by piece. Write out the intermediate steps, especially the inner derivative in the chain rule.
3. Extreme points: solve $f'(x) = 0$. Check the sign of $f'$ on each side, or the sign of $f''$ at the point.
4. On a closed interval $[a, b]$ you must also check the endpoints.
5. Optimization with two unknowns: use the constraint to express everything in one variable before differentiating.

### Example

Find the maximum of $f(x) = x\\,e^{-2x}$ for $x \\ge 0$.

1. Product rule with the chain rule: $f'(x) = 1\\cdot e^{-2x} + x\\cdot(-2)e^{-2x} = e^{-2x}(1 - 2x)$.
2. $e^{-2x}$ is never zero, so $f'(x) = 0$ gives $1 - 2x = 0$, i.e. $x = \\frac12$.
3. Signs: $f' > 0$ for $x < \\frac12$ and $f' < 0$ for $x > \\frac12$. It is a maximum.
4. The value: $f\\left(\\frac12\\right) = \\frac12e^{-1} \\approx 0.184$.

Answer: a maximum at $x = 0.5$, with a function value of about $0.184$.

## Common mistakes

- Forgetting the inner derivative: $(\\sin 3x)' = 3\\cos 3x$, not $\\cos 3x$.
- Differentiating a product factor by factor: $(fg)' \\neq f'g'$.
- Sign errors in the quotient rule: the numerator is $f'g - fg'$, in that order.
- Believing that $f'(a) = 0$ always means a maximum or minimum. $f(x) = x^3$ has $f'(0) = 0$, but a horizontal inflection point.
- Forgetting the endpoints when looking for the largest and smallest value on an interval.

> Differentiate from the outside in: outer derivative times inner derivative. An optimum is found where $f' = 0$ – but always check that it really is a maximum or minimum.`
});
BIQ("MEK1000", 0, [
 [`$\\dfrac{d}{dx}\\left(3x^4 - 2x + 7\\right) = $`, [`$12x^3 - 2$`, `$12x^3 + 5$`, `$12x^4 - 2$`, `$4x^3 - 2$`],
  `Potensregelen gir $3\\cdot 4x^3 = 12x^3$ og $(-2x)' = -2$. Konstanten 7 har derivert 0.`,
  `$\\dfrac{d}{dx}\\left(3x^4 - 2x + 7\\right) = $`, [`$12x^3 - 2$`, `$12x^3 + 5$`, `$12x^4 - 2$`, `$4x^3 - 2$`],
  `The power rule gives $3\\cdot 4x^3 = 12x^3$ and $(-2x)' = -2$. The constant 7 has derivative 0.`],
 [`$f'(a) = 0$. Hva kan du sikkert si om $f$ i $x = a$?`,
  [`Tangenten er vannrett, men punktet kan være et toppunkt, et bunnpunkt eller et terrassepunkt`, `$f$ har et toppunkt i $x = a$`, `$f$ har et bunnpunkt i $x = a$`, `$f(a) = 0$`],
  `Eksempel: $f(x) = x^3$ har $f'(0) = 0$, men $f$ vokser på begge sider av 0 – et terrassepunkt. Sjekk fortegnet til $f'$ rundt punktet, eller $f''$ i punktet.`,
  `$f'(a) = 0$. What can you say for certain about $f$ at $x = a$?`,
  [`The tangent is horizontal, but the point may be a maximum, a minimum or a horizontal inflection point`, `$f$ has a maximum at $x = a$`, `$f$ has a minimum at $x = a$`, `$f(a) = 0$`],
  `Example: $f(x) = x^3$ has $f'(0) = 0$, but $f$ increases on both sides of 0 – a horizontal inflection point. Check the sign of $f'$ around the point, or $f''$ at the point.`],
 [`$f'(x) > 0$ og $f''(x) < 0$ på et intervall. Hvordan ser grafen ut der?`,
  [`Den stiger, men stadig slakere (krummer nedover)`, `Den stiger stadig brattere (krummer oppover)`, `Den synker og krummer nedover`, `Den synker og krummer oppover`],
  `$f' > 0$ betyr at $f$ vokser. $f'' < 0$ betyr at $f'$ avtar, altså at stigningen blir mindre. Eksempel: $\\ln x$.`,
  `$f'(x) > 0$ and $f''(x) < 0$ on an interval. What does the graph look like there?`,
  [`It rises, but ever more slowly (concave down)`, `It rises ever more steeply (concave up)`, `It falls and is concave down`, `It falls and is concave up`],
  `$f' > 0$ means that $f$ is increasing. $f'' < 0$ means that $f'$ is decreasing, so the slope gets smaller. Example: $\\ln x$.`],
 [`En kuleformet ballong blåses opp slik at volumet øker med 100 cm³/s. Hvor raskt øker radien i det øyeblikket $r = 5$ cm?`, { n: 1 / Math.PI, tol: 0.005, u: "cm/s" },
  `$V = \\tfrac43\\pi r^3$ gir $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$ (kjerneregelen). Da er $\\dfrac{dr}{dt} = \\dfrac{100}{4\\pi\\cdot 25} = \\dfrac1\\pi \\approx 0{,}318$ cm/s.`,
  `A spherical balloon is inflated so that its volume increases by 100 cm³/s. How fast is the radius increasing at the instant when $r = 5$ cm?`, null,
  `$V = \\tfrac43\\pi r^3$ gives $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$ (chain rule). Then $\\dfrac{dr}{dt} = \\dfrac{100}{4\\pi\\cdot 25} = \\dfrac1\\pi \\approx 0.318$ cm/s.`]
]);
GEN("MEK1000", 0,
 // enkel: potensregel med kvadratrot
 () => { const a = R.i(2, 12), c = R.p([1, 4, 9, 16, 25, 36]), s = Math.sqrt(c), v = a / (2 * s);
   return [T(`$f(x) = ${a}\\sqrt{x}$. Hva er $f'(${c})$?`, `$f(x) = ${a}\\sqrt{x}$. What is $f'(${c})$?`), { n: v, tol: rel(v), u: "" },
     T(`$f(x) = ${a}x^{1/2}$ gir $f'(x) = \\dfrac{${a}}{2\\sqrt{x}}$, så $f'(${c}) = \\dfrac{${a}}{2\\cdot ${s}} \\approx ${mf(v, 3)}$.`,
       `$f(x) = ${a}x^{1/2}$ gives $f'(x) = \\dfrac{${a}}{2\\sqrt{x}}$, so $f'(${c}) = \\dfrac{${a}}{2\\cdot ${s}} \\approx ${mf(v, 3)}$.`)]; },
 // middels: brøkregelen
 () => { let a, b, c; do { a = R.i(1, 6); b = R.i(-6, 6); c = R.i(1, 5); } while (a * c === b); const x0 = R.i(0, 4);
   const K = a * c - b, v = K / (x0 + c) ** 2, N = poly([[a, "x"], [b, ""]]);
   return [T(`$f(x) = \\dfrac{${N}}{x + ${c}}$. Hva er $f'(${x0})$?`, `$f(x) = \\dfrac{${N}}{x + ${c}}$. What is $f'(${x0})$?`), { n: v, tol: rel(v, 0.01, 0.001), u: "" },
     T(`Brøkregelen: $f'(x) = \\dfrac{${a}(x + ${c}) - (${N})\\cdot 1}{(x + ${c})^2} = \\dfrac{${K}}{(x + ${c})^2}$. Da er $f'(${x0}) = \\dfrac{${K}}{${(x0 + c) ** 2}} \\approx ${mf(v, 3)}$.`,
       `Quotient rule: $f'(x) = \\dfrac{${a}(x + ${c}) - (${N})\\cdot 1}{(x + ${c})^2} = \\dfrac{${K}}{(x + ${c})^2}$. Then $f'(${x0}) = \\dfrac{${K}}{${(x0 + c) ** 2}} \\approx ${mf(v, 3)}$.`)]; },
 // eksamen: optimering av åpen beholder
 () => { const V = R.p([10, 20, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 400, 500]); const x = Math.cbrt(2 * V), h = V / (x * x), A = 3 * x * x;
   return [T(`En åpen, rett beholder med kvadratisk bunn skal romme ${V} liter (1 liter = 1 dm³). Bunnen har side $x$ og høyden er $h$, begge i dm. Hvor mye plate (bunn pluss fire vegger) trengs minst?`,
       `An open-top box-shaped container with a square base must hold ${V} liters (1 liter = 1 dm³). The base has side $x$ and the height is $h$, both in dm. What is the minimum amount of sheet metal (base plus four walls)?`),
     { n: A, tol: rel(A), u: "dm²" },
     T(`Volumet gir $h = ${V}/x^2$. Arealet er $A(x) = x^2 + 4xh = x^2 + \\dfrac{${4 * V}}{x}$. $A'(x) = 2x - \\dfrac{${4 * V}}{x^2} = 0$ gir $x^3 = ${2 * V}$, altså $x \\approx ${mf(x, 3)}$ dm og $h = x/2 \\approx ${mf(h, 3)}$ dm. $A''(x) > 0$, så det er et minimum: $A = 3x^2 \\approx ${mf(A, 1)}$ dm².`,
       `The volume gives $h = ${V}/x^2$. The area is $A(x) = x^2 + 4xh = x^2 + \\dfrac{${4 * V}}{x}$. $A'(x) = 2x - \\dfrac{${4 * V}}{x^2} = 0$ gives $x^3 = ${2 * V}$, so $x \\approx ${mf(x, 3)}$ dm and $h = x/2 \\approx ${mf(h, 3)}$ dm. $A''(x) > 0$, so it is a minimum: $A = 3x^2 \\approx ${mf(A, 1)}$ dm².`)]; }
);

THEORY("MEK1000", 1, {
nb: `## Hva handler det om?

Integrasjon er det motsatte av derivasjon, og det er verktøyet for å summere opp noe som endrer seg. Kjenner du farten $v(t)$, gir integralet tilbakelagt strekning. Kjenner du en kraft $F(x)$ langs en vei, gir integralet arbeidet. Geometrisk er $\\int_a^b f(x)\\,dx$ arealet med fortegn mellom grafen og $x$-aksen: areal over aksen teller positivt, areal under teller negativt.

## Begreper og formler

- $F$ er en antiderivert til $f$ hvis $F' = f$. Det ubestemte integralet er $\\int f(x)\\,dx = F(x) + C$.
- Analysens fundamentalteorem: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.
- Tabell: $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ for $n \\neq -1$, $\\int \\frac1x\\,dx = \\ln|x| + C$, $\\int e^{kx}\\,dx = \\frac1k e^{kx} + C$, $\\int \\sin kx\\,dx = -\\frac1k\\cos kx + C$ og $\\int \\cos kx\\,dx = \\frac1k\\sin kx + C$.
- Substitusjon: med $u = g(x)$ er $du = g'(x)\\,dx$, og $\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du$.
- Delvis integrasjon: $\\int u\\,v'\\,dx = uv - \\int u'\\,v\\,dx$.
- Areal mellom kurver: $\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$ når $f \\ge g$.
- Middelverdi: $\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$.

## Slik løser du oppgavene

1. Sjekk tabellen først. Skriv om uttrykket (gang ut, del opp brøker) hvis det hjelper.
2. Ser du en sammensatt funksjon ganget med (omtrent) den deriverte av det indre, bruk substitusjon.
3. Et produkt av typen polynom ganger $e^x$, $\\sin x$ eller $\\ln x$: bruk delvis integrasjon. La $u$ være faktoren som blir enklere når den deriveres (men for $\\ln x$: la $u = \\ln x$).
4. Bestemt integral: sett grensene inn i den antideriverte. Ved substitusjon må grensene også regnes om.
5. Kontroller ved å derivere svaret.

### Eksempel

Beregn $\\int_0^{\\pi} x\\sin x\\,dx$.

1. Delvis integrasjon med $u = x$ og $v' = \\sin x$. Da er $u' = 1$ og $v = -\\cos x$.
2. $\\int x\\sin x\\,dx = -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C$.
3. Sett inn grensene: $\\big[-x\\cos x + \\sin x\\big]_0^{\\pi} = \\big(-\\pi\\cdot(-1) + 0\\big) - (0 + 0) = \\pi$.

Svaret er $\\pi \\approx 3{,}14$. Kontroll: $(-x\\cos x + \\sin x)' = -\\cos x + x\\sin x + \\cos x = x\\sin x$.

## Vanlige feil

- Å glemme $+ C$ i ubestemte integraler.
- Å bruke potensregelen på $\\frac1x$. Den gir $\\frac{x^0}{0}$, som er meningsløst. Riktig er $\\ln|x|$.
- Å glemme faktoren $\\frac1k$: $\\int e^{3x}\\,dx = \\frac13 e^{3x} + C$.
- Å beholde de gamle grensene etter substitusjon.
- Å tolke integralet som totalt areal når funksjonen skifter fortegn. Da må intervallet deles opp.

> Integralet summerer opp: areal, strekning, arbeid. Kontroller alltid svaret ved å derivere den antideriverte.`,
en: `## What is it about?

Integration is the reverse of differentiation, and it is the tool for adding up something that changes. If you know the velocity $v(t)$, the integral gives the distance traveled. If you know a force $F(x)$ along a path, the integral gives the work. Geometrically, $\\int_a^b f(x)\\,dx$ is the signed area between the graph and the $x$-axis: area above the axis counts as positive, area below as negative.

## Key concepts and formulas

- $F$ is an antiderivative of $f$ if $F' = f$. The indefinite integral is $\\int f(x)\\,dx = F(x) + C$.
- Fundamental theorem of calculus: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.
- Table: $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ for $n \\neq -1$, $\\int \\frac1x\\,dx = \\ln|x| + C$, $\\int e^{kx}\\,dx = \\frac1k e^{kx} + C$, $\\int \\sin kx\\,dx = -\\frac1k\\cos kx + C$ and $\\int \\cos kx\\,dx = \\frac1k\\sin kx + C$.
- Substitution: with $u = g(x)$ we have $du = g'(x)\\,dx$, and $\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du$.
- Integration by parts: $\\int u\\,v'\\,dx = uv - \\int u'\\,v\\,dx$.
- Area between curves: $\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$ when $f \\ge g$.
- Mean value: $\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$.

## How to solve the problems

1. Check the table first. Rewrite the expression (expand, split fractions) if that helps.
2. If you see a composite function multiplied by (roughly) the derivative of the inner function, use substitution.
3. A product such as a polynomial times $e^x$, $\\sin x$ or $\\ln x$: use integration by parts. Let $u$ be the factor that gets simpler when differentiated (but for $\\ln x$: let $u = \\ln x$).
4. Definite integral: insert the limits into the antiderivative. With substitution, the limits must be converted too.
5. Check by differentiating your answer.

### Example

Evaluate $\\int_0^{\\pi} x\\sin x\\,dx$.

1. Integration by parts with $u = x$ and $v' = \\sin x$. Then $u' = 1$ and $v = -\\cos x$.
2. $\\int x\\sin x\\,dx = -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C$.
3. Insert the limits: $\\big[-x\\cos x + \\sin x\\big]_0^{\\pi} = \\big(-\\pi\\cdot(-1) + 0\\big) - (0 + 0) = \\pi$.

The answer is $\\pi \\approx 3.14$. Check: $(-x\\cos x + \\sin x)' = -\\cos x + x\\sin x + \\cos x = x\\sin x$.

## Common mistakes

- Forgetting $+ C$ in indefinite integrals.
- Applying the power rule to $\\frac1x$. It gives $\\frac{x^0}{0}$, which is meaningless. The correct result is $\\ln|x|$.
- Forgetting the factor $\\frac1k$: $\\int e^{3x}\\,dx = \\frac13 e^{3x} + C$.
- Keeping the old limits after a substitution.
- Interpreting the integral as the total area when the function changes sign. Then the interval must be split.

> The integral adds things up: area, distance, work. Always check your answer by differentiating the antiderivative.`
});
BIQ("MEK1000", 1, [
 [`$\\displaystyle\\int (4x^3 + 2)\\,dx = $`, [`$x^4 + 2x + C$`, `$12x^2 + C$`, `$x^4 + 2 + C$`, `$4x^4 + 2x + C$`],
  `$\\int 4x^3\\,dx = x^4$ og $\\int 2\\,dx = 2x$. Kontroll: $(x^4 + 2x)' = 4x^3 + 2$. $12x^2$ er den deriverte, ikke integralet.`,
  `$\\displaystyle\\int (4x^3 + 2)\\,dx = $`, [`$x^4 + 2x + C$`, `$12x^2 + C$`, `$x^4 + 2 + C$`, `$4x^4 + 2x + C$`],
  `$\\int 4x^3\\,dx = x^4$ and $\\int 2\\,dx = 2x$. Check: $(x^4 + 2x)' = 4x^3 + 2$. $12x^2$ is the derivative, not the integral.`],
 [`$\\displaystyle\\int_{-1}^{1} x^3\\,dx = 0$. Hva betyr det?`,
  [`Arealet over og under $x$-aksen er like stort, så bidragene kansellerer hverandre`, `Arealet mellom grafen og $x$-aksen er 0`, `Funksjonen er 0 på hele intervallet`, `Integralet er ikke definert fordi den nedre grensen er negativ`],
  `$x^3$ er odde. Bidraget fra $[-1, 0]$ er $-\\tfrac14$ og fra $[0, 1]$ er $+\\tfrac14$. Det totale arealet mellom grafen og aksen er $\\tfrac12$.`,
  `$\\displaystyle\\int_{-1}^{1} x^3\\,dx = 0$. What does this mean?`,
  [`The areas above and below the $x$-axis are equal, so the contributions cancel`, `The area between the graph and the $x$-axis is 0`, `The function is 0 on the whole interval`, `The integral does not exist because the lower limit is negative`],
  `$x^3$ is odd. The contribution from $[-1, 0]$ is $-\\tfrac14$ and from $[0, 1]$ it is $+\\tfrac14$. The total area between the graph and the axis is $\\tfrac12$.`],
 [`Du beregner $\\displaystyle\\int_0^2 x\\,e^{x^2}\\,dx$ med substitusjonen $u = x^2$. Hva blir de nye grensene?`,
  [`$u$ fra 0 til 4`, `$u$ fra 0 til 2`, `$u$ fra 0 til $\\sqrt2$`, `Grensene endres ikke ved substitusjon`],
  `Grensene må regnes om: $u(0) = 0$ og $u(2) = 4$. Med $du = 2x\\,dx$ blir integralet $\\tfrac12\\int_0^4 e^u\\,du = \\tfrac12(e^4 - 1)$.`,
  `You evaluate $\\displaystyle\\int_0^2 x\\,e^{x^2}\\,dx$ with the substitution $u = x^2$. What are the new limits?`,
  [`$u$ from 0 to 4`, `$u$ from 0 to 2`, `$u$ from 0 to $\\sqrt2$`, `The limits do not change in a substitution`],
  `The limits must be converted: $u(0) = 0$ and $u(2) = 4$. With $du = 2x\\,dx$ the integral becomes $\\tfrac12\\int_0^4 e^u\\,du = \\tfrac12(e^4 - 1)$.`],
 [`En partikkel har farten $v(t) = t\\,e^{-t/2}$ m/s. Hvor langt beveger den seg fra $t = 0$ til $t = 4$ s?`, { n: 4 - 12 * Math.exp(-2), tol: rel(4 - 12 * Math.exp(-2)), u: "m" },
  `Delvis integrasjon med $f = t$ og $g' = e^{-t/2}$, så $g = -2e^{-t/2}$: $\\int t\\,e^{-t/2}\\,dt = -2t\\,e^{-t/2} + \\int 2e^{-t/2}\\,dt = -2t\\,e^{-t/2} - 4e^{-t/2} + C$. Innsatt: $(-8 - 4)e^{-2} - (0 - 4) = 4 - 12e^{-2} \\approx 2{,}376$ m.`,
  `A particle has velocity $v(t) = t\\,e^{-t/2}$ m/s. How far does it move from $t = 0$ to $t = 4$ s?`, null,
  `Integration by parts with $f = t$ and $g' = e^{-t/2}$, so $g = -2e^{-t/2}$: $\\int t\\,e^{-t/2}\\,dt = -2t\\,e^{-t/2} + \\int 2e^{-t/2}\\,dt = -2t\\,e^{-t/2} - 4e^{-t/2} + C$. Inserting the limits: $(-8 - 4)e^{-2} - (0 - 4) = 4 - 12e^{-2} \\approx 2.376$ m.`]
]);
GEN("MEK1000", 1,
 // enkel: integral av k*sqrt(x)
 () => { const k = R.i(1, 9), b = R.p([1, 4, 9, 16, 25]), s = Math.sqrt(b), v = 2 * k * s ** 3 / 3;
   return [`$\\displaystyle\\int_0^{${b}} ${k === 1 ? "" : k}\\sqrt{x}\\,dx = $`, { n: v, tol: rel(v), u: "" },
     `$\\left[\\tfrac{${2 * k}}{3}x^{3/2}\\right]_0^{${b}} = \\tfrac{${2 * k}}{3}\\cdot ${s ** 3} \\approx ${mf(v, 3)}$.`]; },
 // middels: substitusjon
 () => { const k = R.p([1, 2, 3, 4, 5, 6, 8, 10]), b = R.i(1, 5), v = k / 2 * Math.log(b * b + 1);
   return [T(`Hva er $\\displaystyle\\int_0^{${b}} \\frac{${k === 1 ? "" : k}x}{x^2 + 1}\\,dx$?`, `What is $\\displaystyle\\int_0^{${b}} \\frac{${k === 1 ? "" : k}x}{x^2 + 1}\\,dx$?`), { n: v, tol: rel(v), u: "" },
     T(`Substitusjon $u = x^2 + 1$, $du = 2x\\,dx$, med nye grenser $u = 1$ og $u = ${b * b + 1}$: integralet blir $\\tfrac{${k}}{2}\\int_1^{${b * b + 1}}\\frac{du}{u} = \\tfrac{${k}}{2}\\ln ${b * b + 1} \\approx ${mf(v, 3)}$.`,
       `Substitution $u = x^2 + 1$, $du = 2x\\,dx$, with new limits $u = 1$ and $u = ${b * b + 1}$: the integral becomes $\\tfrac{${k}}{2}\\int_1^{${b * b + 1}}\\frac{du}{u} = \\tfrac{${k}}{2}\\ln ${b * b + 1} \\approx ${mf(v, 3)}$.`)]; },
 // eksamen: bremsestrekning fra fartsfunksjon
 () => { const a = R.p([0.5, 1, 1.5, 2, 2.5, 3]), v0 = R.i(10, 30); const ts = Math.sqrt(v0 / a), s = 2 / 3 * v0 * ts;
   return [T(`En bil bremser slik at farten er $v(t) = ${v0} - ${mf(a)}t^2$ m/s ($t$ i sekunder fra bremsestart). Hvor langt kjører bilen før den står stille?`,
       `A car brakes so that its speed is $v(t) = ${v0} - ${mf(a)}t^2$ m/s ($t$ in seconds from the start of braking). How far does the car travel before it stops?`),
     { n: s, tol: rel(s), u: "m" },
     T(`Bilen står stille når $v = 0$: $t_s = \\sqrt{${v0}/${mf(a)}} \\approx ${mf(ts, 3)}$ s. Strekningen er $s = \\int_0^{t_s}(${v0} - ${mf(a)}t^2)\\,dt = ${v0}t_s - \\tfrac{${mf(a)}}{3}t_s^3 = \\tfrac23\\cdot ${v0}\\cdot t_s \\approx ${mf(s, 1)}$ m.`,
       `The car stops when $v = 0$: $t_s = \\sqrt{${v0}/${mf(a)}} \\approx ${mf(ts, 3)}$ s. The distance is $s = \\int_0^{t_s}(${v0} - ${mf(a)}t^2)\\,dt = ${v0}t_s - \\tfrac{${mf(a)}}{3}t_s^3 = \\tfrac23\\cdot ${v0}\\cdot t_s \\approx ${mf(s, 1)}$ m.`)]; }
);

THEORY("MEK1000", 2, {
nb: `## Hva handler det om?

Denne enheten samler tre verktøy som går igjen i resten av studiet. **Grenser** beskriver hva en funksjon nærmer seg, for eksempel verdien et signal stabiliserer seg på. **Rekker og Taylorpolynomer** erstatter en vanskelig funksjon med et polynom som er lett å regne med – slik kalkulatorer og simuleringsprogrammer faktisk regner. **Komplekse tall** gjør svingninger og vekselstrøm enkle: en rotasjon blir en multiplikasjon.

## Begreper og formler

- Standardgrense: $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$. Når $x\\to\\infty$ bestemmer de høyeste potensene grensen til en brøk av polynomer.
- L'Hôpitals regel: ved formen $\\frac00$ eller $\\frac\\infty\\infty$ er $\\lim\\frac fg = \\lim\\frac{f'}{g'}$.
- Geometrisk rekke: $\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}$ når $|r| < 1$. Ellers divergerer den.
- Taylorpolynom om 0: $f(x) \\approx f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\dots$
- Kjente rekker: $e^x = 1 + x + \\frac{x^2}{2!} + \\dots$, $\\sin x = x - \\frac{x^3}{3!} + \\dots$ og $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$
- Komplekst tall: $z = a + bi$ med $i^2 = -1$. Modulus $|z| = \\sqrt{a^2 + b^2}$. Argumentet $\\theta$ er vinkelen fra den positive reelle aksen.
- Polarform og Eulers formel: $z = re^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)$, og $z^n = r^ne^{in\\theta}$. Ved multiplikasjon ganges lengdene, og vinklene legges sammen.
- Divisjon: gang med den konjugerte av nevneren, $\\frac{z}{w} = \\frac{z\\bar w}{|w|^2}$. I elektroteknikk skrives ofte $j$ i stedet for $i$.

## Slik løser du oppgavene

1. Grense: sett inn verdien først. Får du et tall, er du ferdig. Får du $\\frac00$ eller $\\frac\\infty\\infty$, bruk faktorisering, L'Hôpital eller Taylor.
2. Rekke: kjenn igjen typen, og sjekk konvergensbetingelsen før du bruker en sumformel.
3. Taylor: sett ofte bare inn i en kjent rekke, for eksempel $e^{2x} = 1 + 2x + 2x^2 + \\dots$
4. Komplekse tall: bruk $a + bi$ ved addisjon og polarform ved multiplikasjon, divisjon og potenser. Tegn tallet for å få riktig kvadrant for argumentet.

### Eksempel

a) Finn $\\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2}$. Innsetting gir $\\frac00$. Taylor: $1 - \\cos x = \\frac{x^2}{2} - \\frac{x^4}{24} + \\dots$, så brøken er $\\frac12 - \\frac{x^2}{24} + \\dots$ som går mot $\\frac12$. L'Hôpital to ganger gir det samme.

b) Finn $z^6$ for $z = 1 + i\\sqrt3$. Her er $|z| = \\sqrt{1 + 3} = 2$ og $\\theta = \\arctan\\sqrt3 = 60^\\circ$. Da er $z^6 = 2^6e^{i\\cdot 360^\\circ} = 64$.

## Vanlige feil

- Å bruke L'Hôpital når uttrykket ikke er av typen $\\frac00$ eller $\\frac\\infty\\infty$.
- Å bruke $\\frac{1}{1-r}$ når $|r| \\ge 1$.
- Å glemme fakultetene i Taylorrekker.
- Å regne argumentet som $\\arctan\\frac ba$ uten å sjekke kvadranten: $-1 - i$ har argument $-135^\\circ$, ikke $45^\\circ$.
- Å gange ut komplekse tall uten å bruke $i^2 = -1$.

> Grenser: sett inn først. Rekker: sjekk konvergens. Komplekse tall: tenk lengde og vinkel – multiplikasjon ganger lengdene og legger sammen vinklene.`,
en: `## What is it about?

This unit collects three tools that come back throughout your studies. **Limits** describe what a function approaches, for example the value a signal settles at. **Series and Taylor polynomials** replace a difficult function with a polynomial that is easy to compute with – which is how calculators and simulation software actually work. **Complex numbers** make oscillations and AC circuits simple: a rotation becomes a multiplication.

## Key concepts and formulas

- Standard limit: $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$. As $x\\to\\infty$, the highest powers determine the limit of a ratio of polynomials.
- L'Hôpital's rule: for the forms $\\frac00$ or $\\frac\\infty\\infty$, $\\lim\\frac fg = \\lim\\frac{f'}{g'}$.
- Geometric series: $\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}$ when $|r| < 1$. Otherwise it diverges.
- Taylor polynomial about 0: $f(x) \\approx f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\dots$
- Known series: $e^x = 1 + x + \\frac{x^2}{2!} + \\dots$, $\\sin x = x - \\frac{x^3}{3!} + \\dots$ and $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$
- Complex number: $z = a + bi$ with $i^2 = -1$. Modulus $|z| = \\sqrt{a^2 + b^2}$. The argument $\\theta$ is the angle from the positive real axis.
- Polar form and Euler's formula: $z = re^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)$, and $z^n = r^ne^{in\\theta}$. In a multiplication the lengths are multiplied and the angles are added.
- Division: multiply by the conjugate of the denominator, $\\frac{z}{w} = \\frac{z\\bar w}{|w|^2}$. In electrical engineering $j$ is often written instead of $i$.

## How to solve the problems

1. Limit: substitute the value first. If you get a number, you are done. If you get $\\frac00$ or $\\frac\\infty\\infty$, use factoring, L'Hôpital or Taylor.
2. Series: identify the type and check the convergence condition before using a sum formula.
3. Taylor: often you can just substitute into a known series, for example $e^{2x} = 1 + 2x + 2x^2 + \\dots$
4. Complex numbers: use $a + bi$ for addition and polar form for multiplication, division and powers. Sketch the number to get the right quadrant for the argument.

### Example

a) Find $\\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2}$. Substitution gives $\\frac00$. Taylor: $1 - \\cos x = \\frac{x^2}{2} - \\frac{x^4}{24} + \\dots$, so the fraction is $\\frac12 - \\frac{x^2}{24} + \\dots$, which tends to $\\frac12$. Applying L'Hôpital twice gives the same result.

b) Find $z^6$ for $z = 1 + i\\sqrt3$. Here $|z| = \\sqrt{1 + 3} = 2$ and $\\theta = \\arctan\\sqrt3 = 60^\\circ$. Then $z^6 = 2^6e^{i\\cdot 360^\\circ} = 64$.

## Common mistakes

- Using L'Hôpital when the expression is not of the form $\\frac00$ or $\\frac\\infty\\infty$.
- Using $\\frac{1}{1-r}$ when $|r| \\ge 1$.
- Forgetting the factorials in Taylor series.
- Computing the argument as $\\arctan\\frac ba$ without checking the quadrant: $-1 - i$ has argument $-135^\\circ$, not $45^\\circ$.
- Multiplying out complex numbers without using $i^2 = -1$.

> Limits: substitute first. Series: check convergence. Complex numbers: think length and angle – multiplication multiplies the lengths and adds the angles.`
});
BIQ("MEK1000", 2, [
 [`Den geometriske rekken $\\sum_{n=0}^{\\infty} r^n$ konvergerer når …`, [`$|r| < 1$`, `$r < 1$`, `$|r| \\le 1$`, `$r > 0$`],
  `For $|r| < 1$ er summen $\\dfrac{1}{1-r}$. Med $r = -2$ (som oppfyller $r < 1$) vokser leddene, og med $r = 1$ blir summen uendelig.`,
  `The geometric series $\\sum_{n=0}^{\\infty} r^n$ converges when …`, [`$|r| < 1$`, `$r < 1$`, `$|r| \\le 1$`, `$r > 0$`],
  `For $|r| < 1$ the sum is $\\dfrac{1}{1-r}$. With $r = -2$ (which satisfies $r < 1$) the terms grow, and with $r = 1$ the sum is infinite.`],
 [`Hva er galt med å bruke L'Hôpitals regel på $\\displaystyle\\lim_{x\\to 1}\\frac{x^2 + 1}{x + 1}$?`,
  [`Uttrykket er ikke av typen $0/0$ eller $\\infty/\\infty$, og grensen er bare $2/2 = 1$`, `Ingenting, regelen gir riktig svar $2x/1 \\to 2$`, `Grensen finnes ikke`, `Regelen gjelder bare når $x \\to \\infty$`],
  `Sett alltid inn først. Her er både teller og nevner lik 2, så grensen er 1. L'Hôpital ville feilaktig gitt 2.`,
  `What is wrong with using L'Hôpital's rule on $\\displaystyle\\lim_{x\\to 1}\\frac{x^2 + 1}{x + 1}$?`,
  [`The expression is not of the form $0/0$ or $\\infty/\\infty$, and the limit is simply $2/2 = 1$`, `Nothing, the rule gives the correct answer $2x/1 \\to 2$`, `The limit does not exist`, `The rule only applies when $x \\to \\infty$`],
  `Always substitute first. Here both the numerator and the denominator equal 2, so the limit is 1. L'Hôpital would wrongly give 2.`],
 [`Hva skjer med et komplekst tall $z$ i det komplekse planet når du ganger det med $i$?`,
  [`Det roteres $90^\\circ$ mot klokka, og lengden er uendret`, `Det speiles om den reelle aksen`, `Lengden dobles`, `Det roteres $180^\\circ$`],
  `$i = e^{i\\pi/2}$ har lengde 1 og argument $90^\\circ$. Ved multiplikasjon legges argumentene sammen og lengdene ganges. Eksempel: $i\\cdot(2 + i) = -1 + 2i$.`,
  `What happens to a complex number $z$ in the complex plane when you multiply it by $i$?`,
  [`It is rotated $90^\\circ$ counterclockwise, and its length is unchanged`, `It is reflected in the real axis`, `Its length is doubled`, `It is rotated $180^\\circ$`],
  `$i = e^{i\\pi/2}$ has length 1 and argument $90^\\circ$. In a multiplication the arguments are added and the lengths are multiplied. Example: $i\\cdot(2 + i) = -1 + 2i$.`],
 [`$z = \\dfrac{3 + 4i}{1 - 2i}$. Hva er realdelen av $z$?`, { n: -1, tol: 0.01, u: "" },
  `Gang med den konjugerte av nevneren: $z = \\dfrac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)} = \\dfrac{3 + 6i + 4i + 8i^2}{1 + 4} = \\dfrac{-5 + 10i}{5} = -1 + 2i$. Realdelen er $-1$.`,
  `$z = \\dfrac{3 + 4i}{1 - 2i}$. What is the real part of $z$?`, null,
  `Multiply by the conjugate of the denominator: $z = \\dfrac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)} = \\dfrac{3 + 6i + 4i + 8i^2}{1 + 4} = \\dfrac{-5 + 10i}{5} = -1 + 2i$. The real part is $-1$.`]
]);
GEN("MEK1000", 2,
 // enkel: fra polarform til a + bi
 () => { const r = R.i(2, 10), A = R.p([["\\pi/6", 1 / 6], ["\\pi/4", 1 / 4], ["\\pi/3", 1 / 3], ["\\pi/2", 1 / 2], ["2\\pi/3", 2 / 3], ["3\\pi/4", 3 / 4], ["5\\pi/6", 5 / 6], ["\\pi", 1], ["-\\pi/3", -1 / 3], ["-3\\pi/4", -3 / 4]]), im = R.i(0, 1);
   const th = A[1] * Math.PI; let v = im ? r * Math.sin(th) : r * Math.cos(th); v = Math.round(v * 1e9) / 1e9;
   const ex = A[1] < 0 ? `-i${A[0].slice(1)}` : `i${A[0]}`, fn = im ? "sin" : "cos";
   return [T(`$z = ${r}e^{${ex}}$. Hva er ${im ? "imaginærdelen" : "realdelen"} av $z$?`, `$z = ${r}e^{${ex}}$. What is the ${im ? "imaginary" : "real"} part of $z$?`), { n: v, tol: rel(v, 0.01, 0.01), u: "" },
     T(`Eulers formel: $z = ${r}\\big(\\cos(${A[0]}) + i\\sin(${A[0]})\\big)$, så ${im ? "imaginærdelen" : "realdelen"} er $${r}\\${fn}(${A[0]}) \\approx ${mf(v, 3)}$.`,
       `Euler's formula: $z = ${r}\\big(\\cos(${A[0]}) + i\\sin(${A[0]})\\big)$, so the ${im ? "imaginary" : "real"} part is $${r}\\${fn}(${A[0]}) \\approx ${mf(v, 3)}$.`)]; },
 // middels: grense med Taylor
 () => { const a = R.i(2, 6), k = R.i(0, 2);
   const F = [[`1 - \\cos(${a}x)`, `x^2`, a * a / 2, `1 - \\cos(${a}x) = \\frac{(${a}x)^2}{2} - \\frac{(${a}x)^4}{24} + \\dots = ${a * a / 2 === Math.round(a * a / 2) ? a * a / 2 : `\\tfrac{${a * a}}{2}`}x^2 + \\dots`],
     [`e^{${a}x} - 1 - ${a}x`, `x^2`, a * a / 2, `e^{${a}x} = 1 + ${a}x + \\frac{(${a}x)^2}{2} + \\dots`],
     [`\\sin(${a}x) - ${a}x`, `x^3`, -(a ** 3) / 6, `\\sin(${a}x) = ${a}x - \\frac{(${a}x)^3}{6} + \\dots`]][k];
   const v = F[2];
   return [`$\\displaystyle\\lim_{x\\to 0}\\frac{${F[0]}}{${F[1]}} = $`, { n: v, tol: rel(v), u: "" },
     T(`Innsetting gir $0/0$. Taylor: $${F[3]}$ Bare leddet med $${F[1]}$ overlever i grensen, så svaret er $${k === 2 ? `-\\tfrac{${a ** 3}}{6}` : `\\tfrac{${a * a}}{2}`} \\approx ${mf(v, 3)}$.`,
       `Substitution gives $0/0$. Taylor: $${F[3]}$ Only the term with $${F[1]}$ survives in the limit, so the answer is $${k === 2 ? `-\\tfrac{${a ** 3}}{6}` : `\\tfrac{${a * a}}{2}`} \\approx ${mf(v, 3)}$.`)]; },
 // eksamen: kompleks impedans i RLC-krets
 () => { const Rr = R.i(2, 20) * 5, L = R.p([0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5]), C = R.p([10, 22, 33, 47, 68, 100, 150, 220]), U = 230;
   const w = 2 * Math.PI * 50, XL = w * L, XC = 1 / (w * C * 1e-6), X = XL - XC, Z = Math.hypot(Rr, X), I = U / Z;
   return [T(`En seriekrets med $R = ${Rr}\\ \\Omega$, $L = ${mf(L)}\\ \\mathrm{H}$ og $C = ${C}\\ \\mu\\mathrm{F}$ er koblet til 230 V (effektivverdi), 50 Hz. Impedansen er $Z = R + j\\left(\\omega L - \\frac{1}{\\omega C}\\right)$. Hvor stor er strømmen $I = U/|Z|$?`,
       `A series circuit with $R = ${Rr}\\ \\Omega$, $L = ${mf(L)}\\ \\mathrm{H}$ and $C = ${C}\\ \\mu\\mathrm{F}$ is connected to 230 V (RMS), 50 Hz. The impedance is $Z = R + j\\left(\\omega L - \\frac{1}{\\omega C}\\right)$. What is the current $I = U/|Z|$?`),
     { n: I, tol: rel(I), u: "A" },
     T(`$\\omega = 2\\pi\\cdot 50 \\approx ${mf(w, 1)}$ rad/s. $X_L = \\omega L \\approx ${mf(XL, 1)}\\ \\Omega$ og $X_C = \\frac{1}{\\omega C} \\approx ${mf(XC, 1)}\\ \\Omega$, så $Z \\approx ${Rr} ${X < 0 ? "-" : "+"} j\\,${mf(Math.abs(X), 1)}\\ \\Omega$. $|Z| = \\sqrt{${Rr}^2 + (${mf(X, 1)})^2} \\approx ${mf(Z, 1)}\\ \\Omega$ og $I = ${U}/${mf(Z, 1)} \\approx ${mf(I, 3)}$ A.`,
       `$\\omega = 2\\pi\\cdot 50 \\approx ${mf(w, 1)}$ rad/s. $X_L = \\omega L \\approx ${mf(XL, 1)}\\ \\Omega$ and $X_C = \\frac{1}{\\omega C} \\approx ${mf(XC, 1)}\\ \\Omega$, so $Z \\approx ${Rr} ${X < 0 ? "-" : "+"} j\\,${mf(Math.abs(X), 1)}\\ \\Omega$. $|Z| = \\sqrt{${Rr}^2 + (${mf(X, 1)})^2} \\approx ${mf(Z, 1)}\\ \\Omega$ and $I = ${U}/${mf(Z, 1)} \\approx ${mf(I, 3)}$ A.`)]; }
);

// ================================================================
//  MEK2000 Lineær algebra og differensialligninger
// ================================================================
THEORY("MEK2000", 0, {
nb: `## Hva handler det om?

En matrise er en tabell med tall, men den viktigste tolkningen er at den er en **lineær avbildning**: $A$ tar en vektor $\\vec x$ og gir en ny vektor $A\\vec x$. Et fagverk, en elektrisk krets eller en FEM-modell ender til slutt som et stort matrisesystem. Determinanten forteller om avbildningen kan reverseres, og den inverse matrisen reverserer den.

## Begreper og formler

- En $m\\times n$-matrise har $m$ rader og $n$ kolonner. $AB$ er definert når antall kolonner i $A$ er lik antall rader i $B$: $(m\\times n)(n\\times p)$ gir $m\\times p$.
- Elementet $(AB)_{ij}$ er rad $i$ i $A$ prikket med kolonne $j$ i $B$. Generelt er $AB \\neq BA$.
- Transponert: $(A^T)_{ij} = A_{ji}$, og $(AB)^T = B^TA^T$.
- Determinant: $\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc$. For $3\\times 3$ brukes kofaktorutvikling langs en rad eller kolonne.
- Regneregler: $\\det(AB) = \\det A\\cdot\\det B$, $\\det A^T = \\det A$ og $\\det(kA) = k^n\\det A$ for en $n\\times n$-matrise. Et radbytte skifter fortegn.
- $|\\det A|$ er faktoren som areal (2D) eller volum (3D) skaleres med.
- Invers: $AA^{-1} = A^{-1}A = I$. Den finnes bare når $\\det A \\neq 0$. For $2\\times 2$: bytt diagonalelementene, skift fortegn på de andre og del på determinanten.
- Vektorer: $\\vec u\\cdot\\vec v = |\\vec u||\\vec v|\\cos\\theta$ og $|\\vec u| = \\sqrt{\\vec u\\cdot\\vec u}$. Kryssproduktet $\\vec u\\times\\vec v$ står vinkelrett på begge, og lengden er arealet av parallellogrammet de utspenner.

## Slik løser du oppgavene

1. Skriv opp dimensjonene først, så du ser om produktet er definert og hvor stort det blir.
2. Regn produkter element for element: rad ganger kolonne.
3. $3\\times 3$-determinant: utvikle langs raden eller kolonnen med flest nuller. For trekantmatriser er determinanten produktet av diagonalen.
4. Invers: sjekk at $\\det A \\neq 0$ først, og kontroller svaret med $AA^{-1} = I$.
5. Små systemer $A\\vec x = \\vec b$ kan løses med $\\vec x = A^{-1}\\vec b$. Store systemer løses med eliminasjon.

### Eksempel

Løs $A\\vec x = \\vec b$ med $A = \\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$ og $\\vec b = (4, 7)$.

1. $\\det A = 3\\cdot 2 - 1\\cdot 5 = 1 \\neq 0$, så $A$ er inverterbar.
2. $A^{-1} = \\frac11\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$.
3. $\\vec x = A^{-1}\\vec b = (2\\cdot 4 - 1\\cdot 7,\\ -5\\cdot 4 + 3\\cdot 7) = (1, 1)$.
4. Kontroll: $3 + 1 = 4$ og $5 + 2 = 7$. Riktig.

## Vanlige feil

- Å gange element for element i stedet for rad ganger kolonne.
- Å bytte rekkefølge: $AB$ og $BA$ er vanligvis forskjellige, og $(AB)^{-1} = B^{-1}A^{-1}$.
- Å tro at $\\det(A + B) = \\det A + \\det B$. Det stemmer ikke.
- Å glemme at $\\det(2A) = 2^n\\det A$, ikke $2\\det A$.
- Å blande prikkprodukt (et tall) og kryssprodukt (en vektor).

> Rad ganger kolonne, og rekkefølgen betyr noe. $\\det A \\neq 0$ betyr at $A$ er inverterbar og at $A\\vec x = \\vec b$ har nøyaktig én løsning.`,
en: `## What is it about?

A matrix is a table of numbers, but its most important interpretation is as a **linear map**: $A$ takes a vector $\\vec x$ and returns a new vector $A\\vec x$. A truss, an electric circuit or a finite element model eventually becomes a large matrix system. The determinant tells you whether the map can be reversed, and the inverse matrix reverses it.

## Key concepts and formulas

- An $m\\times n$ matrix has $m$ rows and $n$ columns. $AB$ is defined when the number of columns of $A$ equals the number of rows of $B$: $(m\\times n)(n\\times p)$ gives $m\\times p$.
- The element $(AB)_{ij}$ is row $i$ of $A$ dotted with column $j$ of $B$. In general $AB \\neq BA$.
- Transpose: $(A^T)_{ij} = A_{ji}$, and $(AB)^T = B^TA^T$.
- Determinant: $\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc$. For $3\\times 3$, use cofactor expansion along a row or column.
- Rules: $\\det(AB) = \\det A\\cdot\\det B$, $\\det A^T = \\det A$ and $\\det(kA) = k^n\\det A$ for an $n\\times n$ matrix. Swapping two rows changes the sign.
- $|\\det A|$ is the factor by which area (2D) or volume (3D) is scaled.
- Inverse: $AA^{-1} = A^{-1}A = I$. It exists only when $\\det A \\neq 0$. For $2\\times 2$: swap the diagonal elements, change the sign of the others and divide by the determinant.
- Vectors: $\\vec u\\cdot\\vec v = |\\vec u||\\vec v|\\cos\\theta$ and $|\\vec u| = \\sqrt{\\vec u\\cdot\\vec u}$. The cross product $\\vec u\\times\\vec v$ is perpendicular to both, and its length is the area of the parallelogram they span.

## How to solve the problems

1. Write down the dimensions first, so you can see whether the product is defined and how large it is.
2. Compute products element by element: row times column.
3. $3\\times 3$ determinant: expand along the row or column with the most zeros. For triangular matrices the determinant is the product of the diagonal.
4. Inverse: check that $\\det A \\neq 0$ first, and verify the answer with $AA^{-1} = I$.
5. Small systems $A\\vec x = \\vec b$ can be solved with $\\vec x = A^{-1}\\vec b$. Large systems are solved by elimination.

### Example

Solve $A\\vec x = \\vec b$ with $A = \\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}$ and $\\vec b = (4, 7)$.

1. $\\det A = 3\\cdot 2 - 1\\cdot 5 = 1 \\neq 0$, so $A$ is invertible.
2. $A^{-1} = \\frac11\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$.
3. $\\vec x = A^{-1}\\vec b = (2\\cdot 4 - 1\\cdot 7,\\ -5\\cdot 4 + 3\\cdot 7) = (1, 1)$.
4. Check: $3 + 1 = 4$ and $5 + 2 = 7$. Correct.

## Common mistakes

- Multiplying element by element instead of row times column.
- Changing the order: $AB$ and $BA$ are usually different, and $(AB)^{-1} = B^{-1}A^{-1}$.
- Believing that $\\det(A + B) = \\det A + \\det B$. It is not true.
- Forgetting that $\\det(2A) = 2^n\\det A$, not $2\\det A$.
- Mixing up the dot product (a number) and the cross product (a vector).

> Row times column, and the order matters. $\\det A \\neq 0$ means that $A$ is invertible and that $A\\vec x = \\vec b$ has exactly one solution.`
});
BIQ("MEK2000", 0, [
 [`$A$ er en $2\\times 3$-matrise og $B$ er en $3\\times 4$-matrise. Hvilken størrelse har $AB$?`, [`$2\\times 4$`, `$3\\times 3$`, `$4\\times 2$`, `Produktet er ikke definert`],
  `De indre dimensjonene (3 og 3) må være like, og de ytre gir størrelsen: $(2\\times 3)(3\\times 4)$ gir $2\\times 4$. Produktet $BA$ er derimot ikke definert.`,
  `$A$ is a $2\\times 3$ matrix and $B$ is a $3\\times 4$ matrix. What is the size of $AB$?`, [`$2\\times 4$`, `$3\\times 3$`, `$4\\times 2$`, `The product is not defined`],
  `The inner dimensions (3 and 3) must match, and the outer ones give the size: $(2\\times 3)(3\\times 4)$ gives $2\\times 4$. The product $BA$, however, is not defined.`],
 [`$A$ er en $3\\times 3$-matrise med $\\det A = 5$. Hva er $\\det(2A)$?`, [`$40$`, `$10$`, `$30$`, `$25$`],
  `Hver av de tre radene ganges med 2, og hver rad gir en faktor 2: $\\det(2A) = 2^3\\det A = 8\\cdot 5 = 40$.`,
  `$A$ is a $3\\times 3$ matrix with $\\det A = 5$. What is $\\det(2A)$?`, [`$40$`, `$10$`, `$30$`, `$25$`],
  `Each of the three rows is multiplied by 2, and each row contributes a factor 2: $\\det(2A) = 2^3\\det A = 8\\cdot 5 = 40$.`],
 [`Hva skjer med determinanten hvis du bytter om to rader i matrisen?`, [`Den skifter fortegn`, `Den er uendret`, `Den blir 0`, `Den dobles`],
  `Et radbytte gir faktoren $-1$. Å legge et multiplum av en rad til en annen endrer derimot ikke determinanten, og to like rader gir determinant 0.`,
  `What happens to the determinant if you swap two rows of the matrix?`, [`It changes sign`, `It is unchanged`, `It becomes 0`, `It doubles`],
  `A row swap gives a factor $-1$. Adding a multiple of one row to another, on the other hand, does not change the determinant, and two equal rows give determinant 0.`],
 [`For hvilken verdi av $k$ er $A = \\begin{pmatrix}1&2&k\\\\0&1&3\\\\2&1&1\\end{pmatrix}$ ikke inverterbar?`, { n: 5, tol: 0.01, u: "" },
  `Kofaktorutvikling langs første rad: $\\det A = 1\\cdot(1 - 3) - 2\\cdot(0 - 6) + k\\cdot(0 - 2) = 10 - 2k$. $A$ er ikke inverterbar når $\\det A = 0$, altså $k = 5$.`,
  `For which value of $k$ is $A = \\begin{pmatrix}1&2&k\\\\0&1&3\\\\2&1&1\\end{pmatrix}$ not invertible?`, null,
  `Cofactor expansion along the first row: $\\det A = 1\\cdot(1 - 3) - 2\\cdot(0 - 6) + k\\cdot(0 - 2) = 10 - 2k$. $A$ is not invertible when $\\det A = 0$, i.e. $k = 5$.`]
]);
GEN("MEK2000", 0,
 // enkel: matrise ganger vektor
 () => { const A = [[R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)], [R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)], [R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)]], x = [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)], i = R.i(0, 2);
   const v = A[i][0] * x[0] + A[i][1] * x[1] + A[i][2] * x[2], xs = `\\begin{pmatrix}${x.join("\\\\")}\\end{pmatrix}`, sum = A[i].map((a, k) => `(${a})(${x[k]})`).join(" + ");
   return [T(`$A = ${m3(A)}$ og $\\vec x = ${xs}$. Hva er komponent ${i + 1} av $A\\vec x$?`, `$A = ${m3(A)}$ and $\\vec x = ${xs}$. What is component ${i + 1} of $A\\vec x$?`), { n: v, tol: 0, u: "" },
     T(`Rad ${i + 1} i $A$ prikket med $\\vec x$: $${sum} = ${v}$.`, `Row ${i + 1} of $A$ dotted with $\\vec x$: $${sum} = ${v}$.`)]; },
 // middels: element i invers matrise
 () => { let a, b, c, d, D; do { a = R.i(-5, 6); b = R.i(-5, 6); c = R.i(-5, 6); d = R.i(-5, 6); D = a * d - b * c; } while (D === 0 || Math.abs(D) > 12);
   const i = R.i(0, 1), j = R.i(0, 1), num = [[d, -b], [-c, a]][i][j], v = num / D;
   return [T(`$A = ${m2([[a, b], [c, d]])}$. Hva er elementet $(A^{-1})_{${i + 1}${j + 1}}$?`, `$A = ${m2([[a, b], [c, d]])}$. What is the element $(A^{-1})_{${i + 1}${j + 1}}$?`), { n: v, tol: rel(v, 0.01, 0.001), u: "" },
     T(`$\\det A = ${par(a)}\\cdot ${par(d)} - ${par(b)}\\cdot ${par(c)} = ${D}$. $A^{-1} = \\dfrac{1}{${D}}${m2([[d, -b], [-c, a]])}$, så elementet er $\\dfrac{${num}}{${D}} \\approx ${mf(v, 3)}$.`,
       `$\\det A = ${par(a)}\\cdot ${par(d)} - ${par(b)}\\cdot ${par(c)} = ${D}$. $A^{-1} = \\dfrac{1}{${D}}${m2([[d, -b], [-c, a]])}$, so the element is $\\dfrac{${num}}{${D}} \\approx ${mf(v, 3)}$.`)]; },
 // eksamen: areal av trekantet takflate med kryssprodukt
 () => { let P, Q, S, u, w, cr, Ar; do { P = [R.i(0, 4), R.i(0, 4), R.i(0, 3)]; Q = [R.i(0, 8), R.i(0, 8), R.i(0, 4)]; S = [R.i(0, 8), R.i(0, 8), R.i(0, 4)];
     u = Q.map((q, k) => q - P[k]); w = S.map((s, k) => s - P[k]); cr = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]; Ar = Math.hypot(...cr) / 2; } while (Ar < 2);
   const f = p => `(${p.join(", ")})`, L = Math.hypot(...cr);
   return [T(`En trekantet takflate har hjørnene $A = ${f(P)}$, $B = ${f(Q)}$ og $C = ${f(S)}$ (koordinater i meter). Hva er arealet av flaten?`,
       `A triangular roof panel has corners $A = ${f(P)}$, $B = ${f(Q)}$ and $C = ${f(S)}$ (coordinates in meters). What is the area of the panel?`), { n: Ar, tol: rel(Ar), u: "m²" },
     T(`$\\overrightarrow{AB} = ${f(u)}$ og $\\overrightarrow{AC} = ${f(w)}$. Kryssproduktet er $${f(cr)}$ med lengde $\\sqrt{${cr.map(x => x * x).join(" + ")}} \\approx ${mf(L, 3)}$. Trekanten er halve parallellogrammet: $A = ${mf(L, 3)}/2 \\approx ${mf(Ar, 3)}$ m².`,
       `$\\overrightarrow{AB} = ${f(u)}$ and $\\overrightarrow{AC} = ${f(w)}$. The cross product is $${f(cr)}$ with length $\\sqrt{${cr.map(x => x * x).join(" + ")}} \\approx ${mf(L, 3)}$. The triangle is half the parallelogram: $A = ${mf(L, 3)}/2 \\approx ${mf(Ar, 3)}$ m².`)]; }
);

THEORY("MEK2000", 1, {
nb: `## Hva handler det om?

Mange ingeniørproblemer ender i et lineært ligningssystem $A\\vec x = \\vec b$: strømmer i en krets, stavkrefter i et fagverk, temperaturer i et nett av punkter. Gauss-eliminasjon løser slike systemer systematisk og forteller om det finnes én, ingen eller uendelig mange løsninger.

Egenverdier handler om de spesielle retningene der en matrise bare strekker eller krymper: $A\\vec v = \\lambda\\vec v$. De bestemmer egenfrekvenser i svingesystemer, stabilitet i reguleringssystemer og langtidsoppførselen til modeller som oppdateres steg for steg.

## Begreper og formler

- Radoperasjoner (bytte to rader, gange en rad med et tall ulikt 0, legge et multiplum av en rad til en annen) endrer ikke løsningsmengden.
- Trappeform: hver pivot står til høyre for pivoten i raden over. Rangen $r$ er antall pivoter.
- Tre tilfeller for $n$ ukjente: en rad $[0\\ \\cdots\\ 0 \\mid c]$ med $c \\neq 0$ gir ingen løsning. Ellers gir $r = n$ nøyaktig én løsning, og $r < n$ gir uendelig mange med $n - r$ frie variabler.
- Egenverdier: løs $\\det(A - \\lambda I) = 0$. For $2\\times 2$ er dette $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$.
- Egenvektorer: løs $(A - \\lambda I)\\vec v = \\vec 0$ for hver egenverdi.
- Summen av egenverdiene er sporet, og produktet er determinanten.
- Diagonalisering: $A = PDP^{-1}$ med egenvektorene som kolonner i $P$ og egenverdiene på diagonalen i $D$. Da er $A^k = PD^kP^{-1}$.

## Slik løser du oppgavene

1. Skriv totalmatrisen $[A \\mid \\vec b]$ og eliminer nedover til trappeform.
2. Les av: motsigelse, frie variabler eller entydig løsning. Løs baklengs fra nederste rad.
3. Egenverdier: sett opp den karakteristiske ligningen og løs den.
4. For hver egenverdi: finn en vektor ulik null som oppfyller $(A - \\lambda I)\\vec v = \\vec 0$. Radene er da lineært avhengige, så én av dem holder for en $2\\times 2$-matrise.
5. Kontroller med spor og determinant, og ved å regne ut $A\\vec v$.

### Eksempel

Finn egenverdiene og egenvektorene til $A = \\begin{pmatrix}5&2\\\\2&2\\end{pmatrix}$.

1. $\\operatorname{tr}A = 7$ og $\\det A = 10 - 4 = 6$, så $\\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6) = 0$.
2. $\\lambda = 6$: $A - 6I = \\begin{pmatrix}-1&2\\\\2&-4\\end{pmatrix}$. Første rad gir $-v_1 + 2v_2 = 0$, altså $\\vec v = (2, 1)$.
3. $\\lambda = 1$: $A - I = \\begin{pmatrix}4&2\\\\2&1\\end{pmatrix}$ gir $2v_1 + v_2 = 0$, altså $\\vec v = (1, -2)$.
4. Kontroll: $A(2, 1) = (12, 6) = 6\\cdot(2, 1)$. Egenvektorene står vinkelrett på hverandre, som ventet for en symmetrisk matrise.

## Vanlige feil

- Å gjøre en regnefeil i eliminasjonen og ikke kontrollere ved innsetting.
- Å tro at en nullrad alltid betyr uendelig mange løsninger. Står det $0 = c$ med $c \\neq 0$, finnes ingen løsning.
- Å regne $\\det A - \\lambda$ i stedet for $\\det(A - \\lambda I)$.
- Å oppgi nullvektoren som egenvektor.
- Å glemme at egenvektorer bare er bestemt opp til en faktor: $(2, 1)$ og $(4, 2)$ er like gode.

> Eliminasjon avgjør hvor mange løsninger et system har. Egenverdier finner du fra $\\det(A - \\lambda I) = 0$, og summen og produktet av dem må stemme med sporet og determinanten.`,
en: `## What is it about?

Many engineering problems end up as a system of linear equations $A\\vec x = \\vec b$: currents in a circuit, member forces in a truss, temperatures at a grid of points. Gaussian elimination solves such systems systematically and tells you whether there is one solution, none or infinitely many.

Eigenvalues are about the special directions in which a matrix only stretches or shrinks: $A\\vec v = \\lambda\\vec v$. They determine natural frequencies of vibrating systems, stability of control systems and the long-term behavior of models that are updated step by step.

## Key concepts and formulas

- Row operations (swapping two rows, multiplying a row by a nonzero number, adding a multiple of one row to another) do not change the solution set.
- Echelon form: each pivot lies to the right of the pivot in the row above. The rank $r$ is the number of pivots.
- Three cases for $n$ unknowns: a row $[0\\ \\cdots\\ 0 \\mid c]$ with $c \\neq 0$ gives no solution. Otherwise $r = n$ gives exactly one solution, and $r < n$ gives infinitely many with $n - r$ free variables.
- Eigenvalues: solve $\\det(A - \\lambda I) = 0$. For $2\\times 2$ this is $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$.
- Eigenvectors: solve $(A - \\lambda I)\\vec v = \\vec 0$ for each eigenvalue.
- The sum of the eigenvalues is the trace, and their product is the determinant.
- Diagonalization: $A = PDP^{-1}$ with the eigenvectors as the columns of $P$ and the eigenvalues on the diagonal of $D$. Then $A^k = PD^kP^{-1}$.

## How to solve the problems

1. Write the augmented matrix $[A \\mid \\vec b]$ and eliminate downward to echelon form.
2. Read off the result: a contradiction, free variables or a unique solution. Back-substitute from the bottom row.
3. Eigenvalues: set up the characteristic equation and solve it.
4. For each eigenvalue: find a nonzero vector with $(A - \\lambda I)\\vec v = \\vec 0$. The rows are then linearly dependent, so one of them is enough for a $2\\times 2$ matrix.
5. Check with the trace and determinant, and by computing $A\\vec v$.

### Example

Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}5&2\\\\2&2\\end{pmatrix}$.

1. $\\operatorname{tr}A = 7$ and $\\det A = 10 - 4 = 6$, so $\\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6) = 0$.
2. $\\lambda = 6$: $A - 6I = \\begin{pmatrix}-1&2\\\\2&-4\\end{pmatrix}$. The first row gives $-v_1 + 2v_2 = 0$, so $\\vec v = (2, 1)$.
3. $\\lambda = 1$: $A - I = \\begin{pmatrix}4&2\\\\2&1\\end{pmatrix}$ gives $2v_1 + v_2 = 0$, so $\\vec v = (1, -2)$.
4. Check: $A(2, 1) = (12, 6) = 6\\cdot(2, 1)$. The eigenvectors are perpendicular, as expected for a symmetric matrix.

## Common mistakes

- Making an arithmetic error during elimination and not checking by substitution.
- Believing that a zero row always means infinitely many solutions. If it says $0 = c$ with $c \\neq 0$, there is no solution.
- Computing $\\det A - \\lambda$ instead of $\\det(A - \\lambda I)$.
- Giving the zero vector as an eigenvector.
- Forgetting that eigenvectors are only determined up to a factor: $(2, 1)$ and $(4, 2)$ are equally valid.

> Elimination decides how many solutions a system has. Eigenvalues come from $\\det(A - \\lambda I) = 0$, and their sum and product must match the trace and the determinant.`
});
BIQ("MEK2000", 1, [
 [`Hva gjør radoperasjonen $R_2 \\to R_2 - 3R_1$ med løsningene av et lineært system?`, [`Ingenting – systemet har de samme løsningene`, `Løsningene ganges med 3`, `Systemet mister én løsning`, `Løsningene skifter fortegn`],
  `Radoperasjoner gir et ekvivalent system. Derfor kan vi eliminere uten å endre svaret.`,
  `What does the row operation $R_2 \\to R_2 - 3R_1$ do to the solutions of a linear system?`, [`Nothing – the system has the same solutions`, `The solutions are multiplied by 3`, `The system loses one solution`, `The solutions change sign`],
  `Row operations produce an equivalent system. That is why we can eliminate without changing the answer.`],
 [`Trappeformen til totalmatrisen har raden $[\\,0\\ \\ 0\\ \\ 0 \\mid 5\\,]$. Hva betyr det?`, [`Systemet har ingen løsning`, `Systemet har uendelig mange løsninger`, `$x_3 = 5$`, `Systemet har nøyaktig én løsning`],
  `Raden sier $0x_1 + 0x_2 + 0x_3 = 5$, altså $0 = 5$. Det er en motsigelse, så systemet er inkonsistent.`,
  `The echelon form of the augmented matrix has the row $[\\,0\\ \\ 0\\ \\ 0 \\mid 5\\,]$. What does this mean?`, [`The system has no solution`, `The system has infinitely many solutions`, `$x_3 = 5$`, `The system has exactly one solution`],
  `The row says $0x_1 + 0x_2 + 0x_3 = 5$, i.e. $0 = 5$. That is a contradiction, so the system is inconsistent.`],
 [`$A$ er inverterbar og har egenverdiene 2 og $-4$. Hva er egenverdiene til $A^{-1}$?`, [`$\\tfrac12$ og $-\\tfrac14$`, `$-2$ og $4$`, `$2$ og $-4$`, `$\\tfrac12$ og $\\tfrac14$`],
  `Fra $A\\vec v = \\lambda\\vec v$ får vi $\\vec v = \\lambda A^{-1}\\vec v$, altså $A^{-1}\\vec v = \\tfrac1\\lambda\\vec v$. Egenvektorene er de samme, og egenverdiene inverteres (med fortegn).`,
  `$A$ is invertible with eigenvalues 2 and $-4$. What are the eigenvalues of $A^{-1}$?`, [`$\\tfrac12$ and $-\\tfrac14$`, `$-2$ and $4$`, `$2$ and $-4$`, `$\\tfrac12$ and $\\tfrac14$`],
  `From $A\\vec v = \\lambda\\vec v$ we get $\\vec v = \\lambda A^{-1}\\vec v$, i.e. $A^{-1}\\vec v = \\tfrac1\\lambda\\vec v$. The eigenvectors are the same, and the eigenvalues are inverted (keeping their sign).`],
 [`$A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$. Hva er elementet $(A^5)_{11}$? (Tips: diagonaliser.)`, { n: 122, tol: 0, u: "" },
  `$\\lambda^2 - 4\\lambda + 3 = 0$ gir $\\lambda = 1$ med $\\vec v = (1, -1)$ og $\\lambda = 3$ med $\\vec v = (1, 1)$. Med $P = \\begin{pmatrix}1&1\\\\-1&1\\end{pmatrix}$ er $A^5 = PD^5P^{-1}$ og $D^5 = \\operatorname{diag}(1, 243)$. Det gir $(A^5)_{11} = \\tfrac12(1 + 243) = 122$.`,
  `$A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$. What is the element $(A^5)_{11}$? (Hint: diagonalize.)`, null,
  `$\\lambda^2 - 4\\lambda + 3 = 0$ gives $\\lambda = 1$ with $\\vec v = (1, -1)$ and $\\lambda = 3$ with $\\vec v = (1, 1)$. With $P = \\begin{pmatrix}1&1\\\\-1&1\\end{pmatrix}$ we get $A^5 = PD^5P^{-1}$ and $D^5 = \\operatorname{diag}(1, 243)$. This gives $(A^5)_{11} = \\tfrac12(1 + 243) = 122$.`]
]);
GEN("MEK2000", 1,
 // enkel: egenverdi fra oppgitt egenvektor
 () => { const m = R.p([-2, -1, 1, 2, 3]), lam = R.i(-5, 6), q = R.i(-3, 3), s = R.i(-3, 3); const p = lam - q * m, r = lam * m - s * m;
   return [T(`$\\vec v = (1, ${m})$ er en egenvektor til $A = ${m2([[p, q], [r, s]])}$. Hva er egenverdien?`, `$\\vec v = (1, ${m})$ is an eigenvector of $A = ${m2([[p, q], [r, s]])}$. What is the eigenvalue?`), { n: lam, tol: 0, u: "" },
     T(`$A\\vec v = \\big(${p} + ${par(q)}\\cdot ${par(m)},\\ ${r} + ${par(s)}\\cdot ${par(m)}\\big) = (${lam}, ${lam * m}) = ${lam}\\cdot(1, ${m})$. Egenverdien er ${lam}.`,
       `$A\\vec v = \\big(${p} + ${par(q)}\\cdot ${par(m)},\\ ${r} + ${par(s)}\\cdot ${par(m)}\\big) = (${lam}, ${lam * m}) = ${lam}\\cdot(1, ${m})$. The eigenvalue is ${lam}.`)]; },
 // middels: parameter som gjør systemet singulært
 () => { const a = R.i(1, 4), t = R.p([-3, -2, -1, 1, 2, 3]), b = R.p([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), c = a * t, k = b * t, e = R.i(-9, 9), f = R.i(-9, 9);
   return [T(`For hvilken verdi av $k$ har systemet $\\begin{cases}${poly([[a, "x"], [b, "y"]])} = ${e}\\\\ ${poly([[c, "x"]])} + ky = ${f}\\end{cases}$ ikke en entydig løsning?`,
       `For which value of $k$ does the system $\\begin{cases}${poly([[a, "x"], [b, "y"]])} = ${e}\\\\ ${poly([[c, "x"]])} + ky = ${f}\\end{cases}$ not have a unique solution?`), { n: k, tol: 0.01, u: "" },
     T(`Entydig løsning krever at determinanten er ulik 0. $\\det = ${a}k - ${par(b)}\\cdot ${par(c)} = ${a}k ${b * c < 0 ? "+" : "-"} ${Math.abs(b * c)} = 0$ gir $k = ${k}$.`,
       `A unique solution requires a nonzero determinant. $\\det = ${a}k - ${par(b)}\\cdot ${par(c)} = ${a}k ${b * c < 0 ? "+" : "-"} ${Math.abs(b * c)} = 0$ gives $k = ${k}$.`)]; },
 // eksamen: likevektsfordeling (egenvektor for lambda = 1)
 () => { const N = R.p([60, 80, 100, 120, 150, 200, 240, 300]), a = R.p([0.1, 0.15, 0.2, 0.25, 0.3]), b = R.p([0.05, 0.1, 0.15, 0.2, 0.3, 0.4]); const xA = N * b / (a + b);
   const P = `\\begin{pmatrix}${mf(1 - a)}&${mf(b)}\\\\${mf(a)}&${mf(1 - b)}\\end{pmatrix}`;
   return [T(`En bildelingstjeneste har ${N} biler i to soner, A og B. Hver natt flyttes ${nf(a * 100)} % av bilene i A til B og ${nf(b * 100)} % av bilene i B til A, altså $\\vec x_{k+1} = P\\vec x_k$ med $P = ${P}$. Hvor mange biler står i sone A i det lange løp?`,
       `A car-sharing service has ${N} cars in two zones, A and B. Every night ${nf(a * 100)} % of the cars in A move to B and ${nf(b * 100)} % of the cars in B move to A, so $\\vec x_{k+1} = P\\vec x_k$ with $P = ${P}$. How many cars are in zone A in the long run?`),
     { n: xA, tol: rel(xA, 0.01, 0.5), u: "stk" },
     T(`Likevekten er egenvektoren for $\\lambda = 1$: $P\\vec x = \\vec x$. Første rad: $${mf(1 - a)}x_A + ${mf(b)}x_B = x_A$ gir $${mf(a)}x_A = ${mf(b)}x_B$. Med $x_A + x_B = ${N}$ blir $x_A = ${N}\\cdot\\dfrac{${mf(b)}}{${mf(a)} + ${mf(b)}} \\approx ${mf(xA, 1)}$ biler.`,
       `The equilibrium is the eigenvector for $\\lambda = 1$: $P\\vec x = \\vec x$. The first row: $${mf(1 - a)}x_A + ${mf(b)}x_B = x_A$ gives $${mf(a)}x_A = ${mf(b)}x_B$. With $x_A + x_B = ${N}$ we get $x_A = ${N}\\cdot\\dfrac{${mf(b)}}{${mf(a)} + ${mf(b)}} \\approx ${mf(xA, 1)}$ cars.`)]; }
);

THEORY("MEK2000", 2, {
nb: `## Hva handler det om?

En differensialligning knytter en ukjent funksjon til sine egne deriverte. Den beskriver hvordan noe endrer seg: en kondensator som lades, en kopp som kjøles, en masse som svinger på en fjær. Å løse ligningen betyr å finne funksjonen. Startbetingelsene plukker ut den ene løsningen som passer situasjonen.

## Begreper og formler

- Orden: den høyeste deriverte som forekommer. En ligning av orden $n$ trenger $n$ startbetingelser.
- Separabel: $y' = g(x)h(y)$ løses med $\\int\\frac{dy}{h(y)} = \\int g(x)\\,dx$.
- Lineær av første orden: $y' + p(x)y = q(x)$. Gang hele ligningen med den integrerende faktoren $\\mu = e^{\\int p\\,dx}$. Da blir venstresiden $(\\mu y)'$.
- $y' = -k(y - y_\\infty)$ har løsningen $y = y_\\infty + (y_0 - y_\\infty)e^{-kt}$. Den beskriver kjøling og opplading.
- Andre orden med konstante koeffisienter: $y'' + py' + qy = 0$. Prøv $y = e^{rx}$, som gir den karakteristiske ligningen $r^2 + pr + q = 0$.
- To ulike reelle røtter: $y = C_1e^{r_1x} + C_2e^{r_2x}$.
- Dobbel rot: $y = (C_1 + C_2x)e^{rx}$.
- Komplekse røtter $r = \\alpha \\pm i\\beta$: $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$.
- Inhomogen ligning: $y = y_h + y_p$, der $y_p$ er én partikulær løsning. Gjett en $y_p$ av samme type som høyresiden.
- Masse–fjær–demper $my'' + cy' + ky = 0$: $c^2 < 4mk$ gir dempede svingninger, $c^2 > 4mk$ gir ingen svingninger (overkritisk demping).

## Slik løser du oppgavene

1. Bestem typen: separabel, lineær av første orden eller lineær med konstante koeffisienter.
2. Finn den generelle løsningen, med konstanter.
3. Er ligningen inhomogen, finn $y_p$ og legg den til $y_h$.
4. Bruk startbetingelsene til slutt, på hele løsningen $y_h + y_p$.
5. Kontroller ved å sette løsningen inn i ligningen.

### Eksempel

Løs $y'' + 3y' + 2y = 4$ med $y(0) = 0$ og $y'(0) = 0$.

1. Homogen del: $r^2 + 3r + 2 = (r + 1)(r + 2) = 0$ gir $y_h = C_1e^{-x} + C_2e^{-2x}$.
2. Høyresiden er konstant, så prøv $y_p = K$: $2K = 4$ gir $K = 2$.
3. $y = C_1e^{-x} + C_2e^{-2x} + 2$. Startbetingelsene gir $C_1 + C_2 + 2 = 0$ og $-C_1 - 2C_2 = 0$.
4. Det gir $C_2 = 2$ og $C_1 = -4$, altså $y = 2 - 4e^{-x} + 2e^{-2x}$.

Løsningen starter i 0 og går mot likevekten $y = 2$ uten å svinge, fordi røttene er reelle og negative.

## Vanlige feil

- Å bruke startbetingelsene på $y_h$ før $y_p$ er lagt til.
- Å skrive $C_1e^{rx} + C_2e^{rx}$ ved dobbel rot. Da mangler den ekstra faktoren $x$.
- Å bytte om $\\alpha$ og $\\beta$ ved komplekse røtter: realdelen gir dempingen, imaginærdelen gir vinkelfrekvensen.
- Å glemme å gange høyresiden med den integrerende faktoren.

> Den karakteristiske ligningen gir formen på løsningen: reelle røtter gir eksponentialfunksjoner, komplekse røtter gir svingninger. Startbetingelsene brukes helt til slutt.`,
en: `## What is it about?

A differential equation relates an unknown function to its own derivatives. It describes how something changes: a capacitor being charged, a cup of coffee cooling down, a mass oscillating on a spring. Solving the equation means finding the function. The initial conditions pick out the one solution that fits the situation.

## Key concepts and formulas

- Order: the highest derivative that appears. An equation of order $n$ needs $n$ initial conditions.
- Separable: $y' = g(x)h(y)$ is solved with $\\int\\frac{dy}{h(y)} = \\int g(x)\\,dx$.
- First-order linear: $y' + p(x)y = q(x)$. Multiply the whole equation by the integrating factor $\\mu = e^{\\int p\\,dx}$. The left-hand side then becomes $(\\mu y)'$.
- $y' = -k(y - y_\\infty)$ has the solution $y = y_\\infty + (y_0 - y_\\infty)e^{-kt}$. It describes cooling and charging.
- Second order with constant coefficients: $y'' + py' + qy = 0$. Try $y = e^{rx}$, which gives the characteristic equation $r^2 + pr + q = 0$.
- Two distinct real roots: $y = C_1e^{r_1x} + C_2e^{r_2x}$.
- Double root: $y = (C_1 + C_2x)e^{rx}$.
- Complex roots $r = \\alpha \\pm i\\beta$: $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$.
- Nonhomogeneous equation: $y = y_h + y_p$, where $y_p$ is one particular solution. Guess a $y_p$ of the same type as the right-hand side.
- Mass–spring–damper $my'' + cy' + ky = 0$: $c^2 < 4mk$ gives damped oscillations, $c^2 > 4mk$ gives no oscillation (overdamping).

## How to solve the problems

1. Determine the type: separable, first-order linear, or linear with constant coefficients.
2. Find the general solution, with constants.
3. If the equation is nonhomogeneous, find $y_p$ and add it to $y_h$.
4. Apply the initial conditions last, to the complete solution $y_h + y_p$.
5. Check by substituting the solution into the equation.

### Example

Solve $y'' + 3y' + 2y = 4$ with $y(0) = 0$ and $y'(0) = 0$.

1. Homogeneous part: $r^2 + 3r + 2 = (r + 1)(r + 2) = 0$ gives $y_h = C_1e^{-x} + C_2e^{-2x}$.
2. The right-hand side is constant, so try $y_p = K$: $2K = 4$ gives $K = 2$.
3. $y = C_1e^{-x} + C_2e^{-2x} + 2$. The initial conditions give $C_1 + C_2 + 2 = 0$ and $-C_1 - 2C_2 = 0$.
4. This gives $C_2 = 2$ and $C_1 = -4$, so $y = 2 - 4e^{-x} + 2e^{-2x}$.

The solution starts at 0 and approaches the equilibrium $y = 2$ without oscillating, because the roots are real and negative.

## Common mistakes

- Applying the initial conditions to $y_h$ before $y_p$ has been added.
- Writing $C_1e^{rx} + C_2e^{rx}$ for a double root. The extra factor $x$ is missing.
- Mixing up $\\alpha$ and $\\beta$ for complex roots: the real part gives the damping, the imaginary part gives the angular frequency.
- Forgetting to multiply the right-hand side by the integrating factor.

> The characteristic equation gives the form of the solution: real roots give exponentials, complex roots give oscillations. The initial conditions are applied at the very end.`
});
BIQ("MEK2000", 2, [
 [`Hva er ordenen til differensialligningen $y''' + 2y' = \\sin x$?`, [`3`, `2`, `1`, `Ordenen er ikke definert fordi høyresiden ikke er 0`],
  `Ordenen er den høyeste deriverte som forekommer, her $y'''$. Høyresiden påvirker ikke ordenen. Den generelle løsningen får derfor tre konstanter.`,
  `What is the order of the differential equation $y''' + 2y' = \\sin x$?`, [`3`, `2`, `1`, `The order is not defined because the right-hand side is not 0`],
  `The order is the highest derivative that appears, here $y'''$. The right-hand side does not affect the order. The general solution therefore has three constants.`],
 [`Den karakteristiske ligningen har røttene $r = -2 \\pm 3i$. Hva er den generelle løsningen?`,
  [`$e^{-2x}(C_1\\cos 3x + C_2\\sin 3x)$`, `$e^{3x}(C_1\\cos 2x + C_2\\sin 2x)$`, `$C_1e^{-2x} + C_2e^{3x}$`, `$C_1\\cos 3x + C_2\\sin 3x$`],
  `Med $r = \\alpha \\pm i\\beta$ er $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$. Realdelen $-2$ gir dempingen, og imaginærdelen 3 gir vinkelfrekvensen.`,
  `The characteristic equation has the roots $r = -2 \\pm 3i$. What is the general solution?`,
  [`$e^{-2x}(C_1\\cos 3x + C_2\\sin 3x)$`, `$e^{3x}(C_1\\cos 2x + C_2\\sin 2x)$`, `$C_1e^{-2x} + C_2e^{3x}$`, `$C_1\\cos 3x + C_2\\sin 3x$`],
  `With $r = \\alpha \\pm i\\beta$ we have $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$. The real part $-2$ gives the damping, and the imaginary part 3 gives the angular frequency.`],
 [`Et masse–fjær–demper-system $my'' + cy' + ky = 0$ svinger. Hva skjer hvis dempingen $c$ økes så mye at $c^2 > 4mk$?`,
  [`Svingningene forsvinner, og massen kryper tilbake til likevekt (overkritisk demping)`, `Svingningene får større amplitude`, `Svingefrekvensen øker`, `Systemet blir ustabilt og vokser`],
  `Da har $mr^2 + cr + k = 0$ to negative reelle røtter. Løsningen er en sum av avtagende eksponentialfunksjoner, uten svingning.`,
  `A mass–spring–damper system $my'' + cy' + ky = 0$ oscillates. What happens if the damping $c$ is increased so much that $c^2 > 4mk$?`,
  [`The oscillations disappear, and the mass creeps back to equilibrium (overdamping)`, `The oscillations get a larger amplitude`, `The oscillation frequency increases`, `The system becomes unstable and grows`],
  `Then $mr^2 + cr + k = 0$ has two negative real roots. The solution is a sum of decaying exponentials, without oscillation.`],
 [`En kopp kaffe holder 90 °C i et rom på 20 °C. Newtons avkjølingslov gir $T' = -k(T - 20)$. Etter 10 minutter er temperaturen 60 °C. Hva er temperaturen etter 20 minutter?`, { n: 20 + 160 / 7, tol: 0.2, u: "°C" },
  `Løsningen er $T = 20 + 70e^{-kt}$. For $t = 10$: $70e^{-10k} = 40$, så $e^{-10k} = \\tfrac47$. For $t = 20$: $T = 20 + 70\\left(\\tfrac47\\right)^2 = 20 + \\tfrac{160}{7} \\approx 42{,}9$ °C.`,
  `A cup of coffee is at 90 °C in a room at 20 °C. Newton's law of cooling gives $T' = -k(T - 20)$. After 10 minutes the temperature is 60 °C. What is the temperature after 20 minutes?`, null,
  `The solution is $T = 20 + 70e^{-kt}$. For $t = 10$: $70e^{-10k} = 40$, so $e^{-10k} = \\tfrac47$. For $t = 20$: $T = 20 + 70\\left(\\tfrac47\\right)^2 = 20 + \\tfrac{160}{7} \\approx 42.9$ °C.`]
]);
GEN("MEK2000", 2,
 // enkel: klassifiser løsningstypen fra diskriminanten
 () => { const typ = R.i(0, 2); let p, q, roots;
   if (typ === 0) { const [r1, r2] = R.distinct(2, -5, 4); p = -(r1 + r2); q = r1 * r2; roots = `r = ${Math.max(r1, r2)}` + T(" og ", " and ") + `r = ${Math.min(r1, r2)}`; }
   else if (typ === 1) { const r = R.p([-4, -3, -2, -1, 1, 2, 3]); p = -2 * r; q = r * r; roots = `r = ${r}`; }
   else { const al = R.i(-3, 2), be = R.i(1, 4); p = -2 * al; q = al * al + be * be; roots = `r = ${al === 0 ? "" : al + " "}\\pm ${be === 1 ? "" : be}i`; }
   const D = p * p - 4 * q, eq = `y''${p ? " " + poly([[1, "y''"], [p, "y'"]]).replace(/^y''/, "").trim() : ""}${q ? " " + poly([[1, "y"], [q, "y"]]).replace(/^y/, "").trim() : ""} = 0`;
   const o = [T("To ulike reelle røtter: $y = C_1e^{r_1x} + C_2e^{r_2x}$", "Two distinct real roots: $y = C_1e^{r_1x} + C_2e^{r_2x}$"), T("Dobbel rot: $y = (C_1 + C_2x)e^{rx}$", "Double root: $y = (C_1 + C_2x)e^{rx}$"),
     T("Komplekse røtter: $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$", "Complex roots: $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$")];
   const conc = D > 0 ? T("positiv, altså to ulike reelle røtter", "positive, so there are two distinct real roots") : D === 0 ? T("null, altså en dobbel rot", "zero, so there is a double root") : T("negativ, altså komplekse røtter", "negative, so the roots are complex");
   return [T(`Hva slags løsning har $${eq}$?`, `What kind of solution does $${eq}$ have?`), [o[typ], ...o.filter((_, i) => i !== typ)],
     T(`Karakteristisk ligning: $r^2 + pr + q = 0$ med $p = ${p}$ og $q = ${q}$. Diskriminanten $p^2 - 4q = ${D}$ er ${conc}: $${roots}$.`,
       `Characteristic equation: $r^2 + pr + q = 0$ with $p = ${p}$ and $q = ${q}$. The discriminant $p^2 - 4q = ${D}$ is ${conc}: $${roots}$.`)]; },
 // middels: startverdiproblem med to reelle røtter
 () => { const [r1, r2] = R.distinct(2, -3, 2, [0]); let y0, v0; do { y0 = R.i(-3, 4); v0 = R.i(-4, 4); } while (y0 === 0 && v0 === 0);
   const C1 = (v0 - r2 * y0) / (r1 - r2), C2 = y0 - C1, v = C1 * Math.exp(r1) + C2 * Math.exp(r2), p = -(r1 + r2), q = r1 * r2;
   const eq = `y''${p ? " " + (p < 0 ? "-" : "+") + " " + (Math.abs(p) === 1 ? "" : Math.abs(p)) + "y'" : ""} ${q < 0 ? "-" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}y = 0`;
   const lin = `${cf(r1)}C_1 ${r2 < 0 ? "-" : "+"} ${Math.abs(r2) === 1 ? "" : Math.abs(r2)}C_2`;
   return [T(`Løs $${eq}$ med $y(0) = ${y0}$ og $y'(0) = ${v0}$. Hva er $y(1)$?`, `Solve $${eq}$ with $y(0) = ${y0}$ and $y'(0) = ${v0}$. What is $y(1)$?`), { n: v, tol: rel(v, 0.01, 0.01), u: "" },
     T(`Røttene $r = ${r1}$ og $r = ${r2}$ gir $y = C_1${ekx(r1)} + C_2${ekx(r2)}$. Startbetingelsene: $C_1 + C_2 = ${y0}$ og $${lin} = ${v0}$, så $C_1 \\approx ${mf(C1, 3)}$ og $C_2 \\approx ${mf(C2, 3)}$. Da er $y(1) = C_1e^{${r1}} + C_2e^{${r2}} \\approx ${mf(v, 3)}$.`,
       `The roots $r = ${r1}$ and $r = ${r2}$ give $y = C_1${ekx(r1)} + C_2${ekx(r2)}$. The initial conditions: $C_1 + C_2 = ${y0}$ and $${lin} = ${v0}$, so $C_1 \\approx ${mf(C1, 3)}$ and $C_2 \\approx ${mf(C2, 3)}$. Then $y(1) = C_1e^{${r1}} + C_2e^{${r2}} \\approx ${mf(v, 3)}$.`)]; },
 // eksamen: periode for dempet svingning
 () => { const m = R.p([2, 4, 5, 8, 10, 12, 15, 20]), k = R.p([200, 400, 500, 800, 1000, 1500, 2000]), z = R.p([0.05, 0.1, 0.15, 0.2, 0.3]); const c = Math.round(z * 2 * Math.sqrt(k * m));
   const al = c / (2 * m), wd = Math.sqrt(k / m - al * al), Td = 2 * Math.PI / wd;
   return [T(`En maskin med masse ${m} kg står på fjærer med stivhet $k = ${k}$ N/m og en demper med $c = ${c}$ Ns/m. Bevegelsen følger $my'' + cy' + ky = 0$. Hva er perioden til de dempede svingningene?`,
       `A machine of mass ${m} kg rests on springs with stiffness $k = ${k}$ N/m and a damper with $c = ${c}$ Ns/m. The motion follows $my'' + cy' + ky = 0$. What is the period of the damped oscillations?`), { n: Td, tol: rel(Td), u: "s" },
     T(`Karakteristisk ligning: $${m}r^2 + ${c}r + ${k} = 0$ gir $r = -\\dfrac{c}{2m} \\pm i\\sqrt{\\dfrac km - \\left(\\dfrac{c}{2m}\\right)^2} \\approx ${mf(-al, 3)} \\pm ${mf(wd, 3)}i$. Løsningen er $e^{${mf(-al, 3)}t}(C_1\\cos\\omega_d t + C_2\\sin\\omega_d t)$ med $\\omega_d \\approx ${mf(wd, 3)}$ rad/s, så perioden er $T = 2\\pi/\\omega_d \\approx ${mf(Td, 3)}$ s.`,
       `Characteristic equation: $${m}r^2 + ${c}r + ${k} = 0$ gives $r = -\\dfrac{c}{2m} \\pm i\\sqrt{\\dfrac km - \\left(\\dfrac{c}{2m}\\right)^2} \\approx ${mf(-al, 3)} \\pm ${mf(wd, 3)}i$. The solution is $e^{${mf(-al, 3)}t}(C_1\\cos\\omega_d t + C_2\\sin\\omega_d t)$ with $\\omega_d \\approx ${mf(wd, 3)}$ rad/s, so the period is $T = 2\\pi/\\omega_d \\approx ${mf(Td, 3)}$ s.`)]; }
);


// ================================================================
//  DAVE3700 Flervariabel analyse
// ================================================================
THEORY("DAVE3700", 0, {
nb: `## Hva handler det om?

En funksjon av flere variabler, som $f(x, y)$, beskriver noe som avhenger av mer enn én størrelse – temperatur i et rom, kostnad som funksjon av to design-parametere, eller trykk som funksjon av posisjon. De partielle deriverte forteller hvor raskt $f$ endrer seg når du beveger deg langs én akse om gangen, og gradienten $\\nabla f$ samler dem til en vektor som peker i retningen der $f$ vokser raskest. Dette er grunnlaget for optimering med flere variabler: å finne det billigste designet, den sterkeste konstruksjonen eller den varmeste flekken i en plate.

## Begreper og formler

- Partiellderivert $f_x = \\partial f/\\partial x$: deriver med hensyn på $x$, behandle $y$ som konstant (og omvendt for $f_y$).
- Gradient: $\\nabla f = (f_x, f_y)$. Den peker i retningen der $f$ øker raskest, og står vinkelrett på nivåkurvene.
- Retningsderivert i retning av enhetsvektor $\\vec u$: $D_{\\vec u}f = \\nabla f\\cdot\\vec u$.
- Kjerneregelen med én parameter: $\\dfrac{dz}{dt} = f_x\\dfrac{dx}{dt} + f_y\\dfrac{dy}{dt}$. Med to parametere $u, v$: $\\dfrac{\\partial z}{\\partial u} = f_x\\dfrac{\\partial x}{\\partial u} + f_y\\dfrac{\\partial y}{\\partial u}$.
- Kritisk punkt: der $\\nabla f = \\vec 0$ (eller der de partiellderiverte ikke finnes).
- Annenderiverttest: $D = f_{xx}f_{yy} - f_{xy}^2$. $D>0, f_{xx}>0$: lokalt minimum. $D>0, f_{xx}<0$: lokalt maksimum. $D<0$: sadelpunkt.
- Lagranges metode: ekstremum av $f$ under bibetingelsen $g=0$ gir $\\nabla f = \\lambda\\nabla g$ sammen med $g=0$.
- Tangentplan i $(a,b)$: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$. Samme uttrykk gir lineær tilnærming.

## Slik løser du oppgavene

1. Deriver partielt: hold alle andre variabler konstante.
2. For kritiske punkter: sett $f_x=0$ og $f_y=0$, og løs likningssystemet.
3. Klassifiser med annenderiverttesten, eller bruk Lagranges metode hvis det er en bibetingelse.
4. For retningsderivert: normaliser retningsvektoren først (del på lengden) hvis den ikke allerede har lengde 1.
5. For lineær tilnærming eller tangentplan: regn ut $f$ og gradienten i punktet, og sett inn i formelen.

### Eksempel

Finn og klassifiser de kritiske punktene til $f(x,y) = x^2 + y^2 - 2x - 4y + 5$.

1. $f_x = 2x - 2 = 0 \\Rightarrow x=1$. $f_y = 2y-4=0 \\Rightarrow y=2$. Kritisk punkt: $(1,2)$.
2. $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=0$, så $D = 2\\cdot 2 - 0^2 = 4 > 0$ og $f_{xx}>0$.
3. Punktet $(1,2)$ er et lokalt minimum, med $f(1,2) = 1+4-2-8+5 = 0$.

## Vanlige feil

- Å glemme å normalisere retningsvektoren før man bruker $D_{\\vec u}f = \\nabla f\\cdot\\vec u$.
- Å tro at $f_{xy}$ og $f_{yx}$ kan bli forskjellige av seg selv – for glatte funksjoner er de like (Clairauts teorem), men skriv utregningen riktig underveis.
- Å tro at $\\nabla f = \\vec 0$ alltid betyr et ekstremum. Det kan også være et sadelpunkt.
- Å sette Lagrange-likningen feil vei: det er $\\nabla f = \\lambda\\nabla g$, ikke $\\nabla g = \\lambda\\nabla f$.

> Gradienten peker der $f$ vokser raskest. Et kritisk punkt er der $\\nabla f = \\vec 0$ – annenderiverttesten avgjør om det er et minimum, maksimum eller sadelpunkt.`,
en: `## What is it about?

A function of several variables, such as $f(x, y)$, describes something that depends on more than one quantity – temperature in a room, cost as a function of two design parameters, or pressure as a function of position. The partial derivatives tell you how fast $f$ changes as you move along one axis at a time, and the gradient $\\nabla f$ collects them into a vector that points in the direction where $f$ increases fastest. This is the foundation of optimization with several variables: finding the cheapest design, the strongest structure, or the hottest spot on a plate.

## Key concepts and formulas

- Partial derivative $f_x = \\partial f/\\partial x$: differentiate with respect to $x$, treating $y$ as a constant (and vice versa for $f_y$).
- Gradient: $\\nabla f = (f_x, f_y)$. It points in the direction where $f$ increases fastest, and is perpendicular to the level curves.
- Directional derivative along the unit vector $\\vec u$: $D_{\\vec u}f = \\nabla f\\cdot\\vec u$.
- Chain rule with one parameter: $\\dfrac{dz}{dt} = f_x\\dfrac{dx}{dt} + f_y\\dfrac{dy}{dt}$. With two parameters $u, v$: $\\dfrac{\\partial z}{\\partial u} = f_x\\dfrac{\\partial x}{\\partial u} + f_y\\dfrac{\\partial y}{\\partial u}$.
- Critical point: where $\\nabla f = \\vec 0$ (or where the partial derivatives fail to exist).
- Second derivative test: $D = f_{xx}f_{yy} - f_{xy}^2$. $D>0, f_{xx}>0$: local minimum. $D>0, f_{xx}<0$: local maximum. $D<0$: saddle point.
- Lagrange's method: an extremum of $f$ subject to the constraint $g=0$ satisfies $\\nabla f = \\lambda\\nabla g$ together with $g=0$.
- Tangent plane at $(a,b)$: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$. The same expression gives the linear approximation.

## How to solve the problems

1. Differentiate partially: hold every other variable constant.
2. For critical points: set $f_x=0$ and $f_y=0$, and solve the system of equations.
3. Classify with the second derivative test, or use Lagrange's method if there is a constraint.
4. For a directional derivative: normalize the direction vector first (divide by its length) if it does not already have length 1.
5. For a linear approximation or tangent plane: compute $f$ and the gradient at the point, and substitute into the formula.

### Example

Find and classify the critical points of $f(x,y) = x^2 + y^2 - 2x - 4y + 5$.

1. $f_x = 2x - 2 = 0 \\Rightarrow x=1$. $f_y = 2y-4=0 \\Rightarrow y=2$. Critical point: $(1,2)$.
2. $f_{xx}=2$, $f_{yy}=2$, $f_{xy}=0$, so $D = 2\\cdot 2 - 0^2 = 4 > 0$ and $f_{xx}>0$.
3. The point $(1,2)$ is a local minimum, with $f(1,2) = 1+4-2-8+5 = 0$.

## Common mistakes

- Forgetting to normalize the direction vector before using $D_{\\vec u}f = \\nabla f\\cdot\\vec u$.
- Assuming $f_{xy}$ and $f_{yx}$ could differ – for smooth functions they are equal (Clairaut's theorem), but still write out the computation carefully.
- Believing $\\nabla f = \\vec 0$ always means an extremum. It can also be a saddle point.
- Writing the Lagrange condition backwards: it is $\\nabla f = \\lambda\\nabla g$, not $\\nabla g = \\lambda\\nabla f$.

> The gradient points where $f$ increases fastest. A critical point is where $\\nabla f = \\vec 0$ – the second derivative test decides whether it is a minimum, a maximum or a saddle point.`
});
BIQ("DAVE3700", 0, [
 [`Hva er definisjonen av et kritisk punkt for $f(x,y)$?`,
  [`$\\nabla f(x,y) = \\vec 0$ (eller partiellderiverte finnes ikke)`, `$f(x,y) = 0$`, `$f_x = f_y$`, `$f_{xx}(x,y) = 0$`],
  `Et kritisk punkt er der gradienten er nullvektoren. Det er kandidater for topp-, bunn- eller sadelpunkt.`,
  `What is the definition of a critical point of $f(x,y)$?`,
  [`$\\nabla f(x,y) = \\vec 0$ (or the partial derivatives do not exist)`, `$f(x,y) = 0$`, `$f_x = f_y$`, `$f_{xx}(x,y) = 0$`],
  `A critical point is where the gradient is the zero vector. These are the candidates for a maximum, minimum or saddle point.`],
 [`$f(x,y)$ har kontinuerlige andrederiverte. Hva sier Clairauts teorem (Schwarz' teorem) om de blandede partiellderiverte $f_{xy}$ og $f_{yx}$?`,
  [`De er like: $f_{xy} = f_{yx}$`, `De er alltid null`, `Rekkefølgen av derivasjon avgjør fortegnet`, `Summen $f_{xy}+f_{yx}$ er null`],
  `Så lenge de blandede partiellderiverte er kontinuerlige, spiller rekkefølgen av derivasjon ingen rolle.`,
  `$f(x,y)$ has continuous second partial derivatives. What does Clairaut's theorem (Schwarz' theorem) say about the mixed partial derivatives $f_{xy}$ and $f_{yx}$?`,
  [`They are equal: $f_{xy} = f_{yx}$`, `They are always zero`, `The order of differentiation determines the sign`, `The sum $f_{xy}+f_{yx}$ is zero`],
  `As long as the mixed partial derivatives are continuous, the order of differentiation does not matter.`],
 [`$z=f(x,y)$ der $x=x(u,v)$ og $y=y(u,v)$. Hva er $\\partial z/\\partial u$?`,
  [`$f_x\\dfrac{\\partial x}{\\partial u} + f_y\\dfrac{\\partial y}{\\partial u}$`, `$f_x + f_y$`, `$f_x\\dfrac{\\partial x}{\\partial u}\\cdot f_y\\dfrac{\\partial y}{\\partial u}$`, `$\\dfrac{\\partial f}{\\partial x}\\dfrac{\\partial f}{\\partial y}$`],
  `Hvert bidrag fra $x$ og $y$ går via sin egen mellomvariabel, akkurat som i kjerneregelen med én parameter.`,
  `$z=f(x,y)$ where $x=x(u,v)$ and $y=y(u,v)$. What is $\\partial z/\\partial u$?`,
  [`$f_x\\dfrac{\\partial x}{\\partial u} + f_y\\dfrac{\\partial y}{\\partial u}$`, `$f_x + f_y$`, `$f_x\\dfrac{\\partial x}{\\partial u}\\cdot f_y\\dfrac{\\partial y}{\\partial u}$`, `$\\dfrac{\\partial f}{\\partial x}\\dfrac{\\partial f}{\\partial y}$`],
  `Each contribution from $x$ and $y$ goes through its own intermediate variable, exactly as in the single-parameter chain rule.`],
 [`Et rektangulært inngjerdet område skal ha omkrets 40 m. Bruk Lagranges metode til å finne det største mulige arealet.`,
  { n: 100, tol: 0.5, u: "m²" },
  `Maksimer $A=xy$ under $x+y=20$. Lagrange: $\\nabla(xy) = \\lambda\\nabla(x+y)$ gir $(y,x)=\\lambda(1,1)$, så $x=y$. Med $x+y=20$ blir $x=y=10$, og arealet er $A=10\\cdot 10=100$ m².`,
  `A rectangular enclosed area is to have perimeter 40 m. Use Lagrange's method to find the largest possible area.`, null,
  `Maximize $A=xy$ subject to $x+y=20$. Lagrange: $\\nabla(xy) = \\lambda\\nabla(x+y)$ gives $(y,x)=\\lambda(1,1)$, so $x=y$. With $x+y=20$ this gives $x=y=10$, and the area is $A=10\\cdot 10=100$ m².`]
]);
GEN("DAVE3700", 0,
 () => { const m = R.i(1, 4), n = R.i(1, 4), x0 = R.p([-3, -2, -1, 1, 2, 3]), y0 = R.p([-3, -2, -1, 1, 2, 3]);
   const v = m * n * x0 ** (m - 1) * y0 ** (n - 1);
   return [T(`$f(x,y) = x^{${m}}y^{${n}}$. Hva er den blandede partiellderiverte $f_{xy}(${x0}, ${y0})$?`,
       `$f(x,y) = x^{${m}}y^{${n}}$. What is the mixed partial derivative $f_{xy}(${x0}, ${y0})$?`), { n: v, tol: 0, u: "" },
     T(`$f_x = ${m}x^{${m - 1}}y^{${n}}$, så $f_{xy} = ${m}\\cdot ${n}x^{${m - 1}}y^{${n - 1}}$, som i punktet gir $${v}$. (Clairauts teorem: $f_{xy}=f_{yx}$.)`,
       `$f_x = ${m}x^{${m - 1}}y^{${n}}$, so $f_{xy} = ${m}\\cdot ${n}x^{${m - 1}}y^{${n - 1}}$, which at the point gives $${v}$. (Clairaut's theorem: $f_{xy}=f_{yx}$.)`)]; },
 () => { const a = R.i(1, 4), b = R.i(1, 4), x0 = R.i(-3, 3), y0 = R.i(-3, 3);
   const d = R.p([[3, 4], [4, 3], [-3, 4], [3, -4], [0, 1], [1, 0], [-4, 3], [4, -3]]); const mag = Math.hypot(d[0], d[1]);
   const ux = d[0] / mag, uy = d[1] / mag, gx = 2 * a * x0, gy = 2 * b * y0, v = gx * ux + gy * uy;
   const uTxt = mag === 1 ? `(${d[0]}, ${d[1]})` : `(${d[0]}/5, ${d[1]}/5)`;
   return [T(`$f(x,y) = ${cf(a)}x^2 + ${cf(b)}y^2$. Hva er den retningsderiverte $D_{\\vec u}f$ i $(${x0}, ${y0})$ i retningen $\\vec u = ${uTxt}$?`,
       `$f(x,y) = ${cf(a)}x^2 + ${cf(b)}y^2$. What is the directional derivative $D_{\\vec u}f$ at $(${x0}, ${y0})$ in the direction $\\vec u = ${uTxt}$?`),
     { n: v, tol: rel(v, 0.01, 0.05), u: "" },
     T(`$\\nabla f = (${2 * a}x, ${2 * b}y)$, som i $(${x0},${y0})$ gir $(${gx}, ${gy})$. $D_{\\vec u}f = \\nabla f\\cdot\\vec u = ${gx}\\cdot ${mf(ux, 3)} + ${gy}\\cdot ${mf(uy, 3)} \\approx ${mf(v, 3)}$.`,
       `$\\nabla f = (${2 * a}x, ${2 * b}y)$, which at $(${x0},${y0})$ gives $(${gx}, ${gy})$. $D_{\\vec u}f = \\nabla f\\cdot\\vec u = ${gx}\\cdot ${mf(ux, 3)} + ${gy}\\cdot ${mf(uy, 3)} \\approx ${mf(v, 3)}$.`)]; },
 () => { const a = R.i(1, 5), b = R.i(1, 5), d = R.i(2, 10), e = R.i(2, 10), f0 = R.i(150, 300);
   const xmin = d / (2 * a), ymin = e / (2 * b), Cmin = f0 - d * d / (4 * a) - e * e / (4 * b);
   return [T(`Materialbruken (i kg) for en beholder med design-parametere $x$ og $y$ er $M(x,y) = ${cf(a)}x^2 + ${cf(b)}y^2 - ${d}x - ${e}y + ${f0}$. Finn den minste mulige materialbruken.`,
       `The material use (in kg) for a container with design parameters $x$ and $y$ is $M(x,y) = ${cf(a)}x^2 + ${cf(b)}y^2 - ${d}x - ${e}y + ${f0}$. Find the minimum possible material use.`),
     { n: Cmin, tol: rel(Cmin, 0.01, 0.5), u: "kg" },
     T(`$M_x = ${2 * a}x - ${d} = 0 \\Rightarrow x = ${mf(xmin, 3)}$, $M_y = ${2 * b}y - ${e} = 0 \\Rightarrow y = ${mf(ymin, 3)}$. Siden $M_{xx}=${2 * a}>0$ og $M_{yy}=${2 * b}>0$ er dette et minimum: $M_{min} = ${f0} - \\dfrac{${d}^2}{${4 * a}} - \\dfrac{${e}^2}{${4 * b}} \\approx ${mf(Cmin, 3)}$ kg.`,
       `$M_x = ${2 * a}x - ${d} = 0 \\Rightarrow x = ${mf(xmin, 3)}$, $M_y = ${2 * b}y - ${e} = 0 \\Rightarrow y = ${mf(ymin, 3)}$. Since $M_{xx}=${2 * a}>0$ and $M_{yy}=${2 * b}>0$ this is a minimum: $M_{min} = ${f0} - \\dfrac{${d}^2}{${4 * a}} - \\dfrac{${e}^2}{${4 * b}} \\approx ${mf(Cmin, 3)}$ kg.`)]; }
);

THEORY("DAVE3700", 1, {
nb: `## Hva handler det om?

Et enkeltintegral summerer verdier langs en linje. Et dobbeltintegral $\\iint_D f\\,dA$ summerer verdier over et område i planet, og et trippelintegral $\\iiint_B f\\,dV$ summerer over et volum. De brukes til areal, volum, masse, tyngdepunkt og gjennomsnittsverdier – alt som er «summen av mange små bidrag» over en flate eller et volum. En ingeniør bruker dette til for eksempel å finne massen til en plate med varierende tetthet, eller volumet av en tank med skrå vegger.

## Begreper og formler

- Dobbeltintegral over et rektangel: $\\iint_{[a,b]\\times[c,d]} f(x,y)\\,dA = \\int_a^b\\!\\int_c^d f(x,y)\\,dy\\,dx$ (Fubinis teorem: rekkefølgen kan byttes for kontinuerlige funksjoner).
- Areal: $\\iint_D 1\\,dA$. Volum under en flate: $\\iint_D f\\,dA$ når $f\\ge 0$.
- Masse med tetthet $\\rho(x,y)$: $m = \\iint_D \\rho\\,dA$.
- Polarkoordinater: $x=r\\cos\\theta$, $y=r\\sin\\theta$, $dA = r\\,dr\\,d\\theta$. Faktoren $r$ er Jacobi-determinanten.
- Sylinderkoordinater: $dV = r\\,dr\\,d\\theta\\,dz$. Kulekoordinater: $dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$, der $\\varphi$ måles fra $z$-aksen.
- Trippelintegral over en boks: $\\iiint_{[a,b]\\times[c,d]\\times[e,f]} 1\\,dV = (b-a)(d-c)(f-e)$.

## Slik løser du oppgavene

1. Beskriv området, og avgjør om kartesiske, polare, sylindriske eller kuleformede koordinater er enklest.
2. Sett opp grensene innenfra og ut: den innerste variabelen kan ha grenser som avhenger av de ytre.
3. Bytt til polar/sylinder/kule ved å erstatte $x,y,(z)$ og legge til riktig Jacobi-faktor ($r$ eller $\\rho^2\\sin\\varphi$).
4. Regn integralet innenfra og ut, ett steg om gangen.
5. Sjekk resultatet: er det positivt der det skal være (areal, volum, masse)? Har det riktig størrelsesorden?

### Eksempel

Finn arealet av området mellom $y=x^2$ og $y=4$.

1. Kurvene skjærer der $x^2=4$, altså $x=\\pm 2$.
2. For hver $x$ mellom $-2$ og $2$ går $y$ fra $x^2$ til $4$: $A = \\int_{-2}^{2}\\int_{x^2}^{4} dy\\,dx = \\int_{-2}^{2}(4-x^2)\\,dx$.
3. $\\int_{-2}^2(4-x^2)\\,dx = \\left[4x - \\tfrac{x^3}{3}\\right]_{-2}^2 = \\left(8-\\tfrac83\\right) - \\left(-8+\\tfrac83\\right) = 16 - \\tfrac{16}{3} = \\tfrac{32}{3} \\approx 10{,}67$.

## Vanlige feil

- Å glemme faktoren $r$ i polare/sylindriske koordinater, eller $\\rho^2\\sin\\varphi$ i kulekoordinater.
- Å sette faste grenser når området egentlig ikke er et rektangel eller en boks – den indre grensen avhenger ofte av den ytre variabelen.
- Å bytte integrasjonsrekkefølge uten å bytte grensene tilsvarende.
- Å blande $\\varphi$ (målt fra $z$-aksen) med den polare vinkelen $\\theta$ i kulekoordinater.

> Velg koordinatsystem etter formen på området: rektangel/boks → kartesisk, sirkel/skive → polar, sylinder → sylinderkoordinater, kule → kulekoordinater.`,
en: `## What is it about?

A single integral sums values along a line. A double integral $\\iint_D f\\,dA$ sums values over a region in the plane, and a triple integral $\\iiint_B f\\,dV$ sums over a volume. They are used for area, volume, mass, centers of mass and average values – anything that is "the sum of many small contributions" over a surface or a volume. An engineer uses this to, for example, find the mass of a plate with varying density, or the volume of a tank with slanted walls.

## Key concepts and formulas

- Double integral over a rectangle: $\\iint_{[a,b]\\times[c,d]} f(x,y)\\,dA = \\int_a^b\\!\\int_c^d f(x,y)\\,dy\\,dx$ (Fubini's theorem: the order can be swapped for continuous functions).
- Area: $\\iint_D 1\\,dA$. Volume under a surface: $\\iint_D f\\,dA$ when $f\\ge 0$.
- Mass with density $\\rho(x,y)$: $m = \\iint_D \\rho\\,dA$.
- Polar coordinates: $x=r\\cos\\theta$, $y=r\\sin\\theta$, $dA = r\\,dr\\,d\\theta$. The factor $r$ is the Jacobian.
- Cylindrical coordinates: $dV = r\\,dr\\,d\\theta\\,dz$. Spherical coordinates: $dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$, where $\\varphi$ is measured from the $z$-axis.
- Triple integral over a box: $\\iiint_{[a,b]\\times[c,d]\\times[e,f]} 1\\,dV = (b-a)(d-c)(f-e)$.

## How to solve the problems

1. Describe the region, and decide whether Cartesian, polar, cylindrical or spherical coordinates are simplest.
2. Set up the bounds from the inside out: the innermost variable can have bounds that depend on the outer ones.
3. Switch to polar/cylindrical/spherical by replacing $x,y,(z)$ and adding the correct Jacobian factor ($r$ or $\\rho^2\\sin\\varphi$).
4. Evaluate the integral from the inside out, one step at a time.
5. Check the result: is it positive where it should be (area, volume, mass)? Does it have the right order of magnitude?

### Example

Find the area of the region between $y=x^2$ and $y=4$.

1. The curves meet where $x^2=4$, i.e. $x=\\pm 2$.
2. For each $x$ between $-2$ and $2$, $y$ runs from $x^2$ to $4$: $A = \\int_{-2}^{2}\\int_{x^2}^{4} dy\\,dx = \\int_{-2}^{2}(4-x^2)\\,dx$.
3. $\\int_{-2}^2(4-x^2)\\,dx = \\left[4x - \\tfrac{x^3}{3}\\right]_{-2}^2 = \\left(8-\\tfrac83\\right) - \\left(-8+\\tfrac83\\right) = 16 - \\tfrac{16}{3} = \\tfrac{32}{3} \\approx 10.67$.

## Common mistakes

- Forgetting the factor $r$ in polar/cylindrical coordinates, or $\\rho^2\\sin\\varphi$ in spherical coordinates.
- Using fixed bounds when the region is not actually a rectangle or a box – the inner bound often depends on the outer variable.
- Swapping the order of integration without updating the bounds accordingly.
- Confusing $\\varphi$ (measured from the $z$-axis) with the polar angle $\\theta$ in spherical coordinates.

> Choose the coordinate system to match the shape of the region: rectangle/box → Cartesian, circle/disk → polar, cylinder → cylindrical, sphere → spherical.`
});
BIQ("DAVE3700", 1, [
 [`Hva er volumelementet i sylinderkoordinater?`,
  [`$dV = r\\,dr\\,d\\theta\\,dz$`, `$dV = dr\\,d\\theta\\,dz$`, `$dV = r^2\\,dr\\,d\\theta\\,dz$`, `$dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$`],
  `Faktoren $r$ er Jacobi-determinanten for polar/sylinder. Det siste alternativet er volumelementet i kulekoordinater.`,
  `What is the volume element in cylindrical coordinates?`,
  [`$dV = r\\,dr\\,d\\theta\\,dz$`, `$dV = dr\\,d\\theta\\,dz$`, `$dV = r^2\\,dr\\,d\\theta\\,dz$`, `$dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$`],
  `The factor $r$ is the Jacobian for polar/cylindrical coordinates. The last option is the spherical volume element.`],
 [`Hvordan finner du massen til en plate med tetthet $\\rho(x,y)$ over et område $D$?`,
  [`$m = \\displaystyle\\iint_D \\rho(x,y)\\,dA$`, `$m = \\displaystyle\\iint_D \\nabla\\rho\\,dA$`, `$m = \\dfrac{1}{\\iint_D \\rho\\,dA}$`, `$m = \\displaystyle\\iint_D \\rho\\,dA \\big/ \\text{Areal}(D)$`],
  `Massen er tettheten integrert over området. Det siste alternativet gir i stedet gjennomsnittstettheten.`,
  `How do you find the mass of a plate with density $\\rho(x,y)$ over a region $D$?`,
  [`$m = \\displaystyle\\iint_D \\rho(x,y)\\,dA$`, `$m = \\displaystyle\\iint_D \\nabla\\rho\\,dA$`, `$m = \\dfrac{1}{\\iint_D \\rho\\,dA}$`, `$m = \\displaystyle\\iint_D \\rho\\,dA \\big/ \\text{Area}(D)$`],
  `The mass is the density integrated over the region. The last option instead gives the average density.`],
 [`Du bytter integrasjonsrekkefølgen i $\\iint_D f\\,dA$ fra $dy\\,dx$ til $dx\\,dy$ for et område $D$ som ikke er et rektangel. Hva skjer?`,
  [`Grensene må skrives om for den nye rekkefølgen, men verdien av integralet er uendret`, `Verdien av integralet endres`, `Det er umulig med mindre $D$ er et rektangel`, `Grensene forblir de samme`],
  `Selve tallverdien til integralet avhenger ikke av rekkefølgen, men grensene som beskriver $D$ må tilpasses.`,
  `You swap the order of integration in $\\iint_D f\\,dA$ from $dy\\,dx$ to $dx\\,dy$ for a region $D$ that is not a rectangle. What happens?`,
  [`The bounds must be rewritten for the new order, but the value of the integral is unchanged`, `The value of the integral changes`, `It is impossible unless $D$ is a rectangle`, `The bounds stay the same`],
  `The numerical value of the integral does not depend on the order, but the bounds describing $D$ must be adapted.`],
 [`Finn arealet av området avgrenset av $y = x^2$ og $y = 2x + 3$ ved å sette opp et dobbeltintegral.`,
  { n: 32 / 3, tol: 0.01, u: "" },
  `Kurvene skjærer der $x^2 = 2x+3$, altså $x=-1$ og $x=3$. Arealet er $\\int_{-1}^{3}\\big[(2x+3)-x^2\\big]\\,dx = \\left[x^2+3x-\\tfrac{x^3}{3}\\right]_{-1}^{3} = 9 - \\left(-\\tfrac53\\right) = \\tfrac{32}{3} \\approx 10{,}67$.`,
  `Find the area of the region bounded by $y = x^2$ and $y = 2x + 3$ by setting up a double integral.`, null,
  `The curves meet where $x^2 = 2x+3$, i.e. $x=-1$ and $x=3$. The area is $\\int_{-1}^{3}\\big[(2x+3)-x^2\\big]\\,dx = \\left[x^2+3x-\\tfrac{x^3}{3}\\right]_{-1}^{3} = 9 - \\left(-\\tfrac53\\right) = \\tfrac{32}{3} \\approx 10.67$.`]
]);
GEN("DAVE3700", 1,
 () => { const a = R.i(1, 10), b = R.i(1, 10);
   return [T(`Finn arealet av rektangelet $R=[0,${a}]\\times[0,${b}]$ ved å beregne $\\displaystyle\\iint_R 1\\,dA$.`,
       `Find the area of the rectangle $R=[0,${a}]\\times[0,${b}]$ by computing $\\displaystyle\\iint_R 1\\,dA$.`), { n: a * b, tol: 0, u: "" },
     T(`$\\iint_R 1\\,dA$ er arealet av $R$: $${a}\\cdot ${b} = ${a * b}$.`, `$\\iint_R 1\\,dA$ is the area of $R$: $${a}\\cdot ${b} = ${a * b}$.`)]; },
 () => { const p = R.i(1, 4), q = p + R.i(1, 4), A = Math.PI * (q * q - p * p);
   return [T(`Bruk polarkoordinater: Hva er arealet av ringen (annulus) mellom radius ${p} og radius ${q}?`,
       `Use polar coordinates: What is the area of the annulus between radius ${p} and radius ${q}?`), { n: A, tol: 0.01, u: "" },
     T(`$\\displaystyle\\int_0^{2\\pi}\\!\\int_{${p}}^{${q}} r\\,dr\\,d\\theta = 2\\pi\\cdot\\dfrac{${q}^2-${p}^2}{2} = ${q * q - p * p}\\pi \\approx ${mf(A, 3)}$.`,
       `$\\displaystyle\\int_0^{2\\pi}\\!\\int_{${p}}^{${q}} r\\,dr\\,d\\theta = 2\\pi\\cdot\\dfrac{${q}^2-${p}^2}{2} = ${q * q - p * p}\\pi \\approx ${mf(A, 3)}$.`)]; },
 () => { const k = R.i(1, 5), a = R.i(1, 6), b = R.i(1, 6), m = k * (a * a / 2) * (b * b / 2);
   return [T(`En rektangulær plate opptar $[0,${a}]\\times[0,${b}]$ (i meter) og har tetthet $\\rho(x,y) = ${cf(k)}xy$ kg/m². Finn massen til platen.`,
       `A rectangular plate occupies $[0,${a}]\\times[0,${b}]$ (in meters) and has density $\\rho(x,y) = ${cf(k)}xy$ kg/m². Find the mass of the plate.`),
     { n: m, tol: rel(m, 0.01, 0.05), u: "kg" },
     T(`$m = \\displaystyle\\iint_R ${cf(k)}xy\\,dA = ${cf(k)}\\int_0^{${a}}x\\,dx\\cdot\\int_0^{${b}}y\\,dy = ${cf(k)}\\cdot ${mf(a * a / 2)}\\cdot ${mf(b * b / 2)} = ${mf(m, 3)}$ kg.`,
       `$m = \\displaystyle\\iint_R ${cf(k)}xy\\,dA = ${cf(k)}\\int_0^{${a}}x\\,dx\\cdot\\int_0^{${b}}y\\,dy = ${cf(k)}\\cdot ${mf(a * a / 2)}\\cdot ${mf(b * b / 2)} = ${mf(m, 3)}$ kg.`)]; }
);

THEORY("DAVE3700", 2, {
nb: `## Hva handler det om?

Vektorfelt $\\vec F(x,y,z)$ beskriver noe som har både retning og størrelse i hvert punkt – en hastighetsstrøm, et kraftfelt, en varmefluks. Vektoranalyse gir verktøy for å måle hvor mye et felt «sprer seg ut» (divergens) og hvor mye det «roterer» (curl), og de store teoremene (Green, Stokes, divergensteoremet) knytter disse lokale målene til globale størrelser som fluks gjennom en flate eller sirkulasjon rundt en kurve. Dette er selve språket for strømningslære, elektromagnetisme og varmeoverføring.

## Begreper og formler

- Divergens: $\\nabla\\cdot\\vec F = \\partial_xF_1+\\partial_yF_2+\\partial_zF_3$. Måler kilder/sluk – positiv divergens betyr at feltet «strømmer ut» av punktet.
- Curl: $\\nabla\\times\\vec F$. Måler rotasjon i feltet. $\\nabla\\times(\\nabla f)=\\vec 0$ alltid (et gradientfelt er virvelfritt), og $\\nabla\\cdot(\\nabla\\times\\vec F)=0$ alltid.
- Konservativt felt: $\\vec F=\\nabla f$ for en potensialfunksjon $f$, på et enkelt sammenhengende område ekvivalent med $\\nabla\\times\\vec F=\\vec 0$. Da er $\\int_C\\vec F\\cdot d\\vec r = f(\\text{slutt})-f(\\text{start})$, uavhengig av vei.
- Greens teorem (i planet): $\\oint_C P\\,dx+Q\\,dy = \\iint_D(Q_x-P_y)\\,dA$.
- Divergensteoremet (Gauss): $\\oiint_S\\vec F\\cdot d\\vec S = \\iiint_V\\nabla\\cdot\\vec F\\,dV$.
- Stokes' teorem: $\\oint_C\\vec F\\cdot d\\vec r = \\iint_S(\\nabla\\times\\vec F)\\cdot d\\vec S$, der $C$ avgrenser flaten $S$.

## Slik løser du oppgavene

1. Sjekk om feltet er konservativt: er $\\nabla\\times\\vec F=\\vec 0$? Finn i så fall potensialfunksjonen og bruk kun endepunktene.
2. For lukkede kurver i planet: bruk Greens teorem i stedet for å regne linjeintegralet direkte.
3. For fluks gjennom en lukket flate: bruk divergensteoremet, regn $\\nabla\\cdot\\vec F$ og integrer over volumet.
4. For sirkulasjon rundt en kurve som avgrenser en flate: bruk Stokes' teorem.
5. Sjekk fortegn og enheter til slutt – fluks og sirkulasjon kan være negative.

### Eksempel

Bruk divergensteoremet til å finne fluksen av $\\vec F=(x^2,\\,0,\\,0)$ ut av kuben $[0,2]^3$.

1. $\\nabla\\cdot\\vec F = 2x$.
2. Fluksen er $\\iiint_V 2x\\,dV = \\int_0^2\\!\\int_0^2\\!\\int_0^2 2x\\,dx\\,dy\\,dz$.
3. $\\int_0^2 2x\\,dx = 4$, og resten av volumet gir en faktor $2\\cdot 2=4$: fluksen er $4\\cdot 4=16$.

## Vanlige feil

- Å bruke Greens/Stokes/divergensteoremet på en flate eller kurve som ikke er lukket.
- Å blande divergens (skalar) og curl (vektor) – divergens gir kilder/sluk, curl gir rotasjon.
- Å glemme at et konservativt felt gjør linjeintegralet veiuavhengig – da trenger du ikke parametrisere kurven i det hele tatt.
- Fortegnsfeil i Greens teorem: det er $Q_x-P_y$, ikke $P_y-Q_x$.

> Divergens måler kilder, curl måler rotasjon. De tre store teoremene bytter et vanskelig linje- eller flateintegral mot et enklere flate- eller volumintegral.`,
en: `## What is it about?

A vector field $\\vec F(x,y,z)$ describes something that has both direction and magnitude at every point – a flow velocity, a force field, a heat flux. Vector calculus gives tools to measure how much a field "spreads out" (divergence) and how much it "rotates" (curl), and the big theorems (Green, Stokes, the divergence theorem) tie these local measures to global quantities such as flux through a surface or circulation around a curve. This is the language of fluid mechanics, electromagnetism and heat transfer.

## Key concepts and formulas

- Divergence: $\\nabla\\cdot\\vec F = \\partial_xF_1+\\partial_yF_2+\\partial_zF_3$. It measures sources/sinks – positive divergence means the field "flows out" of the point.
- Curl: $\\nabla\\times\\vec F$. It measures rotation in the field. $\\nabla\\times(\\nabla f)=\\vec 0$ always (a gradient field is irrotational), and $\\nabla\\cdot(\\nabla\\times\\vec F)=0$ always.
- Conservative field: $\\vec F=\\nabla f$ for a potential function $f$, on a simply connected region equivalent to $\\nabla\\times\\vec F=\\vec 0$. Then $\\int_C\\vec F\\cdot d\\vec r = f(\\text{end})-f(\\text{start})$, independent of the path.
- Green's theorem (in the plane): $\\oint_C P\\,dx+Q\\,dy = \\iint_D(Q_x-P_y)\\,dA$.
- Divergence theorem (Gauss): $\\oiint_S\\vec F\\cdot d\\vec S = \\iiint_V\\nabla\\cdot\\vec F\\,dV$.
- Stokes' theorem: $\\oint_C\\vec F\\cdot d\\vec r = \\iint_S(\\nabla\\times\\vec F)\\cdot d\\vec S$, where $C$ bounds the surface $S$.

## How to solve the problems

1. Check whether the field is conservative: is $\\nabla\\times\\vec F=\\vec 0$? If so, find the potential function and use only the endpoints.
2. For closed curves in the plane: use Green's theorem instead of computing the line integral directly.
3. For flux through a closed surface: use the divergence theorem, compute $\\nabla\\cdot\\vec F$ and integrate over the volume.
4. For circulation around a curve that bounds a surface: use Stokes' theorem.
5. Check the sign and units at the end – flux and circulation can be negative.

### Example

Use the divergence theorem to find the flux of $\\vec F=(x^2,\\,0,\\,0)$ out of the cube $[0,2]^3$.

1. $\\nabla\\cdot\\vec F = 2x$.
2. The flux is $\\iiint_V 2x\\,dV = \\int_0^2\\!\\int_0^2\\!\\int_0^2 2x\\,dx\\,dy\\,dz$.
3. $\\int_0^2 2x\\,dx = 4$, and the rest of the volume contributes a factor $2\\cdot 2=4$: the flux is $4\\cdot 4=16$.

## Common mistakes

- Using Green's/Stokes'/the divergence theorem on a surface or curve that is not closed.
- Confusing divergence (a scalar) with curl (a vector) – divergence gives sources/sinks, curl gives rotation.
- Forgetting that a conservative field makes the line integral path-independent – then you do not need to parametrize the curve at all.
- Sign errors in Green's theorem: it is $Q_x-P_y$, not $P_y-Q_x$.

> Divergence measures sources, curl measures rotation. The three big theorems trade a hard line/surface integral for an easier surface/volume integral.`
});
BIQ("DAVE3700", 2, [
 [`Hva er formelen for divergensen til $\\vec F = (P, Q, R)$?`,
  [`$\\nabla\\cdot\\vec F = P_x + Q_y + R_z$`, `$\\nabla\\cdot\\vec F = P_y + Q_x + R$`, `$\\nabla\\cdot\\vec F = P_x\\cdot Q_y\\cdot R_z$`, `$\\nabla\\cdot\\vec F = P + Q + R$`],
  `Divergensen er summen av de partiellderiverte av hver komponent med hensyn på sin egen variabel.`,
  `What is the formula for the divergence of $\\vec F = (P, Q, R)$?`,
  [`$\\nabla\\cdot\\vec F = P_x + Q_y + R_z$`, `$\\nabla\\cdot\\vec F = P_y + Q_x + R$`, `$\\nabla\\cdot\\vec F = P_x\\cdot Q_y\\cdot R_z$`, `$\\nabla\\cdot\\vec F = P + Q + R$`],
  `The divergence is the sum of the partial derivatives of each component with respect to its own variable.`],
 [`Hva er $\\nabla\\cdot(\\nabla\\times\\vec F)$ for et glatt vektorfelt $\\vec F$?`,
  [`Alltid 0`, `Alltid $\\nabla f$ for en skalarfunksjon $f$`, `Avhenger av $\\vec F$`, `$|\\vec F|$`],
  `Akkurat som curl av en gradient alltid er null, er divergensen til en curl alltid null – en nyttig identitet for å sjekke utregninger.`,
  `What is $\\nabla\\cdot(\\nabla\\times\\vec F)$ for a smooth vector field $\\vec F$?`,
  [`Always 0`, `Always $\\nabla f$ for some scalar function $f$`, `Depends on $\\vec F$`, `$|\\vec F|$`],
  `Just as the curl of a gradient is always zero, the divergence of a curl is always zero – a useful identity for checking computations.`],
 [`Et strømningsfelt $\\vec v$ har $\\nabla\\cdot\\vec v = 0$ overalt (divergensfritt). Hva betyr det fysisk?`,
  [`Strømningen er inkompressibel: det er ingen kilder eller sluk`, `Strømningen er konservativ (virvelfri)`, `Strømningen roterer ikke`, `Farten er konstant overalt`],
  `Inkompressibel strømning bevarer volum – like mye strømmer inn som ut av et hvilket som helst lite volum.`,
  `A flow field $\\vec v$ has $\\nabla\\cdot\\vec v = 0$ everywhere (divergence-free). What does that mean physically?`,
  [`The flow is incompressible: there are no sources or sinks`, `The flow is conservative (irrotational)`, `The flow does not rotate`, `The speed is constant everywhere`],
  `Incompressible flow conserves volume – exactly as much flows into any small volume as flows out of it.`],
 [`Bruk divergensteoremet: Hva er fluksen av $\\vec F = (x^2, 0, 0)$ ut av kuben $[0,3]^3$?`,
  { n: 81, tol: 0.5, u: "" },
  `$\\nabla\\cdot\\vec F = 2x$. Fluksen er $\\iiint 2x\\,dV = \\left(\\int_0^3 2x\\,dx\\right)\\cdot 3\\cdot 3 = 9\\cdot 9 = 81$.`,
  `Use the divergence theorem: What is the flux of $\\vec F = (x^2, 0, 0)$ out of the cube $[0,3]^3$?`, null,
  `$\\nabla\\cdot\\vec F = 2x$. The flux is $\\iiint 2x\\,dV = \\left(\\int_0^3 2x\\,dx\\right)\\cdot 3\\cdot 3 = 9\\cdot 9 = 81$.`]
]);
GEN("DAVE3700", 2,
 () => { const a = R.i(-5, 5), b = R.i(-5, 5); let p, q; do { p = R.i(-4, 4); q = R.i(-4, 4); } while (p === 0 && q === 0);
   const v = a * p + b * q;
   return [T(`$\\vec F = (${a}, ${b})$ er et konstant kraftfelt. Beregn $\\int_C\\vec F\\cdot d\\vec r$ langs den rette linjen fra $(0,0)$ til $(${p}, ${q})$.`,
       `$\\vec F = (${a}, ${b})$ is a constant force field. Compute $\\int_C\\vec F\\cdot d\\vec r$ along the straight line from $(0,0)$ to $(${p}, ${q})$.`), { n: v, tol: 0, u: "" },
     T(`For et konstant felt er $\\int_C\\vec F\\cdot d\\vec r = \\vec F\\cdot(\\text{forflytning}) = (${a},${b})\\cdot(${p},${q}) = ${v}$.`,
       `For a constant field, $\\int_C\\vec F\\cdot d\\vec r = \\vec F\\cdot(\\text{displacement}) = (${a},${b})\\cdot(${p},${q}) = ${v}$.`)]; },
 () => { const k = R.i(1, 5), w = R.i(1, 6), h = R.i(1, 6), circ = 2 * k * w * h;
   return [T(`$\\vec F = (-${cf(k)}y,\\ ${cf(k)}x)$. Bruk Greens teorem til å finne sirkulasjonen $\\oint_C\\vec F\\cdot d\\vec r$ rundt randen av rektangelet $[0,${w}]\\times[0,${h}]$ (mot klokka).`,
       `$\\vec F = (-${cf(k)}y,\\ ${cf(k)}x)$. Use Green's theorem to find the circulation $\\oint_C\\vec F\\cdot d\\vec r$ around the boundary of the rectangle $[0,${w}]\\times[0,${h}]$ (counterclockwise).`),
     { n: circ, tol: 0, u: "" },
     T(`$Q_x-P_y = ${k}-(-${k}) = ${2 * k}$. Greens teorem gir $\\oint_C\\vec F\\cdot d\\vec r = \\iint_D ${2 * k}\\,dA = ${2 * k}\\cdot ${w}\\cdot ${h} = ${circ}$.`,
       `$Q_x-P_y = ${k}-(-${k}) = ${2 * k}$. Green's theorem gives $\\oint_C\\vec F\\cdot d\\vec r = \\iint_D ${2 * k}\\,dA = ${2 * k}\\cdot ${w}\\cdot ${h} = ${circ}$.`)]; },
 () => { const om = R.i(1, 6), rad = R.i(1, 5), circ = 2 * om * Math.PI * rad * rad;
   return [T(`En stiv rotasjon har hastighetsfelt $\\vec v = (-${cf(om)}y,\\ ${cf(om)}x,\\ 0)$ med vinkelfart $\\omega = ${om}$ rad/s. Bruk Stokes' teorem til å finne sirkulasjonen $\\oint_C\\vec v\\cdot d\\vec r$ rundt en sirkel med radius ${rad} m i $xy$-planet, sentrert i origo.`,
       `A rigid rotation has velocity field $\\vec v = (-${cf(om)}y,\\ ${cf(om)}x,\\ 0)$ with angular speed $\\omega = ${om}$ rad/s. Use Stokes' theorem to find the circulation $\\oint_C\\vec v\\cdot d\\vec r$ around a circle of radius ${rad} m in the $xy$-plane, centered at the origin.`),
     { n: circ, tol: rel(circ, 0.01, 0.5), u: "" },
     T(`$\\nabla\\times\\vec v = (0,0,2\\omega)$, så sirkulasjonen er $\\iint_S 2\\omega\\,dA = 2${om === 1 ? "" : om}\\cdot\\pi\\cdot ${rad}^2 \\approx ${mf(circ, 3)}$.`,
       `$\\nabla\\times\\vec v = (0,0,2\\omega)$, so the circulation is $\\iint_S 2\\omega\\,dA = 2${om === 1 ? "" : om}\\cdot\\pi\\cdot ${rad}^2 \\approx ${mf(circ, 3)}$.`)]; }
);

// ================================================================
//  DAVE3705 Laplace, Fourier og PDE
// ================================================================
THEORY("DAVE3705", 0, {
nb: `## Hva handler det om?

Laplacetransformasjonen gjør om en funksjon av tid, $f(t)$, til en funksjon av en kompleks variabel $s$: $F(s) = \\mathcal L\\{f(t)\\} = \\int_0^\\infty f(t)e^{-st}\\,dt$. Det viktige er at den gjør differensiallikninger om til algebraiske likninger – i stedet for å derivere og integrere i tidsdomenet, ganger og deler du i $s$-domenet. Dette er selve verktøyet ingeniører bruker til å analysere kretser, mekaniske systemer og reguleringssystemer uten å løse differensiallikningen direkte.

## Begreper og formler

- Linearitet: $\\mathcal L\\{af+bg\\} = aF(s)+bG(s)$.
- Deriverte: $\\mathcal L\\{f'\\} = sF(s)-f(0)$, $\\mathcal L\\{f''\\} = s^2F(s)-sf(0)-f'(0)$.
- Standardtransformer: $\\mathcal L\\{1\\}=1/s$, $\\mathcal L\\{t^n\\}=n!/s^{n+1}$, $\\mathcal L\\{e^{at}\\}=1/(s-a)$, $\\mathcal L\\{\\sin\\omega t\\}=\\omega/(s^2+\\omega^2)$, $\\mathcal L\\{\\cos\\omega t\\}=s/(s^2+\\omega^2)$.
- s-skift: $\\mathcal L\\{e^{at}f(t)\\}=F(s-a)$.
- t-skift (andre forskyvningsregel): $\\mathcal L\\{f(t-a)u(t-a)\\}=e^{-as}F(s)$, der $u$ er enhetssprangfunksjonen.
- Konvolusjonsteoremet: $\\mathcal L\\{f*g\\}=F(s)G(s)$, der $(f*g)(t)=\\int_0^t f(\\tau)g(t-\\tau)\\,d\\tau$.
- Start- og sluttverditeoremet: $f(0^+)=\\lim_{s\\to\\infty}sF(s)$, og $\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to0}sF(s)$ (hvis grensen finnes).
- Dirac-puls: $\\mathcal L\\{\\delta(t)\\}=1$.

## Slik løser du oppgavene

1. Transformer hele differensiallikningen ledd for ledd, og bruk deriverte-reglene med initialbetingelsene.
2. Løs den algebraiske likningen for $Y(s)$.
3. Del opp $Y(s)$ med delbrøkoppspalting til enkle brøker du kjenner igjen fra tabellen.
4. Transformer tilbake ledd for ledd til $y(t)$.
5. Sjekk svaret: stemmer $y(0)$ med initialbetingelsen?

### Eksempel

Løs $y'' + 4y = 0$, $y(0) = 2$, $y'(0) = 0$.

1. Transformer: $s^2Y - 2s - 0 + 4Y = 0$.
2. Løs for $Y$: $Y(s^2+4) = 2s$, så $Y(s) = \\dfrac{2s}{s^2+4}$.
3. Dette kjenner vi igjen som transformen til $\\cos 2t$: $y(t) = 2\\cos 2t$.
4. Sjekk: $y(0) = 2\\cos 0 = 2$. Stemmer.

## Vanlige feil

- Å glemme initialbetingelsene når $\\mathcal L\\{f'\\}$ eller $\\mathcal L\\{f''\\}$ brukes.
- Å blande s-skift ($e^{at}f(t)$) med t-skift ($f(t-a)u(t-a)$) – de gir helt ulike resultater.
- Feil fortegn eller faktor i delbrøkoppspaltingen.
- Å tro sluttverditeoremet gjelder selv om systemet ikke er stabilt (poler med positiv realdel, eller flere poler i origo).

> Laplace gjør en differensiallikning om til algebra i $s$. Løs for $Y(s)$, del opp med delbrøker, og transformer tilbake ledd for ledd.`,
en: `## What is it about?

The Laplace transform turns a function of time, $f(t)$, into a function of a complex variable $s$: $F(s) = \\mathcal L\\{f(t)\\} = \\int_0^\\infty f(t)e^{-st}\\,dt$. The key point is that it turns differential equations into algebraic equations – instead of differentiating and integrating in the time domain, you multiply and divide in the $s$-domain. This is the very tool engineers use to analyze circuits, mechanical systems and control systems without solving the differential equation directly.

## Key concepts and formulas

- Linearity: $\\mathcal L\\{af+bg\\} = aF(s)+bG(s)$.
- Derivatives: $\\mathcal L\\{f'\\} = sF(s)-f(0)$, $\\mathcal L\\{f''\\} = s^2F(s)-sf(0)-f'(0)$.
- Standard transforms: $\\mathcal L\\{1\\}=1/s$, $\\mathcal L\\{t^n\\}=n!/s^{n+1}$, $\\mathcal L\\{e^{at}\\}=1/(s-a)$, $\\mathcal L\\{\\sin\\omega t\\}=\\omega/(s^2+\\omega^2)$, $\\mathcal L\\{\\cos\\omega t\\}=s/(s^2+\\omega^2)$.
- s-shift: $\\mathcal L\\{e^{at}f(t)\\}=F(s-a)$.
- t-shift (second shifting theorem): $\\mathcal L\\{f(t-a)u(t-a)\\}=e^{-as}F(s)$, where $u$ is the unit step function.
- Convolution theorem: $\\mathcal L\\{f*g\\}=F(s)G(s)$, where $(f*g)(t)=\\int_0^t f(\\tau)g(t-\\tau)\\,d\\tau$.
- Initial and final value theorems: $f(0^+)=\\lim_{s\\to\\infty}sF(s)$, and $\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to0}sF(s)$ (if the limit exists).
- Dirac impulse: $\\mathcal L\\{\\delta(t)\\}=1$.

## How to solve the problems

1. Transform the whole differential equation term by term, using the derivative rules together with the initial conditions.
2. Solve the resulting algebraic equation for $Y(s)$.
3. Split $Y(s)$ with partial fractions into simple terms you recognize from the table.
4. Transform back term by term to get $y(t)$.
5. Check the answer: does $y(0)$ match the initial condition?

### Example

Solve $y'' + 4y = 0$, $y(0) = 2$, $y'(0) = 0$.

1. Transform: $s^2Y - 2s - 0 + 4Y = 0$.
2. Solve for $Y$: $Y(s^2+4) = 2s$, so $Y(s) = \\dfrac{2s}{s^2+4}$.
3. We recognize this as the transform of $\\cos 2t$: $y(t) = 2\\cos 2t$.
4. Check: $y(0) = 2\\cos 0 = 2$. Correct.

## Common mistakes

- Forgetting the initial conditions when using $\\mathcal L\\{f'\\}$ or $\\mathcal L\\{f''\\}$.
- Mixing up s-shift ($e^{at}f(t)$) with t-shift ($f(t-a)u(t-a)$) – they give completely different results.
- Sign or factor errors in the partial fraction expansion.
- Assuming the final value theorem holds even when the system is unstable (poles with positive real part, or more than one pole at the origin).

> Laplace turns a differential equation into algebra in $s$. Solve for $Y(s)$, split it with partial fractions, and transform back term by term.`
});
BIQ("DAVE3705", 0, [
 [`Hva er $\\mathcal L\\{e^{4t}\\}$?`,
  [`$\\dfrac{1}{s-4}$`, `$\\dfrac{1}{s+4}$`, `$\\dfrac{4}{s^2}$`, `$e^{4s}$`],
  `Standardtransformen $\\mathcal L\\{e^{at}\\}=1/(s-a)$ med $a=4$.`,
  `What is $\\mathcal L\\{e^{4t}\\}$?`,
  [`$\\dfrac{1}{s-4}$`, `$\\dfrac{1}{s+4}$`, `$\\dfrac{4}{s^2}$`, `$e^{4s}$`],
  `The standard transform $\\mathcal L\\{e^{at}\\}=1/(s-a)$ with $a=4$.`],
 [`Hva sier konvolusjonsteoremet?`,
  [`$\\mathcal L\\{f*g\\} = F(s)G(s)$`, `$\\mathcal L\\{fg\\} = F(s)G(s)$`, `$\\mathcal L\\{f*g\\} = F(s)+G(s)$`, `$\\mathcal L\\{f*g\\} = F(s)/G(s)$`],
  `Produktet av transformene tilsvarer konvolusjonen $(f*g)(t)=\\int_0^t f(\\tau)g(t-\\tau)\\,d\\tau$ i tidsdomenet, ikke det vanlige produktet $f(t)g(t)$.`,
  `What does the convolution theorem say?`,
  [`$\\mathcal L\\{f*g\\} = F(s)G(s)$`, `$\\mathcal L\\{fg\\} = F(s)G(s)$`, `$\\mathcal L\\{f*g\\} = F(s)+G(s)$`, `$\\mathcal L\\{f*g\\} = F(s)/G(s)$`],
  `The product of the transforms corresponds to the convolution $(f*g)(t)=\\int_0^t f(\\tau)g(t-\\tau)\\,d\\tau$ in the time domain, not the ordinary product $f(t)g(t)$.`],
 [`Hva sier tidsforskyvningsregelen (t-skift)?`,
  [`$\\mathcal L\\{f(t-a)u(t-a)\\} = e^{-as}F(s)$`, `$\\mathcal L\\{f(t-a)\\} = F(s-a)$`, `$\\mathcal L\\{u(t-a)f(t)\\} = e^{-as}F(s)$`, `$\\mathcal L\\{f(t)\\}u(t-a) = e^{-as}F(s)$`],
  `Ikke bland med s-skift $\\mathcal L\\{e^{at}f(t)\\}=F(s-a)$ – det er en helt annen regel.`,
  `What does the time-shifting rule (t-shift) say?`,
  [`$\\mathcal L\\{f(t-a)u(t-a)\\} = e^{-as}F(s)$`, `$\\mathcal L\\{f(t-a)\\} = F(s-a)$`, `$\\mathcal L\\{u(t-a)f(t)\\} = e^{-as}F(s)$`, `$\\mathcal L\\{f(t)\\}u(t-a) = e^{-as}F(s)$`],
  `Do not confuse it with s-shift $\\mathcal L\\{e^{at}f(t)\\}=F(s-a)$ – that is a completely different rule.`],
 [`Løs $y'' + 9y = 0$ med $y(0) = 4$ og $y'(0) = 0$ ved hjelp av Laplace. Hva er $y(\\pi/9)$?`,
  { n: 2, tol: 0.02, u: "" },
  `$s^2Y - 4s + 9Y = 0$ gir $Y(s) = \\dfrac{4s}{s^2+9}$, altså $y(t) = 4\\cos 3t$. Ved $t=\\pi/9$: $y = 4\\cos(\\pi/3) = 4\\cdot 0{,}5 = 2$.`,
  `Solve $y'' + 9y = 0$ with $y(0) = 4$ and $y'(0) = 0$ using the Laplace transform. What is $y(\\pi/9)$?`, null,
  `$s^2Y - 4s + 9Y = 0$ gives $Y(s) = \\dfrac{4s}{s^2+9}$, so $y(t) = 4\\cos 3t$. At $t=\\pi/9$: $y = 4\\cos(\\pi/3) = 4\\cdot 0.5 = 2$.`]
]);
GEN("DAVE3705", 0,
 () => { const a = R.i(1, 7), k = R.p(["sinh", "cosh"]);
   const optsSinh = [`$\\dfrac{${a}}{s^2 - ${a * a}}$`, `$\\dfrac{${a}}{s^2 + ${a * a}}$`, `$\\dfrac{s}{s^2 - ${a * a}}$`, `$\\dfrac{1}{s - ${a}}$`];
   const optsCosh = [`$\\dfrac{s}{s^2 - ${a * a}}$`, `$\\dfrac{s}{s^2 + ${a * a}}$`, `$\\dfrac{${a}}{s^2 - ${a * a}}$`, `$\\dfrac{1}{s - ${a}}$`];
   return [`$\\mathcal L\\{\\${k}(${cf(a)}t)\\} = $`, k === "sinh" ? optsSinh : optsCosh,
     T(`Standardtabell: $\\mathcal L\\{\\sinh at\\} = a/(s^2-a^2)$ og $\\mathcal L\\{\\cosh at\\} = s/(s^2-a^2)$, her med $a=${a}$.`,
       `Standard table: $\\mathcal L\\{\\sinh at\\} = a/(s^2-a^2)$ and $\\mathcal L\\{\\cosh at\\} = s/(s^2-a^2)$, here with $a=${a}$.`)]; },
 () => { const a = R.i(1, 8);
   return [T(`Hva er $\\mathcal L\\{(t-${a})u(t-${a})\\}$, der $u$ er enhetssprangfunksjonen?`,
       `What is $\\mathcal L\\{(t-${a})u(t-${a})\\}$, where $u$ is the unit step function?`),
     [`$\\dfrac{e^{-${a}s}}{s^2}$`, `$\\dfrac{e^{-${a}s}}{s}$`, `$\\dfrac{e^{${a}s}}{s^2}$`, `$\\dfrac{${a}}{s^2}$`],
     T(`Med $f(t)=t$, $F(s)=1/s^2$, gir t-skiftregelen $\\mathcal L\\{f(t-${a})u(t-${a})\\} = e^{-${a}s}F(s) = e^{-${a}s}/s^2$.`,
       `With $f(t)=t$, $F(s)=1/s^2$, the t-shift rule gives $\\mathcal L\\{f(t-${a})u(t-${a})\\} = e^{-${a}s}F(s) = e^{-${a}s}/s^2$.`)]; },
 () => { const F0 = R.i(2, 20), om = R.i(1, 5), theta = R.p([Math.PI / 6, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, 5 * Math.PI / 6, Math.PI]);
   const t = theta / om, y = F0 / (om * om) * (1 - Math.cos(theta));
   return [T(`En fjær med udempet egenfrekvens $\\omega = ${om}$ rad/s er i ro ($y(0)=0$, $y'(0)=0$) og utsettes plutselig for et konstant pådrag $F_0 = ${F0}$, slik at $y'' + \\omega^2y = F_0$. Bruk Laplace til å finne $y(t)$ ved $t = ${mf(t, 3)}$ s.`,
       `A spring with undamped natural frequency $\\omega = ${om}$ rad/s is at rest ($y(0)=0$, $y'(0)=0$) and is suddenly subjected to a constant input $F_0 = ${F0}$, so that $y'' + \\omega^2y = F_0$. Use Laplace to find $y(t)$ at $t = ${mf(t, 3)}$ s.`),
     { n: y, tol: rel(y, 0.01, 0.02), u: "" },
     T(`$Y(s) = \\dfrac{F_0}{s(s^2+\\omega^2)}$ gir $y(t) = \\dfrac{F_0}{\\omega^2}(1-\\cos\\omega t)$. Med $\\omega t \\approx ${mf(theta, 3)}$: $y \\approx \\dfrac{${F0}}{${om * om}}(1-${mf(Math.cos(theta), 3)}) \\approx ${mf(y, 3)}$.`,
       `$Y(s) = \\dfrac{F_0}{s(s^2+\\omega^2)}$ gives $y(t) = \\dfrac{F_0}{\\omega^2}(1-\\cos\\omega t)$. With $\\omega t \\approx ${mf(theta, 3)}$: $y \\approx \\dfrac{${F0}}{${om * om}}(1-${mf(Math.cos(theta), 3)}) \\approx ${mf(y, 3)}$.`)]; }
);

THEORY("DAVE3705", 1, {
nb: `## Hva handler det om?

Enhver rimelig periodisk funksjon kan skrives som en sum av sinus- og cosinusledd med ulike frekvenser – en Fourierrekke. Dette er kraftig fordi lineære systemer (kretser, mekaniske svingesystemer) responderer enkelt på hver enkelt sinusbølge for seg, så man kan analysere responsen på et komplisert periodisk signal ledd for ledd. Fourierrekker er grunnlaget for signalbehandling, akustikk, og løsning av partielle differensiallikninger med periodiske eller avgrensede randbetingelser.

## Begreper og formler

- For en $2L$-periodisk funksjon: $f(x) = \\dfrac{a_0}{2} + \\displaystyle\\sum_{n=1}^\\infty\\left(a_n\\cos\\dfrac{n\\pi x}{L} + b_n\\sin\\dfrac{n\\pi x}{L}\\right)$.
- Koeffisienter: $a_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\dfrac{n\\pi x}{L}\\,dx$, $b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$.
- Like funksjon: bare cosinusledd ($b_n=0$). Odde funksjon: bare sinusledd ($a_n=0$).
- Halvbølgerekker på $[0,L]$: utvid $f$ oddetallssymmetrisk (kun $b_n$, sinusrekke) eller partallsymmetrisk (kun $a_n$, cosinusrekke), avhengig av hvilke randbetingelser du trenger.
- Grunnvinkelfrekvens: $\\omega_0 = \\pi/L$.
- Parsevals identitet: $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx = \\dfrac{a_0^2}{2} + \\displaystyle\\sum_{n=1}^\\infty(a_n^2+b_n^2)$ – energien i signalet er summen av energien i hvert ledd.
- Konvergens (Dirichlets teorem): rekken konvergerer mot $f(x)$ der $f$ er kontinuerlig, og mot gjennomsnittet av venstre og høyre grenseverdi i et sprangpunkt. Gibbs-fenomenet: et oversving på ca. 9 % nær sprang, som ikke forsvinner selv med flere ledd.

## Slik løser du oppgavene

1. Sjekk symmetri først: er $f$ like, odde, eller ingen av delene? Det bestemmer om du slipper $a_n$ eller $b_n$.
2. Regn ut $a_0$, $a_n$ og $b_n$ med integralformlene (bruk delvis integrasjon der $f$ er et polynom ganger sinus/cosinus).
3. Sett sammen rekken, eller bruk et kjent standardresultat (firkantbølge, sagtann, trekantbølge) hvis oppgaven ber om det.
4. For halvbølgerekker: bestem om oppgaven trenger sinus- eller cosinusutvidelse ut fra randbetingelsene.
5. Bruk Parseval til å regne effekt/energi uten å summere hele rekken eksplisitt.

### Eksempel

En sagtannbølge har $f(x)=x$ på $(-\\pi,\\pi)$, periodisk med periode $2\\pi$. Finn $b_3$.

1. $f$ er odde, så $a_n=0$ for alle $n$, og vi trenger bare $b_n$.
2. Standardresultatet for denne funksjonen er $b_n = \\dfrac{2(-1)^{n+1}}{n}$.
3. $b_3 = \\dfrac{2(-1)^4}{3} = \\dfrac23 \\approx 0{,}667$.

## Vanlige feil

- Å glemme å sjekke symmetri, og regne ut $a_n$ for en odde funksjon (den blir null, men det er bortkastet arbeid – og fort gjort å regne feil).
- Å forveksle $2L$-periodisk med $L$-periodisk i formlene for $a_n$ og $b_n$.
- Å tro Gibbs-oversvinget forsvinner med flere ledd – det flytter seg nærmere spranget, men blir ikke mindre.
- Å bruke feil symmetri (odde i stedet for like) ved halvbølgeutvidelse.

> Sjekk symmetri først – det halverer arbeidet. Fourierrekken konvergerer mot gjennomsnittet av grenseverdiene i et sprang, ikke mot noen av dem.`,
en: `## What is it about?

Any reasonable periodic function can be written as a sum of sine and cosine terms of different frequencies – a Fourier series. This is powerful because linear systems (circuits, mechanical oscillators) respond simply to each individual sine wave, so you can analyze the response to a complicated periodic signal term by term. Fourier series are the foundation of signal processing, acoustics, and solving partial differential equations with periodic or bounded boundary conditions.

## Key concepts and formulas

- For a $2L$-periodic function: $f(x) = \\dfrac{a_0}{2} + \\displaystyle\\sum_{n=1}^\\infty\\left(a_n\\cos\\dfrac{n\\pi x}{L} + b_n\\sin\\dfrac{n\\pi x}{L}\\right)$.
- Coefficients: $a_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\dfrac{n\\pi x}{L}\\,dx$, $b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$.
- Even function: only cosine terms ($b_n=0$). Odd function: only sine terms ($a_n=0$).
- Half-range series on $[0,L]$: extend $f$ as odd (only $b_n$, a sine series) or as even (only $a_n$, a cosine series), depending on which boundary conditions you need.
- Fundamental angular frequency: $\\omega_0 = \\pi/L$.
- Parseval's identity: $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx = \\dfrac{a_0^2}{2} + \\displaystyle\\sum_{n=1}^\\infty(a_n^2+b_n^2)$ – the energy of the signal is the sum of the energy in each term.

Convergence (Dirichlet's theorem): the series converges to $f(x)$ where $f$ is continuous, and to the average of the left- and right-hand limits at a jump discontinuity. Gibbs phenomenon: an overshoot of about 9% near a jump, which does not disappear even with more terms.

## How to solve the problems

1. Check symmetry first: is $f$ even, odd, or neither? This decides whether you can skip $a_n$ or $b_n$.
2. Compute $a_0$, $a_n$ and $b_n$ with the integral formulas (use integration by parts where $f$ is a polynomial times sine/cosine).
3. Assemble the series, or use a known standard result (square wave, sawtooth, triangle wave) if the problem asks for it.
4. For half-range series: decide whether the problem needs a sine or a cosine expansion based on the boundary conditions.
5. Use Parseval's identity to compute power/energy without summing the whole series explicitly.

### Example

A sawtooth wave has $f(x)=x$ on $(-\\pi,\\pi)$, periodic with period $2\\pi$. Find $b_3$.

1. $f$ is odd, so $a_n=0$ for all $n$, and we only need $b_n$.
2. The standard result for this function is $b_n = \\dfrac{2(-1)^{n+1}}{n}$.
3. $b_3 = \\dfrac{2(-1)^4}{3} = \\dfrac23 \\approx 0.667$.

## Common mistakes

- Forgetting to check symmetry, and computing $a_n$ for an odd function (it comes out zero, but it is wasted work – and easy to get wrong).
- Confusing $2L$-periodic with $L$-periodic in the formulas for $a_n$ and $b_n$.
- Believing the Gibbs overshoot disappears with more terms – it moves closer to the jump, but does not shrink.
- Using the wrong symmetry (odd instead of even) for a half-range expansion.

> Check symmetry first – it halves the work. The Fourier series converges to the average of the limits at a jump, not to either one of them.`
});
BIQ("DAVE3705", 1, [
 [`Hva er $b_n$ for en $2L$-periodisk funksjon?`,
  [`$b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$`, `$b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\dfrac{n\\pi x}{L}\\,dx$`, `$b_n = \\dfrac{2}{L}\\displaystyle\\int_0^{L} f(x)\\,dx$`, `$b_n = \\dfrac1{2L}\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$`],
  `Integranden med $\\cos$ gir i stedet $a_n$.`,
  `What is $b_n$ for a $2L$-periodic function?`,
  [`$b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$`, `$b_n = \\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\dfrac{n\\pi x}{L}\\,dx$`, `$b_n = \\dfrac{2}{L}\\displaystyle\\int_0^{L} f(x)\\,dx$`, `$b_n = \\dfrac1{2L}\\displaystyle\\int_{-L}^{L} f(x)\\sin\\dfrac{n\\pi x}{L}\\,dx$`],
  `The integrand with $\\cos$ instead gives $a_n$.`],
 [`Ved en halvbølge-sinusrekke for $f$ på $[0,L]$, hvordan utvider man $f$ for å bruke Fourierrekken?`,
  [`Man utvider $f$ oddetallssymmetrisk til $[-L,L]$ (bare $b_n$ blir med)`, `Man utvider $f$ partallsymmetrisk til $[-L,L]$`, `Man gjentar $f$ periodisk med periode $L$`, `Man trenger ikke utvide – formlene gjelder direkte på $[0,L]$`],
  `Odde utvidelse gir en sinusrekke, som passer med $f=0$ i endene (Dirichlet-betingelser).`,
  `For a half-range sine series of $f$ on $[0,L]$, how do you extend $f$ to use the Fourier series?`,
  [`You extend $f$ as an odd function to $[-L,L]$ (only $b_n$ appears)`, `You extend $f$ as an even function to $[-L,L]$`, `You repeat $f$ periodically with period $L$`, `You do not need to extend it – the formulas apply directly on $[0,L]$`],
  `An odd extension gives a sine series, which matches $f=0$ at the ends (Dirichlet conditions).`],
 [`En funksjon er periodisk og uendelig glatt (ingen sprang, ingen knekk). Hvordan avtar Fourierkoeffisientene $a_n, b_n$ sammenlignet med en funksjon med et sprang?`,
  [`Mye raskere – de avtar fortere enn enhver potens av $1/n$`, `Like fort, begge avtar som $1/n$`, `Saktere, fordi glatte funksjoner trenger flere ledd`, `Koeffisientene blir null etter noen få ledd`],
  `Et sprang gir koeffisienter som avtar som $1/n$. En uendelig glatt funksjon gir mye raskere avtagende koeffisienter, og ikke noe Gibbs-fenomen.`,
  `A function is periodic and infinitely smooth (no jumps, no kinks). How do the Fourier coefficients $a_n, b_n$ decay compared with a function that has a jump?`,
  [`Much faster – they decay faster than any power of $1/n$`, `Equally fast, both decay like $1/n$`, `Slower, because smooth functions need more terms`, `The coefficients become zero after a few terms`],
  `A jump gives coefficients that decay like $1/n$. An infinitely smooth function gives much faster decaying coefficients, and no Gibbs phenomenon.`],
 [`En periodisk funksjon har Fourierkoeffisienter $a_0 = 4$, $a_1 = 3$, $b_1 = 4$, og alle andre koeffisienter er null. Bruk Parsevals identitet til å finne $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx$.`,
  { n: 33, tol: 0.1, u: "" },
  `Parseval: $\\dfrac{a_0^2}{2}+\\displaystyle\\sum(a_n^2+b_n^2) = \\dfrac{4^2}{2}+(3^2+4^2) = 8+25=33$.`,
  `A periodic function has Fourier coefficients $a_0 = 4$, $a_1 = 3$, $b_1 = 4$, and all other coefficients are zero. Use Parseval's identity to find $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx$.`, null,
  `Parseval: $\\dfrac{a_0^2}{2}+\\displaystyle\\sum(a_n^2+b_n^2) = \\dfrac{4^2}{2}+(3^2+4^2) = 8+25=33$.`]
]);
GEN("DAVE3705", 1,
 () => { const A = R.i(1, 6), n = R.p([1, 3, 5, 7]), a = -4 * A / (n * n * Math.PI * Math.PI);
   return [T(`En trekantbølge med amplitude ${A} har Fourierkoeffisienter $a_n = -\\dfrac{4A}{n^2\\pi^2}$ for odde $n$ (og $0$ for like $n$). Hva er $a_{${n}}$?`,
       `A triangle wave with amplitude ${A} has Fourier coefficients $a_n = -\\dfrac{4A}{n^2\\pi^2}$ for odd $n$ (and $0$ for even $n$). What is $a_{${n}}$?`), { n: a, tol: 0.005, u: "" },
     T(`$a_{${n}} = -\\dfrac{4\\cdot ${A}}{${n}^2\\pi^2} \\approx ${mf(a, 4)}$.`, `$a_{${n}} = -\\dfrac{4\\cdot ${A}}{${n}^2\\pi^2} \\approx ${mf(a, 4)}$.`)]; },
 () => { const A = R.i(1, 8), L = R.p([1, 2, Math.PI]), n = R.p([1, 2, 3, 4, 5]); const Ls = L === Math.PI ? "\\pi" : mf(L);
   const b = (n % 2 === 1) ? 4 * A / (n * Math.PI) : 0;
   return [T(`Halvbølge-sinusrekke for $f(x)=${A}$ (konstant) på $[0, ${Ls}]$. Hva er $b_{${n}}$?`,
       `Half-range sine series for $f(x)=${A}$ (constant) on $[0, ${Ls}]$. What is $b_{${n}}$?`), { n: b, tol: 0.01, u: "" },
     n % 2 === 1 ? T(`$b_n = \\dfrac{2}{L}\\displaystyle\\int_0^L ${A}\\sin\\dfrac{n\\pi x}{L}\\,dx = \\dfrac{4\\cdot ${A}}{n\\pi}$ for odde $n$: $b_{${n}} \\approx ${mf(b, 4)}$.`,
       `$b_n = \\dfrac{2}{L}\\displaystyle\\int_0^L ${A}\\sin\\dfrac{n\\pi x}{L}\\,dx = \\dfrac{4\\cdot ${A}}{n\\pi}$ for odd $n$: $b_{${n}} \\approx ${mf(b, 4)}$.`)
       : T(`For like $n$ blir integralet null: $b_{${n}} = 0$.`, `For even $n$ the integral vanishes: $b_{${n}} = 0$.`)]; },
 () => { const a0 = R.i(1, 6), a1 = R.i(1, 5), b1 = R.i(1, 5), a2 = R.i(1, 4), b2 = R.i(1, 4);
   const val = a0 * a0 / 2 + (a1 * a1 + b1 * b1) + (a2 * a2 + b2 * b2);
   return [T(`En periodisk strøm har Fourierkoeffisienter $a_0=${a0}$, $a_1=${a1}$, $b_1=${b1}$, $a_2=${a2}$, $b_2=${b2}$ (resten er null). Bruk Parsevals identitet til å finne $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx$.`,
       `A periodic current has Fourier coefficients $a_0=${a0}$, $a_1=${a1}$, $b_1=${b1}$, $a_2=${a2}$, $b_2=${b2}$ (all others are zero). Use Parseval's identity to find $\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)^2\\,dx$.`),
     { n: val, tol: 0.05, u: "" },
     T(`$\\dfrac{a_0^2}{2}+\\displaystyle\\sum(a_n^2+b_n^2) = \\dfrac{${a0}^2}{2} + (${a1}^2+${b1}^2) + (${a2}^2+${b2}^2) = ${mf(a0 * a0 / 2, 2)} + ${a1 * a1 + b1 * b1} + ${a2 * a2 + b2 * b2} = ${mf(val, 3)}$.`,
       `$\\dfrac{a_0^2}{2}+\\displaystyle\\sum(a_n^2+b_n^2) = \\dfrac{${a0}^2}{2} + (${a1}^2+${b1}^2) + (${a2}^2+${b2}^2) = ${mf(a0 * a0 / 2, 2)} + ${a1 * a1 + b1 * b1} + ${a2 * a2 + b2 * b2} = ${mf(val, 3)}$.`)]; }
);

THEORY("DAVE3705", 2, {
nb: `## Hva handler det om?

Partielle differensiallikninger (PDE) beskriver størrelser som varierer både i rom og tid – temperatur i en stav, utslag på en streng, potensial i et område. De tre klassiske eksemplene er varmeligningen (diffusjon), bølgeligningen (svingninger som forplanter seg) og Laplaces ligning (stasjonære tilstander). Separasjon av variable bryter en PDE opp i enklere ordinære differensiallikninger, og Fourierrekker limer løsningene sammen slik at rand- og initialbetingelsene stemmer.

## Begreper og formler

- Varmeligningen: $u_t = c^2u_{xx}$ (parabolsk). Bølgeligningen: $u_{tt}=c^2u_{xx}$ (hyperbolsk). Laplaces ligning: $\\nabla^2u=0$ (elliptisk).
- Generell klassifisering: for $Au_{xx}+Bu_{xy}+Cu_{yy}+\\dots=0$ er PDE-en elliptisk hvis $B^2-4AC<0$, parabolsk hvis $=0$, og hyperbolsk hvis $>0$.
- Separasjon av variable: anta $u(x,t)=X(x)T(t)$. Innsatt i PDE-en gir dette to koblede ordinære differensiallikninger med en separasjonskonstant $\\lambda$.
- Egenverdiproblem med Dirichlet-rand $X(0)=X(L)=0$: egenverdier $\\lambda_n=(n\\pi/L)^2$, egenfunksjoner $X_n=\\sin(n\\pi x/L)$, $n=1,2,\\dots$
- Egenverdiproblem med Neumann-rand (isolerte ender) $X'(0)=X'(L)=0$: egenfunksjoner $X_n=\\cos(n\\pi x/L)$, $n=0,1,2,\\dots$ (inkludert den trivielle konstante løsningen $\\lambda_0=0$).
- Varmeligningsløsning: $u(x,t)=\\displaystyle\\sum_n B_n\\sin(n\\pi x/L)e^{-c^2(n\\pi/L)^2t}$ – hver mode dør ut, høye moder raskest.
- D'Alemberts løsning av bølgeligningen: $u(x,t)=F(x-ct)+G(x+ct)$, to bølger som beveger seg hver sin vei uten å endre form.

## Slik løser du oppgavene

1. Identifiser typen ligning (varme/bølge/Laplace) og randbetingelsene (Dirichlet: verdi gitt; Neumann: derivert gitt).
2. Sett $u=X(x)T(t)$, sett inn i PDE-en, og separer slik at én side bare avhenger av $x$ og den andre bare av $t$.
3. Løs egenverdiproblemet for $X$ med randbetingelsene – det gir de tillatte $\\lambda_n$ og egenfunksjonene.
4. Løs likningen for $T(t)$ med den samme $\\lambda_n$.
5. Summer opp modene med koeffisienter bestemt av initialbetingelsen (ofte via en Fourierrekke).

### Eksempel

En streng med lengde $L=2$ og bølgefart $c=3$ har startutslag som er ren mode $n=1$: $u(x,0)=5\\sin(\\pi x/2)$, med starthastighet null. Finn $u(1, 0{,}2)$.

1. Med kun mode 1 til stede er løsningen $u(x,t) = 5\\sin(\\pi x/2)\\cos(\\omega_1 t)$, der $\\omega_1 = cn\\pi/L = 3\\pi/2$.
2. Ved $x=1$: $\\sin(\\pi/2)=1$.
3. Ved $t=0{,}2$: $\\omega_1t = 3\\pi/2\\cdot 0{,}2 \\approx 0{,}942$, og $\\cos(0{,}942)\\approx 0{,}588$.
4. $u(1, 0{,}2) \\approx 5\\cdot 1\\cdot 0{,}588 \\approx 2{,}94$.

## Vanlige feil

- Å bruke Dirichlet-egenfunksjoner (sinus) når randbetingelsen egentlig er Neumann (isolert ende, cosinus).
- Å glemme at bølgeligningens generelle løsning har to vilkårlige funksjoner (fremover- og bakoverbølge), ikke én.
- Å blande sammen fortegnet til separasjonskonstanten $\\lambda$ – feil fortegn gir voksende i stedet for avtagende eller svingende løsninger.
- Å tro at Laplaces ligning har en tidsavhengig løsning – den beskriver en stasjonær tilstand.

> Separasjon av variable bryter PDE-en i to ODE-er. Randbetingelsene avgjør egenfunksjonene (sinus for Dirichlet, cosinus for Neumann); initialbetingelsen avgjør koeffisientene foran dem.`,
en: `## What is it about?

Partial differential equations (PDEs) describe quantities that vary both in space and time – temperature in a rod, displacement of a string, potential in a region. The three classic examples are the heat equation (diffusion), the wave equation (propagating oscillations) and Laplace's equation (steady states). Separation of variables breaks a PDE into simpler ordinary differential equations, and Fourier series glue the solutions together so the boundary and initial conditions are satisfied.

## Key concepts and formulas

- Heat equation: $u_t = c^2u_{xx}$ (parabolic). Wave equation: $u_{tt}=c^2u_{xx}$ (hyperbolic). Laplace's equation: $\\nabla^2u=0$ (elliptic).
- General classification: for $Au_{xx}+Bu_{xy}+Cu_{yy}+\\dots=0$ the PDE is elliptic if $B^2-4AC<0$, parabolic if $=0$, and hyperbolic if $>0$.
- Separation of variables: assume $u(x,t)=X(x)T(t)$. Substituting into the PDE gives two coupled ordinary differential equations with a separation constant $\\lambda$.
- Eigenvalue problem with Dirichlet boundary $X(0)=X(L)=0$: eigenvalues $\\lambda_n=(n\\pi/L)^2$, eigenfunctions $X_n=\\sin(n\\pi x/L)$, $n=1,2,\\dots$
- Eigenvalue problem with Neumann boundary (insulated ends) $X'(0)=X'(L)=0$: eigenfunctions $X_n=\\cos(n\\pi x/L)$, $n=0,1,2,\\dots$ (including the trivial constant solution $\\lambda_0=0$).
- Heat equation solution: $u(x,t)=\\displaystyle\\sum_n B_n\\sin(n\\pi x/L)e^{-c^2(n\\pi/L)^2t}$ – each mode dies out, higher modes fastest.
- D'Alembert's solution of the wave equation: $u(x,t)=F(x-ct)+G(x+ct)$, two waves that travel their own way without changing shape.

## How to solve the problems

1. Identify the type of equation (heat/wave/Laplace) and the boundary conditions (Dirichlet: value given; Neumann: derivative given).
2. Set $u=X(x)T(t)$, substitute into the PDE, and separate so that one side depends only on $x$ and the other only on $t$.
3. Solve the eigenvalue problem for $X$ with the boundary conditions – this gives the allowed $\\lambda_n$ and eigenfunctions.
4. Solve the equation for $T(t)$ with the same $\\lambda_n$.
5. Sum up the modes with coefficients determined by the initial condition (often via a Fourier series).

### Example

A string of length $L=2$ and wave speed $c=3$ has an initial shape that is a pure mode $n=1$: $u(x,0)=5\\sin(\\pi x/2)$, with zero initial velocity. Find $u(1, 0.2)$.

1. With only mode 1 present, the solution is $u(x,t) = 5\\sin(\\pi x/2)\\cos(\\omega_1 t)$, where $\\omega_1 = cn\\pi/L = 3\\pi/2$.
2. At $x=1$: $\\sin(\\pi/2)=1$.
3. At $t=0.2$: $\\omega_1t = 3\\pi/2\\cdot 0.2 \\approx 0.942$, and $\\cos(0.942)\\approx 0.588$.
4. $u(1, 0.2) \\approx 5\\cdot 1\\cdot 0.588 \\approx 2.94$.

## Common mistakes

- Using Dirichlet eigenfunctions (sine) when the boundary condition is actually Neumann (insulated end, cosine).
- Forgetting that the general solution of the wave equation has two arbitrary functions (a forward and a backward wave), not one.
- Mixing up the sign of the separation constant $\\lambda$ – the wrong sign gives growing solutions instead of decaying or oscillating ones.
- Believing Laplace's equation has a time-dependent solution – it describes a steady state.

> Separation of variables breaks the PDE into two ODEs. The boundary conditions decide the eigenfunctions (sine for Dirichlet, cosine for Neumann); the initial condition decides the coefficients in front of them.`
});
BIQ("DAVE3705", 2, [
 [`Den generelle andreordens PDE-en $Au_{xx}+Bu_{xy}+Cu_{yy}+\\dots=0$ er elliptisk når …`,
  [`$B^2-4AC<0$`, `$B^2-4AC>0$`, `$B^2-4AC=0$`, `$A=C$ alltid`],
  `Laplaces ligning ($A=C=1,B=0$) gir $B^2-4AC=-4<0$, i tråd med at den er elliptisk.`,
  `The general second-order PDE $Au_{xx}+Bu_{xy}+Cu_{yy}+\\dots=0$ is elliptic when …`,
  [`$B^2-4AC<0$`, `$B^2-4AC>0$`, `$B^2-4AC=0$`, `$A=C$ always`],
  `Laplace's equation ($A=C=1,B=0$) gives $B^2-4AC=-4<0$, consistent with it being elliptic.`],
 [`Egenverdiproblemet $X''+\\lambda X=0$ med Neumann-betingelser $X'(0)=X'(L)=0$ har egenfunksjoner …`,
  [`$X_n=\\cos(n\\pi x/L)$ for $n=0,1,2,\\dots$ (inkludert $\\lambda_0=0$ med konstant løsning)`, `$X_n=\\sin(n\\pi x/L)$ for $n=1,2,\\dots$`, `Ingen ikke-trivielle løsninger`, `$X_n=e^{n\\pi x/L}$`],
  `Deriverte lik null i endene passer med cosinusfunksjoner, inkludert den konstante løsningen ($n=0$).`,
  `The eigenvalue problem $X''+\\lambda X=0$ with Neumann conditions $X'(0)=X'(L)=0$ has eigenfunctions …`,
  [`$X_n=\\cos(n\\pi x/L)$ for $n=0,1,2,\\dots$ (including $\\lambda_0=0$ with the constant solution)`, `$X_n=\\sin(n\\pi x/L)$ for $n=1,2,\\dots$`, `No nontrivial solutions`, `$X_n=e^{n\\pi x/L}$`],
  `Zero derivatives at the ends match cosine functions, including the constant solution ($n=0$).`],
 [`Hva skjer med steady-state-temperaturen $u(x)$ i en stav uten indre varmekilder hvis begge endene er isolert (Neumann, $u_x=0$ i begge ender)?`,
  [`$u$ blir konstant, bestemt av starttemperaturen (energibevaring), ikke nødvendigvis null`, `$u=0$ overalt`, `$u$ vokser lineært`, `Det finnes ingen løsning`],
  `Uten varmefluks ut noen steder må $u_{xx}=0$ med $u_x=0$ i begge ender, som gir en konstant $u$.`,
  `What happens to the steady-state temperature $u(x)$ in a rod with no internal heat sources if both ends are insulated (Neumann, $u_x=0$ at both ends)?`,
  [`$u$ becomes constant, determined by the initial temperature (energy conservation), not necessarily zero`, `$u=0$ everywhere`, `$u$ grows linearly`, `There is no solution`],
  `With no heat flux out anywhere, $u_{xx}=0$ together with $u_x=0$ at both ends forces $u$ to be constant.`],
 [`En uendelig streng har startutslag $\\phi(x) = 6\\sin(2x)$ og starthastighet null. Bølgefarten er $c=5$. Bruk d'Alemberts løsning til å finne $u(1,\\,0{,}3)$.`,
  { n: -5.401, tol: 0.05, u: "" },
  `Med $\\psi=0$: $u(x,t)=\\tfrac12[\\phi(x-ct)+\\phi(x+ct)] = \\phi(x)\\cos(kct)$ (sum-til-produkt) $= 6\\sin(2\\cdot 1)\\cos(2\\cdot 5\\cdot 0{,}3) = 6\\sin(2)\\cos(3) \\approx 6\\cdot 0{,}909\\cdot(-0{,}990) \\approx -5{,}40$.`,
  `An infinitely long string has initial displacement $\\phi(x) = 6\\sin(2x)$ and zero initial velocity. The wave speed is $c=5$. Use d'Alembert's solution to find $u(1,\\,0.3)$.`, null,
  `With $\\psi=0$: $u(x,t)=\\tfrac12[\\phi(x-ct)+\\phi(x+ct)] = \\phi(x)\\cos(kct)$ (sum-to-product) $= 6\\sin(2\\cdot 1)\\cos(2\\cdot 5\\cdot 0.3) = 6\\sin(2)\\cos(3) \\approx 6\\cdot 0.909\\cdot(-0.990) \\approx -5.40$.`]
]);
GEN("DAVE3705", 2,
 () => { const typ = R.p(["heat", "wave", "laplace"]);
   const EQ = { heat: "u_t = c^2u_{xx}", wave: "u_{tt} = c^2u_{xx}", laplace: "\\nabla^2u = 0" };
   const ANSWORD = { heat: "Parabolsk", wave: "Hyperbolsk", laplace: "Elliptisk" };
   const EN = { "Parabolsk": "Parabolic", "Hyperbolsk": "Hyperbolic", "Elliptisk": "Elliptic" };
   const t = ANSWORD[typ], opts = [t, ...["Parabolsk", "Hyperbolsk", "Elliptisk"].filter(o => o !== t)];
   return [T(`Hva slags PDE er $${EQ[typ]}$?`, `What type of PDE is $${EQ[typ]}$?`), opts.map(o => T(o, EN[o])),
     T(`Varmeligningen er parabolsk, bølgeligningen hyperbolsk, og Laplaces ligning elliptisk.`,
       `The heat equation is parabolic, the wave equation hyperbolic, and Laplace's equation elliptic.`)]; },
 () => { const B = R.i(1, 10), n = R.i(1, 3), L = R.p([1, 2, 5]), c = R.p([1, 2, 3]), x0 = R.f(0.2, L - 0.2, 0.2), t0 = R.f(0.05, 0.5, 0.05);
   const lam = c * c * (n * Math.PI / L) ** 2, u = B * Math.sin(n * Math.PI * x0 / L) * Math.exp(-lam * t0);
   return [T(`Varmeligningen $u_t = ${mf(c * c)}u_{xx}$ på $[0, ${mf(L)}]$ med $u=0$ i endene har startbetingelse som er ren mode $n=${n}$: $u(x,0) = ${B}\\sin(${n}\\pi x/${mf(L)})$. Hva er $u(${mf(x0)},\\,${mf(t0)})$?`,
       `The heat equation $u_t = ${mf(c * c)}u_{xx}$ on $[0, ${mf(L)}]$ with $u=0$ at the ends has an initial condition that is a pure mode $n=${n}$: $u(x,0) = ${B}\\sin(${n}\\pi x/${mf(L)})$. What is $u(${mf(x0)},\\,${mf(t0)})$?`),
     { n: u, tol: rel(u, 0.02, 0.05), u: "" },
     T(`Med bare mode $n$ til stede: $u(x,t) = ${B}\\sin(${n}\\pi x/${mf(L)})e^{-\\lambda t}$ med $\\lambda = c^2(n\\pi/L)^2 \\approx ${mf(lam, 3)}$. Innsatt: $u \\approx ${mf(u, 3)}$.`,
       `With only mode $n$ present: $u(x,t) = ${B}\\sin(${n}\\pi x/${mf(L)})e^{-\\lambda t}$ with $\\lambda = c^2(n\\pi/L)^2 \\approx ${mf(lam, 3)}$. Substituting: $u \\approx ${mf(u, 3)}$.`)]; },
 () => { const A = R.i(2, 8), k = R.p([1, 2, 3]), cw = R.p([2, 3, 4, 5]), x0 = R.i(-3, 3), t0 = R.f(0.1, 0.6, 0.1);
   const u = A * Math.sin(k * x0) * Math.cos(k * cw * t0);
   return [T(`En uendelig lang streng har startutslag $\\phi(x) = ${cf(A)}\\sin(${cf(k)}x)$ og starthastighet null. Bølgefarten er $c = ${cw}$. Bruk d'Alemberts løsning til å finne $u(${x0},\\,${mf(t0, 2)})$.`,
       `An infinitely long string has initial displacement $\\phi(x) = ${cf(A)}\\sin(${cf(k)}x)$ and zero initial velocity. The wave speed is $c = ${cw}$. Use d'Alembert's solution to find $u(${x0},\\,${mf(t0, 2)})$.`),
     { n: u, tol: rel(u, 0.02, 0.05), u: "" },
     T(`Med $\\psi=0$: $u(x,t) = \\tfrac12[\\phi(x-ct)+\\phi(x+ct)] = \\phi(x)\\cos(kct)$. Her: $${cf(A)}\\sin(${cf(k)}\\cdot ${x0})\\cos(${cf(k)}\\cdot ${cw}\\cdot ${mf(t0, 2)}) \\approx ${mf(u, 3)}$.`,
       `With $\\psi=0$: $u(x,t) = \\tfrac12[\\phi(x-ct)+\\phi(x+ct)] = \\phi(x)\\cos(kct)$. Here: $${cf(A)}\\sin(${cf(k)}\\cdot ${x0})\\cos(${cf(k)}\\cdot ${cw}\\cdot ${mf(t0, 2)}) \\approx ${mf(u, 3)}$.`)]; }
);

// ----------------------------------------------------------------
// Rettelser av to eksisterende (base-app) generatorer for DAVE3705
// som kan gi færre enn 3 svaralternativer (funnet av check_add.js
// mens jeg testet mine egne DAVE3705-tillegg). Disse hørte til fra
// før (gens_b.js), som jeg ikke har lov til å redigere direkte, så
// jeg bytter ut kun funksjonsreferansen her, fra min egen fil.
// ----------------------------------------------------------------
(() => {
  const dave3705 = COURSES.find(c => c.code === "DAVE3705");
  if (dave3705) {
    // Enhet 0, generator 0: L{t^n} – for n=1 kolliderte tre av fire
    // alternativer til samme streng ("1/s^2"), slik at filtreringen
    // for unike verdier kunne gi bare 2 alternativer igjen.
    dave3705.units[0].gen[0] = () => {
      const n = R.i(1, 5), f = [1, 1, 2, 6, 24, 120][n];
      const correct = `$\\dfrac{${f}}{s^{${n + 1}}}$`;
      const wrongPool = [`$\\dfrac{1}{s^{${n + 1}}}$`, `$\\dfrac{${f}}{s^{${n}}}$`, `$\\dfrac{${n}}{s^{${n + 1}}}$`, `$\\dfrac{${f}}{s^{${n + 2}}}$`, `$\\dfrac{${n + 1}}{s^{${n}}}$`];
      const opts = [correct];
      for (const w of wrongPool) { if (!opts.includes(w) && opts.length < 4) opts.push(w); }
      return [`$\\mathcal L\\{t^{${n}}\\} = $`, opts, T(`$\\mathcal L\\{t^n\\} = n!/s^{n+1}$, og $${n}! = ${f}$.`, `$\\mathcal L\\{t^n\\} = n!/s^{n+1}$, and $${n}! = ${f}$.`)];
    };
    // Enhet 2, generator 2: stabilitet for trekantet matrise – hadde
    // bare to svaralternativer (Ja/Nei), under minstekravet på 3.
    dave3705.units[2].gen[2] = () => {
      const [a, d] = [R.i(-5, 4), R.i(-5, 4)], b = R.i(-3, 3), st = a < 0 && d < 0;
      const yes = T("Ja", "Yes"), no = T("Nei", "No"), dep = T("Avhenger av $b$", "Depends on $b$");
      return [T(`Er $\\vec x' = \\begin{pmatrix}${a}&${b}\\\\0&${d}\\end{pmatrix}\\vec x$ asymptotisk stabilt?`,
          `Is $\\vec x' = \\begin{pmatrix}${a}&${b}\\\\0&${d}\\end{pmatrix}\\vec x$ asymptotically stable?`),
        st ? [yes, no, dep] : [no, yes, dep],
        T(`Matrisen er trekantet, så egenverdiene er ${a} og ${d}. Stabilt krever at begge er negative. Elementet $b$ utenfor diagonalen påvirker ikke egenverdiene her.`,
          `The matrix is triangular, so the eigenvalues are ${a} and ${d}. Stability requires both to be negative. The off-diagonal element $b$ does not affect the eigenvalues here.`)];
    };
  }
})();
})();
