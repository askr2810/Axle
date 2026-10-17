# Redesign i en kopi – slik bruker du det

En kode-AI (hvilken som helst) gjør om designet til Axle i en egen kopi. Du ser kopien side om side med dagens Axle og velger hva som skal flyttes over. Ingenting publiseres, og axle.no blir ikke rørt.

Oppdraget AI-en får, står i `docs/REDESIGN_PROMPT.md`. Det bygger på designreglene i `docs/DESIGN.md`.

## 1. Start

I Axle-mappa i terminalen (hent nyeste først med `git pull origin main`):

```
tools/redesign.sh start
```

Skriptet gjør dette:
* lager kopien `../Axle-redesign` på grenen `redesign/<dato>`
* tar «før»-bilder av 12 skjermer på mobil og PC, i lyst og mørkt tema
* sperrer kopien mot push
* legger oppdraget på utklippstavla

Åpne så AI-en din i mappa `Axle-redesign`, lim inn (Cmd+V) og send. Gi den lov til å kjøre kommandoer i den mappa.

Har AI-en et terminalprogram, kan skriptet starte det for deg: `AI_CMD="navn-på-programmet" tools/redesign.sh start`.

Stopper AI-en underveis (for eksempel på grunn av bruksgrense): `tools/redesign.sh fortsett` legger en «fortsett der du slapp»-melding på utklippstavla.

Jobber AI-en i skyen og lager en git-gren i stedet: `tools/redesign.sh hent redesign/<dato>`.

## 2. Se resultatet

```
tools/redesign.sh vis
```

Skriptet bygger dagens Axle og kopien og starter begge. Så åpnes en side med før og etter for hver skjerm, med endringslista under. Skriptet skriver også ut adressene du kan åpne på mobilen når den er på samme wifi.

Hver endring har et nummer (R01, R02 …) og egne commits. `tools/redesign.sh status` viser lista. `tools/redesign.sh stopp` stopper serverne.

## 3. Flytt det du liker til Axle

I Axle-mappa (ikke i kopien), si til AI-en for eksempel:

> Ta med R02, R05 og R07 fra grenen redesign/2026-10-17 inn i main. Bruk commitene med disse numrene (git log redesign/2026-10-17), tilpass dem til det som har endret seg på main siden, kjør npm test og se på skjermbildene. Fra R05 vil jeg bare ha fanene, ikke fargene.

Grenen ligger i samme repo, så AI-en i hovedmappa kan lese den direkte.

## 4. Rydd opp

```
tools/redesign.sh slett
```

Kommandoen fjerner kopien og grenen, men spør deg først.

Vil du prøve en ny runde, kjører du `start` igjen. Du kan gi runden et eget navn, for eksempel `tools/redesign.sh start runde2`.
