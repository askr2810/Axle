// ============================================================
//  add_syk_d.js – SYKEPLEIE, runde 2: insulin og IE i legemiddelregning, Sykdomslære (SSYK),
//  Lover, etikk og kommunikasjon (SLOV)
//  Øvingsmateriell. Gjeldende lover, retningslinjer, Felleskatalogen og lokale prosedyrer gjelder alltid.
// ============================================================
NEWCOURSE({ code: "SSYK", study: "syk", group: "Sykepleie: kropp og helse", nb: "Sykdomslære", en: "Pathology and Disease", s: ["SL", "PD"], eqText: SYK_EQ,
  units: [["Hjerte- og karsykdommer", "Cardiovascular disease"], ["Lungesykdommer", "Lung disease"], ["Diabetes", "Diabetes"], ["Infeksjoner og sepsis", "Infections and sepsis"], ["Hjerneslag og nevrologi", "Stroke and neurology"]] });
NEWCOURSE({ code: "SLOV", study: "syk", group: "Sykepleie: klinisk", nb: "Lover, etikk og kommunikasjon", en: "Law, Ethics and Communication", s: ["LE", "LE"], eqText: SYK_EQ,
  units: [["Helsepersonelloven og taushetsplikt", "The Health Personnel Act and confidentiality"], ["Pasientrettigheter og samtykke", "Patient rights and consent"], ["Etikk i sykepleien", "Ethics in nursing"], ["Kommunikasjon og dokumentasjon", "Communication and documentation"]] });
const SLMR_IE = ADDUNIT("SLMR", "Insulin, IE og blandede oppgaver", "Insulin, units and mixed problems");

(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });

// ================= SLMR: Insulin, IE og blandede oppgaver =================
TH("SLMR", SLMR_IE, `## Hva handler det om?
Noen legemidler doseres i internasjonale enheter (IE) i stedet for mg, for eksempel insulin og heparin. Regnemåten er den samme: dose delt på styrke.

## Begreper og formler
- Insulin er nesten alltid 100 IE/ml. 10 IE er da 0,1 ml.
- Volum = dose (IE) / styrke (IE/ml).
- Heparin finnes i flere styrker, for eksempel 5000 IE/ml. Les alltid styrken på ampullen.
- IE kan ikke regnes om til mg uten mer informasjon, fordi det avhenger av legemidlet.
- Blandede oppgaver: bruk samme fremgangsmåte som før. Skriv opp hva du har, hva du skal ha, og sjekk enhetene.

### Eksempel
Pasienten skal ha 16 IE insulin, 100 IE/ml. Volum = 16/100 = 0,16 ml.

## Vanlige feil
- Å skrive «U» eller «E» for hånd. Det kan leses som 0 eller 4, så skriv «enheter» eller «IE».
- Å bruke vanlig sprøyte til insulin. Bruk insulinsprøyte eller penn.

> IE regnes som mg: dose delt på styrke. Insulin: 100 IE/ml.
> Øvingsoppgaver. I praksis gjelder alltid legens forordning, Felleskatalogen og lokale prosedyrer.`,
`## What is it about?
Some drugs are dosed in international units (IU) instead of mg, for example insulin and heparin. The calculation is the same: dose divided by strength.

## Concepts and formulas
- Insulin is almost always 100 IU/mL. 10 IU is then 0.1 mL.
- Volume = dose (IU) / strength (IU/mL).
- Heparin comes in several strengths, for example 5000 IU/mL. Always read the strength on the ampoule.
- IU cannot be converted to mg without more information, because it depends on the drug.
- Mixed problems: use the same method as before. Write down what you have, what you need, and check the units.

### Example
The patient is to have 16 IU of insulin, 100 IU/mL. Volume = 16/100 = 0.16 mL.

## Common mistakes
- Handwriting "U". It can be read as 0 or 4, so write "units" or "IU".
- Using an ordinary syringe for insulin. Use an insulin syringe or pen.

> IU are calculated like mg: dose divided by strength. Insulin: 100 IU/mL.
> Practice problems. In real practice, the prescription, the product information and local procedures always apply.`);
BIQ("SLMR", SLMR_IE, [
 ["Pasienten skal ha 24 IE insulin (100 IE/ml). Hvor mange ml?", { n: 0.24, tol: 0, u: "ml" }, "24 / 100 = 0,24 ml.", "The patient is to have 24 IU of insulin (100 IU/mL). How many mL?", null, "24 / 100 = 0.24 mL."],
 ["Hvorfor bør man ikke forkorte «enheter» til «E» eller «U» for hånd?", ["Det kan leses som et tall og gi en mye større dose", "Det er ikke lov å bruke forkortelser", "Det tar for lang tid", "Det er ikke en SI-enhet"], "En utydelig U kan leses som 0, og 4U som 40. Skriv det helt ut.",
  "Why shouldn't you abbreviate \"units\" to \"U\" by hand?", ["It can be read as a number and give a much larger dose", "Abbreviations are not allowed", "It takes too long", "It is not an SI unit"], "An unclear U can be read as 0, and 4U as 40. Write it out in full."],
 ["Heparin 5000 IE/ml. Forordnet 2500 IE. Hvor mange ml?", { n: 0.5, tol: 0, u: "ml" }, "2500 / 5000 = 0,5 ml.", "Heparin 5000 IU/mL. Prescribed 2500 IU. How many mL?", null, "2500 / 5000 = 0.5 mL."]
]);
GEN("SLMR", SLMR_IE,
 () => { const ie = R.i(4, 40); const ml = ie / 100;
   return [T(`Pasienten skal ha ${ie} IE hurtigvirkende insulin. Styrken er 100 IE/ml. Hvor mange ml?`, `The patient is to have ${ie} IU of rapid-acting insulin. The strength is 100 IU/mL. How many mL?`), { n: ml, tol: 0.001, u: "ml" },
     T(`${ie} / 100 = ${nf(ml, 2)} ml.`, `${ie} / 100 = ${nf(ml, 2)} mL.`)]; },
 () => { const str = R.p([1000, 2500, 5000, 10000, 25000]), k = R.p([0.2, 0.25, 0.4, 0.5, 1, 2]); const dose = str * k;
   return [T(`Ampullen inneholder ${nf(str)} IE/ml. Forordnet dose er ${nf(dose)} IE. Hvor mange ml?`, `The ampoule contains ${nf(str)} IU/mL. The prescribed dose is ${nf(dose)} IU. How many mL?`), { n: k, tol: 0.001, u: "ml" },
     T(`${nf(dose)} / ${nf(str)} = ${nf(k, 2)} ml.`, `${nf(dose)} / ${nf(str)} = ${nf(k, 2)} mL.`)]; },
 () => { const w = R.i(50, 110), ieKg = R.p([60, 75, 80, 100]), str = R.p([5000, 10000]); const dose = w * ieKg, ml = dose / str;
   return [T(`En pasient på ${w} kg skal ha ${ieKg} IE/kg. Styrken er ${nf(str)} IE/ml. Hvor mange ml?`, `A patient weighing ${w} kg is to have ${ieKg} IU/kg. The strength is ${nf(str)} IU/mL. How many mL?`), { n: ml, tol: 0.01, u: "ml" },
     T(`Dose: ${ieKg} · ${w} = ${nf(dose)} IE. Volum: ${nf(dose)} / ${nf(str)} = ${nf(ml, 2)} ml.`, `Dose: ${ieKg} · ${w} = ${nf(dose)} IU. Volume: ${nf(dose)} / ${nf(str)} = ${nf(ml, 2)} mL.`)]; },
 // blandet: mikrogram i infusjon
 () => { const ug = R.p([100, 200, 250, 500]), vol = R.p([50, 100]), w = R.i(50, 100), rate = R.p([0.05, 0.1, 0.2]); const conc = ug / vol, mlh = rate * w * 60 / conc;
   return [T(`${ug} mikrogram er løst i ${vol} ml. Pasienten på ${w} kg skal ha ${nf(rate, 2)} mikrogram/kg/min. Hvor mange ml/t?`, `${ug} micrograms is dissolved in ${vol} mL. The patient weighing ${w} kg is to have ${nf(rate, 2)} micrograms/kg/min. How many mL/h?`), { n: mlh, tol: rel(mlh, 0.01), u: T("ml/t", "mL/h") },
     T(`Konsentrasjon: ${ug}/${vol} = ${nf(conc, 2)} µg/ml. Behov: ${nf(rate, 2)} · ${w} · 60 = ${nf(rate * w * 60, 1)} µg/t. ml/t = ${nf(rate * w * 60, 1)} / ${nf(conc, 2)} = ${nf(mlh, 2)} ml/t.`,
       `Concentration: ${ug}/${vol} = ${nf(conc, 2)} µg/mL. Requirement: ${nf(rate, 2)} · ${w} · 60 = ${nf(rate * w * 60, 1)} µg/h. mL/h = ${nf(rate * w * 60, 1)} / ${nf(conc, 2)} = ${nf(mlh, 2)} mL/h.`)]; }
);

