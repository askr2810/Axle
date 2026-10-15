# Animasjon: Fra sekant til tangent – hva den deriverte er (id: derivasjon)
Status: pilotmanus og prototype (oppgave 21, 2026-10-15). Ikke faglig godkjent av fagperson. Ikke i appen.
Fag/enhet: VG1T, enhet 3 «Derivasjon og vekstfart»; også VGR1 enhet 2 «Derivasjon og drøfting», GMAT enhet 8 «Innføring i derivasjon» og MEK1000 enhet 1 «Derivasjon».
Plassering (hvis den tas inn senere): teorien i enhetene over (![anim:derivasjon]) og Labben, ved siden av simuleringen «Fra sekant til tangent» (`secant` i sims4.js).
Prototype: `prototypes/animasjoner/derivasjon/` (manus, tegning og tider ligger i `anim.js`; tabellen under er laget fra den fila).

## Del A – Manus

### 1. Målgruppe og mål
- **Målgruppe:** elever i 1T eller R1 som møter den deriverte for første gang (16–17 år), og studenter som repeterer (GMAT, MEK1000).
- **Forkunnskaper:** stigningstallet til en rett linje som Δy/Δx; å sette inn i et funksjonsuttrykk; å regne ut (3 + h)².
- **Etter filmen kan eleven** forklare at den deriverte i et punkt er stigningstallet til tangenten, og at den finnes ved å la sekanter gjennom punktet bli kortere og kortere (h → 0). Eleven kan bruke det til å finne f′(3) = 6 for f(x) = x².
- **Elevspørsmål filmen svarer på:** «Hvordan kan en kurve ha *ett* stigningstall når den hele tiden bøyer seg?»
- **Misforståelsen vi vil overvinne:** «Stigningen til en kurve finner du ved å ta to punkter på den, som for en rett linje.» Svaret avhenger da av hvilke punkter man velger (8 eller 7), og det er gjennomsnittlig vekstfart, ikke momentan. Orton (1983) fant at mange elever kunne regle derivasjon uten å se den deriverte som grensen for sekantenes stigning.
- **Hva bevegelse viser bedre enn et stillbilde:** at sekanten *dreier* og nærmer seg én bestemt linje mens Q glir mot P. Grensen blir en bevegelse eleven ser, ikke et symbol (lim).
- **Lengde:** 111 s (60–120 s). **Visuell stil:** som Axles figurer: rutefritt koordinatsystem, grafen blå (--c3), sekanten oransje (--c2), tangenten grønn (--c4), stigningstrekant og h lilla (--c5). Samme farge for samme størrelse hele veien. Tekst i høyre felt, aldri oppå grafen.

### 2. Scener
Ca. 2,5 ord/s på norsk; testen (`tools/test_anim_proto.js`) feiler over 2,6 ord/s på norsk og 3,0 på engelsk. Hver scene varer 5–15 s.
**Stemme:** «TTS-klar» = tallene er skrevet som ord eller vanlige tall og bør leses riktig av en god norsk stemme. «Må testes» = uttalen av symboler (h, x i andre, f derivert) må lyttes gjennom; hvis den er feil, legges en egen `say`-tekst på replikken i `anim.js`. Menneskelig innlesing anbefales hvis filmen skal publiseres (se Fortellerstemme i docs/ANIMASJONER.md).

