# Faglig kontroll av teoritekstene i risikofagene

Gjennomgått 2026-10-10 av Claude (KI), **ikke** av en fagperson. Listen er laget for at en fagperson raskt skal kunne gå gjennom:
hva som er endret, og hva som er usikkert. `reviewedBy` i `beta.js` er bevisst tom til en ekte fagperson har godkjent innholdet.

**Omfang:** all teori (`THEORY` og fordypningen `DEEP`) i førerkort (FKB, FKMC), sykepleie (SLMR, SFARM, SKLIN, SSYK, SMIK, SANA, SLOV) og jus (JMET, JSTAT, JAVT, JERS, JFORV, JSTR) – omtrent 280 000 tegn på norsk, med de tilsvarende engelske avsnittene rettet samtidig.
Tall, grenser, paragrafhenvisninger, doser og normalverdier er sjekket mot lovtekst (Lovdata), Statens vegvesen, Felleskatalogen, Helsedirektoratet og FHI, slik de er kjent per 2026. Nettkildene er ikke slått opp på nytt for hvert punkt; punkter der vi ikke er helt sikre, står under «Usikkert».

**Testene:** `tools/test_answers.js` låser 182 håndkontrollerte fasiter i disse fagene (med kilde per spørsmål) og regner legemiddel- og NEWS2-oppgavene på nytt med egen tabell.

## Hvordan gå gjennom
1. Les «Endret» under hvert fag og bekreft at rettingen er riktig.
2. Ta stilling til punktene under «Usikkert» – rett i kildefila hvis nødvendig (søk etter teksten i `add_*.js`).
3. Når et område er godkjent: sett `reviewedBy` (navn og rolle) og `checked` i `beta.js`. Da forsvinner BETA-merket for området.
## Førerkort klasse B (FKB) – også felles enheter i FKMC
Kilder: forskrift om kjørende og gående trafikk (trafikkreglene), skiltforskriften, førerkortforskriften, kjøretøyforskriften, vegtrafikkloven, Statens vegvesen og Trygg Trafikk.

**Endret**
- Kjøretøyet, last og tilhenger: «varseltrekant og refleksvest som kan nås fra førerplassen» → kravet om å nå fra førerplassen gjelder refleksvesten (bruksforskriften/kjøretøyforskriften), ikke varseltrekanten. Samme presisering i spørsmålet «Hva skal alltid være i bilen?».
- Vinter og mørke (fordypning): synsavstand til fotgjenger uten refleks med nærlys var både «20–30 m» og «25–30 m» – samordnet til 25–30 m (Trygg Trafikk).

**Usikkert – bør sjekkes av fagperson**
- «Et forbudsskilt gjelder til neste kryss» (Skilt og vegoppmerking): stemmer for blant annet parkering forbudt og stans forbudt, men er usikkert for forbikjøring forbudt (kan gjelde til eget slutt-skilt). Teksten sier «normalt».
- Tommelfingerregelen «tieren i farten ganger 3» for reaksjonslengde gir 15/24/30 m; nøyaktig (km/t : 3,6) er 14/22/28 m. Teksten sier «rundt», og den nøyaktige regelen står ved siden av.
- «Over 1,2 promille blir det normalt ubetinget fengsel» og «over 0,5 promille mister du alltid førerretten i minst ett år» (vegtrafikkloven § 33): stemmer etter praksis slik vi kjenner den, men bør bekreftes mot gjeldende retningslinjer.
- Fra 75 år kreves helseattest for å fornye førerkortet – bekreft at alderen ikke er endret.

## Førerkort motorsykkel (FKMC)
Kilder: førerkortforskriften §§ 2-2 og 3-1, kjøretøyforskriften § 28-6, Statens vegvesens læreplan for klasse A.

**Endret**
- Bremsing: forbremsens andel av bremsekraften stod som «rundt 70 %» ett sted og «70–90 %» et annet – samordnet til «rundt 70 % eller mer» (som i spørsmålet).
- Språk: «en kredittkort» → «et kredittkort».

