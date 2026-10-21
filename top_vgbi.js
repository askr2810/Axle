// Teoribok – emnesider for Biologi 1 og Biologi 2 (VGBI1, VGBI2), LK20, med regnesjekk (chk) der eksemplet har tall (AX-18).
// Test: node tools/test_topics.js top_vgbi.js og node tools/test_examples.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VGBI1 0: Cellen ----------
TOPICS("VGBI1", 0, [
{ id: "kromosomer", chk: ["23*2 ≈ 46", "46/2 ≈ 23"],
  nb: O("Kromosomer hos mennesket",
    R`Arvestoffet i en menneskelig kroppscelle ligger i 23 par kromosomer, altså 46 til sammen. Ett kromosom i hvert par kommer fra mor og ett fra far. Kjønnsceller lages ved meiose og har bare ett sett, 23 kromosomer, slik at barnet igjen får 46 når egg og sædcelle smelter sammen. Mitose, som brukes til vekst og reparasjon, gir to celler som hver har de samme 46. Bakterier er prokaryote og har ikke denne cellekjernen. DNA-et deres ligger fritt i cellen.`,
    [[R`46 = 23 \cdot 2`, "kroppscelle, to sett"], [R`23 = 46/2`, "kjønnscelle, ett sett"]],
    [["23", "antall par i en kroppscelle", ""], ["46", "kromosomer i en kroppscelle", ""]],
    R`En kroppscelle: $23 \cdot 2 = 46$ kromosomer.
En kjønnscelle: $46/2 = 23$ kromosomer.`,
    R`Mitose endrer ikke kromosomtallet. Meiose halverer det.`),
  en: O("Human chromosomes",
    R`The genetic material in a human body cell lies in 23 pairs of chromosomes, 46 in all. One chromosome in each pair comes from the mother and one from the father. Sex cells are made by meiosis and have only one set, 23 chromosomes, so the child again gets 46 when egg and sperm fuse. Mitosis, used for growth and repair, gives two cells that each have the same 46. Bacteria are prokaryotic and do not have this nucleus. Their DNA lies free in the cell.`,
    [[R`46 = 23 \cdot 2`, "body cell, two sets"], [R`23 = 46/2`, "sex cell, one set"]],
    [["23", "number of pairs in a body cell", ""], ["46", "chromosomes in a body cell", ""]],
    R`A body cell: $23 \cdot 2 = 46$ chromosomes.
A sex cell: $46/2 = 23$ chromosomes.`,
    R`Mitosis does not change the chromosome number. Meiosis halves it.`) },
{ id: "cellemembran", chk: ["2 ≈ 2"],
  nb: O("Cellemembranen",
    R`Cellemembranen er et dobbelt lag av fosfolipider, med proteiner lagt inn i laget. Hvert fosfolipid har et hode som trives i vann, og to haler som skyr vann. Hodene peker ut mot vannet på begge sider, og halene møtes inni. Derfor blir det to lag, ikke ett. Små upolare molekyler kan smette mellom halene. Ioner og store molekyler må gjennom proteiner, eller fraktes aktivt med energi. Plantecellen har i tillegg en stiv cellevegg utenpå membranen.`,
    [[R`2\ \text{lag}`, "fosfolipider i membranen"]],
    [["hode", "vender mot vann", ""], ["hale", "vender bort fra vann", ""]],
    R`Membranen er et dobbelt lag, altså 2 lag fosfolipider.
Hodene ut, halene inn.`,
    R`Aktiv transport krever ATP. Diffusjon og osmose gjør ikke det.`),
  en: O("The cell membrane",
    R`The cell membrane is a double layer of phospholipids, with proteins set into the layer. Each phospholipid has a head that is at home in water and two tails that avoid water. The heads point out towards the water on both sides, and the tails meet inside. That is why there are two layers, not one. Small nonpolar molecules can slip between the tails. Ions and large molecules must pass through proteins, or be carried actively with energy. The plant cell also has a stiff cell wall outside the membrane.`,
    [[R`2\ \text{layers}`, "phospholipids in the membrane"]],
    [["head", "faces the water", ""], ["tail", "faces away from water", ""]],
    R`The membrane is a double layer, that is 2 layers of phospholipids.
Heads out, tails in.`,
    R`Active transport needs ATP. Diffusion and osmosis do not.`) },
{ id: "osmose",
  nb: O("Osmose",
    R`Osmose er diffusjon av vann gjennom en membran som slipper vann igjennom, men holder igjen oppløst stoff. Vannet går dit det er høyest konsentrasjon av oppløst stoff, altså dit vannkonsentrasjonen er lavest. Legger du en celle i sterkt saltvann, går vann ut og cellen skrumper. I rent vann kan en dyrecelle ta opp så mye vann at den sprekker. Plantecellen tåler det bedre, fordi celleveggen stopper utvidelsen. Osmose krever ikke ATP.`,
    [[R`\text{vann} \rightarrow \text{høyere konsentrasjon av oppløst stoff}`, "retningen i osmose"]],
    [["membran", "slipper vann igjennom", ""]],
    R`En celle i sterkt saltvann mister vann og skrumper.
I rent vann tar den opp vann.`,
    R`Sammenlign alltid konsentrasjonen utenfor med den inni, ikke bare med «mye» eller «lite» salt.`),
  en: O("Osmosis",
    R`Osmosis is diffusion of water through a membrane that lets water through but holds back dissolved substance. The water goes to where the concentration of dissolved substance is highest, that is where the water concentration is lowest. If you put a cell in very salty water, water leaves and the cell shrinks. In pure water an animal cell can take up so much water that it bursts. The plant cell tolerates it better, because the cell wall stops the swelling. Osmosis does not need ATP.`,
    [[R`\text{water} \rightarrow \text{higher concentration of solute}`, "the direction in osmosis"]],
    [["membrane", "lets water through", ""]],
    R`A cell in very salty water loses water and shrinks.
In pure water it takes up water.`,
    R`Always compare the concentration outside with the one inside, not only with "a lot" or "a little" salt.`) }
]);

