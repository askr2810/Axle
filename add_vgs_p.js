// ============================================================
//  add_vgs_p.js – Religion og etikk (Vg3 fellesfag, LK20). KRLE heter Religion og etikk på videregående.
// ============================================================
NEWCOURSE({ code: "VGREL", study: "vgs", group: "VGS: fellesfag", nb: "Religion og etikk", en: "Religion and Ethics", s: ["RE", "RE"], eqText: VG_EQ("Vg3 fellesfag (LK20)", "Year 13 core subject (Norwegian curriculum)"), units: [] });
(() => {
const U = (nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT("VGREL", nb, en); THEORY("VGREL", u, { nb: thNb, en: thEn }); BIQ("VGREL", u, qs); if(gens.length) GEN("VGREL", u, ...gens); return u; };
const REL = { kr: ["Kristendom", "Christianity"], is: ["Islam", "Islam"], jo: ["Jødedom", "Judaism"], hi: ["Hinduisme", "Hinduism"], bu: ["Buddhisme", "Buddhism"], hu: ["Humanisme", "Humanism"] };
// [begrep nb, begrep en, religion]
const TERMS = [
 ["Treenigheten", "The Trinity", "kr"], ["Nattverd", "Holy Communion", "kr"], ["Påske", "Easter", "kr"], ["Bibelen", "The Bible", "kr"], ["Bergprekenen", "The Sermon on the Mount", "kr"],
 ["De fem søylene", "The Five Pillars", "is"], ["Ramadan", "Ramadan", "is"], ["Koranen", "The Quran", "is"], ["Hajj", "Hajj", "is"], ["Moské", "Mosque", "is"],
 ["Sabbat", "Sabbath", "jo"], ["Torah", "Torah", "jo"], ["Synagoge", "Synagogue", "jo"], ["Bar mitzva", "Bar mitzvah", "jo"], ["Pesach", "Passover", "jo"],
 ["Karma", "Karma", "hi"], ["Vedaene", "The Vedas", "hi"], ["Atman", "Atman", "hi"], ["Kastesystemet", "The caste system", "hi"], ["Diwali", "Diwali", "hi"],
 ["De fire edle sannheter", "The Four Noble Truths", "bu"], ["Den åttedelte veien", "The Noble Eightfold Path", "bu"], ["Nirvana", "Nirvana", "bu"], ["Siddhartha Gautama", "Siddhartha Gautama", "bu"], ["Theravada", "Theravada", "bu"],
 ["Human-Etisk Forbund", "The Norwegian Humanist Association", "hu"], ["Borgerlig konfirmasjon", "Civil confirmation", "hu"]
];
const termGen = keys => () => { const pool = TERMS.filter(x => keys.includes(x[2])), t = R.p(pool), others = Object.keys(REL).filter(k => k !== t[2]).sort(() => Math.random() - 0.5).slice(0, 3);
  return [T(`Hvilken religion eller hvilket livssyn hører «${t[0]}» til?`, `Which religion or worldview does "${t[1]}" belong to?`), [T(...REL[t[2]]), ...others.map(k => T(...REL[k]))], T(`«${t[0]}» hører til ${REL[t[2]][0].toLowerCase()}.`, `"${t[1]}" belongs to ${REL[t[2]][1]}.`)]; };

U("Religion i Norge og verden", "Religion in Norway and the world",
`## Hva handler det om?
Religion og etikk handler om hvordan mennesker tolker livet: tro, livssyn, verdier og hva som er rett og galt. Faget ser på religionene både **innenfra** (hva de troende selv sier) og **utenfra** (som forskere).

## Begreper og formler
- **Religionens dimensjoner** (etter Ninian Smart): lære, fortellinger, ritualer, etikk, erfaring, fellesskap og det materielle (bygninger, kunst).
- **Religionsfrihet**: alle har rett til å tro, bytte eller ikke ha en religion. Den står i Grunnloven og i menneskerettighetene.
- **Den norske kirke** er den største trossamfunnet i Norge. Statskirkeordningen ble i hovedsak avviklet i 2012 og 2017.
- **Sekularisering**: religion får mindre plass i samfunnet og i folks liv.
- **Pluralisme**: mange religioner og livssyn lever side om side.
- De største religionene i verden er kristendom (om lag 2,4 milliarder) og islam (om lag 1,9 milliarder).

### Eksempel
En konfirmasjon kan studeres som ritual (hva skjer?), som fellesskap (hvem deltar?) og som erfaring (hva betyr det for den som konfirmeres?).

> Se religion både innenfra og utenfra.`,
`## What is it about?
Religion and ethics is about how people interpret life: faith, worldviews, values and what is right and wrong. The subject studies religions both **from the inside** (what believers say) and **from the outside** (as researchers).

## Concepts and formulas
- **Dimensions of religion** (after Ninian Smart): doctrine, narrative, ritual, ethics, experience, community and the material (buildings, art).
- **Freedom of religion**: everyone has the right to believe, change or have no religion. It is in the Constitution and in human rights law.
- **The Church of Norway** is the largest faith community in Norway. The state church arrangement was mostly dismantled in 2012 and 2017.
- **Secularisation**: religion gets less room in society and in people's lives.
- **Pluralism**: many religions and worldviews living side by side.
- The largest religions in the world are Christianity (about 2.4 billion) and Islam (about 1.9 billion).

### Example
A confirmation can be studied as ritual (what happens?), as community (who takes part?) and as experience (what does it mean to the person being confirmed?).

> Look at religion both from the inside and the outside.`,
[
 ["Hva betyr sekularisering?", ["At religion får mindre plass i samfunnet", "At religioner blandes", "At staten får ny religion", "At flere blir religiøse"], "Mindre religiøs innflytelse over tid.", "What does secularisation mean?", ["Religion getting less room in society", "Religions mixing", "The state getting a new religion", "More people becoming religious"], "Less religious influence over time."],
 ["Hva er verdens største religion?", ["Kristendom", "Islam", "Hinduisme", "Buddhisme"], "Om lag 2,4 milliarder tilhengere.", "What is the world's largest religion?", ["Christianity", "Islam", "Hinduism", "Buddhism"], "About 2.4 billion followers."],
 ["Hva betyr religionsfrihet?", ["Retten til å tro, bytte eller ikke ha religion", "At alle må ha en religion", "At staten velger religion for deg", "At religion er forbudt"], "Beskyttet i Grunnloven og menneskerettighetene.", "What does freedom of religion mean?", ["The right to believe, change or have no religion", "That everyone must have a religion", "That the state chooses your religion", "That religion is banned"], "Protected by the Constitution and human rights."],
 ["Hva vil det si å studere religion «innenfra»?", ["Å se på hva de troende selv mener og opplever", "Å gå inn i en kirke", "Å være kritisk", "Å telle medlemmer"], "Utenfra er forskerens perspektiv.", "What does it mean to study religion \"from the inside\"?", ["To look at what believers themselves think and experience", "To go into a church", "To be critical", "To count members"], "From the outside is the researcher's perspective."],
 ["Hva er pluralisme?", ["At mange religioner og livssyn lever side om side", "At én religion dominerer", "At ingen har religion", "Et politisk parti"], "Norge er et pluralistisk samfunn.", "What is pluralism?", ["Many religions and worldviews living side by side", "One religion dominating", "Nobody having a religion", "A political party"], "Norway is a pluralist society."]
],
 termGen(Object.keys(REL))
);

U("Kristendom", "Christianity",
`## Hva handler det om?
Kristendommen bygger på troen på at Jesus fra Nasaret er Guds sønn, som døde og sto opp igjen. Den er verdens største religion og har preget norsk kultur i tusen år.

## Begreper og formler
- **Treenigheten**: én Gud i tre personer: Far, Sønn og Hellig Ånd.
- **Bibelen**: Det gamle testamente (deles med jødedommen) og Det nye testamente (evangeliene, brevene).
- **Hovedretninger**: **katolsk** (paven i Roma, sju sakramenter), **ortodoks** (særlig i Øst-Europa) og **protestantisk** (fra reformasjonen i 1517, blant annet luthersk). Skillet mellom øst og vest kom i 1054.
- **Sakramenter** i den lutherske kirken: **dåp og nattverd**.
- **Høytider**: jul (Jesu fødsel), påske (død og oppstandelse), pinse (Den hellige ånd).
- **Nestekjærlighet** og **Den gylne regel**: «Alt dere vil at andre skal gjøre mot dere, skal dere gjøre mot dem.»

### Eksempel
Påsken er den viktigste kristne høytiden fordi oppstandelsen er kjernen i troen: døden er overvunnet.

> Én Gud i tre personer, og Jesus som frelser.`,
`## What is it about?
Christianity is based on the belief that Jesus of Nazareth is the Son of God, who died and rose again. It is the world's largest religion and has shaped Norwegian culture for a thousand years.

## Concepts and formulas
- **The Trinity**: one God in three persons: Father, Son and Holy Spirit.
- **The Bible**: the Old Testament (shared with Judaism) and the New Testament (the Gospels, the letters).
- **Main branches**: **Catholic** (the Pope in Rome, seven sacraments), **Orthodox** (especially in Eastern Europe) and **Protestant** (from the Reformation in 1517, including Lutheran). The split between East and West came in 1054.
- **Sacraments** in the Lutheran church: **baptism and Holy Communion**.
- **Festivals**: Christmas (the birth of Jesus), Easter (death and resurrection), Pentecost (the Holy Spirit).
- **Love of neighbour** and **the Golden Rule**: "Do to others what you would have them do to you."

### Example
Easter is the most important Christian festival because the resurrection is the core of the faith: death has been overcome.

> One God in three persons, and Jesus as saviour.`,
[
 ["Hva er treenigheten?", ["Én Gud i tre personer: Far, Sønn og Hellig Ånd", "Tre ulike guder", "Tre kirker", "Tre høytider"], "Sentral lære i kristendommen.", "What is the Trinity?", ["One God in three persons: Father, Son and Holy Spirit", "Three different gods", "Three churches", "Three festivals"], "A central Christian doctrine."],
 ["Hvor mange sakramenter har den lutherske kirken?", { n: 2, tol: 0, u: "" }, "2: dåp og nattverd. Den katolske har 7.", "How many sacraments does the Lutheran church have?", null, "2: baptism and Holy Communion. The Catholic church has 7."],
 ["Hva feires i påsken?", ["Jesu død og oppstandelse", "Jesu fødsel", "Den hellige ånd", "Moses og utgangen fra Egypt"], "Den viktigste kristne høytiden.", "What is celebrated at Easter?", ["Jesus' death and resurrection", "Jesus' birth", "The Holy Spirit", "Moses and the Exodus"], "The most important Christian festival."],
 ["Hvilken retning ledes av paven?", ["Den katolske kirke", "Den ortodokse kirke", "Den lutherske kirke", "Pinsebevegelsen"], "Paven sitter i Vatikanet i Roma.", "Which branch is led by the Pope?", ["The Catholic Church", "The Orthodox Church", "The Lutheran Church", "The Pentecostal movement"], "The Pope sits in the Vatican in Rome."],
 ["Hvilken del av Bibelen deler kristne med jøder?", ["Det gamle testamente", "Det nye testamente", "Evangeliene", "Paulus' brev"], "Den hebraiske bibelen.", "Which part of the Bible do Christians share with Jews?", ["The Old Testament", "The New Testament", "The Gospels", "Paul's letters"], "The Hebrew Bible."],
 ["Når ble kirken splittet mellom øst og vest?", { n: 1054, tol: 0, u: "" }, "Skismaet i 1054 skilte ortodokse og katolikker.", "When did the church split between East and West?", null, "The schism of 1054 separated Orthodox and Catholics."]
],
 termGen(["kr", "is", "jo"])
);

U("Islam", "Islam",
`## Hva handler det om?
Islam betyr «underkastelse» under Gud (Allah). Muslimer tror at profeten Muhammad fikk Guds åpenbaring, som er samlet i **Koranen**. Islam er verdens nest største religion.

## Begreper og formler
- **Tawhid**: troen på én Gud. Muhammad (om lag 570–632) regnes som den siste profeten.
- **De fem søylene**: trosbekjennelsen (**shahada**), bønn fem ganger om dagen (**salah**), allmisse (**zakat**), faste i ramadan (**sawm**) og pilegrimsreisen til Mekka (**hajj**) minst én gang i livet for dem som kan.
- **Koranen** er Guds ord på arabisk. **Sunna** og **hadith** er fortellinger om hva Muhammad sa og gjorde.
- **Hovedretninger**: **sunni** (om lag 85–90 %) og **sjia**. Skillet handlet opprinnelig om hvem som skulle lede etter Muhammad.
- **Hijra** (622): utvandringen fra Mekka til Medina. Den islamske kalenderen starter der.
- **Id al-fitr** feirer slutten på ramadan.

### Eksempel
Under ramadan faster muslimer fra soloppgang til solnedgang i en måned. Fasten skal gi selvdisiplin og medfølelse med dem som sulter.

> Fem søyler: shahada, salah, zakat, sawm og hajj.`,
`## What is it about?
Islam means "submission" to God (Allah). Muslims believe the Prophet Muhammad received God's revelation, collected in the **Quran**. Islam is the world's second largest religion.

## Concepts and formulas
- **Tawhid**: belief in one God. Muhammad (about 570–632) is regarded as the last prophet.
- **The Five Pillars**: the declaration of faith (**shahada**), prayer five times a day (**salah**), almsgiving (**zakat**), fasting in Ramadan (**sawm**) and the pilgrimage to Mecca (**hajj**) at least once in a lifetime for those who can.
- **The Quran** is God's word in Arabic. **Sunna** and **hadith** are accounts of what Muhammad said and did.
- **Main branches**: **Sunni** (about 85–90 %) and **Shia**. The split originally concerned who should lead after Muhammad.
- **Hijra** (622): the migration from Mecca to Medina. The Islamic calendar starts there.
- **Eid al-Fitr** celebrates the end of Ramadan.

### Example
During Ramadan, Muslims fast from sunrise to sunset for a month. The fast is meant to build self-discipline and compassion with those who go hungry.

> Five pillars: shahada, salah, zakat, sawm and hajj.`,
[
 ["Hvor mange søyler har islam?", { n: 5, tol: 0, u: "" }, "5: shahada, salah, zakat, sawm og hajj.", "How many pillars does Islam have?", null, "5: shahada, salah, zakat, sawm and hajj."],
 ["Hvor mange ganger om dagen skal muslimer be?", { n: 5, tol: 0, u: "" }, "Salah: 5 ganger om dagen.", "How many times a day should Muslims pray?", null, "Salah: 5 times a day."],
 ["Hva er hajj?", ["Pilegrimsreisen til Mekka", "Fasten i ramadan", "Fredagsbønnen", "Allmissen"], "Minst én gang i livet for dem som har mulighet.", "What is hajj?", ["The pilgrimage to Mecca", "The fast of Ramadan", "Friday prayers", "Almsgiving"], "At least once in a lifetime for those able."],
 ["Hvilken retning er størst i islam?", ["Sunni", "Sjia", "Sufi", "Ahmadiyya"], "Om lag 85–90 % av muslimene.", "Which branch of Islam is largest?", ["Sunni", "Shia", "Sufi", "Ahmadiyya"], "About 85–90 % of Muslims."],
 ["Hva markerer året 622 i islam?", ["Hijra, utvandringen til Medina", "Muhammads fødsel", "Koranen ble skrevet ned", "Byggingen av Kaba"], "Den islamske kalenderen starter der.", "What does the year 622 mark in Islam?", ["The Hijra, the migration to Medina", "Muhammad's birth", "The writing down of the Quran", "The building of the Kaaba"], "The Islamic calendar starts there."],
 ["Hva feirer id al-fitr?", ["Slutten på ramadan", "Muhammads fødsel", "Starten på hajj", "Nyttår"], "En stor fest etter fasten.", "What does Eid al-Fitr celebrate?", ["The end of Ramadan", "Muhammad's birth", "The start of hajj", "New Year"], "A big feast after the fast."]
],
 termGen(["kr", "is", "jo", "hi"])
);

U("Jødedom", "Judaism",
`## Hva handler det om?
Jødedommen er den eldste av de abrahamittiske religionene. Den bygger på pakten mellom Gud og det jødiske folket, og på **Toraen**, de fem Mosebøkene.

## Begreper og formler
- **Tanakh**: den hebraiske bibelen: Toraen (loven), Neviim (profetene) og Ketuvim (skriftene).
- **Talmud**: tolkninger og diskusjoner av loven.
- **Sabbat**: hviledag fra fredag kveld til lørdag kveld.
- **Synagoge**: forsamlingshus for bønn og undervisning. **Rabbiner**: lærer og leder.
- **Kosher**: regler for hva som er tillatt å spise, for eksempel ikke svinekjøtt og ikke kjøtt og melk sammen.
- **Bar mitzva** (gutter, 13 år) og **bat mitzva** (jenter, 12 år): man blir religiøst myndig.
- **Høytider**: **pesach** (utgangen fra Egypt), **jom kippur** (forsoningsdagen) og **hanukka** (lysfesten).
- **Retninger**: ortodoks, konservativ og liberal (reform).

### Eksempel
Under pesach spiser jøder usyret brød (matzo) til minne om at israelittene måtte flykte fra Egypt så raskt at deigen ikke rakk å heve.

> Tora, sabbat og pakten med Gud.`,
`## What is it about?
Judaism is the oldest of the Abrahamic religions. It is built on the covenant between God and the Jewish people, and on the **Torah**, the five books of Moses.

## Concepts and formulas
- **Tanakh**: the Hebrew Bible: the Torah (law), Nevi'im (prophets) and Ketuvim (writings).
- **Talmud**: interpretations and discussions of the law.
- **Sabbath**: day of rest from Friday evening to Saturday evening.
- **Synagogue**: a house of prayer and teaching. **Rabbi**: teacher and leader.
- **Kosher**: rules for what may be eaten, for example no pork and no meat and milk together.
- **Bar mitzvah** (boys, 13) and **bat mitzvah** (girls, 12): coming of religious age.
- **Festivals**: **Passover** (the Exodus from Egypt), **Yom Kippur** (the Day of Atonement) and **Hanukkah** (the festival of lights).
- **Branches**: Orthodox, Conservative and Liberal (Reform).

### Example
At Passover Jews eat unleavened bread (matzo) in memory of the Israelites having to flee Egypt so fast that the dough had no time to rise.

> Torah, Sabbath and the covenant with God.`,
[
 ["Når er sabbaten?", ["Fra fredag kveld til lørdag kveld", "Hele søndagen", "Fredag hele dagen", "Mandag"], "Hviledagen i jødedommen.", "When is the Sabbath?", ["From Friday evening to Saturday evening", "All of Sunday", "All of Friday", "Monday"], "The day of rest in Judaism."],
 ["Hva er Toraen?", ["De fem Mosebøkene", "Hele Det nye testamente", "En bønnebok", "En synagoge"], "Den viktigste delen av Tanakh.", "What is the Torah?", ["The five books of Moses", "The whole New Testament", "A prayer book", "A synagogue"], "The most important part of the Tanakh."],
 ["Hvor gammel er en gutt ved bar mitzva?", { n: 13, tol: 0, u: "år" }, "13 år (jenter har bat mitzva ved 12).", "How old is a boy at his bar mitzvah?", null, "13 (girls have bat mitzvah at 12)."],
 ["Hva minnes jødene under pesach?", ["Utgangen fra Egypt", "Jesu oppstandelse", "Skapelsen", "Tempelets innvielse"], "Israelittene ble befridd fra slaveriet.", "What do Jews remember at Passover?", ["The Exodus from Egypt", "The resurrection of Jesus", "The creation", "The dedication of the Temple"], "The Israelites were freed from slavery."],
 ["Hva betyr kosher?", ["Mat som er tillatt etter jødiske regler", "En type bønn", "En høytid", "Et hellig sted"], "For eksempel ikke svin, og ikke kjøtt og melk sammen.", "What does kosher mean?", ["Food permitted under Jewish law", "A type of prayer", "A festival", "A holy place"], "For example no pork, and no meat and milk together."]
],
 termGen(["kr", "is", "jo"])
);

U("Hinduisme og buddhisme", "Hinduism and Buddhism",
`## Hva handler det om?
Hinduisme og buddhisme oppsto i India. Begge ser livet som et kretsløp av gjenfødsler, og målet er å bli fri fra det.

## Begreper og formler
- **Samsara**: kretsløpet av fødsel, død og gjenfødsel.
- **Karma**: handlingene dine får følger for hvordan du blir født igjen.
- **Hinduisme**: **Brahman** er den altomfattende guddommelige kraften, og **atman** er sjelen. Mange guder, blant annet Brahma, Vishnu og Shiva. Målet er **moksha**, frigjøring. Hellige skrifter: **Vedaene** og Bhagavadgita.
- **Buddhisme**: grunnlagt av **Siddhartha Gautama**, Buddha («den oppvåknede»), om lag 500 år før vår tidsregning.
- **De fire edle sannheter**: livet innebærer lidelse, lidelsen skyldes begjær, lidelsen kan opphøre, og veien dit er **Den edle åttedelte veien**.
- **Nirvana**: tilstanden der begjær og lidelse er slukket.
- **Retninger** i buddhismen: **theravada** og **mahayana** (blant annet tibetansk og zen).

### Eksempel
En buddhist mediterer for å se tankene og følelsene sine uten å klamre seg til dem. Det er en del av den åttedelte veien.

> Samsara, karma og veien til frigjøring.`,
`## What is it about?
Hinduism and Buddhism arose in India. Both see life as a cycle of rebirths, and the goal is to become free of it.

## Concepts and formulas
- **Samsara**: the cycle of birth, death and rebirth.
- **Karma**: your actions have consequences for how you are reborn.
- **Hinduism**: **Brahman** is the all-embracing divine power, and **atman** is the soul. Many gods, among them Brahma, Vishnu and Shiva. The goal is **moksha**, liberation. Sacred texts: **the Vedas** and the Bhagavad Gita.
- **Buddhism**: founded by **Siddhartha Gautama**, the Buddha ("the awakened one"), about 500 years before the common era.
- **The Four Noble Truths**: life involves suffering, suffering is caused by craving, suffering can end, and the way there is **the Noble Eightfold Path**.
- **Nirvana**: the state in which craving and suffering are extinguished.
- **Branches** of Buddhism: **Theravada** and **Mahayana** (including Tibetan and Zen).

### Example
A Buddhist meditates to observe thoughts and feelings without clinging to them. This is part of the Eightfold Path.

> Samsara, karma and the path to liberation.`,
[
 ["Hva er samsara?", ["Kretsløpet av fødsel, død og gjenfødsel", "En hellig bok", "En type meditasjon", "Et tempel"], "Felles for hinduisme og buddhisme.", "What is samsara?", ["The cycle of birth, death and rebirth", "A holy book", "A type of meditation", "A temple"], "Shared by Hinduism and Buddhism."],
 ["Hvem grunnla buddhismen?", ["Siddhartha Gautama", "Krishna", "Muhammad", "Konfucius"], "Han ble kalt Buddha, «den oppvåknede».", "Who founded Buddhism?", ["Siddhartha Gautama", "Krishna", "Muhammad", "Confucius"], "He was called the Buddha, \"the awakened one\"."],
 ["Hvor mange edle sannheter er det i buddhismen?", { n: 4, tol: 0, u: "" }, "4: lidelse, årsak, opphør og veien.", "How many Noble Truths are there in Buddhism?", null, "4: suffering, cause, cessation and the path."],
 ["Hva er moksha i hinduismen?", ["Frigjøring fra gjenfødselens kretsløp", "Et hellig dyr", "En høytid", "En kaste"], "Målet for livet.", "What is moksha in Hinduism?", ["Liberation from the cycle of rebirth", "A sacred animal", "A festival", "A caste"], "The goal of life."],
 ["Hva betyr karma?", ["At handlingene dine får følger", "En type yoga", "En gud", "Et bønnested"], "Påvirker hvordan du blir født igjen.", "What does karma mean?", ["That your actions have consequences", "A type of yoga", "A god", "A place of prayer"], "It affects how you are reborn."],
 ["Hva er nirvana?", ["Tilstanden der begjær og lidelse er slukket", "Himmelen med Gud", "En hellig elv", "En munkeorden"], "Målet i buddhismen.", "What is nirvana?", ["The state in which craving and suffering are extinguished", "Heaven with God", "A holy river", "An order of monks"], "The goal in Buddhism."]
],
 termGen(["hi", "bu", "kr", "is"])
);

U("Livssyn og religionskritikk", "Worldviews and critique of religion",
`## Hva handler det om?
Ikke alle har en religion. Et **livssyn** er et helhetlig syn på livet, og kan være religiøst eller ikke-religiøst. Religionskritikk stiller spørsmål ved religionenes påstander og rolle i samfunnet.

## Begreper og formler
- **Sekulær humanisme**: livssyn uten gud, med vekt på fornuft, vitenskap og menneskeverd. **Human-Etisk Forbund** (grunnlagt 1956) tilbyr blant annet borgerlig konfirmasjon.
- **Ateisme**: troen på at det ikke finnes noen gud. **Agnostisisme**: at vi ikke kan vite om det finnes en gud.
- **Religionskritikk utenfra**: **Feuerbach** (Gud er et bilde av menneskets egne idealer), **Marx** (religion er «opium for folket» som demper protest mot urettferdighet) og **Freud** (religion som ønsketenkning).
- **Religionskritikk innenfra**: troende som kritiserer egen religion, for eksempel Luther.
- **Kritikk av religionskritikk**: mange troende mener vitenskap og tro svarer på ulike spørsmål.

### Eksempel
Marx mente at religion lovet lykke i livet etter døden, og at dette gjorde at arbeiderne godtok urettferdighet i dette livet.

> Livssyn kan være med eller uten gud.`,
`## What is it about?
Not everyone has a religion. A **worldview** is an overall view of life, and it can be religious or non-religious. Critique of religion questions religions' claims and their role in society.

## Concepts and formulas
- **Secular humanism**: a worldview without god, emphasising reason, science and human dignity. **The Norwegian Humanist Association** (founded 1956) offers, among other things, civil confirmation.
- **Atheism**: the belief that there is no god. **Agnosticism**: that we cannot know whether there is a god.
- **External critique of religion**: **Feuerbach** (God is a picture of humanity's own ideals), **Marx** (religion is "the opium of the people", dampening protest against injustice) and **Freud** (religion as wishful thinking).
- **Internal critique**: believers criticising their own religion, for example Luther.
- **Critique of the critique**: many believers hold that science and faith answer different questions.

### Example
Marx thought religion promised happiness after death, and that this made workers accept injustice in this life.

> Worldviews can be with or without god.`,
[
 ["Hva er forskjellen på ateisme og agnostisisme?", ["Ateisme: det finnes ingen gud. Agnostisisme: vi kan ikke vite", "Det er det samme", "Agnostikere tror på mange guder", "Ateister tror på én gud"], "Agnostikeren lar spørsmålet stå åpent.", "What is the difference between atheism and agnosticism?", ["Atheism: there is no god. Agnosticism: we cannot know", "They are the same", "Agnostics believe in many gods", "Atheists believe in one god"], "The agnostic leaves the question open."],
 ["Hvem kalte religion «opium for folket»?", ["Karl Marx", "Sigmund Freud", "Martin Luther", "Immanuel Kant"], "Religion demper protest mot urettferdighet, mente han.", "Who called religion \"the opium of the people\"?", ["Karl Marx", "Sigmund Freud", "Martin Luther", "Immanuel Kant"], "Religion dampens protest against injustice, he thought."],
 ["Når ble Human-Etisk Forbund grunnlagt?", { n: 1956, tol: 0, u: "" }, "I 1956.", "When was the Norwegian Humanist Association founded?", null, "In 1956."],
 ["Hva legger sekulær humanisme vekt på?", ["Fornuft, vitenskap og menneskeverd", "Bønn og faste", "Gjenfødsel", "Hellige skrifter"], "Et livssyn uten gud.", "What does secular humanism emphasise?", ["Reason, science and human dignity", "Prayer and fasting", "Rebirth", "Holy scriptures"], "A worldview without god."],
 ["Hva er religionskritikk innenfra?", ["Troende som kritiserer sin egen religion", "Kritikk fra ateister", "Kritikk fra staten", "Kritikk fra andre religioner"], "For eksempel Luther.", "What is internal critique of religion?", ["Believers criticising their own religion", "Criticism from atheists", "Criticism from the state", "Criticism from other religions"], "For example Luther."]
]);

const ETH = [
 [["Handlingen er riktig hvis den gir mest lykke for flest mulig", "The action is right if it gives the most happiness for the most people"], ["Konsekvensetikk (utilitarisme)", "Consequentialism (utilitarianism)"]],
 [["Du skal aldri lyve, uansett hva som skjer", "You must never lie, whatever happens"], ["Pliktetikk", "Duty ethics"]],
 [["Et godt menneske er modig, rettferdig og måteholdent", "A good person is brave, just and temperate"], ["Dydsetikk", "Virtue ethics"]],
 [["Det viktigste er at du mente det godt", "What matters most is that you meant well"], ["Sinnelagsetikk", "Ethics of intention"]],
 [["Behandle andre slik du selv vil bli behandlet", "Treat others as you want to be treated"], ["Den gylne regel", "The Golden Rule"]]
];
U("Etiske teorier", "Ethical theories",
`## Hva handler det om?
Etikk er refleksjon over hva som er rett og galt. De store etiske teoriene gir ulike svar på hva som gjør en handling god.

## Begreper og formler
- **Konsekvensetikk**: handlingen vurderes etter følgene. **Utilitarisme** (Bentham, Mill): gjør det som gir størst mulig lykke for flest mulig.
- **Pliktetikk**: noen handlinger er riktige eller gale i seg selv. **Kant**: handle bare etter regler du kan ville skal gjelde for alle (**det kategoriske imperativ**), og behandle aldri mennesker bare som midler.
- **Dydsetikk** (Aristoteles): spør «hvordan blir jeg et godt menneske?». Dydene er **den gylne middelvei**: mot ligger mellom feighet og overmot.
- **Sinnelagsetikk**: det viktigste er intensjonen bak handlingen.
- **Nestekjærlighetsetikk** og **Den gylne regel** finnes i mange religioner.
- **Etisk argumentasjon**: premisser (påstander og verdier) som leder til en konklusjon.

### Eksempel
En morder spør hvor vennen din gjemmer seg. En utilitarist vil lyve for å redde vennen. Kant mente at det er galt å lyve også her, fordi du ikke kan ønske at løgn skal bli en allmenn regel.

> Følger, plikter, karakter eller intensjon.`,
`## What is it about?
Ethics is reflection on what is right and wrong. The major ethical theories give different answers to what makes an action good.

## Concepts and formulas
- **Consequentialism**: the action is judged by its outcomes. **Utilitarianism** (Bentham, Mill): do what produces the greatest happiness for the greatest number.
- **Duty ethics**: some actions are right or wrong in themselves. **Kant**: act only on rules you could will to apply to everyone (**the categorical imperative**), and never treat people merely as means.
- **Virtue ethics** (Aristotle): asks "how do I become a good person?". The virtues are **the golden mean**: courage lies between cowardice and recklessness.
- **Ethics of intention**: what matters most is the intention behind the action.
- **The ethics of love of neighbour** and **the Golden Rule** are found in many religions.
- **Ethical argument**: premises (claims and values) leading to a conclusion.

### Example
A murderer asks where your friend is hiding. A utilitarian would lie to save the friend. Kant held that lying is wrong even here, because you cannot will lying to become a universal rule.

> Consequences, duties, character or intention.`,
[
 ["Hvilken teori sier at handlingen er riktig hvis den gir mest lykke for flest mulig?", ["Utilitarisme", "Pliktetikk", "Dydsetikk", "Sinnelagsetikk"], "Bentham og Mill.", "Which theory says an action is right if it gives the most happiness to the most people?", ["Utilitarianism", "Duty ethics", "Virtue ethics", "Ethics of intention"], "Bentham and Mill."],
 ["Hvem formulerte det kategoriske imperativ?", ["Immanuel Kant", "Aristoteles", "John Stuart Mill", "Sokrates"], "Handle bare etter regler du kan ville skal gjelde for alle.", "Who formulated the categorical imperative?", ["Immanuel Kant", "Aristotle", "John Stuart Mill", "Socrates"], "Act only on rules you could will to apply to everyone."],
 ["Hva er den gylne middelvei?", ["At dyden ligger mellom to ytterpunkter", "At man skal velge det billigste", "At man alltid skal følge flertallet", "En regel om å ikke lyve"], "Mot ligger mellom feighet og overmot (Aristoteles).", "What is the golden mean?", ["That virtue lies between two extremes", "Choosing the cheapest option", "Always following the majority", "A rule against lying"], "Courage lies between cowardice and recklessness (Aristotle)."],
 ["Hvilken teori spør «hvordan blir jeg et godt menneske?»", ["Dydsetikk", "Konsekvensetikk", "Pliktetikk", "Utilitarisme"], "Fokus på karakter.", "Which theory asks \"how do I become a good person?\"", ["Virtue ethics", "Consequentialism", "Duty ethics", "Utilitarianism"], "A focus on character."],
 ["Hva er et premiss i et etisk argument?", ["En påstand eller verdi som konklusjonen bygger på", "Selve konklusjonen", "En motstander", "Et spørsmål"], "Premisser → konklusjon.", "What is a premise in an ethical argument?", ["A claim or value the conclusion rests on", "The conclusion itself", "An opponent", "A question"], "Premises → conclusion."]
],
 () => { const e = R.p(ETH), rest = ETH.filter(x => x !== e).sort(() => Math.random() - 0.5).slice(0, 3);
   return [T(`«${e[0][0]}.» Hvilken etisk tenkemåte er dette?`, `"${e[0][1]}." Which ethical approach is this?`), [T(...e[1]), ...rest.map(x => T(...x[1]))], T(`Dette er ${e[1][0].toLowerCase()}.`, `This is ${e[1][1].toLowerCase()}.`)]; }
);

U("Filosofi", "Philosophy",
`## Hva handler det om?
Filosofi betyr «kjærlighet til visdom». Filosofer stiller grunnleggende spørsmål: Hva kan vi vite? Hva er virkelig? Har vi fri vilje? Hva er et godt liv?

## Begreper og formler
- **Sokrates** (om lag 470–399 f.Kr.): stilte spørsmål for å avsløre hva folk egentlig visste. «Jeg vet at jeg intet vet.»
- **Platon**: idélæren, der den virkelige verden er idéene. **Hulelignelsen**: menneskene ser bare skygger av virkeligheten.
- **Aristoteles**: observerte naturen og la grunnlaget for logikk og vitenskap.
- **Descartes**: tvilte på alt og kom fram til «Jeg tenker, altså er jeg».
- **Eksistensialisme** (Sartre): mennesket er «dømt til å være fritt» og må selv skape mening.
- **Fri vilje og determinisme**: er alt vi gjør bestemt på forhånd av årsaker, eller velger vi fritt?
- **Argumentasjon**: et gyldig argument har en konklusjon som følger logisk av premissene.

### Eksempel
I hulelignelsen sitter fanger lenket og ser bare skygger på en vegg. Den som slipper ut og ser sola, forstår virkeligheten, men blir ikke trodd når hen kommer tilbake.

> Filosofi begynner med undring.`,
`## What is it about?
Philosophy means "love of wisdom". Philosophers ask basic questions: What can we know? What is real? Do we have free will? What is a good life?

## Concepts and formulas
- **Socrates** (about 470–399 BCE): asked questions to expose what people really knew. "I know that I know nothing."
- **Plato**: the theory of Forms, where the true reality is the Forms. **The allegory of the cave**: people only see shadows of reality.
- **Aristotle**: observed nature and laid the foundations of logic and science.
- **Descartes**: doubted everything and arrived at "I think, therefore I am".
- **Existentialism** (Sartre): humans are "condemned to be free" and must create meaning themselves.
- **Free will and determinism**: is everything we do fixed in advance by causes, or do we choose freely?
- **Argument**: a valid argument has a conclusion that follows logically from the premises.

### Example
In the allegory of the cave, chained prisoners see only shadows on a wall. The one who escapes and sees the Sun understands reality, but is not believed on returning.

> Philosophy begins with wonder.`,
[
 ["Hvem sa «Jeg tenker, altså er jeg»?", ["Descartes", "Sokrates", "Platon", "Sartre"], "Det eneste han ikke kunne tvile på.", "Who said \"I think, therefore I am\"?", ["Descartes", "Socrates", "Plato", "Sartre"], "The one thing he could not doubt."],
 ["Hvilken filosof står bak hulelignelsen?", ["Platon", "Aristoteles", "Kant", "Descartes"], "Menneskene ser bare skygger av virkeligheten.", "Which philosopher is behind the allegory of the cave?", ["Plato", "Aristotle", "Kant", "Descartes"], "People only see shadows of reality."],
 ["Hvem er kjent for «Jeg vet at jeg intet vet»?", ["Sokrates", "Platon", "Marx", "Mill"], "Han stilte spørsmål for å avsløre falsk kunnskap.", "Who is known for \"I know that I know nothing\"?", ["Socrates", "Plato", "Marx", "Mill"], "He asked questions to expose false knowledge."],
 ["Hva er determinisme?", ["At alt som skjer er bestemt av tidligere årsaker", "At vi alltid velger fritt", "Troen på én gud", "At livet er meningsløst"], "Står i motsetning til fri vilje.", "What is determinism?", ["That everything that happens is fixed by prior causes", "That we always choose freely", "Belief in one god", "That life is meaningless"], "It stands opposed to free will."],
 ["Hva mente Sartre med at mennesket er «dømt til å være fritt»?", ["Vi må selv velge og skape mening", "Vi er fanger", "Gud bestemmer alt", "Vi har ingen valg"], "Eksistensialismen.", "What did Sartre mean by humans being \"condemned to be free\"?", ["We must choose and create meaning ourselves", "We are prisoners", "God decides everything", "We have no choices"], "Existentialism."]
]);
})();