| # | Scene | Tid (s) | Fortellertekst nb (nøyaktig) | Fortellertekst en | Hva vises (bildet) | Stemme |
|---|---|---|---|---|---|---|
| l01 | 1. Hvor bratt er kurven? | 0–8 | En rett linje er like bratt overalt. Men hvor bratt er denne kurven akkurat der x er 3? | A straight line is equally steep everywhere. But how steep is this curve exactly where x is 3? | Grafen til f(x) = x² tegnes fra venstre. Punktet P(3, 9) dukker opp. | TTS-klar |
| l02 | 2. En sekant | 8–18 | Vi låner en idé fra rette linjer. Vi velger et punkt til, der x er 5, og trekker en linje gjennom begge punktene. | We borrow an idea from straight lines. We pick one more point, where x is 5, and draw a line through both points. | Punktet Q(5, 25) dukker opp. En rett linje (sekanten) trekkes gjennom P og Q. | TTS-klar |
| l03 | 3. Stigningen til sekanten | 18–25 | Linjen stiger 16 når vi går 2 bortover. Stigningstallet er 16 delt på 2, altså 8. | The line rises 16 when we move 2 across. The slope is 16 divided by 2, which is 8. | En stigningstrekant: 2 bortover og 16 opp. Skjermtekst: stigning = 16 / 2 = 8. | TTS-klar |
| l04 | 4. Det avhenger av punktet | 25–34 | Hadde vi valgt x lik 4 i stedet, ville linjen fått stigningstallet 7. Svaret avhenger av hvilket punkt vi velger. | If we had picked x equal to 4 instead, the line would have slope 7. The answer depends on which point we pick. | Q glir fra x = 5 til x = 4, og sekanten blir slakere. Tabell: Q ved x = 5 gir 8, Q ved x = 4 gir 7. | TTS-klar |
| l05 | 4. Det avhenger av punktet | 34–38 | Så ingen av dem er stigningen i selve punktet P. | So neither of them is the slope at the point P itself. | Begge sekantene står igjen. Skjermtekst: «Ingen av dem er stigningen i P.» | TTS-klar |
| l06 | 5. Tenkepause | 38–47 **(venter)** | Hva tror du skjer med stigningstallet når det andre punktet kommer nærmere og nærmere P? Tenk deg om, og trykk Fortsett. | What do you think happens to the slope as the second point gets closer and closer to P? Think about it, then press Continue. | Tenkepause. Q står igjen ved x = 5. Spørsmålet står på skjermen, og animasjonen venter. | TTS-klar |
| l07 | 6. Q glir mot P | 47–53 | La det andre punktet gli mot P. Avstanden bortover mellom dem kaller vi h. | Let the second point slide towards P. We call the distance across between them h. | Klammen h vises under grafen mellom x = 3 og x = 5. | Må testes («h») |
| l08 | 6. Q glir mot P | 53–62 | Når h er 1, er stigningen 7. Når h er en halv, er den 6,5. Når h er en tidel, er den 6,1. | When h is 1, the slope is 7. When h is a half, it is 6.5. When h is a tenth, it is 6.1. | Q glir mot P i tre trinn (h = 1, 0,5 og 0,1). Tabellen fylles: 7, 6,5 og 6,1. | Må testes («6,5», «h») |
| l09 | 7. Tangenten | 62–70 | Tallene nærmer seg 6. Og linjen slutter å skjære gjennom kurven. Den legger seg inntil. Det er tangenten. | The numbers approach 6. And the line stops cutting through the curve. It just touches it. That is the tangent. | h krymper til 0,01, linjen skifter farge og blir tangenten med stigning 6. | TTS-klar |
| l10 | 8. Algebraen | 70–77 | Algebraen sier det samme. Vi regner ut stigningen mellom x lik 3 og x lik 3 pluss h. | The algebra agrees. We find the slope between x equals 3 and x equals 3 plus h. | Grafen forsvinner. Regnestykket skrives linje for linje: stigning = (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h. | Må testes («x lik 3 pluss h») |
| l11 | 8. Algebraen | 77–85 | Ganger vi ut og forkorter med h, står 6 pluss h igjen. Når h går mot null, blir det 6. | If we expand and cancel h, we are left with 6 plus h. As h goes to zero, that becomes 6. | Tre nye linjer: = (6h + h²) / h, = 6 + h og → 6 når h → 0. | Må testes («6 pluss h») |
| l12 | 9. Overalt på kurven | 85–93 | Gjør det samme der x er 1 og der x er 2. Da får du stigningene 2 og 4. | Do the same where x is 1 and where x is 2. Then you get the slopes 2 and 4. | Tangenter i x = 1 og x = 2 tegnes. Tabellen x / stigning: 1 → 2, 2 → 4, 3 → 6. | TTS-klar |
| l13 | 9. Overalt på kurven | 93–100 | Stigningen er hele tiden det dobbelte av x. Derfor er den deriverte av x i andre lik 2x. | The slope is always twice x. That is why the derivative of x squared is 2x. | Skjermtekst: f′(x) = 2x. | Må testes («x i andre», «2x») |
| l14 | 10. Oppsummering | 100–111 | Den deriverte er stigningen til tangenten. Vi finner den ved å la sekanten krympe til h nesten er null. Her er f derivert av 3 lik 6. | The derivative is the slope of the tangent. We find it by letting the secant shrink until h is almost zero. Here, f prime of 3 is 6. | Oppsummering ved siden av grafen med tangenten i P: den deriverte = stigningen til tangenten; f′(3) = 6. | Må testes («f derivert av 3») |

Tenkepausen (l06) stopper avspillingen til eleven trykker «Fortsett». Med innlest lyd varer hver replikk så lenge lyden + 0,5 s, så tidene over er planlagte tider.

### 3. Alt som vises
- **Formler (slik de står på skjermen):** f(x) = x²; stigning = 16 / 2 = 8; stigning = (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h = (9 + 6h + h² − 9) / h = (6h + h²) / h = 6 + h → 6 når h → 0; f′(x) = 2x; f′(3) = 6.
- **Symboler:** P = (3, 9) punktet vi spør om; Q det andre punktet på kurven; h avstanden bortover fra P til Q; f′ den deriverte.
- **Kontrollert eksempel:** f(3) = 9, f(5) = 25, Δy = 16, Δx = 2 → 8. f(4) = 16 → (16 − 9)/1 = 7. Generelt (f(3 + h) − f(3))/h = 6 + h: h = 1 → 7; 0,5 → 6,5; 0,1 → 6,1; 0,01 → 6,01. Grensen er 6. Tangenter: f′(1) = 2, f′(2) = 4, f′(3) = 6. Tangenten i P: y = 6x − 9. Alt regnes ut på nytt i `tools/test_anim_proto.js`, som også sjekker at tallene står slik i fortellerteksten.
- **Farger:** graf --c3, sekant/Q --c2, tangent --c4, trekant og h --c5. Teksten i høyre felt er --ink/--muted.

### 4. Kontroll av forståelsen (etter siste scene)
- **Spørsmål:** «Hva er f′(5) når f(x) = x²?» **Riktig:** 10.
- **Fristende feilsvar:** 25 (funksjonsverdien f(5), ikke stigningen), 8 (sekanten fra x = 3 til x = 5, altså misforståelsen fra scene 3) og 5 (glemmer faktoren 2).
- **Forklaring etter svar:** «f′(x) = 2x, så f′(5) = 2 · 5 = 10. 25 er funksjonsverdien f(5), ikke stigningen. 8 er stigningen til sekanten fra x = 3 til x = 5. 5 glemmer faktoren 2.» Riktig og feil vises med ✓/✗, ikke bare farge.
- **Avslutning:** oppsummeringen (l14) og spørsmålet over.

### 5. Tilgjengelighet
- **Teksting:** fortellerteksten vises per replikk under figuren (`aria-live="polite"`), kan slås av.
- **Transkript:** hele manuset med beskrivelse av bildet per replikk, i en utvidbar seksjon under avspilleren (nb og en).
- **Redusert bevegelse:** med `prefers-reduced-motion` (eller valget «Trinnvis») vises sluttbildet av hver replikk som stillbilde med Forrige/Neste, uten automatisk avspilling.
- **Mobil (375 px):** figuren skaleres til bredden; minste tekst i figuren er 13 px i viewBox (ca. 11 px på 375 px, tallene på aksene) og 15 px ellers. Alle knapper er minst 44 px høye.
- **Avspilling:** Spill/Pause/Fortsett/Spill på nytt, Forrige/Neste scene, tidslinje, hastighet (0,75×, 1×, 1,25×), teksting, lyd (bare når innlest lyd finnes), norsk/engelsk. Tastatur: Mellomrom, ←, →. Starter ikke av seg selv.

## Del B – Faglig kontroll
| Påstand / utregning / eksempel | Kontrollert mot (kilde) | Resultat | Usikkerhet |
|---|---|---|---|
| Den deriverte i et punkt er grensen for sekantenes stigningstall, og lik stigningstallet til tangenten | Standard definisjon f′(a) = lim (f(a + h) − f(a))/h; Udir, kompetansemål 1T (MAT09-01): «bruke gjennomsnittleg og momentan vekstfart i konkrete døme og gjere greie for den deriverte» (gjengitt i fylkenes eksamensveiledninger; Udir-siden ikke lest direkte) | stemmer | Ny læreplankode MAT09-02 fra 1.8.2026 er ikke lest |
| Alle tall i eksempelet (8, 7, 6,5, 6,1, 6,01 → 6; 2, 4, 6; f′(5) = 10) | Regnet ut på nytt i `tools/test_anim_proto.js` | stemmer | – |
| «Linjen slutter å skjære gjennom kurven og legger seg inntil» | Gjelder for x² (konveks): tangenten ligger under grafen og berører bare i P | stemmer for dette eksempelet | Generelt kan en tangent skjære grafen (vendepunkt). Fortellerteksten sier «linjen» om denne kurven, ikke at tangenter aldri skjærer |
| Misforståelsen (to vilkårlige punkter gir stigningen) | Orton, A. (1983). Students’ understanding of differentiation. *Educational Studies in Mathematics* 14, 235–250, doi:10.1007/BF00410540 | kilde funnet | Artikkelen er ikke lest i sin helhet; brukt som bakgrunn, ikke sitert |

Ingenting er merket faglig godkjent; `reviewedBy` fylles ikke ut av Claude.

## Del C – Implementeringsinstruks
Prototypen følger standardteksten i docs/ANIMASJONER.md med disse avvikene (fordi den kjøres utenfor appen): egen `player.js`/`player.css` i stedet for `anim.js` i build.py; tiden deles opp i replikker (ikke scener), og `frame(i, p)` tegner replikk i ved fremdrift p; lyd fra ElevenLabs (valgfritt, `voice.mjs`) i stedet for `tts.js`; ingen KaTeX (formlene er ren tekst). Tas den inn i appen, flyttes avspilleren til `anim.js`, og formlene vurderes med KaTeX.

## Del D – Sjekkliste (prototype)
- [x] `node tools/test_anim_proto.js` grønn (tider, taletempo, nb/en, tenkepause, kontrollspørsmål, tallene)
- [x] `node tools/check_anim_proto.js`: 0 funn på 375/768/1280 px, lyst og mørkt, nb og en; tastatur, tenkepause, slutt og trinnmodus kontrollert
- [x] Sett på 375 og 1280 px, lyst og mørkt tema (skjermbilder av alle replikkene)
- [x] Redusert bevegelse gir stillbilder med Forrige/Neste
- [x] Teksting og transkript på nb og en
- [x] Kontrollspørsmålet virker, ✓/✗ og forklaring vises
- [ ] Lyttet gjennom med ElevenLabs-stemme (ikke gjort: ELEVENLABS_API_KEY var ikke satt i økten)
- [ ] Faglig gjennomlest av matematikklærer
- [ ] Sett av eieren på mobil
