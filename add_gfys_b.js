// ============================================================
//  GFYS Grunnleggende fysikk – enhet 3, 4 og 5
//  (3: Arbeid, energi og effekt, 4: Trykk, tetthet og varme, 5: Elektrisitet)
//  Teori, faste oppgaver (BIQ) og generatorer (GEN).
// ============================================================

// ---------------- Enhet 3: Arbeid, energi og effekt ----------------
THEORY("GFYS", 3, {
nb: `## Hva handler det om?

Energi er evnen til å utføre arbeid. Den finnes i mange former: bevegelsesenergi (kinetisk energi), stillingsenergi (potensiell energi), varme, kjemisk energi i drivstoff og elektrisk energi. Det viktigste prinsippet i hele fysikken er at **energi ikke kan skapes eller forsvinne – den kan bare gå over fra én form til en annen**.

For en ingeniør er dette et svært kraftig verktøy. Med energibetraktninger kan du finne farten til en gjenstand uten å kjenne alle detaljene i bevegelsen, regne ut hvor sterk motor en heis trenger, og finne ut hvor mye strøm en maskin bruker. Du kommer til å bruke dette igjen i fysikk, mekanikk og termodynamikk.

## Begreper og formler

- **Arbeid** $W$ måles i joule (J), og $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$. Når en kraft $F$ virker mens noe flyttes strekningen $s$, er $W = Fs\\cos\\theta$, der $\\theta$ er vinkelen mellom kraften og bevegelsesretningen.
- Virker kraften rett langs bevegelsen, er $\\cos 0^\\circ = 1$ og $W = Fs$. Står kraften **vinkelrett** på bevegelsen, er arbeidet null. Virker den **mot** bevegelsen (som friksjon), er arbeidet negativt.
- **Kinetisk energi** (bevegelsesenergi): $E_k = \\tfrac12 mv^2$. Dobbel fart gir fire ganger så mye energi.
- **Potensiell energi** (stillingsenergi) i tyngdefeltet: $E_p = mgh$, der $h$ er høyden over et nullnivå du velger selv, og $g = 9{,}81\\ \\mathrm{m/s^2}$.
- **Arbeid og kinetisk energi**: det samlede arbeidet på en gjenstand er lik endringen i kinetisk energi, $W_{\\text{netto}} = \\Delta E_k$.
- **Energibevaring** uten friksjon: $E_{k1} + E_{p1} = E_{k2} + E_{p2}$. Med friksjon går en del av energien over til varme: $E_1 = E_2 + W_f$, der $W_f = F_f\\cdot s$ er friksjonsarbeidet.
- **Effekt** $P$ er arbeid eller energi per tid, målt i watt: $P = W/t$, og $1\\text{ W} = 1\\text{ J/s}$. Ved konstant fart $v$ er $P = Fv$.
- **Kilowattime**: $1\\text{ kWh} = 1000\\text{ W}\\cdot 3600\\text{ s} = 3{,}6\\text{ MJ}$. Strømregningen måles i kWh.
- **Virkningsgrad**: $\\eta = P_{\\text{ut}}/P_{\\text{inn}}$, altså nyttig effekt delt på tilført effekt. Den er alltid mindre enn 1 (100 %), fordi noe alltid blir til varme.

$$E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_f$$

## Slik løser du oppgavene

1. Skriv opp hva som er gitt, og gjør om til SI-enheter: km/h til m/s (del på 3,6), minutter til sekunder, gram til kilogram.
2. Bestem hva som spørres etter: arbeid, energi, fart, effekt eller virkningsgrad.
3. Skal du finne fart eller høyde, velger du et nullnivå for høyden og skriver opp energien i start og slutt.
4. Sett energien før lik energien etter, pluss eventuelt friksjonsarbeid, og løs for den ukjente.
5. For effekt: finn først arbeidet eller energien, og del på tiden. Er virkningsgraden oppgitt, deler du nyttig effekt på $\\eta$ for å få tilført effekt.
6. Kontroller enhet og størrelsesorden.

### Eksempel

En byggekran løfter en betongblokk på 500 kg rett opp 12 m på 20 s med konstant fart. Motoren har virkningsgrad 75 %. Hvor stor elektrisk effekt trekker motoren?

1. Arbeidet på blokken er økningen i potensiell energi: $W = mgh = 500\\cdot 9{,}81\\cdot 12 = 58\\,860$ J.
2. Nyttig effekt: $P_{\\text{ut}} = W/t = 58\\,860/20 = 2943$ W.
3. Tilført effekt: $P_{\\text{inn}} = P_{\\text{ut}}/\\eta = 2943/0{,}75 \\approx 3924$ W.

Svar: Motoren trekker omtrent 3,9 kW. Resten, nesten 1 kW, blir til varme i motor og gir.

Tenk deg at blokken henger i ro 12 m oppe og vaieren ryker. Hvor fort treffer den bakken? Energibevaring gir $mgh = \\tfrac12 mv^2$, så $v = \\sqrt{2gh} = \\sqrt{2\\cdot 9{,}81\\cdot 12} \\approx 15{,}3$ m/s. Legg merke til at massen forkortes bort.

## Vanlige feil

- Å bruke lengden langs en skråning i stedet for den loddrette høyden i $mgh$.
- Å glemme kvadratet eller faktoren $\\tfrac12$ i $E_k = \\tfrac12 mv^2$.
- Å regne med km/h eller minutter i stedet for m/s og sekunder.
- Å blande arbeid og effekt: joule er energi, watt er energi per sekund.
- Å dele feil vei med virkningsgraden. Tilført effekt er alltid større enn nyttig effekt.
- Å tro at tunge ting faller fortere. Uten luftmotstand får alle gjenstander samme fart fra samme høyde.

> Energi forsvinner aldri – den bytter bare form. Sett opp energien før og etter, og husk at effekt er energi per sekund.`,
en: `## What is it about?

Energy is the ability to do work. It comes in many forms: energy of motion (kinetic energy), energy of position (potential energy), heat, chemical energy in fuel and electrical energy. The most important principle in all of physics is that **energy cannot be created or destroyed – it can only change from one form into another**.

For an engineer this is a very powerful tool. With energy methods you can find the speed of an object without knowing every detail of its motion, work out how strong a motor an elevator needs, and find out how much electricity a machine uses. You will use these ideas again in physics, mechanics and thermodynamics.

## Key quantities and formulas

- **Work** $W$ is measured in joules (J), and $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$. When a force $F$ acts while something moves a distance $s$, $W = Fs\\cos\\theta$, where $\\theta$ is the angle between the force and the direction of motion.
- If the force acts straight along the motion, $\\cos 0^\\circ = 1$ and $W = Fs$. If the force is **perpendicular** to the motion, the work is zero. If it acts **against** the motion (like friction), the work is negative.
- **Kinetic energy** (energy of motion): $E_k = \\tfrac12 mv^2$. Twice the speed gives four times the energy.
- **Potential energy** (energy of position) in the gravitational field: $E_p = mgh$, where $h$ is the height above a reference level you choose yourself, and $g = 9.81\\ \\mathrm{m/s^2}$.
- **Work and kinetic energy**: the total work done on an object equals its change in kinetic energy, $W_{\\text{net}} = \\Delta E_k$.
- **Conservation of energy** without friction: $E_{k1} + E_{p1} = E_{k2} + E_{p2}$. With friction, part of the energy turns into heat: $E_1 = E_2 + W_f$, where $W_f = F_f\\cdot s$ is the work done by friction.
- **Power** $P$ is work or energy per unit time, measured in watts: $P = W/t$, and $1\\text{ W} = 1\\text{ J/s}$. At constant speed $v$, $P = Fv$.
- **Kilowatt-hour**: $1\\text{ kWh} = 1000\\text{ W}\\cdot 3600\\text{ s} = 3.6\\text{ MJ}$. Electricity bills are measured in kWh.
- **Efficiency**: $\\eta = P_{\\text{out}}/P_{\\text{in}}$, that is, useful power divided by input power. It is always less than 1 (100 %), because some energy always ends up as heat.

$$E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_f$$

## How to solve the problems

1. Write down what is given and convert to SI units: km/h to m/s (divide by 3.6), minutes to seconds, grams to kilograms.
2. Decide what is asked for: work, energy, speed, power or efficiency.
3. If you need a speed or a height, choose a reference level for height and write down the energy at the start and at the end.
4. Set the energy before equal to the energy after, plus any work done by friction, and solve for the unknown.
5. For power: first find the work or energy, then divide by the time. If an efficiency is given, divide the useful power by $\\eta$ to get the input power.
6. Check the unit and the order of magnitude.

### Example

A construction crane lifts a 500 kg concrete block straight up 12 m in 20 s at constant speed. The motor has an efficiency of 75 %. How much electrical power does the motor draw?

1. The work done on the block is the increase in potential energy: $W = mgh = 500\\cdot 9.81\\cdot 12 = 58\\,860$ J.
2. Useful power: $P_{\\text{out}} = W/t = 58\\,860/20 = 2943$ W.
3. Input power: $P_{\\text{in}} = P_{\\text{out}}/\\eta = 2943/0.75 \\approx 3924$ W.

Answer: The motor draws about 3.9 kW. The rest, almost 1 kW, becomes heat in the motor and gearbox.

Now imagine the block hanging at rest 12 m up when the cable snaps. How fast does it hit the ground? Conservation of energy gives $mgh = \\tfrac12 mv^2$, so $v = \\sqrt{2gh} = \\sqrt{2\\cdot 9.81\\cdot 12} \\approx 15.3$ m/s. Notice that the mass cancels out.

## Common mistakes

- Using the length along a slope instead of the vertical height in $mgh$.
- Forgetting the square or the factor $\\tfrac12$ in $E_k = \\tfrac12 mv^2$.
- Calculating with km/h or minutes instead of m/s and seconds.
- Mixing up work and power: the joule is energy, the watt is energy per second.
- Dividing the wrong way with the efficiency. The input power is always larger than the useful power.
- Believing that heavy objects fall faster. Without air resistance, all objects reach the same speed from the same height.

> Energy never disappears – it only changes form. Write down the energy before and after, and remember that power is energy per second.`
});

