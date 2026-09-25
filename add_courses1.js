// ============================================================
//  add_courses1.js – nye fag etter norske ingeniørstudieplaner:
//  BYGG Bygg og konstruksjon, DISK Diskret matematikk.
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
GROUP_NAMES["Bygg og anlegg"] = ["Bygg og anlegg", "Civil Engineering"];

NEWCOURSE({ code: "BYGG", group: "Bygg og anlegg", nb: "Bygg og konstruksjon", en: "Building and Structures", s: ["By", "BS"],
  eqText: { nb: "Bygg-ingeniør: laster, bygningsfysikk og landmåling", en: "Civil engineering: loads, building physics and surveying" },
  units: [["Laster og lastkombinasjoner", "Loads and load combinations"], ["Bygningsfysikk: varme og fukt", "Building physics: heat and moisture"], ["Landmåling", "Surveying"]] });
NEWCOURSE({ code: "DISK", group: "Programmering og data", nb: "Diskret matematikk", en: "Discrete Mathematics", s: ["DM", "DM"],
  eqText: { nb: "Logikk, kombinatorikk og grafer – grunnlaget for data", en: "Logic, combinatorics and graphs – the basis of computing" },
  units: [["Logikk og mengder", "Logic and sets"], ["Kombinatorikk", "Combinatorics"], ["Grafer og modulregning", "Graphs and modular arithmetic"]] });
Object.assign(PREREQ, { BYGG: { need: ["MAPE1300"], nice: ["MATS2100"] }, DISK: { need: ["GMAT"], nice: ["MEK1300"] } });

// ================= BYGG 0: Laster og lastkombinasjoner =================
THEORY("BYGG", 0, {
nb: md`## Hva handler det om?
Før du kan dimensjonere en bjelke eller et dekke, må du vite hvilke laster det skal tåle. I Norge følger vi Eurokodene (NS-EN 1990 og 1991). Du deler lastene i faste og variable laster, gjør flatelaster om til linjelaster på bjelkene, og legger på sikkerhetsfaktorer.

## Begreper og formler
- **Permanent last** $G$: egenvekten av konstruksjonen, gulv, tak og faste installasjoner. Regnes fra tykkelse og tyngdetetthet, for eksempel betong 25 kN/m³.
- **Variabel last** $Q$: nyttelast fra personer og inventar (bolig 2,0 kN/m², kontor 3,0 kN/m²), snø og vind.
- **Snølast på tak:** $s = \mu\,s_k$, der $s_k$ er snølasten på mark for stedet og formfaktoren $\mu = 0{,}8$ for et flatt tak.
- **Fra flatelast til linjelast:** en bjelke bærer lasten fra en stripe like bred som senteravstanden $c$:
$$q = p\cdot c \quad [\text{kN/m}]$$
- **Bruddgrensetilstand** (forenklet, dominerende variabel last): lastene ganges med lastfaktorer.
$$q_d = 1{,}2\,G + 1{,}5\,Q$$
- **Fritt opplagt bjelke med jevnt fordelt last:** $M_{maks} = \dfrac{qL^2}{8}$ og opplagerkraft $R = \dfrac{qL}{2}$.

## Slik løser du oppgavene
1. Finn flatelastene i kN/m² (egenlast og nyttelast hver for seg).
2. Gang med senteravstanden for å få linjelast i kN/m.
3. Kombiner med lastfaktorene.
4. Regn moment og opplagerkrefter for bjelken.

### Eksempel
Bjelkelag i en bolig: egenlast 0,5 kN/m², nyttelast 2,0 kN/m², senteravstand 0,6 m og spenn 4,0 m.
1. $G = 0{,}5\cdot 0{,}6 = 0{,}3$ kN/m og $Q = 2{,}0\cdot 0{,}6 = 1{,}2$ kN/m.
2. $q_d = 1{,}2\cdot 0{,}3 + 1{,}5\cdot 1{,}2 = 2{,}16$ kN/m.
3. $M = 2{,}16\cdot 4^2/8 = 4{,}32$ kNm.

## Vanlige feil
- Å glemme å gange flatelasten med senteravstanden.
- Å bruke lastfaktor på lastene to ganger, eller glemme den helt.
- Å blande kN og N, eller mm og m, i momentformelen.

> Flatelast × senteravstand = linjelast. Bruddgrense: 1,2 G + 1,5 Q. Moment: qL²/8.`,
en: md`## What is it about?
Before you can design a beam or a floor, you need to know which loads it must carry. In Norway we follow the Eurocodes (NS-EN 1990 and 1991). You split the loads into permanent and variable loads, turn area loads into line loads on the beams, and apply safety factors.

## Concepts and formulas
- **Permanent load** $G$: the self-weight of the structure, floors, roof and fixed installations. Computed from thickness and unit weight, for example concrete 25 kN/m³.
- **Variable load** $Q$: imposed load from people and furniture (housing 2.0 kN/m², offices 3.0 kN/m²), snow and wind.
- **Snow load on a roof:** $s = \mu\,s_k$, where $s_k$ is the ground snow load for the site and the shape factor $\mu = 0.8$ for a flat roof.
- **From area load to line load:** a beam carries the load from a strip as wide as the spacing $c$:
$$q = p\cdot c \quad [\text{kN/m}]$$
- **Ultimate limit state** (simplified, one dominant variable load): the loads are multiplied by load factors.
$$q_d = 1.2\,G + 1.5\,Q$$
- **Simply supported beam with a uniform load:** $M_{max} = \dfrac{qL^2}{8}$ and support reaction $R = \dfrac{qL}{2}$.

## How to solve the problems
1. Find the area loads in kN/m² (self-weight and imposed load separately).
2. Multiply by the spacing to get a line load in kN/m.
3. Combine with the load factors.
4. Compute the moment and support reactions for the beam.

### Example
Floor joists in a house: self-weight 0.5 kN/m², imposed load 2.0 kN/m², spacing 0.6 m and span 4.0 m.
1. $G = 0.5\cdot 0.6 = 0.3$ kN/m and $Q = 2.0\cdot 0.6 = 1.2$ kN/m.
2. $q_d = 1.2\cdot 0.3 + 1.5\cdot 1.2 = 2.16$ kN/m.
3. $M = 2.16\cdot 4^2/8 = 4.32$ kNm.

## Common mistakes
- Forgetting to multiply the area load by the spacing.
- Applying the load factor twice, or forgetting it.
- Mixing kN and N, or mm and m, in the moment formula.

> Area load × spacing = line load. Ultimate: 1.2 G + 1.5 Q. Moment: qL²/8.`
});
BIQ("BYGG", 0, [
  ["Et gulv har nyttelast 2,0 kN/m². Bjelkene ligger med senteravstand 0,6 m. Hvor stor linjelast får hver bjelke fra nyttelasten?",
   { n: 1.2, tol: 0.005, u: "kN/m" }, S`$q = p\cdot c = 2{,}0\cdot 0{,}6 = 1{,}2$ kN/m.`,
   "A floor has an imposed load of 2.0 kN/m². The beams are spaced 0.6 m apart. What line load does each beam get from the imposed load?", null,
   S`$q = p\cdot c = 2.0\cdot 0.6 = 1.2$ kN/m.`],
  ["En bjelke har permanent last 3,0 kN/m og nyttelast 2,0 kN/m. Hva er dimensjonerende last i bruddgrensetilstand (1,2G + 1,5Q)?",
   { n: 6.6, tol: 0.01, u: "kN/m" }, S`$q_d = 1{,}2\cdot 3{,}0 + 1{,}5\cdot 2{,}0 = 3{,}6 + 3{,}0 = 6{,}6$ kN/m.`,
   "A beam has a permanent load of 3.0 kN/m and an imposed load of 2.0 kN/m. What is the design load in the ultimate limit state (1.2G + 1.5Q)?", null,
   S`$q_d = 1.2\cdot 3.0 + 1.5\cdot 2.0 = 3.6 + 3.0 = 6.6$ kN/m.`],
  ["En fritt opplagt bjelke med spenn 4,0 m har jevnt fordelt last 6,6 kN/m. Hva er det største momentet?",
   { n: 13.2, tol: 0.02, u: "kNm" }, S`$M = \dfrac{qL^2}{8} = \dfrac{6{,}6\cdot 4^2}{8} = 13{,}2$ kNm.`,
   "A simply supported beam with a span of 4.0 m has a uniform load of 6.6 kN/m. What is the largest moment?", null,
   S`$M = \dfrac{qL^2}{8} = \dfrac{6.6\cdot 4^2}{8} = 13.2$ kNm.`],
  [S`Snølasten på mark er $s_k = 3{,}5$ kN/m². Hva er snølasten på et flatt tak ($\mu = 0{,}8$)?`,
   { n: 2.8, tol: 0.01, u: "kN/m²" }, S`$s = \mu\,s_k = 0{,}8\cdot 3{,}5 = 2{,}8$ kN/m².`,
   S`The ground snow load is $s_k = 3.5$ kN/m². What is the snow load on a flat roof ($\mu = 0.8$)?`, null,
   S`$s = \mu\,s_k = 0.8\cdot 3.5 = 2.8$ kN/m².`],
  ["Hvilken last er en permanent last?",
   ["Egenvekten av konstruksjonen", "Snø på taket", "Personer og møbler", "Vind mot fasaden"],
   "Permanente laster virker hele tiden med omtrent samme størrelse, som egenvekt. Snø, vind og nyttelast varierer og er variable laster.",
   "Which load is a permanent load?",
   ["The self-weight of the structure", "Snow on the roof", "People and furniture", "Wind against the facade"],
   "Permanent loads act all the time with roughly the same size, like self-weight. Snow, wind and imposed loads vary and are variable loads."],
  ["Hvorfor ganges lastene med lastfaktorer større enn 1 i bruddgrensetilstanden?",
   ["For å ta høyde for usikkerhet i lastene og sørge for sikkerhet mot brudd", "Fordi lastene alltid er større enn målt", "For å gjøre konstruksjonen lettere", "Fordi Eurokoden bruker andre enheter"],
   "Lastene kan bli større enn antatt, og beregningene er forenklinger. Lastfaktorene gir en sikkerhetsmargin. Variable laster er mest usikre og får derfor størst faktor (1,5).",
   "Why are the loads multiplied by load factors greater than 1 in the ultimate limit state?",
   ["To allow for uncertainty in the loads and ensure safety against failure", "Because the loads are always larger than measured", "To make the structure lighter", "Because the Eurocode uses other units"],
   "The loads may be larger than assumed, and the calculations are simplifications. The load factors provide a safety margin. Variable loads are the most uncertain and therefore get the largest factor (1.5)."],
  ["Et betongdekke er 200 mm tykt. Betong har tyngdetetthet 25 kN/m³. Hvor stor er egenlasten per m²?",
   { n: 5, tol: 0.01, u: "kN/m²" }, S`$g = 0{,}200\cdot 25 = 5{,}0$ kN/m².`,
   "A concrete slab is 200 mm thick. Concrete has a unit weight of 25 kN/m³. What is the self-weight per m²?", null,
   S`$g = 0.200\cdot 25 = 5.0$ kN/m².`],
  ["En fritt opplagt bjelke med spenn 4,0 m har last 6,6 kN/m. Hvor stor er hver opplagerkraft?",
   { n: 13.2, tol: 0.02, u: "kN" }, S`$R = \dfrac{qL}{2} = \dfrac{6{,}6\cdot 4}{2} = 13{,}2$ kN.`,
   "A simply supported beam with a span of 4.0 m carries 6.6 kN/m. How large is each support reaction?", null,
   S`$R = \dfrac{qL}{2} = \dfrac{6.6\cdot 4}{2} = 13.2$ kN.`]
]);
GEN("BYGG", 0,
 () => { const p = R.p([1.5, 2.0, 2.5, 3.0, 4.0, 5.0]), c = R.p([0.3, 0.4, 0.6, 1.2, 2.4, 3.0]), q = p * c;
   return [T(`En flatelast på ${nf(p)} kN/m² bæres av bjelker med senteravstand ${nf(c)} m. Hvor stor linjelast får hver bjelke?`, `An area load of ${nf(p)} kN/m² is carried by beams spaced ${nf(c)} m apart. What line load does each beam get?`),
     { n: q, tol: rel(q), u: "kN/m" }, S`$q = p\cdot c = ${mf(p)}\cdot ${mf(c)} = ${mf(q)}$ kN/m.`]; },
 () => { const G = R.f(0.5, 12, 0.5), Q = R.f(0.5, 10, 0.5), qd = 1.2 * G + 1.5 * Q;
   return [T(`En bjelke har permanent last ${nf(G)} kN/m og variabel last ${nf(Q)} kN/m. Hva er dimensjonerende last (1,2G + 1,5Q)?`, `A beam has a permanent load of ${nf(G)} kN/m and a variable load of ${nf(Q)} kN/m. What is the design load (1.2G + 1.5Q)?`),
     { n: qd, tol: rel(qd), u: "kN/m" }, T(S`$q_d = 1{,}2\cdot ${mf(G)} + 1{,}5\cdot ${mf(Q)} = ${mf(qd)}$ kN/m.`, S`$q_d = 1.2\cdot ${mf(G)} + 1.5\cdot ${mf(Q)} = ${mf(qd)}$ kN/m.`)]; },
 () => { const q = R.f(1, 30, 0.5), L = R.f(2, 12, 0.5), M = q * L * L / 8;
   return [T(`En fritt opplagt bjelke med spenn ${nf(L)} m har jevnt fordelt last ${nf(q)} kN/m. Hva er det største momentet?`, `A simply supported beam with a span of ${nf(L)} m carries a uniform load of ${nf(q)} kN/m. What is the largest moment?`),
     { n: M, tol: rel(M), u: "kNm" }, S`$M = \dfrac{qL^2}{8} = \dfrac{${mf(q)}\cdot ${mf(L)}^2}{8} \approx ${mf(M)}$ kNm.`]; },
 () => { const mats = [["betong", "concrete", 25], ["stål", "steel", 78.5], ["tre", "timber", 5], ["lettbetong", "lightweight concrete", 6]], [nb, en, g] = R.p(mats), t = R.p([48, 100, 150, 200, 250, 300]), w = g * t / 1000;
   return [T(`Et dekke av ${nb} er ${t} mm tykt. Tyngdetettheten er ${nf(g)} kN/m³. Hvor stor er egenlasten per m²?`, `A slab of ${en} is ${t} mm thick. The unit weight is ${nf(g)} kN/m³. What is the self-weight per m²?`),
     { n: w, tol: rel(w), u: "kN/m²" }, S`$g = ${mf(t / 1000, 3)}\cdot ${mf(g)} = ${mf(w, 3)}$ kN/m².`]; },
 () => { const sk = R.f(1.5, 8, 0.5), s = 0.8 * sk, c = R.p([0.6, 1.2, 2.4, 3.6]), q = s * c;
   return [T(S`Snølasten på mark er $s_k = ${mf(sk)}$ kN/m². Takbjelkene på et flatt tak ($\mu = 0{,}8$) har senteravstand ${nf(c)} m. Hvor stor snølast får hver bjelke per meter?`,
             S`The ground snow load is $s_k = ${mf(sk)}$ kN/m². The roof beams on a flat roof ($\mu = 0.8$) are spaced ${nf(c)} m apart. What snow load does each beam get per metre?`),
     { n: q, tol: rel(q), u: "kN/m" }, T(S`$s = 0{,}8\cdot ${mf(sk)} = ${mf(s)}$ kN/m², så $q = ${mf(s)}\cdot ${mf(c)} = ${mf(q)}$ kN/m.`, S`$s = 0.8\cdot ${mf(sk)} = ${mf(s)}$ kN/m², so $q = ${mf(s)}\cdot ${mf(c)} = ${mf(q)}$ kN/m.`)]; }
);

