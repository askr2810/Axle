#!/usr/bin/env bash
# ============================================================
#  redesign.sh – lar en kode-AI (hvilken som helst) gjøre om designet til Axle i en egen kopi, uten å røre axle.no.
#  Kopien er en egen mappe (../Axle-redesign) på en egen git-gren (redesign/<navn>). Den pushes aldri til main.
#  Du ser den i nettleseren (og på mobilen på samme wifi) side om side med dagens Axle. Se docs/REDESIGN.md.
#
#    tools/redesign.sh start [navn]     lag kopien, ta «før»-bilder og legg oppdraget på utklippstavla
#    tools/redesign.sh fortsett         legg «fortsett der du slapp» på utklippstavla
#    tools/redesign.sh hent <gren>      bruk en gren som en AI i skyen har laget (f.eks. redesign/2026-10-17)
#    tools/redesign.sh vis              bygg begge, start dem og åpne før/etter-siden
#    tools/redesign.sh stopp            stopp de lokale serverne
#    tools/redesign.sh status           hvilke endringer (R01, R02 …) som er gjort
#    tools/redesign.sh slett            fjern kopien og grenen (spør først)
#
#  AI_CMD: har AI-en din et terminalprogram, kan skriptet starte det i kopien med oppdraget,
#  f.eks.  AI_CMD="codex" tools/redesign.sh start  (oppdraget sendes som første melding).
#  Porter: AXLE_PORT_NOW (dagens, 8776) og AXLE_PORT_NEW (kopien, 8777).
# ============================================================
set -euo pipefail

MAIN="$(cd "$(dirname "$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null || echo .git)")" && pwd)"
WT="$(dirname "$MAIN")/Axle-redesign"
RD="$WT/local/redesign"
P_NOW="${AXLE_PORT_NOW:-8776}"; P_NEW="${AXLE_PORT_NEW:-8777}"
CMD="${1:-hjelp}"; shift || true
NAME="${1:-}"