BIQ("GFYS", 3, [
  ["Hvilken enhet måles energi og arbeid i?", ["joule (J)", "watt (W)", "newton (N)", "pascal (Pa)"],
   "Energi og arbeid måles i joule: $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$. Watt er enheten for effekt (J/s), newton for kraft og pascal for trykk.",
   "What unit are energy and work measured in?", ["joule (J)", "watt (W)", "newton (N)", "pascal (Pa)"],
   "Energy and work are measured in joules: $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$. The watt is the unit of power (J/s), the newton of force and the pascal of pressure."],
  ["Du bærer en tung sekk bortover et flatt gulv med konstant fart. Hvor mye arbeid gjør tyngdekraften på sekken?",
   ["Null, fordi tyngdekraften står vinkelrett på bevegelsen", "$mgs$, der $s$ er strekningen du går", "Et negativt arbeid, fordi sekken er tung", "Det avhenger av hvor fort du går"],
   "Arbeid er $W = Fs\\cos\\theta$. Tyngdekraften peker rett ned og bevegelsen er vannrett, så $\\theta = 90^\\circ$ og $\\cos 90^\\circ = 0$. Høyden til sekken endres heller ikke, så $E_p$ er den samme hele veien.",
   "You carry a heavy bag across a level floor at constant speed. How much work does gravity do on the bag?",
   ["Zero, because gravity is perpendicular to the motion", "$mgs$, where $s$ is the distance you walk", "A negative amount, because the bag is heavy", "It depends on how fast you walk"],
   "Work is $W = Fs\\cos\\theta$. Gravity points straight down and the motion is horizontal, so $\\theta = 90^\\circ$ and $\\cos 90^\\circ = 0$. The height of the bag does not change either, so $E_p$ stays the same all the way."],
  ["En bil dobler farten fra 40 km/h til 80 km/h. Hva skjer med den kinetiske energien?",
   ["Den blir fire ganger så stor", "Den blir dobbelt så stor", "Den blir halvparten så stor", "Den er uendret, fordi massen er den samme"],
   "$E_k = \\tfrac12 mv^2$ avhenger av farten i andre potens. Dobbel fart gir $2^2 = 4$ ganger så stor energi. Derfor blir også bremselengden omtrent fire ganger så lang.",
   "A car doubles its speed from 40 km/h to 80 km/h. What happens to its kinetic energy?",
   ["It becomes four times as large", "It becomes twice as large", "It is halved", "It stays the same because the mass is unchanged"],
   "$E_k = \\tfrac12 mv^2$ depends on the square of the speed. Doubling the speed gives $2^2 = 4$ times the energy. That is also why the braking distance becomes roughly four times as long."],
  ["En blykule og en tennisball slippes samtidig fra samme høyde. Hvilken har størst fart når den treffer bakken, hvis vi ser bort fra luftmotstand?",
   ["De har samme fart", "Blykula, fordi den er tyngst", "Tennisballen, fordi den er lettest", "Det avhenger av høyden"],
   "Energibevaring: $mgh = \\tfrac12 mv^2$. Massen $m$ står på begge sider og forkortes bort, så $v = \\sqrt{2gh}$ er lik for begge. (Med luftmotstand vil blykula komme først, men det er en annen effekt.)",
   "A lead ball and a tennis ball are dropped at the same time from the same height. Neglecting air resistance, which one has the higher speed when it hits the ground?",
   ["They have the same speed", "The lead ball, because it is heavier", "The tennis ball, because it is lighter", "It depends on the height"],
   "Energy conservation: $mgh = \\tfrac12 mv^2$. The mass $m$ appears on both sides and cancels, so $v = \\sqrt{2gh}$ is the same for both. (With air resistance the lead ball arrives first, but that is a different effect.)"],
  ["Anne og Bo har samme masse og løper opp den samme trappen. Anne bruker 10 s, Bo bruker 20 s. Hva stemmer?",
   ["De gjør like mye arbeid, men Anne har dobbelt så stor effekt", "Anne gjør dobbelt så mye arbeid som Bo", "Bo gjør mest arbeid fordi han bruker lengst tid", "De har like stor effekt fordi de gjør like mye arbeid"],
   "Arbeidet er $mgh$ og er likt for begge. Effekt er arbeid per tid, $P = W/t$, så halvparten av tiden gir dobbelt så stor effekt.",
   "Anne and Bo have the same mass and run up the same staircase. Anne takes 10 s and Bo takes 20 s. Which statement is correct?",
   ["They do the same work, but Anne's power is twice as large", "Anne does twice as much work as Bo", "Bo does more work because he takes longer", "They have the same power because they do the same work"],
   "The work is $mgh$ and is the same for both. Power is work per unit time, $P = W/t$, so half the time means twice the power."],
  ["Du skyver en kasse 4 m bortover gulvet med en kraft på 50 N i bevegelsesretningen. Hvor mye arbeid gjør du?", { n: 200, tol: 1, u: "J" },
   "Kraften virker langs bevegelsen, så $W = Fs = 50\\cdot 4 = 200$ J.",
   "You push a box 4 m across the floor with a force of 50 N in the direction of motion. How much work do you do?", null,
   "The force acts along the motion, so $W = Fs = 50\\cdot 4 = 200$ J."],
  ["En vannkoker på 2000 W står på i 3 minutter. Hvor mye elektrisk energi bruker den, i kJ?", { n: 360, tol: 2, u: "kJ" },
   "$E = Pt = 2000\\text{ W}\\cdot 180\\text{ s} = 360\\,000$ J $= 360$ kJ. Det er det samme som 0,1 kWh.",
   "A 2000 W electric kettle is switched on for 3 minutes. How much electrical energy does it use, in kJ?", null,
   "$E = Pt = 2000\\text{ W}\\cdot 180\\text{ s} = 360\\,000$ J $= 360$ kJ. That is the same as 0.1 kWh."],
  ["En kloss på 2,0 kg starter fra ro og sklir 5,0 m ned et skråplan med helning 30°. Friksjonskraften er konstant 4,0 N. Hvor stor fart har klossen nederst? ($g = 9{,}81$ m/s²)", { n: 5.39, tol: 0.05, u: "m/s" },
   "Høydeforskjell: $h = 5{,}0\\sin 30^\\circ = 2{,}5$ m, så $E_p = mgh = 2{,}0\\cdot 9{,}81\\cdot 2{,}5 = 49{,}05$ J. Friksjonsarbeid: $W_f = 4{,}0\\cdot 5{,}0 = 20$ J. Kinetisk energi nederst: $E_k = 49{,}05 - 20 = 29{,}05$ J. Da er $v = \\sqrt{2E_k/m} = \\sqrt{2\\cdot 29{,}05/2{,}0} \\approx 5{,}39$ m/s.",
   "A 2.0 kg block starts from rest and slides 5.0 m down an inclined plane at 30°. The friction force is a constant 4.0 N. What is the speed of the block at the bottom? ($g = 9.81$ m/s²)", null,
   "Height difference: $h = 5.0\\sin 30^\\circ = 2.5$ m, so $E_p = mgh = 2.0\\cdot 9.81\\cdot 2.5 = 49.05$ J. Work done by friction: $W_f = 4.0\\cdot 5.0 = 20$ J. Kinetic energy at the bottom: $E_k = 49.05 - 20 = 29.05$ J. Then $v = \\sqrt{2E_k/m} = \\sqrt{2\\cdot 29.05/2.0} \\approx 5.39$ m/s."]
]);

