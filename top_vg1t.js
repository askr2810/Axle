// Teoribok – emnesider for Matematikk 1T (VG1T, enhet 0–3), med regnesjekk (chk) fra start (AX-08).
// Test: node tools/test_topics.js top_vg1t.js og node tools/test_examples.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VG1T 0: Algebra og likninger ----------
TOPICS("VG1T", 0, [
{ id: "andregradslikning", chk: ["(5+sqrt(25-24))/2 ≈ 3", "(5-sqrt(25-24))/2 ≈ 2"],
  nb: O("Andregradslikninger", "En andregradslikning kan skrives som $ax^2 + bx + c = 0$ med $a \ne 0$. Den kan løses med abc-formelen. Uttrykket under rottegnet, diskriminanten $b^2 - 4ac$, forteller hvor mange løsninger likningen har: to hvis den er positiv, én hvis den er null og ingen reelle hvis den er negativ.",
    [[R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, "abc-formelen"], [R`D = b^2 - 4ac`, "diskriminanten"]],
    [["a,\\ b,\\ c", "koeffisienter", ""], ["D", "diskriminant", ""]],
    R`$x^2 - 5x + 6 = 0$:
$x = \frac{5 \pm \sqrt{25 - 24}}{2}$, så $x = 3$ eller $x = 2$.`, "Sett løsningene inn i likningen og sjekk at venstresiden blir null."),
  en: O("Quadratic equations", "A quadratic equation can be written as $ax^2 + bx + c = 0$ with $a \ne 0$. It can be solved with the quadratic formula. The expression under the root, the discriminant $b^2 - 4ac$, tells how many solutions there are: two if it is positive, one if it is zero and no real ones if it is negative.",
    [[R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, "the quadratic formula"], [R`D = b^2 - 4ac`, "the discriminant"]],
    [["a,\\ b,\\ c", "coefficients", ""], ["D", "discriminant", ""]],
    R`$x^2 - 5x + 6 = 0$:
$x = \frac{5 \pm \sqrt{25 - 24}}{2}$, so $x = 3$ or $x = 2$.`, "Substitute the solutions back into the equation and check that the left side becomes zero.") },
{ id: "likningssett", chk: ["(10+4)/2 ≈ 7", "(10-4)/2 ≈ 3"],
  nb: O("Likningssett med to ukjente", "Et lineært likningssett har to likninger og to ukjente. Med innsettingsmetoden løser du den ene likningen for én ukjent og setter uttrykket inn i den andre. Med addisjonsmetoden legger du sammen eller trekker fra likningene slik at én ukjent forsvinner. Grafisk er løsningen skjæringspunktet mellom to rette linjer.",
    [[R`\begin{cases} a_1x + b_1y = c_1 \\ a_2x + b_2y = c_2 \end{cases}`, "lineært likningssett"]],
    [["x,\\ y", "de ukjente", ""]],
    R`$x + y = 10$ og $x - y = 4$. Legg sammen: $2x = 14$, så $x = 7$ og $y = 10 - 7 = 3$.`, "Sett begge verdiene inn i begge likningene til slutt."),
  en: O("Systems of two equations", "A linear system has two equations and two unknowns. With substitution you solve one equation for one unknown and insert the expression into the other. With elimination you add or subtract the equations so that one unknown disappears. Graphically the solution is the intersection of two straight lines.",
    [[R`\begin{cases} a_1x + b_1y = c_1 \\ a_2x + b_2y = c_2 \end{cases}`, "linear system"]],
    [["x,\\ y", "the unknowns", ""]],
    R`$x + y = 10$ and $x - y = 4$. Add them: $2x = 14$, so $x = 7$ and $y = 10 - 7 = 3$.`, "Finally, substitute both values into both equations.") },
{ id: "kvadratsetningene", chk: ["(2+3)^2 ≈ 25", "2^2+6*2+9 ≈ 25"],
  nb: O("Kvadratsetningene", "Kvadratsetningene er tre regler som gjør det raskt å regne ut og faktorisere uttrykk. Første og andre kvadratsetning gir kvadratet av en sum og en differanse, og konjugatsetningen gir produktet av en sum og en differanse. Brukt baklengs er de nyttige når du skal faktorisere eller forkorte brøker.",
    [[R`(a + b)^2 = a^2 + 2ab + b^2`, "første kvadratsetning"], [R`(a - b)^2 = a^2 - 2ab + b^2`, "andre kvadratsetning"], [R`(a + b)(a - b) = a^2 - b^2`, "konjugatsetningen"]],
    [["a,\\ b", "tall eller uttrykk", ""]],
    R`$(x + 3)^2 = x^2 + 6x + 9$. Kontroll med $x = 2$: $(2 + 3)^2 = 25$ og $4 + 12 + 9 = 25$.`, "Den vanligste feilen er å glemme midtleddet $2ab$."),
  en: O("The square identities", "The square identities are three rules that make it quick to expand and factorise expressions. The first and second give the square of a sum and of a difference, and the difference of squares gives the product of a sum and a difference. Used backwards they help when factorising or simplifying fractions.",
    [[R`(a + b)^2 = a^2 + 2ab + b^2`, "square of a sum"], [R`(a - b)^2 = a^2 - 2ab + b^2`, "square of a difference"], [R`(a + b)(a - b) = a^2 - b^2`, "difference of squares"]],
    [["a,\\ b", "numbers or expressions", ""]],
    R`$(x + 3)^2 = x^2 + 6x + 9$. Check with $x = 2$: $(2 + 3)^2 = 25$ and $4 + 12 + 9 = 25$.`, "The most common mistake is forgetting the middle term $2ab$.") }
]);

