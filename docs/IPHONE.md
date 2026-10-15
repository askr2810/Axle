# Axle på iPhone og iPad: zoom, simulator og testing

Gjelder iOS-appen (Capacitor, `ios/`) og Axle i Safari. Sist kontrollert 2026-10-15 med Xcode 27 og iOS 18.1-simulatorer.

## Zoom

| | iOS-appen | Safari på iPhone/iPad | Android (app og Chrome) |
|---|---|---|---|
| Klyping (to fingre) | av (Capacitor: `ios.zoomEnabled: false`) | **på**, kan ikke slås av (tilgjengelighet) | på i nettleseren |
| Dobbelttrykk | av | **zoomer litt** (ca. 13 %) på tekst og kort, se under | av (`touch-action: manipulation`) |
| Zoom når et tekstfelt får fokus | av (tekstfelt 16 px på berøringsskjerm) | av (16 px + `maximum-scale=1`) | skjer ikke |
| Systemets tekststørrelse / Zoom i Tilgjengelighet | virker | virker | virker |

Slik er det gjort:
- `styles.css`: `touch-action: manipulation` på siden (tegneflater og dra-kontroller har `touch-action: none`),
  `-webkit-text-size-adjust: 100%` (iOS forstørrer ikke teksten ved rotasjon) og 16 px tekst i tekstfelt på berøringsskjerm.
- `ui_fit.js`: `maximum-scale=1` legges til viewport **bare på iPhone/iPad**. Safari tillater likevel klyping (Apple overstyrer det for
  tilgjengelighet), men zoomer da ikke inn på tekstfelt. På Android ville det sperret klyping, derfor ikke der.
- `capacitor.config.json`: `ios.zoomEnabled: false` (Capacitors standard, skrevet ut så det ikke endres ved et uhell).
- `ui_fit.js`: et klikk rett etter berøring med to eller flere fingre ignoreres. Med zoom av gjorde WebKit et klyp over et fagkort om til et
  klikk (UI-testen på iPad valgte «Sykepleie» ved klyping).
- Kladdearket, figurer og kartspillet har egen zoom med to fingre inne i Axle; den påvirkes ikke.

**Begrensninger i Safari (ærlig):**
- Apple lar alltid brukeren klype for å zoome i Safari, uansett hva siden ber om. Det er ment for svaksynte og kan ikke slås av fra en nettside.
- **Dobbelttrykk zoomer i Safari** (iOS 18.1-simulatoren, nullstilt, hver gang): Safari forstørrer ca. 13 % til tekstblokken eller kortet
  man trykker på, tross `touch-action: manipulation`. Prøvd uten virkning: `touch-action` på alle elementer, `preventDefault` på andre
  `touchstart`/`touchend` i et dobbelttrykk, og uten `maximum-scale`. Et dobbelttrykk på et fagkort velger det da bare én gang. Ikke kontrollert
  på fysisk iPhone eller i andre iOS-versjoner. To fingre (klyping) eller dobbelttrykk igjen zoomer tilbake.
- Vil man ha en Axle som ikke kan zoomes ved et uhell, er det iOS-appen: der zoomer verken klyping, dobbelttrykk eller tekstfelt (testet).

## Kontroller

- `node tools/check_mobile.js` (Chrome med mobilemulering, 320–430 px, iPhone og Android): viewport, ingen sideveis overflyt, knapper
  innenfor skjermen, tekstfelt ≥ 16 px, `touch-action` på siden og på tegneflater. 13 skjermer.
- `node tools/check_pen.js [--webkit]`: rask pennskrift på kladdearket (se under).
- UI-test i simulatoren (`tools/ios_uitest/`), se «Teste i simulatoren».

## Bygge og starte i iPhone-simulatoren (uten Apple-konto)

Krever Xcode (App Store) med en iOS-simulator. `xcode-select` kan peke på Command Line Tools; da settes `DEVELOPER_DIR`:

```sh
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
npm run sync                     # bygger release/www, kopierer til ios/ (npx cap sync) og legger inn Pencil-broen
# enten i Xcode: npx cap open ios → velg en iPhone-simulator øverst → ▶
# eller fra terminalen:
cd ios/App && xcodebuild -project App.xcodeproj -scheme App -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' -derivedDataPath ../../local/ios_dd CODE_SIGNING_ALLOWED=NO build && cd ../..
xcrun simctl list devices available | grep iPhone          # velg en ID
xcrun simctl boot <ID> && open -a Simulator
xcrun simctl install <ID> local/ios_dd/Build/Products/Debug-iphonesimulator/App.app
xcrun simctl launch <ID> no.axle.app
```

