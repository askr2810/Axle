// ============================================================
//  SKILT, LYS OG OPPMERKING til førerkort (tegnet som SVG, 100×100).
//  fkSign(navn, størrelse) brukes i spørsmålene (DRIVE_IMG), i skiltoversikten og i teorifigurene (FIGS «fk_…»).
// ============================================================
const FK_RED = "#D0211C", FK_BLUE = "#1F5FAD", FK_YEL = "#F7C600", FK_INK = "#1B1F24";
const fkTri = (inner, down) => `<path d="${down ? "M8 14h84L50 90z" : "M50 8l42 78H8z"}" fill="#fff" stroke="${FK_RED}" stroke-width="8" stroke-linejoin="round"/>${inner || ""}`;
const fkRound = (inner, fill = "#fff") => `<circle cx="50" cy="50" r="42" fill="${fill}" stroke="${FK_RED}" stroke-width="9"/>${inner || ""}`;
const fkBlueRound = inner => `<circle cx="50" cy="50" r="44" fill="${FK_BLUE}" stroke="#fff" stroke-width="3"/>${inner || ""}`;
const fkBlueSq = inner => `<rect x="8" y="8" width="84" height="84" rx="8" fill="${FK_BLUE}" stroke="#fff" stroke-width="3"/>${inner || ""}`;
const fkCar = (x, y, col, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-12" width="14" height="24" rx="4" fill="${col}"/><rect x="-5" y="-7" width="10" height="6" rx="1.5" fill="#fff" opacity=".7"/></g>`;
// Fotgjenger/barn som fylt silhuett med tykke, runde lemmer (som på ekte skilt). pose: "walk" eller "run".
const fkPed = (x, y, s = 1, col = FK_INK, pose = "walk") => { const L = (d, w) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const run = pose === "run";
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="${run ? 2 : 1}" cy="-26" r="5.2" fill="${col}"/>${L(run ? "M1-19L-2-6" : "M0.5-19L-0.5-6", 7.5)}${L(run ? "M0-16L-8-10L-12-14M0-16L7-11L11-5" : "M0-16L-6-8L-8-1M0-16L6-9L8-3", 4.2)}${L(run ? "M-2-6L-9 2L-15 1M-2-6L5 1L3 9" : "M-0.5-6L-5 4L-8 12M-0.5-6L4 3L6 12", 5)}</g>`; };
const fkWalker = (x, y, s = 1, col = FK_INK) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}" stroke="${col}" stroke-linecap="round"><circle cx="0" cy="-16" r="4.2" stroke="none"/><path d="M0-11l-2 12M-2 1l-6 12M-2 1l5 5 2 8M-1-8l-8 6M-1-8l7 4" fill="none" stroke-width="3.4"/></g>`;
const fkLight = on => { // on = { r, y, g, arrow, blink } → trafikklys
  const lamp = (cy, col, lit) => `<circle cx="50" cy="${cy}" r="11" fill="${lit ? col : "#3A3F47"}"${lit ? ` style="filter:drop-shadow(0 0 4px ${col})"` : ""}/>`;
  return `<rect x="31" y="6" width="38" height="88" rx="10" fill="${FK_INK}"/>${lamp(24, "#FF3B30", on.r)}${lamp(50, "#FFC400", on.y)}${on.arrow ? `<circle cx="50" cy="76" r="11" fill="#3A3F47"/><path d="M43 76h11M50 71l6 5-6 5" stroke="#34C759" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : lamp(76, "#34C759", on.g)}
    ${on.blink ? `<path d="M73 44l8-4M73 50h9M73 56l8 4M27 44l-8-4M27 50h-9M27 56l-8 4" stroke="#FFC400" stroke-width="2.6" stroke-linecap="round"/>` : ""}`;
};
const FK_SIGNS = {
  vikeplikt: () => fkTri("", true),
  stopp: () => `<path d="M31 6h38l25 25v38L69 94H31L6 69V31z" fill="${FK_RED}" stroke="#fff" stroke-width="3"/><text x="50" y="58.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="21" letter-spacing="-0.5" style="fill:#fff">STOPP</text>`,
  forkjorsvei: () => `<path d="M50 4l46 46-46 46L4 50z" fill="#fff" stroke="${FK_INK}" stroke-width="1.6"/><path d="M50 18l32 32-32 32-32-32z" fill="${FK_YEL}"/>`,
  slutt_forkjorsvei: () => `<path d="M50 4l46 46-46 46L4 50z" fill="#fff" stroke="${FK_INK}" stroke-width="1.6"/><path d="M50 18l32 32-32 32-32-32z" fill="${FK_YEL}"/><path d="M24 76L76 24" stroke="${FK_INK}" stroke-width="6"/><path d="M31 83L83 31M17 69L69 17" stroke="${FK_INK}" stroke-width="2.4"/>`,
  rundkjoring: () => fkBlueRound(`<g transform="rotate(0 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g><g transform="rotate(120 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g><g transform="rotate(240 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g>`),
  gangfelt: () => fkBlueSq(`<path d="M50 15l34 62H16z" fill="#fff"/><path d="M28 82h44" stroke="#fff" stroke-width="0"/>${fkPed(50, 66, 1.05, FK_INK, "walk")}`),
  haitenner: () => `<rect width="100" height="100" fill="#4A4F57"/><g fill="#fff">${[8, 30, 52, 74].map(x => `<path d="M${x} 40h18l-9 20z"/>`).join("")}</g><path d="M0 12h100M0 88h100" stroke="#fff" stroke-width="2.5" stroke-dasharray="10 8"/>`,
  fare_generell: () => fkTri(`<path d="M50 34v26" stroke="${FK_INK}" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="72" r="4.6" fill="${FK_INK}"/>`),
  pabud_hoyre: () => fkBlueRound(`<path d="M50 74V42q0-8 8-8h10" fill="none" stroke="#fff" stroke-width="9"/><path d="M66 22l16 12-16 12z" fill="#fff"/>`),
  innkjoring_forbudt: () => `<circle cx="50" cy="50" r="44" fill="${FK_RED}" stroke="#fff" stroke-width="3"/><rect x="18" y="41" width="64" height="18" fill="#fff"/>`,
  parkering_forbudt: () => fkRound(`<path d="M22 22l56 56" stroke="${FK_RED}" stroke-width="8"/>`, FK_BLUE),
  stans_forbudt: () => fkRound(`<path d="M22 22l56 56M78 22L22 78" stroke="${FK_RED}" stroke-width="8"/>`, FK_BLUE),
  forbikjoring_forbudt: () => fkRound(`${fkCar(37, 52, FK_RED, 1.3)}${fkCar(63, 52, FK_INK, 1.3)}`),
  fart60: () => fkRound(`<text x="50" y="63" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="38" style="fill:${FK_INK}">60</text>`),
  fart50: () => fkRound(`<text x="50" y="63" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="38" style="fill:${FK_INK}">50</text>`),
  blindveg: () => fkBlueSq(`<path d="M50 84V40" stroke="#fff" stroke-width="12"/><path d="M26 34h48" stroke="${FK_RED}" stroke-width="12"/>`),
  parkering: () => fkBlueSq(`<text x="50" y="74" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="62" style="fill:#fff">P</text>`),
  sperrelinje: () => `<rect width="100" height="100" fill="#4A4F57"/><path d="M50 0v100" stroke="#F2C230" stroke-width="5"/><path d="M8 0v100M92 0v100" stroke="#fff" stroke-width="2.5"/>${fkCar(30, 62, "#2B59C3", 1.2)}${fkCar(70, 30, "#E9A100", 1.2)}`,
  varsellinje: () => `<rect width="100" height="100" fill="#4A4F57"/><path d="M50 0v100" stroke="#F2C230" stroke-width="5" stroke-dasharray="26 7"/><path d="M8 0v100M92 0v100" stroke="#fff" stroke-width="2.5"/>`,
  ledelinje: () => `<rect width="100" height="100" fill="#4A4F57"/><path d="M50 0v100" stroke="#F2C230" stroke-width="5" stroke-dasharray="9 22"/><path d="M8 0v100M92 0v100" stroke="#fff" stroke-width="2.5"/>`,
  lys_rod: () => fkLight({ r: 1 }), lys_gult: () => fkLight({ y: 1 }), lys_rodgult: () => fkLight({ r: 1, y: 1 }), lys_gronn: () => fkLight({ g: 1 }),
  lys_blink: () => fkLight({ y: 1, blink: 1 }), lys_pil: () => fkLight({ r: 1, arrow: 1 }),
  tresek: () => `<rect width="100" height="100" fill="#4A4F57"/><path d="M0 50h100" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/>${fkCar(24, 72, "#2B59C3", 1.1)}${fkCar(76, 72, "#E9A100", 1.1)}<path d="M34 40h32" stroke="#fff" stroke-width="2.4"/><path d="M34 36v8M66 36v8" stroke="#fff" stroke-width="2.4"/><text x="50" y="30" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="15" style="fill:#fff">3 s</text>`,
  tilhenger: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><rect x="10" y="44" width="42" height="22" rx="5" fill="#2B59C3"/><rect x="18" y="34" width="24" height="12" rx="3" fill="#2B59C3"/><circle cx="20" cy="68" r="7" fill="${FK_INK}"/><circle cx="44" cy="68" r="7" fill="${FK_INK}"/><path d="M52 60h8" stroke="${FK_INK}" stroke-width="3"/><rect x="60" y="42" width="32" height="20" rx="2" fill="#9AA3AB"/><circle cx="76" cy="66" r="7" fill="${FK_INK}"/>`,
  bakketopp: () => `<rect width="100" height="100" rx="10" fill="#CFE5F7"/><path d="M0 80Q50 20 100 80V100H0z" fill="#4A4F57"/><path d="M8 84Q50 30 92 84" stroke="#F2C230" stroke-width="2" fill="none" stroke-dasharray="6 5"/>${fkCar(24, 66, "#2B59C3", 0.9)}<text x="74" y="36" font-family="Arial,sans-serif" font-weight="800" font-size="22" style="fill:${FK_RED}">?</text>`,
  barn: () => fkTri(`${fkPed(41, 70, 0.95, FK_INK, "run")}${fkPed(59, 73, 0.72, FK_INK, "run")}`),
  trekant_rod: () => `<rect width="100" height="100" rx="12" fill="#fff" stroke="#DDE2E6"/><rect x="16" y="26" width="68" height="48" rx="6" fill="#EEF1F4" stroke="#9AA3AB"/><path d="M50 32l16 28H34z" fill="#fff" stroke="${FK_RED}" stroke-width="4" stroke-linejoin="round"/><path d="M50 42v8" stroke="${FK_INK}" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="55" r="1.8" fill="${FK_INK}"/>`,
  mobil: () => `<circle cx="50" cy="50" r="42" fill="#fff" stroke="${FK_RED}" stroke-width="8"/><rect x="36" y="22" width="28" height="52" rx="5" fill="${FK_INK}"/><rect x="39" y="28" width="22" height="38" rx="2" fill="#8FD3F4"/><path d="M20 20l60 60" stroke="${FK_RED}" stroke-width="8"/>`,
  dekk: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><circle cx="50" cy="50" r="38" fill="${FK_INK}"/><circle cx="50" cy="50" r="18" fill="#9AA3AB"/><g stroke="#4A4F57" stroke-width="4">${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${(50 + 26 * Math.cos(a)).toFixed(1)} ${(50 + 26 * Math.sin(a)).toFixed(1)}L${(50 + 36 * Math.cos(a)).toFixed(1)} ${(50 + 36 * Math.sin(a)).toFixed(1)}"/>`; }).join("")}</g>`,
  refleksvest: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><path d="M30 18l10 6h20l10-6 12 12-6 60H24l-6-60z" fill="#E5F23A"/><path d="M22 58h56M22 70h56" stroke="#C9CFD4" stroke-width="5"/><path d="M40 24l10 14 10-14" fill="#fff"/>`,
  refleks: () => `<rect width="100" height="100" rx="10" fill="#1A2233"/>${fkWalker(50, 62, 1.8, "#3A4556")}<circle cx="58" cy="70" r="6" fill="#E9F3FF" style="filter:drop-shadow(0 0 6px #fff)"/>`,
  glatt: () => fkTri(`<path d="M36 74q6-8 0-16M50 74q6-8 0-16M64 74q6-8 0-16" stroke="${FK_INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>${fkCar(50, 48, FK_INK, 0.9)}`),
  elg: () => fkTri(`<g fill="${FK_INK}" transform="translate(10.5 15.2) scale(.82)"><path d="M76 52C77 56 77 60 75 62L74.2 79H71.2L70 64.5H67.5L66.5 79H63.5L62 63.5L48.5 62.5L47.5 79H44.5L43.3 62.5H41.5L40.3 79H37.3L36.6 60.5C35.2 57.5 34.2 55.6 33 53.8L30 55.6C28 57.2 26 58.4 24 59L20.4 59.2C18.2 59.2 17.8 56.4 19.8 55.3L26 50.4C28 48.4 30 47.3 33 47C36 46.2 38.3 43.2 42 42C48 40.3 52 43.8 56 45.8L70 46.8C73 47 75 49 76 52Z"/><path d="M30 55.4L30.8 61.6L32.6 55Z"/><path d="M31.6 46.4C29 44 26 41 22.8 38.2C24.6 37.2 26.4 37.4 27.6 38.4C27 36.2 27.6 34.4 29 33.4C30.2 35.2 30.8 36.6 31 38C31.8 36.2 33.2 35 35 34.6C35.8 37.2 35.6 40 34.8 42.2C34.4 44 33.6 45.4 32.6 46.6Z"/><path d="M34.6 46.2L37.6 43.2L36.6 47.4Z"/></g>`),
  varseltrekant: () => `<rect width="100" height="100" rx="10" fill="#4A4F57"/><path d="M50 18l32 58H18z" fill="none" stroke="${FK_RED}" stroke-width="9" stroke-linejoin="round"/><path d="M50 30l20 38H30z" fill="none" stroke="#FFB0A8" stroke-width="2"/><path d="M40 80l-6 8M60 80l6 8" stroke="#9AA3AB" stroke-width="3"/>`,
  lskilt: () => `<rect x="12" y="20" width="76" height="60" rx="6" fill="#fff" stroke="${FK_INK}" stroke-width="3"/><text x="50" y="72" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="54" style="fill:${FK_RED}">L</text>`,
  motstyring: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><path d="M18 52h64" stroke="${FK_INK}" stroke-width="7" stroke-linecap="round"/><path d="M50 52v26" stroke="${FK_INK}" stroke-width="5"/><circle cx="50" cy="52" r="6" fill="${FK_INK}"/><rect x="72" y="46" width="12" height="12" rx="3" fill="#E07A1F"/><path d="M78 40V20" stroke="#2B59C3" stroke-width="5" stroke-linecap="round"/><path d="M70 26l8-11 8 11z" fill="#2B59C3"/>`,
};
function fkSign(name, size = 96, cls = ""){
  const f = FK_SIGNS[name]; if(!f) return "";
  return `<svg class="fk-sign ${cls}" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${esc(fkSignName(name))}">${f()}</svg>`;
}
// Navn og betydning (skiltoversikten). [navn, gruppe, nb-navn, en-navn, nb-betydning, en-betydning]
const FK_SIGN_INFO = [
 ["vikeplikt", "vik", "Vikeplikt", "Give way", "Gi fri vei for kjørende på vegen du skal inn på.", "Give way to traffic on the road you are entering."],
 ["stopp", "vik", "Stopp", "Stop", "Stans helt ved stopplinjen, og vik deretter.", "Stop completely at the stop line, then give way."],
 ["forkjorsvei", "vik", "Forkjørsvei", "Priority road", "Kjørende fra sidevegene har vikeplikt for deg.", "Traffic from side roads must give way to you."],
 ["slutt_forkjorsvei", "vik", "Slutt på forkjørsvei", "End of priority road", "Vanlige vikepliktsregler gjelder videre.", "Normal right-of-way rules apply from here."],
 ["fare_generell", "fare", "Annen fare", "Other danger", "Fareskilt: trekant med rød kant varsler fare.", "Warning sign: a red-bordered triangle warns of danger."],
 ["barn", "fare", "Barn", "Children", "Varsler om barn i eller ved vegen.", "Warns of children on or near the road."],
 ["glatt", "fare", "Glatt kjørebane", "Slippery road", "Vegen kan være glatt.", "The road may be slippery."],
 ["elg", "fare", "Elg", "Moose", "Fare for elg i vegen.", "Risk of moose on the road."],
 ["innkjoring_forbudt", "forbud", "Innkjøring forbudt", "No entry", "Du skal ikke kjøre inn.", "You must not drive in."],
 ["parkering_forbudt", "forbud", "Parkering forbudt", "No parking", "Du kan stanse kort, men ikke parkere.", "You may stop briefly but not park."],
 ["stans_forbudt", "forbud", "Stans forbudt", "No stopping", "Du skal ikke stanse, heller ikke kort.", "You must not stop, not even briefly."],
 ["forbikjoring_forbudt", "forbud", "Forbikjøring forbudt", "No overtaking", "Du skal ikke kjøre forbi motorvogner.", "You must not overtake motor vehicles."],
 ["fart60", "forbud", "Fartsgrense 60", "Speed limit 60", "Høyeste tillatte fart er 60 km/t.", "The maximum speed is 60 km/h."],
 ["pabud_hoyre", "pabud", "Påbudt kjøreretning", "Mandatory direction", "Du skal kjøre i pilens retning.", "You must drive in the direction of the arrow."],
 ["rundkjoring", "pabud", "Rundkjøring", "Roundabout", "Kjør rundt i pilenes retning.", "Drive round in the direction of the arrows."],
 ["gangfelt", "oppl", "Gangfelt", "Pedestrian crossing", "Gi fotgjengere anledning til å gå over.", "Let pedestrians cross."],
 ["parkering", "oppl", "Parkering", "Parking", "Parkeringsplass. Underskilt kan begrense tiden.", "Parking. Supplementary plates may limit the time."],
 ["blindveg", "oppl", "Blindveg", "Dead end", "Vegen fører ikke videre.", "The road does not continue."],
 ["haitenner", "linje", "Vikepliktlinje", "Give-way line", "Stans her om nødvendig når du har vikeplikt.", "Stop here if needed when you must give way."],
 ["sperrelinje", "linje", "Sperrelinje", "Solid line", "Skal ikke krysses eller kjøres på.", "Must not be crossed or driven on."],
 ["varsellinje", "linje", "Varsellinje", "Warning line", "Varsler om sperrelinje eller fare.", "Warns of a solid line or danger."],
 ["ledelinje", "linje", "Ledelinje", "Guide line", "Kan krysses når det er trygt.", "May be crossed when safe."],
 ["lys_rod", "lys", "Rødt lys", "Red light", "Stans.", "Stop."],
 ["lys_rodgult", "lys", "Rødt og gult", "Red and amber", "Grønt kommer snart, men vent.", "Green is coming soon, but wait."],
 ["lys_gronn", "lys", "Grønt lys", "Green light", "Kjør, men vik for gående og møtende når du svinger.", "Go, but give way to pedestrians and oncoming traffic when turning."],
 ["lys_gult", "lys", "Gult lys", "Amber light", "Stans hvis du kan gjøre det uten fare.", "Stop if you can do so safely."],
 ["lys_blink", "lys", "Blinkende gult", "Flashing amber", "Vis særlig aktsomhet; skilt og vikeplikt gjelder.", "Take special care; signs and right of way apply."],
 ["lys_pil", "lys", "Grønn pil", "Green arrow", "Kjør i pilens retning.", "Go in the direction of the arrow."]
];
const FK_SIGN_GROUPS = [["vik", "Vikeplikt og forkjørsrett", "Right of way"], ["fare", "Fareskilt", "Warning signs"], ["forbud", "Forbudsskilt", "Prohibitory signs"], ["pabud", "Påbudsskilt", "Mandatory signs"], ["oppl", "Opplysningsskilt", "Information signs"], ["linje", "Vegoppmerking", "Road markings"], ["lys", "Trafikklys", "Traffic lights"]];
function fkSignName(name){ const s = FK_SIGN_INFO.find(x => x[0] === name); return s ? T(s[2], s[3]) : T("Illustrasjon", "Illustration"); }

