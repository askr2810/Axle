# Designregler for Axle

Les denne fila før du endrer noe som synes for brukeren: skjermer, knapper, ikoner, figurer, farger, tekster i grensesnittet eller oppsett. Den fulle merkevareboka (farger, typografi, komponenter, logoer, piktogrammer) ligger i designsystemet på claude.ai («Axle»). Reglene her er de som må følges i koden.

Målet er at alle, fra en tredjeklassing til en ingeniørstudent, forstår hva de skal gjøre uten å lete eller lese mye. Når du er i tvil, velg det enkleste og tydeligste, og vis heller enn å forklare.

## 0. Intuitivitet først (det viktigste)

Axle står og faller på at det er lett å bruke. Funksjoner som er vanskelige å finne eller forstå, finnes ikke for brukeren. Disse prinsippene gjelder alt du lager, også når oppgaven ikke handler om design:

1. **Brukeren skal aldri lure på hva som er neste steg.** Hver skjerm har én tydelig hovedhandling. Etter hvert svar, kort eller steg synes «Neste/Fortsett» med én gang, uten scrolling.
2. **Vis før du forklarer.** Et bilde, en figur eller noe man kan prøve selv kommer før teksten og formelen. Ingen tekstvegger: korte avsnitt, 2–3 punkter per kort, ett begrep om gangen.
3. **Lær før du øver.** Et nytt begrep forklares (med et knep eller bilde) før de første oppgavene om det.
4. **Ingenting viktig ligger mer enn to trykk unna**, og alt kan finnes med søket. Nye funksjoner får en fast, logisk plass (riktig fane, riktig kategori) og blir søkbare. Ikke legg til nye faner eller menyer uten at det er helt nødvendig.
5. **Samme ord og samme ikon for det samme overalt**, på norsk og engelsk. Hvis noe heter «Lær» ett sted, heter det ikke «Leksjon» et annet sted.
6. **Tilbakemelding på alt.** Hver handling gir en synlig reaksjon: valgt, riktig, feil, lagret, laster. Feil svar gir et hint og en forklaring, ikke bare rødt.
7. **Feil er en del av læringen.** Tonen er vennlig og oppmuntrende, aldri straffende. Ingen konfetti ved stryk.
8. **Gradvis mer.** Nye brukere ser det enkleste først; mer dukker opp når de er i gang. Avanserte valg ligger bak et «Mer»-steg, ikke på forsiden.
9. **Forutsigbart.** Like ting ser like ut og står på samme sted. Bruk eksisterende komponenter og mønstre før du lager nye.
10. **For alle.** Store trykkflater, god kontrast, tastatur og skjermleser, redusert bevegelse, tydelig også uten farger. Det skal fungere like godt på en liten mobil som på en stor PC-skjerm.
11. **Rask og stabil.** Appen skal starte raskt og virke uten nett for fag man har åpnet. Ikke legg til tunge biblioteker eller eksterne tjenester for pynt.
12. **Rydd når du legger til.** Kommer noe nytt, se om noe gammelt kan fjernes, slås sammen eller flyttes, så det totale blir enklere og ikke bare større.

### Sjekkliste før du sier deg ferdig med noe som synes

* Forstår en ny bruker hva skjermen er til og hva hen skal trykke på, uten å lese mer enn én linje?
* Finnes det bare én hovedhandling, og synes den uten scrolling på 375 px?
* Dekker noe fast (topp, bunn, tastatur) innhold eller knapper?
* Er det en illustrasjon der det hjelper, og stemmer den med innholdet?
* Er tekstene korte, på både norsk og engelsk, og bruker de samme ord som resten av appen?
* Ser det ryddig ut med jevne avstander i lyst og mørkt tema, på mobil og PC?
* Virker det med tastatur, og har knapper uten tekst et navn for skjermleser?
* Er det ingen emoji, gradienter eller tykke fargestriper?
* Har du sett på skjermbildene selv, og ikke bare stolt på at testene er grønne?

