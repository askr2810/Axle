// ============================================================
//  add_mech2.js – teori, faste oppgaver og generatorer for
//  SVING (Maskindynamikk og svingninger) og VARME (Varmeoverføring)
// ============================================================
(() => {

// ================= SVING – enhet 0: Frie svingninger =================
THEORY("SVING", 0, {
nb: `## Hva handler det om?
Frie svingninger er bevegelsen et system får når det forstyrres fra likevekt og deretter får svinge uten noen ny, ytre kraft. Et masse–fjær-system, en bjelke som dirrer etter et slag, eller en aksel med et svinghjul er typiske eksempler. Som ingeniør trenger du å vite egenfrekvensen til en konstruksjon, for hvis den treffes av en last med samme frekvens, kan svingningene bli farlig store (resonans, se neste enhet). Denne enheten gir verktøyene for å finne egenfrekvensen og beskrive selve svingebevegelsen.

## Begreper og formler
Bevegelsesligningen for et udempet masse–fjær-system er
$$m\\ddot x + kx = 0$$
- Egenvinkelfrekvens: $\\omega_n = \\sqrt{k/m}$ (rad/s). Egenfrekvens i Hz: $f_n = \\omega_n/(2\\pi)$. Periodetid: $T = 1/f_n = 2\\pi/\\omega_n$.
- Løsningen er harmonisk: $x(t) = X\\cos(\\omega_nt - \\varphi)$, der $X$ er amplituden og $\\varphi$ fasevinkelen, bestemt av startbetingelsene $x(0)$ og $\\dot x(0)$.
- Maksimal fart og akselerasjon: $\\dot x_{maks} = X\\omega_n$ og $\\ddot x_{maks} = X\\omega_n^2$.
- Fjærer i parallell: $k_{tot} = k_1 + k_2$. Fjærer i serie: $1/k_{tot} = 1/k_1 + 1/k_2$.
- Torsjonssvingning: $\\omega_n = \\sqrt{k_t/J}$, der $k_t$ er torsjonsstivheten (Nm/rad) og $J$ treghetsmomentet (kgm²) om aksen.
- Fra statisk nedbøyning $\\delta$ (fjæra tøyes av tyngden): $k\\delta = mg$, så $\\omega_n = \\sqrt{g/\\delta}$.
- Perioden er uavhengig av amplituden i en lineær (harmonisk) svingning – det er selve poenget med «harmonisk».

## Slik løser du oppgavene
1. Finn den ekvivalente stivheten $k$ (legg sammen parallelle fjærer, kombiner serie-fjærer) eller torsjonsstivheten $k_t$.
2. Sett opp $\\omega_n = \\sqrt{k/m}$ (eller $\\sqrt{k_t/J}$, eller $\\sqrt{g/\\delta}$ fra statisk nedbøyning).
3. Regn om til $f_n$ eller $T$ etter hva oppgaven spør om.
4. Trenger du fart eller akselerasjon i svingningen, bruk $X\\omega_n$ og $X\\omega_n^2$ med den oppgitte amplituden.
5. Sjekk at enhetene stemmer: $k$ i N/m og $m$ i kg gir $\\omega_n$ i rad/s.

### Eksempel
En maskin på 80 kg står på fire fjærer i parallell, hver med stivhet 3000 N/m. Den svinger med amplitude 5 mm. Finn egenfrekvensen i Hz og maksimal akselerasjon.
1. Total stivhet: $k = 4\\cdot 3000 = 12000$ N/m.
2. $\\omega_n = \\sqrt{12000/80} = \\sqrt{150} \\approx 12{,}25$ rad/s.
3. $f_n = \\omega_n/(2\\pi) \\approx 1{,}95$ Hz.
4. $\\ddot x_{maks} = X\\omega_n^2 = 0{,}005\\cdot 150 = 0{,}75$ m/s².

Svar: $f_n \\approx 1{,}95$ Hz og $\\ddot x_{maks} \\approx 0{,}75$ m/s².

## Vanlige feil
- Å blande $\\omega_n$ (rad/s) og $f_n$ (Hz) – husk faktoren $2\\pi$.
- Å tro at fjærer i serie gir samme formel som i parallell (det er omvendt av elektriske motstander).
- Å tro at amplituden påvirker egenfrekvensen. Den gjør den ikke i en lineær svingning.
- Å bruke massen i kg når stivheten er oppgitt i kN/m uten å regne om.
- Å glemme at $\\delta$ (statisk nedbøyning) må måles i samme retning som fjærkraften virker.

> Egenfrekvensen avhenger bare av stivhet og masse (eller treghetsmoment), aldri av hvor stort utslaget er.`,
en: `## What is it about?
Free vibration is the motion a system performs when it is disturbed from equilibrium and then left to oscillate without any further external force. A mass–spring system, a beam that shudders after being struck, or a shaft with a flywheel are typical examples. As an engineer you need to know a structure's natural frequency, because if it is hit by a load at the same frequency the vibrations can grow dangerously large (resonance, covered in the next unit). This unit gives you the tools to find the natural frequency and describe the vibration itself.

## Concepts and formulas
The equation of motion for an undamped mass–spring system is
$$m\\ddot x + kx = 0$$
- Natural angular frequency: $\\omega_n = \\sqrt{k/m}$ (rad/s). Natural frequency in Hz: $f_n = \\omega_n/(2\\pi)$. Period: $T = 1/f_n = 2\\pi/\\omega_n$.
- The solution is harmonic: $x(t) = X\\cos(\\omega_nt - \\varphi)$, where $X$ is the amplitude and $\\varphi$ the phase angle, both set by the initial conditions $x(0)$ and $\\dot x(0)$.
- Maximum velocity and acceleration: $\\dot x_{max} = X\\omega_n$ and $\\ddot x_{max} = X\\omega_n^2$.
- Springs in parallel: $k_{tot} = k_1 + k_2$. Springs in series: $1/k_{tot} = 1/k_1 + 1/k_2$.
- Torsional vibration: $\\omega_n = \\sqrt{k_t/J}$, where $k_t$ is the torsional stiffness (Nm/rad) and $J$ the mass moment of inertia (kgm²) about the axis.
- From the static deflection $\\delta$ (the spring stretched by the weight): $k\\delta = mg$, so $\\omega_n = \\sqrt{g/\\delta}$.
- The period is independent of the amplitude in a linear (harmonic) vibration – that is the whole point of calling it "harmonic".

## How to solve the problems
1. Find the equivalent stiffness $k$ (add parallel springs, combine series springs) or the torsional stiffness $k_t$.
2. Set up $\\omega_n = \\sqrt{k/m}$ (or $\\sqrt{k_t/J}$, or $\\sqrt{g/\\delta}$ from the static deflection).
3. Convert to $f_n$ or $T$ as the problem asks.
4. If you need velocity or acceleration in the vibration, use $X\\omega_n$ and $X\\omega_n^2$ with the given amplitude.
5. Check the units: $k$ in N/m and $m$ in kg give $\\omega_n$ in rad/s.

### Example
A machine of 80 kg rests on four springs in parallel, each with a stiffness of 3000 N/m. It vibrates with an amplitude of 5 mm. Find the natural frequency in Hz and the maximum acceleration.
1. Total stiffness: $k = 4\\cdot 3000 = 12000$ N/m.
2. $\\omega_n = \\sqrt{12000/80} = \\sqrt{150} \\approx 12.25$ rad/s.
3. $f_n = \\omega_n/(2\\pi) \\approx 1.95$ Hz.
4. $\\ddot x_{max} = X\\omega_n^2 = 0.005\\cdot 150 = 0.75$ m/s².

Answer: $f_n \\approx 1.95$ Hz and $\\ddot x_{max} \\approx 0.75$ m/s².

## Common mistakes
- Mixing up $\\omega_n$ (rad/s) and $f_n$ (Hz) – remember the factor $2\\pi$.
- Assuming series springs follow the same formula as parallel springs (it is the opposite of electrical resistors).
- Believing the amplitude affects the natural frequency. It does not, in a linear vibration.
- Using the mass in kg when the stiffness is given in kN/m without converting.
- Forgetting that $\\delta$ (static deflection) must be measured along the direction the spring force acts.

> The natural frequency depends only on stiffness and mass (or mass moment of inertia), never on how large the motion is.`
});

BIQ("SVING", 0, [
 ["Hvordan henger periodetiden $T$ sammen med egenfrekvensen $f_n$?",
  ["$T = 1/f_n$", "$T = f_n$", "$T = 2\\pi f_n$", "$T = f_n/2\\pi$"],
  "Periodetiden er tiden for én hel svingning, og det er per definisjon den inverse av frekvensen: $T = 1/f_n = 2\\pi/\\omega_n$.",
  "How is the period $T$ related to the natural frequency $f_n$?",
  ["$T = 1/f_n$", "$T = f_n$", "$T = 2\\pi f_n$", "$T = f_n/2\\pi$"],
  "The period is the time for one complete cycle, and by definition it is the inverse of the frequency: $T = 1/f_n = 2\\pi/\\omega_n$."],
 ["Et masse–fjær-system startes med dobbelt så stort utslag som før (samme $k$ og $m$). Hva skjer med perioden $T$?",
  ["Den er uendret", "Den dobles", "Den halveres", "Den firedobles"],
  "$T = 2\\pi\\sqrt{m/k}$ avhenger bare av $m$ og $k$, ikke av amplituden. Dette er kjennetegnet på en harmonisk (lineær) svingning.",
  "A mass–spring system is started with twice the previous displacement (same $k$ and $m$). What happens to the period $T$?",
  ["It is unchanged", "It doubles", "It is halved", "It quadruples"],
  "$T = 2\\pi\\sqrt{m/k}$ depends only on $m$ and $k$, not on the amplitude. This is the hallmark of a harmonic (linear) vibration."],
 ["To fjærer, $k_1 = 800$ N/m og $k_2 = 1200$ N/m, kobles i parallell og bærer en masse på 25 kg. Systemet svinger med amplitude 20 mm. Hva er maksimal akselerasjon?",
  { n: 1.6, tol: rel(1.6), u: "m/s²" },
  "Parallellkobling: $k_{tot} = k_1+k_2 = 2000$ N/m, så $\\omega_n^2 = k_{tot}/m = 2000/25 = 80$ (rad/s)². Maksimal akselerasjon: $\\ddot x_{maks} = X\\omega_n^2 = 0{,}02\\cdot 80 = 1{,}6$ m/s².",
  "Two springs, $k_1 = 800$ N/m and $k_2 = 1200$ N/m, are connected in parallel and support a mass of 25 kg. The system vibrates with an amplitude of 20 mm. What is the maximum acceleration?",
  null,
  "Parallel combination: $k_{tot} = k_1+k_2 = 2000$ N/m, so $\\omega_n^2 = k_{tot}/m = 2000/25 = 80$ (rad/s)². Maximum acceleration: $\\ddot x_{max} = X\\omega_n^2 = 0.02\\cdot 80 = 1.6$ m/s²."]
]);

GEN("SVING", 0,
 // enkel: maksimal fart fra amplitude og frekvens
 () => { const Xmm = R.f(5, 60, 1), f = R.f(0.5, 8, 0.1);
   const wn = 2 * Math.PI * f, vmax = (Xmm / 1000) * wn;
   return [T(`Et system svinger harmonisk med amplitude ${nf(Xmm)} mm og egenfrekvens ${nf(f)} Hz. Hva er maksimal fart?`,
             `A system vibrates harmonically with an amplitude of ${nf(Xmm)} mm and a natural frequency of ${nf(f)} Hz. What is the maximum velocity?`),
     { n: vmax, tol: rel(vmax), u: "m/s" },
     T(`$\\omega_n = 2\\pi f_n = 2\\pi\\cdot ${mf(f)} \\approx ${mf(wn, 2)}$ rad/s. Maksimal fart: $\\dot x_{maks} = X\\omega_n = ${mf(Xmm / 1000, 4)}\\cdot ${mf(wn, 2)} \\approx ${mf(vmax, 3)}$ m/s.`,
       `$\\omega_n = 2\\pi f_n = 2\\pi\\cdot ${mf(f)} \\approx ${mf(wn, 2)}$ rad/s. Maximum velocity: $\\dot x_{max} = X\\omega_n = ${mf(Xmm / 1000, 4)}\\cdot ${mf(wn, 2)} \\approx ${mf(vmax, 3)}$ m/s.`)]; },
 // eksamen: torsjonssvingning
 () => { const kt = R.f(200, 3000, 50), J = R.f(0.05, 5, 0.05);
   const wn = Math.sqrt(kt / J), fn = wn / (2 * Math.PI);
   return [T(`En aksel med torsjonsstivhet $k_t = ${nf(kt)}$ Nm/rad har et svinghjul med treghetsmoment $J = ${nf(J)}$ kg·m². Hva er egenfrekvensen til torsjonssvingningen, i Hz?`,
             `A shaft with torsional stiffness $k_t = ${nf(kt)}$ Nm/rad carries a flywheel with mass moment of inertia $J = ${nf(J)}$ kg·m². What is the natural frequency of the torsional vibration, in Hz?`),
     { n: fn, tol: rel(fn), u: "Hz" },
     T(`$\\omega_n = \\sqrt{k_t/J} = \\sqrt{${mf(kt)}/${mf(J)}} \\approx ${mf(wn, 2)}$ rad/s, så $f_n = \\omega_n/(2\\pi) \\approx ${mf(fn, 3)}$ Hz.`,
       `$\\omega_n = \\sqrt{k_t/J} = \\sqrt{${mf(kt)}/${mf(J)}} \\approx ${mf(wn, 2)}$ rad/s, so $f_n = \\omega_n/(2\\pi) \\approx ${mf(fn, 3)}$ Hz.`)]; }
);

// ================= SVING – enhet 1: Demping =================
THEORY("SVING", 1, {
nb: `## Hva handler det om?
De fleste virkelige svingesystemer har demping: friksjon, luftmotstand eller en støtdemper tar energi ut av systemet, slik at svingningene dør ut. Demping avgjør om en bilfjæring svinger etter en dump i veien eller returnerer rolig, og om en måleinstrumentviser stiller seg raskt inn eller svinger fram og tilbake lenge. Denne enheten handler om å beskrive og måle demping, og om å forstå hvordan den endrer svingebildet.

## Begreper og formler
Bevegelsesligningen med viskøs demping er
$$m\\ddot x + c\\dot x + kx = 0$$
- Dempingsforhold: $\\zeta = c/c_c$, der kritisk dempingskoeffisient er $c_c = 2\\sqrt{km} = 2m\\omega_n$.
- Tre tilfeller: $\\zeta < 1$ underdempet (svinger, avtagende amplitude), $\\zeta = 1$ kritisk dempet (raskeste retur uten oversving), $\\zeta > 1$ overdempet (returnerer sakte, uten svingning).
- Dempet egenfrekvens (bare for underdempet system): $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$, og dempet periode $T_d = 2\\pi/\\omega_d$.
- Amplituden i en fri, underdempet svingning avtar som $X(t) = X_0e^{-\\zeta\\omega_nt}$ – en eksponentiell omhylningskurve.
- Logaritmisk dekrement mellom to påfølgende topper: $\\delta = \\ln(x_1/x_2)$. Over $n$ perioder: $\\delta = \\dfrac{1}{n}\\ln(x_0/x_n)$. Sammenheng med $\\zeta$: $\\delta = \\dfrac{2\\pi\\zeta}{\\sqrt{1-\\zeta^2}}$, og for små $\\zeta$: $\\zeta \\approx \\delta/(2\\pi)$.
- Tid til amplituden er redusert til en gitt brøkdel: løs $e^{-\\zeta\\omega_nt} = X/X_0$ for $t$.

## Slik løser du oppgavene
1. Finn $\\omega_n$ fra $k$ og $m$ hvis den ikke er oppgitt direkte.
2. Regn $\\zeta$ fra $c$, $c_c$, eller fra amplitudemålinger (logaritmisk dekrement).
3. Avgjør type demping ved å sammenligne $\\zeta$ med 1.
4. Bruk $\\omega_d$ og $T_d$ når du trenger den dempede svingefrekvensen, og eksponentialformelen når du trenger amplituden eller tiden.
5. Kontroller at $\\zeta \\geq 0$ og at underdempet-formlene bare brukes når $\\zeta < 1$.

### Eksempel
Et system har $m = 10$ kg, $k = 4000$ N/m og $c = 80$ Ns/m. Finn dempingsforholdet og den dempede egenfrekvensen.
1. $c_c = 2\\sqrt{km} = 2\\sqrt{4000\\cdot 10} = 2\\sqrt{40000} \\approx 400$ Ns/m.
2. $\\zeta = c/c_c = 80/400 = 0{,}2$.
3. $\\omega_n = \\sqrt{k/m} = \\sqrt{400} = 20$ rad/s.
4. $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2} = 20\\sqrt{1-0{,}04} \\approx 19{,}6$ rad/s.

Svar: $\\zeta = 0{,}2$ (underdempet) og $\\omega_d \\approx 19{,}6$ rad/s.

## Vanlige feil
- Å blande $\\omega_n$ og $\\omega_d$ – de er like bare når $\\zeta$ er svært liten.
- Å bruke den dempede formelen $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ når $\\zeta \\geq 1$ (uttrykket gir da ikke mening – systemet svinger ikke).
- Å tro at kritisk demping betyr at systemet ikke beveger seg i det hele tatt. Det returnerer bare raskest mulig uten å svinge forbi likevekt.
- Å glemme eksponentialleddet og bare bruke den udempede formelen for amplitude.
- Å forveksle logaritmisk dekrement (mellom to topper) med dempingsforholdet $\\zeta$ direkte – sammenhengen går via formelen over.

> Demping bremser og til slutt stopper svingningen. Bruk $\\zeta$ til å avgjøre om systemet svinger i det hele tatt, og eksponentialfunksjonen til å beskrive hvor fort amplituden avtar.`,
en: `## What is it about?
Most real vibrating systems have damping: friction, air resistance or a shock absorber removes energy from the system, so the vibrations die out. Damping decides whether a car's suspension keeps oscillating after a bump in the road or settles down smoothly, and whether an instrument needle settles quickly or swings back and forth for a long time. This unit is about describing and measuring damping, and understanding how it changes the vibration.

## Concepts and formulas
The equation of motion with viscous damping is
$$m\\ddot x + c\\dot x + kx = 0$$
- Damping ratio: $\\zeta = c/c_c$, where the critical damping coefficient is $c_c = 2\\sqrt{km} = 2m\\omega_n$.
- Three cases: $\\zeta < 1$ underdamped (oscillates, decaying amplitude), $\\zeta = 1$ critically damped (fastest return without overshoot), $\\zeta > 1$ overdamped (returns slowly, without oscillating).
- Damped natural frequency (only for an underdamped system): $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$, and damped period $T_d = 2\\pi/\\omega_d$.
- The amplitude of a free, underdamped vibration decays as $X(t) = X_0e^{-\\zeta\\omega_nt}$ – an exponential envelope.
- Logarithmic decrement between two successive peaks: $\\delta = \\ln(x_1/x_2)$. Over $n$ periods: $\\delta = \\dfrac{1}{n}\\ln(x_0/x_n)$. Relation to $\\zeta$: $\\delta = \\dfrac{2\\pi\\zeta}{\\sqrt{1-\\zeta^2}}$, and for small $\\zeta$: $\\zeta \\approx \\delta/(2\\pi)$.
- Time until the amplitude is reduced to a given fraction: solve $e^{-\\zeta\\omega_nt} = X/X_0$ for $t$.

## How to solve the problems
1. Find $\\omega_n$ from $k$ and $m$ if it is not given directly.
2. Compute $\\zeta$ from $c$, $c_c$, or from amplitude measurements (logarithmic decrement).
3. Decide the type of damping by comparing $\\zeta$ with 1.
4. Use $\\omega_d$ and $T_d$ when you need the damped vibration frequency, and the exponential formula when you need the amplitude or the time.
5. Check that $\\zeta \\geq 0$ and that the underdamped formulas are only used when $\\zeta < 1$.

### Example
A system has $m = 10$ kg, $k = 4000$ N/m and $c = 80$ Ns/m. Find the damping ratio and the damped natural frequency.
1. $c_c = 2\\sqrt{km} = 2\\sqrt{4000\\cdot 10} = 2\\sqrt{40000} \\approx 400$ Ns/m.
2. $\\zeta = c/c_c = 80/400 = 0.2$.
3. $\\omega_n = \\sqrt{k/m} = \\sqrt{400} = 20$ rad/s.
4. $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2} = 20\\sqrt{1-0.04} \\approx 19.6$ rad/s.

Answer: $\\zeta = 0.2$ (underdamped) and $\\omega_d \\approx 19.6$ rad/s.

## Common mistakes
- Mixing up $\\omega_n$ and $\\omega_d$ – they are close only when $\\zeta$ is very small.
- Using the damped formula $\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ when $\\zeta \\geq 1$ (the expression is then meaningless – the system does not oscillate).
- Believing critical damping means the system does not move at all. It simply returns as fast as possible without overshooting equilibrium.
- Forgetting the exponential term and using only the undamped amplitude formula.
- Confusing the logarithmic decrement (between two peaks) with the damping ratio $\\zeta$ itself – they are related through the formula above.

> Damping slows down and eventually stops the vibration. Use $\\zeta$ to decide whether the system oscillates at all, and the exponential function to describe how fast the amplitude decays.`
});

BIQ("SVING", 1, [
 ["Hva er definisjonen av dempingsforholdet $\\zeta$?",
  ["$\\zeta = c/c_c$", "$\\zeta = c_c/c$", "$\\zeta = c/m$", "$\\zeta = k/c$"],
  "Dempingsforholdet sammenligner den faktiske dempingskoeffisienten med den kritiske, $c_c = 2\\sqrt{km}$.",
  "What is the definition of the damping ratio $\\zeta$?",
  ["$\\zeta = c/c_c$", "$\\zeta = c_c/c$", "$\\zeta = c/m$", "$\\zeta = k/c$"],
  "The damping ratio compares the actual damping coefficient with the critical one, $c_c = 2\\sqrt{km}$."],
 ["Et underdempet system får økt demping (men er fortsatt underdempet, $\\zeta < 1$). Hva skjer med den dempede egenfrekvensen $\\omega_d$?",
  ["Den avtar", "Den øker", "Den er uendret", "Den blir negativ"],
  "$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ avtar når $\\zeta$ øker, og går mot null når $\\zeta$ nærmer seg 1.",
  "An underdamped system has its damping increased (but remains underdamped, $\\zeta < 1$). What happens to the damped natural frequency $\\omega_d$?",
  ["It decreases", "It increases", "It is unchanged", "It becomes negative"],
  "$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$ decreases as $\\zeta$ increases, approaching zero as $\\zeta$ approaches 1."],
 ["Amplituden i en fri, dempet svingning avtar fra 12 mm til 3 mm i løpet av 5 hele perioder. Hva er dempingsforholdet $\\zeta$?",
  { n: 0.04408, tol: rel(0.04408), u: "" },
  "Logaritmisk dekrement over flere perioder: $\\delta = \\dfrac{1}{5}\\ln(12/3) = \\dfrac{1}{5}\\ln 4 \\approx 0{,}2773$. Da er $\\zeta = \\delta/\\sqrt{4\\pi^2+\\delta^2} \\approx 0{,}0441$.",
  "The amplitude of a free, damped vibration decreases from 12 mm to 3 mm over 5 complete periods. What is the damping ratio $\\zeta$?",
  null,
  "Logarithmic decrement over several periods: $\\delta = \\dfrac{1}{5}\\ln(12/3) = \\dfrac{1}{5}\\ln 4 \\approx 0.2773$. Then $\\zeta = \\delta/\\sqrt{4\\pi^2+\\delta^2} \\approx 0.0441$."]
]);

GEN("SVING", 1,
 // enkel/middels: dempet periodetid
 () => { const wn = R.f(5, 60, 1), z = R.p([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4]);
   const wd = wn * Math.sqrt(1 - z * z), Td = 2 * Math.PI / wd;
   return [T(`Et underdempet system har $\\omega_n = ${nf(wn)}$ rad/s og $\\zeta = ${mf(z)}$. Hva er den dempede periodetiden $T_d$?`,
             `An underdamped system has $\\omega_n = ${nf(wn)}$ rad/s and $\\zeta = ${mf(z)}$. What is the damped period $T_d$?`),
     { n: Td, tol: rel(Td), u: "s" },
     T(`$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2} = ${mf(wn)}\\sqrt{1-${mf(z * z, 4)}} \\approx ${mf(wd, 3)}$ rad/s. Perioden er $T_d = 2\\pi/\\omega_d \\approx ${mf(Td, 4)}$ s.`,
       `$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2} = ${mf(wn)}\\sqrt{1-${mf(z * z, 4)}} \\approx ${mf(wd, 3)}$ rad/s. The period is $T_d = 2\\pi/\\omega_d \\approx ${mf(Td, 4)}$ s.`)]; },
 // eksamen: tid til gitt amplitudereduksjon
 () => { const m = R.f(1, 40, 1), k = R.f(500, 20000, 100), z = R.p([0.02, 0.05, 0.08, 0.1, 0.15, 0.2]), frac = R.p([0.5, 0.25, 0.2, 0.1]);
   const wn = Math.sqrt(k / m), t = -Math.log(frac) / (z * wn);
   return [T(`Et system med $m = ${nf(m)}$ kg og $k = ${nf(k)}$ N/m har dempingsforhold $\\zeta = ${mf(z)}$. Hvor lang tid tar det før amplituden er redusert til ${nf(frac * 100)} % av startverdien?`,
             `A system with $m = ${nf(m)}$ kg and $k = ${nf(k)}$ N/m has a damping ratio of $\\zeta = ${mf(z)}$. How long does it take for the amplitude to fall to ${nf(frac * 100)}% of its initial value?`),
     { n: t, tol: rel(t), u: "s" },
     T(`$\\omega_n = \\sqrt{k/m} \\approx ${mf(wn, 2)}$ rad/s. Omhylningskurven er $X(t) = X_0e^{-\\zeta\\omega_nt}$, så $t = -\\dfrac{\\ln(${mf(frac)})}{\\zeta\\omega_n} \\approx ${mf(t, 2)}$ s.`,
       `$\\omega_n = \\sqrt{k/m} \\approx ${mf(wn, 2)}$ rad/s. The envelope is $X(t) = X_0e^{-\\zeta\\omega_nt}$, so $t = -\\dfrac{\\ln(${mf(frac)})}{\\zeta\\omega_n} \\approx ${mf(t, 2)}$ s.`)]; }
);

// ================= SVING – enhet 2: Tvungne svingninger og isolasjon =================
THEORY("SVING", 2, {
nb: `## Hva handler det om?
Når et svingesystem påvirkes av en periodisk kraft eller bevegelse – fra en ubalansert motor, bølger, eller ujevnheter i veien – kalles det tvungne svingninger. Systemet svinger til slutt med samme frekvens som eksitasjonen, men hvor stort utslaget blir, avhenger sterkt av hvor nær eksitasjonsfrekvensen er egenfrekvensen. Nær resonans kan selv en liten kraft gi enorme utslag, og det er nettopp dette en ingeniør må unngå eller utnytte – enten ved å dempe, ved å flytte egenfrekvensen unna driftsfrekvensen, eller ved å isolere maskinen fra fundamentet.

## Begreper og formler
- Frekvensforhold: $r = \\omega/\\omega_n$, der $\\omega$ er eksitasjonens vinkelfrekvens.

Forsterkningsfaktoren (dynamisk utslag delt på statisk utbøyning $F_0/k$) er
$$M(r,\\zeta) = \\dfrac{1}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}$$
- Ved resonans ($r = 1$) er $M \\approx 1/(2\\zeta)$ for lett dempede systemer – jo mindre demping, desto større utslag.
- Fasevinkel mellom kraft og utslag: $\\tan\\varphi = \\dfrac{2\\zeta r}{1-r^2}$. Under resonans er kraft og utslag nesten i fase ($\\varphi \\approx 0$), ved resonans er $\\varphi = 90°$, og langt over resonans er de nesten i motfase ($\\varphi \\approx 180°$).
- Grenseoppførsel: for $r \\ll 1$ nærmer utslaget seg den statiske utbøyningen $F_0/k$ (massen «følger» kraften kvasistatisk). For $r \\gg 1$ går utslaget mot null (massen rekker ikke å følge).
- Transmissibilitet (kraft- eller bevegelsesoverføring til fundamentet), udempet: $TR = 1/|1-r^2|$. God isolasjon krever $r > \\sqrt2$, altså at egenfrekvensen er lav sammenlignet med driftsfrekvensen (myke isolatorer).
- Ubalansekraft fra en roterende masse $m_e$ med eksentrisitet $e$: $F_0 = m_ee\\omega^2$, som vokser med kvadratet av turtallet.

## Slik løser du oppgavene
1. Finn $\\omega_n$ for systemet (som i de foregående enhetene) og eksitasjonsfrekvensen $\\omega$ (pass på o/min → rad/s: $\\omega = 2\\pi n/60$).
2. Regn frekvensforholdet $r = \\omega/\\omega_n$.
3. Sett inn i $M(r,\\zeta)$ eller $TR = 1/|1-r^2|$, avhengig av hva oppgaven spør om.
4. For isolasjon: sjekk om $r > \\sqrt2$. Er ikke det tilfellet, forsterkes kraften i stedet for å dempes.
5. Sjekk grensetilfellene: er $r$ nær 1 (fare for resonans), nær 0 (kvasistatisk) eller stor (isolert)?

### Eksempel
En maskin på 150 kg med ubalanse roterer med 900 o/min og står på fjærer med total stivhet 200 kN/m. Demping er neglisjerbar. Er isolasjonen effektiv?
1. $\\omega_n = \\sqrt{k/m} = \\sqrt{200000/150} \\approx 36{,}5$ rad/s.
2. $\\omega = 2\\pi\\cdot 900/60 \\approx 94{,}2$ rad/s.
3. $r = \\omega/\\omega_n \\approx 2{,}58$.
4. Siden $r > \\sqrt2 \\approx 1{,}41$, er isolasjonen effektiv: $TR = 1/|1-r^2| = 1/|1-6{,}66| \\approx 0{,}177$, altså overføres bare 17,7 % av kraften.

Svar: Ja, isolasjonen virker godt ($TR \\approx 0{,}18$).

## Vanlige feil
- Å tro at forsterkningen alltid er størst når $r$ er stor. Den er størst nær $r = 1$ (resonans); for $r \\gg 1$ avtar utslaget.
- Å glemme å regne om o/min til rad/s før $r$ regnes ut.
- Å tro at isolering virker for enhver $r < 1$. Isolasjon (redusert kraftoverføring) krever $r > \\sqrt2$; for $r < \\sqrt2$ forsterkes kraften.
- Å bruke den udempede transmissibilitetsformelen når demping er betydelig – da må $\\zeta$ tas med.
- Å glemme kvadratet i ubalansekraften $F_0 = m_ee\\omega^2$: dobler du turtallet, firedobles kraften.

> Nær resonans ($r \\approx 1$) blir svingningene store; god isolasjon krever tvert imot en lav egenfrekvens sammenlignet med driftsfrekvensen ($r > \\sqrt2$).`,
en: `## What is it about?
When a vibrating system is driven by a periodic force or motion – from an unbalanced motor, waves, or an uneven road – the result is called forced vibration. The system eventually vibrates at the same frequency as the excitation, but how large the response becomes depends strongly on how close the excitation frequency is to the natural frequency. Near resonance even a small force can produce huge amplitudes, and that is exactly what an engineer must either avoid or exploit – by adding damping, by shifting the natural frequency away from the operating frequency, or by isolating the machine from its foundation.

## Concepts and formulas
- Frequency ratio: $r = \\omega/\\omega_n$, where $\\omega$ is the angular frequency of the excitation.

The magnification factor (dynamic response divided by the static deflection $F_0/k$) is
$$M(r,\\zeta) = \\dfrac{1}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}$$
- At resonance ($r = 1$), $M \\approx 1/(2\\zeta)$ for lightly damped systems – the smaller the damping, the larger the response.
- Phase angle between the force and the response: $\\tan\\varphi = \\dfrac{2\\zeta r}{1-r^2}$. Below resonance the force and the response are nearly in phase ($\\varphi \\approx 0$), at resonance $\\varphi = 90°$, and well above resonance they are nearly out of phase ($\\varphi \\approx 180°$).
- Limiting behavior: for $r \\ll 1$ the response approaches the static deflection $F_0/k$ (the mass follows the force quasi-statically). For $r \\gg 1$ the response goes to zero (the mass cannot keep up).
- Transmissibility (force or motion transmitted to the foundation), undamped: $TR = 1/|1-r^2|$. Good isolation requires $r > \\sqrt2$, meaning the natural frequency must be low compared with the operating frequency (soft isolators).
- Unbalance force from a rotating mass $m_e$ with eccentricity $e$: $F_0 = m_ee\\omega^2$, which grows with the square of the rotational speed.

## How to solve the problems
1. Find $\\omega_n$ for the system (as in the previous units) and the excitation frequency $\\omega$ (convert rpm to rad/s: $\\omega = 2\\pi n/60$).
2. Compute the frequency ratio $r = \\omega/\\omega_n$.
3. Substitute into $M(r,\\zeta)$ or $TR = 1/|1-r^2|$, whichever the problem asks for.
4. For isolation: check whether $r > \\sqrt2$. If not, the force is amplified rather than reduced.
5. Check the limiting cases: is $r$ close to 1 (risk of resonance), close to 0 (quasi-static), or large (isolated)?

### Example
A 150 kg machine with an unbalance rotates at 900 rpm and rests on springs with a total stiffness of 200 kN/m. Damping is negligible. Is the isolation effective?
1. $\\omega_n = \\sqrt{k/m} = \\sqrt{200000/150} \\approx 36.5$ rad/s.
2. $\\omega = 2\\pi\\cdot 900/60 \\approx 94.2$ rad/s.
3. $r = \\omega/\\omega_n \\approx 2.58$.
4. Since $r > \\sqrt2 \\approx 1.41$, the isolation is effective: $TR = 1/|1-r^2| = 1/|1-6.66| \\approx 0.177$, so only 17.7% of the force is transmitted.

Answer: Yes, the isolation works well ($TR \\approx 0.18$).

## Common mistakes
- Assuming the amplification is always largest when $r$ is large. It is largest near $r = 1$ (resonance); for $r \\gg 1$ the response decreases.
- Forgetting to convert rpm to rad/s before computing $r$.
- Believing isolation works for any $r < 1$. Isolation (reduced force transmission) requires $r > \\sqrt2$; for $r < \\sqrt2$ the force is amplified.
- Using the undamped transmissibility formula when damping is significant – then $\\zeta$ must be included.
- Forgetting the square in the unbalance force $F_0 = m_ee\\omega^2$: doubling the speed quadruples the force.

> Near resonance ($r \\approx 1$) the vibrations become large; good isolation instead requires a low natural frequency compared with the operating frequency ($r > \\sqrt2$).`
});

BIQ("SVING", 2, [
 ["Hva er frekvensforholdet $r$ i tvungne svingninger?",
  ["$r = \\omega/\\omega_n$", "$r = \\omega_n/\\omega$", "$r = \\omega\\cdot\\omega_n$", "$r = \\omega_n - \\omega$"],
  "$r$ er forholdet mellom eksitasjonsfrekvensen og systemets egenfrekvens. $r = 1$ betyr resonans.",
  "What is the frequency ratio $r$ in forced vibrations?",
  ["$r = \\omega/\\omega_n$", "$r = \\omega_n/\\omega$", "$r = \\omega\\cdot\\omega_n$", "$r = \\omega_n - \\omega$"],
  "$r$ is the ratio between the excitation frequency and the system's natural frequency. $r = 1$ means resonance."],
 ["Eksitasjonsfrekvensen er langt under egenfrekvensen ($r \\ll 1$). Hva skjer med utslaget til massen?",
  ["Det nærmer seg den statiske utbøyningen $F_0/k$", "Det går mot null", "Det går mot uendelig", "Det er uavhengig av $F_0$"],
  "Ved lave frekvensforhold følger massen kraften nesten kvasistatisk, og forsterkningsfaktoren $M \\to 1$.",
  "The excitation frequency is far below the natural frequency ($r \\ll 1$). What happens to the amplitude of the mass?",
  ["It approaches the static deflection $F_0/k$", "It goes to zero", "It goes to infinity", "It is independent of $F_0$"],
  "At low frequency ratios the mass follows the force almost quasi-statically, and the magnification factor $M \\to 1$."],
 ["En maskin på 120 kg står på fjærer med total stivhet 80 kN/m og roterer med 1200 o/min. Demping er neglisjerbar. Hva er transmissibiliteten $TR$?",
  { n: 0.04408, tol: rel(0.04408), u: "" },
  "$\\omega_n = \\sqrt{k/m} = \\sqrt{80000/120} \\approx 25{,}82$ rad/s. $\\omega = 2\\pi\\cdot 1200/60 \\approx 125{,}66$ rad/s, så $r = \\omega/\\omega_n \\approx 4{,}87$. $TR = 1/|1-r^2| = 1/|1-23{,}69| \\approx 0{,}0441$.",
  "A 120 kg machine rests on springs with a total stiffness of 80 kN/m and rotates at 1200 rpm. Damping is negligible. What is the transmissibility $TR$?",
  null,
  "$\\omega_n = \\sqrt{k/m} = \\sqrt{80000/120} \\approx 25.82$ rad/s. $\\omega = 2\\pi\\cdot 1200/60 \\approx 125.66$ rad/s, so $r = \\omega/\\omega_n \\approx 4.87$. $TR = 1/|1-r^2| = 1/|1-23.69| \\approx 0.0441$."]
]);

GEN("SVING", 2,
 // enkel/middels: forsterkningsfaktor med demping
 () => { const r = R.f(0.2, 3, 0.1), z = R.p([0.02, 0.05, 0.1, 0.15, 0.2, 0.3]);
   const M = 1 / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2);
   return [T(`Et system har frekvensforhold $r = ${nf(r)}$ og dempingsforhold $\\zeta = ${mf(z)}$. Hva er forsterkningsfaktoren $M$ (dynamisk utslag delt på statisk utbøyning)?`,
             `A system has a frequency ratio of $r = ${nf(r)}$ and a damping ratio of $\\zeta = ${mf(z)}$. What is the magnification factor $M$ (dynamic response divided by the static deflection)?`),
     { n: M, tol: rel(M), u: "" },
     T(`$M = \\dfrac{1}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}} = \\dfrac{1}{\\sqrt{(1-${mf(r * r, 3)})^2+(${mf(2 * z * r, 3)})^2}} \\approx ${mf(M, 3)}$.`,
       `$M = \\dfrac{1}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}} = \\dfrac{1}{\\sqrt{(1-${mf(r * r, 3)})^2+(${mf(2 * z * r, 3)})^2}} \\approx ${mf(M, 3)}$.`)]; },
 // eksamen: ubalansekraft og overført kraft via dempet transmissibilitet
 () => { const me = R.f(0.05, 0.3, 0.01), e = R.f(3, 15, 1), n = R.p([600, 750, 900, 1200, 1500, 1800, 3000]),
     Mm = R.f(80, 400, 10), k = R.f(40, 300, 10), z = R.p([0.02, 0.05, 0.08, 0.1, 0.15]);
   const w = 2 * Math.PI * n / 60, F0 = me * (e / 1000) * w * w, wn = Math.sqrt(k * 1000 / Mm), r = w / wn;
   const TR = Math.sqrt(1 + (2 * z * r) ** 2) / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2), Ft = TR * F0;
   return [T(`En ubalanse på ${nf(me * 1000)} g sitter ${nf(e)} mm fra aksen på en maskin med total masse ${nf(Mm)} kg som roterer med ${n} o/min. Maskinen står på isolatorer med total stivhet ${nf(k)} kN/m og dempingsforhold $\\zeta = ${mf(z)}$. Hvor stor kraft overføres til fundamentet?`,
             `An unbalance of ${nf(me * 1000)} g is located ${nf(e)} mm from the axis on a machine with a total mass of ${nf(Mm)} kg rotating at ${n} rpm. The machine rests on isolators with a total stiffness of ${nf(k)} kN/m and a damping ratio of $\\zeta = ${mf(z)}$. How large is the force transmitted to the foundation?`),
     { n: Ft, tol: rel(Ft), u: "N" },
     T(`$\\omega = 2\\pi\\cdot ${n}/60 \\approx ${mf(w, 2)}$ rad/s, og ubalansekraften er $F_0 = m_ee\\omega^2 \\approx ${mf(F0, 2)}$ N. $\\omega_n = \\sqrt{k/M} \\approx ${mf(wn, 2)}$ rad/s, så $r = \\omega/\\omega_n \\approx ${mf(r, 3)}$. Dempet transmissibilitet: $TR = \\dfrac{\\sqrt{1+(2\\zeta r)^2}}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}} \\approx ${mf(TR, 3)}$. Overført kraft: $F_t = TR\\cdot F_0 \\approx ${mf(Ft, 2)}$ N.`,
       `$\\omega = 2\\pi\\cdot ${n}/60 \\approx ${mf(w, 2)}$ rad/s, and the unbalance force is $F_0 = m_ee\\omega^2 \\approx ${mf(F0, 2)}$ N. $\\omega_n = \\sqrt{k/M} \\approx ${mf(wn, 2)}$ rad/s, so $r = \\omega/\\omega_n \\approx ${mf(r, 3)}$. Damped transmissibility: $TR = \\dfrac{\\sqrt{1+(2\\zeta r)^2}}{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}} \\approx ${mf(TR, 3)}$. Transmitted force: $F_t = TR\\cdot F_0 \\approx ${mf(Ft, 2)}$ N.`)]; }
);