// ================= BYGG 1: Bygningsfysikk =================
THEORY("BYGG", 1, {
nb: md`## Hva handler det om?
Et godt hus holder varmen inne, fukten ute og gir lave strømregninger. Bygningsfysikk handler om hvordan varme og fukt går gjennom vegger, tak og vinduer. Byggteknisk forskrift (TEK17) stiller krav til hvor godt isolert hver del må være.

## Begreper og formler
- **Varmemotstand** for et sjikt med tykkelse $d$ og varmekonduktivitet $\lambda$ (W/mK):
$$R = \frac{d}{\lambda} \quad [\text{m}^2\text{K/W}]$$
- **U-verdi** (varmegjennomgangskoeffisient) for hele konstruksjonen. Motstandene summeres, og overgangsmotstandene innvendig ($R_{si} = 0{,}13$) og utvendig ($R_{se} = 0{,}04$) tas med:
$$U = \frac{1}{R_{si} + \sum R_i + R_{se}} \quad [\text{W/m}^2\text{K}]$$
- **Varmetap** gjennom en flate: $\Phi = U\cdot A\cdot \Delta T$ (W). Energi: effekt ganger tid, $E = \Phi\cdot t$.
- Krav i TEK17 (U-verdi): yttervegg ≤ 0,18, tak ≤ 0,13, vinduer ≤ 0,80 W/m²K.
- **Fukt:** varm luft kan holde mer vanndamp enn kald. Kjøles luften under **duggpunktet**, blir dampen til vann (kondens). Derfor settes **dampsperren på den varme siden** av isolasjonen.

## Slik løser du oppgavene
1. Regn $R = d/\lambda$ for hvert sjikt (tykkelse i meter).
2. Legg sammen alle motstandene, inkludert $R_{si}$ og $R_{se}$.
3. $U = 1/R_{tot}$, og varmetapet er $U A \Delta T$.

### Eksempel
En vegg har 200 mm isolasjon med $\lambda = 0{,}036$ W/mK. Se bort fra de andre sjiktene.
1. $R = 0{,}200/0{,}036 \approx 5{,}56$ m²K/W.
2. $R_{tot} = 0{,}13 + 5{,}56 + 0{,}04 = 5{,}73$ m²K/W.
3. $U = 1/5{,}73 \approx 0{,}175$ W/m²K, som tilfredsstiller kravet på 0,18.

## Vanlige feil
- Å bruke tykkelsen i mm i stedet for m.
- Å legge sammen U-verdier i stedet for R-verdier. Det er motstandene som summeres.
- Å sette dampsperren på den kalde siden. Da kan fukt kondensere inne i veggen.

> R = d/λ summeres, U = 1/R_tot. Varmetap = U·A·ΔT. Dampsperre på den varme siden.`,
en: md`## What is it about?
A good house keeps the heat in, the moisture out and the electricity bill low. Building physics is about how heat and moisture pass through walls, roofs and windows. The Norwegian building regulations (TEK17) set requirements for how well each part must be insulated.

## Concepts and formulas
- **Thermal resistance** of a layer with thickness $d$ and thermal conductivity $\lambda$ (W/mK):
$$R = \frac{d}{\lambda} \quad [\text{m}^2\text{K/W}]$$
- **U-value** (thermal transmittance) of the whole construction. The resistances are added, including the surface resistances inside ($R_{si} = 0.13$) and outside ($R_{se} = 0.04$):
$$U = \frac{1}{R_{si} + \sum R_i + R_{se}} \quad [\text{W/m}^2\text{K}]$$
- **Heat loss** through a surface: $\Phi = U\cdot A\cdot \Delta T$ (W). Energy: power times time, $E = \Phi\cdot t$.
- TEK17 requirements (U-value): external wall ≤ 0.18, roof ≤ 0.13, windows ≤ 0.80 W/m²K.
- **Moisture:** warm air can hold more water vapour than cold air. If air is cooled below the **dew point**, the vapour turns into water (condensation). That is why the **vapour barrier is placed on the warm side** of the insulation.

## How to solve the problems
1. Compute $R = d/\lambda$ for each layer (thickness in metres).
2. Add all the resistances, including $R_{si}$ and $R_{se}$.
3. $U = 1/R_{tot}$, and the heat loss is $U A \Delta T$.

### Example
A wall has 200 mm of insulation with $\lambda = 0.036$ W/mK. Ignore the other layers.
1. $R = 0.200/0.036 \approx 5.56$ m²K/W.
2. $R_{tot} = 0.13 + 5.56 + 0.04 = 5.73$ m²K/W.
3. $U = 1/5.73 \approx 0.175$ W/m²K, which meets the 0.18 requirement.

## Common mistakes
- Using the thickness in mm instead of m.
- Adding U-values instead of R-values. It is the resistances that add up.
- Putting the vapour barrier on the cold side. Then moisture can condense inside the wall.

> R = d/λ add up, U = 1/R_tot. Heat loss = U·A·ΔT. Vapour barrier on the warm side.`
});
BIQ("BYGG", 1, [
  [S`Hva er varmemotstanden til 200 mm isolasjon med $\lambda = 0{,}036$ W/mK?`,
   { n: 0.2 / 0.036, tol: 0.02, u: "m²K/W" }, S`$R = d/\lambda = 0{,}200/0{,}036 \approx 5{,}56$ m²K/W.`,
   S`What is the thermal resistance of 200 mm of insulation with $\lambda = 0.036$ W/mK?`, null,
   S`$R = d/\lambda = 0.200/0.036 \approx 5.56$ m²K/W.`],
  [S`En vegg har $R_{si} = 0{,}13$, isolasjon med $R = 5{,}56$ og $R_{se} = 0{,}04$ m²K/W. Hva er U-verdien?`,
   { n: 1 / 5.73, tol: 0.002, u: "W/m²K" }, S`$R_{tot} = 0{,}13 + 5{,}56 + 0{,}04 = 5{,}73$ m²K/W, så $U = 1/5{,}73 \approx 0{,}175$ W/m²K.`,
   S`A wall has $R_{si} = 0.13$, insulation with $R = 5.56$ and $R_{se} = 0.04$ m²K/W. What is the U-value?`, null,
   S`$R_{tot} = 0.13 + 5.56 + 0.04 = 5.73$ m²K/W, so $U = 1/5.73 \approx 0.175$ W/m²K.`],
  ["50 m² yttervegg med U = 0,18 W/m²K har 20 °C inne og −5 °C ute. Hvor stort er varmetapet?",
   { n: 225, tol: 0.5, u: "W" }, S`$\Phi = U A \Delta T = 0{,}18\cdot 50\cdot 25 = 225$ W.`,
   "50 m² of external wall with U = 0.18 W/m²K has 20 °C inside and −5 °C outside. How large is the heat loss?", null,
   S`$\Phi = U A \Delta T = 0.18\cdot 50\cdot 25 = 225$ W.`],
  ["Hvor skal dampsperren (plastfolien) ligge i en isolert yttervegg i Norge?",
   ["På den varme siden (innsiden) av isolasjonen", "På den kalde siden (utsiden) av isolasjonen", "Midt i isolasjonen", "Det spiller ingen rolle"],
   "Dampsperren hindrer fuktig inneluft i å komme inn i isolasjonen og kondensere der den blir kald. Derfor må den sitte der luften fortsatt er varm, på innsiden.",
   "Where should the vapour barrier (plastic sheet) be placed in an insulated external wall in Norway?",
   ["On the warm side (inside) of the insulation", "On the cold side (outside) of the insulation", "In the middle of the insulation", "It doesn't matter"],
   "The vapour barrier stops humid indoor air from entering the insulation and condensing where it gets cold. So it must sit where the air is still warm, on the inside."],
  ["Et vindu på 2,0 m² har U = 0,8 W/m²K. Temperaturforskjellen er 30 K. Hvor stort er varmetapet gjennom vinduet?",
   { n: 48, tol: 0.1, u: "W" }, S`$\Phi = 0{,}8\cdot 2{,}0\cdot 30 = 48$ W.`,
   "A 2.0 m² window has U = 0.8 W/m²K. The temperature difference is 30 K. How large is the heat loss through the window?", null,
   S`$\Phi = 0.8\cdot 2.0\cdot 30 = 48$ W.`],
  ["Hva betyr det at en vegg har lavere U-verdi enn en annen?",
   ["Den isolerer bedre og slipper gjennom mindre varme", "Den isolerer dårligere", "Den er tynnere", "Den slipper gjennom mer fukt"],
   "U-verdien er varmetapet per m² per grad temperaturforskjell. Jo lavere U, jo mindre varme går tapt.",
   "What does it mean that a wall has a lower U-value than another?",
   ["It insulates better and lets less heat through", "It insulates worse", "It is thinner", "It lets more moisture through"],
   "The U-value is the heat loss per m² per degree of temperature difference. The lower the U, the less heat is lost."],
  ["Et varmetap på 200 W varer et helt døgn. Hvor mye energi er det?",
   { n: 4.8, tol: 0.01, u: "kWh" }, S`$E = 200\ \text{W}\cdot 24\ \text{h} = 4800$ Wh $= 4{,}8$ kWh.`,
   "A heat loss of 200 W lasts for a whole day. How much energy is that?", null,
   S`$E = 200\ \text{W}\cdot 24\ \text{h} = 4800$ Wh $= 4.8$ kWh.`],
  ["Varm og fuktig inneluft treffer en kald flate som er kaldere enn duggpunktet. Hva skjer?",
   ["Vanndamp kondenserer til vann på flaten", "Luften blir tørrere og varmere", "Ingenting, så lenge flaten er tett", "Flaten blir varmere enn lufta"],
   "Ved duggpunktet er luften mettet. Kaldere enn det, og dampen må felles ut som vann, slik du ser dugg på et kaldt glass eller et vindu om vinteren.",
   "Warm, humid indoor air meets a cold surface that is colder than the dew point. What happens?",
   ["Water vapour condenses into water on the surface", "The air becomes drier and warmer", "Nothing, as long as the surface is tight", "The surface becomes warmer than the air"],
   "At the dew point the air is saturated. Colder than that, and the vapour must come out as water, like dew on a cold glass or a window in winter."]
]);
GEN("BYGG", 1,
 () => { const d = R.p([50, 100, 150, 200, 250, 300]), lam = R.p([0.033, 0.035, 0.036, 0.037, 0.04, 0.12, 0.13]), Rv = d / 1000 / lam;
   return [T(S`Hva er varmemotstanden til et sjikt på ${d} mm med $\lambda = ${mf(lam, 3)}$ W/mK?`, S`What is the thermal resistance of a ${d} mm layer with $\lambda = ${mf(lam, 3)}$ W/mK?`),
     { n: Rv, tol: rel(Rv), u: "m²K/W" }, S`$R = ${mf(d / 1000, 3)}/${mf(lam, 3)} \approx ${mf(Rv)}$ m²K/W.`]; },
 () => { const d1 = R.p([150, 200, 250, 300]), d2 = R.p([0, 48, 50, 100]), lam = 0.036, Rt = 0.13 + (d1 + d2) / 1000 / lam + 0.04, U = 1 / Rt;
   return [T(S`En vegg har ${d1} mm isolasjon${d2 ? ` pluss ${d2} mm ekstra isolasjon` : ""}, begge med $\lambda = 0{,}036$ W/mK. Med $R_{si} = 0{,}13$ og $R_{se} = 0{,}04$, hva er U-verdien (se bort fra andre sjikt)?`,
             S`A wall has ${d1} mm of insulation${d2 ? ` plus ${d2} mm of extra insulation` : ""}, both with $\lambda = 0.036$ W/mK. With $R_{si} = 0.13$ and $R_{se} = 0.04$, what is the U-value (ignore other layers)?`),
     { n: U, tol: rel(U, 0.01, 0.001), u: "W/m²K" }, T(S`$R_{tot} = 0{,}13 + ${mf((d1 + d2) / 1000, 3)}/0{,}036 + 0{,}04 \approx ${mf(Rt)}$, så $U \approx ${mf(U, 3)}$ W/m²K.`, S`$R_{tot} = 0.13 + ${mf((d1 + d2) / 1000, 3)}/0.036 + 0.04 \approx ${mf(Rt)}$, so $U \approx ${mf(U, 3)}$ W/m²K.`)]; },
 () => { const U = R.p([0.1, 0.13, 0.15, 0.18, 0.22, 0.8, 1.2]), A = R.i(2, 120), ti = R.p([20, 21, 22]), tu = R.i(-25, 5), P = U * A * (ti - tu);
   return [T(`${A} m² med U = ${nf(U)} W/m²K har ${ti} °C inne og ${tu} °C ute. Hvor stort er varmetapet?`, `${A} m² with U = ${nf(U)} W/m²K has ${ti} °C inside and ${tu} °C outside. How large is the heat loss?`),
     { n: P, tol: rel(P), u: "W" }, S`$\Phi = ${mf(U)}\cdot ${A}\cdot ${ti - tu} \approx ${mf(P, 1)}$ W.`]; },
 () => { const P = R.i(100, 3000), h = R.p([24, 24 * 7, 24 * 30, 2000, 4000]), E = P * h / 1000;
   return [T(`Et varmetap på ${P} W varer i ${h} timer. Hvor mye energi er det?`, `A heat loss of ${P} W lasts for ${h} hours. How much energy is that?`),
     { n: E, tol: rel(E), u: "kWh" }, S`$E = ${P}\cdot ${h}/1000 = ${mf(E, 1)}$ kWh.`]; },
 () => { const Ut = R.p([0.12, 0.15, 0.18, 0.22]), lam = R.p([0.033, 0.035, 0.037]), d = lam * (1 / Ut - 0.17) * 1000;
   return [T(S`Hvor tykt isolasjonssjikt ($\lambda = ${mf(lam, 3)}$ W/mK) trengs for å få U = ${nf(Ut)} W/m²K? Ta med $R_{si} + R_{se} = 0{,}17$ og se bort fra andre sjikt.`,
             S`How thick an insulation layer ($\lambda = ${mf(lam, 3)}$ W/mK) is needed to get U = ${nf(Ut)} W/m²K? Include $R_{si} + R_{se} = 0.17$ and ignore other layers.`),
     { n: d, tol: rel(d), u: "mm" }, T(S`$R_{tot} = 1/${mf(Ut)} = ${mf(1 / Ut, 3)}$, så isolasjonen må ha $R = ${mf(1 / Ut - 0.17, 3)}$ og $d = \lambda R \approx ${mf(d, 0)}$ mm.`, S`$R_{tot} = 1/${mf(Ut)} = ${mf(1 / Ut, 3)}$, so the insulation needs $R = ${mf(1 / Ut - 0.17, 3)}$ and $d = \lambda R \approx ${mf(d, 0)}$ mm.`)]; }
);

