// ============================================================
//  add_elec.js – teori, faste oppgaver og generatorer for
//  ELPE1300 (Elektriske kretser), ELEK (Elektronikk),
//  ELFT2500 (Innebygde systemer og måleteknikk) og
//  ELFT2400 (Reguleringsteknikk / kybernetikk)
// ============================================================
(() => {

// ================= ELPE1300 – enhet 0: Likestrøm =================
THEORY("ELPE1300", 0, {
nb: `## Hva handler det om?
En likestrømskrets har spenning og strøm som ikke skifter retning: batterier, solcellepaneler og elektronikk som forsynes fra et likespenningsnett. Selv om vekselstrøm dominerer kraftnettet, er likestrømsanalyse grunnmuren i alt kretsregning – de samme lovene (Ohms lov, Kirchhoffs lover) gjelder også for øyeblikksverdiene i vekselstrømkretser.

Målet er alltid det samme: finn strømmen og spenningen i hver gren av kretsen ut fra kildene og motstandene.

## Begreper og formler
- Ohms lov: $U = RI$, altså $I = U/R$ og $R = U/I$.
- Effekt i en motstand: $P = UI = RI^2 = U^2/R$.
- Motstander i serie: $R_{tot} = R_1 + R_2 + \\dots$ (strømmen er lik i alle).
- Motstander i parallell: $\\dfrac{1}{R_{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$ (spenningen er lik over alle).
- Konduktans $G = 1/R$, målt i siemens (S). I parallell adderes konduktansene: $G_{tot} = G_1 + G_2 + \\dots$
- Spenningsdeler (to motstander i serie over $U$): $U_2 = U\\dfrac{R_2}{R_1+R_2}$.
- Strømdeler (to motstander i parallell med total strøm $I$): $I_1 = I\\dfrac{R_2}{R_1+R_2}$ (mest strøm i den minste motstanden).
- Kirchhoffs strømlov (KCL): summen av strømmer inn i et knutepunkt er lik summen ut.
- Kirchhoffs spenningslov (KVL): summen av spenninger rundt en lukket sløyfe er null.

## Slik løser du oppgavene
1. Tegn kretsen og merk kjente spenninger, strømmer og motstander.
2. Slå sammen motstander som er rene serie- eller parallellkoblinger, ett steg om gangen, til kretsen er enkel nok.
3. Bruk Ohms lov på den enkleste formen av kretsen til å finne totalstrømmen fra kilden.
4. Gå «bakover» gjennom kretsen: bruk spenningsdeler/strømdeler eller KVL/KCL til å finne spenning og strøm i hver gren.
5. Kontroller med et effektregnskap eller en ligning du ikke har brukt.

### Eksempel
En spenningskilde på 20 V driver $R_1 = 4$ Ω i serie med en parallellkobling av $R_2 = 12$ Ω og $R_3 = 6$ Ω. Finn strømmen gjennom $R_3$.
1. Slå sammen parallellkoblingen: $R_{23} = \\dfrac{12\\cdot 6}{12+6} = 4$ Ω.
2. Totalmotstand: $R_{tot} = 4 + 4 = 8$ Ω.
3. Totalstrøm: $I = U/R_{tot} = 20/8 = 2{,}5$ A.
4. Spenningen over parallellkoblingen: $U_{23} = I\\cdot R_{23} = 2{,}5\\cdot 4 = 10$ V.
5. Strøm i $R_3$: $I_3 = U_{23}/R_3 = 10/6 \\approx 1{,}67$ A.

Svar: $I_3 \\approx 1{,}67$ A.

## Vanlige feil
- Å slå sammen motstander som verken er rene serie- eller parallellkoblinger, uten å forenkle steg for steg først.
- Å bruke strømdeleren feil vei: mest strøm går i den *minste* motstanden, ikke den største.
- Å blande volt, milliampere og kiloohm uten å regne om til samme grunnenhet (V, A, Ω).
- Å glemme at spenningen er lik over alle grener i en parallellkobling, ikke summert.

> I serie er strømmen den samme og spenningen fordeler seg; i parallell er spenningen den samme og strømmen fordeler seg. Slå sammen kretsen ett steg om gangen, finn totalstrømmen, og gå så bakover.`,
en: `## What is it about?
A DC circuit has voltage and current that do not change direction: batteries, solar panels and electronics powered from a DC bus. Even though AC dominates the power grid, DC analysis is the foundation of all circuit calculations – the same laws (Ohm's law, Kirchhoff's laws) also apply to instantaneous values in AC circuits.

The goal is always the same: find the current and voltage in every branch of the circuit from the sources and resistors.

## Concepts and formulas
- Ohm's law: $U = RI$, so $I = U/R$ and $R = U/I$.
- Power in a resistor: $P = UI = RI^2 = U^2/R$.
- Resistors in series: $R_{tot} = R_1 + R_2 + \\dots$ (the current is the same in all of them).
- Resistors in parallel: $\\dfrac{1}{R_{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$ (the voltage is the same across all of them).
- Conductance $G = 1/R$, measured in siemens (S). In parallel the conductances add: $G_{tot} = G_1 + G_2 + \\dots$
- Voltage divider (two resistors in series across $U$): $U_2 = U\\dfrac{R_2}{R_1+R_2}$.
- Current divider (two resistors in parallel with total current $I$): $I_1 = I\\dfrac{R_2}{R_1+R_2}$ (most of the current flows through the smaller resistor).
- Kirchhoff's current law (KCL): the sum of currents into a node equals the sum out.
- Kirchhoff's voltage law (KVL): the sum of voltages around a closed loop is zero.

## How to solve the problems
1. Draw the circuit and mark the known voltages, currents and resistors.
2. Combine resistors that are pure series or parallel connections, one step at a time, until the circuit is simple enough.
3. Use Ohm's law on the simplest form of the circuit to find the total current from the source.
4. Work backward through the circuit: use the voltage/current divider or KVL/KCL to find the voltage and current in each branch.
5. Check with a power balance or an equation you have not used.

### Example
A voltage source of 20 V drives $R_1 = 4$ Ω in series with a parallel combination of $R_2 = 12$ Ω and $R_3 = 6$ Ω. Find the current through $R_3$.
1. Combine the parallel pair: $R_{23} = \\dfrac{12\\cdot 6}{12+6} = 4$ Ω.
2. Total resistance: $R_{tot} = 4 + 4 = 8$ Ω.
3. Total current: $I = U/R_{tot} = 20/8 = 2.5$ A.
4. Voltage across the parallel pair: $U_{23} = I\\cdot R_{23} = 2.5\\cdot 4 = 10$ V.
5. Current in $R_3$: $I_3 = U_{23}/R_3 = 10/6 \\approx 1.67$ A.

Answer: $I_3 \\approx 1.67$ A.

## Common mistakes
- Combining resistors that are neither pure series nor pure parallel connections, without simplifying step by step first.
- Using the current divider backward: most of the current flows through the *smallest* resistor, not the largest.
- Mixing volts, milliamps and kilohms without converting to the same base unit (V, A, Ω).
- Forgetting that the voltage is the same across every branch of a parallel combination, not summed.

> In series the current is the same and the voltage divides; in parallel the voltage is the same and the current divides. Combine the circuit one step at a time, find the total current, then work backward.`
});

BIQ("ELPE1300", 0, [
 ["Du dobler strømmen gjennom en motstand ($R$ er konstant). Hva skjer med effekten som utvikles i motstanden?",
  ["Den firedobles", "Den dobles", "Den halveres", "Den er uendret"],
  "Effekten er $P = RI^2$, kvadratisk i strømmen: dobler du $I$, firedobler du $P$.",
  "You double the current through a resistor ($R$ constant). What happens to the power dissipated in the resistor?",
  ["It quadruples", "It doubles", "It is halved", "It is unchanged"],
  "Power is $P = RI^2$, quadratic in the current: doubling $I$ quadruples $P$."],
 ["Hva er sammenhengen mellom konduktans $G$ og resistans $R$?",
  ["$G = 1/R$, målt i siemens (S)", "$G = R$, målt i ohm", "$G = R^2$", "$G$ måles i ampere"],
  "Konduktans er den inverse av resistans. I en parallellkobling adderes konduktansene: $G_{tot} = G_1 + G_2 + \\dots$",
  "What is the relationship between conductance $G$ and resistance $R$?",
  ["$G = 1/R$, measured in siemens (S)", "$G = R$, measured in ohms", "$G = R^2$", "$G$ is measured in amperes"],
  "Conductance is the inverse of resistance. In a parallel combination the conductances add: $G_{tot} = G_1 + G_2 + \\dots$"],
 ["En spenningskilde på 24 V driver $R_1 = 6$ Ω i serie med to parallellkoblede motstander $R_2 = 12$ Ω og $R_3 = 12$ Ω. Hvor stor er strømmen fra kilden?",
  { n: 2, tol: 0.02, u: "A" },
  "Parallellkoblingen: $R_{23} = 12/2 = 6$ Ω. Totalmotstand $R_1+R_{23} = 12$ Ω. $I = U/R_{tot} = 24/12 = 2$ A.",
  "A voltage source of 24 V drives $R_1 = 6$ Ω in series with two parallel resistors $R_2 = 12$ Ω and $R_3 = 12$ Ω. What is the current from the source?",
  null,
  "Parallel pair: $R_{23} = 12/2 = 6$ Ω. Total resistance $R_1+R_{23} = 12$ Ω. $I = U/R_{tot} = 24/12 = 2$ A."],
 ["En 20 V kilde driver $R_1 = 4$ Ω i serie med en parallellkobling av $R_2 = 12$ Ω og $R_3 = 6$ Ω. Hvor stor effekt avgir kilden totalt?",
  { n: 50, tol: 0.5, u: "W" },
  "Parallellkoblingen: $R_{23} = \\dfrac{12\\cdot 6}{18} = 4$ Ω. Totalmotstand $R_1+R_{23} = 8$ Ω. Strøm fra kilden: $I = 20/8 = 2{,}5$ A. Effekt: $P = UI = 20\\cdot 2{,}5 = 50$ W.",
  "A 20 V source drives $R_1 = 4$ Ω in series with a parallel combination of $R_2 = 12$ Ω and $R_3 = 6$ Ω. What total power does the source deliver?",
  null,
  "Parallel pair: $R_{23} = \\dfrac{12\\cdot 6}{18} = 4$ Ω. Total resistance $R_1+R_{23} = 8$ Ω. Current from the source: $I = 20/8 = 2.5$ A. Power: $P = UI = 20\\cdot 2.5 = 50$ W."]
]);

GEN("ELPE1300", 0,
 // enkel: merkestrøm fra effekt og spenning
 () => { const U = R.p([6, 9, 12, 24, 48, 110, 230]), P = R.f(2, 200, 1), I = P / U;
   return [T(`En lyspære er merket ${nf(P)} W og ${U} V. Hvor stor er merkestrømmen?`,
             `A light bulb is rated ${nf(P)} W and ${U} V. What is its rated current?`),
     { n: I, tol: rel(I), u: "A" },
     T(`$I = P/U = ${mf(P)}/${U} \\approx ${mf(I, 3)}$ A.`,
       `$I = P/U = ${mf(P)}/${U} \\approx ${mf(I, 3)}$ A.`)]; },
 // middels: serie-parallell nettverk, totalstrøm
 () => { const R1 = R.f(1, 20, 0.5), R2 = R.f(2, 40, 1), R3 = R.f(2, 40, 1), U = R.f(5, 48, 1);
   const R23 = (R2 * R3) / (R2 + R3), Rt = R1 + R23, I = U / Rt;
   return [T(`En spenningskilde på ${nf(U)} V driver $R_1 = ${nf(R1)}$ Ω i serie med to parallellkoblede motstander $R_2 = ${nf(R2)}$ Ω og $R_3 = ${nf(R3)}$ Ω. Hvor stor er strømmen fra kilden?`,
             `A voltage source of ${nf(U)} V drives $R_1 = ${nf(R1)}$ Ω in series with two parallel resistors $R_2 = ${nf(R2)}$ Ω and $R_3 = ${nf(R3)}$ Ω. What is the current from the source?`),
     { n: I, tol: rel(I), u: "A" },
     T(`Parallellkoblingen: $R_{23} = \\dfrac{${mf(R2)}\\cdot ${mf(R3)}}{${mf(R2)}+${mf(R3)}} \\approx ${mf(R23)}$ Ω. Totalmotstand $R_1+R_{23} \\approx ${mf(Rt)}$ Ω. $I = U/R_{tot} \\approx ${mf(I, 3)}$ A.`,
       `Parallel pair: $R_{23} = \\dfrac{${mf(R2)}\\cdot ${mf(R3)}}{${mf(R2)}+${mf(R3)}} \\approx ${mf(R23)}$ Ω. Total resistance $R_1+R_{23} \\approx ${mf(Rt)}$ Ω. $I = U/R_{tot} \\approx ${mf(I, 3)}$ A.`)]; },
 // eksamen: effekt i én av to parallellgrener
 () => { const R1 = R.f(1, 15, 0.5), R2 = R.f(3, 30, 1), R3 = R.f(3, 30, 1), U = R.f(9, 48, 1);
   const R23 = (R2 * R3) / (R2 + R3), Rt = R1 + R23, It = U / Rt, U23 = It * R23, I2 = U23 / R2, P2 = I2 * I2 * R2;
   return [T(`En belysningskrets kobles til ${nf(U)} V. $R_1 = ${nf(R1)}$ Ω står i serie med to parallellkoblede lastmotstander $R_2 = ${nf(R2)}$ Ω og $R_3 = ${nf(R3)}$ Ω. Hvor stor effekt utvikles i $R_2$?`,
             `A lighting circuit is connected to ${nf(U)} V. $R_1 = ${nf(R1)}$ Ω is in series with two parallel load resistors $R_2 = ${nf(R2)}$ Ω and $R_3 = ${nf(R3)}$ Ω. How much power is dissipated in $R_2$?`),
     { n: P2, tol: rel(P2), u: "W" },
     T(`$R_{23} \\approx ${mf(R23)}$ Ω, $R_{tot} \\approx ${mf(Rt)}$ Ω, $I_{tot} = U/R_{tot} \\approx ${mf(It, 3)}$ A. Spenningen over parallellkoblingen: $U_{23} = I_{tot}R_{23} \\approx ${mf(U23)}$ V. Strøm i $R_2$: $I_2 = U_{23}/R_2 \\approx ${mf(I2, 3)}$ A. Effekt: $P_2 = I_2^2R_2 \\approx ${mf(P2)}$ W.`,
       `$R_{23} \\approx ${mf(R23)}$ Ω, $R_{tot} \\approx ${mf(Rt)}$ Ω, $I_{tot} = U/R_{tot} \\approx ${mf(It, 3)}$ A. Voltage across the parallel pair: $U_{23} = I_{tot}R_{23} \\approx ${mf(U23)}$ V. Current in $R_2$: $I_2 = U_{23}/R_2 \\approx ${mf(I2, 3)}$ A. Power: $P_2 = I_2^2R_2 \\approx ${mf(P2)}$ W.`)]; }
);

// ================= ELPE1300 – enhet 1: Kondensator og spole =================
THEORY("ELPE1300", 1, {
nb: `## Hva handler det om?
Kondensatorer og spoler er de to grunnleggende energilagrende komponentene i elektroniske kretser. En kondensator lagrer energi i et elektrisk felt og «liker» konstant spenning, mens en spole lagrer energi i et magnetisk felt og «liker» konstant strøm. Denne motstanden mot endring er nøkkelen til alt fra tidsforsinkelser og filtre til svitsjede strømforsyninger og motorstyringer.

Fordi de reagerer på *endring* i stedet for øyeblikksverdien, kan de ikke beskrives med Ohms lov alene – de trenger en tidskonstant som forteller hvor fort spenningen eller strømmen når sin sluttverdi.

## Begreper og formler
- Kondensator: $i = C\\,\\dfrac{du}{dt}$. Ladning $Q = CU$. Energi $E = \\tfrac12CU^2$.
- Spole: $u = L\\,\\dfrac{di}{dt}$. Energi $E = \\tfrac12LI^2$.
- Kondensatorer i parallell: $C_{tot} = C_1 + C_2 + \\dots$ (som motstander i serie).
- Kondensatorer i serie: $\\dfrac{1}{C_{tot}} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots$ (motsatt av motstander – husk at kondensatorer «snur» kombinasjonsreglene).
- Spoler i serie: $L_{tot} = L_1 + L_2 + \\dots$ Spoler i parallell: $\\dfrac{1}{L_{tot}} = \\dfrac{1}{L_1} + \\dfrac{1}{L_2} + \\dots$ (samme regel som for motstander).
- Tidskonstant: $\\tau = RC$ for en kondensator, $\\tau = L/R$ for en spole.
- Oppladning fra 0 mot $U$: $u(t) = U(1 - e^{-t/\\tau})$. Utladning fra $U_0$: $u(t) = U_0e^{-t/\\tau}$.
- Spolestrøm som bygges opp mot $U/R$: $i(t) = \\dfrac{U}{R}(1 - e^{-t/\\tau})$.
- I likestrøm i stasjonær tilstand: kondensatoren er et brudd ($i=0$), spolen er en kortslutning ($u=0$).

## Slik løser du oppgavene
1. Finn tidskonstanten $\\tau$ (RC eller $L/R$) og sluttverdien komponenten går mot.
2. Sett opp riktig eksponentialformel ut fra om det er opplading/nedbygging (mot en sluttverdi ulik null) eller utlading/nedbrytning (mot null).
3. Sett inn tallverdier og pass på at $t$ og $\\tau$ har samme enhet.
4. Skal du finne *tiden* til en gitt verdi, løs formelen for $t$ ved å ta logaritmen på begge sider.
5. Sjekk grenseverdiene: ved $t=0$ skal du få startverdien, og for stor $t$ skal du nærme deg sluttverdien.

### Eksempel
En kondensator lades fra 0 V mot 10 V gjennom $R = 2$ kΩ, med $C = 100$ µF. Hvor lang tid tar det før spenningen når 8 V?
1. Tidskonstant: $\\tau = RC = 2000\\cdot 100\\cdot10^{-6} = 0{,}2$ s.
2. Oppladningsformel: $u(t) = 10(1 - e^{-t/0{,}2})$.
3. Sett $u = 8$: $8 = 10(1 - e^{-t/0{,}2})$, så $e^{-t/0{,}2} = 0{,}2$.
4. Ta logaritmen: $-t/0{,}2 = \\ln 0{,}2 \\approx -1{,}609$, altså $t \\approx 0{,}322$ s.

Svar: omtrent 0,32 s.

## Vanlige feil
- Å bruke oppladningsformelen når komponenten faktisk lades ut (eller omvendt).
- Å bytte om på reglene for serie/parallell mellom kondensator og spole – de er motsatte av hverandre og motsatte av motstander for kondensatoren.
- Å glemme at spolestrømmen (ikke spenningen) er den størrelsen som ikke kan hoppe momentant, og at kondensatorspenningen (ikke strømmen) ikke kan hoppe momentant.
- Å blande milli-, mikro- og nanofarad/henry uten å regne om til samme grunnenhet.

> Kondensatoren vil ha konstant spenning, spolen vil ha konstant strøm. Begge når 63 % av veien til sluttverdien etter én tidskonstant $\\tau$.`,
en: `## What is it about?
Capacitors and inductors are the two fundamental energy-storing components in electronic circuits. A capacitor stores energy in an electric field and "likes" constant voltage, while an inductor stores energy in a magnetic field and "likes" constant current. This resistance to change is the key to everything from time delays and filters to switched-mode power supplies and motor drives.

Because they respond to *change* rather than the instantaneous value, they cannot be described by Ohm's law alone – they need a time constant that tells you how fast the voltage or current reaches its final value.

## Concepts and formulas
- Capacitor: $i = C\\,\\dfrac{du}{dt}$. Charge $Q = CU$. Energy $E = \\tfrac12CU^2$.
- Inductor: $u = L\\,\\dfrac{di}{dt}$. Energy $E = \\tfrac12LI^2$.
- Capacitors in parallel: $C_{tot} = C_1 + C_2 + \\dots$ (like resistors in series).
- Capacitors in series: $\\dfrac{1}{C_{tot}} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots$ (the opposite of resistors – remember that capacitors "flip" the combination rules).
- Inductors in series: $L_{tot} = L_1 + L_2 + \\dots$ Inductors in parallel: $\\dfrac{1}{L_{tot}} = \\dfrac{1}{L_1} + \\dfrac{1}{L_2} + \\dots$ (the same rule as for resistors).
- Time constant: $\\tau = RC$ for a capacitor, $\\tau = L/R$ for an inductor.
- Charging from 0 toward $U$: $u(t) = U(1 - e^{-t/\\tau})$. Discharging from $U_0$: $u(t) = U_0e^{-t/\\tau}$.
- Inductor current building up toward $U/R$: $i(t) = \\dfrac{U}{R}(1 - e^{-t/\\tau})$.
- In DC steady state: the capacitor is an open circuit ($i=0$), the inductor is a short circuit ($u=0$).

## How to solve the problems
1. Find the time constant $\\tau$ (RC or $L/R$) and the final value the quantity is heading toward.
2. Set up the correct exponential formula depending on whether it is charging/building up (toward a nonzero final value) or discharging/decaying (toward zero).
3. Plug in the numbers, making sure $t$ and $\\tau$ use the same unit.
4. To find the *time* to reach a given value, solve the formula for $t$ by taking the logarithm on both sides.
5. Check the limiting cases: at $t=0$ you should get the starting value, and for large $t$ you should approach the final value.

### Example
A capacitor is charged from 0 V toward 10 V through $R = 2$ kΩ, with $C = 100$ µF. How long does it take for the voltage to reach 8 V?
1. Time constant: $\\tau = RC = 2000\\cdot 100\\cdot10^{-6} = 0.2$ s.
2. Charging formula: $u(t) = 10(1 - e^{-t/0.2})$.
3. Set $u = 8$: $8 = 10(1 - e^{-t/0.2})$, so $e^{-t/0.2} = 0.2$.
4. Take the logarithm: $-t/0.2 = \\ln 0.2 \\approx -1.609$, giving $t \\approx 0.322$ s.

Answer: about 0.32 s.

## Common mistakes
- Using the charging formula when the component is actually discharging (or the other way around).
- Mixing up the series/parallel rules for capacitors and inductors – they are opposite of each other, and opposite of resistors for the capacitor.
- Forgetting that inductor current (not voltage) is the quantity that cannot jump instantaneously, and that capacitor voltage (not current) cannot jump instantaneously.
- Mixing milli-, micro- and nanofarads/henries without converting to the same base unit.

> The capacitor wants constant voltage, the inductor wants constant current. Both reach 63% of the way to the final value after one time constant $\\tau$.`
});

BIQ("ELPE1300", 1, [
 ["To like kondensatorer på 100 µF kobles i serie. Hva er den totale kapasitansen?",
  ["50 µF", "200 µF", "100 µF", "0 µF"],
  "For kondensatorer i serie er $1/C_{tot} = 1/C_1 + 1/C_2$, altså det motsatte av motstander. For to like kondensatorer blir $C_{tot} = C/2 = 50$ µF.",
  "Two identical 100 µF capacitors are connected in series. What is the total capacitance?",
  ["50 µF", "200 µF", "100 µF", "0 µF"],
  "For capacitors in series, $1/C_{tot} = 1/C_1 + 1/C_2$, the opposite of resistors. For two identical capacitors, $C_{tot} = C/2 = 50$ µF."],
 ["To like spoler på 10 mH kobles i parallell (ingen gjensidig induktans). Hva er den totale induktansen?",
  ["5 mH", "20 mH", "10 mH", "0,5 mH"],
  "Spoler følger de samme kombinasjonsreglene som motstander: i parallell er $1/L_{tot} = 1/L_1 + 1/L_2$, som gir $L_{tot} = L/2 = 5$ mH for to like spoler.",
  "Two identical 10 mH inductors are connected in parallel (no mutual inductance). What is the total inductance?",
  ["5 mH", "20 mH", "10 mH", "0.5 mH"],
  "Inductors follow the same combination rules as resistors: in parallel, $1/L_{tot} = 1/L_1 + 1/L_2$, giving $L_{tot} = L/2 = 5$ mH for two identical inductors."],
 ["En kondensator på 220 µF lades til 15 V. Hvor stor ladning lagres?",
  { n: 3.3, tol: 0.03, u: "mC" },
  "$Q = CU = 220\\cdot10^{-6}\\cdot 15 = 3{,}3\\cdot10^{-3}$ C $= 3{,}3$ mC.",
  "A 220 µF capacitor is charged to 15 V. How much charge is stored?",
  null,
  "$Q = CU = 220\\cdot10^{-6}\\cdot 15 = 3.3\\cdot10^{-3}$ C $= 3.3$ mC."],
 ["En kondensator lades fra 0 V mot 12 V gjennom $R = 4$ kΩ, med $C = 500$ µF. Hvor lang tid tar det før spenningen når 9 V?",
  { n: 2.7726, tol: 0.03, u: "s" },
  "$\\tau = RC = 4000\\cdot 500\\cdot10^{-6} = 2$ s. $9 = 12(1-e^{-t/2})$ gir $e^{-t/2} = 0{,}25$, så $t = -2\\ln 0{,}25 \\approx 2{,}773$ s.",
  "A capacitor is charged from 0 V toward 12 V through $R = 4$ kΩ, with $C = 500$ µF. How long does it take for the voltage to reach 9 V?",
  null,
  "$\\tau = RC = 4000\\cdot 500\\cdot10^{-6} = 2$ s. $9 = 12(1-e^{-t/2})$ gives $e^{-t/2} = 0.25$, so $t = -2\\ln 0.25 \\approx 2.773$ s."]
]);

GEN("ELPE1300", 1,
 // enkel: ladning på en kondensator
 () => { const C = R.p([1, 2.2, 4.7, 10, 22, 47, 100, 220, 470, 1000]), U = R.f(3, 48, 0.5), Q = C * U;
   return [T(`En kondensator på ${C} µF lades til ${nf(U)} V. Hvor stor ladning lagres?`,
             `A capacitor of ${C} µF is charged to ${nf(U)} V. How much charge is stored?`),
     { n: Q, tol: rel(Q), u: "µC" },
     T(`$Q = CU = ${C}\\cdot ${mf(U)} \\approx ${mf(Q, 0)}$ µC.`,
       `$Q = CU = ${C}\\cdot ${mf(U)} \\approx ${mf(Q, 0)}$ µC.`)]; },
 // middels: utladning til vilkårlig tidspunkt
 () => { const R1 = R.i(1, 20), C = R.p([1, 2.2, 4.7, 10, 22, 47, 100]), U0 = R.f(5, 48, 0.5), t = R.f(0.5, 8, 0.5);
   const tau = R1 * C, u = U0 * Math.exp(-t / tau);
   return [T(`En kondensator på ${C} µF ladet til ${nf(U0)} V utlades gjennom en motstand på ${R1} kΩ. Hva er spenningen ${nf(t)} ms etter at utladningen starter?`,
             `A ${C} µF capacitor charged to ${nf(U0)} V discharges through a ${R1} kΩ resistor. What is the voltage ${nf(t)} ms after the discharge starts?`),
     { n: u, tol: rel(u, 0.01, 0.01), u: "V" },
     T(`$\\tau = RC = ${R1}\\cdot ${C} = ${mf(tau)}$ ms. $u(t) = U_0e^{-t/\\tau} = ${mf(U0)}\\cdot e^{-${nf(t)}/${mf(tau)}} \\approx ${mf(u, 3)}$ V.`,
       `$\\tau = RC = ${R1}\\cdot ${C} = ${mf(tau)}$ ms. $u(t) = U_0e^{-t/\\tau} = ${mf(U0)}\\cdot e^{-${nf(t)}/${mf(tau)}} \\approx ${mf(u, 3)}$ V.`)]; },
 // eksamen: tid til en gitt spenning under opplading
 () => { const R1 = R.f(0.5, 10, 0.5), C = R.p([10, 22, 47, 100, 220, 470, 1000]), U = R.f(5, 24, 0.5);
   const frac = R.f(0.5, 0.9, 0.05), target = U * frac, tau = R1 * 1000 * C * 1e-6, t = -tau * Math.log(1 - frac);
   return [T(`Et relé skal trekke inn når spenningen over en kondensator på ${C} µF, som lades gjennom en ${nf(R1)} kΩ motstand fra 0 V mot ${nf(U)} V, når ${nf(target)} V. Hvor lang tid tar det?`,
             `A relay must pull in once the voltage across a ${C} µF capacitor, charging through a ${nf(R1)} kΩ resistor from 0 V toward ${nf(U)} V, reaches ${nf(target)} V. How long does that take?`),
     { n: t, tol: rel(t, 0.01, 0.001), u: "s" },
     T(`$\\tau = RC = ${nf(R1)}\\cdot10^3\\cdot ${C}\\cdot10^{-6} \\approx ${mf(tau, 4)}$ s. $${mf(target)} = ${mf(U)}(1-e^{-t/\\tau})$ gir $e^{-t/\\tau} = ${mf(1 - frac, 3)}$, så $t = -\\tau\\ln(${mf(1 - frac, 3)}) \\approx ${mf(t, 3)}$ s.`,
       `$\\tau = RC = ${nf(R1)}\\cdot10^3\\cdot ${C}\\cdot10^{-6} \\approx ${mf(tau, 4)}$ s. $${mf(target)} = ${mf(U)}(1-e^{-t/\\tau})$ gives $e^{-t/\\tau} = ${mf(1 - frac, 3)}$, so $t = -\\tau\\ln(${mf(1 - frac, 3)}) \\approx ${mf(t, 3)}$ s.`)]; }
);

// ================= ELPE1300 – enhet 2: Vekselstrøm =================
THEORY("ELPE1300", 2, {
nb: `## Hva handler det om?
I vekselstrøm (AC) skifter spenning og strøm retning i takt med en sinusbølge, i stedet for å ligge konstant som i likestrøm. Dette er formen på spenningen i kraftnettet, og den gjør at kondensatorer og spoler oppfører seg helt annerledes enn i en likestrømskrets: de får en "motstand" som avhenger av frekvensen, kalt reaktans.

Målet med enheten er å kunne regne på impedans, strøm og effekt i en vekselstrømskrets, og å forstå forskjellen mellom aktiv, reaktiv og tilsynelatende effekt – noe som er avgjørende for alt fra motordimensjonering til fakturaen fra strømleverandøren.

## Begreper og formler
- Sinusformet størrelse: $u(t) = U_p\\sin(\\omega t + \\varphi)$, med toppverdi $U_p$, vinkelfrekvens $\\omega = 2\\pi f$ rad/s og periode $T = 1/f$.
- Effektivverdi (RMS): $U = U_p/\\sqrt2$ for en ren sinus. Nettspenningen 230 V er en RMS-verdi.
- Reaktans: spole $X_L = \\omega L = 2\\pi fL$, kondensator $X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}$.
- Impedans: $Z = R + jX$, med absoluttverdi $|Z| = \\sqrt{R^2+X^2}$ og fasevinkel $\\varphi = \\arctan(X/R)$.
- Strøm: $I = U/|Z|$, faseforskjøvet $\\varphi$ i forhold til spenningen.
- Effekt: aktiv effekt $P = UI\\cos\\varphi$ (W), reaktiv effekt $Q = UI\\sin\\varphi$ (VAr), tilsynelatende effekt $S = UI$ (VA), med $S^2 = P^2+Q^2$ og effektfaktor $\\cos\\varphi = P/S$.
- Resonans i seriell RLC: $X_L = X_C$ ved $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$; da er $Z=R$ (rent resistivt).
- Trefase (symmetrisk stjernekobling): linjespenning $U_L = \\sqrt3\\,U_f$; total aktiv effekt $P = \\sqrt3\\,U_LI_L\\cos\\varphi$.

## Slik løser du oppgavene
1. Regn ut vinkelfrekvensen $\\omega = 2\\pi f$ hvis du trenger den.
2. Finn reaktansen(e) til spoler/kondensatorer ved den aktuelle frekvensen.
3. Sett opp impedansen $Z=R+jX$ (induktiv reaktans er positiv, kapasitiv er negativ) og finn $|Z|$ og $\\varphi$.
4. Bruk $I=U/|Z|$ for strømmen, og $P=UI\\cos\\varphi$, $Q=UI\\sin\\varphi$, $S=UI$ for effektene.
5. For trefase: sjekk om oppgitt spenning er linje- eller fasespenning, og bruk $\\sqrt3$-faktoren riktig vei.

### Eksempel
En seriekrets med $R=30$ Ω og en spole $L=0,1$ H kobles til en 230 V, 50 Hz kilde. Finn strømmen og effektfaktoren.
1. Reaktans: $X_L = 2\\pi fL = 2\\pi\\cdot50\\cdot0,1\\approx31,4$ Ω.
2. Impedans: $|Z|=\\sqrt{30^2+31,4^2}=\\sqrt{900+986}\\approx43,4$ Ω.
3. Strøm: $I=U/|Z|=230/43,4\\approx5,29$ A.
4. Fasevinkel: $\\varphi=\\arctan(31,4/30)\\approx46,3^\\circ$, så $\\cos\\varphi\\approx0,69$.

Svar: $I\\approx5,29$ A, $\\cos\\varphi\\approx0,69$ (induktiv, strømmen henger etter spenningen).

## Vanlige feil
- Å blande sammen toppverdi og effektivverdi (RMS) – nettspenningen 230 V er alltid en RMS-verdi.
- Å glemme at $X_L$ og $X_C$ har motsatt fortegn i impedansen, og at $X_C$ *avtar* når frekvensen øker (motsatt av $X_L$).
- Å bruke fasespenning der linjespenning er oppgitt, eller omvendt, i trefaseberegninger.
- Å tro at tilsynelatende effekt $S$ kan brukes direkte som "nyttig" effekt – bare den aktive effekten $P$ gjør nyttig arbeid.

> Ved en frekvens $f$: spolen bremser strømmen mer jo høyere frekvensen er ($X_L$ opp), kondensatoren mindre ($X_C$ ned). Ved resonans er $X_L=X_C$ og impedansen er rent resistiv.`,
en: `## What is it about?
In alternating current (AC), voltage and current reverse direction in step with a sine wave, instead of staying constant as in direct current. This is the shape of the voltage in the power grid, and it makes capacitors and inductors behave very differently than in a DC circuit: they get an "opposition" to current that depends on frequency, called reactance.

The goal of this unit is to be able to compute impedance, current and power in an AC circuit, and to understand the difference between active, reactive and apparent power – something that is essential for everything from motor sizing to the bill from the power company.

## Concepts and formulas
- Sinusoidal quantity: $u(t) = U_p\\sin(\\omega t + \\varphi)$, with peak value $U_p$, angular frequency $\\omega = 2\\pi f$ rad/s and period $T = 1/f$.
- RMS value: $U = U_p/\\sqrt2$ for a pure sine wave. The 230 V mains voltage is always an RMS value.
- Reactance: inductor $X_L = \\omega L = 2\\pi fL$, capacitor $X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}$.
- Impedance: $Z = R + jX$, with magnitude $|Z| = \\sqrt{R^2+X^2}$ and phase angle $\\varphi = \\arctan(X/R)$.
- Current: $I = U/|Z|$, phase-shifted by $\\varphi$ relative to the voltage.
- Power: active power $P = UI\\cos\\varphi$ (W), reactive power $Q = UI\\sin\\varphi$ (VAr), apparent power $S = UI$ (VA), with $S^2 = P^2+Q^2$ and power factor $\\cos\\varphi = P/S$.
- Resonance in a series RLC circuit: $X_L = X_C$ at $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$; then $Z=R$ (purely resistive).
- Three-phase (balanced star connection): line voltage $U_L = \\sqrt3\\,U_f$; total active power $P = \\sqrt3\\,U_LI_L\\cos\\varphi$.

## How to solve the problems
1. Compute the angular frequency $\\omega = 2\\pi f$ if you need it.
2. Find the reactance(s) of the inductors/capacitors at the given frequency.
3. Set up the impedance $Z=R+jX$ (inductive reactance is positive, capacitive is negative) and find $|Z|$ and $\\varphi$.
4. Use $I=U/|Z|$ for the current, and $P=UI\\cos\\varphi$, $Q=UI\\sin\\varphi$, $S=UI$ for the powers.
5. For three-phase problems, check whether the given voltage is a line or a phase voltage, and apply the $\\sqrt3$ factor the right way.

### Example
A series circuit with $R=30$ Ω and an inductor $L=0.1$ H is connected to a 230 V, 50 Hz source. Find the current and the power factor.
1. Reactance: $X_L = 2\\pi fL = 2\\pi\\cdot50\\cdot0.1\\approx31.4$ Ω.
2. Impedance: $|Z|=\\sqrt{30^2+31.4^2}=\\sqrt{900+986}\\approx43.4$ Ω.
3. Current: $I=U/|Z|=230/43.4\\approx5.29$ A.
4. Phase angle: $\\varphi=\\arctan(31.4/30)\\approx46.3^\\circ$, so $\\cos\\varphi\\approx0.69$.

Answer: $I\\approx5.29$ A, $\\cos\\varphi\\approx0.69$ (inductive, the current lags the voltage).

## Common mistakes
- Mixing up peak value and RMS value – the 230 V mains voltage is always an RMS value.
- Forgetting that $X_L$ and $X_C$ have opposite signs in the impedance, and that $X_C$ *decreases* as frequency increases (the opposite of $X_L$).
- Using the phase voltage where the line voltage is given, or the other way around, in three-phase calculations.
- Thinking that apparent power $S$ can be used directly as "useful" power – only the active power $P$ does useful work.

> At a frequency $f$: the inductor resists current more as frequency rises ($X_L$ up), while the capacitor resists less ($X_C$ down). At resonance $X_L=X_C$ and the impedance is purely resistive.`
});

BIQ("ELPE1300", 2, [
 ["Med en rent kapasitiv last vil strømmen …",
  ["ligge 90° foran spenningen", "ligge 90° etter spenningen", "være i fase med spenningen", "ligge 180° foran spenningen"],
  "Huskeregel ELI the ICE man: i en kapasitiv last (C) kommer I før E, altså leder strømmen.",
  "With a purely capacitive load, the current will …",
  ["lead the voltage by 90°", "lag the voltage by 90°", "be in phase with the voltage", "lead the voltage by 180°"],
  "Mnemonic ELI the ICE man: in a capacitive load (C), I comes before E, so the current leads."],
 ["Hva skjer med den kapasitive reaktansen $X_C$ når frekvensen økes?",
  ["Den avtar", "Den øker", "Den er uendret", "Den blir negativ"],
  "$X_C = 1/(2\\pi fC)$ er omvendt proporsjonal med frekvensen, så $X_C$ avtar når $f$ øker – motsatt av $X_L$, som øker.",
  "What happens to the capacitive reactance $X_C$ when the frequency is increased?",
  ["It decreases", "It increases", "It stays the same", "It becomes negative"],
  "$X_C = 1/(2\\pi fC)$ is inversely proportional to frequency, so $X_C$ decreases as $f$ increases – the opposite of $X_L$, which increases."],
 ["Et symmetrisk trefaseanlegg har linjespenning 400 V og linjestrøm 20 A med effektfaktor $\\cos\\varphi = 0,85$. Hva er total aktiv effekt?",
  { n: 11777.9, tol: 120, u: "W" },
  "$P = \\sqrt3\\,U_LI_L\\cos\\varphi = 1,732\\cdot400\\cdot20\\cdot0,85\\approx11778$ W.",
  "A balanced three-phase installation has a line voltage of 400 V and a line current of 20 A with power factor $\\cos\\varphi = 0.85$. What is the total active power?",
  null,
  "$P = \\sqrt3\\,U_LI_L\\cos\\varphi = 1.732\\cdot400\\cdot20\\cdot0.85\\approx11778$ W."]
]);

GEN("ELPE1300", 2,
 // enkel: periodetid fra frekvens
 () => { const f = R.f(20, 2000, 5), Ts = 1 / f, Tms = 1000 / f;
   return [T(`En vekselspenning har frekvensen ${nf(f)} Hz. Hva er periodetiden?`,
             `An AC voltage has a frequency of ${nf(f)} Hz. What is its period?`),
     { n: Tms, tol: rel(Tms), u: "ms" },
     T(`$T = 1/f = 1/${mf(f)} \\approx ${mf(Ts, 6)}$ s $= ${mf(Tms, 3)}$ ms.`,
       `$T = 1/f = 1/${mf(f)} \\approx ${mf(Ts, 6)}$ s $= ${mf(Tms, 3)}$ ms.`)]; },
 // eksamen: kondensator for faseforbedring
 () => { const Pkw = R.f(2, 80, 1), cos1 = R.f(0.6, 0.85, 0.01), cos2 = R.f(0.9, 0.98, 0.01), U = R.p([230, 400]), f = R.p([50, 60]);
   const Pw = Pkw * 1000, phi1 = Math.acos(cos1), phi2 = Math.acos(cos2), Q1 = Pw * Math.tan(phi1), Q2 = Pw * Math.tan(phi2), Qc = Q1 - Q2, Cf = Qc / (2 * Math.PI * f * U * U), CuF = Cf * 1e6;
   return [T(`Et industrianlegg har en last på ${nf(Pkw)} kW med effektfaktor $\\cos\\varphi_1 = ${mf(cos1)}$ (induktiv), tilkoblet ${U} V, ${f} Hz. Hvor stor kondensator (i µF, parallellkoblet over lasten) kreves for å forbedre effektfaktoren til $\\cos\\varphi_2 = ${mf(cos2)}$?`,
             `An industrial plant has a load of ${nf(Pkw)} kW with power factor $\\cos\\varphi_1 = ${mf(cos1)}$ (inductive), connected at ${U} V, ${f} Hz. How large a capacitor (in µF, connected in parallel across the load) is required to improve the power factor to $\\cos\\varphi_2 = ${mf(cos2)}$?`),
     { n: CuF, tol: rel(CuF, 0.02, 0.5), u: "µF" },
     T(`$\\varphi_1=\\arccos(${mf(cos1)})$, $Q_1=P\\tan\\varphi_1\\approx${mf(Q1 / 1000, 3)}$ kVAr. $\\varphi_2=\\arccos(${mf(cos2)})$, $Q_2=P\\tan\\varphi_2\\approx${mf(Q2 / 1000, 3)}$ kVAr. Nødvendig kondensatoreffekt: $Q_C=Q_1-Q_2\\approx${mf(Qc / 1000, 3)}$ kVAr. Kapasitans: $C=Q_C/(2\\pi fU^2)\\approx${mf(CuF, 1)}$ µF.`,
       `$\\varphi_1=\\arccos(${mf(cos1)})$, $Q_1=P\\tan\\varphi_1\\approx${mf(Q1 / 1000, 3)}$ kVAr. $\\varphi_2=\\arccos(${mf(cos2)})$, $Q_2=P\\tan\\varphi_2\\approx${mf(Q2 / 1000, 3)}$ kVAr. Required capacitor reactive power: $Q_C=Q_1-Q_2\\approx${mf(Qc / 1000, 3)}$ kVAr. Capacitance: $C=Q_C/(2\\pi fU^2)\\approx${mf(CuF, 1)}$ µF.`)]; }
);

// ================= ELPE1300 – enhet 3: Nettverksanalyse =================
THEORY("ELPE1300", 3, {
nb: `## Hva handler det om?
Nettverksanalyse handler om systematiske metoder for å finne strøm og spenning i kretser som er for kompliserte til å forenkle med bare serie-/parallellkobling. I stedet for å regne fra grunnen hver gang, bruker ingeniører faste oppskrifter: knutepunktmetoden, sløyfemetoden, superposisjon og Thévenin/Norton-ekvivalenter.

Disse metodene er spesielt nyttige når en krets skal analyseres for mange forskjellige laster, eller når du bare er interessert i hva som skjer i én bestemt gren av en stor krets.

## Begreper og formler
- Knutepunktmetoden (node-voltage): sett jord i ett knutepunkt, skriv KCL for de andre $n-1$ knutepunktene med spenningene som ukjente.
- Sløyfemetoden (mesh/loop): skriv KVL for hver uavhengig sløyfe med sløyfestrømmer som ukjente. En planar krets med $b$ grener og $n$ knutepunkter har $m=b-n+1$ uavhengige sløyfer.
- Superposisjon: i en lineær krets med flere uavhengige kilder er responsen (strøm eller spenning) summen av bidragene fra hver kilde alene, med de andre kildene slått av (spenningskilder kortsluttes, strømkilder brytes).
- Thévenin-ekvivalent: enhver lineær to-polet krets kan erstattes med én spenningskilde $U_{th}$ i serie med én motstand $R_{th}$, sett fra to gitte klemmer.
- Norton-ekvivalent: samme krets som en strømkilde $I_N = U_{th}/R_{th}$ i parallell med $R_{th}$.
- $R_{th}$ finnes ved å slå av alle uavhengige kilder og beregne motstanden sett fra klemmene, eller ved $R_{th} = U_{åpen}/I_{kort}$.
- Maksimal effektoverføring til en last skjer når $R_L = R_{th}$, og da er $P_{maks} = U_{th}^2/(4R_{th})$.

## Slik løser du oppgavene
1. Velg metode ut fra hva du trenger: superposisjon eller Thévenin når du bare vil vite hva som skjer i én gren, node-/sløyfemetoden for hele kretsen.
2. Ved superposisjon: slå av alle kilder unntatt én, regn ut bidraget, gjenta for hver kilde, og legg sammen til slutt (aldri for effekt).
3. Ved Thévenin: finn $U_{th}$ som tomgangsspenningen over klemmene, og $R_{th}$ med kildene slått av.
4. Sett den ukjente lasten tilbake på den forenklede (Thévenin/Norton) kretsen og løs med Ohms lov.
5. Sjekk svaret: gir grensetilfeller ($R_L=0$ eller $R_L\\to\\infty$) fornuftige strømmer og spenninger?

### Eksempel
En krets har en spenningskilde $U_1 = 12$ V i serie med $R_1 = 4$ Ω til en node, og en strømkilde $I_2 = 2$ A som injiserer strøm i samme node. En lastmotstand $R_2 = 6$ Ω går fra noden til jord (returvei for begge kildene). Finn strømmen gjennom $R_2$ med superposisjon.
1. Slå av strømkilden (bryt den): $R_1$ og $R_2$ står da i serie over $U_1$. Bidrag: $I' = U_1/(R_1+R_2) = 12/10 = 1,2$ A.
2. Slå av spenningskilden (kortslutt den): $R_1$ havner i parallell med $R_2$, sett fra strømkilden. Strømmen deler seg: $I'' = I_2R_1/(R_1+R_2) = 2\\cdot4/10 = 0,8$ A.
3. Legg sammen: $I_{R2} = I' + I'' = 1,2 + 0,8 = 2$ A.

Svar: $I_{R2} = 2$ A.

## Vanlige feil
- Å glemme å slå av *alle* andre kilder ved superposisjon (spenningskilde kortsluttes til 0 V, strømkilde brytes til 0 A, ikke omvendt).
- Å bruke superposisjon på effekt – effekt er kvadratisk, så bidragene kan ikke legges sammen direkte.
- Å forveksle $R_{th}$ med bare "den nærmeste motstanden" – den må beregnes fra hele kretsen med kildene slått av.
- Å sette $R_L = R_{th}$ for å maksimere *virkningsgraden* – da er virkningsgraden faktisk bare 50 %; maksimal effekt og best virkningsgrad er ikke det samme.

> Superposisjon: én kilde om gangen, de andre slått av, og legg sammen til slutt (bortsett fra effekt). Thévenin: bytt ut en komplisert krets med én kilde og én motstand sett fra klemmene.`,
en: `## What is it about?
Network analysis is about systematic methods for finding the current and voltage in circuits that are too complicated to simplify with series/parallel combinations alone. Instead of starting from scratch every time, engineers use standard recipes: the node-voltage method, the mesh-current method, superposition, and Thévenin/Norton equivalents.

These methods are especially useful when a circuit must be analyzed for many different loads, or when you only care about what happens in one particular branch of a large circuit.

## Concepts and formulas
- Node-voltage method: choose one node as ground, and write KCL for the remaining $n-1$ nodes with the node voltages as unknowns.
- Mesh (loop) method: write KVL for each independent loop with mesh currents as unknowns. A planar circuit with $b$ branches and $n$ nodes has $m=b-n+1$ independent loops.
- Superposition: in a linear circuit with several independent sources, the response (current or voltage) is the sum of the contributions from each source acting alone, with the other sources turned off (voltage sources shorted, current sources opened).
- Thévenin equivalent: any linear two-terminal circuit can be replaced by a single voltage source $U_{th}$ in series with a single resistor $R_{th}$, as seen from two given terminals.
- Norton equivalent: the same circuit as a current source $I_N = U_{th}/R_{th}$ in parallel with $R_{th}$.
- $R_{th}$ is found by turning off all independent sources and computing the resistance seen from the terminals, or from $R_{th} = U_{open}/I_{short}$.
- Maximum power transfer to a load occurs when $R_L = R_{th}$, giving $P_{max} = U_{th}^2/(4R_{th})$.

## How to solve the problems
1. Choose the method based on what you need: superposition or Thévenin when you only want to know what happens in one branch, the node/mesh method for the whole circuit.
2. With superposition: turn off all sources except one, compute its contribution, repeat for each source, and add the results at the end (never for power).
3. With Thévenin: find $U_{th}$ as the open-circuit voltage across the terminals, and $R_{th}$ with the sources turned off.
4. Put the unknown load back onto the simplified (Thévenin/Norton) circuit and solve with Ohm's law.
5. Check the answer: do the limiting cases ($R_L=0$ or $R_L\\to\\infty$) give sensible currents and voltages?

### Example
A circuit has a voltage source $U_1 = 12$ V in series with $R_1 = 4$ Ω feeding a node, and a current source $I_2 = 2$ A injecting current into the same node. A load resistor $R_2 = 6$ Ω runs from the node to ground (the return path for both sources). Find the current through $R_2$ using superposition.
1. Turn off the current source (open it): $R_1$ and $R_2$ are then in series across $U_1$. Contribution: $I' = U_1/(R_1+R_2) = 12/10 = 1.2$ A.
2. Turn off the voltage source (short it): $R_1$ is now in parallel with $R_2$, seen from the current source. The current splits: $I'' = I_2R_1/(R_1+R_2) = 2\\cdot4/10 = 0.8$ A.
3. Add the contributions: $I_{R2} = I' + I'' = 1.2 + 0.8 = 2$ A.

Answer: $I_{R2} = 2$ A.

## Common mistakes
- Forgetting to turn off *all* the other sources during superposition (a voltage source is shorted to 0 V, a current source is opened to 0 A, not the other way around).
- Applying superposition to power – power is quadratic, so the contributions cannot simply be added.
- Confusing $R_{th}$ with just "the nearest resistor" – it must be computed from the whole circuit with the sources turned off.
- Setting $R_L = R_{th}$ to maximize *efficiency* – the efficiency is then actually only 50%; maximum power and best efficiency are not the same thing.

> Superposition: one source at a time, the others turned off, then add the results (except for power). Thévenin: replace a complicated circuit with a single source and a single resistor seen from the terminals.`
});

BIQ("ELPE1300", 3, [
 ["Hva er en Norton-ekvivalent?",
  ["En ideell strømkilde i parallell med én motstand", "En spenningskilde i serie med en motstand", "En kortsluttet krets", "En kondensator i parallell med en spole"],
  "Thévenin-ekvivalenten er spenningskilden i serie med samme motstand: $I_N = U_{th}/R_{th}$.",
  "What is a Norton equivalent?",
  ["An ideal current source in parallel with one resistor", "A voltage source in series with a resistor", "A short-circuited network", "A capacitor in parallel with an inductor"],
  "The Thévenin equivalent is the voltage source in series with the same resistance: $I_N = U_{th}/R_{th}$."],
 ["En planar krets har $b$ grener og $n$ knutepunkter. Hvor mange uavhengige sløyfeligninger (mesh-ligninger) trenger du?",
  ["$b-n+1$", "$n-1$", "$b-n$", "$b+n-1$"],
  "Antall uavhengige sløyfer er $m=b-n+1$. Antall uavhengige knutepunktligninger er derimot $n-1$ – de to metodene bruker ulikt antall ligninger.",
  "A planar circuit has $b$ branches and $n$ nodes. How many independent loop (mesh) equations do you need?",
  ["$b-n+1$", "$n-1$", "$b-n$", "$b+n-1$"],
  "The number of independent loops is $m=b-n+1$. The number of independent node equations, on the other hand, is $n-1$ – the two methods use a different number of equations."],
 ["En krets har en spenningskilde $U_1 = 20$ V i serie med $R_1 = 5$ Ω til en node, og en strømkilde $I_2 = 3$ A som injiserer strøm i samme node. En lastmotstand $R_2 = 15$ Ω går fra noden til jord. Bruk superposisjon til å finne strømmen gjennom $R_2$.",
  { n: 1.75, tol: 0.02, u: "A" },
  "$I' = U_1/(R_1+R_2) = 20/20 = 1$ A (strømkilden brutt). $I'' = I_2R_1/(R_1+R_2) = 3\\cdot5/20 = 0,75$ A (spenningskilden kortsluttet). Total: $I_{R2} = I'+I'' = 1,75$ A.",
  "A circuit has a voltage source $U_1 = 20$ V in series with $R_1 = 5$ Ω feeding a node, and a current source $I_2 = 3$ A injecting current into the same node. A load resistor $R_2 = 15$ Ω runs from the node to ground. Use superposition to find the current through $R_2$.",
  null,
  "$I' = U_1/(R_1+R_2) = 20/20 = 1$ A (current source opened). $I'' = I_2R_1/(R_1+R_2) = 3\\cdot5/20 = 0.75$ A (voltage source shorted). Total: $I_{R2} = I'+I'' = 1.75$ A."]
]);

GEN("ELPE1300", 3,
 // enkel: Rth for to motstander i parallell, kilder slått av
 () => { const R1 = R.f(1, 50, 1), R2 = R.f(1, 50, 1), Rth = (R1 * R2) / (R1 + R2);
   return [T(`Kildene i en krets er slått av. Fra klemmene ser du $R_1 = ${nf(R1)}$ Ω og $R_2 = ${nf(R2)}$ Ω i parallell. Hva er $R_{th}$?`,
             `The sources in a circuit are turned off. From the terminals you see $R_1 = ${nf(R1)}$ Ω and $R_2 = ${nf(R2)}$ Ω in parallel. What is $R_{th}$?`),
     { n: Rth, tol: rel(Rth), u: "Ω" },
     T(`$R_{th} = \\dfrac{R_1R_2}{R_1+R_2} = \\dfrac{${mf(R1)}\\cdot${mf(R2)}}{${mf(R1)}+${mf(R2)}} \\approx ${mf(Rth, 3)}$ Ω.`,
       `$R_{th} = \\dfrac{R_1R_2}{R_1+R_2} = \\dfrac{${mf(R1)}\\cdot${mf(R2)}}{${mf(R1)}+${mf(R2)}} \\approx ${mf(Rth, 3)}$ Ω.`)]; },
 // eksamen: superposisjon med spennings- og strømkilde
 () => { const U1 = R.f(5, 48, 1), R1 = R.f(1, 20, 1), I2 = R.f(0.2, 5, 0.1), R2 = R.f(1, 30, 1);
   const Ip = U1 / (R1 + R2), Idbl = I2 * R1 / (R1 + R2), Itot = Ip + Idbl;
   return [T(`En krets har en spenningskilde $U_1 = ${nf(U1)}$ V i serie med $R_1 = ${nf(R1)}$ Ω til en node, og en strømkilde $I_2 = ${nf(I2)}$ A som injiserer strøm i samme node. En lastmotstand $R_2 = ${nf(R2)}$ Ω går fra noden til jord. Bruk superposisjon til å finne strømmen gjennom $R_2$.`,
             `A circuit has a voltage source $U_1 = ${nf(U1)}$ V in series with $R_1 = ${nf(R1)}$ Ω feeding a node, and a current source $I_2 = ${nf(I2)}$ A injecting current into the same node. A load resistor $R_2 = ${nf(R2)}$ Ω runs from the node to ground. Use superposition to find the current through $R_2$.`),
     { n: Itot, tol: rel(Itot, 0.01, 0.001), u: "A" },
     T(`$I' = U_1/(R_1+R_2) \\approx ${mf(Ip, 3)}$ A (strømkilden brutt). $I'' = I_2R_1/(R_1+R_2) \\approx ${mf(Idbl, 3)}$ A (spenningskilden kortsluttet). Total: $I_{R2} = I'+I'' \\approx ${mf(Itot, 3)}$ A.`,
       `$I' = U_1/(R_1+R_2) \\approx ${mf(Ip, 3)}$ A (current source opened). $I'' = I_2R_1/(R_1+R_2) \\approx ${mf(Idbl, 3)}$ A (voltage source shorted). Total: $I_{R2} = I'+I'' \\approx ${mf(Itot, 3)}$ A.`)]; }
);

// ================= ELFT2400 – enhet 0: Laplace og overføringsfunksjoner =================
THEORY("ELFT2400", 0, {
nb: `## Hva handler det om?
I reguleringsteknikk beskriver vi hvordan et system (en motor, en temperaturprosess, en robotarm) reagerer på et pådrag ved å transformere differensialligningen til Laplace-planet. Der blir differensiallikninger til algebra, og systemet kan beskrives med én kompakt brøk: overføringsfunksjonen $G(s)$. Polene og nullpunktene til $G(s)$ forteller nesten alt du trenger å vite om systemets oppførsel – om det er stabilt, hvor fort det reagerer, og om det svinger.

Målet med enheten er å kunne lese en overføringsfunksjon og si noe kvalitativt og kvantitativt om sprangresponsen uten å løse differensialligningen i tidsplanet hver gang.

## Begreper og formler
- Overføringsfunksjon: $G(s) = Y(s)/U(s)$, forholdet mellom Laplace-transformert utgang og inngang med null initialbetingelser.
- Poler: verdiene av $s$ som gjør nevneren (den karakteristiske ligningen) null. Nullpunkter: verdiene som gjør telleren null.
- Stabilitet: systemet er stabilt hvis og bare hvis alle polene har negativ realdel (ligger i venstre halvplan).
- Førsteordens system: $G(s) = \\dfrac{K}{\\tau s+1}$, med pol i $s=-1/\\tau$. Sluttverdi ved enhetssprang: $G(0)=K$. Etter én tidskonstant $\\tau$ er responsen på 63 % av sluttverdien.
- Andreordens standardform: $G(s) = \\dfrac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2}$, med naturlig frekvens $\\omega_n$ og dempingsforhold $\\zeta$.
- Oversving (for $0<\\zeta<1$): $M_p = e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}$. Topptid $t_p = \\pi/\\omega_d$ og innsvingningstid (2 %) $t_s \\approx 4/(\\zeta\\omega_n)$, der $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}$ er den dempede (svingende) frekvensen.
- Dødtid $T$ gir et ekstra ledd $e^{-sT}$ i overføringsfunksjonen: en ren forsinkelse før utgangen reagerer.

## Slik løser du oppgavene
1. Identifiser om systemet er første- eller andreordens, og les av $K$, $\\tau$ (eller $\\omega_n$, $\\zeta$) direkte fra formen på $G(s)$.
2. Finn polene ved å sette nevneren lik null, og sjekk fortegnet på realdelen for stabilitet.
3. Finn sluttverdien ved et enhetssprang med $G(0)$ (sett $s=0$).
4. Bruk standardformlene for oversving, topptid og innsvingningstid for andreordens systemer i stedet for å løse differensialligningen.
5. Sjekk svaret opp mot fysikken: et system uten integrator og med positiv $K$ skal gå mot en endelig, positiv sluttverdi.

### Eksempel
Et system har overføringsfunksjonen $G(s) = \\dfrac{36}{s^2+3,6s+36}$. Finn dempingsforhold, sluttverdi ved enhetssprang og oversving.
1. Sammenlign med standardformen: $\\omega_n^2=36$, så $\\omega_n=6$ rad/s.
2. $2\\zeta\\omega_n=3,6$ gir $\\zeta = 3,6/(2\\cdot6) = 0,3$.
3. Sluttverdi: $G(0)=36/36=1$.
4. Oversving: $M_p=e^{-\\pi\\cdot0,3/\\sqrt{1-0,3^2}}\\approx e^{-0,988}\\approx0,372$, altså ca. 37 %.

Svar: $\\zeta=0,3$, sluttverdi $=1$, oversving $\\approx37$ %.

## Vanlige feil
- Å tro at nullpunkter bestemmer stabiliteten – det er polene som avgjør stabilitet, ikke nullpunktene.
- Å glemme å sette $s=0$ riktig når man finner sluttverdien (gjelder bare for stabile systemer uten integrator).
- Å blande sammen $\\omega_n$ og den dempede frekvensen $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}$ – de er ikke det samme når $\\zeta>0$.
- Å tro at dødtid $e^{-sT}$ er det samme som en pol – den endrer fasen, ikke antall poler i en rasjonal tilnærming.

> Polene bestemmer stabilitet og dynamikk, nullpunktene bestemmer bare formen på responsen. Venstre halvplan er trygt, høyre halvplan er ustabilt.`,
en: `## What is it about?
In control engineering we describe how a system (a motor, a temperature process, a robot arm) responds to an input by transforming the differential equation into the Laplace domain. There, differential equations become algebra, and the system can be described by one compact fraction: the transfer function $G(s)$. The poles and zeros of $G(s)$ tell you almost everything you need to know about the system's behavior – whether it is stable, how fast it responds, and whether it oscillates.

The goal of this unit is to be able to read a transfer function and say something qualitative and quantitative about the step response without solving the differential equation in the time domain every time.

## Concepts and formulas
- Transfer function: $G(s) = Y(s)/U(s)$, the ratio of the Laplace-transformed output to the input with zero initial conditions.
- Poles: the values of $s$ that make the denominator (the characteristic equation) zero. Zeros: the values that make the numerator zero.
- Stability: the system is stable if and only if all poles have negative real part (lie in the left half-plane).
- First-order system: $G(s) = \\dfrac{K}{\\tau s+1}$, with a pole at $s=-1/\\tau$. Final value for a unit step: $G(0)=K$. After one time constant $\\tau$, the response is at 63% of the final value.
- Second-order standard form: $G(s) = \\dfrac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2}$, with natural frequency $\\omega_n$ and damping ratio $\\zeta$.
- Overshoot (for $0<\\zeta<1$): $M_p = e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}$. Peak time $t_p = \\pi/\\omega_d$ and settling time (2%) $t_s \\approx 4/(\\zeta\\omega_n)$, where $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}$ is the damped (oscillation) frequency.
- Dead time $T$ adds an extra factor $e^{-sT}$ to the transfer function: a pure delay before the output reacts.

## How to solve the problems
1. Identify whether the system is first- or second-order, and read off $K$, $\\tau$ (or $\\omega_n$, $\\zeta$) directly from the form of $G(s)$.
2. Find the poles by setting the denominator to zero, and check the sign of the real part for stability.
3. Find the final value for a unit step using $G(0)$ (set $s=0$).
4. Use the standard formulas for overshoot, peak time and settling time for second-order systems instead of solving the differential equation.
5. Check the answer against the physics: a system without an integrator and with positive $K$ should go to a finite, positive final value.

### Example
A system has the transfer function $G(s) = \\dfrac{36}{s^2+3.6s+36}$. Find the damping ratio, the final value for a unit step, and the overshoot.
1. Compare with the standard form: $\\omega_n^2=36$, so $\\omega_n=6$ rad/s.
2. $2\\zeta\\omega_n=3.6$ gives $\\zeta = 3.6/(2\\cdot6) = 0.3$.
3. Final value: $G(0)=36/36=1$.
4. Overshoot: $M_p=e^{-\\pi\\cdot0.3/\\sqrt{1-0.3^2}}\\approx e^{-0.988}\\approx0.372$, i.e. about 37%.

Answer: $\\zeta=0.3$, final value $=1$, overshoot $\\approx37$%.

## Common mistakes
- Thinking that zeros determine stability – it is the poles that determine stability, not the zeros.
- Forgetting to set $s=0$ correctly when finding the final value (only valid for stable systems without an integrator).
- Confusing $\\omega_n$ with the damped frequency $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}$ – they are not the same when $\\zeta>0$.
- Thinking dead time $e^{-sT}$ is the same as a pole – it changes the phase, not the number of poles in a rational approximation.

> The poles determine stability and dynamics, the zeros only shape the response. The left half-plane is safe, the right half-plane is unstable.`
});

BIQ("ELFT2400", 0, [
 ["Hva er den karakteristiske ligningen til et system med overføringsfunksjon $G(s) = N(s)/D(s)$?",
  ["$D(s) = 0$", "$N(s) = 0$", "$G(s) = 1$", "$s = 0$"],
  "Den karakteristiske ligningen er nevneren satt lik null; røttene er systemets poler.",
  "What is the characteristic equation of a system with transfer function $G(s) = N(s)/D(s)$?",
  ["$D(s) = 0$", "$N(s) = 0$", "$G(s) = 1$", "$s = 0$"],
  "The characteristic equation is the denominator set equal to zero; its roots are the system's poles."],
 ["Hva kjennetegner et kritisk dempet andreordens system ($\\zeta = 1$)?",
  ["Det når sluttverdien raskest mulig uten oversving", "Det svinger med konstant amplitude for alltid", "Det har uendelig stort oversving", "Det er alltid ustabilt"],
  "Ved $\\zeta=1$ har systemet to like, reelle poler. For $\\zeta<1$ får du oversving, for $\\zeta>1$ (\"overdempet\") går det tregere mot sluttverdien uten oversving.",
  "What characterizes a critically damped second-order system ($\\zeta = 1$)?",
  ["It reaches the final value as fast as possible without overshoot", "It oscillates with constant amplitude forever", "It has infinite overshoot", "It is always unstable"],
  "At $\\zeta=1$ the system has two equal, real poles. For $\\zeta<1$ you get overshoot, for $\\zeta>1$ (\"overdamped\") it approaches the final value more slowly without overshoot."],
 ["Et system har overføringsfunksjonen $G(s) = \\dfrac{25}{s^2+3s+25}$. Hva er topptiden $t_p = \\pi/(\\omega_n\\sqrt{1-\\zeta^2})$?",
  { n: 0.6587, tol: 0.02, u: "s" },
  "$\\omega_n=\\sqrt{25}=5$ rad/s. $2\\zeta\\omega_n=3$ gir $\\zeta=0,3$. $t_p=\\pi/(\\omega_n\\sqrt{1-\\zeta^2})=\\pi/(5\\sqrt{1-0,09})\\approx\\pi/4,770\\approx0,659$ s.",
  "A system has the transfer function $G(s) = \\dfrac{25}{s^2+3s+25}$. What is the peak time $t_p = \\pi/(\\omega_n\\sqrt{1-\\zeta^2})$?",
  null,
  "$\\omega_n=\\sqrt{25}=5$ rad/s. $2\\zeta\\omega_n=3$ gives $\\zeta=0.3$. $t_p=\\pi/(\\omega_n\\sqrt{1-\\zeta^2})=\\pi/(5\\sqrt{1-0.09})\\approx\\pi/4.770\\approx0.659$ s."]
]);

GEN("ELFT2400", 0,
 // enkel: tidskonstant fra pol
 () => { const p = R.f(0.2, 10, 0.1), tau = 1 / p;
   return [T(`Et førsteordens system har en pol i $s=-${nf(p)}$. Hva er tidskonstanten $\\tau$?`,
             `A first-order system has a pole at $s=-${nf(p)}$. What is the time constant $\\tau$?`),
     { n: tau, tol: rel(tau), u: "s" },
     T(`Polen er i $s=-1/\\tau$, så $\\tau = 1/${mf(p)} \\approx ${mf(tau, 3)}$ s.`,
       `The pole is at $s=-1/\\tau$, so $\\tau = 1/${mf(p)} \\approx ${mf(tau, 3)}$ s.`)]; },
 // eksamen: dempet frekvens fra andreordens koeffisienter
 () => { const wn = R.f(2, 10, 0.5), zeta = R.f(0.1, 0.9, 0.05), a = 2 * zeta * wn, b = wn * wn, wd = wn * Math.sqrt(1 - zeta * zeta);
   return [T(`Et system har overføringsfunksjonen $G(s) = \\dfrac{${mf(b, 3)}}{s^2+${mf(a, 3)}s+${mf(b, 3)}}$. Hva er den dempede (svingende) frekvensen $\\omega_d$?`,
             `A system has the transfer function $G(s) = \\dfrac{${mf(b, 3)}}{s^2+${mf(a, 3)}s+${mf(b, 3)}}$. What is the damped (oscillation) frequency $\\omega_d$?`),
     { n: wd, tol: rel(wd, 0.01, 0.01), u: "rad/s" },
     T(`$\\omega_n=\\sqrt{${mf(b, 3)}}\\approx${mf(wn, 3)}$ rad/s. $2\\zeta\\omega_n=${mf(a, 3)}$ gir $\\zeta\\approx${mf(zeta, 3)}$. $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}\\approx${mf(wd, 3)}$ rad/s.`,
       `$\\omega_n=\\sqrt{${mf(b, 3)}}\\approx${mf(wn, 3)}$ rad/s. $2\\zeta\\omega_n=${mf(a, 3)}$ gives $\\zeta\\approx${mf(zeta, 3)}$. $\\omega_d=\\omega_n\\sqrt{1-\\zeta^2}\\approx${mf(wd, 3)}$ rad/s.`)]; }
);

// ================= ELFT2400 – enhet 1: PID-regulering =================
THEORY("ELFT2400", 1, {
nb: `## Hva handler det om?
En PID-regulator er den mest brukte reguleringsalgoritmen i industrien: den sammenligner en målt verdi med en referanse, og beregner et pådrag ut fra avviket. De tre leddene – proporsjonal (P), integral (I) og derivat (D) – har hver sin jobb, og god regulering handler om å balansere dem mot hverandre: rask respons, lite oversving, null stasjonært avvik og robusthet mot støy.

Enheten handler om å forstå hva hvert ledd gjør, hvordan de kombineres i en tilbakekoblet sløyfe, og hvordan man kan finne fornuftige startverdier for forsterkningene.

## Begreper og formler
- Ideell PID-regulator: $C(s) = K_p + \\dfrac{K_i}{s} + K_ds$, der $K_i=K_p/T_i$ og $K_d=K_pT_d$ ($T_i$ = integrasjonstid, $T_d$ = derivasjonstid).
- P-leddet gir rask respons, men lar et stasjonært avvik stå igjen for de fleste prosesser.
- I-leddet integrerer avviket over tid og fjerner stasjonært avvik, men kan gjøre systemet tregere og mer svingete.
- D-leddet reagerer på endringstakten til avviket og demper oversving, men forsterker målestøy og filtreres derfor ofte.
- Lukket sløyfe med forover-forsterkning $G$ og tilbakekobling $H$: $\\dfrac{Y}{R} = \\dfrac{G}{1+GH}$ (negativ tilbakekobling).
- Stasjonært avvik ved sprang: $e_\\infty = \\dfrac{1}{1+K_pG(0)}$ for ren P-regulering; med et I-ledd blir $e_\\infty=0$ for et sprang.
- Stasjonært avvik ved rampe (type 1-system, PI-regulering av $G(s)=K/(\\tau s+1)$): hastighetskonstanten $K_v = K_pK/T_i$, og $e_\\infty = 1/K_v$.
- Ziegler–Nichols (svingemetoden): finn kritisk forsterkning $K_u$ og periode $T_u$ (ren P-regulering helt til vedvarende svingning). PID-tabellen: $K_p=0,6K_u$, $T_i=T_u/2$, $T_d=T_u/8$.
- Integratoroppvikling (windup): I-leddet fortsetter å vokse mens pådraget er i metning, og gir store oversving når avviket snur.

## Slik løser du oppgavene
1. Identifiser hvilket ledd (P, I eller D) spørsmålet handler om, og hva slags feil eller virkning det gir.
2. For stasjonært avvik: sjekk om sløyfen har et I-ledd (type 1) – da er avviket null for et sprang, men kan være endelig for en rampe.
3. For lukket-sløyfe-uttrykk: sett opp $G/(1+GH)$ og forenkle før du finner poler eller sluttverdi.
4. For Ziegler–Nichols: sett $K_u$ og $T_u$ rett inn i tabellformlene – ikke bland sammen $K_p$, $T_i$ og $T_d$.
5. Sjekk om svaret gir mening: økt $K_p$ skal gi raskere, men mer urolig respons; et I-ledd skal fjerne stasjonært avvik ved sprang.

### Eksempel
En prosess $G(s) = \\dfrac{2}{s+1}$ reguleres med en PI-regulator med $K_p=3$ og $T_i=0,5$ s. Referansen er en rampe med helning 1 (enhet/s). Finn det stasjonære avviket.
1. Hastighetskonstanten: $K_v = K_pK/T_i = 3\\cdot2/0,5 = 12$.
2. Stasjonært avvik: $e_\\infty = 1/K_v = 1/12 \\approx 0,0833$.

Svar: $e_\\infty \\approx 0,083$ (enheter).

## Vanlige feil
- Å tro at et I-ledd fjerner stasjonært avvik for *alle* typer referanser – det fjerner avviket for et sprang, men ikke nødvendigvis for en rampe.
- Å øke $K_p$ mye for å bli kvitt stasjonært avvik i stedet for å legge til et I-ledd – det gir mer oversving og kan gjøre systemet ustabilt.
- Å forveksle $T_i$ (integrasjonstid, stor $T_i$ = svak I-virkning) med $K_i$ (der stor $K_i$ = sterk I-virkning) – de er hverandres inverse skalert med $K_p$.
- Å glemme anti-windup i en regulator med pådragsmetning, slik at I-leddet "låser seg" og gir store oversving.

> P gir fart, I fjerner stasjonært avvik (men kan gi oversving og windup), D demper svingninger (men forsterker støy). En god regulator balanserer alle tre.`,
en: `## What is it about?
A PID controller is the most widely used control algorithm in industry: it compares a measured value with a reference and computes an actuator signal from the error. The three terms – proportional (P), integral (I) and derivative (D) – each have their own job, and good control is about balancing them against each other: fast response, little overshoot, zero steady-state error and robustness to noise.

This unit is about understanding what each term does, how they combine in a feedback loop, and how to find reasonable starting values for the gains.

## Concepts and formulas
- Ideal PID controller: $C(s) = K_p + \\dfrac{K_i}{s} + K_ds$, where $K_i=K_p/T_i$ and $K_d=K_pT_d$ ($T_i$ = integral time, $T_d$ = derivative time).
- The P term gives a fast response, but leaves a steady-state error for most processes.
- The I term integrates the error over time and removes steady-state error, but can make the system slower and more oscillatory.
- The D term reacts to how fast the error is changing and damps overshoot, but amplifies measurement noise and is therefore often filtered.
- Closed loop with forward gain $G$ and feedback $H$: $\\dfrac{Y}{R} = \\dfrac{G}{1+GH}$ (negative feedback).
- Steady-state error for a step: $e_\\infty = \\dfrac{1}{1+K_pG(0)}$ for pure P control; with an I term, $e_\\infty=0$ for a step.
- Steady-state error for a ramp (type-1 system, PI control of $G(s)=K/(\\tau s+1)$): the velocity constant $K_v = K_pK/T_i$, and $e_\\infty = 1/K_v$.
- Ziegler–Nichols (ultimate gain method): find the ultimate gain $K_u$ and period $T_u$ (pure P control until sustained oscillation). PID table: $K_p=0.6K_u$, $T_i=T_u/2$, $T_d=T_u/8$.
- Integrator windup: the I term keeps growing while the actuator is saturated, causing large overshoot once the error reverses.

## How to solve the problems
1. Identify which term (P, I or D) the question is about, and what kind of error or effect it produces.
2. For steady-state error: check whether the loop has an I term (type 1) – the error is then zero for a step, but can be finite for a ramp.
3. For closed-loop expressions: set up $G/(1+GH)$ and simplify before finding poles or the final value.
4. For Ziegler–Nichols: plug $K_u$ and $T_u$ directly into the table formulas – do not mix up $K_p$, $T_i$ and $T_d$.
5. Check whether the answer makes sense: increasing $K_p$ should give a faster but more unsettled response; an I term should remove the steady-state error for a step.

### Example
A process $G(s) = \\dfrac{2}{s+1}$ is controlled by a PI controller with $K_p=3$ and $T_i=0.5$ s. The reference is a ramp with slope 1 (unit/s). Find the steady-state error.
1. Velocity constant: $K_v = K_pK/T_i = 3\\cdot2/0.5 = 12$.
2. Steady-state error: $e_\\infty = 1/K_v = 1/12 \\approx 0.0833$.

Answer: $e_\\infty \\approx 0.083$ (units).

## Common mistakes
- Thinking an I term removes steady-state error for *all* types of references – it removes the error for a step, but not necessarily for a ramp.
- Increasing $K_p$ a lot to get rid of steady-state error instead of adding an I term – that causes more overshoot and can make the system unstable.
- Confusing $T_i$ (integral time, a large $T_i$ means weak I action) with $K_i$ (where a large $K_i$ means strong I action) – they are each other's inverse, scaled by $K_p$.
- Forgetting anti-windup in a controller with actuator saturation, so the I term "locks up" and causes large overshoot.

> P gives speed, I removes steady-state error (but can cause overshoot and windup), D damps oscillations (but amplifies noise). A good controller balances all three.`
});

BIQ("ELFT2400", 1, [
 ["Hva er overføringsfunksjonen til en ideell PID-regulator?",
  ["$K_p + K_i/s + K_ds$", "$K_p\\cdot K_i\\cdot K_d$", "$K_p/s$", "$K_p + K_is + K_d/s$"],
  "$K_i=K_p/T_i$ og $K_d=K_pT_d$. I-leddet dominerer ved lave frekvenser, D-leddet ved høye.",
  "What is the transfer function of an ideal PID controller?",
  ["$K_p + K_i/s + K_ds$", "$K_p\\cdot K_i\\cdot K_d$", "$K_p/s$", "$K_p + K_is + K_d/s$"],
  "$K_i=K_p/T_i$ and $K_d=K_pT_d$. The I term dominates at low frequencies, the D term at high frequencies."],
 ["Hva er hovedgrunnen til at D-leddet i en praktisk PID-regulator ofte lavpassfiltreres?",
  ["For å unngå å forsterke måtestøy", "For å redusere stasjonært avvik", "For å øke forsterkningen ved lave frekvenser", "For å fjerne behovet for I-leddet"],
  "Rent derivat forsterker høyfrekvent støy ubegrenset; et lavpassfilter demper denne effekten uten å ødelegge den dempende virkningen ved lavere frekvenser.",
  "What is the main reason the D term in a practical PID controller is often low-pass filtered?",
  ["To avoid amplifying measurement noise", "To reduce steady-state error", "To increase the gain at low frequencies", "To remove the need for the I term"],
  "A pure derivative amplifies high-frequency noise without bound; a low-pass filter reduces this effect without destroying the damping action at lower frequencies."],
 ["En prosess $G(s) = \\dfrac{4}{s+2}$ reguleres med en PI-regulator med $K_p = 5$ og $T_i = 0,8$ s. Referansen er en rampe med helning 1 (enhet/s). Hva er det stasjonære avviket?",
  { n: 0.08, tol: 0.002, u: "" },
  "$G(s)=4/(s+2)=2/(0,5s+1)$, så prosessforsterkningen er $K=2$. Hastighetskonstanten: $K_v=K_pK/T_i=5\\cdot2/0,8=12,5$. Stasjonært avvik: $e_\\infty=1/K_v=1/12,5=0,08$.",
  "A process $G(s) = \\dfrac{4}{s+2}$ is controlled by a PI controller with $K_p = 5$ and $T_i = 0.8$ s. The reference is a ramp with slope 1 (unit/s). What is the steady-state error?",
  null,
  "$G(s)=4/(s+2)=2/(0.5s+1)$, so the process gain is $K=2$. Velocity constant: $K_v=K_pK/T_i=5\\cdot2/0.8=12.5$. Steady-state error: $e_\\infty=1/K_v=1/12.5=0.08$."]
]);

GEN("ELFT2400", 1,
 // enkel: Ki fra Kp og Ti
 () => { const Kp = R.f(0.5, 20, 0.5), Ti = R.f(0.1, 10, 0.1), Ki = Kp / Ti;
   return [T(`En PI-regulator har $K_p = ${nf(Kp)}$ og integrasjonstid $T_i = ${nf(Ti)}$ s. Hva er $K_i$?`,
             `A PI controller has $K_p = ${nf(Kp)}$ and integral time $T_i = ${nf(Ti)}$ s. What is $K_i$?`),
     { n: Ki, tol: rel(Ki), u: "1/s" },
     T(`$K_i = K_p/T_i = ${mf(Kp)}/${mf(Ti)} \\approx ${mf(Ki, 3)}$.`,
       `$K_i = K_p/T_i = ${mf(Kp)}/${mf(Ti)} \\approx ${mf(Ki, 3)}$.`)]; },
 // eksamen: stasjonært avvik ved rampe med PI-regulering
 () => { const b = R.f(1, 20, 0.5), a = R.f(0.5, 10, 0.5), Kp = R.f(1, 10, 0.5), Ti = R.f(0.1, 5, 0.1);
   const K = b / a, Kv = Kp * K / Ti, ess = 1 / Kv;
   return [T(`En prosess $G(s) = \\dfrac{${nf(b)}}{s+${nf(a)}}$ reguleres med en PI-regulator med $K_p = ${nf(Kp)}$ og $T_i = ${nf(Ti)}$ s. Referansen er en rampe med helning 1 (enhet/s). Hva er det stasjonære avviket?`,
             `A process $G(s) = \\dfrac{${nf(b)}}{s+${nf(a)}}$ is controlled by a PI controller with $K_p = ${nf(Kp)}$ and $T_i = ${nf(Ti)}$ s. The reference is a ramp with slope 1 (unit/s). What is the steady-state error?`),
     { n: ess, tol: rel(ess, 0.01, 0.0005), u: "" },
     T(`Prosessforsterkningen er $K=${mf(b)}/${mf(a)}\\approx${mf(K, 3)}$ (skriv $G(s)$ om til $K/(\\tau s+1)$-form). Hastighetskonstanten: $K_v=K_pK/T_i\\approx${mf(Kv, 3)}$. Stasjonært avvik: $e_\\infty=1/K_v\\approx${mf(ess, 4)}$.`,
       `The process gain is $K=${mf(b)}/${mf(a)}\\approx${mf(K, 3)}$ (rewrite $G(s)$ in $K/(\\tau s+1)$ form). Velocity constant: $K_v=K_pK/T_i\\approx${mf(Kv, 3)}$. Steady-state error: $e_\\infty=1/K_v\\approx${mf(ess, 4)}$.`)]; }
);

// ================= ELFT2400 – enhet 2: Frekvensanalyse =================
THEORY("ELFT2400", 2, {
nb: `## Hva handler det om?
Bodediagrammet viser hvordan et system svarer på sinusformede innsignaler ved forskjellige frekvenser: hvor mye amplituden forsterkes eller dempes (i desibel), og hvor mye fasen forskyves. Denne frekvensresponsen brukes til å vurdere hvor stabilt et lukket reguleringssystem blir – uten å måtte finne polene eksplisitt – og til å forstå hvor mye du kan skru opp forsterkningen før systemet begynner å svinge ukontrollert.

Fase- og forsterkningsmargin er de viktigste "sikkerhetsmarginene" en regulatoringeniør leser av et Bodediagram før en regulator settes i drift.

## Begreper og formler
- Forsterkning i desibel: $|G|_{dB} = 20\\log_{10}|G|$. Omvendt: $|G| = 10^{|G|_{dB}/20}$.
- En enkelt pol ($1/(\\tau s+1)$) gir asymptotisk $-20$ dB/dekade over knekkfrekvensen $\\omega_c = 1/\\tau$; et enkelt nullpunkt gir $+20$ dB/dekade.
- Fasebidrag fra en enkelt pol går gradvis fra $0^\\circ$ til $-90^\\circ$ rundt knekkfrekvensen; fra et nullpunkt fra $0^\\circ$ til $+90^\\circ$.
- En ren dødtid $e^{-sT}$ endrer ikke amplituden, men gir en faseforsinkelse $\\varphi = -\\omega T$ (radianer) som vokser lineært med frekvensen.
- Gjennomskjæringsfrekvens $\\omega_c$: der $|L(j\\omega)| = 1$ (0 dB), med $L$ = sløyfeforsterkningen $= GH$.
- Fasemargin: $PM = 180^\\circ + \\angle L(j\\omega_c)$ ved gjennomskjæringsfrekvensen. Vanlig mål: 45–60°.
- Forsterkningsmargin: hvor mange dB $|L|$ kan økes med før systemet blir ustabilt, avlest der fasen er $-180^\\circ$.
- Båndbredde: frekvensen der amplituden i det lukkede systemet har falt 3 dB fra lavfrekvensverdien.

## Slik løser du oppgavene
1. Finn knekkfrekvensene til hver pol/nullpunkt ($\\omega=1/\\tau$) og resonnér deg fram til asymptotene.
2. Legg sammen amplitude- og fasebidrag fra hvert ledd (poler, nullpunkter, eventuell dødtid) for å få total amplitude og fase.
3. Finn gjennomskjæringsfrekvensen $\\omega_c$ der $|L|=1$, og les av fasen der for å regne ut fasemarginen.
4. For dødtid: regn fasebidraget som $-\\omega T$ i radianer, og gjør om til grader ved å multiplisere med $180/\\pi$.
5. Sjekk at svaret er rimelig: en stabil sløyfe bør ha positiv fase- og forsterkningsmargin.

### Eksempel
En sløyfe har $L(s) = \\dfrac{4}{s}e^{-sT}$ med dødtid $T = 0,05$ s. Finn fasemarginen.
1. Gjennomskjæringsfrekvens: $|L(j\\omega)| = 4/\\omega = 1$ gir $\\omega_c = 4$ rad/s.
2. Fase fra integratoren: $-90^\\circ$.
3. Fase fra dødtiden: $\\varphi_T = -\\omega_cT\\cdot(180/\\pi) = -4\\cdot0,05\\cdot(180/\\pi) \\approx -11,46^\\circ$.
4. Total fase: $-90^\\circ - 11,46^\\circ = -101,46^\\circ$.
5. Fasemargin: $PM = 180^\\circ - 101,46^\\circ \\approx 78,5^\\circ$.

Svar: $PM \\approx 78,5^\\circ$ (god margin).

## Vanlige feil
- Å tro at dødtid endrer amplituden – den endrer bare fasen, aldri $|G|$.
- Å lese av forsterkningsmarginen ved gjennomskjæringsfrekvensen i stedet for der fasen er $-180^\\circ$ (og omvendt for fasemarginen).
- Å glemme å regne om fasebidraget fra dødtid fra radianer til grader.
- Å tro at høyere båndbredde alltid er bedre – det gir raskere respons, men også mer følsomhet for støy.

> Bodediagrammet: amplitude i dB, fase i grader, begge mot logaritmisk frekvens. Fasemargin leses ved 0 dB, forsterkningsmargin ved $-180^\\circ$.`,
en: `## What is it about?
The Bode plot shows how a system responds to sinusoidal input signals at different frequencies: how much the amplitude is boosted or attenuated (in decibels), and how much the phase is shifted. This frequency response is used to judge how stable a closed-loop control system will be – without having to find the poles explicitly – and to understand how far you can raise the gain before the system starts to oscillate uncontrollably.

Phase margin and gain margin are the most important "safety margins" a control engineer reads off a Bode plot before putting a controller into service.

## Concepts and formulas
- Gain in decibels: $|G|_{dB} = 20\\log_{10}|G|$. Inverse: $|G| = 10^{|G|_{dB}/20}$.
- A single pole ($1/(\\tau s+1)$) gives an asymptotic $-20$ dB/decade above the corner frequency $\\omega_c = 1/\\tau$; a single zero gives $+20$ dB/decade.
- The phase contribution from a single pole goes gradually from $0^\\circ$ to $-90^\\circ$ around the corner frequency; from a zero, from $0^\\circ$ to $+90^\\circ$.
- A pure dead time $e^{-sT}$ does not change the magnitude, but gives a phase lag $\\varphi = -\\omega T$ (radians) that grows linearly with frequency.
- Crossover frequency $\\omega_c$: where $|L(j\\omega)| = 1$ (0 dB), with $L$ the loop gain $= GH$.
- Phase margin: $PM = 180^\\circ + \\angle L(j\\omega_c)$ at the crossover frequency. A common target is 45–60°.
- Gain margin: how many dB $|L|$ can be increased before the system becomes unstable, read where the phase is $-180^\\circ$.
- Bandwidth: the frequency where the closed-loop magnitude has dropped 3 dB from its low-frequency value.

## How to solve the problems
1. Find the corner frequency of each pole/zero ($\\omega=1/\\tau$) and reason your way to the asymptotes.
2. Add the magnitude and phase contributions from each term (poles, zeros, any dead time) to get the total magnitude and phase.
3. Find the crossover frequency $\\omega_c$ where $|L|=1$, and read the phase there to compute the phase margin.
4. For dead time: compute the phase contribution as $-\\omega T$ in radians, and convert to degrees by multiplying by $180/\\pi$.
5. Check that the answer is reasonable: a stable loop should have a positive phase margin and a positive gain margin.

### Example
A loop has $L(s) = \\dfrac{4}{s}e^{-sT}$ with dead time $T = 0.05$ s. Find the phase margin.
1. Crossover frequency: $|L(j\\omega)| = 4/\\omega = 1$ gives $\\omega_c = 4$ rad/s.
2. Phase from the integrator: $-90^\\circ$.
3. Phase from the dead time: $\\varphi_T = -\\omega_cT\\cdot(180/\\pi) = -4\\cdot0.05\\cdot(180/\\pi) \\approx -11.46^\\circ$.
4. Total phase: $-90^\\circ - 11.46^\\circ = -101.46^\\circ$.
5. Phase margin: $PM = 180^\\circ - 101.46^\\circ \\approx 78.5^\\circ$.

Answer: $PM \\approx 78.5^\\circ$ (a good margin).

## Common mistakes
- Thinking dead time changes the magnitude – it only changes the phase, never $|G|$.
- Reading the gain margin at the crossover frequency instead of where the phase is $-180^\\circ$ (and vice versa for the phase margin).
- Forgetting to convert the dead-time phase contribution from radians to degrees.
- Thinking a higher bandwidth is always better – it gives a faster response, but also more sensitivity to noise.

> Bode plot: magnitude in dB, phase in degrees, both versus logarithmic frequency. Read the phase margin at 0 dB, the gain margin at $-180^\\circ$.`
});

BIQ("ELFT2400", 2, [
 ["Hva er knekkfrekvensen til en enkel pol $1/(\\tau s+1)$?",
  ["$\\omega = 1/\\tau$", "$\\omega = \\tau$", "$\\omega = 2\\pi\\tau$", "$\\omega = \\tau^2$"],
  "Ved $\\omega=1/\\tau$ har amplituden falt 3 dB fra lavfrekvensverdien, og de to asymptotene ($0$ dB og $-20$ dB/dekade) møtes.",
  "What is the corner frequency of a single pole $1/(\\tau s+1)$?",
  ["$\\omega = 1/\\tau$", "$\\omega = \\tau$", "$\\omega = 2\\pi\\tau$", "$\\omega = \\tau^2$"],
  "At $\\omega=1/\\tau$ the magnitude has dropped 3 dB from its low-frequency value, and the two asymptotes ($0$ dB and $-20$ dB/decade) meet."],
 ["Hva er effekten av en tidsforsinkelse (dødtid) $e^{-sT}$ på frekvensresponsen til et system?",
  ["Den endrer ikke amplituden, men gir økende faseforsinkelse med frekvensen", "Den reduserer amplituden mer og mer ved høye frekvenser", "Den øker amplituden proporsjonalt med frekvensen", "Den har ingen effekt på verken amplitude eller fase"],
  "$|e^{-j\\omega T}| = 1$ for alle $\\omega$, men fasen $\\varphi=-\\omega T$ blir mer og mer negativ jo høyere frekvensen er.",
  "What is the effect of a time delay (dead time) $e^{-sT}$ on a system's frequency response?",
  ["It does not change the magnitude, but gives an increasing phase lag with frequency", "It reduces the magnitude more and more at high frequencies", "It increases the magnitude proportionally with frequency", "It has no effect on either the magnitude or the phase"],
  "$|e^{-j\\omega T}| = 1$ for all $\\omega$, but the phase $\\varphi=-\\omega T$ becomes more and more negative as the frequency increases."],
 ["Et system har en dødtid på $T = 0,1$ s. Hva er fasebidraget fra dødtiden ved $\\omega = 20$ rad/s, i grader?",
  { n: -114.5916, tol: 0.5, u: "°" },
  "$\\varphi = -\\omega T = -20\\cdot0,1 = -2$ rad $= -2\\cdot180/\\pi \\approx -114,6^\\circ$.",
  "A system has a dead time of $T = 0.1$ s. What is the phase contribution from the dead time at $\\omega = 20$ rad/s, in degrees?",
  null,
  "$\\varphi = -\\omega T = -20\\cdot0.1 = -2$ rad $= -2\\cdot180/\\pi \\approx -114.6^\\circ$."]
]);

GEN("ELFT2400", 2,
 // enkel: knekkfrekvens fra tidskonstant
 () => { const tau = R.f(0.005, 2, 0.005), wc = 1 / tau;
   return [T(`Hva er knekkfrekvensen til $G(s) = \\dfrac{1}{\\tau s+1}$ med $\\tau = ${nf(tau)}$ s?`,
             `What is the corner frequency of $G(s) = \\dfrac{1}{\\tau s+1}$ with $\\tau = ${nf(tau)}$ s?`),
     { n: wc, tol: rel(wc), u: "rad/s" },
     T(`$\\omega_c = 1/\\tau = 1/${mf(tau)} \\approx ${mf(wc, 3)}$ rad/s.`,
       `$\\omega_c = 1/\\tau = 1/${mf(tau)} \\approx ${mf(wc, 3)}$ rad/s.`)]; },
 // eksamen: fasemargin for integrator + dødtid
 () => { const K = R.f(1, 5, 0.5), Td = R.f(0.01, 0.15, 0.01), wc = K, phaseDelayDeg = wc * Td * (180 / Math.PI), PM = 90 - phaseDelayDeg;
   return [T(`En sløyfe er $L(s) = \\dfrac{${nf(K)}}{s}e^{-sT}$ med dødtid $T = ${nf(Td)}$ s. Gjennomskjæringsfrekvensen er $\\omega_c = ${nf(wc)}$ rad/s (der $|L|=1$). Hva er fasemarginen?`,
             `A loop is $L(s) = \\dfrac{${nf(K)}}{s}e^{-sT}$ with dead time $T = ${nf(Td)}$ s. The crossover frequency is $\\omega_c = ${nf(wc)}$ rad/s (where $|L|=1$). What is the phase margin?`),
     { n: PM, tol: 0.5, u: "°" },
     T(`Fase fra integratoren: $-90^\\circ$. Fase fra dødtiden: $-\\omega_cT\\cdot(180/\\pi) \\approx -${mf(phaseDelayDeg, 2)}^\\circ$. Total fase $\\approx -${mf(90 + phaseDelayDeg, 2)}^\\circ$, så fasemarginen er $PM = 180^\\circ - ${mf(90 + phaseDelayDeg, 2)}^\\circ \\approx ${mf(PM, 2)}^\\circ$.`,
       `Phase from the integrator: $-90^\\circ$. Phase from the dead time: $-\\omega_cT\\cdot(180/\\pi) \\approx -${mf(phaseDelayDeg, 2)}^\\circ$. Total phase $\\approx -${mf(90 + phaseDelayDeg, 2)}^\\circ$, so the phase margin is $PM = 180^\\circ - ${mf(90 + phaseDelayDeg, 2)}^\\circ \\approx ${mf(PM, 2)}^\\circ$.`)]; }
);

// __SLUTT__
})();