// ================= VARME – enhet 0: Varmeledning =================
THEORY("VARME", 0, {
nb: `## Hva handler det om?
Varmeledning er transport av varme gjennom et stoff uten at stoffet selv flytter på seg – varmen «hopper» fra molekyl til molekyl. Det er slik varme går gjennom en vegg, et rør eller en kjøleribbe. For en ingeniør handler dette om å dimensjonere isolasjon, beregne varmetap fra bygninger og rørledninger, og forstå hvorfor noen materialer kjennes kaldere å ta på enn andre selv ved samme temperatur.

## Begreper og formler
Fouriers lov for et endimensjonalt, plant sjikt er
$$\\dot q = -k\\,\\dfrac{dT}{dx}$$
Varmen strømmer fra høy til lav temperatur, derav minustegnet.
- Varmeledningsevnen $k$ har enhet W/(m·K). Ikke forveksle med varmeovergangstallet $h$ (W/(m²·K)) eller spesifikk varmekapasitet $c$ (J/(kg·K)).
- Termisk motstand for et plant sjikt: $R = L/(kA)$ (K/W), der $L$ er tykkelsen og $A$ arealet vinkelrett på varmestrømmen.
- Sjikt i serie: $R_{tot} = \\sum R_i = \\sum L_i/(k_iA)$, akkurat som elektriske motstander i serie. Varmestrømmen $\\dot Q$ er den samme gjennom hvert sjikt i stasjonær tilstand.
- Termisk motstand for et sylindrisk sjikt (f.eks. isolasjon på et rør), med indre radius $r_1$ og ytre radius $r_2$, lengde $L$: $$R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL}$$
- Varmestrøm: $\\dot Q = \\Delta T/R_{tot}$ (W). Temperaturfallet fordeler seg proporsjonalt med motstanden til hvert sjikt.
- U-verdi: $U = 1/(R_{tot}A)$, varmetap per m² og grad temperaturforskjell (W/(m²·K)). Lav U-verdi betyr god isolasjon.
- En kuldebro er et område med mye lavere termisk motstand enn resten av konstruksjonen (f.eks. en stålbjelke gjennom isolasjonen), og gir lokalt stort varmetap.

## Slik løser du oppgavene
1. Tegn opp sjiktene varmen går gjennom, og finn $L$, $k$ og $A$ (eller $r_1$, $r_2$, $L$ for et rør) for hvert av dem.
2. Regn den termiske motstanden til hvert sjikt, plant med $R = L/(kA)$ eller sylindrisk med $R = \\ln(r_2/r_1)/(2\\pi kL)$.
3. Legg sammen motstandene i serie: $R_{tot} = \\sum R_i$.
4. Finn varmestrømmen $\\dot Q = \\Delta T/R_{tot}$, der $\\Delta T$ er totalt temperaturfall.
5. Trenger du en temperatur inni konstruksjonen, bruk at temperaturfallet er proporsjonalt med motstanden fram til det punktet.

### Eksempel
Et rør med indre radius 40 mm er isolert med 30 mm isolasjon ($k = 0{,}045$ W/(m·K)) langs en lengde på 8 m. Innerflaten av isolasjonen holder 120 °C og ytterflaten 20 °C. Hvor stort er varmetapet?
1. Ytre radius: $r_2 = 40+30 = 70$ mm.
2. $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(70/40)}{2\\pi\\cdot 0{,}045\\cdot 8} \\approx \\dfrac{0{,}5596}{2{,}262} \\approx 0{,}2474$ K/W.
3. $\\dot Q = \\Delta T/R = (120-20)/0{,}2474 \\approx 404$ W.

Svar: omtrent 404 W.

## Vanlige feil
- Å bruke den plane formelen $R = L/(kA)$ på et rør – for sylindriske sjikt må $\\ln(r_2/r_1)$-formelen brukes.
- Å blande $k$ (varmeledningsevne) med $h$ (varmeovergangstall) – de har forskjellig enhet og beskriver helt forskjellige fenomener.
- Å glemme at $\\dot Q$ er den samme gjennom alle sjikt i serie i stasjonær tilstand, selv om temperaturfallet er ulikt.
- Å bruke feil areal for et sjikt som ikke er plant (f.eks. bruke innerarealet for hele røret).
- Å blande mm og m i samme formel.

> Legg sammen termiske motstander i serie akkurat som elektriske motstander: $R_{tot} = \\sum L_i/(k_iA)$ for plane sjikt, $\\sum \\ln(r_{i+1}/r_i)/(2\\pi k_iL)$ for sylindriske.`,
en: `## What is it about?
Conduction is the transport of heat through a substance without the substance itself moving – the heat "hops" from molecule to molecule. This is how heat passes through a wall, a pipe or a cooling fin. For an engineer this is about sizing insulation, calculating heat loss from buildings and pipelines, and understanding why some materials feel colder to the touch than others even at the same temperature.

## Concepts and formulas
Fourier's law for a one-dimensional, plane layer is
$$\\dot q = -k\\,\\dfrac{dT}{dx}$$
Heat flows from high to low temperature, hence the minus sign.
- The thermal conductivity $k$ has units W/(m·K). Do not confuse it with the heat transfer coefficient $h$ (W/(m²·K)) or the specific heat capacity $c$ (J/(kg·K)).
- Thermal resistance of a plane layer: $R = L/(kA)$ (K/W), where $L$ is the thickness and $A$ the area perpendicular to the heat flow.
- Layers in series: $R_{tot} = \\sum R_i = \\sum L_i/(k_iA)$, exactly like electrical resistors in series. The heat flow $\\dot Q$ is the same through every layer in steady state.
- Thermal resistance of a cylindrical layer (e.g. insulation on a pipe), with inner radius $r_1$ and outer radius $r_2$, length $L$: $$R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL}$$
- Heat flow: $\\dot Q = \\Delta T/R_{tot}$ (W). The temperature drop is distributed in proportion to the resistance of each layer.
- U-value: $U = 1/(R_{tot}A)$, the heat loss per m² and degree of temperature difference (W/(m²·K)). A low U-value means good insulation.
- A thermal bridge is a region with much lower thermal resistance than the rest of the construction (e.g. a steel beam through the insulation), causing a large local heat loss.

## How to solve the problems
1. Sketch the layers the heat passes through, and find $L$, $k$ and $A$ (or $r_1$, $r_2$, $L$ for a pipe) for each of them.
2. Compute the thermal resistance of each layer, using $R = L/(kA)$ for a plane layer or $R = \\ln(r_2/r_1)/(2\\pi kL)$ for a cylindrical one.
3. Add the resistances in series: $R_{tot} = \\sum R_i$.
4. Find the heat flow $\\dot Q = \\Delta T/R_{tot}$, where $\\Delta T$ is the total temperature drop.
5. If you need a temperature inside the construction, use the fact that the temperature drop is proportional to the resistance up to that point.

### Example
A pipe with an inner radius of 40 mm is insulated with 30 mm of insulation ($k = 0.045$ W/(m·K)) over a length of 8 m. The inner surface of the insulation is at 120 °C and the outer surface at 20 °C. What is the heat loss?
1. Outer radius: $r_2 = 40+30 = 70$ mm.
2. $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(70/40)}{2\\pi\\cdot 0.045\\cdot 8} \\approx \\dfrac{0.5596}{2.262} \\approx 0.2474$ K/W.
3. $\\dot Q = \\Delta T/R = (120-20)/0.2474 \\approx 404$ W.

Answer: about 404 W.

## Common mistakes
- Using the plane-wall formula $R = L/(kA)$ for a pipe – cylindrical layers require the $\\ln(r_2/r_1)$ formula.
- Confusing $k$ (thermal conductivity) with $h$ (heat transfer coefficient) – they have different units and describe completely different phenomena.
- Forgetting that $\\dot Q$ is the same through every layer in series at steady state, even though the temperature drop differs between them.
- Using the wrong area for a layer that is not plane (e.g. using the inner area for the whole pipe).
- Mixing mm and m in the same formula.

> Add thermal resistances in series just like electrical resistors: $R_{tot} = \\sum L_i/(k_iA)$ for plane layers, $\\sum \\ln(r_{i+1}/r_i)/(2\\pi k_iL)$ for cylindrical ones.`
});

