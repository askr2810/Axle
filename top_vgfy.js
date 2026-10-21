// Teoribok – emnesider for Fysikk 1 og Fysikk 2 (VGFY1, VGFY2), LK20, med regnesjekk (chk) fra start (AX-18).
// Test: node tools/test_topics.js top_vgfy.js og node tools/test_examples.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VGFY1 0: Bevegelse ----------
TOPICS("VGFY1", 0, [
{ id: "fart-akselerasjon", chk: ["150/6 ≈ 25", "(25-10)/5 ≈ 3"],
  nb: O("Fart og akselerasjon",
    R`Fart forteller hvor langt noe flytter seg per tidsenhet, og akselerasjon forteller hvor raskt farten endrer seg. Positiv akselerasjon betyr at farten øker, negativ at den minker. Enheten for fart er meter per sekund, og for akselerasjon meter per sekund i andre. Tiden må stå i sekunder og strekningen i meter. En fart oppgitt i kilometer per time deler du på 3,6 for å få meter per sekund.`,
    [[R`v = \frac{\Delta s}{\Delta t}`, "gjennomsnittsfart"], [R`a = \frac{\Delta v}{\Delta t}`, "gjennomsnittsakselerasjon"]],
    [["v", "fart", "m/s"], ["a", "akselerasjon", "m/s²"], ["\\Delta s", "strekning", "m"], ["\\Delta t", "tid", "s"]],
    R`En sykkel tilbakelegger 150 m på 6 s: $v = 150/6 = 25$ m/s.
Farten øker fra 10 m/s til 25 m/s på 5 s: $a = (25 - 10)/5 = 3$ m/s².`,
    R`Skriv alltid om til meter og sekunder før du setter inn i formlene.`),
  en: O("Speed and acceleration",
    R`Speed tells how far something moves per unit of time, and acceleration tells how quickly the speed changes. Positive acceleration means the speed increases, negative that it decreases. The unit of speed is meters per second, and of acceleration meters per second squared. Time must be in seconds and distance in meters. A speed given in kilometers per hour is divided by 3.6 to get meters per second.`,
    [[R`v = \frac{\Delta s}{\Delta t}`, "average speed"], [R`a = \frac{\Delta v}{\Delta t}`, "average acceleration"]],
    [["v", "speed", "m/s"], ["a", "acceleration", "m/s²"], ["\\Delta s", "distance", "m"], ["\\Delta t", "time", "s"]],
    R`A bicycle covers 150 m in 6 s: $v = 150/6 = 25$ m/s.
The speed rises from 10 m/s to 25 m/s in 5 s: $a = (25 - 10)/5 = 3$ m/s².`,
    R`Always convert to meters and seconds before substituting into the formulas.`) },
{ id: "bevegelseslikninger", chk: ["0+2*8 ≈ 16", "0.5*2*8^2 ≈ 64"],
  nb: O("Bevegelseslikningene",
    R`Når akselerasjonen er konstant, henger fart, strekning og tid sammen i bevegelseslikningene. Du trenger ikke alle fem størrelsene i hvert regnestykke. Skriv opp det du vet, se hvilken størrelse som mangler, og velg likningen som ikke inneholder den. Startfarten er farten ved tidspunktet du kaller null. Fra ro er startfarten null.`,
    [[R`v = v_0 + at`, "fart etter tiden t"], [R`s = v_0 t + \frac{1}{2}at^2`, "strekning med konstant akselerasjon"]],
    [["v_0", "startfart", "m/s"], ["v", "fart", "m/s"], ["a", "akselerasjon", "m/s²"], ["s", "strekning", "m"], ["t", "tid", "s"]],
    R`En bil starter fra ro og akselererer med 2 m/s² i 8 s.
$v = 0 + 2 \cdot 8 = 16$ m/s og $s = \frac{1}{2} \cdot 2 \cdot 8^2 = 64$ m.`,
    R`Kontroller at svaret har riktig enhet, og at farten øker når akselerasjonen og tiden er positive.`),
  en: O("Equations of motion",
    R`When the acceleration is constant, speed, distance and time are linked by the equations of motion. You do not need all five quantities in every calculation. Write down what you know, see which quantity is missing, and choose the equation that does not contain it. The initial speed is the speed at the instant you call zero. From rest the initial speed is zero.`,
    [[R`v = v_0 + at`, "speed after time t"], [R`s = v_0 t + \frac{1}{2}at^2`, "distance with constant acceleration"]],
    [["v_0", "initial speed", "m/s"], ["v", "speed", "m/s"], ["a", "acceleration", "m/s²"], ["s", "distance", "m"], ["t", "time", "s"]],
    R`A car starts from rest and accelerates at 2 m/s² for 8 s.
$v = 0 + 2 \cdot 8 = 16$ m/s and $s = \frac{1}{2} \cdot 2 \cdot 8^2 = 64$ m.`,
    R`Check that the answer has the right unit, and that the speed increases when the acceleration and the time are positive.`) },
{ id: "fritt-fall", chk: ["0.5*9.81*2^2 ≈ 19.62", "9.81*2 ≈ 19.62"],
  nb: O("Fritt fall",
    R`I fritt fall uten luftmotstand har alle legemer samme akselerasjon, tyngdeakselerasjonen. Nær jordoverflaten er den 9,81 meter per sekund i andre, rettet nedover. En stein som slippes, har startfart null, så både farten og strekningen følger av tiden alene. Luftmotstand gjør at lette legemer faller saktere enn formlene sier. Formlene gjelder best for kompakte legemer over korte fall.`,
    [[R`v = gt`, "fart etter fall fra ro"], [R`s = \frac{1}{2}gt^2`, "fallengde fra ro"]],
    [["g", "tyngdeakselerasjon, 9,81", "m/s²"], ["t", "falltid", "s"], ["s", "fallengde", "m"]],
    R`En stein slippes fra ro. Etter 2 s, uten luftmotstand:
$s = \frac{1}{2} \cdot 9{,}81 \cdot 2^2 = 19{,}62$ m og $v = 9{,}81 \cdot 2 = 19{,}62$ m/s.`,
    R`Velg positiv retning nedover når du regner fall, så blir både akselerasjon og fart positive.`),
  en: O("Free fall",
    R`In free fall without air resistance every body has the same acceleration, the acceleration of gravity. Near the Earth's surface it is 9.81 meters per second squared, directed downwards. A stone that is dropped has zero initial speed, so both the speed and the distance follow from the time alone. Air resistance makes light bodies fall more slowly than the formulas say. The formulas fit compact bodies over short drops best.`,
    [[R`v = gt`, "speed after a fall from rest"], [R`s = \frac{1}{2}gt^2`, "distance fallen from rest"]],
    [["g", "acceleration of gravity, 9.81", "m/s²"], ["t", "time of fall", "s"], ["s", "distance fallen", "m"]],
    R`A stone is dropped from rest. After 2 s, without air resistance:
$s = \frac{1}{2} \cdot 9{,}81 \cdot 2^2 = 19{,}62$ m and $v = 9{,}81 \cdot 2 = 19{,}62$ m/s.`,
    R`Choose downwards as the positive direction when calculating a fall, so both acceleration and speed are positive.`) }
]);

