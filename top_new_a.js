// Teoribok – emnesider for enheter som ble lagt til de eldre fagene senere (add_units*.js m.fl.).
// Samme format som top_ref.js. Test: node tools/test_topics.js top_new_a.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- MAPE1300 4: Arbeid, energi og impuls ----------
TOPICS("MAPE1300", 4, [
{ id: "arbeid",
  fig: `<svg viewBox="0 0 240 140"><path d="M20 110H220" class="d"/><rect x="60" y="80" width="40" height="30" class="fill"/><path d="M100 95L170 60" class="a"/><path d="M170 60l-14 1 6 11z" class="af"/><path d="M130 95H175" class="dash"/><path d="M60 125H180M60 119v12M180 119v12" class="dim"/><text x="176" y="56">F</text><text x="120" y="102">θ</text><text x="115" y="135">s</text></svg>`,
  nb: O("Arbeid", "Arbeid er energi som overføres når en kraft flytter noe. Bare kraftkomponenten langs bevegelsen gjør arbeid. En kraft vinkelrett på bevegelsen, som normalkraften på et flatt gulv, gjør ikke noe arbeid.",
    [[R`W = F\,s\cos\theta`, "arbeid fra en konstant kraft"], [R`P = \frac{W}{t} = F\,v`, "effekt er arbeid per tid"]],
    [["W", "arbeid", "J"], ["F", "kraft", "N"], ["s", "strekning", "m"], [R`\theta`, "vinkel mellom kraft og bevegelse", "°"], ["P", "effekt", "W"]],
    R`Du drar en kasse 10 m med 50 N i 30° vinkel:
$W = 50\cdot 10\cdot\cos 30^\circ \approx 433$ J.`, "Kraft og bevegelse i samme retning gir positivt arbeid, motsatt retning (som friksjon) gir negativt arbeid."),
  en: O("Work", "Work is energy transferred when a force moves something. Only the force component along the motion does work. A force perpendicular to the motion, like the normal force on a flat floor, does no work.",
    [[R`W = F\,s\cos\theta`, "work done by a constant force"], [R`P = \frac{W}{t} = F\,v`, "power is work per time"]],
    [["W", "work", "J"], ["F", "force", "N"], ["s", "distance", "m"], [R`\theta`, "angle between force and motion", "°"], ["P", "power", "W"]],
    R`You pull a crate 10 m with 50 N at 30°:
$W = 50\cdot 10\cdot\cos 30^\circ \approx 433$ J.`, "Force and motion in the same direction give positive work, opposite directions (like friction) give negative work.") },
{ id: "energibevaring",
  nb: O("Energibevaring", "Energi kan ikke skapes eller forsvinne, bare gå over fra én form til en annen. Uten friksjon er summen av kinetisk og potensiell energi konstant. Med friksjon går en del over til varme, og den delen må tas med i regnskapet.",
    [[R`E_k = \tfrac12 m v^2`, "kinetisk energi"], [R`E_p = m g h`, "potensiell energi i tyngdefeltet"], [R`E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_f`, "energibevaring med friksjonsarbeid"]],
    [["m", "masse", "kg"], ["v", "fart", "m/s"], ["h", "høyde", "m"], ["g", "tyngdeakselerasjon", "m/s²"], ["W_f", "energi tapt til friksjon", "J"]],
    R`En ball slippes fra 5 m:
$mgh = \tfrac12 mv^2 \Rightarrow v = \sqrt{2\cdot 9{,}81\cdot 5} \approx 9{,}9$ m/s.`, "Velg nullnivå for høyden der det er enklest. Bare høydeforskjellen betyr noe."),
  en: O("Conservation of energy", "Energy cannot be created or destroyed, only changed from one form to another. Without friction the sum of kinetic and potential energy stays constant. With friction some of it turns into heat, and that part must be included.",
    [[R`E_k = \tfrac12 m v^2`, "kinetic energy"], [R`E_p = m g h`, "gravitational potential energy"], [R`E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_f`, "energy conservation with friction losses"]],
    [["m", "mass", "kg"], ["v", "speed", "m/s"], ["h", "height", "m"], ["g", "gravitational acceleration", "m/s²"], ["W_f", "energy lost to friction", "J"]],
    R`A ball is dropped from 5 m:
$mgh = \tfrac12 mv^2 \Rightarrow v = \sqrt{2\cdot 9{,}81\cdot 5} \approx 9{,}9$ m/s.`, "Put the zero level for height wherever it is easiest. Only the height difference matters.") },
{ id: "impuls",
  nb: O("Impuls og bevegelsesmengde", "Bevegelsesmengde er masse ganger fart. En kraft som virker en stund, endrer bevegelsesmengden, og produktet av kraft og tid kalles impuls. I et støt uten ytre krefter er den totale bevegelsesmengden bevart.",
    [[R`p = m v`, "bevegelsesmengde"], [R`F\,\Delta t = \Delta p`, "impulsloven"], [R`m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'`, "bevaring i et støt"]],
    [["p", "bevegelsesmengde", "kg·m/s"], ["F", "gjennomsnittlig kraft", "N"], [R`\Delta t`, "virketid", "s"], ["v'", "fart etter støtet", "m/s"]],
    R`En bil på 1000 kg i 20 m/s stopper på 0,5 s:
$F = \Delta p/\Delta t = 20\,000/0{,}5 = 40$ kN.`, "Lengre bremsetid gir mindre kraft. Det er derfor airbager og knusesoner redder liv."),
  en: O("Impulse and momentum", "Momentum is mass times velocity. A force acting for some time changes the momentum, and the product of force and time is called impulse. In a collision with no external forces the total momentum is conserved.",
    [[R`p = m v`, "momentum"], [R`F\,\Delta t = \Delta p`, "impulse-momentum theorem"], [R`m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'`, "conservation in a collision"]],
    [["p", "momentum", "kg·m/s"], ["F", "average force", "N"], [R`\Delta t`, "duration", "s"], ["v'", "velocity after the collision", "m/s"]],
    R`A 1000 kg car at 20 m/s stops in 0.5 s:
$F = \Delta p/\Delta t = 20\,000/0{,}5 = 40$ kN.`, "A longer stopping time gives a smaller force. That is why airbags and crumple zones save lives.") }
]);

// ---------- MEK1300 3: Filer, feil og moduler ----------
TOPICS("MEK1300", 3, [
{ id: "filer",
  nb: O("Lese og skrive filer", "Programmer trenger ofte å lagre data eller lese inn måledata. I Python åpner du en fil med open, og med with lukkes den automatisk når blokken er ferdig, også hvis noe går galt. Modus r leser, w skriver på nytt og a legger til på slutten.",
    [[R`\texttt{with open("data.txt") as f:}`, "åpne en fil trygt"], [R`\texttt{for linje in f:}`, "les linje for linje"], [R`\texttt{f.write(tekst + "\textbackslash n")}`, "skriv en linje (fil åpnet med w eller a)"]],
    [[R`\texttt{r}`, "les (standard)", ""], [R`\texttt{w}`, "skriv, sletter gammelt innhold", ""], [R`\texttt{a}`, "legg til på slutten", ""]],
    R`Summer tall fra en fil med ett tall per linje:
$\texttt{sum(float(x) for x in f)}$ inne i with-blokken.`, "Bruk alltid with. Da slipper du å huske å lukke fila."),
  en: O("Reading and writing files", "Programs often need to save data or read in measurements. In Python you open a file with open, and with closes it automatically when the block ends, even if something goes wrong. Mode r reads, w overwrites and a appends to the end.",
    [[R`\texttt{with open("data.txt") as f:}`, "open a file safely"], [R`\texttt{for line in f:}`, "read line by line"], [R`\texttt{f.write(text + "\textbackslash n")}`, "write a line (file opened with w or a)"]],
    [[R`\texttt{r}`, "read (default)", ""], [R`\texttt{w}`, "write, deletes old content", ""], [R`\texttt{a}`, "append to the end", ""]],
    R`Sum numbers from a file with one number per line:
$\texttt{sum(float(x) for x in f)}$ inside the with block.`, "Always use with. Then you never have to remember to close the file.") },
{ id: "unntak",
  nb: O("Feilhåndtering", "Når noe går galt under kjøring, kaster Python et unntak, for eksempel ValueError når tekst ikke kan gjøres om til tall. Med try og except fanger du unntaket og bestemmer selv hva som skal skje, i stedet for at programmet krasjer.",
    [[R`\texttt{try: ... except ValueError: ...}`, "fang en bestemt feiltype"], [R`\texttt{finally: ...}`, "kjøres alltid, med eller uten feil"], [R`\texttt{raise ValueError("...")}`, "kast en feil selv"]],
    [[R`\texttt{ValueError}`, "feil verdi, f.eks. int(\"abc\")", ""], [R`\texttt{ZeroDivisionError}`, "deling på null", ""], [R`\texttt{FileNotFoundError}`, "fila finnes ikke", ""]],
    R`Les et tall trygt fra brukeren:
$\texttt{try: x = float(s)}$, og ved $\texttt{except ValueError}$ spør du på nytt.`, "Fang så spesifikke feil som mulig. En tom except skjuler ekte programmeringsfeil."),
  en: O("Error handling", "When something goes wrong at run time, Python raises an exception, for example ValueError when text cannot be turned into a number. With try and except you catch the exception and decide what happens, instead of the program crashing.",
    [[R`\texttt{try: ... except ValueError: ...}`, "catch a specific error type"], [R`\texttt{finally: ...}`, "always runs, with or without an error"], [R`\texttt{raise ValueError("...")}`, "raise an error yourself"]],
    [[R`\texttt{ValueError}`, "bad value, e.g. int(\"abc\")", ""], [R`\texttt{ZeroDivisionError}`, "division by zero", ""], [R`\texttt{FileNotFoundError}`, "the file does not exist", ""]],
    R`Read a number safely from the user:
$\texttt{try: x = float(s)}$, and on $\texttt{except ValueError}$ ask again.`, "Catch errors as specifically as possible. A bare except hides real programming mistakes.") },
{ id: "moduler",
  nb: O("Moduler og import", "En modul er en fil med ferdige funksjoner du kan bruke i ditt eget program. Standardbiblioteket har mange, som math, random og csv. Du kan også lage egne moduler ved å legge funksjoner i en egen fil og importere den.",
    [[R`\texttt{import math}`, "importer hele modulen, bruk math.sqrt"], [R`\texttt{from math import sqrt, pi}`, "importer bestemte navn"], [R`\texttt{import numpy as np}`, "importer med et kortere navn"]],
    [[R`\texttt{math}`, "matematiske funksjoner", ""], [R`\texttt{random}`, "tilfeldige tall", ""], [R`\texttt{csv}`, "lese og skrive tabellfiler", ""]],
    R`Hypotenusen til en trekant med kateter 3 og 4:
$\texttt{math.hypot(3, 4)}$ gir 5,0.`, "Unngå from modul import *. Da vet du ikke hvor navnene kommer fra."),
  en: O("Modules and import", "A module is a file of ready-made functions you can use in your own program. The standard library has many, such as math, random and csv. You can also make your own modules by putting functions in a separate file and importing it.",
    [[R`\texttt{import math}`, "import the whole module, use math.sqrt"], [R`\texttt{from math import sqrt, pi}`, "import specific names"], [R`\texttt{import numpy as np}`, "import with a shorter name"]],
    [[R`\texttt{math}`, "mathematical functions", ""], [R`\texttt{random}`, "random numbers", ""], [R`\texttt{csv}`, "read and write table files", ""]],
    R`The hypotenuse of a triangle with legs 3 and 4:
$\texttt{math.hypot(3, 4)}$ gives 5.0.`, "Avoid from module import *. Then you no longer know where names come from.") }
]);

