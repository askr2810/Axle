// ============================================================
//  timeline.js – interaktive tidslinjer (historie, religion …).
//  Brukes med linjen ![tl:navn] i teorien, eller kobles til en enhet i TL_MAP (havner etter første avsnitt).
//  Hver tidslinje: t = tittel, r = [fra, til], w = hvor mye avstand følger årstall (0 = jevnt, 1 = i skala),
//  e = epoker [fra, til, nb, en, felt (0/1)], v = hendelser [år, kort nb, kort en, forklaring nb, forklaring en, ca?].
//  To moduser: «Utforsk» (trykk på hendelser, bla fram og tilbake) og «Sett i rekkefølge» (sorteringsspill).
// ============================================================
const TIMELINES = {
  his_epoker: { t: ["Epokene i verdenshistorien", "The eras of world history"], r: [-3400, 2030], w: 0.25,
    e: [[-3400, 476, "Oldtiden", "Antiquity"], [476, 1500, "Middelalderen", "Middle Ages"], [1500, 1789, "Tidlig nytid", "Early modern"], [1789, 2030, "Moderne tid", "Modern era"]],
    v: [[-3200, "Skriften", "Writing", "Sumererne i Mesopotamia tar i bruk kileskrift. Med skrift begynner historisk tid – det som kom før, kaller vi forhistorie.", "The Sumerians in Mesopotamia start using cuneiform. Writing marks the start of history – what came before is prehistory.", 1],
      [-2560, "Keopspyramiden", "Great Pyramid", "Den store pyramiden i Giza står ferdig. I nesten 4000 år var den verdens høyeste byggverk.", "The Great Pyramid of Giza is completed. For almost 4,000 years it was the tallest building in the world.", 1],
      [-508, "Demokrati i Athen", "Athenian democracy", "Kleisthenes' reformer gir Athen et direkte demokrati – men bare frie menn fikk være med.", "Cleisthenes' reforms give Athens a direct democracy – but only free men could take part.", 1],
      [-27, "Romerriket", "Roman Empire", "Augustus blir den første keiseren, og Roma går fra republikk til keiserrike.", "Augustus becomes the first emperor, and Rome goes from republic to empire."],
      [476, "Vest-Roma faller", "Fall of West Rome", "Den siste vestromerske keiseren blir avsatt. Et vanlig skille mellom oldtid og middelalder.", "The last Western Roman emperor is deposed. A common dividing line between antiquity and the Middle Ages."],
      [793, "Lindisfarne", "Lindisfarne", "Vikinger plyndrer klosteret på Lindisfarne i England – starten på vikingtiden.", "Vikings raid the monastery of Lindisfarne in England – the start of the Viking Age."],
      [1450, "Boktrykk", "Printing press", "Gutenberg trykker med løse typer. Bøker blir billige, og nye ideer sprer seg raskt.", "Gutenberg prints with movable type. Books become cheap and new ideas spread fast.", 1],
      [1492, "Columbus", "Columbus", "Columbus når Amerika. Europeisk kolonisering av to kontinenter begynner.", "Columbus reaches the Americas. European colonisation of two continents begins."],
      [1789, "Franske revolusjon", "French Revolution", "Folket reiser seg mot kongemakten med krav om frihet, likhet og brorskap.", "The people rise against the monarchy, demanding liberty, equality and fraternity."],
      [1914, "1. verdenskrig", "World War I", "Den første totale krigen. Fire år i skyttergraver og rundt 17 millioner døde.", "The first total war. Four years in the trenches and around 17 million dead."],
      [1945, "2. verdenskrig slutt", "WWII ends", "Den mest ødeleggende krigen i historien slutter. FN blir grunnlagt samme år.", "The most destructive war in history ends. The UN is founded the same year."],
      [1969, "Månelandingen", "Moon landing", "Neil Armstrong blir det første mennesket som går på månen.", "Neil Armstrong becomes the first person to walk on the Moon."],
      [1989, "Muren faller", "The Wall falls", "Berlinmuren åpnes, og den kalde krigen nærmer seg slutten.", "The Berlin Wall opens and the Cold War draws to a close."]] },

  his_viking: { t: ["Vikingtid og middelalder i Norge", "The Viking Age and Middle Ages in Norway"], r: [770, 1560], w: 0.55,
    e: [[793, 1066, "Vikingtiden", "Viking Age"], [1066, 1349, "Høymiddelalderen", "High Middle Ages"], [1349, 1537, "Senmiddelalderen", "Late Middle Ages"], [1380, 1560, "Union med Danmark", "Union with Denmark", 1]],
    v: [[793, "Lindisfarne", "Lindisfarne", "Vikinger plyndrer klosteret på Lindisfarne i England – starten på vikingtiden.", "Vikings raid the monastery of Lindisfarne in England – the start of the Viking Age."],
      [872, "Hafrsfjord", "Hafrsfjord", "Ifølge sagaene samler Harald Hårfagre Norge etter slaget i Hafrsfjord. Årstallet er usikkert.", "According to the sagas, Harald Fairhair unites Norway after the battle of Hafrsfjord. The year is uncertain.", 1],
      [1000, "Vinland", "Vinland", "Leiv Eiriksson seiler til Nord-Amerika – nesten 500 år før Columbus.", "Leif Erikson sails to North America – almost 500 years before Columbus.", 1],
      [1030, "Stiklestad", "Stiklestad", "Olav Haraldsson faller i slaget. Han blir snart regnet som helgen, og kristendommen fester grepet i Norge.", "Olaf Haraldsson falls in battle. He is soon seen as a saint, and Christianity takes hold in Norway."],
      [1066, "Stamford Bridge", "Stamford Bridge", "Harald Hardråde faller i England. Ofte regnet som slutten på vikingtiden.", "Harald Hardrada falls in England. Often seen as the end of the Viking Age."],
      [1153, "Erkebispesete", "Archbishopric", "Nidaros blir erkebispesete (1152/53). Kirken i Norge får sin egen ledelse.", "Nidaros becomes an archbishopric (1152/53). The Church in Norway gets its own leadership.", 1],
      [1274, "Landsloven", "The Code of the Realm", "Magnus Lagabøte gir hele landet én felles lov – en av de første i Europa.", "Magnus the Law-mender gives the whole country one common law – one of the first in Europe."],
      [1349, "Svartedauden", "The Black Death", "Pesten kommer med et skip til Bergen. Kanskje halvparten av befolkningen dør.", "The plague arrives on a ship to Bergen. Perhaps half the population dies."],
      [1397, "Kalmarunionen", "Kalmar Union", "Norge, Danmark og Sverige samles under én monark, dronning Margrete.", "Norway, Denmark and Sweden are united under one monarch, Queen Margaret."],
      [1537, "Reformasjonen", "Reformation", "Danmark-Norge blir luthersk. Norge mister riksrådet og styres i praksis fra København.", "Denmark-Norway becomes Lutheran. Norway loses its council and is in practice ruled from Copenhagen."]] },

  his_reform: { t: ["Fra boktrykk til revolusjoner", "From the printing press to the revolutions"], r: [1430, 1830], w: 0.55,
    e: [[1517, 1648, "Reformasjon og religionskriger", "Reformation and wars of religion"], [1680, 1775, "Opplysningstiden", "Enlightenment"], [1775, 1815, "Revolusjonene", "Revolutions"],
      [1430, 1600, "Renessansen", "Renaissance", 1], [1660, 1814, "Eneveldet i Danmark-Norge", "Absolutism in Denmark-Norway", 1]],
    v: [[1450, "Boktrykk", "Printing press", "Gutenberg trykker med løse typer. Bøker blir billige, og nye ideer sprer seg raskt.", "Gutenberg prints with movable type. Books become cheap and new ideas spread fast.", 1],
      [1492, "Columbus", "Columbus", "Columbus når Amerika. Europeisk kolonisering begynner.", "Columbus reaches the Americas. European colonisation begins."],
      [1517, "Luthers teser", "Luther's theses", "Luther kritiserer avlatshandelen med 95 teser. Reformasjonen splitter kirken.", "Luther criticises the sale of indulgences in 95 theses. The Reformation splits the Church."],
      [1537, "Reformasjon i Norge", "Reformation in Norway", "Kongen innfører lutherdommen i Danmark-Norge. Kirkens jord og makt går til kronen.", "The king introduces Lutheranism in Denmark-Norway. The Church's land and power pass to the Crown."],
      [1543, "Kopernikus", "Copernicus", "Kopernikus hevder at jorda går rundt sola. Starten på den vitenskapelige revolusjonen.", "Copernicus argues that the Earth orbits the Sun. The start of the Scientific Revolution."],
      [1618, "Trettiårskrigen", "Thirty Years' War", "Religionskrig i Europa fram til 1648. Store deler av Tyskland blir lagt øde.", "A war of religion in Europe until 1648. Large parts of Germany are laid waste."],
      [1660, "Eneveldet", "Absolutism", "Kongen i Danmark-Norge får all makt. Eneveldet varer helt til 1814.", "The king of Denmark-Norway gets absolute power. Absolutism lasts until 1814."],
      [1687, "Newton", "Newton", "Newton forklarer bevegelse og tyngdekraft med matematikk.", "Newton explains motion and gravity with mathematics."],
      [1769, "Dampmaskinen", "Steam engine", "James Watt patenterer en forbedret dampmaskin – motoren i den industrielle revolusjonen.", "James Watt patents an improved steam engine – the engine of the Industrial Revolution."],
      [1776, "USA uavhengig", "US independence", "13 kolonier erklærer seg uavhengige av Storbritannia, bygd på opplysningstidens ideer.", "13 colonies declare independence from Britain, built on Enlightenment ideas."],
      [1789, "Franske revolusjon", "French Revolution", "Stormingen av Bastillen og erklæringen om menneskets rettigheter.", "The storming of the Bastille and the Declaration of the Rights of Man."],
      [1815, "Wienerkongressen", "Congress of Vienna", "Napoleon er slått, og stormaktene tegner Europas grenser på nytt.", "Napoleon is defeated and the great powers redraw the borders of Europe."]] },

  his_norge: { t: ["Norge 1800–1920", "Norway 1800–1920"], r: [1800, 1920], w: 0.6,
    e: [[1800, 1814, "Union med Danmark", "Union with Denmark"], [1814, 1905, "Union med Sverige", "Union with Sweden"], [1905, 1920, "Selvstendig", "Independent"],
      [1814, 1884, "Embetsmannsstaten", "Rule of officials", 1], [1884, 1920, "Parlamentarisme", "Parliamentarism", 1]],
    v: [[1811, "Universitetet", "The university", "Norges første universitet blir vedtatt i Christiania (åpnet 1813).", "Norway's first university is founded in Christiania (opened 1813)."],
      [1814, "Grunnloven", "The Constitution", "Riksforsamlingen på Eidsvoll vedtar Grunnloven 17. mai. Om høsten går Norge i union med Sverige, men beholder Grunnloven.", "The assembly at Eidsvoll adopts the Constitution on 17 May. In the autumn Norway enters a union with Sweden but keeps the Constitution."],
      [1825, "Utvandringen", "Emigration", "Sluppen «Restauration» seiler til Amerika. Fram til 1930 utvandrer rundt 800 000 nordmenn.", "The sloop Restauration sails to America. By 1930 about 800,000 Norwegians have emigrated."],
      [1837, "Formannskapslovene", "Local self-rule", "Kommunene får egne folkevalgte styrer – lokalt selvstyre.", "Municipalities get their own elected councils – local self-government."],
      [1848, "Thranebevegelsen", "Thrane movement", "Marcus Thrane organiserer arbeidere og husmenn – Norges første store folkebevegelse.", "Marcus Thrane organises workers and cottars – Norway's first great popular movement."],
      [1854, "Jernbanen", "The railway", "Hovedbanen mellom Christiania og Eidsvoll åpner – Norges første jernbane.", "The Trunk Line between Christiania and Eidsvoll opens – Norway's first railway."],
      [1884, "Parlamentarismen", "Parliamentarism", "Etter riksrettssaken må regjeringen ha Stortingets tillit. Johan Sverdrup blir statsminister.", "After the impeachment case the government needs the confidence of the Storting. Johan Sverdrup becomes prime minister."],
      [1887, "Arbeiderpartiet", "Labour Party", "Det norske Arbeiderparti blir stiftet.", "The Norwegian Labour Party is founded."],
      [1898, "Stemmerett menn", "Male suffrage", "Alle menn over 25 år får stemmerett.", "All men over 25 get the vote."],
      [1905, "Unionen oppløst", "Union dissolved", "Stortinget erklærer 7. juni at unionen med Sverige er oppløst. Haakon VII blir konge.", "On 7 June the Storting declares the union with Sweden dissolved. Haakon VII becomes king."],
      [1913, "Stemmerett kvinner", "Female suffrage", "Kvinner får stemmerett på samme vilkår som menn.", "Women get the vote on the same terms as men."]] },

  his_krig: { t: ["Verdenskrigene", "The world wars"], r: [1911, 1948], w: 0.65,
    e: [[1914, 1918, "1. verdenskrig", "World War I"], [1918, 1939, "Mellomkrigstiden", "Interwar years"], [1939, 1945, "2. verdenskrig", "World War II"], [1940, 1945, "Okkupasjonen", "Occupation of Norway", 1]],
    v: [[1914, "Sarajevo", "Sarajevo", "Erkehertug Franz Ferdinand blir drept 28. juni. En måned senere er Europa i krig.", "Archduke Franz Ferdinand is killed on 28 June. A month later Europe is at war."],
      [1916, "Slaget ved Somme", "Battle of the Somme", "Over én million soldater blir drept eller såret – skyttergravskrigen på sitt verste.", "Over a million soldiers are killed or wounded – trench warfare at its worst."],
      [1917, "Russiske revolusjon", "Russian Revolution", "Bolsjevikene tar makten i Russland. Sovjetunionen blir dannet i 1922.", "The Bolsheviks seize power in Russia. The Soviet Union is formed in 1922."],
      [1918, "Våpenhvile", "Armistice", "Krigen slutter 11. november. Rundt 17 millioner har mistet livet.", "The war ends on 11 November. Around 17 million have died."],
      [1919, "Versailles", "Versailles", "Fredsavtalen gir Tyskland skylden og store krigserstatninger – grobunn for ny konflikt.", "The peace treaty blames Germany and imposes heavy reparations – fertile ground for new conflict."],
      [1929, "Børskrakket", "Wall Street Crash", "Aksjene raser i New York, og verden går inn i en dyp økonomisk krise.", "Shares collapse in New York and the world enters a deep economic crisis."],
      [1933, "Hitler", "Hitler", "Hitler blir rikskansler og gjør Tyskland til et diktatur.", "Hitler becomes chancellor and turns Germany into a dictatorship."],
      [1939, "Angrepet på Polen", "Invasion of Poland", "Tyskland angriper Polen 1. september. Storbritannia og Frankrike erklærer krig.", "Germany invades Poland on 1 September. Britain and France declare war."],
      [1940, "9. april", "9 April", "Tyskland angriper Norge. Kongen og regjeringen flykter til London, og landet er okkupert i fem år.", "Germany invades Norway. The king and government flee to London, and the country is occupied for five years."],
      [1942, "Donau", "The Donau", "Skipet Donau frakter over 500 norske jøder til Auschwitz. Nesten ingen overlevde.", "The ship Donau takes more than 500 Norwegian Jews to Auschwitz. Almost none survived."],
      [1943, "Stalingrad", "Stalingrad", "Den tyske hæren gir opp i Stalingrad – vendepunktet på østfronten.", "The German army surrenders at Stalingrad – the turning point on the Eastern Front."],
      [1944, "D-dagen", "D-Day", "De allierte går i land i Normandie 6. juni.", "The Allies land in Normandy on 6 June."],
      [1945, "Frigjøringen", "Liberation", "Tyskland kapitulerer 8. mai, og Norge er fritt. I august slippes atombomber over Hiroshima og Nagasaki.", "Germany surrenders on 8 May and Norway is free. In August atomic bombs fall on Hiroshima and Nagasaki."]] },

  his_kald: { t: ["Den kalde krigen og Norge", "The Cold War and Norway"], r: [1943, 1996], w: 0.6,
    e: [[1947, 1991, "Den kalde krigen", "The Cold War"], [1945, 1965, "Gjenreisning", "Reconstruction", 1], [1969, 1996, "Oljealderen", "Oil age", 1]],
    v: [[1945, "FN", "The UN", "De forente nasjoner blir grunnlagt. Nordmannen Trygve Lie blir første generalsekretær.", "The United Nations is founded. Norwegian Trygve Lie becomes the first Secretary-General."],
      [1947, "Marshallplanen", "Marshall Plan", "USA gir økonomisk hjelp til gjenreisingen av Vest-Europa. Norge tar imot fra 1948.", "The US gives economic aid to rebuild Western Europe. Norway receives it from 1948."],
      [1949, "NATO", "NATO", "Norge er med fra starten i forsvarsalliansen NATO.", "Norway is a founding member of the NATO alliance."],
      [1950, "Koreakrigen", "Korean War", "Den første store «varme» krigen i den kalde krigen.", "The first major 'hot' war of the Cold War."],
      [1957, "Sputnik", "Sputnik", "Sovjetunionen sender opp den første satellitten. Romkappløpet starter.", "The Soviet Union launches the first satellite. The space race begins."],
      [1961, "Muren bygges", "Wall is built", "Øst-Tyskland bygger Berlinmuren for å stoppe flukten vestover.", "East Germany builds the Berlin Wall to stop people fleeing west."],
      [1962, "Cubakrisen", "Cuban crisis", "Sovjetiske raketter på Cuba – verden er nærmere atomkrig enn noen gang.", "Soviet missiles in Cuba – the world is closer to nuclear war than ever."],
      [1969, "Ekofisk", "Ekofisk", "Ekofisk blir funnet i Nordsjøen. Norge blir en oljenasjon.", "Ekofisk is discovered in the North Sea. Norway becomes an oil nation."],
      [1972, "Nei til EF", "No to the EC", "53,5 % stemmer nei til medlemskap i EF.", "53.5% vote against joining the EC."],
      [1989, "Muren faller", "The Wall falls", "Grensen i Berlin åpnes 9. november. Kommunistregimene i Øst-Europa faller ett etter ett.", "The Berlin border opens on 9 November. The communist regimes of Eastern Europe fall one by one."],
      [1991, "Sovjet oppløst", "USSR dissolved", "Sovjetunionen går i oppløsning, og den kalde krigen er over.", "The Soviet Union dissolves and the Cold War is over."],
      [1994, "Nei til EU", "No to the EU", "Nordmenn sier nei til EU for andre gang (52,2 %). Norge er med i EØS i stedet.", "Norwegians reject the EU a second time (52.2%). Norway is in the EEA instead."]] },

  his_samer: { t: ["Samer og nasjonale minoriteter", "The Sami and national minorities"], r: [1735, 2030], w: 0.35,
    e: [[1850, 1980, "Fornorskingspolitikken", "Norwegianisation policy"], [1980, 2030, "Rettigheter og forsoning", "Rights and reconciliation"]],
    v: [[1751, "Lappekodisillen", "Lapp Codicil", "Tillegget til grensetraktaten med Sverige sikrer samenes rett til å flytte med reinen over grensen.", "The addendum to the border treaty with Sweden secures the Sami right to move reindeer across the border."],
      [1852, "Kautokeino-opprøret", "Kautokeino uprising", "Et opprør mot handelsmann, lensmann og prest ender med drap, og to av opprørerne blir henrettet.", "An uprising against the merchant, sheriff and priest ends in killings, and two of the rebels are executed."],
      [1902, "Jordsalgsloven", "Land Sale Act", "Bare de som kan norsk og bruker det daglig, får kjøpe jord i Finnmark.", "Only people who speak Norwegian and use it daily may buy land in Finnmark."],
      [1917, "Landsmøtet", "First Sami congress", "Første samiske landsmøte samles i Trondheim 6. februar. Datoen er i dag samenes nasjonaldag.", "The first Sami congress meets in Trondheim on 6 February. The date is now Sami National Day."],
      [1979, "Alta-saken", "The Alta case", "Demonstrasjoner og sultestreik mot utbyggingen av Altaelva setter samiske rettigheter på dagsorden.", "Protests and hunger strikes against damming the Alta river put Sami rights on the agenda."],
      [1987, "Sameloven", "The Sami Act", "Sameloven vedtas og gir grunnlaget for et eget samisk folkevalgt organ.", "The Sami Act is passed and lays the ground for an elected Sami body."],
      [1988, "Samene i Grunnloven", "Sami in the Constitution", "Staten skal legge til rette for at samene kan sikre og utvikle språk, kultur og samfunnsliv.", "The state must enable the Sami to preserve and develop their language, culture and way of life."],
      [1989, "Sametinget", "The Sami Parliament", "Sametinget åpner i Karasjok.", "The Sami Parliament opens in Karasjok."],
      [1990, "ILO 169", "ILO 169", "Norge blir det første landet som ratifiserer ILO-konvensjonen om urfolks rettigheter.", "Norway becomes the first country to ratify the ILO convention on indigenous peoples' rights."],
      [1997, "Kongens unnskyldning", "The King's apology", "Kong Harald beklager uretten staten har gjort mot samene gjennom fornorskingen.", "King Harald apologises for the injustice the state did to the Sami through Norwegianisation."],
      [1999, "Nasjonale minoriteter", "National minorities", "Jøder, kvener/norskfinner, rom, romani/tatere og skogfinner får status som nasjonale minoriteter.", "Jews, Kvens/Norwegian Finns, Roma, Romani/Tater and Forest Finns get status as national minorities."],
      [2005, "Finnmarksloven", "Finnmark Act", "Statens grunn i Finnmark går over til Finnmarkseiendommen, som Sametinget og fylket styrer sammen.", "State land in Finnmark passes to the Finnmark Estate, run jointly by the Sami Parliament and the county."],
      [2023, "Sannhetskommisjonen", "Truth Commission", "Sannhets- og forsoningskommisjonen legger fram rapporten om fornorskingen og uretten mot samer, kvener/norskfinner og skogfinner.", "The Truth and Reconciliation Commission presents its report on Norwegianisation and the injustice against Sami, Kvens/Norwegian Finns and Forest Finns."]] },

  rel_tid: { t: ["Religionenes historie", "A history of religions"], r: [-1700, 2030], w: 0.3,
    e: [[-1700, 30, "Før vår tidsregning", "Before the Common Era"], [30, 2030, "Vår tidsregning", "Common Era"]],
    v: [[-1500, "Vedaene", "The Vedas", "De eldste hellige tekstene i hinduismen blir til – først som muntlig tradisjon.", "The oldest sacred texts of Hinduism take shape – first as oral tradition.", 1],
      [-586, "Eksilet i Babylon", "Babylonian exile", "Babylonerne ødelegger tempelet i Jerusalem. I eksilet tar jødedommen form med vekt på Toraen.", "The Babylonians destroy the Temple in Jerusalem. In exile Judaism takes shape around the Torah.", 1],
      [-500, "Buddha", "The Buddha", "Siddharta Gautama blir «Buddha», den oppvåknede, i Nord-India.", "Siddhartha Gautama becomes the Buddha, 'the awakened one', in northern India.", 1],
      [30, "Jesus korsfestes", "Jesus is crucified", "Jesus fra Nasaret blir korsfestet i Jerusalem. Disiplene forkynner at han har stått opp.", "Jesus of Nazareth is crucified in Jerusalem. His disciples proclaim that he has risen.", 1],
      [622, "Hijra", "Hijra", "Muhammed flytter fra Mekka til Medina. Året er starten på den islamske kalenderen.", "Muhammad moves from Mecca to Medina. The year starts the Islamic calendar."],
      [1030, "Stiklestad", "Stiklestad", "Olav den hellige faller. Kristendommen fester grepet i Norge.", "St Olaf falls. Christianity takes hold in Norway."],
      [1054, "Det store skismaet", "The Great Schism", "Kirken splittes i en vestlig (katolsk) og en østlig (ortodoks) del.", "The Church splits into a Western (Catholic) and an Eastern (Orthodox) branch."],
      [1499, "Sikhismen", "Sikhism", "Guru Nanak begynner å forkynne i Punjab – starten på sikhismen.", "Guru Nanak begins preaching in Punjab – the start of Sikhism.", 1],
      [1517, "Reformasjonen", "Reformation", "Luther kritiserer kirken, og protestantismen oppstår.", "Luther criticises the Church and Protestantism is born."],
      [1845, "Dissenterloven", "Dissenter Act", "Kristne utenfor statskirken får lov til å danne egne trossamfunn i Norge.", "Christians outside the state church may form their own communities in Norway."],
      [1851, "Jødeparagrafen", "The Jew clause", "Grunnlovens forbud mot jøder i Norge blir opphevet.", "The Constitution's ban on Jews in Norway is lifted."],
      [2012, "Ikke statsreligion", "No state religion", "Grunnloven endres: Norge har ikke lenger en offisiell statsreligion.", "The Constitution is amended: Norway no longer has an official state religion."]] }
};
const TL_UNITS = [["VGHIS", "Historiefaget og kildekritikk", "his_epoker"], ["VGHIS", "Vikingtid og middelalder", "his_viking"], ["VGHIS", "Reformasjon, opplysningstid og revolusjoner", "his_reform"],
  ["VGHIS", "Norge 1814–1905", "his_norge"], ["VGHIS", "Verdenskrigene", "his_krig"], ["VGHIS", "Den kalde krigen og etterkrigstiden", "his_kald"], ["VGHIS", "Samer og nasjonale minoriteter", "his_samer"],
  ["VGREL", "Religion i Norge og verden", "rel_tid"]];