// ---------- VGFY1 1: Krefter og Newtons lover ----------
TOPICS("VGFY1", 1, [
{ id: "newtons-2", chk: ["40/8 ≈ 5"],
  nb: O("Newtons 2. lov",
    R`Newtons andre lov sier at summen av kreftene på et legeme er lik massen ganger akselerasjonen. Kraft og akselerasjon peker samme vei. Er summen null, er akselerasjonen null, og farten er konstant. Det er innholdet i den første loven. Massen står i kilogram og kraften i newton. Tegn kreftene først, finn summen langs bevegelsen, og del på massen.`,
    [[R`\sum F = ma`, "Newtons 2. lov"]],
    [["\\sum F", "summen av kreftene", "N"], ["m", "masse", "kg"], ["a", "akselerasjon", "m/s²"]],
    R`Summen av kreftene på en kasse er 40 N, og massen er 8 kg.
$a = 40/8 = 5$ m/s² i kraftens retning.`,
    R`Krefter som virker mot bevegelsen, setter du inn med negativt fortegn når positiv retning er bevegelsesretningen.`),
  en: O("Newton's second law",
    R`Newton's second law says that the sum of the forces on a body equals the mass times the acceleration. Force and acceleration point the same way. If the sum is zero, the acceleration is zero and the velocity is constant. That is the content of the first law. Mass is in kilograms and force in newtons. Draw the forces first, find the sum along the motion, and divide by the mass.`,
    [[R`\sum F = ma`, "Newton's second law"]],
    [["\\sum F", "sum of the forces", "N"], ["m", "mass", "kg"], ["a", "acceleration", "m/s²"]],
    R`The sum of the forces on a box is 40 N, and the mass is 8 kg.
$a = 40/8 = 5$ m/s² in the direction of the force.`,
    R`Forces that act against the motion are entered with a negative sign when the positive direction is the direction of motion.`) },
{ id: "tyngde", chk: ["70*9.81 ≈ 686.7"],
  nb: O("Tyngde",
    R`Tyngden er gravitasjonskraften på et legeme. Den er massen ganger tyngdeakselerasjonen, og den peker mot jordas sentrum. Massen er den samme overalt, men tyngden er litt mindre på et høyt fjell og mye mindre på Månen, fordi tyngdeakselerasjonen der er mindre. I oppgaver nær jordoverflaten bruker vi 9,81 meter per sekund i andre. Ikke bland sammen masse i kilogram og tyngde i newton.`,
    [[R`G = mg`, "tyngde"]],
    [["G", "tyngde", "N"], ["m", "masse", "kg"], ["g", "tyngdeakselerasjon, 9,81", "m/s²"]],
    R`En person har masse 70 kg.
$G = 70 \cdot 9{,}81 = 686{,}7$ N.`,
    R`På en badevekt leser du egentlig en kraft. Tallet i kilogram er massen som har den tyngden.`),
  en: O("Weight",
    R`Weight is the gravitational force on a body. It is the mass times the acceleration of gravity, and it points towards the centre of the Earth. The mass is the same everywhere, but the weight is a little smaller on a high mountain and much smaller on the Moon, because the acceleration of gravity there is smaller. In problems near the Earth's surface we use 9.81 meters per second squared. Do not mix up mass in kilograms and weight in newtons.`,
    [[R`G = mg`, "weight"]],
    [["G", "weight", "N"], ["m", "mass", "kg"], ["g", "acceleration of gravity, 9.81", "m/s²"]],
    R`A person has a mass of 70 kg.
$G = 70 \cdot 9{,}81 = 686{,}7$ N.`,
    R`A bathroom scale really reads a force. The number in kilograms is the mass that has that weight.`) },
{ id: "friksjon", chk: ["0.3*20*9.81 ≈ 58.86"],
  nb: O("Friksjon",
    R`Friksjon virker langs kontaktflaten og motsetter seg glidning. På et vannrett underlag er normalkraften like stor som tyngden, og friksjonskraften er friksjonstallet ganger normalkraften. Friksjonstallet har ingen enhet. Det er større for ru flater enn for glatte, og det kan være ulikt om legemet hviler eller allerede glir. Uten friksjon ville en kasse på is ikke stoppe av seg selv.`,
    [[R`R = \mu N`, "friksjonskraft"], [R`N = mg`, "normalkraft på vannrett underlag"]],
    [["R", "friksjonskraft", "N"], ["\\mu", "friksjonstall", ""], ["N", "normalkraft", "N"]],
    R`En kasse på 20 kg skyves på et vannrett gulv med friksjonstall 0,3.
$R = 0{,}3 \cdot 20 \cdot 9{,}81 = 58{,}86$ N.`,
    R`Friksjonen har en øvre grense. En større skyvkraft enn den får kassen til å gli.`),
  en: O("Friction",
    R`Friction acts along the contact surface and opposes sliding. On a horizontal surface the normal force equals the weight, and the friction force is the coefficient of friction times the normal force. The coefficient has no unit. It is larger for rough surfaces than for smooth ones, and it can differ depending on whether the body is at rest or already sliding. Without friction a box on ice would not stop by itself.`,
    [[R`R = \mu N`, "friction force"], [R`N = mg`, "normal force on a horizontal surface"]],
    [["R", "friction force", "N"], ["\\mu", "coefficient of friction", ""], ["N", "normal force", "N"]],
    R`A 20 kg box is pushed on a horizontal floor with coefficient of friction 0.3.
$R = 0{,}3 \cdot 20 \cdot 9{,}81 = 58{,}86$ N.`,
    R`Friction has an upper limit. A push larger than that makes the box slide.`) }
]);

