// ============================================================
//  add_units4.js – nye enheter i eksisterende fag:
//  MATS1600 Skrueforbindelser og sveis, ELFT2400 Stegrespons og førsteordens systemer,
//  KJEMI Gasslover, GMAT Statistikk og sannsynlighet.
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
const AS = { M8: 36.6, M10: 58.0, M12: 84.3, M16: 157, M20: 245, M24: 353 };   // spenningsareal (mm²) for metriske grovgjenger
const RE = { "8.8": 640, "10.9": 900, "12.9": 1080 };                          // flytegrense (MPa)
const RGAS = 8.314;

// ================= MATS1600: Skrueforbindelser og sveis =================
{
const U = ADDUNIT("MATS1600", "Skrueforbindelser og sveis", "Bolted and welded joints");
THEORY("MATS1600", U, {
nb: md`## Hva handler det om?
Nesten alle maskiner og stålkonstruksjoner er satt sammen med skruer eller sveis. Du må kunne sjekke at en skrue tåler strekket, at boltene i en skjøt tåler skjæret, og at en sveis er tykk og lang nok. Beregningene er enkle: kraft delt på areal, sammenlignet med hva materialet tåler.

## Begreper og formler
- **Spenningsarealet** $A_s$ er det effektive tverrsnittet i gjengene. Eksempler: M8: 36,6 mm², M10: 58,0 mm², M12: 84,3 mm², M16: 157 mm², M20: 245 mm², M24: 353 mm².
- **Strekkspenning** i en skrue:
$$\sigma = \frac{F}{A_s}$$
- **Fasthetsklasse** $a.b$: bruddgrensen er $R_m = a\cdot 100$ MPa og flytegrensen $R_e = 0{,}b\cdot R_m$. Klasse 8.8 gir $R_m = 800$ MPa og $R_e = 640$ MPa. Klasse 10.9 gir 1000 og 900 MPa.
- **Skjær** i en boltet skjøt med $n$ bolter og én skjærflate per bolt:
$$\tau = \frac{F}{n\,A}$$
- **Kilsveis:** a-målet (halsen) er omtrent $a = 0{,}7\,z$, der $z$ er kateten (beinet). Spenningen i sveisen er kraften delt på halsarealet:
$$\tau_w = \frac{F}{a\,L}$$
- **Sikkerhetsfaktor:** $n = R_e/\sigma$. Den må være større enn kravet, ofte 1,5–3.
- **Forspenning:** skruen strammes så skjøten holdes sammen. Da glipper den ikke, og skruen får mindre vekslende last (utmatting).

## Slik løser du oppgavene
1. Finn arealet: $A_s$ fra tabellen for strekk, skaftarealet $\pi d^2/4$ for skjær, $a\cdot L$ for sveis.
2. Regn spenningen: kraft i N delt på areal i mm² gir MPa.
3. Sammenlign med flytegrensen og regn ut sikkerhetsfaktoren.

### Eksempel
En M12-skrue i klasse 8.8 er belastet med 20 kN strekk.
1. $\sigma = 20\,000/84{,}3 \approx 237$ MPa.
2. Flytegrensen er 640 MPa.
3. Sikkerhetsfaktoren er $640/237 \approx 2{,}7$. Det holder godt.

## Vanlige feil
- Å bruke hele diameteren i stedet for spenningsarealet i gjengene.
- Å glemme å dele på antall bolter eller antall skjærflater.
- Å bruke kateten $z$ i stedet for a-målet i sveisespenningen.
- Å blande kN og N. Husk at N/mm² = MPa.

> Spenning = kraft/areal (N/mm² = MPa). Sikkerhetsfaktor = flytegrense/spenning.`,
en: md`## What is it about?
Almost all machines and steel structures are joined with bolts or welds. You must be able to check that a bolt can take the tension, that the bolts in a joint can take the shear, and that a weld is thick and long enough. The calculations are simple: force divided by area, compared with what the material can take.

## Concepts and formulas
- The **tensile stress area** $A_s$ is the effective cross-section in the threads. Examples: M8: 36.6 mm², M10: 58.0 mm², M12: 84.3 mm², M16: 157 mm², M20: 245 mm², M24: 353 mm².
- **Tensile stress** in a bolt:
$$\sigma = \frac{F}{A_s}$$
- **Property class** $a.b$: the tensile strength is $R_m = a\cdot 100$ MPa and the yield strength $R_e = 0.b\cdot R_m$. Class 8.8 gives $R_m = 800$ MPa and $R_e = 640$ MPa. Class 10.9 gives 1000 and 900 MPa.
- **Shear** in a bolted joint with $n$ bolts and one shear plane per bolt:
$$\tau = \frac{F}{n\,A}$$
- **Fillet weld:** the throat thickness is about $a = 0.7\,z$, where $z$ is the leg length. The stress in the weld is the force divided by the throat area:
$$\tau_w = \frac{F}{a\,L}$$
- **Safety factor:** $n = R_e/\sigma$. It must exceed the requirement, often 1.5–3.
- **Preload:** the bolt is tightened so the joint is clamped together. Then it doesn't slip, and the bolt sees less alternating load (fatigue).

## How to solve the problems
1. Find the area: $A_s$ from the table for tension, the shank area $\pi d^2/4$ for shear, $a\cdot L$ for a weld.
2. Compute the stress: force in N divided by area in mm² gives MPa.
3. Compare with the yield strength and compute the safety factor.

### Example
An M12 bolt of class 8.8 is loaded with 20 kN of tension.
1. $\sigma = 20\,000/84.3 \approx 237$ MPa.
2. The yield strength is 640 MPa.
3. The safety factor is $640/237 \approx 2.7$. That is comfortably enough.

## Common mistakes
- Using the full diameter instead of the stress area in the threads.
- Forgetting to divide by the number of bolts or shear planes.
- Using the leg $z$ instead of the throat $a$ in the weld stress.
- Mixing kN and N. Remember that N/mm² = MPa.

> Stress = force/area (N/mm² = MPa). Safety factor = yield strength/stress.`
});
BIQ("MATS1600", U, [
  ["En M12-skrue (spenningsareal 84,3 mm²) er belastet med 20 kN strekk. Hvor stor er strekkspenningen?",
   { n: 20000 / 84.3, tol: 1, u: "MPa" },
   S`$\sigma = F/A_s = 20\,000/84{,}3 \approx 237{,}2$ MPa.`,
   "An M12 bolt (stress area 84.3 mm²) is loaded with 20 kN of tension. What is the tensile stress?", null,
   S`$\sigma = F/A_s = 20\,000/84.3 \approx 237.2$ MPa.`],
  ["Hva er flytegrensen til en skrue i fasthetsklasse 8.8?",
   { n: 640, tol: 1, u: "MPa" },
   S`8.8 betyr $R_m = 8\cdot 100 = 800$ MPa og $R_e = 0{,}8\cdot 800 = 640$ MPa.`,
   "What is the yield strength of a bolt of property class 8.8?", null,
   S`8.8 means $R_m = 8\cdot 100 = 800$ MPa and $R_e = 0.8\cdot 800 = 640$ MPa.`],
  ["Spenningen i en skrue av klasse 8.8 er 200 MPa. Hva er sikkerhetsfaktoren mot flyt?",
   { n: 3.2, tol: 0.01, u: "" },
   S`$n = R_e/\sigma = 640/200 = 3{,}2$.`,
   "The stress in a class 8.8 bolt is 200 MPa. What is the safety factor against yielding?", null,
   S`$n = R_e/\sigma = 640/200 = 3.2$.`],
  ["En skjøt har 4 bolter med skaftareal 113 mm² og én skjærflate hver. Den overfører 40 kN. Hvor stor er skjærspenningen i boltene?",
   { n: 40000 / (4 * 113), tol: 0.5, u: "MPa" },
   S`$\tau = \dfrac{F}{nA} = \dfrac{40\,000}{4\cdot 113} \approx 88{,}5$ MPa.`,
   "A joint has 4 bolts with a shank area of 113 mm² and one shear plane each. It transmits 40 kN. What is the shear stress in the bolts?", null,
   S`$\tau = \dfrac{F}{nA} = \dfrac{40\,000}{4\cdot 113} \approx 88.5$ MPa.`],
  ["En kilsveis har katet (bein) $z = 6$ mm. Omtrent hvor stort er a-målet?",
   { n: 4.2, tol: 0.05, u: "mm" },
   S`$a \approx 0{,}7\,z = 0{,}7\cdot 6 = 4{,}2$ mm.`,
   "A fillet weld has a leg length of $z = 6$ mm. Roughly how large is the throat thickness?", null,
   S`$a \approx 0.7\,z = 0.7\cdot 6 = 4.2$ mm.`],
  ["To kilsveiser med a-mål 4 mm og lengde 100 mm hver skal overføre 50 kN. Hvor stor blir spenningen i sveisen?",
   { n: 62.5, tol: 0.2, u: "MPa" },
   S`Halsarealet er $A = 2\cdot a\cdot L = 2\cdot 4\cdot 100 = 800$ mm². $\tau_w = 50\,000/800 = 62{,}5$ MPa.`,
   "Two fillet welds with a throat of 4 mm and a length of 100 mm each must transmit 50 kN. What is the stress in the weld?", null,
   S`The throat area is $A = 2\cdot a\cdot L = 2\cdot 4\cdot 100 = 800$ mm². $\tau_w = 50\,000/800 = 62.5$ MPa.`],
  ["Hvorfor forspennes skruer i en viktig skjøt?",
   ["For at skjøten skal holdes sammen og skruen få mindre vekslende last", "For at skruen skal bli lettere å løsne", "For å redusere spenningsarealet", "Forspenning brukes bare på sveiste skjøter"],
   "Med forspenning klemmes delene sammen. Ytre last tas da mest av at klemkraften avtar, og skruen merker bare en liten del av variasjonen. Det gir mye bedre utmattingsfasthet.",
   "Why are bolts preloaded in an important joint?",
   ["So the joint stays clamped and the bolt sees less alternating load", "So the bolt is easier to loosen", "To reduce the stress area", "Preload is only used on welded joints"],
   "With preload the parts are clamped together. External load is then mostly taken by a reduction of the clamping force, and the bolt only sees a small part of the variation. That gives much better fatigue strength."],
  ["Hva betyr fasthetsklasse 10.9 på en skrue?",
   [S`$R_m = 1000$ MPa og $R_e = 900$ MPa`, S`$R_m = 10$ MPa og $R_e = 9$ MPa`, S`$R_m = 900$ MPa og $R_e = 1000$ MPa`, "Skruen er 10,9 mm tykk"],
   S`Det første tallet ganget med 100 er bruddgrensen: 1000 MPa. Tallet etter punktumet er forholdet mellom flytegrense og bruddgrense: $0{,}9\cdot 1000 = 900$ MPa.`,
   "What does property class 10.9 on a bolt mean?",
   [S`$R_m = 1000$ MPa and $R_e = 900$ MPa`, S`$R_m = 10$ MPa and $R_e = 9$ MPa`, S`$R_m = 900$ MPa and $R_e = 1000$ MPa`, "The bolt is 10.9 mm thick"],
   S`The first number times 100 is the tensile strength: 1000 MPa. The number after the point is the ratio of yield to tensile strength: $0.9\cdot 1000 = 900$ MPa.`]
]);
GEN("MATS1600", U,
 () => { const m = R.p(Object.keys(AS)), F = R.i(5, 120), s = F * 1000 / AS[m];
   return [T(`En ${m}-skrue (spenningsareal ${nf(AS[m])} mm²) er belastet med ${F} kN strekk. Hvor stor er strekkspenningen?`, `An ${m} bolt (stress area ${nf(AS[m])} mm²) is loaded with ${F} kN of tension. What is the tensile stress?`),
     { n: s, tol: rel(s), u: "MPa" },
     S`$\sigma = F/A_s = ${F * 1000}/${mf(AS[m])} \approx ${mf(s, 1)}$ MPa.`]; },
 () => { const cl = R.p(Object.keys(RE)), s = R.i(100, 600), n = RE[cl] / s;
   return [T(`Spenningen i en skrue av klasse ${cl} er ${s} MPa. Hva er sikkerhetsfaktoren mot flyt?`, `The stress in a class ${cl} bolt is ${s} MPa. What is the safety factor against yielding?`),
     { n, tol: rel(n), u: "" },
     T(S`Klasse ${cl} har $R_e = ${RE[cl]}$ MPa, så $n = ${RE[cl]}/${s} \approx ${mf(n)}$.`, S`Class ${cl} has $R_e = ${RE[cl]}$ MPa, so $n = ${RE[cl]}/${s} \approx ${mf(n)}$.`)]; },
 () => { const d = R.p([8, 10, 12, 16, 20]), n = R.i(2, 8), F = R.i(10, 150), A = Math.PI * d * d / 4, tau = F * 1000 / (n * A);
   return [T(`En skjøt har ${n} bolter med skaftdiameter ${d} mm og én skjærflate hver. Den overfører ${F} kN. Hvor stor er skjærspenningen i boltene?`,
             `A joint has ${n} bolts with a shank diameter of ${d} mm and one shear plane each. It transmits ${F} kN. What is the shear stress in the bolts?`),
     { n: tau, tol: rel(tau), u: "MPa" },
     T(S`$A = \pi d^2/4 = ${mf(A, 1)}$ mm². $\tau = \dfrac{${F * 1000}}{${n}\cdot ${mf(A, 1)}} \approx ${mf(tau, 1)}$ MPa.`, S`$A = \pi d^2/4 = ${mf(A, 1)}$ mm². $\tau = \dfrac{${F * 1000}}{${n}\cdot ${mf(A, 1)}} \approx ${mf(tau, 1)}$ MPa.`)]; },
 () => { const z = R.p([4, 5, 6, 8, 10]), L = R.p([50, 80, 100, 120, 150, 200]), k = R.p([1, 2]), F = R.i(10, 150), a = 0.7 * z, tau = F * 1000 / (k * a * L);
   return [T(`${k === 1 ? "En kilsveis" : "To kilsveiser"} med katet ${z} mm og lengde ${L} mm${k === 2 ? " hver" : ""} overfører ${F} kN. Hvor stor er spenningen i sveisen (bruk $a = 0{,}7z$)?`,
             `${k === 1 ? "A fillet weld" : "Two fillet welds"} with a leg of ${z} mm and a length of ${L} mm${k === 2 ? " each" : ""} transmit${k === 1 ? "s" : ""} ${F} kN. What is the stress in the weld (use $a = 0.7z$)?`),
     { n: tau, tol: rel(tau), u: "MPa" },
     T(S`$a = 0{,}7\cdot ${z} = ${mf(a)}$ mm. $A = ${k}\cdot ${mf(a)}\cdot ${L} = ${mf(k * a * L)}$ mm², så $\tau_w = ${F * 1000}/${mf(k * a * L)} \approx ${mf(tau, 1)}$ MPa.`,
       S`$a = 0.7\cdot ${z} = ${mf(a)}$ mm. $A = ${k}\cdot ${mf(a)}\cdot ${L} = ${mf(k * a * L)}$ mm², so $\tau_w = ${F * 1000}/${mf(k * a * L)} \approx ${mf(tau, 1)}$ MPa.`)]; },
 () => { const m = R.p(["M10", "M12", "M16", "M20"]), cl = R.p(["8.8", "10.9"]), sf = R.p([2, 2.5, 3]), F = R.i(40, 400), per = RE[cl] / sf * AS[m] / 1000, n = Math.ceil(F / per);
   return [T(`En skjøt skal ta ${F} kN strekk, fordelt likt på ${m}-skruer i klasse ${cl} (spenningsareal ${nf(AS[m])} mm²). Hvor mange skruer trengs med sikkerhetsfaktor ${nf(sf)}?`,
             `A joint must carry ${F} kN of tension, shared equally by ${m} bolts of class ${cl} (stress area ${nf(AS[m])} mm²). How many bolts are needed with a safety factor of ${nf(sf)}?`),
     { n, tol: 0, u: "stk" },
     T(S`Tillatt spenning: $${RE[cl]}/${mf(sf)} = ${mf(RE[cl] / sf, 1)}$ MPa. Én skrue tåler $${mf(RE[cl] / sf, 1)}\cdot ${mf(AS[m])} \approx ${mf(per, 1)}$ kN. $${F}/${mf(per, 1)} \approx ${mf(F / per)}$, så det trengs ${n} skruer.`,
       S`Allowed stress: $${RE[cl]}/${mf(sf)} = ${mf(RE[cl] / sf, 1)}$ MPa. One bolt carries $${mf(RE[cl] / sf, 1)}\cdot ${mf(AS[m])} \approx ${mf(per, 1)}$ kN. $${F}/${mf(per, 1)} \approx ${mf(F / per)}$, so ${n} bolts are needed.`)]; }
);
}