// ---------- MATS1600 3: Skrueforbindelser og sveis ----------
TOPICS("MATS1600", 3, [
{ id: "skruespenning",
  nb: O("Spenning i skruer", "En skrue som strammes, får en forspenningskraft som klemmer delene sammen. Spenningen regnes på spenningsarealet, som er litt mindre enn arealet av den ytre diameteren fordi gjengene tar plass. Skruen må ikke komme over flytegrensen.",
    [[R`\sigma = \frac{F}{A_s}`, "strekkspenning i skruen"], [R`F_{maks} = \frac{f_y\,A_s}{\gamma_M}`, "største tillatte kraft med materialfaktor"]],
    [[R`\sigma`, "spenning", "MPa"], ["F", "kraft i skruen", "N"], ["A_s", "spenningsareal", "mm²"], ["f_y", "flytegrense", "MPa"], [R`\gamma_M`, "materialfaktor", ""]],
    R`M12-skrue ($A_s = 84{,}3$ mm²) med 20 kN:
$\sigma = 20\,000/84{,}3 \approx 237$ MPa.`, "Bruk alltid spenningsarealet fra tabell, ikke arealet av nominell diameter."),
  en: O("Stress in bolts", "A tightened bolt gets a preload force that clamps the parts together. Stress is calculated on the tensile stress area, which is slightly smaller than the area of the outer diameter because the threads take up room. The bolt must stay below the yield strength.",
    [[R`\sigma = \frac{F}{A_s}`, "tensile stress in the bolt"], [R`F_{max} = \frac{f_y\,A_s}{\gamma_M}`, "largest allowed force with material factor"]],
    [[R`\sigma`, "stress", "MPa"], ["F", "force in the bolt", "N"], ["A_s", "tensile stress area", "mm²"], ["f_y", "yield strength", "MPa"], [R`\gamma_M`, "material factor", ""]],
    R`M12 bolt ($A_s = 84{,}3$ mm²) with 20 kN:
$\sigma = 20\,000/84{,}3 \approx 237$ MPa.`, "Always use the tensile stress area from a table, not the area of the nominal diameter.") },
{ id: "sveis",
  fig: `<svg viewBox="0 0 240 140"><path d="M30 100H210" class="b"/><path d="M110 100V25" class="b"/><path d="M110 100l-24 0 24-24z" class="fill"/><path d="M110 100l-12-12" class="dash"/><text x="78" y="86">a</text><path d="M180 60H130" class="a"/><path d="M130 60l12-6v12z" class="af"/><text x="186" y="64">F</text></svg>`,
  nb: O("Kilsveis", "En kilsveis har et trekantet tverrsnitt i hjørnet mellom to plater. Styrken regnes på a-målet, som er høyden i trekanten fra roten til overflaten. Kraften fordeles over sveisens lengde, og skjærspenningen må holde seg under tillatt verdi.",
    [[R`\tau = \frac{F}{a\,l}`, "skjærspenning i sveisen"], [R`A_w = a\,l`, "sveisens bæreareal"]],
    [[R`\tau`, "skjærspenning", "MPa"], ["F", "kraft", "N"], ["a", "a-mål (sveisens halsmål)", "mm"], ["l", "sveiselengde", "mm"]],
    R`To sveiser på 100 mm med $a = 5$ mm tar 60 kN:
$\tau = 60\,000/(2\cdot 5\cdot 100) = 60$ MPa.`, "Husk å telle alle sveisene som deler på kraften."),
  en: O("Fillet weld", "A fillet weld has a triangular cross-section in the corner between two plates. Its strength is based on the throat thickness a, the height of the triangle from the root to the surface. The force is spread over the weld length, and the shear stress must stay below the allowed value.",
    [[R`\tau = \frac{F}{a\,l}`, "shear stress in the weld"], [R`A_w = a\,l`, "load-bearing area of the weld"]],
    [[R`\tau`, "shear stress", "MPa"], ["F", "force", "N"], ["a", "throat thickness", "mm"], ["l", "weld length", "mm"]],
    R`Two 100 mm welds with $a = 5$ mm carry 60 kN:
$\tau = 60\,000/(2\cdot 5\cdot 100) = 60$ MPa.`, "Remember to count every weld that shares the force.") },
{ id: "friksjonsforbindelse",
  nb: O("Friksjonsforbindelse", "I en friksjonsforbindelse klemmer forspente skruer platene så hardt sammen at friksjonen tar lasten. Skruene tar da ikke skjær direkte. Kapasiteten avhenger av forspenningen, friksjonstallet og hvor mange flater som glir mot hverandre.",
    [[R`F_s = \mu\,n\,m\,F_p`, "kraften forbindelsen kan overføre"]],
    [["F_s", "overførbar kraft", "N"], [R`\mu`, "friksjonstall", ""], ["n", "antall skruer", ""], ["m", "antall glideflater", ""], ["F_p", "forspenning per skrue", "N"]],
    R`4 skruer, 2 glideflater, $\mu = 0{,}3$ og 50 kN forspenning:
$F_s = 0{,}3\cdot 4\cdot 2\cdot 50 = 120$ kN.`, "Rust, maling og olje på flatene kan gi mye lavere friksjon enn tabellverdien."),
  en: O("Slip-resistant joint", "In a slip-resistant joint, preloaded bolts clamp the plates together so hard that friction carries the load. The bolts then do not take shear directly. The capacity depends on the preload, the friction coefficient and how many surfaces slide against each other.",
    [[R`F_s = \mu\,n\,m\,F_p`, "force the joint can transfer"]],
    [["F_s", "transferable force", "N"], [R`\mu`, "friction coefficient", ""], ["n", "number of bolts", ""], ["m", "number of friction surfaces", ""], ["F_p", "preload per bolt", "N"]],
    R`4 bolts, 2 friction surfaces, $\mu = 0{,}3$ and 50 kN preload:
$F_s = 0{,}3\cdot 4\cdot 2\cdot 50 = 120$ kN.`, "Rust, paint and oil on the surfaces can give much lower friction than the table value.") }
]);