BIQ("VARME", 0, [
 ["Hva er enheten for varmeledningsevnen $k$?",
  ["W/(m·K)", "W/(m²·K)", "W/K", "J/(kg·K)"],
  "W/(m²·K) er enheten for varmeovergangstallet $h$ (konveksjon), og J/(kg·K) er spesifikk varmekapasitet. $k$ beskriver et materiales evne til å lede varme og har enhet W/(m·K).",
  "What is the unit of the thermal conductivity $k$?",
  ["W/(m·K)", "W/(m²·K)", "W/K", "J/(kg·K)"],
  "W/(m²·K) is the unit of the heat transfer coefficient $h$ (convection), and J/(kg·K) is specific heat capacity. $k$ describes a material's ability to conduct heat and has units W/(m·K)."],
 ["To vegger har samme areal, samme materiale og samme temperaturforskjell, men den ene er dobbelt så tykk som den andre. Hva skjer med varmetapet gjennom den tykke veggen sammenlignet med den tynne?",
  ["Det halveres", "Det dobles", "Det er uendret", "Det firedobles"],
  "Den termiske motstanden $R = L/(kA)$ er proporsjonal med tykkelsen $L$. Dobbelt så tykk vegg gir dobbelt så stor $R$, og siden $\\dot Q = \\Delta T/R$, blir varmetapet halvparten.",
  "Two walls have the same area, the same material and the same temperature difference, but one is twice as thick as the other. What happens to the heat loss through the thicker wall compared with the thinner one?",
  ["It is halved", "It doubles", "It is unchanged", "It quadruples"],
  "The thermal resistance $R = L/(kA)$ is proportional to the thickness $L$. A wall twice as thick has twice the resistance, and since $\\dot Q = \\Delta T/R$, the heat loss is halved."],
 ["Et rør har indre radius 50 mm og er isolert til ytre radius 90 mm langs en lengde på 10 m. Isolasjonens varmeledningsevne er $k = 0{,}04$ W/(m·K). Innerflaten av isolasjonen holder 150 °C og ytterflaten 25 °C. Hvor stort er varmetapet gjennom isolasjonen?",
  { n: 534.5, tol: rel(534.5), u: "W" },
  "Ytre radius er $r_2 = 90$ mm og indre $r_1 = 50$ mm. Motstanden er $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(90/50)}{2\\pi\\cdot 0{,}04\\cdot 10} \\approx 0{,}2339$ K/W. Varmetapet er $\\dot Q = \\Delta T/R = 125/0{,}2339 \\approx 534{,}5$ W.",
  "A pipe has an inner radius of 50 mm and is insulated to an outer radius of 90 mm over a length of 10 m. The insulation's thermal conductivity is $k = 0.04$ W/(m·K). The inner surface of the insulation is at 150 °C and the outer surface at 25 °C. What is the heat loss through the insulation?",
  null,
  "The outer radius is $r_2 = 90$ mm and the inner $r_1 = 50$ mm. The resistance is $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(90/50)}{2\\pi\\cdot 0.04\\cdot 10} \\approx 0.2339$ K/W. The heat loss is $\\dot Q = \\Delta T/R = 125/0.2339 \\approx 534.5$ W."]
]);