// ---------- VGFY1 2: Energi og arbeid ----------
TOPICS("VGFY1", 2, [
{ id: "kinetisk-energi", chk: ["0.5*2*6^2 ≈ 36"],
  nb: O("Kinetisk energi",
    R`Kinetisk energi er bevegelsesenergi. Den vokser med massen og med kvadratet av farten, så dobbel fart gir fire ganger så mye energi. Enheten er joule. Energien er den samme uansett hvilken vei farten peker, fordi farten er kvadrert. Når du bremser, blir kinetisk energi til varme i bremser og dekk. Regn farten i meter per sekund, ikke i kilometer per time.`,
    [[R`E_k = \frac{1}{2}mv^2`, "kinetisk energi"]],
    [["E_k", "kinetisk energi", "J"], ["m", "masse", "kg"], ["v", "fart", "m/s"]],
    R`Et legeme på 2 kg har farten 6 m/s.
$E_k = \frac{1}{2} \cdot 2 \cdot 6^2 = 36$ J.`,
    R`Øker farten fra 10 m/s til 20 m/s, blir energien fire ganger så stor, ikke dobbelt så stor.`),
  en: O("Kinetic energy",
    R`Kinetic energy is the energy of motion. It grows with the mass and with the square of the speed, so double the speed gives four times the energy. The unit is the joule. The energy is the same no matter which way the velocity points, because the speed is squared. When you brake, kinetic energy becomes heat in the brakes and the tyres. Use the speed in meters per second, not in kilometers per hour.`,
    [[R`E_k = \frac{1}{2}mv^2`, "kinetic energy"]],
    [["E_k", "kinetic energy", "J"], ["m", "mass", "kg"], ["v", "speed", "m/s"]],
    R`A body of 2 kg has a speed of 6 m/s.
$E_k = \frac{1}{2} \cdot 2 \cdot 6^2 = 36$ J.`,
    R`If the speed rises from 10 m/s to 20 m/s, the energy becomes four times as large, not twice as large.`) },
{ id: "fall-energi", chk: ["2*9.81*5 ≈ 98.1", "sqrt(2*9.81*5) ≈ 9.90"],
  nb: O("Potensiell energi og fall",
    R`Potensiell energi i tyngdefeltet er energien et legeme har på grunn av høyden. Vi kan velge hvor høyden er null. Uten friksjon og luftmotstand er summen av kinetisk og potensiell energi konstant. Slippes et legeme fra ro, er all den potensielle energien blitt kinetisk rett før det når bunnen. Da kan farten regnes ut uten å kjenne tiden.`,
    [[R`E_p = mgh`, "potensiell energi"], [R`v = \sqrt{2gh}`, "fart etter fall fra ro"]],
    [["E_p", "potensiell energi", "J"], ["h", "høyde", "m"], ["g", "tyngdeakselerasjon, 9,81", "m/s²"]],
    R`En ball på 2 kg holdes 5 m over bakken og slippes.
$E_p = 2 \cdot 9{,}81 \cdot 5 = 98{,}1$ J og $v = \sqrt{2 \cdot 9{,}81 \cdot 5} \approx 9{,}90$ m/s.`,
    R`Luftmotstand tar energi, så den virkelige farten blir litt lavere enn formelen sier.`),
  en: O("Potential energy and falling",
    R`Potential energy in the gravitational field is the energy a body has because of its height. We may choose where the height is zero. Without friction and air resistance the sum of kinetic and potential energy is constant. If a body is dropped from rest, all of that potential energy has become kinetic just before it reaches the bottom. The speed can then be found without knowing the time.`,
    [[R`E_p = mgh`, "potential energy"], [R`v = \sqrt{2gh}`, "speed after a fall from rest"]],
    [["E_p", "potential energy", "J"], ["h", "height", "m"], ["g", "acceleration of gravity, 9.81", "m/s²"]],
    R`A ball of 2 kg is held 5 m above the ground and dropped.
$E_p = 2 \cdot 9{,}81 \cdot 5 = 98{,}1$ J and $v = \sqrt{2 \cdot 9{,}81 \cdot 5} \approx 9{,}90$ m/s.`,
    R`Air resistance takes energy, so the real speed is a little lower than the formula says.`) },
{ id: "arbeid-effekt", chk: ["50*12 ≈ 600", "600/4 ≈ 150"],
  nb: O("Arbeid og effekt",
    R`Arbeid er energi som en kraft overfører når den virker langs en vei. Står kraften vinkelrett på veien, er arbeidet null. Effekt er arbeid per tid, og enheten er watt, som er joule per sekund. En stor effekt betyr at energien overføres raskt, ikke at den totale energien er stor. En svak motor kan utføre det samme arbeidet som en sterk, men den bruker lengre tid.`,
    [[R`W = Fs`, "arbeid når kraften er parallell med veien"], [R`P = \frac{W}{t}`, "effekt"]],
    [["W", "arbeid", "J"], ["F", "kraft", "N"], ["s", "vei", "m"], ["P", "effekt", "W"], ["t", "tid", "s"]],
    R`En kraft på 50 N drar en kasse 12 m langs gulvet, parallelt med veien, på 4 s.
$W = 50 \cdot 12 = 600$ J og $P = 600/4 = 150$ W.`,
    R`Virkningsgraden er nyttig energi delt på tilført energi. Den er alltid under 1 når det er friksjon eller varme.`),
  en: O("Work and power",
    R`Work is energy that a force transfers when it acts along a path. If the force is perpendicular to the path, the work is zero. Power is work per time, and the unit is the watt, which is a joule per second. A large power means that the energy is transferred quickly, not that the total energy is large. A weak motor can do the same work as a strong one, but it takes longer.`,
    [[R`W = Fs`, "work when the force is parallel to the path"], [R`P = \frac{W}{t}`, "power"]],
    [["W", "work", "J"], ["F", "force", "N"], ["s", "path", "m"], ["P", "power", "W"], ["t", "time", "s"]],
    R`A force of 50 N pulls a box 12 m along the floor, parallel to the path, in 4 s.
$W = 50 \cdot 12 = 600$ J and $P = 600/4 = 150$ W.`,
    R`Efficiency is useful energy divided by energy supplied. It is always below 1 when there is friction or heat.`) }
]);

// ---------- VGFY1 3: Elektrisitet ----------
TOPICS("VGFY1", 3, [
{ id: "ohms-lov", chk: ["12/4 ≈ 3", "12*3 ≈ 36"],
  nb: O("Ohms lov",
    R`Spenning driver ladning gjennom en leder, og resistansen forteller hvor sterkt lederen motsetter seg strømmen. Ohms lov knytter de tre størrelsene sammen for en ohmsk motstand, der strømmen er proporsjonal med spenningen. Effekten er energien som omsettes per sekund, og den kan regnes som spenning ganger strøm. Enheten for spenning er volt, for strøm ampere og for resistans ohm.`,
    [[R`U = RI`, "Ohms lov"], [R`P = UI`, "elektrisk effekt"]],
    [["U", "spenning", "V"], ["R", "resistans", "Ω"], ["I", "strøm", "A"], ["P", "effekt", "W"]],
    R`En motstand på 4 Ω kobles til 12 V.
$I = 12/4 = 3$ A og $P = 12 \cdot 3 = 36$ W.`,
    R`En større resistans ved samme spenning gir mindre strøm, ikke større.`),
  en: O("Ohm's law",
    R`Voltage drives charge through a conductor, and the resistance tells how strongly the conductor opposes the current. Ohm's law links the three quantities for an ohmic resistor, where the current is proportional to the voltage. Power is the energy converted per second, and it can be found as voltage times current. The unit of voltage is the volt, of current the ampere and of resistance the ohm.`,
    [[R`U = RI`, "Ohm's law"], [R`P = UI`, "electric power"]],
    [["U", "voltage", "V"], ["R", "resistance", "\\Omega"], ["I", "current", "A"], ["P", "power", "W"]],
    R`A resistor of 4 Ω is connected to 12 V.
$I = 12/4 = 3$ A and $P = 12 \cdot 3 = 36$ W.`,
    R`A larger resistance at the same voltage gives a smaller current, not a larger one.`) },
{ id: "serie-parallell", chk: ["6+3 ≈ 9", "1/(1/6+1/3) ≈ 2"],
  nb: O("Serie og parallell",
    R`I en seriekobling går den samme strømmen gjennom alle komponentene, og spenningene legger seg sammen. Samlet resistans er summen. I en parallellkobling ligger den samme spenningen over alle grenene, og strømmene legger seg sammen. Da er det de omvendte resistansene som summeres. To like motstander i parallell gir halvparten av resistansen til én av dem. En åpen bryter i serie stopper hele kretsen.`,
    [[R`R = R_1 + R_2`, "serie"], [R`\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}`, "parallell"]],
    [["R", "samlet resistans", "Ω"], ["R_1,\\ R_2", "enkeltresistanser", "Ω"]],
    R`6 Ω og 3 Ω i serie: $R = 6 + 3 = 9$ Ω.
De samme to i parallell: $\dfrac{1}{R} = \dfrac{1}{6} + \dfrac{1}{3}$, så $R = 2$ Ω.`,
    R`Parallell gir alltid mindre samlet resistans enn den minste av greinene.`),
  en: O("Series and parallel",
    R`In a series connection the same current goes through every component, and the voltages add. The total resistance is the sum. In a parallel connection the same voltage lies across every branch, and the currents add. Then it is the reciprocal resistances that are added. Two equal resistors in parallel give half the resistance of one of them. An open switch in series stops the whole circuit.`,
    [[R`R = R_1 + R_2`, "series"], [R`\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}`, "parallel"]],
    [["R", "total resistance", "\\Omega"], ["R_1,\\ R_2", "individual resistances", "\\Omega"]],
    R`6 Ω and 3 Ω in series: $R = 6 + 3 = 9$ Ω.
The same two in parallel: $\dfrac{1}{R} = \dfrac{1}{6} + \dfrac{1}{3}$, so $R = 2$ Ω.`,
    R`Parallel always gives a smaller total resistance than the smallest of the branches.`) },
{ id: "elektrisk-energi", chk: ["2*3 ≈ 6", "6*3.6 ≈ 21.6"],
  nb: O("Elektrisk energi",
    R`Energien en komponent omsetter, er effekten ganger tiden den står på. Strømregningen bruker kilowattimer. En kilowattime er energien når en effekt på tusen watt står på i én time, og den er det samme som 3,6 megajoule. Vil du sammenligne med mekanisk energi i joule, må du gjøre om enheten. Skru av det du ikke bruker, så blir både energien og regningen mindre.`,
    [[R`E = Pt`, "elektrisk energi"], [R`1\ \text{kWh} = 3{,}6\ \text{MJ}`, "omregning"]],
    [["E", "energi", "J eller kWh"], ["P", "effekt", "W eller kW"], ["t", "tid", "s eller h"]],
    R`En ovn på 2 kW står på i 3 timer.
$E = 2 \cdot 3 = 6$ kWh $= 6 \cdot 3{,}6 = 21{,}6$ MJ.`,
    R`Bruk kilowatt og timer sammen, eller watt og sekunder sammen. Ikke bland de to.`),
  en: O("Electrical energy",
    R`The energy a component converts is the power times the time it is on. The electricity bill uses kilowatt hours. One kilowatt hour is the energy when a power of one thousand watts is on for one hour, and it is the same as 3.6 megajoules. If you want to compare with mechanical energy in joules, you must convert the unit. Switch off what you do not use, and both the energy and the bill become smaller.`,
    [[R`E = Pt`, "electrical energy"], [R`1\ \text{kWh} = 3.6\ \text{MJ}`, "conversion"]],
    [["E", "energy", "J or kWh"], ["P", "power", "W or kW"], ["t", "time", "s or h"]],
    R`A heater of 2 kW is on for 3 hours.
$E = 2 \cdot 3 = 6$ kWh $= 6 \cdot 3{,}6 = 21{,}6$ MJ.`,
    R`Use kilowatts and hours together, or watts and seconds together. Do not mix the two.`) }
]);

