// ============================================================
//  BEVIS – «Hvorfor stemmer det?». Korte bevis steg for steg, med interaktive figurer (sims4.js) og ett kontrollspørsmål.
//  Vises i steg-for-steg-visningen (guided.js), fra Teori-fanen (#/bevis) og fra teorisidene til enhetene de hører til.
//  units: enhetene beviset lenkes fra ("KODE:enhet"). steps: [nb, en] i samme markering som teorien (![sim:navn] = simulering).
// ============================================================
const PROOFS = [
 { id: "deriv", ic: "📈", t: ["Hvor kommer den deriverte fra?", "Where does the derivative come from?"], sub: ["Fra sekant til tangent, og hvorfor (x²)′ = 2x", "From secant to tangent, and why (x²)′ = 2x"],
   units: ["VG1T:2", "VGR1:1", "VGR1:4", "GMAT:7", "MEK1000:0", "VGS1:2"],
   steps: [
    [`## Hvor bratt er en kurve?
En rett linje har ett stigningstall overalt. En kurve bøyer seg, så brattheten endrer seg fra punkt til punkt.

Newton og Leibniz fant på 1600-tallet et smart triks: ta **to punkter som ligger nær hverandre** på kurven, og regn ut stigningen mellom dem. Den rette linjen gjennom dem kalles en **sekant**.`,
     `## How steep is a curve?
A straight line has one slope everywhere. A curve bends, so the steepness changes from point to point.

In the 1600s Newton and Leibniz came up with a clever trick: take **two points close to each other** on the curve and calculate the slope between them. The straight line through them is called a **secant**.`],
    [`## Stigningen til sekanten
Punktene er $(x, f(x))$ og $(x + h, f(x + h))$. Stigningstallet er «opp delt på bort»:
$$\\dfrac{f(x + h) - f(x)}{h}$$
Dra $h$ mot null og se hva som skjer med den røde sekanten.

![sim:secant]`,
     `## The slope of the secant
The points are $(x, f(x))$ and $(x + h, f(x + h))$. The slope is "rise over run":
$$\\dfrac{f(x + h) - f(x)}{h}$$
Drag $h$ towards zero and watch what happens to the red secant.

![sim:secant]`],
    [`## La h gå mot null
Når $h$ blir veldig liten, ligger punktene nesten oppå hverandre, og sekanten blir til **tangenten**. Stigningen til tangenten er den deriverte:
$$f'(x) = \\lim_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$$`,
     `## Let h tend to zero
When $h$ becomes very small, the points almost coincide, and the secant becomes the **tangent**. The slope of the tangent is the derivative:
$$f'(x) = \\lim_{h \\to 0}\\dfrac{f(x + h) - f(x)}{h}$$`],
    [`## Regn det ut for $f(x) = x^2$
$$\\dfrac{(x + h)^2 - x^2}{h} = \\dfrac{x^2 + 2xh + h^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h$$
Når $h \\to 0$, forsvinner $h$, og vi står igjen med
$$(x^2)' = 2x \\qquad \\blacksquare$$`,
     `## Calculate it for $f(x) = x^2$
$$\\dfrac{(x + h)^2 - x^2}{h} = \\dfrac{x^2 + 2xh + h^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h$$
As $h \\to 0$, the $h$ disappears, and we are left with
$$(x^2)' = 2x \\qquad \\blacksquare$$`],
    [`## Mønsteret
For $x^3$: $(x + h)^3 - x^3 = 3x^2h + 3xh^2 + h^3$. Del på $h$ og la $h \\to 0$: $(x^3)' = 3x^2$.

Samme mønster gjelder alltid: **eksponenten kommer ned foran, og den nye eksponenten er én mindre.**
$$(x^n)' = n\\,x^{n - 1}$$`,
     `## The pattern
For $x^3$: $(x + h)^3 - x^3 = 3x^2h + 3xh^2 + h^3$. Divide by $h$ and let $h \\to 0$: $(x^3)' = 3x^2$.

The same pattern always holds: **the exponent comes down in front, and the new exponent is one less.**
$$(x^n)' = n\\,x^{n - 1}$$`]],
   q: { at: 4, q: ["Hva blir $\\dfrac{(x + h)^2 - x^2}{h}$?", "What is $\\dfrac{(x + h)^2 - x^2}{h}$?"], opts: [["$2x + h$", "$2x + h$"], ["$2x$", "$2x$"], ["$h$", "$h$"], ["$x^2 + h$", "$x^2 + h$"]],
     expl: ["Telleren er $2xh + h^2$. Del på $h$: $2x + h$. Først når $h \\to 0$ blir det $2x$.", "The numerator is $2xh + h^2$. Divide by $h$: $2x + h$. Only when $h \\to 0$ does it become $2x$."] } },

 { id: "ftc", ic: "🟦", t: ["Hvorfor er integralet et areal?", "Why is the integral an area?"], sub: ["Analysens fundamentalteorem: arealet derivert gir funksjonen", "The fundamental theorem of calculus: the area differentiated gives the function"],
   units: ["VGR2:0", "VGR2:6", "MEK1000:1"],
   steps: [
    [`## Derivasjon og areal henger sammen
Det er kanskje den mest overraskende sammenhengen i matematikken: å finne **stigning** og å finne **areal** er motsatte operasjoner.

Men pass på retningen: det er ikke den deriverte som er arealet. Det er omvendt: **arealet under grafen, derivert, gir tilbake funksjonen.** Derfor finner vi areal med antideriverte.`,
     `## Differentiation and area are connected
It is perhaps the most surprising connection in mathematics: finding a **slope** and finding an **area** are opposite operations.

But mind the direction: the derivative is not the area. It is the other way round: **the area under the graph, differentiated, gives back the function.** That is why we find areas with antiderivatives.`],
    [`## Arealfunksjonen
La $A(x)$ være arealet under grafen til $f$ fra 0 og bort til $x$. Når $x$ flytter seg mot høyre, blir arealet større.

Spørsmålet er: **hvor fort vokser arealet?** Det er nettopp $A'(x)$.`,
     `## The area function
Let $A(x)$ be the area under the graph of $f$ from 0 to $x$. As $x$ moves to the right, the area grows.

The question is: **how fast does the area grow?** That is exactly $A'(x)$.`],
    [`## En tynn stripe
Øk $x$ med litt, $h$. Det nye arealet er en tynn stripe med bredde $h$ og høyde omtrent $f(x)$:
$$A(x + h) - A(x) \\approx f(x)\\cdot h$$
Jo tynnere stripen er, jo mer ligner den på et rektangel. Prøv selv:

![sim:ftc]`,
     `## A thin strip
Increase $x$ by a little, $h$. The new area is a thin strip with width $h$ and height roughly $f(x)$:
$$A(x + h) - A(x) \\approx f(x)\\cdot h$$
The thinner the strip, the more it looks like a rectangle. Try it:

![sim:ftc]`],
    [`## Del på h
$$\\dfrac{A(x + h) - A(x)}{h} \\approx f(x)$$
Venstresiden er stigningen til sekanten for $A$. Når $h \\to 0$ blir den den deriverte, og tilnærmingen blir eksakt:
$$A'(x) = f(x)$$
Arealfunksjonen er altså en **antiderivert** av $f$.`,
     `## Divide by h
$$\\dfrac{A(x + h) - A(x)}{h} \\approx f(x)$$
The left side is the slope of the secant for $A$. As $h \\to 0$ it becomes the derivative, and the approximation becomes exact:
$$A'(x) = f(x)$$
So the area function is an **antiderivative** of $f$.`],
    [`## Derfor virker $F(b) - F(a)$
Alle antideriverte av $f$ skiller seg bare med en konstant. Da blir arealet fra $a$ til $b$:
$$\\int_a^b f(x)\\,dx = F(b) - F(a) \\qquad \\blacksquare$$
Eksempel: $\\int_0^3 x^2\\,dx = \\left[\\tfrac{x^3}{3}\\right]_0^3 = 9$. Uten å telle en eneste rute!`,
     `## That is why $F(b) - F(a)$ works
All antiderivatives of $f$ differ only by a constant. So the area from $a$ to $b$ is:
$$\\int_a^b f(x)\\,dx = F(b) - F(a) \\qquad \\blacksquare$$
Example: $\\int_0^3 x^2\\,dx = \\left[\\tfrac{x^3}{3}\\right]_0^3 = 9$. Without counting a single square!`]],
   q: { at: 4, q: ["$A(x)$ er arealet under $f$ fra 0 til $x$. Hva er $A'(x)$?", "$A(x)$ is the area under $f$ from 0 to $x$. What is $A'(x)$?"], opts: [["$f(x)$", "$f(x)$"], ["$f'(x)$", "$f'(x)$"], ["$x \\cdot f(x)$", "$x \\cdot f(x)$"], ["$0$", "$0$"]],
     expl: ["Den ekstra stripen er omtrent $f(x)\\cdot h$, så arealet vokser med farten $f(x)$.", "The extra strip is about $f(x)\\cdot h$, so the area grows at the rate $f(x)$."] } },

 { id: "abc", ic: "🧩", t: ["Hvor kommer abc-formelen fra?", "Where does the quadratic formula come from?"], sub: ["Fullfør kvadratet, bokstavelig talt", "Complete the square, literally"],
   units: ["VG1T:0", "GMAT:2", "VGS1:0"],
   steps: [
    [`## Målet
Vi vil løse $ax^2 + bx + c = 0$ for alle tall $a$, $b$ og $c$. Trikset er å skrive venstresiden som **et kvadrat**, for $(x + k)^2 = d$ kan vi løse med en kvadratrot.

Del først på $a$:
$$x^2 + \\tfrac{b}{a}x + \\tfrac{c}{a} = 0$$`,
     `## The goal
We want to solve $ax^2 + bx + c = 0$ for all numbers $a$, $b$ and $c$. The trick is to write the left side as **a square**, because $(x + k)^2 = d$ can be solved with a square root.

First divide by $a$:
$$x^2 + \\tfrac{b}{a}x + \\tfrac{c}{a} = 0$$`],
    [`## Et kvadrat som mangler et hjørne
Tegn $x^2 + bx$ som et kvadrat $x \\cdot x$ og to rektangler $\\tfrac{b}{2}\\cdot x$. Det mangler bare et lite hjørne på $\\left(\\tfrac{b}{2}\\right)^2$ for at figuren skal bli et helt kvadrat.

![sim:cmpsq]`,
     `## A square missing a corner
Draw $x^2 + bx$ as a square $x \\cdot x$ and two rectangles $\\tfrac{b}{2}\\cdot x$. Only a small corner of $\\left(\\tfrac{b}{2}\\right)^2$ is missing for the figure to become a whole square.

![sim:cmpsq]`],
    [`## Legg til hjørnet på begge sider
Med $\\tfrac{b}{a}$ i stedet for $b$ er hjørnet $\\left(\\tfrac{b}{2a}\\right)^2$:
$$\\left(x + \\tfrac{b}{2a}\\right)^2 = \\tfrac{b^2}{4a^2} - \\tfrac{c}{a} = \\dfrac{b^2 - 4ac}{4a^2}$$`,
     `## Add the corner on both sides
With $\\tfrac{b}{a}$ instead of $b$, the corner is $\\left(\\tfrac{b}{2a}\\right)^2$:
$$\\left(x + \\tfrac{b}{2a}\\right)^2 = \\tfrac{b^2}{4a^2} - \\tfrac{c}{a} = \\dfrac{b^2 - 4ac}{4a^2}$$`],
    [`## Ta kvadratroten
$$x + \\tfrac{b}{2a} = \\pm\\dfrac{\\sqrt{b^2 - 4ac}}{2a} \\quad\\Rightarrow\\quad x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\qquad \\blacksquare$$
Nå ser du også hvorfor **diskriminanten** $b^2 - 4ac$ bestemmer antall løsninger: er den negativ, finnes det ingen kvadratrot.`,
     `## Take the square root
$$x + \\tfrac{b}{2a} = \\pm\\dfrac{\\sqrt{b^2 - 4ac}}{2a} \\quad\\Rightarrow\\quad x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\qquad \\blacksquare$$
Now you also see why the **discriminant** $b^2 - 4ac$ decides the number of solutions: if it is negative, there is no square root.`]],
   q: { at: 2, q: ["Hvilket tall må legges til $x^2 + 6x$ for å få et fullstendig kvadrat?", "Which number must be added to $x^2 + 6x$ to get a complete square?"], opts: [["9", "9"], ["6", "6"], ["3", "3"], ["36", "36"]],
     expl: ["Hjørnet er $\\left(\\tfrac{6}{2}\\right)^2 = 9$, og $x^2 + 6x + 9 = (x + 3)^2$.", "The corner is $\\left(\\tfrac{6}{2}\\right)^2 = 9$, and $x^2 + 6x + 9 = (x + 3)^2$."] } },

 { id: "pyth", ic: "📐", t: ["Hvorfor stemmer Pytagoras?", "Why is Pythagoras true?"], sub: ["Fire trekanter som bytter plass", "Four triangles that change places"],
   units: ["VG1T:3", "GMAT:5"],
   steps: [
    [`## Påstanden
I en rettvinklet trekant med kateter $a$ og $b$ og hypotenus $c$ er
$$a^2 + b^2 = c^2$$
Det finnes over 300 bevis. Dette er kanskje det vakreste, og det trenger nesten ingen regning.`,
     `## The claim
In a right-angled triangle with legs $a$ and $b$ and hypotenuse $c$,
$$a^2 + b^2 = c^2$$
There are over 300 proofs. This one is perhaps the most beautiful, and it needs almost no calculation.`],
    [`## Fire trekanter i et kvadrat
Legg fire like trekanter i et kvadrat med side $a + b$. Det gule feltet i midten er et kvadrat med side $c$, altså areal $c^2$.

Flytt så trekantene. Det gule blir nå to kvadrater: $a^2$ og $b^2$.

![sim:pyth]`,
     `## Four triangles in a square
Place four equal triangles in a square with side $a + b$. The yellow field in the middle is a square with side $c$, so its area is $c^2$.

Then move the triangles. The yellow now becomes two squares: $a^2$ and $b^2$.

![sim:pyth]`],
    [`## Samme areal
Det store kvadratet er det samme, og trekantene er de samme fire. Da må det gule arealet som er igjen, være like stort i begge figurene:
$$c^2 = a^2 + b^2 \\qquad \\blacksquare$$
Med algebra: $(a + b)^2 = c^2 + 4\\cdot\\tfrac12 ab$, altså $a^2 + 2ab + b^2 = c^2 + 2ab$.`,
     `## Same area
The big square is the same, and the triangles are the same four. So the yellow area that is left must be equally large in both figures:
$$c^2 = a^2 + b^2 \\qquad \\blacksquare$$
With algebra: $(a + b)^2 = c^2 + 4\\cdot\\tfrac12 ab$, i.e. $a^2 + 2ab + b^2 = c^2 + 2ab$.`]],
   q: { at: 3, q: ["Hvorfor er det gule arealet det samme før og etter?", "Why is the yellow area the same before and after?"], opts: [["Det store kvadratet og de fire trekantene er de samme", "The big square and the four triangles are the same"], ["Fordi $a = b$", "Because $a = b$"], ["Fordi trekantene er likesidede", "Because the triangles are equilateral"], ["Det er det ikke", "It isn't"]],
     expl: ["Det som ikke er dekket, er alltid det store kvadratet minus fire like trekanter.", "What is not covered is always the big square minus four equal triangles."] } },

 { id: "gauss", ic: "🧮", t: ["1 + 2 + … + 100 på ti sekunder", "1 + 2 + … + 100 in ten seconds"], sub: ["Gauss' triks: to trapper blir et rektangel", "Gauss's trick: two staircases make a rectangle"],
   units: ["VGR2:1", "VGR2:7"],
   steps: [
    [`## Historien
Carl Friedrich Gauss var 9 år da læreren ba klassen legge sammen alle tallene fra 1 til 100, for å få fred en stund. Gauss svarte etter noen sekunder: **5050**.

Hvordan?`,
     `## The story
Carl Friedrich Gauss was 9 years old when his teacher asked the class to add all the numbers from 1 to 100, to get some peace. Gauss answered after a few seconds: **5050**.

How?`],
    [`## To like trapper
Tegn summen $1 + 2 + \\dots + n$ som en trapp av ruter. Legg en kopi opp-ned oppå. Sammen blir de et rektangel med $n$ kolonner og $n + 1$ rader.

![sim:gauss]`,
     `## Two equal staircases
Draw the sum $1 + 2 + \\dots + n$ as a staircase of squares. Place an upside-down copy on top. Together they form a rectangle with $n$ columns and $n + 1$ rows.

![sim:gauss]`],
    [`## Formelen
Rektangelet har $n(n + 1)$ ruter, og det er to trapper. Derfor er
$$1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2} \\qquad \\blacksquare$$
For $n = 100$: $\\dfrac{100 \\cdot 101}{2} = 5050$. Gauss parret $1 + 100$, $2 + 99$, … : 50 par som hver er 101.`,
     `## The formula
The rectangle has $n(n + 1)$ squares, and it consists of two staircases. Therefore
$$1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2} \\qquad \\blacksquare$$
For $n = 100$: $\\dfrac{100 \\cdot 101}{2} = 5050$. Gauss paired $1 + 100$, $2 + 99$, … : 50 pairs of 101 each.`]],
   q: { at: 3, q: ["Hva er $1 + 2 + \\dots + 20$?", "What is $1 + 2 + \\dots + 20$?"], opts: [["210", "210"], ["200", "200"], ["420", "420"], ["190", "190"]],
     expl: ["$\\dfrac{20 \\cdot 21}{2} = 210$.", "$\\dfrac{20 \\cdot 21}{2} = 210$."] } },

 { id: "geo", ic: "🔁", t: ["Summen av en geometrisk rekke", "The sum of a geometric series"], sub: ["Gang med k og trekk fra: nesten alt forsvinner", "Multiply by k and subtract: almost everything cancels"],
   units: ["VGR2:1", "VGS2:0", "VGS2:1"],
   steps: [
    [`## Summen vi vil finne
$$S_n = a + ak + ak^2 + \\dots + ak^{n - 1}$$
Hvert ledd er $k$ ganger det forrige. Rentesparing, lån og nedbetaling er slike summer.`,
     `## The sum we want
$$S_n = a + ak + ak^2 + \\dots + ak^{n - 1}$$
Each term is $k$ times the previous one. Savings with interest, loans and repayments are such sums.`],
    [`## Gang med k
$$kS_n = ak + ak^2 + \\dots + ak^{n - 1} + ak^n$$
Legg merke til at nesten alle leddene er de samme som i $S_n$. Bare det første og det siste skiller seg.`,
     `## Multiply by k
$$kS_n = ak + ak^2 + \\dots + ak^{n - 1} + ak^n$$
Notice that almost all the terms are the same as in $S_n$. Only the first and the last differ.`],
    [`## Trekk fra
$$S_n - kS_n = a - ak^n \\quad\\Rightarrow\\quad S_n = a\\cdot\\dfrac{1 - k^n}{1 - k} \\qquad \\blacksquare$$
Er $|k| < 1$, går $k^n$ mot 0, og den uendelige summen blir $\\dfrac{a}{1 - k}$. For eksempel er $1 + \\tfrac12 + \\tfrac14 + \\dots = 2$.

![sim:geoseries]`,
     `## Subtract
$$S_n - kS_n = a - ak^n \\quad\\Rightarrow\\quad S_n = a\\cdot\\dfrac{1 - k^n}{1 - k} \\qquad \\blacksquare$$
If $|k| < 1$, $k^n$ tends to 0, and the infinite sum becomes $\\dfrac{a}{1 - k}$. For example $1 + \\tfrac12 + \\tfrac14 + \\dots = 2$.

![sim:geoseries]`]],
   q: { at: 3, q: ["Hva er $1 + \\tfrac12 + \\tfrac14 + \\tfrac18 + \\dots$?", "What is $1 + \\tfrac12 + \\tfrac14 + \\tfrac18 + \\dots$?"], opts: [["2", "2"], ["Uendelig", "Infinite"], ["1", "1"], ["1,5", "1.5"]],
     expl: ["$a = 1$ og $k = \\tfrac12$: $\\dfrac{1}{1 - \\tfrac12} = 2$.", "$a = 1$ and $k = \\tfrac12$: $\\dfrac{1}{1 - \\tfrac12} = 2$."] } },

 { id: "prod", ic: "▭", t: ["Hvorfor ser produktregelen slik ut?", "Why does the product rule look like that?"], sub: ["uv er arealet av et rektangel", "uv is the area of a rectangle"],
   units: ["VGR1:5", "VGR1:1"],
   steps: [
    [`## Et rektangel som vokser
Tenk på $u(x)\\cdot v(x)$ som arealet av et rektangel med sider $u$ og $v$. Når $x$ øker litt ($\\Delta x$), vokser sidene med $\\Delta u$ og $\\Delta v$.

![sim:prodrule]`,
     `## A growing rectangle
Think of $u(x)\\cdot v(x)$ as the area of a rectangle with sides $u$ and $v$. When $x$ increases a little ($\\Delta x$), the sides grow by $\\Delta u$ and $\\Delta v$.

![sim:prodrule]`],
    [`## Tre nye biter
Det nye arealet består av tre biter:
$$\\Delta(uv) = \\Delta u\\cdot v + u\\cdot\\Delta v + \\Delta u\\,\\Delta v$$
Del på $\\Delta x$:
$$\\dfrac{\\Delta(uv)}{\\Delta x} = \\dfrac{\\Delta u}{\\Delta x}v + u\\dfrac{\\Delta v}{\\Delta x} + \\Delta u\\dfrac{\\Delta v}{\\Delta x}$$`,
     `## Three new pieces
The new area consists of three pieces:
$$\\Delta(uv) = \\Delta u\\cdot v + u\\cdot\\Delta v + \\Delta u\\,\\Delta v$$
Divide by $\\Delta x$:
$$\\dfrac{\\Delta(uv)}{\\Delta x} = \\dfrac{\\Delta u}{\\Delta x}v + u\\dfrac{\\Delta v}{\\Delta x} + \\Delta u\\dfrac{\\Delta v}{\\Delta x}$$`],
    [`## Hjørnet forsvinner
Når $\\Delta x \\to 0$, går $\\dfrac{\\Delta u}{\\Delta x} \\to u'$ og $\\dfrac{\\Delta v}{\\Delta x} \\to v'$. Men det siste leddet er $\\Delta u \\cdot \\dfrac{\\Delta v}{\\Delta x} \\to 0 \\cdot v' = 0$. Det lille hjørnet blir borte!
$$(uv)' = u'v + uv' \\qquad \\blacksquare$$`,
     `## The corner vanishes
As $\\Delta x \\to 0$, $\\dfrac{\\Delta u}{\\Delta x} \\to u'$ and $\\dfrac{\\Delta v}{\\Delta x} \\to v'$. But the last term is $\\Delta u \\cdot \\dfrac{\\Delta v}{\\Delta x} \\to 0 \\cdot v' = 0$. The small corner disappears!
$$(uv)' = u'v + uv' \\qquad \\blacksquare$$`]],
   q: { at: 3, q: ["Hvorfor forsvinner leddet $\\Delta u \\dfrac{\\Delta v}{\\Delta x}$?", "Why does the term $\\Delta u \\dfrac{\\Delta v}{\\Delta x}$ vanish?"], opts: [["$\\Delta u$ går mot 0, mens brøken går mot $v'$", "$\\Delta u$ tends to 0, while the fraction tends to $v'$"], ["Fordi $v' = 0$", "Because $v' = 0$"], ["Det forsvinner ikke", "It doesn't vanish"], ["Fordi $u = v$", "Because $u = v$"]],
     expl: ["Et tall som går mot 0 ganget med et tall som går mot $v'$, går mot 0.", "A number tending to 0 times a number tending to $v'$ tends to 0."] } },

 { id: "e", ic: "🌱", t: ["Hvorfor er $(e^x)' = e^x$?", "Why is $(e^x)' = e^x$?"], sub: ["Oppdag tallet e selv", "Discover the number e yourself"],
   units: ["VGR1:5", "VGR1:0", "GMAT:4"],
   steps: [
    [`## Eksponentialfunksjoner er spesielle
Bruk definisjonen av den deriverte på $a^x$:
$$(a^x)' = \\lim_{h \\to 0}\\dfrac{a^{x + h} - a^x}{h} = a^x\\cdot\\lim_{h \\to 0}\\dfrac{a^h - 1}{h}$$
Den deriverte er altså **funksjonen selv ganget med et tall** som bare avhenger av $a$.`,
     `## Exponential functions are special
Use the definition of the derivative on $a^x$:
$$(a^x)' = \\lim_{h \\to 0}\\dfrac{a^{x + h} - a^x}{h} = a^x\\cdot\\lim_{h \\to 0}\\dfrac{a^h - 1}{h}$$
So the derivative is **the function itself times a number** that depends only on $a$.`],
    [`## Finn grunntallet der tallet er 1
For $a = 2$ er tallet omtrent 0,693, og for $a = 3$ omtrent 1,099. Et sted mellom 2 og 3 finnes et grunntall der tallet er **akkurat 1**. Finn det:

![sim:elimit]`,
     `## Find the base where the number is 1
For $a = 2$ the number is about 0.693, and for $a = 3$ about 1.099. Somewhere between 2 and 3 there is a base where the number is **exactly 1**. Find it:

![sim:elimit]`],
    [`## Det er e
Grunntallet er $e = 2{,}71828\\ldots$ For det er
$$(e^x)' = e^x \\qquad \\blacksquare$$
Tallet for et vilkårlig grunntall er $\\ln a$, så $(a^x)' = \\ln a \\cdot a^x$. Derfor dukker $e$ og $\\ln$ opp overalt i vekst, renter og radioaktivitet.`,
     `## It is e
The base is $e = 2.71828\\ldots$ For it,
$$(e^x)' = e^x \\qquad \\blacksquare$$
The number for an arbitrary base is $\\ln a$, so $(a^x)' = \\ln a \\cdot a^x$. That is why $e$ and $\\ln$ show up everywhere in growth, interest and radioactivity.`]],
   q: { at: 3, q: ["Hva er $(2^x)'$?", "What is $(2^x)'$?"], opts: [["$\\ln 2 \\cdot 2^x$", "$\\ln 2 \\cdot 2^x$"], ["$x \\cdot 2^{x - 1}$", "$x \\cdot 2^{x - 1}$"], ["$2^x$", "$2^x$"], ["$\\dfrac{2^x}{\\ln 2}$", "$\\dfrac{2^x}{\\ln 2}$"]],
     expl: ["$(a^x)' = \\ln a \\cdot a^x$. Potensregelen $nx^{n-1}$ gjelder bare når $x$ står i grunntallet.", "$(a^x)' = \\ln a \\cdot a^x$. The power rule $nx^{n-1}$ only applies when $x$ is the base."] } },

 { id: "sine", ic: "🔺", t: ["Hvorfor stemmer sinussetningen?", "Why is the sine rule true?"], sub: ["Samme høyde regnet ut på to måter", "The same height calculated two ways"],
   units: ["VG1T:3", "GMAT:5"],
   steps: [
    [`## Tegn en høyde
Trekk en loddrett linje, høyden $h$, fra hjørnet $C$ ned på siden $c$. Da deles trekanten i to rettvinklede trekanter.`,
     `## Draw a height
Draw a perpendicular line, the height $h$, from the corner $C$ down to the side $c$. This splits the triangle into two right-angled triangles.`],
    [`## Regn ut h to ganger
I den venstre trekanten er $\\sin A = \\dfrac{h}{b}$, så $h = b\\sin A$.
I den høyre er $\\sin B = \\dfrac{h}{a}$, så $h = a\\sin B$.

![sim:sinerule]`,
     `## Calculate h twice
In the left triangle $\\sin A = \\dfrac{h}{b}$, so $h = b\\sin A$.
In the right one $\\sin B = \\dfrac{h}{a}$, so $h = a\\sin B$.

![sim:sinerule]`],
    [`## Sett dem like
$$b\\sin A = a\\sin B \\quad\\Rightarrow\\quad \\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$$
Med høyden fra et annet hjørne får du det samme for $c$ og $C$. $\\blacksquare$`,
     `## Set them equal
$$b\\sin A = a\\sin B \\quad\\Rightarrow\\quad \\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$$
With the height from another corner you get the same for $c$ and $C$. $\\blacksquare$`]],
   q: { at: 2, q: ["Hva er høyden $h$ uttrykt med $b$ og vinkelen $A$?", "What is the height $h$ in terms of $b$ and the angle $A$?"], opts: [["$b\\sin A$", "$b\\sin A$"], ["$b\\cos A$", "$b\\cos A$"], ["$\\dfrac{b}{\\sin A}$", "$\\dfrac{b}{\\sin A}$"], ["$a\\sin A$", "$a\\sin A$"]],
     expl: ["$\\sin A = $ motstående/hypotenus $= h/b$.", "$\\sin A = $ opposite/hypotenuse $= h/b$."] } },

 { id: "circle", ic: "🍕", t: ["Hvorfor er sirkelarealet πr²?", "Why is the area of a circle πr²?"], sub: ["Skjær sirkelen i kakestykker", "Cut the circle into slices"],
   units: ["GMAT:5", "VG1T:3"],
   steps: [
    [`## Omkretsen
$\\pi$ er definert som forholdet mellom omkretsen og diameteren. Omkretsen er derfor $2\\pi r$.`,
     `## The circumference
$\\pi$ is defined as the ratio between the circumference and the diameter. So the circumference is $2\\pi r$.`],
    [`## Kakestykker
Del sirkelen i mange like kakestykker, og legg dem annenhver vei. Jo flere biter, jo mer ligner figuren på et rektangel.

![sim:circlearea]`,
     `## Slices
Cut the circle into many equal slices and lay them alternately up and down. The more slices, the more the figure looks like a rectangle.

![sim:circlearea]`],
    [`## Rektangelet
Halve omkretsen ligger langs hver langside, så bredden er $\\pi r$. Høyden er radien $r$.
$$A = \\pi r\\cdot r = \\pi r^2 \\qquad \\blacksquare$$`,
     `## The rectangle
Half the circumference lies along each long side, so the width is $\\pi r$. The height is the radius $r$.
$$A = \\pi r\\cdot r = \\pi r^2 \\qquad \\blacksquare$$`]],
   q: { at: 3, q: ["Hvorfor er bredden på «rektangelet» $\\pi r$?", "Why is the width of the \"rectangle\" $\\pi r$?"], opts: [["Halve omkretsen $2\\pi r$ ligger langs hver side", "Half the circumference $2\\pi r$ lies along each side"], ["Fordi diameteren er $\\pi r$", "Because the diameter is $\\pi r$"], ["Fordi $\\pi \\approx 3$", "Because $\\pi \\approx 3$"], ["Den er egentlig $2r$", "It is really $2r$"]],
     expl: ["Buene fra annenhver bit danner overkanten og underkanten, og til sammen er de hele omkretsen.", "The arcs of alternate slices form the top and bottom edges, and together they make the whole circumference."] } },

 { id: "newton", ic: "🎯", t: ["Newtons metode: løs likninger med tangenter", "Newton's method: solve equations with tangents"], sub: ["Hvor kommer formelen $x - f/f'$ fra?", "Where does the formula $x - f/f'$ come from?"],
   units: ["MEK1000:3", "VGR1:5"],
   steps: [
    [`## Problemet
Mange likninger, som $x^2 = 2$ eller $e^x = 3x$, har ingen enkel formel. Newton hadde en idé: **bytt ut kurven med tangenten**, for der en rett linje krysser $x$-aksen, er lett å regne ut.`,
     `## The problem
Many equations, like $x^2 = 2$ or $e^x = 3x$, have no simple formula. Newton had an idea: **replace the curve with its tangent**, because where a straight line crosses the $x$-axis is easy to calculate.`],
    [`## Tangenten
Start med en gjetning $x_0$. Tangenten i $x_0$ er
$$y = f(x_0) + f'(x_0)(x - x_0)$$
Sett $y = 0$ og løs for $x$:
$$x_1 = x_0 - \\dfrac{f(x_0)}{f'(x_0)} \\qquad \\blacksquare$$`,
     `## The tangent
Start with a guess $x_0$. The tangent at $x_0$ is
$$y = f(x_0) + f'(x_0)(x - x_0)$$
Set $y = 0$ and solve for $x$:
$$x_1 = x_0 - \\dfrac{f(x_0)}{f'(x_0)} \\qquad \\blacksquare$$`],
    [`## Gjenta
Bruk $x_1$ som ny gjetning, og så videre. Antall riktige siffer omtrent **dobles** for hvert steg. For $x^2 - 2 = 0$ med $x_0 = 1$: $1{,}5$, $1{,}41667$, $1{,}4142157$ … og $\\sqrt 2 = 1{,}4142136$.

![sim:newton]`,
     `## Repeat
Use $x_1$ as the new guess, and so on. The number of correct digits roughly **doubles** with each step. For $x^2 - 2 = 0$ with $x_0 = 1$: $1.5$, $1.41667$, $1.4142157$ … and $\\sqrt 2 = 1.4142136$.

![sim:newton]`]],
   q: { at: 3, q: ["Hva skjer hvis $f'(x_n) = 0$?", "What happens if $f'(x_n) = 0$?"], opts: [["Tangenten er vannrett og treffer aldri $x$-aksen", "The tangent is horizontal and never meets the $x$-axis"], ["Da har vi funnet svaret", "Then we have found the answer"], ["Metoden går dobbelt så fort", "The method goes twice as fast"], ["Ingenting spesielt", "Nothing special"]],
     expl: ["Da deler vi på null. Velg en annen startverdi.", "Then we divide by zero. Choose another starting value."] } }
];
const pfById = id => PROOFS.find(p => p.id === id);
const proofsFor = (code, u) => PROOFS.filter(p => p.units.includes(code + ":" + u));
const pfDone = id => !!(S.gdDone || {})["proof:" + id];
function pfOpen(id, from){
  const p = pfById(id); if(!p) return;
  const cards = p.steps.map(s => ({ kind: "text", src: T(s[0], s[1]) }));
  if(p.q){ const opts = shuffle(p.q.opts.map((o, i) => ({ t: T(o[0], o[1]), ok: i === 0 })));
    cards.splice(Math.min(p.q.at ?? cards.length, cards.length), 0, { kind: "q", it: { prompt: T(p.q.q[0], p.q.q[1]), opts, expl: T(p.q.expl[0], p.q.expl[1]) }, wrong: [], done: false }); }
  cards.push({ kind: "end" });
  GD = { proof: id, code: null, u: null, go: null, cards, i: 0, from: from || screen, right: 0, asked: p.q ? 1 : 0 };
  overlay = null; screen = "guided"; render(); window.scrollTo(0, 0);
}
// Neste bevis man ikke har lest (i samme rekkefølge som lista).
const pfNext = id => { const i = PROOFS.findIndex(p => p.id === id); return PROOFS.slice(i + 1).concat(PROOFS.slice(0, i)).find(p => !pfDone(p.id)) || null; };
function pfCardHTML(p){
  return `<button class="pf-card ${pfDone(p.id) ? "done" : ""}" data-a="pfopen" data-id="${p.id}"><span class="pf-ic" aria-hidden="true">${p.ic}</span>
    <span class="pf-tx"><b>${rich(T(p.t[0], p.t[1]))}</b><small>${rich(T(p.sub[0], p.sub[1]))}</small></span>${pfDone(p.id) ? `<em class="pf-ok" aria-label="${esc(t("pfRead"))}">∎</em>` : I.chevron}</button>`;
}
function renderProofs(){
  const n = PROOFS.filter(p => pfDone(p.id)).length;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="pfback" aria-label="${esc(t("back"))}">${I.left}</button>
      <div class="th-t"><small>${esc(t("pfKicker"))}</small><b>${esc(t("pfTitle"))}</b></div><span class="pf-count">${n}/${PROOFS.length}</span></div></div>
    <main class="wrap pf-list"><p class="pf-intro">${esc(t("pfIntro"))}</p>
      <div class="pf-bar"><i style="width:${(n / PROOFS.length * 100).toFixed(0)}%"></i></div>${PROOFS.map(pfCardHTML).join("")}</main>`;
}
function pfClick(a, b){
  if(!a.startsWith("pf")) return false;
  if(a === "pflist"){ screen = "proofs"; render(); window.scrollTo(0, 0); }
  else if(a === "pfopen"){ pfOpen(b.dataset.id, screen === "guided" ? "proofs" : screen); }
  else if(a === "pfback"){ openBook(); }
  else return false;
  return true;
}
// Knapper på teorisiden: «Hvorfor? Se beviset».
function pfTheoryHTML(code, u){
  const ps = proofsFor(code, u); if(!ps.length) return "";
  return `<div class="pf-links">${ps.map(p => `<button class="pf-link ${pfDone(p.id) ? "done" : ""}" data-a="pfopen" data-id="${p.id}"><span aria-hidden="true">${p.ic}</span><span><small>${esc(t("pfWhy"))}</small><b>${rich(T(p.t[0], p.t[1]))}</b></span>${pfDone(p.id) ? "∎" : I.chevron}</button>`).join("")}</div>`;
}
