// ============================================================
//  sorts.js – to små, intuitive oppgavetyper som kan brukes i alle fag:
//   • «Sorter i grupper» (![sort:navn]): ett og ett kort, trykk på riktig gruppe.
//   • «Rekkefølge» (![seq:navn]): sett stegene i en prosess i riktig rekkefølge.
//  Kobles til enheter via WG_UNITS (fag, enhetstittel, "sort:navn" / "seq:navn").
// ============================================================
// SORTS[navn] = { t: [nb, en], k: [[nb, en], …] grupper, it: [[nb, en, gruppe, hvorfor nb?, hvorfor en?, skilt?], …] }
const SORTS = {
  fk_vik: { t: ["Hvem må vike?", "Who must give way?"], k: [["Du må vike", "You give way"], ["Den andre må vike", "The other gives way"]],
    it: [["Du kjører ut fra en parkeringsplass", "You pull out of a car park", 0, "Utkjøringsregelen: den som kjører ut fra parkeringsplass, gårdsplass eller gang- og sykkelveg, har vikeplikt.", "The exit rule: drivers leaving car parks, driveways or cycle paths give way."],
      ["Uregulert kryss – en bil kommer fra høyre", "Unmarked junction – a car comes from the right", 0, "Høyreregelen: du har vikeplikt for trafikk fra høyre.", "The right-hand rule: give way to traffic from the right."],
      ["Uregulert kryss – en bil kommer fra venstre", "Unmarked junction – a car comes from the left", 1, "Bilen fra venstre har deg på sin høyre side og må vike.", "The car from the left has you on its right and must give way."],
      ["Du svinger til venstre, møtende bil kjører rett fram", "You turn left, an oncoming car goes straight", 0, "Den som svinger til venstre, må vike for møtende trafikk.", "When turning left you give way to oncoming traffic."],
      ["En fotgjenger har gått ut i gangfeltet", "A pedestrian has stepped onto the crossing", 0, "Du har vikeplikt for gående som er ute i eller på vei ut i gangfeltet.", "You must give way to pedestrians on or about to step onto the crossing."],
      ["Du kjører på forkjørsveg, en bil venter i sidevegen", "You're on a priority road, a car waits in a side road", 1, "På forkjørsveg har trafikken fra sidevegene vikeplikt for deg.", "On a priority road, traffic from side roads gives way to you."],
      ["Du er inne i rundkjøringen, en bil står ved innkjøringen", "You're in the roundabout, a car waits at the entry", 1, "Det står vikepliktskilt ved innkjøringen – den som skal inn, må vike.", "There's a give-way sign at the entry – the one entering gives way."],
      ["En buss blinker ut fra holdeplass i 50-sone", "A bus signals out from a stop in a 50 zone", 0, "Der fartsgrensen er 60 eller lavere, skal du slippe ut buss som blinker ut fra holdeplass.", "Where the limit is 60 or lower, let a bus signalling out from a stop pull out."],
      ["Ambulanse med blålys og sirene kommer bakfra", "An ambulance with lights and siren comes from behind", 0, "Utrykningskjøretøy med blålys og sirene skal du gi fri veg.", "Give way to emergency vehicles using lights and siren."],
      ["Du har vikepliktskilt, en bil kommer fra venstre", "You have a give-way sign, a car comes from the left", 0, "Vikepliktskiltet gjelder trafikk fra begge sider.", "The give-way sign applies to traffic from both sides."]] },
  samf_makt: { t: ["Hvem har makten?", "Who holds the power?"], k: [["Lovgivende (Stortinget)", "Legislative (Storting)"], ["Utøvende (regjeringen)", "Executive (government)"], ["Dømmende (domstolene)", "Judicial (courts)"]],
    it: [["Vedtar nye lover", "Passes new laws", 0], ["Vedtar statsbudsjettet", "Passes the state budget", 0, "Det er Stortinget som bevilger pengene.", "The Storting grants the money."],
      ["Kontrollerer regjeringen og kan felle den", "Scrutinises the government and can bring it down", 0, "Parlamentarismen: regjeringen må ha Stortingets tillit.", "Parliamentarism: the government needs the Storting's confidence."],
      ["Legger fram forslag til nye lover", "Proposes new laws", 1, "De fleste lovforslag kommer fra regjeringen, men vedtas av Stortinget.", "Most bills come from the government but are passed by the Storting."],
      ["Departementene setter vedtakene ut i livet", "Ministries carry out decisions", 1], ["Statsministeren leder arbeidet", "The prime minister leads the work", 1],
      ["Høyesterett avgjør en sak", "The Supreme Court decides a case", 2], ["Tingretten dømmer i en straffesak", "The district court rules in a criminal case", 2],
      ["Prøver om en lov strider mot Grunnloven", "Checks whether a law breaches the Constitution", 2, "Domstolene kan sette til side lover som strider mot Grunnloven.", "The courts can set aside laws that breach the Constitution."]] },
  kj_ph: { t: ["Sur, nøytral eller basisk?", "Acidic, neutral or basic?"], k: [["Sur (pH < 7)", "Acidic (pH < 7)"], ["Nøytral (pH ≈ 7)", "Neutral (pH ≈ 7)"], ["Basisk (pH > 7)", "Basic (pH > 7)"]],
    it: [["Saltsyre, HCl", "Hydrochloric acid, HCl", 0], ["Sitronsaft", "Lemon juice", 0, "Inneholder sitronsyre, pH rundt 2.", "Contains citric acid, pH around 2."], ["Eddik", "Vinegar", 0, "Eddiksyre gir pH rundt 3.", "Acetic acid gives pH around 3."], ["Magesyre", "Stomach acid", 0], ["Kaffe", "Coffee", 0, "Svakt sur, pH rundt 5.", "Slightly acidic, pH around 5."],
      ["Rent vann", "Pure water", 1], ["Koksaltløsning, NaCl(aq)", "Salt solution, NaCl(aq)", 1, "Na⁺ og Cl⁻ påvirker ikke pH.", "Na⁺ and Cl⁻ do not affect pH."],
      ["Natronlut, NaOH", "Sodium hydroxide, NaOH", 2], ["Ammoniakk", "Ammonia", 2, "NH₃ tar opp H⁺ fra vann og danner OH⁻.", "NH₃ takes H⁺ from water and forms OH⁻."], ["Såpevann", "Soapy water", 2], ["Natron løst i vann", "Baking soda in water", 2, "Hydrogenkarbonat er en svak base.", "Hydrogen carbonate is a weak base."]] },
  bio_celle: { t: ["Plantecelle eller dyrecelle?", "Plant cell or animal cell?"], k: [["Bare plantecelle", "Plant cell only"], ["Begge", "Both"], ["Bare dyrecelle", "Animal cell only"]],
    it: [["Cellevegg", "Cell wall", 0, "Celleveggen av cellulose gir planten stivhet.", "The cellulose wall makes plants rigid."], ["Kloroplaster", "Chloroplasts", 0, "Her skjer fotosyntesen.", "Photosynthesis happens here."], ["Stor, sentral vakuole", "Large central vacuole", 0],
      ["Cellemembran", "Cell membrane", 1], ["Cellekjerne", "Nucleus", 1], ["Mitokondrier", "Mitochondria", 1, "Også planter trenger celleånding.", "Plants also need cellular respiration."], ["Ribosomer", "Ribosomes", 1], ["Endoplasmatisk nettverk", "Endoplasmic reticulum", 1],
      ["Sentrioler", "Centrioles", 2, "Høyere planter mangler sentrioler.", "Higher plants lack centrioles."], ["Lysosomer", "Lysosomes", 2]] },
  bio_oko: { t: ["Produsent, konsument eller nedbryter?", "Producer, consumer or decomposer?"], k: [["Produsent", "Producer"], ["Konsument", "Consumer"], ["Nedbryter", "Decomposer"]],
    it: [["Gress", "Grass", 0], ["Planteplankton", "Phytoplankton", 0, "Står for omtrent halvparten av fotosyntesen på jorda.", "Does about half of all photosynthesis on Earth."], ["Bjørk", "Birch", 0], ["Tang og tare", "Seaweed and kelp", 0],
      ["Hare", "Hare", 1, "Planteeter: primærkonsument.", "Herbivore: primary consumer."], ["Rev", "Fox", 1], ["Dyreplankton", "Zooplankton", 1], ["Menneske", "Human", 1],
      ["Sopp", "Fungi", 2, "Bryter ned dødt organisk materiale.", "Breaks down dead organic matter."], ["Bakterier i jorda", "Soil bacteria", 2], ["Meitemark", "Earthworm", 2]] },
  nat_energi: { t: ["Fornybar eller ikke?", "Renewable or not?"], k: [["Fornybar", "Renewable"], ["Ikke-fornybar", "Non-renewable"]],
    it: [["Vannkraft", "Hydropower", 0], ["Vindkraft", "Wind power", 0], ["Solenergi", "Solar power", 0], ["Bølgekraft", "Wave power", 0], ["Bioenergi fra skog", "Bioenergy from forests", 0, "Fornybar så lenge ny skog vokser opp.", "Renewable as long as new forest grows."], ["Geotermisk energi", "Geothermal energy", 0],
      ["Olje", "Oil", 1, "Fossilt: brukte millioner av år på å dannes.", "Fossil: took millions of years to form."], ["Kull", "Coal", 1], ["Naturgass", "Natural gas", 1], ["Kjernekraft (uran)", "Nuclear (uranium)", 1, "Uran finnes i en begrenset mengde.", "Uranium exists in limited amounts."]] },
  rel_begrep: { t: ["Hvilken religion?", "Which religion?"], k: [["Kristendom", "Christianity"], ["Islam", "Islam"], ["Jødedom", "Judaism"], ["Buddhisme", "Buddhism"]],
    it: [["Nattverd", "Holy Communion", 0], ["Påske og oppstandelsen", "Easter and the Resurrection", 0], ["Treenigheten", "The Trinity", 0],
      ["Koranen", "The Qur'an", 1], ["Ramadan", "Ramadan", 1], ["Pilegrimsreisen til Mekka", "The pilgrimage to Mecca", 1],
      ["Sabbat", "Sabbath", 2], ["Toraen", "The Torah", 2], ["Synagoge", "Synagogue", 2],
      ["De fire edle sannheter", "The Four Noble Truths", 3], ["Nirvana", "Nirvana", 3], ["Den åttedelte veien", "The Eightfold Path", 3]] },
  rel_etikk: { t: ["Hvilken etisk teori?", "Which ethical theory?"], k: [["Pliktetikk", "Duty ethics"], ["Konsekvensetikk", "Consequentialism"], ["Dydsetikk", "Virtue ethics"]],
    it: [["Det er alltid galt å lyve", "It is always wrong to lie", 0], ["Mennesker må aldri bare brukes som middel", "People must never be used merely as means", 0, "Kants humanitetsformel.", "Kant's formula of humanity."], ["Handle slik du vil at alle skal handle", "Act as you would want everyone to act", 0, "Kants kategoriske imperativ.", "Kant's categorical imperative."],
      ["Mest mulig lykke for flest mulig", "The greatest happiness for the greatest number", 1, "Utilitarismen (Bentham og Mill).", "Utilitarianism (Bentham and Mill)."], ["En hvit løgn er greit hvis den gjør noen glad", "A white lie is fine if it makes someone happy", 1], ["Målet helliger middelet", "The end justifies the means", 1],
      ["Hva ville et godt menneske gjort?", "What would a good person do?", 2], ["Mot er midt mellom feighet og dumdristighet", "Courage lies between cowardice and recklessness", 2, "Aristoteles' gylne middelvei.", "Aristotle's golden mean."], ["Øv deg på gode vaner til de blir en del av deg", "Practise good habits until they become part of you", 2]] },
  his_kilder: { t: ["Primær- eller sekundærkilde?", "Primary or secondary source?"], k: [["Primærkilde", "Primary source"], ["Sekundærkilde", "Secondary source"]],
    it: [["Et brev skrevet på Eidsvoll i 1814", "A letter written at Eidsvoll in 1814", 0], ["Dagboka til en soldat fra 1940", "A soldier's diary from 1940", 0], ["Et fotografi tatt 9. april 1940", "A photo taken on 9 April 1940", 0], ["En runestein fra vikingtiden", "A runestone from the Viking Age", 0], ["Et vitneavhør fra 1945", "A witness statement from 1945", 0],
      ["Læreboka di i historie", "Your history textbook", 1], ["En dokumentar laget i 2020 om vikingene", "A 2020 documentary about the Vikings", 1], ["En Wikipedia-artikkel om andre verdenskrig", "A Wikipedia article about WWII", 1], ["En historikers bok om svartedauden", "A historian's book about the Black Death", 1]] },
  ok_konto: { t: ["Hvor hører posten hjemme?", "Where does the item belong?"], k: [["Eiendel", "Asset"], ["Gjeld", "Liability"], ["Inntekt", "Income"], ["Kostnad", "Expense"]],
    it: [["Bankinnskudd", "Bank deposit", 0], ["Varelager", "Inventory", 0], ["Maskiner", "Machinery", 0], ["Kundefordringer", "Accounts receivable", 0, "Penger kundene skylder oss.", "Money customers owe us."],
      ["Banklån", "Bank loan", 1], ["Leverandørgjeld", "Accounts payable", 1], ["Skyldig merverdiavgift", "VAT payable", 1],
      ["Salgsinntekt", "Sales revenue", 2], ["Renteinntekt", "Interest income", 2],
      ["Lønn til ansatte", "Wages", 3], ["Husleie", "Rent", 3], ["Avskrivninger", "Depreciation", 3, "Verdifallet på driftsmidler føres som kostnad.", "The fall in value of fixed assets is an expense."]] },
  ok_politikk: { t: ["Gasspedal eller brems?", "Accelerator or brake?"], k: [["Ekspansiv (øker aktiviteten)", "Expansionary"], ["Kontraktiv (demper aktiviteten)", "Contractionary"]],
    it: [["Norges Bank senker renta", "The central bank cuts the rate", 0], ["Staten øker offentlige utgifter", "The state raises public spending", 0], ["Skattekutt", "Tax cuts", 0], ["Flere offentlige byggeprosjekter", "More public building projects", 0],
      ["Norges Bank hever renta", "The central bank raises the rate", 1, "Dyrere lån gir mindre forbruk og lavere prisvekst.", "Dearer loans reduce spending and inflation."], ["Skatteøkning", "Tax increase", 1], ["Staten kutter i budsjettet", "The state cuts the budget", 1]] },
  mat_modell: { t: ["Hvilken type modell?", "Which kind of model?"], k: [["Lineær", "Linear"], ["Andregrads", "Quadratic"], ["Eksponentiell", "Exponential"]],
    it: [["y = 2x + 3", "y = 2x + 3", 0], ["Øker med 5 kr hver dag", "Grows by 5 kr every day", 0, "Fast økning per tidsenhet = lineær.", "A fixed increase per unit time = linear."], ["y = −3x", "y = −3x", 0],
      ["y = x² − 1", "y = x² − 1", 1], ["Banen til en kastet ball", "The path of a thrown ball", 1], ["y = −x² + 4x", "y = −x² + 4x", 1],
      ["y = 3 · 2ˣ", "y = 3 · 2ˣ", 2], ["Dobles hvert år", "Doubles every year", 2, "Fast prosentvis økning = eksponentiell.", "A fixed percentage increase = exponential."], ["y = 500 · 0,9ˣ", "y = 500 · 0.9ˣ", 2], ["Mister 10 % av verdien hvert år", "Loses 10% of its value each year", 2]] }
};
Object.assign(SORTS, {
  nor_sjanger: { t: ["Epikk, lyrikk eller dramatikk?", "Epic, lyric or drama?"], k: [["Epikk", "Epic"], ["Lyrikk", "Lyric"], ["Dramatikk", "Drama"]],
    it: [["Roman", "Novel", 0], ["Novelle", "Short story", 0], ["Eventyr", "Fairy tale", 0], ["Saga", "Saga", 0], ["Dikt", "Poem", 1], ["Sonett", "Sonnet", 1, "Et dikt med 14 linjer.", "A 14-line poem."], ["Haiku", "Haiku", 1], ["Folkevise", "Ballad", 1, "Folkeviser er sangbare dikt.", "Ballads are poems meant to be sung."],
      ["Skuespill", "Play", 2], ["Komedie", "Comedy", 2], ["Tragedie", "Tragedy", 2]] },
  nor_virke: { t: ["Hvilket virkemiddel?", "Which device?"], k: [["Metafor", "Metaphor"], ["Sammenligning", "Simile"], ["Besjeling", "Personification"], ["Allitterasjon", "Alliteration"]],
    it: [["«Livet er en reise»", "'Life is a journey'", 0], ["«Hun er en klippe»", "'She is a rock'", 0], ["«Sterk som en bjørn»", "'Strong as a bear'", 1], ["«Øynene var som stjerner»", "'Eyes like stars'", 1],
      ["«Vinden hvisket»", "'The wind whispered'", 2], ["«Trærne sukket i stormen»", "'The trees sighed in the storm'", 2], ["«Sakte sank solen»", "'Slowly sank the sun'", 3], ["«Mange myke maur»", "'Many mellow mice'", 3]] },
  nor_appell: { t: ["Etos, patos eller logos?", "Ethos, pathos or logos?"], k: [["Etos", "Ethos"], ["Patos", "Pathos"], ["Logos", "Logos"]],
    it: [["«Som lege i 20 år kan jeg si …»", "'As a doctor for 20 years I can say …'", 0], ["Taleren er rolig, saklig og godt forberedt", "The speaker is calm, factual and well prepared", 0], ["«Jeg innrømmer at jeg tok feil før»", "'I admit I was wrong before'", 0, "Ærlighet øker troverdigheten.", "Honesty builds credibility."],
      ["«Se for deg den lille jenta alene i kulda»", "'Picture the little girl alone in the cold'", 1], ["«Dette er en skam for hele landet!»", "'This is a disgrace to the whole country!'", 1], ["Sår musikk og sterke bilder i reklamen", "Sad music and strong images in an advert", 1],
      ["«Ulykkene gikk ned med 30 %»", "'Accidents fell by 30%'", 2], ["«Hvis A fører til B, og B til C, fører A til C»", "'If A leads to B and B to C, A leads to C'", 2], ["«Undersøkelsen omfattet 2000 personer»", "'The survey covered 2,000 people'", 2]] },
  nor_feil: { t: ["Hvilken argumentasjonsfeil?", "Which fallacy?"], k: [["Personangrep", "Ad hominem"], ["Stråmann", "Straw man"], ["Falskt dilemma", "False dilemma"], ["Glidebane", "Slippery slope"]],
    it: [["«Du er jo bare 16, hva vet du om dette?»", "'You're only 16, what do you know?'", 0], ["«Han kan ikke mene noe om klima, han har jo bil selv»", "'He can't talk about climate, he owns a car'", 0],
      ["«Så du mener at vi skal forby alle biler?»", "'So you think we should ban all cars?'", 1], ["«Hun vil ha mindre lekser – hun vil altså at ingen skal lære noe»", "'She wants less homework – so she wants nobody to learn anything'", 1],
      ["«Enten er du med oss, eller så er du mot oss»", "'Either you're with us or against us'", 2], ["«Vil du ha ny skole, eller skal barna fryse?»", "'Do you want a new school, or should the children freeze?'", 2],
      ["«Tillater vi mobil i friminuttet, blir det snart mobil i alle timer»", "'Allow phones at break and soon they'll be in every lesson'", 3], ["«Senker vi aldersgrensen nå, blir det ingen grenser til slutt»", "'Lower the age limit now and soon there'll be no limits'", 3]] }
});
// Skiltgruppene lages rett fra skiltdataene, med selve skiltet på kortet.
if(typeof FK_SIGN_INFO !== "undefined" && typeof FK_SIGNS !== "undefined"){
  const G = { fare: 0, forbud: 1, pabud: 2, oppl: 3 }, why = [["Fareskilt varsler om farer: rød kant og trekant.", "Warning signs: red-bordered triangle."], ["Forbudsskilt er runde med rød kant.", "Prohibitory signs are round with a red border."], ["Påbudsskilt er blå sirkler med hvitt symbol.", "Mandatory signs are blue circles with a white symbol."], ["Opplysningsskilt er oftest blå rektangler.", "Information signs are usually blue rectangles."]];
  SORTS.fk_skilt = { t: ["Hvilken skiltgruppe?", "Which sign group?"], k: [["Fareskilt", "Warning"], ["Forbudsskilt", "Prohibitory"], ["Påbudsskilt", "Mandatory"], ["Opplysningsskilt", "Information"]],
    it: FK_SIGN_INFO.filter(r => r[1] in G && FK_SIGNS[r[0]]).map(r => [r[2], r[3], G[r[1]], why[G[r[1]]][0], why[G[r[1]]][1], r[0]]) };
}
// SEQS[navn] = { t: [nb, en], s: [[nb, en], …] i riktig rekkefølge }
const SEQS = {
  fk_ulykke: { t: ["Du kommer først til en ulykke", "You are first at an accident"], s: [["Stopp, sett på nødblink og ta på refleksvest", "Stop, hazard lights on, put on a hi-vis vest"], ["Sett ut varseltrekanten", "Put out the warning triangle"], ["Skaff deg oversikt: hvor mange er skadd?", "Get an overview: how many are hurt?"], ["Ring 113", "Call 113"], ["Gi livreddende førstehjelp", "Give life-saving first aid"], ["Hold de skadde varme og vær hos dem til hjelpen kommer", "Keep the injured warm and stay until help arrives"]] },
  fk_hlr: { t: ["Hjerte-lunge-redning (HLR)", "CPR"], s: [["Sjekk om personen reagerer: rop og rist", "Check for a response: shout and shake"], ["Åpne luftveiene: hodet bakover, løft haken", "Open the airway: tilt the head, lift the chin"], ["Se, lytt og kjenn etter pust i 10 sekunder", "Look, listen and feel for breathing for 10 seconds"], ["Ring 113", "Call 113"], ["Gi 30 brystkompresjoner", "Give 30 chest compressions"], ["Gi 2 innblåsninger og fortsett 30:2", "Give 2 rescue breaths and continue 30:2"]] },
  fk_forbi: { t: ["Forbikjøring steg for steg", "Overtaking step by step"], s: [["Vurder: er det lov, god sikt og nok plass?", "Check: is it allowed, with good visibility and room?"], ["Sjekk speilene", "Check the mirrors"], ["Blink til venstre", "Signal left"], ["Skulderblikk i blindsonen", "Look over your shoulder into the blind spot"], ["Kjør ut og pass med god sideavstand", "Pull out and pass with good clearance"], ["Når bilen synes i innvendig speil: blink og legg deg inn", "When the car shows in your mirror: signal and pull in"]] },
  samf_lov: { t: ["Slik blir en lov til", "How a law is made"], s: [["Et utvalg utreder saken (NOU)", "A committee studies the issue (NOU)"], ["Forslaget sendes på høring", "The proposal goes out for consultation"], ["Regjeringen legger fram lovforslag for Stortinget", "The government presents a bill to the Storting"], ["En fagkomité på Stortinget behandler saken", "A Storting committee considers the bill"], ["Stortinget vedtar loven", "The Storting passes the law"], ["Kongen i statsråd sanksjonerer loven", "The King in Council gives royal assent"], ["Loven trer i kraft", "The law comes into force"]] },
  bio_mitose: { t: ["Mitosen i riktig rekkefølge", "Mitosis in order"], s: [["Interfase: DNA kopieres", "Interphase: DNA is copied"], ["Profase: kromosomene blir synlige", "Prophase: chromosomes become visible"], ["Metafase: kromosomene stiller seg på midten", "Metaphase: chromosomes line up in the middle"], ["Anafase: kromatidene trekkes fra hverandre", "Anaphase: chromatids are pulled apart"], ["Telofase: to nye kjerner dannes", "Telophase: two new nuclei form"], ["Cytokinese: cellen deler seg i to", "Cytokinesis: the cell splits in two"]] },
  nat_metode: { t: ["Den naturvitenskapelige metoden", "The scientific method"], s: [["Observer og still et spørsmål", "Observe and ask a question"], ["Lag en hypotese", "Form a hypothesis"], ["Planlegg et forsøk med én variabel", "Plan an experiment with one variable"], ["Gjør forsøket og samle data", "Run the experiment and collect data"], ["Analyser resultatene", "Analyse the results"], ["Trekk en konklusjon og del den", "Draw a conclusion and share it"]] },
  ok_mva: { t: ["Fra faktura til regnskap", "From invoice to accounts"], s: [["Kunden bestiller varen", "The customer orders the goods"], ["Varen leveres", "The goods are delivered"], ["Faktura sendes med mva", "An invoice with VAT is sent"], ["Salget bokføres som inntekt og kundefordring", "The sale is booked as income and a receivable"], ["Kunden betaler", "The customer pays"], ["Mva betales til staten ved neste termin", "VAT is paid to the state at the next term"]] }
};
Object.assign(SEQS, {
  nor_drofting: { t: ["Slik bygger du en drøftende tekst", "How to build a discussion text"], s: [["Innledning: presenter saken og problemstillingen", "Introduction: present the issue and question"], ["Argumenter for", "Arguments for"], ["Argumenter mot", "Arguments against"], ["Vei argumentene mot hverandre", "Weigh the arguments against each other"], ["Avslutning: begrunnet konklusjon", "Conclusion: a reasoned answer"]] }
});
const WG_UNITS = [["FKB", "Vikeplikt og forkjørsrett", "sort:fk_vik"], ["FKMC", "Vikeplikt og forkjørsrett", "sort:fk_vik"], ["FKB", "Skilt og vegoppmerking", "sort:fk_skilt"], ["FKMC", "Skilt og vegoppmerking", "sort:fk_skilt"],
  ["FKB", "Ulykker og førstehjelp", "seq:fk_ulykke"], ["FKB", "Ulykker og førstehjelp", "seq:fk_hlr"], ["FKB", "Plassering, feltskifte og forbikjøring", "seq:fk_forbi"], ["FKMC", "Plassering, feltskifte og forbikjøring", "seq:fk_forbi"],
  ["VGSAMF", "Demokrati og politikk i Norge", "sort:samf_makt"], ["VGSAMF", "Demokrati og politikk i Norge", "seq:samf_lov"], ["JSTAT", "Grunnloven og maktfordelingen", "sort:samf_makt"],
  ["VGKJ1", "Syrer, baser og pH", "sort:kj_ph"], ["VGBI1", "Cellen", "sort:bio_celle"], ["VGBI1", "Cellen", "seq:bio_mitose"], ["VGBI1", "Økologi", "sort:bio_oko"],
  ["VGNAT", "Energi og energikilder", "sort:nat_energi"], ["VGNAT", "Naturvitenskapelig metode", "seq:nat_metode"], ["VGREL", "Religion i Norge og verden", "sort:rel_begrep"], ["VGREL", "Etiske teorier", "sort:rel_etikk"],
  ["VGHIS", "Historiefaget og kildekritikk", "sort:his_kilder"], ["OREG", "Resultat og balanse", "sort:ok_konto"], ["OREG", "Merverdiavgift", "seq:ok_mva"], ["OSAM", "Makroøkonomi: BNP, inflasjon og rente", "sort:ok_politikk"],
  ["VG1T", "Funksjoner", "sort:mat_modell"], ["VG1P", "Lineære modeller og grafer", "sort:mat_modell"],
  ["VGNOR", "Sjangre og virkemidler", "sort:nor_sjanger"], ["VGNOR", "Sjangre og virkemidler", "sort:nor_virke"], ["VGNOR", "Retorikk og argumentasjon", "sort:nor_appell"], ["VGNOR", "Retorikk og argumentasjon", "sort:nor_feil"], ["VGNOR", "Retorikk og argumentasjon", "seq:nor_drofting"]];
