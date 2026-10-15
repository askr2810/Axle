# Undervisningsanimasjoner i Axle – arbeidsmåte og mal

Kodebaserte animasjoner som forklarer én faglig idé, i stil med gode pedagogiske YouTube-animasjoner. Lenket fra `docs/OPPGAVER_TERMINAL.md` (oppgave 13).

**Regel nr. 1:** Ingen animasjonskode før eieren har valgt tema og læringsmål og godkjent manuset. Claude lager aldri en animasjon på eget initiativ.

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
| **Skytjenester** (Azure, Google Cloud, OpenAI, ElevenLabs m.fl.) | Svært naturlig, også på norsk | God, med SSML eller uttalelister | Gratiskvoter, deretter betalt per tegn | Vilkårene for bruk av lyden må leses per tjeneste | Manustekst sendes til leverandøren (ingen brukerdata, siden lyden lages på forhånd) | Lyden kan lagres og spilles av offline | **Ikke tatt i bruk.** Krever API-nøkkel og konto, som eieren må godkjenne |
| **Egen innlesing** (eieren eller en lærer leser manuset) | Best, med riktig uttale og trykk | Best | Gratis (tid) | Egen | Ingen | Ja | **Beste kvalitet**, særlig for de første animasjonene. Manuset er laget for innlesing |

**Anbefaling:** Lag manus klart for innlesing med full teksting. I appen brukes tekstingen alltid, og opplesing med nettleserens stemme er valgfri (samme mekanisme som «Lytt»). Vil eieren ha fast, naturlig lyd, er egen innlesing best, og Piper er en gratis offline-reserve. Ingen betalt tjeneste, API-nøkkel eller ny avhengighet er lagt til.

**Ikke kontrollert:** hvordan stemmene faktisk høres ut på fysiske enheter (iPad, Android, Windows); ingen lydprøver er tatt. Lisensen for Piper-stemmen er hentet fra stemmens MODEL_CARD på Hugging Face (`rhasspy/piper-voices`, `no/no_NO/talesyntese/medium`), og GPL-overgangen for motoren fra omtaler, ikke fra prosjektets egen kunngjøring. Begge bør leses i originalen før bruk.
