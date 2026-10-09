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
// ---------- Årsak → virkning (fanen «Årsak») ----------
const tlC = (name, c) => { TIMELINES[name].c = c; };
tlC("his_epoker", [["Skriften blir tatt i bruk", "Writing comes into use", "Lover, handel og historie kan skrives ned", "Laws, trade and history can be written down"],
  ["Boktrykkerkunsten gjør bøker billige", "Printing makes books cheap", "Luthers ideer sprer seg raskt over Europa", "Luther's ideas spread quickly across Europe"],
  ["Columbus når Amerika", "Columbus reaches the Americas", "Kolonisering og varebytte mellom kontinentene", "Colonisation and exchange between continents"],
  ["Opplysningstidens ideer om frihet og likhet", "Enlightenment ideas of liberty and equality", "Revolusjoner i USA og Frankrike", "Revolutions in the US and France"],
  ["Andre verdenskrig etterlater Europa i ruiner", "WWII leaves Europe in ruins", "FN blir grunnlagt for å sikre freden", "The UN is founded to keep the peace"]]);
tlC("his_viking", [["Olav faller på Stiklestad og blir regnet som helgen", "Olaf falls at Stiklestad and is seen as a saint", "Kristendommen får fotfeste i Norge", "Christianity takes hold in Norway"],
  ["Kongen vil ha én lov for hele riket", "The king wants one law for the whole realm", "Landsloven til Magnus Lagabøte (1274)", "Magnus the Law-mender's code (1274)"],
  ["Svartedauden dreper kanskje halvparten", "The Black Death kills perhaps half", "Gårder legges øde, og skatteinntektene faller", "Farms are abandoned and tax income falls"],
  ["Kongeslektene i Norden giftes inn i hverandre", "The Nordic royal families intermarry", "Kalmarunionen samler Norden under én monark", "The Kalmar Union unites the North under one monarch"],
  ["Gode skip og jakt på rikdom og land", "Good ships and a hunt for wealth and land", "Vikingtokt til England, Frankrike og lenger", "Viking raids on England, France and beyond"]]);
tlC("his_reform", [["Luther kritiserer avlatshandelen", "Luther criticises indulgences", "Kirken splittes i katolikker og protestanter", "The Church splits into Catholics and Protestants"],
  ["Kongen vil ha kirkens rikdom og makt", "The king wants the Church's wealth and power", "Reformasjonen innføres i Danmark-Norge", "The Reformation comes to Denmark-Norway"],
  ["Kopernikus og Newton bruker observasjon og matematikk", "Copernicus and Newton use observation and maths", "Tro på fornuft og vitenskap i opplysningstiden", "Faith in reason and science in the Enlightenment"],
  ["Opplysningsfilosofer kritiserer eneveldet", "Enlightenment thinkers criticise absolutism", "Krav om folkesuverenitet og maktfordeling", "Demands for popular sovereignty and separation of powers"],
  ["Statsgjeld og dyrt brød i Frankrike", "State debt and expensive bread in France", "Den franske revolusjonen bryter ut", "The French Revolution breaks out"],
  ["Watts dampmaskin", "Watt's steam engine", "Fabrikker og den industrielle revolusjonen", "Factories and the Industrial Revolution"]]);
tlC("his_norge", [["Danmark taper på Napoleons side", "Denmark loses on Napoleon's side", "Kieltraktaten: Norge avstås til Sverige", "Treaty of Kiel: Norway is ceded to Sweden"],
  ["Nordmenn vil bestemme selv i 1814", "Norwegians want to rule themselves in 1814", "Riksforsamlingen lager Grunnloven", "The assembly writes the Constitution"],
  ["Fattigdom og mangel på jord", "Poverty and lack of land", "Masseutvandring til Amerika", "Mass emigration to America"],
  ["Striden om kongens veto og riksretten", "The dispute over the royal veto and the impeachment", "Parlamentarismen innføres i 1884", "Parliamentarism is introduced in 1884"],
  ["Uenighet om et eget norsk konsulatvesen", "Disagreement over a Norwegian consular service", "Unionen med Sverige oppløses i 1905", "The union with Sweden is dissolved in 1905"],
  ["Kvinnesaksbevegelsens kamp", "The women's rights movement", "Kvinner får stemmerett i 1913", "Women get the vote in 1913"]]);
tlC("his_krig", [["Skuddene i Sarajevo og alliansesystemet", "Sarajevo and the alliance system", "Europa trekkes inn i en storkrig", "Europe is pulled into a great war"],
  ["En hard fredsavtale i Versailles", "A harsh peace treaty at Versailles", "Bitterhet i Tyskland som Hitler utnytter", "Bitterness in Germany that Hitler exploits"],
  ["Børskrakket i 1929", "The 1929 crash", "Massearbeidsløshet og økonomisk krise", "Mass unemployment and economic crisis"],
  ["Tyskland angriper Polen", "Germany invades Poland", "Storbritannia og Frankrike erklærer krig", "Britain and France declare war"],
  ["Tyskland vil sikre malmtransport og kysten", "Germany wants to secure iron ore and the coast", "Angrepet på Norge 9. april 1940", "The invasion of Norway on 9 April 1940"],
  ["Nederlaget ved Stalingrad", "The defeat at Stalingrad", "Tyskland må trekke seg tilbake i øst", "Germany has to retreat in the east"]]);
