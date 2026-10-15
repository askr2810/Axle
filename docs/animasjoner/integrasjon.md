# Animasjon: Integralet – smale rektangler og samlet mengde (id: integrasjon)
Status: pilotmanus (oppgave 21, 2026-10-15). Ikke bygget, ikke faglig godkjent av fagperson.
Fag/enhet: VGR2, enhet 1 «Integrasjon» og enhet 7 «Areal og volum med integral»; også MEK1000 enhet 2 «Integrasjon» og NUM enhet 2 «Interpolasjon og integrasjon».
Plassering (hvis den bygges): teorien i enhetene over (![anim:integrasjon]) og Labben, ved siden av simuleringen «Integral som areal» (`riemann` i sims.js).

## Del A – Manus

### 1. Målgruppe og mål
- **Målgruppe:** elever i R2 og studenter i første matematikkemne som møter det bestemte integralet.
- **Forkunnskaper:** arealet av rektangel og trekant; grafen til f(x) = x; tid, fart og strekning (s = v · t ved konstant fart).
- **Etter filmen kan eleven** forklare at det bestemte integralet er grensen for summen av mange smale rektangler, og at det både er et areal og en samlet (akkumulert) mengde. Eleven kan finne ∫₀² x dx = 2 og forklare hvorfor.
- **Elevspørsmål filmen svarer på:** «Hvorfor er integralet et areal, og hva har det med virkeligheten å gjøre?»
- **Misforståelsen vi vil overvinne:** «Integralet er bare en regneregel (motsatt av derivasjon), og rektangler gir bare et omtrentlig svar.» Orton (1983) fant at mange elever kunne regne ut integraler uten å forstå dem som grensen for en sum.
- **Hva bevegelse viser bedre enn et stillbilde:** at rektanglene blir smalere og trappetrinnene klemmer seg inn mot linjen fra både over og under, og at arealet *vokser* når øvre grense flyttes.
- **Lengde:** ca. 95 s. **Visuell stil:** grafen blå (--c3), rektangler under grafen grønne (--c4, halvgjennomsiktige), rektangler over grafen oransje (--c2), øvre grense og tid lilla (--c5). Tall og tabeller i høyre felt.

### 2. Scener
Ca. 2,5 ord/s på norsk, hver scene 5–15 s. Stemme som i derivasjon.md: «TTS-klar», «Må testes» (symboler) eller menneskelig innlesing.

| # | Scene | Tid (s) | Fortellertekst nb (nøyaktig) | Hva vises (bildet) | Skjermtekst | Stemme |
|---|---|---|---|---|---|---|
| 1 | Arealet under grafen | 0–9 | Her er grafen til f av x lik x, fra 0 til 2. Hvor stort er arealet mellom grafen og x-aksen? | Linjen y = x tegnes fra x = 0 til x = 2. Området under kantes med stiplet linje og fylles svakt. | f(x) = x · «Areal = ?» | Må testes («f av x lik x») |
| 2 | To rektangler | 9–19 | Vi fyller arealet med rektangler. Med to rektangler, hvert 1 bredt, er høydene 0 og 1. Summen blir 1. | To rektangler med venstre hjørne på grafen glir inn (bredde 1, høyde 0 og 1). Det første er flatt. | n = 2: 0 · 1 + 1 · 1 = 1 | TTS-klar |
| 3 | Smalere rektangler | 19–29 | Med fire rektangler blir summen 1,5. Med åtte blir den 1,75. Trappetrinnene følger linjen stadig tettere. | Rektanglene deles: n = 4, så n = 8. Hullet mellom trappen og linjen (hvite trekanter) krymper. | Tabell n / sum: 2 → 1; 4 → 1,5; 8 → 1,75 | TTS-klar |
| 4 | Tenkepause | 29–38 **(venter)** | Hva tror du summen nærmer seg når rektanglene blir uendelig smale? Tenk deg om, og trykk Fortsett. | Animasjonen stopper på n = 8. | «Hva nærmer summen seg?» | TTS-klar |
| 5 | Grensen | 38–49 | Med hundre rektangler er summen 1,98. Tallene nærmer seg 2. Det er nøyaktig arealet av trekanten: 2 ganger 2, delt på 2. | n = 100: trappen kan nesten ikke skilles fra linjen. Trekanten markeres med grunnlinje 2 og høyde 2. | 100 → 1,98 · «2 · 2 / 2 = 2» | TTS-klar |
| 6 | Ovenfra og nedenfra | 49–60 | Mange tror rektanglene bare gir et omtrentlig svar. Men legger vi dem over linjen, får vi 2,02. Begge summene klemmer seg inn mot 2. | Oransje rektangler over linjen legges oppå. To kolonner i tabellen: under (2 − 2/n) og over (2 + 2/n), for n = 8 og 100. | under 1,75 · 1,98 / over 2,25 · 2,02 → 2 | TTS-klar |
| 7 | Samlet mengde | 60–73 | La x være tid i sekunder, og f av x farten i meter per sekund. Hvert rektangel er da fart ganger tid: en liten strekning. Summen er hele strekningen, 2 meter. | Aksene får nye navn: t (s) og v (m/s). Ett rektangel lyser opp med «v · Δt». En teller «strekning» går fra 0 til 2 m mens rektanglene fylles fra venstre. | v · Δt = liten strekning · strekning = 2 m | Må testes («f av x», «meter per sekund») |
| 8 | Arealet vokser | 73–84 | La den øvre grensen gli fra 0 til 2. Arealet vokser som x i andre delt på 2, raskest der grafen er høyest. | En lilla loddrett strek (øvre grense) glir fra 0 til 2; arealet til venstre fylles. Verdier: 0,5 ved x = 1, 2 ved x = 2. | A(x) = x²/2 · A(1) = 0,5 · A(2) = 2 | Må testes («x i andre delt på 2») |
| 9 | Oppsummering | 84–95 | Integralet er grensen for summen av mange smale rektangler. Det er både et areal og en samlet mengde. Integralet av x fra 0 til 2 er 2. | Grafen med fylt trekant. Oppsummering i høyre felt. | ∫₀² x dx = 2 · areal = samlet mengde | Må testes («integralet av x fra 0 til 2») |