GEN("VARME", 0,
 // enkel: direkte varmestrøm gjennom ett plant sjikt
 () => { const L = R.f(0.05, 0.3, 0.01), k = R.p([0.035, 0.04, 0.05, 0.8, 1.4, 50, 200]), A = R.f(1, 20, 1), dT = R.i(10, 50);
   const Q = k * A * dT / L;
   return [T(`Et plant sjikt har tykkelse ${nf(L * 1000, 0)} mm, varmeledningsevne $k = ${mf(k, 2)}$ W/(m·K) og areal ${nf(A)} m². Temperaturforskjellen over sjiktet er ${dT} K. Hvor stor er varmestrømmen?`,
             `A plane layer has a thickness of ${nf(L * 1000, 0)} mm, a thermal conductivity of $k = ${mf(k, 2)}$ W/(m·K) and an area of ${nf(A)} m². The temperature difference across the layer is ${dT} K. What is the heat flow?`),
     { n: Q, tol: rel(Q), u: "W" },
     T(`Fouriers lov for et plant sjikt: $\\dot Q = \\dfrac{kA\\Delta T}{L} = \\dfrac{${mf(k, 2)}\\cdot ${mf(A)}\\cdot ${dT}}{${mf(L, 3)}} \\approx ${mf(Q, 1)}$ W.`,
       `Fourier's law for a plane layer: $\\dot Q = \\dfrac{kA\\Delta T}{L} = \\dfrac{${mf(k, 2)}\\cdot ${mf(A)}\\cdot ${dT}}{${mf(L, 3)}} \\approx ${mf(Q, 1)}$ W.`)]; },
 // eksamen: sylindrisk (rør-)ledning
 () => { const r1 = R.f(20, 100, 5), t = R.f(20, 80, 5), L = R.f(3, 20, 1), k = R.f(0.03, 0.06, 0.005), T1 = R.i(80, 200), T2 = R.i(10, 30);
   const r2 = r1 + t, Rr = Math.log(r2 / r1) / (2 * Math.PI * k * L), Q = (T1 - T2) / Rr;
   return [T(`Et rør med indre radius ${nf(r1, 0)} mm er isolert med ${nf(t, 0)} mm isolasjon ($k = ${mf(k, 3)}$ W/(m·K)) langs en lengde på ${nf(L)} m. Innerflaten av isolasjonen holder ${T1} °C og ytterflaten ${T2} °C. Hvor stort er varmetapet gjennom isolasjonen?`,
             `A pipe with an inner radius of ${nf(r1, 0)} mm is insulated with ${nf(t, 0)} mm of insulation ($k = ${mf(k, 3)}$ W/(m·K)) over a length of ${nf(L)} m. The inner surface of the insulation is at ${T1} °C and the outer surface at ${T2} °C. What is the heat loss through the insulation?`),
     { n: Q, tol: rel(Q), u: "W" },
     T(`Ytre radius er $r_2 = ${nf(r1, 0)}+${nf(t, 0)} = ${nf(r2, 0)}$ mm. Motstanden er $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(${nf(r2, 0)}/${nf(r1, 0)})}{2\\pi\\cdot ${mf(k, 3)}\\cdot ${mf(L)}} \\approx ${mf(Rr, 4)}$ K/W. Varmetapet er $\\dot Q = \\Delta T/R \\approx ${mf(Q, 1)}$ W.`,
       `The outer radius is $r_2 = ${nf(r1, 0)}+${nf(t, 0)} = ${nf(r2, 0)}$ mm. The resistance is $R = \\dfrac{\\ln(r_2/r_1)}{2\\pi kL} = \\dfrac{\\ln(${nf(r2, 0)}/${nf(r1, 0)})}{2\\pi\\cdot ${mf(k, 3)}\\cdot ${mf(L)}} \\approx ${mf(Rr, 4)}$ K/W. The heat loss is $\\dot Q = \\Delta T/R \\approx ${mf(Q, 1)}$ W.`)]; }
);