// ---------- VGFY1 4: Atomer, stråling og universet ----------
TOPICS("VGFY1", 4, [
{ id: "halveringstid", chk: ["15/5 ≈ 3", "8000/2^3 ≈ 1000"],
  nb: O("Halveringstid",
    R`Halveringstiden er tiden det tar før halvparten av de radioaktive kjernene i en prøve har omdannet seg. Etter én halveringstid er halvparten igjen, etter to er en firedel igjen, og slik fortsetter det. Hver kjerne henfaller tilfeldig, men for mange kjerner blir andelen som er igjen, forutsigbar. Halveringstiden er en egenskap ved nukliden, ikke ved hvor stor prøven er. Den endres ikke om du varmer opp stoffet.`,
    [[R`N = N_0\left(\frac{1}{2}\right)^{t/T_{1/2}}`, "kjerner igjen etter tiden t"]],
    [["N_0", "kjerner i starten", ""], ["T_{1/2}", "halveringstid", "s, min eller år"], ["t", "tid", "samme enhet"]],
    R`Et stoff har halveringstid 5 år, og det er 8000 kjerner i starten.
Etter 15 år, som er $15/5 = 3$ halveringstider: $N = 8000 / 2^3 = 1000$.`,
    R`Del antall kjerner på to én gang per halveringstid. Ikke del på antall år.`),
  en: O("Half-life",
    R`The half-life is the time it takes before half of the radioactive nuclei in a sample have decayed. After one half-life half remain, after two a quarter remain, and so on. Each nucleus decays at random, but for many nuclei the fraction that remains is predictable. The half-life is a property of the nuclide, not of how large the sample is. It does not change if you heat the substance.`,
    [[R`N = N_0\left(\frac{1}{2}\right)^{t/T_{1/2}}`, "nuclei left after time t"]],
    [["N_0", "nuclei at the start", ""], ["T_{1/2}", "half-life", "s, min or years"], ["t", "time", "same unit"]],
    R`A substance has a half-life of 5 years, and there are 8000 nuclei at the start.
After 15 years, which is $15/5 = 3$ half-lives: $N = 8000 / 2^3 = 1000$.`,
    R`Divide the number of nuclei by two once per half-life. Do not divide by the number of years.`) },
{ id: "fotonenergi", chk: ["6.63e-34*3.00e8/(600e-9)*1e19 ≈ 3.315"],
  nb: O("Energi i et foton",
    R`Lys kan beskrives som en strøm av fotoner. Hvert foton har en energi som bare avhenger av frekvensen, eller av bølgelengden. Kort bølgelengde betyr høy frekvens og mer energi per foton. Derfor er ultrafiolett lys mer energirikt enn rødt lys, selv om en rød lampe kan sende ut mange flere fotoner. Plancks konstant og lysfarten inngår når energien regnes i joule.`,
    [[R`E = \frac{hc}{\lambda}`, "fotonenergi"]],
    [["h", "Plancks konstant, 6,63·10⁻³⁴", "Js"], ["c", "lysfarten, 3,00·10⁸", "m/s"], ["\\lambda", "bølgelengde", "m"]],
    R`Et foton har bølgelengde 600 nm, altså $600 \cdot 10^{-9}$ m.
$E = \dfrac{6{,}63 \cdot 10^{-34} \cdot 3{,}00 \cdot 10^{8}}{600 \cdot 10^{-9}} = 3{,}315 \cdot 10^{-19}$ J.`,
    R`Bølgelengden må stå i meter. 1 nm er $10^{-9}$ m.`),
  en: O("Energy of a photon",
    R`Light can be described as a stream of photons. Each photon has an energy that depends only on the frequency, or on the wavelength. A short wavelength means a high frequency and more energy per photon. That is why ultraviolet light is more energetic than red light, even if a red lamp can emit many more photons. Planck's constant and the speed of light enter when the energy is calculated in joules.`,
    [[R`E = \frac{hc}{\lambda}`, "photon energy"]],
    [["h", "Planck's constant, 6.63·10⁻³⁴", "Js"], ["c", "speed of light, 3.00·10⁸", "m/s"], ["\\lambda", "wavelength", "m"]],
    R`A photon has wavelength 600 nm, that is $600 \cdot 10^{-9}$ m.
$E = \dfrac{6{,}63 \cdot 10^{-34} \cdot 3{,}00 \cdot 10^{8}}{600 \cdot 10^{-9}} = 3{,}315 \cdot 10^{-19}$ J.`,
    R`The wavelength must be in meters. 1 nm is $10^{-9}$ m.`) },
{ id: "alfahenfall", chk: ["238-4 ≈ 234", "92-2 ≈ 90"],
  nb: O("Alfahenfall",
    R`Alfastråling er heliumkjerner, med to protoner og to nøytroner, som sendes ut fra en ustabil kjerne. Massetallet, protoner pluss nøytroner, synker med fire. Atomnummeret, antall protoner, synker med to, så datterkjernen er et annet grunnstoff. Papir stopper alfapartikler, men de gjør stor skade hvis de kommer inn i kroppen, fordi de avgir energien sin på kort vei. Kjernen som er igjen, kan selv være radioaktiv.`,
    [[R`{}^{A}_{Z}\mathrm{X} \rightarrow {}^{A-4}_{Z-2}\mathrm{Y} + {}^{4}_{2}\mathrm{He}`, "alfahenfall"]],
    [["A", "massetall", ""], ["Z", "atomnummer", ""]],
    R`Uran-238 har atomnummer 92. Etter ett alfahenfall:
massetall $238 - 4 = 234$ og atomnummer $92 - 2 = 90$, som er thorium-234.`,
    R`Betahenfall endrer atomnummeret med én og lar massetallet være det samme. Gammastråling endrer ingen av dem.`),
  en: O("Alpha decay",
    R`Alpha radiation is helium nuclei, with two protons and two neutrons, emitted from an unstable nucleus. The mass number, protons plus neutrons, falls by four. The atomic number, the number of protons, falls by two, so the daughter nucleus is a different element. Paper stops alpha particles, but they do great damage if they get inside the body, because they deposit their energy over a short path. The nucleus that remains can itself be radioactive.`,
    [[R`{}^{A}_{Z}\mathrm{X} \rightarrow {}^{A-4}_{Z-2}\mathrm{Y} + {}^{4}_{2}\mathrm{He}`, "alpha decay"]],
    [["A", "mass number", ""], ["Z", "atomic number", ""]],
    R`Uranium-238 has atomic number 92. After one alpha decay:
mass number $238 - 4 = 234$ and atomic number $92 - 2 = 90$, which is thorium-234.`,
    R`Beta decay changes the atomic number by one and leaves the mass number unchanged. Gamma radiation changes neither.`) }
]);

