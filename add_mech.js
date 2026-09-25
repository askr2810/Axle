// ============================================================
//  add_mech.js – teori, faste oppgaver og generatorer for
//  MAPE1300 (Statikk og dynamikk), FAST (Fasthetslære),
//  MATS1600 (Maskinkonstruksjon) og SVING (Maskindynamikk og svingninger)
// ============================================================
(() => {

// ================= MAPE1300 – enhet 0: Statikk og likevekt =================
THEORY("MAPE1300", 0, {
nb: `## Hva handler det om?
Statikk handler om legemer som står i ro (eller beveger seg med konstant fart). Da er summen av alle krefter og summen av alle momenter null. Nesten all konstruksjonsberegning starter her: før du kan regne spenninger i en bjelke, en bolt eller en kranarm, må du vite hvilke krefter som virker på den – og mange av dem, opplagerkreftene, er ukjente til du har satt opp likevekt.

Det viktigste verktøyet er **frilegemediagrammet**: du «klipper» legemet løs fra omgivelsene og tegner alle kreftene omgivelsene virker på det med.

## Begreper og formler
- Kraft er en vektor. Dekomponer den: $F_x = F\\cos\\theta$ og $F_y = F\\sin\\theta$ ($\\theta$ målt fra x-aksen).
- Resultant av flere krefter: $R = \\sqrt{(\\sum F_x)^2 + (\\sum F_y)^2}$.
- Moment om et punkt O: $M_O = F\\cdot d$, der $d$ er den **vinkelrette** avstanden fra O til kraftens virkelinje (Nm eller kNm). Mot klokka regnes vanligvis positivt.
- Kraftpar: to like store, motsatt rettede, parallelle krefter gir et rent moment $M = Fd$, likt om alle punkter.
- En jevnt fordelt last $q$ (kN/m) over en lengde $a$ erstattes av resultanten $qa$ midt på lastområdet.
- Opplagre i 2D: rullelager gir 1 ukjent (kraft vinkelrett på underlaget), fastlager (ledd) gir 2 ($A_x$, $A_y$), fast innspenning gir 3 ($A_x$, $A_y$, $M_A$).
- Statisk bestemt: like mange ukjente som likevektsligninger.

Likevekt i planet gir tre ligninger:
$$\\sum F_x = 0,\\qquad \\sum F_y = 0,\\qquad \\sum M_O = 0$$

## Slik løser du oppgavene
1. Tegn frilegemediagram: legemet alene med alle ytre laster, egenvekt og opplagerkrefter. Anta en retning for hver ukjent.
2. Dekomponer skrå krefter i x- og y-komponenter.
3. Ta moment om et punkt der flest mulig ukjente angriper – da forsvinner de fra ligningen.
4. Bruk $\\sum F_x = 0$ og $\\sum F_y = 0$ for resten.
5. Kontroller med en ligning du ikke har brukt, for eksempel moment om et annet punkt. Et negativt svar betyr bare at kraften peker motsatt vei av det du antok.

### Eksempel
En 6 m lang bjelke har fastlager i A (venstre ende) og rullelager i B (høyre ende). Den bærer 12 kN i 2 m fra A og 6 kN i 5 m fra A. Finn opplagerkreftene.
1. Ukjente: $A_x$, $A_y$ og $B_y$. Det er ingen horisontale laster, så $A_x = 0$.
2. Moment om A, mot klokka positivt:
$$B_y\\cdot 6 - 12\\cdot 2 - 6\\cdot 5 = 0 \\quad\\Rightarrow\\quad B_y = \\frac{54}{6} = 9\\ \\mathrm{kN}$$
3. Vertikal likevekt: $A_y + B_y - 12 - 6 = 0$, så $A_y = 18 - 9 = 9$ kN.
4. Kontroll med moment om B: $-A_y\\cdot 6 + 12\\cdot 4 + 6\\cdot 1 = -54 + 54 = 0$. Det stemmer.

Svar: $A_y = B_y = 9$ kN, begge oppover, og $A_x = 0$.

## Vanlige feil
- Å glemme opplagerkreftene eller egenvekten i frilegemediagrammet.
- Å bruke hele armlengden i stedet for den vinkelrette avstanden til virkelinjen. For en kraft som danner vinkelen $\\theta$ med armen, er $M = Fd\\sin\\theta$.
- Å blande fortegn: bestem positiv dreieretning én gang og hold deg til den.
- Å tro at momentet om et opplager er null fordi det er et opplager. Det er bare opplagerkraftens eget bidrag som er null.
- Å blande kN og m med N og mm i samme ligning.

> Tre ligninger gir tre ukjente: ta moment om punktet med flest ukjente først, og kontroller med en ligning du ikke har brukt.`,
en: `## What is it about?
Statics deals with bodies at rest (or moving at constant velocity). Then the sum of all forces and the sum of all moments are zero. Almost every structural calculation starts here: before you can find the stresses in a beam, a bolt or a crane arm, you need to know which forces act on it – and many of them, the support reactions, are unknown until you have written the equilibrium equations.

The key tool is the **free-body diagram**: you "cut" the body free from its surroundings and draw every force the surroundings exert on it.

## Concepts and formulas
- A force is a vector. Resolve it: $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$ ($\\theta$ measured from the x-axis).
- Resultant of several forces: $R = \\sqrt{(\\sum F_x)^2 + (\\sum F_y)^2}$.
- Moment about a point O: $M_O = F\\cdot d$, where $d$ is the **perpendicular** distance from O to the line of action of the force (Nm or kNm). Counterclockwise is usually taken as positive.
- Couple: two equal, opposite, parallel forces give a pure moment $M = Fd$, the same about every point.
- A uniformly distributed load $q$ (kN/m) over a length $a$ is replaced by its resultant $qa$ at the middle of the loaded length.
- Supports in 2D: a roller gives 1 unknown (a force perpendicular to the surface), a pin gives 2 ($A_x$, $A_y$), a fixed support gives 3 ($A_x$, $A_y$, $M_A$).
- Statically determinate: as many unknowns as equilibrium equations.

Equilibrium in the plane gives three equations:
$$\\sum F_x = 0,\\qquad \\sum F_y = 0,\\qquad \\sum M_O = 0$$

## How to solve the problems
1. Draw the free-body diagram: the body alone with all external loads, self-weight and support reactions. Assume a direction for each unknown.
2. Resolve inclined forces into x and y components.
3. Take moments about a point where as many unknowns as possible act – they then drop out of the equation.
4. Use $\\sum F_x = 0$ and $\\sum F_y = 0$ for the rest.
5. Check with an equation you have not used, for example moments about another point. A negative result simply means the force points the other way than assumed.

### Example
A 6 m long beam has a pin at A (left end) and a roller at B (right end). It carries 12 kN at 2 m from A and 6 kN at 5 m from A. Find the support reactions.
1. Unknowns: $A_x$, $A_y$ and $B_y$. There are no horizontal loads, so $A_x = 0$.
2. Moments about A, counterclockwise positive:
$$B_y\\cdot 6 - 12\\cdot 2 - 6\\cdot 5 = 0 \\quad\\Rightarrow\\quad B_y = \\frac{54}{6} = 9\\ \\mathrm{kN}$$
3. Vertical equilibrium: $A_y + B_y - 12 - 6 = 0$, so $A_y = 18 - 9 = 9$ kN.
4. Check with moments about B: $-A_y\\cdot 6 + 12\\cdot 4 + 6\\cdot 1 = -54 + 54 = 0$. It checks out.

Answer: $A_y = B_y = 9$ kN, both upward, and $A_x = 0$.

## Common mistakes
- Forgetting the support reactions or the self-weight in the free-body diagram.
- Using the full arm length instead of the perpendicular distance to the line of action. For a force at an angle $\\theta$ to the arm, $M = Fd\\sin\\theta$.
- Mixing signs: choose the positive sense of rotation once and stick to it.
- Believing the moment about a support is zero because it is a support. Only the contribution of that support's own reaction is zero.
- Mixing kN and m with N and mm in the same equation.

> Three equations give three unknowns: take moments about the point with the most unknowns first, and check with an equation you have not used.`
});

BIQ("MAPE1300", 0, [
 ["Du tegner et frilegemediagram av en bjelke med to opplagre. Hva skal være med?",
  ["Alle ytre laster, egenvekten og opplagerkreftene", "Bare de ytre lastene – opplagerkreftene er ukjente og tegnes ikke", "Også de indre kreftene i bjelken", "Bare egenvekten"],
  "Frilegemediagrammet viser legemet løst fra omgivelsene med alle kreftene omgivelsene virker på det med. Ukjente opplagerkrefter tegnes med en antatt retning.",
  "You draw a free-body diagram of a beam with two supports. What should it include?",
  ["All external loads, the self-weight and the support reactions", "Only the external loads – the reactions are unknown and are not drawn", "Also the internal forces in the beam", "Only the self-weight"],
  "The free-body diagram shows the body cut free from its surroundings with every force the surroundings exert on it. Unknown reactions are drawn with an assumed direction."],
 ["Hvorfor lønner det seg ofte å ta moment om et opplagerpunkt når du skal finne opplagerkreftene?",
  ["De ukjente kreftene som angriper i punktet, forsvinner fra momentligningen", "Momentet om et opplager er alltid null", "Det gir størst moment og dermed minst avrundingsfeil", "Da trengs ikke $\\sum F_y = 0$"],
  "En kraft som går gjennom momentpunktet, har arm null. Da får ligningen færre ukjente. Momentet fra lastene om punktet er ikke null.",
  "Why is it often smart to take moments about a support point when finding the support reactions?",
  ["The unknown forces acting at that point drop out of the moment equation", "The moment about a support is always zero", "It gives the largest moment and therefore the smallest rounding error", "Then $\\sum F_y = 0$ is not needed"],
  "A force passing through the moment point has zero arm, so the equation contains fewer unknowns. The moment of the loads about the point is not zero."],
 ["En kraft flyttes langs sin egen virkelinje. Hva skjer med momentet den gir om et fast punkt O?",
  ["Det er uendret", "Det øker med avstanden kraften flyttes", "Det skifter fortegn", "Det blir null"],
  "Momentarmen er den vinkelrette avstanden fra O til virkelinjen, og den endres ikke når kraften flyttes langs linjen.",
  "A force is moved along its own line of action. What happens to its moment about a fixed point O?",
  ["It is unchanged", "It grows with the distance the force is moved", "It changes sign", "It becomes zero"],
  "The moment arm is the perpendicular distance from O to the line of action, and it does not change when the force slides along that line."],
 ["En 5 m lang bjelke har fastlager i A (venstre ende) og rullelager i B (høyre ende). Den har en punktlast på 8 kN i 2 m fra A og et utkraget parti med 4 kN i 1 m til høyre for B. Hvor stor er den vertikale opplagerkraften i A (positiv oppover)?",
  { n: 4, tol: 0.05, u: "kN" },
  "Moment om A: $B_y\\cdot 5 = 8\\cdot 2 + 4\\cdot 6 = 40$, så $B_y = 8$ kN. Vertikal likevekt: $A_y = 8 + 4 - 8 = 4$ kN (oppover).",
  "A 5 m long beam has a pin at A (left end) and a roller at B (right end). It carries a point load of 8 kN at 2 m from A and has an overhang with 4 kN at 1 m to the right of B. What is the vertical reaction at A (positive upward)?",
  null,
  "Moments about A: $B_y\\cdot 5 = 8\\cdot 2 + 4\\cdot 6 = 40$, so $B_y = 8$ kN. Vertical equilibrium: $A_y = 8 + 4 - 8 = 4$ kN (upward)."]
]);

GEN("MAPE1300", 0,
 // enkel: moment av skrå kraft
 () => { const F = R.f(50, 400, 10), L = R.f(0.15, 0.6, 0.05), th = R.p([30, 40, 45, 50, 60, 70, 75]), M = F * L * Math.sin(th * DEG);
   return [T(`Du drar i enden av en ${nf(L)} m lang skiftenøkkel med en kraft på ${nf(F)} N. Kraften danner ${th}° med nøkkelen. Hvor stort moment gir den om bolten?`,
             `You pull on the end of a ${nf(L)} m long wrench with a force of ${nf(F)} N. The force makes an angle of ${th}° with the wrench. What moment does it produce about the bolt?`),
     { n: M, tol: rel(M), u: "Nm" },
     T(`Bare komponenten vinkelrett på nøkkelen gir moment: $M = FL\\sin\\theta = ${mf(F)}\\cdot ${mf(L)}\\cdot\\sin ${th}^\\circ \\approx ${mf(M, 1)}$ Nm.`,
       `Only the component perpendicular to the wrench produces a moment: $M = FL\\sin\\theta = ${mf(F)}\\cdot ${mf(L)}\\cdot\\sin ${th}^\\circ \\approx ${mf(M, 1)}$ Nm.`)]; },
 // middels: resultant av to skrå krefter
 () => { const F1 = R.f(100, 600, 20), F2 = R.f(100, 600, 20), a1 = R.p([0, 15, 20, 30, 45]), a2 = R.p([60, 75, 90, 110, 120, 135, 150]);
   const Rx = F1 * Math.cos(a1 * DEG) + F2 * Math.cos(a2 * DEG), Ry = F1 * Math.sin(a1 * DEG) + F2 * Math.sin(a2 * DEG), Rr = Math.hypot(Rx, Ry);
   return [T(`To krefter virker i samme punkt: $F_1 = ${mf(F1)}$ N med retning ${a1}° og $F_2 = ${mf(F2)}$ N med retning ${a2}°, begge målt mot klokka fra den positive x-aksen. Hvor stor er resultanten?`,
             `Two forces act at the same point: $F_1 = ${mf(F1)}$ N in the direction ${a1}° and $F_2 = ${mf(F2)}$ N in the direction ${a2}°, both measured counterclockwise from the positive x-axis. What is the magnitude of the resultant?`),
     { n: Rr, tol: rel(Rr), u: "N" },
     T(`Summer komponentene: $R_x = ${mf(F1)}\\cos ${a1}^\\circ + ${mf(F2)}\\cos ${a2}^\\circ \\approx ${mf(Rx, 1)}$ N og $R_y = ${mf(F1)}\\sin ${a1}^\\circ + ${mf(F2)}\\sin ${a2}^\\circ \\approx ${mf(Ry, 1)}$ N. Da er $R = \\sqrt{R_x^2 + R_y^2} \\approx ${mf(Rr, 1)}$ N.`,
       `Add the components: $R_x = ${mf(F1)}\\cos ${a1}^\\circ + ${mf(F2)}\\cos ${a2}^\\circ \\approx ${mf(Rx, 1)}$ N and $R_y = ${mf(F1)}\\sin ${a1}^\\circ + ${mf(F2)}\\sin ${a2}^\\circ \\approx ${mf(Ry, 1)}$ N. Then $R = \\sqrt{R_x^2 + R_y^2} \\approx ${mf(Rr, 1)}$ N.`)]; },
 // eksamen: kranarm holdt av wire
 () => { const L = R.f(2, 5, 0.5), m = R.i(40, 200), P = R.f(2, 15, 0.5), a = R.f(1, L, 0.5), th = R.p([25, 30, 35, 40, 45, 50]);
   const W = m * G_ / 1000, S = (W * L / 2 + P * a) / (L * Math.sin(th * DEG));
   return [T(`En horisontal kranarm AB er ${nf(L)} m lang og har massen ${m} kg (jevnt fordelt). Den er festet med et ledd i veggen i A og holdes oppe av en wire fra enden B til et punkt på veggen over A. Wiren danner ${th}° med armen. En last på ${nf(P)} kN henger ${nf(a)} m fra A. Hvor stor er strekkraften i wiren? ($g = 9{,}81$ m/s²)`,
             `A horizontal crane arm AB is ${nf(L)} m long and has a mass of ${m} kg (uniformly distributed). It is pinned to a wall at A and held up by a cable from the end B to a point on the wall above A. The cable makes an angle of ${th}° with the arm. A load of ${nf(P)} kN hangs ${nf(a)} m from A. What is the tension in the cable? ($g = 9.81$ m/s²)`),
     { n: S, tol: rel(S), u: "kN" },
     T(`Egenvekt $G = mg = ${mf(W, 3)}$ kN i midten av armen. Moment om A (leddkreftene faller ut): $S\\sin ${th}^\\circ\\cdot ${mf(L)} = ${mf(W, 3)}\\cdot ${mf(L / 2)} + ${mf(P)}\\cdot ${mf(a)}$, så $S \\approx ${mf(S)}$ kN.`,
       `Self-weight $G = mg = ${mf(W, 3)}$ kN at the middle of the arm. Moments about A (the pin reactions drop out): $S\\sin ${th}^\\circ\\cdot ${mf(L)} = ${mf(W, 3)}\\cdot ${mf(L / 2)} + ${mf(P)}\\cdot ${mf(a)}$, so $S \\approx ${mf(S)}$ kN.`)]; }
);

// ================= MAPE1300 – enhet 1: Fagverk og friksjon =================
THEORY("MAPE1300", 1, {
nb: `## Hva handler det om?
Et fagverk er en konstruksjon av rette staver som er koblet sammen i knutepunkter, for eksempel takstoler, kranbommer, bruer og master. Når lastene angriper i knutepunktene og stavene er leddet i endene, blir hver stav et **to-kraft-element**: den er enten i strekk eller i trykk, og kraften går langs staven. Det gjør fagverk lette og stive.

Friksjon er kraften som motvirker glidning mellom to flater. Den avgjør om en kasse blir liggende på et skråplan, hvor stor kraft som trengs for å dra noe, og om en bremse eller en skrueforbindelse holder.

## Begreper og formler
- Stavkraft $S$: positiv i strekk (staven drar i knutepunktet), negativ i trykk.
- Knutepunktmetoden: $\\sum F_x = 0$ og $\\sum F_y = 0$ i hvert knutepunkt, altså maks to ukjente per knutepunkt.
- Snittmetoden: snitt gjennom maks tre staver og bruk tre likevektsligninger for den ene delen.
- Nullstaver: i et ubelastet knutepunkt med to staver som ikke ligger på linje, er begge null. Med tre staver der to ligger på linje, er den tredje null.
- Statisk friksjon: $F \\le \\mu_s N$. Friksjonen er bare så stor som likevekten krever, og glidning starter når $F = \\mu_s N$.
- Kinetisk friksjon: $F = \\mu_k N$, der vanligvis $\\mu_k < \\mu_s$.
- Skråplan med helning $\\theta$: $N = mg\\cos\\theta$, og tyngdens komponent langs planet er $mg\\sin\\theta$. Klossen glir av seg selv hvis $\\tan\\theta > \\mu_s$.
- Friksjonsvinkel: $\\tan\\varphi = \\mu_s$.
- Tyngdepunkt for sammensatte flater: $\\bar x = \\sum A_i x_i / \\sum A_i$.

## Slik løser du oppgavene
1. Finn opplagerkreftene for hele fagverket, som om det var ett stivt legeme.
2. Start i et knutepunkt med maks to ukjente stavkrefter. Anta strekk i alle ukjente staver.
3. Sett opp $\\sum F_x = 0$ og $\\sum F_y = 0$ og løs. Negativt svar betyr trykk.
4. Gå videre til neste knutepunkt med maks to ukjente, eller bruk snittmetoden hvis du bare trenger én bestemt stav.
5. Friksjon: tegn frilegemediagram, finn normalkraften $N$ fra likevekt vinkelrett på flaten (den er ikke alltid $mg$), og sammenlign nødvendig friksjon med $\\mu_s N$.

### Eksempel
Et trekantet fagverk har fastlager i A og rullelager i B, 4 m fra hverandre. Toppknuten C ligger 1,5 m over midtpunktet mellom A og B og bærer 12 kN nedover. Finn kreftene i AC og AB.
1. Symmetri gir $A_y = B_y = 6$ kN.
2. Staven AC har lengde $\\sqrt{2^2 + 1{,}5^2} = 2{,}5$ m, så $\\sin\\alpha = 1{,}5/2{,}5 = 0{,}6$ og $\\cos\\alpha = 0{,}8$.
3. Knutepunkt A, vertikalt: $6 + S_{AC}\\cdot 0{,}6 = 0$, så $S_{AC} = -10$ kN (trykk).
4. Knutepunkt A, horisontalt: $S_{AB} + S_{AC}\\cdot 0{,}8 = 0$, så $S_{AB} = 8$ kN (strekk).

Svar: AC og BC har 10 kN trykk, og AB har 8 kN strekk. Bunnstaven holder «beina» sammen så de ikke glir ut.

## Vanlige feil
- Å bruke $N = mg$ også når planet heller eller det virker skrå krefter. Finn $N$ fra likevekt.
- Å sette friksjonen lik $\\mu_s N$ når klossen står i ro og ikke er i ferd med å gli. Da er friksjonen bare så stor som likevekten krever.
- Å blande fortegn på stavkrefter. Anta strekk overalt og la fortegnet fortelle om det er trykk.
- Å snitte gjennom mer enn tre ukjente staver.

> Fagverksstaver tar bare strekk eller trykk langs staven. Friksjon er en reaksjonskraft med et tak: $F \\le \\mu_s N$.`,
en: `## What is it about?
A truss is a structure made of straight members joined at nodes, for example roof trusses, crane booms, bridges and masts. When the loads act at the joints and the members are pinned at their ends, each member becomes a **two-force member**: it is either in tension or in compression, and the force acts along the member. That is what makes trusses light and stiff.

Friction is the force that resists sliding between two surfaces. It decides whether a crate stays put on an incline, how much force is needed to drag something, and whether a brake or a bolted joint holds.

## Concepts and formulas
- Member force $S$: positive in tension (the member pulls on the joint), negative in compression.
- Method of joints: $\\sum F_x = 0$ and $\\sum F_y = 0$ at each joint, so at most two unknowns per joint.
- Method of sections: cut through at most three members and use three equilibrium equations for one of the parts.
- Zero-force members: at an unloaded joint with two non-collinear members, both are zero. With three members where two are collinear, the third is zero.
- Static friction: $F \\le \\mu_s N$. Friction is only as large as equilibrium requires, and sliding starts when $F = \\mu_s N$.
- Kinetic friction: $F = \\mu_k N$, where usually $\\mu_k < \\mu_s$.
- Incline at angle $\\theta$: $N = mg\\cos\\theta$, and the component of the weight along the plane is $mg\\sin\\theta$. The block slides by itself if $\\tan\\theta > \\mu_s$.
- Angle of friction: $\\tan\\varphi = \\mu_s$.
- Centroid of composite areas: $\\bar x = \\sum A_i x_i / \\sum A_i$.

## How to solve the problems
1. Find the support reactions for the whole truss, treating it as one rigid body.
2. Start at a joint with at most two unknown member forces. Assume tension in all unknown members.
3. Write $\\sum F_x = 0$ and $\\sum F_y = 0$ and solve. A negative result means compression.
4. Move on to the next joint with at most two unknowns, or use the method of sections if you only need one particular member.
5. Friction: draw a free-body diagram, find the normal force $N$ from equilibrium perpendicular to the surface (it is not always $mg$), and compare the friction needed with $\\mu_s N$.

### Example
A triangular truss has a pin at A and a roller at B, 4 m apart. The top joint C is 1.5 m above the midpoint between A and B and carries 12 kN downward. Find the forces in AC and AB.
1. Symmetry gives $A_y = B_y = 6$ kN.
2. Member AC has length $\\sqrt{2^2 + 1.5^2} = 2.5$ m, so $\\sin\\alpha = 1.5/2.5 = 0.6$ and $\\cos\\alpha = 0.8$.
3. Joint A, vertical: $6 + S_{AC}\\cdot 0.6 = 0$, so $S_{AC} = -10$ kN (compression).
4. Joint A, horizontal: $S_{AB} + S_{AC}\\cdot 0.8 = 0$, so $S_{AB} = 8$ kN (tension).

Answer: AC and BC carry 10 kN in compression, and AB carries 8 kN in tension. The bottom chord holds the "legs" together so they do not spread.

## Common mistakes
- Using $N = mg$ even when the surface is inclined or inclined forces act. Find $N$ from equilibrium.
- Setting friction equal to $\\mu_s N$ when the block is at rest and not about to slide. Friction is then only as large as equilibrium requires.
- Mixing up signs of member forces. Assume tension everywhere and let the sign tell you when it is compression.
- Cutting through more than three unknown members.

> Truss members only carry tension or compression along the member. Friction is a reaction force with a ceiling: $F \\le \\mu_s N$.`
});

BIQ("MAPE1300", 1, [
 ["Du antar strekk i alle staver og får $S = -15$ kN i en av dem. Hva betyr det?",
  ["Staven har 15 kN trykk", "Du har regnet feil – stavkrefter kan ikke være negative", "Staven er en nullstav", "Staven har 15 kN strekk"],
  "Negativt fortegn betyr at kraften virker motsatt av antatt retning: staven skyver på knutepunktene, altså trykk.",
  "You assume tension in every member and get $S = -15$ kN in one of them. What does that mean?",
  ["The member carries 15 kN in compression", "You made a mistake – member forces cannot be negative", "The member is a zero-force member", "The member carries 15 kN in tension"],
  "A negative sign means the force acts opposite to the assumed direction: the member pushes on the joints, which is compression."],
 ["En kasse med tyngde 100 N står i ro på et horisontalt gulv med $\\mu_s = 0{,}5$. Du dytter horisontalt med 20 N, og kassen rører seg ikke. Hvor stor er friksjonskraften?",
  ["20 N", "50 N", "0 N", "70 N"],
  "Kassen er i likevekt, så friksjonen er akkurat like stor som dyttet: 20 N. $\\mu_s N = 50$ N er bare den største friksjonen gulvet kan gi.",
  "A crate weighing 100 N rests on a horizontal floor with $\\mu_s = 0.5$. You push horizontally with 20 N and the crate does not move. How large is the friction force?",
  ["20 N", "50 N", "0 N", "70 N"],
  "The crate is in equilibrium, so friction exactly balances the push: 20 N. $\\mu_s N = 50$ N is only the largest friction the floor can provide."],
 ["Du drar en tung kasse bortover gulvet med et tau. Hva skjer med friksjonskraften hvis tauet peker litt oppover i stedet for horisontalt?",
  ["Den blir mindre, fordi tauet løfter litt og normalkraften blir mindre", "Den blir større, fordi kraften er skrå", "Den er uendret, fordi friksjon bare avhenger av massen", "Den blir null"],
  "Den vertikale komponenten av taukraften avlaster gulvet: $N = mg - F\\sin\\theta$. Da blir friksjonen $\\mu N$ mindre.",
  "You drag a heavy crate across the floor with a rope. What happens to the friction force if the rope points slightly upward instead of horizontally?",
  ["It decreases, because the rope lifts slightly and the normal force decreases", "It increases, because the force is inclined", "It is unchanged, because friction depends only on the mass", "It becomes zero"],
  "The vertical component of the rope force unloads the floor: $N = mg - F\\sin\\theta$. The friction $\\mu N$ therefore decreases."],
 ["En kasse på 50 kg står på et skråplan med helning 35° og $\\mu_s = 0{,}25$. Hvor stor kraft parallelt med planet må du minst holde igjen med for at den ikke skal gli ned? ($g = 9{,}81$ m/s²)",
  { n: 180.89, tol: 1.5, u: "N" },
  "$\\tan 35^\\circ \\approx 0{,}70 > 0{,}25$, så kassen glir uten hjelp. Friksjonen virker oppover planet: $F = mg(\\sin\\theta - \\mu_s\\cos\\theta) = 490{,}5\\cdot(0{,}5736 - 0{,}2048) \\approx 180{,}9$ N.",
  "A 50 kg crate stands on an incline at 35° with $\\mu_s = 0.25$. What is the smallest force parallel to the plane you must hold it with so that it does not slide down? ($g = 9.81$ m/s²)",
  null,
  "$\\tan 35^\\circ \\approx 0.70 > 0.25$, so the crate slides on its own. Friction acts up the plane: $F = mg(\\sin\\theta - \\mu_s\\cos\\theta) = 490.5\\cdot(0.5736 - 0.2048) \\approx 180.9$ N."]
]);

GEN("MAPE1300", 1,
 // enkel: friksjonsvinkel
 () => { const mu = R.f(0.1, 0.9, 0.05), phi = Math.atan(mu) / DEG;
   return [T(`En kloss ligger på en plate som sakte vippes opp. Statisk friksjonskoeffisient er $\\mu_s = ${mf(mu)}$. Ved hvilken helningsvinkel begynner klossen å gli?`,
             `A block rests on a plate that is slowly tilted up. The coefficient of static friction is $\\mu_s = ${mf(mu)}$. At what inclination does the block start to slide?`),
     { n: phi, tol: 0.3, u: "°" },
     T(`Glidning starter når $\\tan\\theta = \\mu_s$: $\\theta = \\arctan ${mf(mu)} \\approx ${mf(phi, 1)}^\\circ$ (friksjonsvinkelen). Massen spiller ingen rolle.`,
       `Sliding starts when $\\tan\\theta = \\mu_s$: $\\theta = \\arctan ${mf(mu)} \\approx ${mf(phi, 1)}^\\circ$ (the angle of friction). The mass does not matter.`)]; },
 // middels: bunnstav i trekantfagverk
 () => { const L = R.f(4, 12, 1), h = R.f(1, 4, 0.5), P = R.f(5, 40, 1); const s = Math.hypot(L / 2, h), SAC = P / 2 * s / h, SAB = P * L / (4 * h);
   return [T(`Et symmetrisk trekantfagverk har spennvidde ${nf(L)} m mellom fastlager A og rullelager B, og toppknuten C ligger ${nf(h)} m over midten. En last på ${nf(P)} kN henger i C. Hvor stor er strekkraften i bunnstaven AB?`,
             `A symmetric triangular truss spans ${nf(L)} m between a pin at A and a roller at B, and the top joint C is ${nf(h)} m above the middle. A load of ${nf(P)} kN hangs at C. What is the tension in the bottom chord AB?`),
     { n: SAB, tol: rel(SAB), u: "kN" },
     T(`$A_y = P/2 = ${mf(P / 2)}$ kN. Staven AC er $${mf(s, 3)}$ m lang. Vertikalt i A: $S_{AC}\\cdot ${mf(h)}/${mf(s, 3)} = -${mf(P / 2)}$ gir $S_{AC} \\approx -${mf(SAC)}$ kN (trykk). Horisontalt i A: $S_{AB} = -S_{AC}\\cdot ${mf(L / 2)}/${mf(s, 3)} = \\dfrac{PL}{4h} \\approx ${mf(SAB)}$ kN (strekk).`,
       `$A_y = P/2 = ${mf(P / 2)}$ kN. Member AC is $${mf(s, 3)}$ m long. Vertical at A: $S_{AC}\\cdot ${mf(h)}/${mf(s, 3)} = -${mf(P / 2)}$ gives $S_{AC} \\approx -${mf(SAC)}$ kN (compression). Horizontal at A: $S_{AB} = -S_{AC}\\cdot ${mf(L / 2)}/${mf(s, 3)} = \\dfrac{PL}{4h} \\approx ${mf(SAB)}$ kN (tension).`)]; },
 // eksamen: stige med person
 () => { const Ll = R.f(3, 6, 0.5), ml = R.i(8, 20), mp = R.i(60, 110), s = R.f(1, Ll - 0.5, 0.5), th = R.p([60, 62, 65, 68, 70, 72, 75]);
   const Nf = (ml + mp) * G_, Nw = (ml * G_ * Ll / 2 + mp * G_ * s) * Math.cos(th * DEG) / (Ll * Math.sin(th * DEG)), mu = Nw / Nf;
   return [T(`En stige på ${nf(Ll)} m og ${ml} kg står mot en glatt (friksjonsfri) vegg og danner ${th}° med gulvet. En person på ${mp} kg står ${nf(s)} m opp langs stigen. Hvor stor må friksjonskoeffisienten mot gulvet minst være for at stigen ikke skal skli? ($g = 9{,}81$ m/s²)`,
             `A ladder of ${nf(Ll)} m and ${ml} kg leans against a smooth (frictionless) wall at ${th}° to the floor. A person of ${mp} kg stands ${nf(s)} m up the ladder. What is the smallest coefficient of friction at the floor that keeps the ladder from slipping? ($g = 9.81$ m/s²)`),
     { n: mu, tol: Math.max(0.005, mu * 0.02), u: "" },
     T(`Vertikalt: $N_g = (m_s + m_p)g \\approx ${mf(Nf, 0)}$ N. Moment om foten: $N_v\\cdot L\\sin\\theta = (m_s g\\,L/2 + m_p g\\,s)\\cos\\theta$ gir $N_v \\approx ${mf(Nw, 1)}$ N. Horisontalt må friksjonen være lik $N_v$, så $\\mu_{min} = N_v/N_g \\approx ${mf(mu, 3)}$.`,
       `Vertical: $N_f = (m_l + m_p)g \\approx ${mf(Nf, 0)}$ N. Moments about the foot: $N_w\\cdot L\\sin\\theta = (m_l g\\,L/2 + m_p g\\,s)\\cos\\theta$ gives $N_w \\approx ${mf(Nw, 1)}$ N. Horizontally the friction must equal $N_w$, so $\\mu_{min} = N_w/N_f \\approx ${mf(mu, 3)}$.`)]; }
);

// ================= MAPE1300 – enhet 2: Dynamikk =================
THEORY("MAPE1300", 2, {
nb: `## Hva handler det om?
Dynamikk beskriver hvordan ting beveger seg og hvorfor. Kinematikken beskriver selve bevegelsen (posisjon, fart og akselerasjon), og kinetikken kobler bevegelsen til kreftene gjennom Newtons 2. lov. For en ingeniør handler det om bremselengder, krefter i heiser og kraner, effektbehov for motorer og hva som skjer i et støt.

Tre verktøy dekker nesten alt: **Newtons 2. lov** når du vil finne akselerasjon eller krefter, **energimetoden** når du vil finne farten etter en strekning, og **impulsloven** når du vil finne farten etter et støt eller en kort kraftpåvirkning.

## Begreper og formler
- Konstant akselerasjon: $v = v_0 + at$, $s = v_0t + \\tfrac12at^2$ og $v^2 = v_0^2 + 2as$.
- Newtons 2. lov: $\\sum F = ma$. Tegn frilegemediagram først.
- Arbeid $W = Fs\\cos\\theta$, kinetisk energi $E_k = \\tfrac12mv^2$ og potensiell energi $E_p = mgh$.
- Arbeid–energi: $E_{k1} + E_{p1} + W_{andre} = E_{k2} + E_{p2}$, der $W_{andre}$ er arbeid fra friksjon, motorer og lignende. Friksjon gir negativt arbeid.
- Effekt: $P = W/t = Fv$, målt i watt (J/s).
- Bevegelsesmengde $p = mv$. Impulsloven: $\\int F\\,dt = \\Delta(mv)$.
- Støt: bevegelsesmengden er bevart, $m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$. Når legemene henger sammen etterpå (fullstendig uelastisk støt), er $v' = (m_1v_1 + m_2v_2)/(m_1 + m_2)$.
- Sirkelbevegelse: $a_n = v^2/r$ inn mot sentrum, og $F = mv^2/r$.
- Omregning: 1 m/s = 3,6 km/h.

## Slik løser du oppgavene
1. Velg metode: krefter og akselerasjon gir Newton, fart etter en strekning gir energi, og støt gir bevegelsesmengde.
2. Tegn frilegemediagram og velg positiv retning.
3. Regn om til SI-enheter (km/h til m/s, g til kg).
4. Sett opp ligningen og løs for den ukjente.
5. Kontroller størrelsesorden og fortegn.

### Eksempel
En bil kjører i 90 km/h og bråbremser med låste hjul. Friksjonskoeffisienten mellom dekk og vei er $\\mu_k = 0{,}7$. Hvor lang blir bremselengden?
1. Fart: $v_0 = 90/3{,}6 = 25$ m/s.
2. Newton: friksjonen er den eneste horisontale kraften, så $\\mu_k mg = ma$ og $a = \\mu_k g = 0{,}7\\cdot 9{,}81 \\approx 6{,}87$ m/s² (retardasjon). Massen forkortes bort.
3. Kinematikk: $0 = v_0^2 - 2as$ gir
$$s = \\frac{v_0^2}{2\\mu_k g}$$
Med tall: $s = 25^2/(2\\cdot 0{,}7\\cdot 9{,}81) \\approx 45{,}5$ m.
4. Kontroll med energi: $\\tfrac12mv_0^2 = \\mu_k mg\\,s$ gir samme uttrykk.

Svar: omtrent 45,5 m. Legg merke til at dobbel fart gir fire ganger så lang bremselengde.

## Vanlige feil
- Å regne med km/h i formler som krever m/s.
- Å glemme tyngdens komponent eller friksjonen i $\\sum F$.
- Å tro at det trengs en netto kraft for å holde konstant fart. Konstant fart betyr $\\sum F = 0$.
- Å bruke bevaring av kinetisk energi i et uelastisk støt. Der er bare bevegelsesmengden bevart.
- Å bruke formlene for konstant akselerasjon når akselerasjonen varierer.

> Newton for krefter, energi for fart etter en strekning, bevegelsesmengde for støt – og alltid SI-enheter.`,
en: `## What is it about?
Dynamics describes how things move and why. Kinematics describes the motion itself (position, velocity and acceleration), and kinetics links the motion to the forces through Newton's second law. For an engineer this means braking distances, forces in elevators and cranes, the power a motor must deliver and what happens in a collision.

Three tools cover almost everything: **Newton's second law** when you want acceleration or forces, the **energy method** when you want the speed after a certain distance, and the **impulse–momentum principle** when you want the velocity after an impact or a short force pulse.

## Concepts and formulas
- Constant acceleration: $v = v_0 + at$, $s = v_0t + \\tfrac12at^2$ and $v^2 = v_0^2 + 2as$.
- Newton's second law: $\\sum F = ma$. Draw a free-body diagram first.
- Work $W = Fs\\cos\\theta$, kinetic energy $E_k = \\tfrac12mv^2$ and potential energy $E_p = mgh$.
- Work–energy: $E_{k1} + E_{p1} + W_{other} = E_{k2} + E_{p2}$, where $W_{other}$ is work done by friction, motors and similar. Friction does negative work.
- Power: $P = W/t = Fv$, measured in watts (J/s).
- Momentum $p = mv$. Impulse–momentum: $\\int F\\,dt = \\Delta(mv)$.
- Collisions: momentum is conserved, $m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$. When the bodies stick together (perfectly inelastic impact), $v' = (m_1v_1 + m_2v_2)/(m_1 + m_2)$.
- Circular motion: $a_n = v^2/r$ toward the center, and $F = mv^2/r$.
- Conversion: 1 m/s = 3.6 km/h.

## How to solve the problems
1. Choose the method: forces and acceleration call for Newton, speed after a distance calls for energy, and impacts call for momentum.
2. Draw a free-body diagram and choose a positive direction.
3. Convert to SI units (km/h to m/s, g to kg).
4. Set up the equation and solve for the unknown.
5. Check the order of magnitude and the sign.

### Example
A car travels at 90 km/h and brakes hard with locked wheels. The coefficient of friction between tires and road is $\\mu_k = 0.7$. How long is the braking distance?
1. Speed: $v_0 = 90/3.6 = 25$ m/s.
2. Newton: friction is the only horizontal force, so $\\mu_k mg = ma$ and $a = \\mu_k g = 0.7\\cdot 9.81 \\approx 6.87$ m/s² (deceleration). The mass cancels.
3. Kinematics: $0 = v_0^2 - 2as$ gives
$$s = \\frac{v_0^2}{2\\mu_k g}$$
With numbers: $s = 25^2/(2\\cdot 0.7\\cdot 9.81) \\approx 45.5$ m.
4. Check with energy: $\\tfrac12mv_0^2 = \\mu_k mg\\,s$ gives the same expression.

Answer: about 45.5 m. Note that twice the speed gives four times the braking distance.

## Common mistakes
- Using km/h in formulas that require m/s.
- Forgetting the weight component or the friction in $\\sum F$.
- Believing a net force is needed to keep a constant speed. Constant velocity means $\\sum F = 0$.
- Assuming kinetic energy is conserved in an inelastic collision. Only momentum is conserved there.
- Using the constant-acceleration formulas when the acceleration varies.

> Newton for forces, energy for speed after a distance, momentum for impacts – and always SI units.`
});

BIQ("MAPE1300", 2, [
 ["Hvilken av formlene gjelder bare når akselerasjonen er konstant?",
  ["$v^2 = v_0^2 + 2as$", "$v = ds/dt$", "$a = dv/dt$", "$p = mv$"],
  "Definisjonene $v = ds/dt$ og $a = dv/dt$ gjelder alltid, og det gjør også $p = mv$. $v^2 = v_0^2 + 2as$ er utledet med konstant $a$.",
  "Which of these formulas holds only when the acceleration is constant?",
  ["$v^2 = v_0^2 + 2as$", "$v = ds/dt$", "$a = dv/dt$", "$p = mv$"],
  "The definitions $v = ds/dt$ and $a = dv/dt$ always hold, and so does $p = mv$. $v^2 = v_0^2 + 2as$ is derived assuming constant $a$."],
 ["En heis beveger seg oppover med konstant fart. Hvor stor er kraften i heisvaieren?",
  ["Lik tyngden av heisen med last", "Større enn tyngden", "Mindre enn tyngden", "Null"],
  "Konstant fart betyr null akselerasjon, altså $\\sum F = 0$: vaierkraften er lik tyngden. Den er større bare mens heisen akselererer oppover.",
  "An elevator moves upward at constant speed. How large is the force in the elevator cable?",
  ["Equal to the weight of the loaded elevator", "Greater than the weight", "Less than the weight", "Zero"],
  "Constant speed means zero acceleration, so $\\sum F = 0$: the cable force equals the weight. It is larger only while the elevator accelerates upward."],
 ["En ball kastes skrått oppover. Hva er akselerasjonen i det høyeste punktet av banen? (Se bort fra luftmotstand.)",
  ["$g$ rett nedover", "Null", "$g$ rett oppover", "Den peker langs farten"],
  "Tyngden virker hele tiden, så $a = g$ nedover i hele banen. I toppunktet er bare den vertikale farten null, ikke akselerasjonen.",
  "A ball is thrown upward at an angle. What is its acceleration at the highest point of the path? (Neglect air resistance.)",
  ["$g$ straight down", "Zero", "$g$ straight up", "It points along the velocity"],
  "Gravity acts all the time, so $a = g$ downward along the whole path. At the top only the vertical velocity is zero, not the acceleration."],
 ["En kloss på 5 kg ligger på et horisontalt bord med $\\mu_k = 0{,}2$. Den er koblet med en snor over en friksjonsfri trinse til et lodd på 3 kg som henger fritt. Hvor stor blir akselerasjonen? ($g = 9{,}81$ m/s²)",
  { n: 2.4525, tol: 0.03, u: "m/s²" },
  "Hele systemet: drivende kraft $3\\cdot 9{,}81 = 29{,}43$ N og friksjon $0{,}2\\cdot 5\\cdot 9{,}81 = 9{,}81$ N. Da er $a = \\dfrac{29{,}43 - 9{,}81}{5 + 3} \\approx 2{,}45$ m/s².",
  "A 5 kg block lies on a horizontal table with $\\mu_k = 0.2$. It is connected by a string over a frictionless pulley to a 3 kg weight hanging freely. What is the acceleration? ($g = 9.81$ m/s²)",
  null,
  "Whole system: driving force $3\\cdot 9.81 = 29.43$ N and friction $0.2\\cdot 5\\cdot 9.81 = 9.81$ N. Then $a = \\dfrac{29.43 - 9.81}{5 + 3} \\approx 2.45$ m/s²."]
]);

GEN("MAPE1300", 2,
 // enkel: kraft i heisvaier
 () => { const m = R.f(400, 1500, 50), a = R.f(0.5, 2, 0.1), up = R.p([true, false]), S = m * (G_ + (up ? a : -a)) / 1000;
   return [T(`En heis med last har massen ${nf(m)} kg og har en akselerasjon på ${nf(a)} m/s² rettet ${up ? "oppover" : "nedover"}. Hvor stor er kraften i vaieren? ($g = 9{,}81$ m/s²)`,
             `A loaded elevator has a mass of ${nf(m)} kg and an acceleration of ${nf(a)} m/s² directed ${up ? "upward" : "downward"}. How large is the force in the cable? ($g = 9.81$ m/s²)`),
     { n: S, tol: rel(S), u: "kN" },
     T(`Newton med positiv retning oppover: $S - mg = m\\cdot(${up ? "" : "-"}${mf(a)})$, så $S = ${mf(m)}\\cdot(9{,}81 ${up ? "+" : "-"} ${mf(a)}) \\approx ${mf(S * 1000, 0)}$ N $\\approx ${mf(S)}$ kN.`,
       `Newton with upward positive: $S - mg = m\\cdot(${up ? "" : "-"}${mf(a)})$, so $S = ${mf(m)}\\cdot(9.81 ${up ? "+" : "-"} ${mf(a)}) \\approx ${mf(S * 1000, 0)}$ N $\\approx ${mf(S)}$ kN.`)]; },
 // middels: kasse sklir ned rampe med friksjon
 () => { let th, mu; do { th = R.i(20, 45); mu = R.f(0.1, 0.45, 0.05); } while (Math.tan(th * DEG) - mu < 0.12);
   const s = R.f(2, 12, 0.5), k = Math.sin(th * DEG) - mu * Math.cos(th * DEG), v = Math.sqrt(2 * G_ * s * k);
   return [T(`En kasse slippes fra ro øverst på en rampe med helning ${th}° og lengde ${nf(s)} m. Kinetisk friksjonskoeffisient er $\\mu_k = ${mf(mu)}$. Hvor stor fart har kassen nederst? ($g = 9{,}81$ m/s²)`,
             `A crate is released from rest at the top of a ramp inclined at ${th}° with a length of ${nf(s)} m. The coefficient of kinetic friction is $\\mu_k = ${mf(mu)}$. What is the speed of the crate at the bottom? ($g = 9.81$ m/s²)`),
     { n: v, tol: rel(v), u: "m/s" },
     T(`Arbeid–energi: $\\tfrac12mv^2 = mg\\,s\\sin\\theta - \\mu_k mg\\cos\\theta\\,s$. Massen forkortes: $v = \\sqrt{2gs(\\sin\\theta - \\mu_k\\cos\\theta)} = \\sqrt{2\\cdot 9{,}81\\cdot ${mf(s)}\\cdot ${mf(k, 4)}} \\approx ${mf(v)}$ m/s.`,
       `Work–energy: $\\tfrac12mv^2 = mg\\,s\\sin\\theta - \\mu_k mg\\cos\\theta\\,s$. The mass cancels: $v = \\sqrt{2gs(\\sin\\theta - \\mu_k\\cos\\theta)} = \\sqrt{2\\cdot 9.81\\cdot ${mf(s)}\\cdot ${mf(k, 4)}} \\approx ${mf(v)}$ m/s.`)]; },
 // eksamen: ulykkesrekonstruksjon
 () => { const m1 = R.f(1000, 2200, 100), m2 = R.f(800, 2000, 100), s = R.f(4, 25, 0.5), mu = R.f(0.5, 0.8, 0.05);
   const v2 = Math.sqrt(2 * mu * G_ * s), v1 = v2 * (m1 + m2) / m1, kmh = v1 * 3.6;
   return [T(`En bil på ${nf(m1)} kg kjører inn i bakenden av en stillestående bil på ${nf(m2)} kg. Bilene henger sammen etter støtet og sklir ${nf(s)} m med låste hjul før de stopper ($\\mu_k = ${mf(mu)}$). Hvor stor fart hadde den første bilen like før støtet, i km/h? ($g = 9{,}81$ m/s²)`,
             `A car of ${nf(m1)} kg runs into the rear of a stationary car of ${nf(m2)} kg. The cars stick together after the impact and skid ${nf(s)} m with locked wheels before stopping ($\\mu_k = ${mf(mu)}$). What was the speed of the first car just before the impact, in km/h? ($g = 9.81$ m/s²)`),
     { n: kmh, tol: rel(kmh), u: "km/h" },
     T(`Etter støtet: friksjonen bremser, $v' = \\sqrt{2\\mu_k g s} = \\sqrt{2\\cdot ${mf(mu)}\\cdot 9{,}81\\cdot ${mf(s)}} \\approx ${mf(v2)}$ m/s. Støtet: bevegelsesmengden er bevart, $m_1v_1 = (m_1 + m_2)v'$, så $v_1 = ${mf(v2)}\\cdot ${mf(m1 + m2)}/${mf(m1)} \\approx ${mf(v1)}$ m/s $\\approx ${mf(kmh, 1)}$ km/h.`,
       `After the impact: friction brakes the wreck, $v' = \\sqrt{2\\mu_k g s} = \\sqrt{2\\cdot ${mf(mu)}\\cdot 9.81\\cdot ${mf(s)}} \\approx ${mf(v2)}$ m/s. The impact: momentum is conserved, $m_1v_1 = (m_1 + m_2)v'$, so $v_1 = ${mf(v2)}\\cdot ${mf(m1 + m2)}/${mf(m1)} \\approx ${mf(v1)}$ m/s $\\approx ${mf(kmh, 1)}$ km/h.`)]; }
);

// ================= MAPE1300 – enhet 3: Bøyning av bjelker =================
THEORY("MAPE1300", 3, {
nb: `## Hva handler det om?
En bjelke bærer last på tvers av lengderetningen: gulvbjelker, kranbaner, aksler og brudekker. For å dimensjonere den må du vite hvor store de indre kreftene er, og hvor de er størst. Snitter du bjelken i et punkt $x$, må snittet overføre en **skjærkraft** $V$ (på tvers) og et **bøyemoment** $M$ for at hver del skal være i likevekt. Diagrammene for $V(x)$ og $M(x)$ viser hvor bjelken er hardest belastet – der momentet er størst, blir bøyespenningen størst.

## Begreper og formler
- Fortegn (vanlig konvensjon): $M$ er positivt når undersiden av bjelken får strekk, slik at bjelken «smiler».
- Sammenhenger: $dV/dx = -q$ og $dM/dx = V$. Momentet har maks eller min der $V = 0$.
- Punktlast gir sprang i $V$ og knekk i $M$. Jevnt fordelt last gir lineær $V$ og parabelformet $M$.
- Fritt opplagt, punktlast $P$ midt på: $M_{maks} = PL/4$ og $\\delta = PL^3/(48EI)$.
- Fritt opplagt, punktlast i avstand $a$ fra A og $b$ fra B: $M_{maks} = Pab/L$ under lasten.
- Fritt opplagt, jevn last $q$: $M_{maks} = qL^2/8$ midt på og $\\delta = 5qL^4/(384EI)$.
- Utkraget, punktlast $P$ ytterst: $M_{maks} = PL$ ved innspenningen og $\\delta = PL^3/(3EI)$.
- Utkraget, jevn last $q$: $M_{maks} = qL^2/2$ og $\\delta = qL^4/(8EI)$.
- Bøyespenning: $\\sigma = M/W$, der $W = I/y_{maks}$. For et rektangel er $I = bh^3/12$ og $W = bh^2/6$.
- Superposisjon: for lineært elastiske bjelker kan bidrag fra flere laster legges sammen.

## Slik løser du oppgavene
1. Finn opplagerkreftene med likevekt.
2. Snitt bjelken i avstanden $x$ og sett opp likevekt for den venstre delen. Det gir $V(x)$ og $M(x)$.
3. Gjenta for hvert område mellom laster og opplagre, eller bruk at arealet under $V$-diagrammet er endringen i $M$.
4. Finn største $|M|$: der $V$ skifter fortegn, under punktlaster eller ved innspenningen.
5. Regn eventuelt spenning $\\sigma = M/W$ eller nedbøyning med tabellformlene. Bruk N og mm konsekvent, med $E$ i N/mm² (MPa).

### Eksempel
En fritt opplagt bjelke med lengde $L = 6$ m har jevnt fordelt last $q = 5$ kN/m. Finn $V(x)$, $M(x)$ og største moment.
1. Total last er $qL = 30$ kN, så $A = B = 15$ kN.
2. Snitt i $x$: $V(x) = 15 - 5x$ kN og $M(x) = 15x - 2{,}5x^2$ kNm.
3. $V = 0$ gir $x = 3$ m, altså midt på.
4. $M_{maks} = 15\\cdot 3 - 2{,}5\\cdot 3^2 = 22{,}5$ kNm, som stemmer med $qL^2/8 = 5\\cdot 36/8 = 22{,}5$ kNm.
5. I $x = 2$ m er $M = 30 - 10 = 20$ kNm. Momentet avtar mot opplagrene og er null der.

Svar: $M_{maks} = 22{,}5$ kNm midt på bjelken.

## Vanlige feil
- Å bruke $qL^2/8$ for en utkragerbjelke (der er det $qL^2/2$), eller $PL/4$ når lasten ikke står midt på.
- Å blande kN, m og mm. I $\\delta = PL^3/(48EI)$ må alt være i N og mm (eller N og m).
- Å glemme at momentet ved et fritt, ubelastet endeopplager er null.
- Å tro at største moment alltid er midt på. Det er der $V = 0$.

> $dM/dx = V$: momentet er størst der skjærkraften skifter fortegn, og null ved frie ender og leddede endeopplagre.`,
en: `## What is it about?
A beam carries load transverse to its length: floor joists, crane runways, shafts and bridge decks. To size it you need to know how large the internal forces are and where they peak. If you cut the beam at a point $x$, the cut must transmit a **shear force** $V$ (across the beam) and a **bending moment** $M$ for each part to stay in equilibrium. The diagrams of $V(x)$ and $M(x)$ show where the beam is loaded hardest – where the moment is largest, the bending stress is largest.

## Concepts and formulas
- Sign convention (common): $M$ is positive when the bottom of the beam is in tension, so the beam "smiles".
- Relations: $dV/dx = -q$ and $dM/dx = V$. The moment has a maximum or minimum where $V = 0$.
- A point load gives a jump in $V$ and a kink in $M$. A uniform load gives a linear $V$ and a parabolic $M$.
- Simply supported, point load $P$ at midspan: $M_{max} = PL/4$ and $\\delta = PL^3/(48EI)$.
- Simply supported, point load at distance $a$ from A and $b$ from B: $M_{max} = Pab/L$ under the load.
- Simply supported, uniform load $q$: $M_{max} = qL^2/8$ at midspan and $\\delta = 5qL^4/(384EI)$.
- Cantilever, point load $P$ at the tip: $M_{max} = PL$ at the fixed end and $\\delta = PL^3/(3EI)$.
- Cantilever, uniform load $q$: $M_{max} = qL^2/2$ and $\\delta = qL^4/(8EI)$.
- Bending stress: $\\sigma = M/W$, where $W = I/y_{max}$. For a rectangle $I = bh^3/12$ and $W = bh^2/6$.
- Superposition: for linear elastic beams the effects of several loads can be added.

## How to solve the problems
1. Find the support reactions from equilibrium.
2. Cut the beam at distance $x$ and write equilibrium for the left part. This gives $V(x)$ and $M(x)$.
3. Repeat for each segment between loads and supports, or use the fact that the area under the $V$ diagram equals the change in $M$.
4. Find the largest $|M|$: where $V$ changes sign, under point loads or at the fixed end.
5. If needed, compute the stress $\\sigma = M/W$ or the deflection from the table formulas. Use N and mm consistently, with $E$ in N/mm² (MPa).

### Example
A simply supported beam of length $L = 6$ m carries a uniform load $q = 5$ kN/m. Find $V(x)$, $M(x)$ and the maximum moment.
1. The total load is $qL = 30$ kN, so $A = B = 15$ kN.
2. Cut at $x$: $V(x) = 15 - 5x$ kN and $M(x) = 15x - 2.5x^2$ kNm.
3. $V = 0$ gives $x = 3$ m, at midspan.
4. $M_{max} = 15\\cdot 3 - 2.5\\cdot 3^2 = 22.5$ kNm, which matches $qL^2/8 = 5\\cdot 36/8 = 22.5$ kNm.
5. At $x = 2$ m, $M = 30 - 10 = 20$ kNm. The moment decreases toward the supports and is zero there.

Answer: $M_{max} = 22.5$ kNm at midspan.

## Common mistakes
- Using $qL^2/8$ for a cantilever (it is $qL^2/2$ there), or $PL/4$ when the load is not at midspan.
- Mixing kN, m and mm. In $\\delta = PL^3/(48EI)$ everything must be in N and mm (or N and m).
- Forgetting that the moment at a free, unloaded end support is zero.
- Believing the maximum moment is always at midspan. It is where $V = 0$.

> $dM/dx = V$: the moment peaks where the shear force changes sign, and it is zero at free ends and pinned end supports.`
});

BIQ("MAPE1300", 3, [
 ["Hvor stort er bøyemomentet i den frie enden av en utkragerbjelke (uten punktmoment der)?",
  ["Null", "Størst i hele bjelken", "$PL$", "Lik skjærkraften ved innspenningen"],
  "Det finnes ingen last utenfor et snitt helt ytterst som kan gi moment. Momentet vokser inn mot innspenningen, der det er størst.",
  "What is the bending moment at the free end of a cantilever (with no applied couple there)?",
  ["Zero", "The largest in the beam", "$PL$", "Equal to the shear force at the fixed end"],
  "There is no load beyond a cut at the very tip that could produce a moment. The moment grows toward the fixed end, where it is largest."],
 ["En fritt opplagt bjelke med lengde $L$ har en punktlast $P$ i avstand $a$ fra A og $b$ fra B. Hva er største bøyemoment?",
  ["$Pab/L$ under lasten", "$PL/4$ midt på", "$Pa$ ved opplager A", "$Pab/L^2$ under lasten"],
  "$R_A = Pb/L$, og momentet under lasten er $R_A\\cdot a = Pab/L$. Med $a = b = L/2$ blir det $PL/4$.",
  "A simply supported beam of length $L$ carries a point load $P$ at distance $a$ from A and $b$ from B. What is the maximum bending moment?",
  ["$Pab/L$ under the load", "$PL/4$ at midspan", "$Pa$ at support A", "$Pab/L^2$ under the load"],
  "$R_A = Pb/L$, and the moment under the load is $R_A\\cdot a = Pab/L$. With $a = b = L/2$ it becomes $PL/4$."],
 ["En planke på 50 × 200 mm ligger flatt som bjelke. Hva skjer med arealtreghetsmomentet $I$ hvis du snur den på høykant?",
  ["Det blir 16 ganger større", "Det blir 4 ganger større", "Det dobles", "Det er uendret, fordi arealet er det samme"],
  "$I = bh^3/12$. Flatt: $200\\cdot 50^3/12$. På høykant: $50\\cdot 200^3/12$. Forholdet er $(200/50)^2 = 16$, så nedbøyningen blir 16 ganger mindre.",
  "A 50 × 200 mm plank lies flat as a beam. What happens to the second moment of area $I$ if you turn it on edge?",
  ["It becomes 16 times larger", "It becomes 4 times larger", "It doubles", "It is unchanged, because the area is the same"],
  "$I = bh^3/12$. Flat: $200\\cdot 50^3/12$. On edge: $50\\cdot 200^3/12$. The ratio is $(200/50)^2 = 16$, so the deflection becomes 16 times smaller."],
 ["En fritt opplagt stålbjelke ($E = 210$ GPa, $I = 8{,}356\\cdot10^7$ mm⁴) har lengde 6 m og jevnt fordelt last 10 kN/m. Hvor stor er nedbøyningen midt på?",
  { n: 9.617, tol: 0.1, u: "mm" },
  "Med N og mm: $q = 10$ N/mm og $L = 6000$ mm. $\\delta = \\dfrac{5qL^4}{384EI} = \\dfrac{5\\cdot 10\\cdot 6000^4}{384\\cdot 210\\,000\\cdot 8{,}356\\cdot10^7} \\approx 9{,}62$ mm. Det tilsvarer $L/624$.",
  "A simply supported steel beam ($E = 210$ GPa, $I = 8.356\\cdot10^7$ mm⁴) has a length of 6 m and a uniform load of 10 kN/m. What is the deflection at midspan?",
  null,
  "In N and mm: $q = 10$ N/mm and $L = 6000$ mm. $\\delta = \\dfrac{5qL^4}{384EI} = \\dfrac{5\\cdot 10\\cdot 6000^4}{384\\cdot 210\\,000\\cdot 8.356\\cdot10^7} \\approx 9.62$ mm. That corresponds to $L/624$."]
]);

GEN("MAPE1300", 3,
 // enkel: utkrager med jevn last
 () => { const q = R.f(1, 20, 0.5), L = R.f(0.5, 4, 0.5), M = q * L * L / 2;
   return [T(`En utkragerbjelke er ${nf(L)} m lang og har en jevnt fordelt last på ${nf(q)} kN/m. Hvor stort er bøyemomentet ved innspenningen?`,
             `A cantilever beam is ${nf(L)} m long and carries a uniform load of ${nf(q)} kN/m. What is the bending moment at the fixed end?`),
     { n: M, tol: rel(M), u: "kNm" },
     T(`Resultanten $qL$ virker midt på, i $L/2$ fra innspenningen: $M = qL^2/2 = ${mf(q)}\\cdot ${mf(L)}^2/2 \\approx ${mf(M)}$ kNm.`,
       `The resultant $qL$ acts at the middle, $L/2$ from the fixed end: $M = qL^2/2 = ${mf(q)}\\cdot ${mf(L)}^2/2 \\approx ${mf(M)}$ kNm.`)]; },
 // middels: punktlast utenfor midten
 () => { const L = R.i(4, 12), a = R.i(1, L - 1), b = L - a, P = R.f(5, 60, 1), RA = P * b / L, M = P * a * b / L;
   return [T(`En fritt opplagt bjelke A–B er ${L} m lang og har en punktlast på ${nf(P)} kN i ${a} m fra A. Hva er største bøyemoment i bjelken?`,
             `A simply supported beam A–B is ${L} m long and carries a point load of ${nf(P)} kN at ${a} m from A. What is the maximum bending moment in the beam?`),
     { n: M, tol: rel(M), u: "kNm" },
     T(`$R_A = Pb/L = ${mf(P)}\\cdot ${b}/${L} \\approx ${mf(RA)}$ kN. Største moment er under lasten: $M = R_A\\cdot a = \\dfrac{Pab}{L} \\approx ${mf(M)}$ kNm.`,
       `$R_A = Pb/L = ${mf(P)}\\cdot ${b}/${L} \\approx ${mf(RA)}$ kN. The maximum moment is under the load: $M = R_A\\cdot a = \\dfrac{Pab}{L} \\approx ${mf(M)}$ kNm.`)]; },
 // eksamen: IPE-bjelke med jevn last og punktlast, bøyespenning
 () => { const PR = [["IPE 200", 194], ["IPE 240", 324], ["IPE 270", 429], ["IPE 300", 557], ["IPE 360", 904]];
   let L, q, P, M, pr, sig;
   do { L = R.f(3, 8, 0.5); q = R.f(2, 12, 0.5); P = R.f(5, 40, 1); M = q * L * L / 8 + P * L / 4; pr = PR.find(p => M * 1e3 / p[1] < 235); } while (!pr || M * 1e3 / pr[1] < 60);
   sig = M * 1e3 / pr[1];
   return [T(`En fritt opplagt stålbjelke (${pr[0]}, $W = ${pr[1]}\\cdot10^3$ mm³) har spennvidde ${nf(L)} m. Den bærer en jevnt fordelt last på ${nf(q)} kN/m (inkludert egenvekt) og en punktlast på ${nf(P)} kN midt på. Hva er største bøyespenning?`,
             `A simply supported steel beam (${pr[0]}, $W = ${pr[1]}\\cdot10^3$ mm³) spans ${nf(L)} m. It carries a uniform load of ${nf(q)} kN/m (including self-weight) and a point load of ${nf(P)} kN at midspan. What is the maximum bending stress?`),
     { n: sig, tol: rel(sig), u: "MPa" },
     T(`Begge lastene gir størst moment midt på, så bidragene kan legges sammen: $M = qL^2/8 + PL/4 = ${mf(q * L * L / 8)} + ${mf(P * L / 4)} = ${mf(M)}$ kNm. $\\sigma = M/W = ${mf(M)}\\cdot10^6/(${pr[1]}\\cdot10^3) \\approx ${mf(sig, 1)}$ MPa.`,
       `Both loads give their maximum moment at midspan, so the contributions can be added: $M = qL^2/8 + PL/4 = ${mf(q * L * L / 8)} + ${mf(P * L / 4)} = ${mf(M)}$ kNm. $\\sigma = M/W = ${mf(M)}\\cdot10^6/(${pr[1]}\\cdot10^3) \\approx ${mf(sig, 1)}$ MPa.`)]; }
);

// ================= FAST – enhet 0: Spenning og tøyning =================
THEORY("FAST", 0, {
nb: `## Hva handler det om?
Fasthetslære handler om hvordan materialer oppfører seg når de belastes: hvor stor spenning som oppstår inni materialet, og hvor mye det deformeres. Mens statikken i MAPE1300 finner de ytre kreftene og opplagerkreftene, går fasthetslæren videre og spør om materialet faktisk tåler dem. Dette er grunnlaget for å dimensjonere staver, wire, bolter og aksler slik at de verken flyter eller går i brudd.

Det enkleste og viktigste tilfellet er en rett stav belastet med en aksiell kraft: kraften er (tilnærmet) jevnt fordelt over tverrsnittet, og sammenhengen mellom spenning og tøyning er lineær helt til materialet begynner å flyte.

## Begreper og formler
- Normalspenning: $\\sigma = F/A$, målt i N/mm² = MPa.
- Tøyning: $\\varepsilon = \\Delta L/L$ (dimensjonsløs, ofte oppgitt i promille).
- Hookes lov i det elastiske området: $\\sigma = E\\varepsilon$.
- Forlengelse: $\\delta = \\dfrac{FL}{AE}$.
- Skjærspenning $\\tau = F/A$ (kraften virker parallelt med snittflaten) og skjærtøyning $\\gamma$, med $\\tau = G\\gamma$.
- Sammenheng mellom E-modul, skjærmodul og Poissons tall: $G = \\dfrac{E}{2(1+\\nu)}$.
- Termisk tøyning: $\\varepsilon_T = \\alpha\\Delta T$. Kan staven utvide seg fritt, blir spenningen null. Er den fasthold i begge ender, oppstår $\\sigma = E\\alpha\\Delta T$.
- Flytegrense $R_e$, strekkfasthet $R_m$ og sikkerhetsfaktor $n = R_e/\\sigma$.

## Slik løser du oppgavene
1. Finn tverrsnittsarealet $A$ og den aksielle kraften $F$ som virker i snittet.
2. Regn normalspenningen $\\sigma = F/A$, og sammenlign med $R_e/n$ hvis du skal vurdere sikkerhet.
3. Finn tøyningen $\\varepsilon = \\sigma/E$ og forlengelsen $\\delta = \\varepsilon L$.
4. Ved temperaturendring: avgjør først om staven kan utvide seg fritt (ingen spenning) eller er fasthold (spenning $E\\alpha\\Delta T$).
5. Består staven av flere segmenter (ulik lengde, areal eller materiale), regn forlengelsen til hvert segment for seg og summer dem.

### Eksempel
En stålstav med diameter 12 mm og lengde 800 mm belastes med 15 kN strekk. $E = 210$ GPa. Finn spenning, tøyning og forlengelse.
1. Areal: $A = \\pi(6\\text{ mm})^2 \\approx 113{,}1$ mm².
2. Spenning: $\\sigma = F/A = 15\\,000/113{,}1 \\approx 132{,}6$ MPa.
3. Tøyning: $\\varepsilon = \\sigma/E = 132{,}6/210\\,000 \\approx 0{,}632$ ‰.
4. Forlengelse: $\\delta = \\varepsilon L \\approx 0{,}000632\\cdot 800 \\approx 0{,}505$ mm.

Svar: $\\sigma \\approx 132{,}6$ MPa, $\\varepsilon \\approx 0{,}632$ ‰ og $\\delta \\approx 0{,}505$ mm.

## Vanlige feil
- Å tro at en fritt bevegelig stav får termisk spenning når den varmes opp. Den får bare spenning når utvidelsen hindres.
- Å blande mm og m, eller GPa og MPa, i samme uttrykk.
- Å bruke radius når oppgaven oppgir diameter (eller omvendt) i arealformelen $A = \\pi d^2/4$.
- Å bruke Hookes lov ($\\sigma = E\\varepsilon$) for spenninger over flytegrensen, der den ikke lenger gjelder.

> $\\sigma = F/A$, $\\varepsilon = \\sigma/E$ og $\\delta = FL/(AE)$ – og termisk spenning oppstår bare når utvidelsen hindres.`,
en: `## What is it about?
Strength of materials is about how materials behave under load: how much stress builds up inside the material, and how much it deforms. While statics in MAPE1300 finds the external forces and the support reactions, strength of materials goes further and asks whether the material can actually withstand them. This is the foundation for sizing rods, wires, bolts and shafts so that they neither yield nor fracture.

The simplest and most important case is a straight bar loaded by an axial force: the force is (approximately) evenly distributed over the cross-section, and the relationship between stress and strain is linear until the material starts to yield.

## Concepts and formulas
- Normal stress: $\\sigma = F/A$, measured in N/mm² = MPa.
- Strain: $\\varepsilon = \\Delta L/L$ (dimensionless, often given in permille).
- Hooke's law in the elastic range: $\\sigma = E\\varepsilon$.
- Elongation: $\\delta = \\dfrac{FL}{AE}$.
- Shear stress $\\tau = F/A$ (the force acts parallel to the cut surface) and shear strain $\\gamma$, with $\\tau = G\\gamma$.
- Relation between Young's modulus, shear modulus and Poisson's ratio: $G = \\dfrac{E}{2(1+\\nu)}$.
- Thermal strain: $\\varepsilon_T = \\alpha\\Delta T$. If the bar can expand freely, the stress is zero. If it is restrained at both ends, $\\sigma = E\\alpha\\Delta T$ appears.
- Yield strength $R_e$, tensile strength $R_m$ and safety factor $n = R_e/\\sigma$.

## How to solve the problems
1. Find the cross-sectional area $A$ and the axial force $F$ acting at the section.
2. Compute the normal stress $\\sigma = F/A$, and compare it with $R_e/n$ if you are checking safety.
3. Find the strain $\\varepsilon = \\sigma/E$ and the elongation $\\delta = \\varepsilon L$.
4. For a temperature change: decide first whether the bar can expand freely (no stress) or is restrained (stress $E\\alpha\\Delta T$).
5. If the bar has several segments (different length, area or material), compute each segment's elongation separately and add them.

### Example
A steel bar with a diameter of 12 mm and a length of 800 mm carries 15 kN in tension. $E = 210$ GPa. Find the stress, strain and elongation.
1. Area: $A = \\pi(6\\text{ mm})^2 \\approx 113.1$ mm².
2. Stress: $\\sigma = F/A = 15,000/113.1 \\approx 132.6$ MPa.
3. Strain: $\\varepsilon = \\sigma/E = 132.6/210,000 \\approx 0.632$ ‰.
4. Elongation: $\\delta = \\varepsilon L \\approx 0.000632\\cdot 800 \\approx 0.505$ mm.

Answer: $\\sigma \\approx 132.6$ MPa, $\\varepsilon \\approx 0.632$ ‰ and $\\delta \\approx 0.505$ mm.

## Common mistakes
- Believing a freely moving bar develops thermal stress when heated. It only develops stress when the expansion is prevented.
- Mixing mm and m, or GPa and MPa, in the same expression.
- Using the radius when the problem gives the diameter (or the reverse) in the area formula $A = \\pi d^2/4$.
- Using Hooke's law ($\\sigma = E\\varepsilon$) for stresses above the yield strength, where it no longer holds.

> $\\sigma = F/A$, $\\varepsilon = \\sigma/E$ and $\\delta = FL/(AE)$ – and thermal stress only appears when the expansion is prevented.`
});

BIQ("FAST", 0, [
 ["En stålwire med diameter 8 mm belastes med 12 kN strekk. Hvor stor er normalspenningen?",
  { n: 238.73, tol: 2.4, u: "MPa" },
  "$A = \\pi\\cdot 4^2 \\approx 50{,}27$ mm². $\\sigma = F/A = 12\\,000\\text{ N}/50{,}27\\text{ mm}^2 \\approx 238{,}7$ MPa.",
  "A steel wire with a diameter of 8 mm carries a tensile force of 12 kN. What is the normal stress?",
  null,
  "$A = \\pi\\cdot 4^2 \\approx 50.27$ mm². $\\sigma = F/A = 12,000\\text{ N}/50.27\\text{ mm}^2 \\approx 238.7$ MPa."],
 ["En stav kan utvide seg helt fritt i lengderetningen (ingen ende er fasthold). Den varmes opp 50 K. Hvor stor blir den termiske spenningen i staven?",
  ["Null, siden staven ikke er hindret i å utvide seg", "$\\sigma = E\\alpha\\Delta T$", "Uendelig stor", "Avhenger av tverrsnittsarealet"],
  "Termisk spenning oppstår bare når utvidelsen hindres. En fritt bevegelig stav forlenger seg uten motstand, så spenningen er null uansett hvor mye temperaturen øker.",
  "A bar can expand completely freely along its length (neither end is restrained). It is heated by 50 K. How large is the thermal stress in the bar?",
  ["Zero, since the bar is not prevented from expanding", "$\\sigma = E\\alpha\\Delta T$", "Infinitely large", "It depends on the cross-sectional area"],
  "Thermal stress only appears when the expansion is prevented. A freely moving bar lengthens without resistance, so the stress is zero no matter how much the temperature rises."],
 ["To staver av samme materiale og lengde belastes med samme kraft $F$. Stav 2 har dobbelt så stort tverrsnittsareal som stav 1. Hvordan forholder forlengelsene seg?",
  ["$\\delta_1 = 2\\delta_2$", "$\\delta_1 = \\delta_2$", "$\\delta_1 = 4\\delta_2$", "$\\delta_1 = 0{,}5\\delta_2$"],
  "Forlengelsen $\\delta = FL/(AE)$ er omvendt proporsjonal med arealet. Dobbelt så stort areal gir halvparten så stor forlengelse, så $\\delta_1 = 2\\delta_2$.",
  "Two bars of the same material and length carry the same force $F$. Bar 2 has twice the cross-sectional area of bar 1. How do the elongations compare?",
  ["$\\delta_1 = 2\\delta_2$", "$\\delta_1 = \\delta_2$", "$\\delta_1 = 4\\delta_2$", "$\\delta_1 = 0.5\\delta_2$"],
  "The elongation $\\delta = FL/(AE)$ is inversely proportional to the area. Twice the area gives half the elongation, so $\\delta_1 = 2\\delta_2$."],
 ["En stålbolt ($E = 210$ GPa, $\\alpha = 12\\cdot10^{-6}$/K) strammes mellom to stive plater til en strekkspenning på 150 MPa. Platene hindrer all videre lengdeendring. Deretter varmes bolten opp 45 K. Hvor stor er den totale spenningen i bolten?",
  { n: 263.4, tol: 2.7, u: "MPa" },
  "Oppvarmingen vil forlenge bolten, men platene hindrer det, så det kommer et tillegg $\\Delta\\sigma = E\\alpha\\Delta T = 210\\,000\\cdot 12\\cdot10^{-6}\\cdot 45 \\approx 113{,}4$ MPa. Total spenning: $\\sigma = 150 + 113{,}4 \\approx 263{,}4$ MPa.",
  "A steel bolt ($E = 210$ GPa, $\\alpha = 12\\cdot10^{-6}$/K) is tightened between two rigid plates to a tensile stress of 150 MPa. The plates prevent any further change in length. It is then heated by 45 K. What is the total stress in the bolt?",
  null,
  "The heating would lengthen the bolt, but the plates prevent that, adding $\\Delta\\sigma = E\\alpha\\Delta T = 210\\,000\\cdot 12\\cdot10^{-6}\\cdot 45 \\approx 113.4$ MPa. Total stress: $\\sigma = 150 + 113.4 \\approx 263.4$ MPa."]
]);

GEN("FAST", 0,
 // enkel: tøyning fra spenning og E
 () => { const mat = R.p([["stål", "steel", 210000], ["aluminium", "aluminium", 70000], ["kobber", "copper", 120000]]);
   const sig = R.f(40, 300, 5), E = mat[2], eps = sig / E * 1000;
   return [T(`En stav av ${mat[0]} ($E = ${nf(E / 1000)}$ GPa) har en spenning på ${nf(sig)} MPa. Hvor stor er tøyningen, i promille?`,
             `A bar of ${mat[1]} ($E = ${nf(E / 1000)}$ GPa) has a stress of ${nf(sig)} MPa. What is the strain, in permille?`),
     { n: eps, tol: rel(eps), u: "‰" },
     T(`$\\varepsilon = \\sigma/E = ${mf(sig)}\\text{ MPa}/${mf(E)}\\text{ MPa} \\approx ${mf(eps, 3)}$ ‰.`,
       `$\\varepsilon = \\sigma/E = ${mf(sig)}\\text{ MPa}/${mf(E)}\\text{ MPa} \\approx ${mf(eps, 3)}$ ‰.`)]; },
 // middels: skjærspenning i bolt (enkelt skjær)
 () => { const d = R.p([8, 10, 12, 16, 20, 24]); const A = Math.PI * d * d / 4;
   const F = R.f(0.08 * d * d, 0.35 * d * d, 0.5), tau = F * 1000 / A;
   return [T(`En bolt med diameter ${d} mm holder en forbindelse i enkelt (rent) skjær og belastes med ${nf(F)} kN. Hvor stor er skjærspenningen i bolten?`,
             `A bolt with a diameter of ${d} mm holds a joint in single (pure) shear and carries a load of ${nf(F)} kN. What is the shear stress in the bolt?`),
     { n: tau, tol: rel(tau), u: "MPa" },
     T(`Tverrsnittsarealet er $A = \\pi d^2/4 = \\pi\\cdot ${d}^2/4 \\approx ${mf(A, 1)}$ mm². Skjærspenningen er $\\tau = F/A = ${mf(F * 1000, 0)}\\text{ N}/${mf(A, 1)}\\text{ mm}^2 \\approx ${mf(tau, 1)}$ MPa.`,
       `The cross-sectional area is $A = \\pi d^2/4 = \\pi\\cdot ${d}^2/4 \\approx ${mf(A, 1)}$ mm². The shear stress is $\\tau = F/A = ${mf(F * 1000, 0)}\\text{ N}/${mf(A, 1)}\\text{ mm}^2 \\approx ${mf(tau, 1)}$ MPa.`)]; },
 // eksamen: stav i to segmenter, total forlengelse
 () => { const d1 = R.f(14, 28, 1), d2 = R.f(8, d1 - 4, 1), L1 = R.f(0.2, 0.6, 0.05), L2 = R.f(0.2, 0.6, 0.05);
   const F = R.f(8, 35, 1), E = R.p([200000, 210000]);
   const A1 = Math.PI * d1 * d1 / 4, A2 = Math.PI * d2 * d2 / 4;
   const d1el = F * 1000 * (L1 * 1000) / (A1 * E), d2el = F * 1000 * (L2 * 1000) / (A2 * E), tot = d1el + d2el;
   return [T(`En stålaksel ($E = ${nf(E / 1000)}$ GPa) består av to deler etter hverandre: del 1 har diameter ${nf(d1)} mm og lengde ${nf(L1)} m, del 2 har diameter ${nf(d2)} mm og lengde ${nf(L2)} m. Hele akselen belastes med en aksialkraft på ${nf(F)} kN strekk. Hvor stor er den totale forlengelsen?`,
             `A steel shaft ($E = ${nf(E / 1000)}$ GPa) is made of two parts in a row: part 1 has a diameter of ${nf(d1)} mm and a length of ${nf(L1)} m, part 2 has a diameter of ${nf(d2)} mm and a length of ${nf(L2)} m. The whole shaft carries an axial tensile force of ${nf(F)} kN. What is the total elongation?`),
     { n: tot, tol: rel(tot), u: "mm" },
     T(`$A_1 = \\pi\\cdot ${mf(d1 / 2, 3)}^2 \\approx ${mf(A1, 1)}$ mm² og $A_2 = \\pi\\cdot ${mf(d2 / 2, 3)}^2 \\approx ${mf(A2, 1)}$ mm². Forlengelsen i hver del: $\\delta_1 = FL_1/(A_1E) \\approx ${mf(d1el, 3)}$ mm og $\\delta_2 = FL_2/(A_2E) \\approx ${mf(d2el, 3)}$ mm. Total forlengelse: $\\delta = \\delta_1 + \\delta_2 \\approx ${mf(tot, 3)}$ mm.`,
       `$A_1 = \\pi\\cdot ${mf(d1 / 2, 3)}^2 \\approx ${mf(A1, 1)}$ mm² and $A_2 = \\pi\\cdot ${mf(d2 / 2, 3)}^2 \\approx ${mf(A2, 1)}$ mm². The elongation of each part: $\\delta_1 = FL_1/(A_1E) \\approx ${mf(d1el, 3)}$ mm and $\\delta_2 = FL_2/(A_2E) \\approx ${mf(d2el, 3)}$ mm. Total elongation: $\\delta = \\delta_1 + \\delta_2 \\approx ${mf(tot, 3)}$ mm.`)]; }
);

// ================= FAST – enhet 1: Torsjon og bøyning =================
THEORY("FAST", 1, {
nb: `## Hva handler det om?
Aksler overfører moment ved å vris (torsjon), og bjelker overfører tverrlast ved å bøyes. Begge deler gir spenninger som IKKE er jevnt fordelt over tverrsnittet, i motsetning til den rene strekk-/trykkspenningen fra forrige enhet: spenningen er null i et sentralt punkt (senteret i torsjon, nøytralaksen i bøyning) og størst lengst unna. Det er nettopp derfor formen på tverrsnittet betyr så mye for hvor stivt og sterkt en aksel eller bjelke blir.

## Begreper og formler
- Torsjon i en sirkulær aksel: skjærspenningen er lineær med avstanden fra senteret, $\\tau = \\dfrac{Tr}{J}$, størst i overflaten: $\\tau_{maks} = \\dfrac{T(d/2)}{J} = \\dfrac{16T}{\\pi d^3}$.
- Polart arealtreghetsmoment for massiv sirkulær aksel: $J = \\dfrac{\\pi d^4}{32}$. For hul aksel (ytre $D$, indre $d$): $J = \\dfrac{\\pi(D^4-d^4)}{32}$.
- Vridningsvinkel over lengden $L$: $\\theta = \\dfrac{TL}{GJ}$ (radianer).
- Bøyespenning i avstand $y$ fra nøytralaksen: $\\sigma = \\dfrac{My}{I}$, størst i ytterfiberen: $\\sigma_{maks} = M/W$, med $W = I/y_{maks}$.
- Skjærspenning i en bjelke under bøyning er størst i nøytralaksen (for rektangel: $\\tau_{maks} = 1{,}5V/A$), ikke i ytterfibrene der bøyespenningen er størst.
- Effekt og moment: $P = T\\omega$, der $\\omega$ er vinkelhastigheten i rad/s.

## Slik løser du oppgavene
1. Torsjon: finn $J$ for tverrsnittet, regn $\\tau_{maks}$ i overflaten og eventuelt $\\theta$ over den aktuelle lengden.
2. Bøyning: finn $I$ for tverrsnittet og avstanden $y_{maks}$ til ytterfiberen (eller bruk $W$ direkte), regn $\\sigma_{maks} = M/W$.
3. Ved dimensjonering (finn nødvendig diameter): snu formelen om, for eksempel $d = \\sqrt[3]{16T/(\\pi\\tau_{tillatt})}$.
4. Hold styr på enheter: bruk N og mm konsekvent, så blir $\\sigma$ og $\\tau$ direkte i MPa.
5. Kontroller at svaret er rimelig: skjærspenningen er null i senteret av en aksel og null på nøytralaksen i bøyning, størst i overflaten/ytterfiberen.

### Eksempel
En massiv stålaksel ($G = 80$ GPa) har diameter 50 mm og lengde 1,5 m. Den overfører et vridningsmoment på 800 Nm. Finn maksimal skjærspenning og vridningsvinkelen.
1. Polart arealtreghetsmoment: $J = \\pi\\cdot 50^4/32 \\approx 613\\,592$ mm⁴.
2. Maksimal skjærspenning: $\\tau_{maks} = T(d/2)/J = 800\\,000\\cdot 25/613\\,592 \\approx 32{,}6$ MPa.
3. Vridningsvinkel: $\\theta = TL/(GJ) = 800\\,000\\cdot 1500/(80\\,000\\cdot 613\\,592) \\approx 0{,}0244$ rad $\\approx 1{,}40^\\circ$.

Svar: $\\tau_{maks} \\approx 32{,}6$ MPa og $\\theta \\approx 1{,}40^\\circ$.

## Vanlige feil
- Å bruke $J = \\pi d^4/64$ (det er $I$, arealtreghetsmomentet om en diameter) i stedet for $J = \\pi d^4/32$ i torsjonsformelen.
- Å tro at skjærspenningen i torsjon er størst i senteret. Den er null der og størst i overflaten.
- Å tro at bøyespenningen er størst i nøytralaksen. Det er omvendt: $\\sigma = 0$ i nøytralaksen, størst i ytterfiberen.
- Å blande grader og radianer i $\\theta = TL/(GJ)$ – formelen gir radianer.
- Å glemme at doble diameteren gir 16 ganger så stor $J$ (og dermed 16 ganger så mye moment for samme $\\tau_{maks}$).

> Torsjon: $\\tau = Tr/J$, null i senter og størst i overflaten. Bøyning: $\\sigma = My/I$, null på nøytralaksen og størst i ytterfiberen.`,
en: `## What is it about?
Shafts transmit moment by twisting (torsion), and beams transmit transverse load by bending. Both produce stresses that are NOT evenly distributed over the cross-section, unlike the pure axial stress from the previous unit: the stress is zero at a central point (the center in torsion, the neutral axis in bending) and largest farthest away. That is exactly why the shape of the cross-section matters so much for how stiff and strong a shaft or beam becomes.

## Concepts and formulas
- Torsion in a circular shaft: the shear stress is linear with distance from the center, $\\tau = \\dfrac{Tr}{J}$, largest at the surface: $\\tau_{max} = \\dfrac{T(d/2)}{J} = \\dfrac{16T}{\\pi d^3}$.
- Polar second moment of area for a solid circular shaft: $J = \\dfrac{\\pi d^4}{32}$. For a hollow shaft (outer $D$, inner $d$): $J = \\dfrac{\\pi(D^4-d^4)}{32}$.
- Angle of twist over the length $L$: $\\theta = \\dfrac{TL}{GJ}$ (radians).
- Bending stress at distance $y$ from the neutral axis: $\\sigma = \\dfrac{My}{I}$, largest at the outer fiber: $\\sigma_{max} = M/W$, with $W = I/y_{max}$.
- The shear stress in a bent beam is largest at the neutral axis (for a rectangle: $\\tau_{max} = 1.5V/A$), not at the outer fibers where the bending stress is largest.
- Power and torque: $P = T\\omega$, where $\\omega$ is the angular velocity in rad/s.

## How to solve the problems
1. Torsion: find $J$ for the cross-section, compute $\\tau_{max}$ at the surface and, if needed, $\\theta$ over the relevant length.
2. Bending: find $I$ for the cross-section and the distance $y_{max}$ to the outer fiber (or use $W$ directly), compute $\\sigma_{max} = M/W$.
3. When sizing (finding the required diameter): rearrange the formula, for example $d = \\sqrt[3]{16T/(\\pi\\tau_{allow})}$.
4. Keep track of units: use N and mm consistently, so $\\sigma$ and $\\tau$ come out directly in MPa.
5. Check that the answer is reasonable: the shear stress is zero at the center of a shaft and zero at the neutral axis in bending, largest at the surface/outer fiber.

### Example
A solid steel shaft ($G = 80$ GPa) has a diameter of 50 mm and a length of 1.5 m. It transmits a torque of 800 Nm. Find the maximum shear stress and the angle of twist.
1. Polar second moment of area: $J = \\pi\\cdot 50^4/32 \\approx 613,592$ mm⁴.
2. Maximum shear stress: $\\tau_{max} = T(d/2)/J = 800,000\\cdot 25/613,592 \\approx 32.6$ MPa.
3. Angle of twist: $\\theta = TL/(GJ) = 800,000\\cdot 1500/(80,000\\cdot 613,592) \\approx 0.0244$ rad $\\approx 1.40^\\circ$.

Answer: $\\tau_{max} \\approx 32.6$ MPa and $\\theta \\approx 1.40^\\circ$.

## Common mistakes
- Using $J = \\pi d^4/64$ (that is $I$, the second moment of area about a diameter) instead of $J = \\pi d^4/32$ in the torsion formula.
- Believing the shear stress in torsion is largest at the center. It is zero there and largest at the surface.
- Believing the bending stress is largest at the neutral axis. It is the other way around: $\\sigma = 0$ at the neutral axis, largest at the outer fiber.
- Mixing degrees and radians in $\\theta = TL/(GJ)$ – the formula gives radians.
- Forgetting that doubling the diameter gives 16 times the $J$ (and therefore 16 times the torque for the same $\\tau_{max}$).

> Torsion: $\\tau = Tr/J$, zero at the center and largest at the surface. Bending: $\\sigma = My/I$, zero at the neutral axis and largest at the outer fiber.`
});

BIQ("FAST", 1, [
 ["En aksel skal overføre et vridningsmoment på 250 Nm. Tillatt skjærspenning er 40 MPa. Hvor stor må akseldiameteren minst være?",
  { n: 31.69, tol: 0.5, u: "mm" },
  "$d = \\sqrt[3]{16T/(\\pi\\tau_{tillatt})} = \\sqrt[3]{16\\cdot 250\\,000/(\\pi\\cdot 40)} \\approx 31{,}7$ mm.",
  "A shaft must transmit a torque of 250 Nm. The allowable shear stress is 40 MPa. What is the smallest allowable shaft diameter?",
  null,
  "$d = \\sqrt[3]{16T/(\\pi\\tau_{allow})} = \\sqrt[3]{16\\cdot 250,000/(\\pi\\cdot 40)} \\approx 31.7$ mm."],
 ["To aksler har samme diameter og overfører samme vridningsmoment $T$, men aksel B er dobbelt så lang som aksel A. Hvordan er den maksimale skjærspenningen i de to akslene?",
  ["Lik i begge, siden $\\tau = T(d/2)/J$ ikke avhenger av lengden", "Dobbelt så stor i B", "Halvparten så stor i B", "Fire ganger så stor i B"],
  "Skjærspenningen avhenger bare av moment og tverrsnitt, ikke av lengden. Det er vridningsvinkelen $\\theta = TL/(GJ)$ som dobles når lengden dobles, ikke spenningen.",
  "Two shafts have the same diameter and transmit the same torque $T$, but shaft B is twice as long as shaft A. How does the maximum shear stress in the two shafts compare?",
  ["Equal in both, since $\\tau = T(d/2)/J$ does not depend on the length", "Twice as large in B", "Half as large in B", "Four times as large in B"],
  "The shear stress depends only on the torque and the cross-section, not on the length. It is the angle of twist $\\theta = TL/(GJ)$ that doubles when the length doubles, not the stress."],
 ["Hva skjer med vridningsvinkelen $\\theta$ til en aksel hvis lengden dobles (samme moment, diameter og materiale)?",
  ["Den dobles", "Den halveres", "Den er uendret", "Den firedobles"],
  "$\\theta = TL/(GJ)$ er proporsjonal med lengden $L$: dobbel lengde gir dobbel vridningsvinkel.",
  "What happens to the angle of twist $\\theta$ of a shaft if the length is doubled (same torque, diameter and material)?",
  ["It doubles", "It is halved", "It is unchanged", "It quadruples"],
  "$\\theta = TL/(GJ)$ is proportional to the length $L$: twice the length gives twice the angle of twist."],
 ["En hul aksel har ytre diameter 60 mm og indre diameter 40 mm, og overfører et vridningsmoment på 1200 Nm. Hvor stor er den maksimale skjærspenningen?",
  { n: 35.26, tol: 0.4, u: "MPa" },
  "$J = \\pi(D^4-d^4)/32 = \\pi(60^4-40^4)/32 \\approx 1\\,021\\,018$ mm⁴. $\\tau_{maks} = T(D/2)/J = 1\\,200\\,000\\cdot 30/1\\,021\\,018 \\approx 35{,}3$ MPa.",
  "A hollow shaft has an outer diameter of 60 mm and an inner diameter of 40 mm, and transmits a torque of 1200 Nm. What is the maximum shear stress?",
  null,
  "$J = \\pi(D^4-d^4)/32 = \\pi(60^4-40^4)/32 \\approx 1,021,018$ mm⁴. $\\tau_{max} = T(D/2)/J = 1,200,000\\cdot 30/1,021,018 \\approx 35.3$ MPa."]
]);

GEN("FAST", 1,
 // enkel: skjærspenning i gitt avstand fra senter (ikke i overflaten)
 () => { const d = R.p([20, 25, 30, 40, 50, 60]), Tq = R.f(50, 900, 10), r = R.f(0.2 * d / 2, 0.9 * d / 2, 0.5);
   const J = Math.PI * d ** 4 / 32, tau = Tq * 1000 * r / J;
   return [T(`En massiv sirkulær aksel med diameter ${d} mm overfører et vridningsmoment på ${nf(Tq)} Nm. Hvor stor er skjærspenningen i avstand ${nf(r)} mm fra senteret?`,
             `A solid circular shaft with a diameter of ${d} mm transmits a torque of ${nf(Tq)} Nm. What is the shear stress at a distance of ${nf(r)} mm from the center?`),
     { n: tau, tol: rel(tau), u: "MPa" },
     T(`$J = \\pi d^4/32 \\approx ${mf(J, 0)}$ mm⁴. Skjærspenningen er lineær med avstanden: $\\tau = Tr/J = ${mf(Tq * 1000, 0)}\\cdot ${mf(r)}/${mf(J, 0)} \\approx ${mf(tau, 2)}$ MPa.`,
       `$J = \\pi d^4/32 \\approx ${mf(J, 0)}$ mm⁴. The shear stress is linear with distance: $\\tau = Tr/J = ${mf(Tq * 1000, 0)}\\cdot ${mf(r)}/${mf(J, 0)} \\approx ${mf(tau, 2)}$ MPa.`)]; },
 // middels: effekt -> moment -> vridningsvinkel
 () => { const P = R.f(2, 30, 0.5), n = R.i(300, 3000), d = R.p([25, 30, 35, 40, 50]), L = R.f(0.4, 2, 0.1), G = 80000;
   const w = n * 2 * Math.PI / 60, Tq = P * 1000 / w, J = Math.PI * d ** 4 / 32, th = Tq * 1000 * (L * 1000) / (G * J), thDeg = th / DEG;
   return [T(`En stålaksel ($G = 80$ GPa, diameter ${d} mm, lengde ${nf(L)} m) overfører en effekt på ${nf(P)} kW ved ${n} rpm. Hvor stor er vridningsvinkelen over akselens lengde, i grader?`,
             `A steel shaft ($G = 80$ GPa, diameter ${d} mm, length ${nf(L)} m) transmits a power of ${nf(P)} kW at ${n} rpm. What is the angle of twist over the length of the shaft, in degrees?`),
     { n: thDeg, tol: Math.max(0.05, thDeg * 0.02), u: "°" },
     T(`$\\omega = 2\\pi n/60 \\approx ${mf(w, 1)}$ rad/s, så $T = P/\\omega \\approx ${mf(Tq, 1)}$ Nm. $J = \\pi d^4/32 \\approx ${mf(J, 0)}$ mm⁴. $\\theta = TL/(GJ) \\approx ${mf(th, 4)}$ rad $\\approx ${mf(thDeg, 2)}^\\circ$.`,
       `$\\omega = 2\\pi n/60 \\approx ${mf(w, 1)}$ rad/s, so $T = P/\\omega \\approx ${mf(Tq, 1)}$ Nm. $J = \\pi d^4/32 \\approx ${mf(J, 0)}$ mm⁴. $\\theta = TL/(GJ) \\approx ${mf(th, 4)}$ rad $\\approx ${mf(thDeg, 2)}^\\circ$.`)]; },
 // eksamen: dimensjonering av hul aksel fra effekt og turtall
 () => { const P = R.f(10, 120, 5), n = R.i(500, 3000), k = R.p([0.5, 0.6, 0.7]), tauA = R.p([35, 40, 50, 60]);
   const w = n * 2 * Math.PI / 60, Tq = P * 1000 / w * 1000; // Nmm
   const D = Math.cbrt(16 * Tq / (Math.PI * tauA * (1 - k ** 4)));
   return [T(`En hul aksel skal overføre en effekt på ${nf(P)} kW ved ${n} rpm. Indre diameter skal være ${nf(k)} ganger ytre diameter, og tillatt skjærspenning er ${tauA} MPa. Hvor stor må ytre diameter minst være?`,
             `A hollow shaft must transmit a power of ${nf(P)} kW at ${n} rpm. The inner diameter must be ${nf(k)} times the outer diameter, and the allowable shear stress is ${tauA} MPa. What is the smallest allowable outer diameter?`),
     { n: D, tol: rel(D), u: "mm" },
     T(`$\\omega = 2\\pi n/60 \\approx ${mf(w, 1)}$ rad/s, så $T = P/\\omega \\approx ${mf(Tq / 1000, 1)}$ Nm. Med $d = ${nf(k)}D$ blir $J/(D/2) = \\dfrac{\\pi D^3}{16}(1-k^4)$, så $D = \\sqrt[3]{\\dfrac{16T}{\\pi\\tau_{tillatt}(1-k^4)}} \\approx ${mf(D, 1)}$ mm.`,
       `$\\omega = 2\\pi n/60 \\approx ${mf(w, 1)}$ rad/s, so $T = P/\\omega \\approx ${mf(Tq / 1000, 1)}$ Nm. With $d = ${nf(k)}D$, $J/(D/2) = \\dfrac{\\pi D^3}{16}(1-k^4)$, so $D = \\sqrt[3]{\\dfrac{16T}{\\pi\\tau_{allow}(1-k^4)}} \\approx ${mf(D, 1)}$ mm.`)]; }
);

// ================= FAST – enhet 2: Spenningstransformasjon og knekking =================
THEORY("FAST", 2, {
nb: `## Hva handler det om?
I et hvilket som helst punkt i et belastet legeme ser spenningen forskjellig ut avhengig av hvilket snitt du ser på. Spenningstransformasjon handler om å finne de verste retningene: hovedspenningene (størst og minst normalspenning, uten skjær) og den største skjærspenningen. Det trengs for å avgjøre om et duktilt eller sprøtt materiale flyter eller brister, siden mange materialer ikke bryr seg om spenningen i én bestemt retning, men om en kombinasjon av alle.

Knekking er noe helt annet: en slank søyle i trykk kan bøye seg ut til siden og kollapse lenge før materialet i seg selv har nådd flytegrensen. Det er en stabilitetssvikt, ikke en styrkesvikt, og avhenger sterkt av søylens lengde og opplagringsbetingelser.

## Begreper og formler
- Plan spenningstilstand: $\\sigma_x$, $\\sigma_y$, $\\tau_{xy}$. Senter i Mohrs sirkel: $c = (\\sigma_x+\\sigma_y)/2$. Radius: $R = \\sqrt{((\\sigma_x-\\sigma_y)/2)^2+\\tau_{xy}^2}$.
- Hovedspenninger: $\\sigma_{1,2} = c \\pm R$ (skjærspenningen er null i disse retningene). Største skjærspenning i planet: $\\tau_{maks} = R$.
- Von Mises-spenning (plan tilstand): $\\sigma_v = \\sqrt{\\sigma^2+3\\tau^2}$ for en enakset spenning $\\sigma$ kombinert med skjær $\\tau$, mer generelt $\\sigma_v=\\sqrt{\\sigma_1^2-\\sigma_1\\sigma_2+\\sigma_2^2}$. Flyt inntreffer når $\\sigma_v = R_e$.
- Trescas kriterium: flyt når $\\tau_{maks} = R_e/2$, noe mer konservativt enn von Mises.
- Treghetsradius: $i = \\sqrt{I/A}$. Slankhetsforhold: $\\lambda = L_e/i$, der $L_e = KL$ er effektiv knekklengde.
- Effektiv lengdefaktor $K$: leddet–leddet $K=1$, innspent–innspent $K=0{,}5$, innspent–leddet $K\\approx0{,}7$, innspent–fri $K=2$.
- Eulers knekklast: $P_{cr} = \\dfrac{\\pi^2EI}{(KL)^2}$, gyldig når søylen fortsatt er elastisk (høy slankhet).

## Slik løser du oppgavene
1. Spenningstransformasjon: regn senter $c$ og radius $R$ i Mohrs sirkel, og finn $\\sigma_{1,2} = c\\pm R$ og $\\tau_{maks} = R$.
2. For flytevurdering: sett hovedspenningene inn i von Mises- eller Tresca-uttrykket og sammenlign med $R_e$ (eventuelt del på sikkerhetsfaktor).
3. Knekking: finn riktig $K$ ut fra opplagringen, regn $L_e = KL$, og sett inn i Eulers formel.
4. Treghetsradius og slankhet brukes til å avgjøre om Eulers formel i det hele tatt gjelder (høy $\\lambda$) eller om søylen heller vil flyte.
5. Kontroller størrelsesorden: en dobling av knekklengden gir en firedel av knekklasten, ikke en halvering.

### Eksempel
Et punkt har $\\sigma_x = 80$ MPa, $\\sigma_y = -20$ MPa og $\\tau_{xy} = 30$ MPa. Finn hovedspenningene og den maksimale skjærspenningen.
1. Senter: $c = (80-20)/2 = 30$ MPa.
2. Radius: $R = \\sqrt{((80-(-20))/2)^2+30^2} = \\sqrt{50^2+30^2} \\approx 58{,}3$ MPa.
3. Hovedspenninger: $\\sigma_1 = 30+58{,}3 \\approx 88{,}3$ MPa, $\\sigma_2 = 30-58{,}3 \\approx -28{,}3$ MPa.
4. Maksimal skjærspenning i planet: $\\tau_{maks} = R \\approx 58{,}3$ MPa.

Svar: $\\sigma_1 \\approx 88{,}3$ MPa, $\\sigma_2 \\approx -28{,}3$ MPa, $\\tau_{maks} \\approx 58{,}3$ MPa.

## Vanlige feil
- Å bruke $(\\sigma_x-\\sigma_y)$ i stedet for $(\\sigma_x-\\sigma_y)/2$ i radiusformelen.
- Å tro at høyeste skjærspenning i rommet er lik $R$ i den plane sirkelen – i 3D kan den egentlige maksimale skjærspenningen være større hvis $\\sigma_2$ og $\\sigma_3=0$ har motsatt fortegn.
- Å bruke feil $K$-faktor, spesielt å forveksle leddet–leddet ($K=1$) med innspent–fri ($K=2$).
- Å tro at knekklasten er proporsjonal med lengden. Den er omvendt proporsjonal med lengden i annen.
- Å bruke Eulers formel for en kort, tykk søyle som egentlig flyter før den knekker.

> Mohrs sirkel: $\\sigma_{1,2}=c\\pm R$, $\\tau_{maks}=R$. Eulers knekklast: $P_{cr}=\\pi^2EI/(KL)^2$ – dobbel lengde gir en firedel av lasten.`,
en: `## What is it about?
At any point in a loaded body, the stress looks different depending on which cut you look at. Stress transformation is about finding the worst directions: the principal stresses (the largest and smallest normal stress, with no shear) and the largest shear stress. This is needed to decide whether a ductile or brittle material yields or fractures, since many materials do not care about the stress in one particular direction, but about a combination of all of them.

Buckling is something completely different: a slender column in compression can bow out sideways and collapse long before the material itself has reached the yield strength. It is a stability failure, not a strength failure, and depends strongly on the column's length and end conditions.

## Concepts and formulas
- Plane stress state: $\\sigma_x$, $\\sigma_y$, $\\tau_{xy}$. Center of Mohr's circle: $c = (\\sigma_x+\\sigma_y)/2$. Radius: $R = \\sqrt{((\\sigma_x-\\sigma_y)/2)^2+\\tau_{xy}^2}$.
- Principal stresses: $\\sigma_{1,2} = c \\pm R$ (the shear stress is zero in these directions). Maximum in-plane shear stress: $\\tau_{max} = R$.
- Von Mises stress (plane state): $\\sigma_v = \\sqrt{\\sigma^2+3\\tau^2}$ for a uniaxial stress $\\sigma$ combined with shear $\\tau$, more generally $\\sigma_v=\\sqrt{\\sigma_1^2-\\sigma_1\\sigma_2+\\sigma_2^2}$. Yielding occurs when $\\sigma_v = R_e$.
- Tresca's criterion: yielding when $\\tau_{max} = R_e/2$, somewhat more conservative than von Mises.
- Radius of gyration: $i = \\sqrt{I/A}$. Slenderness ratio: $\\lambda = L_e/i$, where $L_e = KL$ is the effective buckling length.
- Effective length factor $K$: pinned–pinned $K=1$, fixed–fixed $K=0.5$, fixed–pinned $K\\approx0.7$, fixed–free $K=2$.
- Euler's critical load: $P_{cr} = \\dfrac{\\pi^2EI}{(KL)^2}$, valid as long as the column is still elastic (high slenderness).

## How to solve the problems
1. Stress transformation: compute the center $c$ and the radius $R$ of Mohr's circle, and find $\\sigma_{1,2} = c\\pm R$ and $\\tau_{max} = R$.
2. For a yield check: insert the principal stresses into the von Mises or Tresca expression and compare with $R_e$ (possibly divided by a safety factor).
3. Buckling: find the correct $K$ from the end conditions, compute $L_e = KL$, and insert it into Euler's formula.
4. The radius of gyration and the slenderness ratio are used to decide whether Euler's formula applies at all (high $\\lambda$) or whether the column will yield instead.
5. Check the order of magnitude: doubling the buckling length gives a quarter of the critical load, not half of it.

### Example
A point has $\\sigma_x = 80$ MPa, $\\sigma_y = -20$ MPa and $\\tau_{xy} = 30$ MPa. Find the principal stresses and the maximum shear stress.
1. Center: $c = (80-20)/2 = 30$ MPa.
2. Radius: $R = \\sqrt{((80-(-20))/2)^2+30^2} = \\sqrt{50^2+30^2} \\approx 58.3$ MPa.
3. Principal stresses: $\\sigma_1 = 30+58.3 \\approx 88.3$ MPa, $\\sigma_2 = 30-58.3 \\approx -28.3$ MPa.
4. Maximum in-plane shear stress: $\\tau_{max} = R \\approx 58.3$ MPa.

Answer: $\\sigma_1 \\approx 88.3$ MPa, $\\sigma_2 \\approx -28.3$ MPa, $\\tau_{max} \\approx 58.3$ MPa.

## Common mistakes
- Using $(\\sigma_x-\\sigma_y)$ instead of $(\\sigma_x-\\sigma_y)/2$ in the radius formula.
- Believing the highest shear stress in space equals $R$ from the plane circle – in 3D the true maximum shear stress can be larger if $\\sigma_2$ and $\\sigma_3=0$ have opposite signs.
- Using the wrong $K$ factor, especially confusing pinned–pinned ($K=1$) with fixed–free ($K=2$).
- Believing the critical load is proportional to the length. It is inversely proportional to the length squared.
- Using Euler's formula for a short, thick column that would actually yield before it buckles.

> Mohr's circle: $\\sigma_{1,2}=c\\pm R$, $\\tau_{max}=R$. Euler's critical load: $P_{cr}=\\pi^2EI/(KL)^2$ – doubling the length gives a quarter of the load.`
});

BIQ("FAST", 2, [
 ["Et punkt har $\\sigma_x = 50$ MPa, $\\sigma_y = -10$ MPa og $\\tau_{xy} = 24$ MPa. Hvor stor er den største hovedspenningen $\\sigma_1$?",
  { n: 58.42, tol: 0.6, u: "MPa" },
  "Senter $c = (50-10)/2 = 20$ MPa. Radius $R = \\sqrt{((50-(-10))/2)^2+24^2} = \\sqrt{30^2+24^2} \\approx 38{,}4$ MPa. $\\sigma_1 = c+R \\approx 20+38{,}4 \\approx 58{,}4$ MPa.",
  "A point has $\\sigma_x = 50$ MPa, $\\sigma_y = -10$ MPa and $\\tau_{xy} = 24$ MPa. What is the largest principal stress $\\sigma_1$?",
  null,
  "Center $c = (50-10)/2 = 20$ MPa. Radius $R = \\sqrt{((50-(-10))/2)^2+24^2} = \\sqrt{30^2+24^2} \\approx 38.4$ MPa. $\\sigma_1 = c+R \\approx 20+38.4 \\approx 58.4$ MPa."],
 ["Hva skjer med Eulers knekklast hvis slankhetsforholdet $\\lambda$ dobles (samme materiale og opplagring)?",
  ["Den blir en firedel", "Den halveres", "Den er uendret", "Den firedobles"],
  "$P_{cr} \\propto 1/\\lambda^2$ siden $\\lambda = L_e/i$ og $P_{cr} \\propto 1/L_e^2$. Dobbelt slankhet gir en firedel av knekklasten.",
  "What happens to Euler's critical load if the slenderness ratio $\\lambda$ doubles (same material and end conditions)?",
  ["It becomes one quarter", "It is halved", "It is unchanged", "It quadruples"],
  "$P_{cr} \\propto 1/\\lambda^2$ since $\\lambda = L_e/i$ and $P_{cr} \\propto 1/L_e^2$. Doubling the slenderness gives one quarter of the critical load."],
 ["To bjelketverrsnitt har nøyaktig samme areal, men det ene (et rør) har materialet fordelt langt fra tyngdepunktsaksen, mens det andre (en massiv stav) har det samlet nær aksen. Hvilket gir størst treghetsradius $i$ og dermed best knekkmotstand?",
  ["Røret, siden $I$ (og dermed $i=\\sqrt{I/A}$) øker når materialet flyttes bort fra aksen", "Den massive staven, siden den har mest materiale i midten", "De er like, siden arealet er det samme", "Det avhenger bare av lengden, ikke av tverrsnittet"],
  "Arealtreghetsmomentet $I$ vokser raskt med avstanden fra aksen. Med samme areal gir et rør derfor mye større $I$ og $i$ enn en massiv stav, og dermed bedre knekkmotstand.",
  "Two beam cross-sections have exactly the same area, but one (a tube) has its material spread far from the centroidal axis, while the other (a solid rod) has it concentrated near the axis. Which gives the largest radius of gyration $i$ and therefore the best buckling resistance?",
  ["The tube, since $I$ (and therefore $i=\\sqrt{I/A}$) increases when the material is moved away from the axis", "The solid rod, since it has most of the material in the middle", "They are equal, since the area is the same", "It depends only on the length, not on the cross-section"],
  "The second moment of area $I$ grows quickly with distance from the axis. With the same area, a tube therefore gives a much larger $I$ and $i$ than a solid rod, and thus better buckling resistance."],
 ["En stålsøyle ($E = 200$ GPa, $I = 8\\cdot10^6$ mm⁴) er 4 m lang og leddet i begge ender. Den belastes med en aksiell trykkraft på 150 kN. Hvor stor er sikkerhetsfaktoren mot knekking?",
  { n: 6.58, tol: 0.1, u: "" },
  "$K=1$ for leddet i begge ender, så $L_e = 4000$ mm. $P_{cr} = \\pi^2EI/(KL)^2 = \\pi^2\\cdot 200\\,000\\cdot 8\\cdot10^6/4000^2 \\approx 987\\,000$ N $\\approx 987$ kN. $n = P_{cr}/P = 987/150 \\approx 6{,}58$.",
  "A steel column ($E = 200$ GPa, $I = 8\\cdot10^6$ mm⁴) is 4 m long and pinned at both ends. It carries an axial compressive force of 150 kN. What is the safety factor against buckling?",
  null,
  "$K=1$ for pinned at both ends, so $L_e = 4000$ mm. $P_{cr} = \\pi^2EI/(KL)^2 = \\pi^2\\cdot 200,000\\cdot 8\\cdot10^6/4000^2 \\approx 987,000$ N $\\approx 987$ kN. $n = P_{cr}/P = 987/150 \\approx 6.58$."]
]);

GEN("FAST", 2,
 // enkel: slankhetsforhold
 () => { const Le = R.f(0.5, 6, 0.1), i = R.f(8, 60, 1), lam = Le * 1000 / i;
   return [T(`En søyle har effektiv knekklengde $L_e = ${nf(Le)}$ m og treghetsradius $i = ${nf(i)}$ mm. Hvor stort er slankhetsforholdet $\\lambda$?`,
             `A column has an effective buckling length $L_e = ${nf(Le)}$ m and a radius of gyration $i = ${nf(i)}$ mm. What is the slenderness ratio $\\lambda$?`),
     { n: lam, tol: rel(lam), u: "" },
     T(`$\\lambda = L_e/i = ${mf(Le * 1000, 0)}/${mf(i)} \\approx ${mf(lam, 1)}$.`,
       `$\\lambda = L_e/i = ${mf(Le * 1000, 0)}/${mf(i)} \\approx ${mf(lam, 1)}$.`)]; },
 // middels: største hovedspenning fra Mohrs sirkel
 () => { const sx = R.f(-60, 120, 5), sy = R.f(-60, 80, 5), txy = R.f(5, 60, 5);
   const c = (sx + sy) / 2, Rr = Math.hypot((sx - sy) / 2, txy), s1 = c + Rr;
   return [T(`Et punkt i en konstruksjonsdel har $\\sigma_x = ${nf(sx)}$ MPa, $\\sigma_y = ${nf(sy)}$ MPa og $\\tau_{xy} = ${nf(txy)}$ MPa. Hvor stor er den største hovedspenningen $\\sigma_1$?`,
             `A point in a machine part has $\\sigma_x = ${nf(sx)}$ MPa, $\\sigma_y = ${nf(sy)}$ MPa and $\\tau_{xy} = ${nf(txy)}$ MPa. What is the largest principal stress $\\sigma_1$?`),
     { n: s1, tol: rel(s1, 0.01, 0.5), u: "MPa" },
     T(`Senter $c = (${mf(sx)}+${mf(sy)})/2 \\approx ${mf(c, 1)}$ MPa. Radius $R = \\sqrt{((${mf(sx)}-${mf(sy)})/2)^2+${mf(txy)}^2} \\approx ${mf(Rr, 1)}$ MPa. $\\sigma_1 = c+R \\approx ${mf(s1, 1)}$ MPa.`,
       `Center $c = (${mf(sx)}+${mf(sy)})/2 \\approx ${mf(c, 1)}$ MPa. Radius $R = \\sqrt{((${mf(sx)}-${mf(sy)})/2)^2+${mf(txy)}^2} \\approx ${mf(Rr, 1)}$ MPa. $\\sigma_1 = c+R \\approx ${mf(s1, 1)}$ MPa.`)]; },
 // eksamen: knekking leddet-leddet med sikkerhetsfaktor
 () => { const E = R.p([70000, 200000, 210000]), I = R.f(1, 20, 0.5) * 1e6, L = R.f(2, 7, 0.5), P = R.f(30, 400, 10);
   const Pcr = Math.PI ** 2 * E * I / ((L * 1000) ** 2), n = Pcr / (P * 1000);
   return [T(`En søyle ($E = ${nf(E / 1000)}$ GPa, $I = ${nf(I / 1e6)}\\cdot10^6$ mm⁴) er ${nf(L)} m lang og leddet i begge ender. Den belastes med en aksiell trykkraft på ${nf(P)} kN. Hvor stor er sikkerhetsfaktoren mot knekking?`,
             `A column ($E = ${nf(E / 1000)}$ GPa, $I = ${nf(I / 1e6)}\\cdot10^6$ mm⁴) is ${nf(L)} m long and pinned at both ends. It carries an axial compressive force of ${nf(P)} kN. What is the safety factor against buckling?`),
     { n: n, tol: rel(n), u: "" },
     T(`$K=1$, så $L_e=${nf(L)}$ m. $P_{cr} = \\pi^2EI/(KL)^2 \\approx ${mf(Pcr / 1000, 1)}$ kN. $n = P_{cr}/P \\approx ${mf(Pcr / 1000, 1)}/${mf(P)} \\approx ${mf(n, 2)}$.`,
       `$K=1$, so $L_e=${nf(L)}$ m. $P_{cr} = \\pi^2EI/(KL)^2 \\approx ${mf(Pcr / 1000, 1)}$ kN. $n = P_{cr}/P \\approx ${mf(Pcr / 1000, 1)}/${mf(P)} \\approx ${mf(n, 2)}$.`)]; }
);

// ================= MATS1600 – enhet 0: Spenning og dimensjonering =================
THEORY("MATS1600", 0, {
nb: `## Hva handler det om?
I virkelige maskindeler virker sjelden bare én lasttype om gangen. En bolt kan ha både forspenning (strekk) og bøyning fra en skjev tilslutning; en aksel kan ha både bøyemoment fra egenvekten og torsjon fra drivmomentet. Spenning og dimensjonering handler om å kombinere disse bidragene til én representativ spenning i det kritiske punktet, sammenligne den med materialets flytegrense med en fornuftig sikkerhetsfaktor, og ta hensyn til at skarpe overganger og varierende last kan gi brudd langt under det en statisk strekkprøve skulle tilsi.

## Begreper og formler
- Kombinert aksial- og bøyespenning i en ytterfiber: $\\sigma = \\dfrac{F}{A} \\pm \\dfrac{M}{W}$ (samme fortegn på trykksiden, motsatt på strekksiden).
- Sikkerhetsfaktor mot flyt: $n = R_e/\\sigma$. Typisk 1,5–3 i maskinkonstruksjon, høyere ved usikker last eller alvorlige konsekvenser av brudd.
- Spenningskonsentrasjonsfaktor $K_t$: ved et hull, en kjerv eller et hakk blir den lokale spenningen $\\sigma_{lokal} = K_t\\sigma_{nom}$, der $\\sigma_{nom}$ er spenningen uten konsentrasjonen.
- Utmatting: ved varierende last kan brudd skje ved en spenning godt under $R_e$, spesielt ved kjerver. Utmattingsgrensen $\\sigma_e$ er spenningsamplituden materialet tåler «uendelig» mange sykler.
- Boltforspenning: en momentnøkkel styrer forspenningskraften via $T \\approx KFd$, der $K \\approx 0{,}2$ for tørre gjenger og $d$ er nominell diameter.

## Slik løser du oppgavene
1. Identifiser alle lasttyper som virker i det kritiske snittet (aksial, bøyning, torsjon).
2. Regn spenningsbidraget fra hver last for seg, med riktig fortegn.
3. Legg sammen bidrag av samme type i samme punkt (for eksempel aksial og bøyning i samme fiber). Ved en kjerv: multipliser den nominelle spenningen med $K_t$.
4. Sammenlign den totale spenningen med $R_e$ og finn $n = R_e/\\sigma$, eller kontroller at $n$ er stor nok.
5. Ved variabel last: vurder om utmatting kan være dimensjonerende, ikke bare statisk flyt.

### Eksempel
En kort søyle med rektangulært tverrsnitt 40 × 30 mm belastes med en aksiell trykkraft på 40 kN som angriper 15 mm utenfor tyngdepunktsaksen. $W = bh^2/6 = 40\\cdot 30^2/6 = 6000$ mm³ og $A = 1200$ mm². Finn den største trykkspenningen.
1. Aksialspenning: $\\sigma_{aks} = F/A = 40\\,000/1200 \\approx 33{,}3$ MPa.
2. Bøyemoment fra eksentrisiteten: $M = Fe = 40\\,000\\cdot 15 = 600\\,000$ Nmm $= 600$ Nm.
3. Bøyespenning: $\\sigma_{bøy} = M/W = 600\\,000/6000 = 100$ MPa.
4. På siden hvor begge bidragene er trykk, legges de sammen: $\\sigma_{maks} = 33{,}3+100 = 133{,}3$ MPa.

Svar: $\\sigma_{maks} \\approx 133{,}3$ MPa.

## Vanlige feil
- Å glemme bøyningen som oppstår når en aksiell kraft ikke angriper nøyaktig i tyngdepunktsaksen.
- Å legge sammen spenninger fra ulike punkter eller ulike retninger som om de var samme type.
- Å bruke $K_t$ på feil spenning – den skal ganges med den nominelle spenningen i samme punkt, ikke med en annen last.
- Å tro at en statisk sikkerhetsfaktor er nok når lasten i virkeligheten varierer syklisk.

> Kombiner alle lastbidrag i det kritiske punktet FØR du sammenligner med flytegrensen – og husk at varierende last kan kreve egen utmattingsvurdering.`,
en: `## What is it about?
Real machine parts are rarely loaded by just one type of load at a time. A bolt may have both preload (tension) and bending from a slightly misaligned joint; a shaft may have both a bending moment from its own weight and torsion from the driving torque. Stress and sizing is about combining these contributions into one representative stress at the critical point, comparing it with the material's yield strength using a sensible safety factor, and accounting for the fact that sharp transitions and varying load can cause failure far below what a static tensile test would suggest.

## Concepts and formulas
- Combined axial and bending stress at an outer fiber: $\\sigma = \\dfrac{F}{A} \\pm \\dfrac{M}{W}$ (same sign on the compression side, opposite on the tension side).
- Safety factor against yielding: $n = R_e/\\sigma$. Typically 1.5–3 in machine design, higher for uncertain loads or serious consequences of failure.
- Stress concentration factor $K_t$: at a hole, a fillet or a notch the local stress becomes $\\sigma_{local} = K_t\\sigma_{nom}$, where $\\sigma_{nom}$ is the stress without the concentration.
- Fatigue: under varying load, failure can occur at a stress well below $R_e$, especially at notches. The endurance limit $\\sigma_e$ is the stress amplitude the material withstands for "infinitely" many cycles.
- Bolt preload: a torque wrench controls the preload force through $T \\approx KFd$, where $K \\approx 0.2$ for dry threads and $d$ is the nominal diameter.

## How to solve the problems
1. Identify every type of load acting at the critical section (axial, bending, torsion).
2. Compute the stress contribution from each load separately, with the correct sign.
3. Add contributions of the same type at the same point (for example axial and bending at the same fiber). At a notch: multiply the nominal stress by $K_t$.
4. Compare the total stress with $R_e$ and find $n = R_e/\\sigma$, or check that $n$ is large enough.
5. For variable load: consider whether fatigue may govern, not just static yielding.

### Example
A short column with a rectangular cross-section of 40 × 30 mm carries an axial compressive force of 40 kN acting 15 mm outside the centroidal axis. $W = bh^2/6 = 40\\cdot 30^2/6 = 6000$ mm³ and $A = 1200$ mm². Find the largest compressive stress.
1. Axial stress: $\\sigma_{ax} = F/A = 40,000/1200 \\approx 33.3$ MPa.
2. Bending moment from the eccentricity: $M = Fe = 40,000\\cdot 15 = 600,000$ Nmm $= 600$ Nm.
3. Bending stress: $\\sigma_{bend} = M/W = 600,000/6000 = 100$ MPa.
4. On the side where both contributions are compressive, they add up: $\\sigma_{max} = 33.3+100 = 133.3$ MPa.

Answer: $\\sigma_{max} \\approx 133.3$ MPa.

## Common mistakes
- Forgetting the bending that appears when an axial force does not act exactly at the centroidal axis.
- Adding stresses from different points or different directions as if they were the same type.
- Applying $K_t$ to the wrong stress – it must multiply the nominal stress at the same point, not a different load.
- Believing a static safety factor is enough when the load actually varies cyclically.

> Combine all load contributions at the critical point BEFORE comparing with the yield strength – and remember that varying load may call for a separate fatigue check.`
});

BIQ("MATS1600", 0, [
 ["En massiv sirkulær aksel med diameter 30 mm utsettes for et bøyemoment på 250 Nm. Hva er maksimal bøyespenning?",
  { n: 94.31, tol: 1.0, u: "MPa" },
  "$W = \\pi d^3/32 = \\pi\\cdot 30^3/32 \\approx 2650{,}7$ mm³. $\\sigma = M/W = 250\\,000/2650{,}7 \\approx 94{,}3$ MPa.",
  "A solid circular shaft with a diameter of 30 mm is subjected to a bending moment of 250 Nm. What is the maximum bending stress?",
  null,
  "$W = \\pi d^3/32 = \\pi\\cdot 30^3/32 \\approx 2650.7$ mm³. $\\sigma = M/W = 250,000/2650.7 \\approx 94.3$ MPa."],
 ["En maskindel utsettes for en last som varierer syklisk mellom strekk og trykk. Maksimal spenning er godt under flytegrensen $R_e$. Hvorfor kan delen likevel gå til brudd etter mange lastvekslinger?",
  ["Utmatting: gjentatte spenningsvekslinger, spesielt ved kjerver, kan gi brudd langt under $R_e$", "Det er umulig, siden spenningen er under $R_e$", "Materialet blir sterkere av gjentatt belastning, så det er ikke noe problem", "Det skjer bare ved svært høye temperaturer"],
  "Ved varierende last er det utmattingsgrensen, ikke flytegrensen, som avgjør levetiden. Mikroriss starter ofte ved spenningskonsentrasjoner og vokser for hver lastveksling.",
  "A machine part is subjected to a load that varies cyclically between tension and compression. The maximum stress is well below the yield strength $R_e$. Why can the part still fail after many load cycles?",
  ["Fatigue: repeated stress cycling, especially at notches, can cause failure far below $R_e$", "It is impossible, since the stress is below $R_e$", "The material gets stronger from repeated loading, so it is not a problem", "It only happens at very high temperatures"],
  "Under varying load it is the endurance limit, not the yield strength, that governs the life. Microcracks often start at stress concentrations and grow with each load cycle."],
 ["Hvorfor strammes maskinbolter vanligvis til et bestemt moment med momentnøkkel, i stedet for bare å strammes «stramt nok» for hånd?",
  ["Momentnøkkelen gir en kontrollert og repeterbar forspenningskraft i bolten", "Det gjør bolten mykere og dermed sterkere", "Det er bare for å spare tid", "Momentet har ingenting med forspenningskraften å gjøre"],
  "Forspenningskraften avhenger av momentet gjennom $T \\approx KFd$. Uten momentnøkkel blir forspenningen tilfeldig, og forbindelsen kan bli for løs (glipper) eller for stram (overbelastet).",
  "Why are machine bolts usually tightened to a specified torque with a torque wrench, instead of just being tightened \"firmly enough\" by hand?",
  ["The torque wrench gives a controlled and repeatable preload force in the bolt", "It makes the bolt softer and therefore stronger", "It is only to save time", "The torque has nothing to do with the preload force"],
  "The preload force depends on the torque through $T \\approx KFd$. Without a torque wrench the preload becomes random, and the joint can end up too loose (it slips) or too tight (it is overloaded)."],
 ["En flate med bredde 40 mm og tykkelse 8 mm har et hull med spenningskonsentrasjonsfaktor $K_t = 2{,}5$. Flaten belastes aksielt med 15 kN. Materialet har $R_e = 235$ MPa. Hvor stor er sikkerhetsfaktoren mot flyt ved hullkanten?",
  { n: 2.01, tol: 0.03, u: "" },
  "Nominell spenning: $\\sigma_{nom} = F/(bt) = 15\\,000/(40\\cdot 8) \\approx 46{,}9$ MPa. Lokal spenning: $\\sigma_{lokal} = K_t\\sigma_{nom} \\approx 2{,}5\\cdot 46{,}9 \\approx 117{,}2$ MPa. Sikkerhetsfaktor: $n = R_e/\\sigma_{lokal} = 235/117{,}2 \\approx 2{,}01$.",
  "A plate with a width of 40 mm and a thickness of 8 mm has a hole with a stress concentration factor $K_t = 2.5$. The plate carries an axial load of 15 kN. The material has $R_e = 235$ MPa. What is the safety factor against yielding at the edge of the hole?",
  null,
  "Nominal stress: $\\sigma_{nom} = F/(bt) = 15,000/(40\\cdot 8) \\approx 46.9$ MPa. Local stress: $\\sigma_{local} = K_t\\sigma_{nom} \\approx 2.5\\cdot 46.9 \\approx 117.2$ MPa. Safety factor: $n = R_e/\\sigma_{local} = 235/117.2 \\approx 2.01$."]
]);

GEN("MATS1600", 0,
 // enkel: bøyespenning i sirkulær aksel
 () => { const d = R.p([16, 20, 25, 30, 35, 40, 50]), M = R.f(50, 900, 10) * 1000;
   const W = Math.PI * d ** 3 / 32, sig = M / W;
   return [T(`En massiv sirkulær aksel med diameter ${d} mm utsettes for et bøyemoment på ${nf(M / 1000)} Nm. Hva er maksimal bøyespenning?`,
             `A solid circular shaft with a diameter of ${d} mm is subjected to a bending moment of ${nf(M / 1000)} Nm. What is the maximum bending stress?`),
     { n: sig, tol: rel(sig), u: "MPa" },
     T(`$W = \\pi d^3/32 = \\pi\\cdot ${d}^3/32 \\approx ${mf(W, 1)}$ mm³. $\\sigma = M/W = ${mf(M, 0)}/${mf(W, 1)} \\approx ${mf(sig, 1)}$ MPa.`,
       `$W = \\pi d^3/32 = \\pi\\cdot ${d}^3/32 \\approx ${mf(W, 1)}$ mm³. $\\sigma = M/W = ${mf(M, 0)}/${mf(W, 1)} \\approx ${mf(sig, 1)}$ MPa.`)]; },
 // middels: kombinert aksial- og bøyespenning (eksentrisk last)
 () => { const b = R.p([25, 30, 40, 50]), h = R.p([20, 25, 30, 40]), F = R.f(8, 60, 1), e = R.f(3, h / 2 - 2, 0.5);
   const A = b * h, W = b * h * h / 6, sigAx = F * 1000 / A, M = F * 1000 * e, sigBend = M / W, sigMax = sigAx + sigBend;
   return [T(`En kort søyle med rektangulært tverrsnitt ${b} × ${h} mm belastes med en aksiell trykkraft på ${nf(F)} kN som angriper ${nf(e)} mm utenfor tyngdepunktsaksen. Hvor stor blir den største trykkspenningen?`,
             `A short column with a rectangular cross-section of ${b} × ${h} mm carries an axial compressive force of ${nf(F)} kN acting ${nf(e)} mm outside the centroidal axis. What is the largest compressive stress?`),
     { n: sigMax, tol: rel(sigMax), u: "MPa" },
     T(`$A = ${b}\\cdot ${h} = ${A}$ mm² og $W = bh^2/6 = ${mf(W, 0)}$ mm³. Aksialspenning $\\sigma_{aks} = F/A \\approx ${mf(sigAx, 1)}$ MPa. Bøyemoment $M = Fe \\approx ${mf(M, 0)}$ Nmm gir $\\sigma_{bøy} = M/W \\approx ${mf(sigBend, 1)}$ MPa. Sum på trykksiden: $\\sigma_{maks} = ${mf(sigAx, 1)}+${mf(sigBend, 1)} \\approx ${mf(sigMax, 1)}$ MPa.`,
       `$A = ${b}\\cdot ${h} = ${A}$ mm² and $W = bh^2/6 = ${mf(W, 0)}$ mm³. Axial stress $\\sigma_{ax} = F/A \\approx ${mf(sigAx, 1)}$ MPa. Bending moment $M = Fe \\approx ${mf(M, 0)}$ Nmm gives $\\sigma_{bend} = M/W \\approx ${mf(sigBend, 1)}$ MPa. Sum on the compression side: $\\sigma_{max} = ${mf(sigAx, 1)}+${mf(sigBend, 1)} \\approx ${mf(sigMax, 1)}$ MPa.`)]; },
 // eksamen: spenningskonsentrasjon + sikkerhetsfaktor
 () => { const bb = R.p([30, 40, 50, 60]), tt = R.p([5, 6, 8, 10]), F = R.f(6, 30, 1), Kt = R.f(2, 3, 0.1), Re = R.p([235, 275, 355]);
   const signom = F * 1000 / (bb * tt), siglocal = Kt * signom, nn = Re / siglocal;
   return [T(`En flate med bredde ${bb} mm og tykkelse ${tt} mm har et hull med spenningskonsentrasjonsfaktor $K_t = ${nf(Kt)}$. Flaten belastes aksielt med ${nf(F)} kN. Materialet har $R_e = ${Re}$ MPa. Hvor stor er sikkerhetsfaktoren mot flyt ved hullkanten?`,
             `A plate with a width of ${bb} mm and a thickness of ${tt} mm has a hole with a stress concentration factor $K_t = ${nf(Kt)}$. The plate carries an axial load of ${nf(F)} kN. The material has $R_e = ${Re}$ MPa. What is the safety factor against yielding at the edge of the hole?`),
     { n: nn, tol: rel(nn), u: "" },
     T(`Nominell spenning: $\\sigma_{nom} = F/(bt) = ${mf(F * 1000, 0)}/(${bb}\\cdot ${tt}) \\approx ${mf(signom, 1)}$ MPa. Lokal spenning: $\\sigma_{lokal} = K_t\\sigma_{nom} \\approx ${mf(siglocal, 1)}$ MPa. Sikkerhetsfaktor: $n = R_e/\\sigma_{lokal} \\approx ${mf(nn, 2)}$.`,
       `Nominal stress: $\\sigma_{nom} = F/(bt) = ${mf(F * 1000, 0)}/(${bb}\\cdot ${tt}) \\approx ${mf(signom, 1)}$ MPa. Local stress: $\\sigma_{local} = K_t\\sigma_{nom} \\approx ${mf(siglocal, 1)}$ MPa. Safety factor: $n = R_e/\\sigma_{local} \\approx ${mf(nn, 2)}$.`)]; }
);

// ================= MATS1600 – enhet 1: Toleranser og passninger =================
THEORY("MATS1600", 1, {
nb: `## Hva handler det om?
Ingen del kan lages med et eksakt mål – alt har en produksjonstoleranse. Toleranser og passninger handler om å styre denne unøyaktigheten bevisst: hvor stort avvik fra nominelt mål som er akseptabelt, og hvordan to deler (typisk en aksel i et hull) skal passe sammen – med klaring, med grep (press), eller med en kombinasjon. Riktig valg avgjør om en aksling glir fritt i et lager, om et nav sitter fast på en aksel uten kile, eller om produksjonskostnadene blir unødvendig høye.

## Begreper og formler
- Toleranse (toleransevidde) $=$ øvre grenseavvik $-$ nedre grenseavvik. Lav IT-grad (f.eks. IT6) betyr strammere, dyrere toleranse; høy IT-grad (f.eks. IT11) betyr løsere, billigere toleranse.
- Hullbasissystemet (mest brukt): hullet får bokstaven H, med nedre avvik lik $0$ – hullets minste mål er alltid nominelt mål. Ønsket passning velges ved å endre akselens toleranseklasse.
- Akselbasissystemet: motsatt – akselens øvre avvik er $0$ (bokstav h), og hullets toleranseklasse velges for å gi ønsket passning. Brukes når flere deler skal passe på samme (kjøpte) aksel.
- Klaring $=$ hullmål $-$ akselmål. Positiv klaring betyr at akselen er mindre enn hullet.
- Klaringspassning: klaringen er alltid $\\ge 0$ (minste hull $\\ge$ største aksel). Presspassning: klaringen er alltid $\\le 0$ (minste aksel $>$ største hull, altså grep). Overgangspassning: kan bli enten litt klaring eller litt grep, avhengig av de faktiske målene.
- Overflateruhet $R_a$: det aritmetiske middelavviket for overflateprofilen, i µm. Lavere $R_a$ betyr en finere (glattere) overflate.
- Geometrisk toleransesetting (GD&T) styrer form, orientering og posisjon i tillegg til bare størrelsen.

## Slik løser du oppgavene
1. Les av øvre og nedre grenseavvik for hullet og akselen (i µm, relativt til samme nominelle mål).
2. Regn minste og største tillatte mål for hver del: nominelt mål $+$ avviket.
3. Minste klaring $=$ minste hullmål $-$ største akselmål. Største klaring $=$ største hullmål $-$ minste akselmål.
4. Er begge $\\ge 0$: klaringspassning. Er begge $\\le 0$: presspassning. Er den ene positiv og den andre negativ: overgangspassning.
5. Gjennomsnittlig klaring (nyttig som forventet verdi) er $(\\text{minste} + \\text{største klaring})/2$.

### Eksempel
Et hull er merket Ø30 H7 (øvre avvik $+21$ µm, nedre avvik $0$), og akselen er merket Ø30 js6 (avvik $\\pm 6{,}5$ µm). Klassifiser passningen og finn gjennomsnittlig klaring.
1. Hull: $30{,}000$–$30{,}021$ mm. Aksel: $29{,}9935$–$30{,}0065$ mm.
2. Største klaring: $21-(-6{,}5) = 27{,}5$ µm.
3. Minste klaring: $0-6{,}5 = -6{,}5$ µm (negativ, altså litt grep).
4. Siden det ene ytterpunktet er klaring og det andre er grep, er dette en overgangspassning.
5. Gjennomsnittlig klaring: $(27{,}5+(-6{,}5))/2 = 10{,}5$ µm.

Svar: overgangspassning, med gjennomsnittlig klaring $\\approx 10{,}5$ µm.

## Vanlige feil
- Å blande sammen øvre og nedre avvik når minste/største klaring regnes ut.
- Å tro at et H-hull alltid gir klaringspassning. Passningstypen avhenger av akselens toleranseklasse, ikke bare av hullet.
- Å tro at lav $R_a$ betyr stram måltoleranse. Overflateruhet og måltoleranse er to forskjellige ting.
- Å glemme at negativ klaring betyr grep (overmål), ikke en feil i utregningen.

> Klaring $=$ hullmål $-$ akselmål. Positivt i hele området: klaringspassning. Negativt i hele området: presspassning. Blandet fortegn: overgangspassning.`,
en: `## What is it about?
No part can be made to an exact dimension – everything has a manufacturing tolerance. Tolerances and fits are about controlling this inexactness on purpose: how much deviation from the nominal size is acceptable, and how two parts (typically a shaft in a hole) should fit together – with clearance, with an interference (press) fit, or with a mix of the two. The right choice decides whether a shaft spins freely in a bearing, whether a hub stays fixed on a shaft without a key, or whether manufacturing costs become unnecessarily high.

## Concepts and formulas
- Tolerance (tolerance width) $=$ upper limit deviation $-$ lower limit deviation. A low IT grade (e.g. IT6) means a tighter, more expensive tolerance; a high IT grade (e.g. IT11) means a looser, cheaper tolerance.
- Hole-basis system (most common): the hole is given the letter H, with a lower deviation of $0$ – the smallest hole size is always the nominal size. The desired fit is chosen by changing the shaft's tolerance class.
- Shaft-basis system: the opposite – the shaft's upper deviation is $0$ (letter h), and the hole's tolerance class is chosen to give the desired fit. Used when several parts must fit on the same (purchased) shaft.
- Clearance $=$ hole size $-$ shaft size. Positive clearance means the shaft is smaller than the hole.
- Clearance fit: the clearance is always $\\ge 0$ (smallest hole $\\ge$ largest shaft). Interference fit: the clearance is always $\\le 0$ (smallest shaft $>$ largest hole, i.e. interference). Transition fit: the result can be either a little clearance or a little interference, depending on the actual sizes.
- Surface roughness $R_a$: the arithmetic mean deviation of the surface profile, in µm. A lower $R_a$ means a finer (smoother) surface.
- Geometric dimensioning and tolerancing (GD&T) controls form, orientation and position in addition to just size.

## How to solve the problems
1. Read off the upper and lower limit deviations for the hole and the shaft (in µm, relative to the same nominal size).
2. Compute the smallest and largest allowable size for each part: nominal size $+$ deviation.
3. Smallest clearance $=$ smallest hole size $-$ largest shaft size. Largest clearance $=$ largest hole size $-$ smallest shaft size.
4. If both are $\\ge 0$: clearance fit. If both are $\\le 0$: interference fit. If one is positive and the other negative: transition fit.
5. The average clearance (useful as an expected value) is $(\\text{smallest} + \\text{largest clearance})/2$.

### Example
A hole is marked Ø30 H7 (upper deviation $+21$ µm, lower deviation $0$), and the shaft is marked Ø30 js6 (deviation $\\pm 6.5$ µm). Classify the fit and find the average clearance.
1. Hole: $30.000$–$30.021$ mm. Shaft: $29.9935$–$30.0065$ mm.
2. Largest clearance: $21-(-6.5) = 27.5$ µm.
3. Smallest clearance: $0-6.5 = -6.5$ µm (negative, i.e. a bit of interference).
4. Since one extreme is clearance and the other is interference, this is a transition fit.
5. Average clearance: $(27.5+(-6.5))/2 = 10.5$ µm.

Answer: transition fit, with an average clearance of $\\approx 10.5$ µm.

## Common mistakes
- Mixing up the upper and lower deviations when computing the smallest/largest clearance.
- Believing an H-hole always gives a clearance fit. The type of fit depends on the shaft's tolerance class, not on the hole alone.
- Believing a low $R_a$ means a tight size tolerance. Surface roughness and size tolerance are two different things.
- Forgetting that negative clearance means interference (oversize), not a mistake in the calculation.

> Clearance $=$ hole size $-$ shaft size. Positive throughout: clearance fit. Negative throughout: interference fit. Mixed sign: transition fit.`
});

BIQ("MATS1600", 1, [
 ["Et hull er merket Ø25 H7, med øvre avvik $+21$ µm og nedre avvik $0$. Hva er den største tillatte hulldiameteren?",
  { n: 25.021, tol: 0.001, u: "mm" },
  "Største mål $=$ nominelt mål $+$ øvre avvik $= 25 + 0{,}021 = 25{,}021$ mm.",
  "A hole is marked Ø25 H7, with an upper deviation of $+21$ µm and a lower deviation of $0$. What is the largest allowable hole diameter?",
  null,
  "Largest size $=$ nominal size $+$ upper deviation $= 25 + 0.021 = 25.021$ mm."],
 ["Hva kjennetegner akselbasissystemet, i motsetning til det vanlige hullbasissystemet?",
  ["Akselens øvre avvik er $0$ (bokstav h), og hullets toleranseklasse velges for å gi ønsket passning", "Hullets nedre avvik er alltid negativt", "Det brukes bare for presspassninger", "Det finnes ingen forskjell – navnene er bare historiske"],
  "I akselbasissystemet er akselen «fasit» (øvre avvik $0$), og du velger H-, JS- eller annen toleranseklasse for hullet. Det er nyttig når mange forskjellige deler skal monteres på samme standardiserte aksel.",
  "What characterizes the shaft-basis system, as opposed to the common hole-basis system?",
  ["The shaft's upper deviation is $0$ (letter h), and the hole's tolerance class is chosen to give the desired fit", "The hole's lower deviation is always negative", "It is only used for interference fits", "There is no difference – the names are just historical"],
  "In the shaft-basis system the shaft is the fixed reference (upper deviation $0$), and you choose an H, JS or other tolerance class for the hole. It is useful when many different parts must be mounted on the same standardized shaft."],
 ["Hvilken av disse flatene krever normalt strengest (lavest) $R_a$-krav?",
  ["Tetningsflaten der en roterende akseltetning ligger an", "En ubearbeidet, støpt yttervegg på et hus", "Innsiden av et hus, uten kontakt med andre deler", "Anleggsflaten under et bolthode i et grovt hull"],
  "En roterende tetning er svært følsom for riper og ruhet i kontaktflaten – for høy $R_a$ der gir lekkasje og rask slitasje. De andre flatene har langt løsere krav.",
  "Which of these surfaces normally requires the strictest (lowest) $R_a$ requirement?",
  ["The sealing surface where a rotating shaft seal runs", "A rough, as-cast outer wall of a housing", "The inside of a housing, with no contact to other parts", "The bearing surface under a bolt head in an oversized hole"],
  "A rotating seal is very sensitive to scratches and roughness on the contact surface – too high an $R_a$ there causes leakage and rapid wear. The other surfaces have far looser requirements."],
 ["Et hull er merket Ø50 H8 (øvre avvik $+39$ µm, nedre avvik $0$), og akselen er merket Ø50 js7 (avvik $\\pm 12{,}5$ µm). Hva er gjennomsnittlig klaring?",
  { n: 19.5, tol: 0.3, u: "µm" },
  "Største klaring: $39-(-12{,}5) = 51{,}5$ µm. Minste klaring: $0-12{,}5 = -12{,}5$ µm. Gjennomsnitt: $(51{,}5+(-12{,}5))/2 = 19{,}5$ µm.",
  "A hole is marked Ø50 H8 (upper deviation $+39$ µm, lower deviation $0$), and the shaft is marked Ø50 js7 (deviation $\\pm 12.5$ µm). What is the average clearance?",
  null,
  "Largest clearance: $39-(-12.5) = 51.5$ µm. Smallest clearance: $0-12.5 = -12.5$ µm. Average: $(51.5+(-12.5))/2 = 19.5$ µm."]
]);

GEN("MATS1600", 1,
 // enkel: største/minste tillatte mål fra avvik
 () => { const nom = R.p([16, 20, 25, 30, 40, 50, 60, 80]), up = R.i(10, 60), lo = R.p([0, -R.i(5, 20)]);
   const which = R.p(["max", "min"]); const dev = which === "max" ? up : lo; const val = nom + dev / 1000;
   const devMath = "$" + (dev >= 0 ? "+" : "") + dev + "$", loMath = "$" + (lo >= 0 ? "+" : "") + lo + "$";
   return [T(`Et hull er merket Ø${nom} med øvre avvik $+${up}$ µm og nedre avvik ${loMath} µm. Hva er det ${which === "max" ? "største" : "minste"} tillatte hullmålet?`,
             `A hole is marked Ø${nom} with an upper deviation of $+${up}$ µm and a lower deviation of ${loMath} µm. What is the ${which === "max" ? "largest" : "smallest"} allowable hole size?`),
     { n: val, tol: 0.001, u: "mm" },
     T(`${which === "max" ? "Største" : "Minste"} mål $=$ nominelt mål $+$ ${which === "max" ? "øvre" : "nedre"} avvik $= ${nom}\\text{ mm} + ${devMath}$ µm $\\approx ${mf(val, 3)}$ mm.`,
       `${which === "max" ? "Largest" : "Smallest"} size $=$ nominal size $+$ ${which === "max" ? "upper" : "lower"} deviation $= ${nom}\\text{ mm} + ${devMath}$ µm $\\approx ${mf(val, 3)}$ mm.`)]; },
 // middels: største klaring
 () => { const holeU = R.i(15, 60), shaftL = -R.i(5, 40); const maxC = holeU - shaftL; const shaftLMath = "$" + shaftL + "$";
   return [T(`Et hull har øvre avvik $+${holeU}$ µm (nedre avvik $0$), og en aksel har nedre avvik ${shaftLMath} µm. Hva er den største klaringen?`,
             `A hole has an upper deviation of $+${holeU}$ µm (lower deviation $0$), and a shaft has a lower deviation of ${shaftLMath} µm. What is the largest clearance?`),
     { n: maxC, tol: 0.5, u: "µm" },
     T(`Største klaring $=$ største hullmål $-$ minste akselmål $= ${holeU}-(${shaftL}) = ${maxC}$ µm.`,
       `Largest clearance $=$ largest hole size $-$ smallest shaft size $= ${holeU}-(${shaftL}) = ${maxC}$ µm.`)]; },
 // eksamen: full klassifisering og gjennomsnittlig klaring
 () => { const holeU = R.i(20, 60), shaftDev = R.i(6, 20);
   const maxC = holeU - (-shaftDev), minC = 0 - shaftDev, meanC = (maxC + minC) / 2;
   const kind = minC >= 0 ? T("klaringspassning", "clearance fit") : (maxC <= 0 ? T("presspassning", "interference fit") : T("overgangspassning", "transition fit"));
   return [T(`Et hull har øvre avvik $+${holeU}$ µm (nedre avvik $0$), og en aksel har avvik $\\pm${shaftDev}$ µm. Hva er gjennomsnittlig klaring?`,
             `A hole has an upper deviation of $+${holeU}$ µm (lower deviation $0$), and a shaft has a deviation of $\\pm${shaftDev}$ µm. What is the average clearance?`),
     { n: meanC, tol: 0.5, u: "µm" },
     T(`Største klaring: $${holeU}-(-${shaftDev}) = ${maxC}$ µm. Minste klaring: $0-${shaftDev} = ${minC}$ µm. Dette er en ${kind}. Gjennomsnitt: $(${maxC}+(${minC}))/2 = ${meanC}$ µm.`,
       `Largest clearance: $${holeU}-(-${shaftDev}) = ${maxC}$ µm. Smallest clearance: $0-${shaftDev} = ${minC}$ µm. This is a ${kind}. Average: $(${maxC}+(${minC}))/2 = ${meanC}$ µm.`)]; }
);

// ================= MATS1600 – enhet 2: Maskinelementer =================
THEORY("MATS1600", 2, {
nb: `## Hva handler det om?
Maskinelementer er de gjenbrukbare byggeklossene en maskinkonstruktør setter sammen: tannhjul og reimer som overfører og endrer turtall og moment, bolter og kiler som holder deler sammen og overfører kraft, lagre som lar aksler rotere med lite friksjon og lang levetid, og fjærer som lagrer energi eller tar opp bevegelse. Denne enheten samler formlene som knytter dem sammen, slik at du kan regne gjennom en hel kraftoverføringskjede fra motor til utgangsaksel.

## Begreper og formler
- Utveksling: $i = n_1/n_2 = z_2/z_1$ (tannhjul) $= d_2/d_1$ (remskiver). Ved ideell (tapsfri) overføring: $T_2 = iT_1$.
- Effekt og moment: $P = T\\omega = \\dfrac{2\\pi nT}{60}$, med $n$ i o/min og $T$ i Nm gir $P$ i watt.
- Virkningsgrad $\\eta = P_{ut}/P_{inn}$. For flere trinn i serie: $\\eta_{tot} = \\eta_1\\eta_2\\cdots$.
- Lagerlevetid (kulelager): $L_{10} = (C/P)^3$ millioner omdreininger, der $C$ er dynamisk bæretall og $P$ er belastningen. For rullelager brukes eksponenten $10/3$.
- Fjærstivhet $k = F/x$. Parallelt: $k_{tot} = k_1+k_2$. I serie: $1/k_{tot} = 1/k_1+1/k_2$.
- Boltforspenning: momentnøkkelen gir $T \\approx KFd$, der $K \\approx 0{,}2$ for tørre gjenger. Styrkeklasse X.Y gir omtrent $R_m \\approx 100X$ MPa og $R_e \\approx 0{,}1XY\\cdot R_m$.
- Selvlåsing i gjenger: en gjenget forbindelse er selvlåsende når friksjonsvinkelen i gjengene er større enn stigningsvinkelen, akkurat som en kloss som blir stående på et skråplan.

## Slik løser du oppgavene
1. Kartlegg kraftoverføringskjeden: hvilke elementer sitter i serie, og hva er utvekslingen i hvert trinn?
2. Regn turtall trinn for trinn med $i = n_{inn}/n_{ut}$, og trekk fra tap ved å multiplisere effekten med virkningsgraden i hvert trinn.
3. Finn moment fra $T = P/\\omega$ der du faktisk trenger det – ikke anta at moment er det samme gjennom hele kjeden.
4. For enkeltelementer (lager, fjær, bolt): sett tallene rett inn i elementets egen formel.
5. Sjekk størrelsesorden: lavt turtall skal alltid følges av høyt moment (og omvendt) for samme effekt.

### Eksempel
En girkasse har to trinn med utveksling $i_1 = 3$ og $i_2 = 2{,}5$, hver med virkningsgrad $0{,}97$. Inngangen roterer med 1450 o/min og mottar 15 kW. Finn utgangsmomentet.
1. Utgående turtall: $n_{ut} = 1450/(3\\cdot 2{,}5) \\approx 193{,}3$ o/min, altså $\\omega_{ut} = 2\\pi\\cdot 193{,}3/60 \\approx 20{,}2$ rad/s.
2. Utgående effekt: $P_{ut} = 15\\,000\\cdot 0{,}97\\cdot 0{,}97 \\approx 14\\,114$ W.
3. Utgangsmoment: $T_{ut} = P_{ut}/\\omega_{ut} \\approx 14\\,114/20{,}2 \\approx 697$ Nm.

Svar: $T_{ut} \\approx 697$ Nm.

## Vanlige feil
- Å anta at moment er likt gjennom hele kjeden. Det er effekten (minus tap) som «overlever» tilnærmet uendret, ikke momentet.
- Å glemme virkningsgraden i flertrinns systemer – tapene multipliseres, de legges ikke sammen.
- Å legge sammen fjærstivheter i serie (skal være i parallell) eller omvendt.
- Å bruke $L_{10}$-eksponenten for kulelager (3) på rullelager, som bruker $10/3$.

> Effekt overføres (minus tap), men turtall og moment endres med utvekslingen: lavt turtall gir høyt moment for samme effekt.`,
en: `## What is it about?
Machine elements are the reusable building blocks a machine designer assembles: gears and belts that transmit and change speed and torque, bolts and keys that hold parts together and transmit force, bearings that let shafts rotate with low friction and a long life, and springs that store energy or absorb motion. This unit collects the formulas that tie them together, so you can work through an entire power-transmission chain from motor to output shaft.

## Concepts and formulas
- Gear ratio: $i = n_1/n_2 = z_2/z_1$ (gears) $= d_2/d_1$ (pulleys). For an ideal (lossless) transmission: $T_2 = iT_1$.
- Power and torque: $P = T\\omega = \\dfrac{2\\pi nT}{60}$, with $n$ in rpm and $T$ in Nm giving $P$ in watts.
- Efficiency $\\eta = P_{out}/P_{in}$. For several stages in series: $\\eta_{tot} = \\eta_1\\eta_2\\cdots$.
- Bearing life (ball bearing): $L_{10} = (C/P)^3$ million revolutions, where $C$ is the dynamic load rating and $P$ is the applied load. Roller bearings use the exponent $10/3$.
- Spring stiffness $k = F/x$. In parallel: $k_{tot} = k_1+k_2$. In series: $1/k_{tot} = 1/k_1+1/k_2$.
- Bolt preload: a torque wrench gives $T \\approx KFd$, where $K \\approx 0.2$ for dry threads. Strength class X.Y gives roughly $R_m \\approx 100X$ MPa and $R_e \\approx 0.1XY\\cdot R_m$.
- Self-locking threads: a threaded joint is self-locking when the friction angle in the threads is larger than the lead angle, just like a block that stays put on an incline.

## How to solve the problems
1. Map out the power-transmission chain: which elements are in series, and what is the gear ratio at each stage?
2. Compute speed stage by stage with $i = n_{in}/n_{out}$, and subtract losses by multiplying the power by the efficiency of each stage.
3. Find the torque from $T = P/\\omega$ wherever you actually need it – do not assume the torque is the same throughout the chain.
4. For individual elements (bearing, spring, bolt): plug the numbers directly into that element's own formula.
5. Check the order of magnitude: a low speed must always come with a high torque (and vice versa) for the same power.

### Example
A gearbox has two stages with ratios $i_1 = 3$ and $i_2 = 2.5$, each with an efficiency of $0.97$. The input rotates at 1450 rpm and receives 15 kW. Find the output torque.
1. Output speed: $n_{out} = 1450/(3\\cdot 2.5) \\approx 193.3$ rpm, so $\\omega_{out} = 2\\pi\\cdot 193.3/60 \\approx 20.2$ rad/s.
2. Output power: $P_{out} = 15,000\\cdot 0.97\\cdot 0.97 \\approx 14,114$ W.
3. Output torque: $T_{out} = P_{out}/\\omega_{out} \\approx 14,114/20.2 \\approx 697$ Nm.

Answer: $T_{out} \\approx 697$ Nm.

## Common mistakes
- Assuming the torque is the same throughout the chain. It is the power (minus losses) that survives almost unchanged, not the torque.
- Forgetting the efficiency in multi-stage systems – the losses multiply, they do not add.
- Adding spring stiffnesses in series (should be in parallel), or the reverse.
- Using the ball-bearing $L_{10}$ exponent (3) for a roller bearing, which uses $10/3$.

> Power is transmitted (minus losses), but speed and torque change with the gear ratio: a low speed gives a high torque for the same power.`
});

BIQ("MATS1600", 2, [
 ["Et tannhjul med 18 tenner driver et hjul med 54 tenner. Inngående moment er 40 Nm. Hva blir utgående moment, når vi ser bort fra tap?",
  { n: 120, tol: 1.2, u: "Nm" },
  "$i = z_2/z_1 = 54/18 = 3$. Uten tap er $T_2 = iT_1 = 3\\cdot 40 = 120$ Nm.",
  "A gear with 18 teeth drives a gear with 54 teeth. The input torque is 40 Nm. What is the output torque, neglecting losses?",
  null,
  "$i = z_2/z_1 = 54/18 = 3$. Without losses, $T_2 = iT_1 = 3\\cdot 40 = 120$ Nm."],
 ["To fjærer med samme stivhet $k$ kobles i serie. Hva blir den ekvivalente stivheten sammenlignet med én fjær alene?",
  ["Halvparten så stor", "Dobbelt så stor", "Fire ganger så stor", "Uendret"],
  "I serie er $1/k_{tot} = 1/k+1/k = 2/k$, så $k_{tot} = k/2$: halvparten av stivheten til én fjær. (I parallell hadde det blitt $2k$.)",
  "Two springs with the same stiffness $k$ are connected in series. What is the equivalent stiffness compared with a single spring alone?",
  ["Half as large", "Twice as large", "Four times as large", "Unchanged"],
  "In series, $1/k_{tot} = 1/k+1/k = 2/k$, so $k_{tot} = k/2$: half the stiffness of a single spring. (In parallel it would have been $2k$.)"],
 ["Hvorfor er de fleste maskinskruer selvlåsende, slik at de ikke løsner av seg selv under vibrasjon eller last?",
  ["Friksjonsvinkelen i gjengene er større enn stigningsvinkelen, akkurat som en kloss som blir stående på et bratt nok skråplan", "Gjengene er limt fra fabrikken", "Skruer har alltid låsemutter", "Det er ren tilfeldighet, og de fleste skruer løsner faktisk lett"],
  "En gjenget forbindelse oppfører seg som en kloss på et skråplan med helningsvinkel lik stigningsvinkelen. Er friksjonsvinkelen større enn denne, holder forbindelsen seg fast uten ekstra moment.",
  "Why are most machine screws self-locking, so that they do not come loose by themselves under vibration or load?",
  ["The friction angle in the threads is larger than the lead angle, just like a block that stays put on a steep enough incline", "The threads are glued at the factory", "Screws always have a locknut", "It is pure chance, and most screws actually loosen easily"],
  "A threaded joint behaves like a block on an incline whose angle equals the lead angle. If the friction angle is larger than this, the joint stays put without any extra torque."],
 ["En girkasse har to trinn med utveksling $i_1 = 4$ og $i_2 = 2$, hver med virkningsgrad $0{,}96$ og $0{,}98$. Inngangen roterer med 1750 o/min og mottar 22 kW. Hva blir utgangsmomentet?",
  { n: 903.5, tol: 9, u: "Nm" },
  "$n_{ut} = 1750/(4\\cdot 2) = 218{,}75$ o/min, så $\\omega_{ut} = 2\\pi\\cdot 218{,}75/60 \\approx 22{,}9$ rad/s. $P_{ut} = 22\\,000\\cdot 0{,}96\\cdot 0{,}98 \\approx 20\\,698$ W. $T_{ut} = P_{ut}/\\omega_{ut} \\approx 903{,}5$ Nm.",
  "A gearbox has two stages with ratios $i_1 = 4$ and $i_2 = 2$, with efficiencies $0.96$ and $0.98$. The input rotates at 1750 rpm and receives 22 kW. What is the output torque?",
  null,
  "$n_{out} = 1750/(4\\cdot 2) = 218.75$ rpm, so $\\omega_{out} = 2\\pi\\cdot 218.75/60 \\approx 22.9$ rad/s. $P_{out} = 22,000\\cdot 0.96\\cdot 0.98 \\approx 20,698$ W. $T_{out} = P_{out}/\\omega_{out} \\approx 903.5$ Nm."]
]);

GEN("MATS1600", 2,
 // enkel: ekvivalent fjærstivhet, serie eller parallell
 () => { const k1 = R.i(100, 900), k2 = R.i(100, 900), ser = R.p([true, false]);
   const keq = ser ? 1 / (1 / k1 + 1 / k2) : k1 + k2;
   return [T(`Fjærer med $k_1 = ${k1}$ N/m og $k_2 = ${k2}$ N/m kobles i ${ser ? "serie" : "parallell"}. Hva er den ekvivalente stivheten?`,
             `Springs with $k_1 = ${k1}$ N/m and $k_2 = ${k2}$ N/m are connected in ${ser ? "series" : "parallel"}. What is the equivalent stiffness?`),
     { n: keq, tol: rel(keq), u: "N/m" },
     ser ? T(`I serie: $1/k_{tot} = 1/k_1+1/k_2 = 1/${k1}+1/${k2}$, så $k_{tot} \\approx ${mf(keq, 1)}$ N/m.`,
              `In series: $1/k_{tot} = 1/k_1+1/k_2 = 1/${k1}+1/${k2}$, so $k_{tot} \\approx ${mf(keq, 1)}$ N/m.`)
         : T(`I parallell: $k_{tot} = k_1+k_2 = ${k1}+${k2} = ${keq}$ N/m.`,
              `In parallel: $k_{tot} = k_1+k_2 = ${k1}+${k2} = ${keq}$ N/m.`)]; },
 // middels: utgående moment fra utveksling
 () => { const z1 = R.i(12, 25), z2 = R.i(z1 + 10, z1 + 70), T1 = R.f(5, 80, 1);
   const i = z2 / z1, T2 = T1 * i;
   return [T(`Et tannhjul med ${z1} tenner driver et hjul med ${z2} tenner. Inngående moment er ${nf(T1)} Nm. Hva blir utgående moment, når vi ser bort fra tap?`,
             `A gear with ${z1} teeth drives a gear with ${z2} teeth. The input torque is ${nf(T1)} Nm. What is the output torque, neglecting losses?`),
     { n: T2, tol: rel(T2), u: "Nm" },
     T(`$i = z_2/z_1 = ${z2}/${z1} \\approx ${mf(i, 3)}$. Uten tap: $T_2 = iT_1 \\approx ${mf(i, 3)}\\cdot ${mf(T1)} \\approx ${mf(T2, 1)}$ Nm.`,
       `$i = z_2/z_1 = ${z2}/${z1} \\approx ${mf(i, 3)}$. Without losses: $T_2 = iT_1 \\approx ${mf(i, 3)}\\cdot ${mf(T1)} \\approx ${mf(T2, 1)}$ Nm.`)]; },
 // eksamen: totrinns girkasse med virkningsgrad
 () => { const i1 = R.p([2, 2.5, 3, 3.5, 4]), i2 = R.p([1.5, 2, 2.5, 3]), eta1 = R.f(0.93, 0.98, 0.01), eta2 = R.f(0.93, 0.98, 0.01);
   const n1 = R.i(700, 3000), P1 = R.f(5, 60, 1);
   const nOut = n1 / (i1 * i2), wOut = nOut * 2 * Math.PI / 60, Pout = P1 * 1000 * eta1 * eta2, Tout = Pout / wOut;
   return [T(`En girkasse har to trinn med utveksling $i_1 = ${nf(i1)}$ og $i_2 = ${nf(i2)}$, med virkningsgrad ${nf(eta1)} og ${nf(eta2)}. Inngangen roterer med ${n1} o/min og mottar ${nf(P1)} kW. Hva blir utgangsmomentet?`,
             `A gearbox has two stages with ratios $i_1 = ${nf(i1)}$ and $i_2 = ${nf(i2)}$, with efficiencies ${nf(eta1)} and ${nf(eta2)}. The input rotates at ${n1} rpm and receives ${nf(P1)} kW. What is the output torque?`),
     { n: Tout, tol: rel(Tout), u: "Nm" },
     T(`$n_{ut} = ${n1}/(${nf(i1)}\\cdot ${nf(i2)}) \\approx ${mf(nOut, 1)}$ o/min, så $\\omega_{ut} \\approx ${mf(wOut, 2)}$ rad/s. $P_{ut} = ${mf(P1 * 1000, 0)}\\cdot ${mf(eta1)}\\cdot ${mf(eta2)} \\approx ${mf(Pout, 0)}$ W. $T_{ut} = P_{ut}/\\omega_{ut} \\approx ${mf(Tout, 1)}$ Nm.`,
       `$n_{out} = ${n1}/(${nf(i1)}\\cdot ${nf(i2)}) \\approx ${mf(nOut, 1)}$ rpm, so $\\omega_{out} \\approx ${mf(wOut, 2)}$ rad/s. $P_{out} = ${mf(P1 * 1000, 0)}\\cdot ${mf(eta1)}\\cdot ${mf(eta2)} \\approx ${mf(Pout, 0)}$ W. $T_{out} = P_{out}/\\omega_{out} \\approx ${mf(Tout, 1)}$ Nm.`)]; }
);

// __SLUTT__
})();