**Usikkert**
- «Motstyring virker over gangfart (rundt 20–30 km/t)»: grensen er omtrentlig (mange kilder sier fra rundt 15–20 km/t).

## Legemiddelregning (SLMR)
Kilder: Felleskatalogen, Legemiddelhåndboka, standard regneregler (mengde = styrke · volum, C₁V₁ = C₂V₂).

**Endret**
- Huskeregel «IE regnes som mg» → «IE regnes på samme måte som mg (dose delt på styrke), men kan ikke gjøres om til mg» – den gamle formuleringen kunne misforstås som at IE og mg er det samme.
- (Oppgave 6) Fire generatorer laget urealistiske tall: nå høyst 20 ml mikstur per dose, 4 tabletter, 999 ml/t og 100 dråper/min.

**Usikkert**
- Hurtigvirkende insulin «virker etter 10–20 minutter» og «hold nålen inne i omtrent 10 sekunder» – stemmer for vanlige analoger (Felleskatalogen), men varierer mellom preparater og penner.

## Farmakologi (SFARM)
Kilder: Felleskatalogen, Norsk legemiddelhåndbok, Simonsen og Aarbakke (Klinisk farmakologi), legemiddelhåndteringsforskriften, DMP.

**Endret**
- Språk: benzodiazepiner «angstdempende og sovedyktige» → «angstdempende og søvnfremkallende».

**Usikkert**
- Ingen faglige feil funnet. Paracetamol maks 4 g/døgn for voksne, steady state etter 4–5 halveringstider, SSRI-effekt etter 2–4 uker og anafylaksi = adrenalin i.m. stemmer med Felleskatalogen/Legemiddelhåndboka. Detaljer om interaksjoner (grapefrukt, johannesurt) er riktige i prinsippet, men er forenklet.

## Klinisk observasjon (SKLIN)
Kilder: NEWS2 (Royal College of Physicians 2017, norsk versjon), Helsedirektoratet (Forebygging og behandling av underernæring), ABCDE, ISBAR (Pasientsikkerhetsprogrammet).

**Endret**
- Normal hvilepuls stod både som «60–100» og «50–90» – samordnet til 60–100 (med merknad om at NEWS2 gir 0 poeng for 51–90).
- Usynlig væsketap (perspiratio) stod både som «0,5–1 liter» og «500–800 ml» – samordnet til 0,5–0,8 liter.

**Kontrollert uten endring**
- NEWS2-tabellen (alle grenseverdier), responsnivåene 0 / 1–4 / 3 i én parameter / 5–6 / ≥ 7, ortostatisk fall ≥ 20 mmHg, BMI-grensene (under 22 for eldre over 70), nattfaste under 11 timer.

**Usikkert**
- «Behovet øker ved feber, omtrent 10–15 % per grad over 37 °C» – vanlig tommelfingerregel, kildene varierer (ofte 10–12 %).
- Energibehov «omtrent 30 kcal/kg» – Helsedirektoratet skiller mellom sengeliggende (ca. 29), oppegående (ca. 32) og oppbygging (ca. 40).

## Sykdomslære (SSYK)
Kilder: Helsedirektoratets retningslinjer (diabetes, KOLS, hjerneslag, hjerte- og karsykdom), Norsk elektronisk legehåndbok, Sepsis-3 (Singer m.fl. 2016).

**Kontrollert uten endring**
- Diabetesdiagnose (HbA1c ≥ 48 mmol/mol, fastende glukose ≥ 7,0, tilfeldig ≥ 11,1), behandlingsmål ~53 mmol/mol, føling: 15–20 g druesukker og ny måling etter 15 min.
- KOLS: FEV₁/FVC < 0,7, SpO₂-mål 88–92 % ved risiko for CO₂-retensjon. CRB-65. qSOFA (RF ≥ 22, endret mental status, systolisk BT ≤ 100). Antibiotika innen én time.
- Hjerneslag: 85–90 % infarkt, trombolyse innen ~4,5 timer, neglekt oftest venstre side ved skade i høyre hjernehalvdel, status epilepticus ved anfall > 5 min.
- Hypertensjon ≥ 140/90, vektøkning > ~2 kg på noen dager ved hjertesvikt.