GEN("GFYS", 3,
 // 1: arbeid W = Fs (ett steg)
 ()=>{ const F=R.i(2,60)*10, s=R.f(1,25,0.5), W=F*s;
   return [T(`Du drar en kasse ${nf(s)} m bortover gulvet med en kraft på ${F} N rett i bevegelsesretningen. Hvor mye arbeid gjør du?`,`You pull a crate ${nf(s)} m across the floor with a force of ${F} N directly in the direction of motion. How much work do you do?`),
     {n:W,tol:rel(W),u:"J"},
     T(`Kraften virker langs bevegelsen, så $W = Fs = ${F}\\cdot ${mf(s)} = ${mf(W,1)}$ J.`,`The force acts along the motion, so $W = Fs = ${F}\\cdot ${mf(s)} = ${mf(W,1)}$ J.`)]; },
 // 2: kinetisk energi
 ()=>{ const S=R.p([["En løper","A runner",50,90,2,8],["En syklist med sykkel","A cyclist with a bike",60,110,4,14],["En hund","A dog",5,40,2,10],["En elsparkesykkel med fører","An e-scooter with its rider",70,120,3,7]]);
   const m=R.i(S[2],S[3]), v=R.f(S[4],S[5],0.5), E=0.5*m*v*v;
   return [T(`${S[0]} har massen ${m} kg og farten ${nf(v)} m/s. Hvor stor kinetisk energi er det?`,`${S[1]} has a mass of ${m} kg and a speed of ${nf(v)} m/s. What is the kinetic energy?`),
     {n:E,tol:rel(E),u:"J"},
     `$E_k = \\tfrac12 mv^2 = \\tfrac12\\cdot ${m}\\cdot ${mf(v)}^2 \\approx ${mf(E,1)}$ J.`]; },
 // 3: arbeid med vinkel
 ()=>{ const F=R.i(4,40)*5, s=R.i(5,60), th=R.p([15,20,25,30,35,40,45,50,60]), W=F*s*Math.cos(th*DEG);
   return [T(`Et barn drar en kjelke ${s} m bortover flatt terreng. Tauet danner ${th}° med bakken, og kraften i tauet er ${F} N. Hvor mye arbeid gjør kraften fra tauet?`,`A child pulls a sled ${s} m across level ground. The rope makes an angle of ${th}° with the ground, and the force in the rope is ${F} N. How much work does the rope force do?`),
     {n:W,tol:rel(W),u:"J"},
     T(`Bare komponenten langs bevegelsen gjør arbeid: $W = Fs\\cos\\theta = ${F}\\cdot ${s}\\cdot\\cos ${th}^\\circ \\approx ${mf(W,1)}$ J.`,`Only the component along the motion does work: $W = Fs\\cos\\theta = ${F}\\cdot ${s}\\cdot\\cos ${th}^\\circ \\approx ${mf(W,1)}$ J.`)]; },
 // 4: energibevaring – fart i bunnen av en bakke
 ()=>{ const v0=R.i(1,8), h=R.f(2,40,0.5), v=Math.sqrt(v0*v0+2*G_*h);
   return [T(`En berg-og-dal-bane-vogn har farten ${v0} m/s på toppen av en bakke. Bunnen av bakken ligger ${nf(h)} m lavere. Hvor stor fart har vognen i bunnen? Se bort fra friksjon og luftmotstand. ($g = 9{,}81$ m/s²)`,`A roller coaster car has a speed of ${v0} m/s at the top of a hill. The bottom of the hill is ${nf(h)} m lower. What is the speed of the car at the bottom? Neglect friction and air resistance. ($g = 9.81$ m/s²)`),
     {n:v,tol:rel(v),u:"m/s"},
     T(`Energibevaring med nullnivå i bunnen: $\\tfrac12 mv_0^2 + mgh = \\tfrac12 mv^2$. Massen forkortes bort, og $v = \\sqrt{v_0^2 + 2gh} = \\sqrt{${v0}^2 + 2\\cdot 9{,}81\\cdot ${mf(h)}} \\approx ${mf(v,1)}$ m/s.`,`Energy conservation with the reference level at the bottom: $\\tfrac12 mv_0^2 + mgh = \\tfrac12 mv^2$. The mass cancels, and $v = \\sqrt{v_0^2 + 2gh} = \\sqrt{${v0}^2 + 2\\cdot 9.81\\cdot ${mf(h)}} \\approx ${mf(v,1)}$ m/s.`)]; },
 // 5: effekt og virkningsgrad
 ()=>{ const m=R.i(4,30)*50, h=R.i(8,40), t=R.i(10,40), eta=R.p([0.6,0.65,0.7,0.75,0.8,0.85,0.9]);
   const W=m*G_*h, Pu=W/t, Pin=Pu/eta;
   return [T(`En byggeheis løfter en last på ${m} kg rett opp ${h} m på ${t} s med konstant fart. Motoren har virkningsgrad ${nf(eta*100)} %. Hvor stor elektrisk effekt trekker motoren, i kW? ($g = 9{,}81$ m/s²)`,`A construction hoist lifts a load of ${m} kg straight up ${h} m in ${t} s at constant speed. The motor has an efficiency of ${nf(eta*100)} %. How much electrical power does the motor draw, in kW? ($g = 9.81$ m/s²)`),
     {n:Pin/1000,tol:rel(Pin/1000),u:"kW"},
     T(`Arbeid: $W = mgh = ${m}\\cdot 9{,}81\\cdot ${h} \\approx ${mf(W,0)}$ J. Nyttig effekt: $P_{\\text{ut}} = W/t = ${mf(W,0)}/${t} \\approx ${mf(Pu,0)}$ W. Tilført effekt: $P_{\\text{inn}} = P_{\\text{ut}}/\\eta = ${mf(Pu,0)}/${mf(eta)} \\approx ${mf(Pin,0)}$ W $\\approx ${mf(Pin/1000,2)}$ kW.`,
       `Work: $W = mgh = ${m}\\cdot 9.81\\cdot ${h} \\approx ${mf(W,0)}$ J. Useful power: $P_{\\text{out}} = W/t = ${mf(W,0)}/${t} \\approx ${mf(Pu,0)}$ W. Input power: $P_{\\text{in}} = P_{\\text{out}}/\\eta = ${mf(Pu,0)}/${mf(eta)} \\approx ${mf(Pin,0)}$ W $\\approx ${mf(Pin/1000,2)}$ kW.`)]; },
 // 6: eksamensnivå – skråplan med friksjon
 ()=>{ let th,mu; do{ th=R.p([20,25,30,35,40]); mu=R.f(0.05,0.5,0.05); }while(Math.tan(th*DEG)-mu<0.12);
   const m=R.i(10,80), L=R.i(5,40), h=L*Math.sin(th*DEG), N=m*G_*Math.cos(th*DEG), Ff=mu*N, Ep=m*G_*h, Wf=Ff*L, Ek=Ep-Wf, v=Math.sqrt(2*Ek/m);
   return [T(`En kjelke med barn (til sammen ${m} kg) starter fra ro og sklir ${L} m ned en bakke med helning ${th}°. Friksjonstallet mellom meder og snø er $\\mu = ${mf(mu)}$. Hvor stor fart har kjelken nederst? Se bort fra luftmotstand. ($g = 9{,}81$ m/s²)`,`A sled with a child (${m} kg in total) starts from rest and slides ${L} m down a slope inclined at ${th}°. The coefficient of friction between runners and snow is $\\mu = ${mf(mu)}$. What is the speed of the sled at the bottom? Neglect air resistance. ($g = 9.81$ m/s²)`),
     {n:v,tol:rel(v),u:"m/s"},
     T(`Høydeforskjell: $h = L\\sin\\theta = ${L}\\sin ${th}^\\circ \\approx ${mf(h)}$ m, så $E_p = mgh \\approx ${mf(Ep,0)}$ J. Normalkraft: $N = mg\\cos\\theta \\approx ${mf(N,1)}$ N, friksjon $F_f = \\mu N \\approx ${mf(Ff,1)}$ N og friksjonsarbeid $W_f = F_fL \\approx ${mf(Wf,0)}$ J. Da er $E_k = E_p - W_f \\approx ${mf(Ek,0)}$ J og $v = \\sqrt{2E_k/m} \\approx ${mf(v,2)}$ m/s. (Massen forkortes faktisk bort: $v = \\sqrt{2gL(\\sin\\theta - \\mu\\cos\\theta)}$.)`,
       `Height difference: $h = L\\sin\\theta = ${L}\\sin ${th}^\\circ \\approx ${mf(h)}$ m, so $E_p = mgh \\approx ${mf(Ep,0)}$ J. Normal force: $N = mg\\cos\\theta \\approx ${mf(N,1)}$ N, friction $F_f = \\mu N \\approx ${mf(Ff,1)}$ N and work done by friction $W_f = F_fL \\approx ${mf(Wf,0)}$ J. Then $E_k = E_p - W_f \\approx ${mf(Ek,0)}$ J and $v = \\sqrt{2E_k/m} \\approx ${mf(v,2)}$ m/s. (The mass actually cancels: $v = \\sqrt{2gL(\\sin\\theta - \\mu\\cos\\theta)}$.)`)]; }
);