// ---------- VG1T 1: Funksjoner ----------
TOPICS("VG1T", 1, [
{ id: "lineaer-funksjon", chk: ["(9-3)/(4-1) ≈ 2", "3-2*1 ≈ 1"],
  nb: O("Lineære funksjoner", "En lineær funksjon har en rett linje som graf. Stigningstallet $a$ forteller hvor mye $y$ øker når $x$ øker med 1, og konstantleddet $b$ er der grafen skjærer $y$-aksen. Kjenner du to punkter på linjen, kan du finne både $a$ og $b$.",
    [[R`f(x) = ax + b`, "lineær funksjon"], [R`a = \frac{y_2 - y_1}{x_2 - x_1}`, "stigningstall gjennom to punkter"]],
    [["a", "stigningstall", ""], ["b", "konstantledd", ""]],
    R`Linjen gjennom $(1, 3)$ og $(4, 9)$: $a = \frac{9 - 3}{4 - 1} = 2$ og $b = 3 - 2\cdot 1 = 1$, så $f(x) = 2x + 1$.`, "Sjekk svaret ved å sette inn det andre punktet: $f(4) = 9$."),
  en: O("Linear functions", "A linear function has a straight line as its graph. The slope $a$ tells how much $y$ increases when $x$ increases by 1, and the constant term $b$ is where the graph crosses the $y$-axis. If you know two points on the line, you can find both $a$ and $b$.",
    [[R`f(x) = ax + b`, "linear function"], [R`a = \frac{y_2 - y_1}{x_2 - x_1}`, "slope through two points"]],
    [["a", "slope", ""], ["b", "constant term", ""]],
    R`The line through $(1, 3)$ and $(4, 9)$: $a = \frac{9 - 3}{4 - 1} = 2$ and $b = 3 - 2\cdot 1 = 1$, so $f(x) = 2x + 1$.`, "Check by inserting the other point: $f(4) = 9$.") },
{ id: "andregradsfunksjon", chk: ["4/(2*1) ≈ 2", "2^2-4*2+1 ≈ -3"],
  nb: O("Andregradsfunksjoner", "Grafen til en andregradsfunksjon er en parabel. Er $a > 0$, vender den opp og har et bunnpunkt; er $a < 0$, vender den ned og har et toppunkt. Symmetrilinjen går gjennom ekstremalpunktet, og nullpunktene finner du med abc-formelen.",
    [[R`f(x) = ax^2 + bx + c`, "andregradsfunksjon"], [R`x = -\frac{b}{2a}`, "symmetrilinje og ekstremalpunkt"]],
    [["a,\\ b,\\ c", "koeffisienter", ""]],
    R`$f(x) = x^2 - 4x + 1$: $x = \frac{4}{2\cdot 1} = 2$ og $f(2) = 4 - 8 + 1 = -3$. Bunnpunktet er $(2, -3)$.`, "Fortegnet til $a$ avgjør om ekstremalpunktet er et topp- eller bunnpunkt."),
  en: O("Quadratic functions", "The graph of a quadratic function is a parabola. If $a > 0$ it opens upwards and has a minimum; if $a < 0$ it opens downwards and has a maximum. The line of symmetry passes through the turning point, and the zeros are found with the quadratic formula.",
    [[R`f(x) = ax^2 + bx + c`, "quadratic function"], [R`x = -\frac{b}{2a}`, "line of symmetry and turning point"]],
    [["a,\\ b,\\ c", "coefficients", ""]],
    R`$f(x) = x^2 - 4x + 1$: $x = \frac{4}{2\cdot 1} = 2$ and $f(2) = 4 - 8 + 1 = -3$. The minimum point is $(2, -3)$.`, "The sign of $a$ decides whether the turning point is a maximum or a minimum.") },
{ id: "eksponentialfunksjon", chk: ["5000*1.04^10 ≈ 7401"],
  nb: O("Eksponentialfunksjoner", "En eksponentialfunksjon beskriver vekst eller nedgang med samme prosent i hver periode. Startverdien $a$ ganges med vekstfaktoren $b$ én gang per periode. Er $b > 1$, er det vekst, og er $0 < b < 1$, er det nedgang. Vekstfaktoren ved $p$ prosent økning er $1 + p/100$.",
    [[R`f(x) = a\cdot b^x`, "eksponentialfunksjon"], [R`b = 1 + \frac{p}{100}`, "vekstfaktor"]],
    [["a", "startverdi", ""], ["b", "vekstfaktor", ""], ["p", "prosent per periode", "%"]],
    R`5000 kr settes inn med 4 % rente per år. Etter 10 år: $5000\cdot 1{,}04^{10} \approx 7401$ kr.`, "Ved nedgang på $p$ prosent er vekstfaktoren $1 - p/100$."),
  en: O("Exponential functions", "An exponential function describes growth or decline by the same percentage in each period. The initial value $a$ is multiplied by the growth factor $b$ once per period. If $b > 1$ there is growth, and if $0 < b < 1$ there is decline. The growth factor for an increase of $p$ percent is $1 + p/100$.",
    [[R`f(x) = a\cdot b^x`, "exponential function"], [R`b = 1 + \frac{p}{100}`, "growth factor"]],
    [["a", "initial value", ""], ["b", "growth factor", ""], ["p", "percent per period", "%"]],
    R`5000 kr is deposited at 4% interest per year. After 10 years: $5000\cdot 1{,}04^{10} \approx 7401$ kr.`, "For a decline of $p$ percent the growth factor is $1 - p/100$.") }
]);

