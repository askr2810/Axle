// ============================================================
//  FLERE SKILT til førerkort og skiltspillet (lastes etter drive_signs.js).
//  Fartsgrenser, svinger, kryss, påbudspiler, motorveg m.m. – sporet fra Statens vegvesens skilttegninger (FK_TRACE.sign).
//  Hvert skilt: FK_SIGNS[navn] = () => svg (100 × 100) og en linje i FK_SIGN_INFO [navn, gruppe, nb, en, forklaring nb, en].
// ============================================================
(() => {
// Skiltene sporet fra de offisielle tegningene (FK_TRACE.sign, se tools/trace_signs.py) erstatter de gamle, håndtegnede.
for(const n of Object.keys(FK_TRACE.sign)) FK_SIGNS[n] = () => fkOfficial(n);
FK_SIGN_INFO.push(
  ["sving_hoyre", "fare", "Farlig sving til høyre", "Dangerous bend to the right", "Skarp sving til høyre. Senk farten før svingen.", "Sharp bend to the right. Slow down before the bend."],
  ["sving_venstre", "fare", "Farlig sving til venstre", "Dangerous bend to the left", "Skarp sving til venstre. Senk farten før svingen.", "Sharp bend to the left. Slow down before the bend."],
  ["farlige_svinger", "fare", "Farlige svinger", "Dangerous bends", "Flere farlige svinger etter hverandre, den første til høyre.", "Several dangerous bends, the first to the right."],
  ["smalere_veg", "fare", "Smalere veg", "Road narrows", "Vegen blir smalere. Vær klar til å slippe frem møtende.", "The road narrows. Be ready to let oncoming traffic through."],
  ["ujevn_veg", "fare", "Ujevn veg", "Uneven road", "Ujevnheter eller humper i vegen. Senk farten.", "Bumps or uneven surface ahead. Slow down."],
  ["trafikklys_fare", "fare", "Trafikklys", "Traffic lights", "Varsler om lyskryss du kanskje ikke ser i tide.", "Warns of traffic lights you may not see in time."],
  ["motende_trafikk", "fare", "Møtende trafikk", "Two-way traffic", "Trafikk i begge retninger, ofte etter en strekning med envegskjøring.", "Traffic in both directions, often after a one-way section."],
  ["vegkryss", "fare", "Vegkryss", "Crossroads", "Kryss der høyreregelen gjelder: vik for trafikk fra høyre.", "Junction where the right-hand rule applies: give way to traffic from the right."],
  ["forkjorskryss", "fare", "Forkjørskryss", "Junction with priority", "Kryss der du har forkjørsrett. Trafikk fra sidevegene har vikeplikt.", "Junction where you have priority. Traffic from side roads must give way."],
  ["rundkjoring_fare", "fare", "Rundkjøring", "Roundabout ahead", "Varsler om rundkjøring. Vik for trafikk som allerede er i rundkjøringen.", "Warns of a roundabout. Give way to traffic already in it."],
  ["fart30", "forbud", "Fartsgrense 30", "Speed limit 30", "Høyeste tillatte fart er 30 km/t, ofte ved skoler og boligområder.", "The maximum speed is 30 km/h, often near schools and homes."],
  ["fart40", "forbud", "Fartsgrense 40", "Speed limit 40", "Høyeste tillatte fart er 40 km/t.", "The maximum speed is 40 km/h."],
  ["fart70", "forbud", "Fartsgrense 70", "Speed limit 70", "Høyeste tillatte fart er 70 km/t.", "The maximum speed is 70 km/h."],
  ["fart80", "forbud", "Fartsgrense 80", "Speed limit 80", "Høyeste tillatte fart er 80 km/t.", "The maximum speed is 80 km/h."],
  ["fart90", "forbud", "Fartsgrense 90", "Speed limit 90", "Høyeste tillatte fart er 90 km/t.", "The maximum speed is 90 km/h."],
  ["fart100", "forbud", "Fartsgrense 100", "Speed limit 100", "Høyeste tillatte fart er 100 km/t, typisk på motorveg.", "The maximum speed is 100 km/h, typically on motorways."],
  ["fart110", "forbud", "Fartsgrense 110", "Speed limit 110", "Høyeste fartsgrense i Norge, på enkelte motorveger.", "The highest speed limit in Norway, on some motorways."],
  ["forbudt_kjoretoy", "forbud", "Forbudt for alle kjøretøy", "No vehicles", "Ingen kjøretøy får kjøre her, i noen av retningene.", "No vehicles may drive here, in either direction."],
  ["svinge_hoyre_forbudt", "forbud", "Forbudt å svinge til høyre", "No right turn", "Du får ikke svinge til høyre i krysset.", "You may not turn right at the junction."],
  ["svinge_venstre_forbudt", "forbud", "Forbudt å svinge til venstre", "No left turn", "Du får ikke svinge til venstre i krysset.", "You may not turn left at the junction."],
  ["vending_forbudt", "forbud", "Forbudt å vende", "No U-turn", "Du får ikke snu og kjøre tilbake samme veg.", "You may not turn round and drive back."],
  ["slutt_fart60", "forbud", "Slutt på fartsgrense 60", "End of speed limit 60", "Den særskilte fartsgrensen gjelder ikke lenger. Da gjelder den generelle (50 eller 80 km/t).", "The special limit no longer applies. The general limit (50 or 80 km/h) applies."],
  ["pabud_venstre", "pabud", "Påbudt kjøreretning til venstre", "Turn left", "Du skal svinge til venstre.", "You must turn left."],
  ["pabud_rett", "pabud", "Påbudt kjøreretning rett fram", "Straight ahead only", "Du skal kjøre rett fram.", "You must drive straight ahead."],
  ["pabud_kjorefelt", "pabud", "Påbudt kjørefelt", "Keep right", "Du skal passere på den siden pilen viser, for eksempel forbi en trafikkøy.", "You must pass on the side the arrow shows, for example past a traffic island."],
  ["envegskjoring", "oppl", "Envegskjøring", "One-way street", "All trafikk går i pilens retning.", "All traffic goes in the direction of the arrow."],
  ["motorveg", "oppl", "Motorveg", "Motorway", "Egne regler: blant annet forbudt å stanse, rygge og snu, og forbudt for gående og syklende.", "Special rules: among others no stopping, reversing or turning, and no pedestrians or cyclists."],
  ["motorveg_slutt", "oppl", "Slutt på motorveg", "End of motorway", "Motorvegens regler gjelder ikke lenger.", "Motorway rules no longer apply."],
  ["tunnel", "fare", "Tunnel", "Tunnel", "Fareskilt: tunnel framover. Bruk nærlys, og hold god avstand.", "Warning sign: tunnel ahead. Use dipped headlights and keep a good distance."],
  ["moteplass", "oppl", "Møteplass", "Passing place", "Utvidelse på smal veg der kjøretøy kan møte hverandre. Den skal ikke brukes til parkering.", "A widening on a narrow road where vehicles can pass each other. Not for parking."],
);
})();