// ---------------- Enhet 4: Trykk, tetthet og varme ----------------
THEORY("GFYS", 4, {
nb: `## Hva handler det om?

Denne enheten handler om hvordan stoffer oppfører seg: hvor tunge de er i forhold til størrelsen (tetthet), hvordan en kraft fordeler seg over en flate (trykk), hvorfor noe flyter (oppdrift), og hvor mye energi som trengs for å varme opp, smelte eller koke noe (varme).

Ingeniører bruker dette hele tiden: trykk i hydraulikk, rør og tanker, oppdrift i skip og bøyer, og varmeberegninger i alt fra motorer og varmepumper til elektronikk som må kjøles. Det er grunnlaget for termodynamikk og fluidmekanikk.

## Begreper og formler

- **Tetthet** (massetetthet): $\\rho = m/V$, målt i kg/m³. Vann har $\\rho \\approx 1000$ kg/m³, altså 1 kg per liter. Husk at $1\\text{ L} = 1\\text{ dm}^3 = 0{,}001\\text{ m}^3$.
- **Trykk** er kraft per areal: $p = F/A$, målt i pascal, $1\\text{ Pa} = 1\\text{ N/m}^2$. Ofte brukes kPa, MPa eller bar, der $1\\text{ bar} = 10^5$ Pa. Lufttrykket ved havnivå er omtrent 101,3 kPa.
- **Trykk i en væske** øker med dybden: $p = p_0 + \\rho g h$, der $p_0$ er trykket på overflaten. Leddet $\\rho g h$ kalles overtrykket. I vann øker trykket med omtrent 1 bar per 10 m.
- **Oppdrift** (Arkimedes' prinsipp): en gjenstand i en væske får en kraft oppover som er lik tyngden av væsken den fortrenger: $F_B = \\rho_{\\text{væske}} V g$, der $V$ er volumet under væskeflaten. En gjenstand flyter hvis tettheten er mindre enn væskens.
- **Temperatur** måles i grader celsius (°C) eller kelvin (K): $T = t + 273{,}15$. En endring på 1 °C er det samme som 1 K, så $\\Delta T$ er lik i begge skalaer.
- **Varme** $Q$ er energi som overføres fordi det er en temperaturforskjell, og måles i joule. For å endre temperaturen trengs $Q = mc\\Delta T$, der $c$ er spesifikk varmekapasitet. Vann: 4180 J/(kg·K), aluminium: 900, jern: 450, kobber: 385.
- **Faseoverganger** (smelting, fordamping): temperaturen står stille mens stoffet skifter fase, og varmen er $Q = mL$. For vann er smeltevarmen 334 kJ/kg og fordampingsvarmen 2257 kJ/kg.
- **Varmebalanse**: blandes varmt og kaldt uten varmetap, er varmen den ene delen avgir lik varmen den andre tar opp.

$$p = \\frac{F}{A} \\qquad F_B = \\rho V g \\qquad Q = mc\\Delta T \\qquad Q = mL$$

## Slik løser du oppgavene

1. Gjør om til SI-enheter: liter til m³, cm² til m² ($1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$), kJ til J og gram til kg.
2. Trykk: finn kraften (ofte tyngden $mg$) og arealet, og del. I væsker bruker du $\\rho g h$, og legger til $p_0$ hvis du skal ha absolutt trykk.
3. Oppdrift: finn volumet under væskeflaten, og bruk $F_B = \\rho V g$ med tettheten til væsken, ikke til gjenstanden.
4. Varme: del prosessen i trinn. Temperaturendring gir $mc\\Delta T$, faseovergang gir $mL$. Summer trinnene.
5. Tid for oppvarming: $t = Q/P$, der $P$ er effekten som går til stoffet.

### Eksempel 1: trykk i en tank

En åpen vanntank er 4,0 m dyp. Hva er overtrykket og det absolutte trykket ved bunnen?

1. Overtrykk: $\\rho g h = 1000\\cdot 9{,}81\\cdot 4{,}0 = 39\\,240$ Pa $\\approx 39{,}2$ kPa.
2. Absolutt trykk: $p = p_0 + \\rho g h = 101{,}3 + 39{,}2 = 140{,}5$ kPa.

### Eksempel 2: vannkoker

En vannkoker på 2000 W varmer 1,5 kg vann fra 15 °C til 100 °C. Hvor lang tid tar det hvis all energien går til vannet?

1. $\\Delta T = 100 - 15 = 85$ K.
2. $Q = mc\\Delta T = 1{,}5\\cdot 4180\\cdot 85 = 532\\,950$ J $\\approx 533$ kJ.
3. $t = Q/P = 532\\,950/2000 \\approx 266$ s, altså omtrent 4,4 minutter.

Skal vannet også koke bort, trengs i tillegg $Q = mL = 1{,}5\\cdot 2257 \\approx 3386$ kJ – over seks ganger så mye energi som selve oppvarmingen.

## Vanlige feil

- Å glemme å gjøre om liter og cm² til m³ og m².
- Å bruke tettheten til gjenstanden i stedet for væsken i oppdriftsformelen.
- Å blande overtrykk og absolutt trykk.
- Å legge til 273 på en temperaturendring. En økning på 20 °C er en økning på 20 K.
- Å glemme faseovergangen: is ved 0 °C må smelte (334 kJ/kg) før temperaturen kan stige.
- Å blande kJ og J når $c$ er oppgitt i kJ/(kg·K).

> Trykk er kraft per areal, oppdrift er tyngden av fortrengt væske, og varme er $mc\\Delta T$ ved temperaturendring og $mL$ ved faseovergang.`,
en: `## What is it about?

This unit is about how materials behave: how heavy they are compared with their size (density), how a force is spread over a surface (pressure), why things float (buoyancy), and how much energy it takes to heat, melt or boil something (heat).

Engineers use this all the time: pressure in hydraulics, pipes and tanks, buoyancy in ships and buoys, and heat calculations in everything from engines and heat pumps to electronics that must be cooled. It is the foundation for thermodynamics and fluid mechanics.

## Key quantities and formulas

- **Density**: $\\rho = m/V$, measured in kg/m³. Water has $\\rho \\approx 1000$ kg/m³, which is 1 kg per liter. Remember that $1\\text{ L} = 1\\text{ dm}^3 = 0.001\\text{ m}^3$.
- **Pressure** is force per unit area: $p = F/A$, measured in pascals, $1\\text{ Pa} = 1\\text{ N/m}^2$. We often use kPa, MPa or bar, where $1\\text{ bar} = 10^5$ Pa. Air pressure at sea level is about 101.3 kPa.
- **Pressure in a liquid** increases with depth: $p = p_0 + \\rho g h$, where $p_0$ is the pressure at the surface. The term $\\rho g h$ is called the gauge pressure. In water the pressure rises by about 1 bar per 10 m.
- **Buoyancy** (Archimedes' principle): an object in a fluid feels an upward force equal to the weight of the fluid it displaces: $F_B = \\rho_{\\text{fluid}} V g$, where $V$ is the volume below the surface. An object floats if its density is less than that of the fluid.
- **Temperature** is measured in degrees Celsius (°C) or kelvin (K): $T = t + 273.15$. A change of 1 °C is the same as 1 K, so $\\Delta T$ is equal on both scales.
- **Heat** $Q$ is energy transferred because of a temperature difference, measured in joules. Changing the temperature takes $Q = mc\\Delta T$, where $c$ is the specific heat capacity. Water: 4180 J/(kg·K), aluminum: 900, iron: 450, copper: 385.
- **Phase changes** (melting, boiling): the temperature stays constant while the substance changes phase, and the heat is $Q = mL$. For water the latent heat of fusion is 334 kJ/kg and the latent heat of vaporization is 2257 kJ/kg.
- **Heat balance**: when something hot and something cold are mixed without heat loss, the heat released by one part equals the heat absorbed by the other.

$$p = \\frac{F}{A} \\qquad F_B = \\rho V g \\qquad Q = mc\\Delta T \\qquad Q = mL$$

## How to solve the problems

1. Convert to SI units: liters to m³, cm² to m² ($1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$), kJ to J and grams to kg.
2. Pressure: find the force (often the weight $mg$) and the area, and divide. In liquids, use $\\rho g h$, and add $p_0$ if you need the absolute pressure.
3. Buoyancy: find the volume below the surface, and use $F_B = \\rho V g$ with the density of the fluid, not of the object.
4. Heat: split the process into steps. A temperature change gives $mc\\Delta T$, a phase change gives $mL$. Add up the steps.
5. Heating time: $t = Q/P$, where $P$ is the power delivered to the substance.

### Example 1: pressure in a tank

An open water tank is 4.0 m deep. What are the gauge pressure and the absolute pressure at the bottom?

1. Gauge pressure: $\\rho g h = 1000\\cdot 9.81\\cdot 4.0 = 39\\,240$ Pa $\\approx 39.2$ kPa.
2. Absolute pressure: $p = p_0 + \\rho g h = 101.3 + 39.2 = 140.5$ kPa.

### Example 2: electric kettle

A 2000 W kettle heats 1.5 kg of water from 15 °C to 100 °C. How long does it take if all the energy goes into the water?

1. $\\Delta T = 100 - 15 = 85$ K.
2. $Q = mc\\Delta T = 1.5\\cdot 4180\\cdot 85 = 532\\,950$ J $\\approx 533$ kJ.
3. $t = Q/P = 532\\,950/2000 \\approx 266$ s, which is about 4.4 minutes.

To boil the water away as well, you would need another $Q = mL = 1.5\\cdot 2257 \\approx 3386$ kJ – more than six times the energy used for the heating itself.

## Common mistakes

- Forgetting to convert liters and cm² to m³ and m².
- Using the density of the object instead of the fluid in the buoyancy formula.
- Mixing up gauge pressure and absolute pressure.
- Adding 273 to a temperature change. A rise of 20 °C is a rise of 20 K.
- Forgetting the phase change: ice at 0 °C must melt (334 kJ/kg) before its temperature can rise.
- Mixing up kJ and J when $c$ is given in kJ/(kg·K).

> Pressure is force per unit area, buoyancy is the weight of the displaced fluid, and heat is $mc\\Delta T$ for a temperature change and $mL$ for a phase change.`
});

