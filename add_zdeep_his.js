// ============================================================
//  add_zdeep_his.js – fordypning i historie: lærebok-nivå for hver enhet.
//  DEEP(kode, enhetstittel, nb, en) setter teksten inn etter «Begreper og formler» (kortversjonen) og før eksemplet,
//  så siden går fra oversikt → tidslinje → kortversjon → fordypning → oppgaver → eksempel.
// ============================================================
function DEEP(code, title, nb, en){
  const c = COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u < 0) return;
  const doc = theoryOf(code, u); if(!doc) return;
  const put = (src, add) => { const lines = String(src).split("\n"), i = lines.findIndex(l => /^###?\s+(Eksempel|Example)/i.test(l.trim()));
    if(i < 0) return src + "\n\n" + add; lines.splice(i, 0, add, ""); return lines.join("\n"); };
  const ren = (s, a, b) => String(s).replace(a, b);
  THEORY(code, u, { nb: ren(put(doc.nb, nb), /^## Begreper og formler$/m, "## Kort oppsummert"), en: ren(put(doc.en || doc.nb, en), /^## Concepts and formulas$/m, "## In short") });
}
(() => {
DEEP("VGHIS", "Verdenskrigene",
`## Første verdenskrig (1914–1918)
### Hvorfor ble det krig?
Historikere skiller mellom **langsiktige årsaker** og den **utløsende årsaken**. De langsiktige husker mange med forkortelsen **MAIN**:
- **Militarisme**: stormaktene bygde opp store hærer, og Storbritannia og Tyskland kappet om å bygge den sterkeste flåten.
- **Allianser**: Europa var delt i to blokker. **Trippelententen** besto av Storbritannia, Frankrike og Russland. På den andre siden sto Tyskland og Østerrike-Ungarn (Italia var formelt med dem, men byttet side i 1915).
- **Imperialisme**: stormaktene konkurrerte om kolonier i Afrika og Asia, og Tyskland mente landet hadde fått for lite.
- **Nasjonalisme**: mange folk ville ha egen stat. På Balkan ville serbere og andre slaviske folk løsrive seg fra Østerrike-Ungarn.

### Skuddene i Sarajevo – den utløsende årsaken
**Erkehertug Franz Ferdinand** var tronarving i Østerrike-Ungarn – mannen som skulle bli neste keiser. Den **28. juni 1914** besøkte han og kona Sophie Sarajevo i Bosnia, som Østerrike-Ungarn hadde tatt over i 1908. Der ble begge skutt av **Gavrilo Princip**, en ung bosnisk serber som ville samle de sørslaviske folkene i én stat. Han hadde fått hjelp av den hemmelige serbiske organisasjonen **Den svarte hånd**.

Østerrike-Ungarn ga Serbia skylden og erklærte krig **28. juli**. Så virket alliansene som dominobrikker: Russland mobiliserte for å støtte Serbia, Tyskland erklærte krig mot Russland og Frankrike, og da tyske tropper marsjerte gjennom det nøytrale Belgia, erklærte Storbritannia krig mot Tyskland (**4. august**). På én uke var Europa i krig.

### Hvem kjempet mot hvem?
- **Ententen / de allierte**: Storbritannia (med hele imperiet – Canada, Australia, India og flere), Frankrike, Russland (til 1917), Serbia, Belgia, Italia (fra 1915) og **USA (fra 1917)**.
- **Sentralmaktene**: Tyskland, Østerrike-Ungarn, Det osmanske riket (Tyrkia) og Bulgaria.

### Skyttergravskrigen på vestfronten
Tyskland ville vinne raskt med **Schlieffenplanen**: slå Frankrike gjennom Belgia på noen uker og deretter vende seg mot Russland. Planen stoppet ved elva **Marne** i september 1914. Begge sider gravde seg ned, og snart gikk det en linje av **skyttergraver** fra Den engelske kanal til Sveits.

Mellom gravene lå **ingenmannsland** med piggtråd og kratere. Nye våpen – **maskingevær**, tungt **artilleri**, **giftgass** (fra 1915) og senere **stridsvogner** (1916) og **fly** – gjorde angrep ekstremt blodige. I slaget ved **Verdun** (1916) kjempet Frankrike og Tyskland i ti måneder. Ved **Somme** samme år angrep britiske og franske styrker; over én million soldater ble drept eller såret, og fronten flyttet seg bare noen få kilometer. Soldatene levde med gjørme, rotter, lus og konstant beskytning.

På **østfronten** mot Russland var krigen mer bevegelig, og i Midtøsten kjempet britene mot osmanerne, blant annet ved **Gallipoli** (1915).

### 1917: to vendepunkter
- **USA gikk inn i krigen** i april 1917, etter at tyske ubåter senket skip uten forvarsel og Tyskland i et hemmelig telegram (**Zimmermann-telegrammet**) hadde prøvd å få Mexico med mot USA.
- **Russland trakk seg ut.** Etter revolusjonen tok bolsjevikene under **Lenin** makten og sluttet fred med Tyskland i 1918.

### Slutten og følgene
Tysklands store våroffensiv i 1918 slo feil. Landet manglet mat og soldater, det brøt ut opprør, og keiseren abdiserte. **Våpenhvilen** kom **11. november 1918 kl. 11**.

- Rundt **17 millioner** mennesker døde, soldater og sivile. Rett etterpå tok **spanskesyken** livet av enda flere millioner over hele verden.
- **Fire keiserriker gikk under**: Tyskland, Østerrike-Ungarn, Russland og Det osmanske riket. Nye stater som Polen, Tsjekkoslovakia og Jugoslavia ble opprettet.
- **Versaillestraktaten (1919)**: Tyskland måtte ta på seg skylden for krigen, betale store **krigserstatninger**, avgi land (blant annet Alsace-Lorraine til Frankrike) og alle kolonier, og hæren ble begrenset til 100 000 mann. Mange tyskere opplevde freden som et **diktat**.
- **Folkeforbundet** ble opprettet for å sikre freden, men USA ble aldri med.

### Norge under første verdenskrig
Norge var **nøytralt**, men ble likevel rammet. Handelsflåten seilte for begge sider, og rundt **2000 norske sjøfolk** omkom da skip ble senket av ubåter og miner. Hjemme ga krigen høye priser og rasjonering, mens noen spekulanter tjente store penger – derfor kalles perioden **jobbetiden**.

## Mellomkrigstiden (1918–1939)
- **Sovjetunionen** (fra 1922): etter Lenin tok **Stalin** makten. Han styrte med terror, tvangskollektiviserte jordbruket og sendte millioner til arbeidsleirer (**Gulag**).
- **Italia**: **Mussolini** og fascistene tok makten i 1922. Fascismen satte nasjonen og staten over individet og forbød opposisjon.
- **Tyskland**: Weimarrepublikken slet med **hyperinflasjon** (1923) og, etter **børskrakket i 1929**, massearbeidsløshet – rundt seks millioner arbeidsløse i 1932. **Hitler** og nazistene lovet arbeid, orden og oppreisning etter Versailles, og Hitler ble rikskansler **30. januar 1933**. Han gjorde raskt Tyskland til en ettpartistat. Jødene ble fratatt rettighetene sine (**Nürnberglovene** 1935), og under **krystallnatten** i 1938 ble synagoger og butikker ødelagt.
- **Veien mot ny krig**: Tyskland rustet opp og tok **Rhinland** (1936), **Østerrike** (1938) og **Tsjekkoslovakia** (1938–39). Storbritannia og Frankrike førte en **ettergivenhetspolitikk** og godtok i **München-avtalen** (1938) at Hitler fikk Sudetenland. I august 1939 inngikk Hitler og Stalin en **ikke-angrepspakt** (Molotov–Ribbentrop-pakten) der de i hemmelighet delte Øst-Europa mellom seg.
- **Norge**: arbeidsløshet og krise på 1930-tallet. **Kriseforliket** i 1935 mellom Arbeiderpartiet og Bondepartiet ga Arbeiderpartiet regjeringsmakt under **Johan Nygaardsvold**.

## Andre verdenskrig (1939–1945)
### Sidene
- **Aksemaktene**: Tyskland, Italia og Japan, med blant andre Ungarn, Romania og Bulgaria.
- **De allierte**: Storbritannia (statsminister **Winston Churchill** fra 1940), Frankrike (til juni 1940), **Sovjetunionen** (etter at Tyskland angrep i juni 1941), **USA** (fra desember 1941), Kina og mange flere – også eksilregjeringene til okkuperte land som Norge.

### Forløpet
- **1. september 1939**: Tyskland angriper Polen med **lynkrig** (raske angrep med stridsvogner og fly). Storbritannia og Frankrike erklærer krig. Sovjetunionen angriper Polen fra øst.
- **April–juni 1940**: Tyskland tar Danmark, Norge, Nederland, Belgia og **Frankrike**. Over 300 000 allierte soldater blir evakuert fra **Dunkerque**.
- **Slaget om Storbritannia** (1940): det tyske luftforsvaret klarer ikke å slå ut britiske Royal Air Force, og Hitler må gi opp invasjonen av Storbritannia.
- **22. juni 1941**: Tyskland angriper Sovjetunionen (**operasjon Barbarossa**) og kommer helt til Moskva før vinteren stopper framrykningen.
- **7. desember 1941**: Japan angriper den amerikanske flåtebasen **Pearl Harbor** på Hawaii. USA går inn i krigen.
- **Vendepunktene 1942–43**: USA vinner over Japan ved **Midway** (1942), britene slår tyskerne ved **El Alamein** i Egypt (1942), og den tyske 6. armé overgir seg i **Stalingrad** (februar 1943).
- **6. juni 1944**: **D-dagen** – de allierte går i land i Normandie og åpner en ny front i vest, mens Den røde armé presser på fra øst.
- **8. mai 1945**: Tyskland kapitulerer, ei uke etter at Hitler tok sitt eget liv i Berlin.
- **August 1945**: USA slipper **atombomber** over **Hiroshima** (6. august) og **Nagasaki** (9. august). Japan kapitulerer, og krigen er over.

Rundt **70–85 millioner** mennesker døde – de fleste av dem sivile. Sovjetunionen alene mistet over 20 millioner.

### Holocaust
Nazistenes rasepolitikk endte i et planlagt **folkemord**. Jøder ble først fratatt rettigheter, så stuet inn i **ghettoer**, og etter angrepet på Sovjetunionen skjøt spesialstyrker hundretusener i massegraver. På **Wannsee-konferansen** i januar 1942 ble «den endelige løsningen» organisert, og jøder fra hele Europa ble fraktet med tog til **utryddelsesleirer** som **Auschwitz-Birkenau** og Treblinka. Rundt **seks millioner jøder** ble drept, i tillegg til rom, funksjonshemmede, homofile og politiske motstandere.

I Norge ble jødene registrert og arrestert. Den **26. november 1942** fraktet skipet **Donau** over 500 jøder fra Oslo til Auschwitz. Totalt ble nesten 800 jøder deportert fra Norge, og bare noen få titalls overlevde.

### Norge under andre verdenskrig
- **9. april 1940**: Tyske styrker angrep langs hele kysten, fra Oslofjorden til Narvik. Krysseren **Blücher** ble senket i Drøbaksundet av kanonene på **Oscarsborg**. Det ga kongen, regjeringen og Stortinget tid til å komme seg ut av Oslo. På Elverum ga Stortinget regjeringen fullmakt til å styre (**Elverumsfullmakten**), og **kong Haakon VII** sa nei til tyskernes krav om å utnevne **Vidkun Quisling** til statsminister.
- Kampene i Norge varte i **62 dager**. Ved **Narvik** slo norske og allierte styrker tyskerne tilbake, men måtte trekke seg ut da Frankrike falt. **7. juni 1940** dro kongen og regjeringen til **London**, der de ledet kampen videre fra eksil.
- **Okkupasjonen**: Den reelle makten lå hos den tyske **rikskommissæren Josef Terboven**. Quisling og partiet **Nasjonal Samling (NS)** samarbeidet med okkupantene, og Quisling ble «ministerpresident» i 1942.
- **Motstand**: Den sivile motstanden var stor – lærerne nektet å melde seg inn i NS' lærersamband (**lærerstriden** 1942), og idretten streiket. **Milorg** bygde opp en hemmelig hær, **Kompani Linge** gjennomførte sabotasje som **tungtvannsaksjonen** på Vemork (1943), og **Shetlandsgjengen** fraktet folk og våpen over Nordsjøen. Mange leste illegale aviser.
- **Handelsflåten**: Rundt 1000 norske skip seilte for de allierte gjennom **Nortraship**. Det var et av Norges viktigste bidrag til krigen, og rundt **3700 sjøfolk** omkom.
- **Finnmark og Nord-Troms** ble tvangsevakuert og **brent** av tyskerne høsten 1944. Sovjetiske styrker frigjorde Øst-Finnmark i oktober 1944.
- **Frigjøringen** kom **8. mai 1945**, og kongen kom hjem **7. juni 1945**, fem år etter at han dro.
- **Landssvikoppgjøret**: rundt 46 000 nordmenn ble straffet for landssvik, og **Quisling ble henrettet** i oktober 1945. Totalt mistet rundt 10 000 nordmenn livet i krigen.`,
`## The First World War (1914–1918)
### Why was there war?
Historians distinguish between **long-term causes** and the **immediate cause**. Many remember the long-term ones with the acronym **MAIN**:
- **Militarism**: the great powers built huge armies, and Britain and Germany raced to build the strongest navy.
- **Alliances**: Europe was split into two blocs. The **Triple Entente** was Britain, France and Russia. On the other side stood Germany and Austria-Hungary (Italy was formally with them but switched sides in 1915).
- **Imperialism**: the great powers competed for colonies in Africa and Asia, and Germany felt it had too few.
- **Nationalism**: many peoples wanted their own state. In the Balkans, Serbs and other Slavic peoples wanted to break free from Austria-Hungary.

### The shots in Sarajevo – the immediate cause
**Archduke Franz Ferdinand** was heir to the throne of Austria-Hungary – the man who would become the next emperor. On **28 June 1914** he and his wife Sophie visited Sarajevo in Bosnia, which Austria-Hungary had annexed in 1908. There both were shot by **Gavrilo Princip**, a young Bosnian Serb who wanted to unite the South Slavic peoples in one state. He had help from the secret Serbian organisation the **Black Hand**.

Austria-Hungary blamed Serbia and declared war on **28 July**. Then the alliances worked like dominoes: Russia mobilised to support Serbia, Germany declared war on Russia and France, and when German troops marched through neutral Belgium, Britain declared war on Germany (**4 August**). Within a week Europe was at war.

### Who fought whom?
- **The Entente / the Allies**: Britain (with its whole empire – Canada, Australia, India and more), France, Russia (until 1917), Serbia, Belgium, Italy (from 1915) and the **USA (from 1917)**.
- **The Central Powers**: Germany, Austria-Hungary, the Ottoman Empire (Turkey) and Bulgaria.

### Trench warfare on the Western Front
Germany wanted a quick victory with the **Schlieffen Plan**: knock out France through Belgium in a few weeks, then turn on Russia. The plan stalled at the river **Marne** in September 1914. Both sides dug in, and soon a line of **trenches** ran from the English Channel to Switzerland.

Between the trenches lay **no man's land** with barbed wire and craters. New weapons – **machine guns**, heavy **artillery**, **poison gas** (from 1915) and later **tanks** (1916) and **aircraft** – made attacks extremely bloody. At **Verdun** (1916) France and Germany fought for ten months. At the **Somme** the same year British and French forces attacked; more than a million soldiers were killed or wounded, and the front moved only a few kilometres. Soldiers lived with mud, rats, lice and constant shelling.

On the **Eastern Front** against Russia the war was more mobile, and in the Middle East the British fought the Ottomans, for example at **Gallipoli** (1915).

### 1917: two turning points
- **The USA entered the war** in April 1917, after German submarines sank ships without warning and Germany, in a secret telegram (the **Zimmermann Telegram**), had tried to get Mexico to join against the US.
- **Russia pulled out.** After the revolution the Bolsheviks under **Lenin** seized power and made peace with Germany in 1918.

### The end and the consequences
Germany's great spring offensive in 1918 failed. The country lacked food and soldiers, revolts broke out and the Kaiser abdicated. The **armistice** came on **11 November 1918 at 11 o'clock**.

- Around **17 million** people died, soldiers and civilians. Right after, the **Spanish flu** killed many millions more worldwide.
- **Four empires collapsed**: Germany, Austria-Hungary, Russia and the Ottoman Empire. New states such as Poland, Czechoslovakia and Yugoslavia were created.
- **The Treaty of Versailles (1919)**: Germany had to accept the blame for the war, pay large **reparations**, give up territory (including Alsace-Lorraine to France) and all its colonies, and its army was limited to 100,000 men. Many Germans saw the peace as a **diktat**.
- The **League of Nations** was set up to keep the peace, but the USA never joined.

### Norway in the First World War
Norway was **neutral** but was still affected. Its merchant fleet sailed for both sides, and about **2,000 Norwegian seamen** died when ships were sunk by submarines and mines. At home the war brought high prices and rationing, while some speculators made fortunes – which is why the period is called the **'jobbetid'** (speculation era).

## The interwar years (1918–1939)
- **The Soviet Union** (from 1922): after Lenin, **Stalin** took power. He ruled by terror, forcibly collectivised agriculture and sent millions to labour camps (the **Gulag**).
- **Italy**: **Mussolini** and the fascists took power in 1922. Fascism put the nation and the state above the individual and banned opposition.
- **Germany**: the Weimar Republic struggled with **hyperinflation** (1923) and, after the **1929 crash**, mass unemployment – around six million unemployed in 1932. **Hitler** and the Nazis promised work, order and revenge for Versailles, and Hitler became chancellor on **30 January 1933**. He quickly made Germany a one-party state. Jews were stripped of their rights (the **Nuremberg Laws**, 1935), and on **Kristallnacht** in 1938 synagogues and shops were destroyed.
- **The road to a new war**: Germany rearmed and took the **Rhineland** (1936), **Austria** (1938) and **Czechoslovakia** (1938–39). Britain and France followed a policy of **appeasement** and accepted in the **Munich Agreement** (1938) that Hitler could have the Sudetenland. In August 1939 Hitler and Stalin signed a **non-aggression pact** (the Molotov–Ribbentrop Pact) in which they secretly divided Eastern Europe between them.
- **Norway**: unemployment and crisis in the 1930s. The **Crisis Agreement** of 1935 between Labour and the Farmers' Party gave Labour power under **Johan Nygaardsvold**.

## The Second World War (1939–1945)
### The sides
- **The Axis**: Germany, Italy and Japan, with Hungary, Romania and Bulgaria among others.
- **The Allies**: Britain (prime minister **Winston Churchill** from 1940), France (until June 1940), the **Soviet Union** (after Germany attacked in June 1941), the **USA** (from December 1941), China and many more – including the governments-in-exile of occupied countries such as Norway.

### The course of the war
- **1 September 1939**: Germany attacks Poland with **blitzkrieg** (rapid attacks with tanks and aircraft). Britain and France declare war. The Soviet Union invades Poland from the east.
- **April–June 1940**: Germany takes Denmark, Norway, the Netherlands, Belgium and **France**. More than 300,000 Allied soldiers are evacuated from **Dunkirk**.
- **The Battle of Britain** (1940): the German air force fails to defeat the RAF, and Hitler has to give up invading Britain.
- **22 June 1941**: Germany invades the Soviet Union (**Operation Barbarossa**) and reaches Moscow before winter halts the advance.
- **7 December 1941**: Japan attacks the US naval base at **Pearl Harbor** in Hawaii. The USA enters the war.
- **The turning points 1942–43**: the US defeats Japan at **Midway** (1942), the British beat the Germans at **El Alamein** in Egypt (1942), and the German 6th Army surrenders at **Stalingrad** (February 1943).
- **6 June 1944**: **D-Day** – the Allies land in Normandy and open a new front in the west, while the Red Army pushes from the east.
- **8 May 1945**: Germany surrenders, a week after Hitler took his own life in Berlin.
- **August 1945**: the USA drops **atomic bombs** on **Hiroshima** (6 August) and **Nagasaki** (9 August). Japan surrenders and the war is over.

Around **70–85 million** people died – most of them civilians. The Soviet Union alone lost over 20 million.

### The Holocaust
Nazi racial policy ended in a planned **genocide**. Jews were first stripped of rights, then crammed into **ghettos**, and after the attack on the Soviet Union special units shot hundreds of thousands in mass graves. At the **Wannsee Conference** in January 1942 the 'Final Solution' was organised, and Jews from all over Europe were taken by train to **extermination camps** such as **Auschwitz-Birkenau** and Treblinka. Around **six million Jews** were murdered, as well as Roma, disabled people, gay men and political opponents.

In Norway Jews were registered and arrested. On **26 November 1942** the ship **Donau** took more than 500 Jews from Oslo to Auschwitz. In total almost 800 Jews were deported from Norway, and only a few dozen survived.

### Norway in the Second World War
- **9 April 1940**: German forces attacked all along the coast, from the Oslofjord to Narvik. The cruiser **Blücher** was sunk in the Drøbak Sound by the guns of **Oscarsborg** fortress. This gave the king, the government and the Storting time to get out of Oslo. At Elverum the Storting gave the government authority to govern (the **Elverum Authorisation**), and **King Haakon VII** refused the German demand to appoint **Vidkun Quisling** prime minister.
- The fighting in Norway lasted **62 days**. At **Narvik** Norwegian and Allied forces pushed the Germans back but had to withdraw when France fell. On **7 June 1940** the king and government left for **London**, where they led the fight from exile.
- **The occupation**: real power lay with the German **Reichskommissar Josef Terboven**. Quisling and his party **Nasjonal Samling (NS)** collaborated with the occupiers, and Quisling became 'minister-president' in 1942.
- **Resistance**: civil resistance was widespread – teachers refused to join the NS teachers' union (the **teachers' struggle**, 1942) and sport went on strike. **Milorg** built a secret army, **Kompani Linge** carried out sabotage such as the **heavy water operation** at Vemork (1943), and the **Shetland Bus** carried people and weapons across the North Sea. Many read illegal newspapers.
- **The merchant fleet**: around 1,000 Norwegian ships sailed for the Allies through **Nortraship**. It was one of Norway's most important contributions, and about **3,700 seamen** died.
- **Finnmark and northern Troms** were forcibly evacuated and **burned** by the Germans in autumn 1944. Soviet forces liberated eastern Finnmark in October 1944.
- **Liberation** came on **8 May 1945**, and the king returned on **7 June 1945**, five years after he left.
- **The treason trials**: about 46,000 Norwegians were punished for treason, and **Quisling was executed** in October 1945. In total about 10,000 Norwegians lost their lives in the war.`);
DEEP("VGHIS", "Historiefaget og kildekritikk",
`## Hva er historie?
Fortiden er alt som har skjedd. **Historie** er det vi forteller og skriver om fortiden ut fra **kilder**. Derfor kan historien endre seg: nye kilder blir funnet, og nye spørsmål gir nye svar. Historikere er enige om mange fakta (for eksempel at Grunnloven ble vedtatt i 1814), men ofte uenige om **årsaker**, **betydning** og hvordan noe skal **vurderes**.

## Typer kilder
- **Skriftlige kilder**: brev, dagbøker, lover, avisartikler, protokoller, regnskap.
- **Muntlige kilder**: intervjuer og fortellinger fra tidsvitner. De gir nærhet, men hukommelsen endrer seg over tid.
- **Materielle kilder**: gjenstander, bygninger, våpen, klær, gravfunn.
- **Bilder, film og lyd**: kan gi sterkt inntrykk, men kan være arrangert eller redigert.

Samme kilde kan brukes på to måter. Som **beretning** spør vi: hva forteller kilden om hendelsen? Som **levning** spør vi: hva avslører kilden om tiden og personen som laget den? En propagandaplakat fra 1942 er en dårlig beretning om krigen, men en svært god levning som viser hvordan NS ville påvirke folk.

## Slik vurderer du en kilde
1. **Opphav**: Hvem laget kilden, og hvilken rolle hadde hen?
2. **Tid og nærhet**: Ble kilden laget mens det skjedde eller lenge etterpå? Var opphavspersonen til stede (**førstehånds**) eller hørte hen det fra andre (**annenhånds**)?
3. **Hensikt og mottaker**: Hvorfor ble kilden laget, og for hvem? En dagbok er skrevet for en selv, en tale for å overbevise.
4. **Tendens**: Har opphavspersonen interesse av å framstille saken på en bestemt måte?
5. **Sammenligning**: Bekrefter andre, uavhengige kilder det samme?

En kilde er aldri bare «sann» eller «falsk» – den er mer eller mindre **troverdig** og **relevant** for spørsmålet du stiller.

## Årsaker og følger
Historikere skiller mellom **langsiktige årsaker** (forhold som bygger seg opp over tid), **utløsende årsaker** (det som setter i gang hendelsen) og **følger**. Man skiller også mellom **strukturer** (økonomi, klima, teknologi) og **aktører** (enkeltpersoner og grupper som tar valg). Gode historiske forklaringer bruker begge deler.

## Historiebruk
Historien brukes hele tiden – i politikk, i reklame, i filmer og spill, og når vi feirer 17. mai. **Historiebruk** handler om hvordan og hvorfor fortiden brukes i dag: for å skape felles identitet, for å legitimere makt, for å selge produkter eller for å lære av feil. Spør alltid: hvem bruker historien, og hva vil de oppnå?`,
`## What is history?
The past is everything that has happened. **History** is what we tell and write about the past based on **sources**. That is why history can change: new sources are found, and new questions give new answers. Historians agree on many facts (for example that the Constitution was adopted in 1814), but often disagree about **causes**, **significance** and how something should be **judged**.

## Types of sources
- **Written sources**: letters, diaries, laws, newspaper articles, minutes, accounts.
- **Oral sources**: interviews and stories from eyewitnesses. They give closeness, but memory changes over time.
- **Material sources**: objects, buildings, weapons, clothes, grave finds.
- **Pictures, film and sound**: can make a strong impression but may be staged or edited.

The same source can be used in two ways. As an **account** we ask: what does the source tell us about the event? As a **remnant** we ask: what does it reveal about the time and the person who made it? A propaganda poster from 1942 is a poor account of the war but an excellent remnant showing how NS wanted to influence people.

## How to assess a source
1. **Origin**: Who made the source, and what role did they have?
2. **Time and proximity**: Was it made as things happened or long after? Was the author present (**first-hand**) or did they hear it from others (**second-hand**)?
3. **Purpose and audience**: Why was it made, and for whom? A diary is written for oneself, a speech to persuade.
4. **Bias**: Does the author have an interest in presenting things a certain way?
5. **Comparison**: Do other, independent sources confirm the same?

A source is never simply 'true' or 'false' – it is more or less **credible** and **relevant** to the question you ask.

## Causes and consequences
Historians distinguish between **long-term causes** (conditions that build up over time), **immediate causes** (what sets the event off) and **consequences**. They also distinguish between **structures** (economy, climate, technology) and **actors** (individuals and groups who make choices). Good historical explanations use both.

## Uses of history
History is used all the time – in politics, advertising, films and games, and when we celebrate 17 May. **Uses of history** is about how and why the past is used today: to create a shared identity, to legitimise power, to sell products or to learn from mistakes. Always ask: who is using history, and what do they want to achieve?`);

DEEP("VGHIS", "Vikingtid og middelalder",
`## Vikingtiden (ca. 793–1066)
### Hvorfor dro vikingene ut?
Historikerne peker på flere årsaker: gode **skip** (langskip som kunne seile både på havet og opp elver), **befolkningsvekst** og mangel på god jord hjemme, ønsket om **rikdom og ære**, og at mange rike klostre og byer i Europa var dårlig forsvart.

### Plyndring, handel og bosetting
- **Plyndring**: Angrepet på klosteret **Lindisfarne** i England i 793 regnes som starten. Vikingene angrep kyster i England, Irland, Frankrike og Spania.
- **Handel**: Vikingene handlet med pels, slaver, sølv og våpen. Handelsbyer som **Kaupang** (Vestfold), Birka og Hedeby vokste fram. Svenske vikinger reiste østover langs elvene i Russland helt til Konstantinopel og Bagdad.
- **Bosetting**: Nordmenn bosatte seg på Shetland, Orknøy, Hebridene, i Irland (Dublin ble grunnlagt av vikinger), på **Island** (fra ca. 870) og **Grønland**. Rundt år 1000 nådde **Leiv Eiriksson** Nord-Amerika (**Vinland**).

### Samfunnet
Vikingsamfunnet var delt i **frie** (stormenn/høvdinger og bønder) og **treler** (slaver). Viktige saker ble avgjort på **tinget**, et møte der frie menn holdt rett og vedtok lover. Folk trodde på de **norrøne gudene** – Odin, Tor, Frøy og Frøya – og på et liv etter døden i Valhall eller Hel.

### Rikssamlingen
Før hadde Norge mange småkonger. **Harald Hårfagre** samlet store deler av kysten etter **slaget i Hafrsfjord** (tradisjonelt rundt 872, men årstallet er usikkert). Samlingen var ikke fullført før langt senere, og kongemakten var svak i innlandet.

### Kristningen
Kongene **Olav Tryggvason** (ca. 995–1000) og **Olav Haraldsson** (1015–1028) innførte kristendommen, ofte med makt. Olav Haraldsson falt i **slaget på Stiklestad i 1030**, men ble snart regnet som helgen – **Olav den hellige**. Kristendommen ga Norge kirker, klostre, skriftkultur og en tettere kobling til resten av Europa. Vikingtiden regnes ofte som slutt da **Harald Hardråde** falt ved **Stamford Bridge** i England i 1066.

## Middelalderen i Norge (ca. 1066–1537)
### Borgerkrigstiden og storhetstiden
Fra 1130 til 1240 kjempet ulike kongsemner om makten (**borgerkrigstiden**). Etterpå fulgte **høymiddelalderen**, ofte kalt **storhetstiden**: under **Håkon Håkonsson** (1217–1263) var Norgesveldet størst, med Island, Grønland, Færøyene, Shetland og Orknøy. **Magnus Lagabøte** ga landet én felles lov, **landsloven**, i 1274. Bergen var landets viktigste by, og tyske kjøpmenn fra **Hansaen** kontrollerte mye av handelen der.

### Samfunn og kirke
Samfunnet var et **standssamfunn**: **kongen og aristokratiet** (adelen), **kirken** (geistligheten) og **bøndene**, som var de aller fleste. Kirken var rik og mektig, eide mye jord og drev skoler, sykepleie og fattighjelp. Norge fikk eget erkebispesete i **Nidaros** (Trondheim) i 1152/53.

I mye av Europa var **føydalismen** viktig: kongen ga land (len) til adelen mot militær tjeneste, og bøndene arbeidet jorda for herren. I Norge var føydalismen svakere, og mange bønder var **selveiere** eller **leilendinger** (leide jord).

### Svartedauden og nedgangstiden
**Svartedauden** – byllepest – kom med et skip til Bergen i **1349**. Pesten drepte trolig **halvparten eller mer** av befolkningen. Mange gårder ble lagt øde, skatteinntektene og adelen ble kraftig svekket, og det norrøne skriftspråket forfalt. Norge kom i union med Danmark (fra 1380) og ble en del av **Kalmarunionen** i 1397 under dronning **Margrete**. Da Sverige brøt ut i 1523, fortsatte Norge i union med Danmark. I **1536–1537** innførte kongen reformasjonen, Norge mistet riksrådet, og landet ble i praksis styrt fra København.`,
`## The Viking Age (c. 793–1066)
### Why did the Vikings set out?
Historians point to several causes: excellent **ships** (longships that could sail both the open sea and up rivers), **population growth** and a lack of good land at home, the wish for **wealth and glory**, and the fact that many rich monasteries and towns in Europe were poorly defended.

### Raiding, trade and settlement
- **Raiding**: the attack on the monastery of **Lindisfarne** in England in 793 is seen as the start. Vikings attacked coasts in England, Ireland, France and Spain.
- **Trade**: Vikings traded furs, slaves, silver and weapons. Trading towns such as **Kaupang** (Vestfold), Birka and Hedeby grew up. Swedish Vikings travelled east along Russian rivers as far as Constantinople and Baghdad.
- **Settlement**: Norwegians settled in Shetland, Orkney, the Hebrides, Ireland (Dublin was founded by Vikings), **Iceland** (from c. 870) and **Greenland**. Around the year 1000 **Leif Erikson** reached North America (**Vinland**).

### Society
Viking society was divided into the **free** (chieftains and farmers) and **thralls** (slaves). Important matters were decided at the **thing**, an assembly where free men judged cases and made laws. People believed in the **Norse gods** – Odin, Thor, Frey and Freya – and in an afterlife in Valhalla or Hel.

### Unification
Norway used to have many petty kings. **Harald Fairhair** united much of the coast after the **battle of Hafrsfjord** (traditionally around 872, though the date is uncertain). Unification was not complete until much later, and royal power was weak inland.

### Christianisation
Kings **Olaf Tryggvason** (c. 995–1000) and **Olaf Haraldsson** (1015–1028) introduced Christianity, often by force. Olaf Haraldsson fell at the **battle of Stiklestad in 1030** but was soon regarded as a saint – **St Olaf**. Christianity brought churches, monasteries, writing and closer ties to the rest of Europe. The Viking Age is often said to end when **Harald Hardrada** fell at **Stamford Bridge** in England in 1066.

## The Middle Ages in Norway (c. 1066–1537)
### Civil wars and the age of greatness
From 1130 to 1240 rival claimants fought for the throne (the **civil war era**). Then came the **High Middle Ages**, often called the **age of greatness**: under **Haakon Haakonsson** (1217–1263) the Norwegian realm was at its largest, including Iceland, Greenland, the Faroes, Shetland and Orkney. **Magnus the Law-mender** gave the country one common law, the **Code of the Realm**, in 1274. Bergen was the most important town, and German merchants from the **Hanseatic League** controlled much of its trade.

### Society and Church
Society was a **society of estates**: **the king and the aristocracy**, **the Church** (clergy) and **the farmers**, who were the vast majority. The Church was rich and powerful, owned much land and ran schools, care for the sick and poor relief. Norway got its own archbishopric in **Nidaros** (Trondheim) in 1152/53.

In much of Europe **feudalism** was important: the king granted land (fiefs) to nobles in return for military service, and peasants worked the land for their lord. In Norway feudalism was weaker, and many farmers **owned their land** or were **tenants**.

### The Black Death and decline
The **Black Death** – bubonic plague – arrived on a ship in Bergen in **1349**. It probably killed **half or more** of the population. Many farms were abandoned, tax income and the aristocracy were badly weakened, and the Old Norse written language declined. Norway entered a union with Denmark (from 1380) and became part of the **Kalmar Union** in 1397 under Queen **Margaret**. When Sweden broke away in 1523, Norway stayed in union with Denmark. In **1536–1537** the king introduced the Reformation, Norway lost its council of the realm, and the country was in practice ruled from Copenhagen.`);

DEEP("VGHIS", "Reformasjon, opplysningstid og revolusjoner",
`## Renessansen og oppdagelsene
Fra 1400-tallet blomstret **renessansen** («gjenfødelsen») i Italia: kunstnere og tenkere som Leonardo da Vinci og Michelangelo hentet inspirasjon fra antikken og satte mennesket i sentrum (**humanisme**). **Boktrykkerkunsten** (Gutenberg, ca. 1450) gjorde bøker billige og spredte nye ideer raskt. Samtidig begynte de store **oppdagelsesreisene**: **Columbus** nådde Amerika i 1492, og **Vasco da Gama** fant sjøveien til India (1498). Europeerne bygde koloniriker, og millioner av afrikanere ble fraktet som slaver over Atlanterhavet.

## Reformasjonen
Den katolske kirken solgte **avlat** – brev som skulle forkorte straffen i skjærsilden. Munken **Martin Luther** protesterte i **1517** med sine **95 teser**. Han mente at mennesket blir frelst ved **troen alene**, ikke ved gode gjerninger eller penger, og at **Bibelen** – ikke paven – er den høyeste autoriteten. Luther oversatte Bibelen til tysk så folk kunne lese den selv.

Kirken ble splittet i **katolikker** og **protestanter**, og Europa fikk en lang rekke religionskriger, verst **trettiårskrigen** (1618–1648). I **Danmark-Norge** innførte kong Christian 3. reformasjonen i **1536–1537**. Kongen tok over kirkens jord og makt, og presten ble kongens embetsmann.

## Eneveldet
I mange land samlet kongene all makt hos seg selv – **eneveldet** (absolutismen). Det mest kjente eksempelet er **Ludvig 14.** i Frankrike («Staten, det er meg»). I Danmark-Norge ble eneveldet innført i **1660**. Kongen styrte gjennom **embetsmenn** (prester, fogder, offiserer), og bøndene betalte skatt og gjorde militærtjeneste.

## Den vitenskapelige revolusjonen og opplysningstiden
Forskere som **Kopernikus**, **Galilei** og **Newton** viste at naturen kan forklares med observasjon, forsøk og matematikk. Det ga tro på at også samfunnet kunne forbedres med **fornuft**. På 1700-tallet kom **opplysningstiden**:
- **John Locke**: alle mennesker har **naturlige rettigheter** til liv, frihet og eiendom, og staten skal beskytte dem.
- **Montesquieu**: makten må deles i **lovgivende, utøvende og dømmende** makt, så ingen får for mye.
- **Rousseau**: makten skal komme fra folket (**folkesuverenitet**).
- **Voltaire**: kjempet for ytringsfrihet og religionsfrihet.

## Den amerikanske revolusjonen
De britiske koloniene i Nord-Amerika protesterte mot skatter de ikke hadde vært med på å bestemme («ingen skatt uten representasjon»). I **1776** vedtok de **uavhengighetserklæringen**, skrevet av blant andre Thomas Jefferson, og etter krigen ble **USA** et eget land med en grunnlov bygd på maktfordeling (1787). Men frihetene gjaldt ikke alle: slaveriet fortsatte, og urfolk ble fordrevet.

## Den franske revolusjonen
Frankrike hadde enorm statsgjeld, dårlige avlinger og et urettferdig skattesystem der adelen og kirken slapp unna. I **1789** krevde den tredje stand (vanlige folk) innflytelse, og **14. juli** stormet folket fengselet **Bastillen**. Revolusjonen avskaffet adelens privilegier og vedtok **erklæringen om menneskets og borgerens rettigheter**. Kongen Ludvig 16. ble henrettet i 1793, og under **terrorveldet** ble tusenvis giljotinert. Til slutt tok generalen **Napoleon** makten (1799) og erobret store deler av Europa, til han ble slått i 1815.

## Den industrielle revolusjonen
Fra midten av 1700-tallet startet den **industrielle revolusjonen** i Storbritannia. **Dampmaskinen** (forbedret av James Watt) drev fabrikker, tog og skip. Tekstilproduksjonen ble mekanisert, og folk flyttet fra landsbygda til byene (**urbanisering**). Det ga økt produksjon og etter hvert høyere levestandard, men også barnearbeid, lange arbeidsdager og trange, skitne arbeiderboliger. Som svar vokste **arbeiderbevegelsen** og nye ideologier som **liberalismen** og **sosialismen** fram.`,
`## The Renaissance and the voyages of discovery
From the 1400s the **Renaissance** ('rebirth') flourished in Italy: artists and thinkers like Leonardo da Vinci and Michelangelo drew inspiration from antiquity and put the human being at the centre (**humanism**). The **printing press** (Gutenberg, c. 1450) made books cheap and spread new ideas quickly. At the same time the great **voyages of discovery** began: **Columbus** reached the Americas in 1492, and **Vasco da Gama** found the sea route to India (1498). Europeans built colonial empires, and millions of Africans were shipped across the Atlantic as slaves.

## The Reformation
The Catholic Church sold **indulgences** – letters meant to shorten punishment in purgatory. The monk **Martin Luther** protested in **1517** with his **95 theses**. He held that people are saved by **faith alone**, not by good works or money, and that the **Bible** – not the Pope – is the highest authority. Luther translated the Bible into German so people could read it themselves.

The Church split into **Catholics** and **Protestants**, and Europe saw a long series of wars of religion, the worst being the **Thirty Years' War** (1618–1648). In **Denmark-Norway** King Christian III introduced the Reformation in **1536–1537**. The king took over the Church's land and power, and priests became royal officials.

## Absolutism
In many countries kings gathered all power to themselves – **absolutism**. The best-known example is **Louis XIV** of France ('I am the state'). In Denmark-Norway absolutism was introduced in **1660**. The king ruled through **officials** (priests, bailiffs, officers), and farmers paid taxes and did military service.

## The Scientific Revolution and the Enlightenment
Scientists such as **Copernicus**, **Galileo** and **Newton** showed that nature can be explained by observation, experiment and mathematics. This inspired the belief that society too could be improved by **reason**. In the 1700s came the **Enlightenment**:
- **John Locke**: all people have **natural rights** to life, liberty and property, and the state must protect them.
- **Montesquieu**: power must be split into **legislative, executive and judicial** branches so no one gets too much.
- **Rousseau**: power must come from the people (**popular sovereignty**).
- **Voltaire**: fought for freedom of speech and religion.

## The American Revolution
Britain's North American colonies protested against taxes they had no say in ('no taxation without representation'). In **1776** they adopted the **Declaration of Independence**, written by Thomas Jefferson among others, and after the war the **USA** became a country with a constitution based on separation of powers (1787). But the freedoms did not apply to everyone: slavery continued and Native Americans were driven from their land.

## The French Revolution
France had huge state debt, poor harvests and an unfair tax system in which the nobility and the Church avoided taxes. In **1789** the Third Estate (ordinary people) demanded influence, and on **14 July** crowds stormed the **Bastille** prison. The revolution abolished noble privileges and adopted the **Declaration of the Rights of Man and of the Citizen**. King Louis XVI was executed in 1793, and during the **Reign of Terror** thousands were guillotined. Finally the general **Napoleon** seized power (1799) and conquered much of Europe until he was defeated in 1815.

## The Industrial Revolution
From the mid-1700s the **Industrial Revolution** began in Britain. The **steam engine** (improved by James Watt) powered factories, trains and ships. Textile production was mechanised, and people moved from the countryside to the towns (**urbanisation**). This raised output and eventually living standards, but also brought child labour, long working days and cramped, dirty workers' housing. In response the **labour movement** and new ideologies such as **liberalism** and **socialism** emerged.`);

DEEP("VGHIS", "Norge 1814–1905",
`## Veien til 1814
Danmark-Norge holdt seg lenge utenfor Napoleonskrigene, men i 1807 angrep britene København og tok den dansk-norske flåten. Danmark-Norge gikk da på **Napoleons side**. Britene blokkerte kysten, og i Norge ble det **nød og hungersnød** fordi kornet fra Danmark ikke kom fram. Da Napoleon tapte, måtte den danske kongen i **Kielfreden (14. januar 1814)** gi Norge til **Sverige**.

## 1814: Grunnloven og unionen
Den danske prinsen **Christian Frederik**, som var stattholder i Norge, ville ikke godta Kielfreden. Han kalte inn en **riksforsamling** på **Eidsvoll**, med 112 representanter fra hele landet – embetsmenn, bønder, kjøpmenn og offiserer. De var delt i et **selvstendighetsparti** og et **unionsparti** (som ville samarbeide med Sverige). **17. mai 1814** vedtok de **Grunnloven**, og Christian Frederik ble valgt til konge.

Grunnloven bygde på **opplysningstidens ideer**: folkesuverenitet, **maktfordeling** (Stortinget, kongen/regjeringen og domstolene) og borgerrettigheter. For sin tid var den svært **demokratisk** – rundt 40 % av mennene over 25 år fikk stemmerett – men kvinner, fattige og mange andre var utestengt, og Grunnloven forbød jøder og jesuitter å komme inn i landet.

Sverige godtok ikke selvstendigheten. Etter en kort **krig** sommeren 1814 ble **Mossekonvensjonen** inngått: Norge gikk i **union med Sverige**, men beholdt Grunnloven med noen endringer. 4. november 1814 valgte Stortinget den svenske kongen til norsk konge.

## Embetsmannsstaten (1814–1884)
I unionen hadde Norge og Sverige **felles konge og utenrikspolitikk**, men Norge hadde egen regjering, eget storting, egne lover og egen hær. Den reelle makten i Norge lå hos **embetsmennene** – en liten, høyt utdannet elite av prester, dommere, offiserer og byråkrater. Perioden kalles derfor **embetsmannsstaten**. Etter hvert ble **bøndene** en stadig sterkere politisk kraft på Stortinget.

## Et samfunn i endring
- **Befolkningsvekst**: befolkningen ble nesten tredoblet på 1800-tallet. Mange fikk ikke jord, og **husmenn** og fattige slet.
- **Utvandringen**: fra 1825 til 1930 utvandret rundt **800 000** nordmenn, mest til USA. Bare Irland hadde større utvandring i forhold til folketallet.
- **Industrialisering og samferdsel**: tekstilfabrikker, sagbruk og mekaniske verksteder vokste fram. **Jernbanen** kom i 1854, og dampskip knyttet kysten sammen.
- **Folkebevegelser**: **Thranebevegelsen** (1848–1851) organiserte arbeidere og husmenn, og senere vokste **avholdsbevegelsen**, **lekmannsbevegelsen** (Hans Nielsen Hauge hadde startet allerede rundt 1800), **målrørsla** og **kvinnebevegelsen**.
- **Lokalt selvstyre**: **formannskapslovene** (1837) ga kommunene egne folkevalgte styrer.

## Kampen om makten og parlamentarismen
Spørsmålet var hvem som skulle ha makten: kongen og hans embetsmannsregjering, eller Stortinget? Striden sto blant annet om **statsrådsaken** (om statsrådene skulle møte i Stortinget) og kongens **vetorett**. Venstre, ledet av **Johan Sverdrup**, gikk til **riksrett** mot regjeringen, som ble dømt i **1884**. Kongen måtte utnevne Sverdrup til statsminister, og **parlamentarismen** var innført i praksis: regjeringen må ha Stortingets tillit. Samme år ble de første partiene stiftet, **Venstre** og **Høyre**, og i **1887** kom **Arbeiderpartiet**.

## Nasjonsbygging og 1905
På 1800-tallet vokste en sterk norsk **nasjonalfølelse** fram. Kunstnere og forskere «fant» det norske i bondekultur, eventyr, folkemusikk og fjellnatur – **nasjonalromantikken**: Asbjørnsen og Moe, Ivar Aasen, maleren Adolph Tidemand og komponisten **Edvard Grieg**. Senere ble Ibsen og Bjørnson verdenskjente.

Mot slutten av århundret ble det strid om et eget norsk **konsulatvesen** (konsuler som skulle hjelpe den voksende norske handelsflåten). Da kongen nektet å godkjenne loven, gikk regjeringen til **Christian Michelsen** av, og ingen ny regjering kunne dannes. Stortinget vedtok da **7. juni 1905** at kongen hadde sluttet å fungere, og at **unionen var oppløst**. I en **folkeavstemning** i august stemte over 99 % for oppløsning. Etter forhandlinger i **Karlstad** godtok Sverige oppløsningen, og etter en ny folkeavstemning om statsform ble den danske prins Carl norsk konge som **Haakon VII**.

## Demokratiet utvides
- **1898**: allmenn stemmerett for **menn** over 25 år.
- **1901**: begrenset stemmerett for kvinner ved kommunevalg.
- **1913**: allmenn stemmerett for **kvinner** – Norge var blant de første selvstendige landene i verden.`,
`## The road to 1814
Denmark-Norway long stayed out of the Napoleonic Wars, but in 1807 the British attacked Copenhagen and seized the Danish-Norwegian fleet. Denmark-Norway then joined **Napoleon's side**. The British blockaded the coast, and Norway suffered **hardship and famine** because grain from Denmark could not get through. When Napoleon lost, the Danish king had to cede Norway to **Sweden** in the **Treaty of Kiel (14 January 1814)**.

## 1814: the Constitution and the union
The Danish prince **Christian Frederik**, governor in Norway, refused to accept the Treaty of Kiel. He summoned a **constituent assembly** at **Eidsvoll** with 112 representatives from all over the country – officials, farmers, merchants and officers. They were split into an **independence party** and a **union party** (which wanted cooperation with Sweden). On **17 May 1814** they adopted the **Constitution**, and Christian Frederik was elected king.

The Constitution was based on **Enlightenment ideas**: popular sovereignty, **separation of powers** (the Storting, the king/government and the courts) and civil rights. For its time it was very **democratic** – about 40% of men over 25 got the vote – but women, the poor and many others were excluded, and the Constitution banned Jews and Jesuits from entering the country.

Sweden did not accept independence. After a short **war** in summer 1814 the **Convention of Moss** was signed: Norway entered a **union with Sweden** but kept its Constitution with some changes. On 4 November 1814 the Storting elected the Swedish king as king of Norway.

## The officials' state (1814–1884)
In the union Norway and Sweden shared a **king and foreign policy**, but Norway had its own government, parliament, laws and army. Real power in Norway lay with the **officials** – a small, highly educated elite of priests, judges, officers and civil servants. The period is therefore called the **officials' state**. Over time the **farmers** became an ever stronger force in the Storting.

## A changing society
- **Population growth**: the population nearly tripled in the 1800s. Many got no land, and **cottars** and the poor struggled.
- **Emigration**: from 1825 to 1930 about **800,000** Norwegians emigrated, mostly to the USA. Only Ireland had higher emigration relative to its population.
- **Industrialisation and transport**: textile mills, sawmills and engineering works grew. The **railway** came in 1854, and steamships linked the coast.
- **Popular movements**: the **Thrane movement** (1848–1851) organised workers and cottars, and later the **temperance movement**, **lay religious movement** (Hans Nielsen Hauge had started around 1800), the **language movement** and the **women's movement** grew.
- **Local self-government**: the **municipal laws** (1837) gave municipalities elected councils.

## The struggle for power and parliamentarism
The question was who should hold power: the king and his government of officials, or the Storting? The conflict centred on whether ministers should attend the Storting and on the king's **veto**. The Liberals (Venstre), led by **Johan Sverdrup**, brought an **impeachment** case against the government, which was convicted in **1884**. The king had to appoint Sverdrup prime minister, and **parliamentarism** was established in practice: the government needs the confidence of the Storting. The same year the first parties were founded, **Venstre** and **Høyre**, and in **1887** came the **Labour Party**.

## Nation-building and 1905
In the 1800s a strong Norwegian **national feeling** grew. Artists and scholars 'found' Norwegianness in peasant culture, fairy tales, folk music and mountain scenery – **national romanticism**: Asbjørnsen and Moe, Ivar Aasen, the painter Adolph Tidemand and the composer **Edvard Grieg**. Later Ibsen and Bjørnson became world-famous.

Towards the end of the century a dispute arose over a separate Norwegian **consular service** (consuls to help the growing Norwegian merchant fleet). When the king refused to sanction the law, **Christian Michelsen's** government resigned and no new government could be formed. The Storting then declared on **7 June 1905** that the king had ceased to function and that **the union was dissolved**. In a **referendum** in August over 99% voted for dissolution. After negotiations in **Karlstad** Sweden accepted, and after another referendum on the form of government the Danish Prince Carl became king of Norway as **Haakon VII**.

## Democracy expands
- **1898**: universal suffrage for **men** over 25.
- **1901**: limited voting rights for women in local elections.
- **1913**: universal suffrage for **women** – Norway was among the first independent countries in the world.`);

DEEP("VGHIS", "Den kalde krigen og etterkrigstiden",
`## Hvorfor ble det kald krig?
USA og Sovjetunionen var allierte mot Hitler, men hadde helt ulike systemer:
- **USA og Vesten**: **demokrati** med frie valg, **kapitalisme** (markedsøkonomi og privat eiendom) og ytringsfrihet.
- **Sovjetunionen og Østblokken**: **kommunisme** med **ettpartistat**, **planøkonomi** (staten bestemmer produksjonen) og sensur.

Etter krigen sørget Sovjetunionen for kommunistiske regjeringer i landene Den røde armé hadde befridd i Øst-Europa. Churchill sa i 1946 at et **jernteppe** hadde senket seg over Europa. USA svarte med **Truman-doktrinen** (1947) om å **demme opp** for kommunismen og med **Marshallplanen**, økonomisk hjelp til gjenreisingen av Vest-Europa. Det kalles en **kald** krig fordi supermaktene aldri kriget direkte mot hverandre – det ville ført til atomkrig.

## Viktige kriser og hendelser
- **Tyskland delt**: Tyskland og Berlin ble delt i fire okkupasjonssoner. Under **Berlinblokaden** (1948–49) stengte Sovjet vegene til Vest-Berlin, og vestmaktene fløy inn mat og kull i nesten et år (**luftbroen**). I 1949 ble Tyskland delt i **Vest-Tyskland** (BRD) og **Øst-Tyskland** (DDR).
- **Allianser**: **NATO** (1949) i vest og **Warszawapakten** (1955) i øst.
- **Atomkappløpet**: Sovjet fikk atombomben i 1949. Begge sider bygde tusenvis av atomvåpen, og «terrorbalansen» – at begge kunne utslette hverandre – holdt dem fra å angripe.
- **Koreakrigen** (1950–53): Nord-Korea (støttet av Kina og Sovjet) angrep Sør-Korea (støttet av USA og FN). Krigen endte uavgjort, og Korea er fortsatt delt.
- **Romkappløpet**: Sovjet sendte opp **Sputnik** (1957) og det første mennesket, **Jurij Gagarin** (1961). USA landet på **månen** i 1969.
- **Berlinmuren** (1961): DDR bygde muren for å stoppe flukten vestover.
- **Cubakrisen** (oktober 1962): Sovjet plasserte atomraketter på Cuba. USA blokkerte øya, og i 13 dager sto verden nær atomkrig før Sovjet trakk rakettene tilbake.
- **Vietnamkrigen** (ca. 1955–1975): USA kjempet mot kommunistiske Nord-Vietnam, men tapte. Krigen skapte store protester i Vesten.
- **Opprør i øst**: Sovjet slo ned opprør i **Ungarn** (1956) og **Tsjekkoslovakia** (1968).

## Slutten på den kalde krigen
På 1980-tallet var Sovjet-økonomien i dyp krise. **Mikhail Gorbatsjov** innførte **glasnost** (åpenhet) og **perestrojka** (omstilling). Fagbevegelsen **Solidaritet** i Polen og fredelige demonstrasjoner i flere land presset regimene. **9. november 1989 falt Berlinmuren**, Tyskland ble samlet i 1990, og i **desember 1991** gikk Sovjetunionen i oppløsning i 15 land.

## Norge etter 1945
- **Gjenreisingen**: Finnmark og Nord-Troms måtte bygges opp igjen fra grunnen. Under **Einar Gerhardsen** (statsminister i store deler av 1945–1965) styrte Arbeiderpartiet med sterk statlig planlegging. Perioden kalles ofte **Ap-staten**.
- **Velferdsstaten**: barnetrygd (1946), syketrygd for alle (1956) og **folketrygden** (1967). Utdanning ble gratis, og levestandarden steg kraftig.
- **Utenrikspolitikk**: Norge gikk fra nøytralitet til **NATO** i 1949, men tillot ikke **utenlandske baser** eller **atomvåpen** på norsk jord i fredstid – for ikke å provosere Sovjetunionen, som Norge grenset mot i nord.
- **EF/EU**: nordmenn sa **nei** til medlemskap i **1972** og **1994**. Norge er i stedet med i **EØS** (fra 1994).
- **Oljealderen**: **Ekofisk** ble funnet i 1969. Staten opprettet **Statoil** (1972) og senere **oljefondet** (1990) for å spare inntektene til framtidige generasjoner.
- **Nye bevegelser**: kvinnebevegelsen (blant annet abortloven 1978 og likestillingsloven 1978), miljøbevegelsen og innvandring fra 1970-tallet endret Norge.`,
`## Why was there a Cold War?
The USA and the Soviet Union were allies against Hitler but had completely different systems:
- **The USA and the West**: **democracy** with free elections, **capitalism** (market economy and private property) and freedom of speech.
- **The Soviet Union and the Eastern Bloc**: **communism** with a **one-party state**, **planned economy** (the state decides production) and censorship.

After the war the Soviet Union installed communist governments in the Eastern European countries the Red Army had liberated. Churchill said in 1946 that an **Iron Curtain** had descended across Europe. The USA responded with the **Truman Doctrine** (1947) to **contain** communism and with the **Marshall Plan**, economic aid to rebuild Western Europe. It is called a **cold** war because the superpowers never fought each other directly – that would have meant nuclear war.

## Key crises and events
- **Germany divided**: Germany and Berlin were split into four occupation zones. During the **Berlin Blockade** (1948–49) the Soviets closed the routes to West Berlin, and the Western powers flew in food and coal for almost a year (the **airlift**). In 1949 Germany was divided into **West Germany** (FRG) and **East Germany** (GDR).
- **Alliances**: **NATO** (1949) in the west and the **Warsaw Pact** (1955) in the east.
- **The nuclear arms race**: the Soviets got the bomb in 1949. Both sides built thousands of nuclear weapons, and the 'balance of terror' – that each could destroy the other – kept them from attacking.
- **The Korean War** (1950–53): North Korea (backed by China and the USSR) attacked South Korea (backed by the US and the UN). The war ended in stalemate and Korea is still divided.
- **The space race**: the Soviets launched **Sputnik** (1957) and the first human, **Yuri Gagarin** (1961). The USA landed on the **Moon** in 1969.
- **The Berlin Wall** (1961): the GDR built the wall to stop people fleeing west.
- **The Cuban Missile Crisis** (October 1962): the Soviets placed nuclear missiles in Cuba. The US blockaded the island, and for 13 days the world was close to nuclear war before the Soviets withdrew the missiles.
- **The Vietnam War** (c. 1955–1975): the USA fought communist North Vietnam but lost. The war caused huge protests in the West.
- **Uprisings in the east**: the Soviets crushed uprisings in **Hungary** (1956) and **Czechoslovakia** (1968).

## The end of the Cold War
By the 1980s the Soviet economy was in deep crisis. **Mikhail Gorbachev** introduced **glasnost** (openness) and **perestroika** (restructuring). The **Solidarity** trade union in Poland and peaceful demonstrations in several countries put pressure on the regimes. **On 9 November 1989 the Berlin Wall fell**, Germany was reunited in 1990, and in **December 1991** the Soviet Union broke up into 15 countries.

## Norway after 1945
- **Reconstruction**: Finnmark and northern Troms had to be rebuilt from scratch. Under **Einar Gerhardsen** (prime minister for much of 1945–1965) Labour governed with strong state planning. The period is often called the **'Labour state'**.
- **The welfare state**: child benefit (1946), sickness insurance for all (1956) and **National Insurance** (1967). Education became free and living standards rose sharply.
- **Foreign policy**: Norway went from neutrality to **NATO** in 1949, but did not allow **foreign bases** or **nuclear weapons** on Norwegian soil in peacetime – so as not to provoke the Soviet Union, its neighbour in the north.
- **EC/EU**: Norwegians voted **no** to membership in **1972** and **1994**. Instead Norway is in the **EEA** (from 1994).
- **The oil age**: **Ekofisk** was found in 1969. The state founded **Statoil** (1972) and later the **oil fund** (1990) to save the income for future generations.
- **New movements**: the women's movement (including the abortion act and the gender equality act, both 1978), the environmental movement and immigration from the 1970s changed Norway.`);

DEEP("VGHIS", "Samer og nasjonale minoriteter",
`## Hvem er samene?
Samene er et **urfolk** som har bodd i **Sápmi** – det samiske området i Norge, Sverige, Finland og Russland – lenge før dagens grenser ble trukket. Det bor trolig rundt 50 000–65 000 samer i Norge (det finnes ingen offisiell telling). Det finnes flere **samiske språk**, blant annet nordsamisk, lulesamisk og sørsamisk. Tradisjonelle næringer er **reindrift**, fiske, jordbruk og duodji (samisk håndverk), men i dag lever de fleste samer av helt vanlige yrker, og mange bor i byer.

## Fornorskingspolitikken
Fra rundt **1850** førte staten en bevisst **fornorskingspolitikk**. Målet var at samer og kvener skulle bli «norske» i språk og kultur. Bakgrunnen var **nasjonalisme** (én nasjon, ett språk), **sikkerhetspolitikk** (frykt for finsk og russisk innflytelse i nord) og **sosialdarwinistiske** ideer om at noen folk sto lavere enn andre.
- **Skolen** var det viktigste verktøyet. Samisk og kvensk ble forbudt eller sterkt begrenset i undervisningen, og mange barn bodde på **internatskoler** langt hjemmefra.
- **Jordsalgsloven** (1902) sa at bare de som kunne norsk, fikk kjøpe statens jord i Finnmark.
- Mange skjulte sin samiske bakgrunn, og flere generasjoner mistet språket.

## Samisk organisering
Samer protesterte og organiserte seg. Det første **samiske landsmøtet** ble holdt i Trondheim **6. februar 1917**, organisert blant andre av **Elsa Laula Renberg** – i dag er datoen **samenes nasjonaldag**. Etter andre verdenskrig vokste samebevegelsen, og fornorskingen ble gradvis myket opp.

## Alta-saken og et vendepunkt
I **1979–1981** protesterte samer og miljøvernere mot at **Altaelva** skulle demmes ned. Det ble sultestreik utenfor Stortinget og store aksjoner ved anleggsområdet. Kraftverket ble bygd, men saken satte samiske rettigheter på dagsordenen og førte til:
- **Sameloven** (1987).
- Grunnlovsparagrafen om samene (1988), i dag **§ 108**: staten skal legge til rette for at samene kan sikre og utvikle språk, kultur og samfunnsliv.
- **Sametinget** (1989), et folkevalgt organ i **Karasjok**.
- Norge var først i verden til å ratifisere **ILO-konvensjon 169** om urfolk (1990).
- **Kong Harald** ba om unnskyldning for urett mot samene i 1997.
- **Finnmarksloven** (2005) ga folk i Finnmark – samer og andre – mer styring over grunn og naturressurser.

## Nasjonale minoriteter
Norge har fem anerkjente **nasjonale minoriteter**, grupper med lang tilknytning til landet:
- **Kvener/norskfinner**: finskspråklige som innvandret til Nord-Norge fra 1700-tallet. Kvensk er eget språk.
- **Skogfinner**: kom fra Finland på 15- og 1600-tallet og ryddet skog i Østlandet (Finnskogen).
- **Jøder**: fikk komme til Norge etter at jødeparagrafen ble fjernet i 1851. Under andre verdenskrig ble norske jøder deportert og drept.
- **Rom**: kom til Norge fra rundt 1900. De ble nektet innreise i 1934, og mange omkom i Holocaust.
- **Romanifolket/taterne**: har vært i Norge i over 500 år. Mange ble utsatt for tvangssterilisering og fjerning av barn, ofte gjennom Norsk misjon blant hjemløse.

Alle disse gruppene ble utsatt for **assimilering** eller diskriminering. I **2023** la **Sannhets- og forsoningskommisjonen** fram rapporten om fornorskingen og uretten mot samer, kvener/norskfinner og skogfinner – et viktig steg i et forsoningsarbeid som fortsatt pågår.`,
`## Who are the Sami?
The Sami are an **indigenous people** who have lived in **Sápmi** – the Sami area in Norway, Sweden, Finland and Russia – long before today's borders were drawn. There are probably around 50,000–65,000 Sami in Norway (there is no official count). There are several **Sami languages**, including North, Lule and South Sami. Traditional livelihoods are **reindeer herding**, fishing, farming and duodji (Sami handicraft), but today most Sami have ordinary jobs, and many live in cities.

## The Norwegianisation policy
From around **1850** the state pursued a deliberate **Norwegianisation policy**. The aim was for the Sami and Kvens to become 'Norwegian' in language and culture. The background was **nationalism** (one nation, one language), **security policy** (fear of Finnish and Russian influence in the north) and **social Darwinist** ideas that some peoples were inferior.
- **School** was the main tool. Sami and Kven were banned or strictly limited in teaching, and many children lived at **boarding schools** far from home.
- The **Land Sale Act** (1902) said only those who knew Norwegian could buy state land in Finnmark.
- Many hid their Sami background, and several generations lost the language.

## Sami organisation
The Sami protested and organised. The first **Sami congress** met in Trondheim on **6 February 1917**, organised among others by **Elsa Laula Renberg** – today the date is **Sami National Day**. After the Second World War the Sami movement grew, and Norwegianisation was gradually eased.

## The Alta case and a turning point
In **1979–1981** Sami and environmentalists protested against damming the **Alta river**. There were hunger strikes outside the Storting and big protests at the construction site. The power plant was built, but the case put Sami rights on the agenda and led to:
- The **Sami Act** (1987).
- The constitutional article on the Sami (1988), today **Article 108**: the state must enable the Sami to preserve and develop their language, culture and way of life.
- The **Sami Parliament** (1989), an elected body in **Karasjok**.
- Norway was the first country to ratify **ILO Convention 169** on indigenous peoples (1990).
- **King Harald** apologised for injustice against the Sami in 1997.
- The **Finnmark Act** (2005) gave the people of Finnmark – Sami and others – more control over land and natural resources.

## National minorities
Norway has five recognised **national minorities**, groups with long ties to the country:
- **Kvens/Norwegian Finns**: Finnish speakers who settled in northern Norway from the 1700s. Kven is a language of its own.
- **Forest Finns**: came from Finland in the 1500s and 1600s and cleared forest in eastern Norway (Finnskogen).
- **Jews**: allowed into Norway after the 'Jew clause' was removed in 1851. During the Second World War Norwegian Jews were deported and murdered.
- **Roma**: came to Norway from around 1900. They were refused entry in 1934, and many died in the Holocaust.
- **Romani people/Tater**: have been in Norway for over 500 years. Many suffered forced sterilisation and removal of children, often through the Norwegian Mission among the Homeless.

All these groups faced **assimilation** or discrimination. In **2023** the **Truth and Reconciliation Commission** presented its report on Norwegianisation and the injustice against the Sami, Kvens/Norwegian Finns and Forest Finns – an important step in reconciliation work that is still going on.`);

// Spørsmål til fordypningen (legges bakerst, så lagret statistikk beholder betydningen).
function DQS(code, title, list){ const c = COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) BIQ(code, u, list); }
DQS("VGHIS", "Verdenskrigene", [
 ["Hvem var erkehertug Franz Ferdinand?", ["Tronarvingen i Østerrike-Ungarn", "Keiseren av Tyskland", "Kongen av Serbia", "En russisk general"], "Han skulle bli neste keiser i Østerrike-Ungarn og ble skutt i Sarajevo 28. juni 1914.", "Who was Archduke Franz Ferdinand?", ["The heir to the throne of Austria-Hungary", "The German Emperor", "The King of Serbia", "A Russian general"], "He was to become the next emperor of Austria-Hungary and was shot in Sarajevo on 28 June 1914."],
 ["Hvilke land var med i Trippelententen da første verdenskrig startet?", ["Storbritannia, Frankrike og Russland", "Tyskland, Østerrike-Ungarn og Italia", "USA, Storbritannia og Japan", "Frankrike, Tyskland og Russland"], "Mot dem sto sentralmaktene Tyskland og Østerrike-Ungarn.", "Which countries were in the Triple Entente when WWI began?", ["Britain, France and Russia", "Germany, Austria-Hungary and Italy", "USA, Britain and Japan", "France, Germany and Russia"], "Against them stood the Central Powers, Germany and Austria-Hungary."],
 ["Hva sto forkortelsen MAIN for som langsiktige årsaker til første verdenskrig?", ["Militarisme, allianser, imperialisme og nasjonalisme", "Monarki, anarki, industri og nøytralitet", "Marx, Adolf, Italia og Napoleon", "Malmer, arbeid, inflasjon og nød"], "Fire forhold som bygde opp spenningen i Europa før 1914.", "What did the acronym MAIN stand for as long-term causes of WWI?", ["Militarism, alliances, imperialism and nationalism", "Monarchy, anarchy, industry and neutrality", "Marx, Adolf, Italy and Napoleon", "Minerals, aid, inflation and need"], "Four factors that built up tension in Europe before 1914."],
 ["Hvorfor gikk Storbritannia inn i krigen i august 1914?", ["Tyskland marsjerte gjennom det nøytrale Belgia", "Russland angrep Storbritannia", "Franz Ferdinand var britisk", "USA ba om det"], "Storbritannia hadde garantert Belgias nøytralitet.", "Why did Britain enter the war in August 1914?", ["Germany marched through neutral Belgium", "Russia attacked Britain", "Franz Ferdinand was British", "The USA asked it to"], "Britain had guaranteed Belgian neutrality."],
 ["Hva var Schlieffenplanen?", ["Tysklands plan om å slå Frankrike raskt gjennom Belgia og så vende seg mot Russland", "En fredsplan fra USA", "Britisk plan for flåtekrig", "Planen for Versaillestraktaten"], "Planen stoppet ved Marne i 1914, og krigen ble en skyttergravskrig.", "What was the Schlieffen Plan?", ["Germany's plan to defeat France quickly through Belgium and then turn on Russia", "An American peace plan", "A British naval plan", "The plan for the Treaty of Versailles"], "It stalled at the Marne in 1914 and the war became trench warfare."],
 ["Hvorfor gikk USA inn i første verdenskrig i 1917?", ["Tysk ubåtkrig og Zimmermann-telegrammet", "Japan angrep Pearl Harbor", "Russland ba om hjelp", "Franz Ferdinand ble drept"], "Ubåtene senket skip uten forvarsel, og Tyskland prøvde å få Mexico med mot USA.", "Why did the USA enter WWI in 1917?", ["German submarine warfare and the Zimmermann Telegram", "Japan attacked Pearl Harbor", "Russia asked for help", "Franz Ferdinand was killed"], "Submarines sank ships without warning, and Germany tried to get Mexico to join against the US."],
 ["Hvilke land var de viktigste aksemaktene i andre verdenskrig?", ["Tyskland, Italia og Japan", "Tyskland, Sovjetunionen og Japan", "Italia, Spania og Frankrike", "Tyskland, Østerrike-Ungarn og Tyrkia"], "De allierte var blant andre Storbritannia, Sovjetunionen og USA.", "Which were the main Axis powers in WWII?", ["Germany, Italy and Japan", "Germany, the Soviet Union and Japan", "Italy, Spain and France", "Germany, Austria-Hungary and Turkey"], "The Allies included Britain, the Soviet Union and the USA."],
 ["Hva var Molotov–Ribbentrop-pakten (1939)?", ["En ikke-angrepspakt der Hitler og Stalin i hemmelighet delte Øst-Europa", "En fredsavtale etter krigen", "Avtalen som opprettet NATO", "En handelsavtale mellom USA og Sovjet"], "Pakten gjorde det mulig for Hitler å angripe Polen uten å frykte Sovjet.", "What was the Molotov–Ribbentrop Pact (1939)?", ["A non-aggression pact in which Hitler and Stalin secretly divided Eastern Europe", "A post-war peace treaty", "The agreement that founded NATO", "A US–Soviet trade deal"], "It let Hitler attack Poland without fearing the Soviets."],
 ["Hvorfor ble krysseren Blücher viktig 9. april 1940?", ["Den ble senket ved Oscarsborg, så kongen og regjeringen rakk å flykte fra Oslo", "Den fraktet kongen til London", "Den bombet Narvik", "Den var Norges største krigsskip"], "Forsinkelsen ga tid til å evakuere kongen, regjeringen, Stortinget og gullbeholdningen.", "Why was the cruiser Blücher important on 9 April 1940?", ["It was sunk at Oscarsborg, so the king and government had time to flee Oslo", "It took the king to London", "It bombed Narvik", "It was Norway's largest warship"], "The delay gave time to evacuate the king, government, Storting and gold reserves."],
 ["Hvem hadde den reelle makten i Norge under okkupasjonen?", ["Rikskommissær Josef Terboven", "Kong Haakon VII", "Johan Nygaardsvold", "Einar Gerhardsen"], "Quisling og NS samarbeidet med tyskerne, men Terboven bestemte.", "Who held real power in occupied Norway?", ["Reichskommissar Josef Terboven", "King Haakon VII", "Johan Nygaardsvold", "Einar Gerhardsen"], "Quisling and NS collaborated, but Terboven decided."],
 ["Hva var Nortraship?", ["Organisasjonen som drev den norske handelsflåten for de allierte", "En tysk marineenhet", "Et norsk krigsskip", "En motstandsavis"], "Rundt 1000 skip seilte for de allierte, og om lag 3700 sjøfolk omkom.", "What was Nortraship?", ["The organisation running Norway's merchant fleet for the Allies", "A German naval unit", "A Norwegian warship", "A resistance newspaper"], "About 1,000 ships sailed for the Allies, and some 3,700 seamen died."],
 ["Hva var tungtvannsaksjonen (1943)?", ["Sabotasje mot produksjonen av tungtvann på Vemork", "Bombing av Berlin", "Evakueringen av Finnmark", "Kampene ved Narvik"], "Tungtvann kunne brukes i Tysklands atomforskning.", "What was the heavy water sabotage (1943)?", ["Sabotage of heavy water production at Vemork", "The bombing of Berlin", "The evacuation of Finnmark", "The fighting at Narvik"], "Heavy water could be used in Germany's nuclear research."]
]);
DQS("VGHIS", "Vikingtid og middelalder", [
 ["Hva var tinget i vikingtiden?", ["Et møte der frie menn holdt rett og vedtok lover", "En type langskip", "Et hedensk tempel", "Kongens hær"], "Tinget var både domstol og lovgivende forsamling.", "What was the thing in the Viking Age?", ["An assembly where free men judged cases and made laws", "A type of longship", "A pagan temple", "The king's army"], "The thing was both court and law-making assembly."],
 ["Hvilket land bosatte vikinger seg på fra ca. 870?", ["Island", "Australia", "Japan", "Brasil"], "Senere dro de videre til Grønland og Vinland.", "Which country did Vikings settle from c. 870?", ["Iceland", "Australia", "Japan", "Brazil"], "Later they went on to Greenland and Vinland."],
 ["Hvem var konge da Norgesveldet var størst?", ["Håkon Håkonsson", "Harald Hårfagre", "Olav Tryggvason", "Christian 3."], "Rundt 1260 hørte Island, Grønland, Færøyene, Shetland og Orknøy til riket.", "Who was king when the Norwegian realm was at its largest?", ["Haakon Haakonsson", "Harald Fairhair", "Olaf Tryggvason", "Christian III"], "Around 1260 the realm included Iceland, Greenland, the Faroes, Shetland and Orkney."],
 ["Hva var Hansaen?", ["Et forbund av tyske handelsbyer som kontrollerte mye av handelen i Bergen", "En norsk kongeslekt", "Et kloster i Trondheim", "En vikinghær"], "Tyske kjøpmenn på Bryggen kjøpte tørrfisk og solgte korn.", "What was the Hanseatic League?", ["A league of German trading towns that controlled much of Bergen's trade", "A Norwegian royal dynasty", "A monastery in Trondheim", "A Viking army"], "German merchants at Bryggen bought stockfish and sold grain."]
]);
DQS("VGHIS", "Reformasjon, opplysningstid og revolusjoner", [
 ["Hva var avlat?", ["Brev fra kirken som skulle forkorte straffen i skjærsilden", "En skatt til kongen", "En bibeloversettelse", "Et kloster"], "Luther protesterte mot avlatshandelen i 1517.", "What were indulgences?", ["Letters from the Church meant to shorten punishment in purgatory", "A royal tax", "A Bible translation", "A monastery"], "Luther protested against the sale of indulgences in 1517."],
 ["Når ble eneveldet innført i Danmark-Norge?", ["1660", "1537", "1814", "1789"], "Eneveldet varte til Grunnloven i 1814.", "When was absolutism introduced in Denmark-Norway?", ["1660", "1537", "1814", "1789"], "Absolutism lasted until the 1814 Constitution."],
 ["Hvilken opplysningsfilosof mente at alle har naturlige rettigheter til liv, frihet og eiendom?", ["John Locke", "Montesquieu", "Rousseau", "Voltaire"], "Locke påvirket både den amerikanske uavhengighetserklæringen og Grunnloven.", "Which Enlightenment philosopher held that everyone has natural rights to life, liberty and property?", ["John Locke", "Montesquieu", "Rousseau", "Voltaire"], "Locke influenced both the US Declaration of Independence and the Norwegian Constitution."],
 ["Hva skjedde 14. juli 1789?", ["Folket i Paris stormet Bastillen", "Luther slo opp tesene", "USA erklærte seg uavhengig", "Napoleon ble keiser"], "Dagen er Frankrikes nasjonaldag.", "What happened on 14 July 1789?", ["The people of Paris stormed the Bastille", "Luther posted his theses", "The USA declared independence", "Napoleon became emperor"], "The day is France's national day."]
]);
DQS("VGHIS", "Norge 1814–1905", [
 ["Hvorfor måtte Danmark gi fra seg Norge i 1814?", ["Danmark-Norge hadde vært på Napoleons side og tapte", "Norge kjøpte seg fri", "Sverige vant en krig mot Norge i 1812", "Norge stemte for det"], "I Kielfreden måtte kongen avstå Norge til Sverige.", "Why did Denmark have to give up Norway in 1814?", ["Denmark-Norway had sided with Napoleon and lost", "Norway bought its freedom", "Sweden won a war against Norway in 1812", "Norway voted for it"], "In the Treaty of Kiel the king had to cede Norway to Sweden."],
 ["Hva var embetsmannsstaten?", ["Perioden 1814–1884 da en liten elite av embetsmenn hadde makten", "Unionen med Danmark", "Tiden etter 1905", "Et parti på Stortinget"], "Prester, dommere, offiserer og byråkrater styrte landet.", "What was the officials' state?", ["The period 1814–1884 when a small elite of officials held power", "The union with Denmark", "The time after 1905", "A party in the Storting"], "Priests, judges, officers and civil servants ran the country."],
 ["Hvor mange nordmenn utvandret omtrent mellom 1825 og 1930?", ["800 000", "8 000", "80 000", "8 millioner"], "De fleste dro til USA.", "About how many Norwegians emigrated between 1825 and 1930?", ["800,000", "8,000", "80,000", "8 million"], "Most went to the USA."],
 ["Hvilken sak utløste unionsoppløsningen i 1905?", ["Kravet om et eget norsk konsulatvesen", "Stemmerett for kvinner", "Jernbanen", "Kristningen"], "Kongen nektet å godkjenne loven, og regjeringen gikk av.", "What issue triggered the dissolution of the union in 1905?", ["The demand for a Norwegian consular service", "Votes for women", "The railway", "Christianisation"], "The king refused to sanction the law and the government resigned."]
]);
DQS("VGHIS", "Den kalde krigen og etterkrigstiden", [
 ["Hva var Marshallplanen?", ["Amerikansk økonomisk hjelp til gjenreising av Vest-Europa", "Sovjets plan for Øst-Europa", "NATOs forsvarsplan", "Planen for Berlinmuren"], "Hjelpen skulle også hindre at kommunismen spredte seg.", "What was the Marshall Plan?", ["US economic aid to rebuild Western Europe", "The Soviet plan for Eastern Europe", "NATO's defence plan", "The plan for the Berlin Wall"], "The aid was also meant to stop communism spreading."],
 ["Hva var luftbroen til Berlin (1948–49)?", ["Vestmaktene fløy inn mat og kull da Sovjet stengte vegene til Vest-Berlin", "En bro over Spree", "Flyangrep på Berlin", "Romkappløpet"], "Blokaden varte i nesten et år.", "What was the Berlin Airlift (1948–49)?", ["The Western powers flew in food and coal when the Soviets closed routes to West Berlin", "A bridge over the Spree", "Air raids on Berlin", "The space race"], "The blockade lasted almost a year."],
 ["Hvorfor tillot ikke Norge utenlandske baser i fredstid?", ["For ikke å provosere Sovjetunionen", "Fordi NATO forbød det", "Fordi det var for dyrt", "Fordi Grunnloven forbyr hærer"], "Norge grenset mot Sovjet i nord og førte en forsiktig politikk.", "Why did Norway not allow foreign bases in peacetime?", ["So as not to provoke the Soviet Union", "Because NATO banned it", "Because it was too expensive", "Because the Constitution bans armies"], "Norway bordered the Soviet Union in the north and acted cautiously."],
 ["Hva betyr glasnost og perestrojka?", ["Åpenhet og omstilling", "Kommunisme og kapitalisme", "Krig og fred", "Øst og vest"], "Gorbatsjovs reformer på 1980-tallet.", "What do glasnost and perestroika mean?", ["Openness and restructuring", "Communism and capitalism", "War and peace", "East and west"], "Gorbachev's reforms in the 1980s."]
]);
DQS("VGHIS", "Samer og nasjonale minoriteter", [
 ["Hva heter det samiske området som strekker seg over fire land?", ["Sápmi", "Finnmark", "Lappland", "Karasjok"], "Sápmi omfatter deler av Norge, Sverige, Finland og Russland.", "What is the Sami area spanning four countries called?", ["Sápmi", "Finnmark", "Lapland", "Karasjok"], "Sápmi covers parts of Norway, Sweden, Finland and Russia."],
 ["Hvilken grunn var IKKE en del av bakgrunnen for fornorskingspolitikken?", ["Ønsket om å styrke samisk språk", "Nasjonalisme", "Frykt for finsk og russisk innflytelse", "Sosialdarwinistiske ideer"], "Politikken skulle tvert imot gjøre samer og kvener «norske».", "Which was NOT part of the background to Norwegianisation?", ["A wish to strengthen Sami languages", "Nationalism", "Fear of Finnish and Russian influence", "Social Darwinist ideas"], "On the contrary, the policy aimed to make Sami and Kvens 'Norwegian'."],
 ["Hvem var med på å organisere det første samiske landsmøtet i 1917?", ["Elsa Laula Renberg", "Ivar Aasen", "Henrik Wergeland", "Gro Harlem Brundtland"], "Møtet ble holdt i Trondheim 6. februar – samenes nasjonaldag.", "Who helped organise the first Sami congress in 1917?", ["Elsa Laula Renberg", "Ivar Aasen", "Henrik Wergeland", "Gro Harlem Brundtland"], "It met in Trondheim on 6 February – Sami National Day."],
 ["Hvilken gruppe er IKKE en nasjonal minoritet i Norge?", ["Samer (de er urfolk)", "Kvener/norskfinner", "Skogfinner", "Rom"], "Samene har status som urfolk, som er noe annet enn nasjonal minoritet.", "Which group is NOT a national minority in Norway?", ["The Sami (they are indigenous)", "Kvens/Norwegian Finns", "Forest Finns", "Roma"], "The Sami have indigenous status, which is different from national minority status."]
]);
DQS("VGHIS", "Historiefaget og kildekritikk", [
 ["Hva betyr det at en kilde er førstehånds?", ["Opphavspersonen var selv til stede", "Kilden er den eldste", "Kilden er skrevet av en historiker", "Kilden er digital"], "Annenhånds betyr at hen har hørt det fra andre.", "What does it mean that a source is first-hand?", ["The author was present", "It is the oldest source", "It was written by a historian", "It is digital"], "Second-hand means they heard it from others."],
 ["Hva er tendens i en kilde?", ["At opphavspersonen har interesse av å framstille saken på en bestemt måte", "At kilden er gammel", "At kilden er skrevet for hånd", "At kilden er oversatt"], "En tendensiøs kilde kan likevel være nyttig – men må brukes kritisk.", "What is bias in a source?", ["The author has an interest in presenting things a certain way", "The source is old", "It is handwritten", "It is translated"], "A biased source can still be useful – but must be used critically."],
 ["Hva er forskjellen på strukturer og aktører i historien?", ["Strukturer er forhold som økonomi og teknologi, aktører er personer og grupper som tar valg", "Strukturer er bygninger, aktører er skuespillere", "Det er det samme", "Aktører er bare konger"], "Gode forklaringer bruker begge.", "What is the difference between structures and actors in history?", ["Structures are conditions like economy and technology; actors are people and groups who make choices", "Structures are buildings, actors are performers", "They are the same", "Actors are only kings"], "Good explanations use both."]
]);
})();