// Arkitektur
Object.assign(SORTS, {
  ark_stil: { t: ["Hvilken stil?", "Which style?"], k: [["Romansk", "Romanesque"], ["Gotikk", "Gothic"], ["Renessanse", "Renaissance"], ["Barokk", "Baroque"]],
    it: [["Rundbuer og tykke murer", "Round arches and thick walls", 0], ["Små vinduer og tunge, lukkede rom", "Small windows and heavy, closed spaces", 0],
      ["Spissbuer og ribbehvelv", "Pointed arches and rib vaults", 1], ["Strebebuer utenfor veggene", "Flying buttresses outside the walls", 1, "De tar skyvet fra hvelvene, så veggene kan bli glass.", "They take the thrust of the vaults so the walls can become glass."],
      ["Store glassmalerier og rosevinduer", "Large stained glass and rose windows", 1], ["Symmetri og proporsjoner etter antikke forbilder", "Symmetry and proportion after antique models", 2],
      ["Brunelleschis kuppel i Firenze", "Brunelleschi's dome in Florence", 2], ["Svungne former og dramatisk lys", "Curved forms and dramatic light", 3],
      ["Lange akser gjennom slott og hage", "Long axes through palace and garden", 3, "Versailles er det klassiske eksempelet.", "Versailles is the classic example."]] },
  ark_last: { t: ["Trykk eller strekk?", "Compression or tension?"], k: [["Trykk", "Compression"], ["Strekk", "Tension"]],
    it: [["En søyle som bærer et tak", "A column carrying a roof", 0], ["En steinbue", "A stone arch", 0, "Buen fører lasten ned som trykk.", "The arch carries the load down as compression."],
      ["Kablene i en hengebro", "The cables of a suspension bridge", 1], ["Underkanten av en bjelke som bøyes nedover", "The underside of a beam bending downwards", 1, "Bjelken krummes, og underkanten forlenges.", "The beam curves and the underside stretches."],
      ["Overkanten av den samme bjelken", "The top of the same beam", 0], ["En teltduk som er spent opp", "A tensioned tent fabric", 1], ["En kuppel av mur", "A masonry dome", 0],
      ["Stagene som holder oppe en hengende trapp", "The rods holding up a suspended stair", 1]] }
});
Object.assign(SEQS, {
  ark_epoker: { t: ["Stilperiodene i rekkefølge", "The style periods in order"], s: [["Antikken", "Antiquity"], ["Romansk", "Romanesque"], ["Gotikk", "Gothic"], ["Renessanse", "Renaissance"], ["Barokk", "Baroque"], ["Klassisisme", "Classicism"], ["Jugend", "Art Nouveau"], ["Funksjonalisme", "Functionalism"], ["Postmodernisme", "Postmodernism"]] },
  ark_prosess: { t: ["Fra idé til ferdig bygg", "From idea to finished building"], s: [["Program og mulighetsstudie", "Brief and feasibility study"], ["Skisseprosjekt", "Sketch design"], ["Forprosjekt", "Preliminary design"], ["Byggesøknad (rammesøknad)", "Building application (outline permission)"], ["Detaljprosjekt", "Detailed design"], ["Igangsettingstillatelse", "Commencement permit"], ["Bygging", "Construction"], ["Ferdigattest", "Completion certificate"]] }
});
WG_UNITS.push(["ARKH", "Middelalderen", "sort:ark_stil"], ["ARKH", "Renessanse og barokk", "sort:ark_stil"], ["ARKH", "Norsk arkitektur og samtid", "seq:ark_epoker"],
  ["ARKT", "Bæresystemer", "sort:ark_last"], ["ARKT", "Universell utforming og regelverk", "seq:ark_prosess"], ["GUNAT", "Kjemi: atomer og reaksjoner", "sort:kj_ph"]);
