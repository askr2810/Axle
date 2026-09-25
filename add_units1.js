// ============================================================
//  add_units1.js – nye enheter i eksisterende fag:
//  MEK1000 Anvendelser av derivasjon, MAPE1300 Arbeid, energi og impuls,
//  MEK1300 Filer, feil og moduler.
//  Alt ligger i en IIFE slik at hjelpefunksjonene ikke kolliderer med andre add_-filer.
// ============================================================
(() => {
// md`...`: rå tekst (enkle backslasher), ´ blir til backtick. Brukes uten ${}-interpolasjon.
const md = s => s.raw[0].replace(/´/g, "`");
const CB = s => "```\n" + s + "\n```";
const S = String.raw;

// ================= MEK1000: Anvendelser av derivasjon =================
{
const U = ADDUNIT("MEK1000", "Anvendelser av derivasjon", "Applications of derivatives");
THEORY("MEK1000", U, {
nb: md`## Hva handler det om?
Den deriverte forteller hvor fort noe endrer seg. Det kan du bruke til tre ting ingeniører gjør hele tiden: finne den største eller minste verdien (optimering), anslå en verdi raskt (lineær tilnærming) og løse ligninger med tall (Newtons metode).

## Begreper og formler
- **Kritisk punkt:** der $f'(x) = 0$. Her kan funksjonen ha et toppunkt eller et bunnpunkt.
- **Andrederiverttesten:** $f''(x_0) > 0$ gir bunnpunkt (grafen smiler), $f''(x_0) < 0$ gir toppunkt (grafen er sur).
- På et lukket intervall $[a, b]$ må du sjekke de kritiske punktene **og** endepunktene.
- **Lineær tilnærming** nær $x = a$: bytt kurven ut med tangenten.
$$f(x) \approx f(a) + f'(a)\,(x - a)$$
- **Newtons metode** for å løse $f(x) = 0$: start med en gjetning $x_0$ og forbedre den gang på gang.
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
- **Relaterte hastigheter:** når to størrelser henger sammen, henger også endringsratene sammen. Deriver sammenhengen med hensyn på tiden $t$ (kjerneregelen).

## Slik løser du oppgavene
1. Skriv størrelsen du vil gjøre størst eller minst, som en funksjon av **én** variabel. Bruk betingelsen i oppgaven til å fjerne de andre.
2. Deriver og sett $f'(x) = 0$.
3. Sjekk at du har et toppunkt eller bunnpunkt (fortegnslinje eller $f''$), og sjekk endepunktene.
4. Svar på det oppgaven faktisk spør om, for eksempel arealet og ikke bare $x$.

### Eksempel
Et rektangulært område langs en elv skal gjerdes inn. Langs elva trengs ikke gjerde, så du trenger gjerde på tre sider. Du har 100 m gjerde. Hvor stort kan området bli?
1. Kall sidene vinkelrett på elva $x$ (to stykker) og siden langs elva $y$. Da er $2x + y = 100$, så $y = 100 - 2x$.
2. Arealet er $A(x) = x(100 - 2x) = 100x - 2x^2$.
3. $A'(x) = 100 - 4x = 0$ gir $x = 25$ m. $A''(x) = -4 < 0$, så det er et toppunkt.
4. Da er $y = 50$ m og $A = 25\cdot 50 = 1250$ m².

## Vanlige feil
- Å glemme endepunktene når variabelen er begrenset til et intervall.
- Å derivere før du har redusert til én variabel.
- Å svare med $x$-verdien når oppgaven spør etter arealet, eller omvendt.
- I Newtons metode: å snu fortegnet ($x_n + f/f'$), eller starte i et punkt der $f'(x_0) = 0$.

> Optimering: én variabel → deriver → sett lik null → sjekk topp/bunn og endepunkter.
> Lineær tilnærming: bytt kurven med tangenten, $f(a) + f'(a)(x - a)$.`,
en: md`## What is it about?
The derivative tells you how fast something changes. Engineers use this for three things all the time: finding the largest or smallest value (optimization), estimating a value quickly (linear approximation) and solving equations numerically (Newton's method).

## Concepts and formulas
- **Critical point:** where $f'(x) = 0$. The function may have a maximum or a minimum here.
- **Second derivative test:** $f''(x_0) > 0$ gives a minimum (the graph smiles), $f''(x_0) < 0$ gives a maximum (the graph frowns).
- On a closed interval $[a, b]$ you must check the critical points **and** the end points.
- **Linear approximation** near $x = a$: replace the curve by its tangent line.
$$f(x) \approx f(a) + f'(a)\,(x - a)$$
- **Newton's method** for solving $f(x) = 0$: start with a guess $x_0$ and improve it again and again.
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
- **Related rates:** when two quantities are linked, their rates of change are linked too. Differentiate the relation with respect to time $t$ (chain rule).

## How to solve the problems
1. Write the quantity you want to maximize or minimize as a function of **one** variable. Use the condition in the problem to eliminate the others.
2. Differentiate and set $f'(x) = 0$.
3. Check that you have a maximum or minimum (sign chart or $f''$), and check the end points.
4. Answer what the problem actually asks for, for example the area and not just $x$.

### Example
A rectangular area along a river is to be fenced in. No fence is needed along the river, so you need fence on three sides. You have 100 m of fence. How large can the area be?
1. Call the sides perpendicular to the river $x$ (two of them) and the side along the river $y$. Then $2x + y = 100$, so $y = 100 - 2x$.
2. The area is $A(x) = x(100 - 2x) = 100x - 2x^2$.
3. $A'(x) = 100 - 4x = 0$ gives $x = 25$ m. $A''(x) = -4 < 0$, so it is a maximum.
4. Then $y = 50$ m and $A = 25\cdot 50 = 1250$ m².

## Common mistakes
- Forgetting the end points when the variable is limited to an interval.
- Differentiating before reducing to one variable.
- Answering with the $x$-value when the problem asks for the area, or the other way round.
- In Newton's method: flipping the sign ($x_n + f/f'$), or starting at a point where $f'(x_0) = 0$.

> Optimization: one variable → differentiate → set to zero → check max/min and end points.
> Linear approximation: replace the curve by the tangent, $f(a) + f'(a)(x - a)$.`
});
BIQ("MEK1000", U, [
  [S`Funksjonen $f$ har $f'(2) = 0$ og $f''(2) = 5$. Hva har $f$ i $x = 2$?`,
   ["Et bunnpunkt", "Et toppunkt", "Et vendepunkt", "Det kan vi ikke si noe om"],
   S`$f'(2) = 0$ betyr at tangenten er vannrett, og $f''(2) > 0$ betyr at grafen krummer oppover (smiler). Da er $x = 2$ et bunnpunkt.`,
   S`The function $f$ has $f'(2) = 0$ and $f''(2) = 5$. What does $f$ have at $x = 2$?`,
   ["A minimum", "A maximum", "An inflection point", "We cannot tell"],
   S`$f'(2) = 0$ means the tangent is horizontal, and $f''(2) > 0$ means the graph curves upwards (smiles). So $x = 2$ is a minimum.`],
  [S`Hva er den største verdien til $f(x) = -x^2 + 6x + 1$?`,
   { n: 10, tol: 0.01, u: "" },
   S`$f'(x) = -2x + 6 = 0$ gir $x = 3$. Siden $f''(x) = -2 < 0$ er det et toppunkt: $f(3) = -9 + 18 + 1 = 10$.`,
   S`What is the largest value of $f(x) = -x^2 + 6x + 1$?`, null,
   S`$f'(x) = -2x + 6 = 0$ gives $x = 3$. Since $f''(x) = -2 < 0$ it is a maximum: $f(3) = -9 + 18 + 1 = 10$.`],
  [S`Bruk lineær tilnærming av $f(x) = \sqrt{x}$ rundt $x = 4$ til å anslå $\sqrt{4{,}1}$.`,
   { n: 2.025, tol: 0.0005, u: "" },
   S`$f(4) = 2$ og $f'(x) = \dfrac{1}{2\sqrt x}$, så $f'(4) = \dfrac14$. Da er $\sqrt{4{,}1} \approx 2 + \dfrac14\cdot 0{,}1 = 2{,}025$. (Eksakt verdi: $2{,}0248\ldots$)`,
   S`Use a linear approximation of $f(x) = \sqrt{x}$ around $x = 4$ to estimate $\sqrt{4.1}$.`, null,
   S`$f(4) = 2$ and $f'(x) = \dfrac{1}{2\sqrt x}$, so $f'(4) = \dfrac14$. Then $\sqrt{4.1} \approx 2 + \dfrac14\cdot 0.1 = 2.025$. (Exact value: $2.0248\ldots$)`],
  [S`Du løser $x^2 - 2 = 0$ med Newtons metode og starter i $x_0 = 1$. Hva blir $x_1$?`,
   { n: 1.5, tol: 0.001, u: "" },
   S`$f(x) = x^2 - 2$ og $f'(x) = 2x$. $x_1 = x_0 - \dfrac{f(x_0)}{f'(x_0)} = 1 - \dfrac{-1}{2} = 1{,}5$. (Riktig svar er $\sqrt2 \approx 1{,}414$, så ett steg kommer allerede ganske nær.)`,
   S`You solve $x^2 - 2 = 0$ with Newton's method starting at $x_0 = 1$. What is $x_1$?`, null,
   S`$f(x) = x^2 - 2$ and $f'(x) = 2x$. $x_1 = x_0 - \dfrac{f(x_0)}{f'(x_0)} = 1 - \dfrac{-1}{2} = 1.5$. (The true answer is $\sqrt2 \approx 1.414$, so one step already gets quite close.)`],
  ["Hvorfor må du sjekke endepunktene når du leter etter største verdi på et lukket intervall?",
   ["Største verdi kan ligge i et endepunkt, der den deriverte ikke trenger å være null", "Fordi den deriverte alltid er null i endepunktene", "Fordi funksjonen ikke er definert inne i intervallet", "Det trenger du ikke"],
   S`$f'(x) = 0$ finner bare topper og bunner **inne** i intervallet. En funksjon som vokser hele veien, har største verdi i høyre endepunkt, selv om $f'$ aldri er null der.`,
   "Why must you check the end points when looking for the largest value on a closed interval?",
   ["The largest value may be at an end point, where the derivative need not be zero", "Because the derivative is always zero at the end points", "Because the function is not defined inside the interval", "You don't need to"],
   S`$f'(x) = 0$ only finds peaks and valleys **inside** the interval. A function that increases all the way has its largest value at the right end point, even though $f'$ is never zero there.`],
  ["To positive tall har summen 20. Hva er det største produktet de kan ha?",
   { n: 100, tol: 0.01, u: "" },
   S`Kall tallene $x$ og $20 - x$. Produktet er $P(x) = x(20 - x) = 20x - x^2$. $P'(x) = 20 - 2x = 0$ gir $x = 10$, så begge tallene er 10 og produktet er $P = 100$.`,
   "Two positive numbers add up to 20. What is the largest product they can have?", null,
   S`Call the numbers $x$ and $20 - x$. The product is $P(x) = x(20 - x) = 20x - x^2$. $P'(x) = 20 - 2x = 0$ gives $x = 10$, so both numbers are 10 and the product is $P = 100$.`],
  [S`Radien i en sirkel vokser med 2 cm/s. Hvor fort vokser arealet når radien er 5 cm?`,
   { n: 20 * Math.PI, tol: 0.1, u: "cm²/s" },
   S`$A = \pi r^2$. Deriver med hensyn på tiden: $\dfrac{dA}{dt} = 2\pi r\,\dfrac{dr}{dt} = 2\pi\cdot 5\cdot 2 = 20\pi \approx 62{,}83$ cm²/s.`,
   S`The radius of a circle grows by 2 cm/s. How fast does the area grow when the radius is 5 cm?`, null,
   S`$A = \pi r^2$. Differentiate with respect to time: $\dfrac{dA}{dt} = 2\pi r\,\dfrac{dr}{dt} = 2\pi\cdot 5\cdot 2 = 20\pi \approx 62.83$ cm²/s.`],
  ["Når går Newtons metode garantert galt i ett steg?",
   [S`Når $f'(x_n) = 0$`, S`Når $f(x_n) = 0$`, S`Når $x_n$ er negativ`, "Når funksjonen er et polynom"],
   S`Da må du dele på null i $x_{n+1} = x_n - f(x_n)/f'(x_n)$: tangenten er vannrett og treffer aldri $x$-aksen. Er $f(x_n) = 0$ har du tvert imot allerede funnet løsningen.`,
   "When does Newton's method certainly fail in one step?",
   [S`When $f'(x_n) = 0$`, S`When $f(x_n) = 0$`, S`When $x_n$ is negative`, "When the function is a polynomial"],
   S`Then you must divide by zero in $x_{n+1} = x_n - f(x_n)/f'(x_n)$: the tangent is horizontal and never meets the $x$-axis. If $f(x_n) = 0$, on the other hand, you have already found the solution.`]
]);
GEN("MEK1000", U,
 () => { const a = R.i(1, 4), x0 = R.i(1, 6), b = 2 * a * x0, c = R.i(-5, 12), fx = -a * x0 * x0 + b * x0 + c;
   return [T(S`Hva er den største verdien til $f(x) = -${a === 1 ? "" : a}x^2 + ${b}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}$?`,
             S`What is the largest value of $f(x) = -${a === 1 ? "" : a}x^2 + ${b}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}$?`),
     { n: fx, tol: 0.01, u: "" },
     T(S`$f'(x) = -${2 * a}x + ${b} = 0$ gir $x = ${x0}$. $f''(x) < 0$, så det er et toppunkt: $f(${x0}) = ${fx}$.`,
       S`$f'(x) = -${2 * a}x + ${b} = 0$ gives $x = ${x0}$. $f''(x) < 0$, so it is a maximum: $f(${x0}) = ${fx}$.`)]; },
 () => { const L = R.p([40, 60, 80, 100, 120, 160, 200, 240, 300]), x = L / 4, y = L / 2, A = x * y;
   return [T(`Et rektangulært område langs en rett elv skal gjerdes inn på tre sider (ikke langs elva). Du har ${L} m gjerde. Hvor stort kan arealet bli?`,
             `A rectangular area along a straight river is fenced on three sides (not along the river). You have ${L} m of fence. How large can the area be?`),
     { n: A, tol: rel(A), u: "m²" },
     T(S`Med sidene $x$ (to stykker) og $y$: $y = ${L} - 2x$ og $A = x(${L} - 2x)$. $A' = ${L} - 4x = 0$ gir $x = ${mf(x)}$ m og $y = ${mf(y)}$ m, så $A = ${mf(A)}$ m².`,
       S`With sides $x$ (two of them) and $y$: $y = ${L} - 2x$ and $A = x(${L} - 2x)$. $A' = ${L} - 4x = 0$ gives $x = ${mf(x)}$ m and $y = ${mf(y)}$ m, so $A = ${mf(A)}$ m².`)]; },
 () => { const a = R.i(2, 10), h = R.f(0.1, 0.9, 0.1), est = a + h / (2 * a);
   return [T(S`Bruk lineær tilnærming av $\sqrt x$ rundt $x = ${a * a}$ til å anslå $\sqrt{${mf(a * a + h)}}$.`,
             S`Use a linear approximation of $\sqrt x$ around $x = ${a * a}$ to estimate $\sqrt{${mf(a * a + h)}}$.`),
     { n: est, tol: 0.0005, u: "" },
     T(S`$f(${a * a}) = ${a}$ og $f'(x) = \dfrac{1}{2\sqrt x}$, så $f'(${a * a}) = \dfrac{1}{${2 * a}}$. Anslag: $${a} + \dfrac{${mf(h)}}{${2 * a}} \approx ${mf(est, 4)}$.`,
       S`$f(${a * a}) = ${a}$ and $f'(x) = \dfrac{1}{2\sqrt x}$, so $f'(${a * a}) = \dfrac{1}{${2 * a}}$. Estimate: $${a} + \dfrac{${mf(h)}}{${2 * a}} \approx ${mf(est, 4)}$.`)]; },
 () => { let N; do { N = R.i(5, 60); } while (Number.isInteger(Math.sqrt(N))); const x0 = Math.round(Math.sqrt(N)), x1 = x0 - (x0 * x0 - N) / (2 * x0);
   return [T(S`Du løser $x^2 - ${N} = 0$ med Newtons metode og starter i $x_0 = ${x0}$. Hva blir $x_1$?`,
             S`You solve $x^2 - ${N} = 0$ with Newton's method starting at $x_0 = ${x0}$. What is $x_1$?`),
     { n: x1, tol: 0.001, u: "" },
     S`$x_1 = x_0 - \dfrac{x_0^2 - ${N}}{2x_0} = ${x0} - \dfrac{${x0 * x0 - N}}{${2 * x0}} \approx ${mf(x1, 4)}$.`]; },
 () => { const dr = R.p([0.5, 1, 1.5, 2, 3]), r = R.i(2, 20), dA = 2 * Math.PI * r * dr;
   return [T(`Radien i en sirkulær oljeflekk vokser med ${nf(dr)} cm/s. Hvor fort vokser arealet når radien er ${r} cm?`,
             `The radius of a circular oil spill grows by ${nf(dr)} cm/s. How fast does the area grow when the radius is ${r} cm?`),
     { n: dA, tol: rel(dA), u: "cm²/s" },
     S`$\dfrac{dA}{dt} = 2\pi r\,\dfrac{dr}{dt} = 2\pi\cdot ${r}\cdot ${mf(dr)} \approx ${mf(dA, 1)}$ cm²/s.`]; }
);
}

// ================= MAPE1300: Arbeid, energi og impuls =================
{
const U = ADDUNIT("MAPE1300", "Arbeid, energi og impuls", "Work, energy and momentum");
THEORY("MAPE1300", U, {
nb: md`## Hva handler det om?
Newtons lover kan brukes direkte, men ofte er det mye enklere å regne med **energi** og **bevegelsesmengde**. Da slipper du å følge bevegelsen i detalj: du sammenligner bare før og etter. Spørsmål som «hvor fort går vogna i bunnen av bakken?» eller «hvor fort beveger bilene seg etter kollisjonen?» løses på noen linjer.

## Begreper og formler
- **Arbeid:** en kraft $F$ som flytter noe strekningen $s$, gjør arbeidet $W = F s\cos\theta$, der $\theta$ er vinkelen mellom kraften og bevegelsen. Står kraften vinkelrett på bevegelsen, er arbeidet null.
- **Kinetisk energi** (bevegelsesenergi) og **potensiell energi** (stillingsenergi):
$$E_k = \tfrac12 m v^2, \qquad E_p = m g h$$
- **Energibevaring** uten friksjon: $E_k + E_p$ er konstant. Med friksjon går energi tapt som varme: $W_f = \mu m g\, s$ på et vannrett underlag.
- **Effekt** er arbeid per tid: $P = W/t = F v$ (watt, W).
- **Bevegelsesmengde** og **impuls**:
$$p = m v, \qquad J = F\,\Delta t = \Delta p$$
- I et isolert system er den totale bevegelsesmengden bevart i **alle** støt. Den kinetiske energien er bare bevart i fullstendig elastiske støt.
- **Fullstendig uelastisk støt** (legemene henger sammen etterpå):
$$v = \frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$$

## Slik løser du oppgavene
1. Velg metode: spør oppgaven om fart og høyde, bruk energi. Spør den om et støt eller en kort, kraftig kraft, bruk bevegelsesmengde og impuls.
2. Skriv opp situasjonen **før** og **etter**.
3. Energi: $E_{k,før} + E_{p,før} = E_{k,etter} + E_{p,etter} + W_f$. Bevegelsesmengde: $\sum p_{før} = \sum p_{etter}$.
4. Velg positiv retning og husk fortegn på farter.

### Eksempel
En kloss glir uten friksjon ned en skråning som er 2 m høy. Hvor stor fart har den i bunnen?
1. Før: $E_p = mgh$, $E_k = 0$. Etter: $E_p = 0$, $E_k = \tfrac12 m v^2$.
2. $mgh = \tfrac12 m v^2$ gir $v = \sqrt{2gh} = \sqrt{2\cdot 9{,}81\cdot 2} \approx 6{,}26$ m/s.
3. Massen og vinkelen på skråningen spiller ingen rolle.

## Vanlige feil
- Å bruke energibevaring i et uelastisk støt. Der går energi tapt, bruk bevegelsesmengde.
- Å glemme fortegnet: en ball som spretter tilbake, endrer bevegelsesmengde med $m(v_1 + v_2)$, ikke $m(v_1 - v_2)$.
- Å regne arbeid for en kraft som står vinkelrett på bevegelsen (normalkraften gjør ikke arbeid).
- Å blande kJ og J.

> Fart og høyde: bruk energi. Støt: bruk bevegelsesmengde (den er alltid bevart).`,
en: md`## What is it about?
Newton's laws can be used directly, but it is often much easier to work with **energy** and **momentum**. Then you don't have to follow the motion in detail: you just compare before and after. Questions like "how fast is the cart at the bottom of the hill?" or "how fast do the cars move after the collision?" are solved in a few lines.

## Concepts and formulas
- **Work:** a force $F$ that moves something a distance $s$ does the work $W = F s\cos\theta$, where $\theta$ is the angle between the force and the motion. If the force is perpendicular to the motion, the work is zero.
- **Kinetic energy** and **potential energy**:
$$E_k = \tfrac12 m v^2, \qquad E_p = m g h$$
- **Conservation of energy** without friction: $E_k + E_p$ is constant. With friction, energy is lost as heat: $W_f = \mu m g\, s$ on a horizontal surface.
- **Power** is work per time: $P = W/t = F v$ (watts, W).
- **Momentum** and **impulse**:
$$p = m v, \qquad J = F\,\Delta t = \Delta p$$
- In an isolated system the total momentum is conserved in **all** collisions. Kinetic energy is only conserved in perfectly elastic collisions.
- **Perfectly inelastic collision** (the bodies stick together afterwards):
$$v = \frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$$

## How to solve the problems
1. Choose a method: if the problem asks about speed and height, use energy. If it is about a collision or a short, strong force, use momentum and impulse.
2. Write down the situation **before** and **after**.
3. Energy: $E_{k,before} + E_{p,before} = E_{k,after} + E_{p,after} + W_f$. Momentum: $\sum p_{before} = \sum p_{after}$.
4. Choose a positive direction and keep track of the signs of velocities.

### Example
A block slides without friction down a slope that is 2 m high. What is its speed at the bottom?
1. Before: $E_p = mgh$, $E_k = 0$. After: $E_p = 0$, $E_k = \tfrac12 m v^2$.
2. $mgh = \tfrac12 m v^2$ gives $v = \sqrt{2gh} = \sqrt{2\cdot 9.81\cdot 2} \approx 6.26$ m/s.
3. The mass and the angle of the slope do not matter.

## Common mistakes
- Using conservation of energy in an inelastic collision. Energy is lost there, use momentum.
- Forgetting the sign: a ball that bounces back changes its momentum by $m(v_1 + v_2)$, not $m(v_1 - v_2)$.
- Computing work for a force that is perpendicular to the motion (the normal force does no work).
- Mixing kJ and J.

> Speed and height: use energy. Collisions: use momentum (it is always conserved).`
});
BIQ("MAPE1300", U, [
  ["En bil på 1200 kg akselererer fra 0 til 20 m/s. Hvor stor kinetisk energi har den da?",
   { n: 240, tol: 0.5, u: "kJ" },
   S`$E_k = \tfrac12 m v^2 = \tfrac12\cdot 1200\cdot 20^2 = 240\,000$ J $= 240$ kJ.`,
   "A car of 1200 kg accelerates from 0 to 20 m/s. How much kinetic energy does it have then?", null,
   S`$E_k = \tfrac12 m v^2 = \tfrac12\cdot 1200\cdot 20^2 = 240\,000$ J $= 240$ kJ.`],
  ["En stein faller fritt fra 5 m høyde. Hvor stor fart har den like før den treffer bakken (se bort fra luftmotstand)?",
   { n: Math.sqrt(2 * 9.81 * 5), tol: 0.05, u: "m/s" },
   S`Energibevaring: $mgh = \tfrac12 mv^2$, så $v = \sqrt{2gh} = \sqrt{2\cdot 9{,}81\cdot 5} \approx 9{,}90$ m/s.`,
   "A stone falls freely from a height of 5 m. What is its speed just before it hits the ground (ignore air resistance)?", null,
   S`Conservation of energy: $mgh = \tfrac12 mv^2$, so $v = \sqrt{2gh} = \sqrt{2\cdot 9.81\cdot 5} \approx 9.90$ m/s.`],
  ["En kloss glir bortover et vannrett gulv. Hvor mye arbeid gjør normalkraften fra gulvet?",
   ["Null, fordi kraften står vinkelrett på bevegelsen", "Positivt arbeid, fordi kraften peker oppover", "Negativt arbeid, fordi den bremser klossen", S`$mgs$, der $s$ er strekningen`],
   S`$W = Fs\cos\theta$ med $\theta = 90^\circ$ gir $\cos 90^\circ = 0$. Normalkraften gjør derfor ikke arbeid. Det er friksjonen som bremser.`,
   "A block slides along a horizontal floor. How much work does the normal force from the floor do?",
   ["Zero, because the force is perpendicular to the motion", "Positive work, because the force points upwards", "Negative work, because it slows the block down", S`$mgs$, where $s$ is the distance`],
   S`$W = Fs\cos\theta$ with $\theta = 90^\circ$ gives $\cos 90^\circ = 0$. So the normal force does no work. It is friction that slows the block down.`],
  ["En kran løfter 500 kg 10 m opp på 20 s med konstant fart. Hvor stor effekt må kranen gi (se bort fra tap)?",
   { n: 2452.5, tol: 5, u: "W" },
   S`Arbeidet er $W = mgh = 500\cdot 9{,}81\cdot 10 = 49\,050$ J. Effekten er $P = W/t = 49\,050/20 = 2452{,}5$ W, altså omtrent 2,5 kW.`,
   "A crane lifts 500 kg 10 m up in 20 s at constant speed. How much power must the crane deliver (ignore losses)?", null,
   S`The work is $W = mgh = 500\cdot 9.81\cdot 10 = 49\,050$ J. The power is $P = W/t = 49\,050/20 = 2452.5$ W, about 2.5 kW.`],
  ["En vogn på 2 kg med fart 3 m/s kolliderer med en vogn på 1 kg som står i ro, og de henger sammen etterpå. Hvor stor fart har de etter støtet?",
   { n: 2, tol: 0.01, u: "m/s" },
   S`Bevegelsesmengden er bevart: $v = \dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \dfrac{2\cdot 3 + 1\cdot 0}{3} = 2$ m/s.`,
   "A 2 kg cart moving at 3 m/s collides with a 1 kg cart at rest, and they stick together. What is their speed after the collision?", null,
   S`Momentum is conserved: $v = \dfrac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \dfrac{2\cdot 3 + 1\cdot 0}{3} = 2$ m/s.`],
  ["En ball på 0,15 kg kommer mot et balltre med 40 m/s og går tilbake med 30 m/s. Hvor stor er impulsen fra balltreet (tallverdi)?",
   { n: 10.5, tol: 0.05, u: "Ns" },
   S`Velg retningen tilbake som positiv. $\Delta p = m(v_2 - v_1) = 0{,}15\,(30 - (-40)) = 0{,}15\cdot 70 = 10{,}5$ Ns.`,
   "A 0.15 kg ball comes towards a bat at 40 m/s and goes back at 30 m/s. What is the magnitude of the impulse from the bat?", null,
   S`Choose the backward direction as positive. $\Delta p = m(v_2 - v_1) = 0.15\,(30 - (-40)) = 0.15\cdot 70 = 10.5$ Ns.`],
  ["Hva er alltid bevart i et støt mellom to legemer når ingen ytre krefter virker?",
   ["Den totale bevegelsesmengden", "Den totale kinetiske energien", "Farten til hvert av legemene", "Både bevegelsesmengden og den kinetiske energien"],
   S`Bevegelsesmengden er bevart i alle støt. Kinetisk energi er bare bevart i fullstendig elastiske støt. I andre støt blir noe til varme, lyd og deformasjon.`,
   "What is always conserved in a collision between two bodies when no external forces act?",
   ["The total momentum", "The total kinetic energy", "The speed of each body", "Both momentum and kinetic energy"],
   S`Momentum is conserved in all collisions. Kinetic energy is only conserved in perfectly elastic collisions. In other collisions some of it turns into heat, sound and deformation.`],
  [S`En kasse på 20 kg skyves 5 m bortover et gulv med friksjonstall $\mu = 0{,}3$. Hvor mye energi går tapt til friksjon?`,
   { n: 294.3, tol: 0.5, u: "J" },
   S`Friksjonskraften er $R = \mu mg = 0{,}3\cdot 20\cdot 9{,}81 = 58{,}86$ N. Arbeidet er $W_f = R s = 58{,}86\cdot 5 = 294{,}3$ J.`,
   S`A 20 kg box is pushed 5 m along a floor with friction coefficient $\mu = 0.3$. How much energy is lost to friction?`, null,
   S`The friction force is $R = \mu mg = 0.3\cdot 20\cdot 9.81 = 58.86$ N. The work is $W_f = R s = 58.86\cdot 5 = 294.3$ J.`]
]);
GEN("MAPE1300", U,
 () => { const m = R.p([800, 1000, 1200, 1500, 1800, 2000]), v = R.i(5, 35), E = 0.5 * m * v * v / 1000;
   return [T(`En bil på ${m} kg kjører i ${v} m/s. Hvor stor kinetisk energi har den?`, `A car of ${m} kg drives at ${v} m/s. How much kinetic energy does it have?`),
     { n: E, tol: rel(E), u: "kJ" },
     S`$E_k = \tfrac12 m v^2 = \tfrac12\cdot ${m}\cdot ${v}^2 = ${mf(E * 1000, 0)}$ J $\approx ${mf(E, 1)}$ kJ.`]; },
 () => { const h = R.f(0.5, 25, 0.5), v = Math.sqrt(2 * G_ * h);
   return [T(`En vogn starter i ro og ruller uten friksjon ned en bakke som er ${nf(h)} m høy. Hvor stor fart har den i bunnen?`,
             `A cart starts at rest and rolls without friction down a hill that is ${nf(h)} m high. What is its speed at the bottom?`),
     { n: v, tol: rel(v), u: "m/s" },
     T(S`$mgh = \tfrac12 mv^2$ gir $v = \sqrt{2gh} = \sqrt{2\cdot 9{,}81\cdot ${mf(h)}} \approx ${mf(v)}$ m/s.`,
       S`$mgh = \tfrac12 mv^2$ gives $v = \sqrt{2gh} = \sqrt{2\cdot 9.81\cdot ${mf(h)}} \approx ${mf(v)}$ m/s.`)]; },
 () => { const m = R.p([50, 100, 200, 250, 400, 500, 800, 1000]), h = R.i(2, 30), t = R.i(4, 60), P = m * G_ * h / t;
   return [T(`En heis løfter ${m} kg ${h} m opp på ${t} s med konstant fart. Hvor stor effekt trengs (se bort fra tap)?`,
             `A lift raises ${m} kg ${h} m in ${t} s at constant speed. How much power is needed (ignore losses)?`),
     { n: P, tol: rel(P), u: "W" },
     T(S`$P = \dfrac{mgh}{t} = \dfrac{${m}\cdot 9{,}81\cdot ${h}}{${t}} \approx ${mf(P, 0)}$ W.`,
       S`$P = \dfrac{mgh}{t} = \dfrac{${m}\cdot 9.81\cdot ${h}}{${t}} \approx ${mf(P, 0)}$ W.`)]; },
 () => { const m1 = R.f(0.5, 5, 0.5), v1 = R.f(1, 8, 0.5), m2 = R.f(0.5, 5, 0.5), v = m1 * v1 / (m1 + m2);
   return [T(`En vogn på ${nf(m1)} kg med fart ${nf(v1)} m/s kolliderer med en vogn på ${nf(m2)} kg som står i ro. De henger sammen etterpå. Hvor stor fart har de?`,
             `A cart of ${nf(m1)} kg moving at ${nf(v1)} m/s collides with a cart of ${nf(m2)} kg at rest. They stick together. What is their speed?`),
     { n: v, tol: rel(v), u: "m/s" },
     S`$v = \dfrac{m_1 v_1}{m_1 + m_2} = \dfrac{${mf(m1)}\cdot ${mf(v1)}}{${mf(m1 + m2)}} \approx ${mf(v)}$ m/s.`]; },
 () => { const m = R.f(0.05, 2, 0.05), F = R.i(20, 400), dt = R.p([0.005, 0.01, 0.02, 0.05, 0.1]), dv = F * dt / m;
   return [T(`En kraft på ${F} N virker på en ball med masse ${nf(m)} kg i ${nf(dt)} s. Hvor mye øker farten (ballen lå i ro)?`,
             `A force of ${F} N acts on a ball of mass ${nf(m)} kg for ${nf(dt)} s. How much does its speed increase (the ball was at rest)?`),
     { n: dv, tol: rel(dv), u: "m/s" },
     T(S`Impuls: $J = F\Delta t = ${F}\cdot ${mf(dt)} = ${mf(F * dt)}$ Ns $= m\Delta v$, så $\Delta v = ${mf(F * dt)}/${mf(m)} \approx ${mf(dv)}$ m/s.`,
       S`Impulse: $J = F\Delta t = ${F}\cdot ${mf(dt)} = ${mf(F * dt)}$ Ns $= m\Delta v$, so $\Delta v = ${mf(F * dt)}/${mf(m)} \approx ${mf(dv)}$ m/s.`)]; }
);
}

// ================= MEK1300: Filer, feil og moduler =================
{
const U = ADDUNIT("MEK1300", "Filer, feil og moduler", "Files, errors and modules");
THEORY("MEK1300", U, {
nb: md`## Hva handler det om?
Ekte programmer leser data fra filer (måledata, loggfiler, CSV fra et regneark), må tåle feil i dataene og bruker ferdige verktøy fra moduler. Denne delen viser de få tingene du trenger for å gjøre det trygt.

## Begreper og formler
- **Åpne fil** med ´with´. Da lukkes fila automatisk, også hvis det skjer en feil:
´´´
with open("data.txt") as f:
    for linje in f:
        print(linje.strip())
´´´
- Modus: ´"r"´ leser (standard), ´"w"´ skriver og **sletter** det som var der, ´"a"´ legger til på slutten.
- **Rydd i tekst:** ´linje.strip()´ fjerner mellomrom og linjeskift i endene, ´linje.split(",")´ deler opp i en liste.
- **Tekst til tall:** ´int("12")´ og ´float("3.5")´. Gir ´ValueError´ hvis teksten ikke er et gyldig tall.
- **Fang feil** med ´try´/´except´, så programmet ikke krasjer:
´´´
try:
    x = float(tekst)
except ValueError:
    x = None
´´´
- **Moduler:** ´import math´ gir ´math.sqrt(2)´. ´from math import sqrt´ gir ´sqrt(2)´ direkte.
- **Formatere tall:** ´f"{x:.2f}"´ viser ´x´ med to desimaler.

## Slik løser du oppgavene
1. Gå gjennom koden linje for linje, og skriv ned verdien til hver variabel.
2. Husk at alt du leser fra en fil eller fra ´input()´, er **tekst** til du gjør det om.
3. Når en linje kan gi feil: se hvilken ´except´ som fanger den, og hopp dit.

### Eksempel
´´´
data = "12;7;x;5"
tall = []
for s in data.split(";"):
    try:
        tall.append(int(s))
    except ValueError:
        pass
print(sum(tall))
´´´
1. ´split(";")´ gir ´["12", "7", "x", "5"]´.
2. ´int("x")´ gir ´ValueError´, som fanges, så ´"x"´ hoppes over.
3. ´tall´ blir ´[12, 7, 5]´, og programmet skriver ut ´24´.

## Vanlige feil
- Å regne med tekst: ´"3" + "4"´ blir ´"34"´, ikke 7.
- Å åpne med ´"w"´ når du ville legge til. Da er det gamle innholdet borte.
- Å glemme ´strip()´, så linjeskiftet henger med.
- Å fange alle feil med en tom ´except:´. Da skjuler du også feil du burde sett.

> Fra fil: les → strip → split → gjør om til tall inne i try/except.`,
en: md`## What is it about?
Real programs read data from files (measurements, log files, CSV from a spreadsheet), must cope with bad data and use ready-made tools from modules. This part shows the few things you need to do it safely.

## Concepts and formulas
- **Open a file** with ´with´. The file is then closed automatically, even if an error occurs:
´´´
with open("data.txt") as f:
    for line in f:
        print(line.strip())
´´´
- Modes: ´"r"´ reads (default), ´"w"´ writes and **erases** what was there, ´"a"´ appends to the end.
- **Clean up text:** ´line.strip()´ removes spaces and line breaks at the ends, ´line.split(",")´ splits into a list.
- **Text to numbers:** ´int("12")´ and ´float("3.5")´. They raise ´ValueError´ if the text is not a valid number.
- **Catch errors** with ´try´/´except´ so the program does not crash:
´´´
try:
    x = float(text)
except ValueError:
    x = None
´´´
- **Modules:** ´import math´ gives ´math.sqrt(2)´. ´from math import sqrt´ gives ´sqrt(2)´ directly.
- **Format numbers:** ´f"{x:.2f}"´ shows ´x´ with two decimals.

## How to solve the problems
1. Go through the code line by line and write down the value of each variable.
2. Remember that everything you read from a file or from ´input()´ is **text** until you convert it.
3. When a line can fail: see which ´except´ catches it and jump there.

### Example
´´´
data = "12;7;x;5"
numbers = []
for s in data.split(";"):
    try:
        numbers.append(int(s))
    except ValueError:
        pass
print(sum(numbers))
´´´
1. ´split(";")´ gives ´["12", "7", "x", "5"]´.
2. ´int("x")´ raises ´ValueError´, which is caught, so ´"x"´ is skipped.
3. ´numbers´ becomes ´[12, 7, 5]´, and the program prints ´24´.

## Common mistakes
- Calculating with text: ´"3" + "4"´ becomes ´"34"´, not 7.
- Opening with ´"w"´ when you wanted to append. Then the old content is gone.
- Forgetting ´strip()´, so the line break is kept.
- Catching every error with a bare ´except:´. Then you also hide errors you should have seen.

> From a file: read → strip → split → convert to numbers inside try/except.`
});
BIQ("MEK1300", U, [
  [md`Du vil legge til nye målinger på slutten av ´logg.txt´ uten å slette det som står der. Hvilken modus bruker du i ´open("logg.txt", ...)´?`,
   [md`´"a"´`, md`´"w"´`, md`´"r"´`, md`´"x"´`],
   md`´"a"´ (append) skriver på slutten. ´"w"´ tømmer fila først, ´"r"´ kan bare lese, og ´"x"´ gir feil hvis fila finnes fra før.`,
   md`You want to add new measurements at the end of ´log.txt´ without erasing what is there. Which mode do you use in ´open("log.txt", ...)´?`,
   [md`´"a"´`, md`´"w"´`, md`´"r"´`, md`´"x"´`],
   md`´"a"´ (append) writes at the end. ´"w"´ empties the file first, ´"r"´ can only read, and ´"x"´ fails if the file already exists.`],
  [md`Hva skriver koden ut?` + CB(`tall = "3,7,10".split(",")\nprint(sum(int(x) for x in tall))`),
   { n: 20, tol: 0, u: "" },
   md`´split(",")´ gir ´["3", "7", "10"]´. Hvert element gjøres om med ´int´, og summen er 3 + 7 + 10 = 20.`,
   md`What does the code print?` + CB(`nums = "3,7,10".split(",")\nprint(sum(int(x) for x in nums))`), null,
   md`´split(",")´ gives ´["3", "7", "10"]´. Each element is converted with ´int´, and the sum is 3 + 7 + 10 = 20.`],
  [md`Hva skjer når Python kjører ´int("3.5")´?`,
   [md`Det gir ´ValueError´`, md`Resultatet blir ´3´`, md`Resultatet blir ´4´`, md`Resultatet blir ´3.5´`],
   md`´int()´ godtar bare tekst som er et heltall. Vil du ha 3 fra "3.5", må du skrive ´int(float("3.5"))´.`,
   md`What happens when Python runs ´int("3.5")´?`,
   [md`It raises ´ValueError´`, md`The result is ´3´`, md`The result is ´4´`, md`The result is ´3.5´`],
   md`´int()´ only accepts text that is a whole number. To get 3 from "3.5", write ´int(float("3.5"))´.`],
  [md`Hvorfor er ´with open(...) as f:´ bedre enn ´f = open(...)´?`,
   ["Fila lukkes automatisk, også hvis det skjer en feil", "Det går raskere å lese fila", "Det er den eneste måten å lese tekstfiler på", "Fila blir låst for andre programmer for alltid"],
   md`´with´ sørger for at ´f.close()´ blir kalt når blokka er ferdig, uansett om det skjedde en feil eller ikke. Da mister du ikke data og låser ikke fila.`,
   md`Why is ´with open(...) as f:´ better than ´f = open(...)´?`,
   ["The file is closed automatically, even if an error occurs", "Reading the file is faster", "It is the only way to read text files", "The file is locked for other programs forever"],
   md`´with´ makes sure ´f.close()´ is called when the block ends, whether an error happened or not. That way you don't lose data or keep the file locked.`],
  [md`Hva skriver koden ut?` + CB(`try:\n    x = int("12")\n    y = x / 0\nexcept ZeroDivisionError:\n    y = -1\nprint(y)`),
   { n: -1, tol: 0, u: "" },
   md`´int("12")´ går fint, men ´x / 0´ gir ´ZeroDivisionError´. Den fanges, så ´y´ blir -1.`,
   md`What does the code print?` + CB(`try:\n    x = int("12")\n    y = x / 0\nexcept ZeroDivisionError:\n    y = -1\nprint(y)`), null,
   md`´int("12")´ works, but ´x / 0´ raises ´ZeroDivisionError´. It is caught, so ´y´ becomes -1.`],
  [md`Du har skrevet ´from math import sqrt´. Hvordan regner du ut kvadratroten av 16?`,
   [md`´sqrt(16)´`, md`´math.sqrt(16)´`, md`´math.sqrt.16´`, md`´import sqrt(16)´`],
   md`Med ´from math import sqrt´ blir navnet ´sqrt´ tilgjengelig direkte. Navnet ´math´ finnes ikke, fordi du ikke skrev ´import math´.`,
   md`You have written ´from math import sqrt´. How do you compute the square root of 16?`,
   [md`´sqrt(16)´`, md`´math.sqrt(16)´`, md`´math.sqrt.16´`, md`´import sqrt(16)´`],
   md`With ´from math import sqrt´ the name ´sqrt´ is available directly. The name ´math´ does not exist, because you didn't write ´import math´.`],
  [md`Hva skriver ´print(f"{3.14159:.2f}")´ ut?`,
   [md`´3.14´`, md`´3.14159´`, md`´3.1´`, md`´3.142´`],
   md`´:.2f´ betyr «desimaltall med to desimaler». 3,14159 avrundes til 3.14.`,
   md`What does ´print(f"{3.14159:.2f}")´ print?`,
   [md`´3.14´`, md`´3.14159´`, md`´3.1´`, md`´3.142´`],
   md`´:.2f´ means "a float with two decimals". 3.14159 is rounded to 3.14.`],
  [md`Hva skriver koden ut?` + CB(`linjer = ["12\\n", "7\\n", "\\n", "5\\n"]\ntall = [int(l) for l in linjer if l.strip()]\nprint(len(tall))`),
   { n: 3, tol: 0, u: "" },
   md`´l.strip()´ er en tom streng for den tomme linja, og en tom streng regnes som ´False´. Den linja hoppes derfor over, og listen blir ´[12, 7, 5]´ med lengde 3.`,
   md`What does the code print?` + CB(`lines = ["12\\n", "7\\n", "\\n", "5\\n"]\nnums = [int(l) for l in lines if l.strip()]\nprint(len(nums))`), null,
   md`´l.strip()´ is an empty string for the empty line, and an empty string counts as ´False´. That line is skipped, so the list becomes ´[12, 7, 5]´ with length 3.`]
]);
GEN("MEK1300", U,
 () => { const n = R.i(3, 5), xs = Array.from({ length: n }, () => R.i(1, 40)), sep = R.p([",", ";", " "]), s = xs.join(sep), tot = xs.reduce((a, b) => a + b, 0);
   const code = `data = "${s}"\nprint(sum(int(x) for x in data.split("${sep}")))`;
   return [T(`Hva skriver koden ut?${CB(code)}`, `What does the code print?${CB(code)}`), { n: tot, tol: 0, u: "" },
     T(`split gir ${n} tekstbiter. De gjøres om til tall og summeres: ${xs.join(" + ")} = ${tot}.`, `split gives ${n} pieces of text. They are converted to numbers and added: ${xs.join(" + ")} = ${tot}.`)]; },
 () => { const parts = Array.from({ length: R.i(4, 7) }, () => R.p(["tall", "tall", "tall", "tom", "tekst"])).map(k => k === "tall" ? String(R.i(1, 99)) : k === "tom" ? "" : R.p(["x", "abc", "?", "n/a"]));
   const ok = parts.filter(p => /^\d+$/.test(p)).map(Number), tot = ok.reduce((a, b) => a + b, 0);
   const code = `verdier = ${JSON.stringify(parts)}\nsum_ = 0\nfor v in verdier:\n    try:\n        sum_ += int(v)\n    except ValueError:\n        pass\nprint(sum_)`;
   return [T(`Hva skriver koden ut?${CB(code)}`, `What does the code print?${CB(code.replace("verdier", "values").replace("in verdier", "in values"))}`), { n: tot, tol: 0, u: "" },
     T(`Bare tekstene som er gyldige heltall, blir lagt til (${ok.length ? ok.join(" + ") : "ingen"}). De andre gir ValueError og hoppes over. Summen blir ${tot}.`,
       `Only the texts that are valid integers are added (${ok.length ? ok.join(" + ") : "none"}). The others raise ValueError and are skipped. The sum is ${tot}.`)]; },
 () => { const d = R.i(0, 2); let x; do { x = R.f(1, 99, 0.001); } while (Math.round(x * 10 ** (d + 1)) % 10 === 5); const shown = +x.toFixed(d); // unngå ,5 (Python runder likt til partall)
   const code = `x = ${x}\nprint(f"{x:.${d}f}")`;
   return [T(`Hva skriver koden ut?${CB(code)}`, `What does the code print?${CB(code)}`), { n: shown, tol: 0.0001, u: "" },
     T(`:.${d}f viser tallet med ${d} desimal${d === 1 ? "" : "er"}, avrundet: ${String(shown.toFixed(d)).replace(".", ",")}.`, `:.${d}f shows the number with ${d} decimal${d === 1 ? "" : "s"}, rounded: ${shown.toFixed(d)}.`)]; },
 () => { const lines = Array.from({ length: R.i(4, 8) }, () => R.p(["v", "v", "v", "tom"])).map(k => k === "v" ? R.i(1, 50) + "\\n" : "\\n");
   const n = lines.filter(l => l !== "\\n").length;
   const code = `linjer = [${lines.map(l => `"${l}"`).join(", ")}]\nprint(len([l for l in linjer if l.strip()]))`;
   return [T(`Hva skriver koden ut?${CB(code)}`, `What does the code print?${CB(code.replace(/linjer/g, "lines"))}`), { n, tol: 0, u: "" },
     T(`Tomme linjer blir tomme strenger etter strip() og regnes som False, så de telles ikke. Det er ${n} linjer med innhold.`, `Empty lines become empty strings after strip() and count as False, so they are not counted. There are ${n} lines with content.`)]; }
);
}
})();
