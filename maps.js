// ============================================================
//  KART – interaktive historiske og tematiske kart i teorien (![map:navn]).
//  Landgrensene er dagens (Natural Earth, maps_data.js) – historiske riker er satt sammen av dagens land,
//  så grensene er omtrentlige. Hvert kart har tidssteg (frames) som farger land etter gruppe, piler (felttog,
//  invasjoner, reiser) og markeringer (slag og hendelser). «Test deg»: et land blinker, du velger riktig gruppe.
// ============================================================
// Gruppe: [farge, nb, en]. Tidssteg: { y: [nb, en], d: [nb, en], s: { gruppe: "KODER …" }, a: [[gruppe, "a>b>c"]], m: [["punkt", nb, en]] }.
// Fargene i et tidssteg arves fra forrige steg; s endrer bare de landene som står der. Koden "-" i s fjerner farge.
const MP_C = { blue: "#3B6FD6", red: "#D9483B", grey: "#A9B0B8", pink: "#F2A79C", purple: "#8E5CC6", green: "#2E9D5B", wine: "#8E1F2F", lblue: "#8FB4F0",
  teal: "#3FA88C", yellow: "#E9C400", orange: "#E07A1F", sky: "#5BC0EB", brown: "#A0522D", lilac: "#C79BE0", mint: "#7FD1A0", rose: "#F28CB1", dark: "#4A4F57", sand: "#D8C690" };
