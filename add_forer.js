// ============================================================
//  add_forer.js – Førerkort: teori og spørsmål til teoriprøven for klasse B (bil) og A1/A2/A (motorsykkel).
//  Studiet «forer» har sitt eget oppsett (drive.js): teori, øving per kategori, teoriprøve (45 spørsmål, 90 min,
//  maks 7 feil) og oversikt over hvor man ligger an. Enhetene er kategoriene i prøven.
//  DQ(kode, enhet, liste) legger spørsmålene inn som vanlige flervalgsoppgaver (BIQ) og husker bildet (skilt/lys/linje)
//  i DRIVE_IMG, som tegnes i drive.js. MC deler de generelle trafikkreglene med bil (SHAREUNIT).
// ============================================================
GROUP_NAMES["Førerkort"] = ["Førerkort", "Driving licence"];
const DRIVE_IMG = {}; // "KODE:enhet:indeks" → navn på bilde
const FK_EQ = { nb: "Teoriprøven hos Statens vegvesen", en: "The theory test at the Norwegian Public Roads Administration" };
NEWCOURSE({ code: "FKB", study: "forer", group: "Førerkort", nb: "Førerkort bil (klasse B)", en: "Car licence (class B)", s: ["B", "B"], eqText: FK_EQ, units: [] });
NEWCOURSE({ code: "FKMC", study: "forer", group: "Førerkort", nb: "Førerkort MC (A1, A2, A)", en: "Motorcycle licence (A1, A2, A)", s: ["MC", "MC"], eqText: FK_EQ, units: [] });
// Hvert spørsmål: [bilde|null, nbSpørsmål, [RIKTIG, feil, feil, feil], nbForklaring, enSpørsmål, [RIGHT, wrong, …], enForklaring]
function DQ(code, u, list){
  const c = COURSES.find(x => x.code === code), n0 = c.units[u].qs.length;
  BIQ(code, u, list.map(q => q.slice(1)));
  list.forEach((q, i) => { if(q[0]) DRIVE_IMG[code + ":" + u + ":" + (n0 + i)] = q[0]; });
}
(() => {
const U = (code, nb, en, thNb, thEn, qs) => { const u = ADDUNIT(code, nb, en); THEORY(code, u, { nb: thNb, en: thEn }); DQ(code, u, qs); return u; };

// ===================== BIL (klasse B) =====================
U("FKB", "Vikeplikt og forkjørsrett", "Right of way",
`## Hvem skal vike?
Vikeplikt betyr at du skal kjøre slik at den du har vikeplikt for, ikke må endre fart eller retning brått. Du viser tydelig, i god tid, at du vil vike (senk farten).

![fig:fk_vikeplikt]

## Høyreregelen
I kryss uten skilt, oppmerking eller lys har du **vikeplikt for kjørende som kommer fra høyre**.

## Skilt som styrer vikeplikten
- **Vikeplikt** (trekant med spissen ned): gi fri vei for kjørende på vegen du skal inn på. Stans om nødvendig ved vikepliktlinjen («haitenner»).
- **Stopp** (åttekant): stans helt ved stopplinjen, og vik deretter.
- **Forkjørsvei** (gul rute): kjørende fra sidevegene har vikeplikt for deg. Skiltet med svart strek betyr at forkjørsvegen slutter.

## Andre regler
- Kjører du ut fra parkeringsplass, gårdsplass, bensinstasjon, gang- og sykkelveg eller over fortau, har du vikeplikt for **alle**.
- Svinger du til venstre, har du vikeplikt for **møtende** som kjører rett fram eller svinger til høyre.
- I rundkjøring med vikepliktskilt viker du for dem som allerede kjører i rundkjøringen.
- Gi fri vei for utrykningskjøretøy med blått blinklys.
- Gi fotgjengere som er i eller på vei ut i et gangfelt, anledning til å gå over.
> Politiets tegn gjelder foran trafikklys, skilt og vikepliktsregler.`,
`## Who must give way?
Giving way means driving so that the person you give way to does not have to change speed or direction suddenly. Show clearly and in good time that you will give way (slow down).

![fig:fk_vikeplikt]

## The right-hand rule
At junctions without signs, markings or lights, you **give way to traffic coming from the right**.

## Signs that control right of way
- **Give way** (triangle pointing down): give way to traffic on the road you are entering. Stop if needed at the give-way line ("shark teeth").
- **Stop** (octagon): stop completely at the stop line, then give way.
- **Priority road** (yellow diamond): traffic from side roads must give way to you. The sign with a black stripe means the priority road ends.

## Other rules
- When driving out of a car park, yard, petrol station, footpath/cycle path or across a pavement, you give way to **everyone**.
- When turning left, you give way to **oncoming** traffic going straight on or turning right.
- In a roundabout with give-way signs, you give way to those already in the roundabout.
- Give way to emergency vehicles with blue flashing lights.
- Let pedestrians who are on or stepping onto a pedestrian crossing cross.
> Police signals take priority over traffic lights, signs and right-of-way rules.`,
[
 [null, "Du kommer til et kryss uten skilt, oppmerking eller lys. Hvem har du vikeplikt for?", ["Kjørende som kommer fra høyre", "Kjørende som kommer fra venstre", "Ingen, den som kommer først kjører først", "Bare tunge kjøretøy"],
  "Høyreregelen: i kryss uten regulering har du vikeplikt for kjørende fra høyre.",
  "You come to a junction without signs, markings or lights. Who must you give way to?", ["Traffic coming from the right", "Traffic coming from the left", "Nobody, first come first served", "Only heavy vehicles"],
  "The right-hand rule: at unregulated junctions you give way to traffic from the right."],
 ["vikeplikt", "Hva betyr dette skiltet?", ["Vikeplikt: gi fri vei for kjørende på vegen du skal inn på", "Stopp alltid helt", "Du kjører på forkjørsvei", "Farlig kryss uten vikeplikt"],
  "Trekanten med spissen ned og rød kant er vikepliktskiltet. Du må ikke nødvendigvis stanse, men du skal vike.",
  "What does this sign mean?", ["Give way to traffic on the road you are entering", "Always stop completely", "You are on a priority road", "Dangerous junction without give-way"],
  "The triangle pointing down with a red border is the give-way sign. You do not always have to stop, but you must give way."],
 ["stopp", "Hva skal du gjøre ved dette skiltet?", ["Stanse helt ved stopplinjen og deretter vike for kryssende trafikk", "Senke farten og kjøre hvis det er fritt", "Stanse bare hvis det kommer trafikk", "Stanse bare om natten"],
  "Stoppskiltet krever full stans, også når vegen ser fri ut. Deretter har du vikeplikt.",
  "What must you do at this sign?", ["Stop completely at the stop line and then give way to crossing traffic", "Slow down and drive on if it is clear", "Stop only if there is traffic", "Stop only at night"],
  "The stop sign requires a full stop, even when the road looks clear. Then you must give way."],
 ["forkjorsvei", "Hva betyr dette skiltet?", ["Du kjører på forkjørsvei, og kjørende fra sidevegene har vikeplikt for deg", "Du har vikeplikt for alle", "Forkjørsvegen slutter", "Veiarbeid"],
  "Den gule ruten med hvit kant betyr forkjørsvei. Vær likevel oppmerksom på dem som ikke overholder vikeplikten.",
  "What does this sign mean?", ["You are on a priority road, and traffic from side roads must give way to you", "You must give way to everyone", "The priority road ends", "Roadworks"],
  "The yellow diamond with a white border means priority road. Still watch out for those who fail to give way."],
 ["slutt_forkjorsvei", "Hva betyr dette skiltet?", ["Forkjørsvegen slutter, og vanlige vikepliktsregler gjelder videre", "Forkjørsvei begynner", "Innkjøring forbudt", "Du har alltid vikeplikt fra nå av"],
  "Den gule ruten med svart strek betyr slutt på forkjørsvei. Ofte gjelder høyreregelen etterpå.",
  "What does this sign mean?", ["The priority road ends, and the normal right-of-way rules apply", "A priority road begins", "No entry", "From now on you must always give way"],
  "The yellow diamond with a black stripe means end of priority road. Often the right-hand rule applies afterwards."],
 [null, "Du skal kjøre ut fra en parkeringsplass og inn på en veg. Hva gjelder?", ["Du har vikeplikt for alle kjørende på vegen", "Høyreregelen gjelder", "Du har forkjørsrett hvis du kommer fra høyre", "Du har bare vikeplikt for trafikk fra venstre"],
  "Den som kjører ut fra parkeringsplass, gårdsplass, bensinstasjon og liknende, har vikeplikt for alle.",
  "You are driving out of a car park onto a road. What applies?", ["You must give way to all traffic on the road", "The right-hand rule applies", "You have priority if you come from the right", "You only give way to traffic from the left"],
  "Anyone driving out of a car park, yard, petrol station and similar must give way to everyone."],
 [null, "Du skal svinge til venstre i et kryss. En bil kommer mot deg og skal kjøre rett fram. Hvem skal vike?", ["Du skal vike for den møtende bilen", "Den møtende bilen skal vike for deg", "Den som kom først til krysset", "Den som har størst bil"],
  "Når du svinger til venstre, har du vikeplikt for møtende som kjører rett fram eller svinger til høyre.",
  "You are turning left at a junction. A car is coming towards you and going straight on. Who must give way?", ["You must give way to the oncoming car", "The oncoming car must give way to you", "Whoever reached the junction first", "Whoever has the bigger car"],
  "When you turn left, you must give way to oncoming traffic going straight on or turning right."],
 ["rundkjoring", "Du skal inn i en rundkjøring med vikepliktskilt. Hvem har vikeplikt?", ["Du, for dem som allerede kjører i rundkjøringen", "De som kjører i rundkjøringen, for deg", "Den som kommer fra høyre", "Ingen, det er fri flyt"],
  "Rundkjøringer er som regel skiltet med vikeplikt for dem som skal inn.",
  "You are entering a roundabout with give-way signs. Who must give way?", ["You, to those already in the roundabout", "Those in the roundabout, to you", "Whoever comes from the right", "Nobody, it is free flow"],
  "Roundabouts are normally signed with give-way for those entering."],
 [null, "Et utrykningskjøretøy med blått blinklys og sirene nærmer seg bakfra. Hva gjør du?", ["Gir fri vei, for eksempel ved å kjøre til siden og om nødvendig stanse", "Fortsetter som før, du har forkjørsrett", "Stanser brått midt i vegen", "Øker farten for å komme unna"],
  "Du skal gi fri vei for utrykningskjøretøy, men på en trygg måte uten brå manøvrer.",
  "An emergency vehicle with blue lights and a siren approaches from behind. What do you do?", ["Give way, for example by pulling over and stopping if necessary", "Continue as before, you have priority", "Stop suddenly in the middle of the road", "Speed up to get away"],
  "You must give way to emergency vehicles, but safely and without sudden manoeuvres."],
 ["gangfelt", "En fotgjenger står ved et gangfelt og skal tydelig gå over. Hva skal du gjøre?", ["Gi fotgjengeren anledning til å gå over", "Kjøre, fordi fotgjengeren ikke er ute i vegen ennå", "Tute for å varsle", "Bare stanse hvis fotgjengeren er et barn"],
  "Du skal gi fotgjengere som er i eller på vei ut i gangfeltet, anledning til å gå over.",
  "A pedestrian is standing at a pedestrian crossing, clearly about to cross. What should you do?", ["Let the pedestrian cross", "Drive on, the pedestrian is not in the road yet", "Sound the horn", "Only stop if the pedestrian is a child"],
  "You must let pedestrians who are on or about to step onto the crossing cross."],
 [null, "I tettbygd strøk med fartsgrense 50 km/t gir en buss tegn til at den skal kjøre ut fra holdeplassen. Hva gjør du?", ["Gir bussen anledning til å kjøre ut", "Kjører forbi raskt før bussen kjører ut", "Bussen har vikeplikt for deg", "Tuter for å stoppe bussen"],
  "I tettbygd strøk med fartsgrense 60 km/t eller lavere skal du gi buss som gir tegn, anledning til å kjøre ut fra holdeplass.",
  "In a built-up area with a 50 km/h limit, a bus signals that it is pulling out from a stop. What do you do?", ["Let the bus pull out", "Overtake quickly before it pulls out", "The bus must give way to you", "Sound the horn to stop the bus"],
  "In built-up areas with a limit of 60 km/h or lower, you must let a signalling bus pull out from a stop."],
 [null, "Lyset viser grønt for deg, men en politibetjent i krysset gir tegn til at du skal stanse. Hva gjelder?", ["Politiets tegn: du skal stanse", "Trafikklyset: du kan kjøre", "Det som er tryggest for deg", "Høyreregelen"],
  "Politiets tegn gjelder foran trafikklys, skilt og vikepliktsregler.",
  "The light is green for you, but a police officer in the junction signals you to stop. What applies?", ["The police signal: you must stop", "The traffic light: you may go", "Whatever is safest for you", "The right-hand rule"],
  "Police signals take priority over traffic lights, signs and right-of-way rules."],
 ["haitenner", "Hva betyr trekantene («haitennene») som er malt tvers over kjørefeltet?", ["Vikepliktlinje: her stanser du om nødvendig når du har vikeplikt", "Fartshump", "Stopplinje der du alltid må stanse", "Sykkelfelt"],
  "Vikepliktlinjen viser hvor du skal stanse hvis du må vike.",
  "What do the triangles (\"shark teeth\") painted across the lane mean?", ["Give-way line: stop here if needed when you must give way", "Speed bump", "Stop line where you must always stop", "Cycle lane"],
  "The give-way line shows where to stop if you have to give way."],
 [null, "Du kjører bil ut fra en gang- og sykkelveg og inn på kjørevegen. Hva gjelder?", ["Du har vikeplikt for alle på vegen du kjører inn på", "Høyreregelen gjelder", "De på kjørevegen har vikeplikt for deg", "Du kan kjøre fordi du er på en veg"],
  "Kjørende som kommer fra gang- og sykkelveg, har vikeplikt for alle.",
  "You drive a car out of a footpath/cycle path onto the carriageway. What applies?", ["You must give way to everyone on the road you enter", "The right-hand rule applies", "Traffic on the road must give way to you", "You may go because you are on a road"],
  "Vehicles coming from a footpath/cycle path must give way to everyone."]
]);

U("FKB", "Skilt og vegoppmerking", "Signs and road markings",
`## Skiltgruppene
Formen og fargen forteller hva slags skilt det er:
- **Fareskilt:** trekant med rød kant og spissen opp. Varsler om fare.
- **Forbudsskilt:** runde med rød kant. Noe er forbudt.
- **Påbudsskilt:** runde og blå. Noe er påbudt.
- **Opplysningsskilt:** blå firkant. Gir opplysninger (gangfelt, parkering, blindveg).
- **Underskilt:** små skilt under et annet skilt som gir tilleggsopplysninger eller begrenser skiltet.
- Midlertidige skilt, for eksempel ved vegarbeid, har **gul bunn**.

![fig:fk_skiltgrupper]

## Vegoppmerking
- **Gul** linje skiller trafikk i motsatt kjøreretning. **Hvit** linje skiller felt i samme retning og markerer kanten av vegen.
- **Sperrelinje** (heltrukket): skal ikke krysses eller kjøres på.
- **Varsellinje** (lange streker, korte mellomrom): varsler om sperrelinje eller fare lenger fram.
- **Ledelinje** (korte streker, lange mellomrom): viser midten eller feltene; kan krysses når det er trygt.
- **Stopplinje** (hel tverrgående linje) og **vikepliktlinje** (haitenner).

![fig:fk_linjer]`,
`## Groups of signs
The shape and colour tell you what kind of sign it is:
- **Warning signs:** triangle with a red border pointing up. Warn of danger.
- **Prohibitory signs:** round with a red border. Something is forbidden.
- **Mandatory signs:** round and blue. Something is required.
- **Information signs:** blue rectangle. Give information (pedestrian crossing, parking, dead end).
- **Supplementary plates:** small plates under another sign that add information or limit the sign.
- Temporary signs, for example at roadworks, have a **yellow background**.

![fig:fk_skiltgrupper]

## Road markings
- A **yellow** line separates traffic in opposite directions. A **white** line separates lanes in the same direction and marks the edge of the road.
- **Solid line**: must not be crossed or driven on.
- **Warning line** (long dashes, short gaps): warns of a solid line or danger ahead.
- **Guide line** (short dashes, long gaps): marks the centre or lanes; may be crossed when safe.
- **Stop line** (solid line across) and **give-way line** (shark teeth).

![fig:fk_linjer]`,
[
 ["fare_generell", "Hva slags skilt er en trekant med rød kant og spissen opp?", ["Fareskilt", "Forbudsskilt", "Påbudsskilt", "Opplysningsskilt"],
  "Fareskilt er trekanter med rød kant og spissen opp. De varsler om fare lenger fram.",
  "What kind of sign is a triangle with a red border pointing up?", ["Warning sign", "Prohibitory sign", "Mandatory sign", "Information sign"],
  "Warning signs are triangles with a red border pointing up. They warn of danger ahead."],
 ["pabud_hoyre", "Hva slags skilt er rundt og blått med et hvitt symbol?", ["Påbudsskilt", "Forbudsskilt", "Fareskilt", "Serviceskilt"],
  "Runde, blå skilt forteller hva du skal gjøre, for eksempel hvilken retning du skal kjøre.",
  "What kind of sign is round and blue with a white symbol?", ["Mandatory sign", "Prohibitory sign", "Warning sign", "Service sign"],
  "Round blue signs tell you what you must do, for example which direction to drive."],
 ["innkjoring_forbudt", "Hva betyr dette skiltet?", ["Innkjøring forbudt", "Stans forbudt", "Parkering forbudt", "Enveiskjøring"],
  "Rødt rundt skilt med hvit tverrstrek betyr innkjøring forbudt, typisk i enden av en envegskjørt gate.",
  "What does this sign mean?", ["No entry", "No stopping", "No parking", "One-way street"],
  "A red round sign with a white bar means no entry, typically at the end of a one-way street."],
 ["parkering_forbudt", "Hva betyr dette skiltet?", ["Parkering forbudt", "Stans forbudt", "Innkjøring forbudt", "Parkering tillatt"],
  "Blått skilt med rød kant og én rød skråstrek betyr parkering forbudt. Du kan stanse kort for å slippe av og på.",
  "What does this sign mean?", ["No parking", "No stopping", "No entry", "Parking allowed"],
  "A blue sign with a red border and one red diagonal means no parking. You may stop briefly to drop off or pick up."],
 ["stans_forbudt", "Hva betyr dette skiltet?", ["Stans forbudt", "Parkering forbudt", "Kryss", "Innkjøring forbudt"],
  "Blått skilt med rød kant og rødt kryss betyr stans forbudt: du skal ikke stanse, heller ikke kort.",
  "What does this sign mean?", ["No stopping", "No parking", "Junction", "No entry"],
  "A blue sign with a red border and a red cross means no stopping: you must not stop, not even briefly."],
 ["forbikjoring_forbudt", "Hva betyr dette skiltet?", ["Forbikjøring forbudt", "Møtende trafikk har forkjørsrett", "Fare for bilkø", "Tofelts veg"],
  "Rød bil ved siden av svart bil i et rundt skilt med rød kant betyr forbikjøring forbudt.",
  "What does this sign mean?", ["No overtaking", "Oncoming traffic has priority", "Risk of queues", "Two-lane road"],
  "A red car next to a black car in a round sign with a red border means no overtaking."],
 ["fart60", "Hva betyr dette skiltet?", ["Fartsgrense 60 km/t", "Anbefalt fart 60 km/t", "Minstefart 60 km/t", "60 meter til kryss"],
  "Rundt skilt med rød kant og tall er fartsgrenseskilt. Du skal ikke kjøre fortere enn 60 km/t.",
  "What does this sign mean?", ["Speed limit 60 km/h", "Recommended speed 60 km/h", "Minimum speed 60 km/h", "60 metres to a junction"],
  "A round sign with a red border and a number is a speed limit sign. You must not exceed 60 km/h."],
 ["gangfelt", "Hva betyr dette skiltet?", ["Gangfelt", "Fotgjengere forbudt", "Gangveg", "Skole"],
  "Blått opplysningsskilt med fotgjenger i hvit trekant markerer et gangfelt.",
  "What does this sign mean?", ["Pedestrian crossing", "No pedestrians", "Footpath", "School"],
  "A blue information sign with a pedestrian in a white triangle marks a pedestrian crossing."],
 ["sperrelinje", "Hva betyr en heltrukket gul linje midt i vegen?", ["Sperrelinje: den skal ikke krysses eller kjøres på", "Du kan krysse den for å kjøre forbi", "Kanten av vegen", "Sykkelfelt"],
  "Heltrukket linje mellom kjøreretningene er sperrelinje.",
  "What does a solid yellow line in the middle of the road mean?", ["Solid line: it must not be crossed or driven on", "You may cross it to overtake", "The edge of the road", "Cycle lane"],
  "A solid line between the directions of travel must not be crossed."],
 ["varsellinje", "Hva betyr varsellinje (lange streker med korte mellomrom)?", ["Den varsler om sperrelinje eller fare lenger fram", "At du kan kjøre forbi uten fare", "At vegen er enveiskjørt", "At det er parkering forbudt"],
  "Varsellinjen forteller at det kommer en sperrelinje eller en farlig strekning.",
  "What does a warning line (long dashes with short gaps) mean?", ["It warns of a solid line or danger ahead", "That you can overtake safely", "That the road is one-way", "That parking is forbidden"],
  "The warning line tells you that a solid line or dangerous stretch is coming."],
 [null, "Hva betyr gul farge på vegoppmerkingen?", ["Den skiller trafikk i motsatt kjøreretning", "Den skiller felt i samme kjøreretning", "Den markerer sykkelfelt", "Den markerer busslomme"],
  "I Norge skiller gule linjer kjøreretningene, mens hvite linjer skiller felt i samme retning og markerer kanten.",
  "What does yellow road marking mean?", ["It separates traffic in opposite directions", "It separates lanes in the same direction", "It marks a cycle lane", "It marks a bus bay"],
  "In Norway yellow lines separate the directions of travel, while white lines separate lanes in the same direction and mark the edge."],
 [null, "Hvilken bunnfarge har midlertidige skilt ved vegarbeid?", ["Gul", "Hvit", "Blå", "Grønn"],
  "Midlertidige skilt har gul bunn, og de gjelder foran de faste skiltene.",
  "What background colour do temporary signs at roadworks have?", ["Yellow", "White", "Blue", "Green"],
  "Temporary signs have a yellow background, and they take priority over permanent signs."],
 ["blindveg", "Hva betyr dette skiltet?", ["Blindveg", "Vegen slutter i et kryss", "Innkjøring forbudt", "Parkering"],
  "Blått skilt med hvit T og rød tverrstrek betyr blindveg: vegen fører ikke videre.",
  "What does this sign mean?", ["Dead end", "The road ends at a junction", "No entry", "Parking"],
  "A blue sign with a white T and red crossbar means dead end: the road does not continue."],
 ["parkering", "Hva betyr dette skiltet?", ["Parkeringsplass", "Politi", "Pause for tunge kjøretøy", "Påbudt kjøreretning"],
  "Blått skilt med hvit P betyr parkering. Underskilt kan begrense tiden.",
  "What does this sign mean?", ["Parking", "Police", "Rest area for lorries", "Mandatory direction"],
  "A blue sign with a white P means parking. Supplementary plates can limit the time."],
 [null, "Hva er et underskilt?", ["Et lite skilt under et annet skilt som gir tilleggsopplysninger eller begrenser det", "Et skilt som opphever alle andre skilt", "Et skilt for fotgjengere", "Et skilt som bare gjelder om natten"],
  "Underskilt kan for eksempel vise avstand, tid eller hvilke kjøretøy skiltet gjelder for.",
  "What is a supplementary plate?", ["A small plate under another sign that adds information or limits it", "A sign that cancels all other signs", "A sign for pedestrians", "A sign that only applies at night"],
  "Supplementary plates can show distance, time or which vehicles the sign applies to."]
]);

U("FKB", "Fart, avstand og stopplengde", "Speed, distance and stopping distance",
`## Fartsgrenser
- Generell fartsgrense: **50 km/t i tettbygd strøk** og **80 km/t utenfor**. Skilt kan gi andre grenser.
- Bil med tilhenger **uten** brems: høyst 60 km/t. Med brems: høyst 80 km/t.
- Fartsgrensen er et **maksimum**. Du skal alltid tilpasse farten etter føre, sikt og trafikk.

## Stopplengde
$$\\text{stopplengde} = \\text{reaksjonslengde} + \\text{bremselengde}$$
- **Reaksjonslengden** er det du kjører før du begynner å bremse. Med reaksjonstid 1 s: $\\text{meter} = \\text{km/t} : 3{,}6$.
- **Bremselengden** vokser med kvadratet av farten: **dobbel fart gir fire ganger så lang bremselengde**.
- Glatt føre, slitte dekk og dårlige bremser gir lengre bremselengde.

![fig:fk_stopp]

## Avstand
Hold **minst 3 sekunder** avstand til kjøretøyet foran under gode forhold, mer på glatt føre og i mørket.
> Kollisjonsenergien vokser også med kvadratet av farten. Litt lavere fart gir mye kortere stopplengde og mindre skade.`,
`## Speed limits
- General speed limit: **50 km/h in built-up areas** and **80 km/h outside**. Signs can set other limits.
- Car with a trailer **without** brakes: at most 60 km/h. With brakes: at most 80 km/h.
- The speed limit is a **maximum**. Always adapt your speed to road conditions, visibility and traffic.

## Stopping distance
$$\\text{stopping distance} = \\text{reaction distance} + \\text{braking distance}$$
- The **reaction distance** is how far you travel before you start braking. With a reaction time of 1 s: $\\text{metres} = \\text{km/h} : 3.6$.
- The **braking distance** grows with the square of the speed: **double the speed gives four times the braking distance**.
- Slippery roads, worn tyres and poor brakes give a longer braking distance.

![fig:fk_stopp]

## Distance
Keep **at least 3 seconds** behind the vehicle in front in good conditions, more on slippery roads and in the dark.
> Collision energy also grows with the square of the speed. A little less speed gives a much shorter stopping distance and less damage.`,
[
 ["fart50", "Hva er den generelle fartsgrensen i tettbygd strøk?", ["50 km/t", "40 km/t", "60 km/t", "30 km/t"],
  "I tettbygd strøk er den generelle fartsgrensen 50 km/t hvis ikke skilt sier noe annet.",
  "What is the general speed limit in built-up areas?", ["50 km/h", "40 km/h", "60 km/h", "30 km/h"],
  "In built-up areas the general speed limit is 50 km/h unless signs say otherwise."],
 [null, "Hva er den generelle fartsgrensen utenfor tettbygd strøk?", ["80 km/t", "90 km/t", "70 km/t", "100 km/t"],
  "Utenfor tettbygd strøk er den generelle fartsgrensen 80 km/t.",
  "What is the general speed limit outside built-up areas?", ["80 km/h", "90 km/h", "70 km/h", "100 km/h"],
  "Outside built-up areas the general speed limit is 80 km/h."],
 [null, "Hva er stopplengden?", ["Reaksjonslengden pluss bremselengden", "Bare bremselengden", "Avstanden til bilen foran", "Reaksjonstiden ganget med 3"],
  "Stopplengden er hele strekningen fra du oppdager faren til bilen står stille.",
  "What is the stopping distance?", ["The reaction distance plus the braking distance", "Only the braking distance", "The distance to the car in front", "The reaction time times 3"],
  "The stopping distance is the whole distance from seeing the danger until the car stands still."],
 [null, "Du dobler farten. Hva skjer omtrent med bremselengden?", ["Den blir fire ganger så lang", "Den blir dobbelt så lang", "Den blir uendret", "Den blir tre ganger så lang"],
  "Bremselengden vokser med kvadratet av farten: 2² = 4.",
  "You double your speed. What roughly happens to the braking distance?", ["It becomes four times as long", "It doubles", "It stays the same", "It becomes three times as long"],
  "The braking distance grows with the square of the speed: 2² = 4."],
 [null, "Du kjører i 72 km/t og har reaksjonstid 1 sekund. Hvor lang er reaksjonslengden?", ["20 meter", "72 meter", "7,2 meter", "40 meter"],
  "72 km/t delt på 3,6 er 20 m/s. På 1 sekund kjører du 20 meter før du begynner å bremse.",
  "You are driving at 72 km/h with a reaction time of 1 second. How long is the reaction distance?", ["20 metres", "72 metres", "7.2 metres", "40 metres"],
  "72 km/h divided by 3.6 is 20 m/s. In 1 second you travel 20 metres before you start braking."],
 ["tresek", "Hvor stor avstand bør du minst holde til bilen foran under gode forhold?", ["3 sekunder", "1 sekund", "5 meter", "Én billengde"],
  "Tresekundersregelen: når bilen foran passerer et fast punkt, skal du bruke minst 3 sekunder dit.",
  "How much distance should you at least keep to the car in front in good conditions?", ["3 seconds", "1 second", "5 metres", "One car length"],
  "The three-second rule: when the car in front passes a fixed point, you should take at least 3 seconds to reach it."],
 [null, "Hva påvirker bremselengden?", ["Farten, føret, dekkene og bremsene", "Bare farten", "Bare reaksjonstiden", "Bare vekten til føreren"],
  "Bremselengden avhenger av farten og av friksjonen mellom dekk og veg, og av bremsene.",
  "What affects the braking distance?", ["The speed, road surface, tyres and brakes", "Only the speed", "Only the reaction time", "Only the driver's weight"],
  "The braking distance depends on the speed, the friction between tyres and road, and the brakes."],
 [null, "Hva kan gjøre reaksjonstiden lengre?", ["Trøtthet, rus og uoppmerksomhet", "God sikt", "Nye dekk", "Lav fart"],
  "Trøtte, påvirkede eller uoppmerksomme førere reagerer senere, og reaksjonslengden øker.",
  "What can make the reaction time longer?", ["Tiredness, intoxication and inattention", "Good visibility", "New tyres", "Low speed"],
  "Tired, intoxicated or inattentive drivers react later, so the reaction distance increases."],
 ["tilhenger", "Hva er høyeste tillatte fart for bil med tilhenger uten bremser?", ["60 km/t", "80 km/t", "50 km/t", "70 km/t"],
  "Tilhenger uten brems: høyst 60 km/t. Tilhenger med brems: høyst 80 km/t, hvis skiltet fart tillater det.",
  "What is the maximum speed for a car with a trailer without brakes?", ["60 km/h", "80 km/h", "50 km/h", "70 km/h"],
  "Trailer without brakes: at most 60 km/h. Trailer with brakes: at most 80 km/h, if the posted limit allows."],
 [null, "Fartsgrensen er 80 km/t, men det er tett tåke og glatt. Hva gjelder?", ["Du skal tilpasse farten etter forholdene og kan måtte kjøre mye saktere", "Du kan alltid kjøre 80 km/t", "Du skal kjøre med fjernlys", "Du skal kjøre midt i vegen"],
  "Fartsgrensen er den høyeste tillatte farten. Du må alltid kunne stanse på den strekningen du ser er fri.",
  "The limit is 80 km/h, but there is thick fog and it is slippery. What applies?", ["You must adapt your speed to the conditions and may have to drive much slower", "You may always drive at 80 km/h", "You must use full beam", "You must drive in the middle of the road"],
  "The speed limit is the highest permitted speed. You must always be able to stop within the distance you can see is clear."],
 [null, "Bilen begynner å «flyte» på vannet i vegbanen (vannplaning). Hva gjør du?", ["Slipper gassen, holder rattet rett og unngår brå bremsing", "Bremser hardt med en gang", "Gir mer gass", "Svinger kraftig for å komme ut"],
  "Ved vannplaning mister dekkene kontakten med vegen. Rolig gasslipp gir dem grep igjen.",
  "The car starts to \"float\" on water on the road (aquaplaning). What do you do?", ["Ease off the accelerator, keep the wheel straight and avoid hard braking", "Brake hard at once", "Accelerate", "Steer sharply to get out"],
  "When aquaplaning, the tyres lose contact with the road. Gently easing off lets them grip again."],
 [null, "Hvorfor er fartsgrensen ofte 30 km/t ved skoler og i boligområder?", ["En fotgjenger har mye større sjanse for å overleve en påkjørsel i lav fart", "For å spare drivstoff", "Fordi vegene er smalere", "For å redusere støy om natten"],
  "Risikoen for at en fotgjenger blir drept, øker kraftig fra 30 til 50 km/t.",
  "Why is the speed limit often 30 km/h near schools and in residential areas?", ["A pedestrian has a much better chance of surviving being hit at low speed", "To save fuel", "Because the roads are narrower", "To reduce noise at night"],
  "The risk of a pedestrian being killed rises sharply from 30 to 50 km/h."],
 [null, "Hvor mange meter per sekund tilsvarer 90 km/t?", ["25 m/s", "9 m/s", "32 m/s", "50 m/s"],
  "90 : 3,6 = 25. På ett sekund kjører du altså 25 meter.",
  "How many metres per second is 90 km/h?", ["25 m/s", "9 m/s", "32 m/s", "50 m/s"],
  "90 : 3.6 = 25. So in one second you travel 25 metres."]
]);

U("FKB", "Plassering, feltskifte og forbikjøring", "Positioning, changing lanes and overtaking",
`## Plassering
- Hold deg til **høyre** i kjørebanen, men ikke så langt ut at du er til fare for myke trafikanter.
- Planlegg plasseringen før kryss: høyre felt for å svinge til høyre, lengst til venstre i kjøreretningen for å svinge til venstre.
- Gi tegn med **blinklys i god tid** før du skifter felt, svinger eller kjører ut fra kanten.

## Feltskifte
Se i speilene **og over skulderen** (blindsonen) før du skifter felt. Den som skifter felt, skal vike for trafikken i feltet.

## Forbikjøring
- Kjør forbi på **venstre** side. Du kan kjøre forbi på høyre side når den du kjører forbi, skal svinge til venstre og har plassert seg for det.
- Forbikjøring er forbudt der sikten er for kort, for eksempel før bakketopper og i uoversiktlige kurver, og der skilt eller sperrelinje forbyr det.
- Du skal ikke kjøre forbi et kjøretøy som har stanset for å slippe fotgjengere over gangfeltet.
- Blir du kjørt forbi, skal du ikke øke farten.

## Rundkjøring, fletting og parkering
- Gi tegn med høyre blinklys før du kjører ut av rundkjøringen.
- Når to felt blir til ett, flett **annenhver** (glidelås).
- På veg med trafikk i begge retninger skal du parkere på **høyre** side. Du skal ikke stanse i gangfelt eller nærmere enn **5 meter** foran det.
- På motorveg er det forbudt å snu og rygge.`,
`## Positioning
- Keep to the **right** of the carriageway, but not so far out that you endanger vulnerable road users.
- Plan your position before junctions: the right lane to turn right, furthest left in your direction to turn left.
- **Signal in good time** before changing lanes, turning or pulling out from the kerb.

## Changing lanes
Check your mirrors **and over your shoulder** (the blind spot) before changing lanes. The one changing lanes must give way to traffic in that lane.

## Overtaking
- Overtake on the **left**. You may overtake on the right when the vehicle you pass is turning left and has positioned itself for it.
- Overtaking is forbidden where visibility is too short, for example before hilltops and on blind bends, and where signs or a solid line forbid it.
- Do not overtake a vehicle that has stopped to let pedestrians cross at a pedestrian crossing.
- When you are being overtaken, do not speed up.

## Roundabouts, merging and parking
- Signal right before leaving the roundabout.
- When two lanes become one, merge **alternately** (zip merge).
- On two-way roads, park on the **right** side. Do not stop on a pedestrian crossing or less than **5 metres** before it.
- On motorways it is forbidden to turn around and reverse.`,
[
 [null, "Hva må du gjøre før du skifter felt?", ["Se i speilene og over skulderen, og gi tegn i god tid", "Bare gi tegn", "Bare se i innvendig speil", "Øke farten og skifte raskt"],
  "Blindsonen dekkes ikke av speilene. Kast et blikk over skulderen, og vis hva du skal i god tid.",
  "What must you do before changing lanes?", ["Check the mirrors and over your shoulder, and signal in good time", "Only signal", "Only check the rear-view mirror", "Speed up and change quickly"],
  "The blind spot is not covered by the mirrors. Glance over your shoulder and signal your intention in good time."],
 [null, "På hvilken side skal du normalt kjøre forbi?", ["Venstre side", "Høyre side", "Den siden det er best plass", "Begge er like riktige"],
  "Forbikjøring skjer normalt på venstre side.",
  "On which side should you normally overtake?", ["The left side", "The right side", "Whichever side has more room", "Both are equally correct"],
  "Overtaking is normally done on the left."],
 [null, "Når kan du kjøre forbi på høyre side?", ["Når den du kjører forbi skal svinge til venstre og har plassert seg for det", "Når du har det travelt", "Alltid på motorveg", "Når bilen foran kjører sakte"],
  "Du kan kjøre forbi på høyre side når kjøretøyet foran har plassert seg for å svinge til venstre.",
  "When may you overtake on the right?", ["When the vehicle you pass is turning left and has positioned itself for it", "When you are in a hurry", "Always on motorways", "When the car in front is slow"],
  "You may pass on the right when the vehicle ahead has positioned itself to turn left."],
 ["bakketopp", "Du nærmer deg en bakketopp der du ikke ser møtende trafikk. Kan du kjøre forbi?", ["Nei, forbikjøring er forbudt når sikten er for kort", "Ja, hvis du gir tegn", "Ja, hvis du tuter først", "Ja, hvis farten er under 80 km/t"],
  "Du må kunne se at det er fritt langt nok fram til å fullføre forbikjøringen.",
  "You are approaching a hilltop where you cannot see oncoming traffic. May you overtake?", ["No, overtaking is forbidden when visibility is too short", "Yes, if you signal", "Yes, if you sound the horn first", "Yes, if the speed is under 80 km/h"],
  "You must be able to see that the road is clear far enough ahead to complete the overtake."],
 ["gangfelt", "Et kjøretøy foran deg i nabofeltet har stanset foran et gangfelt. Hva gjør du?", ["Du kjører ikke forbi, og stanser om nødvendig for fotgjengere", "Kjører forbi fordi ditt felt er fritt", "Tuter og kjører forbi", "Kjører forbi i høy fart"],
  "Det er forbudt å kjøre forbi et kjøretøy som har stanset for å slippe fotgjengere over gangfeltet. En fotgjenger kan være skjult.",
  "A vehicle ahead in the next lane has stopped before a pedestrian crossing. What do you do?", ["You do not pass it, and stop if necessary for pedestrians", "Pass because your lane is clear", "Sound the horn and pass", "Pass at high speed"],
  "It is forbidden to pass a vehicle that has stopped to let pedestrians cross. A pedestrian may be hidden."],
 [null, "Du blir kjørt forbi. Hva skal du gjøre?", ["Holde farten eller senke den litt, og ikke øke farten", "Øke farten", "Kjøre ut mot midten", "Blinke med fjernlyset"],
  "Du skal gjøre det lett for den som kjører forbi, og ikke øke farten.",
  "You are being overtaken. What should you do?", ["Keep your speed or slow down slightly, and not speed up", "Speed up", "Move towards the centre", "Flash your full beam"],
  "Make it easy for the overtaking driver and do not speed up."],
 ["rundkjoring", "Du skal ut av rundkjøringen. Hva gjør du?", ["Gir tegn med høyre blinklys før du kjører ut", "Gir tegn med venstre blinklys", "Gir ikke tegn", "Tuter"],
  "Høyre blinklys viser andre trafikanter at du skal ut av rundkjøringen.",
  "You are leaving the roundabout. What do you do?", ["Signal right before you exit", "Signal left", "Do not signal", "Sound the horn"],
  "The right indicator shows others that you are leaving the roundabout."],
 [null, "To felt går sammen til ett i en kø. Hvordan bør det skje?", ["Kjøretøyene fra hvert felt fletter inn annenhver", "De i feltet som slutter, må vente til køen er borte", "De som kjører fortest, går først", "Man tuter for å få plass"],
  "Fletting annenhver (glidelås) gir best flyt og minst konflikt.",
  "Two lanes merge into one in a queue. How should it happen?", ["Vehicles from each lane merge alternately", "Those in the ending lane must wait until the queue is gone", "The fastest go first", "You sound the horn to get space"],
  "Merging alternately (zip merge) gives the best flow and the least conflict."],
 [null, "På en veg med trafikk i begge retninger: hvor skal du parkere?", ["På høyre side i kjøreretningen", "På den siden det er ledig", "På venstre side", "Midt i vegen"],
  "På veg med toveis trafikk skal du parkere på høyre side.",
  "On a road with traffic in both directions, where should you park?", ["On the right side in your direction", "Wherever there is space", "On the left side", "In the middle of the road"],
  "On two-way roads you park on the right side."],
 ["gangfelt", "Hvor nær et gangfelt kan du stanse eller parkere?", ["Ikke i gangfeltet og ikke nærmere enn 5 meter foran det", "Rett foran gangfeltet", "Inntil 1 meter foran", "I gangfeltet hvis det er kort tid"],
  "Biler som står nær gangfeltet, skjuler fotgjengere. Derfor er stans forbudt i og 5 meter foran gangfeltet.",
  "How close to a pedestrian crossing may you stop or park?", ["Not on the crossing and not closer than 5 metres before it", "Right before the crossing", "Up to 1 metre before", "On the crossing if only briefly"],
  "Cars standing near the crossing hide pedestrians. So stopping is forbidden on it and 5 metres before it."],
 [null, "Hva er forbudt på motorveg?", ["Å snu og å rygge", "Å kjøre i venstre felt ved forbikjøring", "Å bruke blinklys", "Å kjøre i 100 km/t"],
  "På motorveg er det forbudt å snu, rygge og stanse unødig.",
  "What is forbidden on a motorway?", ["Turning around and reversing", "Using the left lane to overtake", "Using indicators", "Driving at 100 km/h"],
  "On motorways it is forbidden to turn around, reverse or stop unnecessarily."],
 [null, "Du skal svinge til venstre fra en veg med ett felt i hver retning. Hvor plasserer du deg?", ["Så nær midtlinjen som mulig i din egen kjøreretning", "Helt ute til høyre", "I møtende kjørefelt", "Midt i ditt felt uten å gi tegn"],
  "Plasser deg ved midtlinjen og gi tegn i god tid, så kan trafikk bakfra passere på høyre side.",
  "You will turn left from a road with one lane each way. Where do you position yourself?", ["As close to the centre line as possible in your own direction", "Far to the right", "In the oncoming lane", "In the middle of your lane without signalling"],
  "Position yourself at the centre line and signal early, so traffic behind can pass on your right."]
]);

U("FKB", "Lys, signaler og trafikklys", "Lights, signals and traffic lights",
`## Lys på bilen
- I Norge skal du alltid kjøre med **lys** (nærlys eller kjørelys) når bilen er i bevegelse.
- **Fjernlys** skal blendes ned for møtende, når du kjører tett bak andre, og når det kan blende gående og syklende.
- **Tåkebaklys** brukes bare når sikten er sterkt redusert av tåke eller nedbør, fordi det blender i vanlig vær.
- **Nødblinklys** brukes når bilen står stille og er til fare, for eksempel etter en ulykke eller ved stans i kø på motorveg.
- **Lydsignal** (horn) brukes bare for å varsle fare.

## Trafikklys
- **Rødt**: stans. **Rødt og gult**: lyset skifter snart til grønt, men du skal fortsatt ikke kjøre.
- **Gult alene**: stans hvis du kan gjøre det uten fare.
- **Grønt**: kjør, men vik for fotgjengere og møtende når du svinger. **Grønn pil**: kjør i pilens retning.
- **Blinkende gult**: vis særlig aktsomhet; skilt og vikepliktsregler gjelder.

![fig:fk_lys]`,
`## Lights on the car
- In Norway you must always drive with **lights** (dipped beam or daytime running lights) when the car is moving.
- **Full beam** must be dipped for oncoming traffic, when driving close behind others, and when it may dazzle pedestrians and cyclists.
- **Rear fog light** is only used when visibility is greatly reduced by fog or precipitation, because it dazzles in normal weather.
- **Hazard lights** are used when the car is stationary and a hazard, for example after an accident or when stopping in a queue on a motorway.
- The **horn** is only used to warn of danger.

## Traffic lights
- **Red**: stop. **Red and amber**: the light will soon turn green, but you must still not go.
- **Amber alone**: stop if you can do so safely.
- **Green**: go, but give way to pedestrians and oncoming traffic when turning. **Green arrow**: go in the direction of the arrow.
- **Flashing amber**: take special care; signs and right-of-way rules apply.

![fig:fk_lys]`,
[
 [null, "Når skal du kjøre med lys på bilen i Norge?", ["Alltid når bilen er i bevegelse", "Bare når det er mørkt", "Bare i tunneler", "Bare om vinteren"],
  "I Norge er det påbudt med lys hele døgnet når bilen kjøres.",
  "When must you drive with lights on in Norway?", ["Always when the car is moving", "Only when it is dark", "Only in tunnels", "Only in winter"],
  "In Norway lights are mandatory day and night when driving."],
 ["lys_gult", "Trafikklyset skifter fra grønt til gult rett før du kommer fram. Hva gjør du?", ["Stanser hvis det kan gjøres uten fare", "Øker farten for å rekke det", "Kjører alltid videre", "Stanser alltid momentant"],
  "Gult alene betyr stopp, med mindre du er så nær at en stans ville vært farlig.",
  "The light changes from green to amber just before you arrive. What do you do?", ["Stop if you can do so safely", "Speed up to make it", "Always continue", "Always stop instantly"],
  "Amber alone means stop, unless you are so close that stopping would be dangerous."],
 ["lys_rodgult", "Trafikklyset viser rødt og gult samtidig. Hva betyr det?", ["Lyset skifter snart til grønt, men du skal ikke kjøre ennå", "Du kan kjøre forsiktig", "Lyset er i ustand", "Kjør hvis det er fritt"],
  "Rødt og gult varsler at grønt kommer. Du skal vente til lyset er grønt.",
  "The traffic light shows red and amber together. What does it mean?", ["It will soon turn green, but you must not go yet", "You may go carefully", "The light is broken", "Go if it is clear"],
  "Red and amber warn that green is coming. Wait until the light is green."],
 ["lys_blink", "Trafikklyset blinker gult. Hva gjelder?", ["Vis særlig aktsomhet, og følg skilt og vikepliktsregler", "Du har alltid forkjørsrett", "Du skal alltid stanse", "Lyset gjelder ikke, kjør fort gjennom"],
  "Blinkende gult betyr at krysset ikke er regulert av lyset. Da gjelder skilt og vanlige regler.",
  "The traffic light is flashing amber. What applies?", ["Take special care, and follow signs and right-of-way rules", "You always have priority", "You must always stop", "The light does not apply, drive through fast"],
  "Flashing amber means the junction is not controlled by the light. Signs and normal rules apply."],
 ["lys_gronn", "Du har grønt lys og skal svinge til høyre. En fotgjenger krysser vegen du svinger inn på. Hva gjør du?", ["Viker for fotgjengeren", "Kjører, fordi du har grønt", "Tuter", "Svinger rundt fotgjengeren"],
  "Grønt lys gir ikke rett til å kjøre på fotgjengere. Du skal vike for gående i vegen du svinger inn på.",
  "You have a green light and are turning right. A pedestrian is crossing the road you are turning into. What do you do?", ["Give way to the pedestrian", "Drive on, you have green", "Sound the horn", "Steer around the pedestrian"],
  "A green light does not give you the right to hit pedestrians. Give way to people crossing the road you turn into."],
 [null, "Når skal du blende ned fjernlyset?", ["Ved møtende trafikk, når du kjører tett bak andre, og når det kan blende gående", "Aldri", "Bare i byen", "Bare når det regner"],
  "Fjernlys blender. Blend ned i god tid for alle som kan bli blendet.",
  "When must you dip your full beam?", ["For oncoming traffic, when close behind others, and when it may dazzle pedestrians", "Never", "Only in town", "Only when it rains"],
  "Full beam dazzles. Dip it in good time for anyone who may be dazzled."],
 [null, "Når kan du bruke tåkebaklys?", ["Bare når sikten er sterkt redusert av tåke eller nedbør", "Alltid om natten", "Når det er mørkt og tørt", "Når du kjører i kø"],
  "Tåkebaklyset er så sterkt at det blender i vanlig vær.",
  "When may you use the rear fog light?", ["Only when visibility is greatly reduced by fog or precipitation", "Always at night", "When it is dark and dry", "When driving in a queue"],
  "The rear fog light is so bright that it dazzles in normal weather."],
 [null, "Når skal du bruke nødblinklys?", ["Når bilen står stille og kan være til fare, for eksempel etter en ulykke", "Når du parkerer ulovlig", "Når du kjører sakte", "For å takke andre sjåfører"],
  "Nødblinklys varsler at bilen står stille og kan være en fare.",
  "When should you use the hazard lights?", ["When the car is stationary and may be a hazard, for example after an accident", "When parking illegally", "When driving slowly", "To thank other drivers"],
  "Hazard lights warn that the car is stationary and may be a hazard."],
 [null, "Når kan du bruke lydsignal (horn)?", ["For å varsle om fare", "For å hilse", "For å vise at du er irritert", "For å få køen til å gå raskere"],
  "Hornet skal bare brukes for å varsle andre om fare.",
  "When may you use the horn?", ["To warn of danger", "To say hello", "To show irritation", "To make the queue move faster"],
  "The horn should only be used to warn others of danger."],
 ["lys_pil", "Du har rødt lys, men en grønn pil lyser mot høyre. Hva betyr det?", ["Du kan kjøre i pilens retning", "Du må vente til alt er grønt", "Pilen gjelder bare busser", "Du må stanse og vike for alle"],
  "En grønn pil gir deg lov til å kjøre i pilens retning.",
  "You have a red light, but a green arrow shows to the right. What does it mean?", ["You may drive in the direction of the arrow", "You must wait until everything is green", "The arrow only applies to buses", "You must stop and give way to everyone"],
  "A green arrow lets you drive in the direction of the arrow."],
 [null, "Du skal kjøre ut fra vegkanten. Hva gjør du?", ["Ser deg godt rundt, gir tegn i god tid og kjører ut når det er trygt", "Kjører raskt ut uten å se", "Tuter og kjører ut", "Gir tegn samtidig som du kjører ut"],
  "Du har vikeplikt når du kjører ut fra kanten. Gi tegn i god tid og sjekk blindsonen.",
  "You will pull out from the kerb. What do you do?", ["Look around carefully, signal in good time and pull out when it is safe", "Pull out quickly without looking", "Sound the horn and pull out", "Signal as you pull out"],
  "You must give way when pulling out. Signal early and check the blind spot."]
]);

U("FKB", "Myke trafikanter og samspill", "Vulnerable road users and interaction",
`## Myke trafikanter
Fotgjengere, syklister, mopedister og motorsyklister har lite beskyttelse. Du har ansvar for å kjøre slik at de ikke kommer i fare.
- **Barn** er uforutsigbare, ser dårlig trafikk og kan løpe ut plutselig. Senk farten ved skoler, lekeplasser og busser.
- **Eldre** kan gå sakte og ha dårlig syn eller hørsel.
- En person med **hvit stokk** er blind eller svaksynt.
- Hold god avstand når du kjører forbi syklister. **Minst 1,5 meter** er anbefalt.
- Sjekk **blindsonen** for syklister før du svinger til høyre.
- Se etter syklister bak før du åpner døra.
- Kjør rolig og med god avstand forbi **hester**, og unngå brå lyder.

## Samspill
- Vis tydelig hva du skal, i god tid, og vær forutsigbar.
- Tunge kjøretøy har store blindsoner og trenger plass i svinger.
- Ta øyekontakt, men stol ikke på at andre har sett deg.`,
`## Vulnerable road users
Pedestrians, cyclists, moped riders and motorcyclists have little protection. You are responsible for driving so that they are not put in danger.
- **Children** are unpredictable, judge traffic poorly and may run out suddenly. Slow down near schools, playgrounds and buses.
- **Older people** may walk slowly and have poor sight or hearing.
- A person with a **white cane** is blind or visually impaired.
- Keep a good distance when passing cyclists. **At least 1.5 metres** is recommended.
- Check the **blind spot** for cyclists before turning right.
- Look for cyclists behind before opening the door.
- Pass **horses** slowly with plenty of room, and avoid sudden noises.

## Interaction
- Show clearly what you will do, in good time, and be predictable.
- Heavy vehicles have large blind spots and need room at turns.
- Make eye contact, but do not rely on others having seen you.`,
[
 ["barn", "Du kjører forbi en skole og ser barn ved vegkanten. Hva gjør du?", ["Senker farten og er forberedt på at et barn kan løpe ut", "Tuter for å varsle barna", "Holder farten, de ser deg", "Kjører midt i vegen"],
  "Barn kan være uforutsigbare. Lav fart gir tid til å stanse.",
  "You are passing a school and see children by the road. What do you do?", ["Slow down and be ready for a child to run out", "Sound the horn to warn the children", "Keep your speed, they can see you", "Drive in the middle of the road"],
  "Children can be unpredictable. Low speed gives you time to stop."],
 [null, "Hvilken avstand er anbefalt når du kjører forbi en syklist?", ["Minst 1,5 meter", "20 centimeter", "Ingen bestemt, bare du ikke treffer", "Så nær som mulig for å komme raskt forbi"],
  "Syklisten kan vingle, for eksempel på grunn av vind eller hull i vegen. Minst 1,5 meter er anbefalt.",
  "What distance is recommended when you pass a cyclist?", ["At least 1.5 metres", "20 centimetres", "None in particular, as long as you do not hit them", "As close as possible to pass quickly"],
  "The cyclist may wobble, for example because of wind or potholes. At least 1.5 metres is recommended."],
 [null, "Du skal svinge til høyre i et kryss. Hva må du være særlig oppmerksom på?", ["Syklister som kommer bakfra i blindsonen på høyre side", "Møtende biler", "Trafikk fra venstre", "Bilen bak deg"],
  "Syklister på høyre side forsvinner lett i blindsonen når du svinger til høyre.",
  "You will turn right at a junction. What must you pay special attention to?", ["Cyclists coming from behind in the blind spot on the right", "Oncoming cars", "Traffic from the left", "The car behind you"],
  "Cyclists on the right easily disappear into the blind spot when you turn right."],
 [null, "En person med hvit stokk står ved vegen. Hva betyr det?", ["Personen er blind eller svaksynt", "Personen er politi", "Personen vil haike", "Personen er vegarbeider"],
  "Hvit stokk viser at personen ser dårlig eller ikke ser. Vær ekstra forsiktig.",
  "A person with a white cane is standing by the road. What does it mean?", ["The person is blind or visually impaired", "The person is a police officer", "The person wants a lift", "The person is a road worker"],
  "A white cane shows that the person sees poorly or not at all. Take extra care."],
 [null, "Du har parkert langs en gate. Hva gjør du før du åpner døra?", ["Ser etter syklister og andre bakfra", "Åpner raskt så du ikke hindrer trafikken", "Tuter først", "Ingenting spesielt"],
  "En syklist kan kollidere med en dør som åpnes plutselig.",
  "You have parked along a street. What do you do before opening the door?", ["Look for cyclists and others coming from behind", "Open quickly so you do not block traffic", "Sound the horn first", "Nothing in particular"],
  "A cyclist can crash into a door that opens suddenly."],
 [null, "Du møter en rytter til hest. Hva gjør du?", ["Senker farten og kjører rolig forbi med god avstand", "Tuter så hesten ser deg", "Gir gass for å komme raskt forbi", "Blinker med lysene"],
  "Hester kan skremmes av lyd og brå bevegelser.",
  "You meet a rider on horseback. What do you do?", ["Slow down and pass calmly with plenty of room", "Sound the horn so the horse sees you", "Accelerate to pass quickly", "Flash your lights"],
  "Horses can be frightened by noise and sudden movements."],
 [null, "En lastebil foran deg skal svinge til høyre og trekker først litt til venstre. Hva gjør du?", ["Venter bak og kjører ikke opp på høyre side", "Kjører forbi på høyre side", "Tuter", "Kjører tett inntil lastebilen"],
  "Store kjøretøy trenger plass i sving og har store blindsoner. Ikke legg deg på innsiden.",
  "A lorry in front of you is turning right and first moves a little to the left. What do you do?", ["Wait behind and do not move up on the right", "Pass it on the right", "Sound the horn", "Drive close to the lorry"],
  "Large vehicles need room to turn and have large blind spots. Do not put yourself on the inside."],
 [null, "Hva betyr det å være forutsigbar i trafikken?", ["At andre lett forstår hva du skal gjøre", "At du alltid kjører fort", "At du alltid har forkjørsrett", "At du ikke bruker blinklys"],
  "Gi tegn i god tid, plasser deg tydelig og unngå brå manøvrer.",
  "What does it mean to be predictable in traffic?", ["That others easily understand what you will do", "That you always drive fast", "That you always have priority", "That you do not use indicators"],
  "Signal in good time, position yourself clearly and avoid sudden manoeuvres."],
 [null, "En skolebuss har stanset for å slippe av barn. Hva gjør du?", ["Senker farten kraftig og er klar til å stanse", "Kjører forbi i vanlig fart", "Tuter for å varsle barna", "Kjører tett inntil bussen"],
  "Barn kan løpe ut foran eller bak bussen.",
  "A school bus has stopped to let children off. What do you do?", ["Slow down a lot and be ready to stop", "Pass at normal speed", "Sound the horn to warn the children", "Drive close to the bus"],
  "Children may run out in front of or behind the bus."]
]);

U("FKB", "Rus, trøtthet og oppmerksomhet", "Alcohol, fatigue and attention",
`## Rus
- Promillegrensen er **0,2 promille**. Det er også forbudt å kjøre påvirket av andre rusmidler.
- Kroppen forbrenner omtrent **0,15 promille per time**. Kaffe, kald dusj eller mat gjør deg ikke edru raskere.
- Legemidler merket med **rød varseltrekant** kan svekke evnen til å kjøre.

## Trøtthet
Trøtthet gir langsommere reaksjoner og kan føre til at du sovner. Stopp, ta en pause eller sov litt. Musikk og åpent vindu hjelper ikke.

## Oppmerksomhet
- Det er forbudt å bruke **håndholdt mobiltelefon** under kjøring.
- Ved 80 km/t kjører du over 40 meter på 2 sekunder med blikket et annet sted.
- Stress og sinne gir dårligere vurderinger. Planlegg turen og beregn god tid.`,
`## Alcohol and drugs
- The blood alcohol limit is **0.2 per mille**. Driving under the influence of other drugs is also forbidden.
- The body burns about **0.15 per mille per hour**. Coffee, a cold shower or food do not make you sober faster.
- Medicines marked with a **red warning triangle** can impair your ability to drive.

## Fatigue
Tiredness slows your reactions and can make you fall asleep. Stop, take a break or have a short sleep. Music and an open window do not help.

## Attention
- Using a **hand-held mobile phone** while driving is forbidden.
- At 80 km/h you travel over 40 metres in 2 seconds with your eyes elsewhere.
- Stress and anger lead to worse judgement. Plan your trip and allow plenty of time.`,
[
 [null, "Hva er promillegrensen for å kjøre bil i Norge?", ["0,2 promille", "0,5 promille", "0,8 promille", "0,0 promille"],
  "Grensen er 0,2 promille. Det tryggeste er å ikke drikke i det hele tatt før du kjører.",
  "What is the blood alcohol limit for driving in Norway?", ["0.2 per mille", "0.5 per mille", "0.8 per mille", "0.0 per mille"],
  "The limit is 0.2 per mille. The safest is not to drink at all before driving."],
 [null, "Omtrent hvor mye alkohol forbrenner kroppen per time?", ["0,15 promille", "0,5 promille", "1 promille", "0,01 promille"],
  "Forbrenningen går sakte og kan ikke fremskyndes.",
  "Roughly how much alcohol does the body burn per hour?", ["0.15 per mille", "0.5 per mille", "1 per mille", "0.01 per mille"],
  "The burning is slow and cannot be speeded up."],
 [null, "Hva hjelper for å bli edru raskere?", ["Ingenting, bare tid", "Kaffe", "Kald dusj", "Mye mat"],
  "Bare tid gjør at promillen går ned.",
  "What helps you sober up faster?", ["Nothing, only time", "Coffee", "A cold shower", "Plenty of food"],
  "Only time brings the blood alcohol level down."],
 ["trekant_rod", "Hva betyr en rød varseltrekant på pakningen til et legemiddel?", ["Legemidlet kan svekke evnen til å kjøre", "Legemidlet er ufarlig", "Du må ta det sammen med mat", "Det er reseptfritt"],
  "Rød trekant betyr at du må være forsiktig med å kjøre. Spør lege eller apotek.",
  "What does a red warning triangle on a medicine package mean?", ["The medicine can impair your ability to drive", "The medicine is harmless", "You must take it with food", "It is non-prescription"],
  "A red triangle means you must be careful about driving. Ask a doctor or pharmacist."],
 [null, "Du blir trøtt under kjøring. Hva er riktig å gjøre?", ["Stoppe på et trygt sted og ta en pause eller sove litt", "Skru opp musikken", "Åpne vinduet og kjøre videre", "Kjøre fortere for å komme fram"],
  "Musikk og frisk luft hjelper bare kort. Bare søvn og pause virker.",
  "You become tired while driving. What is the right thing to do?", ["Stop somewhere safe and take a break or have a short sleep", "Turn up the music", "Open the window and continue", "Drive faster to arrive sooner"],
  "Music and fresh air only help briefly. Only sleep and a break work."],
 ["mobil", "Kan du bruke håndholdt mobiltelefon mens du kjører?", ["Nei, det er forbudt", "Ja, hvis du kjører sakte", "Ja, i kø", "Ja, for tekstmeldinger"],
  "Det er forbudt å bruke håndholdt mobil under kjøring. Også handsfree tar oppmerksomhet.",
  "May you use a hand-held mobile phone while driving?", ["No, it is forbidden", "Yes, if driving slowly", "Yes, in a queue", "Yes, for text messages"],
  "Using a hand-held mobile while driving is forbidden. Hands-free also takes attention."],
 [null, "Du kjører i 80 km/t og ser ned på skjermen i 2 sekunder. Omtrent hvor langt kjører du i blinde?", ["Over 40 meter", "5 meter", "10 meter", "2 meter"],
  "80 km/t er omtrent 22 m/s. På 2 sekunder blir det rundt 44 meter.",
  "You drive at 80 km/h and look down at a screen for 2 seconds. Roughly how far do you travel blind?", ["Over 40 metres", "5 metres", "10 metres", "2 metres"],
  "80 km/h is about 22 m/s. In 2 seconds that is around 44 metres."],
 [null, "Hvordan påvirker stress og sinne kjøringen?", ["Du tar dårligere vurderinger og tar større sjanser", "Du blir en bedre sjåfør", "Det har ingen betydning", "Du reagerer raskere og tryggere"],
  "Stress gir smalere oppmerksomhet og mer risiko. Beregn god tid.",
  "How do stress and anger affect your driving?", ["You make worse judgements and take bigger risks", "You become a better driver", "It makes no difference", "You react faster and more safely"],
  "Stress narrows attention and increases risk. Allow plenty of time."],
 [null, "Du har drukket alkohol kvelden før. Hva gjelder neste morgen?", ["Du kan fortsatt ha promille, så du må vente til du er helt edru", "Etter søvn er du alltid edru", "Frokost fjerner promillen", "Du kan kjøre hvis du føler deg bra"],
  "Alkoholen forbrennes sakte, også mens du sover. Mange tas for promillekjøring morgenen etter.",
  "You drank alcohol the evening before. What applies the next morning?", ["You may still be over the limit, so wait until you are completely sober", "After sleep you are always sober", "Breakfast removes the alcohol", "You may drive if you feel fine"],
  "Alcohol burns slowly, even while you sleep. Many are caught drink-driving the morning after."]
]);

U("FKB", "Kjøretøyet, last og tilhenger", "The vehicle, load and trailer",
`## Dekk og bremser
- Mønsterdybden skal være minst **1,6 mm** om sommeren og minst **3 mm** i vinterperioden (personbil).
- Kontroller dekktrykket jevnlig. For lavt trykk gir dårligere veggrep og høyere forbruk.
- Røde varsellamper betyr at du må stanse og finne feilen.

## Sikring
- Alle skal bruke **bilbelte**. Føreren har ansvar for at passasjerer **under 15 år** er sikret.
- Barn **under 135 cm** skal sikres i godkjent barnesikringsutstyr.
- Et **bakovervendt barnesete** skal aldri stå foran en aktiv kollisjonspute.
- Bilen skal ha **varseltrekant** og **refleksvest** som kan nås fra førerplassen.

## Last og tilhenger
- Lasten skal være sikret. Last som stikker mer enn **1 meter** bak bilen, skal merkes.
- Med klasse B kan du trekke en tilhenger med tillatt totalvekt **inntil 750 kg**, eller en tyngre henger når bil og henger til sammen er **høyst 3500 kg**. Med kode 96 kan vogntoget være inntil 4250 kg.
- Bilen skal jevnlig til **EU-kontroll** (periodisk kontroll).`,
`## Tyres and brakes
- Tread depth must be at least **1.6 mm** in summer and at least **3 mm** in the winter period (passenger car).
- Check tyre pressure regularly. Too low pressure gives worse grip and higher consumption.
- Red warning lights mean you must stop and find the fault.

## Restraints
- Everyone must wear a **seat belt**. The driver is responsible for passengers **under 15** being restrained.
- Children **under 135 cm** must use an approved child restraint.
- A **rear-facing child seat** must never be placed in front of an active airbag.
- The car must carry a **warning triangle** and a **high-visibility vest** reachable from the driver's seat.

## Load and trailer
- The load must be secured. A load sticking out more than **1 metre** behind the car must be marked.
- With class B you may tow a trailer with a maximum permitted weight **up to 750 kg**, or a heavier trailer when car and trailer together are **at most 3,500 kg**. With code 96 the combination can be up to 4,250 kg.
- The car must have regular **roadworthiness tests** (EU inspection).`,
[
 ["dekk", "Hvor stor mønsterdybde skal sommerdekk på personbil minst ha?", ["1,6 mm", "3 mm", "0,5 mm", "5 mm"],
  "Minst 1,6 mm om sommeren. Mer mønster gir bedre grep på våt veg.",
  "What minimum tread depth must summer tyres on a car have?", ["1.6 mm", "3 mm", "0.5 mm", "5 mm"],
  "At least 1.6 mm in summer. More tread gives better grip on wet roads."],
 ["dekk", "Hvor stor mønsterdybde skal vinterdekk på personbil minst ha i vinterperioden?", ["3 mm", "1,6 mm", "1 mm", "8 mm"],
  "I vinterperioden er kravet minst 3 mm mønsterdybde.",
  "What minimum tread depth must winter tyres on a car have in the winter period?", ["3 mm", "1.6 mm", "1 mm", "8 mm"],
  "In the winter period the requirement is at least 3 mm tread depth."],
 [null, "Hvem har ansvaret for at passasjerer under 15 år bruker bilbelte?", ["Føreren", "Passasjeren selv", "Foreldrene, selv om de ikke er med", "Ingen"],
  "Føreren har ansvar for at passasjerer under 15 år er sikret.",
  "Who is responsible for passengers under 15 wearing seat belts?", ["The driver", "The passenger", "The parents, even if not present", "Nobody"],
  "The driver is responsible for passengers under 15 being restrained."],
 [null, "Hvilke barn skal sikres i godkjent barnesikringsutstyr?", ["Barn under 135 cm", "Barn under 5 år", "Barn under 100 cm", "Bare babyer"],
  "Barn under 135 cm skal bruke barnesete eller beltestol som passer.",
  "Which children must use an approved child restraint?", ["Children under 135 cm", "Children under 5", "Children under 100 cm", "Only babies"],
  "Children under 135 cm must use a suitable child seat or booster."],
 [null, "Kan et bakovervendt barnesete stå i forsetet foran en aktiv kollisjonspute?", ["Nei, aldri", "Ja, hvis barnet er stort", "Ja, på korte turer", "Ja, hvis setet er skjøvet bakover"],
  "Kollisjonsputen kan skade barnet alvorlig. Den må kobles ut, eller setet må stå bak.",
  "May a rear-facing child seat be in the front seat in front of an active airbag?", ["No, never", "Yes, if the child is big", "Yes, on short trips", "Yes, if the seat is pushed back"],
  "The airbag can seriously injure the child. It must be switched off, or the seat must be in the back."],
 ["refleksvest", "Hva skal alltid være i bilen?", ["Varseltrekant og refleksvest som kan nås fra førerplassen", "Brannslukker og tau", "Snøkjetting hele året", "Reservehjul og jekk til alle hjul"],
  "Refleksvesten skal kunne nås fra førerplassen, så du er synlig når du går ut.",
  "What must always be in the car?", ["A warning triangle and a high-visibility vest reachable from the driver's seat", "A fire extinguisher and a rope", "Snow chains all year", "A spare wheel and a jack for all wheels"],
  "The vest must be reachable from the driver's seat so you are visible when you get out."],
 [null, "Last stikker langt bak bilen. Når skal den merkes?", ["Når den stikker mer enn 1 meter bak", "Når den stikker mer enn 3 meter bak", "Bare om natten", "Aldri"],
  "Last som stikker mer enn 1 meter bak kjøretøyet, skal merkes så andre ser den.",
  "A load sticks out far behind the car. When must it be marked?", ["When it sticks out more than 1 metre behind", "When it sticks out more than 3 metres behind", "Only at night", "Never"],
  "A load sticking out more than 1 metre behind the vehicle must be marked so others see it."],
 ["tilhenger", "Hvor tung tilhenger kan du alltid trekke med førerkort klasse B?", ["En tilhenger med tillatt totalvekt inntil 750 kg", "Alle tilhengere", "Inntil 3500 kg alene", "Bare tilhengere uten last"],
  "En henger inntil 750 kg er alltid lov. Tyngre henger er lov når bil og henger til sammen er høyst 3500 kg.",
  "How heavy a trailer may you always tow with a class B licence?", ["A trailer with a maximum permitted weight up to 750 kg", "Any trailer", "Up to 3,500 kg on its own", "Only empty trailers"],
  "A trailer up to 750 kg is always allowed. A heavier trailer is allowed when car and trailer together are at most 3,500 kg."],
 [null, "En rød varsellampe tennes på dashbordet under kjøring. Hva gjør du?", ["Stanser på et trygt sted og finner ut hva feilen er", "Kjører videre til neste service", "Ser bort fra den", "Øker farten for å komme hjem"],
  "Røde lamper varsler om alvorlige feil, for eksempel bremser eller oljetrykk.",
  "A red warning light comes on while driving. What do you do?", ["Stop somewhere safe and find out what the fault is", "Continue until the next service", "Ignore it", "Speed up to get home"],
  "Red lights warn of serious faults, for example brakes or oil pressure."],
 [null, "Hva kan for lavt dekktrykk føre til?", ["Dårligere veggrep og høyere forbruk", "Kortere bremselengde", "Mindre slitasje", "Bedre komfort uten ulemper"],
  "Riktig dekktrykk gir best grep og lavest forbruk. Sjekk det jevnlig.",
  "What can too low tyre pressure lead to?", ["Worse grip and higher consumption", "Shorter braking distance", "Less wear", "Better comfort without drawbacks"],
  "Correct tyre pressure gives the best grip and lowest consumption. Check it regularly."],
 [null, "Hva er EU-kontroll?", ["Periodisk kontroll av at kjøretøyet er trafikksikkert", "Kontroll av førerkortet", "Fartskontroll", "Kontroll av bompenger"],
  "Kjøretøy skal jevnlig kontrolleres på et godkjent verksted.",
  "What is the EU inspection?", ["A periodic check that the vehicle is roadworthy", "A check of the licence", "A speed check", "A toll check"],
  "Vehicles must be checked regularly at an approved workshop."]
]);

U("FKB", "Vinter, mørke og vanskelige forhold", "Winter, darkness and difficult conditions",
`## Mørke
- En fotgjenger **uten refleks** blir sett på omtrent **25–30 meter** med nærlys. **Med refleks** kan du se henne på omtrent **140 meter**.
- Bruk fjernlys når du kan, og blend ned i god tid.
- Blir du blendet av møtende, se mot **høyre vegkant** og senk farten.

## Glatt føre
- Is kan være ekstra glatt på **bruer**, i skygge og der det er rim. Nullføre (rundt 0 °C) er ekstra glatt.
- Rengjør alle ruter, lys og taket for snø og is før du kjører.
- Med **ABS**: trå bremsen hardt ned og hold den inne; du kan fortsatt styre.
- Senk farten og øk avstanden.

## Vilt
- Elg og hjort kommer ofte flere sammen. Der det er ett dyr, kan det komme flere.
- Du har **plikt til å melde fra til politiet** hvis du kjører på hjortevilt (elg, hjort, rådyr, rein).`,
`## Darkness
- A pedestrian **without a reflector** is seen at about **25–30 metres** with dipped beam. **With a reflector** you can see her at about **140 metres**.
- Use full beam when you can, and dip it in good time.
- If dazzled by oncoming traffic, look towards the **right edge of the road** and slow down.

## Slippery roads
- Ice can be extra slippery on **bridges**, in shade and where there is frost. Around 0 °C is especially slippery.
- Clear all windows, lights and the roof of snow and ice before driving.
- With **ABS**: press the brake hard and keep it pressed; you can still steer.
- Slow down and increase the distance.

## Wildlife
- Moose and deer often come several together. Where there is one animal, more may follow.
- You **must report to the police** if you hit a deer-family animal (moose, red deer, roe deer, reindeer).`,
[
 ["refleks", "Omtrent hvor langt unna ser du en fotgjenger med refleks når du kjører med nærlys?", ["Omtrent 140 meter", "Omtrent 25 meter", "Omtrent 10 meter", "Omtrent 500 meter"],
  "Med refleks ses fotgjengeren på omtrent 140 meter, uten bare på omtrent 25–30 meter.",
  "Roughly how far away do you see a pedestrian with a reflector when driving with dipped beam?", ["About 140 metres", "About 25 metres", "About 10 metres", "About 500 metres"],
  "With a reflector the pedestrian is seen at about 140 metres, without only at about 25–30 metres."],
 [null, "Du blir blendet av møtende bil i mørket. Hva gjør du?", ["Ser mot høyre vegkant og senker farten", "Setter på fjernlys for å blende tilbake", "Lukker øynene et øyeblikk", "Øker farten"],
  "Blikket mot høyre vegkant hjelper deg å holde retningen, og lavere fart gir tid.",
  "You are dazzled by an oncoming car in the dark. What do you do?", ["Look towards the right edge of the road and slow down", "Switch on full beam to dazzle back", "Close your eyes for a moment", "Speed up"],
  "Looking at the right edge helps you keep your direction, and lower speed gives you time."],
 ["glatt", "Hvor kan det være ekstra glatt om vinteren?", ["På bruer og i skygge", "På asfalt i sol", "I tunneler midt på dagen", "På grusveg om sommeren"],
  "Bruer kjøles ned fra begge sider og kan være islagt når resten av vegen er bar.",
  "Where can it be extra slippery in winter?", ["On bridges and in shade", "On asphalt in the sun", "In tunnels at midday", "On gravel roads in summer"],
  "Bridges cool from both sides and can be icy when the rest of the road is bare."],
 [null, "Hvordan bremser du hardt med en bil som har ABS?", ["Trår bremsen hardt ned og holder den inne, og styrer utenom", "Pumper på bremsen", "Bremser forsiktig og slipper", "Trekker i håndbremsen"],
  "ABS hindrer hjulene i å låse seg, så du kan styre mens du bremser fullt.",
  "How do you brake hard in a car with ABS?", ["Press the brake hard, keep it down, and steer around", "Pump the brake", "Brake gently and release", "Pull the handbrake"],
  "ABS stops the wheels locking, so you can steer while braking fully."],
 ["elg", "Du ser en elg krysse vegen foran deg. Hva bør du forvente?", ["At det kan komme flere elger", "At den snur og løper tilbake", "At den står stille til du har passert", "Ingenting, faren er over"],
  "Elg og hjort kommer ofte flere sammen. Senk farten og vær forberedt.",
  "You see a moose crossing the road ahead. What should you expect?", ["That more moose may follow", "That it will turn and run back", "That it will stand still until you pass", "Nothing, the danger is over"],
  "Moose and deer often come several together. Slow down and be ready."],
 [null, "Du har kjørt på et rådyr. Hva må du gjøre?", ["Melde fra til politiet", "Kjøre videre hvis bilen er hel", "Melde fra til kommunen neste uke", "Ingenting"],
  "Det er meldeplikt ved påkjørsel av hjortevilt (elg, hjort, rådyr og rein).",
  "You have hit a roe deer. What must you do?", ["Report it to the police", "Drive on if the car is undamaged", "Tell the municipality next week", "Nothing"],
  "It is mandatory to report hitting deer-family animals (moose, red deer, roe deer and reindeer)."],
 [null, "Hva skal du gjøre med snø og is på bilen før du kjører?", ["Fjerne det fra alle ruter, lys og taket", "Bare skrape en liten luke foran", "Kjøre til snøen blåser av", "Bare fjerne snø fra taket"],
  "Du skal ha fri sikt i alle retninger, og snø fra taket kan fly på andre.",
  "What must you do with snow and ice on the car before driving?", ["Remove it from all windows, lights and the roof", "Only scrape a small hole in front", "Drive until the snow blows off", "Only remove snow from the roof"],
  "You must have a clear view in all directions, and snow from the roof can fly onto others."],
 [null, "Når er vegen ofte glattest?", ["Rundt 0 °C, når det er vann oppå isen", "Ved −20 °C", "Ved +10 °C", "Midt på sommeren"],
  "Vann på is (nullføre) gir svært dårlig friksjon.",
  "When is the road often most slippery?", ["Around 0 °C, when there is water on the ice", "At −20 °C", "At +10 °C", "In midsummer"],
  "Water on ice (around freezing) gives very poor friction."],
 [null, "Hvorfor bør du bruke refleks når du går langs vegen i mørket?", ["Fordi bilførere da ser deg mye tidligere", "Fordi det er påbudt å gå med lykt", "For at du skal se bedre", "Det har ingen betydning"],
  "Med refleks blir du sett fem ganger så langt unna.",
  "Why should you wear a reflector when walking along the road in the dark?", ["Because drivers then see you much earlier", "Because a torch is mandatory", "So that you see better", "It makes no difference"],
  "With a reflector you are seen five times as far away."]
]);

U("FKB", "Ulykker og førstehjelp", "Accidents and first aid",
`## Ved en ulykke
1. **Sikre:** stans, sett på nødblinklys, ta på refleksvest og sett ut varseltrekanten.
2. **Varsle:** ring **113** (medisinsk nødhjelp), **110** (brann) eller **112** (politi).
3. **Hjelpe:** gi førstehjelp til du får avløsning.
Er du innblandet i en ulykke, eller kommer du til en, har du plikt til å stanse og hjelpe.

## Førstehjelp
- Sjekk om personen **reagerer** og om hun **puster normalt**.
- Bevisstløs, men puster normalt: legg henne i **stabilt sideleie** og hold henne varm.
- Puster ikke normalt: start **hjerte-lunge-redning (HLR): 30 kompresjoner og 2 innblåsninger**.
- Stans store blødninger med **direkte trykk**.
- Flytt ikke skadde unødig, bare hvis de er i fare (for eksempel brann).

## Bare materielle skader
Fyll ut **skademelding** sammen, og flytt bilene hvis de hindrer trafikken.`,
`## At an accident
1. **Secure:** stop, turn on hazard lights, put on the high-visibility vest and set out the warning triangle.
2. **Alert:** call **113** (medical emergency), **110** (fire) or **112** (police).
3. **Help:** give first aid until relieved.
If you are involved in an accident, or come across one, you are obliged to stop and help.

## First aid
- Check whether the person **responds** and **breathes normally**.
- Unconscious but breathing normally: place her in the **recovery position** and keep her warm.
- Not breathing normally: start **CPR: 30 compressions and 2 rescue breaths**.
- Stop major bleeding with **direct pressure**.
- Do not move injured people unnecessarily, only if they are in danger (for example fire).

## Damage only
Fill in an **accident report** together, and move the cars if they block traffic.`,
[
 [null, "Hvilket nummer ringer du for medisinsk nødhjelp (ambulanse)?", ["113", "110", "112", "911"],
  "113 er medisinsk nødhjelp, 110 er brann og 112 er politi.",
  "Which number do you call for a medical emergency (ambulance)?", ["113", "110", "112", "911"],
  "113 is medical emergency, 110 is fire and 112 is police."],
 [null, "Hvilket nummer ringer du til politiet i en nødsituasjon?", ["112", "113", "110", "02800"],
  "112 er politiets nødnummer.",
  "Which number do you call for the police in an emergency?", ["112", "113", "110", "02800"],
  "112 is the police emergency number."],
 ["varseltrekant", "Du kommer først til en ulykke. Hva gjør du først?", ["Sikrer stedet med nødblinklys, refleksvest og varseltrekant", "Løper rett bort til bilene", "Tar bilder", "Flytter alle skadde med en gang"],
  "Sikre først, så ikke flere blir skadet. Varsle og hjelp deretter.",
  "You are the first to arrive at an accident. What do you do first?", ["Secure the scene with hazard lights, vest and warning triangle", "Run straight to the cars", "Take photos", "Move all the injured at once"],
  "Secure first so that no one else gets hurt. Then alert and help."],
 [null, "En skadet person er bevisstløs, men puster normalt. Hva gjør du?", ["Legger personen i stabilt sideleie og holder henne varm", "Starter hjerte-lunge-redning", "Gir personen vann", "Setter personen opp"],
  "Stabilt sideleie holder luftveiene åpne.",
  "An injured person is unconscious but breathing normally. What do you do?", ["Place the person in the recovery position and keep her warm", "Start CPR", "Give the person water", "Sit the person up"],
  "The recovery position keeps the airway open."],
 [null, "En person puster ikke normalt. Hva gjør du?", ["Ringer 113 og starter HLR med 30 kompresjoner og 2 innblåsninger", "Legger personen i stabilt sideleie", "Venter på ambulansen", "Gir personen noe å drikke"],
  "HLR holder blodet i gang til ambulansen kommer.",
  "A person is not breathing normally. What do you do?", ["Call 113 and start CPR with 30 compressions and 2 rescue breaths", "Place the person in the recovery position", "Wait for the ambulance", "Give the person something to drink"],
  "CPR keeps the blood flowing until the ambulance arrives."],
 [null, "Hvordan stanser du en stor blødning?", ["Med direkte trykk på såret", "Ved å vaske såret", "Ved å legge personen i sideleie", "Ved å gi personen mat"],
  "Hardt, direkte trykk er det viktigste tiltaket mot store blødninger.",
  "How do you stop major bleeding?", ["With direct pressure on the wound", "By washing the wound", "By putting the person in the recovery position", "By giving the person food"],
  "Firm direct pressure is the most important measure against major bleeding."],
 [null, "Når skal du flytte en skadet person?", ["Bare når personen er i fare, for eksempel ved brann", "Alltid med en gang", "Aldri, uansett", "Når du vil ta bilder"],
  "Unødig flytting kan forverre skader. Flytt bare når det er fare.",
  "When should you move an injured person?", ["Only when the person is in danger, for example from fire", "Always at once", "Never, no matter what", "When you want to take photos"],
  "Unnecessary moving can make injuries worse. Only move them if there is danger."],
 [null, "Har du plikt til å stanse og hjelpe hvis du kommer til en ulykke?", ["Ja", "Bare hvis du er innblandet", "Bare hvis du er lege", "Nei"],
  "Alle som kommer til en ulykke, har plikt til å hjelpe så godt de kan.",
  "Are you obliged to stop and help if you come across an accident?", ["Yes", "Only if you are involved", "Only if you are a doctor", "No"],
  "Everyone who comes across an accident must help as well as they can."],
 [null, "To biler har kollidert uten personskade, og de står midt i vegen. Hva bør dere gjøre?", ["Fylle ut skademelding sammen og flytte bilene så de ikke hindrer trafikken", "La bilene stå til politiet kommer", "Kjøre fra stedet uten å si noe", "Krangle om skylden"],
  "Ved bare materielle skader fyller dere ut skademelding og sørger for at trafikken kan gå.",
  "Two cars have collided with no injuries, and they are in the middle of the road. What should you do?", ["Fill in an accident report together and move the cars so they do not block traffic", "Leave the cars until the police arrive", "Leave without saying anything", "Argue about who is to blame"],
  "With damage only, fill in a report and make sure traffic can flow."]
]);

U("FKB", "Miljø og økonomisk kjøring", "Environment and eco-driving",
`## Kjør smart
- Hold **jevn fart** og se langt fram, så slipper du unødig bremsing og akselerasjon.
- Gir **tidlig opp** (manuelt gir) og bruk motorbremsen.
- Unngå **tomgang**: den forurenser og bruker drivstoff uten å gi nytte.
- Riktig **dekktrykk** og fjerning av takboks og unødig last gir lavere forbruk.
- En elbil kan lade litt tilbake når den bremser med motoren (regenerering).
- Planlegg turen, kombiner ærender, og vurder å gå, sykle eller ta kollektivt.`,
`## Drive smart
- Keep a **steady speed** and look far ahead, so you avoid needless braking and acceleration.
- **Change up early** (manual gearbox) and use engine braking.
- Avoid **idling**: it pollutes and uses fuel without doing anything useful.
- Correct **tyre pressure** and removing roof boxes and unnecessary load reduce consumption.
- An electric car can recover some energy when it brakes with the motor (regeneration).
- Plan your trip, combine errands, and consider walking, cycling or public transport.`,
[
 [null, "Hvilken kjørestil gir lavest forbruk?", ["Jevn fart og å se langt fram", "Hard akselerasjon og hard bremsing", "Høyt turtall", "Kjøre tett bak bilen foran"],
  "Jevn kjøring uten unødige bremser og akselerasjon sparer drivstoff og energi.",
  "Which driving style gives the lowest consumption?", ["Steady speed and looking far ahead", "Hard acceleration and hard braking", "High revs", "Driving close behind the car in front"],
  "Smooth driving without needless braking and acceleration saves fuel and energy."],
 [null, "Hvorfor bør du unngå tomgangskjøring?", ["Den forurenser og bruker drivstoff uten nytte", "Den er god for motoren", "Den lader batteriet best", "Den er påbudt om vinteren"],
  "Tomgang gir utslipp uten at du kommer noen vei.",
  "Why should you avoid idling?", ["It pollutes and uses fuel for nothing", "It is good for the engine", "It charges the battery best", "It is mandatory in winter"],
  "Idling gives emissions without getting you anywhere."],
 [null, "Hva øker forbruket?", ["Takboks og unødig last", "Riktig dekktrykk", "Jevn fart", "Tidlig giring opp"],
  "Takboks øker luftmotstanden, og ekstra vekt krever mer energi.",
  "What increases consumption?", ["A roof box and unnecessary load", "Correct tyre pressure", "Steady speed", "Changing up early"],
  "A roof box increases air resistance, and extra weight needs more energy."],
 [null, "Hva er regenerering på en elbil?", ["At bilen lader litt tilbake når den bremser med motoren", "At batteriet byttes automatisk", "At bilen lader fra sollys", "At dekkene lades"],
  "Elmotoren kan virke som generator når du slipper gassen.",
  "What is regeneration on an electric car?", ["The car recovers some energy when it brakes with the motor", "The battery is replaced automatically", "The car charges from sunlight", "The tyres are charged"],
  "The electric motor can act as a generator when you lift off."],
 [null, "Hva er lurt med manuelt gir for å spare drivstoff?", ["Å gire tidlig opp og holde lavt turtall", "Å kjøre lenge i lavt gir", "Å gire ned før hver bakke uansett", "Å holde høyt turtall"],
  "Lavt turtall i høyt gir gir lavest forbruk ved jevn kjøring.",
  "What is smart with a manual gearbox to save fuel?", ["Changing up early and keeping low revs", "Driving a long time in low gear", "Always changing down before each hill", "Keeping high revs"],
  "Low revs in a high gear give the lowest consumption when driving steadily."]
]);

U("FKB", "Førerkort, prøvetid og regler", "Licence, probation and rules",
`## Veien til førerkort
- Du må ha gjennomført **trafikalt grunnkurs** før du kan øvelseskjøre.
- **Øvelseskjøring** med bil er lov fra **16 år**. Ledsageren må være minst **25 år** og ha hatt førerkort for bil sammenhengende i **5 år**. Bilen skal ha **L-skilt**.
- Opplæringen har obligatoriske kurs, blant annet **sikkerhetskurs på bane** (glattkjøring) og **sikkerhetskurs på veg**.
- Førerkort klasse B kan du få fra **18 år**.

## Teoriprøven
**45 spørsmål**, **90 minutter**. Du består med **høyst 7 feil** (minst 38 riktige).

## Etter at du har fått førerkort
- Du har **prøvetid i 2 år**. Prikkene teller **dobbelt** i prøvetiden.
- Får du **8 prikker i løpet av 3 år**, mister du førerretten i 6 måneder.
- Ha med gyldig førerkort når du kjører.`,
`## The road to a licence
- You must complete the **basic traffic course** before practice driving.
- **Practice driving** a car is allowed from age **16**. The accompanying person must be at least **25** and have held a car licence continuously for **5 years**. The car must have an **L plate**.
- The training includes mandatory courses, such as a **safety course on a track** (skid training) and a **safety course on the road**.
- You can get a class B licence from age **18**.

## The theory test
**45 questions**, **90 minutes**. You pass with **at most 7 mistakes** (at least 38 correct).

## After you get your licence
- You have a **2-year probation period**. Penalty points count **double** during probation.
- If you get **8 points within 3 years**, you lose your licence for 6 months.
- Carry a valid licence when driving.`,
[
 [null, "Hvor mange spørsmål har teoriprøven for klasse B?", ["45", "30", "60", "25"],
  "Teoriprøven har 45 spørsmål, og du har 90 minutter.",
  "How many questions does the class B theory test have?", ["45", "30", "60", "25"],
  "The theory test has 45 questions, and you have 90 minutes."],
 [null, "Hvor mange feil kan du høyst ha for å bestå teoriprøven?", ["7", "3", "10", "0"],
  "Du består med høyst 7 feil, altså minst 38 riktige av 45.",
  "How many mistakes can you have at most and still pass the theory test?", ["7", "3", "10", "0"],
  "You pass with at most 7 mistakes, so at least 38 correct out of 45."],
 [null, "Fra hvilken alder kan du øvelseskjøre bil?", ["16 år", "15 år", "17 år", "18 år"],
  "Du kan øvelseskjøre fra 16 år, etter trafikalt grunnkurs.",
  "From what age may you practise driving a car?", ["16", "15", "17", "18"],
  "You may practise from 16, after the basic traffic course."],
 ["lskilt", "Hvilke krav gjelder for ledsageren ved øvelseskjøring?", ["Minst 25 år og førerkort for bil sammenhengende i 5 år", "Minst 18 år", "Må være kjørelærer", "Minst 21 år og førerkort i 1 år"],
  "Ledsageren må være minst 25 år og ha hatt førerkort for klassen sammenhengende i 5 år.",
  "What requirements apply to the accompanying person during practice driving?", ["At least 25 and a car licence held continuously for 5 years", "At least 18", "Must be a driving instructor", "At least 21 and a licence for 1 year"],
  "The accompanying person must be at least 25 and have held a licence for the class continuously for 5 years."],
 [null, "Hvor lenge varer prøvetiden etter at du har fått førerkort?", ["2 år", "1 år", "3 år", "5 år"],
  "Prøvetiden varer i 2 år. Prikker teller dobbelt i denne perioden.",
  "How long is the probation period after you get your licence?", ["2 years", "1 year", "3 years", "5 years"],
  "The probation period lasts 2 years. Points count double during this period."],
 [null, "Hvor mange prikker innen 3 år gir tap av førerretten?", ["8", "5", "12", "3"],
  "8 prikker i løpet av 3 år gir tap av førerretten i 6 måneder.",
  "How many penalty points within 3 years lead to loss of your licence?", ["8", "5", "12", "3"],
  "8 points within 3 years mean loss of your licence for 6 months."],
 [null, "Hva må du ha gjennomført før du kan øvelseskjøre?", ["Trafikalt grunnkurs", "Teoriprøven", "Sikkerhetskurs på bane", "Førerprøven"],
  "Trafikalt grunnkurs gir grunnlaget og må være fullført før øvelseskjøring.",
  "What must you have completed before practice driving?", ["The basic traffic course", "The theory test", "The track safety course", "The driving test"],
  "The basic traffic course gives the foundation and must be completed before practice driving."],
 [null, "Hva er sikkerhetskurs på bane?", ["Et obligatorisk kurs der du øver på glatt føre og å unngå farer", "En fartsprøve", "Et kurs for å lære å parkere", "Et frivillig kurs for motorsykkel"],
  "På banen lærer du hvor vanskelig det er å stoppe på glatt føre, og hvorfor fart og avstand betyr så mye.",
  "What is the safety course on a track?", ["A mandatory course where you practise on slippery surfaces and avoiding hazards", "A speed test", "A parking course", "A voluntary motorcycle course"],
  "On the track you learn how hard it is to stop on slippery surfaces, and why speed and distance matter so much."],
 [null, "Fra hvilken alder kan du få førerkort klasse B?", ["18 år", "17 år", "16 år", "20 år"],
  "Førerkort for bil kan du få fra fylte 18 år.",
  "From what age can you get a class B licence?", ["18", "17", "16", "20"],
  "You can get a car licence from age 18."]
]);

// ===================== MOTORSYKKEL (A1, A2, A) =====================
U("FKMC", "MC-klasser, alder og utstyr", "Motorcycle classes, age and gear",
`## Klassene
- **A1** fra **16 år**: lett motorsykkel, høyst 125 cm³ og 11 kW.
- **A2** fra **18 år**: motorsykkel med høyst 35 kW.
- **A** fra **24 år**, eller fra **20 år** hvis du har hatt A2 i 2 år: tung motorsykkel.

## Verneutstyr
- **Hjelm** er påbudt for fører og passasjer.
- Bruk hansker, jakke, bukse og støvler laget for MC. Synlige farger og refleks gjør deg lettere å se.
- Motorsykkelen skal alltid kjøres med **lys**.

## Opplæring
Som for bil: trafikalt grunnkurs, øvelseskjøring, obligatoriske kurs og teoriprøve med 45 spørsmål (høyst 7 feil).`,
`## The classes
- **A1** from **16**: light motorcycle, at most 125 cc and 11 kW.
- **A2** from **18**: motorcycle of at most 35 kW.
- **A** from **24**, or from **20** if you have held A2 for 2 years: heavy motorcycle.

## Protective gear
- A **helmet** is mandatory for rider and passenger.
- Wear gloves, jacket, trousers and boots made for motorcycling. Bright colours and reflectors make you easier to see.
- The motorcycle must always be ridden with **lights** on.

## Training
Like for cars: the basic traffic course, practice riding, mandatory courses and a theory test with 45 questions (at most 7 mistakes).`,
[
 [null, "Hvor gammel må du være for å ta førerkort klasse A1?", ["16 år", "15 år", "18 år", "20 år"],
  "A1 (lett motorsykkel) kan du ta fra 16 år.",
  "How old must you be to get a class A1 licence?", ["16", "15", "18", "20"],
  "A1 (light motorcycle) can be taken from 16."],
 [null, "Hva er største tillatte slagvolum for en motorsykkel i klasse A1?", ["125 cm³", "50 cm³", "250 cm³", "500 cm³"],
  "A1 gjelder lett motorsykkel med slagvolum inntil 125 cm³ og effekt inntil 11 kW.",
  "What is the largest engine size for a class A1 motorcycle?", ["125 cc", "50 cc", "250 cc", "500 cc"],
  "A1 covers light motorcycles up to 125 cc and up to 11 kW."],
 [null, "Hvor stor effekt kan en motorsykkel i klasse A2 høyst ha?", ["35 kW", "11 kW", "70 kW", "Ubegrenset"],
  "A2 gjelder motorsykler med effekt inntil 35 kW.",
  "What is the maximum power of a class A2 motorcycle?", ["35 kW", "11 kW", "70 kW", "Unlimited"],
  "A2 covers motorcycles up to 35 kW."],
 [null, "Fra hvilken alder kan du ta klasse A direkte (uten A2 først)?", ["24 år", "18 år", "20 år", "21 år"],
  "Klasse A direkte krever 24 år. Har du hatt A2 i 2 år, kan du ta A fra 20 år.",
  "From what age can you take class A directly (without A2 first)?", ["24", "18", "20", "21"],
  "Class A directly requires age 24. With 2 years of A2, you can take A from 20."],
 [null, "Hvem må bruke hjelm på motorsykkel?", ["Både fører og passasjer", "Bare føreren", "Bare passasjerer under 15 år", "Bare utenfor tettbygd strøk"],
  "Hjelm er påbudt for alle som kjører eller sitter på motorsykkel.",
  "Who must wear a helmet on a motorcycle?", ["Both rider and passenger", "Only the rider", "Only passengers under 15", "Only outside built-up areas"],
  "A helmet is mandatory for everyone riding or sitting on a motorcycle."],
 [null, "Hvorfor bør du velge kjøreklær i synlige farger?", ["Så andre trafikanter ser deg tidligere", "Fordi det er påbudt med gul jakke", "For å holde deg kaldere", "Det har ingen betydning"],
  "Motorsyklister er smale og lette å overse. Synlige farger og refleks hjelper.",
  "Why should you choose riding gear in bright colours?", ["So other road users see you earlier", "Because a yellow jacket is mandatory", "To keep cooler", "It makes no difference"],
  "Motorcyclists are narrow and easy to overlook. Bright colours and reflectors help."],
 [null, "Hvilket verneutstyr er viktig i tillegg til hjelm?", ["Hansker, MC-jakke, bukse og støvler", "Bare solbriller", "Shorts og joggesko om sommeren", "Ingenting, hjelmen er nok"],
  "Godt verneutstyr beskytter mot skrubbsår, brudd og kulde.",
  "What protective gear is important in addition to a helmet?", ["Gloves, motorcycle jacket, trousers and boots", "Only sunglasses", "Shorts and trainers in summer", "Nothing, the helmet is enough"],
  "Good protective gear protects against abrasions, fractures and cold."]
]);

U("FKMC", "Kjøreteknikk og balanse", "Riding technique and balance",
`## Motstyring
Over gangfart styrer du motorsykkelen ved å **presse styret i den retningen du vil svinge**: press på høyre styrehalvdel, så legger sykkelen seg til høyre og svinger til høyre.

![fig:fk_motstyring]

## Blikkteknikk
Se **dit du vil kjøre**, langt fram og gjennom svingen. Du havner der du ser.

## Kjørestilling
- Knærne inntil tanken, avslappede armer og lett grep.
- Jevn eller lett økende **gass** gjennom svingen stabiliserer sykkelen.

## Lav fart
Bruk clutchens slirepunkt, litt gass og **bakbremsen** for å holde balansen i sakte fart og ved u-sving.`,
`## Countersteering
Above walking speed you steer the motorcycle by **pushing the handlebar in the direction you want to turn**: push the right grip, and the bike leans right and turns right.

![fig:fk_motstyring]

## Looking technique
Look **where you want to go**, far ahead and through the bend. You end up where you look.

## Riding position
- Knees against the tank, relaxed arms and a light grip.
- A steady or slightly increasing **throttle** through the bend stabilises the bike.

## Low speed
Use the clutch friction point, a little throttle and the **rear brake** to keep your balance at low speed and in U-turns.`,
[
 [null, "Hva er motstyring?", ["Du presser styret i den retningen du vil svinge, og sykkelen legger seg over", "Du vrir styret motsatt av svingen i lav fart", "Du bremser med forbremsen i svingen", "Du lener deg motsatt vei"],
  "Press på høyre styrehalvdel gir krengning og sving til høyre.",
  "What is countersteering?", ["You push the handlebar in the direction you want to turn, and the bike leans over", "You turn the handlebar the opposite way at low speed", "You brake with the front brake in the bend", "You lean the opposite way"],
  "Pushing the right grip makes the bike lean and turn right."],
 [null, "Du vil svinge til høyre i 60 km/t. Hvilken styrehalvdel presser du fram?", ["Høyre", "Venstre", "Begge", "Ingen, du lener bare kroppen"],
  "Press fram på høyre side for å legge sykkelen til høyre.",
  "You want to turn right at 60 km/h. Which grip do you push forward?", ["Right", "Left", "Both", "Neither, you only lean your body"],
  "Push forward on the right side to lean the bike to the right."],
 [null, "Hvor skal du se når du kjører gjennom en sving?", ["Dit du vil kjøre, langt gjennom svingen", "Rett ned foran forhjulet", "På kanten av vegen", "På møtende trafikk hele tiden"],
  "Du styrer dit du ser. Blikket langt fram gir bedre linje og mer tid.",
  "Where should you look when riding through a bend?", ["Where you want to go, far through the bend", "Straight down in front of the front wheel", "At the edge of the road", "At oncoming traffic all the time"],
  "You steer where you look. Looking far ahead gives a better line and more time."],
 [null, "Hva gjør jevn gass gjennom en sving?", ["Stabiliserer motorsykkelen", "Gjør at sykkelen velter", "Øker bremselengden", "Har ingen virkning"],
  "Jevn eller lett økende gass holder vekten godt fordelt og sykkelen stabil.",
  "What does a steady throttle through a bend do?", ["Stabilises the motorcycle", "Makes the bike fall over", "Increases the braking distance", "Has no effect"],
  "A steady or slightly increasing throttle keeps the weight well balanced and the bike stable."],
 [null, "Hvordan holder du balansen best i svært lav fart?", ["Med clutchens slirepunkt, litt gass og bakbremsen", "Med hard forbrems", "Med høyt turtall og full clutch", "Ved å sette ned begge føttene"],
  "Bakbremsen og slirepunktet gir kontroll uten at sykkelen dukker.",
  "How do you best keep your balance at very low speed?", ["With the clutch friction point, a little throttle and the rear brake", "With hard front braking", "With high revs and the clutch fully out", "By putting both feet down"],
  "The rear brake and friction point give control without the bike diving."],
 [null, "Hvilken kjørestilling er riktig?", ["Knærne inntil tanken og avslappede armer", "Stive armer og hardt grep", "Knærne ut til sidene", "Sitte langt bak på setet"],
  "Avslappede armer lar sykkelen styre fritt, og knærne gir kontakt med sykkelen.",
  "Which riding position is correct?", ["Knees against the tank and relaxed arms", "Stiff arms and a hard grip", "Knees out to the sides", "Sitting far back on the seat"],
  "Relaxed arms let the bike steer freely, and the knees give contact with the bike."]
]);

U("FKMC", "Bremsing og stopplengde", "Braking and stopping distance",
`## Forbrems og bakbrems
- Når du bremser, flyttes vekten framover. Derfor gir **forbremsen mest bremsekraft**, ofte rundt **70 %**.
- Bruk **begge bremsene** samtidig for kortest mulig bremselengde.
- Med **ABS** kan du bremse fullt uten at hjulene låser seg.

## Bremsing i sving
Bremser du hardt i en sving, vil sykkelen reise seg og gå rett fram. **Rett opp sykkelen** og brems, eller brems før svingen.

## Stopplengde
Som for bil: stopplengde = reaksjonslengde + bremselengde. Dobbel fart gir omtrent fire ganger så lang bremselengde.`,
`## Front and rear brake
- When you brake, weight shifts forward. So the **front brake gives most braking force**, often around **70%**.
- Use **both brakes** together for the shortest braking distance.
- With **ABS** you can brake fully without the wheels locking.

## Braking in a bend
If you brake hard in a bend, the bike stands up and goes straight on. **Straighten the bike** and brake, or brake before the bend.

## Stopping distance
Like for cars: stopping distance = reaction distance + braking distance. Double the speed gives about four times the braking distance.`,
[
 [null, "Hvilken brems gir mest bremsekraft på en motorsykkel?", ["Forbremsen", "Bakbremsen", "Motorbremsen", "De er like"],
  "Vekten flyttes framover når du bremser, så forhjulet får mest grep. Forbremsen står for rundt 70 %.",
  "Which brake gives the most braking force on a motorcycle?", ["The front brake", "The rear brake", "Engine braking", "They are equal"],
  "Weight shifts forward when braking, so the front wheel gets most grip. The front brake provides around 70%."],
 [null, "Hvordan får du kortest bremselengde?", ["Ved å bruke begge bremsene samtidig", "Ved bare å bruke bakbremsen", "Ved å bremse med motoren", "Ved å trekke inn clutchen og rulle"],
  "Begge bremsene sammen gir mest bremsekraft.",
  "How do you get the shortest braking distance?", ["By using both brakes together", "By using only the rear brake", "By engine braking", "By pulling the clutch and rolling"],
  "Both brakes together give the most braking force."],
 [null, "Hva skjer hvis du bremser hardt midt i en sving?", ["Sykkelen reiser seg og vil gå rett fram", "Sykkelen svinger skarpere", "Ingenting spesielt", "Bakhjulet løfter seg alltid"],
  "Bremsing i krengning gir en kraft som retter opp sykkelen. Brems før svingen.",
  "What happens if you brake hard in the middle of a bend?", ["The bike stands up and wants to go straight on", "The bike turns more sharply", "Nothing in particular", "The rear wheel always lifts"],
  "Braking while leaned makes the bike stand up. Brake before the bend."],
 [null, "Hva gjør ABS på en motorsykkel?", ["Hindrer at hjulene låser seg ved hard bremsing", "Gjør bremselengden alltid kortere på grus", "Bremser automatisk for deg", "Gjør at du ikke trenger forbremsen"],
  "ABS holder hjulene rullende, så du beholder kontroll og veggrep.",
  "What does ABS do on a motorcycle?", ["Stops the wheels locking under hard braking", "Always shortens braking on gravel", "Brakes automatically for you", "Means you do not need the front brake"],
  "ABS keeps the wheels turning, so you keep control and grip."],
 [null, "Du dobler farten på motorsykkelen. Hva skjer omtrent med bremselengden?", ["Den blir fire ganger så lang", "Den blir dobbelt så lang", "Den blir halvparten", "Den er uendret"],
  "Bremselengden øker med kvadratet av farten, også for motorsykkel.",
  "You double your speed on the motorcycle. What roughly happens to the braking distance?", ["It becomes four times as long", "It doubles", "It halves", "It is unchanged"],
  "The braking distance grows with the square of the speed, for motorcycles too."],
 [null, "Du må bremse hardt i en sving. Hva gjør du?", ["Retter opp sykkelen og bremser", "Bremser bare med bakbremsen i full krengning", "Gir gass", "Lener deg lenger inn"],
  "Oppreist sykkel tåler mest bremsing.",
  "You must brake hard in a bend. What do you do?", ["Straighten the bike and brake", "Brake only with the rear brake at full lean", "Accelerate", "Lean further in"],
  "An upright bike can take the most braking."]
]);

U("FKMC", "Kurver og plassering", "Bends and positioning",
`## Plassering for sikt
Plasser deg i feltet slik at du **ser mest mulig** og **blir sett**:
- **Venstresving:** hold deg mot høyre del av feltet før svingen for bedre sikt.
- **Høyresving:** hold deg mer mot midten av feltet (aldri over midtlinjen).
- Bruk **sen innstyring**: vent med å styre inn til du ser gjennom svingen.

## Sikkerhetsmargin
Hold avstand til midtlinjen i venstresvinger. Kroppen og hjelmen stikker ut over sykkelen når den krenger.

## Kolonnekjøring
Kjør **forskjøvet** i kolonne, med god avstand til sykkelen rett foran.`,
`## Positioning for visibility
Position yourself in the lane so that you **see as much as possible** and **are seen**:
- **Left-hand bend:** keep to the right part of the lane before the bend for a better view.
- **Right-hand bend:** keep more towards the middle of the lane (never over the centre line).
- Use a **late turn-in**: wait to steer in until you can see through the bend.

## Safety margin
Keep away from the centre line in left-hand bends. Your body and helmet stick out beyond the bike when it leans.

## Riding in a group
Ride **staggered** in a group, with good distance to the bike directly in front.`,
[
 [null, "Hvordan bør du plassere deg før en venstresving?", ["Mot høyre del av feltet for bedre sikt", "Helt inntil midtlinjen", "I møtende felt", "Midt i feltet uansett"],
  "Ytre plassering gir bedre sikt gjennom en venstresving og avstand til møtende.",
  "How should you position yourself before a left-hand bend?", ["Towards the right part of the lane for a better view", "Right against the centre line", "In the oncoming lane", "In the middle of the lane regardless"],
  "An outside position gives a better view through a left-hand bend and distance to oncoming traffic."],
 [null, "Hva er sen innstyring?", ["Å vente med å styre inn i svingen til du ser gjennom den", "Å styre inn så tidlig som mulig", "Å bremse i svingen", "Å kjøre sakte ut av svingen"],
  "Sen innstyring gir bedre sikt og mer margin ut av svingen.",
  "What is a late turn-in?", ["Waiting to steer into the bend until you can see through it", "Steering in as early as possible", "Braking in the bend", "Riding slowly out of the bend"],
  "A late turn-in gives a better view and more margin on the way out."],
 [null, "Hvorfor skal du holde god avstand til midtlinjen i en venstresving?", ["Fordi kroppen og hjelmen stikker ut over sykkelen når den krenger", "Fordi det er glattere der", "Fordi du ser dårligere til høyre", "Det har ingen betydning"],
  "I krengning kan hodet ditt komme inn i møtende felt selv om hjulene er i ditt felt.",
  "Why keep well away from the centre line in a left-hand bend?", ["Because your body and helmet stick out beyond the bike when it leans", "Because it is more slippery there", "Because you see less to the right", "It makes no difference"],
  "When leaning, your head can be in the oncoming lane even if the wheels are in yours."],
 [null, "Hvordan kjører dere når dere er flere motorsykler i kolonne?", ["Forskjøvet, med god avstand", "Side om side", "Tett etter hverandre i samme spor", "Uten noen bestemt plassering"],
  "Forskjøvet kjøring gir sikt og plass til å bremse og svinge unna.",
  "How do you ride when several motorcycles are in a group?", ["Staggered, with good distance", "Side by side", "Close behind each other in the same track", "Without any particular positioning"],
  "Staggered riding gives visibility and room to brake and swerve."],
 [null, "Hvor i feltet bør du plassere deg for å bli sett av bilister?", ["Der du er synlig i speilene og for møtende, ofte litt til venstre i feltet", "Helt ute ved kanten", "I blindsonen til bilen foran", "Tett bak lastebiler"],
  "Plasser deg der andre lett ser deg, og unngå blindsoner.",
  "Where in the lane should you be to be seen by drivers?", ["Where you are visible in mirrors and to oncoming traffic, often slightly left in the lane", "Right at the edge", "In the blind spot of the car ahead", "Close behind lorries"],
  "Position yourself where others easily see you, and avoid blind spots."]
]);

U("FKMC", "Synlighet og samspill", "Visibility and interaction",
`## Bli sett
En av de vanligste MC-ulykkene er at en bil **svinger til venstre foran motorsykkelen** fordi bilføreren ikke så den eller bedømte farten feil.
- Motorsykkelen er smal og lett å overse. Bruk lys, synlige klær og en god plassering.
- Vær klar til å bremse når biler venter på å svinge eller kjøre ut.
- Mange motorsykler har **blinklys som ikke slår seg av selv**. Husk å slå dem av.

## Samspill
- Hold god avstand og vær forutsigbar.
- Unngå blindsonene til biler og lastebiler.`,
`## Be seen
One of the most common motorcycle accidents is a car **turning left in front of the motorcycle** because the driver did not see it or misjudged its speed.
- The motorcycle is narrow and easy to overlook. Use lights, visible clothing and good positioning.
- Be ready to brake when cars are waiting to turn or pull out.
- Many motorcycles have **indicators that do not cancel themselves**. Remember to switch them off.

## Interaction
- Keep a good distance and be predictable.
- Avoid the blind spots of cars and lorries.`,
[
 [null, "Hvilken ulykke er blant de vanligste for motorsyklister?", ["En bil svinger til venstre foran motorsykkelen", "Motorsykkelen kolliderer med en fotgjenger", "Motorsykkelen får motorstopp", "Motorsykkelen kjører inn i en rundkjøring"],
  "Bilføreren ser ikke motorsykkelen eller bedømmer farten feil. Vær klar til å bremse.",
  "Which accident is among the most common for motorcyclists?", ["A car turns left in front of the motorcycle", "The motorcycle hits a pedestrian", "The motorcycle stalls", "The motorcycle enters a roundabout"],
  "The driver does not see the motorcycle or misjudges its speed. Be ready to brake."],
 [null, "En bil venter på å svinge ut foran deg. Hva gjør du?", ["Senker farten og er klar til å bremse", "Øker farten for å passere raskt", "Tuter og holder farten", "Kjører helt inntil bilen"],
  "Gå ut fra at bilføreren kanskje ikke har sett deg.",
  "A car is waiting to pull out in front of you. What do you do?", ["Slow down and be ready to brake", "Speed up to pass quickly", "Sound the horn and keep your speed", "Ride close to the car"],
  "Assume the driver may not have seen you."],
 [null, "Hva må du huske med blinklyset på mange motorsykler?", ["Å slå det av selv etter svingen", "At det alltid slår seg av selv", "At det bare brukes om natten", "At det ikke trengs på MC"],
  "Et blinklys som står på, kan få andre til å tro at du skal svinge.",
  "What must you remember about the indicators on many motorcycles?", ["To switch them off yourself after the turn", "That they always cancel themselves", "That they are only used at night", "That they are not needed on a motorcycle"],
  "An indicator left on can make others think you are about to turn."],
 [null, "Hvordan gjør du deg mer synlig på motorsykkel?", ["Lys, synlige klær og god plassering i feltet", "Ved å kjøre fort", "Ved å kjøre tett bak biler", "Ved å bruke mørke klær"],
  "Alt som skiller deg fra bakgrunnen, gjør deg lettere å se.",
  "How do you make yourself more visible on a motorcycle?", ["Lights, visible clothing and good lane positioning", "By riding fast", "By riding close behind cars", "By wearing dark clothes"],
  "Anything that makes you stand out from the background makes you easier to see."],
 [null, "Hvorfor bør du unngå å kjøre i blindsonen til en lastebil?", ["Sjåføren ser deg ikke der", "Det er glattere der", "Det er forbudt å kjøre forbi lastebiler", "Lastebilen bremser alltid brått"],
  "I blindsonen kan lastebilen skifte felt rett inn i deg.",
  "Why should you avoid riding in a lorry's blind spot?", ["The driver cannot see you there", "It is more slippery there", "Overtaking lorries is forbidden", "The lorry always brakes suddenly"],
  "In the blind spot the lorry may change lanes right into you."]
]);

U("FKMC", "Veggrep, føre og vær", "Grip, road surface and weather",
`## Hva gir dårlig veggrep?
- **Grus** i svinger og ved avkjørsler.
- **Vegoppmerking, kumlokk og skinner**, særlig når de er våte.
- **Første regn** etter en tørr periode løser opp olje og støv og gjør vegen glatt.
- **Kalde dekk** har dårligere grep. Kjør forsiktig de første kilometerne.
- Løv, diesel og lappet asfalt.

## Vind og vær
Sterk sidevind kan skyve motorsykkelen. Hold et avslappet grep, og vær forberedt ved bruer og utkjøringer fra tunneler.`,
`## What gives poor grip?
- **Gravel** in bends and at junctions.
- **Road markings, manhole covers and rails**, especially when wet.
- **The first rain** after a dry spell lifts oil and dust and makes the road slippery.
- **Cold tyres** grip less. Ride carefully for the first few kilometres.
- Leaves, diesel and patched asphalt.

## Wind and weather
Strong crosswinds can push the motorcycle. Keep a relaxed grip, and be prepared on bridges and when leaving tunnels.`,
[
 [null, "Når er vegen ofte ekstra glatt for motorsyklister?", ["Når det begynner å regne etter en lang tørr periode", "Når det har regnet i mange dager", "På tørr asfalt midt på dagen", "Om natten i godt vær"],
  "Første regn løser opp olje og støv som har samlet seg på vegen.",
  "When is the road often extra slippery for motorcyclists?", ["When it starts to rain after a long dry spell", "When it has rained for many days", "On dry asphalt at midday", "At night in fine weather"],
  "The first rain lifts oil and dust that have built up on the road."],
 [null, "Hva kan være glatt når det er vått?", ["Vegoppmerking, kumlokk og skinner", "Ny asfalt uten striper", "Grusfritt tørt dekke", "Bremseskiver"],
  "Malte felter og metall gir mye mindre grep enn asfalt når de er våte.",
  "What can be slippery when wet?", ["Road markings, manhole covers and rails", "New asphalt without markings", "Dry gravel-free surface", "Brake discs"],
  "Painted areas and metal give much less grip than asphalt when wet."],
 [null, "Hvordan påvirker kalde dekk veggrepet?", ["Kalde dekk gir dårligere grep", "Kalde dekk gir bedre grep", "Temperaturen betyr ingenting", "Kalde dekk bremser kortere"],
  "Dekkene trenger litt varme for å få godt grep. Kjør rolig i starten.",
  "How do cold tyres affect grip?", ["Cold tyres grip less", "Cold tyres grip more", "Temperature does not matter", "Cold tyres brake shorter"],
  "Tyres need some warmth to grip well. Ride calmly at first."],
 [null, "Hvor er det ofte grus på vegen om våren?", ["I svinger og ved avkjørsler", "Midt på motorvegen", "I tunneler", "På bruer"],
  "Grus blir liggende der biler kutter svingen og ved avkjørsler.",
  "Where is there often gravel on the road in spring?", ["In bends and at junctions", "In the middle of the motorway", "In tunnels", "On bridges"],
  "Gravel collects where cars cut corners and at junctions."],
 [null, "Du kjører ut av en tunnel en dag med sterk vind. Hva bør du være forberedt på?", ["At et vindkast kan skyve sykkelen sidelengs", "At det alltid er glatt", "At lyset er dårligere", "Ingenting spesielt"],
  "Hold et avslappet grep og god margin til kanten og midtlinjen.",
  "You ride out of a tunnel on a very windy day. What should you be ready for?", ["A gust pushing the bike sideways", "It always being slippery", "Worse light", "Nothing in particular"],
  "Keep a relaxed grip and good margins to the edge and centre line."]
]);

U("FKMC", "Vedlikehold og kontroll", "Maintenance and checks",
`## Før turen
Sjekk **dekk** (trykk og slitasje), **lys**, **bremser**, **kjede** og **oljenivå**. Det tar bare et par minutter.

## Kjede
Kjedet skal være **smurt** og ha riktig **slakk** etter instruksjonsboka. Et for stramt eller slakt kjede slites fort og kan hoppe av.

## Dekk
Mål **dekktrykket når dekkene er kalde**. Feil trykk gir dårligere grep og ustabil kjøring.`,
`## Before the ride
Check the **tyres** (pressure and wear), **lights**, **brakes**, **chain** and **oil level**. It only takes a couple of minutes.

## Chain
The chain must be **lubricated** and have the correct **slack** according to the manual. A chain that is too tight or too loose wears quickly and can come off.

## Tyres
Measure **tyre pressure when the tyres are cold**. Wrong pressure gives worse grip and unstable handling.`,
[
 [null, "Når bør du måle dekktrykket på motorsykkelen?", ["Når dekkene er kalde", "Rett etter en lang tur", "Bare ved dekkskift", "Aldri, det holder seg"],
  "Varme dekk gir høyere trykk. Mål kaldt for å få riktig verdi.",
  "When should you check the motorcycle's tyre pressure?", ["When the tyres are cold", "Right after a long ride", "Only when changing tyres", "Never, it stays the same"],
  "Warm tyres give higher pressure. Measure cold to get the right value."],
 [null, "Hva kan skje hvis kjedet er for slakt?", ["Det kan hoppe av og slites raskt", "Motorsykkelen blir raskere", "Ingenting", "Bremsene blir bedre"],
  "Kjedet skal ha riktig slakk og være smurt.",
  "What can happen if the chain is too loose?", ["It can come off and wear quickly", "The motorcycle gets faster", "Nothing", "The brakes get better"],
  "The chain must have the correct slack and be lubricated."],
 [null, "Hva bør du sjekke før hver tur?", ["Dekk, lys, bremser, kjede og olje", "Bare bensinen", "Bare speilene", "Ingenting hvis sykkelen er ny"],
  "En rask sjekk før turen kan avsløre feil før de blir farlige.",
  "What should you check before each ride?", ["Tyres, lights, brakes, chain and oil", "Only the fuel", "Only the mirrors", "Nothing if the bike is new"],
  "A quick check before the ride can reveal faults before they become dangerous."],
 [null, "Hvorfor skal kjedet smøres jevnlig?", ["For å redusere slitasje og gi jevn kraftoverføring", "For at sykkelen skal lyde bedre", "Fordi det er påbudt å ha fett synlig", "Det skal ikke smøres"],
  "Et tørt kjede slites fort og kan ryke.",
  "Why must the chain be lubricated regularly?", ["To reduce wear and give smooth power transfer", "To make the bike sound better", "Because visible grease is mandatory", "It should not be lubricated"],
  "A dry chain wears quickly and can break."]
]);

U("FKMC", "Passasjer og last", "Passenger and load",
`## Passasjer
- Passasjeren skal ha **hjelm**, sitte på et godkjent sete og ha føttene på **fotstøttene**.
- Passasjeren skal **lene seg med** sykkelen og holde seg fast.
- Med passasjer blir motorsykkelen tyngre: **lengre bremselengde** og tregere akselerasjon.
- Juster dekktrykk og fjæring etter instruksjonsboka.

## Last
Plasser lasten **lavt og nær midten**. Tung last høyt og bak gjør sykkelen ustabil.`,
`## Passenger
- The passenger must wear a **helmet**, sit on an approved seat and keep their feet on the **footrests**.
- The passenger should **lean with** the bike and hold on.
- With a passenger the motorcycle is heavier: **longer braking distance** and slower acceleration.
- Adjust tyre pressure and suspension according to the manual.

## Load
Place the load **low and close to the centre**. Heavy load high and at the back makes the bike unstable.`,
[
 [null, "Hvordan påvirker en passasjer motorsykkelen?", ["Lengre bremselengde og tregere akselerasjon", "Kortere bremselengde", "Bedre balanse i lav fart", "Ingen forskjell"],
  "Mer vekt gir lengre bremselengde og endrer hvordan sykkelen oppfører seg.",
  "How does a passenger affect the motorcycle?", ["Longer braking distance and slower acceleration", "Shorter braking distance", "Better balance at low speed", "No difference"],
  "More weight gives a longer braking distance and changes how the bike behaves."],
 [null, "Hva skal passasjeren gjøre i svingene?", ["Lene seg med sykkelen og holde seg fast", "Lene seg motsatt vei", "Sitte helt stiv og se bakover", "Sette ned føttene"],
  "Passasjeren skal følge sykkelens bevegelser.",
  "What should the passenger do in the bends?", ["Lean with the bike and hold on", "Lean the opposite way", "Sit completely stiff and look back", "Put their feet down"],
  "The passenger should follow the bike's movements."],
 [null, "Hvor bør du plassere tung last på motorsykkelen?", ["Lavt og nær midten", "Høyt og langt bak", "På styret", "Bare på den ene siden"],
  "Lavt tyngdepunkt gir stabil motorsykkel.",
  "Where should you place heavy load on the motorcycle?", ["Low and close to the centre", "High and far back", "On the handlebars", "On one side only"],
  "A low centre of gravity gives a stable motorcycle."],
 [null, "Hvor skal passasjeren ha føttene?", ["På fotstøttene", "Hengende ned mot vegen", "På bakhjulet", "Hvor som helst"],
  "Føttene på fotstøttene holder passasjeren stødig og unna varme deler.",
  "Where should the passenger keep their feet?", ["On the footrests", "Hanging down towards the road", "On the rear wheel", "Anywhere"],
  "Feet on the footrests keep the passenger steady and away from hot parts."]
]);

// MC-teoriprøven har også generelle trafikkregler: del kategoriene med bil (egen fremgang per fag).
for(const u of [0, 1, 3, 4, 6, 8]) SHAREUNIT("FKMC", "FKB", u, "Førerkort bil (klasse B)", "Car licence (class B)");
})();
// Teoriprøven: antall spørsmål per kategori (summen er 45). MC: MC-kategoriene først, så de delte.
const DRIVE_TEST = {
  FKB: [6, 6, 5, 4, 4, 4, 4, 4, 3, 3, 1, 1],
  FKMC: [4, 5, 4, 4, 4, 3, 2, 2, 5, 4, 3, 2, 2, 1]
};