// ---------- MATS2100 3: Varmepumper og kjølemaskiner ----------
TOPICS("MATS2100", 3, [
{ id: "cop-varmepumpe",
  fig: `<svg viewBox="0 0 240 140"><rect x="90" y="45" width="60" height="50" class="fill"/><path d="M120 35V10" class="r"/><path d="M120 8l-6 12h12z" class="rf"/><path d="M120 130V105" class="g"/><path d="M120 105l-6 12h12z" class="gf"/><path d="M30 70H80" class="a"/><path d="M88 70l-12-6v12z" class="af"/><text x="128" y="24">Q<tspan dy="4" font-size="10">H</tspan></text><text x="128" y="126">Q<tspan dy="4" font-size="10">C</tspan></text><text x="40" y="62">W</text></svg>`,
  nb: O("Varmefaktor (COP)", "En varmepumpe flytter varme fra kald uteluft eller jord inn i huset. Den bruker elektrisk arbeid for å gjøre det, men leverer mye mer varme enn den bruker strøm. Forholdet mellom levert varme og brukt arbeid kalles varmefaktor eller COP.",
    [[R`COP_{VP} = \frac{Q_H}{W}`, "varmefaktor for varmepumpe"], [R`Q_H = Q_C + W`, "energibalanse"]],
    [["Q_H", "varme levert til huset", "J"], ["Q_C", "varme hentet fra kald side", "J"], ["W", "elektrisk arbeid", "J"]],
    R`Varmepumpa bruker 2 kWh strøm og henter 6 kWh fra lufta:
$Q_H = 8$ kWh og $COP = 8/2 = 4$.`, "COP synker når det er kaldt ute, fordi temperaturforskjellen blir større."),
  en: O("Coefficient of performance (COP)", "A heat pump moves heat from cold outdoor air or ground into the house. It uses electrical work to do so, but delivers much more heat than the electricity it uses. The ratio of delivered heat to work used is called the coefficient of performance, COP.",
    [[R`COP_{HP} = \frac{Q_H}{W}`, "COP of a heat pump"], [R`Q_H = Q_C + W`, "energy balance"]],
    [["Q_H", "heat delivered to the house", "J"], ["Q_C", "heat taken from the cold side", "J"], ["W", "electrical work", "J"]],
    R`The heat pump uses 2 kWh of electricity and takes 6 kWh from the air:
$Q_H = 8$ kWh and $COP = 8/2 = 4$.`, "COP drops when it is cold outside, because the temperature difference becomes larger.") },
{ id: "kjolefaktor",
  nb: O("Kjølefaktor", "Et kjøleskap er en varmepumpe som brukes baklengs: målet er å fjerne varme fra det kalde rommet. Nytten er da varmen som hentes ut, og kjølefaktoren er denne varmen delt på arbeidet kompressoren bruker.",
    [[R`COP_{K} = \frac{Q_C}{W}`, "kjølefaktor"], [R`COP_{VP} = COP_{K} + 1`, "sammenheng for samme maskin"]],
    [["Q_C", "varme fjernet fra kald side", "J"], ["W", "arbeid", "J"]],
    R`Et kjøleskap fjerner 300 J med 100 J arbeid:
$COP_K = 300/100 = 3$.`, "Varmefaktor og kjølefaktor for samme maskin skiller seg alltid med nøyaktig 1."),
  en: O("Refrigeration COP", "A refrigerator is a heat pump used the other way round: the goal is to remove heat from the cold space. The useful effect is the heat removed, and the refrigeration COP is that heat divided by the compressor work.",
    [[R`COP_{R} = \frac{Q_C}{W}`, "refrigeration COP"], [R`COP_{HP} = COP_{R} + 1`, "relation for the same machine"]],
    [["Q_C", "heat removed from the cold side", "J"], ["W", "work", "J"]],
    R`A fridge removes 300 J using 100 J of work:
$COP_R = 300/100 = 3$.`, "The heating and cooling COP of the same machine always differ by exactly 1.") },
{ id: "carnot-cop",
  nb: O("Carnot-grensen", "Ingen varmepumpe kan være bedre enn en ideell Carnot-maskin mellom de samme temperaturene. Grensen avhenger bare av temperaturene i kelvin. Jo mindre temperaturforskjell, desto høyere kan COP bli.",
    [[R`COP_{VP,maks} = \frac{T_H}{T_H - T_C}`, "høyeste mulige varmefaktor"], [R`COP_{K,maks} = \frac{T_C}{T_H - T_C}`, "høyeste mulige kjølefaktor"]],
    [["T_H", "varm temperatur", "K"], ["T_C", "kald temperatur", "K"]],
    R`Inne 20 °C (293 K), ute 0 °C (273 K):
$COP_{maks} = 293/20 \approx 14{,}7$. Ekte varmepumper ligger ofte rundt 3–4.`, "Regn alltid i kelvin. Med grader celsius blir svaret helt feil."),
  en: O("The Carnot limit", "No heat pump can be better than an ideal Carnot machine between the same temperatures. The limit depends only on the temperatures in kelvin. The smaller the temperature difference, the higher the COP can be.",
    [[R`COP_{HP,max} = \frac{T_H}{T_H - T_C}`, "highest possible heating COP"], [R`COP_{R,max} = \frac{T_C}{T_H - T_C}`, "highest possible cooling COP"]],
    [["T_H", "hot temperature", "K"], ["T_C", "cold temperature", "K"]],
    R`Inside 20 °C (293 K), outside 0 °C (273 K):
$COP_{max} = 293/20 \approx 14{,}7$. Real heat pumps are often around 3–4.`, "Always use kelvin. With degrees Celsius the answer is completely wrong.") }
]);

// ---------- ELPE1300 4: Trefase og effekt ----------
TOPICS("ELPE1300", 4, [
{ id: "linjespenning",
  nb: O("Fase- og linjespenning", "Et trefasenett har tre spenninger forskjøvet 120° i forhold til hverandre. Spenningen mellom en fase og nøytral kalles fasespenning, og spenningen mellom to faser kalles linjespenning. I stjernekobling er linjespenningen √3 ganger fasespenningen.",
    [[R`U_L = \sqrt{3}\,U_f`, "stjernekobling"], [R`I_L = \sqrt{3}\,I_f`, "trekantkobling (strømmene)"]],
    [["U_L", "linjespenning", "V"], ["U_f", "fasespenning", "V"], ["I_L", "linjestrøm", "A"], ["I_f", "fasestrøm", "A"]],
    R`Nett med 230 V fasespenning:
$U_L = \sqrt3\cdot 230 \approx 400$ V.`, "400 V og 230 V i norske nett er det samme nettet, målt mellom ulike punkter."),
  en: O("Phase and line voltage", "A three-phase system has three voltages shifted 120° from each other. The voltage between a phase and neutral is called phase voltage, and the voltage between two phases is called line voltage. In a star connection the line voltage is √3 times the phase voltage.",
    [[R`U_L = \sqrt{3}\,U_f`, "star connection"], [R`I_L = \sqrt{3}\,I_f`, "delta connection (currents)"]],
    [["U_L", "line voltage", "V"], ["U_f", "phase voltage", "V"], ["I_L", "line current", "A"], ["I_f", "phase current", "A"]],
    R`A network with 230 V phase voltage:
$U_L = \sqrt3\cdot 230 \approx 400$ V.`, "400 V and 230 V are the same network, measured between different points.") },
{ id: "trefaseeffekt",
  nb: O("Trefaseeffekt", "Effekten i en symmetrisk trefaselast regnes med linjespenning og linjestrøm. Effektfaktoren cos φ tar hensyn til at strøm og spenning ikke er i fase. Formelen gjelder både for stjerne- og trekantkobling.",
    [[R`P = \sqrt{3}\,U_L\,I_L\cos\varphi`, "aktiv effekt"], [R`S = \sqrt{3}\,U_L\,I_L`, "tilsynelatende effekt"]],
    [["P", "aktiv effekt", "W"], ["S", "tilsynelatende effekt", "VA"], [R`\cos\varphi`, "effektfaktor", ""]],
    R`Motor på 400 V, 10 A, $\cos\varphi = 0{,}85$:
$P = \sqrt3\cdot 400\cdot 10\cdot 0{,}85 \approx 5{,}9$ kW.`, "Bruk linjeverdier i formelen med √3. Fasemengder hører til formelen P = 3UfIf cos φ."),
  en: O("Three-phase power", "The power in a balanced three-phase load is calculated with line voltage and line current. The power factor cos φ accounts for current and voltage not being in phase. The formula holds for both star and delta connections.",
    [[R`P = \sqrt{3}\,U_L\,I_L\cos\varphi`, "active power"], [R`S = \sqrt{3}\,U_L\,I_L`, "apparent power"]],
    [["P", "active power", "W"], ["S", "apparent power", "VA"], [R`\cos\varphi`, "power factor", ""]],
    R`Motor at 400 V, 10 A, $\cos\varphi = 0{,}85$:
$P = \sqrt3\cdot 400\cdot 10\cdot 0{,}85 \approx 5{,}9$ kW.`, "Use line values in the formula with √3. Phase values belong to P = 3UfIf cos φ.") },
{ id: "fasekompensering",
  nb: O("Fasekompensering", "Motorer og andre induktive laster trekker reaktiv effekt, som gir lav effektfaktor og unødvendig stor strøm. Ved å koble kondensatorer i parallell leverer de den reaktive effekten lokalt. Da synker strømmen i nettet, og tapene går ned.",
    [[R`Q_C = P\,(\tan\varphi_1 - \tan\varphi_2)`, "reaktiv effekt kondensatorene må levere"], [R`\cos\varphi_2 > \cos\varphi_1`, "bedre effektfaktor etterpå"]],
    [["Q_C", "kondensatorbankens reaktive effekt", "kvar"], ["P", "aktiv effekt", "kW"], [R`\varphi_1,\ \varphi_2`, "fasevinkel før og etter", "°"]],
    R`$P = 50$ kW fra $\cos\varphi = 0{,}75$ til $0{,}95$:
$Q_C = 50\,(0{,}882 - 0{,}329) \approx 27{,}7$ kvar.`, "Kompenser nær lasten. Da slipper hele anlegget å frakte den reaktive strømmen."),
  en: O("Power factor correction", "Motors and other inductive loads draw reactive power, which gives a low power factor and unnecessarily large current. Capacitors connected in parallel supply the reactive power locally. The current in the network then drops, and so do the losses.",
    [[R`Q_C = P\,(\tan\varphi_1 - \tan\varphi_2)`, "reactive power the capacitors must supply"], [R`\cos\varphi_2 > \cos\varphi_1`, "better power factor afterwards"]],
    [["Q_C", "reactive power of the capacitor bank", "kvar"], ["P", "active power", "kW"], [R`\varphi_1,\ \varphi_2`, "phase angle before and after", "°"]],
    R`$P = 50$ kW from $\cos\varphi = 0.75$ to $0.95$:
$Q_C = 50\,(0.882 - 0.329) \approx 27.7$ kvar.`, "Correct close to the load. Then the rest of the installation does not have to carry the reactive current.") }
]);