// ================= ELFT2400: Stegrespons og førsteordens systemer =================
{
const U = ADDUNIT("ELFT2400", "Stegrespons og førsteordens systemer", "Step response and first-order systems");
THEORY("ELFT2400", U, {
nb: md`## Hva handler det om?
Mange prosesser reagerer på samme måte når du endrer inngangen brått: en vannkoker som slås på, en tank som fylles, en motor som får spenning. Utgangen vokser raskt først og flater så ut mot en ny verdi. Dette er et **førsteordens system**, og det beskrives fullt ut av to tall: **forsterkningen** $K$ og **tidskonstanten** $\tau$.

## Begreper og formler
- Overføringsfunksjon:
$$G(s) = \frac{K}{\tau s + 1}$$
- **Stegrespons:** når inngangen hopper med $A$ ved $t = 0$, blir utgangen
$$y(t) = K A\,\bigl(1 - e^{-t/\tau}\bigr)$$
- **Sluttverdi:** $y(\infty) = KA$. Forsterkningen $K$ er endringen i utgang delt på endringen i inngang når alt har stabilisert seg.
- **Tidskonstanten** $\tau$ er tiden det tar å nå 63,2 % av endringen. Etter $3\tau$ er du på 95 %, etter $4\tau$ på 98 % og etter $5\tau$ på 99,3 %.
- **Stigetid** (fra 10 % til 90 %): $t_r = \tau\ln 9 \approx 2{,}2\,\tau$.
- **RC-krets:** $\tau = RC$. En termisk prosess: $\tau$ = termisk kapasitans ganger termisk motstand.
- Tid for å nå en andel $p$ av sluttverdien: $t = -\tau\ln(1 - p)$.

## Slik løser du oppgavene
1. Les av $K$ og $\tau$ fra $G(s)$. Pass på at nevneren står på formen $\tau s + 1$ (del på konstantleddet om nødvendig).
2. Sluttverdi: $KA$. Verdi ved tiden $t$: $KA(1 - e^{-t/\tau})$.
3. Tid til en viss andel: $t = -\tau\ln(1-p)$.

### Eksempel
$G(s) = \dfrac{5}{2s + 1}$, og inngangen hopper fra 0 til 3.
1. $K = 5$ og $\tau = 2$ s.
2. Sluttverdien er $5\cdot 3 = 15$.
3. Etter 2 s er utgangen $15\,(1 - e^{-1}) \approx 9{,}48$, altså 63,2 % av veien.
4. Innsvingningstid til 98 %: $4\tau = 8$ s.

## Vanlige feil
- Å lese av feil tidskonstant når nevneren ikke er normalisert: $\dfrac{10}{4s + 2} = \dfrac{5}{2s + 1}$ gir $\tau = 2$, ikke 4.
- Å glemme å gange med steghøyden $A$.
- Å blande 63 % (én tidskonstant) og 98 % (fire tidskonstanter).

> Etter én tidskonstant: 63 %. Etter fire: 98 %. Sluttverdi: $K$ ganger steget.`,
en: md`## What is it about?
Many processes react in the same way when you change the input abruptly: a kettle that is switched on, a tank that fills, a motor that gets voltage. The output rises quickly at first and then levels off towards a new value. This is a **first-order system**, and it is fully described by two numbers: the **gain** $K$ and the **time constant** $\tau$.

## Concepts and formulas
- Transfer function:
$$G(s) = \frac{K}{\tau s + 1}$$
- **Step response:** when the input jumps by $A$ at $t = 0$, the output becomes
$$y(t) = K A\,\bigl(1 - e^{-t/\tau}\bigr)$$
- **Final value:** $y(\infty) = KA$. The gain $K$ is the change in output divided by the change in input once everything has settled.
- The **time constant** $\tau$ is the time it takes to reach 63.2 % of the change. After $3\tau$ you are at 95 %, after $4\tau$ at 98 % and after $5\tau$ at 99.3 %.
- **Rise time** (from 10 % to 90 %): $t_r = \tau\ln 9 \approx 2.2\,\tau$.
- **RC circuit:** $\tau = RC$. A thermal process: $\tau$ = thermal capacitance times thermal resistance.
- Time to reach a fraction $p$ of the final value: $t = -\tau\ln(1 - p)$.

## How to solve the problems
1. Read $K$ and $\tau$ from $G(s)$. Make sure the denominator has the form $\tau s + 1$ (divide by the constant term if needed).
2. Final value: $KA$. Value at time $t$: $KA(1 - e^{-t/\tau})$.
3. Time to a given fraction: $t = -\tau\ln(1-p)$.

### Example
$G(s) = \dfrac{5}{2s + 1}$, and the input jumps from 0 to 3.
1. $K = 5$ and $\tau = 2$ s.
2. The final value is $5\cdot 3 = 15$.
3. After 2 s the output is $15\,(1 - e^{-1}) \approx 9.48$, i.e. 63.2 % of the way.
4. Settling time to 98 %: $4\tau = 8$ s.

## Common mistakes
- Reading the wrong time constant when the denominator is not normalized: $\dfrac{10}{4s + 2} = \dfrac{5}{2s + 1}$ gives $\tau = 2$, not 4.
- Forgetting to multiply by the step size $A$.
- Mixing up 63 % (one time constant) and 98 % (four time constants).

> After one time constant: 63 %. After four: 98 %. Final value: $K$ times the step.`
});
BIQ("ELFT2400", U, [
  [S`$G(s) = \dfrac{5}{2s + 1}$ får et steg på 3 ved $t = 0$. Hva blir sluttverdien til utgangen?`,
   { n: 15, tol: 0.01, u: "" },
   S`$K = 5$, så $y(\infty) = K\cdot A = 5\cdot 3 = 15$.`,
   S`$G(s) = \dfrac{5}{2s + 1}$ gets a step of 3 at $t = 0$. What is the final value of the output?`, null,
   S`$K = 5$, so $y(\infty) = K\cdot A = 5\cdot 3 = 15$.`],
  ["Et førsteordens system har tidskonstant 4 s. Hvor lang tid tar det å nå 63,2 % av endringen etter et steg?",
   { n: 4, tol: 0.01, u: "s" },
   S`Det er definisjonen av tidskonstanten: etter $t = \tau = 4$ s er $1 - e^{-1} \approx 0{,}632$ av endringen gjort.`,
   "A first-order system has a time constant of 4 s. How long does it take to reach 63.2 % of the change after a step?", null,
   S`That is the definition of the time constant: after $t = \tau = 4$ s, $1 - e^{-1} \approx 0.632$ of the change is done.`],
  [S`En RC-krets har $R = 10$ k$\Omega$ og $C = 100$ µF. Hva er tidskonstanten?`,
   { n: 1, tol: 0.01, u: "s" },
   S`$\tau = RC = 10\,000\cdot 100\cdot 10^{-6} = 1$ s.`,
   S`An RC circuit has $R = 10$ k$\Omega$ and $C = 100$ µF. What is the time constant?`, null,
   S`$\tau = RC = 10\,000\cdot 100\cdot 10^{-6} = 1$ s.`],
  [S`$G(s) = \dfrac{2}{\tau s + 1}$ får et enhetssteg. Hva er utgangen ved $t = \tau$?`,
   { n: 2 * (1 - Math.exp(-1)), tol: 0.005, u: "" },
   S`$y(\tau) = K(1 - e^{-1}) = 2\cdot 0{,}632 \approx 1{,}264$.`,
   S`$G(s) = \dfrac{2}{\tau s + 1}$ gets a unit step. What is the output at $t = \tau$?`, null,
   S`$y(\tau) = K(1 - e^{-1}) = 2\cdot 0.632 \approx 1.264$.`],
  ["Et førsteordens system har tidskonstant 3 s. Omtrent hvor lang tid tar det å komme innenfor 2 % av sluttverdien?",
   { n: 12, tol: 0.2, u: "s" },
   S`98 % nås etter omtrent $4\tau = 4\cdot 3 = 12$ s.`,
   "A first-order system has a time constant of 3 s. Roughly how long does it take to get within 2 % of the final value?", null,
   S`98 % is reached after about $4\tau = 4\cdot 3 = 12$ s.`],
  [S`Hva er forsterkningen $K$ i et førsteordens system?`,
   ["Endringen i utgang delt på endringen i inngang når alt har stabilisert seg", "Hvor fort utgangen endrer seg i starten", "Tiden det tar å nå 63 %", "Største verdi utgangen kan få uansett inngang"],
   S`$K = \Delta y/\Delta u$ i stasjonær tilstand. Det sier hvor mye utgangen til slutt endres, mens $\tau$ sier hvor fort det skjer.`,
   S`What is the gain $K$ of a first-order system?`,
   ["The change in output divided by the change in input once everything has settled", "How fast the output changes at the start", "The time it takes to reach 63 %", "The largest value the output can have for any input"],
   S`$K = \Delta y/\Delta u$ in steady state. It tells how much the output finally changes, while $\tau$ tells how fast it happens.`],
  ["Hva er stigetiden (10 % til 90 %) for et førsteordens system med tidskonstant 5 s?",
   { n: 5 * Math.log(9), tol: 0.06, u: "s" },
   S`$t_r = \tau\ln 9 \approx 2{,}197\cdot 5 \approx 10{,}99$ s.`,
   "What is the rise time (10 % to 90 %) of a first-order system with a time constant of 5 s?", null,
   S`$t_r = \tau\ln 9 \approx 2.197\cdot 5 \approx 10.99$ s.`],
  [S`$G(s) = \dfrac{1}{2s + 1}$ får et steg på 10 ved $t = 0$. Hva er utgangen etter 2 s?`,
   { n: 10 * (1 - Math.exp(-1)), tol: 0.02, u: "" },
   S`$\tau = 2$ s, så $y(2) = 10\,(1 - e^{-2/2}) = 10\cdot 0{,}632 \approx 6{,}32$.`,
   S`$G(s) = \dfrac{1}{2s + 1}$ gets a step of 10 at $t = 0$. What is the output after 2 s?`, null,
   S`$\tau = 2$ s, so $y(2) = 10\,(1 - e^{-2/2}) = 10\cdot 0.632 \approx 6.32$.`]
]);
GEN("ELFT2400", U,
 () => { const K = R.f(0.5, 10, 0.5), tau = R.f(0.5, 20, 0.5), A = R.i(1, 20), y = K * A;
   return [T(S`$G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$ får et steg på ${A}. Hva blir sluttverdien til utgangen?`, S`$G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$ gets a step of ${A}. What is the final value of the output?`),
     { n: y, tol: rel(y), u: "" },
     S`$y(\infty) = KA = ${mf(K)}\cdot ${A} = ${mf(y)}$.`]; },
 () => { const K = R.f(0.5, 5, 0.5), tau = R.f(1, 10, 0.5), A = R.i(1, 20), t = R.f(0.5, 25, 0.5), y = K * A * (1 - Math.exp(-t / tau));
   return [T(S`$G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$ får et steg på ${A} ved $t = 0$. Hva er utgangen ved $t = ${mf(t)}$ s?`, S`$G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$ gets a step of ${A} at $t = 0$. What is the output at $t = ${mf(t)}$ s?`),
     { n: y, tol: rel(y, 0.01, 0.01), u: "" },
     S`$y = ${mf(K * A)}\,\bigl(1 - e^{-${mf(t)}/${mf(tau)}}\bigr) \approx ${mf(y, 3)}$.`]; },
 () => { const Rk = R.p([1, 2.2, 4.7, 10, 22, 47, 100]), C = R.p([1, 10, 22, 47, 100, 220, 470, 1000]), tau = Rk * 1000 * C * 1e-6;
   return [T(S`En RC-krets har $R = ${mf(Rk)}$ k$\Omega$ og $C = ${C}$ µF. Hva er tidskonstanten?`, S`An RC circuit has $R = ${mf(Rk)}$ k$\Omega$ and $C = ${C}$ µF. What is the time constant?`),
     { n: tau, tol: rel(tau), u: "s" },
     S`$\tau = RC = ${mf(Rk * 1000, 0)}\cdot ${C}\cdot 10^{-6} = ${mf(tau, 4)}$ s.`]; },
 () => { const tau = R.f(0.5, 15, 0.5), p = R.p([0.5, 0.632, 0.8, 0.9, 0.95, 0.99]), t = -tau * Math.log(1 - p);
   return [T(`Et førsteordens system har tidskonstant ${nf(tau)} s. Hvor lang tid tar det å nå ${nf(p * 100, 1)} % av sluttverdien etter et steg?`, `A first-order system has a time constant of ${nf(tau)} s. How long does it take to reach ${nf(p * 100, 1)} % of the final value after a step?`),
     { n: t, tol: rel(t), u: "s" },
     S`$t = -\tau\ln(1 - p) = -${mf(tau)}\ln(${mf(1 - p, 3)}) \approx ${mf(t)}$ s.`]; },
 () => { const K2 = R.i(2, 20), a = R.i(2, 8), b = R.p([2, 4, 5, 10]), K = K2 / b, tau = a / b;
   return [T(S`Hva er tidskonstanten til $G(s) = \dfrac{${K2}}{${a}s + ${b}}$?`, S`What is the time constant of $G(s) = \dfrac{${K2}}{${a}s + ${b}}$?`),
     { n: tau, tol: rel(tau), u: "s" },
     T(S`Del teller og nevner på ${b}: $G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$, så $\tau = ${mf(tau)}$ s.`, S`Divide numerator and denominator by ${b}: $G(s) = \dfrac{${mf(K)}}{${mf(tau)}s + 1}$, so $\tau = ${mf(tau)}$ s.`)]; }
);
}