// ================= SSYK 0: Hjerte- og karsykdommer =================
TH("SSYK", 0, `## Hva handler det om?
Hjerte- og karsykdommer er blant de vanligste årsakene til sykdom og død. Du må kjenne igjen symptomene og vite hva som haster.

## Sykdommer
- Hjerteinfarkt: en kransarterie tettes, og en del av hjertemuskelen får ikke oksygen. Typisk er trykkende brystsmerter som kan stråle ut i venstre arm, kjeve eller rygg, med kaldsvette og kvalme. Kvinner, eldre og personer med diabetes kan ha utypiske symptomer. Ring 113.
- Hjertesvikt: hjertet pumper for dårlig. Gir tung pust (verst i ro liggende), ødemer i beina, vektøkning og nattlig vannlating. Følg vekt og væskebalanse.
- Atrieflimmer: uregelmessig puls. Øker risikoen for hjerneslag, så mange får blodfortynnende.
- Høyt blodtrykk (hypertensjon): gir ofte ingen symptomer, men øker risikoen for hjerneslag, infarkt og nyresvikt.

> Brystsmerter, kaldsvette og kvalme: tenk hjerteinfarkt og handle raskt.`,
`## What is it about?
Cardiovascular diseases are among the most common causes of illness and death. You must recognise the symptoms and know what is urgent.

## Diseases
- Heart attack (myocardial infarction): a coronary artery is blocked, and part of the heart muscle gets no oxygen. Typical is pressing chest pain that may radiate to the left arm, jaw or back, with cold sweat and nausea. Women, older people and people with diabetes can have atypical symptoms. Call the emergency number.
- Heart failure: the heart pumps too weakly. Causes breathlessness (worse lying flat), leg oedema, weight gain and night-time urination. Monitor weight and fluid balance.
- Atrial fibrillation: an irregular pulse. Increases the risk of stroke, so many get anticoagulants.
- High blood pressure (hypertension): often causes no symptoms, but increases the risk of stroke, heart attack and kidney failure.

> Chest pain, cold sweat and nausea: think heart attack and act quickly.`);
BIQ("SSYK", 0, [
 ["Hvilket symptom er typisk for hjertesvikt?", ["Ødemer i beina og tung pust liggende", "Høy feber", "Utslett", "Diaré"], "Væske hoper seg opp i lungene og i beina.", "Which symptom is typical of heart failure?", ["Leg oedema and breathlessness lying flat", "High fever", "Rash", "Diarrhoea"], "Fluid builds up in the lungs and the legs."],
 ["Hvorfor får mange med atrieflimmer blodfortynnende?", ["For å redusere risikoen for hjerneslag", "For å senke pulsen", "For å senke blodsukkeret", "For å hindre infeksjon"], "Blod kan danne propper i forkammeret, og de kan gå til hjernen.",
  "Why do many people with atrial fibrillation get anticoagulants?", ["To reduce the risk of stroke", "To lower the pulse", "To lower blood glucose", "To prevent infection"], "Blood can form clots in the atrium, and they can travel to the brain."],
 ["Hvem kan ha utypiske symptomer ved hjerteinfarkt?", ["Kvinner, eldre og personer med diabetes", "Bare unge menn", "Bare idrettsutøvere", "Ingen"], "De kan ha tretthet, kvalme eller tung pust uten tydelige brystsmerter.",
  "Who can have atypical symptoms of a heart attack?", ["Women, older people and people with diabetes", "Only young men", "Only athletes", "Nobody"], "They may have fatigue, nausea or breathlessness without clear chest pain."],
 ["Hvilket tegn tyder på at hjertesviktpasienten samler væske?", ["Rask vektøkning", "Vekttap", "Lav puls", "Tørr hud"], "1 kg på kort tid er ofte 1 liter væske.", "Which sign suggests that the heart failure patient is retaining fluid?", ["Rapid weight gain", "Weight loss", "A low pulse", "Dry skin"], "1 kg over a short time is often 1 litre of fluid."]
]);