BIQ("GFYS", 4, [
  ["Hvilken enhet måles trykk i?", ["pascal (Pa), som er N/m²", "newton (N)", "joule (J)", "kg/m³"],
   "Trykk er kraft per areal, $p = F/A$, så enheten er $\\text{N/m}^2$ = Pa. Newton er enheten for kraft, joule for energi og kg/m³ for tetthet.",
   "What unit is pressure measured in?", ["pascal (Pa), which is N/m²", "newton (N)", "joule (J)", "kg/m³"],
   "Pressure is force per unit area, $p = F/A$, so the unit is $\\text{N/m}^2$ = Pa. The newton is the unit of force, the joule of energy and kg/m³ of density."],
  ["Hvorfor synker du mindre ned i løs snø med truger eller ski enn med vanlige sko?",
   ["Tyngden fordeles på et større areal, så trykket blir mindre", "Trugene gjør deg lettere", "Trugene gir oppdrift i snøen", "Friksjonen mot snøen blir større"],
   "Kraften (tyngden din) er den samme, men $p = F/A$ blir mindre når arealet $A$ øker. Det er trykket som avgjør om snøen gir etter.",
   "Why do you sink less into loose snow with snowshoes or skis than with ordinary shoes?",
   ["Your weight is spread over a larger area, so the pressure is lower", "The snowshoes make you lighter", "The snowshoes provide buoyancy in the snow", "The friction against the snow increases"],
   "The force (your weight) is the same, but $p = F/A$ decreases when the area $A$ increases. It is the pressure that decides whether the snow gives way."],
  ["Stål har mye større tetthet enn vann. Hvordan kan da et stålskip flyte?",
   ["Skroget fortrenger så mye vann at oppdriften blir lik tyngden av skipet", "Stål blir lettere i saltvann", "Oppdriften avhenger bare av massen, ikke av volumet", "Skipet holdes oppe av overflatespenningen"],
   "Arkimedes' prinsipp: oppdriften er tyngden av det fortrengte vannet. Et hult skrog fortrenger et stort volum, så skipets gjennomsnittlige tetthet (stål pluss luft) er mindre enn vannets. Skipet synker ned til det fortrengte vannet veier like mye som skipet.",
   "Steel is much denser than water. How can a steel ship float?",
   ["The hull displaces so much water that the buoyant force equals the ship's weight", "Steel becomes lighter in salt water", "Buoyancy depends only on mass, not on volume", "The ship is held up by surface tension"],
   "Archimedes' principle: the buoyant force equals the weight of the displaced water. A hollow hull displaces a large volume, so the average density of the ship (steel plus air) is less than that of water. The ship sinks until the displaced water weighs as much as the ship."],
  ["Vann koker i en åpen kjele ved 100 °C. Hva skjer med temperaturen i vannet hvis du skrur opp platen?",
   ["Den holder seg på 100 °C, men vannet koker bort raskere", "Den stiger over 100 °C", "Den synker fordi vannet fordamper", "Den stiger sakte til omtrent 120 °C"],
   "Under en faseovergang går den tilførte varmen med til å endre fase ($Q = mL$), ikke til å øke temperaturen. Mer effekt gir bare mer damp per sekund. (Dette gjelder ved normalt lufttrykk; i en trykkoker er kokepunktet høyere.)",
   "Water is boiling in an open pot at 100 °C. What happens to the water temperature if you turn up the stove?",
   ["It stays at 100 °C, but the water boils away faster", "It rises above 100 °C", "It falls because the water evaporates", "It slowly rises to about 120 °C"],
   "During a phase change the added heat goes into changing the phase ($Q = mL$), not into raising the temperature. More power just produces more steam per second. (This holds at normal air pressure; in a pressure cooker the boiling point is higher.)"],
  ["Vann varmes fra 20 °C til 30 °C. Hvor stor er temperaturendringen $\\Delta T$ i kelvin?", ["10 K", "283,15 K", "303,15 K", "50 K"],
   "Kelvin- og celsiusskalaen har like store trinn; de er bare forskjøvet med 273,15. En endring på 10 °C er derfor 10 K. Du legger bare til 273,15 når du gjør om en temperatur, ikke en temperaturendring.",
   "Water is heated from 20 °C to 30 °C. What is the temperature change $\\Delta T$ in kelvin?", ["10 K", "283.15 K", "303.15 K", "50 K"],
   "The kelvin and Celsius scales have equal step sizes; they are just shifted by 273.15. A change of 10 °C is therefore 10 K. You add 273.15 only when converting a temperature, not a temperature change."],
  ["En aluminiumsblokk har massen 5,4 kg og volumet 2,0 L. Hva er tettheten, i kg/m³?", { n: 2700, tol: 20, u: "kg/m³" },
   "$V = 2{,}0\\text{ L} = 0{,}0020\\text{ m}^3$, så $\\rho = m/V = 5{,}4/0{,}0020 = 2700$ kg/m³.",
   "An aluminum block has a mass of 5.4 kg and a volume of 2.0 L. What is its density, in kg/m³?", null,
   "$V = 2.0\\text{ L} = 0.0020\\text{ m}^3$, so $\\rho = m/V = 5.4/0.0020 = 2700$ kg/m³."],
  ["Du blander 2,0 kg vann ved 80 °C med 3,0 kg vann ved 20 °C. Hva blir sluttemperaturen hvis ingen varme går tapt?", { n: 44, tol: 0.5, u: "°C" },
   "Varme avgitt = varme mottatt: $2{,}0\\cdot c\\cdot(80 - T) = 3{,}0\\cdot c\\cdot(T - 20)$. Varmekapasiteten $c$ forkortes bort: $160 - 2T = 3T - 60$, så $5T = 220$ og $T = 44$ °C.",
   "You mix 2.0 kg of water at 80 °C with 3.0 kg of water at 20 °C. What is the final temperature if no heat is lost?", null,
   "Heat released = heat absorbed: $2.0\\cdot c\\cdot(80 - T) = 3.0\\cdot c\\cdot(T - 20)$. The specific heat capacity $c$ cancels: $160 - 2T = 3T - 60$, so $5T = 220$ and $T = 44$ °C."],
  ["Hvor mye varme trengs for å smelte 0,50 kg is ved 0 °C og deretter varme smeltevannet til 20 °C? (Smeltevarme 334 kJ/kg, $c_{\\text{vann}} = 4{,}18$ kJ/(kg·K))", { n: 208.8, tol: 2, u: "kJ" },
   "Smelting: $Q_1 = mL = 0{,}50\\cdot 334 = 167$ kJ. Oppvarming: $Q_2 = mc\\Delta T = 0{,}50\\cdot 4{,}18\\cdot 20 = 41{,}8$ kJ. Totalt: $Q = 167 + 41{,}8 = 208{,}8$ kJ. Merk at smeltingen krever fire ganger så mye varme som oppvarmingen.",
   "How much heat is needed to melt 0.50 kg of ice at 0 °C and then warm the meltwater to 20 °C? (Latent heat of fusion 334 kJ/kg, $c_{\\text{water}} = 4.18$ kJ/(kg·K))", null,
   "Melting: $Q_1 = mL = 0.50\\cdot 334 = 167$ kJ. Heating: $Q_2 = mc\\Delta T = 0.50\\cdot 4.18\\cdot 20 = 41.8$ kJ. Total: $Q = 167 + 41.8 = 208.8$ kJ. Note that the melting takes four times as much heat as the warming."]
]);