// ---------- MEK1000 3: Anvendelser av derivasjon ----------
TOPICS("MEK1000", 3, [
{ id: "optimering",
  nb: O("Optimering", "Mange ingeniørproblemer handler om å finne det beste: minst materiale, størst volum eller lavest kostnad. Skriv størrelsen som en funksjon av én variabel, deriver og sett den deriverte lik null. Sjekk at løsningen faktisk er et maksimum eller minimum.",
    [[R`f'(x) = 0`, "kandidater til topp- og bunnpunkt"], [R`f''(x) < 0`, "toppunkt"], [R`f''(x) > 0`, "bunnpunkt"]],
    [["f(x)", "størrelsen som skal optimeres", ""], ["x", "variabelen du kan velge", ""]],
    R`Største rektangel med omkrets 20: $A = x(10 - x)$.
$A' = 10 - 2x = 0 \Rightarrow x = 5$, altså et kvadrat med $A = 25$.`, "Sjekk også endepunktene av intervallet. Der kan det største eller minste ligge."),
  en: O("Optimization", "Many engineering problems are about finding the best: least material, largest volume or lowest cost. Write the quantity as a function of one variable, differentiate and set the derivative to zero. Check that the solution really is a maximum or minimum.",
    [[R`f'(x) = 0`, "candidates for maxima and minima"], [R`f''(x) < 0`, "maximum"], [R`f''(x) > 0`, "minimum"]],
    [["f(x)", "quantity to optimize", ""], ["x", "the variable you can choose", ""]],
    R`Largest rectangle with perimeter 20: $A = x(10 - x)$.
$A' = 10 - 2x = 0 \Rightarrow x = 5$, a square with $A = 25$.`, "Also check the end points of the interval. The largest or smallest value may be there.") },
{ id: "relaterte-rater",
  nb: O("Relaterte rater", "Når to størrelser henger sammen og begge endrer seg med tiden, henger også endringsratene sammen. Deriver sammenhengen med hensyn på tiden med kjerneregelen, og sett inn de kjente verdiene til slutt.",
    [[R`\frac{dy}{dt} = \frac{dy}{dx}\cdot\frac{dx}{dt}`, "kjerneregelen for tidsrater"], [R`\frac{dA}{dt} = 2\pi r\,\frac{dr}{dt}`, "eksempel: areal av en voksende sirkel"]],
    [[R`\frac{dx}{dt}`, "hvor fort x endrer seg", ""], ["t", "tid", "s"]],
    R`En oljeflekk vokser med $dr/dt = 0{,}5$ m/s. Når $r = 4$ m:
$dA/dt = 2\pi\cdot 4\cdot 0{,}5 \approx 12{,}6$ m²/s.`, "Sett inn tallverdiene først etter at du har derivert."),
  en: O("Related rates", "When two quantities are linked and both change with time, their rates of change are linked too. Differentiate the relation with respect to time using the chain rule, and insert the known values at the end.",
    [[R`\frac{dy}{dt} = \frac{dy}{dx}\cdot\frac{dx}{dt}`, "chain rule for time rates"], [R`\frac{dA}{dt} = 2\pi r\,\frac{dr}{dt}`, "example: area of a growing circle"]],
    [[R`\frac{dx}{dt}`, "how fast x changes", ""], ["t", "time", "s"]],
    R`An oil slick grows with $dr/dt = 0{,}5$ m/s. When $r = 4$ m:
$dA/dt = 2\pi\cdot 4\cdot 0{,}5 \approx 12{,}6$ m²/s.`, "Insert the numbers only after you have differentiated.") },
{ id: "newtons-metode",
  nb: O("Newtons metode", "Mange ligninger kan ikke løses eksakt. Newtons metode starter i et gjett og følger tangenten ned til x-aksen for å få et bedre gjett. Metoden konvergerer svært raskt når du starter nær løsningen.",
    [[R`x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}`, "ett Newton-steg"]],
    [["x_n", "nåværende gjett", ""], ["f'(x_n)", "stigningen i gjettet", ""]],
    R`Løs $x^2 - 2 = 0$ fra $x_0 = 1$:
$x_1 = 1 - (-1)/2 = 1{,}5$ og $x_2 = 1{,}5 - 0{,}25/3 \approx 1{,}4167$.`, "Hvis f'(x) er nær null, kan steget bli enormt. Velg da et annet startpunkt."),
  en: O("Newton's method", "Many equations cannot be solved exactly. Newton's method starts from a guess and follows the tangent down to the x-axis to get a better guess. The method converges very fast when you start close to the solution.",
    [[R`x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}`, "one Newton step"]],
    [["x_n", "current guess", ""], ["f'(x_n)", "slope at the guess", ""]],
    R`Solve $x^2 - 2 = 0$ from $x_0 = 1$:
$x_1 = 1 - (-1)/2 = 1{,}5$ and $x_2 = 1{,}5 - 0{,}25/3 \approx 1{,}4167$.`, "If f'(x) is close to zero, the step can be huge. Then choose another starting point.") }
]);

// ---------- MEK2200 3: Regresjon og korrelasjon ----------
TOPICS("MEK2200", 3, [
{ id: "minste-kvadrater",
  fig: `<svg viewBox="0 0 240 140"><path d="M30 120H220M30 120V15" class="dim"/><path d="M40 108L210 30" class="a"/><circle cx="60" cy="96" r="3" class="gf"/><circle cx="90" cy="92" r="3" class="gf"/><circle cx="115" cy="70" r="3" class="gf"/><circle cx="145" cy="66" r="3" class="gf"/><circle cx="170" cy="42" r="3" class="gf"/><circle cx="195" cy="44" r="3" class="gf"/><path d="M90 92V85M145 66V60" class="dash"/><text x="212" y="133">x</text><text x="14" y="22">y</text></svg>`,
  nb: O("Minste kvadraters metode", "Regresjon finner linja som passer best til en punktsky. Minste kvadraters metode velger stigningstall og konstantledd slik at summen av de kvadrerte avvikene fra linja blir minst mulig. Linja går alltid gjennom punktet med gjennomsnittene.",
    [[R`\hat y = a + b x`, "regresjonslinja"], [R`b = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}`, "stigningstall"], [R`a = \bar y - b\bar x`, "konstantledd"]],
    [["b", "stigningstall", ""], ["a", "konstantledd", ""], [R`\bar x,\ \bar y`, "gjennomsnitt", ""]],
    R`Punktene (1, 2), (2, 4), (3, 5):
$\bar x = 2$, $b = 3/2 = 1{,}5$ og $a = 11/3 - 3 \approx 0{,}67$.`, "Bruk bare linja innenfor området du har data. Utenfor kan sammenhengen være helt annerledes."),
  en: O("Least squares", "Regression finds the line that best fits a scatter of points. The least squares method chooses the slope and intercept so that the sum of the squared deviations from the line is as small as possible. The line always passes through the point of the means.",
    [[R`\hat y = a + b x`, "regression line"], [R`b = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}`, "slope"], [R`a = \bar y - b\bar x`, "intercept"]],
    [["b", "slope", ""], ["a", "intercept", ""], [R`\bar x,\ \bar y`, "means", ""]],
    R`The points (1, 2), (2, 4), (3, 5):
$\bar x = 2$, $b = 3/2 = 1.5$ and $a = 11/3 - 3 \approx 0.67$.`, "Only use the line within the range of your data. Outside it the relationship may be completely different.") },
{ id: "korrelasjon",
  nb: O("Korrelasjonskoeffisient", "Korrelasjonskoeffisienten r måler hvor godt punktene følger en rett linje. Den ligger mellom −1 og 1. Verdier nær 1 eller −1 betyr sterk lineær sammenheng, og verdier nær 0 betyr svak eller ingen lineær sammenheng.",
    [[R`r = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sqrt{\sum (x_i - \bar x)^2\sum (y_i - \bar y)^2}}`, "Pearsons r"]],
    [["r", "korrelasjonskoeffisient", ""], [R`\bar x,\ \bar y`, "gjennomsnitt", ""]],
    R`$r = 0{,}95$ mellom temperatur og strømforbruk til kjøling: sterk positiv sammenheng.
$r = -0{,}9$ ville vært like sterk, men motsatt retning.`, "Korrelasjon er ikke årsak. Begge størrelsene kan styres av noe tredje."),
  en: O("Correlation coefficient", "The correlation coefficient r measures how closely the points follow a straight line. It lies between −1 and 1. Values near 1 or −1 mean a strong linear relationship, and values near 0 mean a weak or no linear relationship.",
    [[R`r = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sqrt{\sum (x_i - \bar x)^2\sum (y_i - \bar y)^2}}`, "Pearson's r"]],
    [["r", "correlation coefficient", ""], [R`\bar x,\ \bar y`, "means", ""]],
    R`$r = 0.95$ between temperature and power used for cooling: a strong positive relationship.
$r = -0.9$ would be just as strong, but in the opposite direction.`, "Correlation is not causation. Both quantities may be driven by something else.") },
{ id: "forklaringsgrad",
  nb: O("Forklaringsgrad R²", "Forklaringsgraden forteller hvor stor andel av variasjonen i y som regresjonsmodellen forklarer. Med én forklaringsvariabel er den kvadratet av korrelasjonskoeffisienten. Resten av variasjonen er støy eller andre forhold modellen ikke fanger.",
    [[R`R^2 = 1 - \frac{\sum (y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}`, "andel forklart variasjon"], [R`R^2 = r^2`, "for enkel lineær regresjon"]],
    [["R^2", "forklaringsgrad", ""], [R`\hat y_i`, "modellens verdi", ""], ["y_i", "målt verdi", ""]],
    R`$r = 0{,}9$ gir $R^2 = 0{,}81$:
modellen forklarer 81 % av variasjonen.`, "Høy R² betyr ikke at modellen er riktig. Se alltid på plottet av restene også."),
  en: O("Coefficient of determination", "The coefficient of determination tells how much of the variation in y the regression model explains. With one explanatory variable it is the square of the correlation coefficient. The rest of the variation is noise or factors the model does not capture.",
    [[R`R^2 = 1 - \frac{\sum (y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}`, "share of explained variation"], [R`R^2 = r^2`, "for simple linear regression"]],
    [["R^2", "coefficient of determination", ""], [R`\hat y_i`, "model value", ""], ["y_i", "measured value", ""]],
    R`$r = 0.9$ gives $R^2 = 0.81$:
the model explains 81 % of the variation.`, "A high R² does not mean the model is right. Always look at the plot of the residuals too.") }
]);

