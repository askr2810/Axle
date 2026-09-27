// ============================================================
//  add_vgs_o.js – Samfunnskunnskap (Vg1/Vg2) og Historie (Vg2/Vg3) etter LK20.
// ============================================================
NEWCOURSE({ code: "VGSAMF", study: "vgs", group: "VGS: fellesfag", nb: "Samfunnskunnskap", en: "Social Studies", s: ["Sa", "SS"], eqText: VG_EQ("Vg1/Vg2 fellesfag (LK20)", "Year 11/12 core subject (Norwegian curriculum)"), units: [] });
NEWCOURSE({ code: "VGHIS", study: "vgs", group: "VGS: fellesfag", nb: "Historie", en: "History", s: ["Hi", "Hi"], eqText: VG_EQ("Vg2/Vg3 fellesfag (LK20)", "Year 12/13 core subject (Norwegian curriculum)"), units: [] });
(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const U = (code, nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT(code, nb, en); TH(code, u, thNb, thEn); BIQ(code, u, qs); if(gens.length) GEN(code, u, ...gens); return u; };
// Årstall-spørsmål fra en liste hendelser: [år, nb, en]. Gale svar er nærliggende årstall eller andre hendelsers år.
function yearGen(events){
  return () => { const e = R.p(events), wrong = new Set();
    while(wrong.size < 3){ const d = R.p([-30, -20, -10, -5, -3, -2, 2, 3, 5, 10, 20, 30]), y = e[0] + d; if(y !== e[0] && y > 0) wrong.add(y); }
    return [T(`Hvilket år: ${e[1]}?`, `Which year: ${e[2]}?`), [String(e[0]), ...[...wrong].map(String)], T(`Det skjedde i ${e[0]}.`, `It happened in ${e[0]}.`)]; };
}
// Hva kom først? To hendelser med ulike år.
function orderGen(events){
  return () => { let a = R.p(events), b = R.p(events); for(let k = 0; k < 10 && Math.abs(a[0] - b[0]) < 3; k++) b = R.p(events);
    if(a[0] === b[0]) b = events.find(x => x[0] !== a[0]); const [f, l] = a[0] < b[0] ? [a, b] : [b, a];
    return [T(`Hva skjedde først?`, `What happened first?`), [T(f[1], f[2]), T(l[1], l[2]), T("Samme år", "The same year"), T("Ingen av dem har skjedd", "Neither has happened")],
      T(`${f[1]} (${f[0]}) kom før ${l[1]} (${l[0]}).`, `${f[2]} (${f[0]}) came before ${l[2]} (${l[0]}).`)]; };
}

// ================= SAMFUNNSKUNNSKAP =================
U("VGSAMF", "Demokrati og politikk i Norge", "Democracy and politics in Norway",
`## Hva handler det om?
Norge er et **representativt demokrati**: vi velger representanter som styrer på våre vegne. Makten er delt, og regjeringen må ha Stortingets tillit.

## Begreper og formler
- **Maktfordeling**: Stortinget (lovgivende), regjeringen (utøvende) og domstolene (dømmende).
- **Stortinget** har 169 representanter og velges hvert fjerde år. **Kommune- og fylkestingsvalg** er også hvert fjerde år, midt mellom stortingsvalgene.
- **Stemmerett** fra du fyller 18 år i valgåret.
- **Parlamentarisme**: regjeringen må gå av hvis et flertall på Stortinget vedtar mistillit.
- **Flertalls- og mindretallsregjering**: en mindretallsregjering må få støtte fra andre partier sak for sak.
- **Sperregrensen** på 4 % gjelder utjevningsmandatene.
- **Sametinget** (fra 1989) er samenes folkevalgte organ.
- Politiske partier plasseres ofte på en **høyre–venstre-akse**: venstresiden vil ha mer omfordeling og en større offentlig sektor, høyresiden mer vekt på marked og lavere skatt.

### Eksempel
Et parti får 3,8 % av stemmene nasjonalt. Det er under sperregrensen og får ingen utjevningsmandater, men kan likevel vinne distriktsmandater i fylker der det står sterkt.

> Folket velger Stortinget, og Stortinget kontrollerer regjeringen.`,
`## What is it about?
Norway is a **representative democracy**: we elect representatives who govern on our behalf. Power is divided, and the government must have Parliament's confidence.

## Concepts and formulas
- **Separation of powers**: Parliament (legislative), the government (executive) and the courts (judicial).
- **Parliament (Stortinget)** has 169 members and is elected every four years. **Local and county elections** are also every four years, midway between parliamentary elections.
- **Right to vote** from the year you turn 18.
- **Parliamentarism**: the government must resign if a majority in Parliament passes a vote of no confidence.
- **Majority and minority governments**: a minority government must win support from other parties issue by issue.
- **The 4 % threshold** applies to the levelling seats.
- **The Sami Parliament** (since 1989) is the elected body of the Sami people.
- Political parties are often placed on a **left–right axis**: the left wants more redistribution and a larger public sector, the right more emphasis on markets and lower taxes.

### Example
A party gets 3.8 % of the votes nationally. It is below the threshold and gets no levelling seats, but it can still win constituency seats in counties where it is strong.

> The people elect Parliament, and Parliament holds the government to account.`,
[
 ["Hvor mange representanter har Stortinget?", { n: 169, tol: 0, u: "" }, "169 representanter.", "How many members does Parliament (Stortinget) have?", null, "169 members."],
 ["Hvor gammel må du være for å stemme ved stortingsvalg?", { n: 18, tol: 0, u: "år" }, "Du må fylle 18 år senest i valgåret.", "How old must you be to vote in a parliamentary election?", null, "You must turn 18 by the end of the election year."],
 ["Hvilken statsmakt har den utøvende makten?", ["Regjeringen", "Stortinget", "Domstolene", "Pressen"], "Regjeringen styrer landet og setter vedtak ut i livet.", "Which branch holds the executive power?", ["The government", "Parliament", "The courts", "The press"], "The government runs the country and implements decisions."],
 ["Hva er en mindretallsregjering?", ["En regjering uten flertall på Stortinget", "En regjering med bare ett parti", "En regjering valgt av folket direkte", "En regjering uten statsminister"], "Den må få støtte fra andre partier sak for sak.", "What is a minority government?", ["A government without a majority in Parliament", "A one-party government", "A government elected directly by the people", "A government without a prime minister"], "It must win support from other parties issue by issue."],
 ["Hva er sperregrensen for utjevningsmandater?", { n: 4, tol: 0, u: "%" }, "4 % av stemmene nasjonalt.", "What is the threshold for levelling seats?", null, "4 % of the national vote."],
 ["Når ble Sametinget opprettet?", { n: 1989, tol: 0, u: "" }, "Sametinget åpnet i 1989.", "When was the Sami Parliament established?", null, "The Sami Parliament opened in 1989."],
 ["Hva kjennetegner venstresiden i politikken?", ["Mer vekt på omfordeling og offentlig sektor", "Lavere skatt og mindre stat", "Bare miljøpolitikk", "Motstand mot demokrati"], "Høyresiden legger mer vekt på marked og lavere skatt.", "What characterises the political left?", ["More emphasis on redistribution and the public sector", "Lower taxes and a smaller state", "Only environmental policy", "Opposition to democracy"], "The right puts more emphasis on markets and lower taxes."]
]);

U("VGSAMF", "Rettsstat og menneskerettigheter", "Rule of law and human rights",
`## Hva handler det om?
I en **rettsstat** gjelder de samme lovene for alle, også for dem som styrer. Menneskerettighetene beskytter den enkelte mot overgrep fra staten.

## Begreper og formler
- **Rettssikkerhet**: du skal vite hvilke regler som gjelder, få en rettferdig behandling og kunne klage.
- **Uskyldspresumsjonen**: alle regnes som uskyldige til det motsatte er bevist.
- **Domstolene**: tingrett → lagmannsrett → Høyesterett.
- **Kriminell lavalder** i Norge er 15 år.
- **FNs verdenserklæring om menneskerettighetene** ble vedtatt i 1948.
- **Den europeiske menneskerettskonvensjonen** (EMK) gjelder som norsk lov og håndheves av Den europeiske menneskerettsdomstolen i Strasbourg.
- **Straffens formål**: å forebygge ny kriminalitet (avskrekking og rehabilitering) og å markere at samfunnet tar avstand.

### Eksempel
En person blir dømt i tingretten og mener dommen er feil. Hen kan anke til lagmannsretten.

> Ingen står over loven i en rettsstat.`,
`## What is it about?
Under the **rule of law** the same laws apply to everyone, including those in power. Human rights protect the individual against abuse by the state.

## Concepts and formulas
- **Legal certainty**: you should know which rules apply, get fair treatment and be able to appeal.
- **Presumption of innocence**: everyone is considered innocent until proven guilty.
- **The courts**: district court → court of appeal → Supreme Court.
- **The age of criminal responsibility** in Norway is 15.
- **The UN Universal Declaration of Human Rights** was adopted in 1948.
- **The European Convention on Human Rights** (ECHR) applies as Norwegian law and is enforced by the European Court of Human Rights in Strasbourg.
- **Purposes of punishment**: to prevent new crime (deterrence and rehabilitation) and to show that society condemns the act.

### Example
A person is convicted in the district court and thinks the judgment is wrong. They can appeal to the court of appeal.

> No one is above the law under the rule of law.`,
[
 ["Når ble FNs verdenserklæring om menneskerettighetene vedtatt?", { n: 1948, tol: 0, u: "" }, "10. desember 1948.", "When was the UN Universal Declaration of Human Rights adopted?", null, "10 December 1948."],
 ["Hva er den kriminelle lavalderen i Norge?", { n: 15, tol: 0, u: "år" }, "Du kan ikke straffes for noe du gjorde før du fylte 15.", "What is the age of criminal responsibility in Norway?", null, "You cannot be punished for something done before you turned 15."],
 ["Hva betyr uskyldspresumsjonen?", ["Alle er uskyldige til det motsatte er bevist", "Alle tiltalte er skyldige", "Bare dommeren kan være uskyldig", "Man må bevise at man er uskyldig"], "Påtalemyndigheten må bevise skylden.", "What does the presumption of innocence mean?", ["Everyone is innocent until proven guilty", "Every defendant is guilty", "Only the judge can be innocent", "You must prove your innocence"], "The prosecution must prove guilt."],
 ["Hva er den øverste domstolen i Norge?", ["Høyesterett", "Tingretten", "Lagmannsretten", "Stortinget"], "Tingrett → lagmannsrett → Høyesterett.", "What is the highest court in Norway?", ["The Supreme Court", "The district court", "The court of appeal", "Parliament"], "District court → court of appeal → Supreme Court."],
 ["Hva kjennetegner en rettsstat?", ["De samme lovene gjelder for alle, også de som styrer", "Politiet bestemmer straffen", "Regjeringen kan overstyre domstolene", "Lovene er hemmelige"], "Ingen står over loven.", "What characterises the rule of law?", ["The same laws apply to everyone, including those in power", "The police decide the punishment", "The government can overrule the courts", "The laws are secret"], "No one is above the law."],
 ["Hva er et viktig formål med straff?", ["Å forebygge ny kriminalitet", "Å tjene penger til staten", "Å gi fangene arbeid", "Å gjøre fengslene fulle"], "Avskrekking og rehabilitering.", "What is an important purpose of punishment?", ["To prevent new crime", "To make money for the state", "To give prisoners work", "To fill the prisons"], "Deterrence and rehabilitation."]
]);

U("VGSAMF", "Økonomi, arbeidsliv og velferd", "Economy, working life and welfare",
`## Hva handler det om?
Norge har en **blandingsøkonomi**: markedet produserer mesteparten av varene, mens staten sørger for skole, helse og trygder, finansiert med skatt. Samarbeidet mellom arbeidsliv og stat kalles **den norske modellen**.

## Begreper og formler
- **Det økonomiske kretsløpet**: husholdninger selger arbeid til bedrifter og kjøper varer tilbake. Staten og bankene er også med.
- **BNP**: verdien av alt som produseres i et land i løpet av et år.
- **Inflasjon**: at prisene stiger over tid. Norges Bank bruker **styringsrenten** for å holde inflasjonen nær 2 %.
- **Trepartssamarbeidet**: arbeidstakere (for eksempel LO), arbeidsgivere (for eksempel NHO) og staten.
- **Velferdsstaten**: gratis skole, helsetjenester og trygder som dagpenger og pensjon. **Folketrygden** kom i 1967.
- **Skatt**: progressiv skatt betyr at du betaler høyere andel jo mer du tjener.
- **Arbeidsledighet**: andelen av arbeidsstyrken som vil jobbe, men ikke har jobb.

### Eksempel
Når inflasjonen er høy, setter Norges Bank opp renten. Lån blir dyrere, folk bruker mindre penger, og prisveksten dempes.

> Marked + stat + sterke parter i arbeidslivet = den norske modellen.`,
`## What is it about?
Norway has a **mixed economy**: the market produces most goods, while the state provides schools, health care and benefits, funded by taxes. The cooperation between working life and the state is called **the Norwegian model**.

## Concepts and formulas
- **The circular flow**: households sell labour to firms and buy goods back. The state and banks also take part.
- **GDP**: the value of everything produced in a country in a year.
- **Inflation**: prices rising over time. Norges Bank uses the **policy rate** to keep inflation near 2 %.
- **Tripartite cooperation**: employees (for example LO), employers (for example NHO) and the state.
- **The welfare state**: free schooling, health services and benefits such as unemployment pay and pensions. **The National Insurance Scheme** came in 1967.
- **Tax**: progressive tax means you pay a higher share the more you earn.
- **Unemployment**: the share of the labour force who want to work but have no job.

### Example
When inflation is high, Norges Bank raises the interest rate. Loans get more expensive, people spend less, and price growth slows.

> Market + state + strong labour partners = the Norwegian model.`,
[
 ["Hva er inflasjonsmålet til Norges Bank?", { n: 2, tol: 0, u: "%" }, "Om lag 2 % prisvekst over tid.", "What is Norges Bank's inflation target?", null, "About 2 % price growth over time."],
 ["Hvem er med i trepartssamarbeidet?", ["Arbeidstakere, arbeidsgivere og staten", "Stortinget, regjeringen og domstolene", "Bankene, skolene og kommunene", "EU, FN og NATO"], "For eksempel LO, NHO og staten.", "Who takes part in tripartite cooperation?", ["Employees, employers and the state", "Parliament, the government and the courts", "Banks, schools and municipalities", "The EU, UN and NATO"], "For example LO, NHO and the state."],
 ["Hva skjer vanligvis når styringsrenten settes opp?", ["Lån blir dyrere og prisveksten dempes", "Prisene stiger raskere", "Alle får høyere lønn", "Skattene går ned"], "Folk bruker mindre, og etterspørselen faller.", "What usually happens when the policy rate is raised?", ["Loans get dearer and price growth slows", "Prices rise faster", "Everyone gets higher pay", "Taxes fall"], "People spend less, and demand falls."],
 ["Når kom folketrygden i Norge?", { n: 1967, tol: 0, u: "" }, "Folketrygden ble innført i 1967.", "When was the National Insurance Scheme introduced in Norway?", null, "It was introduced in 1967."],
 ["Hva betyr progressiv skatt?", ["Du betaler en høyere andel jo mer du tjener", "Alle betaler samme beløp", "Bare bedrifter betaler skatt", "Skatten går ned hvert år"], "Gir omfordeling fra rike til fattige.", "What does progressive tax mean?", ["You pay a higher share the more you earn", "Everyone pays the same amount", "Only companies pay tax", "Tax falls every year"], "It redistributes from rich to poor."],
 ["Hva er BNP?", ["Verdien av alt som produseres i et land i løpet av et år", "Statens gjeld", "Summen av alle skatter", "Antall arbeidsplasser"], "Bruttonasjonalprodukt.", "What is GDP?", ["The value of everything produced in a country in a year", "Government debt", "The sum of all taxes", "The number of jobs"], "Gross domestic product."]
]);

U("VGSAMF", "Internasjonal politikk", "International politics",
`## Hva handler det om?
Ingen land klarer seg alene. Norge samarbeider gjennom FN, NATO og EØS, og internasjonale konflikter og avtaler påvirker oss direkte.

## Begreper og formler
- **FN** ble grunnlagt i 1945. **Sikkerhetsrådet** har fem faste medlemmer med vetorett: USA, Russland, Kina, Storbritannia og Frankrike.
- **NATO** ble grunnlagt i 1949, og Norge var med fra starten. **Artikkel 5**: et angrep på ett medlem regnes som et angrep på alle.
- **EU og EØS**: Norge sa nei til EU-medlemskap i folkeavstemninger i 1972 og 1994, men er med i det indre markedet gjennom **EØS-avtalen** (fra 1994).
- **Globalisering**: økt handel, reiser og informasjonsflyt mellom land.
- **Bistand**: Norge gir om lag 1 % av bruttonasjonalinntekten til utviklingshjelp.
- **Realisme** og **idealisme** er to måter å forstå internasjonal politikk på: makt og egeninteresse, eller samarbeid og felles regler.

### Eksempel
Da Russland gikk til fullskala krig mot Ukraina i 2022, ble Sikkerhetsrådet handlingslammet fordi Russland har vetorett.

> Fem faste medlemmer med vetorett styrer mye i FN.`,
`## What is it about?
No country manages on its own. Norway cooperates through the UN, NATO and the EEA, and international conflicts and agreements affect us directly.

## Concepts and formulas
- **The UN** was founded in 1945. **The Security Council** has five permanent members with a veto: the USA, Russia, China, the United Kingdom and France.
- **NATO** was founded in 1949, and Norway was a founding member. **Article 5**: an attack on one member is considered an attack on all.
- **The EU and the EEA**: Norway said no to EU membership in referendums in 1972 and 1994, but takes part in the single market through **the EEA Agreement** (since 1994).
- **Globalisation**: more trade, travel and information flow between countries.
- **Aid**: Norway gives about 1 % of gross national income to development aid.
- **Realism** and **idealism** are two ways of understanding international politics: power and self-interest, or cooperation and shared rules.

### Example
When Russia launched a full-scale war against Ukraine in 2022, the Security Council was paralysed because Russia has a veto.

> Five permanent members with a veto steer a lot in the UN.`,
[
 ["Hvor mange faste medlemmer med vetorett har FNs sikkerhetsråd?", { n: 5, tol: 0, u: "" }, "5: USA, Russland, Kina, Storbritannia og Frankrike.", "How many permanent members with a veto does the UN Security Council have?", null, "5: the USA, Russia, China, the UK and France."],
 ["Når ble NATO grunnlagt?", { n: 1949, tol: 0, u: "" }, "I 1949, med Norge som et av grunnleggerlandene.", "When was NATO founded?", null, "In 1949, with Norway as a founding member."],
 ["Hva sier NATOs artikkel 5?", ["Et angrep på ett medlem er et angrep på alle", "Alle må bruke samme valuta", "Medlemmene må ha samme lover", "Alle må være med i EU"], "Kollektivt forsvar.", "What does NATO's Article 5 say?", ["An attack on one member is an attack on all", "Everyone must use the same currency", "Members must have the same laws", "Everyone must join the EU"], "Collective defence."],
 ["Hvilke år sa Norge nei til EU i folkeavstemning?", ["1972 og 1994", "1905 og 1945", "1814 og 1905", "2000 og 2010"], "Begge gangene ble det et knapt nei.", "In which years did Norway vote no to the EU in referendums?", ["1972 and 1994", "1905 and 1945", "1814 and 1905", "2000 and 2010"], "Both times it was a narrow no."],
 ["Hva gir EØS-avtalen Norge?", ["Tilgang til EUs indre marked", "Fullt medlemskap i EU", "Egen plass i Sikkerhetsrådet", "Felles forsvar med EU"], "Norge følger mange EU-regler uten å stemme over dem.", "What does the EEA Agreement give Norway?", ["Access to the EU single market", "Full EU membership", "A seat on the Security Council", "Joint defence with the EU"], "Norway follows many EU rules without voting on them."],
 ["Når ble FN grunnlagt?", { n: 1945, tol: 0, u: "" }, "Etter andre verdenskrig, i 1945.", "When was the UN founded?", null, "After the Second World War, in 1945."]
]);

U("VGSAMF", "Identitet, sosialisering og kultur", "Identity, socialisation and culture",
`## Hva handler det om?
Hvem du er, formes av familie, venner, skole, medier og kultur. Samfunnsfaget ser på hvordan vi lærer normer og roller, og hvordan fordommer og utenforskap oppstår.

## Begreper og formler
- **Sosialisering**: prosessen der vi lærer normer, verdier og ferdigheter. **Primær**: i familien tidlig i livet. **Sekundær**: skole, venner, medier, arbeidsliv.
- **Normer**: uskrevne og skrevne regler for hvordan vi skal oppføre oss. Brudd kan gi **sanksjoner** (positive eller negative).
- **Roller**: forventninger knyttet til en posisjon, for eksempel elev, sønn eller trener.
- **Identitet**: hvem du opplever at du er, og hvordan andre ser deg.
- **Fordommer**: negative holdninger til en gruppe uten god grunn. **Diskriminering**: å behandle noen dårligere på grunn av for eksempel kjønn, etnisitet eller funksjonsevne.
- **Kultur**: kunnskap, verdier og vaner vi deler og lærer av hverandre.

### Eksempel
En ny elev lærer raskt hvordan man «skal» kle seg og snakke i klassen. Det er sekundær sosialisering gjennom venner, og blikk og kommentarer er sanksjoner.

> Vi lærer å bli en del av samfunnet gjennom sosialisering.`,
`## What is it about?
Who you are is shaped by family, friends, school, media and culture. Social studies looks at how we learn norms and roles, and how prejudice and exclusion arise.

## Concepts and formulas
- **Socialisation**: the process by which we learn norms, values and skills. **Primary**: in the family early in life. **Secondary**: school, friends, media, working life.
- **Norms**: unwritten and written rules for how to behave. Breaking them can lead to **sanctions** (positive or negative).
- **Roles**: expectations tied to a position, for example student, son or coach.
- **Identity**: who you feel you are, and how others see you.
- **Prejudice**: negative attitudes to a group without good reason. **Discrimination**: treating someone worse because of, for example, gender, ethnicity or disability.
- **Culture**: knowledge, values and habits we share and learn from each other.

### Example
A new student quickly learns how one "should" dress and talk in class. That is secondary socialisation through friends, and looks and comments are sanctions.

> We learn to become part of society through socialisation.`,
[
 ["Hva er primær sosialisering?", ["Det vi lærer i familien tidlig i livet", "Det vi lærer på jobben", "Det vi lærer av mediene", "Det vi lærer på universitetet"], "Sekundær sosialisering skjer senere, i skole, vennegjeng og arbeidsliv.", "What is primary socialisation?", ["What we learn in the family early in life", "What we learn at work", "What we learn from the media", "What we learn at university"], "Secondary socialisation happens later, at school, among friends and at work."],
 ["Hva er en norm?", ["En regel for hvordan vi skal oppføre oss", "En lov vedtatt av Stortinget", "En type straff", "En personlig mening"], "Normer kan være skrevne eller uskrevne.", "What is a norm?", ["A rule for how to behave", "A law passed by Parliament", "A type of punishment", "A personal opinion"], "Norms can be written or unwritten."],
 ["Hva er en positiv sanksjon?", ["Ros eller belønning for ønsket atferd", "En bot", "Utestenging", "Fengselsstraff"], "Sanksjoner kan både belønne og straffe.", "What is a positive sanction?", ["Praise or reward for desired behaviour", "A fine", "Exclusion", "Imprisonment"], "Sanctions can both reward and punish."],
 ["Hva er diskriminering?", ["Å behandle noen dårligere på grunn av for eksempel etnisitet eller kjønn", "Å ha en annen mening", "Å velge venner", "Å være uenig i politikk"], "Diskriminering er forbudt ved lov i mange sammenhenger.", "What is discrimination?", ["Treating someone worse because of, for example, ethnicity or gender", "Having a different opinion", "Choosing friends", "Disagreeing about politics"], "Discrimination is prohibited by law in many contexts."],
 ["Hva er en rolle?", ["Forventninger knyttet til en posisjon", "En skuespillerjobb", "En lov", "En personlighetstype"], "Du har mange roller: elev, venn, søsken.", "What is a role?", ["Expectations tied to a position", "An acting job", "A law", "A personality type"], "You have many roles: student, friend, sibling."]
]);

U("VGSAMF", "Medier og kildekritikk", "Media and source criticism",
`## Hva handler det om?
Mediene gir oss informasjon og kontrollerer makthavere, men sosiale medier og algoritmer gjør at vi også møter mye feilinformasjon. Kildekritikk er å vurdere hva vi kan stole på.

## Begreper og formler
- **Den fjerde statsmakt**: pressen kalles det fordi den gransker og kontrollerer de tre andre statsmaktene.
- **Vær varsom-plakaten**: pressens etiske regler. **PFU** (Pressens Faglige Utvalg) behandler klager.
- **Redaktøransvar**: redaktøren har ansvar for alt som publiseres i et redaktørstyrt medium.
- **Algoritmer** bestemmer hva du ser i sosiale medier. Det kan gi **ekkokamre**, der du mest møter meninger du allerede har.
- **Kildekritikk**: Hvem står bak? Hvorfor er det laget? Når? Kan det bekreftes av andre kilder?
- **Desinformasjon**: bevisst falsk informasjon. **Feilinformasjon**: feil som spres uten vond vilje.

### Eksempel
Du ser et sjokkerende bilde på sosiale medier. Et omvendt bildesøk viser at bildet er ti år gammelt og fra et annet land.

> Sjekk hvem, hvorfor og når, og finn en kilde til.`,
`## What is it about?
The media inform us and hold power to account, but social media and algorithms mean we also meet a lot of misinformation. Source criticism is judging what we can trust.

## Concepts and formulas
- **The fourth estate**: the press is called this because it scrutinises and checks the other three branches of power.
- **The ethical code of the Norwegian press** (Vaer varsom-plakaten) sets the rules. **The Press Complaints Commission** (PFU) handles complaints.
- **Editorial responsibility**: the editor is responsible for everything published in an edited medium.
- **Algorithms** decide what you see on social media. This can create **echo chambers**, where you mostly meet opinions you already hold.
- **Source criticism**: Who is behind it? Why was it made? When? Can other sources confirm it?
- **Disinformation**: deliberately false information. **Misinformation**: errors spread without ill intent.

### Example
You see a shocking picture on social media. A reverse image search shows the picture is ten years old and from another country.

> Check who, why and when, and find a second source.`,
[
 ["Hvorfor kalles pressen den fjerde statsmakt?", ["Den kontrollerer de tre andre statsmaktene", "Den vedtar lover", "Den dømmer i rettssaker", "Den velger regjeringen"], "Pressen gransker makthavere.", "Why is the press called the fourth estate?", ["It checks the other three branches of power", "It passes laws", "It judges court cases", "It elects the government"], "The press scrutinises those in power."],
 ["Hva er et ekkokammer?", ["Et sted der du mest møter meninger du allerede har", "Et lydstudio", "En type nyhetsartikkel", "En falsk nyhet"], "Algoritmer kan forsterke ekkokamre.", "What is an echo chamber?", ["A place where you mostly meet opinions you already hold", "A sound studio", "A type of news article", "A fake news story"], "Algorithms can reinforce echo chambers."],
 ["Hva er forskjellen på desinformasjon og feilinformasjon?", ["Desinformasjon er bevisst falsk, feilinformasjon er feil uten vond vilje", "Det er det samme", "Feilinformasjon er alltid bevisst", "Desinformasjon er alltid sann"], "Hensikten skiller dem.", "What is the difference between disinformation and misinformation?", ["Disinformation is deliberately false, misinformation is an error without ill intent", "They are the same", "Misinformation is always deliberate", "Disinformation is always true"], "The intention separates them."],
 ["Hvem behandler klager på pressen i Norge?", ["PFU (Pressens Faglige Utvalg)", "Høyesterett", "Stortinget", "Politiet"], "PFU vurderer brudd på Vær varsom-plakaten.", "Who handles complaints about the press in Norway?", ["The Press Complaints Commission (PFU)", "The Supreme Court", "Parliament", "The police"], "PFU assesses breaches of the press code."],
 ["Hvilket spørsmål er viktigst i kildekritikk?", ["Hvem står bak, og hvorfor?", "Hvor mange likes har det?", "Er bildet pent?", "Er det langt?"], "Avsender og hensikt avgjør mye.", "Which question matters most in source criticism?", ["Who is behind it, and why?", "How many likes does it have?", "Is the picture nice?", "Is it long?"], "The sender and purpose tell you a lot."]
]);

// ================= HISTORIE =================
const EV = [
 [793, "vikingangrepet på Lindisfarne", "the Viking raid on Lindisfarne"], [1030, "slaget på Stiklestad", "the Battle of Stiklestad"], [1349, "svartedauden kommer til Norge", "the Black Death reaches Norway"],
 [1397, "Kalmarunionen blir opprettet", "the Kalmar Union is formed"], [1492, "Columbus kommer til Amerika", "Columbus reaches the Americas"], [1517, "Luther slår opp sine teser", "Luther posts his theses"],
 [1537, "reformasjonen i Norge", "the Reformation in Norway"], [1776, "USAs uavhengighetserklæring", "the US Declaration of Independence"], [1789, "den franske revolusjonen", "the French Revolution"],
 [1814, "Norges grunnlov blir vedtatt på Eidsvoll", "Norway's constitution is adopted at Eidsvoll"], [1884, "parlamentarismen innføres i Norge", "parliamentarism is introduced in Norway"],
 [1905, "unionen med Sverige oppløses", "the union with Sweden is dissolved"], [1913, "alminnelig stemmerett for kvinner i Norge", "universal suffrage for women in Norway"], [1914, "første verdenskrig bryter ut", "the First World War breaks out"],
 [1917, "den russiske revolusjonen", "the Russian Revolution"], [1929, "børskrakket i New York", "the Wall Street Crash"], [1933, "Hitler kommer til makten i Tyskland", "Hitler comes to power in Germany"],
 [1939, "andre verdenskrig bryter ut", "the Second World War breaks out"], [1940, "Tyskland angriper Norge", "Germany invades Norway"], [1945, "andre verdenskrig slutter", "the Second World War ends"],
 [1949, "NATO blir grunnlagt", "NATO is founded"], [1961, "Berlinmuren blir bygd", "the Berlin Wall is built"], [1962, "Cubakrisen", "the Cuban Missile Crisis"], [1969, "Ekofisk-feltet blir funnet", "the Ekofisk field is discovered"],
 [1989, "Berlinmuren faller", "the Berlin Wall falls"], [1991, "Sovjetunionen går i oppløsning", "the Soviet Union dissolves"]
];
U("VGHIS", "Historiefaget og kildekritikk", "History and source criticism",
`## Hva handler det om?
Historie er ikke bare hva som skjedde, men hvordan vi vet det. Historikere bruker **kilder** og vurderer dem kritisk, og ulike historikere kan tolke de samme kildene forskjellig.

## Begreper og formler
- **Primærkilde**: fra tiden og hendelsen selv (brev, dagbøker, bilder, gjenstander). **Sekundærkilde**: skrevet senere om hendelsen (lærebøker, historiske verk).
- **Levning**: en kilde vi bruker for å se hva den forteller om tiden den ble til i (for eksempel et redskap eller en regning). **Beretning**: en kilde som forteller om noe.
- **Kildekritikk**: Hvem laget kilden? Når og hvorfor? Var opphavspersonen til stede? Hvilke interesser hadde hen?
- **Årsaker**: historikere skiller mellom langsiktige og utløsende årsaker.
- **Historiebruk**: historien brukes i politikk, reklame og identitetsbygging, for eksempel 17. mai.

### Eksempel
Skuddene i Sarajevo i 1914 var den **utløsende** årsaken til første verdenskrig. Allianser, våpenkappløp og nasjonalisme var **langsiktige** årsaker.

> Spør alltid: hvem, når, hvorfor, og kan det bekreftes?`,
`## What is it about?
History is not only what happened, but how we know it. Historians use **sources** and assess them critically, and different historians can interpret the same sources differently.

## Concepts and formulas
- **Primary source**: from the time and event itself (letters, diaries, pictures, objects). **Secondary source**: written later about the event (textbooks, histories).
- **Remnant**: a source we use for what it reveals about the time it was made (for example a tool or an invoice). **Account**: a source that tells about something.
- **Source criticism**: Who made the source? When and why? Was the author present? What interests did they have?
- **Causes**: historians distinguish between long-term and immediate (triggering) causes.
- **Uses of history**: history is used in politics, advertising and identity building, for example on Constitution Day.

### Example
The shots in Sarajevo in 1914 were the **immediate** cause of the First World War. Alliances, the arms race and nationalism were **long-term** causes.

> Always ask: who, when, why, and can it be confirmed?`,
[
 ["Hva er en primærkilde?", ["En kilde fra tiden og hendelsen selv", "En lærebok skrevet senere", "En film om hendelsen", "En Wikipedia-artikkel"], "For eksempel brev, dagbøker og bilder.", "What is a primary source?", ["A source from the time and event itself", "A textbook written later", "A film about the event", "A Wikipedia article"], "For example letters, diaries and pictures."],
 ["Hva var den utløsende årsaken til første verdenskrig?", ["Skuddene i Sarajevo i 1914", "Den russiske revolusjonen", "Børskrakket", "Versaillestraktaten"], "Den østerrikske tronfølgeren ble drept.", "What was the immediate cause of the First World War?", ["The shots in Sarajevo in 1914", "The Russian Revolution", "The Wall Street Crash", "The Treaty of Versailles"], "The Austrian heir to the throne was killed."],
 ["Hva er en levning?", ["En kilde brukt for hva den avslører om tiden den ble laget i", "En kilde som forteller en historie", "En sekundærkilde", "En falsk kilde"], "For eksempel et redskap eller en regning.", "What is a remnant?", ["A source used for what it reveals about the time it was made", "A source that tells a story", "A secondary source", "A fake source"], "For example a tool or an invoice."],
 ["Hvorfor må en dagbok fra en general brukes kritisk?", ["Generalen kan ha villet framstille seg selv i et godt lys", "Dagbøker er alltid falske", "Generaler kan ikke skrive", "Den er for gammel"], "Opphavspersonens interesser påvirker kilden.", "Why must a general's diary be used critically?", ["The general may have wanted to look good", "Diaries are always false", "Generals cannot write", "It is too old"], "The author's interests shape the source."]
],
 orderGen(EV)
);
U("VGHIS", "Vikingtid og middelalder", "The Viking Age and the Middle Ages",
`## Hva handler det om?
Vikingtiden (om lag 793–1066) var en tid med handel, plyndring og bosetting over store deler av Europa. I middelalderen ble Norge et kristent kongerike, men ble hardt rammet av svartedauden.

## Begreper og formler
- **Vikingtiden** regnes ofte fra angrepet på klosteret Lindisfarne i 793 til 1066.
- **Rikssamling**: Harald Hårfagre samlet store deler av Norge rundt år 900.
- **Kristningen**: Olav Haraldsson falt på **Stiklestad i 1030** og ble senere helgenkåret som Olav den hellige.
- **Svartedauden** (pesten) kom til Norge i 1349 og drepte kanskje halvparten av befolkningen.
- **Kalmarunionen** (1397) samlet Danmark, Norge og Sverige under én monark.
- **Føydalsystemet** preget mye av Europa: konge, adel, geistlighet og bønder med plikter og rettigheter.

### Eksempel
Etter svartedauden ble mange gårder forlatt, skatteinntektene falt, og Norge ble svakere i forhold til Danmark.

> 793 Lindisfarne, 1030 Stiklestad, 1349 svartedauden, 1397 Kalmar.`,
`## What is it about?
The Viking Age (about 793–1066) was a time of trade, raiding and settlement across much of Europe. In the Middle Ages Norway became a Christian kingdom, but was hit hard by the Black Death.

## Concepts and formulas
- **The Viking Age** is often dated from the raid on the monastery of Lindisfarne in 793 to 1066.
- **Unification**: Harald Fairhair united much of Norway around the year 900.
- **Christianisation**: Olaf Haraldsson fell at **Stiklestad in 1030** and was later canonised as Saint Olaf.
- **The Black Death** (plague) reached Norway in 1349 and killed perhaps half the population.
- **The Kalmar Union** (1397) united Denmark, Norway and Sweden under one monarch.
- **Feudalism** shaped much of Europe: king, nobility, clergy and peasants with duties and rights.

### Example
After the Black Death many farms were abandoned, tax income fell, and Norway grew weaker relative to Denmark.

> 793 Lindisfarne, 1030 Stiklestad, 1349 Black Death, 1397 Kalmar.`,
[
 ["Hvilket år regnes ofte som starten på vikingtiden?", { n: 793, tol: 0, u: "" }, "Angrepet på Lindisfarne i 793.", "Which year is often taken as the start of the Viking Age?", null, "The raid on Lindisfarne in 793."],
 ["Hva skjedde på Stiklestad i 1030?", ["Olav Haraldsson falt i slag", "Norge fikk grunnlov", "Svartedauden kom", "Kalmarunionen ble opprettet"], "Han ble senere helgenkåret som Olav den hellige.", "What happened at Stiklestad in 1030?", ["Olaf Haraldsson fell in battle", "Norway got a constitution", "The Black Death arrived", "The Kalmar Union was formed"], "He was later canonised as Saint Olaf."],
 ["Når kom svartedauden til Norge?", { n: 1349, tol: 0, u: "" }, "I 1349, med et skip til Bergen.", "When did the Black Death reach Norway?", null, "In 1349, on a ship to Bergen."],
 ["Hvilke land var med i Kalmarunionen?", ["Danmark, Norge og Sverige", "Norge og Island", "Norge, Sverige og Finland", "Danmark og Tyskland"], "Opprettet i 1397.", "Which countries were in the Kalmar Union?", ["Denmark, Norway and Sweden", "Norway and Iceland", "Norway, Sweden and Finland", "Denmark and Germany"], "Formed in 1397."],
 ["Omtrent hvor stor del av befolkningen døde av svartedauden i Norge?", ["Kanskje halvparten", "Om lag 1 %", "Alle", "Om lag 10 %"], "Anslagene varierer, men tapet var enormt.", "Roughly what share of Norway's population died of the Black Death?", ["Perhaps half", "About 1 %", "Everyone", "About 10 %"], "Estimates vary, but the loss was huge."]
],
 yearGen(EV.filter(e => e[0] < 1500))
);
U("VGHIS", "Reformasjon, opplysningstid og revolusjoner", "Reformation, Enlightenment and revolutions",
`## Hva handler det om?
Fra 1500- til 1800-tallet endret Europa seg radikalt: kirken ble splittet, nye ideer om fornuft og frihet spredte seg, og revolusjoner veltet gamle maktsystemer.

## Begreper og formler
- **Reformasjonen**: Martin Luther kritiserte den katolske kirken i 1517. Danmark-Norge ble luthersk i 1536–1537.
- **Opplysningstiden** (1700-tallet): fornuft, vitenskap og menneskerettigheter. **Locke** (naturlige rettigheter), **Montesquieu** (maktfordeling), **Rousseau** (folkesuverenitet).
- **Den amerikanske revolusjonen**: uavhengighetserklæringen 1776.
- **Den franske revolusjonen** (1789): «frihet, likhet, brorskap». Eneveldet ble avskaffet.
- **Den industrielle revolusjonen**: startet i Storbritannia på 1700-tallet med dampmaskin og fabrikker. Folk flyttet fra land til by.

### Eksempel
Montesquieus idé om maktfordeling ble brukt både i USAs grunnlov og i den norske grunnloven av 1814.

> Nye ideer om fornuft og frihet ga nye styreformer.`,
`## What is it about?
From the 1500s to the 1800s Europe changed radically: the church split, new ideas about reason and freedom spread, and revolutions overturned old systems of power.

## Concepts and formulas
- **The Reformation**: Martin Luther criticised the Catholic Church in 1517. Denmark-Norway became Lutheran in 1536–1537.
- **The Enlightenment** (1700s): reason, science and human rights. **Locke** (natural rights), **Montesquieu** (separation of powers), **Rousseau** (popular sovereignty).
- **The American Revolution**: the Declaration of Independence in 1776.
- **The French Revolution** (1789): "liberty, equality, fraternity". Absolute monarchy was abolished.
- **The Industrial Revolution**: began in Britain in the 1700s with steam engines and factories. People moved from countryside to towns.

### Example
Montesquieu's idea of the separation of powers was used both in the US Constitution and in Norway's constitution of 1814.

> New ideas about reason and freedom led to new forms of government.`,
[
 ["Hvem startet reformasjonen i 1517?", ["Martin Luther", "Napoleon", "Montesquieu", "Karl den store"], "Han kritiserte blant annet avlatshandelen.", "Who started the Reformation in 1517?", ["Martin Luther", "Napoleon", "Montesquieu", "Charlemagne"], "He criticised, among other things, the sale of indulgences."],
 ["Hvilken tenker er kjent for ideen om maktfordeling?", ["Montesquieu", "Luther", "Marx", "Platon"], "Tredelingen av makten.", "Which thinker is known for the idea of the separation of powers?", ["Montesquieu", "Luther", "Marx", "Plato"], "The three-way division of power."],
 ["Når startet den franske revolusjonen?", { n: 1789, tol: 0, u: "" }, "Stormingen av Bastillen 14. juli 1789.", "When did the French Revolution begin?", null, "The storming of the Bastille on 14 July 1789."],
 ["Hvor startet den industrielle revolusjonen?", ["I Storbritannia", "I Norge", "I Kina", "I USA"], "På 1700-tallet, med dampmaskinen.", "Where did the Industrial Revolution begin?", ["In Britain", "In Norway", "In China", "In the USA"], "In the 1700s, with the steam engine."],
 ["Hva var slagordet under den franske revolusjonen?", ["Frihet, likhet, brorskap", "Gud, konge, fedreland", "Arbeid til alle", "Ett folk, ett rike"], "Liberté, égalité, fraternité.", "What was the slogan of the French Revolution?", ["Liberty, equality, fraternity", "God, king, fatherland", "Work for all", "One people, one realm"], "Liberté, égalité, fraternité."]
],
 yearGen(EV.filter(e => e[0] >= 1492 && e[0] <= 1789))
);
U("VGHIS", "Norge 1814–1905", "Norway 1814–1905",
`## Hva handler det om?
I 1814 fikk Norge sin egen grunnlov, men gikk i union med Sverige. Gjennom 1800-tallet vokste demokratiet, og i 1905 ble Norge et fullt selvstendig land.

## Begreper og formler
- **Kielfreden** (januar 1814): Danmark måtte gi Norge til Sverige.
- **Grunnloven** ble vedtatt på **Eidsvoll 17. mai 1814**, bygd på opplysningstidens ideer om maktfordeling og folkesuverenitet.
- **Unionen med Sverige** (1814–1905): felles konge, men egne lover og eget storting.
- **Parlamentarismen** ble innført i **1884**: regjeringen måtte ha Stortingets tillit.
- **Stemmerett**: allmenn stemmerett for menn i 1898, for kvinner i **1913**.
- **Unionsoppløsningen 7. juni 1905**: bekreftet i folkeavstemning. Den danske prins Carl ble konge som **Haakon VII**.
- **Nasjonalromantikken**: Ibsen, Bjørnson, Grieg og eventyrsamlingen til Asbjørnsen og Moe skapte en norsk identitet.

### Eksempel
Grunnloven fra 1814 er i dag den eldste grunnloven i Europa som fortsatt er i bruk.

> 1814 grunnlov, 1884 parlamentarisme, 1905 selvstendighet, 1913 kvinnelig stemmerett.`,
`## What is it about?
In 1814 Norway got its own constitution but entered a union with Sweden. During the 1800s democracy grew, and in 1905 Norway became a fully independent country.

## Concepts and formulas
- **The Treaty of Kiel** (January 1814): Denmark had to give Norway to Sweden.
- **The Constitution** was adopted at **Eidsvoll on 17 May 1814**, based on Enlightenment ideas of the separation of powers and popular sovereignty.
- **The union with Sweden** (1814–1905): a shared king, but separate laws and a separate parliament.
- **Parliamentarism** was introduced in **1884**: the government had to have Parliament's confidence.
- **The vote**: universal male suffrage in 1898, for women in **1913**.
- **The dissolution of the union on 7 June 1905**: confirmed by referendum. The Danish Prince Carl became king as **Haakon VII**.
- **National Romanticism**: Ibsen, Bjornson, Grieg and the folk tale collection of Asbjornsen and Moe created a Norwegian identity.

### Example
The 1814 constitution is today the oldest constitution in Europe still in use.

> 1814 constitution, 1884 parliamentarism, 1905 independence, 1913 women's suffrage.`,
[
 ["Hvor ble Grunnloven vedtatt?", ["På Eidsvoll", "I Bergen", "I Stockholm", "I Trondheim"], "17. mai 1814.", "Where was the Constitution adopted?", ["At Eidsvoll", "In Bergen", "In Stockholm", "In Trondheim"], "17 May 1814."],
 ["Når ble unionen med Sverige oppløst?", { n: 1905, tol: 0, u: "" }, "7. juni 1905.", "When was the union with Sweden dissolved?", null, "7 June 1905."],
 ["Når fikk kvinner alminnelig stemmerett i Norge?", { n: 1913, tol: 0, u: "" }, "Menn fikk det i 1898, kvinner i 1913.", "When did women get universal suffrage in Norway?", null, "Men got it in 1898, women in 1913."],
 ["Hva skjedde i 1884?", ["Parlamentarismen ble innført", "Norge fikk grunnlov", "Unionen ble oppløst", "Kvinner fikk stemmerett"], "Regjeringen måtte ha Stortingets tillit.", "What happened in 1884?", ["Parliamentarism was introduced", "Norway got a constitution", "The union was dissolved", "Women got the vote"], "The government needed Parliament's confidence."],
 ["Hvem ble Norges konge i 1905?", ["Haakon VII", "Olav V", "Oscar II", "Karl Johan"], "Den danske prins Carl tok navnet Haakon VII.", "Who became Norway's king in 1905?", ["Haakon VII", "Olav V", "Oscar II", "Karl Johan"], "The Danish Prince Carl took the name Haakon VII."],
 ["Hva bestemte Kielfreden i 1814?", ["At Danmark måtte gi Norge til Sverige", "At Norge ble selvstendig", "At Norge ble med i EU", "At Sverige ble en del av Norge"], "Norge hadde vært i union med Danmark i over 400 år.", "What did the Treaty of Kiel decide in 1814?", ["That Denmark had to give Norway to Sweden", "That Norway became independent", "That Norway joined the EU", "That Sweden became part of Norway"], "Norway had been in union with Denmark for over 400 years."]
],
 yearGen(EV.filter(e => e[0] >= 1814 && e[0] <= 1913))
);
U("VGHIS", "Verdenskrigene", "The world wars",
`## Hva handler det om?
To verdenskriger preget første halvdel av 1900-tallet. Mellom dem kom en økonomisk krise og framveksten av fascisme og nazisme.

## Begreper og formler
- **Første verdenskrig** (1914–1918): skyttergravskrig, om lag 17 millioner døde. Norge var nøytralt.
- **Versaillestraktaten** (1919) ga Tyskland skylden og store krigserstatninger.
- **Den russiske revolusjonen** (1917): kommunistene tok makten.
- **Mellomkrigstiden**: børskrakket i 1929 ga massearbeidsledighet. Fascismen (Mussolini, 1922) og nazismen (Hitler, 1933) vokste fram.
- **Andre verdenskrig** (1939–1945): startet da Tyskland angrep Polen 1. september 1939.
- **Norge**: angrepet **9. april 1940**, okkupert i fem år. Quisling ledet det nazistiske NS-regimet. Hjemmefronten og Milorg drev motstand. Frigjøring **8. mai 1945**.
- **Holocaust**: nazistenes systematiske drap på om lag seks millioner jøder, i tillegg til rom, funksjonshemmede og andre. Over 700 jøder ble deportert fra Norge, og de aller fleste ble drept.

### Eksempel
Versaillestraktaten skapte bitterhet i Tyskland, og Hitler brukte dette i propagandaen sin. Mange historikere ser derfor en sammenheng mellom de to krigene.

> 1914–1918 og 1939–1945. Norge okkupert 1940–1945.`,
`## What is it about?
Two world wars dominated the first half of the 1900s. Between them came an economic crisis and the rise of fascism and Nazism.

## Concepts and formulas
- **The First World War** (1914–1918): trench warfare, about 17 million dead. Norway was neutral.
- **The Treaty of Versailles** (1919) put the blame on Germany and imposed large reparations.
- **The Russian Revolution** (1917): the communists seized power.
- **The interwar years**: the 1929 crash caused mass unemployment. Fascism (Mussolini, 1922) and Nazism (Hitler, 1933) rose.
- **The Second World War** (1939–1945): began when Germany attacked Poland on 1 September 1939.
- **Norway**: invaded **9 April 1940**, occupied for five years. Quisling led the Nazi NS regime. The Home Front and Milorg resisted. Liberation on **8 May 1945**.
- **The Holocaust**: the Nazis' systematic murder of about six million Jews, as well as Roma, disabled people and others. Over 700 Jews were deported from Norway, and nearly all were killed.

### Example
The Treaty of Versailles created bitterness in Germany, and Hitler used it in his propaganda. Many historians therefore see a link between the two wars.

> 1914–1918 and 1939–1945. Norway occupied 1940–1945.`,
[
 ["Når ble Norge angrepet av Tyskland?", ["9. april 1940", "1. september 1939", "8. mai 1945", "17. mai 1814"], "Okkupasjonen varte i fem år.", "When was Norway invaded by Germany?", ["9 April 1940", "1 September 1939", "8 May 1945", "17 May 1814"], "The occupation lasted five years."],
 ["Omtrent hvor mange jøder ble drept i Holocaust?", ["Om lag seks millioner", "Om lag 60 000", "Om lag 600 000", "Om lag 60 millioner"], "Et systematisk folkemord.", "Roughly how many Jews were killed in the Holocaust?", ["About six million", "About 60,000", "About 600,000", "About 60 million"], "A systematic genocide."],
 ["Hva utløste andre verdenskrig i Europa?", ["Tysklands angrep på Polen", "Skuddene i Sarajevo", "Angrepet på Pearl Harbor", "Den russiske revolusjonen"], "1. september 1939.", "What triggered the Second World War in Europe?", ["Germany's attack on Poland", "The shots in Sarajevo", "The attack on Pearl Harbor", "The Russian Revolution"], "1 September 1939."],
 ["Hva var Norges rolle i første verdenskrig?", ["Norge var nøytralt", "Norge kjempet med Tyskland", "Norge ble okkupert", "Norge startet krigen"], "Men mange norske sjøfolk omkom.", "What was Norway's role in the First World War?", ["Norway was neutral", "Norway fought with Germany", "Norway was occupied", "Norway started the war"], "But many Norwegian sailors died."],
 ["Hvem ledet NS-regimet i Norge under krigen?", ["Vidkun Quisling", "Haakon VII", "Einar Gerhardsen", "Johan Nygaardsvold"], "Quisling ble henrettet etter krigen.", "Who led the NS regime in Norway during the war?", ["Vidkun Quisling", "Haakon VII", "Einar Gerhardsen", "Johan Nygaardsvold"], "Quisling was executed after the war."],
 ["Når ble Norge frigjort?", ["8. mai 1945", "9. april 1940", "17. mai 1905", "1. januar 1950"], "Tyskland kapitulerte.", "When was Norway liberated?", ["8 May 1945", "9 April 1940", "17 May 1905", "1 January 1950"], "Germany surrendered."]
],
 yearGen(EV.filter(e => e[0] >= 1914 && e[0] <= 1945)), orderGen(EV.filter(e => e[0] >= 1905 && e[0] <= 1949))
);
U("VGHIS", "Den kalde krigen og etterkrigstiden", "The Cold War and the post-war era",
`## Hva handler det om?
Etter 1945 sto USA og Sovjetunionen mot hverandre i en **kald krig**: en konflikt uten direkte krig mellom supermaktene, men med våpenkappløp og stedfortrederkriger. I Norge ble velferdsstaten bygd.

## Begreper og formler
- **Øst mot vest**: NATO (1949) mot Warszawapakten (1955). Kapitalisme og demokrati mot kommunisme og ettpartistat.
- **Jernteppet** delte Europa. **Berlinmuren** ble bygd i 1961 og falt i 1989.
- **Cubakrisen** (1962): verden var nær atomkrig.
- **Sovjetunionen** gikk i oppløsning i 1991.
- **Norge etter krigen**: gjenoppbygging under Arbeiderpartiet og Einar Gerhardsen, NATO-medlemskap fra 1949, **folketrygden** i 1967.
- **Oljealderen**: Ekofisk ble funnet i 1969 og ga Norge enorme inntekter. Oljefondet ble opprettet i 1990.

### Eksempel
Norge grenser mot Russland i nord. Under den kalde krigen var Norge derfor et viktig NATO-land, men førte samtidig en forsiktig politikk for ikke å provosere Sovjetunionen.

> 1949 NATO, 1961 muren, 1962 Cuba, 1989 muren faller, 1991 Sovjet oppløst.`,
`## What is it about?
After 1945 the USA and the Soviet Union faced each other in a **cold war**: a conflict without direct war between the superpowers, but with an arms race and proxy wars. In Norway the welfare state was built.

## Concepts and formulas
- **East against West**: NATO (1949) against the Warsaw Pact (1955). Capitalism and democracy against communism and one-party rule.
- **The Iron Curtain** divided Europe. **The Berlin Wall** was built in 1961 and fell in 1989.
- **The Cuban Missile Crisis** (1962): the world was close to nuclear war.
- **The Soviet Union** dissolved in 1991.
- **Norway after the war**: reconstruction under the Labour Party and Einar Gerhardsen, NATO membership from 1949, **the National Insurance Scheme** in 1967.
- **The oil age**: Ekofisk was discovered in 1969 and gave Norway enormous income. The oil fund was created in 1990.

### Example
Norway borders Russia in the north. During the Cold War Norway was therefore an important NATO country, while also pursuing a careful policy so as not to provoke the Soviet Union.

> 1949 NATO, 1961 the Wall, 1962 Cuba, 1989 the Wall falls, 1991 the Soviet Union dissolves.`,
[
 ["Når falt Berlinmuren?", { n: 1989, tol: 0, u: "" }, "9. november 1989.", "When did the Berlin Wall fall?", null, "9 November 1989."],
 ["Hvilke to supermakter sto mot hverandre i den kalde krigen?", ["USA og Sovjetunionen", "Norge og Sverige", "Kina og Japan", "Tyskland og Frankrike"], "Øst mot vest.", "Which two superpowers faced each other in the Cold War?", ["The USA and the Soviet Union", "Norway and Sweden", "China and Japan", "Germany and France"], "East against West."],
 ["Hva var Cubakrisen?", ["En krise i 1962 der verden var nær atomkrig", "En revolusjon på Cuba i 1917", "En handelskrig", "En naturkatastrofe"], "Sovjet hadde plassert atomraketter på Cuba.", "What was the Cuban Missile Crisis?", ["A crisis in 1962 that brought the world close to nuclear war", "A revolution in Cuba in 1917", "A trade war", "A natural disaster"], "The Soviet Union had placed nuclear missiles on Cuba."],
 ["Når ble Ekofisk-feltet funnet?", { n: 1969, tol: 0, u: "" }, "I 1969, starten på oljealderen i Norge.", "When was the Ekofisk field discovered?", null, "In 1969, the start of Norway's oil age."],
 ["Hvem var statsminister og ledet gjenoppbyggingen etter krigen?", ["Einar Gerhardsen", "Vidkun Quisling", "Gro Harlem Brundtland", "Christian Michelsen"], "Ofte kalt «landsfaderen».", "Who was prime minister and led post-war reconstruction?", ["Einar Gerhardsen", "Vidkun Quisling", "Gro Harlem Brundtland", "Christian Michelsen"], "Often called the \"father of the nation\"."]
],
 yearGen(EV.filter(e => e[0] >= 1945))
);
U("VGHIS", "Samer og nasjonale minoriteter", "The Sami and national minorities",
`## Hva handler det om?
Samene er Norges **urfolk**. I over hundre år førte staten en **fornorskingspolitikk** som skulle gjøre samer og kvener til «norske». I dag har samene egne rettigheter og sitt eget folkevalgte organ.

## Begreper og formler
- **Urfolk**: et folk som bodde i et område før dagens statsgrenser ble trukket.
- **Fornorskingspolitikken** (om lag 1850–1960-tallet): samisk og kvensk språk ble undertrykt i skolen, og det var krav om norsk for å få kjøpe jord.
- **Alta-saken** (1979–1981): protester mot utbygging av Altaelva ble et vendepunkt for samiske rettigheter.
- **Sametinget** ble opprettet i 1989. **Grunnloven § 108** sier at staten skal legge til rette for samisk språk, kultur og samfunnsliv.
- **Nasjonale minoriteter** i Norge: kvener/norskfinner, jøder, skogfinner, rom og romanifolk/tatere.
- **Sannhets- og forsoningskommisjonen** la fram sin rapport om fornorskingen i 2023.
- **6. februar** er samenes nasjonaldag.

### Eksempel
Mange samer som gikk på internatskole på 1900-tallet fikk ikke snakke samisk. Flere generasjoner mistet derfor språket.

> Samene er urfolk, og fornorskingen var statlig politikk.`,
`## What is it about?
The Sami are Norway's **indigenous people**. For over a hundred years the state pursued a **Norwegianisation policy** meant to make the Sami and Kven "Norwegian". Today the Sami have their own rights and their own elected body.

## Concepts and formulas
- **Indigenous people**: a people who lived in an area before today's state borders were drawn.
- **The Norwegianisation policy** (about 1850 to the 1960s): Sami and Kven languages were suppressed in school, and Norwegian was required to buy land.
- **The Alta controversy** (1979–1981): protests against damming the Alta river became a turning point for Sami rights.
- **The Sami Parliament** was established in 1989. **Constitution Article 108** says the state shall enable Sami language, culture and community life.
- **National minorities** in Norway: Kvens/Norwegian Finns, Jews, Forest Finns, Roma and Romani people/Tater.
- **The Truth and Reconciliation Commission** presented its report on Norwegianisation in 2023.
- **6 February** is the Sami National Day.

### Example
Many Sami who attended boarding school in the 1900s were not allowed to speak Sami. Several generations therefore lost the language.

> The Sami are indigenous, and Norwegianisation was state policy.`,
[
 ["Hva er et urfolk?", ["Et folk som bodde i et område før dagens statsgrenser", "Et folk som nylig har flyttet til et land", "Den største folkegruppen i et land", "Et folk uten eget språk"], "Samene er Norges urfolk.", "What is an indigenous people?", ["A people who lived in an area before today's state borders", "A people who recently moved to a country", "The largest ethnic group in a country", "A people without its own language"], "The Sami are Norway's indigenous people."],
 ["Når er samenes nasjonaldag?", ["6. februar", "17. mai", "1. mai", "24. desember"], "Til minne om det første samiske landsmøtet i 1917.", "When is the Sami National Day?", ["6 February", "17 May", "1 May", "24 December"], "In memory of the first Sami national assembly in 1917."],
 ["Hva var fornorskingspolitikken?", ["Statlig politikk for å gjøre samer og kvener «norske»", "En reform for å lære nordmenn samisk", "En handelsavtale", "En politikk for innvandring"], "Samisk og kvensk ble undertrykt i skolen.", "What was the Norwegianisation policy?", ["State policy to make the Sami and Kven \"Norwegian\"", "A reform to teach Norwegians Sami", "A trade agreement", "An immigration policy"], "Sami and Kven were suppressed in school."],
 ["Hva var Alta-saken?", ["Protester mot utbygging av Altaelva", "En rettssak om fiske", "Et valg på Sametinget", "En skolereform"], "Et vendepunkt for samiske rettigheter.", "What was the Alta controversy?", ["Protests against damming the Alta river", "A court case about fishing", "A Sami Parliament election", "A school reform"], "A turning point for Sami rights."],
 ["Hvilken gruppe er en nasjonal minoritet i Norge?", ["Kvener", "Svensker", "Samer", "Polakker"], "Samene er urfolk, ikke nasjonal minoritet.", "Which group is a national minority in Norway?", ["Kvens", "Swedes", "The Sami", "Poles"], "The Sami are indigenous, not a national minority."]
]);
})();