// ================= BYGG 2: Landmåling =================
THEORY("BYGG", 2, {
nb: md`## Hva handler det om?
Før en vei, et bygg eller en tunnel kan bygges, må terrenget måles opp og bygget settes ut på riktig sted. Landmåling handler om koordinater, avstander, retninger og høyder.

## Begreper og formler
- Norske kart bruker koordinater **nord** ($N$) og **øst** ($E$) i meter. Avstanden mellom to punkter:
$$s = \sqrt{\Delta N^2 + \Delta E^2}$$
- **Vinkler** i landmåling måles ofte i **gon**: en full sirkel er 400 gon (mot 360°). En rett vinkel er 100 gon.
- **Nivellering:** du leser av en målestang i punktet bak (kjent høyde) og i punktet foran. Høydeforskjellen er
$$\Delta h = \text{avlesning bak} - \text{avlesning foran}$$
- **Stigning** i prosent: $\dfrac{\Delta h}{\text{horisontal avstand}}\cdot 100$.
- **Målestokk** 1 : $M$: 1 cm på kartet er $M$ cm i terrenget. I 1 : 1000 er 1 cm 10 m.
- **Areal fra koordinater** (skolisseformelen) for en mangekant med hjørner $(x_i, y_i)$:
$$A = \tfrac12\left|\sum (x_i\,y_{i+1} - x_{i+1}\,y_i)\right|$$

## Slik løser du oppgavene
1. Regn ut differansene $\Delta N$ og $\Delta E$ mellom punktene.
2. Bruk Pytagoras for avstand, og husk at nivellering gir bak minus foran.
3. Gjør om målestokk ved å gange opp og deretter bytte enhet.

### Eksempel
Punkt A har høyden 12,345 m. Avlesning på stanga i A er 1,200 m og i B 0,800 m.
1. $\Delta h = 1{,}200 - 0{,}800 = 0{,}400$ m. Positivt, så B ligger høyere.
2. $H_B = 12{,}345 + 0{,}400 = 12{,}745$ m.

## Vanlige feil
- Å regne foran minus bak ved nivellering, som gir feil fortegn.
- Å blande grader og gon.
- Å glemme å gjøre om cm på kartet til meter i terrenget.
- Å stole på én måling. Kontrollmål, for eksempel en lukket runde, avslører feil.

> Avstand = √(ΔN² + ΔE²). Nivellering: bak − foran. 400 gon = 360°.`,
en: md`## What is it about?
Before a road, a building or a tunnel can be built, the terrain must be surveyed and the structure set out in the right place. Surveying is about coordinates, distances, directions and heights.

## Concepts and formulas
- Norwegian maps use coordinates **north** ($N$) and **east** ($E$) in metres. The distance between two points:
$$s = \sqrt{\Delta N^2 + \Delta E^2}$$
- **Angles** in surveying are often measured in **gon**: a full circle is 400 gon (versus 360°). A right angle is 100 gon.
- **Levelling:** you read a staff at the back point (known height) and at the front point. The height difference is
$$\Delta h = \text{back reading} - \text{front reading}$$
- **Gradient** in percent: $\dfrac{\Delta h}{\text{horizontal distance}}\cdot 100$.
- **Scale** 1 : $M$: 1 cm on the map is $M$ cm in the terrain. At 1 : 1000, 1 cm is 10 m.
- **Area from coordinates** (shoelace formula) for a polygon with corners $(x_i, y_i)$:
$$A = \tfrac12\left|\sum (x_i\,y_{i+1} - x_{i+1}\,y_i)\right|$$

## How to solve the problems
1. Compute the differences $\Delta N$ and $\Delta E$ between the points.
2. Use Pythagoras for distance, and remember that levelling gives back minus front.
3. Convert scale by multiplying up and then changing unit.

### Example
Point A has a height of 12.345 m. The staff reading at A is 1.200 m and at B 0.800 m.
1. $\Delta h = 1.200 - 0.800 = 0.400$ m. Positive, so B is higher.
2. $H_B = 12.345 + 0.400 = 12.745$ m.

## Common mistakes
- Computing front minus back in levelling, which gives the wrong sign.
- Mixing degrees and gon.
- Forgetting to convert cm on the map to metres in the terrain.
- Trusting a single measurement. Check measurements, such as a closed loop, reveal errors.

> Distance = √(ΔN² + ΔE²). Levelling: back − front. 400 gon = 360°.`
});
BIQ("BYGG", 2, [
  ["Punkt A har koordinatene N = 100, E = 200 og punkt B N = 130, E = 240 (meter). Hvor langt er det mellom punktene?",
   { n: 50, tol: 0.01, u: "m" }, S`$\Delta N = 30$ og $\Delta E = 40$, så $s = \sqrt{30^2 + 40^2} = \sqrt{2500} = 50$ m.`,
   "Point A has the coordinates N = 100, E = 200 and point B N = 130, E = 240 (metres). How far apart are the points?", null,
   S`$\Delta N = 30$ and $\Delta E = 40$, so $s = \sqrt{30^2 + 40^2} = \sqrt{2500} = 50$ m.`],
  ["Ved nivellering leser du 1,523 m på stanga bak og 0,873 m på stanga foran. Hva er høydeforskjellen fra bak til foran?",
   { n: 0.65, tol: 0.001, u: "m" }, S`$\Delta h = 1{,}523 - 0{,}873 = 0{,}650$ m. Punktet foran ligger 0,65 m høyere.`,
   "When levelling you read 1.523 m on the back staff and 0.873 m on the front staff. What is the height difference from back to front?", null,
   S`$\Delta h = 1.523 - 0.873 = 0.650$ m. The front point is 0.65 m higher.`],
  ["En vei stiger 1,2 m over en horisontal avstand på 40 m. Hva er stigningen i prosent?",
   { n: 3, tol: 0.01, u: "%" }, S`$\dfrac{1{,}2}{40}\cdot 100 = 3$ %.`,
   "A road rises 1.2 m over a horizontal distance of 40 m. What is the gradient in percent?", null,
   S`$\dfrac{1.2}{40}\cdot 100 = 3$ %.`],
  ["På et kart i målestokk 1 : 500 måler du 4,0 cm. Hvor langt er det i terrenget?",
   { n: 20, tol: 0.01, u: "m" }, S`$4{,}0\ \text{cm}\cdot 500 = 2000$ cm $= 20$ m.`,
   "On a map at scale 1 : 500 you measure 4.0 cm. How far is that in the terrain?", null,
   S`$4.0\ \text{cm}\cdot 500 = 2000$ cm $= 20$ m.`],
  ["Hvor mange gon er en full sirkel?",
   ["400 gon", "360 gon", "100 gon", "2π gon"],
   "Gon deler sirkelen i 400 deler, så en rett vinkel blir nøyaktig 100 gon. Det gjør regning med retninger enklere.",
   "How many gon is a full circle?",
   ["400 gon", "360 gon", "100 gon", "2π gon"],
   "Gon divides the circle into 400 parts, so a right angle is exactly 100 gon. That makes calculations with directions simpler."],
  ["Punkt A har høyden 12,345 m. Du leser 1,200 m på stanga i A og 0,800 m i B. Hva er høyden i B?",
   { n: 12.745, tol: 0.001, u: "m" }, S`$\Delta h = 1{,}200 - 0{,}800 = 0{,}400$ m, så $H_B = 12{,}345 + 0{,}400 = 12{,}745$ m.`,
   "Point A has a height of 12.345 m. You read 1.200 m on the staff at A and 0.800 m at B. What is the height of B?", null,
   S`$\Delta h = 1.200 - 0.800 = 0.400$ m, so $H_B = 12.345 + 0.400 = 12.745$ m.`],
  ["En trekantet tomt har hjørner i (0, 0), (40, 0) og (0, 30) meter. Hva er arealet?",
   { n: 600, tol: 0.5, u: "m²" }, S`Skolisseformelen: $A = \tfrac12|0\cdot 0 - 40\cdot 0 + 40\cdot 30 - 0\cdot 0 + 0\cdot 0 - 0\cdot 30| = \tfrac12\cdot 1200 = 600$ m². (Det er en rettvinklet trekant: $\tfrac12\cdot 40\cdot 30$.)`,
   "A triangular plot has corners at (0, 0), (40, 0) and (0, 30) metres. What is the area?", null,
   S`Shoelace formula: $A = \tfrac12|0\cdot 0 - 40\cdot 0 + 40\cdot 30 - 0\cdot 0 + 0\cdot 0 - 0\cdot 30| = \tfrac12\cdot 1200 = 600$ m². (It is a right triangle: $\tfrac12\cdot 40\cdot 30$.)`],
  ["Hvorfor måler landmålere ofte i en lukket runde tilbake til startpunktet?",
   ["For å oppdage og fordele målefeil, siden runden skal gå opp i null", "Fordi instrumentet må returneres", "For å spare tid", "Fordi koordinater bare kan måles i sirkler"],
   "Ved en lukket runde vet du fasiten: høydeforskjellen og koordinatendringen rundt hele runden skal være null. Avviket viser hvor store målefeilene er, og kan fordeles på målingene.",
   "Why do surveyors often measure in a closed loop back to the starting point?",
   ["To detect and distribute measurement errors, since the loop should add up to zero", "Because the instrument must be returned", "To save time", "Because coordinates can only be measured in circles"],
   "In a closed loop you know the answer: the height difference and coordinate change around the whole loop should be zero. The misclosure shows how large the errors are, and can be distributed over the measurements."]
]);
GEN("BYGG", 2,
 () => { const N1 = R.i(0, 500), E1 = R.i(0, 500), dN = R.i(-200, 200), dE = R.i(-200, 200), s = Math.hypot(dN, dE);
   return [T(`Punkt A har N = ${N1}, E = ${E1} og punkt B har N = ${N1 + dN}, E = ${E1 + dE} (meter). Hvor langt er det mellom punktene?`, `Point A has N = ${N1}, E = ${E1} and point B has N = ${N1 + dN}, E = ${E1 + dE} (metres). How far apart are the points?`),
     { n: s, tol: rel(s, 0.005, 0.01), u: "m" }, S`$\Delta N = ${dN}$, $\Delta E = ${dE}$, $s = \sqrt{${dN}^2 + ${dE}^2} \approx ${mf(s)}$ m.`]; },
 () => { const b = R.f(0.5, 3.5, 0.001), f = R.f(0.5, 3.5, 0.001), H = R.f(2, 150, 0.001), HB = H + b - f;
   return [T(`Punkt A har høyden ${nf(H, 3)} m. Du leser ${nf(b, 3)} m på stanga i A og ${nf(f, 3)} m i B. Hva er høyden i B?`, `Point A has a height of ${nf(H, 3)} m. You read ${nf(b, 3)} m on the staff at A and ${nf(f, 3)} m at B. What is the height of B?`),
     { n: HB, tol: 0.001, u: "m" }, S`$\Delta h = ${mf(b, 3)} - ${mf(f, 3)} = ${mf(b - f, 3)}$ m, $H_B = ${mf(HB, 3)}$ m.`]; },
 () => { const dh = R.f(0.2, 8, 0.1), L = R.i(20, 400), p = dh / L * 100;
   return [T(`En vei stiger ${nf(dh)} m over en horisontal avstand på ${L} m. Hva er stigningen i prosent?`, `A road rises ${nf(dh)} m over a horizontal distance of ${L} m. What is the gradient in percent?`),
     { n: p, tol: rel(p), u: "%" }, S`$${mf(dh)}/${L}\cdot 100 \approx ${mf(p)}$ %.`]; },
 () => { const M = R.p([200, 500, 1000, 2000, 5000, 50000]), cm = R.f(0.5, 15, 0.5), m = cm * M / 100;
   return [T(`På et kart i målestokk 1 : ${nf(M)} måler du ${nf(cm)} cm. Hvor langt er det i terrenget?`, `On a map at scale 1 : ${nf(M)} you measure ${nf(cm)} cm. How far is that in the terrain?`),
     { n: m, tol: rel(m), u: "m" }, S`$${mf(cm)}\cdot ${M} = ${mf(cm * M)}$ cm $= ${mf(m)}$ m.`]; },
 () => { const a = R.i(10, 80), b = R.i(10, 80), c = R.i(-20, 20), A = Math.abs(a * b) / 2 + 0 * c;
   return [T(`En trekantet tomt har hjørner i (0, 0), (${a}, 0) og (0, ${b}) meter. Hva er arealet?`, `A triangular plot has corners at (0, 0), (${a}, 0) and (0, ${b}) metres. What is the area?`),
     { n: A, tol: 0.5, u: "m²" }, S`$A = \tfrac12\cdot ${a}\cdot ${b} = ${mf(A)}$ m².`]; }
);

