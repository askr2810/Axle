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
// ---------- motorsykkel ----------
// Styret slik føreren ser det: buet styrestang, gummihåndtak, brems (høyre) og clutch (venstre), speil, instrumenter og tank.
// Sentrert i (0, 0), omtrent 150 bredt. hand: "R" tegner en hanske på høyre håndtak.
function fkBars(x, y, s = 1, hand = "R"){
  const grip = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:#1E2226;stroke-width:12;stroke-linecap:round"/><path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:#3A4148;stroke-width:12;stroke-dasharray:2 3;stroke-linecap:butt;opacity:.6"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-34 40C-34 22 -20 14 0 14C20 14 34 22 34 40L30 70H-30Z" style="fill:#C8312A"/><path d="M-22 40C-22 28 -12 22 0 22C12 22 22 28 22 40" style="fill:none;stroke:#E8625B;stroke-width:3"/><circle cx="0" cy="34" r="5" style="fill:#9AA3AC;stroke:#5C646C;stroke-width:1.5"/>
    <circle cx="-14" cy="-2" r="6" style="fill:#7C858E"/><circle cx="14" cy="-2" r="6" style="fill:#7C858E"/>
    <path d="M-30 -36L-38 -66" style="stroke:#2A2F35;stroke-width:3"/><path d="M30 -36L38 -66" style="stroke:#2A2F35;stroke-width:3"/>
    <ellipse cx="-41" cy="-71" rx="12" ry="8" style="fill:#2A2F35"/><ellipse cx="-41" cy="-71" rx="9" ry="5.5" style="fill:#AFC6D8"/><ellipse cx="41" cy="-71" rx="12" ry="8" style="fill:#2A2F35"/><ellipse cx="41" cy="-71" rx="9" ry="5.5" style="fill:#AFC6D8"/>
    <rect x="-26" y="-34" width="52" height="26" rx="10" style="fill:#2A2F35"/><circle cx="-12" cy="-21" r="9" style="fill:#F4F6F8"/><circle cx="12" cy="-21" r="9" style="fill:#F4F6F8"/><path d="M-12 -21L-17 -26M12 -21L16 -27" style="stroke:#D23F3A;stroke-width:1.6;stroke-linecap:round"/>
    <path d="M-64 6Q-32 -8 0 -6Q32 -8 64 6" style="fill:none;stroke:#8C949C;stroke-width:6;stroke-linecap:round"/><rect x="-10" y="-11" width="20" height="10" rx="3" style="fill:#5C646C"/>
    <rect x="22" y="-14" width="12" height="9" rx="2" style="fill:#2A2F35"/><rect x="-34" y="-14" width="12" height="9" rx="2" style="fill:#2A2F35"/>
    <path d="M30 -8Q52 -16 70 -10" style="fill:none;stroke:#5C646C;stroke-width:3.5;stroke-linecap:round"/><path d="M-30 -8Q-52 -16 -70 -10" style="fill:none;stroke:#5C646C;stroke-width:3.5;stroke-linecap:round"/>
    ${grip(58, 3, 76, 10)}${grip(-58, 3, -76, 10)}
    ${hand === "R" ? `<path d="M56 -6C64 -10 76 -6 80 2C84 10 80 18 72 18C64 18 56 14 54 8C52 2 52 -2 56 -6Z" style="fill:#3B2F28"/><path d="M60 -4C66 -6 72 -4 74 0" style="fill:none;stroke:#5A473C;stroke-width:2"/>` : ""}
  </g>`;
}
// Motorsykkel med fører, sett ovenfra (front mot -y), omtrent 52 lang.
function fkMcTop(x, y, rot = 0, col = "#2B59C3", s = 1){
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-4" y="12" width="8" height="15" rx="4" style="fill:#1E2226"/><rect x="-3.5" y="-27" width="7" height="14" rx="3.5" style="fill:#1E2226"/>
    <path d="M-7 10L-6 -4L6 -4L7 10Z" style="fill:#2A2F35"/><path d="M-6.5 -4C-6.5 -12 6.5 -12 6.5 -4Z" style="fill:${col}"/>
    <path d="M-15 -11L15 -11" style="stroke:#8C949C;stroke-width:2.6;stroke-linecap:round"/><circle cx="-15" cy="-11" r="2.2" style="fill:#1E2226"/><circle cx="15" cy="-11" r="2.2" style="fill:#1E2226"/>
    <path d="M-8 2C-10 -4 -14 -8 -15 -11M8 2C10 -4 14 -8 15 -11" style="fill:none;stroke:#2E3A44;stroke-width:3.4;stroke-linecap:round"/>
    <ellipse cx="0" cy="4" rx="9" ry="7" style="fill:#2E3A44"/><circle cx="0" cy="0" r="6.2" style="fill:${col};stroke:#fff;stroke-width:1.4"/><path d="M-4.2 -3.2Q0 -6.4 4.2 -3.2" style="fill:none;stroke:#1B1F24;stroke-width:2"/>
  </g>`;
}
// ---------- mennesker ----------
// fkHuman tegner en person fra ledd (hode, skuldre, hofte, albuer, knær …) med lemmer som smalner av, slik piktogrammer
// på ekte skilt er bygd opp. Med col gir den en ensfarget silhuett (skilt), uten col får den hud, hår, klær og sko (illustrasjoner).
// Koordinater: føttene står på y = 0, høyden er omtrent 60, og personen ser mot høyre (flip speiler).
const FK_POSES = {
  walk: { h: [3, -53, 5.6], n: [2, -46], sh: [1, -43], hip: [-1, -24], aF: [[6, -33], [10, -25]], aB: [[-5, -34], [-8, -26]], lF: [[5, -12], [9, -1.5]], fF: [15, -0.5], lB: [[-4, -12], [-11, -3]], fB: [-5.5, -0.5] },
  run: { h: [8, -51, 5.6], n: [6, -45], sh: [4, -42], hip: [-1, -24], aF: [[11, -36], [16, -42]], aB: [[-4, -32], [-11, -36]], lF: [[10, -17], [8, -6]], fF: [14, -5], lB: [[-6, -12], [-16, -9]], fB: [-14, -4] },
  armsup: { front: 1, h: [0, -54, 5.6], n: [0, -47], shL: [-7, -44], shR: [7, -44], hipL: [-4, -24], hipR: [4, -24], aL: [[-14, -51], [-18, -61]], aR: [[14, -51], [18, -61]], lL: [[-4.5, -12], [-5, -1]], lR: [[4.5, -12], [5, -1]], fL: [-9, 0], fR: [9, 0] },
  lie: { h: [-36, -7, 5.6], n: [-30, -6], sh: [-27, -6], hip: [1, -6], aF: [[-15, -3], [-5, -2]], aB: [[-15, -4], [-6, -3]], lF: [[14, -6], [28, -5]], fF: [30, -12], lB: [[14, -5], [28, -4]], fB: [31, -10] },
  side: { h: [-33, -9, 5.6], n: [-27, -8], sh: [-24, -8], hip: [2, -8], aF: [[-30, -3], [-37, -3]], aB: [[-14, -2], [-4, -1]], lF: [[12, -1], [8, 6]], fF: [14, 6], lB: [[16, -6], [30, -5]], fB: [33, -9] },
  kneel: { h: [6, -42, 5.6], n: [4, -36], sh: [2, -33], hip: [-8, -16], aF: [[8, -22], [13, -11]], aB: [[7, -23], [12, -12]], lF: [[2, -3], [-12, -2]], fF: [-16, -2], lB: [[1, -4], [-12, -3]], fB: [-16, -3] },
};
function fkCaps(a, b, w1, w2, fill){
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, f = v => v.toFixed(2);
  return `<path d="M${f(a[0] + nx * w1 / 2)} ${f(a[1] + ny * w1 / 2)}L${f(b[0] + nx * w2 / 2)} ${f(b[1] + ny * w2 / 2)}L${f(b[0] - nx * w2 / 2)} ${f(b[1] - ny * w2 / 2)}L${f(a[0] - nx * w1 / 2)} ${f(a[1] - ny * w1 / 2)}Z" style="fill:${fill}"/><circle cx="${f(a[0])}" cy="${f(a[1])}" r="${f(w1 / 2)}" style="fill:${fill}"/><circle cx="${f(b[0])}" cy="${f(b[1])}" r="${f(w2 / 2)}" style="fill:${fill}"/>`;
}
function fkHuman(x, y, s = 1, pose = "walk", o = {}){
  const P = FK_POSES[pose] || FK_POSES.walk, mono = o.col, C = k => mono || o[k] || { skin: "#F1C7A1", hair: "#5A3B26", top: "#3B6FB6", top2: "#2F5A94", pants: "#2E3A44", pants2: "#243039", shoe: "#1B1F24" }[k];
  const kid = o.kid ? 1.12 : 1, limb = (j0, pts, w, col, hand) => { let g = "", a = j0; pts.forEach((b, i) => { g += fkCaps(a, b, w[i], w[i + 1], col); a = b; }); if(hand) g += `<circle cx="${a[0]}" cy="${a[1]}" r="${(w[w.length - 1] * 0.62).toFixed(2)}" style="fill:${C("skin")}"/>`; return g; };
  const foot = (ankle, toe, col) => fkCaps(ankle, toe, 4.4, 3.8, col);
  let g = "";
  if(P.front){ // forfra (politi)
    g += limb(P.hipL, P.lL, [7, 5.6, 4.4], C("pants")) + limb(P.hipR, P.lR, [7, 5.6, 4.4], C("pants")) + foot(P.lL[1], P.fL, C("shoe")) + foot(P.lR[1], P.fR, C("shoe"));
    g += `<path d="M${P.shL[0] - 2} ${P.shL[1] - 1}L${P.shR[0] + 2} ${P.shR[1] - 1}L${P.hipR[0] + 2} ${P.hipR[1]}L${P.hipL[0] - 2} ${P.hipL[1]}Z" style="fill:${C("top")}"/>`;
    if(o.vest) g += `<path d="M${P.shL[0]} ${P.shL[1]}L${P.shR[0]} ${P.shR[1]}L${P.hipR[0] + 1} ${P.hipR[1] - 2}L${P.hipL[0] - 1} ${P.hipL[1] - 2}Z" style="fill:${o.vest}"/><path d="M${P.hipL[0] - 1} -32H${P.hipR[0] + 1}" style="stroke:#E8EDF2;stroke-width:1.8"/>`;
    g += limb(P.shL, P.aL, [5, 4.2, 3.4], C("top"), !mono) + limb(P.shR, P.aR, [5, 4.2, 3.4], C("top"), !mono);
  } else {
    g += limb(P.hip, P.lB, [7.2, 5.6, 4.4], C("pants2")) + foot(P.lB[1], P.fB, C("shoe")) + limb(P.sh, P.aB, [4.6, 4, 3.2], C("top2"), !mono);
    g += fkCaps(P.sh, P.hip, 13 * kid, 11 * kid, C("top"));
    if(o.vest) g += fkCaps([P.sh[0] + (P.hip[0] - P.sh[0]) * .12, P.sh[1] + (P.hip[1] - P.sh[1]) * .12], [P.sh[0] + (P.hip[0] - P.sh[0]) * .82, P.sh[1] + (P.hip[1] - P.sh[1]) * .82], 11, 9.5, o.vest);
    if(o.bag) g += fkCaps([P.sh[0] - 6, P.sh[1] + 3], [P.sh[0] - 6, P.sh[1] + 12], 7, 7, o.bag === true ? (mono || "#D23F3A") : o.bag);
    g += limb(P.hip, P.lF, [7.4, 5.8, 4.4], C("pants")) + foot(P.lF[1], P.fF, C("shoe")) + limb(P.sh, P.aF, [4.8, 4.1, 3.3], C("top"), !mono);
  }
  const [hx, hy, hr0] = P.h, hr = hr0 * kid;
  g += fkCaps(P.n || [hx, hy + hr], [hx, hy + hr * .4], 4, 4, C("skin"));
  g += `<circle cx="${hx}" cy="${hy}" r="${hr}" style="fill:${C("skin")}"/>`;
  if(!mono && !o.cap) g += `<path d="M${hx - hr} ${hy + 0.5}A${hr} ${hr} 0 0 1 ${hx + hr} ${hy - 1}C${hx + hr * .4} ${hy - hr * .5} ${hx - hr * .2} ${hy - hr * .3} ${hx - hr * .5} ${hy + hr * .5}Z" style="fill:${C("hair")}"/>`;
  if(o.cap) g += `<path d="M${hx - hr - 1} ${hy - 1.5}H${hx + hr + 1}L${hx + hr - 1} ${hy - hr - 2}H${hx - hr + 1}Z" style="fill:${o.cap}"/><rect x="${hx - hr - 2}" y="${hy - 2.4}" width="${hr * 2 + 4}" height="2" style="fill:#111"/>`;
  return `<g transform="translate(${x} ${y}) scale(${o.flip ? -s : s} ${s})">${g}</g>`;
}
const fkWalker = (x, y, s = 1, col = FK_INK) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}" stroke="${col}" stroke-linecap="round"><circle cx="0" cy="-16" r="4.2" stroke="none"/><path d="M0-11l-2 12M-2 1l-6 12M-2 1l5 5 2 8M-1-8l-8 6M-1-8l7 4" fill="none" stroke-width="3.4"/></g>`;
const fkLight = on => { // on = { r, y, g, arrow, blink } → trafikklys
  const lamp = (cy, col, lit) => `<circle cx="50" cy="${cy}" r="11" fill="${lit ? col : "#3A3F47"}"${lit ? ` style="filter:drop-shadow(0 0 4px ${col})"` : ""}/>`;
  return `<rect x="31" y="6" width="38" height="88" rx="10" fill="${FK_INK}"/>${lamp(24, "#FF3B30", on.r)}${lamp(50, "#FFC400", on.y)}${on.arrow ? `<circle cx="50" cy="76" r="11" fill="#3A3F47"/><path d="M43 76h11M50 71l6 5-6 5" stroke="#34C759" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : lamp(76, "#34C759", on.g)}
    ${on.blink ? `<path d="M73 44l8-4M73 50h9M73 56l8 4M27 44l-8-4M27 50h-9M27 56l-8 4" stroke="#FFC400" stroke-width="2.6" stroke-linecap="round"/>` : ""}`;
};
// ---------- piktogrammer til skiltene ----------
// fkPict: ensfarget figur bygd av avsmalnende lemmer (fkCaps), slik piktogrammene på skiltene er tegnet.
// J = ledd i lokale koordinater (føttene på y = 0, høyden ca. 60, ser mot høyre). Bakerste arm og bein tegnes først.
const FK_PICT = {
  walk: { h: [4.2, -55.5, 6.2], neck: [2.4, -46], hip: [-0.5, -27.5], sw: 12, hw: 8.6,
    aB: [[0.5, -42.5], [-5.5, -34.5], [-10, -27.5]], aF: [[3.5, -42.5], [8.5, -34], [13, -27]],
    lB: [[-1, -28], [-4.5, -15], [-11.5, -4.5]], fB: [-8, -0.6], lF: [[0, -28], [6, -15], [11, -3.2]], fF: [15.5, -1.2] },
  run: { h: [9.5, -50.5, 6.2], neck: [5.6, -43.5], hip: [-1, -26], sw: 11, hw: 9.5,
    aB: [[4.5, -40.5], [-3.5, -35], [-10, -30]], aF: [[6, -40.5], [13, -34], [17, -40]],
    lB: [[-2, -26], [-7.5, -14], [-15, -8.5]], fB: [-17.5, -3], lF: [[0, -26], [10, -19], [8.5, -6]], fF: [13, -4.8] },
};
function fkPict(x, y, s, pose, col = FK_INK, o = {}){
  const P = Object.assign({}, FK_PICT[pose], o), limb = (pts, w, foot) => { let g = ""; for(let i = 0; i < pts.length - 1; i++) g += fkCaps(pts[i], pts[i + 1], w[i], w[i + 1], col); if(foot) g += fkCaps(pts[pts.length - 1], foot, w[w.length - 1], w[w.length - 1] * 0.85, col); return g; };
  const arm = [5.4, 4.6, 4], leg = [7.4, 6, 4.8];
  let g = limb(P.aB, arm) + limb(P.lB, leg, P.fB);
  { // overkropp: trapes med avrundede hjørner (ikke en kapsel, ellers blir skuldrene en ekstra kule under hodet)
    const [a0, a1] = P.neck, [b0, b1] = P.hip, L = Math.hypot(b0 - a0, b1 - a1), nx = -(b1 - a1) / L, ny = (b0 - a0) / L, r = 1.6, w1 = P.sw / 2 - r, w2 = P.hw / 2 - r, f = v => v.toFixed(2);
    g += `<path d="M${f(a0 + nx * w1)} ${f(a1 + ny * w1)}L${f(b0 + nx * w2)} ${f(b1 + ny * w2)}L${f(b0 - nx * w2)} ${f(b1 - ny * w2)}L${f(a0 - nx * w1)} ${f(a1 - ny * w1)}Z" style="fill:${col};stroke:${col};stroke-width:${2 * r};stroke-linejoin:round"/>`; }
  if(o.skirt) g += `<path d="M${P.hip[0] - 3} ${P.hip[1] - 7}L${P.hip[0] + 4.5} ${P.hip[1] - 7.5}L${P.hip[0] + 10} ${P.hip[1] + 5}L${P.hip[0] - 9} ${P.hip[1] + 5.5}Z" style="fill:${col}"/>`;
  g += limb(P.lF, leg, P.fF) + limb(P.aF, arm);
  g += `<circle cx="${P.h[0]}" cy="${P.h[1]}" r="${P.h[2]}" style="fill:${col}"/>`;
  if(o.tail) g += fkCaps([P.h[0] - 4.5, P.h[1] - 2], [P.h[0] - 10, P.h[1] + 4], 3.6, 2.2, col);
  return `<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;
}
// Bil sett bakfra (glatt kjørebane), sentrert på x, med hjulene ned mot y.
const fkCarRear = (x, y, col = FK_INK) => `<g transform="translate(${x} ${y})">
  <path d="M-9.5 -24.5Q-9 -26.5 -7 -26.5H7Q9 -26.5 9.5 -24.5L12.5 -15.5H-12.5Z" style="fill:${col}"/>
  <path d="M-7.6 -24.2H7.6L10 -17.2H-10Z" style="fill:#fff"/>
  <path d="M-16.5 -12.5Q-16.5 -15.8 -13 -16H13Q16.5 -15.8 16.5 -12.5V-3.5Q16.5 -1.8 15 -1.8H-15Q-16.5 -1.8 -16.5 -3.5Z" style="fill:${col}"/>
  <rect x="-14" y="-12" width="6" height="3" rx="1" style="fill:#fff"/><rect x="8" y="-12" width="6" height="3" rx="1" style="fill:#fff"/>
  <rect x="-15.5" y="-2.5" width="6.5" height="5.5" rx="1.4" style="fill:${col}"/><rect x="9" y="-2.5" width="6.5" height="5.5" rx="1.4" style="fill:${col}"/></g>`;
