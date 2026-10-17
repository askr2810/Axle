# Oppdrag: gjør Axle så intuitiv som mulig – en full redesign i en kopi

Du jobber i en **kopi** av Axle, i en egen mappe på en egen git-gren (`redesign/…`). Eieren vil se en **helt omgjort** versjon av appen, sammenligne den med dagens, og så velge hvilke deler som skal flyttes over til den ekte appen. Derfor: **gjør heller for mye enn for lite.** Dette er ikke finpuss. Tenk nytt om hver skjerm, og gjennomfør det. Det som ikke blir valgt, kastes uten skade.

Jobb selvstendig fra start til slutt. Ikke stopp for å spørre om lov mellom stegene; ta valgene selv og begrunn dem i `REDESIGN.md`.

## Hva Axle er

* Gratis læringsapp for alle nivåer: barneskole, ungdomsskole, videregående, førerkort (bil og MC), sykepleie, jus, økonomi, arkitektur, ingeniørfag. Oppgaver, teori, simuleringer, labber, spill, venner og lærerverktøy.
* Brukerne går fra en åtteåring på mobil til en ingeniørstudent på PC. Begge skal forstå appen med én gang.
* Norsk bokmål først, engelsk også.
* Én kodebase i vanilla JavaScript, uten rammeverk. Filene ligger i rota; `python3 build.py` setter dem sammen i rekkefølgen i `build.py` til `release/www`. Samme kode blir nettapp (axle.no), iOS/Android (Capacitor) og Mac/Windows (Tauri).
* Viktige filer: `styles.css` (alt utseende, tokens i `:root`), `app.js` (`render()`, ikonene i `I`, `svg()`, `EMO`), `profile.js` (fanene), `route.js` (adresser), `welcome.js` (første besøk), `book.js` (teori), `theme.js` (utseende-innstillinger), `qart.js` (illustrasjoner på oppgaver).

## Det viktigste: intuitivitet

Les `docs/DESIGN.md` før du gjør noe. Del 0 der («Intuitivitet først») er målet for hele oppdraget. Kort:

1. Brukeren skal aldri lure på hva neste steg er. Én tydelig hovedhandling per skjerm, synlig uten å scrolle.
2. Vis før du forklarer: bilde, figur eller noe å prøve kommer før tekst og formler. Ingen tekstvegger.
3. Lær før du øver.
4. Ingenting viktig mer enn to trykk unna, og alt kan finnes med søk.
5. Samme ord og samme ikon for det samme overalt.
6. Tilbakemelding på alt man gjør.
7. Feil er en del av læringen; tonen er vennlig.
8. Gradvis mer: nye brukere ser det enkleste først.
9. Forutsigbart: like ting ser like ut og står på samme sted.
10. For alle: store trykkflater, god kontrast, tastatur, skjermleser, mørkt tema, mobil og PC.
11. Rask og stabil, virker uten nett.
12. Rydd når du legger til: målet er et enklere hele, ikke et større.

Tenk som tre personer når du vurderer en skjerm:

* **Ida, 9 år**, barneskole, mobil, leser sakte. Skjønner hun hva hun skal trykke på?
* **Jonas, 17 år**, VG1 og teoriprøven til førerkortet, mobil, utålmodig. Kommer han i gang på under ti sekunder?
* **Sara, 23 år**, sykepleier- eller ingeniørstudent, PC, vil finne et bestemt emne raskt. Finner hun det?

## Hva du står fritt til å endre

Alt som har med opplevelsen å gjøre:

* navigasjon og struktur (faner, menyer, hvor ting ligger, hva som slås sammen eller skjules)
* forsiden, oppgaveflyten, svar og tilbakemelding, teorisidene, Øv, spill, venner, profil, innstillinger, velkomst og første besøk
* PC-oppsettet og mobiloppsettet
* typografi, størrelser, avstander, flater, komponenter, ikoner, bevegelse, tomme tilstander
* tekstene i grensesnittet (knapper, overskrifter, hjelpetekster)

Spørsmål som er verdt å stille (ikke en fasit): Trengs fem faner? Bør «Lær» og «Øv» være én ting? Hva er det eneste en ny bruker trenger å se på forsiden? Hvordan blir en oppgave roligere og tydeligere? Hvordan blir teorien mer visuell og lettere å skumme? Hvordan blir innstillingene kortere?

## Grenser (disse gjelder alltid)

1. **Ikke push, ikke merge til `main`, ikke lag pull request mot `main`.** Commit bare lokalt på redesign-grenen. Ikke rør hovedmappa `../Axle`. (Jobber du i skyen uten lokal mappe: bruk bare grenen `redesign/<dato>`, og push bare den grenen.)
2. **Fagstoffet er uendret:** oppgaver, fasit, forklaringer, teori, emnesider og figurdata (`add_*`, `top_*`, `learn.js`, `lessons.js`, `drill_*`, `figs_*` osv.). Du kan endre hvordan stoffet vises, men ikke hva som står.
3. **Lagrede data må fortsatt virke:** ikke endre navn på eller slette felter i tilstanden `S` (lagres i `localStorage` under `ingeniordrill.v1`). Nye felter er greit.
4. **Ingen funksjoner forsvinner.** Flytt dem, slå dem sammen eller legg dem bak «Mer», men alt skal fortsatt kunne nås.
5. Ikke rør `supabase/`, innlogging, nøkler, `.github/`, `desktop/`, `ios/`, `android/` eller publiseringsoppsettet.
6. Ingen nye rammeverk, tunge biblioteker eller eksterne tjenester. Appen skal virke uten nett.
7. All ny tekst på norsk og engelsk: `T("norsk", "English")`.
8. **Merkevaren:** A-merket, fargene i `:root`, skriftene (Bricolage Grotesque, Figtree, JetBrains Mono) og ruteark-følelsen er Axle. Du kan endre hvordan de brukes (mengde farge, størrelser, flater). Større endringer av selve merkevaren legger du som et eget, tydelig merket punkt. Den tegnede retningen i `brand/tegnet/` (se README der) vurderer eieren på sikt; prøv den gjerne som et eget punkt.
9. Reglene i `docs/DESIGN.md` gjelder: ingen emoji i grensesnittet (bruk linjeikonene), ingen fargeoverganger, ingen tykke fargestriper på venstre side, lyst og mørkt tema. Mener du at en regel står i veien for at appen blir intuitiv, kan du bryte den i kopien, men skriv hvorfor.
10. `PLATFORM === "claude"` er en egen, enklere utgave av appen (`dist/artifact.html`). Ikke ødelegg den; bygget skal fortsatt gå gjennom.

