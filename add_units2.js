// ============================================================
//  add_units2.js – nye enheter i eksisterende fag:
//  MEK2200 Regresjon og korrelasjon, MATS2100 Varmepumper og kjølemaskiner,
//  GMAT Innføring i derivasjon.
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
const sgn = (x, first) => x < 0 ? "- " + mf(-x) : (first ? "" : "+ ") + mf(x);   // «+ 3» / «- 3» i uttrykk

// ================= MEK2200: Regresjon og korrelasjon =================
{
const U = ADDUNIT("MEK2200", "Regresjon og korrelasjon", "Regression and correlation");
THEORY("MEK2200", U, {
nb: md`## Hva handler det om?
Du har målt to størrelser, for eksempel temperatur og strømforbruk, og lurer på om de henger sammen. **Regresjon** finner den rette linja som passer best til punktene, så du kan forutsi nye verdier. **Korrelasjon** er ett tall som forteller hvor godt punktene følger en rett linje.

## Begreper og formler
- **Regresjonslinja** $\hat y = a + b x$ er linja med minst mulig kvadratsum av avvikene (minste kvadraters metode).
- Stigningstallet og konstantleddet regnes ut med gjennomsnittene $\bar x$ og $\bar y$:
$$b = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad a = \bar y - b\,\bar x$$
- **Korrelasjonskoeffisienten** $r$ ligger mellom $-1$ og $1$. Nær $1$: sterk positiv sammenheng. Nær $-1$: sterk negativ. Nær $0$: ingen lineær sammenheng.
$$r = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum (x_i-\bar x)^2\,\sum (y_i-\bar y)^2}}$$
- **Forklaringsgrad** $r^2$: andelen av variasjonen i $y$ som linja forklarer. $r = 0{,}9$ gir $r^2 = 0{,}81$, altså 81 %.
- **Residual:** målt verdi minus verdien linja gir, $e_i = y_i - \hat y_i$.

## Slik løser du oppgavene
1. Regn ut $\bar x$ og $\bar y$.
2. Lag en tabell med $x_i - \bar x$, $y_i - \bar y$, produktet og kvadratet.
3. Summer kolonnene og regn ut $b$, deretter $a = \bar y - b\bar x$.
4. Sett inn $x$ i $\hat y = a + bx$ for å forutsi.

### Eksempel
Punktene $(1, 2)$, $(2, 4)$, $(3, 5)$ og $(4, 7)$.
1. $\bar x = 2{,}5$ og $\bar y = 4{,}5$.
2. $\sum (x_i-\bar x)(y_i-\bar y) = 3{,}75 + 0{,}25 + 0{,}25 + 3{,}75 = 8$ og $\sum (x_i-\bar x)^2 = 5$.
3. $b = 8/5 = 1{,}6$ og $a = 4{,}5 - 1{,}6\cdot 2{,}5 = 0{,}5$.
4. Linja er $\hat y = 0{,}5 + 1{,}6x$. For $x = 5$ forutsier den $\hat y = 8{,}5$.

## Vanlige feil
- Å tro at korrelasjon betyr årsak. Is-salg og drukningsulykker henger sammen fordi begge øker om sommeren.
- Å bruke linja langt utenfor målingene (ekstrapolasjon). Sammenhengen trenger ikke gjelde der.
- Å bytte om $x$ og $y$. Linja for $y$ gitt $x$ er ikke den samme som for $x$ gitt $y$.
- Å tolke $r = 0$ som «ingen sammenheng». Det kan være en sterk, men krum sammenheng.

> Stigningstall: $b = \sum(\Delta x\,\Delta y)/\sum(\Delta x)^2$. Linja går alltid gjennom $(\bar x, \bar y)$.`,
en: md`## What is it about?
You have measured two quantities, for example temperature and power consumption, and wonder whether they are related. **Regression** finds the straight line that fits the points best, so you can predict new values. **Correlation** is a single number that tells you how closely the points follow a straight line.

## Concepts and formulas
- The **regression line** $\hat y = a + b x$ is the line with the smallest possible sum of squared deviations (least squares).
- The slope and the intercept are computed from the means $\bar x$ and $\bar y$:
$$b = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad a = \bar y - b\,\bar x$$
- The **correlation coefficient** $r$ lies between $-1$ and $1$. Close to $1$: strong positive relationship. Close to $-1$: strong negative. Close to $0$: no linear relationship.
$$r = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum (x_i-\bar x)^2\,\sum (y_i-\bar y)^2}}$$
- **Coefficient of determination** $r^2$: the share of the variation in $y$ explained by the line. $r = 0.9$ gives $r^2 = 0.81$, i.e. 81 %.
- **Residual:** measured value minus the value from the line, $e_i = y_i - \hat y_i$.

## How to solve the problems
1. Compute $\bar x$ and $\bar y$.
2. Make a table with $x_i - \bar x$, $y_i - \bar y$, their product and the square.
3. Add up the columns and compute $b$, then $a = \bar y - b\bar x$.
4. Insert $x$ in $\hat y = a + bx$ to predict.

### Example
The points $(1, 2)$, $(2, 4)$, $(3, 5)$ and $(4, 7)$.
1. $\bar x = 2.5$ and $\bar y = 4.5$.
2. $\sum (x_i-\bar x)(y_i-\bar y) = 3.75 + 0.25 + 0.25 + 3.75 = 8$ and $\sum (x_i-\bar x)^2 = 5$.
3. $b = 8/5 = 1.6$ and $a = 4.5 - 1.6\cdot 2.5 = 0.5$.
4. The line is $\hat y = 0.5 + 1.6x$. For $x = 5$ it predicts $\hat y = 8.5$.

## Common mistakes
- Believing that correlation means cause. Ice cream sales and drowning accidents are related because both increase in summer.
- Using the line far outside the measurements (extrapolation). The relationship need not hold there.
- Swapping $x$ and $y$. The line for $y$ given $x$ is not the same as for $x$ given $y$.
- Reading $r = 0$ as "no relationship". There may be a strong but curved relationship.

> Slope: $b = \sum(\Delta x\,\Delta y)/\sum(\Delta x)^2$. The line always passes through $(\bar x, \bar y)$.`
});
BIQ("MEK2200", U, [
  [S`To målte størrelser har korrelasjonskoeffisient $r = -0{,}95$. Hva betyr det?`,
   ["Sterk negativ lineær sammenheng: når den ene øker, minker den andre", "Svak sammenheng", "Ingen sammenheng", "Den ene størrelsen minker med 95 % når den andre øker"],
   S`$|r|$ nær 1 betyr at punktene ligger nær en rett linje. Minustegnet betyr at linja heller nedover.`,
   S`Two measured quantities have correlation coefficient $r = -0.95$. What does it mean?`,
   ["A strong negative linear relationship: when one increases, the other decreases", "A weak relationship", "No relationship", "One quantity decreases by 95 % when the other increases"],
   S`$|r|$ close to 1 means the points lie close to a straight line. The minus sign means the line slopes downwards.`],
  [S`En regresjonslinje er $\hat y = 2 + 3x$. Hva forutsier den for $x = 4$?`,
   { n: 14, tol: 0.01, u: "" },
   S`$\hat y = 2 + 3\cdot 4 = 14$.`,
   S`A regression line is $\hat y = 2 + 3x$. What does it predict for $x = 4$?`, null,
   S`$\hat y = 2 + 3\cdot 4 = 14$.`],
  [S`Finn stigningstallet $b$ i regresjonslinja for punktene $(1, 1)$, $(2, 3)$ og $(3, 5)$.`,
   { n: 2, tol: 0.01, u: "" },
   S`$\bar x = 2$ og $\bar y = 3$. Avvikene er $\Delta x = -1, 0, 1$ og $\Delta y = -2, 0, 2$. $\sum \Delta x\,\Delta y = 2 + 0 + 2 = 4$ og $\sum \Delta x^2 = 2$, så $b = 4/2 = 2$. Punktene ligger faktisk nøyaktig på linja $y = 2x - 1$.`,
   S`Find the slope $b$ of the regression line for the points $(1, 1)$, $(2, 3)$ and $(3, 5)$.`, null,
   S`$\bar x = 2$ and $\bar y = 3$. The deviations are $\Delta x = -1, 0, 1$ and $\Delta y = -2, 0, 2$. $\sum \Delta x\,\Delta y = 2 + 0 + 2 = 4$ and $\sum \Delta x^2 = 2$, so $b = 4/2 = 2$. The points actually lie exactly on the line $y = 2x - 1$.`],
  [S`En regresjon har $r = 0{,}8$. Hvor mange prosent av variasjonen i $y$ forklarer linja?`,
   { n: 64, tol: 0.5, u: "%" },
   S`Forklaringsgraden er $r^2 = 0{,}8^2 = 0{,}64$, altså 64 %.`,
   S`A regression has $r = 0.8$. What percentage of the variation in $y$ does the line explain?`, null,
   S`The coefficient of determination is $r^2 = 0.8^2 = 0.64$, i.e. 64 %.`],
  ["Salg av is og antall drukningsulykker har høy positiv korrelasjon. Hva kan du konkludere?",
   ["Ingenting om årsak: en tredje faktor (varmt vær) kan forklare begge", "Is fører til drukning", "Drukning fører til issalg", "Korrelasjonen må være en regnefeil"],
   "Korrelasjon viser bare at størrelsene varierer sammen. Om sommeren spises det mer is og flere bader, så begge øker uten at den ene forårsaker den andre.",
   "Ice cream sales and the number of drowning accidents are highly positively correlated. What can you conclude?",
   ["Nothing about cause: a third factor (warm weather) can explain both", "Ice cream causes drowning", "Drowning causes ice cream sales", "The correlation must be a calculation error"],
   "Correlation only shows that the quantities vary together. In summer people eat more ice cream and more people swim, so both increase without one causing the other."],
  [S`En regresjonslinje har stigningstall $b = 3$. Gjennomsnittene er $\bar x = 5$ og $\bar y = 20$. Hva er konstantleddet $a$?`,
   { n: 5, tol: 0.01, u: "" },
   S`Linja går gjennom $(\bar x, \bar y)$: $a = \bar y - b\bar x = 20 - 3\cdot 5 = 5$.`,
   S`A regression line has slope $b = 3$. The means are $\bar x = 5$ and $\bar y = 20$. What is the intercept $a$?`, null,
   S`The line passes through $(\bar x, \bar y)$: $a = \bar y - b\bar x = 20 - 3\cdot 5 = 5$.`],
  ["Du har målt belastning mellom 0 og 50 kN og funnet en fin regresjonslinje. Hvorfor bør du være forsiktig med å bruke den ved 200 kN?",
   ["Det er ekstrapolasjon: sammenhengen er bare vist innenfor målingene", "Linja blir brattere for store verdier", "Regresjon virker bare for tall under 100", "Korrelasjonen blir automatisk negativ"],
   "Utenfor måleområdet vet du ikke om sammenhengen fortsatt er lineær. Materialer kan for eksempel flyte eller briste. Forutsigelser der er ekstrapolasjon og kan bli helt feil.",
   "You have measured loads between 0 and 50 kN and found a nice regression line. Why should you be careful using it at 200 kN?",
   ["It is extrapolation: the relationship has only been shown within the measurements", "The line becomes steeper for large values", "Regression only works for numbers below 100", "The correlation automatically becomes negative"],
   "Outside the measured range you don't know whether the relationship is still linear. Materials may for example yield or break. Predictions there are extrapolation and can be completely wrong."],
  [S`Modellen er $\hat y = 1 + 2x$. Ved $x = 3$ målte du $y = 8$. Hva er residualen?`,
   { n: 1, tol: 0.01, u: "" },
   S`Linja gir $\hat y = 1 + 2\cdot 3 = 7$. Residualen er $e = y - \hat y = 8 - 7 = 1$.`,
   S`The model is $\hat y = 1 + 2x$. At $x = 3$ you measured $y = 8$. What is the residual?`, null,
   S`The line gives $\hat y = 1 + 2\cdot 3 = 7$. The residual is $e = y - \hat y = 8 - 7 = 1$.`]
]);
GEN("MEK2200", U,
 () => { const a = R.f(-20, 50, 0.5), b = R.f(-5, 8, 0.1), x = R.i(1, 40), y = a + b * x;
   return [T(S`En regresjonslinje er $\hat y = ${sgn(a, true)} ${sgn(b)}x$. Hva forutsier den for $x = ${x}$?`,
             S`A regression line is $\hat y = ${sgn(a, true)} ${sgn(b)}x$. What does it predict for $x = ${x}$?`),
     { n: y, tol: rel(y, 0.001, 0.01), u: "" },
     S`$\hat y = ${mf(a)} + ${b < 0 ? "(" + mf(b) + ")" : mf(b)}\cdot ${x} = ${mf(y)}$.`]; },
 () => { const n = R.i(4, 5), xs = Array.from({ length: n }, (_, i) => i + 1), a0 = R.i(-3, 6), b0 = R.i(-3, 4) || 2;
   const ys = xs.map(x => a0 + b0 * x + R.i(-2, 2)), mx = xs.reduce((s, v) => s + v) / n, my = ys.reduce((s, v) => s + v) / n;
   let sxy = 0, sxx = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; }); const b = sxy / sxx;
   const pts = xs.map((x, i) => `(${x}, ${ys[i]})`).join(", ");
   return [T(S`Finn stigningstallet $b$ i regresjonslinja for punktene $${pts}$.`, S`Find the slope $b$ of the regression line for the points $${pts}$.`),
     { n: b, tol: 0.005, u: "" },
     T(S`$\bar x = ${mf(mx)}$ og $\bar y = ${mf(my)}$. $\sum \Delta x\,\Delta y = ${mf(sxy)}$ og $\sum \Delta x^2 = ${mf(sxx)}$, så $b = ${mf(sxy)}/${mf(sxx)} \approx ${mf(b, 3)}$.`,
       S`$\bar x = ${mf(mx)}$ and $\bar y = ${mf(my)}$. $\sum \Delta x\,\Delta y = ${mf(sxy)}$ and $\sum \Delta x^2 = ${mf(sxx)}$, so $b = ${mf(sxy)}/${mf(sxx)} \approx ${mf(b, 3)}$.`)]; },
 () => { const r = R.p([-0.95, -0.9, -0.8, -0.7, -0.6, -0.5, 0.3, 0.45, 0.5, 0.6, 0.7, 0.75, 0.85, 0.9, 0.95, 0.99]), p = r * r * 100;
   return [T(S`En regresjon har $r = ${mf(r)}$. Hvor mange prosent av variasjonen i $y$ forklarer linja?`, S`A regression has $r = ${mf(r)}$. What percentage of the variation in $y$ does the line explain?`),
     { n: p, tol: 0.5, u: "%" },
     T(S`$r^2 = (${mf(r)})^2 = ${mf(r * r, 4)}$, altså ${nf(p, 1)} %.`, S`$r^2 = (${mf(r)})^2 = ${mf(r * r, 4)}$, i.e. ${nf(p, 1)} %.`)]; },
 () => { const b = R.f(-4, 6, 0.1), mx = R.f(1, 30, 0.5), my = R.f(5, 120, 0.5), a = my - b * mx;
   return [T(S`En regresjonslinje har stigningstall $b = ${mf(b)}$. Gjennomsnittene er $\bar x = ${mf(mx)}$ og $\bar y = ${mf(my)}$. Hva er konstantleddet $a$?`,
             S`A regression line has slope $b = ${mf(b)}$. The means are $\bar x = ${mf(mx)}$ and $\bar y = ${mf(my)}$. What is the intercept $a$?`),
     { n: a, tol: rel(a, 0.001, 0.01), u: "" },
     S`$a = \bar y - b\bar x = ${mf(my)} - ${b < 0 ? "(" + mf(b) + ")" : mf(b)}\cdot ${mf(mx)} = ${mf(a)}$.`]; },
 () => { const a = R.i(-5, 10), b = R.f(0.5, 4, 0.5), x = R.i(1, 12), yh = a + b * x, e = R.f(-3, 3, 0.5) || 1.5, y = yh + e;
   return [T(S`Modellen er $\hat y = ${sgn(a, true)} ${sgn(b)}x$. Ved $x = ${x}$ målte du $y = ${mf(y)}$. Hva er residualen?`,
             S`The model is $\hat y = ${sgn(a, true)} ${sgn(b)}x$. At $x = ${x}$ you measured $y = ${mf(y)}$. What is the residual?`),
     { n: e, tol: 0.01, u: "" },
     T(S`$\hat y = ${mf(yh)}$, så $e = y - \hat y = ${mf(y)} - ${mf(yh)} = ${mf(e)}$.`, S`$\hat y = ${mf(yh)}$, so $e = y - \hat y = ${mf(y)} - ${mf(yh)} = ${mf(e)}$.`)]; }
);
}

