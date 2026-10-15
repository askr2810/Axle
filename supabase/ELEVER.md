# Elevprofiler uten e-post (opptil 200 per lærer)

Læreren lager klasser og elevprofiler i Axle (Lærerverktøy → «Administrer elever», adresse `#/elever`). Eleven logger inn med
**innloggingsnavn og passord** («Elev? Logg inn med brukernavn»), uten e-post. Læreren ser framgangen og leksesvarene til hver elev,
kan gi nytt engangspassord og fjerne elever. Valgfritt kan læreren slå på en **klassekode** (lenke `#/klasse/KODE`) der elever på
13 år eller eldre lager eget brukernavn og passord.

## Oppsett (én gang)

1. **SQL:** Supabase → *SQL Editor* → *New query* → lim inn hele `supabase/elever.sql` → *Run*. Krever at `oppsett.sql` og
   `hoderegning.sql` er kjørt. Trygg å kjøre flere ganger.
2. **Edge Function:** Supabase → *Edge Functions* → *Deploy a new function* → *Via Editor*. Navn: `elever`. Lim inn hele
   `supabase/functions/elever/index.ts` → *Deploy function*.
3. **JWT-sjekk:** Åpne funksjonen `elever` → *Details/Settings* → slå **av** «Enforce JWT verification». Funksjonen sjekker selv
   lærerens innlogging for «create» og «reset», og «join» (klassekode) må kunne kalles uten konto.
4. **Nøkler:** ingen å legge inn. Funksjonen bruker `SUPABASE_URL`, `SUPABASE_ANON_KEY` og `SUPABASE_SERVICE_ROLE_KEY`, som Supabase
   setter selv. Service-nøkkelen finnes bare i funksjonen, aldri i appen.
5. **Innlogging med passord:** Supabase → *Authentication* → *Providers* → *Email*: «Email» må være på (passord-innlogging brukes av
   elevprofilene; e-postkoden for vanlige kontoer virker som før). Elevadressene er `…@elev.axle.no`; det sendes aldri e-post dit,
   fordi brukerne lages med bekreftet adresse.

Uten steg 1 eller 2 viser «Administrer elever» hva som mangler; resten av appen påvirkes ikke.

## Hvorfor denne løsningen

- **En elevprofil er en vanlig Supabase-bruker uten ekte e-post.** Da virker alt som finnes uendret: fremgangen synkroniseres med
  radnivåsikkerhet (eleven ser bare sin egen), lekser og quiz lagrer resultater på riktig elev (`mq_submit`), og eleven kan aldri komme
  inn på lærerens konto. Et eget innloggingssystem ved siden av Supabase Auth ville krevd egne økter og egne tilgangsregler overalt.
- **Læreren lager innloggingene** (ett navn per linje) – det enkleste i en ekte klasse og det eneste som passer for yngre elever.
  **Klassekode** er et tillegg for eldre elever som vil velge passord selv.
- **Innloggingsnavnet** er `brukernavn.klassetagg` (f.eks. `ola.k7mq`). Brukernavnet er unikt i klassen: like navn får tall bak seg
  (`ola`, `ola2`) når læreren lager dem; ved klassekode må eleven velge et ledig brukernavn. Klassetaggen er unik, så innloggingsnavnet er unikt.

## Sikkerhet

- **Grensen på 200 per lærer** håndheves i databasen av en trigger med en transaksjonslås per lærer. Plassen reserveres før brukeren
  lages i Auth, og samtidige opprettelser venter på hverandre. Testet med 288 samtidige forsøk fra 24 forbindelser: nøyaktig 200
  (`tools/test_elever_db.mjs`; uten låsen ble det 203).
- **Tilgang:** lærerens funksjoner sjekker `auth.uid()`: en lærer ser og styrer bare egne klasser og elever. Elevprofiler kan ikke lage
  klasser eller elever. Funksjonene som reserverer plass og knytter brukeren til eleven, kan bare kalles av Edge Function-en (service_role).
  Tabellene har RLS uten policyer; all tilgang går gjennom funksjonene.
- **Passord:** engangspassordet (tre ord og to sifre) vises én gang for læreren og lagres bare som hash i Supabase Auth. Glemt passord:
  læreren trykker «Nytt passord»; det gamle slutter å virke og vises aldri. Passord logges aldri og sendes aldri til databasen.
- **Klassekoden** gir bare lov til å legge seg selv til i klassen. Den kan fornyes (den gamle slutter å virke) og slås av. Den gir ingen
  tilgang til lærerens konto eller andre elevers data.
- **Fjerning** sletter brukeren i Auth med fremgang og leksesvar. Sletting av klasse fjerner elevprofilene i den.
- Elevprofiler kan ikke bytte e-post eller slette seg selv (læreren administrerer dem), og venner, grupper og brukernavn er skrudd av i appen.

## Personvern

Lagres per elevprofil: brukernavn, visningsnavn (læreren oppfordres til bare fornavn), klasse, lærer, og – som for alle kontoer –
fremgangen i appen og leksesvar. Ingen e-post, fødselsdato eller telefonnummer. Læreren ser bare XP siste 7 dager, faget eleven jobber
med, sist aktiv og leksesvar – ikke resten av elevens data.

**Må avklares av eieren før bruk i skoler (ikke avgjort av Claude):**
- Når en skole bruker elevprofiler, er skolen/kommunen trolig behandlingsansvarlig og Axle databehandler. Det krever normalt en
  **databehandleravtale** med skolen. En mal bør utarbeides før lansering.
- **Alder:** vilkårene sier at konto er for 13 år og eldre (yngre med foresatt). For elevprofiler laget av læreren bør vilkårene si at
  skolen er ansvarlig for at bruken har grunnlag (f.eks. skolens oppgaver etter opplæringsloven). Klassekoden er merket «for 13 år eller eldre».
- **Lagringstid:** profiler slettes når læreren fjerner dem. Det finnes ingen automatisk sletting av gamle klasser ennå; vurder f.eks. sletting
  etter ett år uten aktivitet.
- Supabase-prosjektets region (EU anbefales) og Supabase som underleverandør bør stå i databehandleravtalen.

## Tester

- `node tools/test_elever_fn.mjs` (i `npm test`): Edge Function-en mot en etterlignet Supabase – bare lærere kan lage og tilbakestille,
  bare egne elever, passord aldri til databasen eller i logger, plassen frigjøres når Auth feiler, passordkrav ved klassekode.
- `node tools/test_elever_db.mjs`: `elever.sql` mot en ekte Postgres – tilgangsgrenser, lærer–elev-tilknytning, klassekode, sletting og
  grensen på 200 ved samtidige opprettelser. Trenger `AXLE_PG_URL` eller npm-pakken `embedded-postgres` i `NODE_PATH`.
- `node tools/check_elever.js`: lærerens og elevens flyt i nettleseren (Supabase etterlignet i nettverkslaget), 375/768/1280 px, lyst og mørkt.