// ---------- VG1T 2: Derivasjon og vekstfart ----------
TOPICS("VG1T", 2, [
{ id: "gjennomsnittlig-vekstfart", chk: ["(3^2-1^2)/(3-1) ≈ 4"],
  nb: O("Gjennomsnittlig vekstfart", "Gjennomsnittlig vekstfart forteller hvor mye en funksjon endrer seg per enhet i $x$ over et intervall. Den er stigningstallet til sekanten, den rette linjen gjennom to punkter på grafen. Når intervallet blir svært lite, nærmer den seg den momentane vekstfarten, altså den deriverte.",
    [[R`\frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}`, "gjennomsnittlig vekstfart"]],
    [["\\Delta y", "endring i funksjonsverdi", ""], ["\\Delta x", "lengden av intervallet", ""]],
    R`$f(x) = x^2$ fra $x = 1$ til $x = 3$: $\frac{9 - 1}{3 - 1} = 4$.`, "Husk enheten: for eksempel meter per sekund eller kroner per år."),
  en: O("Average rate of change", "The average rate of change tells how much a function changes per unit of $x$ over an interval. It is the slope of the secant, the straight line through two points on the graph. When the interval becomes very small, it approaches the instantaneous rate of change, the derivative.",
    [[R`\frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}`, "average rate of change"]],
    [["\\Delta y", "change in function value", ""], ["\\Delta x", "length of the interval", ""]],
    R`$f(x) = x^2$ from $x = 1$ to $x = 3$: $\frac{9 - 1}{3 - 1} = 4$.`, "Remember the unit, for example metres per second or kroner per year.") },
{ id: "derivasjonsregler", chk: ["9*2^2-2 ≈ 34"],
  nb: O("Derivasjonsregler for polynomer", "Den deriverte $f'(x)$ er den momentane vekstfarten, eller stigningstallet til tangenten i punktet. For polynomer deriverer du ledd for ledd: eksponenten flyttes ned som faktor og senkes med én. Et konstantledd har derivert null, og en konstant faktor blir stående.",
    [[R`(x^n)' = n\,x^{n-1}`, "potensregelen"], [R`(k\cdot f)' = k\cdot f'`, "konstant faktor"], [R`(c)' = 0`, "konstantledd"]],
    [["n", "eksponent", ""], ["k,\\ c", "konstanter", ""]],
    R`$f(x) = 3x^3 - 2x + 5$ gir $f'(x) = 9x^2 - 2$, og $f'(2) = 9\cdot 4 - 2 = 34$.`, "Del opp i ledd og deriver hvert ledd for seg."),
  en: O("Differentiation rules for polynomials", "The derivative $f'(x)$ is the instantaneous rate of change, or the slope of the tangent at the point. For polynomials you differentiate term by term: the exponent moves down as a factor and is lowered by one. A constant term has derivative zero, and a constant factor stays.",
    [[R`(x^n)' = n\,x^{n-1}`, "power rule"], [R`(k\cdot f)' = k\cdot f'`, "constant factor"], [R`(c)' = 0`, "constant term"]],
    [["n", "exponent", ""], ["k,\\ c", "constants", ""]],
    R`$f(x) = 3x^3 - 2x + 5$ gives $f'(x) = 9x^2 - 2$, and $f'(2) = 9\cdot 4 - 2 = 34$.`, "Split into terms and differentiate each term separately.") },
{ id: "tangent", chk: ["2*3 ≈ 6", "9-6*3 ≈ -9"],
  nb: O("Likningen for tangenten", "Tangenten er den rette linjen som berører grafen i ett punkt og har samme stigningstall som grafen der. Stigningstallet er $f'(x_0)$, og linjen går gjennom punktet $(x_0, f(x_0))$. Med ettpunktsformelen får du likningen direkte.",
    [[R`y - f(x_0) = f'(x_0)(x - x_0)`, "ettpunktsformelen for tangenten"]],
    [["x_0", "tangeringspunktets x-verdi", ""], ["f'(x_0)", "stigningstall i punktet", ""]],
    R`$f(x) = x^2$ i $x_0 = 3$: $f(3) = 9$ og $f'(3) = 2\cdot 3 = 6$. Da er $y = 6x - 9$, siden $9 - 6\cdot 3 = -9$.`, "Kontroller at tangenten går gjennom punktet: $6\cdot 3 - 9 = 9$."),
  en: O("Equation of the tangent", "The tangent is the straight line that touches the graph at one point and has the same slope as the graph there. The slope is $f'(x_0)$, and the line passes through the point $(x_0, f(x_0))$. The point-slope form gives the equation directly.",
    [[R`y - f(x_0) = f'(x_0)(x - x_0)`, "point-slope form of the tangent"]],
    [["x_0", "x value of the point of contact", ""], ["f'(x_0)", "slope at the point", ""]],
    R`$f(x) = x^2$ at $x_0 = 3$: $f(3) = 9$ and $f'(3) = 2\cdot 3 = 6$. Then $y = 6x - 9$, since $9 - 6\cdot 3 = -9$.`, "Check that the tangent passes through the point: $6\cdot 3 - 9 = 9$.") }
]);