// ---------- VGBI1 1: Arv og genetikk ----------
TOPICS("VGBI1", 1, [
{ id: "krysning-aa", chk: ["1/4*100 ≈ 25", "1+2+1 ≈ 4"],
  nb: O("Krysning Aa ganger Aa",
    R`Et dominant allel, skrevet A, skjuler et recessivt allel a. En person som er Aa, viser den dominante egenskapen, men kan gi videre begge alleler. Når to slike får barn, lager du et krysningsskjema med A og a fra hver. De fire rutene er like sannsynlige. Tre av dem har minst ett A og viser den dominante egenskapen. Bare ruten aa viser den recessive. Det er grunnen til at en recessiv egenskap kan hoppe over en generasjon og dukke opp igjen hos barn av to bærere.`,
    [[R`\mathrm{Aa} \times \mathrm{Aa}`, "begge er bærere"]],
    [["A", "dominant allel", ""], ["a", "recessivt allel", ""]],
    R`Rutene er AA, Aa, aA og aa. Forholdet er $1 + 2 + 1 = 4$ like utfall.
Sannsynlighet for aa: $1/4 \cdot 100 = 25$ %.`,
    R`Aa og aA er den samme genotypen. Ikke tell dem som to ulike egenskaper.`),
  en: O("A cross of Aa with Aa",
    R`A dominant allele, written A, masks a recessive allele a. A person who is Aa shows the dominant trait, but can pass on both alleles. When two such people have a child, you make a Punnett square with A and a from each. The four cells are equally likely. Three of them have at least one A and show the dominant trait. Only the cell aa shows the recessive trait. That is why a recessive trait can skip a generation and appear again in the children of two carriers.`,
    [[R`\mathrm{Aa} \times \mathrm{Aa}`, "both are carriers"]],
    [["A", "dominant allele", ""], ["a", "recessive allele", ""]],
    R`The cells are AA, Aa, aA and aa. The ratio is $1 + 2 + 1 = 4$ equally likely outcomes.
Probability of aa: $1/4 \cdot 100 = 25$%.`,
    R`Aa and aA are the same genotype. Do not count them as two different traits.`) },
{ id: "krysning-blandet", chk: ["1/2*100 ≈ 50"],
  nb: O("Krysning Aa ganger aa",
    R`Hvis den ene forelderen er Aa og den andre er aa, har bare den første et dominant allel å gi videre. Halvparten av kjønnscellene fra Aa bærer A, halvparten a. Alle kjønnscellene fra aa bærer a. Barna blir derfor Aa eller aa, i forholdet en til en. De som er Aa, viser den dominante egenskapen. De som er aa, viser den recessive. Dette skjemaet brukes ofte når man vil vite om et individ med dominant utseende er bærer, ved å krysse det med et recessivt individ.`,
    [[R`\mathrm{Aa} \times \mathrm{aa}`, "en bærer og en recessiv"]],
    [["Aa", "viser dominant egenskap", ""], ["aa", "viser recessiv egenskap", ""]],
    R`Avkommet blir Aa eller aa, like ofte.
Andel med dominant egenskap: $1/2 \cdot 100 = 50$ %.`,
    R`Et barn med den recessive egenskapen må ha fått a fra begge. Da er forelderen med dominant utseende bærer.`),
  en: O("A cross of Aa with aa",
    R`If one parent is Aa and the other is aa, only the first has a dominant allele to pass on. Half of the gametes from Aa carry A, half carry a. All the gametes from aa carry a. The children therefore become Aa or aa, in the ratio one to one. Those who are Aa show the dominant trait. Those who are aa show the recessive trait. This square is often used when you want to know whether an individual with a dominant appearance is a carrier, by crossing it with a recessive individual.`,
    [[R`\mathrm{Aa} \times \mathrm{aa}`, "one carrier and one recessive"]],
    [["Aa", "shows the dominant trait", ""], ["aa", "shows the recessive trait", ""]],
    R`The offspring are Aa or aa, equally often.
Share with the dominant trait: $1/2 \cdot 100 = 50$%.`,
    R`A child with the recessive trait must have received a from both. Then the parent with the dominant appearance is a carrier.`) },
{ id: "hardy-weinberg", chk: ["sqrt(0.01) ≈ 0.1", "1-0.1 ≈ 0.9", "2*0.9*0.1*100 ≈ 18"],
  nb: O("Hardy–Weinberg",
    R`I en stor populasjon der paringen er tilfeldig og det ikke skjer seleksjon, migrasjon eller mutasjon som monner, ligger allelfrekvensene stille. Kaller vi frekvensen av a for q og av A for p, er p pluss q lik 1. Andelen som viser en recessiv egenskap, er q i andre. Andelen bærere, Aa, er 2pq. Formelen brukes til å anslå hvor mange som bærer et skjult allel når du bare ser de recessive. Den er en modell. Virkelige populasjoner bryter ofte forutsetningene litt.`,
    [[R`p + q = 1`, "allelfrekvenser"], [R`2pq`, "andel bærere Aa"]],
    [["q^2", "andel med genotypen aa", ""], ["p", "frekvens av A", ""], ["q", "frekvens av a", ""]],
    R`1 % har genotypen aa, så $q^2 = 0{,}01$, $q = 0{,}1$ og $p = 1 - 0{,}1 = 0{,}9$.
Bærere: $2 \cdot 0{,}9 \cdot 0{,}1 \cdot 100 = 18$ %.`,
    R`18 % bærere er mye mer enn 1 % som viser egenskapen. De fleste recessive alleler sitter i bærere.`),
  en: O("Hardy-Weinberg",
    R`In a large population where mating is random and there is no selection, migration or mutation that matters, the allele frequencies stay put. If we call the frequency of a by q and of A by p, then p plus q equals 1. The share that shows a recessive trait is q squared. The share of carriers, Aa, is 2pq. The formula is used to estimate how many carry a hidden allele when you only see the recessive individuals. It is a model. Real populations often break the assumptions a little.`,
    [[R`p + q = 1`, "allele frequencies"], [R`2pq`, "share of carriers Aa"]],
    [["q^2", "share with genotype aa", ""], ["p", "frequency of A", ""], ["q", "frequency of a", ""]],
    R`1% have genotype aa, so $q^2 = 0{,}01$, $q = 0{,}1$ and $p = 1 - 0{,}1 = 0{,}9$.
Carriers: $2 \cdot 0{,}9 \cdot 0{,}1 \cdot 100 = 18$%.`,
    R`18% carriers is much more than the 1% who show the trait. Most recessive alleles sit in carriers.`) }
]);