Engelsk fortellertekst skrives når den norske er godkjent (som i derivasjon/anim.js), med samme tider.

### 3. Alt som vises
- **Formler:** f(x) = x; venstresum Lₙ = (2/n) · (0 + 2/n + 4/n + … + 2(n − 1)/n) = 2 − 2/n; høyresum Rₙ = 2 + 2/n; ∫₀² x dx = 2; A(x) = ∫₀ˣ t dt = x²/2.
- **Kontrollert eksempel:** n = 2: 1 · (0 + 1) = 1. n = 4: 0,5 · (0 + 0,5 + 1 + 1,5) = 1,5. n = 8: 0,25 · (0 + 0,25 + … + 1,75) = 0,25 · 7 = 1,75. n = 100: 2 − 0,02 = 1,98, over 2,02. Trekant: 2 · 2 / 2 = 2. A(1) = 0,5, A(2) = 2. Fart v(t) = t m/s i 2 s gir 2 m (gjennomsnittsfart 1 m/s i 2 s).
- **Symboler:** n antall rektangler; Δt (eller Δx) bredden 2/n; A(x) arealet fra 0 til x.

### 4. Kontroll av forståelsen
- **Spørsmål:** «Hva er ∫₀⁴ x dx?» **Riktig:** 8 (trekant 4 · 4 / 2).
- **Fristende feilsvar:** 16 (glemmer å dele på 2, rektangel i stedet for trekant), 4 (øvre grense), 2 (svaret fra filmen).
- **Forklaring:** «Arealet under y = x fra 0 til 4 er en trekant med grunnlinje 4 og høyde 4: 4 · 4 / 2 = 8. Med A(x) = x²/2 blir det 16/2 = 8.»

### 5. Tilgjengelighet
Som derivasjon.md: teksting per replikk, transkript med bildebeskrivelse, trinnmodus ved redusert bevegelse, 375 px uten tekst under 12 px, knapper ≥ 44 px, starter ikke av seg selv. I scene 6 skilles under/over med både farge og plassering (under/over linjen) og med ord i tabellen.

## Del B – Faglig kontroll
| Påstand / utregning | Kontrollert mot | Resultat | Usikkerhet |
|---|---|---|---|
| Lₙ = 2 − 2/n og Rₙ = 2 + 2/n for f(x) = x på [0, 2]; ∫₀² x dx = 2 | Regnet ut (sum av aritmetisk rekke 0 + 1 + … + (n − 1) = n(n − 1)/2); trekantareal | stemmer | – |
| For en voksende funksjon ligger venstresummen under og høyresummen over integralet | Standard (monoton funksjon) | stemmer | Gjelder ikke generelt; manuset sier det bare om denne linjen |
| Strekning = integralet av farten | Fysikk 1: areal under v,t-graf = forflytning | stemmer | Fortellerteksten sier «strekning»; for fart som skifter fortegn er det forflytning. Her er v ≥ 0 |
| Misforståelsen | Orton, A. (1983). Students’ understanding of integration. *Educational Studies in Mathematics* 14, 1–18, doi:10.1007/BF00704699 | kilde funnet | Ikke lest i sin helhet |

## Del C – Implementeringsinstruks
Skrives når manuset er godkjent. Kan bruke `prototypes/animasjoner/player.js` uendret: lag `prototypes/animasjoner/integrasjon/anim.js` med samme form som derivasjon (lines, scenes, frame, check, facts), og legg talloppslagene i `tools/test_anim_proto.js`.

## Del D – Sjekkliste
Som derivasjon.md, Del D.
