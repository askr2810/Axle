// ============================================================
//  add_energy.js – teori, faste oppgaver og generatorer for
//  MEK1400 (Fysikk), MATS2100 (Termodynamikk), FLUID (Fluidmekanikk)
//  og VARME (Varmeoverføring). Alt ligger i en IIFE for å unngå
//  navnekollisjoner med andre add_-filer i bunten.
// ============================================================
(() => {
const S = String.raw;

// ================= MEK1400 Fysikk =================
THEORY("MEK1400", 0, {
nb: S`## Hva handler det om?
Alt som svinger fram og tilbake rundt en likevektsstilling – en masse i en fjær, en pendel, en bro i vind eller en maskin som vibrerer – kan i første omgang beskrives som en **harmonisk oscillator**. En bølge er en svingning som brer seg i rommet: lyd, vannbølger og bølger på en streng.

For en ingeniør er dette viktig fordi alle konstruksjoner har egenfrekvenser. Hvis de påvirkes med en frekvens nær en egenfrekvens, kan utslagene bli farlig store (resonans).

## Begreper og formler
- Utslag: $x(t) = A\cos(\omega t + \varphi)$, der $A$ er amplituden (største utslag).
- Vinkelfrekvens $\omega$ (rad/s), frekvens $f$ (Hz) og periode $T$ (s): $\omega = 2\pi f$ og $T = 1/f$.
- Masse–fjær-system: $\omega = \sqrt{k/m}$, altså $T = 2\pi\sqrt{m/k}$.
- Matematisk pendel (små utslag): $T = 2\pi\sqrt{L/g}$. Perioden er uavhengig av massen.
- Største fart og akselerasjon: $v_{maks} = A\omega$ (i likevektsstillingen) og $a_{maks} = A\omega^2$ (i ytterstillingene).
- Energi: $E = \tfrac12 kA^2 = \tfrac12 m v_{maks}^2$. Energien veksler mellom kinetisk og potensiell form.
- Bølger: $v = f\lambda$. På en streng med strekkraft $F$ og masse per lengde $\mu$ er $v = \sqrt{F/\mu}$.
- Stående bølger på en streng som er fast i begge ender: $L = n\lambda/2$, så $f_n = \dfrac{nv}{2L}$ med $n = 1, 2, 3, \dots$

## Slik løser du oppgavene
1. Finn ut hva som svinger, og skriv opp kjente størrelser i SI-enheter (cm → m, g → kg).
2. Regn ut $\omega$ fra systemet ($\sqrt{k/m}$ eller $\sqrt{g/L}$).
3. Gå videre til $f = \omega/(2\pi)$ og $T = 1/f$, eller til $v_{maks}$, $a_{maks}$ og energi.
4. For bølger: finn bølgefarten først, og deretter $\lambda$ eller $f$ fra $v = f\lambda$.
5. Sjekk størrelsesordenen: en liten kloss i en fjær svinger typisk noen ganger per sekund.

### Eksempel
En kloss på 2 kg henger i en fjær med $k = 800$ N/m og svinger med amplitude 10 cm. Finn perioden, den største farten og energien.

1. $\omega = \sqrt{k/m} = \sqrt{800/2} = 20$ rad/s.
2. $T = 2\pi/\omega = 2\pi/20 \approx 0{,}314$ s, og $f = 1/T \approx 3{,}18$ Hz.
3. $v_{maks} = A\omega = 0{,}10\cdot 20 = 2{,}0$ m/s.
4. $E = \tfrac12 kA^2 = \tfrac12\cdot 800\cdot 0{,}10^2 = 4{,}0$ J. Kontroll: $\tfrac12 mv_{maks}^2 = \tfrac12\cdot 2\cdot 2^2 = 4$ J.

Svar: $T \approx 0{,}314$ s, $v_{maks} = 2{,}0$ m/s og $E = 4{,}0$ J.

## Vanlige feil
- Å blande $\omega$ (rad/s) og $f$ (Hz). Husk faktoren $2\pi$.
- Å glemme å gjøre om cm til m før man regner ut energien.
- Å tro at perioden til en pendel avhenger av massen eller amplituden (ved små utslag gjør den ikke det).
- Å bruke $L = n\lambda$ i stedet for $L = n\lambda/2$ for stående bølger.

> Masse–fjær: $\omega = \sqrt{k/m}$. Pendel: $T = 2\pi\sqrt{L/g}$. Bølger: $v = f\lambda$. Farten er størst i likevektsstillingen.`,
en: S`## What is it about?
Anything that moves back and forth around an equilibrium position – a mass on a spring, a pendulum, a bridge in the wind or a vibrating machine – can, to a first approximation, be described as a **harmonic oscillator**. A wave is an oscillation that travels through space: sound, water waves and waves on a string.

This matters to engineers because every structure has natural frequencies. If it is driven at a frequency close to one of them, the amplitude can become dangerously large (resonance).

## Key quantities and formulas
- Displacement: $x(t) = A\cos(\omega t + \varphi)$, where $A$ is the amplitude (largest displacement).
- Angular frequency $\omega$ (rad/s), frequency $f$ (Hz) and period $T$ (s): $\omega = 2\pi f$ and $T = 1/f$.
- Mass–spring system: $\omega = \sqrt{k/m}$, so $T = 2\pi\sqrt{m/k}$.
- Simple pendulum (small swings): $T = 2\pi\sqrt{L/g}$. The period does not depend on the mass.
- Maximum speed and acceleration: $v_{max} = A\omega$ (at the equilibrium position) and $a_{max} = A\omega^2$ (at the turning points).
- Energy: $E = \tfrac12 kA^2 = \tfrac12 m v_{max}^2$. The energy alternates between kinetic and potential form.
- Waves: $v = f\lambda$. On a string with tension $F$ and mass per unit length $\mu$, $v = \sqrt{F/\mu}$.
- Standing waves on a string fixed at both ends: $L = n\lambda/2$, so $f_n = \dfrac{nv}{2L}$ with $n = 1, 2, 3, \dots$

## How to solve the problems
1. Identify what oscillates and list the known quantities in SI units (cm → m, g → kg).
2. Find $\omega$ from the system ($\sqrt{k/m}$ or $\sqrt{g/L}$).
3. Continue to $f = \omega/(2\pi)$ and $T = 1/f$, or to $v_{max}$, $a_{max}$ and the energy.
4. For waves: find the wave speed first, then $\lambda$ or $f$ from $v = f\lambda$.
5. Check the order of magnitude: a small block on a spring typically oscillates a few times per second.

### Example
A 2 kg block hangs from a spring with $k = 800$ N/m and oscillates with an amplitude of 10 cm. Find the period, the maximum speed and the energy.

1. $\omega = \sqrt{k/m} = \sqrt{800/2} = 20$ rad/s.
2. $T = 2\pi/\omega = 2\pi/20 \approx 0.314$ s, and $f = 1/T \approx 3.18$ Hz.
3. $v_{max} = A\omega = 0.10\cdot 20 = 2.0$ m/s.
4. $E = \tfrac12 kA^2 = \tfrac12\cdot 800\cdot 0.10^2 = 4.0$ J. Check: $\tfrac12 mv_{max}^2 = \tfrac12\cdot 2\cdot 2^2 = 4$ J.

Answer: $T \approx 0.314$ s, $v_{max} = 2.0$ m/s and $E = 4.0$ J.

## Common mistakes
- Mixing up $\omega$ (rad/s) and $f$ (Hz). Remember the factor $2\pi$.
- Forgetting to convert cm to m before computing the energy.
- Believing that the period of a pendulum depends on its mass or amplitude (for small swings it does not).
- Using $L = n\lambda$ instead of $L = n\lambda/2$ for standing waves.

> Mass–spring: $\omega = \sqrt{k/m}$. Pendulum: $T = 2\pi\sqrt{L/g}$. Waves: $v = f\lambda$. The speed is greatest at the equilibrium position.`
});

BIQ("MEK1400", 0, [
  ["Hva skjer med perioden til et masse–fjær-system hvis massen firedobles (samme fjær)?",
   ["Den dobles", "Den firedobles", "Den halveres", "Den er uendret"],
   S`$T = 2\pi\sqrt{m/k}$, så $T \propto \sqrt m$. Fire ganger så stor masse gir $\sqrt4 = 2$ ganger så lang periode.`,
   "What happens to the period of a mass–spring system if the mass is quadrupled (same spring)?",
   ["It doubles", "It quadruples", "It is halved", "It is unchanged"],
   S`$T = 2\pi\sqrt{m/k}$, so $T \propto \sqrt m$. Four times the mass gives $\sqrt4 = 2$ times the period.`],
  ["Hvor i svingningen har en harmonisk oscillator størst fart?",
   ["I likevektsstillingen", "I ytterstillingene", "Halvveis mellom likevektsstillingen og ytterstillingen", "Farten er like stor overalt"],
   S`I likevektsstillingen er all energien kinetisk, så farten er størst der: $v_{maks} = A\omega$. I ytterstillingene er farten null, mens akselerasjonen er størst.`,
   "Where in the oscillation does a harmonic oscillator have its greatest speed?",
   ["At the equilibrium position", "At the turning points", "Halfway between the equilibrium position and a turning point", "The speed is the same everywhere"],
   S`At the equilibrium position all the energy is kinetic, so the speed is greatest there: $v_{max} = A\omega$. At the turning points the speed is zero, while the acceleration is greatest.`],
  ["En streng er 0,65 m lang mellom to faste punkter, har massen 0,5 g per meter og er strammet med 80 N. Hva er frekvensen til grunntonen?",
   { n: 400 / 1.3, tol: 3, u: "Hz" },
   S`Bølgefart: $v = \sqrt{F/\mu} = \sqrt{80/0{,}0005} = 400$ m/s. Grunntonen har $\lambda = 2L = 1{,}3$ m, så $f_1 = v/(2L) = 400/1{,}3 \approx 307{,}7$ Hz.`,
   "A string is 0.65 m long between two fixed points, has a mass of 0.5 g per meter and is under a tension of 80 N. What is the frequency of the fundamental?",
   null,
   S`Wave speed: $v = \sqrt{F/\mu} = \sqrt{80/0.0005} = 400$ m/s. The fundamental has $\lambda = 2L = 1.3$ m, so $f_1 = v/(2L) = 400/1.3 \approx 307.7$ Hz.`],
  ["En pendelklokke flyttes fra jorda til månen, der tyngdeakselerasjonen er omtrent 1/6 av jordas. Hva skjer med perioden til pendelen?",
   ["Den blir omtrent 2,4 ganger lengre", "Den blir 6 ganger lengre", "Den blir kortere", "Den er uendret fordi massen er den samme"],
   S`$T = 2\pi\sqrt{L/g}$. Når $g$ blir 6 ganger mindre, blir $T$ hele $\sqrt6 \approx 2{,}45$ ganger lengre. Klokka går altså for sakte. Massen spiller ingen rolle.`,
   "A pendulum clock is moved from the Earth to the Moon, where the gravitational acceleration is about 1/6 of the Earth's. What happens to the period of the pendulum?",
   ["It becomes about 2.4 times longer", "It becomes 6 times longer", "It becomes shorter", "It is unchanged because the mass is the same"],
   S`$T = 2\pi\sqrt{L/g}$. When $g$ becomes 6 times smaller, $T$ becomes $\sqrt6 \approx 2.45$ times longer, so the clock runs slow. The mass plays no role.`]
]);

GEN("MEK1400", 0,
 () => { const m = R.f(0.2, 5, 0.1), k = R.p([50, 80, 100, 150, 200, 250, 300, 400, 500, 800]), per = 2 * Math.PI * Math.sqrt(m / k);
   return [T(S`Et masse–fjær-system har $m = ${mf(m)}$ kg og $k = ${k}$ N/m. Hva er svingeperioden?`,
             S`A mass–spring system has $m = ${mf(m)}$ kg and $k = ${k}$ N/m. What is the period of oscillation?`),
     { n: per, tol: rel(per), u: "s" },
     S`$T = 2\pi\sqrt{m/k} = 2\pi\sqrt{${mf(m)}/${k}} \approx ${mf(per)}$ s.`]; },
 () => { const m = R.f(0.5, 4, 0.5), k = R.p([100, 200, 300, 400, 500, 800]), A = R.i(2, 15), w = Math.sqrt(k / m), v = A / 100 * w;
   return [T(S`En kloss på ${nf(m)} kg henger i en fjær med $k = ${k}$ N/m og svinger med amplitude ${A} cm. Hva er den største farten til klossen?`,
             S`A block of ${nf(m)} kg hangs from a spring with $k = ${k}$ N/m and oscillates with an amplitude of ${A} cm. What is the maximum speed of the block?`),
     { n: v, tol: rel(v), u: "m/s" },
     T(S`$\omega = \sqrt{k/m} = \sqrt{${k}/${mf(m)}} \approx ${mf(w)}$ rad/s. Farten er størst i likevektsstillingen: $v_{maks} = A\omega = ${mf(A / 100)}\cdot ${mf(w)} \approx ${mf(v)}$ m/s.`,
       S`$\omega = \sqrt{k/m} = \sqrt{${k}/${mf(m)}} \approx ${mf(w)}$ rad/s. The speed is greatest at the equilibrium position: $v_{max} = A\omega = ${mf(A / 100)}\cdot ${mf(w)} \approx ${mf(v)}$ m/s.`)]; },
 () => { const L = R.f(0.5, 0.9, 0.05), F = R.i(40, 150), mu = R.f(0.4, 6, 0.2), n = R.i(1, 3), v = Math.sqrt(F / (mu / 1000)), f = n * v / (2 * L);
   const nbN = ["grunntonen", "den andre harmoniske", "den tredje harmoniske"][n - 1], enN = ["fundamental", "second harmonic", "third harmonic"][n - 1];
   return [T(S`En gitarstreng er ${nf(L)} m lang mellom festepunktene, har massen ${nf(mu)} g per meter og er strammet med ${F} N. Hva er frekvensen til ${nbN} ($n = ${n}$)?`,
             S`A guitar string is ${nf(L)} m long between its fixed ends, has a mass of ${nf(mu)} g per meter and is under a tension of ${F} N. What is the frequency of the ${enN} ($n = ${n}$)?`),
     { n: f, tol: rel(f), u: "Hz" },
     T(S`Bølgefart: $v = \sqrt{F/\mu} = \sqrt{${F}/${mf(mu / 1000)}} \approx ${mf(v, 1)}$ m/s. Stående bølge: $f_n = \dfrac{nv}{2L} = \dfrac{${n}\cdot ${mf(v, 1)}}{2\cdot ${mf(L)}} \approx ${mf(f, 1)}$ Hz.`,
       S`Wave speed: $v = \sqrt{F/\mu} = \sqrt{${F}/${mf(mu / 1000)}} \approx ${mf(v, 1)}$ m/s. Standing wave: $f_n = \dfrac{nv}{2L} = \dfrac{${n}\cdot ${mf(v, 1)}}{2\cdot ${mf(L)}} \approx ${mf(f, 1)}$ Hz.`)]; }
);

THEORY("MEK1400", 1, {
nb: S`## Hva handler det om?
Elektriske ladninger virker på hverandre med krefter, og ladninger i bevegelse (strøm) skaper magnetfelt. Et magnetfelt som endrer seg, skaper i sin tur en elektrisk spenning. Disse tre ideene er grunnlaget for elektromotorer, generatorer, transformatorer, sensorer og hele strømnettet.

Nøkkelen er **feltbegrepet**: en ladning (eller en strøm) lager et felt i rommet rundt seg, og feltet virker med kraft på andre ladninger (eller strømmer) som befinner seg der.

## Begreper og formler
- Ladning $q$ måles i coulomb (C). Elementærladningen er $e = 1{,}602\cdot10^{-19}$ C.
- Coulombs lov: $F = k\dfrac{q_1q_2}{r^2}$ med $k = 8{,}99\cdot10^9$ N·m²/C². Like ladninger frastøter hverandre, ulike tiltrekker hverandre.
- Elektrisk felt: $E = F/q$ (N/C). Fra en punktladning: $E = kq/r^2$. Mellom to parallelle plater: $E = U/d$.
- Potensial (spenning): $U = W/q$ i volt. En ladning som går gjennom spenningen $U$, får energien $qU$.
- Magnetisk kraft på en ladning: $F = qvB\sin\theta$, vinkelrett på både $\vec v$ og $\vec B$.
- Kraft på en strømførende leder: $F = BIL\sin\theta$.
- Felt rundt en lang, rett leder: $B = \dfrac{\mu_0 I}{2\pi r}$ med $\mu_0 = 4\pi\cdot10^{-7}$ T·m/A.
- Magnetisk fluks: $\Phi = BA\cos\theta$ (Wb).
- Faradays lov: $\varepsilon = -N\dfrac{\Delta\Phi}{\Delta t}$. Minustegnet er Lenz' lov: den induserte strømmen motvirker endringen.

## Slik løser du oppgavene
1. Gjør alle størrelser om til SI: µC → $10^{-6}$ C, cm → m, cm² → $10^{-4}$ m².
2. Velg riktig lov: kraft mellom ladninger (Coulomb), kraft i magnetfelt ($qvB$ eller $BIL$) eller induksjon (Faraday).
3. Regn ut tallverdien først, og bestem retningen etterpå (fortegn, høyrehåndsregel, Lenz).
4. Ved induksjon: finn $\Delta\Phi$, del på $\Delta t$ og gang med $N$. Strømmen blir $I = \varepsilon/R$.

### Eksempel
En spole har 200 vindinger og tverrsnittsareal 0,01 m². Den står vinkelrett på et magnetfelt som øker jevnt fra 0 til 0,5 T på 0,1 s. Spolen har motstanden 4 Ω. Finn indusert spenning og strøm.

1. Endring i fluks per vinding: $\Delta\Phi = A\,\Delta B = 0{,}01\cdot 0{,}5 = 0{,}005$ Wb.
2. Indusert spenning: $\varepsilon = N\Delta\Phi/\Delta t = 200\cdot 0{,}005/0{,}1 = 10$ V.
3. Strøm: $I = \varepsilon/R = 10/4 = 2{,}5$ A.

Svar: 10 V og 2,5 A. Strømmen går slik at dens eget magnetfelt motvirker økningen i det ytre feltet (Lenz).

## Vanlige feil
- Å glemme å kvadrere avstanden i Coulombs lov.
- Å sette µC eller cm rett inn i formlene uten å gjøre om til SI.
- Å tro at et sterkt, men konstant magnetfelt induserer spenning. Det er endringen i fluks som teller.
- Å tro at magnetkraften gjør arbeid på en ladning. Den står vinkelrett på farten og endrer bare retningen.

> Elektrisk: $F = kq_1q_2/r^2$ og $E = F/q$. Magnetisk: $F = qvB$ og $F = BIL$. Induksjon: $\varepsilon = -N\,\Delta\Phi/\Delta t$ – bare endring gir spenning.`,
en: S`## What is it about?
Electric charges exert forces on each other, and moving charges (currents) create magnetic fields. A changing magnetic field in turn creates an electric voltage. These three ideas are the basis of electric motors, generators, transformers, sensors and the entire power grid.

The key is the **field concept**: a charge (or a current) creates a field in the space around it, and the field exerts a force on other charges (or currents) located there.

## Key quantities and formulas
- Charge $q$ is measured in coulombs (C). The elementary charge is $e = 1.602\cdot10^{-19}$ C.
- Coulomb's law: $F = k\dfrac{q_1q_2}{r^2}$ with $k = 8.99\cdot10^9$ N·m²/C². Like charges repel, unlike charges attract.
- Electric field: $E = F/q$ (N/C). From a point charge: $E = kq/r^2$. Between two parallel plates: $E = U/d$.
- Potential (voltage): $U = W/q$ in volts. A charge that passes through the voltage $U$ gains the energy $qU$.
- Magnetic force on a charge: $F = qvB\sin\theta$, perpendicular to both $\vec v$ and $\vec B$.
- Force on a current-carrying conductor: $F = BIL\sin\theta$.
- Field around a long, straight conductor: $B = \dfrac{\mu_0 I}{2\pi r}$ with $\mu_0 = 4\pi\cdot10^{-7}$ T·m/A.
- Magnetic flux: $\Phi = BA\cos\theta$ (Wb).
- Faraday's law: $\varepsilon = -N\dfrac{\Delta\Phi}{\Delta t}$. The minus sign is Lenz's law: the induced current opposes the change.

## How to solve the problems
1. Convert everything to SI: µC → $10^{-6}$ C, cm → m, cm² → $10^{-4}$ m².
2. Choose the right law: force between charges (Coulomb), force in a magnetic field ($qvB$ or $BIL$) or induction (Faraday).
3. Compute the magnitude first, then determine the direction (sign, right-hand rule, Lenz).
4. For induction: find $\Delta\Phi$, divide by $\Delta t$ and multiply by $N$. The current is $I = \varepsilon/R$.

### Example
A coil has 200 turns and a cross-sectional area of 0.01 m². It is perpendicular to a magnetic field that increases uniformly from 0 to 0.5 T in 0.1 s. The coil has a resistance of 4 Ω. Find the induced voltage and current.

1. Change in flux per turn: $\Delta\Phi = A\,\Delta B = 0.01\cdot 0.5 = 0.005$ Wb.
2. Induced voltage: $\varepsilon = N\Delta\Phi/\Delta t = 200\cdot 0.005/0.1 = 10$ V.
3. Current: $I = \varepsilon/R = 10/4 = 2.5$ A.

Answer: 10 V and 2.5 A. The current flows so that its own magnetic field opposes the increase of the external field (Lenz).

## Common mistakes
- Forgetting to square the distance in Coulomb's law.
- Putting µC or cm straight into the formulas without converting to SI.
- Believing that a strong but constant magnetic field induces a voltage. It is the change in flux that counts.
- Believing that the magnetic force does work on a charge. It is perpendicular to the velocity and only changes the direction.

> Electric: $F = kq_1q_2/r^2$ and $E = F/q$. Magnetic: $F = qvB$ and $F = BIL$. Induction: $\varepsilon = -N\,\Delta\Phi/\Delta t$ – only a change gives a voltage.`
});

BIQ("MEK1400", 1, [
  ["To små, ladde kuler frastøter hverandre. Hva kan du si om ladningene?",
   ["De har samme fortegn", "De har motsatt fortegn", "Minst én av dem er nøytral", "Den ene må ha større ladning enn den andre"],
   "Like ladninger frastøter hverandre, og motsatte ladninger tiltrekker hverandre. Kraften er like stor på begge kulene (Newtons 3. lov), uansett hvor store ladningene er.",
   "Two small charged spheres repel each other. What can you say about the charges?",
   ["They have the same sign", "They have opposite signs", "At least one of them is neutral", "One of them must have a larger charge than the other"],
   "Like charges repel and opposite charges attract. The force is equally large on both spheres (Newton's third law), regardless of the sizes of the charges."],
  ["Et elektron og et proton befinner seg i det samme uniforme elektriske feltet. Hvordan er de elektriske kreftene på dem?",
   ["Like store og motsatt rettet", "Like store og med samme retning", "Kraften på protonet er ca. 1836 ganger større", "Kraften på elektronet er størst fordi det er lettest"],
   S`$F = qE$, og elektronet og protonet har like stor ladning med motsatt fortegn. Akselerasjonen $a = F/m$ blir derimot ca. 1836 ganger større for elektronet.`,
   "An electron and a proton are in the same uniform electric field. How do the electric forces on them compare?",
   ["Equal in magnitude and opposite in direction", "Equal in magnitude and in the same direction", "The force on the proton is about 1836 times larger", "The force on the electron is larger because it is lighter"],
   S`$F = qE$, and the electron and the proton have charges of equal magnitude and opposite sign. The acceleration $a = F/m$, however, is about 1836 times larger for the electron.`],
  ["En stavmagnet holdes i ro inne i en spole som er koblet til et voltmeter. Hva viser voltmeteret?",
   ["Null, fordi den magnetiske fluksen ikke endres", "En konstant spenning forskjellig fra null", "Størst mulig spenning, fordi magneten er nærmest vindingene", "Det avhenger bare av antall vindinger"],
   S`Faradays lov: $\varepsilon = -N\,\Delta\Phi/\Delta t$. Uten endring i fluks blir det ingen indusert spenning. Spenningen oppstår bare mens magneten (eller spolen) beveges.`,
   "A bar magnet is held at rest inside a coil connected to a voltmeter. What does the voltmeter show?",
   ["Zero, because the magnetic flux does not change", "A constant nonzero voltage", "The largest possible voltage, because the magnet is closest to the turns", "It depends only on the number of turns"],
   S`Faraday's law: $\varepsilon = -N\,\Delta\Phi/\Delta t$. With no change in flux there is no induced voltage. A voltage appears only while the magnet (or the coil) is moving.`],
  [S`Et proton ($m = 1{,}67\cdot10^{-27}$ kg, $q = 1{,}60\cdot10^{-19}$ C) beveger seg med $2{,}0\cdot10^6$ m/s vinkelrett på et magnetfelt på 0,50 T. Hva er radien i sirkelbanen, i cm?`,
   { n: 4.175, tol: 0.05, u: "cm" },
   S`Magnetkraften virker som sentripetalkraft: $qvB = mv^2/r$, så $r = \dfrac{mv}{qB} = \dfrac{1{,}67\cdot10^{-27}\cdot 2{,}0\cdot10^6}{1{,}60\cdot10^{-19}\cdot 0{,}50} \approx 0{,}0418$ m $= 4{,}18$ cm.`,
   S`A proton ($m = 1.67\cdot10^{-27}$ kg, $q = 1.60\cdot10^{-19}$ C) moves at $2.0\cdot10^6$ m/s perpendicular to a magnetic field of 0.50 T. What is the radius of its circular path, in cm?`,
   null,
   S`The magnetic force acts as the centripetal force: $qvB = mv^2/r$, so $r = \dfrac{mv}{qB} = \dfrac{1.67\cdot10^{-27}\cdot 2.0\cdot10^6}{1.60\cdot10^{-19}\cdot 0.50} \approx 0.0418$ m $= 4.18$ cm.`]
]);

GEN("MEK1400", 1,
 () => { const B = R.f(0.1, 1.5, 0.05), I = R.f(1, 20, 0.5), L = R.f(0.1, 1, 0.05), F = B * I * L;
   return [T(S`En rett leder med lengde ${nf(L)} m fører strømmen ${nf(I)} A vinkelrett på et magnetfelt på ${nf(B)} T. Hvor stor er kraften på lederen?`,
             S`A straight conductor of length ${nf(L)} m carries a current of ${nf(I)} A perpendicular to a magnetic field of ${nf(B)} T. What is the force on the conductor?`),
     { n: F, tol: rel(F), u: "N" },
     S`$F = BIL = ${mf(B)}\cdot ${mf(I)}\cdot ${mf(L)} \approx ${mf(F)}$ N.`]; },
 () => { const U = R.p([50, 100, 150, 200, 300, 500, 800, 1000, 1500, 2000]), v = Math.sqrt(2 * 1.602e-19 * U / 9.109e-31), vk = v / 1000;
   return [T(S`Et elektron starter i ro og akselereres gjennom en spenning på ${U} V. Hvilken fart får det? Svar i km/s. ($e = 1{,}602\cdot10^{-19}$ C, $m_e = 9{,}109\cdot10^{-31}$ kg)`,
             S`An electron starts from rest and is accelerated through a potential difference of ${U} V. What speed does it reach? Answer in km/s. ($e = 1.602\cdot10^{-19}$ C, $m_e = 9.109\cdot10^{-31}$ kg)`),
     { n: vk, tol: rel(vk), u: "km/s" },
     T(S`Energibevaring: $eU = \tfrac12m_ev^2$, så $v = \sqrt{\dfrac{2eU}{m_e}} = \sqrt{\dfrac{2\cdot 1{,}602\cdot10^{-19}\cdot ${U}}{9{,}109\cdot10^{-31}}} \approx ${mf(v / 1e6)}\cdot10^6$ m/s, altså ca. ${nf(vk, 0)} km/s.`,
       S`Energy conservation: $eU = \tfrac12m_ev^2$, so $v = \sqrt{\dfrac{2eU}{m_e}} = \sqrt{\dfrac{2\cdot 1.602\cdot10^{-19}\cdot ${U}}{9.109\cdot10^{-31}}} \approx ${mf(v / 1e6)}\cdot10^6$ m/s, i.e. about ${nf(vk, 0)} km/s.`)]; },
 () => { let N, a, dB, dt, Rs, A, emf, I, g = 0;
   do { N = R.p([50, 100, 150, 200, 300]); a = R.p([5, 8, 10, 12, 15]); dB = R.f(0.1, 1, 0.05); dt = R.p([0.05, 0.1, 0.2, 0.5]); Rs = R.p([2, 5, 10, 20, 50]);
        A = (a / 100) ** 2; emf = N * A * dB / dt; I = emf / Rs; } while ((I < 0.05 || I > 5) && ++g < 200);
   return [T(S`En kvadratisk spole med ${N} vindinger og sidekant ${a} cm står vinkelrett på et magnetfelt. Feltet endres jevnt med ${nf(dB)} T i løpet av ${nf(dt)} s. Spolen inngår i en krets med total motstand ${Rs} Ω. Hvor stor strøm induseres?`,
             S`A square coil with ${N} turns and a side length of ${a} cm is perpendicular to a magnetic field. The field changes uniformly by ${nf(dB)} T over ${nf(dt)} s. The coil is part of a circuit with a total resistance of ${Rs} Ω. How large is the induced current?`),
     { n: I, tol: rel(I), u: "A" },
     T(S`Areal: $A = ${mf(a / 100)}^2 = ${mf(A, 4)}$ m². Fluksendring per vinding: $\Delta\Phi = A\,\Delta B \approx ${mf(A * dB, 5)}$ Wb. Faradays lov: $\varepsilon = N\Delta\Phi/\Delta t = ${N}\cdot ${mf(A * dB, 5)}/${mf(dt)} \approx ${mf(emf)}$ V. Strøm: $I = \varepsilon/R = ${mf(emf)}/${Rs} \approx ${mf(I)}$ A.`,
       S`Area: $A = ${mf(a / 100)}^2 = ${mf(A, 4)}$ m². Flux change per turn: $\Delta\Phi = A\,\Delta B \approx ${mf(A * dB, 5)}$ Wb. Faraday's law: $\varepsilon = N\Delta\Phi/\Delta t = ${N}\cdot ${mf(A * dB, 5)}/${mf(dt)} \approx ${mf(emf)}$ V. Current: $I = \varepsilon/R = ${mf(emf)}/${Rs} \approx ${mf(I)}$ A.`)]; }
);

THEORY("MEK1400", 2, {
nb: S`## Hva handler det om?
Energi er fysikkens mest nyttige «valuta»: den kan ikke oppstå eller forsvinne, bare gå over fra én form til en annen. Med energibevaring kan du ofte finne en fart uten å vite noe om kreftene og tidene underveis.

For roterende maskiner – hjul, svinghjul, turbiner og motorer – finnes det en parallell verden av størrelser: vinkelfart, treghetsmoment, kraftmoment og spinn. Ser du parallellene til rettlinjet bevegelse ($m \leftrightarrow I$, $v \leftrightarrow \omega$, $F \leftrightarrow \tau$), blir rotasjon lett.

## Begreper og formler
- Arbeid: $W = Fs\cos\theta$ (J). Bare kraftkomponenten langs bevegelsen gjør arbeid.
- Kinetisk energi $E_k = \tfrac12mv^2$ og potensiell energi $E_p = mgh$.
- Energibevaring uten friksjon: $E_k + E_p$ er konstant. Med friksjon går noe over til varme.
- Effekt: $P = W/t = Fv$ (W).
- Bevegelsesmengde $p = mv$. Den er bevart i støt når ytre krefter kan neglisjeres. I et fullstendig uelastisk støt henger legemene sammen, og kinetisk energi går tapt.
- Rotasjon: vinkelfart $\omega$ (rad/s), vinkelakselerasjon $\alpha$ (rad/s²), $v = \omega r$ og $\omega = 2\pi n/60$ når $n$ er omdreininger per minutt.
- Treghetsmoment $I$: punktmasse $mr^2$, tynn ring $MR^2$, massiv sylinder $\tfrac12MR^2$, massiv kule $\tfrac25MR^2$.
- Newtons 2. lov for rotasjon: $\tau = I\alpha$. Rotasjonsenergi: $\tfrac12I\omega^2$. Spinn: $L = I\omega$, bevart uten ytre moment.
- Rulling uten gliding: $E_k = \tfrac12mv^2 + \tfrac12I\omega^2$ med $\omega = v/R$.

## Slik løser du oppgavene
1. Avgjør om oppgaven handler om energi (farter og høyder), bevegelsesmengde (støt) eller rotasjon (moment og spinn).
2. Skriv opp energien eller bevegelsesmengden før og etter.
3. Sett før lik etter (pluss eventuelt tap), og løs for den ukjente.
4. Ved rulling: husk at en del av energien går til rotasjon.

### Eksempel
En massiv sylinder slippes fra ro og ruller uten å gli ned et skråplan. Høydeforskjellen er 1,5 m. Hvor stor fart har den nederst?

1. Energibevaring: $mgh = \tfrac12mv^2 + \tfrac12I\omega^2$.
2. Med $I = \tfrac12mR^2$ og $\omega = v/R$ blir rotasjonsleddet $\tfrac14mv^2$, så $mgh = \tfrac34mv^2$.
3. $v = \sqrt{4gh/3} = \sqrt{4\cdot 9{,}81\cdot 1{,}5/3} \approx 4{,}43$ m/s.

Svar: 4,43 m/s. En kloss som glir uten friksjon, ville fått $\sqrt{2gh} \approx 5{,}42$ m/s. Forskjellen er energien som ligger i rotasjonen.

## Vanlige feil
- Å regne arbeid for en kraft som står vinkelrett på bevegelsen (arbeidet er null).
- Å bruke bevaring av kinetisk energi i et uelastisk støt. Bruk bevegelsesmengde der.
- Å glemme rotasjonsenergien når noe ruller.
- Å bruke omdreininger per minutt direkte i stedet for rad/s.

> Energi før = energi etter (+ tap). I støt er bevegelsesmengden bevart. Rotasjon: $\tau = I\alpha$, $E = \tfrac12I\omega^2$ og $L = I\omega$.`,
en: S`## What is it about?
Energy is the most useful "currency" in physics: it cannot be created or destroyed, only converted from one form to another. With conservation of energy you can often find a speed without knowing anything about the forces and times along the way.

For rotating machines – wheels, flywheels, turbines and motors – there is a parallel world of quantities: angular velocity, moment of inertia, torque and angular momentum. Once you see the parallels to straight-line motion ($m \leftrightarrow I$, $v \leftrightarrow \omega$, $F \leftrightarrow \tau$), rotation becomes easy.

## Key quantities and formulas
- Work: $W = Fs\cos\theta$ (J). Only the force component along the motion does work.
- Kinetic energy $E_k = \tfrac12mv^2$ and potential energy $E_p = mgh$.
- Conservation of energy without friction: $E_k + E_p$ is constant. With friction, some of it turns into heat.
- Power: $P = W/t = Fv$ (W).
- Momentum $p = mv$. It is conserved in collisions when external forces can be neglected. In a perfectly inelastic collision the bodies stick together, and kinetic energy is lost.
- Rotation: angular velocity $\omega$ (rad/s), angular acceleration $\alpha$ (rad/s²), $v = \omega r$ and $\omega = 2\pi n/60$ when $n$ is in revolutions per minute.
- Moment of inertia $I$: point mass $mr^2$, thin hoop $MR^2$, solid cylinder $\tfrac12MR^2$, solid sphere $\tfrac25MR^2$.
- Newton's second law for rotation: $\tau = I\alpha$. Rotational kinetic energy: $\tfrac12I\omega^2$. Angular momentum: $L = I\omega$, conserved when there is no external torque.
- Rolling without slipping: $E_k = \tfrac12mv^2 + \tfrac12I\omega^2$ with $\omega = v/R$.

## How to solve the problems
1. Decide whether the problem is about energy (speeds and heights), momentum (collisions) or rotation (torque and angular momentum).
2. Write down the energy or momentum before and after.
3. Set before equal to after (plus any losses) and solve for the unknown.
4. For rolling: remember that part of the energy goes into rotation.

### Example
A solid cylinder is released from rest and rolls without slipping down an inclined plane. The height difference is 1.5 m. What is its speed at the bottom?

1. Conservation of energy: $mgh = \tfrac12mv^2 + \tfrac12I\omega^2$.
2. With $I = \tfrac12mR^2$ and $\omega = v/R$ the rotational term becomes $\tfrac14mv^2$, so $mgh = \tfrac34mv^2$.
3. $v = \sqrt{4gh/3} = \sqrt{4\cdot 9.81\cdot 1.5/3} \approx 4.43$ m/s.

Answer: 4.43 m/s. A block sliding without friction would reach $\sqrt{2gh} \approx 5.42$ m/s. The difference is the energy stored in the rotation.

## Common mistakes
- Computing work for a force that is perpendicular to the motion (the work is zero).
- Using conservation of kinetic energy in an inelastic collision. Use momentum there.
- Forgetting the rotational energy when something rolls.
- Using revolutions per minute directly instead of rad/s.

> Energy before = energy after (+ losses). In collisions momentum is conserved. Rotation: $\tau = I\alpha$, $E = \tfrac12I\omega^2$ and $L = I\omega$.`
});

BIQ("MEK1400", 2, [
  ["Du bærer en tung kasse bortover et plant gulv med konstant fart og i konstant høyde. Hvor mye arbeid gjør den oppadrettede kraften fra armene dine på kassen?",
   ["Null, fordi kraften står vinkelrett på forflytningen", S`$mg$ ganger strekningen du går`, S`$mgh$, der $h$ er høyden kassen bæres i`, "Det avhenger av hvor fort du går"],
   S`$W = Fs\cos\theta$ med $\theta = 90^\circ$ gir $W = 0$. Musklene dine bruker likevel energi, men det er ikke mekanisk arbeid på kassen.`,
   "You carry a heavy box across a level floor at constant speed and constant height. How much work does the upward force from your arms do on the box?",
   ["Zero, because the force is perpendicular to the displacement", S`$mg$ times the distance you walk`, S`$mgh$, where $h$ is the height at which the box is carried`, "It depends on how fast you walk"],
   S`$W = Fs\cos\theta$ with $\theta = 90^\circ$ gives $W = 0$. Your muscles still use energy, but that is not mechanical work on the box.`],
  ["En massiv kule og en tynn ring med samme masse og radius slippes samtidig og ruller uten å gli ned det samme skråplanet. Hvilken kommer først ned?",
   ["Kula, fordi en mindre del av energien går til rotasjon", "Ringen, fordi den har størst treghetsmoment", "De kommer samtidig, fordi masse og radius er like", "Det avhenger av helningsvinkelen"],
   S`Energibevaring: $mgh = \tfrac12mv^2\left(1 + \dfrac{I}{mR^2}\right)$. Kula har $I/(mR^2) = 2/5$ og ringen $1$, så kula har størst fart i hver høyde og vinner alltid.`,
   "A solid sphere and a thin hoop with the same mass and radius are released at the same time and roll without slipping down the same inclined plane. Which reaches the bottom first?",
   ["The sphere, because a smaller share of the energy goes into rotation", "The hoop, because it has the larger moment of inertia", "They arrive together, because the mass and radius are equal", "It depends on the angle of the incline"],
   S`Energy conservation: $mgh = \tfrac12mv^2\left(1 + \dfrac{I}{mR^2}\right)$. The sphere has $I/(mR^2) = 2/5$ and the hoop $1$, so the sphere is faster at every height and always wins.`],
  ["En bil på 1200 kg kjører i 15 m/s inn i en stillestående bil på 800 kg. Bilene henger sammen etter støtet. Hvor mye kinetisk energi går tapt i støtet, i kJ?",
   { n: 54, tol: 0.5, u: "kJ" },
   S`Bevegelsesmengden er bevart: $v' = \dfrac{1200\cdot 15}{2000} = 9$ m/s. Før: $\tfrac12\cdot 1200\cdot 15^2 = 135$ kJ. Etter: $\tfrac12\cdot 2000\cdot 9^2 = 81$ kJ. Tap: $135 - 81 = 54$ kJ, som går til deformasjon og varme.`,
   "A 1200 kg car traveling at 15 m/s crashes into a stationary 800 kg car. The cars stick together after the collision. How much kinetic energy is lost in the collision, in kJ?",
   null,
   S`Momentum is conserved: $v' = \dfrac{1200\cdot 15}{2000} = 9$ m/s. Before: $\tfrac12\cdot 1200\cdot 15^2 = 135$ kJ. After: $\tfrac12\cdot 2000\cdot 9^2 = 81$ kJ. Loss: $135 - 81 = 54$ kJ, which goes into deformation and heat.`],
  ["Hva er bevegelsesmengden til en fotball på 0,45 kg som beveger seg med 20 m/s?",
   { n: 9, tol: 0.05, u: "kg·m/s" },
   S`$p = mv = 0{,}45\cdot 20 = 9{,}0$ kg·m/s.`,
   "What is the momentum of a 0.45 kg football moving at 20 m/s?",
   null,
   S`$p = mv = 0.45\cdot 20 = 9.0$ kg·m/s.`]
]);

GEN("MEK1400", 2,
 () => { const F = R.i(4, 30) * 50, v = R.i(10, 35), P = F * v / 1000;
   return [T(S`En bil kjører med konstant fart ${v} m/s. Luftmotstand og rullemotstand er til sammen ${F} N. Hvor stor effekt må motoren levere til hjulene?`,
             S`A car travels at a constant speed of ${v} m/s. Air resistance and rolling resistance total ${F} N. How much power must the engine deliver to the wheels?`),
     { n: P, tol: rel(P), u: "kW" },
     T(S`Ved konstant fart er drivkraften lik motstanden, så $P = Fv = ${F}\cdot ${v} = ${F * v}$ W $\approx ${mf(P)}$ kW.`,
       S`At constant speed the driving force equals the resistance, so $P = Fv = ${F}\cdot ${v} = ${F * v}$ W $\approx ${mf(P)}$ kW.`)]; },
 () => { const m1 = R.i(10, 40), m2 = R.i(10, 40), v1 = R.f(1, 4, 0.5), v2 = R.f(0, v1 - 0.5, 0.5), v = (m1 * v1 + m2 * v2) / (m1 + m2);
   const nb2 = v2 === 0 ? "som står i ro" : `som ruller med ${nf(v2)} m/s i samme retning`, en2 = v2 === 0 ? "that is at rest" : `that is rolling at ${nf(v2)} m/s in the same direction`;
   return [T(S`En jernbanevogn på ${m1} tonn ruller med ${nf(v1)} m/s og støter inn i en vogn på ${m2} tonn ${nb2}. Vognene kobles sammen. Hva blir den felles farten rett etter støtet?`,
             S`A ${m1} t railway car rolling at ${nf(v1)} m/s runs into a ${m2} t car ${en2}. The cars couple together. What is their common speed just after the collision?`),
     { n: v, tol: rel(v), u: "m/s" },
     T(S`Bevegelsesmengden er bevart: $v' = \dfrac{m_1v_1 + m_2v_2}{m_1 + m_2} = \dfrac{${m1}\cdot ${mf(v1)} + ${m2}\cdot ${mf(v2)}}{${m1 + m2}} \approx ${mf(v)}$ m/s. Massene kan stå i tonn fordi enheten forkortes.`,
       S`Momentum is conserved: $v' = \dfrac{m_1v_1 + m_2v_2}{m_1 + m_2} = \dfrac{${m1}\cdot ${mf(v1)} + ${m2}\cdot ${mf(v2)}}{${m1 + m2}} \approx ${mf(v)}$ m/s. The masses can stay in tonnes because the unit cancels.`)]; },
 () => { const b = R.p([["En massiv sylinder", "A solid cylinder", 0.5, "\\tfrac12 MR^2"], ["En massiv kule", "A solid sphere", 0.4, "\\tfrac25 MR^2"], ["En tynn ring", "A thin hoop", 1, "MR^2"]]),
     L = R.f(1, 8, 0.5), th = R.p([10, 15, 20, 25, 30]), h = L * Math.sin(th * DEG), v = Math.sqrt(2 * G_ * h / (1 + b[2]));
   return [T(S`${b[0]} starter fra ro og ruller uten å gli ${nf(L)} m nedover et skråplan med helning ${th}°. Hvor stor fart har den nederst? ($g = 9{,}81$ m/s²)`,
             S`${b[1]} starts from rest and rolls without slipping ${nf(L)} m down an inclined plane with an inclination of ${th}°. What is its speed at the bottom? ($g = 9.81$ m/s²)`),
     { n: v, tol: rel(v), u: "m/s" },
     T(S`Høydetap: $h = L\sin\theta = ${mf(L)}\sin ${th}^\circ \approx ${mf(h)}$ m. Med $I = ${b[3]}$ og $\omega = v/R$ gir energibevaring $mgh = \tfrac12mv^2(1 + ${mf(b[2])})$, så $v = \sqrt{\dfrac{2gh}{${mf(1 + b[2])}}} = \sqrt{\dfrac{2\cdot 9{,}81\cdot ${mf(h)}}{${mf(1 + b[2])}}} \approx ${mf(v)}$ m/s.`,
       S`Height loss: $h = L\sin\theta = ${mf(L)}\sin ${th}^\circ \approx ${mf(h)}$ m. With $I = ${b[3]}$ and $\omega = v/R$, energy conservation gives $mgh = \tfrac12mv^2(1 + ${mf(b[2])})$, so $v = \sqrt{\dfrac{2gh}{${mf(1 + b[2])}}} = \sqrt{\dfrac{2\cdot 9.81\cdot ${mf(h)}}{${mf(1 + b[2])}}} \approx ${mf(v)}$ m/s.`)]; }
);

//@@MATS2100

// ================= MATS2100 Termodynamikk =================
THEORY("MATS2100", 0, {
nb: S`## Hva handler det om?
Termodynamikk handler om energi: hvordan den lagres, omdannes og strømmer som varme og arbeid. Et **system** er det du studerer (for eksempel gassen i en sylinder), og alt utenfor er **omgivelsene**. Systemet kan være lukket (bare energi krysser grensen), åpent (også masse strømmer inn og ut, som i en turbin) eller isolert (verken energi eller masse krysser grensen).

For en ingeniør er dette grunnlaget for å analysere motorer, kjøleanlegg, kraftverk og varmepumper: alle bygger på at energi verken oppstår eller forsvinner, bare skifter form.

## Begreper og formler
- Tilstandsstørrelser beskriver systemet akkurat nå, uavhengig av hvordan det kom dit: trykk $p$, volum $V$, temperatur $T$ og indre energi $U$.
- Idealgassloven: $pV = nRT$, med $R = 8{,}314$ J/(mol·K) og $T$ i kelvin.
- Temperaturomregning: $T[\mathrm{K}] = t[^\circ\mathrm{C}] + 273{,}15$.
- Prosesstyper: isoterm ($T$ konstant), isobar ($p$ konstant), isokor ($V$ konstant) og adiabatisk ($Q = 0$, ingen varmeutveksling).
- Første hovedsetning for et lukket system: $\Delta U = Q - W$, der $Q$ er tilført varme og $W$ er arbeidet systemet utfører på omgivelsene.
- Arbeid ved konstant trykk: $W = p\,\Delta V$.

## Slik løser du oppgavene
1. Bestem hva slags system det er (lukket/åpent) og hva slags prosess (isoterm, isobar osv.).
2. Skriv opp kjente størrelser i SI-enheter, og husk å gjøre om celsius til kelvin.
3. Velg riktig lov: idealgassloven for tilstandsstørrelser, første hovedsetning for energibalansen.
4. Løs for den ukjente, og sjekk fortegn: arbeid systemet utfører er positivt i $\Delta U = Q - W$.

### Eksempel
2 mol gass ved konstant trykk 150 kPa varmes fra 300 K til 450 K. Hvor mye arbeid gjør gassen?

1. Ved konstant trykk er $W = p\,\Delta V$, og fra idealgassloven er $p\,\Delta V = nR\,\Delta T$.
2. $\Delta T = 450 - 300 = 150$ K.
3. $W = nR\,\Delta T = 2\cdot 8{,}314\cdot 150 \approx 2494$ J $\approx 2{,}49$ kJ.

Svar: Gassen gjør omtrent 2,49 kJ arbeid på omgivelsene.

## Vanlige feil
- Å bruke celsius i idealgassloven i stedet for kelvin.
- Å blande fortegn i første hovedsetning: $W$ er arbeidet systemet gjør, ikke arbeidet som gjøres på det.
- Å tro at $\Delta U = 0$ gjelder generelt, når det egentlig bare gjelder isoterme prosesser for en ideell gass.
- Å glemme at trykk og volum må være i SI-enheter (Pa og m³) når de kombineres med $R = 8{,}314$ J/(mol·K).

> Idealgassloven: $pV = nRT$ (kelvin!). Første hovedsetning: $\Delta U = Q - W$. Ved konstant trykk: $W = p\,\Delta V = nR\,\Delta T$.`,
en: S`## What is it about?
Thermodynamics is about energy: how it is stored, converted and flows as heat and work. A **system** is whatever you are studying (for example the gas inside a cylinder), and everything outside it is the **surroundings**. The system can be closed (only energy crosses the boundary), open (mass also flows in and out, as in a turbine) or isolated (neither energy nor mass crosses the boundary).

For an engineer this is the foundation for analyzing engines, refrigeration systems, power plants and heat pumps: they all rely on the fact that energy is never created or destroyed, only changes form.

## Key quantities and formulas
- State properties describe the system exactly as it is now, independent of how it got there: pressure $p$, volume $V$, temperature $T$ and internal energy $U$.
- Ideal gas law: $pV = nRT$, with $R = 8.314$ J/(mol·K) and $T$ in kelvin.
- Temperature conversion: $T[\mathrm{K}] = t[^\circ\mathrm{C}] + 273.15$.
- Process types: isothermal ($T$ constant), isobaric ($p$ constant), isochoric ($V$ constant) and adiabatic ($Q = 0$, no heat exchange).
- First law for a closed system: $\Delta U = Q - W$, where $Q$ is the heat added and $W$ is the work done by the system on the surroundings.
- Work at constant pressure: $W = p\,\Delta V$.

## How to solve the problems
1. Decide what kind of system it is (closed/open) and what kind of process (isothermal, isobaric, etc.).
2. Write down the known quantities in SI units, and remember to convert Celsius to kelvin.
3. Choose the right law: the ideal gas law for state properties, the first law for the energy balance.
4. Solve for the unknown, and check the sign: the work done by the system is positive in $\Delta U = Q - W$.

### Example
2 mol of gas at a constant pressure of 150 kPa is heated from 300 K to 450 K. How much work does the gas do?

1. At constant pressure, $W = p\,\Delta V$, and from the ideal gas law $p\,\Delta V = nR\,\Delta T$.
2. $\Delta T = 450 - 300 = 150$ K.
3. $W = nR\,\Delta T = 2\cdot 8.314\cdot 150 \approx 2494$ J $\approx 2.49$ kJ.

Answer: The gas does about 2.49 kJ of work on the surroundings.

## Common mistakes
- Using Celsius in the ideal gas law instead of kelvin.
- Mixing up the sign in the first law: $W$ is the work done by the system, not the work done on it.
- Believing that $\Delta U = 0$ holds in general, when it really only applies to isothermal processes for an ideal gas.
- Forgetting that pressure and volume must be in SI units (Pa and m³) when combined with $R = 8.314$ J/(mol·K).

> Ideal gas law: $pV = nRT$ (kelvin!). First law: $\Delta U = Q - W$. At constant pressure: $W = p\,\Delta V = nR\,\Delta T$.`
});

BIQ("MATS2100", 0, [
  ["Hva kjennetegner en isokor prosess?",
   [S`$V$ er konstant`, S`$p$ er konstant`, S`$T$ er konstant`, S`$Q = 0$`],
   S`Isokor betyr konstant volum. Isobar er konstant trykk, isoterm er konstant temperatur, og adiabatisk er $Q = 0$.`,
   "What characterizes an isochoric process?",
   [S`$V$ is constant`, S`$p$ is constant`, S`$T$ is constant`, S`$Q = 0$`],
   S`Isochoric means constant volume. Isobaric is constant pressure, isothermal is constant temperature, and adiabatic means $Q = 0$.`],
  ["Hvilken av disse er en tilstandsstørrelse (avhenger bare av tilstanden akkurat nå, ikke av veien dit)?",
   [S`Indre energi $U$`, S`Varme $Q$`, S`Arbeid $W$`],
   S`$U$ er en tilstandsstørrelse: den avhenger bare av trykk, volum og temperatur akkurat nå. $Q$ og $W$ avhenger derimot av hvilken vei prosessen tar mellom to tilstander.`,
   "Which of these is a state property (depends only on the current state, not on the path taken to get there)?",
   [S`Internal energy $U$`, S`Heat $Q$`, S`Work $W$`],
   S`$U$ is a state property: it depends only on the current pressure, volume and temperature. $Q$ and $W$, on the other hand, depend on which path the process takes between two states.`],
  ["En gassmengde har trykket 200 kPa, volumet 0,01 m³ og temperaturen 350 K. Den varmes opp til 500 K samtidig som volumet økes til 0,015 m³. Hva er det nye trykket?",
   { n: 190.47619047619048, tol: 1.9, u: "kPa" },
   S`Kombinert gasslov: $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$, så $p_2 = \dfrac{p_1V_1T_2}{T_1V_2} = \dfrac{200\cdot 0{,}01\cdot 500}{350\cdot 0{,}015} \approx 190{,}5$ kPa.`,
   "A quantity of gas has a pressure of 200 kPa, a volume of 0.01 m³ and a temperature of 350 K. It is heated to 500 K while the volume is increased to 0.015 m³. What is the new pressure?",
   null,
   S`Combined gas law: $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$, so $p_2 = \dfrac{p_1V_1T_2}{T_1V_2} = \dfrac{200\cdot 0.01\cdot 500}{350\cdot 0.015} \approx 190.5$ kPa.`]
]);

GEN("MATS2100", 0,
 () => { const p = R.f(50, 500, 10), V = R.i(2, 50), Tk = R.p([250, 270, 290, 300, 310, 320, 350, 380, 400, 420]), n = p * V / (8.314 * Tk);
   return [T(S`${V} L gass har trykket ${nf(p)} kPa og temperaturen ${Tk} K. Hvor mange mol er det? ($R = 8{,}314$ J/(mol·K))`,
             S`${V} L of gas has a pressure of ${nf(p)} kPa and a temperature of ${Tk} K. How many moles are present? ($R = 8.314$ J/(mol·K))`),
     { n, tol: rel(n), u: "mol" },
     S`$n = \dfrac{pV}{RT} = \dfrac{${mf(p)}\cdot ${V}}{8{,}314\cdot ${Tk}} \approx ${mf(n, 3)}$ mol.`]; },
 () => { const nn = R.f(0.5, 6, 0.5), T1 = R.p([250, 270, 280, 290, 300, 310]), dT = R.i(50, 250), T2 = T1 + dT, W = nn * 8.314 * dT / 1000;
   return [T(S`Et stempel holder trykket konstant mens ${nf(nn)} mol gass varmes fra ${T1} K til ${T2} K. Hvor mye arbeid gjør gassen på stempelet?`,
             S`A piston keeps the pressure constant while ${nf(nn)} mol of gas is heated from ${T1} K to ${T2} K. How much work does the gas do on the piston?`),
     { n: W, tol: rel(W), u: "kJ" },
     T(S`Ved konstant trykk er $W = p\,\Delta V = nR\,\Delta T = ${mf(nn)}\cdot 8{,}314\cdot ${dT} \approx ${mf(W * 1000, 0)}$ J $\approx ${mf(W)}$ kJ.`,
       S`At constant pressure, $W = p\,\Delta V = nR\,\Delta T = ${mf(nn)}\cdot 8.314\cdot ${dT} \approx ${mf(W * 1000, 0)}$ J $\approx ${mf(W)}$ kJ.`)]; }
);

THEORY("MATS2100", 1, {
nb: S`## Hva handler det om?
Varme er energi som overføres på grunn av en temperaturforskjell. For å forstå hvor mye varme som trengs for å varme opp noe, hvor effektivt en varmekraftmaskin kan omdanne varme til arbeid, og hvorfor varme alltid strømmer fra varmt til kaldt, trenger du begrepene varmekapasitet, entropi og Carnot-virkningsgrad.

Dette er sentralt for ingeniører som designer alt fra kjølesystemer og varmepumper til dampturbiner: andre hovedsetning setter en øvre grense for hvor mye nyttig arbeid du kan få ut av en gitt mengde varme.

## Begreper og formler
- Sensibel varme (temperaturendring uten faseovergang): $Q = mc\,\Delta T$, med spesifikk varmekapasitet $c$ i kJ/(kg·K).
- Latent varme (faseovergang ved konstant temperatur): $Q = mL$, der $L$ er smelte- eller fordampingsvarmen.
- Entalpi: $H = U + pV$. Nyttig for strømningsprosesser ved konstant trykk.
- Andre hovedsetning: entropien i et isolert system kan bare øke eller holde seg konstant, $\Delta S_{isolert} \geq 0$.
- Entropiendring ved konstant temperatur: $\Delta S = Q/T$ (kelvin!).
- Carnot-virkningsgrad (høyeste mulige mellom to reservoarer): $\eta_{Carnot} = 1 - T_C/T_H$.
- Varmeledning gjennom en vegg (Fouriers lov): $\dot Q = kA\,\Delta T/L$.

## Slik løser du oppgavene
1. Avgjør om varmen fører til temperaturendring (bruk $c$) eller faseovergang (bruk $L$), eller begge deler etter hverandre.
2. Ved flere trinn (f.eks. oppvarming og smelting): regn ut varmen for hvert trinn og legg sammen.
3. For virkningsgrad: identifiser $T_H$ og $T_C$ i kelvin, og bruk Carnot som en øvre grense.
4. For entropi: pass på at temperaturen er i kelvin og at fortegnet stemmer med retningen på varmestrømmen.

### Eksempel
Hvor mye varme trengs for å varme 0,5 kg is fra −5 °C til 0 °C og deretter smelte den? ($c_{is} = 2{,}1$ kJ/(kg·K), smeltevarme $L = 334$ kJ/kg)

1. Oppvarming av is: $Q_1 = mc\,\Delta T = 0{,}5\cdot 2{,}1\cdot 5 = 5{,}25$ kJ.
2. Smelting: $Q_2 = mL = 0{,}5\cdot 334 = 167$ kJ.
3. Totalt: $Q = Q_1 + Q_2 = 5{,}25 + 167 = 172{,}25$ kJ.

Svar: Omtrent 172 kJ.

## Vanlige feil
- Å bruke $Q = mc\,\Delta T$ gjennom en faseovergang; temperaturen er konstant der, så du må bruke $Q = mL$ i stedet.
- Å glemme å regne om til kelvin i Carnot- og entropiformlene.
- Å tro at en varmekraftmaskin kan ha virkningsgrad over Carnot-grensen.
- Å blande smeltevarme og fordampingsvarme, som er svært forskjellige tallverdier.

> Sensibel varme: $Q = mc\,\Delta T$. Latent varme: $Q = mL$. Carnot: $\eta = 1 - T_C/T_H$ med temperaturer i kelvin.`,
en: S`## What is it about?
Heat is energy transferred because of a temperature difference. To understand how much heat is needed to warm something up, how efficiently a heat engine can convert heat into work, and why heat always flows from hot to cold, you need the concepts of heat capacity, entropy and Carnot efficiency.

This is central for engineers designing anything from cooling systems and heat pumps to steam turbines: the second law sets an upper limit on how much useful work you can extract from a given amount of heat.

## Key quantities and formulas
- Sensible heat (temperature change without a phase change): $Q = mc\,\Delta T$, with specific heat capacity $c$ in kJ/(kg·K).
- Latent heat (phase change at constant temperature): $Q = mL$, where $L$ is the heat of fusion or vaporization.
- Enthalpy: $H = U + pV$. Useful for flow processes at constant pressure.
- Second law: the entropy of an isolated system can only increase or stay constant, $\Delta S_{isolated} \geq 0$.
- Entropy change at constant temperature: $\Delta S = Q/T$ (kelvin!).
- Carnot efficiency (the highest possible between two reservoirs): $\eta_{Carnot} = 1 - T_C/T_H$.
- Heat conduction through a wall (Fourier's law): $\dot Q = kA\,\Delta T/L$.

## How to solve the problems
1. Decide whether the heat causes a temperature change (use $c$) or a phase change (use $L$), or both in sequence.
2. For multiple steps (e.g. heating then melting): compute the heat for each step and add them together.
3. For efficiency: identify $T_H$ and $T_C$ in kelvin, and use Carnot as an upper bound.
4. For entropy: make sure the temperature is in kelvin and that the sign matches the direction of the heat flow.

### Example
How much heat is needed to warm 0.5 kg of ice from −5 °C to 0 °C and then melt it? ($c_{ice} = 2.1$ kJ/(kg·K), heat of fusion $L = 334$ kJ/kg)

1. Heating the ice: $Q_1 = mc\,\Delta T = 0.5\cdot 2.1\cdot 5 = 5.25$ kJ.
2. Melting: $Q_2 = mL = 0.5\cdot 334 = 167$ kJ.
3. Total: $Q = Q_1 + Q_2 = 5.25 + 167 = 172.25$ kJ.

Answer: About 172 kJ.

## Common mistakes
- Using $Q = mc\,\Delta T$ across a phase change; the temperature is constant there, so you must use $Q = mL$ instead.
- Forgetting to convert to kelvin in the Carnot and entropy formulas.
- Believing that a heat engine can have an efficiency above the Carnot limit.
- Mixing up the heat of fusion and the heat of vaporization, which are very different values.

> Sensible heat: $Q = mc\,\Delta T$. Latent heat: $Q = mL$. Carnot: $\eta = 1 - T_C/T_H$ with temperatures in kelvin.`
});

BIQ("MATS2100", 1, [
  ["Hva kjennetegner en reversibel prosess?",
   ["Den kan kjøres baklengs og la både system og omgivelser vende tilbake til utgangspunktet uten spor", "Den går alltid raskere enn en irreversibel prosess", "Temperaturen er alltid konstant gjennom hele prosessen", "Den bryter aldri første hovedsetning"],
   S`En reversibel prosess er en idealisering uten friksjon eller andre tap, der du i prinsippet kan snu prosessen og få tilbake utgangstilstanden. Virkelige prosesser er alltid mer eller mindre irreversible.`,
   "What characterizes a reversible process?",
   ["It can be run backward, returning both the system and the surroundings to their starting point with no trace left", "It always runs faster than an irreversible process", "The temperature is always constant throughout the process", "It never violates the first law"],
   S`A reversible process is an idealization with no friction or other losses, where you can in principle reverse the process and recover the initial state. Real processes are always more or less irreversible.`],
  ["Hvorfor kan ingen varmekraftmaskin som arbeider i en syklus, ha en virkningsgrad på 100 %?",
   ["Den må alltid avgi noe varme til et kaldere reservoar (andre hovedsetning)", "Friksjon gjør det umulig i praksis, men i teorien er det mulig", "Loven om bevaring av masse forbyr det", "Første hovedsetning forbyr det, siden energien da ville økt"],
   S`Andre hovedsetning sier at en syklisk maskin ikke kan omdanne all tilført varme til arbeid – noe må alltid avgis til et kaldt reservoar. Dette gjelder selv for en ideell, friksjonsfri maskin.`,
   "Why can no heat engine operating in a cycle have an efficiency of 100%?",
   ["It must always reject some heat to a colder reservoir (second law)", "Friction makes it impossible in practice, but in theory it is possible", "The law of conservation of mass forbids it", "The first law forbids it, since the energy would then increase"],
   S`The second law says that a cyclic machine cannot convert all the heat supplied into work – something must always be rejected to a cold reservoir. This holds even for an ideal, frictionless machine.`],
  ["Du blander 2 kg vann ved 80 °C med 3 kg vann ved 20 °C i en godt isolert beholder. Hva blir sluttemperaturen?",
   { n: 44, tol: 0.5, u: "°C" },
   S`Energibalanse (samme $c$ for begge): $m_1(T_1 - T_f) = m_2(T_f - T_2)$, så $T_f = \dfrac{m_1T_1 + m_2T_2}{m_1+m_2} = \dfrac{2\cdot 80 + 3\cdot 20}{5} = 44$ °C.`,
   "You mix 2 kg of water at 80 °C with 3 kg of water at 20 °C in a well-insulated container. What is the final temperature?",
   null,
   S`Energy balance (same $c$ for both): $m_1(T_1 - T_f) = m_2(T_f - T_2)$, so $T_f = \dfrac{m_1T_1 + m_2T_2}{m_1+m_2} = \dfrac{2\cdot 80 + 3\cdot 20}{5} = 44$ °C.`]
]);

GEN("MATS2100", 1,
 () => { const m = R.f(0.2, 5, 0.1), Q = m * 334;
   return [T(S`Hvor mye varme trengs for å smelte ${nf(m)} kg is som allerede har 0 °C? (Smeltevarme $L = 334$ kJ/kg)`,
             S`How much heat is needed to melt ${nf(m)} kg of ice already at 0 °C? (Heat of fusion $L = 334$ kJ/kg)`),
     { n: Q, tol: rel(Q), u: "kJ" },
     S`$Q = mL = ${mf(m)}\cdot 334 \approx ${mf(Q, 0)}$ kJ.`]; },
 () => { const m = R.f(0.3, 4, 0.1), Ts = -R.i(2, 25), Te = R.i(5, 60);
   const Q1 = m * 2.1 * (0 - Ts), Q2 = m * 334, Q3 = m * 4.18 * Te, Qt = Q1 + Q2 + Q3;
   return [T(S`Hvor mye varme trengs for å varme ${nf(m)} kg is fra ${nf(Ts, 0)} °C til vann ved ${Te} °C? ($c_{is} = 2{,}1$ kJ/(kg·K), smeltevarme $L = 334$ kJ/kg, $c_{vann} = 4{,}18$ kJ/(kg·K))`,
             S`How much heat is needed to warm ${nf(m)} kg of ice from ${nf(Ts, 0)} °C to water at ${Te} °C? ($c_{ice} = 2.1$ kJ/(kg·K), heat of fusion $L = 334$ kJ/kg, $c_{water} = 4.18$ kJ/(kg·K))`),
     { n: Qt, tol: rel(Qt), u: "kJ" },
     T(S`Oppvarming av is: $Q_1 = mc_{is}\Delta T = ${mf(m)}\cdot 2{,}1\cdot ${-Ts} \approx ${mf(Q1)}$ kJ. Smelting: $Q_2 = mL = ${mf(m)}\cdot 334 \approx ${mf(Q2)}$ kJ. Oppvarming av vann: $Q_3 = mc_{vann}\Delta T = ${mf(m)}\cdot 4{,}18\cdot ${Te} \approx ${mf(Q3)}$ kJ. Totalt: $Q = Q_1+Q_2+Q_3 \approx ${mf(Qt)}$ kJ.`,
       S`Heating the ice: $Q_1 = mc_{ice}\Delta T = ${mf(m)}\cdot 2.1\cdot ${-Ts} \approx ${mf(Q1)}$ kJ. Melting: $Q_2 = mL = ${mf(m)}\cdot 334 \approx ${mf(Q2)}$ kJ. Heating the water: $Q_3 = mc_{water}\Delta T = ${mf(m)}\cdot 4.18\cdot ${Te} \approx ${mf(Q3)}$ kJ. Total: $Q = Q_1+Q_2+Q_3 \approx ${mf(Qt)}$ kJ.`)]; }
);

THEORY("MATS2100", 2, {
nb: S`## Hva handler det om?
En kretsprosess er en serie prosesser som fører systemet tilbake til utgangspunktet, slik at den kan gjenta seg syklus etter syklus – slik en motor eller kjølemaskin gjør. Idealiserte kretsprosesser (Otto, Diesel, Brayton, Rankine) er forenklede modeller som lar oss regne ut virkningsgrad og arbeid uten å kjenne alle detaljene i en ekte maskin.

For en ingeniør er dette verktøyet for å sammenligne og forbedre kraftverk, motorer, kjøleanlegg og varmepumper: hvor mye nyttig arbeid eller varme får du ut for hver enhet energi du putter inn?

## Begreper og formler
- Varmekraftmaskin: tar opp varme $Q_H$ fra et varmt reservoar, avgir $Q_C$ til et kaldt, og leverer arbeid $W = Q_H - Q_C$.
- Virkningsgrad: $\eta = W/Q_H = 1 - Q_C/Q_H$.
- Varmepumpe/kjøleanlegg: bruker arbeid $W$ til å flytte varme fra kaldt til varmt. $COP_{varme} = Q_H/W$ og $COP_{kulde} = Q_C/W$, med $COP_{varme} = COP_{kulde} + 1$.
- Otto-prosessen (bensinmotor): varme tilføres ved konstant volum. Diesel-prosessen: varme tilføres ved konstant trykk.
- Brayton-prosessen (gassturbin/jetmotor): kompresjon, varmetilførsel ved konstant trykk, ekspansjon.
- Rankine-prosessen (dampkraftverk): fordamping, ekspansjon i turbin, kondensering, pumping.
- Struping (f.eks. i en ekspansjonsventil): tilnærmet konstant entalpi, men trykk og temperatur faller.
- Isentrop prosess: reversibel og adiabatisk ($Q = 0$ og $\Delta S = 0$), brukes til å idealisere kompressorer og turbiner.

## Slik løser du oppgavene
1. Identifiser hva slags maskin det er: varmekraftmaskin (leverer arbeid) eller varmepumpe/kjøleanlegg (bruker arbeid).
2. Sett opp energibalansen: $W = Q_H - Q_C$ for en varmekraftmaskin.
3. Bruk $\eta$ eller $COP$ til å koble sammen det du vet med det du søker.
4. Sjekk mot Carnot-grensen som en fornuftskontroll: ekte maskiner kommer aldri over den.

### Eksempel
En varmepumpe har $COP_{varme} = 3{,}2$ og skal levere 8 kW varme til et hus. Hvor mye elektrisk effekt trenger den, og hvor mye varme henter den fra uteluften?

1. $COP_{varme} = Q_H/W$, så $W = Q_H/COP_{varme} = 8/3{,}2 = 2{,}5$ kW.
2. Energibalanse: $Q_C = Q_H - W = 8 - 2{,}5 = 5{,}5$ kW.

Svar: Den bruker 2,5 kW strøm og henter 5,5 kW fra uteluften.

## Vanlige feil
- Å blande $COP_{varme}$ og $COP_{kulde}$ – de er alltid forskjellige for samme maskin.
- Å tro at en varmepumpe «skaper» energi fordi $COP > 1$; den flytter bare varme og bruker arbeid til det.
- Å glemme at $Q_H = Q_C + W$ må stemme (energibevaring) i alle kretsprosesser.
- Å bruke celsius i stedet for kelvin når man regner Carnot-grensen for $\eta$ eller $COP$.

> Varmekraftmaskin: $W = Q_H - Q_C$, $\eta = W/Q_H$. Varmepumpe: $COP_{varme} = Q_H/W = COP_{kulde} + 1$.`,
en: S`## What is it about?
A thermodynamic cycle is a series of processes that returns the system to its starting point, so it can repeat cycle after cycle – like an engine or a refrigeration machine does. Idealized cycles (Otto, Diesel, Brayton, Rankine) are simplified models that let us calculate efficiency and work without knowing every detail of a real machine.

For an engineer this is the tool for comparing and improving power plants, engines, refrigeration systems and heat pumps: how much useful work or heat do you get out for each unit of energy you put in?

## Key quantities and formulas
- Heat engine: takes in heat $Q_H$ from a hot reservoir, rejects $Q_C$ to a cold one, and delivers work $W = Q_H - Q_C$.
- Efficiency: $\eta = W/Q_H = 1 - Q_C/Q_H$.
- Heat pump/refrigerator: uses work $W$ to move heat from cold to hot. $COP_{heat} = Q_H/W$ and $COP_{cold} = Q_C/W$, with $COP_{heat} = COP_{cold} + 1$.
- Otto cycle (gasoline engine): heat is added at constant volume. Diesel cycle: heat is added at constant pressure.
- Brayton cycle (gas turbine/jet engine): compression, heat addition at constant pressure, expansion.
- Rankine cycle (steam power plant): evaporation, expansion in a turbine, condensation, pumping.
- Throttling (e.g. in an expansion valve): approximately constant enthalpy, but pressure and temperature drop.
- Isentropic process: reversible and adiabatic ($Q = 0$ and $\Delta S = 0$), used to idealize compressors and turbines.

## How to solve the problems
1. Identify what kind of machine it is: a heat engine (delivers work) or a heat pump/refrigerator (uses work).
2. Set up the energy balance: $W = Q_H - Q_C$ for a heat engine.
3. Use $\eta$ or $COP$ to connect what you know with what you are looking for.
4. Check against the Carnot limit as a sanity check: real machines never exceed it.

### Example
A heat pump has $COP_{heat} = 3.2$ and must deliver 8 kW of heat to a house. How much electric power does it need, and how much heat does it draw from the outside air?

1. $COP_{heat} = Q_H/W$, so $W = Q_H/COP_{heat} = 8/3.2 = 2.5$ kW.
2. Energy balance: $Q_C = Q_H - W = 8 - 2.5 = 5.5$ kW.

Answer: It uses 2.5 kW of electricity and draws 5.5 kW from the outside air.

## Common mistakes
- Mixing up $COP_{heat}$ and $COP_{cold}$ – they are always different for the same machine.
- Believing a heat pump "creates" energy because $COP > 1$; it only moves heat and uses work to do so.
- Forgetting that $Q_H = Q_C + W$ must hold (energy conservation) in every cycle.
- Using Celsius instead of kelvin when computing the Carnot limit for $\eta$ or $COP$.

> Heat engine: $W = Q_H - Q_C$, $\eta = W/Q_H$. Heat pump: $COP_{heat} = Q_H/W = COP_{cold} + 1$.`
});

BIQ("MATS2100", 2, [
  [S`Hvordan henger $COP_{varme}$ og $COP_{kulde}$ sammen for en varmepumpe/kjølemaskin som arbeider mellom de samme to temperaturene?`,
   [S`$COP_{varme} = COP_{kulde} + 1$`, S`$COP_{varme} = COP_{kulde}$`, S`$COP_{varme} = COP_{kulde} - 1$`, S`$COP_{varme} = 1/COP_{kulde}$`],
   S`Fra energibalansen $Q_H = Q_C + W$ følger $Q_H/W = Q_C/W + 1$, altså $COP_{varme} = COP_{kulde} + 1$. Varmepumpen har derfor alltid høyere COP enn kjølemaskinen.`,
   S`How are $COP_{heat}$ and $COP_{cold}$ related for a heat pump/refrigerator operating between the same two temperatures?`,
   [S`$COP_{heat} = COP_{cold} + 1$`, S`$COP_{heat} = COP_{cold}$`, S`$COP_{heat} = COP_{cold} - 1$`, S`$COP_{heat} = 1/COP_{cold}$`],
   S`From the energy balance $Q_H = Q_C + W$ it follows that $Q_H/W = Q_C/W + 1$, i.e. $COP_{heat} = COP_{cold} + 1$. The heat pump therefore always has a higher COP than the refrigerator.`],
  ["I den idealiserte Diesel-prosessen tilføres varmen ved …",
   ["konstant trykk", "konstant volum", "konstant temperatur", "konstant entropi"],
   "Dette skiller Diesel-prosessen fra Otto-prosessen, der varme tilføres ved konstant volum (momentan tenning).",
   "In the idealized Diesel cycle, heat is added at …",
   ["constant pressure", "constant volume", "constant temperature", "constant entropy"],
   "This is what distinguishes the Diesel cycle from the Otto cycle, where heat is added at constant volume (instantaneous ignition)."],
  ["En bensinmotor har virkningsgrad 30 % og leverer 45 kW mekanisk effekt. Hvor stor er varmetilførselen fra forbrenningen?",
   { n: 150, tol: 1.5, u: "kW" },
   S`$\eta = \dot W/\dot Q_H$, så $\dot Q_H = \dot W/\eta = 45/0{,}30 = 150$ kW.`,
   "A gasoline engine has an efficiency of 30% and delivers 45 kW of mechanical power. How large is the heat input from combustion?",
   null,
   S`$\eta = \dot W/\dot Q_H$, so $\dot Q_H = \dot W/\eta = 45/0.30 = 150$ kW.`]
]);

GEN("MATS2100", 2,
 () => { const Qh = R.i(200, 900), Qc = R.i(100, Qh - 50), W = Qh - Qc;
   return [T(S`En varmekraftmaskin tar opp ${Qh} kJ varme og avgir ${Qc} kJ til det kalde reservoaret. Hvor mye arbeid leverer den?`,
             S`A heat engine takes in ${Qh} kJ of heat and rejects ${Qc} kJ to the cold reservoir. How much work does it deliver?`),
     { n: W, tol: rel(W), u: "kJ" },
     S`Energibevaring: $W = Q_H - Q_C = ${Qh} - ${Qc} = ${W}$ kJ.`]; },
 () => { const Tc = R.i(-25, -5), Th = R.i(25, 40), Q = R.f(1, 10, 0.5), frac = R.p([0.45, 0.5, 0.55, 0.6, 0.65]);
   const TcK = Tc + 273.15, ThK = Th + 273.15, copC = TcK / (ThK - TcK), copA = frac * copC, P = Q / copA;
   return [T(S`Et kjøleanlegg skal holde ${nf(Tc, 0)} °C og avgir varme ved ${Th} °C. Kjølebehovet er ${nf(Q)} kW, og den faktiske $COP$-en er ${nf(frac * 100, 0)} % av Carnot-COP-en. Hvor stor eleffekt kreves?`,
             S`A refrigeration system must maintain ${nf(Tc, 0)} °C and rejects heat at ${Th} °C. The cooling load is ${nf(Q)} kW, and the actual $COP$ is ${nf(frac * 100, 0)}% of the Carnot COP. How much electric power is required?`),
     { n: P, tol: rel(P), u: "kW" },
     T(S`Carnot-COP: $COP_C = \dfrac{T_C}{T_H-T_C} = \dfrac{${mf(TcK)}}{${mf(ThK)}-${mf(TcK)}} \approx ${mf(copC)}$. Faktisk COP: $COP = ${mf(frac)}\cdot ${mf(copC)} \approx ${mf(copA)}$. Eleffekt: $P = Q/COP = ${mf(Q)}/${mf(copA)} \approx ${mf(P)}$ kW.`,
       S`Carnot COP: $COP_C = \dfrac{T_C}{T_H-T_C} = \dfrac{${mf(TcK)}}{${mf(ThK)}-${mf(TcK)}} \approx ${mf(copC)}$. Actual COP: $COP = ${mf(frac)}\cdot ${mf(copC)} \approx ${mf(copA)}$. Electric power: $P = Q/COP = ${mf(Q)}/${mf(copA)} \approx ${mf(P)}$ kW.`)]; }
);

//@@FLUID

// ================= FLUID Fluidmekanikk =================
THEORY("FLUID", 0, {
nb: S`## Hva handler det om?
Hydrostatikk handler om væsker i ro. Selv om ingenting strømmer, virker væsken med trykk på alt den er i kontakt med – bunnen og veggene i en tank, en demning, et neddykket legeme eller stempelet i en hydraulisk sylinder. Trykket øker med dybden fordi hver væskesøyle må bære vekten av alt vannet over seg.

For en ingeniør er dette grunnlaget for å dimensjonere tanker, demninger, dykkerutstyr, hydrauliske system og manometre.

## Begreper og formler
- Hydrostatisk trykk: $p = p_0 + \rho gh$, der $p_0$ er trykket ved overflaten (ofte atmosfæretrykket) og $h$ er dybden.
- Overtrykk (manometertrykk) måles relativt til atmosfæren; absolutt trykk er $p_{abs} = p_{atm} + p_{over}$, med $p_{atm} \approx 101{,}3$ kPa.
- Arkimedes' prinsipp: oppdriften på et neddykket legeme er $F_B = \rho_{væske}gV_{fortrengt}$.
- Et flytende legeme fortrenger nøyaktig sin egen vekt i væske: $\rho_{legeme}V_{legeme}g = \rho_{væske}V_{fortrengt}g$, så den nedsenkede volumandelen er $\rho_{legeme}/\rho_{væske}$.
- Hydraulisk presse (Pascals prinsipp): trykket er likt på begge stempler, $F_2 = F_1A_2/A_1$.
- U-rørmanometer: trykkforskjellen svarer til en høydeforskjell i en væskesøyle, $\Delta p = \rho g\,\Delta h$.

## Slik løser du oppgavene
1. Finn hvilken væske det er (tetthet $\rho$) og hvilken dybde eller høydeforskjell $h$ som gjelder.
2. Avgjør om du skal finne overtrykk (bare $\rho gh$) eller absolutt trykk (legg til $p_{atm}$).
3. Ved oppdrift: bruk hele det neddykkede volumet. Ved flyting: sett tyngden lik oppdriften.
4. Ved hydraulikk og manometre: sett opp trykklikevekten og løs for det som er ukjent.

### Eksempel
Et isfjell ($\rho_{is} = 917$ kg/m³) flyter i sjøvann ($\rho_{sjø} = 1025$ kg/m³). Hvor stor andel av volumet stikker opp over overflaten?

1. Flyting: vekten av isfjellet er lik oppdriften, $\rho_{is}Vg = \rho_{sjø}V_{under}g$.
2. Andelen under vann: $V_{under}/V = \rho_{is}/\rho_{sjø} = 917/1025 \approx 0{,}895$.
3. Andelen over vann: $1 - 0{,}895 = 0{,}105$, altså ca. 10,5 %.

Svar: Bare rundt 10,5 % av isfjellet er synlig over vannflaten.

## Vanlige feil
- Å tro at trykket avhenger av beholderens form eller væskens totale volum (det hydrostatiske paradokset sier det gjør det ikke).
- Å blande overtrykk og absolutt trykk.
- Å glemme å gange med $g$ i $\rho gh$, eller å bruke $\rho$ i g/cm³ i stedet for kg/m³.
- Å tro at et flytende legeme har oppdrift lik hele sin egen vekt fortrengt i luft; det er bare den nedsenkede delen som teller.

> Trykk: $p = p_0 + \rho gh$. Oppdrift: $F_B = \rho gV_{fortrengt}$. Flyting: nedsenket andel $= \rho_{legeme}/\rho_{væske}$.`,
en: S`## What is it about?
Hydrostatics deals with fluids at rest. Even though nothing is flowing, the fluid still exerts pressure on everything it touches – the bottom and walls of a tank, a dam, a submerged body or the piston in a hydraulic cylinder. Pressure increases with depth because every column of fluid must support the weight of everything above it.

For an engineer this is the foundation for sizing tanks, dams, diving equipment, hydraulic systems and manometers.

## Key quantities and formulas
- Hydrostatic pressure: $p = p_0 + \rho gh$, where $p_0$ is the pressure at the surface (often atmospheric) and $h$ is the depth.
- Gauge pressure is measured relative to the atmosphere; absolute pressure is $p_{abs} = p_{atm} + p_{gauge}$, with $p_{atm} \approx 101.3$ kPa.
- Archimedes' principle: the buoyant force on a submerged body is $F_B = \rho_{fluid}gV_{displaced}$.
- A floating body displaces exactly its own weight in fluid: $\rho_{body}V_{body}g = \rho_{fluid}V_{displaced}g$, so the submerged volume fraction is $\rho_{body}/\rho_{fluid}$.
- Hydraulic press (Pascal's principle): the pressure is equal on both pistons, $F_2 = F_1A_2/A_1$.
- U-tube manometer: the pressure difference corresponds to a height difference in a fluid column, $\Delta p = \rho g\,\Delta h$.

## How to solve the problems
1. Find which fluid it is (density $\rho$) and which depth or height difference $h$ applies.
2. Decide whether you need gauge pressure (just $\rho gh$) or absolute pressure (add $p_{atm}$).
3. For buoyancy: use the entire submerged volume. For floating: set the weight equal to the buoyant force.
4. For hydraulics and manometers: set up the pressure balance and solve for the unknown.

### Example
An iceberg ($\rho_{ice} = 917$ kg/m³) floats in seawater ($\rho_{sea} = 1025$ kg/m³). What fraction of its volume sticks up above the surface?

1. Floating: the weight of the iceberg equals the buoyant force, $\rho_{ice}Vg = \rho_{sea}V_{under}g$.
2. Fraction below water: $V_{under}/V = \rho_{ice}/\rho_{sea} = 917/1025 \approx 0.895$.
3. Fraction above water: $1 - 0.895 = 0.105$, i.e. about 10.5%.

Answer: Only about 10.5% of the iceberg is visible above the water surface.

## Common mistakes
- Believing that the pressure depends on the shape of the container or the total volume of fluid (the hydrostatic paradox says it does not).
- Mixing up gauge pressure and absolute pressure.
- Forgetting to multiply by $g$ in $\rho gh$, or using $\rho$ in g/cm³ instead of kg/m³.
- Believing a floating body has a buoyant force equal to its entire weight displaced in air; only the submerged part counts.

> Pressure: $p = p_0 + \rho gh$. Buoyancy: $F_B = \rho gV_{displaced}$. Floating: submerged fraction $= \rho_{body}/\rho_{fluid}$.`
});

BIQ("FLUID", 0, [
  ["Hvorfor flyter is på vann?",
   ["Fordi is har lavere tetthet enn flytende vann", "Fordi is er kaldere enn vannet rundt", "Fordi is inneholder luftbobler som gir oppdrift", "Fordi overflatespenningen holder isen oppe"],
   S`Is er ca. 917 kg/m³, mens vann er 1000 kg/m³. Et legeme med lavere tetthet enn væsken flyter alltid, uavhengig av temperatur.`,
   "Why does ice float on water?",
   ["Because ice has a lower density than liquid water", "Because ice is colder than the surrounding water", "Because ice contains air bubbles that provide buoyancy", "Because surface tension holds the ice up"],
   S`Ice is about 917 kg/m³, while water is 1000 kg/m³. A body with a lower density than the fluid always floats, regardless of temperature.`],
  ["Et skip lastes med mer gods. Hva skjer med hvor dypt det ligger i vannet (dypgangen)?",
   ["Det synker dypere, fordi det må fortrenge mer vann for at oppdriften skal holde tritt med den økte vekten", "Det ligger like dypt, fordi oppdriften alltid er konstant", "Det flyter høyere, fordi tyngre skip er mer stabile", "Det avhenger bare av skipets fart"],
   S`Skipet flyter når oppdriften er lik totalvekten: $F_B = \rho_{vann}gV_{fortrengt} = mg$. Mer last gir større $m$, så $V_{fortrengt}$ må øke, og skipet synker dypere.`,
   "A ship is loaded with more cargo. What happens to how deep it sits in the water (its draft)?",
   ["It sits deeper, because it must displace more water for the buoyant force to keep up with the increased weight", "It sits at the same depth, because the buoyant force is always constant", "It floats higher, because heavier ships are more stable", "It depends only on the ship's speed"],
   S`The ship floats when the buoyant force equals the total weight: $F_B = \rho_{water}gV_{displaced} = mg$. More cargo gives a larger $m$, so $V_{displaced}$ must increase, and the ship sits deeper.`],
  ["Et U-rørmanometer fylt med kvikksølv ($\\rho = 13600$ kg/m³) viser en høydeforskjell på 15 cm mellom de to grenene. Hva er trykkforskjellen?",
   { n: 20.0124, tol: 0.2, u: "kPa" },
   S`$\Delta p = \rho g\,\Delta h = 13600\cdot 9{,}81\cdot 0{,}15 \approx 20012$ Pa $\approx 20{,}0$ kPa.`,
   "A U-tube manometer filled with mercury ($\\rho = 13600$ kg/m³) shows a height difference of 15 cm between the two legs. What is the pressure difference?",
   null,
   S`$\Delta p = \rho g\,\Delta h = 13600\cdot 9.81\cdot 0.15 \approx 20012$ Pa $\approx 20.0$ kPa.`]
]);

GEN("FLUID", 0,
 () => { const rhoO = R.p([600, 700, 750, 800, 850, 900, 917, 950]), fl = R.p([["ferskvann", 1000, "fresh water"], ["sjøvann", 1025, "seawater"]]), frac = rhoO / fl[1] * 100;
   return [T(S`Et flytende legeme har tetthet ${rhoO} kg/m³ og flyter i ${fl[0]} ($\rho = ${fl[1]}$ kg/m³). Hvor stor prosentandel av volumet er under overflaten?`,
             S`A floating body has a density of ${rhoO} kg/m³ and floats in ${fl[2]} ($\rho = ${fl[1]}$ kg/m³). What percentage of its volume is below the surface?`),
     { n: frac, tol: rel(frac), u: "%" },
     T(S`Flyting: $\rho_{legeme}Vg = \rho_{væske}V_{under}g$, så $V_{under}/V = \rho_{legeme}/\rho_{væske} = ${rhoO}/${fl[1]} \approx ${mf(frac / 100, 3)} = ${mf(frac, 1)}$ %.`,
       S`Floating: $\rho_{body}Vg = \rho_{fluid}V_{under}g$, so $V_{under}/V = \rho_{body}/\rho_{fluid} = ${rhoO}/${fl[1]} \approx ${mf(frac / 100, 3)} = ${mf(frac, 1)}$ %.`)]; },
 () => { let dh, patm = 101.3, p, g = 0;
   do { dh = R.i(50, 400); p = patm + 13600 * G_ * (dh / 1000) / 1000; } while ((p < 110 || p > 400) && ++g < 200);
   return [T(S`Et U-rørmanometer med kvikksølv ($\rho = 13600$ kg/m³) er koblet til en trykktank. Den åpne grenen står ${dh} mm lavere enn grenen mot tanken. Atmosfæretrykket er ${nf(patm, 1)} kPa. Hva er det absolutte trykket i tanken?`,
             S`A U-tube mercury manometer ($\rho = 13600$ kg/m³) is connected to a pressurized tank. The open leg stands ${dh} mm lower than the leg connected to the tank. Atmospheric pressure is ${nf(patm, 1)} kPa. What is the absolute pressure in the tank?`),
     { n: p, tol: rel(p), u: "kPa" },
     T(S`Trykkforskjell: $\Delta p = \rho g\,\Delta h = 13600\cdot 9{,}81\cdot ${mf(dh / 1000, 3)} \approx ${mf(13600 * G_ * (dh / 1000) / 1000)}$ kPa. Absolutt trykk i tanken: $p = p_{atm} + \Delta p = ${mf(patm, 1)} + ${mf(13600 * G_ * (dh / 1000) / 1000)} \approx ${mf(p)}$ kPa.`,
       S`Pressure difference: $\Delta p = \rho g\,\Delta h = 13600\cdot 9.81\cdot ${mf(dh / 1000, 3)} \approx ${mf(13600 * G_ * (dh / 1000) / 1000)}$ kPa. Absolute pressure in the tank: $p = p_{atm} + \Delta p = ${mf(patm, 1)} + ${mf(13600 * G_ * (dh / 1000) / 1000)} \approx ${mf(p)}$ kPa.`)]; }
);

THEORY("FLUID", 1, {
nb: S`## Hva handler det om?
Når en væske strømmer gjennom et rør som endrer tverrsnitt, må den øke farten der røret er trangt, for at like mye volum skal passere per sekund overalt (kontinuitet). Bernoullis ligning utvider dette til en energibalanse langs en strømlinje: trykk, fart og høyde kan omdannes til hverandre, men summen er konstant når det ikke er tap.

Disse to sammenhengene er grunnlaget for å dimensjonere rørsystemer, forstå strømningsmålere (venturimeter, pitotrør) og analysere alt fra vannforsyning til flyvinger.

## Begreper og formler
- Volumstrøm: $Q = Av$ (m³/s), konstant langs et rør uten forgreninger: $A_1v_1 = A_2v_2$.
- Massestrøm: $\dot m = \rho Av$ (kg/s), konstant selv om væsken er kompressibel.
- Bernoullis ligning (stasjonær, friksjonsfri, inkompressibel strømning langs en strømlinje): $p + \tfrac12\rho v^2 + \rho gz = \text{konstant}$.
- Statisk trykk $p$, dynamisk trykk $\tfrac12\rho v^2$ og stagnasjonstrykk $p + \tfrac12\rho v^2$ (trykket der farten bremses til null).
- Torricellis lov (utstrømning fra en tank): $v = \sqrt{2gh}$.
- Pitotrør: måler farten fra trykkforskjellen mellom stagnasjon og statisk trykk, $v = \sqrt{2\Delta p/\rho}$.
- I den utvidede energiligningen legges pumpearbeid og tap til for å ta hensyn til virkelige rørsystemer.

## Slik løser du oppgavene
1. Tegn opp punkt 1 og 2 langs strømlinjen, og skriv opp hva du vet om areal, fart, trykk og høyde i hvert punkt.
2. Bruk kontinuitet til å koble sammen farten i de to punktene hvis arealet endres.
3. Sett opp Bernoullis ligning mellom punktene, og stryk ledd som er like eller null (f.eks. samme høyde).
4. Løs for den ukjente størrelsen, og sjekk at trykket ikke blir urealistisk negativt.

### Eksempel
Vann strømmer i et horisontalt rør med diameter 100 mm og fart 2 m/s. Røret snevres inn til 60 mm. Hva er trykkfallet over innsnevringen?

1. Kontinuitet: $v_2 = v_1(d_1/d_2)^2 = 2\cdot(100/60)^2 \approx 5{,}56$ m/s.
2. Bernoulli (samme høyde): $p_1 - p_2 = \tfrac12\rho(v_2^2 - v_1^2) = \tfrac12\cdot 1000\cdot(5{,}56^2 - 2^2) \approx 13{,}4$ kPa.

Svar: Trykket faller med omtrent 13,4 kPa i innsnevringen.

## Vanlige feil
- Å bruke Bernoulli over et punkt der det er tap (ventil, bend) eller en pumpe uten å legge til de leddene.
- Å glemme høydeleddet $\rho gz$ når rørets høyde endrer seg.
- Å blande statisk trykk og stagnasjonstrykk.
- Å sette inn diameter i stedet for areal (husk $A = \pi d^2/4$) i kontinuitetsligningen.

> Kontinuitet: $A_1v_1 = A_2v_2$. Bernoulli: $p + \tfrac12\rho v^2 + \rho gz = $ konstant. Der farten øker, synker trykket.`,
en: S`## What is it about?
When a fluid flows through a pipe whose cross-section changes, it must speed up where the pipe is narrow, so that the same volume passes every point each second (continuity). Bernoulli's equation extends this to an energy balance along a streamline: pressure, speed and height can convert into one another, but their sum stays constant when there are no losses.

These two relationships are the foundation for sizing piping systems, understanding flow meters (venturi meters, Pitot tubes) and analyzing everything from water supply to aircraft wings.

## Key quantities and formulas
- Volumetric flow rate: $Q = Av$ (m³/s), constant along a pipe with no branches: $A_1v_1 = A_2v_2$.
- Mass flow rate: $\dot m = \rho Av$ (kg/s), constant even if the fluid is compressible.
- Bernoulli's equation (steady, frictionless, incompressible flow along a streamline): $p + \tfrac12\rho v^2 + \rho gz = \text{constant}$.
- Static pressure $p$, dynamic pressure $\tfrac12\rho v^2$ and stagnation pressure $p + \tfrac12\rho v^2$ (the pressure where the flow is brought to rest).
- Torricelli's law (outflow from a tank): $v = \sqrt{2gh}$.
- Pitot tube: measures the speed from the pressure difference between the stagnation and static pressure, $v = \sqrt{2\Delta p/\rho}$.
- The extended energy equation adds pump work and losses to account for real piping systems.

## How to solve the problems
1. Mark point 1 and point 2 along the streamline, and write down what you know about area, speed, pressure and height at each one.
2. Use continuity to relate the speeds at the two points if the area changes.
3. Set up Bernoulli's equation between the points, and cancel terms that are equal or zero (e.g. the same height).
4. Solve for the unknown quantity, and check that the pressure does not become unrealistically negative.

### Example
Water flows in a horizontal pipe with a diameter of 100 mm and a speed of 2 m/s. The pipe narrows to 60 mm. What is the pressure drop across the constriction?

1. Continuity: $v_2 = v_1(d_1/d_2)^2 = 2\cdot(100/60)^2 \approx 5.56$ m/s.
2. Bernoulli (same height): $p_1 - p_2 = \tfrac12\rho(v_2^2 - v_1^2) = \tfrac12\cdot 1000\cdot(5.56^2 - 2^2) \approx 13.4$ kPa.

Answer: The pressure drops by about 13.4 kPa across the constriction.

## Common mistakes
- Applying Bernoulli's equation across a point with losses (a valve, a bend) or a pump without adding those terms.
- Forgetting the elevation term $\rho gz$ when the height of the pipe changes.
- Mixing up static pressure and stagnation pressure.
- Using the diameter instead of the area (remember $A = \pi d^2/4$) in the continuity equation.

> Continuity: $A_1v_1 = A_2v_2$. Bernoulli: $p + \tfrac12\rho v^2 + \rho gz = $ constant. Where the speed increases, the pressure drops.`
});

BIQ("FLUID", 1, [
  ["Hva skjer med farten i et rør der tverrsnittsarealet dobles (samme volumstrøm)?",
   ["Den halveres", "Den dobles", "Den firedobles", "Den er uendret"],
   S`Kontinuitet: $A_1v_1 = A_2v_2$, så $v \propto 1/A$. Dobbelt så stort areal gir halvparten så stor fart.`,
   "What happens to the velocity in a pipe where the cross-sectional area is doubled (same volumetric flow rate)?",
   ["It is halved", "It doubles", "It quadruples", "It is unchanged"],
   S`Continuity: $A_1v_1 = A_2v_2$, so $v \propto 1/A$. Twice the area gives half the velocity.`],
  ["Hva skjer med det statiske trykket når vann strømmer oppover i et loddrett rør med konstant tverrsnitt (ingen tap)?",
   ["Det synker, fordi potensiell energi øker på bekostning av trykkenergi", "Det er uendret, fordi farten er konstant", "Det øker, fordi vannet må presses oppover", "Det avhenger bare av temperaturen"],
   S`Bernoulli med høydeledd: $p + \tfrac12\rho v^2 + \rho gz = $ konstant. Når $v$ er konstant (samme areal) og $z$ øker, må $p$ synke tilsvarende $\rho g\,\Delta z$.`,
   "What happens to the static pressure when water flows upward in a vertical pipe of constant cross-section (no losses)?",
   ["It drops, because potential energy increases at the expense of pressure energy", "It is unchanged, because the speed is constant", "It increases, because the water must be pushed upward", "It depends only on the temperature"],
   S`Bernoulli with the elevation term: $p + \tfrac12\rho v^2 + \rho gz = $ constant. When $v$ is constant (same area) and $z$ increases, $p$ must drop by $\rho g\,\Delta z$.`],
  ["Et venturimeter i et vannrør snevrer inn fra 150 mm til 75 mm. Trykkforskjellen mellom det vide og det trange tverrsnittet er 5 kPa. Hva er farten i det trange tverrsnittet (samme høyde, ingen tap)?",
   { n: 3.265986323710904, tol: 0.033, u: "m/s" },
   S`Kontinuitet gir $v_1 = v_2(d_2/d_1)^2 = 0{,}25v_2$. Bernoulli: $\Delta p = \tfrac12\rho(v_2^2 - v_1^2) = \tfrac12\rho v_2^2(1 - 0{,}25^2) = 0{,}46875\rho v_2^2$. Med $\Delta p = 5000$ Pa og $\rho = 1000$ kg/m³: $v_2 = \sqrt{5000/(0{,}46875\cdot 1000)} \approx 3{,}27$ m/s.`,
   "A venturi meter in a water pipe narrows from 150 mm to 75 mm. The pressure difference between the wide and the narrow section is 5 kPa. What is the velocity in the narrow section (same height, no losses)?",
   null,
   S`Continuity gives $v_1 = v_2(d_2/d_1)^2 = 0.25v_2$. Bernoulli: $\Delta p = \tfrac12\rho(v_2^2 - v_1^2) = \tfrac12\rho v_2^2(1 - 0.25^2) = 0.46875\rho v_2^2$. With $\Delta p = 5000$ Pa and $\rho = 1000$ kg/m³: $v_2 = \sqrt{5000/(0.46875\cdot 1000)} \approx 3.27$ m/s.`]
]);

GEN("FLUID", 1,
 () => { const fl = R.p([["ferskvann", 1000, "fresh water"], ["sjøvann", 1025, "seawater"], ["olje", 880, "oil"]]), D = R.p([25, 40, 50, 80, 100, 150]), v = R.f(0.5, 4, 0.5), A = Math.PI / 4 * (D / 1000) ** 2, mdot = fl[1] * A * v;
   return [T(S`Et rør med diameter ${D} mm fører ${fl[0]} ($\rho = ${fl[1]}$ kg/m³) med farten ${nf(v)} m/s. Hva er massestrømmen?`,
             S`A pipe with a diameter of ${D} mm carries ${fl[2]} ($\rho = ${fl[1]}$ kg/m³) at a speed of ${nf(v)} m/s. What is the mass flow rate?`),
     { n: mdot, tol: rel(mdot), u: "kg/s" },
     S`$\dot m = \rho Av = ${fl[1]}\cdot \dfrac{\pi}{4}\cdot ${mf(D / 1000, 3)}^2\cdot ${mf(v)} \approx ${mf(mdot, 3)}$ kg/s.`]; },
 () => { let D1, D2, v1, p1, dz, v2, p2, g = 0;
   do { D1 = R.p([80, 100, 120, 150]); D2 = D1 * R.p([0.6, 0.7, 0.8, 1.2, 1.3]); v1 = R.f(0.5, 2.5, 0.5); p1 = R.p([150, 200, 250, 300, 350]); dz = R.f(1, 8, 0.5);
     v2 = v1 * (D1 / D2) ** 2; p2 = p1 + (0.5 * 1000 * (v1 * v1 - v2 * v2) - 1000 * G_ * dz) / 1000; } while ((p2 < 30 || p2 > p1 * 1.3) && ++g < 300);
   return [T(S`Vann strømmer med ${nf(v1)} m/s og trykk ${p1} kPa i et rør med diameter ${D1} mm. Røret stiger ${nf(dz)} m og endrer diameter til ${mf(D2, 0)} mm. Hva er trykket i det nye punktet (ingen tap)?`,
             S`Water flows at ${nf(v1)} m/s with a pressure of ${p1} kPa in a pipe with a diameter of ${D1} mm. The pipe rises ${nf(dz)} m and changes diameter to ${mf(D2, 0)} mm. What is the pressure at the new point (no losses)?`),
     { n: p2, tol: rel(p2), u: "kPa" },
     T(S`Kontinuitet: $v_2 = v_1(d_1/d_2)^2 = ${mf(v1)}\cdot(${D1}/${mf(D2, 0)})^2 \approx ${mf(v2)}$ m/s. Bernoulli med høydeledd: $p_2 = p_1 + \tfrac12\rho(v_1^2 - v_2^2) - \rho g\,\Delta z = ${p1} + ${mf(0.5 * 1000 * (v1 * v1 - v2 * v2) / 1000)} - ${mf(1000 * G_ * dz / 1000)} \approx ${mf(p2)}$ kPa.`,
       S`Continuity: $v_2 = v_1(d_1/d_2)^2 = ${mf(v1)}\cdot(${D1}/${mf(D2, 0)})^2 \approx ${mf(v2)}$ m/s. Bernoulli with the elevation term: $p_2 = p_1 + \tfrac12\rho(v_1^2 - v_2^2) - \rho g\,\Delta z = ${p1} + ${mf(0.5 * 1000 * (v1 * v1 - v2 * v2) / 1000)} - ${mf(1000 * G_ * dz / 1000)} \approx ${mf(p2)}$ kPa.`)]; }
);

THEORY("FLUID", 2, {
nb: S`## Hva handler det om?
I et virkelig rør er det friksjon mellom væsken og veggen, og strømningen kan være rolig og ordnet (laminær) eller kaotisk med virvler (turbulent). Reynoldstallet forteller deg hvilken type strømning du har, og friksjonsfaktoren $f$ forteller hvor mye trykk du taper på grunn av friksjon langs røret.

For en ingeniør er dette avgjørende for å dimensjonere pumper og rørledninger riktig: for liten diameter eller for lang rørstrekning gir store trykktap og krever mer pumpeeffekt enn nødvendig.

## Begreper og formler
- Reynoldstall: $Re = \rho vD/\mu$ (dimensjonsløst). Laminær strømning under ca. 2300, turbulent over ca. 4000, og et overgangsområde imellom.
- No-slip-betingelse: fluidet har samme fart som veggen der det er i kontakt med den, noe som skaper et grensesjikt.
- Darcy–Weisbachs ligning for friksjonstap: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g}$ (m), der $f$ avhenger av $Re$ og relativ ruhet.
- For laminær strømning: $f = 64/Re$. For turbulent strømning finner du $f$ fra Moody-diagrammet eller Colebrook-ligningen; ruere rør gir høyere $f$.
- Singulærtap (lokaltap) i ventiler, bend og innsnevringer: $h_{lok} = K\dfrac{v^2}{2g}$, med tapskoeffisienten $K$ fra tabell.
- Pumpeeffekt for å overvinne et tap: $P = \rho gQh_f$ (W), med volumstrøm $Q$ i m³/s.

## Slik løser du oppgavene
1. Regn ut Reynoldstallet for å avgjøre om strømningen er laminær eller turbulent.
2. Finn friksjonsfaktoren: $64/Re$ hvis laminær, ellers fra oppgitt verdi eller Moody-diagrammet.
3. Sett inn i Darcy–Weisbach for friksjonstapet, og legg til eventuelle singulærtap.
4. Ved pumpeeffekt: gang det totale tapet (i meter) med $\rho g$ og volumstrømmen.

### Eksempel
Vann ($\rho = 1000$ kg/m³, $\mu = 10^{-3}$ Pa·s) strømmer med 1,5 m/s i et rør med diameter 30 mm og lengde 20 m. Friksjonsfaktoren er $f = 0{,}027$. Hvor stort er friksjonstapet?

1. Reynoldstall (til kontroll): $Re = \rho vD/\mu = 1000\cdot 1{,}5\cdot 0{,}03/10^{-3} = 45000$ – turbulent, så en oppgitt $f$ er fornuftig.
2. Darcy–Weisbach: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g} = 0{,}027\cdot\dfrac{20}{0{,}03}\cdot\dfrac{1{,}5^2}{2\cdot 9{,}81} \approx 2{,}06$ m.

Svar: Friksjonstapet er omtrent 2,06 m væskesøyle.

## Vanlige feil
- Å bruke $f = 64/Re$ for turbulent strømning; den formelen gjelder bare laminær strømning.
- Å blande diameter og radius i $Re$ og Darcy–Weisbach.
- Å glemme singulærtapene og bare regne med friksjon i selve røret.
- Å bruke feil enhet for $\mu$ (Pa·s, ikke cP, uten å gjøre om).

> $Re = \rho vD/\mu$: under 2300 laminær, over 4000 turbulent. Friksjonstap: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g}$.`,
en: S`## What is it about?
In a real pipe there is friction between the fluid and the wall, and the flow can be smooth and orderly (laminar) or chaotic with eddies (turbulent). The Reynolds number tells you which type of flow you have, and the friction factor $f$ tells you how much pressure you lose to friction along the pipe.

For an engineer this is crucial for correctly sizing pumps and pipelines: too small a diameter or too long a pipe run gives large pressure losses and requires more pump power than necessary.

## Key quantities and formulas
- Reynolds number: $Re = \rho vD/\mu$ (dimensionless). Laminar flow below about 2300, turbulent above about 4000, with a transitional range in between.
- No-slip condition: the fluid has the same speed as the wall where it is in contact with it, which creates a boundary layer.
- Darcy–Weisbach equation for friction loss: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g}$ (m), where $f$ depends on $Re$ and the relative roughness.
- For laminar flow: $f = 64/Re$. For turbulent flow you find $f$ from the Moody chart or the Colebrook equation; a rougher pipe gives a higher $f$.
- Minor (local) losses in valves, bends and constrictions: $h_{minor} = K\dfrac{v^2}{2g}$, with the loss coefficient $K$ from a table.
- Pump power to overcome a loss: $P = \rho gQh_f$ (W), with the volumetric flow rate $Q$ in m³/s.

## How to solve the problems
1. Compute the Reynolds number to decide whether the flow is laminar or turbulent.
2. Find the friction factor: $64/Re$ if laminar, otherwise from a given value or the Moody chart.
3. Substitute into Darcy–Weisbach for the friction loss, and add any minor losses.
4. For pump power: multiply the total loss (in meters) by $\rho g$ and the volumetric flow rate.

### Example
Water ($\rho = 1000$ kg/m³, $\mu = 10^{-3}$ Pa·s) flows at 1.5 m/s in a pipe with a diameter of 30 mm and a length of 20 m. The friction factor is $f = 0.027$. How large is the friction loss?

1. Reynolds number (as a check): $Re = \rho vD/\mu = 1000\cdot 1.5\cdot 0.03/10^{-3} = 45000$ – turbulent, so a given $f$ makes sense.
2. Darcy–Weisbach: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g} = 0.027\cdot\dfrac{20}{0.03}\cdot\dfrac{1.5^2}{2\cdot 9.81} \approx 2.06$ m.

Answer: The friction loss is about 2.06 m of fluid column.

## Common mistakes
- Using $f = 64/Re$ for turbulent flow; that formula only applies to laminar flow.
- Mixing up diameter and radius in $Re$ and Darcy–Weisbach.
- Forgetting the minor losses and only accounting for friction in the pipe itself.
- Using the wrong unit for $\mu$ (Pa·s, not cP, without converting).

> $Re = \rho vD/\mu$: below 2300 laminar, above 4000 turbulent. Friction loss: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g}$.`
});

BIQ("FLUID", 2, [
  ["Hva skjer med friksjonsfaktoren $f$ hvis røret byttes ut med et ruere rør (høyere relativ ruhet), ved samme Reynoldstall i turbulent strømning?",
   ["Den øker", "Den minker", "Den er uendret", "Det avhenger bare av rørets diameter"],
   S`Moody-diagrammet viser at $f$ i turbulent strømning øker med relativ ruhet ved gitt $Re$. I laminær strømning ($f = 64/Re$) spiller ruhet derimot ingen rolle.`,
   "What happens to the friction factor $f$ if the pipe is replaced with a rougher one (higher relative roughness), at the same Reynolds number in turbulent flow?",
   ["It increases", "It decreases", "It is unchanged", "It depends only on the pipe diameter"],
   S`The Moody chart shows that $f$ in turbulent flow increases with relative roughness at a given $Re$. In laminar flow ($f = 64/Re$), on the other hand, roughness plays no role.`],
  ["Et rør skiftes ut med et nytt rør med dobbelt så stor diameter, mens volumstrømmen holdes uendret og friksjonsfaktoren $f$ regnes som omtrent konstant. Hva skjer med friksjonstapet $h_f$?",
   ["Det blir omtrent 32 ganger mindre", "Det blir 2 ganger mindre", "Det blir 4 ganger mindre", "Det er uendret fordi $f$ er konstant"],
   S`Kontinuitet gir $v \propto 1/D^2$ ved konstant $Q$. Darcy–Weisbach gir $h_f \propto v^2/D \propto D^{-4}/D = D^{-5}$. Dobbelt så stor diameter gir dermed $2^5 = 32$ ganger mindre friksjonstap.`,
   "A pipe is replaced with a new one with twice the diameter, while the volumetric flow rate is kept unchanged and the friction factor $f$ is taken to be roughly constant. What happens to the friction loss $h_f$?",
   ["It becomes about 32 times smaller", "It becomes 2 times smaller", "It becomes 4 times smaller", "It is unchanged because $f$ is constant"],
   S`Continuity gives $v \propto 1/D^2$ at constant $Q$. Darcy–Weisbach gives $h_f \propto v^2/D \propto D^{-4}/D = D^{-5}$. Twice the diameter therefore gives a $2^5 = 32$ times smaller friction loss.`],
  ["Vann ($\\rho = 1000$ kg/m³, $\\mu = 1{,}0\\cdot10^{-3}$ Pa·s) strømmer med 1,2 m/s i et rør med indre diameter 40 mm. Hva er Reynoldstallet?",
   { n: 48000, tol: 480, u: "" },
   S`$Re = \rho vD/\mu = 1000\cdot 1{,}2\cdot 0{,}04/(1{,}0\cdot10^{-3}) = 48000$.`,
   "Water ($\\rho = 1000$ kg/m³, $\\mu = 1.0\\cdot10^{-3}$ Pa·s) flows at 1.2 m/s in a pipe with an internal diameter of 40 mm. What is the Reynolds number?",
   null,
   S`$Re = \rho vD/\mu = 1000\cdot 1.2\cdot 0.04/(1.0\cdot10^{-3}) = 48000$.`]
]);

GEN("FLUID", 2,
 () => { const K = R.p([0.2, 0.5, 0.9, 1.5, 2, 5, 10]), v = R.f(0.3, 4, 0.1), h = K * v * v / (2 * G_);
   return [T(S`En ventil har tapskoeffisienten $K = ${mf(K)}$. Farten i røret er ${nf(v)} m/s. Hvor stort er singulærtapet over ventilen?`,
             S`A valve has a loss coefficient of $K = ${mf(K)}$. The velocity in the pipe is ${nf(v)} m/s. How large is the minor loss across the valve?`),
     { n: h, tol: rel(h), u: "m" },
     S`$h_{lok} = K\dfrac{v^2}{2g} = ${mf(K)}\cdot\dfrac{${mf(v)}^2}{2\cdot 9{,}81} \approx ${mf(h, 3)}$ m.`]; },
 () => { const QLs = R.f(1, 15, 0.5), D = R.p([40, 50, 65, 80, 100]), L = R.i(20, 300), f = R.p([0.02, 0.022, 0.025, 0.028, 0.03]);
   const Q = QLs / 1000, A = Math.PI / 4 * (D / 1000) ** 2, v = Q / A, hf = f * (L / (D / 1000)) * v * v / (2 * G_), P = 1000 * G_ * Q * hf / 1000;
   return [T(S`En pumpe skal levere ${nf(QLs)} L/s vann gjennom et rør med diameter ${D} mm og lengde ${L} m. Friksjonsfaktoren er $f = ${mf(f)}$. Hvor stor hydraulisk pumpeeffekt trengs for å overvinne friksjonstapet?`,
             S`A pump must deliver ${nf(QLs)} L/s of water through a pipe with a diameter of ${D} mm and a length of ${L} m. The friction factor is $f = ${mf(f)}$. How much hydraulic pump power is needed to overcome the friction loss?`),
     { n: P, tol: rel(P), u: "kW" },
     T(S`Fart: $v = Q/A = ${mf(Q, 5)}/\dfrac{\pi}{4}${mf(D / 1000, 3)}^2 \approx ${mf(v)}$ m/s. Friksjonstap: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g} = ${mf(f)}\cdot\dfrac{${L}}{${mf(D / 1000, 3)}}\cdot\dfrac{${mf(v)}^2}{2\cdot 9{,}81} \approx ${mf(hf)}$ m. Pumpeeffekt: $P = \rho gQh_f = 1000\cdot 9{,}81\cdot ${mf(Q, 5)}\cdot ${mf(hf)} \approx ${mf(P)}$ kW.`,
       S`Velocity: $v = Q/A = ${mf(Q, 5)}/\dfrac{\pi}{4}${mf(D / 1000, 3)}^2 \approx ${mf(v)}$ m/s. Friction loss: $h_f = f\dfrac{L}{D}\dfrac{v^2}{2g} = ${mf(f)}\cdot\dfrac{${L}}{${mf(D / 1000, 3)}}\cdot\dfrac{${mf(v)}^2}{2\cdot 9.81} \approx ${mf(hf)}$ m. Pump power: $P = \rho gQh_f = 1000\cdot 9.81\cdot ${mf(Q, 5)}\cdot ${mf(hf)} \approx ${mf(P)}$ kW.`)]; }
);

})();