**Usikkert**
- «Lungekreft: 80–90 % skyldes røyking» – Kreftregisteret oppgir rundt 80–85 %; formuleringen «rundt» dekker dette.

## Mikrobiologi og smittevern (SMIK)
Kilder: FHI (Smittevernveilederen, Basale smittevernrutiner, MRSA-veilederen, MSIS), WHOs fem indikasjoner for håndhygiene, Helsedirektoratets antibiotikaretningslinjer.

**Endret**
- Språk: «egen stoffskifte» → «eget stoffskifte»; «reiser spre resistens» → «reiser sprer resistens».

**Usikkert**
- Norovirus nevnes sammen med C. difficile som grunn til å vaske med såpe og vann fordi «sprit ikke dreper godt nok» – FHI anbefaler håndvask ved norovirus, men alkohol har noe effekt; formuleringen er en forenkling.
- Covid-19 er oppført under dråpesmitte; aerosolsmitte forekommer også.

## Anatomi og fysiologi (SANA)
Kilder: Sand m.fl. (Kropp og helse), norske laboratoriers referanseområder, Helsedirektoratet.

**Endret**
- Kalium stod både som «3,5–5,0» og «3,5–4,5 mmol/l» – samordnet til «omtrent 3,5–4,5 mmol/l (varierer litt mellom laboratorier)», også i spørsmålet om normalområdet for kalium.
- Språk: «nesten all opptaket» → «nesten alt opptaket».

**Usikkert**
- Tynntarmens lengde «ca. 3–5 meter» (i levende live; oppgis ofte 6–7 m ved obduksjon).
- «Rundt 70 % av blodvolumet er i venene» (kilder oppgir 60–70 %).

## Lov og etikk i sykepleien (SLOV)
Kilder: helsepersonelloven, pasient- og brukerrettighetsloven, pasientjournalforskriften, tolkeloven, NSFs yrkesetiske retningslinjer, Meld. St. 34 (2015–2016) om prioritering.

**Endret**
- Melding om pasient som ikke oppfyller helsekravene til førerkort går til **statsforvalteren** (helsepersonelloven § 34, leger, psykologer og optikere) – ikke til Statens vegvesen.
- Barns rett til å bli hørt: «barn mellom 12 og 16 år» → barn som har fylt **7 år** skal få si sin mening, og fra **12 år** skal det legges stor vekt på den (pasient- og brukerrettighetsloven § 4-4).

**Usikkert**
- «Nødrett … (§ 23 nr. 4)»: § 23 nr. 4 gjelder når «tungtveiende private eller offentlige interesser» gjør det rettmessig å gi opplysninger – nært beslektet med nødrett, men ikke det samme. Bør vurderes av jurist.
- «Ikke være ruspåvirket i arbeid (§ 8)» – sjekk paragrafnummeret.

## Juridisk metode (JMET) og statsrett (JSTAT)
Kilder: Grunnloven, domstolloven, tvisteloven, straffeprosessloven, menneskerettsloven, EØS-loven, Lovdata.

**Endret**
- Grunnloven § 5: «Kongens person er hellig» var ordlyden før språkrevisjonen i 2014. Nå: «Kongens person kan ikke lastes eller anklages» – teksten siterer begge.

**Kontrollert uten endring**
- Grl. §§ 15 (parlamentarisme, 2007), 54, 57 (169 representanter), 75, 88, 89 (prøvingsrett, 2015), 96, 97, 100, 102, 104, 112, 113, 121 (forslag i en av de tre første årene, to tredjedels flertall).
- Høyesterett: 20 dommere, avdeling med 5, storkammer 11, ankeutvalg 3. Seks lagmannsretter. Juryordningen avviklet 2018. Tingrett: én fagdommer og to meddommere i straffesaker.
- Menneskerettsloven §§ 2 og 3 (fem konvensjoner med forrang), EØS-loven § 2, EØS 1994.

**Usikkert**
- Unntaket fra forliksrådet («når begge parter har advokat og saken gjelder større beløp») er forenklet – tvisteloven § 6-2 har en beløpsgrense (200 000 kr) og flere unntak.