// ---------- STKD6610 2: Livsløp og klimaregnskap ----------
TOPICS("STKD6610", 2, [
{ id: "funksjonell-enhet",
  nb: O("Funksjonell enhet", "For å sammenligne to produkter rettferdig må utslippene regnes per nytte, ikke per produkt. Den funksjonelle enheten beskriver nytten, for eksempel én kilometer transport eller ett års bruk. Et produkt som varer dobbelt så lenge, deler utslippene på flere enheter.",
    [[R`e = \frac{E_{tot}}{N}`, "utslipp per funksjonell enhet"]],
    [["e", "utslipp per enhet", R`kg CO_2e`], ["E_{tot}", "samlet utslipp i livsløpet", R`kg CO_2e`], ["N", "antall funksjonelle enheter levert", ""]],
    R`Sykkel A: 150 kg CO₂e over 15 000 km. Sykkel B: 100 kg CO₂e over 5000 km.
A gir 10 g/km og B 20 g/km, så A er bedre selv om den har høyere totalutslipp.`, "Velg den funksjonelle enheten før du regner. Den avgjør ofte hvilket produkt som vinner."),
  en: O("Functional unit", "To compare two products fairly, emissions must be calculated per benefit, not per product. The functional unit describes the benefit, for example one kilometre of transport or one year of use. A product that lasts twice as long spreads its emissions over more units.",
    [[R`e = \frac{E_{tot}}{N}`, "emissions per functional unit"]],
    [["e", "emissions per unit", R`kg CO_2e`], ["E_{tot}", "total life cycle emissions", R`kg CO_2e`], ["N", "number of functional units delivered", ""]],
    R`Bike A: 150 kg CO₂e over 15,000 km. Bike B: 100 kg CO₂e over 5000 km.
A gives 10 g/km and B 20 g/km, so A is better even though its total is higher.`, "Choose the functional unit before calculating. It often decides which product wins.") },
{ id: "co2-ekvivalenter",
  nb: O("CO₂-ekvivalenter", "Ulike klimagasser varmer ulikt. For å kunne legge dem sammen regnes de om til CO₂-ekvivalenter med globalt oppvarmingspotensial (GWP). Metan varmer for eksempel rundt 28 ganger så mye som CO₂ over hundre år.",
    [[R`m_{CO_2e} = \sum m_i\cdot GWP_i`, "omregning til CO₂-ekvivalenter"]],
    [["m_i", "utslipp av gass i", "kg"], [R`GWP_i`, "oppvarmingspotensial (CO₂ = 1)", ""]],
    R`10 kg metan ($GWP = 28$) og 100 kg CO₂:
$10\cdot 28 + 100 = 380$ kg CO₂e.`, "Sjekk hvilken tidshorisont GWP-verdien gjelder for. Verdiene for 20 og 100 år er svært forskjellige."),
  en: O("CO₂ equivalents", "Different greenhouse gases warm differently. To add them up, they are converted to CO₂ equivalents using the global warming potential (GWP). Methane, for example, warms about 28 times as much as CO₂ over a hundred years.",
    [[R`m_{CO_2e} = \sum m_i\cdot GWP_i`, "conversion to CO₂ equivalents"]],
    [["m_i", "emission of gas i", "kg"], [R`GWP_i`, "warming potential (CO₂ = 1)", ""]],
    R`10 kg methane ($GWP = 28$) and 100 kg CO₂:
$10\cdot 28 + 100 = 380$ kg CO₂e.`, "Check which time horizon the GWP value is for. The 20-year and 100-year values differ greatly.") },
{ id: "utslippsfaktor",
  nb: O("Utslippsfaktorer", "Et klimaregnskap bygger på aktivitetsdata ganget med utslippsfaktorer. Aktiviteten kan være kilowattimer, liter drivstoff eller kilo stål. Utslippsfaktoren sier hvor mye CO₂e hver enhet gir, og den varierer mye mellom land og energikilder.",
    [[R`E = A\cdot EF`, "utslipp = aktivitet ganger utslippsfaktor"]],
    [["E", "utslipp", R`kg CO_2e`], ["A", "aktivitet", "kWh, l, kg …"], ["EF", "utslippsfaktor", R`kg CO_2e`]],
    R`1000 kWh strøm med 0,02 kg CO₂e/kWh:
$E = 1000\cdot 0{,}02 = 20$ kg CO₂e.`, "Samme strømforbruk kan gi ti ganger så høye utslipp i et land med kullkraft."),
  en: O("Emission factors", "A carbon account is built from activity data multiplied by emission factors. The activity can be kilowatt-hours, litres of fuel or kilograms of steel. The emission factor says how much CO₂e each unit gives, and it varies a lot between countries and energy sources.",
    [[R`E = A\cdot EF`, "emission = activity times emission factor"]],
    [["E", "emission", R`kg CO_2e`], ["A", "activity", "kWh, l, kg …"], ["EF", "emission factor", R`kg CO_2e`]],
    R`1000 kWh of electricity at 0.02 kg CO₂e/kWh:
$E = 1000\cdot 0{,}02 = 20$ kg CO₂e.`, "The same electricity use can give ten times higher emissions in a country with coal power.") }
]);

