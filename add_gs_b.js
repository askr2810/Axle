// ============================================================
//  add_gs_b.js – BARNESKOLEN: Naturfag 5.–7. trinn (LK20). Enkelt språk og hverdagseksempler.
// ============================================================
NEWCOURSE({ code: "GSNAT", study: "barn", group: "Barneskole", nb: "Naturfag 5.–7.", en: "Science years 5–7", s: ["Na", "Sc"], eqText: { nb: "5.–7. trinn (LK20)", en: "Years 5–7 (Norwegian curriculum)" }, units: [] });
(() => {
const U = (nb, en, thNb, thEn, qs) => { const u = ADDUNIT("GSNAT", nb, en); THEORY("GSNAT", u, { nb: thNb, en: thEn }); BIQ("GSNAT", u, qs); return u; };

U("Kroppen", "The human body",
`## Hva handler det om?
Kroppen er bygget av organer som samarbeider. Hvert organ har sin egen jobb.

## Det viktigste
- **Hjertet** er en muskel som pumper blod rundt i kroppen. Blodet frakter oksygen og næring.
- **Lungene** tar inn oksygen fra lufta og slipper ut karbondioksid når vi puster ut.
- **Skjelettet** holder kroppen oppe og beskytter organene. En voksen har 206 knokler.
- **Musklene** beveger skjelettet. De kan bare trekke, ikke skyve – derfor jobber de i par.
- **Fordøyelsen** bryter maten ned i munnen, magesekken og tarmene, så næringen kan tas opp i blodet.
- **Hjernen** styrer alt og får beskjeder fra **sansene**: syn, hørsel, lukt, smak og følelse.

### Eksempel
Når du løper, puster du fortere og hjertet slår raskere. Musklene trenger mer oksygen.

> Søvn, mat og bevegelse er det kroppen trenger for å holde seg frisk.`,
`## What is it about?
The body is built of organs that work together. Each organ has its own job.

## Key points
- The **heart** is a muscle that pumps blood around the body. Blood carries oxygen and nutrients.
- The **lungs** take in oxygen from the air and let out carbon dioxide when we breathe out.
- The **skeleton** holds the body up and protects the organs. An adult has 206 bones.
- **Muscles** move the skeleton. They can only pull, not push – so they work in pairs.
- **Digestion** breaks food down in the mouth, stomach and intestines, so the nutrients can enter the blood.
- The **brain** controls everything and gets messages from the **senses**: sight, hearing, smell, taste and touch.

### Example
When you run, you breathe faster and your heart beats faster. The muscles need more oxygen.

> Sleep, food and exercise are what the body needs to stay healthy.`,
[["Hva er jobben til hjertet?", ["Å pumpe blod rundt i kroppen", "Å fordøye maten", "Å tenke", "Å holde kroppen oppe"], "Hjertet er en muskel som pumper blod.",
  "What is the job of the heart?", ["To pump blood around the body", "To digest food", "To think", "To hold the body up"], "The heart is a muscle that pumps blood."],
 ["Hvilken gass tar lungene inn fra lufta?", ["Oksygen", "Karbondioksid", "Helium", "Vanndamp"], "Vi puster inn oksygen og ut karbondioksid.",
  "Which gas do the lungs take in from the air?", ["Oxygen", "Carbon dioxide", "Helium", "Water vapour"], "We breathe in oxygen and out carbon dioxide."],
 ["Hvorfor jobber musklene i par?", ["De kan bare trekke, ikke skyve", "For å holde varmen", "For å lage blod", "De trenger selskap"], "Én muskel bøyer armen, en annen strekker den.",
  "Why do muscles work in pairs?", ["They can only pull, not push", "To keep warm", "To make blood", "They need company"], "One muscle bends the arm, another straightens it."],
 ["Hvor mange knokler har en voksen omtrent?", ["206", "50", "1000", "12"], "Et voksent skjelett har 206 knokler.",
  "About how many bones does an adult have?", ["206", "50", "1000", "12"], "An adult skeleton has 206 bones."],
 ["Hvilken sans bruker du når du kjenner at noe er varmt?", ["Følelse", "Hørsel", "Lukt", "Syn"], "Huden har sanseceller for varme, kulde, trykk og smerte.",
  "Which sense do you use to feel that something is hot?", ["Touch", "Hearing", "Smell", "Sight"], "The skin has sense cells for heat, cold, pressure and pain."],
 ["Hvor tas mesteparten av næringen opp i blodet?", ["I tynntarmen", "I munnen", "I lungene", "I hjertet"], "Tynntarmen er lang og har stor overflate, så næringen tas opp der.",
  "Where are most nutrients taken up into the blood?", ["In the small intestine", "In the mouth", "In the lungs", "In the heart"], "The small intestine is long with a large surface, so nutrients are absorbed there."]]);

U("Planter og dyr", "Plants and animals",
`## Hva handler det om?
Alt levende trenger energi. Planter lager sin egen mat, mens dyr må spise.

## Det viktigste
- **Fotosyntese**: planter bruker sollys, vann og karbondioksid til å lage sukker. De slipper ut oksygen.
- En **næringskjede** viser hvem som spiser hvem: gress → hare → rev.
- **Produsenter** er planter. **Konsumenter** er dyr. **Nedbrytere** (sopp, bakterier, mark) bryter ned døde planter og dyr.
- **Pattedyr** har pels og gir melk til ungene. **Fugler** har fjær og legger egg. **Fisk** puster med gjeller. **Insekter** har seks bein.
- Et **økosystem** er alle levende ting i et område og miljøet de lever i.

### Eksempel
I skogen spiser elgen blader. Ulven spiser elgen. Når de dør, bryter sopp og bakterier dem ned til næring for nye planter.

> Uten planter hadde det ikke vært mat – eller oksygen – for dyrene.`,
`## What is it about?
All living things need energy. Plants make their own food, while animals must eat.

## Key points
- **Photosynthesis**: plants use sunlight, water and carbon dioxide to make sugar. They release oxygen.
- A **food chain** shows who eats whom: grass → hare → fox.
- **Producers** are plants. **Consumers** are animals. **Decomposers** (fungi, bacteria, worms) break down dead plants and animals.
- **Mammals** have fur and feed their young milk. **Birds** have feathers and lay eggs. **Fish** breathe with gills. **Insects** have six legs.
- An **ecosystem** is all living things in an area and the environment they live in.

### Example
In the forest the moose eats leaves. The wolf eats the moose. When they die, fungi and bacteria break them down into nutrients for new plants.

> Without plants there would be no food – or oxygen – for the animals.`,
[["Hva trenger planter til fotosyntesen?", ["Sollys, vann og karbondioksid", "Bare jord", "Oksygen og sukker", "Mørke og kulde"], "Med energi fra sola lager planten sukker av vann og karbondioksid.",
  "What do plants need for photosynthesis?", ["Sunlight, water and carbon dioxide", "Only soil", "Oxygen and sugar", "Darkness and cold"], "Using energy from the sun, the plant makes sugar from water and carbon dioxide."],
 ["Hva er en produsent i en næringskjede?", ["En plante", "En rev", "En sopp", "En ørn"], "Planter produserer sin egen næring.",
  "What is a producer in a food chain?", ["A plant", "A fox", "A fungus", "An eagle"], "Plants produce their own food."],
 ["Hvilket dyr er et insekt?", ["Maur", "Edderkopp", "Meitemark", "Snegle"], "Insekter har seks bein. Edderkopper har åtte.",
  "Which animal is an insect?", ["Ant", "Spider", "Earthworm", "Snail"], "Insects have six legs. Spiders have eight."],
 ["Hva gjør nedbryterne?", ["Bryter ned døde planter og dyr", "Spiser bare levende dyr", "Lager oksygen om natten", "Jakter på rovdyr"], "Sopp, bakterier og mark gjør døde rester om til næring i jorda.",
  "What do decomposers do?", ["Break down dead plants and animals", "Eat only living animals", "Make oxygen at night", "Hunt predators"], "Fungi, bacteria and worms turn dead remains into nutrients in the soil."],
 ["Hvilket dyr er et pattedyr?", ["Hval", "Hai", "Pingvin", "Frosk"], "Hvalen gir melk til ungene sine og puster med lunger.",
  "Which animal is a mammal?", ["Whale", "Shark", "Penguin", "Frog"], "The whale feeds its young milk and breathes with lungs."],
 ["I kjeden gress → hare → rev: hva skjer med reven hvis alt gresset forsvinner?", ["Den får mindre mat fordi harene blir færre", "Ingenting", "Den får mer mat", "Den begynner å spise gress"], "Harene mister maten sin og blir færre, og da får reven mindre å spise.",
  "In the chain grass → hare → fox: what happens to the fox if all the grass disappears?", ["It gets less food because there are fewer hares", "Nothing", "It gets more food", "It starts eating grass"], "The hares lose their food and become fewer, so the fox has less to eat."]]);

U("Stoffer og tilstander", "Materials and states of matter",
`## Hva handler det om?
Alt rundt oss er laget av stoffer. Et stoff kan være **fast**, **flytende** eller **gass**.

## Det viktigste
- **Fast stoff** har fast form (is, stein). **Væske** tar formen til beholderen (vann). **Gass** sprer seg overalt (luft, damp).
- Varme kan endre tilstanden: is **smelter** til vann ved 0 °C, vann **koker** og blir damp ved 100 °C.
- Kulde går motsatt vei: damp **kondenserer** til vann, vann **fryser** til is.
- En **blanding** kan skilles: sand og vann med filter, salt og vann ved å la vannet fordampe.
- Noe **løses opp** i vann (sukker, salt), annet gjør det ikke (sand, olje).

### Eksempel
Duggen på et kaldt glass er vanndamp fra lufta som kondenserer til små dråper.

> Det er det samme stoffet – vann – enten det er is, vann eller damp.`,
`## What is it about?
Everything around us is made of materials. A substance can be **solid**, **liquid** or **gas**.

## Key points
- A **solid** keeps its shape (ice, stone). A **liquid** takes the shape of its container (water). A **gas** spreads everywhere (air, steam).
- Heat can change the state: ice **melts** to water at 0 °C, water **boils** and becomes steam at 100 °C.
- Cold works the other way: steam **condenses** to water, water **freezes** to ice.
- A **mixture** can be separated: sand and water with a filter, salt and water by letting the water evaporate.
- Some things **dissolve** in water (sugar, salt), others do not (sand, oil).

### Example
The drops on a cold glass are water vapour from the air condensing into tiny droplets.

> It is the same substance – water – whether it is ice, water or steam.`,
[["Ved hvilken temperatur koker vann?", ["100 °C", "0 °C", "50 °C", "37 °C"], "Ved vanlig lufttrykk koker vann ved 100 °C.",
  "At what temperature does water boil?", ["100 °C", "0 °C", "50 °C", "37 °C"], "At normal air pressure water boils at 100 °C."],
 ["Hva kalles det når is blir til vann?", ["Smelting", "Frysing", "Koking", "Kondensering"], "Fast til flytende er smelting.",
  "What is it called when ice turns into water?", ["Melting", "Freezing", "Boiling", "Condensing"], "Solid to liquid is melting."],
 ["Hvilken tilstand tar formen til beholderen, men har fast volum?", ["Væske", "Fast stoff", "Gass", "Ingen"], "En væske flyter ut i beholderen, men 1 liter er fortsatt 1 liter.",
  "Which state takes the shape of its container but keeps its volume?", ["Liquid", "Solid", "Gas", "None"], "A liquid flows to fit the container, but 1 litre is still 1 litre."],
 ["Hvordan skiller du sand fra vann?", ["Med et filter", "Ved å røre", "Ved å fryse det", "Det går ikke"], "Vannet renner gjennom filteret, sanden blir igjen.",
  "How do you separate sand from water?", ["With a filter", "By stirring", "By freezing it", "It is not possible"], "The water runs through the filter, the sand stays behind."],
 ["Hvorfor blir det dråper på utsiden av et kaldt glass?", ["Vanndamp i lufta kondenserer", "Glasset lekker", "Isen svetter", "Lufta smelter"], "Den kalde overflaten kjøler ned vanndamp, som blir til dråper.",
  "Why do drops form on the outside of a cold glass?", ["Water vapour in the air condenses", "The glass leaks", "The ice sweats", "The air melts"], "The cold surface cools water vapour, which turns into drops."],
 ["Hvilket stoff løser seg opp i vann?", ["Sukker", "Sand", "Olje", "Stein"], "Sukker forsvinner i vannet og gjør det søtt.",
  "Which substance dissolves in water?", ["Sugar", "Sand", "Oil", "Stone"], "Sugar disappears into the water and makes it sweet."]]);

U("Vær og klima", "Weather and climate",
`## Hva handler det om?
**Været** er hvordan det er ute akkurat nå. **Klima** er hvordan været pleier å være et sted over mange år.

## Det viktigste
- **Vannets kretsløp**: sola varmer vann som fordamper, dampen stiger, kjøles ned og danner skyer, og vannet faller som regn eller snø.
- Vi måler været med **termometer** (temperatur), **regnmåler** (nedbør) og **vindmåler**.
- **Vind** er luft som beveger seg fra høyt mot lavt lufttrykk.
- **Drivhuseffekten**: gasser i lufta holder på varmen, som glasset i et drivhus. Mer CO₂ gir varmere klima.
- Norge har kystklima (mildt og vått) ved havet og innlandsklima (kaldere vintre) lenger inn.

### Eksempel
I dag regner det i Bergen – det er vær. At Bergen har mye regn de fleste år, er klima.

> Vær endrer seg fra time til time, klima endrer seg over mange år.`,
`## What is it about?
**Weather** is what it is like outside right now. **Climate** is what the weather is usually like in a place over many years.

## Key points
- **The water cycle**: the sun heats water which evaporates, the vapour rises, cools down and forms clouds, and the water falls as rain or snow.
- We measure the weather with a **thermometer** (temperature), a **rain gauge** (precipitation) and a **wind gauge**.
- **Wind** is air moving from high to low air pressure.
- **The greenhouse effect**: gases in the air keep in the heat, like the glass of a greenhouse. More CO₂ gives a warmer climate.
- Norway has a coastal climate (mild and wet) by the sea and an inland climate (colder winters) further in.

### Example
It is raining in Bergen today – that is weather. That Bergen gets a lot of rain most years is climate.

> Weather changes from hour to hour, climate changes over many years.`,
[["Hva er forskjellen på vær og klima?", ["Vær er nå, klima er gjennomsnittet over mange år", "Det er det samme", "Klima er bare temperatur", "Vær gjelder bare om vinteren"], "Klima er det typiske været over lang tid.",
  "What is the difference between weather and climate?", ["Weather is now, climate is the average over many years", "They are the same", "Climate is only temperature", "Weather only applies in winter"], "Climate is the typical weather over a long time."],
 ["Hva skjer først i vannets kretsløp når sola varmer havet?", ["Vannet fordamper", "Det snør", "Vannet fryser", "Det blir torden"], "Varmen gjør at vann blir til damp som stiger opp.",
  "What happens first in the water cycle when the sun heats the sea?", ["The water evaporates", "It snows", "The water freezes", "There is thunder"], "The heat turns water into vapour that rises."],
 ["Hva måler et termometer?", ["Temperatur", "Nedbør", "Vind", "Lufttrykk"], "Termo betyr varme.",
  "What does a thermometer measure?", ["Temperature", "Precipitation", "Wind", "Air pressure"], "Thermo means heat."],
 ["Hvordan dannes skyer?", ["Vanndamp kjøles ned og blir til små dråper", "Røyk fra fabrikker", "Sola lager dem", "Vinden blåser dem fra havet"], "Høyt oppe er det kaldt, og dampen kondenserer til små dråper.",
  "How do clouds form?", ["Water vapour cools and turns into tiny droplets", "Smoke from factories", "The sun makes them", "The wind blows them from the sea"], "High up it is cold, and the vapour condenses into tiny droplets."],
 ["Hva gjør drivhusgasser?", ["Holder på varmen i lufta", "Lager regn", "Gjør lufta renere", "Kjøler ned jorda"], "De slipper inn sollys, men holder på varmen, som glasset i et drivhus.",
  "What do greenhouse gases do?", ["Keep heat in the air", "Make rain", "Clean the air", "Cool the Earth down"], "They let sunlight in but keep the heat, like the glass of a greenhouse."],
 ["Hvorfor er vintrene ofte mildere ved kysten enn i innlandet?", ["Havet holder på varmen", "Det er færre fjell", "Sola skinner mer", "Det er mindre vind"], "Havet varmes sakte opp og kjøles sakte ned, og gir mildere vintre.",
  "Why are winters often milder by the coast than inland?", ["The sea keeps its heat", "There are fewer mountains", "The sun shines more", "There is less wind"], "The sea warms up and cools down slowly, giving milder winters."]]);

U("Jorda og verdensrommet", "Earth and space",
`## Hva handler det om?
Jorda er en planet som går i bane rundt sola. Sola er en stjerne.

## Det viktigste
- Jorda **snurrer rundt seg selv** én gang i døgnet. Det gir dag og natt.
- Jorda går **rundt sola** én gang i året.
- **Årstidene** kommer av at jordaksen heller. Om sommeren heller vår del av jorda mot sola.
- **Månen** går rundt jorda på omtrent en måned. Vi ser den fordi den lyser opp av sola – **månefasene** viser hvor mye av den opplyste siden vi ser.
- Solsystemet har åtte planeter: Merkur, Venus, Jorda, Mars, Jupiter, Saturn, Uranus og Neptun.

### Eksempel
Når det er dag i Norge, er det natt i Australia – jorda har snudd seg så de ser bort fra sola.

> Huskeregel for planetene: «Mor Vil Jeg Må Jo Snart Ut Nå».`,
`## What is it about?
The Earth is a planet that orbits the Sun. The Sun is a star.

## Key points
- The Earth **spins around itself** once a day. That gives day and night.
- The Earth goes **around the Sun** once a year.
- **The seasons** come from the tilt of the Earth's axis. In summer our part of the Earth leans towards the Sun.
- **The Moon** goes around the Earth in about a month. We see it because it is lit up by the Sun – the **phases of the Moon** show how much of the lit side we see.
- The solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.

### Example
When it is day in Norway, it is night in Australia – the Earth has turned so they face away from the Sun.

> A memory aid for the planets: "My Very Educated Mother Just Served Us Noodles".`,
[["Hva gir dag og natt?", ["At jorda snurrer rundt seg selv", "At jorda går rundt sola", "At månen skygger", "At sola slukkes om natten"], "Jorda roterer én gang i døgnet.",
  "What causes day and night?", ["The Earth spinning around itself", "The Earth going around the Sun", "The Moon casting a shadow", "The Sun switching off at night"], "The Earth rotates once a day."],
 ["Hvor lang tid bruker jorda rundt sola?", ["Ett år", "Ett døgn", "En måned", "En uke"], "Ett år er én runde rundt sola.",
  "How long does the Earth take to go around the Sun?", ["One year", "One day", "One month", "One week"], "One year is one lap around the Sun."],
 ["Hva er sola?", ["En stjerne", "En planet", "En måne", "En komet"], "Sola er en stjerne, den nærmeste vi har.",
  "What is the Sun?", ["A star", "A planet", "A moon", "A comet"], "The Sun is a star, the nearest one to us."],
 ["Hvorfor har vi årstider?", ["Jordaksen heller", "Avstanden til sola endrer seg mye", "Sola blir varmere om sommeren", "Månen gir varme"], "Når vår halvdel heller mot sola, får vi sommer.",
  "Why do we have seasons?", ["The Earth's axis is tilted", "The distance to the Sun changes a lot", "The Sun gets hotter in summer", "The Moon gives heat"], "When our half leans towards the Sun, we get summer."],
 ["Hvilken planet er størst?", ["Jupiter", "Jorda", "Mars", "Merkur"], "Jupiter er en gasskjempe, over 11 ganger så bred som jorda.",
  "Which planet is the largest?", ["Jupiter", "Earth", "Mars", "Mercury"], "Jupiter is a gas giant, over 11 times as wide as the Earth."],
 ["Hvorfor kan vi se månen?", ["Den blir lyst opp av sola", "Den lyser selv", "Den reflekterer jordlys bare om natten", "Den er laget av is"], "Månen lyser ikke selv – vi ser sollys som treffer den.",
  "Why can we see the Moon?", ["It is lit up by the Sun", "It glows by itself", "It reflects earthlight only at night", "It is made of ice"], "The Moon does not glow – we see sunlight hitting it."]]);

U("Elektrisitet og magneter", "Electricity and magnets",
`## Hva handler det om?
Strøm og magneter er usynlige krefter vi bruker hele tiden – i lommelykter, telefoner og kjøleskap.

## Det viktigste
- En **strømkrets** må være lukket: batteri, ledninger og en pære i en ring. Brytes ringen, slukner pæra.
- **Ledere** slipper strøm gjennom (metaller). **Isolatorer** gjør det ikke (plast, gummi, tre).
- Et **batteri** har pluss- og minuspol og gir strøm til kretsen.
- En **magnet** har nordpol og sørpol. Like poler frastøter hverandre, ulike poler tiltrekker.
- Magneter trekker på jern, men ikke på plast, tre eller aluminium.
- Et **kompass** er en liten magnet som peker mot nord.

### Eksempel
Ledningen i en lampe er av kobber (leder) med plast rundt (isolator), så du ikke får støt.

> Strøm fra stikkontakten er farlig. Lek aldri med den.`,
`## What is it about?
Electricity and magnets are invisible forces we use all the time – in torches, phones and fridges.

## Key points
- An **electric circuit** must be closed: battery, wires and a bulb in a loop. Break the loop and the bulb goes out.
- **Conductors** let current through (metals). **Insulators** do not (plastic, rubber, wood).
- A **battery** has a plus and a minus terminal and supplies the circuit with current.
- A **magnet** has a north pole and a south pole. Like poles repel, unlike poles attract.
- Magnets pull on iron, but not on plastic, wood or aluminium.
- A **compass** is a small magnet that points north.

### Example
The cable of a lamp is copper (conductor) with plastic around it (insulator), so you do not get a shock.

> Electricity from the wall socket is dangerous. Never play with it.`,
[["Hvorfor lyser ikke pæra hvis en ledning løsner?", ["Kretsen er ikke lukket", "Batteriet blir for varmt", "Pæra blir redd", "Strømmen går fortere"], "Strømmen trenger en hel ring å gå i.",
  "Why does the bulb not light if a wire comes loose?", ["The circuit is not closed", "The battery gets too hot", "The bulb gets scared", "The current goes faster"], "The current needs a complete loop."],
 ["Hvilket materiale er en god leder?", ["Kobber", "Plast", "Gummi", "Tre"], "Metaller som kobber leder strøm godt.",
  "Which material is a good conductor?", ["Copper", "Plastic", "Rubber", "Wood"], "Metals like copper conduct electricity well."],
 ["Hva skjer når to nordpoler møtes?", ["De skyver hverandre bort", "De trekker hverandre til seg", "Ingenting", "De blir sørpoler"], "Like poler frastøter hverandre.",
  "What happens when two north poles meet?", ["They push each other away", "They pull each other together", "Nothing", "They become south poles"], "Like poles repel each other."],
 ["Hva trekker en magnet på?", ["En spiker av jern", "En plastskje", "Et viskelær", "En tresjokk"], "Magneter trekker på jern og stål.",
  "What does a magnet pull on?", ["An iron nail", "A plastic spoon", "An eraser", "A wooden block"], "Magnets pull on iron and steel."],
 ["Hvorfor peker kompassnåla mot nord?", ["Den er en magnet som påvirkes av jordas magnetfelt", "Den er tung i den ene enden", "Vinden blåser den", "Sola trekker på den"], "Jorda er som en stor magnet, og kompassnåla retter seg etter den.",
  "Why does a compass needle point north?", ["It is a magnet affected by the Earth's magnetic field", "It is heavy at one end", "The wind blows it", "The Sun pulls on it"], "The Earth is like a big magnet, and the needle lines up with it."],
 ["Hvorfor har ledninger plast utenpå?", ["Plast er en isolator som beskytter mot støt", "For at de skal være fine", "Plast leder strøm bedre", "For å gjøre dem tyngre"], "Plasten slipper ikke strøm gjennom.",
  "Why do cables have plastic on the outside?", ["Plastic is an insulator that protects against shocks", "To make them pretty", "Plastic conducts better", "To make them heavier"], "Plastic does not let current through."]]);
})();
