// Teoribok – emnesider for nye fag: BYGG, DISK og DBNET (add_courses1.js og add_courses2.js).
// Samme format som top_ref.js. Test: node tools/test_topics.js top_new_b.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- BYGG 0: Laster og lastkombinasjoner ----------
TOPICS("BYGG", 0, [
{ id: "lasttyper",
  nb: O("Permanente og variable laster", "En bygning må tåle sin egen vekt og alt som kommer i tillegg. Egenlast er permanent og kjent ganske nøyaktig. Nyttelast, snø og vind er variable laster som kommer og går, og de er mer usikre.",
    [[R`G = \gamma_{mat}\cdot V`, "egenlast fra materialets tyngdetetthet"], [R`q = q_k\cdot A`, "nyttelast på et areal"]],
    [["G", "egenlast", "kN"], [R`\gamma_{mat}`, "tyngdetetthet (betong ca. 25)", "kN/m³"], ["q_k", "karakteristisk nyttelast", "kN/m²"], ["A", "areal", "m²"]],
    R`En betongplate 5 × 4 × 0,2 m:
$G = 25\cdot 4 = 100$ kN.`, "Egenlast virker alltid. Variable laster virker bare noen ganger og kombineres derfor med egne faktorer."),
  en: O("Permanent and variable loads", "A building must carry its own weight and everything that comes on top. Self-weight is permanent and known quite accurately. Imposed load, snow and wind are variable loads that come and go, and they are more uncertain.",
    [[R`G = \gamma_{mat}\cdot V`, "self-weight from the unit weight of the material"], [R`q = q_k\cdot A`, "imposed load on an area"]],
    [["G", "self-weight", "kN"], [R`\gamma_{mat}`, "unit weight (concrete about 25)", "kN/m³"], ["q_k", "characteristic imposed load", "kN/m²"], ["A", "area", "m²"]],
    R`A concrete slab 5 × 4 × 0.2 m:
$G = 25\cdot 4 = 100$ kN.`, "Self-weight always acts. Variable loads act only sometimes and are therefore combined with their own factors.") },
{ id: "lastfaktorer",
  nb: O("Lastfaktorer", "I bruddgrensetilstanden ganges lastene med lastfaktorer for å få en sikkerhetsmargin. Egenlast har lavere faktor enn variable laster, fordi den er bedre kjent. Etter Eurokode brukes ofte 1,2 for egenlast og 1,5 for variable laster.",
    [[R`F_d = \gamma_G\,G_k + \gamma_Q\,Q_k`, "dimensjonerende last"], [R`\gamma_G = 1{,}2,\ \gamma_Q = 1{,}5`, "vanlige lastfaktorer"]],
    [["F_d", "dimensjonerende last", "kN"], ["G_k", "karakteristisk egenlast", "kN"], ["Q_k", "karakteristisk variabel last", "kN"]],
    R`$G_k = 100$ kN og $Q_k = 40$ kN:
$F_d = 1{,}2\cdot 100 + 1{,}5\cdot 40 = 180$ kN.`, "Karakteristisk last er det som faktisk forventes. Dimensjonerende last er det du regner med."),
  en: O("Load factors", "In the ultimate limit state the loads are multiplied by load factors to give a safety margin. Self-weight has a lower factor than variable loads because it is better known. Under Eurocode 1.2 is often used for self-weight and 1.5 for variable loads.",
    [[R`F_d = \gamma_G\,G_k + \gamma_Q\,Q_k`, "design load"], [R`\gamma_G = 1{,}2,\ \gamma_Q = 1{,}5`, "common load factors"]],
    [["F_d", "design load", "kN"], ["G_k", "characteristic self-weight", "kN"], ["Q_k", "characteristic variable load", "kN"]],
    R`$G_k = 100$ kN and $Q_k = 40$ kN:
$F_d = 1{,}2\cdot 100 + 1{,}5\cdot 40 = 180$ kN.`, "The characteristic load is what is actually expected. The design load is what you calculate with.") },
{ id: "lastkombinasjon",
  nb: O("Lastkombinasjoner", "Det er lite sannsynlig at full snø, full vind og full nyttelast kommer samtidig. Derfor tas én variabel last som dominerende med full verdi, mens de andre reduseres med en kombinasjonsfaktor ψ. Alle kombinasjoner prøves, og den verste brukes.",
    [[R`F_d = 1{,}2\,G_k + 1{,}5\,Q_{k,1} + 1{,}5\,\psi_0\,Q_{k,2}`, "én dominerende og én medvirkende last"]],
    [["Q_{k,1}", "dominerende variabel last", "kN"], ["Q_{k,2}", "medvirkende variabel last", "kN"], [R`\psi_0`, "kombinasjonsfaktor", ""]],
    R`Snø 30 kN dominerende, vind 20 kN med $\psi_0 = 0{,}6$, $G_k = 100$ kN:
$120 + 45 + 18 = 183$ kN.`, "Bytt om på hvilken last som er dominerende, og bruk den kombinasjonen som gir størst verdi."),
  en: O("Load combinations", "It is unlikely that full snow, full wind and full imposed load occur at the same time. So one variable load is taken as leading with its full value, while the others are reduced by a combination factor ψ. All combinations are tried, and the worst one is used.",
    [[R`F_d = 1{,}2\,G_k + 1{,}5\,Q_{k,1} + 1{,}5\,\psi_0\,Q_{k,2}`, "one leading and one accompanying load"]],
    [["Q_{k,1}", "leading variable load", "kN"], ["Q_{k,2}", "accompanying variable load", "kN"], [R`\psi_0`, "combination factor", ""]],
    R`Snow 30 kN leading, wind 20 kN with $\psi_0 = 0.6$, $G_k = 100$ kN:
$120 + 45 + 18 = 183$ kN.`, "Swap which load is leading, and use the combination that gives the largest value.") }
]);

