# Slik publiserer du Axle

Tre versjoner bygges fra samme kode: **nettversjon** (gratis, GitHub Pages), **Android** (Google Play) og **iOS** (App Store).
Anbefalt rekkefølge: nett → Google Play (lukket test) → App Store. Reklame kan komme senere (se nederst).

---

## 0. Én gang: kontoer og verktøy

| Hva | Pris | Hvor |
|---|---|---|
| GitHub-konto | gratis | github.com |
| Web3Forms-nøkkel (tilbakemeldinger til e-post) | gratis | web3forms.com – skriv inn **engidrilli@gmail.com**, nøkkelen kommer på e-post |
| Google Play Console | 25 USD én gang | play.google.com/console (krever ID-verifisering) |
| Apple Developer Program | 99 USD per år | developer.apple.com/programs |

På Macen:
1. Installer **Xcode** fra App Store (åpne det én gang og godta lisensen).
2. Installer **Node.js** (LTS) fra nodejs.org.
3. Installer **Android Studio** fra developer.android.com/studio.
4. Installer **CocoaPods** hvis Capacitor ber om det: `sudo gem install cocoapods` (nyere Capacitor bruker Swift Package Manager og trenger det ikke).

## 1. Gjør prosjektet klart

Pakk ut prosjektmappa, åpne Terminal i mappa og kjør:
```
npm install
npm test          # kjører alle oppgaver og all matte på norsk og engelsk
npm run build     # lager release/www (nett + app) og dist/artifact.html
```
Lim inn Web3Forms-nøkkelen i `config.js` (`web3formsKey: "..."`) og kjør `npm run build` på nytt.
Uten nøkkel åpner «Send» i appen e-postappen med rapporten ferdig utfylt til engidrilli@gmail.com.

Test lokalt: `npm run serve` og åpne http://localhost:8080 i nettleseren.

## 2. Nettversjonen på axle.no (GitHub Pages)

1. Lag et nytt repo på GitHub, f.eks. `axle`, og last opp hele prosjektmappa (uten `node_modules`).
2. I repoet: **Settings → Pages → Source: GitHub Actions**. Hver push til `main` testes og publiseres automatisk.
3. **Settings → Pages → Custom domain:** skriv `axle.no` og trykk Save. (Bygget legger også inn en `CNAME`-fil automatisk.)
4. Hos **domene.no** → Mine domener → axle.no → **DNS**. Slett eventuelle gamle A-/AAAA-poster for `@` og legg inn:

| Type | Navn | Verdi |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | `<github-brukernavn>.github.io` |

5. Vent til DNS har spredt seg (minutter til noen timer). Når GitHub viser grønn hake, kryss av **Enforce HTTPS**.
6. Da ligger appen på **https://axle.no** og personvernsiden på **https://axle.no/privacy.html** (allerede lagt inn i `config.js` og butikktekstene).

Tips: Tilbyr domene.no e-postvideresending, lag f.eks. `kontakt@axle.no` → engidrilli@gmail.com og bytt `contactEmail` i `config.js`. Det ser mer profesjonelt ut i butikkene.

## 2b. Kontoer (Supabase) – valgfritt for brukeren

Appen virker uten konto. Logger brukeren inn med kode på e-post, synkroniseres fremgangen mellom enhetene.
`supabaseUrl` og `supabaseKey` (den offentlige *publishable*-nøkkelen) står i `config.js`. Den hemmelige *secret*-nøkkelen skal aldri inn i appen.

Én gang i Supabase:
1. **SQL Editor → New query**: lim inn hele `supabase/oppsett.sql` og trykk **Run**. Det lager tabellen `progress`, reglene som gjør at hver bruker bare ser sine egne data, og funksjonen bak «Slett konto».
2. **Authentication → URL Configuration → Site URL**: `https://axle.no`.
3. **Egen e-postutsending (påkrevd)**: Uten egen SMTP sender Supabase bare til eierne av prosjektet. Bruk Resend (gratis): legg til domenet `axle.no` (region Ireland), legg DNS-postene inn hos domene.no, lag en API-nøkkel og fyll inn i **Authentication → Emails → Set up SMTP**: host `smtp.resend.com`, port `465`, brukernavn `resend`, passord = API-nøkkelen, avsender `noreply@axle.no`.
4. **Authentication → Emails → Magic Link**: emne `Din kode til Axle`, innhold med `{{ .Token }}` (koden brukeren skriver inn).

5. **Venner og poengtavle**: kjør også `supabase/venner.sql` i SQL Editor (etter `oppsett.sql`).

Personvernsvar i butikkene når kontoer er på:
- *Google Play → Datasikkerhet*: E-postadresse (samles inn, påkrevd for konto, ikke delt, formål: kontoadministrasjon) og Appaktivitet → annen brukeraktivitet (fremgang, formål: appfunksjonalitet). Kryptert under overføring. Brukeren kan be om sletting (i appen).
- *App Store → App-personvern*: Kontaktinfo → E-postadresse og Brukerinnhold → Annet brukerinnhold, begge knyttet til brukeren, formål *App-funksjonalitet*, ikke brukt til sporing.
- Med Venner kommer i tillegg *Personlig info → Navn* (visningsnavnet, valgfritt, vises bare for venner, formål: appfunksjonalitet). I App Store: *Kontaktinfo → Navn*, knyttet til brukeren, ikke sporing.
- Kontosletting finnes i appen: Innstillinger → Slett konto.

