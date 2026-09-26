// ============================================================
//  add_syk_c.js – SYKEPLEIE: Farmakologi (SFARM), Mikrobiologi og smittevern (SMIK), Klinisk sykepleie (SKLIN)
// ============================================================
(() => {
// ================= SFARM 0: Farmakokinetikk =================
THEORY("SFARM", 0, {
nb: `## Hva handler det om?
Farmakokinetikk er hva kroppen gjør med legemidlet: opptak, fordeling, omsetning og utskillelse (ADME på engelsk: absorption, distribution, metabolism, excretion).

## Begreper og formler
- Biotilgjengelighet: hvor stor andel av dosen som når blodet uendret. Intravenøst er den 100 %.
- Førstepassasjemetabolisme: legemidler tatt gjennom munnen passerer leveren før de når resten av kroppen, og en del brytes ned der.
- Leveren omsetter (metaboliserer) de fleste legemidler. Nyrene skiller ut mange av dem.
- Halveringstid ($t_{1/2}$): tiden det tar før konsentrasjonen i blodet er halvert.
- Mengde igjen etter tid $t$: $D \\cdot (1/2)^{t/t_{1/2}}$.
- Etter 4–5 halveringstider er legemidlet nesten helt ute av kroppen, og ved faste doser er det da nådd en stabil konsentrasjon (steady state).
- Eldre har ofte nedsatt nyrefunksjon, så legemidler som skilles ut i nyrene kan hope seg opp.

## Vanlige feil
- Å tro at halveringstiden betyr at halve dosen er borte for alltid etter én halveringstid, og resten etter én til.
- Å glemme at nedsatt nyre- eller leverfunksjon endrer doseringen.

> ADME. Etter 4–5 halveringstider: steady state (eller nesten ute).`,
en: `## What is it about?
Pharmacokinetics is what the body does to the drug: absorption, distribution, metabolism and excretion (ADME).

## Concepts and formulas
- Bioavailability: the fraction of the dose that reaches the blood unchanged. Intravenously it is 100%.
- First-pass metabolism: drugs taken by mouth pass the liver before reaching the rest of the body, and some of the drug is broken down there.
- The liver metabolises most drugs. The kidneys excrete many of them.
- Half-life ($t_{1/2}$): the time it takes for the concentration in the blood to halve.
- Amount left after time $t$: $D \\cdot (1/2)^{t/t_{1/2}}$.
- After 4–5 half-lives the drug is almost completely eliminated, and with regular doses a stable concentration (steady state) has been reached.
- Older people often have reduced kidney function, so drugs excreted by the kidneys can accumulate.

## Common mistakes
- Thinking half-life means half the dose is gone after one half-life and the rest after one more.
- Forgetting that reduced kidney or liver function changes dosing.

> ADME. After 4–5 half-lives: steady state (or almost eliminated).`
});
BIQ("SFARM", 0, [
 ["Hva er biotilgjengeligheten ved intravenøs tilførsel?", ["100 %", "50 %", "Det varierer mellom 0 og 50 %", "0 %"], "Hele dosen går rett i blodet.",
  "What is the bioavailability of intravenous administration?", ["100%", "50%", "It varies between 0 and 50%", "0%"], "The whole dose goes straight into the blood."],
 ["Hva er førstepassasjemetabolisme?", ["At legemidler tatt gjennom munnen delvis brytes ned i leveren før de når resten av kroppen", "At legemidlet skilles ut i nyrene", "At den første dosen alltid er dobbel", "At legemidlet bindes til proteiner"], "Blodet fra tarmen går via portvenen til leveren først.",
  "What is first-pass metabolism?", ["That drugs taken by mouth are partly broken down in the liver before reaching the rest of the body", "That the drug is excreted by the kidneys", "That the first dose is always doubled", "That the drug binds to proteins"], "Blood from the gut goes via the portal vein to the liver first."],
 ["Hvor mange halveringstider tar det omtrent å nå steady state ved faste doser?", ["4–5", "1", "2", "10–12"], "Etter 4–5 halveringstider er konsentrasjonen nesten stabil.",
  "Roughly how many half-lives does it take to reach steady state with regular doses?", ["4–5", "1", "2", "10–12"], "After 4–5 half-lives the concentration is almost stable."],
 ["Et legemiddel har halveringstid 6 timer. Du gir 400 mg. Hvor mye er igjen etter 12 timer?", { n: 100, tol: 0, u: "mg" }, "12 timer er 2 halveringstider: 400 → 200 → 100 mg.",
  "A drug has a half-life of 6 hours. You give 400 mg. How much is left after 12 hours?", null, "12 hours is 2 half-lives: 400 → 200 → 100 mg."]
]);
GEN("SFARM", 0,
 () => { const t12 = R.p([2, 3, 4, 6, 8, 12]), n = R.i(1, 5), D = R.p([100, 200, 400, 500, 800, 1000]); const t = t12 * n, left = D * Math.pow(0.5, n);
   return [T(`Et legemiddel har halveringstid ${t12} timer. Pasienten får ${D} mg. Hvor mye er igjen i kroppen etter ${t} timer?`, `A drug has a half-life of ${t12} hours. The patient gets ${D} mg. How much is left in the body after ${t} hours?`),
     { n: left, tol: 0.1, u: "mg" }, T(`${t} timer er ${n} halveringstider: $${D} \\cdot (1/2)^{${n}} = ${mf(left, 2)}$ mg.`, `${t} hours is ${n} half-lives: $${D} \\cdot (1/2)^{${n}} = ${mf(left, 2)}$ mg.`)]; }
);

// ================= SFARM 1: Farmakodynamikk og bivirkninger =================
THEORY("SFARM", 1, {
nb: `## Hva handler det om?
Farmakodynamikk er hva legemidlet gjør med kroppen: hvor det virker, hvordan og hvor sterkt.

## Begreper
- Reseptor: et protein legemidlet binder seg til.
- Agonist: aktiverer reseptoren (etterligner kroppens eget stoff). Antagonist: blokkerer reseptoren.
- Terapeutisk vindu: området mellom dosen som virker og dosen som gir toksiske effekter. Legemidler med smalt vindu (for eksempel warfarin, digoksin og litium) krever tett oppfølging, ofte med blodprøver.
- Bivirkning: en uønsket effekt ved vanlig dose. Allergisk reaksjon: en immunreaksjon, i verste fall anafylaksi.
- Interaksjon: ett legemiddel endrer effekten av et annet.
- Toleranse: samme dose gir mindre effekt over tid (vanlig ved opioider).

## Vanlige feil
- Å kalle alle uønskede reaksjoner «allergi». De fleste er bivirkninger.

> Agonist aktiverer, antagonist blokkerer. Smalt terapeutisk vindu = tett oppfølging.`,
en: `## What is it about?
Pharmacodynamics is what the drug does to the body: where it acts, how, and how strongly.

## Concepts
- Receptor: a protein the drug binds to.
- Agonist: activates the receptor (mimics the body's own substance). Antagonist: blocks the receptor.
- Therapeutic window: the range between the dose that works and the dose that causes toxic effects. Drugs with a narrow window (for example warfarin, digoxin and lithium) need close monitoring, often with blood tests.
- Adverse effect (side effect): an unwanted effect at a normal dose. Allergic reaction: an immune reaction, at worst anaphylaxis.
- Interaction: one drug changes the effect of another.
- Tolerance: the same dose has less effect over time (common with opioids).

## Common mistakes
- Calling every unwanted reaction an "allergy". Most are side effects.

> Agonist activates, antagonist blocks. Narrow therapeutic window = close monitoring.`
});
BIQ("SFARM", 1, [
 ["Hva gjør en antagonist?", ["Blokkerer reseptoren", "Aktiverer reseptoren", "Øker utskillelsen", "Bryter ned legemidlet"], "En antagonist binder seg uten å aktivere, og hindrer agonister i å virke. Nalokson er en opioidantagonist.",
  "What does an antagonist do?", ["Blocks the receptor", "Activates the receptor", "Increases excretion", "Breaks down the drug"], "An antagonist binds without activating and stops agonists from acting. Naloxone is an opioid antagonist."],
 ["Hvilket legemiddel har smalt terapeutisk vindu?", ["Warfarin", "Paracetamol i vanlig dose", "Vitamin C", "Laktulose"], "Warfarin følges opp med INR fordi forskjellen mellom effekt og blødningsfare er liten.",
  "Which drug has a narrow therapeutic window?", ["Warfarin", "Paracetamol at normal doses", "Vitamin C", "Lactulose"], "Warfarin is monitored with INR because the gap between effect and bleeding risk is small."],
 ["Hva er toleranse?", ["At samme dose gir mindre effekt over tid", "At legemidlet gir allergi", "At legemidlet virker raskere", "At to legemidler påvirker hverandre"], "Toleranse er vanlig ved for eksempel opioider og benzodiazepiner.",
  "What is tolerance?", ["The same dose having less effect over time", "The drug causing allergy", "The drug acting faster", "Two drugs affecting each other"], "Tolerance is common with, for example, opioids and benzodiazepines."],
 ["Hva er anafylaksi?", ["En alvorlig, livstruende allergisk reaksjon", "En vanlig bivirkning", "En overdose", "En interaksjon"], "Anafylaksi gir blant annet blodtrykksfall og pustevansker, og behandles raskt med adrenalin.",
  "What is anaphylaxis?", ["A severe, life-threatening allergic reaction", "A common side effect", "An overdose", "An interaction"], "Anaphylaxis causes, among other things, a drop in blood pressure and breathing difficulties, and is treated quickly with adrenaline."]
]);

// ================= SFARM 2: Viktige legemiddelgrupper =================
THEORY("SFARM", 2, {
nb: `## Hva handler det om?
Noen legemiddelgrupper møter du nesten hver vakt. Du må kjenne hovedvirkningen, de viktigste bivirkningene og hva du skal observere.

## Grupper
- Paracetamol: smertestillende og febernedsettende. Vanlig maksimal døgndose for voksne er 4 g, lavere ved lav vekt, leversykdom eller høy alder. Overdose skader leveren.
- NSAIDs (for eksempel ibuprofen): smertestillende og betennelsesdempende. Kan gi magesår, blødning og nyreskade.
- Opioider (for eksempel morfin og oksykodon): sterke smertestillende. Observer respirasjonsfrekvens og bevissthet (respirasjonsdepresjon), og forebygg forstoppelse. Motgift: nalokson.
- Antikoagulasjon: warfarin følges med INR, og motgift er vitamin K. Lavmolekylært heparin gis ofte som sprøyte under huden. Observer blødning.
- Diuretika: furosemid (slyngediuretikum) gir mye vannlating og kan gi lav kalium.
- Betablokkere: senker puls og blodtrykk. Forsiktighet ved astma.
- Insulin: senker blodsukkeret. Observer tegn på føling (hypoglykemi): svette, skjelving, uro, forvirring.

> Opioid: pust og avføring. Warfarin: INR og blødning. Furosemid: kalium. Insulin: føling.`,
en: `## What is it about?
You meet some drug classes on almost every shift. You must know the main effect, the most important side effects and what to observe.

## Classes
- Paracetamol: pain relief and fever reduction. The usual maximum daily dose for adults is 4 g, lower with low weight, liver disease or old age. Overdose damages the liver.
- NSAIDs (for example ibuprofen): pain relief and anti-inflammatory. Can cause stomach ulcers, bleeding and kidney damage.
- Opioids (for example morphine and oxycodone): strong pain relief. Observe respiratory rate and consciousness (respiratory depression), and prevent constipation. Antidote: naloxone.
- Anticoagulants: warfarin is monitored with INR, and the antidote is vitamin K. Low-molecular-weight heparin is often given as an injection under the skin. Observe for bleeding.
- Diuretics: furosemide (loop diuretic) causes a lot of urination and can cause low potassium.
- Beta blockers: lower heart rate and blood pressure. Caution in asthma.
- Insulin: lowers blood glucose. Watch for signs of hypoglycaemia: sweating, trembling, restlessness, confusion.

> Opioid: breathing and bowels. Warfarin: INR and bleeding. Furosemide: potassium. Insulin: hypoglycaemia.`
});
BIQ("SFARM", 2, [
 ["Hva er motgiften mot opioider?", ["Nalokson", "Vitamin K", "Flumazenil", "Adrenalin"], "Nalokson er en opioidantagonist. (Flumazenil er motgift mot benzodiazepiner.)",
  "What is the antidote to opioids?", ["Naloxone", "Vitamin K", "Flumazenil", "Adrenaline"], "Naloxone is an opioid antagonist. (Flumazenil is the antidote to benzodiazepines.)"],
 ["Hvilken blodprøve brukes for å følge opp warfarinbehandling?", ["INR", "CRP", "HbA1c", "Kreatinin"], "INR viser hvor lang tid blodet bruker på å koagulere.",
  "Which blood test is used to monitor warfarin treatment?", ["INR", "CRP", "HbA1c", "Creatinine"], "INR shows how long the blood takes to clot."],
 ["Hvilken elektrolyttforstyrrelse er vanlig ved bruk av furosemid?", ["Lav kalium (hypokalemi)", "Høy kalium (hyperkalemi)", "Høyt kalsium", "Høyt natrium"], "Slyngediuretika øker utskillelsen av kalium.",
  "Which electrolyte disturbance is common with furosemide?", ["Low potassium (hypokalaemia)", "High potassium (hyperkalaemia)", "High calcium", "High sodium"], "Loop diuretics increase potassium excretion."],
 ["Hva er den viktigste alvorlige bivirkningen å observere ved opioider?", ["Respirasjonsdepresjon", "Diaré", "Høyt blodsukker", "Hårtap"], "Følg respirasjonsfrekvens og bevissthet. Forstoppelse er også svært vanlig.",
  "What is the most important serious side effect to watch for with opioids?", ["Respiratory depression", "Diarrhoea", "High blood glucose", "Hair loss"], "Monitor respiratory rate and consciousness. Constipation is also very common."],
 ["Hva er vanlig maksimal døgndose paracetamol for en frisk voksen?", ["4 g", "1 g", "10 g", "400 mg"], "4 g per døgn, men lavere hos for eksempel eldre, lav vekt og ved leversykdom.",
  "What is the usual maximum daily dose of paracetamol for a healthy adult?", ["4 g", "1 g", "10 g", "400 mg"], "4 g per day, but lower in, for example, older people, low body weight and liver disease."],
 ["Hvilke symptomer kan tyde på føling (hypoglykemi)?", ["Svette, skjelving og forvirring", "Tørste og mye urin", "Feber og hoste", "Kløe og utslett"], "Tørste og mye urin tyder heller på høyt blodsukker.",
  "Which symptoms may indicate hypoglycaemia?", ["Sweating, trembling and confusion", "Thirst and a lot of urine", "Fever and cough", "Itching and a rash"], "Thirst and a lot of urine rather suggest high blood glucose."]
]);

// ================= SFARM 3: Legemiddelhåndtering =================
THEORY("SFARM", 3, {
nb: `## Hva handler det om?
Feil i legemiddelhåndtering er en av de vanligste årsakene til pasientskader. Faste rutiner hindrer at feil når pasienten.

## Begreper
- «De fem R-ene»: riktig pasient, riktig legemiddel, riktig dose, riktig administrasjonsmåte og riktig tidspunkt. Mange legger til riktig dokumentasjon.
- Dobbeltkontroll: to personer kontrollerer uavhengig av hverandre, særlig ved risikolegemidler og ved utregning.
- Administrasjonsmåter: p.o. (gjennom munnen), i.v. (i en vene), s.c. (under huden), i.m. (i en muskel).
- Legemiddelsamstemming: å sikre at legemiddellisten er riktig når pasienten kommer inn og skrives ut.
- Avvik skal meldes. Målet er læring, ikke å finne syndebukker.

> Riktig pasient, legemiddel, dose, administrasjonsmåte og tidspunkt. Si fra og meld avvik.`,
en: `## What is it about?
Errors in medication management are among the most common causes of patient harm. Fixed routines stop errors from reaching the patient.

## Concepts
- "The five rights": right patient, right drug, right dose, right route and right time. Many add right documentation.
- Double-check: two people check independently of each other, especially for high-risk drugs and calculations.
- Routes: p.o. (by mouth), i.v. (into a vein), s.c. (under the skin), i.m. (into a muscle).
- Medication reconciliation: making sure the medication list is correct when the patient is admitted and discharged.
- Incidents must be reported. The goal is learning, not finding someone to blame.

> Right patient, drug, dose, route and time. Speak up and report incidents.`
});
BIQ("SFARM", 3, [
 ["Hva betyr s.c.?", ["Subkutant (under huden)", "Sublingualt (under tungen)", "Intravenøst", "Gjennom munnen"], "s.c. = subkutant. Insulin og lavmolekylært heparin gis ofte s.c.",
  "What does s.c. mean?", ["Subcutaneous (under the skin)", "Sublingual (under the tongue)", "Intravenous", "By mouth"], "s.c. = subcutaneous. Insulin and low-molecular-weight heparin are often given s.c."],
 ["Hva betyr p.o.?", ["Gjennom munnen", "I en muskel", "I en vene", "I endetarmen"], "p.o. = per os, gjennom munnen.",
  "What does p.o. mean?", ["By mouth", "Into a muscle", "Into a vein", "Rectally"], "p.o. = per os, by mouth."],
 ["Hvilken av disse er IKKE en av «de fem R-ene»?", ["Riktig pris", "Riktig pasient", "Riktig dose", "Riktig tidspunkt"], "De fem R-ene er pasient, legemiddel, dose, administrasjonsmåte og tidspunkt.",
  "Which of these is NOT one of \"the five rights\"?", ["Right price", "Right patient", "Right dose", "Right time"], "The five rights are patient, drug, dose, route and time."],
 ["Du oppdager at du har gitt feil dose. Hva gjør du først?", ["Observerer pasienten, varsler ansvarlig lege og melder avvik", "Venter og ser om noe skjer", "Gir en ekstra dose for å rette opp", "Sier ingenting for å unngå bråk"], "Pasientsikkerheten kommer først: observer, varsle lege, dokumenter og meld avvik.",
  "You discover that you gave the wrong dose. What do you do first?", ["Observe the patient, inform the responsible doctor and report the incident", "Wait and see if anything happens", "Give an extra dose to correct it", "Say nothing to avoid trouble"], "Patient safety comes first: observe, inform the doctor, document and report the incident."]
]);

// ================= SMIK 0: Mikroorganismer =================
THEORY("SMIK", 0, {
nb: `## Hva handler det om?
Mikroorganismer er bakterier, virus, sopp og parasitter. De fleste er ufarlige, og mange er nyttige (normalfloraen), men noen gir sykdom.

## Begreper
- Bakterier er encellede organismer uten cellekjerne. De kan behandles med antibiotika.
- Virus er ikke celler og kan bare formere seg inne i levende celler. Antibiotika virker ikke på virus.
- Sopp (for eksempel Candida) gir ofte infeksjoner hos personer med svekket immunforsvar eller etter antibiotikabruk.
- Gram-farging deler bakterier i gram-positive og gram-negative etter celleveggen.
- Noen bakterier danner sporer som tåler tørke og alkohol, for eksempel Clostridioides difficile. Da må man vaske hendene med såpe og vann.
- Normalfloraen på hud og i tarm beskytter mot sykdomsfremkallende mikrober.

> Antibiotika virker på bakterier, ikke på virus. Sporer: såpe og vann, ikke bare sprit.`,
en: `## What is it about?
Microorganisms are bacteria, viruses, fungi and parasites. Most are harmless and many are useful (the normal flora), but some cause disease.

## Concepts
- Bacteria are single-celled organisms without a nucleus. They can be treated with antibiotics.
- Viruses are not cells and can only multiply inside living cells. Antibiotics do not work on viruses.
- Fungi (for example Candida) often cause infections in people with weakened immunity or after antibiotic use.
- Gram staining divides bacteria into gram-positive and gram-negative according to the cell wall.
- Some bacteria form spores that survive drying and alcohol, for example Clostridioides difficile. Then hands must be washed with soap and water.
- The normal flora on the skin and in the gut protects against disease-causing microbes.

> Antibiotics work on bacteria, not on viruses. Spores: soap and water, not just alcohol.`
});
BIQ("SMIK", 0, [
 ["Hvorfor virker ikke antibiotika mot virus?", ["Virus er ikke celler og har ikke det antibiotika angriper", "Virus er for store", "Virus finnes bare i blodet", "Antibiotika virker på alle mikrober"], "Antibiotika angriper strukturer i bakterier, som celleveggen. Virus har ikke disse.",
  "Why do antibiotics not work against viruses?", ["Viruses are not cells and lack what antibiotics attack", "Viruses are too large", "Viruses are only found in the blood", "Antibiotics work on all microbes"], "Antibiotics attack structures in bacteria, such as the cell wall. Viruses do not have these."],
 ["Hvilken håndhygiene er riktig ved Clostridioides difficile?", ["Vask med såpe og vann", "Bare hånddesinfeksjon med sprit", "Bare hansker", "Ingen spesielle tiltak"], "Sporene tåler alkohol, så de må fjernes mekanisk med såpe og vann.",
  "Which hand hygiene is right for Clostridioides difficile?", ["Wash with soap and water", "Only alcohol hand rub", "Only gloves", "No special measures"], "The spores survive alcohol, so they must be removed mechanically with soap and water."],
 ["Hva er normalflora?", ["Mikrobene som naturlig lever på og i kroppen", "Bakterier som alltid gir sykdom", "Virus i luftveiene", "Sopp på sykehuset"], "Normalfloraen konkurrerer med sykdomsfremkallende mikrober. Antibiotika kan forstyrre den.",
  "What is the normal flora?", ["The microbes that naturally live on and in the body", "Bacteria that always cause disease", "Viruses in the airways", "Fungi in the hospital"], "The normal flora competes with disease-causing microbes. Antibiotics can disturb it."]
]);

// ================= SMIK 1: Smittekjeden og basale smittevernrutiner =================
THEORY("SMIK", 1, {
nb: `## Hva handler det om?
Smitte skjer når alle leddene i smittekjeden henger sammen. Bryter du ett ledd, stopper smitten. Basale smittevernrutiner gjelder for alle pasienter, hele tiden.

## Smittekjeden
1. Smittestoff (mikroben).
2. Smittekilde (et menneske, dyr eller en gjenstand der mikroben finnes).
3. Utgangsport (for eksempel luftveier, sår eller avføring).
4. Smittemåte: kontaktsmitte (vanligst på sykehus), dråpesmitte eller luftsmitte.
5. Inngangsport (slimhinner, sår, kateter og innstikksteder).
6. Mottakelig vert (for eksempel eldre, nyfødte og personer med svekket immunforsvar).

## Basale smittevernrutiner
- Håndhygiene er det viktigste tiltaket: hånddesinfeksjon før og etter pasientkontakt, før rene prosedyrer, etter kontakt med kroppsvæsker og etter kontakt med pasientens omgivelser.
- Ingen ringer, klokker eller armbånd, og korte negler.
- Hansker ved fare for kontakt med blod og kroppsvæsker. Hansker erstatter ikke håndhygiene.
- Hostehygiene, riktig håndtering av avfall og tøy, og rengjøring av utstyr.

> Bryt ett ledd i smittekjeden. Håndhygiene er det viktigste tiltaket.`,
en: `## What is it about?
Infection happens when all the links in the chain of infection are connected. Break one link and the infection stops. Standard precautions apply to all patients, all the time.

## The chain of infection
1. Infectious agent (the microbe).
2. Reservoir (a person, animal or object where the microbe lives).
3. Portal of exit (for example the airways, wounds or stool).
4. Mode of transmission: contact (the most common in hospitals), droplet or airborne.
5. Portal of entry (mucous membranes, wounds, catheters and insertion sites).
6. Susceptible host (for example older people, newborns and people with weakened immunity).

## Standard precautions
- Hand hygiene is the most important measure: hand rub before and after patient contact, before clean procedures, after contact with body fluids and after contact with the patient's surroundings.
- No rings, watches or bracelets, and short nails.
- Gloves when there is a risk of contact with blood and body fluids. Gloves do not replace hand hygiene.
- Cough hygiene, correct handling of waste and linen, and cleaning of equipment.

> Break one link in the chain of infection. Hand hygiene is the most important measure.`
});
BIQ("SMIK", 1, [
 ["Hva er det viktigste enkelttiltaket for å hindre smitte på sykehus?", ["Håndhygiene", "Munnbind på alle", "Antibiotika til alle", "Isolering av alle pasienter"], "Kontaktsmitte via hender er den vanligste smitteveien i helsetjenesten.",
  "What is the single most important measure to prevent infection in hospitals?", ["Hand hygiene", "Masks for everyone", "Antibiotics for everyone", "Isolating all patients"], "Contact transmission via hands is the most common route of infection in healthcare."],
 ["Hva er den vanligste smittemåten i helsetjenesten?", ["Kontaktsmitte", "Luftsmitte", "Vannbåren smitte", "Smitte via insekter"], "Kontaktsmitte, direkte eller via hender og utstyr.",
  "What is the most common mode of transmission in healthcare?", ["Contact transmission", "Airborne transmission", "Waterborne transmission", "Transmission via insects"], "Contact transmission, directly or via hands and equipment."],
 ["Erstatter hansker håndhygiene?", ["Nei, du skal ha håndhygiene før og etter bruk av hansker", "Ja, alltid", "Ja, hvis hanskene er sterile", "Bare ved dråpesmitte"], "Hendene kan bli forurenset når hanskene tas av, og hansker kan ha små hull.",
  "Do gloves replace hand hygiene?", ["No, you must perform hand hygiene before and after using gloves", "Yes, always", "Yes, if the gloves are sterile", "Only for droplet transmission"], "Hands can become contaminated when the gloves are removed, and gloves can have tiny holes."],
 ["Et urinkateter er et eksempel på hvilket ledd i smittekjeden?", ["Inngangsport", "Smittekilde", "Smittestoff", "Utgangsport"], "Kateteret gir mikrobene en vei inn i blæren.",
  "A urinary catheter is an example of which link in the chain of infection?", ["Portal of entry", "Reservoir", "Infectious agent", "Portal of exit"], "The catheter gives microbes a route into the bladder."]
]);

// ================= SMIK 2: Antibiotika og resistens =================
THEORY("SMIK", 2, {
nb: `## Hva handler det om?
Antibiotikaresistens betyr at bakterier ikke lenger drepes av antibiotika som tidligere virket. Hvert unødvendig antibiotikaforbruk øker risikoen. Norge har lav forekomst av resistens, blant annet fordi vi bruker smalspektrede antibiotika som penicillin når det er mulig.

## Begreper
- Smalspektret antibiotika treffer få bakterietyper. Bredspektret treffer mange, og forstyrrer normalfloraen mer.
- Resistente bakterier du bør kjenne: MRSA (meticillinresistente gule stafylokokker), ESBL-produserende tarmbakterier og VRE (vankomycinresistente enterokokker).
- Resistens spres ved at bakterier deler gener, og ved smitte mellom mennesker. Godt smittevern bremser spredningen.
- Antibiotika skal tas slik legen har bestemt, og rester skal leveres på apoteket, ikke spares.

> Smalt når det går. Ikke antibiotika mot virus. Smittevern stopper resistente bakterier.`,
en: `## What is it about?
Antibiotic resistance means that bacteria are no longer killed by antibiotics that used to work. Every unnecessary course of antibiotics increases the risk. Norway has low levels of resistance, partly because narrow-spectrum antibiotics such as penicillin are used whenever possible.

## Concepts
- Narrow-spectrum antibiotics hit few types of bacteria. Broad-spectrum ones hit many and disturb the normal flora more.
- Resistant bacteria you should know: MRSA (methicillin-resistant Staphylococcus aureus), ESBL-producing gut bacteria and VRE (vancomycin-resistant enterococci).
- Resistance spreads when bacteria share genes, and through transmission between people. Good infection control slows the spread.
- Antibiotics must be taken as prescribed by the doctor, and leftovers returned to the pharmacy, not saved.

> Narrow when possible. No antibiotics for viruses. Infection control stops resistant bacteria.`
});
BIQ("SMIK", 2, [
 ["Hvorfor foretrekker man smalspektret antibiotika når det er mulig?", ["Det gir mindre resistensutvikling og forstyrrer normalfloraen mindre", "Det er alltid sterkere", "Det virker også mot virus", "Det har ingen bivirkninger"], "Bredspektret antibiotika presser fram resistens hos mange bakterietyper.",
  "Why are narrow-spectrum antibiotics preferred when possible?", ["They cause less resistance and disturb the normal flora less", "They are always stronger", "They also work against viruses", "They have no side effects"], "Broad-spectrum antibiotics drive resistance in many types of bacteria."],
 ["Hva står MRSA for?", ["Meticillinresistente gule stafylokokker", "Multiresistente streptokokker", "Mikrobiell resistens mot sopp", "Et virus som gir lungebetennelse"], "MRSA er gule stafylokokker (Staphylococcus aureus) som er resistente mot vanlige penicilliner.",
  "What does MRSA stand for?", ["Methicillin-resistant Staphylococcus aureus", "Multi-resistant streptococci", "Microbial resistance to fungi", "A virus that causes pneumonia"], "MRSA is Staphylococcus aureus that is resistant to common penicillins."],
 ["Hva skal pasienten gjøre med antibiotika som blir til overs?", ["Levere det på apoteket", "Spare det til neste gang", "Gi det til familien", "Kaste det i do"], "Rester leveres på apoteket. Å bruke det på egen hånd senere øker faren for resistens.",
  "What should the patient do with leftover antibiotics?", ["Return them to the pharmacy", "Save them for next time", "Give them to family", "Flush them down the toilet"], "Leftovers are returned to the pharmacy. Using them later without advice increases the risk of resistance."]
]);

// ================= SKLIN 0: Vitale tegn og normalverdier =================
THEORY("SKLIN", 0, {
nb: `## Hva handler det om?
Vitale tegn er de målingene som raskest forteller om en pasient er stabil: respirasjonsfrekvens, oksygenmetning, blodtrykk, puls, bevissthet og temperatur. Endringer i respirasjonsfrekvensen kommer ofte først.

## Omtrentlige normalverdier hos voksne i hvile
- Respirasjonsfrekvens: 12–20 per minutt.
- Oksygenmetning (SpO₂): 96–100 % (lavere mål kan gjelde ved kronisk lungesykdom, etter legens vurdering).
- Puls: 60–100 slag per minutt (51–90 gir 0 poeng i NEWS2).
- Blodtrykk: omtrent 120/80 mmHg. Systolisk blodtrykk under 90–100 mmHg kan være alvorlig.
- Temperatur: omtrent 36,1–38,0 °C.
- Bevissthet: våken og orientert.

## Slik måler du
- Tell respirasjonen i et helt minutt, uten at pasienten merker det.
- Kjenn pulsen for regelmessighet, ikke bare frekvens.
- Se alltid målingene i sammenheng og sammenlign med pasientens egne tidligere verdier.

> Respirasjonsfrekvensen er ofte det første tegnet på forverring. Tell et helt minutt.`,
en: `## What is it about?
Vital signs are the measurements that most quickly tell whether a patient is stable: respiratory rate, oxygen saturation, blood pressure, pulse, consciousness and temperature. Changes in respiratory rate often come first.

## Approximate normal values in adults at rest
- Respiratory rate: 12–20 per minute.
- Oxygen saturation (SpO₂): 96–100% (lower targets may apply in chronic lung disease, as decided by the doctor).
- Pulse: 60–100 beats per minute (51–90 scores 0 points in NEWS2).
- Blood pressure: about 120/80 mmHg. A systolic blood pressure below 90–100 mmHg can be serious.
- Temperature: about 36.1–38.0 °C.
- Consciousness: awake and oriented.

## How to measure
- Count the respiratory rate for a full minute, without the patient noticing.
- Feel the pulse for regularity, not just rate.
- Always look at the measurements together and compare with the patient's own previous values.

> The respiratory rate is often the first sign of deterioration. Count a full minute.`
});
BIQ("SKLIN", 0, [
 ["Hvilket vitalt tegn endrer seg ofte først når en pasient blir dårligere?", ["Respirasjonsfrekvensen", "Temperaturen", "Blodtrykket", "Vekten"], "Økt respirasjonsfrekvens er et tidlig og ofte oversett varseltegn.",
  "Which vital sign often changes first when a patient deteriorates?", ["The respiratory rate", "The temperature", "The blood pressure", "The weight"], "An increased respiratory rate is an early and often overlooked warning sign."],
 ["Hvor lenge bør du telle respirasjonsfrekvensen?", ["Et helt minutt", "15 sekunder", "5 sekunder", "Til pasienten sier stopp"], "Pustemønsteret er ujevnt, så korte tellinger gir feil. Tell et helt minutt.",
  "How long should you count the respiratory rate?", ["A full minute", "15 seconds", "5 seconds", "Until the patient says stop"], "Breathing is irregular, so short counts give errors. Count a full minute."],
 ["Hva er normal oksygenmetning hos en lungefrisk voksen?", ["96–100 %", "80–85 %", "70–75 %", "100–110 %"], "Hos personer med kronisk lungesykdom kan legen sette et lavere mål.",
  "What is normal oxygen saturation in an adult with healthy lungs?", ["96–100%", "80–85%", "70–75%", "100–110%"], "In people with chronic lung disease, the doctor may set a lower target."],
 ["Hva er normal hvilepuls hos en voksen?", ["60–100 slag/min", "30–50 slag/min", "110–140 slag/min", "150–180 slag/min"], "Veltrente kan ha lavere puls uten at det er sykdom.",
  "What is a normal resting pulse in an adult?", ["60–100 beats/min", "30–50 beats/min", "110–140 beats/min", "150–180 beats/min"], "Well-trained people can have a lower pulse without it being a disease."]
]);

// ================= SKLIN 1: NEWS2 og den akutt syke pasienten =================
THEORY("SKLIN", 1, {
nb: `## Hva handler det om?
NEWS2 (National Early Warning Score 2) gjør vitale tegn om til en poengsum, så forverring oppdages tidlig og alle reagerer likt. ABCDE er rekkefølgen for å undersøke en akutt syk pasient, og ISBAR er en fast måte å rapportere til lege på.

## NEWS2 (skala 1 for SpO₂)
- Respirasjonsfrekvens: ≤8: 3 · 9–11: 1 · 12–20: 0 · 21–24: 2 · ≥25: 3
- SpO₂: ≤91: 3 · 92–93: 2 · 94–95: 1 · ≥96: 0
- Oksygentilførsel: ja: 2 · nei (romluft): 0
- Systolisk blodtrykk: ≤90: 3 · 91–100: 2 · 101–110: 1 · 111–219: 0 · ≥220: 3
- Puls: ≤40: 3 · 41–50: 1 · 51–90: 0 · 91–110: 1 · 111–130: 2 · ≥131: 3
- Bevissthet: våken: 0 · nyoppstått forvirring, reagerer på tiltale, smerte eller ikke i det hele tatt: 3
- Temperatur: ≤35,0: 3 · 35,1–36,0: 1 · 36,1–38,0: 0 · 38,1–39,0: 1 · ≥39,1: 2

Sum 0–4 er lav risiko (men 3 i én enkelt parameter krever rask vurdering), 5–6 middels (haster), og 7 eller mer høy risiko (akutt vurdering).

## ABCDE
Airway (frie luftveier), Breathing (pust), Circulation (sirkulasjon), Disability (bevissthet og nevrologi) og Exposure (undersøk hele kroppen). Behandle det som er livstruende før du går videre.

## ISBAR
Identifikasjon, Situasjon, Bakgrunn, Aktuell vurdering og Råd (hva du trenger).

> NEWS2 ≥ 5: tilkall lege raskt. ≥ 7: akutt. A før B før C.`,
en: `## What is it about?
NEWS2 (National Early Warning Score 2) turns vital signs into a score, so deterioration is detected early and everyone responds the same way. ABCDE is the order for assessing an acutely ill patient, and ISBAR is a fixed way of reporting to a doctor.

## NEWS2 (SpO₂ scale 1)
- Respiratory rate: ≤8: 3 · 9–11: 1 · 12–20: 0 · 21–24: 2 · ≥25: 3
- SpO₂: ≤91: 3 · 92–93: 2 · 94–95: 1 · ≥96: 0
- Supplemental oxygen: yes: 2 · no (room air): 0
- Systolic blood pressure: ≤90: 3 · 91–100: 2 · 101–110: 1 · 111–219: 0 · ≥220: 3
- Pulse: ≤40: 3 · 41–50: 1 · 51–90: 0 · 91–110: 1 · 111–130: 2 · ≥131: 3
- Consciousness: alert: 0 · new confusion, responds to voice, pain or not at all: 3
- Temperature: ≤35.0: 3 · 35.1–36.0: 1 · 36.1–38.0: 0 · 38.1–39.0: 1 · ≥39.1: 2

A total of 0–4 is low risk (but a 3 in a single parameter needs urgent assessment), 5–6 medium (urgent), and 7 or more high risk (emergency assessment).

## ABCDE
Airway, Breathing, Circulation, Disability (consciousness and neurology) and Exposure (examine the whole body). Treat what is life-threatening before moving on.

## ISBAR
Identify, Situation, Background, Assessment and Recommendation (what you need).

> NEWS2 ≥ 5: call the doctor quickly. ≥ 7: emergency. A before B before C.`
});
const news = { rr: v => v <= 8 ? 3 : v <= 11 ? 1 : v <= 20 ? 0 : v <= 24 ? 2 : 3, sp: v => v <= 91 ? 3 : v <= 93 ? 2 : v <= 95 ? 1 : 0,
  sbp: v => v <= 90 ? 3 : v <= 100 ? 2 : v <= 110 ? 1 : v <= 219 ? 0 : 3, hr: v => v <= 40 ? 3 : v <= 50 ? 1 : v <= 90 ? 0 : v <= 110 ? 1 : v <= 130 ? 2 : 3,
  tp: v => v <= 35.0 ? 3 : v <= 36.0 ? 1 : v <= 38.0 ? 0 : v <= 39.0 ? 1 : 2 };
BIQ("SKLIN", 1, [
 ["Hvor mange NEWS2-poeng gir en respirasjonsfrekvens på 26 per minutt?", { n: 3, tol: 0, u: "" }, "≥25 gir 3 poeng.",
  "How many NEWS2 points does a respiratory rate of 26 per minute give?", null, "≥25 gives 3 points."],
 ["Hva står A-en i ABCDE for?", ["Airway (frie luftveier)", "Allergi", "Anamnese", "Alder"], "Frie luftveier sjekkes først, fordi ingenting annet hjelper uten dem.",
  "What does the A in ABCDE stand for?", ["Airway", "Allergy", "History", "Age"], "The airway is checked first, because nothing else helps without it."],
 ["En pasient har NEWS2-sum 7. Hva er riktig respons?", ["Akutt vurdering av lege, ofte med akutteam", "Ny måling om 12 timer", "Ingen tiltak", "Vent til morgenvisitten"], "7 eller mer er høy risiko og krever akutt respons.",
  "A patient has a NEWS2 total of 7. What is the correct response?", ["Emergency assessment by a doctor, often with a rapid response team", "Measure again in 12 hours", "No action", "Wait for the morning round"], "7 or more is high risk and requires an emergency response."],
 ["Hva står R-en i ISBAR for?", ["Råd (hva du trenger fra mottakeren)", "Respirasjon", "Rapport", "Risiko"], "Avslutt med et tydelig ønske, for eksempel «jeg ønsker at du ser på pasienten innen 15 minutter».",
  "What does the R in ISBAR stand for?", ["Recommendation (what you need from the receiver)", "Respiration", "Report", "Risk"], "Finish with a clear request, for example \"I want you to see the patient within 15 minutes\"."],
 ["Pasienten har fått nyoppstått forvirring. Hvor mange NEWS2-poeng gir det?", { n: 3, tol: 0, u: "" }, "Nyoppstått forvirring (eller at pasienten bare reagerer på tiltale, smerte eller ikke i det hele tatt) gir 3 poeng.",
  "The patient has new-onset confusion. How many NEWS2 points does that give?", null, "New confusion (or the patient only responding to voice, pain or not at all) gives 3 points."]
]);
GEN("SKLIN", 1,
 // regn ut NEWS2 for en ny pasient
 () => { const rr = R.p([7, 10, 14, 16, 18, 22, 24, 27, 30]), sp = R.p([89, 92, 93, 94, 95, 96, 97, 98]), o2 = R.i(0, 3) === 0, sbp = R.p([85, 95, 100, 105, 115, 130, 150, 225]),
     hr = R.p([38, 45, 60, 78, 95, 105, 118, 135]), conf = R.i(0, 5) === 0, tp = R.p([34.8, 35.6, 36.5, 37.2, 37.9, 38.4, 39.4]);
   const parts = [news.rr(rr), news.sp(sp), o2 ? 2 : 0, news.sbp(sbp), news.hr(hr), conf ? 3 : 0, news.tp(tp)], sum = parts.reduce((a, b) => a + b, 0);
   return [T(`Regn ut NEWS2 (SpO₂ skala 1). Respirasjonsfrekvens ${rr}/min, SpO₂ ${sp} %, ${o2 ? "får oksygen" : "romluft"}, blodtrykk ${sbp}/70 mmHg, puls ${hr}/min, ${conf ? "nyoppstått forvirring" : "våken og orientert"}, temperatur ${nf(tp, 1)} °C.`,
             `Calculate NEWS2 (SpO₂ scale 1). Respiratory rate ${rr}/min, SpO₂ ${sp}%, ${o2 ? "on oxygen" : "room air"}, blood pressure ${sbp}/70 mmHg, pulse ${hr}/min, ${conf ? "new confusion" : "alert and oriented"}, temperature ${nf(tp, 1)} °C.`),
     { n: sum, tol: 0, u: T("poeng", "points") },
     T(`Respirasjon ${parts[0]} + SpO₂ ${parts[1]} + oksygen ${parts[2]} + blodtrykk ${parts[3]} + puls ${parts[4]} + bevissthet ${parts[5]} + temperatur ${parts[6]} = ${sum} poeng.${sum >= 7 ? " Høy risiko: akutt vurdering." : sum >= 5 ? " Middels risiko: haster." : parts.includes(3) ? " Lav sum, men 3 i én parameter: rask vurdering." : " Lav risiko."}`,
       `Respiration ${parts[0]} + SpO₂ ${parts[1]} + oxygen ${parts[2]} + blood pressure ${parts[3]} + pulse ${parts[4]} + consciousness ${parts[5]} + temperature ${parts[6]} = ${sum} points.${sum >= 7 ? " High risk: emergency assessment." : sum >= 5 ? " Medium risk: urgent." : parts.includes(3) ? " Low total, but a 3 in one parameter: urgent assessment." : " Low risk."}`)]; },
 // ett enkelt parameter
 () => { const k = R.i(0, 3);
   if(k === 0){ const v = R.i(6, 32); return [T(`Hvor mange NEWS2-poeng gir en respirasjonsfrekvens på ${v}/min?`, `How many NEWS2 points does a respiratory rate of ${v}/min give?`), { n: news.rr(v), tol: 0, u: T("poeng", "points") }, T(`Tabellen: ≤8: 3, 9–11: 1, 12–20: 0, 21–24: 2, ≥25: 3. ${v}/min gir ${news.rr(v)} poeng.`, `The table: ≤8: 3, 9–11: 1, 12–20: 0, 21–24: 2, ≥25: 3. ${v}/min gives ${news.rr(v)} points.`)]; }
   if(k === 1){ const v = R.i(35, 145); return [T(`Hvor mange NEWS2-poeng gir en puls på ${v}/min?`, `How many NEWS2 points does a pulse of ${v}/min give?`), { n: news.hr(v), tol: 0, u: T("poeng", "points") }, T(`Tabellen: ≤40: 3, 41–50: 1, 51–90: 0, 91–110: 1, 111–130: 2, ≥131: 3. ${v}/min gir ${news.hr(v)} poeng.`, `The table: ≤40: 3, 41–50: 1, 51–90: 0, 91–110: 1, 111–130: 2, ≥131: 3. ${v}/min gives ${news.hr(v)} points.`)]; }
   if(k === 2){ const v = R.i(80, 230); return [T(`Hvor mange NEWS2-poeng gir et systolisk blodtrykk på ${v} mmHg?`, `How many NEWS2 points does a systolic blood pressure of ${v} mmHg give?`), { n: news.sbp(v), tol: 0, u: T("poeng", "points") }, T(`Tabellen: ≤90: 3, 91–100: 2, 101–110: 1, 111–219: 0, ≥220: 3. ${v} mmHg gir ${news.sbp(v)} poeng.`, `The table: ≤90: 3, 91–100: 2, 101–110: 1, 111–219: 0, ≥220: 3. ${v} mmHg gives ${news.sbp(v)} points.`)]; }
   const v = R.p([34.5, 35.0, 35.5, 36.0, 36.4, 37.5, 38.0, 38.5, 39.0, 39.5, 40.2]); return [T(`Hvor mange NEWS2-poeng gir en temperatur på ${nf(v, 1)} °C?`, `How many NEWS2 points does a temperature of ${nf(v, 1)} °C give?`), { n: news.tp(v), tol: 0, u: T("poeng", "points") }, T(`Tabellen: ≤35,0: 3, 35,1–36,0: 1, 36,1–38,0: 0, 38,1–39,0: 1, ≥39,1: 2. ${nf(v, 1)} °C gir ${news.tp(v)} poeng.`, `The table: ≤35.0: 3, 35.1–36.0: 1, 36.1–38.0: 0, 38.1–39.0: 1, ≥39.1: 2. ${nf(v, 1)} °C gives ${news.tp(v)} points.`)]; }
);

// ================= SKLIN 2: Væskebalanse, ernæring og BMI =================
THEORY("SKLIN", 2, {
nb: `## Hva handler det om?
Mange pasienter er i fare for å få for lite eller for mye væske og næring. Du følger med gjennom væskeregnskap, vekt og ernæringsscreening.

## Begreper og formler
- Væskebalanse = alt som går inn (drikke, mat, intravenøst) minus alt som går ut (urin, oppkast, dren, avføring). I tillegg tapes omtrent 0,5–1 liter i døgnet gjennom hud og pust, som ikke måles.
- Omtrentlig væskebehov hos voksne: 30–35 ml per kg per døgn (mer ved feber og varme).
- BMI (kroppsmasseindeks): $BMI = \\text{vekt (kg)} / \\text{høyde (m)}^2$.
- Normal BMI for voksne: 18,5–24,9. Hos personer over 70 år regnes BMI under 22 som en risiko for underernæring.
- Ufrivillig vekttap (for eksempel mer enn 5 % på tre måneder) er et viktig varseltegn.
- Vekten er den beste enkeltmålingen for å følge væskebalansen over dager: 1 kg vektøkning på kort tid er ofte 1 liter væske.

> $BMI = kg/m^2$. Væskebehov omtrent 30–35 ml/kg/døgn. Vei pasienten.`,
en: `## What is it about?
Many patients are at risk of getting too little or too much fluid and nutrition. You follow this with fluid balance charts, weight and nutritional screening.

## Concepts and formulas
- Fluid balance = everything that goes in (drinks, food, intravenous) minus everything that goes out (urine, vomit, drains, stool). In addition about 0.5–1 litre a day is lost through the skin and breathing, which is not measured.
- Approximate fluid requirement in adults: 30–35 mL per kg per day (more with fever and heat).
- BMI (body mass index): $BMI = \\text{weight (kg)} / \\text{height (m)}^2$.
- Normal BMI for adults: 18.5–24.9. In people over 70, a BMI below 22 is considered a risk of undernutrition.
- Unintentional weight loss (for example more than 5% in three months) is an important warning sign.
- Weight is the best single measurement for following fluid balance over days: a 1 kg weight gain over a short time is often 1 litre of fluid.

> $BMI = kg/m^2$. Fluid requirement about 30–35 mL/kg/day. Weigh the patient.`
});
BIQ("SKLIN", 2, [
 ["En person veier 70 kg og er 1,75 m høy. Hva er BMI?", { n: 22.9, tol: 0.1, u: "kg/m²" }, "$BMI = 70/1{,}75^2 = 70/3{,}0625 \\approx 22{,}9$.",
  "A person weighs 70 kg and is 1.75 m tall. What is the BMI?", null, "$BMI = 70/1.75^2 = 70/3.0625 \\approx 22.9$."],
 ["Hva er det omtrentlige daglige væskebehovet for en voksen?", ["30–35 ml per kg", "5–10 ml per kg", "100 ml per kg", "1 liter uansett vekt"], "For eksempel 70 kg · 30 ml = 2,1 liter per døgn.",
  "What is the approximate daily fluid requirement for an adult?", ["30–35 mL per kg", "5–10 mL per kg", "100 mL per kg", "1 litre regardless of weight"], "For example 70 kg · 30 mL = 2.1 litres per day."],
 ["Hvilken BMI regnes som risiko for underernæring hos en person over 70 år?", ["Under 22", "Under 30", "Over 25", "Under 15 bare"], "Eldre har mindre reserver, så grensen settes høyere enn hos yngre voksne.",
  "Which BMI is considered a risk of undernutrition in a person over 70?", ["Below 22", "Below 30", "Above 25", "Only below 15"], "Older people have smaller reserves, so the limit is set higher than in younger adults."],
 ["Pasienten har gått opp 2 kg på ett døgn. Hva tyder det mest sannsynlig på?", ["Væskeopphopning (omtrent 2 liter)", "Muskelvekst", "Fettøkning", "Målefeil, alltid"], "Rask vektøkning skyldes nesten alltid væske, for eksempel ved hjertesvikt.",
  "The patient has gained 2 kg in one day. What does it most likely indicate?", ["Fluid retention (about 2 litres)", "Muscle growth", "Fat gain", "Measurement error, always"], "Rapid weight gain is almost always fluid, for example in heart failure."]
]);
GEN("SKLIN", 2,
 () => { const w = R.i(45, 120), h = R.p([1.55, 1.60, 1.65, 1.70, 1.75, 1.80, 1.85, 1.90]); const bmi = w / (h * h);
   return [T(`En pasient veier ${w} kg og er ${nf(h, 2)} m høy. Hva er BMI?`, `A patient weighs ${w} kg and is ${nf(h, 2)} m tall. What is the BMI?`), { n: bmi, tol: 0.1, u: "kg/m²" },
     T(`$BMI = ${w}/${mf(h, 2)}^2 = ${w}/${mf(h * h, 4)} \\approx ${mf(bmi, 1)}$.`, `$BMI = ${w}/${mf(h, 2)}^2 = ${w}/${mf(h * h, 4)} \\approx ${mf(bmi, 1)}$.`)]; },
 () => { const inn = [R.p([800, 1000, 1200, 1500]), R.p([0, 500, 1000, 1500])], out = [R.p([900, 1200, 1500, 1800, 2200]), R.p([0, 0, 200, 300, 500])]; const bal = inn[0] + inn[1] - out[0] - out[1];
   return [T(`Siste døgn har pasienten drukket ${inn[0]} ml og fått ${inn[1]} ml intravenøst. Urin var ${out[0]} ml og dren/oppkast ${out[1]} ml. Hva er den målte væskebalansen (ml)?`, `In the last 24 hours the patient drank ${inn[0]} mL and received ${inn[1]} mL intravenously. Urine was ${out[0]} mL and drain/vomit ${out[1]} mL. What is the measured fluid balance (mL)?`),
     { n: bal, tol: 1, u: "ml" }, T(`Inn: ${inn[0] + inn[1]} ml. Ut: ${out[0] + out[1]} ml. Balanse: ${inn[0] + inn[1]} − ${out[0] + out[1]} = ${bal} ml.`, `In: ${inn[0] + inn[1]} mL. Out: ${out[0] + out[1]} mL. Balance: ${inn[0] + inn[1]} − ${out[0] + out[1]} = ${bal} mL.`)]; },
 () => { const w = R.i(45, 110), per = R.p([30, 35]); const need = w * per;
   return [T(`Omtrent hvor mye væske trenger en voksen på ${w} kg per døgn, regnet med ${per} ml/kg?`, `Roughly how much fluid does an adult weighing ${w} kg need per day, using ${per} mL/kg?`), { n: need, tol: 1, u: "ml" },
     T(`${w} · ${per} = ${need} ml per døgn.`, `${w} · ${per} = ${need} mL per day.`)]; }
);
})();
