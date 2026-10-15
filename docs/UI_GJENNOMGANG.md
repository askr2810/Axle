# UI-gjennomgang (oppgave 20, 2026-10-15)

Gjennomgått som ny elev (VGS → «Helt fra start») i Chrome med Playwright på 375 × 667/780, 768 × 1024 og 1280 × 860 px, lyst og mørkt tema, med tastatur der det er relevant. Skjermbilder ble sett på for hver endring. Forrige runde (oppgave 12 og 19) ble kontrollert på nytt i den faktiske appen, ikke bare i rapporten.

Automatiske kontroller (Playwright, kjøres mot lokal server):

- `tools/check_flows.js` (ny): svarer riktig og feil i 8 svarflyter (oppgave flervalg, oppgave med lang forklaring, teoriprøve førerkort, skiltspill, kartspill rolig og med tid, lynrunde, sant/usant) på 375, 768 og 1280 px, lyst og mørkt. Feiler hvis «Neste»/«Fortsett» er utenfor skjermen, dekket, mangler fokus, er lavere enn 44 px eller ikke går videre med Enter. 55 kontroller, 0 feil. Verifisert at den feiler når handlingsraden ikke klistrer seg nederst.
- `tools/check_views.js` (fra oppgave 18): kollisjoner i simuleringer, oppgaver, flashcards og kartspill.
- axe-core (WCAG 2.2 AA) og kontroll av innhold under faste felt ble kjørt i oppgave 12; kjørt på nytt for skjermene som er endret her: 0 funn.

## Kontroll av forrige rundes endringer

| Rapportert i runde 2/3 | Kontrollert nå | Resultat |
|---|---|---|
| «Neste» synlig uten å bla (oppgave 19) | `check_flows.js`, alle størrelser og begge temaer, riktig og feil svar | Stemmer. Én svakhet funnet: lynrunden viste ingen tekst etter feil svar, bare farge (rettet under). |
| Kontrast i lyst og mørkt tema (oppgave 12) | Skjermbilder av Lær og Øv i begge temaer | Stemmer for de kontrollerte skjermene. |
| Søk finner Labben | Søk «ohms lov» | Stemmer, men spill (kartspillet) og verktøy manglet (rettet under). |
| Piltaster i radiogrupper | Tastatur i språkvalget | Stemmer. |

## Endringer (hva eleven prøver å gjøre → hvor hen stopper opp → hva som er endret → hvorfor det hjelper)

1. **Begynne på Lær.**
   - *Prøver:* starte faget.
   - *Usikker:* forsiden viste både «START HER … START» (kortet) og «START» (boblen ved nivåsirkelen). Begge startet nøyaktig det samme (samme enhet og nivå), så det så ut som to forskjellige ting.
   - *Endret:* boblen sier nå «Du er her» og er skjult for skjermleser (sirkelen har egen etikett); kortet er den ene startknappen.
   - *Effekt:* én hovedhandling; stien viser hvor eleven står.

2. **Velge hva man skal øve på (Øv).**
   - *Prøver:* finne det lurest å gjøre nå.
   - *Usikker:* fire fylte hovedknapper konkurrerte (Velg tema, Dagens utfordring, Øv nå, Velg kortstokk), og «Anbefalt nå» lå under fokus, labber og løste oppgaver. Den anbefalte knappen («Start» på dagens utfordring) var den minst synlige (hvit med kant).
   - *Endret:* «Anbefalt nå» (feil å repetere eller dagens utfordring) står rett under søket, og knappen der er den eneste fylte. «Velg tema» og «Øv nå» blir sekundære når det finnes en anbefaling; ellers er «Velg tema» hovedvalget. Ingenting er fjernet, og rekkefølgen fra «Tilpass Øv» gjelder fortsatt for resten.
   - *Effekt:* én tydelig neste handling, resten gruppert under de eksisterende overskriftene (Øv mer, Spill, Eksamenstrening, Uka di, Hjelpemidler).

3. **Finne kartspillet.**
   - *Prøver:* finne spillet med kart.
   - *Usikker:* kartspillet lå bare inne i menyen «Spill og dueller» (for VGS og ungdomsskole), undertittelen nevnte det ikke, og søk etter «kart» fant oppgaver om målestokk, ikke spillet.
   - *Endret:* søket viser nå «Labber, spill og verktøy» med alle spill (kartspillet, dueller, lynrunde …), lærerverktøy og Pomodoro, med vanlige søkeord (kart, land, geografi, historie, lærer, lekse …). Undertittelen er «Duell, snacks, lynrunde, kartspillet og mer» når kartspillet er tilgjengelig.
   - *Effekt:* to veier inn: søk og spillmenyen.

4. **Forstå hva som skjedde etter et svar.**
   - *Prøver:* se om svaret var riktig og hva som var riktig.
   - *Usikker:* riktig og feil svaralternativ i oppgaver, kart- og skiltspill ble vist bare med grønn og rød kant. Lynrunden viste ingen tekst etter feil svar.
   - *Endret:* ✓ og ✗ på alternativene i tillegg til fargen; lynrunden skriver «Feil – riktig svar er merket med ✓.»
   - *Effekt:* ikke avhengig av fargesyn.

5. **Pomodoro-flisen på mobil.**
   - *Usikker:* tittelen «Pomodoro» lå under den oransje spill-knappen på 375 px («Pomodor▶»).
   - *Endret:* tomat-ikonet skjules når flisen er smal, og tittelen kuttes pent hvis den likevel blir for lang.
   - *Effekt:* tittel og knapp kan leses og treffes hver for seg.

## Kontrollert uten funn

- Tastaturfokus: alle knapper og felt har synlig fokusring (3 px). «Neste»/«Fortsett» får fokus etter svar.
- Trykkflater: knappene i svarflytene er 52 px høye; ingen knapper under 24 × 24 px på de kontrollerte skjermene.
- Faste felt dekker ikke innhold når man har rullet helt ned (28 skjermer).
- Låste nivåer har forklarende tekst og skjermleseretikett.

## Ikke rettet (anbefalt videre)

- **Tilpass Øv har mange valg.** Elever som har flyttet seksjoner, kan få «Anbefalt nå» lenger ned; den løftes bare når den står først. Det er et bevisst valg for å respektere egne innstillinger.
- **Mitt fokus og Pugg bruker begge ordet «øv»** i knapper og forklaringer. Navnene er etablerte i appen; kan vurderes sammen med eieren.
- **Ekte skjermleser (VoiceOver/TalkBack) og fysisk iPhone/iPad** er ikke testet; safe area er kontrollert i CSS, ikke på enhet.
- **Dueller og live-quiz** krever innlogging og Supabase og ble ikke testet mot ekte data.