// ================= VARME – enhet 1: Konveksjon =================
THEORY("VARME", 1, {
nb: `## Hva handler det om?
Konveksjon er varmeoverføring mellom en overflate og et fluid (luft, vann, olje …) som strømmer forbi. Det er slik en radiator varmer opp et rom, en kjøler avgir varme fra en motor, og vinden gjør at du fryser fortere. Konveksjon er mer komplisert enn ledning fordi den avhenger av strømningen: om fluidet drives av en vifte eller pumpe (tvungen konveksjon) eller av oppdrift fra temperaturforskjeller (naturlig konveksjon), og om strømningen er laminær eller turbulent. Som ingeniør trenger du konveksjon for å dimensjonere kjølesystemer, beregne varmetap fra bygninger og avgjøre om et legeme kan regnes som ensartet oppvarmet.

## Begreper og formler
Newtons avkjølingslov er
$$\\dot Q = hA(T_s - T_\\infty)$$
der $h$ er varmeovergangstallet (W/(m²·K)), $T_s$ overflatetemperaturen og $T_\\infty$ fluidtemperaturen langt unna.
- Termisk motstand ved konveksjon: $R_{konv} = 1/(hA)$ (K/W) – legges i serie med ledningsmotstander akkurat som før.
- Typiske $h$-verdier: naturlig konveksjon i luft 2–25, tvungen konveksjon i luft 10–200, tvungen konveksjon i vann 50–10000, koking/kondensering flere tusen til over 100000 W/(m²·K).
- Nusselttallet $Nu = hL/k$ uttrykker forholdet mellom konvektiv og konduktiv varmetransport i fluidet; store $Nu$ betyr effektiv konveksjon.
- Ved tvungen konveksjon øker $h$ med fluidhastigheten: raskere strøm gjør grensesjiktet (laget nær overflaten der farten endrer seg) tynnere, og et tynnere grensesjikt leder varmen raskere ut i fluidet.
- Biottallet $Bi = hL_c/k$ ($L_c$ = karakteristisk lengde, f.eks. volum/overflateareal) sammenligner motstanden mot ledning inni legemet med motstanden mot konveksjon på overflaten. Når $Bi < 0{,}1$ kan hele legemet regnes å ha samme temperatur («lumped capacitance»).
- Ribber (kjøleribber) øker overflatearealet og dermed varmeavgivelsen fra en overflate med begrenset plass.

## Slik løser du oppgavene
1. Avgjør om det er tvungen eller naturlig konveksjon, og finn (eller bruk oppgitt) $h$.
2. For enkel konveksjon: bruk $\\dot Q = hA\\Delta T$ direkte.
3. For en vegg med konveksjon på begge sider og ett eller flere sjikt: legg sammen motstandene $R = 1/h_iA + \\sum L_j/(k_jA) + 1/h_uA$, og finn $U = 1/(R_{tot}A)$ eller $\\dot Q = \\Delta T/R_{tot}$.
4. Sjekk om lumped capacitance kan brukes: regn $Bi = hL_c/k$ og sammenlign med 0,1.
5. Pass på at $h$ og $k$ ikke blandes – de har forskjellig enhet og beskriver forskjellige mekanismer.

### Eksempel
En metallplate med karakteristisk lengde 8 mm og $k = 60$ W/(m·K) kjøles med luft der $h = 40$ W/(m²·K). Kan lumped capacitance brukes, og hvor stor er konveksjonsvarmen fra 0,3 m² overflate med 45 K temperaturforskjell?
1. $Bi = hL_c/k = 40\\cdot 0{,}008/60 \\approx 0{,}00533$.
2. Siden $Bi < 0{,}1$, kan hele platen regnes å ha samme temperatur.
3. $\\dot Q = hA\\Delta T = 40\\cdot 0{,}3\\cdot 45 = 540$ W.

Svar: Ja, lumped capacitance er gyldig, og $\\dot Q = 540$ W.

## Vanlige feil
- Å bruke $k$ (ledningsevne) i stedet for $h$ (varmeovergangstall) i Newtons avkjølingslov, eller motsatt.
- Å tro at $h$ er en materialegenskap. Den avhenger av geometri, fluid og strømningsforhold, og må ofte finnes fra korrelasjoner eller oppgis i oppgaven.
- Å bruke lumped capacitance uten å sjekke Biottallet først.
- Å glemme konveksjonsmotstanden $1/(hA)$ når du kobler sammen flere motstander i en vegg.
- Å anta at naturlig konveksjon alltid gir lavere varmetap enn tvungen – det stemmer nesten alltid, men det er strømningen, ikke «naturlig» i seg selv, som avgjør $h$.

> Newtons avkjølingslov, $\\dot Q = hA\\Delta T$, er konveksjonens svar på Fouriers lov – bare husk at $h$ ikke er en fast materialegenskap slik $k$ er.`,
en: `## What is it about?
Convection is heat transfer between a surface and a fluid (air, water, oil …) flowing past it. This is how a radiator heats a room, a cooler removes heat from an engine, and the wind makes you feel colder faster. Convection is more complicated than conduction because it depends on the flow: whether the fluid is driven by a fan or pump (forced convection) or by buoyancy from temperature differences (natural convection), and whether the flow is laminar or turbulent. As an engineer you need convection to size cooling systems, calculate heat loss from buildings, and decide whether a body can be treated as uniformly heated.

## Concepts and formulas
Newton's law of cooling is
$$\\dot Q = hA(T_s - T_\\infty)$$
where $h$ is the heat transfer coefficient (W/(m²·K)), $T_s$ the surface temperature and $T_\\infty$ the fluid temperature far away.
- Thermal resistance for convection: $R_{conv} = 1/(hA)$ (K/W) – added in series with conduction resistances exactly as before.
- Typical $h$ values: natural convection in air 2–25, forced convection in air 10–200, forced convection in water 50–10,000, boiling/condensation several thousand up to over 100,000 W/(m²·K).
- The Nusselt number $Nu = hL/k$ expresses the ratio between convective and conductive heat transport in the fluid; a large $Nu$ means efficient convection.
- In forced convection, $h$ increases with the fluid velocity: a faster flow makes the boundary layer (the layer near the surface where the velocity changes) thinner, and a thinner boundary layer conducts heat away into the fluid faster.
- The Biot number $Bi = hL_c/k$ ($L_c$ = characteristic length, e.g. volume/surface area) compares the resistance to conduction inside the body with the resistance to convection at the surface. When $Bi < 0.1$ the whole body can be treated as having a single, uniform temperature ("lumped capacitance").
- Fins increase the surface area and hence the heat dissipated from a surface with limited space.

## How to solve the problems
1. Decide whether the convection is forced or natural, and find (or use the given) $h$.
2. For simple convection: use $\\dot Q = hA\\Delta T$ directly.
3. For a wall with convection on both sides and one or more layers: add the resistances $R = 1/h_iA + \\sum L_j/(k_jA) + 1/h_oA$, and find $U = 1/(R_{tot}A)$ or $\\dot Q = \\Delta T/R_{tot}$.
4. Check whether lumped capacitance applies: compute $Bi = hL_c/k$ and compare it with 0.1.
5. Make sure $h$ and $k$ are not mixed up – they have different units and describe different mechanisms.

### Example
A metal plate with a characteristic length of 8 mm and $k = 60$ W/(m·K) is cooled by air with $h = 40$ W/(m²·K). Can lumped capacitance be used, and how large is the convective heat transfer from a 0.3 m² surface with a 45 K temperature difference?
1. $Bi = hL_c/k = 40\\cdot 0.008/60 \\approx 0.00533$.
2. Since $Bi < 0.1$, the whole plate can be treated as having a single temperature.
3. $\\dot Q = hA\\Delta T = 40\\cdot 0.3\\cdot 45 = 540$ W.

Answer: Yes, lumped capacitance is valid, and $\\dot Q = 540$ W.

## Common mistakes
- Using $k$ (thermal conductivity) instead of $h$ (heat transfer coefficient) in Newton's law of cooling, or the other way around.
- Believing $h$ is a material property. It depends on geometry, fluid and flow conditions, and often has to be found from correlations or given in the problem.
- Using lumped capacitance without checking the Biot number first.
- Forgetting the convection resistance $1/(hA)$ when combining several resistances in a wall.
- Assuming natural convection always gives lower heat loss than forced convection – that is almost always true, but it is the flow, not "natural" itself, that determines $h$.

> Newton's law of cooling, $\\dot Q = hA\\Delta T$, is convection's answer to Fourier's law – just remember that $h$ is not a fixed material property the way $k$ is.`
});

