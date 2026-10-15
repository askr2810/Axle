# Undervisningsanimasjoner i Axle – arbeidsmåte og mal

Kodebaserte animasjoner som forklarer én faglig idé, i stil med gode pedagogiske YouTube-animasjoner. Lenket fra `docs/OPPGAVER_TERMINAL.md` (oppgave 13).

**Regel nr. 1:** Ingen animasjonskode før eieren har valgt tema og læringsmål og godkjent manuset. Claude lager aldri en animasjon på eget initiativ.

Oppgave 21 (2026-10-15): eieren bestilte en kortliste, to pilotmanus og én pilotprototype som kjøres lokalt utenfor appen. Se [Kortliste](#kortliste-over-temaer-2026-10-15), [Pilotene](#pilotene) og [Kvalitetsliste](#kvalitetsliste-for-manus-og-animasjon). Ingenting av dette er i appen.

---

## Arbeidsmåten (fire trinn, hvert med godkjenning)

| Trinn | Hvem | Resultat | Ferdig når |
|---|---|---|---|
| 1. Bestilling | Eieren | Tema, målgruppe og ett læringsmål (gjerne bare én setning) | Eieren har skrevet det |
| 2. Manus og brief | Claude | Del A (manus) og Del B (faglig kontroll) i malen under, lagret som `docs/animasjoner/<id>.md` | Eieren har lest og godkjent manuset. Fagpåstander som er usikre, er merket |
| 3. Kodeinstruks | Claude | Del C (implementeringsinstruks) i samme fil, skrevet *etter* at manuset er godkjent | Instruksen kan følges uten å gjette |
| 4. Bygging og kontroll | Claude | Koden, testene og sjekklista i Del D | Bygg og `npm test` er grønne, sjekklista er krysset av, og eieren har sett animasjonen på mobil |

Manus (A) og kodeinstruks (C) er separate. Manuset sier *hva* eleven skal se og høre og *hvorfor*. Kodeinstruksen sier *hvordan* det bygges. Står noe ikke i manuset, skal det ikke vises.

### Pedagogiske regler

- **Én hovedidé per scene.** Kan ikke scenen oppsummeres i én setning, er den for stor.
- **Bevegelse skal vise årsak, endring eller sammenheng** (noe vokser fordi noe annet endres, to ting er like fordi de kan flyttes oppå hverandre). Aldri bevegelse bare for pynt.
- **Fortelleren forklarer det visuelle.** Teksten skal ikke lese opp det som står på skjermen. Står det `a² + b² = c²`, sier fortelleren for eksempel: «Legg merke til at de to små rutene fyller den store nøyaktig.»
- **Bildet før formelen.** Formelen kommer når eleven har sett hvorfor den stemmer.
- **Misforståelsen tas på alvor.** Vis den feile tanken, la den feile synlig, og vis så den riktige.
- **Tenkepauser:** minst én scene der animasjonen stopper og stiller et spørsmål før svaret vises.
- **Kort:** 60–180 sekunder totalt. Del opp hvis det blir lengre.
- **Samme begreper som Axle ellers** (Lær / Øv / Teori, enhetsnavnene i faget) og samme begreper på norsk og engelsk.

---

## MAL – kopier til `docs/animasjoner/<id>.md`

```markdown
# Animasjon: <tittel> (id: <id>)
Status: utkast | manus godkjent <dato> | kodeinstruks klar | bygget | publisert
Fag/enhet: <KODE>, enhet <n> «<enhetsnavn>»   Plassering: teori (![anim:<id>]) og Labben

## Del A – Manus

### 1. Målgruppe og mål
- Målgruppe: <trinn/studium>
- Forkunnskaper eleven har: <liste>
- Læringsmål (ett, målbart): «Etter animasjonen kan eleven …»
- Misforståelsen vi vil overvinne: «Mange tror at … fordi …»

### 2. Scener
| # | Tid (s) | Hovedidé (én setning) | Hva skjer på skjermen (nøyaktig bevegelse) | Kamera | Tekst på skjermen | Fortellertekst (nb) | Fortellertekst (en) |
|---|---|---|---|---|---|---|---|
| 1 | 0–12 | … | «Kvadratet med side a glir inn fra venstre (1,0 s, ease-out) og stopper inntil trekanten.» | Fast, hele figuren | «a» ved siden | «…» | «…» |
| 2 | 12–20 | **Tenkepause** | Animasjonen stopper. Spørsmål vises. | – | «Hvor stor er den store ruta?» | «Hva tror du? Trykk når du er klar.» | «…» |

Regler for kolonnene: tid i sekunder fra start; bevegelse med start, slutt, varighet og hva som utløser den (tid eller «Neste»); fortellerteksten skal kunne leses på tiden som er satt av (ca. 2,5 ord/s på norsk).

### 3. Alt som vises
- Formler (LaTeX nøyaktig slik de vises): …
- Symboler og hva de betyr: …
- Enheter: …
- Tall og eksempler (med utregning): …
- Farger: hvilken størrelse har hvilken farge (bruk --c1 … --c5 og samme farge hele veien)

### 4. Kontroll av forståelsen (etter siste scene)
- Spørsmål: …   Riktig svar: …   Feilsvar og hvorfor de er fristende: …
- Forklaring etter svar: …

### 5. Tilgjengelighet
- Teksting: hele fortellerteksten som tekst under animasjonen, synkronisert per scene (nb og en).
- Transkript: hele manuset som tekst, med beskrivelse av det visuelle (for skjermleser og for utskrift).
- Redusert bevegelse: hva vises i stedet (hver scene som et stillbilde av sluttilstanden, med Neste/Forrige).
- Mobil (375 px): hvordan figuren skaleres; ingen tekst under 12 px; ingenting under faste knapper.
- Avspilling: Spill/Pause, Forrige/Neste scene, tidslinje, hastighet (0,75×, 1×, 1,25×), lyd av/på. Animasjonen starter ikke av seg selv.

## Del B – Faglig kontroll
| Påstand / utregning / eksempel | Kontrollert mot (kilde) | Resultat | Usikkerhet |
|---|---|---|---|
| … | lærebok/forskrift/standard, med side eller paragraf | stemmer / rettet | … |
Usikre påstander merkes og legges inn i docs/FAGLIG_KONTROLL.md. Ingenting merkes faglig godkjent uten en ekte fagperson (reviewedBy fylles ikke ut av Claude).

## Del C – Implementeringsinstruks til Claude (skrives etter at Del A er godkjent)
(se «Kodeinstruks – standardtekst» i docs/ANIMASJONER.md, og fyll inn de konkrete verdiene for denne animasjonen)

## Del D – Sjekkliste før publisering
- [ ] Bygg og npm test grønne (inkl. tools/test_anim.js)
- [ ] Sett på 375 px og 1280 px, lyst og mørkt tema
- [ ] Redusert bevegelse gir stillbilder og fungerer med Neste/Forrige
- [ ] Teksting følger fortellerteksten; transkript finnes på nb og en
- [ ] Tastatur: Mellomrom = spill/pause, ←/→ = forrige/neste scene; alle knapper har navn
- [ ] Tenkepausen venter faktisk på eleven
- [ ] Kontrollspørsmålet virker og forklaringen vises etter svar
- [ ] node tools/check_figs.js: ingen etiketter som krysser streker
- [ ] Faglig kontroll (Del B) er fylt ut; usikkerhet ligger i FAGLIG_KONTROLL.md
```

---

## Kodeinstruks – standardtekst (Del C)

Denne teksten limes inn i Del C og fylles ut. Den beskriver hvordan animasjoner bygges i Axle uten nye avhengigheter.

1. **Felles avspiller (bygges sammen med den første animasjonen, gjenbrukes etterpå):** ny fil `anim.js`, lagt til i `build.py` rett etter `sims7.js`. Vanilla JS, ingen biblioteker. Registeret er `const ANIMS = {}`. Hver animasjon har `{ t: [nb, en], dur, scenes: [{ t0, t1, cap: [nb, en], draw(p, v) }], check: { q, opts, ans, why } }`, der `draw(p, v)` returnerer SVG for fremdrift `p` (0–1) i scenen. `v` er gjeldende verdier.
2. **Tegning:** SVG med hjelperne i `figures.js` (`fgT`, `fgAr`) og fargeklassene `fg-c1 … fg-c5`, som i `sims*.js`. Ingen canvas, så teksten skalerer skarpt og kan sjekkes av `tools/check_figs.js`.
3. **Tid:** `requestAnimationFrame`. Tiden styres av avspilleren, ikke av lyden. Scenen tegnes fra `p`, så tidslinje og hopp mellom scener alltid gir samme bilde. Tenkepauser er scener med `wait: true`, der avspilleren stopper til eleven trykker «Neste».
4. **Fortellerstemme:** se stemmevalget under. Standard er tekstingen alene, med valgfri opplesing via `tts.js` (`ttsSay`, samme stemmevalg som «Lytt»). Opplesingen startes per scene, og avspilleren venter på `onend` før neste scene. Det gjør synkroniseringen robust for ulike stemmer og hastigheter. Er det innlest lyd: én fil per scene i `assets/anim/<id>/<scene>.<nb|en>.m4a`, og scenen varer til lyden er ferdig.
5. **Redusert bevegelse:** `matchMedia("(prefers-reduced-motion: reduce)")` gir trinnmodus. Hver scene vises som `draw(1)` (sluttbildet) med teksting og Forrige/Neste. Ingen automatisk avspilling.
6. **Kontroller:** Spill/Pause, Forrige/Neste scene, tidslinje (`input type=range`), hastighet, teksting av/på, lyd av/på. Alle har `aria-label`. Tekstingen ligger i en `aria-live="polite"`-region. Tastatur: Mellomrom, ←, →.
7. **Plassering:** linjen `![anim:<id>]` i teorien (samme mekanisme som `![sim:navn]` i `sims.js`), og et kort i Labben (`lab.js`, egen gruppe «Animasjoner»). Lenke fra enheten i `SIM_MAP` hvis den passer.
8. **Tekst:** alle strenger i `T(nb, en)`. Engelsk uten norske bokstaver (sjekkes som i `tools/test_sims.js`).
9. **Test:** `tools/test_anim.js` (legges i `npm test`). Hver scene tegnes ved p = 0, 0,5 og 1 uten NaN og uten krasj. Tidene henger sammen uten hull eller overlapp. Hver scene har teksting på nb og en. Kontrollspørsmålets riktige svar finnes blant alternativene. Hver `![anim:id]` peker på en animasjon som finnes.
10. **Størrelse:** én animasjon bør være under ca. 15 kB kode. Lydfiler lastes først når eleven trykker Spill, og caches av service workeren for offline bruk.

---

## Fortellerstemme: undersøkelse (2026-10-15)

Krav fra Axle: gratis, ingen API-nøkkel eller betalt tjeneste uten godkjenning, personvern (ingen brukerdata ut), helst offline, både norsk og engelsk.

| Alternativ | Kvalitet nb / en | Uttale av fag (formler, enheter) | Pris | Lisens | Personvern | Offline | Vurdering |
|---|---|---|---|---|---|---|---|
| **Nettleserens talesyntese (Web Speech API)**, brukes allerede i `tts.js` («Lytt») | Varierer med enheten. iPhone/iPad/Mac har gode norske stemmer (for eksempel «Nora», forbedret kvalitet), Android har Googles norske stemme, Windows har Microsofts. Engelsk er god overalt | Formler må skrives om til ord (`ttsTex` gjør det for teorien). Stemmen kan ikke styres i detalj | Gratis | Ingen lisens å forholde seg til | Lokale stemmer: teksten blir på enheten. Noen nettleserstemmer (for eksempel Microsofts «Online (Natural)» i Edge) sender teksten til leverandøren | Ja for lokale stemmer | **Anbefales som standard.** Ingen avhengighet. Synkroniser per scene med `onend`, ikke med tidskoder |
| **Piper** (åpen kildekode, kjøres på egen maskin) | Norsk stemme «talesyntese» (medium, én mannsstemme, 22 kHz) er forståelig, men tydelig syntetisk. Engelsk har mange stemmer | Kan styres med egen uttaleliste | Gratis | Motoren: GPL-3.0 i den nye utgaven (OHF-Voice/piper1-gpl). Den gamle MIT-utgaven er arkivert. Den norske stemmen: datasettet fra Nasjonalbibliotekets Språkbanken er CC0 (ifølge stemmens MODEL_CARD) | Kjøres lokalt: ingenting sendes ut | Ja | **Mulig for ferdig innlest lyd.** Eieren genererer lydfilene på egen maskin, og bare lydfilene legges i appen. Ikke i nettleseren: modellen er ca. 60 MB. Lisensen bør bekreftes før bruk (se under) |
| **Skytjenester** (Azure, Google Cloud, OpenAI, ElevenLabs m.fl.) | Svært naturlig, også på norsk | God, med SSML eller uttalelister | Gratiskvoter, deretter betalt per tegn | Vilkårene for bruk av lyden må leses per tjeneste | Manustekst sendes til leverandøren (ingen brukerdata, siden lyden lages på forhånd) | Lyden kan lagres og spilles av offline | **Ikke i appen.** ElevenLabs er tatt i bruk for prototypene etter eierens ønske (oppgave 21), med eierens nøkkel fra miljøet; se under |
| **Egen innlesing** (eieren eller en lærer leser manuset) | Best, med riktig uttale og trykk | Best | Gratis (tid) | Egen | Ingen | Ja | **Beste kvalitet**, særlig for de første animasjonene. Manuset er laget for innlesing |

**Anbefaling:** Lag manus klart for innlesing med full teksting. I appen brukes tekstingen alltid, og opplesing med nettleserens stemme er valgfri (samme mekanisme som «Lytt»). Vil eieren ha fast, naturlig lyd, er egen innlesing best, og Piper er en gratis offline-reserve. Ingen betalt tjeneste, API-nøkkel eller ny avhengighet er lagt til.

**Ikke kontrollert:** hvordan stemmene faktisk høres ut på fysiske enheter (iPad, Android, Windows); ingen lydprøver er tatt. Lisensen for Piper-stemmen er hentet fra stemmens MODEL_CARD på Hugging Face (`rhasspy/piper-voices`, `no/no_NO/talesyntese/medium`), og GPL-overgangen for motoren fra omtaler, ikke fra prosjektets egen kunngjøring. Begge bør leses i originalen før bruk.

---

## Kortliste over temaer (2026-10-15)

Valgt fra enheter som finnes i Axle, der en bevegelse viser noe et stillbilde ikke kan: en grense, en endring over tid eller en årsak. Rekkefølgen er en anbefaling. Derivasjon og integrasjon er pilotene.

| # | Tema | Hvor i Axle | Målgruppe og forkunnskaper | Elevspørsmålet | Misforståelsen | Hva bevegelsen viser bedre |
|---|---|---|---|---|---|---|
| 1 | **Fra sekant til tangent** (pilot, manus og prototype) | VG1T 3, VGR1 2, GMAT 8, MEK1000 1 | 1T/R1; stigningstall for rett linje | «Hvordan kan en kurve ha ett stigningstall?» | To vilkårlige punkter gir stigningen | Sekanten dreier og låser seg til tangenten når h → 0 |
| 2 | **Integralet: smale rektangler og samlet mengde** (pilot, manus) | VGR2 1 og 7, MEK1000 2, NUM 2 | R2; areal av trekant, s = v · t | «Hvorfor er integralet et areal?» | Integral er bare «motsatt av derivasjon», og rektangler gir bare et omtrentlig svar | Trappen klemmes inn mot linjen fra over og under; arealet vokser med øvre grense |
| 3 | **Lineær og eksponentiell vekst** | VG1P 1, VG2P 2, VG1T 8, GU810 2 | 1P/2P; prosent og vekstfaktor | «Hvorfor går renta på renta så fort?» | 10 % per år = 10 kr mer hvert år | To søyler vokser side om side; den ene får like store tillegg, den andre stadig større |
| 4 | **Brøk: like store deler** | GS57 1, GU810 2 | 5.–8. trinn; brøk som del av en helhet | «Hvorfor kan jeg ikke bare legge sammen tellerne og nevnerne?» | 1/3 + 1/4 = 2/7 | Pizzastykker deles om til like store biter (tolvdeler) før de legges sammen |
| 5 | **Likninger som skålvekt** | GS57 7, GU810 4, VG1T 1 | 6.–9. trinn; de fire regneartene | «Hvorfor må jeg gjøre det samme på begge sider?» | Man kan «flytte over» uten å endre fortegn | Vekta tipper når én side endres, og retter seg når begge endres likt (utvider «Lær først»-leksjonen) |
| 6 | **Kraft og bevegelse (Newtons 1. og 2. lov)** | GFYS 3, VGFY1 2, GUNAT 3 | 9. trinn–Vg1; fart og akselerasjon | «Trenger en ting som beveger seg, en kraft for å fortsette?» | Bevegelse krever kraft i bevegelsesretningen | Kloss på is og på teppe: friksjonen fjernes trinnvis, og farten holder seg |
| 7 | **Sannsynlighet: store talls lov** | GS57 9, GU810 7, VG1P 5, MEK2200 1 | 6. trinn og opp; brøk og prosent | «Er det mer sannsynlig med krone etter fem kron på rad?» | Spillerens feilslutning | Tusen myntkast der den relative frekvensen roer seg mot 0,5 mens enkeltkastene forblir tilfeldige |
| 8 | **Fotosyntesen: hvor kommer massen fra?** | VGBI1 5 | Vg2 (biologi 1); atomer og molekyler | «Hvor kommer treets vekt fra?» | Fra jorda | CO₂ fra lufta bygges inn i glukose og cellulose; jordas masse står nesten stille |

Risikofag (legemiddelregning, førerkort, jus) er holdt utenfor kortlista: en animasjon der ville kreve faglig godkjenning før den kan brukes.

## Pilotene

- **Manus:** [animasjoner/derivasjon.md](animasjoner/derivasjon.md) og [animasjoner/integrasjon.md](animasjoner/integrasjon.md). Begge følger malen over, med målgruppe, forkunnskaper, «Etter filmen kan eleven …», scener på 5–15 s, nøyaktig fortellertekst, skjermtekst, hva som vises per replikk, kontrollert eksempel, oppsummering og kontrollspørsmål, tilgjengelighet og faglig kontroll med kilder.
- **Prototype (derivasjon):** `prototypes/animasjoner/derivasjon/`, med felles avspiller `prototypes/animasjoner/player.js` og `player.css`. HTML og SVG uten avhengigheter: Spill/Pause/Fortsett/Spill på nytt, Forrige/Neste scene, tidslinje, hastighet, teksting, lyd, norsk/engelsk, tenkepause som venter, trinnmodus ved redusert bevegelse, transkript og kontrollspørsmål med ✓/✗. Se `prototypes/animasjoner/README.md` for hvordan den startes.
- **Kontroll:** `node tools/test_anim_proto.js` (i `npm test`): tider, taletempo, nb/en, tenkepause, kontrollspørsmål, alle tegninger uten NaN, og tallene i fortellerteksten regnet ut på nytt. `node tools/check_anim_proto.js` (Playwright, lokal server): kollisjoner i figuren på 375/768/1280 px i lyst og mørkt tema, tastatur, tenkepause, slutt og trinnmodus.

### Fortellerstemme med ElevenLabs

Appen spiller bare av ferdige lydfiler; den lager aldri tale og kontakter ingen tjeneste. Lyden lages én gang med `tools/anim_voice.mjs`, og bare på nytt når manuset eller stemmen endres (manifestet har et fingeravtrykk av teksten i hver replikk).

1. **Gjør nøkkelen synlig for kommandoen.** `ELEVENLABS_API_KEY` og `ELEVENLABS_VOICE_ID` leses bare fra miljøet. Kjør kommandoene i det terminalvinduet der de er satt. Nøkkelen skrives aldri ut, lagres ikke og skal aldri i repoet.
2. `node tools/anim_voice.mjs --plan` viser plan og status (aldri nøkkelen). `node tools/anim_voice.mjs --voices` viser stemmene på kontoen.
3. `node tools/anim_voice.mjs derivasjon --provider elevenlabs --dry-run` viser manus, språk, stemme-ID, modell og antall tegn.
4. **Privat prøve:** `node tools/anim_voice.mjs derivasjon --provider elevenlabs --sample` (standard replikk l01 og l08; velg andre med `--sample l03,l12`). Filene havner i `local/anim-voice-sample/derivasjon/` (i .gitignore). De publiseres aldri, heller ikke fra gratisplanen.
5. **Endelig lyd, etter godkjent stemme og manus:** `node tools/anim_voice.mjs derivasjon --provider elevenlabs` (og `--lang en` hvis engelsk skal ha stemme). Skriptet nekter hvis planen ikke er betalt og aktiv. Filene havner i `assets/anim/derivasjon/` (i Git, kopieres til `anim/` i bygget av build.py), og manifestet lagrer plan, status, dato, modell og stemme-ID.
6. Lytt gjennom alt, kjør `python3 build.py`, `npm test` (feiler hvis lyden er laget av en annen tekst enn manuset, eller ikke på en betalt plan) og `node tools/check_anim.js`.

**Lisens:** ElevenLabs’ gratisplan har ingen kommersiell lisens, og lyd laget der får det ikke ved senere oppgradering. Alle betalte planer har kommersiell lisens for innhold laget mens planen er aktiv, også etter at abonnementet avsluttes, unntatt Beta-tjenester ([ElevenLabs: Can I publish the content I generate on the platform?](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform), lest 2026-10-15). Bruk ikke en modell som er merket Beta til lyd som skal publiseres. Les vilkårene på nytt før endelig lyd lages.

**macOS-stemmene (for eksempel «Nora»)** kan bare brukes til å prøve tempo og synkronisering lokalt (`--provider say`, til `local/`). Apples lisens (macOS 27, punkt F «Voices») tillater bare personlig, ikke-kommersiell bruk og forbyr «recording, publishing or redistribution … in a profit, non-profit, public sharing or commercial context».

## Animasjoner i appen (anim.js)

Første animasjon i appen: **derivasjon** (manus og regi i [animasjoner/derivasjon.md](animasjoner/derivasjon.md)). Avvik fra standardteksten for Del C, og hvorfor:
- **Én tidslinje i replikker, ikke scener.** Hver replikk har en fast plass; alt i bildet regnes ut fra tiden (`state(t)`), så hopp i tidslinjen gir samme bilde, og bevegelsen kan testes uten nettleser.
- **Egen skjerm** (`#/animasjon/<id>`) med et kort i teorien (`![anim:<id>]`, satt inn av `withAnim`), i «Labber i faget» og i Labben. En hel skjerm gir plass til bilde, levende tall, kontroller og teksting på mobil.
- **To oppsett** (smal og bred), så teksten i bildet er 14–20 px på skjermen.
- **Linjer og kurve klippes i geometrien**, ikke med `clip-path`, så kollisjonskontrollen ser det samme som eleven.
- **Lyd:** ferdige filer (`assets/anim/<id>/`) eller enhetens stemme. Bildet venter ved slutten av en replikk til stemmen er ferdig.
- **Kontroll:** `tools/test_anim.js` (i npm test) og `tools/check_anim.js` (Playwright, lokal server).

Prototypen i `prototypes/animasjoner/` (oppgave 21) er erstattet og brukes ikke lenger.

## Kvalitetsliste for manus og animasjon

Brukes i trinn 2 (manus) og trinn 4 (før animasjonen vises for eieren). Punktene med (auto) sjekkes av `tools/test_anim_proto.js` eller `tools/check_anim_proto.js`.

**Manus**
- [ ] Ett læringsmål, skrevet som «Etter filmen kan eleven …», og ett elevspørsmål som filmen svarer på.
- [ ] Misforståelsen vises, feiler synlig og blir erstattet, ikke bare nevnt.
- [ ] Bildet kommer før formelen. Hver scene har én hovedidé.
- [ ] Fortelleren forklarer bildet og leser ikke opp skjermteksten.
- [ ] 60–120 s totalt, 5–15 s per scene, høyst ca. 2,5 ord/s (auto).
- [ ] Minst én tenkepause som venter på eleven (auto).
- [ ] Alle tall har kontrollert utregning, og tallene i fortellerteksten stemmer med den (auto for pilotene).
- [ ] Hver replikk er merket TTS-klar, «må testes» eller «menneskelig innlesing».
- [ ] Faglig kontroll (Del B) med kilde og usikkerhet; ingenting merkes godkjent uten fagperson.

**Animasjon**
- [ ] Samme farge for samme størrelse hele veien; ingen informasjon bare i farge (✓/✗ og ord i tillegg).
- [ ] Ingen tekst over streker eller annen tekst, og ingen tekst utenfor figuren, på 375/768/1280 px i lyst og mørkt tema (auto).
- [ ] Ingen tekst under ca. 11 px på 375 px; knapper minst 44 px.
- [ ] Teksting følger fortellerteksten; transkript med bildebeskrivelse på nb og en (auto).
- [ ] Redusert bevegelse gir stillbilder med Forrige/Neste og ingen automatisk avspilling (auto).
- [ ] Tastatur: Mellomrom, ←, →; tenkepausen stopper og viser «Fortsett» (auto).
- [ ] Hopp i tidslinjen gir samme bilde som avspilling (tegnes fra tid, ikke fra forrige bilde).
- [ ] Starter ikke av seg selv; lyd bare når eleven slår den på.
- [ ] Lyttet gjennom med den valgte stemmen, og uttalen av symboler er rettet med `say`.
- [ ] Sett av eieren på mobil før den vurderes for appen.