// ---------- ELFT2400 3: Stegrespons og førsteordens systemer ----------
TOPICS("ELFT2400", 3, [
{ id: "forsteordens",
  fig: `<svg viewBox="0 0 240 140"><path d="M30 120H220M30 120V15" class="dim"/><path d="M30 30H215" class="dash"/><path d="M30 120C60 70 90 45 130 36S190 31 215 30" class="a"/><path d="M78 120V63" class="dash"/><circle cx="78" cy="63" r="3" class="af"/><text x="72" y="133">τ</text><text x="11" y="34">K</text></svg>`,
  nb: O("Førsteordens system", "Et førsteordens system reagerer på et sprang med en jevn, eksponentiell overgang uten oversving. Eksempler er temperaturen i en tank eller spenningen over en kondensator. To tall beskriver det: forsterkningen K og tidskonstanten τ.",
    [[R`G(s) = \frac{K}{\tau s + 1}`, "overføringsfunksjon"], [R`y(t) = K\left(1 - e^{-t/\tau}\right)`, "respons på et enhetssprang"]],
    [["K", "stasjonær forsterkning", ""], [R`\tau`, "tidskonstant", "s"], ["t", "tid", "s"]],
    R`$K = 2$ og $\tau = 5$ s. Etter 5 s:
$y = 2(1 - e^{-1}) \approx 1{,}26$, altså 63 % av sluttverdien 2.`, "Etter én tidskonstant er systemet 63 % av veien fram. Etter fire er det praktisk talt framme."),
  en: O("First-order system", "A first-order system responds to a step with a smooth exponential transition and no overshoot. Examples are the temperature in a tank or the voltage across a capacitor. Two numbers describe it: the gain K and the time constant τ.",
    [[R`G(s) = \frac{K}{\tau s + 1}`, "transfer function"], [R`y(t) = K\left(1 - e^{-t/\tau}\right)`, "response to a unit step"]],
    [["K", "steady-state gain", ""], [R`\tau`, "time constant", "s"], ["t", "time", "s"]],
    R`$K = 2$ and $\tau = 5$ s. After 5 s:
$y = 2(1 - e^{-1}) \approx 1.26$, which is 63 % of the final value 2.`, "After one time constant the system is 63 % of the way there. After four it has practically arrived.") },
{ id: "innsvingningstid",
  nb: O("Stige- og innsvingningstid", "Hvor fort et system reagerer, beskrives med stigetid og innsvingningstid. For et førsteordens system følger begge direkte av tidskonstanten, så en halvert tidskonstant gir dobbelt så rask respons.",
    [[R`t_r \approx 2{,}2\,\tau`, "stigetid fra 10 % til 90 %"], [R`t_s \approx 4\,\tau`, "innsvingningstid til innenfor 2 %"]],
    [["t_r", "stigetid", "s"], ["t_s", "innsvingningstid", "s"], [R`\tau`, "tidskonstant", "s"]],
    R`$\tau = 3$ s:
$t_r \approx 6{,}6$ s og $t_s \approx 12$ s.`, "Tidskonstanten kan leses av en målt stegrespons: tiden til 63 % av endringen."),
  en: O("Rise and settling time", "How fast a system responds is described by the rise time and the settling time. For a first-order system both follow directly from the time constant, so halving the time constant gives a response twice as fast.",
    [[R`t_r \approx 2{,}2\,\tau`, "rise time from 10 % to 90 %"], [R`t_s \approx 4\,\tau`, "settling time to within 2 %"]],
    [["t_r", "rise time", "s"], ["t_s", "settling time", "s"], [R`\tau`, "time constant", "s"]],
    R`$\tau = 3$ s:
$t_r \approx 6{,}6$ s and $t_s \approx 12$ s.`, "The time constant can be read from a measured step response: the time to 63 % of the change.") },
{ id: "sluttverdi",
  nb: O("Sluttverditeoremet", "Sluttverditeoremet gir den stasjonære verdien direkte fra Laplace-uttrykket, uten å regne ut hele tidsresponsen. Det er nyttig for å finne stasjonært avvik i reguleringssystemer, men gjelder bare når systemet er stabilt.",
    [[R`\lim_{t\to\infty} y(t) = \lim_{s\to 0} s\,Y(s)`, "sluttverdien"], [R`Y(s) = G(s)\frac{1}{s}`, "respons på enhetssprang"]],
    [["Y(s)", "Laplace-transformen av utgangen", ""], ["G(s)", "overføringsfunksjon", ""]],
    R`$G(s) = \frac{4}{2s + 1}$ med enhetssprang:
$\lim_{s\to 0} s\cdot\frac{4}{2s+1}\cdot\frac1s = 4$.`, "Sjekk stabiliteten først. For et ustabilt system gir teoremet et tall som ikke betyr noe."),
  en: O("Final value theorem", "The final value theorem gives the steady-state value directly from the Laplace expression, without working out the whole time response. It is useful for finding steady-state error in control systems, but only holds when the system is stable.",
    [[R`\lim_{t\to\infty} y(t) = \lim_{s\to 0} s\,Y(s)`, "final value"], [R`Y(s) = G(s)\frac{1}{s}`, "response to a unit step"]],
    [["Y(s)", "Laplace transform of the output", ""], ["G(s)", "transfer function", ""]],
    R`$G(s) = \frac{4}{2s + 1}$ with a unit step:
$\lim_{s\to 0} s\cdot\frac{4}{2s+1}\cdot\frac1s = 4$.`, "Check stability first. For an unstable system the theorem gives a meaningless number.") }
]);

// ---------- FLUID 3: Pumper og rørsystemer ----------
TOPICS("FLUID", 3, [
{ id: "serie-parallell",
  nb: O("Pumper i serie og parallell", "Når én pumpe ikke er nok, kan flere kobles sammen. I serie går den samme vannstrømmen gjennom begge, og løftehøydene legges sammen. I parallell deler de strømmen, og volumstrømmene legges sammen ved samme løftehøyde.",
    [[R`H_{serie}(Q) = H_1(Q) + H_2(Q)`, "serie: høyde legges sammen"], [R`Q_{par}(H) = Q_1(H) + Q_2(H)`, "parallell: strøm legges sammen"]],
    [["H", "løftehøyde", "m"], ["Q", "volumstrøm", "m³/s"]],
    R`To like pumper med 20 m løftehøyde ved 10 L/s:
i serie gir de 40 m ved 10 L/s, i parallell 20 m ved 20 L/s (før systemkurven tas med).`, "Serie hjelper mot stor høyde, parallell hjelper mot stor vannmengde."),
  en: O("Pumps in series and parallel", "When one pump is not enough, several can be combined. In series the same flow passes through both, and the heads add up. In parallel they share the flow, and the flow rates add up at the same head.",
    [[R`H_{series}(Q) = H_1(Q) + H_2(Q)`, "series: heads add"], [R`Q_{par}(H) = Q_1(H) + Q_2(H)`, "parallel: flows add"]],
    [["H", "head", "m"], ["Q", "flow rate", "m³/s"]],
    R`Two identical pumps giving 20 m head at 10 L/s:
in series 40 m at 10 L/s, in parallel 20 m at 20 L/s (before the system curve is included).`, "Series helps with a large height, parallel helps with a large flow.") },
{ id: "systemkurve",
  fig: `<svg viewBox="0 0 240 140"><path d="M30 120H220M30 120V15" class="dim"/><path d="M30 30C90 32 150 48 210 95" class="a"/><path d="M30 80C90 76 150 60 210 25" class="g"/><circle cx="140" cy="57" r="4" class="rf"/><text x="210" y="133">Q</text><text x="12" y="22">H</text></svg>`,
  nb: O("Systemkurve og driftspunkt", "Rørsystemet krever en løftehøyde som øker med volumstrømmen, fordi friksjonstapet vokser omtrent med kvadratet av farten. Pumpekurven synker med volumstrømmen. Der de to kurvene krysser hverandre, ligger driftspunktet.",
    [[R`H_{sys} = H_s + k\,Q^2`, "systemkurve"], [R`H_{pumpe}(Q) = H_{sys}(Q)`, "driftspunktet"]],
    [["H_s", "statisk løftehøyde", "m"], ["k", "tapskoeffisient", "s²/m⁵"], ["Q", "volumstrøm", "m³/s"]],
    R`Pumpe $H = 30 - 5000Q^2$ og system $H = 10 + 15\,000Q^2$:
$20\,000Q^2 = 20 \Rightarrow Q \approx 0{,}032$ m³/s.`, "Endrer du ventilåpningen, endres systemkurven, ikke pumpekurven."),
  en: O("System curve and operating point", "The piping system needs a head that rises with flow rate, because friction losses grow roughly with the square of the velocity. The pump curve falls with flow rate. Where the two curves cross is the operating point.",
    [[R`H_{sys} = H_s + k\,Q^2`, "system curve"], [R`H_{pump}(Q) = H_{sys}(Q)`, "operating point"]],
    [["H_s", "static head", "m"], ["k", "loss coefficient", "s²/m⁵"], ["Q", "flow rate", "m³/s"]],
    R`Pump $H = 30 - 5000Q^2$ and system $H = 10 + 15\,000Q^2$:
$20\,000Q^2 = 20 \Rightarrow Q \approx 0.032$ m³/s.`, "Changing a valve opening changes the system curve, not the pump curve.") },
{ id: "npsh",
  nb: O("Kavitasjon og NPSH", "Hvis trykket på innløpet til pumpa blir for lavt, koker væsken og danner damp­bobler som faller sammen med stor kraft. Det kalles kavitasjon og ødelegger pumpehjulet. Tilgjengelig NPSH må være større enn det pumpa krever.",
    [[R`NPSH_A = \frac{p_{inn} - p_v}{\rho g}`, "tilgjengelig netto sugehøyde"], [R`NPSH_A > NPSH_R`, "krav for å unngå kavitasjon"]],
    [["p_{inn}", "totaltrykk ved innløpet", "Pa"], ["p_v", "damptrykk", "Pa"], [R`NPSH_R`, "pumpens krav (fra datablad)", "m"]],
    R`Vann ved 20 °C ($p_v \approx 2{,}3$ kPa), innløpstrykk 50 kPa:
$NPSH_A = 47\,700/9810 \approx 4{,}9$ m.`, "Plasser pumpa lavt og hold sugeledningen kort og vid for å få høy NPSH."),
  en: O("Cavitation and NPSH", "If the pressure at the pump inlet gets too low, the liquid boils and forms vapour bubbles that collapse violently. This is called cavitation and destroys the impeller. The available NPSH must be larger than what the pump requires.",
    [[R`NPSH_A = \frac{p_{in} - p_v}{\rho g}`, "net positive suction head available"], [R`NPSH_A > NPSH_R`, "requirement to avoid cavitation"]],
    [["p_{in}", "total pressure at the inlet", "Pa"], ["p_v", "vapour pressure", "Pa"], [R`NPSH_R`, "pump requirement (from data sheet)", "m"]],
    R`Water at 20 °C ($p_v \approx 2.3$ kPa), inlet pressure 50 kPa:
$NPSH_A = 47\,700/9810 \approx 4.9$ m.`, "Place the pump low and keep the suction line short and wide to get a high NPSH.") }
]);