BIQ("VARME", 1, [
 ["Hva er den termiske motstanden ved konveksjon fra en overflate med areal $A$ og varmeovergangstall $h$?",
  ["$R = 1/(hA)$", "$R = hA$", "$R = h/A$", "$R = A/h$"],
  "Akkurat som ledningsmotstanden $L/(kA)$, følger konveksjonsmotstanden av Newtons avkjølingslov: $\\dot Q = hA\\Delta T = \\Delta T/R$ gir $R = 1/(hA)$.",
  "What is the thermal resistance for convection from a surface with area $A$ and heat transfer coefficient $h$?",
  ["$R = 1/(hA)$", "$R = hA$", "$R = h/A$", "$R = A/h$"],
  "Just like the conduction resistance $L/(kA)$, the convection resistance follows from Newton's law of cooling: $\\dot Q = hA\\Delta T = \\Delta T/R$ gives $R = 1/(hA)$."],
 ["Hva skjer med varmeovergangstallet $h$ ved tvungen konveksjon når fluidhastigheten øker?",
  ["Det øker, fordi grensesjiktet blir tynnere", "Det avtar, fordi turbulensen reduserer varmeoverføringen", "Det er uavhengig av hastigheten", "Det blir negativt ved høy hastighet"],
  "Høyere fart gir et tynnere grensesjikt langs overflaten, og et tynnere sjikt gir mindre motstand mot varmetransporten – derfor øker $h$ med farten (og dermed med Reynoldstallet).",
  "What happens to the heat transfer coefficient $h$ in forced convection as the fluid velocity increases?",
  ["It increases, because the boundary layer becomes thinner", "It decreases, because turbulence reduces the heat transfer", "It is independent of the velocity", "It becomes negative at high velocity"],
  "A higher velocity makes the boundary layer along the surface thinner, and a thinner layer offers less resistance to heat transport – so $h$ increases with velocity (and hence with the Reynolds number)."],
 ["En vegg har $h_i = 8$ W/(m²·K) og $h_u = 25$ W/(m²·K), og et isolasjonssjikt med $L = 100$ mm og $k = 0{,}03$ W/(m·K). Veggens areal er 15 m². Innetemperaturen er 20 °C og utetemperaturen −10 °C. Hvor stort er varmetapet?",
  { n: 128.6, tol: rel(128.6), u: "W" },
  "Total motstand per areal: $1/h_i + L/k + 1/h_u = 1/8 + 0{,}1/0{,}03 + 1/25 \\approx 3{,}498$ m²K/W. $U = 1/3{,}498 \\approx 0{,}2859$ W/(m²K). Varmetapet: $\\dot Q = UA\\Delta T = 0{,}2859\\cdot 15\\cdot 30 \\approx 128{,}6$ W.",
  "A wall has $h_i = 8$ W/(m²·K) and $h_o = 25$ W/(m²·K), and an insulation layer with $L = 100$ mm and $k = 0.03$ W/(m·K). The wall's area is 15 m². The indoor temperature is 20 °C and the outdoor temperature is −10 °C. What is the heat loss?",
  null,
  "Total resistance per area: $1/h_i + L/k + 1/h_o = 1/8 + 0.1/0.03 + 1/25 \\approx 3.498$ m²K/W. $U = 1/3.498 \\approx 0.2859$ W/(m²K). The heat loss: $\\dot Q = UA\\Delta T = 0.2859\\cdot 15\\cdot 30 \\approx 128.6$ W."]
]);