tlC("his_kald", [["Europa ligger i ruiner etter krigen", "Europe lies in ruins after the war", "USA starter Marshallplanen", "The US launches the Marshall Plan"],
  ["Frykt for Sovjetunionen", "Fear of the Soviet Union", "Norge går inn i NATO i 1949", "Norway joins NATO in 1949"],
  ["Folk flykter fra Øst- til Vest-Berlin", "People flee from East to West Berlin", "Berlinmuren blir bygd i 1961", "The Berlin Wall is built in 1961"],
  ["Sovjetiske atomraketter på Cuba", "Soviet nuclear missiles in Cuba", "Verden står på randen av atomkrig", "The world is on the brink of nuclear war"],
  ["Oljefunnet på Ekofisk", "The Ekofisk oil find", "Norge blir et av verdens rikeste land", "Norway becomes one of the world's richest countries"],
  ["Reformer og folkelige protester i Øst-Europa", "Reforms and popular protests in Eastern Europe", "Berlinmuren faller i 1989", "The Berlin Wall falls in 1989"]]);
tlC("his_samer", [["Fornorskingspolitikken", "The Norwegianisation policy", "Mange samer slutter å bruke samisk", "Many Sami stop using their language"],
  ["Planene om å demme opp Altaelva", "Plans to dam the Alta river", "Demonstrasjoner og sultestreik", "Protests and hunger strikes"],
  ["Alta-saken setter samiske rettigheter på dagsorden", "The Alta case puts Sami rights on the agenda", "Sameloven og Sametinget", "The Sami Act and the Sami Parliament"],
  ["Erkjennelse av statens urett", "Recognition of the state's injustice", "Kongens unnskyldning i 1997", "The King's apology in 1997"],
  ["Europarådets rammekonvensjon", "The Council of Europe framework convention", "Fem grupper blir nasjonale minoriteter", "Five groups become national minorities"]]);
tlC("rel_tid", [["Muhammed flytter fra Mekka til Medina", "Muhammad moves from Mecca to Medina", "Den islamske kalenderen starter (622)", "The Islamic calendar begins (622)"],
  ["Uenighet mellom Roma og Konstantinopel", "Disagreement between Rome and Constantinople", "Det store skismaet i 1054", "The Great Schism of 1054"],
  ["Luthers kritikk av kirken", "Luther's criticism of the Church", "Protestantiske kirker oppstår", "Protestant churches emerge"],
  ["Dissenterloven i 1845", "The Dissenter Act of 1845", "Frikirker kan dannes i Norge", "Free churches can form in Norway"],
  ["Babylonerne ødelegger tempelet", "The Babylonians destroy the Temple", "Jødedommen samles rundt Toraen", "Judaism gathers around the Torah"]]);