// ---------- VGFY2 0: Kast ----------
TOPICS("VGFY2", 0, [
{ id: "kast-komponenter", chk: ["20*cos(30*deg) ≈ 17.32", "20*sin(30*deg) ≈ 10"],
  nb: O("Fartskomponenter i kast",
    R`Et kast uten luftmotstand kan deles i to bevegelser som skjer samtidig. Vannrett er farten konstant, fordi ingen kraft virker den veien. Loddrett er det fritt fall, med tyngdeakselerasjonen nedover. Startfarten skrått oppover deles i en vannrett og en loddrett komponent med cosinus og sinus til vinkelen mot bakken. Tiden er den samme i begge retningene, og den binder dem sammen.`,
    [[R`v_{0x} = v_0\cos\alpha`, "vannrett startfart"], [R`v_{0y} = v_0\sin\alpha`, "loddrett startfart"]],
    [["v_0", "startfart", "m/s"], ["\\alpha", "vinkel mot vannrett", "°"]],
    R`En ball kastes med 20 m/s i 30° mot bakken.
$v_{0x} = 20\cos 30^\circ \approx 17{,}32$ m/s og $v_{0y} = 20\sin 30^\circ = 10$ m/s.`,
    R`Ved 45° er de to komponentene like store. Ved liten vinkel dominerer den vannrette.`),
  en: O("Velocity components of a throw",
    R`A throw without air resistance can be split into two motions that happen at the same time. Horizontally the velocity is constant, because no force acts that way. Vertically it is free fall, with the acceleration of gravity downwards. An initial velocity slanting upwards is split into a horizontal and a vertical component with the cosine and the sine of the angle to the ground. The time is the same in both directions, and it links them.`,
    [[R`v_{0x} = v_0\cos\alpha`, "horizontal initial velocity"], [R`v_{0y} = v_0\sin\alpha`, "vertical initial velocity"]],
    [["v_0", "initial speed", "m/s"], ["\\alpha", "angle to the horizontal", "°"]],
    R`A ball is thrown at 20 m/s at 30° to the ground.
$v_{0x} = 20\cos 30^\circ \approx 17{,}32$ m/s and $v_{0y} = 20\sin 30^\circ = 10$ m/s.`,
    R`At 45° the two components are equal. At a small angle the horizontal one dominates.`) },
{ id: "rekkevidde", chk: ["20^2*sin(90*deg)/9.81 ≈ 40.77"],
  nb: O("Rekkevidde på flat mark",
    R`Rekkevidden er hvor langt et kast kommer når det lander i samme høyde som det startet. Uten luftmotstand er den størst ved 45 grader, fordi sinus til den dobbelte vinkelen da er 1. En vinkel og komplementvinkelen, for eksempel 30 og 60 grader, gir samme rekkevidde, men ulik tid i lufta og ulik maksimal høyde. Formelen gjelder ikke hvis bakken heller, eller hvis ballen lander lavere enn utgangspunktet.`,
    [[R`R = \frac{v_0^2\sin 2\alpha}{g}`, "rekkevidde på flat mark"]],
    [["R", "rekkevidde", "m"], ["v_0", "startfart", "m/s"], ["\\alpha", "kastvinkel", "°"], ["g", "tyngdeakselerasjon, 9,81", "m/s²"]],
    R`En ball kastes med 20 m/s i 45° over flat mark, uten luftmotstand.
$R = \dfrac{20^2 \sin 90^\circ}{9{,}81} \approx 40{,}77$ m.`,
    R`I virkeligheten kortner luftmotstanden rekkevidden, mest for lette baller og høy fart.`),
  en: O("Range on level ground",
    R`The range is how far a throw goes when it lands at the same height as it started. Without air resistance it is largest at 45 degrees, because the sine of the doubled angle is then 1. An angle and its complement, for example 30 and 60 degrees, give the same range, but a different time in the air and a different maximum height. The formula does not apply if the ground slopes, or if the ball lands lower than the starting point.`,
    [[R`R = \frac{v_0^2\sin 2\alpha}{g}`, "range on level ground"]],
    [["R", "range", "m"], ["v_0", "initial speed", "m/s"], ["\\alpha", "angle of projection", "°"], ["g", "acceleration of gravity, 9.81", "m/s²"]],
    R`A ball is thrown at 20 m/s at 45° over level ground, without air resistance.
$R = \dfrac{20^2 \sin 90^\circ}{9{,}81} \approx 40{,}77$ m.`,
    R`In reality air resistance shortens the range, most for light balls and high speed.`) },
{ id: "vannrett-kast", chk: ["sqrt(2*5/9.81) ≈ 1.010", "8*sqrt(2*5/9.81) ≈ 8.077"],
  nb: O("Vannrett kast",
    R`Kastes et legeme vannrett, er den loddrette startfarten null. Falltiden bestemmes bare av høyden, akkurat som for et legeme som slippes rett ned fra samme sted. Den vannrette farten er konstant og flytter legemet mens det faller. Jo høyere utgangspunkt og jo større vannrett fart, jo lenger ut lander det. Den loddrette farten i landingsøyeblikket er den samme som om legemet var sluppet.`,
    [[R`t = \sqrt{2h/g}`, "falltid fra høyden h"], [R`x = v_0 t`, "vannrett lengde"]],
    [["h", "starthøyde", "m"], ["v_0", "vannrett startfart", "m/s"], ["x", "lengde", "m"]],
    R`En stein kastes vannrett med 8 m/s fra 5 m høyde.
$t = \sqrt{2 \cdot 5 / 9{,}81} \approx 1{,}010$ s og $x = 8t \approx 8{,}077$ m.`,
    R`Falltiden blir den samme om du kaster hardt eller slipper steinen. Bare lengden endrer seg.`),
  en: O("Horizontal throw",
    R`If a body is thrown horizontally, the vertical initial velocity is zero. The time of fall is set only by the height, just as for a body dropped straight down from the same place. The horizontal velocity is constant and carries the body while it falls. The higher the starting point and the larger the horizontal speed, the farther out it lands. The vertical speed at landing is the same as if the body had been dropped.`,
    [[R`t = \sqrt{2h/g}`, "time of fall from height h"], [R`x = v_0 t`, "horizontal distance"]],
    [["h", "starting height", "m"], ["v_0", "horizontal initial speed", "m/s"], ["x", "distance", "m"]],
    R`A stone is thrown horizontally at 8 m/s from a height of 5 m.
$t = \sqrt{2 \cdot 5 / 9{,}81} \approx 1{,}010$ s and $x = 8t \approx 8{,}077$ m.`,
    R`The time of fall is the same whether you throw hard or drop the stone. Only the distance changes.`) }
]);

