// ============================================================
//  add_vgs_q.js – Norsk (Vg1–Vg3 fellesfag, LK20): litteraturhistorie, språkhistorie, sjangre og virkemidler, retorikk.
//  Tidslinjene (nor_lit, nor_sprak) ligger i timeline.js, sorterings- og rekkefølgeoppgavene i sorts.js.
// ============================================================
NEWCOURSE({ code: "VGNOR", study: "vgs", group: "VGS: fellesfag", nb: "Norsk", en: "Norwegian", s: ["No", "No"], eqText: VG_EQ("Vg1–Vg3 fellesfag (LK20)", "Year 11–13 core subject (Norwegian curriculum)"), units: [] });
(() => {
const mix = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const U = (nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT("VGNOR", nb, en); THEORY("VGNOR", u, { nb: thNb, en: thEn }); BIQ("VGNOR", u, qs); if(gens.length) GEN("VGNOR", u, ...gens); return u; };
// Hvem skrev hva? [verk, forfatter, epoke nb, epoke en]
const WORKS = [["«Jeppe på Bjerget»", "Ludvig Holberg", "opplysningstiden", "the Enlightenment"], ["«Skabelsen, Mennesket og Messias»", "Henrik Wergeland", "romantikken", "Romanticism"],
  ["«Amtmandens Døttre»", "Camilla Collett", "overgangen til realismen", "the transition to realism"], ["«Et dukkehjem»", "Henrik Ibsen", "realismen", "realism"], ["«Constance Ring»", "Amalie Skram", "naturalismen", "naturalism"],
  ["«Sult»", "Knut Hamsun", "nyromantikken", "neo-romanticism"], ["«Kristin Lavransdatter»", "Sigrid Undset", "mellomkrigstiden", "the interwar period"], ["«Is-slottet»", "Tarjei Vesaas", "modernismen", "modernism"],
  ["«Nordlands Trompet»", "Petter Dass", "barokken", "the Baroque"], ["«Min kamp»", "Karl Ove Knausgård", "samtidslitteraturen", "contemporary literature"]];
function workGen(){ return () => { const w = R.p(WORKS), wrong = mix(WORKS.filter(x => x[1] !== w[1])).slice(0, 3).map(x => x[1]);
  return [T(`Hvem skrev ${w[0]}?`, `Who wrote ${w[0]}?`), [w[1], ...wrong], T(`${w[1]} skrev ${w[0]} (${w[2]}).`, `${w[1]} wrote ${w[0]} (${w[3]}).`)]; }; }
function epochGen(){ return () => { const w = R.p(WORKS), wrong = mix([...new Set(WORKS.map(x => x[2]))].filter(x => x !== w[2])).slice(0, 3);
  return [T(`Hvilken epoke hører ${w[0]} av ${w[1]} til?`, `Which period does ${w[0]} by ${w[1]} belong to?`), [w[2], ...wrong].map(x => T(x, (WORKS.find(y => y[2] === x) || [])[3] || x)), T(`${w[0]} regnes til ${w[2]}.`, `${w[0]} belongs to ${w[3]}.`)]; }; }

U("Litteraturhistorie", "Literary history",
`## Hva handler det om?
Litteraturen speiler tiden den blir skrevet i. Når samfunnet endrer seg – kristendom, opplysning, nasjonsbygging, industrialisering, krig – endrer også diktingen seg. Derfor deler vi litteraturhistorien inn i **epoker**.

## Begreper og formler
- **Norrøn tid** (ca. 800–1350): eddadikt, skaldekvad og sagaer. Snorre Sturlason skrev kongesagaene (Heimskringla) rundt 1230.
- **Folkediktning**: eventyr, sagn og folkeviser som ble fortalt muntlig. Asbjørnsen og Moe samlet eventyrene på 1840-tallet.
- **Barokken** (1600-tallet): religiøs og billedrik dikting, for eksempel Petter Dass' «Nordlands Trompet».
- **Opplysningstiden** (1700-tallet): tro på fornuften. Ludvig Holberg skrev komedier som «Jeppe på Bjerget» (1722).
- **Romantikken** (ca. 1800–1850): følelser, natur og det nasjonale. Henrik Wergeland er den store norske romantikeren.
- **Realismen** (ca. 1870–1890): litteraturen skal «sette problemer under debatt» (Georg Brandes). Ibsen, Bjørnson, Kielland og Lie – «de fire store».
- **Naturalismen** (1880-årene): mennesket styres av arv og miljø. Amalie Skram og Hans Jæger.
- **Nyromantikken** (1890-årene): sjelelivet og det irrasjonelle. Knut Hamsuns «Sult» (1890).
- **Modernismen** (1900-tallet): bryter med tradisjonelle former, for eksempel fri vers og indre monolog. Tarjei Vesaas.
- **Samtidslitteratur**: mangfold av sjangre, sakprosa og selvbiografisk skriving. Jon Fosse fikk Nobelprisen i litteratur i 2023.

### Eksempel
Ibsens «Et dukkehjem» (1879) er typisk realisme: et samtidsdrama der ekteskapet og kvinnens stilling settes under debatt. Nora forlater mann og barn for å finne ut hvem hun selv er.

> Huskeregel: Romantikken ser **inn i følelsene og bakover** i historien, realismen ser **ut på samfunnet** her og nå.`,
`## What is it about?
Literature reflects the time it is written in. When society changes – Christianity, Enlightenment, nation-building, industrialisation, war – writing changes too. That is why literary history is divided into **periods**.

## Concepts and formulas
- **Old Norse period** (c. 800–1350): Eddic poems, skaldic verse and sagas. Snorri Sturluson wrote the kings' sagas (Heimskringla) around 1230.
- **Folk literature**: fairy tales, legends and ballads passed on orally. Asbjørnsen and Moe collected the fairy tales in the 1840s.
- **The Baroque** (1600s): religious, image-rich writing, e.g. Petter Dass' 'The Trumpet of Nordland'.
- **The Enlightenment** (1700s): faith in reason. Ludvig Holberg wrote comedies like 'Jeppe on the Hill' (1722).
- **Romanticism** (c. 1800–1850): feelings, nature and the nation. Henrik Wergeland is the great Norwegian Romantic.
- **Realism** (c. 1870–1890): literature should 'put problems up for debate' (Georg Brandes). Ibsen, Bjørnson, Kielland and Lie – 'the four greats'.
- **Naturalism** (1880s): people are governed by heredity and environment. Amalie Skram and Hans Jæger.
- **Neo-romanticism** (1890s): the inner life and the irrational. Knut Hamsun's 'Hunger' (1890).
- **Modernism** (1900s): breaks with traditional forms, e.g. free verse and interior monologue. Tarjei Vesaas.
- **Contemporary literature**: many genres, non-fiction and autobiographical writing. Jon Fosse won the Nobel Prize in Literature in 2023.

### Example
Ibsen's 'A Doll's House' (1879) is typical realism: a contemporary drama that puts marriage and women's position up for debate. Nora leaves her husband and children to find out who she is.

> Rule of thumb: Romanticism looks **inward at feelings and back** in history; realism looks **out at society** here and now.`,
[
 ["Hva ville realistene at litteraturen skulle gjøre?", ["Sette problemer under debatt", "Hylle naturen og fortiden", "Skildre drømmer og det irrasjonelle", "Bare underholde"], "Georg Brandes' krav fra 1871 ble programmet for realismen.", "What did the realists want literature to do?", ["Put problems up for debate", "Celebrate nature and the past", "Depict dreams and the irrational", "Only entertain"], "Georg Brandes' demand from 1871 became realism's programme."],
 ["Hvem regnes som den store norske romantikeren?", ["Henrik Wergeland", "Henrik Ibsen", "Knut Hamsun", "Ludvig Holberg"], "Wergeland (1808–1845) skrev lyrikk og kjempet for 17. mai og jødenes rett til å komme til Norge.", "Who is regarded as the great Norwegian Romantic?", ["Henrik Wergeland", "Henrik Ibsen", "Knut Hamsun", "Ludvig Holberg"], "Wergeland (1808–1845) wrote poetry and fought for 17 May and for Jews' right to enter Norway."],
 ["Hva kjennetegner naturalismen?", ["Mennesket blir framstilt som styrt av arv og miljø", "Troen på fornuften", "Interessen for helter fra sagatiden", "Fri vers uten rim"], "Naturalistene var påvirket av Darwin og naturvitenskapen.", "What characterises naturalism?", ["People are shown as governed by heredity and environment", "Faith in reason", "Interest in saga heroes", "Free verse without rhyme"], "The naturalists were influenced by Darwin and natural science."],
 ["Hvilket verk er et typisk eksempel på nyromantikken?", ["«Sult» av Knut Hamsun", "«Et dukkehjem» av Henrik Ibsen", "«Jeppe på Bjerget» av Ludvig Holberg", "Heimskringla av Snorre"], "«Sult» (1890) skildrer sinnet og sjelelivet til en sulten forfatter i Kristiania.", "Which work is a typical example of neo-romanticism?", ["'Hunger' by Knut Hamsun", "'A Doll's House' by Henrik Ibsen", "'Jeppe on the Hill' by Ludvig Holberg", "Heimskringla by Snorri"], "'Hunger' (1890) depicts the mind of a starving writer in Kristiania."],
 ["Hvem samlet norske folkeeventyr på 1840-tallet?", ["Asbjørnsen og Moe", "Ibsen og Bjørnson", "Wergeland og Welhaven", "Aasen og Knudsen"], "De skrev ned eventyrene på et språk som var mer norsk enn datidens dansk.", "Who collected Norwegian folk tales in the 1840s?", ["Asbjørnsen and Moe", "Ibsen and Bjørnson", "Wergeland and Welhaven", "Aasen and Knudsen"], "They wrote the tales down in a language more Norwegian than the Danish of the time."],
 ["Hvilken norsk forfatter fikk Nobelprisen i litteratur i 2023?", ["Jon Fosse", "Karl Ove Knausgård", "Jostein Gaarder", "Herbjørg Wassmo"], "Fosse skriver på nynorsk – både dramatikk, romaner og lyrikk.", "Which Norwegian writer won the Nobel Prize in Literature in 2023?", ["Jon Fosse", "Karl Ove Knausgård", "Jostein Gaarder", "Herbjørg Wassmo"], "Fosse writes in Nynorsk – drama, novels and poetry."]
],
 workGen(), epochGen()
);

U("Språkhistorie og målstrid", "Language history and the language conflict",
`## Hva handler det om?
Hvorfor har Norge to skriftspråk, bokmål og nynorsk? Svaret ligger i historien: Norge var i union med Danmark i over 400 år, og etter 1814 måtte nordmennene finne ut hvordan et norsk skriftspråk skulle se ut.

## Begreper og formler
- **Urnordisk og norrønt**: de eldste runeinnskriftene er fra ca. 200 e.Kr. Norrønt var skriftspråket i middelalderen.
- **Dansketiden**: etter svartedauden og unionen med Danmark ble **dansk** skriftspråket i Norge. Bibelen kom på dansk i 1550.
- **Ivar Aasen** samlet dialekter og laget **landsmålet** (i dag nynorsk). Grammatikken kom i 1848.
- **Knud Knudsen** ville fornorske dansken gradvis – grunnlaget for **riksmålet** (i dag bokmål).
- **1885**: Stortinget likestilte landsmålet med det danske skriftspråket.
- **1929**: navnene **bokmål** og **nynorsk** ble innført.
- **Samnorsk**: målet om å slå sammen de to språkene (reformen i 1938). Politikken ble offisielt oppgitt i 2002.
- **Språklova** (2021): norsk er hovedspråket, og bokmål og nynorsk er likestilte. Samisk og nasjonale minoritetsspråk er også vernet.
- **Sidemål**: det skriftspråket du ikke har som hovedmål.

### Eksempel
«Eg skriv» er nynorsk, «jeg skriver» er bokmål. Begge er korrekt norsk, og offentlige organer skal bruke begge.

> Huskeregel: **Aasen bygde nytt** fra dialektene, **Knudsen bygde om** dansken.`,
`## What is it about?
Why does Norway have two written standards, Bokmål and Nynorsk? The answer is historical: Norway was in union with Denmark for over 400 years, and after 1814 Norwegians had to work out what a Norwegian written language should look like.

## Concepts and formulas
- **Proto-Norse and Old Norse**: the oldest runic inscriptions date from c. AD 200. Old Norse was the written language of the Middle Ages.
- **The Danish period**: after the Black Death and the union with Denmark, **Danish** became the written language in Norway. The Bible appeared in Danish in 1550.
- **Ivar Aasen** collected dialects and created **Landsmål** (today Nynorsk). His grammar came out in 1848.
- **Knud Knudsen** wanted to Norwegianise Danish gradually – the basis of **Riksmål** (today Bokmål).
- **1885**: the Storting gave Landsmål equal status with the Danish-based written language.
- **1929**: the names **Bokmål** and **Nynorsk** were introduced.
- **Samnorsk**: the aim of merging the two (the 1938 reform). The policy was officially abandoned in 2002.
- **The Language Act** (2021): Norwegian is the main language, with Bokmål and Nynorsk equal. Sami and national minority languages are also protected.
- **Sidemål**: the written standard that is not your main one.

### Example
'Eg skriv' is Nynorsk, 'jeg skriver' is Bokmål. Both are correct Norwegian, and public bodies must use both.

> Rule of thumb: **Aasen built new** from the dialects, **Knudsen rebuilt** Danish.`,
[
 ["Hvorfor ble dansk skriftspråket i Norge?", ["Unionen med Danmark og nedgangen etter svartedauden", "Fordi dansk var lettere å lære", "Fordi Stortinget vedtok det i 1814", "Fordi runene forsvant av seg selv"], "Norrønt skriftspråk forfalt, og makten og administrasjonen lå i København.", "Why did Danish become the written language in Norway?", ["The union with Denmark and the decline after the Black Death", "Because Danish was easier to learn", "Because the Storting decided so in 1814", "Because runes vanished by themselves"], "Old Norse writing declined, and power and administration were in Copenhagen."],
 ["Hvem laget landsmålet (nynorsk)?", ["Ivar Aasen", "Knud Knudsen", "Henrik Wergeland", "Snorre Sturlason"], "Aasen reiste rundt og samlet dialekter, og ga ut grammatikk (1848) og ordbok (1850).", "Who created Landsmål (Nynorsk)?", ["Ivar Aasen", "Knud Knudsen", "Henrik Wergeland", "Snorri Sturluson"], "Aasen travelled collecting dialects and published a grammar (1848) and dictionary (1850)."],
 ["Hva skjedde i 1885?", ["Landsmålet ble likestilt med det danske skriftspråket", "Bokmål fikk navnet sitt", "Norge fikk sin første rettskrivning", "Samnorsk ble innført"], "Jamstillingsvedtaket i 1885 er grunnlaget for at vi har to likestilte skriftspråk.", "What happened in 1885?", ["Landsmål was given equal status with the Danish-based language", "Bokmål got its name", "Norway got its first spelling rules", "Samnorsk was introduced"], "The equality resolution of 1885 is why we have two equal written standards."],
 ["Når fikk bokmål og nynorsk navnene sine?", ["1929", "1814", "1885", "2005"], "Før het de riksmål og landsmål.", "When did Bokmål and Nynorsk get their names?", ["1929", "1814", "1885", "2005"], "Before that they were called Riksmål and Landsmål."],
 ["Hva var samnorsk?", ["Et mål om å slå sammen bokmål og nynorsk til ett språk", "En dialekt fra Trøndelag", "Samisk skriftspråk", "Det norrøne skriftspråket"], "Samnorskpolitikken preget reformene i 1917 og 1938, men ble oppgitt i 2002.", "What was Samnorsk?", ["An aim to merge Bokmål and Nynorsk into one language", "A dialect from Trøndelag", "Written Sami", "The Old Norse written language"], "Samnorsk policy shaped the 1917 and 1938 reforms but was abandoned in 2002."],
 ["Hva sier språklova fra 2021?", ["Bokmål og nynorsk er likestilte, og samisk og minoritetsspråk er vernet", "Nynorsk skal fases ut", "Bare bokmål kan brukes i staten", "Dialekter er forbudt i skolen"], "Loven samler språkpolitikken i én lov og slår fast at norsk er hovedspråket i Norge.", "What does the 2021 Language Act say?", ["Bokmål and Nynorsk are equal, and Sami and minority languages are protected", "Nynorsk is to be phased out", "Only Bokmål may be used by the state", "Dialects are banned in schools"], "The Act gathers language policy in one law and states that Norwegian is the main language of Norway."]
]);

U("Sjangre og virkemidler", "Genres and literary devices",
`## Hva handler det om?
Å analysere en tekst handler om å se **hva** forfatteren gjør, og **hvorfor**. Først finner du sjangeren, så ser du på virkemidlene og hvilken virkning de har.

## Begreper og formler
- **Epikk**: fortellende tekster – roman, novelle, eventyr, saga.
- **Lyrikk**: dikt og sangtekster, ofte med rytme, rim og bilder.
- **Dramatikk**: tekster skrevet for scenen, med replikker og sceneanvisninger.
- **Metafor**: et bilde uten «som» – «Livet er en reise».
- **Sammenligning**: et bilde med «som» eller «lik» – «Sterk som en bjørn».
- **Besjeling (personifikasjon)**: noe ikke-levende får menneskelige egenskaper – «Vinden hvisket».
- **Allitterasjon**: ord som begynner med samme lyd – «Sakte sank solen».
- **Gjentakelse** og **kontrast** skaper rytme og spenning.
- **Synsvinkel**: hvem som ser og forteller – førstepersons- eller tredjepersonsforteller.

### Eksempel
I «Hun var en stengt dør» er bildet en metafor. Virkningen er at leseren forstår at hun er utilgjengelig, uten at det sies rett ut.

> Huskeregel: Nevn virkemidlet, gi et eksempel fra teksten, og forklar virkningen.`,
`## What is it about?
Analysing a text means seeing **what** the writer does, and **why**. First find the genre, then look at the devices and their effect.

## Concepts and formulas
- **Epic (narrative)**: storytelling texts – novel, short story, fairy tale, saga.
- **Lyric**: poems and song lyrics, often with rhythm, rhyme and images.
- **Drama**: texts written for the stage, with lines and stage directions.
- **Metaphor**: an image without 'like' – 'Life is a journey'.
- **Simile**: an image with 'like' or 'as' – 'Strong as a bear'.
- **Personification**: something non-living gets human qualities – 'The wind whispered'.
- **Alliteration**: words starting with the same sound – 'Slowly sank the sun'.
- **Repetition** and **contrast** create rhythm and tension.
- **Point of view**: who sees and tells – first-person or third-person narrator.

### Example
In 'She was a closed door' the image is a metaphor. The effect is that the reader understands she is unapproachable, without it being said outright.

> Rule of thumb: Name the device, give an example from the text, and explain its effect.`,
[
 ["Hva er en metafor?", ["Et språklig bilde uten «som»", "Et bilde med «som»", "Ord som begynner med samme lyd", "Et rim på slutten av linjene"], "«Livet er en reise» – livet sammenlignes med en reise uten at «som» brukes.", "What is a metaphor?", ["An image without 'like'", "An image with 'like'", "Words starting with the same sound", "A rhyme at the end of lines"], "'Life is a journey' – life is compared with a journey without using 'like'."],
 ["«Trærne sukket i stormen.» Hvilket virkemiddel er dette?", ["Besjeling", "Allitterasjon", "Sammenligning", "Kontrast"], "Trær kan ikke sukke – de får en menneskelig egenskap.", "'The trees sighed in the storm.' Which device is this?", ["Personification", "Alliteration", "Simile", "Contrast"], "Trees can't sigh – they get a human quality."],
 ["Hvilken sjanger hører novellen til?", ["Epikk", "Lyrikk", "Dramatikk", "Sakprosa"], "Novellen er en kort, fortellende tekst.", "Which genre does the short story belong to?", ["Epic (narrative)", "Lyric", "Drama", "Non-fiction"], "A short story is a short narrative text."],
 ["Hva er typisk for en novelle?", ["Kort tekst med få personer og ofte en brå start og et vendepunkt", "Lang tekst med mange sidehandlinger", "Skrevet på vers", "Skrevet for scenen"], "Novellen konsentrerer seg om en kort hendelse eller et øyeblikk.", "What is typical of a short story?", ["A short text with few characters, often an abrupt start and a turning point", "A long text with many subplots", "Written in verse", "Written for the stage"], "The short story focuses on a brief event or moment."],
 ["Hva betyr det at en tekst har en førstepersonsforteller?", ["Fortelleren er en person i historien og sier «jeg»", "Fortelleren vet alt om alle", "Teksten er skrevet for scenen", "Teksten har ingen forteller"], "Leseren ser alt gjennom «jeg»-personens øyne og vet bare det hen vet.", "What does it mean that a text has a first-person narrator?", ["The narrator is a character in the story who says 'I'", "The narrator knows everything about everyone", "The text is written for the stage", "The text has no narrator"], "The reader sees everything through the 'I' and only knows what they know."]
]);

U("Retorikk og argumentasjon", "Rhetoric and argumentation",
`## Hva handler det om?
Retorikk er læren om hvordan vi overbeviser. Den går tilbake til Aristoteles, men brukes hver dag – i reklame, debatter, taler og på sosiale medier.

## Begreper og formler
- **Etos**: avsenderens troverdighet – kunnskap, erfaring og hvordan hen framstår.
- **Patos**: appell til følelser – bilder, historier og sterke ord.
- **Logos**: appell til fornuften – fakta, tall og logiske resonnementer.
- **Kairos**: det rette øyeblikket og den rette formen for situasjonen.
- **Den retoriske situasjonen**: avsender, mottaker, sak, situasjon og medium.
- **Argumentasjonsfeil**: personangrep (å angripe personen i stedet for saken), stråmann (å angripe en forvrengt versjon), falskt dilemma (bare to valg) og glidebane (ett skritt fører «uunngåelig» til katastrofe).
- **Drøfting**: å se en sak fra flere sider, veie argumentene mot hverandre og trekke en begrunnet konklusjon.

### Eksempel
En reklame for joggesko viser en kjent løper (etos), en jublende målgang (patos) og at skoen er 20 % lettere (logos).

> Huskeregel: **E**tos = **e**gen troverdighet, **P**atos = **p**åvirke følelser, **L**ogos = **l**ogikk.`,
`## What is it about?
Rhetoric is the study of how we persuade. It goes back to Aristotle but is used every day – in adverts, debates, speeches and on social media.

## Concepts and formulas
- **Ethos**: the speaker's credibility – knowledge, experience and how they come across.
- **Pathos**: appeal to emotion – images, stories and strong words.
- **Logos**: appeal to reason – facts, figures and logical reasoning.
- **Kairos**: the right moment and the right form for the situation.
- **The rhetorical situation**: sender, audience, issue, situation and medium.
- **Fallacies**: ad hominem (attacking the person instead of the issue), straw man (attacking a distorted version), false dilemma (only two choices) and slippery slope (one step 'inevitably' leads to disaster).
- **Discussion**: looking at an issue from several sides, weighing the arguments and reaching a reasoned conclusion.

### Example
A running-shoe advert shows a famous runner (ethos), a cheering finish (pathos) and that the shoe is 20% lighter (logos).

> Rule of thumb: **E**thos = **e**stablished credibility, **P**athos = **p**ersuading feelings, **L**ogos = **l**ogic.`,
[
 ["«Som lege i 20 år kan jeg si at dette virker.» Hvilken appellform brukes?", ["Etos", "Patos", "Logos", "Kairos"], "Taleren bygger troverdighet på sin egen erfaring og fagkunnskap.", "'As a doctor for 20 years I can say this works.' Which appeal is used?", ["Ethos", "Pathos", "Logos", "Kairos"], "The speaker builds credibility on their own experience and expertise."],
 ["Hva er patos?", ["Appell til følelser", "Appell til fornuften", "Avsenderens troverdighet", "Det rette tidspunktet"], "Patos vekker følelser som medfølelse, frykt, sinne eller glede.", "What is pathos?", ["Appeal to emotion", "Appeal to reason", "The speaker's credibility", "The right moment"], "Pathos stirs feelings such as compassion, fear, anger or joy."],
 ["«Så du mener at vi bare skal forby alle biler?» Hvilken argumentasjonsfeil kan dette være?", ["Stråmann", "Personangrep", "Logos", "Etos"], "Motstanderens syn forvrenges til noe ekstremt som er lett å angripe.", "'So you think we should just ban all cars?' Which fallacy might this be?", ["Straw man", "Ad hominem", "Logos", "Ethos"], "The opponent's view is distorted into something extreme that is easy to attack."],
 ["Hva betyr det å drøfte en sak?", ["Å se saken fra flere sider og komme fram til en begrunnet konklusjon", "Å bare argumentere for sitt eget syn", "Å referere hva andre har sagt", "Å beskrive saken uten å vurdere"], "En god drøfting tar motargumentene på alvor.", "What does it mean to discuss an issue?", ["To look at it from several sides and reach a reasoned conclusion", "To argue only for your own view", "To report what others have said", "To describe without evaluating"], "A good discussion takes the counter-arguments seriously."],
 ["Hva er kairos?", ["Det rette øyeblikket og den rette formen for situasjonen", "En type metafor", "Avsenderens troverdighet", "En argumentasjonsfeil"], "En god tale til et bryllup og en god tale i en minnestund krever ulike valg.", "What is kairos?", ["The right moment and form for the situation", "A kind of metaphor", "The speaker's credibility", "A fallacy"], "A good wedding speech and a good memorial speech require different choices."]
]);
})();
