// ============================================================
//  add_mat2.js – teori, faste oppgaver og generatorer for
//  MATS1500 (Materialteknologi) og KJEMI (Generell kjemi)
// ============================================================
(() => {

// ================= MATS1500 – enhet 0: Struktur =================
THEORY("MATS1500", 0, {
nb: `## Hva handler det om?
Egenskapene til et materiale – styrke, duktilitet, ledningsevne, tetthet – bestemmes i stor grad av hvordan atomene er ordnet. De fleste metaller er krystallinske: atomene sitter i et regelmessig, gjentagende mønster kalt et krystallgitter. Hvilken struktur metallet har (BCC, FCC eller HCP) avgjør blant annet hvor tett atomene pakkes og hvor lett dislokasjoner kan bevege seg – og dermed hvor duktilt materialet er. For en ingeniør er dette grunnlaget for å forstå hvorfor stål oppfører seg annerledes enn aluminium, og hvorfor et materiale kan bli sterkere eller sprøere etter bearbeiding.

## Begreper og formler
- Enhetscelle: den minste byggeklossen som gjentas og bygger opp hele krystallgitteret.
- Atomer per enhetscelle $n$: et hjørneatom teller 1/8, et flateatom 1/2, et kantatom 1/4, og et atom i sentrum teller 1. BCC: $n=2$, FCC: $n=4$, HCP: $n=6$ (for hele den heksagonale cellen).
- Pakningsgrad (APF) = volum av atomer / volum av enhetscelle. Enkel kubisk: 0,52. BCC: 0,68. FCC og HCP: 0,74 (tettest mulig pakking av kuler).
- Teoretisk tetthet: $$\\rho = \\frac{nM}{V_c N_A}$$ der $M$ er molar masse (g/mol), $V_c$ er enhetscellens volum, og $N_A = 6,022\\cdot10^{23}$ /mol er Avogadros tall.
- Punktdefekter: vakans (tomt gitterpunkt), interstitielt atom (ekstra atom presset inn i et mellomrom), substitusjonelt atom (fremmed atom erstatter et vertsatom).
- Koordinasjonstall: antall nærmeste naboer til et atom (BCC: 8, FCC og HCP: 12).

## Slik løser du oppgavene
1. Identifiser strukturen (BCC, FCC, HCP eller enkel kubisk) og les av $n$ og APF fra tabellen over.
2. Skal du finne tetthet: sett opp $\\rho = nM/(V_cN_A)$. Regn enhetscellens volum $V_c = a^3$ for kubiske celler, med $a$ i cm hvis du vil ha tettheten i g/cm³.
3. Skal du finne tomrom: bruk $1 - \\mathrm{APF}$, gjerne omregnet til prosent.
4. Pass på enhetene hele veien – blander du nm og cm får du feil svar med mange tierpotenser.
5. Kontroller: tettheten til de fleste metaller ligger mellom 1 og 20 g/cm³ – et svar langt utenfor dette bør sjekkes.

### Eksempel
Krom har BCC-struktur med gitterparameter $a = 0,2885$ nm og molar masse $M = 52,00$ g/mol. Hva er den teoretiske tettheten?
1. BCC har $n = 2$ atomer per enhetscelle.
2. Gitterparameteren i cm: $a = 0,2885\\cdot10^{-7}$ cm, så $V_c = a^3 \\approx 2,402\\cdot10^{-23}$ cm³.
3. $$\\rho = \\frac{nM}{V_cN_A} = \\frac{2\\cdot 52,00}{2,402\\cdot10^{-23}\\cdot 6,022\\cdot10^{23}} \\approx 7,19\\ \\mathrm{g/cm^3}$$

Svar: ca. 7,19 g/cm³, nær den målte verdien for krom.

## Vanlige feil
- Å blande enheter for gitterparameteren (nm, pm, Å) uten å regne om til samme enhet som resten av formelen.
- Å bruke feil antall atomer per enhetscelle, for eksempel å telle hjørneatomer som hele atomer.
- Å tro at APF avhenger av hvilket grunnstoff det er – den avhenger bare av strukturen (BCC, FCC osv.), ikke av hvilket atom som pakkes.
- Å forveksle en vakans (mangler et atom) med et interstitielt atom (har et ekstra atom).

> Tettheten til et krystallinsk stoff følger direkte av strukturen: $\\rho = nM/(V_cN_A)$ – antall atomer per celle, molar masse og cellevolum er alt du trenger.`,
en: `## What is it about?
A material's properties – strength, ductility, conductivity, density – are largely determined by how its atoms are arranged. Most metals are crystalline: the atoms sit in a regular, repeating pattern called a crystal lattice. Which structure a metal has (BCC, FCC or HCP) determines, among other things, how tightly the atoms are packed and how easily dislocations can move – and therefore how ductile the material is. For an engineer this is the foundation for understanding why steel behaves differently from aluminum, and why a material can become stronger or more brittle after processing.

## Concepts and formulas
- Unit cell: the smallest repeating building block that makes up the whole crystal lattice.
- Atoms per unit cell $n$: a corner atom counts 1/8, a face atom 1/2, an edge atom 1/4, and a center atom counts as 1. BCC: $n=2$, FCC: $n=4$, HCP: $n=6$ (for the full hexagonal cell).
- Atomic packing factor (APF) = volume of atoms / volume of the unit cell. Simple cubic: 0.52. BCC: 0.68. FCC and HCP: 0.74 (the densest possible packing of spheres).
- Theoretical density: $$\\rho = \\frac{nM}{V_c N_A}$$ where $M$ is the molar mass (g/mol), $V_c$ is the unit cell volume, and $N_A = 6.022\\cdot10^{23}$ /mol is Avogadro's number.
- Point defects: vacancy (an empty lattice site), interstitial atom (an extra atom squeezed into a gap), substitutional atom (a foreign atom replacing a host atom).
- Coordination number: the number of nearest neighbors of an atom (BCC: 8, FCC and HCP: 12).

## How to solve the problems
1. Identify the structure (BCC, FCC, HCP or simple cubic) and read off $n$ and APF from the table above.
2. To find the density: set up $\\rho = nM/(V_cN_A)$. Compute the unit cell volume $V_c = a^3$ for cubic cells, with $a$ in cm if you want the density in g/cm³.
3. To find the void fraction: use $1 - \\mathrm{APF}$, usually converted to a percentage.
4. Watch the units throughout – mixing nm and cm gives an answer off by many powers of ten.
5. Check: the density of most metals lies between 1 and 20 g/cm³ – an answer far outside that range should be double-checked.

### Example
Chromium has a BCC structure with lattice parameter $a = 0.2885$ nm and molar mass $M = 52.00$ g/mol. What is the theoretical density?
1. BCC has $n = 2$ atoms per unit cell.
2. The lattice parameter in cm: $a = 0.2885\\cdot10^{-7}$ cm, so $V_c = a^3 \\approx 2.402\\cdot10^{-23}$ cm³.
3. $$\\rho = \\frac{nM}{V_cN_A} = \\frac{2\\cdot 52.00}{2.402\\cdot10^{-23}\\cdot 6.022\\cdot10^{23}} \\approx 7.19\\ \\mathrm{g/cm^3}$$

Answer: about 7.19 g/cm³, close to the measured value for chromium.

## Common mistakes
- Mixing units for the lattice parameter (nm, pm, angstroms) without converting to the same unit as the rest of the formula.
- Using the wrong number of atoms per unit cell, for example counting corner atoms as whole atoms.
- Believing the APF depends on which element it is – it depends only on the structure (BCC, FCC, etc.), not on which atom is being packed.
- Confusing a vacancy (a missing atom) with an interstitial atom (an extra atom).

> The density of a crystalline substance follows directly from its structure: $\\rho = nM/(V_cN_A)$ – atoms per cell, molar mass and cell volume are all you need.`
});

BIQ("MATS1500", 0, [
 ["Hva er forskjellen på et substitusjonelt og et interstitielt fremmedatom i et krystallgitter?",
  ["Substitusjonelt atom erstatter et vertsatom i gitteret, interstitielt atom presses inn i et mellomrom mellom atomene", "Substitusjonelt atom er alltid større enn vertsatomet, interstitielt alltid mindre", "Det er ingen forskjell – begge er vakanser", "Interstitielt atom er alltid av samme grunnstoff som vertsatomet"],
  "Substitusjon krever ofte at atomene har omtrent lik størrelse, mens interstitielle atomer (som karbon i jern) er små nok til å presses inn mellom vertsatomene.",
  "What is the difference between a substitutional and an interstitial foreign atom in a crystal lattice?",
  ["A substitutional atom replaces a host atom in the lattice, an interstitial atom is squeezed into a gap between the atoms", "A substitutional atom is always larger than the host atom, an interstitial atom always smaller", "There is no difference – both are vacancies", "An interstitial atom is always the same element as the host atom"],
  "Substitution usually requires the atoms to be roughly similar in size, while interstitial atoms (like carbon in iron) are small enough to fit between the host atoms."],
 ["Jern endrer struktur fra BCC til FCC når det varmes over ca. 912 °C. Hva skjer med koordinasjonstallet og pakningsgraden (APF)?",
  ["Begge øker (koordinasjonstall fra 8 til 12, APF fra 0,68 til 0,74)", "Begge synker", "Koordinasjonstallet øker, men APF synker", "Ingen av dem endres"],
  "FCC pakker atomene tettere enn BCC: hvert atom får flere nærmeste naboer (12 mot 8), og pakningsgraden øker fra 0,68 til 0,74.",
  "Iron changes structure from BCC to FCC when heated above about 912 °C. What happens to the coordination number and the packing factor (APF)?",
  ["Both increase (coordination number from 8 to 12, APF from 0.68 to 0.74)", "Both decrease", "The coordination number increases, but the APF decreases", "Neither changes"],
  "FCC packs the atoms more tightly than BCC: each atom gets more nearest neighbors (12 versus 8), and the packing factor increases from 0.68 to 0.74."],
 ["Nikkel har FCC-struktur med gitterparameter $a = 0,3524$ nm og molar masse $M = 58,69$ g/mol. Hva er den teoretiske tettheten?",
  { n: 8.907906511099322, tol: 0.09, u: "g/cm³" },
  "FCC har $n=4$ atomer per celle. Gitterparameteren i cm: $a = 0,3524\\cdot10^{-7}$ cm, så $V_c=a^3\\approx 4,376\\cdot10^{-23}$ cm³. Da er $\\rho = nM/(V_cN_A) = 4\\cdot 58,69/(4,376\\cdot10^{-23}\\cdot 6,022\\cdot10^{23}) \\approx 8,91$ g/cm³.",
  "Nickel has an FCC structure with lattice parameter $a = 0.3524$ nm and molar mass $M = 58.69$ g/mol. What is the theoretical density?",
  null,
  "FCC has $n=4$ atoms per cell. The lattice parameter in cm: $a = 0.3524\\cdot10^{-7}$ cm, so $V_c=a^3\\approx 4.376\\cdot10^{-23}$ cm³. Then $\\rho = nM/(V_cN_A) = 4\\cdot 58.69/(4.376\\cdot10^{-23}\\cdot 6.022\\cdot10^{23}) \\approx 8.91$ g/cm³."]
]);

GEN("MATS1500", 0,
 // enkel: tomrom fra pakningsgrad
 () => { const opts = [["enkel kubisk", "simple cubic", 0.52], ["BCC", "BCC", 0.68], ["FCC", "FCC", 0.74], ["HCP", "HCP", 0.74]];
   const o = R.p(opts); const empty = 100 * (1 - o[2]);
   return [T(`En krystallstruktur har pakningsgrad (APF) ${nf(o[2])} (strukturen er ${o[0]}). Hvor stor prosentandel av enhetscellens volum er tomrom?`,
             `A crystal structure has a packing factor (APF) of ${nf(o[2])} (the structure is ${o[1]}). What percentage of the unit cell's volume is empty space?`),
     { n: empty, tol: rel(empty, 0.01, 0.3), u: "%" },
     T(`Tomrom $= 100\\%\\cdot(1-\\mathrm{APF}) = 100\\cdot(1-${mf(o[2])}) = ${mf(empty, 1)}$ %.`,
       `Empty space $= 100\\%\\cdot(1-\\mathrm{APF}) = 100\\cdot(1-${mf(o[2])}) = ${mf(empty, 1)}$ %.`)]; },
 // eksamen: teoretisk tetthet fra atomradius
 () => { let struct, r, M, a_pm, a_cm, n, Vc, rho;
   do { struct = R.p(["BCC", "FCC"]); r = R.f(115, 155, 1); M = R.f(24, 200, 1);
     a_pm = struct === "BCC" ? 4 * r / Math.sqrt(3) : 2 * Math.sqrt(2) * r;
     a_cm = a_pm * 1e-10; n = struct === "BCC" ? 2 : 4; Vc = a_cm ** 3; rho = n * M / (Vc * 6.022e23);
   } while (rho < 1.5 || rho > 20);
   return [T(`Et metall med ${struct}-struktur har atomradius ${nf(r, 0)} pm og molar masse ${nf(M)} g/mol. Hva er den teoretiske tettheten?`,
             `A metal with a ${struct} structure has an atomic radius of ${nf(r, 0)} pm and a molar mass of ${nf(M)} g/mol. What is the theoretical density?`),
     { n: rho, tol: rel(rho, 0.02), u: "g/cm³" },
     T(`Gitterparameter: $a = ${struct === "BCC" ? "4r/\\sqrt3" : "2\\sqrt2\\,r"} \\approx ${mf(a_pm, 1)}$ pm $= ${mf(a_cm * 1e8, 4)}\\cdot10^{-8}$ cm. Enhetscellens volum $V_c=a^3\\approx ${mf(Vc * 1e23, 4)}\\cdot10^{-23}$ cm³. Med $n=${n}$ atomer per celle: $\\rho = nM/(V_cN_A) \\approx ${mf(rho, 2)}$ g/cm³.`,
       `Lattice parameter: $a = ${struct === "BCC" ? "4r/\\sqrt3" : "2\\sqrt2\\,r"} \\approx ${mf(a_pm, 1)}$ pm $= ${mf(a_cm * 1e8, 4)}\\cdot10^{-8}$ cm. Unit cell volume $V_c=a^3\\approx ${mf(Vc * 1e23, 4)}\\cdot10^{-23}$ cm³. With $n=${n}$ atoms per cell: $\\rho = nM/(V_cN_A) \\approx ${mf(rho, 2)}$ g/cm³.`)]; }
);

// ================= MATS1500 – enhet 1: Mekaniske egenskaper =================
THEORY("MATS1500", 1, {
nb: `## Hva handler det om?
Når en ingeniør velger materiale til en konstruksjon, må hun vite hvor mye last det tåler før det flyter, ryker, eller svikter etter mange lastsykluser. Strekkprøven er den viktigste testen: en stav trekkes til brudd mens kraft og forlengelse måles, og resultatet tegnes som en spennings–tøyningskurve. Denne kurven, sammen med hardhet og slagseighet, gir tallene som går inn i enhver dimensjonering.

## Begreper og formler
- Spenning $\\sigma = F/A_0$ (MPa), tøyning $\\varepsilon = \\Delta L/L_0$ (ofte i %).
- I det elastiske området: Hookes lov $\\sigma = E\\varepsilon$, der $E$ er elastisitetsmodulen (stivheten).
- Flytegrense $R_e$ (eller $R_{p0,2}$ for materialer uten tydelig flyteplatå): spenningen der plastisk deformasjon begynner.
- Strekkfasthet $R_m$: den høyeste spenningen kurven når.
- Bruddforlengelse $A$: total plastisk tøyning ved brudd, et mål på duktilitet.
- Hardhet (Brinell HB, Vickers HV, Rockwell HRC): motstand mot lokalt inntrykk fra en indenter; korrelerer grovt med $R_m$ for stål.
- Slagseighet: energien som absorberes ved brå brudd, målt med Charpy-prøve (J).
- Sikkerhetsfaktor $n = R_e/\\sigma_{tillatt}$: hvor mye margin konstruksjonen har mot flyting.
- Utmatting: gjentatt last under $R_e$ kan likevel gi brudd etter mange sykluser; Wöhlerkurven (S–N) viser spenningsamplitude mot antall sykler til brudd.

## Slik løser du oppgavene
1. Finn spenning og/eller tøyning fra de oppgitte målene: $\\sigma=F/A_0$, $\\varepsilon=\\Delta L/L_0$.
2. Er du i det elastiske området (spenning under $R_e$)? Bruk $E=\\sigma/\\varepsilon$.
3. Skal du finne sikkerhetsfaktor: sammenlign $R_e$ (eller $R_m$) med den faktiske spenningen, $n=R_e/\\sigma$.
4. Sjekk enheter: tverrsnittsareal ofte i mm², kraft i N eller kN, spenning i MPa ($1\\ \\mathrm{MPa}=1\\ \\mathrm{N/mm^2}$).
5. Vurder rimelighet: E-modul for stål er ca. 200 GPa, for aluminium ca. 70 GPa; flytegrenser for konstruksjonsstål ligger typisk 235–500 MPa.

### Eksempel
En stav av aluminium har diameter 12 mm og flytegrense $R_e = 240$ MPa. Den belastes aksialt med 18 kN. Hva er sikkerhetsfaktoren mot flyting?
1. Areal: $A = \\pi d^2/4 = \\pi\\cdot 12^2/4 \\approx 113{,}1$ mm².
2. Spenning: $\\sigma = F/A = 18\\,000/113{,}1 \\approx 159{,}2$ MPa.
3. Sikkerhetsfaktor: $n = R_e/\\sigma = 240/159{,}2 \\approx 1{,}51$.

Svar: sikkerhetsfaktoren er om lag 1,51.

## Vanlige feil
- Å blande N og kN, eller mm² og m², i samme utregning.
- Å bruke $R_m$ når oppgaven egentlig spør om sikkerhet mot flyting ($R_e$), eller omvendt.
- Å bruke Hookes lov ($\\sigma=E\\varepsilon$) utenfor det elastiske området.
- Å tro at hardere alltid betyr mer duktilt – det er ofte omvendt.

> Spenning er kraft delt på areal, tøyning er forlengelse delt på opprinnelig lengde, og i det elastiske området binder E-modulen dem sammen: $\\sigma = E\\varepsilon$.`,
en: `## What is it about?
When an engineer selects a material for a structure, she needs to know how much load it can carry before it yields, breaks, or fails after many load cycles. The tensile test is the most important test: a specimen is pulled to fracture while force and elongation are measured, and the result is plotted as a stress–strain curve. This curve, together with hardness and impact toughness, provides the numbers that go into every design calculation.

## Concepts and formulas
- Stress $\\sigma = F/A_0$ (MPa), strain $\\varepsilon = \\Delta L/L_0$ (often in %).
- In the elastic region: Hooke's law $\\sigma = E\\varepsilon$, where $E$ is the modulus of elasticity (the stiffness).
- Yield strength $R_e$ (or $R_{p0.2}$ for materials without a distinct yield plateau): the stress at which plastic deformation begins.
- Tensile strength $R_m$: the highest stress the curve reaches.
- Elongation at break $A$: the total plastic strain at fracture, a measure of ductility.
- Hardness (Brinell HB, Vickers HV, Rockwell HRC): resistance to local indentation from an indenter; correlates roughly with $R_m$ for steel.
- Impact toughness: the energy absorbed in a sudden fracture, measured with a Charpy test (J).
- Safety factor $n = R_e/\\sigma_{allow}$: how much margin the structure has against yielding.
- Fatigue: repeated load below $R_e$ can still cause failure after many cycles; the Wöhler (S–N) curve shows stress amplitude versus number of cycles to failure.

## How to solve the problems
1. Find the stress and/or strain from the given measurements: $\\sigma=F/A_0$, $\\varepsilon=\\Delta L/L_0$.
2. Are you in the elastic region (stress below $R_e$)? Use $E=\\sigma/\\varepsilon$.
3. To find the safety factor: compare $R_e$ (or $R_m$) with the actual stress, $n=R_e/\\sigma$.
4. Check units: cross-sectional area is often in mm², force in N or kN, stress in MPa ($1\\ \\mathrm{MPa}=1\\ \\mathrm{N/mm^2}$).
5. Sanity check: the modulus of elasticity for steel is about 200 GPa, for aluminum about 70 GPa; yield strengths for structural steel typically lie between 235 and 500 MPa.

### Example
An aluminum rod has a diameter of 12 mm and a yield strength of $R_e = 240$ MPa. It is loaded axially with 18 kN. What is the safety factor against yielding?
1. Area: $A = \\pi d^2/4 = \\pi\\cdot 12^2/4 \\approx 113.1$ mm².
2. Stress: $\\sigma = F/A = 18\\,000/113.1 \\approx 159.2$ MPa.
3. Safety factor: $n = R_e/\\sigma = 240/159.2 \\approx 1.51$.

Answer: the safety factor is about 1.51.

## Common mistakes
- Mixing N and kN, or mm² and m², in the same calculation.
- Using $R_m$ when the question actually asks about safety against yielding ($R_e$), or the reverse.
- Using Hooke's law ($\\sigma=E\\varepsilon$) outside the elastic region.
- Assuming harder always means more ductile – it is often the opposite.

> Stress is force divided by area, strain is elongation divided by original length, and in the elastic region the modulus of elasticity ties them together: $\\sigma = E\\varepsilon$.`
});

BIQ("MATS1500", 1, [
 ["Hva måler en hardhetsprøve, for eksempel Brinell eller Vickers?",
  ["Materialets motstand mot lokal plastisk deformasjon (et inntrykk)", "Materialets strekkfasthet direkte i MPa", "Hvor mye materialet tøyes elastisk", "Smeltepunktet"],
  "Brinell bruker en kule og Vickers en diamantpyramide som presses inn i overflaten; inntrykkets størrelse gir hardheten, som korrelerer grovt med $R_m$ for stål.",
  "What does a hardness test, for example Brinell or Vickers, measure?",
  ["The material's resistance to local plastic deformation (an indentation)", "The material's tensile strength directly in MPa", "How much the material stretches elastically", "The melting point"],
  "Brinell uses a ball and Vickers a diamond pyramid pressed into the surface; the size of the indentation gives the hardness, which correlates roughly with $R_m$ for steel."],
 ["To materialer A og B har samme flytegrense $R_e$, men A har mye høyere bruddforlengelse enn B. Hva kan du si?",
  ["A er mer duktilt enn B og tåler mer plastisk deformasjon før brudd", "A er sterkere enn B", "B er hardere enn A", "De har nødvendigvis lik E-modul"],
  "Flytegrense sier noe om styrke, mens bruddforlengelse er et mål på duktilitet. To materialer kan ha lik styrke, men svært ulik evne til å tøyes plastisk før de ryker.",
  "Two materials A and B have the same yield strength $R_e$, but A has a much higher elongation at break than B. What can you conclude?",
  ["A is more ductile than B and can undergo more plastic deformation before fracture", "A is stronger than B", "B is harder than A", "They necessarily have the same modulus of elasticity"],
  "Yield strength describes strength, while elongation at break is a measure of ductility. Two materials can have the same strength but very different ability to stretch plastically before fracturing."],
 ["En stålstang med diameter 20 mm belastes aksialt med 45 kN. Flytegrensen er $R_e = 275$ MPa. Hva er sikkerhetsfaktoren mot flyting?",
  { n: 1.9198621771937625, tol: 0.02, u: "" },
  "$A = \\pi\\cdot 20^2/4 \\approx 314{,}2$ mm², $\\sigma = F/A = 45\\,000/314{,}2 \\approx 143{,}2$ MPa. Sikkerhetsfaktor $n = R_e/\\sigma = 275/143{,}2 \\approx 1{,}92$.",
  "A steel rod with a diameter of 20 mm is loaded axially with 45 kN. The yield strength is $R_e = 275$ MPa. What is the safety factor against yielding?",
  null,
  "$A = \\pi\\cdot 20^2/4 \\approx 314.2$ mm², $\\sigma = F/A = 45\\,000/314.2 \\approx 143.2$ MPa. Safety factor $n = R_e/\\sigma = 275/143.2 \\approx 1.92$."]
]);

GEN("MATS1500", 1,
 // enkel: Hookes lov, spenning fra tøyning
 () => { const E = R.f(60, 200, 5), eps = R.f(0.05, 0.25, 0.01), sigma = E * 1000 * eps / 100;
   return [T(`Et materiale med E-modul ${nf(E)} GPa tøyes elastisk med $\\varepsilon = ${mf(eps)}$ %. Hvor stor er spenningen?`,
             `A material with a modulus of elasticity of ${nf(E)} GPa is elastically strained by $\\varepsilon = ${mf(eps)}$ %. What is the stress?`),
     { n: sigma, tol: rel(sigma), u: "MPa" },
     T(`Hookes lov: $\\sigma = E\\varepsilon = ${mf(E * 1000)}\\cdot ${mf(eps / 100, 4)} \\approx ${mf(sigma, 1)}$ MPa.`,
       `Hooke's law: $\\sigma = E\\varepsilon = ${mf(E * 1000)}\\cdot ${mf(eps / 100, 4)} \\approx ${mf(sigma, 1)}$ MPa.`)]; },
 // eksamen: forlengelse av belastet stang
 () => { const mat = R.p([["stål", "steel", 200], ["aluminium", "aluminum", 70], ["titan", "titanium", 110]]);
   const d = R.f(6, 30, 1), L0 = R.f(0.2, 2, 0.1), sigma = R.f(60, 300, 10);
   const A = Math.PI * d * d / 4, F = sigma * A / 1000, eps = sigma / (mat[2] * 1000), dL = eps * L0 * 1000;
   return [T(`En ${mat[0]}stang med diameter ${nf(d)} mm og lengde ${nf(L0)} m belastes aksialt med ${nf(F)} kN. E-modulen er ${mat[2]} GPa. Hvor mye forlenges stangen? (Anta at spenningen holder seg i det elastiske området.)`,
             `A ${mat[1]} rod with a diameter of ${nf(d)} mm and a length of ${nf(L0)} m is axially loaded with ${nf(F)} kN. The modulus of elasticity is ${mat[2]} GPa. How much does the rod elongate? (Assume the stress stays in the elastic region.)`),
     { n: dL, tol: rel(dL, 0.015, 0.005), u: "mm" },
     T(`$A = \\pi d^2/4 \\approx ${mf(A, 1)}$ mm², $\\sigma = F/A \\approx ${mf(sigma, 1)}$ MPa, $\\varepsilon = \\sigma/E \\approx ${mf(eps * 100, 3)}$ %. Forlengelse: $\\Delta L = \\varepsilon L_0 \\approx ${mf(dL, 2)}$ mm.`,
       `$A = \\pi d^2/4 \\approx ${mf(A, 1)}$ mm², $\\sigma = F/A \\approx ${mf(sigma, 1)}$ MPa, $\\varepsilon = \\sigma/E \\approx ${mf(eps * 100, 3)}$ %. Elongation: $\\Delta L = \\varepsilon L_0 \\approx ${mf(dL, 2)}$ mm.`)]; }
);

// ================= MATS1500 – enhet 2: Varmebehandling og korrosjon =================
THEORY("MATS1500", 2, {
nb: `## Hva handler det om?
Stål og andre legeringer kan få svært forskjellige egenskaper av samme kjemiske sammensetning, avhengig av hvordan de varmebehandles. Ved å styre temperatur og avkjølingshastighet kan man gjøre stål hardt og slitesterkt, eller mykt og formbart. Materialer brytes også ned over tid – av korrosjon i et fuktig eller salt miljø, eller av kryp ved høy temperatur og last. Kompositter, der to eller flere materialer kombineres, lar ingeniøren «skreddersy» egenskaper som ingen av bestanddelene har alene.

## Begreper og formler
- Herding: stål varmes til austenitt og bråkjøles (i vann, olje eller luft). Rask avkjøling gir martensitt – hardt, men sprøtt.
- Anløping: kontrollert oppvarming av herdet stål til en lavere temperatur, for å redusere sprøhet mot litt tapt hardhet.
- Normalisering: oppvarming over austenittområdet, avkjøling i luft, gir finkornet og jevn struktur.
- Fullgløding: langsom avkjøling (i ovnen) gir en mykere, mer duktil struktur enn normalisering.
- Herdbarhet: hvor dypt stålet herdes; øker med legeringselementer som Cr, Mo, Ni (ikke med karboninnhold alene, som først og fremst styrer maksimal hardhet).
- Korrosjon: en elektrokjemisk prosess. I et galvanisk par korroderer det minst edle metallet (anoden) raskest.
- Kryp: langsom, tidsavhengig plastisk tøyning under konstant last, viktig ved høy temperatur (typisk over ca. 0,4 ganger smeltepunktet i kelvin).
- Kompositter: styrke/stivhet langs fiberretningen kan estimeres med blandingsregelen $$E_c = V_fE_f + V_mE_m$$ der $V_f$ og $V_m$ er volumandelen av fiber og matriks ($V_f+V_m=1$).
- Lineær termisk utvidelse: $\\Delta L = \\alpha L\\Delta T$, der $\\alpha$ er lengdeutvidelseskoeffisienten (1/K).

## Slik løser du oppgavene
1. Identifiser prosessen (herding, anløping, normalisering, gløding) ut fra hva oppgaven beskriver: temperatur og avkjølingsmåte.
2. For korrosjon: finn hvilket metall som er minst edelt – det er anoden, og det korroderer.
3. For kompositter: sett inn volumandeler i blandingsregelen, husk at $V_f + V_m = 1$.
4. For termisk utvidelse: pass på at $\\Delta T$ og $L$ har konsistente enheter, og at $\\alpha$ er oppgitt per kelvin.
5. Kontroller: martensitt er alltid hardest og sprøest av strukturene i stål; jo langsommere avkjøling, jo mykere og mer duktilt blir resultatet.

### Eksempel
Et komposittmateriale har 60 % volumandel karbonfiber ($E_f = 230$ GPa) i en epoksymatriks ($E_m = 3$ GPa). Hva er E-modulen langs fiberretningen?
1. $V_f = 0{,}60$, så $V_m = 1 - 0{,}60 = 0{,}40$.
2. Blandingsregelen: $E_c = V_fE_f + V_mE_m = 0{,}60\\cdot 230 + 0{,}40\\cdot 3$.
3. $E_c = 138 + 1{,}2 = 139{,}2$ GPa.

Svar: ca. 139,2 GPa – langt stivere enn matriksen alene, fordi fiberen bærer mesteparten av lasten.

## Vanlige feil
- Å tro at mer karbon alltid gir dypere herdbarhet – det er legeringselementer som Cr og Mo som først og fremst styrer herdbarheten.
- Å blande sammen anløping (gjøres etter herding, for å redusere sprøhet) med gløding (en egen, langsommere prosess for å myke opp materialet).
- Å anta at det edleste metallet korroderer i et galvanisk par – det er faktisk det minst edle.
- Å bruke blandingsregelen på tvers av fiberretningen – den gjelder langs fiberretningen; på tvers er materialet mye mykere.

> Rask avkjøling gir hardt og sprøtt (martensitt), langsom avkjøling gir mykt og duktilt – og i et galvanisk par er det alltid det minst edle metallet som ofres.`,
en: `## What is it about?
Steel and other alloys can end up with very different properties from the same chemical composition, depending on how they are heat treated. By controlling temperature and cooling rate, steel can be made hard and wear-resistant, or soft and formable. Materials also degrade over time – through corrosion in a humid or salty environment, or through creep under high temperature and load. Composites, where two or more materials are combined, let the engineer "tailor" properties that none of the constituents have on their own.

## Concepts and formulas
- Hardening (quenching): steel is heated to austenite and cooled rapidly (in water, oil or air). Fast cooling produces martensite – hard, but brittle.
- Tempering: controlled reheating of hardened steel to a lower temperature, to reduce brittleness at the cost of some hardness.
- Normalizing: heating above the austenite range, cooling in air, gives a fine-grained, uniform structure.
- Full annealing: slow cooling (in the furnace) gives a softer, more ductile structure than normalizing.
- Hardenability: how deep the steel hardens; increases with alloying elements such as Cr, Mo, Ni (not with carbon content alone, which mainly controls the maximum hardness).
- Corrosion: an electrochemical process. In a galvanic pair, the least noble metal (the anode) corrodes fastest.
- Creep: slow, time-dependent plastic strain under constant load, important at high temperature (typically above about 0.4 times the melting point in kelvin).
- Composites: strength/stiffness along the fiber direction can be estimated with the rule of mixtures $$E_c = V_fE_f + V_mE_m$$ where $V_f$ and $V_m$ are the volume fractions of fiber and matrix ($V_f+V_m=1$).
- Linear thermal expansion: $\\Delta L = \\alpha L\\Delta T$, where $\\alpha$ is the coefficient of linear expansion (1/K).

## How to solve the problems
1. Identify the process (hardening, tempering, normalizing, annealing) from how the question describes the temperature and cooling method.
2. For corrosion: find which metal is least noble – that is the anode, and it corrodes.
3. For composites: substitute the volume fractions into the rule of mixtures, remembering that $V_f + V_m = 1$.
4. For thermal expansion: make sure $\\Delta T$ and $L$ use consistent units, and that $\\alpha$ is given per kelvin.
5. Sanity check: martensite is always the hardest and most brittle of the steel structures; the slower the cooling, the softer and more ductile the result.

### Example
A composite material has a 60% fiber volume fraction of carbon fiber ($E_f = 230$ GPa) in an epoxy matrix ($E_m = 3$ GPa). What is the modulus of elasticity along the fiber direction?
1. $V_f = 0.60$, so $V_m = 1 - 0.60 = 0.40$.
2. Rule of mixtures: $E_c = V_fE_f + V_mE_m = 0.60\\cdot 230 + 0.40\\cdot 3$.
3. $E_c = 138 + 1.2 = 139.2$ GPa.

Answer: about 139.2 GPa – much stiffer than the matrix alone, because the fiber carries most of the load.

## Common mistakes
- Assuming more carbon always means deeper hardenability – it is alloying elements like Cr and Mo that mainly control hardenability.
- Confusing tempering (done after hardening, to reduce brittleness) with annealing (a separate, slower process to soften the material).
- Assuming the most noble metal corrodes in a galvanic pair – it is actually the least noble one.
- Applying the rule of mixtures across the fiber direction – it applies along the fiber direction; across it, the material is much softer.

> Fast cooling gives hard and brittle (martensite), slow cooling gives soft and ductile – and in a galvanic pair, it is always the least noble metal that is sacrificed.`
});

BIQ("MATS1500", 2, [
 ["Hvilken avkjølingsmåte gir vanligvis den hardeste strukturen i stål?",
  ["Bråkjøling i vann (raskest avkjøling)", "Langsom avkjøling i ovnen (fullgløding)", "Avkjøling i luft (normalisering)", "Alle gir lik hardhet"],
  "Jo raskere avkjøling, jo mer martensitt dannes, og martensitt er den hardeste (men sprøeste) strukturen i stål.",
  "Which cooling method usually gives the hardest structure in steel?",
  ["Quenching in water (fastest cooling)", "Slow cooling in the furnace (full annealing)", "Cooling in air (normalizing)", "All give the same hardness"],
  "The faster the cooling, the more martensite forms, and martensite is the hardest (but most brittle) structure in steel."],
 ["Et komposittmateriale får økt volumandel fiber $V_f$ (og dermed redusert matriksandel), der $E_f > E_m$. Hva skjer med E-modulen langs fiberretningen ifølge blandingsregelen?",
  ["Den øker", "Den synker", "Den er uendret", "Den blir null"],
  "$E_c = V_fE_f + V_mE_m$ er en veid sum. Når andelen av det stiveste materialet ($E_f$) øker på bekostning av det mykeste ($E_m$), øker $E_c$.",
  "A composite gets an increased fiber volume fraction $V_f$ (and thus a reduced matrix fraction), where $E_f > E_m$. What happens to the modulus of elasticity along the fiber direction according to the rule of mixtures?",
  ["It increases", "It decreases", "It is unchanged", "It becomes zero"],
  "$E_c = V_fE_f + V_mE_m$ is a weighted sum. When the fraction of the stiffer material ($E_f$) grows at the expense of the softer one ($E_m$), $E_c$ increases."],
 ["Et komposittmateriale har volumandel fiber $V_f = 0{,}45$, med $E_f = 390$ GPa for fiberen og $E_m = 3{,}5$ GPa for matriksen. Hva er E-modulen langs fiberretningen (blandingsregelen)?",
  { n: 177.425, tol: 1.8, u: "GPa" },
  "$V_m = 1 - 0{,}45 = 0{,}55$. $E_c = V_fE_f + V_mE_m = 0{,}45\\cdot 390 + 0{,}55\\cdot 3{,}5 \\approx 177{,}4$ GPa.",
  "A composite has a fiber volume fraction of $V_f = 0.45$, with $E_f = 390$ GPa for the fiber and $E_m = 3.5$ GPa for the matrix. What is the modulus of elasticity along the fiber direction (rule of mixtures)?",
  null,
  "$V_m = 1 - 0.45 = 0.55$. $E_c = V_fE_f + V_mE_m = 0.45\\cdot 390 + 0.55\\cdot 3.5 \\approx 177.4$ GPa."]
]);

GEN("MATS1500", 2,
 // enkel: blandingsregelen for kompositter
 () => { const Vf = R.f(0.2, 0.7, 0.05), Ef = R.f(150, 400, 10), Em = R.f(2, 5, 0.1);
   const Vm = 1 - Vf, Ec = Vf * Ef + Vm * Em;
   return [T(`Et komposittmateriale har volumandel fiber $V_f = ${mf(Vf)}$, med $E_f = ${nf(Ef)}$ GPa for fiberen og $E_m = ${nf(Em)}$ GPa for matriksen. Hva er E-modulen langs fiberretningen (blandingsregelen)?`,
             `A composite has a fiber volume fraction of $V_f = ${mf(Vf)}$, with $E_f = ${nf(Ef)}$ GPa for the fiber and $E_m = ${nf(Em)}$ GPa for the matrix. What is the modulus of elasticity along the fiber direction (rule of mixtures)?`),
     { n: Ec, tol: rel(Ec), u: "GPa" },
     T(`$V_m = 1 - ${mf(Vf)} = ${mf(Vm)}$. $E_c = V_fE_f + V_mE_m = ${mf(Vf)}\\cdot ${mf(Ef)} + ${mf(Vm)}\\cdot ${mf(Em)} \\approx ${mf(Ec, 1)}$ GPa.`,
       `$V_m = 1 - ${mf(Vf)} = ${mf(Vm)}$. $E_c = V_fE_f + V_mE_m = ${mf(Vf)}\\cdot ${mf(Ef)} + ${mf(Vm)}\\cdot ${mf(Em)} \\approx ${mf(Ec, 1)}$ GPa.`)]; },
 // eksamen: forhindret termisk utvidelse gir spenning
 () => { const mat = R.p([["stål", "steel", 200, 12e-6], ["aluminium", "aluminum", 70, 23e-6], ["kobber", "copper", 120, 17e-6]]);
   const dT = R.i(20, 120), sigma = mat[2] * 1000 * mat[3] * dT, epsPct = mat[3] * dT * 100;
   return [T(`En ${mat[0]}stav er låst fast i begge ender slik at den ikke kan utvide seg, og varmes ${dT} K. E-modulen er ${mat[2]} GPa og lengdeutvidelseskoeffisienten er $\\alpha = ${mat[3] * 1e6}\\cdot10^{-6}$ /K. Hvor stor trykkspenning bygges det opp i staven?`,
             `A ${mat[1]} rod is clamped at both ends so it cannot expand, and is heated by ${dT} K. The modulus of elasticity is ${mat[2]} GPa and the coefficient of linear expansion is $\\alpha = ${mat[3] * 1e6}\\cdot10^{-6}$ /K. What compressive stress builds up in the rod?`),
     { n: sigma, tol: rel(sigma), u: "MPa" },
     T(`Fri utvidelse ville gitt tøyningen $\\varepsilon = \\alpha\\Delta T \\approx ${mf(epsPct)}$ %. Siden endene er låst, må denne tøyningen motvirkes av en like stor elastisk trykktøyning: $\\sigma = E\\alpha\\Delta T \\approx ${mf(sigma, 1)}$ MPa.`,
       `Free expansion would give the strain $\\varepsilon = \\alpha\\Delta T \\approx ${mf(epsPct)}$ %. Since the ends are fixed, this strain must be balanced by an equal elastic compressive strain: $\\sigma = E\\alpha\\Delta T \\approx ${mf(sigma, 1)}$ MPa.`)]; }
);

// ================= KJEMI – enhet 0: Mol og støkiometri =================
THEORY("KJEMI", 0, {
nb: `## Hva handler det om?
Kjemiske reaksjoner skjer i faste tallforhold mellom molekyler, men i laboratoriet veier vi stoffer i gram. Mol er broen mellom disse to verdenene: ett mol er nøyaktig $6,022\\cdot10^{23}$ partikler (Avogadros tall), og molar masse forteller hvor mange gram ett mol av et stoff veier. Støkiometri er regnestykkene som bruker de balanserte reaksjonslikningene til å regne om mellom mengder av reaktanter og produkter – helt nødvendig når en ingeniør skal dimensjonere en reaktor eller beregne hvor mye råstoff en prosess trenger.

## Begreper og formler
- Molar masse $M$ (g/mol): summen av atommassene i formelen, fra periodesystemet.
- Antall mol: $n = m/M$, der $m$ er massen i gram.
- Balansert reaksjonslikning: koeffisientene foran hver formel forteller molforholdet mellom stoffene, ikke masseforholdet.
- Begrensende reaktant: den reaktanten som brukes opp først; den bestemmer maksimalt mulig mengde produkt (teoretisk utbytte).
- Fremgangsmåte for begrensende reaktant: regn om alle reaktanter til mol, del på koeffisienten i den balanserte likningen, og se hvilken som gir minst – det er den begrensende.
- Teoretisk utbytte: mengden produkt beregnet fra den begrensende reaktanten.
- Utbytteprosent: $$\\text{utbytte \\%} = \\frac{\\text{faktisk utbytte}}{\\text{teoretisk utbytte}}\\cdot 100\\%$$
- Molaritet (konsentrasjon): $c = n/V$, med $V$ i liter og $c$ i mol/L (M).
- Fortynning: $c_1V_1 = c_2V_2$ (antall mol er det samme før og etter fortynning).

## Slik løser du oppgavene
1. Skriv (eller finn) den balanserte reaksjonslikningen. Sjekk at antall atomer av hvert grunnstoff er likt på begge sider.
2. Regn om alt du har oppgitt (masse, volum, konsentrasjon) til mol.
3. Har du to reaktanter: del molmengden på koeffisienten for hver, og den med minst forhold er begrensende.
4. Bruk molforholdet fra likningen til å finne mol av produktet, og regn om til gram med $m = nM$ hvis nødvendig.
5. Utbytteprosent: sammenlign faktisk (oppgitt) utbytte med det teoretiske du nettopp regnet ut.

### Eksempel
12 g hydrogengass ($M_{H_2}=2,02$ g/mol) reagerer med 64 g oksygengass ($M_{O_2}=32,00$ g/mol) etter $\\mathrm{2H_2 + O_2 \\to 2H_2O}$. Hvilken reaktant er begrensende, og hvor mange gram vann ($M_{H_2O}=18,02$ g/mol) dannes teoretisk?
1. Mol: $n_{H_2} = 12/2,02 \\approx 5,94$ mol, $n_{O_2} = 64/32,00 = 2,00$ mol.
2. Del på koeffisientene: $5,94/2 \\approx 2,97$ mot $2,00/1 = 2,00$. $O_2$ gir lavest forhold, så $O_2$ er begrensende.
3. Molforhold $O_2:H_2O = 1:2$, så $n_{H_2O} = 2\\cdot 2,00 = 4,00$ mol.
4. Masse: $m = nM = 4,00\\cdot 18,02 \\approx 72,1$ g.

Svar: $O_2$ er begrensende, og det dannes ca. 72,1 g vann.

## Vanlige feil
- Å bruke masseforhold direkte fra likningen i stedet for molforhold – koeffisientene gjelder mol, ikke gram.
- Å glemme å dele molmengden på koeffisienten når man skal finne den begrensende reaktanten.
- Å bruke feil molar masse – se opp riktig atommasse for hvert grunnstoff, og summer riktig antall.
- Å forveksle utbytteprosent med den begrensende reaktantens andel av massen.

> Mol er broen mellom gram og reaksjonslikningens tallforhold: regn alt om til mol først, bruk molforholdene fra den balanserte likningen, og regn tilbake til gram til slutt.`,
en: `## What is it about?
Chemical reactions occur in fixed numerical ratios between molecules, but in the lab we weigh substances in grams. The mole is the bridge between these two worlds: one mole is exactly $6.022\\cdot10^{23}$ particles (Avogadro's number), and the molar mass tells you how many grams one mole of a substance weighs. Stoichiometry is the set of calculations that use the balanced reaction equation to convert between amounts of reactants and products – essential when an engineer has to size a reactor or calculate how much raw material a process needs.

## Concepts and formulas
- Molar mass $M$ (g/mol): the sum of the atomic masses in the formula, from the periodic table.
- Number of moles: $n = m/M$, where $m$ is the mass in grams.
- Balanced reaction equation: the coefficients in front of each formula give the mole ratio between the substances, not the mass ratio.
- Limiting reactant: the reactant that is used up first; it determines the maximum possible amount of product (the theoretical yield).
- Procedure for the limiting reactant: convert all reactants to moles, divide by the coefficient in the balanced equation, and see which gives the smallest value – that one is limiting.
- Theoretical yield: the amount of product calculated from the limiting reactant.
- Percent yield: $$\\text{percent yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}}\\cdot 100\\%$$
- Molarity (concentration): $c = n/V$, with $V$ in liters and $c$ in mol/L (M).
- Dilution: $c_1V_1 = c_2V_2$ (the number of moles is the same before and after dilution).

## How to solve the problems
1. Write (or look up) the balanced reaction equation. Check that the number of atoms of each element is equal on both sides.
2. Convert everything given (mass, volume, concentration) to moles.
3. If there are two reactants: divide the number of moles by the coefficient for each, and the one with the smaller ratio is limiting.
4. Use the mole ratio from the equation to find the moles of product, and convert to grams with $m = nM$ if needed.
5. Percent yield: compare the actual (given) yield with the theoretical yield you just calculated.

### Example
12 g of hydrogen gas ($M_{H_2}=2.02$ g/mol) reacts with 64 g of oxygen gas ($M_{O_2}=32.00$ g/mol) according to $\\mathrm{2H_2 + O_2 \\to 2H_2O}$. Which reactant is limiting, and how many grams of water ($M_{H_2O}=18.02$ g/mol) are theoretically formed?
1. Moles: $n_{H_2} = 12/2.02 \\approx 5.94$ mol, $n_{O_2} = 64/32.00 = 2.00$ mol.
2. Divide by the coefficients: $5.94/2 \\approx 2.97$ versus $2.00/1 = 2.00$. $O_2$ gives the lower ratio, so $O_2$ is limiting.
3. Mole ratio $O_2:H_2O = 1:2$, so $n_{H_2O} = 2\\cdot 2.00 = 4.00$ mol.
4. Mass: $m = nM = 4.00\\cdot 18.02 \\approx 72.1$ g.

Answer: $O_2$ is limiting, and about 72.1 g of water is formed.

## Common mistakes
- Using mass ratios directly from the equation instead of mole ratios – the coefficients apply to moles, not grams.
- Forgetting to divide the number of moles by the coefficient when finding the limiting reactant.
- Using the wrong molar mass – look up the correct atomic mass for each element and add the right number of atoms.
- Confusing percent yield with the limiting reactant's share of the total mass.

> The mole is the bridge between grams and the reaction equation's numerical ratios: convert everything to moles first, use the mole ratios from the balanced equation, and convert back to grams at the end.`
});

BIQ("KJEMI", 0, [
 ["Hvorfor må en reaksjonslikning være balansert før du kan bruke den til støkiometriberegninger?",
  ["Fordi molforholdet mellom stoffene bare stemmer når atomantallet er likt på begge sider", "Fordi massen ellers blir null", "Det spiller ingen rolle – koeffisientene er bare estetiske", "Fordi temperaturen da blir riktig"],
  "En balansert likning følger loven om bevaring av masse: antall atomer av hvert grunnstoff er likt på begge sider, og bare da stemmer koeffisientene som molforhold.",
  "Why must a reaction equation be balanced before you can use it for stoichiometry calculations?",
  ["Because the mole ratio between the substances is only correct when the number of atoms is equal on both sides", "Because the mass would otherwise be zero", "It does not matter – the coefficients are just decorative", "Because the temperature is then correct"],
  "A balanced equation follows the law of conservation of mass: the number of atoms of each element is equal on both sides, and only then do the coefficients give the correct mole ratios."],
 ["Du dobler mengden av BÅDE reaktantene i en reaksjon der den ene er begrensende. Hva skjer med hvilken reaktant som er begrensende?",
  ["Det er fortsatt samme reaktant som er begrensende – forholdet mellom dem er uendret", "Den andre reaktanten blir begrensende", "Ingen av dem er begrensende lenger", "Det avhenger av trykket"],
  "Hvilken reaktant som er begrensende, avgjøres av forholdet mellom molmengdene sammenlignet med koeffisientene. Dobler du begge like mye, er forholdet mellom dem uendret.",
  "You double the amount of BOTH reactants in a reaction where one of them is limiting. What happens to which reactant is limiting?",
  ["It is still the same reactant that is limiting – the ratio between them is unchanged", "The other reactant becomes limiting", "Neither of them is limiting anymore", "It depends on the pressure"],
  "Which reactant is limiting is decided by the ratio between the molar amounts compared with the coefficients. If you double both by the same factor, the ratio between them is unchanged."],
 ["Hvor mange gram oksygen finnes det i 50 g $\\mathrm{CO_2}$? ($M_{CO_2}=44,01$ g/mol, $M_O=16,00$ g/mol)",
  { n: 36.35537377868666, tol: 0.36, u: "g" },
  "Massandel oksygen: $2\\cdot 16,00/44,01 \\approx 0,7271$. Masse oksygen: $50\\cdot 0,7271 \\approx 36,4$ g.",
  "How many grams of oxygen are there in 50 g of $\\mathrm{CO_2}$? ($M_{CO_2}=44.01$ g/mol, $M_O=16.00$ g/mol)",
  null,
  "Mass fraction of oxygen: $2\\cdot 16.00/44.01 \\approx 0.7271$. Mass of oxygen: $50\\cdot 0.7271 \\approx 36.4$ g."]
]);

GEN("KJEMI", 0,
 // enkel: utbytteprosent
 () => { const theo = R.f(10, 120, 1), pct = R.f(55, 98, 1), actual = theo * pct / 100;
   return [T(`En reaksjon har et teoretisk utbytte på ${nf(theo)} g. I forsøket dannes ${nf(actual)} g. Hva er utbytteprosenten?`,
             `A reaction has a theoretical yield of ${nf(theo)} g. In the experiment, ${nf(actual)} g is formed. What is the percent yield?`),
     { n: pct, tol: rel(pct, 0.01, 0.3), u: "%" },
     T(`Utbytte % $= \\dfrac{\\text{faktisk}}{\\text{teoretisk}}\\cdot 100 = \\dfrac{${mf(actual, 3)}}{${mf(theo)}}\\cdot 100 \\approx ${mf(pct, 1)}$ %.`,
       `Percent yield $= \\dfrac{\\text{actual}}{\\text{theoretical}}\\cdot 100 = \\dfrac{${mf(actual, 3)}}{${mf(theo)}}\\cdot 100 \\approx ${mf(pct, 1)}$ %.`)]; },
 // eksamen: begrensende reaktant, forbrenning av propan
 () => { const mF = R.f(5, 60, 1), mO = R.f(20, 300, 5);
   const nF = mF / 44.10, nO = mO / 32.00, rF = nF / 1, rO = nO / 5, fuelLim = rF <= rO;
   const nCO2 = fuelLim ? 3 * nF : 3 * (nO / 5), mCO2 = nCO2 * 44.01;
   return [T(`Propan brenner fullstendig: $\\mathrm{C_3H_8 + 5O_2 \\to 3CO_2 + 4H_2O}$. Du har ${nf(mF)} g $\\mathrm{C_3H_8}$ ($M=44,10$ g/mol) og ${nf(mO)} g $\\mathrm{O_2}$ ($M=32,00$ g/mol). Hvor mange gram $\\mathrm{CO_2}$ ($M=44,01$ g/mol) dannes?`,
             `Propane burns completely: $\\mathrm{C_3H_8 + 5O_2 \\to 3CO_2 + 4H_2O}$. You have ${nf(mF)} g of $\\mathrm{C_3H_8}$ ($M=44.10$ g/mol) and ${nf(mO)} g of $\\mathrm{O_2}$ ($M=32.00$ g/mol). How many grams of $\\mathrm{CO_2}$ ($M=44.01$ g/mol) are formed?`),
     { n: mCO2, tol: rel(mCO2, 0.02), u: "g" },
     T(`$n_{C_3H_8} = ${mf(mF)}/44,10 \\approx ${mf(nF, 3)}$ mol, $n_{O_2} = ${mf(mO)}/32,00 \\approx ${mf(nO, 3)}$ mol. Delt på koeffisientene: $${mf(rF, 3)}$ mot $${mf(rO, 3)}$ – ${fuelLim ? "\\mathrm{C_3H_8}" : "\\mathrm{O_2}"} er begrensende. $n_{CO_2} = ${fuelLim ? "3n_{C_3H_8}" : "3n_{O_2}/5"} \\approx ${mf(nCO2, 3)}$ mol, som gir $m = nM \\approx ${mf(mCO2, 1)}$ g.`,
       `$n_{C_3H_8} = ${mf(mF)}/44.10 \\approx ${mf(nF, 3)}$ mol, $n_{O_2} = ${mf(mO)}/32.00 \\approx ${mf(nO, 3)}$ mol. Dividing by the coefficients: $${mf(rF, 3)}$ versus $${mf(rO, 3)}$ – ${fuelLim ? "\\mathrm{C_3H_8}" : "\\mathrm{O_2}"} is limiting. $n_{CO_2} = ${fuelLim ? "3n_{C_3H_8}" : "3n_{O_2}/5"} \\approx ${mf(nCO2, 3)}$ mol, giving $m = nM \\approx ${mf(mCO2, 1)}$ g.`)]; }
);

// ================= KJEMI – enhet 1: Syrer, baser og likevekt =================
THEORY("KJEMI", 1, {
nb: `## Hva handler det om?
Nesten alle kjemiske prosesser i vann – fra korrosjon til biologiske reaksjoner – påvirkes av hvor surt eller basisk miljøet er. pH-skalaen gjør det mulig å sammenligne konsentrasjonen av H⁺-ioner over mange tierpotenser med ett enkelt tall. Syrer og baser reagerer også med hverandre i likevekter, og Le Châteliers prinsipp forteller hvordan en likevekt reagerer når forholdene endres – avgjørende når man skal styre en prosess eller forstå hvorfor en buffer holder pH stabilt.

## Begreper og formler
- $\\mathrm{pH} = -\\log[\\mathrm{H^+}]$ og $\\mathrm{pOH} = -\\log[\\mathrm{OH^-}]$. Ved 25 °C: $\\mathrm{pH + pOH} = 14$.
- Sterke syrer/baser protolyserer fullstendig: $[\\mathrm{H^+}] = c_{syre}$ (for enprotiske syrer som HCl).
- Svake syrer protolyserer bare delvis, styrt av syrekonstanten $K_a$: $$K_a = \\frac{[\\mathrm{H^+}][\\mathrm{A^-}]}{[\\mathrm{HA}]}$$ Jo større $K_a$ (eller mindre $\\mathrm{p}K_a = -\\log K_a$), jo sterkere syre.
- For en svak syre med startkonsentrasjon $c$ og liten dissosiasjonsgrad kan man ofte tilnærme $[\\mathrm{H^+}] \\approx \\sqrt{K_ac}$.
- Buffer: en blanding av en svak syre og dens korresponderende base (eller omvendt) som holder pH nesten konstant når man tilsetter litt syre eller base.
- Likevektskonstanten $K$ endres ikke ved endret konsentrasjon eller trykk – bare ved temperaturendring.
- Le Châteliers prinsipp: økt konsentrasjon av en reaktant skyver likevekten mot produktene; økt trykk (i gassreaksjoner) skyver mot siden med færre gassmolekyler; økt temperatur skyver en endoterm reaksjon videre mot produktene.

## Slik løser du oppgavene
1. Avgjør om syren/basen er sterk eller svak. Sterk: $[\\mathrm{H^+}]$ (eller $[\\mathrm{OH^-}]$) er lik den oppgitte konsentrasjonen direkte.
2. Svak syre: sett opp $K_a$-uttrykket, bruk tilnærmingen $[\\mathrm{H^+}] \\approx \\sqrt{K_ac}$ hvis dissosiasjonen er liten (mindre enn ca. 5 %).
3. Regn pH $= -\\log[\\mathrm{H^+}]$, eller motsatt vei: $[\\mathrm{H^+}] = 10^{-\\mathrm{pH}}$.
4. Skal du finne pOH eller $[\\mathrm{OH^-}]$: bruk $\\mathrm{pH+pOH}=14$ og $\\mathrm{pOH}=-\\log[\\mathrm{OH^-}]$.
5. Likevektsforskyvning: se på hvilken side av likningen som «forsterkes» eller «avlastes» av endringen, og husk at bare temperatur endrer selve $K$.

### Eksempel
Eddiksyre (CH₃COOH) har $K_a = 1,8\\cdot10^{-5}$. Hva er pH i en 0,10 M løsning?
1. Eddiksyre er svak, så vi bruker tilnærmingen: $[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{1,8\\cdot10^{-5}\\cdot 0,10}$.
2. $[\\mathrm{H^+}] \\approx \\sqrt{1,8\\cdot10^{-6}} \\approx 1,34\\cdot10^{-3}$ M.
3. $\\mathrm{pH} = -\\log(1,34\\cdot10^{-3}) \\approx 2,87$.

Svar: pH ≈ 2,87. Legg merke til at dette er høyere (mindre surt) enn en sterk syre med samme konsentrasjon ville gitt (pH 1), fordi bare en liten del av eddiksyren protolyserer.

## Vanlige feil
- Å bruke $[\\mathrm{H^+}] = c$ for en svak syre – det gjelder bare for sterke syrer.
- Å blande $K_a$ og $\\mathrm{p}K_a$: en liten $\\mathrm{p}K_a$ betyr en sterk syre (stor $K_a$).
- Å tro at å tilsette en katalysator eller endre trykket i en løsning uten gass forskyver likevekten.
- Å glemme at $\\mathrm{pH+pOH}=14$ bare gjelder ved 25 °C.

> Sterke syrer/baser protolyserer fullstendig ($[\\mathrm{H^+}]=c$); svake gjør det bare delvis, styrt av $K_a$. Likevekten forskyves av konsentrasjon, trykk (gasser) og temperatur, men bare temperatur endrer selve $K$.`,
en: `## What is it about?
Almost every chemical process in water – from corrosion to biological reactions – is affected by how acidic or basic the environment is. The pH scale makes it possible to compare the concentration of H⁺ ions across many orders of magnitude with a single number. Acids and bases also react with each other in equilibria, and Le Chatelier's principle tells you how an equilibrium responds when conditions change – essential for controlling a process or understanding why a buffer keeps pH stable.

## Concepts and formulas
- $\\mathrm{pH} = -\\log[\\mathrm{H^+}]$ and $\\mathrm{pOH} = -\\log[\\mathrm{OH^-}]$. At 25 °C: $\\mathrm{pH + pOH} = 14$.
- Strong acids/bases ionize completely: $[\\mathrm{H^+}] = c_{acid}$ (for monoprotic acids like HCl).
- Weak acids ionize only partially, governed by the acid constant $K_a$: $$K_a = \\frac{[\\mathrm{H^+}][\\mathrm{A^-}]}{[\\mathrm{HA}]}$$ The larger $K_a$ (or the smaller $\\mathrm{p}K_a = -\\log K_a$), the stronger the acid.
- For a weak acid with initial concentration $c$ and a small degree of dissociation, you can often approximate $[\\mathrm{H^+}] \\approx \\sqrt{K_ac}$.
- Buffer: a mixture of a weak acid and its conjugate base (or the reverse) that keeps the pH nearly constant when a little acid or base is added.
- The equilibrium constant $K$ does not change with concentration or pressure – only with temperature.
- Le Chatelier's principle: increasing the concentration of a reactant shifts the equilibrium toward the products; increasing the pressure (in gas reactions) shifts it toward the side with fewer gas molecules; increasing the temperature shifts an endothermic reaction further toward the products.

## How to solve the problems
1. Decide whether the acid/base is strong or weak. Strong: $[\\mathrm{H^+}]$ (or $[\\mathrm{OH^-}]$) equals the given concentration directly.
2. Weak acid: set up the $K_a$ expression, use the approximation $[\\mathrm{H^+}] \\approx \\sqrt{K_ac}$ if the dissociation is small (less than about 5%).
3. Compute $\\mathrm{pH} = -\\log[\\mathrm{H^+}]$, or the reverse: $[\\mathrm{H^+}] = 10^{-\\mathrm{pH}}$.
4. To find pOH or $[\\mathrm{OH^-}]$: use $\\mathrm{pH+pOH}=14$ and $\\mathrm{pOH}=-\\log[\\mathrm{OH^-}]$.
5. Equilibrium shift: look at which side of the equation is "boosted" or "relieved" by the change, and remember that only temperature changes $K$ itself.

### Example
Acetic acid (CH₃COOH) has $K_a = 1.8\\cdot10^{-5}$. What is the pH of a 0.10 M solution?
1. Acetic acid is weak, so we use the approximation: $[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{1.8\\cdot10^{-5}\\cdot 0.10}$.
2. $[\\mathrm{H^+}] \\approx \\sqrt{1.8\\cdot10^{-6}} \\approx 1.34\\cdot10^{-3}$ M.
3. $\\mathrm{pH} = -\\log(1.34\\cdot10^{-3}) \\approx 2.87$.

Answer: pH ≈ 2.87. Note that this is higher (less acidic) than a strong acid of the same concentration would give (pH 1), because only a small fraction of the acetic acid ionizes.

## Common mistakes
- Using $[\\mathrm{H^+}] = c$ for a weak acid – that only applies to strong acids.
- Mixing up $K_a$ and $\\mathrm{p}K_a$: a small $\\mathrm{p}K_a$ means a strong acid (large $K_a$).
- Believing that adding a catalyst or changing the pressure of a solution with no gas shifts the equilibrium.
- Forgetting that $\\mathrm{pH+pOH}=14$ only holds at 25 °C.

> Strong acids/bases ionize completely ($[\\mathrm{H^+}]=c$); weak ones only partially, governed by $K_a$. The equilibrium is shifted by concentration, pressure (gases) and temperature, but only temperature changes $K$ itself.`
});

BIQ("KJEMI", 1, [
 ["Hvilken av disse er en svak syre?",
  ["Eddiksyre ($\\mathrm{CH_3COOH}$)", "Saltsyre ($\\mathrm{HCl}$)", "Salpetersyre ($\\mathrm{HNO_3}$)", "Svovelsyre ($\\mathrm{H_2SO_4}$, første trinn)"],
  "Eddiksyre protolyserer bare delvis i vann, mens HCl, HNO₃ og H₂SO₄ (første trinn) er sterke syrer som protolyserer fullstendig.",
  "Which of these is a weak acid?",
  ["Acetic acid ($\\mathrm{CH_3COOH}$)", "Hydrochloric acid ($\\mathrm{HCl}$)", "Nitric acid ($\\mathrm{HNO_3}$)", "Sulfuric acid ($\\mathrm{H_2SO_4}$, first step)"],
  "Acetic acid only ionizes partially in water, while HCl, HNO₃ and H₂SO₄ (first step) are strong acids that ionize completely."],
 ["For likevekten $\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}$ (eksoterm), hva skjer med mengden $\\mathrm{NH_3}$ dersom temperaturen økes?",
  ["Den avtar, fordi likevekten forskyves mot reaktantene", "Den øker", "Den er uendret", "Reaksjonen stopper helt"],
  "For en eksoterm reaksjon virker varme som et «produkt». Økt temperatur skyver derfor likevekten mot reaktantene, slik at mengden $\\mathrm{NH_3}$ avtar.",
  "For the equilibrium $\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}$ (exothermic), what happens to the amount of $\\mathrm{NH_3}$ if the temperature is increased?",
  ["It decreases, because the equilibrium shifts toward the reactants", "It increases", "It is unchanged", "The reaction stops completely"],
  "For an exothermic reaction, heat acts like a \"product\". Increasing the temperature therefore shifts the equilibrium toward the reactants, so the amount of $\\mathrm{NH_3}$ decreases."],
 ["En svak syre har $K_a = 1,8\\cdot10^{-4}$. Hva er pH i en 0,15 M løsning? (Dissosiasjonsgraden er liten.)",
  { n: 2.2843181179205065, tol: 0.05, u: "" },
  "$[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{1,8\\cdot10^{-4}\\cdot 0,15} \\approx 5,20\\cdot10^{-3}$ M. $\\mathrm{pH} = -\\log(5,20\\cdot10^{-3}) \\approx 2,28$.",
  "A weak acid has $K_a = 1.8\\cdot10^{-4}$. What is the pH of a 0.15 M solution? (The degree of dissociation is small.)",
  null,
  "$[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{1.8\\cdot10^{-4}\\cdot 0.15} \\approx 5.20\\cdot10^{-3}$ M. $\\mathrm{pH} = -\\log(5.20\\cdot10^{-3}) \\approx 2.28$."]
]);

GEN("KJEMI", 1,
 // enkel: pH fra generell H+-konsentrasjon
 () => { const c = R.f(0.0005, 0.05, 0.0005), pH = -Math.log10(c);
   return [T(`En sterk syre har konsentrasjonen $[\\mathrm{H^+}] = ${mf(c, 4)}$ M. Hva er pH?`,
             `A strong acid has a concentration of $[\\mathrm{H^+}] = ${mf(c, 4)}$ M. What is the pH?`),
     { n: pH, tol: 0.03, u: "" },
     T(`$\\mathrm{pH} = -\\log[\\mathrm{H^+}] = -\\log(${mf(c, 4)}) \\approx ${mf(pH, 2)}$.`,
       `$\\mathrm{pH} = -\\log[\\mathrm{H^+}] = -\\log(${mf(c, 4)}) \\approx ${mf(pH, 2)}$.`)]; },
 // eksamen: svak syre, Ka og konsentrasjon
 () => { const c = R.f(0.02, 0.5, 0.01), minPKa = 3 - Math.log10(c), pKa = +(minPKa + R.f(0.3, 1.5, 0.1)).toFixed(2);
   const Ka = Math.pow(10, -pKa), H = Math.sqrt(Ka * c), pH = -Math.log10(H);
   return [T(`En svak syre har $K_a = 10^{-${mf(pKa, 2)}}$ og konsentrasjonen ${nf(c, 3)} M. Hva er pH i løsningen? (Anta at dissosiasjonsgraden er liten.)`,
             `A weak acid has $K_a = 10^{-${mf(pKa, 2)}}$ and a concentration of ${nf(c, 3)} M. What is the pH of the solution? (Assume the degree of dissociation is small.)`),
     { n: pH, tol: 0.05, u: "" },
     T(`$[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{10^{-${mf(pKa, 2)}}\\cdot ${mf(c, 3)}} \\approx ${mf(H, 5)}$ M. $\\mathrm{pH} = -\\log[\\mathrm{H^+}] \\approx ${mf(pH, 2)}$.`,
       `$[\\mathrm{H^+}] \\approx \\sqrt{K_ac} = \\sqrt{10^{-${mf(pKa, 2)}}\\cdot ${mf(c, 3)}} \\approx ${mf(H, 5)}$ M. $\\mathrm{pH} = -\\log[\\mathrm{H^+}] \\approx ${mf(pH, 2)}$.`)]; }
);

// ================= KJEMI – enhet 2: Termokjemi og elektrokjemi =================
THEORY("KJEMI", 2, {
nb: `## Hva handler det om?
Termokjemi handler om energien som følger med kjemiske reaksjoner – hvor mye varme som frigjøres eller kreves, og om reaksjonen skjer av seg selv. Elektrokjemi kobler kjemiske reaksjoner til elektrisk strøm: i et batteri driver en spontan redoksreaksjon strømmen, mens elektrolyse bruker strøm til å tvinge frem en reaksjon som ellers ikke ville skjedd. Begge deler er sentrale for en ingeniør, enten det gjelder å dimensjonere kjøling for en eksoterm prosess, velge riktig batteri, eller forstå hvorfor et metall korroderer.

## Begreper og formler
- Reaksjonsentalpi $\\Delta H$: varmen som utveksles ved konstant trykk. $\\Delta H<0$ er eksotermt (avgir varme), $\\Delta H>0$ er endotermt.
- Hess' lov: $\\Delta H$ for en reaksjon avhenger bare av start- og slutt-tilstand, ikke av veien. Du kan derfor addere (og snu fortegn på) delreaksjoner for å finne $\\Delta H$ for en reaksjon du ikke har målt direkte.
- Fri energi (Gibbs energi): $\\Delta G = \\Delta H - T\\Delta S$. Reaksjonen er spontan (ved konstant $T$, $p$) når $\\Delta G < 0$.
- Redoksreaksjon: oksidasjon er tap av elektroner, reduksjon er opptak av elektroner (samlet: OIL RIG).
- Standard cellepotensial: $E^\\circ_{celle} = E^\\circ_{katode} - E^\\circ_{anode}$ (reduksjonspotensialer fra tabell). Positiv $E^\\circ_{celle}$ betyr en spontan (galvanisk) reaksjon.
- Faradays lov: mengden stoff omdannet ved elektrolyse er $m = \\dfrac{ItM}{zF}$, der $I$ er strøm (A), $t$ er tid (s), $M$ molar masse, $z$ antall elektroner per ion, og $F = 96\\,485$ C/mol.
- Katalysator: senker aktiveringsenergien og øker reaksjonsfarten uten å bli forbrukt eller endre $\\Delta G$ eller likevektskonstanten.

## Slik løser du oppgavene
1. Termokjemi/Hess: skriv opp delreaksjonene med kjente $\\Delta H$-verdier. Snu en reaksjon (bytt fortegn på $\\Delta H$) eller multipliser den (multipliser $\\Delta H$ tilsvarende) slik at delreaksjonene adderer seg til totalreaksjonen. Legg sammen $\\Delta H$-verdiene.
2. Spontanitet: sett inn $\\Delta H$, $T$ (i kelvin!) og $\\Delta S$ i $\\Delta G = \\Delta H - T\\Delta S$. Husk at $\\Delta S$ ofte oppgis i J/(mol·K), mens $\\Delta H$ oftest oppgis i kJ/mol – regn om til samme enhet.
3. Elektrokjemi: identifiser anode (oksidasjon) og katode (reduksjon), finn $E^\\circ_{celle}$ fra tabellverdier.
4. Elektrolyse: bruk Faradays lov, pass på at $z$ stemmer med ionets ladning.
5. Kontroller fortegn og størrelsesorden – en stor positiv $E^\\circ_{celle}$ eller en stort negativ $\\Delta G$ betyr en kraftig drivende reaksjon.

### Eksempel
Gitt $\\Delta H_1$ for $\\mathrm{C(s) + O_2(g) \\to CO_2(g)}$: $-393,5$ kJ/mol, og $\\Delta H_2$ for $\\mathrm{CO(g) + \\tfrac12O_2(g) \\to CO_2(g)}$: $-283,0$ kJ/mol. Finn $\\Delta H$ for $\\mathrm{C(s) + \\tfrac12O_2(g) \\to CO(g)}$.
1. Målreaksjonen pluss reaksjon 2 skal gi reaksjon 1: $[\\mathrm{C + \\tfrac12O_2 \\to CO}] + [\\mathrm{CO + \\tfrac12O_2 \\to CO_2}] = [\\mathrm{C + O_2 \\to CO_2}]$.
2. Derfor er $\\Delta H_{mål} = \\Delta H_1 - \\Delta H_2 = -393,5 - (-283,0)$.
3. $\\Delta H_{mål} = -110,5$ kJ/mol.

Svar: $\\Delta H \\approx -110,5$ kJ/mol (eksotermt).

## Vanlige feil
- Å glemme å bytte fortegn på $\\Delta H$ når en delreaksjon snus.
- Å bruke Celsius i stedet for kelvin i $\\Delta G = \\Delta H - T\\Delta S$.
- Å blande enhetene kJ og J for $\\Delta H$ og $\\Delta S$.
- Å tro at en katalysator endrer $\\Delta G$ eller likevektskonstanten – den endrer bare hvor fort likevekten nås.
- Å forveksle anode og katode: i en galvanisk celle skjer oksidasjon ved anoden.

> Hess' lov: adder delreaksjoner (med riktig fortegn og skalering) for å finne $\\Delta H$. Spontanitet avgjøres av $\\Delta G = \\Delta H - T\\Delta S$, og i elektrokjemi er $E^\\circ_{celle} = E^\\circ_{katode} - E^\\circ_{anode}$.`,
en: `## What is it about?
Thermochemistry deals with the energy that accompanies chemical reactions – how much heat is released or required, and whether the reaction happens on its own. Electrochemistry links chemical reactions to electric current: in a battery, a spontaneous redox reaction drives the current, while electrolysis uses current to force a reaction that would not otherwise happen. Both matter to an engineer, whether sizing cooling for an exothermic process, choosing the right battery, or understanding why a metal corrodes.

## Concepts and formulas
- Reaction enthalpy $\\Delta H$: the heat exchanged at constant pressure. $\\Delta H<0$ is exothermic (releases heat), $\\Delta H>0$ is endothermic.
- Hess's law: $\\Delta H$ for a reaction depends only on the initial and final states, not on the path. You can therefore add (and flip the sign of) sub-reactions to find the $\\Delta H$ of a reaction you have not measured directly.
- Free energy (Gibbs energy): $\\Delta G = \\Delta H - T\\Delta S$. The reaction is spontaneous (at constant $T$, $p$) when $\\Delta G < 0$.
- Redox reaction: oxidation is the loss of electrons, reduction is the gain of electrons (mnemonic: OIL RIG).
- Standard cell potential: $E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}$ (reduction potentials from a table). A positive $E^\\circ_{cell}$ means a spontaneous (galvanic) reaction.
- Faraday's law: the amount of substance converted by electrolysis is $m = \\dfrac{ItM}{zF}$, where $I$ is the current (A), $t$ is time (s), $M$ is the molar mass, $z$ is the number of electrons per ion, and $F = 96\\,485$ C/mol.
- Catalyst: lowers the activation energy and increases the reaction rate without being consumed or changing $\\Delta G$ or the equilibrium constant.

## How to solve the problems
1. Thermochemistry/Hess: write down the sub-reactions with known $\\Delta H$ values. Flip a reaction (change the sign of $\\Delta H$) or multiply it (multiply $\\Delta H$ accordingly) so the sub-reactions add up to the overall reaction. Add the $\\Delta H$ values.
2. Spontaneity: substitute $\\Delta H$, $T$ (in kelvin!) and $\\Delta S$ into $\\Delta G = \\Delta H - T\\Delta S$. Remember $\\Delta S$ is often given in J/(mol·K) while $\\Delta H$ is usually in kJ/mol – convert to the same unit.
3. Electrochemistry: identify the anode (oxidation) and cathode (reduction), find $E^\\circ_{cell}$ from table values.
4. Electrolysis: use Faraday's law, making sure $z$ matches the ion's charge.
5. Check the sign and order of magnitude – a large positive $E^\\circ_{cell}$ or a large negative $\\Delta G$ means a strongly driving reaction.

### Example
Given $\\Delta H_1$ for $\\mathrm{C(s) + O_2(g) \\to CO_2(g)}$: $-393.5$ kJ/mol, and $\\Delta H_2$ for $\\mathrm{CO(g) + \\tfrac12O_2(g) \\to CO_2(g)}$: $-283.0$ kJ/mol. Find $\\Delta H$ for $\\mathrm{C(s) + \\tfrac12O_2(g) \\to CO(g)}$.
1. The target reaction plus reaction 2 gives reaction 1: $[\\mathrm{C + \\tfrac12O_2 \\to CO}] + [\\mathrm{CO + \\tfrac12O_2 \\to CO_2}] = [\\mathrm{C + O_2 \\to CO_2}]$.
2. Therefore $\\Delta H_{target} = \\Delta H_1 - \\Delta H_2 = -393.5 - (-283.0)$.
3. $\\Delta H_{target} = -110.5$ kJ/mol.

Answer: $\\Delta H \\approx -110.5$ kJ/mol (exothermic).

## Common mistakes
- Forgetting to flip the sign of $\\Delta H$ when a sub-reaction is reversed.
- Using Celsius instead of kelvin in $\\Delta G = \\Delta H - T\\Delta S$.
- Mixing the units kJ and J for $\\Delta H$ and $\\Delta S$.
- Believing a catalyst changes $\\Delta G$ or the equilibrium constant – it only changes how fast equilibrium is reached.
- Confusing anode and cathode: in a galvanic cell, oxidation happens at the anode.

> Hess's law: add sub-reactions (with the correct sign and scaling) to find $\\Delta H$. Spontaneity is decided by $\\Delta G = \\Delta H - T\\Delta S$, and in electrochemistry $E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}$.`
});

BIQ("KJEMI", 2, [
 ["Hva er anoden i en elektrokjemisk celle?",
  ["Elektroden der oksidasjon skjer", "Elektroden der reduksjon skjer", "Alltid den positive elektroden", "Elektroden med høyest reduksjonspotensial"],
  "Definisjonen av anode er elektroden der oksidasjon (tap av elektroner) skjer, enten cellen er galvanisk eller elektrolytisk. Reduksjon skjer ved katoden.",
  "What is the anode in an electrochemical cell?",
  ["The electrode where oxidation occurs", "The electrode where reduction occurs", "Always the positive electrode", "The electrode with the highest reduction potential"],
  "The definition of the anode is the electrode where oxidation (loss of electrons) occurs, whether the cell is galvanic or electrolytic. Reduction occurs at the cathode."],
 ["Reaksjonen $\\mathrm{A \\to B}$ har $\\Delta H = -40$ kJ/mol og $\\Delta S = -60$ J/(mol·K). Ved hvilke temperaturer er reaksjonen spontan?",
  ["Bare ved lave temperaturer (under ca. 667 K)", "Bare ved høye temperaturer", "Ved alle temperaturer", "Aldri"],
  "$\\Delta G = \\Delta H - T\\Delta S = -40 - T\\cdot(-0,060)$ kJ/mol. $\\Delta G<0$ krever $T < 40/0,060 \\approx 667$ K. Både $\\Delta H$ og $\\Delta S$ er negative, så reaksjonen er bare spontan ved lave temperaturer.",
  "The reaction $\\mathrm{A \\to B}$ has $\\Delta H = -40$ kJ/mol and $\\Delta S = -60$ J/(mol·K). At which temperatures is the reaction spontaneous?",
  ["Only at low temperatures (below about 667 K)", "Only at high temperatures", "At all temperatures", "Never"],
  "$\\Delta G = \\Delta H - T\\Delta S = -40 - T\\cdot(-0.060)$ kJ/mol. $\\Delta G<0$ requires $T < 40/0.060 \\approx 667$ K. Both $\\Delta H$ and $\\Delta S$ are negative, so the reaction is spontaneous only at low temperatures."],
 ["Beregn standard cellepotensial når katoden har $E^\\circ = +0,80$ V ($\\mathrm{Ag^+/Ag}$) og anoden har $E^\\circ = -0,76$ V ($\\mathrm{Zn^{2+}/Zn}$).",
  { n: 1.56, tol: 0.02, u: "V" },
  "$E^\\circ_{celle} = E^\\circ_{katode} - E^\\circ_{anode} = 0,80 - (-0,76) = 1,56$ V.",
  "Calculate the standard cell potential when the cathode has $E^\\circ = +0.80$ V ($\\mathrm{Ag^+/Ag}$) and the anode has $E^\\circ = -0.76$ V ($\\mathrm{Zn^{2+}/Zn}$).",
  null,
  "$E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode} = 0.80 - (-0.76) = 1.56$ V."]
]);

GEN("KJEMI", 2,
 // enkel: standard cellepotensial
 () => { let Ea, Eb; do { Ea = R.f(-2.5, 1.5, 0.05); Eb = R.f(-2.5, 1.5, 0.05); } while (Math.abs(Ea - Eb) < 0.1);
   const cathA = Ea >= Eb, Ecell = Math.max(Ea, Eb) - Math.min(Ea, Eb);
   return [T(`To halvceller har standard reduksjonspotensial $E^\\circ_A = ${mf(Ea, 2)}$ V og $E^\\circ_B = ${mf(Eb, 2)}$ V. Hva blir standard cellepotensial når de kobles sammen i en galvanisk celle?`,
             `Two half-cells have standard reduction potentials $E^\\circ_A = ${mf(Ea, 2)}$ V and $E^\\circ_B = ${mf(Eb, 2)}$ V. What is the standard cell potential when they are connected in a galvanic cell?`),
     { n: Ecell, tol: rel(Ecell, 0.02, 0.02), u: "V" },
     T(`I en galvanisk celle er katoden den halvcellen med høyest reduksjonspotensial: ${cathA ? "A" : "B"} ($E^\\circ=${mf(Math.max(Ea, Eb), 2)}$ V), og den andre er anoden ($E^\\circ=${mf(Math.min(Ea, Eb), 2)}$ V). $E^\\circ_{celle} = E^\\circ_{katode} - E^\\circ_{anode} = ${mf(Math.max(Ea, Eb), 2)} - (${mf(Math.min(Ea, Eb), 2)}) \\approx ${mf(Ecell, 2)}$ V.`,
       `In a galvanic cell, the cathode is the half-cell with the higher reduction potential: ${cathA ? "A" : "B"} ($E^\\circ=${mf(Math.max(Ea, Eb), 2)}$ V), and the other is the anode ($E^\\circ=${mf(Math.min(Ea, Eb), 2)}$ V). $E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode} = ${mf(Math.max(Ea, Eb), 2)} - (${mf(Math.min(Ea, Eb), 2)}) \\approx ${mf(Ecell, 2)}$ V.`)]; },
 // eksamen: Hess' lov
 () => { let dH1, dH2; do { dH1 = -R.f(300, 450, 5); dH2 = -R.f(200, 320, 5); } while (dH1 > dH2 - 60);
   const dHt = dH1 - dH2;
   return [T(`Du får oppgitt $\\Delta H_1 = ${mf(dH1, 1)}$ kJ/mol for $\\mathrm{C(s) + O_2(g) \\to CO_2(g)}$, og $\\Delta H_2 = ${mf(dH2, 1)}$ kJ/mol for $\\mathrm{CO(g) + \\tfrac12O_2(g) \\to CO_2(g)}$. Bruk Hess' lov til å finne $\\Delta H$ for $\\mathrm{C(s) + \\tfrac12O_2(g) \\to CO(g)}$.`,
             `You are given $\\Delta H_1 = ${mf(dH1, 1)}$ kJ/mol for $\\mathrm{C(s) + O_2(g) \\to CO_2(g)}$, and $\\Delta H_2 = ${mf(dH2, 1)}$ kJ/mol for $\\mathrm{CO(g) + \\tfrac12O_2(g) \\to CO_2(g)}$. Use Hess's law to find $\\Delta H$ for $\\mathrm{C(s) + \\tfrac12O_2(g) \\to CO(g)}$.`),
     { n: dHt, tol: rel(dHt, 0.02, 0.5), u: "kJ/mol" },
     T(`Målreaksjonen pluss reaksjon 2 gir reaksjon 1, så $\\Delta H_{mål} = \\Delta H_1 - \\Delta H_2 = ${mf(dH1, 1)} - (${mf(dH2, 1)}) \\approx ${mf(dHt, 1)}$ kJ/mol.`,
       `The target reaction plus reaction 2 gives reaction 1, so $\\Delta H_{target} = \\Delta H_1 - \\Delta H_2 = ${mf(dH1, 1)} - (${mf(dH2, 1)}) \\approx ${mf(dHt, 1)}$ kJ/mol.`)]; }
);

// Retter en eksisterende feil i subjects2_b.js (KJEMI enhet 2, generator 0): den gir
// bare 2 svaralternativer i stedet for minst 3. Vi redigerer ikke andre filer, så vi
// bytter ut funksjonen i det allerede lastede COURSES-objektet i stedet (samme spørsmål
// og riktig logikk, men med et tredje, plausibelt feilalternativ).
{
  const kjemi = COURSES.find(c => c.code === "KJEMI");
  if (kjemi && kjemi.units[2] && kjemi.units[2].gen && kjemi.units[2].gen[0]) {
    kjemi.units[2].gen[0] = () => {
      const dH = R.p([-100, -50, 50, 100, 180]), dS = R.p([-200, -100, 50, 100, 200]), Tk = R.p([250, 298, 500, 1000]);
      const dG = dH - Tk * dS / 1000, sp = dG < 0;
      return [T(`$\\Delta H = ${dH}$ kJ/mol og $\\Delta S = ${dS}$ J/(mol·K). Er reaksjonen spontan ved ${Tk} K?`,
                `$\\Delta H = ${dH}$ kJ/mol and $\\Delta S = ${dS}$ J/(mol·K). Is the reaction spontaneous at ${Tk} K?`),
        T(sp ? ["Ja, fordi $\\Delta G < 0$", "Nei, fordi $\\Delta G > 0$", "Bare hvis det tilsettes en katalysator"]
              : ["Nei, fordi $\\Delta G > 0$", "Ja, fordi $\\Delta G < 0$", "Bare hvis det tilsettes en katalysator"],
          sp ? ["Yes, because $\\Delta G < 0$", "No, because $\\Delta G > 0$", "Only if a catalyst is added"]
              : ["No, because $\\Delta G > 0$", "Yes, because $\\Delta G < 0$", "Only if a catalyst is added"]),
        `$\\Delta G = ${dH} - ${Tk}\\cdot(${mf(dS / 1000, 3)}) = ${mf(dG, 1)}$ kJ/mol.`]; };
  }
}

// __SLUTT__
})();