GEN("GFYS", 4,
 // 1: trykk p = F/A (ett steg)
 ()=>{ const F=R.i(5,200)*10, A=R.f(0.05,2.5,0.05), p=F/A;
   return [T(`En kraft på ${F} N presser jevnt på en flate med areal ${nf(A)} m². Hvor stort er trykket på flaten?`,`A force of ${F} N presses evenly on a surface with an area of ${nf(A)} m². What is the pressure on the surface?`),
     {n:p,tol:rel(p),u:"Pa"},
     `$p = F/A = ${F}/${mf(A)} \\approx ${mf(p,1)}$ Pa.`]; },
 // 2: tetthet med liter
 ()=>{ const M=R.p([["furu","pine",500],["kork","cork",240],["is","ice",917],["PVC-plast","PVC plastic",1380],["betong","concrete",2400],["aluminium","aluminum",2700],["stål","steel",7850],["kobber","copper",8960]]);
   const V=R.f(0.5,8,0.5), m=Math.round(M[2]*V/10)/100, rho=m/(V/1000);
   const fl = rho<1000 ? T("mindre enn vannets 1000 kg/m³, så klossen flyter i vann","less than the 1000 kg/m³ of water, so the block floats in water") : T("større enn vannets 1000 kg/m³, så klossen synker i vann","greater than the 1000 kg/m³ of water, so the block sinks in water");
   return [T(`En massiv kloss har massen ${nf(m)} kg og volumet ${nf(V)} L. Hva er tettheten, i kg/m³?`,`A solid block has a mass of ${nf(m)} kg and a volume of ${nf(V)} L. What is its density, in kg/m³?`),
     {n:rho,tol:rel(rho),u:"kg/m³"},
     T(`$V = ${mf(V)}\\text{ L} = ${mf(V/1000,4)}\\text{ m}^3$, så $\\rho = m/V = ${mf(m)}/${mf(V/1000,4)} \\approx ${mf(rho,0)}$ kg/m³. Det passer med ${M[0]}. Tettheten er ${fl}.`,
       `$V = ${mf(V)}\\text{ L} = ${mf(V/1000,4)}\\text{ m}^3$, so $\\rho = m/V = ${mf(m)}/${mf(V/1000,4)} \\approx ${mf(rho,0)}$ kg/m³. That matches ${M[1]}. The density is ${fl}.`)]; },
 // 3: varme Q = mcΔT
 ()=>{ const M=R.p([["vann","water",4180],["aluminium","aluminum",900],["jern","iron",450],["kobber","copper",385]]);
   const m=R.f(0.2,5,0.1), t1=R.i(5,25), dT=R.i(10,70), t2=t1+dT, Q=m*M[2]*dT/1000;
   return [T(`Hvor mye varme trengs for å varme ${nf(m)} kg ${M[0]} fra ${t1} °C til ${t2} °C? ($c = ${M[2]}$ J/(kg·K))`,`How much heat is needed to warm ${nf(m)} kg of ${M[1]} from ${t1} °C to ${t2} °C? ($c = ${M[2]}$ J/(kg·K))`),
     {n:Q,tol:rel(Q),u:"kJ"},
     T(`$\\Delta T = ${t2} - ${t1} = ${dT}$ K, så $Q = mc\\Delta T = ${mf(m)}\\cdot ${M[2]}\\cdot ${dT} \\approx ${mf(Q*1000,0)}$ J $\\approx ${mf(Q,1)}$ kJ.`,
       `$\\Delta T = ${t2} - ${t1} = ${dT}$ K, so $Q = mc\\Delta T = ${mf(m)}\\cdot ${M[2]}\\cdot ${dT} \\approx ${mf(Q*1000,0)}$ J $\\approx ${mf(Q,1)}$ kJ.`)]; },
 // 4: absolutt trykk på dybde
 ()=>{ const W=R.p([["ferskvann","fresh water",1000],["sjøvann","seawater",1025]]), h=R.f(1,60,0.5), pg=W[2]*G_*h/1000, p=101.3+pg;
   return [T(`En dykker er ${nf(h)} m under overflaten i ${W[0]} ($\\rho = ${W[2]}$ kg/m³). Lufttrykket er 101,3 kPa. Hva er det absolutte trykket på dykkeren, i kPa? ($g = 9{,}81$ m/s²)`,`A diver is ${nf(h)} m below the surface in ${W[1]} ($\\rho = ${W[2]}$ kg/m³). The air pressure is 101.3 kPa. What is the absolute pressure on the diver, in kPa? ($g = 9.81$ m/s²)`),
     {n:p,tol:rel(p),u:"kPa"},
     T(`Overtrykket fra vannet er $\\rho gh = ${W[2]}\\cdot 9{,}81\\cdot ${mf(h)} \\approx ${mf(pg*1000,0)}$ Pa $\\approx ${mf(pg,1)}$ kPa. Absolutt trykk: $p = p_0 + \\rho gh = 101{,}3 + ${mf(pg,1)} \\approx ${mf(p,1)}$ kPa.`,
       `The gauge pressure from the water is $\\rho gh = ${W[2]}\\cdot 9.81\\cdot ${mf(h)} \\approx ${mf(pg*1000,0)}$ Pa $\\approx ${mf(pg,1)}$ kPa. Absolute pressure: $p = p_0 + \\rho gh = 101.3 + ${mf(pg,1)} \\approx ${mf(p,1)}$ kPa.`)]; },
 // 5: oppdrift – snorkraft på nedsenket stein
 ()=>{ const V=R.f(0.5,6,0.5), rho=R.i(22,32)*100, m=Math.round(rho*V/100)/10;
   const G=m*G_, FB=1000*(V/1000)*G_, S=G-FB;
   return [T(`En stein med massen ${nf(m)} kg og volumet ${nf(V)} L henger i en snor og senkes helt ned i vann. Hvor stor er kraften i snora når steinen henger i ro? ($\\rho_{\\text{vann}} = 1000$ kg/m³, $g = 9{,}81$ m/s²)`,`A stone with a mass of ${nf(m)} kg and a volume of ${nf(V)} L hangs from a string and is lowered completely into water. What is the tension in the string when the stone hangs at rest? ($\\rho_{\\text{water}} = 1000$ kg/m³, $g = 9.81$ m/s²)`),
     {n:S,tol:rel(S),u:"N"},
     T(`Tyngde: $G = mg = ${mf(m)}\\cdot 9{,}81 \\approx ${mf(G,1)}$ N. Oppdrift: $F_B = \\rho_{\\text{vann}}Vg = 1000\\cdot ${mf(V/1000,4)}\\cdot 9{,}81 \\approx ${mf(FB,1)}$ N. Kreftene balanserer: $S = G - F_B \\approx ${mf(S,1)}$ N.`,
       `Weight: $G = mg = ${mf(m)}\\cdot 9.81 \\approx ${mf(G,1)}$ N. Buoyant force: $F_B = \\rho_{\\text{water}}Vg = 1000\\cdot ${mf(V/1000,4)}\\cdot 9.81 \\approx ${mf(FB,1)}$ N. The forces balance: $S = G - F_B \\approx ${mf(S,1)}$ N.`)]; },
 // 6: eksamensnivå – is til vann med varmeplate
 ()=>{ const m=R.f(0.3,2,0.1), t1=-R.i(2,20), t2=R.i(10,60), P=R.i(5,20)*100;
   const Q1=m*2100*(-t1), Q2=m*334000, Q3=m*4180*t2, Q=Q1+Q2+Q3, tm=Q/P/60;
   return [T(`${nf(m)} kg is med temperatur ${nf(t1)} °C legges i en kjele på en kokeplate som leverer ${P} W til innholdet. Hvor mange minutter tar det før du har vann med temperatur ${t2} °C? ($c_{\\text{is}} = 2100$ J/(kg·K), smeltevarme 334 kJ/kg, $c_{\\text{vann}} = 4180$ J/(kg·K). Se bort fra varmetap.)`,`${nf(m)} kg of ice at ${nf(t1)} °C is put in a pot on a hot plate that delivers ${P} W to the contents. How many minutes does it take until you have water at ${t2} °C? ($c_{\\text{ice}} = 2100$ J/(kg·K), latent heat of fusion 334 kJ/kg, $c_{\\text{water}} = 4180$ J/(kg·K). Neglect heat losses.)`),
     {n:tm,tol:rel(tm),u:"min"},
     T(`Tre trinn. Varme isen til 0 °C: $Q_1 = mc_{\\text{is}}\\Delta T = ${mf(m)}\\cdot 2100\\cdot ${-t1} \\approx ${mf(Q1/1000,1)}$ kJ. Smelte: $Q_2 = mL = ${mf(m)}\\cdot 334 \\approx ${mf(Q2/1000,1)}$ kJ. Varme vannet: $Q_3 = mc_{\\text{vann}}\\Delta T = ${mf(m)}\\cdot 4180\\cdot ${t2} \\approx ${mf(Q3/1000,1)}$ kJ. Sum: $Q \\approx ${mf(Q/1000,1)}$ kJ. Tid: $t = Q/P = ${mf(Q,0)}/${P} \\approx ${mf(Q/P,0)}$ s $\\approx ${mf(tm,1)}$ min.`,
       `Three steps. Warm the ice to 0 °C: $Q_1 = mc_{\\text{ice}}\\Delta T = ${mf(m)}\\cdot 2100\\cdot ${-t1} \\approx ${mf(Q1/1000,1)}$ kJ. Melt it: $Q_2 = mL = ${mf(m)}\\cdot 334 \\approx ${mf(Q2/1000,1)}$ kJ. Warm the water: $Q_3 = mc_{\\text{water}}\\Delta T = ${mf(m)}\\cdot 4180\\cdot ${t2} \\approx ${mf(Q3/1000,1)}$ kJ. Total: $Q \\approx ${mf(Q/1000,1)}$ kJ. Time: $t = Q/P = ${mf(Q,0)}/${P} \\approx ${mf(Q/P,0)}$ s $\\approx ${mf(tm,1)}$ min.`)]; }
);