// ---------- VGFY2 1: Sirkelbevegelse og gravitasjon ----------
TOPICS("VGFY2", 1, [
{ id: "sentripetalkraft", chk: ["4^2/2 ≈ 8", "2*4^2/2 ≈ 16"],
  nb: O("Sentripetalkraft",
    R`I jevn sirkelbevegelse er farten like stor hele tiden, men retningen endrer seg. Det krever en akselerasjon inn mot sentrum, sentripetalakselerasjonen. Kraften som gir den, kalles sentripetalkraften, og den er ikke en ekstra kraft ved siden av de andre. Den er summen av kreftene inn mot sentrum, for eksempel snordrag eller friksjon. Uten en slik kraft fortsetter legemet rett frem.`,
    [[R`a = \frac{v^2}{r}`, "sentripetalakselerasjon"], [R`F = \frac{mv^2}{r}`, "sentripetalkraft"]],
    [["v", "banefart", "m/s"], ["r", "radius", "m"], ["m", "masse", "kg"], ["F", "kraft inn mot sentrum", "N"]],
    R`Et legeme på 2 kg går i en sirkel med radius 2 m og fart 4 m/s.
$a = 4^2/2 = 8$ m/s² og $F = 2 \cdot 4^2/2 = 16$ N.`,
    R`Dobbel fart krever fire ganger så stor kraft for å holde samme radius.`),
  en: O("Centripetal force",
    R`In uniform circular motion the speed is constant, but the direction changes. That requires an acceleration towards the centre, the centripetal acceleration. The force that provides it is called the centripetal force, and it is not an extra force beside the others. It is the sum of the forces towards the centre, for example the pull of a string or friction. Without such a force the body continues straight ahead.`,
    [[R`a = \frac{v^2}{r}`, "centripetal acceleration"], [R`F = \frac{mv^2}{r}`, "centripetal force"]],
    [["v", "orbital speed", "m/s"], ["r", "radius", "m"], ["m", "mass", "kg"], ["F", "force towards the centre", "N"]],
    R`A body of 2 kg moves in a circle of radius 2 m at 4 m/s.
$a = 4^2/2 = 8$ m/s² and $F = 2 \cdot 4^2/2 = 16$ N.`,
    R`Double the speed requires four times the force to keep the same radius.`) },
{ id: "gravitasjon", chk: ["6.67e-11*5.97e24/(6.37e6)^2 ≈ 9.81"],
  nb: O("Gravitasjonsloven",
    R`Newtons gravitasjonslov sier at to masser trekker på hverandre med en kraft som er proporsjonal med produktet av massene og omvendt proporsjonal med kvadratet av avstanden mellom sentrene. Dobbel avstand gir en firedel av kraften. Ved jordoverflaten gir loven tyngdeakselerasjonen når den ene massen er jordas og avstanden er jordradien. Konstanten G er den samme for alle masser, fra epler til planeter.`,
    [[R`F = G\frac{m_1 m_2}{r^2}`, "gravitasjonskraft"], [R`g = \frac{GM}{R^2}`, "tyngdeakselerasjon ved overflaten"]],
    [["G", "gravitasjonskonstanten, 6,67·10⁻¹¹", "Nm²/kg²"], ["M", "jordas masse, 5,97·10²⁴", "kg"], ["R", "jordradien, 6,37·10⁶", "m"]],
    R`Med jordas masse og radius:
$g = \dfrac{6{,}67 \cdot 10^{-11} \cdot 5{,}97 \cdot 10^{24}}{(6{,}37 \cdot 10^{6})^2} \approx 9{,}81$ m/s².`,
    R`Avstanden i loven måles mellom sentrene, ikke mellom overflatene.`),
  en: O("The law of gravitation",
    R`Newton's law of gravitation says that two masses attract each other with a force proportional to the product of the masses and inversely proportional to the square of the distance between the centres. Double the distance gives a quarter of the force. At the Earth's surface the law gives the acceleration of gravity when one mass is the Earth's and the distance is the Earth's radius. The constant G is the same for all masses, from apples to planets.`,
    [[R`F = G\frac{m_1 m_2}{r^2}`, "gravitational force"], [R`g = \frac{GM}{R^2}`, "surface acceleration of gravity"]],
    [["G", "gravitational constant, 6.67·10⁻¹¹", "Nm²/kg²"], ["M", "Earth's mass, 5.97·10²⁴", "kg"], ["R", "Earth's radius, 6.37·10⁶", "m"]],
    R`With the Earth's mass and radius:
$g = \dfrac{6{,}67 \cdot 10^{-11} \cdot 5{,}97 \cdot 10^{24}}{(6{,}37 \cdot 10^{6})^2} \approx 9{,}81$ m/s².`,
    R`The distance in the law is measured between the centres, not between the surfaces.`) },
{ id: "banefart", chk: ["(6.37e6+400e3)/1e6 ≈ 6.77", "sqrt(6.67e-11*5.97e24/(6.37e6+400e3))/1000 ≈ 7.67"],
  nb: O("Banefart for en satellitt",
    R`En satellitt i sirkelbane faller hele tiden, men jordoverflaten krummer unna like fort. Sentripetalkraften er gravitasjonen. Banefarten avhenger av avstanden fra jordas sentrum, ikke av satellittens masse. Lav bane gir høy fart og kort omløpstid. Radien i formelen er jordradien pluss høyden over bakken. Høyden alene er ikke nok, for gravitasjonen regnes fra sentrum.`,
    [[R`v = \sqrt{\frac{GM}{r}}`, "banefart i sirkelbane"]],
    [["r", "avstand fra jordas sentrum", "m"], ["v", "banefart", "m/s"], ["M", "jordas masse", "kg"]],
    R`En satellitt går 400 km over bakken. Jordradien er 6,37·10⁶ m.
$r = 6{,}37 \cdot 10^{6} + 400 \cdot 10^{3} = 6{,}77 \cdot 10^{6}$ m, og $v \approx 7{,}67$ km/s.`,
    R`Høyere bane gir lavere fart. Geostasjonær bane ligger mye lenger ute enn 400 km.`),
  en: O("Orbital speed of a satellite",
    R`A satellite in a circular orbit is falling all the time, but the Earth's surface curves away just as fast. The centripetal force is gravity. The orbital speed depends on the distance from the Earth's centre, not on the satellite's mass. A low orbit gives high speed and a short period. The radius in the formula is the Earth's radius plus the height above the ground. The height alone is not enough, because gravity is measured from the centre.`,
    [[R`v = \sqrt{\frac{GM}{r}}`, "speed in a circular orbit"]],
    [["r", "distance from the Earth's centre", "m"], ["v", "orbital speed", "m/s"], ["M", "mass of the Earth", "kg"]],
    R`A satellite orbits 400 km above the ground. The Earth's radius is 6.37·10⁶ m.
$r = 6{,}37 \cdot 10^{6} + 400 \cdot 10^{3} = 6{,}77 \cdot 10^{6}$ m, and $v \approx 7{,}67$ km/s.`,
    R`A higher orbit gives a lower speed. A geostationary orbit lies much farther out than 400 km.`) }
]);

