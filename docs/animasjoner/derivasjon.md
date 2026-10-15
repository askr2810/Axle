# Animasjon: Fra sekant til tangent – hva den deriverte er (id: derivasjon)
Status: **i appen** (2026-10-15). Ikke faglig godkjent av fagperson. Fast fortellerstemme: ikke publisert ennå (se «Fortellerstemme»).
Fag/enhet: VG1T «Derivasjon og vekstfart», VGR1 «Derivasjon og drøfting», GMAT «Innføring i derivasjon», MEK1000 «Derivasjon» og VGS1 «Derivasjon og optimering».
Finnes i Axle: et kort øverst i teorien i enhetene over (settes inn av `withAnim` i anim.js, før den andre overskriften), under «Labber i faget» på Øv og i Labben («Animasjon: fra sekant til tangent»), og på adressen `#/animasjon/derivasjon`.
Kode: `anim.js` (manus, tidslinje, tegning og avspiller). Tabellen under er laget fra den fila. Prototypen i `prototypes/animasjoner/derivasjon/` (oppgave 21) er erstattet av denne og brukes ikke lenger.

## Del A – Manus

### 1. Målgruppe og mål
- **Målgruppe:** elever i 1T, R1 og S1 som møter den deriverte for første gang, og studenter som repeterer (GMAT, MEK1000).
- **Forkunnskaper:** stigningstallet til en rett linje som «opp delt på bort»; å sette inn i et funksjonsuttrykk; å regne ut (3 + h)².
- **Etter filmen kan eleven** forklare at den deriverte i et punkt er stigningen til tangenten, og at den finnes ved å la sekanter gjennom punktet bli kortere og kortere (h → 0). Eleven kan bruke det til å finne f′(3) = 6 for f(x) = x², og forklare f′(x) = 2x.
- **Elevspørsmål:** «Hvordan kan en kurve ha ett stigningstall når den hele tiden bøyer seg?»
- **Misforståelsen:** «Stigningen til en kurve finner du med to punkter, som for en rett linje.» Filmen viser at svaret da avhenger av punktene (8 er et gjennomsnitt), og lar så det andre punktet gli mot P.
- **Lengde:** 2:43 (16 replikker i 8 scener). Ingen endring i det faglige målet fra oppgave 21; manuset er skrevet om for den nye regien (punkt for punkt under), og tallene er de samme.

### 2. Regi (visuell plan)
- **Én verden:** et rolig rutenett med akser, kurven i blått. Alt regnes ut fra ett tidspunkt, så bevegelsen er kontinuerlig, og hopp i tidslinjen gir samme bilde som avspilling.
- **Inngang:** aksene står fra start; kurven tegnes inn fra venstre med myk start og stopp. P dukker opp med en liten overshoot, og stiplede hjelpelinjer viser x = 3 og høyden f(3) = 9. En myk glorie pulserer rundt P når spørsmålet stilles.
- **Sekanten** vokser ut fra P gjennom Q. En lilla trekant viser «2 bort» og «16 opp». Buen mellom P og Q lyser opp når fortelleren sier at sekanten skjærer kurven.
- **Mot grensen:** h glir kontinuerlig 2 → 1 → 0,5 → 0,1 → 0,01 og stopper mykt på tallene fortelleren nevner. Sekanten dreier sammenhengende (testet: høyst 1,5° per bilde ved 60 bilder/s). Når h er liten, går kameraet rolig inn mot P, så det lille gapet synes. En stiplet grønn tangent viser hvor sekanten er på vei.
- **Tangenten:** sekanten og Q tones ut, tangenten blir heltrukken grønn, kameraet går ut igjen. En grønn trekant viser «1 bort, 6 opp».
- **Regnestykket:** grafen tones helt ut, og utregningen kommer linje for linje, stort og midtstilt, med h i lilla og 6 i grønt som i bildet.
- **Overalt på kurven:** et grønt punkt glir til x = 1, 2 og 4 og stopper der; tangenten følger med. Tallene står under bildet.
- **Oppsummering:** tangenten med trekanten og svake sekanter (h = 2, 1, 0,5) som nærmer seg den.
- **Farger (samme hele veien, forklart med etiketter):** kurve blå (--c3), Q og sekant oransje (--c2, tekst --c2-text), tangent grønn (--c4), «opp/bort» og h lilla (--c5). Ingen overganger eller skygger (docs/DESIGN.md).
- **Tekst i bildet** bare for det geometriske (P, Q, sekant, tangent, 2 bort/16 opp, h/opp, 1 bort/6 opp, akser). Levende tall og formler står i en stripe under bildet, så de aldri dekker kurven. Etikettene står der geometrien er fri: oppe til venstre for punktene, under «bort», til høyre for «opp» (på smal skjerm inne i trekanten når det ikke er plass).
- **Mobil og PC:** to oppsett (400 × 400 og 720 × 405). Tekst i bildet er 14–20 px på skjermen.