// ---------- Flere fag ----------
Object.assign(TIMELINES, {
  samf_velferd: { t: ["Velferdsstaten bygges", "Building the welfare state"], r: [1885, 2020], w: 0.5,
    e: [[1885, 1935, "Framvekst", "Beginnings"], [1935, 1975, "Velferdsstaten bygges", "The welfare state is built"], [1975, 2020, "Modernisering", "Modernisation"]],
    v: [[1894, "Ulykkesforsikring", "Accident insurance", "Fabrikkarbeidere får trygd ved arbeidsulykker – Norges første sosialforsikring.", "Factory workers get insurance against work accidents – Norway's first social insurance."],
      [1909, "Syketrygd", "Sickness insurance", "Lov om syketrygd for arbeidere med lav inntekt.", "Sickness insurance for low-income workers."],
      [1919, "8 timers dag", "8-hour day", "Åttetimersdagen blir lovfestet.", "The eight-hour working day becomes law."],
      [1935, "Hovedavtalen", "Basic Agreement", "LO og arbeidsgiverne inngår Hovedavtalen – grunnlaget for samarbeid i arbeidslivet.", "Unions and employers sign the Basic Agreement – the basis for cooperation in working life."],
      [1936, "Alderstrygd", "Old-age pension", "Alle eldre får rett til pensjon fra staten.", "All elderly people get a state pension."],
      [1938, "Arbeidsløshetstrygd", "Unemployment benefit", "Trygd ved arbeidsløshet innføres.", "Unemployment insurance is introduced."],
      [1946, "Barnetrygd", "Child benefit", "Familier får støtte for hvert barn.", "Families get support for each child."],
      [1956, "Syketrygd for alle", "Sick pay for all", "Syketrygden gjelder nå hele befolkningen.", "Sickness insurance now covers the whole population."],
      [1967, "Folketrygden", "National Insurance", "Folketrygden samler pensjoner og trygder i én ordning for alle.", "National Insurance gathers pensions and benefits into one scheme for everyone."],
      [1977, "Arbeidsmiljøloven", "Working Environment Act", "Arbeidstakere får sterkere vern om helse og sikkerhet.", "Workers get stronger protection of health and safety."],
      [1978, "Likestillingsloven", "Gender Equality Act", "Forbud mot forskjellsbehandling på grunn av kjønn.", "Discrimination based on gender is banned."],
      [1993, "Fedrekvote", "Paternity quota", "En del av foreldrepermisjonen blir satt av til far.", "Part of parental leave is reserved for the father."],
      [2006, "NAV", "NAV", "Trygdeetaten, Aetat og sosialkontorene slås sammen til NAV.", "Social security, employment and welfare offices merge into NAV."],
      [2011, "Pensjonsreformen", "Pension reform", "Pensjonen blir tilpasset at vi lever lenger: fleksibelt uttak fra 62 år.", "Pensions are adjusted to longer lives: flexible retirement from 62."]],
    c: [["Farlig fabrikkarbeid og mange ulykker", "Dangerous factory work and many accidents", "Ulykkesforsikring for arbeidere (1894)", "Accident insurance for workers (1894)"],
      ["Arbeiderbevegelsen krever kortere dager", "The labour movement demands shorter days", "Åttetimersdagen (1919)", "The eight-hour day (1919)"],
      ["Krise og harde konflikter i arbeidslivet", "Crisis and bitter labour conflicts", "Hovedavtalen og samarbeid partene imellom", "The Basic Agreement and cooperation"],
      ["Mange små trygdeordninger", "Many separate benefit schemes", "Folketrygden samler alt i én ordning", "National Insurance gathers them into one"],
      ["Vi lever lenger og blir flere eldre", "We live longer and there are more elderly", "Pensjonsreformen i 2011", "The 2011 pension reform"]] },

  samf_intl: { t: ["Internasjonalt samarbeid etter 1945", "International cooperation since 1945"], r: [1942, 2025], w: 0.55,
    e: [[1945, 1991, "Den kalde krigen", "The Cold War"], [1991, 2025, "Etter den kalde krigen", "After the Cold War"]],
    v: [[1945, "FN", "The UN", "FN blir grunnlagt for å hindre ny verdenskrig. Norge er med fra starten.", "The UN is founded to prevent another world war. Norway is a founding member."],
      [1948, "Menneskerettigheter", "Human rights", "FN vedtar Verdenserklæringen om menneskerettighetene.", "The UN adopts the Universal Declaration of Human Rights."],
      [1949, "NATO", "NATO", "Forsvarsalliansen NATO blir grunnlagt: et angrep på én er et angrep på alle.", "NATO is founded: an attack on one is an attack on all."],
      [1951, "Kull og stål", "Coal and Steel", "Seks land danner Kull- og stålunionen – starten på det som blir EU.", "Six countries form the Coal and Steel Community – the start of what becomes the EU."],
      [1960, "EFTA", "EFTA", "Norge er med og stifter frihandelsorganisasjonen EFTA.", "Norway co-founds the free trade association EFTA."],
      [1972, "Nei til EF", "No to the EC", "53,5 % stemmer nei til medlemskap i EF.", "53.5% vote against joining the EC."],
      [1992, "Maastricht", "Maastricht", "Maastricht-traktaten gjør EF til EU med felles mynt som mål.", "The Maastricht Treaty turns the EC into the EU, aiming for a common currency."],
      [1994, "EØS", "EEA", "EØS-avtalen trer i kraft. Samme år sier nordmenn nei til EU for andre gang.", "The EEA Agreement takes effect. The same year Norwegians reject the EU a second time."],
      [2001, "11. september", "11 September", "Terrorangrep i USA. NATO bruker artikkel 5 for første gang.", "Terror attacks in the US. NATO invokes Article 5 for the first time."],
      [2002, "Euroen", "The euro", "Eurosedler og -mynter tas i bruk i tolv EU-land.", "Euro notes and coins come into use in twelve EU countries."],
      [2015, "Parisavtalen", "Paris Agreement", "Nesten alle land forplikter seg til å begrense den globale oppvarmingen.", "Almost every country commits to limiting global warming."],
      [2016, "Brexit", "Brexit", "Et flertall i Storbritannia stemmer for å forlate EU.", "A majority in the UK votes to leave the EU."],
      [2022, "Ukraina", "Ukraine", "Russland starter en fullskala invasjon av Ukraina.", "Russia launches a full-scale invasion of Ukraine."]],
    c: [["Andre verdenskrig", "The Second World War", "FN blir grunnlagt", "The UN is founded"],
      ["Frykt for Sovjetunionen", "Fear of the Soviet Union", "NATO blir grunnlagt", "NATO is founded"],
      ["Ønske om å binde Frankrike og Tyskland sammen", "A wish to bind France and Germany together", "Kull- og stålunionen", "The Coal and Steel Community"],
      ["Nei til EU i 1994", "No to the EU in 1994", "Norge knyttes til EU gjennom EØS", "Norway is tied to the EU through the EEA"],
      ["Terrorangrepet 11. september", "The 9/11 attacks", "Krigen i Afghanistan", "The war in Afghanistan"],
      ["Russlands invasjon av Ukraina", "Russia's invasion of Ukraine", "Finland og Sverige blir med i NATO", "Finland and Sweden join NATO"]] },

  sci_hist: { t: ["Store gjennombrudd i naturvitenskapen", "Great breakthroughs in science"], r: [-400, 2025], w: 0.25,
    e: [[-400, 1543, "Antikken og middelalderen", "Antiquity and Middle Ages"], [1543, 1700, "Vitenskapelig revolusjon", "Scientific Revolution"], [1700, 1900, "Klassisk naturvitenskap", "Classical science"], [1900, 2025, "Moderne naturvitenskap", "Modern science"]],
    v: [[-350, "Aristoteles", "Aristotle", "Aristoteles beskriver naturen systematisk, men mener jorda står stille i sentrum.", "Aristotle describes nature systematically, but thinks the Earth stands still at the centre.", 1],
      [1543, "Kopernikus", "Copernicus", "Kopernikus plasserer sola i sentrum av planetsystemet.", "Copernicus puts the Sun at the centre of the planetary system."],
      [1610, "Galileis teleskop", "Galileo's telescope", "Galilei ser månene til Jupiter – ikke alt går rundt jorda.", "Galileo sees Jupiter's moons – not everything orbits the Earth."],
      [1687, "Newton", "Newton", "Newton forklarer bevegelse og tyngdekraft med de samme lovene på jorda og i rommet.", "Newton explains motion and gravity with the same laws on Earth and in space."],
      [1789, "Lavoisier", "Lavoisier", "Lavoisier viser at massen er bevart i kjemiske reaksjoner.", "Lavoisier shows that mass is conserved in chemical reactions."],
      [1859, "Darwin", "Darwin", "Darwin gir ut «Artenes opprinnelse» om evolusjon ved naturlig utvalg.", "Darwin publishes On the Origin of Species about evolution by natural selection."],
      [1865, "Mendel", "Mendel", "Mendel finner arvelovene ved å krysse erteplanter.", "Mendel discovers the laws of inheritance by crossing pea plants."],
      [1869, "Periodesystemet", "Periodic table", "Mendelejev ordner grunnstoffene og forutsier stoffer som ikke var funnet ennå.", "Mendeleev arranges the elements and predicts ones not yet found."],
      [1895, "Røntgenstråler", "X-rays", "Røntgen oppdager stråler som går gjennom kroppen.", "Röntgen discovers rays that pass through the body."],
      [1905, "Einstein", "Einstein", "Einstein legger fram relativitetsteorien og E = mc².", "Einstein presents relativity and E = mc²."],
      [1928, "Penicillin", "Penicillin", "Fleming oppdager at en muggsopp dreper bakterier.", "Fleming discovers that a mould kills bacteria."],
      [1953, "DNA", "DNA", "Watson og Crick, med data fra Rosalind Franklin, finner DNA-ets dobbeltspiral.", "Watson and Crick, using Rosalind Franklin's data, find the DNA double helix."],
      [1969, "Månelandingen", "Moon landing", "Mennesker går på månen for første gang.", "Humans walk on the Moon for the first time."],
      [2003, "Genomet kartlagt", "Genome mapped", "Hele menneskets arvestoff er kartlagt.", "The entire human genome is mapped."],
      [2012, "Higgs-partikkelen", "Higgs boson", "CERN finner Higgs-partikkelen, som var forutsagt i 1964.", "CERN finds the Higgs boson, predicted in 1964."]],
    c: [["Galilei ser Jupiters måner", "Galileo sees Jupiter's moons", "Støtte til at jorda ikke er sentrum", "Support for the Earth not being the centre"],
      ["Darwin studerer fugler og fossiler", "Darwin studies birds and fossils", "Evolusjonsteorien", "The theory of evolution"],
      ["Fleming ser mugg drepe bakterier", "Fleming sees mould kill bacteria", "Antibiotika redder millioner av liv", "Antibiotics save millions of lives"],
      ["Røntgenstrålene oppdages", "X-rays are discovered", "Leger kan se inn i kroppen uten å operere", "Doctors can see inside the body without surgery"],
      ["DNA-strukturen blir funnet", "The structure of DNA is found", "Genteknologi og gentester", "Gene technology and genetic tests"]] },

  bio_jord: { t: ["Livets historie på jorda", "The history of life on Earth"], r: [-4.7e9, 0], w: 0.12,
    e: [[-4.7e9, -541e6, "Prekambrium", "Precambrian"], [-541e6, -252e6, "Paleozoikum", "Paleozoic"], [-252e6, -66e6, "Mesozoikum (dinosaurene)", "Mesozoic (dinosaurs)"], [-66e6, 0, "Kenozoikum", "Cenozoic"]],
    v: [[-4.6e9, "Jorda dannes", "Earth forms", "Jorda dannes av støv og stein rundt den unge sola.", "Earth forms from dust and rock around the young Sun."],
      [-3.8e9, "Første liv", "First life", "De første encellede organismene oppstår i havet.", "The first single-celled organisms appear in the sea.", 1],
      [-2.4e9, "Oksygen i lufta", "Oxygen in the air", "Cyanobakterier har laget så mye oksygen ved fotosyntese at det hoper seg opp i atmosfæren.", "Cyanobacteria have made so much oxygen by photosynthesis that it builds up in the atmosphere.", 1],
      [-541e6, "Kambrisk eksplosjon", "Cambrian explosion", "Mange dyregrupper med skall og skjelett dukker opp på kort tid.", "Many animal groups with shells and skeletons appear in a short time."],
      [-375e6, "Fisk på land", "Fish on land", "Fisker med kraftige finner tar de første stegene mot livet på land.", "Fish with strong fins take the first steps towards life on land.", 1],
      [-252e6, "Masseutryddelse", "Mass extinction", "Den største masseutryddelsen: rundt 90 % av artene i havet forsvinner.", "The largest mass extinction: about 90% of marine species vanish."],
      [-230e6, "Dinosaurene", "Dinosaurs", "De første dinosaurene dukker opp.", "The first dinosaurs appear.", 1],
      [-66e6, "Asteroiden", "The asteroid", "En asteroide treffer Mexico, og dinosaurene (unntatt fuglene) dør ut.", "An asteroid hits Mexico, and the dinosaurs (except birds) die out."],
      [-6e6, "Menneske og sjimpanse", "Humans and chimps", "Linjene som fører til mennesker og sjimpanser skilles.", "The lines leading to humans and chimpanzees split.", 1],
      [-300e3, "Homo sapiens", "Homo sapiens", "Moderne mennesker oppstår i Afrika.", "Modern humans appear in Africa.", 1],
      [-12e3, "Jordbruket", "Farming", "Mennesker begynner å dyrke jorda og holde husdyr.", "Humans begin farming and keeping livestock.", 1]],
    c: [["Cyanobakterier driver fotosyntese", "Cyanobacteria carry out photosynthesis", "Oksygen hoper seg opp i atmosfæren", "Oxygen builds up in the atmosphere"],
      ["Asteroiden treffer jorda", "The asteroid hits Earth", "Dinosaurene dør ut", "The dinosaurs die out"],
      ["Dinosaurene forsvinner", "The dinosaurs disappear", "Pattedyrene sprer seg og blir store", "Mammals spread and grow large"],
      ["Ozonlaget beskytter mot UV-stråling", "The ozone layer blocks UV radiation", "Livet kan flytte opp på land", "Life can move onto land"],
      ["Jordbruket gir matoverskudd", "Farming gives a food surplus", "Byer og sivilisasjoner vokser fram", "Cities and civilisations grow"]] }
});
Object.assign(TIMELINES, {
  nor_lit: { t: ["Norsk litteraturhistorie", "Norwegian literary history"], r: [1150, 2030], w: 0.35,
    e: [[1150, 1350, "Norrøn tid", "Old Norse"], [1350, 1814, "Dansketiden", "Danish period"], [1814, 1870, "Romantikken", "Romanticism"], [1870, 1890, "Realisme", "Realism"], [1890, 1914, "Nyromantikk", "Neo-romanticism"], [1914, 1990, "Modernisme", "Modernism"], [1990, 2030, "Samtid", "Contemporary"]],
    v: [[1230, "Heimskringla", "Heimskringla", "Snorre Sturlason skriver kongesagaene på Island.", "Snorri Sturluson writes the kings' sagas in Iceland.", 1],
      [1700, "Nordlands Trompet", "Trumpet of Nordland", "Petter Dass skildrer folk og natur i Nord-Norge i barokk diktform.", "Petter Dass depicts the people and nature of northern Norway in Baroque verse.", 1],
      [1722, "Jeppe på Bjerget", "Jeppe on the Hill", "Holbergs komedie latterliggjør dumskap og overmot – typisk opplysningstid.", "Holberg's comedy mocks folly and arrogance – typical Enlightenment.", 0],
      [1830, "Wergeland", "Wergeland", "Henrik Wergeland gir ut det store diktverket «Skabelsen, Mennesket og Messias».", "Henrik Wergeland publishes the great poem 'Creation, Man and Messiah'."],
      [1841, "Folkeeventyr", "Folk tales", "Asbjørnsen og Moe begynner å gi ut «Norske Folkeeventyr».", "Asbjørnsen and Moe start publishing 'Norwegian Folk Tales'."],
      [1854, "Amtmandens Døttre", "The District Governor's Daughters", "Camilla Collett kritiserer hvordan unge kvinner giftes bort – den første norske samfunnskritiske romanen.", "Camilla Collett criticises how young women are married off – the first Norwegian social-critical novel."],
      [1879, "Et dukkehjem", "A Doll's House", "Ibsens drama om Nora vekker debatt over hele Europa.", "Ibsen's drama about Nora sparks debate across Europe."],
      [1885, "Constance Ring", "Constance Ring", "Amalie Skrams naturalistiske roman om ekteskap og seksualitet.", "Amalie Skram's naturalist novel about marriage and sexuality."],
      [1890, "Sult", "Hunger", "Hamsuns roman skildrer sinnet til en sulten forfatter – starten på nyromantikken.", "Hamsun's novel portrays the mind of a starving writer – the start of neo-romanticism."],
      [1903, "Bjørnson Nobel", "Bjørnson Nobel", "Bjørnstjerne Bjørnson blir første nordmann med Nobelprisen i litteratur.", "Bjørnstjerne Bjørnson becomes the first Norwegian Nobel laureate in literature."],
      [1928, "Undset Nobel", "Undset Nobel", "Sigrid Undset får Nobelprisen, blant annet for «Kristin Lavransdatter».", "Sigrid Undset wins the Nobel Prize, partly for 'Kristin Lavransdatter'."],
      [1963, "Is-slottet", "The Ice Palace", "Tarjei Vesaas skriver en modernistisk og symboltung roman om to jenter.", "Tarjei Vesaas writes a modernist, symbol-laden novel about two girls."],
      [1966, "Profil", "Profil", "Unge forfattere i tidsskriftet Profil gjør opprør mot den tradisjonelle modernismen.", "Young writers in the magazine Profil rebel against traditional modernism."],
      [2009, "Min kamp", "My Struggle", "Karl Ove Knausgårds selvbiografiske romanserie blir et fenomen.", "Karl Ove Knausgård's autobiographical series becomes a phenomenon."],
      [2023, "Fosse Nobel", "Fosse Nobel", "Jon Fosse får Nobelprisen i litteratur for sin nynorske dramatikk og prosa.", "Jon Fosse wins the Nobel Prize for his Nynorsk drama and prose."]],
    c: [["Opplysningstidens tro på fornuften", "Enlightenment faith in reason", "Holbergs komedier latterliggjør dumskap", "Holberg's comedies mock folly"],
      ["Nasjonsbyggingen etter 1814", "Nation-building after 1814", "Eventyr og folkeviser blir samlet inn", "Folk tales and ballads are collected"],
      ["Industrialisering og nye samfunnsproblemer", "Industrialisation and new social problems", "Realistene setter problemer under debatt", "The realists put problems up for debate"],
      ["Darwin og naturvitenskapen", "Darwin and natural science", "Naturalismen ser mennesket som styrt av arv og miljø", "Naturalism sees people as governed by heredity and environment"],
      ["Lei av samfunnsdebatt i litteraturen", "Tired of social debate in literature", "Nyromantikken skildrer sjelelivet", "Neo-romanticism depicts the inner life"]] },
  nor_sprak: { t: ["Norsk språkhistorie", "Norwegian language history"], r: [150, 2030], w: 0.35,
    e: [[150, 1350, "Runer og norrønt", "Runes and Old Norse"], [1350, 1814, "Dansk skriftspråk", "Danish writing"], [1814, 1938, "To skriftspråk vokser fram", "Two standards emerge"], [1938, 2002, "Samnorsk-perioden", "The Samnorsk era"], [2002, 2030, "I dag", "Today"]],
    v: [[200, "Runer", "Runes", "De eldste runeinnskriftene i Norden, skrevet med den eldre runerekken.", "The oldest runic inscriptions in the Nordic region, in the elder futhark.", 1],
      [1030, "Latinske bokstaver", "Latin letters", "Med kristendommen kommer det latinske alfabetet og skriving på pergament.", "Christianity brings the Latin alphabet and writing on parchment.", 1],
      [1350, "Norrønt forfaller", "Old Norse declines", "Etter svartedauden og i unionene tar dansk og svensk over som skriftspråk.", "After the Black Death and in the unions, Danish and Swedish take over as written languages.", 1],
      [1550, "Bibel på dansk", "Danish Bible", "Christian 3.s bibel blir den danske normen for skriftspråket i Danmark-Norge.", "Christian III's Bible sets the Danish written norm in Denmark-Norway."],
      [1814, "Selvstendighet", "Independence", "Spørsmålet melder seg: hvordan skal et norsk skriftspråk se ut?", "The question arises: what should a Norwegian written language look like?"],
      [1848, "Ivar Aasen", "Ivar Aasen", "Aasen gir ut grammatikken over norske dialekter – grunnlaget for landsmålet.", "Aasen publishes his grammar of Norwegian dialects – the basis of Landsmål."],
      [1856, "Knud Knudsen", "Knud Knudsen", "Knudsen vil fornorske dansken gradvis – grunnlaget for riksmålet.", "Knudsen wants to Norwegianise Danish gradually – the basis of Riksmål.", 1],
      [1885, "Likestilling", "Equal status", "Stortinget likestiller landsmålet med det danske skriftspråket.", "The Storting gives Landsmål equal status with the Danish-based language."],
      [1907, "Rettskrivning 1907", "1907 reform", "Riksmålet blir mer norsk, med harde konsonanter som i «gate» og «bok».", "Riksmål becomes more Norwegian, with hard consonants as in 'gate' and 'bok'."],
      [1929, "Bokmål og nynorsk", "Bokmål and Nynorsk", "Riksmål og landsmål får de offisielle navnene bokmål og nynorsk.", "Riksmål and Landsmål get the official names Bokmål and Nynorsk."],
      [1938, "Samnorsk", "Samnorsk", "Rettskrivningen skal føre de to språkene nærmere hverandre.", "The spelling reform aims to bring the two languages closer together."],
      [2002, "Samnorsk oppgis", "Samnorsk dropped", "Stortinget går bort fra målet om å slå sammen bokmål og nynorsk.", "The Storting drops the aim of merging Bokmål and Nynorsk."],
      [2021, "Språklova", "Language Act", "Ny språklov: bokmål og nynorsk er likestilte, og samisk og minoritetsspråk er vernet.", "New Language Act: Bokmål and Nynorsk are equal, and Sami and minority languages are protected."]],
    c: [["Svartedauden og unionen med Danmark", "The Black Death and the union with Denmark", "Dansk blir skriftspråket i Norge", "Danish becomes Norway's written language"],
      ["Selvstendigheten i 1814", "Independence in 1814", "Krav om et eget norsk skriftspråk", "Demands for a Norwegian written language"],
      ["Aasen samler dialekter", "Aasen collects dialects", "Landsmålet (nynorsk)", "Landsmål (Nynorsk)"],
      ["Knudsen fornorsker dansken", "Knudsen Norwegianises Danish", "Riksmålet (bokmål)", "Riksmål (Bokmål)"],
      ["Ønsket om ett felles språk", "The wish for one common language", "Samnorskreformen i 1938", "The Samnorsk reform of 1938"]] }
});
const TL_UNITS = [["VGHIS", "Historiefaget og kildekritikk", "his_epoker"], ["VGHIS", "Vikingtid og middelalder", "his_viking"], ["VGHIS", "Reformasjon, opplysningstid og revolusjoner", "his_reform"],
  ["VGHIS", "Norge 1814–1905", "his_norge"], ["VGHIS", "Verdenskrigene", "his_krig"], ["VGHIS", "Den kalde krigen og etterkrigstiden", "his_kald"], ["VGHIS", "Samer og nasjonale minoriteter", "his_samer"],
  ["VGREL", "Religion i Norge og verden", "rel_tid"], ["VGSAMF", "Økonomi, arbeidsliv og velferd", "samf_velferd"], ["VGSAMF", "Internasjonal politikk", "samf_intl"],
  ["VGNAT", "Naturvitenskapelig metode", "sci_hist"], ["VGBI1", "Evolusjon", "bio_jord"],
  ["VGNOR", "Litteraturhistorie", "nor_lit"], ["VGNOR", "Språkhistorie og målstrid", "nor_sprak"]];
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
const tlGroup = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, LANG === "en" ? "," : "\u00a0");
const tlYear = (y, ca) => (ca ? T("ca. ", "c. ") : "") + (y <= -1e4 ? tlAgo(-y) : y < 0 ? -y + T(" fvt.", " BCE") : String(y));
// dyp tid: 4,6 mrd. / 541 mill. / 300 000 år siden
function tlAgo(a){
  if(a >= 1e9) return T(nf(a / 1e9, 1) + " mrd. år siden", String(+(a / 1e9).toFixed(1)) + " bn years ago");
  if(a >= 1e6) return T(tlGroup(Math.round(a / 1e6)) + " mill. år siden", tlGroup(Math.round(a / 1e6)) + " m years ago");
  return T(tlGroup(a) + " år siden", tlGroup(a) + " years ago");
}
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
    <div class="tl-tabs" role="tablist"><button class="on" data-tlmode="x" role="tab">${esc(T("Utforsk", "Explore"))}</button><button data-tlmode="s" role="tab">${esc(T("Sorter", "Order"))}</button><button data-tlmode="p" role="tab">${esc(T("Plasser", "Place"))}</button>${D.c ? `<button data-tlmode="c" role="tab">${esc(T("Årsak", "Cause"))}</button>` : ""}</div>
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
  // Oppdater bare markeringen og kortet (ikke tegn hele tidslinjen på nytt), så det er lett å følge med
  const svg = el.querySelector(".tl-svg"), card = el.querySelector(".tl-card");
  if(!svg || !card){ el.querySelector(".tl-body").innerHTML = tlExploreHTML(name, i); }
  else {
    svg.querySelectorAll(".tl-ev").forEach(g => { const k = +g.dataset.tli, on = k === i, dot = g.querySelector(".tl-dot"); let ring = g.querySelector(".tl-ring");
      g.classList.toggle("on", on); g.classList.toggle("seen", seen.includes(k)); dot.setAttribute("r", on ? 7.5 : 5.5);
      if(on && !ring){ ring = document.createElementNS("http://www.w3.org/2000/svg", "circle"); ring.setAttribute("class", "tl-ring"); ["cx", "cy"].forEach(p => ring.setAttribute(p, dot.getAttribute(p))); ring.setAttribute("r", 11); g.insertBefore(ring, dot); }
      else if(!on && ring) ring.remove(); });
    const foc = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.tlgo : null;
    const tmp = document.createElement("div"); tmp.innerHTML = tlCardHTML(name, i);
    card.innerHTML = tmp.firstElementChild.innerHTML; card.dataset.k = i;
    if(foc){ const nb = card.querySelector(`[data-tlgo="${foc}"]`); (nb && !nb.disabled ? nb : card.querySelector(".tl-nb:not([disabled])"))?.focus({ preventScroll: true }); }
  }
  // Tidslinjen følger bare etter når den markerte hendelsen er på vei ut av bildet
  const sc = el.querySelector(".tl-scroll");
  if(sc && scroll){ const x = tlLayout(D).xs[i], l = sc.scrollLeft, w = sc.clientWidth, pad = Math.min(70, w / 4);
    if(x < l + pad || x > l + w - pad) sc.scrollTo({ left: Math.max(0, x < l + pad ? x - pad : x - w + pad), behavior: "smooth" }); }
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
// ---------- Plasser (som kortspillet «Timeline»): ett og ett kort skal inn på riktig sted ----------
const tlPl = new WeakMap(), TL_LIVES = 3;
function tlPlNew(name){
  const D = TIMELINES[name], deck = shuffle(D.v.map((_, i) => i)), first = deck.shift();
  return { line: [first], deck, cur: deck.shift(), lives: TL_LIVES, score: 0, last: null, over: false };
}
function tlPlHTML(name, P){
  const D = TIMELINES[name], best = ((S.tlBest ||= {})[name] | 0);
  const hearts = Array.from({ length: TL_LIVES }, (_, k) => `<span class="tl-heart${k < P.lives ? "" : " lost"}">♥</span>`).join("");
  const gap = k => P.over ? "" : `<button class="tl-gap" data-tlgap="${k}">${esc(T("Plasser her", "Place here"))}</button>`;
  const card = i => { const e = D.v[i], fb = P.last && P.last.i === i ? (P.last.ok ? " ok" : " bad") : "";
    return `<div class="tl-pc${fb}"><span class="tl-pc-y">${esc(tlYear(e[0], e[5]))}</span><b>${esc(T(e[1], e[2]))}</b></div>`; };
  const head = P.over ? `<div class="tl-pover"><b>${esc(P.lives ? T("Alle kortene er plassert!", "All cards placed!") : T("Tom for liv", "Out of lives"))}</b>
      <span>${esc(T(`${P.score} riktige`, `${P.score} correct`))}${P.score >= best && P.score ? " · " + esc(T("ny rekord!", "new record!")) : best ? " · " + esc(T("rekord: ", "best: ")) + best : ""}</span>
      <button class="tl-btn" data-tlpnew="1">${esc(T("Spill igjen", "Play again"))}</button></div>`
    : `<div class="tl-pnew"><small>${esc(T("Hvor hører dette hjemme?", "Where does this belong?"))}</small><b>${esc(T(D.v[P.cur][1], D.v[P.cur][2]))}</b></div>`;
  return `<div class="tl-phud"><span>${hearts}</span><span class="tl-pscore">${P.score} ${esc(T("riktige", "correct"))}</span><span class="tl-pleft">${P.deck.length + (P.over ? 0 : 1)} ${esc(T("kort igjen", "cards left"))}</span></div>
    ${head}<div class="tl-pline">${gap(0)}${P.line.map((i, k) => card(i) + gap(k + 1)).join("")}</div>
    ${P.last && !P.last.ok ? `<p class="tl-pmiss">${esc(T(`Ikke helt – «${D.v[P.last.i][1]}» var i ${tlYear(D.v[P.last.i][0], D.v[P.last.i][5])}. Kortet er flyttet til riktig plass.`, `Not quite – '${D.v[P.last.i][2]}' was in ${tlYear(D.v[P.last.i][0], D.v[P.last.i][5])}. The card has been moved to the right place.`))}</p>` : ""}`;
}
function tlPlRender(el){ el.querySelector(".tl-body").innerHTML = tlPlHTML(el.dataset.tl, tlPl.get(el)); }
function tlPlace(el, k){
  const name = el.dataset.tl, D = TIMELINES[name], P = tlPl.get(el); if(!P || P.over) return;
  const y = D.v[P.cur][0], lo = k > 0 ? D.v[P.line[k - 1]][0] : -Infinity, hi = k < P.line.length ? D.v[P.line[k]][0] : Infinity, ok = lo <= y && y <= hi;
  if(ok){ P.line.splice(k, 0, P.cur); P.score++; buzz(true); sfx("ok"); }
  else { let j = P.line.findIndex(i => D.v[i][0] > y); if(j < 0) j = P.line.length; P.line.splice(j, 0, P.cur); P.lives--; buzz(false); sfx("bad"); }
  P.last = { i: P.cur, ok };
  if(!P.lives || !P.deck.length){ P.over = true; S.tlBest ||= {}; const rec = P.score > (S.tlBest[name] | 0); if(rec) S.tlBest[name] = P.score;
    if(P.score >= 5){ const st = awardXP(TL_XP); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); } save();
    tlPlRender(el); if(P.score >= 5) setTimeout(() => { burst(el.querySelector(".tl-pover")); sfx("complete"); }, 60); return; }
  P.cur = P.deck.shift(); tlPlRender(el);
  const c = el.querySelector(".tl-pc.ok,.tl-pc.bad"); if(c && c.scrollIntoView) c.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