// ---------- VGBI1 2: Økologi ----------
TOPICS("VGBI1", 2, [
{ id: "energipyramide", chk: ["100000*0.1 ≈ 10000", "10000*0.1 ≈ 1000"],
  nb: O("Energi i næringskjeden",
    R`Produsentene binder solenergi i organisk stoff. Når en konsument spiser, går bare omtrent 10 prosent av energien videre til neste trofiske nivå. Resten brukes til celleånding og tapes som varme. Derfor blir det mindre energi, og vanligvis færre dyr, for hvert ledd. Etter to ledd er det omtrent 1 prosent igjen. Stoffer som karbon og nitrogen går derimot i kretsløp. Energi gjør ikke det. Den må stadig fylles på fra sola.`,
    [[R`E_{n+1} \approx 0{,}1\, E_n`, "omtrent 10 prosent videre"]],
    [["E", "energi på nivået", "kJ"], ["0{,}1", "andelen som går videre", ""]],
    R`Produsentene har $100\,000$ kJ.
Planteeterne får $100\,000 \cdot 0{,}1 = 10\,000$ kJ, og rovdyrene $10\,000 \cdot 0{,}1 = 1000$ kJ.`,
    R`Ti prosent er en tommelfingerregel. Noen kjeder overfører mer, noen mindre.`),
  en: O("Energy in the food chain",
    R`The producers bind solar energy in organic matter. When a consumer eats, only about 10 percent of the energy passes on to the next trophic level. The rest is used in cellular respiration and lost as heat. There is therefore less energy, and usually fewer animals, at each step. After two steps about 1 percent is left. Matter such as carbon and nitrogen, on the other hand, cycles. Energy does not. It must keep being supplied from the Sun.`,
    [[R`E_{n+1} \approx 0{,}1\, E_n`, "about 10 percent passed on"]],
    [["E", "energy at the level", "kJ"], ["0{,}1", "the share passed on", ""]],
    R`The producers have $100\,000$ kJ.
The herbivores get $100\,000 \cdot 0{,}1 = 10\,000$ kJ, and the carnivores $10\,000 \cdot 0{,}1 = 1000$ kJ.`,
    R`Ten percent is a rule of thumb. Some chains transfer more, some less.`) },
{ id: "fangst-gjenfangst", chk: ["50*40/5 ≈ 400"],
  nb: O("Fangst og gjenfangst",
    R`Bestander som er vanskelige å telle direkte, kan anslås med fangst og gjenfangst. Du merker et antall individer, slipper dem ut og lar dem blande seg. Senere fanger du på nytt og ser hvor stor andel som er merket. Hvis de merkede har fordelt seg jevnt, er andelen merket i den andre fangsten omtrent lik andelen merket i hele bestanden. Metoden forutsetter at merkingen ikke endrer overlevelse eller fangst, og at bestanden ikke endrer seg mye mellom de to fangstene.`,
    [[R`N = \frac{n_1 \cdot n_2}{m}`, "anslått bestand"]],
    [["n_1", "merket første gang", ""], ["n_2", "fanget andre gang", ""], ["m", "av disse som er merket", ""], ["N", "bestanden", ""]],
    R`Du merker 50 fisk. Senere fanger du 40, og 5 er merket.
$N = 50 \cdot 40 / 5 = 400$ fisk.`,
    R`Er de merkede fiskene lettere å fange igjen, blir bestanden undervurdert.`),
  en: O("Capture and recapture",
    R`Populations that are hard to count directly can be estimated by capture and recapture. You mark a number of individuals, release them and let them mix. Later you catch again and see what share is marked. If the marked ones have spread evenly, the marked share in the second catch is about equal to the marked share in the whole population. The method assumes that marking does not change survival or catchability, and that the population does not change much between the two catches.`,
    [[R`N = \frac{n_1 \cdot n_2}{m}`, "estimated population"]],
    [["n_1", "marked the first time", ""], ["n_2", "caught the second time", ""], ["m", "of these that are marked", ""], ["N", "the population", ""]],
    R`You mark 50 fish. Later you catch 40, and 5 are marked.
$N = 50 \cdot 40 / 5 = 400$ fish.`,
    R`If the marked fish are easier to catch again, the population is underestimated.`) },
{ id: "bareevne",
  nb: O("Bæreevne",
    R`Bæreevnen er den største bestanden et miljø kan holde over tid. Når bestanden er liten og det er god plass og nok mat, vokser den raskt. Når den nærmer seg bæreevnen, blir mat, reirplasser eller sykdom begrensende, og veksten flater ut. Bestanden kan svinge rundt bæreevnen. Jakter du den ned langt under, kan den vokse fort igjen. Endrer miljøet seg, for eksempel ved at leveområdet bygges ned, endres også bæreevnen. Den er ikke et fast tall for arten.`,
    [[R`\text{vekst} \rightarrow 0\ \text{når bestanden nærmer seg bæreevnen}`, "logistisk vekst"]],
    [["K", "bæreevne", ""]],
    R`Under bæreevnen er det ledig mat, og bestanden kan vokse.
Over den blir dødeligheten høyere enn fødselsraten, og bestanden synker tilbake.`,
    R`Bæreevnen gjelder populasjonen i det miljøet, ikke hvor mye ett dyr kan bære.`),
  en: O("Carrying capacity",
    R`The carrying capacity is the largest population an environment can support over time. When the population is small and there is space and enough food, it grows quickly. As it approaches the carrying capacity, food, nesting sites or disease become limiting, and growth levels off. The population can swing around the carrying capacity. If you hunt it far below, it can grow quickly again. If the environment changes, for example because habitat is built on, the carrying capacity changes too. It is not a fixed number for the species.`,
    [[R`\text{growth} \rightarrow 0\ \text{as the population nears carrying capacity}`, "logistic growth"]],
    [["K", "carrying capacity", ""]],
    R`Below the carrying capacity there is food to spare, and the population can grow.
Above it the death rate exceeds the birth rate, and the population falls back.`,
    R`Carrying capacity applies to the population in that environment, not to how much one animal can carry.`) }
]);

// ---------- VGBI1 3: Evolusjon ----------
TOPICS("VGBI1", 3, [
{ id: "resistens", chk: ["20/1000*100 ≈ 2"],
  nb: O("Antibiotikaresistens",
    R`Naturlig seleksjon endrer hvor vanlige arvelige egenskaper er i en populasjon. Individene selv velger ikke å endre seg. Mutasjoner har allerede gitt variasjon. Når miljøet endres, får noen flere avkom enn andre, og deres alleler blir vanligere. Antibiotika er et slikt miljø. Bakterier som tilfeldigvis allerede tåler stoffet, overlever og deler seg. De andre dør. Feil bruk av antibiotika gjør denne seleksjonen sterkere. De eldste sporene av liv er omtrent 3,8 milliarder år, så det har vært god tid til slike endringer.`,
    [[R`\text{variasjon} + \text{seleksjon} + \text{arv}`, "evolusjon over generasjoner"]],
    [["mutasjon", "kilde til nye alleler", ""]],
    R`Tenk deg 1000 bakterier der 20 allerede tåler antibiotika.
Det er $20/1000 \cdot 100 = 2$ %. Etter kuren er det disse som formerer seg.`,
    R`Bakteriene lærer ikke. De som allerede var resistente, var det før antibiotikaen kom.`),
  en: O("Antibiotic resistance",
    R`Natural selection changes how common heritable traits are in a population. The individuals do not choose to change. Mutations have already produced variation. When the environment changes, some have more offspring than others, and their alleles become more common. An antibiotic is such an environment. Bacteria that already happen to tolerate the substance survive and divide. The others die. Wrong use of antibiotics makes this selection stronger. The oldest traces of life are about 3.8 billion years old, so there has been plenty of time for such changes.`,
    [[R`\text{variation} + \text{selection} + \text{inheritance}`, "evolution over generations"]],
    [["mutation", "source of new alleles", ""]],
    R`Imagine 1000 bacteria of which 20 already tolerate the antibiotic.
That is $20/1000 \cdot 100 = 2$%. After the treatment it is these that multiply.`,
    R`The bacteria do not learn. Those that were already resistant were so before the antibiotic arrived.`) },
{ id: "muldyr", chk: ["64/2+62/2 ≈ 63"],
  nb: O("Art og muldyr",
    R`Det biologiske artsbegrepet sier at individer hører til samme art når de kan få fruktbart avkom sammen. Hest og esel kan pare seg, og avkommet er et muldyr, men muldyret er sterilt. Derfor regnes hest og esel som to arter. Grunnen ligger i kromosomene. Hesten har 64 og eselet 62. Muldyr får ett sett fra hver, og de to settene parer dårlig under meiose. Uten en jevn paring blir det ikke funksjonelle kjønnsceller. Arter kan også oppstå når populasjoner blir skilt fra hverandre lenge nok til at de ikke lenger formerer seg sammen.`,
    [[R`32 + 31 = 63`, "kromosomer i et muldyr"]],
    [["hest", "64 kromosomer", ""], ["esel", "62 kromosomer", ""]],
    R`Hesten bidrar med $64/2 = 32$ og eselet med $62/2 = 31$.
Muldyr: $32 + 31 = 63$ kromosomer, og det er sterilt.`,
    R`At to dyr ligner, er ikke nok til at de er samme art. Se på avkommet.`),
  en: O("Species and the mule",
    R`The biological species concept says that individuals belong to the same species when they can have fertile offspring together. A horse and a donkey can mate, and the offspring is a mule, but the mule is sterile. Horse and donkey are therefore counted as two species. The reason lies in the chromosomes. The horse has 64 and the donkey 62. A mule gets one set from each, and the two sets pair poorly in meiosis. Without an even pairing there are no functional gametes. Species can also arise when populations are separated long enough that they no longer reproduce together.`,
    [[R`32 + 31 = 63`, "chromosomes in a mule"]],
    [["horse", "64 chromosomes", ""], ["donkey", "62 chromosomes", ""]],
    R`The horse contributes $64/2 = 32$ and the donkey $62/2 = 31$.
A mule: $32 + 31 = 63$ chromosomes, and it is sterile.`,
    R`That two animals look alike is not enough for them to be the same species. Look at the offspring.`) },
{ id: "artsdannelse",
  nb: O("Isolasjon og artsdannelse",
    R`En ny art oppstår ofte når en populasjon blir delt, for eksempel av et fjell, et hav eller en elv. Hver del får egne mutasjoner, og naturlig seleksjon kan trekke dem i hver sin retning hvis miljøene er ulike. Etter lang tid er forskjellene så store at individene ikke lenger får fruktbart avkom om de møtes igjen. Da er det to arter. Isolasjonen kan også være at de formerer seg til ulik tid, eller at de ikke kjenner igjen hverandres signaler. Tid og manglende genflyt er det som skal til.`,
    [[R`\text{isolasjon} + \text{tid} \rightarrow \text{to arter}`, "en vanlig vei til artsdannelse"]],
    [["genflyt", "utveksling av alleler mellom populasjoner", ""]],
    R`Så lenge individene fortsatt får fruktbart avkom sammen, er de samme art.
Når den utvekslingen stopper og forskjellene vokser, kan det bli to arter.`,
    R`Artsdannelse skjer i populasjonen over generasjoner, ikke ved at ett individ forvandler seg.`),
  en: O("Isolation and speciation",
    R`A new species often arises when a population is split, for example by a mountain, a sea or a river. Each part gets its own mutations, and natural selection can pull them in different directions if the environments differ. After a long time the differences are so large that the individuals no longer have fertile offspring if they meet again. Then there are two species. The isolation can also be that they reproduce at different times, or that they do not recognise each other's signals. Time and a lack of gene flow are what it takes.`,
    [[R`\text{isolation} + \text{time} \rightarrow \text{two species}`, "a common path to speciation"]],
    [["gene flow", "exchange of alleles between populations", ""]],
    R`As long as the individuals still have fertile offspring together, they are the same species.
When that exchange stops and the differences grow, there can be two species.`,
    R`Speciation happens in the population over generations, not by one individual transforming.`) }
]);