// ================= MATS2100: Varmepumper og kjølemaskiner =================
{
const U = ADDUNIT("MATS2100", "Varmepumper og kjølemaskiner", "Heat pumps and refrigeration");
THEORY("MATS2100", U, {
nb: md`## Hva handler det om?
Varme går av seg selv fra varmt til kaldt. En **varmepumpe** eller et **kjøleskap** flytter varme den andre veien, fra kaldt til varmt, og betaler for det med elektrisk arbeid. Poenget er at du får flyttet mye mer varme enn den strømmen du bruker. Derfor er varmepumper så populære i norske hjem.

## Begreper og formler
- Energibalanse: varmen som leveres på den varme siden, er varmen som hentes fra den kalde siden pluss arbeidet.
$$Q_H = Q_L + W$$
- **Effektfaktor** (COP) forteller hvor mye nyttig varme du får per enhet strøm:
$$\text{COP}_{VP} = \frac{Q_H}{W}, \qquad \text{COP}_{kj} = \frac{Q_L}{W}, \qquad \text{COP}_{VP} = \text{COP}_{kj} + 1$$
- **Carnot-grensen** er den beste COP-en som er mulig mellom to temperaturer. Temperaturene må være i **kelvin**:
$$\text{COP}_{VP,maks} = \frac{T_H}{T_H - T_L}, \qquad \text{COP}_{kj,maks} = \frac{T_L}{T_H - T_L}$$
- Kretsløpet: **fordamper** (tar opp varme ute eller i kjøleskapet) → **kompressor** (arbeid inn) → **kondensator** (avgir varme inne) → **strupeventil** (trykket faller) → tilbake til fordamperen.
- Jo større temperaturforskjell, jo lavere COP. Derfor gir en luft-til-luft-varmepumpe mindre per kWh strøm på de kaldeste dagene.

## Slik løser du oppgavene
1. Finn ut om du ser på oppvarming ($Q_H$ er nytten) eller kjøling ($Q_L$ er nytten).
2. Bruk $\text{COP} = \text{nytte}/W$ og $Q_H = Q_L + W$.
3. Ved Carnot: gjør om til kelvin med $T = t + 273{,}15$ før du regner.

### Eksempel
Et hus trenger 8 kW varme. Varmepumpa har COP 3,2.
1. Strømmen er $W = Q_H/\text{COP} = 8/3{,}2 = 2{,}5$ kW.
2. Varmen hentet fra uteluften er $Q_L = Q_H - W = 8 - 2{,}5 = 5{,}5$ kW.
3. Med vanlig panelovn hadde du brukt 8 kW strøm. Du sparer altså 5,5 kW.

## Vanlige feil
- Å bruke grader Celsius i Carnot-formelen. $20/(20 - 0)$ gir uendelig, det riktige er $293{,}15/20 \approx 14{,}7$.
- Å blande $\text{COP}_{VP}$ og $\text{COP}_{kj}$. De er forskjellige med nøyaktig 1.
- Å tro at COP over 1 bryter energibevaringen. Varmepumpa lager ikke energi, den flytter den.

> COP = det du vil ha / strømmen du betaler for. Carnot: bruk kelvin.`,
en: md`## What is it about?
Heat flows by itself from hot to cold. A **heat pump** or a **refrigerator** moves heat the other way, from cold to hot, and pays for it with electrical work. The point is that you move much more heat than the electricity you use. That is why heat pumps are so popular in Norwegian homes.

## Concepts and formulas
- Energy balance: the heat delivered on the hot side is the heat taken from the cold side plus the work.
$$Q_H = Q_L + W$$
- The **coefficient of performance** (COP) tells you how much useful heat you get per unit of electricity:
$$\text{COP}_{HP} = \frac{Q_H}{W}, \qquad \text{COP}_{R} = \frac{Q_L}{W}, \qquad \text{COP}_{HP} = \text{COP}_{R} + 1$$
- The **Carnot limit** is the best possible COP between two temperatures. The temperatures must be in **kelvin**:
$$\text{COP}_{HP,max} = \frac{T_H}{T_H - T_L}, \qquad \text{COP}_{R,max} = \frac{T_L}{T_H - T_L}$$
- The cycle: **evaporator** (absorbs heat outside or inside the fridge) → **compressor** (work in) → **condenser** (releases heat indoors) → **expansion valve** (pressure drops) → back to the evaporator.
- The larger the temperature difference, the lower the COP. That is why an air-to-air heat pump gives less per kWh of electricity on the coldest days.

## How to solve the problems
1. Decide whether you are looking at heating ($Q_H$ is the benefit) or cooling ($Q_L$ is the benefit).
2. Use $\text{COP} = \text{benefit}/W$ and $Q_H = Q_L + W$.
3. For Carnot: convert to kelvin with $T = t + 273.15$ before calculating.

### Example
A house needs 8 kW of heat. The heat pump has a COP of 3.2.
1. The electricity is $W = Q_H/\text{COP} = 8/3.2 = 2.5$ kW.
2. The heat taken from the outdoor air is $Q_L = Q_H - W = 8 - 2.5 = 5.5$ kW.
3. With an ordinary electric heater you would have used 8 kW of electricity. So you save 5.5 kW.

## Common mistakes
- Using degrees Celsius in the Carnot formula. $20/(20 - 0)$ gives infinity, the correct value is $293.15/20 \approx 14.7$.
- Mixing up $\text{COP}_{HP}$ and $\text{COP}_{R}$. They differ by exactly 1.
- Thinking that a COP above 1 breaks energy conservation. The heat pump doesn't create energy, it moves it.

> COP = what you want / the electricity you pay for. Carnot: use kelvin.`
});
BIQ("MATS2100", U, [
  ["En varmepumpe med COP 3 leverer 9 kW varme til et hus. Hvor mye elektrisk effekt bruker den?",
   { n: 3, tol: 0.01, u: "kW" },
   S`$W = Q_H/\text{COP} = 9/3 = 3$ kW. De andre 6 kW hentes fra omgivelsene.`,
   "A heat pump with a COP of 3 delivers 9 kW of heat to a house. How much electrical power does it use?", null,
   S`$W = Q_H/\text{COP} = 9/3 = 3$ kW. The other 6 kW are taken from the surroundings.`],
  [S`Hva er den høyeste mulige COP for en varmepumpe som henter varme ved 0 °C og leverer ved 20 °C?`,
   { n: 293.15 / 20, tol: 0.05, u: "" },
   S`I kelvin: $T_H = 293{,}15$ K og $T_L = 273{,}15$ K. $\text{COP}_{maks} = \dfrac{T_H}{T_H - T_L} = \dfrac{293{,}15}{20} \approx 14{,}66$. Ekte varmepumper når omtrent en tredel av dette.`,
   S`What is the highest possible COP for a heat pump that takes heat at 0 °C and delivers it at 20 °C?`, null,
   S`In kelvin: $T_H = 293.15$ K and $T_L = 273.15$ K. $\text{COP}_{max} = \dfrac{T_H}{T_H - T_L} = \dfrac{293.15}{20} \approx 14.66$. Real heat pumps reach about a third of this.`],
  ["I hvilken del av en varmepumpe tas det opp varme fra uteluften?",
   ["I fordamperen", "I kondensatoren", "I kompressoren", "I strupeventilen"],
   "Kuldemediet er kaldere enn uteluften når det kommer inn i fordamperen. Det tar opp varme og fordamper. Kondensatoren er der varmen avgis inne.",
   "In which part of a heat pump is heat absorbed from the outdoor air?",
   ["In the evaporator", "In the condenser", "In the compressor", "In the expansion valve"],
   "The refrigerant is colder than the outdoor air when it enters the evaporator. It absorbs heat and evaporates. The condenser is where the heat is released indoors."],
  ["Et kjøleskap har COP 2,5 og fjerner 500 W varme fra innsiden. Hvor mye varme avgir det til kjøkkenet?",
   { n: 700, tol: 1, u: "W" },
   S`Arbeidet er $W = Q_L/\text{COP} = 500/2{,}5 = 200$ W. Til kjøkkenet går $Q_H = Q_L + W = 500 + 200 = 700$ W. Kjøleskapet varmer altså opp kjøkkenet.`,
   "A refrigerator has a COP of 2.5 and removes 500 W of heat from the inside. How much heat does it release to the kitchen?", null,
   S`The work is $W = Q_L/\text{COP} = 500/2.5 = 200$ W. To the kitchen goes $Q_H = Q_L + W = 500 + 200 = 700$ W. So the refrigerator heats up the kitchen.`],
  ["Hvorfor faller COP-en til en luft-til-luft-varmepumpe når det blir veldig kaldt ute?",
   ["Temperaturforskjellen mellom ute og inne blir større", "Strømmen blir dyrere", "Kuldemediet fryser helt", "Kompressoren går saktere"],
   S`Den beste mulige COP-en er $T_H/(T_H - T_L)$. Når $T_L$ synker, øker $T_H - T_L$, og COP-en faller. Den ekte COP-en følger samme trend.`,
   "Why does the COP of an air-to-air heat pump drop when it gets very cold outside?",
   ["The temperature difference between outside and inside becomes larger", "Electricity gets more expensive", "The refrigerant freezes completely", "The compressor runs slower"],
   S`The best possible COP is $T_H/(T_H - T_L)$. When $T_L$ drops, $T_H - T_L$ increases and the COP falls. The real COP follows the same trend.`],
  ["Et kjøleaggregat har COP 2,2 som kjølemaskin. Hva blir COP-en hvis du bruker den samme maskinen som varmepumpe (nytten er varmen på den varme siden)?",
   { n: 3.2, tol: 0.01, u: "" },
   S`$\text{COP}_{VP} = \text{COP}_{kj} + 1 = 2{,}2 + 1 = 3{,}2$, fordi $Q_H = Q_L + W$.`,
   "A refrigeration unit has a COP of 2.2 as a refrigerator. What is the COP if the same machine is used as a heat pump (the benefit is the heat on the hot side)?", null,
   S`$\text{COP}_{HP} = \text{COP}_{R} + 1 = 2.2 + 1 = 3.2$, because $Q_H = Q_L + W$.`],
  ["Hvilken enhet må temperaturene ha i Carnot-formelen for COP?",
   ["Kelvin", "Grader Celsius", "Grader Fahrenheit", "Det spiller ingen rolle"],
   "Formelen bygger på absolutt temperatur. Med Celsius blir svaret feil, og ved 0 °C på den kalde siden kan du til og med få deling på null.",
   "Which unit must the temperatures have in the Carnot formula for COP?",
   ["Kelvin", "Degrees Celsius", "Degrees Fahrenheit", "It doesn't matter"],
   "The formula is based on absolute temperature. With Celsius the answer is wrong, and with 0 °C on the cold side you can even get division by zero."],
  ["Et hus trenger 15 000 kWh varme i året. Hvor mye strøm trengs med en varmepumpe som i snitt har COP 3?",
   { n: 5000, tol: 1, u: "kWh" },
   S`$W = Q_H/\text{COP} = 15\,000/3 = 5000$ kWh. Med panelovner hadde det gått med 15 000 kWh.`,
   "A house needs 15,000 kWh of heat per year. How much electricity is needed with a heat pump that has an average COP of 3?", null,
   S`$W = Q_H/\text{COP} = 15\,000/3 = 5000$ kWh. With electric heaters it would have taken 15,000 kWh.`]
]);
GEN("MATS2100", U,
 () => { const Q = R.f(3, 15, 0.5), c = R.f(2, 5, 0.1), W = Q / c;
   return [T(`En varmepumpe med COP ${nf(c)} leverer ${nf(Q)} kW varme. Hvor mye elektrisk effekt bruker den?`, `A heat pump with a COP of ${nf(c)} delivers ${nf(Q)} kW of heat. How much electrical power does it use?`),
     { n: W, tol: rel(W), u: "kW" },
     S`$W = Q_H/\text{COP} = ${mf(Q)}/${mf(c)} \approx ${mf(W)}$ kW.`]; },
 () => { const tL = R.i(-20, 10), tH = R.p([20, 25, 35, 45, 55]), c = (tH + 273.15) / (tH - tL);
   return [T(`Hva er den høyeste mulige COP for en varmepumpe som henter varme ved ${tL} °C og leverer ved ${tH} °C?`, `What is the highest possible COP for a heat pump that takes heat at ${tL} °C and delivers it at ${tH} °C?`),
     { n: c, tol: rel(c), u: "" },
     S`$\text{COP}_{maks} = \dfrac{T_H}{T_H - T_L} = \dfrac{${mf(tH + 273.15)}}{${tH - tL}} \approx ${mf(c)}$.`]; },
 () => { const QL = R.p([100, 150, 200, 250, 300, 400, 500, 800]), c = R.f(1.5, 4, 0.1), W = QL / c, QH = QL + W;
   return [T(`Et kjøleskap har COP ${nf(c)} og fjerner ${QL} W varme fra innsiden. Hvor mye varme avgir det til rommet?`, `A refrigerator has a COP of ${nf(c)} and removes ${QL} W of heat from the inside. How much heat does it release to the room?`),
     { n: QH, tol: rel(QH), u: "W" },
     T(S`$W = Q_L/\text{COP} = ${QL}/${mf(c)} \approx ${mf(W, 1)}$ W, så $Q_H = Q_L + W \approx ${mf(QH, 1)}$ W.`, S`$W = Q_L/\text{COP} = ${QL}/${mf(c)} \approx ${mf(W, 1)}$ W, so $Q_H = Q_L + W \approx ${mf(QH, 1)}$ W.`)]; },
 () => { const D = R.p([8000, 10000, 12000, 15000, 18000, 20000, 25000]), c = R.f(2, 4.5, 0.1), save = D - D / c;
   return [T(`Et hus trenger ${nf(D)} kWh varme i året og bytter fra panelovner til en varmepumpe med COP ${nf(c)} i snitt. Hvor mange kWh strøm spares i året?`,
             `A house needs ${nf(D)} kWh of heat per year and switches from electric heaters to a heat pump with an average COP of ${nf(c)}. How many kWh of electricity are saved per year?`),
     { n: save, tol: rel(save), u: "kWh" },
     T(S`Med varmepumpe: $${D}/${mf(c)} \approx ${mf(D / c, 0)}$ kWh. Besparelse: $${D} - ${mf(D / c, 0)} \approx ${mf(save, 0)}$ kWh.`, S`With a heat pump: $${D}/${mf(c)} \approx ${mf(D / c, 0)}$ kWh. Saving: $${D} - ${mf(D / c, 0)} \approx ${mf(save, 0)}$ kWh.`)]; },
 () => { const tL = R.p([-25, -18, -10, 0, 2, 4, 5]), tH = R.p([20, 25, 30, 35]), c = (tL + 273.15) / (tH - tL);
   return [T(`Hva er den høyeste mulige COP for en kjølemaskin som holder ${tL} °C inne og avgir varme ved ${tH} °C?`, `What is the highest possible COP for a refrigerator that keeps ${tL} °C inside and releases heat at ${tH} °C?`),
     { n: c, tol: rel(c), u: "" },
     S`$\text{COP}_{maks} = \dfrac{T_L}{T_H - T_L} = \dfrac{${mf(tL + 273.15)}}{${tH - tL}} \approx ${mf(c)}$.`]; }
);
}

