# Prompt til Claude Code i terminalen

Lim inn alt under streken i `claude` i Axle-mappen (`cd Axle && git pull && claude`).

---

Du jobber i Axle-repoet (axle.no). Les `CLAUDE.md` først og følg den. Svar meg på norsk. Kvalitet går foran nye funksjoner. Jobb deg gjennom oppgavene i rekkefølge, og commit etter hver ferdige oppgave. Kjør `python3 build.py` og `npm test` før hver commit. Testene må være grønne. Ikke legg nøkler eller tokens i repoet.

## 1. «Lær først»-leksjoner i grunnskolen (viktigst)

I dag møter barna oppgaver før de har lært begrepet. Et eksempel er `>` og `<` i barneskolen: der kommer oppgavene før noen har forklart tegnene. Lærere bruker ofte en krokodillemunn som alltid vil spise det største tallet. Slike knep skal Axle ha.

**Lag en ny type innhold: en kort, visuell leksjon som kommer før oppgavene.**
- Bruk eksisterende byggesteiner der det går: `guided.js` (steg-for-steg-kort), `figs_gs.js` / `FIG_MAP` (barnevennlige SVG-figurer) og `sims*.js` (Prøv selv).
- **Struktur:** én leksjon per nytt begrep. Hver leksjon har 3–6 korte kort:
  - ett knep eller bilde (krokodillemunnen, tallinjen, pizzabiter for brøk og lignende)
  - én ting barnet selv prøver (dra, trykk eller velg)
  - ett «sjekk at du skjønte det»-spørsmål
- **Plassering:** leksjonen skal komme automatisk første gang barnet åpner en enhet med begrepet (før første oppgave). Den skal også være lett å finne igjen under «Lær: …» i enheten, for eksempel «Lær: > og <».
- **Språk:** korte setninger og ord et barn på trinnet forstår. Ingen formler før bildet. Ta med både norsk og engelsk, som resten av appen.

**Gå gjennom alle enhetene i studiene `barn` og `ungdom`** (`add_gs_*.js`, `add_zdeep_gs*.js` og lignende) og lag leksjoner for begrepene som trenger det. Prioriter i denne rekkefølgen:
1. Barneskolen: større/mindre enn (krokodillemunn), tallinje og plassverdi (enere, tiere, hundrere med klosser), addisjon og subtraksjon med tierovergang, gangetabellen (rutenett/grupper), deling som rettferdig fordeling, brøk (pizza/sjokolade), desimaltall (penger), klokka, måleenheter (linjal), omkrets og areal (gå rundt / fylle ruter), symmetri (speil), sannsynlighet (terning/mynt).
2. Ungdomsskolen: negative tall (termometer, heis), likninger som vekt (skålvekt i balanse), prosent (100-rutenett), forhold og proporsjonalitet, potenser, Pytagoras (ruter på sidene), funksjoner (maskin inn → ut), koordinatsystem.
3. Naturfag og andre grunnskolefag der det finnes enheter: samme tankegang, ett konkret bilde per begrep.

**Tester:** legg til en test (eller utvid `tools/test_content.js`) som sjekker at hver leksjon har både `nb` og `en`, minst ett kort med figur og ett kontrollspørsmål der det riktige svaret er gyldig. Sjekk figurene med `node tools/check_figs.js`.

**Visuelt:** åpne appen lokalt (`python3 -m http.server -d release/www`) og sjekk på mobilbredde (375 px) at leksjonene ser bra ut i både lyst og mørkt tema.

## 2. Raskere oppstart: last teori og emnesider per fag

Appen er ca. 7,4 MB minifisert (2,6 MB gzip) ved første nedlasting. Omtrent 45 % av dette er teori (`THEORY_DB`, `DEEP`/`DEEPT`, ca. 2,6 MB rått) og emnesider (`top_*.js`, `TOPIC_DB`). Disse trengs bare for faget man åpner.