// ---------- BYGG 1: Bygningsfysikk ----------
TOPICS("BYGG", 1, [
{ id: "u-verdi",
  fig: `<svg viewBox="0 0 240 140"><rect x="95" y="15" width="50" height="110" class="fill"/><rect x="75" y="15" width="20" height="110" class="d"/><rect x="145" y="15" width="12" height="110" class="d"/><path d="M30 70H80" class="r"/><path d="M92 70l-12-6v12z" class="rf"/><path d="M160 70H210" class="r"/><path d="M222 70l-12-6v12z" class="rf"/><text x="30" y="60">T<tspan dy="4" font-size="10">i</tspan></text><text x="198" y="56">T<tspan dy="4" font-size="10">u</tspan></text></svg>`,
  nb: O("U-verdi", "U-verdien forteller hvor mye varme som lekker gjennom én kvadratmeter vegg for hver grad forskjell mellom inne og ute. Lav U-verdi betyr god isolasjon. Den regnes ut fra summen av varmemotstandene i alle lagene.",
    [[R`R = \frac{d}{\lambda}`, "varmemotstand for ett lag"], [R`U = \frac{1}{R_{si} + \sum R_i + R_{se}}`, "U-verdi for hele veggen"]],
    [["U", "varmegjennomgangskoeffisient", "W/m²K"], ["d", "tykkelse", "m"], [R`\lambda`, "varmeledningsevne", "W/mK"], ["R_{si},\\ R_{se}", "overgangsmotstand inne og ute", "m²K/W"]],
    R`200 mm isolasjon ($\lambda = 0{,}036$) gir $R = 5{,}56$. Med $R_{si} + R_{se} = 0{,}17$:
$U = 1/5{,}73 \approx 0{,}17$ W/m²K.`, "Motstandene legges sammen, U-verdiene gjør det ikke."),
  en: O("U-value", "The U-value tells how much heat leaks through one square metre of wall for each degree of difference between inside and outside. A low U-value means good insulation. It is calculated from the sum of the thermal resistances of all the layers.",
    [[R`R = \frac{d}{\lambda}`, "thermal resistance of one layer"], [R`U = \frac{1}{R_{si} + \sum R_i + R_{se}}`, "U-value of the whole wall"]],
    [["U", "thermal transmittance", "W/m²K"], ["d", "thickness", "m"], [R`\lambda`, "thermal conductivity", "W/mK"], ["R_{si},\\ R_{se}", "inside and outside surface resistance", "m²K/W"]],
    R`200 mm insulation ($\lambda = 0.036$) gives $R = 5.56$. With $R_{si} + R_{se} = 0.17$:
$U = 1/5.73 \approx 0.17$ W/m²K.`, "Resistances add up, U-values do not.") },
{ id: "varmetap",
  nb: O("Varmetap gjennom konstruksjoner", "Varmetapet gjennom en vegg, et tak eller et vindu er U-verdien ganger arealet ganger temperaturforskjellen. Summen over alle flatene gir transmisjonstapet for bygningen. Vinduer har ofte mye høyere U-verdi enn vegger.",
    [[R`\Phi = U\,A\,\Delta T`, "varmetap gjennom en flate"], [R`Q = \Phi\cdot t`, "energi over tid"]],
    [[R`\Phi`, "varmetap (effekt)", "W"], ["A", "areal", "m²"], [R`\Delta T`, "temperaturforskjell", "K"]],
    R`Vindu på 2 m² med $U = 0{,}8$ og 25 K forskjell:
$\Phi = 0{,}8\cdot 2\cdot 25 = 40$ W.`, "Temperaturforskjell i K og °C er det samme, så du kan bruke begge."),
  en: O("Heat loss through building parts", "The heat loss through a wall, roof or window is the U-value times the area times the temperature difference. The sum over all surfaces gives the building's transmission loss. Windows often have a much higher U-value than walls.",
    [[R`\Phi = U\,A\,\Delta T`, "heat loss through a surface"], [R`Q = \Phi\cdot t`, "energy over time"]],
    [[R`\Phi`, "heat loss (power)", "W"], ["A", "area", "m²"], [R`\Delta T`, "temperature difference", "K"]],
    R`A 2 m² window with $U = 0.8$ and a 25 K difference:
$\Phi = 0.8\cdot 2\cdot 25 = 40$ W.`, "A temperature difference in K and in °C is the same, so either can be used.") },
{ id: "duggpunkt",
  nb: O("Fukt og duggpunkt", "Varm luft kan holde mer vanndamp enn kald luft. Når fuktig inneluft kjøles ned inne i en vegg, kan den nå duggpunktet, og vannet kondenserer. Derfor har vegger en dampsperre på den varme siden og en vindsperre som slipper fukt ut.",
    [[R`RF = \frac{v}{v_{mett}}\cdot 100\,\%`, "relativ fuktighet"]],
    [["RF", "relativ fuktighet", "%"], ["v", "faktisk vanndampinnhold", "g/m³"], [R`v_{mett}`, "metningsinnhold ved temperaturen", "g/m³"]],
    R`Inneluft 20 °C med 8,6 g/m³ (metning 17,3 g/m³):
$RF \approx 50\,\%$. Kjøles den til rundt 9 °C, er luften mettet og det dannes kondens.`, "Dampsperren skal alltid ligge på den varme siden av isolasjonen."),
  en: O("Moisture and dew point", "Warm air can hold more water vapour than cold air. When moist indoor air cools down inside a wall, it can reach the dew point and the water condenses. That is why walls have a vapour barrier on the warm side and a wind barrier that lets moisture out.",
    [[R`RH = \frac{v}{v_{sat}}\cdot 100\,\%`, "relative humidity"]],
    [["RH", "relative humidity", "%"], ["v", "actual water vapour content", "g/m³"], [R`v_{sat}`, "saturation content at the temperature", "g/m³"]],
    R`Indoor air at 20 °C with 8.6 g/m³ (saturation 17.3 g/m³):
$RH \approx 50\,\%$. Cooled to about 9 °C, the air is saturated and condensation forms.`, "The vapour barrier always goes on the warm side of the insulation.") }
]);

