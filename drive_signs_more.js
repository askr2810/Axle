// ============================================================
//  FLERE SKILT til førerkort og skiltspillet (lastes etter drive_signs.js).
//  Geometriske skilt tegnet etter skiltforskriften: fartsgrenser, svinger, kryss, påbudspiler, motorveg m.m.
//  Hvert skilt: FK_SIGNS[navn] = () => svg (100 × 100) og en linje i FK_SIGN_INFO [navn, gruppe, nb, en, forklaring nb, en].
// ============================================================
(() => {
const K = FK_INK, f = v => (+v).toFixed(2);
// Pilspiss: B = midt på bakkanten, d = retning, len = lengde, half = halv bredde.
const fkHead = (B, d, len, half, col = K) => { const l = Math.hypot(d[0], d[1]), u = [d[0] / l, d[1] / l], n = [-u[1], u[0]];
  return `<path d="M${f(B[0] + n[0] * half)} ${f(B[1] + n[1] * half)}L${f(B[0] + u[0] * len)} ${f(B[1] + u[1] * len)}L${f(B[0] - n[0] * half)} ${f(B[1] - n[1] * half)}Z" fill="${col}"/>`; };
const line = (d, w, col = K, cap = "butt") => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round"/>`;
const mirror = s => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
const slash = `<path d="M23.5 23.5L76.5 76.5" stroke="${FK_RED}" stroke-width="7.5"/>`;
const speed = n => fkRound(`<text x="50" y="${n >= 100 ? 62.5 : 64}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="${n >= 100 ? 33 : 38}" letter-spacing="-1" style="fill:${K}">${n}</text>`);
// Kraftig pil opp (påbud/envegskjøring) med samme proporsjoner som den sporede påbudspilen.
const arrowUp = (col = "#fff", s = 1, cy = 50) => `<g transform="translate(50 ${cy}) scale(${s}) translate(-50 -50)"><rect x="44.7" y="40" width="10.6" height="38" fill="${col}"/><path d="M34.2 44.5L50 22L65.8 44.5Z" fill="${col}" stroke="${col}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
// Pil som svinger til høyre (fareskilt og forbudsskilt), skaft fra (x0, y0) opp til y1 og bøy mot høyre.
const turnRight = (x0, y0, y1, w, col = K, r = 10) => line(`M${x0} ${y0}V${y1}Q${x0} ${y1 - r} ${x0 + r} ${y1 - r}`, w, col) + fkHead([x0 + r - 0.5, y1 - r], [1, 0], w * 1.9, w * 1.3, col);
const rbArrows = (col, sw) => [0, 120, 240].map(r => `<g transform="rotate(${r} 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="${col}" stroke-width="${sw}"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="${col}"/></g>`).join("");
// Slutt på særskilt fartsgrense: tynne skrå streker fra øvre høyre til nedre venstre, klippet til sirkelen.
const endLines = (r = 40) => [-12, -6, 0, 6, 12].map(c => { const d = Math.abs(c) / Math.SQRT2, h = Math.sqrt(r * r - d * d) / Math.SQRT2, m = 50 + c / 2;
  return `<path d="M${f(m + h)} ${f(m - h)}L${f(m - h)} ${f(m + h)}" stroke="${K}" stroke-width="2.2"/>`; }).join("");

Object.assign(FK_SIGNS, {
  // ---------- fareskilt ----------
  sving_hoyre: () => fkTri(turnRight(43, 80, 58, 7, K, 12)),
  sving_venstre: () => fkTri(mirror(turnRight(43, 80, 58, 7, K, 12))),
  farlige_svinger: () => fkTri(line("M44 81V76C44 67 58 68 58 59C58 51 45 52 45 47", 6.6) + fkHead([45, 48], [0, -1], 11, 8)),
  smalere_veg: () => fkTri(line("M37 81V67L44 58V40M63 81V67L56 58V40", 4.6)),
  ujevn_veg: () => fkTri(`<path d="M24 77H76V72.5H69Q62.5 57 56 72.5H44Q37.5 57 31 72.5H24Z" fill="${K}"/>`),
  trafikklys_fare: () => fkTri(`<rect x="43.5" y="40" width="13" height="38" rx="3.5" fill="${K}"/><circle cx="50" cy="47.5" r="4.2" fill="${FK_RED}"/><circle cx="50" cy="59" r="4.2" fill="#F2B705"/><circle cx="50" cy="70.5" r="4.2" fill="#1E9A5E"/>`),
  motende_trafikk: () => fkTri(line("M42.5 42V67", 4.4) + fkHead([42.5, 66], [0, 1], 10, 5.6) + line("M57.5 80V55", 4.4) + fkHead([57.5, 56], [0, -1], 10, 5.6)),
  vegkryss: () => fkTri(`<rect x="46.6" y="39" width="6.8" height="41" fill="${K}"/><rect x="31" y="56.6" width="38" height="6.8" fill="${K}"/>`),
  forkjorskryss: () => fkTri(`<rect x="45.5" y="38" width="9" height="42" fill="${K}"/><rect x="29" y="58.4" width="42" height="3.2" fill="${K}"/>`),
  rundkjoring_fare: () => fkTri(`<g transform="translate(50 62) scale(.6) translate(-50 -50)">${rbArrows(K, 9)}</g>`),
  // ---------- forbudsskilt ----------
  fart30: () => speed(30), fart40: () => speed(40), fart70: () => speed(70), fart80: () => speed(80), fart90: () => speed(90), fart100: () => speed(100), fart110: () => speed(110),
  forbudt_kjoretoy: () => fkRound(""),
  svinge_hoyre_forbudt: () => fkRound(turnRight(42, 76, 54, 7.5, K, 11) + slash),
  svinge_venstre_forbudt: () => fkRound(mirror(turnRight(42, 76, 54, 7.5, K, 11)) + slash),
  vending_forbudt: () => fkRound(line("M57 76V47A7.5 7.5 0 0 0 42 47V54", 6.4) + fkHead([42, 53], [0, 1], 10, 8) + slash),
  slutt_fart60: () => `<circle cx="50" cy="50" r="44" fill="#fff" stroke="#5A6772" stroke-width="3"/><text x="50" y="64" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="38" letter-spacing="-1" style="fill:#8A949E">60</text>${endLines()}`,
  // ---------- påbudsskilt ----------
  pabud_venstre: () => fkBlueRound(mirror(`<path d="${FK_TRACE.pabudHoyre}" fill="#fff" fill-rule="evenodd"/>`)),
  pabud_rett: () => fkBlueRound(arrowUp("#fff", 1, 50)),
  pabud_kjorefelt: () => fkBlueRound(`<g transform="rotate(135 50 50)">${arrowUp("#fff", 0.95, 50)}</g>`),
  // ---------- opplysningsskilt ----------
  envegskjoring: () => fkBlueSq(arrowUp("#fff", 1.05, 52)),
  motorveg: () => fkBlueSq(`<rect x="20" y="30" width="60" height="8" fill="#fff"/><rect x="24" y="38" width="5" height="9" fill="#fff"/><rect x="71" y="38" width="5" height="9" fill="#fff"/><path d="M41.5 42H47L45 82H26ZM53 42H58.5L74 82H55Z" fill="#fff"/>`),
  motorveg_slutt: () => FK_SIGNS.motorveg() + `<path d="M20 82L80 22" stroke="${FK_RED}" stroke-width="6.5" stroke-linecap="round"/>`,
  tunnel: () => fkBlueSq(`<path d="M17 81V56Q50 14 83 56V81Z" fill="#fff"/><path d="M34 81V61Q50 37 66 61V81Z" fill="${K}"/>`),
  moteplass: () => fkBlueSq(`<text x="50" y="72" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="56" style="fill:#fff">M</text>`),
});
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
  ["tunnel", "oppl", "Tunnel", "Tunnel", "Tunnel framover. Bruk nærlys, og hold god avstand.", "Tunnel ahead. Use dipped headlights and keep a good distance."],
  ["moteplass", "oppl", "Møteplass", "Passing place", "Utvidelse på smal veg der kjøretøy kan møte hverandre. Den skal ikke brukes til parkering.", "A widening on a narrow road where vehicles can pass each other. Not for parking."],
);
})();
