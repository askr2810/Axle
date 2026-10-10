# Homebrew-oppskrift for Axle på Mac. Oppdateres automatisk av .github/workflows/release.yml.
#   brew tap askr2810/axle https://github.com/askr2810/axle
#   brew install --cask --no-quarantine axle
cask "axle" do
  version "1.0.2"
  sha256 "48d5b1cebca47368b9f392d9aaee342aa4f7caf77a688e89b84f73b5d28359dc"

  url "https://github.com/askr2810/axle/releases/download/v#{version}/Axle.dmg"
  name "Axle"
  desc "Learning made simple: driving test, upper secondary, engineering and more"
  homepage "https://axle.no/"

  app "Axle.app"

  zap trash: [
    "~/Library/Application Support/no.axle.app",
    "~/Library/Caches/no.axle.app",
    "~/Library/WebKit/no.axle.app",
  ]

  caveats <<~EOS
    Axle er ikke signert av Apple ennå. Installer med --no-quarantine.
    Ellers: åpne Axle én gang, gå til Systeminnstillinger → Personvern og sikkerhet
    og trykk «Åpne likevel» (på eldre macOS: høyreklikk på appen → Åpne).
  EOS
end
