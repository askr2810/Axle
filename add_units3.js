// ============================================================
//  add_units3.js – nye enheter i eksisterende fag:
//  ELPE1300 Trefase og effekt, FLUID Pumper og rørsystemer,
//  GFYS Bølger, lyd og lys, STKD6610 Livsløp og klimaregnskap.
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
const SQ3 = Math.sqrt(3);

// ================= ELPE1300: Trefase og effekt =================
{
const U = ADDUNIT("ELPE1300", "Trefase og effekt", "Three-phase and power");
THEORY("ELPE1300", U, {
nb: md`## Hva handler det om?
Strømmen i veggen er vekselstrøm, og i vekselstrømkretser er det ikke nok å gange spenning og strøm for å få effekten. Motorer og transformatorer trekker også **reaktiv** effekt som går fram og tilbake uten å gjøre nytte. Større maskiner kobles til **trefase**, som gir jevnere effekt og mindre kobber i kablene.

## Begreper og formler
- **Virkelig effekt** $P$ (W) gjør nyttig arbeid. **Reaktiv effekt** $Q$ (var) pendler mellom kilde og last. **Tilsynelatende effekt** $S$ (VA) er det kablene må tåle.
$$P = UI\cos\varphi, \qquad Q = UI\sin\varphi, \qquad S = UI = \sqrt{P^2 + Q^2}$$
- **Effektfaktoren** $\cos\varphi = P/S$ forteller hvor stor del av strømmen som gjør nytte. Rene motstander (panelovner) har $\cos\varphi = 1$.
- **Trefase:** tre spenninger forskjøvet $120^\circ$. Linjespenningen (mellom to faser) er $\sqrt3$ ganger fasespenningen (fase til nøytral): $U_L = \sqrt3\,U_f$, for eksempel $\sqrt3\cdot 230 \approx 400$ V.
- Effekt i en symmetrisk trefaselast:
$$P = \sqrt3\,U_L\,I_L\cos\varphi$$
- I Norge finnes både IT-nett med 230 V mellom fasene og TN-nett med 230 V fase–nøytral og 400 V mellom fasene.

## Slik løser du oppgavene
1. Finn ut om det er én fase eller tre faser, og om spenningen er linjespenning eller fasespenning.
2. Bruk $P = UI\cos\varphi$ (én fase) eller $P = \sqrt3\,U_L I_L\cos\varphi$ (tre faser).
3. Skal du finne strømmen, snu formelen: $I = P/(\sqrt3\,U_L\cos\varphi)$.

### Eksempel
En trefasemotor på 11 kW er koblet til 400 V og har $\cos\varphi = 0{,}85$. Hvor stor er linjestrømmen?
1. $I = \dfrac{P}{\sqrt3\,U_L\cos\varphi} = \dfrac{11\,000}{\sqrt3\cdot 400\cdot 0{,}85}$.
2. $I \approx 18{,}7$ A.
3. Samme effekt på én fase ved 230 V og $\cos\varphi = 0{,}85$ hadde krevd $11\,000/(230\cdot 0{,}85) \approx 56$ A.

## Vanlige feil
- Å glemme $\cos\varphi$ og regne ut $S$ i stedet for $P$.
- Å bruke fasespenningen i trefaseformelen med $\sqrt3$. Formelen gjelder med **linjespenning**.
- Å legge sammen $P$ og $Q$ direkte. De står vinkelrett på hverandre: $S = \sqrt{P^2 + Q^2}$.

> Én fase: $P = UI\cos\varphi$. Tre faser: $P = \sqrt3\,U_L I_L\cos\varphi$.`,
en: md`## What is it about?
The electricity in the wall socket is alternating current, and in AC circuits it is not enough to multiply voltage and current to get the power. Motors and transformers also draw **reactive** power that flows back and forth without doing useful work. Larger machines are connected to **three-phase**, which gives smoother power and less copper in the cables.

## Concepts and formulas
- **Real power** $P$ (W) does useful work. **Reactive power** $Q$ (var) oscillates between source and load. **Apparent power** $S$ (VA) is what the cables must handle.
$$P = UI\cos\varphi, \qquad Q = UI\sin\varphi, \qquad S = UI = \sqrt{P^2 + Q^2}$$
- The **power factor** $\cos\varphi = P/S$ tells how much of the current does useful work. Pure resistors (electric heaters) have $\cos\varphi = 1$.
- **Three-phase:** three voltages shifted $120^\circ$. The line voltage (between two phases) is $\sqrt3$ times the phase voltage (phase to neutral): $U_L = \sqrt3\,U_f$, for example $\sqrt3\cdot 230 \approx 400$ V.
- Power in a balanced three-phase load:
$$P = \sqrt3\,U_L\,I_L\cos\varphi$$
- Norway has both IT networks with 230 V between phases and TN networks with 230 V phase–neutral and 400 V between phases.

## How to solve the problems
1. Find out whether it is single-phase or three-phase, and whether the voltage is a line voltage or a phase voltage.
2. Use $P = UI\cos\varphi$ (single-phase) or $P = \sqrt3\,U_L I_L\cos\varphi$ (three-phase).
3. To find the current, rearrange: $I = P/(\sqrt3\,U_L\cos\varphi)$.

### Example
An 11 kW three-phase motor is connected to 400 V and has $\cos\varphi = 0.85$. What is the line current?
1. $I = \dfrac{P}{\sqrt3\,U_L\cos\varphi} = \dfrac{11\,000}{\sqrt3\cdot 400\cdot 0.85}$.
2. $I \approx 18.7$ A.
3. The same power on a single phase at 230 V and $\cos\varphi = 0.85$ would have needed $11\,000/(230\cdot 0.85) \approx 56$ A.

## Common mistakes
- Forgetting $\cos\varphi$ and computing $S$ instead of $P$.
- Using the phase voltage in the three-phase formula with $\sqrt3$. The formula uses the **line voltage**.
- Adding $P$ and $Q$ directly. They are perpendicular: $S = \sqrt{P^2 + Q^2}$.

> Single-phase: $P = UI\cos\varphi$. Three-phase: $P = \sqrt3\,U_L I_L\cos\varphi$.`
});
BIQ("ELPE1300", U, [
  [S`En enfaselast på 230 V trekker 10 A med $\cos\varphi = 0{,}9$. Hvor stor er den virkelige effekten?`,
   { n: 2070, tol: 2, u: "W" },
   S`$P = UI\cos\varphi = 230\cdot 10\cdot 0{,}9 = 2070$ W.`,
   S`A single-phase load at 230 V draws 10 A with $\cos\varphi = 0.9$. What is the real power?`, null,
   S`$P = UI\cos\varphi = 230\cdot 10\cdot 0.9 = 2070$ W.`],
  ["En last har virkelig effekt 3 kW og reaktiv effekt 4 kvar. Hvor stor er den tilsynelatende effekten?",
   { n: 5, tol: 0.01, u: "kVA" },
   S`$S = \sqrt{P^2 + Q^2} = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$ kVA.`,
   "A load has a real power of 3 kW and a reactive power of 4 kvar. What is the apparent power?", null,
   S`$S = \sqrt{P^2 + Q^2} = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$ kVA.`],
  ["I et trefasenett er fasespenningen (fase–nøytral) 230 V. Hva er linjespenningen mellom to faser?",
   { n: SQ3 * 230, tol: 1, u: "V" },
   S`$U_L = \sqrt3\,U_f = \sqrt3\cdot 230 \approx 398{,}4$ V, som i praksis kalles 400 V.`,
   "In a three-phase network the phase voltage (phase–neutral) is 230 V. What is the line voltage between two phases?", null,
   S`$U_L = \sqrt3\,U_f = \sqrt3\cdot 230 \approx 398.4$ V, which in practice is called 400 V.`],
  [S`En symmetrisk trefaselast på 400 V trekker 20 A med $\cos\varphi = 0{,}8$. Hvor stor er effekten?`,
   { n: SQ3 * 400 * 20 * 0.8 / 1000, tol: 0.05, u: "kW" },
   S`$P = \sqrt3\,U_L I_L\cos\varphi = \sqrt3\cdot 400\cdot 20\cdot 0{,}8 \approx 11\,085$ W $\approx 11{,}09$ kW.`,
   S`A balanced three-phase load at 400 V draws 20 A with $\cos\varphi = 0.8$. What is the power?`, null,
   S`$P = \sqrt3\,U_L I_L\cos\varphi = \sqrt3\cdot 400\cdot 20\cdot 0.8 \approx 11\,085$ W $\approx 11.09$ kW.`],
  [S`Hva forteller effektfaktoren $\cos\varphi$?`,
   ["Hvor stor andel av den tilsynelatende effekten som blir virkelig effekt", "Hvor mye effekt som går tapt som varme i kablene", "Forholdet mellom linjespenning og fasespenning", "Virkningsgraden til motoren"],
   S`$\cos\varphi = P/S$. Er den lav, må kablene føre mye strøm som ikke gjør nytte. Derfor krever netteiere ofte kompensering med kondensatorer for store motorer.`,
   S`What does the power factor $\cos\varphi$ tell you?`,
   ["How much of the apparent power becomes real power", "How much power is lost as heat in the cables", "The ratio between line voltage and phase voltage", "The efficiency of the motor"],
   S`$\cos\varphi = P/S$. If it is low, the cables must carry a lot of current that does no useful work. That is why grid operators often require large motors to be compensated with capacitors.`],
  [S`En trefasemotor på 7,5 kW er koblet til 400 V med $\cos\varphi = 0{,}85$. Hvor stor er linjestrømmen (se bort fra virkningsgraden)?`,
   { n: 7500 / (SQ3 * 400 * 0.85), tol: 0.05, u: "A" },
   S`$I = \dfrac{P}{\sqrt3\,U_L\cos\varphi} = \dfrac{7500}{\sqrt3\cdot 400\cdot 0{,}85} \approx 12{,}74$ A.`,
   S`A 7.5 kW three-phase motor is connected to 400 V with $\cos\varphi = 0.85$. What is the line current (ignore the efficiency)?`, null,
   S`$I = \dfrac{P}{\sqrt3\,U_L\cos\varphi} = \dfrac{7500}{\sqrt3\cdot 400\cdot 0.85} \approx 12.74$ A.`],
  ["Hvorfor brukes trefase til store elektromotorer?",
   ["Det gir et roterende magnetfelt, jevn effekt og mindre kobber for samme effekt", "Det er den eneste måten å få høy spenning på", "Trefasemotorer trenger ikke strøm når de går", "Det gjør motoren helt fri for tap"],
   "Tre faser forskjøvet 120° lager et magnetfelt som roterer av seg selv, så motoren starter uten ekstra utstyr. Effekten er dessuten konstant over tid, og du trenger mindre ledertverrsnitt enn med én fase.",
   "Why is three-phase used for large electric motors?",
   ["It gives a rotating magnetic field, smooth power and less copper for the same power", "It is the only way to get high voltage", "Three-phase motors need no current while running", "It makes the motor completely loss-free"],
   "Three phases shifted 120° create a magnetic field that rotates by itself, so the motor starts without extra equipment. The power is also constant over time, and you need a smaller conductor cross-section than with a single phase."],
  ["En panelovn på 2000 W er koblet til 230 V. Hvor stor strøm trekker den?",
   { n: 2000 / 230, tol: 0.02, u: "A" },
   S`En panelovn er en ren motstand, så $\cos\varphi = 1$ og $I = P/U = 2000/230 \approx 8{,}70$ A.`,
   "A 2000 W electric heater is connected to 230 V. What current does it draw?", null,
   S`An electric heater is a pure resistor, so $\cos\varphi = 1$ and $I = P/U = 2000/230 \approx 8.70$ A.`]
]);
GEN("ELPE1300", U,
 () => { const I = R.f(2, 16, 0.5), pf = R.f(0.7, 1, 0.05), P = 230 * I * pf;
   return [T(S`En enfaselast på 230 V trekker ${nf(I)} A med $\cos\varphi = ${mf(pf)}$. Hvor stor er den virkelige effekten?`, S`A single-phase load at 230 V draws ${nf(I)} A with $\cos\varphi = ${mf(pf)}$. What is the real power?`),
     { n: P, tol: rel(P), u: "W" },
     S`$P = UI\cos\varphi = 230\cdot ${mf(I)}\cdot ${mf(pf)} \approx ${mf(P, 0)}$ W.`]; },
 () => { const UL = R.p([230, 400, 690]), I = R.i(5, 80), pf = R.f(0.7, 0.95, 0.05), P = SQ3 * UL * I * pf / 1000;
   return [T(S`En symmetrisk trefaselast på ${UL} V trekker ${I} A med $\cos\varphi = ${mf(pf)}$. Hvor stor er effekten?`, S`A balanced three-phase load at ${UL} V draws ${I} A with $\cos\varphi = ${mf(pf)}$. What is the power?`),
     { n: P, tol: rel(P), u: "kW" },
     S`$P = \sqrt3\cdot ${UL}\cdot ${I}\cdot ${mf(pf)} \approx ${mf(P * 1000, 0)}$ W $\approx ${mf(P)}$ kW.`]; },
 () => { const P = R.p([1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45]), pf = R.f(0.75, 0.9, 0.01), I = P * 1000 / (SQ3 * 400 * pf);
   return [T(S`En trefasemotor på ${nf(P)} kW er koblet til 400 V med $\cos\varphi = ${mf(pf)}$. Hvor stor er linjestrømmen (se bort fra virkningsgraden)?`,
             S`A ${nf(P)} kW three-phase motor is connected to 400 V with $\cos\varphi = ${mf(pf)}$. What is the line current (ignore the efficiency)?`),
     { n: I, tol: rel(I), u: "A" },
     S`$I = \dfrac{${mf(P * 1000, 0)}}{\sqrt3\cdot 400\cdot ${mf(pf)}} \approx ${mf(I)}$ A.`]; },
 () => { const P = R.f(1, 50, 0.5), Q = R.f(0.5, 40, 0.5), Sa = Math.hypot(P, Q);
   return [T(`En last har virkelig effekt ${nf(P)} kW og reaktiv effekt ${nf(Q)} kvar. Hvor stor er den tilsynelatende effekten?`, `A load has a real power of ${nf(P)} kW and a reactive power of ${nf(Q)} kvar. What is the apparent power?`),
     { n: Sa, tol: rel(Sa), u: "kVA" },
     S`$S = \sqrt{P^2 + Q^2} = \sqrt{${mf(P)}^2 + ${mf(Q)}^2} \approx ${mf(Sa)}$ kVA.`]; },
 () => { const Sa = R.f(2, 60, 0.5), pf = R.f(0.6, 0.98, 0.01), P = Sa * pf;
   return [T(`En last har tilsynelatende effekt ${nf(Sa)} kVA og virkelig effekt ${nf(P)} kW. Hva er effektfaktoren?`, `A load has an apparent power of ${nf(Sa)} kVA and a real power of ${nf(P)} kW. What is the power factor?`),
     { n: pf, tol: 0.005, u: "" },
     S`$\cos\varphi = P/S = ${mf(P)}/${mf(Sa)} \approx ${mf(pf)}$.`]; }
);
}