1. La `build.py` skrive teori og emnesider til egne filer per fag, for eksempel `release/www/c/<KODE>.js`, og ta dem ut av hovedpakken. Oppgaver, generatorer og fagliste (`COURSES`) skal bli i hovedpakken.
2. Lag `ensureCourse(code)` som laster filen (med promise-cache). Kall den før `theoryBody`, `guided`, Teoriboken (`book.js`), emnesider, søk (`qsearch.js`, «Søk etter et emne»), snacks og læringsfeed. Vis en kort «Laster …»-tilstand.
3. Søket på tvers av fag trenger en liten indeks (titler og stikkord) i hovedpakken. Den skal ikke trenge full tekst.
4. Service workeren (`web/sw.js`) skal cache fagfilene når de er lastet, slik at appen virker offline for fag man har åpnet. Den skal forhåndslaste favorittfaget.
5. `tools/seo.js` og testene leser kildefilene direkte og skal fortsatt virke.
6. Capacitor- og Tauri-byggene bruker `release/www`, så relative stier må virke der også.
7. Mål før og etter: størrelse på `app.bundle.js` (rå og gzip) og tid til første skjerm med Playwright og CPU-struping 4× (Chromium på `/opt/pw-browsers/chromium` eller lokal Chrome). Skriv tallene i commit-meldingen.

## 3. Uavhengig kontroll av fasiter (særlig helse, jus og trafikk)

`tools/test_content.js` sjekker bare at et tall som ligner svaret står i forklaringen. Lag `tools/test_answers.js` og legg den til i `npm test`.

**Generatorene i `SLMR` (legemiddelregning) og `SKLIN` (NEWS2):**
- Kjør hver generator mange ganger (fast seed).
- Regn svaret ut på nytt med en egen, uavhengig implementasjon i testen (ikke kopier koden fra generatoren).
- Sjekk at svarene er realistiske, for eksempel ingen infusjonshastighet over 999 ml/t og ingen tablettantall som ikke kan deles.
- Sjekk at NEWS2-tabellen stemmer med den offisielle tabellen.

**Faste spørsmål:** lag minst 10 håndkontrollerte eksempler per fag i førerkort (FKB, FKMC), sykepleie (S*) og jus (J*), med kildehenvisning i en kommentar. Testen skal feile hvis fasiten endres.

**Andre fag:** gjør det samme med 5 eksempler per fag for matte og fysikk der generatorer regner (stikkprøver).

## 4. Faglig gjennomgang av teoritekstene i risikofagene

Spørsmålene i FKB, FKMC, SLMR, SFARM, SKLIN, SSYK, SMIK, SANA, SLOV og J* er gått gjennom. Teoritekstene er ikke det. Det gjelder `THEORY` i `add_forer*.js`, `add_syk_*.js` og `add_x_jus.js`, og `DEEP` i `add_zdeep_fk.js`, `add_zdeep_syk*.js` og `add_zdeep_jus.js`.

- Les dem kritisk. Sjekk tall, grenser, paragrafhenvisninger, doser og normalverdier mot Lovdata, Statens vegvesen, Felleskatalogen og Helsedirektoratet.
- Rett feil, og fjern absolutte påstander som ikke stemmer.
- Lag en liste over alt du endret og alt du er usikker på i `docs/FAGLIG_KONTROLL.md`, slik at en fagperson kan gå raskt gjennom det senere.
- Oppdater `checked`-datoen i `beta.js` når et område er gått gjennom. **Ikke** fyll inn `reviewedBy`: det gjøres først når en ekte fagperson har godkjent det.

## 5. Skilt sporet fra offisielle tegninger

37 trafikkskilt er tegnet for hånd (se `drive_signs*.js`). Hent de offisielle tegningene for disse skiltene og spor dem som rene, små SVG-er i samme format som de eksisterende. Kilder er Statens vegvesens skiltnormal (`www.vegvesen.no`, håndbok N300) eller Wikimedia Commons («Road signs of Norway», offentlig eiendom). Sjekk:
- form
- farger (rød `#c4122f`, gul `#ffd500`, blå `#003d82`)
- kantbredde
- symbol

Sjekk også at skiltnummeret i koden stemmer. Kjør skiltspillet og teoriprøven visuelt etterpå.

## 6. Til slutt

1. Kjør `python3 build.py`, `npm test` og `node tools/seo.js`. Alt skal være grønt.
2. Commit med forklarende meldinger.
3. **Push til `main`** (publiserer axle.no) **og til `claude/loving-cerf-qzvm7j`**:
   ```
   git push origin HEAD:main
   git push origin HEAD:claude/loving-cerf-qzvm7j
   ```
   Hvis push avvises fordi `main` har nye commits: `git pull --rebase origin main`, kjør testene på nytt og push igjen.
4. Skriv en kort oppsummering til meg på norsk:
   - hva som er gjort
   - tall for størrelse og oppstartstid før og etter
   - hva som gjenstår eller trenger en fagperson