const WG_MAP = {};
for(const [code, title, w] of WG_UNITS){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) (WG_MAP[code + ":" + u] ||= []).push(w); }
// Oppgavene settes inn foran første eksempel (etter begrepene), ellers til slutt.
function withWidgets(code, u, src){
  const ws = WG_MAP[code + ":" + u]; if(!ws || /!\[(sort|seq):/.test(src)) return src;
  const add = ws.flatMap(w => ["![" + w + "]", ""]), lines = src.split("\n");
  const i = lines.findIndex(l => /^###?\s+(Eksempel|Example|Huskeregel|Tips)/i.test(l.trim()));
  if(i < 0) return src + "\n\n" + add.join("\n");
  lines.splice(i, 0, ...add); return lines.join("\n");
}
const WG_XP = 3, WG_N = 8;
const wgDone = (k) => { S.stats ||= {}; S.stats[k] = (+S.stats[k] || 0) + 1; };
// ---------- Sorter i grupper ----------
// Tilstanden lagres per oppgave-id, så første trykk virker selv om HTML-en ble laget før elementet fantes.
const WG_ST = {}; let wgSeq = 0;
const wgSt = el => WG_ST[el.dataset.id];
function wgNew(G){ const id = "wg" + (++wgSeq); WG_ST[id] = G; return id; }
function srtNew(name){ const D = SORTS[name]; return { items: shuffle(D.it.map((_, i) => i)).slice(0, Math.min(WG_N, D.it.length)), k: 0, right: 0, fb: null, placed: [] }; }
function srtHTML(name){
  const D = SORTS[name]; if(!D) return "";
  return `<div class="wg fig" data-sort="${name}" data-id="${wgNew(srtNew(name))}"><div class="sim-h"><span class="sim-tag">${I.bolt}${esc(T("Sorter", "Sort"))}</span><b>${esc(T(D.t[0], D.t[1]))}</b></div><div class="wg-body">${srtBody(name, WG_ST["wg" + wgSeq])}</div></div>`;
}
function srtBody(name, G){
  const D = SORTS[name], n = G.items.length, done = G.k >= n && !G.fb;
  const chips = ci => G.placed.filter(p => p.c === ci).map(p => `<span class="wg-chip${p.ok ? "" : " bad"}">${esc(T(D.it[p.i][0], D.it[p.i][1]))}</span>`).join("");
  const buckets = `<div class="wg-bk wg-k${D.k.length}">${D.k.map((c, ci) => `<button class="wg-b" data-srt="${ci}" ${done || G.fb ? "disabled" : ""}><b>${esc(T(c[0], c[1]))}</b><span class="wg-chips">${chips(ci)}</span></button>`).join("")}</div>`;
  if(done) return `<div class="wg-end"><b>${esc(T(`${G.right} av ${n} riktig`, `${G.right} of ${n} correct`))}</b><span>${esc(G.right === n ? T("Perfekt sortert!", "Perfectly sorted!") : T("Se over de røde og prøv igjen.", "Check the red ones and try again."))}</span><button class="tl-btn" data-srtnew="1">${esc(T("Ny runde", "New round"))}</button></div>${buckets}`;
  const it = D.it[G.items[Math.min(G.k, n - 1)]], cur = G.fb ? D.it[G.fb.i] : it;
  const sign = cur[5] && typeof FK_SIGNS !== "undefined" && FK_SIGNS[cur[5]] ? `<svg class="wg-sign" viewBox="0 0 100 100" aria-hidden="true">${FK_SIGNS[cur[5]]()}</svg>` : "";
  return `<div class="wg-top"><span class="tl-prog"><span style="width:${Math.round(100 * G.k / n)}%"></span></span><small>${Math.min(G.k + 1, n)}/${n}</small></div>
    <div class="wg-card${G.fb ? (G.fb.ok ? " ok" : " bad") : ""}" ${G.fb ? "" : `style="animation:tlCard .3s ease"`}>${sign}${sign && !G.fb ? "" : `<b>${esc(T(cur[0], cur[1]))}</b>`}
      ${G.fb ? `<p>${G.fb.ok ? "✓ " + esc(T("Riktig!", "Correct!")) : "✗ " + esc(T("Hører til: ", "Belongs to: ") + T(D.k[cur[2]][0], D.k[cur[2]][1]) + ".")}${cur[3] ? " " + esc(T(cur[3], cur[4] || cur[3])) : ""}</p>${G.fb.ok ? "" : `<button class="tl-btn" data-srtnext="1">${esc(T("Neste", "Next"))}</button>`}` : ""}</div>
    ${buckets}`;
}
function srtRender(el){ el.querySelector(".wg-body").innerHTML = srtBody(el.dataset.sort, wgSt(el)); }
function srtNext(el){ const G = wgSt(el); G.fb = null; G.k++; srtRender(el);
  if(G.k >= G.items.length){ wgDone("sorts"); if(G.right === G.items.length || G.right >= G.items.length - 1){ const st = awardXP(WG_XP); save(); sfx("complete"); setTimeout(() => burst(el.querySelector(".wg-end")), 60); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); } else save(); } }
function srtPick(el, ci){
  const name = el.dataset.sort, D = SORTS[name], G = wgSt(el); if(G.fb || G.k >= G.items.length) return;
  const i = G.items[G.k], ok = D.it[i][2] === ci; G.placed.push({ i, c: D.it[i][2], ok }); G.fb = { i, ok };
  if(ok){ G.right++; buzz(true); sfx("ok"); srtRender(el); setTimeout(() => { if(el.isConnected && wgSt(el) === G && G.fb) srtNext(el); }, 700); }
  else { buzz(false); sfx("bad"); srtRender(el); }
}
// ---------- Rekkefølge ----------
function seqNew(name){ const n = SEQS[name].s.length; let order = shuffle([...Array(n).keys()]); for(let k = 0; k < 5 && order.every((v, j) => v === j); k++) order = shuffle(order); return { order, sel: -1, ok: [], tries: 0, done: false }; }
function seqHTML(name){
  const D = SEQS[name]; if(!D) return "";
  return `<div class="wg fig" data-seq="${name}" data-id="${wgNew(seqNew(name))}"><div class="sim-h"><span class="sim-tag">${I.bolt}${esc(T("Rekkefølge", "Sequence"))}</span><b>${esc(T(D.t[0], D.t[1]))}</b></div><div class="wg-body">${seqBody(name, WG_ST["wg" + wgSeq])}</div></div>`;
}
function seqBody(name, G){
  const D = SEQS[name];
  return `<p class="sim-note">${esc(T("Hva kommer først? Trykk på to kort for å bytte dem, eller bruk pilene.", "What comes first? Tap two cards to swap them, or use the arrows."))}</p>
    <ol class="tl-sort${G.done ? " done" : ""}">${G.order.map((i, j) => { const st = G.ok[j];
      return `<li class="tl-it${G.sel === j ? " sel" : ""}${st === true ? " ok" : st === false ? " bad" : ""}" data-sqpick="${j}"><span class="tl-n">${j + 1}</span><span class="tl-it-t"><b>${esc(T(D.s[i][0], D.s[i][1]))}</b></span>
        <span class="tl-mv"><button data-sqmv="-1" data-j="${j}" ${j ? "" : "disabled"} aria-label="${esc(T("Opp", "Up"))}">▲</button><button data-sqmv="1" data-j="${j}" ${j < G.order.length - 1 ? "" : "disabled"} aria-label="${esc(T("Ned", "Down"))}">▼</button></span></li>`; }).join("")}</ol>
    <div class="tl-act">${G.done ? `<span class="tl-win">${esc(G.tries === 1 ? T("Perfekt på første forsøk!", "Perfect on the first try!") : T(`Riktig etter ${G.tries} forsøk!`, `Correct after ${G.tries} tries!`))}</span><button class="tl-btn" data-sqnew="1">${esc(T("Stokk på nytt", "Shuffle again"))}</button>`
      : `<button class="tl-btn" data-sqcheck="1">${esc(T("Sjekk rekkefølgen", "Check the order"))}</button>${G.tries ? `<small>${G.ok.filter(Boolean).length}/${G.order.length} ${esc(T("på riktig plass", "in the right place"))}</small>` : ""}`}</div>`;
}
function seqRender(el){ el.querySelector(".wg-body").innerHTML = seqBody(el.dataset.seq, wgSt(el)); }
function seqSwap(el, a, b){ const G = wgSt(el); if(G.done || b < 0 || b >= G.order.length) return; [G.order[a], G.order[b]] = [G.order[b], G.order[a]]; G.sel = -1; G.ok = []; seqRender(el);
  const li = el.querySelectorAll(".tl-it"); [a, b].forEach(k => li[k] && li[k].classList.add("moved")); }
function seqCheck(el){
  const G = wgSt(el); G.tries++; G.ok = G.order.map((v, j) => v === j); G.sel = -1;
  if(G.ok.every(Boolean)){ G.done = true; wgDone("seqs"); const st = awardXP(WG_XP); save(); buzz(true); sfx("complete"); seqRender(el); setTimeout(() => burst(el.querySelector(".tl-win")), 60); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); return; }
  buzz(false); seqRender(el);
}
document.addEventListener("click", e => {
  const el = e.target.closest && e.target.closest(".wg"); if(!el) return;
  const b = e.target.closest("[data-srt],[data-srtnext],[data-srtnew],[data-sqpick],[data-sqmv],[data-sqcheck],[data-sqnew]"); if(!b) return;
  e.stopPropagation();
  if(el.dataset.sort){
    if(b.dataset.srt != null) srtPick(el, +b.dataset.srt); else if(b.dataset.srtnext) srtNext(el); else if(b.dataset.srtnew){ WG_ST[el.dataset.id] = srtNew(el.dataset.sort); srtRender(el); }
    return; }
  if(el.dataset.seq){ const G = wgSt(el);
    if(b.dataset.sqmv){ const j = +b.dataset.j; seqSwap(el, j, j + +b.dataset.sqmv); }
    else if(b.dataset.sqcheck) seqCheck(el);
    else if(b.dataset.sqnew){ WG_ST[el.dataset.id] = seqNew(el.dataset.seq); seqRender(el); }
    else if(b.dataset.sqpick && !G.done){ const j = +b.dataset.sqpick; if(G.sel < 0){ G.sel = j; seqRender(el); } else if(G.sel === j){ G.sel = -1; seqRender(el); } else seqSwap(el, G.sel, j); }
  }
});
