// ============================================================
//  add_zdeep_syk2.js – fordypning i sykepleie: klinisk sykepleie, sykdomslære, lov/etikk/kommunikasjon
//  og legemiddelregning. DEEP ligger i learn.js. Følg alltid lokale prosedyrer og gjeldende retningslinjer.
// ============================================================
(() => {
// ================= KLINISK SYKEPLEIE =================
DEEP("SKLIN", "Vitale tegn og normalverdier",
`## Hvorfor vitale tegn?
Vitale tegn er de raskeste og billigste målingene vi har av hvordan kroppen klarer seg. Ett enkelt tall sier lite – det er **utviklingen over tid** og **helheten** som teller. En pasient med puls 105, respirasjonsfrekvens 24 og ny forvirring kan være i ferd med å utvikle sepsis, selv om blodtrykket ennå er normalt. Kroppen kompenserer lenge; **blodtrykksfall kommer ofte sent**.

## Normalverdier hos voksne (veiledende)
- **Respirasjonsfrekvens**: 12–20 per minutt.
- **Oksygenmetning (SpO₂)**: 96–100 % hos lungefriske. Hos noen KOLS-pasienter er målet 88–92 % etter forordning.
- **Puls**: 50–90 per minutt i hvile; regelmessig og kraftig.
- **Blodtrykk**: omkring 120/80 mmHg. Systolisk trykk under 90–100 hos en pasient som vanligvis har høyere, er alarmerende.
- **Temperatur**: omkring 36,1–38,0 °C, med døgnvariasjon. Eldre og immunsvekkede får ikke alltid feber selv ved alvorlig infeksjon – lav temperatur kan også være et faresignal.
- **Bevissthet**: våken og orientert for tid, sted og person.

## Slik måler du riktig
- **Respirasjonsfrekvens**: tell i **ett helt minutt**, gjerne mens du later som du teller puls, så pasienten ikke endrer pusten. Se også på dybde, rytme og bruk av hjelpemuskler.
- **Puls**: kjenn på **radialis** (håndleddet) med to–tre fingre, ikke tommelen. Tell i 30 sekunder og gang med 2 hvis pulsen er regelmessig; tell i **60 sekunder** ved uregelmessig puls. Vurder også rytme og fylde. Ved atrieflimmer kan pulsen ved håndleddet være lavere enn den egentlige hjertefrekvensen.
- **Blodtrykk**: pasienten bør ha sittet i ro i omtrent fem minutter, med armen støttet i **hjertehøyde**. Bruk **riktig mansjettstørrelse** – en for liten mansjett gir falskt høyt trykk. Ikke mål på en arm med dialysefistel, lymfødem eller etter brystkreftoperasjon med fjernede lymfeknuter.
- **Ortostatisk blodtrykk**: mål liggende og så stående etter 1 og 3 minutter. Et fall i systolisk trykk på 20 mmHg eller mer tyder på **ortostatisk hypotensjon** – en vanlig årsak til fall hos eldre.
- **SpO₂**: kald hud, neglelakk, bevegelse og dårlig sirkulasjon kan gi feil. Se alltid på pasienten og på pulskurven.
- **Temperatur**: bruk samme metode hver gang (øre, munn eller rektalt), så målingene kan sammenlignes.

## Kompensasjonsmekanismer
Ved blødning, dehydrering eller sepsis forsøker kroppen å holde blodtrykket oppe ved å øke **pulsen** og trekke sammen blodårene i huden – pasienten blir **blek, kald og klam**, og kapillærfyllingen blir forlenget (over 2–3 sekunder). Respirasjonsfrekvensen stiger. Når blodtrykket til slutt faller, er reservene brukt opp. Derfor skal **høy respirasjonsfrekvens og høy puls** alltid tas på alvor.

## Dokumentasjon og kommunikasjon
Før målingene inn i **kurve** eller elektronisk observasjonsskjema med tidspunkt, slik at trender blir synlige. Bruk **NEWS2** (neste enhet) til å oppsummere funnene og avgjøre hvor raskt lege må tilkalles. Stol også på **klinisk blikk**: er du bekymret for en pasient, si fra – selv om tallene ser greie ut.

> Det er trenden og helheten som teller. Respirasjonsfrekvens og bevissthet endrer seg ofte først; blodtrykket faller sent.`,
`## Why vital signs?
Vital signs are the fastest and cheapest measurements we have of how the body is coping. A single number says little – it is the **trend over time** and **the whole picture** that count. A patient with a pulse of 105, respiratory rate of 24 and new confusion may be developing sepsis, even if blood pressure is still normal. The body compensates for a long time; **a drop in blood pressure often comes late**.

## Normal adult values (guide)
- **Respiratory rate**: 12–20 per minute.
- **Oxygen saturation (SpO₂)**: 96–100 % with healthy lungs. In some COPD patients the target is 88–92 % as prescribed.
- **Pulse**: 50–90 per minute at rest; regular and strong.
- **Blood pressure**: around 120/80 mmHg. A systolic pressure below 90–100 in a patient who usually has higher is alarming.
- **Temperature**: about 36.1–38.0 °C, varying through the day. Older and immunocompromised patients do not always develop fever even with severe infection – a low temperature can also be a warning sign.
- **Consciousness**: alert and oriented to time, place and person.

## Measuring correctly
- **Respiratory rate**: count for **a full minute**, ideally while appearing to count the pulse, so the patient does not change their breathing. Note depth, rhythm and use of accessory muscles.
- **Pulse**: feel the **radial** pulse (wrist) with two or three fingers, not the thumb. Count for 30 seconds and double it if regular; count for **60 seconds** if irregular. Assess rhythm and volume too. In atrial fibrillation the pulse at the wrist may be lower than the true heart rate.
- **Blood pressure**: the patient should have rested sitting for about five minutes, with the arm supported at **heart level**. Use the **right cuff size** – a cuff that is too small gives a falsely high reading. Do not measure on an arm with a dialysis fistula, lymphoedema or after breast cancer surgery with lymph nodes removed.
- **Orthostatic blood pressure**: measure lying down and then standing after 1 and 3 minutes. A fall in systolic pressure of 20 mmHg or more suggests **orthostatic hypotension** – a common cause of falls in older people.
- **SpO₂**: cold skin, nail polish, movement and poor circulation can give false readings. Always look at the patient and the pulse waveform.
- **Temperature**: use the same method each time (ear, mouth or rectal) so readings can be compared.

## Compensation
In bleeding, dehydration or sepsis the body tries to maintain blood pressure by raising the **pulse** and constricting skin vessels – the patient becomes **pale, cold and clammy**, and capillary refill is prolonged (over 2–3 seconds). The respiratory rate rises. When blood pressure finally falls, the reserves are used up. So a **high respiratory rate and high pulse** must always be taken seriously.

## Documentation and communication
Record measurements on the **chart** or electronic observation form with the time, so trends are visible. Use **NEWS2** (next unit) to summarise the findings and decide how quickly a doctor must be called. Trust **clinical judgement** too: if you are worried about a patient, speak up – even if the numbers look fine.

> Trends and the whole picture count. Respiratory rate and consciousness often change first; blood pressure falls late.`);

DEEP("SKLIN", "NEWS2 og den akutt syke pasienten",
`## Systematisk vurdering med ABCDE
Når en pasient er akutt dårlig, bruker du **ABCDE** – i denne rekkefølgen, fordi det som dreper raskest kommer først. Finner du et problem, **behandler du det før du går videre**, og du starter på nytt fra A hvis pasienten forverres.
- **A – Airway (luftvei)**: snakker pasienten normalt, er luftveien åpen. Lytt etter snorking, gurgling eller stridor. Tiltak: hakeløft/kjevegrep, suge, sideleie, tilkall hjelp.
- **B – Breathing (pust)**: respirasjonsfrekvens, SpO₂, pustearbeid, symmetri, lyder. Tiltak: oksygen etter prosedyre, sitte oppreist.
- **C – Circulation (sirkulasjon)**: puls, blodtrykk, hudfarge og temperatur, **kapillærfylning**, diurese, blødning. Tiltak: venetilgang, blodprøver, væske etter forordning.
- **D – Disability (nevrologi)**: bevissthet (ACVPU eller GCS), pupiller, **blodsukker** – lavt blodsukker er en lett behandlbar årsak til nedsatt bevissthet.
- **E – Exposure (eksponering)**: undersøk hele kroppen – utslett, sår, ødemer, blødninger, temperatur. Hindre nedkjøling og ivareta verdigheten.

## Hvordan NEWS2 virker
**NEWS2** (National Early Warning Score 2) gir poeng (0–3) for sju parametere: respirasjonsfrekvens, SpO₂, oksygentilførsel, systolisk blodtrykk, puls, bevissthet og temperatur. Jo lenger fra normalen, desto flere poeng. Summen styrer hvor ofte pasienten skal observeres og hvor raskt lege skal involveres:
- **0**: lav risiko – vanlig observasjon (minst hver 12. time).
- **1–4**: lav risiko – økt observasjon, vurder om sykepleier skal varsle lege.
- **3 poeng i én enkelt parameter**: varsle lege raskt, selv om totalen er lav.
- **5–6**: middels risiko – **haster**: rask vurdering av lege, observasjon minst hver time.
- **7 eller mer**: høy risiko – **akutt**: umiddelbar vurdering av lege/akutteam, kontinuerlig overvåking.

NEWS2 har en egen skala for SpO₂ hos pasienter med **hyperkapnisk respirasjonssvikt** (ofte KOLS), der målet er 88–92 %, og gir ekstra poeng for **ny forvirring**. Lokale prosedyrer kan ha egne tiltaksgrenser.

## Begrensninger
NEWS2 er et **hjelpemiddel**, ikke en erstatning for faglig vurdering. Det er mindre egnet for barn, gravide og pasienter i livets sluttfase, og legemidler som betablokkere kan maskere høy puls. En pasient med lav score kan fortsatt være alvorlig syk – **bekymring er alltid nok grunn til å ringe**.

## Kommunikasjon med ISBAR
Når du ringer lege, gir **ISBAR** en strukturert og rask rapport:
- **I – Identifikasjon**: hvem du er, hvor du ringer fra, og hvilken pasient det gjelder.
- **S – Situasjon**: hva som er problemet nå. «Jeg ringer fordi NEWS-skåren har steget til 7.»
- **B – Bakgrunn**: relevant sykehistorie, innleggelsesårsak, medisiner, allergier.
- **A – Aktuell vurdering**: funnene dine (ABCDE, vitale tegn) og hva du tror er galt.
- **R – Råd**: hva du ber om – «Jeg ønsker at du kommer og ser på pasienten innen 15 minutter.» Gjenta beskjeder du får, for å sikre at de er forstått.

## Etter vurderingen
Dokumenter funn, tiltak og hvem som er varslet. Følg opp med nye målinger som avtalt, og eskaler videre hvis tilstanden ikke bedres. **Tidlig oppdagelse og handling** redder liv – mange hjertestanser på sengepost har tegn til forverring timene før.

> ABCDE – behandle det du finner før du går videre. NEWS2 ≥ 5: haster. ≥ 7: akutt. Ring med ISBAR.`,
`## A systematic assessment with ABCDE
When a patient is acutely unwell, use **ABCDE** – in this order, because what kills fastest comes first. If you find a problem, **treat it before moving on**, and start again from A if the patient deteriorates.
- **A – Airway**: if the patient talks normally, the airway is open. Listen for snoring, gurgling or stridor. Actions: chin lift/jaw thrust, suction, recovery position, call for help.
- **B – Breathing**: respiratory rate, SpO₂, work of breathing, symmetry, sounds. Actions: oxygen according to procedure, sit upright.
- **C – Circulation**: pulse, blood pressure, skin colour and temperature, **capillary refill**, urine output, bleeding. Actions: IV access, blood tests, fluids as prescribed.
- **D – Disability**: consciousness (ACVPU or GCS), pupils, **blood glucose** – low blood sugar is an easily treatable cause of reduced consciousness.
- **E – Exposure**: examine the whole body – rash, wounds, oedema, bleeding, temperature. Prevent cooling and protect dignity.

## How NEWS2 works
**NEWS2** (National Early Warning Score 2) gives points (0–3) for seven parameters: respiratory rate, SpO₂, supplemental oxygen, systolic blood pressure, pulse, consciousness and temperature. The further from normal, the more points. The total decides how often the patient is observed and how quickly a doctor is involved:
- **0**: low risk – routine observation (at least every 12 hours).
- **1–4**: low risk – more frequent observation; consider whether the nurse should inform a doctor.
- **3 points in a single parameter**: inform a doctor promptly, even if the total is low.
- **5–6**: medium risk – **urgent**: prompt review by a doctor, observations at least hourly.
- **7 or more**: high risk – **emergency**: immediate review by a doctor/critical care team, continuous monitoring.

NEWS2 has a separate SpO₂ scale for patients with **hypercapnic respiratory failure** (often COPD), where the target is 88–92 %, and gives extra points for **new confusion**. Local procedures may set their own action thresholds.

## Limitations
NEWS2 is an **aid**, not a replacement for professional judgement. It is less suitable for children, pregnant women and patients at the end of life, and drugs such as beta blockers can mask a high pulse. A patient with a low score can still be seriously ill – **concern is always reason enough to call**.

## Communicating with ISBAR
When you call a doctor, **ISBAR** gives a structured, quick report:
- **I – Identify**: who you are, where you are calling from and which patient it concerns.
- **S – Situation**: what the problem is now. "I'm calling because the NEWS score has risen to 7."
- **B – Background**: relevant history, reason for admission, medications, allergies.
- **A – Assessment**: your findings (ABCDE, vital signs) and what you think is wrong.
- **R – Recommendation**: what you are asking for – "I'd like you to come and see the patient within 15 minutes." Read back instructions you receive to make sure they are understood.

## After the assessment
Document findings, actions and who has been informed. Follow up with new observations as agreed, and escalate further if the condition does not improve. **Early detection and action** save lives – many cardiac arrests on wards show signs of deterioration in the hours before.

> ABCDE – treat what you find before moving on. NEWS2 ≥ 5: urgent. ≥ 7: emergency. Call using ISBAR.`);

DEEP("SKLIN", "Væskebalanse, ernæring og BMI",
`## Væskebehov og væskeregnskap
En voksen trenger omtrent **30–35 ml væske per kilo** kroppsvekt i døgnet – for en person på 70 kg rundt 2–2,5 liter. Behovet øker ved **feber** (omtrent 10–15 % mer per grad over 37 °C), svetting, oppkast, diaré, sår og drenasjer. Hjertesvikt- og nyresviktpasienter kan derimot ha **væskerestriksjon**.

**Væskeregnskap** (væskebalanse) føres når det er usikkerhet om pasienten får i seg nok eller for mye:
- **Inn**: drikke, væske i mat, sondeernæring, intravenøs væske og legemidler.
- **Ut**: urin, oppkast, avføring ved diaré, drenasjer og blødning – pluss **usynlig væsketap** via hud og pust (**perspiratio insensibilis**), normalt omkring 500–800 ml i døgnet og mer ved feber og rask pust.
- **Daglig vekt** på samme vekt, til samme tid og med like klær er ofte det mest pålitelige målet på endring i væskebalansen: 1 kg ≈ 1 liter.

## Dehydrering og overhydrering
- **Dehydrering**: tørste (svekket hos eldre), tørre slimhinner, lite og mørk urin, høy puls, lavt blodtrykk, svimmelhet ved oppreising, forvirring og forstoppelse. Eldre er særlig utsatt – dehydrering kan utløse delirium, fall, akutt nyreskade og urinveisinfeksjon.
- **Overhydrering**: vektøkning, **ødemer** (særlig ankler og korsrygg hos sengeliggende), tung pust og knatrelyder over lungene (lungeødem), stigende blodtrykk. Risikoen er størst hos pasienter med hjerte- eller nyresvikt som får intravenøs væske.

## Kroppsmasseindeks (BMI)
$$\\text{BMI} = \\frac{\\text{vekt (kg)}}{\\text{høyde (m)}^2}.$$
For voksne regnes under 18,5 som **undervekt**, 18,5–24,9 som normalvekt, 25–29,9 som overvekt og 30 eller mer som fedme. Hos **eldre over 70** regnes ofte BMI under omtrent **22** som for lavt, fordi litt ekstra reserver beskytter ved sykdom. BMI sier ingenting om **muskelmasse** eller fordelingen av fett, og påvirkes av ødemer.

## Underernæring
Underernæring er vanlig i sykehus, sykehjem og hjemmetjenesten, og blir ofte oversett. Risikoen er økt ved
- **ufrivillig vekttap** – mer enn 5 % siste tre måneder eller mer enn 10 % siste seks måneder
- **lav BMI**
- **redusert matinntak** – for eksempel under halvparten av behovet den siste uken
- sykdom som øker behovet (infeksjon, kreft, sår, operasjoner)

Alle pasienter skal **vurderes for ernæringsmessig risiko** ved innleggelse og deretter jevnlig, med et validert verktøy (for eksempel NRS 2002, MUST eller MNA for eldre). Pasienter i risiko skal ha en **ernæringsplan**.

## Energi- og proteinbehov
Som tommelfingerregel trenger en voksen pasient omtrent **30 kcal per kilo** i døgnet – noe mindre for sengeliggende og mer ved oppbygging og feber. Proteinbehovet hos syke er ofte **1,0–1,5 g per kilo**. Tiltakene følger en **trapp**: tilpasset mat med høyt energi- og proteininnhold og små, hyppige måltider → **næringsdrikker** og berikning → **sondeernæring** → **intravenøs ernæring**. Kortere nattfaste (under 11 timer), hjelp til å spise, god munnhygiene og en hyggelig spisesituasjon har stor betydning.

## Observasjoner
Registrer **kostinntak** (kostregistrering i 3–4 døgn ved mistanke om for lavt inntak), vekt, tygge- og svelgevansker, kvalme, smerter, munnstatus og avføring. Ved **svelgevansker** (for eksempel etter hjerneslag) må konsistensen tilpasses for å unngå **aspirasjon**.

> Inn – ut = balanse. Daglig vekt: 1 kg ≈ 1 liter. Screen alle for underernæring – vekttap er det viktigste varselet.`,
`## Fluid needs and fluid balance charts
An adult needs about **30–35 mL of fluid per kilogram** of body weight per day – around 2–2.5 litres for a 70 kg person. Needs rise with **fever** (about 10–15 % more per degree above 37 °C), sweating, vomiting, diarrhoea, wounds and drains. Patients with heart or kidney failure, on the other hand, may be on **fluid restriction**.

A **fluid balance chart** is kept when it is uncertain whether the patient is getting enough or too much:
- **In**: drinks, fluid in food, tube feeds, IV fluids and drugs.
- **Out**: urine, vomit, diarrhoea, drains and bleeding – plus **insensible losses** through skin and breath, normally about 500–800 mL a day and more with fever and rapid breathing.
- **Daily weight** on the same scales, at the same time and in similar clothes is often the most reliable measure of change in fluid balance: 1 kg ≈ 1 litre.

## Dehydration and fluid overload
- **Dehydration**: thirst (blunted in older people), dry mucous membranes, little dark urine, high pulse, low blood pressure, dizziness on standing, confusion and constipation. Older people are especially at risk – dehydration can trigger delirium, falls, acute kidney injury and urinary infection.
- **Fluid overload**: weight gain, **oedema** (especially ankles, and the lower back in bedridden patients), breathlessness and crackles over the lungs (pulmonary oedema), rising blood pressure. The risk is greatest in patients with heart or kidney failure receiving IV fluids.

## Body mass index (BMI)
$$\\text{BMI} = \\frac{\\text{weight (kg)}}{\\text{height (m)}^2}.$$
For adults below 18.5 counts as **underweight**, 18.5–24.9 as normal, 25–29.9 as overweight and 30 or more as obesity. In **people over 70**, a BMI below about **22** is often considered too low, because some extra reserves protect during illness. BMI says nothing about **muscle mass** or fat distribution, and is affected by oedema.

## Malnutrition
Malnutrition is common in hospitals, nursing homes and home care, and is often overlooked. The risk is higher with
- **unintentional weight loss** – more than 5 % in the last three months or more than 10 % in the last six months
- **low BMI**
- **reduced food intake** – for example less than half of needs in the last week
- illness that raises needs (infection, cancer, wounds, surgery)

All patients should be **screened for nutritional risk** on admission and regularly afterwards, using a validated tool (for example NRS 2002, MUST or MNA for older people). Patients at risk should have a **nutrition plan**.

## Energy and protein needs
As a rule of thumb an adult patient needs about **30 kcal per kilogram** per day – somewhat less if bedridden and more during recovery and fever. Protein needs in illness are often **1.0–1.5 g per kilogram**. Interventions follow a **ladder**: adapted food high in energy and protein and small, frequent meals → **oral nutritional supplements** and fortification → **tube feeding** → **parenteral nutrition**. A shorter overnight fast (under 11 hours), help with eating, good oral care and a pleasant mealtime matter a great deal.

## Observations
Record **food intake** (a 3–4 day food chart if intake is suspected to be low), weight, chewing and swallowing problems, nausea, pain, oral health and bowel function. With **swallowing difficulties** (for example after a stroke) the texture must be adapted to avoid **aspiration**.

> In − out = balance. Daily weight: 1 kg ≈ 1 litre. Screen everyone for malnutrition – weight loss is the most important warning.`);

// ================= SYKDOMSLÆRE =================
DEEP("SSYK", "Hjerte- og karsykdommer",
`## Aterosklerose – grunnlaget
De fleste hjerte- og karsykdommer skyldes **aterosklerose** («åreforkalkning»): fett, betennelsesceller og bindevev lagres i karveggen som **plakk**, som gjør arterien trangere og stivere. Sprekker et plakk, dannes en **blodpropp** som kan tette arterien helt. Risikofaktorene er **røyking**, **høyt blodtrykk**, **høyt LDL-kolesterol**, **diabetes**, overvekt, fysisk inaktivitet, arv, alder og mannlig kjønn. Mange av dem kan påvirkes.

## Angina pectoris og hjerteinfarkt
- **Stabil angina**: brystsmerter eller trykk ved anstrengelse, som går over i hvile eller med **nitroglyserin**. Hjertemuskelen får for lite oksygen når behovet øker.
- **Akutt koronarsyndrom** omfatter ustabil angina og **hjerteinfarkt**: en koronararterie tettes, og hjertemuskel dør hvis blodstrømmen ikke gjenopprettes raskt. Typiske symptomer er **trykkende brystsmerter** som kan stråle ut i arm, hals, kjeve eller rygg, kvalme, kaldsvette og tung pust. **Kvinner, eldre og diabetikere** har oftere **atypiske symptomer** – tretthet, magesmerter eller bare tung pust.
- **Diagnose**: **EKG** (ST-heving gir diagnosen STEMI og krever umiddelbar behandling) og **troponin** i blodet, som stiger når hjertemuskelceller dør.
- **Behandling**: ring **113**, gi acetylsalisylsyre og oksygen ved lav metning etter prosedyre, smertelindring og rask åpning av arterien med **PCI** (utblokking med stent) eller trombolyse. «Tid er muskel.»
- Etter infarktet: platehemmere, statin, betablokker, ACE-hemmer og **livsstilsendringer**, gjerne gjennom hjerterehabilitering.

## Hjertesvikt
Ved **hjertesvikt** klarer ikke hjertet å pumpe nok blod til kroppens behov. Vanlige årsaker er tidligere hjerteinfarkt, høyt blodtrykk og klaffefeil.
- **Venstresidig svikt**: blodet stuves opp i **lungene** – tung pust, særlig ved anstrengelse og i liggende stilling (pasienten sover med flere puter), nattlige anfall av tung pust og i verste fall **akutt lungeødem** med surkling og skummende oppspytt.
- **Høyresidig svikt**: blodet stuves opp i **kroppen** – **ankelødemer**, vektøkning, forstørret lever og nedsatt matlyst.
- **Behandling**: diuretika, ACE-hemmer/angiotensinreseptor-blokker, betablokker og nyere legemidler. **Daglig vekt**: øker vekten med mer enn omtrent 2 kg på noen dager, kan det være væskeopphopning. Pasienten skal ofte ha **væskerestriksjon** og saltfattig kost.
- Graden av svikt beskrives med **NYHA-klassifikasjonen** (I: ingen plager – IV: plager i hvile).

## Atrieflimmer
**Atrieflimmer** er den vanligste rytmeforstyrrelsen: forkamrene «flimrer» kaotisk, og pulsen blir **uregelmessig**, ofte rask. Pasienten kan merke hjertebank, slapphet og tung pust – eller ingenting. Den største faren er **hjerneslag**, fordi blod kan levre seg i forkammeret og danne propper. De fleste pasienter skal derfor ha **antikoagulasjon**. I tillegg behandles frekvensen (betablokker) eller rytmen (elektrokonvertering, ablasjon).

## Høyt blodtrykk
**Hypertensjon** (vanligvis 140/90 eller høyere ved gjentatte målinger) gir sjelden symptomer, men øker risikoen for hjerneslag, hjerteinfarkt, hjertesvikt og nyresvikt. Behandlingen er livsstilstiltak – mindre salt, mer aktivitet, vektreduksjon, mindre alkohol, røykeslutt – og ofte legemidler.

## Venøs trombose
**Dyp venetrombose** (DVT) gir hevelse, smerte og varme i det ene beinet. Biter av proppen kan løsne og gi **lungeemboli** med plutselig tung pust, brystsmerter og høy puls. Risikoen øker ved **immobilisering**, operasjoner, kreft og p-piller. Forebygging i sykehus: tidlig mobilisering, lavmolekylært heparin og kompresjon etter forordning.

> Brystsmerter = ring 113 og ta EKG raskt. Venstresvikt → lungene. Høyresvikt → ødemer. Atrieflimmer → slagrisiko.`,
`## Atherosclerosis – the foundation
Most cardiovascular disease is caused by **atherosclerosis**: fat, inflammatory cells and connective tissue build up in the vessel wall as **plaque**, making the artery narrower and stiffer. If a plaque ruptures, a **clot** forms that can block the artery completely. The risk factors are **smoking**, **high blood pressure**, **high LDL cholesterol**, **diabetes**, overweight, physical inactivity, family history, age and male sex. Many of them can be modified.

## Angina and myocardial infarction
- **Stable angina**: chest pain or pressure on exertion that eases with rest or **nitroglycerin**. The heart muscle gets too little oxygen when demand rises.
- **Acute coronary syndrome** includes unstable angina and **myocardial infarction**: a coronary artery is blocked, and heart muscle dies unless blood flow is restored quickly. Typical symptoms are **crushing chest pain** that may spread to the arm, neck, jaw or back, nausea, cold sweat and breathlessness. **Women, older people and people with diabetes** more often have **atypical symptoms** – fatigue, abdominal pain or just breathlessness.
- **Diagnosis**: **ECG** (ST elevation gives the diagnosis STEMI and needs immediate treatment) and blood **troponin**, which rises when heart muscle cells die.
- **Treatment**: call **113**, give aspirin and oxygen if saturation is low according to procedure, pain relief and rapid opening of the artery with **PCI** (angioplasty with a stent) or thrombolysis. "Time is muscle."
- After the infarction: antiplatelets, a statin, beta blocker, ACE inhibitor and **lifestyle changes**, ideally through cardiac rehabilitation.

## Heart failure
In **heart failure** the heart cannot pump enough blood for the body's needs. Common causes are previous heart attack, high blood pressure and valve disease.
- **Left-sided failure**: blood backs up into the **lungs** – breathlessness, especially on exertion and lying flat (the patient sleeps on several pillows), night-time attacks of breathlessness and at worst **acute pulmonary oedema** with crackles and frothy sputum.
- **Right-sided failure**: blood backs up into the **body** – **ankle oedema**, weight gain, an enlarged liver and poor appetite.
- **Treatment**: diuretics, ACE inhibitor/angiotensin receptor blocker, beta blocker and newer drugs. **Daily weight**: a gain of more than about 2 kg over a few days may mean fluid retention. Patients often need **fluid restriction** and a low-salt diet.
- Severity is described by the **NYHA classification** (I: no symptoms – IV: symptoms at rest).

## Atrial fibrillation
**Atrial fibrillation** is the most common arrhythmia: the atria "quiver" chaotically, and the pulse becomes **irregular**, often fast. The patient may notice palpitations, fatigue and breathlessness – or nothing. The greatest danger is **stroke**, because blood can pool in the atrium and form clots. Most patients should therefore receive **anticoagulation**. Rate (beta blocker) or rhythm (cardioversion, ablation) is also treated.

## High blood pressure
**Hypertension** (usually 140/90 or higher on repeated measurements) rarely causes symptoms but raises the risk of stroke, heart attack, heart failure and kidney failure. Treatment is lifestyle change – less salt, more activity, weight loss, less alcohol, stopping smoking – and often drugs.

## Venous thrombosis
**Deep vein thrombosis** (DVT) causes swelling, pain and warmth in one leg. Pieces of the clot can break off and cause **pulmonary embolism** with sudden breathlessness, chest pain and a fast pulse. Risk rises with **immobility**, surgery, cancer and oral contraceptives. Prevention in hospital: early mobilisation, low-molecular-weight heparin and compression as prescribed.

> Chest pain = call 113 and get an ECG fast. Left failure → lungs. Right failure → oedema. Atrial fibrillation → stroke risk.`);

DEEP("SSYK", "Lungesykdommer",
`## KOLS
**Kronisk obstruktiv lungesykdom** (KOLS) er en kronisk betennelse i luftveiene og ødeleggelse av lungevev (**emfysem**) som gir **varig nedsatt luftstrøm**. Den viktigste årsaken er **røyking**; yrkeseksponering for støv og gasser bidrar også. Symptomene utvikler seg sakte: **tung pust ved anstrengelse**, hoste og slim, hyppige luftveisinfeksjoner.
- **Diagnose**: **spirometri** der forholdet FEV₁/FVC er under 0,7 etter bronkodilaterende medisin.
- **Behandling**: **røykeslutt** er det eneste som bremser sykdomsutviklingen. I tillegg inhalasjonsmedisiner (langtidsvirkende bronkodilaterende, ved behov inhalasjonssteroider), **fysisk aktivitet og lungerehabilitering**, influensa- og pneumokokkvaksine, og ved alvorlig sykdom langtids oksygenbehandling.
- **Akutt forverring** (eksaserbasjon), ofte utløst av infeksjon: mer tung pust, mer og mer misfarget slim. Behandles med bronkodilaterende på forstøver eller inhalator, kortikosteroider og eventuelt antibiotika.
- **Oksygen**: pasienter med risiko for CO₂-opphopning skal ofte ha et SpO₂-mål på **88–92 %**. For mye oksygen kan gi økende CO₂, sløvhet og respirasjonssvikt. Følg forordningen og observer bevissthet og respirasjon.
- **Sykepleie**: leppepust, sittende stilling med støtte for armene, energiøkonomisering, ernæring (mange har vekttap), angstdemping og god inhalasjonsteknikk.

## Astma
**Astma** er en kronisk betennelse i luftveiene som gir **anfall** av tung pust, piping og hoste. Til forskjell fra KOLS er obstruksjonen i stor grad **reversibel**. Utløsende faktorer er allergener (pollen, dyr, midd), infeksjoner, kald luft, anstrengelse og røyk.
- **Behandling**: **anfallsmedisin** (korttidsvirkende beta-2-agonist som salbutamol) og **forebyggende** inhalasjonssteroider. Et økende behov for anfallsmedisin betyr dårlig kontrollert astma.
- **Alvorlig anfall**: pasienten klarer ikke å snakke i hele setninger, bruker hjelpemuskulatur, har høy puls og fallende metning. Et «stille bryst» uten pipelyder er et **faretegn**. Ring etter hjelp.

## Inhalasjonsteknikk
Feil teknikk er en hovedårsak til dårlig effekt. Lær pasienten riktig teknikk for akkurat deres inhalator – **pulverinhalatorer** krever et kraftig og raskt innpust, mens **sprayinhalatorer** krever et langsomt innpust, gjerne med **inhalasjonskammer**. Etter inhalasjonssteroider skal munnen skylles for å forebygge sopp.

## Pneumoni
**Lungebetennelse** er en infeksjon i lungevevet, oftest forårsaket av bakterier (særlig pneumokokker) eller virus. Symptomene er **feber**, hoste, tung pust, brystsmerter som forverres ved innpust, og høy respirasjonsfrekvens. Hos **eldre** kan forvirring, fall og nedsatt allmenntilstand være de eneste tegnene. **CRB-65** brukes til å vurdere alvorlighet (forvirring, respirasjonsfrekvens ≥ 30, lavt blodtrykk, alder ≥ 65). Behandling: antibiotika – i Norge ofte penicillin – oksygen ved behov, væske og mobilisering. **Aspirasjonspneumoni** kan oppstå når mat eller oppkast havner i luftveiene, for eksempel ved svelgevansker.

## Lungeemboli
En blodpropp, oftest fra beinas vener, setter seg fast i lungearteriene. Symptomer: **plutselig tung pust**, brystsmerter, høy puls, lav metning og i alvorlige tilfeller sjokk. Behandlingen er antikoagulasjon, og ved store propper trombolyse.

## Lungekreft
Lungekreft er den kreftformen som tar flest liv i Norge. Rundt 80–90 % av tilfellene skyldes røyking. Symptomene – langvarig hoste, blodig oppspytt, vekttap, tung pust – kommer ofte sent.

## Sykepleierens observasjoner
Respirasjonsfrekvens, SpO₂, pustearbeid og stilling, hudfarge, hoste og **oppspytt** (mengde, farge, lukt), temperatur, bevissthet og angst. Hjelp pasienten til **gode stillinger**, slimmobilisering og mobilisering.

> KOLS: varig obstruksjon, røykeslutt viktigst, ofte SpO₂-mål 88–92 %. Astma: reversibel, anfallsmedisin + forebyggende. Stille bryst = fare.`,
`## COPD
**Chronic obstructive pulmonary disease** (COPD) is chronic airway inflammation and destruction of lung tissue (**emphysema**) causing **permanently reduced airflow**. The main cause is **smoking**; occupational exposure to dust and fumes also contributes. Symptoms develop slowly: **breathlessness on exertion**, cough and phlegm, frequent chest infections.
- **Diagnosis**: **spirometry** with an FEV₁/FVC ratio below 0.7 after a bronchodilator.
- **Treatment**: **stopping smoking** is the only thing that slows progression. In addition inhaled medicines (long-acting bronchodilators, inhaled steroids when indicated), **physical activity and pulmonary rehabilitation**, influenza and pneumococcal vaccines, and in severe disease long-term oxygen therapy.
- **Acute exacerbation**, often triggered by infection: more breathlessness, more and discoloured sputum. Treated with bronchodilators by nebuliser or inhaler, corticosteroids and possibly antibiotics.
- **Oxygen**: patients at risk of CO₂ retention often have an SpO₂ target of **88–92 %**. Too much oxygen can raise CO₂ and cause drowsiness and respiratory failure. Follow the prescription and observe consciousness and breathing.
- **Nursing**: pursed-lip breathing, sitting upright with arm support, energy conservation, nutrition (many lose weight), reducing anxiety and good inhaler technique.

## Asthma
**Asthma** is chronic airway inflammation causing **attacks** of breathlessness, wheeze and cough. Unlike COPD, the obstruction is largely **reversible**. Triggers include allergens (pollen, animals, mites), infections, cold air, exercise and smoke.
- **Treatment**: **reliever** medication (a short-acting beta-2 agonist such as salbutamol) and **preventer** inhaled steroids. Increasing use of reliever means poorly controlled asthma.
- **Severe attack**: the patient cannot speak in full sentences, uses accessory muscles, has a high pulse and falling saturation. A "silent chest" without wheeze is a **danger sign**. Call for help.

## Inhaler technique
Poor technique is a major reason for poor effect. Teach the right technique for the patient's own inhaler – **dry powder inhalers** need a strong, fast breath in, while **aerosol inhalers** need a slow breath in, ideally with a **spacer**. After inhaled steroids the mouth should be rinsed to prevent thrush.

## Pneumonia
**Pneumonia** is an infection of lung tissue, most often caused by bacteria (especially pneumococci) or viruses. Symptoms are **fever**, cough, breathlessness, chest pain worse on breathing in, and a high respiratory rate. In **older people**, confusion, falls and general decline may be the only signs. **CRB-65** is used to assess severity (confusion, respiratory rate ≥ 30, low blood pressure, age ≥ 65). Treatment: antibiotics – in Norway often penicillin – oxygen when needed, fluids and mobilisation. **Aspiration pneumonia** can occur when food or vomit enters the airways, for example with swallowing problems.

## Pulmonary embolism
A blood clot, usually from the leg veins, lodges in the pulmonary arteries. Symptoms: **sudden breathlessness**, chest pain, fast pulse, low saturation and in severe cases shock. Treatment is anticoagulation, and thrombolysis for large clots.

## Lung cancer
Lung cancer is the cancer that kills the most people in Norway. Around 80–90 % of cases are caused by smoking. The symptoms – persistent cough, coughing up blood, weight loss, breathlessness – often appear late.

## Nursing observations
Respiratory rate, SpO₂, work of breathing and posture, skin colour, cough and **sputum** (amount, colour, smell), temperature, consciousness and anxiety. Help the patient into **good positions**, with airway clearance and mobilisation.

> COPD: permanent obstruction, stopping smoking matters most, often an SpO₂ target of 88–92 %. Asthma: reversible, reliever + preventer. A silent chest = danger.`);

DEEP("SSYK", "Diabetes",
`## To hovedtyper
- **Type 1-diabetes**: en **autoimmun** sykdom der immunforsvaret ødelegger de insulinproduserende betacellene. Debuterer oftest hos barn og unge, ofte raskt med tørste, store urinmengder, vekttap og slapphet. Pasienten er helt avhengig av **insulin** livet ut.
- **Type 2-diabetes**: kroppen blir **mindre følsom for insulin** (insulinresistens), og produksjonen av insulin blir etter hvert utilstrekkelig. Sterkt knyttet til **overvekt**, fysisk inaktivitet og arv. Utvikler seg langsomt og oppdages ofte tilfeldig. Utgjør det store flertallet av tilfellene.
- I tillegg finnes blant annet **svangerskapsdiabetes**.

## Diagnose
Diabetes diagnostiseres med **HbA1c ≥ 48 mmol/mol**, fastende glukose **≥ 7,0 mmol/l** eller tilfeldig glukose **≥ 11,1 mmol/l** med typiske symptomer. **HbA1c** viser gjennomsnittlig blodsukker de siste 2–3 månedene og brukes også til å følge behandlingen; et vanlig mål er omkring 53 mmol/mol, men det tilpasses den enkelte.

## Behandling
- **Livsstil**: sunt kosthold, regelmessig fysisk aktivitet og vektreduksjon kan bedre type 2-diabetes betydelig.
- **Tabletter og injeksjoner** ved type 2: **metformin** er førstevalg; nyere midler (SGLT2-hemmere, GLP-1-analoger) beskytter også hjerte og nyrer.
- **Insulin**: **hurtigvirkende** til måltidene og **langtidsvirkende** som basisinsulin, med penn eller **insulinpumpe**. Insulin settes **subkutant** i mage eller lår, og injeksjonsstedet skal varieres for å unngå fettknuter (lipohypertrofi), som gir ujevnt opptak.
- Blodsukkermåling med fingerstikk eller **kontinuerlig glukosemåler** (CGM).

## Hypoglykemi – føling
**Lavt blodsukker** (under ca. 4 mmol/l) er den vanligste akutte komplikasjonen hos insulinbehandlede. Årsaker: for mye insulin, for lite mat, mer aktivitet enn vanlig, alkohol. Symptomer: **svette, skjelving, hjertebank, sult**, deretter uklarhet, irritabilitet, unormal oppførsel, kramper og bevisstløshet. Kan forveksles med beruselse.
- **Våken pasient**: gi raske karbohydrater – **15–20 g druesukker** eller sukkerholdig drikke – mål på nytt etter 15 minutter, og gi deretter et måltid.
- **Bevisstløs pasient**: **ingenting i munnen**. Legg i stabilt sideleie, ring 113, gi **glukagon** eller intravenøs glukose etter prosedyre.

## Hyperglykemi og ketoacidose
**Høyt blodsukker** gir tørste, store urinmengder, slapphet og dehydrering. Ved insulinmangel (særlig type 1) kan kroppen begynne å forbrenne fett og danne **ketoner**: **diabetisk ketoacidose** – kvalme, oppkast, magesmerter, **acetonlukt** av ånden, dyp og rask pust (**Kussmaul**) og nedsatt bevissthet. Det er en livstruende tilstand som krever sykehusbehandling med væske, insulin og kalium. Ved type 2 kan det oppstå et **hyperosmolært** hyperglykemisk syndrom med svært høyt blodsukker og alvorlig dehydrering, særlig hos eldre.

## Senkomplikasjoner
Høyt blodsukker over år skader blodårene:
- **små kar**: øyne (**retinopati** – årlige øyekontroller), nyrer (**nefropati** – urinprøve for albumin) og nerver (**nevropati** – nedsatt følelse i føttene)
- **store kar**: økt risiko for hjerteinfarkt, hjerneslag og dårlig sirkulasjon i beina

**Diabetesfoten** – sår på føttene som ikke merkes på grunn av nevropati og gror dårlig på grunn av dårlig sirkulasjon – kan i verste fall føre til amputasjon. Daglig inspeksjon av føttene, godt fottøy og fotterapeut forebygger.

## Sykepleierens rolle
Opplæring og mestring står sentralt: insulinteknikk, blodsukkermåling, tiltak ved føling, sykedagsregler, kosthold og fotstell. Ved sykdom, faste og operasjoner må diabetesbehandlingen ofte justeres – følg lokale prosedyrer og legens forordning.

> Type 1: insulinmangel, autoimmun. Type 2: insulinresistens. Føling: sukker hvis våken – glukagon/113 hvis bevisstløs. Se på føttene!`,
`## Two main types
- **Type 1 diabetes**: an **autoimmune** disease in which the immune system destroys the insulin-producing beta cells. It usually starts in children and young people, often rapidly with thirst, large urine volumes, weight loss and fatigue. The patient depends on **insulin** for life.
- **Type 2 diabetes**: the body becomes **less sensitive to insulin** (insulin resistance), and insulin production eventually becomes insufficient. Strongly linked to **overweight**, physical inactivity and family history. It develops slowly and is often found by chance. It makes up the great majority of cases.
- There is also **gestational diabetes**, among others.

## Diagnosis
Diabetes is diagnosed with **HbA1c ≥ 48 mmol/mol**, fasting glucose **≥ 7.0 mmol/L** or random glucose **≥ 11.1 mmol/L** with typical symptoms. **HbA1c** reflects average blood glucose over the past 2–3 months and is also used to monitor treatment; a common target is around 53 mmol/mol, but it is individualised.

## Treatment
- **Lifestyle**: a healthy diet, regular physical activity and weight loss can improve type 2 diabetes considerably.
- **Tablets and injections** in type 2: **metformin** is first choice; newer drugs (SGLT2 inhibitors, GLP-1 analogues) also protect the heart and kidneys.
- **Insulin**: **rapid-acting** with meals and **long-acting** as basal insulin, by pen or **insulin pump**. Insulin is injected **subcutaneously** into the abdomen or thigh, and injection sites should be rotated to avoid fatty lumps (lipohypertrophy), which cause uneven absorption.
- Glucose monitoring by finger prick or **continuous glucose monitor** (CGM).

## Hypoglycaemia
**Low blood glucose** (below about 4 mmol/L) is the most common acute complication in insulin-treated patients. Causes: too much insulin, too little food, more activity than usual, alcohol. Symptoms: **sweating, trembling, palpitations, hunger**, then confusion, irritability, abnormal behaviour, seizures and unconsciousness. It can be mistaken for drunkenness.
- **Conscious patient**: give fast carbohydrates – **15–20 g of glucose** or a sugary drink – recheck after 15 minutes, then give a meal.
- **Unconscious patient**: **nothing by mouth**. Recovery position, call 113, give **glucagon** or IV glucose according to procedure.

## Hyperglycaemia and ketoacidosis
**High blood glucose** causes thirst, large urine volumes, fatigue and dehydration. With insulin deficiency (especially type 1) the body may start burning fat and producing **ketones**: **diabetic ketoacidosis** – nausea, vomiting, abdominal pain, **acetone breath**, deep rapid breathing (**Kussmaul**) and reduced consciousness. It is life-threatening and needs hospital treatment with fluids, insulin and potassium. In type 2 a **hyperosmolar** hyperglycaemic state can develop, with very high glucose and severe dehydration, especially in older people.

## Long-term complications
Years of high blood glucose damage blood vessels:
- **small vessels**: eyes (**retinopathy** – annual eye checks), kidneys (**nephropathy** – urine test for albumin) and nerves (**neuropathy** – reduced sensation in the feet)
- **large vessels**: higher risk of heart attack, stroke and poor circulation in the legs

**The diabetic foot** – ulcers that go unnoticed because of neuropathy and heal poorly because of poor circulation – can at worst lead to amputation. Daily foot inspection, good footwear and a podiatrist help prevent it.

## The nurse's role
Education and self-management are central: insulin technique, glucose monitoring, managing hypos, sick-day rules, diet and foot care. During illness, fasting and surgery diabetes treatment often needs adjusting – follow local procedures and the doctor's prescription.

> Type 1: insulin deficiency, autoimmune. Type 2: insulin resistance. Hypo: sugar if conscious – glucagon/113 if unconscious. Check the feet!`);

DEEP("SSYK", "Infeksjoner og sepsis",
`## Kroppens forsvar
Når mikrober trenger inn, reagerer kroppen med **betennelse** (inflammasjon). De klassiske tegnene er **rødhet, varme, hevelse, smerte og nedsatt funksjon**. Det **medfødte immunforsvaret** reagerer raskt og uspesifikt (hud, slimhinner, fagocytter, komplement, feber), mens det **ervervede** (lymfocytter og antistoffer) er spesifikt og har **hukommelse** – grunnlaget for vaksiner.

**Feber** er et styrt forsvar: hypothalamus hever settpunktet. Feber øker væske- og energibehovet og pulsen. Typiske laboratoriefunn ved bakteriell infeksjon er forhøyet **CRP** (stiger i løpet av det første døgnet) og **leukocytter**.

## Vanlige infeksjoner
- **Urinveisinfeksjon**: svie, hyppig vannlating, smerter over blæren. Med feber og flankesmerter kan det være **nyrebekkenbetennelse**. Urinkateter øker risikoen kraftig – fjern det så snart det ikke trengs.
- **Lungebetennelse**: se Lungesykdommer.
- **Hud- og bløtdelsinfeksjoner**: **cellulitt** (rødt, varmt, hovent område som brer seg), sårinfeksjoner. Marker kanten med penn for å følge utviklingen.
- **Gastroenteritt**: oppkast og diaré, ofte virus (norovirus). Faren er **dehydrering**.
- **Infeksjoner relatert til utstyr**: venekanyler og sentrale venekatetre kan gi blodbaneinfeksjon – inspiser innstikkstedet daglig, og fjern utstyr som ikke er nødvendig.

## Hva er sepsis?
**Sepsis** er **livstruende organsvikt** forårsaket av en **ubalansert respons** på en infeksjon. Det er altså ikke bakteriene i seg selv, men kroppens overreaksjon som skader organene: blodårene lekker og utvider seg, blodtrykket faller, og organene får for lite oksygen. **Septisk sjokk** er sepsis med vedvarende lavt blodtrykk tross væske, og med høy dødelighet.

**Hvem er utsatt?** Eldre, de aller yngste, personer med kronisk sykdom, nedsatt immunforsvar (cellegift, immundempende behandling), diabetes, nylig operasjon eller innlagt utstyr.

## Tidlige tegn
Sepsis kan utvikle seg på timer. Se etter
- **høy respirasjonsfrekvens** (ofte det første tegnet)
- **høy puls** og **lavt blodtrykk**
- **ny forvirring** eller endret bevissthet
- feber **eller lav temperatur**, frysninger
- **lite urin**
- marmorert, kald hud eller forlenget kapillærfylning
- pasienten «ser syk ut» eller sier selv at hun eller han aldri har følt seg så dårlig

**qSOFA** gir et poeng for respirasjonsfrekvens ≥ 22, endret mental status og systolisk blodtrykk ≤ 100; to eller flere poeng ved mistenkt infeksjon tyder på høy risiko. **NEWS2 ≥ 5** hos en pasient med mulig infeksjon skal også utløse rask legevurdering.

## Behandling – tid er avgjørende
Ved mistanke om sepsis skal lege tilkalles **umiddelbart**. Hver time med forsinket antibiotikabehandling øker dødeligheten. Typiske tiltak den første timen:
1. **Blodkulturer** (og andre prøver) **før** antibiotika – men ikke slik at antibiotika forsinkes.
2. **Bredspektret intravenøs antibiotika** så raskt som mulig, helst innen én time.
3. **Laktat** måles: høyt laktat tyder på oksygenmangel i vevet.
4. **Intravenøs væske** ved lavt blodtrykk eller høyt laktat.
5. **Oksygen** ved lav metning.
6. **Diurese** måles, ofte med kateter.
7. Finn og behandle **infeksjonskilden** (drenere abscess, fjerne infisert kateter).

## Eldre pasienter
Hos eldre er infeksjonstegnene ofte **atypiske**: de får ikke alltid feber, men blir **forvirret**, faller, slutter å spise og drikke eller blir «ikke seg selv». Pårørendes beskrivelse av endring er verdifull. Tenk infeksjon ved akutt funksjonsfall.

> Sepsis = infeksjon + organsvikt. Høy respirasjonsfrekvens, ny forvirring og lavt blodtrykk: tilkall lege nå. Antibiotika innen én time.`,
`## The body's defences
When microbes invade, the body responds with **inflammation**. The classic signs are **redness, heat, swelling, pain and loss of function**. The **innate immune system** reacts quickly and non-specifically (skin, mucous membranes, phagocytes, complement, fever), while the **adaptive** system (lymphocytes and antibodies) is specific and has **memory** – the basis of vaccines.

**Fever** is a controlled defence: the hypothalamus raises the set point. Fever increases fluid and energy needs and the pulse. Typical lab findings in bacterial infection are raised **CRP** (rising during the first day) and **white cell count**.

## Common infections
- **Urinary tract infection**: burning, frequent urination, pain over the bladder. With fever and flank pain it may be **pyelonephritis**. A urinary catheter raises the risk greatly – remove it as soon as it is no longer needed.
- **Pneumonia**: see Lung diseases.
- **Skin and soft tissue infections**: **cellulitis** (a red, warm, swollen area that spreads), wound infections. Mark the edge with a pen to follow progress.
- **Gastroenteritis**: vomiting and diarrhoea, often viral (norovirus). The danger is **dehydration**.
- **Device-related infections**: cannulas and central lines can cause bloodstream infection – inspect the insertion site daily, and remove devices that are not needed.

## What is sepsis?
**Sepsis** is **life-threatening organ dysfunction** caused by a **dysregulated response** to infection. It is not the bacteria themselves but the body's overreaction that damages the organs: vessels leak and dilate, blood pressure falls and the organs get too little oxygen. **Septic shock** is sepsis with persistent low blood pressure despite fluids, and has high mortality.

**Who is at risk?** Older people, the very young, people with chronic disease, weakened immunity (chemotherapy, immunosuppressants), diabetes, recent surgery or indwelling devices.

## Early signs
Sepsis can develop over hours. Look for
- **a high respiratory rate** (often the first sign)
- **a high pulse** and **low blood pressure**
- **new confusion** or altered consciousness
- fever **or low temperature**, rigors
- **low urine output**
- mottled, cold skin or prolonged capillary refill
- the patient "looks ill" or says they have never felt so unwell

**qSOFA** gives a point each for respiratory rate ≥ 22, altered mental status and systolic blood pressure ≤ 100; two or more points with suspected infection suggest high risk. **NEWS2 ≥ 5** in a patient with possible infection should also trigger a prompt medical review.

## Treatment – time is critical
If sepsis is suspected, call a doctor **immediately**. Every hour of delay in antibiotics increases mortality. Typical actions in the first hour:
1. **Blood cultures** (and other samples) **before** antibiotics – but not so that antibiotics are delayed.
2. **Broad-spectrum IV antibiotics** as soon as possible, ideally within one hour.
3. Measure **lactate**: a high lactate suggests oxygen shortage in the tissues.
4. **IV fluids** for low blood pressure or high lactate.
5. **Oxygen** for low saturation.
6. Measure **urine output**, often with a catheter.
7. Find and treat the **source of infection** (drain an abscess, remove an infected line).

## Older patients
In older people the signs of infection are often **atypical**: they do not always get fever but become **confused**, fall, stop eating and drinking or are "not themselves". Relatives' description of change is valuable. Think infection with any acute loss of function.

> Sepsis = infection + organ dysfunction. High respiratory rate, new confusion and low blood pressure: call a doctor now. Antibiotics within one hour.`);

DEEP("SSYK", "Hjerneslag og nevrologi",
`## Hjerneslag
Et **hjerneslag** oppstår når blodtilførselen til en del av hjernen stopper, og hjernecellene begynner å dø i løpet av minutter. Det finnes to hovedtyper:
- **Hjerneinfarkt** (ca. 85–90 %): en **blodpropp** tetter en arterie – enten dannet lokalt på grunn av aterosklerose, eller kommet fra hjertet (ofte ved **atrieflimmer**).
- **Hjerneblødning** (ca. 10–15 %): en blodåre brister, ofte på grunn av høyt blodtrykk.

Symptomene avhenger av hvilket område som rammes, og kommer **plutselig**:
- **lammelse eller nummenhet** i den ene siden av ansiktet, i en arm eller et bein (motsatt side av skaden)
- **talevansker** – utydelig tale eller vansker med å finne ord og forstå (**afasi**)
- synsforstyrrelser, svimmelhet, balanseproblemer, plutselig kraftig hodepine (særlig ved blødning)

Kampanjen **«Prate – Smile – Løfte»** hjelper folk å kjenne igjen slag: be personen si en setning, smile og løfte begge armene. Ved utfall: **ring 113 med én gang**.

## Behandling – tid er hjerne
For hvert minutt uten blodtilførsel dør millioner av nerveceller. Derfor:
- **CT eller MR** av hodet så raskt som mulig for å skille infarkt fra blødning – det avgjør behandlingen.
- **Trombolyse** (proppløsende medisin) kan gis ved hjerneinfarkt innen omtrent **4,5 timer** etter symptomstart. Store propper kan fjernes mekanisk med **trombektomi**.
- Ved blødning er blodfortynnende behandling farlig; blodtrykket senkes, og noen må opereres.
- Behandling i **slagenhet** med tverrfaglig team gir lavere dødelighet og bedre funksjon.

## TIA
Et **TIA** (transitorisk iskemisk anfall, «drypp») gir samme typer symptomer, men de går over, ofte i løpet av minutter. Det er et **varsel**: risikoen for et fullt hjerneslag de nærmeste dagene er høy. Pasienten skal **utredes akutt**.

## Sykepleie etter hjerneslag
- **Svelgtest før mat og drikke**: mange har **svelgevansker** (dysfagi) og risiko for **aspirasjonspneumoni**. Tilpass konsistens og sittestilling.
- **Tidlig mobilisering** og riktig leiring av den lammede siden; forebygg skulderproblemer, trykksår og trombose.
- **Afasi**: snakk rolig, bruk korte setninger, ja/nei-spørsmål og bilder, og gi tid. Pasienten forstår ofte mer enn hun eller han klarer å uttrykke.
- **Neglekt**: pasienten overser den ene siden av kroppen og rommet (oftest venstre ved skade i høyre hjernehalvdel). Plasser ting og kom fra den siden for å trene oppmerksomheten.
- Følg **blodsukker**, temperatur og blodtrykk – feber og høyt blodsukker forverrer hjerneskaden.
- Mange får **depresjon** og tretthet (fatigue). Rehabilitering er et langt løp med fysioterapeut, ergoterapeut og logoped.
- **Sekundærforebygging**: blodtrykksbehandling, platehemmer eller antikoagulasjon, statin, røykeslutt og aktivitet.

## Andre nevrologiske tilstander
- **Epilepsi**: gjentatte anfall forårsaket av unormal elektrisk aktivitet i hjernen. Ved **krampeanfall**: hindre skade, ikke legge noe i munnen, notere tiden, og legge personen i **stabilt sideleie** når krampene har gitt seg. Anfall som varer over **5 minutter** eller kommer tett etter hverandre uten at personen våkner (status epilepticus), krever akutt behandling – ring 113.
- **Parkinsons sykdom**: mangel på dopamin gir **skjelving i hvile**, stivhet, langsomme bevegelser og balanseproblemer. Medisinene må gis **til riktig tid**; forsinkelse kan gi store plager.
- **Demens**: varig svikt i hukommelse og andre kognitive funksjoner som påvirker dagliglivet. Alzheimers sykdom er vanligst. Personsentrert omsorg, faste rutiner og ro.
- **Delirium** (akutt forvirring): oppstår **plutselig**, svinger gjennom døgnet og skyldes en somatisk årsak – infeksjon, legemidler, dehydrering, smerter, urinretensjon. Vanlig hos eldre i sykehus. Finn og behandle årsaken; delirium er en medisinsk nødsituasjon, ikke «bare alderdom».

> Prate – Smile – Løfte: ring 113. Tid er hjerne. Svelgtest før mat. Akutt forvirring = delirium til det motsatte er bevist.`,
`## Stroke
A **stroke** happens when the blood supply to part of the brain stops, and brain cells start dying within minutes. There are two main types:
- **Ischaemic stroke** (about 85–90 %): a **blood clot** blocks an artery – either formed locally due to atherosclerosis, or coming from the heart (often in **atrial fibrillation**).
- **Haemorrhagic stroke** (about 10–15 %): a blood vessel bursts, often due to high blood pressure.

The symptoms depend on the area affected and come on **suddenly**:
- **weakness or numbness** on one side of the face, an arm or a leg (the opposite side to the damage)
- **speech problems** – slurred speech or difficulty finding words and understanding (**aphasia**)
- visual disturbance, dizziness, balance problems, sudden severe headache (especially with haemorrhage)

The Norwegian campaign **"Talk – Smile – Lift"** (similar to FAST) helps people recognise stroke: ask the person to say a sentence, smile and lift both arms. If there is a deficit: **call 113 at once**.

## Treatment – time is brain
For every minute without blood supply, millions of nerve cells die. Therefore:
- **CT or MRI** of the head as quickly as possible to distinguish infarction from haemorrhage – this decides the treatment.
- **Thrombolysis** (clot-dissolving drugs) can be given for ischaemic stroke within about **4.5 hours** of symptom onset. Large clots can be removed mechanically by **thrombectomy**.
- In haemorrhage, anticoagulant treatment is dangerous; blood pressure is lowered, and some patients need surgery.
- Treatment in a **stroke unit** with a multidisciplinary team gives lower mortality and better function.

## TIA
A **TIA** (transient ischaemic attack, "mini-stroke") causes the same kinds of symptoms, but they resolve, often within minutes. It is a **warning**: the risk of a full stroke in the next few days is high. The patient must be **assessed urgently**.

## Nursing after stroke
- **Swallow screen before food and drink**: many have **swallowing difficulties** (dysphagia) and a risk of **aspiration pneumonia**. Adapt texture and sitting position.
- **Early mobilisation** and correct positioning of the paralysed side; prevent shoulder problems, pressure ulcers and thrombosis.
- **Aphasia**: speak calmly, use short sentences, yes/no questions and pictures, and give time. The patient often understands more than they can express.
- **Neglect**: the patient ignores one side of the body and room (usually the left after right-hemisphere damage). Place things and approach from that side to train attention.
- Monitor **blood glucose**, temperature and blood pressure – fever and high glucose worsen brain injury.
- Many develop **depression** and fatigue. Rehabilitation is a long process with physiotherapist, occupational therapist and speech therapist.
- **Secondary prevention**: blood pressure treatment, antiplatelet or anticoagulant, statin, stopping smoking and activity.

## Other neurological conditions
- **Epilepsy**: recurrent seizures caused by abnormal electrical activity in the brain. During a **seizure**: prevent injury, put nothing in the mouth, note the time, and place the person in the **recovery position** once the convulsions stop. Seizures lasting over **5 minutes** or repeated without the person waking (status epilepticus) need emergency treatment – call 113.
- **Parkinson's disease**: lack of dopamine causes **resting tremor**, stiffness, slow movements and balance problems. Medication must be given **on time**; delays can cause severe symptoms.
- **Dementia**: lasting decline in memory and other cognitive functions affecting daily life. Alzheimer's disease is the most common. Person-centred care, fixed routines and calm.
- **Delirium** (acute confusion): comes on **suddenly**, fluctuates during the day and has a physical cause – infection, drugs, dehydration, pain, urinary retention. Common in older hospital patients. Find and treat the cause; delirium is a medical emergency, not "just old age".

> Talk – Smile – Lift: call 113. Time is brain. Swallow screen before food. Acute confusion = delirium until proven otherwise.`);

// ================= LOV, ETIKK OG KOMMUNIKASJON =================
DEEP("SLOV", "Helsepersonelloven og taushetsplikt",
`## Formålet med loven
**Helsepersonelloven** (1999) skal bidra til **sikkerhet for pasienter**, **kvalitet** i helsetjenesten og **tillit** til helsepersonell. Den gjelder alt helsepersonell – også studenter i praksis og ansatte uten autorisasjon som yter helsehjelp.

## Krav til forsvarlighet (§ 4)
Den sentrale plikten er at helsepersonell skal utføre arbeidet sitt i samsvar med de krav til **faglig forsvarlighet og omsorgsfull hjelp** som kan forventes ut fra kvalifikasjoner, arbeidets karakter og situasjonen ellers. Det innebærer blant annet å
- kjenne **sine egne faglige begrensninger** og innhente bistand eller henvise pasienten når det trengs
- holde seg **faglig oppdatert**
- følge lover, forskrifter, faglige retningslinjer og lokale prosedyrer

Forsvarlighet er en **rettslig standard**: innholdet endres i takt med faget. Det er ikke krav om det beste, men om det som er godt nok.

## Øyeblikkelig hjelp (§ 7)
Helsepersonell skal straks gi den helsehjelpen de evner når det må antas at hjelpen er **påtrengende nødvendig**. Plikten gjelder også utenfor jobb – for eksempel ved en trafikkulykke.

## Taushetsplikt (§ 21)
Helsepersonell skal hindre at andre får adgang til eller kjennskap til opplysninger om folks **legems- eller sykdomsforhold** eller andre **personlige forhold** som de får vite om i egenskap av å være helsepersonell. Taushetsplikten omfatter også **at en person er pasient**. Den er både en plikt til å **tie** og en plikt til å **hindre** at andre får tilgang – for eksempel ved ikke å la journaler ligge framme eller snakke om pasienter i heisen.

**Snokeforbudet** (§ 21 a): det er forbudt å lese i journaler til pasienter du ikke har et tjenstlig behov for – også familiemedlemmer, kjente og deg selv i jobbsammenheng. Alle oppslag logges.

## Unntak fra taushetsplikten
- **Samtykke** fra pasienten (§ 22).
- Opplysningene er **kjent** fra før, eller det ikke er behov for beskyttelse (§ 23).
- **Samarbeidende personell** kan få opplysninger når det er nødvendig for å gi forsvarlig helsehjelp, med mindre pasienten motsetter seg det (§ 25).
- **Nødrett**: når det er nødvendig for å avverge alvorlig skade på person eller eiendom (§ 23 nr. 4).
- **Opplysningsplikt** går foran taushetsplikten i flere tilfeller:
  - til **barnevernet** når det er grunn til å tro at et barn blir mishandlet, utsatt for alvorlig omsorgssvikt eller har alvorlige atferdsvansker (§ 33)
  - til **politiet** og andre for å **avverge alvorlige straffbare handlinger** (avvergingsplikten i straffeloven § 196)
  - til **politiet** ved dødsfall som kan være unaturlige (§ 36), og varsel om alvorlige hendelser
- Melding til **Statens vegvesen** eller lege når en pasient med førerkort ikke oppfyller helsekravene (gjelder særlig leger).

## Dokumentasjonsplikt (§§ 39–40)
Den som yter helsehjelp, skal føre **journal** med relevante og nødvendige opplysninger om pasienten og helsehjelpen. Journalen skal være **nøyaktig, sannferdig og forståelig**, og føres fortløpende.

## Andre plikter
- **Ikke motta gaver** eller ytelser som kan påvirke tjenesteutøvelsen (§ 9).
- **Informere** pasienter og pårørende (§ 10).
- **Melde** om alvorlige hendelser og om forhold som kan medføre fare for pasientsikkerheten (§ 17).
- Ikke være **ruspåvirket** i arbeid (§ 8).

## Tilsyn og reaksjoner
**Statsforvalteren** og **Statens helsetilsyn** fører tilsyn. Ved brudd kan helsepersonell få en **advarsel**, eller **autorisasjonen kan begrenses eller kalles tilbake** – for eksempel ved grov uforsvarlighet, rusmisbruk eller seksuelle overgrep mot pasienter.

> Forsvarlig, omsorgsfull, innenfor egne grenser. Taushetsplikt – men opplysningsplikt går foran når barn eller liv er i fare.`,
`## The purpose of the Act
The **Health Personnel Act** (1999) is meant to promote **patient safety**, **quality** in health services and **trust** in health personnel. It applies to all health personnel – including students on placement and unlicensed staff providing health care.

## The duty of professional responsibility (section 4)
The central duty is that health personnel must work according to the requirements of **professional soundness and caring help** that can be expected given their qualifications, the nature of the work and the situation. This includes
- knowing **their own professional limits** and getting help or referring the patient when needed
- keeping **professionally up to date**
- following laws, regulations, professional guidelines and local procedures

Professional soundness is a **legal standard**: its content changes as the profession develops. It does not require the best, but what is good enough.

## Emergency help (section 7)
Health personnel must immediately give the help they can when it must be assumed that help is **urgently necessary**. The duty applies off duty as well – for example at a road accident.

## Confidentiality (section 21)
Health personnel must prevent others from gaining access to or knowledge of information about people's **physical or medical condition** or other **personal matters** that they learn of in their capacity as health personnel. Confidentiality also covers **the fact that someone is a patient**. It is both a duty to **keep silent** and a duty to **prevent** access – for example not leaving records open or discussing patients in the lift.

**The ban on snooping** (section 21 a): it is forbidden to read the records of patients you have no work-related need to see – including family members, acquaintances and yourself in a work context. All look-ups are logged.

## Exceptions to confidentiality
- **Consent** from the patient (section 22).
- The information is already **known**, or there is no need for protection (section 23).
- **Cooperating personnel** may receive information when necessary to provide sound care, unless the patient objects (section 25).
- **Necessity**: when it is necessary to prevent serious harm to persons or property (section 23 no. 4).
- A **duty to disclose** overrides confidentiality in several cases:
  - to **child welfare services** when there is reason to believe a child is being abused, seriously neglected or has serious behavioural problems (section 33)
  - to the **police** and others to **prevent serious crimes** (the duty to avert in section 196 of the Penal Code)
  - to the **police** for deaths that may be unnatural (section 36), and notification of serious incidents
- Reporting to the **Public Roads Administration** when a patient with a driving licence does not meet the health requirements (mainly a duty for doctors).

## Duty to document (sections 39–40)
Anyone providing health care must keep a **record** with relevant and necessary information about the patient and the care. The record must be **accurate, truthful and understandable**, and kept up to date.

## Other duties
- **Not accept gifts** or benefits that may influence the service (section 9).
- **Inform** patients and relatives (section 10).
- **Report** serious incidents and conditions that may endanger patient safety (section 17).
- Not be **under the influence** at work (section 8).

## Supervision and sanctions
The **county governor** and the **Norwegian Board of Health Supervision** supervise. For breaches, health personnel may receive a **warning**, or their **licence may be limited or revoked** – for example for gross negligence, substance abuse or sexual abuse of patients.

> Sound, caring, within your limits. Confidentiality – but the duty to disclose comes first when children or lives are at risk.`);

DEEP("SLOV", "Pasientrettigheter og samtykke",
`## Pasient- og brukerrettighetsloven
**Pasient- og brukerrettighetsloven** (1999) gir pasienter og brukere rettigheter overfor helse- og omsorgstjenesten. Formålet er å sikre lik tilgang til tjenester av god kvalitet, fremme **tillit** og ivareta **respekten for den enkeltes liv, integritet og menneskeverd**.

## De viktigste rettighetene
- **Rett til nødvendig helsehjelp** fra kommunen (fastlege, legevakt, hjemmesykepleie, sykehjem) og fra spesialisthelsetjenesten (sykehus). Henviste pasienter skal få vurdert retten til helsehjelp, og de som har rett, får en **juridisk frist** for når helsehjelpen senest skal gis.
- **Fritt behandlingsvalg**: pasienten kan velge hvilket sykehus eller behandlingssted som skal utføre behandlingen.
- **Rett til medvirkning** (§ 3-1): pasienten har rett til å medvirke ved valg mellom tilgjengelige, forsvarlige undersøkelses- og behandlingsmetoder. Formen tilpasses evnen til å gi og motta informasjon.
- **Rett til informasjon** (§ 3-2): pasienten skal ha den informasjonen som er nødvendig for å få innsikt i sin helsetilstand og innholdet i helsehjelpen, og informeres om mulige risikoer og bivirkninger – og om eventuelle **skader og alvorlige komplikasjoner**. Informasjonen skal være **tilpasset** mottakerens forutsetninger (alder, modenhet, erfaring, kultur- og språkbakgrunn), om nødvendig med **kvalifisert tolk**.
- **Rett til innsyn i journal** (§ 5-1) og til å få feil rettet.
- **Rett til en koordinator** og **individuell plan** ved behov for langvarige og koordinerte tjenester.
- **Barns særlige rettigheter**, blant annet til å bli hørt og til opplæring under sykehusopphold.

## Samtykke – hovedregelen
**Helsehjelp kan bare gis med pasientens samtykke** (§ 4-1), med mindre det finnes lovhjemmel eller annet gyldig rettsgrunnlag. Et gyldig samtykke forutsetter at pasienten har fått **nødvendig informasjon** om sin helsetilstand og om helsehjelpen. Samtykket kan være **uttrykkelig** (muntlig eller skriftlig) eller **stilltiende** – for eksempel når pasienten rekker fram armen for blodprøve. Pasienten kan **trekke tilbake** samtykket når som helst.

**Myndige pasienter kan nekte helsehjelp** – også livsnødvendig hjelp i noen situasjoner, for eksempel en døende pasient som nekter livsforlengende behandling, eller nektelse av blodoverføring av alvorlig overbevisning (§ 4-9). Helsepersonell skal sørge for at pasienten har fått god informasjon om konsekvensene.

## Samtykkekompetanse
- Den **helserettslige myndighetsalderen** er **16 år** (§ 4-3). Barn mellom 12 og 16 år har rett til å bli hørt, og deres mening skal tillegges økende vekt med alder og modenhet. Foreldrene samtykker vanligvis for barn under 16.
- Samtykkekompetansen kan **bortfalle** helt eller delvis hvis pasienten på grunn av fysiske eller psykiske forstyrrelser, demens eller psykisk utviklingshemming **åpenbart ikke er i stand til å forstå** hva samtykket omfatter. Vurderingen gjelder **den konkrete beslutningen**: en person med demens kan være i stand til å bestemme hva hun vil spise, men ikke om en operasjon.
- Avgjørelsen om manglende samtykkekompetanse skal **begrunnes og dokumenteres**, og pasienten og nærmeste pårørende skal få beskjed.

Når pasienten mangler samtykkekompetanse, kan den som er ansvarlig for helsehjelpen, beslutte **helsehjelp av lite inngripende karakter**, og ved mer inngripende helsehjelp skal det skje etter samråd med annet kvalifisert helsepersonell og innhenting av informasjon fra pårørende om hva pasienten ville ha ønsket (§ 4-6).

## Tvungen somatisk helsehjelp (kapittel 4 A)
Hvis en pasient **uten samtykkekompetanse motsetter seg** helsehjelp – for eksempel en person med demens som nekter å ta imot nødvendig sårstell eller insulin – kan helsehjelpen gis med tvang etter **kapittel 4 A** når vilkårene er oppfylt:
- **tillitsskapende tiltak** skal være forsøkt først, med mindre det er åpenbart formålsløst
- unnlatelse kan føre til **vesentlig helseskade**
- helsehjelpen anses **nødvendig**, og tiltakene står i **forhold** til behovet
- en **helhetsvurdering** viser at helsehjelpen er klart den beste løsningen

Vedtaket fattes av den som er ansvarlig for helsehjelpen, skal **dokumenteres** og sendes til **statsforvalteren**, og pasienten og pårørende kan **klage**.

## Når pasienten er misfornøyd
Pasienten kan be tjenesten om ny vurdering og deretter **klage til statsforvalteren**. **Pasient- og brukerombudet** gir gratis råd og hjelp. Ved pasientskade kan det søkes erstatning fra **Norsk pasientskadeerstatning**.

> Ingen helsehjelp uten informert samtykke. Helserettslig myndig ved 16. Manglende kompetanse må vurderes for den konkrete beslutningen – og dokumenteres.`,
`## The Patient and User Rights Act
The **Patient and User Rights Act** (1999) gives patients and users rights in relation to health and care services. Its purpose is to ensure equal access to good-quality services, promote **trust** and protect **respect for each person's life, integrity and human dignity**.

## The main rights
- **Right to necessary health care** from the municipality (GP, out-of-hours service, home nursing, nursing homes) and from specialist services (hospitals). Referred patients have their right to care assessed, and those entitled get a **legal deadline** by which care must be given.
- **Free choice of treatment provider**: the patient may choose which hospital or provider carries out the treatment.
- **Right to participate** (section 3-1): the patient has the right to take part in choosing between available, sound methods of examination and treatment. The form is adapted to their ability to give and receive information.
- **Right to information** (section 3-2): the patient must receive the information necessary to understand their health condition and the care, including possible risks and side effects – and any **injuries and serious complications**. The information must be **adapted** to the recipient (age, maturity, experience, cultural and language background), with a **qualified interpreter** when needed.
- **Right of access to their record** (section 5-1) and to have errors corrected.
- **Right to a coordinator** and an **individual plan** when long-term, coordinated services are needed.
- **Children's special rights**, including to be heard and to schooling during hospital stays.

## Consent – the main rule
**Health care may only be given with the patient's consent** (section 4-1), unless there is a legal basis or other valid grounds. Valid consent requires that the patient has received **the necessary information** about their condition and the care. Consent may be **express** (oral or written) or **implied** – for example when the patient holds out an arm for a blood test. The patient may **withdraw** consent at any time.

**Competent patients may refuse health care** – in some situations even life-saving care, for example a dying patient refusing life-prolonging treatment, or refusing a blood transfusion out of serious conviction (section 4-9). Health personnel must ensure the patient is well informed about the consequences.

## Capacity to consent
- The **age of consent to health care** is **16** (section 4-3). Children aged 12 to 16 have the right to be heard, and their views must carry increasing weight with age and maturity. Parents usually consent for children under 16.
- Capacity to consent may **lapse** wholly or partly if, because of physical or mental disorders, dementia or intellectual disability, the patient is **clearly unable to understand** what the consent involves. The assessment concerns **the specific decision**: a person with dementia may be able to decide what to eat, but not whether to have an operation.
- A decision that the patient lacks capacity must be **reasoned and documented**, and the patient and next of kin must be informed.

When the patient lacks capacity, the person responsible for the care may decide on **care of a minor nature**; for more invasive care, it must be done in consultation with other qualified health personnel and after obtaining information from relatives about what the patient would have wanted (section 4-6).

## Compulsory somatic health care (chapter 4 A)
If a patient **without capacity resists** care – for example a person with dementia refusing necessary wound care or insulin – the care can be given under compulsion under **chapter 4 A** when the conditions are met:
- **trust-building measures** must have been tried first, unless clearly pointless
- failing to give care may lead to **significant harm to health**
- the care is considered **necessary**, and the measures are **proportionate** to the need
- an **overall assessment** shows that the care is clearly the best solution

The decision is made by the person responsible for the care, must be **documented** and sent to the **county governor**, and the patient and relatives may **appeal**.

## When the patient is dissatisfied
The patient can ask the service for a new assessment and then **appeal to the county governor**. The **Patient and User Ombud** offers free advice and help. In case of injury from treatment, compensation can be sought from the **Norwegian System of Patient Injury Compensation**.

> No health care without informed consent. Age of consent to health care: 16. Lack of capacity is assessed for the specific decision – and documented.`);

DEEP("SLOV", "Etikk i sykepleien",
`## Hvorfor etikk?
Sykepleiere møter mennesker i sårbare situasjoner og tar hver dag beslutninger som berører andres liv, verdighet og integritet. **Etikk** handler om hva som er godt og riktig å gjøre, og hvordan vi kan begrunne det. Lover gir minimumskrav; etikken spør hva som er **det beste** for denne pasienten, her og nå.

## Etiske teorier
- **Pliktetikk** (Kant): noen handlinger er rette eller gale i seg selv, uansett konsekvens. Mennesker skal alltid behandles som **mål i seg selv**, aldri bare som middel. Eksempel: ikke lyve for en pasient, selv om sannheten er tung.
- **Konsekvensetikk** (utilitarisme, Bentham og Mill): den rette handlingen er den som gir **best samlede konsekvenser** for flest mulig. Brukes ofte ved **prioriteringer** av knappe ressurser.
- **Dydsetikk** (Aristoteles): hva ville en **god sykepleier** gjort? Vekt på karakteregenskaper som omtanke, mot, ærlighet, klokskap og rettferdighet.
- **Omsorgsetikk**: vekt på **relasjonen** og **sårbarheten**, og på å se den konkrete andre. I Norge har **Kari Martinsen** vært sentral, med tanker om omsorg som både relasjonell, praktisk og moralsk, og om **det sansende øyet**. **Joyce Travelbee** beskrev sykepleie som en mellommenneskelig prosess, der målet er å hjelpe pasienten til å mestre og finne **mening** i sykdom og lidelse.

## Fire prinsipper
I helsetjenesten brukes ofte **fire prinsipper** (Beauchamp og Childress) som et praktisk verktøy:
1. **Respekt for autonomi**: pasientens rett til å bestemme over seg selv – informert samtykke, medvirkning, retten til å si nei.
2. **Velgjørenhet**: å gjøre godt, fremme pasientens helse og velvære.
3. **Ikke-skade**: å unngå å påføre unødig skade, smerte eller krenkelse.
4. **Rettferdighet**: lik behandling av like tilfeller og rettferdig fordeling av ressurser.

Prinsippene kan komme i **konflikt** – det er da vi står i et **etisk dilemma**. En pasient med demens som vil gå ut alene (autonomi), kan komme til skade (ikke-skade). En pasient som ønsker mer behandling enn det som er til nytte, utfordrer både velgjørenhet og rettferdighet.

## Yrkesetiske retningslinjer
**Yrkesetiske retningslinjer for sykepleiere** (Norsk Sykepleierforbund, bygget på **ICNs** etiske regler) slår fast at sykepleie skal bygge på **barmhjertighet, omsorg og respekt for menneskerettighetene**, og være kunnskapsbasert. Retningslinjene beskriver sykepleierens ansvar overfor **pasienten**, **pårørende**, **profesjonen**, **medarbeidere**, **arbeidsstedet** og **samfunnet** – blant annet å ivareta pasientens verdighet og integritet, retten til helhetlig sykepleie og til å medbestemme, og å si fra når pasientsikkerheten trues.

## Å håndtere et etisk dilemma
En enkel modell for refleksjon:
1. **Hva er problemet?** Beskriv situasjonen og hvem som er involvert.
2. **Hvilke fakta** trenger vi? Medisinske forhold, pasientens ønsker, lovverket.
3. **Hvilke verdier og prinsipper** står mot hverandre?
4. **Hvilke handlingsalternativer** finnes, og hvilke konsekvenser har de?
5. **Beslutning og begrunnelse** – og evaluering etterpå.

Mange sykehus og kommuner har **kliniske etikkomiteer** (KEK) og **etikkrefleksjonsgrupper** der personalet drøfter vanskelige saker. Etiske problemer som ikke håndteres, kan gi **moralsk stress** og utbrenthet.

## Prioriteringer
I Norge skal prioriteringer i helsetjenesten bygge på tre kriterier: **nytte** (hvor mye helsegevinst tiltaket gir), **ressurs** (hvor mye det koster) og **alvorlighet** (hvor alvorlig tilstanden er). Prioriteringer skjer også i det daglige på sengeposten – hvem trenger hjelp først?

## Etikk ved livets slutt
**Lindrende behandling** skal gi best mulig livskvalitet når helbredelse ikke er mulig. Beslutninger om å avstå fra **hjerte-lunge-redning** eller livsforlengende behandling tas av ansvarlig lege, men skal bygge på samtaler med pasienten (og pårørende) og dokumenteres. **Aktiv dødshjelp** er forbudt i Norge.

> Autonomi, velgjørenhet, ikke-skade, rettferdighet. Et dilemma oppstår når de trekker i ulike retninger – drøft det åpent og begrunn valget.`,
`## Why ethics?
Nurses meet people in vulnerable situations and make decisions every day that affect others' lives, dignity and integrity. **Ethics** is about what is good and right to do, and how we can justify it. Laws set minimum requirements; ethics asks what is **best** for this patient, here and now.

## Ethical theories
- **Duty ethics** (Kant): some actions are right or wrong in themselves, whatever the consequences. People must always be treated as **ends in themselves**, never merely as means. Example: do not lie to a patient, even when the truth is hard.
- **Consequentialism** (utilitarianism, Bentham and Mill): the right action is the one with **the best overall consequences** for as many as possible. Often used in **prioritising** scarce resources.
- **Virtue ethics** (Aristotle): what would a **good nurse** do? Emphasis on character traits such as compassion, courage, honesty, practical wisdom and justice.
- **Care ethics**: emphasis on **the relationship** and **vulnerability**, and on seeing the particular other person. In Norway **Kari Martinsen** has been central, with ideas of care as relational, practical and moral, and of **the perceiving eye**. **Joyce Travelbee** described nursing as an interpersonal process whose aim is to help the patient cope with and find **meaning** in illness and suffering.

## Four principles
In health care **four principles** (Beauchamp and Childress) are often used as a practical tool:
1. **Respect for autonomy**: the patient's right to self-determination – informed consent, participation, the right to say no.
2. **Beneficence**: doing good, promoting the patient's health and well-being.
3. **Non-maleficence**: avoiding unnecessary harm, pain or violation.
4. **Justice**: treating like cases alike and distributing resources fairly.

The principles can **conflict** – that is when we face an **ethical dilemma**. A patient with dementia who wants to go out alone (autonomy) may come to harm (non-maleficence). A patient who wants more treatment than will help challenges both beneficence and justice.

## The code of ethics
The **Code of Ethics for Nurses** (Norwegian Nurses Organisation, based on the **ICN** code) states that nursing must be founded on **compassion, care and respect for human rights**, and be evidence-based. It sets out the nurse's responsibilities towards **the patient**, **relatives**, **the profession**, **colleagues**, **the workplace** and **society** – including protecting the patient's dignity and integrity, the right to holistic care and to participate in decisions, and speaking up when patient safety is threatened.

## Handling an ethical dilemma
A simple model for reflection:
1. **What is the problem?** Describe the situation and who is involved.
2. **What facts** do we need? Medical facts, the patient's wishes, the law.
3. **Which values and principles** are in conflict?
4. **What options** are there, and what are their consequences?
5. **Decision and justification** – and evaluation afterwards.

Many hospitals and municipalities have **clinical ethics committees** and **ethics reflection groups** where staff discuss difficult cases. Ethical problems left unaddressed can cause **moral distress** and burnout.

## Priority setting
In Norway priority setting in health care is based on three criteria: **benefit** (how much health gain a measure gives), **resources** (how much it costs) and **severity** (how serious the condition is). Prioritising also happens daily on the ward – who needs help first?

## Ethics at the end of life
**Palliative care** aims for the best possible quality of life when cure is not possible. Decisions to withhold **CPR** or life-prolonging treatment are made by the responsible doctor, but should be based on conversations with the patient (and relatives) and documented. **Euthanasia** is prohibited in Norway.

> Autonomy, beneficence, non-maleficence, justice. A dilemma arises when they pull in different directions – discuss it openly and justify the choice.`);

DEEP("SLOV", "Kommunikasjon og dokumentasjon",
`## Kommunikasjon som sykepleiefaglig verktøy
God kommunikasjon er en forutsetning for **trygghet, tillit og pasientsikkerhet**. Mange klager og uønskede hendelser i helsetjenesten skyldes svikt i kommunikasjonen – mellom helsepersonell og pasient, eller mellom helsepersonell.

## Pasientsentrert kommunikasjon
- **Aktiv lytting**: gi full oppmerksomhet, still oppfølgingsspørsmål, **oppsummer** og speil det pasienten sier («Hvis jeg forstår deg riktig, er du mest bekymret for …»).
- **Åpne spørsmål** («Hvordan har natten vært?») gir pasienten rom til å fortelle. **Lukkede spørsmål** («Har du vondt nå?») gir presise svar og er nyttige i akutte situasjoner.
- **Empati**: å forstå og anerkjenne pasientens opplevelse, og vise det – uten å overta følelsene.
- **Nonverbal kommunikasjon**: kroppsspråk, blikk, tonefall, stillhet og berøring sier ofte mer enn ord. Sett deg ned i samme høyde som pasienten.
- **Tilpass språket**: unngå faguttrykk og forkortelser. Gi én ting om gangen, og gjenta det viktigste.
- **Teach-back**: be pasienten forklare med egne ord hva hun eller han skal gjøre – det avslører misforståelser.
- **Vanskelige samtaler** (alvorlige beskjeder, sorg, sinne): forbered deg, skap ro, finn ut hva pasienten vet og vil vite, gi informasjonen i passende doser og vær til stede for reaksjonene.

## Kommunikasjon med særlige behov
- **Tolk**: når pasienten ikke snakker norsk godt nok, skal det brukes **kvalifisert tolk**. Etter **tolkeloven** skal barn som hovedregel ikke brukes som tolk, og pårørende bare unntaksvis. Snakk direkte til pasienten, ikke til tolken.
- **Hørselshemmede**: se på pasienten når du snakker, reduser bakgrunnsstøy, sjekk høreapparatet.
- **Personer med demens eller afasi**: korte setninger, ett budskap om gangen, ja/nei-spørsmål, bilder, god tid.
- **Barn**: tilpass til alder, bruk lek og konkrete forklaringer, og involver foreldrene.

## Kommunikasjon mellom helsepersonell
Strukturerte metoder reduserer feil:
- **ISBAR** ved muntlig rapport og når du ringer lege: Identifikasjon, Situasjon, Bakgrunn, Aktuell vurdering, Råd.
- **Lukket kommunikasjon**: mottakeren gjentar beskjeden («Gi 5 mg morfin i.v. – jeg gjentar: 5 mg morfin i.v.»), og avsenderen bekrefter.
- **Tverrfaglige møter**, sjekklister (som Trygg kirurgi) og tydelig ansvarsfordeling.
- **Si fra**: alle har et ansvar for å melde bekymring for pasientsikkerheten, uansett hierarki.

## Dokumentasjon
**Helsepersonelloven** (§§ 39–40) og **pasientjournalforskriften** pålegger alle som yter helsehjelp å dokumentere. Journalen er et **arbeidsverktøy**, sikrer **kontinuitet** mellom vaktskift og tjenester, er grunnlag for **kvalitetssikring og tilsyn**, og er pasientens og helsepersonellets **rettssikkerhet** – «det som ikke er dokumentert, er ikke gjort».

God sykepleiedokumentasjon er
- **relevant og nødvendig** – det som har betydning for helsehjelpen
- **objektiv og presis**: beskriv hva du observerte («Pasienten svarte ikke på spørsmål om tid og sted») i stedet for tolkninger («Pasienten var dement»)
- **tidfestet og signert**, ført fortløpende og så snart som mulig
- **forståelig** for andre, uten private forkortelser

Sykepleiedokumentasjonen beskriver ofte en **sykepleieprosess**: datainnsamling → sykepleiediagnose/problem → mål → tiltak → evaluering. Mange steder brukes standardiserte terminologier og **behandlingsplaner**.

## Personvern i dokumentasjon
Pasienten har rett til **innsyn** i journalen sin. Skriv derfor respektfullt og saklig. Retting av feil skal gjøres slik at det opprinnelige fortsatt kan leses, og endringen skal være signert. Bare de som har **tjenstlig behov**, skal lese journalen.

> Lytt aktivt, spør åpent, sjekk forståelsen. Rapporter med ISBAR. Dokumenter objektivt, presist og fortløpende.`,
`## Communication as a nursing tool
Good communication is essential for **security, trust and patient safety**. Many complaints and adverse events in health care stem from failures of communication – between staff and patients, or between staff.

## Patient-centred communication
- **Active listening**: give full attention, ask follow-up questions, **summarise** and reflect what the patient says ("If I understand you correctly, you're most worried about …").
- **Open questions** ("How was your night?") give the patient room to talk. **Closed questions** ("Are you in pain now?") give precise answers and are useful in acute situations.
- **Empathy**: understanding and acknowledging the patient's experience, and showing it – without taking over the feelings.
- **Non-verbal communication**: body language, eye contact, tone of voice, silence and touch often say more than words. Sit at the patient's eye level.
- **Adapt your language**: avoid jargon and abbreviations. Give one thing at a time and repeat what matters most.
- **Teach-back**: ask the patient to explain in their own words what they are going to do – it reveals misunderstandings.
- **Difficult conversations** (bad news, grief, anger): prepare, create calm, find out what the patient knows and wants to know, give information in suitable doses and be present for the reactions.

## Communication with special needs
- **Interpreters**: when the patient does not speak Norwegian well enough, a **qualified interpreter** should be used. Under the **Interpreter Act**, children should as a rule not be used as interpreters, and relatives only exceptionally. Speak directly to the patient, not to the interpreter.
- **Hearing impairment**: face the patient when speaking, reduce background noise, check the hearing aid.
- **People with dementia or aphasia**: short sentences, one message at a time, yes/no questions, pictures, plenty of time.
- **Children**: adapt to age, use play and concrete explanations, and involve the parents.

## Communication between professionals
Structured methods reduce errors:
- **ISBAR** for verbal handovers and when calling a doctor: Identify, Situation, Background, Assessment, Recommendation.
- **Closed-loop communication**: the receiver repeats the instruction ("Give 5 mg morphine IV – repeating: 5 mg morphine IV"), and the sender confirms.
- **Multidisciplinary meetings**, checklists (such as the Safe Surgery checklist) and clear allocation of responsibility.
- **Speak up**: everyone is responsible for raising concerns about patient safety, regardless of hierarchy.

## Documentation
The **Health Personnel Act** (sections 39–40) and the **Patient Records Regulations** require everyone providing health care to document. The record is a **working tool**, ensures **continuity** across shifts and services, is the basis for **quality assurance and supervision**, and protects the **legal rights** of patients and staff – "if it isn't documented, it wasn't done".

Good nursing documentation is
- **relevant and necessary** – what matters for the care
- **objective and precise**: describe what you observed ("The patient did not answer questions about time and place") rather than interpretations ("The patient was demented")
- **dated and signed**, written continuously and as soon as possible
- **understandable** to others, without private abbreviations

Nursing documentation often follows a **nursing process**: assessment → nursing diagnosis/problem → goals → interventions → evaluation. Many places use standardised terminologies and **care plans**.

## Privacy in documentation
Patients have the right to **access** their records. So write respectfully and factually. Corrections must be made so that the original can still be read, and the change must be signed. Only those with a **work-related need** may read the record.

> Listen actively, ask openly, check understanding. Hand over with ISBAR. Document objectively, precisely and continuously.`);

// ================= LEGEMIDDELREGNING =================
DEEP("SLMR", "Enheter og omregning",
`## Hvorfor enhetene er så viktige
Feil med en faktor 10 eller 1000 er blant de farligste legemiddelfeilene. De oppstår typisk ved forveksling av **mg og µg**, ved en **feilplassert desimal** (0,5 mg blir 5 mg) eller ved at «µg» skrevet for hånd leses som «mg». Mange steder skrives derfor **mikrogram** helt ut, og man unngår avsluttende nuller (skriv 5 mg, ikke 5,0 mg) og bruker alltid null foran komma (0,5 mg, ikke ,5 mg).

## Trappen
Tenk på enhetene som en **trapp** der hvert trinn er en faktor 1000:
- g → mg → µg → ng: **ned** ett trinn = gang med 1000.
- ng → µg → mg → g: **opp** ett trinn = del på 1000.
- For volum: l → dl (×10) → cl (×10) → ml (×10), altså 1 l = 1000 ml.

## Styrker og konsentrasjoner
- **mg/ml**: mengde virkestoff i hver milliliter.
- **Prosent (%)**: gram per 100 ml. 1 % = 10 mg/ml. NaCl 0,9 % = 9 mg/ml. Lidokain 2 % = 20 mg/ml.
- **Promille (‰)**: gram per 1000 ml, altså mg/ml direkte.
- **Forhold**: adrenalin 1 mg/ml skrives noen ganger som 1:1000 (1 g per 1000 ml).
- **Internasjonale enheter (IE)**: brukes for insulin, heparin og enkelte vitaminer – kan ikke regnes om til mg.
- **mmol**: brukes for elektrolytter som kalium og natrium.

## Grunnformelen
Nesten alle oppgaver kan løses med
$$\\text{mengde} = \\text{styrke} \\cdot \\text{volum} \\quad \\Leftrightarrow \\quad \\text{volum} = \\frac{\\text{mengde}}{\\text{styrke}}.$$
Sett alltid inn tall **med enheter** og sjekk at enhetene går opp: mg delt på mg/ml gir ml.

## Kontroll av svaret
- **Grovanslag først**: rund av tallene og anslå svaret før du regner nøyaktig.
- **Er svaret rimelig?** En vanlig injeksjon er sjelden mer enn noen få ml; en vanlig tablettdose er 1–2 tabletter.
- **Dobbeltkontroll** med en kollega ved høyrisikolegemidler, barn og alle utregninger du er usikker på.

> Skriv enheten ved hvert tall. Ned trappen: ×1000. Opp trappen: ÷1000. 1 % = 10 mg/ml.`,
`## Why units matter so much
Errors by a factor of 10 or 1000 are among the most dangerous medication errors. They typically arise from confusing **mg and µg**, a **misplaced decimal** (0.5 mg becomes 5 mg) or a handwritten "µg" read as "mg". Many places therefore write **micrograms** in full, avoid trailing zeros (write 5 mg, not 5.0 mg) and always use a leading zero (0.5 mg, not .5 mg).

## The staircase
Think of the units as a **staircase** where each step is a factor of 1000:
- g → mg → µg → ng: **down** one step = multiply by 1000.
- ng → µg → mg → g: **up** one step = divide by 1000.
- For volume: L → dL (×10) → cL (×10) → mL (×10), so 1 L = 1000 mL.

## Strengths and concentrations
- **mg/mL**: amount of active substance in each millilitre.
- **Percent (%)**: grams per 100 mL. 1 % = 10 mg/mL. NaCl 0.9 % = 9 mg/mL. Lidocaine 2 % = 20 mg/mL.
- **Per mille (‰)**: grams per 1000 mL, i.e. mg/mL directly.
- **Ratios**: adrenaline 1 mg/mL is sometimes written 1:1000 (1 g per 1000 mL).
- **International units (IU)**: used for insulin, heparin and some vitamins – cannot be converted to mg.
- **mmol**: used for electrolytes such as potassium and sodium.

## The basic formula
Almost every problem can be solved with
$$\\text{amount} = \\text{strength} \\cdot \\text{volume} \\quad \\Leftrightarrow \\quad \\text{volume} = \\frac{\\text{amount}}{\\text{strength}}.$$
Always insert numbers **with units** and check that the units work out: mg divided by mg/mL gives mL.

## Checking the answer
- **Estimate first**: round the numbers and estimate the answer before calculating exactly.
- **Is the answer reasonable?** An ordinary injection is rarely more than a few mL; a usual tablet dose is 1–2 tablets.
- **Double-check** with a colleague for high-risk drugs, children and any calculation you are unsure of.

> Write the unit with every number. Down the staircase: ×1000. Up: ÷1000. 1 % = 10 mg/mL.`);

DEEP("SLMR", "Tabletter, mikstur og dose per kg",
`## Tabletter
$$\\text{antall tabletter} = \\frac{\\text{forordnet dose}}{\\text{styrke per tablett}}.$$
Sjekk alltid om tabletten **kan deles**: tabletter med **delestrek** kan ofte deles, men ikke alle delestreker er ment for å dele dosen (noen er bare for å gjøre tabletten lettere å svelge). **Depottabletter** og **enterotabletter** skal normalt **ikke** deles eller knuses – depotmekanismen ødelegges, og pasienten kan få hele dosen på en gang. Et svar som 0,3 tablett eller 6 tabletter tyder på regnefeil eller feil styrke.

## Mikstur og injeksjonsvæske
$$\\text{volum (ml)} = \\frac{\\text{forordnet dose (mg)}}{\\text{styrke (mg/ml)}}.$$
Bruk **doseringssprøyte** til mikstur, ikke kjøkkenskje. Sjekk at styrken på flasken er den samme som du regner med – samme legemiddel finnes ofte i flere styrker.

## Dose per kilo kroppsvekt
Mange legemidler – særlig til **barn**, men også antibiotika, heparin og cytostatika til voksne – doseres etter **vekt**:
$$\\text{dose} = \\text{dose per kg} \\cdot \\text{vekt}.$$
- Bruk **aktuell, målt vekt** – ikke anslått.
- Står det **«per døgn, fordelt på 3 doser»**, regner du først ut døgndosen og deler så på antall doser.
- Sammenlign med **maksimal dose**: en barnedose regnet ut etter vekt skal ikke overstige voksendosen.
- Noen legemidler doseres etter **kroppsoverflate** (m²), særlig cytostatika.

## Eksempel på framgangsmåte
Et barn på 18 kg skal ha 50 mg/kg/døgn av et antibiotikum fordelt på 3 doser. Mikstur 50 mg/ml.
1. Døgndose: $50 \\cdot 18 = 900$ mg.
2. Per dose: $900 / 3 = 300$ mg.
3. Volum: $300 / 50 = 6$ ml per dose.
4. Rimelig? 6 ml mikstur tre ganger daglig er en vanlig mengde for et barn.

> Antall = dose ÷ styrke. Per kg: gang med vekten, del på antall doser. Ikke knus depot- og enterotabletter.`,
`## Tablets
$$\\text{number of tablets} = \\frac{\\text{prescribed dose}}{\\text{strength per tablet}}.$$
Always check whether the tablet **can be split**: tablets with a **score line** can often be split, but not all score lines are meant for dividing the dose (some only make the tablet easier to swallow). **Modified-release** and **enteric-coated** tablets should normally **not** be split or crushed – the release mechanism is destroyed and the patient may get the whole dose at once. An answer like 0.3 tablets or 6 tablets suggests a calculation error or the wrong strength.

## Oral liquids and injections
$$\\text{volume (mL)} = \\frac{\\text{prescribed dose (mg)}}{\\text{strength (mg/mL)}}.$$
Use an **oral syringe** for liquids, not a kitchen spoon. Check that the strength on the bottle matches the one you calculate with – the same drug often comes in several strengths.

## Dose per kilogram of body weight
Many drugs – especially for **children**, but also antibiotics, heparin and cytotoxics for adults – are dosed by **weight**:
$$\\text{dose} = \\text{dose per kg} \\cdot \\text{weight}.$$
- Use the **actual, measured weight** – not an estimate.
- If it says **"per day, divided into 3 doses"**, first calculate the daily dose, then divide by the number of doses.
- Compare with the **maximum dose**: a child's weight-based dose should not exceed the adult dose.
- Some drugs are dosed by **body surface area** (m²), especially cytotoxics.

## Worked approach
A child weighing 18 kg is to have 50 mg/kg/day of an antibiotic divided into 3 doses. Oral liquid 50 mg/mL.
1. Daily dose: $50 \\cdot 18 = 900$ mg.
2. Per dose: $900 / 3 = 300$ mg.
3. Volume: $300 / 50 = 6$ mL per dose.
4. Reasonable? 6 mL of liquid three times a day is a normal amount for a child.

> Number = dose ÷ strength. Per kg: multiply by weight, divide by the number of doses. Do not crush modified-release or enteric-coated tablets.`);

DEEP("SLMR", "Infusjon og dråpetakt",
`## Infusjonshastighet
$$\\text{hastighet (ml/t)} = \\frac{\\text{volum (ml)}}{\\text{tid (t)}}.$$
Infusjoner gis enten med **infusjonspumpe**, som stilles inn i ml/t, eller med **tyngdekraft**, der du regulerer **dråpetakten** med en rulleklemme.

## Dråpetakt
$$\\text{dråper per minutt} = \\frac{\\text{volum (ml)} \\cdot \\text{dråpefaktor (dråper/ml)}}{\\text{tid (min)}}.$$
- Et vanlig infusjonssett for krystalloider gir **20 dråper per ml**.
- **Mikrodråpesett** (ofte brukt til barn) gir **60 dråper per ml** – da er dråper per minutt lik ml per time.
- **Blodsett** kan ha en annen dråpefaktor. Sjekk alltid pakningen.
- Husk å gjøre timer om til **minutter** (× 60).

## Medikamentinfusjon
Når et legemiddel er blandet i en infusjon, må du ofte regne mellom **dose per tid** og **ml per time**:
1. Finn **konsentrasjonen** i posen eller sprøyten: mengde legemiddel ÷ totalt volum.
2. **ml/t = (dose per time) ÷ konsentrasjon.**
3. Ved dosering i **µg/kg/min**: gang med vekten og 60 for å få dose per time, og pass på enhetene (µg eller mg).

## Sikkerhet
- Bruk **pumpe** til legemidler med smalt terapeutisk vindu og til små volumer, særlig hos barn.
- **Merk** infusjonen med legemiddel, mengde, konsentrasjon, tidspunkt og signatur.
- Kontroller **innstikkstedet** jevnlig for rødhet, hevelse og smerte (flebitt eller ekstravasasjon).
- Kontroller **hastigheten** og hvor mye som er gått inn, ved vaktskifte og når det skjer endringer.
- **Kaliumtilskudd** gis aldri som rask støt – det kan gi dødelig hjerterytmeforstyrrelse. Følg lokale prosedyrer for maksimal hastighet og konsentrasjon.

> ml/t = ml ÷ timer. Dråper/min = ml × dråpefaktor ÷ minutter. Standard sett: 20 dråper/ml.`,
`## Infusion rate
$$\\text{rate (mL/h)} = \\frac{\\text{volume (mL)}}{\\text{time (h)}}.$$
Infusions are given either with an **infusion pump**, set in mL/h, or by **gravity**, where you regulate the **drip rate** with a roller clamp.

## Drip rate
$$\\text{drops per minute} = \\frac{\\text{volume (mL)} \\cdot \\text{drop factor (drops/mL)}}{\\text{time (min)}}.$$
- A common infusion set for crystalloids gives **20 drops per mL**.
- **Micro-drip sets** (often used for children) give **60 drops per mL** – then drops per minute equals mL per hour.
- **Blood sets** may have a different drop factor. Always check the package.
- Remember to convert hours to **minutes** (× 60).

## Drug infusions
When a drug is mixed in an infusion, you often have to convert between **dose per time** and **mL per hour**:
1. Find the **concentration** in the bag or syringe: amount of drug ÷ total volume.
2. **mL/h = (dose per hour) ÷ concentration.**
3. For dosing in **µg/kg/min**: multiply by weight and 60 to get the hourly dose, and watch the units (µg or mg).

## Safety
- Use a **pump** for drugs with a narrow therapeutic window and for small volumes, especially in children.
- **Label** the infusion with drug, amount, concentration, time and signature.
- Check the **insertion site** regularly for redness, swelling and pain (phlebitis or extravasation).
- Check the **rate** and volume infused at handover and whenever anything changes.
- **Potassium** is never given as a rapid bolus – it can cause fatal arrhythmia. Follow local procedures for maximum rate and concentration.

> mL/h = mL ÷ hours. Drops/min = mL × drop factor ÷ minutes. Standard set: 20 drops/mL.`);

DEEP("SLMR", "Fortynning og løsninger",
`## Fortynningsformelen
Når du fortynner, endres **konsentrasjonen**, men **mengden virkestoff er den samme**:
$$C_1 \\cdot V_1 = C_2 \\cdot V_2.$$
$C_1$ og $V_1$ er konsentrasjon og volum **før**, $C_2$ og $V_2$ **etter** fortynningen. Bruk samme enheter på begge sider.

## Typiske spørsmål
- **Hvor mye stamløsning trenger jeg?** $V_1 = \\dfrac{C_2 \\cdot V_2}{C_1}$.
- **Hvor mye fortynningsvæske skal tilsettes?** $V_2 - V_1$ – ikke hele $V_2$.
- **Hva blir konsentrasjonen?** $C_2 = \\dfrac{C_1 \\cdot V_1}{V_2}$.

## Tørrstoff og oppløsning
Mange legemidler (særlig antibiotika) leveres som **pulver** som skal løses opp. Les preparatomtalen: noen ganger blir sluttvolumet **større** enn væsken du tilsatte, fordi pulveret tar plass (**fortrengningsvolum**). Bruk den konsentrasjonen produsenten oppgir etter oppløsning.

## Valg av væske
Bruk bare den **fortynningsvæsken** som er anbefalt – ofte NaCl 9 mg/ml eller glukose 50 mg/ml. Noen legemidler er **uforlikelige** med enkelte væsker eller andre legemidler og kan felles ut. Sjekk blandbarhet (for eksempel i Felleskatalogen) før du gir flere legemidler i samme slange.

## Praktisk sikkerhet
- Bruk **aseptisk teknikk**: desinfiser gummimembraner, bruk sterile sprøyter og kanyler.
- **Merk** ferdig blanding med legemiddel, konsentrasjon, tidspunkt og signatur. Umerkede sprøyter skal kastes.
- Mange ferdigblandede løsninger har **kort holdbarhet** – noen må brukes straks.
- Gjør gjerne **to-trinns fortynning** når sluttdosen er svært liten, slik at du unngår å måle opp ørsmå volumer.

> C₁ · V₁ = C₂ · V₂. Tilsatt væske = V₂ − V₁. Merk alltid blandingen.`,
`## The dilution formula
When you dilute, the **concentration** changes, but **the amount of active substance stays the same**:
$$C_1 \\cdot V_1 = C_2 \\cdot V_2.$$
$C_1$ and $V_1$ are concentration and volume **before**, $C_2$ and $V_2$ **after** dilution. Use the same units on both sides.

## Typical questions
- **How much stock solution do I need?** $V_1 = \\dfrac{C_2 \\cdot V_2}{C_1}$.
- **How much diluent should be added?** $V_2 - V_1$ – not the whole $V_2$.
- **What is the concentration?** $C_2 = \\dfrac{C_1 \\cdot V_1}{V_2}$.

## Powders and reconstitution
Many drugs (especially antibiotics) come as a **powder** to be dissolved. Read the product information: sometimes the final volume is **larger** than the liquid you added, because the powder takes up space (**displacement volume**). Use the concentration the manufacturer gives after reconstitution.

## Choice of fluid
Use only the **recommended diluent** – often NaCl 9 mg/mL or glucose 50 mg/mL. Some drugs are **incompatible** with certain fluids or other drugs and may precipitate. Check compatibility (for example in Felleskatalogen) before giving several drugs through the same line.

## Practical safety
- Use **aseptic technique**: disinfect rubber stoppers, use sterile syringes and needles.
- **Label** the mixture with drug, concentration, time and signature. Unlabelled syringes must be discarded.
- Many mixed solutions have **short stability** – some must be used immediately.
- Consider a **two-step dilution** when the final dose is very small, to avoid measuring tiny volumes.

> C₁ · V₁ = C₂ · V₂. Diluent added = V₂ − V₁. Always label the mixture.`);

DEEP("SLMR", "Insulin, IE og blandede oppgaver",
`## Insulin og internasjonale enheter
Insulin doseres i **internasjonale enheter (IE)**, ikke i mg. Den vanligste styrken er **100 IE/ml** (U100), men det finnes også sterkere insuliner (for eksempel 200 og 300 IE/ml). Insulin er et **høyrisikolegemiddel**: feil dose kan gi livstruende hypoglykemi.
- Bruk **insulinpenn** eller en **insulinsprøyte** merket i IE – aldri en vanlig sprøyte.
- Skriv aldri «E» eller «U» som forkortelse for enheter i håndskrift; det kan leses som 0 eller 4. Skriv **«enheter»** eller **«IE»**.
- **Volum** når du må regne: $\\text{ml} = \\dfrac{\\text{IE}}{\\text{IE/ml}}$. 20 IE av 100 IE/ml = 0,2 ml.

## Insulintyper
- **Hurtigvirkende** (måltidsinsulin): virker etter 10–20 minutter, gis rett før eller til måltidet.
- **Langtidsvirkende** (basalinsulin): jevn virkning gjennom døgnet, gis én–to ganger daglig.
- **Blandingsinsuliner** inneholder begge deler og må **vendes** forsiktig før bruk.
- **Intravenøst insulin** gis bare i sykehus etter egne prosedyrer, ofte med pumpe og hyppig blodsukkermåling.

## Praktisk insulingivning
- Kontroller blodsukker, måltid og forordning før du gir insulin.
- Sett insulinet **subkutant** i mage, lår eller sete, og **varier innstikkstedet**.
- Hold nålen inne i omtrent **10 sekunder** etter injeksjon, så hele dosen kommer inn.
- Insulin som er i bruk, kan oppbevares i romtemperatur i en begrenset periode; ubrukt insulin oppbevares i kjøleskap. Insulin må ikke fryses.

## Andre legemidler i IE eller mmol
- **Heparin** og noen lavmolekylære hepariner kan doseres i IE.
- **Kalium** og andre elektrolytter doseres i **mmol**: $\\text{ml} = \\dfrac{\\text{mmol}}{\\text{mmol/ml}}$.

## Strategi for blandede oppgaver
1. **Les hele oppgaven** og marker hva som er gitt og hva som spørres etter.
2. **Gjør enhetene like** (mg/µg, ml/l, timer/minutter).
3. **Del opp** i trinn: døgndose → dose per gang → volum → hastighet.
4. **Sett inn enheter** i hvert trinn og se at de går opp.
5. **Grovanslag og rimelighetskontroll** til slutt.

> Insulin: IE, ikke mg. U100 = 100 IE/ml. Bruk insulinpenn eller IE-sprøyte, og skriv «enheter» fullt ut.`,
`## Insulin and international units
Insulin is dosed in **international units (IU)**, not mg. The most common strength is **100 IU/mL** (U100), but stronger insulins exist (for example 200 and 300 IU/mL). Insulin is a **high-risk drug**: a wrong dose can cause life-threatening hypoglycaemia.
- Use an **insulin pen** or an **insulin syringe** marked in units – never an ordinary syringe.
- Never write "U" as an abbreviation for units by hand; it can be read as 0 or 4. Write **"units"**.
- **Volume** when you have to calculate: $\\text{mL} = \\dfrac{\\text{IU}}{\\text{IU/mL}}$. 20 IU of 100 IU/mL = 0.2 mL.

## Types of insulin
- **Rapid-acting** (mealtime insulin): acts after 10–20 minutes, given just before or with the meal.
- **Long-acting** (basal insulin): steady action through the day, given once or twice daily.
- **Premixed insulins** contain both and must be **gently inverted** before use.
- **Intravenous insulin** is given only in hospital under specific procedures, often by pump with frequent glucose checks.

## Giving insulin in practice
- Check blood glucose, the meal and the prescription before giving insulin.
- Inject **subcutaneously** into the abdomen, thigh or buttock, and **rotate sites**.
- Keep the needle in for about **10 seconds** after injecting so the whole dose goes in.
- Insulin in use may be kept at room temperature for a limited period; unopened insulin is stored in the fridge. Insulin must not be frozen.

## Other drugs in units or mmol
- **Heparin** and some low-molecular-weight heparins may be dosed in units.
- **Potassium** and other electrolytes are dosed in **mmol**: $\\text{mL} = \\dfrac{\\text{mmol}}{\\text{mmol/mL}}$.

## Strategy for mixed problems
1. **Read the whole problem** and mark what is given and what is asked.
2. **Make the units match** (mg/µg, mL/L, hours/minutes).
3. **Break it into steps**: daily dose → dose per time → volume → rate.
4. **Insert units** at each step and check they work out.
5. **Estimate and sanity-check** at the end.

> Insulin: units, not mg. U100 = 100 IU/mL. Use an insulin pen or unit-marked syringe, and write "units" in full.`);
})();