## 3. Ikon og splash (én gang)
Ikonene ligger allerede i `assets/`, `web/icons/` og `store/`. Etter at iOS/Android er lagt til (steg 4 og 5):
```
npm run assets
```
Vil du endre ikonet: rediger `tools/make_icons.py`, kjør `npm run icons` og deretter `npm run assets`.

## 4. Android → Google Play

```
npx cap add android
npm run assets
npm run android        # bygger, synkroniserer og åpner Android Studio
```
I Android Studio:
1. Test på emulator eller telefon (▶). Sjekk tilbakeknapp, påminnelser (Innstillinger → Påminnelse) og at appen virker uten nett.
2. **Build → Generate Signed App Bundle** → Android App Bundle → lag en ny nøkkel (keystore). **Ta vare på keystore-fila og passordene** – uten dem kan du aldri oppdatere appen.
3. Du får en `.aab`-fil.

I Play Console:
1. **Opprett app**: navn «Axle – ingeniørtrening», standardspråk norsk, app, gratis.
2. Fyll ut **Butikkoppføring** med tekstene i `store/listing_nb.md` (og engelsk oversettelse fra `store/listing_en.md`), ikon `store/play-icon-512.png`, funksjonsgrafikk `store/play-feature-graphic-1024x500.png` og minst 2 skjermbilder (ta dem i emulatoren).
3. **Appinnhold**: personvern-URL, ingen annonser (foreløpig), målgruppe 18+ (eller 13+), innholdsvurdering (utdanning, ingen støtende innhold).
4. **Datasikkerhet**: Appen samler bare inn data når brukeren selv sender en rapport:
   - *Personlig info → E-postadresse* (valgfri, til å svare på tilbakemelding) – ikke delt, ikke påkrevd.
   - *Appaktivitet → Annet brukergenerert innhold* (feilrapporten) – for å forbedre appen.
   - Data krypteres under overføring (HTTPS). Brukeren kan be om sletting via e-post.
5. **Nye personlige utviklerkontoer** må kjøre en **lukket test med minst 12 testere i 14 dager** før de kan søke om produksjon. Last opp `.aab` under *Testing → Lukket testing*, legg inn e-postene til 12+ venner/medstudenter, og be dem installere og bruke appen litt.
6. Etter 14 dager: søk om produksjonstilgang og send inn.

## 5. iOS → App Store

```
npx cap add ios
npm run assets
npm run ios            # bygger, synkroniserer og åpner Xcode
```
I Xcode:
1. Velg prosjektet **App** → *Signing & Capabilities* → Team: din Apple Developer-konto. Bundle Identifier: `no.axle.app`.
2. Kjør i simulatoren (▶) og på egen iPhone. Test påminnelser, haptikk og offline.
3. Skjermbilder: kjør på den største iPhone-simulatoren og trykk ⌘S (lagres på skrivebordet). Ta 3–6 bilder: forsiden, teori, en oppgave, kladdearket og et eksamensresultat.
4. **Product → Archive** → *Distribute App* → *App Store Connect* → Upload.

I App Store Connect (appstoreconnect.apple.com):
1. **Mine apper → + Ny app**: navn «Axle – ingeniørtrening» (eller «Axle: Engineering Practice»), primærspråk norsk, bundle-ID `no.axle.app`, SKU f.eks. `axle-1`.
2. Legg til engelsk som ekstra språk og lim inn tekstene fra `store/`.
3. **App-personvern**: *Data som samles inn*: Kontaktinfo → E-postadresse (valgfri, kundestøtte) og Brukerinnhold → Kundestøtte (feilrapporter). Ikke brukt til sporing.
4. Alder: 4+. Kategori: Utdanning. Pris: gratis.
5. Velg bygget du lastet opp → **Send til gjennomgang**. Test gjerne først med **TestFlight**.

Tips mot avvisning (retningslinje 4.2 «minimumsfunksjonalitet»): Axle har offline-bruk, lokal lagring, påminnelser, haptikk, kladdeark og eksamensmodus – nevn det i «Notes for review», og at ingen innlogging trengs.

## 6. Oppdatere appen senere
1. Endre koden, øk `appVersion` i `config.js` og `version` i `package.json`.
2. `npm test && npm run sync`.
3. Android: øk *versionCode* og *versionName* i `android/app/build.gradle`, lag ny signert `.aab`, last opp.
4. iOS: øk *Version/Build* i Xcode, Archive, last opp.
5. Nettversjonen oppdateres av seg selv ved push til GitHub.

## 7. Reklame senere (valgfritt)
Når appen har brukere: Google AdMob via Capacitor-tillegget `@capacitor-community/admob`.
Husk at reklame endrer personvernsvarene i begge butikkene, krever samtykkedialog (GDPR/UMP) og på iOS «App Tracking Transparency».
Legg reklame bare mellom leksjoner, aldri under eksamen eller midt i en oppgave.

## Filoversikt
| Fil/mappe | Innhold |
|---|---|
| `config.js` | versjon, Web3Forms-nøkkel, kontakt-e-post, navn |
| `i18n.js` | alle tekster i appen (norsk/engelsk), fagnavn og emnekoder |
| `data.js`, `gens*.js`, `more*.js`, `subjects2*.js` | oppgavebanken og generatorene |
| `en_static_*.js` | engelske oversettelser av de faste oppgavene |
| `learn.js` | teori-API, forkurs og «bygger på» |
| `add_*.js` | teori og ekstra oppgaver per fag |
| `exam.js` | prøveeksamener |
| `app.js`, `styles.css` | selve appen |
| `web/`, `vendor/` | manifest, service worker, personvernside, ikoner, KaTeX |
| `tools/` | tester, ikonlager, skrift-kopiering |
| `store/` | butikktekster og grafikk |