## 1. Ikoner, aldri emoji

* Ingen emoji i grensesnittet: knapper, overskrifter, fliser, toasts, menyer og paneler. Bruk Axles egne linjeikoner.
* Ikonene ligger i `app.js`:
  * `I` (ca. linje 87) er ikonobjektet, for eksempel `I.book`, `I.bolt`, `I.gear`, `I.chevron`, `I.target`, `I.steps`.
  * `svg(path, størrelse, fylt, strek)` (linje 86) lager nye ikoner: 24 × 24 viewBox, avrundede ender, 2,2 px strek, `currentColor`.
  * `EMO` (linje 138, utvidet med `Object.assign(EMO, …)`) kobler emoji til ikon. `ico("🎯")` gir ikonet.
  * `emoIcons(root)` bytter automatisk ut en emoji som står alene i et element, eller først i en tekst etterfulgt av mellomrom. Det er en sikkerhetsnett-funksjon; skriv ikonet direkte (`${I.x}` eller `${ico("…")}`) i ny kode.
* Trenger du et ikon som ikke finnes: tegn det med `svg('<path …/>')` i samme stil (enkle former, ingen tekst, ingen farger i selve ikonet) og legg det i `I`. Skal en emoji i eksisterende data vises som ikon, legg den til i `EMO`.
* Ikonene arver tekstfargen (`currentColor`). Gi farge med CSS på elementet rundt, ikke i SVG-en.
* `node tools/test_design.js` feiler hvis det dukker opp en ny emoji i grensesnittkoden som ikke har et ikon i `EMO`.
* Vanlige tegn som ▶ ★ ✓ × → er tillatt når de brukes som tekst.

## 2. Illustrasjoner og figurer

* Hver oppgave har en illustrasjon (`qart.js`): en figur som viser oppgavens egne tall, eller temaets piktogram (`QP`, valgt fra enhetens tittel med `QP_RULES`). Nye enheter får piktogram automatisk; passer ingen regel, legg til en.
* En figur skal aldri forvirre: den viser tallene i oppgaven, eller er tydelig merket «Eksempel». I barne- og ungdomsskolen vises heller piktogrammet enn et eksempel med andre tall. En figur som avslører svaret, vises ikke før svaret er gitt.
* Piktogrammer: 64 × 64, 2,6 px avrundet strek i `--ink`, én aksentfarge (`qp-a`, `qp-g` eller `qp-r`), hvite eller myke flater (`qp-f`, `qp-sf`), ingen tekst. Fyll tegnes før omriss. En flate uten kant ser ut som et hull, så gi den kant.
* Teorifigurer: `viewBox 0 0 320 180`, fargeklasser (`fg-…`) i stedet for faste farger, én idé per figur, bildetekst som sier hva man skal se.
* Hele illustrasjonen skal synes uten å scrolle: aldri høyere enn vinduet minus topp- og bunnfelt (`--fig-fit`). På PC står figuren til venstre og teksten eller spørsmålet til høyre.
* Sjekk figurer med `node tools/check_figs.js` og visninger med `node tools/check_views.js`.

## 3. Farger og flater

* Bruk bare tokens fra `:root` i `styles.css` (`--accent`, `--ink`, `--muted`, `--card`, `--line`, `--gold`, `--ok`, `--bad` og deres `-deep`/`-soft`/`-text`-varianter). Ingen faste hex-farger i ny CSS, unntatt i figurer som må ha det.
* `--accent` er handling og valg. `--gold` er belønning. `--ok`/`--bad` er bare for svar, og alltid sammen med ikon eller ord (aldri farge alene).
* Brukeren kan bytte temafarge: bygg aldri inn blåfargen som en fast verdi.
* Flate farger. Ingen fargeoverganger (gradient) på kort eller knapper, ingen myke skygger.
* Trykkbare kort og knapper har 2 px kant i `--line` og en hard «leppe» under (`border-bottom-width:4px` eller `box-shadow:0 Npx 0 …-deep`).
* Ingen kort med tykk farget venstrekant. Gi heller hele kanten en svak farge (`color-mix(in srgb,var(--ok) 45%,var(--line))`) og la ikonet bære betydningen.
* Ringer, markeringer og fokus skal omslutte hele elementet, også leppen under. Ikke la en dekor-ring krysse knappen.
* Konfetti og feiring bare når det er noe å feire, aldri sammen med en stryk eller et feil svar.
* Sjekk alltid både lyst og mørkt tema. Tekst skal ha minst 4,5:1 kontrast.