// ================= FLUID: Pumper og rørsystemer =================
{
const U = ADDUNIT("FLUID", "Pumper og rørsystemer", "Pumps and pipe systems");
THEORY("FLUID", U, {
nb: md`## Hva handler det om?
Pumper flytter væske gjennom rør: vann i bygninger, kjølevann i maskiner, olje i hydraulikk. For å velge riktig pumpe må du vite hvor høyt væsken skal løftes, hvor mye som skal fram per sekund, og hvor mye effekt det krever.

## Begreper og formler
- **Løftehøyde** $H$ (m) er trykkøkningen uttrykt som en vannsøyle:
$$H = \frac{\Delta p}{\rho g}$$
- **Hydraulisk effekt** er effekten som faktisk går til væsken, og **akseleffekten** er det motoren må levere:
$$P_h = \rho g Q H, \qquad P_{aksel} = \frac{P_h}{\eta}$$
- **Systemkurven** viser løftehøyden rørsystemet krever: en statisk del (høydeforskjell) pluss friksjonstap som øker med kvadratet av strømmen, $H_{sys} = H_{st} + kQ^2$.
- **Driftspunktet** er der pumpekurven skjærer systemkurven.
- **Affinitetslovene** når turtallet $n$ endres:
$$\frac{Q_2}{Q_1} = \frac{n_2}{n_1}, \qquad \frac{H_2}{H_1} = \left(\frac{n_2}{n_1}\right)^2, \qquad \frac{P_2}{P_1} = \left(\frac{n_2}{n_1}\right)^3$$
- **Kavitasjon:** faller trykket på sugesiden under damptrykket, dannes dampbobler som klapper sammen og ødelegger pumpehjulet.

## Slik løser du oppgavene
1. Gjør om enheter: L/s til m³/s (del på 1000), kPa til Pa (gang med 1000).
2. Bruk $P_h = \rho g Q H$ med $\rho = 1000$ kg/m³ for vann.
3. Del på virkningsgraden for å finne akseleffekten.
4. Ved endret turtall: bruk affinitetslovene (1., 2. og 3. potens).

### Eksempel
En pumpe løfter 10 L/s vann 20 m opp og har virkningsgrad 0,7.
1. $Q = 0{,}01$ m³/s.
2. $P_h = 1000\cdot 9{,}81\cdot 0{,}01\cdot 20 = 1962$ W.
3. $P_{aksel} = 1962/0{,}7 \approx 2803$ W, altså omtrent 2,8 kW.

## Vanlige feil
- Å bruke L/s direkte i formelen. Den krever m³/s.
- Å gange med virkningsgraden i stedet for å dele. Motoren må levere **mer** enn væsken får.
- Å tro at effekten øker lineært med turtallet. Den øker med tredje potens: 10 % mer turtall gir 33 % mer effekt.

> $P = \rho g Q H/\eta$. Turtall: $Q \sim n$, $H \sim n^2$, $P \sim n^3$.`,
en: md`## What is it about?
Pumps move liquid through pipes: water in buildings, cooling water in machines, oil in hydraulics. To choose the right pump you need to know how high the liquid must be lifted, how much must flow per second, and how much power that takes.

## Concepts and formulas
- The **head** $H$ (m) is the pressure rise expressed as a column of water:
$$H = \frac{\Delta p}{\rho g}$$
- The **hydraulic power** is the power that actually goes into the liquid, and the **shaft power** is what the motor must deliver:
$$P_h = \rho g Q H, \qquad P_{shaft} = \frac{P_h}{\eta}$$
- The **system curve** shows the head the pipe system requires: a static part (height difference) plus friction losses that grow with the square of the flow, $H_{sys} = H_{st} + kQ^2$.
- The **operating point** is where the pump curve crosses the system curve.
- The **affinity laws** when the speed $n$ changes:
$$\frac{Q_2}{Q_1} = \frac{n_2}{n_1}, \qquad \frac{H_2}{H_1} = \left(\frac{n_2}{n_1}\right)^2, \qquad \frac{P_2}{P_1} = \left(\frac{n_2}{n_1}\right)^3$$
- **Cavitation:** if the pressure on the suction side drops below the vapour pressure, vapour bubbles form and collapse, damaging the impeller.

## How to solve the problems
1. Convert units: L/s to m³/s (divide by 1000), kPa to Pa (multiply by 1000).
2. Use $P_h = \rho g Q H$ with $\rho = 1000$ kg/m³ for water.
3. Divide by the efficiency to find the shaft power.
4. For a change of speed: use the affinity laws (1st, 2nd and 3rd power).

### Example
A pump lifts 10 L/s of water 20 m and has an efficiency of 0.7.
1. $Q = 0.01$ m³/s.
2. $P_h = 1000\cdot 9.81\cdot 0.01\cdot 20 = 1962$ W.
3. $P_{shaft} = 1962/0.7 \approx 2803$ W, about 2.8 kW.

## Common mistakes
- Using L/s directly in the formula. It needs m³/s.
- Multiplying by the efficiency instead of dividing. The motor must deliver **more** than the liquid receives.
- Thinking the power grows linearly with speed. It grows with the cube: 10 % more speed gives 33 % more power.

> $P = \rho g Q H/\eta$. Speed: $Q \sim n$, $H \sim n^2$, $P \sim n^3$.`
});
BIQ("FLUID", U, [
  ["En pumpe løfter 10 L/s vann 20 m opp. Hvor stor er den hydrauliske effekten?",
   { n: 1962, tol: 2, u: "W" },
   S`$P_h = \rho g Q H = 1000\cdot 9{,}81\cdot 0{,}01\cdot 20 = 1962$ W.`,
   "A pump lifts 10 L/s of water 20 m. What is the hydraulic power?", null,
   S`$P_h = \rho g Q H = 1000\cdot 9.81\cdot 0.01\cdot 20 = 1962$ W.`],
  ["Den hydrauliske effekten er 1400 W og pumpa har virkningsgrad 0,7. Hvor stor akseleffekt må motoren levere?",
   { n: 2000, tol: 1, u: "W" },
   S`$P_{aksel} = P_h/\eta = 1400/0{,}7 = 2000$ W.`,
   "The hydraulic power is 1400 W and the pump has an efficiency of 0.7. How much shaft power must the motor deliver?", null,
   S`$P_{shaft} = P_h/\eta = 1400/0.7 = 2000$ W.`],
  ["En pumpe øker trykket i vann med 300 kPa. Hvor stor løftehøyde svarer det til?",
   { n: 300000 / (1000 * 9.81), tol: 0.1, u: "m" },
   S`$H = \dfrac{\Delta p}{\rho g} = \dfrac{300\,000}{1000\cdot 9{,}81} \approx 30{,}58$ m.`,
   "A pump raises the pressure of water by 300 kPa. What head does that correspond to?", null,
   S`$H = \dfrac{\Delta p}{\rho g} = \dfrac{300\,000}{1000\cdot 9.81} \approx 30.58$ m.`],
  ["Turtallet til en pumpe økes med 10 %. Med hvilken faktor øker effektbehovet?",
   { n: 1.331, tol: 0.002, u: "" },
   S`Effekten følger tredje potens av turtallet: $(1{,}1)^3 = 1{,}331$. Effekten øker altså med 33 %.`,
   "The speed of a pump is increased by 10 %. By what factor does the power demand increase?", null,
   S`The power follows the cube of the speed: $(1.1)^3 = 1.331$. So the power increases by 33 %.`],
  ["Hva er kavitasjon i en pumpe?",
   ["Dampbobler som dannes der trykket blir lavere enn damptrykket, og som klapper sammen og gir skader", "At pumpa går tom for væske", "At trykket blir for høyt i trykkrøret", "Luft som lekker inn gjennom pakningene"],
   "Ved lavt trykk på sugesiden koker væsken selv om den er kald. Når boblene kommer til høyere trykk, klapper de sammen med små, kraftige støt som graver ut metallet.",
   "What is cavitation in a pump?",
   ["Vapour bubbles that form where the pressure drops below the vapour pressure, and that collapse and cause damage", "The pump running out of liquid", "The pressure getting too high in the discharge pipe", "Air leaking in through the seals"],
   "At low pressure on the suction side the liquid boils even though it is cold. When the bubbles reach higher pressure, they collapse with small, powerful shocks that erode the metal."],
  ["En pumpe gir 40 L/s ved fullt turtall. Hvor stor blir vannstrømmen hvis turtallet halveres?",
   { n: 20, tol: 0.1, u: "L/s" },
   S`Vannstrømmen er proporsjonal med turtallet: $Q_2 = 40\cdot \tfrac12 = 20$ L/s. (Løftehøyden blir en firedel og effekten en åttendedel.)`,
   "A pump delivers 40 L/s at full speed. What is the flow if the speed is halved?", null,
   S`The flow is proportional to the speed: $Q_2 = 40\cdot \tfrac12 = 20$ L/s. (The head becomes a quarter and the power an eighth.)`],
  ["Hvor ligger driftspunktet til en pumpe i et rørsystem?",
   ["Der pumpekurven skjærer systemkurven", "Der virkningsgraden er null", "Ved største løftehøyde på pumpekurven", "Ved største vannstrøm pumpa kan gi"],
   "Pumpa gir en bestemt løftehøyde for hver vannstrøm, og systemet krever en bestemt løftehøyde for hver vannstrøm. Pumpa havner der de to er like.",
   "Where is the operating point of a pump in a pipe system?",
   ["Where the pump curve crosses the system curve", "Where the efficiency is zero", "At the largest head on the pump curve", "At the largest flow the pump can deliver"],
   "The pump gives a certain head for each flow, and the system requires a certain head for each flow. The pump ends up where the two are equal."],
  [S`Et rørsystem har systemkurven $H = 10 + 0{,}02\,Q^2$ ($H$ i meter, $Q$ i L/s). Hvor stor løftehøyde krever det ved 20 L/s?`,
   { n: 18, tol: 0.01, u: "m" },
   S`$H = 10 + 0{,}02\cdot 20^2 = 10 + 8 = 18$ m. 10 m er den statiske høyden og 8 m er friksjonstap.`,
   S`A pipe system has the system curve $H = 10 + 0.02\,Q^2$ ($H$ in meters, $Q$ in L/s). What head does it require at 20 L/s?`, null,
   S`$H = 10 + 0.02\cdot 20^2 = 10 + 8 = 18$ m. 10 m is the static height and 8 m is friction loss.`]
]);
GEN("FLUID", U,
 () => { const Q = R.i(2, 80), H = R.i(5, 80), P = 1000 * G_ * Q / 1000 * H;
   return [T(`En pumpe løfter ${Q} L/s vann ${H} m opp. Hvor stor er den hydrauliske effekten?`, `A pump lifts ${Q} L/s of water ${H} m. What is the hydraulic power?`),
     { n: P / 1000, tol: rel(P / 1000), u: "kW" },
     T(S`$P_h = 1000\cdot 9{,}81\cdot ${mf(Q / 1000, 3)}\cdot ${H} \approx ${mf(P, 0)}$ W $\approx ${mf(P / 1000)}$ kW.`, S`$P_h = 1000\cdot 9.81\cdot ${mf(Q / 1000, 3)}\cdot ${H} \approx ${mf(P, 0)}$ W $\approx ${mf(P / 1000)}$ kW.`)]; },
 () => { const Ph = R.f(0.5, 30, 0.5), eta = R.f(0.45, 0.85, 0.05), Pa = Ph / eta;
   return [T(`Den hydrauliske effekten er ${nf(Ph)} kW og pumpa har virkningsgrad ${nf(eta)}. Hvor stor akseleffekt trengs?`, `The hydraulic power is ${nf(Ph)} kW and the pump has an efficiency of ${nf(eta)}. How much shaft power is needed?`),
     { n: Pa, tol: rel(Pa), u: "kW" },
     S`$P = P_h/\eta = ${mf(Ph)}/${mf(eta)} \approx ${mf(Pa)}$ kW.`]; },
 () => { const dp = R.i(50, 900), H = dp * 1000 / (1000 * G_);
   return [T(`En pumpe øker trykket i vann med ${dp} kPa. Hvor stor løftehøyde svarer det til?`, `A pump raises the pressure of water by ${dp} kPa. What head does that correspond to?`),
     { n: H, tol: rel(H), u: "m" },
     T(S`$H = \dfrac{${dp}\,000}{1000\cdot 9{,}81} \approx ${mf(H)}$ m.`, S`$H = \dfrac{${dp}\,000}{1000\cdot 9.81} \approx ${mf(H)}$ m.`)]; },
 () => { const r = R.p([0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1.1, 1.2, 1.25]), P1 = R.f(2, 40, 0.5), P2 = P1 * r ** 3;
   return [T(`En pumpe bruker ${nf(P1)} kW. Turtallet endres til ${nf(r * 100)} % av det opprinnelige. Hvor stor effekt bruker den da?`, `A pump uses ${nf(P1)} kW. The speed is changed to ${nf(r * 100)} % of the original. How much power does it use then?`),
     { n: P2, tol: rel(P2), u: "kW" },
     S`$P_2 = P_1\,(n_2/n_1)^3 = ${mf(P1)}\cdot ${mf(r)}^3 \approx ${mf(P2)}$ kW.`]; },
 () => { const Hs = R.i(2, 30), k = R.p([0.005, 0.01, 0.02, 0.025, 0.04, 0.05]), Q = R.i(5, 40), H = Hs + k * Q * Q;
   return [T(S`Et rørsystem har systemkurven $H = ${Hs} + ${mf(k, 3)}\,Q^2$ ($H$ i meter, $Q$ i L/s). Hvor stor løftehøyde krever det ved ${Q} L/s?`,
             S`A pipe system has the system curve $H = ${Hs} + ${mf(k, 3)}\,Q^2$ ($H$ in meters, $Q$ in L/s). What head does it require at ${Q} L/s?`),
     { n: H, tol: rel(H), u: "m" },
     S`$H = ${Hs} + ${mf(k, 3)}\cdot ${Q}^2 = ${mf(H)}$ m.`]; }
);
}

