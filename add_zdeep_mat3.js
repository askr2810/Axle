// ============================================================
//  add_zdeep_mat3.js – fordypning i R1 og R2: forklaringer, regneeksempler og vanlige feil.
// ============================================================
(() => {
const M = (code, title, nb, en) => DEEP(code, title, nb, en, true);
// ===================== R1 =====================
M("VGR1", "Derivasjon og drøfting",
`## Hva betyr det å drøfte en funksjon?
Å **drøfte** en funksjon er å finne og forklare alle viktige egenskaper ved grafen – helst så godt at du kunne skissert den uten hjelpemidler.

## Sjekkliste for funksjonsdrøfting
1. **Definisjonsmengde**: hvor er funksjonen definert? (Nevner ≠ 0, logaritme av positive tall, ikke rot av negative tall.)
2. **Nullpunkter**: løs $f(x) = 0$.
3. **Skjæring med $y$-aksen**: $f(0)$.
4. **Asymptoter**: vertikale der nevneren er null (og telleren ikke), horisontale eller skrå når $x \\to \\pm\\infty$.
5. **Monotoniegenskaper**: fortegnslinje for $f'(x)$ – hvor er $f$ voksende og avtakende?
6. **Ekstremalpunkter**: der $f'$ skifter fortegn. Regn ut koordinatene.
7. **Krumning**: fortegnslinje for $f''(x)$ – der $f'' > 0$ krummer grafen **opp** (konveks, «smiler»), der $f'' < 0$ krummer den **ned** (konkav).
8. **Vendepunkter**: der $f''$ skifter fortegn. Der er stigningen størst eller minst.
9. **Skisse**: sett alt sammen.

### Regneeksempel
$f(x) = x^3 - 6x^2 + 9x$.
- $f(x) = x(x - 3)^2$: nullpunkter $x = 0$ og $x = 3$ (dobbelt – grafen tangerer aksen).
- $f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$. Positiv for $x < 1$ og $x > 3$, negativ mellom. **Toppunkt** $(1, 4)$, **bunnpunkt** $(3, 0)$.
- $f''(x) = 6x - 12$, null for $x = 2$ og skifter fortegn: **vendepunkt** $(2, 2)$. Grafen krummer ned for $x < 2$ og opp for $x > 2$.

## Den deriverte og grafen – sammenhengen
- Der $f$ har topp eller bunn, krysser $f'$ $x$-aksen.
- Der $f$ har vendepunkt, har $f'$ topp eller bunn.
- Å skissere grafen til $f'$ ut fra grafen til $f$ (og omvendt) er en vanlig eksamensoppgave.

## Vanlige feil
- Å kalle et punkt der $f'(x) = 0$ for ekstremalpunkt uten at $f'$ skifter fortegn (terrassepunkt, som for $x^3$ i origo).
- Å glemme å regne ut $y$-koordinaten.
- Å blande opp krummer opp (smil, $f'' > 0$) og ned.`,
`## What does it mean to analyse a function?
To **analyse** a function is to find and explain all its important features – ideally so well you could sketch it without aids.

## Checklist
1. **Domain**: where is the function defined? (Denominator ≠ 0, logs of positive numbers, no roots of negatives.)
2. **Zeros**: solve $f(x) = 0$.
3. **y-intercept**: $f(0)$.
4. **Asymptotes**: vertical where the denominator is zero (and the numerator isn't), horizontal or oblique as $x \\to \\pm\\infty$.
5. **Monotonicity**: a sign chart for $f'(x)$ – where is $f$ increasing and decreasing?
6. **Turning points**: where $f'$ changes sign. Compute the coordinates.
7. **Concavity**: a sign chart for $f''(x)$ – where $f'' > 0$ the graph curves **up** (convex, 'smiles'), where $f'' < 0$ it curves **down** (concave).
8. **Inflection points**: where $f''$ changes sign. There the gradient is greatest or least.
9. **Sketch**: put it all together.

### Worked example
$f(x) = x^3 - 6x^2 + 9x$.
- $f(x) = x(x - 3)^2$: zeros $x = 0$ and $x = 3$ (double – the graph touches the axis).
- $f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$. Positive for $x < 1$ and $x > 3$, negative between. **Maximum** $(1, 4)$, **minimum** $(3, 0)$.
- $f''(x) = 6x - 12$, zero at $x = 2$ and changes sign: **inflection point** $(2, 2)$. The graph curves down for $x < 2$ and up for $x > 2$.

## The derivative and the graph
- Where $f$ has a max or min, $f'$ crosses the $x$-axis.
- Where $f$ has an inflection point, $f'$ has a max or min.
- Sketching $f'$ from the graph of $f$ (and vice versa) is a common exam task.

## Common mistakes
- Calling a point with $f'(x) = 0$ a turning point without $f'$ changing sign (a stationary inflection, as for $x^3$ at the origin).
- Forgetting to compute the $y$-coordinate.
- Mixing up curving up (smile, $f'' > 0$) and down.`);

M("VGR1", "Vektorer i planet",
`## Hva er en vektor?
En **vektor** har både **lengde** og **retning**, og tegnes som en pil. Forflytning, fart og kraft er vektorer. To vektorer er **like** hvis de har samme lengde og retning – uansett hvor de er tegnet.

## Vektorer i koordinatsystem
En vektor skrives med koordinater: $\\vec a = [a_1, a_2]$. Vektoren fra punktet $A(x_1, y_1)$ til $B(x_2, y_2)$ er
$$\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1]$$
«Slutt minus start».
- **Lengde**: $|\\vec a| = \\sqrt{a_1^2 + a_2^2}$.
- **Sum og differanse**: komponentvis. $[2, 3] + [4, -1] = [6, 2]$. Geometrisk: sett vektorene etter hverandre (**trekantregelen**).
- **Skalering**: $t\\cdot\\vec a$ forlenger (eller snur, hvis $t < 0$) vektoren.

## Parallelle vektorer
$\\vec a$ og $\\vec b$ er **parallelle** hvis $\\vec a = t\\cdot\\vec b$ for et tall $t$. Tre punkter $A$, $B$ og $C$ ligger på **linje** hvis $\\overrightarrow{AB}$ og $\\overrightarrow{AC}$ er parallelle.

## Skalarproduktet
$$\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 = |\\vec a|\\,|\\vec b|\\cos v$$
der $v$ er vinkelen mellom vektorene. Bruk:
- **Vinkel** mellom vektorer: $\\cos v = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}$.
- **Ortogonalitet**: $\\vec a\\perp\\vec b \\iff \\vec a\\cdot\\vec b = 0$ (fordi $\\cos 90° = 0$).
- I fysikken er **arbeid** $W = \\vec F\\cdot\\vec s$.

### Regneeksempel
Er trekanten med hjørner $A(1, 1)$, $B(4, 2)$ og $C(2, 4)$ rettvinklet i $A$? $\\overrightarrow{AB} = [3, 1]$ og $\\overrightarrow{AC} = [1, 3]$. Skalarproduktet er $3\\cdot 1 + 1\\cdot 3 = 6 \\ne 0$, så **nei**. Vinkelen: $\\cos v = \\tfrac{6}{\\sqrt{10}\\sqrt{10}} = 0{,}6$, $v \\approx 53{,}1°$.

## Vektorer i praksis
Vektorer gjør geometri til regning: midtpunkter ($\\vec{OM} = \\tfrac12(\\vec{OA} + \\vec{OB})$), parallellogrammer, og bevegelse. I fysikk legger vi sammen krefter og farter som vektorer – for eksempel et fly med sidevind.

## Vanlige feil
- «Start minus slutt» i stedet for «slutt minus start».
- Å tro at skalarproduktet er en vektor – det er et **tall**.
- Å glemme at nullvektoren er parallell med alle vektorer.`,
`## What is a vector?
A **vector** has both **length** and **direction**, drawn as an arrow. Displacement, velocity and force are vectors. Two vectors are **equal** if they have the same length and direction – wherever they are drawn.

## Vectors in coordinates
A vector is written with coordinates: $\\vec a = [a_1, a_2]$. The vector from $A(x_1, y_1)$ to $B(x_2, y_2)$ is
$$\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1]$$
'End minus start'.
- **Length**: $|\\vec a| = \\sqrt{a_1^2 + a_2^2}$.
- **Sum and difference**: component-wise. $[2, 3] + [4, -1] = [6, 2]$. Geometrically: place the vectors head to tail (**triangle rule**).
- **Scaling**: $t\\cdot\\vec a$ lengthens (or reverses, if $t < 0$) the vector.

## Parallel vectors
$\\vec a$ and $\\vec b$ are **parallel** if $\\vec a = t\\cdot\\vec b$ for some number $t$. Three points $A$, $B$ and $C$ are **collinear** if $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel.

## The dot product
$$\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 = |\\vec a|\\,|\\vec b|\\cos v$$
where $v$ is the angle between the vectors. Uses:
- **Angle** between vectors: $\\cos v = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}$.
- **Orthogonality**: $\\vec a\\perp\\vec b \\iff \\vec a\\cdot\\vec b = 0$ (since $\\cos 90° = 0$).
- In physics, **work** is $W = \\vec F\\cdot\\vec s$.

### Worked example
Is the triangle with vertices $A(1, 1)$, $B(4, 2)$ and $C(2, 4)$ right-angled at $A$? $\\overrightarrow{AB} = [3, 1]$ and $\\overrightarrow{AC} = [1, 3]$. The dot product is $3\\cdot 1 + 1\\cdot 3 = 6 \\ne 0$, so **no**. The angle: $\\cos v = \\tfrac{6}{\\sqrt{10}\\sqrt{10}} = 0.6$, $v \\approx 53.1°$.

## Vectors in practice
Vectors turn geometry into calculation: midpoints ($\\vec{OM} = \\tfrac12(\\vec{OA} + \\vec{OB})$), parallelograms and motion. In physics we add forces and velocities as vectors – e.g. a plane with a crosswind.

## Common mistakes
- 'Start minus end' instead of 'end minus start'.
- Thinking the dot product is a vector – it's a **number**.
- Forgetting that the zero vector is parallel to every vector.`);

M("VGR1", "Sannsynlighet og kombinatorikk",
`## Kombinatorikk – å telle smart
Mange sannsynlighetsoppgaver handler om å **telle** antall mulige utfall. Det avgjørende er to spørsmål: **Har rekkefølgen betydning?** og **Kan det samme velges flere ganger (med tilbakelegging)?**

## Multiplikasjonsprinsippet
Har du 3 bukser og 4 gensere, kan du kle deg på $3\\cdot 4 = 12$ måter. Generelt: valg som gjøres etter hverandre, **ganges**.

## De fire situasjonene
- **Ordnet, med tilbakelegging**: $n^r$. En PIN-kode med 4 siffer: $10^4 = 10\\,000$.
- **Ordnet, uten tilbakelegging** (**permutasjoner**): $\\dfrac{n!}{(n-r)!}$. Gull, sølv og bronse blant 8 løpere: $8\\cdot 7\\cdot 6 = 336$. Alle $n$ i rekkefølge: $n!$ (**fakultet**).
- **Uordnet, uten tilbakelegging** (**kombinasjoner**):
$$\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}$$
Velg 3 elever av 25 til en komité: $\\binom{25}{3} = 2300$. Lotto (7 av 34): $\\binom{34}{7} = 5\\,379\\,616$.
- **Uordnet, med tilbakelegging**: brukes sjeldnere i skolen.

## Sannsynlighet med kombinatorikk
Når alle utfall er like sannsynlige: $P = \\dfrac{\\text{gunstige}}{\\text{mulige}}$, der begge telles med kombinatorikk.

### Regneeksempel
En klasse har 12 jenter og 8 gutter. Tre trekkes tilfeldig. Hva er sannsynligheten for nøyaktig 2 jenter?
$$P = \\frac{\\binom{12}{2}\\binom{8}{1}}{\\binom{20}{3}} = \\frac{66\\cdot 8}{1140} \\approx 0{,}463$$

## Betinget sannsynlighet og Bayes
- **Betinget sannsynlighet**: $P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}$ – sannsynligheten for A **gitt** at B har skjedd.
- **Uavhengige** hendelser: $P(A\\cap B) = P(A)\\cdot P(B)$, eller $P(A\\mid B) = P(A)$.
- **Total sannsynlighet**: $P(B) = P(B\\mid A)P(A) + P(B\\mid\\bar A)P(\\bar A)$.
- **Bayes' setning**: $P(A\\mid B) = \\dfrac{P(B\\mid A)\\,P(A)}{P(B)}$.

### Regneeksempel: medisinsk test
En sykdom rammer 1 % av befolkningen. En test er positiv hos 95 % av de syke, men også hos 5 % av de friske. Du tester positivt – hvor sannsynlig er det at du er syk?
$$P(S\\mid +) = \\frac{0{,}95\\cdot 0{,}01}{0{,}95\\cdot 0{,}01 + 0{,}05\\cdot 0{,}99} \\approx 0{,}16$$
Bare **16 %**! Fordi sykdommen er sjelden, er de fleste positive tester falske. Dette er grunnen til at screening alltid følges opp med flere tester.

## Vanlige feil
- Å bruke permutasjoner når rekkefølgen ikke betyr noe (eller omvendt).
- Å blande $P(A\\mid B)$ og $P(B\\mid A)$.
- Å tro at hendelser som ikke kan skje samtidig, er uavhengige – de er det motsatte.`,
`## Combinatorics – counting cleverly
Many probability problems are about **counting** possible outcomes. Two questions are key: **does order matter?** and **can the same item be chosen again (with replacement)?**

## The multiplication principle
With 3 pairs of trousers and 4 jumpers you can dress in $3\\cdot 4 = 12$ ways. In general, choices made in sequence are **multiplied**.

## The four situations
- **Ordered, with replacement**: $n^r$. A 4-digit PIN: $10^4 = 10,000$.
- **Ordered, without replacement** (**permutations**): $\\dfrac{n!}{(n-r)!}$. Gold, silver and bronze among 8 runners: $8\\cdot 7\\cdot 6 = 336$. All $n$ in order: $n!$ (**factorial**).
- **Unordered, without replacement** (**combinations**):
$$\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}$$
Choose 3 of 25 pupils for a committee: $\\binom{25}{3} = 2300$. Lotto (7 of 34): $\\binom{34}{7} = 5,379,616$.
- **Unordered, with replacement**: less common at school.

## Probability with combinatorics
When all outcomes are equally likely: $P = \\dfrac{\\text{favourable}}{\\text{possible}}$, both counted with combinatorics.

### Worked example
A class has 12 girls and 8 boys. Three are drawn at random. What is the probability of exactly 2 girls?
$$P = \\frac{\\binom{12}{2}\\binom{8}{1}}{\\binom{20}{3}} = \\frac{66\\cdot 8}{1140} \\approx 0.463$$

## Conditional probability and Bayes
- **Conditional probability**: $P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}$ – the probability of A **given** B has happened.
- **Independent** events: $P(A\\cap B) = P(A)\\cdot P(B)$, or $P(A\\mid B) = P(A)$.
- **Total probability**: $P(B) = P(B\\mid A)P(A) + P(B\\mid\\bar A)P(\\bar A)$.
- **Bayes' theorem**: $P(A\\mid B) = \\dfrac{P(B\\mid A)\\,P(A)}{P(B)}$.

### Worked example: medical test
A disease affects 1% of the population. A test is positive in 95% of the sick but also in 5% of the healthy. You test positive – how likely is it that you are ill?
$$P(S\\mid +) = \\frac{0.95\\cdot 0.01}{0.95\\cdot 0.01 + 0.05\\cdot 0.99} \\approx 0.16$$
Only **16%**! Because the disease is rare, most positive tests are false. That's why screening is always followed up with further tests.

## Common mistakes
- Using permutations when order doesn't matter (or vice versa).
- Mixing up $P(A\\mid B)$ and $P(B\\mid A)$.
- Thinking mutually exclusive events are independent – they're the opposite.`);

M("VGR1", "Grenseverdier og kontinuitet",
`## Grenseverdier
$\\lim\\limits_{x \\to a} f(x) = L$ betyr at $f(x)$ kommer **så nær $L$ vi vil** når $x$ kommer nær nok $a$ – uansett om $f(a)$ finnes. Grenseverdien handler om hva som skjer **rundt** punktet, ikke **i** det.

## Slik regner du ut grenseverdier
1. **Sett inn** $x = a$. Gir det et tall, er det svaret (for «snille» funksjoner).
2. Får du **$\\tfrac{0}{0}$**: faktoriser og forkort.
$$\\lim_{x \\to 2}\\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2}\\frac{(x-2)(x+2)}{x - 2} = \\lim_{x \\to 2}(x + 2) = 4$$
3. Får du **$\\tfrac{\\text{tall}}{0}$**: grenseverdien finnes ikke (grafen har en **vertikal asymptote**). Se på ensidige grenser.
4. **Når $x \\to \\infty$**: del teller og nevner på den høyeste potensen av $x$.
$$\\lim_{x \\to \\infty}\\frac{3x^2 + 1}{x^2 - 5} = \\lim_{x \\to \\infty}\\frac{3 + 1/x^2}{1 - 5/x^2} = 3$$
Grafen har da en **horisontal asymptote** $y = 3$.

## Ensidige grenseverdier
$\\lim\\limits_{x \\to a^-}$ (fra venstre) og $\\lim\\limits_{x \\to a^+}$ (fra høyre). Grenseverdien **eksisterer** bare hvis de to er like. For $f(x) = \\tfrac1x$ er $\\lim_{x\\to 0^+} = +\\infty$ og $\\lim_{x\\to 0^-} = -\\infty$.

## Kontinuitet
En funksjon er **kontinuerlig** i $x = a$ hvis
1. $f(a)$ er definert,
2. $\\lim\\limits_{x \\to a} f(x)$ eksisterer, og
3. de to er **like**.
Grovt sagt: du kan tegne grafen uten å løfte blyanten. Polynomer, eksponential- og logaritmefunksjoner er kontinuerlige der de er definert. **Delt definerte funksjoner** må sjekkes i skjøtene.

### Regneeksempel
$f(x) = \\begin{cases} x^2 + 1, & x < 1 \\\\ ax, & x \\ge 1 \\end{cases}$. For hvilken $a$ er $f$ kontinuerlig? Venstre grense: $1 + 1 = 2$. Høyre: $a\\cdot 1 = a$. Kontinuerlig når $a = 2$.

## Deriverbarhet
En funksjon som er **deriverbar** i et punkt, er også kontinuerlig der – men ikke omvendt. $f(x) = |x|$ er kontinuerlig i 0, men har en **knekk**, så den er ikke deriverbar der. Den deriverte er selv definert som en grenseverdi:
$$f'(x) = \\lim_{h \\to 0}\\frac{f(x+h) - f(x)}{h}$$

## Tallet e
Den naturlige konstanten **e** er også en grenseverdi: $e = \\lim\\limits_{n \\to \\infty}\\left(1 + \\tfrac1n\\right)^n \\approx 2{,}718$ – det du får hvis renten legges til «uendelig ofte».`,
`## Limits
$\\lim\\limits_{x \\to a} f(x) = L$ means $f(x)$ gets **as close to $L$ as we like** when $x$ is close enough to $a$ – whether or not $f(a)$ exists. The limit is about what happens **around** the point, not **at** it.

## How to evaluate limits
1. **Substitute** $x = a$. If that gives a number, that's the answer (for 'nice' functions).
2. If you get **$\\tfrac{0}{0}$**: factorise and cancel.
$$\\lim_{x \\to 2}\\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2}\\frac{(x-2)(x+2)}{x - 2} = \\lim_{x \\to 2}(x + 2) = 4$$
3. If you get **$\\tfrac{\\text{number}}{0}$**: the limit doesn't exist (the graph has a **vertical asymptote**). Look at one-sided limits.
4. **As $x \\to \\infty$**: divide numerator and denominator by the highest power of $x$.
$$\\lim_{x \\to \\infty}\\frac{3x^2 + 1}{x^2 - 5} = \\lim_{x \\to \\infty}\\frac{3 + 1/x^2}{1 - 5/x^2} = 3$$
The graph then has a **horizontal asymptote** $y = 3$.

## One-sided limits
$\\lim\\limits_{x \\to a^-}$ (from the left) and $\\lim\\limits_{x \\to a^+}$ (from the right). The limit **exists** only if they are equal. For $f(x) = \\tfrac1x$, $\\lim_{x\\to 0^+} = +\\infty$ and $\\lim_{x\\to 0^-} = -\\infty$.

## Continuity
A function is **continuous** at $x = a$ if
1. $f(a)$ is defined,
2. $\\lim\\limits_{x \\to a} f(x)$ exists, and
3. the two are **equal**.
Roughly: you can draw the graph without lifting your pencil. Polynomials, exponential and logarithmic functions are continuous where defined. **Piecewise functions** must be checked at the joins.

### Worked example
$f(x) = \\begin{cases} x^2 + 1, & x < 1 \\\\ ax, & x \\ge 1 \\end{cases}$. For which $a$ is $f$ continuous? Left limit: $1 + 1 = 2$. Right: $a\\cdot 1 = a$. Continuous when $a = 2$.

## Differentiability
A function **differentiable** at a point is also continuous there – but not vice versa. $f(x) = |x|$ is continuous at 0 but has a **corner**, so it isn't differentiable there. The derivative is itself defined as a limit:
$$f'(x) = \\lim_{h \\to 0}\\frac{f(x+h) - f(x)}{h}$$

## The number e
The natural constant **e** is also a limit: $e = \\lim\\limits_{n \\to \\infty}\\left(1 + \\tfrac1n\\right)^n \\approx 2.718$ – what you get if interest is added 'infinitely often'.`);

M("VGR1", "Parameterframstillinger",
`## Hva er en parameterframstilling?
I stedet for å beskrive en kurve med $y = f(x)$, kan vi la både $x$ og $y$ avhenge av en tredje variabel, **parameteren** $t$ (ofte tid):
$$\\ell: \\begin{cases} x = x(t) \\\\ y = y(t) \\end{cases}$$
Da beskriver vi **hvor** et punkt er **når**. Det gjør det mulig å beskrive kurver som ikke er funksjoner, som sirkler og løkker.

## Rette linjer
Linja gjennom punktet $P(x_0, y_0)$ med **retningsvektor** $\\vec r = [a, b]$:
$$\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\end{cases}$$
Linja gjennom $A(1, 2)$ og $B(4, 6)$: retningsvektor $\\overrightarrow{AB} = [3, 4]$, så $x = 1 + 3t$, $y = 2 + 4t$. Ved $t = 0$ er vi i $A$, ved $t = 1$ i $B$.

## Sirkler og andre kurver
- **Sirkel** med sentrum $(a, b)$ og radius $r$: $x = a + r\\cos t$, $y = b + r\\sin t$, $t \\in [0, 2\\pi\\rangle$.
- **Kast**: $x = v_0\\cos\\alpha\\cdot t$, $y = v_0\\sin\\alpha\\cdot t - \\tfrac12 gt^2$ – bevegelsen i fysikk.
- Kurver som **sykloiden** (banen til et punkt på et rullende hjul).

## Fartsvektor og fart
Den deriverte av posisjonsvektoren er **fartsvektoren**:
$$\\vec v(t) = [x'(t),\\ y'(t)]$$
Den peker langs **tangenten** til kurven. **Farten** (banefarten) er lengden: $|\\vec v| = \\sqrt{x'(t)^2 + y'(t)^2}$. Den andrederiverte gir **akselerasjonsvektoren** $\\vec a(t) = [x''(t), y''(t)]$.

### Regneeksempel
En båt beveger seg etter $x = 2t$, $y = 10 - t^2$ (km, timer).
- Fartsvektor: $\\vec v = [2, -2t]$. Etter 2 timer: $[2, -4]$, og farten er $\\sqrt{4 + 16} \\approx 4{,}5$ km/h.
- Når krysser båten $x$-aksen ($y = 0$)? $10 - t^2 = 0$ gir $t = \\sqrt{10} \\approx 3{,}16$ timer, og da er $x \\approx 6{,}3$ km.

## Skjæringspunkter
- **Kurve mot akse**: sett $x(t) = 0$ eller $y(t) = 0$.
- **To linjer**: bruk **ulike parametere** ($t$ og $s$), sett $x$-ene og $y$-ene like, og løs likningssettet.
- **Kollisjon** mellom to bevegelser: samme punkt på **samme tid** – da må parameteren være lik.

## Vanlige feil
- Å bruke samme parameter for to ulike linjer når du leter etter skjæringspunkt.
- Å blande **skjæring** (samme sted) og **kollisjon** (samme sted samtidig).
- Å glemme at fartsvektorens retning er tangentens retning.`,
`## What is a parametric representation?
Instead of describing a curve by $y = f(x)$, we can let both $x$ and $y$ depend on a third variable, the **parameter** $t$ (often time):
$$\\ell: \\begin{cases} x = x(t) \\\\ y = y(t) \\end{cases}$$
Then we describe **where** a point is **when**. This lets us describe curves that aren't functions, such as circles and loops.

## Straight lines
The line through $P(x_0, y_0)$ with **direction vector** $\\vec r = [a, b]$:
$$\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\end{cases}$$
The line through $A(1, 2)$ and $B(4, 6)$: direction vector $\\overrightarrow{AB} = [3, 4]$, so $x = 1 + 3t$, $y = 2 + 4t$. At $t = 0$ we're at $A$, at $t = 1$ at $B$.

## Circles and other curves
- **Circle** with centre $(a, b)$ and radius $r$: $x = a + r\\cos t$, $y = b + r\\sin t$, $t \\in [0, 2\\pi)$.
- **Projectile**: $x = v_0\\cos\\alpha\\cdot t$, $y = v_0\\sin\\alpha\\cdot t - \\tfrac12 gt^2$ – motion in physics.
- Curves like the **cycloid** (the path of a point on a rolling wheel).

## Velocity vector and speed
The derivative of the position vector is the **velocity vector**:
$$\\vec v(t) = [x'(t),\\ y'(t)]$$
It points along the **tangent** to the curve. The **speed** is its length: $|\\vec v| = \\sqrt{x'(t)^2 + y'(t)^2}$. The second derivative gives the **acceleration vector** $\\vec a(t) = [x''(t), y''(t)]$.

### Worked example
A boat moves along $x = 2t$, $y = 10 - t^2$ (km, hours).
- Velocity: $\\vec v = [2, -2t]$. After 2 hours: $[2, -4]$, and the speed is $\\sqrt{4 + 16} \\approx 4.5$ km/h.
- When does it cross the $x$-axis ($y = 0$)? $10 - t^2 = 0$ gives $t = \\sqrt{10} \\approx 3.16$ hours, at $x \\approx 6.3$ km.

## Intersections
- **Curve and axis**: set $x(t) = 0$ or $y(t) = 0$.
- **Two lines**: use **different parameters** ($t$ and $s$), set the $x$s and $y$s equal, and solve the system.
- **Collision** between two motions: the same point at the **same time** – so the parameter must be equal.

## Common mistakes
- Using the same parameter for two different lines when finding an intersection.
- Mixing up **intersection** (same place) and **collision** (same place at the same time).
- Forgetting that the velocity vector points along the tangent.`);

M("VGR1", "Logikk og bevis",
`## Utsagn og logiske symboler
Et **utsagn** er en påstand som er enten sann eller usann. Vi kobler utsagn med:
- **Implikasjon** $P \\Rightarrow Q$: «hvis $P$, så $Q$». $x = 2 \\Rightarrow x^2 = 4$ er sant, men $x^2 = 4 \\Rightarrow x = 2$ er usant ($x$ kan være $-2$).
- **Ekvivalens** $P \\Leftrightarrow Q$: begge veier gjelder. $x + 3 = 5 \\Leftrightarrow x = 2$.
- **Og** ($\\land$), **eller** ($\\lor$) og **ikke** ($\\neg$).
I likningsløsning er det viktig å vite om stegene er **ekvivalente**: kvadrering er en implikasjon, ikke en ekvivalens – derfor kan du få **falske løsninger** og må sette prøve.

## Hvorfor bevis?
Mange eksempler beviser ingenting: at noe stemmer for 1000 tall, betyr ikke at det stemmer for alle. Et **matematisk bevis** viser med logiske slutninger fra kjente sannheter at en påstand **alltid** er sann. Ett **moteksempel** er nok til å vise at en påstand er **usann**.

## Bevistyper
- **Direkte bevis**: gå fra antakelsene til konklusjonen.
  *Påstand*: Summen av to oddetall er et partall. *Bevis*: Oddetall kan skrives $2m + 1$ og $2n + 1$. Summen er $2m + 2n + 2 = 2(m + n + 1)$, som er et partall. ∎
- **Kontrapositivt bevis**: $P \\Rightarrow Q$ er det samme som $\\neg Q \\Rightarrow \\neg P$. Vil du vise «hvis $n^2$ er et partall, så er $n$ et partall», kan du vise at hvis $n$ er et oddetall, er $n^2$ et oddetall.
- **Motsigelsesbevis** (indirekte bevis): anta at påstanden er **usann**, og vis at det fører til en **selvmotsigelse**.
  *Påstand*: $\\sqrt 2$ er irrasjonal. *Bevis*: Anta $\\sqrt 2 = \\tfrac{p}{q}$ forkortet så langt som mulig. Da er $p^2 = 2q^2$, så $p$ er et partall: $p = 2k$. Da er $4k^2 = 2q^2$, så $q^2 = 2k^2$, og også $q$ er et partall. Men da kunne brøken forkortes – en motsigelse. ∎
- **Induksjonsbevis** (R2): for påstander om alle naturlige tall.

## Kjente bevis det er verdt å kunne
- **Pytagoras' setning**, med flere hundre kjente bevis.
- At det finnes **uendelig mange primtall** (Euklid): anta at det finnes et største primtall, gang alle primtallene sammen og legg til 1 – det nye tallet er ikke delelig med noen av dem.
- Formelen for **summen av en aritmetisk rekke**.

## Skriv et godt bevis
Skriv tydelig hva du **antar**, hva du skal **vise**, og begrunn **hvert steg**. Avslutt med ∎ eller «q.e.d.» (*quod erat demonstrandum* – «som skulle bevises»).

## Vanlige feil
- Å bruke eksempler som «bevis».
- Å forveksle $P \\Rightarrow Q$ med den **omvendte** $Q \\Rightarrow P$.
- Å starte med det man skal bevise og regne seg fram til noe sant (det beviser ingenting).`,
`## Statements and logical symbols
A **statement** is a claim that is either true or false. We link statements with:
- **Implication** $P \\Rightarrow Q$: 'if $P$, then $Q$'. $x = 2 \\Rightarrow x^2 = 4$ is true, but $x^2 = 4 \\Rightarrow x = 2$ is false ($x$ could be $-2$).
- **Equivalence** $P \\Leftrightarrow Q$: both directions hold. $x + 3 = 5 \\Leftrightarrow x = 2$.
- **And** ($\\land$), **or** ($\\lor$) and **not** ($\\neg$).
When solving equations it matters whether steps are **equivalent**: squaring is an implication, not an equivalence – that's why you can get **false solutions** and must check.

## Why prove?
Many examples prove nothing: that something holds for 1000 numbers doesn't mean it holds for all. A **mathematical proof** shows by logical steps from known truths that a claim is **always** true. A single **counterexample** is enough to show a claim is **false**.

## Types of proof
- **Direct proof**: go from the assumptions to the conclusion.
  *Claim*: the sum of two odd numbers is even. *Proof*: odd numbers can be written $2m + 1$ and $2n + 1$. Their sum is $2m + 2n + 2 = 2(m + n + 1)$, which is even. ∎
- **Proof by contrapositive**: $P \\Rightarrow Q$ is the same as $\\neg Q \\Rightarrow \\neg P$. To show 'if $n^2$ is even then $n$ is even', show that if $n$ is odd, $n^2$ is odd.
- **Proof by contradiction**: assume the claim is **false** and show this leads to a **contradiction**.
  *Claim*: $\\sqrt 2$ is irrational. *Proof*: assume $\\sqrt 2 = \\tfrac{p}{q}$ in lowest terms. Then $p^2 = 2q^2$, so $p$ is even: $p = 2k$. Then $4k^2 = 2q^2$, so $q^2 = 2k^2$, and $q$ is even too. But then the fraction could be reduced – a contradiction. ∎
- **Proof by induction** (R2): for claims about all natural numbers.

## Famous proofs worth knowing
- **Pythagoras' theorem**, with hundreds of known proofs.
- That there are **infinitely many primes** (Euclid): assume there is a largest prime, multiply all primes together and add 1 – the new number isn't divisible by any of them.
- The formula for the **sum of an arithmetic series**.

## Writing a good proof
State clearly what you **assume**, what you must **show**, and justify **every step**. End with ∎ or 'QED' (*quod erat demonstrandum* – 'which was to be shown').

## Common mistakes
- Using examples as 'proof'.
- Confusing $P \\Rightarrow Q$ with its **converse** $Q \\Rightarrow P$.
- Starting from what you want to prove and working to something true (that proves nothing).`);

// ===================== R2 =====================
M("VGR2", "Integrasjon",
`## Integrasjon som det motsatte av derivasjon
En **antiderivert** (stamfunksjon) til $f$ er en funksjon $F$ der $F'(x) = f(x)$. Fordi konstanter forsvinner ved derivasjon, finnes det uendelig mange: det **ubestemte integralet** er
$$\\int f(x)\\,dx = F(x) + C$$
## Grunnleggende integraler
- $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ for $n \\ne -1$
- $\\int \\dfrac1x\\,dx = \\ln|x| + C$
- $\\int e^x\\,dx = e^x + C$ og $\\int e^{kx}\\,dx = \\tfrac1k e^{kx} + C$
- $\\int \\sin x\\,dx = -\\cos x + C$ og $\\int \\cos x\\,dx = \\sin x + C$
Konstanter kan settes utenfor, og integralet av en sum er summen av integralene.

## Det bestemte integralet og areal
Det **bestemte integralet** $\\int_a^b f(x)\\,dx$ er grensen for summen av mange tynne rektangler under grafen (**Riemann-summer**). **Analysens fundamentalteorem** knytter det sammen med antideriverte:
$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$
Når $f(x) \\ge 0$, er integralet **arealet** mellom grafen og $x$-aksen. Ligger grafen **under** aksen, blir integralet negativt – da må du dele opp og ta absoluttverdien for å finne arealet.

### Regneeksempel
$\\int_0^2 (3x^2 + 1)\\,dx = \\big[x^3 + x\\big]_0^2 = (8 + 2) - 0 = 10$.

## Integralet som «samlet endring»
Hvis $f(t)$ er en **vekstfart** (endring per tid), er $\\int_a^b f(t)\\,dt$ den **totale endringen** fra $a$ til $b$:
- Fart $v(t)$ → integralet er **tilbakelagt strekning**.
- Vannføring i en elv (m³/s) → integralet er **vannmengden**.
- Strømforbruk (kW) → integralet er **energien** (kWh).

### Regneeksempel
En bil akselererer med fart $v(t) = 3t$ m/s. Hvor langt kjører den de første 10 sekundene? $\\int_0^{10} 3t\\,dt = \\big[\\tfrac32 t^2\\big]_0^{10} = 150$ m.

## Areal mellom to grafer
$$A = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx$$
der $f$ ligger **over** $g$ på intervallet. Finn skjæringspunktene først – de er ofte grensene.

## Vanlige feil
- Å glemme $+C$ i ubestemte integraler.
- $\\int x^{-1}\\,dx \\ne \\tfrac{x^0}{0}$ – det er $\\ln|x|$.
- Å regne areal som et integral når grafen ligger under $x$-aksen.`,
`## Integration as the reverse of differentiation
An **antiderivative** of $f$ is a function $F$ with $F'(x) = f(x)$. Since constants vanish on differentiation, there are infinitely many: the **indefinite integral** is
$$\\int f(x)\\,dx = F(x) + C$$
## Basic integrals
- $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ for $n \\ne -1$
- $\\int \\dfrac1x\\,dx = \\ln|x| + C$
- $\\int e^x\\,dx = e^x + C$ and $\\int e^{kx}\\,dx = \\tfrac1k e^{kx} + C$
- $\\int \\sin x\\,dx = -\\cos x + C$ and $\\int \\cos x\\,dx = \\sin x + C$
Constants can be taken outside, and the integral of a sum is the sum of the integrals.

## The definite integral and area
The **definite integral** $\\int_a^b f(x)\\,dx$ is the limit of the sum of many thin rectangles under the graph (**Riemann sums**). The **fundamental theorem of calculus** links it to antiderivatives:
$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$
When $f(x) \\ge 0$, the integral is the **area** between the graph and the $x$-axis. If the graph lies **below** the axis, the integral is negative – split it up and take absolute values to find area.

### Worked example
$\\int_0^2 (3x^2 + 1)\\,dx = \\big[x^3 + x\\big]_0^2 = (8 + 2) - 0 = 10$.

## The integral as 'total change'
If $f(t)$ is a **rate** (change per time), $\\int_a^b f(t)\\,dt$ is the **total change** from $a$ to $b$:
- Velocity $v(t)$ → the integral is **distance travelled**.
- River flow (m³/s) → the integral is the **volume of water**.
- Power (kW) → the integral is **energy** (kWh).

### Worked example
A car accelerates with velocity $v(t) = 3t$ m/s. How far does it go in the first 10 seconds? $\\int_0^{10} 3t\\,dt = \\big[\\tfrac32 t^2\\big]_0^{10} = 150$ m.

## Area between two graphs
$$A = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx$$
where $f$ lies **above** $g$ on the interval. Find the intersections first – they're often the limits.

## Common mistakes
- Forgetting $+C$ in indefinite integrals.
- $\\int x^{-1}\\,dx \\ne \\tfrac{x^0}{0}$ – it's $\\ln|x|$.
- Treating an integral as area when the graph is below the $x$-axis.`);

M("VGR2", "Differensiallikninger",
`## Hva er en differensiallikning?
En **differensiallikning** er en likning der den ukjente er en **funksjon**, og der den **deriverte** inngår. Den beskriver hvordan noe **endrer seg**: «veksten er proporsjonal med størrelsen» blir $y' = ky$. Å løse den betyr å finne funksjonen $y(x)$ (eller $y(t)$). En **generell løsning** inneholder en konstant $C$; en **initialbetingelse** (som $y(0) = 100$) gir den **spesielle løsningen**.

## Separable differensiallikninger
Kan skrives $g(y)\\,y' = h(x)$. Fremgangsmåte:
1. Samle alt med $y$ på én side og alt med $x$ på den andre: $g(y)\\,dy = h(x)\\,dx$.
2. Integrer begge sider.
3. Løs for $y$ og bruk initialbetingelsen.

### Regneeksempel: eksponentiell vekst
$y' = 0{,}05y$, $y(0) = 2000$. $\\tfrac{1}{y}dy = 0{,}05\\,dt$ gir $\\ln|y| = 0{,}05t + C$, altså $y = Ae^{0{,}05t}$. Med $y(0) = 2000$ er $y = 2000e^{0{,}05t}$.

## Viktige modeller
- **Eksponentiell vekst/nedgang**: $y' = ky$ gir $y = Ce^{kt}$. Befolkning, renter, radioaktivt henfall.
- **Begrenset vekst**: $y' = k(B - y)$ gir $y = B - Ce^{-kt}$. Veksten avtar jo nærmere grensen $B$ man kommer. Eksempel: **Newtons avkjølingslov** – en kopp kaffe avkjøles mot romtemperaturen.
- **Logistisk vekst**: $y' = ky\\left(1 - \\tfrac{y}{B}\\right)$ gir en S-kurve, $y = \\dfrac{B}{1 + Ce^{-kt}}$. Populasjoner med begrenset mat og plass, og spredning av sykdom og nye produkter. Veksten er størst når $y = \\tfrac{B}{2}$.

### Regneeksempel: avkjøling
Kaffe på 90 °C står i et rom på 20 °C. $T' = -0{,}1(T - 20)$, $T(0) = 90$. Løsning: $T(t) = 20 + 70e^{-0{,}1t}$. Etter 10 minutter: $20 + 70e^{-1} \\approx 46$ °C.

## Lineære førsteordens likninger
$y' + p(x)\\,y = q(x)$ løses med **integrerende faktor** $e^{\\int p\\,dx}$: gang hele likningen med den, så blir venstresiden den deriverte av et produkt.

## Andreordens likninger
$y'' + by' + cy = 0$ beskriver blant annet **svingninger** (fjær, pendel, elektriske kretser). Den **karakteristiske likningen** $r^2 + br + c = 0$ avgjør løsningen: to reelle røtter gir eksponentialfunksjoner, komplekse røtter gir **svingninger** med sinus og cosinus.

## Retningsdiagram
Et **retningsdiagram** viser små piler med stigningstallet $y'$ i mange punkter. Løsningskurvene følger pilene. Det gir et godt bilde av løsningene selv uten formel.`,
`## What is a differential equation?
A **differential equation** is an equation where the unknown is a **function** and its **derivative** appears. It describes how something **changes**: 'growth is proportional to size' becomes $y' = ky$. Solving it means finding the function $y(x)$ (or $y(t)$). A **general solution** contains a constant $C$; an **initial condition** (like $y(0) = 100$) gives the **particular solution**.

## Separable differential equations
Can be written $g(y)\\,y' = h(x)$. Method:
1. Put everything with $y$ on one side and everything with $x$ on the other: $g(y)\\,dy = h(x)\\,dx$.
2. Integrate both sides.
3. Solve for $y$ and apply the initial condition.

### Worked example: exponential growth
$y' = 0.05y$, $y(0) = 2000$. $\\tfrac{1}{y}dy = 0.05\\,dt$ gives $\\ln|y| = 0.05t + C$, so $y = Ae^{0.05t}$. With $y(0) = 2000$, $y = 2000e^{0.05t}$.

## Important models
- **Exponential growth/decay**: $y' = ky$ gives $y = Ce^{kt}$. Population, interest, radioactive decay.
- **Limited growth**: $y' = k(B - y)$ gives $y = B - Ce^{-kt}$. Growth slows as the limit $B$ is approached. Example: **Newton's law of cooling** – a cup of coffee cools towards room temperature.
- **Logistic growth**: $y' = ky\\left(1 - \\tfrac{y}{B}\\right)$ gives an S-curve, $y = \\dfrac{B}{1 + Ce^{-kt}}$. Populations with limited food and space, and the spread of disease and new products. Growth is fastest when $y = \\tfrac{B}{2}$.

### Worked example: cooling
Coffee at 90 °C stands in a room at 20 °C. $T' = -0.1(T - 20)$, $T(0) = 90$. Solution: $T(t) = 20 + 70e^{-0.1t}$. After 10 minutes: $20 + 70e^{-1} \\approx 46$ °C.

## First-order linear equations
$y' + p(x)\\,y = q(x)$ is solved with an **integrating factor** $e^{\\int p\\,dx}$: multiply the whole equation by it, and the left side becomes the derivative of a product.

## Second-order equations
$y'' + by' + cy = 0$ describes **oscillations** among other things (springs, pendulums, electrical circuits). The **characteristic equation** $r^2 + br + c = 0$ decides the solution: two real roots give exponentials, complex roots give **oscillations** with sine and cosine.

## Slope fields
A **slope field** shows small arrows with gradient $y'$ at many points. Solution curves follow the arrows. It gives a good picture of solutions even without a formula.`);

M("VGR2", "Trigonometriske funksjoner",
`## Radianer
I R2 måler vi vinkler i **radianer**: en vinkel på 1 radian gir en bue like lang som radien. En hel sirkel er $2\\pi$ radianer, så
$$180° = \\pi\\ \\text{rad}, \\qquad 90° = \\tfrac{\\pi}{2}, \\qquad 60° = \\tfrac{\\pi}{3}, \\qquad 45° = \\tfrac{\\pi}{4}, \\qquad 30° = \\tfrac{\\pi}{6}$$
Radianer gjør derivasjonsreglene enkle: $(\\sin x)' = \\cos x$ gjelder bare i radianer.

## Enhetssirkelen
For en vinkel $x$ (målt mot klokka fra positiv $x$-akse) er punktet på enhetssirkelen $(\\cos x, \\sin x)$. Herfra følger:
- $\\sin^2 x + \\cos^2 x = 1$ (Pytagoras).
- $\\tan x = \\dfrac{\\sin x}{\\cos x}$.
- **Symmetrier**: $\\sin(\\pi - x) = \\sin x$, $\\cos(-x) = \\cos x$, og så videre.
- Eksakte verdier: $\\sin\\tfrac{\\pi}{6} = \\tfrac12$, $\\cos\\tfrac{\\pi}{4} = \\tfrac{\\sqrt2}{2}$, $\\sin\\tfrac{\\pi}{3} = \\tfrac{\\sqrt3}{2}$.

## Sinusfunksjonen
Den generelle **sinusfunksjonen** er
$$f(x) = A\\sin(cx + \\varphi) + d$$
- $A$ = **amplitude** (halve avstanden fra bunn til topp).
- $d$ = **likevektslinje** (midtverdien).
- $c$ = **vinkelfrekvens**, og **perioden** er $p = \\dfrac{2\\pi}{c}$.
- $\\varphi$ = **faseforskyvning** (forskyvning til siden: $-\\tfrac{\\varphi}{c}$).
Sinusfunksjoner er modeller for alt som **svinger periodisk**: tidevann, temperatur gjennom året, dagslengde, lyd og vekselstrøm.

### Regneeksempel: tidevann
Vannstanden er $h(t) = 1{,}2\\sin(0{,}5t) + 2$ meter, $t$ i timer. Amplitude 1,2 m, likevektslinje 2 m, periode $\\tfrac{2\\pi}{0{,}5} \\approx 12{,}6$ timer. Høyeste vannstand er 3,2 m og laveste 0,8 m.

## Trigonometriske likninger
$\\sin x = 0{,}5$ har **uendelig mange** løsninger: $x = \\tfrac{\\pi}{6} + k\\cdot 2\\pi$ og $x = \\pi - \\tfrac{\\pi}{6} + k\\cdot 2\\pi = \\tfrac{5\\pi}{6} + k\\cdot 2\\pi$. Bruk enhetssirkelen for å finne **begge** løsningene i én periode, og legg til hele perioder. For $\\cos x = a$ er løsningene $\\pm v + k\\cdot 2\\pi$.
Likninger av typen $a\\sin x + b\\cos x = c$ løses ved å skrive venstresiden om til **én** sinusfunksjon.

## Derivasjon og integrasjon
- $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$.
- Med kjerneregelen: $\\big(\\sin(cx)\\big)' = c\\cos(cx)$.
Derfor er $y = A\\sin(\\omega t)$ en løsning av svingelikningen $y'' = -\\omega^2 y$.

## Vanlige feil
- Kalkulatoren står i grader når du regner i radianer (eller omvendt).
- Å finne bare én løsning av $\\sin x = a$ i en periode.
- Å bytte om amplitude og likevektslinje.`,
`## Radians
In R2 we measure angles in **radians**: an angle of 1 radian gives an arc as long as the radius. A full circle is $2\\pi$ radians, so
$$180° = \\pi\\ \\text{rad}, \\qquad 90° = \\tfrac{\\pi}{2}, \\qquad 60° = \\tfrac{\\pi}{3}, \\qquad 45° = \\tfrac{\\pi}{4}, \\qquad 30° = \\tfrac{\\pi}{6}$$
Radians make the derivative rules simple: $(\\sin x)' = \\cos x$ only holds in radians.

## The unit circle
For an angle $x$ (measured anticlockwise from the positive $x$-axis) the point on the unit circle is $(\\cos x, \\sin x)$. It follows that:
- $\\sin^2 x + \\cos^2 x = 1$ (Pythagoras).
- $\\tan x = \\dfrac{\\sin x}{\\cos x}$.
- **Symmetries**: $\\sin(\\pi - x) = \\sin x$, $\\cos(-x) = \\cos x$, and so on.
- Exact values: $\\sin\\tfrac{\\pi}{6} = \\tfrac12$, $\\cos\\tfrac{\\pi}{4} = \\tfrac{\\sqrt2}{2}$, $\\sin\\tfrac{\\pi}{3} = \\tfrac{\\sqrt3}{2}$.

## The sine function
The general **sine function** is
$$f(x) = A\\sin(cx + \\varphi) + d$$
- $A$ = **amplitude** (half the distance from trough to peak).
- $d$ = **equilibrium line** (the middle value).
- $c$ = **angular frequency**, and the **period** is $p = \\dfrac{2\\pi}{c}$.
- $\\varphi$ = **phase shift** (horizontal shift: $-\\tfrac{\\varphi}{c}$).
Sine functions model anything that **oscillates periodically**: tides, temperature through the year, day length, sound and alternating current.

### Worked example: tides
The water level is $h(t) = 1.2\\sin(0.5t) + 2$ metres, $t$ in hours. Amplitude 1.2 m, equilibrium 2 m, period $\\tfrac{2\\pi}{0.5} \\approx 12.6$ hours. The highest level is 3.2 m and the lowest 0.8 m.

## Trigonometric equations
$\\sin x = 0.5$ has **infinitely many** solutions: $x = \\tfrac{\\pi}{6} + k\\cdot 2\\pi$ and $x = \\pi - \\tfrac{\\pi}{6} + k\\cdot 2\\pi = \\tfrac{5\\pi}{6} + k\\cdot 2\\pi$. Use the unit circle to find **both** solutions in one period and add whole periods. For $\\cos x = a$ the solutions are $\\pm v + k\\cdot 2\\pi$.
Equations like $a\\sin x + b\\cos x = c$ are solved by rewriting the left side as **one** sine function.

## Differentiation and integration
- $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$.
- With the chain rule: $\\big(\\sin(cx)\\big)' = c\\cos(cx)$.
So $y = A\\sin(\\omega t)$ solves the oscillation equation $y'' = -\\omega^2 y$.

## Common mistakes
- The calculator is in degrees when you're working in radians (or vice versa).
- Finding only one solution of $\\sin x = a$ in a period.
- Swapping amplitude and equilibrium line.`);

M("VGR2", "Vektorer i rommet",
`## Tre dimensjoner
I rommet har vi tre akser, $x$, $y$ og $z$, og vektorer får tre koordinater: $\\vec a = [a_1, a_2, a_3]$. Det meste fra planet gjelder fortsatt:
- $\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1,\\ z_2 - z_1]$.
- **Lengde**: $|\\vec a| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$.
- **Skalarprodukt**: $\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec a|\\,|\\vec b|\\cos v$. Null betyr at vektorene står **vinkelrett** på hverandre.

## Vektorproduktet (kryssproduktet)
Nytt i rommet er **vektorproduktet**, som gir en **vektor**:
$$\\vec a\\times\\vec b = [a_2b_3 - a_3b_2,\\ a_3b_1 - a_1b_3,\\ a_1b_2 - a_2b_1]$$
Egenskaper:
- $\\vec a\\times\\vec b$ står **vinkelrett** på både $\\vec a$ og $\\vec b$. Retningen følger **høyrehåndsregelen**.
- Lengden er $|\\vec a|\\,|\\vec b|\\sin v$ – **arealet av parallellogrammet** utspent av vektorene.
- $\\vec a\\times\\vec b = -\\,\\vec b\\times\\vec a$ (rekkefølgen betyr noe).
- $\\vec a\\times\\vec b = \\vec 0$ hvis vektorene er **parallelle**.

## Areal og volum
- **Areal av trekant** $ABC$: $\\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.
- **Volum av parallellepiped** utspent av $\\vec a$, $\\vec b$, $\\vec c$: $|(\\vec a\\times\\vec b)\\cdot\\vec c|$.
- **Volum av pyramide (tetraeder)**: $\\tfrac16|(\\vec a\\times\\vec b)\\cdot\\vec c|$.

### Regneeksempel
$A(1, 0, 0)$, $B(0, 2, 0)$ og $C(0, 0, 3)$. $\\overrightarrow{AB} = [-1, 2, 0]$ og $\\overrightarrow{AC} = [-1, 0, 3]$.
$$\\overrightarrow{AB}\\times\\overrightarrow{AC} = [2\\cdot 3 - 0,\\ 0 - (-1)\\cdot 3,\\ 0 - 2\\cdot(-1)] = [6, 3, 2]$$
Arealet av trekanten er $\\tfrac12\\sqrt{36 + 9 + 4} = \\tfrac72 = 3{,}5$. Tetraederet med origo har volum $\\tfrac16|[6, 3, 2]\\cdot[1, 0, 0]| = 1$.

## Kuler
En **kule** med sentrum $S(a, b, c)$ og radius $r$ har likningen
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$$
Finn sentrum og radius ved å **fullføre kvadratene**.

## Vanlige feil
- Å bytte om rekkefølgen i vektorproduktet (gir motsatt fortegn).
- Å glemme at skalarproduktet er et tall og vektorproduktet en vektor.
- Fortegnsfeil i den midterste komponenten av vektorproduktet.`,
`## Three dimensions
In space we have three axes, $x$, $y$ and $z$, and vectors get three coordinates: $\\vec a = [a_1, a_2, a_3]$. Most things from the plane still hold:
- $\\overrightarrow{AB} = [x_2 - x_1,\\ y_2 - y_1,\\ z_2 - z_1]$.
- **Length**: $|\\vec a| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$.
- **Dot product**: $\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec a|\\,|\\vec b|\\cos v$. Zero means the vectors are **perpendicular**.

## The cross product
New in space is the **cross product**, which gives a **vector**:
$$\\vec a\\times\\vec b = [a_2b_3 - a_3b_2,\\ a_3b_1 - a_1b_3,\\ a_1b_2 - a_2b_1]$$
Properties:
- $\\vec a\\times\\vec b$ is **perpendicular** to both $\\vec a$ and $\\vec b$. Its direction follows the **right-hand rule**.
- Its length is $|\\vec a|\\,|\\vec b|\\sin v$ – the **area of the parallelogram** spanned by the vectors.
- $\\vec a\\times\\vec b = -\\,\\vec b\\times\\vec a$ (order matters).
- $\\vec a\\times\\vec b = \\vec 0$ if the vectors are **parallel**.

## Area and volume
- **Area of triangle** $ABC$: $\\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.
- **Volume of the parallelepiped** spanned by $\\vec a$, $\\vec b$, $\\vec c$: $|(\\vec a\\times\\vec b)\\cdot\\vec c|$.
- **Volume of a pyramid (tetrahedron)**: $\\tfrac16|(\\vec a\\times\\vec b)\\cdot\\vec c|$.

### Worked example
$A(1, 0, 0)$, $B(0, 2, 0)$ and $C(0, 0, 3)$. $\\overrightarrow{AB} = [-1, 2, 0]$ and $\\overrightarrow{AC} = [-1, 0, 3]$.
$$\\overrightarrow{AB}\\times\\overrightarrow{AC} = [2\\cdot 3 - 0,\\ 0 - (-1)\\cdot 3,\\ 0 - 2\\cdot(-1)] = [6, 3, 2]$$
The triangle's area is $\\tfrac12\\sqrt{36 + 9 + 4} = \\tfrac72 = 3.5$. The tetrahedron with the origin has volume $\\tfrac16|[6, 3, 2]\\cdot[1, 0, 0]| = 1$.

## Spheres
A **sphere** with centre $S(a, b, c)$ and radius $r$ has the equation
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$$
Find the centre and radius by **completing the square**.

## Common mistakes
- Swapping the order in the cross product (gives the opposite sign).
- Forgetting that the dot product is a number and the cross product a vector.
- Sign errors in the middle component of the cross product.`);

M("VGR2", "Integrasjonsmetoder",
`## Når de enkle reglene ikke holder
Mange integraler kan ikke løses direkte med grunnformlene. Da bruker vi tre hovedmetoder – og må ofte prøve oss fram.

## Variabelskifte (substitusjon)
Brukes når integranden inneholder en **kjerne** $u$ **og** (omtrent) den deriverte av kjernen. Det er kjerneregelen baklengs.
1. Velg $u$ = kjernen.
2. Regn ut $du = u'\\,dx$.
3. Skriv alt med $u$ og integrer.
4. Sett tilbake $x$ (eller bytt grenser i bestemte integraler).

### Eksempel
$\\int 2x\\,(x^2 + 1)^4\\,dx$. La $u = x^2 + 1$, $du = 2x\\,dx$:
$$\\int u^4\\,du = \\frac{u^5}{5} + C = \\frac{(x^2 + 1)^5}{5} + C$$
Et annet klassisk eksempel: $\\int \\dfrac{2x}{x^2 + 1}\\,dx = \\ln(x^2 + 1) + C$, fordi telleren er den deriverte av nevneren.

## Delvis integrasjon
Produktregelen baklengs:
$$\\int u'v\\,dx = uv - \\int uv'\\,dx$$
Brukes på **produkter** som $x\\,e^x$, $x\\sin x$ og $\\ln x$. Velg $v$ slik at den blir **enklere** når den deriveres (ofte et polynom eller $\\ln x$), og $u'$ som noe du kan integrere.

### Eksempel
$\\int x\\,e^x\\,dx$: la $v = x$ og $u' = e^x$, så $v' = 1$ og $u = e^x$.
$$\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x - 1) + C$$
Med $\\ln x$: $\\int \\ln x\\,dx = \\int 1\\cdot\\ln x\\,dx = x\\ln x - x + C$.

## Delbrøkoppspalting
For **rasjonale funksjoner** der nevneren kan faktoriseres:
$$\\frac{1}{x^2 - 1} = \\frac{1}{(x - 1)(x + 1)} = \\frac{A}{x - 1} + \\frac{B}{x + 1}$$
Finn $A$ og $B$ (her $A = \\tfrac12$ og $B = -\\tfrac12$), og integrer hver del til logaritmer:
$$\\int \\frac{dx}{x^2 - 1} = \\tfrac12\\ln|x - 1| - \\tfrac12\\ln|x + 1| + C$$
Er telleren av like høy eller høyere grad enn nevneren, gjør **polynomdivisjon** først.

## Hvilken metode skal jeg velge?
- Ser du en kjerne og dens deriverte → **variabelskifte**.
- Produkt av to ulike funksjonstyper (polynom · eksponential/trig/ln) → **delvis integrasjon**.
- Brøk med polynomer → **delbrøkoppspalting** (eventuelt etter polynomdivisjon).
**Kontroller** alltid svaret ved å derivere det – da skal du få integranden tilbake.

## Vanlige feil
- Å glemme å bytte grensene (eller sette tilbake $x$) ved variabelskifte i bestemte integraler.
- Feil valg av $u'$ og $v$ i delvis integrasjon, så integralet blir vanskeligere.
- Fortegnsfeil når leddet $-\\int uv'\\,dx$ regnes ut.`,
`## When the basic rules aren't enough
Many integrals can't be done directly with the basic formulas. Then we use three main methods – and often have to experiment.

## Substitution
Used when the integrand contains an **inner function** $u$ **and** (roughly) its derivative. It's the chain rule in reverse.
1. Choose $u$ = the inner function.
2. Compute $du = u'\\,dx$.
3. Write everything in terms of $u$ and integrate.
4. Substitute back $x$ (or change the limits in definite integrals).

### Example
$\\int 2x\\,(x^2 + 1)^4\\,dx$. Let $u = x^2 + 1$, $du = 2x\\,dx$:
$$\\int u^4\\,du = \\frac{u^5}{5} + C = \\frac{(x^2 + 1)^5}{5} + C$$
Another classic: $\\int \\dfrac{2x}{x^2 + 1}\\,dx = \\ln(x^2 + 1) + C$, because the numerator is the derivative of the denominator.

## Integration by parts
The product rule in reverse:
$$\\int u'v\\,dx = uv - \\int uv'\\,dx$$
Used on **products** like $x\\,e^x$, $x\\sin x$ and $\\ln x$. Choose $v$ so that it becomes **simpler** when differentiated (often a polynomial or $\\ln x$), and $u'$ as something you can integrate.

### Example
$\\int x\\,e^x\\,dx$: let $v = x$ and $u' = e^x$, so $v' = 1$ and $u = e^x$.
$$\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C = e^x(x - 1) + C$$
With $\\ln x$: $\\int \\ln x\\,dx = \\int 1\\cdot\\ln x\\,dx = x\\ln x - x + C$.

## Partial fractions
For **rational functions** whose denominator factorises:
$$\\frac{1}{x^2 - 1} = \\frac{1}{(x - 1)(x + 1)} = \\frac{A}{x - 1} + \\frac{B}{x + 1}$$
Find $A$ and $B$ (here $A = \\tfrac12$ and $B = -\\tfrac12$) and integrate each part to logarithms:
$$\\int \\frac{dx}{x^2 - 1} = \\tfrac12\\ln|x - 1| - \\tfrac12\\ln|x + 1| + C$$
If the numerator's degree is equal to or higher than the denominator's, do **polynomial division** first.

## Which method should I choose?
- An inner function and its derivative → **substitution**.
- A product of two different kinds of function (polynomial · exponential/trig/ln) → **integration by parts**.
- A fraction of polynomials → **partial fractions** (after polynomial division if needed).
Always **check** your answer by differentiating it – you should get the integrand back.

## Common mistakes
- Forgetting to change the limits (or substitute back $x$) in definite integrals with substitution.
- Choosing $u'$ and $v$ badly in integration by parts, making the integral harder.
- Sign errors when working out $-\\int uv'\\,dx$.`);

M("VGR2", "Areal og volum med integral",
`## Areal under og mellom grafer
- Areal mellom grafen og $x$-aksen, der $f(x) \\ge 0$: $A = \\int_a^b f(x)\\,dx$.
- Hvis grafen ligger **under** aksen, er integralet negativt. Areal: $A = -\\int_a^b f(x)\\,dx$, eller del opp ved nullpunktene.
- Areal **mellom** to grafer: $A = \\int_a^b \\big(\\text{øverst} - \\text{nederst}\\big)\\,dx$. Finn skjæringspunktene først.

### Regneeksempel
Arealet mellom $f(x) = x^2$ og $g(x) = x + 2$. Skjæring: $x^2 = x + 2$ gir $x = -1$ og $x = 2$. Linja ligger øverst:
$$A = \\int_{-1}^{2}(x + 2 - x^2)\\,dx = \\Big[\\tfrac{x^2}{2} + 2x - \\tfrac{x^3}{3}\\Big]_{-1}^{2} = \\tfrac{10}{3} - \\left(-\\tfrac{7}{6}\\right) = 4{,}5$$

## Volum ved snitt
Tenk deg at et legeme skjæres i tynne skiver vinkelrett på $x$-aksen. Hvis **arealet av snittet** er $A(x)$, er volumet
$$V = \\int_a^b A(x)\\,dx$$
Slik finner vi blant annet volumet av pyramider og kjegler.

## Omdreiningslegemer
Når grafen til $f$ **roteres om $x$-aksen**, blir hvert snitt en **sirkel** med radius $f(x)$ og areal $\\pi f(x)^2$:
$$V = \\pi\\int_a^b f(x)^2\\,dx$$

### Regneeksempel 1: Kjegle
Linja $f(x) = \\tfrac{r}{h}x$ fra 0 til $h$ roteres om $x$-aksen:
$$V = \\pi\\int_0^h \\frac{r^2}{h^2}x^2\\,dx = \\pi\\frac{r^2}{h^2}\\cdot\\frac{h^3}{3} = \\frac13\\pi r^2h$$
– den kjente kjegleformelen.

### Regneeksempel 2: Kule
Halvsirkelen $f(x) = \\sqrt{r^2 - x^2}$ fra $-r$ til $r$ roteres:
$$V = \\pi\\int_{-r}^{r}(r^2 - x^2)\\,dx = \\pi\\Big[r^2x - \\tfrac{x^3}{3}\\Big]_{-r}^{r} = \\frac43\\pi r^3$$

## Andre anvendelser
- **Gjennomsnittsverdien** av en funksjon på $[a, b]$: $\\bar f = \\dfrac{1}{b - a}\\int_a^b f(x)\\,dx$.
- **Buelengde** og **overflateareal** kan også finnes med integraler.
- I fysikk: **arbeid** $W = \\int F(x)\\,dx$ når kraften varierer.

## Vanlige feil
- Å glemme $\\pi$ eller kvadratet i volumformelen.
- Å trekke den øverste fra den nederste grafen (gir negativt areal).
- Å bruke integralet direkte som areal når grafen krysser $x$-aksen.`,
`## Area under and between graphs
- Area between the graph and the $x$-axis where $f(x) \\ge 0$: $A = \\int_a^b f(x)\\,dx$.
- If the graph lies **below** the axis, the integral is negative. Area: $A = -\\int_a^b f(x)\\,dx$, or split at the zeros.
- Area **between** two graphs: $A = \\int_a^b \\big(\\text{top} - \\text{bottom}\\big)\\,dx$. Find the intersections first.

### Worked example
The area between $f(x) = x^2$ and $g(x) = x + 2$. Intersection: $x^2 = x + 2$ gives $x = -1$ and $x = 2$. The line is on top:
$$A = \\int_{-1}^{2}(x + 2 - x^2)\\,dx = \\Big[\\tfrac{x^2}{2} + 2x - \\tfrac{x^3}{3}\\Big]_{-1}^{2} = \\tfrac{10}{3} - \\left(-\\tfrac{7}{6}\\right) = 4.5$$

## Volume by slicing
Imagine a solid cut into thin slices perpendicular to the $x$-axis. If the **cross-sectional area** is $A(x)$, the volume is
$$V = \\int_a^b A(x)\\,dx$$
This is how we find the volume of pyramids and cones, among others.

## Solids of revolution
When the graph of $f$ is **rotated about the $x$-axis**, each slice becomes a **circle** of radius $f(x)$ and area $\\pi f(x)^2$:
$$V = \\pi\\int_a^b f(x)^2\\,dx$$

### Worked example 1: Cone
The line $f(x) = \\tfrac{r}{h}x$ from 0 to $h$ rotated about the $x$-axis:
$$V = \\pi\\int_0^h \\frac{r^2}{h^2}x^2\\,dx = \\pi\\frac{r^2}{h^2}\\cdot\\frac{h^3}{3} = \\frac13\\pi r^2h$$
– the familiar cone formula.

### Worked example 2: Sphere
The semicircle $f(x) = \\sqrt{r^2 - x^2}$ from $-r$ to $r$ rotated:
$$V = \\pi\\int_{-r}^{r}(r^2 - x^2)\\,dx = \\pi\\Big[r^2x - \\tfrac{x^3}{3}\\Big]_{-r}^{r} = \\frac43\\pi r^3$$

## Other applications
- The **mean value** of a function on $[a, b]$: $\\bar f = \\dfrac{1}{b - a}\\int_a^b f(x)\\,dx$.
- **Arc length** and **surface area** can also be found with integrals.
- In physics: **work** $W = \\int F(x)\\,dx$ when the force varies.

## Common mistakes
- Forgetting $\\pi$ or the square in the volume formula.
- Subtracting the top graph from the bottom one (giving negative area).
- Using the integral directly as area when the graph crosses the $x$-axis.`);

M("VGR2", "Induksjonsbevis",
`## Ideen – dominobrikker
**Matematisk induksjon** brukes til å bevise at en påstand $P(n)$ gjelder for **alle** naturlige tall $n \\ge n_0$. Tenk på en uendelig rekke dominobrikker: hvis den **første** faller, og hver brikke **alltid** velter den neste, faller alle.

## De to stegene
1. **Basissteget** (induksjonsgrunnlaget): vis at $P(n_0)$ er sann – ofte $P(1)$.
2. **Induksjonssteget**: anta at $P(k)$ er sann for en vilkårlig $k$ (**induksjonsantakelsen**), og vis at da er også $P(k + 1)$ sann.
Da følger det at $P(n)$ gjelder for alle $n \\ge n_0$.

### Eksempel 1: summeformel
Påstand: $1 + 2 + 3 + \\dots + n = \\dfrac{n(n + 1)}{2}$.
- **Basis**: $n = 1$: venstre side er 1, høyre side er $\\tfrac{1\\cdot 2}{2} = 1$ ✓.
- **Induksjon**: Anta $1 + \\dots + k = \\tfrac{k(k+1)}{2}$. Da er
$$1 + \\dots + k + (k + 1) = \\frac{k(k+1)}{2} + (k + 1) = \\frac{(k+1)(k + 2)}{2}$$
som er formelen med $n = k + 1$ ✓. ∎

### Eksempel 2: delelighet
Påstand: $5^n - 1$ er delelig med 4 for alle $n \\ge 1$.
- **Basis**: $5^1 - 1 = 4$ ✓.
- **Induksjon**: Anta $5^k - 1 = 4m$. Da er
$$5^{k+1} - 1 = 5\\cdot 5^k - 1 = 5(4m + 1) - 1 = 20m + 4 = 4(5m + 1)$$
som er delelig med 4 ✓. ∎

## Slik lykkes du med induksjonssteget
- Skriv opp **nøyaktig** hva du antar ($P(k)$) og hva du skal vise ($P(k+1)$).
- Finn **$P(k)$ inni $P(k+1)$** – for summer: skill ut det siste leddet; for delelighet: skriv om så antakelsen kan brukes.
- Avslutt med å vise at uttrykket har akkurat formen i påstanden.

## Andre bruksområder
Induksjon brukes også til å bevise **ulikheter** (som $2^n > n^2$ for $n \\ge 5$), formler for **rekursive følger** og egenskaper ved algoritmer i informatikk. **Sterk induksjon** antar at påstanden gjelder for alle tall opp til $k$.

## Vanlige feil
- Å hoppe over basissteget – uten det beviser induksjonssteget ingenting.
- Å bruke det man skal vise ($P(k+1)$) i stedet for antakelsen ($P(k)$).
- Å «sjekke» for noen tall og tro at det er et bevis.`,
`## The idea – dominoes
**Mathematical induction** is used to prove that a claim $P(n)$ holds for **all** natural numbers $n \\ge n_0$. Think of an endless row of dominoes: if the **first** falls, and each domino **always** knocks over the next, they all fall.

## The two steps
1. **Base case**: show that $P(n_0)$ is true – often $P(1)$.
2. **Inductive step**: assume $P(k)$ is true for an arbitrary $k$ (the **induction hypothesis**), and show that $P(k + 1)$ is then true too.
It follows that $P(n)$ holds for all $n \\ge n_0$.

### Example 1: a sum formula
Claim: $1 + 2 + 3 + \\dots + n = \\dfrac{n(n + 1)}{2}$.
- **Base**: $n = 1$: the left side is 1, the right side $\\tfrac{1\\cdot 2}{2} = 1$ ✓.
- **Induction**: assume $1 + \\dots + k = \\tfrac{k(k+1)}{2}$. Then
$$1 + \\dots + k + (k + 1) = \\frac{k(k+1)}{2} + (k + 1) = \\frac{(k+1)(k + 2)}{2}$$
which is the formula with $n = k + 1$ ✓. ∎

### Example 2: divisibility
Claim: $5^n - 1$ is divisible by 4 for all $n \\ge 1$.
- **Base**: $5^1 - 1 = 4$ ✓.
- **Induction**: assume $5^k - 1 = 4m$. Then
$$5^{k+1} - 1 = 5\\cdot 5^k - 1 = 5(4m + 1) - 1 = 20m + 4 = 4(5m + 1)$$
which is divisible by 4 ✓. ∎

## Succeeding with the inductive step
- Write down **exactly** what you assume ($P(k)$) and what you must show ($P(k+1)$).
- Find **$P(k)$ inside $P(k+1)$** – for sums: separate the last term; for divisibility: rewrite so the hypothesis can be used.
- Finish by showing the expression has exactly the form in the claim.

## Other uses
Induction is also used to prove **inequalities** (like $2^n > n^2$ for $n \\ge 5$), formulas for **recursive sequences** and properties of algorithms in computer science. **Strong induction** assumes the claim holds for all numbers up to $k$.

## Common mistakes
- Skipping the base case – without it the inductive step proves nothing.
- Using what you must show ($P(k+1)$) instead of the hypothesis ($P(k)$).
- 'Checking' a few numbers and thinking that's a proof.`);

M("VGR2", "Linjer og plan i rommet",
`## Linjer i rommet
En linje gjennom punktet $P(x_0, y_0, z_0)$ med **retningsvektor** $\\vec r = [a, b, c]$ har **parameterframstillingen**
$$\\ell: \\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}$$
I rommet kan to linjer være **parallelle**, **skjære hverandre** eller være **vindskjeve** (verken parallelle eller skjærende – som to veger på hver sin høyde i et planskilt kryss).

## Plan
Et plan bestemmes av et punkt $P(x_0, y_0, z_0)$ og en **normalvektor** $\\vec n = [a, b, c]$ som står **vinkelrett** på planet:
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\quad\\text{eller}\\quad ax + by + cz + d = 0$$
**Finn planet gjennom tre punkter** $A$, $B$, $C$: normalvektoren er $\\vec n = \\overrightarrow{AB}\\times\\overrightarrow{AC}$, og så setter du inn ett av punktene.

### Regneeksempel
$A(1, 0, 0)$, $B(0, 2, 0)$ og $C(0, 0, 3)$ gir $\\vec n = [6, 3, 2]$ (se vektorproduktet). Planet: $6(x - 1) + 3y + 2z = 0$, altså $6x + 3y + 2z = 6$.

## Skjæringer
- **Linje og plan**: sett parameterframstillingen inn i planlikningen og løs for $t$.
- **To plan** som ikke er parallelle, skjærer hverandre i en **linje**. Retningsvektoren er kryssproduktet av normalvektorene.
- **Linje og kule**: sett inn i kulelikningen – det gir en andregradslikning med 0, 1 eller 2 løsninger.

## Avstander
- **Avstand fra punkt til plan**: fra $Q(x_1, y_1, z_1)$ til $ax + by + cz + d = 0$:
$$d = \\frac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$
- **Avstand fra punkt til linje**: $d = \\dfrac{|\\overrightarrow{PQ}\\times\\vec r|}{|\\vec r|}$, der $P$ er et punkt på linja.
- Et **plan tangerer en kule** når avstanden fra sentrum til planet er lik radien.

## Vinkler
- Mellom to **linjer**: vinkelen mellom retningsvektorene.
- Mellom to **plan**: vinkelen mellom normalvektorene.
- Mellom en **linje og et plan**: $90°$ minus vinkelen mellom retningsvektoren og normalvektoren.

## Vanlige feil
- Å bruke retningsvektor der det skal være normalvektor (og omvendt).
- Å bruke samme parameter for to linjer når du sjekker om de skjærer hverandre.
- Å glemme absoluttverditegnet i avstandsformelen.`,
`## Lines in space
A line through $P(x_0, y_0, z_0)$ with **direction vector** $\\vec r = [a, b, c]$ has the **parametric form**
$$\\ell: \\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}$$
In space two lines can be **parallel**, **intersect** or be **skew** (neither parallel nor intersecting – like two roads at different levels at a flyover).

## Planes
A plane is determined by a point $P(x_0, y_0, z_0)$ and a **normal vector** $\\vec n = [a, b, c]$ **perpendicular** to it:
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\quad\\text{or}\\quad ax + by + cz + d = 0$$
**The plane through three points** $A$, $B$, $C$: the normal is $\\vec n = \\overrightarrow{AB}\\times\\overrightarrow{AC}$; then substitute one of the points.

### Worked example
$A(1, 0, 0)$, $B(0, 2, 0)$ and $C(0, 0, 3)$ give $\\vec n = [6, 3, 2]$ (see the cross product). The plane: $6(x - 1) + 3y + 2z = 0$, i.e. $6x + 3y + 2z = 6$.

## Intersections
- **Line and plane**: substitute the parametric form into the plane equation and solve for $t$.
- **Two planes** that aren't parallel meet in a **line**. Its direction vector is the cross product of the normals.
- **Line and sphere**: substitute into the sphere equation – a quadratic with 0, 1 or 2 solutions.

## Distances
- **Point to plane**: from $Q(x_1, y_1, z_1)$ to $ax + by + cz + d = 0$:
$$d = \\frac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$
- **Point to line**: $d = \\dfrac{|\\overrightarrow{PQ}\\times\\vec r|}{|\\vec r|}$, where $P$ is a point on the line.
- A **plane is tangent to a sphere** when the distance from the centre to the plane equals the radius.

## Angles
- Between two **lines**: the angle between their direction vectors.
- Between two **planes**: the angle between their normals.
- Between a **line and a plane**: $90°$ minus the angle between the direction vector and the normal.

## Common mistakes
- Using a direction vector where a normal is needed (and vice versa).
- Using the same parameter for two lines when checking for intersection.
- Forgetting the absolute value in the distance formula.`);
})();