// ================= SSYK 1: Lungesykdommer =================
TH("SSYK", 1, `## Hva handler det om?
Lungesykdommer gir pustebesvær og lavt oksygen. Behandlingen avhenger av om problemet er trange luftveier, betennelse eller skade på lungevevet.

## Sykdommer
- KOLS (kronisk obstruktiv lungesykdom): varig trange luftveier, oftest etter røyking. Noen med alvorlig KOLS har risiko for å samle CO₂ ved for mye oksygen, så legen setter ofte et lavere mål for oksygenmetning (for eksempel 88–92 %).
- Astma: anfall med trange luftveier som går tilbake. Behandles med inhalasjon av luftveisutvidende medisin (for eksempel salbutamol) og betennelsesdempende.
- Lungebetennelse (pneumoni): infeksjon i lungevevet. Gir feber, hoste, rask pust og ofte høy CRP.
- Lungeemboli: en blodpropp i lungene. Gir plutselig tung pust og brystsmerter. Risikoen øker ved sengeleie og etter operasjoner.

> KOLS: følg oksygenmålet legen har satt. Plutselig tung pust etter sengeleie: tenk lungeemboli.`,
`## What is it about?
Lung diseases cause breathlessness and low oxygen. Treatment depends on whether the problem is narrow airways, inflammation or damage to the lung tissue.

## Diseases
- COPD (chronic obstructive pulmonary disease): permanently narrowed airways, most often after smoking. Some people with severe COPD risk retaining CO₂ with too much oxygen, so the doctor often sets a lower target for oxygen saturation (for example 88–92%).
- Asthma: attacks of narrowed airways that are reversible. Treated with inhaled bronchodilators (for example salbutamol) and anti-inflammatory medication.
- Pneumonia: infection in the lung tissue. Causes fever, cough, rapid breathing and often a high CRP.
- Pulmonary embolism: a blood clot in the lungs. Causes sudden breathlessness and chest pain. The risk increases with bed rest and after surgery.

> COPD: follow the oxygen target the doctor has set. Sudden breathlessness after bed rest: think pulmonary embolism.`);
BIQ("SSYK", 1, [
 ["Hva er et vanlig mål for oksygenmetning hos noen med alvorlig KOLS (etter legens vurdering)?", ["88–92 %", "100 %", "70–75 %", "96–100 %"], "For mye oksygen kan gi CO₂-opphopning hos noen KOLS-pasienter.",
  "What is a common oxygen saturation target for some people with severe COPD (as decided by the doctor)?", ["88–92%", "100%", "70–75%", "96–100%"], "Too much oxygen can cause CO₂ retention in some COPD patients."],
 ["Hva kjennetegner astma?", ["Anfall med trange luftveier som går tilbake", "Varig skade på lungevevet", "Blodpropp i lungene", "Alltid feber"], "Obstruksjonen ved astma er reversibel, i motsetning til ved KOLS.",
  "What characterises asthma?", ["Attacks of narrowed airways that are reversible", "Permanent damage to the lung tissue", "A blood clot in the lungs", "Always a fever"], "The obstruction in asthma is reversible, unlike in COPD."],
 ["Hva øker risikoen for lungeemboli?", ["Sengeleie og nylig operasjon", "Mye mosjon", "Høyt blodsukker", "Lav temperatur"], "Blodproppen oppstår ofte i beina ved lite bevegelse og går til lungene.",
  "What increases the risk of pulmonary embolism?", ["Bed rest and recent surgery", "A lot of exercise", "High blood glucose", "Low temperature"], "The clot often forms in the legs when there is little movement and travels to the lungs."]
]);