// ================= DISK 0: Logikk og mengder =================
THEORY("DISK", 0, {
nb: md`## Hva handler det om?
Datamaskiner er bygget på logikk: sant og usant, og og eller. Mengder er måten matematikken samler ting på. Begge deler dukker opp overalt i programmering, databaser og digitale kretser.

## Begreper og formler
- **Utsagnslogikk:** $\neg p$ (ikke), $p \wedge q$ (og), $p \vee q$ (eller), $p \rightarrow q$ (hvis … så).
- $p \rightarrow q$ er **bare usann** når $p$ er sann og $q$ er usann.
- **De Morgans lover:**
$$\neg(p \wedge q) \equiv \neg p \vee \neg q, \qquad \neg(p \vee q) \equiv \neg p \wedge \neg q$$
- **Kontraposisjon:** $p \rightarrow q$ er ekvivalent med $\neg q \rightarrow \neg p$.
- En sannhetsverditabell med $n$ variabler har $2^n$ rader.
- **Mengder:** union $A \cup B$ (i A eller B), snitt $A \cap B$ (i begge), komplement.
- **Inklusjon–eksklusjon:**
$$|A \cup B| = |A| + |B| - |A \cap B|$$
- En mengde med $n$ elementer har $2^n$ delmengder (potensmengden).

## Slik løser du oppgavene
1. Logikk: lag en sannhetsverditabell, eller bruk De Morgan og kontraposisjon.
2. Telling med overlapp: legg sammen og trekk fra det som er telt to ganger.
3. «Ingen av delene»: totalt minus unionen.

### Eksempel
40 studenter: 25 tar matte, 18 tar fysikk og 10 tar begge. Hvor mange tar ingen av dem?
1. $|M \cup F| = 25 + 18 - 10 = 33$.
2. Ingen av dem: $40 - 33 = 7$.

## Vanlige feil
- Å tro at $p \rightarrow q$ er usann når $p$ er usann. Et løfte er ikke brutt hvis betingelsen ikke inntreffer.
- Å glemme å trekke fra snittet og dermed telle noen to ganger.
- Å forveksle den omvendte ($q \rightarrow p$) med kontraposisjonen.

> $|A \cup B| = |A| + |B| - |A \cap B|$. Hvis–så er bare usann ved «sann → usann».`,
en: md`## What is it about?
Computers are built on logic: true and false, and and or. Sets are how mathematics collects things. Both show up everywhere in programming, databases and digital circuits.

## Concepts and formulas
- **Propositional logic:** $\neg p$ (not), $p \wedge q$ (and), $p \vee q$ (or), $p \rightarrow q$ (if … then).
- $p \rightarrow q$ is **only false** when $p$ is true and $q$ is false.
- **De Morgan's laws:**
$$\neg(p \wedge q) \equiv \neg p \vee \neg q, \qquad \neg(p \vee q) \equiv \neg p \wedge \neg q$$
- **Contrapositive:** $p \rightarrow q$ is equivalent to $\neg q \rightarrow \neg p$.
- A truth table with $n$ variables has $2^n$ rows.
- **Sets:** union $A \cup B$ (in A or B), intersection $A \cap B$ (in both), complement.
- **Inclusion–exclusion:**
$$|A \cup B| = |A| + |B| - |A \cap B|$$
- A set with $n$ elements has $2^n$ subsets (the power set).

## How to solve the problems
1. Logic: make a truth table, or use De Morgan and the contrapositive.
2. Counting with overlap: add and subtract what was counted twice.
3. "Neither": total minus the union.

### Example
40 students: 25 take maths, 18 take physics and 10 take both. How many take neither?
1. $|M \cup P| = 25 + 18 - 10 = 33$.
2. Neither: $40 - 33 = 7$.

## Common mistakes
- Thinking $p \rightarrow q$ is false when $p$ is false. A promise is not broken if the condition doesn't happen.
- Forgetting to subtract the intersection and so counting some twice.
- Confusing the converse ($q \rightarrow p$) with the contrapositive.

> $|A \cup B| = |A| + |B| - |A \cap B|$. If–then is only false for "true → false".`
});
BIQ("DISK", 0, [
  [S`Når er implikasjonen $p \rightarrow q$ usann?`,
   [S`Når $p$ er sann og $q$ er usann`, S`Når $p$ er usann og $q$ er sann`, S`Når begge er usanne`, S`Når begge er sanne`],
   S`Implikasjonen lover at $q$ følger når $p$ holder. Det løftet brytes bare når $p$ skjer og $q$ ikke gjør det.`,
   S`When is the implication $p \rightarrow q$ false?`,
   [S`When $p$ is true and $q$ is false`, S`When $p$ is false and $q$ is true`, S`When both are false`, S`When both are true`],
   S`The implication promises that $q$ follows when $p$ holds. That promise is only broken when $p$ happens and $q$ does not.`],
  [S`$|A| = 20$, $|B| = 15$ og $|A \cap B| = 5$. Hva er $|A \cup B|$?`,
   { n: 30, tol: 0, u: "" }, S`$|A \cup B| = 20 + 15 - 5 = 30$.`,
   S`$|A| = 20$, $|B| = 15$ and $|A \cap B| = 5$. What is $|A \cup B|$?`, null, S`$|A \cup B| = 20 + 15 - 5 = 30$.`],
  ["Hvor mange delmengder har en mengde med 5 elementer?",
   { n: 32, tol: 0, u: "" }, S`Hvert element er enten med eller ikke: $2^5 = 32$ delmengder (inkludert den tomme mengden og hele mengden).`,
   "How many subsets does a set with 5 elements have?", null,
   S`Each element is either in or out: $2^5 = 32$ subsets (including the empty set and the whole set).`],
  [S`Hva er $\neg(p \wedge q)$ ekvivalent med?`,
   [S`$\neg p \vee \neg q$`, S`$\neg p \wedge \neg q$`, S`$p \vee q$`, S`$\neg p \rightarrow q$`],
   S`De Morgan: «ikke (p og q)» betyr at minst én av dem er usann, altså $\neg p \vee \neg q$.`,
   S`What is $\neg(p \wedge q)$ equivalent to?`,
   [S`$\neg p \vee \neg q$`, S`$\neg p \wedge \neg q$`, S`$p \vee q$`, S`$\neg p \rightarrow q$`],
   S`De Morgan: "not (p and q)" means at least one of them is false, i.e. $\neg p \vee \neg q$.`],
  ["Hvor mange rader har en sannhetsverditabell med 4 variabler?",
   { n: 16, tol: 0, u: "" }, S`Hver variabel har 2 verdier: $2^4 = 16$ rader.`,
   "How many rows does a truth table with 4 variables have?", null, S`Each variable has 2 values: $2^4 = 16$ rows.`],
  [S`Hva inneholder snittet $A \cap B$?`,
   ["Elementene som er i både A og B", "Elementene som er i A eller B", "Elementene som er i A, men ikke i B", "Alle elementer som ikke er i A"],
   S`Snittet er det felles: bare elementer som finnes i begge mengdene.`,
   S`What does the intersection $A \cap B$ contain?`,
   ["The elements that are in both A and B", "The elements that are in A or B", "The elements that are in A but not in B", "All elements that are not in A"],
   S`The intersection is what they share: only elements found in both sets.`],
  ["40 studenter: 25 tar matte, 18 tar fysikk og 10 tar begge. Hvor mange tar ingen av dem?",
   { n: 7, tol: 0, u: "" }, S`Unionen er $25 + 18 - 10 = 33$, så $40 - 33 = 7$ tar ingen av dem.`,
   "40 students: 25 take maths, 18 take physics and 10 take both. How many take neither?", null,
   S`The union is $25 + 18 - 10 = 33$, so $40 - 33 = 7$ take neither.`],
  [S`Hva er kontraposisjonen til $p \rightarrow q$?`,
   [S`$\neg q \rightarrow \neg p$`, S`$q \rightarrow p$`, S`$\neg p \rightarrow \neg q$`, S`$p \wedge \neg q$`],
   S`Kontraposisjonen snur og negerer: $\neg q \rightarrow \neg p$. Den er alltid ekvivalent med den opprinnelige. $q \rightarrow p$ (den omvendte) er ikke det.`,
   S`What is the contrapositive of $p \rightarrow q$?`,
   [S`$\neg q \rightarrow \neg p$`, S`$q \rightarrow p$`, S`$\neg p \rightarrow \neg q$`, S`$p \wedge \neg q$`],
   S`The contrapositive swaps and negates: $\neg q \rightarrow \neg p$. It is always equivalent to the original. $q \rightarrow p$ (the converse) is not.`]
]);
GEN("DISK", 0,
 () => { const a = R.i(10, 60), b = R.i(10, 60), c = R.i(1, Math.min(a, b)), u = a + b - c;
   return [T(S`$|A| = ${a}$, $|B| = ${b}$ og $|A \cap B| = ${c}$. Hva er $|A \cup B|$?`, S`$|A| = ${a}$, $|B| = ${b}$ and $|A \cap B| = ${c}$. What is $|A \cup B|$?`),
     { n: u, tol: 0, u: "" }, S`$|A \cup B| = ${a} + ${b} - ${c} = ${u}$.`]; },
 () => { const n = R.i(2, 10), k = Math.pow(2, n), what = R.p(["sub", "rows"]);
   return [T(what === "sub" ? `Hvor mange delmengder har en mengde med ${n} elementer?` : `Hvor mange rader har en sannhetsverditabell med ${n} variabler?`,
             what === "sub" ? `How many subsets does a set with ${n} elements have?` : `How many rows does a truth table with ${n} variables have?`),
     { n: k, tol: 0, u: "" }, S`$2^{${n}} = ${k}$.`]; },
 () => { const N = R.i(30, 120), a = R.i(10, N - 10), b = R.i(10, N - 10), lo = Math.max(1, a + b - N), c = R.i(lo, Math.min(a, b)), none = N - (a + b - c);
   return [T(`${N} personer: ${a} har bil, ${b} har sykkel og ${c} har begge. Hvor mange har ingen av delene?`, `${N} people: ${a} have a car, ${b} have a bike and ${c} have both. How many have neither?`),
     { n: none, tol: 0, u: "" }, T(`Unionen er ${a} + ${b} − ${c} = ${a + b - c}, så ${N} − ${a + b - c} = ${none} har ingen av delene.`, `The union is ${a} + ${b} − ${c} = ${a + b - c}, so ${N} − ${a + b - c} = ${none} have neither.`)]; }
);