const FK_SIGNS = {
  vikeplikt: () => fkTri("", true),
  stopp: () => `<path d="M31 6h38l25 25v38L69 94H31L6 69V31z" fill="${FK_RED}" stroke="#fff" stroke-width="3"/><text x="50" y="58.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="21" letter-spacing="-0.5" style="fill:#fff">STOPP</text>`,
  forkjorsvei: () => `<path d="M50 4l46 46-46 46L4 50z" fill="#fff" stroke="${FK_INK}" stroke-width="1.6"/><path d="M50 18l32 32-32 32-32-32z" fill="${FK_YEL}"/>`,
  slutt_forkjorsvei: () => { const band = [-10, -5, 0, 5, 10].map(c => { const a = (44 + c) / 2, b = (c - 44) / 2; return `<path d="M${(50 + b).toFixed(1)} ${(50 + a).toFixed(1)}L${(50 + a).toFixed(1)} ${(50 + b).toFixed(1)}" stroke="${FK_INK}" stroke-width="2.3"/>`; }).join("");
    return `<path d="M50 4l46 46-46 46L4 50z" fill="#fff" stroke="${FK_INK}" stroke-width="2"/><path d="M50 17l33 33-33 33-33-33z" fill="${FK_YEL}"/>${band}`; },
  rundkjoring: () => fkBlueRound(`<g transform="rotate(0 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g><g transform="rotate(120 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g><g transform="rotate(240 50 50)"><path d="M43.53 74.15A25 25 0 0 0 72.66 60.57" fill="none" stroke="#fff" stroke-width="7.5"/><path d="M76.46 52.41L79.46 63.74L65.86 57.40Z" fill="#fff"/></g>`),
  gangfelt: () => fkBlueSq(`<path d="M50 14l35.5 63H14.5z" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>${[0, 1, 2, 3, 4].map(k => `<rect x="${21.5 + k * 11.8}" y="70.5" width="8" height="5" fill="${FK_INK}"/>`).join("")}${fkPict(48, 70.5, .72, "walk")}`),
  haitenner: () => `<rect width="100" height="100" fill="#4A4F57"/><g fill="#fff">${[8, 30, 52, 74].map(x => `<path d="M${x} 40h18l-9 20z"/>`).join("")}</g><path d="M0 12h100M0 88h100" stroke="#fff" stroke-width="2.5" stroke-dasharray="10 8"/>`,
  fare_generell: () => fkTri(`<path d="M50 34v26" stroke="${FK_INK}" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="72" r="4.6" fill="${FK_INK}"/>`),
  pabud_hoyre: () => fkBlueRound(`<path d="M50 74V42q0-8 8-8h10" fill="none" stroke="#fff" stroke-width="9"/><path d="M66 22l16 12-16 12z" fill="#fff"/>`),
  innkjoring_forbudt: () => `<circle cx="50" cy="50" r="44" fill="${FK_RED}" stroke="#fff" stroke-width="3"/><rect x="18" y="41" width="64" height="18" fill="#fff"/>`,
  parkering_forbudt: () => fkRound(`<path d="M22 22l56 56" stroke="${FK_RED}" stroke-width="8"/>`, FK_BLUE),
  stans_forbudt: () => fkRound(`<path d="M22 22l56 56M78 22L22 78" stroke="${FK_RED}" stroke-width="8"/>`, FK_BLUE),
  forbikjoring_forbudt: () => fkRound(`<g transform="translate(34.8 63) scale(.86)">${fkCarRear(0, 0, FK_RED)}</g><g transform="translate(65.2 63) scale(.86)">${fkCarRear(0, 0, FK_INK)}</g>`),
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
  barn: () => fkTri(`${fkPict(55, 80.5, .66, "run", FK_INK, { skirt: true, tail: true })}${fkPict(36.5, 80.5, .5, "run", FK_INK, { aF: [[6, -40.5], [14, -38], [24.5, -45.5]] })}`),
  trekant_rod: () => `<rect width="100" height="100" rx="12" fill="#fff" stroke="#DDE2E6"/><rect x="16" y="26" width="68" height="48" rx="6" fill="#EEF1F4" stroke="#9AA3AB"/><path d="M50 32l16 28H34z" fill="#fff" stroke="${FK_RED}" stroke-width="4" stroke-linejoin="round"/><path d="M50 42v8" stroke="${FK_INK}" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="55" r="1.8" fill="${FK_INK}"/>`,
  mobil: () => `<circle cx="50" cy="50" r="42" fill="#fff" stroke="${FK_RED}" stroke-width="8"/><rect x="36" y="22" width="28" height="52" rx="5" fill="${FK_INK}"/><rect x="39" y="28" width="22" height="38" rx="2" fill="#8FD3F4"/><path d="M20 20l60 60" stroke="${FK_RED}" stroke-width="8"/>`,
  dekk: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><circle cx="50" cy="50" r="38" fill="${FK_INK}"/><circle cx="50" cy="50" r="18" fill="#9AA3AB"/><g stroke="#4A4F57" stroke-width="4">${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${(50 + 26 * Math.cos(a)).toFixed(1)} ${(50 + 26 * Math.sin(a)).toFixed(1)}L${(50 + 36 * Math.cos(a)).toFixed(1)} ${(50 + 36 * Math.sin(a)).toFixed(1)}"/>`; }).join("")}</g>`,
  refleksvest: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/><path d="M30 18l10 6h20l10-6 12 12-6 60H24l-6-60z" fill="#E5F23A"/><path d="M22 58h56M22 70h56" stroke="#C9CFD4" stroke-width="5"/><path d="M40 24l10 14 10-14" fill="#fff"/>`,
  refleks: () => `<rect width="100" height="100" rx="10" fill="#1A2233"/>${fkHuman(48, 90, 1.25, "walk", { col: "#3A4556" })}<circle cx="57" cy="61" r="5.5" fill="#E9F3FF" style="filter:drop-shadow(0 0 6px #fff)"/>`,
  glatt: () => fkTri(`<g transform="translate(50 57) scale(.84) translate(-50 -57)">${fkCarRear(50, 57)}</g><path d="M40 61.5C40 66.5 46 69 50 72S60 77.5 60 82M60 61.5C60 66.5 54 69 50 72S40 77.5 40 82" fill="none" stroke="${FK_INK}" stroke-width="3.2" stroke-linecap="round"/>`),
  elg: () => fkTri(`<g fill="${FK_INK}" transform="translate(10.5 15.2) scale(.82)"><path d="M76 52C77 56 77 60 75 62L74.2 79H71.2L70 64.5H67.5L66.5 79H63.5L62 63.5L48.5 62.5L47.5 79H44.5L43.3 62.5H41.5L40.3 79H37.3L36.6 60.5C35.2 57.5 34.2 55.6 33 53.8L30 55.6C28 57.2 26 58.4 24 59L20.4 59.2C18.2 59.2 17.8 56.4 19.8 55.3L26 50.4C28 48.4 30 47.3 33 47C36 46.2 38.3 43.2 42 42C48 40.3 52 43.8 56 45.8L70 46.8C73 47 75 49 76 52Z"/><path d="M30 55.4L30.8 61.6L32.6 55Z"/><path d="M31.6 46.4C29 44 26 41 22.8 38.2C24.6 37.2 26.4 37.4 27.6 38.4C27 36.2 27.6 34.4 29 33.4C30.2 35.2 30.8 36.6 31 38C31.8 36.2 33.2 35 35 34.6C35.8 37.2 35.6 40 34.8 42.2C34.4 44 33.6 45.4 32.6 46.6Z"/><path d="M34.6 46.2L37.6 43.2L36.6 47.4Z"/></g>`),
  varseltrekant: () => `<rect width="100" height="100" rx="10" fill="#4A4F57"/><path d="M50 18l32 58H18z" fill="none" stroke="${FK_RED}" stroke-width="9" stroke-linejoin="round"/><path d="M50 30l20 38H30z" fill="none" stroke="#FFB0A8" stroke-width="2"/><path d="M40 80l-6 8M60 80l6 8" stroke="#9AA3AB" stroke-width="3"/>`,
  lskilt: () => `<rect x="12" y="20" width="76" height="60" rx="6" fill="#fff" stroke="${FK_INK}" stroke-width="3"/><text x="50" y="72" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="54" style="fill:${FK_RED}">L</text>`,
  motstyring: () => `<rect width="100" height="100" rx="10" fill="#E8EDF2"/>${fkBars(50, 56, .58)}<path d="M84 92V74" stroke="#2B59C3" stroke-width="4.5" stroke-linecap="round"/><path d="M77 78l7-10 7 10z" fill="#2B59C3"/>`,
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

// ---------- Sammenligningsfigurer (krasjvekt): elefant, ku, bil og person, sett fra siden mot høyre ----------
// fkBeast(kind, x, y, s): (x, y) er midt under føttene. Bredde ved s = 1: elefant 104, ku 92, bil 92, person 30.
const FK_BEAST = {
  elefant: { kg: 5000, w: 104, h: 68 }, ku: { kg: 600, w: 92, h: 58 }, bil: { kg: 1500, w: 92, h: 36, m: 4.5 }, person: { kg: 75, w: 30, h: 60 },
  buss: { m: 12, w: 120, h: 34 }, fotballbane: { m: 105, w: 105, h: 40 } };
function fkBeast(kind, x, y, s = 1){
  const st = "stroke:rgba(0,0,0,.35);stroke-width:1;stroke-linejoin:round";
  let g = "";
  if(kind === "elefant"){
    const c = "#8E969F", d = "#727A83";
    g = `<path d="M10 -22h10v21.5h-10zM-26 -24h10v23.5h-10z" style="fill:${d}"/>`
      + `<path d="M-38 -40C-38 -58 -20 -64 0 -62C14 -61 22 -60 26 -58C30 -68 46 -68 48 -54C50 -46 48 -40 46 -36C46 -24 50 -12 54 -6C56 -3 52 -1 50 -4C44 -14 40 -24 38 -32C36 -30 32 -30 30 -32L30 0L18 0L18 -20C10 -22 -10 -22 -18 -20L-18 0L-30 0L-30 -24C-34 -28 -38 -34 -38 -40Z" style="fill:${c};${st}"/>`
      + `<path d="M22 -57C10 -57 5 -42 9 -31C13 -24 24 -27 28 -35C31 -43 29 -55 22 -57Z" style="fill:#7D858E;${st}"/>`
      + `<path d="M40 -34C43 -28 49 -27 54 -31" style="fill:none;stroke:#F3EEDD;stroke-width:3.2;stroke-linecap:round"/>`
      + `<circle cx="38" cy="-50" r="1.6" style="fill:#1B1F24"/><path d="M42 -44q3 1 4 4M44 -30q-2 2 0 4M45 -22q-2 2 0 4" style="fill:none;stroke:${d};stroke-width:.9"/>`
      + `<path d="M-37 -44C-42 -38 -42 -30 -41 -23" style="fill:none;stroke:${d};stroke-width:1.6;stroke-linecap:round"/><path d="M-41 -25c-2.4 2 -2.4 5.5 -.6 7c1.8 -1.5 2.4 -5 .6 -7z" style="fill:#3A3F45"/>`
      + `<path d="M19 -1.5h3M23 -1.5h3M-29 -1.5h3M-25 -1.5h3" style="stroke:#D9D4C6;stroke-width:1.4;stroke-linecap:round"/>`;
  } else if(kind === "ku"){
    const leg = (x0, col) => `<rect x="${x0}" y="-21" width="6" height="19" style="fill:${col}"/><rect x="${x0 - .3}" y="-3.5" width="6.6" height="3.5" rx="1" style="fill:#2A2D31"/>`;
    g = leg(13, "#D9D9D9") + leg(-25, "#D9D9D9")
      + `<path d="M-37 -44C-42 -36 -42 -28 -40 -21" style="fill:none;stroke:#BBB;stroke-width:1.6;stroke-linecap:round"/><path d="M-40 -23c-2.6 2 -2.6 6 -.6 7.5c2 -1.5 2.6 -5.5 .6 -7.5z" style="fill:#2A2D31"/>`
      + `<path d="M-36 -42C-36 -49 -30 -50 -20 -49L20 -49C28 -49 30 -46 30 -40L30 -25C30 -20 26 -18 22 -18L-30 -18C-35 -18 -37 -22 -37 -28Z" style="fill:#FAFAF7;${st}"/>`
      + `<path d="M-30 -46C-22 -48 -16 -44 -18 -38C-20 -33 -28 -32 -32 -35C-35 -38 -34 -44 -30 -46ZM-4 -36C2 -38 10 -35 10 -29C10 -24 2 -21 -4 -24C-8 -27 -8 -34 -4 -36ZM14 -48L22 -48C24 -44 22 -39 17 -39C13 -40 12 -45 14 -48Z" style="fill:#24272B"/>`
      + `<ellipse cx="-14" cy="-17" rx="6" ry="3.6" style="fill:#F2A7B4"/>`
      + leg(20, "#FAFAF7") + leg(-32, "#FAFAF7")
      + `<path d="M26 -46L35 -52C41 -55 46 -51 46 -45L46 -36C46 -31 43 -28 39 -30L28 -38Z" style="fill:#FAFAF7;${st}"/><path d="M35 -52C40 -54 44 -51 44 -47L38 -43C35 -45 34 -49 35 -52Z" style="fill:#24272B"/>`
      + `<ellipse cx="43.5" cy="-32" rx="4.6" ry="4" style="fill:#F2A7B4;${st}"/><circle cx="43" cy="-32.5" r=".9" style="fill:#7A3B47"/>`
      + `<path d="M37 -53q1 -6 6 -7M33 -51q-4 -5 -2 -9" style="fill:none;stroke:#E6D9B8;stroke-width:2.2;stroke-linecap:round"/>`
      + `<ellipse cx="30" cy="-49" rx="5" ry="2.4" transform="rotate(-20 30 -49)" style="fill:#EDEDE8;${st}"/><circle cx="40.5" cy="-44.5" r="2.1" style="fill:#FAFAF7"/><circle cx="40.8" cy="-44.5" r="1.3" style="fill:#1B1F24"/>`;
  } else if(kind === "bil"){
    g = `<path d="M-44 -12C-44 -18 -40 -20 -32 -21L-20 -22L-10 -32C-8 -34 -4 -35 0 -35L16 -35C20 -35 22 -34 24 -32L32 -23L40 -21C44 -20 46 -17 46 -12L46 -8C46 -6 44 -5 42 -5L-42 -5C-44 -5 -45 -7 -44 -12Z" style="fill:#2B59C3;${st}"/>`
      + `<path d="M-16 -22L-8 -31L2 -31L2 -22ZM5 -31L16 -31C19 -31 20 -30 22 -28L28 -22L5 -22Z" style="fill:rgba(220,240,255,.9)"/>`
      + `<path d="M3.5 -22V-8M-20 -15h4M10 -15h4" style="stroke:rgba(0,0,0,.35);stroke-width:1"/>`
      + `<rect x="42" y="-17" width="4" height="3" rx="1" style="fill:#FFF3B0"/><rect x="-45" y="-18" width="3" height="4" rx="1" style="fill:#E0201B"/>`
      + [-27, 29].map(cx => `<circle cx="${cx}" cy="-6" r="7" style="fill:#1F2328"/><circle cx="${cx}" cy="-6" r="3" style="fill:#AEB5BC"/>`).join("");
  } else if(kind === "buss"){ // bybuss, 12 m
    g = `<path d="M-60 -8V-28C-60 -31 -58 -33 -55 -33H52C56 -33 58 -31 59 -27L61 -16V-8C61 -6 59 -5 57 -5H-57C-59 -5 -60 -6 -60 -8Z" style="fill:#D23F3A;${st}"/>`
      + [-54, -40, -26, -12, 16].map(wx => `<rect x="${wx}" y="-29" width="11" height="11" rx="1.5" style="fill:rgba(220,240,255,.92)"/>`).join("")
      + `<path d="M46 -29H54C56 -29 57 -28 57.5 -26L59.5 -18H46Z" style="fill:rgba(220,240,255,.92)"/>`
      + [2, 33].map(dx => `<rect x="${dx}" y="-29" width="10" height="23" rx="1" style="fill:#F0D9D7;stroke:rgba(0,0,0,.3);stroke-width:.8"/><line x1="${dx + 5}" y1="-29" x2="${dx + 5}" y2="-6" style="stroke:rgba(0,0,0,.3);stroke-width:.8"/>`).join("")
      + `<rect x="58" y="-12" width="3" height="3" rx="1" style="fill:#FFF3B0"/><rect x="-61" y="-14" width="2.5" height="5" rx="1" style="fill:#8E0F0B"/>`
      + [-40, 26].map(cx => `<circle cx="${cx}" cy="-5" r="6.5" style="fill:#1F2328"/><circle cx="${cx}" cy="-5" r="2.8" style="fill:#AEB5BC"/>`).join("");
  } else if(kind === "fotballbane"){ // sett litt skrått ovenfra, 105 m lang
    const L = "stroke:#fff;stroke-width:1.1;fill:none";
    g = `<path d="M-52.5 0L52.5 0L45 -38L-45 -38Z" style="fill:#3E9B4F"/>`
      + [0, 1, 2, 3, 4, 5].map(i => { const a = -52.5 + i * 17.5, b = a + 8.75, t = v => v * 45 / 52.5; return `<path d="M${a} 0L${b} 0L${t(b)} -38L${t(a)} -38Z" style="fill:#47A859"/>`; }).join("")
      + `<path d="M-50 -2L50 -2L43 -36L-43 -36Z" style="${L}"/><path d="M0 -2L0 -36" style="${L}"/><ellipse cx="0" cy="-19" rx="8" ry="5.5" style="${L}"/>`
      + `<path d="M-48.5 -9L-35 -9L-33.5 -29L-44.7 -29M48.5 -9L35 -9L33.5 -29L44.7 -29" style="${L}"/>`
      + `<rect x="-51.5" y="-22" width="1.6" height="6" style="fill:#fff"/><rect x="49.9" y="-22" width="1.6" height="6" style="fill:#fff"/>`;
  } else if(kind === "person") return fkHuman(x, y, s, "walk", {});
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})">${g}</g>`;
}
