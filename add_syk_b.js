// ============================================================
//  add_syk_b.js – SYKEPLEIE: Anatomi og fysiologi (SANA)
// ============================================================
(() => {
// ================= SANA 0: Celler, vev og homeostase =================
THEORY("SANA", 0, {
nb: `## Hva handler det om?
Kroppen er bygd av celler som samarbeider i vev og organer. For at cellene skal fungere, må forholdene rundt dem holdes stabile: temperatur, pH, blodsukker og væske. Dette kalles homeostase, og mye av sykepleien handler om å oppdage når homeostasen svikter.

## Begreper
- Cellekjernen inneholder DNA og styrer cellen.
- Mitokondriene lager energi (ATP) ved cellulær respirasjon.
- Ribosomene lager proteiner.
- Cellemembranen slipper noen stoffer inn og ut (selektivt permeabel).
- De fire vevstypene: epitelvev (dekker og kler flater), bindevev (støtter og binder, f.eks. bein, brusk og blod), muskelvev og nervevev.
- Homeostase styres oftest av negativ tilbakekobling: et avvik gir en respons som motvirker avviket. Eksempel: høy temperatur gir svetting og utvidede blodårer i huden.
- Positiv tilbakekobling forsterker en prosess, for eksempel rier under fødsel.

## Vanlige feil
- Å tro at blod ikke er vev. Blod regnes som bindevev.
- Å blande negativ og positiv tilbakekobling.

> Homeostase = stabilt indre miljø. Negativ tilbakekobling motvirker avvik.`,
en: `## What is it about?
The body is built from cells that work together in tissues and organs. For the cells to function, the conditions around them must be kept stable: temperature, pH, blood glucose and fluid. This is called homeostasis, and much of nursing is about noticing when homeostasis fails.

## Concepts
- The nucleus contains DNA and controls the cell.
- The mitochondria produce energy (ATP) through cellular respiration.
- The ribosomes make proteins.
- The cell membrane lets some substances in and out (selectively permeable).
- The four tissue types: epithelial tissue (covers and lines surfaces), connective tissue (supports and binds, e.g. bone, cartilage and blood), muscle tissue and nervous tissue.
- Homeostasis is usually controlled by negative feedback: a deviation triggers a response that counteracts it. Example: a high temperature causes sweating and dilated blood vessels in the skin.
- Positive feedback amplifies a process, for example contractions during childbirth.

## Common mistakes
- Thinking blood is not a tissue. Blood counts as connective tissue.
- Mixing up negative and positive feedback.

> Homeostasis = a stable internal environment. Negative feedback counteracts deviations.`
});
BIQ("SANA", 0, [
 ["Hvilken del av cellen lager mesteparten av energien (ATP)?", ["Mitokondriene", "Ribosomene", "Cellekjernen", "Golgiapparatet"], "Mitokondriene er cellens «kraftverk» og lager ATP ved cellulær respirasjon.",
  "Which part of the cell produces most of the energy (ATP)?", ["The mitochondria", "The ribosomes", "The nucleus", "The Golgi apparatus"], "The mitochondria are the cell's \"power plants\" and produce ATP through cellular respiration."],
 ["Hvilken vevstype er blod?", ["Bindevev", "Epitelvev", "Muskelvev", "Nervevev"], "Blod regnes som et flytende bindevev.",
  "Which tissue type is blood?", ["Connective tissue", "Epithelial tissue", "Muscle tissue", "Nervous tissue"], "Blood is regarded as a fluid connective tissue."],
 ["Hva er homeostase?", ["At kroppen holder det indre miljøet stabilt", "At cellene deler seg", "At blodet koagulerer", "At kroppen lagrer fett"], "Homeostase er evnen til å holde temperatur, pH, væske og blodsukker innenfor normalområdet.",
  "What is homeostasis?", ["The body keeping its internal environment stable", "Cells dividing", "Blood clotting", "The body storing fat"], "Homeostasis is the ability to keep temperature, pH, fluid and blood glucose within the normal range."],
 ["Kroppstemperaturen stiger, og du begynner å svette. Hva er dette et eksempel på?", ["Negativ tilbakekobling", "Positiv tilbakekobling", "Mitose", "Diffusjon"], "Svetten kjøler kroppen og motvirker temperaturstigningen: negativ tilbakekobling.",
  "Your body temperature rises and you start to sweat. What is this an example of?", ["Negative feedback", "Positive feedback", "Mitosis", "Diffusion"], "The sweat cools the body and counteracts the temperature rise: negative feedback."],
 ["Hvor lages proteiner i cellen?", ["Ribosomene", "Mitokondriene", "Lysosomene", "Cellemembranen"], "Ribosomene leser mRNA og setter sammen aminosyrer til proteiner.",
  "Where are proteins made in the cell?", ["The ribosomes", "The mitochondria", "The lysosomes", "The cell membrane"], "The ribosomes read mRNA and join amino acids into proteins."]
]);

// ================= SANA 1: Hjerte og sirkulasjon =================
THEORY("SANA", 1, {
nb: `## Hva handler det om?
Hjertet er to pumper i én. Høyre side pumper oksygenfattig blod til lungene (lille kretsløp). Venstre side pumper oksygenrikt blod ut i kroppen (store kretsløp). Venstre ventrikkel har den tykkeste veggen fordi den må pumpe mot høyest trykk.

## Blodets vei
Hulvenene → høyre forkammer → trikuspidalklaffen → høyre ventrikkel → pulmonalklaffen → lungearterien → lungene → lungevenene → venstre forkammer → mitralklaffen → venstre ventrikkel → aortaklaffen → aorta → kroppen.

## Begreper og formler
- Sinusknuten i høyre forkammer er hjertets naturlige pacemaker.
- Arterier fører blod fra hjertet, vener fører blod til hjertet. (Lungearterien har oksygenfattig blod.)
- Hjertets minuttvolum: $CO = SV \\cdot HR$, slagvolum ganger puls. Normalt omtrent 5 l/min i hvile.
- Middelarterietrykk: $MAP \\approx DBP + (SBP - DBP)/3$. Et MAP over omtrent 65 mmHg trengs for å gi organene nok blod.
- Kransarteriene forsyner selve hjertemuskelen med blod.

## Vanlige feil
- Å tro at alle arterier har oksygenrikt blod.
- Å bytte om mitral- og trikuspidalklaffen: tri(kuspidal) er til høyre, mitral til venstre.

> Høyre side → lungene. Venstre side → kroppen. $CO = SV \\cdot HR$.`,
en: `## What is it about?
The heart is two pumps in one. The right side pumps oxygen-poor blood to the lungs (pulmonary circulation). The left side pumps oxygen-rich blood out to the body (systemic circulation). The left ventricle has the thickest wall because it must pump against the highest pressure.

## The path of the blood
Venae cavae → right atrium → tricuspid valve → right ventricle → pulmonary valve → pulmonary artery → lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → the body.

## Concepts and formulas
- The sinus node in the right atrium is the heart's natural pacemaker.
- Arteries carry blood away from the heart, veins carry blood towards it. (The pulmonary artery carries oxygen-poor blood.)
- Cardiac output: $CO = SV \\cdot HR$, stroke volume times heart rate. Normally about 5 L/min at rest.
- Mean arterial pressure: $MAP \\approx DBP + (SBP - DBP)/3$. A MAP above about 65 mmHg is needed to perfuse the organs.
- The coronary arteries supply the heart muscle itself with blood.

## Common mistakes
- Thinking all arteries carry oxygen-rich blood.
- Swapping the mitral and tricuspid valves: tri(cuspid) is on the right, mitral on the left.

> Right side → lungs. Left side → body. $CO = SV \\cdot HR$.`
});
BIQ("SANA", 1, [
 ["Hvilket hjertekammer har den tykkeste muskelveggen?", ["Venstre ventrikkel", "Høyre ventrikkel", "Venstre forkammer", "Høyre forkammer"], "Venstre ventrikkel pumper blodet ut i hele kroppen mot høyt trykk.",
  "Which heart chamber has the thickest muscle wall?", ["The left ventricle", "The right ventricle", "The left atrium", "The right atrium"], "The left ventricle pumps blood out to the whole body against high pressure."],
 ["Hvor ligger hjertets naturlige pacemaker?", ["Sinusknuten i høyre forkammer", "AV-knuten i venstre ventrikkel", "I aorta", "I septum mellom ventriklene"], "Sinusknuten sender impulsene som setter i gang hvert hjerteslag.",
  "Where is the heart's natural pacemaker?", ["The sinus node in the right atrium", "The AV node in the left ventricle", "In the aorta", "In the septum between the ventricles"], "The sinus node sends the impulses that start every heartbeat."],
 ["Hvilken blodåre fører oksygenfattig blod, selv om den er en arterie?", ["Lungearterien", "Aorta", "Kransarterien", "Halspulsåren"], "Lungearterien fører blod fra høyre ventrikkel til lungene, altså oksygenfattig blod.",
  "Which blood vessel carries oxygen-poor blood even though it is an artery?", ["The pulmonary artery", "The aorta", "The coronary artery", "The carotid artery"], "The pulmonary artery carries blood from the right ventricle to the lungs, i.e. oxygen-poor blood."],
 ["Hvilken klaff ligger mellom venstre forkammer og venstre ventrikkel?", ["Mitralklaffen", "Trikuspidalklaffen", "Aortaklaffen", "Pulmonalklaffen"], "Mitral til venstre, trikuspidal til høyre.",
  "Which valve lies between the left atrium and the left ventricle?", ["The mitral valve", "The tricuspid valve", "The aortic valve", "The pulmonary valve"], "Mitral on the left, tricuspid on the right."],
 ["Slagvolumet er 70 ml og pulsen 72 slag/min. Hva er hjertets minuttvolum i liter per minutt?", { n: 5.04, tol: 0.02, u: "l/min" }, "$CO = SV \\cdot HR = 0{,}070 \\cdot 72 = 5{,}04$ l/min.",
  "The stroke volume is 70 mL and the heart rate 72 beats/min. What is the cardiac output in litres per minute?", null, "$CO = SV \\cdot HR = 0.070 \\cdot 72 = 5.04$ L/min."]
]);
GEN("SANA", 1,
 () => { const sv = R.i(50, 100), hr = R.i(55, 120); const co = sv * hr / 1000;
   return [T(`Slagvolumet er ${sv} ml og pulsen er ${hr} slag/min. Hva er hjertets minuttvolum (l/min)?`, `The stroke volume is ${sv} mL and the heart rate is ${hr} beats/min. What is the cardiac output (L/min)?`),
     { n: co, tol: 0.02, u: T("l/min", "L/min") }, T(`$CO = SV \\cdot HR = ${mf(sv / 1000, 3)} \\cdot ${hr} = ${mf(co, 2)}$ l/min.`, `$CO = SV \\cdot HR = ${mf(sv / 1000, 3)} \\cdot ${hr} = ${mf(co, 2)}$ L/min.`)]; },
 () => { const sbp = R.i(85, 170), dbp = R.i(45, Math.min(100, sbp - 25)); const map = dbp + (sbp - dbp) / 3;
   return [T(`Blodtrykket er ${sbp}/${dbp} mmHg. Hva er omtrentlig middelarterietrykk (MAP)?`, `The blood pressure is ${sbp}/${dbp} mmHg. What is the approximate mean arterial pressure (MAP)?`),
     { n: map, tol: 1, u: "mmHg" }, T(`$MAP \\approx ${dbp} + (${sbp} - ${dbp})/3 = ${mf(map, 1)}$ mmHg.`, `$MAP \\approx ${dbp} + (${sbp} - ${dbp})/3 = ${mf(map, 1)}$ mmHg.`)]; }
);

// ================= SANA 2: Respirasjon =================
THEORY("SANA", 2, {
nb: `## Hva handler det om?
Respirasjonen skal få oksygen inn i blodet og karbondioksid ut. Luften går gjennom nese, svelg, strupe, luftrør og bronkier til alveolene (lungeblærene), der gassutvekslingen skjer ved diffusjon gjennom en svært tynn vegg.

## Begreper og formler
- Diafragma (mellomgulvet) er den viktigste inspirasjonsmuskelen. Når den trekker seg sammen, øker brystkassens volum og luft strømmer inn.
- Ekspirasjon i hvile er passiv.
- Surfaktant senker overflatespenningen i alveolene så de ikke klapper sammen.
- Den viktigste pustestimulusen hos friske er CO₂-nivået i blodet (via pH), registrert i hjernestammen.
- Tidalvolum: luft per vanlig åndedrag, omtrent 500 ml hos voksne.
- Minuttventilasjon: $V_E = V_T \\cdot RF$ (tidalvolum ganger respirasjonsfrekvens).
- Normal respirasjonsfrekvens hos voksne i hvile: 12–20 per minutt.
- Oksygenmetning (SpO₂) er normalt 96–100 % hos lungefriske.

## Vanlige feil
- Å tro at utpusten i hvile krever muskelarbeid.
- Å tro at lavt oksygen er den viktigste pustestimulusen hos friske. Det er CO₂.

> Diafragma drar luft inn. CO₂ styrer pusten. $V_E = V_T \\cdot RF$.`,
en: `## What is it about?
Respiration brings oxygen into the blood and carbon dioxide out. The air passes through the nose, pharynx, larynx, trachea and bronchi to the alveoli, where gas exchange happens by diffusion through a very thin wall.

## Concepts and formulas
- The diaphragm is the most important muscle of inspiration. When it contracts, the volume of the chest increases and air flows in.
- Expiration at rest is passive.
- Surfactant lowers the surface tension in the alveoli so that they do not collapse.
- In healthy people the main stimulus to breathe is the CO₂ level in the blood (via pH), detected in the brainstem.
- Tidal volume: air per normal breath, about 500 mL in adults.
- Minute ventilation: $V_E = V_T \\cdot RR$ (tidal volume times respiratory rate).
- Normal respiratory rate in adults at rest: 12–20 per minute.
- Oxygen saturation (SpO₂) is normally 96–100% in people with healthy lungs.

## Common mistakes
- Thinking that breathing out at rest requires muscle work.
- Thinking low oxygen is the main breathing stimulus in healthy people. It is CO₂.

> The diaphragm pulls air in. CO₂ controls breathing. $V_E = V_T \\cdot RR$.`
});
BIQ("SANA", 2, [
 ["Hvor skjer gassutvekslingen i lungene?", ["I alveolene", "I luftrøret", "I bronkiene", "I strupen"], "Alveolene har tynne vegger og stor overflate med kapillærer rundt, perfekt for diffusjon.",
  "Where does gas exchange take place in the lungs?", ["In the alveoli", "In the trachea", "In the bronchi", "In the larynx"], "The alveoli have thin walls and a large surface surrounded by capillaries, perfect for diffusion."],
 ["Hva er den viktigste inspirasjonsmuskelen?", ["Diafragma", "Magemusklene", "Brystmuskelen", "Nakkemusklene"], "Diafragma står for det meste av innpusten i hvile.",
  "What is the most important muscle of inspiration?", ["The diaphragm", "The abdominal muscles", "The pectoral muscle", "The neck muscles"], "The diaphragm accounts for most of inspiration at rest."],
 ["Hva gjør surfaktant?", ["Senker overflatespenningen så alveolene ikke klapper sammen", "Frakter oksygen i blodet", "Dreper bakterier i luftveiene", "Utvider bronkiene"], "Uten surfaktant ville alveolene falle sammen ved utpust. For tidlig fødte barn kan mangle surfaktant.",
  "What does surfactant do?", ["Lowers surface tension so the alveoli do not collapse", "Carries oxygen in the blood", "Kills bacteria in the airways", "Dilates the bronchi"], "Without surfactant the alveoli would collapse on expiration. Premature babies may lack surfactant."],
 ["Hva er normal respirasjonsfrekvens hos en voksen i hvile?", ["12–20 per minutt", "4–8 per minutt", "25–35 per minutt", "40–60 per minutt"], "12–20 er normalt. Høy respirasjonsfrekvens er et av de tidligste tegnene på at en pasient blir dårligere.",
  "What is a normal respiratory rate for an adult at rest?", ["12–20 per minute", "4–8 per minute", "25–35 per minute", "40–60 per minute"], "12–20 is normal. A high respiratory rate is one of the earliest signs that a patient is deteriorating."],
 ["Hva er den viktigste pustestimulusen hos en frisk person?", ["Økt CO₂ i blodet", "Lavt oksygen i blodet", "Lav temperatur", "Høyt blodsukker"], "Hjernestammen reagerer på CO₂ (via pH). Hos noen med kronisk lungesykdom kan dette være endret.",
  "What is the main breathing stimulus in a healthy person?", ["Increased CO₂ in the blood", "Low oxygen in the blood", "Low temperature", "High blood glucose"], "The brainstem responds to CO₂ (via pH). In some people with chronic lung disease this may be altered."]
]);
GEN("SANA", 2,
 () => { const vt = R.p([350, 400, 450, 500, 550, 600]), rf = R.i(10, 30); const ve = vt * rf / 1000;
   return [T(`Tidalvolumet er ${vt} ml og respirasjonsfrekvensen ${rf}/min. Hva er minuttventilasjonen (l/min)?`, `The tidal volume is ${vt} mL and the respiratory rate ${rf}/min. What is the minute ventilation (L/min)?`),
     { n: ve, tol: 0.02, u: T("l/min", "L/min") }, T(`$V_E = ${mf(vt / 1000, 3)} \\cdot ${rf} = ${mf(ve, 2)}$ l/min.`, `$V_E = ${mf(vt / 1000, 3)} \\cdot ${rf} = ${mf(ve, 2)}$ L/min.`)]; }
);

// ================= SANA 3: Nervesystemet =================
THEORY("SANA", 3, {
nb: `## Hva handler det om?
Nervesystemet tar imot signaler, bearbeider dem og styrer muskler og kjertler. Det deles i sentralnervesystemet (hjernen og ryggmargen) og det perifere nervesystemet (nervene ut i kroppen).

## Begreper
- Nevronet (nervecellen) har dendritter som tar imot signaler, en cellekropp og et akson som sender signalet videre.
- Myelin rundt aksonet gjør at signalet går mye raskere.
- I synapsen overføres signalet kjemisk med nevrotransmittere, for eksempel acetylkolin og noradrenalin.
- Det autonome nervesystemet styrer det vi ikke styrer med viljen:
  - Sympatikus («kamp eller flukt»): høyere puls og blodtrykk, utvidede pupiller, utvidede bronkier, mindre tarmaktivitet.
  - Parasympatikus («hvile og fordøye»): lavere puls, mer tarmaktivitet og spyttproduksjon.
- Lillehjernen styrer balanse og koordinasjon. Hjernestammen styrer pust, sirkulasjon og bevissthet. Storhjernen står for tanker, språk og viljestyrte bevegelser.

## Vanlige feil
- Å tro at sympatikus alltid «øker» alt. Den hemmer for eksempel fordøyelsen.

> Sympatikus = kamp eller flukt. Parasympatikus = hvile og fordøye.`,
en: `## What is it about?
The nervous system receives signals, processes them and controls muscles and glands. It is divided into the central nervous system (the brain and spinal cord) and the peripheral nervous system (the nerves out in the body).

## Concepts
- The neuron (nerve cell) has dendrites that receive signals, a cell body and an axon that passes the signal on.
- Myelin around the axon makes the signal travel much faster.
- In the synapse the signal is transferred chemically by neurotransmitters, for example acetylcholine and noradrenaline.
- The autonomic nervous system controls what we do not control voluntarily:
  - Sympathetic ("fight or flight"): higher heart rate and blood pressure, dilated pupils, dilated bronchi, less gut activity.
  - Parasympathetic ("rest and digest"): lower heart rate, more gut activity and saliva production.
- The cerebellum controls balance and coordination. The brainstem controls breathing, circulation and consciousness. The cerebrum handles thinking, language and voluntary movement.

## Common mistakes
- Thinking the sympathetic system always "increases" everything. It inhibits digestion, for example.

> Sympathetic = fight or flight. Parasympathetic = rest and digest.`
});
BIQ("SANA", 3, [
 ["Hva består sentralnervesystemet av?", ["Hjernen og ryggmargen", "Hjernen og hjernenervene", "Ryggmargen og spinalnervene", "Alle nervene i kroppen"], "Resten (nerver ut til kroppen) er det perifere nervesystemet.",
  "What does the central nervous system consist of?", ["The brain and the spinal cord", "The brain and the cranial nerves", "The spinal cord and the spinal nerves", "All the nerves in the body"], "The rest (nerves out to the body) is the peripheral nervous system."],
 ["Hvilken effekt har sympatikus?", ["Økt puls og utvidede pupiller", "Lavere puls og mer tarmaktivitet", "Mer spytt", "Sammentrukne bronkier"], "Kamp eller flukt: hjertet slår raskere, pupillene utvides og bronkiene åpnes.",
  "What effect does the sympathetic system have?", ["Increased heart rate and dilated pupils", "Lower heart rate and more gut activity", "More saliva", "Constricted bronchi"], "Fight or flight: the heart beats faster, the pupils dilate and the bronchi open."],
 ["Hva gjør myelin?", ["Øker ledningshastigheten i nervefiberen", "Lager nevrotransmittere", "Tar imot signaler", "Gir næring til hjernen"], "Myelin isolerer aksonet, så impulsen hopper raskt mellom Ranviers innsnøringer.",
  "What does myelin do?", ["Increases the conduction speed of the nerve fibre", "Produces neurotransmitters", "Receives signals", "Nourishes the brain"], "Myelin insulates the axon, so the impulse jumps quickly between the nodes of Ranvier."],
 ["Hvilken del av hjernen er viktigst for balanse og koordinasjon?", ["Lillehjernen", "Hjernestammen", "Pannelappen", "Hypofysen"], "Lillehjernen (cerebellum) finjusterer bevegelser og balanse.",
  "Which part of the brain is most important for balance and coordination?", ["The cerebellum", "The brainstem", "The frontal lobe", "The pituitary gland"], "The cerebellum fine-tunes movement and balance."],
 ["Hvor sitter sentrene for pust og sirkulasjon?", ["I hjernestammen", "I lillehjernen", "I pannelappen", "I ryggmargen"], "Den forlengede margen i hjernestammen styrer pust og sirkulasjon.",
  "Where are the centres for breathing and circulation?", ["In the brainstem", "In the cerebellum", "In the frontal lobe", "In the spinal cord"], "The medulla oblongata in the brainstem controls breathing and circulation."]
]);

// ================= SANA 4: Nyrer, væske og elektrolytter =================
THEORY("SANA", 4, {
nb: `## Hva handler det om?
Nyrene renser blodet, regulerer væskemengden, elektrolyttene og syre-base-balansen, og lager hormoner. Den funksjonelle enheten er nefronet.

## Begreper
- I glomerulus filtreres blodet til primærurin (omtrent 180 liter i døgnet). Nesten alt tas opp igjen i tubuli, og det blir 1–2 liter urin.
- ADH (antidiuretisk hormon) fra hypofysen øker gjenopptaket av vann: mindre og mer konsentrert urin.
- Aldosteron fra binyrebarken øker gjenopptaket av natrium (og vann) og øker utskillelsen av kalium.
- Kroppen består av omtrent 60 % vann hos voksne. Omtrent to tredjedeler er inne i cellene.
- Viktige normalverdier: natrium omtrent 137–145 mmol/l, kalium 3,5–5,0 mmol/l.
- For lite urin: under omtrent 0,5 ml/kg/t hos voksne over flere timer bør varsles.

## Vanlige feil
- Å blande ADH og aldosteron: ADH handler om vann, aldosteron om natrium (og kalium).
- Å undervurdere kalium: både for høy og for lav kalium kan gi farlige hjerterytmeforstyrrelser.

> Glomerulus filtrerer, tubuli tar opp igjen. ADH holder på vann, aldosteron holder på natrium.`,
en: `## What is it about?
The kidneys clean the blood, regulate fluid volume, electrolytes and acid–base balance, and produce hormones. The functional unit is the nephron.

## Concepts
- In the glomerulus the blood is filtered into primary urine (about 180 litres a day). Almost everything is reabsorbed in the tubules, leaving 1–2 litres of urine.
- ADH (antidiuretic hormone) from the pituitary increases water reabsorption: less and more concentrated urine.
- Aldosterone from the adrenal cortex increases reabsorption of sodium (and water) and increases excretion of potassium.
- The adult body is about 60% water. About two thirds is inside the cells.
- Important normal values: sodium about 137–145 mmol/L, potassium 3.5–5.0 mmol/L.
- Too little urine: below about 0.5 mL/kg/h in adults over several hours should be reported.

## Common mistakes
- Mixing up ADH and aldosterone: ADH is about water, aldosterone about sodium (and potassium).
- Underestimating potassium: both high and low potassium can cause dangerous heart rhythm disturbances.

> The glomerulus filters, the tubules reabsorb. ADH retains water, aldosterone retains sodium.`
});
BIQ("SANA", 4, [
 ["Hva er nyrens funksjonelle enhet?", ["Nefronet", "Alveolen", "Nevronet", "Hepatocytten"], "Hver nyre har rundt én million nefroner.",
  "What is the functional unit of the kidney?", ["The nephron", "The alveolus", "The neuron", "The hepatocyte"], "Each kidney has around one million nephrons."],
 ["Hva gjør ADH?", ["Øker gjenopptaket av vann i nyrene", "Øker utskillelsen av natrium", "Senker blodsukkeret", "Øker urinmengden"], "ADH gjør at mer vann tas opp igjen, så urinen blir mindre og mer konsentrert.",
  "What does ADH do?", ["Increases water reabsorption in the kidneys", "Increases sodium excretion", "Lowers blood glucose", "Increases urine volume"], "ADH makes more water be reabsorbed, so the urine becomes smaller in volume and more concentrated."],
 ["Hva er normalområdet for kalium i blodet?", ["3,5–5,0 mmol/l", "137–145 mmol/l", "0,5–1,0 mmol/l", "10–15 mmol/l"], "137–145 er natrium. Kalium ligger på 3,5–5,0 mmol/l.",
  "What is the normal range for potassium in the blood?", ["3.5–5.0 mmol/L", "137–145 mmol/L", "0.5–1.0 mmol/L", "10–15 mmol/L"], "137–145 is sodium. Potassium is 3.5–5.0 mmol/L."],
 ["Hvor stor del av kroppsvekten er vann hos en voksen?", ["Omtrent 60 %", "Omtrent 20 %", "Omtrent 90 %", "Omtrent 40 %"], "Omtrent 60 %, noe mindre hos eldre og hos personer med mye fettvev.",
  "How much of an adult's body weight is water?", ["About 60%", "About 20%", "About 90%", "About 40%"], "About 60%, somewhat less in older people and in people with a lot of fat tissue."],
 ["En pasient på 80 kg. Hva er omtrent den laveste urinproduksjonen per time (0,5 ml/kg/t) før du bør varsle?", { n: 40, tol: 0, u: "ml/t" }, "0,5 · 80 = 40 ml per time.",
  "A patient weighs 80 kg. What is roughly the lowest urine output per hour (0.5 mL/kg/h) before you should report it?", null, "0.5 · 80 = 40 mL per hour."]
]);
GEN("SANA", 4,
 () => { const w = R.i(45, 110); const ml = 0.5 * w;
   return [T(`En voksen pasient veier ${w} kg. Hvor mange ml urin per time tilsvarer 0,5 ml/kg/t?`, `An adult patient weighs ${w} kg. How many mL of urine per hour correspond to 0.5 mL/kg/h?`),
     { n: ml, tol: 0.5, u: T("ml/t", "mL/h") }, T(`0,5 · ${w} = ${nf(ml, 1)} ml/t.`, `0.5 · ${w} = ${nf(ml, 1)} mL/h.`)]; }
);

// ================= SANA 5: Fordøyelse og ernæring =================
THEORY("SANA", 5, {
nb: `## Hva handler det om?
Fordøyelsen bryter maten ned til små molekyler som kan tas opp i blodet. Den starter i munnen og ender i tykktarmen.

## Begreper
- Munnen: tygging og amylase i spyttet starter nedbrytningen av karbohydrater.
- Magesekken: saltsyre og pepsin starter nedbrytningen av proteiner, og syren dreper mange mikrober.
- Tynntarmen: her skjer nesten all opptaket av næringsstoffer. Tarmtottene (villi) gir en enorm overflate.
- Leveren lager galle, som emulgerer fett så det kan brytes ned. Galle lagres i galleblæren.
- Bukspyttkjertelen lager fordøyelsesenzymer og hormonene insulin (senker blodsukker) og glukagon (øker blodsukker).
- Tykktarmen tar opp vann og salter.
- Fettløselige vitaminer: A, D, E og K.

## Vanlige feil
- Å tro at magesekken står for mest opptak. Det er tynntarmen.
- Å tro at galle er et enzym. Den emulgerer fett, men bryter det ikke ned selv.

> Munn → spiserør → magesekk → tynntarm (opptak) → tykktarm (vann). ADEK er fettløselige.`,
en: `## What is it about?
Digestion breaks food down into small molecules that can be absorbed into the blood. It starts in the mouth and ends in the large intestine.

## Concepts
- The mouth: chewing and amylase in saliva start the breakdown of carbohydrates.
- The stomach: hydrochloric acid and pepsin start the breakdown of proteins, and the acid kills many microbes.
- The small intestine: almost all absorption of nutrients happens here. The villi give an enormous surface area.
- The liver makes bile, which emulsifies fat so it can be broken down. Bile is stored in the gallbladder.
- The pancreas makes digestive enzymes and the hormones insulin (lowers blood glucose) and glucagon (raises blood glucose).
- The large intestine absorbs water and salts.
- Fat-soluble vitamins: A, D, E and K.

## Common mistakes
- Thinking the stomach is responsible for most absorption. It is the small intestine.
- Thinking bile is an enzyme. It emulsifies fat but does not break it down itself.

> Mouth → oesophagus → stomach → small intestine (absorption) → large intestine (water). ADEK are fat-soluble.`
});
BIQ("SANA", 5, [
 ["Hvor tas det meste av næringsstoffene opp?", ["I tynntarmen", "I magesekken", "I tykktarmen", "I spiserøret"], "Tynntarmen har tarmtotter som gir en svært stor overflate for opptak.",
  "Where are most nutrients absorbed?", ["In the small intestine", "In the stomach", "In the large intestine", "In the oesophagus"], "The small intestine has villi that give a very large surface area for absorption."],
 ["Hva gjør galle?", ["Emulgerer fett", "Bryter ned proteiner", "Senker blodsukkeret", "Tar opp vann"], "Galle deler fett i små dråper, så enzymene (lipase) kommer til.",
  "What does bile do?", ["Emulsifies fat", "Breaks down proteins", "Lowers blood glucose", "Absorbs water"], "Bile splits fat into small droplets so the enzymes (lipase) can reach it."],
 ["Hvilket hormon senker blodsukkeret?", ["Insulin", "Glukagon", "Adrenalin", "Kortisol"], "Insulin fra bukspyttkjertelen gjør at cellene tar opp glukose.",
  "Which hormone lowers blood glucose?", ["Insulin", "Glucagon", "Adrenaline", "Cortisol"], "Insulin from the pancreas makes the cells take up glucose."],
 ["Hvilke vitaminer er fettløselige?", ["A, D, E og K", "B og C", "Bare C", "Alle B-vitaminene"], "Huskeregel: ADEK. De lagres i fettvev og lever.",
  "Which vitamins are fat-soluble?", ["A, D, E and K", "B and C", "Only C", "All the B vitamins"], "Mnemonic: ADEK. They are stored in fat tissue and the liver."],
 ["Hva er tykktarmens viktigste oppgave?", ["Å ta opp vann og salter", "Å bryte ned proteiner", "Å lage galle", "Å lage insulin"], "Tykktarmen gjør avføringen fastere ved å ta opp vann.",
  "What is the main task of the large intestine?", ["To absorb water and salts", "To break down proteins", "To make bile", "To make insulin"], "The large intestine makes the stool firmer by absorbing water."]
]);
})();
