# Oppgaver for Claude i terminal

Kjør i repo-mappen, for eksempel: `claude "Les docs/OPPGAVER_TERMINAL.md og gjør alle oppgavene der."`

---

Du jobber i Axle-repoet (axle.no). Les `CLAUDE.md` først og følg den. Svar meg på norsk. Kvalitet går foran nye funksjoner. Jobb deg gjennom oppgavene i rekkefølge, og commit etter hver ferdige oppgave. Kjør `python3 build.py` og `npm test` før hver commit. Testene må være grønne. Ikke legg nøkler eller tokens i repoet.

**Hold denne fila oppdatert underveis.** Statuslista rett under er fasiten for hvor langt arbeidet har kommet:

* Når du starter på en oppgave: sett den til `[~] pågår`.
* Når den er ferdig: sett den til `[x] ferdig`, med dato og en kort linje om hva som ble gjort, og eventuelt hva som gjenstår.
* Hvis den er blokkert: sett den til `[!] blokkert`, med årsak.
* Ta med endringen i denne fila i samme commit som oppgaven.
* Hvis økten blir avbrutt: les statuslista først neste gang, og fortsett der den slapp. Ikke gjør ferdige oppgaver på nytt.

## Status

- [x] 1. «Lær først»-leksjoner i grunnskolen – ferdig 2026-10-09: 35 leksjoner (lessons.js, figurer i figs_lf.js) for 32 av 38 enheter i barn/ungdom, med krokodillemunn, klosser, tallinje, tierramme, klokke, pizza, termometer, heis, skålvekt, Pytagoras-ruter m.m. Kommer automatisk før første oppgave og ligger som «Lær: …» under enheten (#/laer/<id>). Test: tools/test_lessons.js (i npm test), figurene sjekket med `check_figs.js --lf`. Gjenstår: ingen leksjon for Koding, Kroppen, Vær og klima, Celler, Økologi og Universet (mest faktastoff).
- [x] 2. Illustrasjonene på oppgavene skal aldri forvirre – ferdig 2026-10-09: grunnskolefigurene tar oppgavens tall (gs_place, gs_numline, gs_array, gs_share, gs_clock, gs_coins, gs_pizza, gs_decimal, gs_percent, gs_area m.fl.); 37 generatorer og 5 faste oppgaver legger ved figuren med FIGQ (learn.js). Før svaret tegnes figuren uten det som avslører svaret, etter svaret i sin helhet. I barn/ungdom vises ellers bare temapiktogrammet; i andre fag er faste figurer merket «Eksempel» og droppes hvis tallene kan forveksles. Test: tools/test_qart.js (i npm test).
- [x] 3. Oppgavetekster som ramser opp svaralternativene – ferdig 2026-10-09: «Hvilket tall er størst?» / «Which number is biggest?» i GS14. Søk i alle fag (faste oppgaver, generatorer, drill, førerkort, en_static) fant ingen andre med formen «a, b, c eller d?». Ny test tools/test_optlist.js (i npm test) feiler hvis alle alternativene står ramset opp med eller/or; datasett i teksten (typetall av 3, 5, 5 …) og kode teller ikke.
- [x] 4. Logo på de statiske sidene – ferdig 2026-10-09: A-merket (/icons/logo-192.png, 30 px, avrundede hjørner, alt="") foran «Axle» i headeren fra tools/seo.js (about, /en/about, fagsider, emnesider, oversikter) og i privacy.html/terms.html. Sjekket på 375 og 1280 px, lyst og mørkt tema.
- [x] 5. Raskere oppstart: last teori og emnesider per fag – ferdig 2026-10-09: tools/split.js (kalles av build.py) skriver teori og emnesider til release/www/c/<KODE>.js og tar dem ut av hovedpakken, med selvsjekk som stopper bygget hvis innholdet ikke blir likt. cfload.js: ensureCourse(code) med promise-cache, «Laster …» og «Prøv igjen», emnestubber og en liten søkeindeks (ingress og stikkord). Service workeren har en egen fag-cache som overlever nye versjoner; favorittfaget lastes i bakgrunnen. app.bundle.js 7,58 → 4,68 MB rå (−38 %), 2,60 → 1,60 MB gzip (−39 %); første skjerm (4× CPU) 516 → 412 ms (GMAT) og 452 → 405 ms (GS14).
- [x] 6. Uavhengig kontroll av fasiter – ferdig 2026-10-09: tools/test_answers.js (i npm test). SLMR/SKLIN: alle 22 generatorene kjøres 400 ganger med fast seed, svaret regnes ut på nytt fra oppgaveteksten, NEWS2 med egen offisiell tabell (grenseverdiene sjekket). Fire SLMR-generatorer laget urealistiske tall og er strammet inn (≤ 20 ml mikstur per dose, ≤ 4 tabletter, ≤ 999 ml/t, ≤ 100 dråper/min). 182 håndkontrollerte faste spørsmål med kilde: FKB 14, FKMC 13, SLMR 14, SANA 16, SFARM 13, SMIK 10, SKLIN 12, SSYK 11, SLOV 12, JMET 12, JSTAT 10, JAVT 12, JERS 10, JFORV 12, JSTR 11. Én feil fasit rettet (JAVT: heving i forbrukerkjøp krever at mangelen «ikke er uvesentlig», fkjl. § 32). Matte og fysikk: 5 stikkprøver per fag i 21 fag (VG2P 4, har bare 4 generatorer).
- [x] 7. Faglig gjennomgang av teoritekstene i risikofagene – ferdig 2026-10-10 (av Claude, ikke fagperson): all teori i FKB, FKMC, S* og J* lest (ca. 280 000 tegn). 26 rettinger, blant annet melding om førerkort går til statsforvalteren (hpl. § 34), barns rett til å bli hørt fra 7 år (pbrl. § 4-4), heving i forbrukerkjøp (fkjl. § 32), mobil = femårsvare ved reklamasjon, nødverge «klart» (strl. § 18), samvirkende årsaker (P-pille II), Grl. § 5 etter 2014, samordnede normalverdier (puls, kalium, perspiratio). Alt endret og alt usikkert står i docs/FAGLIG_KONTROLL.md. checked-datoene i beta.js er oppdatert; reviewedBy er tom til en fagperson har godkjent.
- [x] 8. Skilt sporet fra offisielle tegninger – ferdig 2026-10-10: 42 skilt sporet fra Statens vegvesens skilttegninger (Wikimedia Commons «NO road sign <nr>.svg», offentlig eiendom; kildene i tools/sign_refs/official, PNG via tools/render_sign_refs.js, sporing i tools/trace_signs.py med lag per farge). Offisielle farger (rød #c4122f, gul #ffd500, blå #003d82). Feil skiltnumre rettet: glatt kjørebane 116 (ikke 118), barn 142 (ikke 146), elg 146.1 (ikke 142), stopp 204 (ikke 202), slutt på forkjørsveg 208 (ikke 308), påbudspil 402.4. «Tunnel» var et oppdiktet blått skilt – nå fareskilt 122. Skiltnummer vises i skiltoversikten. Ny test tools/test_signs.js. Sjekket i skiltoversikten, skiltspillet og teoriprøven.
- [x] 9. Mac- og Windows-appen (v1.0.1) – ferdig 2026-10-10: tag v1.0.1 pushet, kjøringen «Skrivebordsapp» gikk grønt (test, Windows, Mac, publish, cask). Utgivelsen har Axle.dmg (24 MB), Axle-Setup.exe (11 MB) og SHA256SUMS.txt; Homebrew-oppskriften er oppdatert. desktopReady: true i config.js.
- [x] 10. Til slutt: bygg, test, push og oppsummering – ferdig 2026-10-10: build.py, npm test og seo.js grønne (check_figs: 0 funn), pushet til main og claude/loving-cerf-qzvm7j.
- [x] 11. Gjør kartspillet geografisk pålitelig – ferdig 2026-10-15: Gjenskapt: små land med lang kyst (Norge i verdenskartet, særlig i historikkmodus) ble en svart klump fordi den mørke markeringskanten (2–2,5 px) dekket formen. Utvalget av spørsmål brukte et midtpunkt eller en boks, ikke hvor mye av landet som synes. Treffkontrollen brukte boksen rundt hoveddelen. Krim var tegnet som Russland. Rettet: verdenskartet bruker 50m-geometri. `keep` i make_maps.mjs var snudd (0,12 beholdt 88 % av punktene); i tillegg fjernes doble punkter og punkter på rett linje, og d3s etter-sampling er slått av. maps_data.js er nå 183 kB (67 kB gzip), før 194 kB (66,5 kB gzip). Norge i verdenskartet har 268 punkter, før 60. Ytelse (median per spørsmål inkl. tegning, Chrome med CPU 6×): 9–18 ms, før 8–16 ms. Første spørsmål i en region tar 16–36 ms. Felles geometri i maps.js (mpRings, mpVis, mpShown, mpDist, mpMarker) brukes til utvalg, markør og treffkontroll i vanlig modus, historikkmodus og «Test deg». Små land (under ca. 24 px) får en stiplet ring med hvit kant og forklaringen «Ringen er ikke landets form». Bittesmå stater (VA, MC, SM, LI m.fl.) beholdes med t: 1. Det markerte landet har ingen mørk kant, og ankerpunktet ligger inne i landet. Krim tegnes som Ukraina (FN-res. 68/262, se docs/FAGLIG_KONTROLL.md). Ny test tools/test_maps.js (i npm test, 5317 sjekker) for Norge, Grønland, Russland, Krim, øyer, små land og land ved kanten, i vanlig modus og historikkmodus. Den feiler på de gamle dataene. Sjekket visuelt på 375 og 1280 px, lyst og mørkt tema. Gjenstår: omstridte områder ellers (Kashmir, Vest-Sahara m.fl.) følger Natural Earth og bør vurderes av en fagperson.
- [x] 12. Gjør hele grensesnittet enklere å forstå – ferdig 2026-10-15: plan og funn står under «Plan og funn for oppgave 12». 28 skjermer kontrollert på 375 og 1280 px, lyst og mørkt tema, med Playwright og axe-core (WCAG 2.2 AA). Rettet: kontrast (ny --ok-btn/--ok-text/--gold-text/--accent-bg, mørkere --u1, simuleringstekst blandet mot tekstfargen, primærknapper i mørkt tema 3,3 → 5,0:1). Hurtigsøket finner nå Labber og verktøy (brukerreise 3). XP-nivå heter «XP-nivå» så det ikke blandes med nivåene i enhetene. Én forklarende linje øverst i Øv og Teori. Velkomstpunktene er en liste, ikke knappelignende flater. Ingen toast over «Hvor vil du starte?». «Sveip opp» forsvinner ved første trykk. Piltaster i alle radiogrupper. Navn for skjermleser på kalkulatorlinjer, Pomodoro-prikker og fremdrift i steg for steg. Samtykketeksten er samordnet med personvernsiden. Språkvalget var allerede radioknapper, og «anonym» stod ikke i samtykket i dagens kode. Gjenstår (anbefalt videre): kontroll med ekte skjermleser (VoiceOver/TalkBack); elementkalkulatorens rullbare formler inne i knapper (axe: scrollable-region-focusable).
- [ ] 13. Lag en fast arbeidsmåte for undervisningsanimasjoner
- [ ] 14. Styrk kontrollen av svar og risikoinnhold uten å gjenta ferdig arbeid
- [ ] 15. Avslutt med kontroll og oppsummering
- [ ] 16. Apple Pencil-dobbelttrykk skal veksle mellom penn og viskelær
- [ ] 17. Gjør pennetegningen renere og mindre pikselert
- [ ] 18. Kontroller kollisjoner i oppgaver, simuleringer, flashcards og spill

## 1. «Lær først»-leksjoner i grunnskolen (viktigst)

I dag møter barna oppgaver før de har lært begrepet. Et eksempel er `>` og `<` i barneskolen: der kommer oppgavene før noen har forklart tegnene. Lærere bruker ofte en krokodillemunn som alltid vil spise det største tallet. Slike knep skal Axle ha.

Lag en ny type innhold: en kort, visuell leksjon som kommer før oppgavene.

* Bruk eksisterende byggesteiner der det går: `guided.js` (steg-for-steg-kort), `figs_gs.js` / `FIG_MAP` (barnevennlige SVG-figurer) og `sims*.js` (Prøv selv).
* Struktur: én leksjon per nytt begrep. Hver leksjon har 3–6 korte kort:
  * ett knep eller bilde (krokodillemunnen, tallinjen, pizzabiter for brøk og lignende)
  * én ting barnet selv prøver (dra, trykk eller velg)
  * ett «sjekk at du skjønte det»-spørsmål
* Plassering: leksjonen skal komme automatisk første gang barnet åpner en enhet med begrepet (før første oppgave). Den skal også være lett å finne igjen under «Lær: …» i enheten, for eksempel «Lær: > og <».
* Språk: korte setninger og ord et barn på trinnet forstår. Ingen formler før bildet. Ta med både norsk og engelsk, som resten av appen.

Gå gjennom alle enhetene i studiene `barn` og `ungdom` (`add_gs_*.js`, `add_zdeep_gs*.js` og lignende) og lag leksjoner for begrepene som trenger det. Prioriter i denne rekkefølgen:

1. Barneskolen: større/mindre enn (krokodillemunn), tallinje og plassverdi (enere, tiere, hundrere med klosser), addisjon og subtraksjon med tierovergang, gangetabellen (rutenett/grupper), deling som rettferdig fordeling, brøk (pizza/sjokolade), desimaltall (penger), klokka, måleenheter (linjal), omkrets og areal (gå rundt / fylle ruter), symmetri (speil), sannsynlighet (terning/mynt).
2. Ungdomsskolen: negative tall (termometer, heis), likninger som vekt (skålvekt i balanse), prosent (100-rutenett), forhold og proporsjonalitet, potenser, Pytagoras (ruter på sidene), funksjoner (maskin inn → ut), koordinatsystem.
3. Naturfag og andre grunnskolefag der det finnes enheter: samme tankegang, ett konkret bilde per begrep.

Tester: legg til en test (eller utvid `tools/test_content.js`) som sjekker at hver leksjon har både `nb` og `en`, minst ett kort med figur og ett kontrollspørsmål der det riktige svaret er gyldig. Sjekk figurene med `node tools/check_figs.js`.

Visuelt: åpne appen lokalt (`python3 -m http.server -d release/www`) og sjekk på mobilbredde (375 px) at leksjonene ser bra ut i både lyst og mørkt tema.

## 2. Illustrasjonene på oppgavene skal aldri forvirre

Alle oppgaver har en illustrasjon (`qart.js`, funksjonen `qArt(it)`, vist over oppgaveteksten i `renderLesson` i `app.js`). I dag kan figuren være et fast eksempel som ikke passer oppgaven. Eksempel: i «Tall og plassverdi» (GS14, enhet 1, `#/steg/GS14/1/6`) spør oppgaven «Hvor mange tiere er det i tallet 63?», men figuren `gs_place` i `figs_gs.js` viser alltid tallet 347 («300 + 40 + 7 = 347»). Det forvirrer, særlig for de minste.

1. Gjør figurene parametriske der oppgaven har konkrete tall, slik at figuren viser tallene i oppgaven. Start med grunnskolen (`figs_gs.js`): `gs_place` (tegn tallet fra oppgaven med hundrere/tiere/enere), `gs_numline`, `gs_array` (gangestykket i oppgaven), `gs_share`, `gs_clock` (klokkeslettet i oppgaven), `gs_coins`, `gs_pizza` (brøken i oppgaven), `gs_decimal`, `gs_percent`, `gs_area`. La figurfunksjonen ta et valgfritt parameter, og la `qArt` hente tallene fra oppgaven. Generatoren kan gjerne legge ved tallene direkte (for eksempel et ekstra felt i det den returnerer) i stedet for at `qArt` må lese dem ut av teksten.
2. Hvis figuren ikke kan vise oppgavens tall: vis den bare hvis det er helt tydelig at den er et eksempel. Sett et synlig merke «Eksempel» / «Example» øverst i figurrammen (`.q-fig`), og bruk ikke et eksempel med tall som ligner svaret eller kan forveksles med oppgaven. I barneskolen og ungdomsskolen skal det heller vises temapiktogrammet (`.q-topic`) enn et eksempel med andre tall.
3. Figurer som avslører svaret skal ikke vises før svaret er gitt.
4. Lag en test som går gjennom oppgavene i `barn` og `ungdom`. Den skal sjekke at hver figur som vises enten er laget av oppgavens egne tall eller er merket «Eksempel».
5. Sjekk visuelt på mobil (375 px) og PC (1280 px), i lyst og mørkt tema.

## 3. Oppgavetekster som ramser opp svaralternativene

I `add_gs_a.js` linje ca. 65 står det `Hvilket tall er størst: ${a}, ${b}, ${c} eller ${d}?`. Tallene står både i oppgaveteksten og i svaralternativene, i en annen rekkefølge. Det er unødvendig og forvirrende. Endre til «Hvilket tall er størst?» / «Which number is biggest?», og la alternativene vise tallene.

Søk gjennom alle fag (`add_*.js`, `gens*.js`, `more*.js` og de faste spørsmålene) etter den samme formen: «Hvilken/hvilket … : a, b, c eller d?» og lignende, der alternativene gjentas i teksten. Rett dem på samme måte, både `nb` og `en` (også `en_static_*.js`). Lag en test som feiler hvis alle svaralternativene til et flervalgsspørsmål står opplistet i oppgaveteksten.

## 4. Logo på de statiske sidene

Sidene `axle.no/about/`, `/en/about/`, fagsidene og oversiktssidene lages av `tools/seo.js` (funksjonen `page()`, se `<header><a class="logo" …>Axle</a>`). I dag står bare ordet «Axle». Legg en liten logo (A-merket, `/icons/logo-192.png`, ca. 28–32 px, avrundede hjørner) foran ordet i headeren, med `alt=""` siden navnet står ved siden av. Gjør det samme på `web/privacy.html` og `web/terms.html`. Sjekk at det ser bra ut på mobil og PC, og i mørkt tema hvis sidene har det. Kjør `node tools/seo.js` og se på resultatet lokalt.

## 5. Raskere oppstart: last teori og emnesider per fag

Appen er ca. 7,4 MB minifisert (2,6 MB gzip) ved første nedlasting. Omtrent 45 % av dette er teori (`THEORY_DB`, `DEEP`/`DEEPT`, ca. 2,6 MB rått) og emnesider (`top_*.js`, `TOPIC_DB`). Disse trengs bare for faget man åpner.

1. La `build.py` skrive teori og emnesider til egne filer per fag, for eksempel `release/www/c/<KODE>.js`, og ta dem ut av hovedpakken. Oppgaver, generatorer og fagliste (`COURSES`) skal bli i hovedpakken.
2. Lag `ensureCourse(code)` som laster filen (med promise-cache). Kall den før `theoryBody`, `guided`, Teoriboken (`book.js`), emnesider, søk (`qsearch.js`, «Søk etter et emne»), snacks og læringsfeed. Vis en kort «Laster …»-tilstand. Pass på at oppgave-illustrasjonene (`qart.js`, som bruker `topicsOf`) fortsatt virker, eller faller tilbake til piktogrammet til fagfilen er lastet.
3. Søket på tvers av fag trenger en liten indeks (titler og stikkord) i hovedpakken. Den skal ikke trenge full tekst.
4. Service workeren (`web/sw.js`) skal cache fagfilene når de er lastet, slik at appen virker offline for fag man har åpnet. Den skal forhåndslaste favorittfaget.
5. `tools/seo.js` og testene leser kildefilene direkte og skal fortsatt virke.
6. Capacitor- og Tauri-byggene bruker `release/www`, så relative stier må virke der også.
7. Mål før og etter: størrelse på `app.bundle.js` (rå og gzip) og tid til første skjerm med Playwright og CPU-struping 4× (Chromium på `/opt/pw-browsers/chromium` eller lokal Chrome). Skriv tallene i commit-meldingen.

## 6. Uavhengig kontroll av fasiter (særlig helse, jus og trafikk)

`tools/test_content.js` sjekker bare at et tall som ligner svaret står i forklaringen. Lag `tools/test_answers.js` og legg den til i `npm test`.

Generatorene i `SLMR` (legemiddelregning) og `SKLIN` (NEWS2):

* Kjør hver generator mange ganger (fast seed).
* Regn svaret ut på nytt med en egen, uavhengig implementasjon i testen (ikke kopier koden fra generatoren).
* Sjekk at svarene er realistiske, for eksempel ingen infusjonshastighet over 999 ml/t og ingen tablettantall som ikke kan deles.
* Sjekk at NEWS2-tabellen stemmer med den offisielle tabellen.

Faste spørsmål: lag minst 10 håndkontrollerte eksempler per fag i førerkort (FKB, FKMC), sykepleie (S*) og jus (J*), med kildehenvisning i en kommentar. Testen skal feile hvis fasiten endres.

Andre fag: gjør det samme med 5 eksempler per fag for matte og fysikk der generatorer regner (stikkprøver).

## 7. Faglig gjennomgang av teoritekstene i risikofagene

Spørsmålene i FKB, FKMC, SLMR, SFARM, SKLIN, SSYK, SMIK, SANA, SLOV og J* er gått gjennom. Teoritekstene er ikke det. Det gjelder `THEORY` i `add_forer*.js`, `add_syk_*.js` og `add_x_jus.js`, og `DEEP` i `add_zdeep_fk.js`, `add_zdeep_syk*.js` og `add_zdeep_jus.js`.

* Les dem kritisk. Sjekk tall, grenser, paragrafhenvisninger, doser og normalverdier mot Lovdata, Statens vegvesen, Felleskatalogen og Helsedirektoratet.
* Rett feil, og fjern absolutte påstander som ikke stemmer.
* Lag en liste over alt du endret og alt du er usikker på i `docs/FAGLIG_KONTROLL.md`, slik at en fagperson kan gå raskt gjennom det senere.
* Oppdater `checked`-datoen i `beta.js` når et område er gått gjennom. Ikke fyll inn `reviewedBy`: det gjøres først når en ekte fagperson har godkjent det.

## 8. Skilt sporet fra offisielle tegninger

37 trafikkskilt er tegnet for hånd (se `drive_signs*.js`). Hent de offisielle tegningene for disse skiltene og spor dem som rene, små SVG-er i samme format som de eksisterende. Kilder er Statens vegvesens skiltnormal (`www.vegvesen.no`, håndbok N300) eller Wikimedia Commons («Road signs of Norway», offentlig eiendom). Sjekk:

* form
* farger (rød `#c4122f`, gul `#ffd500`, blå `#003d82`)
* kantbredde
* symbol

Sjekk også at skiltnummeret i koden stemmer. Kjør skiltspillet og teoriprøven visuelt etterpå.

## 9. Mac- og Windows-appen (v1.0.1)

Versjonen er satt til 1.0.1 i koden. Lag taggen, så bygger GitHub `Axle.dmg` og `Axle-Setup.exe`:

```
git tag v1.0.1 && git push origin v1.0.1
```

1. Følg med på kjøringen «Skrivebordsapp» under Actions (via `gh run watch`, eller se på github.com).
2. Hvis den feiler: les loggen, rett feilen, og lag en ny tag `v1.0.2` (ikke flytt en tag som allerede er pushet).
3. Når utgivelsen har både `Axle.dmg` og `Axle-Setup.exe`: sett `desktopReady: true` i `config.js`, bygg, test, commit og push. Da vises nedlastingsknappene i appen og på axle.no/about.

## 10. Til slutt (viktig: push)

1. Kjør `python3 build.py`, `npm test` og `node tools/seo.js`. Alt skal være grønt.
2. Commit med forklarende meldinger.
3. Push til `main` (publiserer axle.no) og til `claude/loving-cerf-qzvm7j`:

   ```
   git push origin HEAD:main
   git push origin HEAD:claude/loving-cerf-qzvm7j
   ```

   Hvis push avvises fordi `main` har nye commits: `git pull --rebase origin main`, kjør testene på nytt og push igjen. Ikke avslutt før alt er pushet.
4. Skriv en kort oppsummering til meg på norsk:
   * hva som er gjort
   * tall for størrelse og oppstartstid før og etter
   * hva som gjenstår eller trenger en fagperson

---

## Runde 2 (lagt inn 2026-10-15)

Oppgave 1–10 er ferdige; ikke gjør dem på nytt. Når en oppgave i denne runden er ferdig: oppdater statusen, kjør `python3 build.py` og `npm test`, commit og push commiten til arbeidsgrenen `claude/loving-cerf-qzvm7j`. Ikke push delvise oppgaver til `main` (det publiserer axle.no). Hvis arbeidet må stoppe midt i en oppgave: sett `[~]` og skriv kort hva som er gjort og hva som gjenstår. Ikke sett `reviewedBy`; det som trenger en ekte fagperson, dokumenteres som gjenstående.

## 11. Gjør kartspillet geografisk pålitelig

Land i kartspillet blir noen ganger markert med en liten form som ikke ligner landet, eller landet som skal finnes, ligger utenfor kartutsnittet (Norge er et eksempel). Undersøk og gjenskap feilene før du velger løsning. Se på `geo_game.js`, `maps.js`, `maps_data.js` og `tools/make_maps.mjs`.

* Kartgeneratoren bruker `countries-110m.json` for verdenskartet og `countries-50m.json` for Europakartet. Vurder om verdenskartet bør få mer detaljert geometri. Mål konsekvensen for filstørrelse, ytelse og tregere mobiler før du velger.
* Finn ut hvordan landgeometri, landmarkering, hit testing, multipolygoner, små land og øyer behandles.
* Sørg for at landet som spørres om, faktisk er synlig og identifiserbart i kartutsnittet. Ikke velg land bare fordi et omtrentlig midtpunkt er innenfor utsnittet.
* Bruk samme landgeometri til kart, markering og treffkontroll. Hvis små land trenger en sirkel eller peker for å være synlige, vis tydelig at det er en markør, ikke landets form.
* Legg til gjentakbare regresjonskontroller for Norge, Grønland, Russland, øyer, små land og land ved kanten av utsnittet. Kontroller både vanlig kartmodus og historikkmodus, inkludert at valgt land ikke er klippet bort.
* Ikke erklær feilen løst bare fordi en test består. Kontroller kartet visuelt etter endringen.

## 12. Gjør hele grensesnittet enklere å forstå

Gå gjennom hele appen, ikke bare startsiden: førstegangsopplevelse, fagvalg, navigasjon, læring, øving, teori, søk, Labben, kartspill, Fellesskap, lærerverktøy og profil. Se på mobil og PC.

Brukerreiser:

1. En ny elev velger fag og starter fra begynnelsen.
2. En elev finner raskt et bestemt tema eller en bestemt oppgave.
3. En student finner og bruker en interaktiv figur eller kalkulator.
4. En lærer lager, deler eller bruker et oppgavesett.
5. En bruker kommer tilbake og fortsetter der hen slapp.

Før større endringer: skriv en kort plan her i fila med de største hindringene, anbefalt navigasjon og hvilke eksisterende funksjoner som må bevares. Ikke gjør en totalombygging uten å vise hvor brukerne finner funksjonene etterpå.

Undersøk spesielt:

* Om «Lær», «Øv» og «Teori» er lette å skille fra hverandre.
* Om startsiden viser en tydelig neste handling, samtidig som søk og direkte innganger er lette å finne.
* Om mange fag, låste nivåer, fremdrift og belønninger er forklart med ord brukeren forstår.
* Om faste knapper eller menyer dekker kort og innhold på små skjermer (kontroller på dagens kode).
* Om språkvalget er semantisk riktig for skjermleser. Norsk og engelsk er gjensidig utelukkende og bør ikke være to uavhengige avkrysningsbokser.
* Om samtykkeboksen beskriver statistikken riktig («anonym» mot personvernteksten som sier at hendelser kan knyttes til konto). Gjør formuleringene tydelige og konsekvente.
* Om fremdrift og knapper har forklarende navn, god tastaturstøtte, store nok trykkflater, lesbar kontrast og støtte for redusert bevegelse.

Gjør endringer i små, sammenhengende deler. Bevar Axles visuelle identitet, men prioriter tydelighet fremfor pynt. Norsk og engelsk skal bruke samme begreper; mobil og PC skal begge fungere.

### Plan og funn for oppgave 12 (2026-10-15)

Gjennomgått i Chrome (Playwright) på 375 × 667/780 px og 1280 px, i lyst og mørkt tema, som ny bruker (VGS → «Helt fra start»). Skjermene: velkomst, Lær, Øv, Teori, søk, Labben, kartspillet, Venner, Fellesskap, lærerverktøy, profil, merker, innstillinger, fagvelger, snacks, kort, hoderegning, bevis, enhetssirkel, krefter, bevegelse, regulering, elementkalkulator, pomodoro, kode, teori og steg for steg. Automatiske kontroller (ikke i repoet, kjøres med Playwright og axe-core): innhold under faste felt når man har rullet helt ned eller helt opp, knapper uten navn, trykkflater under 24 px og axe (WCAG 2.2 AA).

**Største hindringer som ble funnet**
1. Kontrast: hvit tekst på grønn (#1E9A5E, 3,6:1) og turkis (#0F8A83, 4,2:1) på enhetsoverskrifter, fagmerker, «Fortsett» etter riktig svar, innleveringsknappen og teori-knappen. Gulltekst (#B77C00, 3,8:1) 27 steder. Simuleringsfargene var for lyse som tekst. I mørkt tema hadde alle primærknapper (hvit på #5E8BF0) bare 3,3:1.
2. Søket på forsiden og i Øv fant ikke Labben eller verktøyene: «ohms lov» ga oppgaver og teori, men ikke simuleringen, og «kalkulator» fant ikke elementkalkulatoren (brukerreise 3).
3. «Nivå» betydde to ting: XP-nivået på profilen («Nivå 1») og de tre nivåene i hver enhet («0/3 nivåer», «Fullfør Nivå 3»).
4. Lær, Øv og Teori var ikke forklart noe sted.
5. Velkomstsiden: «Enkelt først», «Prøv selv» og «Øv til det sitter» så ut som knapper på mobil, men var ren tekst, og forklaringen var skjult.
6. Toasten «Velkommen til Axle!» la seg over «Hvor vil du starte?»-arket.
7. «Sveip opp»-hintet i Snacks ligger fast nederst og kunne dekke en glidebryter til brukeren hadde rullet.
8. Ingen av de 13 radiogruppene (språk, modus, svaralternativer …) virket med piltastene.

**Allerede i orden (kontrollert i dagens kode; eldre skjermbilder var utdaterte)**
- Språkvalget er en `radiogroup` med `role="radio"` og `aria-checked`, både på velkomstsiden og i Innstillinger. Det er ikke avkrysningsbokser.
- Samtykkeboksen bruker ikke ordet «anonym». Den sier at statistikken knyttes til kontoen eller til en tilfeldig id. Den er nå samordnet med personvernsiden (antall riktige, sletting etter 6 måneder, «ikke anonym», hvor den slås av).
- Ingen faste knapper eller menyer dekker innhold på de 28 skjermene når siden er rullet helt ned (unntak: punkt 7).
- Låste nivåer har tekst («Fullfør nivået før, eller bruk «Hopp hit»») og skjermleseretikett («Nivå 2, Øving, låst»).
- Redusert bevegelse: global regel som slår av animasjoner. Kartspillets markering er synlig uten blinking.
- Startsiden har én tydelig neste handling («Start her / Neste steg – Fortsett») med søk rett under. En bruker som kommer tilbake, får «Fortsett» (brukerreise 5).
- Lærerverktøyet er delt i tre nummererte steg: velg oppgaver, del, se resultater (brukerreise 4).

**Anbefalt navigasjon (ingen totalombygging)**
Fanene beholdes: **Lær** = stien steg for steg, **Øv** = fri øving (fokus, labber, spill, prøveeksamener, løste oppgaver, lærerverktøy), **Teori** = lesestoff og formelark, **Venner**, **Profil**. Øv og Teori får én forklarende linje øverst som sier hva fanen er til og hvor de andre tingene ligger. Labben nås fra søket (nytt), Øv («Labber i …»), Teori-søket og #/lab. Lærerverktøy nås fra Øv («Hjelpemidler») og Profil.

**Funksjoner som må bevares**: alle faner og ruter (#/…), «Hopp hit», «Finn nivået mitt», Mitt fokus, Labben og alle simuleringer, kartspillet, snacks og spill, prøveeksamener, lærerverktøy (lekse, live-quiz, konkurranse), Fellesskap, grupper og venner, kladd og kalkulator, språkvalg, statistikksamtykke og eksport/backup.

## 13. Lag en fast arbeidsmåte for undervisningsanimasjoner

Lag en gjenbrukbar mal og arbeidsmåte (her eller i en dokumentasjonsfil som lenkes herfra) for kodebaserte animasjoner som forklarer faglige ideer. Før animasjonskode skrives, skal det lages et presist manus og produksjonsbrief ut fra et læringsmål eieren har valgt. Ikke lag en tilfeldig ny animasjon uten valgt tema.

Hvert manus/brief skal inneholde:

* Målgruppe, forkunnskaper og ett konkret læringsmål.
* Misforståelsen animasjonen skal hjelpe eleven å overvinne.
* Scener i rekkefølge med varighet og én hovedidé per scene.
* Fortellertekst synkronisert med nøyaktig bevegelse, illustrasjon, kamera og tekst på skjermen.
* Alle formler, symboler, enheter og tall som vises.
* Pauser for tenking og en kort kontroll av forståelsen.
* Faglig kontroll av påstander, beregninger og eksempler.
* Teksting/transkript, avspillingskontroll, mobiltilpasning og hensyn til redusert bevegelse.
* En tydelig, implementeringsklar instruks til Claude om hvordan animasjonen bygges og integreres i Axles kode og Lab.

Fortellerstemmen skal forklare det visuelle, ikke lese opp skjermteksten. Bevegelse skal vise årsak, endring eller sammenheng. Manus og kodeinstruks skal være separate.

Undersøk om en naturlig fortellerstemme fungerer på norsk og engelsk: stemmekvalitet, språk og uttale, pris, lisens, personvern og avspilling uten nett. Ikke legg til betalt tjeneste, API-nøkkel eller ekstern avhengighet uten godkjenning. Passer ingen løsning, lag manus klart for innlesing og med teksting.

## 14. Styrk kontrollen av svar og risikoinnhold uten å gjenta ferdig arbeid

Oppgave 6 og 7 er utført; ikke gjør dem på nytt. Undersøk bare om testene som finnes nå dekker nye risikopunkter.

* `tools/test_content.js` sjekker blant annet at tall som ligner tallsvar, finnes i forklaringen. Det beviser ikke at svaret er riktig. Vurder om `tools/test_answers.js` gir uavhengig kontroll for de viktige fagene, og dokumenter konkrete hull i stedet for å lage en test som kopierer generatorens logikk.
* Behold kilder og usikkerhet i `docs/FAGLIG_KONTROLL.md`. Ikke merk innhold faglig godkjent uten en faktisk fagperson.
* Mulig feil fasit eller påstand: oppgi fag, enhet og oppgave-/teori-ID, vis hvorfor den er mistenkelig, og kontroller mot pålitelig kilde før retting.

## 15. Avslutt med kontroll og oppsummering

* Etter hver oppgave: bygg og test før commit, statusendringen i samme commit, push til arbeidsgrenen.
* Til slutt: kontroller at alle nye oppgaver har riktig status og dato, kjør sluttkontrollene fra oppgave 10 (`python3 build.py`, `npm test`, `node tools/seo.js`), push til `main` og `claude/loving-cerf-qzvm7j`. Ikke lag eller flytt en allerede publisert versjonstag.
* Oppsummer på norsk: hva som ble endret, hva som ble kontrollert, målt effekt på kartets størrelse/ytelse, og hva som fortsatt trenger en ekte fagperson eller godkjenning.

---

## Runde 3 (lagt inn 2026-10-15)

Samme regler som runde 2: arbeid i rekkefølge, oppdater status, bygg og test, commit og push til `claude/loving-cerf-qzvm7j` etter hvert ferdige trinn. Ikke push delvise oppgaver til `main`. Må arbeidet stoppe: sett `[~]` og noter konkret hva som gjenstår.

## 16. Apple Pencil-dobbelttrykk skal veksle mellom penn og viskelær

Dobbelttrykk på Apple Pencil skal veksle mellom penn og viskelær i kladdeverktøyet (som i OneNote). Undersøk først `initCanvas()`, `pointerdown`/`pointerup`, `scMode()`, `st.tool` og verktøyknappene i `app.js`.

* Finn ut hvilke Pencil-hendelser Axle faktisk mottar i iPad-nettappen, PWA-en og Capacitor-appen. Et vanlig dobbelttrykk på skjermen er ikke det samme som dobbelttrykk på siden av pennen.
* Undersøk om Capacitor-appen kan bruke iOS' native Pencil-interaksjon (UIPencilInteraction) og sende verktøybyttet trygt til kladdeverktøyet. Vurder om en native bro passer det eksisterende oppsettet.
* Gir plattformen ikke tilgang: ingen upålitelig løsning som utløser zoom eller tegner prikker. Behold en lett tilgjengelig knapp for penn/viskelær.
* Aktivt verktøy skal være synlig og forståelig, også for skjermleser. Streken skal ikke gå tapt, og det skal ikke komme utilsiktede trykk.
* Ikke fjern støtten for viskelærknappen på Apple Pencil hvis den virker.
* Test penn, viskelær, fingertegning, håndflateavvisning, zoom/flytting og angre hver for seg. Dobbelttrykk skal ikke lage prikker eller korte streker.
* Virker dobbelttrykk bare i Capacitor-appen: forklar forskjellen tydelig og sørg for en god knappeløsning på nett.
* Dokumenter hvilke plattformer og iPad-oppsett som faktisk er kontrollert. Ikke skriv at dobbelttrykk virker uten test med en fysisk Apple Pencil.

## 17. Gjør pennetegningen renere og mindre pikselert

Finn årsaken før tegnekoden endres: canvas-oppsett, `devicePixelRatio`, størrelsesendringer, `getCoalescedEvents()`, trykkfølsomhet, `SCR.base` og visning etter zoom.

* Bevar responsen; ingen kraftig utjevning som gjør at streken henger etter.
* Backing-oppløsningen skal følge CSS-størrelse og pikselratio (Retina/iPad), også etter rotasjon, endret vindusstørrelse, tastatur, zoom og bytte av skjerm.
* Bruk samplene nettleseren leverer når det forbedrer streken, med fallback.
* Trykkfølsom bredde: fjern synlige hakk og ujevne overganger uten slør eller tap av presisjon.
* Kontroller farger og linjebredde mot rutenettet i lyst og mørkt tema.
* Ingen ny tegneavhengighet uten begrunnelse (filstørrelse, ytelse, offline).
* Sammenlign visuelt på iPad med Apple Pencil (vanlig tegning, rask skriving, langsomme kurver, tett skrift, zoom), og med finger og mus. Mål forsinkelse og dokumenter enhet, app/nettleser og pikselratio.

## 18. Kontroller kollisjoner i oppgaver, simuleringer, flashcards og spill

Se på `tools/check_figs.js`, `tools/test_sims.js`, `tools/test_qart.js` og komponentene i `app.js`, `sims*.js`, `geo_game.js`, `maps.js` og `styles.css`.

* Utvid den visuelle kontrollen til faktiske oppgavevisninger, figurer, simuleringer og spill (tekst utenfor SVG/canvas, tekst over andre etiketter eller streker, avkuttede animasjoner, innhold under faste knapper eller bunnfelt).
* Størrelser: 375 px mobil, nettbrett og 1280 px PC; lyst og mørkt tema.
* Simuleringer ved startverdi, ytterverdier og verdier der etiketter nærmer seg hverandre; glidebrytere og lang resultattekst skal ikke overlappe.
* Kartspillet: spørsmål og svar, land ved kanten, små land og historiekart, i vanlig og rolig modus.
* Flashcards med korte og lange spørsmål, svar og forklaringer: ingenting skal stikke ut, klippes eller ligge under faste knapper.
* Animasjon skal ikke gjøre det vanskeligere å lese eller svare; ta med redusert bevegelse.
* Automatiske tester hjelper, men erstatter ikke visuell kontroll. Rapporter skjermstørrelse, tema, komponent og eksempel for hver feil. Rett feil som kan gjenskapes; mulige risikoområder dokumenteres som anbefalt videre kontroll.
