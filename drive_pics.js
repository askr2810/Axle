// ============================================================
//  ILLUSTRASJONER til emnesidene for førerkort (top_forer.js: pic: "navn").
//  DRIVE_PICS[navn](lang) → { svg, cap }. Brukes i appen (book.js) og på de åpne nettsidene (tools/seo.js).
//  Tegner med skiltene i drive_signs.js og kryssene i drive_scenes.js, så alt ser likt ut overalt.
//  Farger står i style="", ikke i klasser, så tegningene ser like ut uten appens CSS.
// ============================================================
const DP_TXT = "font-family:Figtree,system-ui,sans-serif";
const dpT = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" style="${DP_TXT};font-size:${o.size || 13}px;font-weight:${o.w || 700};fill:${o.col || "#1B1F24"}">${String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`;
const dpSign = (name, x, y, size) => `<g transform="translate(${x} ${y}) scale(${(size / 100).toFixed(3)})">${FK_SIGNS[name]()}</g>`;
const dpSpeed = (n, x, y, size) => `<g transform="translate(${x} ${y}) scale(${(size / 100).toFixed(3)})">${fkRound(`<text x="50" y="${n >= 100 ? 62 : 64}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="${n >= 100 ? 32 : 38}" style="fill:${FK_INK}">${n}</text>`)}</g>`;
const dpBadge = (x, y, n, col = "#1B1F24") => `<g transform="translate(${x} ${y})"><circle r="13" style="fill:${col};stroke:#fff;stroke-width:2.5"/>${dpT(0, 5, n, { size: 14, w: 800, col: "#fff" })}</g>`;
// Et kryss fra trafikksituasjonene, med tall som viser rekkefølgen.
function dpScene(id, x = 0, y = 0, size = 320){
  const sc = SCENES.find(s => s.id === id); if(!sc) return "";
  const built = sc.v.map(v => scBuild(sc, v)), order = sc.play || sc.ans || [];
  let g = scLayout(sc);
  for(const b of built) if(b.kind !== "ped" || b.path) g += `<polyline points="${b.pts.filter((_, i) => i % 2 === 0).map(p => p[0].toFixed(0) + "," + p[1].toFixed(0)).join(" ")}" style="fill:none;stroke:${b.id === "you" ? "#2B59C3" : SC_COL[b.col] || "#fff"};stroke-width:3.5;stroke-dasharray:6 6;opacity:.7;stroke-linecap:round"/>`;
  for(const b of built){ const p = scAt(b, b.s0); g += `<g transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.a.toFixed(1)})">${scVehicle(b, b.id === "you").replace(/var\(--accent\)/g, "#2B59C3")}</g>`; }
  order.forEach((id, k) => { const b = built.find(x => x.id === id); if(!b) return; const p = scAt(b, b.s0); g += dpBadge(p.x.toFixed(1), (p.y - 32).toFixed(1), k + 1); });
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 320 320">${g}</svg>`;
}
// En vegstrekning sett ovenfra, til avstander («kjørt i blinde», varseltrekant).
const dpRoad = (w, y0 = 40, h = 70) => `<rect x="0" y="${y0}" width="${w}" height="${h}" style="fill:#5E656D"/><line x1="0" y1="${y0 + h / 2}" x2="${w}" y2="${y0 + h / 2}" style="stroke:#F4F4F4;stroke-width:2;stroke-dasharray:14 12"/>`;
const dpCarSide = (x, y, col = "#2B59C3", o = 1) => `<g transform="translate(${x} ${y})" style="opacity:${o}"><rect x="-22" y="-11" width="44" height="22" rx="6" style="fill:${col};stroke:rgba(0,0,0,.3)"/><rect x="2" y="-8" width="12" height="16" rx="2" style="fill:rgba(220,240,255,.85)"/></g>`;
const dpSpan = (x1, x2, y, label, above) => `<path d="M${x1} ${y - 6}v12M${x2} ${y - 6}v12M${x1} ${y}H${x2}" style="stroke:#D23F3A;stroke-width:2.5;fill:none"/>${dpT((x1 + x2) / 2, above ? y - 10 : y + 22, label, { size: 15, w: 800, col: "#D23F3A" })}`;
// En liggende person (førstehjelp).
const dpPerson = (x, y, s = 1, side = false) => side
  ? `<g transform="translate(${x} ${y}) scale(${s})" style="fill:#F2C9A0;stroke:#9A6B44;stroke-width:1.5"><circle cx="-62" cy="-6" r="13"/><path d="M-48 -14 L14 -16 Q22 -6 14 4 L-48 6 Z" style="fill:#3B6FB6;stroke:#24497A"/><path d="M14 -14 L62 -26 L66 -18 L22 -4 Z" style="fill:#2E3A44;stroke:#1B2229"/><path d="M14 0 L40 18 L66 16 L64 24 L34 28 L12 6 Z" style="fill:#2E3A44;stroke:#1B2229"/><path d="M-40 4 L-30 30 L-6 30 L-6 24 L-24 22 L-30 4 Z" style="fill:#3B6FB6;stroke:#24497A"/></g>`
  : `<g transform="translate(${x} ${y}) scale(${s})" style="fill:#F2C9A0;stroke:#9A6B44;stroke-width:1.5"><circle cx="-70" cy="0" r="13"/><rect x="-56" y="-14" width="62" height="28" rx="8" style="fill:#3B6FB6;stroke:#24497A"/><rect x="6" y="-12" width="66" height="11" rx="5" style="fill:#2E3A44;stroke:#1B2229"/><rect x="6" y="1" width="66" height="11" rx="5" style="fill:#2E3A44;stroke:#1B2229"/></g>`;