GEN("VARME", 1,
 // enkel: konveksjonsmotstand direkte
 () => { const h = R.p([5, 8, 10, 15, 20, 25, 40, 60, 100]), A = R.f(0.5, 12, 0.5);
   const Rr = 1 / (h * A);
   return [T(`Hva er den termiske motstanden ved konveksjon fra en overflate med $h = ${h}$ W/(m²·K) og areal ${nf(A)} m²?`,
             `What is the thermal resistance for convection from a surface with $h = ${h}$ W/(m²·K) and an area of ${nf(A)} m²?`),
     { n: Rr, tol: rel(Rr), u: "K/W" },
     T(`$R = \\dfrac{1}{hA} = \\dfrac{1}{${h}\\cdot ${mf(A)}} \\approx ${mf(Rr, 4)}$ K/W.`,
       `$R = \\dfrac{1}{hA} = \\dfrac{1}{${h}\\cdot ${mf(A)}} \\approx ${mf(Rr, 4)}$ K/W.`)]; },
 // eksamen: totalt varmetap gjennom sammensatt vegg med konveksjon på begge sider
 () => { const hi = R.p([6, 7.7, 8, 10]), ho = R.p([20, 25, 30]), L = R.f(0.05, 0.25, 0.01), k = R.p([0.03, 0.035, 0.04, 0.045]),
     A = R.f(5, 40, 1), Ti = R.i(18, 22), To = R.i(-25, 5);
   const Rtot = 1 / hi + L / k + 1 / ho, U = 1 / Rtot, dT = Ti - To, Q = U * A * dT;
   return [T(`En vegg har $h_i = ${mf(hi, 1)}$ W/(m²·K) og $h_u = ${mf(ho, 1)}$ W/(m²·K), og et isolasjonssjikt med $L = ${nf(L * 1000, 0)}$ mm og $k = ${mf(k, 3)}$ W/(m·K). Veggens areal er ${nf(A)} m². Innetemperaturen er ${Ti} °C og utetemperaturen ${nf(To)} °C. Hvor stort er varmetapet?`,
             `A wall has $h_i = ${mf(hi, 1)}$ W/(m²·K) and $h_o = ${mf(ho, 1)}$ W/(m²·K), and an insulation layer with $L = ${nf(L * 1000, 0)}$ mm and $k = ${mf(k, 3)}$ W/(m·K). The wall's area is ${nf(A)} m². The indoor temperature is ${Ti} °C and the outdoor temperature is ${nf(To)} °C. What is the heat loss?`),
     { n: Q, tol: rel(Q), u: "W" },
     T(`Total motstand per areal: $1/h_i + L/k + 1/h_u = 1/${mf(hi, 1)} + ${mf(L, 3)}/${mf(k, 3)} + 1/${mf(ho, 1)} \\approx ${mf(Rtot, 4)}$ m²K/W. $U = 1/R \\approx ${mf(U, 4)}$ W/(m²K). Varmetapet: $\\dot Q = UA\\Delta T = ${mf(U, 4)}\\cdot ${mf(A)}\\cdot ${dT} \\approx ${mf(Q, 1)}$ W.`,
       `Total resistance per area: $1/h_i + L/k + 1/h_o = 1/${mf(hi, 1)} + ${mf(L, 3)}/${mf(k, 3)} + 1/${mf(ho, 1)} \\approx ${mf(Rtot, 4)}$ m²K/W. $U = 1/R \\approx ${mf(U, 4)}$ W/(m²K). The heat loss: $\\dot Q = UA\\Delta T = ${mf(U, 4)}\\cdot ${mf(A)}\\cdot ${dT} \\approx ${mf(Q, 1)}$ W.`)]; }
);

// ================= VARME – enhet 2: Stråling og transient varme =================
THEORY("VARME", 2, {
nb: `## Hva handler det om?
Stråling er varmeoverføring ved elektromagnetiske bølger og er den eneste formen for varmetransport som fungerer i vakuum – det er slik solen varmer jorden. Alle legemer med temperatur over det absolutte nullpunkt stråler ut energi. Transient varme handler om hvordan et legeme skifter temperatur over tid, for eksempel når en varm gjenstand kjøles ned i luft. Som ingeniør trenger du stråling for å beregne varmetap fra varme overflater (rør, ovner, elektronikk) og transiente formler for å finne hvor lang tid ting bruker på å varmes opp eller kjøles ned.

## Begreper og formler
- Stefan–Boltzmanns lov, utstrålt effekt fra en gråflate: $\\dot Q_{ut} = \\varepsilon\\sigma AT^4$, med $\\sigma = 5{,}67\\cdot10^{-8}$ W/(m²K⁴) og $T$ i kelvin.
- Netto strålingstap mot omgivelser med temperatur $T_{omg}$: $\\dot Q = \\varepsilon\\sigma A(T^4 - T_{omg}^4)$.
- Emissivitet $\\varepsilon$ (0–1) sier hvor godt en flate stråler sammenlignet med et svart legeme ($\\varepsilon = 1$). Et polert, blankt metall har lav $\\varepsilon$; en matt, mørk flate har høy $\\varepsilon$.
- Kirchhoffs lov (forenklet): for en gråflate i termisk likevekt med omgivelsene er absorpsjonsevnen lik emissiviteten, $\\alpha = \\varepsilon$. En overflate som stråler godt, absorberer også godt.
- Wiens forskyvningslov: $\\lambda_{maks}T \\approx 2898$ µm·K – varmere legemer stråler mest ved kortere bølgelengde.
- Ofte tapes varme både ved konveksjon og stråling samtidig fra samme overflate: $\\dot Q_{tot} = hA(T_s-T_\\infty) + \\varepsilon\\sigma A(T_s^4-T_{omg}^4)$.

Ved lumped capacitance følger transient avkjøling/oppvarming av
$$T(t) - T_\\infty = (T_0 - T_\\infty)e^{-t/\\tau}, \\qquad \\tau = \\dfrac{\\rho Vc}{hA}$$
der $\\rho$ er tetthet, $V$ volum og $c$ spesifikk varmekapasitet.
- Tiden det tar å nå en gitt temperatur finner du ved å løse eksponentialligningen for $t$: $t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right)$.

## Slik løser du oppgavene
1. For stråling alene: identifiser $\\varepsilon$, $A$, og temperaturene i kelvin, og bruk Stefan–Boltzmann.
2. Kombiner med konveksjon når begge mekanismer virker fra samme overflate: legg sammen de to bidragene.
3. For transiente oppgaver: sjekk først at lumped capacitance er gyldig ($Bi < 0{,}1$, se forrige enhet), finn tidskonstanten $\\tau$, og bruk eksponentialformelen.
4. Skal du finne tiden i stedet for temperaturen, snu formelen og løs for $t$ med logaritmen.
5. Husk å regne om °C til kelvin i $T^4$-uttrykk, men °C kan brukes direkte i differansene $T-T_\\infty$ i den transiente formelen (siden 273,15 kanselleres).

### Eksempel
En liten metallkule med tidskonstant $\\tau = 90$ s avkjøles i luft på 22 °C. Den startet på 260 °C. Hvor lang tid tar det før den når 60 °C?
1. $t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -90\\ln\\!\\left(\\dfrac{60-22}{260-22}\\right) = -90\\ln\\!\\left(\\dfrac{38}{238}\\right)$.
2. $\\ln(38/238) = \\ln(0{,}1597) \\approx -1{,}834$.
3. $t \\approx -90\\cdot(-1{,}834) \\approx 165$ s.

Svar: omtrent 165 sekunder (litt under 3 minutter).

## Vanlige feil
- Å glemme å konvertere til kelvin i Stefan–Boltzmanns lov – $T^4$ er svært følsom for feil enhet.
- Å tro at stråling og konveksjon er gjensidig utelukkende. Fra en varm overflate i luft skjer ofte begge samtidig.
- Å bruke feil fortegn i eksponentialligningen, slik at temperaturen tilsynelatende øker under avkjøling.
- Å anta at emissiviteten er den samme for alle overflater. Blanke, polerte flater har ofte $\\varepsilon$ under 0,1, mens matte flater kan ha $\\varepsilon$ over 0,9.
- Å bruke lumped capacitance uten å sjekke at Biottallet faktisk er lite nok.

> Strålingstapet vokser med $T^4$ – en dobling av den absolutte temperaturen gir seksten ganger så stort strålingstap. Transiente temperaturer følger alltid en eksponentiell tilnærming mot omgivelsestemperaturen.`,
en: `## What is it about?
Radiation is heat transfer by electromagnetic waves and the only form of heat transport that works in a vacuum – it is how the sun heats the earth. Every body with a temperature above absolute zero radiates energy. Transient heat is about how a body's temperature changes over time, for example when a hot object cools down in air. As an engineer you need radiation to calculate heat loss from hot surfaces (pipes, furnaces, electronics) and transient formulas to find how long things take to heat up or cool down.

## Concepts and formulas
- Stefan–Boltzmann's law, power radiated from a gray surface: $\\dot Q_{out} = \\varepsilon\\sigma AT^4$, with $\\sigma = 5.67\\cdot10^{-8}$ W/(m²K⁴) and $T$ in kelvin.
- Net radiation loss to surroundings at temperature $T_{surr}$: $\\dot Q = \\varepsilon\\sigma A(T^4 - T_{surr}^4)$.
- Emissivity $\\varepsilon$ (0–1) says how well a surface radiates compared with a black body ($\\varepsilon = 1$). A polished, shiny metal has a low $\\varepsilon$; a matte, dark surface has a high $\\varepsilon$.
- Kirchhoff's law (simplified): for a gray surface in thermal equilibrium with its surroundings, the absorptivity equals the emissivity, $\\alpha = \\varepsilon$. A surface that radiates well also absorbs well.
- Wien's displacement law: $\\lambda_{max}T \\approx 2898$ µm·K – warmer bodies radiate most strongly at shorter wavelengths.
- Heat is often lost by both convection and radiation at the same time from the same surface: $\\dot Q_{tot} = hA(T_s-T_\\infty) + \\varepsilon\\sigma A(T_s^4-T_{surr}^4)$.

With lumped capacitance, transient cooling/heating follows
$$T(t) - T_\\infty = (T_0 - T_\\infty)e^{-t/\\tau}, \\qquad \\tau = \\dfrac{\\rho Vc}{hA}$$
where $\\rho$ is density, $V$ volume and $c$ specific heat capacity.
- The time to reach a given temperature is found by solving the exponential equation for $t$: $t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right)$.

## How to solve the problems
1. For radiation alone: identify $\\varepsilon$, $A$, and the temperatures in kelvin, and use Stefan–Boltzmann.
2. Combine with convection when both mechanisms act from the same surface: add the two contributions.
3. For transient problems: first check that lumped capacitance is valid ($Bi < 0.1$, see the previous unit), find the time constant $\\tau$, and use the exponential formula.
4. If you need the time instead of the temperature, invert the formula and solve for $t$ using the logarithm.
5. Remember to convert °C to kelvin in $T^4$ expressions, but °C can be used directly in the differences $T-T_\\infty$ in the transient formula (since the 273.15 cancels).

### Example
A small metal sphere with a time constant of $\\tau = 90$ s cools in air at 22 °C. It started at 260 °C. How long does it take to reach 60 °C?
1. $t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -90\\ln\\!\\left(\\dfrac{60-22}{260-22}\\right) = -90\\ln\\!\\left(\\dfrac{38}{238}\\right)$.
2. $\\ln(38/238) = \\ln(0.1597) \\approx -1.834$.
3. $t \\approx -90\\cdot(-1.834) \\approx 165$ s.

Answer: about 165 seconds (just under 3 minutes).

## Common mistakes
- Forgetting to convert to kelvin in Stefan–Boltzmann's law – $T^4$ is very sensitive to a wrong unit.
- Believing radiation and convection are mutually exclusive. From a hot surface in air, both usually happen at the same time.
- Using the wrong sign in the exponential equation, so the temperature seems to increase during cooling.
- Assuming the emissivity is the same for all surfaces. Shiny, polished surfaces often have $\\varepsilon$ below 0.1, while matte surfaces can have $\\varepsilon$ above 0.9.
- Using lumped capacitance without checking that the Biot number is actually small enough.

> Radiative loss grows with $T^4$ – doubling the absolute temperature gives sixteen times the radiative loss. Transient temperatures always follow an exponential approach toward the surrounding temperature.`
});

