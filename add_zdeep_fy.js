// ============================================================
//  add_zdeep_fy.js – fordypning i Fysikk 1 og 2 (lærebok-nivå med regneeksempler). DEEP/DQS ligger i learn.js.
// ============================================================
(() => {
DEEP("VGFY1", "Bevegelse",
`## Posisjon, strekning og forflytning
For å beskrive bevegelse trenger vi et **referansepunkt** og en **retning**. **Strekning** er hvor langt noe har beveget seg totalt, mens **forflytning** er avstanden og retningen fra start til slutt. Løper du én runde på en 400-metersbane, er strekningen 400 m, men forflytningen 0. Størrelser med både tallverdi og retning kalles **vektorer** (forflytning, fart, akselerasjon, kraft); størrelser med bare tallverdi kalles **skalarer** (strekning, tid, masse).

## Fart og akselerasjon
- **Gjennomsnittsfart**: $\\bar v = \\dfrac{\\Delta s}{\\Delta t}$. Enheten er m/s. For å gå fra km/h til m/s deler du på 3,6.
- **Momentanfart** er farten i ett bestemt øyeblikk – det speedometeret viser.
- **Akselerasjon** er hvor raskt farten endrer seg: $a = \\dfrac{\\Delta v}{\\Delta t}$, enhet m/s². Negativ akselerasjon (motsatt vei av farten) betyr at farten avtar.

## Bevegelsesgrafer
- I et **s,t-diagram** er **stigningstallet** farten. En rett linje betyr konstant fart; en krum linje betyr akselerasjon.
- I et **v,t-diagram** er **stigningstallet** akselerasjonen, og **arealet under grafen** er strekningen.
- I et **a,t-diagram** er arealet under grafen endringen i fart.

## Bevegelseslikningene
Når akselerasjonen er **konstant**, gjelder de fire likningene i oppsummeringen. Hver av dem mangler én størrelse:
- $v = v_0 + at$ – mangler $s$
- $s = v_0t + \\tfrac12 at^2$ – mangler $v$
- $v^2 - v_0^2 = 2as$ – mangler $t$
- $s = \\tfrac{v_0+v}{2}\\,t$ – mangler $a$
Velg den likningen som mangler den størrelsen du **verken vet eller spør etter**.

### Regneeksempel 1: Bremsing
En bil kjører i 72 km/h = **20 m/s** og bremser med $a = -5{,}0\\ \\text{m/s}^2$. Hvor lang er bremselengden?
Vi kjenner $v_0 = 20$, $v = 0$ og $a = -5{,}0$ og vil finne $s$ – vi bryr oss ikke om $t$. Da bruker vi $v^2 - v_0^2 = 2as$:
$$s = \\frac{0^2 - 20^2}{2\\cdot(-5{,}0)} = \\frac{-400}{-10} = 40\\ \\text{m}$$
Dobler du farten til 40 m/s, blir bremselengden $\\frac{1600}{10} = 160$ m – **fire ganger** så lang.

### Regneeksempel 2: Fritt fall
En stein slippes fra en 20 m høy bro. Hvor lang tid tar fallet, og hvor fort treffer den vannet (uten luftmotstand)?
Velg positiv retning nedover: $v_0 = 0$, $a = 9{,}81$, $s = 20$.
$$t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{40}{9{,}81}} \\approx 2{,}0\\ \\text{s}, \\qquad v = at \\approx 9{,}81\\cdot 2{,}02 \\approx 20\\ \\text{m/s}$$

## Fritt fall og luftmotstand
Uten luftmotstand faller alle gjenstander med samme akselerasjon, $g = 9{,}81\\ \\text{m/s}^2$ – uansett masse. Det demonstrerte astronauten David Scott på månen i 1971 med en fjær og en hammer. Med luftmotstand øker motstanden med farten, til den blir like stor som tyngden. Da er akselerasjonen null, og gjenstanden faller med konstant **terminalfart** – for en fallskjermhopper uten skjerm rundt 200 km/h.

## Vanlige feil
- Glemme å gjøre om km/h til m/s.
- Blande fortegn: bestem én positiv retning og hold deg til den.
- Bruke bevegelseslikningene når akselerasjonen **ikke** er konstant.`,
`## Position, distance and displacement
To describe motion we need a **reference point** and a **direction**. **Distance** is how far something has moved in total, while **displacement** is the distance and direction from start to finish. Run one lap of a 400 m track and the distance is 400 m but the displacement is 0. Quantities with both size and direction are **vectors** (displacement, velocity, acceleration, force); those with size only are **scalars** (distance, time, mass).

## Speed and acceleration
- **Average speed**: $\\bar v = \\dfrac{\\Delta s}{\\Delta t}$, in m/s. To convert km/h to m/s, divide by 3.6.
- **Instantaneous speed** is the speed at one instant – what the speedometer shows.
- **Acceleration** is how fast the speed changes: $a = \\dfrac{\\Delta v}{\\Delta t}$, in m/s². Negative acceleration (opposite to the velocity) means slowing down.

## Motion graphs
- In an **s–t graph** the **gradient** is the velocity. A straight line means constant velocity; a curve means acceleration.
- In a **v–t graph** the **gradient** is the acceleration, and the **area under the graph** is the distance.
- In an **a–t graph** the area under the graph is the change in velocity.

## The equations of motion
When acceleration is **constant**, the four equations in the summary apply. Each lacks one quantity:
- $v = v_0 + at$ – lacks $s$
- $s = v_0t + \\tfrac12 at^2$ – lacks $v$
- $v^2 - v_0^2 = 2as$ – lacks $t$
- $s = \\tfrac{v_0+v}{2}\\,t$ – lacks $a$
Pick the equation that lacks the quantity you **neither know nor are asked for**.

### Worked example 1: Braking
A car travels at 72 km/h = **20 m/s** and brakes at $a = -5.0\\ \\text{m/s}^2$. How long is the braking distance?
We know $v_0 = 20$, $v = 0$ and $a = -5.0$ and want $s$ – we don't care about $t$. So we use $v^2 - v_0^2 = 2as$:
$$s = \\frac{0^2 - 20^2}{2\\cdot(-5.0)} = \\frac{-400}{-10} = 40\\ \\text{m}$$
Double the speed to 40 m/s and the braking distance becomes $\\frac{1600}{10} = 160$ m – **four times** as long.

### Worked example 2: Free fall
A stone is dropped from a 20 m high bridge. How long does the fall take, and how fast does it hit the water (no air resistance)?
Take downwards as positive: $v_0 = 0$, $a = 9.81$, $s = 20$.
$$t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{40}{9.81}} \\approx 2.0\\ \\text{s}, \\qquad v = at \\approx 9.81\\cdot 2.02 \\approx 20\\ \\text{m/s}$$

## Free fall and air resistance
Without air resistance all objects fall with the same acceleration, $g = 9.81\\ \\text{m/s}^2$ – whatever their mass. Astronaut David Scott showed this on the Moon in 1971 with a feather and a hammer. With air resistance the drag grows with speed until it equals the weight. Then acceleration is zero and the object falls at a constant **terminal velocity** – about 200 km/h for a skydiver without a parachute.

## Common mistakes
- Forgetting to convert km/h to m/s.
- Mixing signs: choose one positive direction and stick to it.
- Using the equations of motion when acceleration is **not** constant.`);

DEEP("VGFY1", "Krefter og Newtons lover",
`## Hva er en kraft?
En **kraft** er en påvirkning som kan endre bevegelsen eller formen til et legeme. Den måles i **newton (N)** og er en **vektor** – den har størrelse og retning. Vanlige krefter:
- **Tyngdekraft (tyngde)**: $G = mg$, rettet mot jordas sentrum. En person på 60 kg har tyngde $60\\cdot 9{,}81 \\approx 590$ N.
- **Normalkraft** $N$: fra et underlag, vinkelrett på flaten.
- **Friksjon** $R$: mot bevegelsen langs flaten. Ofte $R = \\mu N$, der $\\mu$ er **friksjonstallet** (gummi på tørr asfalt ~0,8, på is ~0,1).
- **Snorkraft** (strekk i tau), **fjærkraft** ($F = kx$, Hookes lov) og **luftmotstand**.
- **Masse** (kg) er mengden stoff og er lik overalt. **Tyngde** (N) er kraften fra tyngdefeltet – på månen er tyngden din bare 1/6 av den på jorda.

## Newtons tre lover
**Newtons 1. lov (treghetsloven)**: Et legeme fortsetter i ro eller med konstant fart i rett linje hvis **summen av kreftene** er null ($\\sum F = 0$). Derfor flyr du framover i bilen når den bråbremser – kroppen din vil fortsette – og derfor trenger vi bilbelte.

**Newtons 2. lov**: $\\sum F = ma$. Summen av kreftene gir legemet en akselerasjon i samme retning som kraftsummen. Dobbel kraft gir dobbel akselerasjon; dobbel masse gir halv akselerasjon.

**Newtons 3. lov (kraft og motkraft)**: Når A virker på B med en kraft, virker B på A med en like stor og motsatt rettet kraft. Kreftene virker på **hvert sitt legeme**, så de opphever ikke hverandre. Når du dytter bakover mot bakken, dytter bakken deg framover. En rakett skyver gass bakover, og gassen skyver raketten framover.

## Kraftdiagram – slik løser du oppgaver
1. Tegn legemet som en prikk eller boks.
2. Tegn **alle** kreftene som virker **på** legemet, med piler i riktig retning.
3. Velg positiv retning.
4. Bruk $\\sum F = ma$ (eller $\\sum F = 0$ hvis farten er konstant).

### Regneeksempel 1: Kasse som dras
En kasse på 20 kg dras bortover gulvet med en horisontal kraft på 100 N. Friksjonstallet er 0,30. Hva er akselerasjonen?
- Normalkraft: $N = mg = 20\\cdot 9{,}81 = 196$ N.
- Friksjon: $R = \\mu N = 0{,}30\\cdot 196 \\approx 59$ N.
- Kraftsum: $\\sum F = 100 - 59 = 41$ N.
- Akselerasjon: $a = \\dfrac{41}{20} \\approx 2{,}1\\ \\text{m/s}^2$.

### Regneeksempel 2: Heis
Du står på en badevekt i en heis som akselererer **oppover** med $2{,}0\\ \\text{m/s}^2$. Du veier 60 kg. Hva viser vekta?
Vekta viser normalkraften. Positiv retning oppover: $N - mg = ma$, så
$$N = m(g + a) = 60\\cdot(9{,}81 + 2{,}0) \\approx 710\\ \\text{N}$$
Vekta viser det samme som om du veide $710/9{,}81 \\approx 72$ kg. Du føler deg tyngre. Akselererer heisen nedover, føler du deg lettere, og i fritt fall føler du deg vektløs.

## Skråplan
På et skråplan med vinkel $\\alpha$ deles tyngden i en komponent **langs** planet, $G\\sin\\alpha$, og en **vinkelrett** på planet, $G\\cos\\alpha$. Da blir $N = mg\\cos\\alpha$, og uten friksjon er akselerasjonen nedover planet $a = g\\sin\\alpha$.

## Bevegelsesmengde og kollisjoner
**Bevegelsesmengde** (impuls-størrelsen) er $p = mv$. Når ingen ytre krefter virker, er den **samlede bevegelsesmengden bevart** i et støt. Det forklarer rekyl når du skyter, og hvordan biljardkuler overfører fart. **Impuls** $F\\Delta t = \\Delta p$ forklarer hvorfor kollisjonsputer og knusesoner redder liv: de gjør at kollisjonstiden $\\Delta t$ blir lengre, så kraften $F$ blir mindre.`,
`## What is a force?
A **force** is an influence that can change an object's motion or shape. It is measured in **newtons (N)** and is a **vector** – it has size and direction. Common forces:
- **Gravitational force (weight)**: $G = mg$, towards the Earth's centre. A 60 kg person weighs $60\\cdot 9.81 \\approx 590$ N.
- **Normal force** $N$: from a surface, perpendicular to it.
- **Friction** $R$: opposing motion along the surface. Often $R = \\mu N$, where $\\mu$ is the **coefficient of friction** (rubber on dry asphalt ~0.8, on ice ~0.1).
- **Tension** (in a rope), **spring force** ($F = kx$, Hooke's law) and **air resistance**.
- **Mass** (kg) is the amount of matter and is the same everywhere. **Weight** (N) is the force from the gravitational field – on the Moon your weight is only 1/6 of that on Earth.

## Newton's three laws
**Newton's 1st law (inertia)**: an object stays at rest or moves at constant velocity in a straight line if the **sum of forces** is zero ($\\sum F = 0$). That's why you lurch forward when a car brakes hard – your body wants to continue – and why we need seat belts.

**Newton's 2nd law**: $\\sum F = ma$. The sum of forces gives the object an acceleration in the same direction. Double the force, double the acceleration; double the mass, half the acceleration.

**Newton's 3rd law (action and reaction)**: when A exerts a force on B, B exerts an equal and opposite force on A. The forces act on **different objects**, so they don't cancel. When you push back on the ground, the ground pushes you forward. A rocket pushes gas backwards, and the gas pushes the rocket forwards.

## Force diagrams – how to solve problems
1. Draw the object as a dot or box.
2. Draw **all** forces acting **on** the object, with arrows in the right direction.
3. Choose a positive direction.
4. Use $\\sum F = ma$ (or $\\sum F = 0$ if velocity is constant).

### Worked example 1: Pulling a crate
A 20 kg crate is pulled across the floor with a horizontal force of 100 N. The coefficient of friction is 0.30. What is the acceleration?
- Normal force: $N = mg = 20\\cdot 9.81 = 196$ N.
- Friction: $R = \\mu N = 0.30\\cdot 196 \\approx 59$ N.
- Net force: $\\sum F = 100 - 59 = 41$ N.
- Acceleration: $a = \\dfrac{41}{20} \\approx 2.1\\ \\text{m/s}^2$.

### Worked example 2: Lift
You stand on bathroom scales in a lift accelerating **upwards** at $2.0\\ \\text{m/s}^2$. Your mass is 60 kg. What do the scales show?
The scales show the normal force. Upwards positive: $N - mg = ma$, so
$$N = m(g + a) = 60\\cdot(9.81 + 2.0) \\approx 710\\ \\text{N}$$
The scales read as if you had a mass of $710/9.81 \\approx 72$ kg. You feel heavier. Accelerating downwards you feel lighter, and in free fall weightless.

## Inclined planes
On a slope at angle $\\alpha$ the weight splits into a component **along** the slope, $G\\sin\\alpha$, and one **perpendicular** to it, $G\\cos\\alpha$. Then $N = mg\\cos\\alpha$, and without friction the acceleration down the slope is $a = g\\sin\\alpha$.

## Momentum and collisions
**Momentum** is $p = mv$. When no external forces act, the **total momentum is conserved** in a collision. This explains recoil when firing a gun and how billiard balls transfer speed. **Impulse** $F\\Delta t = \\Delta p$ explains why airbags and crumple zones save lives: they make the collision time $\\Delta t$ longer, so the force $F$ is smaller.`);

DEEP("VGFY1", "Energi og arbeid",
`## Arbeid
I fysikken utfører en kraft **arbeid** når den flytter noe i kraftens retning:
$$W = F\\cdot s\\cdot\\cos\\alpha$$
der $\\alpha$ er vinkelen mellom kraften og bevegelsen. Enheten er **joule (J)** = N·m. Bærer du en sekk bortover på flat mark, gjør du (i fysikkens forstand) **ikke** arbeid på sekken, fordi kraften er loddrett og bevegelsen vannrett ($\\cos 90° = 0$). Friksjon gjør **negativt** arbeid fordi den virker mot bevegelsen.

## Energiformer i mekanikken
- **Kinetisk energi** (bevegelsesenergi): $E_k = \\tfrac12 mv^2$. Fordi farten er kvadrert, gir dobbel fart **fire ganger** så mye energi – derfor er høy fart så farlig.
- **Potensiell energi** (stillingsenergi) i tyngdefeltet: $E_p = mgh$, der $h$ er høyden over et valgt nullnivå.
- **Fjærenergi**: $E = \\tfrac12 kx^2$.
- **Mekanisk energi**: $E = E_k + E_p$.

## Arbeid–energi-setningen
Arbeidet som summen av kreftene gjør på et legeme, er lik endringen i kinetisk energi: $W_{\\text{sum}} = \\Delta E_k$.

## Bevaring av mekanisk energi
Hvis bare **tyngdekraften** (og eventuelt fjærkrefter) gjør arbeid – altså ingen friksjon eller luftmotstand – er den mekaniske energien **bevart**:
$$\\tfrac12 mv_0^2 + mgh_0 = \\tfrac12 mv^2 + mgh$$
Er det friksjon, «forsvinner» noe mekanisk energi – den blir til **varme**: $E_{\\text{før}} = E_{\\text{etter}} + W_{\\text{friksjon}}$.

### Regneeksempel 1: Akebakke
En aker starter i ro på toppen av en 15 m høy bakke. Hvor fort går det i bunnen hvis vi ser bort fra friksjon?
$$mgh = \\tfrac12 mv^2 \\Rightarrow v = \\sqrt{2gh} = \\sqrt{2\\cdot 9{,}81\\cdot 15} \\approx 17\\ \\text{m/s}$$
Massen forsvinner fra likningen – en tung og en lett aker får samme fart (uten friksjon).

### Regneeksempel 2: Med friksjon
Akeren (50 kg) har i virkeligheten bare 12 m/s i bunnen. Hvor mye energi ble til varme?
$$E_p = 50\\cdot 9{,}81\\cdot 15 \\approx 7360\\ \\text{J}, \\quad E_k = \\tfrac12\\cdot 50\\cdot 12^2 = 3600\\ \\text{J}$$
Tapt til varme: $7360 - 3600 \\approx 3800$ J.

## Effekt
**Effekt** er hvor raskt arbeid gjøres eller energi overføres:
$$P = \\frac{W}{t} \\quad\\text{eller}\\quad P = Fv$$
Enheten er **watt (W)** = J/s. En person som går opp en trapp på 3 m høyde (70 kg) på 4 s, yter $P = \\frac{70\\cdot 9{,}81\\cdot 3}{4} \\approx 515$ W. **Kilowattime** (kWh) er energien du bruker med effekt 1 kW i én time: 1 kWh = 3,6 MJ.

## Virkningsgrad
$$\\eta = \\frac{\\text{nyttig energi}}{\\text{tilført energi}}$$
Ingen maskin har 100 % virkningsgrad – noe energi går alltid over til varme. Elektriske motorer kan ha over 90 %, bensinmotorer rundt 25–30 %.

## Energibevaring generelt
**Energiloven** sier at energi aldri forsvinner, bare går over til andre former: kinetisk, potensiell, termisk, kjemisk, elektrisk og stråling. I et vannkraftverk blir potensiell energi i vannet til kinetisk energi, så til elektrisk energi i generatoren – og til slutt til varme og lys der strømmen brukes.`,
`## Work
In physics a force does **work** when it moves something in the direction of the force:
$$W = F\\cdot s\\cdot\\cos\\alpha$$
where $\\alpha$ is the angle between force and motion. The unit is the **joule (J)** = N·m. Carrying a bag across level ground does **no** work on the bag (in the physics sense), because the force is vertical and the motion horizontal ($\\cos 90° = 0$). Friction does **negative** work because it opposes motion.

## Forms of mechanical energy
- **Kinetic energy**: $E_k = \\tfrac12 mv^2$. Because speed is squared, double the speed means **four times** the energy – which is why high speed is so dangerous.
- **Gravitational potential energy**: $E_p = mgh$, where $h$ is the height above a chosen zero level.
- **Elastic (spring) energy**: $E = \\tfrac12 kx^2$.
- **Mechanical energy**: $E = E_k + E_p$.

## The work–energy theorem
The work done by the net force on an object equals the change in its kinetic energy: $W_{\\text{net}} = \\Delta E_k$.

## Conservation of mechanical energy
If only **gravity** (and possibly spring forces) does work – no friction or air resistance – mechanical energy is **conserved**:
$$\\tfrac12 mv_0^2 + mgh_0 = \\tfrac12 mv^2 + mgh$$
With friction some mechanical energy 'disappears' – it becomes **heat**: $E_{\\text{before}} = E_{\\text{after}} + W_{\\text{friction}}$.

### Worked example 1: Sledging
A sledger starts at rest at the top of a 15 m high hill. How fast are they going at the bottom, ignoring friction?
$$mgh = \\tfrac12 mv^2 \\Rightarrow v = \\sqrt{2gh} = \\sqrt{2\\cdot 9.81\\cdot 15} \\approx 17\\ \\text{m/s}$$
The mass cancels – a heavy and a light sledger get the same speed (without friction).

### Worked example 2: With friction
In reality the sledger (50 kg) has only 12 m/s at the bottom. How much energy became heat?
$$E_p = 50\\cdot 9.81\\cdot 15 \\approx 7360\\ \\text{J}, \\quad E_k = \\tfrac12\\cdot 50\\cdot 12^2 = 3600\\ \\text{J}$$
Lost to heat: $7360 - 3600 \\approx 3800$ J.

## Power
**Power** is how fast work is done or energy transferred:
$$P = \\frac{W}{t} \\quad\\text{or}\\quad P = Fv$$
The unit is the **watt (W)** = J/s. A 70 kg person climbing 3 m of stairs in 4 s develops $P = \\frac{70\\cdot 9.81\\cdot 3}{4} \\approx 515$ W. A **kilowatt-hour** (kWh) is the energy used at 1 kW for one hour: 1 kWh = 3.6 MJ.

## Efficiency
$$\\eta = \\frac{\\text{useful energy}}{\\text{energy supplied}}$$
No machine is 100% efficient – some energy always becomes heat. Electric motors can exceed 90%, petrol engines about 25–30%.

## Conservation of energy in general
The **law of conservation of energy** says energy never disappears, only changes form: kinetic, potential, thermal, chemical, electrical and radiant. In a hydropower plant the water's potential energy becomes kinetic energy, then electrical energy in the generator – and finally heat and light where the electricity is used.`);

DEEP("VGFY1", "Elektrisitet",
`## Ladning og strøm
All elektrisitet bygger på **elektrisk ladning**. Protoner er positive og elektroner negative; like ladninger frastøter hverandre, ulike tiltrekker hverandre. Ladning måles i **coulomb (C)**, og ett elektron har ladningen $e = 1{,}6\\cdot 10^{-19}$ C. I metaller kan noen elektroner bevege seg fritt – derfor leder metaller strøm.
- **Strøm** $I$ er hvor mye ladning som passerer per sekund: $I = \\dfrac{Q}{t}$, enhet **ampere (A)**.
- **Spenning** $U$ er energien hver ladning får eller avgir per coulomb, enhet **volt (V)**. Spenningen er «trykket» som driver strømmen.
- **Resistans** $R$ er hvor mye en komponent hindrer strømmen, enhet **ohm (Ω)**.

## Ohms lov og effekt
$$U = RI$$
Effekten (energi per sekund) i en komponent er
$$P = UI = RI^2 = \\frac{U^2}{R}$$
Energien som brukes, er $E = Pt$. En vannkoker på 2000 W som står på i 3 minutter, bruker $2000\\cdot 180 = 360\\,000$ J = 0,1 kWh.

## Resistans
Resistansen i en ledning øker med **lengden** og minker med **tverrsnittet**: $R = \\rho\\dfrac{L}{A}$, der $\\rho$ er **resistiviteten** til materialet (kobber er lav, derfor brukes det i ledninger). I metaller øker resistansen når temperaturen stiger. En **diode** slipper strømmen bare én vei, og en **LED** lyser når strømmen går riktig vei.

## Seriekobling og parallellkobling
**Serie** (etter hverandre):
- Samme strøm gjennom alle komponentene.
- Spenningene summeres: $U = U_1 + U_2 + \\dots$
- Total resistans: $R = R_1 + R_2 + \\dots$
- Går én pære, går alle (som gamle juletrelys).

**Parallell** (ved siden av hverandre):
- Samme spenning over alle grenene.
- Strømmene summeres: $I = I_1 + I_2 + \\dots$
- $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$ – total resistans blir **mindre** enn den minste.
- Stikkontaktene i huset er parallellkoblet, så hvert apparat får 230 V.

**Kirchhoffs lover**: summen av strømmene inn i et knutepunkt er lik summen ut (1. lov), og summen av spenningene rundt en lukket krets er null (2. lov).

### Regneeksempel
To motstander på $R_1 = 6\\ \\Omega$ og $R_2 = 3\\ \\Omega$ kobles til et 12 V batteri.
- **I serie**: $R = 9\\ \\Omega$, $I = \\frac{12}{9} \\approx 1{,}33$ A. Spenningen over $R_1$ er $6\\cdot 1{,}33 = 8$ V og over $R_2$ er 4 V.
- **I parallell**: $\\frac1R = \\frac16 + \\frac13 = \\frac12$, så $R = 2\\ \\Omega$ og $I = 6$ A. Strømmen gjennom $R_1$ er 2 A og gjennom $R_2$ 4 A.

## Spenningskilder med indre resistans
Et ekte batteri har en **indre resistans** $R_i$. Klemmespenningen synker når strømmen øker: $U_k = \\varepsilon - R_iI$, der $\\varepsilon$ er **elektromotorisk spenning** (ems). Derfor blir lyset litt svakere når bilen starter – startmotoren trekker stor strøm.

## Elektrisitet i hjemmet og sikkerhet
I Norge er spenningen i stikkontakten **230 V vekselstrøm**. **Sikringer** bryter kretsen hvis strømmen blir for stor, og **jordfeilbryteren** bryter hvis strøm lekker ut av kretsen – for eksempel gjennom et menneske. Allerede rundt **30 mA** gjennom kroppen kan være farlig. Kortslutning (svært lav resistans) gir stor strøm og brannfare.`,
`## Charge and current
All electricity rests on **electric charge**. Protons are positive and electrons negative; like charges repel, unlike attract. Charge is measured in **coulombs (C)**, and one electron carries $e = 1.6\\cdot 10^{-19}$ C. In metals some electrons can move freely – which is why metals conduct.
- **Current** $I$ is how much charge passes per second: $I = \\dfrac{Q}{t}$, in **amperes (A)**.
- **Voltage** $U$ is the energy each charge gains or loses per coulomb, in **volts (V)**. Voltage is the 'pressure' that drives the current.
- **Resistance** $R$ is how much a component opposes the current, in **ohms (Ω)**.

## Ohm's law and power
$$U = RI$$
The power (energy per second) in a component is
$$P = UI = RI^2 = \\frac{U^2}{R}$$
Energy used is $E = Pt$. A 2000 W kettle on for 3 minutes uses $2000\\cdot 180 = 360,000$ J = 0.1 kWh.

## Resistance
A wire's resistance increases with **length** and decreases with **cross-section**: $R = \\rho\\dfrac{L}{A}$, where $\\rho$ is the material's **resistivity** (low for copper, hence its use in wires). In metals resistance rises with temperature. A **diode** lets current pass only one way, and an **LED** lights when current flows the right way.

## Series and parallel
**Series** (one after another):
- The same current through every component.
- Voltages add: $U = U_1 + U_2 + \\dots$
- Total resistance: $R = R_1 + R_2 + \\dots$
- If one bulb fails, all go out (like old Christmas lights).

**Parallel** (side by side):
- The same voltage across every branch.
- Currents add: $I = I_1 + I_2 + \\dots$
- $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$ – total resistance is **smaller** than the smallest.
- Household sockets are in parallel, so each appliance gets 230 V.

**Kirchhoff's laws**: the sum of currents into a junction equals the sum out (1st law), and the sum of voltages around a closed loop is zero (2nd law).

### Worked example
Two resistors $R_1 = 6\\ \\Omega$ and $R_2 = 3\\ \\Omega$ are connected to a 12 V battery.
- **In series**: $R = 9\\ \\Omega$, $I = \\frac{12}{9} \\approx 1.33$ A. The voltage across $R_1$ is $6\\cdot 1.33 = 8$ V and across $R_2$ 4 V.
- **In parallel**: $\\frac1R = \\frac16 + \\frac13 = \\frac12$, so $R = 2\\ \\Omega$ and $I = 6$ A. The current through $R_1$ is 2 A and through $R_2$ 4 A.

## Sources with internal resistance
A real battery has an **internal resistance** $R_i$. The terminal voltage drops as current rises: $U_t = \\varepsilon - R_iI$, where $\\varepsilon$ is the **electromotive force** (emf). That's why the lights dim slightly when a car starts – the starter motor draws a large current.

## Electricity at home and safety
In Norway the socket voltage is **230 V alternating current**. **Fuses** break the circuit if the current gets too large, and the **residual-current device** trips if current leaks out of the circuit – for example through a person. Around **30 mA** through the body can already be dangerous. A short circuit (very low resistance) gives a large current and a fire risk.`);

DEEP("VGFY1", "Atomer, stråling og universet",
`## Atommodeller gjennom historien
- **Dalton** (1803): atomer er udelelige kuler.
- **Thomson** (1897): oppdaget elektronet – «rosinbollemodellen».
- **Rutherford** (1911): sendte alfapartikler mot tynt gullfolie. De fleste gikk rett gjennom, men noen ble kastet tilbake. Konklusjon: atomet er mest tomrom, med en liten, tung, positiv **kjerne**.
- **Bohr** (1913): elektronene går i bestemte **energinivåer** (skall). De kan bare hoppe mellom nivåene.

## Spektre og fotoner
Når et elektron faller fra et høyere til et lavere energinivå, sendes det ut et **foton** med energi
$$E = hf = \\frac{hc}{\\lambda}$$
der $h = 6{,}63\\cdot 10^{-34}$ J·s er **Plancks konstant**. Fordi nivåene er bestemte for hvert grunnstoff, gir hvert stoff sitt eget **linjespekter** – et «fingeravtrykk». Slik kan astronomer finne ut hva stjerner består av, uten å reise dit. En glødende fast gjenstand gir et **kontinuerlig spekter**, og jo varmere den er, jo kortere bølgelengde stråler den mest ut (**Wiens forskyvningslov**: blå stjerner er varmere enn røde).

## Kjernefysikk
- Kjernen har **Z protoner** (atomnummer) og **N nøytroner**; **nukleontallet** er $A = Z + N$. Vi skriver for eksempel $^{14}_{\\;6}\\text{C}$.
- Kjernen holdes sammen av den **sterke kjernekraften**. **Bindingsenergien** viser seg som et **massetap**: kjernen veier litt mindre enn delene hver for seg, og forskjellen er energi etter $E = mc^2$.
- **Henfall**: alfa ($^4_2\\text{He}$ sendes ut, $A$ minker med 4 og $Z$ med 2), beta-minus (et nøytron blir til et proton, $Z$ øker med 1) og gamma (energirikt foton, ingen endring i $A$ eller $Z$).
- **Halveringstid** $T_{1/2}$: $N = N_0\\left(\\tfrac12\\right)^{t/T_{1/2}}$.
- **Fisjon**: tunge kjerner (uran-235) spaltes og frigjør energi – brukt i kjernekraftverk.
- **Fusjon**: lette kjerner (hydrogen) smelter sammen til helium og frigjør enda mer energi per masse. Det er dette som driver **sola** og stjernene.

### Regneeksempel: halveringstid
Jod-131 har halveringstid 8 døgn. Hvor stor andel er igjen etter 24 døgn? $\\left(\\tfrac12\\right)^{24/8} = \\left(\\tfrac12\\right)^{3} = \\tfrac18 = 12{,}5\\ \\%$.

## Universet
- **Big Bang**: universet startet for rundt **13,8 milliarder** år siden i en ekstremt varm og tett tilstand og har utvidet seg siden. Bevisene er at fjerne galakser fjerner seg fra oss (**rødforskyvning**, Hubbles lov – jo lenger unna, jo raskere), den **kosmiske bakgrunnsstrålingen** (et ekko av den tidlige varmen, oppdaget i 1965) og mengden hydrogen og helium i universet.
- **Stjerners liv**: stjerner dannes når gass- og støvskyer trekker seg sammen og fusjon starter. Sola er en middels stjerne, rundt 4,6 milliarder år gammel, og vil om rundt 5 milliarder år svulme opp til en **rød kjempe** og ende som en **hvit dverg**. Mye tyngre stjerner ender i en **supernova** og blir til en **nøytronstjerne** eller et **sort hull**. Grunnstoffene tyngre enn helium – også karbonet og oksygenet i kroppen din – er laget i stjerner: «vi er stjernestøv».
- **Mørk materie og mørk energi**: vanlig materie utgjør bare rundt 5 % av universet. Resten er **mørk materie** (som vi bare merker gjennom tyngdekraften) og **mørk energi** (som får utvidelsen til å akselerere).
- **Avstander**: et **lysår** er avstanden lyset går på ett år, rundt $9{,}5\\cdot 10^{15}$ m. Nærmeste stjerne etter sola, Proxima Centauri, er 4,2 lysår unna.`,
`## Atomic models through history
- **Dalton** (1803): atoms are indivisible spheres.
- **Thomson** (1897): discovered the electron – the 'plum pudding model'.
- **Rutherford** (1911): fired alpha particles at thin gold foil. Most went straight through, but some bounced back. Conclusion: the atom is mostly empty space with a small, heavy, positive **nucleus**.
- **Bohr** (1913): electrons occupy fixed **energy levels** (shells). They can only jump between levels.

## Spectra and photons
When an electron drops from a higher to a lower energy level, a **photon** is emitted with energy
$$E = hf = \\frac{hc}{\\lambda}$$
where $h = 6.63\\cdot 10^{-34}$ J·s is **Planck's constant**. Because the levels are fixed for each element, every substance has its own **line spectrum** – a 'fingerprint'. That is how astronomers find out what stars are made of without going there. A glowing solid gives a **continuous spectrum**, and the hotter it is, the shorter the wavelength it emits most strongly (**Wien's displacement law**: blue stars are hotter than red ones).

## Nuclear physics
- The nucleus has **Z protons** (atomic number) and **N neutrons**; the **nucleon number** is $A = Z + N$. We write e.g. $^{14}_{\\;6}\\text{C}$.
- The nucleus is held together by the **strong nuclear force**. The **binding energy** shows up as a **mass defect**: the nucleus weighs slightly less than its parts, and the difference is energy by $E = mc^2$.
- **Decay**: alpha ($^4_2\\text{He}$ emitted, $A$ falls by 4 and $Z$ by 2), beta-minus (a neutron becomes a proton, $Z$ rises by 1) and gamma (an energetic photon, no change in $A$ or $Z$).
- **Half-life** $T_{1/2}$: $N = N_0\\left(\\tfrac12\\right)^{t/T_{1/2}}$.
- **Fission**: heavy nuclei (uranium-235) split and release energy – used in nuclear power stations.
- **Fusion**: light nuclei (hydrogen) fuse into helium and release even more energy per mass. This powers the **Sun** and stars.

### Worked example: half-life
Iodine-131 has a half-life of 8 days. What fraction is left after 24 days? $\\left(\\tfrac12\\right)^{24/8} = \\left(\\tfrac12\\right)^{3} = \\tfrac18 = 12.5\\%$.

## The universe
- **The Big Bang**: the universe began about **13.8 billion** years ago in an extremely hot, dense state and has expanded ever since. The evidence: distant galaxies are moving away (**redshift**, Hubble's law – the further, the faster), the **cosmic microwave background** (an echo of the early heat, discovered in 1965) and the amounts of hydrogen and helium in the universe.
- **The life of stars**: stars form when clouds of gas and dust contract and fusion begins. The Sun is a middle-sized star about 4.6 billion years old; in about 5 billion years it will swell into a **red giant** and end as a **white dwarf**. Much heavier stars end in a **supernova** and become a **neutron star** or a **black hole**. Elements heavier than helium – including the carbon and oxygen in your body – were made in stars: 'we are stardust'.
- **Dark matter and dark energy**: ordinary matter makes up only about 5% of the universe. The rest is **dark matter** (detected only through gravity) and **dark energy** (which makes the expansion accelerate).
- **Distances**: a **light year** is the distance light travels in a year, about $9.5\\cdot 10^{15}$ m. The nearest star after the Sun, Proxima Centauri, is 4.2 light years away.`);

// ===================== FYSIKK 2 =====================
DEEP("VGFY2", "Kast og bevegelse i to dimensjoner",
`## Del bevegelsen i to retninger
Det smarte trikset i to dimensjoner er å dele bevegelsen i en **horisontal (x)** og en **vertikal (y)** del som er **uavhengige** av hverandre. Uten luftmotstand er det ingen kraft horisontalt, så farten er **konstant** i x-retning. Vertikalt virker tyngden, så akselerasjonen er $-g$ i y-retning.

$$x = v_{0x}t \\qquad y = v_{0y}t - \\tfrac12 gt^2$$
$$v_x = v_{0x} \\qquad v_y = v_{0y} - gt$$
med $v_{0x} = v_0\\cos\\alpha$ og $v_{0y} = v_0\\sin\\alpha$, der $\\alpha$ er utgangsvinkelen.

## Viktige resultater
- **Banen** er en **parabel**.
- I **toppunktet** er $v_y = 0$, men $v_x$ er fortsatt den samme – farten er ikke null der.
- **Stigetid** til toppen: $t_{\\text{topp}} = \\dfrac{v_0\\sin\\alpha}{g}$. **Maksimal høyde**: $h = \\dfrac{(v_0\\sin\\alpha)^2}{2g}$.
- **Rekkevidde** på flatt underlag: $R = \\dfrac{v_0^2\\sin 2\\alpha}{g}$. Den er størst for $\\alpha = 45°$, og to vinkler som til sammen er 90° (for eksempel 30° og 60°) gir samme rekkevidde.
- En kule som **slippes** og en kule som **skytes ut vannrett** fra samme høyde, treffer bakken **samtidig** – fordi den vertikale bevegelsen er den samme.

### Regneeksempel
En fotball sparkes med $v_0 = 20$ m/s i 30° vinkel. Hvor høyt går den, og hvor langt?
- $v_{0x} = 20\\cos 30° \\approx 17{,}3$ m/s, $v_{0y} = 20\\sin 30° = 10$ m/s.
- Toppunkt: $t = \\frac{10}{9{,}81} \\approx 1{,}02$ s og $h = \\frac{10^2}{2\\cdot 9{,}81} \\approx 5{,}1$ m.
- Tid i lufta (flatt underlag): $2\\cdot 1{,}02 = 2{,}04$ s. Rekkevidde: $17{,}3\\cdot 2{,}04 \\approx 35$ m.

## Vektorer
Posisjon, fart og akselerasjon er **vektorer**. Farten i et punkt er $v = \\sqrt{v_x^2 + v_y^2}$, og retningen finner du med $\\tan\\theta = \\dfrac{v_y}{v_x}$. Vektorer legges sammen komponent for komponent – som når en båt krysser en elv med strøm, eller et fly har sidevind.

## Luftmotstand
I virkeligheten bremser luftmotstanden både den horisontale og den vertikale bevegelsen. Banen blir da **asymmetrisk** – brattere ned enn opp – og rekkevidden kortere, og den beste vinkelen blir mindre enn 45°. Luftmotstanden er omtrent proporsjonal med $v^2$ ved vanlige farter, så den betyr mye for raske baller og prosjektiler. Slike baner beregnes numerisk med datamaskin.`,
`## Split the motion in two directions
The key trick in two dimensions is to split the motion into a **horizontal (x)** and a **vertical (y)** part that are **independent**. Without air resistance there is no horizontal force, so velocity is **constant** in x. Vertically gravity acts, so acceleration is $-g$ in y.

$$x = v_{0x}t \\qquad y = v_{0y}t - \\tfrac12 gt^2$$
$$v_x = v_{0x} \\qquad v_y = v_{0y} - gt$$
with $v_{0x} = v_0\\cos\\alpha$ and $v_{0y} = v_0\\sin\\alpha$, where $\\alpha$ is the launch angle.

## Key results
- The **path** is a **parabola**.
- At the **top** $v_y = 0$, but $v_x$ is still the same – the speed is not zero there.
- **Time to the top**: $t_{\\text{top}} = \\dfrac{v_0\\sin\\alpha}{g}$. **Maximum height**: $h = \\dfrac{(v_0\\sin\\alpha)^2}{2g}$.
- **Range** on level ground: $R = \\dfrac{v_0^2\\sin 2\\alpha}{g}$. It is greatest at $\\alpha = 45°$, and two angles summing to 90° (e.g. 30° and 60°) give the same range.
- A ball **dropped** and a ball **fired horizontally** from the same height hit the ground **at the same time** – because their vertical motion is identical.

### Worked example
A football is kicked at $v_0 = 20$ m/s at 30°. How high and how far does it go?
- $v_{0x} = 20\\cos 30° \\approx 17.3$ m/s, $v_{0y} = 20\\sin 30° = 10$ m/s.
- Top: $t = \\frac{10}{9.81} \\approx 1.02$ s and $h = \\frac{10^2}{2\\cdot 9.81} \\approx 5.1$ m.
- Time in the air (level ground): $2\\cdot 1.02 = 2.04$ s. Range: $17.3\\cdot 2.04 \\approx 35$ m.

## Vectors
Position, velocity and acceleration are **vectors**. The speed at a point is $v = \\sqrt{v_x^2 + v_y^2}$, and the direction follows from $\\tan\\theta = \\dfrac{v_y}{v_x}$. Vectors add component by component – as when a boat crosses a river with a current, or a plane has a crosswind.

## Air resistance
In reality air resistance slows both horizontal and vertical motion. The path becomes **asymmetric** – steeper coming down than going up – the range shorter, and the best angle less than 45°. Drag is roughly proportional to $v^2$ at ordinary speeds, so it matters a lot for fast balls and projectiles. Such paths are computed numerically.`);

DEEP("VGFY2", "Sirkelbevegelse og gravitasjon",
`## Jevn sirkelbevegelse
Et legeme som går i sirkel med konstant fart, **akselererer** likevel – fordi **retningen** på farten hele tiden endres. Akselerasjonen peker mot **sentrum** av sirkelen og kalles **sentripetalakselerasjon**:
$$a = \\frac{v^2}{r} = \\frac{4\\pi^2 r}{T^2}$$
der $T$ er **omløpstiden** og $v = \\dfrac{2\\pi r}{T}$. Etter Newtons 2. lov må det da virke en **kraftsum inn mot sentrum**: $\\sum F = \\dfrac{mv^2}{r}$. Dette er ingen egen kraft – det er summen av de vanlige kreftene (snorkraft, friksjon, normalkraft, tyngde) som må peke innover.

- En bil i sving: **friksjonen** fra vegen gir kraften inn mot sentrum. Er det glatt, er friksjonen for liten, og bilen sklir rett fram (tangentielt) – ikke «ut».
- En stein i en snor: **snordraget** gir kraften.
- En berg-og-dal-bane i en loop: i toppen virker både tyngden og normalkraften nedover (inn mot sentrum).
Følelsen av å bli «slengt utover» kommer av **tregheten**: kroppen vil fortsette rett fram.

### Regneeksempel: Bil i sving
En bil på 1200 kg kjører i 72 km/h = 20 m/s gjennom en sving med radius 50 m. Hvor stor friksjon trengs?
$$F = \\frac{mv^2}{r} = \\frac{1200\\cdot 20^2}{50} = 9600\\ \\text{N}$$
Med $\\mu = 0{,}8$ (tørr asfalt) er maksimal friksjon $0{,}8\\cdot 1200\\cdot 9{,}81 \\approx 9400$ N – litt for lite. Bilen sklir ut. På vinterføre er marginene enda mindre.

## Newtons gravitasjonslov
To masser tiltrekker hverandre med en kraft
$$F = \\gamma\\frac{m_1m_2}{r^2}$$
der $\\gamma = 6{,}67\\cdot 10^{-11}\\ \\text{N m}^2/\\text{kg}^2$ og $r$ er avstanden mellom sentrene. Kraften avtar med **kvadratet** av avstanden: dobbelt så langt unna gir en fjerdedel av kraften. Tyngdeakselerasjonen ved jordoverflaten er $g = \\gamma\\dfrac{M}{R^2} \\approx 9{,}81\\ \\text{m/s}^2$.

## Satellitter og planetbaner
For en satellitt i sirkelbane er det **gravitasjonskraften** som gir kraften inn mot sentrum:
$$\\gamma\\frac{Mm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{\\gamma M}{r}}$$
Farten avhenger ikke av satellittens masse. Jo høyere banen er, jo lavere fart og jo lengre omløpstid. Den internasjonale romstasjonen (ISS) går rundt jorda på om lag 90 minutter, mens en **geostasjonær** satellitt (om lag 36 000 km over ekvator) bruker et døgn og ser ut til å stå stille over samme punkt – nyttig for tv og værsatellitter.

Astronautene i ISS er **ikke** vektløse fordi tyngdekraften er borte (den er rundt 90 % av den på bakken), men fordi de og stasjonen **faller fritt** rundt jorda hele tiden.

## Keplers lover
Johannes Kepler fant ut (1609–1619) at: 1) planetene går i **ellipser** med sola i det ene brennpunktet, 2) en linje fra sola til planeten sveiper over **like store arealer på like lang tid** (planeten går fortere nær sola), og 3) $\\dfrac{T^2}{r^3}$ er **lik for alle planetene** rundt sola. Newton viste at alle tre følger av gravitasjonsloven.

## Unnslipningsfart
For å komme helt løs fra et himmellegeme må et legeme ha minst **unnslipningsfarten** $v = \\sqrt{\\dfrac{2\\gamma M}{R}}$ – for jorda om lag **11,2 km/s**. Et **sort hull** er så kompakt at ikke engang lyset kommer ut.`,
`## Uniform circular motion
An object moving in a circle at constant speed is still **accelerating** – because the **direction** of its velocity keeps changing. The acceleration points to the **centre** and is called **centripetal acceleration**:
$$a = \\frac{v^2}{r} = \\frac{4\\pi^2 r}{T^2}$$
where $T$ is the **period** and $v = \\dfrac{2\\pi r}{T}$. By Newton's 2nd law there must be a **net force towards the centre**: $\\sum F = \\dfrac{mv^2}{r}$. This is not a separate force – it is the sum of the usual forces (tension, friction, normal force, weight) that must point inward.

- A car on a bend: **friction** from the road supplies the inward force. If it's slippery, friction is too small and the car slides straight on (tangentially) – not 'outwards'.
- A stone on a string: the **tension** supplies the force.
- A roller-coaster loop: at the top both weight and the normal force act downwards (towards the centre).
The feeling of being 'flung outwards' comes from **inertia**: your body wants to carry straight on.

### Worked example: Car on a bend
A 1200 kg car travels at 72 km/h = 20 m/s round a bend of radius 50 m. How much friction is needed?
$$F = \\frac{mv^2}{r} = \\frac{1200\\cdot 20^2}{50} = 9600\\ \\text{N}$$
With $\\mu = 0.8$ (dry asphalt) the maximum friction is $0.8\\cdot 1200\\cdot 9.81 \\approx 9400$ N – slightly too little. The car skids. On winter roads the margins are even smaller.

## Newton's law of gravitation
Two masses attract each other with a force
$$F = \\gamma\\frac{m_1m_2}{r^2}$$
where $\\gamma = 6.67\\cdot 10^{-11}\\ \\text{N m}^2/\\text{kg}^2$ and $r$ is the distance between centres. The force falls with the **square** of the distance: twice as far gives a quarter of the force. The gravitational acceleration at the Earth's surface is $g = \\gamma\\dfrac{M}{R^2} \\approx 9.81\\ \\text{m/s}^2$.

## Satellites and planetary orbits
For a satellite in a circular orbit, **gravity** provides the force towards the centre:
$$\\gamma\\frac{Mm}{r^2} = \\frac{mv^2}{r} \\Rightarrow v = \\sqrt{\\frac{\\gamma M}{r}}$$
The speed does not depend on the satellite's mass. The higher the orbit, the lower the speed and the longer the period. The International Space Station (ISS) orbits the Earth in about 90 minutes, while a **geostationary** satellite (about 36,000 km above the equator) takes a day and seems to hover over the same point – useful for TV and weather satellites.

Astronauts on the ISS are **not** weightless because gravity is gone (it is about 90% of that on the ground) but because they and the station are constantly **falling freely** around the Earth.

## Kepler's laws
Johannes Kepler found (1609–1619) that: 1) planets move in **ellipses** with the Sun at one focus, 2) a line from the Sun to a planet sweeps out **equal areas in equal times** (the planet moves faster near the Sun), and 3) $\\dfrac{T^2}{r^3}$ is **the same for all planets** round the Sun. Newton showed all three follow from the law of gravitation.

## Escape velocity
To escape completely from a body an object needs at least the **escape velocity** $v = \\sqrt{\\dfrac{2\\gamma M}{R}}$ – about **11.2 km/s** for the Earth. A **black hole** is so compact that not even light escapes.`);

DEEP("VGFY2", "Elektromagnetisme",
`## Elektriske felt
Rundt en elektrisk ladning finnes et **elektrisk felt** – et område der andre ladninger påvirkes av en kraft. **Feltstyrken** er kraften per ladning: $E = \\dfrac{F}{q}$, enhet N/C (eller V/m).
- **Coulombs lov**: kraften mellom to punktladninger er $F = k\\dfrac{q_1q_2}{r^2}$, med $k = 8{,}99\\cdot 10^9\\ \\text{N m}^2/\\text{C}^2$ – samme form som gravitasjonsloven.
- Mellom to parallelle, ladde plater er feltet **homogent**: $E = \\dfrac{U}{d}$.
- **Feltlinjer** går fra positive mot negative ladninger. Tette linjer betyr sterkt felt.
- En ladning som akselereres gjennom spenningen $U$, får kinetisk energi $qU$. Elektronvolt (eV) er energien et elektron får gjennom 1 V.

## Magnetiske felt
Magneter har en **nordpol** og en **sydpol**; like poler frastøter, ulike tiltrekker. Jorda er selv en stor magnet. Magnetfeltets styrke måles som **flukstetthet** $B$ i **tesla (T)**.
- **Strøm lager magnetfelt** (Ørsted, 1820): rundt en rett leder går feltlinjene i sirkler, og i en **spole** blir feltet som i en stavmagnet. Det er prinsippet i **elektromagneter**.
- **Kraft på strømførende leder** i et magnetfelt: $F = BIl$ (når lederen står vinkelrett på feltet). Dette driver **elektromotorer**.
- **Kraft på ladning i bevegelse**: $F = qvB$. Kraften står vinkelrett på farten, så ladningen går i sirkel med radius $r = \\dfrac{mv}{qB}$. Slik fanger jordas magnetfelt ladde partikler fra sola, som så gir **nordlys** når de treffer atmosfæren nær polene.

## Elektromagnetisk induksjon
Michael **Faraday** oppdaget i 1831 at et magnetfelt som **endrer seg** gjennom en spole, lager (induserer) en spenning:
$$\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}$$
der $\\Phi = BA$ er den **magnetiske fluksen** og $N$ antall vindinger. Minustegnet uttrykker **Lenz' lov**: den induserte strømmen motvirker endringen som skapte den.
- **Generatoren**: en spole roterer i et magnetfelt (eller en magnet roterer i en spole), og fluksen endres hele tiden. Det gir **vekselstrøm**. Nesten all strøm i verden lages slik – i vannkraft-, vind-, gass- og kjernekraftverk.
- **Transformatoren**: to spoler rundt samme jernkjerne. Vekselstrøm i den ene gir vekslende fluks som induserer spenning i den andre: $\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1}$. Strømnettet transformerer opp til høy spenning (for eksempel 420 kV) for å redusere tapet ($P_{\\text{tap}} = RI^2$), og ned til 230 V i husene.
- **Induksjonstopp**: et vekslende magnetfelt induserer strøm i bunnen av kjelen, som blir varm.
- Andre eksempler: trådløs lading, metalldetektorer, bremser i berg-og-dal-baner (virvelstrømmer).

## Elektromagnetiske bølger
James Clerk **Maxwell** viste (1860-årene) at et vekslende elektrisk felt lager et vekslende magnetfelt og omvendt, og at de sammen kan bre seg ut som en **elektromagnetisk bølge** med lysfarten. **Lys** er altså en elektromagnetisk bølge – og det samme er radio, mikrobølger, røntgen og gammastråling. For alle gjelder $c = f\\lambda$.`,
`## Electric fields
Around an electric charge there is an **electric field** – a region where other charges feel a force. **Field strength** is force per charge: $E = \\dfrac{F}{q}$, in N/C (or V/m).
- **Coulomb's law**: the force between two point charges is $F = k\\dfrac{q_1q_2}{r^2}$, with $k = 8.99\\cdot 10^9\\ \\text{N m}^2/\\text{C}^2$ – the same form as the law of gravitation.
- Between two parallel charged plates the field is **uniform**: $E = \\dfrac{U}{d}$.
- **Field lines** run from positive to negative charges. Dense lines mean a strong field.
- A charge accelerated through voltage $U$ gains kinetic energy $qU$. An electronvolt (eV) is the energy an electron gains through 1 V.

## Magnetic fields
Magnets have a **north pole** and a **south pole**; like poles repel, unlike attract. The Earth is itself a big magnet. Magnetic field strength is measured as **flux density** $B$ in **tesla (T)**.
- **Currents create magnetic fields** (Ørsted, 1820): around a straight wire the field lines form circles, and in a **coil** the field is like a bar magnet's. This is the principle of **electromagnets**.
- **Force on a current-carrying wire** in a magnetic field: $F = BIl$ (when the wire is perpendicular to the field). This drives **electric motors**.
- **Force on a moving charge**: $F = qvB$. The force is perpendicular to the velocity, so the charge moves in a circle of radius $r = \\dfrac{mv}{qB}$. This is how the Earth's magnetic field traps charged particles from the Sun, which then cause the **aurora** when they hit the atmosphere near the poles.

## Electromagnetic induction
Michael **Faraday** discovered in 1831 that a **changing** magnetic field through a coil creates (induces) a voltage:
$$\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}$$
where $\\Phi = BA$ is the **magnetic flux** and $N$ the number of turns. The minus sign expresses **Lenz's law**: the induced current opposes the change that caused it.
- **The generator**: a coil rotates in a magnetic field (or a magnet in a coil), so the flux keeps changing. This gives **alternating current**. Almost all the world's electricity is made this way – in hydro, wind, gas and nuclear plants.
- **The transformer**: two coils on the same iron core. AC in one gives changing flux that induces voltage in the other: $\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1}$. The grid steps up to high voltage (e.g. 420 kV) to reduce losses ($P_{\\text{loss}} = RI^2$), and down to 230 V for homes.
- **Induction hobs**: a changing magnetic field induces currents in the base of the pan, which heats up.
- Other examples: wireless charging, metal detectors, roller-coaster brakes (eddy currents).

## Electromagnetic waves
James Clerk **Maxwell** showed (1860s) that a changing electric field creates a changing magnetic field and vice versa, and that together they can travel as an **electromagnetic wave** at the speed of light. **Light** is an electromagnetic wave – as are radio, microwaves, X-rays and gamma rays. For all of them $c = f\\lambda$.`);

DEEP("VGFY2", "Kvantefysikk og relativitet",
`## Lys som partikler: fotoelektrisk effekt
Rundt 1900 viste flere forsøk at lys ikke bare oppfører seg som bølger. I den **fotoelektriske effekten** slår lys elektroner løs fra en metallflate. Men det skjer bare hvis lysets **frekvens** er høy nok – rødt lys klarer det ikke, uansett hvor sterkt det er, mens svakt UV-lys klarer det. **Einstein** forklarte i 1905 at lyset kommer i energipakker, **fotoner**, med energi $E = hf$. Ett foton slår løs ett elektron:
$$E_k = hf - W$$
der $W$ er **løsrivningsarbeidet** for metallet. Einstein fikk Nobelprisen for dette i 1921. Solceller og kamerasensorer bygger på samme prinsipp.

## Partikler som bølger
**de Broglie** (1924) foreslo at også partikler har en bølgelengde: $\\lambda = \\dfrac{h}{p}$. Det ble bekreftet da elektroner viste **interferens**, akkurat som lys. **Elektronmikroskopet** utnytter at elektroner har mye kortere bølgelengde enn lys og derfor kan vise mye mindre detaljer. Dette er **bølge–partikkel-dualiteten**: lys og materie har både bølge- og partikkelegenskaper.

## Kvantemekanikkens rare verden
- **Heisenbergs uskarphetsrelasjon**: vi kan ikke samtidig kjenne både posisjonen og bevegelsesmengden til en partikkel nøyaktig: $\\Delta x\\,\\Delta p \\ge \\dfrac{h}{4\\pi}$. Det er ikke et måleproblem, men en egenskap ved naturen.
- **Sannsynlighet**: kvantemekanikken forutsier bare **sannsynligheten** for hvor en partikkel blir funnet. Før måling kan en partikkel være i en **superposisjon** av flere tilstander.
- **Sammenfiltring**: to partikler kan henge sammen slik at måling på den ene øyeblikkelig avgjør utfallet for den andre, uansett avstand (Nobelprisen 2022).
- **Bruk**: lasere, transistorer og alle datamaskiner, LED, MR-maskiner og – i framtiden – **kvantedatamaskiner**.

## Den spesielle relativitetsteorien (1905)
Einstein bygde på to postulater:
1. Fysikkens lover er **de samme** i alle referansesystemer som beveger seg med konstant fart i forhold til hverandre.
2. **Lysfarten** i vakuum er den samme, $c \\approx 3{,}00\\cdot 10^8$ m/s, for alle observatører – uansett hvordan de eller lyskilden beveger seg.
Følgene er overraskende:
- **Tidsdilatasjon**: klokker som beveger seg, går **langsommere**: $\\Delta t = \\gamma\\,\\Delta t_0$, der $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$. **Myoner** dannet høyt oppe i atmosfæren lever for kort til å nå bakken – men gjør det likevel, fordi tiden deres går saktere sett fra oss.
- **Lengdekontraksjon**: en gjenstand i bevegelse blir kortere i fartsretningen: $L = \\dfrac{L_0}{\\gamma}$.
- Ingenting med masse kan nå lysfarten.
- **Masse og energi** er ekvivalente: $E = mc^2$. Litt masse tilsvarer enormt mye energi – det forklarer energien i kjernekraft og i sola.

## Den generelle relativitetsteorien (1915)
Einstein utvidet teorien til å gjelde tyngdekraft: masse **krummer rom og tid**, og legemer følger de «rette» banene i det krumme rom-tiden. Tid går saktere i sterkt tyngdefelt. Teorien forutsa at lys bøyes rundt sola (bekreftet 1919), **sorte hull** og **gravitasjonsbølger** (målt første gang i 2015). Uten korreksjoner for både spesiell og generell relativitet ville **GPS** bomme med flere kilometer per døgn.`,
`## Light as particles: the photoelectric effect
Around 1900 several experiments showed that light doesn't only behave as waves. In the **photoelectric effect** light knocks electrons out of a metal surface. But this only happens if the light's **frequency** is high enough – red light can't do it however bright, while faint UV can. **Einstein** explained in 1905 that light comes in energy packets, **photons**, with energy $E = hf$. One photon frees one electron:
$$E_k = hf - W$$
where $W$ is the metal's **work function**. Einstein received the Nobel Prize for this in 1921. Solar cells and camera sensors rely on the same principle.

## Particles as waves
**de Broglie** (1924) proposed that particles also have a wavelength: $\\lambda = \\dfrac{h}{p}$. This was confirmed when electrons showed **interference**, just like light. The **electron microscope** uses the fact that electrons have much shorter wavelengths than light and so can show far smaller details. This is **wave–particle duality**: light and matter have both wave and particle properties.

## The strange world of quantum mechanics
- **Heisenberg's uncertainty principle**: we cannot know both the position and the momentum of a particle exactly at the same time: $\\Delta x\\,\\Delta p \\ge \\dfrac{h}{4\\pi}$. It is not a measurement problem but a property of nature.
- **Probability**: quantum mechanics only predicts the **probability** of where a particle will be found. Before measurement a particle can be in a **superposition** of several states.
- **Entanglement**: two particles can be linked so that measuring one instantly determines the outcome for the other, whatever the distance (Nobel Prize 2022).
- **Uses**: lasers, transistors and all computers, LEDs, MRI scanners and – in future – **quantum computers**.

## Special relativity (1905)
Einstein built on two postulates:
1. The laws of physics are **the same** in all frames moving at constant velocity relative to each other.
2. The **speed of light** in a vacuum is the same, $c \\approx 3.00\\cdot 10^8$ m/s, for all observers – however they or the source move.
The consequences are surprising:
- **Time dilation**: moving clocks run **slow**: $\\Delta t = \\gamma\\,\\Delta t_0$, where $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$. **Muons** created high in the atmosphere live too briefly to reach the ground – yet they do, because their time runs slower as seen from us.
- **Length contraction**: a moving object is shorter in the direction of motion: $L = \\dfrac{L_0}{\\gamma}$.
- Nothing with mass can reach the speed of light.
- **Mass and energy** are equivalent: $E = mc^2$. A little mass corresponds to an enormous amount of energy – explaining the energy in nuclear power and in the Sun.

## General relativity (1915)
Einstein extended the theory to gravity: mass **curves space and time**, and objects follow the 'straight' paths in curved spacetime. Time runs slower in a strong gravitational field. The theory predicted that light bends around the Sun (confirmed 1919), **black holes** and **gravitational waves** (first detected in 2015). Without corrections for both special and general relativity, **GPS** would drift by several kilometres a day.`);
})();
