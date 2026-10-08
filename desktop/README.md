# Axle for Mac og Windows (Tauri)

Skrivebordsappen er et lite Tauri-vindu rundt den samme web-appen som kjører på axle.no (`release/www`).
Det er ingen egen kode å vedlikeholde: alt som endres i appen, kommer med i neste versjon.

Bygges automatisk av `.github/workflows/release.yml` når en tag som `v1.2.0` pushes:

```
git tag v1.2.0 && git push origin v1.2.0
```

Da lages `Axle.dmg` (Mac, Apple Silicon og Intel) og `Axle-Setup.exe` (Windows), de legges på GitHub Releases,
og `Casks/axle.rb` oppdateres så Mac-brukere kan installere med Homebrew:

```
brew tap askr2810/axle https://github.com/askr2810/axle
brew install --cask --no-quarantine axle
```

Bygge lokalt: installer Rust og `npm i -g @tauri-apps/cli@2`, kjør `python3 build.py` i roten,
lag ikoner med `tauri icon ../release/www/icons/icon-512.png` i `desktop/src-tauri`, og kjør `tauri build` i `desktop/`.

Merk: appen er ikke signert med et Apple-utviklersertifikat (koster 99 USD/år). macOS sier derfor
«kan ikke verifisere utvikleren» første gang – høyreklikk → Åpne, eller bruk `--no-quarantine` med Homebrew.