// ---------- BYGG 2: Landmåling ----------
TOPICS("BYGG", 2, [
{ id: "nivellering",
  fig: `<svg viewBox="0 0 240 140"><path d="M20 120L220 90" class="d"/><path d="M50 117V30M190 96V30" class="b"/><path d="M50 50H190" class="dash"/><circle cx="120" cy="50" r="6" class="fill"/><text x="30" y="84">B</text><text x="198" y="70">F</text><text x="112" y="36">⊕</text></svg>`,
  nb: O("Nivellering", "Nivellering måler høydeforskjeller med et instrument som gir en vannrett siktelinje. Du leser av en stav på et kjent punkt (bakover) og på det nye punktet (framover). Forskjellen mellom avlesningene er høydeforskjellen.",
    [[R`\Delta h = B - F`, "høydeforskjell fra bak- og framavlesning"], [R`H_{ny} = H_{kjent} + B - F`, "høyde på nytt punkt"]],
    [["B", "bakavlesning (kjent punkt)", "m"], ["F", "framavlesning (nytt punkt)", "m"], ["H", "høyde over havet", "m"]],
    R`Kjent punkt 45,200 moh., $B = 1{,}520$ og $F = 0{,}840$:
$H = 45{,}200 + 1{,}520 - 0{,}840 = 45{,}880$ moh.`, "Stor avlesning betyr at staven står lavt, fordi siktelinjen treffer høyere opp på staven."),
  en: O("Levelling", "Levelling measures height differences with an instrument that gives a horizontal line of sight. You read a staff on a known point (backsight) and on the new point (foresight). The difference between the readings is the height difference.",
    [[R`\Delta h = B - F`, "height difference from back and fore readings"], [R`H_{new} = H_{known} + B - F`, "height of the new point"]],
    [["B", "backsight (known point)", "m"], ["F", "foresight (new point)", "m"], ["H", "height above sea level", "m"]],
    R`Known point 45.200 m, $B = 1{,}520$ and $F = 0{,}840$:
$H = 45{,}200 + 1{,}520 - 0{,}840 = 45{,}880$ m.`, "A large reading means the staff stands low, because the line of sight hits higher up the staff.") },
{ id: "koordinater",
  nb: O("Koordinater og avstand", "I landmåling angis punkter med koordinater, ofte nord og øst i meter. Avstanden mellom to punkter finnes med Pytagoras, og retningen med arcus tangens. Slik kan et bygg settes ut nøyaktig på tomta.",
    [[R`s = \sqrt{\Delta N^2 + \Delta E^2}`, "horisontal avstand"], [R`\alpha = \arctan\frac{\Delta E}{\Delta N}`, "retning målt fra nord"]],
    [[R`\Delta N,\ \Delta E`, "koordinatforskjeller nord og øst", "m"], ["s", "avstand", "m"], [R`\alpha`, "retningsvinkel", "°"]],
    R`Fra (N 100, E 200) til (N 130, E 240):
$s = \sqrt{30^2 + 40^2} = 50$ m.`, "Sjekk hvilken kvadrant retningen ligger i. Arcus tangens alene skiller ikke mellom motsatte retninger."),
  en: O("Coordinates and distance", "In surveying, points are given by coordinates, often north and east in metres. The distance between two points is found with Pythagoras, and the direction with the arctangent. That is how a building is set out precisely on the site.",
    [[R`s = \sqrt{\Delta N^2 + \Delta E^2}`, "horizontal distance"], [R`\alpha = \arctan\frac{\Delta E}{\Delta N}`, "direction measured from north"]],
    [[R`\Delta N,\ \Delta E`, "coordinate differences north and east", "m"], ["s", "distance", "m"], [R`\alpha`, "bearing", "°"]],
    R`From (N 100, E 200) to (N 130, E 240):
$s = \sqrt{30^2 + 40^2} = 50$ m.`, "Check which quadrant the direction lies in. The arctangent alone cannot tell opposite directions apart.") },
{ id: "arealberegning",
  nb: O("Areal fra koordinater", "Arealet av en tomt med kjente hjørnekoordinater kan regnes ut direkte med koordinatmetoden. Du går rundt polygonet og summerer kryssprodukter. Metoden virker for alle polygoner som ikke krysser seg selv.",
    [[R`A = \tfrac12\left|\sum_{i} (x_i\,y_{i+1} - x_{i+1}\,y_i)\right|`, "koordinatmetoden (skolissformelen)"]],
    [["x_i,\\ y_i", "koordinatene til hjørne i", "m"], ["A", "areal", "m²"]],
    R`Rektangel (0,0), (20,0), (20,10), (0,10):
$\tfrac12|0 + 200 + 200 + 0| = 200$ m².`, "Hjørnene må tas i rekkefølge rundt tomta, ellers blir svaret feil."),
  en: O("Area from coordinates", "The area of a plot with known corner coordinates can be calculated directly with the coordinate method. You go round the polygon and sum cross products. The method works for any polygon that does not cross itself.",
    [[R`A = \tfrac12\left|\sum_{i} (x_i\,y_{i+1} - x_{i+1}\,y_i)\right|`, "coordinate method (shoelace formula)"]],
    [["x_i,\\ y_i", "coordinates of corner i", "m"], ["A", "area", "m²"]],
    R`Rectangle (0,0), (20,0), (20,10), (0,10):
$\tfrac12|0 + 200 + 200 + 0| = 200$ m².`, "The corners must be taken in order around the plot, or the answer is wrong.") }
]);