// ================= GFYS: Bølger, lyd og lys =================
{
const U = ADDUNIT("GFYS", "Bølger, lyd og lys", "Waves, sound and light");
THEORY("GFYS", U, {
nb: md`## Hva handler det om?
Lyd, lys, radiosignaler og vibrasjoner i maskiner er alle bølger. Samme få sammenhenger beskriver dem alle: hvor fort bølgen går, hvor lang den er og hvor ofte den svinger. Ingeniører bruker dette i alt fra ultralydmåling og støyberegning til fiberoptikk.

## Begreper og formler
- **Frekvens** $f$ (Hz) er antall svingninger per sekund. **Perioden** er tiden for én svingning: $T = 1/f$.
- **Bølgelengden** $\lambda$ er avstanden mellom to bølgetopper. Bølgefarten er
$$v = f\lambda$$
- Lydfarten i luft er omtrent 343 m/s (ved 20 °C), i vann omtrent 1480 m/s. Lysfarten i vakuum er $c = 3{,}00\cdot 10^8$ m/s.
- **Ekko:** lyden går fram og tilbake, så avstanden er $s = vt/2$.
- **Brytningsindeks** $n = c/v$. Ved en grenseflate bøyes lyset (Snells lov):
$$n_1\sin\theta_1 = n_2\sin\theta_2$$
- **Lydnivå** i desibel: $+3$ dB er dobbel intensitet, $+10$ dB er ti ganger så stor intensitet.

## Slik løser du oppgavene
1. Skriv opp det du vet: $v$, $f$, $\lambda$ eller $T$.
2. Bruk $v = f\lambda$ og $T = 1/f$ og snu formelen etter behov.
3. Ekko: husk å dele på 2. Brytning: vinklene måles fra **normalen** (loddrett på flaten).

### Eksempel
Tonen A har frekvens 440 Hz. Hvor lang er lydbølgen i luft?
1. $v = 343$ m/s og $f = 440$ Hz.
2. $\lambda = v/f = 343/440 \approx 0{,}78$ m.
3. Perioden er $T = 1/440 \approx 2{,}3$ ms.

## Vanlige feil
- Å glemme å dele på 2 ved ekko.
- Å tro at frekvensen endrer seg når en bølge går inn i et nytt stoff. Det er farten og bølgelengden som endres.
- Å måle vinkelen fra flaten i stedet for fra normalen i Snells lov.

> $v = f\lambda$ og $T = 1/f$. Ekko: $s = vt/2$.`,
en: md`## What is it about?
Sound, light, radio signals and vibrations in machines are all waves. The same few relationships describe them all: how fast the wave travels, how long it is and how often it oscillates. Engineers use this in everything from ultrasound measurement and noise calculations to fibre optics.

## Concepts and formulas
- The **frequency** $f$ (Hz) is the number of oscillations per second. The **period** is the time for one oscillation: $T = 1/f$.
- The **wavelength** $\lambda$ is the distance between two crests. The wave speed is
$$v = f\lambda$$
- The speed of sound in air is about 343 m/s (at 20 °C), in water about 1480 m/s. The speed of light in vacuum is $c = 3.00\cdot 10^8$ m/s.
- **Echo:** the sound travels there and back, so the distance is $s = vt/2$.
- **Refractive index** $n = c/v$. At a boundary, light bends (Snell's law):
$$n_1\sin\theta_1 = n_2\sin\theta_2$$
- **Sound level** in decibels: $+3$ dB is double intensity, $+10$ dB is ten times the intensity.

## How to solve the problems
1. Write down what you know: $v$, $f$, $\lambda$ or $T$.
2. Use $v = f\lambda$ and $T = 1/f$ and rearrange as needed.
3. Echo: remember to divide by 2. Refraction: the angles are measured from the **normal** (perpendicular to the surface).

### Example
The note A has a frequency of 440 Hz. How long is the sound wave in air?
1. $v = 343$ m/s and $f = 440$ Hz.
2. $\lambda = v/f = 343/440 \approx 0.78$ m.
3. The period is $T = 1/440 \approx 2.3$ ms.

## Common mistakes
- Forgetting to divide by 2 for an echo.
- Believing the frequency changes when a wave enters a new material. It is the speed and the wavelength that change.
- Measuring the angle from the surface instead of from the normal in Snell's law.

> $v = f\lambda$ and $T = 1/f$. Echo: $s = vt/2$.`
});
BIQ("GFYS", U, [
  ["Tonen A har frekvens 440 Hz. Hvor lang er lydbølgen i luft (lydfart 343 m/s)?",
   { n: 343 / 440, tol: 0.005, u: "m" },
   S`$\lambda = v/f = 343/440 \approx 0{,}78$ m.`,
   "The note A has a frequency of 440 Hz. How long is the sound wave in air (speed of sound 343 m/s)?", null,
   S`$\lambda = v/f = 343/440 \approx 0.78$ m.`],
  ["Du roper mot en fjellvegg og hører ekkoet etter 2,0 s. Hvor langt unna er fjellveggen (lydfart 343 m/s)?",
   { n: 343, tol: 1, u: "m" },
   S`Lyden går fram og tilbake: $s = vt/2 = 343\cdot 2{,}0/2 = 343$ m.`,
   "You shout towards a cliff and hear the echo after 2.0 s. How far away is the cliff (speed of sound 343 m/s)?", null,
   S`The sound travels there and back: $s = vt/2 = 343\cdot 2.0/2 = 343$ m.`],
  ["Glass har brytningsindeks 1,5. Hvor fort går lyset i glasset, i km/s?",
   { n: 200000, tol: 200, u: "km/s" },
   S`$v = c/n = 300\,000/1{,}5 = 200\,000$ km/s.`,
   "Glass has a refractive index of 1.5. How fast does light travel in the glass, in km/s?", null,
   S`$v = c/n = 300\,000/1.5 = 200\,000$ km/s.`],
  ["Lydnivået øker med 10 dB. Hva skjer med lydintensiteten?",
   ["Den blir ti ganger så stor", "Den dobles", "Den øker med 10 %", "Den blir hundre ganger så stor"],
   "Desibelskalaen er logaritmisk: $+10$ dB betyr en faktor 10 i intensitet, og $+3$ dB betyr omtrent en dobling.",
   "The sound level increases by 10 dB. What happens to the sound intensity?",
   ["It becomes ten times as large", "It doubles", "It increases by 10 %", "It becomes a hundred times as large"],
   "The decibel scale is logarithmic: $+10$ dB means a factor of 10 in intensity, and $+3$ dB means roughly a doubling."],
  ["Strømnettet har frekvens 50 Hz. Hvor lang er perioden, i millisekunder?",
   { n: 20, tol: 0.01, u: "ms" },
   S`$T = 1/f = 1/50 = 0{,}02$ s $= 20$ ms.`,
   "The power grid has a frequency of 50 Hz. How long is the period, in milliseconds?", null,
   S`$T = 1/f = 1/50 = 0.02$ s $= 20$ ms.`],
  ["En lydbølge går fra luft ned i vann, der lydfarten er mye større. Hva skjer med bølgelengden?",
   ["Den blir lengre", "Den blir kortere", "Den er uendret", "Bølgen forsvinner"],
   S`Frekvensen bestemmes av kilden og endres ikke. Når farten øker, må $\lambda = v/f$ bli lengre.`,
   "A sound wave goes from air into water, where the speed of sound is much larger. What happens to the wavelength?",
   ["It becomes longer", "It becomes shorter", "It is unchanged", "The wave disappears"],
   S`The frequency is set by the source and does not change. When the speed increases, $\lambda = v/f$ must become longer.`],
  [S`Lys går fra luft ($n = 1{,}00$) ned i vann ($n = 1{,}33$) med innfallsvinkel 30° fra normalen. Hva blir brytningsvinkelen?`,
   { n: Math.asin(0.5 / 1.33) * 180 / Math.PI, tol: 0.2, u: "°" },
   S`$\sin\theta_2 = \dfrac{1{,}00\cdot\sin 30^\circ}{1{,}33} = \dfrac{0{,}5}{1{,}33} \approx 0{,}376$, så $\theta_2 \approx 22{,}08^\circ$. Lyset bøyes inn mot normalen.`,
   S`Light goes from air ($n = 1.00$) into water ($n = 1.33$) with an angle of incidence of 30° from the normal. What is the angle of refraction?`, null,
   S`$\sin\theta_2 = \dfrac{1.00\cdot\sin 30^\circ}{1.33} = \dfrac{0.5}{1.33} \approx 0.376$, so $\theta_2 \approx 22.08^\circ$. The light bends towards the normal.`],
  ["Du ser et lyn og hører tordenen 3,0 s senere. Omtrent hvor langt unna slo lynet ned (lydfart 343 m/s)?",
   { n: 1029, tol: 3, u: "m" },
   S`Lyset kommer fram nesten med en gang, så forsinkelsen skyldes lyden: $s = vt = 343\cdot 3{,}0 = 1029$ m, altså omtrent 1 km. (Her er det ikke ekko, så du deler ikke på 2.)`,
   "You see lightning and hear the thunder 3.0 s later. Roughly how far away did the lightning strike (speed of sound 343 m/s)?", null,
   S`The light arrives almost instantly, so the delay is due to the sound: $s = vt = 343\cdot 3.0 = 1029$ m, about 1 km. (This is not an echo, so you don't divide by 2.)`]
]);
GEN("GFYS", U,
 () => { const f = R.p([50, 100, 200, 262, 330, 440, 523, 1000, 2000, 5000, 10000]), lam = 343 / f;
   return [T(`En lydkilde sender ut ${nf(f)} Hz. Hvor lang er bølgelengden i luft (lydfart 343 m/s)?`, `A sound source emits ${nf(f)} Hz. What is the wavelength in air (speed of sound 343 m/s)?`),
     { n: lam, tol: rel(lam), u: "m" },
     S`$\lambda = v/f = 343/${f} \approx ${mf(lam, 3)}$ m.`]; },
 () => { const t = R.f(0.2, 6, 0.1), med = R.p(["luft", "vann"]), v = med === "luft" ? 343 : 1480, s = v * t / 2;
   return [T(`Et ekkolodd sender ut lyd i ${med} og hører ekkoet etter ${nf(t)} s. Hvor langt unna er det som reflekterte lyden (lydfart ${v} m/s)?`,
             `An echo sounder sends sound through ${med === "luft" ? "air" : "water"} and hears the echo after ${nf(t)} s. How far away is the object that reflected the sound (speed of sound ${v} m/s)?`),
     { n: s, tol: rel(s), u: "m" },
     S`$s = vt/2 = ${v}\cdot ${mf(t)}/2 \approx ${mf(s, 1)}$ m.`]; },
 () => { const f = R.p([10, 20, 25, 40, 50, 60, 100, 125, 200, 250, 400, 500, 1000]), T_ = 1000 / f;
   return [T(`Et signal har frekvens ${f} Hz. Hvor lang er perioden, i millisekunder?`, `A signal has a frequency of ${f} Hz. How long is the period, in milliseconds?`),
     { n: T_, tol: rel(T_), u: "ms" },
     S`$T = 1/f = 1/${f} = ${mf(T_ / 1000, 5)}$ s $= ${mf(T_)}$ ms.`]; },
 () => { const n2 = R.p([1.33, 1.45, 1.5, 1.52, 1.6, 2.42]), th = R.p([10, 20, 25, 30, 40, 45, 50, 60, 70]), s2 = Math.sin(th * DEG) / n2, th2 = Math.asin(s2) / DEG;
   return [T(S`Lys går fra luft ($n = 1{,}00$) inn i et stoff med $n = ${mf(n2)}$. Innfallsvinkelen er ${th}° fra normalen. Hva blir brytningsvinkelen?`,
             S`Light goes from air ($n = 1.00$) into a material with $n = ${mf(n2)}$. The angle of incidence is ${th}° from the normal. What is the angle of refraction?`),
     { n: th2, tol: 0.2, u: "°" },
     T(S`$\sin\theta_2 = \dfrac{\sin ${th}^\circ}{${mf(n2)}} \approx ${mf(s2, 4)}$, så $\theta_2 \approx ${mf(th2)}^\circ$.`, S`$\sin\theta_2 = \dfrac{\sin ${th}^\circ}{${mf(n2)}} \approx ${mf(s2, 4)}$, so $\theta_2 \approx ${mf(th2)}^\circ$.`)]; },
 () => { const t = R.f(0.5, 12, 0.5), s = 343 * t;
   return [T(`Du ser et lyn og hører tordenen ${nf(t)} s senere. Hvor langt unna slo lynet ned (lydfart 343 m/s)?`, `You see lightning and hear the thunder ${nf(t)} s later. How far away did the lightning strike (speed of sound 343 m/s)?`),
     { n: s, tol: rel(s), u: "m" },
     S`$s = vt = 343\cdot ${mf(t)} \approx ${mf(s, 0)}$ m.`]; }
);
}