// ---------- VGBI1 4: Fotosyntese og celleånding ----------
TOPICS("VGBI1", 4, [
{ id: "fotosyntese-likning", chk: ["6*4 ≈ 24"],
  nb: O("Fotosynteselikningen",
    R`Fotosyntesen skjer i kloroplastene. Klorofyll fanger lys, særlig rødt og blått, og sender grønt tilbake. Derfor er blader grønne. Karbonet i glukose kommer fra karbondioksid, og oksygenet som slippes ut, kommer fra vannet. Seks karbondioksid og seks vann gir ett glukosemolekyl og seks oksygen. Skal planten lage flere glukosemolekyler, ganger du med det antallet. Celleåndingen i mitokondriene er den omvendte reaksjonen og slipper energien ut igjen som ATP.`,
    [[R`6\,\mathrm{CO}_2 + 6\,\mathrm{H}_2\mathrm{O} \rightarrow \mathrm{C}_6\mathrm{H}_{12}\mathrm{O}_6 + 6\,\mathrm{O}_2`, "fotosyntese, lys er med"]],
    [["6", "CO2 per glukose", ""], ["\\mathrm{C}_6", "seks karbon i glukose", ""]],
    R`Ett glukosemolekyl krever 6 CO2.
Fire glukosemolekyler krever $6 \cdot 4 = 24$ CO2.`,
    R`Oksygenet som avgis, er også seks per glukose. Ikke bytt om produktene.`),
  en: O("The photosynthesis equation",
    R`Photosynthesis happens in the chloroplasts. Chlorophyll captures light, especially red and blue, and sends green back. That is why leaves are green. The carbon in glucose comes from carbon dioxide, and the oxygen that is released comes from the water. Six carbon dioxide and six water give one glucose molecule and six oxygen. If the plant makes more glucose molecules, you multiply by that number. Cellular respiration in the mitochondria is the reverse reaction and releases the energy again as ATP.`,
    [[R`6\,\mathrm{CO}_2 + 6\,\mathrm{H}_2\mathrm{O} \rightarrow \mathrm{C}_6\mathrm{H}_{12}\mathrm{O}_6 + 6\,\mathrm{O}_2`, "photosynthesis, light is included"]],
    [["6", "CO2 per glucose", ""], ["\\mathrm{C}_6", "six carbons in glucose", ""]],
    R`One glucose molecule needs 6 CO2.
Four glucose molecules need $6 \cdot 4 = 24$ CO2.`,
    R`The oxygen released is also six per glucose. Do not swap the products.`) },
{ id: "atp-glukose", chk: ["8*30 ≈ 240", "8*2 ≈ 16"],
  nb: O("ATP fra glukose",
    R`ATP er energivalutaen cellen kan bruke direkte. Med oksygen gir celleåndingen omtrent 30 til 32 ATP per glukose. I oppgavene kan du regne med 30 når du skal ha ett tall. Uten oksygen stopper nedbrytingen etter glykolysen, som bare gir 2 ATP. Det kalles gjæring. I muskler blir restproduktet melkesyre. I gjærsopp blir det etanol og karbondioksid. Gjæring holder livet i gang en kort stund, men den gir langt mindre energi enn ånding med oksygen.`,
    [[R`1\ \text{glukose} \rightarrow \text{ca. } 30\ \text{ATP}`, "med oksygen"], [R`1\ \text{glukose} \rightarrow 2\ \text{ATP}`, "gjæring, uten oksygen"]],
    [["30", "ATP per glukose med oksygen, i oppgavene", ""], ["2", "ATP per glukose uten oksygen", ""]],
    R`Åtte glukosemolekyler med oksygen: $8 \cdot 30 = 240$ ATP.
De samme åtte uten oksygen: $8 \cdot 2 = 16$ ATP.`,
    R`30 til 32 er et intervall. Si hvilket tall du bruker når du regner.`),
  en: O("ATP from glucose",
    R`ATP is the energy currency the cell can use directly. With oxygen, cellular respiration gives about 30 to 32 ATP per glucose. In the problems you can reckon with 30 when you need a single number. Without oxygen the breakdown stops after glycolysis, which gives only 2 ATP. That is called fermentation. In muscles the leftover is lactic acid. In yeast it is ethanol and carbon dioxide. Fermentation keeps life going for a short time, but it gives far less energy than respiration with oxygen.`,
    [[R`1\ \text{glucose} \rightarrow \text{about } 30\ \text{ATP}`, "with oxygen"], [R`1\ \text{glucose} \rightarrow 2\ \text{ATP}`, "fermentation, without oxygen"]],
    [["30", "ATP per glucose with oxygen, in the problems", ""], ["2", "ATP per glucose without oxygen", ""]],
    R`Eight glucose molecules with oxygen: $8 \cdot 30 = 240$ ATP.
The same eight without oxygen: $8 \cdot 2 = 16$ ATP.`,
    R`30 to 32 is a range. Say which number you use when you calculate.`) },
{ id: "oksygen-faktor", chk: ["30/2 ≈ 15"],
  nb: O("Med og uten oksygen",
    R`Forskjellen mellom ånding med oksygen og gjæring er ikke en liten detalj. Bruker du 30 ATP med oksygen og 2 uten, gir oksygen femten ganger så mye ATP per glukose. Det er derfor vi ikke kan løpe lenge på melkesyregjæring alene, og hvorfor gjær bare lager litt alkohol før energien er knapp. Fotosyntesen hos plantene fyller på både glukose og oksygen. Uten den ville celleåndingen i de fleste økosystemer stoppe. De to prosessene holder karbonet i kretsløp.`,
    [[R`\frac{30}{2} = 15`, "ganger mer ATP med oksygen"]],
    [["30", "ATP med oksygen", ""], ["2", "ATP ved gjæring", ""]],
    R`Med tallene fra oppgavene: $30/2 = 15$.
Oksygen gir 15 ganger så mange ATP per glukose som gjæring.`,
    R`Musklene lager laktat, ikke etanol. Etanol er gjærsoppens produkt.`),
  en: O("With and without oxygen",
    R`The difference between respiration with oxygen and fermentation is not a small detail. If you use 30 ATP with oxygen and 2 without, oxygen gives fifteen times as much ATP per glucose. That is why we cannot run for long on lactic acid fermentation alone, and why yeast only makes a little alcohol before energy is scarce. Photosynthesis in plants replenishes both glucose and oxygen. Without it, cellular respiration in most ecosystems would stop. The two processes keep carbon cycling.`,
    [[R`\frac{30}{2} = 15`, "times more ATP with oxygen"]],
    [["30", "ATP with oxygen", ""], ["2", "ATP in fermentation", ""]],
    R`With the numbers from the problems: $30/2 = 15$.
Oxygen gives 15 times as many ATP per glucose as fermentation.`,
    R`Muscles make lactate, not ethanol. Ethanol is the product of yeast.`) }
]);