// ---------- Årsak → virkning: koble sammen par ----------
const tlCa = new WeakMap();
function tlCaNew(name){ const D = TIMELINES[name], pick = shuffle(D.c.map((_, i) => i)).slice(0, 4);
  return { pick, right: shuffle(pick), sel: null, done: false, matched: [], miss: 0, bad: null }; }
function tlCaHTML(name, C){
  const D = TIMELINES[name], m = new Set(C.matched);
  const btn = (side, i, txt) => `<button class="tl-cb${m.has(i) ? " ok" : ""}${C.sel === side + i ? " sel" : ""}${C.bad === side + i ? " bad" : ""}" data-tlca="${side}${i}" ${m.has(i) ? "disabled" : ""}>${m.has(i) ? `<span class="tl-cn">${C.matched.indexOf(i) + 1}</span>` : ""}${esc(txt)}</button>`;
  return `<p class="sim-note">${esc(T("Koble hver årsak til det den førte til. Trykk på en årsak og deretter på virkningen.", "Match each cause to what it led to. Tap a cause, then its effect."))}</p>
    <div class="tl-ca"><div><h5>${esc(T("Årsak", "Cause"))}</h5>${C.pick.map(i => btn("a", i, T(D.c[i][0], D.c[i][1]))).join("")}</div>
    <div><h5>${esc(T("Virkning", "Effect"))}</h5>${C.right.map(i => btn("v", i, T(D.c[i][2], D.c[i][3]))).join("")}</div></div>
    <div class="tl-act">${C.done ? `<span class="tl-win">${esc(C.miss ? T(`Alle koblet! (${C.miss} bom)`, `All matched! (${C.miss} misses)`) : T("Alle riktige uten bom!", "All correct, no misses!"))}</span><button class="tl-btn" data-tlcnew="1">${esc(T("Nye par", "New pairs"))}</button>` : ""}</div>`;
}
function tlCaRender(el){ el.querySelector(".tl-body").innerHTML = tlCaHTML(el.dataset.tl, tlCa.get(el)); }
function tlCaPick(el, id){
  const C = tlCa.get(el); if(!C || C.done) return; C.bad = null;
  if(!C.sel || C.sel[0] === id[0]){ C.sel = C.sel === id ? null : id; tlCaRender(el); return; }
  const a = +C.sel.slice(1), b = +id.slice(1); C.sel = null;
  if(a === b){ C.matched.push(a); buzz(true); sfx("ok");
    if(C.matched.length === C.pick.length){ C.done = true; const st = awardXP(TL_XP); save(); tlCaRender(el); setTimeout(() => burst(el.querySelector(".tl-win")), 60); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); return; } }
  else { C.miss++; C.bad = id; buzz(false); sfx("bad"); }
  tlCaRender(el);
}
document.addEventListener("click", e => {
  const el = e.target.closest && e.target.closest(".tl"); if(!el) return;
  const b = e.target.closest("[data-tlmode],[data-tlgo],[data-tli],[data-tlmv],[data-tlpick],[data-tlcheck],[data-tlnew],[data-tlgap],[data-tlpnew],[data-tlca],[data-tlcnew]"); if(!b) return;
  e.stopPropagation(); const name = el.dataset.tl;
  if(b.dataset.tlmode){ el.querySelectorAll("[data-tlmode]").forEach(x => x.classList.toggle("on", x === b));
    const m = b.dataset.tlmode; el.dataset.mode = m;
    if(m === "s"){ if(!tlGame.get(el) || tlGame.get(el).done) tlGame.set(el, tlRound(name)); tlSortRender(el); }
    else if(m === "p"){ if(!tlPl.get(el) || tlPl.get(el).over) tlPl.set(el, tlPlNew(name)); tlPlRender(el); }
    else if(m === "c"){ if(!tlCa.get(el) || tlCa.get(el).done) tlCa.set(el, tlCaNew(name)); tlCaRender(el); }
    else tlShow(el, 0, true); return; }
  if(b.dataset.tlgap){ tlPlace(el, +b.dataset.tlgap); return; }
  if(b.dataset.tlpnew){ tlPl.set(el, tlPlNew(name)); tlPlRender(el); return; }
  if(b.dataset.tlca){ tlCaPick(el, b.dataset.tlca); return; }
  if(b.dataset.tlcnew){ tlCa.set(el, tlCaNew(name)); tlCaRender(el); return; }
  if(b.dataset.tlgo){ const k = +el.querySelector(".tl-card").dataset.k + +b.dataset.tlgo; tlShow(el, k, true); return; }
  if(b.dataset.tli){ tlShow(el, +b.dataset.tli, false); return; }
  if(b.dataset.tlmv){ const j = +b.dataset.j; tlSwap(el, j, j + +b.dataset.tlmv); return; }
  if(b.dataset.tlcheck){ tlCheck(el); return; }
  if(b.dataset.tlnew){ tlGame.set(el, tlRound(name)); tlSortRender(el); return; }
  if(b.dataset.tlpick){ const G = tlGame.get(el), j = +b.dataset.tlpick; if(G.done) return;
    if(G.sel < 0){ G.sel = j; tlSortRender(el); } else if(G.sel === j){ G.sel = -1; tlSortRender(el); } else tlSwap(el, G.sel, j); }
});
document.addEventListener("keydown", e => { if(e.key !== "Enter" && e.key !== " ") return; const g = e.target.closest && e.target.closest(".tl-ev"); if(!g) return; e.preventDefault(); g.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
