// ============================================================
//  add_ark_b.js – ARKITEKTUR: Form, rom og tegning + Bygg og regelverk.
//  Regneoppgaver (målestokk, gyldent snitt, rampe, %-BYA, U-verdi) får nye tall hver gang.
// ============================================================
NEWCOURSE({ code: "ARKF", study: "ark", group: "Arkitektur", nb: "Form, rom og tegning", en: "Form, space and drawing", s: ["FR", "FS"], eqText: { nb: "1. studieår arkitektur", en: "Architecture, year 1" }, units: [] });
NEWCOURSE({ code: "ARKT", study: "ark", group: "Arkitektur", nb: "Bygg og regelverk", en: "Building and regulations", s: ["BR", "BR"], eqText: { nb: "1.–2. studieår arkitektur", en: "Architecture, years 1–2" }, units: [] });
(() => {
const U = (code, nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT(code, nb, en); THEORY(code, u, { nb: thNb, en: thEn }); BIQ(code, u, qs); if(gens.length) GEN(code, u, ...gens); return u; };
const N = (n, tol = 0, u = "") => ({ n, tol, u });

// ================= FORM, ROM OG TEGNING =================
U("ARKF", "Form og komposisjon", "Form and composition",
`## Hva handler det om?
All arkitektur er bygget av noen få **grunnelementer** satt sammen etter noen få **prinsipper**. Kjenner du dem, kan du både lese og lage rom.

## Det viktigste
- **Grunnelementene**: **punkt** (en søyle, et tårn), **linje** (en vegg, en allé), **flate** (gulv, tak, vegg) og **volum** (rommet eller bygningskroppen).
- **Akse**: en linje som ordner elementer – ofte med symmetri om aksen.
- **Symmetri** gir ro og verdighet. **Asymmetri** gir bevegelse og spenning.
- **Hierarki**: noe gjøres viktigere med størrelse, form eller plassering – hovedinngangen, det største rommet.
- **Rytme og repetisjon**: søyler, vinduer og bjelker i et gjentatt mønster.
- **Kontrast**: lys og mørkt, tungt og lett, åpent og lukket – forskjeller gjør at vi oppfatter rommet.

### Eksempel
En lang rekke like vinduer (rytme) med én større åpning midt på (hierarki) forteller deg straks hvor inngangen er – uten skilt.

> Prøv å beskrive et bygg du kjenner med disse ordene: hva er punktene, linjene, flatene og volumene?`,
`## What is it about?
All architecture is built from a few **basic elements** combined according to a few **principles**. Once you know them, you can both read and make spaces.

## Key points
- **Basic elements**: **point** (a column, a tower), **line** (a wall, an avenue), **plane** (floor, roof, wall) and **volume** (the room or the building mass).
- **Axis**: a line that orders elements – often with symmetry about the axis.
- **Symmetry** gives calm and dignity. **Asymmetry** gives movement and tension.
- **Hierarchy**: something is made more important by size, shape or position – the main entrance, the largest room.
- **Rhythm and repetition**: columns, windows and beams in a repeated pattern.
- **Contrast**: light and dark, heavy and light, open and closed – differences make us perceive the space.

### Example
A long row of identical windows (rhythm) with one larger opening in the middle (hierarchy) tells you at once where the entrance is – without a sign.

> Try describing a building you know with these words: what are its points, lines, planes and volumes?`,
[["Hvilket grunnelement er en frittstående søyle?", ["Punkt", "Flate", "Volum", "Akse"], "En søyle markerer et punkt i rommet.",
  "Which basic element is a free-standing column?", ["Point", "Plane", "Volume", "Axis"], "A column marks a point in space."],
 ["Hva skaper hierarki i en fasade?", ["At ett element skiller seg ut i størrelse, form eller plassering", "At alle vinduene er like", "At fasaden er hvit", "At bygget er høyt"], "Det som skiller seg ut, oppfattes som viktigst.",
  "What creates hierarchy in a facade?", ["One element standing out in size, shape or position", "All windows being identical", "The facade being white", "The building being tall"], "What stands out is perceived as most important."],
 ["Hva gir symmetri vanligvis et bygg?", ["Ro og verdighet", "Bevegelse og uro", "Lavere pris", "Bedre isolasjon"], "Symmetri brukes ofte i monumentale bygg som rådhus og kirker.",
  "What does symmetry usually give a building?", ["Calm and dignity", "Movement and unrest", "A lower price", "Better insulation"], "Symmetry is often used in monumental buildings like town halls and churches."],
 ["En rekke like søyler med samme avstand er et eksempel på …", ["Rytme", "Kontrast", "Hierarki", "Asymmetri"], "Gjentakelse med fast intervall gir rytme.",
  "A row of identical, evenly spaced columns is an example of …", ["Rhythm", "Contrast", "Hierarchy", "Asymmetry"], "Repetition at a fixed interval gives rhythm."],
 ["Hva er en akse i arkitektur?", ["En linje som ordner elementer", "En bærende bjelke", "En type vindu", "Et tak"], "Aksen kan være synlig (en allé) eller usynlig (symmetrilinja).",
  "What is an axis in architecture?", ["A line that orders elements", "A load-bearing beam", "A type of window", "A roof"], "The axis can be visible (an avenue) or invisible (the line of symmetry)."],
 ["Hvilket par er et eksempel på kontrast?", ["Mørk smal gang før et lyst, høyt rom", "To like rom etter hverandre", "Like vinduer i rekke", "En symmetrisk fasade"], "Kontrasten gjør at det lyse rommet oppleves enda større.",
  "Which pair is an example of contrast?", ["A dark narrow corridor before a bright tall room", "Two identical rooms in a row", "Identical windows in a row", "A symmetrical facade"], "The contrast makes the bright room feel even bigger."]]);

U("ARKF", "Proporsjoner og målestokk", "Proportion and scale",
`## Hva handler det om?
**Proporsjoner** er forholdet mellom delene. **Målestokk** er forholdet mellom tegningen og virkeligheten.

## Det viktigste
- **Det gylne snitt**: $\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1{,}618$. Et rektangel med sidene i forholdet 1 : 1,618 har vært brukt siden antikken.
- **Le Corbusiers Modulor** er et målsystem basert på menneskekroppen og det gylne snitt.
- **A-formatene** har sideforhold $1 : \\sqrt{2}$. Halverer du arket, får du samme form. A0 er 1 m².
- **Målestokk 1:50** betyr at 1 cm på tegningen er 50 cm i virkeligheten.
- Vanlige målestokker: 1:500 (situasjonsplan), 1:100 (plan, snitt, fasade), 1:50 (rom og detaljer), 1:20 og 1:5 (detaljer).
- Fra tegning til virkelighet: **gang** med målestokktallet. Fra virkelighet til tegning: **del**.

### Eksempel
En vegg er 6 m lang. I 1:50 blir den $6000 : 50 = 120$ mm = 12 cm på tegningen.

> Regn i millimeter – da blir målestokk-regning enkel.`,
`## What is it about?
**Proportion** is the relationship between the parts. **Scale** is the relationship between the drawing and reality.

## Key points
- **The golden ratio**: $\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$. A rectangle with sides in the ratio 1 : 1.618 has been used since antiquity.
- **Le Corbusier's Modulor** is a system of measures based on the human body and the golden ratio.
- **A paper sizes** have the ratio $1 : \\sqrt{2}$. Halve the sheet and you get the same shape. A0 is 1 m².
- **Scale 1:50** means that 1 cm on the drawing is 50 cm in reality.
- Common scales: 1:500 (site plan), 1:100 (plan, section, elevation), 1:50 (rooms and details), 1:20 and 1:5 (details).
- From drawing to reality: **multiply** by the scale number. From reality to drawing: **divide**.

### Example
A wall is 6 m long. At 1:50 it becomes $6000 : 50 = 120$ mm = 12 cm on the drawing.

> Work in millimetres – then scale calculations are easy.`,
[["Hva er det gylne snitt omtrent?", ["1,618", "1,414", "3,14", "2,0"], "$\\varphi = (1 + \\sqrt{5})/2 \\approx 1{,}618$.",
  "What is the golden ratio approximately?", ["1.618", "1.414", "3.14", "2.0"], "$\\varphi = (1 + \\sqrt{5})/2 \\approx 1.618$."],
 ["Hva betyr målestokk 1:100?", ["1 cm på tegningen er 1 m i virkeligheten", "1 m på tegningen er 1 cm i virkeligheten", "Tegningen er 100 ganger større", "Bygget har 100 rom"], "100 cm = 1 m.",
  "What does scale 1:100 mean?", ["1 cm on the drawing is 1 m in reality", "1 m on the drawing is 1 cm in reality", "The drawing is 100 times bigger", "The building has 100 rooms"], "100 cm = 1 m."],
 ["Hvilket sideforhold har A-formatene?", ["$1 : \\sqrt{2}$", "$1 : \\varphi$", "$1 : 2$", "$3 : 4$"], "Når arket halveres, beholdes formen.",
  "Which aspect ratio do A paper sizes have?", ["$1 : \\sqrt{2}$", "$1 : \\varphi$", "$1 : 2$", "$3 : 4$"], "When the sheet is halved, the shape stays the same."],
 ["Hvilken målestokk passer best for en situasjonsplan av et nabolag?", ["1:500", "1:5", "1:20", "1:1"], "Situasjonsplanen viser bygget i omgivelsene – stor målestokk-tall.",
  "Which scale suits a site plan of a neighbourhood best?", ["1:500", "1:5", "1:20", "1:1"], "The site plan shows the building in its surroundings – a large scale number."],
 ["Hva bygger Le Corbusiers Modulor på?", ["Menneskekroppen og det gylne snitt", "Metersystemet alene", "Romerske fot", "Arkformatene"], "En mann på 1,83 m med hevet arm er utgangspunktet.",
  "What is Le Corbusier's Modulor based on?", ["The human body and the golden ratio", "The metric system alone", "Roman feet", "Paper sizes"], "A 1.83 m man with a raised arm is the starting point."],
 ["En linje er 4 cm på en tegning i 1:200. Hvor lang er den i virkeligheten?", ["8 m", "80 cm", "0,8 m", "800 m"], "$4 \\cdot 200 = 800$ cm = 8 m.",
  "A line is 4 cm on a 1:200 drawing. How long is it in reality?", ["8 m", "80 cm", "0.8 m", "800 m"], "$4 \\cdot 200 = 800$ cm = 8 m."]],
 () => { const k = R.p([20, 50, 100, 200, 500]), real = R.p([1.2, 2.4, 3, 4.5, 6, 7.2, 8, 9.6, 12, 15, 24, 30]), mm = real * 1000 / k;
   return [T(`En vegg er ${nf(real)} m lang. Hvor mange millimeter blir den på en tegning i 1:${k}?`, `A wall is ${nf(real)} m long. How many millimetres is it on a 1:${k} drawing?`), N(+mm.toFixed(2), 0.05, "mm"),
     T(`$${mf(real * 1000)}\\text{ mm} : ${k} = ${mf(+mm.toFixed(2))}$ mm.`, `$${mf(real * 1000)}\\text{ mm} : ${k} = ${mf(+mm.toFixed(2))}$ mm.`)]; },
 () => { const k = R.p([50, 100, 200, 500]), cm = R.p([2, 3, 4, 5, 6, 7.5, 8, 10, 12]), m = cm * k / 100;
   return [T(`Et mål på ${nf(cm)} cm på en tegning i 1:${k} – hvor mange meter er det i virkeligheten?`, `A dimension of ${nf(cm)} cm on a 1:${k} drawing – how many metres is that in reality?`), N(m, 0.01, "m"),
     T(`$${mf(cm)} \\cdot ${k} = ${mf(cm * k)}$ cm = ${nf(m)} m.`, `$${mf(cm)} \\cdot ${k} = ${mf(cm * k)}$ cm = ${nf(m)} m.`)]; },
 () => { const a = R.p([3, 4, 5, 6, 8, 10, 12]), b = +(a * 1.618).toFixed(2);
   return [T(`Den korte siden i et gyllent rektangel er ${a} m. Hvor lang er den lange siden? Bruk $\\varphi \\approx 1{,}618$.`, `The short side of a golden rectangle is ${a} m. How long is the long side? Use $\\varphi \\approx 1.618$.`), N(b, 0.02, "m"),
     T(`$${a} \\cdot 1{,}618 \\approx ${mf(b)}$ m.`, `$${a} \\cdot 1.618 \\approx ${mf(b)}$ m.`)]; }
);

U("ARKF", "Arkitekturtegning", "Architectural drawing",
`## Hva handler det om?
Arkitekter kommuniserer med tegninger. Hver tegningstype er et **snitt** eller en **projeksjon** gjennom bygget, og alle følger faste regler så andre kan lese dem.

## Det viktigste
- **Situasjonsplan**: bygget sett ovenfra på tomta, med nabobygg, veier og **nordpil**.
- **Plantegning**: et vannrett snitt gjennom etasjen, ca. 1 m over gulvet. Du ser vegger, dører (med slagretning), vinduer og trapper.
- **Snitt**: et loddrett snitt gjennom bygget. Viser etasjehøyder, trapper, tak og hvordan rommene henger sammen i høyden.
- **Fasade**: bygget sett rett forfra, uten perspektiv.
- **Linjetykkelse** viser hva som er snittet: det som er kuttet, tegnes tykt; det du ser bak, tegnes tynt. Skjulte deler tegnes stiplet.
- **Aksonometri** og **perspektiv** viser bygget i tre dimensjoner.

### Eksempel
Dørens slagbue på plantegningen viser hvilken vei den åpner – viktig for møblering og rømning.

> Tykk strek = snittet. Tynn strek = sett. Stiplet = skjult eller over snittet.`,
`## What is it about?
Architects communicate with drawings. Each type of drawing is a **section** or a **projection** through the building, and they all follow fixed rules so others can read them.

## Key points
- **Site plan**: the building seen from above on its plot, with neighbouring buildings, roads and a **north arrow**.
- **Floor plan**: a horizontal cut through the storey, about 1 m above the floor. You see walls, doors (with swing direction), windows and stairs.
- **Section**: a vertical cut through the building. It shows storey heights, stairs, roof and how rooms relate in height.
- **Elevation**: the building seen straight on, without perspective.
- **Line weight** shows what is cut: what is cut is drawn thick; what you see behind is drawn thin. Hidden parts are dashed.
- **Axonometric** and **perspective** drawings show the building in three dimensions.

### Example
The door swing arc on the plan shows which way the door opens – important for furnishing and escape routes.

> Thick line = cut. Thin line = seen. Dashed = hidden or above the cut.`,
[["Hva er en plantegning?", ["Et vannrett snitt gjennom etasjen", "Bygget sett forfra", "Et loddrett snitt", "Et perspektiv"], "Kuttet ligger omtrent 1 m over gulvet.",
  "What is a floor plan?", ["A horizontal cut through the storey", "The building seen from the front", "A vertical cut", "A perspective"], "The cut is about 1 m above the floor."],
 ["Hvilken tegning viser best etasjehøyder og trapper?", ["Snitt", "Situasjonsplan", "Fasade", "Plantegning"], "Snittet går loddrett gjennom bygget.",
  "Which drawing best shows storey heights and stairs?", ["Section", "Site plan", "Elevation", "Floor plan"], "The section cuts vertically through the building."],
 ["Hva betyr en tykk strek på en plantegning?", ["At veggen er snittet", "At den er langt unna", "At den er skjult", "At den er av glass"], "Det som kuttes av snittplanet, tegnes tykt.",
  "What does a thick line mean on a floor plan?", ["That the wall is cut", "That it is far away", "That it is hidden", "That it is glass"], "What the cutting plane cuts is drawn thick."],
 ["Hva må alltid være med på en situasjonsplan?", ["Nordpil", "Dørslag", "Møbler", "Snittlinjer for trapper"], "Nordpila viser hvordan bygget ligger i forhold til sol og himmelretninger.",
  "What must always be on a site plan?", ["A north arrow", "Door swings", "Furniture", "Stair section lines"], "The north arrow shows how the building sits relative to the sun and compass directions."],
 ["Hvordan tegnes deler som ligger over snittplanet, for eksempel en takåpning?", ["Stiplet", "Tykt", "I farger", "De tegnes ikke"], "Stiplede linjer viser skjulte deler eller deler over snittet.",
  "How are parts above the cutting plane, such as a roof opening, drawn?", ["Dashed", "Thick", "In colour", "They are not drawn"], "Dashed lines show hidden parts or parts above the cut."],
 ["Hva skiller en fasade fra et perspektiv?", ["Fasaden har ikke perspektiv – alt er i sann målestokk", "Fasaden er alltid i farger", "Perspektivet har nordpil", "Det er ingen forskjell"], "I fasaden kan du måle direkte på tegningen.",
  "What distinguishes an elevation from a perspective?", ["The elevation has no perspective – everything is to scale", "The elevation is always in colour", "The perspective has a north arrow", "There is no difference"], "In an elevation you can measure directly on the drawing."]]);

U("ARKF", "Lys, rom og bevegelse", "Light, space and movement",
`## Hva handler det om?
Vi opplever arkitektur ved å bevege oss gjennom den. **Lys**, **materialer** og **rekkefølgen** av rom avgjør hvordan et bygg føles.

## Det viktigste
- **Dagslys** endrer seg med tid, årstid og himmelretning. I Norden er **sørvendte** rom lyse og varme, nordlys er jevnt og kjølig – fint i ateliers.
- **Høyt plassert lys** (takvindu, overlys) lyser dypt inn i rommet. Lys langs en vegg (**lysslisse**) gjør veggens materiale synlig.
- **Romsekvens**: rommene oppleves i rekkefølge. **Kompresjon og utvidelse** – en lav, smal entré før et høyt rom – gjør det store rommet enda større (Frank Lloyd Wright brukte dette mye).
- **Terskel**: overgangen mellom ute og inne, offentlig og privat. En god terskel gir tid til å «lande».
- **Materialitet**: tre, betong, stein og glass gir ulik akustikk, temperatur og stemning.
- **Utsyn og orientering**: vinduer som rammer inn landskapet og gjør det lett å finne fram.

### Eksempel
I mange kirker går du fra en lav, mørk inngang inn i et høyt, lyst skip. Kontrasten gjør overgangen til en opplevelse.

> Tegn ikke bare rommene – tegn veien gjennom dem.`,
`## What is it about?
We experience architecture by moving through it. **Light**, **materials** and the **sequence** of spaces decide how a building feels.

## Key points
- **Daylight** changes with time, season and orientation. In the Nordic countries **south-facing** rooms are bright and warm; north light is even and cool – good for studios.
- **High light** (rooflight, clerestory) reaches deep into the room. Light along a wall (a **light slot**) makes the wall's material visible.
- **Spatial sequence**: rooms are experienced in order. **Compression and release** – a low, narrow entrance before a tall room – makes the big room feel even bigger (Frank Lloyd Wright used this a lot).
- **Threshold**: the transition between outside and inside, public and private. A good threshold gives time to "arrive".
- **Materiality**: wood, concrete, stone and glass give different acoustics, temperature and mood.
- **Views and orientation**: windows that frame the landscape and make it easy to find your way.

### Example
In many churches you go from a low, dark entrance into a tall, bright nave. The contrast turns the transition into an experience.

> Do not just draw the rooms – draw the way through them.`,
[["Hvorfor foretrekker mange kunstnere nordlys i atelieret?", ["Det er jevnt og endrer seg lite gjennom dagen", "Det er varmest", "Det er sterkest", "Det gir mest sol"], "Nordlyset gir stabile farger uten skarpe skygger.",
  "Why do many artists prefer north light in the studio?", ["It is even and changes little during the day", "It is warmest", "It is strongest", "It gives the most sun"], "North light gives stable colours without sharp shadows."],
 ["Hva er «kompresjon og utvidelse»?", ["Et lavt, trangt rom før et høyt, åpent rom", "Å presse sammen isolasjon", "Å bygge tilbygg", "Å gjøre alle rom like"], "Kontrasten forsterker opplevelsen av det store rommet.",
  "What is \"compression and release\"?", ["A low, tight space before a tall, open space", "Compressing insulation", "Building an extension", "Making all rooms the same"], "The contrast strengthens the experience of the large room."],
 ["Hva er en terskel i arkitektonisk forstand?", ["En overgang mellom to soner, f.eks. ute og inne", "En list under døra", "Et takvindu", "Et trappetrinn"], "Terskelen kan være et rom, en overbygd inngang eller et skifte i materiale.",
  "What is a threshold in an architectural sense?", ["A transition between two zones, e.g. outside and inside", "A strip under the door", "A rooflight", "A stair step"], "The threshold can be a space, a covered entrance or a change of material."],
 ["Hvordan får du dagslys dypt inn i et rom?", ["Med høyt plasserte vinduer eller overlys", "Med små vinduer nær gulvet", "Med mørke vegger", "Med persienner"], "Lys høyt oppe når lenger inn i rommet.",
  "How do you get daylight deep into a room?", ["With high windows or rooflights", "With small windows near the floor", "With dark walls", "With blinds"], "Light from high up reaches further into the room."],
 ["Hvilken himmelretning gir mest sol i nordiske rom?", ["Sør", "Nord", "Øst", "Ingen forskjell"], "Sola står i sør midt på dagen.",
  "Which orientation gives the most sun in Nordic rooms?", ["South", "North", "East", "No difference"], "The sun is in the south in the middle of the day."],
 ["Hvorfor påvirker materialet hvordan et rom oppleves?", ["Det endrer lyd, temperatur og lysrefleksjon", "Det endrer bare prisen", "Det påvirker ikke opplevelsen", "Bare farge betyr noe"], "Betong gir annen akustikk og stemning enn tre.",
  "Why does the material affect how a room is experienced?", ["It changes sound, temperature and light reflection", "It only changes the price", "It does not affect the experience", "Only colour matters"], "Concrete gives different acoustics and mood than wood."]]);

// ================= BYGG OG REGELVERK =================
U("ARKT", "Bæresystemer", "Structural systems",
`## Hva handler det om?
Alle bygg må føre lastene trygt ned til grunnen. Valget av **bæresystem** former både rommene og arkitekturen.

## Det viktigste
- **Laster**: **egenlast** (bygget selv), **nyttelast** (folk, møbler), **snølast** og **vindlast**.
- **Søyle–bjelke-system**: bjelker bærer dekket, søyler bærer bjelkene. Gir **fri plan** og fleksible rom.
- **Skivesystem**: bærende vegger (skiver) – vanlig i boliger med mange like rom.
- **Ramme**: søyler og bjelker stivt koblet i hjørnene – tar også vind sidelengs.
- **Bue og hvelv** arbeider i **trykk**. **Kabler og membraner** (hengebro, telt) arbeider i **strekk**.
- **Fagverk**: staver i trekanter – lett og stivt over store spenn.
- **Avstiving**: bygget må også tåle krefter sidelengs. Skrå stag, stive kjerner (trapperom, heis) eller skiver gjør det stabilt.
- Høyere bjelke gir mye mer stivhet: dobbel høyde gir åtte ganger så stor stivhet ($I \\propto h^3$).

### Eksempel
En sporthall trenger store spenn uten søyler. Da brukes ofte fagverk eller limtrebuer – ikke søyle–bjelke med tette søyler.

> Følg lasten: fra taket, gjennom bjelker og søyler, ned i fundamentet.`,
`## What is it about?
Every building must carry its loads safely down to the ground. The choice of **structural system** shapes both the spaces and the architecture.

## Key points
- **Loads**: **dead load** (the building itself), **imposed load** (people, furniture), **snow load** and **wind load**.
- **Post-and-beam system**: beams carry the floor, columns carry the beams. Gives a **free plan** and flexible spaces.
- **Wall (slab) system**: load-bearing walls – common in housing with many similar rooms.
- **Frame**: columns and beams rigidly connected at the corners – also takes wind sideways.
- **Arches and vaults** work in **compression**. **Cables and membranes** (suspension bridges, tents) work in **tension**.
- **Truss**: bars in triangles – light and stiff over large spans.
- **Bracing**: the building must also resist sideways forces. Diagonal braces, stiff cores (stairwells, lifts) or shear walls make it stable.
- A deeper beam gives much more stiffness: double the depth gives eight times the stiffness ($I \\propto h^3$).

### Example
A sports hall needs large spans without columns. Trusses or glulam arches are often used – not post-and-beam with closely spaced columns.

> Follow the load: from the roof, through beams and columns, down into the foundation.`,
[["Hvilket bæresystem gir mest fleksibel planløsning?", ["Søyle–bjelke", "Bærende vegger overalt", "Massiv mur", "Tømmer i lafteteknikk"], "Når søyler bærer, kan veggene plasseres fritt.",
  "Which structural system gives the most flexible plan?", ["Post and beam", "Load-bearing walls everywhere", "Solid masonry", "Log construction"], "When columns carry the load, walls can be placed freely."],
 ["Hva arbeider en hengebrokabel i?", ["Strekk", "Trykk", "Bøyning", "Vridning"], "Kabler kan bare ta strekk.",
  "What does a suspension bridge cable work in?", ["Tension", "Compression", "Bending", "Torsion"], "Cables can only take tension."],
 ["Hva skjer med stivheten hvis en bjelke blir dobbelt så høy?", ["Den blir 8 ganger større", "Den dobles", "Den blir 4 ganger større", "Den endres ikke"], "$I \\propto h^3$: $2^3 = 8$.",
  "What happens to the stiffness if a beam becomes twice as deep?", ["It becomes 8 times greater", "It doubles", "It becomes 4 times greater", "It does not change"], "$I \\propto h^3$: $2^3 = 8$."],
 ["Hva er nyttelast?", ["Last fra folk og møbler", "Vekten av bygget selv", "Last fra snø", "Last fra vind"], "Nyttelast er lasten fra bruken av bygget.",
  "What is imposed load?", ["Load from people and furniture", "The weight of the building itself", "Load from snow", "Load from wind"], "Imposed load is the load from using the building."],
 ["Hvorfor trenger et bygg avstiving?", ["For å tåle sidekrefter som vind", "For å se pent ut", "For å holde varmen", "For å slippe inn lys"], "Uten avstiving kan et søyle–bjelke-system falle sammen sidelengs.",
  "Why does a building need bracing?", ["To resist sideways forces like wind", "To look nice", "To keep warm", "To let light in"], "Without bracing a post-and-beam system can collapse sideways."],
 ["Hva arbeider en bue hovedsakelig i?", ["Trykk", "Strekk", "Skjær", "Ingenting"], "Buens form fører lasten ned som trykk.",
  "What does an arch mainly work in?", ["Compression", "Tension", "Shear", "Nothing"], "The arch's shape carries the load down as compression."]],
 () => { const k = R.p([1.5, 2, 3]), f = k ** 3;
   return [T(`En bjelke gjøres ${nf(k)} ganger så høy (samme bredde). Hvor mange ganger stivere blir den? ($I \\propto h^3$)`, `A beam is made ${nf(k)} times as deep (same width). How many times stiffer does it become? ($I \\propto h^3$)`), N(+f.toFixed(3), 0.01),
     T(`$${mf(k)}^3 = ${mf(+f.toFixed(3))}$.`, `$${mf(k)}^3 = ${mf(+f.toFixed(3))}$.`)]; }
);

U("ARKT", "Materialer og klima", "Materials and climate",
`## Hva handler det om?
Materialvalget avgjør styrke, holdbarhet, uttrykk – og **klimagassutslipp**. Byggsektoren står for en stor del av verdens utslipp, mye av det fra produksjon av materialer.

## Det viktigste
- **Tre**: fornybart, lett og sterkt i forhold til vekten. Lagrer karbon. **Limtre** og **massivtre** (CLT) gir store dimensjoner. Må beskyttes mot fukt.
- **Betong**: svært sterk i **trykk**, svak i **strekk** – derfor **armeres** den med stål. Sementproduksjonen gir store CO₂-utslipp. Lavkarbonbetong reduserer dette.
- **Stål**: sterkt i både strekk og trykk, gir slanke konstruksjoner. Må brannbeskyttes, og produksjonen er energikrevende – men stål kan gjenvinnes og gjenbrukes.
- **Tegl og mur**: holdbart og robust, tar trykk. Varmelagrende masse.
- **Glass**: slipper inn lys, men isolerer dårligere enn en vegg.
- **Klimagassregnskap** (LCA): man ser på utslipp gjennom hele livsløpet – materialer, transport, drift, ombygging og riving.
- **Ombruk** av materialer (gammelt tegl, stålbjelker, dører) kutter utslipp mye.

### Eksempel
En søyle i betong og en i limtre kan bære det samme. Limtresøylen gir som regel langt lavere utslipp, og karbonet i treet er lagret så lenge bygget står.

> Riktig materiale på riktig sted: betong i fundamentet, tre i bæresystemet over bakken.`,
`## What is it about?
The choice of material decides strength, durability, expression – and **greenhouse gas emissions**. The building sector accounts for a large share of global emissions, much of it from producing materials.

## Key points
- **Timber**: renewable, light and strong for its weight. Stores carbon. **Glulam** and **mass timber** (CLT) give large sizes. Must be protected from moisture.
- **Concrete**: very strong in **compression**, weak in **tension** – so it is **reinforced** with steel. Cement production causes large CO₂ emissions. Low-carbon concrete reduces this.
- **Steel**: strong in both tension and compression, gives slender structures. Needs fire protection, and production is energy-intensive – but steel can be recycled and reused.
- **Brick and masonry**: durable and robust, takes compression. Heat-storing mass.
- **Glass**: lets light in but insulates worse than a wall.
- **Carbon accounting** (LCA): emissions are counted over the whole life cycle – materials, transport, operation, conversion and demolition.
- **Reuse** of materials (old bricks, steel beams, doors) cuts emissions a lot.

### Example
A concrete column and a glulam column can carry the same load. The glulam column usually gives far lower emissions, and the carbon in the wood is stored for as long as the building stands.

> The right material in the right place: concrete in the foundation, timber in the structure above ground.`,
[["Hvorfor armeres betong?", ["Betong tåler lite strekk", "For at den skal tørke raskere", "For å gjøre den lettere", "For å gi farge"], "Stålet tar strekket, betongen tar trykket.",
  "Why is concrete reinforced?", ["Concrete takes little tension", "So it dries faster", "To make it lighter", "To give it colour"], "The steel takes the tension, the concrete the compression."],
 ["Hvilket materiale lagrer karbon?", ["Tre", "Stål", "Glass", "Aluminium"], "Treet har tatt opp CO₂ mens det vokste.",
  "Which material stores carbon?", ["Timber", "Steel", "Glass", "Aluminium"], "The tree took up CO₂ as it grew."],
 ["Hva står for mye av utslippene fra betong?", ["Sementproduksjonen", "Vannet", "Sanden", "Transporten alene"], "Brenning av kalkstein til sement frigjør mye CO₂.",
  "What accounts for much of concrete's emissions?", ["Cement production", "The water", "The sand", "Transport alone"], "Burning limestone into cement releases a lot of CO₂."],
 ["Hva betyr LCA?", ["Livsløpsvurdering – utslipp gjennom hele livsløpet", "Lav-karbon-arkitektur", "Lastberegning", "Et byggeforskrift"], "Life Cycle Assessment.",
  "What does LCA mean?", ["Life cycle assessment – emissions over the whole life", "Low-carbon architecture", "Load calculation", "A building regulation"], "Life Cycle Assessment."],
 ["Hva er en svakhet ved stål i bygg?", ["Det må beskyttes mot brann", "Det tåler ikke strekk", "Det kan ikke gjenvinnes", "Det er svakt i trykk"], "Stål mister styrke ved høye temperaturer.",
  "What is a weakness of steel in buildings?", ["It must be protected from fire", "It cannot take tension", "It cannot be recycled", "It is weak in compression"], "Steel loses strength at high temperatures."],
 ["Hva er ombruk?", ["Å bruke byggematerialer på nytt uten å smelte eller knuse dem", "Å rive og deponere", "Å male om", "Å bygge høyere"], "Ombruk sparer utslippene fra å produsere nytt.",
  "What is reuse?", ["Using building materials again without melting or crushing them", "Demolishing and landfilling", "Repainting", "Building taller"], "Reuse saves the emissions of producing new materials."]]);

U("ARKT", "Bygningsfysikk og energi", "Building physics and energy",
`## Hva handler det om?
Bygget skal holde varmen inne om vinteren, fukt ute og gi godt inneklima – med lite energi.

## Det viktigste
- **U-verdi** (W/m²K) sier hvor mye varme som går gjennom 1 m² av en konstruksjon per grad temperaturforskjell. **Lav U-verdi = god isolasjon**.
- **Varmemotstand** i et lag: $R = \\frac{d}{\\lambda}$ (tykkelse delt på varmeledningsevne). For flere lag: $U = \\frac{1}{\\sum R}$.
- **Varmetap**: $Q = U \\cdot A \\cdot \\Delta T$ (watt).
- **Kuldebroer**: steder der varmen lekker lettere ut, for eksempel ved bjelker gjennom isolasjonen eller rundt vinduer.
- **Fukt**: varm inneluft inneholder vanndamp. **Dampsperren** ligger på den **varme siden** av isolasjonen, så fukten ikke kondenserer inne i veggen.
- **Passivhus** har svært god isolasjon, tetthet og varmegjenvinning, og trenger lite oppvarming.
- I TEK17 bruker tiltaksmodellen blant annet U-verdi på høyst 0,18 W/m²K for yttervegg og 0,80 for vinduer.

### Eksempel
En vegg på 20 m² med U = 0,18 W/m²K og 30 grader forskjell inne og ute: $Q = 0{,}18 \\cdot 20 \\cdot 30 = 108$ W.

> Dampsperre på den varme siden – alltid.`,
`## What is it about?
The building must keep heat in during winter, keep moisture out and give a good indoor climate – using little energy.

## Key points
- The **U-value** (W/m²K) says how much heat passes through 1 m² of a construction per degree of temperature difference. **Low U-value = good insulation**.
- **Thermal resistance** of a layer: $R = \\frac{d}{\\lambda}$ (thickness divided by thermal conductivity). For several layers: $U = \\frac{1}{\\sum R}$.
- **Heat loss**: $Q = U \\cdot A \\cdot \\Delta T$ (watts).
- **Thermal bridges**: places where heat leaks out more easily, for example at beams through the insulation or around windows.
- **Moisture**: warm indoor air contains water vapour. The **vapour barrier** sits on the **warm side** of the insulation so the moisture does not condense inside the wall.
- **Passive houses** have very good insulation, airtightness and heat recovery, and need little heating.
- In the Norwegian regulations (TEK17), the measures model uses among others a U-value of at most 0.18 W/m²K for external walls and 0.80 for windows.

### Example
A 20 m² wall with U = 0.18 W/m²K and a 30-degree difference between inside and outside: $Q = 0.18 \\cdot 20 \\cdot 30 = 108$ W.

> Vapour barrier on the warm side – always.`,
[["Hva betyr lav U-verdi?", ["God isolasjon", "Dårlig isolasjon", "Høy fukt", "Mye lys"], "Lite varme slipper gjennom.",
  "What does a low U-value mean?", ["Good insulation", "Poor insulation", "High moisture", "Lots of light"], "Little heat gets through."],
 ["Hvor skal dampsperren ligge?", ["På den varme siden av isolasjonen", "På den kalde siden", "Midt i isolasjonen", "Utenpå kledningen"], "Da når ikke den fuktige inneluften den kalde delen av veggen.",
  "Where should the vapour barrier be?", ["On the warm side of the insulation", "On the cold side", "In the middle of the insulation", "Outside the cladding"], "Then the moist indoor air does not reach the cold part of the wall."],
 ["Hva er en kuldebro?", ["Et sted der varme lekker lettere ut", "En bro over is", "Et kjølerom", "En isolert dør"], "For eksempel bjelker eller betong som går gjennom isolasjonen.",
  "What is a thermal bridge?", ["A place where heat leaks out more easily", "A bridge over ice", "A cold room", "An insulated door"], "For example beams or concrete passing through the insulation."],
 ["Hvordan regner du varmemotstanden i ett lag?", ["$R = d/\\lambda$", "$R = \\lambda \\cdot d$", "$R = U \\cdot A$", "$R = 1/d$"], "Tykt lag og lav varmeledningsevne gir høy motstand.",
  "How do you calculate the thermal resistance of one layer?", ["$R = d/\\lambda$", "$R = \\lambda \\cdot d$", "$R = U \\cdot A$", "$R = 1/d$"], "A thick layer with low conductivity gives high resistance."],
 ["Hva kjennetegner et passivhus?", ["Svært god isolasjon, tetthet og varmegjenvinning", "Ingen vinduer", "Bare solceller", "Det står i skyggen"], "Behovet for oppvarming blir svært lite.",
  "What characterises a passive house?", ["Very good insulation, airtightness and heat recovery", "No windows", "Only solar panels", "It stands in the shade"], "The heating demand becomes very small."],
 ["Hvorfor har vinduer høyere U-verdi enn vegger?", ["Glass isolerer dårligere enn en isolert vegg", "Vinduer er større", "Vinduer har dampsperre", "Det har de ikke"], "Selv gode vinduer slipper ut mer varme per m² enn en godt isolert vegg.",
  "Why do windows have a higher U-value than walls?", ["Glass insulates worse than an insulated wall", "Windows are bigger", "Windows have a vapour barrier", "They do not"], "Even good windows let out more heat per m² than a well-insulated wall."]],
 () => { const U0 = R.p([0.15, 0.18, 0.22, 0.8, 1.2]), A = R.i(8, 60), dT = R.p([20, 25, 30, 35, 40]), Q = +(U0 * A * dT).toFixed(1);
   return [T(`En flate på ${A} m² har U-verdi ${nf(U0)} W/m²K. Det er ${dT} grader forskjell inne og ute. Hvor stort er varmetapet?`, `A ${A} m² surface has a U-value of ${nf(U0)} W/m²K. There is a ${dT}-degree difference between inside and outside. How large is the heat loss?`), N(Q, Math.max(0.2, Q * 0.01), "W"),
     T(`$Q = U \\cdot A \\cdot \\Delta T = ${mf(U0)} \\cdot ${A} \\cdot ${dT} = ${mf(Q)}$ W.`, `$Q = U \\cdot A \\cdot \\Delta T = ${mf(U0)} \\cdot ${A} \\cdot ${dT} = ${mf(Q)}$ W.`)]; },
 () => { const d = R.p([0.1, 0.15, 0.2, 0.25, 0.3]), lam = R.p([0.033, 0.035, 0.037, 0.04]), Rv = d / lam, U0 = 1 / Rv;
   return [T(`Et isolasjonslag er ${nf(d * 1000)} mm tykt og har $\\lambda = ${mf(lam, 3)}$ W/mK. Hva er U-verdien hvis vi ser bort fra de andre lagene? Svar med to desimaler.`, `An insulation layer is ${nf(d * 1000)} mm thick with $\\lambda = ${mf(lam, 3)}$ W/mK. What is the U-value if we ignore the other layers? Answer with two decimals.`), N(+U0.toFixed(2), 0.01, "W/m²K"),
     T(`$R = \\frac{${mf(d)}}{${mf(lam, 3)}} \\approx ${mf(+Rv.toFixed(2))}$, så $U = \\frac{1}{R} \\approx ${mf(+U0.toFixed(2))}$ W/m²K.`, `$R = \\frac{${mf(d)}}{${mf(lam, 3)}} \\approx ${mf(+Rv.toFixed(2))}$, so $U = \\frac{1}{R} \\approx ${mf(+U0.toFixed(2))}$ W/m²K.`)]; }
);

U("ARKT", "Universell utforming og regelverk", "Universal design and regulations",
`## Hva handler det om?
Bygg skal kunne brukes av alle, og de må følge **plan- og bygningsloven** (pbl) og **byggteknisk forskrift** (TEK17).

## Det viktigste
- **Universell utforming**: bygget skal kunne brukes av flest mulig på en likestilt måte – uten spesialløsninger. Det gjelder rullestolbrukere, synshemmede, eldre og barn.
- Et **snuareal** med diameter **1,5 m** gir plass til å snu en rullestol.
- **Ramper** skal i utgangspunktet ikke være brattere enn **1:15** – 1 m stigning over 15 m lengde.
- **Dører** i tilgjengelige bygg skal ha minst **0,86 m fri bredde**.
- **Kontraster** i farge og lys gjør det lettere for synshemmede å finne fram, og **ledelinjer** kan følges med stokk.
- Plansystemet: **kommuneplanen** sier hva arealene skal brukes til, **reguleringsplanen** gir detaljene (høyder, utnyttelse, formål).
- **Areal**: **BRA** er bruksareal (innvendig areal), **BYA** er bebygd areal (fotavtrykket). **%-BYA** = BYA / tomteareal · 100 %.

### Eksempel
En rampe skal opp 0,6 m. Med stigning 1:15 må den være $0{,}6 \\cdot 15 = 9$ m lang – pluss hvileplan underveis.

> Universell utforming er god arkitektur for alle, ikke en tilpasning for noen få.`,
`## What is it about?
Buildings must be usable by everyone, and they must comply with the **Planning and Building Act** and the **building regulations** (TEK17) in Norway.

## Key points
- **Universal design**: the building should be usable by as many people as possible on equal terms – without special solutions. This includes wheelchair users, people with visual impairments, the elderly and children.
- A **turning space** with a diameter of **1.5 m** gives room to turn a wheelchair.
- **Ramps** should as a rule not be steeper than **1:15** – a 1 m rise over a 15 m length.
- **Doors** in accessible buildings must have at least **0.86 m clear width**.
- **Contrasts** in colour and light make it easier for people with visual impairments to find their way, and **guide lines** can be followed with a cane.
- The planning system: the **municipal master plan** says what land is used for, the **zoning plan** gives the details (heights, plot ratio, purpose).
- **Areas**: **BRA** is usable floor area (internal area), **BYA** is built-up area (the footprint). **%-BYA** = BYA / plot area · 100 %.

### Example
A ramp must rise 0.6 m. With a gradient of 1:15 it must be $0.6 \\cdot 15 = 9$ m long – plus resting landings on the way.

> Universal design is good architecture for everyone, not an adaptation for a few.`,
[["Hvor stort snuareal trenger en rullestol?", ["1,5 m i diameter", "0,9 m", "3 m", "1 m"], "1,5 m er vanlig krav for snuareal.",
  "How large a turning space does a wheelchair need?", ["1.5 m in diameter", "0.9 m", "3 m", "1 m"], "1.5 m is the usual requirement for a turning space."],
 ["Hva betyr stigning 1:15 for en rampe?", ["1 m høyde per 15 m lengde", "15 m høyde per 1 m", "15 graders helning", "1,5 % stigning"], "Forholdet mellom høyde og lengde.",
  "What does a 1:15 gradient mean for a ramp?", ["1 m rise per 15 m length", "15 m rise per 1 m", "A 15-degree slope", "A 1.5 % gradient"], "The ratio between rise and length."],
 ["Hva er forskjellen på BRA og BYA?", ["BRA er bruksareal innvendig, BYA er fotavtrykket på tomta", "Det er det samme", "BYA er bare for boliger", "BRA er tomtearealet"], "BYA måles på bakken, BRA summeres for alle etasjer.",
  "What is the difference between BRA and BYA?", ["BRA is internal usable area, BYA is the footprint on the plot", "They are the same", "BYA is only for homes", "BRA is the plot area"], "BYA is measured on the ground, BRA is summed for all storeys."],
 ["Hva betyr universell utforming?", ["At bygget kan brukes av flest mulig på en likestilt måte", "At alle bygg ser like ut", "At bygget er billig", "At det finnes en egen inngang for rullestol"], "Målet er like løsninger for alle, ikke særløsninger.",
  "What does universal design mean?", ["That the building can be used by as many as possible on equal terms", "That all buildings look the same", "That the building is cheap", "That there is a separate wheelchair entrance"], "The goal is the same solutions for everyone, not special ones."],
 ["Hvilken plan gir detaljerte regler for høyder og utnyttelse på en tomt?", ["Reguleringsplanen", "Kommuneplanen", "Nasjonalbudsjettet", "Byggesøknaden"], "Reguleringsplanen er den detaljerte planen for et område.",
  "Which plan gives detailed rules for heights and plot ratio on a site?", ["The zoning plan", "The municipal master plan", "The national budget", "The building application"], "The zoning plan is the detailed plan for an area."],
 ["Hvordan hjelper kontraster synshemmede?", ["De gjør det lettere å se kanter, dører og trinn", "De gjør rommet varmere", "De demper lyden", "De gir mer dagslys"], "Kontrast mellom gulv, vegg og dør gjør rommet lettere å lese.",
  "How do contrasts help people with visual impairments?", ["They make edges, doors and steps easier to see", "They make the room warmer", "They dampen sound", "They give more daylight"], "Contrast between floor, wall and door makes the room easier to read."]],
 () => { const h = R.p([0.3, 0.45, 0.5, 0.6, 0.75, 0.9]), k = R.p([15, 20]), L = +(h * k).toFixed(2);
   return [T(`En rampe skal opp ${nf(h)} m med stigning 1:${k}. Hvor lang må rampen være (horisontalt)?`, `A ramp must rise ${nf(h)} m with a gradient of 1:${k}. How long must the ramp be (horizontally)?`), N(L, 0.01, "m"),
     T(`$${mf(h)} \\cdot ${k} = ${mf(L)}$ m.`, `$${mf(h)} \\cdot ${k} = ${mf(L)}$ m.`)]; },
 () => { const tomt = 50 * R.i(10, 40), bya = 10 * R.i(Math.round(tomt * 0.1 / 10), Math.round(tomt * 0.4 / 10)), p = +(bya / tomt * 100).toFixed(1);
   return [T(`En tomt er ${tomt} m², og bygget har et fotavtrykk (BYA) på ${bya} m². Hva er %-BYA?`, `A plot is ${tomt} m², and the building has a footprint (BYA) of ${bya} m². What is the %-BYA?`), N(p, 0.1, "%"),
     T(`$\\frac{${bya}}{${tomt}} \\cdot 100\\,\\% = ${mf(p)}\\,\\%$.`, `$\\frac{${bya}}{${tomt}} \\cdot 100\\,\\% = ${mf(p)}\\,\\%$.`)]; },
 () => { const tomt = 100 * R.i(5, 20), pct = R.p([20, 25, 30, 35, 40]), max = tomt * pct / 100;
   return [T(`Reguleringsplanen tillater ${pct} %-BYA på en tomt på ${tomt} m². Hvor stort fotavtrykk kan bygget ha?`, `The zoning plan allows ${pct} %-BYA on a ${tomt} m² plot. How large a footprint can the building have?`), N(max, 0.5, "m²"),
     T(`$${tomt} \\cdot ${mf(pct / 100)} = ${mf(max)}$ m².`, `$${tomt} \\cdot ${mf(pct / 100)} = ${mf(max)}$ m².`)]; }
);
})();