// ================= SSYK 2: Diabetes =================
TH("SSYK", 2, `## Hva handler det om?
Ved diabetes er blodsukkeret for høyt fordi kroppen mangler insulin eller ikke reagerer godt nok på det.

## Begreper
- Type 1: kroppen lager ikke insulin (autoimmun sykdom). Behandles alltid med insulin.
- Type 2: cellene reagerer dårlig på insulin (insulinresistens). Behandles med livsstilsendringer, tabletter og etter hvert ofte insulin.
- HbA1c viser gjennomsnittlig blodsukker de siste 2–3 månedene. 48 mmol/mol eller høyere kan gi diagnosen diabetes.
- Føling (hypoglykemi, blodsukker under omtrent 4 mmol/l): svette, skjelving, uro, forvirring. Er pasienten våken og kan svelge: gi raske karbohydrater (for eksempel druesukker eller juice). Er pasienten bevisstløs: ring 113, gi aldri noe i munnen.
- Ketoacidose (oftest type 1): høyt blodsukker, kvalme, dyp og rask pust, acetonlukt. Livstruende.
- Diabetes skader blodårer og nerver over tid. Sjekk føttene for sår.

> Føling hos våken pasient: raske karbohydrater. Bevisstløs: ingenting i munnen, ring 113.`,
`## What is it about?
In diabetes the blood glucose is too high because the body lacks insulin or does not respond well enough to it.

## Concepts
- Type 1: the body does not make insulin (an autoimmune disease). Always treated with insulin.
- Type 2: the cells respond poorly to insulin (insulin resistance). Treated with lifestyle changes, tablets and often insulin later.
- HbA1c shows the average blood glucose over the last 2–3 months. 48 mmol/mol or higher can give the diagnosis of diabetes.
- Hypoglycaemia (blood glucose below about 4 mmol/L): sweating, trembling, restlessness, confusion. If the patient is awake and can swallow: give fast-acting carbohydrates (for example glucose tablets or juice). If the patient is unconscious: call the emergency number, never give anything by mouth.
- Ketoacidosis (usually type 1): high blood glucose, nausea, deep and rapid breathing, a smell of acetone. Life-threatening.
- Diabetes damages blood vessels and nerves over time. Check the feet for wounds.

> Hypoglycaemia in an awake patient: fast-acting carbohydrates. Unconscious: nothing by mouth, call for help.`);
BIQ("SSYK", 2, [
 ["En våken pasient med diabetes er svett, skjelven og forvirret. Blodsukker 2,8 mmol/l. Hva gjør du først?", ["Gir raske karbohydrater, for eksempel juice eller druesukker", "Gir insulin", "Lar pasienten sove", "Gir ingenting og venter"], "Dette er føling. Insulin ville senket blodsukkeret enda mer.",
  "An awake patient with diabetes is sweaty, shaky and confused. Blood glucose 2.8 mmol/L. What do you do first?", ["Give fast-acting carbohydrates, for example juice or glucose", "Give insulin", "Let the patient sleep", "Give nothing and wait"], "This is hypoglycaemia. Insulin would lower the blood glucose even more."],
 ["Hva viser HbA1c?", ["Gjennomsnittlig blodsukker de siste 2–3 månedene", "Blodsukkeret akkurat nå", "Insulinnivået", "Kolesterolet"], "HbA1c brukes både til diagnose og oppfølging.",
  "What does HbA1c show?", ["Average blood glucose over the last 2–3 months", "The blood glucose right now", "The insulin level", "Cholesterol"], "HbA1c is used both for diagnosis and follow-up."],
 ["Hva er årsaken til type 1-diabetes?", ["Kroppen lager ikke insulin", "Cellene reagerer dårlig på insulin", "For mye sukker i kosten", "En bakterieinfeksjon"], "Immunforsvaret ødelegger cellene som lager insulin.",
  "What causes type 1 diabetes?", ["The body does not make insulin", "The cells respond poorly to insulin", "Too much sugar in the diet", "A bacterial infection"], "The immune system destroys the cells that make insulin."],
 ["Hvorfor er fotstell viktig ved diabetes?", ["Nerve- og karskader gjør at sår oppdages sent og gror dårlig", "Diabetes gir kalde føtter", "Det er ikke viktig", "Det senker blodsukkeret"], "Små sår kan bli alvorlige infeksjoner.",
  "Why is foot care important in diabetes?", ["Nerve and vessel damage means wounds are noticed late and heal poorly", "Diabetes causes cold feet", "It is not important", "It lowers blood glucose"], "Small wounds can become serious infections."]
]);