const TL_MAP = {};
for(const [code, title, name] of TL_UNITS){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) TL_MAP[code + ":" + u] = name; }
const TL_XP = 3;

// Tidslinjen settes inn rett etter første avsnitt, så den blir en oversikt før detaljene.
function withTl(code, u, src){
  const name = TL_MAP[code + ":" + u]; if(!name || src.includes("![tl:")) return src;
  const lines = src.split("\n"), h = lines.findIndex((l, k) => k > 0 && /^##\s/.test(l.trim()));
  if(h < 0) return src + "\n\n![tl:" + name + "]";
  lines.splice(h, 0, "![tl:" + name + "]", ""); return lines.join("\n");
}
const tlYear = (y, ca) => (ca ? T("ca. ", "c. ") : "") + (y < 0 ? -y + T(" fvt.", " BCE") : String(y));
// Plassering: en blanding av skala og jevn avstand, og aldri tettere enn GAP px (så etikettene ikke kolliderer).
function tlLayout(D){
  const n = D.v.length, P = 56, GAP = 66, W0 = Math.max(600, n * GAP + 2 * P), [a, b] = D.r, w = D.w == null ? 0.5 : D.w;
  const xs = D.v.map((e, i) => P + (W0 - 2 * P) * (w * (e[0] - a) / (b - a) + (1 - w) * (n > 1 ? i / (n - 1) : 0.5)));
  for(let i = 1; i < n; i++) xs[i] = Math.max(xs[i], xs[i - 1] + GAP);
  const W = Math.max(W0, xs[n - 1] + P);
  // år → x, lineært mellom hendelsene (og endepunktene av intervallet)
  const pts = [[a, 10], ...D.v.map((e, i) => [e[0], xs[i]]), [b, W - 10]].filter((p, i, arr) => i === 0 || p[0] > arr[i - 1][0]);
  const X = y => { if(y <= pts[0][0]) return pts[0][1]; for(let i = 1; i < pts.length; i++) if(y <= pts[i][0]){ const [y0, x0] = pts[i - 1], [y1, x1] = pts[i]; return x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return pts[pts.length - 1][1]; };
  return { xs, W, X };
}
const tlSeen = name => ((S.tlSeen ||= {})[name] ||= []);
const TL_H = 206;
function tlSvg(name, act){
  const D = TIMELINES[name], { xs, W, X } = tlLayout(D), seen = tlSeen(name), AX = 96;
  let s = "", bands = "";
  // aksen fargelegges etter epokene i felt 0; epokenavnene står i bånd nederst
  D.e.forEach((e, k) => { const x0 = X(e[0]), x1 = X(e[1]), ln = e[4] | 0, y = ln ? 188 : 166, h = ln ? 16 : 20, lab = T(e[2], e[3]), c = k % 5 + 1;
    if(!ln) s += `<line class="tl-seg tl-s${c}" x1="${(x0 + 2).toFixed(1)}" y1="${AX}" x2="${(x1 - 2).toFixed(1)}" y2="${AX}"/>`;
    bands += `<rect class="tl-era tl-c${c}" x="${(x0 + 1).toFixed(1)}" y="${y}" width="${Math.max(2, x1 - x0 - 2).toFixed(1)}" height="${h}" rx="${h / 2}"/>`;
    if(x1 - x0 > lab.length * 6 + 12) bands += `<text class="tl-eral tl-c${c}t" x="${((x0 + x1) / 2).toFixed(1)}" y="${y + h / 2 + 3.8}" text-anchor="middle">${esc(lab)}</text>`; });
  s = `<line class="tl-ax" x1="4" y1="${AX}" x2="${W - 4}" y2="${AX}"/>` + s + bands;
  D.v.forEach((e, i) => { const x = xs[i].toFixed(1), up = i % 2 === 0, on = i === act, lab = T(e[1], e[2]);
    const ty = up ? 24 : 144, ly = up ? [46, AX - 9] : [AX + 9, 128];
    s += `<g class="tl-ev${on ? " on" : ""}${seen.includes(i) ? " seen" : ""}" data-tli="${i}" tabindex="0" role="button" aria-label="${esc(tlYear(e[0], e[5]) + ": " + lab)}" style="--d:${i * 40}ms">
      <rect x="${(xs[i] - 33).toFixed(1)}" y="${up ? 6 : AX - 8}" width="66" height="${up ? AX + 2 : 160 - AX}" fill="transparent"/>
      <line class="tl-lead" x1="${x}" y1="${ly[0]}" x2="${x}" y2="${ly[1]}"/>
      <text class="tl-yr" x="${x}" y="${ty}" text-anchor="middle">${esc(tlYear(e[0], e[5]))}</text>
      <text class="tl-lab" x="${x}" y="${ty + 15}" text-anchor="middle">${esc(lab)}</text>
      ${on ? `<circle class="tl-ring" cx="${x}" cy="${AX}" r="11"/>` : ""}<circle class="tl-dot" cx="${x}" cy="${AX}" r="${on ? 7.5 : 5.5}"/></g>`; });
  return { svg: s, W };
}
function tlCardHTML(name, i){
  const D = TIMELINES[name], e = D.v[i], n = D.v.length, seen = tlSeen(name).length;
  return `<div class="tl-card" data-k="${i}"><div class="tl-cy">${esc(tlYear(e[0], e[5]))}</div><b>${esc(T(e[1], e[2]))}</b><p>${esc(T(e[3], e[4]))}</p>
    <div class="tl-nav"><button class="tl-nb" data-tlgo="-1" ${i ? "" : "disabled"} aria-label="${esc(T("Forrige", "Previous"))}">‹</button>
    <span class="tl-prog"><span style="width:${Math.round(100 * seen / n)}%"></span></span><small>${seen === n ? "✓ " : ""}${seen}/${n} ${esc(T("utforsket", "explored"))}</small>
    <button class="tl-nb" data-tlgo="1" ${i < n - 1 ? "" : "disabled"} aria-label="${esc(T("Neste", "Next"))}">›</button></div></div>`;
}
function tlHTML(name){
  const D = TIMELINES[name]; if(!D) return "";
  return `<div class="tl fig" data-tl="${name}"><div class="sim-h"><span class="sim-tag">${I.bolt}${esc(T("Tidslinje", "Timeline"))}</span><b>${esc(T(D.t[0], D.t[1]))}</b></div>
    <div class="tl-tabs" role="tablist"><button class="on" data-tlmode="x" role="tab">${esc(T("Utforsk", "Explore"))}</button><button data-tlmode="s" role="tab">${esc(T("Sett i rekkefølge", "Put in order"))}</button></div>
    <div class="tl-body">${tlExploreHTML(name, 0, tlSeen(name).includes(0) || tlSeen(name).push(0))}</div></div>`;
}
function tlExploreHTML(name, i){
  const { svg, W } = tlSvg(name, i), D = TIMELINES[name];
  return `<p class="sim-note">${esc(T("Trykk på en hendelse, eller bla med pilene. Fargefeltene viser epokene.", "Tap an event, or step with the arrows. The coloured bands show the eras."))}${D.w < 0.5 ? " " + esc(T("Avstandene er ikke i skala.", "Distances are not to scale.")) : ""}</p>
    <div class="tl-scroll"><svg class="tl-svg" width="${W.toFixed(0)}" height="${TL_H}" viewBox="0 0 ${W.toFixed(0)} ${TL_H}" style="width:${W.toFixed(0)}px;height:${TL_H}px;max-width:none" role="group" aria-label="${esc(T(D.t[0], D.t[1]))}">${svg}</svg></div>${tlCardHTML(name, i)}`;
}
function tlShow(el, i, scroll){
  const name = el.dataset.tl, D = TIMELINES[name]; i = Math.max(0, Math.min(D.v.length - 1, i));
  const seen = tlSeen(name), first = !seen.includes(i);
  if(first){ seen.push(i); if(seen.length === D.v.length){ const st = awardXP(TL_XP); S.stats ||= {}; S.stats.timelines = (+S.stats.timelines || 0) + 1; sfx("complete"); setTimeout(() => toast(T("Hele tidslinjen er utforsket! +", "Whole timeline explored! +") + TL_XP + " XP"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900); } save(); }
  const sc = el.querySelector(".tl-scroll"), left = sc ? sc.scrollLeft : 0;
  el.querySelector(".tl-body").innerHTML = tlExploreHTML(name, i);
  const sc2 = el.querySelector(".tl-scroll"); sc2.scrollLeft = left;
  if(scroll){ const x = tlLayout(D).xs[i]; sc2.scrollTo({ left: Math.max(0, x - sc2.clientWidth / 2), behavior: "smooth" }); }
}
// ---------- Sett i rekkefølge ----------
const TL_N = 5;
function tlRound(name){
  const D = TIMELINES[name], pool = shuffle(D.v.map((_, i) => i)), pick = [];
  for(const i of pool){ if(pick.length >= TL_N) break; if(!pick.some(j => D.v[j][0] === D.v[i][0])) pick.push(i); }
  let order = shuffle(pick); for(let k = 0; k < 5 && order.every((v, j) => j === 0 || D.v[order[j - 1]][0] < D.v[v][0]); k++) order = shuffle(pick);
  return { order, sel: -1, ok: [], tries: 0, done: false };
}
const tlGame = new WeakMap();
function tlSortHTML(name, G){
  const D = TIMELINES[name];
  return `<p class="sim-note">${esc(T("Hva skjedde først? Trykk på to kort for å bytte dem, eller bruk pilene. Eldst øverst.", "What happened first? Tap two cards to swap them, or use the arrows. Oldest at the top."))}</p>
    <ol class="tl-sort${G.done ? " done" : ""}">${G.order.map((i, j) => { const e = D.v[i], st = G.ok[j];
      return `<li class="tl-it${G.sel === j ? " sel" : ""}${st === true ? " ok" : st === false ? " bad" : ""}" data-tlpick="${j}"><span class="tl-n">${j + 1}</span>
        <span class="tl-it-t"><b>${esc(T(e[1], e[2]))}</b>${st === true ? `<small>${esc(tlYear(e[0], e[5]))}</small>` : ""}</span>
        <span class="tl-mv"><button data-tlmv="-1" data-j="${j}" ${j ? "" : "disabled"} aria-label="${esc(T("Opp", "Up"))}">▲</button><button data-tlmv="1" data-j="${j}" ${j < G.order.length - 1 ? "" : "disabled"} aria-label="${esc(T("Ned", "Down"))}">▼</button></span></li>`; }).join("")}</ol>
    <div class="tl-act">${G.done ? `<span class="tl-win">${esc(G.tries === 1 ? T("Perfekt på første forsøk!", "Perfect on the first try!") : T(`Riktig etter ${G.tries} forsøk!`, `Correct after ${G.tries} tries!`))}</span><button class="tl-btn" data-tlnew="1">${esc(T("Ny runde", "New round"))}</button>`
      : `<button class="tl-btn" data-tlcheck="1">${esc(T("Sjekk rekkefølgen", "Check the order"))}</button>${G.tries ? `<small>${G.ok.filter(Boolean).length}/${G.order.length} ${esc(T("på riktig plass", "in the right place"))}</small>` : ""}`}</div>`;
}
function tlSortRender(el){ el.querySelector(".tl-body").innerHTML = tlSortHTML(el.dataset.tl, tlGame.get(el)); }
function tlSwap(el, a, b){ const G = tlGame.get(el); if(G.done || b < 0 || b >= G.order.length) return; [G.order[a], G.order[b]] = [G.order[b], G.order[a]]; G.sel = -1; G.ok = []; tlSortRender(el);
  const li = el.querySelectorAll(".tl-it"); [a, b].forEach(k => li[k] && li[k].classList.add("moved")); }
function tlCheck(el){
  const name = el.dataset.tl, D = TIMELINES[name], G = tlGame.get(el), sorted = G.order.slice().sort((x, y) => D.v[x][0] - D.v[y][0]);
  G.tries++; G.ok = G.order.map((v, j) => v === sorted[j]); G.sel = -1;
  if(G.ok.every(Boolean)){ G.done = true; S.stats ||= {}; S.stats.tlSorts = (+S.stats.tlSorts || 0) + 1; const st = awardXP(TL_XP); save(); buzz(true); sfx("complete");
    tlSortRender(el); setTimeout(() => burst(el.querySelector(".tl-win")), 60); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); return; }
  buzz(false); tlSortRender(el);
}
document.addEventListener("click", e => {
  const el = e.target.closest && e.target.closest(".tl"); if(!el) return;
  const b = e.target.closest("[data-tlmode],[data-tlgo],[data-tli],[data-tlmv],[data-tlpick],[data-tlcheck],[data-tlnew]"); if(!b) return;
  e.stopPropagation(); const name = el.dataset.tl;
  if(b.dataset.tlmode){ el.querySelectorAll("[data-tlmode]").forEach(x => x.classList.toggle("on", x === b));
    if(b.dataset.tlmode === "s"){ if(!tlGame.get(el) || tlGame.get(el).done) tlGame.set(el, tlRound(name)); tlSortRender(el); } else tlShow(el, 0, true); return; }
  if(b.dataset.tlgo){ const k = +el.querySelector(".tl-card").dataset.k + +b.dataset.tlgo; tlShow(el, k, true); return; }
  if(b.dataset.tli){ tlShow(el, +b.dataset.tli, false); return; }
  if(b.dataset.tlmv){ const j = +b.dataset.j; tlSwap(el, j, j + +b.dataset.tlmv); return; }
  if(b.dataset.tlcheck){ tlCheck(el); return; }
  if(b.dataset.tlnew){ tlGame.set(el, tlRound(name)); tlSortRender(el); return; }
  if(b.dataset.tlpick){ const G = tlGame.get(el), j = +b.dataset.tlpick; if(G.done) return;
    if(G.sel < 0){ G.sel = j; tlSortRender(el); } else if(G.sel === j){ G.sel = -1; tlSortRender(el); } else tlSwap(el, G.sel, j); }
});
document.addEventListener("keydown", e => { if(e.key !== "Enter" && e.key !== " ") return; const g = e.target.closest && e.target.closest(".tl-ev"); if(!g) return; e.preventDefault(); g.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
