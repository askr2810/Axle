// ============================================================
//  add_zdeep_bio.js – fordypning i Biologi 1 og 2 (lærebok-nivå). DEEP/DQS ligger i learn.js.
// ============================================================
(() => {
DEEP("VGBI1", "Cellen",
`## Celleteorien
Alle levende organismer består av én eller flere **celler**, cellen er livets minste enhet, og nye celler oppstår bare ved at celler deler seg. Noen organismer er **encellede** (bakterier, gjær, amøber), andre er **flercellede** – et menneske har rundt 30 billioner celler, med over 200 ulike celletyper.

## Prokaryote og eukaryote celler
- **Prokaryote celler** (bakterier og arker) er små (1–10 µm) og enkle. DNA-et ligger fritt i cytoplasmaet som en ringformet kromosom, ofte med små ekstra DNA-ringer (**plasmider**). De har ribosomer, cellemembran og cellevegg, og mange har **flagell** for å bevege seg.
- **Eukaryote celler** (dyr, planter, sopp, protister) er ofte 10–100 µm og har **cellekjerne** og **membranomsluttede organeller**.

## Organellene og hva de gjør
- **Cellekjernen**: inneholder DNA i kromosomer og styrer cellen. Omgitt av en dobbel kjernemembran med porer.
- **Ribosomer**: lager **proteiner**. Finnes fritt i cytoplasmaet og på det ru endoplasmatiske nettverket.
- **Endoplasmatisk nettverk (ER)**: **Ru ER** (med ribosomer) lager proteiner som skal ut av cellen eller inn i membraner. **Glatt ER** lager lipider.
- **Golgiapparatet**: pakker og sender proteiner videre i små **vesikler** – cellens «postkontor».
- **Mitokondrier**: cellens «kraftverk». Lager **ATP** ved celleånding. Har eget DNA – et spor av at de en gang var frittlevende bakterier (**endosymbioseteorien**).
- **Kloroplaster** (bare planter og alger): fotosyntese. Har også eget DNA.
- **Lysosomer**: bryter ned avfall og gamle organeller (særlig i dyreceller).
- **Vakuole**: stor væskefylt blære i planteceller som gir **turgortrykk** (stivhet) og lagrer stoffer.
- **Cytoskjelettet**: et nettverk av proteintråder som gir form og frakter ting rundt i cellen.
- **Cellevegg**: av **cellulose** hos planter, kitin hos sopp og peptidoglykan hos bakterier.

## Cellemembranen og transport
Membranen er et **dobbeltlag av fosfolipider**: hodene er **hydrofile** (vannelskende) og vender ut mot vannet, og halene er **hydrofobe** (vannskyende) og vender innover. I membranen sitter **proteiner** som fungerer som kanaler, pumper og reseptorer (**flytende mosaikkmodell**). Membranen er **selektivt permeabel**: små, upolare molekyler (O₂, CO₂) slipper lett gjennom, mens ioner og store molekyler trenger hjelp.
- **Diffusjon**: stoffer beveger seg fra høy til lav konsentrasjon av seg selv (passivt).
- **Fasilitert diffusjon**: passiv transport gjennom kanal- eller bærerproteiner (som glukose).
- **Osmose**: diffusjon av **vann** gjennom en membran, mot den siden med høyest konsentrasjon av løste stoffer. Legger du en rød blodcelle i rent vann, sveller den og kan sprekke; i saltvann skrumper den.
- **Aktiv transport**: pumper flytter stoffer **mot** konsentrasjonsforskjellen og bruker **ATP**, som **natrium-kalium-pumpa** i nervecellene.
- **Endocytose og eksocytose**: store partikler tas inn eller sendes ut i vesikler.

## Celledeling
Celler formerer seg ved **mitose** (to identiske datterceller – vekst, reparasjon, ukjønnet formering) og danner kjønnsceller ved **meiose** (halvt kromosomtall). Før deling kopieres DNA-et (**replikasjon**). Ukontrollert celledeling er det som skjer ved **kreft**.

## Enzymer
**Enzymer** er proteiner som **katalyserer** (setter fart på) kjemiske reaksjoner i cellen uten å bli brukt opp. Hvert enzym har et **aktivt sete** som passer til ett bestemt **substrat** (nøkkel–lås-modellen). Enzymene virker best ved en bestemt temperatur og pH; blir det for varmt, **denatureres** de – formen ødelegges, og de slutter å virke.`,
`## Cell theory
All living organisms consist of one or more **cells**, the cell is the smallest unit of life, and new cells arise only when cells divide. Some organisms are **unicellular** (bacteria, yeast, amoebae), others **multicellular** – a human has about 30 trillion cells, of over 200 types.

## Prokaryotic and eukaryotic cells
- **Prokaryotic cells** (bacteria and archaea) are small (1–10 µm) and simple. The DNA lies free in the cytoplasm as a circular chromosome, often with small extra DNA rings (**plasmids**). They have ribosomes, a cell membrane and a cell wall, and many have a **flagellum** for moving.
- **Eukaryotic cells** (animals, plants, fungi, protists) are often 10–100 µm and have a **nucleus** and **membrane-bound organelles**.

## The organelles and what they do
- **Nucleus**: contains DNA in chromosomes and controls the cell. Surrounded by a double nuclear membrane with pores.
- **Ribosomes**: make **proteins**. Free in the cytoplasm and on the rough endoplasmic reticulum.
- **Endoplasmic reticulum (ER)**: **Rough ER** (with ribosomes) makes proteins for export or membranes. **Smooth ER** makes lipids.
- **Golgi apparatus**: packages and ships proteins in small **vesicles** – the cell's 'post office'.
- **Mitochondria**: the cell's 'power stations'. Make **ATP** by cellular respiration. Have their own DNA – a trace of once being free-living bacteria (**endosymbiotic theory**).
- **Chloroplasts** (plants and algae only): photosynthesis. Also have their own DNA.
- **Lysosomes**: break down waste and old organelles (especially in animal cells).
- **Vacuole**: a large fluid-filled sac in plant cells that gives **turgor pressure** (stiffness) and stores substances.
- **Cytoskeleton**: a network of protein fibres that gives shape and moves things around the cell.
- **Cell wall**: of **cellulose** in plants, chitin in fungi and peptidoglycan in bacteria.

## The cell membrane and transport
The membrane is a **phospholipid bilayer**: the heads are **hydrophilic** (water-loving) and face the water, and the tails are **hydrophobic** (water-repelling) and face inwards. **Proteins** in the membrane act as channels, pumps and receptors (the **fluid mosaic model**). The membrane is **selectively permeable**: small non-polar molecules (O₂, CO₂) pass easily, while ions and large molecules need help.
- **Diffusion**: substances move from high to low concentration on their own (passively).
- **Facilitated diffusion**: passive transport through channel or carrier proteins (like glucose).
- **Osmosis**: diffusion of **water** across a membrane towards the side with the higher concentration of dissolved substances. Put a red blood cell in pure water and it swells and may burst; in salt water it shrinks.
- **Active transport**: pumps move substances **against** the concentration gradient using **ATP**, like the **sodium-potassium pump** in nerve cells.
- **Endocytosis and exocytosis**: large particles are taken in or sent out in vesicles.

## Cell division
Cells multiply by **mitosis** (two identical daughter cells – growth, repair, asexual reproduction) and form sex cells by **meiosis** (half the chromosome number). Before division the DNA is copied (**replication**). Uncontrolled cell division is what happens in **cancer**.

## Enzymes
**Enzymes** are proteins that **catalyse** (speed up) chemical reactions in the cell without being used up. Each enzyme has an **active site** that fits a particular **substrate** (the lock-and-key model). Enzymes work best at a certain temperature and pH; if it gets too hot they are **denatured** – their shape is destroyed and they stop working.`);

DEEP("VGBI1", "Arv og genetikk",
`## DNA, gener og kromosomer
**DNA** (deoksyribonukleinsyre) er en lang dobbel spiral av **nukleotider**. Hvert nukleotid har et sukker (deoksyribose), en fosfatgruppe og én av fire **baser**: adenin (A), tymin (T), cytosin (C) og guanin (G). Basene parer seg alltid **A–T** og **C–G**, så den ene tråden bestemmer den andre. Rekkefølgen av basene er den genetiske koden.

Et **gen** er et avsnitt av DNA som inneholder oppskriften på et **protein** (eller et RNA-molekyl). Mennesket har rundt **20 000 gener**, men bare et par prosent av DNA-et koder for proteiner. DNA-et er pakket i **kromosomer**: mennesker har **46 kromosomer** i 23 par i hver kroppscelle – ett sett fra mor og ett fra far. Kjønnskromosomene er **XX** hos kvinner og **XY** hos menn.

## Mitose og meiose
- **Mitose**: én celle blir til to **identiske** datterceller med 46 kromosomer. Fasene er profase, metafase, anafase og telofase, fulgt av **cytokinese**. Brukes til vekst og reparasjon.
- **Meiose**: to delinger gir fire **kjønnsceller** (eggceller eller sædceller) med **23 kromosomer** (haploide). Under meiosen skjer **overkrysning** – homologe kromosomer bytter biter – og kromosomene fordeles tilfeldig. Derfor blir alle kjønnsceller genetisk forskjellige, og søsken er ulike. Ved befruktning blir antallet 46 igjen.

## Mendel og arvelovene
Munken **Gregor Mendel** krysset erteplanter på 1860-tallet og oppdaget at egenskaper nedarves i «enheter» – det vi i dag kaller gener.
- **Alleler** er ulike varianter av samme gen. Vi har to alleler for hvert gen, ett fra hver forelder.
- **Homozygot**: to like alleler (AA eller aa). **Heterozygot**: to ulike (Aa).
- **Dominant** allel (stor bokstav) viser seg selv om det bare finnes ett. **Recessivt** allel (liten bokstav) viser seg bare når individet har to av det (aa).
- **Genotype** er hvilke alleler individet har; **fenotype** er egenskapen som synes.

## Krysningsskjema
Et **Punnett-kvadrat** viser mulige kombinasjoner. To heterozygote foreldre (Aa × Aa) kan få barn med **AA, Aa, Aa** og **aa**. Sannsynligheten for den recessive egenskapen er **1/4 = 25 %**, og fenotypeforholdet er **3 : 1**. Krysser vi Aa × aa, blir forholdet **1 : 1**.

## Andre arvemønstre
- **Kjønnsbundet arv**: gener på X-kromosomet. Fordi menn bare har én X, får de oftere recessive X-bundne tilstander som **fargeblindhet** og blødersykdom.
- **Ufullstendig dominans**: heterozygoten får en mellomting (rød × hvit blomst gir rosa).
- **Kodominans**: begge allelene uttrykkes, som i **ABO-blodtypesystemet** (A og B er kodominante, O er recessiv).
- **Polygen arv**: mange gener virker sammen, som ved høyde og hudfarge. Ofte påvirker også **miljøet** (kosthold, sollys).

## Mutasjoner
En **mutasjon** er en endring i DNA-et. Den kan oppstå tilfeldig ved kopieringsfeil eller skyldes **mutagener** som UV-stråling, røntgen og visse kjemikalier. De fleste mutasjoner er **nøytrale**, noen er skadelige (kan gi sykdom eller kreft), og noen få er gunstige. Mutasjoner i kjønnscellene kan arves og er råstoffet for **evolusjonen**. **Kromosomfeil** som et ekstra kromosom 21 gir **Downs syndrom**.`,
`## DNA, genes and chromosomes
**DNA** (deoxyribonucleic acid) is a long double helix of **nucleotides**. Each nucleotide has a sugar (deoxyribose), a phosphate group and one of four **bases**: adenine (A), thymine (T), cytosine (C) and guanine (G). The bases always pair **A–T** and **C–G**, so one strand determines the other. The order of the bases is the genetic code.

A **gene** is a stretch of DNA containing the recipe for a **protein** (or an RNA molecule). Humans have about **20,000 genes**, but only a couple of per cent of DNA codes for proteins. DNA is packed into **chromosomes**: humans have **46 chromosomes** in 23 pairs in each body cell – one set from the mother and one from the father. The sex chromosomes are **XX** in females and **XY** in males.

## Mitosis and meiosis
- **Mitosis**: one cell becomes two **identical** daughter cells with 46 chromosomes. The phases are prophase, metaphase, anaphase and telophase, followed by **cytokinesis**. Used for growth and repair.
- **Meiosis**: two divisions produce four **sex cells** (eggs or sperm) with **23 chromosomes** (haploid). During meiosis **crossing over** occurs – homologous chromosomes swap pieces – and chromosomes are sorted randomly. So all sex cells are genetically different, and siblings differ. At fertilisation the number is 46 again.

## Mendel and the laws of inheritance
The monk **Gregor Mendel** crossed pea plants in the 1860s and discovered that traits are inherited in 'units' – what we now call genes.
- **Alleles** are different versions of the same gene. We have two alleles for each gene, one from each parent.
- **Homozygous**: two identical alleles (AA or aa). **Heterozygous**: two different (Aa).
- A **dominant** allele (capital letter) shows even if there is only one. A **recessive** allele (small letter) shows only when the individual has two (aa).
- **Genotype** is which alleles the individual has; **phenotype** is the visible trait.

## Punnett squares
A **Punnett square** shows the possible combinations. Two heterozygous parents (Aa × Aa) can have children with **AA, Aa, Aa** and **aa**. The probability of the recessive trait is **1/4 = 25%**, and the phenotype ratio is **3 : 1**. Crossing Aa × aa gives a **1 : 1** ratio.

## Other inheritance patterns
- **Sex-linked inheritance**: genes on the X chromosome. Because males have only one X, they more often get recessive X-linked conditions such as **colour blindness** and haemophilia.
- **Incomplete dominance**: the heterozygote is intermediate (red × white flower gives pink).
- **Codominance**: both alleles are expressed, as in the **ABO blood group system** (A and B are codominant, O is recessive).
- **Polygenic inheritance**: many genes work together, as for height and skin colour. Often the **environment** also plays a part (diet, sunlight).

## Mutations
A **mutation** is a change in DNA. It can arise randomly from copying errors or be caused by **mutagens** such as UV radiation, X-rays and certain chemicals. Most mutations are **neutral**, some harmful (can cause disease or cancer) and a few beneficial. Mutations in sex cells can be inherited and are the raw material of **evolution**. **Chromosome errors** such as an extra chromosome 21 cause **Down syndrome**.`);

DEEP("VGBI1", "Økologi",
`## Nivåer i økologien
**Økologi** er læren om samspillet mellom organismene og miljøet. Vi skiller mellom nivåene **individ**, **populasjon** (alle individer av én art i et område), **samfunn** (alle populasjonene i et område), **økosystem** (samfunnet + det ikke-levende miljøet) og **biosfæren** (alt liv på jorda).

## Biotiske og abiotiske faktorer
- **Abiotiske faktorer** er de ikke-levende: lys, temperatur, vann, næringsstoffer i jorda, pH og vind.
- **Biotiske faktorer** er de levende: mat, konkurrenter, rovdyr, parasitter og sykdommer.
Hver art har en **toleransegrense** for hver faktor. Den faktoren det er minst av i forhold til behovet, begrenser veksten (**begrensende faktor**).

## Energistrøm og næringskjeder
All energi i økosystemene kommer fra **sola**. **Produsentene** (planter, alger, planteplankton) binder solenergi ved fotosyntese. **Konsumentene** spiser andre: **primærkonsumenter** (planteetere), **sekundærkonsumenter** (rovdyr som spiser planteetere) og **tertiærkonsumenter** (toppredatorer). **Nedbryterne** (bakterier og sopp) bryter ned døde organismer og avføring og frigjør næringsstoffene igjen.

En **næringskjede** viser hvem som spiser hvem: planteplankton → dyreplankton → sild → torsk → sel. Mange kjeder henger sammen i et **næringsnett**. Ved hvert **trofinivå** går rundt **90 %** av energien tapt som varme og til livsprosesser – bare rundt 10 % blir til ny biomasse. Derfor er det få toppredatorer, og derfor er det mer energieffektivt å spise planter enn kjøtt.

## Kretsløp av stoffer
I motsetning til energien går stoffene i **kretsløp**:
- **Karbonets kretsløp**: fotosyntese binder CO₂, celleånding og nedbrytning frigjør det. Fossile brensler er karbon som har vært lagret i millioner av år.
- **Nitrogenets kretsløp**: lufta er 78 % nitrogen, men planter kan ikke bruke N₂ direkte. **Nitrogenfikserende bakterier** (blant annet i rotknollene til erteplanter) gjør det om til ammonium og nitrat. Kunstgjødsel tilfører mye nitrogen, og avrenning kan gi **overgjødsling** (eutrofiering) av vann.

## Populasjoner
En populasjon vokser **eksponentielt** når det er rikelig med ressurser, men begrenses etter hvert av mat, plass og fiender – den når økosystemets **bæreevne**. Byttedyr og rovdyr (som lemen og fjellrev) svinger ofte i **sykluser**.

## Samspill mellom arter
- **Konkurranse**: om mat, lys og plass – både mellom og innen arter.
- **Predasjon**: rovdyr–byttedyr.
- **Symbiose**: tett samliv. **Mutualisme** (begge tjener på det, som lav – sopp og alge – eller bier og blomster), **kommensalisme** (én tjener, den andre påvirkes ikke) og **parasittisme** (én tjener på bekostning av den andre).

## Suksesjon
**Suksesjon** er den gradvise endringen i et økosystem over tid. På bar stein etter at isen trakk seg tilbake, kommer først **pionerarter** som lav og mose, deretter gress og busker, og til slutt skog (**klimakssamfunn**). Etter en skogbrann skjer en raskere **sekundær suksesjon** fordi jorda er der fra før.

## Mennesket og økosystemene
Mennesket påvirker økosystemene gjennom **arealendringer** (den største trusselen mot naturmangfoldet), **forurensning** (miljøgifter som hoper seg opp oppover i næringskjeden – **biomagnifikasjon**), **overhøsting**, **fremmede arter** og **klimaendringer**.`,
`## Levels in ecology
**Ecology** is the study of interactions between organisms and their environment. We distinguish between the levels **individual**, **population** (all individuals of one species in an area), **community** (all populations in an area), **ecosystem** (the community + the non-living environment) and the **biosphere** (all life on Earth).

## Biotic and abiotic factors
- **Abiotic factors** are non-living: light, temperature, water, soil nutrients, pH and wind.
- **Biotic factors** are living: food, competitors, predators, parasites and diseases.
Each species has a **tolerance range** for each factor. The factor in shortest supply relative to need limits growth (the **limiting factor**).

## Energy flow and food chains
All energy in ecosystems comes from the **Sun**. **Producers** (plants, algae, phytoplankton) capture solar energy by photosynthesis. **Consumers** eat others: **primary consumers** (herbivores), **secondary consumers** (predators eating herbivores) and **tertiary consumers** (top predators). **Decomposers** (bacteria and fungi) break down dead organisms and waste and release nutrients again.

A **food chain** shows who eats whom: phytoplankton → zooplankton → herring → cod → seal. Many chains connect in a **food web**. At each **trophic level** about **90%** of the energy is lost as heat and to life processes – only about 10% becomes new biomass. That's why there are few top predators, and why eating plants is more energy-efficient than eating meat.

## Cycles of matter
Unlike energy, matter **cycles**:
- **The carbon cycle**: photosynthesis binds CO₂; respiration and decomposition release it. Fossil fuels are carbon stored for millions of years.
- **The nitrogen cycle**: air is 78% nitrogen, but plants can't use N₂ directly. **Nitrogen-fixing bacteria** (including in the root nodules of legumes) turn it into ammonium and nitrate. Fertilisers add a lot of nitrogen, and run-off can cause **eutrophication** of water.

## Populations
A population grows **exponentially** when resources are plentiful but is eventually limited by food, space and enemies – it reaches the ecosystem's **carrying capacity**. Prey and predators (like lemmings and Arctic foxes) often fluctuate in **cycles**.

## Interactions between species
- **Competition**: for food, light and space – between and within species.
- **Predation**: predator–prey.
- **Symbiosis**: close living together. **Mutualism** (both benefit, like lichen – fungus and alga – or bees and flowers), **commensalism** (one benefits, the other unaffected) and **parasitism** (one benefits at the other's expense).

## Succession
**Succession** is the gradual change of an ecosystem over time. On bare rock after the ice retreated, **pioneer species** such as lichens and mosses come first, then grass and shrubs, and finally forest (the **climax community**). After a forest fire a faster **secondary succession** occurs because the soil is already there.

## Humans and ecosystems
Humans affect ecosystems through **land-use change** (the biggest threat to biodiversity), **pollution** (toxins that accumulate up the food chain – **biomagnification**), **overharvesting**, **invasive species** and **climate change**.`);

DEEP("VGBI1", "Evolusjon",
`## Darwin og naturlig utvalg
**Charles Darwin** reiste jorda rundt med skipet *Beagle* (1831–1836) og studerte blant annet finker og skilpadder på **Galápagosøyene**. I **1859** ga han ut *Artenes opprinnelse*. Omtrent samtidig kom **Alfred Russel Wallace** fram til den samme ideen. Teorien om **evolusjon ved naturlig utvalg** bygger på noen enkle observasjoner:
1. Individene i en art er **forskjellige** (variasjon).
2. Mye av variasjonen er **arvelig**.
3. Det fødes **flere avkom** enn det som kan overleve.
4. Individer med egenskaper som passer godt til miljøet, **overlever og formerer seg mer**.
Over mange generasjoner blir de gunstige egenskapene vanligere – arten **tilpasser** seg. Darwin visste ikke hvordan egenskaper ble arvet; det kom på plass da genetikken ble koblet til evolusjonsteorien på 1900-tallet (**den moderne syntesen**).

## Variasjonens kilder
- **Mutasjoner** gir nye alleler.
- **Meiose** (overkrysning og tilfeldig fordeling) og **befruktning** blander allelene på nye måter.
Naturlig utvalg virker på **fenotypen**, men det er **genfrekvensene** i populasjonen som endrer seg.

## Andre evolusjonsmekanismer
- **Seksuell seleksjon**: egenskaper som gir flere partnere, som påfuglens hale eller hjortens gevir.
- **Genetisk drift**: tilfeldige endringer i genfrekvenser, særlig i små populasjoner. En **flaskehals** (få overlevende) eller en **grunnleggereffekt** (få individer koloniserer et nytt sted) kan gi store endringer.
- **Genflyt**: individer flytter mellom populasjoner og tar med seg gener.

## Nye arter
En **art** er en gruppe individer som kan få **fruktbart avkom** sammen. Nye arter oppstår ofte når populasjoner blir **isolert** fra hverandre (for eksempel av hav eller fjell) og utvikler seg i ulike retninger til de ikke lenger kan pare seg (**artsdannelse**). Darwins finker er et klassisk eksempel: én forfedreart ble til mange arter med ulike nebbformer tilpasset ulik mat.

## Bevis for evolusjon
- **Fossiler** viser hvordan livet har endret seg over millioner av år, med **overgangsformer** som *Tiktaalik* (fisk–landdyr) og *Archaeopteryx* (dinosaur–fugl).
- **Sammenlignende anatomi**: **homologe organer** – menneskets arm, hvalens luffe og flaggermusens vinge har samme benbygning, fordi de har en felles stamfar.
- **Rudimentære organer** (som blindtarmen og halebeinet hos mennesker).
- **DNA**: jo nærmere i slekt to arter er, jo likere er DNA-et. Mennesket og sjimpansen deler rundt 98–99 %.
- **Evolusjon vi kan se**: bakterier som blir **resistente mot antibiotika**, og insekter som blir motstandsdyktige mot insektmidler.

## Menneskets evolusjon
Menneskets og sjimpansens slektslinjer skilte lag for om lag **6–7 millioner** år siden i Afrika. Tidlige former gikk på to bein (som «Lucy», *Australopithecus afarensis*, over 3 millioner år gammel). Slekten *Homo* kom for rundt 2,5 millioner år siden, med *Homo erectus* som spredte seg ut av Afrika. **Moderne mennesker** (*Homo sapiens*) oppsto i Afrika for rundt **300 000 år** siden og spredte seg over hele verden. Vi møtte og fikk barn med blant annet **neandertalerne** – de fleste mennesker utenfor Afrika har et par prosent neandertal-DNA.

## Vanlige misforståelser
- Evolusjon har **ikke et mål** – den er ikke en stige mot noe «høyere».
- Individer **utvikler seg ikke** i løpet av livet; det er **populasjoner** som endrer seg over generasjoner.
- Mennesket stammer ikke fra sjimpansen, men vi har en **felles stamfar**.`,
`## Darwin and natural selection
**Charles Darwin** sailed round the world on the *Beagle* (1831–1836) and studied finches and tortoises on the **Galápagos Islands** among other things. In **1859** he published *On the Origin of Species*. At about the same time **Alfred Russel Wallace** reached the same idea. The theory of **evolution by natural selection** rests on a few simple observations:
1. Individuals in a species **differ** (variation).
2. Much of the variation is **heritable**.
3. **More offspring** are born than can survive.
4. Individuals with traits that suit the environment **survive and reproduce more**.
Over many generations the favourable traits become more common – the species **adapts**. Darwin didn't know how traits are inherited; that fell into place when genetics was joined with evolution in the 1900s (the **modern synthesis**).

## Sources of variation
- **Mutations** produce new alleles.
- **Meiosis** (crossing over and random assortment) and **fertilisation** shuffle alleles in new ways.
Natural selection acts on the **phenotype**, but it is the **gene frequencies** in the population that change.

## Other mechanisms of evolution
- **Sexual selection**: traits that bring more mates, like the peacock's tail or the stag's antlers.
- **Genetic drift**: random changes in gene frequencies, especially in small populations. A **bottleneck** (few survivors) or a **founder effect** (a few individuals colonise a new place) can cause big changes.
- **Gene flow**: individuals move between populations and take their genes with them.

## New species
A **species** is a group of individuals that can produce **fertile offspring** together. New species often arise when populations become **isolated** (e.g. by sea or mountains) and evolve in different directions until they can no longer interbreed (**speciation**). Darwin's finches are a classic example: one ancestral species became many species with beak shapes suited to different foods.

## Evidence for evolution
- **Fossils** show how life has changed over millions of years, with **transitional forms** such as *Tiktaalik* (fish–land animal) and *Archaeopteryx* (dinosaur–bird).
- **Comparative anatomy**: **homologous organs** – the human arm, the whale's flipper and the bat's wing have the same bone structure because they share an ancestor.
- **Vestigial organs** (such as the appendix and tailbone in humans).
- **DNA**: the more closely related two species are, the more similar their DNA. Humans and chimpanzees share about 98–99%.
- **Evolution we can see**: bacteria becoming **resistant to antibiotics**, and insects becoming resistant to insecticides.

## Human evolution
The human and chimpanzee lineages split about **6–7 million** years ago in Africa. Early forms walked on two legs (like 'Lucy', *Australopithecus afarensis*, over 3 million years old). The genus *Homo* appeared about 2.5 million years ago, with *Homo erectus* spreading out of Africa. **Modern humans** (*Homo sapiens*) arose in Africa about **300,000 years** ago and spread across the world. We met and had children with **Neanderthals** among others – most people outside Africa carry a couple of per cent Neanderthal DNA.

## Common misconceptions
- Evolution has **no goal** – it isn't a ladder towards something 'higher'.
- Individuals **don't evolve** during their lifetime; **populations** change over generations.
- Humans are not descended from chimpanzees, but we share a **common ancestor**.`);

DEEP("VGBI1", "Fotosyntese og celleånding",
`## Energi i cellene: ATP
Alle celler trenger energi til å bygge stoffer, transportere stoffer og bevege seg. Den «energivalutaen» cellene bruker, er **ATP** (adenosintrifosfat). Når den ytterste fosfatgruppen spaltes av (ATP → ADP + P), frigjøres energi. Celleåndingen lader ADP opp til ATP igjen.

## Fotosyntesen
Fotosyntesen skjer i **kloroplastene** hos planter, alger og cyanobakterier:
$$6CO_2 + 6H_2O \\xrightarrow{\\text{lys}} C_6H_{12}O_6 + 6O_2$$
Den har to hovedtrinn:
1. **Lysreaksjonene** (i **tylakoidmembranene**): det grønne pigmentet **klorofyll** fanger lysenergi. Vann spaltes, og **oksygen** slippes ut som et «biprodukt». Energien lagres midlertidig i **ATP** og **NADPH**.
2. **Calvinsyklusen** (i **stroma**, væsken i kloroplasten): energien fra ATP og NADPH brukes til å binde **CO₂** og bygge **glukose**. Dette kalles **karbonfiksering**.

Klorofyll absorberer mest **blått** og **rødt** lys og reflekterer **grønt** – derfor er bladene grønne. Om høsten brytes klorofyllet ned, og gule og røde pigmenter blir synlige.

### Hva påvirker fotosyntesen?
**Lysintensitet**, **CO₂-konsentrasjon** og **temperatur** er de viktigste faktorene. Øker du én av dem, øker farten – til en annen faktor blir **begrensende**. Gartnere tilfører derfor ofte CO₂ og varme i drivhus. For høy temperatur ødelegger enzymene.

Glukosen planten lager, brukes til energi i celleåndingen, lagres som **stivelse** eller bygges om til **cellulose**, proteiner og fett.

## Celleåndingen
Celleåndingen frigjør energien i glukose og skjer i **alle** levende celler – også i plantene, døgnet rundt:
$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{energi (ATP)}$$
Den har tre trinn:
1. **Glykolysen** (i cytoplasmaet): glukose spaltes til to molekyler pyruvat. Gir litt ATP og trenger ikke oksygen.
2. **Sitronsyresyklusen** (i mitokondriene): pyruvat brytes videre ned, og CO₂ slippes ut.
3. **Elektrontransportkjeden** (i mitokondriemembranen): her brukes **oksygen**, det dannes vann, og det meste av ATP-en lages – rundt **30–32 ATP** per glukosemolekyl i alt.

## Gjæring (anaerob forbrenning)
Når det er lite oksygen, kan cellene få litt energi fra glykolysen alene:
- **Melkesyregjæring** i musklene ved hard trening: pyruvat blir til **melkesyre (laktat)**. Brukes også til å lage yoghurt.
- **Alkoholgjæring** hos gjær: pyruvat blir til **etanol** og **CO₂**. Brukes i baking (CO₂ hever deigen) og ølbrygging.
Gjæring gir bare **2 ATP** per glukose – langt mindre enn aerob celleånding.

## Fotosyntese og celleånding henger sammen
Fotosyntesen lager glukose og oksygen som celleåndingen bruker, og celleåndingen lager CO₂ og vann som fotosyntesen bruker. Sammen driver de **karbonets kretsløp** og gir oss oksygenet vi puster inn. Nesten all energi i maten vår kommer opprinnelig fra sola via fotosyntesen.`,
`## Energy in cells: ATP
All cells need energy to build and transport substances and to move. The 'energy currency' cells use is **ATP** (adenosine triphosphate). When the outermost phosphate group is split off (ATP → ADP + P), energy is released. Cellular respiration recharges ADP to ATP.

## Photosynthesis
Photosynthesis takes place in the **chloroplasts** of plants, algae and cyanobacteria:
$$6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2$$
It has two main stages:
1. **The light reactions** (in the **thylakoid membranes**): the green pigment **chlorophyll** captures light energy. Water is split and **oxygen** is released as a 'by-product'. The energy is temporarily stored in **ATP** and **NADPH**.
2. **The Calvin cycle** (in the **stroma**, the fluid of the chloroplast): energy from ATP and NADPH is used to fix **CO₂** and build **glucose**. This is **carbon fixation**.

Chlorophyll absorbs mostly **blue** and **red** light and reflects **green** – that's why leaves are green. In autumn chlorophyll breaks down and yellow and red pigments show.

### What affects photosynthesis?
**Light intensity**, **CO₂ concentration** and **temperature** are the main factors. Increase one and the rate rises – until another becomes **limiting**. Growers therefore often add CO₂ and heat in greenhouses. Too high a temperature destroys the enzymes.

The glucose the plant makes is used for energy in respiration, stored as **starch** or converted into **cellulose**, proteins and fats.

## Cellular respiration
Cellular respiration releases the energy in glucose and happens in **all** living cells – plants too, day and night:
$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{energy (ATP)}$$
It has three stages:
1. **Glycolysis** (in the cytoplasm): glucose is split into two molecules of pyruvate. Gives a little ATP and needs no oxygen.
2. **The citric acid cycle** (in the mitochondria): pyruvate is broken down further and CO₂ released.
3. **The electron transport chain** (in the mitochondrial membrane): here **oxygen** is used, water forms and most ATP is made – about **30–32 ATP** per glucose in total.

## Fermentation (anaerobic respiration)
When oxygen is scarce, cells can get a little energy from glycolysis alone:
- **Lactic acid fermentation** in muscles during hard exercise: pyruvate becomes **lactic acid (lactate)**. Also used to make yoghurt.
- **Alcoholic fermentation** in yeast: pyruvate becomes **ethanol** and **CO₂**. Used in baking (CO₂ raises the dough) and brewing.
Fermentation yields only **2 ATP** per glucose – far less than aerobic respiration.

## Photosynthesis and respiration are linked
Photosynthesis makes the glucose and oxygen respiration uses, and respiration makes the CO₂ and water photosynthesis uses. Together they drive the **carbon cycle** and give us the oxygen we breathe. Almost all the energy in our food originally comes from the Sun via photosynthesis.`);

DEEP("VGBI1", "Biologisk mangfold og klassifisering",
`## Hva er biologisk mangfold?
**Biologisk mangfold** (naturmangfold) er variasjonen av liv på tre nivåer:
1. **Genetisk mangfold** innen en art – gir arten mulighet til å tilpasse seg endringer.
2. **Artsmangfold** – hvor mange ulike arter som finnes.
3. **Økosystemmangfold** – variasjonen av naturtyper, fra regnskog og korallrev til myr og fjell.
Forskerne har beskrevet rundt **2 millioner arter**, men det finnes trolig mange millioner flere, særlig insekter, sopp og mikroorganismer. Mangfoldet er størst i **tropene**.

## Hvorfor er mangfoldet viktig?
Naturen gir oss **økosystemtjenester**: mat, rent vann, pollinering av avlinger, medisiner, karbonlagring, flomdemping og opplevelser. Et mangfoldig økosystem er dessuten mer **robust** mot sykdom, klimaendringer og andre forstyrrelser. Mange mener også at naturen har en **egenverdi**, uansett nytte for mennesker.

## Trusler
Forskerne mener vi er inne i en **sjette masseutryddelse**, der arter dør ut mye raskere enn normalt. De største truslene er:
- **Arealendringer**: nedbygging, avskoging og oppdyrking ødelegger leveområder – den største trusselen.
- **Overhøsting**: overfiske og jakt.
- **Klimaendringer**.
- **Forurensning**: plast, miljøgifter og overgjødsling.
- **Fremmede arter** som fortrenger stedegne arter, som **stillehavsøsters** og **brunskogsnegl** i Norge.
**Norsk rødliste** lister arter som står i fare for å dø ut i Norge, for eksempel villrein, fjellrev og villaks.

## Vern og tiltak
Nasjonalparker og andre **verneområder**, bærekraftig forvaltning av fisk og skog, tiltak mot fremmede arter, **genbanker** (som Svalbard globale frøhvelv) og internasjonale avtaler som **naturavtalen** (2022), der landene ble enige om å verne **30 %** av land og hav innen 2030.

## Klassifisering
For å holde orden på artene sorterer biologene dem i et system. **Carl von Linné** (1700-tallet) innførte **binominal nomenklatur**: hver art har et latinsk navn i to deler – **slekt** og **artsnavn**, som *Homo sapiens* (menneske) og *Vulpes vulpes* (rødrev). Navnet skrives i kursiv, slekten med stor bokstav.

Taksonomiske nivåer, fra størst til minst: **domene – rike – rekke – klasse – orden – familie – slekt – art**. (Huskeregel: «**D**et **R**egner **R**ikelig **K**ulde **O**g **F**rost **S**om **A**ldri før».)

### Livets tre domener
- **Bakterier**: prokaryote.
- **Arker** (arkebakterier): prokaryote, ofte i ekstreme miljøer som varme kilder.
- **Eukaryoter**: med cellekjerne – omfatter rikene **dyr**, **planter**, **sopp** og **protister** (encellede eukaryoter som amøber og mange alger).
**Virus** regnes vanligvis ikke som levende, fordi de ikke kan formere seg uten en vertscelle.

## Slektskap og stamtrær
Moderne klassifisering bygger på **slektskap**: arter som har en nyere felles stamfar, plasseres nærmere hverandre. Slektskapet vises i **stamtrær** (fylogenetiske trær), og i dag brukes særlig **DNA-sammenligninger**. Overraskende resultater har kommet fram: sopp er for eksempel nærmere i slekt med dyr enn med planter.`,
`## What is biodiversity?
**Biodiversity** is the variety of life at three levels:
1. **Genetic diversity** within a species – lets the species adapt to change.
2. **Species diversity** – how many different species there are.
3. **Ecosystem diversity** – the variety of habitats, from rainforest and coral reefs to bogs and mountains.
Scientists have described about **2 million species**, but there are probably many millions more, especially insects, fungi and microorganisms. Diversity is greatest in the **tropics**.

## Why does diversity matter?
Nature provides **ecosystem services**: food, clean water, crop pollination, medicines, carbon storage, flood control and recreation. A diverse ecosystem is also more **resilient** to disease, climate change and other disturbances. Many also hold that nature has **intrinsic value**, regardless of its use to humans.

## Threats
Scientists believe we are in a **sixth mass extinction**, with species dying out much faster than normal. The biggest threats are:
- **Land-use change**: building, deforestation and cultivation destroy habitats – the biggest threat.
- **Overharvesting**: overfishing and hunting.
- **Climate change**.
- **Pollution**: plastic, toxins and eutrophication.
- **Invasive species** that displace native ones, such as the **Pacific oyster** and **Spanish slug** in Norway.
The **Norwegian Red List** lists species at risk of extinction in Norway, such as wild reindeer, Arctic fox and wild salmon.

## Protection and measures
National parks and other **protected areas**, sustainable management of fish and forests, action against invasive species, **gene banks** (such as the Svalbard Global Seed Vault) and international agreements like the **nature agreement** (2022), in which countries agreed to protect **30%** of land and sea by 2030.

## Classification
To keep track of species, biologists sort them into a system. **Carl Linnaeus** (1700s) introduced **binomial nomenclature**: each species has a two-part Latin name – **genus** and **species name**, like *Homo sapiens* (human) and *Vulpes vulpes* (red fox). The name is italicised, the genus capitalised.

Taxonomic ranks, from largest to smallest: **domain – kingdom – phylum – class – order – family – genus – species**. (Mnemonic: '**D**ear **K**ing **P**hilip **C**ame **O**ver **F**or **G**ood **S**oup'.)

### The three domains of life
- **Bacteria**: prokaryotic.
- **Archaea**: prokaryotic, often in extreme environments like hot springs.
- **Eukaryotes**: with a nucleus – including the kingdoms **animals**, **plants**, **fungi** and **protists** (single-celled eukaryotes such as amoebae and many algae).
**Viruses** are usually not considered living, because they can't reproduce without a host cell.

## Relationships and family trees
Modern classification is based on **relatedness**: species with a more recent common ancestor are placed closer together. Relationships are shown in **phylogenetic trees**, today based mainly on **DNA comparisons**. Some results are surprising: fungi, for example, are more closely related to animals than to plants.`);

// ===================== BIOLOGI 2 =====================
DEEP("VGBI2", "Fra gen til protein",
`## Det sentrale dogmet
Informasjonen i cellen flyter fra **DNA → RNA → protein**. DNA er «arkivet» i kjernen, **mRNA** er en arbeidskopi som tas med ut til ribosomene, og **proteinene** gjør jobben i cellen – som enzymer, transportmolekyler, hormoner, antistoffer og byggematerialer.

## RNA
RNA ligner DNA, men er **enkeltrådet**, har sukkeret **ribose** og basen **uracil (U)** i stedet for tymin. Tre viktige typer:
- **mRNA** (budbringer-RNA): kopien av genet.
- **tRNA** (overførings-RNA): henter aminosyrer til ribosomet.
- **rRNA** (ribosomalt RNA): en del av selve ribosomet.

## Transkripsjon
I kjernen åpner enzymet **RNA-polymerase** DNA-dobbeltspiralen ved genets **promotor** og bygger et mRNA som er komplementært til den ene DNA-tråden (A–U, T–A, C–G, G–C). Hos eukaryoter blir det første RNA-et **bearbeidet**: ikke-kodende biter (**introner**) klippes ut, og de kodende bitene (**eksoner**) skjøtes sammen (**spleising**). Det gjør at ett gen kan gi flere ulike proteiner.

## Den genetiske koden
mRNA leses i grupper på tre baser, **kodoner**. Med fire baser finnes 4³ = **64 kodoner**, som koder for **20 aminosyrer** pluss start- og stoppsignal. Koden er **universell** (nesten lik i alle organismer) og **redundant** (flere kodoner kan gi samme aminosyre). **AUG** er startkodonet (metionin), og **UAA, UAG** og **UGA** er stoppkodoner.

## Translasjon
På **ribosomet** leses mRNA-et kodon for kodon. Hvert **tRNA** har et **antikodon** som passer til et kodon, og bærer den riktige aminosyren. Ribosomet kobler aminosyrene sammen med **peptidbindinger** til en lang kjede – et **polypeptid** – til det når et stoppkodon.

## Proteinenes form
Rekkefølgen av aminosyrer (**primærstrukturen**) bestemmer hvordan kjeden **folder seg** til spiraler og flak (sekundærstruktur) og til en bestemt 3D-form (tertiærstruktur). Noen proteiner består av flere kjeder (kvartærstruktur, som hemoglobin). Formen avgjør funksjonen – derfor kan én endret aminosyre gjøre stor forskjell.

## Mutasjoner og følger
- **Punktmutasjon** (én base byttes): kan være **stum** (samme aminosyre), gi **feil aminosyre** (som ved **sigdcelleanemi**, der én base gir endret hemoglobin), eller gi et for tidlig **stoppkodon**.
- **Innsetting eller sletting** av baser forskyver **leserammen** og endrer alle kodonene etterpå – ofte svært skadelig.

## Genregulering
Alle kroppsceller har det samme DNA-et, men en nervecelle og en muskelcelle er helt ulike. Det er fordi cellene **slår gener av og på** (genregulering). **Transkripsjonsfaktorer** binder seg til DNA og styrer hvilke gener som leses. **Epigenetikk** – kjemiske merker på DNA og proteinene det er pakket rundt – påvirker også hvilke gener som er aktive, og kan påvirkes av miljøet.`,
`## The central dogma
Information in the cell flows **DNA → RNA → protein**. DNA is the 'archive' in the nucleus, **mRNA** is a working copy taken out to the ribosomes, and **proteins** do the work in the cell – as enzymes, transporters, hormones, antibodies and building materials.

## RNA
RNA resembles DNA but is **single-stranded**, has the sugar **ribose** and the base **uracil (U)** instead of thymine. Three important types:
- **mRNA** (messenger RNA): the copy of the gene.
- **tRNA** (transfer RNA): brings amino acids to the ribosome.
- **rRNA** (ribosomal RNA): part of the ribosome itself.

## Transcription
In the nucleus the enzyme **RNA polymerase** opens the DNA double helix at the gene's **promoter** and builds an mRNA complementary to one DNA strand (A–U, T–A, C–G, G–C). In eukaryotes the first RNA is **processed**: non-coding parts (**introns**) are cut out and the coding parts (**exons**) joined together (**splicing**). This lets one gene give several different proteins.

## The genetic code
mRNA is read in groups of three bases, **codons**. With four bases there are 4³ = **64 codons**, coding for **20 amino acids** plus start and stop signals. The code is **universal** (almost identical in all organisms) and **redundant** (several codons can give the same amino acid). **AUG** is the start codon (methionine), and **UAA, UAG** and **UGA** are stop codons.

## Translation
On the **ribosome** the mRNA is read codon by codon. Each **tRNA** has an **anticodon** that matches a codon and carries the right amino acid. The ribosome links the amino acids with **peptide bonds** into a long chain – a **polypeptide** – until it reaches a stop codon.

## Protein shape
The order of amino acids (the **primary structure**) determines how the chain **folds** into helices and sheets (secondary structure) and into a specific 3D shape (tertiary structure). Some proteins consist of several chains (quaternary structure, like haemoglobin). Shape determines function – so a single changed amino acid can make a big difference.

## Mutations and their effects
- **Point mutation** (one base changed): may be **silent** (same amino acid), give the **wrong amino acid** (as in **sickle-cell anaemia**, where one base alters haemoglobin), or create an early **stop codon**.
- **Insertion or deletion** of bases shifts the **reading frame** and changes every codon after it – often very harmful.

## Gene regulation
All body cells have the same DNA, yet a nerve cell and a muscle cell are completely different. That is because cells **switch genes on and off** (gene regulation). **Transcription factors** bind to DNA and control which genes are read. **Epigenetics** – chemical marks on DNA and the proteins it is wrapped around – also affects which genes are active and can be influenced by the environment.`);

DEEP("VGBI2", "Bioteknologi",
`## Hva er bioteknologi?
Bioteknologi er å bruke levende organismer, celler eller biologiske molekyler til å lage produkter eller løse problemer. Det er gammelt – gjær til baking og brygging har vi brukt i tusenvis av år – men **moderne genteknologi** gjør det mulig å lese, klippe og endre DNA direkte.

## Viktige verktøy
- **PCR** (polymerasekjedereaksjon): kopierer et lite DNA-stykke millioner av ganger på et par timer, ved å varme og kjøle i sykluser med en varmetålende DNA-polymerase. Brukes i diagnostikk (som koronatester), rettsmedisin og forskning.
- **Gelelektroforese**: DNA-biter sorteres etter størrelse i en gel ved hjelp av strøm. Brukes til **DNA-profiler** («genetiske fingeravtrykk»).
- **Restriksjonsenzymer** klipper DNA ved bestemte sekvenser, og **ligase** limer biter sammen.
- **DNA-sekvensering**: å lese basesekvensen. Hele menneskets genom ble kartlagt i 2003; i dag kan et genom leses på en dag.

## Genmodifisering
En **genmodifisert organisme (GMO)** har fått arvestoffet endret med genteknologi.
- **Bakterier** med innsatt menneskegen lager **insulin** til diabetikere – den første store suksessen (fra 1980-tallet).
- **Planter**: for eksempel mais som tåler insekter, eller «gyllen ris» med betakaroten mot A-vitaminmangel.
- **Dyr**: for eksempel laks som vokser raskere.

## CRISPR
**CRISPR-Cas9** er en «gensaks» som kan klippe DNA nøyaktig der man ønsker, og gjør genredigering billig og presist. Metoden kommer fra bakterienes forsvar mot virus, og **Emmanuelle Charpentier** og **Jennifer Doudna** fikk Nobelprisen i kjemi for den i 2020. CRISPR brukes i forskning, planteforedling og nye behandlinger – blant annet er det godkjent en genterapi mot **sigdcelleanemi**.

## Bruksområder
- **Medisin**: genterapi, mRNA-vaksiner, gentester for arvelige sykdommer, persontilpasset kreftbehandling.
- **Stamceller**: celler som kan utvikle seg til mange celletyper og brukes i forskning og behandling (for eksempel benmargstransplantasjon).
- **Rettsmedisin**: DNA-spor kan knytte personer til åsted, eller frikjenne uskyldige.
- **Landbruk og miljø**: mer motstandsdyktige planter, nedbryting av forurensning med bakterier.
- **Kloning**: å lage en genetisk kopi. Sauen **Dolly** (1996) var det første pattedyret klonet fra en voksen celle.

## Etiske spørsmål og regulering
Bioteknologi reiser vanskelige spørsmål: Er det riktig å **endre arvestoffet i kjønnsceller og embryoer**, slik at endringene går videre til neste generasjon? Hvem skal eie gener og patenter? Hva med **personvern** når gentester og DNA-registre blir vanlige? Hva skjer hvis genmodifiserte organismer spres i naturen? Kan **fosterdiagnostikk** føre til sortering av hvem som skal bli født? I Norge reguleres feltet av **bioteknologiloven** og **genteknologiloven**, og **Bioteknologirådet** gir råd. Etiske vurderinger kan gjøres med teoriene fra etikken: konsekvenser, plikter og menneskeverd.`,
`## What is biotechnology?
Biotechnology is using living organisms, cells or biological molecules to make products or solve problems. It is old – yeast for baking and brewing has been used for thousands of years – but **modern gene technology** makes it possible to read, cut and change DNA directly.

## Key tools
- **PCR** (polymerase chain reaction): copies a small piece of DNA millions of times in a couple of hours by heating and cooling in cycles with a heat-stable DNA polymerase. Used in diagnostics (like COVID tests), forensics and research.
- **Gel electrophoresis**: DNA fragments are sorted by size in a gel using electricity. Used for **DNA profiles** ('genetic fingerprints').
- **Restriction enzymes** cut DNA at specific sequences, and **ligase** joins pieces together.
- **DNA sequencing**: reading the base sequence. The whole human genome was mapped in 2003; today a genome can be read in a day.

## Genetic modification
A **genetically modified organism (GMO)** has had its genetic material altered by gene technology.
- **Bacteria** with an inserted human gene make **insulin** for diabetics – the first big success (from the 1980s).
- **Plants**: e.g. maize that resists insects, or 'golden rice' with beta-carotene against vitamin A deficiency.
- **Animals**: e.g. faster-growing salmon.

## CRISPR
**CRISPR-Cas9** is 'gene scissors' that can cut DNA exactly where desired, making gene editing cheap and precise. The method comes from bacteria's defence against viruses, and **Emmanuelle Charpentier** and **Jennifer Doudna** won the 2020 Nobel Prize in Chemistry for it. CRISPR is used in research, plant breeding and new treatments – a gene therapy for **sickle-cell anaemia** has been approved, for example.

## Applications
- **Medicine**: gene therapy, mRNA vaccines, tests for hereditary diseases, personalised cancer treatment.
- **Stem cells**: cells that can develop into many cell types, used in research and treatment (e.g. bone-marrow transplants).
- **Forensics**: DNA traces can link people to a crime scene – or clear the innocent.
- **Agriculture and environment**: hardier plants, bacteria that break down pollution.
- **Cloning**: making a genetic copy. **Dolly** the sheep (1996) was the first mammal cloned from an adult cell.

## Ethical questions and regulation
Biotechnology raises hard questions: is it right to **change the DNA of sex cells and embryos**, so that changes pass to the next generation? Who should own genes and patents? What about **privacy** when gene tests and DNA registers become common? What if GMOs spread in nature? Could **prenatal diagnostics** lead to selecting who gets born? In Norway the field is regulated by the **Biotechnology Act** and the **Gene Technology Act**, and the **Norwegian Biotechnology Advisory Board** gives advice. Ethical assessments can draw on ethical theories: consequences, duties and human dignity.`);

DEEP("VGBI2", "Nervesystemet og hormoner",
`## To kommunikasjonssystemer
Kroppen styres av to systemer som samarbeider: **nervesystemet**, som sender raske, presise signaler via nerver, og **hormonsystemet** (det endokrine systemet), som sender saktere, men mer langvarige signaler via blodet.

## Nervesystemets oppbygning
- **Sentralnervesystemet (CNS)**: hjernen og ryggmargen.
- **Det perifere nervesystemet**: nervene ut til kroppen. Det deles i det **somatiske** (viljestyrt – skjelettmusklene) og det **autonome** (ikke viljestyrt – hjerte, tarm, kjertler). Det autonome har to deler: **sympatikus** («kamp eller flukt»: høyere puls, større pupiller, mindre fordøyelse) og **parasympatikus** («hvile og fordøyelse»).

## Nervecellen og nerveimpulsen
En **nervecelle (nevron)** har **dendritter** som tar imot signaler, et **cellelegeme** og et langt **akson** som sender signalet videre. Mange aksoner er dekket av **myelin**, som gjør at signalet går mye raskere.

I hvile er innsiden av nervecellen negativt ladd (rundt **−70 mV**, **hvilepotensialet**), fordi **natrium-kalium-pumpa** holder mye Na⁺ ute og K⁺ inne. Når cellen stimuleres nok, åpnes natriumkanaler, Na⁺ strømmer inn, og innsiden blir kortvarig positiv – et **aksjonspotensial**. Så strømmer K⁺ ut, og spenningen går tilbake. Signalet forplanter seg langs aksonet som en bølge. Aksjonspotensialet følger **alt-eller-ingenting-prinsippet**: sterkere stimuli gir flere impulser, ikke større.

## Synapsen
Mellom to nerveceller er det en liten spalte, **synapsen**. Når signalet når enden av aksonet, slippes **signalstoffer (nevrotransmittere)** ut og binder seg til reseptorer på neste celle. Eksempler: **acetylkolin** (muskler), **dopamin** (belønning og motivasjon), **serotonin** (humør) og **noradrenalin**. Mange **rusmidler** og legemidler virker ved å påvirke synapsene – for eksempel ved å øke dopaminnivået, noe som kan gi **avhengighet**.

## Refleks
En **refleks** er en rask, automatisk reaksjon der signalet går fra **sansecelle → sensorisk nerve → ryggmarg → motorisk nerve → muskel**, uten om hjernen. Når du tar på en varm kokeplate, trekker du hånda til deg før du kjenner smerten.

## Hjernen
- **Storhjernen**: tenkning, språk, hukommelse, sanser og viljestyrt bevegelse. Barken er delt i lapper (pannelappen for planlegging og impulskontroll, som modnes sist – i midten av 20-årene).
- **Lillehjernen**: balanse og koordinasjon.
- **Hjernestammen**: livsviktige funksjoner som pust og hjerterytme.
- **Hypotalamus**: styrer temperatur, sult, tørst og hormonsystemet.

## Hormonsystemet
**Hormoner** er signalstoffer som lages i **kjertler**, skilles ut i blodet og virker på **målceller** med riktige reseptorer.
- **Hypofysen**: «hovedkjertelen» som styrer mange andre kjertler, under kontroll av hypotalamus.
- **Skjoldbruskkjertelen**: tyroksin regulerer stoffskiftet.
- **Binyrene**: **adrenalin** (rask stressreaksjon) og **kortisol** (langvarig stress).
- **Bukspyttkjertelen**: **insulin** senker blodsukkeret (cellene tar opp glukose), **glukagon** hever det.
- **Kjønnskjertlene**: **østrogen** og **progesteron** (eggstokkene), **testosteron** (testiklene) – styrer puberteten og formeringen.

## Homeostase og negativ tilbakekobling
Kroppen holder det **indre miljøet** stabilt (**homeostase**): temperatur rundt 37 °C, blodsukker og vanninnhold. Det skjer ofte ved **negativ tilbakekobling**: når blodsukkeret stiger etter et måltid, skiller bukspyttkjertelen ut insulin, og blodsukkeret går ned igjen. Ved **diabetes type 1** lager kroppen ikke insulin; ved **type 2** virker insulinet dårlig.`,
`## Two communication systems
The body is controlled by two cooperating systems: the **nervous system**, which sends fast, precise signals through nerves, and the **hormone system** (endocrine system), which sends slower but longer-lasting signals through the blood.

## Structure of the nervous system
- **Central nervous system (CNS)**: the brain and spinal cord.
- **Peripheral nervous system**: the nerves out to the body. It divides into the **somatic** (voluntary – skeletal muscles) and the **autonomic** (involuntary – heart, gut, glands). The autonomic has two parts: **sympathetic** ('fight or flight': higher pulse, wider pupils, less digestion) and **parasympathetic** ('rest and digest').

## The nerve cell and the nerve impulse
A **nerve cell (neuron)** has **dendrites** that receive signals, a **cell body** and a long **axon** that passes the signal on. Many axons are covered in **myelin**, which makes the signal travel much faster.

At rest the inside of a neuron is negatively charged (about **−70 mV**, the **resting potential**), because the **sodium-potassium pump** keeps much Na⁺ out and K⁺ in. When the cell is stimulated enough, sodium channels open, Na⁺ rushes in and the inside briefly becomes positive – an **action potential**. Then K⁺ flows out and the voltage returns. The signal travels along the axon like a wave. The action potential follows the **all-or-nothing principle**: stronger stimuli give more impulses, not bigger ones.

## The synapse
Between two neurons is a small gap, the **synapse**. When the signal reaches the end of the axon, **neurotransmitters** are released and bind to receptors on the next cell. Examples: **acetylcholine** (muscles), **dopamine** (reward and motivation), **serotonin** (mood) and **noradrenaline**. Many **drugs** and medicines act on synapses – for example by raising dopamine levels, which can cause **addiction**.

## Reflexes
A **reflex** is a fast, automatic reaction in which the signal goes **sensory cell → sensory nerve → spinal cord → motor nerve → muscle**, bypassing the brain. When you touch a hot hob you pull your hand back before you feel the pain.

## The brain
- **Cerebrum**: thinking, language, memory, senses and voluntary movement. The cortex is divided into lobes (the frontal lobe for planning and impulse control matures last – in the mid-20s).
- **Cerebellum**: balance and coordination.
- **Brainstem**: vital functions such as breathing and heart rate.
- **Hypothalamus**: controls temperature, hunger, thirst and the hormone system.

## The hormone system
**Hormones** are signal substances made in **glands**, released into the blood and acting on **target cells** with the right receptors.
- **Pituitary gland**: the 'master gland' controlling many others, under the control of the hypothalamus.
- **Thyroid**: thyroxine regulates metabolism.
- **Adrenal glands**: **adrenaline** (rapid stress response) and **cortisol** (long-term stress).
- **Pancreas**: **insulin** lowers blood sugar (cells take up glucose), **glucagon** raises it.
- **Sex glands**: **oestrogen** and **progesterone** (ovaries), **testosterone** (testes) – control puberty and reproduction.

## Homeostasis and negative feedback
The body keeps its **internal environment** stable (**homeostasis**): temperature around 37 °C, blood sugar and water content. This often happens through **negative feedback**: when blood sugar rises after a meal, the pancreas releases insulin and blood sugar falls again. In **type 1 diabetes** the body makes no insulin; in **type 2** insulin works poorly.`);

DEEP("VGBI2", "Immunforsvaret",
`## Hva skal immunforsvaret gjøre?
Immunforsvaret beskytter kroppen mot **patogener** – sykdomsfremkallende bakterier, virus, sopp og parasitter – og mot kreftceller. Det må skille mellom **«selv»** og **«ikke-selv»**: kroppens egne celler har bestemte molekyler på overflaten, mens fremmede stoffer som utløser en immunreaksjon, kalles **antigener**.

## Første forsvarslinje: barrierer
**Huden**, **slimhinnene** (med slim og flimmerhår i luftveiene), **magesyren**, enzymet **lysozym** i tårer og spytt, og de **nyttige bakteriene** på hud og i tarm hindrer de fleste mikrober i å komme inn.

## Andre forsvarslinje: det medfødte (uspesifikke) immunforsvaret
Hvis mikrober kommer seg inn, reagerer kroppen raskt og likt uansett hva slags inntrenger det er:
- **Betennelse**: skadet vev sender ut stoffer (som histamin) som gir mer blod til området – rødt, varmt, hovent og vondt – og tiltrekker hvite blodceller.
- **Fagocytter** (eteceller, som **makrofager** og nøytrofile granulocytter) spiser mikrobene.
- **Feber** gjør det vanskeligere for mikrobene å formere seg.
- **Komplementsystemet** og **interferoner** (mot virus) hjelper til.

## Tredje forsvarslinje: det ervervede (spesifikke) immunforsvaret
Dette forsvaret er tregere første gang, men **retter seg mot akkurat den mikroben** og **husker** den.
- **B-lymfocytter** (B-celler) blir aktivert av et bestemt antigen og blir til **plasmaceller**, som lager **antistoffer**. Antistoffene er Y-formede proteiner som binder seg til antigenet, «merker» mikroben for fagocyttene og nøytraliserer giftstoffer og virus.
- **T-lymfocytter**: **T-hjelperceller** koordinerer forsvaret og aktiverer B-celler og andre celler. **Drepe-T-celler** dreper kroppsceller som er infisert av virus eller har blitt kreftceller.
- **Hukommelsesceller**: noen B- og T-celler blir værende i kroppen i år, ofte hele livet.

## Primær og sekundær immunrespons
Første gang du møter en mikrobe, tar det **5–10 dager** før det er nok antistoffer – i mellomtiden blir du syk (**primær respons**). Neste gang kjenner hukommelsescellene igjen antigenet, og forsvaret slår til **raskere og kraftigere** (**sekundær respons**) – ofte så raskt at du ikke merker noe. Det er dette som gir **immunitet**.

## Vaksiner
En **vaksine** gir kroppen en ufarlig versjon av antigenet – svekkede eller drepte mikrober, deler av dem, eller en oppskrift (som **mRNA-vaksiner**) som får cellene til å lage et antigen. Kroppen danner hukommelsesceller **uten å bli syk**. Det norske **barnevaksinasjonsprogrammet** har nesten utryddet sykdommer som polio og difteri i Norge. Når mange er vaksinert, får vi **flokkimmunitet**, som beskytter dem som ikke kan vaksineres.
- **Aktiv immunisering**: kroppen lager selv antistoffer (sykdom eller vaksine).
- **Passiv immunisering**: man får ferdige antistoffer – fra mor via morkaken og morsmelk, eller som behandling.

## Når immunforsvaret svikter
- **Allergi**: immunforsvaret overreagerer på ufarlige stoffer som pollen, nøtter eller pelsdyr. Kan i verste fall gi livstruende **anafylaktisk sjokk**.
- **Autoimmune sykdommer**: immunforsvaret angriper kroppens egne celler, som ved **diabetes type 1**, revmatoid artritt og MS.
- **Immunsvikt**: for eksempel **hiv**, som angriper T-hjelpercellene og kan gi aids uten behandling.
- **Antibiotikaresistens**: antibiotika virker bare på bakterier, og overforbruk gjør at resistente bakterier sprer seg.

## Blodtyper og transfusjon
De røde blodcellene har antigener på overflaten (**A** og **B**). Har du blodtype A, har du antistoffer mot B i blodet. Gir man feil blod, klumper det seg (agglutinasjon). Blodtype **O negativ** kan gis til nesten alle (universalgiver), og **AB positiv** kan ta imot fra alle (universalmottaker).`,
`## What must the immune system do?
The immune system protects the body against **pathogens** – disease-causing bacteria, viruses, fungi and parasites – and against cancer cells. It must distinguish **'self'** from **'non-self'**: the body's own cells carry particular molecules on their surface, while foreign substances that trigger an immune response are called **antigens**.

## First line of defence: barriers
**Skin**, **mucous membranes** (with mucus and cilia in the airways), **stomach acid**, the enzyme **lysozyme** in tears and saliva, and **helpful bacteria** on the skin and in the gut keep most microbes out.

## Second line: the innate (non-specific) immune system
If microbes get in, the body reacts quickly and in the same way whatever the invader:
- **Inflammation**: damaged tissue releases substances (like histamine) that bring more blood – red, warm, swollen and painful – and attract white blood cells.
- **Phagocytes** (eating cells, such as **macrophages** and neutrophils) engulf microbes.
- **Fever** makes it harder for microbes to multiply.
- The **complement system** and **interferons** (against viruses) help.

## Third line: the adaptive (specific) immune system
This defence is slower the first time but **targets that exact microbe** and **remembers** it.
- **B lymphocytes** (B cells) are activated by a specific antigen and become **plasma cells**, which make **antibodies**. Antibodies are Y-shaped proteins that bind the antigen, 'tag' the microbe for phagocytes and neutralise toxins and viruses.
- **T lymphocytes**: **helper T cells** coordinate the defence and activate B cells and others. **Killer T cells** kill body cells infected by viruses or turned cancerous.
- **Memory cells**: some B and T cells stay in the body for years, often for life.

## Primary and secondary immune response
The first time you meet a microbe it takes **5–10 days** before there are enough antibodies – meanwhile you get ill (the **primary response**). Next time the memory cells recognise the antigen and the defence strikes **faster and harder** (the **secondary response**) – often so fast you notice nothing. This gives **immunity**.

## Vaccines
A **vaccine** gives the body a harmless version of the antigen – weakened or killed microbes, parts of them, or a recipe (as in **mRNA vaccines**) that makes cells produce an antigen. The body forms memory cells **without getting ill**. Norway's **childhood vaccination programme** has almost eliminated diseases such as polio and diphtheria in Norway. When many are vaccinated we get **herd immunity**, protecting those who can't be vaccinated.
- **Active immunisation**: the body makes its own antibodies (disease or vaccine).
- **Passive immunisation**: ready-made antibodies are received – from the mother via the placenta and breast milk, or as treatment.

## When the immune system fails
- **Allergy**: the immune system overreacts to harmless substances like pollen, nuts or animal fur. At worst it can cause life-threatening **anaphylactic shock**.
- **Autoimmune diseases**: the immune system attacks the body's own cells, as in **type 1 diabetes**, rheumatoid arthritis and MS.
- **Immunodeficiency**: for example **HIV**, which attacks helper T cells and can cause AIDS without treatment.
- **Antibiotic resistance**: antibiotics only work on bacteria, and overuse lets resistant bacteria spread.

## Blood groups and transfusion
Red blood cells carry antigens on their surface (**A** and **B**). If you have blood group A, you have antibodies against B in your blood. Giving the wrong blood causes clumping (agglutination). Group **O negative** can be given to almost anyone (universal donor), and **AB positive** can receive from anyone (universal recipient).`);
})();