// ---------- DISK 0: Logikk og mengder ----------
TOPICS("DISK", 0, [
{ id: "utsagnslogikk",
  nb: O("Utsagnslogikk", "Et utsagn er enten sant eller usant. Med og, eller, ikke og implikasjon kan utsagn settes sammen, og sannhetsverdien avgjøres med en sannhetstabell. Implikasjonen er bare usann når forutsetningen er sann og konklusjonen usann.",
    [[R`p \land q`, "og: sann bare når begge er sanne"], [R`p \lor q`, "eller: sann når minst én er sann"], [R`p \Rightarrow q \equiv \lnot p \lor q`, "implikasjon"]],
    [[R`\lnot`, "ikke", ""], [R`\land`, "og", ""], [R`\lor`, "eller", ""], [R`\Rightarrow`, "hvis … så", ""]],
    R`$p$: det regner, $q$: bakken er våt.
$p \Rightarrow q$ er usann bare hvis det regner og bakken er tørr.`, "Fra en usann forutsetning følger hva som helst: da er implikasjonen alltid sann."),
  en: O("Propositional logic", "A proposition is either true or false. With and, or, not and implication, propositions can be combined, and the truth value is decided with a truth table. An implication is false only when the premise is true and the conclusion false.",
    [[R`p \land q`, "and: true only when both are true"], [R`p \lor q`, "or: true when at least one is true"], [R`p \Rightarrow q \equiv \lnot p \lor q`, "implication"]],
    [[R`\lnot`, "not", ""], [R`\land`, "and", ""], [R`\lor`, "or", ""], [R`\Rightarrow`, "if … then", ""]],
    R`$p$: it rains, $q$: the ground is wet.
$p \Rightarrow q$ is false only if it rains and the ground is dry.`, "Anything follows from a false premise: then the implication is always true.") },
{ id: "de-morgan",
  nb: O("De Morgans lover", "De Morgans lover viser hvordan ikke fordeler seg over og og eller. Ikke (A og B) er det samme som (ikke A) eller (ikke B). Lovene brukes både i logikk, i mengdelære og når man forenkler betingelser i programkode.",
    [[R`\lnot(p \land q) \equiv \lnot p \lor \lnot q`, "første lov"], [R`\lnot(p \lor q) \equiv \lnot p \land \lnot q`, "andre lov"]],
    [["p,\\ q", "utsagn", ""]],
    R`«Ikke (lørdag eller søndag)» er det samme som «ikke lørdag og ikke søndag», altså en ukedag.`, "Når ikke flyttes inn i parentesen, bytter og og eller plass."),
  en: O("De Morgan's laws", "De Morgan's laws show how not distributes over and and or. Not (A and B) is the same as (not A) or (not B). The laws are used in logic, in set theory and when simplifying conditions in program code.",
    [[R`\lnot(p \land q) \equiv \lnot p \lor \lnot q`, "first law"], [R`\lnot(p \lor q) \equiv \lnot p \land \lnot q`, "second law"]],
    [["p,\\ q", "propositions", ""]],
    R`"Not (Saturday or Sunday)" is the same as "not Saturday and not Sunday", in other words a weekday.`, "When not moves inside the brackets, and and or swap places.") },
{ id: "mengder",
  fig: `<svg viewBox="0 0 240 140"><circle cx="95" cy="70" r="45" class="fill"/><circle cx="145" cy="70" r="45" class="d"/><text x="60" y="74">A</text><text x="172" y="74">B</text><text x="112" y="74">∩</text></svg>`,
  nb: O("Mengder", "En mengde er en samling av ulike elementer. Unionen inneholder alt som er i minst én av mengdene, og snittet det som er i begge. Antall elementer i en union finnes med inklusjon og eksklusjon, så ingen telles to ganger.",
    [[R`A \cup B`, "union: i A eller B"], [R`A \cap B`, "snitt: i både A og B"], [R`|A \cup B| = |A| + |B| - |A \cap B|`, "inklusjon og eksklusjon"]],
    [[R`|A|`, "antall elementer i A", ""], [R`\in`, "er element i", ""], [R`\emptyset`, "tom mengde", ""]],
    R`30 studenter tar matte, 20 fysikk og 12 begge:
$|M \cup F| = 30 + 20 - 12 = 38$.`, "Trekk fra snittet, ellers teller du de som er med i begge to ganger."),
  en: O("Sets", "A set is a collection of distinct elements. The union contains everything that is in at least one of the sets, and the intersection what is in both. The size of a union is found by inclusion and exclusion, so nobody is counted twice.",
    [[R`A \cup B`, "union: in A or B"], [R`A \cap B`, "intersection: in both A and B"], [R`|A \cup B| = |A| + |B| - |A \cap B|`, "inclusion and exclusion"]],
    [[R`|A|`, "number of elements in A", ""], [R`\in`, "is an element of", ""], [R`\emptyset`, "empty set", ""]],
    R`30 students take maths, 20 physics and 12 both:
$|M \cup F| = 30 + 20 - 12 = 38$.`, "Subtract the intersection, or you count those in both twice.") }
]);

