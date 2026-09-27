// ============================================================
//  add_vgs_n.js – Naturfag (Vg1) og Geografi (Vg1/Vg2) etter LK20.
// ============================================================
NEWCOURSE({ code: "VGNAT", study: "vgs", group: "VGS: fellesfag", nb: "Naturfag", en: "Natural Science", s: ["Na", "NS"], eqText: VG_EQ("Vg1 fellesfag (LK20)", "Year 11 core subject (Norwegian curriculum)"), units: [] });
NEWCOURSE({ code: "VGGEO", study: "vgs", group: "VGS: fellesfag", nb: "Geografi", en: "Geography", s: ["Ge", "Ge"], eqText: VG_EQ("Vg1/Vg2 fellesfag (LK20)", "Year 11/12 core subject (Norwegian curriculum)"), units: [] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const U = (code, nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT(code, nb, en); TH(code, u, thNb, thEn); BIQ(code, u, qs); if(gens.length) GEN(code, u, ...gens); return u; };
const MC = (q, opts, ex) => [T(...q), opts.map(o => T(...o)), T(...ex)];

// ================= NATURFAG =================
U("VGNAT", "Naturvitenskapelig metode", "The scientific method",
`## Hva handler det om?
Naturvitenskap er en måte å finne ut hvordan verden virker på: vi stiller spørsmål, lager hypoteser og tester dem med forsøk og observasjoner.

## Begreper og formler
- **Hypotese**: en mulig forklaring som kan testes.
- **Variabler**: den du endrer (**uavhengig**), den du måler (**avhengig**) og de du holder like (**kontrollvariabler**).
- **Kontrollgruppe**: en gruppe som ikke får «behandlingen», så du har noe å sammenligne med.
- **Gjentakbarhet**: andre skal kunne gjøre forsøket og få samme resultat.
- **Fagfellevurdering**: andre forskere vurderer arbeidet før det publiseres.
- **Korrelasjon** er ikke det samme som **årsak**: to ting kan henge sammen uten at den ene forårsaker den andre.

### Eksempel
Du tester om gjødsel gir høyere planter. Uavhengig variabel: mengde gjødsel. Avhengig: plantehøyde. Kontrollvariabler: lys, vann, jord og planteart.

> En god hypotese kan motbevises med et forsøk.`,
`## What is it about?
Science is a way of finding out how the world works: we ask questions, make hypotheses and test them with experiments and observations.

## Concepts and formulas
- **Hypothesis**: a possible explanation that can be tested.
- **Variables**: the one you change (**independent**), the one you measure (**dependent**) and the ones you keep the same (**controlled**).
- **Control group**: a group that does not get the "treatment", so you have something to compare with.
- **Reproducibility**: others should be able to repeat the experiment and get the same result.
- **Peer review**: other scientists assess the work before it is published.
- **Correlation** is not the same as **causation**: two things can go together without one causing the other.

### Example
You test whether fertiliser gives taller plants. Independent variable: amount of fertiliser. Dependent: plant height. Controlled: light, water, soil and plant species.

> A good hypothesis can be disproved by an experiment.`,
[
 ["Hva er en hypotese?", ["En mulig forklaring som kan testes", "Et bevist faktum", "En tilfeldig gjetning uten grunnlag", "Et resultat"], "Hypotesen testes med forsøk.", "What is a hypothesis?", ["A possible explanation that can be tested", "A proven fact", "A random guess with no basis", "A result"], "The hypothesis is tested by experiment."],
 ["Du undersøker om temperatur påvirker hvor fort sukker løses. Hva er den uavhengige variabelen?", ["Temperaturen", "Tiden sukkeret bruker", "Mengden vann", "Typen sukker"], "Det du selv endrer.", "You investigate whether temperature affects how fast sugar dissolves. What is the independent variable?", ["The temperature", "The time the sugar takes", "The amount of water", "The type of sugar"], "The thing you change yourself."],
 ["Hvorfor bruker man kontrollgruppe?", ["For å ha noe å sammenligne med", "For å få flere deltakere", "For å spare penger", "For å gjøre forsøket raskere"], "Da ser du effekten av det du tester.", "Why use a control group?", ["To have something to compare with", "To get more participants", "To save money", "To make the experiment faster"], "Then you see the effect of what you test."],
 ["Is-salg og drukningsulykker øker begge om sommeren. Hva kan du konkludere?", ["De korrelerer, men is forårsaker ikke drukning", "Is fører til drukning", "Drukning fører til is-salg", "Ingenting henger sammen"], "Begge skyldes varmt vær (en tredje variabel).", "Ice cream sales and drownings both rise in summer. What can you conclude?", ["They correlate, but ice cream does not cause drowning", "Ice cream causes drowning", "Drowning causes ice cream sales", "Nothing is connected"], "Both are caused by warm weather (a third variable)."],
 ["Hva er fagfellevurdering?", ["Andre forskere vurderer arbeidet før publisering", "Elever retter hverandres prøver", "Forskeren vurderer seg selv", "En avstemning blant folk flest"], "En viktig kvalitetskontroll i forskning.", "What is peer review?", ["Other scientists assess the work before publication", "Students mark each other's tests", "The scientist assesses themselves", "A public vote"], "An important quality check in research."],
 ["Hva betyr at et forsøk er gjentakbart?", ["Andre kan gjøre det og få samme resultat", "Det kan gjøres bare én gang", "Det er billig", "Det gir alltid positivt svar"], "Gjentakbarhet gir tillit til resultatet.", "What does it mean that an experiment is reproducible?", ["Others can repeat it and get the same result", "It can only be done once", "It is cheap", "It always gives a positive answer"], "Reproducibility builds trust in the result."]
]);

U("VGNAT", "Energi og energikilder", "Energy and energy sources",
`## Hva handler det om?
All aktivitet krever energi. Energi kan ikke lages eller forsvinne, bare **omdannes** fra én form til en annen. Spørsmålet er hvor den kommer fra, og hvor mye som går tapt som varme.

## Begreper og formler
- **Energibevaring**: den totale energien er konstant.
- **Energiformer**: kinetisk (bevegelse), potensiell (høyde), kjemisk, elektrisk, termisk (varme), strålingsenergi.
- **Virkningsgrad**: $\\eta = \\dfrac{\\text{nyttig energi}}{\\text{tilført energi}}$. Resten blir varme.
- **Effekt**: energi per tid, $P = \\dfrac{E}{t}$. Enhet watt (W) = J/s. 1 kWh = 3,6 MJ.
- **Fornybare** kilder: vann, vind, sol, bølger, bioenergi. **Ikke-fornybare**: olje, gass, kull og uran.
- Norge får det meste av strømmen sin fra **vannkraft**.

### Eksempel
En lyspære bruker 60 J og gir 6 J lys. Virkningsgraden er $\\dfrac{6}{60} = 0{,}10 = 10\\,\\%$. Resten blir varme.

> Energi forsvinner aldri, men blir til mindre nyttig varme.`,
`## What is it about?
All activity needs energy. Energy cannot be created or destroyed, only **converted** from one form to another. The questions are where it comes from and how much is lost as heat.

## Concepts and formulas
- **Conservation of energy**: the total energy is constant.
- **Forms of energy**: kinetic (motion), potential (height), chemical, electrical, thermal (heat), radiant.
- **Efficiency**: $\\eta = \\dfrac{\\text{useful energy}}{\\text{energy supplied}}$. The rest becomes heat.
- **Power**: energy per time, $P = \\dfrac{E}{t}$. Unit watt (W) = J/s. 1 kWh = 3.6 MJ.
- **Renewable** sources: hydro, wind, solar, waves, bioenergy. **Non-renewable**: oil, gas, coal and uranium.
- Norway gets most of its electricity from **hydropower**.

### Example
A light bulb uses 60 J and gives 6 J of light. The efficiency is $\\dfrac{6}{60} = 0.10 = 10\\,\\%$. The rest becomes heat.

> Energy never disappears, but turns into less useful heat.`,
[
 ["Hvilken energikilde gir mest strøm i Norge?", ["Vannkraft", "Kjernekraft", "Kullkraft", "Solkraft"], "Rundt 90 % av norsk strøm kommer fra vannkraft.", "Which energy source gives the most electricity in Norway?", ["Hydropower", "Nuclear power", "Coal power", "Solar power"], "Around 90 % of Norwegian electricity comes from hydropower."],
 ["En motor får 500 J og gir 150 J nyttig arbeid. Hva er virkningsgraden?", { n: 30, tol: 0, u: "%" }, "$\\dfrac{150}{500} = 0{,}30 = 30\\,\\%$.", "A motor gets 500 J and gives 150 J of useful work. What is the efficiency?", null, "$\\dfrac{150}{500} = 0.30 = 30\\,\\%$."],
 ["Hvor mange joule er 1 kWh?", { n: 3600000, tol: 0, u: "J" }, "$1000 \\cdot 3600 = 3\\,600\\,000$ J.", "How many joules is 1 kWh?", null, "$1000 \\cdot 3600 = 3\\,600\\,000$ J."],
 ["Hvilken energikilde er IKKE fornybar?", ["Naturgass", "Vind", "Sol", "Bølger"], "Fossile kilder tar millioner av år å danne.", "Which energy source is NOT renewable?", ["Natural gas", "Wind", "Solar", "Waves"], "Fossil sources take millions of years to form."],
 ["Hva sier loven om energibevaring?", ["Energi kan verken skapes eller forsvinne, bare omdannes", "Energi forsvinner som varme", "Energi kan lages av ingenting", "All energi er elektrisk"], "Termodynamikkens første lov.", "What does the law of conservation of energy say?", ["Energy can neither be created nor destroyed, only converted", "Energy disappears as heat", "Energy can be made from nothing", "All energy is electrical"], "The first law of thermodynamics."],
 ["En panelovn på 1000 W står på i 3 timer. Hvor mange kWh bruker den?", { n: 3, tol: 0, u: "kWh" }, "$1\\,\\text{kW} \\cdot 3\\,\\text{h} = 3$ kWh.", "A 1000 W panel heater is on for 3 hours. How many kWh does it use?", null, "$1\\,\\text{kW} \\cdot 3\\,\\text{h} = 3$ kWh."]
],
 () => { const w = R.p([60, 100, 500, 1000, 1500, 2000]), h = R.p([2, 3, 5, 8, 10, 24]), pr = R.p([0.8, 1, 1.2, 1.5]), kwh = w / 1000 * h, kr = kwh * pr;
   return [T(`Et apparat på ${w} W står på i ${h} timer. Strømmen koster ${nf(pr)} kr per kWh. Hva koster det?`, `A ${w} W appliance is on for ${h} hours. Electricity costs ${nf(pr)} NOK per kWh. What does it cost?`), { n: kr, tol: 0.01, u: "kr" },
     T(`$${mf(w / 1000, 2)}\\,\\text{kW} \\cdot ${h}\\,\\text{h} = ${mf(kwh, 2)}$ kWh, og $${mf(kwh, 2)} \\cdot ${mf(pr)} = ${mf(kr, 2)}$ kr.`, `$${mf(w / 1000, 2)}\\,\\text{kW} \\cdot ${h}\\,\\text{h} = ${mf(kwh, 2)}$ kWh, and $${mf(kwh, 2)} \\cdot ${mf(pr)} = ${mf(kr, 2)}$ NOK.`)]; }
);

U("VGNAT", "Klima og bærekraft", "Climate and sustainability",
`## Hva handler det om?
Jordas klima styres av balansen mellom energi som kommer inn fra sola og energi som stråler ut. Klimagasser holder på varmen. Mer klimagasser gir global oppvarming.

## Begreper og formler
- **Drivhuseffekten**: gasser som $\\mathrm{CO_2}$, metan og vanndamp slipper inn sollys, men holder igjen en del av varmestrålingen fra jorda. Uten naturlig drivhuseffekt ville jorda vært om lag −18 °C i snitt.
- **Menneskeskapt** oppvarming skyldes særlig forbrenning av kull, olje og gass, og avskoging.
- **Karbonets kretsløp**: karbon flyttes mellom atmosfæren, havet, planter, jord og fossile lagre.
- **Vær** er hva som skjer nå. **Klima** er gjennomsnittsværet over minst 30 år.
- **Bærekraftig utvikling** (Brundtland-kommisjonen, 1987): å dekke dagens behov uten å ødelegge mulighetene for kommende generasjoner.
- **Parisavtalen** (2015): holde oppvarmingen godt under 2 °C, og helst 1,5 °C.

### Eksempel
Når havet blir varmere, utvider vannet seg, og isbreer smelter. Begge deler gjør at havnivået stiger.

> Mer klimagasser holder igjen mer varme.`,
`## What is it about?
Earth's climate is governed by the balance between energy coming in from the Sun and energy radiated out. Greenhouse gases retain heat. More greenhouse gases give global warming.

## Concepts and formulas
- **The greenhouse effect**: gases such as $\\mathrm{CO_2}$, methane and water vapour let sunlight in but hold back part of the heat radiation from Earth. Without the natural greenhouse effect Earth would average about −18 °C.
- **Human-caused** warming comes mainly from burning coal, oil and gas, and from deforestation.
- **The carbon cycle**: carbon moves between the atmosphere, the ocean, plants, soil and fossil stores.
- **Weather** is what happens now. **Climate** is the average weather over at least 30 years.
- **Sustainable development** (the Brundtland Commission, 1987): meeting today's needs without destroying the options of future generations.
- **The Paris Agreement** (2015): keep warming well below 2 °C, and preferably 1.5 °C.

### Example
When the ocean warms, the water expands and glaciers melt. Both make sea level rise.

> More greenhouse gases hold back more heat.`,
[
 ["Hva er forskjellen på vær og klima?", ["Klima er gjennomsnittsværet over minst 30 år", "Det er det samme", "Vær er over mange år", "Klima gjelder bare temperatur"], "Vær er nå, klima er over tid.", "What is the difference between weather and climate?", ["Climate is the average weather over at least 30 years", "They are the same", "Weather spans many years", "Climate only concerns temperature"], "Weather is now, climate is over time."],
 ["Hvilken gass er den viktigste menneskeskapte klimagassen?", ["$\\mathrm{CO_2}$", "Oksygen", "Nitrogen", "Argon"], "Fra forbrenning av fossile brensler.", "Which gas is the most important human-made greenhouse gas?", ["$\\mathrm{CO_2}$", "Oxygen", "Nitrogen", "Argon"], "From burning fossil fuels."],
 ["Omtrent hvor kald ville jorda vært uten den naturlige drivhuseffekten?", ["−18 °C i snitt", "+15 °C", "−100 °C", "0 °C"], "I dag er snittet om lag +15 °C.", "Roughly how cold would Earth be without the natural greenhouse effect?", ["−18 °C on average", "+15 °C", "−100 °C", "0 °C"], "Today the average is about +15 °C."],
 ["Hvilket mål har Parisavtalen?", ["Holde oppvarmingen godt under 2 °C", "Stoppe all bruk av strøm", "Øke oljeproduksjonen", "Senke havnivået"], "Og helst begrense den til 1,5 °C.", "What is the goal of the Paris Agreement?", ["Keep warming well below 2 °C", "Stop all use of electricity", "Increase oil production", "Lower sea level"], "And preferably limit it to 1.5 °C."],
 ["Hva betyr bærekraftig utvikling?", ["Å dekke dagens behov uten å ødelegge for framtidige generasjoner", "Å produsere mest mulig", "Å stoppe all økonomisk vekst", "Å bare bruke fornybar energi"], "Definisjonen fra Brundtland-kommisjonen i 1987.", "What does sustainable development mean?", ["Meeting today's needs without harming future generations", "Producing as much as possible", "Stopping all economic growth", "Only using renewable energy"], "The definition from the Brundtland Commission in 1987."],
 ["Hvorfor stiger havnivået når klimaet blir varmere?", ["Isbreer smelter og varmt vann utvider seg", "Det regner mer over havet", "Månen trekker mer", "Havbunnen synker"], "Både smelting og termisk utvidelse.", "Why does sea level rise as the climate warms?", ["Glaciers melt and warm water expands", "More rain over the ocean", "The Moon pulls harder", "The seabed sinks"], "Both melting and thermal expansion."]
]);

U("VGNAT", "Stråling og radioaktivitet", "Radiation and radioactivity",
`## Hva handler det om?
Stråling er energi som sendes ut som bølger eller partikler. Noe stråling er ufarlig (radio, synlig lys), mens **ioniserende** stråling kan skade celler og arvestoff.

## Begreper og formler
- **Det elektromagnetiske spekteret** (lang til kort bølgelengde): radio, mikrobølger, infrarødt, synlig lys, UV, røntgen, gammastråling. Kortere bølgelengde = mer energi.
- **Ioniserende stråling**: UV (delvis), røntgen, gamma og partikkelstråling. Kan rive løs elektroner fra atomer.
- **Radioaktiv stråling**: **alfa** (heliumkjerner, stoppes av papir), **beta** (elektroner, stoppes av noen mm aluminium), **gamma** (stoppes delvis av tykt bly eller betong).
- **Halveringstid**: tiden det tar før halvparten av kjernene har falt fra hverandre.
- **Radon** fra berggrunnen er den største kilden til stråling i norske hjem.
- Stråling brukes også nyttig: røntgenbilder, strålebehandling mot kreft, sterilisering.

### Eksempel
Et stoff har halveringstid 8 dager. Etter 24 dager er det $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$ igjen.

> Alfa stoppes av papir, beta av aluminium, gamma av bly.`,
`## What is it about?
Radiation is energy sent out as waves or particles. Some radiation is harmless (radio, visible light), while **ionising** radiation can damage cells and DNA.

## Concepts and formulas
- **The electromagnetic spectrum** (long to short wavelength): radio, microwaves, infrared, visible light, UV, X-rays, gamma rays. Shorter wavelength = more energy.
- **Ionising radiation**: UV (partly), X-rays, gamma and particle radiation. It can knock electrons off atoms.
- **Radioactive radiation**: **alpha** (helium nuclei, stopped by paper), **beta** (electrons, stopped by a few mm of aluminium), **gamma** (partly stopped by thick lead or concrete).
- **Half-life**: the time it takes for half of the nuclei to decay.
- **Radon** from bedrock is the largest source of radiation in Norwegian homes.
- Radiation is also useful: X-ray images, radiotherapy for cancer, sterilisation.

### Example
A substance has a half-life of 8 days. After 24 days $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$ remains.

> Alpha is stopped by paper, beta by aluminium, gamma by lead.`,
[
 ["Hvilken stråling stoppes av et papirark?", ["Alfastråling", "Betastråling", "Gammastråling", "Røntgenstråling"], "Alfapartikler er store og tunge.", "Which radiation is stopped by a sheet of paper?", ["Alpha radiation", "Beta radiation", "Gamma radiation", "X-rays"], "Alpha particles are large and heavy."],
 ["Hva er den største strålekilden i norske hjem?", ["Radon fra berggrunnen", "Mobiltelefoner", "Wi-Fi", "Mikrobølgeovner"], "Radon er en radioaktiv gass.", "What is the largest radiation source in Norwegian homes?", ["Radon from the bedrock", "Mobile phones", "Wi-Fi", "Microwave ovens"], "Radon is a radioactive gas."],
 ["Hvilken har mest energi per foton?", ["Gammastråling", "Radiobølger", "Synlig lys", "Infrarødt"], "Kortest bølgelengde gir mest energi.", "Which has the most energy per photon?", ["Gamma rays", "Radio waves", "Visible light", "Infrared"], "The shortest wavelength has the most energy."],
 ["Halveringstiden er 5 år. Hvor mye er igjen av 200 g etter 10 år?", { n: 50, tol: 0, u: "g" }, "To halveringer: $200 \\to 100 \\to 50$ g.", "The half-life is 5 years. How much of 200 g remains after 10 years?", null, "Two halvings: $200 \\to 100 \\to 50$ g."],
 ["Hvorfor er ioniserende stråling farlig?", ["Den kan skade celler og arvestoff", "Den gjør ting varme", "Den er alltid radioaktiv", "Den lager lyd"], "Den kan rive løs elektroner og bryte bindinger i DNA.", "Why is ionising radiation dangerous?", ["It can damage cells and DNA", "It makes things hot", "It is always radioactive", "It makes noise"], "It can knock off electrons and break bonds in DNA."],
 ["Hva består en alfapartikkel av?", ["2 protoner og 2 nøytroner", "Ett elektron", "Et foton", "Ett nøytron"], "Det er en heliumkjerne.", "What is an alpha particle made of?", ["2 protons and 2 neutrons", "One electron", "A photon", "One neutron"], "It is a helium nucleus."]
],
 () => { const h = R.p([2, 5, 8, 10, 30]), n = R.i(1, 5), m0 = R.p([80, 160, 320, 400, 640]), m = m0 / 2 ** n;
   return [T(`Et radioaktivt stoff har halveringstid ${h} dager. Hvor mange gram er igjen av ${m0} g etter ${h * n} dager?`, `A radioactive substance has a half-life of ${h} days. How many grams of ${m0} g remain after ${h * n} days?`), { n: m, tol: 0.01, u: "g" },
     T(`${h * n} dager er ${n} halveringer: $${m0} \\cdot \\left(\\tfrac{1}{2}\\right)^{${n}} = ${mf(m, 2)}$ g.`, `${h * n} days is ${n} half-lives: $${m0} \\cdot \\left(\\tfrac{1}{2}\\right)^{${n}} = ${mf(m, 2)}$ g.`)]; }
);

U("VGNAT", "Helse og kroppen", "Health and the body",
`## Hva handler det om?
Kroppen trenger næring, søvn og bevegelse. Kostholdet gir energi og byggesteiner, og immunforsvaret beskytter oss mot sykdom.

## Begreper og formler
- **Næringsstoffer**: karbohydrater (energi), fett (energi og lagring), proteiner (byggesteiner), vitaminer, mineraler og vann.
- **Energiinnhold**: 1 g karbohydrat eller protein ≈ 17 kJ, 1 g fett ≈ 37 kJ.
- **Energibalanse**: spiser du mer energi enn du bruker, lagres resten som fett.
- **Smittestoffer**: bakterier (kan behandles med antibiotika), virus (ikke antibiotika), sopp og parasitter.
- **Vaksiner** lærer immunforsvaret å kjenne igjen et smittestoff.
- **Antibiotikaresistens**: bakterier blir motstandsdyktige når antibiotika brukes for mye eller feil.
- **Livsstilssykdommer**: for eksempel type 2-diabetes og hjerte- og karsykdommer.

### Eksempel
En matpakke har 30 g karbohydrat, 10 g fett og 15 g protein. Energi: $30 \\cdot 17 + 10 \\cdot 37 + 15 \\cdot 17 = 1135$ kJ.

> Antibiotika virker mot bakterier, ikke mot virus.`,
`## What is it about?
The body needs nutrition, sleep and exercise. Food provides energy and building blocks, and the immune system protects us from disease.

## Concepts and formulas
- **Nutrients**: carbohydrates (energy), fat (energy and storage), proteins (building blocks), vitamins, minerals and water.
- **Energy content**: 1 g of carbohydrate or protein ≈ 17 kJ, 1 g of fat ≈ 37 kJ.
- **Energy balance**: if you eat more energy than you use, the rest is stored as fat.
- **Pathogens**: bacteria (treatable with antibiotics), viruses (no antibiotics), fungi and parasites.
- **Vaccines** teach the immune system to recognise a pathogen.
- **Antibiotic resistance**: bacteria become resistant when antibiotics are overused or misused.
- **Lifestyle diseases**: for example type 2 diabetes and cardiovascular disease.

### Example
A packed lunch has 30 g carbohydrate, 10 g fat and 15 g protein. Energy: $30 \\cdot 17 + 10 \\cdot 37 + 15 \\cdot 17 = 1135$ kJ.

> Antibiotics work against bacteria, not viruses.`,
[
 ["Hvilket næringsstoff gir mest energi per gram?", ["Fett", "Karbohydrat", "Protein", "Vann"], "Fett gir om lag 37 kJ per gram.", "Which nutrient gives the most energy per gram?", ["Fat", "Carbohydrate", "Protein", "Water"], "Fat gives about 37 kJ per gram."],
 ["Virker antibiotika mot influensa?", ["Nei, influensa skyldes virus", "Ja", "Bare hos barn", "Bare i store doser"], "Antibiotika virker bare mot bakterier.", "Do antibiotics work against flu?", ["No, flu is caused by a virus", "Yes", "Only in children", "Only in large doses"], "Antibiotics only work against bacteria."],
 ["Hva er antibiotikaresistens?", ["Bakterier blir motstandsdyktige mot antibiotika", "At kroppen ikke tåler antibiotika", "At virus blir farligere", "En type vaksine"], "Skyldes for mye og feil bruk.", "What is antibiotic resistance?", ["Bacteria become resistant to antibiotics", "The body cannot tolerate antibiotics", "Viruses become more dangerous", "A type of vaccine"], "Caused by overuse and misuse."],
 ["Hvor mye energi gir 20 g fett (37 kJ/g)?", { n: 740, tol: 0, u: "kJ" }, "$20 \\cdot 37 = 740$ kJ.", "How much energy does 20 g of fat give (37 kJ/g)?", null, "$20 \\cdot 37 = 740$ kJ."],
 ["Hva er proteinenes viktigste oppgave?", ["Byggesteiner i kroppen", "Hovedkilden til energi", "Å lagre vann", "Å gi smak"], "Muskler, enzymer og hormoner er proteiner.", "What is the main job of proteins?", ["Building blocks in the body", "The main source of energy", "Storing water", "Giving taste"], "Muscles, enzymes and hormones are proteins."],
 ["Hvordan virker en vaksine?", ["Den lærer immunforsvaret å kjenne igjen smittestoffet", "Den dreper alle bakterier", "Den er et antibiotikum", "Den gir sykdommen i full styrke"], "Hukommelsesceller gir rask respons senere.", "How does a vaccine work?", ["It teaches the immune system to recognise the pathogen", "It kills all bacteria", "It is an antibiotic", "It gives the full-strength disease"], "Memory cells give a fast response later."]
],
 () => { const k = R.i(10, 80), f = R.i(2, 30), p = R.i(5, 40), e = k * 17 + f * 37 + p * 17;
   return [T(`En matrett har ${k} g karbohydrat, ${f} g fett og ${p} g protein. Hvor mye energi gir den (17, 37 og 17 kJ/g)?`, `A dish has ${k} g carbohydrate, ${f} g fat and ${p} g protein. How much energy does it give (17, 37 and 17 kJ/g)?`), { n: e, tol: 0, u: "kJ" },
     T(`$${k} \\cdot 17 + ${f} \\cdot 37 + ${p} \\cdot 17 = ${e}$ kJ.`, `$${k} \\cdot 17 + ${f} \\cdot 37 + ${p} \\cdot 17 = ${e}$ kJ.`)]; }
);

U("VGNAT", "Kjemi i hverdagen", "Everyday chemistry",
`## Hva handler det om?
Alt rundt oss er kjemi: maten vi lager, rengjøringsmidler, plast og batterier. Stoffer er bygd opp av atomer som binder seg sammen til molekyler og forbindelser.

## Begreper og formler
- **Atom**: kjerne med protoner og nøytroner, og elektroner rundt. **Grunnstoff**: bare én type atom.
- **Periodesystemet** ordner grunnstoffene etter antall protoner.
- **Kjemisk reaksjon**: stoffer blir til nye stoffer. Atomene forsvinner ikke (massebevaring).
- **pH-skalaen**: under 7 er surt, 7 er nøytralt, over 7 er basisk. Hvert trinn er en faktor 10.
- **Syre + base** gir salt og vann (nøytralisering).
- **Organisk kjemi**: stoffer med karbon, som plast, sukker og drivstoff.
- **Farekort og faresymboler** viser hvordan kjemikalier skal behandles trygt.

### Eksempel
Eddik har pH om lag 3, og såpe om lag 10. pH 3 er $10^4 = 10\\,000$ ganger surere enn pH 7.

> Lav pH er surt, høy pH er basisk.`,
`## What is it about?
Everything around us is chemistry: the food we cook, cleaning products, plastic and batteries. Substances are made of atoms bonding into molecules and compounds.

## Concepts and formulas
- **Atom**: a nucleus of protons and neutrons, with electrons around it. **Element**: only one type of atom.
- **The periodic table** orders the elements by number of protons.
- **Chemical reaction**: substances become new substances. Atoms do not disappear (conservation of mass).
- **The pH scale**: below 7 is acidic, 7 is neutral, above 7 is basic. Each step is a factor of 10.
- **Acid + base** gives salt and water (neutralisation).
- **Organic chemistry**: substances containing carbon, like plastic, sugar and fuel.
- **Safety data and hazard symbols** show how chemicals are to be handled safely.

### Example
Vinegar has a pH of about 3 and soap about 10. pH 3 is $10^4 = 10\\,000$ times more acidic than pH 7.

> Low pH is acidic, high pH is basic.`,
[
 ["Hva er pH i en nøytral løsning?", { n: 7, tol: 0, u: "" }, "pH 7 er nøytralt.", "What is the pH of a neutral solution?", null, "pH 7 is neutral."],
 ["Hvor mange ganger surere er pH 4 enn pH 6?", { n: 100, tol: 0, u: "" }, "To trinn: $10^2 = 100$.", "How many times more acidic is pH 4 than pH 6?", null, "Two steps: $10^2 = 100$."],
 ["Hva gir en syre og en base sammen?", ["Salt og vann", "Bare gass", "En sterkere syre", "Olje"], "Nøytralisering.", "What do an acid and a base give together?", ["Salt and water", "Only gas", "A stronger acid", "Oil"], "Neutralisation."],
 ["Hva ordner periodesystemet grunnstoffene etter?", ["Antall protoner", "Vekt i gram", "Farge", "Når de ble oppdaget"], "Atomnummeret er antall protoner.", "What does the periodic table order the elements by?", ["Number of protons", "Weight in grams", "Colour", "When they were discovered"], "The atomic number is the number of protons."],
 ["Hvilket grunnstoff finnes i alle organiske stoffer?", ["Karbon", "Jern", "Natrium", "Helium"], "Organisk kjemi er karbonkjemi.", "Which element is found in all organic compounds?", ["Carbon", "Iron", "Sodium", "Helium"], "Organic chemistry is carbon chemistry."],
 ["Hva betyr massebevaring i en kjemisk reaksjon?", ["Total masse er den samme før og etter", "Massen dobles", "Massen forsvinner", "Bare gasser har masse"], "Atomene omordnes, men forsvinner ikke.", "What does conservation of mass mean in a chemical reaction?", ["The total mass is the same before and after", "The mass doubles", "The mass disappears", "Only gases have mass"], "Atoms are rearranged, not lost."]
],
 () => { const a = R.i(1, 6), b = a + R.i(1, 4), f = 10 ** (b - a);
   return [T(`Hvor mange ganger surere er en løsning med pH ${a} enn en med pH ${b}?`, `How many times more acidic is a solution with pH ${a} than one with pH ${b}?`), { n: f, tol: 0, u: "" },
     T(`${b - a} trinn: $10^{${b - a}} = ${f}$.`, `${b - a} steps: $10^{${b - a}} = ${f}$.`)]; }
);

// ================= GEOGRAFI =================
U("VGGEO", "Kart og geografiske verktøy", "Maps and geographic tools",
`## Hva handler det om?
Kart er forenklede bilder av virkeligheten. Geografer bruker kart, koordinater og digitale verktøy (GIS) for å finne mønstre, for eksempel hvor folk bor eller hvor det er fare for flom.

## Begreper og formler
- **Målestokk**: forholdet mellom avstand på kartet og i virkeligheten. 1 : 50 000 betyr at 1 cm = 500 m.
- **Breddegrader** går øst–vest og måler avstand nord/sør for **ekvator** (0° til 90°).
- **Lengdegrader** går nord–sør og måler øst/vest for **nullmeridianen** gjennom Greenwich (0° til 180°).
- **Kartprojeksjon**: jorda er rund, kartet flatt. Alle projeksjoner forvrenger noe. Mercator gjør land nær polene altfor store.
- **Koter** (høydekurver) viser høyde. Tette koter = bratt terreng.
- **GIS** (geografiske informasjonssystemer): kart i lag med data, for eksempel befolkning, flomsoner og veier.
- **Tidssoner**: jorda roterer 360° på 24 timer, altså 15° per time.

### Eksempel
Oslo ligger på om lag 60° nord og 11° øst. Tromsø ligger lenger nord, rundt 70° nord.

> Bredde = nord/sør, lengde = øst/vest.`,
`## What is it about?
Maps are simplified pictures of reality. Geographers use maps, coordinates and digital tools (GIS) to find patterns, for example where people live or where floods may occur.

## Concepts and formulas
- **Scale**: the ratio between distance on the map and in reality. 1 : 50,000 means 1 cm = 500 m.
- **Latitudes** run east–west and measure distance north/south of the **equator** (0° to 90°).
- **Longitudes** run north–south and measure east/west of the **prime meridian** through Greenwich (0° to 180°).
- **Map projection**: Earth is round, the map is flat. Every projection distorts something. Mercator makes land near the poles far too big.
- **Contour lines** show height. Close contours = steep terrain.
- **GIS** (geographic information systems): maps in layers with data, such as population, flood zones and roads.
- **Time zones**: Earth rotates 360° in 24 hours, i.e. 15° per hour.

### Example
Oslo lies at about 60° north and 11° east. Further north, the Arctic Circle crosses Norway at about 66.5° north.

> Latitude = north/south, longitude = east/west.`,
[
 ["Hva måler breddegraden?", ["Avstanden nord eller sør for ekvator", "Avstanden øst for Greenwich", "Høyden over havet", "Tidssonen"], "Fra 0° ved ekvator til 90° ved polene.", "What does latitude measure?", ["Distance north or south of the equator", "Distance east of Greenwich", "Height above sea level", "The time zone"], "From 0° at the equator to 90° at the poles."],
 ["Hvor mange grader roterer jorda per time?", { n: 15, tol: 0, u: "°" }, "$\\dfrac{360°}{24} = 15°$.", "How many degrees does Earth rotate per hour?", null, "$\\dfrac{360°}{24} = 15°$."],
 ["Hva viser tette koter på et kart?", ["Bratt terreng", "Flatt terreng", "Vann", "Skog"], "Høyden endrer seg raskt over kort avstand.", "What do closely spaced contour lines show?", ["Steep terrain", "Flat terrain", "Water", "Forest"], "The height changes quickly over a short distance."],
 ["Hvorfor ser Grønland så stort ut på mange verdenskart?", ["Mercatorprojeksjonen forstørrer land nær polene", "Grønland er større enn Afrika", "Kartet er feil tegnet", "Isen gjør det større"], "Afrika er i virkeligheten omtrent 14 ganger større.", "Why does Greenland look so big on many world maps?", ["The Mercator projection enlarges land near the poles", "Greenland is bigger than Africa", "The map is badly drawn", "The ice makes it bigger"], "Africa is actually about 14 times larger."],
 ["Hva er GIS?", ["Digitale kart med data i lag", "Et navigasjonssatellittsystem", "En type kompass", "En værtjeneste"], "Geografiske informasjonssystemer.", "What is GIS?", ["Digital maps with data in layers", "A satellite navigation system", "A type of compass", "A weather service"], "Geographic information systems."],
 ["Et sted ligger 45° øst for Greenwich. Hvor mange timer foran Greenwich er soltiden?", { n: 3, tol: 0, u: "t" }, "$\\dfrac{45}{15} = 3$ timer.", "A place lies 45° east of Greenwich. How many hours ahead of Greenwich is the solar time?", null, "$\\dfrac{45}{15} = 3$ hours."]
],
 () => { const d = R.p([15, 30, 45, 60, 75, 90, 120, 150]), h = d / 15;
   return [T(`Et sted ligger ${d}° vest for Greenwich. Hvor mange timer bak Greenwich er soltiden?`, `A place lies ${d}° west of Greenwich. How many hours behind Greenwich is the solar time?`), { n: h, tol: 0, u: "t" },
     T(`$\\dfrac{${d}}{15} = ${h}$ timer.`, `$\\dfrac{${d}}{15} = ${h}$ hours.`)]; }
);

U("VGGEO", "Jordas indre og platetektonikk", "Earth's interior and plate tectonics",
`## Hva handler det om?
Jordskorpa er delt i store **plater** som flyter på det seige materialet under. Der platene møtes, får vi jordskjelv, vulkaner og fjellkjeder.

## Begreper og formler
- **Jordas lag**: skorpe, mantel, ytre kjerne (flytende) og indre kjerne (fast).
- **Divergent** plategrense: platene glir fra hverandre. Ny havbunn dannes, som på Den midtatlantiske ryggen (Island).
- **Konvergent** grense: platene presses mot hverandre. Den tyngste dykker ned (**subduksjon**), og det dannes vulkaner og dype grøfter. Kontinent mot kontinent gir høye fjell, som Himalaya.
- **Transform** grense: platene glir sidelengs forbi hverandre, som San Andreas-forkastningen i California.
- **Jordskjelv** måles med momentmagnitude. Hvert trinn betyr omtrent 32 ganger mer energi.
- **Den kaledonske fjellkjeden**, som norske fjell er rester av, ble dannet for rundt 400 millioner år siden.

### Eksempel
Island ligger på en divergent grense. Landet vokser noen centimeter i året fordi den nordamerikanske og den eurasiske platen glir fra hverandre.

> Fra hverandre, mot hverandre eller forbi hverandre.`,
`## What is it about?
Earth's crust is divided into large **plates** floating on the viscous material beneath. Where plates meet, we get earthquakes, volcanoes and mountain ranges.

## Concepts and formulas
- **Earth's layers**: crust, mantle, outer core (liquid) and inner core (solid).
- **Divergent** boundary: plates move apart. New seafloor forms, as along the Mid-Atlantic Ridge (Iceland).
- **Convergent** boundary: plates push together. The heavier one dives down (**subduction**), forming volcanoes and deep trenches. Continent against continent gives high mountains, like the Himalayas.
- **Transform** boundary: plates slide sideways past each other, like the San Andreas Fault in California.
- **Earthquakes** are measured on the moment magnitude scale. Each step means about 32 times more energy.
- **The Caledonian mountain range**, of which Norway's mountains are remnants, formed around 400 million years ago.

### Example
Iceland lies on a divergent boundary. The island grows a few centimetres a year because the North American and Eurasian plates are moving apart.

> Apart, together or past each other.`,
[
 ["Hvilken type plategrense ligger Island på?", ["Divergent", "Konvergent", "Transform", "Ingen"], "Platene glir fra hverandre langs Den midtatlantiske ryggen.", "What type of plate boundary is Iceland on?", ["Divergent", "Convergent", "Transform", "None"], "The plates move apart along the Mid-Atlantic Ridge."],
 ["Hvordan ble Himalaya dannet?", ["To kontinentalplater kolliderte", "En vulkan hadde utbrudd", "Isen skurte ut fjellene", "Platene gled fra hverandre"], "Den indiske platen presses mot den eurasiske.", "How did the Himalayas form?", ["Two continental plates collided", "A volcano erupted", "Ice carved out the mountains", "The plates moved apart"], "The Indian plate is pushing into the Eurasian plate."],
 ["Hva kalles det når en plate dykker ned under en annen?", ["Subduksjon", "Erosjon", "Sedimentasjon", "Forvitring"], "Skjer ved konvergente grenser.", "What is it called when one plate dives beneath another?", ["Subduction", "Erosion", "Sedimentation", "Weathering"], "It happens at convergent boundaries."],
 ["Hvilket lag i jorda er flytende?", ["Den ytre kjernen", "Den indre kjernen", "Skorpa", "Hele mantelen"], "Bevegelsene der skaper jordas magnetfelt.", "Which layer of Earth is liquid?", ["The outer core", "The inner core", "The crust", "The whole mantle"], "Movements there create Earth's magnetic field."],
 ["San Andreas-forkastningen er eksempel på hvilken plategrense?", ["Transform", "Divergent", "Konvergent", "Subduksjon"], "Platene glir sidelengs forbi hverandre.", "The San Andreas Fault is an example of which plate boundary?", ["Transform", "Divergent", "Convergent", "Subduction"], "The plates slide sideways past each other."],
 ["Omtrent hvor mye mer energi frigjør et skjelv på 7 enn et på 6?", ["Omtrent 32 ganger", "Dobbelt så mye", "10 ganger", "Like mye"], "Hvert trinn er om lag 32 ganger mer energi.", "Roughly how much more energy does a magnitude 7 quake release than a 6?", ["About 32 times", "Twice as much", "10 times", "The same"], "Each step is about 32 times more energy."]
]);

U("VGGEO", "Klima og vær", "Climate and weather",
`## Hva handler det om?
Sola varmer jorda ujevnt: mest ved ekvator, minst ved polene. Forskjellene driver vinder og havstrømmer og gir ulike **klimasoner**.

## Begreper og formler
- **Klimasoner**: tropisk (varmt hele året), subtropisk, temperert (tydelige årstider, som i Norge) og polart.
- **Golfstrømmen** (Den nordatlantiske strømmen) frakter varmt vann nordover og gjør Norge mye mildere enn andre steder på samme breddegrad.
- **Nedbørtyper**: **orografisk** (luft presses opp over fjell, typisk på Vestlandet), **frontnedbør** (varm og kald luft møtes) og **konveksjonsnedbør** (varm luft stiger, gir byger og torden).
- **Lavtrykk** gir ofte skyer og nedbør. **Høytrykk** gir ofte pent og stabilt vær.
- **Le-siden** av et fjell er tørrere enn lo-siden (regnskygge).
- **Klimadiagram** viser temperatur (linje) og nedbør (søyler) gjennom året.

### Eksempel
Bergen får over 2000 mm nedbør i året fordi fuktig luft fra havet presses opp over fjellene. Øst for fjellene, i regnskyggen, er det mye tørrere.

> Varm luft stiger, avkjøles og gir nedbør.`,
`## What is it about?
The Sun heats Earth unevenly: most at the equator, least at the poles. The differences drive winds and ocean currents and create different **climate zones**.

## Concepts and formulas
- **Climate zones**: tropical (warm all year), subtropical, temperate (clear seasons, as in Norway) and polar.
- **The Gulf Stream** (the North Atlantic Current) carries warm water north and makes Norway much milder than other places at the same latitude.
- **Types of precipitation**: **orographic** (air forced up over mountains, typical of western Norway), **frontal** (warm and cold air meet) and **convective** (warm air rises, giving showers and thunder).
- **Low pressure** often brings clouds and rain. **High pressure** often brings fine, stable weather.
- **The lee side** of a mountain is drier than the windward side (rain shadow).
- **Climate graphs** show temperature (line) and precipitation (bars) through the year.

### Example
Bergen gets over 2000 mm of precipitation a year because moist air from the sea is forced up over the mountains. East of the mountains, in the rain shadow, it is much drier.

> Warm air rises, cools and gives precipitation.`,
[
 ["Hvorfor er Norge mildere enn andre steder på samme breddegrad?", ["Golfstrømmen frakter varmt vann nordover", "Norge ligger nærmere sola", "Fjellene holder på varmen", "Det er mer vulkansk aktivitet"], "Den nordatlantiske strømmen gir milde vintre ved kysten.", "Why is Norway milder than other places at the same latitude?", ["The Gulf Stream carries warm water north", "Norway is closer to the Sun", "The mountains retain heat", "There is more volcanic activity"], "The North Atlantic Current gives mild coastal winters."],
 ["Hvilken nedbørtype er vanligst på Vestlandet?", ["Orografisk nedbør", "Konveksjonsnedbør", "Snø fra polene", "Monsunregn"], "Luft fra havet presses opp over fjellene.", "Which type of precipitation is most common in western Norway?", ["Orographic precipitation", "Convective precipitation", "Snow from the poles", "Monsoon rain"], "Air from the sea is forced up over the mountains."],
 ["Hva gir et høytrykk som regel?", ["Pent og stabilt vær", "Storm og regn", "Tordenvær", "Tåke hele tiden"], "Luften synker og varmes opp.", "What does high pressure usually bring?", ["Fine, stable weather", "Storms and rain", "Thunderstorms", "Constant fog"], "The air sinks and warms."],
 ["Hva er regnskygge?", ["Tørt område på lesiden av fjell", "Skyggen av en regnsky", "Et område med mye regn", "Regn om natten"], "Lufta har mistet fuktigheten på vei over fjellet.", "What is a rain shadow?", ["A dry area on the lee side of mountains", "The shadow of a rain cloud", "An area with lots of rain", "Rain at night"], "The air has lost its moisture crossing the mountain."],
 ["Hvilken klimasone ligger Norge i?", ["Temperert (og polart i nord og på fjellet)", "Tropisk", "Subtropisk", "Ørken"], "Tydelige årstider.", "Which climate zone is Norway in?", ["Temperate (and polar in the far north and on mountains)", "Tropical", "Subtropical", "Desert"], "Clear seasons."],
 ["Hva viser søylene i et klimadiagram?", ["Nedbør", "Temperatur", "Vindstyrke", "Befolkning"], "Linjen viser temperatur.", "What do the bars in a climate graph show?", ["Precipitation", "Temperature", "Wind speed", "Population"], "The line shows temperature."]
]);

U("VGGEO", "Befolkning og migrasjon", "Population and migration",
`## Hva handler det om?
Jorda har over 8 milliarder mennesker. Befolkningen vokser raskt i noen land og krymper i andre. Geografi forklarer hvorfor, og hvorfor folk flytter.

## Begreper og formler
- **Fødselsrate** og **dødsrate**: antall fødte og døde per 1000 innbyggere per år.
- **Naturlig tilvekst** = fødselsrate − dødsrate.
- **Den demografiske overgangsmodellen**: land går fra høye fødsels- og dødsrater (fase 1) via synkende dødsrate (rask vekst) til lave rater (fase 4–5).
- **Befolkningspyramide**: viser aldersfordelingen. Bred bunn = mange barn (ung befolkning). Smal bunn = aldrende befolkning.
- **Migrasjon**: **push-faktorer** (krig, fattigdom, klima) driver folk bort. **Pull-faktorer** (jobb, trygghet, familie) trekker dem til et sted.
- **Urbanisering**: stadig flere bor i byer. Over halvparten av verdens befolkning bor nå i byer.

### Eksempel
Fødselsrate 12 og dødsrate 8 gir naturlig tilvekst på 4 promille, altså 0,4 % i året.

> Push driver folk bort, pull trekker dem til.`,
`## What is it about?
Earth has over 8 billion people. The population grows fast in some countries and shrinks in others. Geography explains why, and why people move.

## Concepts and formulas
- **Birth rate** and **death rate**: the number of births and deaths per 1000 inhabitants per year.
- **Natural increase** = birth rate − death rate.
- **The demographic transition model**: countries go from high birth and death rates (stage 1) via a falling death rate (rapid growth) to low rates (stages 4–5).
- **Population pyramid**: shows the age distribution. A wide base = many children (young population). A narrow base = ageing population.
- **Migration**: **push factors** (war, poverty, climate) drive people away. **Pull factors** (jobs, safety, family) draw them to a place.
- **Urbanisation**: more and more people live in cities. Over half of the world's population now lives in cities.

### Example
A birth rate of 12 and a death rate of 8 give a natural increase of 4 per thousand, i.e. 0.4 % a year.

> Push drives people away, pull draws them in.`,
[
 ["Fødselsrate 30 og dødsrate 10 per 1000. Hva er den naturlige tilveksten i prosent?", { n: 2, tol: 0, u: "%" }, "$30 - 10 = 20$ promille = 2 %.", "Birth rate 30 and death rate 10 per 1000. What is the natural increase in percent?", null, "$30 - 10 = 20$ per thousand = 2 %."],
 ["Hva forteller en befolkningspyramide med bred bunn?", ["Mange barn og en ung befolkning", "En aldrende befolkning", "Høy innvandring", "Lav fødselsrate"], "Typisk for land tidlig i den demografiske overgangen.", "What does a population pyramid with a wide base tell you?", ["Many children and a young population", "An ageing population", "High immigration", "A low birth rate"], "Typical of countries early in the demographic transition."],
 ["Hvilken er en push-faktor?", ["Krig", "Ledige jobber", "Gode skoler", "Familie i nytt land"], "Push driver folk bort fra et sted.", "Which is a push factor?", ["War", "Available jobs", "Good schools", "Family in a new country"], "Push drives people away from a place."],
 ["Hva skjer i fase 2 av den demografiske overgangsmodellen?", ["Dødsraten synker, og befolkningen vokser raskt", "Begge ratene er lave", "Fødselsraten stiger kraftig", "Befolkningen krymper"], "Bedre helse og mat gjør at færre dør.", "What happens in stage 2 of the demographic transition model?", ["The death rate falls and the population grows fast", "Both rates are low", "The birth rate rises sharply", "The population shrinks"], "Better health and food mean fewer die."],
 ["Hva er urbanisering?", ["At stadig flere bor i byer", "At byer blir mindre", "At folk flytter til landet", "At byer får flere parker"], "Over halvparten av verdens befolkning bor i byer.", "What is urbanisation?", ["More and more people living in cities", "Cities getting smaller", "People moving to the countryside", "Cities getting more parks"], "Over half of the world's population lives in cities."],
 ["Omtrent hvor mange mennesker bor på jorda i dag?", ["Over 8 milliarder", "Om lag 2 milliarder", "Om lag 5 milliarder", "Over 20 milliarder"], "Passerte 8 milliarder i 2022.", "Roughly how many people live on Earth today?", ["Over 8 billion", "About 2 billion", "About 5 billion", "Over 20 billion"], "It passed 8 billion in 2022."]
],
 () => { const f = R.i(8, 40), d = R.i(5, Math.min(f, 15)), n = (f - d) / 10;
   return [T(`Et land har fødselsrate ${f} og dødsrate ${d} per 1000. Hva er den naturlige tilveksten i prosent?`, `A country has a birth rate of ${f} and a death rate of ${d} per 1000. What is the natural increase in percent?`), { n, tol: 0.001, u: "%" },
     T(`$${f} - ${d} = ${f - d}$ promille $= ${mf(n, 1)}\\,\\%$.`, `$${f} - ${d} = ${f - d}$ per thousand $= ${mf(n, 1)}\\,\\%$.`)]; }
);

U("VGGEO", "Naturfarer og ressurser", "Natural hazards and resources",
`## Hva handler det om?
Mennesker lever av naturressurser, men naturen kan også være farlig: skred, flom, stormer og tørke. Klimaendringer gjør mange av farene større.

## Begreper og formler
- **Fornybare ressurser** (vann, skog, fisk) kan fornyes hvis de ikke overbeskattes. **Ikke-fornybare** (olje, gass, mineraler) tar slutt.
- **Skred** i Norge: steinskred, snøskred, leirskred (kvikkleire) og flomskred.
- **Kvikkleire** er marin leire som kan bli flytende når den blir forstyrret, som i Gjerdrum i 2020.
- **Flom** kommer ofte ved snøsmelting eller kraftig regn. Asfalt og tette flater øker avrenningen.
- **Sårbarhet**: hvor hardt en fare rammer avhenger av hvor mange som bor der, bygninger, beredskap og økonomi.
- **Ressursforbannelsen**: land med mye naturressurser kan få svakere økonomi. Norge unngikk dette blant annet med Oljefondet.

### Eksempel
Et jordskjelv av samme styrke kan drepe mange flere i et fattig land enn i et rikt, fordi bygningene er svakere og beredskapen dårligere.

> Fare × sårbarhet = risiko.`,
`## What is it about?
People live off natural resources, but nature can also be dangerous: landslides, floods, storms and drought. Climate change makes many of these hazards greater.

## Concepts and formulas
- **Renewable resources** (water, forest, fish) can be renewed if they are not overexploited. **Non-renewable** ones (oil, gas, minerals) run out.
- **Landslides** in Norway: rockfalls, avalanches, clay slides (quick clay) and debris flows.
- **Quick clay** is marine clay that can liquefy when disturbed, as at Gjerdrum in 2020.
- **Floods** often come with snowmelt or heavy rain. Asphalt and sealed surfaces increase runoff.
- **Vulnerability**: how hard a hazard hits depends on how many live there, buildings, preparedness and wealth.
- **The resource curse**: countries rich in natural resources can end up with weaker economies. Norway avoided this partly through its sovereign wealth fund.

### Example
An earthquake of the same strength can kill many more people in a poor country than in a rich one, because buildings are weaker and preparedness poorer.

> Hazard × vulnerability = risk.`,
[
 ["Hva er kvikkleire?", ["Marin leire som kan bli flytende når den forstyrres", "Leire fra vulkaner", "Tørr sand", "Is under bakken"], "Leirskredet i Gjerdrum i 2020 skjedde i kvikkleire.", "What is quick clay?", ["Marine clay that can liquefy when disturbed", "Clay from volcanoes", "Dry sand", "Ice underground"], "The Gjerdrum clay slide in 2020 happened in quick clay."],
 ["Hvilken ressurs er ikke-fornybar?", ["Olje", "Skog", "Fisk", "Vannkraft"], "Olje tar millioner av år å danne.", "Which resource is non-renewable?", ["Oil", "Forest", "Fish", "Hydropower"], "Oil takes millions of years to form."],
 ["Hvorfor rammer naturkatastrofer ofte fattige land hardere?", ["Større sårbarhet: svakere bygninger og beredskap", "Katastrofene er sterkere der", "Det skjer bare der", "Rike land har ikke naturfarer"], "Risikoen avhenger både av fare og sårbarhet.", "Why do natural disasters often hit poor countries harder?", ["Greater vulnerability: weaker buildings and preparedness", "The disasters are stronger there", "They only happen there", "Rich countries have no hazards"], "Risk depends on both hazard and vulnerability."],
 ["Hvorfor øker asfalt faren for flom i byer?", ["Vannet kan ikke trenge ned i bakken", "Asfalt tiltrekker regn", "Asfalt smelter", "Asfalt lager vann"], "Mer vann renner av på overflaten.", "Why does asphalt increase flood risk in cities?", ["Water cannot soak into the ground", "Asphalt attracts rain", "Asphalt melts", "Asphalt makes water"], "More water runs off the surface."],
 ["Hva er ressursforbannelsen?", ["At land med mye naturressurser kan få svakere økonomi", "At ressursene er giftige", "At ressurser alltid gir rikdom", "At ressurser tar slutt"], "Norge unngikk dette blant annet med Oljefondet.", "What is the resource curse?", ["Resource-rich countries ending up with weaker economies", "The resources being toxic", "Resources always bringing wealth", "Resources running out"], "Norway avoided it partly through its oil fund."]
]);
})();