// ---------- VGBI1 5: Biologisk mangfold ----------
TOPICS("VGBI1", 5, [
{ id: "systematikk", chk: ["7 ≈ 7"],
  nb: O("Systematikk",
    R`For å holde orden på slektskapet sorteres livet i nivåer, fra store grupper til den enkelte arten. Rekkefølgen er rike, rekke, klasse, orden, familie, slekt og art. Det er sju nivåer. To arter i samme slekt er nærmere i slekt enn to arter som bare deler rike. Det vitenskapelige navnet er slekt pluss art, som Homo sapiens. Slekten skrives med stor forbokstav, arten med liten. Systemet gjør at biologer i ulike land snakker om samme organisme selv om daglignavnet er ulikt.`,
    [[R`\text{rike} \rightarrow \text{art}`, "sju nivåer, fra stort til lite"]],
    [["slekt", "første del av det vitenskapelige navnet", ""], ["art", "andre del", ""]],
    R`Rike, rekke, klasse, orden, familie, slekt og art.
Det er 7 nivåer. Homo er slekten, sapiens arten.`,
    R`Virus er ikke med i de tre domenene. De har ikke egne celler.`),
  en: O("Taxonomy",
    R`To keep track of relationships, life is sorted into levels, from large groups down to the single species. The order is kingdom, phylum, class, order, family, genus and species. That is seven levels. Two species in the same genus are more closely related than two species that only share a kingdom. The scientific name is genus plus species, as in Homo sapiens. The genus is written with a capital letter, the species with a small one. The system lets biologists in different countries talk about the same organism even when the everyday name differs.`,
    [[R`\text{kingdom} \rightarrow \text{species}`, "seven levels, from large to small"]],
    [["genus", "first part of the scientific name", ""], ["species", "second part", ""]],
    R`Kingdom, phylum, class, order, family, genus and species.
That is 7 levels. Homo is the genus, sapiens the species.`,
    R`Viruses are not in the three domains. They do not have cells of their own.`) },
{ id: "artsantall", chk: ["(8+10)/2 ≈ 9"],
  nb: O("Hvor mange arter",
    R`Hvor mange arter som finnes, er et anslag, ikke en ferdig telling. Teorien sier kanskje 8 til 10 millioner. Midten av det intervallet er et greit rundt tall å huske, men usikkerheten er stor, særlig for insekter, sopp og livet i havet. Mange arter er ikke beskrevet ennå. Biologisk mangfold er mer enn antall arter. Det er også genetisk variasjon innad i arten og variasjonen av økosystemer. Arealendringer, som tar leveområder, er den største trusselen i Norge.`,
    [[R`\frac{8 + 10}{2} = 9`, "midten av anslaget, millioner arter"]],
    [["8", "nedre anslag", "millioner"], ["10", "øvre anslag", "millioner"]],
    R`Anslaget er 8 til 10 millioner arter.
Midten: $(8 + 10)/2 = 9$ millioner.`,
    R`Si at det er et anslag. Ingen har telt alle arter.`),
  en: O("How many species",
    R`How many species exist is an estimate, not a finished count. The theory says perhaps 8 to 10 million. The middle of that interval is a fair round number to remember, but the uncertainty is large, especially for insects, fungi and life in the sea. Many species are not described yet. Biodiversity is more than the number of species. It is also genetic variation within the species and the variety of ecosystems. Land-use change, which takes habitats, is the biggest threat in Norway.`,
    [[R`\frac{8 + 10}{2} = 9`, "middle of the estimate, millions of species"]],
    [["8", "lower estimate", "millions"], ["10", "upper estimate", "millions"]],
    R`The estimate is 8 to 10 million species.
The middle: $(8 + 10)/2 = 9$ million.`,
    R`Say that it is an estimate. Nobody has counted every species.`) },
{ id: "mangfold-niva", chk: ["3 ≈ 3"],
  nb: O("Tre nivåer av mangfold",
    R`Biologisk mangfold telles på tre nivåer. Genetisk mangfold er variasjonen av alleler innad i en art. Uten den er bestanden sårbar for nye sykdommer, omtrent som ved innavl. Artsmangfold er hvor mange arter som lever i et område. Økosystemmangfold er variasjonen av naturtyper, som skog, myr, elv og tareskog. En nøkkelart, for eksempel bever, holder flere av disse i gang for andre arter. Rødlista viser arter som er truet. De største pressene er arealendring, klima, forurensning, fremmede arter og overhøsting.`,
    [[R`3\ \text{nivåer}`, "gener, arter og økosystemer"]],
    [["gener", "innad i arten", ""], ["arter", "antall arter", ""], ["økosystemer", "naturtyper", ""]],
    R`Genetisk mangfold, artsmangfold og økosystemmangfold.
Det er 3 nivåer, og alle tre kan svekkes hver for seg.`,
    R`En art kan ha mange individer og likevel lite genetisk mangfold.`),
  en: O("Three levels of diversity",
    R`Biodiversity is counted on three levels. Genetic diversity is the variation of alleles within a species. Without it the population is vulnerable to new diseases, much as with inbreeding. Species diversity is how many species live in an area. Ecosystem diversity is the variety of habitats, such as forest, bog, river and kelp forest. A keystone species, for example the beaver, keeps several of these going for other species. The Red List shows species that are threatened. The greatest pressures are land-use change, climate, pollution, invasive species and overharvesting.`,
    [[R`3\ \text{levels}`, "genes, species and ecosystems"]],
    [["genes", "within the species", ""], ["species", "number of species", ""], ["ecosystems", "habitats", ""]],
    R`Genetic diversity, species diversity and ecosystem diversity.
That is 3 levels, and all three can be weakened separately.`,
    R`A species can have many individuals and still little genetic diversity.`) }
]);