// Politibetjent som gir tegn.
const dpPolice = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-13" y="-14" width="26" height="34" rx="6" style="fill:#1F2F4D"/><rect x="-13" y="2" width="26" height="5" style="fill:#F7C600"/><circle cx="0" cy="-24" r="9" style="fill:#F2C9A0"/><path d="M-11 -30h22l-2-7h-18z" style="fill:#1F2F4D"/><path d="M12 -8l14-16" style="stroke:#1F2F4D;stroke-width:7;stroke-linecap:round"/><path d="M-12 -8l-14 -16" style="stroke:#1F2F4D;stroke-width:7;stroke-linecap:round"/><rect x="-9" y="20" width="7" height="16" style="fill:#1F2F4D"/><rect x="2" y="20" width="7" height="16" style="fill:#1F2F4D"/></g>`;

const DRIVE_PICS = {
  hoyreregelen: L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 320 320">${dpScene("hoyre3")}</svg>`,
      cap: T2("Tallene viser rekkefølgen. Rød kommer fra høyre for deg og kjører først. Gul har deg på sin høyre side og kjører sist.", "The numbers show the order. Red comes from your right and goes first. Yellow has you on its right and goes last.") }; },
  "hvem-bestemmer": L => { const T2 = (a, b) => L === "en" ? b : a;
    const items = [[dpPolice(0, 6), T2("Politi", "Police")], [dpSign("lys_gronn", -26, -32, 54), T2("Lys", "Lights")], [dpSign("vikeplikt", -26, -30, 52), T2("Skilt", "Signs")], [dpSign("haitenner", -26, -30, 52), T2("Oppmerking", "Markings")], [dpSign("fare_generell", -26, -30, 52), T2("Regler", "Rules")]];
    return { svg: `<svg viewBox="0 0 360 120">${items.map(([g, l], i) => `<g transform="translate(${36 + i * 72} 48)">${g}</g>${dpT(36 + i * 72, 108, l, { size: 12 })}${i < 4 ? dpT(72 + i * 72, 54, "›", { size: 28, w: 800, col: "#2B59C3" }) : ""}`).join("")}</svg>`,
      cap: T2("Det som står til venstre, går foran det som står til høyre. Politiets tegn overstyrer alt.", "What is on the left overrides what is on the right. Police signals override everything.") }; },
  "venstresving-gaaende": L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 650 320">${dpScene("venstre3", 0, 0)}${dpScene("gaaende1", 330, 0)}</svg>`,
      cap: T2("Til venstre: du svinger til venstre og venter på møtende, også når de svinger til høyre. Til høyre: du svinger og venter på den som går over vegen du svinger inn på.", "Left: you turn left and wait for oncoming traffic, even when it turns right. Right: you turn and wait for the pedestrian crossing the road you turn into.") }; },
  skiltgrupper: L => { const T2 = (a, b) => L === "en" ? b : a;
    const rows = [[T2("Fare", "Warning"), ["fare_generell", "elg", "barn"]], [T2("Forbud", "Prohibition"), ["innkjoring_forbudt", "fart60", "parkering_forbudt"]], [T2("Påbud", "Mandatory"), ["pabud_hoyre", "rundkjoring"]], [T2("Opplysning", "Information"), ["gangfelt", "parkering", "blindveg"]], [T2("Vikeplikt", "Priority"), ["vikeplikt", "stopp", "forkjorsvei"]]];
    return { svg: `<svg viewBox="0 0 340 ${rows.length * 74 + 6}">${rows.map(([lab, signs], r) => `<rect x="2" y="${r * 74 + 4}" width="336" height="68" rx="12" style="fill:${r % 2 ? "#F3F5F7" : "#FFFFFF"};stroke:#D5DDD3"/>${dpT(16, r * 74 + 44, lab, { a: "start", size: 15, w: 800 })}${signs.map((s, i) => dpSign(s, 128 + i * 70, r * 74 + 10, 56)).join("")}`).join("")}</svg>`,
      cap: T2("Formen og fargen forteller hvilken gruppe skiltet hører til: trekant med rød kant er fare, rundt med rød kant er forbud, rundt og blått er påbud, blå firkant er opplysning.", "Shape and colour tell you the group: a red-bordered triangle warns, a red-bordered circle prohibits, a blue circle orders, a blue square informs.") }; },
  linjer: L => { const T2 = (a, b) => L === "en" ? b : a;
    const it = [["sperrelinje", T2("Sperrelinje", "Solid line"), T2("Ikke kryss", "Do not cross")], ["varsellinje", T2("Varsellinje", "Warning line"), T2("Sperrelinje snart", "Solid line ahead")], ["ledelinje", T2("Ledelinje", "Guide line"), T2("Kan krysses", "May cross")], ["haitenner", T2("Haitenner", "Shark teeth"), T2("Vikeplikt", "Give way")]];
    return { svg: `<svg viewBox="0 0 360 150">${it.map(([s, a, b], i) => `${dpSign(s, 10 + i * 88, 8, 80)}${dpT(50 + i * 88, 112, a, { size: 12.5 })}${dpT(50 + i * 88, 130, b, { size: 11, w: 600, col: "#5A6772" })}`).join("")}</svg>`,
      cap: T2("Gule linjer skiller kjøreretningene. Hvite linjer skiller felt i samme retning.", "Yellow lines separate directions. White lines separate lanes in the same direction.") }; },
  trafikklys: L => { const T2 = (a, b) => L === "en" ? b : a;
    const it = [["lys_rod", T2("Stans", "Stop")], ["lys_rodgult", T2("Vent", "Wait")], ["lys_gronn", T2("Kjør", "Go")], ["lys_gult", T2("Stans", "Stop")], ["lys_blink", T2("Aktsom", "Caution")], ["lys_pil", T2("Følg pil", "Arrow")]];
    return { svg: `<svg viewBox="0 0 360 130">${it.map(([s, a], i) => `${dpSign(s, 2 + i * 60, 6, 56)}${dpT(30 + i * 60, 82, a, { size: 11.5 })}`).join("")}${dpT(180, 116, T2("rødt → rødt og gult → grønt → gult → rødt", "red → red and amber → green → amber → red"), { size: 12, w: 600, col: "#5A6772" })}</svg>`,
      cap: T2("Rødt og gult samtidig betyr at det snart blir grønt, men du skal fortsatt vente.", "Red and amber together means green is coming, but you must still wait.") }; },
  stopplengde: L => { const T2 = (a, b) => L === "en" ? b : a;
    const sp = [30, 50, 80, 100], X = m => 70 + m * 2.6;
    const rows = sp.map((v, i) => { const r = v / 3.6, b = r * r / 14, y = 26 + i * 40;
      return `${dpT(60, y + 15, v + " km/t".replace("t", T2("t", "h")), { a: "end", size: 12 })}<rect x="${X(0)}" y="${y}" width="${(r * 2.6).toFixed(1)}" height="22" rx="3" style="fill:#2B6FD6"/><rect x="${X(r).toFixed(1)}" y="${y}" width="${(b * 2.6).toFixed(1)}" height="22" rx="3" style="fill:#D1453B"/>${dpT((X(r + b) + 6).toFixed(1), y + 15, Math.round(r + b) + " m", { a: "start", size: 12, w: 800 })}`; }).join("");
    return { svg: `<svg viewBox="0 0 360 200">${rows}<rect x="70" y="186" width="14" height="10" rx="2" style="fill:#2B6FD6"/>${dpT(90, 195, T2("reaksjon (1 s)", "reaction (1 s)"), { a: "start", size: 11 })}<rect x="200" y="186" width="14" height="10" rx="2" style="fill:#D1453B"/>${dpT(220, 195, T2("bremsing", "braking"), { a: "start", size: 11 })}</svg>`,
      cap: T2("Blå del er strekningen du kjører før du reagerer, rød del er bremselengden. Den røde delen vokser raskest når farten øker.", "Blue is the distance before you react, red is the braking distance. The red part grows fastest as speed increases.") }; },
  "avstand-tresekunder": L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 360 160">${dpRoad(360, 46, 70)}${dpSpan(106, 278, 30, T2("3 sekunder", "3 seconds"), true)}<rect x="96" y="116" width="4" height="26" style="fill:#5A6772"/><circle cx="98" cy="120" r="9" style="fill:#F7C600;stroke:#1B1F24"/>${dpCarSide(300, 98, "#D1453B")}${dpCarSide(84, 98)}${dpT(98, 156, T2("fast punkt", "fixed point"), { size: 11, w: 600, col: "#5A6772" })}<path d="M106 30V108M278 30V108" style="stroke:#D23F3A;stroke-width:1.5;stroke-dasharray:4 4"/></svg>`,
      cap: T2("Når bilen foran passerer et fast punkt, teller du «en, to, tre». Er du ved punktet før du er ferdig, ligger du for tett.", "When the car ahead passes a fixed point, count \u201cone, two, three\u201d. If you reach the point first, you are too close.") }; },
  fartsgrenser: L => { const T2 = (a, b) => L === "en" ? b : a;
    const it = [[30, T2("skole og|boliger", "schools,|homes")], [50, T2("tettbygd|strøk", "built-up|area")], [60, ""], [80, T2("utenfor|tettbygd", "outside|built-up")], [100, T2("motor-|veg", "motor-|way")], [110, T2("enkelte|motorveger", "some|motorways")]];
    return { svg: `<svg viewBox="0 0 372 120">${it.map(([n, l], i) => `${dpSpeed(n, 6 + i * 61, 6, 52)}${l ? l.split("|").map((p, k) => dpT(32 + i * 61, 78 + k * 14, p, { size: 11, w: 600 })).join("") : ""}`).join("")}</svg>`,
      cap: T2("50 og 80 km/t er de generelle grensene når det ikke står skilt. Med tilhenger uten bremser er grensen 60, med bremser 80.", "50 and 80 km/h are the general limits without signs. With an unbraked trailer the limit is 60, braked 80.") }; },
  promille: L => { const T2 = (a, b) => L === "en" ? b : a;
    const X = h => 40 + h * 36, Y = p => 150 - p * 100;
    let g = `<line x1="40" y1="150" x2="340" y2="150" style="stroke:#5A6772"/><line x1="40" y1="20" x2="40" y2="150" style="stroke:#5A6772"/>`;
    for(let h = 0; h <= 8; h += 2) g += dpT(X(h), 166, h + " t".replace("t", T2("t", "h")), { size: 11, w: 600, col: "#5A6772" });
    for(const p of [0.4, 0.8, 1.2]) g += dpT(34, Y(p) + 4, String(p).replace(".", L === "en" ? "." : ","), { a: "end", size: 11, w: 600, col: "#5A6772" });
    g += `<line x1="40" y1="${Y(0.2)}" x2="340" y2="${Y(0.2)}" style="stroke:#D23F3A;stroke-width:2;stroke-dasharray:6 5"/>${dpT(338, Y(0.2) - 6, T2("grensen 0,2", "limit 0.2"), { a: "end", size: 11.5, col: "#D23F3A" })}`;
    g += `<line x1="${X(0)}" y1="${Y(1.2)}" x2="${X(8)}" y2="${Y(0)}" style="stroke:#2B59C3;stroke-width:4;stroke-linecap:round"/><circle cx="${X(0)}" cy="${Y(1.2)}" r="5" style="fill:#2B59C3"/>`;
    g += `<rect x="${X(6.67)}" y="20" width="${X(8) - X(6.67)}" height="130" style="fill:#1E9A5E;opacity:.12"/>${dpT(X(7.3), 36, T2("under", "below"), { size: 11, col: "#157045" })}`;
    return { svg: `<svg viewBox="0 0 350 175">${g}</svg>`,
      cap: T2("Fra 1,2 promille ved midnatt synker promillen med 0,15 i timen. Du er under grensen først etter nesten 7 timer, og helt edru etter 8.", "From 1.2 per mille at midnight the level falls by 0.15 per hour. You are below the limit only after almost 7 hours, and sober after 8.") }; },
  trotthet: L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 360 130">${dpRoad(360, 20, 64)}${dpCarSide(40, 68)}${dpCarSide(320, 68, "#2B59C3", 0.45)}${dpT(40, 40, "😴", { size: 20 })}${dpSpan(62, 298, 108, T2("75 m uten kontroll", "75 m without control"))}</svg>`,
      cap: T2("Sovner du i 3 sekunder i 90 km/t, kjører bilen 75 meter uten at noen styrer.", "Fall asleep for 3 seconds at 90 km/h and the car travels 75 metres with nobody steering.") }; },
  "mobil-blind": L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 360 130">${dpRoad(360, 20, 64)}${dpCarSide(40, 68)}${dpCarSide(240, 68, "#2B59C3", 0.45)}${dpT(40, 40, "📱", { size: 20 })}${dpWalkerSafe(300, 66)}${dpSpan(62, 218, 108, T2("44 m i blinde", "44 m blind"))}</svg>`,
      cap: T2("To sekunder på mobilen i 80 km/t er 44 meter der du ikke ser hva som skjer foran deg.", "Two seconds on your phone at 80 km/h is 44 metres where you cannot see what happens ahead.") }; },
  "sikre-ulykke": L => { const T2 = (a, b) => L === "en" ? b : a;
    const tri = `<g transform="translate(36 22) scale(.34)">${FK_SIGNS.varseltrekant ? FK_SIGNS.varseltrekant() : fkTri("")}</g>`;
    return { svg: `<svg viewBox="0 0 360 196">${dpRoad(360, 16, 64)}${tri}<g transform="translate(292 48) rotate(18)">${dpCarSide(0, 0, "#D1453B")}</g><circle cx="274" cy="36" r="4" style="fill:#FFB400"/><circle cx="310" cy="62" r="4" style="fill:#FFB400"/>${fkWalker(336, 112, 1.2, "#E07A1F")}${dpSpan(54, 262, 96, T2("150–250 m", "150–250 m"))}${[["110", T2("brann", "fire")], ["112", T2("politi", "police")], ["113", T2("ambulanse", "ambulance")]].map(([n, l], i) => `${dpT(60 + i * 120, 150, l, { size: 11.5, w: 600, col: "#5A6772" })}<rect x="${28 + i * 120}" y="158" width="64" height="30" rx="9" style="fill:#D23F3A"/>${dpT(60 + i * 120, 179, n, { size: 16, w: 800, col: "#fff" })}`).join("")}</svg>`,
      cap: T2("Nødblinklys og refleksvest på, varseltrekanten godt bak bilen, og ring riktig nødnummer.", "Hazard lights and vest on, the warning triangle well behind the car, and call the right emergency number.") }; },
  hlr: L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 360 160">${dpPerson(150, 110, 1.2)}<g transform="translate(112 84)"><path d="M-10 -40 L0 -6 L10 -40" style="fill:none;stroke:#F2C9A0;stroke-width:10;stroke-linecap:round"/><rect x="-14" y="-10" width="28" height="12" rx="6" style="fill:#F2C9A0;stroke:#9A6B44"/></g><path d="M78 30v44M70 38l8-8 8 8M70 66l8 8 8-8" style="stroke:#D23F3A;stroke-width:3;fill:none;stroke-linecap:round"/>${dpT(290, 60, "30 : 2", { size: 30, w: 800, col: "#D23F3A" })}${dpT(290, 84, T2("trykk : blås", "push : breathe"), { size: 12, w: 600, col: "#5A6772" })}${dpT(290, 112, "100–120 / min", { size: 15, w: 800 })}${dpT(290, 130, "5–6 cm", { size: 13, w: 700, col: "#5A6772" })}</svg>`,
      cap: T2("Hendene midt på brystet, strake armer, trykk 5–6 cm ned i takt 100–120 i minuttet. 30 trykk, 2 innblåsninger.", "Hands in the middle of the chest, straight arms, push 5–6 cm down at 100–120 per minute. 30 pushes, 2 breaths.") }; },
  "bevisstlos-blodning": L => { const T2 = (a, b) => L === "en" ? b : a;
    return { svg: `<svg viewBox="0 0 360 150"><rect x="2" y="2" width="200" height="146" rx="12" style="fill:#F3F5F7;stroke:#D5DDD3"/>${dpPerson(108, 78, 1, true)}${dpT(102, 136, T2("Stabilt sideleie", "Recovery position"), { size: 13 })}<rect x="210" y="2" width="148" height="146" rx="12" style="fill:#F3F5F7;stroke:#D5DDD3"/><rect x="236" y="70" width="96" height="30" rx="12" style="fill:#F2C9A0;stroke:#9A6B44"/><rect x="268" y="72" width="30" height="26" rx="4" style="fill:#fff;stroke:#C9CCC4"/><circle cx="283" cy="85" r="6" style="fill:#D23F3A"/><path d="M283 26v34M273 50l10 10 10-10" style="stroke:#1B1F24;stroke-width:4;fill:none;stroke-linecap:round"/>${dpT(284, 136, T2("Trykk på såret", "Press on the wound"), { size: 13 })}</svg>`,
      cap: T2("Puster personen normalt, legg henne i stabilt sideleie. Store blødninger stanser du med direkte trykk.", "If they breathe normally, use the recovery position. Stop heavy bleeding with direct pressure.") }; },
};
function dpWalkerSafe(x, y){ return typeof fkWalker === "function" ? fkWalker(x, y, 1.3, "#8A5BD0") : ""; }
// Liten figur til flisene i oversikten: et skilt eller lys som passer emnet.
const DRIVE_TILE = { hoyreregelen: "fare_generell", "hvem-bestemmer": "lys_gronn", "venstresving-gaaende": "gangfelt", skiltgrupper: "vikeplikt", linjer: "sperrelinje", trafikklys: "lys_rodgult",
  stopplengde: "fart50", "avstand-tresekunder": "tresek", fartsgrenser: "fart60", promille: "🍺", trotthet: "😴", "mobil-blind": "mobil", "sikre-ulykke": "varseltrekant", hlr: "❤️", "bevisstlos-blodning": "🩹" };