## Avtale- og kjøpsrett (JAVT)
Kilder: avtaleloven, forbrukerkjøpsloven, kjøpsloven, angrerettloven, Forbrukerklageutvalgets praksis.

**Endret**
- (Oppgave 6) Heving i forbrukerkjøp: krever at mangelen «ikke er uvesentlig» (fkjl. § 32), ikke «vesentlig». Spørsmålet og oppsummeringen er rettet.
- Eksempelet om en mobil kjøpt for 2,5 år siden sa at fristen «trolig er ute». Det motsa teksten over (mobiler nevnt som femårsvarer) og praksis i Forbrukerklageutvalget, der mobiltelefoner regnes som ting som skal vare vesentlig lenger enn 2 år → fristen er 5 år. Eksempelet og generatoren for reklamasjonsfrister er rettet (mobil = 5 år).

**Usikkert**
- Generatoren regner **hodetelefoner** som en toårsvare. Praksis kan variere (dyre hodetelefoner er vurdert som femårsvarer i enkelte saker).
- «Tilbudet binder når mottakeren har fått kjennskap til det (§ 1)» – avtaleloven § 1 og § 7 er gjengitt forenklet.

## Erstatningsrett (JERS)
Kilder: skadeserstatningsloven, foreldelsesloven, bilansvarslova, hundeloven, produktansvarsloven, Rt. 1992 s. 64 (P-pille II).

**Endret**
- Samvirkende årsaker: «Høyesterett krever at handlingen har vært en vesentlig medvirkende årsak» → det er nok at handlingen ikke er en så uvesentlig årsak at den bør ses bort fra (P-pille II). Den gamle formuleringen satte kravet for høyt.

**Kontrollert uten endring**
- Skl. §§ 2-1, 2-3, 3-1, 3-2, 3-5, 5-1, 5-2. Foreldelsesloven §§ 2 og 9 (3 år, senest 20 år), avbrudd ved erkjennelse og rettslige skritt. Eksempelet med regning som forfaller 1. mars 2024 og foreldes 1. mars 2027.

## Forvaltningsrett (JFORV)
Kilder: forvaltningsloven, offentleglova, personopplysningsloven/GDPR, domstolloven § 149.

**Kontrollert uten endring**
- Fvl. §§ 2 a–e, 6, 11, 11 a, 13, 16–19, 24–25, 27, 27 b, 28–35, 41, 42. Klagefrist 3 uker fra underretningen kom fram, forlengelse til neste virkedag. Eksempelet (frist fra onsdag 5. mars til onsdag 26. mars) stemmer.
- Offentleglova §§ 3, 11, 13, 14, 15.

**Usikkert**
- «Innsynskrav skal behandles normalt innen noen få virkedager» – bygger på Sivilombudets praksis (1–3 virkedager), ikke lovtekst.

## Strafferett (JSTR)
Kilder: straffeloven (2005), straffeprosessloven, Grunnloven §§ 96–97, EMK art. 6 og 7.

**Endret**
- Nødverge: grensen stod både som «klart ut over» og «åpenbart ut over» det som er forsvarlig. Loven sier **klart** (strl. § 18 første ledd bokstav c) – rettet (også på engelsk).

**Kontrollert uten endring**
- Strl. §§ 14–23, 29, 43 (forvaring forlenges med inntil 5 år), 77–78, 80, 273, 275, 281, 287, 321, 371. Kriminell lavalder 15 år. Fengsel 14 dager–21 år (30 år for de groveste). Forsøk ved strafferamme på fengsel i ett år eller mer. Ungdomsstraff for 15–17-åringer. Tilståelsesrabatt inntil en tredjedel. Skjellig grunn = mer sannsynlig enn ikke.

**Usikkert**
- Nødrett beskrives både som «betydelig større» og «langt større» skade som avverges. Loven sier at skaden ved handlingen må være «langt mindre» enn skaden som avverges (strl. § 17 bokstav c). Meningen er den samme, men ordbruken kunne samordnes.