// ================= KJEMI: Gasslover =================
{
const U = ADDUNIT("KJEMI", "Gasslover", "Gas laws");
THEORY("KJEMI", U, {
nb: md`## Hva handler det om?
Gasser i trykkflasker, dekk, motorer og ventilasjonsanlegg følger noen få, enkle lover. Kjenner du tre av størrelsene trykk, volum, temperatur og stoffmengde, kan du regne ut den fjerde.

## Begreper og formler
- **Idealgassloven** (SI-enheter: Pa, m³, K):
$$pV = nRT, \qquad R = 8{,}314\ \text{J/(mol K)}$$
- **Kombinert gasslov** for en fast mengde gass:
$$\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}$$
- Spesialtilfeller: konstant temperatur gir $p_1V_1 = p_2V_2$ (Boyle). Konstant trykk gir $V_1/T_1 = V_2/T_2$. Konstant volum gir $p_1/T_1 = p_2/T_2$.
- **Molvolum** ved 0 °C og 1 atm (101,3 kPa): 22,4 L/mol.
- **Partialtrykk** (Dalton): i en blanding er trykket til hver gass lik andelen ganger totaltrykket. Luft er omtrent 21 % oksygen.
- **Tetthet** til en gass: $\rho = \dfrac{pM}{RT}$, der $M$ er molar masse i kg/mol.

## Slik løser du oppgavene
1. Gjør om til SI: kPa til Pa, L til m³ (del på 1000), °C til K (legg til 273,15).
2. Bruk absolutt trykk, ikke overtrykk.
3. Sett inn i riktig lov og løs for den ukjente.

### Eksempel
Et bildekk har 200 kPa absolutt trykk ved 10 °C. Hva blir trykket ved 40 °C (samme volum)?
1. $T_1 = 283{,}15$ K og $T_2 = 313{,}15$ K.
2. $p_2 = p_1\cdot T_2/T_1 = 200\cdot 313{,}15/283{,}15$.
3. $p_2 \approx 221$ kPa.

## Vanlige feil
- Å bruke grader Celsius. Da får du feil svar, og ved 0 °C deling på null.
- Å bruke overtrykket fra en dekktrykkmåler i stedet for absolutt trykk.
- Å bruke liter og kPa sammen med $R = 8{,}314$ uten å gjøre om.

> $pV = nRT$ med Pa, m³ og kelvin. Samme gass før og etter: $pV/T$ er konstant.`,
en: md`## What is it about?
Gases in pressure bottles, tyres, engines and ventilation systems follow a few simple laws. If you know three of the quantities pressure, volume, temperature and amount of substance, you can calculate the fourth.

## Concepts and formulas
- The **ideal gas law** (SI units: Pa, m³, K):
$$pV = nRT, \qquad R = 8.314\ \text{J/(mol K)}$$
- **Combined gas law** for a fixed amount of gas:
$$\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}$$
- Special cases: constant temperature gives $p_1V_1 = p_2V_2$ (Boyle). Constant pressure gives $V_1/T_1 = V_2/T_2$. Constant volume gives $p_1/T_1 = p_2/T_2$.
- **Molar volume** at 0 °C and 1 atm (101.3 kPa): 22.4 L/mol.
- **Partial pressure** (Dalton): in a mixture, the pressure of each gas equals its fraction times the total pressure. Air is about 21 % oxygen.
- **Density** of a gas: $\rho = \dfrac{pM}{RT}$, where $M$ is the molar mass in kg/mol.

## How to solve the problems
1. Convert to SI: kPa to Pa, L to m³ (divide by 1000), °C to K (add 273.15).
2. Use absolute pressure, not gauge pressure.
3. Insert into the right law and solve for the unknown.

### Example
A car tyre has an absolute pressure of 200 kPa at 10 °C. What is the pressure at 40 °C (same volume)?
1. $T_1 = 283.15$ K and $T_2 = 313.15$ K.
2. $p_2 = p_1\cdot T_2/T_1 = 200\cdot 313.15/283.15$.
3. $p_2 \approx 221$ kPa.

## Common mistakes
- Using degrees Celsius. That gives a wrong answer, and division by zero at 0 °C.
- Using the gauge pressure from a tyre gauge instead of absolute pressure.
- Using litres and kPa together with $R = 8.314$ without converting.

> $pV = nRT$ with Pa, m³ and kelvin. Same gas before and after: $pV/T$ is constant.`
});
BIQ("KJEMI", U, [
  ["Hvor mange mol gass er det i 24 L ved 100 kPa og 20 °C?",
   { n: 100000 * 0.024 / (RGAS * 293.15), tol: 0.005, u: "mol" },
   S`$n = \dfrac{pV}{RT} = \dfrac{100\,000\cdot 0{,}024}{8{,}314\cdot 293{,}15} \approx 0{,}985$ mol.`,
   "How many moles of gas are in 24 L at 100 kPa and 20 °C?", null,
   S`$n = \dfrac{pV}{RT} = \dfrac{100\,000\cdot 0.024}{8.314\cdot 293.15} \approx 0.985$ mol.`],
  ["2,0 L gass ved 100 kPa presses sammen til 0,5 L ved samme temperatur. Hva blir trykket?",
   { n: 400, tol: 0.5, u: "kPa" },
   S`Boyle: $p_2 = p_1 V_1/V_2 = 100\cdot 2{,}0/0{,}5 = 400$ kPa.`,
   "2.0 L of gas at 100 kPa is compressed to 0.5 L at the same temperature. What is the pressure?", null,
   S`Boyle: $p_2 = p_1 V_1/V_2 = 100\cdot 2.0/0.5 = 400$ kPa.`],
  ["1,0 L gass ved 273 K varmes opp til 546 K ved konstant trykk. Hva blir volumet?",
   { n: 2, tol: 0.01, u: "L" },
   S`$V_2 = V_1 T_2/T_1 = 1{,}0\cdot 546/273 = 2{,}0$ L. Dobbel absolutt temperatur gir dobbelt volum.`,
   "1.0 L of gas at 273 K is heated to 546 K at constant pressure. What is the volume?", null,
   S`$V_2 = V_1 T_2/T_1 = 1.0\cdot 546/273 = 2.0$ L. Double the absolute temperature gives double the volume.`],
  ["Hvilken temperaturenhet må brukes i gasslovene?",
   ["Kelvin", "Grader Celsius", "Grader Fahrenheit", "Hvilken som helst, så lenge den er lik på begge sider"],
   "Gasslovene bygger på absolutt temperatur. Med Celsius blir forholdet $T_2/T_1$ feil, og ved 0 °C blir det deling på null.",
   "Which temperature unit must be used in the gas laws?",
   ["Kelvin", "Degrees Celsius", "Degrees Fahrenheit", "Any, as long as it is the same on both sides"],
   "The gas laws are based on absolute temperature. With Celsius the ratio $T_2/T_1$ is wrong, and at 0 °C you get division by zero."],
  ["Hvor stort volum tar 2,0 mol idealgass ved 0 °C og 1 atm?",
   { n: 44.8, tol: 0.1, u: "L" },
   S`Molvolumet er 22,4 L/mol, så $V = 2{,}0\cdot 22{,}4 = 44{,}8$ L.`,
   "What volume do 2.0 mol of ideal gas occupy at 0 °C and 1 atm?", null,
   S`The molar volume is 22.4 L/mol, so $V = 2.0\cdot 22.4 = 44.8$ L.`],
  ["Luft er 21 % oksygen. Hva er partialtrykket til oksygen ved 101,3 kPa?",
   { n: 0.21 * 101.3, tol: 0.05, u: "kPa" },
   S`$p_{O_2} = 0{,}21\cdot 101{,}3 \approx 21{,}27$ kPa.`,
   "Air is 21 % oxygen. What is the partial pressure of oxygen at 101.3 kPa?", null,
   S`$p_{O_2} = 0.21\cdot 101.3 \approx 21.27$ kPa.`],
  ["Hva er tettheten til luft (M = 0,029 kg/mol) ved 101 325 Pa og 20 °C?",
   { n: 101325 * 0.029 / (RGAS * 293.15), tol: 0.005, u: "kg/m³" },
   S`$\rho = \dfrac{pM}{RT} = \dfrac{101\,325\cdot 0{,}029}{8{,}314\cdot 293{,}15} \approx 1{,}206$ kg/m³.`,
   "What is the density of air (M = 0.029 kg/mol) at 101,325 Pa and 20 °C?", null,
   S`$\rho = \dfrac{pM}{RT} = \dfrac{101\,325\cdot 0.029}{8.314\cdot 293.15} \approx 1.206$ kg/m³.`],
  ["Et bildekk har 200 kPa absolutt trykk ved 10 °C. Hva blir trykket ved 40 °C hvis volumet er det samme?",
   { n: 200 * 313.15 / 283.15, tol: 0.3, u: "kPa" },
   S`$p_2 = p_1 T_2/T_1 = 200\cdot 313{,}15/283{,}15 \approx 221{,}2$ kPa.`,
   "A car tyre has an absolute pressure of 200 kPa at 10 °C. What is the pressure at 40 °C if the volume is the same?", null,
   S`$p_2 = p_1 T_2/T_1 = 200\cdot 313.15/283.15 \approx 221.2$ kPa.`]
]);
GEN("KJEMI", U,
 () => { const p = R.i(80, 500), V = R.f(0.5, 50, 0.5), tC = R.i(-20, 80), n = p * 1000 * V / 1000 / (RGAS * (tC + 273.15));
   return [T(`Hvor mange mol gass er det i ${nf(V)} L ved ${p} kPa og ${tC} °C?`, `How many moles of gas are in ${nf(V)} L at ${p} kPa and ${tC} °C?`),
     { n, tol: rel(n), u: "mol" },
     S`$n = \dfrac{pV}{RT} = \dfrac{${p * 1000}\cdot ${mf(V / 1000, 4)}}{8{,}314\cdot ${mf(tC + 273.15)}} \approx ${mf(n, 3)}$ mol.`.replace(/8\{,\}314/g, LANG === "en" ? "8.314" : "8{,}314")]; },
 () => { const p1 = R.i(80, 300), V1 = R.f(0.5, 10, 0.5), V2 = R.f(0.2, 20, 0.2), p2 = p1 * V1 / V2;
   return [T(`${nf(V1)} L gass ved ${p1} kPa får volumet endret til ${nf(V2)} L ved samme temperatur. Hva blir trykket?`, `${nf(V1)} L of gas at ${p1} kPa has its volume changed to ${nf(V2)} L at the same temperature. What is the pressure?`),
     { n: p2, tol: rel(p2), u: "kPa" },
     S`$p_2 = p_1 V_1/V_2 = ${p1}\cdot ${mf(V1)}/${mf(V2)} \approx ${mf(p2, 1)}$ kPa.`]; },
 () => { const V1 = R.f(0.5, 10, 0.5), t1 = R.i(-20, 40), t2 = R.i(0, 200), V2 = V1 * (t2 + 273.15) / (t1 + 273.15);
   return [T(`${nf(V1)} L gass ved ${t1} °C får temperaturen endret til ${t2} °C ved konstant trykk. Hva blir volumet?`, `${nf(V1)} L of gas at ${t1} °C has its temperature changed to ${t2} °C at constant pressure. What is the volume?`),
     { n: V2, tol: rel(V2), u: "L" },
     S`$V_2 = V_1 T_2/T_1 = ${mf(V1)}\cdot ${mf(t2 + 273.15)}/${mf(t1 + 273.15)} \approx ${mf(V2, 3)}$ L.`]; },
 () => { const p1 = R.i(150, 350), t1 = R.i(-10, 20), t2 = R.i(20, 70), p2 = p1 * (t2 + 273.15) / (t1 + 273.15);
   return [T(`En lukket beholder har ${p1} kPa absolutt trykk ved ${t1} °C. Hva blir trykket ved ${t2} °C?`, `A closed container has an absolute pressure of ${p1} kPa at ${t1} °C. What is the pressure at ${t2} °C?`),
     { n: p2, tol: rel(p2), u: "kPa" },
     S`$p_2 = p_1 T_2/T_1 = ${p1}\cdot ${mf(t2 + 273.15)}/${mf(t1 + 273.15)} \approx ${mf(p2, 1)}$ kPa.`]; },
 () => { const gases = [["oksygen", "oxygen", 0.21], ["nitrogen", "nitrogen", 0.78], ["argon", "argon", 0.0093], ["CO₂", "CO₂", 0.0004]], [nb, en, x] = R.p(gases.slice(0, 2)), P = R.f(50, 1000, 10), pp = x * P;
   return [T(`Luft er ${nf(x * 100)} % ${nb}. Hva er partialtrykket til ${nb} når totaltrykket er ${nf(P)} kPa?`, `Air is ${nf(x * 100)} % ${en}. What is the partial pressure of ${en} when the total pressure is ${nf(P)} kPa?`),
     { n: pp, tol: rel(pp), u: "kPa" },
     S`$p = ${mf(x)}\cdot ${mf(P)} = ${mf(pp, 1)}$ kPa.`]; }
);
}