BIQ("VARME", 2, [
 ["Hva sier Kirchhoffs lov (forenklet) om sammenhengen mellom emissivitet $\\varepsilon$ og absorpsjonsevne $\\alpha$ for en gråflate i termisk likevekt med omgivelsene?",
  ["$\\varepsilon = \\alpha$", "$\\varepsilon = 1-\\alpha$", "$\\varepsilon = \\alpha^2$", "$\\varepsilon = 1/\\alpha$"],
  "En god stråler er også en god absorbent: ved termisk likevekt er emissiviteten lik absorpsjonsevnen, $\\varepsilon = \\alpha$.",
  "What does Kirchhoff's law (simplified) say about the relationship between the emissivity $\\varepsilon$ and the absorptivity $\\alpha$ of a gray surface in thermal equilibrium with its surroundings?",
  ["$\\varepsilon = \\alpha$", "$\\varepsilon = 1-\\alpha$", "$\\varepsilon = \\alpha^2$", "$\\varepsilon = 1/\\alpha$"],
  "A good radiator is also a good absorber: at thermal equilibrium the emissivity equals the absorptivity, $\\varepsilon = \\alpha$."],
 ["To identiske kuler, en svartmalt ($\\varepsilon \\approx 1$) og en blank/polert ($\\varepsilon \\approx 0{,}1$), holder samme temperatur i samme omgivelser. Hvilken taper mest varme ved stråling?",
  ["Den svartmalte kulen", "Den blanke kulen", "De taper likt", "Det avhenger bare av arealet, ikke av $\\varepsilon$"],
  "Strålingstapet er proporsjonalt med emissiviteten, $\\dot Q = \\varepsilon\\sigma A(T^4-T_{omg}^4)$. Den svartmalte kulen har omtrent ti ganger så høy $\\varepsilon$ og taper dermed mye mer varme ved stråling.",
  "Two identical spheres, one painted black ($\\varepsilon \\approx 1$) and one shiny/polished ($\\varepsilon \\approx 0.1$), are at the same temperature in the same surroundings. Which loses more heat by radiation?",
  ["The black sphere", "The shiny sphere", "They lose the same amount", "It depends only on the area, not on $\\varepsilon$"],
  "The radiative loss is proportional to the emissivity, $\\dot Q = \\varepsilon\\sigma A(T^4-T_{surr}^4)$. The black sphere has roughly ten times the emissivity and therefore loses far more heat by radiation."],
 ["Et legeme avkjøles i luft med tidskonstant $\\tau = 180$ s. Det startet på 250 °C, og omgivelsene holder 25 °C. Hvor lang tid tar det til temperaturen er 60 °C?",
  { n: 334.9, tol: rel(334.9), u: "s" },
  "$t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -180\\ln\\!\\left(\\dfrac{60-25}{250-25}\\right) = -180\\ln(35/225) \\approx -180\\cdot(-1{,}861) \\approx 335$ s.",
  "A body cools in air with a time constant of $\\tau = 180$ s. It started at 250 °C, and the surroundings are at 25 °C. How long does it take for the temperature to reach 60 °C?",
  null,
  "$t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -180\\ln\\!\\left(\\dfrac{60-25}{250-25}\\right) = -180\\ln(35/225) \\approx -180\\cdot(-1.861) \\approx 335$ s."]
]);

GEN("VARME", 2,
 // enkel/middels: tid til en gitt temperatur (invers lumped capacitance)
 () => { const tau = R.p([30, 60, 90, 120, 180, 300]), T0 = R.i(150, 400), Tinf = R.i(15, 25), frac = R.f(0.1, 0.6, 0.05);
   const Tt = Tinf + frac * (T0 - Tinf), t = -tau * Math.log(frac);
   return [T(`Et legeme avkjøles i luft med tidskonstant $\\tau = ${tau}$ s. Det startet på ${T0} °C, og omgivelsene holder ${Tinf} °C. Hvor lang tid tar det til temperaturen er ${nf(Tt, 1)} °C?`,
             `A body cools in air with a time constant of $\\tau = ${tau}$ s. It started at ${T0} °C, and the surroundings are at ${Tinf} °C. How long does it take for the temperature to reach ${nf(Tt, 1)} °C?`),
     { n: t, tol: rel(t), u: "s" },
     T(`$t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -${tau}\\ln\\!\\left(\\dfrac{${mf(Tt, 1)}-${Tinf}}{${T0}-${Tinf}}\\right) \\approx ${mf(t, 0)}$ s.`,
       `$t = -\\tau\\ln\\!\\left(\\dfrac{T-T_\\infty}{T_0-T_\\infty}\\right) = -${tau}\\ln\\!\\left(\\dfrac{${mf(Tt, 1)}-${Tinf}}{${T0}-${Tinf}}\\right) \\approx ${mf(t, 0)}$ s.`)]; },
 // eksamen: kombinert konveksjon og stråling fra samme overflate
 () => { const h = R.p([5, 8, 10, 15, 20, 30]), eps = R.f(0.2, 0.95, 0.05), A = R.f(0.2, 5, 0.1), TsC = R.i(60, 300), TinfC = R.p([15, 20, 25]);
   const Ts = TsC + 273.15, Tinf = TinfC + 273.15;
   const Qc = h * A * (TsC - TinfC), Qr = eps * SIGMA_SB * A * (Ts ** 4 - Tinf ** 4), Qt = Qc + Qr;
   return [T(`En varm overflate på ${nf(A)} m² holder ${TsC} °C i omgivelser på ${TinfC} °C. Varmeovergangstallet er $h = ${h}$ W/(m²·K) og emissiviteten $\\varepsilon = ${mf(eps, 2)}$. Hvor stort er det totale varmetapet (konveksjon og stråling)?`,
             `A hot surface of ${nf(A)} m² is at ${TsC} °C in surroundings at ${TinfC} °C. The heat transfer coefficient is $h = ${h}$ W/(m²·K) and the emissivity is $\\varepsilon = ${mf(eps, 2)}$. What is the total heat loss (convection and radiation)?`),
     { n: Qt, tol: rel(Qt), u: "W" },
     T(`Konveksjon: $\\dot Q_{konv} = hA\\Delta T = ${h}\\cdot ${mf(A)}\\cdot ${TsC - TinfC} \\approx ${mf(Qc, 1)}$ W. Stråling (i kelvin, $T_s = ${mf(Ts, 1)}$ K, $T_{omg} = ${mf(Tinf, 1)}$ K): $\\dot Q_{str} = \\varepsilon\\sigma A(T_s^4-T_{omg}^4) \\approx ${mf(Qr, 1)}$ W. Totalt: $\\dot Q = \\dot Q_{konv}+\\dot Q_{str} \\approx ${mf(Qt, 1)}$ W.`,
       `Convection: $\\dot Q_{conv} = hA\\Delta T = ${h}\\cdot ${mf(A)}\\cdot ${TsC - TinfC} \\approx ${mf(Qc, 1)}$ W. Radiation (in kelvin, $T_s = ${mf(Ts, 1)}$ K, $T_{surr} = ${mf(Tinf, 1)}$ K): $\\dot Q_{rad} = \\varepsilon\\sigma A(T_s^4-T_{surr}^4) \\approx ${mf(Qr, 1)}$ W. Total: $\\dot Q = \\dot Q_{conv}+\\dot Q_{rad} \\approx ${mf(Qt, 1)}$ W.`)]; }
);

// __SLUTT__
})();