// ---------------- Enhet 5: Elektrisitet ----------------
THEORY("GFYS", 5, {
nb: `## Hva handler det om?

All elektrisitet bygger på **ladning**. Stoff består av atomer med positive protoner i kjernen og negative elektroner rundt. I metaller kan noen av elektronene bevege seg fritt. Når de drives gjennom en leder, får vi en elektrisk **strøm** som kan varme opp en ovn, drive en motor eller lade en telefon.

Tre størrelser går igjen hele tiden: **spenning** (hvor hardt ladningene blir «dyttet»), **strøm** (hvor mye ladning som passerer per sekund) og **resistans** (hvor mye en komponent hindrer strømmen). Sammenhengen mellom dem er Ohms lov, og den er grunnlaget for alt du skal gjøre i faget elektriske kretser.

## Begreper og formler

- **Ladning** $Q$ måles i coulomb (C). Et elektron har ladningen $-e$, der $e = 1{,}602\\cdot 10^{-19}$ C. Like ladninger frastøter hverandre, ulike ladninger tiltrekker hverandre.
- **Strøm** $I$ er ladning per tid: $I = Q/t$, målt i ampere (A), der 1 A = 1 C/s. Strømretningen regnes fra pluss til minus gjennom kretsen utenfor kilden; elektronene går faktisk motsatt vei.
- **Spenning** $U$ er energi per ladning: $U = W/Q$, målt i volt (V), der 1 V = 1 J/C. Et batteri på 9 V gir hver coulomb som passerer, 9 J energi.
- **Resistans** (motstand) $R$ måles i ohm (Ω).
- **Ohms lov**: $U = RI$. Da er også $I = U/R$ og $R = U/I$.
- **Effekt**: $P = UI$. Med Ohms lov blir det også $P = RI^2 = U^2/R$. Energien er $E = Pt$, ofte målt i kWh.
- **Seriekobling** (etter hverandre): samme strøm går gjennom alle, spenningene summeres, og $R = R_1 + R_2 + \\dots$
- **Parallellkobling** (side om side): samme spenning over alle, strømmene summeres, og $1/R = 1/R_1 + 1/R_2 + \\dots$ For to motstander er $R = R_1R_2/(R_1+R_2)$. Totalresistansen er alltid mindre enn den minste motstanden.
- **Kirchhoffs lover**: strømmen inn i et knutepunkt er lik strømmen ut, og rundt en lukket sløyfe er summen av spenningsøkningene lik summen av spenningsfallene.

$$U = RI \\qquad P = UI \\qquad R_{\\text{serie}} = R_1 + R_2 \\qquad \\frac{1}{R_{\\text{parallell}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$$

## Slik løser du oppgavene

1. Tegn kretsen og marker hvilke motstander som er i serie og hvilke som er i parallell.
2. Slå sammen parallellgrupper og seriegrupper trinnvis til én totalresistans.
3. Finn strømmen fra kilden: $I = U/R_{\\text{tot}}$.
4. Gå tilbake gjennom kretsen: spenningen over en seriemotstand er $RI$, og spenningen over en parallellgruppe er den samme for alle grenene.
5. Finn strømmen i hver gren med Ohms lov, og effekten med $P = UI$. Sjekk at strømmene inn og ut av hvert knutepunkt stemmer.

### Eksempel

Et batteri på 12 V er koblet til $R_1 = 4$ Ω i serie med en parallellkobling av $R_2 = 6$ Ω og $R_3 = 12$ Ω.

1. Parallellgruppen: $R_{23} = \\dfrac{6\\cdot 12}{6+12} = 4$ Ω.
2. Totalt: $R_{\\text{tot}} = 4 + 4 = 8$ Ω.
3. Strøm fra batteriet: $I = 12/8 = 1{,}5$ A.
4. Spenning over $R_1$: $U_1 = 4\\cdot 1{,}5 = 6$ V. Da er det $12 - 6 = 6$ V over parallellgruppen.
5. Strømmene i grenene: $I_2 = 6/6 = 1$ A og $I_3 = 6/12 = 0{,}5$ A. Summen er 1,5 A, akkurat som den skal.
6. Effekt levert av batteriet: $P = UI = 12\\cdot 1{,}5 = 18$ W. Kontroll: $R_1$ tar 9 W, $R_2$ tar 6 W og $R_3$ tar 3 W, til sammen 18 W.

## Vanlige feil

- Å legge sammen parallellmotstander som om de var i serie.
- Å glemme å ta den inverse til slutt i $1/R = 1/R_1 + 1/R_2$.
- Å bruke hele kildespenningen over én motstand i en seriekobling.
- Å regne med mA og kΩ uten å gjøre om: 1 mA = 0,001 A og 1 kΩ = 1000 Ω. (Kilo-ohm ganger milliampere gir faktisk volt direkte.)
- Å tro at strømmen «brukes opp» i en lampe. Det er energien som omdannes; strømmen er like stor inn og ut.

> Ohms lov $U = RI$ og $P = UI$ løser nesten alt. I serie er strømmen lik, i parallell er spenningen lik.`,
en: `## What is it about?

All electricity is based on **charge**. Matter consists of atoms with positive protons in the nucleus and negative electrons around it. In metals, some of the electrons can move freely. When they are driven through a conductor we get an electric **current** that can heat a radiator, drive a motor or charge a phone.

Three quantities appear all the time: **voltage** (how hard the charges are "pushed"), **current** (how much charge passes per second) and **resistance** (how much a component opposes the current). The relation between them is Ohm's law, and it is the foundation for everything you will do in electric circuits.

## Key quantities and formulas

- **Charge** $Q$ is measured in coulombs (C). An electron has the charge $-e$, where $e = 1.602\\cdot 10^{-19}$ C. Like charges repel each other, opposite charges attract each other.
- **Current** $I$ is charge per unit time: $I = Q/t$, measured in amperes (A), where 1 A = 1 C/s. The current direction is taken from plus to minus through the circuit outside the source; the electrons actually move the opposite way.
- **Voltage** $U$ is energy per charge: $U = W/Q$, measured in volts (V), where 1 V = 1 J/C. A 9 V battery gives 9 J of energy to every coulomb that passes. (Many English texts write $V$ for voltage; this course uses $U$.)
- **Resistance** $R$ is measured in ohms (Ω).
- **Ohm's law**: $U = RI$. Then also $I = U/R$ and $R = U/I$.
- **Power**: $P = UI$. Using Ohm's law this also becomes $P = RI^2 = U^2/R$. The energy is $E = Pt$, often measured in kWh.
- **Series connection** (one after another): the same current flows through all of them, the voltages add up, and $R = R_1 + R_2 + \\dots$
- **Parallel connection** (side by side): the same voltage across all of them, the currents add up, and $1/R = 1/R_1 + 1/R_2 + \\dots$ For two resistors, $R = R_1R_2/(R_1+R_2)$. The total resistance is always smaller than the smallest resistor.
- **Kirchhoff's laws**: the current into a node equals the current out, and around a closed loop the sum of the voltage rises equals the sum of the voltage drops.

$$U = RI \\qquad P = UI \\qquad R_{\\text{series}} = R_1 + R_2 \\qquad \\frac{1}{R_{\\text{parallel}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$$

## How to solve the problems

1. Draw the circuit and mark which resistors are in series and which are in parallel.
2. Combine parallel groups and series groups step by step into a single total resistance.
3. Find the current from the source: $I = U/R_{\\text{tot}}$.
4. Work back through the circuit: the voltage across a series resistor is $RI$, and the voltage across a parallel group is the same for all its branches.
5. Find the current in each branch with Ohm's law, and the power with $P = UI$. Check that the currents into and out of every node agree.

### Example

A 12 V battery is connected to $R_1 = 4$ Ω in series with a parallel combination of $R_2 = 6$ Ω and $R_3 = 12$ Ω.

1. The parallel group: $R_{23} = \\dfrac{6\\cdot 12}{6+12} = 4$ Ω.
2. In total: $R_{\\text{tot}} = 4 + 4 = 8$ Ω.
3. Current from the battery: $I = 12/8 = 1.5$ A.
4. Voltage across $R_1$: $U_1 = 4\\cdot 1.5 = 6$ V. That leaves $12 - 6 = 6$ V across the parallel group.
5. The branch currents: $I_2 = 6/6 = 1$ A and $I_3 = 6/12 = 0.5$ A. The sum is 1.5 A, exactly as it should be.
6. Power delivered by the battery: $P = UI = 12\\cdot 1.5 = 18$ W. Check: $R_1$ takes 9 W, $R_2$ takes 6 W and $R_3$ takes 3 W, 18 W in total.

## Common mistakes

- Adding parallel resistors as if they were in series.
- Forgetting to take the inverse at the end of $1/R = 1/R_1 + 1/R_2$.
- Putting the full source voltage across a single resistor in a series connection.
- Calculating with mA and kΩ without converting: 1 mA = 0.001 A and 1 kΩ = 1000 Ω. (Kilohms times milliamperes actually gives volts directly.)
- Believing that the current is "used up" in a lamp. It is the energy that is converted; the current is the same going in and coming out.

> Ohm's law $U = RI$ and $P = UI$ solve almost everything. In series the current is the same, in parallel the voltage is the same.`
});

BIQ("GFYS", 5, [
  ["To små kuler har begge negativ ladning. Hva skjer når de kommer nær hverandre?",
   ["De frastøter hverandre", "De tiltrekker hverandre", "Ingenting, fordi like ladninger ikke påvirker hverandre", "Begge blir nøytrale"],
   "Like ladninger (to negative eller to positive) frastøter hverandre, mens ulike ladninger tiltrekker hverandre. Kraften blir sterkere jo nærmere de kommer.",
   "Two small spheres both carry a negative charge. What happens when they come close to each other?",
   ["They repel each other", "They attract each other", "Nothing, because like charges do not affect each other", "Both become neutral"],
   "Like charges (two negative or two positive) repel each other, while opposite charges attract. The force grows stronger the closer they get."],
  ["Tre lamper er koblet i parallell til et batteri. Hvilken størrelse er garantert lik for alle tre?",
   ["Spenningen over dem", "Strømmen gjennom dem", "Resistansen deres", "Effekten de bruker"],
   "Parallellkoblede komponenter sitter mellom de samme to punktene, så de har samme spenning. Strømmen i hver gren er $I = U/R$ og er bare lik hvis resistansene er like.",
   "Three lamps are connected in parallel to a battery. Which quantity is guaranteed to be the same for all three?",
   ["The voltage across them", "The current through them", "Their resistance", "The power they use"],
   "Components in parallel are connected between the same two points, so they have the same voltage. The current in each branch is $I = U/R$ and is only equal if the resistances are equal."],
  ["To lamper er koblet i serie til et batteri. Glødetråden i den ene lampen ryker. Hva skjer med den andre lampen?",
   ["Den slukner, fordi kretsen blir brutt", "Den lyser sterkere", "Den lyser som før", "Den får dobbelt så stor strøm"],
   "I en seriekobling går all strøm gjennom begge lampene. Ryker den ene, blir kretsen brutt, og strømmen blir null overalt. (I en parallellkobling ville den andre lampen lyst som før.)",
   "Two lamps are connected in series to a battery. The filament in one lamp breaks. What happens to the other lamp?",
   ["It goes out, because the circuit is broken", "It shines brighter", "It shines as before", "It gets twice the current"],
   "In a series connection all the current passes through both lamps. If one breaks, the circuit is open and the current becomes zero everywhere. (In a parallel connection the other lamp would shine as before.)"],
  ["Du har en motstand på 100 Ω og kobler en ekstra motstand på 100 Ω i parallell med den. Hva blir totalresistansen?",
   ["50 Ω", "200 Ω", "100 Ω", "0 Ω"],
   "En ekstra parallellgren gir strømmen en ny vei, så totalresistansen blir mindre: $R = \\dfrac{100\\cdot 100}{100 + 100} = 50$ Ω. I serie hadde det blitt 200 Ω.",
   "You have a 100 Ω resistor and connect another 100 Ω resistor in parallel with it. What is the total resistance?",
   ["50 Ω", "200 Ω", "100 Ω", "0 Ω"],
   "An extra parallel branch gives the current another path, so the total resistance decreases: $R = \\dfrac{100\\cdot 100}{100 + 100} = 50$ Ω. In series it would have been 200 Ω."],
  ["Spenningen over en motstand dobles, mens resistansen er den samme. Hva skjer med effekten som avsettes i motstanden?",
   ["Den blir fire ganger så stor", "Den blir dobbelt så stor", "Den er uendret", "Den blir halvert"],
   "Strømmen dobles også ($I = U/R$), så $P = UI$ får to faktorer på 2. Med $P = U^2/R$ ser vi det direkte: $2^2 = 4$ ganger så stor effekt.",
   "The voltage across a resistor is doubled while the resistance stays the same. What happens to the power dissipated in the resistor?",
   ["It becomes four times as large", "It becomes twice as large", "It stays the same", "It is halved"],
   "The current doubles as well ($I = U/R$), so $P = UI$ gets two factors of 2. With $P = U^2/R$ we see it directly: $2^2 = 4$ times the power."],
  ["En motstand på 450 Ω er koblet til et batteri på 9,0 V. Hvor stor er strømmen, i mA?", { n: 20, tol: 0.2, u: "mA" },
   "Ohms lov: $I = U/R = 9{,}0/450 = 0{,}020$ A $= 20$ mA.",
   "A 450 Ω resistor is connected to a 9.0 V battery. What is the current, in mA?", null,
   "Ohm's law: $I = U/R = 9.0/450 = 0.020$ A $= 20$ mA."],
  ["En strøm på 2,0 A går gjennom en ledning i 5,0 minutter. Hvor mye ladning har passert?", { n: 600, tol: 3, u: "C" },
   "$t = 5{,}0\\cdot 60 = 300$ s, og $Q = It = 2{,}0\\cdot 300 = 600$ C.",
   "A current of 2.0 A flows through a wire for 5.0 minutes. How much charge has passed?", null,
   "$t = 5.0\\cdot 60 = 300$ s, and $Q = It = 2.0\\cdot 300 = 600$ C."],
  ["En panelovn er merket 230 V og 1500 W. Hva er resistansen i ovnen når den er i drift?", { n: 35.27, tol: 0.3, u: "Ω" },
   "Fra $P = U^2/R$ får vi $R = U^2/P = 230^2/1500 = 52\\,900/1500 \\approx 35{,}3$ Ω. Strømmen er $I = P/U = 1500/230 \\approx 6{,}52$ A.",
   "A panel heater is rated 230 V and 1500 W. What is the resistance of the heater when it is running?", null,
   "From $P = U^2/R$ we get $R = U^2/P = 230^2/1500 = 52\\,900/1500 \\approx 35.3$ Ω. The current is $I = P/U = 1500/230 \\approx 6.52$ A."]
]);