// ---------- VGBI2 0: Fra gen til protein ----------
TOPICS("VGBI2", 0, [
{ id: "kodon", chk: ["4^3 ≈ 64"],
  nb: O("Kodonet",
    R`Et kodon er tre baser på rad i mRNA, og det koder for én aminosyre. Det finnes fire baser, så antall mulige kodoner er fire opphøyd i tre. Det blir langt flere kodoner enn de tjue vanlige aminosyrene. Flere kodoner kan derfor gi samme aminosyre, og noen er stoppsignaler. Startkodonet AUG koder for metionin og setter i gang translasjonen. Stoppkodonene UAA, UAG og UGA koder ikke for en aminosyre. Translasjonen skjer i ribosomet, etter at mRNA er laget i kjernen hos eukaryoter.`,
    [[R`4^3 = 64`, "mulige kodoner"]],
    [["4", "baser i RNA: A, U, C, G", ""], ["3", "baser i ett kodon", ""], ["20", "vanlige aminosyrer", ""]],
    R`Tre plasser og fire baser: $4^3 = 64$ kodoner.
Bare 20 vanlige aminosyrer, så flere kodoner deler aminosyre.`,
    R`I RNA er basen U, ikke T. A i DNA-malen blir U i mRNA.`),
  en: O("The codon",
    R`A codon is three bases in a row on mRNA, and it codes for one amino acid. There are four bases, so the number of possible codons is four to the power of three. That is far more codons than the twenty common amino acids. Several codons can therefore give the same amino acid, and some are stop signals. The start codon AUG codes for methionine and starts translation. The stop codons UAA, UAG and UGA do not code for an amino acid. Translation happens in the ribosome, after the mRNA has been made in the nucleus in eukaryotes.`,
    [[R`4^3 = 64`, "possible codons"]],
    [["4", "bases in RNA: A, U, C, G", ""], ["3", "bases in one codon", ""], ["20", "common amino acids", ""]],
    R`Three positions and four bases: $4^3 = 64$ codons.
Only 20 common amino acids, so several codons share an amino acid.`,
    R`In RNA the base is U, not T. A in the DNA template becomes U in the mRNA.`) },
{ id: "baser-protein", chk: ["3*(50+1) ≈ 153"],
  nb: O("Fra aminosyrer til baser",
    R`Hver aminosyre i proteinet krever ett kodon, og kodonet er tre baser. I tillegg trengs ett stoppkodon som ikke blir til en aminosyre. Den kodende delen av mRNA må derfor ha tre baser ganger antall aminosyrer pluss ett. Introner hos eukaryoter er klippet bort før dette mRNA-et oversettes, så de er ikke med i tallet. Et protein på femti aminosyrer er et kort protein, men regnestykket er det samme for lange. Glemmer du stoppkodonet, blir mRNA-et tre baser for kort.`,
    [[R`3(n + 1)`, "baser i den kodende delen, med stopp"]],
    [["n", "antall aminosyrer", ""], ["3", "baser per kodon", ""], ["1", "stoppkodon", ""]],
    R`Et protein har 50 aminosyrer.
Baser, med stopp: $3 \cdot (50 + 1) = 153$.`,
    R`Startkodonet er den første aminosyren, metionin. Det er allerede inne i de femti, ikke et tillegg.`),
  en: O("From amino acids to bases",
    R`Each amino acid in the protein needs one codon, and the codon is three bases. In addition one stop codon is needed, and it does not become an amino acid. The coding part of the mRNA must therefore have three bases times the number of amino acids plus one. Introns in eukaryotes have been cut out before this mRNA is translated, so they are not in the count. A protein of fifty amino acids is a short protein, but the arithmetic is the same for long ones. If you forget the stop codon, the mRNA is three bases too short.`,
    [[R`3(n + 1)`, "bases in the coding part, with the stop"]],
    [["n", "number of amino acids", ""], ["3", "bases per codon", ""], ["1", "stop codon", ""]],
    R`A protein has 50 amino acids.
Bases, with the stop: $3 \cdot (50 + 1) = 153$.`,
    R`The start codon is the first amino acid, methionine. It is already inside the fifty, not an extra.`) },
{ id: "transkripsjon", chk: ["6/3 ≈ 2"],
  nb: O("Fra DNA til mRNA",
    R`Transkripsjon lager mRNA fra en DNA-malstreng. RNA-polymerase leser malen, og basene pares om. A i DNA blir U i RNA, T blir A, C blir G og G blir C. Tymin finnes ikke i RNA. Deretter leses mRNA i grupper på tre, kodonene. En mal på seks baser gir to kodoner og kan bli to aminosyrer hvis ingen av dem er stopp. Hos eukaryoter skjer transkripsjonen i kjernen, og introner spleises bort før mRNA går ut til ribosomet. Ikke alle gener er på i alle celler. Det er genregulering.`,
    [[R`\mathrm{A}\to\mathrm{U},\ \mathrm{T}\to\mathrm{A},\ \mathrm{C}\to\mathrm{G},\ \mathrm{G}\to\mathrm{C}`, "fra DNA-mal til mRNA"]],
    [["mal", "DNA-strengen som leses", ""], ["kodon", "tre baser", ""]],
    R`Malstrengen TAC GGA er 6 baser.
Kodon: $6/3 = 2$, og mRNA blir AUG CCU, metionin og prolin.`,
    R`Sjekk retningen. Det er malstrengen du oversetter, ikke den andre DNA-strengen.`),
  en: O("From DNA to mRNA",
    R`Transcription makes mRNA from a DNA template strand. RNA polymerase reads the template, and the bases are paired over. A in DNA becomes U in RNA, T becomes A, C becomes G and G becomes C. Thymine is not found in RNA. The mRNA is then read in groups of three, the codons. A template of six bases gives two codons and can become two amino acids if neither is a stop. In eukaryotes transcription happens in the nucleus, and introns are spliced out before the mRNA goes to the ribosome. Not every gene is on in every cell. That is gene regulation.`,
    [[R`\mathrm{A}\to\mathrm{U},\ \mathrm{T}\to\mathrm{A},\ \mathrm{C}\to\mathrm{G},\ \mathrm{G}\to\mathrm{C}`, "from DNA template to mRNA"]],
    [["template", "the DNA strand that is read", ""], ["codon", "three bases", ""]],
    R`The template TAC GGA is 6 bases.
Codons: $6/3 = 2$, and the mRNA becomes AUG CCU, methionine and proline.`,
    R`Check the direction. It is the template strand you transcribe, not the other DNA strand.`) }
]);