// ---------- KJEMI 3: Gasslover ----------
TOPICS("KJEMI", 3, [
{ id: "idealgass",
  nb: O("Idealgassloven", "Idealgassloven kobler trykk, volum, stoffmengde og temperatur for en gass. Den stemmer godt for de fleste gasser ved vanlig trykk og temperatur. Temperaturen må alltid være i kelvin.",
    [[R`pV = nRT`, "idealgassloven"], [R`R = 8{,}314\ \tfrac{J}{mol\cdot K}`, "gasskonstanten"]],
    [["p", "trykk", "Pa"], ["V", "volum", "m³"], ["n", "stoffmengde", "mol"], ["T", "temperatur", "K"]],
    R`1 mol gass ved 0 °C og 101,3 kPa:
$V = nRT/p = 8{,}314\cdot 273/101\,300 \approx 0{,}0224$ m³ = 22,4 L.`, "Regn om til SI-enheter først: Pa, m³ og K."),
  en: O("The ideal gas law", "The ideal gas law connects pressure, volume, amount of substance and temperature for a gas. It holds well for most gases at ordinary pressure and temperature. The temperature must always be in kelvin.",
    [[R`pV = nRT`, "ideal gas law"], [R`R = 8{,}314\ \tfrac{J}{mol\cdot K}`, "gas constant"]],
    [["p", "pressure", "Pa"], ["V", "volume", "m³"], ["n", "amount of substance", "mol"], ["T", "temperature", "K"]],
    R`1 mol of gas at 0 °C and 101.3 kPa:
$V = nRT/p = 8{,}314\cdot 273/101\,300 \approx 0{,}0224$ m³ = 22.4 L.`, "Convert to SI units first: Pa, m³ and K.") },
{ id: "kombinert-gasslov",
  nb: O("Den kombinerte gassloven", "Når en fast mengde gass endrer tilstand, er forholdet pV/T det samme før og etter. Da kan du finne det nye trykket, volumet eller temperaturen uten å kjenne stoffmengden.",
    [[R`\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}`, "fast gassmengde"], [R`p_1 V_1 = p_2 V_2`, "Boyles lov (konstant temperatur)"]],
    [["p", "trykk", "Pa"], ["V", "volum", "m³"], ["T", "temperatur", "K"]],
    R`En sylinder med 2 L gass komprimeres til 0,5 L ved konstant temperatur:
trykket blir $2/0{,}5 = 4$ ganger så høyt.`, "Enhetene trenger bare å være like på begge sider, men temperaturen må være i kelvin."),
  en: O("The combined gas law", "When a fixed amount of gas changes state, the ratio pV/T is the same before and after. Then you can find the new pressure, volume or temperature without knowing the amount of substance.",
    [[R`\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}`, "fixed amount of gas"], [R`p_1 V_1 = p_2 V_2`, "Boyle's law (constant temperature)"]],
    [["p", "pressure", "Pa"], ["V", "volume", "m³"], ["T", "temperature", "K"]],
    R`A cylinder with 2 L of gas is compressed to 0.5 L at constant temperature:
the pressure becomes $2/0{,}5 = 4$ times higher.`, "The units only need to match on both sides, but temperature must be in kelvin.") },
{ id: "partialtrykk",
  nb: O("Partialtrykk", "I en gassblanding bidrar hver gass med sitt eget trykk, partialtrykket, som om den var alene i beholderen. Totaltrykket er summen av partialtrykkene. Partialtrykket er totaltrykket ganger molbrøken.",
    [[R`p_{tot} = p_1 + p_2 + \dots`, "Daltons lov"], [R`p_i = x_i\,p_{tot}`, "partialtrykk fra molbrøk"]],
    [["p_i", "partialtrykk av gass i", "Pa"], ["x_i", "molbrøk av gass i", ""]],
    R`Luft med 21 % oksygen ved 101 kPa:
$p_{O_2} = 0{,}21\cdot 101 \approx 21$ kPa.`, "Molbrøkene i en blanding summerer alltid til 1."),
  en: O("Partial pressure", "In a gas mixture each gas contributes its own pressure, the partial pressure, as if it were alone in the container. The total pressure is the sum of the partial pressures. A partial pressure is the total pressure times the mole fraction.",
    [[R`p_{tot} = p_1 + p_2 + \dots`, "Dalton's law"], [R`p_i = x_i\,p_{tot}`, "partial pressure from mole fraction"]],
    [["p_i", "partial pressure of gas i", "Pa"], ["x_i", "mole fraction of gas i", ""]],
    R`Air with 21 % oxygen at 101 kPa:
$p_{O_2} = 0.21\cdot 101 \approx 21$ kPa.`, "The mole fractions in a mixture always add up to 1.") }
]);

// ---------- GMAT 7: Innføring i derivasjon ----------
TOPICS("GMAT", 7, [
{ id: "vekstfart",
  nb: O("Gjennomsnittlig vekstfart", "Gjennomsnittlig vekstfart forteller hvor mye en funksjon endrer seg per enhet i gjennomsnitt over et intervall. Grafisk er det stigningstallet til linja gjennom to punkter på grafen, kalt en sekant.",
    [[R`\frac{\Delta y}{\Delta x} = \frac{f(b) - f(a)}{b - a}`, "gjennomsnittlig vekstfart fra a til b"]],
    [[R`\Delta y`, "endring i funksjonsverdi", ""], [R`\Delta x`, "endring i x", ""]],
    R`$f(x) = x^2$ fra $x = 1$ til $x = 3$:
$\frac{9 - 1}{3 - 1} = 4$.`, "Vekstfart har enhet: for eksempel meter per sekund eller kroner per år."),
  en: O("Average rate of change", "The average rate of change tells how much a function changes per unit on average over an interval. Graphically it is the slope of the line through two points on the graph, called a secant.",
    [[R`\frac{\Delta y}{\Delta x} = \frac{f(b) - f(a)}{b - a}`, "average rate of change from a to b"]],
    [[R`\Delta y`, "change in function value", ""], [R`\Delta x`, "change in x", ""]],
    R`$f(x) = x^2$ from $x = 1$ to $x = 3$:
$\frac{9 - 1}{3 - 1} = 4$.`, "A rate of change has units: for example metres per second or dollars per year.") },
{ id: "derivert-stigning",
  nb: O("Den deriverte", "Den deriverte er den momentane vekstfarten: stigningstallet til tangenten i ett punkt. Du får den ved å la intervallet i gjennomsnittlig vekstfart krympe mot null. Positiv derivert betyr at grafen stiger, negativ at den synker.",
    [[R`f'(x) = \lim_{h\to 0}\frac{f(x+h) - f(x)}{h}`, "definisjonen"], [R`y - f(a) = f'(a)(x - a)`, "tangenten i punktet a"]],
    [["f'(x)", "den deriverte", ""], ["h", "lite steg i x", ""]],
    R`$f(x) = x^2$: $f'(x) = 2x$, så i $x = 3$ er stigningen 6.
Tangenten: $y = 9 + 6(x - 3) = 6x - 9$.`, "Der den deriverte er null, har grafen en vannrett tangent: ofte et topp- eller bunnpunkt."),
  en: O("The derivative", "The derivative is the instantaneous rate of change: the slope of the tangent at one point. You get it by letting the interval in the average rate of change shrink towards zero. A positive derivative means the graph rises, negative that it falls.",
    [[R`f'(x) = \lim_{h\to 0}\frac{f(x+h) - f(x)}{h}`, "the definition"], [R`y - f(a) = f'(a)(x - a)`, "tangent at the point a"]],
    [["f'(x)", "the derivative", ""], ["h", "small step in x", ""]],
    R`$f(x) = x^2$: $f'(x) = 2x$, so at $x = 3$ the slope is 6.
Tangent: $y = 9 + 6(x - 3) = 6x - 9$.`, "Where the derivative is zero the graph has a horizontal tangent: often a maximum or minimum.") },
{ id: "potensregel",
  nb: O("Derivasjonsregler", "Med noen få regler kan du derivere alle polynomer. Potensregelen flytter eksponenten ned foran og trekker én fra eksponenten. Konstanter forsvinner, og en sum deriveres ledd for ledd.",
    [[R`(x^n)' = n x^{n-1}`, "potensregelen"], [R`(c\cdot f)' = c\cdot f'`, "konstant faktor"], [R`(f + g)' = f' + g'`, "sumregelen"]],
    [["n", "eksponent", ""], ["c", "konstant", ""]],
    R`$f(x) = 3x^4 - 2x + 7$:
$f'(x) = 12x^3 - 2$.`, "Konstantleddet (her 7) forsvinner alltid når du deriverer."),
  en: O("Differentiation rules", "With a few rules you can differentiate every polynomial. The power rule brings the exponent down in front and subtracts one from it. Constants disappear, and a sum is differentiated term by term.",
    [[R`(x^n)' = n x^{n-1}`, "power rule"], [R`(c\cdot f)' = c\cdot f'`, "constant factor"], [R`(f + g)' = f' + g'`, "sum rule"]],
    [["n", "exponent", ""], ["c", "constant", ""]],
    R`$f(x) = 3x^4 - 2x + 7$:
$f'(x) = 12x^3 - 2$.`, "The constant term (here 7) always disappears when you differentiate.") }
]);

