// ============================================================
//  add_gs_d.js – UNGDOMSSKOLEN: Naturfag 8.–10. trinn (LK20).
// ============================================================
NEWCOURSE({ code: "GUNAT", study: "ungdom", group: "Ungdomsskole", nb: "Naturfag 8.–10.", en: "Science years 8–10", s: ["Na", "Sc"], eqText: { nb: "8.–10. trinn (LK20)", en: "Years 8–10 (Norwegian curriculum)" }, units: [] });
(() => {
const U = (nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT("GUNAT", nb, en); THEORY("GUNAT", u, { nb: thNb, en: thEn }); BIQ("GUNAT", u, qs); if(gens.length) GEN("GUNAT", u, ...gens); return u; };
const N = (n, tol = 0, u = "") => ({ n, tol, u });

U("Celler og kroppen", "Cells and the body",
`## Hva handler det om?
Alle levende organismer er bygget av **celler**. I kroppen samarbeider milliarder av celler i vev, organer og organsystemer.

## Det viktigste
- Dyreceller har **cellemembran**, **cellekjerne** (med DNA) og **mitokondrier** (der energien frigjøres ved **celleånding**).
- Planteceller har i tillegg **cellevegg**, **kloroplaster** (fotosyntese) og en stor **vakuole**.
- **Nervesystemet** sender raske elektriske signaler. **Hormonsystemet** sender langsommere signaler med blodet (for eksempel insulin og adrenalin).
- **Immunforsvaret** bekjemper bakterier og virus. **Vaksiner** trener immunforsvaret til å kjenne igjen et smittestoff.
- **Antibiotika** virker mot bakterier, men ikke mot virus.

### Eksempel
Når du blir skremt, skiller binyrene ut adrenalin. Hjertet slår fortere, og musklene får mer blod – kroppen gjør seg klar til å handle.

> Celleånding: sukker + oksygen → karbondioksid + vann + energi.`,
`## What is it about?
All living organisms are built of **cells**. In the body, billions of cells work together in tissues, organs and organ systems.

## Key points
- Animal cells have a **cell membrane**, a **nucleus** (with DNA) and **mitochondria** (where energy is released by **cellular respiration**).
- Plant cells also have a **cell wall**, **chloroplasts** (photosynthesis) and a large **vacuole**.
- The **nervous system** sends fast electrical signals. The **hormone system** sends slower signals through the blood (for example insulin and adrenaline).
- The **immune system** fights bacteria and viruses. **Vaccines** train the immune system to recognise a pathogen.
- **Antibiotics** work against bacteria, but not against viruses.

### Example
When you get a fright, the adrenal glands release adrenaline. The heart beats faster and the muscles get more blood – the body gets ready to act.

> Cellular respiration: sugar + oxygen → carbon dioxide + water + energy.`,
[["Hvor finnes DNA i en dyrecelle?", ["I cellekjernen", "I celleveggen", "I kloroplastene", "I cellemembranen"], "DNA ligger i cellekjernen (og litt i mitokondriene).",
  "Where is DNA found in an animal cell?", ["In the nucleus", "In the cell wall", "In the chloroplasts", "In the cell membrane"], "DNA is in the nucleus (and a little in the mitochondria)."],
 ["Hva har planteceller som dyreceller mangler?", ["Cellevegg og kloroplaster", "Cellekjerne", "Mitokondrier", "Cellemembran"], "Celleveggen gir stivhet, kloroplastene driver fotosyntese.",
  "What do plant cells have that animal cells lack?", ["A cell wall and chloroplasts", "A nucleus", "Mitochondria", "A cell membrane"], "The cell wall gives stiffness, the chloroplasts carry out photosynthesis."],
 ["Hvorfor hjelper ikke antibiotika mot forkjølelse?", ["Forkjølelse skyldes virus", "Forkjølelse skyldes bakterier", "Antibiotika er for svakt", "Forkjølelse går aldri over"], "Antibiotika angriper bakterier, ikke virus.",
  "Why do antibiotics not help against a cold?", ["Colds are caused by viruses", "Colds are caused by bacteria", "Antibiotics are too weak", "Colds never go away"], "Antibiotics attack bacteria, not viruses."],
 ["Hva skjer i mitokondriene?", ["Celleånding som frigjør energi", "Fotosyntese", "Kopiering av DNA", "Produksjon av blod"], "Sukker og oksygen gir energi, karbondioksid og vann.",
  "What happens in the mitochondria?", ["Cellular respiration that releases energy", "Photosynthesis", "Copying of DNA", "Production of blood"], "Sugar and oxygen give energy, carbon dioxide and water."],
 ["Hvordan virker en vaksine?", ["Den trener immunforsvaret til å kjenne igjen smittestoffet", "Den dreper alle bakterier i kroppen", "Den erstatter blodet", "Den virker bare mot vondt i hodet"], "Kroppen lager antistoffer og hukommelsesceller uten å bli syk.",
  "How does a vaccine work?", ["It trains the immune system to recognise the pathogen", "It kills all bacteria in the body", "It replaces the blood", "It only works against headaches"], "The body makes antibodies and memory cells without getting ill."],
 ["Hvilket system sender de raskeste signalene i kroppen?", ["Nervesystemet", "Hormonsystemet", "Fordøyelsessystemet", "Skjelettet"], "Nervesignaler går på brøkdeler av et sekund.",
  "Which system sends the fastest signals in the body?", ["The nervous system", "The hormone system", "The digestive system", "The skeleton"], "Nerve signals travel in fractions of a second."]]);

U("Kjemi: atomer og reaksjoner", "Chemistry: atoms and reactions",
`## Hva handler det om?
Alt stoff er bygget av **atomer**. I en **kjemisk reaksjon** bytter atomene partner, og nye stoffer dannes.

## Det viktigste
- Atomet har en **kjerne** med **protoner** (+) og **nøytroner**, og **elektroner** (−) rundt.
- **Atomnummeret** er antall protoner og bestemmer hvilket grunnstoff det er.
- **Periodesystemet** ordner grunnstoffene. Stoffer i samme gruppe ligner hverandre.
- Ved en kjemisk reaksjon **forsvinner ingen atomer** – de blir bare satt sammen på nye måter.
- **Forbrenning**: brennstoff + oksygen → karbondioksid + vann + varme.
- **pH**: under 7 er surt, 7 er nøytralt, over 7 er basisk. Syre + base kan **nøytralisere** hverandre.

### Eksempel
Når et stearinlys brenner, reagerer voksen med oksygen og blir til CO₂ og vanndamp. Atomene finnes fortsatt – i lufta.

> Kjemiske tegn på en reaksjon: gass, farge, lys, varme eller et nytt fast stoff.`,
`## What is it about?
All matter is built of **atoms**. In a **chemical reaction** the atoms swap partners and new substances form.

## Key points
- The atom has a **nucleus** with **protons** (+) and **neutrons**, and **electrons** (−) around it.
- The **atomic number** is the number of protons and decides which element it is.
- The **periodic table** orders the elements. Elements in the same group are alike.
- In a chemical reaction **no atoms disappear** – they are just put together in new ways.
- **Combustion**: fuel + oxygen → carbon dioxide + water + heat.
- **pH**: below 7 is acidic, 7 is neutral, above 7 is basic. Acid + base can **neutralise** each other.

### Example
When a candle burns, the wax reacts with oxygen and becomes CO₂ and water vapour. The atoms still exist – in the air.

> Signs of a chemical reaction: gas, colour change, light, heat or a new solid.`,
[["Hva bestemmer hvilket grunnstoff et atom er?", ["Antall protoner", "Antall nøytroner", "Antall elektroner i ytterste skall", "Vekten"], "Atomnummeret = antall protoner.",
  "What decides which element an atom is?", ["The number of protons", "The number of neutrons", "The number of outer electrons", "Its weight"], "Atomic number = number of protons."],
 ["Hvilken pH har en sur løsning?", ["Under 7", "Nøyaktig 7", "Over 7", "Over 14"], "Sure løsninger har pH under 7.",
  "What pH does an acidic solution have?", ["Below 7", "Exactly 7", "Above 7", "Above 14"], "Acidic solutions have a pH below 7."],
 ["Hva dannes når bensin brenner fullstendig?", ["Karbondioksid og vann", "Bare oksygen", "Salt", "Hydrogen og nitrogen"], "Forbrenning av hydrokarboner gir CO₂ og H₂O.",
  "What forms when petrol burns completely?", ["Carbon dioxide and water", "Only oxygen", "Salt", "Hydrogen and nitrogen"], "Burning hydrocarbons gives CO₂ and H₂O."],
 ["Hva skjer med atomene i en kjemisk reaksjon?", ["De settes sammen på nye måter", "De forsvinner", "Det dannes nye atomer", "De blir til energi"], "Antall atomer av hvert slag er det samme før og etter.",
  "What happens to the atoms in a chemical reaction?", ["They are put together in new ways", "They disappear", "New atoms are created", "They turn into energy"], "The number of atoms of each kind is the same before and after."],
 ["Hvilken ladning har et elektron?", ["Negativ", "Positiv", "Ingen", "Det varierer"], "Elektroner er negative, protoner positive.",
  "What charge does an electron have?", ["Negative", "Positive", "None", "It varies"], "Electrons are negative, protons positive."],
 ["Hva er et tegn på at en kjemisk reaksjon har skjedd?", ["Det dannes en gass", "Isen smelter", "Sukkeret løses opp", "Vannet koker"], "Smelting, koking og oppløsning er fysiske endringer – stoffet er det samme.",
  "What is a sign that a chemical reaction has happened?", ["A gas forms", "Ice melts", "Sugar dissolves", "Water boils"], "Melting, boiling and dissolving are physical changes – the substance stays the same."]]);

U("Krefter, fart og energi", "Forces, speed and energy",
`## Hva handler det om?
Krefter får ting til å starte, stoppe og svinge. **Energi** kan ikke lages eller forsvinne – bare gå over til andre former.

## Det viktigste
- **Fart**: $v = \\frac{s}{t}$ (strekning delt på tid). 1 m/s = 3,6 km/h.
- **Kraft** måles i newton (N). **Tyngdekraften** på deg er $G = m \\cdot g$, der $g \\approx 9{,}8$ N/kg.
- **Friksjon** virker mot bevegelsen og gjør bevegelsesenergi om til varme.
- **Arbeid**: $W = F \\cdot s$ (kraft ganger strekning), målt i joule (J).
- **Energiformer**: bevegelsesenergi, stillingsenergi, varme, kjemisk energi, elektrisk energi.
- **Effekt** er energi per sekund: $P = \\frac{E}{t}$, målt i watt (W).
- **Massetetthet**: $\\rho = \\frac{m}{V}$. Stoffer med lavere tetthet enn vann flyter.

### Eksempel
Du sykler 6 km på 20 minutter (1200 s). $v = \\frac{6000}{1200} = 5$ m/s, altså 18 km/h.

> Energien er bevart: når en ball faller, blir stillingsenergi til bevegelsesenergi.`,
`## What is it about?
Forces make things start, stop and turn. **Energy** cannot be created or destroyed – only change into other forms.

## Key points
- **Speed**: $v = \\frac{s}{t}$ (distance divided by time). 1 m/s = 3.6 km/h.
- **Force** is measured in newtons (N). The **gravitational force** on you is $G = m \\cdot g$, where $g \\approx 9.8$ N/kg.
- **Friction** acts against the motion and turns kinetic energy into heat.
- **Work**: $W = F \\cdot s$ (force times distance), measured in joules (J).
- **Forms of energy**: kinetic, potential, heat, chemical, electrical.
- **Power** is energy per second: $P = \\frac{E}{t}$, measured in watts (W).
- **Density**: $\\rho = \\frac{m}{V}$. Substances less dense than water float.

### Example
You cycle 6 km in 20 minutes (1200 s). $v = \\frac{6000}{1200} = 5$ m/s, that is 18 km/h.

> Energy is conserved: when a ball falls, potential energy becomes kinetic energy.`,
[["Hva måles kraft i?", ["Newton", "Joule", "Watt", "Kilogram"], "Kraft måles i newton (N).",
  "What is force measured in?", ["Newtons", "Joules", "Watts", "Kilograms"], "Force is measured in newtons (N)."],
 ["Hva skjer med energien når du bremser på sykkelen?", ["Den blir til varme i bremsene", "Den forsvinner", "Den blir til ny masse", "Den lagres i dekkene som lys"], "Friksjon gjør bevegelsesenergi om til varme.",
  "What happens to the energy when you brake on a bike?", ["It becomes heat in the brakes", "It disappears", "It turns into new mass", "It is stored in the tyres as light"], "Friction turns kinetic energy into heat."],
 ["Hvorfor flyter en isbit i vann?", ["Is har lavere massetetthet enn vann", "Is er lettere enn all væske", "Vann skyver alt opp", "Isen er hul"], "Is har tetthet rundt 0,92 g/cm³, vann 1,0.",
  "Why does an ice cube float in water?", ["Ice is less dense than water", "Ice is lighter than any liquid", "Water pushes everything up", "The ice is hollow"], "Ice has a density of about 0.92 g/cm³, water 1.0."],
 ["Hva er effekt?", ["Energi per sekund", "Kraft ganger tid", "Masse ganger fart", "Strekning delt på tid"], "$P = \\frac{E}{t}$, målt i watt.",
  "What is power?", ["Energy per second", "Force times time", "Mass times speed", "Distance divided by time"], "$P = \\frac{E}{t}$, measured in watts."],
 ["En ball slippes fra et tak. Hvilken energiomforming skjer mens den faller?", ["Stillingsenergi blir til bevegelsesenergi", "Bevegelsesenergi blir til stillingsenergi", "Varme blir til lys", "Ingen"], "Høyden minker og farten øker.",
  "A ball is dropped from a roof. Which energy change happens while it falls?", ["Potential energy becomes kinetic energy", "Kinetic energy becomes potential energy", "Heat becomes light", "None"], "The height decreases and the speed increases."],
 ["Hvor mange km/h er 10 m/s?", ["36 km/h", "10 km/h", "3,6 km/h", "100 km/h"], "Gang med 3,6: $10 \\cdot 3{,}6 = 36$.",
  "How many km/h is 10 m/s?", ["36 km/h", "10 km/h", "3.6 km/h", "100 km/h"], "Multiply by 3.6: $10 \\cdot 3.6 = 36$."]],
 () => { const s = 100 * R.i(5, 120), t = 10 * R.i(6, 90), v = s / t;
   return [T(`Du løper ${s} m på ${t} s. Hva er gjennomsnittsfarten i m/s?`, `You run ${s} m in ${t} s. What is the average speed in m/s?`), N(+v.toFixed(2), 0.02, "m/s"), T(`$v = \\frac{s}{t} = \\frac{${s}}{${t}} \\approx ${mf(+v.toFixed(2))}$ m/s.`, `$v = \\frac{s}{t} = \\frac{${s}}{${t}} \\approx ${mf(+v.toFixed(2))}$ m/s.`)]; },
 () => { const m = R.i(20, 90), G = +(m * 9.8).toFixed(1);
   return [T(`Hva er tyngdekraften på en person med masse ${m} kg? Bruk $g = 9{,}8$ N/kg.`, `What is the gravitational force on a person with mass ${m} kg? Use $g = 9.8$ N/kg.`), N(G, 0.5, "N"), T(`$G = m \\cdot g = ${m} \\cdot 9{,}8 = ${mf(G)}$ N.`, `$G = m \\cdot g = ${m} \\cdot 9.8 = ${mf(G)}$ N.`)]; },
 () => { const [nb, en, rho] = R.p([["aluminium", "aluminium", 2.7], ["jern", "iron", 7.9], ["kobber", "copper", 8.9], ["tre (furu)", "wood (pine)", 0.5]]), V = R.i(10, 200), m = +(rho * V).toFixed(1);
   return [T(`En kloss av ${nb} har volum ${V} cm³ og masse ${nf(m)} g. Hva er massetettheten i g/cm³?`, `A block of ${en} has a volume of ${V} cm³ and a mass of ${nf(m)} g. What is its density in g/cm³?`), N(rho, 0.05, "g/cm³"), T(`$\\rho = \\frac{m}{V} = \\frac{${mf(m)}}{${V}} = ${mf(rho)}$ g/cm³.`, `$\\rho = \\frac{m}{V} = \\frac{${mf(m)}}{${V}} = ${mf(rho)}$ g/cm³.`)]; },
 () => { const P = R.p([60, 100, 500, 1000, 2000]), t = R.i(2, 30) * 60, E = P * t;
   return [T(`Et apparat med effekt ${P} W står på i ${t / 60} minutter. Hvor mye energi bruker det i joule?`, `A device with a power of ${P} W is on for ${t / 60} minutes. How much energy does it use in joules?`), N(E, 0, "J"), T(`$E = P \\cdot t = ${P} \\cdot ${t} = ${E}$ J.`, `$E = P \\cdot t = ${P} \\cdot ${t} = ${E}$ J.`)]; }
);

U("Elektrisitet", "Electricity",
`## Hva handler det om?
Elektrisk strøm er ladninger (elektroner) som beveger seg. Den driver alt fra mobilen til elbilen.

## Det viktigste
- **Spenning** $U$ (volt, V) er «trykket» som driver strømmen.
- **Strøm** $I$ (ampere, A) er hvor mye ladning som går gjennom per sekund.
- **Resistans** $R$ (ohm, Ω) er hvor vanskelig det er for strømmen å komme fram.
- **Ohms lov**: $U = R \\cdot I$.
- **Seriekobling**: én vei for strømmen. Ryker én pære, slukner alle. **Parallellkobling**: flere veier – som i huset ditt.
- **Elektrisk effekt**: $P = U \\cdot I$.
- Strøm lages i **generatorer** som drives av vann, vind, damp eller sollys (solceller).

### Eksempel
En vannkoker på 230 V trekker 8 A. Effekt: $P = 230 \\cdot 8 = 1840$ W.

> Mer resistans gir mindre strøm ved samme spenning.`,
`## What is it about?
Electric current is charges (electrons) moving. It powers everything from your phone to an electric car.

## Key points
- **Voltage** $U$ (volts, V) is the "pressure" that drives the current.
- **Current** $I$ (amperes, A) is how much charge passes per second.
- **Resistance** $R$ (ohms, Ω) is how hard it is for the current to get through.
- **Ohm's law**: $U = R \\cdot I$.
- **Series circuit**: one path for the current. If one bulb blows, all go out. **Parallel circuit**: several paths – like in your house.
- **Electrical power**: $P = U \\cdot I$.
- Electricity is made in **generators** driven by water, wind, steam or sunlight (solar cells).

### Example
A kettle on 230 V draws 8 A. Power: $P = 230 \\cdot 8 = 1840$ W.

> More resistance gives less current at the same voltage.`,
[["Hva måles strøm i?", ["Ampere", "Volt", "Ohm", "Watt"], "Strøm $I$ måles i ampere (A).",
  "What is current measured in?", ["Amperes", "Volts", "Ohms", "Watts"], "Current $I$ is measured in amperes (A)."],
 ["Hvorfor er lysene i et hus parallellkoblet?", ["Så de kan slås av og på hver for seg", "Så de lyser svakere", "Fordi det er billigere", "Så strømmen går tregere"], "I parallell har hver lampe sin egen vei.",
  "Why are the lights in a house connected in parallel?", ["So they can be switched on and off separately", "So they shine weaker", "Because it is cheaper", "So the current goes slower"], "In parallel each lamp has its own path."],
 ["Hva sier Ohms lov?", ["$U = R \\cdot I$", "$P = m \\cdot g$", "$v = s/t$", "$E = m \\cdot c$"], "Spenning = resistans · strøm.",
  "What does Ohm's law say?", ["$U = R \\cdot I$", "$P = m \\cdot g$", "$v = s/t$", "$E = m \\cdot c$"], "Voltage = resistance · current."],
 ["Spenningen er den samme, men resistansen dobles. Hva skjer med strømmen?", ["Den halveres", "Den dobles", "Den blir lik", "Den blir null"], "$I = \\frac{U}{R}$: dobbel $R$ gir halv $I$.",
  "The voltage is the same, but the resistance doubles. What happens to the current?", ["It halves", "It doubles", "It stays the same", "It becomes zero"], "$I = \\frac{U}{R}$: double $R$ gives half $I$."],
 ["Hvilken energikilde er fornybar?", ["Vindkraft", "Kull", "Olje", "Naturgass"], "Vinden tar ikke slutt.",
  "Which energy source is renewable?", ["Wind power", "Coal", "Oil", "Natural gas"], "The wind does not run out."],
 ["Hva skjer i en seriekobling hvis én pære ryker?", ["Alle pærene slukner", "Bare den ene slukner", "De andre lyser sterkere", "Ingenting"], "Kretsen brytes, og strømmen har ingen annen vei.",
  "What happens in a series circuit if one bulb blows?", ["All the bulbs go out", "Only that one goes out", "The others shine brighter", "Nothing"], "The circuit is broken and the current has no other path."]],
 () => { const R0 = R.p([2, 4, 5, 10, 20, 50, 100]), I = R.p([0.1, 0.2, 0.5, 1, 2]), U = +(R0 * I).toFixed(2);
   return [T(`En motstand på ${R0} Ω har strøm ${nf(I)} A gjennom seg. Hva er spenningen?`, `A ${R0} Ω resistor has a current of ${nf(I)} A through it. What is the voltage?`), N(U, 0.01, "V"), T(`$U = R \\cdot I = ${R0} \\cdot ${mf(I)} = ${mf(U)}$ V.`, `$U = R \\cdot I = ${R0} \\cdot ${mf(I)} = ${mf(U)}$ V.`)]; },
 () => { const U = R.p([4.5, 9, 12, 24, 230]), R0 = R.p([3, 6, 9, 12, 18, 46]), I = +(U / R0).toFixed(3);
   return [T(`Et batteri på ${nf(U)} V er koblet til en motstand på ${R0} Ω. Hvor stor er strømmen?`, `A ${nf(U)} V battery is connected to a ${R0} Ω resistor. How big is the current?`), N(I, Math.max(0.005, I * 0.01), "A"), T(`$I = \\frac{U}{R} = \\frac{${mf(U)}}{${R0}} \\approx ${mf(I)}$ A.`, `$I = \\frac{U}{R} = \\frac{${mf(U)}}{${R0}} \\approx ${mf(I)}$ A.`)]; },
 () => { const U = 230, I = R.i(2, 13), P = U * I;
   return [T(`En ovn på ${U} V trekker ${I} A. Hva er effekten?`, `A heater on ${U} V draws ${I} A. What is its power?`), N(P, 0, "W"), T(`$P = U \\cdot I = ${U} \\cdot ${I} = ${P}$ W.`, `$P = U \\cdot I = ${U} \\cdot ${I} = ${P}$ W.`)]; }
);

U("Økologi og klima", "Ecology and climate",
`## Hva handler det om?
Alt levende henger sammen i **økosystemer**. Menneskers utslipp påvirker både naturen og klimaet.

## Det viktigste
- Et **næringsnett** viser mange næringskjeder som henger sammen. Bare rundt 10 % av energien går videre til neste ledd.
- **Karbonets kretsløp**: planter tar opp CO₂ i fotosyntesen, og CO₂ slippes ut igjen ved celleånding, forråtnelse og forbrenning.
- **Drivhuseffekten** er naturlig og holder jorda levelig. Mer CO₂ og metan forsterker den, og gir **global oppvarming**.
- Følger: mer ekstremvær, havnivåstigning, smeltende is og arter som mister leveområder.
- **Bærekraftig utvikling**: å dekke behovene våre uten å ødelegge for framtidige generasjoner.

### Eksempel
Hvis ulven forsvinner fra et område, kan hjortebestanden vokse så mye at den spiser opp unge trær – hele økosystemet endres.

> Fossilt brensel (kull, olje, gass) slipper ut karbon som har vært lagret i millioner av år.`,
`## What is it about?
All living things are connected in **ecosystems**. Human emissions affect both nature and the climate.

## Key points
- A **food web** shows many food chains that are linked. Only about 10 % of the energy passes on to the next level.
- **The carbon cycle**: plants take up CO₂ in photosynthesis, and CO₂ is released again by respiration, decay and combustion.
- **The greenhouse effect** is natural and keeps the Earth habitable. More CO₂ and methane strengthen it and cause **global warming**.
- Consequences: more extreme weather, rising sea levels, melting ice and species losing their habitats.
- **Sustainable development**: meeting our needs without ruining things for future generations.

### Example
If wolves disappear from an area, the deer population can grow so much that it eats the young trees – the whole ecosystem changes.

> Fossil fuels (coal, oil, gas) release carbon that has been stored for millions of years.`,
[["Hvor mye av energien går omtrent videre til neste ledd i en næringskjede?", ["10 %", "50 %", "90 %", "100 %"], "Det meste brukes til liv og varme eller går tapt.",
  "About how much of the energy passes to the next level in a food chain?", ["10 %", "50 %", "90 %", "100 %"], "Most is used for living and heat or is lost."],
 ["Hvilken prosess tar CO₂ ut av lufta?", ["Fotosyntese", "Forbrenning", "Celleånding", "Forråtnelse"], "Planter bruker CO₂ til å lage sukker.",
  "Which process removes CO₂ from the air?", ["Photosynthesis", "Combustion", "Respiration", "Decay"], "Plants use CO₂ to make sugar."],
 ["Hva er riktig om drivhuseffekten?", ["Den er naturlig, men forsterkes av utslipp", "Den finnes bare på grunn av mennesker", "Den kjøler jorda", "Den skyldes hull i ozonlaget"], "Uten den naturlige drivhuseffekten hadde jorda vært rundt −18 °C.",
  "What is true about the greenhouse effect?", ["It is natural but strengthened by emissions", "It exists only because of humans", "It cools the Earth", "It is caused by the hole in the ozone layer"], "Without the natural greenhouse effect the Earth would be about −18 °C."],
 ["Hva betyr bærekraftig utvikling?", ["Å dekke dagens behov uten å ødelegge for framtiden", "Å bruke opp ressursene raskt", "Å slutte å bruke energi", "Å bare bruke kull"], "Definisjonen fra Brundtland-kommisjonen (1987).",
  "What does sustainable development mean?", ["Meeting today's needs without ruining the future", "Using up resources quickly", "Stopping all energy use", "Using only coal"], "The definition from the Brundtland Commission (1987)."],
 ["Hvorfor stiger havnivået når klimaet blir varmere?", ["Isbreer smelter og varmt vann utvider seg", "Det regner mer på havet", "Fisk tar mer plass", "Månen trekker hardere"], "Smeltevann fra land og varmeutvidelse av havet.",
  "Why does the sea level rise when the climate gets warmer?", ["Glaciers melt and warm water expands", "It rains more on the sea", "Fish take up more space", "The Moon pulls harder"], "Meltwater from land and thermal expansion of the sea."],
 ["Hva skjer med karbonet i fossilt brensel når det brennes?", ["Det slippes ut som CO₂", "Det blir til oksygen", "Det forsvinner", "Det blir til vann"], "Karbon som har vært lagret i millioner av år, kommer ut i lufta.",
  "What happens to the carbon in fossil fuel when it is burned?", ["It is released as CO₂", "It becomes oxygen", "It disappears", "It becomes water"], "Carbon stored for millions of years is released into the air."]]);

U("Genetikk og evolusjon", "Genetics and evolution",
`## Hva handler det om?
Hvorfor ligner du på foreldrene dine? Og hvordan har livet på jorda endret seg over millioner av år?

## Det viktigste
- **DNA** er oppskriften på hvordan en organisme bygges. Et **gen** er en bit av DNA som koder for et protein.
- Mennesker har 23 **kromosompar** – ett sett fra mor og ett fra far.
- Et gen kan ha ulike varianter (**alleler**). Et **dominant** allel vises selv om du bare har ett. Et **recessivt** allel vises bare hvis du har to.
- **Mutasjoner** er endringer i DNA. De gir ny variasjon.
- **Naturlig utvalg** (Darwin): individer som er best tilpasset, overlever og får flest avkom, så egenskapene deres blir vanligere.

### Eksempel
Begge foreldrene har brune øyne, men bærer et recessivt allel for blå. Barnet kan få blå øyne hvis det arver det blå allelet fra begge.

> Evolusjon skjer i populasjoner over mange generasjoner, ikke i ett individ.`,
`## What is it about?
Why do you look like your parents? And how has life on Earth changed over millions of years?

## Key points
- **DNA** is the recipe for how an organism is built. A **gene** is a piece of DNA that codes for a protein.
- Humans have 23 **pairs of chromosomes** – one set from the mother and one from the father.
- A gene can have different versions (**alleles**). A **dominant** allele shows even if you have only one. A **recessive** allele shows only if you have two.
- **Mutations** are changes in DNA. They create new variation.
- **Natural selection** (Darwin): individuals that are best adapted survive and have the most offspring, so their traits become more common.

### Example
Both parents have brown eyes but carry a recessive allele for blue. The child can get blue eyes if it inherits the blue allele from both.

> Evolution happens in populations over many generations, not in one individual.`,
[["Hvor mange kromosompar har mennesker?", ["23", "46", "12", "100"], "23 par, altså 46 kromosomer.",
  "How many pairs of chromosomes do humans have?", ["23", "46", "12", "100"], "23 pairs, that is 46 chromosomes."],
 ["Hva er et gen?", ["En bit av DNA som koder for et protein", "En hel celle", "Et organ", "En type bakterie"], "Genet er oppskriften på ett protein.",
  "What is a gene?", ["A piece of DNA that codes for a protein", "A whole cell", "An organ", "A type of bacterium"], "The gene is the recipe for one protein."],
 ["Når vises et recessivt allel?", ["Når du har to av det", "Alltid", "Aldri", "Bare hos gutter"], "Med ett dominant allel vil det dominante vises.",
  "When does a recessive allele show?", ["When you have two of it", "Always", "Never", "Only in boys"], "With one dominant allele, the dominant one shows."],
 ["Hva gir ny genetisk variasjon?", ["Mutasjoner", "Trening", "Kosthold", "Søvn"], "Mutasjoner endrer DNA og kan arves.",
  "What creates new genetic variation?", ["Mutations", "Exercise", "Diet", "Sleep"], "Mutations change DNA and can be inherited."],
 ["Hva betyr naturlig utvalg?", ["De best tilpassede får flest avkom", "Dyr velger hvordan de vil se ut", "Alle overlever like godt", "Mennesker avler fram husdyr"], "Egenskaper som gir flere avkom, blir vanligere i populasjonen.",
  "What does natural selection mean?", ["The best adapted have the most offspring", "Animals choose how to look", "Everyone survives equally", "Humans breed farm animals"], "Traits that give more offspring become more common in the population."],
 ["Hvorfor blir bakterier resistente mot antibiotika?", ["De få som tåler medisinen, overlever og formerer seg", "Bakteriene lærer å unngå det", "Antibiotika gjør dem sterkere med vilje", "Det skjer ikke"], "Naturlig utvalg: de resistente overlever og tar over.",
  "Why do bacteria become resistant to antibiotics?", ["The few that tolerate the drug survive and multiply", "The bacteria learn to avoid it", "Antibiotics make them stronger on purpose", "It does not happen"], "Natural selection: the resistant ones survive and take over."]]);

U("Universet", "The universe",
`## Hva handler det om?
Jorda er én planet rundt én stjerne i én galakse blant milliarder. Avstandene er så store at vi måler dem i **lysår**.

## Det viktigste
- Et **lysår** er hvor langt lyset går på ett år: rundt 9,5 billioner km.
- **Sola** er en stjerne der hydrogen smelter sammen til helium (**fusjon**) og gir lys og varme.
- **Melkeveien** er galaksen vår, med over 100 milliarder stjerner.
- **Big bang**: universet startet for rundt 13,8 milliarder år siden og utvider seg fortsatt.
- Lyset fra sola bruker rundt 8 minutter til jorda. Når vi ser ut i verdensrommet, ser vi bakover i tid.
- **Tyngdekraften** holder planetene i bane rundt sola og månen rundt jorda.

### Eksempel
Stjernen Proxima Centauri er 4,2 lysår unna. Lyset vi ser i kveld, ble sendt ut for over fire år siden.

> Stjerner er soler – mange av dem har egne planeter.`,
`## What is it about?
The Earth is one planet around one star in one galaxy among billions. The distances are so large that we measure them in **light years**.

## Key points
- A **light year** is how far light travels in one year: about 9.5 trillion km.
- **The Sun** is a star in which hydrogen fuses into helium (**fusion**) and gives off light and heat.
- **The Milky Way** is our galaxy, with more than 100 billion stars.
- **The Big Bang**: the universe began about 13.8 billion years ago and is still expanding.
- Light from the Sun takes about 8 minutes to reach the Earth. When we look out into space, we look back in time.
- **Gravity** keeps the planets in orbit around the Sun and the Moon around the Earth.

### Example
The star Proxima Centauri is 4.2 light years away. The light we see tonight was sent out more than four years ago.

> Stars are suns – many of them have their own planets.`,
[["Hva er et lysår?", ["En avstand", "En tidsperiode", "En lysstyrke", "En type stjerne"], "Lysår er hvor langt lyset går på ett år – en lengde.",
  "What is a light year?", ["A distance", "A period of time", "A brightness", "A type of star"], "A light year is how far light travels in one year – a length."],
 ["Hva gir sola energi?", ["Fusjon av hydrogen til helium", "Forbrenning av kull", "Radioaktivt uran", "Elektrisitet"], "I kjernen smelter hydrogenkjerner sammen til helium.",
  "What gives the Sun its energy?", ["Fusion of hydrogen into helium", "Burning coal", "Radioactive uranium", "Electricity"], "In the core, hydrogen nuclei fuse into helium."],
 ["Hvor lenge bruker sollyset til jorda?", ["Rundt 8 minutter", "Rundt 8 sekunder", "Rundt 8 timer", "Med en gang"], "Avstanden er 150 millioner km, og lyset går 300 000 km/s.",
  "How long does sunlight take to reach the Earth?", ["About 8 minutes", "About 8 seconds", "About 8 hours", "Instantly"], "The distance is 150 million km, and light travels 300 000 km/s."],
 ["Hva heter galaksen vår?", ["Melkeveien", "Andromeda", "Orion", "Big bang"], "Andromeda er nabogalaksen.",
  "What is our galaxy called?", ["The Milky Way", "Andromeda", "Orion", "The Big Bang"], "Andromeda is the neighbouring galaxy."],
 ["Hva holder planetene i bane rundt sola?", ["Tyngdekraften", "Magnetisme", "Solvinden", "Friksjon"], "Solas tyngdekraft trekker planetene innover og bøyer banen deres.",
  "What keeps the planets in orbit around the Sun?", ["Gravity", "Magnetism", "The solar wind", "Friction"], "The Sun's gravity pulls the planets inwards and bends their path."],
 ["Hvor gammelt er universet omtrent?", ["13,8 milliarder år", "4,6 milliarder år", "6000 år", "1 million år"], "4,6 milliarder år er alderen til jorda og solsystemet.",
  "About how old is the universe?", ["13.8 billion years", "4.6 billion years", "6000 years", "1 million years"], "4.6 billion years is the age of the Earth and the solar system."]]);
})();