// ---------- DISK 1: Kombinatorikk ----------
TOPICS("DISK", 1, [
{ id: "multiplikasjonsprinsippet",
  nb: O("Multiplikasjonsprinsippet", "Hvis et valg kan gjøres på n måter og et annet på m måter, kan de to gjøres sammen på n ganger m måter. Prinsippet er grunnlaget for all telling, fra passordkombinasjoner til antall mulige konstruksjonsvarianter.",
    [[R`N = n_1\cdot n_2\cdots n_k`, "antall kombinasjoner av k uavhengige valg"], [R`N = n^k`, "k valg med n muligheter hver"]],
    [["n_i", "antall muligheter i valg i", ""], ["k", "antall valg", ""]],
    R`En PIN-kode på 4 sifre:
$10^4 = 10\,000$ muligheter.`, "Sjekk om valgene er uavhengige. Hvis ett valg begrenser et annet, må du telle mer forsiktig."),
  en: O("The multiplication principle", "If one choice can be made in n ways and another in m ways, the two can be made together in n times m ways. The principle is the basis of all counting, from password combinations to the number of possible design variants.",
    [[R`N = n_1\cdot n_2\cdots n_k`, "number of combinations of k independent choices"], [R`N = n^k`, "k choices with n options each"]],
    [["n_i", "number of options in choice i", ""], ["k", "number of choices", ""]],
    R`A 4-digit PIN:
$10^4 = 10\,000$ possibilities.`, "Check whether the choices are independent. If one choice limits another, count more carefully.") },
{ id: "permutasjoner",
  nb: O("Permutasjoner", "En permutasjon er en ordning der rekkefølgen betyr noe. Antall måter å stille opp n ting på er n fakultet. Velger du bare k av dem i rekkefølge, blir det færre muligheter.",
    [[R`n! = n\cdot(n-1)\cdots 2\cdot 1`, "alle n i rekkefølge"], [R`P(n,k) = \frac{n!}{(n-k)!}`, "k av n i rekkefølge"]],
    [["n", "antall ting", ""], ["k", "antall som velges", ""]],
    R`Gull, sølv og bronse blant 8 løpere:
$P(8,3) = 8\cdot 7\cdot 6 = 336$.`, "Per definisjon er 0! = 1."),
  en: O("Permutations", "A permutation is an arrangement where the order matters. The number of ways to arrange n things is n factorial. If you only choose k of them in order, there are fewer possibilities.",
    [[R`n! = n\cdot(n-1)\cdots 2\cdot 1`, "all n in order"], [R`P(n,k) = \frac{n!}{(n-k)!}`, "k of n in order"]],
    [["n", "number of things", ""], ["k", "number chosen", ""]],
    R`Gold, silver and bronze among 8 runners:
$P(8,3) = 8\cdot 7\cdot 6 = 336$.`, "By definition 0! = 1.") },
{ id: "kombinasjoner",
  nb: O("Kombinasjoner", "En kombinasjon er et utvalg der rekkefølgen ikke betyr noe. Det er færre kombinasjoner enn permutasjoner, fordi hver gruppe på k kan ordnes på k fakultet måter. Binomialkoeffisienten gir antallet.",
    [[R`\binom{n}{k} = \frac{n!}{k!\,(n-k)!}`, "k av n uten rekkefølge"], [R`\binom{n}{k} = \binom{n}{n-k}`, "symmetri"]],
    [[R`\binom{n}{k}`, "«n over k»", ""]],
    R`En gruppe på 3 av 10 studenter:
$\binom{10}{3} = \frac{10\cdot 9\cdot 8}{6} = 120$.`, "Spør deg selv: blir det et nytt utfall om de samme bytter plass? Nei betyr kombinasjon."),
  en: O("Combinations", "A combination is a selection where the order does not matter. There are fewer combinations than permutations, because each group of k can be ordered in k factorial ways. The binomial coefficient gives the number.",
    [[R`\binom{n}{k} = \frac{n!}{k!\,(n-k)!}`, "k of n without order"], [R`\binom{n}{k} = \binom{n}{n-k}`, "symmetry"]],
    [[R`\binom{n}{k}`, "\"n choose k\"", ""]],
    R`A group of 3 out of 10 students:
$\binom{10}{3} = \frac{10\cdot 9\cdot 8}{6} = 120$.`, "Ask yourself: is it a new outcome if the same ones swap places? No means combination.") }
]);