// ================= SSYK 3: Infeksjoner og sepsis =================
TH("SSYK", 3, `## Hva handler det om?
Sepsis er en livstruende tilstand der kroppens reaksjon på en infeksjon skader egne organer. Tidlig oppdagelse og antibiotika redder liv.

## Begreper
- Vanlige utgangspunkter: lungebetennelse, urinveisinfeksjon, bukinfeksjon og hudinfeksjon.
- Tegn: høy eller lav temperatur, rask pust, rask puls, lavt blodtrykk, nyoppstått forvirring og lite urin.
- qSOFA er en enkel sjekk: respirasjonsfrekvens 22 eller høyere, endret mental status og systolisk blodtrykk 100 eller lavere. To eller flere tyder på høy risiko.
- NEWS2 fanger også opp mange septiske pasienter.
- Behandling: blodkulturer, antibiotika raskt (helst innen en time ved alvorlig sepsis), væske og overvåking.
- Eldre kan ha få symptomer, for eksempel bare forvirring eller at de «ikke er seg selv».

> Infeksjon + rask pust, forvirring eller lavt blodtrykk: tenk sepsis og varsle lege med en gang.`,
`## What is it about?
Sepsis is a life-threatening condition where the body's response to an infection damages its own organs. Early detection and antibiotics save lives.

## Concepts
- Common sources: pneumonia, urinary tract infection, abdominal infection and skin infection.
- Signs: high or low temperature, rapid breathing, rapid pulse, low blood pressure, new confusion and low urine output.
- qSOFA is a simple check: respiratory rate 22 or higher, altered mental status and systolic blood pressure 100 or lower. Two or more suggest high risk.
- NEWS2 also picks up many septic patients.
- Treatment: blood cultures, antibiotics quickly (ideally within one hour in severe sepsis), fluids and monitoring.
- Older people may have few symptoms, for example only confusion or not "being themselves".

> Infection + rapid breathing, confusion or low blood pressure: think sepsis and alert the doctor at once.`);
BIQ("SSYK", 3, [
 ["Hvilke tre kriterier er med i qSOFA?", ["Respirasjonsfrekvens ≥ 22, endret mental status, systolisk blodtrykk ≤ 100", "Feber, hoste og utslett", "Høy CRP, høy puls og smerte", "Lavt blodsukker, lav puls og feber"], "To eller flere gir høy risiko for dårlig forløp ved infeksjon.",
  "Which three criteria are part of qSOFA?", ["Respiratory rate ≥ 22, altered mental status, systolic blood pressure ≤ 100", "Fever, cough and rash", "High CRP, high pulse and pain", "Low blood glucose, low pulse and fever"], "Two or more mean a high risk of a poor outcome in infection."],
 ["Hvorfor haster antibiotika ved alvorlig sepsis?", ["Hver time forsinkelse øker dødeligheten", "Det gjør ikke det", "For å senke temperaturen", "For å unngå resistens"], "Rask behandling er avgjørende. Blodkulturer tas helst før antibiotika gis.",
  "Why are antibiotics urgent in severe sepsis?", ["Every hour of delay increases mortality", "They are not", "To lower the temperature", "To avoid resistance"], "Rapid treatment is crucial. Blood cultures are ideally taken before antibiotics are given."],
 ["En eldre pasient med urinveisinfeksjon er plutselig forvirret. Hva tenker du?", ["Mulig sepsis: mål vitale tegn og varsle lege", "Det er normal aldring", "Pasienten er trøtt", "Gi sovemedisin"], "Nyoppstått forvirring er et viktig tegn på alvorlig infeksjon hos eldre.",
  "An older patient with a urinary tract infection is suddenly confused. What do you think?", ["Possible sepsis: measure vital signs and alert the doctor", "It is normal ageing", "The patient is tired", "Give a sleeping pill"], "New confusion is an important sign of serious infection in older people."]
]);