Simulatoren trenger ingen sertifikater eller Apple-konto (`CODE_SIGNING_ALLOWED=NO`). Appen viser filene som er kopiert inn i
`ios/App/App/public` – kjør `npm run sync` etter hver endring. I simulatoren er musa én finger; hold ⌥ for to fingre (klyping).

## Installere på egen iPhone eller iPad (fysisk enhet)

Dette er noe annet enn simulatoren og krever signering:
1. Xcode → *Settings → Accounts*: logg inn med Apple-ID. En gratis Apple-ID holder for egen enhet (appen slutter å starte etter 7 dager og må
   installeres på nytt); betalt Apple Developer Program (99 USD/år) trengs bare for TestFlight og App Store.
2. `npx cap open ios` → prosjektet **App** → *Signing & Capabilities* → Team: din konto. Bundle Identifier `no.axle.app` (med gratis konto
   kan Xcode kreve en egen, f.eks. `no.axle.app.<navn>` – ikke commit den endringen).
3. Koble til enheten med kabel, godta «Stol på denne datamaskinen», og slå på *Innstillinger → Personvern og sikkerhet → Utviklermodus* (iOS 16+).
4. Velg enheten øverst i Xcode → ▶. Første gang: *Innstillinger → Generelt → VPN og enhetsadministrasjon* → stol på utviklersertifikatet.

Ingen App Store-publisering i denne runden; se `docs/PUBLISERING.md` steg 5 når det blir aktuelt.

## Teste i simulatoren (UI-test)

`tools/ios_uitest/AxleUITests.swift` styrer den installerte appen med ekte berøring: dobbelttrykk og klyping på forsiden og i teorien
(teksten skal ha samme plass og størrelse etterpå), rulling, valg av fag, oppgave, kladdearket (tegning med finger, klyping zoomer arket og
ikke siden), klyping over et fagkort (skal ikke velge det), svar og neste oppgave, avslutt økten, alle fanene og fokus i e-postfeltet. `testSafari` gjør det samme i Safari mot `AXLE_URL`
og krever der at fokus i tekstfelt ikke zoomer og at klyping fortsatt gjør det; dobbelttrykket meldes som kjent begrensning (`XCTExpectFailure`, ikke streng). Prosjektet lages ved behov (Capacitor-prosjektet endres ikke):

```sh
gem install --user-install xcodeproj
export GEM_HOME="$(ruby -e 'print Gem.user_dir')" DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
ruby tools/ios_uitest/lag_prosjekt.rb local/ios_uitest
mkdir -p local/ios_shots
TEST_RUNNER_AXLE_SHOTS="$PWD/local/ios_shots" TEST_RUNNER_AXLE_URL=http://localhost:8080/ \
  xcodebuild test -project local/ios_uitest/AxleUITest.xcodeproj -scheme AxleUITests -destination 'platform=iOS Simulator,id=<ID>'
```

Skjermbilder og elementtrær havner i `local/ios_shots`. Installer appen på nytt først (`xcrun simctl uninstall/install`) så testen starter
fra velkomstsiden. For `testSafari`: `xcrun simctl erase <ID>` først, og kjør en lokal server for `release/www`.

## Apple Pencil og rask skrift

Kladdearket tegner streken bit for bit. Rask skrift på iPad var treg fordi **hele arket ble tegnet på nytt hver gang et strøk sluttet**
(med mye kladd 22 ms i Chrome og 7–10 ms i WebKit på en rask Mac; flere ganger mer på en iPad, så neste bokstav mistet bilder), og hele lerretet
(millioner av piksler) ble kopiert til skjermen i hvert bilde. Nå (oppgave 31):
- slutten av et strøk legger bare det siste stykket inn i mellomlageret;
- bare området rundt pennen kopieres til skjermen;
- `touchstart`/`touchmove` på lerretet stoppes, så Scribble og iOS' bevegelsesgjenkjenning ikke holder igjen korte, raske strøk;
- Safari gir ikke anslåtte punkter (`getPredictedEvents`), så Axle anslår ett punkt 12 ms fram (høyst 18 skjermpunkter) som bare vises til neste bilde;
- lerretets plass leses én gang per strøk, ikke for hvert punkt.

`node tools/check_pen.js` skriver 500 raske strøk på et iPad-stort ark og krever at skjermen er piksel for piksel lik en full omtegning,
at ingen strøk forsvinner, og at tegnearbeidet per bilde holder seg under 4 ms. Simulatoren har ingen Pencil; sjekk på fysisk iPad med lista
«Apple Pencil på iPad» i `docs/PUBLISERING.md`.