// ================= GMAT: Innføring i derivasjon =================
{
const U = ADDUNIT("GMAT", "Innføring i derivasjon", "Introduction to derivatives");
THEORY("GMAT", U, {
nb: md`## Hva handler det om?
Den deriverte måler **hvor bratt** en graf er i et punkt, altså hvor fort noe endrer seg akkurat der. Farten til en bil er den deriverte av posisjonen. Effekten er den deriverte av energien. Dette er grunnmuren for kalkulus, og du trenger bare noen få regler for å komme i gang.

## Begreper og formler
- **Gjennomsnittlig vekstfart** fra $x = a$ til $x = b$ er stigningstallet til linja mellom de to punktene:
$$\frac{\Delta y}{\Delta x} = \frac{f(b) - f(a)}{b - a}$$
- **Momentan vekstfart** $f'(a)$ er stigningstallet til **tangenten** i punktet. Du får den ved å la $b$ nærme seg $a$.
- Tre regler dekker alle polynomer:
$$(x^n)' = n\,x^{n-1}, \qquad (k\cdot f)' = k\cdot f', \qquad (f + g)' = f' + g'$$
- Den deriverte av en konstant er null: en vannrett linje har stigning 0.
- **Fortegnet** sier hvordan grafen går: $f'(x) > 0$ betyr at $f$ vokser, $f'(x) < 0$ betyr at $f$ avtar, og $f'(x) = 0$ betyr vannrett tangent (mulig topp eller bunn).
- **Tangenten** i $x = a$: $y = f(a) + f'(a)\,(x - a)$.

## Slik løser du oppgavene
1. Deriver ledd for ledd: flytt eksponenten ned foran og trekk 1 fra eksponenten.
2. Sett inn $x$-verdien i den **deriverte**, ikke i den opprinnelige funksjonen.
3. Tenk på hva svaret betyr: fart, stigning, vekst per år osv.

### Eksempel
Posisjonen til en vogn er $s(t) = 4t^2$ meter etter $t$ sekunder. Hvor stor fart har den etter 3 s?
1. Farten er den deriverte av posisjonen: $v(t) = s'(t) = 4\cdot 2t = 8t$.
2. $v(3) = 8\cdot 3 = 24$ m/s.
3. Til sammenligning er gjennomsnittsfarten de tre første sekundene $s(3)/3 = 36/3 = 12$ m/s.

## Vanlige feil
- Å glemme å trekke 1 fra eksponenten: $(x^3)' = 3x^2$, ikke $3x^3$.
- Å sette inn i $f$ i stedet for i $f'$.
- Å tro at den deriverte av et konstantledd er konstanten selv. Den er 0.

> Deriver: eksponenten ned foran, og én mindre i eksponenten. Konstanter forsvinner.`,
en: md`## What is it about?
The derivative measures **how steep** a graph is at a point, that is, how fast something changes right there. The speed of a car is the derivative of its position. Power is the derivative of energy. This is the foundation of calculus, and you only need a few rules to get started.

## Concepts and formulas
- The **average rate of change** from $x = a$ to $x = b$ is the slope of the line between the two points:
$$\frac{\Delta y}{\Delta x} = \frac{f(b) - f(a)}{b - a}$$
- The **instantaneous rate of change** $f'(a)$ is the slope of the **tangent** at the point. You get it by letting $b$ approach $a$.
- Three rules cover all polynomials:
$$(x^n)' = n\,x^{n-1}, \qquad (k\cdot f)' = k\cdot f', \qquad (f + g)' = f' + g'$$
- The derivative of a constant is zero: a horizontal line has slope 0.
- The **sign** tells you how the graph behaves: $f'(x) > 0$ means $f$ increases, $f'(x) < 0$ means $f$ decreases, and $f'(x) = 0$ means a horizontal tangent (possibly a maximum or minimum).
- The **tangent** at $x = a$: $y = f(a) + f'(a)\,(x - a)$.

## How to solve the problems
1. Differentiate term by term: bring the exponent down in front and subtract 1 from the exponent.
2. Insert the $x$-value in the **derivative**, not in the original function.
3. Think about what the answer means: speed, slope, growth per year, etc.

### Example
The position of a cart is $s(t) = 4t^2$ meters after $t$ seconds. What is its speed after 3 s?
1. The speed is the derivative of the position: $v(t) = s'(t) = 4\cdot 2t = 8t$.
2. $v(3) = 8\cdot 3 = 24$ m/s.
3. For comparison, the average speed during the first three seconds is $s(3)/3 = 36/3 = 12$ m/s.

## Common mistakes
- Forgetting to subtract 1 from the exponent: $(x^3)' = 3x^2$, not $3x^3$.
- Inserting into $f$ instead of $f'$.
- Thinking that the derivative of a constant term is the constant itself. It is 0.

> Differentiate: exponent down in front, one less in the exponent. Constants disappear.`
});
BIQ("GMAT", U, [
  [S`Hva er den gjennomsnittlige vekstfarten til $f(x) = x^2$ fra $x = 1$ til $x = 3$?`,
   { n: 4, tol: 0.01, u: "" },
   S`$\dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4$.`,
   S`What is the average rate of change of $f(x) = x^2$ from $x = 1$ to $x = 3$?`, null,
   S`$\dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4$.`],
  [S`$f(x) = 3x^2$. Hva er $f'(2)$?`,
   { n: 12, tol: 0.01, u: "" },
   S`$f'(x) = 3\cdot 2x = 6x$, så $f'(2) = 12$.`,
   S`$f(x) = 3x^2$. What is $f'(2)$?`, null,
   S`$f'(x) = 3\cdot 2x = 6x$, so $f'(2) = 12$.`],
  [S`Hva er den deriverte av $5x^3$?`,
   [S`$15x^2$`, S`$5x^2$`, S`$15x^3$`, S`$3x^2$`],
   S`Eksponenten 3 ned foran og én mindre i eksponenten: $5\cdot 3x^{2} = 15x^2$.`,
   S`What is the derivative of $5x^3$?`,
   [S`$15x^2$`, S`$5x^2$`, S`$15x^3$`, S`$3x^2$`],
   S`The exponent 3 comes down in front and the exponent drops by one: $5\cdot 3x^{2} = 15x^2$.`],
  [S`Posisjonen til en vogn er $s(t) = 4t^2$ meter. Hvor stor fart har den ved $t = 3$ s?`,
   { n: 24, tol: 0.01, u: "m/s" },
   S`$v(t) = s'(t) = 8t$, så $v(3) = 24$ m/s.`,
   S`The position of a cart is $s(t) = 4t^2$ meters. What is its speed at $t = 3$ s?`, null,
   S`$v(t) = s'(t) = 8t$, so $v(3) = 24$ m/s.`],
  [S`Hva betyr det at $f'(x) > 0$ for alle $x$ i et intervall?`,
   [S`At $f$ vokser i hele intervallet`, S`At $f$ er positiv i hele intervallet`, S`At $f$ har et toppunkt i intervallet`, S`At $f$ er en rett linje`],
   S`Den deriverte er stigningen. Positiv stigning overalt betyr at grafen går oppover når $x$ øker. Selve funksjonsverdiene kan godt være negative.`,
   S`What does it mean that $f'(x) > 0$ for all $x$ in an interval?`,
   [S`That $f$ increases throughout the interval`, S`That $f$ is positive throughout the interval`, S`That $f$ has a maximum in the interval`, S`That $f$ is a straight line`],
   S`The derivative is the slope. A positive slope everywhere means the graph goes up as $x$ increases. The function values themselves may well be negative.`],
  [S`Tangenten til $f(x) = x^2$ i $x = 1$ er en rett linje. Hvor skjærer den $y$-aksen?`,
   { n: -1, tol: 0.01, u: "" },
   S`$f(1) = 1$ og $f'(x) = 2x$, så $f'(1) = 2$. Tangenten er $y = 1 + 2(x - 1) = 2x - 1$. Den skjærer $y$-aksen i $y = -1$.`,
   S`The tangent to $f(x) = x^2$ at $x = 1$ is a straight line. Where does it cross the $y$-axis?`, null,
   S`$f(1) = 1$ and $f'(x) = 2x$, so $f'(1) = 2$. The tangent is $y = 1 + 2(x - 1) = 2x - 1$. It crosses the $y$-axis at $y = -1$.`],
  [S`For hvilken positiv $x$ har $f(x) = x^3 - 6x$ vannrett tangent?`,
   { n: Math.SQRT2, tol: 0.005, u: "" },
   S`$f'(x) = 3x^2 - 6 = 0$ gir $x^2 = 2$, så den positive løsningen er $x = \sqrt2 \approx 1{,}414$.`,
   S`For which positive $x$ does $f(x) = x^3 - 6x$ have a horizontal tangent?`, null,
   S`$f'(x) = 3x^2 - 6 = 0$ gives $x^2 = 2$, so the positive solution is $x = \sqrt2 \approx 1.414$.`],
  [S`Hva er den deriverte av konstanten $7$?`,
   [S`$0$`, S`$7$`, S`$1$`, S`$7x$`],
   S`Grafen til $y = 7$ er en vannrett linje, og den har stigning 0.`,
   S`What is the derivative of the constant $7$?`,
   [S`$0$`, S`$7$`, S`$1$`, S`$7x$`],
   S`The graph of $y = 7$ is a horizontal line, and it has slope 0.`]
]);
GEN("GMAT", U,
 () => { const a = R.i(1, 6), n = R.i(2, 4), x = R.i(-3, 4), d = a * n * x ** (n - 1);
   return [T(S`$f(x) = ${a === 1 ? "" : a}x^${n}$. Hva er $f'(${x})$?`, S`$f(x) = ${a === 1 ? "" : a}x^${n}$. What is $f'(${x})$?`),
     { n: d, tol: 0.01, u: "" },
     T(S`$f'(x) = ${a * n}x${n - 1 === 1 ? "" : "^" + (n - 1)}$, så $f'(${x}) = ${a * n}\cdot ${x < 0 ? "(" + x + ")" : x}${n - 1 === 1 ? "" : "^" + (n - 1)} = ${d}$.`,
       S`$f'(x) = ${a * n}x${n - 1 === 1 ? "" : "^" + (n - 1)}$, so $f'(${x}) = ${a * n}\cdot ${x < 0 ? "(" + x + ")" : x}${n - 1 === 1 ? "" : "^" + (n - 1)} = ${d}$.`)]; },
 () => { const a = R.i(1, 5), x1 = R.i(-2, 3), x2 = x1 + R.i(1, 4), f = x => a * x * x, r = (f(x2) - f(x1)) / (x2 - x1);
   return [T(S`Hva er den gjennomsnittlige vekstfarten til $f(x) = ${a === 1 ? "" : a}x^2$ fra $x = ${x1}$ til $x = ${x2}$?`, S`What is the average rate of change of $f(x) = ${a === 1 ? "" : a}x^2$ from $x = ${x1}$ to $x = ${x2}$?`),
     { n: r, tol: 0.01, u: "" },
     S`$\dfrac{f(${x2}) - f(${x1})}{${x2} - ${x1 < 0 ? "(" + x1 + ")" : x1}} = \dfrac{${f(x2)} - ${f(x1)}}{${x2 - x1}} = ${mf(r)}$.`]; },
 () => { const a = R.f(0.5, 5, 0.5), b = R.i(0, 10), t = R.i(1, 10), v = 2 * a * t + b;
   return [T(S`Posisjonen til en gjenstand er $s(t) = ${mf(a)}t^2 ${b ? "+ " + b + "t" : ""}$ meter. Hvor stor fart har den ved $t = ${t}$ s?`,
             S`The position of an object is $s(t) = ${mf(a)}t^2 ${b ? "+ " + b + "t" : ""}$ meters. What is its speed at $t = ${t}$ s?`),
     { n: v, tol: rel(v), u: "m/s" },
     T(S`$v(t) = s'(t) = ${mf(2 * a)}t ${b ? "+ " + b : ""}$, så $v(${t}) = ${mf(v)}$ m/s.`, S`$v(t) = s'(t) = ${mf(2 * a)}t ${b ? "+ " + b : ""}$, so $v(${t}) = ${mf(v)}$ m/s.`)]; },
 () => { const a = R.i(1, 4), b = R.i(-6, 6), c = R.i(-5, 5), x0 = R.i(-3, 3), d = 2 * a * x0 + b;
   const fx = S`${a === 1 ? "" : a}x^2 ${b < 0 ? "- " + (-b === 1 ? "" : -b) + "x" : b > 0 ? "+ " + (b === 1 ? "" : b) + "x" : ""} ${c < 0 ? "- " + -c : c > 0 ? "+ " + c : ""}`;
   return [T(S`Hva er stigningstallet til tangenten til $f(x) = ${fx}$ i $x = ${x0}$?`, S`What is the slope of the tangent to $f(x) = ${fx}$ at $x = ${x0}$?`),
     { n: d, tol: 0.01, u: "" },
     T(S`$f'(x) = ${2 * a}x ${b < 0 ? "- " + -b : b > 0 ? "+ " + b : ""}$, så $f'(${x0}) = ${d}$.`, S`$f'(x) = ${2 * a}x ${b < 0 ? "- " + -b : b > 0 ? "+ " + b : ""}$, so $f'(${x0}) = ${d}$.`)]; }
);
}
})();
