// ============================================================
//  add_ark_a.js – ARKITEKTUR: Arkitekturhistorie. Fra antikken til massivtre, med vekt på hvorfor
//  byggene ser ut som de gjør (materialer, konstruksjon, idealer) og norske eksempler.
// ============================================================
GROUP_NAMES["Arkitektur"] = ["Arkitektur", "Architecture"];
NEWCOURSE({ code: "ARKH", study: "ark", group: "Arkitektur", nb: "Arkitekturhistorie", en: "History of architecture", s: ["AH", "AH"], eqText: { nb: "1. studieår arkitektur", en: "Architecture, year 1" }, units: [] });
(() => {
const U = (nb, en, thNb, thEn, qs) => { const u = ADDUNIT("ARKH", nb, en); THEORY("ARKH", u, { nb: thNb, en: thEn }); BIQ("ARKH", u, qs); return u; };

U("Antikken", "Antiquity",
`## Hva handler det om?
Grekerne og romerne la grunnlaget for vestlig arkitektur. Mye av det vi fortsatt kaller «klassisk» – søyler, symmetri og proporsjoner – kommer herfra.

## Det viktigste
- Romeren **Vitruvius** skrev at god arkitektur må ha tre egenskaper: **firmitas** (styrke), **utilitas** (nytte) og **venustas** (skjønnhet). Triaden brukes fortsatt.
- Grekerne bygget med **søyle og bjelke** i stein. Steinbjelker tåler lite strekk, så spennene ble korte og søylene tette.
- De tre **søyleordenene**: **dorisk** (enkel pute som kapitél), **jonisk** (snegleformede voluter) og **korintisk** (akantusblader).
- **Parthenon** i Athen (447–432 f.Kr.) er det mest kjente greske tempelet. Linjene er bevisst litt buede (entasis og kurvatur) for å se rette ut.
- Romerne brukte **buen**, **hvelvet** og **kuppelen**, og de hadde **betong**. Buen fører lasten ned som trykk, og stein tåler trykk godt – derfor kunne spennene bli mye større.
- **Pantheon** i Roma (ca. 125 e.Kr.) har en betongkuppel på rundt 43 m i diameter med en åpning – **oculus** – på toppen. Betongen blir lettere jo høyere opp i kuppelen den sitter.

### Eksempel
Akveduktene viser romersk ingeniørkunst: rekker av buer bar vannrenner over daler i mange kilometer – med et svakt, jevnt fall hele veien.

> Søyle og bjelke gir korte spenn. Bue og hvelv gir store spenn fordi alt arbeider i trykk.`,
`## What is it about?
The Greeks and Romans laid the foundations of Western architecture. Much of what we still call "classical" – columns, symmetry and proportion – comes from here.

## Key points
- The Roman **Vitruvius** wrote that good architecture needs three qualities: **firmitas** (strength), **utilitas** (usefulness) and **venustas** (beauty). The triad is still used.
- The Greeks built with **post and lintel** in stone. Stone beams take little tension, so spans were short and columns close together.
- The three **orders**: **Doric** (a plain cushion capital), **Ionic** (scroll-shaped volutes) and **Corinthian** (acanthus leaves).
- The **Parthenon** in Athens (447–432 BC) is the best-known Greek temple. Its lines are deliberately slightly curved (entasis and curvature) so they look straight.
- The Romans used the **arch**, the **vault** and the **dome**, and they had **concrete**. The arch carries the load down as compression, which stone handles well – so spans could be much larger.
- The **Pantheon** in Rome (c. AD 125) has a concrete dome about 43 m across with an opening – the **oculus** – at the top. The concrete gets lighter higher up the dome.

### Example
The aqueducts show Roman engineering: rows of arches carried water channels across valleys for many kilometres – with a slight, even fall all the way.

> Post and lintel gives short spans. Arches and vaults give large spans because everything works in compression.`,
[["Hva er Vitruvius' tre krav til arkitektur?", ["Styrke, nytte og skjønnhet", "Pris, tid og kvalitet", "Lys, luft og vann", "Form, farge og funksjon"], "Firmitas, utilitas og venustas.",
  "What are Vitruvius' three requirements for architecture?", ["Strength, usefulness and beauty", "Price, time and quality", "Light, air and water", "Form, colour and function"], "Firmitas, utilitas and venustas."],
 ["Hvilken søyleorden har kapitél med akantusblader?", ["Korintisk", "Dorisk", "Jonisk", "Toskansk"], "Den korintiske er den mest dekorerte.",
  "Which order has capitals with acanthus leaves?", ["Corinthian", "Doric", "Ionic", "Tuscan"], "The Corinthian is the most decorated."],
 ["Hvorfor ga buen romerne mulighet til større spenn enn grekernes bjelker?", ["Buen fører lasten som trykk, som stein tåler godt", "Buen er lettere å male", "Romerne hadde stål", "Buen trenger ingen fundament"], "Stein tåler trykk, men lite strekk. En steinbjelke får strekk i underkant.",
  "Why did the arch let the Romans span further than Greek beams?", ["The arch carries load as compression, which stone handles well", "The arch is easier to paint", "The Romans had steel", "The arch needs no foundation"], "Stone handles compression but little tension. A stone beam gets tension on its underside."],
 ["Hva kalles åpningen i toppen av Pantheons kuppel?", ["Oculus", "Apsis", "Kapitél", "Atrium"], "Oculus betyr «øye» og slipper inn lys.",
  "What is the opening at the top of the Pantheon dome called?", ["Oculus", "Apse", "Capital", "Atrium"], "Oculus means \"eye\" and lets in light."],
 ["Hvorfor er Parthenons linjer bevisst litt buede?", ["For at de skal se rette ut for øyet", "Fordi steinen var skjev", "For å spare stein", "Det skjedde i et jordskjelv"], "Optiske korreksjoner motvirker at lange rette linjer ser ut til å synke.",
  "Why are the Parthenon's lines deliberately slightly curved?", ["So they look straight to the eye", "Because the stone was crooked", "To save stone", "It happened in an earthquake"], "Optical corrections counteract long straight lines appearing to sag."],
 ["Hvilket byggemateriale gjorde Pantheons kuppel mulig?", ["Romersk betong", "Stål", "Limtre", "Glass"], "Romerne laget betong av kalk, vulkansk aske og stein – lettere tilslag høyere opp.",
  "Which building material made the Pantheon dome possible?", ["Roman concrete", "Steel", "Glulam", "Glass"], "The Romans made concrete from lime, volcanic ash and stone – with lighter aggregate higher up."]]);

U("Middelalderen", "The Middle Ages",
`## Hva handler det om?
I middelalderen var kirken den store byggherren. To stilarter dominerer: **romansk** og **gotikk**. I Norge bygget man i tillegg **stavkirker** i tre.

## Det viktigste
- **Romansk** (ca. 1000–1200): **rundbuer**, tykke murer, små vinduer og tunge, lukkede rom. Murene måtte være tykke for å ta skyvet fra hvelvene.
- **Gotikk** (fra ca. 1140, kirken Saint-Denis ved Paris): **spissbuer**, **ribbehvelv** og **strebebuer** (flygende strebepilarer). Lasten samles i ribber og pilarer, så veggene kan åpnes for store **glassmalerier**.
- Spissbuen gir mindre sideveis skyv enn rundbuen og kan tilpasses ulike spenn og høyder.
- Det gotiske idealet var høyde og lys – kirkerommet som et bilde på himmelen. Eksempler: Notre-Dame i Paris, Chartres og **Nidarosdomen** i Trondheim.
- **Stavkirkene** er bygget med stående stolper (staver) på svillstokker. **Urnes** (ca. 1130) er på UNESCOs verdensarvliste, **Borgund** (ca. 1180) er en av de best bevarte.

### Eksempel
I en gotisk katedral kan du se konstruksjonen: ribbene i taket fører lasten ned i pilarene, og strebebuene utenfor tar skyvet – derfor kan veggene nesten bare være glass.

> Rundbue og tykke murer = romansk. Spissbue, ribber og store vinduer = gotikk.`,
`## What is it about?
In the Middle Ages the church was the great client. Two styles dominate: **Romanesque** and **Gothic**. In Norway people also built **stave churches** in wood.

## Key points
- **Romanesque** (c. 1000–1200): **round arches**, thick walls, small windows and heavy, closed spaces. The walls had to be thick to take the thrust of the vaults.
- **Gothic** (from c. 1140, the church of Saint-Denis near Paris): **pointed arches**, **rib vaults** and **flying buttresses**. Loads are gathered in ribs and piers, so walls can open up for large **stained-glass windows**.
- The pointed arch gives less sideways thrust than the round arch and can be adapted to different spans and heights.
- The Gothic ideal was height and light – the church interior as an image of heaven. Examples: Notre-Dame in Paris, Chartres and **Nidaros Cathedral** in Trondheim.
- **Stave churches** are built with upright posts (staves) on sill beams. **Urnes** (c. 1130) is a UNESCO World Heritage Site, **Borgund** (c. 1180) is one of the best preserved.

### Example
In a Gothic cathedral you can see the structure: the ribs in the ceiling carry the load down into the piers, and the flying buttresses outside take the thrust – so the walls can be almost all glass.

> Round arch and thick walls = Romanesque. Pointed arch, ribs and large windows = Gothic.`,
[["Hva kjennetegner gotikken?", ["Spissbuer, ribbehvelv og store vinduer", "Rundbuer og tykke murer", "Flate tak og båndvinduer", "Kupler av betong"], "Gotikken samler lastene i ribber og pilarer og åpner veggene.",
  "What characterises Gothic architecture?", ["Pointed arches, rib vaults and large windows", "Round arches and thick walls", "Flat roofs and ribbon windows", "Concrete domes"], "Gothic gathers loads in ribs and piers and opens up the walls."],
 ["Hva er oppgaven til strebebuene?", ["Å ta sideveis skyv fra hvelvene", "Å lede regnvann", "Å pynte fasaden", "Å bære klokkene"], "Hvelv skyver utover. Strebebuene fører skyvet ned til bakken utenfor veggen.",
  "What do flying buttresses do?", ["Take the sideways thrust from the vaults", "Carry rainwater", "Decorate the facade", "Carry the bells"], "Vaults push outwards. The buttresses carry the thrust down to the ground outside the wall."],
 ["Hvilken stavkirke står på UNESCOs verdensarvliste?", ["Urnes", "Heddal", "Hopperstad", "Gol"], "Urnes stavkirke ble innskrevet i 1979.",
  "Which stave church is on the UNESCO World Heritage List?", ["Urnes", "Heddal", "Hopperstad", "Gol"], "Urnes stave church was inscribed in 1979."],
 ["Hvorfor har romanske kirker tykke murer og små vinduer?", ["Murene måtte ta skyvet fra hvelvene", "Glass var forbudt", "For å holde på varmen", "For å skjule seg fra fiender"], "Uten strebebuer måtte massive murer ta opp skyvet.",
  "Why do Romanesque churches have thick walls and small windows?", ["The walls had to take the thrust of the vaults", "Glass was forbidden", "To keep the heat in", "To hide from enemies"], "Without buttresses, massive walls had to take the thrust."],
 ["Hvilken norsk katedral er gotisk?", ["Nidarosdomen", "Oslo domkirke", "Bragernes kirke", "Ishavskatedralen"], "Nidarosdomen i Trondheim er Norges største gotiske kirke.",
  "Which Norwegian cathedral is Gothic?", ["Nidaros Cathedral", "Oslo Cathedral", "Bragernes Church", "The Arctic Cathedral"], "Nidaros Cathedral in Trondheim is Norway's largest Gothic church."],
 ["Hva er en fordel med spissbuen framfor rundbuen?", ["Mindre sideveis skyv og fleksibel høyde", "Den er enklere å mure", "Den trenger ingen stein", "Den er alltid lavere"], "Spissbuen kan gjøres høyere eller lavere for samme spenn og skyver mindre ut.",
  "What is an advantage of the pointed arch over the round arch?", ["Less sideways thrust and flexible height", "It is easier to build", "It needs no stone", "It is always lower"], "The pointed arch can be made taller or lower for the same span and pushes outwards less."]]);

U("Renessanse og barokk", "Renaissance and Baroque",
`## Hva handler det om?
Fra 1400-tallet vendte arkitektene i Italia tilbake til antikkens idealer – **renessanse** betyr gjenfødelse. På 1600-tallet kom **barokken** med bevegelse, drama og makt.

## Det viktigste
- Renessansen søkte **harmoni**, **symmetri** og **proporsjoner** basert på enkle tallforhold og menneskekroppen.
- **Brunelleschi** fullførte kuppelen på domkirken i Firenze (1436) uten stillas fra bakken, med en dobbel skall-konstruksjon og murstein i sildebeinsmønster.
- **Sentralperspektivet** ble utviklet – tegningen fikk ett forsvinningspunkt.
- **Palladio** (Villa Rotonda) skrev om proporsjoner og påvirket bygg i hele Europa og USA i flere hundre år.
- **Barokken** (ca. 1600–1750): svungne former, kraftige kontraster mellom lys og skygge, lange **akser** og store anlegg som viser makt. Eksempler: Berninis plass foran Peterskirken og slottet **Versailles**.
- Hagene og byplanene ble en del av arkitekturen: alleer, symmetriakser og utsiktspunkter.

### Eksempel
Versailles er bygget langs én lang akse som går gjennom slottet og ut i hagen. Kongens soverom ligger midt på aksen – arkitekturen forteller hvem som har makten.

> Renessanse = ro, balanse og orden. Barokk = bevegelse, drama og akser.`,
`## What is it about?
From the 1400s, architects in Italy returned to the ideals of antiquity – **renaissance** means rebirth. In the 1600s came the **Baroque** with movement, drama and power.

## Key points
- The Renaissance sought **harmony**, **symmetry** and **proportion** based on simple numerical ratios and the human body.
- **Brunelleschi** completed the dome of Florence Cathedral (1436) without scaffolding from the ground, with a double shell and bricks laid in a herringbone pattern.
- **Linear perspective** was developed – the drawing got a single vanishing point.
- **Palladio** (Villa Rotonda) wrote about proportion and influenced buildings across Europe and the USA for centuries.
- **The Baroque** (c. 1600–1750): curved forms, strong contrasts of light and shadow, long **axes** and large complexes that display power. Examples: Bernini's square in front of St Peter's and the palace of **Versailles**.
- Gardens and town plans became part of the architecture: avenues, symmetry axes and viewpoints.

### Example
Versailles is built along one long axis running through the palace and out into the garden. The king's bedroom sits in the middle of the axis – the architecture tells you who holds the power.

> Renaissance = calm, balance and order. Baroque = movement, drama and axes.`,
[["Hva betyr «renessanse»?", ["Gjenfødelse", "Opplysning", "Bevegelse", "Ny teknikk"], "Gjenfødelsen av antikkens idealer.",
  "What does \"renaissance\" mean?", ["Rebirth", "Enlightenment", "Movement", "New technology"], "The rebirth of the ideals of antiquity."],
 ["Hvem bygget kuppelen på domkirken i Firenze?", ["Brunelleschi", "Bernini", "Palladio", "Michelangelo"], "Filippo Brunelleschi fullførte den i 1436.",
  "Who built the dome of Florence Cathedral?", ["Brunelleschi", "Bernini", "Palladio", "Michelangelo"], "Filippo Brunelleschi completed it in 1436."],
 ["Hva kjennetegner barokken?", ["Svungne former, kontraster og lange akser", "Enkle kuber og flate tak", "Spissbuer og strebebuer", "Bare tre"], "Barokken skulle imponere og bevege.",
  "What characterises the Baroque?", ["Curved forms, contrasts and long axes", "Simple cubes and flat roofs", "Pointed arches and buttresses", "Only wood"], "The Baroque was meant to impress and move."],
 ["Hvilket ideal sto sentralt i renessansen?", ["Harmoni og proporsjoner", "Funksjon foran form", "Mest mulig dekor", "Billigst mulig bygging"], "Proporsjoner etter enkle tallforhold og menneskekroppen.",
  "Which ideal was central in the Renaissance?", ["Harmony and proportion", "Function before form", "As much decoration as possible", "Building as cheaply as possible"], "Proportions based on simple ratios and the human body."],
 ["Hva viser den lange aksen i Versailles?", ["Kongens makt og orden", "At tomta var smal", "Veien til stallen", "Hvor vannet renner"], "Alt er ordnet rundt kongen – midt på aksen.",
  "What does the long axis at Versailles show?", ["The king's power and order", "That the plot was narrow", "The way to the stables", "Where the water flows"], "Everything is ordered around the king – in the middle of the axis."],
 ["Hvilken arkitekt skrev om proporsjoner og påvirket bygg i hele Europa og USA?", ["Palladio", "Gropius", "Grosch", "Fehn"], "Andrea Palladios «Fire bøker om arkitektur» kom i 1570.",
  "Which architect wrote about proportion and influenced buildings across Europe and the USA?", ["Palladio", "Gropius", "Grosch", "Fehn"], "Andrea Palladio's \"Four Books of Architecture\" appeared in 1570."]]);

U("1800-tallet: klassisisme, historisme og jugend", "The 1800s: classicism, historicism and Art Nouveau",
`## Hva handler det om?
1800-tallet var industrialiseringens århundre. Nye materialer som **jern** og **glass** kom, mens stilene ofte lånte fra fortiden.

## Det viktigste
- **Klassisisme** (ca. 1750–1850): rolige fasader, søyler og frontoner etter antikt forbilde. I Norge tegnet **Christian Heinrich Grosch** blant annet Universitetet i Oslo.
- **Historisme**: man kopierte eldre stiler – nygotikk til kirker, nyrenessanse til banker og offentlige bygg.
- **Crystal Palace** i London (1851) var bygget av standardiserte deler i jern og glass og ble reist på bare noen måneder – en forløper for moderne prefabrikkering.
- **Jugend** (Art Nouveau, ca. 1890–1910): organiske, slyngende former inspirert av planter. **Ålesund** ble gjenoppbygd i jugendstil etter bybrannen i 1904.
- I Norge ble **dragestilen** populær rundt 1900: tre med dragehoder og motiver fra vikingtid og stavkirker.

### Eksempel
Jernbanestasjonene på 1800-tallet kombinerte gjerne en stein-fasade i historisk stil mot gata med en lys hall av jern og glass over sporene – fortid utenpå, framtid inni.

> Nye materialer kom før ny form: jern og glass ble lenge skjult bak historiske fasader.`,
`## What is it about?
The 1800s was the century of industrialisation. New materials such as **iron** and **glass** appeared, while the styles often borrowed from the past.

## Key points
- **Classicism** (c. 1750–1850): calm facades, columns and pediments modelled on antiquity. In Norway, **Christian Heinrich Grosch** designed the University of Oslo among other buildings.
- **Historicism**: older styles were copied – Gothic Revival for churches, Neo-Renaissance for banks and public buildings.
- The **Crystal Palace** in London (1851) was built from standardised parts in iron and glass and went up in just a few months – a forerunner of modern prefabrication.
- **Art Nouveau** (Jugendstil, c. 1890–1910): organic, flowing forms inspired by plants. **Ålesund** was rebuilt in Art Nouveau after the town fire of 1904.
- In Norway the **dragon style** became popular around 1900: timber with dragon heads and motifs from the Viking age and stave churches.

### Example
Railway stations of the 1800s often combined a stone facade in a historical style towards the street with a bright iron-and-glass hall over the tracks – the past outside, the future inside.

> New materials came before new form: iron and glass were long hidden behind historical facades.`,
[["Hvilken norsk by ble gjenoppbygd i jugendstil?", ["Ålesund", "Bergen", "Stavanger", "Tromsø"], "Etter bybrannen i 1904.",
  "Which Norwegian town was rebuilt in Art Nouveau?", ["Ålesund", "Bergen", "Stavanger", "Tromsø"], "After the town fire of 1904."],
 ["Hva var nytt med Crystal Palace (1851)?", ["Standardiserte deler i jern og glass", "Det var bygget av stein", "Det hadde ingen vinduer", "Det var en stavkirke"], "Prefabrikkerte deler gjorde at det ble reist på noen måneder.",
  "What was new about the Crystal Palace (1851)?", ["Standardised iron and glass parts", "It was built of stone", "It had no windows", "It was a stave church"], "Prefabricated parts meant it was put up in a few months."],
 ["Hva betyr historisme?", ["Å kopiere eldre stilarter", "Å bygge museer", "Å rive gamle hus", "Å bygge uten dekor"], "Nygotikk, nyrenessanse og nybarokk er eksempler.",
  "What does historicism mean?", ["Copying older styles", "Building museums", "Demolishing old houses", "Building without decoration"], "Gothic Revival, Neo-Renaissance and Neo-Baroque are examples."],
 ["Hvem tegnet Universitetet i Oslo?", ["Christian Heinrich Grosch", "Sverre Fehn", "Arne Korsmo", "Lars Backer"], "Grosch var Norges ledende klassisistiske arkitekt.",
  "Who designed the University of Oslo?", ["Christian Heinrich Grosch", "Sverre Fehn", "Arne Korsmo", "Lars Backer"], "Grosch was Norway's leading classicist architect."],
 ["Hva inspirerte jugendstilen?", ["Planter og organiske former", "Maskiner", "Rette linjer og kuber", "Romerske akvedukter"], "Slyngende linjer som stilker og blader.",
  "What inspired Art Nouveau?", ["Plants and organic forms", "Machines", "Straight lines and cubes", "Roman aqueducts"], "Flowing lines like stems and leaves."],
 ["Hva kjennetegner dragestilen?", ["Tre med motiver fra vikingtid og stavkirker", "Glassfasader", "Betong og stål", "Gotiske spissbuer i stein"], "Den var en nasjonalromantisk stil rundt 1900.",
  "What characterises the dragon style?", ["Timber with Viking-age and stave-church motifs", "Glass facades", "Concrete and steel", "Gothic stone arches"], "It was a national-romantic style around 1900."]]);

U("Modernismen", "Modernism",
`## Hva handler det om?
Tidlig på 1900-tallet brøt arkitektene med historiske stiler. Med **stål**, **armert betong** og **glass** kunne formen følge funksjonen og konstruksjonen.

## Det viktigste
- «**Form follows function**» (Louis Sullivan): formen skal komme av hva bygget skal brukes til.
- **Bauhaus** (Tyskland, 1919–1933, grunnlagt av Walter Gropius) samlet kunst, håndverk og industri.
- **Le Corbusiers fem punkter** (1927): **søyler** (pilotis) som løfter huset, **fri plan**, **fri fasade**, **båndvinduer** og **takterrasse**. Det ble mulig fordi bæringen ligger i søyler, ikke i veggene.
- **Mies van der Rohe**: «Less is more». Barcelona-paviljongen (1929) har frittstående vegger og flytende rom.
- I Norge kalles stilen **funkis** (1930-tallet): hvite, glatte flater, flate tak og store vinduer. Ekebergrestauranten (Lars Backer, 1929) er et tidlig eksempel.
- Kritikken kom senere: monotone boligblokker og byer planlagt for bil. **Postmodernismen** (fra 1970-tallet) tok farge, symboler og historie tilbake.

### Eksempel
Når bæringen ligger i søyler (et betongskjelett), trenger ikke ytterveggen å bære noe. Da kan vinduene gå i ett langt bånd langs hele fasaden.

> Konstruksjonen frigjorde planen: søyler i stedet for bærende vegger ga fri plan og fri fasade.`,
`## What is it about?
Early in the 1900s architects broke with historical styles. With **steel**, **reinforced concrete** and **glass**, form could follow function and structure.

## Key points
- "**Form follows function**" (Louis Sullivan): form should come from what the building is used for.
- **Bauhaus** (Germany, 1919–1933, founded by Walter Gropius) brought together art, craft and industry.
- **Le Corbusier's five points** (1927): **columns** (pilotis) lifting the house, **free plan**, **free facade**, **ribbon windows** and **roof terrace**. It was possible because the load is carried by columns, not walls.
- **Mies van der Rohe**: "Less is more". The Barcelona Pavilion (1929) has free-standing walls and flowing spaces.
- In Norway the style is called **funkis** (1930s): white, smooth surfaces, flat roofs and large windows. The Ekeberg Restaurant (Lars Backer, 1929) is an early example.
- Criticism came later: monotonous housing blocks and cities planned for cars. **Postmodernism** (from the 1970s) brought back colour, symbols and history.

### Example
When the load is carried by columns (a concrete frame), the outer wall does not have to carry anything. Then the windows can run in one long band along the whole facade.

> The structure freed the plan: columns instead of load-bearing walls gave a free plan and a free facade.`,
[["Hvem sa «form follows function»?", ["Louis Sullivan", "Le Corbusier", "Palladio", "Vitruvius"], "Sullivan, en av skyskraperens pionerer i Chicago.",
  "Who said \"form follows function\"?", ["Louis Sullivan", "Le Corbusier", "Palladio", "Vitruvius"], "Sullivan, one of the pioneers of the skyscraper in Chicago."],
 ["Hvorfor kunne modernistene lage båndvinduer og fri fasade?", ["Søyler tok bæringen, så veggene var frie", "Glass ble billigere enn stein", "Det var lov fra 1920", "Takene var flate"], "Bæresystemet av søyler gjorde veggen uavhengig av bæringen.",
  "Why could the modernists make ribbon windows and a free facade?", ["Columns carried the load, so the walls were free", "Glass became cheaper than stone", "It was allowed from 1920", "The roofs were flat"], "A column structure made the wall independent of the load-bearing."],
 ["Hva heter den norske varianten av modernismen på 1930-tallet?", ["Funkis", "Dragestil", "Jugend", "Brutalisme"], "Funksjonalisme – «funkis».",
  "What is the Norwegian version of 1930s modernism called?", ["Funkis", "Dragon style", "Art Nouveau", "Brutalism"], "Functionalism – \"funkis\"."],
 ["Hvem grunnla Bauhaus?", ["Walter Gropius", "Mies van der Rohe", "Frank Lloyd Wright", "Alvar Aalto"], "Gropius grunnla skolen i Weimar i 1919.",
  "Who founded the Bauhaus?", ["Walter Gropius", "Mies van der Rohe", "Frank Lloyd Wright", "Alvar Aalto"], "Gropius founded the school in Weimar in 1919."],
 ["Hvilket av disse er IKKE et av Le Corbusiers fem punkter?", ["Saltak", "Fri plan", "Båndvinduer", "Takterrasse"], "Han ville ha flatt tak med takterrasse.",
  "Which of these is NOT one of Le Corbusier's five points?", ["Pitched roof", "Free plan", "Ribbon windows", "Roof terrace"], "He wanted a flat roof with a roof terrace."],
 ["Hva reagerte postmodernismen mot?", ["Modernismens strenge, monotone former", "Gotikkens høyde", "Bruk av tre", "Historiske stiler"], "Postmodernismen tok tilbake farge, symboler og historiske referanser.",
  "What did postmodernism react against?", ["Modernism's strict, monotonous forms", "Gothic height", "The use of timber", "Historical styles"], "Postmodernism brought back colour, symbols and historical references."]]);

U("Norsk arkitektur og samtid", "Norwegian and contemporary architecture",
`## Hva handler det om?
Norsk arkitektur har vokst ut av klima, landskap og tre. I dag er **bærekraft** det store spørsmålet: hvordan bygge med lavt klimafotavtrykk?

## Det viktigste
- **Sverre Fehn** fikk Pritzkerprisen i 1997. Hedmarksmuseet på Hamar bygger nytt inne i gamle ruiner – fortid og nåtid side om side.
- **Snøhetta** tegnet Operaen i Oslo (2008), der taket er et skrått, offentlig gulv du kan gå opp på, og biblioteket i Alexandria (2002).
- **Wenche Selmer** tegnet små trehus der landskapet og stedet styrer formen.
- **Massivtre** (krysslimt tre, CLT) og **limtre** gjør det mulig å bygge høyt i tre. **Mjøstårnet** i Brumunddal (2019, 85,4 m) ble på sin tid verdens høyeste trehus.
- **Plusshus** produserer mer energi enn det bruker gjennom livsløpet. Powerhouse Brattørkaia i Trondheim (2019) er et eksempel.
- **Gjenbruk og transformasjon**: det mest klimavennlige bygget er ofte det som allerede står. Å bygge om gir mye lavere utslipp enn å rive og bygge nytt.

### Eksempel
Operaens tak er både en konstruksjon og en byplass. Arkitekturen gir noe tilbake til byen – alle kan gå på taket, også de som aldri går i operaen.

> Det grønneste bygget er ofte det som allerede står.`,
`## What is it about?
Norwegian architecture has grown out of climate, landscape and timber. Today **sustainability** is the big question: how do we build with a low carbon footprint?

## Key points
- **Sverre Fehn** won the Pritzker Prize in 1997. The Hedmark Museum in Hamar builds new inside old ruins – past and present side by side.
- **Snøhetta** designed the Oslo Opera House (2008), whose roof is a sloping public floor you can walk up, and the library in Alexandria (2002).
- **Wenche Selmer** designed small timber houses where the landscape and the place shape the form.
- **Mass timber** (cross-laminated timber, CLT) and **glulam** make it possible to build tall in wood. **Mjøstårnet** in Brumunddal (2019, 85.4 m) was at the time the world's tallest timber building.
- **Plus-energy buildings** produce more energy than they use over their lifetime. Powerhouse Brattørkaia in Trondheim (2019) is an example.
- **Reuse and transformation**: the most climate-friendly building is often the one that already exists. Converting gives far lower emissions than demolishing and building new.

### Example
The Opera House roof is both a structure and a public square. The architecture gives something back to the city – anyone can walk on the roof, even those who never go to the opera.

> The greenest building is often the one that is already there.`,
[["Hvilken norsk arkitekt fikk Pritzkerprisen i 1997?", ["Sverre Fehn", "Arne Korsmo", "Wenche Selmer", "Lars Backer"], "Fehn er den eneste norske Pritzker-vinneren.",
  "Which Norwegian architect won the Pritzker Prize in 1997?", ["Sverre Fehn", "Arne Korsmo", "Wenche Selmer", "Lars Backer"], "Fehn is the only Norwegian Pritzker laureate."],
 ["Hva er spesielt med taket på Operaen i Oslo?", ["Det er et offentlig gulv du kan gå på", "Det er av gress", "Det kan åpnes", "Det er flatt og lukket"], "Det skrå taket er en byplass for alle.",
  "What is special about the Oslo Opera House roof?", ["It is a public floor you can walk on", "It is made of grass", "It can open", "It is flat and closed"], "The sloping roof is a public square for everyone."],
 ["Hva er et plusshus?", ["Et bygg som produserer mer energi enn det bruker", "Et hus med pluss-formet plan", "Et ekstra stort hus", "Et hus med tilbygg"], "Regnet over hele livsløpet.",
  "What is a plus-energy building?", ["A building that produces more energy than it uses", "A house with a plus-shaped plan", "An extra large house", "A house with an extension"], "Counted over its whole life cycle."],
 ["Hvorfor er massivtre interessant for klimaet?", ["Tre lagrer karbon og har lavt utslipp i produksjon", "Tre brenner aldri", "Tre er alltid billigst", "Tre trenger ingen fundamenter"], "Trær tar opp CO₂, og karbonet blir lagret i bygget.",
  "Why is mass timber interesting for the climate?", ["Wood stores carbon and has low production emissions", "Wood never burns", "Wood is always cheapest", "Wood needs no foundations"], "Trees take up CO₂, and the carbon is stored in the building."],
 ["Hva er ofte det mest klimavennlige valget?", ["Å bruke og bygge om det som allerede står", "Å rive og bygge nytt passivhus", "Å bygge i betong", "Å bygge større"], "Å rive og bygge nytt gir store utslipp fra materialer og transport.",
  "What is often the most climate-friendly choice?", ["Using and converting what already exists", "Demolishing and building a new passive house", "Building in concrete", "Building bigger"], "Demolishing and building new causes large emissions from materials and transport."],
 ["Hvilket kontor tegnet Operaen i Oslo?", ["Snøhetta", "Helen & Hard", "BIG", "Fehn"], "Snøhetta, ferdig i 2008.",
  "Which office designed the Oslo Opera House?", ["Snøhetta", "Helen & Hard", "BIG", "Fehn"], "Snøhetta, completed in 2008."]]);
})();