// ---------- figurer i teorien (320×180) ----------
(() => {
  const row = (names, labels) => { const n = names.length, w = 320 / n, sz = Math.min(92, w - 14);
    return names.map((nm, i) => `<g transform="translate(${(i * w + (w - sz) / 2).toFixed(1)} 12) scale(${(sz / 100).toFixed(3)})">${FK_SIGNS[nm]()}</g><text x="${(i * w + w / 2).toFixed(1)}" y="${(sz + 34).toFixed(0)}" text-anchor="middle" class="fg-s" style="font-size:12px">${esc(labels[i])}</text>`).join(""); };
  Object.assign(FIGS, {
    fk_vikeplikt: () => ({ cap: T("Vikeplikt, stopp, forkjørsvei og slutt på forkjørsvei.", "Give way, stop, priority road and end of priority road."),
      svg: row(["vikeplikt", "stopp", "forkjorsvei", "slutt_forkjorsvei"], [T("Vikeplikt", "Give way"), T("Stopp", "Stop"), T("Forkjørsvei", "Priority road"), T("Slutt", "End")]) }),
    fk_skiltgrupper: () => ({ cap: T("Fareskilt, forbudsskilt, påbudsskilt og opplysningsskilt.", "Warning, prohibitory, mandatory and information signs."),
      svg: row(["fare_generell", "innkjoring_forbudt", "pabud_hoyre", "gangfelt"], [T("Fare", "Warning"), T("Forbud", "Prohibition"), T("Påbud", "Mandatory"), T("Opplysning", "Information")]) }),
    fk_linjer: () => ({ cap: T("Sperrelinje, varsellinje, ledelinje og vikepliktlinje.", "Solid line, warning line, guide line and give-way line."),
      svg: row(["sperrelinje", "varsellinje", "ledelinje", "haitenner"], [T("Sperrelinje", "Solid"), T("Varsellinje", "Warning"), T("Ledelinje", "Guide"), T("Vikeplikt", "Give way")]) }),
    fk_lys: () => ({ cap: T("Rødt, rødt og gult, grønt, gult og blinkende gult.", "Red, red and amber, green, amber and flashing amber."),
      svg: row(["lys_rod", "lys_rodgult", "lys_gronn", "lys_gult", "lys_blink"], [T("Stans", "Stop"), T("Vent", "Wait"), T("Kjør", "Go"), T("Stans", "Stop"), T("Aktsom", "Care")]) }),
    fk_motstyring: () => ({ cap: T("Motstyring: press på høyre styrehalvdel, så legger sykkelen seg til høyre.", "Countersteering: push the right grip, and the bike leans right."), svg: row(["motstyring"], [T("Press høyre = sving høyre", "Push right = turn right")]) }),
    fk_stopp: () => { // stopplengde ved 30, 50, 80 km/t på tørr veg (reaksjon 1 s, retardasjon 7 m/s²)
      const sp = [30, 50, 80], X = m => 60 + m * 3.2;
      const rows = sp.map((v, i) => { const r = v / 3.6, b = r * r / (2 * 7), y = 30 + i * 46;
        return `<text x="54" y="${y + 14}" text-anchor="end" class="fg-s" style="font-size:12px">${v} km/t</text><rect x="${X(0)}" y="${y}" width="${(r * 3.2).toFixed(1)}" height="20" rx="3" style="fill:var(--c3)"/><rect x="${X(r).toFixed(1)}" y="${y}" width="${(b * 3.2).toFixed(1)}" height="20" rx="3" style="fill:var(--c1)"/><text x="${(X(r + b) + 6).toFixed(1)}" y="${y + 14}" class="fg-s" style="font-size:12px">${nf(r + b, 0)} m</text>`; }).join("");
      return { cap: T("Stopplengde på tørr asfalt: reaksjonslengde (blå) og bremselengde (rød).", "Stopping distance on dry asphalt: reaction distance (blue) and braking distance (red)."), svg: rows }; }
  });
})();