// ---------- VGBI2 1: Bioteknologi ----------
TOPICS("VGBI2", 1, [
{ id: "pcr", chk: ["2^10 ≈ 1024"],
  nb: O("PCR",
    R`PCR kopierer en valgt bit av DNA mange ganger. Hver runde skiller strengene med varme, primere fester seg når det kjøles ned, og DNA-polymerase lager en ny streng. Fra ett molekyl blir det to, deretter fire, og slik fortsetter det. Etter n runder er det to opphøyd i n kopier, hvis du startet med ett molekyl og alle kopiene lykkes. Derfor holder et lite spor av DNA, for eksempel fra et åsted. PCR lager kopiene. Den sorterer dem ikke, og den klipper dem ikke.`,
    [[R`2^n`, "kopier etter n runder, fra ett molekyl"]],
    [["n", "antall runder", ""], ["2", "dobling hver runde", ""]],
    R`Ti runder fra ett DNA-molekyl.
Kopier: $2^{10} = 1024$.`,
    R`Starter du med flere molekyler, ganger du med det antallet til slutt.`),
  en: O("PCR",
    R`PCR copies a chosen piece of DNA many times. Each cycle separates the strands with heat, primers attach when it cools, and DNA polymerase builds a new strand. From one molecule there are two, then four, and so on. After n cycles there are two to the power of n copies, if you started with one molecule and every copy succeeds. A small trace of DNA is therefore enough, for example from a crime scene. PCR makes the copies. It does not sort them, and it does not cut them.`,
    [[R`2^n`, "copies after n cycles, from one molecule"]],
    [["n", "number of cycles", ""], ["2", "doubling each cycle", ""]],
    R`Ten cycles from one DNA molecule.
Copies: $2^{10} = 1024$.`,
    R`If you start with more molecules, you multiply by that number at the end.`) },
{ id: "restriksjon", chk: ["4^6 ≈ 4096"],
  nb: O("Restriksjonsenzym",
    R`Et restriksjonsenzym klipper DNA der det kjenner igjen en bestemt sekvens. Hvor ofte den sekvensen dukker opp, avhenger av hvor lang den er. Med fire baser som er like vanlige, er sannsynligheten for en bestemt rekke på seks baser én delt på fire opphøyd i seks. Enzymet kutter da i snitt med det mellomrommet. De ekte sekvensene sitter ikke helt jevnt, så avstanden varierer. Det er slike biter gelelektroforese senere skiller. CRISPR-Cas9 klipper også, men der velger en guide hvor kuttet skal være.`,
    [[R`4^{6} = 4096`, "snittavstand for et kutt på seks baser"]],
    [["4", "baser, like vanlige", ""], ["6", "baser i gjenkjenningssekvensen", ""]],
    R`Et enzym kjenner igjen 6 baser, og basene er like vanlige.
Snitt mellom kutt: $4^{6} = 4096$ baser.`,
    R`Er basene ikke like vanlige, eller sekvensen kortere, blir avstanden en annen.`),
  en: O("Restriction enzyme",
    R`A restriction enzyme cuts DNA where it recognises a particular sequence. How often that sequence appears depends on how long it is. With four bases that are equally common, the probability of one particular run of six bases is one divided by four to the power of six. The enzyme then cuts on average at that spacing. The real sequences are not perfectly even, so the distance varies. Gel electrophoresis later separates such fragments. CRISPR-Cas9 also cuts, but there a guide chooses where the cut should be.`,
    [[R`4^{6} = 4096`, "average spacing for a six-base cut"]],
    [["4", "bases, equally common", ""], ["6", "bases in the recognition sequence", ""]],
    R`An enzyme recognises 6 bases, and the bases are equally common.
Average gap between cuts: $4^{6} = 4096$ bases.`,
    R`If the bases are not equally common, or the sequence is shorter, the spacing is different.`) },
{ id: "gel",
  nb: O("Gelelektroforese",
    R`Gelelektroforese sorterer DNA-biter etter størrelse. Gelen er et nett, og DNA er negativt ladd, så bitene trekkes mot pluss. Små biter smetter lettest gjennom nettet og vandrer lengst. Store biter henger igjen. Du sammenligner med biter av kjent lengde som ble lagt i en nabobrønn. Metoden sier ikke hva sekvensen er, bare hvor lange bitene er. Sammen med restriksjonsenzymer gir den et mønster, en DNA-profil. Eneggede tvillinger har samme profil. Andre personer har det ikke.`,
    [[R`\text{kort bit} \rightarrow \text{lengst vandring}`, "sortering i gelen"]],
    [["DNA", "negativ ladning", ""], ["gel", "nett som bremser store biter", ""]],
    R`De minste bitene kommer lengst.
De største blir liggende nærmest brønnen.`,
    R`PCR kopierer, enzymet klipper, gelen sorterer. De tre gjør ulike jobber.`),
  en: O("Gel electrophoresis",
    R`Gel electrophoresis sorts DNA fragments by size. The gel is a mesh, and DNA is negatively charged, so the fragments are pulled towards plus. Small fragments slip most easily through the mesh and travel furthest. Large fragments are held back. You compare with fragments of known length that were placed in a neighbouring well. The method does not say what the sequence is, only how long the fragments are. Together with restriction enzymes it gives a pattern, a DNA profile. Identical twins have the same profile. Other people do not.`,
    [[R`\text{short fragment} \rightarrow \text{furthest travel}`, "sorting in the gel"]],
    [["DNA", "negative charge", ""], ["gel", "mesh that slows large fragments", ""]],
    R`The smallest fragments travel furthest.
The largest stay closest to the well.`,
    R`PCR copies, the enzyme cuts, the gel sorts. The three do different jobs.`) }
]);

// ---------- VGBI2 2: Nervesystemet og hormoner ----------
TOPICS("VGBI2", 2, [
{ id: "hvilepotensial", chk: ["70 ≈ 70"],
  nb: O("Hvilepotensial",
    R`En nervecelle i ro har en elektrisk forskjell over membranen. Innsiden er negativ i forhold til utsiden, omtrent 70 millivolt under null, slik teorien oppgir det. Det kalles hvilepotensialet. Et aksjonspotensial er en kortvarig vending: natrium strømmer inn, innsiden blir positiv, og deretter strømmer kalium ut så cellen vender tilbake. Signalet går langs aksonet. I synapsen slippes signalstoffer, for eksempel dopamin, over til neste celle. Hvilepotensialet er et typisk tall, ikke en verdi som er lik i hver eneste celle.`,
    [[R`-70\ \mathrm{mV}`, "hvilepotensial, omtrent"]],
    [["Na+", "strømmer inn når signalet starter", ""], ["K+", "strømmer ut etterpå", ""]],
    R`Hvilepotensialet er omtrent $-70$ mV.
Tallet 70 er størrelsen. Minuset betyr at innsiden er negativ.`,
    R`Ikke bytt om ionene. Natrium inn starter signalet. Kalium ut avslutter det.`),
  en: O("Resting potential",
    R`A nerve cell at rest has an electrical difference across the membrane. The inside is negative relative to the outside, about 70 millivolts below zero, as the theory states it. That is called the resting potential. An action potential is a brief reversal: sodium flows in, the inside becomes positive, and then potassium flows out so the cell returns. The signal travels along the axon. In the synapse neurotransmitters, for example dopamine, are released to the next cell. The resting potential is a typical number, not a value that is the same in every single cell.`,
    [[R`-70\ \mathrm{mV}`, "resting potential, approximate"]],
    [["Na+", "flows in when the signal starts", ""], ["K+", "flows out afterwards", ""]],
    R`The resting potential is about $-70$ mV.
The number 70 is the size. The minus means the inside is negative.`,
    R`Do not swap the ions. Sodium in starts the signal. Potassium out ends it.`) },
{ id: "signalfart", chk: ["1/1*1000 ≈ 1000", "1/100*1000 ≈ 10"],
  nb: O("Signalfart og myelin",
    R`Tiden et nervesignal bruker, er strekningen delt på farten. Myelin isolerer aksonet, og signalet hopper mellom åpningene, så farten blir mye høyere. Uten myelin kan farten ligge rundt en meter per sekund. Med myelin kan den ligge rundt hundre meter per sekund. Det er slike tall oppgavene bruker. En refleks er rask av en annen grunn også: signalet går via ryggmargen og slipper omveien om hjernen. Hormoner er langsommere. De fraktes med blodet og virker i hele kroppen.`,
    [[R`t = \frac{s}{v}`, "tid for signalet"]],
    [["s", "lengde", "m"], ["v", "fart", "m/s"], ["t", "tid", "s"]],
    R`Én meter uten myelin, 1 m/s: $t = 1/1 = 1$ s $= 1000$ ms.
Én meter med myelin, 100 m/s: $t = 1/100$ s $= 10$ ms.`,
    R`Gjør om til millisekunder til slutt hvis oppgaven ber om det. 1 sekund er 1000 millisekunder.`),
  en: O("Signal speed and myelin",
    R`The time a nerve signal takes is the distance divided by the speed. Myelin insulates the axon, and the signal jumps between the gaps, so the speed becomes much higher. Without myelin the speed can be around one meter per second. With myelin it can be around one hundred meters per second. Those are the kinds of numbers the problems use. A reflex is fast for another reason too: the signal goes via the spinal cord and skips the detour through the brain. Hormones are slower. They are carried in the blood and act throughout the body.`,
    [[R`t = \frac{s}{v}`, "time for the signal"]],
    [["s", "length", "m"], ["v", "speed", "m/s"], ["t", "time", "s"]],
    R`One meter without myelin, 1 m/s: $t = 1/1 = 1$ s $= 1000$ ms.
One meter with myelin, 100 m/s: $t = 1/100$ s $= 10$ ms.`,
    R`Convert to milliseconds at the end if the problem asks for it. 1 second is 1000 milliseconds.`) },
{ id: "blodsukker",
  nb: O("Hormoner og blodsukker",
    R`Hormoner er kjemiske signaler i blodet. Insulin fra bukspyttkjertelen senker blodsukkeret ved at cellene tar opp glukose. Glukagon fra samme kjertel øker blodsukkeret ved at leveren slipper ut glukose. De to virker motsatt, og det er negativ tilbakekobling: et avvik setter i gang en respons som motvirker avviket. Adrenalin gjør kroppen klar til innsats og kan også heve blodsukkeret. Nervesystemet er raskt og treffer én synapse. Hormonsystemet er tregere og treffer alle celler som har riktig reseptor.`,
    [[R`\text{insulin} \downarrow \text{blodsukker},\quad \text{glukagon} \uparrow \text{blodsukker}`, "motsatt virkning"]],
    [["insulin", "senker", ""], ["glukagon", "øker", ""]],
    R`Høyt blodsukker gir mer insulin, og sukkeret synker.
Lavt blodsukker gir mer glukagon, og sukkeret stiger.`,
    R`Insulin og glukagon kommer begge fra bukspyttkjertelen, men fra ulike celler.`),
  en: O("Hormones and blood sugar",
    R`Hormones are chemical signals in the blood. Insulin from the pancreas lowers blood sugar by making cells take up glucose. Glucagon from the same gland raises blood sugar by making the liver release glucose. The two act in opposite directions, and that is negative feedback: a deviation sets off a response that counteracts the deviation. Adrenaline prepares the body for effort and can also raise blood sugar. The nervous system is fast and hits one synapse. The hormone system is slower and hits every cell that has the right receptor.`,
    [[R`\text{insulin} \downarrow \text{blood sugar},\quad \text{glucagon} \uparrow \text{blood sugar}`, "opposite effects"]],
    [["insulin", "lowers", ""], ["glucagon", "raises", ""]],
    R`High blood sugar gives more insulin, and the sugar falls.
Low blood sugar gives more glucagon, and the sugar rises.`,
    R`Insulin and glucagon both come from the pancreas, but from different cells.`) }
]);