// ================= DISK 1: Kombinatorikk =================
THEORY("DISK", 1, {
nb: md`## Hva handler det om?
Hvor mange passord finnes? Hvor mange måter kan et lag velges på? Kombinatorikk er systematisk telling. Det brukes i sannsynlighet, sikkerhet (hvor lang tid tar det å gjette et passord?) og algoritmer (hvor mange tilfeller må sjekkes?).

## Begreper og formler
- **Multiplikasjonsprinsippet:** $a$ valg etterfulgt av $b$ valg gir $a\cdot b$ muligheter.
- **Ordnede utvalg med tilbakelegging:** $n^k$ (for eksempel en PIN-kode).
- **Permutasjoner:** $n$ ting i rekkefølge: $n! = n\cdot(n-1)\cdots 1$.
- **Ordnet utvalg uten tilbakelegging** (rekkefølgen betyr noe):
$$P(n, k) = \frac{n!}{(n-k)!}$$
- **Kombinasjoner** (rekkefølgen betyr ikke noe):
$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$
- Håndhilsninger mellom $n$ personer: $\binom{n}{2} = \dfrac{n(n-1)}{2}$.

## Slik løser du oppgavene
1. Spør: betyr rekkefølgen noe? Kan samme ting velges flere ganger?
2. Rekkefølge og gjentak: $n^k$. Rekkefølge uten gjentak: $P(n,k)$. Uten rekkefølge: $\binom nk$.

### Eksempel
8 løpere kjemper om gull, sølv og bronse. Hvor mange mulige pallplasseringer finnes?
1. Rekkefølgen betyr noe, og ingen kan få to medaljer.
2. $P(8,3) = 8\cdot 7\cdot 6 = 336$.

## Vanlige feil
- Å bruke kombinasjoner når rekkefølgen betyr noe (eller omvendt).
- Å glemme at $0! = 1$.
- Å legge sammen når valgene skal ganges.

> Rekkefølge? Ja: P(n, k) eller nᵏ. Nei: n over k.`,
en: md`## What is it about?
How many passwords exist? In how many ways can a team be chosen? Combinatorics is systematic counting. It is used in probability, security (how long does it take to guess a password?) and algorithms (how many cases must be checked?).

## Concepts and formulas
- **Multiplication principle:** $a$ choices followed by $b$ choices give $a\cdot b$ possibilities.
- **Ordered selections with repetition:** $n^k$ (for example a PIN code).
- **Permutations:** $n$ things in order: $n! = n\cdot(n-1)\cdots 1$.
- **Ordered selection without repetition** (order matters):
$$P(n, k) = \frac{n!}{(n-k)!}$$
- **Combinations** (order doesn't matter):
$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$
- Handshakes between $n$ people: $\binom{n}{2} = \dfrac{n(n-1)}{2}$.

## How to solve the problems
1. Ask: does order matter? Can the same thing be chosen more than once?
2. Order and repetition: $n^k$. Order without repetition: $P(n,k)$. No order: $\binom nk$.

### Example
8 runners compete for gold, silver and bronze. How many possible podiums are there?
1. The order matters, and nobody can get two medals.
2. $P(8,3) = 8\cdot 7\cdot 6 = 336$.

## Common mistakes
- Using combinations when the order matters (or the other way round).
- Forgetting that $0! = 1$.
- Adding when the choices should be multiplied.

> Order? Yes: P(n, k) or nᵏ. No: n choose k.`
});
const fact = n => n <= 1 ? 1 : n * fact(n - 1), Cnk = (n, k) => Math.round(fact(n) / (fact(k) * fact(n - k))), Pnk = (n, k) => Math.round(fact(n) / fact(n - k));
BIQ("DISK", 1, [
  ["Du har 3 skjorter og 4 bukser. Hvor mange antrekk kan du lage?", { n: 12, tol: 0, u: "" }, S`Multiplikasjonsprinsippet: $3\cdot 4 = 12$.`,
   "You have 3 shirts and 4 pairs of trousers. How many outfits can you make?", null, S`Multiplication principle: $3\cdot 4 = 12$.`],
  ["På hvor mange måter kan 5 bøker stilles i en rekke?", { n: 120, tol: 0, u: "" }, S`$5! = 5\cdot 4\cdot 3\cdot 2\cdot 1 = 120$.`,
   "In how many ways can 5 books be placed in a row?", null, S`$5! = 5\cdot 4\cdot 3\cdot 2\cdot 1 = 120$.`],
  ["Hvor mange måter kan du velge 3 av 10 personer til en komité?", { n: 120, tol: 0, u: "" }, S`Rekkefølgen betyr ikke noe: $\binom{10}{3} = \dfrac{10\cdot 9\cdot 8}{3\cdot 2\cdot 1} = 120$.`,
   "In how many ways can you choose 3 out of 10 people for a committee?", null, S`The order doesn't matter: $\binom{10}{3} = \dfrac{10\cdot 9\cdot 8}{3\cdot 2\cdot 1} = 120$.`],
  ["8 løpere kjemper om gull, sølv og bronse. Hvor mange mulige pallplasseringer finnes?", { n: 336, tol: 0, u: "" }, S`Rekkefølgen betyr noe: $P(8,3) = 8\cdot 7\cdot 6 = 336$.`,
   "8 runners compete for gold, silver and bronze. How many possible podiums are there?", null, S`The order matters: $P(8,3) = 8\cdot 7\cdot 6 = 336$.`],
  ["Hvor mange firesifrede PIN-koder finnes (sifrene 0–9, gjentak tillatt)?", { n: 10000, tol: 0, u: "" }, S`$10^4 = 10\,000$.`,
   "How many four-digit PIN codes exist (digits 0–9, repetition allowed)?", null, S`$10^4 = 10\,000$.`],
  ["Du skal velge 4 av 12 emner til en fordypning, og rekkefølgen spiller ingen rolle. Hvilken formel bruker du?",
   [S`$\binom{12}{4}$`, S`$P(12, 4)$`, S`$12^4$`, S`$4^{12}$`],
   S`Uten rekkefølge og uten gjentak er det kombinasjoner: $\binom{12}{4} = 495$.`,
   "You must choose 4 of 12 courses for a specialization, and the order doesn't matter. Which formula do you use?",
   [S`$\binom{12}{4}$`, S`$P(12, 4)$`, S`$12^4$`, S`$4^{12}$`],
   S`Without order and without repetition it is combinations: $\binom{12}{4} = 495$.`],
  ["Hvor mange passord på 6 tegn kan lages av de 26 små bokstavene a–z?", { n: Math.pow(26, 6), tol: 0, u: "" }, S`$26^6 = 308\,915\,776$, altså rundt 309 millioner.`,
   "How many 6-character passwords can be made from the 26 lowercase letters a–z?", null, S`$26^6 = 308\,915\,776$, about 309 million.`],
  ["5 personer håndhilser på hverandre én gang hver. Hvor mange håndtrykk blir det?", { n: 10, tol: 0, u: "" }, S`$\binom{5}{2} = \dfrac{5\cdot 4}{2} = 10$.`,
   "5 people shake hands with each other once. How many handshakes are there?", null, S`$\binom{5}{2} = \dfrac{5\cdot 4}{2} = 10$.`]
]);
GEN("DISK", 1,
 () => { const n = R.i(5, 20), k = R.i(2, Math.min(6, n - 1)), c = Cnk(n, k);
   return [T(`Hvor mange måter kan du velge ${k} av ${n} personer, når rekkefølgen ikke betyr noe?`, `In how many ways can you choose ${k} of ${n} people when the order doesn't matter?`),
     { n: c, tol: 0, u: "" }, S`$\binom{${n}}{${k}} = ${c}$.`]; },
 () => { const n = R.i(4, 15), k = R.i(2, Math.min(4, n)), p = Pnk(n, k);
   return [T(`${n} deltakere kjemper om ${k} premier som er forskjellige (1., 2., …). Hvor mange mulige utfall finnes?`, `${n} participants compete for ${k} different prizes (1st, 2nd, …). How many possible outcomes are there?`),
     { n: p, tol: 0, u: "" }, S`$P(${n},${k}) = ${Array.from({ length: k }, (_, i) => n - i).join("\\cdot ")} = ${p}$.`]; },
 () => { const n = R.i(3, 9), f = fact(n);
   return [T(`På hvor mange måter kan ${n} ting stilles i en rekke?`, `In how many ways can ${n} things be placed in a row?`), { n: f, tol: 0, u: "" }, S`$${n}! = ${f}$.`]; },
 () => { const alph = R.p([[10, "sifrene 0–9", "the digits 0–9"], [26, "små bokstaver a–z", "lowercase letters a–z"], [36, "små bokstaver og sifre", "lowercase letters and digits"]]), k = R.i(3, 6), v = Math.pow(alph[0], k);
   return [T(`Hvor mange koder på ${k} tegn kan lages av ${alph[1]} (gjentak tillatt)?`, `How many ${k}-character codes can be made from ${alph[2]} (repetition allowed)?`),
     { n: v, tol: 0, u: "" }, S`$${alph[0]}^{${k}} = ${v}$.`]; },
 () => { const n = R.i(4, 40), h = n * (n - 1) / 2;
   return [T(`${n} personer håndhilser på hverandre én gang hver. Hvor mange håndtrykk blir det?`, `${n} people shake hands with each other once. How many handshakes are there?`),
     { n: h, tol: 0, u: "" }, S`$\binom{${n}}{2} = \dfrac{${n}\cdot ${n - 1}}{2} = ${h}$.`]; }
);