say(){ printf '\n\033[1;34m▸ %s\033[0m\n' "$*"; }
die(){ printf '\n\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }
ip(){ ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo localhost; }
branch(){ git -C "$WT" rev-parse --abbrev-ref HEAD; }

# Lokal server som også kan nås fra mobilen på samme wifi. PID lagres så «stopp» finner den.
serve(){ # $1 mappe, $2 port, $3 navn
  mkdir -p "$RD"
  if [ -f "$RD/$3.pid" ] && kill -0 "$(cat "$RD/$3.pid")" 2>/dev/null; then kill "$(cat "$RD/$3.pid")" 2>/dev/null || true; sleep 0.5; fi
  nohup python3 -m http.server "$2" --bind 0.0.0.0 --directory "$1" >/dev/null 2>&1 &
  echo $! > "$RD/$3.pid"; sleep 1
}
stop_all(){ for n in dagens kopi tmp; do if [ -f "$RD/$n.pid" ]; then kill "$(cat "$RD/$n.pid")" 2>/dev/null || true; rm -f "$RD/$n.pid"; fi; done; }

# Sperre: kopien kan ikke pushes (git-krok i repoet som bare stopper kopien og redesign/-grener).
guard(){
  local hooks; hooks="$(git -C "$MAIN" rev-parse --path-format=absolute --git-common-dir)/hooks"
  local hp; hp="$(git -C "$MAIN" config core.hooksPath || true)"; if [ -n "$hp" ]; then hooks="$hp"; fi
  mkdir -p "$hooks"
  if [ -f "$hooks/pre-push" ] && ! grep -q "Axle-redesign" "$hooks/pre-push"; then
    echo "  (fant en egen pre-push-krok; lar den være. Oppdraget sier uansett at AI-en ikke skal pushe.)"; return 0; fi
  cat > "$hooks/pre-push" <<'EOF'
#!/bin/sh
# Lagt inn av tools/redesign.sh: redesign-kopien skal aldri pushes.
case "$(git rev-parse --show-toplevel)" in *Axle-redesign*) echo "✗ Redesign-kopien pushes ikke (tools/redesign.sh). Flytt endringer til Axle i hovedmappa."; exit 1;; esac
case "$(git rev-parse --abbrev-ref HEAD)" in redesign/*) echo "✗ Grener som heter redesign/… pushes ikke herfra."; exit 1;; esac
exit 0
EOF
  chmod +x "$hooks/pre-push"
}

# Gi oppdraget til AI-en: på utklippstavla (lim inn i AI-en), i en fil, og eventuelt rett til AI_CMD.
hand_over(){ # $1 = meldingen
  mkdir -p "$RD"; printf '%s\n' "$1" > "$RD/OPPDRAG.txt"
  if command -v pbcopy >/dev/null; then printf '%s' "$1" | pbcopy; fi
  if [ -n "${AI_CMD:-}" ]; then say "Starter $AI_CMD i kopien"; cd "$WT"; $AI_CMD "$1"; return; fi
  say "Oppdraget ligger på utklippstavla (og i $RD/OPPDRAG.txt)"
  echo "  1. Åpne AI-en din i mappa:  $WT"
  echo "     (terminal: cd \"$WT\" og start AI-programmet; editor: File → Open Folder → Axle-redesign)"
  echo "  2. Lim inn oppdraget (Cmd+V) og send."
  echo "  3. Gi den lov til å kjøre kommandoer (bygg, test, skjermbilder) i den mappa. Den skal ikke pushe."
  echo "  4. Underveis og til slutt: tools/redesign.sh vis"
}

shots(){ # $1 = for|etter
  if ! (cd "$WT" && node -e "try{require('playwright')}catch(e){require('playwright-core')}") 2>/dev/null; then
    echo "  (Playwright mangler, hopper over skjermbilder. Installer med: npm i -D playwright && npx playwright install chromium)"; return 0; fi
  (cd "$WT" && node tools/redesign_shots.js --url "http://localhost:$P_NEW/" --out "$RD/$1") || echo "  (skjermbildene feilet; se meldingen over)"
}

prepare(){ # felles for start og hent: delte filer, sperre og «før»-bilder
  for d in node_modules vendor/pyodide; do if [ -e "$MAIN/$d" ] && [ ! -e "$WT/$d" ]; then ln -s "$MAIN/$d" "$WT/$d"; fi; done
  for d in vendor/fonts vendor/fonts.css; do if [ -e "$MAIN/$d" ] && [ ! -e "$WT/$d" ]; then cp -R "$MAIN/$d" "$WT/$d"; fi; done
  if [ ! -e "$WT/node_modules" ]; then (cd "$WT" && npm ci --no-audit --no-fund); fi
  mkdir -p "$RD"; if [ ! -f "$RD/base.txt" ]; then git -C "$WT" merge-base HEAD main > "$RD/base.txt"; fi
  guard
  if [ ! -f "$RD/for/manifest.json" ]; then
    say "Bygger og tar «før»-bilder (slik Axle er nå)"
    local cur; cur="$(git -C "$WT" rev-parse HEAD)"; local base; base="$(cat "$RD/base.txt")"
    if [ "$cur" != "$base" ]; then # kopien er allerede endret (hent): ta «før» fra utgangspunktet
      git -C "$WT" stash -u -q 2>/dev/null || true; git -C "$WT" checkout -q "$base"
      (cd "$WT" && python3 build.py >/dev/null); serve "$WT/release/www" "$P_NEW" tmp; shots for; stop_all
      git -C "$WT" checkout -q -; git -C "$WT" stash pop -q 2>/dev/null || true
    else
      (cd "$WT" && python3 build.py >/dev/null); serve "$WT/release/www" "$P_NEW" tmp; shots for; stop_all
    fi
  fi
}

case "$CMD" in
  start)
    [ -f "$MAIN/docs/REDESIGN_PROMPT.md" ] || die "Hent nyeste først: git pull origin main"
    NAME="${NAME:-$(date +%Y-%m-%d)}"
    if [ -d "$WT" ]; then say "Kopien finnes allerede ($WT, gren $(branch)). Bruker den."
    else
      say "Lager kopien på grenen redesign/$NAME fra din lokale main"
      if [ -n "$(git -C "$MAIN" status --porcelain)" ]; then echo "  NB: endringer som ikke er committet i hovedmappa blir ikke med i kopien."; fi
      if git -C "$MAIN" show-ref --quiet "refs/heads/redesign/$NAME"; then git -C "$MAIN" worktree add "$WT" "redesign/$NAME"
      else git -C "$MAIN" worktree add -b "redesign/$NAME" "$WT" main; fi
    fi
    prepare
    hand_over "Du er en erfaren produktdesigner og frontend-utvikler. Les filen docs/REDESIGN_PROMPT.md i denne mappa ($WT) nøye, og gjør hele oppdraget i den, fra start til slutt, uten å vente på meg mellom stegene. Du jobber på git-grenen $(branch). Ikke push. «Før»-bildene ligger i local/redesign/for/."
    ;;
  fortsett)
    [ -d "$WT" ] || die "Ingen kopi ennå. Start med: tools/redesign.sh start"
    hand_over "Fortsett redesign-oppdraget i docs/REDESIGN_PROMPT.md der du slapp. Se «Status» nederst i REDESIGN.md og git log for hva som er gjort. Ikke push."
    ;;
  hent)
    [ -n "$NAME" ] || die "Skriv hvilken gren, f.eks.: tools/redesign.sh hent redesign/2026-10-17"
    [ -d "$WT" ] && die "Det finnes allerede en kopi ($WT). Slett den først: tools/redesign.sh slett"
    git -C "$MAIN" fetch origin "$NAME"
    git -C "$MAIN" worktree add -B "$NAME" "$WT" "origin/$NAME"
    prepare; say "Hentet $NAME. Se den med: tools/redesign.sh vis"
    ;;
  vis)
    [ -d "$WT" ] || die "Ingen kopi ennå. Start med: tools/redesign.sh start"
    say "Bygger dagens Axle (hovedmappa) og kopien"
    (cd "$MAIN" && python3 build.py >/dev/null); (cd "$WT" && python3 build.py >/dev/null)
    serve "$MAIN/release/www" "$P_NOW" dagens; serve "$WT/release/www" "$P_NEW" kopi
    say "Tar «etter»-bilder og lager før/etter-siden"
    shots etter
    H="$(ip)"
    (cd "$WT" && node tools/redesign_report.js --for "$RD/for" --etter "$RD/etter" --ut "$WT/release/www/_redesign" --dagens "http://$H:$P_NOW/" --kopi "http://$H:$P_NEW/")
    say "Klart"
    echo "  Før og etter:   http://localhost:$P_NEW/_redesign/"
    echo "  Kopien:         http://localhost:$P_NEW/"
    echo "  Dagens Axle:    http://localhost:$P_NOW/"
    echo "  På mobilen (samme wifi): http://$H:$P_NEW/  og  http://$H:$P_NOW/"
    echo "  Stopp serverne: tools/redesign.sh stopp"
    if command -v open >/dev/null; then open "http://localhost:$P_NEW/_redesign/"; fi
    ;;
  stopp) stop_all; say "Serverne er stoppet" ;;
  status)
    [ -d "$WT" ] || die "Ingen kopi ennå."
    say "Kopien: $WT (gren $(branch))"
    BASE="$(cat "$RD/base.txt" 2>/dev/null || git -C "$WT" merge-base HEAD main)"
    git -C "$WT" log --reverse --format='  %h %s' "$BASE..HEAD" || true
    if [ -f "$WT/REDESIGN.md" ]; then echo; sed -n '/^## Status/,$p' "$WT/REDESIGN.md"; fi
    ;;
  slett)
    [ -d "$WT" ] || die "Ingen kopi å slette."
    B="$(branch)"; printf "Slette kopien %s og grenen %s for godt? Skriv ja: " "$WT" "$B"; read -r svar
    [ "$svar" = "ja" ] || die "Avbrutt."
    stop_all; git -C "$MAIN" worktree remove --force "$WT"; git -C "$MAIN" branch -D "$B"; say "Slettet"
    ;;
  *) sed -n '3,19p' "$0" | sed 's/^# \{0,1\}//' ;;
esac