// ================= SSYK 4: Hjerneslag og nevrologi =================
TH("SSYK", 4, `## Hva handler det om?
Ved hjerneslag får en del av hjernen for lite blod, enten fordi en blodåre tettes (infarkt, vanligst) eller fordi den brister (blødning). Jo raskere behandling, desto mer hjernevev reddes.

## Begreper
- Kjenn igjen hjerneslag med «Prate – Smile – Løfte»: utydelig eller forvirret tale, skjevt smil, og svakhet når armene løftes. Ring 113 med en gang.
- Tidspunktet symptomene startet er avgjørende, fordi propløsende behandling bare kan gis innen et kort tidsvindu.
- Etter hjerneslag: fare for svelgvansker (test før mat og drikke), fall og lammelser. Tidlig mobilisering og rehabilitering er viktig.
- Bevissthetsnivå vurderes ofte med Glasgow Coma Scale (GCS), fra 3 (dypt bevisstløs) til 15 (våken og orientert).

> Prate – Smile – Løfte. Noter tidspunktet. Ring 113.`,
`## What is it about?
In a stroke part of the brain gets too little blood, either because a blood vessel is blocked (infarction, the most common) or because it bursts (haemorrhage). The faster the treatment, the more brain tissue is saved.

## Concepts
- Recognise a stroke with "Speak – Smile – Lift": slurred or confused speech, a lopsided smile, and weakness when lifting the arms. Call the emergency number at once.
- The time the symptoms started is crucial, because clot-dissolving treatment can only be given within a short time window.
- After a stroke: risk of swallowing difficulties (test before food and drink), falls and paralysis. Early mobilisation and rehabilitation are important.
- Level of consciousness is often assessed with the Glasgow Coma Scale (GCS), from 3 (deeply unconscious) to 15 (awake and oriented).

> Speak – Smile – Lift. Note the time. Call for help.`);
BIQ("SSYK", 4, [
 ["Hva står «Prate – Smile – Løfte» for?", ["Tegn på hjerneslag", "Tegn på hjerteinfarkt", "Tegn på føling", "En smertevurdering"], "Utydelig tale, skjevt smil og svakhet i armene tyder på hjerneslag.",
  "What does \"Speak – Smile – Lift\" stand for?", ["Signs of a stroke", "Signs of a heart attack", "Signs of hypoglycaemia", "A pain assessment"], "Slurred speech, a lopsided smile and arm weakness suggest a stroke."],
 ["Hvorfor må du notere når symptomene startet?", ["Propløsende behandling kan bare gis innen et kort tidsvindu", "Det er ikke viktig", "For å fakturere riktig", "For å vite når pasienten skal spise"], "Tidspunktet avgjør hvilken behandling som er mulig.",
  "Why must you note when the symptoms started?", ["Clot-dissolving treatment can only be given within a short time window", "It is not important", "For correct billing", "To know when the patient should eat"], "The time decides which treatment is possible."],
 ["Hva er laveste og høyeste mulige GCS-poeng?", ["3 og 15", "0 og 10", "1 og 5", "0 og 100"], "3 er dypt bevisstløs, 15 er våken og orientert.", "What are the lowest and highest possible GCS scores?", ["3 and 15", "0 and 10", "1 and 5", "0 and 100"], "3 is deeply unconscious, 15 is awake and oriented."],
 ["Hvorfor testes svelgfunksjonen før en slagpasient får mat?", ["Svelgvansker kan gi feilsvelging og lungebetennelse", "For å se om pasienten er sulten", "Det er ikke nødvendig", "For å måle blodsukker"], "Mat eller drikke i luftveiene kan gi aspirasjonspneumoni.",
  "Why is swallowing tested before a stroke patient gets food?", ["Swallowing problems can cause aspiration and pneumonia", "To see whether the patient is hungry", "It is not necessary", "To measure blood glucose"], "Food or drink in the airways can cause aspiration pneumonia."]
]);

// ================= SLOV 0: Helsepersonelloven og taushetsplikt =================
TH("SLOV", 0, `## Hva handler det om?
Helsepersonelloven sier hvilke plikter du har som helsepersonell. De viktigste er å jobbe forsvarlig, holde taushetsplikten og dokumentere.

## Begreper
- Forsvarlighet: du skal utføre arbeidet slik det forventes ut fra kvalifikasjonene dine, og be om hjelp når du trenger det.
- Taushetsplikt: du skal hindre at andre får tilgang til opplysninger om pasientens helse og personlige forhold. Den gjelder også etter at du har sluttet, og overfor egne venner og familie.
- Unntak fra taushetsplikten er for eksempel samtykke fra pasienten, at opplysningene deles med samarbeidende helsepersonell for å gi helsehjelp, og lovpålagt opplysningsplikt (for eksempel til barnevernet ved alvorlig omsorgssvikt).
- Dokumentasjonsplikt: relevante og nødvendige opplysninger om pasienten og helsehjelpen skal føres i journalen.
- Snoking i journaler er ulovlig. Du skal bare lese journalen til pasienter du gir helsehjelp til.

> Forsvarlig, taus og dokumentert. Ikke åpne journaler du ikke har tjenstlig behov for.`,
`## What is it about?
The Norwegian Health Personnel Act sets out your duties as a health professional. The most important are to work responsibly, keep confidentiality and document.

## Concepts
- Responsible practice: you must do your work as expected from your qualifications, and ask for help when you need it.
- Confidentiality: you must prevent others from accessing information about the patient's health and personal circumstances. It also applies after you have left the job, and towards your own friends and family.
- Exceptions to confidentiality include the patient's consent, sharing with cooperating health personnel to provide care, and a statutory duty to inform (for example to child protection services in cases of serious neglect).
- Duty to document: relevant and necessary information about the patient and the care given must be recorded in the medical record.
- Snooping in records is illegal. You may only read the records of patients you are caring for.

> Responsible, confidential and documented. Do not open records you have no professional need for.`);
BIQ("SLOV", 0, [
 ["En venn spør om en kjent person som er innlagt på avdelingen din. Hva gjør du?", ["Sier ingenting, verken bekrefter eller avkrefter", "Forteller det du vet", "Sier bare hvilken avdeling", "Viser journalen"], "Taushetsplikten gjelder også at personen er innlagt.",
  "A friend asks about a famous person admitted to your ward. What do you do?", ["Say nothing, neither confirm nor deny", "Tell what you know", "Only say which ward", "Show the record"], "Confidentiality also covers the fact that the person is admitted."],
 ["Når kan du lese en pasients journal?", ["Når du gir pasienten helsehjelp og har tjenstlig behov", "Når du er nysgjerrig", "Når pasienten er en kollega", "Alltid, hvis du er ansatt"], "Snoking i journaler er brudd på loven.",
  "When may you read a patient's record?", ["When you are caring for the patient and have a professional need", "When you are curious", "When the patient is a colleague", "Always, if you are employed"], "Snooping in records is a breach of the law."],
 ["Gjelder taushetsplikten etter at du har sluttet i jobben?", ["Ja", "Nei", "Bare i ett år", "Bare for leger"], "Taushetsplikten gjelder også etter at arbeidsforholdet er slutt.",
  "Does confidentiality still apply after you have left the job?", ["Yes", "No", "Only for one year", "Only for doctors"], "Confidentiality applies after the employment has ended as well."],
 ["Hva betyr kravet om forsvarlighet?", ["Å jobbe slik kvalifikasjonene tilsier og be om hjelp ved behov", "Å alltid gjøre det pasienten ber om", "Å aldri gjøre feil", "Å jobbe så raskt som mulig"], "Du skal kjenne dine egne begrensninger.",
  "What does the requirement of responsible practice mean?", ["Working as your qualifications allow and asking for help when needed", "Always doing what the patient asks", "Never making mistakes", "Working as fast as possible"], "You must know your own limitations."]
]);