GEN("GFYS", 5,
 // 1: Ohms lov U = RI (ett steg)
 ()=>{ const Rr=R.i(2,60), I=R.f(0.1,2,0.1), U=Rr*I;
   return [T(`Strømmen gjennom en motstand på ${Rr} Ω er ${nf(I)} A. Hvor stor er spenningen over motstanden?`,`The current through a ${Rr} Ω resistor is ${nf(I)} A. What is the voltage across the resistor?`),
     {n:U,tol:rel(U),u:"V"},
     T(`Ohms lov: $U = RI = ${Rr}\\cdot ${mf(I)} = ${mf(U,1)}$ V.`,`Ohm's law: $U = RI = ${Rr}\\cdot ${mf(I)} = ${mf(U,1)}$ V.`)]; },
 // 2: ladning Q = It
 ()=>{ const I=R.f(0.1,5,0.1), tmin=R.i(1,30), Q=I*tmin*60;
   return [T(`En strøm på ${nf(I)} A går gjennom en lampe i ${tmin} minutter. Hvor mye ladning passerer gjennom lampen?`,`A current of ${nf(I)} A flows through a lamp for ${tmin} minutes. How much charge passes through the lamp?`),
     {n:Q,tol:rel(Q),u:"C"},
     T(`$t = ${tmin}\\cdot 60 = ${tmin*60}$ s, og $Q = It = ${mf(I)}\\cdot ${tmin*60} = ${mf(Q,0)}$ C.`,`$t = ${tmin}\\cdot 60 = ${tmin*60}$ s, and $Q = It = ${mf(I)}\\cdot ${tmin*60} = ${mf(Q,0)}$ C.`)]; },
 // 3: effekt og energi i kWh
 ()=>{ const I=R.f(2,10,0.5), h=R.i(2,12), P=230*I, E=P*h/1000;
   return [T(`En varmeovn koblet til 230 V trekker ${nf(I)} A og står på i ${h} timer. Hvor mye elektrisk energi bruker den, i kWh?`,`A heater connected to 230 V draws ${nf(I)} A and is on for ${h} hours. How much electrical energy does it use, in kWh?`),
     {n:E,tol:rel(E),u:"kWh"},
     T(`Effekt: $P = UI = 230\\cdot ${mf(I)} = ${mf(P,0)}$ W $= ${mf(P/1000,3)}$ kW. Energi: $E = Pt = ${mf(P/1000,3)}\\text{ kW}\\cdot ${h}\\text{ h} \\approx ${mf(E,2)}$ kWh.`,
       `Power: $P = UI = 230\\cdot ${mf(I)} = ${mf(P,0)}$ W $= ${mf(P/1000,3)}$ kW. Energy: $E = Pt = ${mf(P/1000,3)}\\text{ kW}\\cdot ${h}\\text{ h} \\approx ${mf(E,2)}$ kWh.`)]; },
 // 4: seriekobling – spenning over én motstand
 ()=>{ const U=R.p([6,9,12,24]), R1=R.i(10,100), R2=R.i(10,100), R3=R.i(10,100), Rt=R1+R2+R3, I=U/Rt, U2=R2*I;
   return [T(`Tre motstander $R_1 = ${R1}$ Ω, $R_2 = ${R2}$ Ω og $R_3 = ${R3}$ Ω er koblet i serie til en spenningskilde på ${U} V. Hvor stor er spenningen over $R_2$?`,`Three resistors $R_1 = ${R1}$ Ω, $R_2 = ${R2}$ Ω and $R_3 = ${R3}$ Ω are connected in series to a ${U} V voltage source. What is the voltage across $R_2$?`),
     {n:U2,tol:rel(U2),u:"V"},
     T(`I serie: $R_{\\text{tot}} = ${R1} + ${R2} + ${R3} = ${Rt}$ Ω. Strømmen er lik overalt: $I = U/R_{\\text{tot}} = ${U}/${Rt} \\approx ${mf(I,4)}$ A. Spenningen over $R_2$: $U_2 = R_2I = ${R2}\\cdot ${mf(I,4)} \\approx ${mf(U2,2)}$ V.`,
       `In series: $R_{\\text{tot}} = ${R1} + ${R2} + ${R3} = ${Rt}$ Ω. The current is the same everywhere: $I = U/R_{\\text{tot}} = ${U}/${Rt} \\approx ${mf(I,4)}$ A. The voltage across $R_2$: $U_2 = R_2I = ${R2}\\cdot ${mf(I,4)} \\approx ${mf(U2,2)}$ V.`)]; },
 // 5: parallellkobling – total strøm
 ()=>{ const U=R.p([6,9,12,24,48]), R1=R.i(4,80), R2=R.i(4,80), I1=U/R1, I2=U/R2, I=I1+I2, Rp=R1*R2/(R1+R2);
   return [T(`To motstander på ${R1} Ω og ${R2} Ω er koblet i parallell til et batteri på ${U} V. Hvor stor strøm leverer batteriet?`,`Two resistors of ${R1} Ω and ${R2} Ω are connected in parallel to a ${U} V battery. How much current does the battery deliver?`),
     {n:I,tol:rel(I),u:"A"},
     T(`Begge har ${U} V over seg. $I_1 = ${U}/${R1} \\approx ${mf(I1,3)}$ A og $I_2 = ${U}/${R2} \\approx ${mf(I2,3)}$ A, så $I = I_1 + I_2 \\approx ${mf(I,3)}$ A. (Kontroll: $R = \\dfrac{R_1R_2}{R_1+R_2} \\approx ${mf(Rp,2)}$ Ω og $U/R \\approx ${mf(I,3)}$ A.)`,
       `Both have ${U} V across them. $I_1 = ${U}/${R1} \\approx ${mf(I1,3)}$ A and $I_2 = ${U}/${R2} \\approx ${mf(I2,3)}$ A, so $I = I_1 + I_2 \\approx ${mf(I,3)}$ A. (Check: $R = \\dfrac{R_1R_2}{R_1+R_2} \\approx ${mf(Rp,2)}$ Ω and $U/R \\approx ${mf(I,3)}$ A.)`)]; },
 // 6: eksamensnivå – blandet krets, effekt i R3
 ()=>{ const U=R.p([6,9,12,24]), R1=R.i(1,12), R2=R.i(2,30), R3=R.i(2,30);
   const R23=R2*R3/(R2+R3), Rt=R1+R23, I=U/Rt, U23=I*R23, I3=U23/R3, P3=U23*I3;
   return [T(`Et batteri på ${U} V er koblet til $R_1 = ${R1}$ Ω i serie med en parallellkobling av $R_2 = ${R2}$ Ω og $R_3 = ${R3}$ Ω. Hvor stor effekt avsettes i $R_3$?`,`A ${U} V battery is connected to $R_1 = ${R1}$ Ω in series with a parallel combination of $R_2 = ${R2}$ Ω and $R_3 = ${R3}$ Ω. How much power is dissipated in $R_3$?`),
     {n:P3,tol:rel(P3),u:"W"},
     T(`Parallellgruppen: $R_{23} = \\dfrac{${R2}\\cdot ${R3}}{${R2}+${R3}} \\approx ${mf(R23,3)}$ Ω. Totalt: $R_{\\text{tot}} = ${R1} + ${mf(R23,3)} \\approx ${mf(Rt,3)}$ Ω. Strøm fra batteriet: $I = ${U}/${mf(Rt,3)} \\approx ${mf(I,3)}$ A. Spenning over parallellgruppen: $U_{23} = IR_{23} \\approx ${mf(U23,3)}$ V. Strøm i $R_3$: $I_3 = U_{23}/R_3 \\approx ${mf(I3,3)}$ A. Effekt: $P_3 = U_{23}I_3 \\approx ${mf(P3,3)}$ W.`,
       `Parallel group: $R_{23} = \\dfrac{${R2}\\cdot ${R3}}{${R2}+${R3}} \\approx ${mf(R23,3)}$ Ω. Total: $R_{\\text{tot}} = ${R1} + ${mf(R23,3)} \\approx ${mf(Rt,3)}$ Ω. Current from the battery: $I = ${U}/${mf(Rt,3)} \\approx ${mf(I,3)}$ A. Voltage across the parallel group: $U_{23} = IR_{23} \\approx ${mf(U23,3)}$ V. Current in $R_3$: $I_3 = U_{23}/R_3 \\approx ${mf(I3,3)}$ A. Power: $P_3 = U_{23}I_3 \\approx ${mf(P3,3)}$ W.`)]; }
);