// ---------- DISK 2: Grafer og modulregning ----------
TOPICS("DISK", 2, [
{ id: "grafer",
  fig: `<svg viewBox="0 0 240 140"><path d="M50 40L130 25L190 70L130 115L50 100Z M50 40L50 100 M130 25L130 115" class="d"/><circle cx="50" cy="40" r="7" class="af"/><circle cx="130" cy="25" r="7" class="af"/><circle cx="190" cy="70" r="7" class="af"/><circle cx="130" cy="115" r="7" class="af"/><circle cx="50" cy="100" r="7" class="af"/></svg>`,
  nb: O("Grafer", "En graf består av noder (hjørner) og kanter mellom dem. Den brukes til å modellere nettverk, veier, rørsystemer og avhengigheter. Graden til en node er antall kanter som går ut fra den.",
    [[R`\sum_v \deg(v) = 2|E|`, "håndhilselemmaet"], [R`|E|_{maks} = \binom{n}{2}`, "flest mulige kanter i en enkel graf"]],
    [[R`\deg(v)`, "grad til node v", ""], [R`|E|`, "antall kanter", ""], ["n", "antall noder", ""]],
    R`5 noder med gradene 2, 3, 3, 2 og 2:
summen er 12, så grafen har $12/2 = 6$ kanter.`, "Summen av gradene er alltid et partall, fordi hver kant teller to ganger."),
  en: O("Graphs", "A graph consists of nodes (vertices) and edges between them. It is used to model networks, roads, piping systems and dependencies. The degree of a node is the number of edges going out from it.",
    [[R`\sum_v \deg(v) = 2|E|`, "handshake lemma"], [R`|E|_{max} = \binom{n}{2}`, "most possible edges in a simple graph"]],
    [[R`\deg(v)`, "degree of node v", ""], [R`|E|`, "number of edges", ""], ["n", "number of nodes", ""]],
    R`5 nodes with degrees 2, 3, 3, 2 and 2:
the sum is 12, so the graph has $12/2 = 6$ edges.`, "The sum of the degrees is always even, because each edge counts twice.") },
{ id: "modulregning",
  nb: O("Modulregning", "Modulregning handler om resten etter heltallsdivisjon, som en klokke som starter på nytt. To tall er kongruente modulo n hvis de gir samme rest. Det brukes i kontrollsiffer, hashing og kryptografi.",
    [[R`a \equiv b \pmod n`, "a og b gir samme rest ved deling på n"], [R`(a\cdot b) \bmod n = ((a \bmod n)(b \bmod n)) \bmod n`, "regn med restene underveis"]],
    [[R`\bmod`, "rest ved heltallsdivisjon", ""], ["n", "modulus", ""]],
    R`Hvilken ukedag er det om 100 dager, hvis i dag er mandag?
$100 \bmod 7 = 2$, så det blir onsdag.`, "Reduser tallene underveis, så slipper du å regne med enorme tall."),
  en: O("Modular arithmetic", "Modular arithmetic is about the remainder after integer division, like a clock that starts over. Two numbers are congruent modulo n if they leave the same remainder. It is used in check digits, hashing and cryptography.",
    [[R`a \equiv b \pmod n`, "a and b leave the same remainder when divided by n"], [R`(a\cdot b) \bmod n = ((a \bmod n)(b \bmod n)) \bmod n`, "work with remainders along the way"]],
    [[R`\bmod`, "remainder of integer division", ""], ["n", "modulus", ""]],
    R`Which weekday is it in 100 days if today is Monday?
$100 \bmod 7 = 2$, so it will be Wednesday.`, "Reduce the numbers along the way, so you never have to handle huge numbers.") },
{ id: "euklid",
  nb: O("Største felles divisor", "Største felles divisor er det største tallet som deler to heltall. Euklids algoritme finner den raskt ved å dele gjentatte ganger og bytte ut tallene med resten, til resten blir null. Den siste resten som ikke er null, er svaret.",
    [[R`\gcd(a, b) = \gcd(b,\ a \bmod b)`, "Euklids algoritme"], [R`\text{lcm}(a,b) = \frac{a\,b}{\gcd(a,b)}`, "minste felles multiplum"]],
    [[R`\gcd`, "største felles divisor", ""], [R`\text{lcm}`, "minste felles multiplum", ""]],
    R`$\gcd(84, 36)$: $84 \bmod 36 = 12$ og $36 \bmod 12 = 0$.
Svaret er 12.`, "Algoritmen er rask selv for store tall, fordi tallene minst halveres annenhver runde."),
  en: O("Greatest common divisor", "The greatest common divisor is the largest number that divides two integers. Euclid's algorithm finds it quickly by dividing repeatedly and replacing the numbers with the remainder until the remainder is zero. The last non-zero remainder is the answer.",
    [[R`\gcd(a, b) = \gcd(b,\ a \bmod b)`, "Euclid's algorithm"], [R`\text{lcm}(a,b) = \frac{a\,b}{\gcd(a,b)}`, "least common multiple"]],
    [[R`\gcd`, "greatest common divisor", ""], [R`\text{lcm}`, "least common multiple", ""]],
    R`$\gcd(84, 36)$: $84 \bmod 36 = 12$ and $36 \bmod 12 = 0$.
The answer is 12.`, "The algorithm is fast even for large numbers, because the numbers at least halve every other round.") }
]);

// ---------- DBNET 0: Relasjonsdatabaser og SQL ----------
TOPICS("DBNET", 0, [
{ id: "nokler",
  nb: O("Tabeller og nøkler", "En relasjonsdatabase lagrer data i tabeller med rader og kolonner. Primærnøkkelen identifiserer hver rad unikt, og en fremmednøkkel peker til primærnøkkelen i en annen tabell. Slik kobles for eksempel eksamener til riktig student.",
    [[R`\text{Eksamen.student\_id} \rightarrow \text{Student.id}`, "fremmednøkkel peker til primærnøkkel"]],
    [[R`\text{PK}`, "primærnøkkel: unik per rad", ""], [R`\text{FK}`, "fremmednøkkel: kobling til annen tabell", ""]],
    R`Student(id, navn) og Eksamen(id, student_id, emne, karakter):
én student kan ha mange eksamener, men hver eksamen hører til én student.`, "Lagre hver opplysning ett sted. Da kan den ikke komme i utakt med seg selv."),
  en: O("Tables and keys", "A relational database stores data in tables with rows and columns. The primary key identifies each row uniquely, and a foreign key points to the primary key of another table. That is how exams, for example, are linked to the right student.",
    [[R`\text{Exam.student\_id} \rightarrow \text{Student.id}`, "a foreign key points to a primary key"]],
    [[R`\text{PK}`, "primary key: unique per row", ""], [R`\text{FK}`, "foreign key: link to another table", ""]],
    R`Student(id, name) and Exam(id, student_id, course, grade):
one student can have many exams, but each exam belongs to one student.`, "Store each fact in one place. Then it cannot get out of step with itself.") },
{ id: "select",
  nb: O("SELECT og WHERE", "En SQL-spørring henter ut data. FROM sier hvilken tabell, WHERE hvilke rader, og SELECT hvilke kolonner som vises. ORDER BY sorterer resultatet. Databasen utfører delene i en annen rekkefølge enn du skriver dem.",
    [[R`\texttt{SELECT navn FROM Student WHERE alder > 20;}`, "hent navn på studenter over 20"], [R`\texttt{... ORDER BY navn;}`, "sorter resultatet"]],
    [[R`\texttt{FROM}`, "hvilken tabell", ""], [R`\texttt{WHERE}`, "hvilke rader", ""], [R`\texttt{SELECT}`, "hvilke kolonner", ""]],
    R`Lønninger 520, 610, 480 og 700 (tusen):
$\texttt{SELECT COUNT(*) FROM Ansatt WHERE lonn > 500}$ gir 3.`, "Glemmer du WHERE i UPDATE eller DELETE, endres alle radene."),
  en: O("SELECT and WHERE", "An SQL query fetches data. FROM says which table, WHERE which rows, and SELECT which columns are shown. ORDER BY sorts the result. The database runs the parts in a different order than you write them.",
    [[R`\texttt{SELECT name FROM Student WHERE age > 20;}`, "fetch names of students over 20"], [R`\texttt{... ORDER BY name;}`, "sort the result"]],
    [[R`\texttt{FROM}`, "which table", ""], [R`\texttt{WHERE}`, "which rows", ""], [R`\texttt{SELECT}`, "which columns", ""]],
    R`Salaries 520, 610, 480 and 700 (thousand):
$\texttt{SELECT COUNT(*) FROM Employee WHERE salary > 500}$ gives 3.`, "If you forget WHERE in an UPDATE or DELETE, every row is changed.") },
{ id: "join-group",
  nb: O("JOIN og GROUP BY", "JOIN setter sammen rader fra to tabeller der nøklene passer. GROUP BY samler rader med samme verdi, slik at aggregatfunksjoner som COUNT, SUM og AVG regnes per gruppe. HAVING filtrerer gruppene etterpå.",
    [[R`\texttt{... JOIN Eksamen e ON e.student\_id = s.id}`, "koble tabeller"], [R`\texttt{SELECT emne, AVG(karakter) ... GROUP BY emne}`, "snitt per emne"]],
    [[R`\texttt{COUNT, SUM, AVG}`, "aggregatfunksjoner", ""], [R`\texttt{HAVING}`, "filter på grupper", ""]],
    R`Eksamener i MAT (4 stk.) og FYS (2 stk.):
$\texttt{SELECT emne, COUNT(*) ... GROUP BY emne}$ gir MAT 4 og FYS 2.`, "WHERE filtrerer rader før grupperingen, HAVING filtrerer grupper etter."),
  en: O("JOIN and GROUP BY", "JOIN combines rows from two tables where the keys match. GROUP BY collects rows with the same value, so that aggregate functions like COUNT, SUM and AVG are computed per group. HAVING filters the groups afterwards.",
    [[R`\texttt{... JOIN Exam e ON e.student\_id = s.id}`, "link tables"], [R`\texttt{SELECT course, AVG(grade) ... GROUP BY course}`, "average per course"]],
    [[R`\texttt{COUNT, SUM, AVG}`, "aggregate functions", ""], [R`\texttt{HAVING}`, "filter on groups", ""]],
    R`Exams in MAT (4) and PHY (2):
$\texttt{SELECT course, COUNT(*) ... GROUP BY course}$ gives MAT 4 and PHY 2.`, "WHERE filters rows before grouping, HAVING filters groups after.") }
]);