// ================= STKD6610: Livsløp og klimaregnskap =================
{
const U = ADDUNIT("STKD6610", "Livsløp og klimaregnskap", "Life cycle and carbon accounting");
THEORY("STKD6610", U, {
nb: md`## Hva handler det om?
Hvor miljøvennlig er et produkt egentlig? En elbil har ingen eksos, men batteriet gir store utslipp når det lages. En **livsløpsanalyse** (LCA) teller opp utslippene gjennom hele livet til produktet, fra råvare til avfall, så du kan sammenligne løsninger på en rettferdig måte.

## Begreper og formler
- **Livsløpsfaser:** råvareuttak → produksjon → transport → bruk → avhending (gjenvinning eller avfall).
- **Funksjonell enhet:** det du sammenligner på, for eksempel «transport av én person 1 km» eller «oppvarming av et hus i ett år». Uten en felles funksjonell enhet blir sammenligningen meningsløs.
- **Utslippsfaktor:** kg CO₂-ekvivalenter per enhet (per kg stål, per km, per kWh). Utslippet er mengden ganger faktoren:
$$E = \text{mengde}\cdot\text{utslippsfaktor}$$
- **CO₂-ekvivalenter** (CO₂e): andre klimagasser regnes om med oppvarmingspotensialet GWP. Metan har GWP omtrent 28, altså 1 kg metan ≈ 28 kg CO₂e.
- **Scope 1, 2 og 3:** direkte utslipp fra egen virksomhet (1), fra innkjøpt energi (2) og resten av verdikjeden, som innkjøpte varer og kundenes bruk (3).
- **Tilbakebetalingstid** for et klimatiltak: ekstra utslipp ved produksjon delt på årlig besparelse.

## Slik løser du oppgavene
1. Bestem den funksjonelle enheten og hvilke faser som er med.
2. Gang hver mengde med sin utslippsfaktor, og summer.
3. Pass på enhetene: g eller kg, kWh eller MWh, per år eller totalt.

### Eksempel
En varmepumpe gir 300 kg CO₂e ved produksjon og sparer 150 kg CO₂e i året.
1. Tilbakebetalingstid: $300/150 = 2$ år.
2. Over 15 års levetid sparer den $15\cdot 150 - 300 = 1950$ kg CO₂e.
3. Tiltaket lønner seg for klimaet etter to år.

## Vanlige feil
- Å sammenligne produkter uten felles funksjonell enhet.
- Å se bare på bruksfasen og glemme produksjonen (eller omvendt).
- Å blande gram og kilogram, eller utslipp per år og totalt.

> Utslipp = mengde × utslippsfaktor. Sammenlign alltid per funksjonell enhet.`,
en: md`## What is it about?
How environmentally friendly is a product really? An electric car has no exhaust, but the battery causes large emissions when it is made. A **life cycle assessment** (LCA) adds up the emissions through the whole life of the product, from raw material to waste, so you can compare solutions fairly.

## Concepts and formulas
- **Life cycle phases:** raw material extraction → production → transport → use → end of life (recycling or waste).
- **Functional unit:** what you compare on, for example "transporting one person 1 km" or "heating a house for one year". Without a common functional unit the comparison is meaningless.
- **Emission factor:** kg CO₂ equivalents per unit (per kg of steel, per km, per kWh). The emission is the amount times the factor:
$$E = \text{amount}\cdot\text{emission factor}$$
- **CO₂ equivalents** (CO₂e): other greenhouse gases are converted using the global warming potential GWP. Methane has a GWP of about 28, so 1 kg of methane ≈ 28 kg CO₂e.
- **Scope 1, 2 and 3:** direct emissions from your own operations (1), from purchased energy (2) and the rest of the value chain, such as purchased goods and customers' use (3).
- **Payback time** for a climate measure: extra emissions from production divided by the annual saving.

## How to solve the problems
1. Decide the functional unit and which phases are included.
2. Multiply each amount by its emission factor, and add up.
3. Watch the units: g or kg, kWh or MWh, per year or in total.

### Example
A heat pump causes 300 kg CO₂e in production and saves 150 kg CO₂e per year.
1. Payback time: $300/150 = 2$ years.
2. Over a 15-year lifetime it saves $15\cdot 150 - 300 = 1950$ kg CO₂e.
3. The measure pays off for the climate after two years.

## Common mistakes
- Comparing products without a common functional unit.
- Looking only at the use phase and forgetting production (or the other way round).
- Mixing grams and kilograms, or emissions per year and in total.

> Emissions = amount × emission factor. Always compare per functional unit.`
});
BIQ("STKD6610", U, [
  ["Produksjon av stål gir omtrent 1,9 kg CO₂e per kg. Hvor store utslipp gir 500 kg stål?",
   { n: 950, tol: 1, u: "kg" },
   S`$E = 500\cdot 1{,}9 = 950$ kg CO₂e.`,
   "Producing steel causes about 1.9 kg CO₂e per kg. How large are the emissions from 500 kg of steel?", null,
   S`$E = 500\cdot 1.9 = 950$ kg CO₂e.`],
  ["En bensinbil slipper ut 0,12 kg CO₂e per km og kjøres 20 000 km i året. Hvor store er de årlige utslippene fra kjøringen?",
   { n: 2400, tol: 2, u: "kg" },
   S`$E = 20\,000\cdot 0{,}12 = 2400$ kg CO₂e i året, altså 2,4 tonn.`,
   "A petrol car emits 0.12 kg CO₂e per km and is driven 20,000 km per year. How large are the annual emissions from driving?", null,
   S`$E = 20\,000\cdot 0.12 = 2400$ kg CO₂e per year, i.e. 2.4 tonnes.`],
  ["Hva er en funksjonell enhet i en livsløpsanalyse?",
   ["Den felles ytelsen du sammenligner produktene på, for eksempel «transport av én person 1 km»", "Den dyreste delen av produktet", "Enheten utslippene måles i, for eksempel kg", "Den delen av produktet som slites ut først"],
   "Skal en elbil og en bensinbil sammenlignes, må det skje for samme nytte. Da blir det rettferdig: utslipp per personkilometer, ikke per bil.",
   "What is a functional unit in a life cycle assessment?",
   ["The common performance you compare the products on, for example \"transporting one person 1 km\"", "The most expensive part of the product", "The unit emissions are measured in, for example kg", "The part of the product that wears out first"],
   "If an electric car and a petrol car are to be compared, it must be for the same benefit. Then it is fair: emissions per passenger kilometre, not per car."],
  ["En deponi lekker 10 kg metan. Metan har GWP 28. Hvor mange kg CO₂-ekvivalenter tilsvarer det?",
   { n: 280, tol: 0.5, u: "kg" },
   S`$10\cdot 28 = 280$ kg CO₂e.`,
   "A landfill leaks 10 kg of methane. Methane has a GWP of 28. How many kg of CO₂ equivalents is that?", null,
   S`$10\cdot 28 = 280$ kg CO₂e.`],
  ["Hvilke utslipp hører til scope 2 i et klimaregnskap?",
   ["Indirekte utslipp fra innkjøpt energi, som strøm og fjernvarme", "Direkte utslipp fra egne kjøretøy og maskiner", "Utslipp fra kundenes bruk av produktene", "Utslipp fra leverandørenes fabrikker"],
   "Scope 1 er egne, direkte utslipp. Scope 2 er utslipp knyttet til energien du kjøper. Scope 3 er resten av verdikjeden.",
   "Which emissions belong to scope 2 in a carbon account?",
   ["Indirect emissions from purchased energy, such as electricity and district heating", "Direct emissions from your own vehicles and machines", "Emissions from customers' use of the products", "Emissions from the suppliers' factories"],
   "Scope 1 is your own direct emissions. Scope 2 is emissions linked to the energy you buy. Scope 3 is the rest of the value chain."],
  ["En bedrift bruker 4000 kWh strøm med utslippsfaktor 0,3 kg CO₂e/kWh (europeisk miks). Hvor store er utslippene?",
   { n: 1200, tol: 1, u: "kg" },
   S`$E = 4000\cdot 0{,}3 = 1200$ kg CO₂e.`,
   "A company uses 4000 kWh of electricity with an emission factor of 0.3 kg CO₂e/kWh (European mix). How large are the emissions?", null,
   S`$E = 4000\cdot 0.3 = 1200$ kg CO₂e.`],
  ["Hvilken livsløpsfase gir normalt de største utslippene for en bensinbil?",
   ["Bruksfasen (drivstoffet som brennes)", "Produksjonen av karosseriet", "Transporten fra fabrikken", "Skrapingen til slutt"],
   "En bensinbil brenner tusenvis av liter bensin i løpet av levetiden. Det gir langt mer enn utslippene fra å lage bilen. For elbiler er produksjonen (batteriet) en mye større del.",
   "Which life cycle phase normally causes the largest emissions for a petrol car?",
   ["The use phase (the fuel that is burned)", "Producing the body", "Transport from the factory", "Scrapping at the end"],
   "A petrol car burns thousands of litres of petrol during its life. That gives far more than the emissions from making the car. For electric cars, production (the battery) is a much larger share."],
  ["En varmepumpe gir 300 kg CO₂e ved produksjon og sparer 150 kg CO₂e i året. Hvor lang er tilbakebetalingstiden for klimaet?",
   { n: 2, tol: 0.01, u: "år" },
   S`$300/150 = 2$ år.`,
   "A heat pump causes 300 kg CO₂e in production and saves 150 kg CO₂e per year. What is the climate payback time?", null,
   S`$300/150 = 2$ years.`]
]);
GEN("STKD6610", U,
 () => { const mats = [["stål", "steel", 1.9], ["aluminium", "aluminium", 8.2], ["betong", "concrete", 0.13], ["plast", "plastic", 2.5], ["glass", "glass", 0.9]];
   const [nb, en, f] = R.p(mats), m = R.p([50, 100, 200, 250, 500, 800, 1000, 2000]), E = m * f;
   return [T(`Produksjon av ${nb} gir omtrent ${nf(f)} kg CO₂e per kg. Hvor store utslipp gir ${m} kg ${nb}?`, `Producing ${en} causes about ${nf(f)} kg CO₂e per kg. How large are the emissions from ${m} kg of ${en}?`),
     { n: E, tol: rel(E), u: "kg" },
     S`$E = ${m}\cdot ${mf(f)} = ${mf(E)}$ kg CO₂e.`]; },
 () => { const km = R.p([5000, 8000, 10000, 12000, 15000, 20000, 25000]), f = R.p([0.05, 0.08, 0.1, 0.12, 0.15, 0.18]), E = km * f;
   return [T(`En bil slipper ut ${nf(f)} kg CO₂e per km og kjøres ${nf(km)} km i året. Hvor store er de årlige utslippene?`, `A car emits ${nf(f)} kg CO₂e per km and is driven ${nf(km)} km per year. How large are the annual emissions?`),
     { n: E, tol: rel(E), u: "kg" },
     S`$E = ${km}\cdot ${mf(f)} = ${mf(E)}$ kg CO₂e.`]; },
 () => { const m = R.f(0.5, 50, 0.5), E = m * 28;
   return [T(`Et anlegg lekker ${nf(m)} kg metan. Metan har GWP 28. Hvor mange kg CO₂e tilsvarer det?`, `A plant leaks ${nf(m)} kg of methane. Methane has a GWP of 28. How many kg CO₂e is that?`),
     { n: E, tol: rel(E), u: "kg" },
     S`$${mf(m)}\cdot 28 = ${mf(E)}$ kg CO₂e.`]; },
 () => { const P = R.p([100, 200, 300, 500, 800, 1000, 1500, 3000]), s = R.p([50, 75, 100, 120, 150, 200, 250, 400]), t = P / s;
   return [T(`Et klimatiltak gir ${P} kg CO₂e ved produksjon og sparer ${s} kg CO₂e i året. Hvor lang er tilbakebetalingstiden?`, `A climate measure causes ${P} kg CO₂e in production and saves ${s} kg CO₂e per year. What is the payback time?`),
     { n: t, tol: rel(t), u: "år" },
     S`$${P}/${s} \approx ${mf(t)}$.`]; },
 () => { const kwh = R.p([1000, 2500, 4000, 6000, 10000, 20000]), f = R.p([0.02, 0.1, 0.25, 0.3, 0.4, 0.5]), E = kwh * f;
   return [T(`En bedrift bruker ${nf(kwh)} kWh strøm med utslippsfaktor ${nf(f)} kg CO₂e/kWh. Hvor store er utslippene?`, `A company uses ${nf(kwh)} kWh of electricity with an emission factor of ${nf(f)} kg CO₂e/kWh. How large are the emissions?`),
     { n: E, tol: rel(E), u: "kg" },
     S`$E = ${kwh}\cdot ${mf(f)} = ${mf(E)}$ kg CO₂e.`]; }
);
}
})();