## Slik jobber du

**0. Sett deg inn i appen.**
* Les `CLAUDE.md` (prosjektnotater skrevet for en annen AI-assistent; de gjelder deg også), `docs/DESIGN.md`, `README.md` og toppen av `styles.css`.
* Se på alle bildene i `local/redesign/for/`. Det er 12 skjermer på mobil og PC, i lyst og mørkt tema.
* Bruk appen selv: `python3 build.py`, start en server med `python3 -m http.server 8777 -d release/www`, og klikk deg gjennom med Playwright eller nettleseren. Begynn som helt ny bruker.

**1. Kartlegg problemene.** Lag `REDESIGN.md` i rota med de 15–30 største hindrene for en ny bruker, skjerm for skjerm, med de viktigste først. Vær konkret («på 375 px ligger Start-knappen under folden»), ikke generell.

**2. Lag en plan.** Del arbeidet i endringer med nummer: R01, R02, R03 … Hver endring er én tydelig idé (for eksempel «R04: én fane for Lær og Øv»). Skriv planen i `REDESIGN.md` før du begynner å kode.

**3. Bygg i runder.** For hver endring:
* Gjør endringen. Én endring = én eller noen få commits, og meldingen starter med nummeret: `R04: én fane for Lær og Øv`. Da kan eieren ta med akkurat de endringene hen vil.
* Bygg (`python3 build.py`), og ta skjermbilder:
  `node tools/redesign_shots.js --url http://localhost:8777/ --out local/redesign/etter`
* **Se på bildene selv**, på 375 px og 1280 px, lyst og mørkt. Rett det som ser rotete ut, ligger under faste felt eller må scrolles til.
* Kjør de raske testene: `node tools/test_content.js 100`, `node tools/test_design.js` og `AXLE_URL=http://localhost:8777/ node tools/check_flows.js`.
* Oppdater `REDESIGN.md`.
* Lager du nye skjermer som bør sammenlignes, legg dem til i `SCREENS` i `tools/redesign_shots.js`.

Ikke stopp etter én eller to endringer. Målet er at alle hovedskjermene er tenkt nytt: velkomst, forside, oppgave, svar, Øv, teori og emneside, førerkort, spill, venner, profil og innstillinger, på mobil og PC.

**4. Avslutt.**
* Kjør `npm test`. Tester som bare sjekker det gamle oppsettet, kan du tilpasse. Tester av fagstoff, fasit og lagrede data skal ikke svekkes.
* Kjør `AXLE_URL=http://localhost:8777/ node tools/check_flows.js`, `node tools/check_views.js` og `node tools/check_mobile.js` (se toppen av hver fil).
* Ta nye skjermbilder og gjør `REDESIGN.md` ferdig.
* Commit. Ikke push.
* Si til eieren at hen kan se resultatet med `tools/redesign.sh vis`.

Går du tom for tid eller kontekst: oppdater «Status» i `REDESIGN.md` (hva som er gjort, hva som gjenstår, neste steg) og commit, så kan neste økt fortsette.

## Format for REDESIGN.md

```
# Redesign <dato>

## Kort fortalt
3–5 linjer: hva er den store forskjellen fra dagens Axle?

## Problemer jeg fant
Skjerm for skjerm, de viktigste først.

## Endringer
### R01 <kort navn>
- Hva: hva som er endret, med ord en ikke-utvikler forstår
- Hvorfor: hvilket problem det løser, og for hvem (Ida, Jonas, Sara)
- Skjermer: hvilke skjermer det gjelder
- Filer: de viktigste filene
- Kan flyttes alene: ja, eller «trenger R0x»

## Ideer jeg ikke rakk

## Status
Ferdig / pågår, og neste steg.
```

## Kvalitet før du sier deg ferdig

* Forstår en ny bruker hver skjerm uten å lese mer enn én linje?
* Er det én hovedhandling, og synes den uten å scrolle på 375 × 667?
* Dekker noe fast (topp, bunn, tastatur) innhold eller knapper?
* Synes hele figuren uten å scrolle?
* Ser det ryddig ut med jevne avstander i lyst og mørkt tema, på mobil og PC?
* Virker alt med tastatur, og har knapper uten tekst et navn for skjermleser?
* Er tekstene korte, på norsk og engelsk, og brukes de samme ordene overalt?
* Har du sett på skjermbildene selv, og ikke bare stolt på at testene er grønne?