## 4. Oppsett og navigasjon

* Én hovedhandling per skjerm (fylt knapp `.big` eller `NextStepCard`). Alt annet er sekundært: hvite kort, lenker eller `.big.ghost`.
* Hovedknappen etter et svar eller på slutten («Sjekk», «Fortsett», «Neste», «Øv på dette») står i et fast felt nederst (`.lfoot` / `.next-dock`), så den alltid synes og ikke dekker innhold.
* Mobil: én kolonne, maks 560 px. Fem faner nederst: Lær, Øv, Teori, Venner, Profil.
* PC (fra 1100 px): fanene blir en sidemeny til venstre, og skjermene deler seg i to kolonner der det gir mening (sti + «Start her», figur + tekst, liste + detaljer). Lesesider er maks 760 px brede. En kolonne som er høyere enn vinduet, skal ikke være `position: sticky`.
* Rader med like elementer (merker, fliser, valg) får like brede kolonner med CSS grid, ikke en rad som må scrolles sidelengs.
* Knappegrupper (`.seg`) under en etikett står til venstre; i innstillingsrader står de til høyre.
* Innstillinger er delt i fem kategorier. Nye innstillinger legges i riktig kategori, og farlige valg nederst i sin kategori.
* Trykkflater er minst 44 px (helst 56 px for hovedknapper). Alt skal virke med tastatur; vis snarveier diskret på PC.
* Nye brukere ser mindre: med 0 XP skjules tellere, utfordringer og spill.

## 5. Tekst

* Norsk bokmål først, og alltid engelsk også (`T("norsk", "English")`).
* Du-form, korte setninger, hverdagsord. Skriv for den yngste som kan lese teksten. Ingen utropstegn i brødtekst.
* Ikke gjenta svaralternativene i oppgaveteksten («Hvilket tall er størst?», ikke «Hvilket tall er størst: 33, 91, 54 eller 95?»).
* Versaler settes med CSS, aldri i kildeteksten.
* Axle er for alle nivåer (barneskole til universitet, førerkort, sykepleie, økonomi, jus, arkitektur). Ikke beskriv appen som bare ingeniørfag.

## 6. Logo

* A-merket er logoen: blått rutenett (`#2B59C3`) og gult bokmerke (`#E9A100`). Fargene er låst og følger ikke temafargen.
* Bruk `markSrc()` i appen, så følges brukerens valg av app-ikon (blå, black edition, følger lys/mørk). Bruk filene i `web/icons/` som de er.
* Alle egne sider (også statiske sider fra `tools/seo.js`) har et lite A-merke ved navnet øverst.
* Nye ikonstørrelser lages med `tools/make_logo.py`, ikke for hånd.

## 7. Slik sjekker du arbeidet

1. `python3 build.py`, og start en lokal server: `python3 -m http.server 8766 -d release/www`.
2. Ta skjermbilder med Playwright på 375 px (mobil), 768 px og 1280 px (PC), i lyst og mørkt tema, og se på dem. Sjekk særlig: ligger noe under faste felt, synes hele figuren, er hovedknappen synlig uten scrolling, er avstandene jevne.
3. Kjør `node tools/test_design.js`, `node tools/check_figs.js`, `node tools/check_views.js` og `npm test`.
4. Når et mønster endres eller et nytt kommer til: oppdater denne fila, slik at neste økt følger det.