// ---------- DBNET 1: IP-nettverk og subnetting ----------
TOPICS("DBNET", 1, [
{ id: "ip-adresse",
  nb: O("IP-adresser", "En IPv4-adresse består av 32 bit, skrevet som fire tall fra 0 til 255. Prefikset etter skråstreken sier hvor mange bit som hører til nettverket. Resten av bitene nummererer maskinene i nettverket.",
    [[R`\text{192.168.1.10/24}`, "adresse med 24 bit nettverksdel"], [R`/24 \leftrightarrow \text{255.255.255.0}`, "prefiks og nettmaske"]],
    [[R`/p`, "prefiks: antall nettverksbit", ""], [R`\text{oktett}`, "8 bit, et tall 0–255", ""]],
    R`$\text{10.0.5.77/24}$: nettverket er $\text{10.0.5.0}$, og maskinen er nummer 77 i det.`, "Hver oktett er 8 bit, så fire oktetter gir 32 bit."),
  en: O("IP addresses", "An IPv4 address consists of 32 bits, written as four numbers from 0 to 255. The prefix after the slash says how many bits belong to the network. The remaining bits number the machines in the network.",
    [[R`\text{192.168.1.10/24}`, "address with a 24-bit network part"], [R`/24 \leftrightarrow \text{255.255.255.0}`, "prefix and netmask"]],
    [[R`/p`, "prefix: number of network bits", ""], [R`\text{octet}`, "8 bits, a number 0–255", ""]],
    R`$\text{10.0.5.77/24}$: the network is $\text{10.0.5.0}$, and the machine is number 77 in it.`, "Each octet is 8 bits, so four octets give 32 bits.") },
{ id: "subnetting",
  nb: O("Subnetting", "Et nettverk deles i mindre subnett ved å bruke flere bit til nettverksdelen. Antall adresser i et subnett er to opphøyd i antall vertsbit. To adresser går bort: nettverksadressen og kringkastingsadressen.",
    [[R`N = 2^{32 - p}`, "adresser i et /p-nett"], [R`H = 2^{32 - p} - 2`, "brukbare vertsadresser"]],
    [["p", "prefikslengde", ""], ["H", "antall maskiner som får plass", ""]],
    R`Et /26-nett:
$2^{6} - 2 = 62$ brukbare adresser.`, "Ett prefiks lenger halverer antall adresser."),
  en: O("Subnetting", "A network is split into smaller subnets by using more bits for the network part. The number of addresses in a subnet is two to the power of the number of host bits. Two addresses are lost: the network address and the broadcast address.",
    [[R`N = 2^{32 - p}`, "addresses in a /p network"], [R`H = 2^{32 - p} - 2`, "usable host addresses"]],
    [["p", "prefix length", ""], ["H", "number of machines that fit", ""]],
    R`A /26 network:
$2^{6} - 2 = 62$ usable addresses.`, "One step longer prefix halves the number of addresses.") },
{ id: "overforingstid",
  nb: O("Overføringstid", "Hvor lang tid en fil tar å sende, avhenger av størrelsen og båndbredden. Filstørrelser oppgis ofte i byte, mens båndbredde oppgis i bit per sekund. Én byte er 8 bit, så det må regnes om først.",
    [[R`t = \frac{8\cdot S}{B}`, "tid fra størrelse i byte og båndbredde i bit/s"]],
    [["S", "filstørrelse", "MB"], ["B", "båndbredde", "Mbit/s"], ["t", "tid", "s"]],
    R`100 MB over 50 Mbit/s:
$t = 800/50 = 16$ s.`, "Stor B betyr byte og liten b betyr bit. MB/s og Mbit/s skiller seg med en faktor 8."),
  en: O("Transfer time", "How long a file takes to send depends on its size and the bandwidth. File sizes are usually given in bytes, while bandwidth is given in bits per second. One byte is 8 bits, so convert first.",
    [[R`t = \frac{8\cdot S}{B}`, "time from size in bytes and bandwidth in bit/s"]],
    [["S", "file size", "MB"], ["B", "bandwidth", "Mbit/s"], ["t", "time", "s"]],
    R`100 MB over 50 Mbit/s:
$t = 800/50 = 16$ s.`, "Capital B means byte and small b means bit. MB/s and Mbit/s differ by a factor of 8.") }
]);

