// ============================================================
//  add_zdeep_jus.js – fordypning i jus (metode, statsrett, avtale/kjøp, erstatning, forvaltning, strafferett).
//  DEEP ligger i learn.js. Teksten er en innføring – lovhenvisninger bør sjekkes mot Lovdata.
// ============================================================
(() => {
// ================= JURIDISK METODE =================
DEEP("JMET", "Rettskildene",
`## Hvor finner vi retten?
Et juridisk spørsmål løses ved å finne **rettsregelen** som gjelder, og bruke den på **faktum** (det som har skjedd). Regelen står sjelden ferdig formulert ett sted. Den må utledes av **rettskildene**. Læren om hvilke kilder som er relevante, hvordan de tolkes, og hvor mye de veier, kalles **rettskildelæren** (i Norge særlig forbundet med Torstein Eckhoff).

## De viktigste rettskildene
- **Grunnloven** (1814) står øverst. Lover som strider mot den, skal ikke anvendes av domstolene (Grl. § 89).
- **Formell lov** vedtas av Stortinget. **Forskrifter** gis av regjeringen eller et departement med **hjemmel** i lov, og utfyller loven med detaljer. Alt finnes gratis på **Lovdata**.
- **Lovforarbeider** viser hva lovgiveren mente: utredninger (**NOU**), departementets **proposisjon** (Prop. L) og stortingskomiteens **innstilling**. Proposisjonen veier mest, fordi det er den Stortinget har sluttet seg til.
- **Rettspraksis**: Høyesteretts avgjørelser er bindende **prejudikater** for liknende saker. Det er de bærende begrunnelsene (**ratio decidendi**) som binder, ikke uttalelser «i forbifarten» (**obiter dictum**). Avgjørelser i plenum (alle dommerne) og storkammer (11 dommere) veier tyngst.
- **Forvaltningspraksis**: hvordan myndighetene konsekvent har praktisert en regel.
- **Sedvanerett**: langvarig, alminnelig og fast praksis som oppleves som rettslig bindende.
- **Juridisk litteratur**: fagbøker og artikler – veier lite i seg selv, men argumentene kan overbevise.
- **Reelle hensyn**: hva som gir et rimelig, praktisk og konsekvent resultat. De brukes særlig der de andre kildene ikke gir klart svar.

## Internasjonal rett
Norge er **dualistisk**: folkerett gjelder bare som norsk rett når den er gjennomført. **Menneskerettsloven** § 3 gir blant annet EMK og FNs barnekonvensjon forrang foran annen lov. **EØS-loven** § 2 gir lover som gjennomfører EØS-forpliktelser forrang ved motstrid.

## Slik løser du en juridisk oppgave
1. **Problemstilling**: hva er spørsmålet? Formuler det presist.
2. **Rettsregel**: finn bestemmelsen og tolk den med rettskildene.
3. **Subsumsjon**: sammenlign faktum med vilkårene i regelen, ett og ett.
4. **Konklusjon**: svar direkte på problemstillingen.

> Bruk alltid den nyeste lovteksten. Lover endres jevnlig, og en gammel lærebok kan være utdatert.`,
`## Where do we find the law?
A legal question is solved by finding the applicable **rule of law** and applying it to the **facts** (what happened). The rule is rarely set out in final form in one place. It must be derived from the **sources of law**. The doctrine of which sources are relevant, how they are interpreted and how much they weigh is called the **doctrine of legal sources** (in Norway especially associated with Torstein Eckhoff).

## The main sources of law
- **The Constitution** (1814) is at the top. Statutes that conflict with it shall not be applied by the courts (Constitution Article 89).
- **Statutes** are passed by the Storting. **Regulations** are issued by the government or a ministry with **authority** in a statute, and fill in the details. Everything is freely available on **Lovdata**.
- **Preparatory works** show what the legislator intended: reports (**NOU**), the ministry's **bill** (Prop. L) and the parliamentary committee's **recommendation**. The bill weighs most, because it is what the Storting endorsed.
- **Case law**: Supreme Court decisions are binding **precedents** for similar cases. It is the reasoning essential to the result (**ratio decidendi**) that binds, not remarks made in passing (**obiter dicta**). Plenary (all judges) and Grand Chamber (11 judges) decisions weigh most.
- **Administrative practice**: how the authorities have consistently applied a rule.
- **Customary law**: long-standing, general and settled practice regarded as legally binding.
- **Legal scholarship**: textbooks and articles – little weight in themselves, but their arguments can persuade.
- **Policy considerations**: what gives a reasonable, practical and consistent result. They matter most where other sources give no clear answer.

## International law
Norway is **dualist**: international law applies as Norwegian law only once it has been incorporated. Section 3 of the **Human Rights Act** gives, among others, the ECHR and the UN Convention on the Rights of the Child precedence over other statutes. Section 2 of the **EEA Act** gives statutes implementing EEA obligations precedence in case of conflict.

## How to solve a legal problem
1. **Issue**: what is the question? Formulate it precisely.
2. **Rule**: find the provision and interpret it using the sources of law.
3. **Application**: compare the facts with the conditions of the rule, one by one.
4. **Conclusion**: answer the issue directly.

> Always use the current statute. Laws change regularly, and an old textbook may be out of date.`);

DEEP("JMET", "Lovtolkning",
`## Ordlyden er utgangspunktet
Lovtolkning starter med **ordlyden** – hva teksten betyr etter en **naturlig, alminnelig språklig forståelse**. Ord kan ha en **kjerne** der det er klart at de passer («bygning» om et bolighus), og en **randsone** der det er tvil (er et telt eller en husbåt en bygning?). Mange begreper i loven er bevisst **skjønnsmessige**: «rimelig tid», «vesentlig», «særlige grunner». Da må tolkningen hente innhold fra andre kilder. Noen ord har en egen **juridisk** betydning som avviker fra dagligtale.

## Tolkningsresultater
- **Presiserende tolkning**: ordlyden er uklar, og du velger én av de mulige forståelsene.
- **Innskrenkende tolkning**: regelen anvendes på færre tilfeller enn ordlyden tilsier, fordi formålet ikke rekker så langt.
- **Utvidende tolkning**: regelen anvendes på et tilfelle like utenfor ordlyden, fordi formålet tilsier det.
- **Analogi**: en regel brukes på et tilfelle den ikke omfatter, fordi situasjonen er **vesentlig lik**. Eksempel: en regel om kjøp brukes på bytte.
- **Antitetisk tolkning** (e contrario): fordi loven nevner noe bestemt, gjelder regelen *ikke* for det som ikke er nevnt.

## Andre momenter i tolkningen
- **Formålet**: mange lover har en formålsbestemmelse i § 1. Hvilket problem skulle regelen løse?
- **Sammenhengen**: andre bestemmelser i samme lov (systemhensyn), definisjoner og overskrifter. Samme ord bør som regel ha samme betydning i hele loven.
- **Forarbeidene**: kan bekrefte, presisere eller i noen tilfeller utvide eller innskrenke ordlyden.
- **Rettspraksis**: hvordan har Høyesterett forstått bestemmelsen før?
- **Reelle hensyn**: hvilken forståelse gir et rimelig og praktikabelt resultat?

## Når ordlyden må veie tungt
På noen områder er det lite rom for å gå ut over ordlyden. Det gjelder særlig **strafferetten** og andre inngrep overfor borgerne, på grunn av **legalitetsprinsippet** (Grl. §§ 96 og 113, EMK art. 7): ingen kan straffes uten hjemmel i lov, og straffebud kan ikke utvides ved analogi til skade for tiltalte. Jo mer inngripende tiltaket er, desto klarere hjemmel kreves. Også i **skatteretten** og der loven gir rettigheter til borgerne, legger man stor vekt på ordlyden av hensyn til **forutberegnelighet**.

## Motstrid
Når to regler gir ulike svar, gjelder prinsippene om at høyere rang går foran lavere (**lex superior**), spesielle regler foran generelle (**lex specialis**) og nyere regler foran eldre (**lex posterior**). Prinsippene er tommelfingerregler som må avveies: en eldre spesiell regel kan for eksempel gå foran en nyere generell.

> Ordlyd → formål og sammenheng → forarbeider og praksis → reelle hensyn. Konkluder med hva regelen betyr i akkurat ditt tilfelle.`,
`## The wording is the starting point
Statutory interpretation starts with the **wording** – what the text means on a **natural, ordinary reading**. Words can have a **core** where they clearly apply ("building" about a house), and a **penumbra** where there is doubt (is a tent or a houseboat a building?). Many statutory terms are deliberately **open-textured**: "reasonable time", "material", "special reasons". Then interpretation must draw content from other sources. Some words have a distinct **legal** meaning that differs from everyday language.

## Results of interpretation
- **Clarifying interpretation**: the wording is unclear, and you choose one of the possible readings.
- **Restrictive interpretation**: the rule is applied to fewer cases than the wording suggests, because its purpose does not reach that far.
- **Extensive interpretation**: the rule is applied to a case just outside the wording, because its purpose suggests so.
- **Analogy**: a rule is applied to a case it does not cover, because the situation is **materially similar**. Example: a rule on sale applied to barter.
- **A contrario reasoning**: because the statute mentions something specific, the rule does *not* apply to what is not mentioned.

## Other factors in interpretation
- **Purpose**: many statutes have a purpose clause in section 1. What problem was the rule meant to solve?
- **Context**: other provisions of the same statute (systemic considerations), definitions and headings. The same word should usually mean the same throughout the statute.
- **Preparatory works**: can confirm, clarify, or in some cases extend or restrict the wording.
- **Case law**: how has the Supreme Court understood the provision before?
- **Policy considerations**: which reading gives a reasonable and workable result?

## When the wording weighs heavily
In some areas there is little room to go beyond the wording. This applies especially to **criminal law** and other interference with citizens, because of the **principle of legality** (Constitution Articles 96 and 113, ECHR Article 7): no one may be punished without a basis in law, and criminal provisions cannot be extended by analogy to the detriment of the accused. The more intrusive the measure, the clearer the legal basis required. In **tax law**, and where the statute confers rights on citizens, the wording also weighs heavily for the sake of **predictability**.

## Conflicts
When two rules give different answers, the principles are that higher rank prevails over lower (**lex superior**), specific rules over general ones (**lex specialis**) and newer rules over older ones (**lex posterior**). These are rules of thumb that must be weighed: an older specific rule may, for example, prevail over a newer general one.

> Wording → purpose and context → preparatory works and case law → policy considerations. Conclude on what the rule means in your particular case.`);

DEEP("JMET", "Domstolene og rettssystemet",
`## Tre instanser
Norge har et **ordinært domstolssystem** i tre nivåer:
- **Tingrettene** er førsteinstans i både sivile saker og straffesaker. I straffesaker dømmer vanligvis én fagdommer og to **meddommere** (lekfolk).
- **Lagmannsrettene** er ankeinstans. Det finnes seks: Borgarting, Eidsivating, Agder, Gulating, Frostating og Hålogaland. Juryordningen ble avviklet i 2018; alvorlige straffesaker behandles nå av fagdommere og meddommere sammen.
- **Høyesterett** i Oslo er øverste instans, med 20 dommere. Saker behandles normalt i **avdeling** med fem dommere, prinsipielle saker i **storkammer** (11) eller **plenum** (alle). Høyesteretts viktigste oppgave er å sikre **rettsenhet** og **rettsavklaring**, ikke å prøve alle saker på nytt.

Det er ikke fri adgang til å anke til Høyesterett: **Høyesteretts ankeutvalg** (tre dommere) siler sakene, og bare et lite mindretall slippes inn – særlig saker med betydning utenfor den konkrete saken.

## Sivile saker
Sivile saker er tvister mellom private parter, eller mellom en borger og det offentlige: arv, kontrakter, erstatning, oppsigelse. De følger **tvisteloven**. Mange saker starter i **forliksrådet**, som består av lekfolk og prøver å mekle fram en løsning (unntak gjelder blant annet når begge parter har advokat og saken gjelder større beløp). For mindre krav har tingretten en forenklet **småkravprosess** som holder kostnadene nede. Domstolene oppfordrer til **rettsmekling** og forlik. Den som taper, må som hovedregel dekke motpartens **sakskostnader**.

## Straffesaker
Straffesaker føres av staten mot en **siktet** eller **tiltalt** etter **straffeprosessloven**. **Politiet** etterforsker, og **påtalemyndigheten** (politijurister, statsadvokatene og **riksadvokaten** på toppen) avgjør om det skal tas ut tiltale. Den tiltalte har rett til **forsvarer**, og i alvorlige saker oppnevnes en på statens regning. Påtalemyndigheten har **bevisbyrden**, og enhver rimelig tvil skal komme tiltalte til gode.

## Særdomstoler og andre organer
- **Arbeidsretten**: tvister om tariffavtaler.
- **Jordskifterettene**: eiendomsgrenser og bruksordninger.
- **Konfliktrådet**: mekling mellom gjerningsperson og offer, særlig ved ungdomskriminalitet.
- **Nemnder** (Forbrukerklageutvalget, Husleietvistutvalget, trygderetten) løser mange tvister raskere og billigere enn domstolene.

## Domstolenes uavhengighet
Dommerne utnevnes av Kongen i statsråd etter innstilling fra **Innstillingsrådet**, og kan ikke avsettes uten dom. Regjeringen kan ikke instruere domstolene. Rettsmøter er som hovedregel **offentlige**, og dommer skal **begrunnes** – grunnlaget for tillit og for at avgjørelsene kan prøves.

> Tingrett → lagmannsrett → Høyesterett. Sivil sak: part mot part. Straffesak: staten mot tiltalte.`,
`## Three levels
Norway has an **ordinary court system** with three levels:
- **The district courts** are the first instance in both civil and criminal cases. In criminal cases a professional judge usually sits with two **lay judges**.
- **The courts of appeal** hear appeals. There are six: Borgarting, Eidsivating, Agder, Gulating, Frostating and Hålogaland. The jury system was abolished in 2018; serious criminal cases are now heard by professional and lay judges together.
- **The Supreme Court** in Oslo is the highest court, with 20 justices. Cases are normally heard by a **division** of five, matters of principle in a **Grand Chamber** (11) or **plenary** (all). The Supreme Court's main task is to ensure **legal uniformity** and **clarification**, not to retry every case.

There is no free right to appeal to the Supreme Court: the **Appeals Selection Committee** (three justices) filters the cases, and only a small minority are admitted – especially cases of importance beyond the case at hand.

## Civil cases
Civil cases are disputes between private parties, or between a citizen and the state: inheritance, contracts, damages, dismissal. They follow the **Dispute Act**. Many cases start in the **conciliation board**, made up of lay members who try to mediate a solution (exceptions apply, for example when both parties have lawyers and larger sums are at stake). For smaller claims, the district court has a simplified **small claims procedure** to keep costs down. The courts encourage **judicial mediation** and settlement. The losing party must as a rule cover the other side's **legal costs**.

## Criminal cases
Criminal cases are brought by the state against a **suspect** or **defendant** under the **Criminal Procedure Act**. The **police** investigate, and the **prosecuting authority** (police prosecutors, public prosecutors and the **Director of Public Prosecutions** at the top) decides whether to indict. The defendant has the right to **defence counsel**, and in serious cases one is appointed at the state's expense. The prosecution has the **burden of proof**, and any reasonable doubt benefits the defendant.

## Special courts and other bodies
- **The Labour Court**: disputes about collective agreements.
- **The land consolidation courts**: property boundaries and rights of use.
- **The Mediation Service**: mediation between offender and victim, especially in youth crime.
- **Tribunals** (the Consumer Disputes Commission, the Rent Disputes Tribunal, the National Insurance Court) resolve many disputes faster and more cheaply than the courts.

## Judicial independence
Judges are appointed by the King in Council on the recommendation of the **Judicial Appointments Board**, and cannot be removed except by a court judgment. The government cannot instruct the courts. Hearings are as a rule **public**, and judgments must give **reasons** – the basis for trust and for the decisions to be reviewed.

> District court → court of appeal → Supreme Court. Civil case: party against party. Criminal case: the state against the defendant.`);

// ================= STATSRETT =================
DEEP("JSTAT", "Grunnloven og maktfordelingen",
`## Grunnloven av 1814
Grunnloven ble vedtatt på **Eidsvoll 17. mai 1814**, etter at Danmark-Norge hadde tapt Napoleonskrigene og Norge skulle avstås til Sverige. Den bygget på opplysningstidens ideer: **folkesuverenitet** (makten kommer fra folket), **menneskerettigheter** og **maktfordeling** etter Montesquieu. Den er i dag verdens nest eldste skrevne grunnlov som fortsatt er i bruk. Grunnloven ble skrevet om til moderne språk i **2014** (både bokmål og nynorsk), og fikk samtidig et eget kapittel **E om menneskerettigheter** (§§ 92–113).

## De tre statsmaktene
- **Den lovgivende makt** – Stortinget (Grl. § 75): gir og opphever lover, vedtar skatter og statsbudsjettet, og kontrollerer regjeringen.
- **Den utøvende makt** – formelt Kongen (§ 3), i praksis **regjeringen**, som fatter vedtak i **statsråd**. Regjeringen setter lovene ut i livet, leder forvaltningen og fremmer lov- og budsjettforslag.
- **Den dømmende makt** – domstolene (§ 88), som avgjør tvister og straffesaker og er uavhengige av de to andre.

Maktene **balanserer** og **kontrollerer** hverandre. Domstolene kan prøve om lover er i strid med Grunnloven (**prøvingsrett**, grunnlovsfestet i § 89 i 2015) og om forvaltningens vedtak er lovlige.

## Parlamentarismen
**Parlamentarisme** betyr at regjeringen må ha Stortingets tillit. Den ble innført i praksis i **1884**, etter riksrettssaken mot statsrådene i regjeringen Selmer, og ble skrevet inn i Grunnloven (§ 15) i **2007**. Stortinget kan vedta **mistillit**, og da må regjeringen eller statsråden gå av. Det er **negativ parlamentarisme**: regjeringen trenger ikke aktiv støtte fra et flertall, bare ikke ha et flertall mot seg. Derfor kan Norge ha **mindretallsregjeringer**.

## Stortingets kontroll
Stortinget kontrollerer regjeringen gjennom **spørretimer** og skriftlige spørsmål, **kontroll- og konstitusjonskomiteen**, **Riksrevisjonen** (som reviderer statens pengebruk) og **Sivilombudet** (som behandler klager fra borgerne på forvaltningen). **Riksrett** – at statsråder, stortingsrepresentanter eller høyesterettsdommere stilles for en egen domstol for brudd på konstitusjonelle plikter – er i praksis ikke brukt siden 1920-tallet.

## Endring av Grunnloven
Grunnloven er vanskeligere å endre enn vanlig lov (§ 121): forslaget må fremmes i et av de tre første årene av en stortingsperiode, og det kan først vedtas av **det neste** Stortinget, etter et valg, med **to tredjedels flertall**. Velgerne får dermed mulighet til å si sin mening.

## Kongens stilling
Norge er et **konstitusjonelt monarki**. Kongen er statsoverhode, men «Kongens person er hellig» (§ 5): kongen kan ikke stilles til ansvar, og ansvaret ligger hos regjeringen, som kontrasignerer vedtakene.

> Stortinget lager lovene, regjeringen gjennomfører dem, domstolene dømmer etter dem.`,
`## The Constitution of 1814
The Constitution was adopted at **Eidsvoll on 17 May 1814**, after Denmark–Norway had lost the Napoleonic Wars and Norway was to be ceded to Sweden. It was built on Enlightenment ideas: **popular sovereignty** (power comes from the people), **human rights** and the **separation of powers** after Montesquieu. It is today the world's second oldest written constitution still in force. It was rewritten in modern language in **2014** (in both Bokmål and Nynorsk), and at the same time got a separate chapter **E on human rights** (Articles 92–113).

## The three branches
- **The legislature** – the Storting (Article 75): makes and repeals laws, levies taxes, adopts the state budget and scrutinises the government.
- **The executive** – formally the King (Article 3), in practice the **government**, which takes decisions in the **Council of State**. The government implements laws, runs the administration and proposes bills and budgets.
- **The judiciary** – the courts (Article 88), which decide disputes and criminal cases and are independent of the other two.

The branches **balance** and **check** each other. The courts can review whether statutes conflict with the Constitution (**judicial review**, written into Article 89 in 2015) and whether administrative decisions are lawful.

## Parliamentarism
**Parliamentarism** means the government must have the confidence of the Storting. It was introduced in practice in **1884**, after the impeachment of the ministers in the Selmer government, and written into the Constitution (Article 15) in **2007**. The Storting can pass a **vote of no confidence**, and the government or minister must then resign. It is **negative parliamentarism**: the government does not need active support from a majority, only not to have a majority against it. That is why Norway can have **minority governments**.

## Parliamentary scrutiny
The Storting scrutinises the government through **question time** and written questions, the **Standing Committee on Scrutiny and Constitutional Affairs**, the **Office of the Auditor General** (which audits state spending) and the **Parliamentary Ombud** (which handles citizens' complaints about the administration). **Impeachment** – trying ministers, MPs or Supreme Court justices in a special court for breaching constitutional duties – has in practice not been used since the 1920s.

## Amending the Constitution
The Constitution is harder to change than ordinary law (Article 121): a proposal must be submitted in one of the first three years of a parliamentary term, and can only be adopted by **the next** Storting, after an election, with a **two-thirds majority**. Voters thus get a chance to have their say.

## The King's position
Norway is a **constitutional monarchy**. The King is head of state, but "the King's person is sacred" (Article 5): the King cannot be held responsible, and responsibility lies with the government, which countersigns decisions.

> The Storting makes the laws, the government carries them out, the courts judge by them.`);

DEEP("JSTAT", "Menneskerettigheter og EØS",
`## Menneskerettighetene
Etter andre verdenskrig ble det bred enighet om at enkeltmennesket trenger vern også mot sin egen stat. FN vedtok **Verdenserklæringen om menneskerettighetene** i **1948**. Den er ikke juridisk bindende, men ble grunnlaget for bindende konvensjoner:
- **Den europeiske menneskerettskonvensjonen** (EMK, 1950), vedtatt av Europarådet. Den håndheves av **Den europeiske menneskerettsdomstolen** (EMD) i Strasbourg, der enkeltpersoner kan klage på staten når de har brukt opp de nasjonale rettsmidlene.
- FNs konvensjoner om **sivile og politiske rettigheter** (SP) og om **økonomiske, sosiale og kulturelle rettigheter** (ØSK), begge fra 1966.
- **Barnekonvensjonen** (1989), som blant annet slår fast at **barnets beste** skal være et grunnleggende hensyn.

## I norsk rett
Gjennom **menneskerettsloven** (1999) gjelder EMK, SP, ØSK, barnekonvensjonen og kvinnekonvensjonen som norsk lov, og ved motstrid går de **foran** annen lovgivning (§ 3). I 2014 fikk **Grunnloven** et eget menneskerettighetskapittel, med blant annet retten til liv (§ 93), forbud mot vilkårlig frihetsberøvelse (§ 94), rettferdig rettergang (§ 95), ingen straff uten lov (§ 96), ytringsfrihet (§ 100), retten til privatliv (§ 102), barns rettigheter (§ 104) og retten til et sunt miljø (§ 112).

## Begrensninger av rettighetene
De fleste rettigheter er ikke **absolutte**. Unntaket er blant annet forbudet mot **tortur** (EMK art. 3). Retten til privatliv, ytringsfrihet og forsamlingsfrihet kan begrenses, men bare hvis inngrepet
1. har **hjemmel i lov**
2. forfølger et **legitimt formål** (for eksempel nasjonal sikkerhet, andres rettigheter, folkehelse)
3. er **nødvendig i et demokratisk samfunn** – altså **forholdsmessig**: inngrepet må ikke være strengere enn formålet krever.

## EØS-avtalen
**EØS-avtalen** trådte i kraft i **1994**, etter at Norge sa nei til EU-medlemskap. Den gir Norge, Island og Liechtenstein adgang til EUs **indre marked** med de **fire friheter**: fri flyt av **varer**, **tjenester**, **kapital** og **personer**. Til gjengjeld må Norge innføre EUs regler på disse områdene – et svært stort antall rettsakter siden starten.
- **Forordninger** gjennomføres ordrett i norsk rett, **direktiver** gir et mål som Norge selv velger formen for.
- **ESA** (EFTAs overvåkingsorgan) passer på at reglene følges, og **EFTA-domstolen** tolker avtalen.
- **Homogenitetsprinsippet**: reglene skal tolkes likt i hele EØS, i tråd med EU-domstolens praksis.
- Landbruk, fiskeri, utenrikspolitikk, tollunion og valuta er i hovedsak **utenfor** avtalen.

Kritikere peker på et **demokratisk underskudd**: Norge må følge regler vi ikke er med på å vedta. Tilhengere viser til markedsadgangen og den økonomiske betydningen.

> EMK beskytter individet mot staten. EØS sikrer markedsadgang mot at vi følger EUs regler.`,
`## Human rights
After the Second World War there was broad agreement that individuals need protection even against their own state. The UN adopted the **Universal Declaration of Human Rights** in **1948**. It is not legally binding, but it became the basis for binding conventions:
- **The European Convention on Human Rights** (ECHR, 1950), adopted by the Council of Europe. It is enforced by the **European Court of Human Rights** (ECtHR) in Strasbourg, where individuals can bring complaints against the state once they have exhausted domestic remedies.
- The UN covenants on **civil and political rights** (ICCPR) and on **economic, social and cultural rights** (ICESCR), both from 1966.
- **The Convention on the Rights of the Child** (1989), which states among other things that **the best interests of the child** shall be a primary consideration.

## In Norwegian law
Through the **Human Rights Act** (1999) the ECHR, ICCPR, ICESCR, the Children's Convention and the Women's Convention apply as Norwegian law, and in case of conflict they **prevail** over other legislation (section 3). In 2014 the **Constitution** got its own human rights chapter, including the right to life (Article 93), the ban on arbitrary deprivation of liberty (94), the right to a fair trial (95), no punishment without law (96), freedom of expression (100), the right to privacy (102), children's rights (104) and the right to a healthy environment (112).

## Limiting rights
Most rights are not **absolute**. The exceptions include the ban on **torture** (ECHR Article 3). The right to privacy, freedom of expression and freedom of assembly can be limited, but only if the interference
1. has a **basis in law**
2. pursues a **legitimate aim** (for example national security, the rights of others, public health)
3. is **necessary in a democratic society** – that is, **proportionate**: the interference must not be stricter than the aim requires.

## The EEA Agreement
The **EEA Agreement** entered into force in **1994**, after Norway voted no to EU membership. It gives Norway, Iceland and Liechtenstein access to the EU's **internal market** with the **four freedoms**: free movement of **goods**, **services**, **capital** and **persons**. In return Norway must adopt EU rules in these areas – a very large number of legal acts since the start.
- **Regulations** are implemented word for word in Norwegian law; **directives** set a goal and Norway chooses the form.
- **ESA** (the EFTA Surveillance Authority) ensures the rules are followed, and the **EFTA Court** interprets the agreement.
- **The homogeneity principle**: the rules shall be interpreted the same way throughout the EEA, in line with EU Court case law.
- Agriculture, fisheries, foreign policy, the customs union and the currency are mainly **outside** the agreement.

Critics point to a **democratic deficit**: Norway must follow rules it has no vote on. Supporters point to market access and its economic importance.

> The ECHR protects the individual against the state. The EEA gives market access in return for following EU rules.`);

// ================= AVTALE OG KJØP =================
DEEP("JAVT", "Avtaleinngåelse",
`## Avtalefrihet og avtaleloven
Utgangspunktet i norsk rett er **avtalefrihet**: du kan selv velge om du vil inngå en avtale, med hvem og på hvilke vilkår. Avtaler er **bindende** – «pacta sunt servanda». Hovedreglene om hvordan avtaler blir til, står i **avtaleloven** fra **1918**. De fleste avtaler er **formfrie**: en muntlig avtale er like bindende som en skriftlig, men vanskeligere å bevise. Noen avtaler har formkrav i særlov, for eksempel testament, og for fast eiendom er skriftlighet i praksis nødvendig for tinglysing.

## Tilbud og aksept
Den klassiske modellen (avtaleloven kapittel 1):
- Et **tilbud** binder tilbyderen når mottakeren har fått kjennskap til det (§ 1).
- Tilbudet kan **tilbakekalles** hvis tilbakekallet kommer fram til mottakeren **før eller samtidig** med tilbudet (§ 7).
- Mottakeren må **akseptere** innen **akseptfristen**: fristen tilbyderen har satt, eller ellers **rimelig tid** (§§ 2 og 3).
- En **forsinket aksept** er et nytt tilbud (§ 4).
- En aksept som **ikke stemmer** med tilbudet (for eksempel lavere pris), er et **avslag kombinert med et nytt tilbud** (§ 6).
- Avtalen er inngått når en korrekt aksept er kommet fram til tilbyderen i tide.

**Reklame, prislister og vareutstillinger** er som hovedregel ikke tilbud, men **oppfordringer** til å komme med tilbud. Det er kunden ved kassen som gir tilbudet, og butikken som aksepterer.

## Andre måter å binde seg på
Mange avtaler følger ikke tilbud–aksept-modellen. **Avtaler ved konkludent atferd**: å gå på bussen, legge varer på båndet eller betale i en automat. **Standardavtaler** (kjøpsvilkår, programvarelisenser) binder hvis kunden fikk rimelig mulighet til å gjøre seg kjent med dem, men uvanlige og byrdefulle vilkår må fremheves særskilt. **Passivitet** binder som hovedregel ikke – du har ikke inngått avtale bare fordi du ikke svarte på en ubestilt vare.

## Fullmakt
En **fullmektig** kan inngå avtaler på vegne av en annen (**fullmaktsgiveren**), som da blir bundet (avtaleloven kapittel 2). Fullmakten kan gis direkte til tredjemann, til fullmektigen alene, eller følge av en **stilling** (en butikkansatt har stillingsfullmakt til å selge varene i butikken).

## Forbrukervern
- **Angrerettloven**: ved kjøp på nett, telefon eller utenfor fast utsalgssted har forbrukeren **14 dagers angrerett**, regnet fra varen er mottatt.
- **Mindreårige** under 18 år kan som hovedregel ikke inngå bindende avtaler uten vergens samtykke, med visse unntak for egne penger og vanlige småkjøp.
- **Markedsføringsloven** setter grenser for villedende reklame og aggressiv salgspraksis.

> Tilbud + aksept i tide og i samsvar med tilbudet = bindende avtale.`,
`## Freedom of contract and the Contracts Act
The starting point in Norwegian law is **freedom of contract**: you choose whether to enter into an agreement, with whom and on what terms. Agreements are **binding** – "pacta sunt servanda". The main rules on how contracts are formed are in the **Contracts Act** of **1918**. Most agreements are **informal**: an oral agreement is as binding as a written one, but harder to prove. Some agreements have formal requirements in special legislation, such as wills, and for real property a written document is in practice needed for registration.

## Offer and acceptance
The classic model (Contracts Act chapter 1):
- An **offer** binds the offeror once the recipient has learned of it (section 1).
- The offer can be **revoked** if the revocation reaches the recipient **before or at the same time** as the offer (section 7).
- The recipient must **accept** within the **acceptance period**: the deadline set by the offeror, or otherwise a **reasonable time** (sections 2 and 3).
- A **late acceptance** is a new offer (section 4).
- An acceptance that **does not match** the offer (for example a lower price) is a **rejection combined with a new offer** (section 6).
- The contract is formed when a correct acceptance reaches the offeror in time.

**Advertising, price lists and displays of goods** are as a rule not offers, but **invitations** to make an offer. It is the customer at the till who makes the offer, and the shop that accepts.

## Other ways to become bound
Many contracts do not follow the offer–acceptance model. **Contracts by conduct**: boarding a bus, putting goods on the belt or paying at a machine. **Standard terms** (terms of sale, software licences) bind if the customer had a reasonable opportunity to learn of them, but unusual and onerous terms must be specially highlighted. **Silence** does not as a rule bind – you have not made a contract merely by not replying to unsolicited goods.

## Agency
An **agent** can enter into agreements on behalf of another (the **principal**), who is then bound (Contracts Act chapter 2). The authority can be given directly to the third party, to the agent alone, or follow from a **position** (a shop assistant has positional authority to sell the goods in the shop).

## Consumer protection
- **The Cancellation Act**: for purchases online, by phone or away from business premises, the consumer has a **14-day right of withdrawal**, counted from receipt of the goods.
- **Minors** under 18 cannot as a rule enter into binding agreements without their guardian's consent, with certain exceptions for their own money and ordinary small purchases.
- **The Marketing Control Act** limits misleading advertising and aggressive sales practices.

> Offer + acceptance in time and matching the offer = binding contract.`);

DEEP("JAVT", "Ugyldighet",
`## Når en avtale likevel ikke binder
Utgangspunktet er at avtaler skal holdes. Men noen ganger er det urimelig eller uforsvarlig å holde en part til avtalen, og da kan den være **ugyldig** – helt eller delvis. Ugyldighetsreglene står særlig i **avtaleloven kapittel 3**. Den som påberoper seg ugyldighet, må som regel **reagere raskt**, ellers kan retten til å påberope seg ugyldigheten tapes ved **passivitet**.

## Sterke og svake ugyldighetsgrunner
- **Sterke** ugyldighetsgrunner gjør avtalen ugyldig selv om medkontrahenten var i **god tro** (ikke visste og ikke burde visst). Eksempler: **falsk** underskrift, **rå tvang** med vold eller trussel om vold (§ 28 første ledd) og **manglende rettslig handleevne** (mindreårige, personer under vergemål).
- **Svake** ugyldighetsgrunner gjør avtalen ugyldig bare hvis medkontrahenten var i **ond tro** – visste eller burde vite om forholdet. Det gjelder de fleste andre grunnene.

## De viktigste grunnene
- **Tvang** (§§ 28–29): avtalen er framkalt ved vold, trusler eller annen utilbørlig press.
- **Svik** (§ 30): medkontrahenten har **bevisst** gitt uriktige opplysninger eller fortiet noe for å få deg til å inngå avtalen. Svik er aldri akseptert.
- **Utnyttelse** (§ 31): noen har utnyttet en annens nød, lettsindighet, uforstand eller avhengighetsforhold til å skaffe seg en ytelse som står i **åpenbart misforhold** til motytelsen (ågerreglen).
- **Feilskrift** (§ 32): erklæringen fikk et annet innhold enn ment, for eksempel 1000 kr i stedet for 10 000 kr. Avtalen binder ikke hvis mottakeren forsto eller burde forstå feilen.
- **Tro og love** (§ 33): det ville stride mot «redelighet og god tro» å gjøre avtalen gjeldende, fordi medkontrahenten kjente til forhold som gjør det urimelig. Typisk: selgeren vet at kjøperen har misforstått noe vesentlig, men sier ingenting.

## Generalklausulen – § 36
**Avtaleloven § 36** sier at en avtale kan **settes til side helt eller delvis** eller **endres** hvis det ville være **urimelig** eller i strid med **god forretningsskikk** å gjøre den gjeldende. Retten skal se på avtalens innhold, partenes stilling, forholdene da avtalen ble inngått og senere inntrufne forhold. Bestemmelsen brukes med varsomhet mellom næringsdrivende, men gir særlig vern for **forbrukere** og den **svakere parten**. Ofte er resultatet ikke full ugyldighet, men **lemping** – for eksempel at et urimelig vilkår faller bort.

## Bristende forutsetninger
Etter den ulovfestede **forutsetningslæren** kan en part bli løst fra avtalen hvis en forutsetning han eller hun bygde på, svikter. Forutsetningen må ha vært **vesentlig** og **synbar** for motparten, og det må være rimelig at risikoen legges på motparten. Eksempel: et hotellrom bestilt for en konsert som blir avlyst – her vil svaret ofte være at kjøperen bærer risikoen, fordi det er kjøperens formål.

## Virkningen av ugyldighet
Er avtalen ugyldig, skal partene stilles som om den ikke var inngått: ytelsene skal **leveres tilbake** (restitusjon). I tillegg kan det være grunnlag for **erstatning**.

> Sterk grunn: ugyldig uansett. Svak grunn: ugyldig bare hvis motparten var i ond tro. § 36: sikkerhetsnettet mot urimelige avtaler.`,
`## When a contract does not bind after all
The starting point is that contracts must be kept. But sometimes it is unreasonable or indefensible to hold a party to the contract, and it may then be **invalid** – wholly or partly. The rules on invalidity are mainly in **chapter 3 of the Contracts Act**. A party who claims invalidity must usually **react quickly**, or the right may be lost through **passivity**.

## Strong and weak grounds of invalidity
- **Strong** grounds make the contract invalid even if the other party was in **good faith** (did not know and should not have known). Examples: **forged** signatures, **duress** by violence or threat of violence (section 28(1)) and **lack of legal capacity** (minors, persons under guardianship).
- **Weak** grounds make the contract invalid only if the other party was in **bad faith** – knew or should have known of the circumstances. This applies to most other grounds.

## The main grounds
- **Duress** (sections 28–29): the contract was obtained by violence, threats or other improper pressure.
- **Fraud** (section 30): the other party **deliberately** gave false information or concealed something to get you to enter into the contract. Fraud is never accepted.
- **Exploitation** (section 31): someone exploited another's distress, recklessness, ignorance or dependence to obtain a benefit **manifestly disproportionate** to what they gave in return (usury).
- **Clerical error** (section 32): the declaration had a different content than intended, for example 1000 NOK instead of 10,000 NOK. The contract does not bind if the recipient understood or should have understood the error.
- **Good faith** (section 33): it would be contrary to "honesty and good faith" to enforce the contract, because the other party knew of circumstances that make it unreasonable. Typically: the seller knows the buyer has misunderstood something essential but says nothing.

## The general clause – section 36
**Section 36 of the Contracts Act** provides that a contract may be **set aside wholly or partly** or **amended** if enforcing it would be **unreasonable** or contrary to **good business practice**. The court considers the contract's content, the parties' positions, the circumstances at the time of contracting and later events. The provision is used cautiously between businesses, but gives particular protection to **consumers** and the **weaker party**. Often the result is not full invalidity but **adjustment** – for example that an unreasonable term falls away.

## Failed assumptions
Under the unwritten **doctrine of failed assumptions**, a party may be released from a contract if an assumption they relied on fails. The assumption must have been **essential** and **apparent** to the other party, and it must be reasonable to place the risk on the other party. Example: a hotel room booked for a concert that is cancelled – here the answer will often be that the buyer bears the risk, because it is the buyer's purpose.

## The effect of invalidity
If the contract is invalid, the parties are to be put back as if it had not been made: performances must be **returned** (restitution). There may also be grounds for **damages**.

> Strong ground: invalid regardless. Weak ground: invalid only if the other party was in bad faith. Section 36: the safety net against unreasonable contracts.`);

DEEP("JAVT", "Kjøp: mangel og reklamasjon",
`## Hvilken lov gjelder?
- **Forbrukerkjøpsloven** gjelder når en **næringsdrivende** selger til en **forbruker** (en fysisk person som ikke handler i næring). Den er **ufravikelig**: avtalevilkår som gir forbrukeren dårligere rettigheter, er ugyldige.
- **Kjøpsloven** gjelder ellers: kjøp mellom næringsdrivende og kjøp mellom privatpersoner (for eksempel på Finn.no). Den er i stor grad **fravikelig** – partene kan avtale andre regler.
- Andre lover dekker egne områder: **avhendingslova** (bolig), **håndverkertjenesteloven** (reparasjoner), **bustadoppføringslova** (nybygg).

## Hva er en mangel?
Varen har en **mangel** hvis den ikke er slik kjøperen har krav på:
- den **avviker fra avtalen** i art, mengde, kvalitet eller andre egenskaper
- den ikke passer til **vanlige formål** for slike varer, eller et **særlig formål** selgeren kjente til
- den ikke svarer til **opplysninger** selgeren (eller produsenten, i reklame) har gitt
- selgeren har **unnlatt å opplyse** om forhold kjøperen hadde grunn til å regne med å få vite om
- den ikke har den **holdbarheten** kjøperen med rimelighet kan forvente

Selges varen **«som den er»**, er det likevel en mangel hvis varen er i vesentlig dårligere stand enn kjøperen hadde grunn til å regne med. Det **avgjørende tidspunktet** er når **risikoen går over** – normalt ved levering. Men en feil som viser seg senere, kan godt ha eksistert ved levering (for eksempel en produksjonsfeil). For forbrukere er det en **presumpsjon** for at feil som viser seg en tid etter levering, fantes ved leveringen.

## Reklamasjon
Kjøperen må gi selgeren beskjed om mangelen – **reklamere** – innen **rimelig tid** etter at den ble eller burde vært oppdaget. Forbrukere har alltid minst **to måneder**. Den **absolutte fristen** er **to år** fra kjøperen overtok varen, og **fem år** for varer som er ment å vare **vesentlig lenger** – som mobiltelefoner, PC-er, hvitevarer og møbler. Reklamasjonsretten gjelder uavhengig av, og ofte lenger enn, en **garanti** fra produsenten.

## Kjøperens krav (mangelsbeføyelser)
- **Retting** (reparasjon) eller **omlevering** (ny vare), som hovedregel uten kostnad for kjøperen. Selgeren har som utgangspunkt rett til å forsøke å utbedre.
- **Prisavslag**: prisen settes ned tilsvarende verdiforringelsen.
- **Heving**: kjøpet går tilbake, og kjøperen får pengene tilbake. Krever at mangelen er **vesentlig** (kjøpsloven), eller for forbrukere at den **ikke er uvesentlig**.
- **Erstatning** for økonomisk tap mangelen har påført kjøperen.
- **Tilbakeholdsrett**: kjøperen kan holde tilbake så mye av betalingen som trengs for å sikre kravet.

## Når selger og kjøper er uenige
Forbrukere kan få gratis hjelp av **Forbrukerrådet**, som mekler. Fører det ikke fram, kan saken bringes inn for **Forbrukerklageutvalget**, hvis vedtak har virkning som en dom hvis det ikke bringes inn for tingretten.

> Reklamer skriftlig og raskt, ta vare på kvitteringen, og husk: fem år på ting som skal vare lenge.`,
`## Which statute applies?
- **The Consumer Purchases Act** applies when a **business** sells to a **consumer** (a natural person not acting in the course of business). It is **mandatory**: terms that give the consumer weaker rights are invalid.
- **The Sale of Goods Act** applies otherwise: sales between businesses and between private individuals (for example on Finn.no). It is largely **non-mandatory** – the parties can agree other rules.
- Other statutes cover their own areas: the **Alienation Act** (homes), the **Craftsman Services Act** (repairs), the **Housing Construction Act** (new builds).

## What is a defect?
The goods are **defective** if they are not what the buyer is entitled to:
- they **deviate from the contract** in type, quantity, quality or other features
- they are not fit for the **ordinary purposes** of such goods, or a **particular purpose** the seller knew of
- they do not match **information** given by the seller (or the producer, in advertising)
- the seller **failed to disclose** matters the buyer had reason to expect to be told
- they lack the **durability** the buyer can reasonably expect

If the goods are sold **"as is"**, there is still a defect if they are in significantly worse condition than the buyer had reason to expect. The **decisive time** is when the **risk passes** – normally on delivery. But a fault that appears later may well have existed on delivery (a manufacturing fault, for example). For consumers there is a **presumption** that faults appearing some time after delivery existed at delivery.

## Giving notice
The buyer must notify the seller of the defect – **give notice** – within a **reasonable time** after it was or should have been discovered. Consumers always have at least **two months**. The **absolute deadline** is **two years** from when the buyer took over the goods, and **five years** for goods meant to last **considerably longer** – such as mobile phones, PCs, white goods and furniture. This right applies independently of, and often longer than, any manufacturer's **warranty**.

## The buyer's remedies
- **Repair** or **replacement**, as a rule at no cost to the buyer. The seller is in principle entitled to try to remedy the defect.
- **Price reduction**: the price is cut to reflect the loss of value.
- **Termination**: the sale is reversed and the buyer gets the money back. Requires the defect to be **material** (Sale of Goods Act), or for consumers **not insignificant**.
- **Damages** for financial loss caused by the defect.
- **Withholding**: the buyer may withhold as much of the payment as needed to secure the claim.

## When seller and buyer disagree
Consumers can get free help from the **Consumer Council**, which mediates. If that fails, the case can be brought before the **Consumer Disputes Commission**, whose decision has the effect of a judgment unless it is taken to the district court.

> Give notice in writing and promptly, keep the receipt, and remember: five years for things meant to last.`);

// ================= ERSTATNINGSRETT =================
DEEP("JERS", "Vilkårene for erstatning",
`## Hva erstatningsretten skal oppnå
Erstatningsretten avgjør når den som har lidt et tap, kan kreve at **noen andre** dekker det. Hovedformålet er **gjenoppretting**: skadelidte skal stilles økonomisk som om skaden ikke hadde skjedd. I tillegg har reglene en **preventiv** virkning: når man vet at man må betale, er man mer forsiktig. Utgangspunktet er likevel at **hver bærer sin egen skade** – det trengs et rettslig grunnlag for å flytte tapet over på en annen. Viktige regler står i **skadeserstatningsloven** (1969), men mye er **ulovfestet** og utviklet i rettspraksis.

## De tre grunnvilkårene
Alle tre må være oppfylt:
1. **Ansvarsgrunnlag** – en grunn til at skadevolderen skal bære tapet.
2. **Økonomisk tap** – en skade som kan måles i penger.
3. **Årsakssammenheng** – handlingen må ha forårsaket tapet, og tapet må være en påregnelig følge.

## 1. Ansvarsgrunnlaget
Det viktigste ansvarsgrunnlaget er **culpa** – skyld. Skadevolderen er ansvarlig hvis hun eller han har handlet **uaktsomt** (eller forsettlig). Målestokken er hva en **fornuftig og forsiktig person** ville gjort i samme situasjon. Momenter i vurderingen:
- hvor **sannsynlig** det var at skade ville skje, og hvor **stor** skaden kunne bli
- om det fantes **rimelige alternativer** og hvor mye det ville kostet å unngå risikoen
- **skrevne og uskrevne normer**: lover, forskrifter, sikkerhetsregler, bransjenormer
- skadevolderens **forutsetninger**: en profesjonell (lege, elektriker) må oppfylle en høyere standard
- **barn** bedømmes etter alder og modenhet

De andre ansvarsgrunnlagene – **arbeidsgiveransvar** og **objektivt ansvar** – gjennomgås i neste enhet.

## 2. Økonomisk tap
Erstatning gis som hovedregel bare for **økonomisk tap**, som skal dokumenteres:
- **Tingskade**: reparasjonskostnad, eller verdien hvis tingen er ødelagt.
- **Personskade** (skl. § 3-1): lidt og fremtidig **inntektstap**, **merutgifter** (behandling, transport, hjelp) og tap i evne til å utføre arbeid i hjemmet.
- **Forsørgertap** når en forsørger dør.

Det finnes også ikke-økonomiske poster: **menerstatning** (§ 3-2) for varig og betydelig medisinsk invaliditet, og **oppreisning** (§ 3-5) for krenkelser ved forsettlige eller grovt uaktsomme handlinger, for eksempel vold.

## 3. Årsakssammenheng og adekvans
- **Faktisk årsakssammenheng**: etter **betingelseslæren** må handlingen ha vært en **nødvendig betingelse** for skaden – uten handlingen ville skaden ikke ha skjedd. Ved flere samvirkende årsaker krever Høyesterett at handlingen har vært en **vesentlig** medvirkende årsak.
- **Adekvans** (påregnelighet): tapet må ikke være for **fjernt, avledet eller upåregnelig**. Den som bulker en bil, er ikke ansvarlig for at eieren mister en jobbmulighet ved å komme for sent.

## Medvirkning og lemping
Har skadelidte selv vært uaktsom, kan erstatningen **settes ned** eller falle bort (**medvirkning**, skl. § 5-1) – for eksempel en syklist uten lys. Etter § 5-2 kan erstatningen også **lempes** hvis den ville virke urimelig tung for skadevolderen, særlig når skaden var dekket av forsikring.

> Skyld (eller annet grunnlag) + tap i kroner + årsak = erstatning. Mangler ett ledd, blir det ingen erstatning.`,
`## What the law of torts aims for
Tort law decides when someone who has suffered a loss can demand that **someone else** covers it. The main purpose is **restoration**: the injured party should be placed financially as if the harm had not occurred. The rules also have a **preventive** effect: knowing you must pay makes you more careful. The starting point is nevertheless that **everyone bears their own loss** – a legal basis is needed to shift it to someone else. Key rules are in the **Damages Act** (1969), but much is **unwritten** and developed in case law.

## The three basic conditions
All three must be met:
1. **Basis of liability** – a reason why the tortfeasor should bear the loss.
2. **Financial loss** – harm measurable in money.
3. **Causation** – the act must have caused the loss, and the loss must be a foreseeable consequence.

## 1. Basis of liability
The main basis of liability is **culpa** – fault. The tortfeasor is liable if they acted **negligently** (or intentionally). The standard is what a **reasonable and careful person** would have done in the same situation. Factors in the assessment:
- how **likely** harm was, and how **serious** it could be
- whether there were **reasonable alternatives** and what it would have cost to avoid the risk
- **written and unwritten norms**: statutes, regulations, safety rules, industry standards
- the tortfeasor's **qualifications**: a professional (doctor, electrician) must meet a higher standard
- **children** are judged by their age and maturity

The other bases of liability – **employer liability** and **strict liability** – are covered in the next unit.

## 2. Financial loss
Damages are as a rule awarded only for **financial loss**, which must be documented:
- **Property damage**: the cost of repair, or the value if the item is destroyed.
- **Personal injury** (Damages Act section 3-1): past and future **loss of income**, **additional expenses** (treatment, transport, help) and loss of ability to do housework.
- **Loss of support** when a provider dies.

There are also non-financial items: **compensation for permanent injury** (section 3-2) for lasting and significant medical disability, and **compensation for non-pecuniary damage** (section 3-5) for violations by intentional or grossly negligent acts, such as violence.

## 3. Causation and foreseeability
- **Factual causation**: under the **but-for test** the act must have been a **necessary condition** for the harm – without it, the harm would not have occurred. With several contributing causes, the Supreme Court requires the act to have been a **substantial** contributing cause.
- **Foreseeability** (remoteness): the loss must not be too **remote, indirect or unforeseeable**. Someone who dents a car is not liable for the owner missing a job opportunity by arriving late.

## Contributory fault and reduction
If the injured party was negligent themselves, damages may be **reduced** or lost (**contributory fault**, section 5-1) – for example a cyclist without lights. Under section 5-2 damages may also be **reduced** if they would be unreasonably burdensome for the tortfeasor, especially when the loss was covered by insurance.

> Fault (or another basis) + loss in kroner + causation = damages. If one link is missing, there are no damages.`);

DEEP("JERS", "Arbeidsgiveransvar, objektivt ansvar og foreldelse",
`## Arbeidsgiveransvaret
Etter **skadeserstatningsloven § 2-1** er arbeidsgiveren ansvarlig for skade som en **arbeidstaker** volder **forsettlig eller uaktsomt** under utføringen av arbeidet. Det er et **objektivt** ansvar for arbeidsgiveren – arbeidsgiveren har ikke selv gjort noe galt – men det forutsetter at arbeidstakeren har handlet **culpøst**. Vilkårene:
- skadevolderen er **arbeidstaker** (også oppdragstakere og frivillige kan omfattes; offentlige myndigheter er også arbeidsgivere)
- skaden er voldt **under utføringen av arbeidet**. Ansvaret dekker ikke det som går **utover** hva som er rimelig å regne med i virksomheten – for eksempel at en ansatt stjeler fra en kunde i sin fritid.
- det er tatt hensyn til om de krav skadelidte med rimelighet kan stille til virksomheten, er tilsidesatt. Dette åpner for **anonyme og kumulative feil**: arbeidsgiveren kan bli ansvarlig selv om man ikke kan peke på hvilken ansatt som gjorde feil, eller når flere små feil til sammen gir en uforsvarlig tjeneste. Dette er særlig viktig i **helsevesenet**.

Begrunnelsen er at arbeidsgiveren tjener på virksomheten, kan fordele risikoen gjennom **forsikring** og priser, og har bedre råd enn den ansatte. Arbeidstakeren selv er bare ansvarlig overfor skadelidte i den grad det er rimelig (§ 2-3).

## Objektivt ansvar
**Objektivt ansvar** betyr ansvar **uten skyld**. Det finnes i mange særlover:
- **Bilansvarsloven**: motorvogner er ansvarlige for skade de gjør, og alle motorvogner må ha **trafikkforsikring**. En fotgjenger som blir påkjørt, får erstatning fra bilens forsikringsselskap uansett skyld.
- **Produktansvarsloven**: produsenten er ansvarlig for skade som en **sikkerhetsmangel** ved produktet gjør på personer eller andre ting.
- **Hundeloven**: hundeholderen er objektivt ansvarlig for skade hunden volder.
- **Forurensningsloven**, **atomenergiloven** og **pasientskadeloven** (pasientskader dekkes av **Norsk pasientskadeerstatning**).

I tillegg finnes et **ulovfestet objektivt ansvar** for virksomhet som skaper en **stadig, typisk og ekstraordinær risiko** – for eksempel en vannledning som sprekker, eller sprengningsarbeid. Ansvaret plasseres hos den som har kontroll over risikoen og nærmest kan bære den.

## Foreldelse
Et erstatningskrav varer ikke evig. Etter **foreldelsesloven § 9** foreldes det **tre år** etter at skadelidte fikk eller burde skaffet seg nødvendig kunnskap om **skaden** og **den ansvarlige**. Uansett kunnskap foreldes kravet senest **20 år** etter den skadegjørende handlingen (med unntak blant annet for personskade på barn og ved visse alvorlige forhold). Foreldelse **avbrytes** ved at skadevolderen erkjenner kravet, eller ved at skadelidte går til **søksmål** eller annen rettslig skritt. Den generelle foreldelsesfristen for andre krav, som et ubetalt lån, er tre år fra kravet forfalt (§ 2).

## Forsikring og regress
I praksis dekkes de fleste skader av **forsikring**. Har forsikringsselskapet betalt til skadelidte, kan det i noen tilfeller kreve beløpet tilbake fra skadevolderen (**regress**), men regressadgangen er begrenset – særlig overfor privatpersoner som bare har vært simpelt uaktsomme.

> Arbeidsgiver svarer for de ansattes feil. Objektivt ansvar: ingen skyld nødvendig. Tre år fra du vet – senest 20.`,
`## Employer liability
Under **section 2-1 of the Damages Act** an employer is liable for harm that an **employee** causes **intentionally or negligently** in the course of the work. It is **strict** liability for the employer – the employer has done nothing wrong itself – but it requires the employee to have acted **with fault**. The conditions:
- the tortfeasor is an **employee** (contractors and volunteers may be covered; public authorities are employers too)
- the harm was caused **in the course of the work**. Liability does not cover acts **beyond** what one could reasonably expect in the business – for example an employee stealing from a customer in their free time.
- account is taken of whether the requirements the injured party may reasonably place on the business have been breached. This opens for **anonymous and cumulative errors**: the employer may be liable even if no single employee can be identified as at fault, or when several minor errors together produce an unacceptable service. This is particularly important in **health care**.

The rationale is that the employer profits from the business, can spread the risk through **insurance** and prices, and has deeper pockets than the employee. The employee is personally liable to the injured party only to the extent that is reasonable (section 2-3).

## Strict liability
**Strict liability** means liability **without fault**. It is found in many special statutes:
- **The Motor Vehicle Liability Act**: motor vehicles are liable for harm they cause, and all motor vehicles must carry **compulsory insurance**. A pedestrian who is hit gets compensation from the car's insurer regardless of fault.
- **The Product Liability Act**: the producer is liable for harm caused to persons or other property by a **safety defect** in the product.
- **The Dog Act**: the dog keeper is strictly liable for harm the dog causes.
- **The Pollution Control Act**, the **Atomic Energy Act** and the **Patient Injury Act** (patient injuries are covered by the **Norwegian System of Patient Injury Compensation**).

There is also **unwritten strict liability** for activities creating a **continuous, typical and extraordinary risk** – for example a burst water main or blasting work. Liability is placed on the party who controls the risk and is best placed to bear it.

## Limitation
A claim for damages does not last for ever. Under **section 9 of the Limitation Act** it becomes time-barred **three years** after the injured party obtained or should have obtained the necessary knowledge of the **damage** and **the person responsible**. Regardless of knowledge, the claim is barred at the latest **20 years** after the harmful act (with exceptions, among others for personal injury to children and certain serious matters). Limitation is **interrupted** when the tortfeasor acknowledges the claim, or when the injured party **sues** or takes other legal steps. The general limitation period for other claims, such as an unpaid loan, is three years from the due date (section 2).

## Insurance and recourse
In practice most losses are covered by **insurance**. Once an insurer has paid the injured party, it can in some cases recover the amount from the tortfeasor (**recourse**), but recourse is limited – especially against private individuals who were only ordinarily negligent.

> The employer answers for employees' mistakes. Strict liability: no fault needed. Three years from when you know – 20 at the latest.`);

// ================= FORVALTNINGSRETT =================
DEEP("JFORV", "Vedtak og saksbehandling",
`## Forvaltningen og legalitetsprinsippet
**Forvaltningen** er den delen av staten og kommunene som setter politikken ut i livet: NAV, Skatteetaten, Utlendingsdirektoratet, statsforvalteren, kommunenes byggesaks- og barnevernstjenester og mange flere. Forvaltningen er bundet av **legalitetsprinsippet** (Grl. § 113): inngrep overfor borgerne – plikter, forbud, tvang – krever **hjemmel i lov**. Saksbehandlingen reguleres av **forvaltningsloven** (1967), som gir borgerne rettssikkerhet: like saker skal behandles likt, og avgjørelsene skal være forsvarlige og etterprøvbare.

## Enkeltvedtak og forskrifter
Forvaltningsloven § 2 skiller mellom
- **Enkeltvedtak**: en avgjørelse om **rettigheter eller plikter** for en eller flere **bestemte personer** – byggetillatelse, uføretrygd, skattefastsetting, førerkortbeslag, oppholdstillatelse.
- **Forskrifter**: generelle regler for et **ubestemt antall** personer – for eksempel trafikkregler eller fiskekvoter.

Om en avgjørelse er et enkeltvedtak, er viktig, for da gjelder lovens strenge saksbehandlingsregler og **klageretten**. Den som vedtaket retter seg mot eller direkte gjelder, er **part** (§ 2 e).

## Saksbehandlingsreglene
- **Habilitet** (§ 6): den som behandler saken, må ikke ha nær tilknytning til partene eller selv ha interesser i saken. Inhabil er blant annet den som er i familie med en part, og ellers den der det foreligger **særegne forhold** som er egnet til å svekke tilliten. Inhabilitet kan gjøre vedtaket ugyldig.
- **Veiledningsplikt** (§ 11): forvaltningen skal veilede om regler, rettigheter og saksbehandling.
- **Saksbehandlingstid** (§ 11 a): saken skal avgjøres **uten ugrunnet opphold**. Tar det lang tid, skal parten få foreløpig svar.
- **Forhåndsvarsel** (§ 16): parten skal varsles og få uttale seg før vedtaket treffes.
- **Utredningsplikt** (§ 17): saken skal være så godt **opplyst** som mulig før vedtak.
- **Partsinnsyn** (§ 18): parten har rett til å se sakens dokumenter.
- **Begrunnelse** (§§ 24–25): vedtaket skal begrunnes med reglene, de faktiske forholdene og de viktigste hensynene.
- **Underretning** (§ 27): parten skal underrettes om vedtaket, om **klageadgang**, klagefrist og klageinstans.

## Fritt skjønn og myndighetsmisbruk
Mange lover sier at myndighetene «kan» gjøre noe. Da har forvaltningen **fritt skjønn** – og domstolene kan som hovedregel ikke overprøve hvordan skjønnet er utøvd. Men skjønnet er ikke grenseløst. Etter læren om **myndighetsmisbruk** er vedtaket ugyldig hvis det bygger på **utenforliggende hensyn**, er **vilkårlig**, innebærer **usaklig forskjellsbehandling** eller er **grovt urimelig**.

## Feil i vedtaket
Etter § 41 er et vedtak likevel **gyldig** selv om det har saksbehandlingsfeil, hvis det er grunn til å regne med at feilen **ikke kan ha virket bestemmende** inn på innholdet. Feil i lovtolkningen, i faktum eller ved at vedtaket mangler hjemmel, gjør det derimot som regel ugyldig.

> Hjemmel – riktig saksbehandling – forsvarlig innhold. Mangler ett av disse, kan vedtaket angripes.`,
`## The administration and the principle of legality
**The public administration** is the part of the state and municipalities that puts policy into practice: NAV, the Tax Administration, the Directorate of Immigration, the county governor, municipal building and child welfare services and many more. The administration is bound by the **principle of legality** (Constitution Article 113): interference with citizens – duties, bans, coercion – requires a **basis in law**. Procedure is governed by the **Public Administration Act** (1967), which gives citizens legal certainty: like cases shall be treated alike, and decisions shall be sound and open to review.

## Individual decisions and regulations
Section 2 of the Act distinguishes between
- **Individual decisions**: a decision on the **rights or duties** of one or more **specific persons** – a building permit, disability benefit, tax assessment, licence suspension, residence permit.
- **Regulations**: general rules for an **indefinite number** of persons – such as traffic rules or fishing quotas.

Whether a decision is an individual decision matters, because then the Act's strict procedural rules and the **right of appeal** apply. Anyone the decision is addressed to or directly concerns is a **party** (section 2 e).

## The procedural rules
- **Impartiality** (section 6): the official handling the case must not be closely connected to the parties or have interests in the case. Disqualified, for example, is someone related to a party, and otherwise anyone in **special circumstances** likely to impair confidence. Disqualification can make the decision invalid.
- **Duty to give guidance** (section 11): the administration must advise on rules, rights and procedure.
- **Processing time** (section 11 a): the case shall be decided **without undue delay**. If it takes long, the party shall get a provisional reply.
- **Advance notice** (section 16): the party shall be notified and allowed to comment before the decision is made.
- **Duty to investigate** (section 17): the case shall be as well **clarified** as possible before a decision.
- **Party access** (section 18): the party has the right to see the case documents.
- **Reasons** (sections 24–25): the decision shall state the rules, the facts and the main considerations.
- **Notification** (section 27): the party shall be notified of the decision, the **right of appeal**, the deadline and the appeals body.

## Discretion and abuse of power
Many statutes say the authorities "may" do something. The administration then has **discretion** – and the courts cannot as a rule review how that discretion is exercised. But discretion is not unlimited. Under the doctrine of **abuse of power**, a decision is invalid if it is based on **irrelevant considerations**, is **arbitrary**, involves **unjustified discrimination** or is **grossly unreasonable**.

## Errors in the decision
Under section 41 a decision is nevertheless **valid** despite procedural errors if there is reason to believe the error **cannot have affected** its content. Errors in interpreting the law, in the facts, or a lack of legal basis, on the other hand, usually make it invalid.

> Legal basis – correct procedure – sound content. If one is missing, the decision can be challenged.`);

DEEP("JFORV", "Klage og omgjøring",
`## Retten til å klage
Etter **forvaltningsloven § 28** kan et **enkeltvedtak** påklages av en **part** eller en annen med **rettslig klageinteresse** – en som berøres av vedtaket på en måte som gir en reell grunn til å klage, som en nabo i en byggesak. Klageretten er en av de viktigste rettssikkerhetsgarantiene: den gir en ny og fullstendig vurdering, gratis og uten advokat.

## Frister og form
- **Klagefristen** er **tre uker** fra underretningen om vedtaket er kommet fram til parten (§ 29). Andre frister kan følge av særlov.
- Klagen skal være **skriftlig**, nevne vedtaket og si hva som ønskes endret, og bør begrunnes (§ 32).
- Klagen sendes til **det organet som traff vedtaket** (førsteinstansen).
- Er fristen oversittet, kan klagen likevel tas under behandling hvis parten ikke kan lastes for det, eller det av særlige grunner er rimelig (§ 31).

## Gangen i klagesaken
1. **Førsteinstansen** vurderer klagen på nytt og kan selv **endre** vedtaket hvis den finner klagen begrunnet (§ 33).
2. Hvis ikke, sendes saken til **klageinstansen**: normalt det **nærmest overordnede** forvaltningsorganet. Klager over NAV-vedtak går for eksempel til NAV Klageinstans, og kommunale vedtak etter plan- og bygningsloven til **statsforvalteren**. Vedtak truffet av kommunen etter egne regler behandles av en kommunal **klagenemnd**.
3. **Klageinstansen kan prøve alle sider av saken** (§ 34): lovtolkning, faktum, saksbehandling og skjønn, og ta hensyn til nye omstendigheter. Når en statlig instans behandler klage på kommunale vedtak, skal den legge stor vekt på det **kommunale selvstyret** ved prøvingen av fritt skjønn.
4. Klageinstansen kan **opprettholde**, **endre** eller **oppheve** vedtaket og sende saken tilbake. Endring til **skade** for klageren er bare unntaksvis tillatt.

## Oppsettende virkning
En klage stopper ikke automatisk gjennomføringen av vedtaket. Men forvaltningen kan bestemme at vedtaket ikke skal iverksettes før klagen er avgjort (**utsatt iverksetting**, § 42). Det er viktig for eksempel ved riving av et bygg eller utvisning.

## Omgjøring uten klage
Etter **§ 35** kan forvaltningen omgjøre sitt eget vedtak uten klage når
- endringen **ikke er til skade** for noen som vedtaket retter seg mot
- underretning om vedtaket ikke er kommet fram, eller
- vedtaket må anses **ugyldig**.
Også et overordnet organ kan omgjøre vedtaket på eget initiativ.

## Når klagen ikke fører fram
- **Sivilombudet**, som velges av Stortinget, behandler klager over urett fra forvaltningen. Ombudet kan ikke omgjøre vedtak, men uttalelsene følges nesten alltid.
- **Domstolene** kan prøve om vedtaket er **gyldig** (hjemmel, saksbehandling, faktum, myndighetsmisbruk), men ikke det frie skjønnet. Som hovedregel må klageadgangen være brukt først (§ 27 b).

> Tre uker. Skriftlig. Send til organet som traff vedtaket. Klageinstansen kan prøve alt.`,
`## The right to appeal
Under **section 28 of the Public Administration Act** an **individual decision** may be appealed by a **party** or anyone else with a **legal interest** – someone affected by the decision in a way that gives a real reason to appeal, such as a neighbour in a planning case. The right of appeal is one of the most important legal safeguards: it gives a new and complete assessment, free of charge and without a lawyer.

## Deadlines and form
- The **appeal deadline** is **three weeks** from when notice of the decision reached the party (section 29). Other deadlines may follow from special legislation.
- The appeal must be **in writing**, identify the decision and state what change is sought, and should give reasons (section 32).
- The appeal is sent to **the body that made the decision** (the first instance).
- If the deadline is missed, the appeal may still be considered if the party cannot be blamed, or there are special reasons making it reasonable (section 31).

## The appeal process
1. **The first instance** reconsiders and may **change** the decision itself if it finds the appeal justified (section 33).
2. If not, the case goes to the **appeals body**: normally the **immediately superior** administrative body. Appeals against NAV decisions go, for example, to NAV Appeals, and municipal planning decisions to the **county governor**. Decisions the municipality makes under its own rules are handled by a municipal **appeals board**.
3. **The appeals body may review every aspect of the case** (section 34): interpretation of the law, the facts, procedure and discretion, and consider new circumstances. When a state body hears an appeal against a municipal decision, it must give great weight to **local self-government** when reviewing discretion.
4. The appeals body may **uphold**, **change** or **quash** the decision and send the case back. A change to the appellant's **detriment** is permitted only exceptionally.

## Suspensive effect
An appeal does not automatically stop the decision from being implemented. But the administration may decide that it shall not be implemented until the appeal is decided (**deferred implementation**, section 42). This matters, for example, for demolition of a building or deportation.

## Reversal without an appeal
Under **section 35** the administration may reverse its own decision without an appeal when
- the change is **not to the detriment** of anyone the decision is addressed to
- notice of the decision has not reached the party, or
- the decision must be regarded as **invalid**.
A superior body may also reverse the decision on its own initiative.

## When the appeal fails
- **The Parliamentary Ombud**, elected by the Storting, handles complaints of injustice by the administration. The Ombud cannot reverse decisions, but its opinions are almost always followed.
- **The courts** can review whether the decision is **valid** (legal basis, procedure, facts, abuse of power), but not the free discretion. As a rule the right of appeal must be used first (section 27 b).

> Three weeks. In writing. Send it to the body that decided. The appeals body can review everything.`);

DEEP("JFORV", "Innsyn og taushetsplikt",
`## Åpenhet som hovedregel
**Offentleglova** (2006) gir **alle** – ikke bare partene – rett til innsyn i forvaltningens **saksdokumenter, journaler og registre** (§ 3). Du trenger ikke oppgi hvem du er eller hvorfor du vil se dokumentene. Formålet er å styrke **ytringsfriheten**, **tilliten** til forvaltningen, **kontrollen** fra pressen og allmennheten, og den **demokratiske deltakelsen**. Forvaltningen fører **offentlig journal** over inngående og utgående dokumenter, og mange organer publiserer den på **eInnsyn**. Innsynskrav skal behandles **uten ugrunnet opphold** – normalt innen noen få virkedager – og avslag kan påklages.

## Unntak fra innsyn
- **Skal** unntas: opplysninger underlagt **taushetsplikt** (§ 13).
- **Kan** unntas: **organinterne dokumenter** som et organ har laget for sin egen saksforberedelse (§ 14).
- **Kan** unntas: dokumenter innhentet fra underordnede organer for intern saksforberedelse (§ 15).
- **Kan** unntas: opplysninger der innsyn kan skade **nasjonal sikkerhet**, **forhandlinger**, eller lett kan **misbrukes** til straffbare handlinger
- Selv når det er adgang til å unnta, skal forvaltningen vurdere **meroffentlighet** (§ 11): gi innsyn hvis hensynet til offentlighet veier tyngre enn behovet for å unnta.

## Partsinnsyn
En **part** i en forvaltningssak har en sterkere innsynsrett etter **forvaltningsloven § 18**, også i opplysninger om seg selv som allmennheten ikke får se. Unntak gjelder blant annet opplysninger om helseforhold som det ville være utilrådelig at parten får kjennskap til (§ 19).

## Taushetsplikten
Etter **forvaltningsloven § 13** har alle som utfører tjeneste for forvaltningen, plikt til å hindre at andre får kjennskap til
- noens **personlige forhold** – helse, familieforhold, økonomi og lignende, men som hovedregel ikke fødested, fødselsdato, statsborgerforhold, sivilstand, yrke og adresse
- **drifts- og forretningshemmeligheter** som det er av konkurransemessig betydning å hemmeligholde

Taushetsplikten gjelder også etter at man har sluttet i stillingen. Den gjelder ikke når den det gjelder **samtykker**, når opplysningene brukes **statistisk** eller er **alminnelig kjent**, og den kan oppheves av lovbestemte **opplysningsplikter** – for eksempel plikten til å melde fra til **barnevernet** ved alvorlig omsorgssvikt, eller til å avverge alvorlige straffbare handlinger. Mange profesjoner har i tillegg egne taushetsregler, som **helsepersonelloven** § 21.

## Personvern
**Personvernforordningen (GDPR)**, innført gjennom **personopplysningsloven** (2018), regulerer all behandling av personopplysninger. Behandlingen må ha et **behandlingsgrunnlag** (for eksempel samtykke eller lovpålagt oppgave), være **formålsbestemt**, **dataminimert** og **sikker**. Den registrerte har rett til **innsyn**, **retting** og i noen tilfeller **sletting**. **Datatilsynet** fører tilsyn og kan ilegge store bøter.

> Offentleglova: alle kan be om innsyn. Forvaltningsloven § 13: taushetsplikt om personlige forhold. Hovedregelen er åpenhet, unntaket må begrunnes.`,
`## Openness as the rule
The **Freedom of Information Act** (2006) gives **everyone** – not just the parties – the right of access to the administration's **case documents, records and registers** (section 3). You need not say who you are or why you want to see the documents. The purpose is to strengthen **freedom of expression**, **trust** in the administration, **scrutiny** by the press and public, and **democratic participation**. The administration keeps a **public record** of incoming and outgoing documents, and many bodies publish it on **eInnsyn**. Requests must be handled **without undue delay** – normally within a few working days – and refusals can be appealed.

## Exceptions
- **Must** be withheld: information subject to a **duty of confidentiality** (section 13).
- **May** be withheld: **internal documents** that a body has prepared for its own case preparation (section 14).
- **May** be withheld: documents obtained from subordinate bodies for internal case preparation (section 15).
- **May** be withheld: information where access could harm **national security**, **negotiations**, or could easily be **misused** for criminal acts
- Even where an exception is available, the administration must consider **additional access** (section 11): grant access if the public interest outweighs the need to withhold.

## Party access
A **party** to an administrative case has a stronger right of access under **section 18 of the Public Administration Act**, including to information about themselves that the public may not see. Exceptions include health information it would be inadvisable for the party to learn of (section 19).

## The duty of confidentiality
Under **section 13 of the Public Administration Act** everyone working for the administration must prevent others from learning of
- anyone's **personal affairs** – health, family circumstances, finances and the like, but as a rule not place and date of birth, citizenship, marital status, occupation and address
- **operational and trade secrets** whose secrecy matters for competition

The duty continues after leaving the job. It does not apply when the person concerned **consents**, when the information is used **statistically** or is **generally known**, and it can be overridden by statutory **duties to disclose** – for example the duty to notify **child welfare services** of serious neglect, or to prevent serious crimes. Many professions also have their own confidentiality rules, such as section 21 of the **Health Personnel Act**.

## Data protection
The **General Data Protection Regulation (GDPR)**, implemented through the **Personal Data Act** (2018), governs all processing of personal data. Processing must have a **legal basis** (for example consent or a statutory task), be **purpose-limited**, **minimised** and **secure**. The data subject has the right to **access**, **rectification** and in some cases **erasure**. **The Data Protection Authority** supervises and can impose large fines.

> Freedom of Information Act: anyone can request access. Section 13: confidentiality about personal affairs. Openness is the rule; exceptions must be justified.`);

// ================= STRAFFERETT =================
DEEP("JSTR", "Straffbarhetsvilkårene",
`## Hva er straff?
**Straff** er et onde som staten påfører noen fordi de har begått en lovovertredelse, med den hensikt at det skal føles som et onde. Straffens begrunnelse er særlig **allmennprevensjon** (at folk flest avstår fra kriminalitet fordi den straffes), **individualprevensjon** (å hindre at den domfelte begår nye lovbrudd, gjennom avskrekking, uskadeliggjøring og rehabilitering) og **gjengjeldelse** og rettferdighet. Gjeldende **straffelov** er fra **2005** og trådte i kraft i **2015**. Første del inneholder de **alminnelige** reglene; andre del de enkelte **straffebudene** (drap § 275, kroppsskade § 273, tyveri § 321, bedrageri § 371 osv.).

## Legalitetsprinsippet
Ingen kan straffes uten **hjemmel i lov** (Grl. § 96, EMK art. 7, strl. § 14). Straffebudet må ha vært gjeldende **da handlingen ble begått** – det er forbudt med tilbakevirkende straffelover (Grl. § 97). Loven må være klar nok til at man kan forutse hva som er straffbart.

## De fire straffbarhetsvilkårene
Alle fire må være oppfylt for at noen kan straffes:

**1. Objektivt gjerningsinnhold.** Handlingen må omfattes av beskrivelsen i et straffebud. Tyveri (§ 321) krever for eksempel at man **tar** en **gjenstand** som **tilhører en annen**, i hensikt å skaffe seg en **uberettiget vinning** ved å tilegne seg den. Også **unnlatelser** kan være straffbare når loven sier det – for eksempel å unnlate å hjelpe en person i livsfare (§ 287). **Medvirkning** er straffbart når straffebudet sier det, og det gjelder de fleste (§ 15).

**2. Ingen straffrihetsgrunn.** Handlingen er ikke straffbar hvis den er **rettmessig**, for eksempel ved **nødverge**, **nødrett**, **egenmakt** eller **samtykke** fra den skadelidte. Se neste enhet.

**3. Skyld (subjektiv skyld).** Hovedregelen er at det kreves **forsett**, med mindre annet er bestemt (§ 21). Forsett har tre former (§ 22):
- **Hensiktsforsett**: gjerningspersonen ønsker å oppnå følgen.
- **Sannsynlighetsforsett**: gjerningspersonen holder det for **sikkert eller mest sannsynlig** at handlingen oppfyller gjerningsbeskrivelsen.
- **Eventuelt forsett** (dolus eventualis): gjerningspersonen holder det for **mulig** og bestemmer seg for å handle **selv om** det skulle være tilfellet.

Noen straffebud krever bare **uaktsomhet** (§ 23): gjerningspersonen har handlet i strid med kravet til forsvarlig opptreden og kan bebreides. **Grov uaktsomhet** er en kvalifisert klanderverdig opptreden. Eksempler: uaktsomt drap (§ 281) og mange trafikklovbrudd.

**4. Tilregnelighet (skyldevne).** Gjerningspersonen må være **tilregnelig** på handlingstidspunktet (§ 20). Utilregnelig er den som er **under 15 år** (den **kriminelle lavalderen**), den som er **psykotisk** eller har en **sterkt avvikende sinnstilstand**, har **høygradig psykisk utviklingshemming** eller **høygradig bevissthetsforstyrrelse**. Selvforskyldt **rus** fritar ikke for straff (§ 20 annet ledd, jf. § 25).

## Bevisbyrden
Påtalemyndigheten må bevise alle fire vilkårene. Er det **rimelig og fornuftig tvil**, skal tiltalte frifinnes (**in dubio pro reo**). Enhver regnes som **uskyldig** inntil skyld er bevist (Grl. § 96 annet ledd, EMK art. 6).

> Lovhjemmel → objektivt gjerningsinnhold → ingen straffrihetsgrunn → skyld → tilregnelighet. Sjekk vilkårene i denne rekkefølgen.`,
`## What is punishment?
**Punishment** is a harm the state imposes on someone because they have committed an offence, intended to be felt as a harm. Its justifications are mainly **general deterrence** (most people refrain from crime because it is punished), **individual prevention** (stopping the offender from reoffending through deterrence, incapacitation and rehabilitation) and **retribution** and justice. The current **Penal Code** is from **2005** and entered into force in **2015**. Part one contains the **general** rules; part two the individual **offences** (murder section 275, bodily harm 273, theft 321, fraud 371 etc.).

## The principle of legality
No one may be punished without a **basis in law** (Constitution Article 96, ECHR Article 7, Penal Code section 14). The provision must have been in force **when the act was committed** – retroactive criminal laws are prohibited (Constitution Article 97). The law must be clear enough for people to foresee what is punishable.

## The four conditions for criminal liability
All four must be met before anyone can be punished:

**1. The objective elements of the offence.** The act must fall within the description in a criminal provision. Theft (section 321) requires, for example, that someone **takes** an **object** **belonging to another**, with intent to obtain an **unlawful gain** by appropriating it. **Omissions** can also be punishable when the law says so – for example failing to help a person in mortal danger (section 287). **Complicity** is punishable when the provision says so, which most do (section 15).

**2. No ground for exemption.** The act is not punishable if it is **lawful**, for example in **self-defence**, **necessity**, **self-help** or with the injured party's **consent**. See the next unit.

**3. Guilt (mens rea).** The main rule is that **intent** is required unless otherwise stated (section 21). Intent has three forms (section 22):
- **Direct intent**: the offender wants to bring about the consequence.
- **Knowledge-based intent**: the offender considers it **certain or most likely** that the act fulfils the description of the offence.
- **Dolus eventualis**: the offender considers it **possible** and decides to act **even if** that should be the case.

Some offences require only **negligence** (section 23): the offender acted contrary to the standard of prudent conduct and can be blamed. **Gross negligence** is a highly blameworthy conduct. Examples: negligent homicide (section 281) and many traffic offences.

**4. Criminal capacity.** The offender must be **criminally responsible** at the time of the act (section 20). Not responsible are those **under 15** (the **age of criminal responsibility**), those who are **psychotic** or in a **severely deviant state of mind**, have a **severe intellectual disability** or a **severe impairment of consciousness**. Self-induced **intoxication** does not exempt from punishment (section 20(2), cf. section 25).

## The burden of proof
The prosecution must prove all four conditions. If there is **reasonable doubt**, the defendant shall be acquitted (**in dubio pro reo**). Everyone is presumed **innocent** until proven guilty (Constitution Article 96(2), ECHR Article 6).

> Legal basis → objective elements → no exemption → guilt → capacity. Check the conditions in this order.`);

DEEP("JSTR", "Nødverge, nødrett og forsøk",
`## Straffrihetsgrunner
Noen handlinger som oppfyller gjerningsbeskrivelsen i et straffebud, er likevel **rettmessige**. Da er det ikke begått noe straffbart. De viktigste straffrihetsgrunnene står i straffeloven §§ 17–19.

## Nødverge (§ 18)
Du kan forsvare deg selv eller andre mot et **ulovlig angrep**. Vilkårene er at handlingen
1. **avverger** et **ulovlig angrep** som er **pågående** eller **overhengende** (umiddelbart forestående). Hevn etter at angrepet er over, er ikke nødverge.
2. **ikke går lenger enn nødvendig** – kan du stikke av eller rope om hjelp, kan det tale mot å slå tilbake.
3. **ikke åpenbart går ut over** hva som er forsvarlig, sett i forhold til **hvor farlig angrepet er**, hva slags **interesse** som angripes, og **angriperens skyld**. Du kan ikke skyte en som stjeler epler.

Nødverge kan også brukes til å avverge eller gjennomføre en lovlig **pågripelse**. Den som overskrider grensene for nødverge, kan få **lavere straff** eller frifinnes hvis overskridelsen skyldtes en **sterk sinnsbevegelse** eller bestyrtelse fremkalt av angrepet (§ 80).

## Nødrett (§ 17)
Nødrett er å **ofre en interesse for å redde en annen**. Handlingen er lovlig når
1. den foretas for å redde **liv, helse, eiendom eller en annen interesse** fra en **fare for skade**
2. faren **ikke kan avverges på annen rimelig måte**
3. skaden som avverges, er **langt større** enn skaden som voldes.

Klassisk eksempel: å knuse ruten i en låst bil for å redde en hund eller et barn i stekende sol, eller å bryte seg inn i en hytte for å overleve et uvær. Forskjellen fra nødverge er at faren ikke trenger å komme fra et ulovlig angrep, og at kravet til forholdsmessighet er **strengere** («langt større»). Den som ødelegger noe i nødrett, kan likevel bli **erstatningsansvarlig**.

## Egenmakt og samtykke
**Egenmakt** (§ 19) er å gjenopprette en ulovlig tilstand på egen hånd – for eksempel å ta tilbake sykkelen fra tyven rett etter tyveriet. Det er bare lovlig hvis det ikke er mulig å få hjelp fra myndighetene i tide, og hvis fremgangsmåten er forsvarlig. **Samtykke** fra den fornærmede kan gjøre en handling lovlig (for eksempel en operasjon eller en boksekamp innenfor reglene), men ikke alvorlige skader eller drap.

## Forsøk (§ 16)
Den som har **forsett** om å fullbyrde et lovbrudd med strafferamme på **fengsel i ett år eller mer**, og foretar en handling som **tar sikte på** å fullføre det, straffes for **forsøk**. Grensen mot straffefrie **forberedelseshandlinger** kan være vanskelig: å kjøpe et brekkjern er ikke forsøk på innbrudd, men å begynne å bryte opp en dør er det. Forsøk straffes **mildere** enn fullbyrdet lovbrudd.

**Frivillig tilbaketreden**: den som **frivillig** avstår fra å fullføre, eller avverger følgen, før han eller hun vet at forsøket er oppdaget, straffes ikke for forsøket. Lovgiveren vil gi lovbryteren en «gyllen bro» tilbake.

**Utjenlig forsøk** – for eksempel å forsøke å forgifte noen med et stoff som viser seg å være ufarlig – straffes også, fordi gjerningspersonen viste den samme farlige viljen.

## Medvirkning
Den som **medvirker** – fysisk (holder offeret, kjører fluktbilen) eller **psykisk** (oppfordrer, styrker forsettet) – straffes etter samme straffebud som hovedgjerningspersonen når straffebudet rammer medvirkning (§ 15). Straffen kan settes ned hvis medvirkningen var av underordnet betydning.

> Nødverge: mot et ulovlig angrep. Nødrett: velg det minste onde. Forsøk: forsett + handling som tar sikte på fullbyrdelse.`,
`## Grounds for exemption
Some acts that fulfil the description of an offence are nevertheless **lawful**. Then no offence has been committed. The main grounds are in sections 17–19 of the Penal Code.

## Self-defence (section 18)
You may defend yourself or others against an **unlawful attack**. The conditions are that the act
1. **averts** an **unlawful attack** that is **ongoing** or **imminent**. Revenge after the attack is over is not self-defence.
2. **goes no further than necessary** – if you could run away or call for help, that may count against hitting back.
3. **does not manifestly exceed** what is justifiable, considering **how dangerous the attack is**, the **interest** attacked and the **attacker's guilt**. You cannot shoot someone stealing apples.

Self-defence may also be used to prevent or carry out a lawful **arrest**. Someone who exceeds the limits of self-defence may get a **reduced sentence** or be acquitted if the excess was due to **strong emotion** or panic caused by the attack (section 80).

## Necessity (section 17)
Necessity means **sacrificing one interest to save another**. The act is lawful when
1. it is done to save **life, health, property or another interest** from a **danger of harm**
2. the danger **cannot be averted in another reasonable way**
3. the harm averted is **much greater** than the harm caused.

The classic example: smashing the window of a locked car to save a dog or a child in blazing sun, or breaking into a cabin to survive a storm. Unlike self-defence, the danger need not come from an unlawful attack, and the proportionality requirement is **stricter** ("much greater"). Someone who destroys property out of necessity may still be **liable in damages**.

## Self-help and consent
**Self-help** (section 19) means restoring a lawful state of affairs on your own – for example taking your bike back from the thief right after the theft. It is lawful only if help from the authorities cannot be obtained in time, and the method is justifiable. **Consent** from the victim can make an act lawful (for example surgery or a boxing match within the rules), but not serious injury or killing.

## Attempt (section 16)
Anyone who **intends** to complete an offence carrying a maximum of **one year's imprisonment or more**, and performs an act **aimed at** completing it, is punished for **attempt**. The line against unpunished **preparatory acts** can be hard to draw: buying a crowbar is not attempted burglary, but starting to force a door is. Attempts are punished **more leniently** than completed offences.

**Voluntary withdrawal**: someone who **voluntarily** refrains from completing the offence, or prevents the consequence, before knowing the attempt has been discovered, is not punished for the attempt. The legislator wants to give the offender a "golden bridge" back.

**Impossible attempts** – for example trying to poison someone with a substance that turns out to be harmless – are also punished, because the offender showed the same dangerous will.

## Complicity
Anyone who **contributes** – physically (holding the victim, driving the getaway car) or **psychologically** (encouraging, strengthening the intent) – is punished under the same provision as the principal offender when the provision covers complicity (section 15). The sentence may be reduced if the contribution was minor.

> Self-defence: against an unlawful attack. Necessity: choose the lesser evil. Attempt: intent + an act aimed at completion.`);

DEEP("JSTR", "Straffereaksjoner og straffesaken",
`## Straffene (straffeloven § 29)
- **Fengsel**: normalt fra 14 dager til **21 år**. For de alvorligste forbrytelsene – folkemord, forbrytelser mot menneskeheten, grove krigsforbrytelser og grove terrorhandlinger – kan straffen være inntil **30 år**. Fengselsstraff kan gjøres helt eller delvis **betinget**: domfelte slipper å sone hvis han eller hun ikke begår nye lovbrudd i en **prøvetid** (normalt to år) og overholder eventuelle vilkår.
- **Forvaring**: en tidsubestemt reaksjon for farlige, tilregnelige lovbrytere når fengsel ikke anses tilstrekkelig til å verne samfunnet. Retten fastsetter en **tidsramme**, som kan forlenges med fem år om gangen så lenge faren for nye alvorlige lovbrudd består.
- **Samfunnsstraff**: et antall timer samfunnsnyttig arbeid eller program i stedet for fengsel, typisk for mindre alvorlige lovbrudd.
- **Ungdomsstraff**: for lovbrytere mellom **15 og 18 år** som har begått gjentatte eller alvorlige lovbrudd. Bygger på et **ungdomsstormøte** og en **ungdomsplan** med tiltak, i samarbeid med konfliktrådet.
- **Bot**: et pengebeløp til statskassen, ofte fastsatt etter inntekt og formue. Ubetalt bot kan gjøres om til **subsidiær fengselsstraff**.
- **Rettighetstap**: tap av retten til å ha en bestemt stilling, kjøre bil (**tap av førerett**) eller kontaktforbud.

**Inndragning** av utbytte fra lovbruddet, redskaper og farlige gjenstander er ikke straff, men en **annen strafferettslig reaksjon**. Det samme gjelder **overføring til tvungent psykisk helsevern** for utilregnelige som er farlige.

## Straffutmåling
Domstolen velger straff innenfor **strafferammen** i straffebudet. Høyesterett gir **normalnivåer** for vanlige lovbrudd. Deretter justeres straffen for
- **skjerpende** forhold (§ 77): planlagt, rammet en forsvarsløs person, motivert av hat, gjentakelse, flere gjerningspersoner
- **formildende** forhold (§ 78): **uforbeholden tilståelse** (gir ofte strafferabatt på inntil en tredjedel), lovbryteren har gjort opp for seg, ung alder, lang saksbehandlingstid

## Straffesaken steg for steg
1. **Anmeldelse** eller tips → politiet åpner **etterforskning**, som skal skje så **objektivt** som mulig: politiet skal søke å klarlegge både det som taler mot og for mistenkte.
2. **Tvangsmidler** som pågripelse, ransaking og beslag krever **skjellig grunn til mistanke** – mer sannsynlig at mistenkte har begått handlingen enn ikke. **Varetektsfengsling** besluttes av retten, blant annet ved fare for flukt, bevisforspillelse eller gjentakelse.
3. **Påtalemyndigheten** avgjør saken: **henleggelse** (for eksempel etter bevisets stilling), **påtaleunnlatelse** (skyld er bevist, men det ikke reageres med straff), **forelegg** (bot eller annen reaksjon som mistenkte kan vedta uten rettssak), overføring til **konfliktrådet**, eller **tiltale**.
4. **Hovedforhandling** i tingretten: aktor (påtalemyndigheten) og forsvarer legger fram bevis; vitner forklarer seg; retten avsier **dom** på skyldspørsmålet og eventuelt straffen.
5. **Anke** til lagmannsretten og, i spesielle tilfeller, til Høyesterett.

## Rettssikkerhetsgarantier
Siktede har rett til **forsvarer**, til å bli gjort kjent med **siktelsen**, til ikke å forklare seg eller bidra til å inkriminere seg selv (**selvinkrimineringsvernet**), til å få saken avgjort **innen rimelig tid** og av en **uavhengig og upartisk domstol** (EMK art. 6). **Fornærmede** har også rettigheter, blant annet til **bistandsadvokat** i saker om vold og overgrep.

> Fengsel, forvaring, samfunnsstraff, ungdomsstraff, bot, rettighetstap. Politiet etterforsker, påtalemyndigheten tiltaler, retten dømmer.`,
`## The penalties (Penal Code section 29)
- **Imprisonment**: normally from 14 days to **21 years**. For the most serious crimes – genocide, crimes against humanity, serious war crimes and serious acts of terrorism – the sentence can be up to **30 years**. A prison sentence can be wholly or partly **suspended**: the convicted person avoids serving it if they commit no new offences during a **probation period** (normally two years) and comply with any conditions.
- **Preventive detention**: an indeterminate sanction for dangerous offenders with criminal capacity when prison is not considered enough to protect society. The court sets a **time frame**, which can be extended by five years at a time as long as the risk of new serious offences persists.
- **Community sentence**: a number of hours of community work or programmes instead of prison, typically for less serious offences.
- **Youth sentence**: for offenders aged **15 to 18** who have committed repeated or serious offences. It is based on a **youth conference** and a **youth plan** with measures, in cooperation with the Mediation Service.
- **Fine**: a sum paid to the state, often set according to income and wealth. An unpaid fine can be converted to **alternative imprisonment**.
- **Loss of rights**: losing the right to hold a certain position, drive (**loss of driving licence**) or a restraining order.

**Confiscation** of proceeds from the offence, tools and dangerous items is not a penalty but **another criminal sanction**. The same applies to **transfer to compulsory mental health care** for dangerous offenders lacking criminal capacity.

## Sentencing
The court chooses a sentence within the **statutory range** of the provision. The Supreme Court sets **normal levels** for common offences. The sentence is then adjusted for
- **aggravating** factors (section 77): planned, targeted a defenceless person, motivated by hate, reoffending, several offenders
- **mitigating** factors (section 78): an **unreserved confession** (often gives a reduction of up to a third), the offender has made amends, young age, long proceedings

## The criminal case step by step
1. A **report** or tip-off → the police open an **investigation**, which must be as **objective** as possible: the police shall seek to clarify both what speaks against and for the suspect.
2. **Coercive measures** such as arrest, search and seizure require **just cause for suspicion** – more likely than not that the suspect committed the act. **Custody** is ordered by the court, for example where there is a risk of flight, tampering with evidence or reoffending.
3. **The prosecuting authority** decides the case: **dropping** it (for example for lack of evidence), a **waiver of prosecution** (guilt is proven but no penalty is imposed), a **writ** (a fine or other sanction the suspect can accept without a trial), referral to the **Mediation Service**, or an **indictment**.
4. **Main hearing** in the district court: the prosecutor and defence counsel present evidence; witnesses testify; the court gives **judgment** on guilt and, if relevant, sentence.
5. **Appeal** to the court of appeal and, in special cases, to the Supreme Court.

## Legal safeguards
The suspect has the right to **defence counsel**, to be informed of the **charge**, not to give a statement or help incriminate themselves (**the privilege against self-incrimination**), and to have the case decided **within a reasonable time** by an **independent and impartial court** (ECHR Article 6). **Victims** also have rights, including to a **counsel for the aggrieved** in cases of violence and abuse.

> Prison, preventive detention, community sentence, youth sentence, fine, loss of rights. The police investigate, the prosecution indicts, the court judges.`);
})();