// ================= SLOV 1: Pasientrettigheter og samtykke =================
TH("SLOV", 1, `## Hva handler det om?
Pasient- og brukerrettighetsloven gir pasienten rettigheter. Hovedregelen er at helsehjelp bare kan gis med pasientens samtykke.

## Begreper
- Samtykke: pasienten må ha fått nødvendig informasjon for at samtykket skal være gyldig. Samtykket kan trekkes tilbake.
- Samtykkekompetanse: evnen til å forstå hva samtykket gjelder. Den kan falle bort helt eller delvis, for eksempel ved demens eller psykose.
- Helserettslig myndighetsalder er 16 år.
- Pasienten har rett til informasjon om helsetilstanden og helsehjelpen, og rett til innsyn i egen journal.
- Pasienter uten samtykkekompetanse som motsetter seg nødvendig helsehjelp, kan i noen tilfeller få helsehjelp etter egne regler (kapittel 4A), med strenge vilkår og vedtak.
- Pasienten kan klage og har rett til å få en ny vurdering.

> Informasjon først, så samtykke. Helserettslig myndighetsalder er 16 år.`,
`## What is it about?
The Norwegian Patient and User Rights Act gives patients rights. The main rule is that health care may only be given with the patient's consent.

## Concepts
- Consent: the patient must have received the necessary information for the consent to be valid. Consent can be withdrawn.
- Capacity to consent: the ability to understand what the consent concerns. It can be lost wholly or partly, for example in dementia or psychosis.
- The age of consent for health care is 16 in Norway.
- The patient has the right to information about their condition and care, and the right to access their own record.
- Patients without capacity who resist necessary care can in some cases receive care under special rules (chapter 4A), with strict conditions and a formal decision.
- The patient can complain and has the right to a new assessment.

> Information first, then consent. The age of consent for health care is 16.`);
BIQ("SLOV", 1, [
 ["Hva er helserettslig myndighetsalder i Norge?", ["16 år", "18 år", "14 år", "12 år"], "Fra 16 år kan man som hovedregel samtykke til helsehjelp selv.",
  "What is the age of consent for health care in Norway?", ["16", "18", "14", "12"], "From 16, a person can as a rule consent to health care themselves."],
 ["Hva må til for at et samtykke skal være gyldig?", ["Pasienten har fått nødvendig informasjon og har samtykkekompetanse", "At pasienten har signert på papir", "At pårørende er enige", "At legen bestemmer"], "Samtykke kan være muntlig eller stilltiende, men pasienten må forstå hva det gjelder.",
  "What is required for consent to be valid?", ["The patient has received the necessary information and has capacity", "That the patient has signed a paper", "That the relatives agree", "That the doctor decides"], "Consent can be verbal or implied, but the patient must understand what it concerns."],
 ["Kan en pasient trekke tilbake et samtykke?", ["Ja, når som helst", "Nei, aldri", "Bare skriftlig", "Bare med legens tillatelse"], "Samtykke er frivillig og kan trekkes tilbake.",
  "Can a patient withdraw consent?", ["Yes, at any time", "No, never", "Only in writing", "Only with the doctor's permission"], "Consent is voluntary and can be withdrawn."],
 ["Har pasienten rett til å lese sin egen journal?", ["Ja, som hovedregel", "Nei", "Bare med advokat", "Bare etter utskrivelse"], "Retten til innsyn kan bare begrenses i spesielle tilfeller.",
  "Does the patient have the right to read their own record?", ["Yes, as a rule", "No", "Only with a lawyer", "Only after discharge"], "The right of access can only be limited in special cases."]
]);