// ---------- GMAT 8: Statistikk og sannsynlighet ----------
TOPICS("GMAT", 8, [
{ id: "gjennomsnitt-median",
  nb: O("Gjennomsnitt og median", "Gjennomsnitt og median beskriver hvor midten av et datasett ligger. Gjennomsnittet er summen delt på antallet. Medianen er verdien i midten når tallene er sortert, og den påvirkes lite av enkelte ekstreme verdier.",
    [[R`\bar x = \frac{1}{n}\sum_{i=1}^{n} x_i`, "gjennomsnitt"]],
    [[R`\bar x`, "gjennomsnitt", ""], ["n", "antall verdier", ""]],
    R`Lønninger 30, 32, 35, 36 og 200 (tusen kr):
gjennomsnitt 66,6 og median 35. Medianen gir et bedre bilde av det typiske.`, "Er det noen få svært store verdier, bruk medianen."),
  en: O("Mean and median", "The mean and the median describe where the middle of a data set lies. The mean is the sum divided by the count. The median is the middle value when the numbers are sorted, and it is barely affected by a few extreme values.",
    [[R`\bar x = \frac{1}{n}\sum_{i=1}^{n} x_i`, "mean"]],
    [[R`\bar x`, "mean", ""], ["n", "number of values", ""]],
    R`Salaries 30, 32, 35, 36 and 200 (thousand):
mean 66.6 and median 35. The median gives a better picture of the typical salary.`, "If there are a few very large values, use the median.") },
{ id: "standardavvik",
  nb: O("Standardavvik", "Standardavviket måler hvor mye verdiene sprer seg rundt gjennomsnittet. Lite standardavvik betyr at verdiene ligger tett samlet. I produksjon brukes det for å vurdere om en prosess er jevn nok.",
    [[R`s = \sqrt{\frac{1}{n-1}\sum (x_i - \bar x)^2}`, "standardavvik i et utvalg"]],
    [["s", "standardavvik", ""], [R`\bar x`, "gjennomsnitt", ""], ["n", "antall verdier", ""]],
    R`Målinger 4, 6 og 8: $\bar x = 6$.
$s = \sqrt{(4 + 0 + 4)/2} = 2$.`, "Standardavviket har samme enhet som dataene, i motsetning til variansen."),
  en: O("Standard deviation", "The standard deviation measures how much the values spread around the mean. A small standard deviation means the values lie close together. In production it is used to judge whether a process is consistent enough.",
    [[R`s = \sqrt{\frac{1}{n-1}\sum (x_i - \bar x)^2}`, "sample standard deviation"]],
    [["s", "standard deviation", ""], [R`\bar x`, "mean", ""], ["n", "number of values", ""]],
    R`Measurements 4, 6 and 8: $\bar x = 6$.
$s = \sqrt{(4 + 0 + 4)/2} = 2$.`, "The standard deviation has the same unit as the data, unlike the variance.") },
{ id: "sannsynlighet",
  nb: O("Sannsynlighet", "Når alle utfall er like sannsynlige, er sannsynligheten antall gunstige utfall delt på antall mulige. For uavhengige hendelser ganges sannsynlighetene, og sannsynligheten for at noe ikke skjer er én minus sannsynligheten for at det skjer.",
    [[R`P(A) = \frac{g}{m}`, "gunstige over mulige"], [R`P(A\cap B) = P(A)\,P(B)`, "uavhengige hendelser"], [R`P(\bar A) = 1 - P(A)`, "komplementet"]],
    [["P(A)", "sannsynligheten for A", ""], ["g", "antall gunstige utfall", ""], ["m", "antall mulige utfall", ""]],
    R`Minst én sekser på to terningkast:
$1 - (5/6)^2 = 11/36 \approx 0{,}31$.`, "«Minst én» regnes nesten alltid enklest med komplementet."),
  en: O("Probability", "When all outcomes are equally likely, the probability is the number of favourable outcomes divided by the number of possible outcomes. For independent events the probabilities multiply, and the probability that something does not happen is one minus the probability that it does.",
    [[R`P(A) = \frac{g}{m}`, "favourable over possible"], [R`P(A\cap B) = P(A)\,P(B)`, "independent events"], [R`P(\bar A) = 1 - P(A)`, "the complement"]],
    [["P(A)", "probability of A", ""], ["g", "number of favourable outcomes", ""], ["m", "number of possible outcomes", ""]],
    R`At least one six in two throws of a die:
$1 - (5/6)^2 = 11/36 \approx 0.31$.`, "\"At least one\" is almost always easiest with the complement.") }
]);

// ---------- GFYS 6: Bølger, lyd og lys ----------
TOPICS("GFYS", 6, [
{ id: "bolgeligning",
  fig: `<svg viewBox="0 0 240 140"><path d="M20 70H225" class="dim"/><path d="M20 70C40 30 60 30 80 70S120 110 140 70 180 30 200 70" class="a"/><path d="M50 22H170M50 16v12M170 16v12" class="d"/><path d="M50 40V100" class="dash"/><text x="104" y="15">λ</text><text x="206" y="44">A</text></svg>`,
  nb: O("Bølgeligningen", "En bølge flytter energi uten å flytte stoffet dit. Bølgelengden er avstanden mellom to topper, og frekvensen er antall topper som passerer per sekund. Farten er bølgelengden ganger frekvensen.",
    [[R`v = f\,\lambda`, "bølgeligningen"], [R`T = \frac{1}{f}`, "periode"]],
    [["v", "bølgefart", "m/s"], ["f", "frekvens", "Hz"], [R`\lambda`, "bølgelengde", "m"], ["T", "periode", "s"]],
    R`Lyd med 440 Hz i luft (343 m/s):
$\lambda = 343/440 \approx 0{,}78$ m.`, "Frekvensen bestemmes av kilden og endres ikke når bølgen går inn i et nytt stoff. Farten og bølgelengden gjør det."),
  en: O("The wave equation", "A wave moves energy without moving the material along with it. The wavelength is the distance between two crests, and the frequency is the number of crests passing per second. The speed is the wavelength times the frequency.",
    [[R`v = f\,\lambda`, "wave equation"], [R`T = \frac{1}{f}`, "period"]],
    [["v", "wave speed", "m/s"], ["f", "frequency", "Hz"], [R`\lambda`, "wavelength", "m"], ["T", "period", "s"]],
    R`Sound at 440 Hz in air (343 m/s):
$\lambda = 343/440 \approx 0.78$ m.`, "The frequency is set by the source and does not change when the wave enters a new medium. Speed and wavelength do.") },
{ id: "lydniva",
  nb: O("Lydnivå i desibel", "Øret oppfatter lyd over et enormt intensitetsområde, så lydnivå måles på en logaritmisk skala i desibel. En økning på 10 dB betyr ti ganger så stor intensitet, og tre desibel mer betyr omtrent dobbel intensitet.",
    [[R`L = 10\lg\frac{I}{I_0}`, "lydnivå"], [R`I_0 = 10^{-12}\ \tfrac{W}{m^2}`, "høreterskelen"]],
    [["L", "lydnivå", "dB"], ["I", "intensitet", "W/m²"], ["I_0", "referanseintensitet", "W/m²"]],
    R`To like maskiner på 80 dB hver:
$10\lg(2\cdot 10^8) \approx 83$ dB, ikke 160 dB.`, "Desibel kan ikke legges sammen direkte. Regn om til intensitet først."),
  en: O("Sound level in decibels", "The ear perceives sound over an enormous range of intensities, so sound level is measured on a logarithmic scale in decibels. An increase of 10 dB means ten times the intensity, and three decibels more means roughly double the intensity.",
    [[R`L = 10\lg\frac{I}{I_0}`, "sound level"], [R`I_0 = 10^{-12}\ \tfrac{W}{m^2}`, "threshold of hearing"]],
    [["L", "sound level", "dB"], ["I", "intensity", "W/m²"], ["I_0", "reference intensity", "W/m²"]],
    R`Two identical machines at 80 dB each:
$10\lg(2\cdot 10^8) \approx 83$ dB, not 160 dB.`, "Decibels cannot be added directly. Convert to intensity first.") },
{ id: "brytning",
  fig: `<svg viewBox="0 0 240 140"><path d="M20 70H220" class="d"/><path d="M120 15V125" class="dash"/><path d="M60 15L120 70" class="a"/><path d="M120 70L150 125" class="a"/><path d="M120 40a30 30 0 0 0-17-9" class="t"/><path d="M120 100a30 30 0 0 0 13 -5" class="t"/><text x="97" y="31">θ<tspan dy="4" font-size="10">1</tspan></text><text x="136" y="118">θ<tspan dy="4" font-size="10">2</tspan></text><text x="30" y="60">n<tspan dy="4" font-size="10">1</tspan></text><text x="30" y="92">n<tspan dy="4" font-size="10">2</tspan></text></svg>`,
  nb: O("Brytning", "Når lys går fra ett stoff til et annet, endrer det fart og bøyer av. Brytningsindeksen n sier hvor mye saktere lyset går enn i vakuum. Går lyset inn i et tettere stoff, bøyer det mot normalen.",
    [[R`n_1\sin\theta_1 = n_2\sin\theta_2`, "Snells lov"], [R`n = \frac{c}{v}`, "brytningsindeks"]],
    [["n", "brytningsindeks", ""], [R`\theta`, "vinkel fra normalen", "°"], ["c", "lysfarten i vakuum", "m/s"]],
    R`Lys fra luft ($n = 1$) inn i glass ($n = 1{,}5$) med 30°:
$\sin\theta_2 = \sin 30^\circ/1{,}5 \approx 0{,}33$, så $\theta_2 \approx 19^\circ$.`, "Vinklene måles alltid fra normalen, ikke fra overflaten."),
  en: O("Refraction", "When light passes from one material into another, it changes speed and bends. The refractive index n says how much slower light travels than in vacuum. When light enters a denser material, it bends towards the normal.",
    [[R`n_1\sin\theta_1 = n_2\sin\theta_2`, "Snell's law"], [R`n = \frac{c}{v}`, "refractive index"]],
    [["n", "refractive index", ""], [R`\theta`, "angle from the normal", "°"], ["c", "speed of light in vacuum", "m/s"]],
    R`Light from air ($n = 1$) into glass ($n = 1.5$) at 30°:
$\sin\theta_2 = \sin 30^\circ/1.5 \approx 0.33$, so $\theta_2 \approx 19^\circ$.`, "Angles are always measured from the normal, not from the surface.") }
]);
})();
