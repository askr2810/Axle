# Axle – notater for Claude

- Bygg: `python3 build.py` (setter sammen JS-filene i rekkefølgen i build.py til release/www). Test: `node tools/test_content.js`, `node tools/test_katex.js`, `npm test` (ca. 3 min). Push til `main` publiserer axle.no via GitHub Pages.
- Figurer: `node tools/check_figs.js` (trenger Playwright og lokal server, se toppen av fila) finner etiketter som krysser streker eller annen tekst.
- Svarflyter: `node tools/check_flows.js` sjekker at «Neste» er synlig, udekket, har fokus og virker med Enter etter svar (375/768/1280, lyst/mørkt).
- Visninger: `node tools/check_views.js [sims|cards|lesson|geo]` gjør det samme for simuleringer, oppgaver, flashcards og kartspillet på 375/768/1280 px, lyst og mørkt (se toppen av fila). Se alltid på eksemplene før du retter.
- Animasjonsprototyper (utenfor appen): `prototypes/animasjoner/` (se README der og `docs/ANIMASJONER.md`). `node tools/test_anim_proto.js` er i npm test; `node tools/check_anim_proto.js` sjekker visningen med Playwright.
- Kladdearket: `node tools/test_draw.js` (penn/finger/mus og bitvis tegning, i npm test). Apple Pencil-dobbelttrykk i iOS-appen: `native/ios/AxleBridgeViewController.swift`, lagt inn av `node tools/ios_pencil.mjs` (kjøres av `npm run sync`); sjekkliste for fysisk iPad i `docs/PUBLISERING.md`.
- Supabase-oppsettet ligger i `supabase/*.sql` (kjøres for hånd av eieren i SQL Editor). Nye funksjoner må stå i riktig fil, og appen må tåle at filen ikke er kjørt ennå.
- Tilbakemeldinger og bruksstatistikk: `node tools/feedback.mjs` (åpne tilbakemeldinger) og `node tools/feedback.mjs --innsikt 7` (statistikk siste 7 dager).
  Krever miljøvariabelen `AXLE_FEEDBACK_KEY` og nettilgang til `*.supabase.co`. Se kommentarene i `supabase/tilbakemelding.sql` og `supabase/innsikt.sql`.
  Når noe er fikset: `node tools/feedback.mjs --mark 12,13 "hva som ble gjort"`.
- Eieren skriver norsk; svar på norsk.
- Plattformer: én kodebase (vanilla JS, ingen rammeverk) bygges til `release/www`. Web/PWA på axle.no, iOS/Android via Capacitor (`capacitor.config.json`), Mac/Windows via Tauri (`desktop/`, bygges av `.github/workflows/release.yml` når en tag `vX.Y.Z` pushes; Homebrew-oppskrift i `Casks/axle.rb`). Bare gratis tjenester og GitHubs gratis runnere.
