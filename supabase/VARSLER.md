# Påminnelser i nettleseren (web push)

Axle sender daglige påminnelser i stil med Duolingo:

- **På valgt klokkeslett** (standard 19:00): hvis du ikke har øvd i dag («Rekka på 5 dager står på spill …»),
  eller har øvd men ikke tatt dagens utfordring.
- **«Siste sjanse» kl. 22:00**: hvis du har en rekke og fortsatt ikke har øvd.
- Maks én av hver per dag. Ingen varsler når dagens utfordring er tatt.

## Oppsett (én gang)

1. **Edge Function:** Supabase → *Edge Functions* → *Deploy a new function* → *Via Editor*.
   Navn: `varsler`. Lim inn hele `supabase/functions/varsler/index.ts` og trykk *Deploy function*.
2. **Slå av JWT-sjekk:** Åpne funksjonen `varsler` → *Details* (eller *Settings*) → slå **av**
   «Enforce JWT verification» (Verify JWT) → *Save*. Cron-jobben kaller funksjonen uten innlogging.
   Funksjonen sender bare når det er tid for det og maks to ganger per dag, så dette er trygt.
3. **Nøkler:** *Edge Functions* → *Secrets* → legg til to:
   - `VAPID_PUBLIC_KEY` = verdien `vapidPublicKey` i `config.js`
   - `VAPID_PRIVATE_KEY` = den private nøkkelen (fikk du i chatten; legg den aldri i koden)
4. **SQL:** *SQL Editor* → *New query* → lim inn hele `supabase/varsler.sql` → *Run*.
   Den lager tabellen og en cron-jobb som kaller funksjonen hvert kvarter.

Test: Innstillinger → slå på «Daglig påminnelse» → «Send et testvarsel».

På iPhone virker varsler bare når Axle er lagt til på hjemskjermen (Del → «Legg til på Hjem-skjerm»).