// ================= DISK 2: Grafer og modulregning =================
THEORY("DISK", 2, {
nb: md`## Hva handler det om?
En **graf** er noder (punkter) koblet med kanter (linjer). Veinett, datanettverk, venner i sosiale medier og avhengigheter mellom programmoduler er alle grafer. **Modulregning** er «klokkeregning» med rester, og brukes i hashing, kryptering og kontrollsifre.

## Begreper og formler
- **Grad** til en node: antall kanter som går ut fra den. **Håndhilselemmaet:**
$$\sum \text{grad} = 2\cdot(\text{antall kanter})$$
- **Komplett graf** $K_n$ (alle koblet til alle) har $\dfrac{n(n-1)}{2}$ kanter.
- Et **tre** er en sammenhengende graf uten sykler. Et tre med $n$ noder har nøyaktig $n - 1$ kanter.
- **Eulerkrets** (bruk hver kant nøyaktig én gang og kom tilbake): finnes når grafen er sammenhengende og alle noder har partall grad.
- **Korteste vei** i en vektet graf: Dijkstras algoritme. Utvid alltid fra den nærmeste noden du ikke har ferdigbehandlet.
- **Modulregning:** $a \bmod m$ er resten når $a$ deles på $m$. For eksempel $17 \bmod 5 = 2$.

## Slik løser du oppgavene
1. Tell kanter via gradene: summer og del på 2.
2. For trær og komplette grafer: bruk formlene.
3. Korteste vei: prøv alle rimelige ruter i små grafer, eller følg Dijkstra.

### Eksempel
Kanter: A–B (4), A–C (1), C–B (2), B–D (5), C–D (8). Korteste vei fra A til D?
1. A–C–B koster $1 + 2 = 3$, som er billigere enn A–B direkte (4).
2. Videre B–D: $3 + 5 = 8$. Alternativet A–C–D koster $1 + 8 = 9$.
3. Korteste vei er A–C–B–D med lengde 8.

## Vanlige feil
- Å glemme å dele gradsummen på 2.
- Å tro at den direkte kanten alltid er kortest.
- Å bruke negative rester: i matematikken er $a \bmod m$ alltid mellom 0 og $m - 1$.

> Gradsum = 2 · kanter. Tre: n − 1 kanter. Kₙ: n(n − 1)/2 kanter.`,
en: md`## What is it about?
A **graph** is nodes (points) connected by edges (lines). Road networks, computer networks, friends on social media and dependencies between program modules are all graphs. **Modular arithmetic** is "clock arithmetic" with remainders, used in hashing, encryption and check digits.

## Concepts and formulas
- The **degree** of a node: the number of edges leaving it. **Handshake lemma:**
$$\sum \text{degree} = 2\cdot(\text{number of edges})$$
- The **complete graph** $K_n$ (everyone connected to everyone) has $\dfrac{n(n-1)}{2}$ edges.
- A **tree** is a connected graph without cycles. A tree with $n$ nodes has exactly $n - 1$ edges.
- **Euler circuit** (use every edge exactly once and return): exists when the graph is connected and every node has even degree.
- **Shortest path** in a weighted graph: Dijkstra's algorithm. Always expand from the nearest node you haven't finished.
- **Modular arithmetic:** $a \bmod m$ is the remainder when $a$ is divided by $m$. For example $17 \bmod 5 = 2$.

## How to solve the problems
1. Count edges via the degrees: add up and divide by 2.
2. For trees and complete graphs: use the formulas.
3. Shortest path: try all reasonable routes in small graphs, or follow Dijkstra.

### Example
Edges: A–B (4), A–C (1), C–B (2), B–D (5), C–D (8). Shortest path from A to D?
1. A–C–B costs $1 + 2 = 3$, which is cheaper than A–B directly (4).
2. Then B–D: $3 + 5 = 8$. The alternative A–C–D costs $1 + 8 = 9$.
3. The shortest path is A–C–B–D with length 8.

## Common mistakes
- Forgetting to divide the degree sum by 2.
- Thinking the direct edge is always shortest.
- Using negative remainders: in mathematics $a \bmod m$ is always between 0 and $m - 1$.

> Degree sum = 2 · edges. Tree: n − 1 edges. Kₙ: n(n − 1)/2 edges.`
});
BIQ("DISK", 2, [
  ["En graf har 7 kanter. Hva er summen av gradene til alle nodene?", { n: 14, tol: 0, u: "" }, S`Hver kant gir 2 til gradsummen: $2\cdot 7 = 14$.`,
   "A graph has 7 edges. What is the sum of the degrees of all the nodes?", null, S`Each edge adds 2 to the degree sum: $2\cdot 7 = 14$.`],
  [S`Hvor mange kanter har den komplette grafen $K_6$?`, { n: 15, tol: 0, u: "" }, S`$\dfrac{6\cdot 5}{2} = 15$.`,
   S`How many edges does the complete graph $K_6$ have?`, null, S`$\dfrac{6\cdot 5}{2} = 15$.`],
  ["Et tre har 12 noder. Hvor mange kanter har det?", { n: 11, tol: 0, u: "" }, S`Et tre med $n$ noder har $n - 1 = 11$ kanter.`,
   "A tree has 12 nodes. How many edges does it have?", null, S`A tree with $n$ nodes has $n - 1 = 11$ edges.`],
  ["Når har en sammenhengende graf en Eulerkrets?",
   ["Når alle noder har partall grad", "Når alle noder har oddetall grad", "Når grafen er et tre", "Alltid"],
   "Hver gang ruten går inn i en node, må den også ut igjen. Da må kantene rundt hver node komme i par, altså partall grad.",
   "When does a connected graph have an Euler circuit?",
   ["When every node has even degree", "When every node has odd degree", "When the graph is a tree", "Always"],
   "Every time the route enters a node, it must also leave. So the edges around each node must come in pairs, i.e. even degree."],
  ["Kanter med vekt: A–B 4, A–C 1, C–B 2, B–D 5, C–D 8. Hva er lengden av korteste vei fra A til D?", { n: 8, tol: 0, u: "" },
   S`A–C–B koster $1 + 2 = 3$ (billigere enn A–B = 4). Så B–D: $3 + 5 = 8$. A–C–D gir 9. Korteste vei er 8.`,
   "Weighted edges: A–B 4, A–C 1, C–B 2, B–D 5, C–D 8. What is the length of the shortest path from A to D?", null,
   S`A–C–B costs $1 + 2 = 3$ (cheaper than A–B = 4). Then B–D: $3 + 5 = 8$. A–C–D gives 9. The shortest path is 8.`],
  ["Hva er et tre i grafteori?",
   ["En sammenhengende graf uten sykler", "En graf der alle noder har samme grad", "En graf med nøyaktig én node", "En graf der alle er koblet til alle"],
   "I et tre er det nøyaktig én vei mellom hvert par av noder. Fjerner du en kant, deles treet i to.",
   "What is a tree in graph theory?",
   ["A connected graph without cycles", "A graph where all nodes have the same degree", "A graph with exactly one node", "A graph where everyone is connected to everyone"],
   "In a tree there is exactly one path between each pair of nodes. Remove an edge and the tree splits in two."],
  ["En graf har nodegradene 3, 3, 2, 2 og 2. Hvor mange kanter har den?", { n: 6, tol: 0, u: "" }, S`Gradsum $= 3 + 3 + 2 + 2 + 2 = 12$, så kanter $= 12/2 = 6$.`,
   "A graph has node degrees 3, 3, 2, 2 and 2. How many edges does it have?", null, S`Degree sum $= 3 + 3 + 2 + 2 + 2 = 12$, so edges $= 12/2 = 6$.`],
  [S`Hva er $47 \bmod 6$?`, { n: 5, tol: 0, u: "" }, S`$47 = 7\cdot 6 + 5$, så resten er 5.`,
   S`What is $47 \bmod 6$?`, null, S`$47 = 7\cdot 6 + 5$, so the remainder is 5.`]
]);
GEN("DISK", 2,
 () => { const n = R.i(3, 30), e = n * (n - 1) / 2;
   return [T(S`Hvor mange kanter har den komplette grafen $K_{${n}}$?`, S`How many edges does the complete graph $K_{${n}}$ have?`), { n: e, tol: 0, u: "" }, S`$\dfrac{${n}\cdot ${n - 1}}{2} = ${e}$.`]; },
 () => { const n = R.i(3, 200);
   return [T(`Et tre har ${n} noder. Hvor mange kanter har det?`, `A tree has ${n} nodes. How many edges does it have?`), { n: n - 1, tol: 0, u: "" }, S`$n - 1 = ${n - 1}$.`]; },
 () => { let ds; do { ds = Array.from({ length: R.i(4, 7) }, () => R.i(1, 5)); } while (ds.reduce((a, b) => a + b) % 2); const s = ds.reduce((a, b) => a + b);
   return [T(`En graf har nodegradene ${ds.join(", ")}. Hvor mange kanter har den?`, `A graph has node degrees ${ds.join(", ")}. How many edges does it have?`), { n: s / 2, tol: 0, u: "" },
     T(S`Gradsum $= ${s}$, så kanter $= ${s}/2 = ${s / 2}$.`, S`Degree sum $= ${s}$, so edges $= ${s}/2 = ${s / 2}$.`)]; },
 () => { const m = R.i(3, 13), a = R.i(m + 1, 500), r = a % m;
   return [T(S`Hva er $${a} \bmod ${m}$?`, S`What is $${a} \bmod ${m}$?`), { n: r, tol: 0, u: "" }, T(S`$${a} = ${Math.floor(a / m)}\cdot ${m} + ${r}$, så resten er ${r}.`, S`$${a} = ${Math.floor(a / m)}\cdot ${m} + ${r}$, so the remainder is ${r}.`)]; }
);
})();