// ---------- VGBI2 3: Immunforsvaret ----------
TOPICS("VGBI2", 3, [
{ id: "flokkimmunitet", chk: ["(1-1/5)*100 ≈ 80", "(1-1/2)*100 ≈ 50"],
  nb: O("Flokkimmunitet",
    R`Basisreproduksjonstallet sier hvor mange en smittet person i snitt smitter videre i en befolkning der alle er mottakelige. I den enkle modellen oppgavene bruker, stopper spredningen når andelen immune er én minus én delt på dette tallet. Da treffer smitten for ofte noen som allerede er immune. De som ikke kan vaksineres, blir indirekte beskyttet. Terskelen er et regnestykke i modellen, ikke en garanti for en bestemt sykdom, fordi smitten ikke alltid er jevnt fordelt og immuniteten kan svekkes.`,
    [[R`p = 1 - \frac{1}{R_0}`, "andel immune i den enkle modellen"]],
    [["R_0", "antall nye smittede per tilfelle, uten immunitet", ""], ["p", "terskel", ""]],
    R`$R_0 = 5$: $p = (1 - 1/5) \cdot 100 = 80$ %.
$R_0 = 2$: $p = (1 - 1/2) \cdot 100 = 50$ %.`,
    R`Høyere R0 krever høyere andel immune. Regn terskelen på nytt hvis tallet endres.`),
  en: O("Herd immunity",
    R`The basic reproduction number says how many people one infected person on average infects further in a population where everyone is susceptible. In the simple model the problems use, spread stops when the immune share is one minus one divided by this number. The infection then too often meets someone who is already immune. Those who cannot be vaccinated are protected indirectly. The threshold is a calculation in the model, not a guarantee for a particular disease, because infection is not always evenly spread and immunity can wane.`,
    [[R`p = 1 - \frac{1}{R_0}`, "immune share in the simple model"]],
    [["R_0", "new infections per case, without immunity", ""], ["p", "threshold", ""]],
    R`$R_0 = 5$: $p = (1 - 1/5) \cdot 100 = 80$%.
$R_0 = 2$: $p = (1 - 1/2) \cdot 100 = 50$%.`,
    R`A higher R0 needs a higher immune share. Recalculate the threshold if the number changes.`) },
{ id: "bakterievekst", chk: ["180/20 ≈ 9", "2^9 ≈ 512"],
  nb: O("Bakterievekst",
    R`Mange bakterier deler seg i to ved binær deling. Hvis delingen skjer med fast mellomrom og ingen dør, dobles antallet hver gang. Antall delinger er tiden delt på tiden mellom delingene. Deretter er bestanden startantallet ganger to opphøyd i antall delinger. I kroppen stopper immunforsvaret som regel denne veksten. Fagocytter spiser inntrengere, og det ervervede forsvaret med B-celler og T-celler er mer treffsikkert. Uten den bremsen ville en liten infeksjon vokst svært fort.`,
    [[R`N = N_0 \cdot 2^{t/d}`, "vekst uten død"]],
    [["d", "tid mellom delinger", "min"], ["t", "total tid", "min"], ["N_0", "startantall", ""]],
    R`Én bakterie deler seg hvert 20. minutt. Etter 3 timer, altså 180 minutter:
$180/20 = 9$ delinger, og $2^{9} = 512$ bakterier.`,
    R`Regn tiden i samme enhet. Tre timer er 180 minutter, ikke 3.`),
  en: O("Bacterial growth",
    R`Many bacteria divide in two by binary fission. If division happens at a fixed interval and none die, the number doubles each time. The number of divisions is the time divided by the time between divisions. The population is then the starting number times two to the power of the number of divisions. In the body the immune system usually stops this growth. Phagocytes engulf invaders, and the adaptive defence with B cells and T cells is more precise. Without that brake a small infection would grow very fast.`,
    [[R`N = N_0 \cdot 2^{t/d}`, "growth without death"]],
    [["d", "time between divisions", "min"], ["t", "total time", "min"], ["N_0", "starting number", ""]],
    R`One bacterium divides every 20 minutes. After 3 hours, that is 180 minutes:
$180/20 = 9$ divisions, and $2^{9} = 512$ bacteria.`,
    R`Use the same unit of time. Three hours is 180 minutes, not 3.`) },
{ id: "vaksine",
  nb: O("Vaksine og hukommelse",
    R`Det medfødte immunforsvaret reagerer raskt og generelt: hud, slim, feber og fagocytter. Det ervervede er tregere første gang, men treffsikkert. B-celler lager antistoffer mot et antigen, og T-celler kan drepe infiserte celler. Noen av cellene blir hukommelsesceller. Neste gang samme antigen kommer, er responsen raskere, og du blir ofte ikke syk. En vaksine gir et ufarlig antigen, så hukommelsen lages uten den farlige infeksjonen. Antibiotika virker på bakterier og gjør ingenting mot virus, som forkjølelse.`,
    [[R`\text{antigen} \rightarrow \text{hukommelse} \rightarrow \text{raskere respons}`, "ervervet immunforsvar"]],
    [["B-celle", "lager antistoffer", ""], ["T-celle", "dreper infiserte celler", ""]],
    R`Første møte med antigenet bygger hukommelse.
Andre møte gjenkjennes raskt, enten du var syk eller vaksinert.`,
    R`Antibiotika mot virus gir ingen nytte og kan selektere for resistente bakterier.`),
  en: O("Vaccine and memory",
    R`The innate immune system reacts quickly and generally: skin, mucus, fever and phagocytes. The adaptive system is slower the first time, but precise. B cells make antibodies against an antigen, and T cells can kill infected cells. Some of the cells become memory cells. The next time the same antigen arrives, the response is faster, and you often do not get ill. A vaccine gives a harmless antigen, so the memory is made without the dangerous infection. Antibiotics work on bacteria and do nothing against viruses, such as the common cold.`,
    [[R`\text{antigen} \rightarrow \text{memory} \rightarrow \text{faster response}`, "adaptive immunity"]],
    [["B cell", "makes antibodies", ""], ["T cell", "kills infected cells", ""]],
    R`The first meeting with the antigen builds memory.
The second meeting is recognised quickly, whether you were ill or vaccinated.`,
    R`Antibiotics against viruses give no benefit and can select for resistant bacteria.`) }
]);
})();
