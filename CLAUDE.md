# Axle – notater for Claude

- Bygg: `python3 build.py` (setter sammen JS-filene i rekkefølgen i build.py til release/www). Test: `node tools/test_content.js`, `node tools/test_katex.js`, `npm test` (ca. 3 min). Push til `main` publiserer axle.no via GitHub Pages.
- Supabase-oppsettet ligger i `supabase/*.sql` (kjøres for hånd av eieren i SQL Editor). Nye funksjoner må stå i riktig fil, og appen må tåle at filen ikke er kjørt ennå.
- Tilbakemeldinger og bruksstatistikk: `node tools/feedback.mjs` (åpne tilbakemeldinger) og `node tools/feedback.mjs --innsikt 7` (statistikk siste 7 dager).
  Krever miljøvariabelen `AXLE_FEEDBACK_KEY` og nettilgang til `*.supabase.co`. Se kommentarene i `supabase/tilbakemelding.sql` og `supabase/innsikt.sql`.
  Når noe er fikset: `node tools/feedback.mjs --mark 12,13 "hva som ble gjort"`.
- Eieren skriver norsk; svar på norsk.