### 3. Replikker
Ca. 2,4 ord/s på norsk (testen feiler over 2,6). Hver replikk har en fast plass i tidslinjen; bevegelsen i replikken er ferdig før den slutter.

| # | Scene | Tid | Fortellertekst nb (nøyaktig) | Fortellertekst en | Hva eleven ser |
|---|---|---|---|---|---|
| l00 | 1. Kurven og punktet | 0:00–0:08 | Her er grafen til f av x lik x i andre. Jo lenger mot høyre, jo brattere blir den. | Here is the graph of f of x equals x squared. The further right we go, the steeper it gets. | Koordinatsystemet tones inn, og grafen til f(x) = x² tegnes fra venstre. |
| l01 | 1. Kurven og punktet | 0:08–0:16 | Vi ser på punktet P der x er 3. Høyden der er 3 i andre, altså 9. | We look at the point P where x is 3. The height there is 3 squared, which is 9. | Punktet P = (3, 9) dukker opp. Stiplede linjer viser x = 3 og høyden f(3) = 9. |
| l02 | 1. Kurven og punktet | 0:16–0:23 | Men hvor bratt er kurven akkurat i P? En kurve har ingen fast stigning. | But how steep is the curve exactly at P? A curve has no single slope. | En ring pulserer rundt P. |
| l03 | 2. Sekanten | 0:23–0:34 | Vi velger et punkt Q til, der x er 5, og trekker en rett linje gjennom P og Q. Den kalles en sekant. | We pick another point Q, where x is 5, and draw a straight line through P and Q. It is called a secant. | Punktet Q = (5, 25) dukker opp, og en oransje rett linje (sekanten) tegnes gjennom P og Q. |
| l04 | 2. Sekanten | 0:34–0:44 | Fra P til Q går linjen 2 bort og 16 opp. Stigningen er 16 delt på 2, altså 8. | From P to Q the line goes 2 across and 16 up. The slope is 16 divided by 2, which is 8. | En lilla trekant viser 2 bort og 16 opp fra P til Q. Under bildet: stigning = 16 / 2 = 8. |
| l05 | 2. Sekanten | 0:44–0:54 | Men sekanten skjærer gjennom kurven. 8 er et gjennomsnitt mellom x lik 3 og x lik 5, ikke stigningen i P. | But the secant cuts through the curve. 8 is an average between x equals 3 and x equals 5, not the slope at P. | Buen av kurven mellom P og Q lyser opp: sekanten skjærer kurven i to punkter. |
| l06 | 3. Tenk selv | 0:54–1:03 **(venter)** | Hva skjer med stigningen hvis Q flyttes nærmere P? Tenk deg om, og trykk Fortsett. | What happens to the slope if Q moves closer to P? Think about it, then press Continue. | Tenkepause. Animasjonen venter. |
| l07 | 4. Mot grensen | 1:03–1:14 | Vi lar Q gli mot P. Avstanden bort kaller vi h. Se hvordan sekanten dreier og blir slakere. | We let Q slide towards P. We call the distance across h. Watch the secant turn and get less steep. | Q glir jevnt mot P, og sekanten dreier og blir slakere. Trekanten heter nå h bort og opp. Under bildet vises h og stigningen 6 + h. |
| l08 | 4. Mot grensen | 1:14–1:26 | Når h er 1, er stigningen 7. Når h er en halv, er den 6,5. Når h er en tidel, er den 6,1. | When h is 1, the slope is 7. When h is a half, it is 6.5. When h is a tenth, it is 6.1. | Q stopper ved h = 1, 0,5 og 0,1. Stigningen er 7, 6,5 og 6,1. |
| l09 | 4. Mot grensen | 1:26–1:36 | Tallene nærmer seg 6. Den stiplede grønne linjen viser hvor sekanten er på vei: mot tangenten. | The numbers approach 6. The dashed green line shows where the secant is heading: towards the tangent. | Kameraet går nær P. En stiplet grønn linje (tangenten) vises, og sekanten legger seg nesten oppå den når h = 0,01 (stigning 6,01). |
| l10 | 5. Tangenten | 1:36–1:45 | Når h nesten er null, faller sekanten sammen med tangenten. Den berører kurven i P uten å skjære gjennom. | When h is almost zero, the secant merges with the tangent. It touches the curve at P without cutting through. | Sekanten og Q forsvinner, og tangenten blir heltrukken grønn. Kameraet går ut igjen. |
| l11 | 5. Tangenten | 1:45–1:56 | Tangenten går 6 opp for hver 1 bort. Stigningen i P er altså 6. Den kaller vi f derivert av 3. | The tangent goes 6 up for every 1 across. So the slope at P is 6. We call it f prime of 3. | En grønn trekant fra P viser 1 bort og 6 opp. Under bildet: f′(3) = 6. |
| l12 | 6. Regnestykket | 1:56–2:10 | Algebraen sier det samme. Stigningen til sekanten er f av 3 pluss h minus 9, delt på h. Det forkortes til 6 pluss h, som går mot 6. | The algebra says the same. The slope of the secant is f of 3 plus h minus 9, divided by h. That simplifies to 6 plus h, which tends to 6. | Bildet dempes, og utregningen vises linje for linje: (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h = (6h + h²) / h = 6 + h → 6. |
| l13 | 7. Overalt på kurven | 2:10–2:24 | Flytter vi punktet langs kurven, følger tangenten med. Ved x lik 1 er stigningen 2, ved 2 er den 4, og ved 4 er den 8. | If we move the point along the curve, the tangent follows. At x equals 1 the slope is 2, at 2 it is 4, and at 4 it is 8. | Et grønt punkt glir langs kurven til x = 1, 2 og 4, og tangenten følger med. Stigningen er 2, 4 og 8. |
| l14 | 7. Overalt på kurven | 2:24–2:34 | Stigningen er alltid det dobbelte av x. Derfor er den deriverte av x i andre lik 2x, og f derivert av 3 er 6. | The slope is always twice x. That is why the derivative of x squared is 2x, and f prime of 3 is 6. | Punktet går tilbake til x = 3. Under bildet: f′(x) = 2x og f′(3) = 2 · 3 = 6. |
| l15 | 8. Oppsummert | 2:34–2:43 | Den deriverte er stigningen til tangenten: grensen for sekantens stigning når h går mot null. | The derivative is the slope of the tangent: the limit of the secant's slope as h goes to zero. | Tangenten i P med trekanten 1 bort og 6 opp, og svake sekanter (h = 2, 1 og 0,5) som nærmer seg den. |

### 4. Alt som vises og kontrollert eksempel
- **Under bildet:** f(x) = x²; P = (3, 9), f(3) = 3² = 9; Q = (5, 25); stigning = 16 / 2 = 8; h og stigning = 6 + h (levende, to desimaler); stigning = 6 / 1 = 6, f′(3) = 6; 6 + h → 6 når h → 0; x og stigning = 2x (levende); f′(x) = 2x, f′(3) = 2 · 3 = 6.
- **Regnestykket:** stigning = (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h = (6h + h²) / h = 6 + h → 6 når h → 0.
- **Kontrollert (tools/test_anim.js):** 16/2 = 8; h = 1, 0,5, 0,1, 0,01 gir 7, 6,5, 6,1, 6,01; grensen 6; f′(1), f′(2), f′(3), f′(4), f′(5) = 2, 4, 6, 8, 10. Testen sjekker også at h står nøyaktig på 1, 0,5 og 0,1 mens fortelleren sier tallene, at stripa viser 7,00, 6,50, 6,10 og 6,01 da, og at tangentpunktet står på x = 1, 2 og 4 med stigning 2, 4 og 8.

### 5. Kontroll av forståelsen
«Hva er f′(5) når f(x) = x²?» Riktig: 10. Fristende feil: 25 (funksjonsverdien), 8 (sekanten fra 3 til 5), 5 (glemmer faktoren 2). Forklaring vises etter svar, og riktig/feil vises med ✓/✗, ikke bare farge.

### 6. Tilgjengelighet
Teksting per replikk (kan slås av), hele teksten med beskrivelse av bildet (tekstalternativ), trinnvis visning ved redusert bevegelse (sluttbildet av hver replikk med Forrige/Neste, ingen automatisk avspilling), tastatur (Mellomrom, ←, →), knapper på minst 44 px, Spill synlig uten å rulle på 375 × 667. Animasjonen starter ikke av seg selv og virker helt uten lyd.

## Fortellerstemme
- **I appen nå:** teksting alltid; valgfri «Les opp (enhetens stemme)» med stemmen på elevens egen enhet (samme som «Lytt»). Ingen tjeneste kontaktes. Bildet venter ved slutten av en replikk til stemmen er ferdig, så ingenting kuttes.
- **Ferdige lydfiler:** avspilleren spiller `anim/derivasjon/<språk>/<replikk>.mp3` når `assets/anim/derivasjon/manifest.json` finnes (kopieres til bygget av build.py). Varer en fil lenger enn replikken, venter bildet. Testen godtar bare filer laget på en aktiv betalt plan, med samme tekst som manuset.
- **ElevenLabs (planlagt):** se docs/ANIMASJONER.md, «Fortellerstemme med ElevenLabs». Ingen privat prøve eller endelig lyd er laget ennå (nøkkelen var ikke tilgjengelig for verktøyene i økten).
- **macOS «Nora»:** brukt bare lokalt til å prøve tempo og synkronisering (local/, i .gitignore). Apples lisens (macOS 27, punkt F) tillater bare personlig, ikke-kommersiell bruk av systemstemmene og forbyr publisering, så disse filene publiseres ikke. Alle 16 Nora-replikkene var kortere enn plassen sin (5,1–10,8 s), så bildet trengte aldri vente.

## Del B – Faglig kontroll
| Påstand / utregning / eksempel | Kontrollert mot (kilde) | Resultat | Usikkerhet |
|---|---|---|---|
| Den deriverte i et punkt er grensen for sekantenes stigningstall, og lik stigningstallet til tangenten | Standard definisjon f′(a) = lim (f(a + h) − f(a))/h; Udir, kompetansemål 1T (MAT09-01): «bruke gjennomsnittleg og momentan vekstfart i konkrete døme og gjere greie for den deriverte» (gjengitt i fylkenes eksamensveiledninger; Udir-siden ikke lest direkte) | stemmer | Ny læreplankode MAT09-02 fra 1.8.2026 er ikke lest |
| Alle tall i eksempelet (8, 7, 6,5, 6,1, 6,01 → 6; 2, 4, 6; f′(5) = 10) | Regnet ut på nytt i `tools/test_anim_proto.js` | stemmer | – |
| «Linjen slutter å skjære gjennom kurven og legger seg inntil» | Gjelder for x² (konveks): tangenten ligger under grafen og berører bare i P | stemmer for dette eksempelet | Generelt kan en tangent skjære grafen (vendepunkt). Fortellerteksten sier «linjen» om denne kurven, ikke at tangenter aldri skjærer |
| Misforståelsen (to vilkårlige punkter gir stigningen) | Orton, A. (1983). Students’ understanding of differentiation. *Educational Studies in Mathematics* 14, 235–250, doi:10.1007/BF00410540 | kilde funnet | Artikkelen er ikke lest i sin helhet; brukt som bakgrunn, ikke sitert |

Ingenting er merket faglig godkjent; `reviewedBy` fylles ikke ut av Claude.

## Del D – Sjekkliste (2026-10-15)
- [x] `node tools/test_anim.js` (i npm test): manus, tidslinje, tegning hvert 0,1 s i begge oppsett og språk, faglige verdier, kontinuerlig bevegelse, kobling til enhetene
- [x] `node tools/check_anim.js`: 0 funn på 375/768/1280 px i lyst og mørkt tema; tastatur, tenkepause, scenehopp, tidslinje, Spill på nytt, kontrollspørsmål, teksting, redusert bevegelse, venting på stemmen, lydfil-synkronisering (prøvd med lokale Nora-filer), kortet i teorien
- [x] Hele filmen sett gjennom bilde for bilde (hvert 2. sekund) på PC og mobil, lyst og mørkt; rettet: tom start, Q i kanten, etiketter oppå hverandre, brå overgang til regnestykket, tall som ble røpet for tidlig, etiketter som ble kuttet på smal skjerm
- [ ] Fast fortellerstemme: privat ElevenLabs-prøve, godkjenning av stemme og manus, endelig lyd på betalt plan, gjennomlytting
- [ ] Faglig gjennomlest av matematikklærer