// ================= GMAT: Statistikk og sannsynlighet =================
{
const U = ADDUNIT("GMAT", "Statistikk og sannsynlighet", "Statistics and probability");
THEORY("GMAT", U, {
nb: md`## Hva handler det om?
Ingeniører jobber med målinger som varierer og med risiko: hvor ofte svikter en komponent, hva er en typisk verdi, hvor mye sprer målingene seg? Her lærer du de enkleste verktøyene for å beskrive data og regne med sannsynlighet.

## Begreper og formler
- **Gjennomsnitt:** summen delt på antallet, $\bar x = \dfrac{\sum x_i}{n}$.
- **Median:** den midterste verdien når tallene er sortert. Ved et partall antall tar du gjennomsnittet av de to midterste.
- **Typetall:** verdien som forekommer oftest. **Variasjonsbredde:** største minus minste verdi.
- **Sannsynlighet** når alle utfall er like sannsynlige:
$$P = \frac{\text{antall gunstige utfall}}{\text{antall mulige utfall}}$$
- **Komplement:** $P(\text{ikke } A) = 1 - P(A)$.
- **Uavhengige hendelser:** $P(A \text{ og } B) = P(A)\cdot P(B)$.
- **Minst én gang** regnes lettest via komplementet: $P(\text{minst én}) = 1 - P(\text{ingen})$.

## Slik løser du oppgavene
1. Beskrive data: sorter tallene først, så er median og variasjonsbredde lette å finne.
2. Sannsynlighet: tell mulige og gunstige utfall, eller gang sammen sannsynligheter for uavhengige hendelser.
3. «Minst én»: regn ut sannsynligheten for «ingen» og trekk fra 1.

### Eksempel
Hva er sannsynligheten for minst én sekser på tre terningkast?
1. Sannsynligheten for ikke sekser på ett kast er $5/6$.
2. Ingen seksere på tre kast: $(5/6)^3 \approx 0{,}579$.
3. Minst én sekser: $1 - 0{,}579 = 0{,}421$, altså omtrent 42 %.

## Vanlige feil
- Å legge sammen sannsynligheter som skulle vært ganget: $3\cdot\tfrac16 = 0{,}5$ er feil for «minst én sekser på tre kast».
- Å finne medianen uten å sortere tallene først.
- Å la én ekstrem verdi dominere gjennomsnittet. Da beskriver medianen det typiske bedre.

> «Og» for uavhengige hendelser: gang. «Minst én»: 1 minus «ingen».`,
en: md`## What is it about?
Engineers work with measurements that vary and with risk: how often does a component fail, what is a typical value, how much do the measurements spread? Here you learn the simplest tools for describing data and calculating with probability.

## Concepts and formulas
- **Mean:** the sum divided by the count, $\bar x = \dfrac{\sum x_i}{n}$.
- **Median:** the middle value when the numbers are sorted. With an even count, take the average of the two middle ones.
- **Mode:** the most frequent value. **Range:** largest minus smallest value.
- **Probability** when all outcomes are equally likely:
$$P = \frac{\text{number of favourable outcomes}}{\text{number of possible outcomes}}$$
- **Complement:** $P(\text{not } A) = 1 - P(A)$.
- **Independent events:** $P(A \text{ and } B) = P(A)\cdot P(B)$.
- **At least once** is easiest via the complement: $P(\text{at least one}) = 1 - P(\text{none})$.

## How to solve the problems
1. Describing data: sort the numbers first, then the median and range are easy to find.
2. Probability: count possible and favourable outcomes, or multiply probabilities of independent events.
3. "At least one": compute the probability of "none" and subtract from 1.

### Example
What is the probability of at least one six in three dice throws?
1. The probability of not getting a six in one throw is $5/6$.
2. No sixes in three throws: $(5/6)^3 \approx 0.579$.
3. At least one six: $1 - 0.579 = 0.421$, about 42 %.

## Common mistakes
- Adding probabilities that should be multiplied: $3\cdot\tfrac16 = 0.5$ is wrong for "at least one six in three throws".
- Finding the median without sorting the numbers first.
- Letting one extreme value dominate the mean. Then the median describes the typical value better.

> "And" for independent events: multiply. "At least one": 1 minus "none".`
});
BIQ("GMAT", U, [
  ["Hva er gjennomsnittet av 4, 7, 9 og 12?",
   { n: 8, tol: 0.01, u: "" },
   S`$\bar x = \dfrac{4 + 7 + 9 + 12}{4} = \dfrac{32}{4} = 8$.`,
   "What is the mean of 4, 7, 9 and 12?", null,
   S`$\bar x = \dfrac{4 + 7 + 9 + 12}{4} = \dfrac{32}{4} = 8$.`],
  ["Hva er medianen til tallene 3, 9, 4, 12 og 8?",
   { n: 8, tol: 0.01, u: "" },
   "Sortert: 3, 4, 8, 9, 12. Den midterste verdien er 8.",
   "What is the median of the numbers 3, 9, 4, 12 and 8?", null,
   "Sorted: 3, 4, 8, 9, 12. The middle value is 8."],
  ["Du kaster to terninger. Hva er sannsynligheten for at summen blir 7, i prosent?",
   { n: 100 / 6, tol: 0.1, u: "%" },
   S`Det er 36 like sannsynlige utfall. Summen 7 får du på 6 måter (1+6, 2+5, 3+4, 4+3, 5+2, 6+1). $P = 6/36 \approx 16{,}67$ %.`,
   "You throw two dice. What is the probability that the sum is 7, in percent?", null,
   S`There are 36 equally likely outcomes. A sum of 7 comes in 6 ways (1+6, 2+5, 3+4, 4+3, 5+2, 6+1). $P = 6/36 \approx 16.67$ %.`],
  ["Hva er sannsynligheten for minst én sekser på tre terningkast, i prosent?",
   { n: (1 - (5 / 6) ** 3) * 100, tol: 0.1, u: "%" },
   S`$P = 1 - (5/6)^3 = 1 - 0{,}5787 \approx 0{,}4213$, altså 42,13 %.`,
   "What is the probability of at least one six in three dice throws, in percent?", null,
   S`$P = 1 - (5/6)^3 = 1 - 0.5787 \approx 0.4213$, i.e. 42.13 %.`],
  ["Lønningene i en liten bedrift er 450, 480, 500, 520 og 3000 tusen kr. Hvorfor beskriver medianen det typiske bedre enn gjennomsnittet her?",
   ["Én ekstrem verdi trekker gjennomsnittet kraftig opp, mens medianen ikke påvirkes", "Medianen er alltid større enn gjennomsnittet", "Gjennomsnittet kan bare brukes på heltall", "Medianen tar med alle verdiene, gjennomsnittet ikke"],
   "Gjennomsnittet blir 990 tusen, som ingen av de fire første tjener i nærheten av. Medianen er 500 tusen og viser hva en typisk ansatt tjener.",
   "The salaries in a small company are 450, 480, 500, 520 and 3000 thousand NOK. Why does the median describe the typical value better than the mean here?",
   ["One extreme value pulls the mean up sharply, while the median is not affected", "The median is always larger than the mean", "The mean can only be used for whole numbers", "The median includes all the values, the mean doesn't"],
   "The mean becomes 990 thousand, which none of the first four earn anywhere near. The median is 500 thousand and shows what a typical employee earns."],
  ["To uavhengige komponenter virker hver med sannsynlighet 0,9. Systemet virker bare hvis begge virker. Hva er sannsynligheten for at systemet virker, i prosent?",
   { n: 81, tol: 0.1, u: "%" },
   S`$P = 0{,}9\cdot 0{,}9 = 0{,}81$, altså 81 %. Seriekobling gjør systemet mindre pålitelig enn hver del.`,
   "Two independent components each work with probability 0.9. The system only works if both work. What is the probability that the system works, in percent?", null,
   S`$P = 0.9\cdot 0.9 = 0.81$, i.e. 81 %. A series arrangement makes the system less reliable than each part.`],
  ["Hva er variasjonsbredden til 12, 5, 20 og 8?",
   { n: 15, tol: 0.01, u: "" },
   "Største verdi er 20 og minste er 5, så variasjonsbredden er 20 − 5 = 15.",
   "What is the range of 12, 5, 20 and 8?", null,
   "The largest value is 20 and the smallest is 5, so the range is 20 − 5 = 15."],
  ["En boks har 3 røde og 7 blå kuler. Du trekker 2 uten tilbakelegging. Hva er sannsynligheten for at begge er røde, i prosent?",
   { n: 3 / 10 * 2 / 9 * 100, tol: 0.05, u: "%" },
   S`Første røde: $3/10$. Deretter er det 2 røde igjen av 9: $2/9$. $P = \dfrac{3}{10}\cdot\dfrac{2}{9} = \dfrac{6}{90} \approx 6{,}67$ %.`,
   "A box has 3 red and 7 blue balls. You draw 2 without replacement. What is the probability that both are red, in percent?", null,
   S`First red: $3/10$. Then there are 2 red left out of 9: $2/9$. $P = \dfrac{3}{10}\cdot\dfrac{2}{9} = \dfrac{6}{90} \approx 6.67$ %.`]
]);
GEN("GMAT", U,
 () => { const n = R.i(4, 7), xs = Array.from({ length: n }, () => R.i(1, 50)), m = xs.reduce((a, b) => a + b) / n;
   return [T(`Hva er gjennomsnittet av ${xs.join(", ")}?`, `What is the mean of ${xs.join(", ")}?`),
     { n: m, tol: 0.01, u: "" },
     S`$\bar x = \dfrac{${xs.join(" + ")}}{${n}} = \dfrac{${xs.reduce((a, b) => a + b)}}{${n}} \approx ${mf(m)}$.`]; },
 () => { const n = R.p([5, 7, 6, 8]), xs = Array.from({ length: n }, () => R.i(1, 60)), s = [...xs].sort((a, b) => a - b), med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
   return [T(`Hva er medianen til ${xs.join(", ")}?`, `What is the median of ${xs.join(", ")}?`),
     { n: med, tol: 0.01, u: "" },
     T(`Sortert: ${s.join(", ")}. ${n % 2 ? `Den midterste verdien er ${med}.` : `Gjennomsnittet av de to midterste (${s[n / 2 - 1]} og ${s[n / 2]}) er ${nf(med)}.`}`,
       `Sorted: ${s.join(", ")}. ${n % 2 ? `The middle value is ${med}.` : `The average of the two middle values (${s[n / 2 - 1]} and ${s[n / 2]}) is ${nf(med)}.`}`)]; },
 () => { const k = R.i(2, 8), p = (1 - (5 / 6) ** k) * 100;
   return [T(`Hva er sannsynligheten for minst én sekser på ${k} terningkast, i prosent?`, `What is the probability of at least one six in ${k} dice throws, in percent?`),
     { n: p, tol: 0.1, u: "%" },
     T(S`$P = 1 - (5/6)^{${k}} \approx ${mf(p / 100, 4)}$, altså ${nf(p, 2)} %.`, S`$P = 1 - (5/6)^{${k}} \approx ${mf(p / 100, 4)}$, i.e. ${nf(p, 2)} %.`)]; },
 () => { const q = R.p([0.8, 0.85, 0.9, 0.95, 0.98, 0.99]), k = R.i(2, 6), p = q ** k * 100;
   return [T(`${k} uavhengige komponenter virker hver med sannsynlighet ${nf(q)}. Systemet virker bare hvis alle virker. Hva er sannsynligheten for at systemet virker, i prosent?`,
             `${k} independent components each work with probability ${nf(q)}. The system only works if all of them work. What is the probability that the system works, in percent?`),
     { n: p, tol: 0.1, u: "%" },
     T(S`$P = ${mf(q)}^{${k}} \approx ${mf(p / 100, 4)}$, altså ${nf(p, 2)} %.`, S`$P = ${mf(q)}^{${k}} \approx ${mf(p / 100, 4)}$, i.e. ${nf(p, 2)} %.`)]; },
 () => { const r = R.i(2, 6), b = R.i(3, 10), N = r + b, p = r / N * (r - 1) / (N - 1) * 100;
   return [T(`En boks har ${r} røde og ${b} blå kuler. Du trekker 2 uten tilbakelegging. Hva er sannsynligheten for at begge er røde, i prosent?`,
             `A box has ${r} red and ${b} blue balls. You draw 2 without replacement. What is the probability that both are red, in percent?`),
     { n: p, tol: 0.05, u: "%" },
     S`$P = \dfrac{${r}}{${N}}\cdot\dfrac{${r - 1}}{${N - 1}} \approx ${mf(p, 2)}$ %.`]; }
);
}
})();