// ---------- VG1T 3: Trigonometri ----------
TOPICS("VG1T", 3, [
{ id: "rettvinklet-trekant", chk: ["10*sin(30*deg) ≈ 5", "10*cos(30*deg) ≈ 8.66"],
  nb: O("Sinus, cosinus og tangens", "I en rettvinklet trekant knytter sinus, cosinus og tangens en vinkel til forholdet mellom to sider. Sinus er motstående katet delt på hypotenusen, cosinus er hosliggende katet delt på hypotenusen, og tangens er motstående delt på hosliggende katet.",
    [[R`\sin v = \frac{\text{motstående}}{\text{hypotenus}}`, "sinus"], [R`\cos v = \frac{\text{hosliggende}}{\text{hypotenus}}`, "cosinus"], [R`\tan v = \frac{\text{motstående}}{\text{hosliggende}}`, "tangens"]],
    [["v", "vinkel", "°"]],
    R`Hypotenus 10 og $v = 30^\circ$: motstående katet $= 10\sin 30^\circ = 5$ og hosliggende katet $= 10\cos 30^\circ \approx 8{,}66$.`, "Sjekk at kalkulatoren står i grader."),
  en: O("Sine, cosine and tangent", "In a right triangle, sine, cosine and tangent link an angle to the ratio between two sides. Sine is the opposite side divided by the hypotenuse, cosine is the adjacent side divided by the hypotenuse, and tangent is the opposite divided by the adjacent side.",
    [[R`\sin v = \frac{\text{opposite}}{\text{hypotenuse}}`, "sine"], [R`\cos v = \frac{\text{adjacent}}{\text{hypotenuse}}`, "cosine"], [R`\tan v = \frac{\text{opposite}}{\text{adjacent}}`, "tangent"]],
    [["v", "angle", "°"]],
    R`Hypotenuse 10 and $v = 30^\circ$: opposite side $= 10\sin 30^\circ = 5$ and adjacent side $= 10\cos 30^\circ \approx 8{,}66$.`, "Check that the calculator is in degrees.") },
{ id: "sinussetningen", chk: ["8*sin(60*deg)/sin(40*deg) ≈ 10.78"],
  nb: O("Sinussetningen", "Sinussetningen gjelder i alle trekanter, ikke bare rettvinklede. Forholdet mellom en side og sinus til vinkelen rett overfor er det samme for alle tre sidene. Den brukes når du kjenner to vinkler og en side, eller to sider og en vinkel som ikke ligger mellom dem.",
    [[R`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}`, "sinussetningen"]],
    [["a,\\ b,\\ c", "sider", ""], ["A,\\ B,\\ C", "vinklene overfor sidene", "°"]],
    R`$A = 40^\circ$, $B = 60^\circ$ og $a = 8$: $b = \frac{8\sin 60^\circ}{\sin 40^\circ} \approx 10{,}78$.`, "Med to sider og en vinkel som ikke ligger mellom dem, kan det finnes to trekanter."),
  en: O("The sine rule", "The sine rule holds in every triangle, not just right triangles. The ratio between a side and the sine of the opposite angle is the same for all three sides. It is used when you know two angles and a side, or two sides and an angle that is not between them.",
    [[R`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}`, "the sine rule"]],
    [["a,\\ b,\\ c", "sides", ""], ["A,\\ B,\\ C", "angles opposite the sides", "°"]],
    R`$A = 40^\circ$, $B = 60^\circ$ and $a = 8$: $b = \frac{8\sin 60^\circ}{\sin 40^\circ} \approx 10{,}78$.`, "With two sides and an angle not between them, there can be two triangles.") },
{ id: "cosinussetningen", chk: ["sqrt(5^2+7^2-2*5*7*cos(60*deg)) ≈ 6.24"],
  nb: O("Cosinussetningen", "Cosinussetningen er en utvidelse av Pytagoras som gjelder i alle trekanter. Den brukes når du kjenner to sider og vinkelen mellom dem, eller alle tre sidene. Er vinkelen $90^\circ$, blir $\cos A = 0$, og formelen blir Pytagoras' setning.",
    [[R`a^2 = b^2 + c^2 - 2bc\cos A`, "cosinussetningen"]],
    [["a", "siden overfor vinkelen A", ""], ["b,\\ c", "sidene som danner vinkelen A", ""]],
    R`$b = 5$, $c = 7$ og $A = 60^\circ$: $a^2 = 25 + 49 - 70\cdot 0{,}5 = 39$, så $a \approx 6{,}24$.`, "Bruk cosinussetningen først når du kjenner tre sider, så unngår du tvetydighet."),
  en: O("The cosine rule", "The cosine rule extends Pythagoras to every triangle. It is used when you know two sides and the angle between them, or all three sides. If the angle is $90^\circ$, $\cos A = 0$ and the formula becomes Pythagoras' theorem.",
    [[R`a^2 = b^2 + c^2 - 2bc\cos A`, "the cosine rule"]],
    [["a", "side opposite angle A", ""], ["b,\\ c", "sides forming angle A", ""]],
    R`$b = 5$, $c = 7$ and $A = 60^\circ$: $a^2 = 25 + 49 - 70\cdot 0{,}5 = 39$, so $a \approx 6{,}24$.`, "Use the cosine rule first when all three sides are known to avoid ambiguity.") },
{ id: "arealsetningen", chk: ["0.5*5*7*sin(60*deg) ≈ 15.2"],
  nb: O("Arealsetningen", "Arealsetningen gir arealet av en trekant når du kjenner to sider og vinkelen mellom dem. Den kommer av at høyden mot den ene siden er den andre siden ganget med sinus til vinkelen. Du trenger da ikke å regne ut høyden for seg.",
    [[R`T = \tfrac12\,bc\sin A`, "arealsetningen"]],
    [["T", "areal", ""], ["b,\\ c", "to sider", ""], ["A", "vinkelen mellom dem", "°"]],
    R`$b = 5$, $c = 7$ og $A = 60^\circ$: $T = \tfrac12\cdot 5\cdot 7\cdot\sin 60^\circ \approx 15{,}2$.`, "Vinkelen må ligge mellom de to sidene du bruker."),
  en: O("The area rule", "The area rule gives the area of a triangle when you know two sides and the angle between them. It follows from the height towards one side being the other side times the sine of the angle. You then do not need to compute the height separately.",
    [[R`T = \tfrac12\,bc\sin A`, "the area rule"]],
    [["T", "area", ""], ["b,\\ c", "two sides", ""], ["A", "the angle between them", "°"]],
    R`$b = 5$, $c = 7$ and $A = 60^\circ$: $T = \tfrac12\cdot 5\cdot 7\cdot\sin 60^\circ \approx 15{,}2$.`, "The angle must lie between the two sides you use.") }
]);
})();