// ---------- VGFY2 2: Elektromagnetisme ----------
TOPICS("VGFY2", 2, [
{ id: "kraft-leder", chk: ["5*0.4*0.2 ≈ 0.4"],
  nb: O("Kraft på en strømførende leder",
    R`En leder med strøm i et magnetfelt kjenner en kraft når strømmen ikke er parallell med feltet. Kraften er størst når lederen står vinkelrett på feltet, og den er null når de er parallelle. Retningen finnes med høyrehåndsregelen: fingrene fra strømmen mot feltet, og tommelen viser kraften. Det er denne kraften som får en motor til å dreie. Sterkere felt, mer strøm eller lengre leder gir større kraft.`,
    [[R`F = ILB`, "kraft når I står vinkelrett på B"]],
    [["I", "strøm", "A"], ["L", "lengde i feltet", "m"], ["B", "magnetisk flukstetthet", "T"], ["F", "kraft", "N"]],
    R`En leder på 0,4 m fører 5 A vinkelrett på et felt på 0,2 T.
$F = 5 \cdot 0{,}4 \cdot 0{,}2 = 0{,}4$ N.`,
    R`Kraften står vinkelrett på både strømmen og feltet. Den gjør ikke arbeid langs lederen.`),
  en: O("Force on a current-carrying wire",
    R`A wire carrying a current in a magnetic field feels a force when the current is not parallel to the field. The force is largest when the wire is perpendicular to the field, and it is zero when they are parallel. The direction is found with the right-hand rule: the fingers from the current towards the field, and the thumb shows the force. This is the force that makes a motor turn. A stronger field, more current or a longer wire gives a larger force.`,
    [[R`F = ILB`, "force when I is perpendicular to B"]],
    [["I", "current", "A"], ["L", "length in the field", "m"], ["B", "magnetic flux density", "T"], ["F", "force", "N"]],
    R`A wire of 0.4 m carries 5 A perpendicular to a field of 0.2 T.
$F = 5 \cdot 0{,}4 \cdot 0{,}2 = 0{,}4$ N.`,
    R`The force is perpendicular to both the current and the field. It does no work along the wire.`) },
{ id: "indusert-spenning", chk: ["4*0.5*0.3 ≈ 0.6"],
  nb: O("Indusert spenning",
    R`Når en leder beveger seg på tvers av et magnetfelt, skyves ladningene i lederen, og det oppstår en spenning. Spenningen er størst når farten, feltet og lederen står vinkelrett på hverandre. Faradays lov sier mer generelt at indusert spenning er lik endringen i magnetisk fluks per tid. Lenz' regel sier at den induserte strømmen motvirker endringen som skapte den. Slik virker en generator.`,
    [[R`\varepsilon = vBL`, "indusert spenning i en leder som beveger seg"], [R`\varepsilon = -\frac{\Delta\Phi}{\Delta t}`, "Faradays lov, tilnærmet"]],
    [["\\varepsilon", "indusert spenning", "V"], ["v", "fart", "m/s"], ["B", "flukstetthet", "T"], ["L", "lengde", "m"]],
    R`En leder på 0,3 m beveger seg med 4 m/s vinkelrett på et felt på 0,5 T.
$\varepsilon = 4 \cdot 0{,}5 \cdot 0{,}3 = 0{,}6$ V.`,
    R`Står lederen stille, eller beveger den seg langs feltet, er den induserte spenningen null.`),
  en: O("Induced voltage",
    R`When a conductor moves across a magnetic field, the charges in the conductor are pushed and a voltage appears. The voltage is largest when the velocity, the field and the conductor are perpendicular to each other. Faraday's law says more generally that the induced voltage equals the change in magnetic flux per time. Lenz's law says that the induced current opposes the change that created it. That is how a generator works.`,
    [[R`\varepsilon = vBL`, "induced voltage in a moving conductor"], [R`\varepsilon = -\frac{\Delta\Phi}{\Delta t}`, "Faraday's law, approximate"]],
    [["\\varepsilon", "induced voltage", "V"], ["v", "speed", "m/s"], ["B", "flux density", "T"], ["L", "length", "m"]],
    R`A conductor of 0.3 m moves at 4 m/s perpendicular to a field of 0.5 T.
$\varepsilon = 4 \cdot 0{,}5 \cdot 0{,}3 = 0{,}6$ V.`,
    R`If the conductor is at rest, or moves along the field, the induced voltage is zero.`) },
{ id: "sirkel-i-felt", chk: ["0.004*10/(0.02*0.5) ≈ 4"],
  nb: O("Ladning i magnetfelt",
    R`En ladet partikkel som beveger seg vinkelrett på et homogent magnetfelt, får en kraft vinkelrett på farten. Kraften endrer retningen, men ikke farten, så partikkelen går i en sirkel. Radien blir større hvis massen eller farten øker, og mindre hvis ladningen eller feltet øker. En nøytral partikkel kjenner ingen magnetisk kraft. Beveger ladningen seg parallelt med feltet, er kraften også null.`,
    [[R`r = \frac{mv}{qB}`, "radius når farten står vinkelrett på feltet"]],
    [["m", "masse", "kg"], ["v", "fart", "m/s"], ["q", "ladning", "C"], ["B", "flukstetthet", "T"]],
    R`En partikkel har masse 0,004 kg, ladning 0,02 C og fart 10 m/s i et felt på 0,5 T.
$r = \dfrac{0{,}004 \cdot 10}{0{,}02 \cdot 0{,}5} = 4$ m.`,
    R`Magnetisk kraft gjør ikke arbeid. Den kinetiske energien er derfor konstant i banen.`),
  en: O("A charge in a magnetic field",
    R`A charged particle moving perpendicular to a uniform magnetic field feels a force perpendicular to its velocity. The force changes the direction but not the speed, so the particle moves in a circle. The radius becomes larger if the mass or the speed increases, and smaller if the charge or the field increases. A neutral particle feels no magnetic force. If the charge moves parallel to the field, the force is zero too.`,
    [[R`r = \frac{mv}{qB}`, "radius when the velocity is perpendicular to the field"]],
    [["m", "mass", "kg"], ["v", "speed", "m/s"], ["q", "charge", "C"], ["B", "flux density", "T"]],
    R`A particle has mass 0.004 kg, charge 0.02 C and speed 10 m/s in a field of 0.5 T.
$r = \dfrac{0{,}004 \cdot 10}{0{,}02 \cdot 0{,}5} = 4$ m.`,
    R`The magnetic force does no work. The kinetic energy is therefore constant along the path.`) }
]);

