// ============================================================
//  add_x_jus.js – studiet RETTSVITENSKAP (jus), første studieår (juridisk metode, statsrett,
//  avtale- og kjøpsrett, erstatningsrett, forvaltningsrett og strafferett).
//  Paragrafhenvisninger gjelder lovene slik de er i dag (forvaltningsloven av 1967, straffeloven av 2005).
//  Filnavnet starter med x så den lastes etter de andre add_*-filene.
// ============================================================
GROUP_NAMES["Jus"] = ["Rettsvitenskap", "Law"];
const JUS_EQ = { nb: "Master i rettsvitenskap, 1. studieår", en: "Master of Laws, year 1" };
NEWCOURSE({ code: "JMET", study: "jus", group: "Jus", nb: "Juridisk metode", en: "Legal Method", s: ["JM", "LM"], eqText: JUS_EQ, units: [] });
NEWCOURSE({ code: "JSTAT", study: "jus", group: "Jus", nb: "Statsrett og menneskerettigheter", en: "Constitutional Law and Human Rights", s: ["SR", "CL"], eqText: JUS_EQ, units: [] });
NEWCOURSE({ code: "JAVT", study: "jus", group: "Jus", nb: "Avtale- og kjøpsrett", en: "Contract and Sales Law", s: ["AR", "CO"], eqText: JUS_EQ, units: [] });
NEWCOURSE({ code: "JERS", study: "jus", group: "Jus", nb: "Erstatningsrett", en: "Tort Law", s: ["ER", "TL"], eqText: JUS_EQ, units: [] });
NEWCOURSE({ code: "JFORV", study: "jus", group: "Jus", nb: "Forvaltningsrett", en: "Administrative Law", s: ["FR", "AL"], eqText: JUS_EQ, units: [] });
NEWCOURSE({ code: "JSTR", study: "jus", group: "Jus", nb: "Strafferett", en: "Criminal Law", s: ["St", "CR"], eqText: JUS_EQ, units: [] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
// Flervalg i generatorer: første alternativ er riktig, hvert alternativ er [nb, en].
const MC = (q, opts, ex) => [T(...q), opts.map(o => T(...o)), T(...ex)];
const MND = [["januar", "January"], ["februar", "February"], ["mars", "March"], ["april", "April"], ["mai", "May"], ["juni", "June"], ["juli", "July"], ["august", "August"], ["september", "September"], ["oktober", "October"], ["november", "November"], ["desember", "December"]];
const DAG = [["søndag", "Sunday"], ["mandag", "Monday"], ["tirsdag", "Tuesday"], ["onsdag", "Wednesday"], ["torsdag", "Thursday"], ["fredag", "Friday"], ["lørdag", "Saturday"]];
const dato = d => [`${DAG[d.getUTCDay()][0]} ${d.getUTCDate()}. ${MND[d.getUTCMonth()][0]}`, `${DAG[d.getUTCDay()][1]} ${d.getUTCDate()} ${MND[d.getUTCMonth()][1]}`];
const plus = (d, n) => new Date(d.getTime() + n * 864e5);
const kr = x => nf(Math.round(x), 0);

// ================= JURIDISK METODE =================
const M_RK = ADDUNIT("JMET", "Rettskildene", "The sources of law");
TH("JMET", M_RK, `## Hva handler det om?
Juridisk metode er oppskriften jurister bruker for å finne ut hva som er gjeldende rett: hvilke kilder man kan bruke, og hvor mye hver av dem veier. Den som kan metoden, kan løse oppgaver også innen områder man aldri har lest om.

## Begreper og regler
- **Rettskildefaktorer**: lov (inkludert Grunnloven og forskrifter), lovforarbeider, rettspraksis, forvaltningspraksis, sedvanerett, juridisk teori og **reelle hensyn** (hva som er en god og rimelig løsning).
- **Lovforarbeider**: NOU, proposisjon (Prop. L) og komitéinnstilling. De viser hva lovgiver mente.
- **Prejudikat**: en avgjørelse fra **Høyesterett** som andre domstoler følger i like saker. Plenum og storkammer veier tyngst.
- **Trinnhøyde**: Grunnloven går foran lov, og lov går foran forskrift (**lex superior**).
- **Motstrid** ellers: den spesielle regelen går foran den generelle (**lex specialis**), og den nyeste foran den eldste (**lex posterior**).
- **Legalitetsprinsippet** (Grunnloven § 113): myndighetene trenger hjemmel i lov for å gripe inn overfor borgerne.

### Eksempel
En forskrift sier at en søknad må sendes innen 1 uke, mens loven sier 3 uker. Loven går foran fordi den står høyere (lex superior).

> Finn den relevante regelen, tolk den med de andre rettskildene og bruk den på faktum.

Axle gir en innføring. Sjekk alltid gjeldende lovtekst på Lovdata.`,
`## What is it about?
Legal method is the recipe lawyers use to find out what the law is: which sources may be used and how much each of them weighs. Knowing the method lets you solve problems even in areas you have never read about.

## Key concepts and rules
- **Sources of law**: statutes (including the Constitution and regulations), preparatory works, case law, administrative practice, customary law, legal scholarship and **policy considerations** (what is a good and reasonable result).
- **Preparatory works**: official reports (NOU), the bill (Prop. L) and the committee recommendation. They show what the legislator intended.
- **Precedent**: a **Supreme Court** decision that other courts follow in similar cases. Plenary and grand chamber decisions weigh most.
- **Hierarchy**: the Constitution prevails over statutes, and statutes over regulations (**lex superior**).
- **Other conflicts**: the specific rule prevails over the general one (**lex specialis**), and the newer over the older (**lex posterior**).
- **The principle of legality** (Constitution Article 113): the authorities need a legal basis in statute to interfere with citizens.

### Example
A regulation says an application must be sent within 1 week, while the statute says 3 weeks. The statute prevails because it ranks higher (lex superior).

> Find the relevant rule, interpret it using the other sources of law, and apply it to the facts.

Axle gives an introduction. Always check the current statutory text on Lovdata.`);
BIQ("JMET", M_RK, [
 ["Hvilken rettskilde står høyest?", ["Grunnloven", "Lov", "Forskrift", "Forvaltningspraksis"], "Grunnloven går foran alle andre regler (lex superior).", "Which source of law ranks highest?", ["The Constitution", "A statute", "A regulation", "Administrative practice"], "The Constitution prevails over all other rules (lex superior)."],
 ["En lov og en forskrift er i strid. Hva gjelder?", ["Loven", "Forskriften", "Den nyeste", "Den som er best for borgeren"], "Lov står høyere enn forskrift.", "A statute and a regulation conflict. Which applies?", ["The statute", "The regulation", "The newer one", "The one best for the citizen"], "A statute ranks higher than a regulation."],
 ["Hva betyr lex specialis?", ["Den spesielle regelen går foran den generelle", "Den nyeste regelen går foran", "Den høyeste regelen går foran", "Spesielle saker går til Høyesterett"], "Spesialregelen er laget nettopp for situasjonen.", "What does lex specialis mean?", ["The specific rule prevails over the general one", "The newest rule prevails", "The highest rule prevails", "Special cases go to the Supreme Court"], "The specific rule was made precisely for the situation."],
 ["Hva er et prejudikat?", ["En avgjørelse fra Høyesterett som følges i senere like saker", "Et lovforslag", "En dom fra tingretten", "En forskrift"], "Høyesteretts avgjørelser har prejudikatsvirkning.", "What is a precedent?", ["A Supreme Court decision followed in later similar cases", "A bill", "A district court judgment", "A regulation"], "Supreme Court decisions have precedential effect."],
 ["Hva er et lovforarbeid?", ["Dokumenter fra lovens tilblivelse, som NOU og proposisjon", "En dom", "En lærebok", "En avtale mellom parter"], "Forarbeidene viser hva lovgiver mente.", "What are preparatory works?", ["Documents from the making of the law, such as an NOU and the bill", "A judgment", "A textbook", "An agreement between parties"], "The preparatory works show what the legislator intended."],
 ["Hvilket prinsipp krever lovhjemmel for inngrep overfor borgerne?", ["Legalitetsprinsippet", "Lex posterior", "Avtalefrihet", "Forhandlingsprinsippet"], "Grunnloven § 113.", "Which principle requires a statutory basis for interference with citizens?", ["The principle of legality", "Lex posterior", "Freedom of contract", "The adversarial principle"], "Constitution Article 113."],
 ["Hva menes med reelle hensyn?", ["Vurderinger av hva som er en god og rimelig løsning", "Hva partene faktisk mener", "Hvor mye saken koster", "Hva media skriver"], "Reelle hensyn er en egen rettskildefaktor.", "What are policy considerations (reelle hensyn)?", ["Assessments of what is a good and reasonable result", "What the parties actually think", "How much the case costs", "What the media writes"], "Policy considerations are a source of law in their own right."]
]);
GEN("JMET", M_RK,
 () => R.p([
   () => MC(["En lov fra 2010 og en lov fra 2020 har motstridende generelle regler. Hvilken gjelder normalt?", "A statute from 2010 and one from 2020 contain conflicting general rules. Which usually applies?"], [["Loven fra 2020 (lex posterior)", "The 2020 statute (lex posterior)"], ["Loven fra 2010", "The 2010 statute"], ["Ingen av dem", "Neither"], ["Den som gir lavest straff", "The one with the lowest penalty"]], ["Når to regler på samme trinn er i strid, går den nyeste foran.", "When two rules at the same level conflict, the newer one prevails."]),
   () => MC(["En generell regel i en lov og en spesialregel for leieforhold er i strid i en leiesak. Hva gjelder?", "A general statutory rule and a special rule for tenancies conflict in a tenancy case. Which applies?"], [["Spesialregelen (lex specialis)", "The special rule (lex specialis)"], ["Den generelle regelen", "The general rule"], ["Den eldste regelen", "The older rule"], ["Partene velger fritt", "The parties choose freely"]], ["Spesialregelen er laget for akkurat denne typen forhold.", "The special rule was made for exactly this kind of situation."]),
   () => MC(["En forskrift og Grunnloven er i strid. Hva gjelder?", "A regulation and the Constitution conflict. Which applies?"], [["Grunnloven (lex superior)", "The Constitution (lex superior)"], ["Forskriften", "The regulation"], ["Den nyeste", "The newer one"], ["Den mest detaljerte", "The more detailed one"]], ["Grunnloven står øverst i trinnhøyden.", "The Constitution is at the top of the hierarchy."])
 ])()
);

const M_TOLK = ADDUNIT("JMET", "Lovtolkning", "Statutory interpretation");
TH("JMET", M_TOLK, `## Hva handler det om?
Lovtekst er skrevet med ord, og ord kan forstås på flere måter. Lovtolkning er å finne ut hva regelen faktisk sier om saken du har foran deg.

## Begreper og regler
- **Ordlyden** er utgangspunktet: hva betyr ordene etter en **naturlig språklig forståelse**?
- **Innskrenkende tolkning**: regelen får et snevrere område enn ordlyden tilsier.
- **Utvidende tolkning**: regelen får et videre område enn ordlyden tilsier.
- **Analogi**: en regel brukes på et tilfelle den ikke dekker, fordi tilfellene er like i det vesentlige.
- **Antitetisk tolkning** (motsetningsslutning): når loven nevner noe, gjelder regelen ikke for det som ikke er nevnt.
- **Formål**: hva skal regelen oppnå? Forarbeider og rettspraksis hjelper.
- I strafferetten er det ikke lov å tolke utvidende eller bruke analogi til skade for tiltalte (legalitetsprinsippet).

### Eksempel
Et skilt sier «hunder forbudt». Er en ulv forbudt? Ordlyden sier nei, men formålet (vern mot farlige dyr) taler for analogi. Er en førerhund forbudt? Ordlyden sier ja, men formålet taler for innskrenkende tolkning.

> Start i ordlyden, se på formålet og de andre rettskildene, og vei dem mot hverandre.`,
`## What is it about?
Statutes are written in words, and words can be understood in more than one way. Interpretation is working out what the rule actually says about the case in front of you.

## Key concepts and rules
- **The wording** is the starting point: what do the words mean on a **natural reading**?
- **Restrictive interpretation**: the rule gets a narrower scope than the wording suggests.
- **Extensive interpretation**: the rule gets a wider scope than the wording suggests.
- **Analogy**: a rule is applied to a case it does not cover, because the cases are alike in all essential respects.
- **A contrario reasoning**: when the statute mentions something, the rule does not apply to what is not mentioned.
- **Purpose**: what is the rule meant to achieve? Preparatory works and case law help.
- In criminal law, extensive interpretation and analogy to the detriment of the accused are not allowed (the principle of legality).

### Example
A sign says "dogs prohibited". Is a wolf prohibited? The wording says no, but the purpose (protection from dangerous animals) supports analogy. Is a guide dog prohibited? The wording says yes, but the purpose supports restrictive interpretation.

> Start with the wording, look at the purpose and the other sources, and weigh them against each other.`);
BIQ("JMET", M_TOLK, [
 ["Hva er utgangspunktet for lovtolkning?", ["Ordlyden etter en naturlig språklig forståelse", "Hva dommeren synes", "Forarbeidene", "Juridisk teori"], "Man starter alltid i ordlyden.", "What is the starting point for statutory interpretation?", ["The wording on a natural reading", "What the judge thinks", "The preparatory works", "Legal scholarship"], "You always start with the wording."],
 ["Regelen får et snevrere område enn ordlyden. Hva kalles det?", ["Innskrenkende tolkning", "Utvidende tolkning", "Analogi", "Presiserende tolkning"], "Innskrenkende tolkning.", "The rule gets a narrower scope than the wording. What is that called?", ["Restrictive interpretation", "Extensive interpretation", "Analogy", "Clarifying interpretation"], "Restrictive interpretation."],
 ["En regel brukes på et tilfelle som ligner, men ikke dekkes av ordlyden. Hva kalles det?", ["Analogi", "Antitetisk tolkning", "Innskrenkende tolkning", "Lex posterior"], "Analogi bygger på at tilfellene er like i det vesentlige.", "A rule is applied to a similar case not covered by the wording. What is that called?", ["Analogy", "A contrario reasoning", "Restrictive interpretation", "Lex posterior"], "Analogy rests on the cases being alike in the essentials."],
 ["Hvor er analogi til skade for tiltalte ikke tillatt?", ["I strafferetten", "I avtaleretten", "I erstatningsretten", "I arveretten"], "Legalitetsprinsippet i strafferetten, Grunnloven § 96.", "Where is analogy to the detriment of the accused not allowed?", ["In criminal law", "In contract law", "In tort law", "In inheritance law"], "The principle of legality in criminal law, Constitution Article 96."],
 ["«Bare ektefeller har rett til X». Hva gir en antitetisk tolkning for samboere?", ["De har ikke rett til X", "De har rett til X", "De har halv rett", "Det må avgjøres av Høyesterett"], "Antitetisk: det som ikke er nevnt, faller utenfor.", "\"Only spouses are entitled to X\". What does a contrario reasoning give for cohabitants?", ["They are not entitled to X", "They are entitled to X", "They are half entitled", "The Supreme Court must decide"], "A contrario: what is not mentioned falls outside."],
 ["Hvilken kilde viser best hva lovgiver mente med en regel?", ["Forarbeidene", "En avisartikkel", "Partenes brev", "Sedvanerett"], "Forarbeidene forklarer formålet og innholdet.", "Which source best shows what the legislator intended?", ["The preparatory works", "A newspaper article", "The parties' letters", "Customary law"], "The preparatory works explain the purpose and content."]
]);
GEN("JMET", M_TOLK,
 () => R.p([
   () => MC(["Skiltet sier «sykler forbudt i parken». Et barn på trehjulssykkel kommer. Hvilken tolkning taler for at det er lov?", "The sign says \"bicycles prohibited in the park\". A child on a tricycle arrives. Which interpretation supports allowing it?"], [["Innskrenkende tolkning ut fra formålet", "Restrictive interpretation based on the purpose"], ["Utvidende tolkning", "Extensive interpretation"], ["Analogi", "Analogy"], ["Lex superior", "Lex superior"]], ["Formålet er å hindre fart og ulykker, som et barn på trehjulssykkel ikke gir.", "The purpose is to prevent speed and accidents, which a child on a tricycle does not cause."]),
   () => MC(["Skiltet sier «sykler forbudt i parken». Noen kjører elsparkesykkel. Hvilken tolkning taler for at den også er forbudt?", "The sign says \"bicycles prohibited in the park\". Someone rides an e-scooter. Which interpretation supports prohibiting it too?"], [["Analogi eller utvidende tolkning", "Analogy or extensive interpretation"], ["Innskrenkende tolkning", "Restrictive interpretation"], ["Antitetisk tolkning", "A contrario reasoning"], ["Lex posterior", "Lex posterior"]], ["Elsparkesykkelen gir den samme faren som regelen skal hindre.", "The e-scooter creates the same danger the rule is meant to prevent."])
 ])()
);

const M_DOM = ADDUNIT("JMET", "Domstolene og rettssystemet", "The courts and the legal system");
TH("JMET", M_DOM, `## Hva handler det om?
Domstolene løser tvister mellom folk (sivile saker) og avgjør om noen skal straffes (straffesaker). Norge har tre nivåer, og en sak kan ankes oppover.

## Begreper og regler
- **Tingretten** er første instans. **Lagmannsretten** er ankeinstans. **Høyesterett** er øverste instans.
- Høyesterett tar bare inn saker som har betydning utover den ene saken. **Ankeutvalget** avgjør hvilke saker som slipper inn.
- I Høyesterett avgjøres de fleste saker av **fem dommere**. Viktige saker går i **storkammer** (elleve dommere) eller **plenum**.
- I mange sivile saker må man først gå til **forliksrådet**, som prøver å få partene til å bli enige.
- **Sivil sak**: to parter med en tvist, for eksempel om penger. **Straffesak**: påtalemyndigheten mot en tiltalt.
- **Rettskraft**: en endelig dom kan ikke prøves på nytt.

### Eksempel
En forbruker krever pengene tilbake for en ødelagt sofa. Saken starter i forliksrådet, kan gå videre til tingretten og ankes til lagmannsretten.

> Tingrett → lagmannsrett → Høyesterett.`,
`## What is it about?
The courts settle disputes between people (civil cases) and decide whether someone should be punished (criminal cases). Norway has three levels, and a case can be appealed upwards.

## Key concepts and rules
- **The district court** is the first instance. **The court of appeal** hears appeals. **The Supreme Court** is the highest instance.
- The Supreme Court only takes cases that matter beyond the case itself. **The appeals selection committee** decides which cases get in.
- In the Supreme Court most cases are decided by **five justices**. Important cases go to a **grand chamber** (eleven justices) or the **plenary**.
- In many civil cases you must first go to the **conciliation board**, which tries to get the parties to agree.
- **Civil case**: two parties with a dispute, for example about money. **Criminal case**: the prosecution against a defendant.
- **Res judicata**: a final judgment cannot be tried again.

### Example
A consumer demands a refund for a broken sofa. The case starts at the conciliation board, can go on to the district court and be appealed to the court of appeal.

> District court → court of appeal → Supreme Court.`);
BIQ("JMET", M_DOM, [
 ["Hva er første instans i det ordinære domstolssystemet?", ["Tingretten", "Lagmannsretten", "Høyesterett", "Forliksrådet"], "Tingretten er første instans.", "What is the first instance in the ordinary court system?", ["The district court", "The court of appeal", "The Supreme Court", "The conciliation board"], "The district court is the first instance."],
 ["Hvor mange dommere avgjør vanligvis en sak i Høyesterett?", { n: 5, tol: 0, u: "" }, "Normalt 5 dommere i avdeling.", "How many justices usually decide a case in the Supreme Court?", null, "Normally 5 justices in a division."],
 ["Hvor mange dommere sitter i storkammer i Høyesterett?", { n: 11, tol: 0, u: "" }, "Storkammer har 11 dommere.", "How many justices sit in a Supreme Court grand chamber?", null, "A grand chamber has 11 justices."],
 ["Hvem avgjør om en anke slipper inn til Høyesterett?", ["Høyesteretts ankeutvalg", "Justisministeren", "Lagmannsretten", "Stortinget"], "Ankeutvalget siler sakene.", "Who decides whether an appeal is admitted to the Supreme Court?", ["The Supreme Court appeals selection committee", "The Minister of Justice", "The court of appeal", "Parliament"], "The appeals selection committee filters the cases."],
 ["Hva er forskjellen på en sivil sak og en straffesak?", ["Sivil: tvist mellom parter. Straffesak: påtalemyndigheten mot tiltalte", "Sivil: bare små beløp", "Straffesak: bare i Høyesterett", "Ingen forskjell"], "Straffesaker føres av påtalemyndigheten.", "What is the difference between a civil and a criminal case?", ["Civil: a dispute between parties. Criminal: the prosecution against a defendant", "Civil: only small amounts", "Criminal: only in the Supreme Court", "No difference"], "Criminal cases are brought by the prosecution."],
 ["Hva betyr at en dom er rettskraftig?", ["Den er endelig og kan ikke prøves på nytt", "Den er skrevet av Høyesterett", "Den kan ankes", "Den gjelder bare i ett år"], "Rettskraft hindrer ny sak om det samme.", "What does it mean that a judgment is res judicata?", ["It is final and cannot be tried again", "It was written by the Supreme Court", "It can be appealed", "It is valid for only a year"], "Res judicata prevents a new case on the same matter."]
]);
GEN("JMET", M_DOM,
 () => { const [a, b] = R.p([[["Tingretten", "The district court"], ["Lagmannsretten", "The court of appeal"]], [["Lagmannsretten", "The court of appeal"], ["Høyesterett", "The Supreme Court"]]]);
   return MC([`${a[0]} har avsagt dom. Hvor ankes den normalt?`, `${a[1]} has given judgment. Where is it normally appealed?`], [b, ...[["Forliksrådet", "The conciliation board"], ["Stortinget", "Parliament"], ["Sivilombudet", "The Parliamentary Ombud"], ["Tingretten", "The district court"], ["Høyesterett", "The Supreme Court"]].filter(x => x[0] !== b[0] && x[0] !== a[0]).slice(0, 3)], [`Ankeveien går ${a[0].toLowerCase()} → ${b[0].toLowerCase()}.`, `The appeal route is ${a[1].toLowerCase()} → ${b[1].toLowerCase()}.`]); }
);

// ================= STATSRETT OG MENNESKERETTIGHETER =================
const S_GRL = ADDUNIT("JSTAT", "Grunnloven og maktfordelingen", "The Constitution and separation of powers");
TH("JSTAT", S_GRL, `## Hva handler det om?
Grunnloven fra 1814 er Norges øverste lov. Den fordeler makten mellom tre statsmakter, slik at ingen får for mye makt alene.

## Begreper og regler
- **Stortinget** har den **lovgivende** makten og bevilger penger (budsjettet). Det har **169** representanter (§ 57) og velges hvert **4.** år (§ 54).
- **Regjeringen** (formelt Kongen i statsråd) har den **utøvende** makten: den styrer forvaltningen og gir forskrifter.
- **Domstolene** har den **dømmende** makten. De kan sette til side lover som strider mot Grunnloven (**prøvingsrett**, § 89).
- **Parlamentarisme** (§ 15): regjeringen må gå av hvis Stortinget vedtar mistillit.
- Grunnloven endres etter § 121: forslag i én periode, vedtak i neste, med **to tredjedels** flertall.
- Viktige rettigheter: forbud mot tilbakevirkende lover (§ 97), ytringsfrihet (§ 100), privatliv (§ 102), miljø (§ 112).

### Eksempel
Stortinget vedtar en lov som gjør en handling straffbar fra i fjor. Domstolene kan la være å bruke den fordi den strider mot § 97.

> Lovgivende: Stortinget. Utøvende: regjeringen. Dømmende: domstolene.`,
`## What is it about?
The Constitution of 1814 is Norway's highest law. It divides power between three branches, so that no one gets too much power alone.

## Key concepts and rules
- **Parliament (Stortinget)** holds the **legislative** power and grants money (the budget). It has **169** members (Article 57) and is elected every **4** years (Article 54).
- **The Government** (formally the King in Council) holds the **executive** power: it runs the administration and issues regulations.
- **The courts** hold the **judicial** power. They can set aside statutes that conflict with the Constitution (**judicial review**, Article 89).
- **Parliamentarism** (Article 15): the Government must resign if Parliament passes a vote of no confidence.
- The Constitution is amended under Article 121: proposal in one term, adoption in the next, with a **two-thirds** majority.
- Important rights: no retroactive laws (Article 97), freedom of expression (Article 100), privacy (Article 102), the environment (Article 112).

### Example
Parliament passes a statute making an act punishable from last year. The courts can refuse to apply it because it conflicts with Article 97.

> Legislative: Parliament. Executive: the Government. Judicial: the courts.`);
BIQ("JSTAT", S_GRL, [
 ["Hvor mange representanter har Stortinget?", { n: 169, tol: 0, u: "" }, "Grunnloven § 57: 169 representanter.", "How many members does Parliament (Stortinget) have?", null, "Constitution Article 57: 169 members."],
 ["Hvor ofte er det stortingsvalg?", { n: 4, tol: 0, u: "år" }, "Hvert 4. år, og Stortinget kan ikke oppløses.", "How often are parliamentary elections held?", null, "Every 4 years, and Parliament cannot be dissolved."],
 ["Hvilken statsmakt har den lovgivende makten?", ["Stortinget", "Regjeringen", "Domstolene", "Kongen alene"], "Grunnloven § 49.", "Which branch holds the legislative power?", ["Parliament", "The Government", "The courts", "The King alone"], "Constitution Article 49."],
 ["Hva betyr domstolenes prøvingsrett?", ["Domstolene kan sette til side lover som strider mot Grunnloven", "Domstolene kan lage nye lover", "Domstolene kan avsette regjeringen", "Domstolene kan endre Grunnloven"], "Grunnloven § 89.", "What is judicial review?", ["The courts can set aside statutes that conflict with the Constitution", "The courts can make new statutes", "The courts can dismiss the Government", "The courts can amend the Constitution"], "Constitution Article 89."],
 ["Hvilken paragraf forbyr lover med tilbakevirkende kraft?", ["§ 97", "§ 100", "§ 57", "§ 121"], "Grunnloven § 97.", "Which Article prohibits retroactive laws?", ["Article 97", "Article 100", "Article 57", "Article 121"], "Constitution Article 97."],
 ["Hvilket flertall kreves for å endre Grunnloven?", ["To tredjedeler", "Simpelt flertall", "Tre fjerdedeler", "Enstemmighet"], "§ 121: to tredjedels flertall, med minst to tredjedeler av representantene til stede.", "What majority is needed to amend the Constitution?", ["Two thirds", "A simple majority", "Three quarters", "Unanimity"], "Article 121: a two-thirds majority, with at least two thirds of the members present."],
 ["Hva skjer etter parlamentarismen hvis Stortinget vedtar mistillit mot regjeringen?", ["Regjeringen må gå av", "Stortinget oppløses", "Det blir nyvalg", "Høyesterett avgjør saken"], "Grunnloven § 15.", "Under parliamentarism, what happens if Parliament passes a vote of no confidence in the Government?", ["The Government must resign", "Parliament is dissolved", "A new election is held", "The Supreme Court decides"], "Constitution Article 15."]
]);
GEN("JSTAT", S_GRL,
 () => { const y = R.p([2025, 2029, 2033]), k = R.i(1, 3);
   return [T(`Det var stortingsvalg i ${y}. Hvilket år er det ${k === 1 ? "neste" : k + ". neste"} stortingsvalg?`, `There was a parliamentary election in ${y}. In which year is the ${["", "next", "second next", "third next"][k]} election?`), { n: y + 4 * k, tol: 0, u: "" },
     T(`Valg hvert 4. år: ${y} + ${4 * k} = ${y + 4 * k}.`, `Elections every 4 years: ${y} + ${4 * k} = ${y + 4 * k}.`)]; },
 () => { const f = R.i(113, 169);
   return [T(`Et forslag til grunnlovsendring får ${f} stemmer når alle 169 er til stede. Hvor mange stemmer trengs minst?`, `A constitutional amendment gets ${f} votes with all 169 members present. What is the minimum number of votes needed?`), { n: 113, tol: 0, u: "" },
     T(`To tredjedeler av 169 er 112,7, så det trengs 113 stemmer. Forslaget ${f >= 113 ? "vedtas" : "faller"}.`, `Two thirds of 169 is 112.7, so 113 votes are needed. The proposal ${f >= 113 ? "passes" : "fails"}.`)]; }
);

const S_MR = ADDUNIT("JSTAT", "Menneskerettigheter og EØS", "Human rights and the EEA");
TH("JSTAT", S_MR, `## Hva handler det om?
Norsk rett påvirkes sterkt av internasjonale regler. Menneskerettighetene beskytter den enkelte mot staten, og EØS-avtalen gir felles regler for handel i Europa.

## Begreper og regler
- **Grunnloven § 92**: myndighetene skal respektere og sikre menneskerettighetene.
- **Menneskerettsloven § 3**: fem konvensjoner (blant annet **EMK** og **barnekonvensjonen**) gjelder som norsk lov og går **foran** annen lov ved motstrid.
- **EMK** (Den europeiske menneskerettskonvensjon) håndheves av **EMD** i Strasbourg.
- **EØS-loven § 2**: EØS-regler som er gjennomført i norsk rett, går foran annen lov ved motstrid.
- **EFTA-domstolen** tolker EØS-avtalen for Norge, Island og Liechtenstein.
- **Dualisme**: en traktat gjelder ikke automatisk som norsk rett. Den må gjennomføres, enten ved **inkorporering** (henvisning) eller **transformasjon** (omskriving).

### Eksempel
En regel i en lov strider mot EMK artikkel 8 om privatliv. Etter menneskerettsloven § 3 går EMK foran.

> EMK og EØS-reglene har forrang foran vanlig lov, men ikke foran Grunnloven.`,
`## What is it about?
Norwegian law is strongly shaped by international rules. Human rights protect the individual against the state, and the EEA Agreement gives common rules for trade in Europe.

## Key concepts and rules
- **Constitution Article 92**: the authorities must respect and ensure human rights.
- **Human Rights Act section 3**: five conventions (including the **ECHR** and the **Convention on the Rights of the Child**) apply as Norwegian law and **prevail** over other statutes in a conflict.
- **The ECHR** (European Convention on Human Rights) is enforced by the **ECtHR** in Strasbourg.
- **EEA Act section 2**: EEA rules implemented in Norwegian law prevail over other statutes in a conflict.
- **The EFTA Court** interprets the EEA Agreement for Norway, Iceland and Liechtenstein.
- **Dualism**: a treaty does not automatically apply as Norwegian law. It must be implemented, either by **incorporation** (reference) or **transformation** (rewriting).

### Example
A statutory rule conflicts with ECHR Article 8 on privacy. Under section 3 of the Human Rights Act, the ECHR prevails.

> The ECHR and the EEA rules prevail over ordinary statutes, but not over the Constitution.`);
BIQ("JSTAT", S_MR, [
 ["Hvilken lov gir EMK forrang foran annen norsk lov?", ["Menneskerettsloven § 3", "EØS-loven § 2", "Grunnloven § 57", "Forvaltningsloven § 2"], "Menneskerettsloven § 3.", "Which statute gives the ECHR priority over other Norwegian statutes?", ["The Human Rights Act section 3", "The EEA Act section 2", "Constitution Article 57", "The Public Administration Act section 2"], "The Human Rights Act section 3."],
 ["Hvor ligger Den europeiske menneskerettsdomstolen (EMD)?", ["Strasbourg", "Haag", "Luxembourg", "Genève"], "EMD ligger i Strasbourg.", "Where is the European Court of Human Rights?", ["Strasbourg", "The Hague", "Luxembourg", "Geneva"], "The ECtHR sits in Strasbourg."],
 ["Hvilken domstol tolker EØS-avtalen for Norge?", ["EFTA-domstolen", "EU-domstolen", "EMD", "Høyesterett alene"], "EFTA-domstolen i Luxembourg.", "Which court interprets the EEA Agreement for Norway?", ["The EFTA Court", "The Court of Justice of the EU", "The ECtHR", "The Supreme Court alone"], "The EFTA Court in Luxembourg."],
 ["Hva betyr dualisme?", ["Traktater må gjennomføres før de gjelder som norsk rett", "Norge har to parlamenter", "Alle traktater gjelder automatisk", "Norsk rett og EU-rett er det samme"], "Gjennomføring skjer ved inkorporering eller transformasjon.", "What does dualism mean?", ["Treaties must be implemented before they apply as Norwegian law", "Norway has two parliaments", "All treaties apply automatically", "Norwegian law and EU law are the same"], "Implementation happens by incorporation or transformation."],
 ["Hvor mange konvensjoner er tatt inn i menneskerettsloven?", { n: 5, tol: 0, u: "" }, "5 konvensjoner, blant annet EMK og barnekonvensjonen.", "How many conventions are incorporated in the Human Rights Act?", null, "5 conventions, including the ECHR and the Convention on the Rights of the Child."],
 ["Går EMK foran Grunnloven?", ["Nei, men den går foran vanlig lov", "Ja, alltid", "Bare i straffesaker", "Bare hvis Stortinget sier ja"], "Grunnloven står øverst. EMK har forrang foran annen lov.", "Does the ECHR prevail over the Constitution?", ["No, but it prevails over ordinary statutes", "Yes, always", "Only in criminal cases", "Only if Parliament agrees"], "The Constitution is at the top. The ECHR prevails over other statutes."]
]);
GEN("JSTAT", S_MR,
 () => R.p([
   () => MC(["En lov strider mot barnekonvensjonen. Hva gjelder?", "A statute conflicts with the Convention on the Rights of the Child. Which applies?"], [["Barnekonvensjonen, etter menneskerettsloven § 3", "The convention, under the Human Rights Act section 3"], ["Loven", "The statute"], ["Den nyeste av dem", "The newer of the two"], ["Ingen av dem", "Neither"]], ["Konvensjonene i menneskerettsloven går foran annen lov.", "The conventions in the Human Rights Act prevail over other statutes."]),
   () => MC(["En lov strider mot en EØS-regel som er gjennomført i norsk rett. Hva gjelder?", "A statute conflicts with an EEA rule implemented in Norwegian law. Which applies?"], [["EØS-regelen, etter EØS-loven § 2", "The EEA rule, under the EEA Act section 2"], ["Loven", "The statute"], ["Den eldste", "The older one"], ["Det avgjøres av EU", "The EU decides"]], ["EØS-loven § 2 gir gjennomførte EØS-regler forrang.", "Section 2 of the EEA Act gives implemented EEA rules priority."])
 ])()
);

// ================= AVTALE- OG KJØPSRETT =================
const A_INN = ADDUNIT("JAVT", "Avtaleinngåelse", "Forming a contract");
TH("JAVT", A_INN, `## Hva handler det om?
En avtale blir til når et **tilbud** møtes av en **aksept**. Avtaleloven kapittel 1 har reglene, og de gjelder både for skriftlige, muntlige og digitale avtaler.

## Begreper og regler
- **Tilbud**: et bindende utsagn om å inngå en avtale. Tilbyderen er **bundet** når tilbudet er kommet frem (§ 1 og § 7).
- **Aksept**: et ja til tilbudet. Kommer aksepten for sent, er den et **nytt tilbud** (§ 4).
- **Akseptfrist**: satt av tilbyderen, ellers «rimelig tid» (§ 3).
- En aksept som **ikke stemmer** med tilbudet, regnes som et avslag og et nytt tilbud (§ 6).
- **Tilbakekall** (§ 7): tilbudet faller bort hvis tilbakekallet kommer frem **før eller samtidig med** tilbudet.
- Annonser og prislister er som regel bare **oppfordringer** til å gi tilbud.
- Hovedregelen er **formfrihet**: en muntlig avtale er like bindende som en skriftlig, men den er vanskeligere å bevise.

### Eksempel
Kari tilbyr Ola bilen for 50 000 kr med svarfrist fredag. Ola svarer mandag. Aksepten er for sen, og Karis tilbud binder henne ikke lenger.

> Tilbud + aksept i tide og uten endringer = bindende avtale.`,
`## What is it about?
A contract is formed when an **offer** is met by an **acceptance**. Chapter 1 of the Contracts Act has the rules, and they apply to written, oral and digital agreements alike.

## Key concepts and rules
- **Offer**: a binding statement proposing an agreement. The offeror is **bound** once the offer has reached the offeree (sections 1 and 7).
- **Acceptance**: a yes to the offer. A late acceptance counts as a **new offer** (section 4).
- **Deadline for acceptance**: set by the offeror, otherwise "reasonable time" (section 3).
- An acceptance that **does not match** the offer counts as a rejection and a new offer (section 6).
- **Revocation** (section 7): the offer lapses if the revocation arrives **before or at the same time as** the offer.
- Adverts and price lists are usually only **invitations** to make offers.
- The main rule is **freedom of form**: an oral agreement is as binding as a written one, but it is harder to prove.

### Example
Kari offers Ola her car for 50,000 NOK with a reply deadline of Friday. Ola replies on Monday. The acceptance is late, and Kari's offer no longer binds her.

> Offer + acceptance on time and without changes = a binding contract.`);
BIQ("JAVT", A_INN, [
 ["Når blir en avtale bindende etter avtaleloven?", ["Når et tilbud blir akseptert i tide", "Når den er skrevet ned", "Når den er signert av vitner", "Når pengene er betalt"], "Tilbud + aksept. Skriftlighet er ikke et krav.", "When does a contract become binding under the Contracts Act?", ["When an offer is accepted in time", "When it is written down", "When it is signed by witnesses", "When the money has been paid"], "Offer + acceptance. Writing is not required."],
 ["Aksepten kommer etter fristen. Hva er den da?", ["Et nytt tilbud", "En gyldig aksept", "Et avslag som ikke betyr noe", "En uskyldig feil"], "Avtaleloven § 4.", "The acceptance arrives after the deadline. What is it then?", ["A new offer", "A valid acceptance", "A meaningless rejection", "An innocent mistake"], "Contracts Act section 4."],
 ["Aksepten endrer prisen. Hva er den da?", ["Et avslag og et nytt tilbud", "En gyldig aksept", "Ugyldig for alltid", "En bindende avtale på den nye prisen"], "Avtaleloven § 6.", "The acceptance changes the price. What is it then?", ["A rejection and a new offer", "A valid acceptance", "Void forever", "A binding contract at the new price"], "Contracts Act section 6."],
 ["Er en muntlig avtale bindende?", ["Ja, det er formfrihet", "Nei, avtaler må være skriftlige", "Bare hvis den er under 10 000 kr", "Bare mellom bedrifter"], "Formfrihet er hovedregelen, men bevis kan bli vanskelig.", "Is an oral agreement binding?", ["Yes, there is freedom of form", "No, contracts must be in writing", "Only if it is below 10,000 NOK", "Only between businesses"], "Freedom of form is the main rule, but proof can be hard."],
 ["Hva er en annonse med pris på en nettside vanligvis?", ["En oppfordring til å gi tilbud", "Et bindende tilbud", "En aksept", "En kontrakt"], "Kunden gir tilbudet når hen bestiller.", "What is an advert with a price on a website usually?", ["An invitation to make an offer", "A binding offer", "An acceptance", "A contract"], "The customer makes the offer when ordering."],
 ["Når må et tilbakekall komme frem for at tilbudet skal falle bort?", ["Før eller samtidig med tilbudet", "Innen en uke", "Før mottakeren har akseptert", "Når som helst"], "Avtaleloven § 7.", "When must a revocation arrive for the offer to lapse?", ["Before or at the same time as the offer", "Within a week", "Before the offeree has accepted", "At any time"], "Contracts Act section 7."]
]);
GEN("JAVT", A_INN,
 () => { const start = new Date(Date.UTC(2025, R.i(0, 10), R.i(1, 20))), frist = plus(start, R.p([3, 5, 7])), svar = plus(frist, R.p([-2, -1, 0, 1, 2])), ok = svar <= frist, a = dato(frist), b = dato(svar);
   return MC([`Et tilbud har akseptfrist ${a[0]}. Aksepten kommer frem ${b[0]}. Er avtalen inngått?`, `An offer has an acceptance deadline of ${a[1]}. The acceptance arrives on ${b[1]}. Is a contract formed?`],
     ok ? [["Ja, aksepten kom i tide", "Yes, the acceptance was on time"], ["Nei, aksepten er et nytt tilbud", "No, the acceptance is a new offer"], ["Nei, den må være skriftlig", "No, it must be in writing"], ["Bare hvis tilbyderen samtykker på nytt", "Only if the offeror agrees again"]]
        : [["Nei, den sene aksepten er et nytt tilbud", "No, the late acceptance is a new offer"], ["Ja, aksepten er gyldig", "Yes, the acceptance is valid"], ["Ja, fordi det bare er noen dager", "Yes, because it is only a few days"], ["Ja, hvis prisen er lav", "Yes, if the price is low"]],
     [ok ? "Aksepten kom innen fristen, så avtalen er bindende." : "Etter avtaleloven § 4 regnes en for sen aksept som et nytt tilbud.", ok ? "The acceptance arrived within the deadline, so the contract is binding." : "Under section 4 of the Contracts Act, a late acceptance counts as a new offer."]); }
);

const A_UGY = ADDUNIT("JAVT", "Ugyldighet", "Invalidity");
TH("JAVT", A_UGY, `## Hva handler det om?
Noen ganger er en avtale ikke bindende selv om den er inngått. Avtaleloven kapittel 3 har **ugyldighetsgrunner**.

## Begreper og regler
- **Tvang** (§ 28): grov tvang (vold) gjør avtalen ugyldig selv mot en godtroende. Annen tvang gjør den ugyldig når medkontrahenten er i ond tro.
- **Svik** (§ 30): den ene lurer den andre til å inngå avtalen.
- **Utnyttelse** (§ 31): noen utnytter en annens nød, lettsindighet eller avhengighetsforhold og oppnår en urimelig fordel.
- **Feilskrift** (§ 32): en skrivefeil binder ikke hvis mottakeren forsto eller burde forstå at det var en feil.
- **Tro og love** (§ 33): avtalen kan ikke gjøres gjeldende hvis det strider mot redelighet.
- **Generalklausulen** (§ 36): en avtale kan settes til side eller endres hvis den er **urimelig**. Dette er den viktigste regelen i praksis.

### Eksempel
En nettbutikk skriver 99 kr i stedet for 9 990 kr for en ny TV. En kunde som burde forstå at det var en feil, kan ikke kreve TV-en for 99 kr (§ 32).

> Ugyldighet er unntaket. Hovedregelen er at avtaler skal holdes.`,
`## What is it about?
Sometimes a contract is not binding even though it was formed. Chapter 3 of the Contracts Act lists the **grounds of invalidity**.

## Key concepts and rules
- **Duress** (section 28): serious duress (violence) invalidates the contract even against a party in good faith. Other duress invalidates it when the other party is in bad faith.
- **Fraud** (section 30): one party tricks the other into the contract.
- **Exploitation** (section 31): someone exploits another's distress, recklessness or dependence and gains an unreasonable advantage.
- **Clerical error** (section 32): a typo does not bind if the recipient understood or should have understood that it was a mistake.
- **Good faith** (section 33): the contract cannot be enforced if doing so would be dishonest.
- **The general clause** (section 36): a contract can be set aside or modified if it is **unreasonable**. This is the most important rule in practice.

### Example
An online shop writes 99 NOK instead of 9,990 NOK for a new TV. A customer who should have understood it was a mistake cannot demand the TV for 99 NOK (section 32).

> Invalidity is the exception. The main rule is that contracts must be kept.`);
BIQ("JAVT", A_UGY, [
 ["Hvilken paragraf lar domstolen endre en urimelig avtale?", ["§ 36", "§ 28", "§ 1", "§ 4"], "Generalklausulen i avtaleloven § 36.", "Which section lets the court modify an unreasonable contract?", ["Section 36", "Section 28", "Section 1", "Section 4"], "The general clause, section 36 of the Contracts Act."],
 ["En nettbutikk skriver 10 kr for en PC til 10 000 kr. Hvilken regel er mest aktuell?", ["Feilskrift, § 32", "Svik, § 30", "Tvang, § 28", "Utnyttelse, § 31"], "Kunden burde forstå at prisen var feil.", "An online shop lists a PC worth 10,000 NOK at 10 NOK. Which rule is most relevant?", ["Clerical error, section 32", "Fraud, section 30", "Duress, section 28", "Exploitation, section 31"], "The customer should have understood the price was wrong."],
 ["Selgeren lyver om at bilen aldri har vært kollisjonsskadet. Hvilken ugyldighetsgrunn?", ["Svik, § 30", "Feilskrift, § 32", "Grov tvang, § 28", "Ingen"], "Bevisst uriktige opplysninger er svik.", "The seller lies that the car has never been in a collision. Which ground of invalidity?", ["Fraud, section 30", "Clerical error, section 32", "Serious duress, section 28", "None"], "Deliberately false information is fraud."],
 ["Hva er hovedregelen i avtaleretten?", ["Avtaler skal holdes", "Avtaler kan alltid sies opp", "Bare skriftlige avtaler gjelder", "Den svakeste parten bestemmer"], "Pacta sunt servanda.", "What is the main rule in contract law?", ["Contracts must be kept", "Contracts can always be terminated", "Only written contracts apply", "The weaker party decides"], "Pacta sunt servanda."],
 ["Noen trues med vold til å signere. Hva gjelder?", ["Avtalen er ugyldig, også mot godtroende", "Avtalen er gyldig", "Bare hvis det er politianmeldt", "Den er gyldig hvis beløpet er lite"], "Grov tvang, avtaleloven § 28 første ledd.", "Someone is threatened with violence into signing. What applies?", ["The contract is invalid, even against parties in good faith", "The contract is valid", "Only if it was reported to the police", "It is valid if the amount is small"], "Serious duress, section 28 first paragraph."],
 ["Hva kreves for utnyttelse etter § 31?", ["Noen utnytter en annens nød eller lettsindighet og får en urimelig fordel", "At prisen er lav", "At avtalen er muntlig", "At en part er under 25 år"], "Avtaleloven § 31.", "What is required for exploitation under section 31?", ["Someone exploits another's distress or recklessness and gains an unreasonable advantage", "That the price is low", "That the contract is oral", "That a party is under 25"], "Contracts Act section 31."]
]);
GEN("JAVT", A_UGY,
 () => R.p([
   () => MC(["En eldre person med demens selger huset til en nabo for halv pris etter press. Hvilke regler er mest aktuelle?", "An elderly person with dementia sells the house to a neighbour at half price after pressure. Which rules are most relevant?"], [["Utnyttelse (§ 31) og urimelighet (§ 36)", "Exploitation (section 31) and unreasonableness (section 36)"], ["Feilskrift (§ 32)", "Clerical error (section 32)"], ["Aksept for sent (§ 4)", "Late acceptance (section 4)"], ["Tilbakekall (§ 7)", "Revocation (section 7)"]], ["Svekket evne og en urimelig fordel peker mot § 31 og § 36.", "Impaired capacity and an unreasonable advantage point to sections 31 and 36."]),
   () => MC(["En kjøper visste at selgeren tok feil av prisen, men sa ingenting. Hvilken regel er aktuell?", "A buyer knew the seller was mistaken about the price but said nothing. Which rule is relevant?"], [["Tro og love (§ 33)", "Good faith (section 33)"], ["Grov tvang (§ 28)", "Serious duress (section 28)"], ["Aksept for sent (§ 4)", "Late acceptance (section 4)"], ["Ingen, avtalen gjelder alltid", "None, the contract always applies"]], ["Det er uredelig å gjøre gjeldende en avtale man vet bygger på en feil.", "It is dishonest to enforce a contract you know is based on a mistake."])
 ])()
);

const A_KJOP = ADDUNIT("JAVT", "Kjøp: mangel og reklamasjon", "Sales: defects and notice");
TH("JAVT", A_KJOP, `## Hva handler det om?
Når en vare ikke er som avtalt, har kjøperen krav mot selgeren. **Kjøpsloven** gjelder mellom næringsdrivende og mellom privatpersoner. **Forbrukerkjøpsloven** gjelder når en forbruker kjøper fra en næringsdrivende, og den kan ikke fravikes til skade for forbrukeren.

## Begreper og regler
- **Mangel**: varen svarer ikke til det som er avtalt, eller til det kjøperen kunne forvente.
- **Reklamasjon**: kjøperen må si fra om mangelen innen **rimelig tid** etter at hen oppdaget den.
- **Absolutt frist**: **2 år** etter at kjøperen overtok varen, eller **5 år** for ting som skal vare vesentlig lenger (for eksempel en vaskemaskin eller en bil).
- For forbrukere er det aldri for sent å reklamere innen **2 måneder** etter at mangelen ble oppdaget.
- **Mangelsbeføyelser**: retting eller omlevering, prisavslag, heving (ved vesentlig mangel), erstatning, og å holde tilbake betalingen.
- «**Som den er**»: varen har likevel mangel hvis den er i vesentlig dårligere stand enn kjøperen kunne regne med.

### Eksempel
Du kjøpte en mobil i en butikk for 2,5 år siden, og den slutter å virke. En mobil skal normalt ikke vare vesentlig lenger enn 2 år, så fristen er trolig ute.

> Si fra raskt. Kjenn fristene på 2 og 5 år.`,
`## What is it about?
When goods are not as agreed, the buyer has claims against the seller. **The Sale of Goods Act** applies between businesses and between private persons. **The Consumer Purchases Act** applies when a consumer buys from a business, and it cannot be departed from to the consumer's detriment.

## Key concepts and rules
- **Defect**: the goods do not match what was agreed, or what the buyer could expect.
- **Notice**: the buyer must notify the seller of the defect within a **reasonable time** after discovering it.
- **Absolute deadline**: **2 years** after the buyer took over the goods, or **5 years** for things meant to last considerably longer (for example a washing machine or a car).
- For consumers, notice is never too late within **2 months** after the defect was discovered.
- **Remedies**: repair or replacement, price reduction, termination (for a material defect), damages, and withholding payment.
- "**As is**": the goods still have a defect if they are in considerably worse condition than the buyer could expect.

### Example
You bought a phone in a shop 2.5 years ago, and it stops working. A phone is not normally meant to last considerably longer than 2 years, so the deadline has probably passed.

> Give notice quickly. Know the 2-year and 5-year deadlines.`);
BIQ("JAVT", A_KJOP, [
 ["Hva er den absolutte reklamasjonsfristen for vanlige varer?", { n: 2, tol: 0, u: "år" }, "2 år etter overtakelse.", "What is the absolute notice deadline for ordinary goods?", null, "2 years after taking over the goods."],
 ["Hva er fristen for ting som skal vare vesentlig lenger?", { n: 5, tol: 0, u: "år" }, "5 år, for eksempel for hvitevarer og biler.", "What is the deadline for things meant to last considerably longer?", null, "5 years, for example for white goods and cars."],
 ["Hvilken lov gjelder når en forbruker kjøper fra en butikk?", ["Forbrukerkjøpsloven", "Kjøpsloven", "Avtaleloven alene", "Straffeloven"], "Forbrukerkjøpsloven beskytter forbrukeren.", "Which statute applies when a consumer buys from a shop?", ["The Consumer Purchases Act", "The Sale of Goods Act", "The Contracts Act alone", "The Penal Code"], "The Consumer Purchases Act protects the consumer."],
 ["Når kan kjøperen heve kjøpet?", ["Når mangelen er vesentlig", "Alltid", "Aldri", "Bare hvis selgeren samtykker"], "Heving krever vesentlig mangel.", "When can the buyer terminate the purchase?", ["When the defect is material", "Always", "Never", "Only if the seller agrees"], "Termination requires a material defect."],
 ["Hvilken frist har en forbruker alltid for å reklamere etter at mangelen ble oppdaget?", { n: 2, tol: 0, u: "måneder" }, "2 måneder regnes aldri som for sent for en forbruker.", "Which period does a consumer always have to give notice after discovering the defect?", null, "2 months is never too late for a consumer."],
 ["Kan en butikk avtale dårligere vilkår enn forbrukerkjøpsloven gir?", ["Nei, loven er ufravikelig til skade for forbrukeren", "Ja, hvis det står i vilkårene", "Ja, for billige varer", "Bare ved salg på nett"], "Forbrukerkjøpsloven er preseptorisk.", "Can a shop agree on worse terms than the Consumer Purchases Act gives?", ["No, the Act cannot be departed from to the consumer's detriment", "Yes, if it is in the terms", "Yes, for cheap goods", "Only for online sales"], "The Consumer Purchases Act is mandatory."]
]);
GEN("JAVT", A_KJOP,
 () => { const [ting, lang] = R.p([[["en mobil", "a phone"], false], [["en genser", "a sweater"], false], [["en vaskemaskin", "a washing machine"], true], [["en bil", "a car"], true], [["en sofa", "a sofa"], true], [["en hodetelefon", "a pair of headphones"], false]]), mnd = R.p([10, 18, 26, 30, 40, 54, 66]), frist = lang ? 60 : 24, ok = mnd <= frist;
   return MC([`En forbruker oppdager en mangel ved ${ting[0]} ${mnd} måneder etter kjøpet og sier fra med én gang. Er reklamasjonen i tide?`, `A consumer discovers a defect in ${ting[1]} ${mnd} months after purchase and gives notice at once. Is the notice in time?`],
     ok ? [["Ja", "Yes"], ["Nei, fristen er ute", "No, the deadline has passed"], ["Bare hvis hen har kvittering", "Only with a receipt"], ["Bare hvis butikken samtykker", "Only if the shop agrees"]] : [["Nei, fristen er ute", "No, the deadline has passed"], ["Ja", "Yes"], ["Ja, fordi hen sa fra med én gang", "Yes, because notice was given at once"], ["Ja, alltid innen 10 år", "Yes, always within 10 years"]],
     [`Fristen for ${ting[0]} er ${frist / 12} år (${frist} måneder), og ${mnd} måneder er ${ok ? "innenfor" : "etter"} fristen.`, `The deadline for ${ting[1]} is ${frist / 12} years (${frist} months), and ${mnd} months is ${ok ? "within" : "after"} the deadline.`]); }
);

// ================= ERSTATNINGSRETT =================
const E_VIL = ADDUNIT("JERS", "Vilkårene for erstatning", "The conditions for damages");
TH("JERS", E_VIL, `## Hva handler det om?
Erstatningsretten avgjør når den som har skadet noen, må betale for tapet. Det kreves **tre vilkår**, og alle må være oppfylt.

## Begreper og regler
- **1. Ansvarsgrunnlag**: en grunn til at skadevolderen skal bære tapet. Det vanligste er **skyld** (culpa): forsett eller uaktsomhet. Man spør: burde hen ha handlet annerledes?
- **2. Økonomisk tap**: skadelidte må ha tapt penger, for eksempel reparasjon, tapt inntekt eller utgifter.
- **3. Årsakssammenheng**: handlingen må være en **nødvendig betingelse** for skaden, og følgen må være **påregnelig** (adekvat), ikke for fjern eller uventet.
- **Oppreisning** er penger for ikke-økonomisk skade (krenkelse), etter skadeserstatningsloven § 3-5.
- **Medvirkning** (skadeserstatningsloven § 5-1): erstatningen kan settes ned hvis skadelidte selv var uaktsom.
- **Lemping** (§ 5-2): erstatningen kan settes ned hvis den blir urimelig tung for skadevolderen.

### Eksempel
En syklist kjører på rødt og treffer en bil. Syklisten var uaktsom (ansvarsgrunnlag), bilen fikk en bulk til 8 000 kr (tap), og bulken kom av sammenstøtet (årsak).

> Ansvarsgrunnlag + økonomisk tap + årsakssammenheng = erstatning.`,
`## What is it about?
Tort law decides when someone who caused harm must pay for the loss. **Three conditions** are required, and all must be met.

## Key concepts and rules
- **1. Basis of liability**: a reason why the tortfeasor should bear the loss. The most common is **fault** (culpa): intent or negligence. You ask: should they have acted differently?
- **2. Economic loss**: the injured party must have lost money, for example repairs, lost income or expenses.
- **3. Causation**: the act must be a **necessary condition** for the harm, and the consequence must be **foreseeable** (adequate), not too remote or unexpected.
- **Compensation for non-economic harm** (oppreisning) can be awarded under section 3-5 of the Damages Act.
- **Contributory negligence** (Damages Act section 5-1): damages can be reduced if the injured party was also negligent.
- **Reduction** (section 5-2): damages can be reduced if they would be unreasonably heavy for the tortfeasor.

### Example
A cyclist runs a red light and hits a car. The cyclist was negligent (basis of liability), the car got a dent costing 8,000 NOK (loss), and the dent came from the collision (causation).

> Basis of liability + economic loss + causation = damages.`);
BIQ("JERS", E_VIL, [
 ["Hvor mange grunnvilkår må være oppfylt for erstatning?", { n: 3, tol: 0, u: "" }, "3 vilkår: ansvarsgrunnlag, økonomisk tap og årsakssammenheng.", "How many basic conditions must be met for damages?", null, "3 conditions: basis of liability, economic loss and causation."],
 ["Hva er det vanligste ansvarsgrunnlaget?", ["Skyld (culpa)", "Kontrakt", "Arv", "Skatt"], "Culpaansvaret: forsett eller uaktsomhet.", "What is the most common basis of liability?", ["Fault (culpa)", "Contract", "Inheritance", "Tax"], "Culpa liability: intent or negligence."],
 ["Hva betyr at en skade er påregnelig (adekvat)?", ["Følgen er ikke for fjern eller uventet", "Skaden var tilsiktet", "Skaden er liten", "Skaden er forsikret"], "Adekvanskravet avgrenser ansvaret.", "What does it mean that harm is foreseeable (adequate)?", ["The consequence is not too remote or unexpected", "The harm was intended", "The harm is small", "The harm is insured"], "The adequacy requirement limits liability."],
 ["Hva kalles penger for krenkelse (ikke-økonomisk skade)?", ["Oppreisning", "Prisavslag", "Bot", "Heving"], "Skadeserstatningsloven § 3-5.", "What is money for non-economic harm called in Norwegian law?", ["Oppreisning (compensation for non-pecuniary harm)", "Price reduction", "A fine", "Termination"], "Damages Act section 3-5."],
 ["Skadelidte var selv uaktsom. Hva kan skje?", ["Erstatningen kan settes ned (medvirkning)", "Erstatningen dobles", "Skadevolderen får straff", "Ingenting"], "Skadeserstatningsloven § 5-1.", "The injured party was also negligent. What can happen?", ["Damages can be reduced (contributory negligence)", "Damages are doubled", "The tortfeasor is punished", "Nothing"], "Damages Act section 5-1."],
 ["Hva spør man om ved uaktsomhetsvurderingen?", ["Burde skadevolderen ha handlet annerledes?", "Hvor rik er skadevolderen?", "Var det vitner?", "Er skadelidte forsikret?"], "Man sammenligner med en forsvarlig handlemåte.", "What do you ask in the negligence assessment?", ["Should the tortfeasor have acted differently?", "How rich is the tortfeasor?", "Were there witnesses?", "Is the injured party insured?"], "You compare with a proper way of acting."]
]);
GEN("JERS", E_VIL,
 () => { const tap = R.p([12000, 30000, 45000, 80000, 120000, 250000]), p = R.p([25, 33.33, 50]), e = Math.round(tap * (1 - p / 100));
   const pn = p === 33.33 ? ["en tredjedel", "one third"] : [p + " %", p + " %"];
   return [T(`Tapet er ${nf(tap, 0)} kr. Retten setter erstatningen ned med ${pn[0]} på grunn av skadelidtes medvirkning. Hvor mye får skadelidte?`, `The loss is ${nf(tap, 0)} NOK. The court reduces the damages by ${pn[1]} because of contributory negligence. How much does the injured party get?`), { n: e, tol: 1, u: "kr" },
     T(`${kr(tap)} kr minus ${pn[0]} gir ${kr(e)} kr.`, `${kr(tap)} NOK minus ${pn[1]} gives ${kr(e)} NOK.`)]; },
 () => R.p([
   () => MC(["Per glemmer å strø utenfor butikken, og en kunde sklir og brekker armen. Hvilket vilkår er klarest oppfylt her?", "Per forgets to grit outside the shop, and a customer slips and breaks an arm. Which condition is most clearly met?"], [["Ansvarsgrunnlag (uaktsomhet)", "Basis of liability (negligence)"], ["Ingen av vilkårene", "None of the conditions"], ["Bare oppreisning", "Only compensation for non-economic harm"], ["Straffbarhet", "Criminal liability"]], ["Det er uaktsomt ikke å strø når det er glatt.", "Failing to grit when it is slippery is negligent."]),
   () => MC(["En bilist kjører for fort og treffer en lyktestolpe. Et tre faller tre dager senere fordi en storm river det opp. Er bilisten ansvarlig for treet?", "A driver speeds and hits a lamp post. Three days later a tree falls because a storm uproots it. Is the driver liable for the tree?"], [["Nei, det mangler årsakssammenheng", "No, there is no causation"], ["Ja, bilisten var uaktsom", "Yes, the driver was negligent"], ["Ja, alltid", "Yes, always"], ["Bare halvparten", "Only half"]], ["Kjøringen var ikke en betingelse for at treet falt.", "The driving was not a condition for the tree falling."])
 ])()
);

const E_ARB = ADDUNIT("JERS", "Arbeidsgiveransvar, objektivt ansvar og foreldelse", "Employer liability, strict liability and limitation");
TH("JERS", E_ARB, `## Hva handler det om?
Noen ganger må man betale uten å ha gjort noe galt selv. Og krav kan bli for gamle: da er de **foreldet**.

## Begreper og regler
- **Arbeidsgiveransvar** (skadeserstatningsloven § 2-1): arbeidsgiveren svarer for skade som en arbeidstaker gjør **forsettlig eller uaktsomt** under arbeidet.
- **Objektivt ansvar**: ansvar uten skyld. Det gjelder blant annet for **bilansvar** (bilansvarsloven) og for farlig virksomhet som skaper en stadig og typisk risiko.
- **Foreldelse**: et krav faller bort hvis det ikke blir fulgt opp i tide. Den alminnelige fristen er **3 år** (foreldelsesloven § 2), regnet fra kravet forfalt.
- For erstatningskrav løper fristen på 3 år fra skadelidte fikk eller burde fått **kunnskap** om skaden og hvem som er ansvarlig (§ 9). Kravet foreldes likevel senest **20 år** etter den skadegjørende handlingen.
- Fristen **avbrytes** blant annet ved at skyldneren **erkjenner** kravet eller at kreditor tar **rettslige skritt** (for eksempel forliksklage eller søksmål).

### Eksempel
En regning forfalt 1. mars 2024. Den foreldes 1. mars 2027 hvis ingenting skjer før da.

> Arbeidsgiveren svarer for de ansatte. Vanlige krav foreldes etter 3 år.`,
`## What is it about?
Sometimes you must pay without having done anything wrong yourself. And claims can become too old: they are then **time-barred**.

## Key concepts and rules
- **Employer liability** (Damages Act section 2-1): the employer is liable for harm an employee causes **intentionally or negligently** in the course of work.
- **Strict liability**: liability without fault. It applies to **motor vehicle liability** (the Motor Vehicle Liability Act) and to dangerous activities that create a constant and typical risk.
- **Limitation**: a claim lapses if it is not pursued in time. The general period is **3 years** (Limitation Act section 2), counted from when the claim fell due.
- For damages, the 3 years run from when the injured party gained or should have gained **knowledge** of the harm and who is liable (section 9). The claim is time-barred in any event **20 years** after the harmful act.
- The period is **interrupted**, among other things, if the debtor **acknowledges** the claim or the creditor takes **legal action** (for example a conciliation claim or a lawsuit).

### Example
An invoice fell due on 1 March 2024. It becomes time-barred on 1 March 2027 if nothing happens before then.

> Employers answer for their employees. Ordinary claims are time-barred after 3 years.`);
BIQ("JERS", E_ARB, [
 ["Hva er den alminnelige foreldelsesfristen?", { n: 3, tol: 0, u: "år" }, "Foreldelsesloven § 2: 3 år.", "What is the general limitation period?", null, "Limitation Act section 2: 3 years."],
 ["Hva er den ytterste fristen for erstatningskrav?", { n: 20, tol: 0, u: "år" }, "Foreldelsesloven § 9: senest 20 år etter den skadegjørende handlingen.", "What is the longest-stop period for damages claims?", null, "Limitation Act section 9: at the latest 20 years after the harmful act."],
 ["En ansatt i et flyttebyrå mister et piano under jobben. Hvem kan kunden kreve?", ["Arbeidsgiveren", "Bare den ansatte", "Ingen", "Staten"], "Arbeidsgiveransvaret i skadeserstatningsloven § 2-1.", "An employee of a removal firm drops a piano at work. Whom can the customer claim against?", ["The employer", "Only the employee", "No one", "The state"], "Employer liability under Damages Act section 2-1."],
 ["Hva er objektivt ansvar?", ["Ansvar uten skyld", "Ansvar bare ved forsett", "Ansvar for staten", "Ansvar for barn"], "Man svarer for risikoen, ikke for en feil.", "What is strict liability?", ["Liability without fault", "Liability only for intent", "Liability of the state", "Liability for children"], "You answer for the risk, not for a fault."],
 ["Hva avbryter foreldelse?", ["At skyldneren erkjenner kravet", "At kreditor sender en hyggelig melding", "At det går ett år", "At skyldneren flytter"], "Erkjennelse eller rettslige skritt avbryter fristen.", "What interrupts limitation?", ["The debtor acknowledging the claim", "The creditor sending a friendly message", "One year passing", "The debtor moving"], "Acknowledgement or legal action interrupts the period."],
 ["Hvilken type ansvar gjelder for skade voldt av bil?", ["Objektivt ansvar", "Bare culpaansvar", "Ingen ansvar", "Bare straffansvar"], "Bilansvarsloven gir objektivt ansvar.", "What type of liability applies to harm caused by a car?", ["Strict liability", "Only fault liability", "No liability", "Only criminal liability"], "The Motor Vehicle Liability Act imposes strict liability."]
]);
GEN("JERS", E_ARB,
 () => { const y = R.i(2019, 2025), m = R.i(0, 11);
   return [T(`En regning forfalt 1. ${MND[m][0]} ${y}. Hvilket år blir den foreldet hvis fristen ikke avbrytes?`, `An invoice fell due on 1 ${MND[m][1]} ${y}. In which year is it time-barred if the period is not interrupted?`), { n: y + 3, tol: 0, u: "" },
     T(`Alminnelig frist 3 år: ${y} + 3 = ${y + 3}.`, `General period of 3 years: ${y} + 3 = ${y + 3}.`)]; },
 () => { const y = R.i(2000, 2015);
   return [T(`En skjult byggefeil ble begått i ${y}, men ingen visste om den. Hvilket år er erstatningskravet senest foreldet?`, `A hidden construction fault was made in ${y}, but no one knew about it. In which year is the damages claim time-barred at the latest?`), { n: y + 20, tol: 0, u: "" },
     T(`Ytterste frist 20 år: ${y} + 20 = ${y + 20}.`, `Longest-stop period of 20 years: ${y} + 20 = ${y + 20}.`)]; }
);

// ================= FORVALTNINGSRETT =================
const F_VED = ADDUNIT("JFORV", "Vedtak og saksbehandling", "Decisions and procedure");
TH("JFORV", F_VED, `## Hva handler det om?
Forvaltningen er alle de offentlige organene som tar avgjørelser om oss: NAV, kommunen, UDI, Skatteetaten. **Forvaltningsloven** gir regler om hvordan de skal behandle sakene.

## Begreper og regler
- **Vedtak** (§ 2 a): en avgjørelse som er truffet under utøving av offentlig myndighet og som er **bestemmende** for rettigheter eller plikter.
- **Enkeltvedtak** (§ 2 b): vedtak som gjelder rettigheter eller plikter til én eller flere **bestemte** personer (for eksempel et byggeavslag).
- **Forskrift** (§ 2 c): vedtak som gjelder for et **ubestemt** antall personer.
- **Part** (§ 2 e): den som avgjørelsen retter seg mot eller saken ellers direkte gjelder.
- **Veiledningsplikt** (§ 11), **inhabilitet** (§ 6: saksbehandleren kan ikke behandle saker der hen har nær tilknytning).
- **Forhåndsvarsel** (§ 16), **begrunnelse** (§ 24–25) og opplysning om **klageadgang** (§ 27).
- **Partsinnsyn** (§ 18): parten kan se sakens dokumenter.

### Eksempel
Kommunen avslår en søknad om garasje. Det er et enkeltvedtak, så kommunen må begrunne avslaget og opplyse om klagefristen.

> Enkeltvedtak utløser saksbehandlingsreglene: varsel, begrunnelse og klagerett.`,
`## What is it about?
The public administration is all the public bodies that make decisions about us: NAV, the municipality, the immigration directorate, the tax authority. **The Public Administration Act** sets rules on how they must handle cases.

## Key concepts and rules
- **Decision** (section 2 a): a determination made in the exercise of public authority that is **decisive** for rights or duties.
- **Individual decision** (section 2 b): a decision concerning the rights or duties of one or more **specific** persons (for example a refused building permit).
- **Regulation** (section 2 c): a decision that applies to an **indefinite** number of persons.
- **Party** (section 2 e): the person the decision is directed at or whom the case otherwise directly concerns.
- **Duty to guide** (section 11), **disqualification** (section 6: the official cannot handle cases they are closely connected to).
- **Advance notice** (section 16), **reasons** (sections 24 and 25) and information about the **right of appeal** (section 27).
- **Access for parties** (section 18): a party can see the documents of the case.

### Example
The municipality refuses an application for a garage. It is an individual decision, so the municipality must give reasons and state the appeal deadline.

> Individual decisions trigger the procedural rules: notice, reasons and the right of appeal.`);
BIQ("JFORV", F_VED, [
 ["Kommunen avslår en byggesøknad fra Lise. Hva slags avgjørelse er det?", ["Et enkeltvedtak", "En forskrift", "En dom", "En avtale"], "Avgjørelsen gjelder en bestemt person.", "The municipality refuses Lise's building application. What kind of decision is it?", ["An individual decision", "A regulation", "A judgment", "An agreement"], "The decision concerns a specific person."],
 ["Et vedtak som gjelder et ubestemt antall personer, er en ...", ["forskrift", "enkeltvedtak", "dom", "klage"], "Forvaltningsloven § 2 c.", "A decision that applies to an indefinite number of persons is a ...", ["regulation", "individual decision", "judgment", "appeal"], "Public Administration Act section 2 c."],
 ["Saksbehandleren skal avgjøre søknaden til sin egen bror. Hva gjelder?", ["Hen er inhabil", "Det er greit hvis hen er rettferdig", "Broren må trekke søknaden", "Saken går til domstolen"], "Forvaltningsloven § 6: nært slektskap gjør inhabil.", "The official is to decide an application from their own brother. What applies?", ["They are disqualified", "It is fine if they are fair", "The brother must withdraw", "The case goes to court"], "Public Administration Act section 6: close kinship disqualifies."],
 ["Hvilken paragraf krever at enkeltvedtak begrunnes?", ["§ 24", "§ 2", "§ 6", "§ 29"], "Forvaltningsloven § 24, innholdet i § 25.", "Which section requires individual decisions to be reasoned?", ["Section 24", "Section 2", "Section 6", "Section 29"], "Public Administration Act section 24, with the content in section 25."],
 ["Hva betyr partsinnsyn?", ["Parten kan se dokumentene i sin egen sak", "Alle kan se alle saker", "Pressen kan se saken", "Parten kan velge saksbehandler"], "Forvaltningsloven § 18.", "What is access for parties?", ["The party can see the documents in their own case", "Anyone can see all cases", "The press can see the case", "The party can choose the official"], "Public Administration Act section 18."],
 ["Hvilken plikt har forvaltningen etter § 11?", ["Veiledningsplikt", "Taushetsplikt", "Betalingsplikt", "Opplysningsplikt til pressen"], "Forvaltningen skal veilede om regler og saksbehandling.", "What duty does the administration have under section 11?", ["A duty to guide", "A duty of confidentiality", "A duty to pay", "A duty to inform the press"], "The administration must guide on rules and procedure."]
]);
GEN("JFORV", F_VED,
 () => { const x = R.p([
     [["NAV avslår søknaden om arbeidsavklaringspenger til Ahmed.", "NAV refuses Ahmed's application for work assessment allowance."], true],
     [["Kommunen vedtar en ny lokal forskrift om hundehold for alle innbyggere.", "The municipality adopts a new local regulation on dog-keeping for all residents."], false],
     [["UDI avslår familiegjenforening for én familie.", "The immigration directorate refuses family reunification for one family."], true],
     [["Regjeringen fastsetter nye regler for alle bilister om vinterdekk.", "The Government sets new rules on winter tyres for all drivers."], false],
     [["Lånekassen krever tilbake stipend fra en bestemt student.", "The student loan fund reclaims a grant from a specific student."], true]]);
   return MC([x[0][0] + " Hva slags vedtak er dette?", x[0][1] + " What kind of decision is this?"], x[1] ? [["Enkeltvedtak", "An individual decision"], ["Forskrift", "A regulation"], ["Dom", "A judgment"], ["Ikke et vedtak", "Not a decision"]] : [["Forskrift", "A regulation"], ["Enkeltvedtak", "An individual decision"], ["Dom", "A judgment"], ["Ikke et vedtak", "Not a decision"]],
     x[1] ? ["Det gjelder bestemte personer, altså et enkeltvedtak (§ 2 b).", "It concerns specific persons, so it is an individual decision (section 2 b)."] : ["Det gjelder et ubestemt antall personer, altså en forskrift (§ 2 c).", "It applies to an indefinite number of persons, so it is a regulation (section 2 c)."]); }
);

const F_KLAGE = ADDUNIT("JFORV", "Klage og omgjøring", "Appeals and reversal");
TH("JFORV", F_KLAGE, `## Hva handler det om?
Den som er uenig i et enkeltvedtak, kan **klage**. Klagen er gratis og mye enklere enn å gå til retten.

## Begreper og regler
- **Klagerett** (§ 28): parter og andre med **rettslig klageinteresse** kan klage.
- **Klageinstans**: nærmeste overordnede forvaltningsorgan (for eksempel Statsforvalteren over kommunen).
- **Klagefrist** (§ 29): **3 uker** fra underretningen om vedtaket er **kommet frem**.
- Faller fristen på en lørdag, søndag eller helligdag, forlenges den til neste virkedag.
- Klagen sendes til **underinstansen** (den som traff vedtaket). Den kan selv endre vedtaket (§ 33). Hvis ikke, sendes saken til klageinstansen.
- Klageinstansen kan prøve **alle sider** av saken, også skjønnet (§ 34).
- **Omgjøring uten klage** (§ 35): forvaltningen kan endre et vedtak, for eksempel hvis det er ugyldig eller endringen ikke er til skade for parten.
- **Sivilombudet** kan undersøke klager på forvaltningen etter at klageretten er brukt.

### Eksempel
Et avslag kom frem onsdag 5. mars. Klagefristen går ut onsdag 26. mars.

> Klag innen 3 uker, til den som traff vedtaket.`,
`## What is it about?
Anyone who disagrees with an individual decision can **appeal**. An appeal is free and much simpler than going to court.

## Key concepts and rules
- **Right of appeal** (section 28): parties and others with a **legal interest** can appeal.
- **Appeal body**: the nearest superior administrative body (for example the County Governor above the municipality).
- **Deadline** (section 29): **3 weeks** from when the notice of the decision **reached** the party.
- If the deadline falls on a Saturday, Sunday or public holiday, it is extended to the next working day.
- The appeal is sent to the **lower body** (the one that made the decision). It can change the decision itself (section 33). If not, the case goes to the appeal body.
- The appeal body can review **all aspects** of the case, including discretion (section 34).
- **Reversal without appeal** (section 35): the administration can change a decision, for example if it is invalid or the change does not harm the party.
- **The Parliamentary Ombud** can examine complaints about the administration once the right of appeal has been used.

### Example
A refusal reached the applicant on Wednesday 5 March. The appeal deadline expires on Wednesday 26 March.

> Appeal within 3 weeks, to the body that made the decision.`);
BIQ("JFORV", F_KLAGE, [
 ["Hva er klagefristen for enkeltvedtak?", { n: 3, tol: 0, u: "uker" }, "Forvaltningsloven § 29: 3 uker.", "What is the appeal deadline for individual decisions?", null, "Public Administration Act section 29: 3 weeks."],
 ["Fra når regnes klagefristen?", ["Fra vedtaket kom frem til parten", "Fra vedtaket ble skrevet", "Fra første virkedag i neste måned", "Fra søknaden ble sendt"], "Underretningen må ha kommet frem.", "From when is the appeal deadline counted?", ["From when the decision reached the party", "From when the decision was written", "From the first working day of the next month", "From when the application was sent"], "The notice must have reached the party."],
 ["Hvor skal klagen sendes?", ["Til organet som traff vedtaket", "Direkte til Høyesterett", "Til Stortinget", "Til Sivilombudet først"], "Underinstansen forbereder saken (§ 32 og § 33).", "Where should the appeal be sent?", ["To the body that made the decision", "Directly to the Supreme Court", "To Parliament", "To the Parliamentary Ombud first"], "The lower body prepares the case (sections 32 and 33)."],
 ["Kan klageinstansen prøve skjønnet i saken?", ["Ja, alle sider av saken", "Nei, bare lovtolkningen", "Bare saksbehandlingen", "Bare hvis parten betaler"], "Forvaltningsloven § 34.", "Can the appeal body review the exercise of discretion?", ["Yes, all aspects of the case", "No, only the interpretation of law", "Only the procedure", "Only if the party pays"], "Public Administration Act section 34."],
 ["Fristen går ut på en søndag. Hva skjer?", ["Den forlenges til neste virkedag", "Den går ut fredagen før", "Den er ute", "Den forlenges med en uke"], "Frister som ender på helg eller helligdag, forlenges.", "The deadline falls on a Sunday. What happens?", ["It is extended to the next working day", "It expires the Friday before", "It has expired", "It is extended by a week"], "Deadlines ending on a weekend or holiday are extended."],
 ["Hvem er vanligvis klageinstans for vedtak fra kommunen etter plan- og bygningsloven?", ["Statsforvalteren", "Høyesterett", "Kommunestyret alltid", "Stortinget"], "Statsforvalteren er statens representant i fylket.", "Who usually hears appeals against municipal planning and building decisions?", ["The County Governor", "The Supreme Court", "The municipal council, always", "Parliament"], "The County Governor represents the state in the county."]
]);
GEN("JFORV", F_KLAGE,
 () => { let d; do { d = new Date(Date.UTC(2025, R.i(0, 10), R.i(1, 28))); } while(d.getUTCDay() === 0 || d.getUTCDay() === 6);
   const f = plus(d, 21), a = dato(d), b = dato(f), w = [dato(plus(d, 14)), dato(plus(d, 28)), dato(plus(d, 30))];
   return MC([`Et avslag kom frem til parten ${a[0]}. Når går klagefristen ut?`, `A refusal reached the party on ${a[1]}. When does the appeal deadline expire?`], [b, ...w],
     [`3 uker = 21 dager etter ${a[0]}, altså ${b[0]}.`, `3 weeks = 21 days after ${a[1]}, i.e. ${b[1]}.`]); },
 () => { const n = R.i(1, 6);
   return [T(`En klage kom inn ${n} dag${n > 1 ? "er" : ""} for sent. Hvilken paragraf gjør det mulig å behandle klagen likevel?`, `An appeal arrived ${n} day${n > 1 ? "s" : ""} late. Which section makes it possible to consider it anyway?`), ["§ 31", "§ 2", "§ 6", "§ 24"],
     T("Forvaltningsloven § 31: klagen kan tas under behandling hvis parten ikke kan lastes, eller det av særlige grunner er rimelig.", "Public Administration Act section 31: the appeal can be considered if the party cannot be blamed, or it is reasonable for special reasons.")]; }
);

const F_OFF = ADDUNIT("JFORV", "Innsyn og taushetsplikt", "Access to documents and confidentiality");
TH("JFORV", F_OFF, `## Hva handler det om?
Forvaltningen skal være åpen, slik at alle kan se hva det offentlige gjør. Samtidig skal personlige opplysninger om den enkelte beskyttes.

## Begreper og regler
- **Offentleglova § 3**: hovedregelen er at **alle** kan kreve innsyn i saksdokumenter hos forvaltningen. Man trenger ikke å begrunne kravet.
- Unntak kan gjøres blant annet for **interne dokumenter** og opplysninger som er **taushetsbelagte**.
- **Meroffentlighet**: forvaltningen skal vurdere å gi innsyn selv om det er lov å nekte.
- **Taushetsplikt** (forvaltningsloven § 13): opplysninger om noens **personlige forhold** skal ikke deles med uvedkommende.
- **Partsinnsyn** (forvaltningsloven § 18) gir parten innsyn i egen sak og går lenger enn offentleglova.
- Avslag på innsyn kan **påklages**.

### Eksempel
En journalist ber kommunen om en kontrakt med et byggefirma. Kommunen må gi innsyn, men kan sladde opplysninger om ansattes helse.

> Åpenhet er hovedregelen. Personlige forhold er taushetsbelagt.`,
`## What is it about?
The administration should be open, so that everyone can see what the public sector does. At the same time, personal information about individuals must be protected.

## Key concepts and rules
- **Freedom of Information Act section 3**: the main rule is that **anyone** can demand access to case documents held by the administration. No reason has to be given.
- Exceptions can be made for, among other things, **internal documents** and information that is **subject to confidentiality**.
- **Enhanced openness**: the administration must consider granting access even when it may refuse.
- **Duty of confidentiality** (Public Administration Act section 13): information about someone's **personal matters** must not be shared with outsiders.
- **Access for parties** (Public Administration Act section 18) gives a party access to their own case and goes further than the Freedom of Information Act.
- A refusal of access can be **appealed**.

### Example
A journalist asks the municipality for a contract with a building firm. The municipality must grant access, but may redact information about employees' health.

> Openness is the main rule. Personal matters are confidential.`);
BIQ("JFORV", F_OFF, [
 ["Hvem kan kreve innsyn etter offentleglova?", ["Alle", "Bare parter", "Bare journalister", "Bare advokater"], "Offentleglova § 3: alle kan kreve innsyn.", "Who can demand access under the Freedom of Information Act?", ["Anyone", "Only parties", "Only journalists", "Only lawyers"], "Section 3: anyone can demand access."],
 ["Må du begrunne et innsynskrav?", ["Nei", "Ja, alltid", "Bare for gamle dokumenter", "Bare hvis du er part"], "Innsyn krever ingen begrunnelse.", "Do you need to give reasons for a request for access?", ["No", "Yes, always", "Only for old documents", "Only if you are a party"], "Access requires no reasons."],
 ["Hvilke opplysninger omfattes av taushetsplikten i forvaltningsloven § 13?", ["Noens personlige forhold", "Alle tall i budsjettet", "Møtetider", "Navnet på kommunen"], "Personlige forhold, for eksempel helse og familie.", "Which information is covered by the duty of confidentiality in section 13?", ["Someone's personal matters", "All figures in the budget", "Meeting times", "The municipality's name"], "Personal matters, for example health and family."],
 ["Hva er meroffentlighet?", ["Å vurdere innsyn selv om det er lov å nekte", "Å publisere alt på nett", "Å gi pressen forrang", "Å nekte innsyn i interne dokumenter"], "Offentleglova § 11.", "What is enhanced openness?", ["Considering access even when refusal is allowed", "Publishing everything online", "Giving the press priority", "Refusing access to internal documents"], "Freedom of Information Act section 11."],
 ["Kan et avslag på innsyn påklages?", ["Ja", "Nei", "Bare av journalister", "Bare til Høyesterett"], "Avslag på innsyn kan påklages.", "Can a refusal of access be appealed?", ["Yes", "No", "Only by journalists", "Only to the Supreme Court"], "A refusal of access can be appealed."]
]);
GEN("JFORV", F_OFF,
 () => { const x = R.p([
     [["en kontrakt mellom kommunen og et byggefirma", "a contract between the municipality and a building firm"], true],
     [["en sykemelding for en ansatt i kommunen", "a sick note for a municipal employee"], false],
     [["reiseregningene til ordføreren", "the mayor's travel expense claims"], true],
     [["en barnevernssak om en navngitt familie", "a child welfare case about a named family"], false],
     [["budsjettet til skolen", "the school's budget"], true]]);
   return MC([`En journalist ber om innsyn i ${x[0][0]}. Hva er utgangspunktet?`, `A journalist requests access to ${x[0][1]}. What is the starting point?`], x[1] ? [["Innsyn skal gis", "Access must be granted"], ["Taushetsplikt hindrer innsyn", "Confidentiality prevents access"], ["Bare parter får innsyn", "Only parties get access"], ["Journalisten må begrunne kravet", "The journalist must give reasons"]] : [["Taushetsplikt hindrer innsyn i personlige forhold", "Confidentiality prevents access to personal matters"], ["Innsyn skal gis fullt ut", "Full access must be granted"], ["Innsyn hvis journalisten begrunner det", "Access if the journalist gives reasons"], ["Innsyn etter tre uker", "Access after three weeks"]],
     x[1] ? ["Hovedregelen i offentleglova § 3 er innsyn.", "The main rule in section 3 of the Freedom of Information Act is access."] : ["Personlige forhold er taushetsbelagt etter forvaltningsloven § 13.", "Personal matters are confidential under section 13 of the Public Administration Act."]); }
);

// ================= STRAFFERETT =================
const K_VIL = ADDUNIT("JSTR", "Straffbarhetsvilkårene", "The conditions for criminal liability");
TH("JSTR", K_VIL, `## Hva handler det om?
For at noen skal kunne straffes, må **fire vilkår** være oppfylt. Straffeloven av 2005 har reglene.

## Begreper og regler
- **1. Objektivt gjerningsinnhold**: handlingen må passe med beskrivelsen i et **straffebud** (for eksempel tyveri, § 321).
- **2. Ingen straffrihetsgrunn**: for eksempel **nødrett** (§ 17), **nødverge** (§ 18) eller **samtykke**.
- **3. Skyld**: hovedregelen er at det kreves **forsett** (§ 21 og § 22). Uaktsomhet er bare nok når straffebudet sier det (§ 23).
- **4. Tilregnelighet** (§ 20): gjerningspersonen må være **15 år** eller eldre og ikke for eksempel psykotisk på handlingstidspunktet.
- **Legalitetsprinsippet** (Grunnloven § 96): ingen kan straffes uten lov.
- **Forsøk** (§ 16) og **medvirkning** (§ 15) er også straffbart når straffebudet dekker det.
- Påtalemyndigheten må bevise skyld **utover enhver rimelig tvil**.

### Eksempel
En 14-åring stjeler en sykkel. Gjerningsinnholdet i tyveri er oppfylt, men 14-åringen kan ikke straffes fordi hen er under 15 år.

> Straffebud + ingen straffrihetsgrunn + skyld + tilregnelighet = straffansvar.`,
`## What is it about?
For someone to be punished, **four conditions** must be met. The Penal Code of 2005 contains the rules.

## Key concepts and rules
- **1. The objective elements**: the act must fit the description in a **criminal provision** (for example theft, section 321).
- **2. No ground for exemption**: for example **necessity** (section 17), **self-defence** (section 18) or **consent**.
- **3. Culpability**: the main rule is that **intent** is required (sections 21 and 22). Negligence is only enough when the provision says so (section 23).
- **4. Criminal capacity** (section 20): the offender must be **15 years** or older and not, for example, psychotic at the time of the act.
- **The principle of legality** (Constitution Article 96): no one can be punished except under law.
- **Attempt** (section 16) and **complicity** (section 15) are also punishable when the provision covers them.
- The prosecution must prove guilt **beyond reasonable doubt**.

### Example
A 14-year-old steals a bicycle. The elements of theft are met, but the 14-year-old cannot be punished because they are under 15.

> Criminal provision + no exemption + culpability + capacity = criminal liability.`);
BIQ("JSTR", K_VIL, [
 ["Hvor mange straffbarhetsvilkår er det?", { n: 4, tol: 0, u: "" }, "4 vilkår: gjerningsinnhold, ingen straffrihetsgrunn, skyld og tilregnelighet.", "How many conditions for criminal liability are there?", null, "4 conditions: objective elements, no exemption, culpability and capacity."],
 ["Hva er den strafferettslige lavalderen i Norge?", { n: 15, tol: 0, u: "år" }, "Straffeloven § 20: under 15 år er ikke tilregnelig.", "What is the age of criminal responsibility in Norway?", null, "Penal Code section 20: those under 15 lack criminal capacity."],
 ["Hvilken skyldform er hovedregelen?", ["Forsett", "Uaktsomhet", "Grov uaktsomhet", "Objektivt ansvar"], "Straffeloven § 21.", "Which form of culpability is the main rule?", ["Intent", "Negligence", "Gross negligence", "Strict liability"], "Penal Code section 21."],
 ["Hvilken paragraf i Grunnloven krever lovhjemmel for straff?", ["§ 96", "§ 100", "§ 57", "§ 121"], "Grunnloven § 96.", "Which Article of the Constitution requires a legal basis for punishment?", ["Article 96", "Article 100", "Article 57", "Article 121"], "Constitution Article 96."],
 ["Hvilket beviskrav gjelder for skyld i straffesaker?", ["Utover enhver rimelig tvil", "Mer enn 50 % sannsynlig", "Mistanke er nok", "Tilståelse er alltid nødvendig"], "Tvil kommer tiltalte til gode.", "What standard of proof applies to guilt in criminal cases?", ["Beyond reasonable doubt", "More than 50 % likely", "Suspicion is enough", "A confession is always required"], "Doubt benefits the accused."],
 ["Når er uaktsomhet nok for straff?", ["Når straffebudet sier det", "Alltid", "Aldri", "Bare for barn"], "Straffeloven § 21 og § 23.", "When is negligence enough for punishment?", ["When the provision says so", "Always", "Never", "Only for children"], "Penal Code sections 21 and 23."]
]);
GEN("JSTR", K_VIL,
 () => { const age = R.i(12, 18), ok = age >= 15;
   return MC([`En person på ${age} år stjeler bevisst en mobil fra en butikk. Kan hen straffes?`, `A ${age}-year-old deliberately steals a phone from a shop. Can they be punished?`],
     ok ? [["Ja, alle vilkårene kan være oppfylt", "Yes, all conditions may be met"], ["Nei, hen er under lavalderen", "No, they are below the age limit"], ["Nei, tyveri krever vold", "No, theft requires violence"], ["Bare foreldrene kan straffes", "Only the parents can be punished"]] : [["Nei, hen er under 15 år", "No, they are under 15"], ["Ja, fordi det var forsettlig", "Yes, because it was intentional"], ["Ja, med halv straff", "Yes, with half the penalty"], ["Ja, hvis mobilen var dyr", "Yes, if the phone was expensive"]],
     ok ? [`${age} år er over lavalderen på 15 år, og handlingen var forsettlig.`, `${age} is above the age limit of 15, and the act was intentional.`] : [`Straffeloven § 20: under 15 år er ikke strafferettslig tilregnelig, og ${age} år er under grensen.`, `Penal Code section 20: under 15 means no criminal capacity, and ${age} is below the limit.`]); }
);

const K_FRI = ADDUNIT("JSTR", "Nødverge, nødrett og forsøk", "Self-defence, necessity and attempt");
TH("JSTR", K_FRI, `## Hva handler det om?
Noen ganger er en handling som ellers er straffbar, likevel lovlig. Og noen ganger kan man straffes selv om man ikke lyktes.

## Begreper og regler
- **Nødverge** (§ 18): man kan avverge et **rettsstridig angrep**, men handlingen må ikke gå **klart ut over** det som er forsvarlig.
- **Nødrett** (§ 17): man kan redde en interesse fra en fare som ikke kan avverges på annen rimelig måte, når skaden man redder, er **betydelig større** enn skaden man volder.
- **Forsøk** (§ 16): man har besluttet å begå en forbrytelse og har gjort noe som **leder direkte** mot den. Forsøk straffes mildere.
- **Frivillig tilbaketreden**: den som frivillig avstår før handlingen er fullbyrdet, straffes ikke for forsøk.
- **Medvirkning** (§ 15): den som hjelper, oppfordrer eller styrker forsettet til gjerningspersonen, kan straffes som medvirker.
- **Selvtekt** (§ 19): å ta seg til rette er som hovedregel ikke lov, bare i begrensede tilfeller.

### Eksempel
Noen knuser et vindu i en brennende bil for å redde en hund. Skaden på vinduet er mye mindre enn verdien av å redde dyret: nødrett.

> Nødverge: mot et angrep. Nødrett: mot en fare. Begge må være forholdsmessige.`,
`## What is it about?
Sometimes an act that would otherwise be criminal is lawful. And sometimes you can be punished even though you did not succeed.

## Key concepts and rules
- **Self-defence** (section 18): you may fend off an **unlawful attack**, but the act must not go **clearly beyond** what is justifiable.
- **Necessity** (section 17): you may save an interest from a danger that cannot be averted in another reasonable way, when the harm avoided is **considerably greater** than the harm caused.
- **Attempt** (section 16): you have decided to commit an offence and done something that **leads directly** towards it. Attempts are punished more leniently.
- **Voluntary withdrawal**: someone who voluntarily stops before the act is completed is not punished for the attempt.
- **Complicity** (section 15): someone who helps, encourages or strengthens the offender's intent can be punished as an accomplice.
- **Self-help** (section 19): taking the law into your own hands is not allowed as a rule, only in limited cases.

### Example
Someone breaks a window in a burning car to save a dog. The damage to the window is much smaller than the value of saving the animal: necessity.

> Self-defence: against an attack. Necessity: against a danger. Both must be proportionate.`);
BIQ("JSTR", K_FRI, [
 ["Du blir angrepet og slår tilbake for å stoppe angrepet. Hvilken regel er aktuell?", ["Nødverge, § 18", "Nødrett, § 17", "Forsøk, § 16", "Selvtekt, § 19"], "Nødverge er forsvar mot et rettsstridig angrep.", "You are attacked and hit back to stop the attack. Which rule is relevant?", ["Self-defence, section 18", "Necessity, section 17", "Attempt, section 16", "Self-help, section 19"], "Self-defence is protection against an unlawful attack."],
 ["Hva kreves for nødrett?", ["At skaden som avverges, er betydelig større enn skaden man volder", "At man blir angrepet", "At politiet har gitt lov", "At man er over 18"], "Straffeloven § 17.", "What is required for necessity?", ["That the harm averted is considerably greater than the harm caused", "That you are attacked", "That the police gave permission", "That you are over 18"], "Penal Code section 17."],
 ["Hva skjer med den som frivillig trekker seg fra et forsøk?", ["Hen straffes ikke for forsøket", "Hen får dobbel straff", "Hen straffes som for fullbyrdet handling", "Ingenting endres"], "Frivillig tilbaketreden gir straffrihet for forsøket.", "What happens to someone who voluntarily withdraws from an attempt?", ["They are not punished for the attempt", "They get double punishment", "They are punished as for a completed act", "Nothing changes"], "Voluntary withdrawal gives exemption from punishment for the attempt."],
 ["Noen kjører sjåføren til et ran og venter utenfor. Hva er hen?", ["Medvirker", "Uskyldig", "Fornærmet", "Vitne bare"], "Straffeloven § 15.", "Someone drives the robber to a robbery and waits outside. What are they?", ["An accomplice", "Innocent", "The victim", "Only a witness"], "Penal Code section 15."],
 ["Nødverge kan ikke gå ...", ["klart ut over det som er forsvarlig", "ut over 5 minutter", "mot personer over 18 år", "mot eiendom"], "Straffeloven § 18.", "Self-defence must not go ...", ["clearly beyond what is justifiable", "beyond 5 minutes", "against persons over 18", "against property"], "Penal Code section 18."]
]);
GEN("JSTR", K_FRI,
 () => { const x = R.p([
     [["Kari blir slått av en fremmed og dytter ham unna for å komme seg bort.", "Kari is hit by a stranger and pushes him away to get free."], ["Nødverge", "Self-defence"]],
     [["Ola bryter opp døra til en hytte i en snøstorm for å overleve natten.", "Ola breaks open a cabin door in a snowstorm to survive the night."], ["Nødrett", "Necessity"]],
     [["Per går inn i en bank med våpen, men blir tatt før han når kassen.", "Per enters a bank with a weapon but is caught before reaching the counter."], ["Forsøk", "Attempt"]],
     [["Lise låner bort bilen sin vel vitende om at den skal brukes til et innbrudd.", "Lise lends her car knowing it will be used for a burglary."], ["Medvirkning", "Complicity"]]]);
   const rest = [["Nødverge", "Self-defence"], ["Nødrett", "Necessity"], ["Forsøk", "Attempt"], ["Medvirkning", "Complicity"]].filter(o => o[0] !== x[1][0]);
   return MC([x[0][0] + " Hvilken regel er mest aktuell?", x[0][1] + " Which rule is most relevant?"], [x[1], ...rest], [`Situasjonen passer med ${x[1][0].toLowerCase()}.`, `The situation fits ${x[1][1].toLowerCase()}.`]); }
);

const K_REA = ADDUNIT("JSTR", "Straffereaksjoner og straffesaken", "Penalties and the criminal case");
TH("JSTR", K_REA, `## Hva handler det om?
Når noen har begått en straffbar handling, kan staten reagere på ulike måter. Straffeprosessloven gir reglene for hvordan saken går fra anmeldelse til dom.

## Begreper og regler
- **Straffer** (§ 29): fengsel, forvaring, samfunnsstraff, ungdomsstraff, bot og rettighetstap.
- **Forelegg**: påtalemyndigheten tilbyr en bot uten rettssak. Vedtas forelegget, har det samme virkning som en dom.
- **Påtaleunnlatelse**: den skyldige blir ikke straffet, selv om handlingen er bevist.
- **Ungdomsstraff** er for de som var **15–17 år** på handlingstidspunktet.
- Saksgang: anmeldelse → **etterforskning** (politiet) → **påtalevedtak** (tiltale, forelegg, henleggelse) → hovedforhandling i tingretten → eventuell anke.
- **Uskyldspresumsjonen**: alle regnes som uskyldige til skyld er bevist (EMK artikkel 6).
- **Siktet** er den som politiet mistenker formelt. **Tiltalt** er den som er satt under tiltale.

### Eksempel
En sjåfør kjører litt for fort og får et forelegg på stedet. Hvis hen vedtar det, er saken avgjort uten rettssak.

> Anmeldelse → etterforskning → påtalevedtak → dom.`,
`## What is it about?
When someone has committed a criminal act, the state can react in different ways. The Criminal Procedure Act sets out how the case goes from report to judgment.

## Key concepts and rules
- **Penalties** (section 29): imprisonment, preventive detention, community sentence, youth sentence, fines and loss of rights.
- **Penalty notice** (forelegg): the prosecution offers a fine without a trial. If accepted, it has the same effect as a judgment.
- **Waiver of prosecution**: the offender is not punished, even though the act is proven.
- **Youth sentences** are for those aged **15 to 17** at the time of the offence.
- Procedure: report → **investigation** (the police) → **prosecution decision** (indictment, penalty notice, dropping the case) → main hearing in the district court → possible appeal.
- **Presumption of innocence**: everyone is considered innocent until proven guilty (ECHR Article 6).
- **Suspect** (siktet) is the person the police formally suspect. **Defendant** (tiltalt) is the person who has been indicted.

### Example
A driver goes slightly too fast and gets a penalty notice on the spot. If they accept it, the case is settled without a trial.

> Report → investigation → prosecution decision → judgment.`);
BIQ("JSTR", K_REA, [
 ["Hva er et forelegg?", ["Et tilbud om bot uten rettssak", "En fengselsdom", "En anke", "En form for erstatning"], "Vedtatt forelegg har virkning som en dom.", "What is a penalty notice (forelegg)?", ["An offer of a fine without a trial", "A prison sentence", "An appeal", "A form of damages"], "An accepted penalty notice has the effect of a judgment."],
 ["Hvem etterforsker straffesaker?", ["Politiet", "Tingretten", "Stortinget", "Forliksrådet"], "Politiet etterforsker, påtalemyndigheten tar ut tiltale.", "Who investigates criminal cases?", ["The police", "The district court", "Parliament", "The conciliation board"], "The police investigate, the prosecution indicts."],
 ["Hva betyr uskyldspresumsjonen?", ["Alle regnes som uskyldige til skyld er bevist", "Alle tiltalte er skyldige", "Politiet kan ikke etterforske", "Man må bevise at man er uskyldig"], "EMK artikkel 6 nr. 2.", "What does the presumption of innocence mean?", ["Everyone is innocent until proven guilty", "All defendants are guilty", "The police cannot investigate", "You must prove your innocence"], "ECHR Article 6(2)."],
 ["Hvilken aldersgruppe kan få ungdomsstraff?", ["15–17 år", "12–14 år", "18–21 år", "Alle under 25"], "Ungdomsstraff er for lovbrudd begått som 15–17-åring.", "Which age group can receive a youth sentence?", ["15 to 17", "12 to 14", "18 to 21", "Everyone under 25"], "Youth sentences are for offences committed aged 15 to 17."],
 ["Hva er forskjellen på siktet og tiltalt?", ["Tiltalt er satt under tiltale, siktet er formelt mistenkt", "Ingen forskjell", "Siktet er dømt", "Tiltalt er frifunnet"], "Tiltale kommer etter etterforskningen.", "What is the difference between a suspect and a defendant?", ["A defendant has been indicted, a suspect is formally suspected", "No difference", "A suspect has been convicted", "A defendant has been acquitted"], "The indictment comes after the investigation."],
 ["Hva er en påtaleunnlatelse?", ["Den skyldige straffes ikke selv om handlingen er bevist", "Saken henlegges fordi den er uoppklart", "En dom fra Høyesterett", "En bot"], "Påtalemyndigheten kan unnlate påtale.", "What is a waiver of prosecution?", ["The offender is not punished even though the act is proven", "The case is dropped as unsolved", "A Supreme Court judgment", "A fine"], "The prosecution may waive prosecution."]
]);
GEN("JSTR", K_REA,
 () => { const s = R.p([[["anmeldelse", "report"], ["etterforskning", "investigation"]], [["etterforskning", "investigation"], ["påtalevedtak", "prosecution decision"]], [["påtalevedtak", "prosecution decision"], ["hovedforhandling", "main hearing"]]]);
   const all = [["anmeldelse", "report"], ["etterforskning", "investigation"], ["påtalevedtak", "prosecution decision"], ["hovedforhandling", "main hearing"], ["anke", "appeal"]].filter(x => x[0] !== s[1][0] && x[0] !== s[0][0]).slice(0, 3);
   return MC([`Hva kommer rett etter «${s[0][0]}» i en straffesak?`, `What comes right after "${s[0][1]}" in a criminal case?`], [s[1], ...all], [`Rekkefølgen er anmeldelse → etterforskning → påtalevedtak → hovedforhandling.`, `The order is report → investigation → prosecution decision → main hearing.`]); }
);
})();