const MAPS = {
  // ---------------- FØRSTE VERDENSKRIG ----------------
  ww1: { v: "europe", t: ["Første verdenskrig 1914–1918", "First World War 1914–1918"],
    g: { E: [MP_C.blue, "Ententen (de allierte)", "Entente (the Allies)"], S: [MP_C.red, "Sentralmaktene", "Central Powers"], N: [MP_C.grey, "Nøytrale", "Neutral"],
      O: [MP_C.pink, "Okkupert av sentralmaktene", "Occupied by the Central Powers"], X: [MP_C.purple, "Russland: revolusjon og ute av krigen", "Russia: revolution, out of the war"],
      NY: [MP_C.green, "Nye stater", "New states"], T: [MP_C.rose, "Tapte krigen", "Lost the war"], SOV: [MP_C.wine, "Sovjet-Russland", "Soviet Russia"] },
    f: [
      { y: ["August 1914", "August 1914"], s: { E: "FR GB IE BE RU UA BY PL LT LV EE FI MD RS ME MA DZ TN", S: "DE AT HU CZ SK SI HR BA", N: "NO SE DK IS NL CH ES PT IT RO BG GR AL TR SY IQ LB IL PS JO SA LY EG LU" },
        a: [["S", "DE>brusel>marne"], ["S", "wien>beograd"], ["E", "minsk>tannenberg"]],
        m: [["sarajevo", "Skuddene i Sarajevo 28. juni", "Shots in Sarajevo, 28 June"], ["marne", "Marne: tyskerne stanses", "Marne: the Germans are stopped"], ["tannenberg", "Tannenberg: russisk nederlag", "Tannenberg: Russian defeat"]],
        d: ["Etter skuddene i Sarajevo erklærer Østerrike-Ungarn krig mot Serbia. **Alliansesystemet** drar inn stormaktene på få dager: Russland støtter Serbia, Tyskland støtter Østerrike-Ungarn, og Frankrike og Storbritannia går inn på russisk side. Tyskland angriper Frankrike gjennom det nøytrale **Belgia** (Schlieffen-planen), men stanses ved **Marne** i september. I øst slår tyskerne russerne ved **Tannenberg**.",
          "After the shots in Sarajevo, Austria-Hungary declares war on Serbia. The **alliance system** drags in the great powers within days: Russia backs Serbia, Germany backs Austria-Hungary, and France and Britain join on Russia's side. Germany attacks France through neutral **Belgium** (the Schlieffen Plan) but is stopped at the **Marne** in September. In the east the Germans beat the Russians at **Tannenberg**."] },
      { y: ["Høsten 1914", "Autumn 1914"], s: { S: "TR SY IQ LB IL PS JO", E: "EG", O: "BE LU" },
        m: [["ypres", "Vestfronten låser seg i skyttergraver", "The Western Front locks into trenches"]],
        d: ["Det **osmanske riket** går inn på sentralmaktenes side i november. På **vestfronten** graver begge sider seg ned: en linje av skyttergraver strekker seg fra Nordsjøen til Sveits, og fronten flytter seg knapt de neste tre årene. Nesten hele Belgia er okkupert.",
          "The **Ottoman Empire** joins the Central Powers in November. On the **Western Front** both sides dig in: a line of trenches runs from the North Sea to Switzerland, and the front barely moves for the next three years. Almost all of Belgium is occupied."] },
      { y: ["1915", "1915"], s: { E: "IT LY", S: "BG", O: "RS ME" }, a: [["E", "malta>gallipoli"]],
        m: [["gallipoli", "Gallipoli: de allierte må gi opp", "Gallipoli: the Allies give up"], ["isonzo", "Isonzo-fronten", "The Isonzo front"]],
        d: ["**Italia** bytter side og går inn på Ententens side, lokket av løfter om land. **Bulgaria** slutter seg til sentralmaktene, og Serbia blir overkjørt. De allierte prøver å nå Russland gjennom Dardanellene, men landgangen ved **Gallipoli** ender i et blodig nederlag.",
          "**Italy** switches sides and joins the Entente, tempted by promises of territory. **Bulgaria** joins the Central Powers, and Serbia is overrun. The Allies try to reach Russia through the Dardanelles, but the landing at **Gallipoli** ends in a bloody defeat."] },
      { y: ["1916", "1916"], s: { E: "RO PT" },
        m: [["verdun", "Verdun: 10 måneder, ca. 700 000 tap", "Verdun: 10 months, c. 700,000 casualties"], ["somme", "Somme: over 1 million drept eller såret", "Somme: over 1 million killed or wounded"]],
        d: ["1916 er utmattelsens år. Ved **Verdun** og **Somme** dør hundretusener for å vinne noen få kilometer. **Romania** går inn på Ententens side, men blir raskt for det meste okkupert.",
          "1916 is the year of attrition. At **Verdun** and the **Somme** hundreds of thousands die to gain a few kilometres. **Romania** joins the Entente but is soon mostly occupied."] },
      { y: ["1917", "1917"], s: { E: "GR", X: "RU UA BY MD", NY: "FI" }, a: [["E", "atlant>paris"]],
        m: [["leningrad", "Revolusjonene i Petrograd", "The revolutions in Petrograd"], ["atlant", "USA går inn i krigen (april)", "The USA enters the war (April)"]],
        d: ["To vendepunkter: **USA** går inn i krigen etter tysk ubåtkrig mot handelsskip, og **Russland** får to revolusjoner. Bolsjevikene tar makten i november og vil ut av krigen. **Finland** erklærer seg selvstendig i desember.",
          "Two turning points: the **USA** enters the war after German submarine attacks on merchant ships, and **Russia** has two revolutions. The Bolsheviks seize power in November and want out of the war. **Finland** declares independence in December."] },
      { y: ["1918", "1918"], s: { O: "UA BY LT LV EE PL" }, a: [["E", "paris>brusel"]],
        m: [["compiegne", "Våpenhvile 11. november 1918", "Armistice, 11 November 1918"]],
        d: ["Ved **freden i Brest-Litovsk** (mars) gir Russland fra seg store områder i vest. Tysklands siste store offensiv i vest mislykkes, og de allierte, nå med friske amerikanske soldater, presser tyskerne tilbake. Sentralmaktene faller sammen én etter én, og **våpenhvilen** undertegnes 11. november 1918.",
          "In the **Treaty of Brest-Litovsk** (March) Russia gives up large areas in the west. Germany's last great offensive in the west fails, and the Allies, now with fresh American troops, push the Germans back. The Central Powers collapse one by one, and the **armistice** is signed on 11 November 1918."] },
      { y: ["Etter krigen (1919–1923)", "After the war (1919–1923)"],
        s: { NY: "PL CZ SK FI EE LV LT RS ME SI HR BA MK XK", T: "DE AT HU BG TR", SOV: "RU UA BY", E: "MD RO SY LB IQ JO PS IL", N: "AL" },
        m: [["compiegne", "Versaillestraktaten 1919", "Treaty of Versailles 1919"]],
        d: ["Fredsavtalene endrer kartet: Østerrike-Ungarn, Det osmanske riket og Det russiske riket faller fra hverandre. Nye stater oppstår: **Polen, Tsjekkoslovakia, Jugoslavia, Finland og de baltiske landene**. Tyskland må ta på seg skylden, betale krigserstatning og gi fra seg land – noe som skaper bitterhet. Britene og franskmennene får **mandatområder** i Midtøsten. Rundt 17 millioner mennesker døde i krigen.",
          "The peace treaties redraw the map: Austria-Hungary, the Ottoman Empire and the Russian Empire break apart. New states emerge: **Poland, Czechoslovakia, Yugoslavia, Finland and the Baltic states**. Germany must accept the blame, pay reparations and give up land – which breeds bitterness. Britain and France get **mandates** in the Middle East. Around 17 million people died in the war."] }
    ] },
  // ---------------- ANDRE VERDENSKRIG I EUROPA ----------------
  ww2: { v: "europe", t: ["Andre verdenskrig i Europa 1939–1945", "The Second World War in Europe 1939–1945"],
    g: { AX: [MP_C.red, "Aksemaktene og deres allierte", "The Axis and its allies"], AXO: [MP_C.pink, "Okkupert av aksemaktene", "Occupied by the Axis"], AL: [MP_C.blue, "De allierte", "The Allies"],
      SU: [MP_C.wine, "Sovjetunionen (alliert fra juni 1941)", "Soviet Union (Allied from June 1941)"], N: [MP_C.grey, "Nøytrale", "Neutral"], V: [MP_C.sand, "Vichy-Frankrikes kolonier", "Vichy French colonies"],
      LIB: [MP_C.lblue, "Frigjort av de allierte", "Liberated by the Allies"], ALO: [MP_C.teal, "Okkupert av de allierte", "Occupied by the Allies"] },
    f: [
      { y: ["September 1939", "September 1939"], s: { AX: "DE AT IT SK LY", AXO: "CZ AL", AL: "GB FR PL MA DZ TN SY LB IQ JO PS IL EG", SU: "RU UA BY",
          N: "NO SE DK IS FI EE LV LT NL BE LU CH ES PT IE RO HU BG GR TR RS ME SI HR BA MK XK SA IR MD CY" },
        a: [["AX", "DE>warszawa"], ["SU", "minsk>warszawa"]], m: [["warszawa", "Polen deles mellom Tyskland og Sovjet", "Poland is split between Germany and the USSR"]],
        d: ["Hitler har allerede tatt **Østerrike** (1938) og **Tsjekkoslovakia** (1939) uten krig. Etter en ikke-angrepsavtale med Stalin angriper Tyskland **Polen 1. september 1939**. Storbritannia og Frankrike erklærer krig. Sovjetunionen angriper Polen fra øst 17. september.",
          "Hitler has already taken **Austria** (1938) and **Czechoslovakia** (1939) without war. After a non-aggression pact with Stalin, Germany attacks **Poland on 1 September 1939**. Britain and France declare war. The Soviet Union invades Poland from the east on 17 September."] },
      { y: ["1940", "1940"], s: { AXO: "PL DK NO NL BE LU FR", SU: "EE LV LT MD", V: "MA DZ TN SY LB" },
        a: [["AX", "DE>kobenhavn>oslo>narvik"], ["AX", "DE>amsterdam>dunkerque>paris"]],
        m: [["narvik", "Kampene om Narvik", "The battles for Narvik"], ["dunkerque", "Dunkerque: 338 000 evakuert", "Dunkirk: 338,000 evacuated"], ["london", "Slaget om Storbritannia", "The Battle of Britain"]],
        d: ["**9. april 1940** angriper Tyskland Danmark og Norge. I mai går **lynkrigen** gjennom Nederland og Belgia, og Frankrike faller på seks uker. Nord-Frankrike okkuperes, og sør styres av **Vichy-regimet**, som samarbeider med tyskerne. Storbritannia står alene og vinner **slaget om Storbritannia** i luften. Sovjetunionen tar de baltiske landene.",
          "On **9 April 1940** Germany attacks Denmark and Norway. In May the **Blitzkrieg** sweeps through the Netherlands and Belgium, and France falls in six weeks. Northern France is occupied and the south is run by the **Vichy regime**, which collaborates with the Germans. Britain stands alone and wins the **Battle of Britain** in the air. The Soviet Union takes the Baltic states."] },
      { y: ["1941", "1941"], s: { AX: "HU RO BG FI HR", AXO: "RS ME SI BA MK XK GR", AL: "SY LB" },
        a: [["AX", "warszawa>leningrad"], ["AX", "warszawa>moskva"], ["AX", "bucuresti>kyiv"]],
        m: [["moskva", "Stanset foran Moskva i desember", "Stopped before Moscow in December"], ["leningrad", "Beleiringen av Leningrad", "The siege of Leningrad"]],
        d: ["Tyskland og Italia tar **Jugoslavia og Hellas** i april. **22. juni 1941** angriper Tyskland Sovjetunionen (**operasjon Barbarossa**) med over tre millioner soldater. Ungarn, Romania, Bulgaria og Finland kjemper på tysk side. Angrepet stanses foran Moskva i vinterkulden. I desember angriper Japan Pearl Harbor, og USA går inn i krigen.",
          "Germany and Italy take **Yugoslavia and Greece** in April. On **22 June 1941** Germany invades the Soviet Union (**Operation Barbarossa**) with over three million soldiers. Hungary, Romania, Bulgaria and Finland fight on the German side. The attack stalls before Moscow in the winter cold. In December Japan attacks Pearl Harbor, and the USA enters the war."] },
      { y: ["1942", "1942"], s: { AXO: "EE LV LT BY UA MD", AL: "MA DZ", AX: "TN" },
        a: [["AX", "kyiv>stalingrad"], ["AX", "kyiv>kaukasus"], ["AX", "tobruk>elalamein"], ["AL", "gibraltar>alger"]],
        m: [["stalingrad", "Stalingrad", "Stalingrad"], ["elalamein", "El Alamein: vendepunkt i Afrika", "El Alamein: turning point in Africa"]],
        d: ["Aksemaktene er på sitt største. Tyskland når **Stalingrad** og Kaukasus, og i Nord-Afrika står Rommel nær Egypt. Bak fronten gjennomfører nazistene **Holocaust**: rundt seks millioner jøder blir myrdet. Høsten 1942 snur krigen: britene vinner ved **El Alamein**, og amerikanere og briter går i land i Nord-Afrika.",
          "The Axis is at its largest. Germany reaches **Stalingrad** and the Caucasus, and in North Africa Rommel is close to Egypt. Behind the front the Nazis carry out the **Holocaust**: about six million Jews are murdered. In autumn 1942 the war turns: the British win at **El Alamein**, and American and British troops land in North Africa."] },
      { y: ["1943", "1943"], s: { AL: "TN LY", AXO: "IT" }, a: [["SU", "stalingrad>kyiv"], ["AL", "tunis>sicilia>napoli"]],
        m: [["stalingrad", "Tysk overgivelse i februar", "German surrender in February"], ["kursk", "Kursk: verdens største stridsvognslag", "Kursk: the largest tank battle"], ["napoli", "Italia kapitulerer – tyskerne tar nord", "Italy surrenders – the Germans take the north"]],
        d: ["Den tyske 6. armé overgir seg i **Stalingrad**, og etter **Kursk** er det Den røde armé som angriper. De allierte går fra Afrika til **Sicilia** og Italia. Mussolini styrtes, og Italia kapitulerer i september – men tyskerne okkuperer resten av landet.",
          "The German 6th Army surrenders at **Stalingrad**, and after **Kursk** it is the Red Army that attacks. The Allies move from Africa to **Sicily** and Italy. Mussolini is overthrown and Italy surrenders in September – but the Germans occupy the rest of the country."] },
      { y: ["1944", "1944"], s: { LIB: "FR BE LU GR", SU: "UA BY EE LV LT MD RO BG", N: "FI" },
        a: [["AL", "london>normandie>paris>bastogne"], ["SU", "kyiv>warszawa"], ["SU", "minsk>riga"]],
        m: [["normandie", "D-dagen 6. juni 1944", "D-Day, 6 June 1944"], ["warszawa", "Warszawa-oppstanden", "The Warsaw Uprising"]],
        d: ["**6. juni 1944 – D-dagen:** de allierte går i land i **Normandie**, og Paris frigjøres i august. Samtidig knuser Den røde armé tyske styrker i øst og når Polen. Romania og Bulgaria bytter side, og Finland slutter fred med Sovjetunionen.",
          "**6 June 1944 – D-Day:** the Allies land in **Normandy**, and Paris is liberated in August. At the same time the Red Army crushes German forces in the east and reaches Poland. Romania and Bulgaria switch sides, and Finland makes peace with the Soviet Union."] },
      { y: ["Mai 1945", "May 1945"], s: { ALO: "DE AT", SU: "PL CZ SK HU", LIB: "NO DK NL IT RS ME SI HR BA MK XK AL" },
        a: [["SU", "warszawa>berlin"], ["AL", "bastogne>dresden"]],
        m: [["berlin", "Berlin faller – kapitulasjon 8. mai", "Berlin falls – surrender on 8 May"]],
        d: ["Sovjetiske og vestallierte styrker møtes ved Elben i april. Hitler tar sitt eget liv, og Tyskland **kapitulerer 8. mai 1945**. Norge er fritt. Tyskland og Østerrike deles i fire okkupasjonssoner, og Øst-Europa havner under sovjetisk kontroll – starten på den kalde krigen. Krigen i Europa har kostet rundt 40 millioner liv.",
          "Soviet and Western Allied forces meet at the Elbe in April. Hitler takes his own life, and Germany **surrenders on 8 May 1945**. Norway is free. Germany and Austria are divided into four occupation zones, and Eastern Europe falls under Soviet control – the start of the Cold War. The war in Europe has cost around 40 million lives."] }
    ] },
  // ---------------- ANDRE VERDENSKRIG I VERDEN ----------------
  ww2w: { v: "world", t: ["Andre verdenskrig i verden", "The Second World War worldwide"],
    g: { AX: [MP_C.red, "Aksemaktene og allierte", "The Axis and allies"], AXO: [MP_C.pink, "Okkupert av aksemaktene", "Occupied by the Axis"], AL: [MP_C.blue, "De allierte", "The Allies"],
      SU: [MP_C.wine, "Sovjetunionen", "Soviet Union"], N: [MP_C.grey, "Nøytrale", "Neutral"], LIB: [MP_C.lblue, "Frigjort", "Liberated"], ALO: [MP_C.teal, "Okkupert av de allierte", "Occupied by the Allies"] },
    f: [
      { y: ["Slutten av 1942", "Late 1942"], s: { AX: "DE IT JP HU RO BG FI TH", AXO: "FR PL NO DK NL BE LU CZ SK GR RS ME SI HR BA MK XK AL EE LV LT BY UA KR KP TW PH ID MY MM VN LA KH TL BN",
          AL: "US GB CA AU NZ ZA IN PK BD LK CN MX BR EG IQ IR", SU: "RU KZ UZ TM TJ KG GE AM AZ MN", N: "SE CH ES PT IE TR AR SA" },
        a: [["AX", "tokyo>pearlharbor"], ["AX", "tokyo>singapore"], ["AX", "DE>stalingrad"]],
        m: [["pearlharbor", "Pearl Harbor 7. des. 1941", "Pearl Harbor, 7 Dec 1941"], ["midway", "Midway: vendepunkt (juni 1942)", "Midway: turning point (June 1942)"], ["stalingrad", "Stalingrad", "Stalingrad"]],
        d: ["Krigen er en **verdenskrig**: Japan har erobret store deler av Kina og Sørøst-Asia og angrepet USA ved **Pearl Harbor**. Ved **Midway** i juni 1942 senker amerikanerne fire japanske hangarskip, og etter det er det USA som rykker fram i Stillehavet.",
          "The war is a **world war**: Japan has conquered large parts of China and South-East Asia and attacked the USA at **Pearl Harbor**. At **Midway** in June 1942 the Americans sink four Japanese aircraft carriers, and from then on the USA advances in the Pacific."] },
      { y: ["August 1945", "August 1945"], s: { ALO: "DE AT JP", SU: "PL CZ SK HU RO BG", LIB: "FR NO DK NL BE LU GR RS ME SI HR BA MK XK AL IT PH ID MY MM VN LA KH TL BN KR KP TW", N: "FI TH" },
        a: [["AL", "midway>manila>tokyo"]], m: [["hiroshima", "Atombombene 6. og 9. august", "The atomic bombs, 6 and 9 August"]],
        d: ["Etter at Tyskland har kapitulert, slipper USA **atombomber over Hiroshima og Nagasaki**, og Sovjetunionen angriper japanske styrker i Mandsjuria. Japan kapitulerer **2. september 1945**. Rundt 70–85 millioner mennesker døde i krigen, de fleste sivile. FN opprettes samme år.",
          "After Germany's surrender, the USA drops **atomic bombs on Hiroshima and Nagasaki**, and the Soviet Union attacks Japanese forces in Manchuria. Japan surrenders on **2 September 1945**. Around 70–85 million people died in the war, most of them civilians. The UN is founded the same year."] }
    ] },
  // ---------------- DEN KALDE KRIGEN ----------------
  kald: { v: "europe", t: ["Den kalde krigen i Europa", "The Cold War in Europe"],
    g: { NATO: [MP_C.blue, "NATO", "NATO"], WP: [MP_C.red, "Warszawapakten / østblokken", "Warsaw Pact / Eastern Bloc"], SU: [MP_C.wine, "Sovjetunionen", "Soviet Union"],
      N: [MP_C.grey, "Nøytrale / alliansefrie", "Neutral / non-aligned"], DEL: [MP_C.lilac, "Delt Tyskland: vest i NATO, øst i Warszawapakten", "Divided Germany: West in NATO, East in the Warsaw Pact"],
      NY: [MP_C.green, "Nye stater fra 1991", "New states from 1991"], RUS: [MP_C.wine, "Russland", "Russia"] },
    f: [
      { y: ["1949", "1949"], s: { NATO: "NO DK IS GB NL BE LU FR IT PT", SU: "RU UA BY EE LV LT MD GE AM AZ KZ UZ TM", WP: "PL CZ SK HU RO BG AL", DEL: "DE",
          N: "SE FI IE CH AT ES RS ME SI HR BA MK XK TR GR" },
        m: [["berlin", "Berlinblokaden 1948–49", "The Berlin Blockade 1948–49"]],
        d: ["Etter krigen deles Europa av et **«jernteppe»**. Sovjetunionen sørger for kommunistiske regimer i Øst-Europa, og USA hjelper Vest-Europa med **Marshallhjelpen**. Under **Berlinblokaden** forsyner vestmaktene Vest-Berlin med fly i nesten et år. I 1949 grunnlegges **NATO** – Norge er med fra starten.",
          "After the war Europe is divided by an **\"Iron Curtain\"**. The Soviet Union installs communist regimes in Eastern Europe, and the USA helps Western Europe with the **Marshall Plan**. During the **Berlin Blockade** the Western powers supply West Berlin by air for almost a year. In 1949 **NATO** is founded – Norway is a founding member."] },
      { y: ["1955", "1955"], s: { NATO: "GR TR", N: "AT" },
        d: ["Hellas og Tyrkia blir med i NATO (1952), og Vest-Tyskland i 1955. Samme år lager Sovjetunionen **Warszawapakten**. Østerrike blir fritt og nøytralt. To militære blokker står nå mot hverandre, begge med atomvåpen.",
          "Greece and Turkey join NATO (1952), and West Germany in 1955. The same year the Soviet Union creates the **Warsaw Pact**. Austria becomes free and neutral. Two military blocs now face each other, both with nuclear weapons."] },
      { y: ["1956–1968", "1956–1968"], s: { N: "AL" }, a: [["SU", "kyiv>budapest"], ["SU", "kyiv>praha"]],
        m: [["budapest", "Ungarn 1956: opprøret knuses", "Hungary 1956: the uprising is crushed"], ["praha", "Praha 1968: «Praha-våren» stanses", "Prague 1968: the \"Prague Spring\" is stopped"], ["berlin", "Berlinmuren bygges 1961", "The Berlin Wall is built in 1961"]],
        d: ["Når folk i østblokken krever frihet, griper Sovjetunionen inn med stridsvogner: i **Ungarn 1956** og i **Tsjekkoslovakia 1968**. I **1961** bygges **Berlinmuren** for å stoppe flukten vestover. Albania bryter med Sovjetunionen. Utenfor Europa føres «varme» stedfortrederkriger, som i Korea og Vietnam.",
          "When people in the Eastern Bloc demand freedom, the Soviet Union sends in tanks: in **Hungary in 1956** and **Czechoslovakia in 1968**. In **1961** the **Berlin Wall** is built to stop people fleeing west. Albania breaks with the Soviet Union. Outside Europe \"hot\" proxy wars are fought, as in Korea and Vietnam."] },
      { y: ["1989–1991", "1989–1991"], s: { NATO: "DE ES", N: "PL CZ SK HU RO BG AL", NY: "EE LV LT UA BY MD GE AM AZ KZ UZ TM SI HR", RUS: "RU" },
        m: [["berlin", "Muren faller 9. november 1989", "The Wall falls, 9 November 1989"]],
        d: ["Gorbatsjovs reformer åpner for endring. I **1989** faller de kommunistiske regimene i Øst-Europa, de fleste fredelig, og **Berlinmuren** faller 9. november. Tyskland gjenforenes i **1990**. I **1991** oppløses både Warszawapakten og **Sovjetunionen**, og 15 nye stater oppstår.",
          "Gorbachev's reforms open the door to change. In **1989** the communist regimes of Eastern Europe fall, mostly peacefully, and the **Berlin Wall** falls on 9 November. Germany is reunified in **1990**. In **1991** both the Warsaw Pact and the **Soviet Union** are dissolved, and 15 new states emerge."] },
      { y: ["NATO i dag", "NATO today"], s: { NATO: "PL CZ HU BG EE LV LT RO SK SI AL HR ME MK FI SE", N: "UA BY MD GE AM AZ AT CH IE RS BA XK" },
        d: ["Etter den kalde krigen har de fleste tidligere østblokklandene blitt med i både **NATO og EU**. **Finland (2023)** og **Sverige (2024)** ble med etter Russlands fullskala invasjon av Ukraina i 2022. NATO har nå 32 medlemmer.",
          "Since the Cold War most former Eastern Bloc countries have joined both **NATO and the EU**. **Finland (2023)** and **Sweden (2024)** joined after Russia's full-scale invasion of Ukraine in 2022. NATO now has 32 members."] }
    ] },
  // ---------------- IMPERIALISME 1914 ----------------
  kolonier: { v: "world", t: ["Kolonimaktene i 1914", "The colonial powers in 1914"],
    g: { GB: [MP_C.red, "Storbritannia", "Britain"], FR: [MP_C.blue, "Frankrike", "France"], DE: [MP_C.dark, "Tyskland", "Germany"], PT: [MP_C.green, "Portugal", "Portugal"],
      BE: [MP_C.yellow, "Belgia", "Belgium"], IT: [MP_C.purple, "Italia", "Italy"], ES: [MP_C.orange, "Spania", "Spain"], NL: [MP_C.rose, "Nederland", "Netherlands"],
      JP: [MP_C.lilac, "Japan", "Japan"], US: [MP_C.sky, "USA", "USA"], RU: [MP_C.wine, "Russland", "Russia"], OT: [MP_C.brown, "Det osmanske riket", "Ottoman Empire"], IND: [MP_C.mint, "Selvstendige i Afrika og Asia", "Independent in Africa and Asia"] },
    f: [
      { y: ["1914", "1914"], s: { GB: "GB IE IN PK BD MM LK MY EG SD SS UG KE NG GH SL GM ZA LS SZ BW ZW ZM MW SO_S AU NZ CA GY CY KW", FR: "FR DZ TN MA MR SN ML GN CI BF NE BJ TD CF CG GA MG DJ VN LA KH",
          DE: "DE TZ RW BI NA CM TG", PT: "PT AO MZ GW TL", BE: "BE CD", IT: "IT LY ER SO", ES: "ES EH GQ", NL: "NL ID SR", JP: "JP KR KP TW", US: "US PH PR",
          RU: "RU UA BY FI EE LV LT PL KZ UZ TM TJ KG GE AM AZ MD", OT: "TR SY IQ LB IL PS JO", IND: "ET LR CN TH IR AF NP" },
        d: ["På **Berlinkonferansen 1884–85** delte de europeiske stormaktene Afrika mellom seg uten å spørre afrikanerne. I 1914 var bare **Etiopia og Liberia** selvstendige. **Imperialismen** var drevet av jakt på råvarer og markeder, nasjonal prestisje og rasistiske ideer om «å sivilisere» andre folk. Rivaliseringen om kolonier var også en av årsakene til første verdenskrig.",
          "At the **Berlin Conference of 1884–85** the European powers divided Africa between them without asking Africans. By 1914 only **Ethiopia and Liberia** were independent. **Imperialism** was driven by the hunt for raw materials and markets, national prestige and racist ideas of \"civilising\" other peoples. Rivalry over colonies was also one of the causes of the First World War."] }
    ] },
  // ---------------- AVKOLONISERINGEN I AFRIKA ----------------
  avkol: { v: "world", fit: "MA EG ZA SO DJ SN MG GQ", t: ["Afrika blir selvstendig", "Africa becomes independent"],
    g: { IND: [MP_C.green, "Selvstendig", "Independent"], NEW: [MP_C.mint, "Ble selvstendig i denne perioden", "Became independent in this period"], COL: [MP_C.grey, "Koloni", "Colony"], DIS: [MP_C.sand, "Omstridt (Vest-Sahara)", "Disputed (Western Sahara)"] },
    f: [] },
  // ---------------- RELIGIONER I VERDEN ----------------
  religion: { v: "world", t: ["Religioner i verden", "Religions of the world"],
    g: { CHR: [MP_C.blue, "Kristendom", "Christianity"], ISL: [MP_C.green, "Islam", "Islam"], HIN: [MP_C.orange, "Hinduisme", "Hinduism"], BUD: [MP_C.yellow, "Buddhisme (Japan: buddhisme og shinto)", "Buddhism (Japan: Buddhism and Shinto)"],
      JEW: [MP_C.sky, "Jødedom", "Judaism"], NONE: [MP_C.grey, "Flest ikke-religiøse eller folkereligion", "Mostly non-religious or folk religion"], MIX: [MP_C.lilac, "Ingen klar majoritet", "No clear majority"] },
    f: [
      { y: ["Største religion i hvert land", "Largest religion in each country"],
        s: { CHR: "CA US MX GT BZ SV HN NI CR PA CU JM HT DO BS PR TT CO VE GY SR EC PE BR BO PY CL AR UY FK GB IE IS NO SE DK FI LV LT PL DE BE LU FR ES PT IT CH AT SK HU SI HR RS ME MK RO MD UA BY RU GR CY BG GE AM ZA LS SZ BW NA ZW ZM MW MZ AO CD CG GA GQ CM CF SS UG KE TZ RW BI ET MG LR GH TG BJ AU NZ PG FJ SB VU NC TL PH GL",
          ISL: "MA DZ TN LY EG SD EH MR SN ML NE TD GM GN SL BF SO SO_S DJ TR SY IQ IR SA YE OM AE QA KW JO PS AF PK BD KZ UZ TM TJ KG AZ ID MY BN AL XK CY_N",
          HIN: "IN NP", BUD: "TH MM KH LA LK BT MN JP", JEW: "IL", NONE: "CN KP VN CZ EE NL", MIX: "KR NG CI BA LB ER TW GW" },
        d: ["Kartet viser den **største religionen** i hvert land. **Kristendom** (ca. 2,4 milliarder) og **islam** (ca. 1,9 milliarder) er størst og har spredt seg over hele verden. **Hinduismen** er størst i India og Nepal, **buddhismen** i Sørøst- og Øst-Asia. Mange land har store minoriteter – og i Kina og flere europeiske land er de ikke-religiøse den største gruppen.",
          "The map shows the **largest religion** in each country. **Christianity** (about 2.4 billion) and **Islam** (about 1.9 billion) are the largest and have spread worldwide. **Hinduism** is largest in India and Nepal, **Buddhism** in South-East and East Asia. Many countries have large minorities – and in China and several European countries the non-religious are the largest group."] },
      { y: ["Hvor religionene oppsto", "Where the religions began"],
        a: [["CHR", "jerusalem>roma>london"], ["ISL", "mekka>kairo>alger"], ["ISL", "mekka>bagdad>delhi"], ["BUD", "bodhgaya>beijing>tokyo"], ["HIN", "varanasi>singapore"]],
        m: [["jerusalem", "Jødedom og kristendom", "Judaism and Christianity"], ["mekka", "Islam (600-tallet)", "Islam (7th century)"], ["varanasi", "Hinduisme", "Hinduism"], ["bodhgaya", "Buddhisme (ca. 500 fvt.)", "Buddhism (c. 500 BCE)"]],
        d: ["De tre **abrahamittiske religionene** – jødedom, kristendom og islam – oppsto i Midtøsten og deler troen på én Gud og stamfaren Abraham. Kristendommen spredte seg gjennom Romerriket og senere med europeisk kolonisering. Islam spredte seg raskt fra Arabia gjennom erobring og handel. **Hinduisme og buddhisme** oppsto i India; buddhismen spredte seg østover langs handelsveiene.",
          "The three **Abrahamic religions** – Judaism, Christianity and Islam – began in the Middle East and share belief in one God and the patriarch Abraham. Christianity spread through the Roman Empire and later with European colonisation. Islam spread quickly from Arabia through conquest and trade. **Hinduism and Buddhism** began in India; Buddhism spread east along the trade routes."] }
    ] },
  // ---------------- SPRÅKFAMILIER I EUROPA ----------------
  sprak: { v: "europe", t: ["Språkfamilier i Europa", "Language families of Europe"],
    g: { GER: [MP_C.blue, "Germanske", "Germanic"], ROM: [MP_C.orange, "Romanske", "Romance"], SLA: [MP_C.red, "Slaviske", "Slavic"], BAL: [MP_C.yellow, "Baltiske", "Baltic"],
      GRE: [MP_C.sky, "Gresk", "Greek"], ALB: [MP_C.purple, "Albansk", "Albanian"], URA: [MP_C.green, "Uralske (finsk-ugriske)", "Uralic (Finno-Ugric)"], TUR: [MP_C.brown, "Tyrkiske", "Turkic"],
      SEM: [MP_C.lilac, "Semittiske (arabisk, hebraisk, maltesisk)", "Semitic (Arabic, Hebrew, Maltese)"], IRA: [MP_C.rose, "Iranske", "Iranian"], OTH: [MP_C.dark, "Andre (armensk, georgisk)", "Other (Armenian, Georgian)"],
      IE: [MP_C.blue, "Indoeuropeiske språk", "Indo-European languages"], NIE: [MP_C.green, "Ikke indoeuropeiske", "Not Indo-European"] },
    f: [
      { y: ["Språkfamilier", "Language families"],
        s: { GER: "NO SE DK IS FO DE AT NL LU LI CH GB IE BE", ROM: "FR ES PT IT RO MD SM VA MC AD", SLA: "RU UA BY PL CZ SK SI HR BA RS ME MK BG", BAL: "LT LV", GRE: "GR CY", ALB: "AL XK",
          URA: "FI EE HU", TUR: "TR AZ TM UZ KZ CY_N", SEM: "MA DZ TN LY EG SY IQ JO LB IL PS SA KW MT", IRA: "IR AF", OTH: "AM GE" },
        m: [["sapmi", "Samisk (uralsk)", "Sami (Uralic)"], ["baskerland", "Baskisk: ikke i slekt med noen", "Basque: related to none"], ["wales", "Walisisk (keltisk)", "Welsh (Celtic)"], ["dublin", "Irsk (keltisk)", "Irish (Celtic)"]],
        d: ["Språk som stammer fra et felles opphav, danner en **språkfamilie**. Norsk er et **nordgermansk** språk, nært i slekt med svensk, dansk, islandsk og færøysk, og mer fjernt med tysk, nederlandsk og engelsk. **Finsk, estisk, ungarsk og samisk** tilhører en helt annen familie, den uralske. Kartet viser hovedspråket i hvert land – Belgia og Sveits har flere offisielle språk.",
          "Languages that descend from a common ancestor form a **language family**. Norwegian is a **North Germanic** language, closely related to Swedish, Danish, Icelandic and Faroese, and more distantly to German, Dutch and English. **Finnish, Estonian, Hungarian and Sami** belong to an entirely different family, the Uralic. The map shows the main language of each country – Belgium and Switzerland have several official languages."] },
      { y: ["Indoeuropeisk", "Indo-European"],
        s: { IE: "NO SE DK IS FO DE AT NL LU LI CH GB IE BE FR ES PT IT RO MD SM VA MC AD RU UA BY PL CZ SK SI HR BA RS ME MK BG LT LV GR CY AL XK IR AF AM", NIE: "FI EE HU TR AZ TM UZ KZ CY_N MA DZ TN LY EG SY IQ JO LB IL PS SA KW MT GE" },
        a: [["IE", "steppe>berlin>london"], ["IE", "steppe>roma>madrid"], ["IE", "steppe>bagdad"]],
        m: [["steppe", "Urheimen? Steppene nord for Svartehavet", "Homeland? The steppes north of the Black Sea"]],
        d: ["De fleste språkene i Europa – og hindi, persisk og bengali i Asia – hører til den **indoeuropeiske** språkfamilien. De stammer trolig fra ett språk som ble snakket på steppene nord for Svartehavet for rundt 6000 år siden. Derfor ligner ord som *mor*: latin *mater*, tysk *Mutter*, russisk *mat'*, sanskrit *mātṛ*.",
          "Most languages of Europe – and Hindi, Persian and Bengali in Asia – belong to the **Indo-European** family. They probably descend from a language spoken on the steppes north of the Black Sea about 6,000 years ago. That is why words like *mother* are similar: Latin *mater*, German *Mutter*, Russian *mat'*, Sanskrit *mātṛ*."] }
    ] },
  // ---------------- EU OG EØS ----------------
  eu: { v: "europe", t: ["EU og EØS: utvidelsene", "EU and EEA: the enlargements"],
    g: { EU: [MP_C.blue, "EU-medlem", "EU member"], NEW: [MP_C.sky, "Nye medlemmer", "New members"], EEA: [MP_C.green, "EØS, ikke EU (Norge, Island, Liechtenstein)", "EEA, not EU (Norway, Iceland, Liechtenstein)"],
      LEFT: [MP_C.orange, "Gikk ut av EU", "Left the EU"], CAND: [MP_C.yellow, "Kandidatland", "Candidate countries"] },
    f: [] },
  // ---------------- VIKINGTIDEN ----------------
  viking: { v: "europe", t: ["Vikingenes ferder", "The voyages of the Vikings"],
    g: { NOR: [MP_C.blue, "Norske vikinger", "Norwegian Vikings"], DAN: [MP_C.red, "Danske vikinger", "Danish Vikings"], SWE: [MP_C.yellow, "Svenske vikinger", "Swedish Vikings"], SET: [MP_C.lblue, "Norrøn bosetning", "Norse settlement"] },
    f: [
      { y: ["793–850", "793–850"], s: { NOR: "NO", DAN: "DK", SWE: "SE" }, a: [["NOR", "bergen>orknoy>lindisfarne"], ["NOR", "bergen>dublin"], ["DAN", "hedeby>paris"], ["DAN", "hedeby>sevilla"], ["SWE", "uppsala>novgorod"]],
        m: [["lindisfarne", "Lindisfarne 793", "Lindisfarne 793"], ["dublin", "Dublin grunnlagt 841", "Dublin founded 841"], ["paris", "Paris plyndres 845", "Paris raided 845"]],
        d: ["Vikingtiden regnes fra angrepet på klosteret **Lindisfarne** i 793. Norske vikinger seilte vestover til Skottland, Orknøy og Irland, der de grunnla **Dublin**. Danske vikinger herjet langs kysten av Frankrike og helt ned til Spania. Svenske vikinger dro østover langs elvene i Russland.",
          "The Viking Age is dated from the attack on the monastery of **Lindisfarne** in 793. Norwegian Vikings sailed west to Scotland, Orkney and Ireland, where they founded **Dublin**. Danish Vikings raided the coasts of France and all the way to Spain. Swedish Vikings travelled east along the rivers of Russia."] },
      { y: ["850–950", "850–950"], s: { SET: "IS" }, a: [["DAN", "hedeby>york"], ["NOR", "bergen>reykjavik"], ["SWE", "novgorod>kyiv>istanbul"], ["DAN", "hedeby>normandie"]],
        m: [["york", "Danelagen i England", "The Danelaw in England"], ["kyiv", "Kiev-riket (Rus)", "Kievan Rus"], ["istanbul", "Miklagard: væringer i keiserens tjeneste", "Miklagard: Varangians serve the emperor"], ["normandie", "Normandie 911", "Normandy 911"]],
        d: ["Vikingene gikk fra plyndring til **bosetting og handel**. Danene erobret store deler av England (**Danelagen**). Nordmenn bosatte seg på **Island** fra ca. 870. Svenske vikinger – **væringene** – var med på å grunnlegge Kiev-riket og tjente som livvakter for keiseren i Konstantinopel. Normandie ble gitt til vikinghøvdingen Rollo i 911.",
          "The Vikings moved from raiding to **settlement and trade**. The Danes conquered much of England (**the Danelaw**). Norwegians settled **Iceland** from about 870. Swedish Vikings – **the Varangians** – helped found Kievan Rus and served as bodyguards for the emperor in Constantinople. Normandy was given to the Viking chief Rollo in 911."] },
      { y: ["950–1066", "950–1066"], m: [["stamford", "Stamford Bridge 1066: Harald Hardråde faller", "Stamford Bridge 1066: Harald Hardrada falls"], ["reykjavik", "Videre til Grønland (985) og Vinland (ca. 1000)", "On to Greenland (985) and Vinland (c. 1000)"], ["trondheim", "Kristningen av Norge", "The Christianisation of Norway"]],
        d: ["Fra Island seilte **Eirik Raude** til Grønland, og **Leiv Eiriksson** nådde Amerika (**Vinland**) rundt år 1000. Samtidig ble Norden kristnet og samlet i kongeriker. Vikingtiden regnes som slutt i **1066**, da Harald Hardråde falt ved **Stamford Bridge** i England.",
          "From Iceland **Erik the Red** sailed to Greenland, and **Leif Erikson** reached America (**Vinland**) around 1000. At the same time the Nordic countries were Christianised and united into kingdoms. The Viking Age is considered to end in **1066**, when Harald Hardrada fell at **Stamford Bridge** in England."] }
    ] },
  // ---------------- REFORMASJONEN ----------------
  reform: { v: "europe", t: ["Reformasjonen: Europa deles", "The Reformation: Europe divides"],
    g: { KAT: [MP_C.yellow, "Katolske", "Catholic"], LUT: [MP_C.blue, "Lutherske", "Lutheran"], CAL: [MP_C.sky, "Reformerte (kalvinister)", "Reformed (Calvinist)"], ANG: [MP_C.purple, "Anglikanske", "Anglican"],
      ORT: [MP_C.red, "Ortodokse", "Orthodox"], ISL: [MP_C.green, "Islam (Det osmanske riket)", "Islam (the Ottoman Empire)"], MIX: [MP_C.lilac, "Blandet", "Mixed"] },
    f: [
      { y: ["Ca. 1500", "c. 1500"], s: { KAT: "NO DK IS SE FI EE LV LT PL DE NL BE LU FR ES PT IT CH AT CZ SK HU SI HR IE GB", ORT: "RU UA BY RO MD BG GR RS ME MK", ISL: "TR AL BA" },
        d: ["Før reformasjonen var Vest-Europa samlet under **den katolske kirken** med paven i Roma, mens Øst-Europa var **ortodoks**. Det osmanske riket hadde erobret store deler av Balkan.",
          "Before the Reformation Western Europe was united under **the Catholic Church** with the Pope in Rome, while Eastern Europe was **Orthodox**. The Ottoman Empire had conquered much of the Balkans."] },
      { y: ["Ca. 1600", "c. 1600"], s: { LUT: "NO DK IS SE FI EE LV", MIX: "DE CH CZ HU BA AL", CAL: "NL", ANG: "GB" },
        m: [["wittenberg", "Luther 1517: 95 teser", "Luther 1517: 95 theses"], ["geneve", "Calvin i Genève", "Calvin in Geneva"], ["london", "Henrik 8. bryter med paven 1534", "Henry VIII breaks with Rome 1534"], ["trondheim", "Reformasjonen i Danmark-Norge 1536–37", "The Reformation in Denmark-Norway 1536–37"]],
        d: ["Etter **Luthers 95 teser i 1517** delte Vest-Europa seg. Nord-Tyskland og hele **Norden** ble lutherske – i Danmark-Norge innførte kongen reformasjonen i 1536–37. **Calvins** lære slo rot i Sveits, Nederland og Skottland. I England brøt **Henrik 8.** med paven og laget sin egen kirke. Sør-Europa forble katolsk, og motreformasjonen vant tilbake blant annet Polen og Böhmen.",
          "After **Luther's 95 Theses in 1517** Western Europe split. Northern Germany and all of **the Nordic countries** became Lutheran – in Denmark-Norway the king introduced the Reformation in 1536–37. **Calvin's** teaching took root in Switzerland, the Netherlands and Scotland. In England **Henry VIII** broke with the Pope and created his own church. Southern Europe stayed Catholic, and the Counter-Reformation won back Poland and Bohemia, among others."] }
    ] }
};
// Avkoloniseringen: tidssteg lages fra selvstendighetsårene (0 = aldri kolonisert).
(() => {
  const Y = { EG: 1922, ET: 0, LR: 0, ZA: 1931, LY: 1951, SD: 1956, MA: 1956, TN: 1956, GH: 1957, GN: 1958, CM: 1960, SN: 1960, TG: 1960, ML: 1960, MG: 1960, CD: 1960, SO: 1960, SO_S: 1960, BJ: 1960, NE: 1960, BF: 1960,
    CI: 1960, TD: 1960, CF: 1960, CG: 1960, GA: 1960, NG: 1960, MR: 1960, SL: 1961, TZ: 1961, DZ: 1962, UG: 1962, RW: 1962, BI: 1962, KE: 1963, MW: 1964, ZM: 1964, GM: 1965, BW: 1966, LS: 1966, SZ: 1968, GQ: 1968,
    GW: 1974, AO: 1975, MZ: 1975, DJ: 1977, ZW: 1980, NA: 1990, ER: 1993, SS: 2011 };
  const steps = [[1945, "Etter andre verdenskrig var bare fire afrikanske land selvstendige: **Etiopia, Liberia, Egypt og Sør-Afrika** (styrt av et hvitt mindretall). Krigen hadde svekket kolonimaktene, og FN-pakten slo fast folkenes rett til selvbestemmelse.", "After the Second World War only four African countries were independent: **Ethiopia, Liberia, Egypt and South Africa** (ruled by a white minority). The war had weakened the colonial powers, and the UN Charter affirmed peoples' right to self-determination."],
    [1959, "Nord-Afrika (Libya, Marokko, Tunisia, Sudan) blir selvstendig, og **Ghana** blir i 1957 den første kolonien sør for Sahara som blir fri, ledet av Kwame Nkrumah.", "North Africa (Libya, Morocco, Tunisia, Sudan) becomes independent, and in 1957 **Ghana** becomes the first colony south of the Sahara to gain freedom, led by Kwame Nkrumah."],
    [1960, "**«Afrikas år» 1960:** 17 land blir selvstendige på ett år, de fleste tidligere franske kolonier, men også Nigeria, Somalia og Kongo.", "**\"The Year of Africa\" 1960:** 17 countries become independent in a single year, most of them former French colonies, but also Nigeria, Somalia and Congo."],
    [1968, "Britiske kolonier i Øst- og Sør-Afrika blir fri. **Algerie** vinner selvstendighet i 1962 etter en brutal krig mot Frankrike.", "British colonies in East and Southern Africa gain freedom. **Algeria** wins independence in 1962 after a brutal war against France."],
    [1980, "**Portugal** holdt lengst på koloniene og førte kolonikriger til diktaturet falt i 1974. Angola og Mosambik blir fri i 1975, Zimbabwe i 1980.", "**Portugal** held on longest and fought colonial wars until its dictatorship fell in 1974. Angola and Mozambique become free in 1975, Zimbabwe in 1980."],
    [2011, "**Namibia** blir fri fra Sør-Afrika i 1990, **apartheid** avskaffes i 1994, Eritrea løsriver seg i 1993 og **Sør-Sudan** blir verdens nyeste land i 2011. Vest-Sahara er fortsatt omstridt.", "**Namibia** becomes free from South Africa in 1990, **apartheid** ends in 1994, Eritrea breaks away in 1993 and **South Sudan** becomes the world's newest country in 2011. Western Sahara is still disputed."]];
  let prev = 0;
  MAPS.avkol.f = steps.map(([yr, nb, en]) => {
    const s = { IND: [], NEW: [], COL: [], DIS: ["EH"] };
    for(const [c, y] of Object.entries(Y)) (y > yr ? s.COL : prev && y > prev ? s.NEW : s.IND).push(c);
    prev = yr;
    return { y: [yr === 1945 ? "1945" : yr === 1959 ? "1950-årene" : String(yr), yr === 1945 ? "1945" : yr === 1959 ? "The 1950s" : String(yr)], s: Object.fromEntries(Object.entries(s).map(([g, l]) => [g, l.join(" ")])), d: [nb, en] };
  });
  // EU: medlemskap per utvidelse
  const EU = [[1958, "BE DE FR IT LU NL", "Seks land starter **Det europeiske økonomiske fellesskapet** (Romatraktaten 1957). Målet er fred gjennom tett økonomisk samarbeid – kull og stål skal ikke lenger brukes til krig.", "Six countries found **the European Economic Community** (Treaty of Rome 1957). The aim is peace through close economic cooperation – coal and steel are no longer to be used for war."],
    [1973, "DK IE GB", "Danmark, Irland og Storbritannia blir med. I Norge sier et flertall **nei** i folkeavstemningen i 1972.", "Denmark, Ireland and Britain join. In Norway a majority votes **no** in the 1972 referendum."],
    [1986, "GR ES PT", "Hellas, Spania og Portugal blir med etter at diktaturene deres har falt.", "Greece, Spain and Portugal join after their dictatorships have fallen."],
    [1995, "AT FI SE", "**Maastricht-traktaten** (1992) gjør fellesskapet til **EU**. Østerrike, Finland og Sverige blir med. Norge sier **nei igjen i 1994**, men blir en del av det indre markedet gjennom **EØS-avtalen**.", "**The Maastricht Treaty** (1992) turns the community into **the EU**. Austria, Finland and Sweden join. Norway says **no again in 1994** but joins the internal market through **the EEA Agreement**."],
    [2007, "CY CZ EE HU LV LT MT PL SK SI BG RO", "Den største utvidelsen: ti land i **2004**, de fleste tidligere østblokkland, og Bulgaria og Romania i 2007.", "The largest enlargement: ten countries in **2004**, most of them former Eastern Bloc states, and Bulgaria and Romania in 2007."],
    [2013, "HR", "Kroatia blir det 28. medlemmet.", "Croatia becomes the 28th member."],
    [2024, "", "**Storbritannia går ut** (brexit, 2020). EU har 27 medlemmer. Flere land på Balkan, samt Ukraina, Moldova og Georgia, er kandidatland.", "**Britain leaves** (Brexit, 2020). The EU has 27 members. Several Balkan countries, as well as Ukraine, Moldova and Georgia, are candidates."]];
  let mem = [];
  MAPS.eu.f = EU.map(([yr, add, nb, en], i) => {
    const neu = add ? add.split(" ") : []; const s = { EU: mem.join(" "), NEW: neu.join(" ") };
    if(yr >= 1995) s.EEA = "NO IS LI";
    if(yr === 2024){ mem = mem.filter(c => c !== "GB"); s.EU = mem.join(" "); s.LEFT = "GB"; s.CAND = "AL BA GE MD ME MK RS TR UA"; }
    mem = mem.concat(neu);
    return { y: [String(yr === 2007 ? "2004–2007" : yr === 1986 ? "1981–1986" : yr === 2024 ? "I dag" : yr), yr === 2007 ? "2004–2007" : yr === 1986 ? "1981–1986" : yr === 2024 ? "Today" : String(yr)], s, d: [nb, en],
      m: yr === 1995 ? [["oslo", "Nei til EU 1972 og 1994", "No to the EU 1972 and 1994"], ["maastricht", "Maastricht 1992", "Maastricht 1992"]] : yr === 1958 ? [["bryssel", "Brussel: hovedsete", "Brussels: headquarters"]] : undefined };
  });
})();
// Hvilke teorienheter som får kart, og hvor (før første overskrift som passer).
const MAP_UNITS = [["VGHIS", "Verdenskrigene", "ww1", /Hvem kjempet mot hvem|Who fought whom/i], ["VGHIS", "Verdenskrigene", "ww2", /^###?\s+(Sidene|The sides)/i], ["VGHIS", "Verdenskrigene", "ww2w", /^###?\s+(Forløpet|The course)/i],
  ["VGHIS", "Den kalde krigen og etterkrigstiden", "kald", /Viktige kriser|Key crises|Important crises/i], ["VGHIS", "Den kalde krigen og etterkrigstiden", "avkol", /Slutten på den kalde krigen|end of the Cold War/i],
  ["VGHIS", "Vikingtid og middelalder", "viking", /Plyndring, handel|Raiding, trade/i], ["VGHIS", "Reformasjon, opplysningstid og revolusjoner", "reform", /^##\s+(Eneveldet|Absolutism|Absolute)/i],
  ["VGREL", "Religion i Norge og verden", "religion", /^##\s+(Religion og livssyn i Norge|Religion and (life stances|worldviews) in Norway)/i], ["VGNOR", "Språkhistorie og målstrid", "sprak", /^##\s/],
  ["VGSAMF", "Internasjonal politikk", "eu", /^##\s+(EU og EØS|The EU and the EEA|EU and EEA)/i], ["VGSAMF", "Internasjonal politikk", "kolonier", /^##\s+(Nord og sør|North and south)/i]];
const MAP_MAP = {};
for(const [code, title, name, re] of MAP_UNITS){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) (MAP_MAP[code + ":" + u] ||= []).push([name, re]); }
function withMaps(code, u, src){
  const list = MAP_MAP[code + ":" + u]; if(!list || src.includes("![map:")) return src;
  const lines = src.split("\n");
  for(const [name, re] of list){
    let i = lines.findIndex((l, k) => k > 0 && re.test(l.trim()) && /^#/.test(l.trim()));
    if(i < 0) i = lines.findIndex((l, k) => k > 0 && /^##\s/.test(l.trim()) && !/^##\s+(Kort oppsummert|In short|Hva handler|What is it)/i.test(l.trim()));
    if(i < 0) lines.push("", "![map:" + name + "]"); else lines.splice(i, 0, "![map:" + name + "]", "");
  }
  return lines.join("\n");
}
// ---------- tilstand og tegning ----------
const MP_ST = {}; let mpSeq = 0;
function mpFrames(M){
  if(M._fills) return M._fills;
  let cur = {}; M._fills = M.f.map(fr => { cur = Object.assign({}, cur); for(const [g, list] of Object.entries(fr.s || {})) for(const c of String(list).split(/\s+/).filter(Boolean)) cur[c] = g; return cur; });
  return M._fills;
}
function mpVB(M){
  const G = MAP_GEO[M.v];
  if(!M.fit) return [0, 0, G.w, G.h];
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for(const c of M.fit.split(" ")){ const b = G.c[c] && G.c[c].b; if(b){ x0 = Math.min(x0, b[0]); y0 = Math.min(y0, b[1]); x1 = Math.max(x1, b[2]); y1 = Math.max(y1, b[3]); } }
  const m = Math.max(x1 - x0, y1 - y0) * 0.04; return [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m].map(Math.round);
}
const mpPt = (G, n) => G.p[n] || (G.c[n] && G.c[n].a) || null;
const mpName = (G, c) => G.c[c] ? T(G.c[c].n[0], G.c[c].n[1]) : c;
function mpSVG(st){
  const M = MAPS[st.id], G = MAP_GEO[M.v], fills = mpFrames(M)[st.k], fr = M.f[st.k], vb = mpVB(M), sc = vb[2] / 1000 * 2.4; // kartet vises ofte bare ~400 px bredt
  const col = c => { const g = fills[c]; return g && M.g[g] ? M.g[g][0] : null; };
  const q = st.quiz && st.quiz.cur;
  let paths = "";
  for(const [c, o] of Object.entries(G.c)){
    const fc = col(c), cls = "mp-c" + (fc ? " on" : "") + (st.sel === c ? " sel" : "") + (q && q.c === c ? " q" : "");
    paths += `<path class="${cls}" data-mpc="${c}" d="${o.d}"${fc ? ` style="fill:${fc}"` : ""}/>`;
  }
  // piler: myke kurver gjennom punktene, pilspiss i gruppens farge
  const defs = Object.entries(M.g).map(([g, v]) => `<marker id="mpa-${st.uid}-${g}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${v[0]}"/></marker>`).join("");
  const arrows = (fr.a || []).map(([g, route]) => {
    const pts = route.split(">").map(n => mpPt(G, n)).filter(Boolean); if(pts.length < 2) return "";
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for(let i = 1; i < pts.length; i++){ const [ax, ay] = pts[i - 1], [bx, by] = pts[i], mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay; d += ` Q${(mx - dy * 0.18).toFixed(1)} ${(my + dx * 0.18).toFixed(1)} ${bx} ${by}`; }
    const c = (M.g[g] || [MP_C.dark])[0];
    return `<path class="mp-arw" d="${d}" style="stroke:rgba(255,255,255,.9);stroke-width:${(8 * sc).toFixed(2)}"/><path class="mp-arw" d="${d}" style="stroke:${c};stroke-width:${(4.6 * sc).toFixed(2)}" marker-end="url(#mpa-${st.uid}-${g})"/>`;
  }).join("");
  // Etiketter: til høyre for punktet hvis det er plass, ellers til venstre, ellers under. Flyttes ned hvis de kolliderer med en tidligere etikett.
  const fs = 11.5 * sc, boxes = [], R = vb[0] + vb[2], B = vb[1] + vb[3];
  const marks = (fr.m || []).map(([p, nb, en]) => { const xy = mpPt(G, p); if(!xy) return ""; const label = T(nb, en), w = label.length * fs * 0.56, h = fs * 1.15;
    let x, anchor; if(xy[0] + 8 * sc + w < R){ x = xy[0] + 8 * sc; anchor = "start"; } else if(xy[0] - 8 * sc - w > vb[0]){ x = xy[0] - 8 * sc; anchor = "end"; } else { x = Math.min(R - w / 2 - 4 * sc, Math.max(vb[0] + w / 2 + 4 * sc, xy[0])); anchor = "middle"; }
    let y = anchor === "middle" ? xy[1] + fs * 1.4 : xy[1] + fs * 0.35;
    const box = () => { const x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2; return [x0, y - fs * 0.85, x0 + w, y - fs * 0.85 + h]; };
    for(let tries = 0; tries < 6 && boxes.some(b => { const a = box(); return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]; }); tries++) y += h;
    if(y > B - 4 * sc) y = B - 4 * sc; boxes.push(box());
    return `<g class="mp-mk"><circle cx="${xy[0]}" cy="${xy[1]}" r="${(3.2 * sc).toFixed(1)}" style="stroke-width:${(1.2 * sc).toFixed(1)}"/><text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" style="font-size:${fs.toFixed(1)}px;stroke-width:${(3 * sc).toFixed(1)}px">${esc(label)}</text></g>`; }).join("");
  return `<svg class="mp-svg" viewBox="${vb.join(" ")}" role="img" aria-label="${esc(T(M.t[0], M.t[1]))}"><defs>${defs}</defs><rect class="mp-sea" x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/>${paths}${arrows}${marks}</svg>`;
}
function mpInner(st){
  const M = MAPS[st.id], G = MAP_GEO[M.v], fr = M.f[st.k], fills = mpFrames(M)[st.k], quiz = st.quiz;
  const used = [...new Set(Object.values(fills))].filter(g => M.g[g]);
  const legend = used.map(g => `<button class="mp-lg ${quiz && quiz.cur && quiz.cur.picked === g ? (g === quiz.cur.g ? "ok" : "bad") : ""} ${quiz && quiz.cur && quiz.cur.picked && g === quiz.cur.g ? "ok" : ""}" ${quiz && quiz.cur && !quiz.cur.picked ? `data-mp="ans" data-g="${g}"` : "disabled"}><i style="background:${M.g[g][0]}"></i>${esc(T(M.g[g][1], M.g[g][2]))}</button>`).join("");
  const steps = M.f.length > 1 ? `<div class="mp-steps">${M.f.map((f, i) => `<button class="${i === st.k ? "on" : ""}" data-mp="go" data-k="${i}">${esc(T(f.y[0], f.y[1]))}</button>`).join("")}</div>` : "";
  let info = "";
  if(quiz){
    const q = quiz.cur;
    info = q ? `<div class="mp-quiz"><b>${esc(T(`Spørsmål ${quiz.n} av ${MP_QN}`, `Question ${quiz.n} of ${MP_QN}`))}:</b> ${esc(T("Hvilken gruppe hører det blinkende landet til?", "Which group does the flashing country belong to?"))} <em>${esc(mpName(G, q.c))}</em>
      ${q.picked ? `<p class="${q.picked === q.g ? "ok" : "bad"}">${q.picked === q.g ? "✓ " + esc(T("Riktig!", "Correct!")) : "✗ " + esc(T(`Riktig svar: ${M.g[q.g][1]}`, `Correct answer: ${M.g[q.g][2]}`))}</p><button class="big" data-mp="qnext">${esc(T(quiz.n >= MP_QN ? "Se resultat" : "Neste", quiz.n >= MP_QN ? "See result" : "Next"))}</button>` : ""}</div>`
      : `<div class="mp-quiz done"><b>${esc(T(`${quiz.right} av ${MP_QN} riktige`, `${quiz.right} of ${MP_QN} correct`))}</b>${quiz.xp ? ` · <span class="gd-xp">+${quiz.xp} XP</span>` : ""}<button class="big ghost" data-mp="quiz">${esc(T("Prøv igjen", "Try again"))}</button><button class="exlink" data-mp="qoff">${esc(T("Tilbake til kartet", "Back to the map"))}</button></div>`;
  } else if(st.sel){ const g = fills[st.sel]; info = `<p class="mp-info"><b>${esc(mpName(G, st.sel))}</b>${g && M.g[g] ? ` · <i style="background:${M.g[g][0]}"></i>${esc(T(M.g[g][1], M.g[g][2]))}` : ""}</p>`; }
  return `<div class="mp-h"><span class="mp-k">🗺️ ${esc(T("Kart", "Map"))}</span><b>${esc(T(M.t[0], M.t[1]))}</b></div>
    ${steps}<div class="mp-wrap">${mpSVG(st)}<span class="mp-year">${esc(T(fr.y[0], fr.y[1]))}</span></div>
    <div class="mp-ctl">${M.f.length > 1 ? `<button data-mp="prev" ${st.k ? "" : "disabled"} aria-label="${esc(T("Forrige", "Previous"))}">◀</button><button data-mp="play" class="${st.play ? "on" : ""}">${st.play ? "❚❚" : "▶"} ${esc(st.play ? T("Pause", "Pause") : T("Spill av", "Play"))}</button><button data-mp="next" ${st.k < M.f.length - 1 ? "" : "disabled"} aria-label="${esc(T("Neste", "Next"))}">▶</button>` : ""}
      ${quiz ? "" : `<button data-mp="quiz" class="mp-test">🎯 ${esc(T("Test deg", "Test yourself"))}</button>`}</div>
    <div class="mp-legend">${legend}</div>${info}
    ${quiz ? "" : `<div class="mp-desc">${rich(T(fr.d[0], fr.d[1])).replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>").replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:)]|$)/g, "$1<i>$2</i>")}</div>`}
    <p class="mp-note">${esc(T("Grensene er dagens – historiske riker er satt sammen av dagens land og er omtrentlige. Trykk på et land for navnet.", "Borders are today's – historical empires are built from today's countries and are approximate. Tap a country for its name."))}</p>`;
}
function mapHTML(name){
  if(!MAPS[name] || typeof MAP_GEO === "undefined") return "";
  const uid = "mp" + (++mpSeq); MP_ST[uid] = { id: name, uid, k: 0, sel: null, play: false, quiz: null };
  return `<div class="mp" data-mpid="${uid}">${mpInner(MP_ST[uid])}</div>`;
}
function mpRender(st){ const el = document.querySelector(`.mp[data-mpid="${st.uid}"]`); if(el) el.innerHTML = mpInner(st); else { st.play = false; clearInterval(st.timer); } }
// ---------- «Test deg» ----------
const MP_QN = 6;
function mpQuizNext(st){
  const M = MAPS[st.id], G = MAP_GEO[M.v], fills = mpFrames(M)[st.k], vb = mpVB(M), qz = st.quiz;
  const cand = Object.entries(fills).filter(([c, g]) => M.g[g] && G.c[c] && G.c[c].a && G.c[c].a[0] > vb[0] && G.c[c].a[0] < vb[0] + vb[2] && G.c[c].a[1] > vb[1] && G.c[c].a[1] < vb[1] + vb[3] && !qz.used.includes(c));
  if(!cand.length || qz.n >= MP_QN){ qz.cur = null; qz.xp = qz.right ? 2 + qz.right : 0; if(qz.xp && typeof awardXP === "function"){ awardXP(qz.xp); save(); } return; }
  // spør like ofte om hver gruppe, ikke bare de store
  const groups = [...new Set(cand.map(x => x[1]))], g = groups[Math.floor(Math.random() * groups.length)], pool = cand.filter(x => x[1] === g), [c] = pool[Math.floor(Math.random() * pool.length)];
  qz.n++; qz.used.push(c); qz.cur = { c, g, picked: null };
}
document.addEventListener("click", e => {
  const box = e.target.closest && e.target.closest(".mp"); if(!box) return;
  const st = MP_ST[box.dataset.mpid]; if(!st) return;
  const M = MAPS[st.id], b = e.target.closest("[data-mp]");
  if(!b){ const p = e.target.closest("[data-mpc]"); if(p && !st.quiz){ st.sel = st.sel === p.dataset.mpc ? null : p.dataset.mpc; mpRender(st); } return; }
  const a = b.dataset.mp;
  const stop = () => { st.play = false; clearInterval(st.timer); };
  if(a === "go"){ stop(); st.k = +b.dataset.k; }
  else if(a === "prev"){ stop(); st.k = Math.max(0, st.k - 1); }
  else if(a === "next"){ stop(); st.k = Math.min(M.f.length - 1, st.k + 1); }
  else if(a === "play"){
    if(st.play) stop();
    else { st.play = true; if(st.k >= M.f.length - 1) st.k = 0; else st.k++; st.timer = setInterval(() => { if(!st.play) return; if(st.k >= M.f.length - 1){ stop(); mpRender(st); return; } st.k++; mpRender(st); }, 4500); }
  }
  else if(a === "quiz"){ stop(); st.sel = null; st.quiz = { n: 0, right: 0, used: [], cur: null }; mpQuizNext(st); }
  else if(a === "ans" && st.quiz && st.quiz.cur && !st.quiz.cur.picked){ const q = st.quiz.cur; q.picked = b.dataset.g; if(q.picked === q.g) st.quiz.right++; if(typeof sfx === "function") sfx(q.picked === q.g ? "ok" : "bad"); if(typeof buzz === "function") buzz(q.picked === q.g); }
  else if(a === "qnext"){ mpQuizNext(st); }
  else if(a === "qoff"){ st.quiz = null; }
  mpRender(st);
});