// ---------- VGFY2 3: Kvantefysikk og relativitet ----------
TOPICS("VGFY2", 3, [
{ id: "fotoelektrisk", chk: ["1240/400 ≈ 3.1", "3.1-2.3 ≈ 0.8"],
  nb: O("Fotoelektrisk effekt",
    R`Når lys treffer et metall, kan et foton slå løs et elektron hvis fotonets energi er større enn løsrivningsarbeidet. Overskuddet blir kinetisk energi hos elektronet. Sterkere lys gir flere fotoner og dermed flere elektroner, men ikke større energi per elektron. Det er frekvensen, eller bølgelengden, som bestemmer energien per foton. Rødt lys kan derfor være virkningsløst mot et metall som ultrafiolett lys klarer å løse elektroner fra.`,
    [[R`E \approx \frac{1240}{\lambda}`, "fotonenergi i eV når λ er i nm"], [R`E_k = E - W`, "største kinetiske energi"]],
    [["E", "fotonenergi", "eV"], ["\\lambda", "bølgelengde", "nm"], ["W", "løsrivningsarbeid", "eV"]],
    R`Lys med bølgelengde 400 nm treffer et metall med løsrivningsarbeid 2,3 eV.
$E \approx 1240/400 = 3{,}1$ eV og $E_k = 3{,}1 - 2{,}3 = 0{,}8$ eV.`,
    R`Er fotonenergien mindre enn løsrivningsarbeidet, løses ingen elektroner, uansett hvor sterkt lyset er.`),
  en: O("The photoelectric effect",
    R`When light hits a metal, a photon can knock out an electron if the photon's energy is greater than the work function. The surplus becomes kinetic energy of the electron. Stronger light gives more photons and therefore more electrons, but not more energy per electron. It is the frequency, or the wavelength, that sets the energy per photon. Red light can therefore have no effect on a metal from which ultraviolet light does release electrons.`,
    [[R`E \approx \frac{1240}{\lambda}`, "photon energy in eV when λ is in nm"], [R`E_k = E - W`, "maximum kinetic energy"]],
    [["E", "photon energy", "eV"], ["\\lambda", "wavelength", "nm"], ["W", "work function", "eV"]],
    R`Light with wavelength 400 nm hits a metal with work function 2.3 eV.
$E \approx 1240/400 = 3{,}1$ eV and $E_k = 3{,}1 - 2{,}3 = 0{,}8$ eV.`,
    R`If the photon energy is less than the work function, no electrons are released, however strong the light is.`) },
{ id: "tidsforlengelse", chk: ["1/sqrt(1-0.6^2) ≈ 1.25", "1.25*4 ≈ 5"],
  nb: O("Tidsforlengelse",
    R`Den spesielle relativitetsteorien sier at en klokke som beveger seg, går langsommere sett fra en observatør som er i ro. Faktoren gamma er 1 når farten er null, og den vokser uten grense når farten nærmer seg lysfarten. Tiden om bord, egentiden, er den korteste. Lysfarten er den samme for alle, og ingenting med masse kan nå den. Ved vanlige farter er gamma så nær 1 at vi ikke merker effekten.`,
    [[R`\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}`, "gamma"], [R`\Delta t = \gamma\,\Delta t_0`, "tidsforlengelse"]],
    [["v", "fart", "m/s"], ["c", "lysfarten", "m/s"], ["\\Delta t_0", "egentid", "s"], ["\\Delta t", "tid i rosystemet", "s"]],
    R`Et romskip har fart 0,6c, og om bord går det 4 år.
$\gamma = 1/\sqrt{1 - 0{,}6^2} = 1{,}25$, så på jorda går det $1{,}25 \cdot 4 = 5$ år.`,
    R`Gamma er aldri mindre enn 1. Lengden i bevegelsesretningen blir tilsvarende kortere, $L = L_0/\gamma$.`),
  en: O("Time dilation",
    R`Special relativity says that a clock that is moving runs more slowly as seen by an observer at rest. The factor gamma is 1 when the speed is zero, and it grows without limit as the speed approaches the speed of light. The time on board, the proper time, is the shortest. The speed of light is the same for everyone, and nothing with mass can reach it. At ordinary speeds gamma is so close to 1 that we do not notice the effect.`,
    [[R`\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}`, "gamma"], [R`\Delta t = \gamma\,\Delta t_0`, "time dilation"]],
    [["v", "speed", "m/s"], ["c", "speed of light", "m/s"], ["\\Delta t_0", "proper time", "s"], ["\\Delta t", "time in the rest frame", "s"]],
    R`A spaceship moves at 0.6c, and 4 years pass on board.
$\gamma = 1/\sqrt{1 - 0{,}6^2} = 1{,}25$, so on Earth $1{,}25 \cdot 4 = 5$ years pass.`,
    R`Gamma is never less than 1. The length in the direction of motion becomes correspondingly shorter, $L = L_0/\gamma$.`) },
{ id: "masse-energi", chk: ["0.001*(3.00e8)^2/1e13 ≈ 9"],
  nb: O("Masse og energi",
    R`Masse og energi er to sider av samme sak. Hvileenergien til et legeme er massen ganger lysfarten i andre. I dagliglivet merker vi det ikke, fordi lysfarten er så stor at selv et gram tilsvarer en enorm energi. I kjernereaksjoner blir en liten masseforskjell til målbar energi, eller omvendt. Bevaringsloven gjelder for masse og energi samlet, ikke for massen alene når energi forlater systemet.`,
    [[R`E = mc^2`, "hvileenergi"]],
    [["m", "masse", "kg"], ["c", "lysfarten, 3,00·10⁸", "m/s"], ["E", "hvileenergi", "J"]],
    R`Ett gram er 0,001 kg. Med $c = 3{,}00 \cdot 10^{8}$ m/s:
$E = 0{,}001 \cdot (3{,}00 \cdot 10^{8})^2 = 9{,}00 \cdot 10^{13}$ J.`,
    R`Formelen sier ikke at et gram stoff av seg selv blir til så mye varme. Hele massen må omgjøres.`),
  en: O("Mass and energy",
    R`Mass and energy are two sides of the same thing. The rest energy of a body is the mass times the speed of light squared. In everyday life we do not notice, because the speed of light is so large that even one gram corresponds to an enormous energy. In nuclear reactions a small difference in mass becomes measurable energy, or the other way round. The conservation law applies to mass and energy together, not to the mass alone when energy leaves the system.`,
    [[R`E = mc^2`, "rest energy"]],
    [["m", "mass", "kg"], ["c", "speed of light, 3.00·10⁸", "m/s"], ["E", "rest energy", "J"]],
    R`One gram is 0.001 kg. With $c = 3{,}00 \cdot 10^{8}$ m/s:
$E = 0{,}001 \cdot (3{,}00 \cdot 10^{8})^2 = 9{,}00 \cdot 10^{13}$ J.`,
    R`The formula does not say that one gram of matter by itself becomes that much heat. The whole mass must be converted.`) }
]);
})();
