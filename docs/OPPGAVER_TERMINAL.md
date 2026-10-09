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
- [~] 6. Uavhengig kontroll av fasiter – pågår (avbrutt 2026-10-09): kartlagt alle malene i SLMR (15 generatorer) og SKLIN (7); NEWS2-eksempelet er kontrollert for hånd mot den offisielle tabellen (stemmer). Gjenstår: skrive tools/test_answers.js (fast seed, egen utregning fra tallene i oppgaveteksten, realisme: ≤ 999 ml/t, tabletter i hele/halve), NEWS2-tabellen, 10 håndkontrollerte per fag i FKB/FKMC/S*/J* og 5 per matte-/fysikkfag.
- [ ] 7. Faglig gjennomgang av teoritekstene i risikofagene
- [ ] 8. Skilt sporet fra offisielle tegninger
- [ ] 9. Mac- og Windows-appen (v1.0.1)
- [ ] 10. Til slutt: bygg, test, push og oppsummering

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