// ================= SLOV 2: Etikk i sykepleien =================
TH("SLOV", 2, `## Hva handler det om?
Etikk handler om hva som er rett å gjøre, særlig når verdier står mot hverandre. Sykepleiere har egne yrkesetiske retningslinjer.

## Begreper
- De fire prinsippene i medisinsk etikk: respekt for autonomi (selvbestemmelse), velgjørenhet (gjøre godt), ikke-skade og rettferdighet.
- Et etisk dilemma er en situasjon der alle valg bryter med en viktig verdi.
- Yrkesetiske retningslinjer for sykepleiere bygger på respekt for menneskets verdighet og menneskerettighetene.
- Sykepleieteoretikere: Joyce Travelbee (menneske-til-menneske-forholdet og mening i lidelse), Virginia Henderson (hjelpe pasienten med grunnleggende behov til hen klarer seg selv) og Kari Martinsen (omsorg som relasjon og moral).

> Autonomi, velgjørenhet, ikke-skade og rettferdighet.`,
`## What is it about?
Ethics is about what is right to do, especially when values conflict. Nurses have their own code of ethics.

## Concepts
- The four principles of medical ethics: respect for autonomy (self-determination), beneficence (doing good), non-maleficence (doing no harm) and justice.
- An ethical dilemma is a situation where every choice breaks an important value.
- The Norwegian code of ethics for nurses is based on respect for human dignity and human rights.
- Nursing theorists: Joyce Travelbee (the human-to-human relationship and meaning in suffering), Virginia Henderson (helping the patient with basic needs until they manage alone) and Kari Martinsen (care as relationship and morality).

> Autonomy, beneficence, non-maleficence and justice.`);
BIQ("SLOV", 2, [
 ["Hvilket prinsipp handler om pasientens rett til å bestemme selv?", ["Autonomi", "Velgjørenhet", "Rettferdighet", "Ikke-skade"], "Respekt for autonomi betyr at pasientens egne valg skal respekteres.",
  "Which principle concerns the patient's right to decide for themselves?", ["Autonomy", "Beneficence", "Justice", "Non-maleficence"], "Respect for autonomy means the patient's own choices must be respected."],
 ["Hva er et etisk dilemma?", ["En situasjon der alle valg bryter med en viktig verdi", "Et lovbrudd", "En uenighet om vaktlista", "En feil i legemiddelhåndteringen"], "Derfor må man veie verdiene mot hverandre.",
  "What is an ethical dilemma?", ["A situation where every choice breaks an important value", "A breach of the law", "A disagreement about the rota", "An error in medication management"], "That is why the values must be weighed against each other."],
 ["Hvilken teoretiker er kjent for menneske-til-menneske-forholdet?", ["Joyce Travelbee", "Florence Nightingale", "Virginia Henderson", "Kari Martinsen"], "Travelbee la vekt på relasjonen mellom sykepleier og pasient og på å finne mening i sykdom og lidelse.",
  "Which theorist is known for the human-to-human relationship?", ["Joyce Travelbee", "Florence Nightingale", "Virginia Henderson", "Kari Martinsen"], "Travelbee emphasised the relationship between nurse and patient and finding meaning in illness and suffering."]
]);

// ================= SLOV 3: Kommunikasjon og dokumentasjon =================
TH("SLOV", 3, `## Hva handler det om?
God kommunikasjon gjør pasienten trygg og hindrer misforståelser. God dokumentasjon sikrer at neste vakt vet hva som er gjort og hva som skal skje.

## Begreper
- Aktiv lytting: vis at du følger med, oppsummer og still oppfølgingsspørsmål.
- Åpne spørsmål («Hvordan har natten vært?») gir mer informasjon enn lukkede («Har du sovet?»).
- Tolk: bruk kvalifisert tolk ved språkbarrierer. Barn og andre pårørende skal ikke brukes som tolk.
- ISBAR ved muntlig rapport: Identifikasjon, Situasjon, Bakgrunn, Aktuell vurdering, Råd.
- Dokumentasjon: skriv objektivt og konkret (hva du observerte og gjorde), så snart som mulig etter hendelsen, og uten å fjerne det som er skrevet.

> Åpne spørsmål, kvalifisert tolk, ISBAR og objektiv dokumentasjon.`,
`## What is it about?
Good communication makes the patient feel safe and prevents misunderstandings. Good documentation ensures that the next shift knows what has been done and what should happen.

## Concepts
- Active listening: show that you are paying attention, summarise and ask follow-up questions.
- Open questions ("How has the night been?") give more information than closed ones ("Did you sleep?").
- Interpreter: use a qualified interpreter when there is a language barrier. Children and other relatives should not be used as interpreters.
- ISBAR for verbal handover: Identify, Situation, Background, Assessment, Recommendation.
- Documentation: write objectively and concretely (what you observed and did), as soon as possible after the event, and without deleting what has been written.

> Open questions, a qualified interpreter, ISBAR and objective documentation.`);
BIQ("SLOV", 3, [
 ["Hvilket spørsmål er åpent?", ["«Hvordan har du det i dag?»", "«Har du vondt?»", "«Sov du i natt?»", "«Vil du ha kaffe?»"], "Åpne spørsmål kan ikke besvares med ja eller nei.",
  "Which question is open?", ["\"How are you today?\"", "\"Are you in pain?\"", "\"Did you sleep last night?\"", "\"Would you like coffee?\""], "Open questions cannot be answered with yes or no."],
 ["Pasienten snakker lite norsk. Datteren på 12 år er til stede. Hva gjør du?", ["Bestiller kvalifisert tolk", "Bruker datteren som tolk", "Snakker høyere og saktere", "Bruker bare tegn"], "Barn skal ikke brukes som tolk. Det er en belastning for barnet og gir fare for feil.",
  "The patient speaks little Norwegian. Their 12-year-old daughter is present. What do you do?", ["Book a qualified interpreter", "Use the daughter as an interpreter", "Speak louder and slower", "Only use gestures"], "Children should not be used as interpreters. It burdens the child and risks errors."],
 ["Hva er god dokumentasjon?", ["Objektive observasjoner og tiltak, skrevet så snart som mulig", "Egne meninger om pasientens personlighet", "Å skrive alt på slutten av uka", "Å slette det som var feil"], "Feil rettes ved å føre en ny, daterte merknad, ikke ved å slette.",
  "What is good documentation?", ["Objective observations and actions, written as soon as possible", "Your own opinions about the patient's personality", "Writing everything at the end of the week", "Deleting what was wrong"], "Errors are corrected with a new, dated note, not by deleting."]
]);
})();
