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
- [x] 13. Lag en fast arbeidsmåte for undervisningsanimasjoner – ferdig 2026-10-15: arbeidsmåte, mal og kodeinstruks i [docs/ANIMASJONER.md](ANIMASJONER.md). Fire trinn med godkjenning (bestilling → manus og faglig kontroll → kodeinstruks → bygging og sjekkliste). Manus (Del A) og kodeinstruks (Del C) er separate. Standardteksten for koden beskriver en felles avspiller (anim.js, ingen avhengigheter), ![anim:id], Labben, redusert bevegelse, teksting og tools/test_anim.js. Stemmeundersøkelse: nettleserens talesyntese (finnes allerede i tts.js) anbefales som valgfri opplesing, egen innlesing for fast lyd, Piper som gratis offline-reserve (norsk stemme CC0). Ingen betalt tjeneste eller API-nøkkel lagt til. Ingen animasjon laget, siden tema ikke er valgt. Gjenstår: lytte på stemmene på fysiske enheter; bekrefte Piper-lisensen i originalkildene.
- [x] 14. Styrk kontrollen av svar og risikoinnhold uten å gjenta ferdig arbeid – ferdig 2026-10-15: dekningen er kartlagt (53 fag har generatorer uten uavhengig kontroll; lista står i docs/FAGLIG_KONTROLL.md, «Dekning av den uavhengige fasitkontrollen»). Feil fasit funnet og rettet: JFORV enhet 2 g0, klagefristen ble ikke forlenget når siste dag var helligdag (fvl. § 30, domstolloven § 149, kontrollert på Lovdata; ca. 3 % av spørsmålene). OBED enhet 3 g6: forklaringen viste 1,09 i stedet for 1,085. Nye uavhengige kontroller i tools/test_answers.js for alle helsegeneratorene som regner (SFARM, SANA, SMIK, SSYK), JERS, JSTAT og klagefristen (egen påske- og helligdagsberegning; feiler på den gamle generatoren). Oppgave 6 og 7 er ikke gjort på nytt. reviewedBy er ikke satt. Rekkefølge: 16–19 gjøres før 15, som er avslutningen.
- [x] 15. Avslutt med kontroll og oppsummering – ferdig 2026-10-15 (tatt etter 16–19, som kom til underveis): python3 build.py, npm test (inkl. ny tools/test_maps.js), node tools/seo.js (82 fagsider, 464 emnesider, 1097 adresser i sitemap), check_figs.js på de statiske sidene (0 funn) og --lf (0 funn) er grønne. Status og dato er kontrollert for 11–19. Pushet til claude/loving-cerf-qzvm7j og main. Ingen versjonstag er laget eller flyttet; desktop-appen er ikke bygget på nytt (se notatet om å samle desktop-releaser).
- [!] 16. Apple Pencil-dobbelttrykk skal veksle mellom penn og viskelær – delvis, blokkert 2026-10-15: dobbelttrykket på Apple Pencil finnes bare som native iOS-API (UIPencilInteraction). Safari, PWA-en og WKWebView sender ingen JavaScript-hendelse for det, og et vanlig dobbelttrykk på skjermen er noe annet. Apple Pencil har ingen viskeknapp; støtten for viskeknappen på andre penner (buttons & 32, Surface/Wacom) er beholdt. Gjort på nett: penn/viskelær har aria-pressed og leses opp («Viskelær valgt»), tasten E veksler, viskelæret har egen markør, og hendelsen `axle-pencil-tap` er klar for en native bro. Testet i Chrome på Mac med simulerte penne- og musehendelser (CDP): penn, mus, viskelær, E, bro-hendelse og angre. Ikke testet på iPad eller med fysisk Apple Pencil; dobbelttrykk er derfor ikke påstått å virke. Blokkert av: native bro krever en lokal Capacitor-plugin i Swift (UIPencilInteraction på bridge.webView, respekter brukerens valg i preferredTapAction, send `axle-pencil-tap`). ios/-mappa ligger ikke i repoet, og det finnes en kjent rapport om at dobbelttrykk ikke når fram når en Safari-visning har fokus. Det må bygges og testes på en fysisk iPad med Pencil (2. generasjon eller Pro) før det tas i bruk. Venter på eierens beslutning. Oppdatert i oppgave 23: broen er laget og bygget for simulator; gjenstår test på fysisk iPad.
- [x] 17. Gjør pennetegningen renere og mindre pikselert – ferdig 2026-10-15 (kontrollert i Chrome, ikke på iPad): Årsaker funnet: (1) lerretets oppløsning ble bare oppdatert når CSS-størrelsen endret seg. Ved bytte av pikseltetthet (2 → 3) stod lerretet på 1538 × 1820 i stedet for 2307 × 2730 og ble skalert opp og uskarpt. iPad-zoom av siden (visualViewport.scale) ble ikke tatt med. (2) Den trykkfølsomme bredden hoppet mellom stykkene og ga hakk. Rettet i initCanvas/scStroke (app.js): oppløsningen følger CSS-størrelse × pikseltetthet × visualViewport.scale (device-pixel-content-box som avrundingsretting), med matchMedia-lytter og ny sjekk ved hvert pennetrykk; tak på ca. 16 mill. piksler (grensen i iOS). Bredden jevnes ut og endres høyst 12 % per stykke; posisjonen er uendret, så streken henger ikke etter. getPredictedEvents (Chrome/Edge) tegner en foreløpig forlengelse som ikke lagres. getCoalescedEvents brukes som før. Fallback for nettlesere uten disse. Ingen ny avhengighet. Målt i Chrome på Mac med dpr 2 og 3 og simulert penn (CDP): riktig oppløsning etter bytte, ingen merkbar endring i tegnetid (200 streker: ett bilde per skjermoppdatering, som før). Farger og linjebredde mot rutenettet er uendret og lesbare i begge temaer. Gjenstår: sammenligning på iPad med Apple Pencil (rask skriving, langsomme kurver, tett skrift, zoom), med finger og mus, og måling av forsinkelse på ekte maskinvare. Det er ikke gjort, siden jeg ikke har tilgang til en iPad.
- [x] 18. Kontroller kollisjoner i oppgaver, simuleringer, flashcards og spill – ferdig 2026-10-15: Nytt verktøy tools/check_views.js (Playwright, bruker samme regel som check_figs.js via tools/figcheck_lib.js). Det kjører ekte visninger på 375, 768 og 1280 px, lyst og mørkt tema: alle simuleringer ved start, min og maks per glidebryter og alle på min/maks; oppgaver med figur i 9 fag før svar og etter feil svar; flashcards (Snacks og «snu kortet») med korte og lange tekster og lange ord, før og etter snuing; kartspillet med alle land i alle regioner (Hvilket land? og Finn landet) og alle historiekart, i vanlig og rolig modus. Rettet etter visuell kontroll: (1) leksjonskort med langt svar rant ut av kortet og la seg bak topp- og bunnfeltet (375 px), og Snacks-kort kuttet lange ord; nå vokser kortet med innholdet, og ord brytes. (2) Emnenavnet over oppgaven ble kuttet («Brøk, prosent og veks…»); nå to linjer. (3) OBED enhet 4: NPV-resultatet var skjult utenfor tilbakemeldingen på 375 px; formelen er delt og lange formler i bunnfeltet kan rulles. (4) VG1P/GU810 vekstfaktorfigur: «−30 %» lå oppå pila (og engelsk viste 0,70). (5) GS57 arealfigur: «6 cm» gikk ut av figuren til venstre. (6) GU810 kvadratrot: «√144 = 12» ble kuttet til høyre. (7) Simuleringer: dvblind (overskriftene kolliderte i startverdien), dvkrasj, rc, incline, beam, doses, pid og sinerule ved ytterverdier. (8) Flere knapper med hvit tekst på lys grønn har fått --ok-btn. Gjenstår, vurdert som mindre (lesbart, etiketten berører en strek ved ytterverdier): projectile, lever, line, vector, earth, pctrl, pid (Ki maks), matrix, gd, mohr, doses (T maks), secant og cmpsq; ohm er et falskt funn («+» står i batterisymbolet med vilje). I historiekartene kan markøren for små land ligge under en hendelsesetikett; etiketten tegnes øverst med hvit kant og er lesbar. check_figs.js --lf: 0 funn. Anbefalt videre kontroll: kjør check_views.js etter endringer i figurer og simuleringer, og se på eksemplene; testen erstatter ikke visuell kontroll.
- [x] 19. Gjør det raskt å gå videre etter et svar – ferdig 2026-10-15: Gjenskapt på 375 × 667: i rolig kartmodus lå «Neste» under kanten (bunn 719–940 px) og tilbakemeldingen var delvis skjult; spill med tid (kart, skilt, sant/usant, lynrunde, hoderegning) gikk videre av seg selv uten å vise det og uten mulighet til å hoppe over; i vanlige oppgaver kunne de nederste svaralternativene ikke rulles fram over bunnfeltet etter svar; i teoriprøven for førerkort, hoderegning, enhetssirkel-quizen og «Test deg» på historiekart lå «Neste» i vanlig flyt under spørsmålet. Rettet: kartspill og skiltspill har en handlingsrad klistret til bunnen (med safe area) med tilbakemelding og knapp; siden ruller så det riktige landet synes over raden. Spill som går videre selv, viser nedtelling («Går videre om 2,5 sekunder») og «Neste nå»; ventetiden etter feil svar i kart/skilt er 2,5 s (før 2,2/1,5 s), i sant/usant og lynrunde uendret. «Neste» dokkes nederst (.next-dock) i teoriprøven, hoderegning, enhetssirkel-quizen, historiekart-quizen, trafikksituasjonene og kodeoppgavene; tilbakemeldingen ligger i vanlig flyt over og rulles inn i synsfeltet. Innholdet over bunnfeltet i oppgaver og «Lær først» får like mye luft som feltet er høyt (--foot-h). «Neste»/«Fortsett» får fokus etter svar (tastatur og skjermleser; Enter gir ikke dobbelt hopp). Kontrollert med feil svar i ni svarflyter (oppgave flervalg og med lang forklaring, teoriprøve førerkort, hoderegning, lynrunde, sant/usant, skiltspill, kartspill rolig og med tid) på 375 × 667, 768 × 1024 og 1280 × 860 (med og uten berøring): knappen er helt synlig, udekket, har fokus og 52 px trykkflate; tilbakemeldingen er synlig. Ingen skjermer har innhold under faste felt (28 ruter). Ikke automatisk kontrollert: enhetssirkel-quizen (svares ved å dra; samme dokk), kodeoppgaver og trafikksituasjoner (samme CSS-mønster), og ekte skjermleser og fysisk iPhone/iPad (safe area).
- [x] 20. Gjør grensesnittet tydeligere og mer intuitivt – ferdig 2026-10-15: funn og begrunnelser i docs/UI_GJENNOMGANG.md. Forsiden har én startknapp («Du er her» på stien); Øv løfter «Anbefalt nå» øverst med den eneste fylte knappen; søk finner spill (også kartspillet) og verktøy; ✓/✗ i tillegg til farge; tekst etter feil svar i lynrunden; Pomodoro-flisen på mobil. Ny tools/check_flows.js: 55 kontroller (riktig/feil svar, 375/768/1280, lyst/mørkt, Enter), 0 feil; verifisert at den fanger en «Neste» utenfor skjermen. axe 0 funn på endrede skjermer.
- [x] 21. Planlegg lærerike animasjoner med manus og voiceover – ferdig 2026-10-15: kortliste med 8 temaer fra Axles fag (målgruppe, elevspørsmål, misforståelse, hva bevegelsen viser, hvor i Axle), kvalitetsliste og ElevenLabs-oppsett i docs/ANIMASJONER.md. To pilotmanus etter malen: docs/animasjoner/derivasjon.md (111 s, 10 scener, sekant → tangent med f(x) = x², stigning 6 ved x = 3) og integrasjon.md (95 s, rektangler for f(x) = x på [0, 2] = 2, og integral som samlet mengde), med nøyaktig fortellertekst, merking TTS-klar/må testes og faglig kontroll med kilder (Udir 1T, Orton 1983). Pilotprototype for derivasjon i prototypes/animasjoner/ (HTML/SVG, ingen avhengigheter, utenfor appen og build.py): Spill/Pause/Spill på nytt, scener, tidslinje, hastighet, teksting, nb/en, tenkepause som venter, trinnmodus ved redusert bevegelse, transkript og kontrollspørsmål med ✓/✗. voice.mjs lager lyd per replikk med ElevenLabs (ELEVENLABS_API_KEY og ELEVENLABS_VOICE_ID fra miljøet, --dry-run, hopper over ferdige filer); avspilleren lar replikken vare så lenge lyden. Ny test tools/test_anim_proto.js (i npm test: tider, taletempo, nb/en, tallene regnet ut på nytt, 140 tegninger uten NaN) og tools/check_anim_proto.js (Playwright: 0 kollisjoner på 375/768/1280 px i lyst og mørkt tema; tastatur, tenkepause, slutt og trinnmodus virker). Skjermbildene er gått gjennom. Gjenstår: ingen lyd er laget eller lyttet til (ELEVENLABS_API_KEY var ikke satt), og stemmen er ikke valgt; manusene er ikke lest av en fagperson; eieren bør se prototypen på mobil.
- [x] 22. Kontroll av kartgrenser og landvalg – ferdig 2026-10-15: Bygget på oppgave 11 (ikke gjort på nytt). Undersøkt: markering og trykkflate bruker samme ringer (mpDist på samme sti som tegnes, 14 px slingringsmonn; ringen for små land vises ikke før svaret i «Finn landet»); utsnitt, øyer, små land, Norge og land ved kanten dekkes av test_maps.js og er grønne; feil svar, rolig modus og «Neste» kontrollert med check_flows.js (55 kontroller, 0 feil) og skjermbilder. Funn: historiekartene farger dagens land, og kartspillets historiemodus manglet merknaden om det. Alle 11 historiekart og alle tidssteg gjennomgått. 9 bekreftede datafeil rettet (kilder i docs/FAGLIG_KONTROLL.md, «Historiekartene»): Luxembourg okkupert august 1914, Polen og Litauen okkupert 1915–1917, Estland/Latvia i det revolusjonære Russland 1917, Belgia/Luxembourg ikke okkupert etter 1918, Hellas på de alliertes side fra oktober 1940, Baltikum/Hviterussland/Ukraina okkupert i 1941, Slovakia og Kroatia som aksestater i verdenskartet, Baltikum m.fl. sovjetisk igjen i august 1945 (stod som okkupert av aksen), Vest-Sahara spansk koloni til 1976. Land der området var delt mellom sidene eller gruppen er misvisende (Polen 1914–1918, Ukraina, Frankrike 1940–41, Italia 1943–44, Østeuropa under «Sovjetunionen» 1945, Eritrea og Sør-Sudan som «kolonier» m.fl.) vises fortsatt, men spørres ikke om (nq per tidssteg). Kartspillet og «Test deg» bruker nå samme utvalg (mpCand i maps.js). Merknaden «Grensene er dagens …» vises i historiemodus. test_maps.js del 6 (7523 sjekker) feiler med 47 feil på de gamle dataene. check_views.js geo: 28 funn, alle av den kjente typen fra oppgave 18 (markør under en hendelsesetikett med hvit kant). Gjenstår: en historielærer bør se gjennom rettingene og hvilke land som ikke spørres om; grensene er fortsatt dagens.
- [x] 23. Apple Pencil-dobbelttrykk og tegneopplevelse – ferdig 2026-10-15 (bortsett fra test på fysisk iPad, som ikke er gjort): Skillet: (1) tegning i nettleseren virker med penn, finger og mus; (2) dobbelttrykk finnes ikke på webplattformen (ingen hendelse i Safari/WKWebView), så det kan bare komme fra iOS-appen; (3) native bro: native/ios/AxleBridgeViewController.swift (UIPencilInteraction på CAPBridgeViewController, følger preferredTapAction/preferredSqueezeAction, bare «bytt til viskelær/forrige verktøy» veksler, klem på Pencil Pro teller én gang) sender «axle-pencil-tap» til app.js. ios/ ligger ikke i repoet, så tools/ios_pencil.mjs legger broen inn i SceneDelegate.swift etter «npx cap add ios» (kjøres av npm run sync; ingen endring i project.pbxproj; kan kjøres flere ganger). Bygget med Xcode 27 for iOS-simulator og startet på iPad Pro 11 (M4)-simulatoren med Capacitor 8; simulatoren kan ikke dobbelttrykke. Knappene og tasten E er beholdt. (4) Tegning: hele streken som tegnes ble tegnet på nytt i hvert bilde (CPU 4×: 1,8 ms ved 200 punkter, 5,7 ms ved 1000, 18,7 ms ved 3000). Nå legges ferdige biter inn i bakgrunnen én gang, og bare halen og anslåtte punkter tegnes per bilde. Lang strek med simulert penn (2400 punkter, CPU 4×): p90 per bilde mot slutten 2,1 → 0,1 ms, og 0,4 ms ved 6000 punkter. Bildet er det samme. Penn/finger/mus-logikken er skilt ut i scRole. Ny tools/test_draw.js (i npm test, 6069 sjekker): penn, finger og mus i auto/penn/finger-innstilling, håndflate, viskeknapp, og at bitvis tegning gir nøyaktig samme tegnekommandoer som full omtegning i hvert bilde. Kontrollert i Chrome med CDP: mus venstre tegner, høyre flytter; finger tegner før penn, flytter etter; axle-pencil-tap veksler verktøy. Gjenstår: test på fysisk iPad med Apple Pencil (sjekkliste i docs/PUBLISERING.md, «Apple Pencil på iPad»): dobbelttrykk og klem, innstillingene, fokus i tekstfelt, skriveopplevelse og forsinkelse.
- Sluttkontroll runde 4 – 2026-10-15: main (designregler, 050846e) flettet inn i arbeidsgrenen. python3 build.py, npm test, node tools/test_design.js (0 feil), node tools/seo.js (82 fagsider, 464 emnesider, 1097 adresser), check_figs.js (statiske sider: 0 funn; --lf: 0 funn), check_flows.js (55 kontroller, 0 feil), check_anim_proto.js (0 funn) og check_views.js geo (bare den kjente typen fra oppgave 18) er kjørt. Pushet til claude/loving-cerf-qzvm7j og main. Ingen versjonstag laget; desktop-appen er ikke bygget på nytt.
- [x] 24. Derivasjonsanimasjonen i Axle – publisert 2026-10-15 etter eierens beskjed, uten fast fortellerstemme (teksting og valgfri opplesing med enhetens stemme; ingen lydfil i bygget). Fast stemme gjenstår (privat ElevenLabs-prøve, godkjenning, endelig lyd på betalt plan): ny anim.js med regi og manus i docs/animasjoner/derivasjon.md. Kontinuerlig tidslinje (2:43, 8 scener, 16 replikker), sekanten dreier sammenhengende mot tangenten, kamera inn mot P mens h → 0, tangenttrekant 1 bort/6 opp, regnestykket linje for linje, tangenten som følger kurven (f′(x) = 2x), kontrollspørsmål. Egen skjerm #/animasjon/derivasjon, kort i teorien i VG1T, VGR1, GMAT, MEK1000 og VGS1, i «Labber i faget» og i Labben. Teksting, tekstalternativ, trinnvis visning ved redusert bevegelse, tastatur. Lyd: valgfri opplesing med enhetens stemme nå; ferdige lydfiler spilles når de finnes (assets/anim/, build.py kopierer). tools/anim_voice.mjs: --plan, --voices, --sample (privat, local/), endelig lyd bare på aktiv betalt plan. macOS «Nora» brukt bare lokalt (Apples lisens forbyr publisering). Tester: tools/test_anim.js (i npm test, 17 543 sjekker) og tools/check_anim.js (0 funn på 375/768/1280 px, lyst/mørkt, flyt og lyd). Gjenstår: privat ElevenLabs-prøve (nøkkelen var ikke synlig for verktøyene), godkjenning, endelig lyd på betalt plan og gjennomlytting, deretter push og kontroll på axle.no.
- [x] 25. Skråplanet: klossen på planet og tydelige kraftpiler – ferdig 2026-10-15 (lokalt, ikke pushet): målt i nettleser at klossen allerede stod på planet i alle tre tegningene etter daca72a (avstand ≤ 0,05 px); eierens skjermbilde var trolig fra før det. Rettet i simuleringen «Kloss på skråplan»: planet skaleres så hele figuren er innenfor bildet ved alle vinkler (før gikk planet, klossen og N ut av bildet ved 55–60°), klossen står midt på planet, G ender over bakken fra ca. 10°, pilene starter i massesenteret (prikk) og har kant i bakgrunnsfarge, så de ligger tydelig oppå klossen. Pilene er proporsjonale med kreftene: N = G cos θ, R = G sin θ i ro og μ G cos θ når klossen glir; etiketten er «R» i ro og «R = μN» bare når den glir (før stod «R = μN» også i ro, som er feil for statisk friksjon). Samme kant og prikk i figures.js og figlib.js; i figlib flyttes klossen opp når G ellers ville gått under bakken. Ny test i tools/test_sims.js (hver grad 0–60°, μ = 0–1): underside på planet, rotasjon lik helningen, alt i bildet, N/G = cos θ og riktig R. check_views sims: 0 funn i skråplanet. På flat mark (0°) krysser G underlaget, som den må; kanten viser at pila ligger foran.
- [x] 26. Livequiz på tavla: «riktig svar»-pop spilles flere ganger – ferdig 2026-10-15: årsak: i avsløringen («rev») tegner pollingen (mqLiveApply → render, hvert sekund) hele skjermen på nytt, og banneret (.mq-res.pop) og den riktige flisen (.mq-tile.ok, animasjonen mqok) startet animasjonen igjen hver gang. Rettet i mq.js med en engangsnøkkel per spørsmål (spillets start eller rundenummer + frø + spørsmålsnummer): animasjonen spilles bare første gang visningen går fra spørsmål til avslørt svar, senere tegninger får .still/uten .pop, og et nytt spørsmål har ny nøkkel. Målt i nettleser (tavle og elev, 375/1280 px, lyst/mørkt): før 12 ekstra animasjonsstarter ved 6 nye tegninger, etter 0; neste spørsmål animeres igjen. Fast kontroll i tools/check_flows.js (alle størrelser og temaer).
- [x] 27. Understyring og overstyring tegnes på nytt (førerkort) – ferdig 2026-10-15: bildet «skrens» (FKB enhet 8, teorien og de åpne sidene) er tegnet fra grunnen av med regnet bevegelse: samme høyresving, samme fart og samme rattutslag (forhjulene vridd 18° inn) i begge panelene; kursen (dit bilen går) og retningen (dit den peker) regnes hver for seg, og sporet etter hvert hjul følger av dem. Understyring: kursen dreier under halvparten av svingen og går ut av vegen, bilen peker omtrent dit den går, mørke spor fra forhjulene, bakhjulene i samme spor. Overstyring: kursen følger omtrent svingen, bilen roterer stadig mer (opptil 58° forbi kursen), mørke spor fra bakhjulene utenfor forhjulenes. Grønt = ønsket bane, rødt = bilens bane, bilen = hvor den peker, stiplede biler viser tidligere stillinger (bildet forstås også uten animasjon; redusert bevegelse viser stillbilde). Animasjonen virket ikke i nestede <svg> (klokka gikk ikke); nå vanlige grupper med klipping. Bildeteksten forklarer hva eleven ser; rådet om å rette opp skrensen er fjernet (ikke funnet autoritativ kilde). Gjennomgått alle 29 førerkortbilder og trafikksituasjonene: ingen andre feil i posisjon, retning eller spor. Ny test tools/test_skrens.js (i npm test). Gjenstår: rådene i to spørsmål (add_forer2.js) er ikke kontrollert mot Statens vegvesen/Trygg Trafikk, se docs/FAGLIG_KONTROLL.md.
- [x] 28. Lærerfunksjon: opptil 200 elevprofiler per lærer – ferdig 2026-10-15 (koden publisert; eieren må kjøre supabase/elever.sql og sette opp Edge Function «elever», se supabase/ELEVER.md – til da viser skjermen hva som mangler): valgt løsning: en elevprofil er en vanlig Supabase-bruker uten ekte e-post (intern adresse brukernavn.klasse@elev.axle.no), så fremgang (RLS), lekser og quiz virker uendret og eleven aldri når lærerens konto. Læreren lager klasser og elever (ett navn per linje) i Lærerverktøy → «Administrer elever» (#/elever), får innloggingsnavn og engangspassord som vises én gang (utskrift av lapper), kan finne elev, se XP siste 7 dager/sist aktiv/leksesvar, gi nytt passord (det gamle vises aldri) og fjerne elev. Valgfri klassekode/lenke (#/klasse/KODE) for elever på 13+ som velger eget brukernavn og passord; kan fornyes og slås av, og gir bare lov til å bli med. Brukernavn unike i klassen (ola, ola2 …). Elevprofiler kan ikke bytte e-post, slette seg selv eller bruke venner/grupper. Grensen på 200 håndheves i databasen med trigger og transaksjonslås per lærer (testet: 288 samtidige forsøk → nøyaktig 200; uten lås 203). Nye filer: elever.js, supabase/elever.sql, supabase/functions/elever/index.ts, supabase/ELEVER.md. Tester: tools/test_elever_fn.mjs (i npm test, 25 sjekker), tools/test_elever_db.mjs (ekte Postgres, 40 sjekker), tools/check_elever.js (lærer- og elevflyt, 375/768/1280, lyst/mørkt). Personvernsiden er oppdatert. Gjenstår (eieren): kjøre SQL og sette opp funksjonen; avklare databehandleravtale med skoler, alder for lærerlagde profiler og lagringstid (se supabase/ELEVER.md); prøve hele flyten mot ekte Supabase (ikke gjort, alt er testet mot etterligning og lokal Postgres).
- [x] 29. Personverninformasjon for elevprofiler og vurderingsgrunnlag for skoler – ferdig 2026-10-15: kartlagt hva systemet faktisk gjør (kode, SQL, Supabase-oppsett, brukerflyt). Rettet fire forhold underveis: (1) delte enheter: lokal fremgang ble flettet inn i neste elevs profil og ble liggende etter utlogging – nå tømmes den for elevprofiler ved inn- og utlogging; (2) når en lærer slettet kontoen, ble elevprofilene liggende uten lærer – nå slettes de (trigger på teacher_classes); (3) elevprofiler ble spurt om bruksstatistikk og kunne laste opp profilbilde – nå ikke; (4) elevprofiler kunne få profilrad i databasen – nå sperret med trigger (venner/søk). Navnet i lekser og quiz er visningsnavnet fra klassen. privacy.html (nb/en) har egen del #elevprofiler/#student-profiles: hva som lagres, formål, hvem som ser hva (også topplister og utviklerens tilgang), opprettelse, klassekode, passordhjelp, delte enheter, sletting, leverandører og kontakt; uavklarte forhold sagt rett ut. terms.html (nb/en) har avsnitt om elevprofiler. Ny web/skole.html (axle.no/skole.html): fakta (verifisert), uavklart (eieren) og sjekkliste for skolens egen vurdering i sju punkter etter Datatilsynets veiledning; ingen påstand om godkjenning; kamera brukes ikke. Lenker i appen fra «Elevprofiler», elevinnlogging, «Bli med» og elevens kontoinnstillinger. supabase/ELEVER.md har liste over hva eieren må avklare. Tester: test_elever_db.mjs 44 sjekker (bl.a. lærersletting og profilsperre), check_elever.js 0 feil (bl.a. delt enhet, statistikk, profilbilde, lenker og at sidene ikke påstår godkjenning). Gjenstår (eieren): punktene under «Uavklart» i supabase/ELEVER.md og skole.html; kjøre elever.sql på nytt.
- [x] 30. Ingen utilsiktet zoom på mobil og iPhone-app i simulatoren – ferdig 2026-10-15: årsak til zoom i Safari: tekstfelt under 16 px (iOS zoomer inn ved fokus) og dobbelttrykk. Rettet: 16 px i tekstfelt på berøringsskjerm, `touch-action: manipulation` på siden (tegneflater/dra-kontroller har `none`), `maximum-scale=1` bare på iPhone/iPad (ui_fit.js; Safari tillater fortsatt klyping for tilgjengelighet, Android ikke berørt), `ios.zoomEnabled: false` skrevet ut i capacitor.config.json, kladdearkets faner passer på 320 px, og et klikk rett etter berøring med to eller flere fingre ignoreres (ui_fit.js: UI-testen viste at et klyp over et fagkort på iPad valgte kortet når zoom er av; bekreftet feilende før rettingen). Capacitor-prosjektet `ios/` laget med `npx cap add ios` + sync + Pencil-broen og lagt i Git. Bygget og startet i simulatoren (Xcode 27, iOS 18.1). UI-test med ekte berøring (tools/ios_uitest/, XCUITest): dobbelttrykk, klyping ut/inn, rulling, fagvalg, teori, oppgave, kladdeark (tegning, klyping zoomer arket og ikke siden), svar, neste oppgave, avslutt, alle fem faner og fokus i e-postfelt, og at klyping over et fagkort ikke velger det – grønn på iPhone SE, iPhone 16 Pro, iPhone 16 Pro Max og iPad Pro 11. Safari i simulatoren (nullstilt): ingen zoom ved fokus i tekstfelt, klyping zoomer (som det skal, tilgjengelighet), men **dobbelttrykk zoomer ca. 13 %** på tekst og kort tross touch-action; tre forsøk på å stoppe det fra siden virket ikke og er fjernet. Dokumentert som Safari-begrensning; appen er ikke berørt. Ny tools/check_mobile.js (6 bredder 320–430 px × 13 skjermer, 0 feil). Dokumentasjon: docs/IPHONE.md (simulator uten konto, egen iPhone med signering, Safari-begrensninger, UI-testen). Ikke testet: fysisk iPhone/iPad, Android-enhet.
- [x] 31. Rask pennskrift på iPad – ferdig 2026-10-15 (eierens melding: «ikke responsivt nok til at man kan skrive fort»): årsak: hver gang et strøk sluttet, ble hele arket tegnet på nytt (22 ms i Chrome og 7–10 ms i WebKit med mye kladd på en rask Mac, flere ganger mer på iPad), så starten av neste bokstav mistet bilder; i tillegg ble hele lerretet kopiert til skjermen i hvert bilde. Nå legges bare siste stykke inn ved slutten av et strøk (0,1 ms), bare området rundt pennen kopieres, touchstart/touchmove stoppes på lerretet (Scribble/iOS-bevegelser holder ikke igjen raske strøk), Safari får et anslått punkt 12 ms fram (scPredict), og lerretets plass leses én gang per strøk. Tester: test_draw.js (avsluttet strek = hele streken, anslag), ny tools/check_pen.js (500 raske strøk, skjermen piksel for piksel lik full omtegning, Chrome og WebKit), tegning i iOS-simulatoren. Ikke testet med ekte Apple Pencil; punkt lagt til i sjekklista i docs/PUBLISERING.md.
- [x] 32. Lenke til tidligere eksamensoppgaver fra Udir – ferdig 2026-10-15: én kompakt tekstlenke «Tidligere eksamensoppgaver fra Udir» / «Past exam papers from Udir» under prøveeksamenene i «Eksamenstrening» (Øv), bare i fag med sentralt gitt eksamen (alle VGS-fag og Matematikk 8.–10., 20 fag). Peker til Udirs generelle søkeside (sokeresultat.udir.no/eksamensoppgaver.html?ExCatalogTypeName=Eksamensoppgaver); Udir har ingen dokumenterte lenker per fag eller år, så eleven søker på fagnavn eller fagkode og velger år der. Passordteksten følger Udirs side «Forberede og ta eksamen» («Oppgavene er passordbeskyttet, men skolen kan gi deg passordet når som helst»); ikke noe passord i appen. Åpnes i ny fane (target=_blank, rel=noopener noreferrer, «(åpnes i ny fane)» for skjermleser), synlig fokus, ingen Udir-logo, ingen nedlasting/kopi/innbygging, ingenting om gjenbruksrett (under avklaring). Test: tools/test_udir.js (i npm test). Kontrollert i Chrome på 375, 768 og 1280 px, lyst og mørkt: én lenke, ingen overflyt, Tab når lenken med 3 px fokusramme. Ikke prøvd i iOS-/skrivebordsappen (bruker samme _blank-lenker som «Om Axle»).

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

Arbeidsmåte og mal: [docs/ANIMASJONER.md](ANIMASJONER.md).

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

## 19. Gjør det raskt å gå videre etter et svar

(Lagt inn 2026-10-15.) Etter et svar, riktig eller feil, skal neste handling være lett å finne og trykke på uten å bla. Det gjelder kartspillet og resten av appen der man svarer, snur et kort eller fullfører et steg.

* Gå gjennom svarflytene i kartspill, vanlige oppgaver, lynrunder, quizer, flashcards og andre spill.
* «Neste», «Fortsett» eller tilsvarende skal være synlig og lett å trykke på med én gang tilbakemeldingen vises, også på små skjermer.
* Rolig kartmodus: se riktig svar og gå videre uten å lete under kartet eller svaralternativene.
* Ved feil svar skal tilbakemelding og fasit være lesbare; knappen må ikke dekke dem.
* Fast eller sticky handlingsrad der det passer, med safe areas på iPad/iPhone. Knappen må ikke dekke oppgaveinnhold, svaralternativer eller viktig kartinformasjon.
* Går svaret automatisk videre: vis tydelig hvor lenge til neste, og gi mulighet til å gå videre med en gang.
* Ikke tving brukeren til å scrolle etter hvert svar; behold en fornuftig scrollposisjon.
* Kontroller korte og lange oppgaver, riktig og feil svar, kart med mange alternativer, rolig modus og tilbakemeldinger med forklaring.
* Test på 375 px, nettbrett og 1280 px, med og uten berøring. Knappen skal virke med tastatur og skjermleser.
* Rett feil som kan gjenskapes, og noter skjermstørrelser og svarflyter som er kontrollert. Ikke fjern forklaringer eller gjør dem vanskeligere å lese.

---

## Runde 4 (lagt inn 2026-10-15)

Oppgave 1–19 er ferdige (16 delvis, se status); ikke gjør dem på nytt. Etter hvert trinn: `python3 build.py` og `npm test` grønne, oppdater status med dato, commit, push arbeidsgrenen `claude/loving-cerf-qzvm7j`. Ikke push til `main` før alle oppgavene i runden er ferdige og samlet kontroll er grønn. Ikke påstå testing på fysisk iPad, mot ekte Supabase-data eller med en bestemt voiceover-stemme med mindre det faktisk er gjort.

Særskilt kontroll fra forrige runde (tas med i oppgavene under): Pencil-dobbelttrykk (23), «Neste» uten scrolling med automatisk test (20), kartgeometri og historiske grenser (22), og at UI-endringene faktisk virker på mobil, i lyst tema og med tastatur (20).

## 20. Gjør grensesnittet tydeligere og mer intuitivt

Gå gjennom de viktigste brukerreisene fra en elevs ståsted: startside, Lær, Øv, Teori, søk, spill og dueller, enhetsvisning og svarflyt. Finn faktiske problemer før løsninger. Bekreft først: (1) «START HER» og «START» konkurrerer på startsiden; (2) Øv har mange konkurrerende valg – én anbefalt neste handling, resten gruppert uten å fjerne noe; (3) kartspillet er vanskelig å finne og søk etter «kart» finner det ikke; (4) inkonsekvente navn, uklare ikoner, tomme tilstander, svak tilbakemelding, kontrast, små trykkmål, unødvendig mange steg.

Små, begrunnede endringer; behold identiteten. For hver endring: hva eleven prøver å gjøre, hvor hen blir usikker, hva som endres, hvordan neste handling blir tydeligere. Prioritet: hvor man begynner → finne fag/enhet/spill → hva som skjer etter svar → mobil, tastatur, skjermleser → finpuss. Én hovedhandling per område; ikke farge alene for riktig/feil. Test 375/768/1280 px, lyst og mørkt, tastatur. Automatiske kontroller for konkrete feil (ikke skjøre tekststrenger), blant annet at videreknappen ikke havner utenfor skjermen. Funn og begrunnelser i `docs/UI_GJENNOMGANG.md`.

## 21. Planlegg lærerike animasjoner med manus og voiceover

6–10 temaer fra Axles faktiske fag (start med derivasjon og integrasjon): målgruppe/forkunnskaper, elevspørsmål, misforståelse, hva bevegelse viser bedre, hvor i Axle. To ferdige pilotmanus (minst ett matematikk): tittel, målgruppe, forkunnskaper, «Etter filmen kan eleven …», 60–120 s, visuell stil, sceneplan i 5–15 s, nøyaktig voiceover, skjermtekst, hva som vises per linje, kontrollert eksempel, avslutning med oppsummering og spørsmål. Derivasjon: sekant → tangent med f(x)=x², f'(x)=2x, stigning 6 ved x=3. Integrasjon: rektangler som blir smalere med f(x)=x fra 0 til 2 (=2), og integral som akkumulert mengde. Norsk versjon først; engelsk versjon hvis engelsk TTS kan gi naturligere stemme. Skill mellom TTS-klart manus, stemme som må testes og menneskelig innlesing. Undertekster/tekstalternativ, mobil, redusert bevegelse, kilder. Leveres i `docs/ANIMASJONER.md` med mal og kvalitetsliste. Ingen animasjonsmotor i denne oppgaven.

## 22. Kontroll av kartgrenser og landvalg

Bruk eksisterende kode og tester først. Undersøk: samme geometri for markering og klikkflate; øyer, smale og små land (Norge) med riktig form og størrelse; forventet land utenfor utsnittet; projeksjon og zoom slik at aktuelle land er synlige og store nok å treffe; om historiske spørsmål bruker grenser fra riktig periode; oppførsel ved feil svar, rolig modus og neste spørsmål. Rett bekreftede feil med tester. Ikke endre historisk geografi uten å verifisere grenser og periode mot kilde; dokumenter kilder og usikkerhet.

## 23. Apple Pencil-dobbelttrykk og tegneopplevelse

Skill mellom tegning i nettleser, dobbelttrykk på webplattformen, støtte via iOS/Capacitor-bro og faktisk test på fysisk iPad. Implementer native bro hvis det passer prosjektets oppsett; behold knappene. Forbedre respons og jevnhet uten forsinkelse; kontroller penn, finger og mus separat. Tester for logikk som kan testes automatisk; dokumenter hva som må verifiseres på fysisk iPad.
