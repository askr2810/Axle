# Animasjonsprototyper (ikke en del av appen)

Pilot fra oppgave 21. Manus og arbeidsmåte: `docs/ANIMASJONER.md` og `docs/animasjoner/`.
Mappa bygges ikke av `build.py` og publiseres ikke til axle.no.

## Kjøre lokalt

```sh
python3 -m http.server 8090 -d prototypes/animasjoner
# åpne http://localhost:8090/derivasjon/
```

Valg i adressen: `?lang=en` (engelsk), `?theme=dark` eller `?theme=light`, `?step` (trinnmodus, som ved redusert bevegelse).
Tastatur: Mellomrom = spill/pause/fortsett, ← / → = forrige/neste scene (i trinnmodus: forrige/neste bilde).

## Fortellerstemme (valgfritt, ElevenLabs)

```sh
node prototypes/animasjoner/voice.mjs derivasjon --dry-run           # viser tekstene og antall tegn
export ELEVENLABS_API_KEY=…                                          # aldri i repoet
export ELEVENLABS_VOICE_ID=…                                         # en norsk stemme fra ElevenLabs' bibliotek
node prototypes/animasjoner/voice.mjs derivasjon                     # norsk
node prototypes/animasjoner/voice.mjs derivasjon --lang en           # engelsk
node prototypes/animasjoner/voice.mjs derivasjon --only l08 --force  # lag én replikk på nytt
```

Lyden havner i `derivasjon/audio/` (i .gitignore). Last siden på nytt og slå på «Lyd».
Uten lyd viser prototypen bare teksting. Mer om modell, stemme og vilkår i `docs/ANIMASJONER.md`.

## Kontroll

```sh
node tools/test_anim_proto.js                      # i npm test: tider, taletempo, nb/en, tall, tegninger
node tools/check_anim_proto.js [--shots mappe]     # Playwright, krever serveren over: kollisjoner, tastatur, tenkepause
```

## Filer

- `player.js`, `player.css`: felles avspiller (ingen avhengigheter, samme farger som appen).
- `<id>/anim.js`: manus, tider og tegning for én animasjon. `frame(i, p)` tegner replikk i ved fremdrift p som SVG.
- `<id>/index.html`: siden.
- `voice.mjs`: lager lyd per replikk med ElevenLabs.
