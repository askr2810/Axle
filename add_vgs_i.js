// ============================================================
//  add_vgs_i.js – Biologi 1 (flere oppgaver + to nye enheter) og nytt fag Biologi 2
// ============================================================
NEWCOURSE({ code: "VGBI2", study: "vgs", group: "VGS: realfag", nb: "Biologi 2", en: "Biology 2", s: ["B2", "B2"], eqText: VG_EQ("Vg3 programfag (LK20)", "Year 13 elective (Norwegian curriculum)"),
  units: [["Fra gen til protein", "From gene to protein"], ["Bioteknologi", "Biotechnology"], ["Nervesystemet og hormoner", "The nervous system and hormones"], ["Immunforsvaret", "The immune system"]] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
// ================= BIOLOGI 1: flere oppgaver =================
BIQ("VGBI1", 0, [
 ["Hvilket organell inneholder arvestoffet i en dyrecelle?", ["Cellekjernen", "Ribosomet", "Golgiapparatet", "Lysosomet"], "DNA ligger i cellekjernen (og litt i mitokondriene).", "Which organelle contains the genetic material in an animal cell?", ["The nucleus", "The ribosome", "The Golgi apparatus", "The lysosome"], "DNA is in the nucleus (and a little in the mitochondria)."],
 ["Hva gjør ribosomene?", ["Lager proteiner", "Lager energi", "Lagrer vann", "Deler cellen"], "Ribosomene leser mRNA og setter sammen aminosyrer til proteiner.", "What do ribosomes do?", ["Make proteins", "Make energy", "Store water", "Divide the cell"], "Ribosomes read mRNA and join amino acids into proteins."],
 ["Hva er forskjellen på prokaryote og eukaryote celler?", ["Prokaryote har ikke cellekjerne", "Prokaryote er alltid større", "Eukaryote mangler DNA", "Det er ingen forskjell"], "Bakterier er prokaryote: DNA-et ligger fritt i cytoplasmaen.", "What is the difference between prokaryotic and eukaryotic cells?", ["Prokaryotes have no nucleus", "Prokaryotes are always larger", "Eukaryotes lack DNA", "There is no difference"], "Bacteria are prokaryotic: the DNA lies free in the cytoplasm."],
 ["Hva skjer med en celle i sterkt saltvann (osmose)?", ["Den skrumper", "Den sveller og sprekker", "Ingenting", "Den deler seg"], "Vann går ut av cellen mot høyere saltkonsentrasjon.", "What happens to a cell in very salty water (osmosis)?", ["It shrinks", "It swells and bursts", "Nothing", "It divides"], "Water moves out of the cell towards the higher salt concentration."],
 ["Hvor mange kromosomer har en menneskelig kroppscelle?", { n: 46, tol: 0, u: "" }, "23 par, altså 46 kromosomer. Kjønnsceller har 23.", "How many chromosomes does a human body cell have?", null, "23 pairs, i.e. 46 chromosomes. Sex cells have 23."],
 ["Hva består cellemembranen hovedsakelig av?", ["Et dobbelt lag av fosfolipider", "Cellulose", "DNA", "Stivelse"], "Fosfolipidene har vannelskende hoder og vannskye haler.", "What is the cell membrane mainly made of?", ["A double layer of phospholipids", "Cellulose", "DNA", "Starch"], "The phospholipids have water-loving heads and water-fearing tails."]
]);
BIQ("VGBI1", 1, [
 ["To heterozygote foreldre (Aa × Aa). Hvor stor sjanse er det for at barnet er aa?", { n: 25, tol: 0, u: "%" }, "Krysningsskjemaet gir AA, Aa, aA, aa: 1 av 4 = 25 %.", "Two heterozygous parents (Aa × Aa). What is the chance that the child is aa?", null, "The Punnett square gives AA, Aa, aA, aa: 1 in 4 = 25 %."],
 ["Hva betyr det at et allel er recessivt?", ["Det vises bare når man har to av det", "Det vises alltid", "Det er skadelig", "Det finnes bare hos menn"], "En recessiv egenskap trenger aa for å vises.", "What does it mean that an allele is recessive?", ["It only shows when you have two of it", "It always shows", "It is harmful", "It only exists in men"], "A recessive trait needs aa to show."],
 ["Hvorfor er fargeblindhet vanligere hos gutter?", ["Genet ligger på X-kromosomet, og gutter har bare ett X", "Gutter har flere gener", "Det er smittsomt", "Det er ikke vanligere"], "Kjønnsbundet arv: én kopi av det recessive allelet på X er nok hos gutter (XY).", "Why is colour blindness more common in boys?", ["The gene is on the X chromosome, and boys have only one X", "Boys have more genes", "It is contagious", "It isn't more common"], "Sex-linked inheritance: one copy of the recessive allele on X is enough in boys (XY)."],
 ["Hva er forskjellen på mitose og meiose?", ["Meiose gir kjønnsceller med halvt kromosomtall", "Mitose gir kjønnsceller", "Meiose gir like celler", "De er like"], "Mitose: 2 like celler (vekst). Meiose: 4 ulike kjønnsceller med 23 kromosomer.", "What is the difference between mitosis and meiosis?", ["Meiosis gives sex cells with half the chromosome number", "Mitosis gives sex cells", "Meiosis gives identical cells", "They are the same"], "Mitosis: 2 identical cells (growth). Meiosis: 4 different sex cells with 23 chromosomes."],
 ["Hva er en mutasjon?", ["En endring i DNA-sekvensen", "En ny art", "En sykdom", "En celledeling"], "Mutasjoner kan være nøytrale, skadelige eller (sjelden) nyttige.", "What is a mutation?", ["A change in the DNA sequence", "A new species", "A disease", "A cell division"], "Mutations can be neutral, harmful or (rarely) useful."],
 ["Aa × aa. Hvor stor andel av avkommet får den dominante egenskapen?", { n: 50, tol: 0, u: "%" }, "Halvparten får A fra forelderen Aa: Aa og aa i forholdet 1 : 1, altså 50 %.", "Aa × aa. What proportion of the offspring gets the dominant trait?", null, "Half get A from the Aa parent: Aa and aa in the ratio 1 : 1, i.e. 50 %."]
]);
GEN("VGBI1", 1,
 () => { const G = ["AA", "Aa", "aa"], m = R.i(0, 2), f = R.i(0, 2), kids = []; for(const x of G[m]) for(const y of G[f]) kids.push([x, y].sort().join(""));
   const want = R.p(["dom", "rec"]), k = kids.filter(g => want === "rec" ? g === "aa" : g !== "aa").length, pct = k * 25;
   return [T(`Mor er ${G[m]} og far er ${G[f]}. A er dominant. Hvor mange prosent av barna forventes å vise den ${want === "rec" ? "recessive" : "dominante"} egenskapen?`, `The mother is ${G[m]} and the father is ${G[f]}. A is dominant. What percentage of the children is expected to show the ${want === "rec" ? "recessive" : "dominant"} trait?`), { n: pct, tol: 0, u: "%" },
     T(`Krysningsskjemaet gir ${kids.join(", ")}. ${k} av 4 er ${want === "rec" ? "aa" : "AA eller Aa"}: ${pct} %.`, `The Punnett square gives ${kids.join(", ")}. ${k} of 4 are ${want === "rec" ? "aa" : "AA or Aa"}: ${pct} %.`)]; },
 () => { const q2 = R.p([0.01, 0.04, 0.09, 0.16, 0.25]), q = Math.sqrt(q2), p = 1 - q, het = 2 * p * q * 100;
   return [T(`${nf(q2 * 100)} % av en befolkning har en recessiv egenskap (aa). Hvor mange prosent er bærere (Aa), ifølge Hardy–Weinberg?`, `${nf(q2 * 100)} % of a population has a recessive trait (aa). What percentage are carriers (Aa), according to Hardy–Weinberg?`), { n: het, tol: 0.1, u: "%" },
     T(`$q^2 = ${mf(q2)}$, så $q = ${mf(q)}$ og $p = ${mf(p)}$. Bærere: $2pq = ${mf(het / 100, 3)} = ${mf(het, 1)}$ %.`, `$q^2 = ${mf(q2)}$, so $q = ${mf(q)}$ and $p = ${mf(p)}$. Carriers: $2pq = ${mf(het / 100, 3)} = ${mf(het, 1)}$ %.`)]; }
);
BIQ("VGBI1", 2, [
 ["Hva er en produsent i et økosystem?", ["En organisme som lager sin egen næring med fotosyntese", "Et rovdyr", "En nedbryter", "En planteeter"], "Planter og alger er produsenter og står nederst i næringskjeden.", "What is a producer in an ecosystem?", ["An organism that makes its own food by photosynthesis", "A predator", "A decomposer", "A herbivore"], "Plants and algae are producers and are at the bottom of the food chain."],
 ["Omtrent hvor mye av energien går videre til neste trofiske nivå?", { n: 10, tol: 0, u: "%" }, "Rundt 10 %. Resten brukes til livsprosesser og tapes som varme.", "Roughly how much of the energy passes on to the next trophic level?", null, "Around 10 %. The rest is used for life processes and lost as heat."],
 ["Hva gjør nedbryterne?", ["Bryter ned dødt materiale og frigjør næringsstoffer", "Lager oksygen", "Spiser planter", "Fanger lys"], "Sopp og bakterier resirkulerer næringsstoffer tilbake til jorda.", "What do decomposers do?", ["Break down dead material and release nutrients", "Make oxygen", "Eat plants", "Capture light"], "Fungi and bacteria recycle nutrients back into the soil."],
 ["Hva er bæreevne?", ["Den største bestanden miljøet kan holde over tid", "Hvor mye et dyr kan bære", "Antall arter i et område", "Fødselsraten"], "Bestanden vokser logistisk og flater ut ved bæreevnen $K$.", "What is carrying capacity?", ["The largest population the environment can sustain over time", "How much an animal can carry", "The number of species in an area", "The birth rate"], "The population grows logistically and levels off at the carrying capacity $K$."],
 ["Hva skjer med karbonet i en plante som brennes?", ["Det går ut i lufta som CO₂", "Det forsvinner", "Det blir til oksygen", "Det blir til vann"], "Karbonkretsløpet: fotosyntesen binder CO₂, forbrenning og celleånding frigjør det.", "What happens to the carbon in a plant that is burned?", ["It goes into the air as CO₂", "It disappears", "It becomes oxygen", "It becomes water"], "The carbon cycle: photosynthesis binds CO₂, combustion and respiration release it."]
]);
GEN("VGBI1", 2,
 () => { const E = R.p([10000, 50000, 100000, 1000000]), lv = R.i(2, 4), eff = 0.1, out = E * eff ** (lv - 1), names = [T("produsentene", "the producers"), T("planteeterne", "the herbivores"), T("rovdyrene", "the carnivores"), T("toppredatorene", "the top predators")];
   return [T(`Produsentene binder ${nf(E, 0)} kJ. Omtrent hvor mye energi når ${names[lv - 1]} (trofisk nivå ${lv}) med 10 % overføring per nivå?`, `The producers bind ${nf(E, 0)} kJ. Roughly how much energy reaches ${names[lv - 1]} (trophic level ${lv}) with 10 % transfer per level?`), { n: out, tol: rel(out, 0.01), u: "kJ" },
     T(`$${E} \\cdot 0{,}1^{${lv - 1}} = ${mf(out, 0)}$ kJ.`, `$${E} \\cdot 0.1^{${lv - 1}} = ${mf(out, 0)}$ kJ.`)]; },
 () => { const n1 = R.p([20, 30, 40, 50]), m = R.p([30, 40, 50, 60]), r = R.p([2, 3, 4, 5, 6, 8, 10]), N = n1 * m / r;
   return [T(`Fangst–gjenfangst: du merker ${n1} fisk. Senere fanger du ${m}, og ${r} av dem er merket. Omtrent hvor stor er bestanden?`, `Capture–recapture: you mark ${n1} fish. Later you catch ${m}, and ${r} of them are marked. Roughly how large is the population?`), { n: N, tol: rel(N, 0.01, 0.5), u: T("fisk", "fish") },
     T(`$N = \\dfrac{${n1} \\cdot ${m}}{${r}} = ${mf(N, 0)}$ fisk.`, `$N = \\dfrac{${n1} \\cdot ${m}}{${r}} = ${mf(N, 0)}$ fish.`)]; }
);
BIQ("VGBI1", 3, [
 ["Hva er naturlig utvalg?", ["Individer med gunstige egenskaper får flere avkom", "At naturen velger de største", "Tilfeldige mutasjoner", "At dyr lærer nye ting"], "Darwin: variasjon + arv + overproduksjon + konkurranse gir utvalg.", "What is natural selection?", ["Individuals with favourable traits have more offspring", "Nature choosing the biggest", "Random mutations", "Animals learning new things"], "Darwin: variation + inheritance + overproduction + competition gives selection."],
 ["Hvorfor blir bakterier resistente mot antibiotika?", ["De få som tåler antibiotikaen overlever og formerer seg", "Antibiotikaen gjør dem sterkere med vilje", "De lærer det", "De blir vaksinert"], "Et klassisk eksempel på naturlig utvalg i sanntid.", "Why do bacteria become resistant to antibiotics?", ["The few that tolerate the antibiotic survive and multiply", "The antibiotic deliberately makes them stronger", "They learn it", "They are vaccinated"], "A classic example of natural selection in real time."],
 ["Hva er en art (biologisk artsbegrep)?", ["Individer som kan få fruktbart avkom sammen", "Dyr som ser like ut", "Dyr som lever på samme sted", "Alle pattedyr"], "Hest og esel kan få muldyr, men muldyret er sterilt, så de er ulike arter.", "What is a species (biological species concept)?", ["Individuals that can have fertile offspring together", "Animals that look alike", "Animals living in the same place", "All mammals"], "A horse and a donkey can have a mule, but the mule is sterile, so they are different species."],
 ["Hva er homologe organer?", ["Organer med samme opprinnelse, men ulik funksjon", "Organer med samme funksjon, men ulik opprinnelse", "Organer som er borte", "Like organer hos samme art"], "Menneskearm, flaggermusvinge og hvalluffe har samme beinstruktur: felles stamform.", "What are homologous organs?", ["Organs with the same origin but different functions", "Organs with the same function but different origins", "Organs that have disappeared", "Identical organs in one species"], "A human arm, a bat wing and a whale flipper have the same bone structure: a common ancestor."],
 ["Hvor gammelt er livet på jorda, omtrent?", ["3,8 milliarder år", "6000 år", "65 millioner år", "13,8 milliarder år"], "De eldste sporene av liv er rundt 3,8 milliarder år. 13,8 er universets alder.", "Roughly how old is life on Earth?", ["3.8 billion years", "6000 years", "65 million years", "13.8 billion years"], "The oldest traces of life are about 3.8 billion years old. 13.8 is the age of the universe."]
]);
const B1_FOTO = ADDUNIT("VGBI1", "Fotosyntese og celleånding", "Photosynthesis and cellular respiration");
TH("VGBI1", B1_FOTO, `## Hva handler det om?
All energi i nesten alle økosystemer kommer fra sola. **Fotosyntesen** fanger lysenergi og lagrer den i glukose. **Celleåndingen** henter energien ut igjen og lagrer den som ATP, som cellene kan bruke.

## Begreper og formler
- Fotosyntese (i kloroplastene): $6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{lys} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$
- Celleånding (i mitokondriene): $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{energi (ATP)}$
- De to prosessene er omvendte av hverandre, og sammen utgjør de en stor del av karbonkretsløpet.
- **Klorofyll** absorberer rødt og blått lys og reflekterer grønt. Derfor er blader grønne.
- **ATP** er cellens «energivaluta». Én glukose gir omtrent 30–32 ATP med oksygen.
- Uten oksygen: **gjæring**. Muskler lager melkesyre, gjærsopp lager etanol og CO₂. Gir bare 2 ATP per glukose.
- Faktorer som begrenser fotosyntesen: lys, CO₂-konsentrasjon og temperatur.

> Fotosyntese lagrer solenergi i sukker. Celleånding bruker sukkeret til å lage ATP.`,
`## What is it about?
Nearly all the energy in almost every ecosystem comes from the Sun. **Photosynthesis** captures light energy and stores it in glucose. **Cellular respiration** releases the energy again and stores it as ATP, which the cells can use.

## Concepts and formulas
- Photosynthesis (in the chloroplasts): $6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{light} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$
- Cellular respiration (in the mitochondria): $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{energy (ATP)}$
- The two processes are the reverse of each other, and together they make up a large part of the carbon cycle.
- **Chlorophyll** absorbs red and blue light and reflects green. That is why leaves are green.
- **ATP** is the cell's "energy currency". One glucose gives about 30–32 ATP with oxygen.
- Without oxygen: **fermentation**. Muscles make lactic acid, yeast makes ethanol and CO₂. Gives only 2 ATP per glucose.
- Factors that limit photosynthesis: light, CO₂ concentration and temperature.

> Photosynthesis stores solar energy in sugar. Respiration uses the sugar to make ATP.`);
BIQ("VGBI1", B1_FOTO, [
 ["Hvor skjer fotosyntesen?", ["I kloroplastene", "I mitokondriene", "I cellekjernen", "I ribosomene"], "Kloroplastene inneholder klorofyll.", "Where does photosynthesis take place?", ["In the chloroplasts", "In the mitochondria", "In the nucleus", "In the ribosomes"], "Chloroplasts contain chlorophyll."],
 ["Hva er produktene i celleåndingen?", ["CO₂, vann og ATP", "Glukose og oksygen", "Bare oksygen", "Stivelse"], "Glukose + O₂ gir CO₂ + H₂O + energi.", "What are the products of cellular respiration?", ["CO₂, water and ATP", "Glucose and oxygen", "Only oxygen", "Starch"], "Glucose + O₂ gives CO₂ + H₂O + energy."],
 ["Hvorfor er blader grønne?", ["Klorofyll reflekterer grønt lys", "Klorofyll absorberer grønt lys", "Blader inneholder kobber", "Det skyldes vannet"], "Grønt lys brukes minst og sendes tilbake til øynene våre.", "Why are leaves green?", ["Chlorophyll reflects green light", "Chlorophyll absorbs green light", "Leaves contain copper", "It is due to the water"], "Green light is used least and is sent back to our eyes."],
 ["Hvor mange ATP gir gjæring per glukose?", { n: 2, tol: 0, u: "" }, "Bare glykolysen: 2 ATP. Med oksygen blir det 30–32.", "How many ATP does fermentation give per glucose?", null, "Only glycolysis: 2 ATP. With oxygen it becomes 30–32."],
 ["Hvor mange CO₂-molekyler trengs for å lage ett glukosemolekyl?", { n: 6, tol: 0, u: "" }, "$6\\text{CO}_2 \\to \\text{C}_6\\text{H}_{12}\\text{O}_6$: seks karbonatomer.", "How many CO₂ molecules are needed to make one glucose molecule?", null, "$6\\text{CO}_2 \\to \\text{C}_6\\text{H}_{12}\\text{O}_6$: six carbon atoms."],
 ["Hva lager musklene når de jobber uten nok oksygen?", ["Melkesyre (laktat)", "Etanol", "Glukose", "Oksygen"], "Anaerob gjæring i muskler gir laktat.", "What do muscles make when they work without enough oxygen?", ["Lactic acid (lactate)", "Ethanol", "Glucose", "Oxygen"], "Anaerobic fermentation in muscles gives lactate."]
]);
GEN("VGBI1", B1_FOTO,
 () => { const n = R.p([1, 2, 3, 5, 10]), what = R.p(["co2", "o2"]);
   return [T(`Hvor mange ${what === "co2" ? "CO₂" : "O₂"}-molekyler ${what === "co2" ? "trengs" : "frigjøres"} når en plante lager ${n} glukosemolekyl${n > 1 ? "er" : ""}?`, `How many ${what === "co2" ? "CO₂" : "O₂"} molecules are ${what === "co2" ? "needed" : "released"} when a plant makes ${n} glucose molecule${n > 1 ? "s" : ""}?`), { n: 6 * n, tol: 0, u: "" },
     T(`6 per glukose: $6 \\cdot ${n} = ${6 * n}$.`, `6 per glucose: $6 \\cdot ${n} = ${6 * n}$.`)]; },
 () => { const g = R.p([2, 5, 10, 20]), atp = R.p([30, 32]);
   return [T(`Hvor mange ATP kan en celle lage av ${g} glukosemolekyler med oksygen, når hvert gir ${atp} ATP?`, `How many ATP can a cell make from ${g} glucose molecules with oxygen, when each gives ${atp} ATP?`), { n: g * atp, tol: 0, u: "" },
     T(`$${g} \\cdot ${atp} = ${g * atp}$ ATP. Uten oksygen ville det bare blitt $${2 * g}$.`, `$${g} \\cdot ${atp} = ${g * atp}$ ATP. Without oxygen it would only be $${2 * g}$.`)]; }
);
const B1_MANG = ADDUNIT("VGBI1", "Biologisk mangfold og klassifisering", "Biodiversity and classification");
TH("VGBI1", B1_MANG, `## Hva handler det om?
Det finnes kanskje 8–10 millioner arter på jorda. For å holde orden på dem sorterer biologene dem i grupper etter slektskap. Biologisk mangfold er variasjonen av gener, arter og økosystemer, og det er under press.

## Begreper og formler
- Systematikk: **rike → rekke → klasse → orden → familie → slekt → art**. Huskeregel: «Rare Rotter Klatrer Ofte Fra Store Aper».
- Vitenskapelig navn: slekt + art, for eksempel *Homo sapiens* og *Canis lupus* (ulv).
- Tre domener: **bakterier**, **arker** og **eukaryoter** (planter, dyr, sopp og protister).
- Biologisk mangfold på tre nivåer: genetisk mangfold, artsmangfold og økosystemmangfold.
- De største truslene: arealendringer (tap av leveområder), klimaendringer, forurensning, fremmede arter og overhøsting.
- **Rødlista** viser arter som er truet i Norge.
- Nøkkelart: en art som mange andre arter er avhengige av, for eksempel bever eller tareskog.

> Jo mer mangfold, jo mer robust er et økosystem mot endringer.`,
`## What is it about?
There may be 8–10 million species on Earth. To keep track of them, biologists sort them into groups by relationship. Biodiversity is the variety of genes, species and ecosystems, and it is under pressure.

## Concepts and formulas
- Taxonomy: **kingdom → phylum → class → order → family → genus → species**.
- Scientific name: genus + species, for example *Homo sapiens* and *Canis lupus* (wolf).
- Three domains: **bacteria**, **archaea** and **eukaryotes** (plants, animals, fungi and protists).
- Biodiversity on three levels: genetic diversity, species diversity and ecosystem diversity.
- The biggest threats: land-use change (habitat loss), climate change, pollution, invasive species and overharvesting.
- The **Red List** shows species that are threatened in Norway.
- Keystone species: a species that many other species depend on, for example beavers or kelp forests.

> The more diversity, the more robust an ecosystem is against change.`);
BIQ("VGBI1", B1_MANG, [
 ["Hva er det minste nivået i systematikken?", ["Art", "Slekt", "Familie", "Rike"], "Rekkefølgen er rike, rekke, klasse, orden, familie, slekt, art.", "What is the lowest level in taxonomy?", ["Species", "Genus", "Family", "Kingdom"], "The order is kingdom, phylum, class, order, family, genus, species."],
 ["Hva er den største trusselen mot artsmangfoldet i Norge?", ["Arealendringer (tap av leveområder)", "Vulkanutbrudd", "Meteoritter", "Sykdom hos mennesker"], "Nedbygging og endret arealbruk tar leveområdene til flest arter.", "What is the biggest threat to species diversity in Norway?", ["Land-use change (habitat loss)", "Volcanic eruptions", "Meteorites", "Human disease"], "Development and changed land use take away the habitats of most species."],
 ["Hvilket domene hører sopp til?", ["Eukaryoter", "Bakterier", "Arker", "Virus"], "Sopp har celler med cellekjerne, akkurat som dyr og planter.", "Which domain do fungi belong to?", ["Eukaryotes", "Bacteria", "Archaea", "Viruses"], "Fungi have cells with a nucleus, just like animals and plants."],
 ["Hva betyr slektsnavnet i *Homo sapiens*?", ["Homo er slekten, sapiens er arten", "Homo er arten", "Det er familien", "Det er riket"], "Linnés binomiale navnsystem: slekt + artsepitet.", "What does the genus name in *Homo sapiens* mean?", ["Homo is the genus, sapiens the species", "Homo is the species", "It is the family", "It is the kingdom"], "Linnaeus's binomial naming: genus + species epithet."],
 ["Hvorfor er genetisk mangfold viktig innen en art?", ["Det gir større sjanse for at noen tåler nye sykdommer og endringer", "Det gjør dyrene større", "Det er ikke viktig", "Det gir flere arter"], "Lite genetisk variasjon gjør bestanden sårbar, som ved innavl.", "Why is genetic diversity within a species important?", ["It increases the chance that some can tolerate new diseases and changes", "It makes the animals bigger", "It isn't important", "It gives more species"], "Little genetic variation makes a population vulnerable, as with inbreeding."]
]);

// ================= BIOLOGI 2 =================
TH("VGBI2", 0, `## Hva handler det om?
DNA er oppskriften, proteiner er det som gjør jobben. Veien fra gen til protein går i to steg: **transkripsjon** og **translasjon**. Dette kalles «det sentrale dogmet».

## Begreper og formler
- **Transkripsjon** (i cellekjernen): DNA → mRNA. RNA-polymerase leser malstrengen, og i RNA er T byttet ut med U.
- Hos eukaryoter klippes **introner** bort, og **eksoner** skjøtes sammen (spleising).
- **Translasjon** (i ribosomet): mRNA → protein. Tre og tre baser (et **kodon**) koder for én aminosyre.
- tRNA har et **antikodon** som passer til kodonet, og bærer riktig aminosyre.
- Startkodon: AUG. Stoppkodoner: UAA, UAG og UGA.
- $4^3 = 64$ kodoner, men bare 20 aminosyrer: flere kodoner kan gi samme aminosyre.
- **Genregulering**: ikke alle gener er på hele tiden. Derfor blir en muskelcelle og en nervecelle ulike, selv om de har samme DNA.

### Eksempel
DNA-malstreng: TAC GGA → mRNA: AUG CCU → aminosyrer: metionin–prolin.

> DNA → (transkripsjon) → mRNA → (translasjon) → protein.`,
`## What is it about?
DNA is the recipe, proteins do the work. The path from gene to protein has two steps: **transcription** and **translation**. This is called "the central dogma".

## Concepts and formulas
- **Transcription** (in the nucleus): DNA → mRNA. RNA polymerase reads the template strand, and in RNA T is replaced by U.
- In eukaryotes **introns** are cut out, and **exons** are joined together (splicing).
- **Translation** (in the ribosome): mRNA → protein. Three bases at a time (a **codon**) code for one amino acid.
- tRNA has an **anticodon** that matches the codon and carries the right amino acid.
- Start codon: AUG. Stop codons: UAA, UAG and UGA.
- $4^3 = 64$ codons, but only 20 amino acids: several codons can give the same amino acid.
- **Gene regulation**: not all genes are on all the time. That is why a muscle cell and a nerve cell are different, even though they have the same DNA.

### Example
DNA template strand: TAC GGA → mRNA: AUG CCU → amino acids: methionine–proline.

> DNA → (transcription) → mRNA → (translation) → protein.`);
BIQ("VGBI2", 0, [
 ["Hvilken base finnes i RNA, men ikke i DNA?", ["Uracil (U)", "Tymin (T)", "Adenin (A)", "Guanin (G)"], "I RNA er tymin byttet ut med uracil.", "Which base is found in RNA but not in DNA?", ["Uracil (U)", "Thymine (T)", "Adenine (A)", "Guanine (G)"], "In RNA thymine is replaced by uracil."],
 ["Hvor mange baser er det i ett kodon?", { n: 3, tol: 0, u: "" }, "Et kodon er en triplett: 3 baser.", "How many bases are in one codon?", null, "A codon is a triplet: 3 bases."],
 ["Hvor skjer translasjonen?", ["I ribosomene", "I cellekjernen", "I mitokondriene", "I cellemembranen"], "mRNA går ut av kjernen til ribosomene, der proteinet bygges.", "Where does translation take place?", ["In the ribosomes", "In the nucleus", "In the mitochondria", "In the cell membrane"], "mRNA leaves the nucleus for the ribosomes, where the protein is built."],
 ["Hva er startkodonet?", ["AUG", "UAA", "GGG", "TAC"], "AUG koder for metionin og starter translasjonen.", "What is the start codon?", ["AUG", "UAA", "GGG", "TAC"], "AUG codes for methionine and starts translation."],
 ["Hvor mange mulige kodoner finnes?", { n: 64, tol: 0, u: "" }, "Fire baser på tre plasser: $4^3 = 64$.", "How many possible codons are there?", null, "Four bases in three positions: $4^3 = 64$."],
 ["Hvorfor er en nervecelle og en muskelcelle forskjellige når de har samme DNA?", ["Ulike gener er slått på (genregulering)", "De har ulikt DNA", "Nerveceller har ikke DNA", "Det er tilfeldig"], "Cellene uttrykker ulike gener.", "Why are a nerve cell and a muscle cell different when they have the same DNA?", ["Different genes are switched on (gene regulation)", "They have different DNA", "Nerve cells have no DNA", "It is random"], "The cells express different genes."]
]);
GEN("VGBI2", 0,
 () => { const comp = { A: "U", T: "A", C: "G", G: "C" }, s = Array.from({ length: 6 }, () => R.p(["A", "T", "C", "G"])).join(""), m = [...s].map(b => comp[b]).join("");
   return [T(`DNA-malstrengen er ${s}. Hva blir mRNA? Skriv svaret som antall U-er i mRNA-et.`, `The DNA template strand is ${s}. What is the mRNA? Give the number of U's in the mRNA.`), { n: [...m].filter(x => x === "U").length, tol: 0, u: "" },
     T(`A → U, T → A, C → G, G → C: mRNA er ${m}, med ${[...m].filter(x => x === "U").length} U-er.`, `A → U, T → A, C → G, G → C: the mRNA is ${m}, with ${[...m].filter(x => x === "U").length} U's.`)]; },
 () => { const aa = R.i(50, 400), b = 3 * (aa + 1);
   return [T(`Et protein har ${aa} aminosyrer. Hvor mange baser må mRNA-et minst ha i den kodende delen (inkludert stoppkodon)?`, `A protein has ${aa} amino acids. How many bases must the mRNA at least have in the coding part (including the stop codon)?`), { n: b, tol: 0, u: "" },
     T(`3 baser per aminosyre pluss ett stoppkodon: $3 \\cdot (${aa} + 1) = ${b}$.`, `3 bases per amino acid plus one stop codon: $3 \\cdot (${aa} + 1) = ${b}$.`)]; }
);
TH("VGBI2", 1, `## Hva handler det om?
Bioteknologi er å bruke levende organismer og DNA til å lage produkter og løse problemer: insulin fra bakterier, genterapi, CRISPR og DNA-profiler i kriminalsaker.

## Begreper og formler
- **PCR** (polymerasekjedereaksjon) kopierer en DNA-bit mange ganger. Etter $n$ runder er det $2^n$ kopier.
- **Gelelektroforese** sorterer DNA-biter etter størrelse: små biter vandrer lengst.
- **Restriksjonsenzymer** klipper DNA ved bestemte sekvenser.
- **Rekombinant DNA**: et gen settes inn i et plasmid og inn i en bakterie, som så lager proteinet (for eksempel insulin).
- **CRISPR-Cas9** er en «gensaks» som kan redigere DNA på et presist sted.
- **GMO**: genmodifiserte organismer. I Norge reguleres de strengt av genteknologiloven.
- **DNA-profil**: variasjon i korte repeterte sekvenser gjør hver person unik (unntatt eneggede tvillinger).

> PCR kopierer, elektroforese sorterer, CRISPR redigerer.`,
`## What is it about?
Biotechnology is using living organisms and DNA to make products and solve problems: insulin from bacteria, gene therapy, CRISPR and DNA profiles in criminal cases.

## Concepts and formulas
- **PCR** (polymerase chain reaction) copies a piece of DNA many times. After $n$ cycles there are $2^n$ copies.
- **Gel electrophoresis** sorts DNA fragments by size: small fragments travel furthest.
- **Restriction enzymes** cut DNA at specific sequences.
- **Recombinant DNA**: a gene is inserted into a plasmid and into a bacterium, which then makes the protein (for example insulin).
- **CRISPR-Cas9** is a "gene scissors" that can edit DNA at a precise location.
- **GMO**: genetically modified organisms. In Norway they are strictly regulated.
- **DNA profile**: variation in short repeated sequences makes each person unique (except identical twins).

> PCR copies, electrophoresis sorts, CRISPR edits.`);
BIQ("VGBI2", 1, [
 ["Hva gjør PCR?", ["Lager mange kopier av en DNA-bit", "Klipper DNA", "Sorterer DNA etter størrelse", "Lager proteiner"], "Varme, kjøling og DNA-polymerase dobler DNA-et i hver runde.", "What does PCR do?", ["Makes many copies of a piece of DNA", "Cuts DNA", "Sorts DNA by size", "Makes proteins"], "Heating, cooling and DNA polymerase double the DNA in each cycle."],
 ["Hvor mange kopier gir 10 PCR-runder fra ett DNA-molekyl?", { n: 1024, tol: 0, u: "" }, "$2^{10} = 1024$.", "How many copies do 10 PCR cycles give from one DNA molecule?", null, "$2^{10} = 1024$."],
 ["Hvilke DNA-biter vandrer lengst i en gel?", ["De minste", "De største", "Alle like langt", "De med mest G"], "Små biter kommer lettest gjennom nettet i gelen.", "Which DNA fragments travel furthest in a gel?", ["The smallest", "The largest", "All equally far", "Those with the most G"], "Small fragments pass most easily through the mesh of the gel."],
 ["Hvordan lager man insulin til diabetikere i dag?", ["Genmodifiserte bakterier eller gjær", "Fra griser", "Syntetisk av olje", "Fra planter"], "Det menneskelige insulingenet settes inn i mikroorganismer.", "How is insulin for diabetics made today?", ["Genetically modified bacteria or yeast", "From pigs", "Synthetically from oil", "From plants"], "The human insulin gene is inserted into microorganisms."],
 ["Hva er CRISPR-Cas9?", ["Et verktøy for å redigere DNA på et bestemt sted", "Et virus", "En vaksine", "En type PCR"], "En guide-RNA finner stedet, og Cas9 klipper.", "What is CRISPR-Cas9?", ["A tool for editing DNA at a specific site", "A virus", "A vaccine", "A type of PCR"], "A guide RNA finds the site, and Cas9 cuts."]
]);
GEN("VGBI2", 1,
 () => { const n = R.i(5, 30), c = 2 ** n;
   return [T(`Hvor mange kopier har du etter ${n} PCR-runder, startet fra ett DNA-molekyl?`, `How many copies do you have after ${n} PCR cycles, starting from one DNA molecule?`), { n: c, tol: 0, u: "" },
     T(`Dobling hver runde: $2^{${n}} = ${nf(c, 0)}$.`, `Doubling each cycle: $2^{${n}} = ${nf(c, 0)}$.`)]; }
);
TH("VGBI2", 2, `## Hva handler det om?
Kroppen styres av to systemer: **nervesystemet** (raskt, elektrisk) og **hormonsystemet** (langsommere, kjemisk via blodet). Sammen holder de kroppen i balanse (homeostase).

## Begreper og formler
- En **nervecelle** (nevron) har dendritter (inn), cellekropp, akson (ut) og synapser.
- **Hvilepotensial** ca. $-70$ mV. Et **aksjonspotensial** er en rask endring der Na⁺ strømmer inn og K⁺ strømmer ut.
- I **synapsen** frigjøres signalstoffer (for eksempel dopamin og serotonin) som binder seg til reseptorer på neste celle.
- **Myelin** isolerer aksonet og gjør signalet mye raskere.
- **Refleks**: signalet går via ryggmargen uten å gå om hjernen først, derfor er det så raskt.
- **Hormoner**: insulin senker blodsukkeret, glukagon øker det. Adrenalin gjør kroppen klar for «kamp eller flukt».
- **Negativ tilbakekobling**: et avvik fører til en respons som motvirker avviket (blodsukker, temperatur).

> Nerver: raskt og presist. Hormoner: langsomt og i hele kroppen.`,
`## What is it about?
The body is controlled by two systems: the **nervous system** (fast, electrical) and the **endocrine system** (slower, chemical via the blood). Together they keep the body in balance (homeostasis).

## Concepts and formulas
- A **nerve cell** (neuron) has dendrites (in), a cell body, an axon (out) and synapses.
- **Resting potential** about $-70$ mV. An **action potential** is a rapid change where Na⁺ flows in and K⁺ flows out.
- In the **synapse** neurotransmitters (for example dopamine and serotonin) are released and bind to receptors on the next cell.
- **Myelin** insulates the axon and makes the signal much faster.
- **Reflex**: the signal goes via the spinal cord without going through the brain first, which is why it is so fast.
- **Hormones**: insulin lowers blood sugar, glucagon raises it. Adrenaline prepares the body for "fight or flight".
- **Negative feedback**: a deviation causes a response that counteracts it (blood sugar, temperature).

> Nerves: fast and precise. Hormones: slow and throughout the body.`);
BIQ("VGBI2", 2, [
 ["Hva er hvilepotensialet til en nervecelle, omtrent?", { n: -70, tol: 0, u: "mV" }, "Innsiden er negativ, rundt $-70$ mV.", "Roughly what is the resting potential of a nerve cell?", null, "The inside is negative, around $-70$ mV."],
 ["Hvilket hormon senker blodsukkeret?", ["Insulin", "Glukagon", "Adrenalin", "Tyroksin"], "Insulin fra bukspyttkjertelen får cellene til å ta opp glukose.", "Which hormone lowers blood sugar?", ["Insulin", "Glucagon", "Adrenaline", "Thyroxine"], "Insulin from the pancreas makes cells take up glucose."],
 ["Hva gjør myelin?", ["Isolerer aksonet og gjør signalet raskere", "Lager signalstoffer", "Bremser signalet", "Lagrer energi"], "Signalet hopper mellom hullene i myelinet (Ranviers innsnøringer).", "What does myelin do?", ["Insulates the axon and makes the signal faster", "Makes neurotransmitters", "Slows the signal", "Stores energy"], "The signal jumps between the gaps in the myelin (nodes of Ranvier)."],
 ["Hvorfor er en refleks så rask?", ["Signalet går via ryggmargen, ikke om hjernen", "Refleksen bruker hormoner", "Musklene tenker selv", "Den er ikke rask"], "Refleksbuen er kort: sansecelle → ryggmarg → muskel.", "Why is a reflex so fast?", ["The signal goes via the spinal cord, not through the brain", "The reflex uses hormones", "The muscles think for themselves", "It isn't fast"], "The reflex arc is short: sensory cell → spinal cord → muscle."],
 ["Hvilket ion strømmer inn i cellen når et aksjonspotensial starter?", ["$\\text{Na}^+$", "$\\text{K}^+$", "$\\text{Cl}^-$", "$\\text{Ca}^{2+}$"], "Natriumkanaler åpnes, og innsiden blir positiv.", "Which ion flows into the cell when an action potential starts?", ["$\\text{Na}^+$", "$\\text{K}^+$", "$\\text{Cl}^-$", "$\\text{Ca}^{2+}$"], "Sodium channels open, and the inside becomes positive."]
]);
GEN("VGBI2", 2,
 () => { const v = R.p([1, 2, 5, 50, 100, 120]), L = R.p([0.5, 1, 1.5]), t = L / v * 1000;
   return [T(`Et nervesignal går ${v} m/s gjennom en nerve som er ${nf(L)} m lang. Hvor mange millisekunder tar det?`, `A nerve signal travels at ${v} m/s through a nerve that is ${nf(L)} m long. How many milliseconds does it take?`), { n: t, tol: rel(t, 0.01), u: "ms" },
     T(`$t = \\dfrac{${mf(L)}}{${v}} = ${mf(t / 1000, 4)}$ s $= ${mf(t, 2)}$ ms. ${v >= 50 ? "Myelin gjør signalet raskt." : "Umyeliniserte nerver er langsomme."}`, `$t = \\dfrac{${mf(L)}}{${v}} = ${mf(t / 1000, 4)}$ s $= ${mf(t, 2)}$ ms. ${v >= 50 ? "Myelin makes the signal fast." : "Unmyelinated nerves are slow."}`)]; }
);
TH("VGBI2", 3, `## Hva handler det om?
Immunforsvaret beskytter kroppen mot bakterier, virus og andre fremmede ting. Det har to deler: det **medfødte** (raskt, men generelt) og det **ervervede** (tregere første gang, men treffsikkert og med hukommelse).

## Begreper og formler
- Første forsvarslinje: hud, slimhinner, magesyre.
- **Medfødt immunforsvar**: betennelse, feber og **fagocytter** (etesceller) som spiser inntrengere.
- **Ervervet immunforsvar**: **B-celler** lager **antistoffer**, **T-celler** dreper infiserte celler og styrer responsen.
- **Antigen**: det immunforsvaret kjenner igjen (for eksempel et protein på et virus).
- **Hukommelsesceller** gjør at kroppen reagerer mye raskere andre gang.
- **Vaksine**: et ufarlig antigen som lærer kroppen å kjenne igjen smittestoffet uten å bli syk.
- **Flokkimmunitet**: når mange nok er immune, sprer smitten seg ikke, og de som ikke kan vaksineres, beskyttes.
- Antibiotika virker på bakterier, **ikke** på virus.

> Vaksiner lærer immunforsvaret å kjenne igjen fienden før den kommer.`,
`## What is it about?
The immune system protects the body against bacteria, viruses and other foreign things. It has two parts: the **innate** (fast but general) and the **adaptive** (slower the first time, but precise and with memory).

## Concepts and formulas
- First line of defence: skin, mucous membranes, stomach acid.
- **Innate immunity**: inflammation, fever and **phagocytes** (eating cells) that engulf invaders.
- **Adaptive immunity**: **B cells** make **antibodies**, **T cells** kill infected cells and direct the response.
- **Antigen**: what the immune system recognises (for example a protein on a virus).
- **Memory cells** make the body respond much faster the second time.
- **Vaccine**: a harmless antigen that teaches the body to recognise the pathogen without getting ill.
- **Herd immunity**: when enough people are immune, the infection does not spread, and those who cannot be vaccinated are protected.
- Antibiotics work on bacteria, **not** on viruses.

> Vaccines teach the immune system to recognise the enemy before it arrives.`);
BIQ("VGBI2", 3, [
 ["Hvilke celler lager antistoffer?", ["B-celler (plasmaceller)", "T-celler", "Røde blodceller", "Nerveceller"], "B-celler blir til plasmaceller som skiller ut antistoffer.", "Which cells make antibodies?", ["B cells (plasma cells)", "T cells", "Red blood cells", "Nerve cells"], "B cells become plasma cells that secrete antibodies."],
 ["Virker antibiotika mot forkjølelse?", ["Nei, forkjølelse skyldes virus", "Ja, alltid", "Bare hos barn", "Ja, hvis man tar mye"], "Antibiotika virker på bakterier. Feil bruk gir resistens.", "Do antibiotics work against the common cold?", ["No, colds are caused by viruses", "Yes, always", "Only in children", "Yes, if you take a lot"], "Antibiotics work on bacteria. Wrong use leads to resistance."],
 ["Hvorfor blir man sjelden syk to ganger av vannkopper?", ["Hukommelsesceller gjenkjenner viruset raskt", "Viruset dør ut", "Man blir resistent mot alle virus", "Det er flaks"], "Den andre responsen er rask og sterk.", "Why does one rarely get chickenpox twice?", ["Memory cells recognise the virus quickly", "The virus dies out", "You become resistant to all viruses", "It is luck"], "The second response is fast and strong."],
 ["Hva er et antigen?", ["Noe immunforsvaret kjenner igjen som fremmed", "Et antistoff", "En hvit blodcelle", "Et hormon"], "Ofte proteiner på overflaten av bakterier og virus.", "What is an antigen?", ["Something the immune system recognises as foreign", "An antibody", "A white blood cell", "A hormone"], "Often proteins on the surface of bacteria and viruses."],
 ["Hva er flokkimmunitet?", ["At nok mange er immune til at smitten ikke sprer seg", "At dyr er immune", "At alle har vært syke", "En type vaksine"], "Beskytter også dem som ikke kan vaksineres.", "What is herd immunity?", ["Enough people being immune that the infection does not spread", "Animals being immune", "Everyone having been ill", "A type of vaccine"], "It also protects those who cannot be vaccinated."]
]);
GEN("VGBI2", 3,
 () => { const R0 = R.p([2, 3, 4, 5, 10, 15]), p = (1 - 1 / R0) * 100;
   return [T(`En sykdom har basisreproduksjonstall $R_0 = ${R0}$. Hvor stor andel må være immune for flokkimmunitet?`, `A disease has a basic reproduction number $R_0 = ${R0}$. What share must be immune for herd immunity?`), { n: p, tol: 0.2, u: "%" },
     T(`Terskel: $1 - \\dfrac{1}{R_0} = 1 - \\dfrac{1}{${R0}} = ${mf(p, 1)}$ %.`, `Threshold: $1 - \\dfrac{1}{R_0} = 1 - \\dfrac{1}{${R0}} = ${mf(p, 1)}$ %.`)]; },
 () => { const n0 = R.p([1, 10, 100]), dt = R.p([20, 30]), h = R.p([2, 3, 4, 5]), n = n0 * 2 ** (h * 60 / dt);
   return [T(`En bakterie deler seg hvert ${dt}. minutt. Du starter med ${n0}. Hvor mange er det etter ${h} timer?`, `A bacterium divides every ${dt} minutes. You start with ${n0}. How many are there after ${h} hours?`), { n, tol: rel(n, 0.001), u: "" },
     T(`${h * 60 / dt} delinger: $${n0} \\cdot 2^{${h * 60 / dt}} = ${nf(n, 0)}$.`, `${h * 60 / dt} divisions: $${n0} \\cdot 2^{${h * 60 / dt}} = ${nf(n, 0)}$.`)]; }
);
})();
