// ============================================================
//  add_zdeep_syk1.js – fordypning i sykepleie: anatomi og fysiologi, farmakologi og mikrobiologi.
//  DEEP ligger i learn.js. Lærebok-nivå for første studieår; referanseverdier varierer litt mellom laboratorier.
// ============================================================
(() => {
// ================= ANATOMI OG FYSIOLOGI =================
DEEP("SANA", "Celler, vev og homeostase",
`## Cellen
Kroppen består av rundt 30–40 billioner celler. En typisk menneskecelle har
- **cellemembran**: et dobbelt lag av fosfolipider med proteiner. Den slipper fett­løselige stoffer, O₂ og CO₂ lett gjennom, mens ioner og glukose trenger kanaler eller transportproteiner.
- **cellekjerne** med arvestoffet (DNA), som styrer proteinsyntesen
- **mitokondrier**, der cellens energi (ATP) lages ved cellulær respirasjon
- **ribosomer** og **endoplasmatisk nettverk**, der proteiner bygges, og **Golgi-apparatet**, som pakker og sender dem ut
- **lysosomer**, som bryter ned avfall og fremmedlegemer

## Transport over membranen
- **Diffusjon**: stoffer beveger seg fra høy til lav konsentrasjon, uten energi. Slik går O₂ fra alveolene til blodet.
- **Osmose**: vann diffunderer over en halvgjennomtrengelig membran mot den siden med høyest konsentrasjon av løste stoffer. Legges røde blodceller i rent vann, sveller de og sprekker; i sterk saltløsning skrumper de. Derfor er intravenøse væsker **isotone** – for eksempel NaCl 9 mg/ml (0,9 %).
- **Aktiv transport** bruker ATP til å flytte stoffer mot konsentrasjonsgradienten. **Natrium-kalium-pumpen** holder mye kalium inne i cellene og mye natrium ute – grunnlaget for nerve- og muskelfunksjon.

## De fire vevstypene
- **Epitelvev** dekker overflater og kler hulrom: hud, slimhinner, kjertler.
- **Bindevev** binder og støtter: ben, brusk, sener, fettvev og **blod**.
- **Muskelvev**: skjelettmuskulatur (viljestyrt), glatt muskulatur (tarm, blodårer) og hjertemuskulatur.
- **Nervevev**: nevroner som leder signaler, og støtteceller (gliaceller).

## Kroppsvæskene
Hos en voksen består omtrent **60 %** av kroppsvekten av vann (mindre hos eldre og personer med mye fett, mer hos spedbarn). Omtrent **to tredjedeler** er **intracellulær væske** og én tredjedel **ekstracellulær** – fordelt på **interstitiell væske** mellom cellene (ca. tre firedeler) og **blodplasma** (ca. en firedel). Natrium dominerer utenfor cellene, kalium inne i dem.

## Homeostase og tilbakekobling
**Homeostase** er kroppens evne til å holde et stabilt indre miljø: temperatur rundt 37 °C, blodsukker omkring 4–7 mmol/l, blodets **pH 7,35–7,45**, blodtrykk, væske- og saltbalanse. Det skjer med **negativ tilbakekobling**: en **sensor** registrerer et avvik, et **kontrollsenter** (ofte hypothalamus) sammenligner med et settpunkt, og en **effektor** motvirker endringen.
- Er du for varm, utvider hudens blodårer seg og du svetter. Er du for kald, trekker blodårene seg sammen og du skjelver.
- Stiger blodsukkeret etter et måltid, skiller bukspyttkjertelen ut **insulin**; faller det, kommer **glukagon**.

**Positiv tilbakekobling** forsterker en endring til et sluttpunkt: rier under fødsel (oksytocin) og blodets koagulasjon. Sykdom kan forstås som svikt i homeostasen – feber, diabetes og dehydrering er eksempler.

> Sensor → kontrollsenter → effektor. Negativ tilbakekobling stabiliserer, positiv forsterker.`,
`## The cell
The body consists of roughly 30–40 trillion cells. A typical human cell has
- a **cell membrane**: a double layer of phospholipids with proteins. It lets fat-soluble substances, O₂ and CO₂ through easily, while ions and glucose need channels or carrier proteins.
- a **nucleus** with the genetic material (DNA), which controls protein synthesis
- **mitochondria**, where the cell's energy (ATP) is made by cellular respiration
- **ribosomes** and the **endoplasmic reticulum**, where proteins are built, and the **Golgi apparatus**, which packages and ships them
- **lysosomes**, which break down waste and foreign material

## Transport across the membrane
- **Diffusion**: substances move from high to low concentration, without energy. This is how O₂ passes from the alveoli into the blood.
- **Osmosis**: water diffuses across a semi-permeable membrane towards the side with the higher concentration of solutes. Red blood cells placed in pure water swell and burst; in strong salt solution they shrink. That is why intravenous fluids are **isotonic** – for example NaCl 9 mg/mL (0.9 %).
- **Active transport** uses ATP to move substances against the concentration gradient. The **sodium–potassium pump** keeps a lot of potassium inside cells and sodium outside – the basis of nerve and muscle function.

## The four tissue types
- **Epithelial tissue** covers surfaces and lines cavities: skin, mucous membranes, glands.
- **Connective tissue** binds and supports: bone, cartilage, tendons, fat and **blood**.
- **Muscle tissue**: skeletal muscle (voluntary), smooth muscle (gut, blood vessels) and cardiac muscle.
- **Nervous tissue**: neurons that conduct signals, and supporting glial cells.

## Body fluids
In an adult about **60 %** of body weight is water (less in the elderly and people with much fat, more in infants). About **two thirds** is **intracellular fluid** and one third **extracellular** – split between **interstitial fluid** between the cells (about three quarters) and **blood plasma** (about a quarter). Sodium dominates outside the cells, potassium inside.

## Homeostasis and feedback
**Homeostasis** is the body's ability to keep a stable internal environment: temperature around 37 °C, blood glucose around 4–7 mmol/L, blood **pH 7.35–7.45**, blood pressure, fluid and salt balance. It works by **negative feedback**: a **sensor** detects a deviation, a **control centre** (often the hypothalamus) compares it with a set point, and an **effector** counteracts the change.
- When you are too hot, skin vessels dilate and you sweat. When you are too cold, they constrict and you shiver.
- When blood glucose rises after a meal, the pancreas releases **insulin**; when it falls, **glucagon**.

**Positive feedback** amplifies a change towards an end point: labour contractions (oxytocin) and blood clotting. Disease can be seen as a failure of homeostasis – fever, diabetes and dehydration are examples.

> Sensor → control centre → effector. Negative feedback stabilises, positive feedback amplifies.`);

DEEP("SANA", "Hjerte og sirkulasjon",
`## Hjertets ledningssystem
Hjertet slår av seg selv. Impulsen starter i **sinusknuten** (60–100 slag/min i hvile), sprer seg over forkamrene, som trekker seg sammen, og når **AV-knuten**. Der forsinkes den litt, slik at ventriklene rekker å fylles. Deretter går den gjennom **His' bunt**, høyre og venstre **grenbunt** og **Purkinje-fibrene** ut i ventrikkelmuskulaturen. Det **autonome nervesystemet** justerer takten: sympatikus øker puls og kraft, parasympatikus (vagusnerven) senker pulsen.

På **EKG** ser du dette som
- **P-takken**: forkamrene depolariseres
- **QRS-komplekset**: ventriklene depolariseres og trekker seg sammen
- **T-takken**: ventriklene repolariseres

## Hjertesyklusen
I **systolen** trekker ventriklene seg sammen og pumper blod ut; i **diastolen** slapper de av og fylles. Hjertemuskelen selv får blod gjennom **koronararteriene**, hovedsakelig i diastolen – derfor tåler et sykt hjerte høy puls dårlig. **Slagvolumet** avhenger av
- **preload**: hvor mye ventrikkelen fylles. Jo mer den strekkes, desto kraftigere trekker den seg sammen (**Frank-Starlings lov**), innenfor visse grenser.
- **afterload**: motstanden ventrikkelen må pumpe mot, særlig blodtrykket i aorta.
- **kontraktiliteten**: muskelens egen kraft, som øker med adrenalin.

## Blodårene og blodtrykket
**Arteriene** har tykke, elastiske og muskulære vegger og høyt trykk. **Arteriolene** regulerer motstanden og dermed blodtrykket. I **kapillærene** – med vegger bare ett cellelag tykke – skjer utvekslingen av O₂, næring, CO₂ og avfall. **Venene** har lavt trykk, tynne vegger og **klaffer**; muskelpumpen i leggene hjelper blodet tilbake til hjertet. Rundt **70 %** av blodvolumet befinner seg i venene.

Blodtrykket er **minuttvolum × perifer motstand**. Det reguleres
- raskt av **baroreseptorer** i aortabuen og halspulsårene, som via hjernestammen endrer puls og karenes diameter
- langsommere av nyrene og **renin-angiotensin-aldosteron-systemet** (RAAS), som trekker karene sammen og holder på salt og vann, og av **ADH**

Normalt blodtrykk hos voksne er omkring 120/80 mmHg. **Hypertensjon** defineres vanligvis som 140/90 eller høyere ved gjentatte målinger.

## Blodet
En voksen har omkring **5 liter** blod (ca. 70 ml/kg). Det består av **plasma** (vann, proteiner som albumin, salter, næringsstoffer) og celler:
- **Erytrocytter** (røde blodceller) frakter O₂ bundet til **hemoglobin**. Lav Hb kalles **anemi** og gir tretthet, blekhet og tung pust.
- **Leukocytter** (hvite blodceller) forsvarer mot infeksjoner.
- **Trombocytter** (blodplater) og koagulasjonsfaktorer stopper blødninger.

**Lymfesystemet** fører væske som lekker ut av kapillærene tilbake til blodet og har lymfeknuter som filtrerer mikrober.

> Sinusknute → AV-knute → His' bunt → Purkinje. Blodtrykk = minuttvolum × motstand.`,
`## The conduction system
The heart beats on its own. The impulse starts in the **sinus node** (60–100 beats/min at rest), spreads over the atria, which contract, and reaches the **AV node**. There it is briefly delayed so the ventricles have time to fill. It then passes through the **bundle of His**, the right and left **bundle branches** and the **Purkinje fibres** into the ventricular muscle. The **autonomic nervous system** adjusts the rate: the sympathetic system raises rate and force, the parasympathetic (the vagus nerve) slows the heart.

On an **ECG** this appears as
- the **P wave**: the atria depolarise
- the **QRS complex**: the ventricles depolarise and contract
- the **T wave**: the ventricles repolarise

## The cardiac cycle
In **systole** the ventricles contract and pump blood out; in **diastole** they relax and fill. The heart muscle itself gets blood through the **coronary arteries**, mainly during diastole – so a diseased heart tolerates a fast rate poorly. **Stroke volume** depends on
- **preload**: how much the ventricle fills. The more it is stretched, the more forcefully it contracts (**the Frank–Starling law**), within limits.
- **afterload**: the resistance the ventricle pumps against, mainly the pressure in the aorta.
- **contractility**: the muscle's own strength, which increases with adrenaline.

## Blood vessels and blood pressure
**Arteries** have thick, elastic, muscular walls and high pressure. **Arterioles** regulate resistance and thus blood pressure. In the **capillaries** – with walls just one cell thick – O₂, nutrients, CO₂ and waste are exchanged. **Veins** have low pressure, thin walls and **valves**; the calf muscle pump helps blood back to the heart. About **70 %** of the blood volume is in the veins.

Blood pressure is **cardiac output × peripheral resistance**. It is regulated
- quickly by **baroreceptors** in the aortic arch and carotid arteries, which via the brainstem change heart rate and vessel diameter
- more slowly by the kidneys and the **renin–angiotensin–aldosterone system** (RAAS), which constricts vessels and retains salt and water, and by **ADH**

Normal adult blood pressure is around 120/80 mmHg. **Hypertension** is usually defined as 140/90 or higher on repeated measurements.

## The blood
An adult has about **5 litres** of blood (about 70 mL/kg). It consists of **plasma** (water, proteins such as albumin, salts, nutrients) and cells:
- **Erythrocytes** (red blood cells) carry O₂ bound to **haemoglobin**. Low Hb is called **anaemia** and causes fatigue, pallor and breathlessness.
- **Leukocytes** (white blood cells) defend against infection.
- **Thrombocytes** (platelets) and clotting factors stop bleeding.

**The lymphatic system** returns fluid that leaks out of the capillaries to the blood and has lymph nodes that filter microbes.

> Sinus node → AV node → bundle of His → Purkinje. Blood pressure = cardiac output × resistance.`);

DEEP("SANA", "Respirasjon",
`## Luftveiene
Luften går gjennom **nese** (der den varmes, fuktes og renses) og **svelg** til **strupehodet**, der **epiglottis** lukker luftveiene når vi svelger. Videre går den gjennom **luftrøret** (trachea), som deler seg i høyre og venstre **hovedbronkie** – den høyre er kortere, bredere og mer loddrett, så fremmedlegemer havner oftest der. Bronkiene forgrener seg til stadig mindre **bronkioler** og ender i omkring **300–500 millioner alveoler**, med en samlet overflate på størrelse med en tennisbane. Slimhinnen har **flimmerhår** som transporterer slim og partikler opp mot svelget (mukociliær transport); røyking lammer dem.

## Pustemekanikken
- **Inspirasjon** er aktiv: **diafragma** trekker seg sammen og flater ut, og de ytre interkostalmusklene løfter brystkassen. Volumet øker, trykket faller, og luft strømmer inn.
- **Ekspirasjon** er i hvile **passiv**: musklene slapper av, og lungenes elastisitet presser luften ut. Ved anstrengelse eller obstruksjon (KOLS, astma) brukes også buk- og hjelpemuskler.
- **Surfaktant** i alveolene senker overflatespenningen så de ikke klapper sammen.
- Et vanlig åndedrag (**tidalvolum**) er omtrent 500 ml. Normal **respirasjonsfrekvens** hos voksne er 12–20 per minutt.

## Gassutvekslingen
O₂ og CO₂ går ved **diffusjon** over den tynne veggen mellom alveolene og kapillærene. Diffusjonen blir dårligere ved tykkere vegg (lungefibrose), væske i alveolene (lungeødem, pneumoni), færre alveoler (emfysem) eller dårlig blodgjennomstrømning (lungeemboli).
- **Oksygen** fraktes nesten helt bundet til **hemoglobin**. **SpO₂** måler hvor stor andel av hemoglobinet som bærer O₂; normalt **96–100 %** hos lungefriske.
- **Karbondioksid** fraktes mest som **bikarbonat** i plasma, resten løst eller bundet til hemoglobin.

## Regulering av pusten
**Respirasjonssenteret** i hjernestammen styrer pusten automatisk. Den viktigste drivkraften er **CO₂-nivået** (og dermed pH) i blodet, som registreres av kjemoreseptorer. Stiger CO₂, puster vi raskere og dypere. Lavt O₂ gir også økt pustebehov, men først ved ganske lave verdier. Hos noen pasienter med alvorlig KOLS kan for mye oksygen gi **CO₂-opphopning**; derfor er målet for SpO₂ hos dem ofte **88–92 %** etter legens forordning.

## Pust og syre-base
Lungene kvitter seg med syre i form av CO₂. **Hypoventilasjon** (for eksempel ved opioidoverdose) gir CO₂-opphopning og **respiratorisk acidose**. **Hyperventilasjon** (angst, smerte) gir lav CO₂ og **respiratorisk alkalose**, med prikking i fingrene og svimmelhet. Ved **metabolsk acidose** (for eksempel diabetisk ketoacidose) kompenserer kroppen med dyp, rask pust (**Kussmaul-respirasjon**).

## Sykepleierens observasjoner
Tell respirasjonsfrekvensen i **et helt minutt** uten at pasienten vet det. Se etter bruk av hjelpemuskulatur, leppepust, **cyanose**, uro og forvirring, og lytt etter piping eller surkling. Økende respirasjonsfrekvens er ofte det **første tegnet** på at en pasient blir dårligere.

> Inn: aktiv (diafragma). Ut: passiv i hvile. CO₂ styrer pusten. Respirasjonsfrekvensen er det viktigste – og mest oversette – vitale tegnet.`,
`## The airways
Air passes through the **nose** (where it is warmed, humidified and filtered) and **pharynx** to the **larynx**, where the **epiglottis** closes the airway when we swallow. It continues through the **trachea**, which divides into the right and left **main bronchi** – the right one is shorter, wider and more vertical, so foreign bodies usually end up there. The bronchi branch into ever smaller **bronchioles** and end in some **300–500 million alveoli**, with a combined surface the size of a tennis court. The lining has **cilia** that carry mucus and particles up towards the throat (mucociliary clearance); smoking paralyses them.

## The mechanics of breathing
- **Inspiration** is active: the **diaphragm** contracts and flattens, and the external intercostal muscles lift the rib cage. Volume increases, pressure falls, and air flows in.
- **Expiration** at rest is **passive**: the muscles relax and the lungs' elasticity pushes air out. During exertion or obstruction (COPD, asthma) abdominal and accessory muscles are also used.
- **Surfactant** in the alveoli lowers surface tension so they do not collapse.
- A normal breath (the **tidal volume**) is about 500 mL. The normal adult **respiratory rate** is 12–20 per minute.

## Gas exchange
O₂ and CO₂ cross the thin wall between alveoli and capillaries by **diffusion**. Diffusion worsens with a thicker wall (pulmonary fibrosis), fluid in the alveoli (pulmonary oedema, pneumonia), fewer alveoli (emphysema) or poor blood flow (pulmonary embolism).
- **Oxygen** is carried almost entirely bound to **haemoglobin**. **SpO₂** measures the share of haemoglobin carrying O₂; normally **96–100 %** in people with healthy lungs.
- **Carbon dioxide** is carried mostly as **bicarbonate** in plasma, the rest dissolved or bound to haemoglobin.

## Control of breathing
The **respiratory centre** in the brainstem controls breathing automatically. The main driver is the blood's **CO₂ level** (and thus pH), detected by chemoreceptors. When CO₂ rises, we breathe faster and deeper. Low O₂ also increases the drive to breathe, but only at fairly low levels. In some patients with severe COPD too much oxygen can cause **CO₂ retention**; their SpO₂ target is therefore often **88–92 %** as prescribed by the doctor.

## Breathing and acid–base
The lungs get rid of acid in the form of CO₂. **Hypoventilation** (for example in opioid overdose) leads to CO₂ build-up and **respiratory acidosis**. **Hyperventilation** (anxiety, pain) gives low CO₂ and **respiratory alkalosis**, with tingling fingers and dizziness. In **metabolic acidosis** (for example diabetic ketoacidosis) the body compensates with deep, rapid breathing (**Kussmaul breathing**).

## Nursing observations
Count the respiratory rate for **a full minute** without the patient knowing. Look for use of accessory muscles, pursed-lip breathing, **cyanosis**, restlessness and confusion, and listen for wheezing or crackles. A rising respiratory rate is often the **first sign** that a patient is deteriorating.

> In: active (diaphragm). Out: passive at rest. CO₂ drives breathing. The respiratory rate is the most important – and most overlooked – vital sign.`);

DEEP("SANA", "Nervesystemet",
`## Oppbygning
- **Sentralnervesystemet** (CNS): hjernen og ryggmargen, beskyttet av hodeskallen, ryggvirvlene, hjernehinnene og **cerebrospinalvæske**.
- **Det perifere nervesystemet**: nervene ut i kroppen. Det deles i det **somatiske** (viljestyrte muskler og sanser) og det **autonome** (indre organer).

Det autonome nervesystemet har to deler som virker mot hverandre:
- **Sympatikus** – «kamp eller flukt»: høyere puls og blodtrykk, utvidede bronkier og pupiller, mer blodsukker, mindre tarmaktivitet. Signalstoffet ut til organene er hovedsakelig **noradrenalin**, og binyremargen skiller ut **adrenalin**.
- **Parasympatikus** – «hvile og fordøyelse»: lavere puls, økt tarmaktivitet og spyttsekresjon, sammentrukne pupiller. Signalstoffet er **acetylkolin**, og vagusnerven er den viktigste nerven.

Mange legemidler virker her: betablokkere demper sympatikus, og antikolinerge legemidler hemmer parasympatikus (gir munntørrhet, urinretensjon og forvirring hos eldre).

## Nevronet og signalet
Et **nevron** har **dendritter** som tar imot signaler, en **cellekropp** og et **akson** som sender signalet videre. Mange aksoner er dekket av **myelin**, som gjør ledningen mye raskere; ved **multippel sklerose** angripes myelinet. Signalet er et elektrisk **aksjonspotensial**: natrium strømmer inn, så strømmer kalium ut. Mellom nevronene ligger **synapser**, der **nevrotransmittere** frigjøres og binder seg til reseptorer på neste celle. Eksempler: **acetylkolin** (muskler), **dopamin** (bevegelse og belønning – mangler ved Parkinsons sykdom), **serotonin** (stemning, søvn), **GABA** (hemmende – forsterkes av benzodiazepiner) og **glutamat** (stimulerende).

## Hjernen
- **Storhjernen** har to halvdeler, og hver styrer motsatt kroppshalvdel. Språksenteret ligger hos de fleste i **venstre** hjernehalvdel. Lappene har ulike hovedoppgaver:
  - **pannelappen**: planlegging, personlighet, impulskontroll og viljestyrt bevegelse
  - **isselappen**: følelse (sensorikk) og romforståelse
  - **tinninglappen**: hørsel, språkforståelse og hukommelse (hippocampus)
  - **bakhodelappen**: syn
- **Lillehjernen**: balanse og koordinasjon.
- **Hjernestammen**: livsviktige funksjoner som pust, hjerterytme, blodtrykk og bevissthet, og utgangspunkt for de fleste hjernenervene.
- **Hypothalamus** styrer temperatur, sult, tørste og hormoner via **hypofysen**.

Hjernen bruker omtrent **20 %** av kroppens oksygen og tåler bare noen få minutter uten blodtilførsel. **Blod-hjerne-barrieren** beskytter hjernen, men gjør at mange legemidler ikke kommer inn.

## Ryggmargen og reflekser
Ryggmargen leder signaler mellom hjernen og kroppen. **Reflekser**, som kneskjellrefleksen og tilbaketrekning fra noe varmt, går via ryggmargen uten at hjernen må tenke først. En skade på ryggmargen gir lammelser og følelsestap **under** skadestedet.

## Vurdering av bevissthet
Sykepleiere vurderer bevissthet med **ACVPU** (våken, ny forvirring, reagerer på tiltale, reagerer på smerte, ikke kontaktbar) eller **Glasgow Coma Scale** (GCS, 3–15 poeng: øyeåpning, verbal respons og motorisk respons). GCS på 8 eller lavere tyder på at pasienten kan ha problemer med å holde frie luftveier. Se også på pupillene: ulik størrelse eller lysstive pupiller kan bety økt trykk i hodet.

> Sympatikus = gass, parasympatikus = brems. Venstre hjernehalvdel styrer høyre kroppshalvdel.`,
`## Structure
- **The central nervous system** (CNS): the brain and spinal cord, protected by the skull, vertebrae, meninges and **cerebrospinal fluid**.
- **The peripheral nervous system**: the nerves out into the body. It is divided into the **somatic** (voluntary muscles and senses) and the **autonomic** (internal organs).

The autonomic nervous system has two opposing parts:
- **Sympathetic** – "fight or flight": higher heart rate and blood pressure, dilated bronchi and pupils, more blood glucose, less gut activity. The transmitter at the organs is mainly **noradrenaline**, and the adrenal medulla releases **adrenaline**.
- **Parasympathetic** – "rest and digest": lower heart rate, more gut activity and saliva, constricted pupils. The transmitter is **acetylcholine**, and the vagus nerve is the most important nerve.

Many drugs act here: beta blockers damp the sympathetic system, and anticholinergic drugs inhibit the parasympathetic (causing dry mouth, urinary retention and confusion in the elderly).

## The neuron and the signal
A **neuron** has **dendrites** that receive signals, a **cell body** and an **axon** that passes the signal on. Many axons are covered in **myelin**, which makes conduction much faster; in **multiple sclerosis** the myelin is attacked. The signal is an electrical **action potential**: sodium flows in, then potassium flows out. Between neurons are **synapses**, where **neurotransmitters** are released and bind to receptors on the next cell. Examples: **acetylcholine** (muscles), **dopamine** (movement and reward – lacking in Parkinson's disease), **serotonin** (mood, sleep), **GABA** (inhibitory – enhanced by benzodiazepines) and **glutamate** (excitatory).

## The brain
- **The cerebrum** has two hemispheres, and each controls the opposite side of the body. The language centre is in the **left** hemisphere in most people. The lobes have different main tasks:
  - **frontal lobe**: planning, personality, impulse control and voluntary movement
  - **parietal lobe**: sensation and spatial awareness
  - **temporal lobe**: hearing, language comprehension and memory (hippocampus)
  - **occipital lobe**: vision
- **The cerebellum**: balance and coordination.
- **The brainstem**: vital functions such as breathing, heart rhythm, blood pressure and consciousness, and the origin of most cranial nerves.
- **The hypothalamus** controls temperature, hunger, thirst and hormones via the **pituitary gland**.

The brain uses about **20 %** of the body's oxygen and tolerates only a few minutes without blood supply. **The blood–brain barrier** protects the brain but keeps many drugs out.

## The spinal cord and reflexes
The spinal cord carries signals between brain and body. **Reflexes**, such as the knee jerk and withdrawing from something hot, go via the spinal cord without the brain having to think first. Spinal cord injury causes paralysis and loss of sensation **below** the level of injury.

## Assessing consciousness
Nurses assess consciousness with **ACVPU** (alert, new confusion, responds to voice, responds to pain, unresponsive) or the **Glasgow Coma Scale** (GCS, 3–15 points: eye opening, verbal response and motor response). A GCS of 8 or lower suggests the patient may struggle to keep an open airway. Also check the pupils: unequal size or pupils that do not react to light may mean raised intracranial pressure.

> Sympathetic = accelerator, parasympathetic = brake. The left hemisphere controls the right side of the body.`);

DEEP("SANA", "Nyrer, væske og elektrolytter",
`## Nyrenes oppgaver
Nyrene gjør mye mer enn å lage urin. De
- skiller ut **avfallsstoffer** (urea, kreatinin, urinsyre) og mange **legemidler**
- regulerer **væskevolum**, **elektrolytter** (natrium, kalium, kalsium, fosfat) og **syre-base-balansen**
- påvirker **blodtrykket** gjennom renin
- lager **erytropoietin** (EPO), som stimulerer dannelsen av røde blodceller – derfor får nyresyke ofte anemi
- aktiverer **D-vitamin**, som trengs for kalsiumopptak og sterke knokler

## Nefronet
Hver nyre har omtrent **én million nefroner**. I **glomerulus**, et nøste av kapillærer, filtreres blodplasma til **primærurin** – omkring **180 liter i døgnet**. Blodceller og store proteiner holdes tilbake; protein eller blod i urinen kan derfor tyde på skade på filteret. I **tubuli** tas nesten alt tilbake (**reabsorpsjon**): vann, glukose, aminosyrer og salter. Noen stoffer **secerneres** aktivt ut i tubuli. Til slutt blir det bare **1–2 liter urin** i døgnet. Glukose i urinen betyr at blodsukkeret er så høyt at tubuli ikke klarer å ta alt tilbake (over ca. 10 mmol/l).

**GFR** (glomerulær filtrasjonshastighet) er det viktigste målet på nyrefunksjonen. Den beregnes som **eGFR** ut fra **kreatinin** i blodet, alder og kjønn. Normalt er den omkring 90–120 ml/min/1,73 m², og den synker gradvis med alderen. Ved lav eGFR må dosen av mange legemidler reduseres.

## Hormonene som styrer væskebalansen
- **ADH** (antidiuretisk hormon) fra hypofysen får nyrene til å holde på **vann**. Det skilles ut ved tørste og høy saltkonsentrasjon i blodet. Alkohol hemmer ADH – derfor tisser man mye.
- **Aldosteron** fra binyrebarken får nyrene til å holde på **natrium** (og dermed vann) og skille ut **kalium**.
- **RAAS**: når blodtrykket eller blodvolumet faller, skiller nyrene ut **renin** → angiotensin II trekker sammen blodårene og frigjør aldosteron. ACE-hemmere og angiotensin-II-antagonister blokkerer dette systemet.
- **ANP** fra hjertets forkamre gjør det motsatte når hjertet strekkes av for mye væske.

## Elektrolytter
- **Natrium** (ca. 137–145 mmol/l) er det viktigste ionet utenfor cellene og styrer hvor vannet går. **Hyponatremi** gir kvalme, forvirring og i verste fall kramper; vanlige årsaker er tiazider, oppkast og for mye vann.
- **Kalium** (ca. 3,5–4,5 mmol/l) er det viktigste ionet inne i cellene og avgjørende for hjerterytmen. **Både for lavt og for høyt kalium kan gi farlige hjerterytmeforstyrrelser.** Hypokalemi skyldes ofte slyngediuretika (furosemid) eller diaré; hyperkalemi ofte nyresvikt eller kaliumsparende legemidler.
- **Kalsium** trengs for muskler, nerver, knokler og blodets koagulasjon.

Referanseområdene varierer litt mellom laboratorier – bruk alltid det lokale.

## Urinproduksjon og observasjoner
En voksen bør produsere minst omtrent **0,5 ml urin per kilo kroppsvekt per time**. Lavere **diurese** kan være et tidlig tegn på dehydrering, sirkulasjonssvikt, sepsis eller nyresvikt. Observer mengde, farge (mørk urin tyder på konsentrert urin), lukt og eventuelle smerter ved vannlating. **Akutt nyreskade** kan utløses av dehydrering, sepsis, kontrastmidler og legemidler som NSAIDs – særlig hos eldre som også bruker ACE-hemmere og diuretika.

> Nyrene = filter + regulator + hormonkjertel. ADH holder på vann, aldosteron holder på natrium.`,
`## What the kidneys do
The kidneys do much more than make urine. They
- excrete **waste products** (urea, creatinine, uric acid) and many **drugs**
- regulate **fluid volume**, **electrolytes** (sodium, potassium, calcium, phosphate) and **acid–base balance**
- influence **blood pressure** through renin
- produce **erythropoietin** (EPO), which stimulates red blood cell production – so kidney patients often become anaemic
- activate **vitamin D**, needed for calcium uptake and strong bones

## The nephron
Each kidney has about **one million nephrons**. In the **glomerulus**, a tuft of capillaries, blood plasma is filtered into **primary urine** – about **180 litres a day**. Blood cells and large proteins are held back; protein or blood in the urine may therefore indicate damage to the filter. In the **tubules** almost everything is taken back (**reabsorption**): water, glucose, amino acids and salts. Some substances are actively **secreted** into the tubules. In the end only **1–2 litres of urine** are produced per day. Glucose in the urine means blood glucose is so high that the tubules cannot reabsorb it all (above about 10 mmol/L).

**GFR** (glomerular filtration rate) is the key measure of kidney function. It is estimated as **eGFR** from blood **creatinine**, age and sex. Normally it is about 90–120 mL/min/1.73 m², falling gradually with age. With low eGFR the dose of many drugs must be reduced.

## The hormones that control fluid balance
- **ADH** (antidiuretic hormone) from the pituitary makes the kidneys retain **water**. It is released with thirst and high salt concentration in the blood. Alcohol inhibits ADH – which is why you urinate a lot.
- **Aldosterone** from the adrenal cortex makes the kidneys retain **sodium** (and so water) and excrete **potassium**.
- **RAAS**: when blood pressure or volume falls, the kidneys release **renin** → angiotensin II constricts vessels and releases aldosterone. ACE inhibitors and angiotensin II receptor blockers block this system.
- **ANP** from the atria does the opposite when the heart is stretched by too much fluid.

## Electrolytes
- **Sodium** (about 137–145 mmol/L) is the main ion outside cells and decides where water goes. **Hyponatraemia** causes nausea, confusion and at worst seizures; common causes are thiazides, vomiting and too much water.
- **Potassium** (about 3.5–4.5 mmol/L) is the main ion inside cells and crucial for heart rhythm. **Both low and high potassium can cause dangerous arrhythmias.** Hypokalaemia is often due to loop diuretics (furosemide) or diarrhoea; hyperkalaemia often to kidney failure or potassium-sparing drugs.
- **Calcium** is needed for muscles, nerves, bones and blood clotting.

Reference ranges vary slightly between laboratories – always use the local one.

## Urine output and observations
An adult should produce at least about **0.5 mL of urine per kilogram of body weight per hour**. Lower **urine output** can be an early sign of dehydration, circulatory failure, sepsis or kidney failure. Observe volume, colour (dark urine suggests concentrated urine), smell and any pain on urination. **Acute kidney injury** can be triggered by dehydration, sepsis, contrast agents and drugs such as NSAIDs – especially in older people who also take ACE inhibitors and diuretics.

> Kidneys = filter + regulator + endocrine gland. ADH retains water, aldosterone retains sodium.`);

DEEP("SANA", "Fordøyelse og ernæring",
`## Fordøyelseskanalen trinn for trinn
- **Munnen**: maten tygges og blandes med spytt, som inneholder **amylase** som starter nedbrytningen av stivelse.
- **Spiserøret**: maten skyves ned med bølgende muskelbevegelser (**peristaltikk**). En lukkemuskel nederst hindrer at magesyre kommer opp; svikter den, får man **refluks** og halsbrann.
- **Magesekken**: blander maten med **saltsyre** (dreper mikrober) og **pepsin** (bryter ned proteiner). Slimlaget beskytter magesekken mot syra; NSAIDs svekker det og kan gi **magesår**. Magesekken lager også **intrinsic factor**, som trengs for å ta opp **vitamin B12**.
- **Tynntarmen** (ca. 3–5 meter: tolvfingertarmen, jejunum og ileum) er der det meste av **fordøyelsen og opptaket** skjer. Innsiden er dekket av **tarmtotter** (villi) som gir en enorm overflate. I tolvfingertarmen kommer
  - **galle** fra leveren (lagret i galleblæren), som **emulgerer fett** så enzymene kan bryte det ned
  - **bukspytt** med enzymer for karbohydrater (amylase), fett (lipase) og proteiner (trypsin), og bikarbonat som nøytraliserer syra
- **Tykktarmen**: tar opp **vann** og salter, slik at avføringen blir fast. Tarmbakteriene bryter ned fiber og lager blant annet **vitamin K**. Antibiotika kan forstyrre floraen og gi diaré.

## Leveren
Leveren er kroppens kjemiske fabrikk. Den
- lagrer glukose som **glykogen** og frigjør den ved behov
- lager **albumin** og **koagulasjonsfaktorer** – ved leversvikt får pasienten ødemer og blødningstendens
- **omdanner og uskadeliggjør** legemidler, alkohol og avfallsstoffer (som ammoniakk til urea)
- lager galle og bryter ned gamle røde blodceller; når bilirubin hoper seg opp, blir huden og øyehvitene gule (**ikterus**)

Alt blod fra tarmen går først gjennom leveren via **portvenen** – årsaken til **førstepassasjeeffekten** for legemidler som tas gjennom munnen.

## Næringsstoffene
- **Karbohydrater** (4 kcal/g) brytes ned til glukose, hjernens viktigste brensel.
- **Proteiner** (4 kcal/g) brytes ned til aminosyrer og brukes til å bygge og reparere vev, enzymer og antistoffer. Syke og eldre har ofte økt proteinbehov.
- **Fett** (9 kcal/g) gir mest energi og trengs for å ta opp de fettløselige vitaminene **A, D, E og K**.
- **Alkohol** gir 7 kcal/g.
- **Vitaminer, mineraler, fiber og vann** gir ikke energi (bortsett fra noe fra fiber), men er livsnødvendige.

## Regulering av blodsukkeret
**Bukspyttkjertelen** har også en hormonfunksjon: **Langerhanske øyer** lager **insulin** (betaceller), som senker blodsukkeret ved å slippe glukose inn i cellene, og **glukagon** (alfaceller), som øker det ved å frigjøre glukose fra leveren. Ved **diabetes** svikter dette systemet.

## Ernæring i sykepleien
Underernæring er vanlig hos syke og eldre og gir dårligere sårtilheling, flere infeksjoner, muskeltap, fall og lengre liggetid. Alle innlagte pasienter skal **screenes** for ernæringsmessig risiko. En voksen sengeliggende pasient trenger omtrent **30 kcal per kilo** i døgnet, mer ved feber, sår og oppbygging. Sykepleieren observerer **matinntak**, **vekt**, **tygge- og svelgevansker**, munnstatus og **avføring** (obstipasjon er vanlig ved opioider, lite bevegelse og lite drikke).

> Tynntarmen tar opp næringen, tykktarmen tar opp vannet. Leveren er fabrikken; bukspyttkjertelen styrer blodsukkeret.`,
`## The digestive tract step by step
- **The mouth**: food is chewed and mixed with saliva, which contains **amylase** that starts breaking down starch.
- **The oesophagus**: food is pushed down by waves of muscle contraction (**peristalsis**). A sphincter at the bottom stops stomach acid coming up; if it fails, you get **reflux** and heartburn.
- **The stomach**: mixes food with **hydrochloric acid** (kills microbes) and **pepsin** (breaks down proteins). The mucus layer protects the stomach from the acid; NSAIDs weaken it and can cause **ulcers**. The stomach also produces **intrinsic factor**, needed to absorb **vitamin B12**.
- **The small intestine** (about 3–5 metres: duodenum, jejunum and ileum) is where most **digestion and absorption** take place. Its lining is covered in **villi** that give a huge surface. Into the duodenum come
  - **bile** from the liver (stored in the gallbladder), which **emulsifies fat** so enzymes can break it down
  - **pancreatic juice** with enzymes for carbohydrates (amylase), fat (lipase) and proteins (trypsin), and bicarbonate that neutralises the acid
- **The large intestine**: absorbs **water** and salts, so stools become firm. Gut bacteria break down fibre and produce **vitamin K**, among other things. Antibiotics can disturb the flora and cause diarrhoea.

## The liver
The liver is the body's chemical factory. It
- stores glucose as **glycogen** and releases it when needed
- makes **albumin** and **clotting factors** – in liver failure the patient gets oedema and a bleeding tendency
- **transforms and detoxifies** drugs, alcohol and waste (such as ammonia to urea)
- makes bile and breaks down old red blood cells; when bilirubin builds up, skin and eyes turn yellow (**jaundice**)

All blood from the gut passes through the liver first via the **portal vein** – the reason for the **first-pass effect** for drugs taken by mouth.

## The nutrients
- **Carbohydrates** (4 kcal/g) are broken down to glucose, the brain's main fuel.
- **Proteins** (4 kcal/g) are broken down to amino acids and used to build and repair tissue, enzymes and antibodies. Sick and older people often need more protein.
- **Fat** (9 kcal/g) gives the most energy and is needed to absorb the fat-soluble vitamins **A, D, E and K**.
- **Alcohol** provides 7 kcal/g.
- **Vitamins, minerals, fibre and water** provide no energy (apart from a little from fibre), but are essential.

## Regulating blood glucose
The **pancreas** also has a hormonal role: the **islets of Langerhans** produce **insulin** (beta cells), which lowers blood glucose by letting glucose into cells, and **glucagon** (alpha cells), which raises it by releasing glucose from the liver. In **diabetes** this system fails.

## Nutrition in nursing
Malnutrition is common in sick and older people and leads to poorer wound healing, more infections, muscle loss, falls and longer stays. All admitted patients should be **screened** for nutritional risk. An adult bedridden patient needs about **30 kcal per kilogram** per day, more with fever, wounds and recovery. The nurse observes **food intake**, **weight**, **chewing and swallowing problems**, oral health and **bowel function** (constipation is common with opioids, immobility and low fluid intake).

> The small intestine absorbs nutrients, the large intestine absorbs water. The liver is the factory; the pancreas controls blood glucose.`);

// ================= FARMAKOLOGI =================
DEEP("SFARM", "Farmakokinetikk",
`## ADME – legemidlets reise gjennom kroppen
Farmakokinetikk handler om hva **kroppen gjør med legemidlet**. Det beskrives med fire trinn:

**1. Absorpsjon** – opptaket til blodet. **Intravenøst** gitt legemiddel er i blodet med én gang (biotilgjengelighet 100 %). Ved **peroral** bruk må det tas opp fra tarmen og deretter passere leveren. Det som brytes ned der før det når kroppen ellers, kalles **førstepassasjemetabolisme**. **Biotilgjengeligheten** er andelen av dosen som når blodbanen uforandret. Andre veier er **sublingual** og **rektal** (delvis forbi leveren), **subkutan**, **intramuskulær**, **transdermal** (plaster), **inhalasjon** og **lokal** bruk. Opptaket påvirkes av mat, tarmmotilitet og legemiddelform – **depottabletter** frigjør virkestoffet langsomt og må **ikke knuses**.

**2. Distribusjon** – fordelingen ut i vevet. Mange legemidler bindes til **plasmaproteiner** (særlig albumin); bare den **frie** delen virker. Ved lavt albumin (underernæring, leversvikt) kan virkningen bli sterkere. Fettløselige legemidler hoper seg opp i fettvev og passerer blod-hjerne-barrieren lettere.

**3. Metabolisme** – omdanning, hovedsakelig i **leveren**, ofte av **CYP-enzymer**. Metabolismen gjør stoffene mer vannløselige, slik at de kan skilles ut. Noen legemidler er **prodrugs** som først blir aktive etter metabolismen (for eksempel kodein, som delvis omdannes til morfin). Andre legemidler og matvarer kan **hemme** eller **indusere** CYP-enzymene og gi **interaksjoner**: grapefruktjuice hemmer et viktig enzym og kan gi for høye konsentrasjoner av enkelte legemidler; johannesurt og noen epilepsimidler induserer enzymer og kan gjøre for eksempel p-piller mindre sikre.

**4. Eliminasjon** – utskillelse, særlig via **nyrene** (urin) og via **galle** (avføring). Ved **nedsatt nyrefunksjon** hoper legemidler som skilles ut renalt seg opp.

## Halveringstid og steady state
**Halveringstiden** ($t_{1/2}$) er tiden det tar før konsentrasjonen i blodet er halvert. Etter fem halveringstider er omtrent 97 % borte. Ved faste doser når konsentrasjonen **steady state** – likevekt mellom tilførsel og eliminasjon – etter omtrent **4–5 halveringstider**. Derfor gis noen ganger en **metningsdose** for å få rask effekt av legemidler med lang halveringstid.

## Terapeutisk vindu
Mellom konsentrasjonen som gir effekt, og den som gir toksiske bivirkninger, ligger det **terapeutiske vinduet**. Noen legemidler har et **smalt** vindu – som **digoksin**, **litium**, **warfarin** og enkelte antibiotika og epilepsimidler – og må følges med **blodprøver** (serumkonsentrasjon eller INR).

## Eldre og barn
**Eldre** har ofte lavere nyrefunksjon, mindre muskelmasse og mer fett, lavere albumin og bruker mange legemidler samtidig. De tåler derfor ofte lavere doser og er mer utsatt for bivirkninger og interaksjoner – «start lavt, gå langsomt». **Barn** doseres som regel etter vekt (mg/kg), og spedbarns lever og nyrer er umodne.

> Absorpsjon → distribusjon → metabolisme → eliminasjon. Steady state etter 4–5 halveringstider.`,
`## ADME – a drug's journey through the body
Pharmacokinetics is about what **the body does to the drug**. It is described in four steps:

**1. Absorption** – uptake into the blood. A drug given **intravenously** is in the blood at once (bioavailability 100 %). Given **orally**, it must be absorbed from the gut and then pass the liver. What is broken down there before reaching the rest of the body is called **first-pass metabolism**. **Bioavailability** is the fraction of the dose that reaches the bloodstream unchanged. Other routes are **sublingual** and **rectal** (partly bypassing the liver), **subcutaneous**, **intramuscular**, **transdermal** (patches), **inhaled** and **topical**. Absorption is affected by food, gut motility and formulation – **modified-release tablets** release the drug slowly and must **not be crushed**.

**2. Distribution** – spreading into the tissues. Many drugs bind to **plasma proteins** (mainly albumin); only the **free** fraction is active. With low albumin (malnutrition, liver failure) the effect may be stronger. Fat-soluble drugs accumulate in fat tissue and cross the blood–brain barrier more easily.

**3. Metabolism** – transformation, mainly in the **liver**, often by **CYP enzymes**. Metabolism makes substances more water-soluble so they can be excreted. Some drugs are **prodrugs** that only become active after metabolism (for example codeine, partly converted to morphine). Other drugs and foods can **inhibit** or **induce** CYP enzymes and cause **interactions**: grapefruit juice inhibits an important enzyme and can raise the levels of some drugs too much; St John's wort and some antiepileptics induce enzymes and can make, for example, contraceptive pills less reliable.

**4. Elimination** – excretion, mainly via the **kidneys** (urine) and **bile** (faeces). With **reduced kidney function**, drugs excreted renally accumulate.

## Half-life and steady state
The **half-life** ($t_{1/2}$) is the time it takes for the blood concentration to halve. After five half-lives about 97 % is gone. With regular doses the concentration reaches **steady state** – balance between intake and elimination – after about **4–5 half-lives**. That is why a **loading dose** is sometimes given to get a rapid effect from drugs with a long half-life.

## Therapeutic window
Between the concentration that gives an effect and the one that causes toxic side effects lies the **therapeutic window**. Some drugs have a **narrow** window – such as **digoxin**, **lithium**, **warfarin** and certain antibiotics and antiepileptics – and must be monitored with **blood tests** (serum levels or INR).

## Older people and children
**Older people** often have lower kidney function, less muscle and more fat, lower albumin and take many drugs at once. They therefore often tolerate lower doses and are more prone to side effects and interactions – "start low, go slow". **Children** are usually dosed by weight (mg/kg), and infants' livers and kidneys are immature.

> Absorption → distribution → metabolism → elimination. Steady state after 4–5 half-lives.`);

DEEP("SFARM", "Farmakodynamikk og bivirkninger",
`## Hvordan legemidler virker
Farmakodynamikk handler om hva **legemidlet gjør med kroppen**. De fleste legemidler virker ved å binde seg til et **målprotein**:
- **Reseptorer**: en **agonist** binder seg og aktiverer reseptoren (morfin på opioidreseptorer, salbutamol på beta-2-reseptorer i bronkiene). En **antagonist** binder seg uten å aktivere og blokkerer andre stoffer (metoprolol blokkerer beta-reseptorer i hjertet; **nalokson** fortrenger opioider og brukes som motgift).
- **Enzymer**: legemidlet hemmer et enzym (NSAIDs hemmer COX og dermed prostaglandiner; ACE-hemmere hemmer omdanningen til angiotensin II; statiner hemmer kolesterolproduksjonen).
- **Ionekanaler** og **transportproteiner** (kalsiumblokkere, lokalanestetika, protonpumpehemmere).

## Dose og respons
- **Affinitet**: hvor godt legemidlet binder seg til målet.
- **Effekt** (efficacy): den største virkningen legemidlet kan gi.
- **Potens**: hvor lav dose som trengs. Et potent legemiddel virker i små doser, men har ikke nødvendigvis større maksimal effekt.
- **Terapeutisk indeks**: forholdet mellom toksisk og effektiv dose. Jo lavere, jo farligere er feildosering.
- **Toleranse**: virkningen avtar ved gjentatt bruk, så dosen må økes – typisk for opioider og benzodiazepiner. **Avhengighet** og **abstinens** kan følge.

## Bivirkninger
En **bivirkning** er en skadelig og utilsiktet virkning av et legemiddel. Den vanligste inndelingen:
- **Type A** (augmented) – **doseavhengige** og forutsigbare ut fra virkningsmekanismen. De er vanligst. Eksempler: blødning av antikoagulantia, lavt blodsukker av insulin, obstipasjon og respirasjonsdepresjon av opioider, svimmelhet og fall av blodtrykksmedisin.
- **Type B** (bizarre) – **ikke doseavhengige** og uforutsigbare, ofte allergiske eller immunologiske. Eksempler: utslett eller **anafylaksi** av penicillin.

## Anafylaksi
**Anafylaksi** er en alvorlig, livstruende allergisk reaksjon som kan komme i løpet av minutter: kløe, elveblest, hevelse i ansikt og svelg, pustevansker, blodtrykksfall og bevisstløshet. Behandlingen er **adrenalin intramuskulært** i lårets utside, så raskt som mulig, sammen med å tilkalle hjelp, gi oksygen og legge pasienten flatt med hevede ben (eller sittende ved pustevansker). Antihistamin og kortikosteroider gis i tillegg, men erstatter ikke adrenalin.

## Interaksjoner
To legemidler kan påvirke hverandre **farmakokinetisk** (det ene endrer opptaket eller nedbrytningen av det andre) eller **farmakodynamisk** (de forsterker eller motvirker hverandres effekt). Eksempler: NSAIDs sammen med warfarin øker blødningsrisikoen; flere sedative legemidler sammen (opioider, benzodiazepiner, alkohol) kan gi farlig respirasjonsdepresjon.

## Polyfarmasi og eldre
**Polyfarmasi** – bruk av mange legemidler samtidig, ofte fem eller flere – øker risikoen for bivirkninger, interaksjoner, fall, forvirring og innleggelser. Bivirkninger kan feiltolkes som nye sykdommer og føre til enda flere legemidler (**forskrivningskaskade**). Regelmessig **legemiddelgjennomgang** er derfor viktig.

## Rapportering
Helsepersonell skal **melde mistenkte bivirkninger**, særlig alvorlige og uventede, og alle bivirkninger av nye legemidler. Meldingene går til **Direktoratet for medisinske produkter** (DMP, tidligere Statens legemiddelverk) og hjelper med å oppdage sjeldne bivirkninger som ikke ble funnet i studiene.

> Agonist aktiverer, antagonist blokkerer. Type A: doseavhengig og vanlig. Type B: uforutsigbar. Anafylaksi = adrenalin i.m.`,
`## How drugs work
Pharmacodynamics is about what **the drug does to the body**. Most drugs act by binding to a **target protein**:
- **Receptors**: an **agonist** binds and activates the receptor (morphine at opioid receptors, salbutamol at beta-2 receptors in the bronchi). An **antagonist** binds without activating and blocks other substances (metoprolol blocks beta receptors in the heart; **naloxone** displaces opioids and is used as an antidote).
- **Enzymes**: the drug inhibits an enzyme (NSAIDs inhibit COX and thus prostaglandins; ACE inhibitors block the conversion to angiotensin II; statins inhibit cholesterol production).
- **Ion channels** and **transport proteins** (calcium channel blockers, local anaesthetics, proton pump inhibitors).

## Dose and response
- **Affinity**: how well the drug binds to its target.
- **Efficacy**: the maximum effect the drug can produce.
- **Potency**: how low a dose is needed. A potent drug works in small doses but does not necessarily have a greater maximum effect.
- **Therapeutic index**: the ratio between toxic and effective dose. The lower it is, the more dangerous a dosing error.
- **Tolerance**: the effect fades with repeated use, so the dose must be increased – typical of opioids and benzodiazepines. **Dependence** and **withdrawal** may follow.

## Adverse reactions
An **adverse drug reaction** is a harmful, unintended effect of a drug. The most common classification:
- **Type A** (augmented) – **dose-dependent** and predictable from the mechanism. They are the most common. Examples: bleeding with anticoagulants, low blood glucose with insulin, constipation and respiratory depression with opioids, dizziness and falls with blood pressure drugs.
- **Type B** (bizarre) – **not dose-dependent** and unpredictable, often allergic or immunological. Examples: rash or **anaphylaxis** from penicillin.

## Anaphylaxis
**Anaphylaxis** is a severe, life-threatening allergic reaction that can develop within minutes: itching, hives, swelling of the face and throat, breathing difficulty, falling blood pressure and loss of consciousness. Treatment is **intramuscular adrenaline** into the outer thigh as quickly as possible, together with calling for help, giving oxygen and laying the patient flat with legs raised (or sitting up if breathing is difficult). Antihistamines and corticosteroids are given as well, but do not replace adrenaline.

## Interactions
Two drugs can affect each other **pharmacokinetically** (one changes the absorption or breakdown of the other) or **pharmacodynamically** (they enhance or oppose each other's effect). Examples: NSAIDs with warfarin increase bleeding risk; several sedatives together (opioids, benzodiazepines, alcohol) can cause dangerous respiratory depression.

## Polypharmacy and older people
**Polypharmacy** – taking many drugs at once, often five or more – increases the risk of side effects, interactions, falls, confusion and admissions. Side effects may be mistaken for new diseases and lead to yet more drugs (a **prescribing cascade**). Regular **medication reviews** are therefore important.

## Reporting
Health professionals should **report suspected adverse reactions**, especially serious and unexpected ones, and all reactions to new drugs. Reports go to the **Norwegian Medical Products Agency** (DMP) and help detect rare reactions not found in clinical trials.

> Agonist activates, antagonist blocks. Type A: dose-dependent and common. Type B: unpredictable. Anaphylaxis = IM adrenaline.`);

DEEP("SFARM", "Viktige legemiddelgrupper",
`## Smertestillende
- **Paracetamol**: førstevalg ved lette og moderate smerter og feber. Skånsom mot magen, men **leverskadelig i overdose**. Maksimal døgndose for voksne er vanligvis **4 g**, lavere hos eldre, lav kroppsvekt, underernæring og leversykdom. Sjekk at pasienten ikke får paracetamol fra flere preparater samtidig.
- **NSAIDs** (ibuprofen, diklofenak, naproksen): demper smerte, feber og betennelse. Bivirkninger: **magesår og blødning**, **nyreskade** (særlig hos eldre og ved dehydrering), forverring av hjertesvikt og høyt blodtrykk. Brukes med forsiktighet hos eldre.
- **Opioider** (morfin, oksykodon, fentanyl): sterke smerter. Bivirkninger: **respirasjonsdepresjon**, sedasjon, kvalme og **obstipasjon** (gi forebyggende avføringsmiddel). Følg respirasjonsfrekvens og bevissthet. Motgift: **nalokson**.

## Hjerte og kar
- **Betablokkere** (metoprolol): senker puls og blodtrykk, brukes ved hypertensjon, angina, hjertesvikt og atrieflimmer. Mål puls før administrasjon. Kan forverre astma.
- **ACE-hemmere** (enalapril, ramipril) og **angiotensin-II-antagonister** (losartan): senker blodtrykket og avlaster hjertet. ACE-hemmere gir ofte **tørrhoste**; begge kan gi **høyt kalium** og nyrepåvirkning.
- **Kalsiumblokkere** (amlodipin): blodtrykksenkende; kan gi ankelødem.
- **Diuretika**: **slyngediuretika** (furosemid) ved hjertesvikt og ødemer – sterk vanndrivende effekt, gir **lavt kalium** og risiko for dehydrering. **Tiazider** ved hypertensjon kan gi lavt natrium.
- **Statiner** (simvastatin, atorvastatin): senker kolesterolet og forebygger hjerteinfarkt og hjerneslag. Muskelsmerter kan være en bivirkning.
- **Nitroglyserin**: utvider blodårene og lindrer angina raskt; kan gi hodepine og blodtrykksfall.

## Blodfortynnende
- **Platehemmere** (acetylsalisylsyre i lav dose, klopidogrel): forebygger blodpropp i arterier, for eksempel etter hjerteinfarkt.
- **Antikoagulantia**: **warfarin** (dosen styres etter **INR**; mange interaksjoner med mat og legemidler; motgift vitamin K), **DOAK** (apixaban, rivaroksaban, dabigatran – faste doser uten rutinemessig INR) og **lavmolekylært heparin** (dalteparin, enoksaparin) som sprøytes subkutant. Viktigste bivirkning for alle: **blødning**. Observer for blåmerker, blod i urin og avføring, og hodepine etter fall.

## Diabetes
- **Insulin**: hurtigvirkende til måltider og langtidsvirkende som basis. Viktigste bivirkning er **hypoglykemi**.
- **Metformin**: førstevalg ved type 2-diabetes; kan gi mageplager og må pauses ved alvorlig dehydrering eller nedsatt nyrefunksjon og ved røntgenkontrast etter lokale prosedyrer.
- Nyere tabletter og injeksjoner (SGLT2-hemmere, GLP-1-analoger) gir også beskyttelse for hjerte og nyrer.

## Mage og tarm
- **Protonpumpehemmere** (omeprazol, pantoprazol): reduserer magesyre, brukes ved refluks, magesår og som beskyttelse ved NSAID-bruk.
- **Avføringsmidler**: laktulose og makrogol (osmotiske), natriumpikosulfat (stimulerende).

## Nervesystemet og psyke
- **Benzodiazepiner** (diazepam, oksazepam): angstdempende og sovedyktige; gir **avhengighet**, fallrisiko og forvirring hos eldre. Motgift: flumazenil.
- **Antidepressiva** (SSRI som sertralin og escitalopram): effekten kommer etter **2–4 uker**.
- **Antipsykotika**: mot psykose og uro; kan gi bevegelsesforstyrrelser og vektøkning.

## Infeksjoner
**Antibiotika** virker bare mot bakterier. I Norge brukes ofte **smalspektrede** midler som **penicillin V** for å begrense resistens. Spør alltid om **allergi** før første dose.

> Kjenn hovedeffekt, viktigste bivirkning og hva du skal observere for hver legemiddelgruppe.`,
`## Painkillers
- **Paracetamol**: first choice for mild to moderate pain and fever. Gentle on the stomach, but **toxic to the liver in overdose**. The usual maximum daily dose for adults is **4 g**, lower in the elderly, low body weight, malnutrition and liver disease. Check that the patient is not getting paracetamol from several products at once.
- **NSAIDs** (ibuprofen, diclofenac, naproxen): relieve pain, fever and inflammation. Side effects: **ulcers and bleeding**, **kidney injury** (especially in the elderly and when dehydrated), worsening heart failure and high blood pressure. Use with caution in older people.
- **Opioids** (morphine, oxycodone, fentanyl): severe pain. Side effects: **respiratory depression**, sedation, nausea and **constipation** (give a preventive laxative). Monitor respiratory rate and consciousness. Antidote: **naloxone**.

## Heart and circulation
- **Beta blockers** (metoprolol): lower heart rate and blood pressure; used for hypertension, angina, heart failure and atrial fibrillation. Check the pulse before giving. May worsen asthma.
- **ACE inhibitors** (enalapril, ramipril) and **angiotensin II receptor blockers** (losartan): lower blood pressure and unload the heart. ACE inhibitors often cause a **dry cough**; both can cause **high potassium** and affect the kidneys.
- **Calcium channel blockers** (amlodipine): lower blood pressure; may cause ankle oedema.
- **Diuretics**: **loop diuretics** (furosemide) for heart failure and oedema – strongly diuretic, cause **low potassium** and risk of dehydration. **Thiazides** for hypertension can cause low sodium.
- **Statins** (simvastatin, atorvastatin): lower cholesterol and prevent heart attack and stroke. Muscle pain may be a side effect.
- **Nitroglycerin**: dilates vessels and quickly relieves angina; may cause headache and a drop in blood pressure.

## Anticoagulants and antiplatelets
- **Antiplatelets** (low-dose aspirin, clopidogrel): prevent arterial clots, for example after a heart attack.
- **Anticoagulants**: **warfarin** (dose guided by **INR**; many food and drug interactions; antidote vitamin K), **DOACs** (apixaban, rivaroxaban, dabigatran – fixed doses without routine INR) and **low-molecular-weight heparin** (dalteparin, enoxaparin) injected subcutaneously. The main side effect for all: **bleeding**. Watch for bruising, blood in urine and stools, and headache after a fall.

## Diabetes
- **Insulin**: rapid-acting with meals and long-acting as basal. The main side effect is **hypoglycaemia**.
- **Metformin**: first choice in type 2 diabetes; can cause stomach upset and must be paused with severe dehydration or reduced kidney function and with X-ray contrast according to local procedures.
- Newer tablets and injections (SGLT2 inhibitors, GLP-1 analogues) also protect the heart and kidneys.

## Stomach and bowel
- **Proton pump inhibitors** (omeprazole, pantoprazole): reduce stomach acid; used for reflux, ulcers and as protection during NSAID use.
- **Laxatives**: lactulose and macrogol (osmotic), sodium picosulfate (stimulant).

## Nervous system and mental health
- **Benzodiazepines** (diazepam, oxazepam): anxiolytic and sedating; cause **dependence**, falls and confusion in older people. Antidote: flumazenil.
- **Antidepressants** (SSRIs such as sertraline and escitalopram): the effect comes after **2–4 weeks**.
- **Antipsychotics**: for psychosis and agitation; can cause movement disorders and weight gain.

## Infections
**Antibiotics** only work against bacteria. In Norway **narrow-spectrum** drugs such as **penicillin V** are often used to limit resistance. Always ask about **allergy** before the first dose.

> For each drug group, know the main effect, the most important side effect and what to observe.`);

DEEP("SFARM", "Legemiddelhåndtering",
`## Regelverket
**Legemiddelhåndteringsforskriften** gjelder for alle virksomheter som yter helsehjelp – sykehus, sykehjem og hjemmetjenester. Den krever at virksomhetsleder har **skriftlige prosedyrer**, at ansvar og oppgaver er tydelig fordelt, og at personellet har **nødvendig kompetanse**. **Legen** har ansvar for å **ordinere** (bestemme legemiddel, dose og administrasjonsmåte). **Sykepleieren** har ansvar for å **istandgjøre, administrere og observere** – og for å si fra hvis en ordinasjon virker feil.

## De «fem riktige» – og litt til
Før hver administrasjon kontrollerer du:
1. **Riktig pasient** – identifiser med navn og fødselsdato, helst med ID-armbånd. Spør pasienten om å si navnet selv.
2. **Riktig legemiddel** – sammenlign navn og styrke på pakningen med ordinasjonen. Vær oppmerksom på **generisk bytte**: samme virkestoff kan ha mange navn.
3. **Riktig dose** – regn ut og kontroller; ved usikkerhet, eller for høyrisikolegemidler, gjør **dobbeltkontroll** med en kollega.
4. **Riktig administrasjonsmåte** – for eksempel peroralt, subkutant, intravenøst.
5. **Riktig tidspunkt** – noen legemidler skal tas fastende, andre med mat.

Mange legger til **riktig dokumentasjon**, **riktig informasjon** til pasienten og **riktig observasjon** av effekt og bivirkninger.

## Istandgjøring og administrasjon
- Bruk ren arbeidsflate og god **håndhygiene**.
- **Ikke knus eller del** depottabletter, enterotabletter eller kapsler uten å sjekke at det er tillatt (Felleskatalogen, «knuseliste» eller farmasøyt).
- Merk sprøyter og infusjoner med **innhold, styrke, tidspunkt og signatur**.
- Bli hos pasienten til legemidlet er tatt; la aldri tabletter bli liggende på nattbordet.
- Ved **svelgeproblemer** kan det finnes andre legemiddelformer.

## Oppbevaring og narkotika
Legemidler skal oppbevares **låst** og etter produsentens krav til temperatur og lys (insulin og mange vaksiner i kjøleskap). **Holdbarheten** forkortes ofte etter åpning – merk med dato. Legemidler i **reseptgruppe A** (narkotika som morfin og oksykodon) og **B** (vanedannende, som benzodiazepiner) har **strengere krav**: egen låst oppbevaring og **forbruksregnskap** der hvert uttak føres med signatur, og beholdningen telles jevnlig. Svinn skal meldes og undersøkes.

## Legemiddelsamstemming og -gjennomgang
**Legemiddelsamstemming** er å lage en **korrekt og fullstendig legemiddelliste** sammen med pasienten, ved hjelp av flere kilder (pasienten, pårørende, fastlege, **Kjernejournal**, e-resept). Feil i legemiddellister ved innleggelse og utskrivning er svært vanlige. **Legemiddelgjennomgang** er en systematisk vurdering av om hvert legemiddel fortsatt er riktig, særlig hos eldre med mange legemidler.

## Avvik
Feil skjer i alle ledd. Ved **legemiddelavvik** – feil dose, feil pasient, glemt dose – skal du straks
1. sikre pasienten: observer, kontakt lege
2. dokumentere i journalen og informere pasienten
3. melde **avvik** i virksomhetens system, slik at årsakene kan finnes og rutinene forbedres

Målet er **læring**, ikke å finne syndebukker. Alvorlige hendelser skal i tillegg varsles videre etter lovens regler.

## Kilder
- **Felleskatalogen**: preparatomtaler, dosering, bivirkninger og blandingsinformasjon.
- **Norsk legemiddelhåndbok**: uavhengige behandlingsråd.
- **RELIS**: gratis legemiddelinformasjon til helsepersonell.
- Sykehusapotekets farmasøyter.

> Fem riktige hver gang. Dobbeltkontroll ved høyrisikolegemidler. Si fra og meld avvik – det er slik systemet blir tryggere.`,
`## The regulations
The **Regulations on Medication Management** apply to all services providing health care – hospitals, nursing homes and home care. They require the head of the service to have **written procedures**, clearly allocated responsibilities and staff with **the necessary competence**. The **doctor** is responsible for **prescribing** (deciding drug, dose and route). The **nurse** is responsible for **preparing, administering and observing** – and for speaking up if a prescription seems wrong.

## The "five rights" – and a few more
Before every administration you check:
1. **Right patient** – identify by name and date of birth, preferably with an ID wristband. Ask the patient to say their name.
2. **Right drug** – compare name and strength on the package with the prescription. Watch out for **generic substitution**: the same substance can have many names.
3. **Right dose** – calculate and check; when in doubt, or for high-risk drugs, do a **double check** with a colleague.
4. **Right route** – for example oral, subcutaneous, intravenous.
5. **Right time** – some drugs must be taken fasting, others with food.

Many add **right documentation**, **right information** to the patient and **right observation** of effect and side effects.

## Preparation and administration
- Use a clean work surface and good **hand hygiene**.
- **Do not crush or split** modified-release or enteric-coated tablets or capsules without checking that it is allowed (product information, a "do not crush" list or a pharmacist).
- Label syringes and infusions with **content, strength, time and signature**.
- Stay with the patient until the drug is taken; never leave tablets on the bedside table.
- If the patient has **swallowing problems**, other formulations may be available.

## Storage and controlled drugs
Medicines must be stored **locked** and according to the manufacturer's requirements for temperature and light (insulin and many vaccines in the fridge). **Shelf life** is often shortened after opening – label with the date. Drugs in **prescription group A** (narcotics such as morphine and oxycodone) and **B** (habit-forming drugs such as benzodiazepines) have **stricter rules**: separate locked storage and a **usage record** in which each withdrawal is signed, with regular stock counts. Losses must be reported and investigated.

## Medication reconciliation and review
**Medication reconciliation** means creating a **correct and complete medication list** together with the patient, using several sources (the patient, relatives, the GP, the **Summary Care Record**, e-prescriptions). Errors in medication lists at admission and discharge are very common. A **medication review** is a systematic assessment of whether each drug is still right, especially in older people taking many drugs.

## Incidents
Errors happen at every step. In a **medication incident** – wrong dose, wrong patient, missed dose – you must at once
1. make the patient safe: observe, contact the doctor
2. document in the record and inform the patient
3. report the **incident** in the service's system, so that causes can be found and routines improved

The aim is **learning**, not finding scapegoats. Serious events must also be notified further according to the law.

## Sources
- **Felleskatalogen**: product information, dosing, side effects and compatibility.
- **The Norwegian Medicines Handbook**: independent treatment advice.
- **RELIS**: free drug information for health professionals.
- The hospital pharmacy's pharmacists.

> Five rights every time. Double-check high-risk drugs. Speak up and report incidents – that is how the system becomes safer.`);

// ================= MIKROBIOLOGI OG SMITTEVERN =================
DEEP("SMIK", "Mikroorganismer",
`## Bakterier
**Bakterier** er encellede organismer uten cellekjerne (**prokaryote**), omtrent 1–5 mikrometer store. De har egen stoffskifte og formerer seg ved **deling** – under gode forhold kan antallet dobles på 20 minutter. De beskrives etter
- **form**: kuler (**kokker**: stafylokokker i klaser, streptokokker i kjeder), staver og spiraler
- **Gram-farging**: **Gram-positive** (tykk cellevegg, farges blå/lilla; for eksempel *Staphylococcus aureus*, streptokokker) og **Gram-negative** (tynn cellevegg med en ytre membran, farges røde; for eksempel *E. coli*, *Klebsiella*, *Pseudomonas*). Inndelingen styrer valget av antibiotika.
- **oksygenbehov**: aerobe, anaerobe eller begge deler
- noen danner **sporer** – svært motstandsdyktige hvileformer som tåler varme, tørke og alkohol. *Clostridioides difficile* er et viktig eksempel i sykehus.

Bakterier lager ofte **toksiner** og kan danne **biofilm** – et slimlag på for eksempel kateter og proteser som beskytter mot antibiotika og immunforsvaret.

## Virus
**Virus** er mye mindre enn bakterier, har ikke eget stoffskifte og kan bare formere seg **inne i levende celler**. De består av arvestoff (DNA eller RNA) i en proteinkappe, noen med en ytre fettkappe. **Antibiotika virker ikke mot virus.** Noen virusinfeksjoner kan behandles med **antivirale** midler (influensa, hiv, hepatitt C, herpes), men mange forebygges best med **vaksiner**. Eksempler: influensa, koronavirus, norovirus (svært smittsom omgangssyke), RS-virus, hepatitt B og C, hiv.

## Sopp og parasitter
- **Sopp**: gjærsopp som *Candida* gir trøske i munnen, underlivsinfeksjoner og – hos svært syke – blodbaneinfeksjoner. Muggsopp kan gi alvorlige infeksjoner hos personer med svekket immunforsvar.
- **Parasitter**: encellede (protozoer, som malaria og *Giardia*), innvollsormer (barnemark) og **ektoparasitter** på huden som **lus** og **skabb**, som smitter ved tett kontakt.
- **Prioner** er feilfoldede proteiner som gir sjeldne, dødelige hjernesykdommer og tåler vanlig sterilisering.

## Normalflora
Vi har flere bakterier i og på kroppen enn vi har egne celler. **Normalfloraen** på hud, i munn, tarm og skjede beskytter oss ved å konkurrere ut sykdomsfremkallende mikrober, trene immunforsvaret og lage vitaminer. Mange infeksjoner skyldes likevel vår **egen flora** som havner på feil sted – tarmbakterier i urinveiene, hudbakterier i et operasjonssår eller i blodet via et venekateter. Bredspektret antibiotika kan forstyrre floraen og gi oppblomstring av *C. difficile* eller *Candida*.

## Fra mikrobe til sykdom
- **Patogenitet**: evnen til å gi sykdom. **Virulens**: hvor alvorlig sykdom den gir.
- **Opportunister** gir sjelden sykdom hos friske, men kan gi alvorlige infeksjoner hos personer med nedsatt immunforsvar, kateter, sår eller etter operasjoner.
- **Inkubasjonstid**: tiden fra smitte til symptomer. Mange er smittsomme allerede før de merker noe.
- **Kolonisering** betyr at mikroben er til stede uten å gi sykdom; **infeksjon** betyr at den formerer seg og gir en reaksjon i kroppen.

## Prøvetaking
Riktige prøver er avgjørende for riktig behandling. Ta **bakteriologiske prøver før antibiotika** gis (for eksempel blodkulturer og urinprøve), bruk riktig utstyr, merk prøven korrekt og send den raskt – eller oppbevar den som laboratoriet anbefaler.

> Bakterier: egne celler, antibiotika virker. Virus: trenger vertscelle, antibiotika virker ikke. Sporer tåler sprit – vask med såpe og vann.`,
`## Bacteria
**Bacteria** are single-celled organisms without a nucleus (**prokaryotes**), about 1–5 micrometres in size. They have their own metabolism and reproduce by **division** – under good conditions their number can double in 20 minutes. They are described by
- **shape**: spheres (**cocci**: staphylococci in clusters, streptococci in chains), rods and spirals
- **Gram staining**: **Gram-positive** (thick cell wall, stains blue/purple; for example *Staphylococcus aureus*, streptococci) and **Gram-negative** (thin wall with an outer membrane, stains red; for example *E. coli*, *Klebsiella*, *Pseudomonas*). This classification guides the choice of antibiotic.
- **oxygen needs**: aerobic, anaerobic or both
- some form **spores** – very resistant dormant forms that survive heat, drying and alcohol. *Clostridioides difficile* is an important example in hospitals.

Bacteria often produce **toxins** and can form **biofilm** – a slimy layer on, for example, catheters and implants that protects them against antibiotics and the immune system.

## Viruses
**Viruses** are much smaller than bacteria, have no metabolism of their own and can only reproduce **inside living cells**. They consist of genetic material (DNA or RNA) in a protein coat, some with an outer lipid envelope. **Antibiotics do not work against viruses.** Some viral infections can be treated with **antivirals** (influenza, HIV, hepatitis C, herpes), but many are best prevented with **vaccines**. Examples: influenza, coronaviruses, norovirus (highly contagious stomach bug), RSV, hepatitis B and C, HIV.

## Fungi and parasites
- **Fungi**: yeasts such as *Candida* cause oral thrush, genital infections and – in very sick patients – bloodstream infections. Moulds can cause serious infections in people with weakened immunity.
- **Parasites**: single-celled (protozoa, such as malaria and *Giardia*), worms (pinworms) and **ectoparasites** on the skin such as **lice** and **scabies**, spread by close contact.
- **Prions** are misfolded proteins that cause rare, fatal brain diseases and survive ordinary sterilisation.

## Normal flora
We carry more bacteria in and on our bodies than we have cells of our own. The **normal flora** of the skin, mouth, gut and vagina protects us by outcompeting harmful microbes, training the immune system and producing vitamins. Many infections are nevertheless caused by our **own flora** ending up in the wrong place – gut bacteria in the urinary tract, skin bacteria in a surgical wound or in the blood via an IV line. Broad-spectrum antibiotics can disturb the flora and allow overgrowth of *C. difficile* or *Candida*.

## From microbe to disease
- **Pathogenicity**: the ability to cause disease. **Virulence**: how severe the disease is.
- **Opportunists** rarely make healthy people ill, but can cause serious infections in people with weak immunity, catheters, wounds or after surgery.
- **Incubation period**: the time from infection to symptoms. Many people are infectious before they notice anything.
- **Colonisation** means the microbe is present without causing disease; **infection** means it multiplies and triggers a response in the body.

## Sampling
Correct samples are vital for correct treatment. Take **microbiological samples before antibiotics** are given (for example blood cultures and a urine sample), use the right equipment, label the sample correctly and send it promptly – or store it as the laboratory advises.

> Bacteria: own cells, antibiotics work. Viruses: need a host cell, antibiotics do not work. Spores survive alcohol – wash with soap and water.`);

DEEP("SMIK", "Smittekjeden og basale smittevernrutiner",
`## Smittekjeden
En infeksjon oppstår bare når alle leddene i **smittekjeden** er på plass. Smittevern handler om å **bryte minst ett ledd**:
1. **Smittestoff** – bakterier, virus, sopp eller parasitter.
2. **Smittekilde/reservoar** – mennesker (syke eller friske bærere), dyr, mat, vann, utstyr og overflater.
3. **Utgangsport** – luftveier, tarm, urin, blod, sår og hud.
4. **Smittemåte**:
   - **Kontaktsmitte**, den vanligste i helsetjenesten: **direkte** (hender, hud mot hud) eller **indirekte** via gjenstander, utstyr og overflater. Eksempler: MRSA, norovirus, *C. difficile*.
   - **Dråpesmitte**: store dråper fra hoste og nys som faller ned innen 1–2 meter. Eksempler: influensa, RS-virus, covid-19.
   - **Luftsmitte**: små partikler som holder seg svevende og kan spre seg over lengre avstander. Eksempler: tuberkulose, meslinger, vannkopper.
   - **Blodsmitte**: via stikkskader og blodsøl. Eksempler: hepatitt B og C, hiv.
   - **Fekal-oral smitte**: via mat, vann og hender.
5. **Inngangsport** – slimhinner, sår, kateter, venekanyler, operasjonssår og luftveier.
6. **Mottakelig vert** – særlig eldre, nyfødte, personer med kroniske sykdommer, svekket immunforsvar eller innlagt utstyr.

## Helsetjenesteassosierte infeksjoner
Infeksjoner som oppstår som følge av opphold i helseinstitusjon, er blant de vanligste komplikasjonene i helsetjenesten. De hyppigste er **urinveisinfeksjoner** (ofte kateterrelatert), **lungebetennelse**, **postoperative sårinfeksjoner** og **blodbaneinfeksjoner** (ofte fra venekateter). Mange av dem kan forebygges.

## Basale smittevernrutiner
Basale smittevernrutiner gjelder **alle pasienter, hele tiden** – uansett om man vet om smitte eller ikke:
- **Håndhygiene** er det viktigste enkelttiltaket. Bruk **hånddesinfeksjon** som førstevalg; gni i 20–30 sekunder til hendene er tørre. **Vask med såpe og vann** når hendene er synlig skitne, og ved **sporedannende bakterier** (*C. difficile*) og **norovirus**, som sprit ikke dreper godt nok. Ingen ringer, armbåndsur, lange negler eller neglelakk.
- **WHOs fem indikasjoner** for håndhygiene: **før** pasientkontakt, **før** rene/aseptiske prosedyrer, **etter** eksponering for kroppsvæsker, **etter** pasientkontakt og **etter** kontakt med pasientens omgivelser.
- **Hansker** ved kontakt med blod, kroppsvæsker, slimhinner og skadet hud. Skift mellom pasienter og mellom urene og rene oppgaver, og desinfiser hendene etterpå – hansker er ikke en erstatning for håndhygiene.
- **Beskyttelsesfrakk/forkle** ved risiko for søl og nær kontakt; **munnbind og øyebeskyttelse** ved risiko for sprut.
- **Hostehygiene**: host i albuen eller i et papirlommetørkle.
- **Renhold og desinfeksjon** av utstyr og flater, riktig håndtering av **tøy og avfall**.
- **Forebygging av stikkskader**: aldri sett hette tilbake på brukte kanyler; kast dem straks i kanylebøtte.
- **Riktig pasientplassering**: pasienter med mistenkt smitte skal plasseres på enerom.

## Isolering
Ved kjent eller mistenkt smitte kommer **smittemåtebaserte tiltak** i tillegg:
- **Kontaktsmitteisolering**: enerom, frakk og hansker ved all kontakt, eget utstyr.
- **Dråpesmitteisolering**: enerom og munnbind (samt øyebeskyttelse ved behov) innen 1–2 meter.
- **Luftsmitteisolering**: isolat med **sluse og undertrykk**, og åndedrettsvern (FFP2/FFP3).

Riktig **påkledning og avkledning** er viktig: avkledningen er det mest kritiske, fordi det er da hendene lettest forurenses.

## Sykepleierens ansvar
Følg prosedyrene konsekvent, informer pasienter og besøkende, og observer tegn til infeksjon. Smittevern er **pasientsikkerhet** – det beskytter både pasientene, kollegaene og deg selv. Ansatte med smittsom sykdom, for eksempel omgangssyke, bør holde seg hjemme etter lokale retningslinjer.

> Bryt kjeden. Håndhygiene før og etter. Sprit som hovedregel – såpe og vann ved sporer og norovirus.`,
`## The chain of infection
An infection occurs only when every link in the **chain of infection** is in place. Infection control is about **breaking at least one link**:
1. **Infectious agent** – bacteria, viruses, fungi or parasites.
2. **Source/reservoir** – people (ill or healthy carriers), animals, food, water, equipment and surfaces.
3. **Portal of exit** – airways, gut, urine, blood, wounds and skin.
4. **Mode of transmission**:
   - **Contact transmission**, the most common in health care: **direct** (hands, skin to skin) or **indirect** via objects, equipment and surfaces. Examples: MRSA, norovirus, *C. difficile*.
   - **Droplet transmission**: large droplets from coughs and sneezes that fall within 1–2 metres. Examples: influenza, RSV, COVID-19.
   - **Airborne transmission**: small particles that stay suspended and can spread over longer distances. Examples: tuberculosis, measles, chickenpox.
   - **Bloodborne transmission**: via needlestick injuries and blood spills. Examples: hepatitis B and C, HIV.
   - **Faecal–oral transmission**: via food, water and hands.
5. **Portal of entry** – mucous membranes, wounds, catheters, cannulas, surgical wounds and airways.
6. **Susceptible host** – especially older people, newborns, people with chronic disease, weakened immunity or indwelling devices.

## Healthcare-associated infections
Infections acquired as a result of a stay in a health institution are among the most common complications in health care. The most frequent are **urinary tract infections** (often catheter-related), **pneumonia**, **surgical site infections** and **bloodstream infections** (often from IV lines). Many of them can be prevented.

## Standard precautions
Standard precautions apply to **all patients, all the time** – whether or not infection is known:
- **Hand hygiene** is the single most important measure. Use **alcohol hand rub** as first choice; rub for 20–30 seconds until hands are dry. **Wash with soap and water** when hands are visibly dirty, and for **spore-forming bacteria** (*C. difficile*) and **norovirus**, which alcohol does not kill well enough. No rings, wristwatches, long nails or nail polish.
- **WHO's five moments** for hand hygiene: **before** touching a patient, **before** clean/aseptic procedures, **after** body fluid exposure, **after** touching a patient and **after** touching the patient's surroundings.
- **Gloves** for contact with blood, body fluids, mucous membranes and broken skin. Change between patients and between dirty and clean tasks, and disinfect hands afterwards – gloves do not replace hand hygiene.
- **Gown/apron** when there is a risk of spills and close contact; **mask and eye protection** when there is a risk of splashes.
- **Respiratory hygiene**: cough into your elbow or a tissue.
- **Cleaning and disinfection** of equipment and surfaces, correct handling of **linen and waste**.
- **Preventing needlestick injuries**: never recap used needles; discard them at once in a sharps container.
- **Correct patient placement**: patients with suspected infection should have a single room.

## Isolation
For known or suspected infection, **transmission-based precautions** are added:
- **Contact isolation**: single room, gown and gloves for all contact, dedicated equipment.
- **Droplet isolation**: single room and a mask (plus eye protection when needed) within 1–2 metres.
- **Airborne isolation**: an isolation room with an **anteroom and negative pressure**, and a respirator (FFP2/FFP3).

Correct **donning and doffing** matters: taking equipment off is the most critical step, because that is when hands are most easily contaminated.

## The nurse's responsibility
Follow procedures consistently, inform patients and visitors, and watch for signs of infection. Infection control is **patient safety** – it protects patients, colleagues and yourself. Staff with infectious illness, such as gastroenteritis, should stay home according to local guidelines.

> Break the chain. Hand hygiene before and after. Alcohol as a rule – soap and water for spores and norovirus.`);

DEEP("SMIK", "Antibiotika og resistens",
`## Hvordan antibiotika virker
Antibiotika angriper strukturer som bakterier har, men menneskeceller mangler:
- **Celleveggen**: **penicilliner** (penicillin V, amoksicillin, kloksacillin), **cefalosporiner** og **karbapenemer** (beta-laktamer), og vankomycin.
- **Proteinsyntesen** (bakteriens ribosomer): aminoglykosider (gentamicin), makrolider (erytromycin), tetrasykliner.
- **Arvestoffet (DNA)**: kinoloner (ciprofloksacin).
- **Stoffskiftet**: trimetoprim og sulfonamider (ofte brukt mot urinveisinfeksjon).

Noen er **baktericide** (dreper bakteriene), andre **bakteriostatiske** (hemmer veksten, slik at immunforsvaret kan gjøre resten).

## Smalspektret og bredspektret
- **Smalspektrede** antibiotika virker mot få bakterietyper. Penicillin V mot streptokokker er det klassiske eksempelet.
- **Bredspektrede** antibiotika virker mot mange, inkludert deler av **normalfloraen**. De øker risikoen for **resistens**, **diaré** og ***C. difficile*-infeksjon**.

Norge har tradisjonelt brukt mye smalspektret og lite bredspektret antibiotika, og har derfor **lav forekomst av resistens** sammenlignet med de fleste land. Nasjonale **retningslinjer** for antibiotikabruk i primærhelsetjenesten og sykehus skal hjelpe forskriverne å velge riktig.

## Hvordan resistens oppstår
**Antibiotikaresistens** betyr at bakteriene overlever behandling som tidligere virket. Det skjer ved
- **mutasjoner** i bakterienes arvestoff
- **horisontal genoverføring**: bakterier kan dele resistensgener med hverandre via **plasmider** – også mellom ulike arter
- **seleksjon**: hver gang antibiotika brukes, dør de følsomme bakteriene, mens de resistente overlever og formerer seg. Jo mer antibiotika som brukes, jo større **seleksjonspress**.

Resistensmekanismene er blant annet **enzymer** som bryter ned antibiotika (beta-laktamaser), endrede **målproteiner**, pumper som skyller antibiotika ut, og tettere cellevegg.

## Viktige resistente bakterier
- **MRSA** – meticillinresistente *Staphylococcus aureus*: resistente mot alle vanlige penicilliner og cefalosporiner.
- **ESBL** – Gram-negative bakterier (ofte *E. coli* og *Klebsiella*) med enzymer som bryter ned de fleste beta-laktamer. Karbapenemresistente varianter (**CPE**) er svært alvorlige, fordi få behandlingsalternativer gjenstår.
- **VRE** – vankomycinresistente enterokokker.

Flere av disse er **meldepliktige** til **MSIS** (Meldingssystem for smittsomme sykdommer) ved Folkehelseinstituttet. Pasienter som nylig har vært innlagt eller behandlet i helsetjenesten **i utlandet**, eller har jobbet der, **screenes** ofte for resistente bakterier ved innleggelse og kan bli isolert til svaret foreligger.

## Hva sykepleieren kan gjøre
- Ta **prøver før første dose**, slik at bakterien kan identifiseres og resistensbestemmes.
- Gi antibiotika til **riktig tid** og med jevne mellomrom, slik at konsentrasjonen holdes oppe.
- Spør om **penicillinallergi** – og hva reaksjonen var. Mange som oppgir allergi, er egentlig ikke allergiske, og en unødvendig allergimerking fører ofte til bredere og dårligere antibiotika.
- Bidra til **revurdering** etter 48–72 timer: kan behandlingen smalnes inn, gis peroralt eller avsluttes?
- Forklar pasienten hvorfor antibiotika ikke hjelper mot **forkjølelse og andre virusinfeksjoner**, og hvorfor kuren skal følges slik legen har bestemt.
- Følg **smittevernrutinene** – de hindrer at resistente bakterier spres videre.

## Én helse
Resistens er et globalt problem som knytter sammen helse hos **mennesker, dyr og miljø**. Antibiotikabruk i husdyrhold, utslipp fra produksjon og reiser spre resistens over landegrenser. WHO regner antimikrobiell resistens som en av de største truslene mot global helse.

> Smalt spekter når det er mulig. Prøver før første dose. Riktig bruk + godt smittevern = mindre resistens.`,
`## How antibiotics work
Antibiotics attack structures that bacteria have but human cells lack:
- **The cell wall**: **penicillins** (penicillin V, amoxicillin, cloxacillin), **cephalosporins** and **carbapenems** (beta-lactams), and vancomycin.
- **Protein synthesis** (the bacterial ribosomes): aminoglycosides (gentamicin), macrolides (erythromycin), tetracyclines.
- **The genetic material (DNA)**: quinolones (ciprofloxacin).
- **Metabolism**: trimethoprim and sulphonamides (often used for urinary tract infections).

Some are **bactericidal** (kill the bacteria), others **bacteriostatic** (stop growth so the immune system can do the rest).

## Narrow and broad spectrum
- **Narrow-spectrum** antibiotics work against few types of bacteria. Penicillin V against streptococci is the classic example.
- **Broad-spectrum** antibiotics work against many, including parts of the **normal flora**. They increase the risk of **resistance**, **diarrhoea** and ***C. difficile* infection**.

Norway has traditionally used a lot of narrow-spectrum and few broad-spectrum antibiotics, and therefore has a **low level of resistance** compared with most countries. National **guidelines** for antibiotic use in primary care and hospitals help prescribers choose correctly.

## How resistance develops
**Antibiotic resistance** means bacteria survive treatment that used to work. It happens through
- **mutations** in the bacterial genome
- **horizontal gene transfer**: bacteria can share resistance genes via **plasmids** – even between different species
- **selection**: every time antibiotics are used, susceptible bacteria die while resistant ones survive and multiply. The more antibiotics are used, the greater the **selection pressure**.

Resistance mechanisms include **enzymes** that break down antibiotics (beta-lactamases), altered **target proteins**, pumps that flush antibiotics out, and a less permeable cell wall.

## Important resistant bacteria
- **MRSA** – methicillin-resistant *Staphylococcus aureus*: resistant to all common penicillins and cephalosporins.
- **ESBL** – Gram-negative bacteria (often *E. coli* and *Klebsiella*) with enzymes that break down most beta-lactams. Carbapenem-resistant variants (**CPE**) are very serious, because few treatment options remain.
- **VRE** – vancomycin-resistant enterococci.

Several of these are **notifiable** to **MSIS** (the Norwegian Surveillance System for Communicable Diseases) at the Norwegian Institute of Public Health. Patients recently admitted or treated in health care **abroad**, or who have worked there, are often **screened** for resistant bacteria on admission and may be isolated until results are available.

## What the nurse can do
- Take **samples before the first dose**, so the bacterium can be identified and tested for resistance.
- Give antibiotics at **the right time** and at regular intervals, so the concentration stays up.
- Ask about **penicillin allergy** – and what the reaction was. Many who report an allergy are not actually allergic, and an unnecessary allergy label often leads to broader, poorer antibiotics.
- Help **review** treatment after 48–72 hours: can it be narrowed, switched to oral or stopped?
- Explain why antibiotics do not help against **colds and other viral infections**, and why the course should be followed as the doctor decided.
- Follow **infection control routines** – they stop resistant bacteria from spreading.

## One Health
Resistance is a global problem linking the health of **humans, animals and the environment**. Antibiotic use in livestock, emissions from production and travel spread resistance across borders. WHO considers antimicrobial resistance one of the greatest threats to global health.

> Narrow spectrum when possible. Samples before the first dose. Correct use + good infection control = less resistance.`);
})();