// ---------- DBNET 2: IKT-sikkerhet ----------
TOPICS("DBNET", 2, [
{ id: "passordstyrke",
  nb: O("Passordstyrke", "Et passord er sterkt når det finnes svært mange mulige kombinasjoner. Antallet vokser med tegnsettet og raskt med lengden. Entropi i bit er totallogaritmen av antall kombinasjoner, og hver ekstra bit dobler tiden det tar å prøve alle.",
    [[R`K = N^L`, "antall mulige passord"], [R`E = L\cdot\log_2 N`, "entropi i bit"]],
    [["N", "antall mulige tegn", ""], ["L", "lengde", ""], ["E", "entropi", "bit"]],
    R`12 små bokstaver ($N = 26$):
$E = 12\cdot\log_2 26 \approx 56$ bit.`, "Lengde slår kompleksitet. Fire tilfeldige ord er sterkere enn et kort passord med spesialtegn."),
  en: O("Password strength", "A password is strong when there are a huge number of possible combinations. The number grows with the character set and quickly with the length. Entropy in bits is the base-2 logarithm of the number of combinations, and each extra bit doubles the time needed to try them all.",
    [[R`K = N^L`, "number of possible passwords"], [R`E = L\cdot\log_2 N`, "entropy in bits"]],
    [["N", "number of possible characters", ""], ["L", "length", ""], ["E", "entropy", "bit"]],
    R`12 lowercase letters ($N = 26$):
$E = 12\cdot\log_2 26 \approx 56$ bits.`, "Length beats complexity. Four random words are stronger than a short password with symbols.") },
{ id: "kryptering",
  nb: O("Kryptering", "Kryptering gjør data uleselig for alle som ikke har nøkkelen. Symmetrisk kryptering bruker samme nøkkel til å låse og låse opp, og er rask. Asymmetrisk kryptering har et nøkkelpar: en offentlig nøkkel som alle kan bruke, og en privat nøkkel bare eieren har.",
    [[R`C = E_k(M),\ M = D_k(C)`, "symmetrisk: samme nøkkel k"], [R`C = E_{pub}(M),\ M = D_{priv}(C)`, "asymmetrisk: offentlig og privat nøkkel"]],
    [["M", "klartekst", ""], ["C", "kryptert tekst", ""], ["k", "nøkkel", ""]],
    R`HTTPS bruker asymmetrisk kryptering for å bli enige om en felles nøkkel, og deretter rask symmetrisk kryptering for resten av samtalen.`, "Den private nøkkelen skal aldri deles eller legges i koden."),
  en: O("Encryption", "Encryption makes data unreadable to anyone without the key. Symmetric encryption uses the same key to lock and unlock, and is fast. Asymmetric encryption has a key pair: a public key anyone can use, and a private key only the owner has.",
    [[R`C = E_k(M),\ M = D_k(C)`, "symmetric: the same key k"], [R`C = E_{pub}(M),\ M = D_{priv}(C)`, "asymmetric: public and private key"]],
    [["M", "plaintext", ""], ["C", "ciphertext", ""], ["k", "key", ""]],
    R`HTTPS uses asymmetric encryption to agree on a shared key, and then fast symmetric encryption for the rest of the conversation.`, "The private key must never be shared or put in the code.") },
{ id: "hashing",
  nb: O("Hashing", "En hashfunksjon gjør om data av vilkårlig lengde til et fingeravtrykk med fast lengde. Samme inndata gir alltid samme hash, men det er praktisk umulig å regne seg baklengs. Passord lagres derfor som hash med salt, ikke som klartekst.",
    [[R`h = H(\text{salt} \,\|\, \text{passord})`, "lagret passordhash"], [R`2^{n}`, "antall mulige hashverdier med n bit"]],
    [["H", "hashfunksjon, f.eks. SHA-256", ""], [R`\text{salt}`, "tilfeldig verdi per bruker", ""], [R`\|`, "sammenføyning", ""]],
    R`Ved innlogging hashes passordet med samme salt og sammenlignes med den lagrede hashen. Selve passordet lagres aldri.`, "Bruk en treg passordhash som bcrypt eller Argon2, ikke en rask hash som MD5."),
  en: O("Hashing", "A hash function turns data of any length into a fingerprint of fixed length. The same input always gives the same hash, but working backwards is practically impossible. Passwords are therefore stored as salted hashes, not as plaintext.",
    [[R`h = H(\text{salt} \,\|\, \text{password})`, "stored password hash"], [R`2^{n}`, "number of possible hash values with n bits"]],
    [["H", "hash function, e.g. SHA-256", ""], [R`\text{salt}`, "random value per user", ""], [R`\|`, "concatenation", ""]],
    R`At login the password is hashed with the same salt and compared with the stored hash. The password itself is never stored.`, "Use a slow password hash like bcrypt or Argon2, not a fast hash like MD5.") }
]);
})();
