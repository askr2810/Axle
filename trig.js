// ============================================================
//  ENHETSSIRKELEN – interaktiv lab for trigonometri (1T, R2 og grunnkurset i matte).
//  Sju stasjoner (Utforsk har også Eulers formel e^{iv}): Eksakte verdier, Radianer, Symmetri, Grafer, Likninger og Øv (runde med poeng).
//  Punktet dras rett i figuren (pekerhendelser), og en glidebryter under gjør det samme (tastatur og skjermleser).
//  Nås fra Bevis-siden, fra teorien i trigonometri-enhetene, fra spillmenyen og på #/enhetssirkel/<stasjon>.
//  Framdrift: S.tgSeen (besøkte stasjoner), S.tgGoals (løste utfordringer), S.tgBest (rekord i Øv).
// ============================================================
let TG = { st: "explore", ls: 1, lsel: 1, lq: null, lb: 0, lbp: 0, wsh: null, wan: 0, v: 30, rad: false, snap: true, tan: false, ref: false, touched: false, ex: "45", e36: 60, exSel: 210, sym: "m180",
  gr: "unroll", fn: "sin", A: 1, k: 1, ph: 0, d: 0, eq: "sin", a: 0.5, from: "home", anim: 0, quiz: null };
const TG_ST = [["learn", "🪜", "Steg for steg", "Step by step", "steg-for-steg", "step-by-step"], ["table", "📋", "Tabell", "Table", "tabell", "table"], ["explore", "🧭", "Utforsk", "Explore", "utforsk", "explore"], ["exact", "✨", "Eksakte verdier", "Exact values", "eksakte", "exact"],
  ["radians", "📏", "Radianer", "Radians", "radianer", "radians"], ["sym", "🪞", "Symmetri", "Symmetry", "symmetri", "symmetry"],
  ["graphs", "〰️", "Grafer", "Graphs", "grafer", "graphs"], ["eq", "🎯", "Likninger", "Equations", "likninger", "equations"], ["quiz", "🏆", "Øv", "Practice", "ov", "practice"]];
Object.assign(UI.nb, { tgTitle: "Enhetssirkelen", tgSub: "Dra, se og øv på trigonometri", tgKicker: "Trigonometri", tgCta: "Enhetssirkelen: interaktiv lab", tgCtaSub: "Dra i sirkelen, se sin, cos og tan, og øv med spill" });
Object.assign(UI.en, { tgTitle: "The unit circle", tgSub: "Drag, see and practise trigonometry", tgKicker: "Trigonometry", tgCta: "The unit circle: interactive lab", tgCtaSub: "Drag the circle, see sin, cos and tan, and practise with games" });

// ---------- matte ----------
const TG_R = 120, tgRad = d => d * Math.PI / 180, tgDeg = r => r * 180 / Math.PI, mod360 = d => ((d % 360) + 360) % 360;
const tgP = (d, r = TG_R) => [r * Math.cos(tgRad(d)), -r * Math.sin(tgRad(d))];
const TG_SPECIALS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const tgIsInt = d => Math.abs(d - Math.round(d)) < 1e-9;
const tgSpecial = d => tgIsInt(d) && TG_SPECIALS.includes(mod360(Math.round(d)));
function tgRefA(d){ d = mod360(d); return d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d; }
function tgQuad(d){ d = mod360(d); return tgIsInt(d) && Math.round(d) % 90 === 0 ? 0 : Math.floor(d / 90) + 1; }
const TG_BASE = { 0: ["0", "1", "0"], 30: ["\\tfrac12", "\\tfrac{\\sqrt3}{2}", "\\tfrac{\\sqrt3}{3}"], 45: ["\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt2}{2}", "1"], 60: ["\\tfrac{\\sqrt3}{2}", "\\tfrac12", "\\sqrt3"], 90: ["1", "0", null] };
// Eksakte verdier { s, c, t } som LaTeX (t = null når tan ikke er definert), eller null for andre vinkler.
function tgExact(d){
  if(!tgSpecial(d)) return null; d = mod360(Math.round(d));
  const b = TG_BASE[tgRefA(d)], s = Math.sin(tgRad(d)), c = Math.cos(tgRad(d)), sg = (v, x) => x === "0" ? "0" : (v < 0 ? "-" : "") + x;
  return { s: sg(s, b[0]), c: sg(c, b[1]), t: b[2] === null ? null : sg(s * c, b[2]) };
}
const tgGcd = (a, b) => b ? tgGcd(b, a % b) : a;
// Vinkel i radianer: brøk av π for multipler av 15°, ellers desimaltall.
function tgRadParts(d){
  if(!tgIsInt(d) || Math.round(d) % 15) return null;
  const n = Math.round(d) / 15; if(n === 0) return [0, 1];
  const g = tgGcd(Math.abs(n), 12); return [n / g, 12 / g];
}
function tgRadTex(d){
  const p = tgRadParts(d); if(!p) return mf(tgRad(d), 3); if(p[0] === 0) return "0";
  const a = Math.abs(p[0]), sg = p[0] < 0 ? "-" : "", num = (a === 1 ? "" : a) + "\\pi";
  return sg + (p[1] === 1 ? num : "\\frac{" + num + "}{" + p[1] + "}");
}
function tgRadTxt(d){
  const p = tgRadParts(d); if(!p) return nf(tgRad(d), 2); if(p[0] === 0) return "0";
  const a = Math.abs(p[0]), sg = p[0] < 0 ? "−" : ""; return sg + (a === 1 ? "" : a) + "π" + (p[1] === 1 ? "" : "/" + p[1]);
}
const tgDegTxt = d => nf(d, 1) + "°";
const tgDegTex = d => mf(d, 1) + "^\\circ";
const tgAngTex = (d, rad = TG.rad) => rad ? tgRadTex(d) : tgDegTex(d);
const tgAngTxt = (d, rad = TG.rad) => rad ? tgRadTxt(d) : tgDegTxt(d);
const tgV = () => LANG === "en" ? "\\theta" : "v", tgVt = () => LANG === "en" ? "θ" : "v";
const tgRoman = q => ["", "I", "II", "III", "IV"][q];
const tgQuadName = q => T(q + ". kvadrant", "quadrant " + tgRoman(q));
// Pene verdier for a i likningene (fest til eksakte tall når man drar nær dem).
const TG_NICE = [[0, "0"], [0.5, "\\tfrac12"], [Math.SQRT1_2, "\\tfrac{\\sqrt2}{2}"], [Math.sqrt(3) / 2, "\\tfrac{\\sqrt3}{2}"], [1, "1"]];
const TG_NICE_TAN = [[0, "0"], [1 / Math.sqrt(3), "\\tfrac{\\sqrt3}{3}"], [1, "1"], [Math.sqrt(3), "\\sqrt3"]];
function tgNice(a, list){ const m = list.find(x => Math.abs(Math.abs(a) - x[0]) < 1e-9); return m ? (a < 0 && m[1] !== "0" ? "-" : "") + m[1] : null; }
function tgSnapNice(a, list, tol){ const m = list.find(x => Math.abs(Math.abs(a) - x[0]) < tol); return m ? Math.sign(a || 1) * m[0] : a; }
const tgPick = a => a[Math.floor(Math.random() * a.length)];

// ---------- SVG-byggesteiner ----------
const tf1 = x => (+x).toFixed(1);
const tgL = (x1, y1, x2, y2, col, w = 2, extra = "") => `<line x1="${tf1(x1)}" y1="${tf1(y1)}" x2="${tf1(x2)}" y2="${tf1(y2)}" style="stroke:${col};stroke-width:${w}" stroke-linecap="round" ${extra}/>`;
const tgT = (x, y, s, col = "var(--ink)", anc = "middle", size = 13, w = 700) => `<text x="${tf1(x)}" y="${tf1(y)}" text-anchor="${anc}" dominant-baseline="central" style="fill:${col};font-size:${size}px;font-weight:${w}">${esc(s)}</text>`;
const tgDot = (x, y, col, r = 5, extra = "") => `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="${r}" style="fill:${col}" ${extra}/>`;
function tgArc(r, a0, a1, col, w = 3, cx = 0, cy = 0, extra = ""){
  if(Math.abs(a1 - a0) < 0.5) return "";
  if(Math.abs(a1 - a0) >= 359.9) return `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${col};stroke-width:${w}" ${extra}/>`;
  const x0 = cx + r * Math.cos(tgRad(a0)), y0 = cy - r * Math.sin(tgRad(a0)), x1 = cx + r * Math.cos(tgRad(a1)), y1 = cy - r * Math.sin(tgRad(a1));
  return `<path d="M${tf1(x0)} ${tf1(y0)} A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 0 : 1} ${tf1(x1)} ${tf1(y1)}" style="fill:none;stroke:${col};stroke-width:${w}" stroke-linecap="round" ${extra}/>`;
}
const tgArrow = (x, y, dir, col) => { const p = dir === "r" ? [[x, y], [x - 9, y - 4.5], [x - 9, y + 4.5]] : [[x, y], [x - 4.5, y + 9], [x + 4.5, y + 9]]; return `<polygon points="${p.map(q => q.map(tf1).join(",")).join(" ")}" style="fill:${col}"/>`; };
function tgAxes(ext = 150, cx = 0, cy = 0, r = TG_R, lbl = true){
  const m = "var(--muted)";
  return tgL(cx - ext, cy, cx + ext, cy, m, 1.3) + tgArrow(cx + ext + 2, cy, "r", m) + tgL(cx, cy + ext, cx, cy - ext, m, 1.3) + tgArrow(cx, cy - ext - 2, "u", m) +
    (lbl ? tgT(cx + ext - 4, cy + 14, "x", m, "middle", 13, 600) + tgT(cx + 12, cy - ext + 4, "y", m, "middle", 13, 600) +
    tgT(cx + r + 8, cy + 13, "1", m, "start", 11, 600) + tgT(cx - r - 6, cy + 13, "−1", m, "end", 11, 600) + tgT(cx - 7, cy - r - 8, "1", m, "end", 11, 600) + tgT(cx - 7, cy + r + 9, "−1", m, "end", 11, 600) : "");
}
function tgBase(cx = 0, cy = 0, r = TG_R, ticks = true){
  return tgAxes(r + 30, cx, cy, r) + `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:var(--ink);stroke-width:2;opacity:.55"/>` +
    (ticks ? TG_SPECIALS.map(d => { const [x, y] = tgP(d, r); return tgDot(cx + x, cy + y, "var(--muted)", 2.4, 'opacity=".7"'); }).join("") : "");
}
const tgHandle = (x, y, col = "var(--accent)", pulse = false) => `${pulse ? `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="14" class="tg-pulse" style="fill:${col}"/>` : ""}<circle cx="${tf1(x)}" cy="${tf1(y)}" r="22" style="fill:transparent" class="tg-hit"/><circle cx="${tf1(x)}" cy="${tf1(y)}" r="8.5" style="fill:${col};stroke:var(--card);stroke-width:3"/>`;
// Projeksjonene: cos langs x-aksen (blå), sin loddrett (rød), og radien.
function tgProj(d, cx = 0, cy = 0, r = TG_R, thick = 5, labels = true){
  const [x, y] = tgP(d, r), s = Math.sin(tgRad(d)), c = Math.cos(tgRad(d));
  let g = tgL(cx + x, cy + y, cx, cy + y, "var(--c1)", 1.2, 'stroke-dasharray="3 3" opacity=".7"') + tgL(cx, cy, cx + x, cy, "var(--c3)", thick) + tgL(cx + x, cy, cx + x, cy + y, "var(--c1)", thick) + tgL(cx, cy, cx + x, cy + y, "var(--ink)", 2.4);
  if(labels){
    if(Math.abs(x) > 22) g += tgT(cx + x / 2, cy + (s >= 0 ? 14 : -14), "cos", "var(--c3)", "middle", 12);
    if(Math.abs(y) > 22) g += tgT(cx + x + (c >= 0 ? 8 : -8), cy + y / 2, "sin", "var(--c1)", c >= 0 ? "start" : "end", 12);
  }
  return g;
}
// Tall eller eksakt verdi som KaTeX: «\cos v = −\tfrac{\sqrt3}{2} ≈ −0,866».
function tgValTex(lbl, exact, num){
  if(exact != null) return `${lbl} = ${exact}` + (/\\/.test(exact) ? ` \\approx ${mf(num, 3)}` : "");
  return `${lbl} \\approx ${mf(num, 3)}`;
}
const tgValBox = (col, texStr) => `<div class="tg-val" style="--k:${col}">${tex(texStr)}</div>`;

// ---------- stasjon 1: Utforsk ----------
const TG_GOALS = {
  explore: [["Gjør sin v så stor som mulig.", "Make sin θ as large as possible.", v => v === 90],
    ["Finn vinkelen der cos v = −1.", "Find the angle where cos θ = −1.", v => v === 180],
    ["Finn en vinkel der sin v = ½ og cos v er negativ.", "Find an angle where sin θ = ½ and cos θ is negative.", v => v === 150],
    ["Finn en vinkel i 3. kvadrant der tan v = 1.", "Find an angle in quadrant III where tan θ = 1.", v => v === 225],
    ["Finn en vinkel der cos v = ½ og sin v er negativ.", "Find an angle where cos θ = ½ and sin θ is negative.", v => v === 300]],
  radians: [["Lag en bue som er nøyaktig π lang.", "Make an arc that is exactly π long.", v => v === 180],
    ["Still inn 3π/2.", "Set 3π/2.", v => v === 270],
    ["Finn vinkelen der buen er 1,5 radier lang (på to desimaler).", "Find the angle where the arc is 1.5 radii long (to two decimals).", v => Math.abs(tgRad(v) - 1.5) < 0.005],
    ["Gå en hel runde: 2π.", "Go a full turn: 2π.", v => v === 360]],
  graphs: [["Gjør perioden lik π.", "Make the period equal to π.", () => TG.k === 2],
    ["Få grafen til å svinge mellom −1 og 3.", "Make the graph oscillate between −1 and 3.", () => Math.abs(TG.A) === 2 && TG.d === 1],
    ["Flytt grafen så den starter på toppen, f(0) er størst (da blir det en cos-graf!).", "Shift the graph so it starts at the top, f(0) is the largest (it becomes a cos graph!).", () => Math.abs(TG.A * Math.sin(TG.ph * Math.PI / 4) - Math.abs(TG.A)) < 1e-9 && TG.A !== 0]]
};
const tgGoalKey = (st, i) => st + ":" + i;
const tgGoalDone = (st, i) => !!(S.tgGoals || {})[tgGoalKey(st, i)];
function tgGoalsHTML(st){
  const G = TG_GOALS[st]; if(!G) return "";
  const n = G.filter((g, i) => tgGoalDone(st, i)).length;
  return `<div class="tg-goals"><h4>🎯 ${esc(T("Utfordringer", "Challenges"))} <span>${n}/${G.length}</span></h4>${G.map((g, i) => `<p class="${tgGoalDone(st, i) ? "ok" : ""}"><i>${tgGoalDone(st, i) ? "✓" : i + 1}</i>${esc(T(g[0], g[1]))}</p>`).join("")}</div>`;
}
function tgCheckGoals(){
  const G = TG_GOALS[TG.st]; if(!G) return;
  let hit = false; G.forEach((g, i) => { if(!tgGoalDone(TG.st, i) && g[2](Math.round(TG.v * 1000) / 1000)){ (S.tgGoals ||= {})[tgGoalKey(TG.st, i)] = 1; hit = true; } });
  if(!hit) return;
  save(); const el = document.getElementById("tggoals"); if(el){ el.innerHTML = tgGoalsHTML(TG.st); burst(el.querySelector("p.ok:last-of-type") || el, 10); }
  sfx("ok", 3); buzz(true); toast(T("Utfordring løst! 🎉", "Challenge solved! 🎉"));
}
function tgExplore(){
  const v = TG.v, [px, py] = tgP(v), s = Math.sin(tgRad(v)), c = Math.cos(tgRad(v)), q = tgQuad(v), ex = tgExact(v), V = tgV();
  let g = "";
  if(q){ const sx = q === 1 || q === 4 ? 0 : -150, sy = q <= 2 ? -150 : 0; g += `<rect x="${sx}" y="${sy}" width="150" height="150" rx="10" style="fill:var(--accent);opacity:.08"/>`; }
  g += [[1, 62, -62], [2, -62, -62], [3, -62, 62], [4, 62, 62]].map(([k, x, y]) => tgT(x, y, tgRoman(k), "var(--muted)", "middle", 15, k === q ? 800 : 500)).join("");
  g += tgBase();
  if(TG.tan && Math.abs(c) > 1e-9){
    const ty = -TG_R * s / c; g += tgL(TG_R, -150, TG_R, 150, "var(--c4)", 1.2, 'stroke-dasharray="3 4" opacity=".6"');
    if(Math.abs(ty) <= 152){ g += tgL(0, 0, TG_R, ty, "var(--c4)", 1.6, 'stroke-dasharray="6 4"') + tgL(TG_R, 0, TG_R, ty, "var(--c4)", 5) + tgDot(TG_R, ty, "var(--c4)", 4.5) + tgT(TG_R + 8, ty / 2, "tan", "var(--c4)", "start", 12); }
  }
  if(TG.ref && q){ const r0 = q === 1 ? 0 : q === 4 ? 360 : 180; g += tgArc(44, r0, v, "var(--c5)", 3.5); const m = (r0 + v) / 2, [lx, ly] = tgP(m, 62); g += tgT(lx, ly, tgAngTxt(tgRefA(v)), "var(--c5)", "middle", 12); }
  g += tgArc(26, 0, v, "var(--c2)", 3); if(v > 8){ const [lx, ly] = tgP(v / 2, TG.ref ? 16 : 40); if(!TG.ref) g += tgT(lx, ly, tgAngTxt(v), "var(--c2)", "middle", 12); }
  if(TG.eul) g += tgT(152, -14, "Re", "var(--muted)", "end", 12, 700) + tgT(-8, -146, "Im", "var(--muted)", "end", 12, 700) + `<text x="${tf1(px + (c >= 0 ? 14 : -14))}" y="${tf1(py + (s >= 0 ? -32 : 32))}" text-anchor="${c >= 0 ? "start" : "end"}" style="fill:var(--accent);font-size:14px;font-weight:800;font-style:italic">e<tspan dy="-6" style="font-size:10px">i${tgVt()}</tspan></text>`;
  g += tgProj(v) + tgHandle(px, py, "var(--accent)", !TG.touched) + tgT(px + (c >= 0 ? 14 : -14), py + (s >= 0 ? -14 : 14), "P", "var(--ink)", c >= 0 ? "start" : "end", 13);
  const tn = Math.abs(c) < 1e-9 ? null : s / c;
  const sgn = x => Math.abs(x) < 1e-9 ? "0" : x > 0 ? T("positiv", "positive") : T("negativ", "negative");
  const where = q ? `<b>${esc(tgQuadName(q))}</b>: sin ${esc(sgn(s))}, cos ${esc(sgn(c))}. ${esc(T("Referansevinkel", "Reference angle"))} ${esc(tgAngTxt(tgRefA(v)))}.` : esc(T("Punktet ligger på en akse.", "The point is on an axis."));
  const read = `<div class="tg-vals">${tgValBox("var(--c2)", `${V} = ${tgDegTex(v)} = ${tgRadTex(v)}${tgRadParts(v) && v ? " \\approx " + mf(tgRad(v), 3) : ""}`)}
      ${tgValBox("var(--c3)", tgValTex(`\\cos ${V}`, ex && ex.c, c))}${tgValBox("var(--c1)", tgValTex(`\\sin ${V}`, ex && ex.s, s))}
      ${tn === null ? `<div class="tg-val" style="--k:var(--c4)">${tex(`\\tan ${V}`)} ${esc(T("er ikke definert (cos = 0)", "is undefined (cos = 0)"))}</div>` : tgValBox("var(--c4)", tgValTex(`\\tan ${V} = \\tfrac{\\sin ${V}}{\\cos ${V}}`, ex && ex.t, tn))}</div>
    ${TG.eul ? tgEulerHTML(v, c, s, ex, V) : ""}<p class="tg-where">${where}</p><p class="tg-id">${tex(`\\sin^2 ${V} + \\cos^2 ${V} = ${mf(s * s, 3)} + ${mf(c * c, 3)} = 1`)}</p>`;
  return { svg: g, read };
}

// Eulers formel: punktet P er det komplekse tallet e^{iv} = cos v + i sin v (Re langs x-aksen, Im langs y-aksen).
function tgEulerHTML(v, c, s, ex, V){
  const cT = ex && ex.c != null ? ex.c : mf(c, 3), sT0 = ex && ex.s != null ? ex.s : mf(s, 3), neg = /^[-−]/.test(String(sT0)), sT = String(sT0).replace(/^[-−]\s*/, "");
  const z = Math.abs(s) < 1e-9 ? `${cT}` : Math.abs(c) < 1e-9 ? `${neg ? "-" : ""}${sT === "1" ? "" : sT}\\,i` : `${cT} ${neg ? "-" : "+"} ${sT === "1" ? "" : sT}\\,i`;
  const pi = tgIsInt(v) && mod360(Math.round(v)) === 180 && v > 0;
  return `<div class="tg-val tg-eul" style="--k:var(--accent)">${tex(`e^{i${V}} = \\cos ${V} + i\\sin ${V} = ${z}`)}</div>
    <p class="tg-where">${esc(T("Eulers formel: punktet P er det komplekse tallet ", "Euler's formula: the point P is the complex number "))}${tex(`e^{i${V}}`)}${esc(T(". Realdelen er cos (x-aksen), imaginærdelen er sin (y-aksen), og |", ". The real part is cos (x axis), the imaginary part is sin (y axis), and |"))}${tex(`e^{i${V}}`)}| = 1.${pi ? " " + esc(T("Ved π får du den berømte ", "At π you get the famous ")) + tex("e^{i\\pi} + 1 = 0") + "." : ""}</p>`;
}

// ---------- stasjon 2: Eksakte verdier ----------
function tgExactFig(){
  const R = TG_R; let g = tgBase(0, 0, R, TG.ex === "all"), read = "";
  if(TG.ex === "45"){
    const a = R * Math.SQRT1_2;
    g += `<rect x="0" y="${tf1(-a)}" width="${tf1(a)}" height="${tf1(a)}" style="fill:none;stroke:var(--muted);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    g += `<polygon points="0,0 ${tf1(a)},0 ${tf1(a)},${tf1(-a)}" style="fill:var(--c2);opacity:.16"/>` + tgL(0, 0, a, 0, "var(--c3)", 5) + tgL(a, 0, a, -a, "var(--c1)", 5) + tgL(0, 0, a, -a, "var(--ink)", 2.6);
    g += `<path d="M${tf1(a - 11)} 0 V-11 H${tf1(a)}" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>` + tgArc(26, 0, 45, "var(--c2)", 3) + tgT(44, -13, "45°", "var(--c2)", "start", 12);
    g += tgT(a / 2, 16, "√2/2", "var(--c3)") + tgT(a + 8, -a / 2, "√2/2", "var(--c1)", "start") + tgT(a / 2 - 14, -a / 2 - 12, "1", "var(--ink)", "end", 15) + tgHandle(a, -a, "var(--accent)");
    read = `<ol class="tg-steps"><li>${T("Punktet på 45° ligger like langt ut som opp, så", "The point at 45° is as far across as it is up, so")} ${tex("x = y")}.</li>
      <li>${T("Radien er 1. Pytagoras gir", "The radius is 1. Pythagoras gives")} ${tex("x^2 + x^2 = 1 \\Rightarrow 2x^2 = 1 \\Rightarrow x = \\tfrac{1}{\\sqrt2} = \\tfrac{\\sqrt2}{2}")}.</li>
      <li>${T("Altså", "So")} ${tex("\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt2}{2} \\approx " + mf(Math.SQRT1_2, 3))}. ${T("Trekanten er et halvt kvadrat med diagonal 1.", "The triangle is half a square with diagonal 1.")}</li></ol>`;
  } else if(TG.ex === "3060"){
    const [x6, y6] = tgP(60), [x3, y3] = tgP(30);
    if(TG.e36 === 60){
      g += `<polygon points="0,0 ${R},0 ${tf1(x6)},${tf1(y6)}" style="fill:var(--c2);opacity:.14"/>` + tgL(0, 0, R, 0, "var(--muted)", 2) + tgL(R, 0, x6, y6, "var(--muted)", 2) + tgL(0, 0, x6, y6, "var(--ink)", 2.6);
      g += tgL(x6, y6, x6, 0, "var(--c1)", 5) + tgL(0, 0, x6, 0, "var(--c3)", 5) + `<path d="M${tf1(x6 - 10)} 0 V-10 H${tf1(x6)}" style="fill:none;stroke:var(--ink);stroke-width:1.3"/>`;
      g += tgArc(24, 0, 60, "var(--c2)", 3) + tgT(33, -22, "60°", "var(--c2)", "start", 12) + tgT(x6 / 2, 16, "½", "var(--c3)", "middle", 15) + tgT((x6 + R) / 2, 16, "½", "var(--muted)", "middle", 15);
      g += tgT(x6 + 8, y6 / 2, "√3/2", "var(--c1)", "start") + tgT(x6 / 2 - 12, y6 / 2 - 6, "1", "var(--ink)", "end", 15) + tgT((x6 + R) / 2 + 12, y6 / 2 - 4, "1", "var(--muted)", "start", 15) + tgHandle(x6, y6, "var(--accent)");
      read = `<ol class="tg-steps"><li>${T("Trekanten med hjørner i", "The triangle with corners at")} ${tex("O")}, ${tex("P")} ${T("og", "and")} ${tex("(1, 0)")} ${T("har to sider lik 1 (radier) og 60° mellom dem. Da er den likesidet: alle sider er 1.", "has two sides equal to 1 (radii) and 60° between them. So it is equilateral: all sides are 1.")}</li>
        <li>${T("Høyden fra P deler grunnlinjen på midten, så", "The height from P cuts the base in half, so")} ${tex("\\cos 60^\\circ = \\tfrac12")}.</li>
        <li>${T("Pytagoras:", "Pythagoras:")} ${tex("\\sin 60^\\circ = \\sqrt{1 - \\left(\\tfrac12\\right)^2} = \\sqrt{\\tfrac34} = \\tfrac{\\sqrt3}{2} \\approx " + mf(Math.sqrt(3) / 2, 3))}.</li></ol>`;
    } else {
      g += tgL(-10, 10, 135, -135, "var(--c5)", 1.6, 'stroke-dasharray="6 5"') + tgT(118, -134, "y = x", "var(--c5)", "end", 12);
      g += tgL(0, 0, x6, y6, "var(--muted)", 1.6, 'stroke-dasharray="4 4"') + tgDot(x6, y6, "var(--muted)", 4) + tgL(x6, y6, x3, y3, "var(--c5)", 1.3, 'stroke-dasharray="2 4"');
      g += `<polygon points="0,0 ${tf1(x3)},0 ${tf1(x3)},${tf1(y3)}" style="fill:var(--c2);opacity:.14"/>` + tgL(0, 0, x3, 0, "var(--c3)", 5) + tgL(x3, 0, x3, y3, "var(--c1)", 5) + tgL(0, 0, x3, y3, "var(--ink)", 2.6);
      g += tgArc(30, 0, 30, "var(--c2)", 3) + tgT(40, -9, "30°", "var(--c2)", "start", 12) + tgT(x3 / 2, 16, "√3/2", "var(--c3)") + tgT(x3 + 8, y3 / 2, "½", "var(--c1)", "start", 15) + tgHandle(x3, y3, "var(--accent)") + tgT(x6 - 8, y6 - 10, "60°", "var(--muted)", "end", 11, 600);
      read = `<ol class="tg-steps"><li>${T("Speil punktet på 60° i linjen", "Mirror the point at 60° in the line")} ${tex("y = x")}. ${T("Da havner det på 30°, og x og y bytter plass.", "It lands at 30°, and x and y swap places.")}</li>
        <li>${tex("\\cos 30^\\circ = \\sin 60^\\circ = \\tfrac{\\sqrt3}{2}")} ${T("og", "and")} ${tex("\\sin 30^\\circ = \\cos 60^\\circ = \\tfrac12")}.</li>
        <li>${T("Generelt:", "In general:")} ${tex("\\sin(90^\\circ - " + tgV() + ") = \\cos " + tgV())}.</li></ol>`;
    }
  } else {
    const sel = TG.exSel;
    TG_SPECIALS.forEach(d => { const [x, y] = tgP(d), [lx, ly] = tgP(d, TG_R + 24), on = d === sel;
      g += `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="${on ? 8 : 5.5}" style="fill:${on ? "var(--accent)" : "var(--card)"};stroke:${on ? "var(--card)" : "var(--accent)"};stroke-width:${on ? 3 : 2}"/>`;
      g += tgT(lx, ly, tgAngTxt(d), on ? "var(--accent)" : "var(--muted)", "middle", 11, on ? 800 : 600); });
    g = g.replace(tgAxes(TG_R + 30), tgAxes(TG_R + 30, 0, 0, TG_R, false)) + tgProj(sel, 0, 0, TG_R, 4, false);
    const ex = tgExact(sel), [x, y] = tgP(sel); g += tgHandle(x, y, "var(--accent)");
    const q = tgQuad(sel), V = tgAngTex(sel);
    read = `<div class="tg-vals">${tgValBox("var(--c2)", `${tgV()} = ${tgDegTex(sel)} = ${tgRadTex(sel)}`)}${tgValBox("var(--ink)", `P = \\left(${ex.c},\\ ${ex.s}\\right)`)}
      ${tgValBox("var(--c3)", `\\cos ${V} = ${ex.c}`)}${tgValBox("var(--c1)", `\\sin ${V} = ${ex.s}`)}</div>
      <p class="tg-where">${q ? `${esc(T("Referansevinkel", "Reference angle"))} ${tex(tgAngTex(tgRefA(sel)))}. ${esc(tgQuadName(q))}: ${esc(T(`x er ${q === 1 || q === 4 ? "positiv" : "negativ"} og y er ${q <= 2 ? "positiv" : "negativ"}.`, `x is ${q === 1 || q === 4 ? "positive" : "negative"} and y is ${q <= 2 ? "positive" : "negative"}.`))}` : esc(T("På aksene er én koordinat 0 og den andre ±1.", "On the axes one coordinate is 0 and the other is ±1."))}</p>
      <p class="picknote">${esc(T("Trykk eller dra til et annet punkt. Alle 16 punktene kommer fra 30°-, 45°- og 60°-trekantene, bare speilet.", "Tap or drag to another point. All 16 points come from the 30°, 45° and 60° triangles, just mirrored."))}</p>`;
  }
  return { svg: g, read };
}
function tgMemoHTML(){
  const hd = [0, 30, 45, 60, 90], sq = ["\\tfrac{\\sqrt0}{2}", "\\tfrac{\\sqrt1}{2}", "\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt3}{2}", "\\tfrac{\\sqrt4}{2}"], sv = ["0", "\\tfrac12", "\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt3}{2}", "1"];
  return `<div class="tg-memo"><h4>🧠 ${esc(T("Huskeregel", "Memory trick"))}</h4><p>${esc(T("Tell 0, 1, 2, 3, 4 under rottegnet og del på 2. Cosinus er det samme baklengs.", "Count 0, 1, 2, 3, 4 under the root and divide by 2. Cosine is the same backwards."))}</p>
    <div class="tg-tab"><table><tr><th>${tex(tgV())}</th>${hd.map(d => `<th>${tex(tgAngTex(d))}</th>`).join("")}</tr>
    <tr><th class="s">sin</th>${sq.map((x, i) => `<td>${tex(x + (i % 4 ? "" : " = " + sv[i]))}</td>`).join("")}</tr><tr><th class="s">&nbsp;</th>${sv.map(x => `<td class="v">${tex(x)}</td>`).join("")}</tr>
    <tr><th class="c">cos</th>${sv.slice().reverse().map(x => `<td class="v">${tex(x)}</td>`).join("")}</tr>
    <tr><th class="t">tan</th>${["0", "\\tfrac{\\sqrt3}{3}", "1", "\\sqrt3", "\\text{–}"].map(x => `<td class="v">${tex(x)}</td>`).join("")}</tr></table></div></div>`;
}

// ---------- stasjon 3: Radianer ----------
function tgRadians(){
  const v = TG.v, [px, py] = tgP(v); let g = tgBase(0, 0, TG_R, false);
  for(let k = 1; k <= 6; k++){ const d = tgDeg(k), [a, b] = tgP(d, TG_R - 7), [c, e] = tgP(d, TG_R + 7), [lx, ly] = tgP(d, TG_R + 20); g += tgL(a, b, c, e, "var(--muted)", 1.6) + tgT(lx, ly, k === 1 ? "1 rad" : String(k), "var(--muted)", "middle", 11, 600); }
  g += tgL(0, 0, TG_R, 0, "var(--c3)", 4) + tgT(TG_R / 2, 14, "r = 1", "var(--c3)", "middle", 12);
  g += tgArc(TG_R, 0, v, "var(--c2)", 7, 0, 0, 'opacity=".9"') + tgL(0, 0, px, py, "var(--ink)", 2.2) + tgArc(20, 0, v, "var(--ink)", 1.6, 0, 0, 'opacity=".6"');
  if(v > 12){ const [lx, ly] = tgP(v / 2, TG_R - 26); g += tgT(lx, ly, "b = " + nf(tgRad(v), 2), "var(--c2)", "middle", 12); }
  g += tgHandle(px, py, "var(--accent)", !TG.touched);
  const V = tgV(), p = tgRadParts(v);
  const read = `<div class="tg-vals">${tgValBox("var(--c2)", `${V} = ${tgDegTex(v)} = ${mf(v, 1)}\\cdot\\tfrac{\\pi}{180} = ${tgRadTex(v)}${p && v ? " \\approx " + mf(tgRad(v), 3) : ""}`)}</div>
    <p class="tg-where">${esc(T("Buen er", "The arc is"))} <b>${esc(nf(tgRad(v), 3))}</b> ${esc(T("radier lang. Det er hele poenget: vinkelen i radianer er buelengden på enhetssirkelen.", "radii long. That is the whole point: the angle in radians is the arc length on the unit circle."))}</p>
    <p class="tg-id">${tex("360^\\circ = 2\\pi \\qquad 180^\\circ = \\pi \\qquad 1 \\text{ rad} = \\tfrac{180^\\circ}{\\pi} \\approx " + mf(180 / Math.PI, 1) + "^\\circ")}</p>`;
  return { svg: g, read };
}

// ---------- stasjon 4: Symmetri ----------
const TG_SYM = { m180: [d => 180 - d, "180^\\circ - ", "180° − ", "π − "], p180: [d => 180 + d, "180^\\circ + ", "180° + ", "π + "], neg: [d => -d, "-", "−", "−"], c90: [d => 90 - d, "90^\\circ - ", "90° − ", "π/2 − "] };
function tgSym(){
  const v = TG.v, m = TG_SYM[TG.sym], w = m[0](v), [px, py] = tgP(v), [qx, qy] = tgP(w), V = tgV(), Vt = tgVt();
  let g = tgBase();
  if(TG.sym === "m180") g += tgL(0, -150, 0, 150, "var(--c5)", 5, 'opacity=".35"');
  if(TG.sym === "neg") g += tgL(-150, 0, 150, 0, "var(--c5)", 5, 'opacity=".35"');
  if(TG.sym === "c90") g += tgL(-130, 130, 130, -130, "var(--c5)", 3, 'stroke-dasharray="7 5" opacity=".7"') + tgT(126, -138, "y = x", "var(--c5)", "end", 12);
  if(TG.sym === "p180") g += tgDot(0, 0, "var(--c5)", 6);
  g += tgL(px, py, qx, qy, "var(--c5)", 1.8, 'stroke-dasharray="4 4"');
  g += tgProj(w, 0, 0, TG_R, 3, false).replace(/var\(--c3\)/g, "var(--c3)").replace(/var\(--ink\)/g, "var(--muted)") + tgProj(v, 0, 0, TG_R, 4.5, false);
  g += `<circle cx="${tf1(qx)}" cy="${tf1(qy)}" r="8" style="fill:var(--c5);stroke:var(--card);stroke-width:3"/>` + tgHandle(px, py, "var(--accent)", !TG.touched);
  const lab = (x, y, s, col) => tgT(x + (x >= 0 ? 12 : -12), y + (y <= 0 ? -12 : 12), s, col, x >= 0 ? "start" : "end", 12);
  g += lab(px, py, Vt, "var(--accent)") + lab(qx, qy, (TG.rad ? m[3] : m[2]) + Vt, "var(--c5)");
  const s = Math.sin(tgRad(v)), c = Math.cos(tgRad(v)), W = m[1] + V, pre = TG.rad ? { m180: "\\pi - ", p180: "\\pi + ", neg: "-", c90: "\\tfrac{\\pi}{2} - " }[TG.sym] + V : `${W}`;
  const F = { m180: [["\\sin", "\\sin " + V], ["\\cos", "-\\cos " + V], ["\\tan", "-\\tan " + V]], p180: [["\\sin", "-\\sin " + V], ["\\cos", "-\\cos " + V], ["\\tan", "\\tan " + V]],
    neg: [["\\sin", "-\\sin " + V], ["\\cos", "\\cos " + V], ["\\tan", "-\\tan " + V]], c90: [["\\sin", "\\cos " + V], ["\\cos", "\\sin " + V], ["\\tan", "\\tfrac{1}{\\tan " + V + "}"]] }[TG.sym];
  const why = { m180: T("Speiling i y-aksen: y-koordinaten (sin) er den samme, x-koordinaten (cos) skifter fortegn.", "Reflection in the y-axis: the y-coordinate (sin) stays the same, the x-coordinate (cos) changes sign."),
    p180: T("Et halvt omløp: punktet havner rett overfor, så både x og y skifter fortegn. Da blir tan uendret.", "Half a turn: the point ends up directly opposite, so both x and y change sign. Then tan is unchanged."),
    neg: T("Speiling i x-aksen: x-koordinaten (cos) er den samme, y-koordinaten (sin) skifter fortegn.", "Reflection in the x-axis: the x-coordinate (cos) stays the same, the y-coordinate (sin) changes sign."),
    c90: T("Speiling i linjen y = x: x og y bytter plass, så sin og cos bytter plass.", "Reflection in the line y = x: x and y swap, so sin and cos swap.") }[TG.sym];
  const live = { m180: [`\\sin ${tgAngTex(w)} = ${mf(Math.sin(tgRad(w)), 3)} = \\sin ${tgAngTex(v)}`], p180: [`\\sin ${tgAngTex(w)} = ${mf(Math.sin(tgRad(w)), 3)} = -\\sin ${tgAngTex(v)}`],
    neg: [`\\cos(${tgAngTex(w)}) = ${mf(Math.cos(tgRad(w)), 3)} = \\cos ${tgAngTex(v)}`], c90: [`\\sin ${tgAngTex(w)} = ${mf(Math.sin(tgRad(w)), 3)} = \\cos ${tgAngTex(v)}`] }[TG.sym];
  const read = `<div class="tg-forms">${F.map(f => `<p>${tex(`${f[0]}(${pre}) = ${f[1]}`)}</p>`).join("")}</div><p class="tg-where">${esc(why)}</p>
    <p class="tg-id">${esc(T("Sjekk med tall:", "Check with numbers:"))} ${tex(live[0])}</p>`;
  void s; void c;
  return { svg: g, read };
}

// ---------- stasjon 5: Grafer ----------
const TG_GX = 250, TG_GW = 360, TG_GR = 95, TG_CX = 125, TG_CY = 150;
function tgGraphs(){
  if(TG.gr === "trans") return tgTrans();
  const v = mod360(TG.v) === 0 && TG.v > 0 ? 360 : mod360(TG.v), f = TG.fn === "sin" ? Math.sin : Math.cos, col = TG.fn === "sin" ? "var(--c1)" : "var(--c3)", X = d => TG_GX + d * TG_GW / 360, Y = y => TG_CY - y * TG_GR;
  let g = tgAxes(TG_GR + 22, TG_CX, TG_CY, TG_GR, false) + `<circle cx="${TG_CX}" cy="${TG_CY}" r="${TG_GR}" style="fill:none;stroke:var(--ink);stroke-width:2;opacity:.55"/>`;
  g += tgL(TG_GX - 4, TG_CY, TG_GX + TG_GW + 16, TG_CY, "var(--muted)", 1.3) + tgArrow(TG_GX + TG_GW + 20, TG_CY, "r", "var(--muted)") + tgL(TG_GX, TG_CY + TG_GR + 16, TG_GX, TG_CY - TG_GR - 16, "var(--muted)", 1.3) + tgArrow(TG_GX, TG_CY - TG_GR - 18, "u", "var(--muted)");
  [90, 180, 270, 360].forEach(d => { g += tgL(X(d), TG_CY - 4, X(d), TG_CY + 4, "var(--muted)", 1.3) + tgT(X(d), TG_CY + 16, tgAngTxt(d), "var(--muted)", "middle", 11, 600); });
  g += tgL(TG_GX - 4, Y(1), TG_GX + TG_GW, Y(1), "var(--muted)", 1, 'stroke-dasharray="2 5" opacity=".6"') + tgL(TG_GX - 4, Y(-1), TG_GX + TG_GW, Y(-1), "var(--muted)", 1, 'stroke-dasharray="2 5" opacity=".6"') + tgT(TG_GX - 8, Y(1), "1", "var(--muted)", "end", 11, 600) + tgT(TG_GX - 8, Y(-1), "−1", "var(--muted)", "end", 11, 600);
  const path = (a, b) => { let s = ""; for(let d = a; d <= b + 1e-9; d += 2) s += (s ? " L" : "M") + tf1(X(d)) + " " + tf1(Y(f(tgRad(d)))); const e = X(b); return s + " L" + tf1(e) + " " + tf1(Y(f(tgRad(b)))); };
  g += `<path d="${path(0, 360)}" style="fill:none;stroke:${col};stroke-width:2;opacity:.25"/>` + (v > 0 ? `<path d="${path(0, v)}" style="fill:none;stroke:${col};stroke-width:3.4" stroke-linecap="round"/>` : "");
  const [px, py] = tgP(v, TG_GR), cx = TG_CX + px, cy = TG_CY + py, gx = X(v), gy = Y(f(tgRad(v)));
  g += tgArc(18, 0, v, "var(--c2)", 2.6, TG_CX, TG_CY);
  if(TG.fn === "sin"){ g += tgL(cx, TG_CY, cx, cy, "var(--c1)", 4.5) + tgL(cx, cy, gx, gy, "var(--c1)", 1.3, 'stroke-dasharray="4 4" opacity=".75"'); }
  else { g += tgL(TG_CX, TG_CY, cx, TG_CY, "var(--c3)", 4.5); }
  g += tgL(TG_CX, TG_CY, cx, cy, "var(--ink)", 2) + tgL(gx, TG_CY, gx, gy, col, 4.5) + tgHandle(gx, gy, col, false) + tgHandle(cx, cy, "var(--accent)", !TG.touched);
  const V = tgV(), val = f(tgRad(v)), ex = tgExact(v);
  const read = `<div class="tg-vals">${tgValBox("var(--c2)", `x = ${tgAngTex(v)}`)}${tgValBox(col, tgValTex(`\\${TG.fn} x`, ex && (TG.fn === "sin" ? ex.s : ex.c), val))}</div>
    <p class="tg-where">${esc(TG.fn === "sin" ? T("Grafen er høyden (y-koordinaten) til punktet mens det går rundt. Dra enten i sirkelen eller langs grafen.", "The graph is the height (y-coordinate) of the point as it goes round. Drag either in the circle or along the graph.")
      : T("Grafen er x-koordinaten til punktet mens det går rundt. Den starter på 1 fordi punktet starter helt til høyre.", "The graph is the x-coordinate of the point as it goes round. It starts at 1 because the point starts all the way to the right."))}</p>
    <p class="tg-id">${esc(T("Etter en hel runde gjentar alt seg: perioden er", "After a full turn everything repeats: the period is"))} ${tex("360^\\circ = 2\\pi")}.</p>`;
  void V;
  return { svg: g, read, vb: "0 0 640 300" };
}
const TG_PH = ["-\\pi", "-\\tfrac{3\\pi}{4}", "-\\tfrac{\\pi}{2}", "-\\tfrac{\\pi}{4}", "0", "\\tfrac{\\pi}{4}", "\\tfrac{\\pi}{2}", "\\tfrac{3\\pi}{4}", "\\pi"];
function tgTrans(){
  const L = 44, W = 570, X = x => L + x / (4 * Math.PI) * W, Y = y => 150 - y * 30, A = TG.A, k = TG.k, ph = TG.ph * Math.PI / 4, d = TG.d, f = x => A * Math.sin(k * x + ph) + d;
  let g = tgL(L - 6, 150, L + W + 14, 150, "var(--muted)", 1.3) + tgArrow(L + W + 18, 150, "r", "var(--muted)") + tgL(L, 285, L, 12, "var(--muted)", 1.3) + tgArrow(L, 10, "u", "var(--muted)");
  for(let i = 1; i <= 4; i++) g += tgL(X(i * Math.PI), 146, X(i * Math.PI), 154, "var(--muted)", 1.3) + tgT(X(i * Math.PI), 166, (i === 1 ? "" : i) + "π", "var(--muted)", "middle", 11, 600);
  for(let y = -4; y <= 4; y++) if(y) g += tgL(L - 4, Y(y), L + 4, Y(y), "var(--muted)", 1.2) + (y % 2 === 0 ? tgT(L - 8, Y(y), String(y).replace("-", "−"), "var(--muted)", "end", 11, 600) : "");
  const path = fn => { let s = ""; for(let i = 0; i <= 400; i++){ const x = i / 400 * 4 * Math.PI, y = Math.max(-4.8, Math.min(4.8, fn(x))); s += (i ? " L" : "M") + tf1(X(x)) + " " + tf1(Y(y)); } return s; };
  g += `<path d="${path(Math.sin)}" style="fill:none;stroke:var(--muted);stroke-width:1.6;stroke-dasharray:5 5;opacity:.7"/>`;
  g += tgL(L, Y(d), L + W, Y(d), "var(--c4)", 1.4, 'stroke-dasharray="6 4"') + tgL(L, Y(d + Math.abs(A)), L + W, Y(d + Math.abs(A)), "var(--c2)", 1, 'stroke-dasharray="2 5"') + tgL(L, Y(d - Math.abs(A)), L + W, Y(d - Math.abs(A)), "var(--c2)", 1, 'stroke-dasharray="2 5"');
  g += `<path d="${path(f)}" style="fill:none;stroke:var(--accent);stroke-width:3.2" stroke-linecap="round"/>`;
  const p = 2 * Math.PI / k, xs = (((-ph / k) % p) + p) % p, ya = Y(d - Math.abs(A)) + 16;
  if(ya < 290 && xs + p <= 4 * Math.PI) g += tgL(X(xs), ya, X(xs + p), ya, "var(--c5)", 2) + tgL(X(xs), ya - 6, X(xs), ya + 6, "var(--c5)", 2) + tgL(X(xs + p), ya - 6, X(xs + p), ya + 6, "var(--c5)", 2) + tgT((X(xs) + X(xs + p)) / 2, ya + 12, T("periode", "period"), "var(--c5)", "middle", 11);
  if(A) g += tgL(X(0.3), Y(d), X(0.3), Y(d + Math.abs(A)), "var(--c2)", 3) + tgT(X(0.3) + 6, Y(d + Math.abs(A) / 2), "|A|", "var(--c2)", "start", 11);
  const nfT = x => mf(x, 2), sgn = x => x < 0 ? " - " + nfT(-x) : " + " + nfT(x), phT = TG.ph === 0 ? "" : (TG.ph < 0 ? " - " + TG_PH[-TG.ph + 4] : " + " + TG_PH[TG.ph + 4]).replace("- -", "- ");
  const fx = `f(x) = ${A === 1 ? "" : A === -1 ? "-" : nfT(A)}\\sin(${k === 1 ? "" : nfT(k)}x${phT})${d ? sgn(d) : ""}`;
  const read = `<p class="tg-fx">${tex(fx)}</p><div class="tg-vals">${tgValBox("var(--c2)", `\\text{${T("amplitude", "amplitude")}} = |A| = ${nfT(Math.abs(A))}`)}${tgValBox("var(--c5)", `p = \\tfrac{2\\pi}{k} = ${k === 1 ? "2\\pi" : k === 2 ? "\\pi" : k === 4 ? "\\tfrac{\\pi}{2}" : "\\tfrac{2\\pi}{" + nfT(k) + "}"} \\approx ${mf(p, 2)}`)}
    ${tgValBox("var(--c4)", `\\text{${T("likevektslinje", "equilibrium line")}}:\\ y = ${nfT(d)}`)}${tgValBox("var(--accent)", `\\text{${T("faseforskyvning", "phase shift")}} = -\\tfrac{\\varphi}{k} = ${mf(-ph / k, 2)}`)}</div>`;
  return { svg: g, read, vb: "0 0 640 300" };
}

// ---------- stasjon 6: Likninger ----------
function tgEqSol(){
  const a = TG.a;
  if(TG.eq === "sin"){ const x1 = tgDeg(Math.asin(Math.max(-1, Math.min(1, a)))); return { raw: x1, sols: Math.abs(Math.abs(a) - 1) < 1e-9 ? [mod360(x1)] : [mod360(x1), mod360(180 - x1)].sort((p, q) => p - q) }; }
  if(TG.eq === "cos"){ const x1 = tgDeg(Math.acos(Math.max(-1, Math.min(1, a)))); return { raw: x1, sols: Math.abs(Math.abs(a) - 1) < 1e-9 ? [mod360(x1)] : [x1, 360 - x1].sort((p, q) => p - q) }; }
  const x1 = tgDeg(Math.atan(a)); return { raw: x1, sols: [mod360(x1), mod360(x1 + 180)].sort((p, q) => p - q) };
}
const tgRoundA = x => Math.round(x * 1e9) / 1e9;
function tgEq(){
  const a = TG.a, R = TG_R, fn = TG.eq, sol = tgEqSol(), cols = ["var(--c2)", "var(--c5)"];
  let g = tgBase(), hx = 0, hy = 0, col = fn === "sin" ? "var(--c1)" : fn === "cos" ? "var(--c3)" : "var(--c4)";
  if(fn === "sin"){ g += tgL(-150, -a * R, 150, -a * R, col, 2.6); hx = 142; hy = -a * R; g += tgT(-150, -a * R + (a > 0.9 ? -12 : 14), "y = " + nf(a, 3), col, "start", 12); }
  else if(fn === "cos"){ g += tgL(a * R, -150, a * R, 150, col, 2.6); hx = a * R; hy = 142; g += tgT(a * R + 6, -140, "x = " + nf(a, 3), col, "start", 12); }
  else { const ang = Math.atan(a), ux = Math.cos(ang), uy = -Math.sin(ang); g += tgL(R, -150, R, 150, col, 1.2, 'stroke-dasharray="3 4" opacity=".6"') + tgL(-ux * 150, -uy * 150, ux * 150, uy * 150, col, 2.2);
    hx = R; hy = Math.max(-150, Math.min(150, -a * R)); g += tgL(R, 0, R, hy, col, 4.5) + tgT(R + 8, hy / 2, "tan = " + nf(a, 2), col, "start", 12); }
  sol.sols.forEach((d, i) => { const [x, y] = tgP(d), [lx, ly] = tgP(d, R + 20); g += tgArc(24 + 16 * i, 0, d, cols[i], 3) + tgProj(d, 0, 0, R, 0.01, false).replace(/stroke-width:0.01/g, "stroke-width:0") + `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="7.5" style="fill:${cols[i]};stroke:var(--card);stroke-width:2.5"/>` + tgT(lx, ly, "x" + "₁₂"[i], cols[i], "middle", 13, 800); });
  g += tgHandle(hx, hy, col, !TG.touched);
  const nice = fn === "tan" ? tgNice(tgRoundA(a), TG_NICE_TAN) : tgNice(tgRoundA(a), TG_NICE), aT = nice || mf(a, 3);
  const ang = d => tgSpecial(Math.round(d * 1e6) / 1e6) ? tgAngTex(Math.round(d)) : TG.rad ? mf(tgRad(d), 3) : mf(d, 1) + "^\\circ";
  const per = TG.rad ? (fn === "tan" ? "\\pi" : "2\\pi") : (fn === "tan" ? "180^\\circ" : "360^\\circ"), inv = `\\${fn}^{-1}`;
  const half = TG.rad ? "\\pi" : "180^\\circ", x1 = sol.raw;
  let steps = `<p>${tex(`\\${fn} x = ${aT}`)}</p><p>${tex(`x = ${inv}\\!\\left(${aT}\\right) = ${ang(x1)}`)} <small>${esc(T("(kalkulatoren gir bare én løsning)", "(the calculator only gives one solution)"))}</small></p>`;
  if(fn === "sin") steps += Math.abs(Math.abs(a) - 1) < 1e-9 ? `<p>${esc(T("Linja tangerer sirkelen: bare én løsning per runde.", "The line touches the circle: only one solution per turn."))}</p><p class="tg-gen">${tex(`x = ${ang(mod360(x1))} + n\\cdot ${per}`)}</p>`
    : `<p>${esc(T("Linja skjærer sirkelen to steder. Den andre løsningen er speilet i y-aksen:", "The line cuts the circle in two places. The other solution is mirrored in the y-axis:"))} ${tex(`x = ${half} - x_1`)}</p><p class="tg-gen">${tex(`x = ${ang(x1)} + n\\cdot ${per} \\ \\lor\\ x = ${ang(180 - x1)} + n\\cdot ${per}`)}</p>`;
  else if(fn === "cos") steps += Math.abs(Math.abs(a) - 1) < 1e-9 ? `<p class="tg-gen">${tex(`x = ${ang(x1)} + n\\cdot ${per}`)}</p>`
    : `<p>${esc(T("Den andre løsningen er speilet i x-aksen:", "The other solution is mirrored in the x-axis:"))} ${tex("x = -x_1")}</p><p class="tg-gen">${tex(`x = \\pm ${ang(x1)} + n\\cdot ${per}`)}</p>`;
  else steps += `<p>${esc(T("Linja gjennom origo treffer sirkelen i to motsatte punkter, 180° fra hverandre:", "The line through the origin hits the circle at two opposite points, 180° apart:"))}</p><p class="tg-gen">${tex(`x = ${ang(x1)} + n\\cdot ${per}`)}</p>`;
  steps += `<p class="tg-where">${esc(T("Løsninger i", "Solutions in"))} ${tex(TG.rad ? "[0, 2\\pi)" : "[0^\\circ, 360^\\circ)")}: ${sol.sols.map((d, i) => `<b style="color:${cols[i]}">${tex(`x_${i + 1} = ${ang(d)}`)}</b>`).join(" · ")}</p>`;
  return { svg: g, read: `<div class="tg-solve">${steps}</div>` };
}

// ---------- stasjon 7: Øv ----------
const TG_QN = 10;
function tgQItem(){
  const type = tgPick(["val", "val", "val", "place", "place", "which", "quad"]), rad = Math.random() < 0.45;
  if(type === "val"){
    const d = tgPick(TG_SPECIALS), fn = tgPick(["sin", "cos", "cos", "sin", "tan"]), ex = tgExact(d);
    if(fn === "tan" && ex.t === null) return tgQItem();
    const right = ex[fn[0]], pool = fn === "tan" ? ["0", "1", "-1", "\\sqrt3", "-\\sqrt3", "\\tfrac{\\sqrt3}{3}", "-\\tfrac{\\sqrt3}{3}"] : ["0", "1", "-1", "\\tfrac12", "-\\tfrac12", "\\tfrac{\\sqrt2}{2}", "-\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt3}{2}", "-\\tfrac{\\sqrt3}{2}"];
    const neg = right.startsWith("-") ? right.slice(1) : right === "0" ? null : "-" + right, swap = fn === "tan" ? null : ex[fn === "sin" ? "c" : "s"];
    const opts = [right]; [neg, swap, ...shuffle(pool)].forEach(o => { if(o && !opts.includes(o) && opts.length < 4) opts.push(o); });
    return { type, d, fn, rad, right, opts: shuffle(opts) };
  }
  if(type === "which"){
    const d = tgPick(TG_SPECIALS.filter(x => x % 90)), cand = [180 - d, 180 + d, 360 - d, d + 90, d - 90, 90 - d].map(mod360).filter(x => x !== d && TG_SPECIALS.includes(x));
    const opts = [d]; shuffle(cand).forEach(x => { if(!opts.includes(x) && opts.length < 4) opts.push(x); });
    return { type, d, rad, right: d, opts: shuffle(opts) };
  }
  if(type === "quad"){ const d = tgPick(TG_SPECIALS.filter(x => x % 90)); return { type, d, rad: true, right: tgQuad(d), opts: [1, 2, 3, 4] }; }
  return { type: "place", d: tgPick(TG_SPECIALS), rad, placed: null };
}
function tgQStart(){ TG.quiz = { i: 0, score: 0, streak: 0, maxStreak: 0, items: Array.from({ length: TG_QN }, tgQItem), ans: null, done: false, t0: Date.now() }; render(); window.scrollTo(0, 0); }
function tgQExpl(it){
  const d = it.d, q = tgQuad(d), ref = tgRefA(d), A = tgAngTex(d, it.rad);
  if(it.type === "val"){
    const ex = tgExact(d), f = it.fn;
    if(!q) return T(`${tex(A)} ligger på en akse, i punktet ${tex(`(${ex.c},\\ ${ex.s})`)}. Førstekoordinaten er cos, andrekoordinaten er sin.`, `${tex(A)} lies on an axis, at the point ${tex(`(${ex.c},\\ ${ex.s})`)}. The first coordinate is cos, the second is sin.`);
    const sg = f === "sin" ? (q <= 2 ? "+" : "−") : f === "cos" ? (q === 1 || q === 4 ? "+" : "−") : (q === 1 || q === 3 ? "+" : "−");
    return T(`${tex(A)} ligger i ${q}. kvadrant med referansevinkel ${tex(tgAngTex(ref, it.rad))}. ${tex(`\\${f} ${tgAngTex(ref, it.rad)} = ${TG_BASE[ref]["sct".indexOf(f[0]) === 0 ? 0 : f === "cos" ? 1 : 2]}`)}, og ${f} er ${sg === "+" ? "positiv" : "negativ"} her. Altså ${tex(`\\${f} ${A} = ${it.right}`)}.`,
      `${tex(A)} is in quadrant ${tgRoman(q)} with reference angle ${tex(tgAngTex(ref, it.rad))}. ${tex(`\\${f} ${tgAngTex(ref, it.rad)} = ${TG_BASE[ref][f === "sin" ? 0 : f === "cos" ? 1 : 2]}`)}, and ${f} is ${sg === "+" ? "positive" : "negative"} here. So ${tex(`\\${f} ${A} = ${it.right}`)}.`);
  }
  if(it.type === "quad" || it.type === "which") return q ? T(`${tex(A)} ${it.rad ? `= ${tex(tgDegTex(d))} ` : ""}ligger mellom ${tex(tgAngTex((q - 1) * 90, it.rad))} og ${tex(tgAngTex(q * 90, it.rad))}: ${q}. kvadrant, referansevinkel ${tex(tgAngTex(ref, it.rad))}.`,
    `${tex(A)} ${it.rad ? `= ${tex(tgDegTex(d))} ` : ""}lies between ${tex(tgAngTex((q - 1) * 90, it.rad))} and ${tex(tgAngTex(q * 90, it.rad))}: quadrant ${tgRoman(q)}, reference angle ${tex(tgAngTex(ref, it.rad))}.`) : "";
  return T(`${tex(A)} ${it.rad ? `= ${tex(tgDegTex(d))}` : ""} ${q ? `ligger i ${q}. kvadrant, ${tex(tgAngTex(ref, it.rad))} fra x-aksen.` : "ligger på en akse."}`, `${tex(A)} ${it.rad ? `= ${tex(tgDegTex(d))}` : ""} ${q ? `is in quadrant ${tgRoman(q)}, ${tex(tgAngTex(ref, it.rad))} from the x-axis.` : "is on an axis."}`);
}
function tgQFig(it){
  const show = it.type !== "place" ? (it.type === "which" || TG.quiz.ans ? it.d : null) : it.placed;
  let g = tgBase();
  if(it.type === "place") TG_SPECIALS.forEach(d => { const [x, y] = tgP(d); g += `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="6" style="fill:var(--card);stroke:var(--accent);stroke-width:2"/>`; });
  if(TG.quiz.ans && it.type === "place" && it.placed !== it.d){ const [x, y] = tgP(it.d); g += tgProj(it.d, 0, 0, TG_R, 3, false) + `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="9" style="fill:var(--ok);stroke:var(--card);stroke-width:3"/>`; }
  if(show != null){ const [x, y] = tgP(show), ok = TG.quiz.ans ? (it.type !== "place" || it.placed === it.d) : true;
    g += (it.type === "place" && TG.quiz.ans && !ok ? "" : tgProj(show, 0, 0, TG_R, 4, !!TG.quiz.ans)) + tgArc(24, 0, show, "var(--c2)", 3) +
      (it.type === "place" && !TG.quiz.ans ? tgHandle(x, y, "var(--accent)") : `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="9" style="fill:${TG.quiz.ans && it.type === "place" ? (ok ? "var(--ok)" : "var(--bad)") : "var(--accent)"};stroke:var(--card);stroke-width:3"/>`); }
  return g;
}
function tgQuizHTML(){
  const best = S.tgBest || 0, Q = TG.quiz;
  if(!Q) return `<div class="tg-qstart"><div class="tg-qic">🏆</div><h3>${esc(T("Test deg selv", "Test yourself"))}</h3><p>${esc(T(`${TG_QN} oppgaver: eksakte verdier, plasser vinkler på sirkelen, gjett vinkelen og finn kvadranten. Grader og radianer om hverandre.`, `${TG_QN} questions: exact values, place angles on the circle, guess the angle and find the quadrant. Degrees and radians mixed.`))}</p>
    ${best ? `<p class="tg-best">${esc(T("Rekord:", "Record:"))} <b>${best}/${TG_QN}</b></p>` : ""}<button class="big" data-a="tgqstart">${esc(T("Start runden", "Start the round"))}</button></div>`;
  if(Q.done){ const pct = Q.score / TG_QN;
    return `<div class="tg-qstart"><div class="sp-score">${Q.score}/${TG_QN}</div><h3>${esc(Q.newBest ? T("Ny rekord! 🎉", "New record! 🎉") : pct >= 0.8 ? T("Sterkt!", "Strong!") : pct >= 0.5 ? T("Godt på vei!", "Well on your way!") : T("Øvelse gjør mester", "Practice makes perfect"))}</h3>
      <p>${esc(T(`Beste rekke: ${Q.maxStreak} på rad`, `Best streak: ${Q.maxStreak} in a row`))}${best && !Q.newBest ? " · " + esc(T(`Rekord: ${best}/${TG_QN}`, `Record: ${best}/${TG_QN}`)) : ""}</p><div class="gd-xp">${I.bolt}+${Q.xp} XP</div>
      <button class="big" data-a="tgqstart">${esc(T("Én runde til", "One more round"))}</button>${pct < 0.8 ? `<button class="big ghost" data-a="tgst" data-s="exact">${esc(T("Repeter eksakte verdier", "Revise exact values"))}</button>` : ""}</div>`; }
  const it = Q.items[Q.i], A = tgAngTex(it.d, it.rad), ans = Q.ans;
  let prompt = "", opts = "";
  if(it.type === "val"){ prompt = `${esc(T("Hva er", "What is"))} ${tex(`\\${it.fn} ${A}`)}?`; opts = it.opts.map((o, i) => `<button class="tg-opt ${ans ? (o === it.right ? "ok" : ans.pick === i ? "bad" : "") : ""}" data-a="tgans" data-i="${i}" ${ans ? "disabled" : ""}>${tex(o)}</button>`).join(""); }
  else if(it.type === "which"){ prompt = esc(T("Hvilken vinkel viser punktet?", "Which angle does the point show?")); opts = it.opts.map((o, i) => `<button class="tg-opt ${ans ? (o === it.right ? "ok" : ans.pick === i ? "bad" : "") : ""}" data-a="tgans" data-i="${i}" ${ans ? "disabled" : ""}>${tex(tgAngTex(o, it.rad))}</button>`).join(""); }
  else if(it.type === "quad"){ prompt = `${esc(T("Hvilken kvadrant ligger", "Which quadrant is"))} ${tex(A)} ${esc(T("i?", "in?"))}`; opts = it.opts.map((o, i) => `<button class="tg-opt ${ans ? (o === it.right ? "ok" : ans.pick === i ? "bad" : "") : ""}" data-a="tgans" data-i="${i}" ${ans ? "disabled" : ""}>${esc(tgRoman(o))}</button>`).join(""); }
  else { prompt = `${esc(T("Plasser punktet på", "Place the point at"))} ${tex(A)}`; opts = ans ? "" : `<button class="big tg-check" data-a="tgcheck" ${it.placed == null ? "disabled" : ""}>${esc(T("Sjekk", "Check"))}</button>`; }
  return `<div class="tg-qbar"><span>${Q.i + 1}/${TG_QN}</span><span class="tg-qdots">${Q.items.map((x, i) => `<i class="${i < Q.i ? (x.ok ? "ok" : "bad") : i === Q.i ? "cur" : ""}"></i>`).join("")}</span><span>⭐ ${Q.score}${Q.streak >= 2 ? ` · 🔥${Q.streak}` : ""}</span></div>
    <h3 class="tg-qp">${prompt}</h3>
    <div class="tg-figwrap tg-qfig"><svg id="tgsvg" class="tg-svg" viewBox="-165 -165 330 330" role="img" aria-label="${esc(T("Enhetssirkelen", "The unit circle"))}">${tgQFig(it)}</svg></div>
    ${it.type === "place" && !ans ? `<p class="picknote">${esc(T("Trykk eller dra til riktig punkt på sirkelen.", "Tap or drag to the right point on the circle."))}</p>` : ""}
    <div class="tg-opts ${it.type === "quad" ? "q4" : ""}">${opts}</div>
    ${ans ? `<div class="tg-fb ${ans.ok ? "ok" : "bad"}"><b>${esc(ans.ok ? tgPick(T(["Riktig!", "Sånn ja!", "Perfekt!"], ["Correct!", "Nice!", "Perfect!"])) : T("Ikke helt", "Not quite"))}</b><p>${tgQExpl(it)}</p></div><div class="next-dock" data-k="tg${Q.i}"><button class="big" data-a="tgqnext">${esc(Q.i + 1 < TG_QN ? T("Neste", "Next") : T("Se resultatet", "See the result"))}</button></div>` : ""}`;
}
function tgQAnswer(ok, pick){
  const Q = TG.quiz, it = Q.items[Q.i]; if(Q.ans) return;
  Q.ans = { ok, pick }; it.ok = ok;
  if(ok){ Q.score++; Q.streak++; Q.maxStreak = Math.max(Q.maxStreak, Q.streak); sfx("ok", Q.streak); buzz(true); } else { Q.streak = 0; sfx("bad"); buzz(false); }
  render(); if(ok) burst(document.querySelector(".tg-opt.ok") || document.querySelector(".tg-fb"), 10);
}
function tgQNext(){
  const Q = TG.quiz; if(Q.i + 1 < TG_QN){ Q.i++; Q.ans = null; render(); return; }
  Q.done = true; Q.newBest = Q.score > (S.tgBest || 0); if(Q.newBest) S.tgBest = Q.score;
  Q.xp = 4 + Q.score; const st = awardXP(Q.xp); S.stats ||= {}; S.stats.games = (+S.stats.games || 0) + 1;
  bdgToast(checkBadges()); save(); render(); setTimeout(() => Q.newBest || Q.score >= 8 ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}

// ---------- stasjon 0: Steg for steg (oppgave 38) ----------
// Sinus, cosinus og tangens for 0°, 30°, 45°, 60° og 90° i fem steg: tabellen bygd opp én ting om gangen (kan spilles av),
// enhetssirkelen, grafene som spor av koordinatene (og sinus forskjøvet π/2 blir cosinus), tangens og «prøv selv».
// Den ferdige tabellen står også i egen stasjon, «Tabell» (tglRef), så den er lett å finne igjen.
// Faste farger, de samme som formelfargene (learn.js: MC, og de følger «Farger i formler»): cos og x-koordinaten blå og
// STIPLET, sin og y-koordinaten oransje og HELTRUKKET, vinkelen magenta. Etiketter og linjestil skiller dem også uten farge.
// Verdiene og grafpunktene kontrolleres av tools/test_trig_learn.js.
const TGL_COS = "var(--mc-a)", TGL_SIN = "var(--mc-b)", TGL_ANG = "var(--mc-c)", TGL_DASH = 'stroke-dasharray="7 5"';
// [grader, radianer, sin som √k/2, sin forenklet, cos, tan (null = ikke definert)]
const TGL_V = [[0, "0", "\\tfrac{\\sqrt0}{2}", "0", "1", "0"], [30, "\\tfrac{\\pi}{6}", "\\tfrac{\\sqrt1}{2}", "\\tfrac12", "\\tfrac{\\sqrt3}{2}", "\\tfrac{\\sqrt3}{3}"],
  [45, "\\tfrac{\\pi}{4}", "\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt2}{2}", "1"], [60, "\\tfrac{\\pi}{3}", "\\tfrac{\\sqrt3}{2}", "\\tfrac{\\sqrt3}{2}", "\\tfrac12", "\\sqrt3"],
  [90, "\\tfrac{\\pi}{2}", "\\tfrac{\\sqrt4}{2}", "1", "0", null]];
// Tangens regnet ut trinn for trinn: tan = sin / cos (LaTeX etter «= \frac{sin}{cos} =»)
const TGL_TAN = ["\\frac{0}{1} = 0", "\\frac{\\tfrac12}{\\tfrac{\\sqrt3}{2}} = \\frac{1}{\\sqrt3} = \\frac{\\sqrt3}{3}", "\\frac{\\tfrac{\\sqrt2}{2}}{\\tfrac{\\sqrt2}{2}} = 1", "\\frac{\\tfrac{\\sqrt3}{2}}{\\tfrac12} = \\sqrt3", null];
const TGL_TXT = [
  { t: ["Bygg tabellen", "Build the table"],
    p: ["Vi bygger hele tabellen for sinus, cosinus og tangens fra bunnen av, én ting om gangen. Trykk «Neste» for hvert trinn, eller «Spill av» for å se det gå av seg selv.", "We build the whole table of sine, cosine and tangent from scratch, one thing at a time. Press 'Next' for each step, or 'Play' to watch it run by itself."],
    f: ["", ""] },
  { t: ["Enhetssirkelen viser hvorfor", "The unit circle shows why"],
    p: ["Tegn en sirkel med radius 1 rundt origo. Punktet $P$ på sirkelen ved vinkelen $v$ har koordinatene $(\\cos v, \\sin v)$: x-koordinaten er cosinus, og y-koordinaten er sinus. Dra punktet.", "Draw a circle with radius 1 around the origin. The point $P$ on the circle at the angle $\\theta$ has the coordinates $(\\cos\\theta, \\sin\\theta)$: the x-coordinate is cosine, and the y-coordinate is sine. Drag the point."],
    f: ["Radien, den stiplede streken og den heltrukne streken danner en rettvinklet trekant med hypotenus 1. Derfor er $\\cos v = \\frac{x}{1} = x$ og $\\sin v = \\frac{y}{1} = y$.", "The radius, the dashed line and the solid line form a right triangle with hypotenuse 1. So $\\cos\\theta = \\frac{x}{1} = x$ and $\\sin\\theta = \\frac{y}{1} = y$."] },
  { t: ["Bølgene er spor av punktet", "The waves are traces of the point"],
    p: ["La punktet gå rundt sirkelen. Høyden $y$ tegner sinuskurven (heltrukket), og x-koordinaten tegner cosinuskurven (stiplet), mens vinkelen øker. Trykk «Forskyv sinus» for å se sinusbølgen flyttes $\\frac{\\pi}{2}$ til venstre.", "Let the point go round the circle. The height $y$ draws the sine curve (solid), and the x-coordinate draws the cosine curve (dashed), as the angle increases. Press 'Shift sine' to watch the sine wave move $\\frac{\\pi}{2}$ to the left."],
    f: ["Begge grafene har samme bølgeform og samme periode: etter én hel omdreining, $2\\pi$ radianer ($360^\\circ$), gjentar de seg. De er forskjøvet en kvart omdreining, $\\frac{\\pi}{2}$: $\\cos v = \\sin\\left(v + \\frac{\\pi}{2}\\right)$. Cosinus når altså hver verdi $\\frac{\\pi}{2}$ tidligere enn sinus. Toppen til cosinus ligger ved $v = 0$, toppen til sinus ved $v = \\frac{\\pi}{2}$. Derfor starter cosinus på 1 og sinus på 0 når $v = 0$: punktet starter helt til høyre, der $x = 1$ og $y = 0$.",
        "Both graphs have the same wave shape and the same period: after one full turn, $2\\pi$ radians ($360^\\circ$), they repeat. They are shifted by a quarter turn, $\\frac{\\pi}{2}$: $\\cos\\theta = \\sin\\left(\\theta + \\frac{\\pi}{2}\\right)$. So cosine reaches each value $\\frac{\\pi}{2}$ earlier than sine. The peak of cosine is at $\\theta = 0$, the peak of sine at $\\theta = \\frac{\\pi}{2}$. That is why cosine starts at 1 and sine at 0 when $\\theta = 0$: the point starts all the way to the right, where $x = 1$ and $y = 0$."] },
  { t: ["Tangens er sinus delt på cosinus", "Tangent is sine divided by cosine"],
    p: ["Tangens finner du ved å dele: $\\tan v = \\dfrac{\\sin v}{\\cos v}$. I figuren er $\\tan v$ høyden der linja fra origo gjennom $P$ treffer den loddrette linja $x = 1$.", "You find tangent by dividing: $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$. In the figure, $\\tan\\theta$ is the height where the line from the origin through $P$ meets the vertical line $x = 1$."],
    f: ["Ved $90^\\circ$ er $\\cos v = 0$, og vi kan ikke dele på 0. Linja gjennom $P$ står da loddrett, parallelt med $x = 1$, og treffer den aldri. Derfor er $\\tan 90^\\circ$ ikke definert. Det er ikke et tall, og heller ikke «uendelig».", "At $90^\\circ$, $\\cos\\theta = 0$, and we cannot divide by 0. The line through $P$ is then vertical, parallel to $x = 1$, and never meets it. So $\\tan 90^\\circ$ is not defined. It is not a number, and not 'infinity' either."] },
  { t: ["Alt samlet – prøv selv", "Everything together – try it yourself"],
    p: ["Her er alle verdiene samlet. Prøv deg på spørsmålene under, og bruk huskeregelen og enhetssirkelen hvis du står fast. Tabellen finner du alltid igjen under «Tabell».", "Here are all the values together. Try the questions below, and use the memory trick and the unit circle if you get stuck. You can always find the table again under 'Table'."],
    f: ["", ""] }];
const TGL_N = TGL_TXT.length;
const tglV = () => tgV();
// Grafpunktene i steg 3: x-posisjon og høyde for vinkelen d (grader), samme mål som i Grafer-stasjonen.
const tglX = d => TG_GX + d * TG_GW / 360, tglY = y => TG_CY - y * TG_GR;
function tglCurve(fn, a = 0, b = 360, step = 2, ph = 0){ const f = fn === "sin" ? Math.sin : Math.cos, out = []; for(let d = a; d < b + 1e-9; d += step) out.push([d, tglX(d), tglY(f(tgRad(d + ph)))]); if(out[out.length - 1][0] !== b) out.push([b, tglX(b), tglY(f(tgRad(b + ph)))]); return out; }
const tglPath = pts => pts.map((p, i) => (i ? "L" : "M") + tf1(p[1]) + " " + tf1(p[2])).join(" ");
const tglUndef = () => `\\text{${T("ikke definert", "not defined")}}`;
// Fem punkter i første kvadrant (steg 4 og 5)
function tglQuad(sel, show){
  const R = TG_R, m = "var(--muted)";
  let g = tgL(-14, 0, R + 30, 0, m, 1.3) + tgArrow(R + 32, 0, "r", m) + tgL(0, 14, 0, -R - 30, m, 1.3) + tgArrow(0, -R - 32, "u", m) + tgT(R + 26, 13, "x", m, "middle", 13, 600) + tgT(-11, -R - 24, "y", m, "middle", 13, 600);
  g += tgArc(R, 0, 90, "var(--ink)", 2, 0, 0, 'opacity=".55"') + tgT(R + 6, 14, "1", m, "start", 11, 600) + tgT(-7, -R, "1", m, "end", 11, 600);
  if(show.mirror) g += tgL(-6, 6, R * 0.95, -R * 0.95, m, 1.4, 'stroke-dasharray="3 5"') + tgT(R * 0.95 + 4, -R * 0.95 - 6, "y = x", m, "start", 11, 600);
  TGL_V.forEach(([d], i) => { const [x, y] = tgP(d), on = i === sel;
    if(show.sin) g += tgL(x, 0, x, y, TGL_SIN, on ? 5 : 2.6, on ? "" : 'opacity=".55"');
    if(show.cos) g += tgL(0, y, x, y, TGL_COS, on ? 5 : 2.6, TGL_DASH + (on ? "" : ' opacity=".55"'));
    if(on && !show.tan) g += tgL(0, 0, x, y, "var(--ink)", 2) + tgArc(26, 0, d, TGL_ANG, 3);
    g += `<circle cx="${tf1(x)}" cy="${tf1(y)}" r="${on ? 7 : 5}" style="fill:${on ? "var(--accent)" : "var(--card)"};stroke:var(--accent);stroke-width:2"/>`;
    if(show.tan){ if(on && d > 0 && d < 90){ const [lx, ly] = tgP(d / 2, 44); g += tgT(lx, ly, d + "°", TGL_ANG, "start", 12, 800); } return; }
    const [lx, ly] = d === 0 ? [R + 4, -12] : d === 90 ? [10, -R - 12] : tgP(d + (d === 45 ? 5 : 0), R + 18);
    g += tgT(lx, ly, d + "°", on ? TGL_ANG : m, "start", 12, on ? 800 : 600); });
  const [x, y] = tgP(TGL_V[sel][0]);
  if(show.sin && sel > 0) g += tgT(x + 7, y / 2, "sin", TGL_SIN, "start", 12);
  if(show.cos && sel < 4) g += tgT(x / 2, y - 11, "cos", TGL_COS, "middle", 12);
  if(show.tan){ g += tgL(R, 16, R, -R * 1.8, "var(--ink)", 1.6, 'opacity=".7"') + tgT(R + 6, -R * 1.8 + 6, "x = 1", m, "start", 11, 600) + tgArc(26, 0, TGL_V[sel][0], TGL_ANG, 3);
    if(sel < 4){ const t = Math.tan(tgRad(TGL_V[sel][0])); g += tgL(0, 0, R, -R * t, "var(--ink)", 2) + tgL(R, 0, R, -R * t, "var(--ink)", 5) + (t > 0.05 ? tgT(R + 8, -R * t / 2, "tan", "var(--ink)", "start", 12) : "") + tgL(x, 0, x, y, TGL_SIN, 4) + tgL(0, 0, x, 0, TGL_COS, 4, TGL_DASH); }
    else g += tgL(0, 0, 0, -R * 1.8, "var(--ink)", 2, 'stroke-dasharray="2 4"') + tgT(10, -R * 1.55, "∥", "var(--ink)", "start", 15); }
  return g;
}
function tglTable(rows, sel){
  const cell = (i, x, cls = "v") => `<td class="${cls}${i === sel ? " on" : ""}" data-a="tglsel" data-i="${i}">${x == null ? `<small>${esc(T("ikke definert", "not defined"))}</small>` : tex(x)}</td>`;
  const R = { deg: [T("Grader", "Degrees"), TGL_V.map(v => v[0] + "^\\circ"), "a"], rad: [T("Radianer", "Radians"), TGL_V.map(v => v[1]), "a"],
    root: ["sin", TGL_V.map(v => mcB(v[2])), "s"], sin: ["sin", TGL_V.map(v => mcB(v[3])), "s"], cos: ["cos", TGL_V.map(v => mcA(v[4])), "c"], tan: ["tan", TGL_V.map(v => v[5]), "t"] };
  if(rows.includes("root")) R.sin[0] = T("forenklet", "simplified");
  return `<div class="tg-tab tgl-tab"><table>${rows.map(k => `<tr><th class="${R[k][2]}">${esc(R[k][0])}${k === "root" ? `<span class="sr"> ${esc(T("som rot over 2", "as a root over 2"))}</span>` : ""}</th>${R[k][1].map((x, i) => cell(i, x)).join("")}</tr>`).join("")}</table></div>`;
}
const tglSel = () => Math.max(0, Math.min(4, TG.lsel == null ? 1 : TG.lsel));
// Spørsmål i steg 5: «Hva er f v?» med fire svar
const TGL_POOL = ["0", "\\tfrac12", "\\tfrac{\\sqrt2}{2}", "\\tfrac{\\sqrt3}{2}", "1", "\\tfrac{\\sqrt3}{3}", "\\sqrt3", null];
function tglAnswer(fn, i){ const v = TGL_V[i]; return fn === "sin" ? v[3] : fn === "cos" ? v[4] : v[5]; }
function tglNewQ(){
  let fn, i; do { fn = tgPick(["sin", "cos", "tan"]); i = Math.floor(Math.random() * 5); } while(TG.lq && TG.lq.fn === fn && TG.lq.i === i);
  const right = tglAnswer(fn, i), wrong = shuffle(TGL_POOL.filter(x => x !== right && (fn === "tan" || x !== null))).slice(0, 3);
  TG.lq = { fn, i, opts: shuffle([right, ...wrong]), pick: -1 };
}
function tglQuizHTML(){
  if(!TG.lq) tglNewQ(); const q = TG.lq, v = TGL_V[q.i], right = tglAnswer(q.fn, q.i), done = q.pick >= 0, ok = done && q.opts[q.pick] === right, V = v[0] + "^\\circ";
  const show = x => x == null ? esc(T("ikke definert", "not defined")) : tex(x);
  const why = q.fn === "sin" ? T(`Huskeregelen: $\\sin ${V} = ${v[2]} = ${v[3]}$.`, `The memory trick: $\\sin ${V} = ${v[2]} = ${v[3]}$.`)
    : q.fn === "cos" ? T(`Cosinus er sinus baklengs: $\\cos ${V} = \\sin ${90 - v[0]}^\\circ = ${v[4]}$.`, `Cosine is sine backwards: $\\cos ${V} = \\sin ${90 - v[0]}^\\circ = ${v[4]}$.`)
    : v[5] == null ? T("$\\cos 90^\\circ = 0$, og vi kan ikke dele på 0, så $\\tan 90^\\circ$ er ikke definert.", "$\\cos 90^\\circ = 0$, and we cannot divide by 0, so $\\tan 90^\\circ$ is not defined.")
    : T(`$\\tan ${V} = \\dfrac{\\sin ${V}}{\\cos ${V}} = ${TGL_TAN[q.i]}$.`, `$\\tan ${V} = \\dfrac{\\sin ${V}}{\\cos ${V}} = ${TGL_TAN[q.i]}$.`);
  return `<div class="tgl-try"><h4>✏️ ${esc(T("Prøv selv", "Try it yourself"))}</h4><p class="tg-qp">${esc(T("Hva er", "What is"))} ${tex(`\\${q.fn} ${V}`)}?</p>
    <div class="tg-opts">${q.opts.map((o, k) => `<button class="tg-opt ${done ? (o === right ? "ok" : q.pick === k ? "bad" : "") : ""}" data-a="tglans" data-k="${k}" ${done ? "disabled" : ""}>${show(o)}</button>`).join("")}</div>
    ${done ? `<div class="tg-fb ${ok ? "ok" : "bad"}" aria-live="polite"><b>${esc(ok ? T("Riktig!", "Correct!") : T("Ikke helt", "Not quite"))}</b><p>${rich(why)}</p></div><button class="big" data-a="tglq">${esc(T("Nytt spørsmål", "New question"))}</button>` : ""}</div>`;
}
// ---------- steg 1: bygg tabellen, én ting om gangen ----------
// Hvert bilde (frame) har tilstanden til hele tabellen (rå LaTeX, uten farge: "" = tom rute, null = ikke definert),
// rutene som endres (hi), rutene verdien hentes fra (src), en kort tekst og en utregning (calc).
// Rekkefølge: brøkstrek og 2 i nevneren → rottegn → 0, 1, 2, 3, 4 under roten → forenkle én og én →
// cos = sin baklengs, én og én → tan = sin/cos, én vinkel om gangen og forenklet → radianer (180° = π).
const tglD = x => x == null ? x : x.replace(/\\tfrac/g, "\\dfrac");
const TGL_TANB = [ // [ruten, utregningen, tekst nb, tekst en] for hver vinkel; siste trinn er svaret
  [["\\dfrac{0}{1}", "\\tan 0^\\circ = \\dfrac{\\sin 0^\\circ}{\\cos 0^\\circ} = \\dfrac{0}{1}", "Ved $0^\\circ$ er sinus 0 og cosinus 1. Skriv sinus over brøkstreken og cosinus under.", "At $0^\\circ$, sine is 0 and cosine is 1. Write sine above the fraction bar and cosine below."],
   ["0", "\\dfrac{0}{1} = 0", "0 delt på 1 er 0. Altså er $\\tan 0^\\circ = 0$.", "0 divided by 1 is 0. So $\\tan 0^\\circ = 0$."]],
  [["\\dfrac{\\tfrac12}{\\tfrac{\\sqrt3}{2}}", "\\tan 30^\\circ = \\dfrac{\\sin 30^\\circ}{\\cos 30^\\circ} = \\dfrac{\\tfrac12}{\\tfrac{\\sqrt3}{2}}", "Ved $30^\\circ$ får vi en brøk delt på en brøk: $\\frac12$ over streken og $\\frac{\\sqrt3}{2}$ under.", "At $30^\\circ$ we get a fraction divided by a fraction: $\\frac12$ on top and $\\frac{\\sqrt3}{2}$ below."],
   ["\\dfrac{1}{\\sqrt3}", "\\dfrac{\\tfrac12}{\\tfrac{\\sqrt3}{2}} = \\dfrac12\\cdot\\dfrac{2}{\\sqrt3} = \\dfrac{1}{\\sqrt3}", "Å dele på en brøk er det samme som å gange med den snudde brøken. Totallene forkortes mot hverandre.", "Dividing by a fraction is the same as multiplying by the flipped fraction. The twos cancel."],
   ["\\dfrac{\\sqrt3}{3}", "\\dfrac{1}{\\sqrt3} = \\dfrac{1\\cdot\\sqrt3}{\\sqrt3\\cdot\\sqrt3} = \\dfrac{\\sqrt3}{3}", "Vi vil helst ikke ha rot i nevneren. Gang over og under med $\\sqrt3$, fordi $\\sqrt3\\cdot\\sqrt3 = 3$. Både $\\frac{1}{\\sqrt3}$ og $\\frac{\\sqrt3}{3}$ er riktige, men $\\frac{\\sqrt3}{3}$ er vanligst.", "We prefer not to have a root in the denominator. Multiply top and bottom by $\\sqrt3$, because $\\sqrt3\\cdot\\sqrt3 = 3$. Both $\\frac{1}{\\sqrt3}$ and $\\frac{\\sqrt3}{3}$ are correct, but $\\frac{\\sqrt3}{3}$ is the usual form."]],
  [["\\dfrac{\\tfrac{\\sqrt2}{2}}{\\tfrac{\\sqrt2}{2}}", "\\tan 45^\\circ = \\dfrac{\\sin 45^\\circ}{\\cos 45^\\circ} = \\dfrac{\\tfrac{\\sqrt2}{2}}{\\tfrac{\\sqrt2}{2}}", "Ved $45^\\circ$ er sinus og cosinus like store.", "At $45^\\circ$, sine and cosine are equal."],
   ["1", "\\dfrac{\\tfrac{\\sqrt2}{2}}{\\tfrac{\\sqrt2}{2}} = 1", "Et tall delt på seg selv er 1. Altså er $\\tan 45^\\circ = 1$.", "A number divided by itself is 1. So $\\tan 45^\\circ = 1$."]],
  [["\\dfrac{\\tfrac{\\sqrt3}{2}}{\\tfrac12}", "\\tan 60^\\circ = \\dfrac{\\sin 60^\\circ}{\\cos 60^\\circ} = \\dfrac{\\tfrac{\\sqrt3}{2}}{\\tfrac12}", "Ved $60^\\circ$ er det omvendt av $30^\\circ$: $\\frac{\\sqrt3}{2}$ over streken og $\\frac12$ under.", "At $60^\\circ$ it is the other way round from $30^\\circ$: $\\frac{\\sqrt3}{2}$ on top and $\\frac12$ below."],
   ["\\sqrt3", "\\dfrac{\\tfrac{\\sqrt3}{2}}{\\tfrac12} = \\dfrac{\\sqrt3}{2}\\cdot\\dfrac{2}{1} = \\sqrt3", "Gang med den snudde brøken. Totallene forkortes, og igjen står $\\sqrt3$.", "Multiply by the flipped fraction. The twos cancel, leaving $\\sqrt3$."]],
  [["\\dfrac{1}{0}", "\\tan 90^\\circ = \\dfrac{\\sin 90^\\circ}{\\cos 90^\\circ} = \\dfrac{1}{0}", "Ved $90^\\circ$ er sinus 1 og cosinus 0.", "At $90^\\circ$, sine is 1 and cosine is 0."],
   [null, "\\dfrac{1}{0}\\ \\to\\ ", "Vi kan ikke dele på 0. Derfor er $\\tan 90^\\circ$ ikke definert. Det er ikke et tall, og heller ikke «uendelig».", "We cannot divide by 0. So $\\tan 90^\\circ$ is not defined. It is not a number, and not 'infinity' either."]]];
const TGL_SIMP = [["\\dfrac{\\sqrt0}{2} = \\dfrac{0}{2} = 0", "Nå forenkler vi, én rute om gangen. $\\sqrt{0} = 0$, og 0 delt på 2 er 0.", "Now we simplify, one cell at a time. $\\sqrt{0} = 0$, and 0 divided by 2 is 0."],
  ["\\dfrac{\\sqrt1}{2} = \\dfrac{1}{2}", "$\\sqrt{1} = 1$, så vi får $\\frac12$.", "$\\sqrt{1} = 1$, so we get $\\frac12$."],
  ["\\dfrac{\\sqrt2}{2} \\approx 0{,}71", "$\\sqrt{2}$ er ikke et helt tall, så $\\frac{\\sqrt2}{2}$ blir stående som den er.", "$\\sqrt{2}$ is not a whole number, so $\\frac{\\sqrt2}{2}$ stays as it is."],
  ["\\dfrac{\\sqrt3}{2} \\approx 0{,}87", "$\\sqrt{3}$ er heller ikke et helt tall, så $\\frac{\\sqrt3}{2}$ blir også stående.", "$\\sqrt{3}$ is not a whole number either, so $\\frac{\\sqrt3}{2}$ also stays."],
  ["\\dfrac{\\sqrt4}{2} = \\dfrac{2}{2} = 1", "$\\sqrt{4} = 2$, og 2 delt på 2 er 1. Sinusraden er ferdig.", "$\\sqrt{4} = 2$, and 2 divided by 2 is 1. The sine row is done."]];
let tglFramesC = null;
function tglFrames(){
  if(tglFramesC && tglFramesC.lang === LANG) return tglFramesC;
  const F = [], st = { rad: ["", "", "", "", ""], sin: ["", "", "", "", ""], cos: ["", "", "", "", ""], tan: ["", "", "", "", ""] }, D = TGL_V.map(v => v[0]);
  const add = (ph, nb, en, o = {}) => F.push({ ph, txt: [nb, en], calc: o.calc || null, hi: o.hi || [], src: o.src || [], st: JSON.parse(JSON.stringify(st)) });
  const all = r => D.map((_, i) => [r, i]);
  add("start", "Her er de fem vinklene fra $0^\\circ$ til $90^\\circ$. Resten av tabellen er tom, og vi fyller den ut én ting om gangen.", "Here are the five angles from $0^\\circ$ to $90^\\circ$. The rest of the table is empty, and we fill it in one thing at a time.", { hi: all("deg") });
  st.sin = D.map(() => "\\dfrac{\\square}{2}");
  add("sin", "Først sinus. Tegn en brøkstrek i alle fem sinusrutene, og skriv 2 under streken. Alle fem sinusverdiene er noe delt på 2.", "Sine first. Draw a fraction bar in all five sine cells, and write 2 below it. All five sine values are something divided by 2.", { hi: all("sin") });
  st.sin = D.map(() => "\\dfrac{\\sqrt{\\square}}{2}");
  add("sin", "Sett et rottegn over brøkstreken. Nå mangler bare tallet under rottegnet.", "Put a root sign above the fraction bar. Now only the number under the root is missing.", { hi: all("sin") });
  D.forEach((d, k) => { st.sin[k] = `\\dfrac{\\sqrt{${k}}}{2}`;
    add("sin", k === 0 ? "Under rottegnene skriver du tallene 0, 1, 2, 3 og 4, ett for hver vinkel. Ved $0^\\circ$ skriver du 0." : k === 4 ? `Ved $90^\\circ$ skriver du 4. Tallene under roten gikk 0, 1, 2, 3, 4.` : `Ved $${d}^\\circ$ skriver du ${k}.`,
      k === 0 ? "Under the root signs, write the numbers 0, 1, 2, 3 and 4, one for each angle. At $0^\\circ$, write 0." : k === 4 ? "At $90^\\circ$, write 4. The numbers under the root went 0, 1, 2, 3, 4." : `At $${d}^\\circ$, write ${k}.`,
      { hi: [["sin", k]], calc: `\\sin ${d}^\\circ = \\dfrac{\\sqrt{${k}}}{2}` }); });
  D.forEach((d, k) => { st.sin[k] = tglD(TGL_V[k][3]); add("sin", TGL_SIMP[k][1], TGL_SIMP[k][2], { hi: [["sin", k]], calc: TGL_SIMP[k][0] }); });
  add("cos", "Nå cosinus. Cosinusverdiene er sinusverdiene i motsatt rekkefølge, så vi leser sinusraden fra høyre mot venstre.", "Now cosine. The cosine values are the sine values in reverse order, so we read the sine row from right to left.", { src: all("sin") });
  D.forEach((d, i) => { const j = 4 - i; st.cos[i] = st.sin[j];
    const nb = i === 0 ? "$\\cos 0^\\circ$ henter vi fra den siste sinusruten, $\\sin 90^\\circ$." : i === 2 ? "$\\cos 45^\\circ$ står i midten, så den er lik $\\sin 45^\\circ$." : i === 4 ? "$\\cos 90^\\circ$ henter vi fra den første sinusruten. Vinklene som hører sammen, blir alltid $90^\\circ$ til sammen: $0^\\circ$ og $90^\\circ$, $30^\\circ$ og $60^\\circ$. Derfor er $\\cos v = \\sin(90^\\circ - v)$." : `$\\cos ${d}^\\circ$ henter vi fra $\\sin ${90 - d}^\\circ$.`;
    const en = i === 0 ? "We take $\\cos 0^\\circ$ from the last sine cell, $\\sin 90^\\circ$." : i === 2 ? "$\\cos 45^\\circ$ is in the middle, so it equals $\\sin 45^\\circ$." : i === 4 ? "We take $\\cos 90^\\circ$ from the first sine cell. The angles that belong together always add up to $90^\\circ$: $0^\\circ$ and $90^\\circ$, $30^\\circ$ and $60^\\circ$. That is why $\\cos\\theta = \\sin(90^\\circ - \\theta)$." : `We take $\\cos ${d}^\\circ$ from $\\sin ${90 - d}^\\circ$.`;
    add("cos", nb, en, { hi: [["cos", i]], src: [["sin", j]], calc: `\\cos ${d}^\\circ = \\sin ${90 - d}^\\circ = ${st.sin[j]}` }); });
  add("tan", "Til slutt tangens: $\\tan v = \\dfrac{\\sin v}{\\cos v}$. Vi tar én vinkel om gangen, deler sinus på cosinus og forenkler.", "Finally tangent: $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$. We take one angle at a time, divide sine by cosine and simplify.", { hi: all("tan"), calc: "\\tan v = \\dfrac{\\sin v}{\\cos v}" });
  TGL_TANB.forEach((steps, i) => steps.forEach(([cell, calc, nb, en], k) => { st.tan[i] = cell;
    add("tan", nb, en, { hi: [["tan", i]], src: k === 0 ? [["sin", i], ["cos", i]] : [], calc: cell === null ? calc + `\\text{${T("ikke definert", "not defined")}}` : calc }); }));
  add("rad", "Til slutt radianene. Det eneste du trenger å huske, er at en halv runde er $180^\\circ = \\pi$.", "Finally the radians. All you need to remember is that half a turn is $180^\\circ = \\pi$.", { hi: all("rad"), calc: "180^\\circ = \\pi" });
  D.forEach((d, i) => { st.rad[i] = tglD(TGL_V[i][1]); const n = 180 / (d || 180);
    add("rad", d === 0 ? "$0^\\circ$ er 0 radianer: ingen vinkel i det hele tatt." : `$${d}^\\circ$ er $\\frac{${d}}{180} = \\frac{1}{${n}}$ av en halv runde, altså $\\frac{\\pi}{${n}}$.`,
      d === 0 ? "$0^\\circ$ is 0 radians: no angle at all." : `$${d}^\\circ$ is $\\frac{${d}}{180} = \\frac{1}{${n}}$ of half a turn, so $\\frac{\\pi}{${n}}$.`,
      { hi: [["rad", i]], src: [["deg", i]], calc: d === 0 ? "0^\\circ = 0" : `${d}^\\circ = \\dfrac{${d}}{180}\\cdot\\pi = \\dfrac{\\pi}{${n}}` }); });
  add("done", "Ferdig! Hele tabellen ligger alltid under «Tabell» øverst, så du kan slå opp i den når du trenger det.", "Done! The whole table is always under 'Table' at the top, so you can look things up whenever you need to.");
  F.lang = LANG; return (tglFramesC = F);
}
// Den store tabellen. f = bildet (null = ferdig tabell).
function tglBigTable(f){
  const s = f ? f.st : { rad: TGL_V.map(v => tglD(v[1])), sin: TGL_V.map(v => tglD(v[3])), cos: TGL_V.map(v => tglD(v[4])), tan: TGL_V.map(v => tglD(v[5])) };
  const on = (L, r, i) => L.some(([a, b]) => a === r && b === i);
  const col = { sin: mcB, cos: mcA, rad: x => x, tan: x => x };
  const td = (r, i, x) => `<td class="${f && on(f.hi, r, i) ? "hi" : ""}${f && on(f.src, r, i) ? " src" : ""}">${x === null ? `<small>${esc(T("ikke definert", "not defined"))}</small>` : x === "" ? "" : tex(r === "deg" ? x : col[r](x))}</td>`;
  const row = (r, th, cls, xs) => `<tr><th class="${cls}" scope="row">${th}</th>${xs.map((x, i) => td(r, i, x)).join("")}</tr>`;
  return `<div class="tgl-big"><table>${row("deg", esc(T("Grader", "Degrees")), "a", TGL_V.map(v => v[0] + "^\\circ"))}${row("rad", esc(T("Radianer", "Radians")), "a", s.rad)}${row("sin", "sin", "s", s.sin)}${row("cos", "cos", "c", s.cos)}${row("tan", "tan", "t", s.tan)}</table></div>`;
}
const tglB = () => Math.max(0, Math.min(tglFrames().length - 1, TG.lb || 0));
function tglBuildHTML(){
  const F = tglFrames(), b = tglB(), f = F[b], ph = [["sin", "sin"], ["cos", "cos"], ["tan", "tan"], ["rad", T("radianer", "radians")]], order = ["start", "sin", "cos", "tan", "rad", "done"];
  const chips = ph.map(([k, l]) => `<span class="${f.ph === k ? "on" : order.indexOf(f.ph) > order.indexOf(k) ? "done" : ""}">${esc(l)}</span>`).join("");
  return `<div class="tglb"><div class="tglb-bar"><span class="tglb-ph">${chips}</span><span class="tglb-n">${b + 1}/${F.length}</span></div>
    <div class="tglb-prog" aria-hidden="true"><i style="width:${(100 * b / (F.length - 1)).toFixed(1)}%"></i></div>
    ${tglBigTable(f)}<div class="tglb-calc">${f.calc ? tex(f.calc.replace(/\\(sin|cos|tan) /g, "\\$1\\, ")) : ""}</div><p class="tglb-txt">${rich(T(f.txt[0], f.txt[1]))}</p>
    <div class="tglb-ctl"><button id="tglbPrev" class="big ghost" data-a="tglb" data-v="${b - 1}" ${b ? "" : "disabled"} aria-label="${esc(T("Forrige trinn", "Previous step"))}">←</button><button id="tglbPlay" class="big ghost" data-a="tglplay">${TG.lbp ? "⏸ " + esc(T("Pause", "Pause")) : "▶ " + esc(b === F.length - 1 ? T("På nytt", "Again") : T("Spill av", "Play"))}</button>${b < F.length - 1 ? `<button id="tglbNext" class="big" data-a="tglb" data-v="${b + 1}">${esc(T("Neste", "Next"))} →</button>` : `<button id="tglbNext" class="big" data-a="tgls" data-v="2">${esc(T("Neste steg", "Next step"))} →</button>`}</div></div>`;
}
function tglPlayStop(){ clearTimeout(TG.lbp); TG.lbp = 0; }
function tglPlay(){
  if(TG.lbp){ tglPlayStop(); tgPaint(); return; }
  const F = tglFrames(); if(tglB() >= F.length - 1) TG.lb = 0;
  const wait = () => { const f = F[tglB()]; return Math.min(7500, 2200 + 38 * T(f.txt[0], f.txt[1]).length); };
  const tick = () => { if(screen !== "trig" || TG.st !== "learn" || (TG.ls || 1) !== 1){ TG.lbp = 0; return; }
    TG.lb = tglB() + 1; if(TG.lb >= F.length - 1){ TG.lbp = 0; tgPaint(); return; } TG.lbp = setTimeout(tick, wait()); tgPaint(); };
  TG.lbp = setTimeout(tick, 900); tgPaint();
}
// Stasjonen «Tabell»: den ferdige tabellen og de fire reglene, alltid ett trykk unna.
function tglRef(){
  const rule = (k, h, x) => `<div class="tg-val" style="--k:${k}"><b>${esc(h)}</b> ${rich(x)}</div>`;
  return { svg: null, read: tglBigTable(null) + `<div class="tglr">
    ${rule(TGL_SIN, "sin", T("Tallene 0, 1, 2, 3, 4 under roten, delt på 2: $\\frac{\\sqrt0}{2}, \\frac{\\sqrt1}{2}, \\frac{\\sqrt2}{2}, \\frac{\\sqrt3}{2}, \\frac{\\sqrt4}{2}$. Forenkle til slutt.", "The numbers 0, 1, 2, 3, 4 under the root, divided by 2: $\\frac{\\sqrt0}{2}, \\frac{\\sqrt1}{2}, \\frac{\\sqrt2}{2}, \\frac{\\sqrt3}{2}, \\frac{\\sqrt4}{2}$. Simplify at the end."))}
    ${rule(TGL_COS, "cos", T("Sinus baklengs: $\\cos v = \\sin(90^\\circ - v)$.", "Sine backwards: $\\cos\\theta = \\sin(90^\\circ - \\theta)$."))}
    ${rule("var(--ink)", "tan", T("Sinus delt på cosinus: $\\tan v = \\frac{\\sin v}{\\cos v}$. $\\tan 90^\\circ$ er ikke definert, fordi $\\cos 90^\\circ = 0$.", "Sine divided by cosine: $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$. $\\tan 90^\\circ$ is not defined, because $\\cos 90^\\circ = 0$."))}
    ${rule("var(--accent)", T("radianer", "radians"), T("$180^\\circ = \\pi$. Del på 6, 4, 3 og 2: $30^\\circ = \\frac{\\pi}{6}$, $45^\\circ = \\frac{\\pi}{4}$, $60^\\circ = \\frac{\\pi}{3}$, $90^\\circ = \\frac{\\pi}{2}$.", "$180^\\circ = \\pi$. Divide by 6, 4, 3 and 2: $30^\\circ = \\frac{\\pi}{6}$, $45^\\circ = \\frac{\\pi}{4}$, $60^\\circ = \\frac{\\pi}{3}$, $90^\\circ = \\frac{\\pi}{2}$."))}</div>
    <button class="big ghost tglr-go" data-a="tglbuild">🪜 ${esc(T("Gå gjennom tabellen trinn for trinn", "Go through the table step by step"))}</button>` };
}
function tglLearn(){
  const s = TG.ls || 1, sel = tglSel(), d = TGL_V[sel][0], V = tglV(), ft = `<p class="tg-where">${rich(T(TGL_TXT[s - 1].f[0], TGL_TXT[s - 1].f[1]))}</p>`;
  if(s === 1) return { svg: null, read: tglBuildHTML() };
  if(s === 4) return { svg: tglQuad(sel, { tan: 1 }), vb: "-40 -240 220 266",
    read: tglTable(["deg", "sin", "cos", "tan"], sel) + `<div class="tg-vals">${tgValBox("var(--ink)", TGL_TAN[sel] ? `\\tan ${d}^\\circ = \\dfrac{\\sin ${d}^\\circ}{\\cos ${d}^\\circ} = ${TGL_TAN[sel]}` : `\\tan 90^\\circ = \\dfrac{\\sin 90^\\circ}{\\cos 90^\\circ} = \\dfrac{1}{0} \;\\to\; ${tglUndef()}`)}</div>` + ft };
  if(s === 5) return { svg: tglQuad(sel, { sin: 1, cos: 1 }), vb: "-40 -170 210 196", read: tglTable(["deg", "rad", "sin", "cos", "tan"], sel) + tglQuizHTML() + `<button class="big ghost tglr-go" data-a="tgst" data-s="table">📋 ${esc(T("Se hele tabellen", "See the whole table"))}</button>` };
  const v = mod360(TG.v) === 0 && TG.v > 0 ? 360 : mod360(TG.v), c = Math.cos(tgRad(v)), sn = Math.sin(tgRad(v)), ex = tgExact(v);
  const vals = `<div class="tg-vals">${tgValBox(TGL_ANG, `${V} = ${tgDegTex(v)} = ${tgRadTex(v)}`)}${tgValBox(TGL_COS, tgValTex(`x = \\cos ${V}`, ex && ex.c, c))}${tgValBox(TGL_SIN, tgValTex(`y = \\sin ${V}`, ex && ex.s, sn))}</div>`;
  if(s === 2){
    const [px, py] = tgP(v); let g = tgBase(0, 0, TG_R, true);
    g += tgArc(24, 0, v, TGL_ANG, 3) + tgL(0, 0, px, 0, TGL_COS, 5, TGL_DASH) + tgL(px, 0, px, py, TGL_SIN, 5) + tgL(0, 0, px, py, "var(--ink)", 2.4);
    if(Math.abs(px) > 26) g += tgT(px / 2, sn >= 0 ? 15 : -15, "cos", TGL_COS, "middle", 12);
    if(Math.abs(py) > 26) g += tgT(px + (c >= 0 ? 8 : -8), py / 2, "sin", TGL_SIN, c >= 0 ? "start" : "end", 12);
    g += tgT(px / 2 - (sn >= 0 ? 10 : -10) * Math.sign(c || 1), py / 2 - 8, "1", "var(--ink)", "middle", 13);
    const lx = px + (c >= 0 ? 10 : -10), ly = py + (sn >= 0 ? -14 : 16); g += tgT(lx, ly, "P", "var(--accent)", c >= 0 ? "start" : "end", 14, 800);
    g += tgHandle(px, py, "var(--accent)", !TG.touched);
    const rad = `<p class="tg-id">${rich(T("Grader og radianer: en halv runde er $180^\\circ = \\pi$. Del på 6, 4, 3 og 2, så får du $30^\\circ = \\tfrac{\\pi}{6}$, $45^\\circ = \\tfrac{\\pi}{4}$, $60^\\circ = \\tfrac{\\pi}{3}$ og $90^\\circ = \\tfrac{\\pi}{2}$. De fem vinklene i radianer: $0, \\tfrac{\\pi}{6}, \\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}$ og $\\tfrac{\\pi}{2}$. Én hel omdreining er $360^\\circ = 2\\pi$ radianer, og første kvadrant går fra $0$ til $\\tfrac{\\pi}{2}$. Ikke bland sammen: $2\\pi$ er vinkelen for én hel runde. Omkretsen til enhetssirkelen er også $2\\pi$, men det er en lengde. Fordi radien er 1, er vinkelen i radianer lik buelengden fra $(1, 0)$ til $P$.",
      "Degrees and radians: half a turn is $180^\\circ = \\pi$. Divide by 6, 4, 3 and 2 to get $30^\\circ = \\tfrac{\\pi}{6}$, $45^\\circ = \\tfrac{\\pi}{4}$, $60^\\circ = \\tfrac{\\pi}{3}$ and $90^\\circ = \\tfrac{\\pi}{2}$. The five angles in radians: $0, \\tfrac{\\pi}{6}, \\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}$ and $\\tfrac{\\pi}{2}$. One full turn is $360^\\circ = 2\\pi$ radians, and the first quadrant goes from $0$ to $\\tfrac{\\pi}{2}$. Do not mix them up: $2\\pi$ is the angle of one full turn. The circumference of the unit circle is also $2\\pi$, but that is a length. Because the radius is 1, the angle in radians equals the arc length from $(1, 0)$ to $P$."))}</p>`;
    return { svg: g, vb: "-165 -165 330 330", read: vals + `<div class="tg-val tgl-p">${tex(`P = (\\,${mcA("\\cos " + V)},\\ ${mcB("\\sin " + V)}\\,)`)}</div>` + ft + rad };
  }
  // steg 3: sirkel til venstre, begge grafene til høyre
  const X = tglX, Y = tglY, m = "var(--muted)";
  let g = tgAxes(TG_GR + 22, TG_CX, TG_CY, TG_GR, false) + `<circle cx="${TG_CX}" cy="${TG_CY}" r="${TG_GR}" style="fill:none;stroke:var(--ink);stroke-width:2;opacity:.55"/>`;
  g += tgL(TG_GX - 4, TG_CY, TG_GX + TG_GW + 16, TG_CY, m, 1.3) + tgArrow(TG_GX + TG_GW + 20, TG_CY, "r", m) + tgL(TG_GX, TG_CY + TG_GR + 16, TG_GX, TG_CY - TG_GR - 30, m, 1.3) + tgArrow(TG_GX, TG_CY - TG_GR - 32, "u", m);
  [[90, "π/2"], [180, "π"], [270, "3π/2"], [360, "2π"]].forEach(([dd, l]) => { g += tgL(X(dd), TG_CY - 4, X(dd), TG_CY + 4, m, 1.3) + tgT(X(dd), TG_CY + 22, l, m, "middle", 21, 700); });
  g += tgT(TG_GX - 8, Y(1), "1", m, "end", 19, 600) + tgT(TG_GX - 8, Y(-1), "−1", m, "end", 19, 600) + tgL(TG_GX - 4, Y(1), TG_GX + TG_GW, Y(1), m, 1, 'stroke-dasharray="2 5" opacity=".6"') + tgL(TG_GX - 4, Y(-1), TG_GX + TG_GW, Y(-1), m, 1, 'stroke-dasharray="2 5" opacity=".6"');
  // forskyvningen: toppen til cos ved 0, toppen til sin ved π/2
  const ya = Y(1) - 20; g += tgL(X(0) + 3, ya, X(90) - 3, ya, "var(--ink)", 1.6) + tgArrow(X(90) - 1, ya, "r", "var(--ink)") + `<polygon points="${tf1(X(0) + 1)},${tf1(ya)} ${tf1(X(0) + 10)},${tf1(ya - 4.5)} ${tf1(X(0) + 10)},${tf1(ya + 4.5)}" style="fill:var(--ink)"/>` + tgT((X(0) + X(90)) / 2, ya - 15, "π/2", "var(--ink)", "middle", 21, 800);
  g += `<path d="${tglPath(tglCurve("sin"))}" style="fill:none;stroke:${TGL_SIN};stroke-width:2;opacity:.3"/><path d="${tglPath(tglCurve("cos"))}" style="fill:none;stroke:${TGL_COS};stroke-width:2;opacity:.3" ${TGL_DASH}/>`;
  if(v > 0) g += `<path d="${tglPath(tglCurve("sin", 0, v))}" style="fill:none;stroke:${TGL_SIN};stroke-width:3.6" stroke-linecap="round"/><path d="${tglPath(tglCurve("cos", 0, v))}" style="fill:none;stroke:${TGL_COS};stroke-width:3.6" ${TGL_DASH}/>`;
  g += tgDot(X(0), Y(1), TGL_COS, 4.5) + tgDot(X(90), Y(1), TGL_SIN, 4.5) + tgT(X(360) - 6, Y(Math.cos(tgRad(350))) - 14, "cos", TGL_COS, "end", 21) + tgT(X(180) + 10, Y(Math.sin(tgRad(160))) - 12, "sin", TGL_SIN, "start", 21);
  const [qx, qy] = tgP(v, TG_GR), cx = TG_CX + qx, cy = TG_CY + qy, gx = X(v);
  g += tgArc(18, 0, v, TGL_ANG, 2.6, TG_CX, TG_CY) + tgL(TG_CX, TG_CY, cx, TG_CY, TGL_COS, 4.5, TGL_DASH) + tgL(cx, TG_CY, cx, cy, TGL_SIN, 4.5) + tgL(TG_CX, TG_CY, cx, cy, "var(--ink)", 2);
  g += tgL(cx, cy, gx, Y(sn), TGL_SIN, 1.3, 'stroke-dasharray="3 4" opacity=".7"') + tgL(gx, TG_CY, gx, Y(sn), TGL_SIN, 4) + tgL(gx + 5, TG_CY, gx + 5, Y(c), TGL_COS, 4, TGL_DASH);
  g += tgDot(gx, Y(sn), TGL_SIN, 5.5) + tgDot(gx + 5, Y(c), TGL_COS, 5.5) + tgHandle(cx, cy, "var(--accent)", !TG.touched);
  // sinus forskjøvet sh grader til venstre: sin(v + sh). Ved sh = 90° (π/2) ligger den oppå cosinus.
  const sh = TG.wsh;
  if(sh != null) g += `<path d="${tglPath(tglCurve("sin", 0, 360, 2, sh))}" style="fill:none;stroke:${TGL_ANG};stroke-width:4.4;opacity:.85" stroke-linecap="round"/>` + tgDot(X(90 - sh), Y(1), TGL_ANG, 6.5);
  const shv = sh == null ? "" : `<div class="tg-vals">${tgValBox(TGL_ANG, `\\sin\\left(${V} + ${sh >= 90 ? "\\tfrac{\\pi}{2}" : tgRadTex(Math.round(sh))}\\right)${sh >= 90 ? ` = ${mcA("\\cos " + V)}` : ""}`)}</div>${sh >= 90 ? `<p class="tg-where">${rich(T("Sinusbølgen flyttet $\\frac{\\pi}{2}$ til venstre lander nøyaktig oppå cosinusbølgen.", "The sine wave moved $\\frac{\\pi}{2}$ to the left lands exactly on the cosine wave."))}</p>` : ""}`;
  const keys = `<p class="tg-id">${rich(T("Viktige punkter: ved $v = 0$ er $\\cos v = 1$ og $\\sin v = 0$. Ved $\\tfrac{\\pi}{2}$ er $\\cos v = 0$ og $\\sin v = 1$. Ved $\\pi$ er $\\cos v = -1$ og $\\sin v = 0$. Ved $\\tfrac{3\\pi}{2}$ er $\\cos v = 0$ og $\\sin v = -1$. Ved $2\\pi$ er punktet tilbake der det startet.",
    "Key points: at $\\theta = 0$, $\\cos\\theta = 1$ and $\\sin\\theta = 0$. At $\\tfrac{\\pi}{2}$, $\\cos\\theta = 0$ and $\\sin\\theta = 1$. At $\\pi$, $\\cos\\theta = -1$ and $\\sin\\theta = 0$. At $\\tfrac{3\\pi}{2}$, $\\cos\\theta = 0$ and $\\sin\\theta = -1$. At $2\\pi$ the point is back where it started."))}</p>`;
  return { svg: g, vb: "0 0 640 300", read: shv + vals + ft + keys };
}
const tglWide = () => TG.st === "learn" && (TG.ls || 1) === 3;
function tglIntroHTML(){
  const s = TG.ls || 1, x = TGL_TXT[s - 1];
  return `<nav class="tgl-steps" aria-label="${esc(T("Steg", "Steps"))}">${TGL_TXT.map((st, i) => `<button class="${i + 1 === s ? "on" : i + 1 < s ? "done" : ""}" data-a="tgls" data-v="${i + 1}" aria-label="${esc(T("Steg", "Step") + " " + (i + 1) + ": " + T(st.t[0], st.t[1]))}" ${i + 1 === s ? 'aria-current="step"' : ""}>${i + 1}</button>`).join("")}</nav>
    <h3 class="tgl-h">${esc(T("Steg", "Step"))} ${s}: ${esc(T(x.t[0], x.t[1]))}</h3><p class="tg-intro">${rich(T(x.p[0], x.p[1]))}</p>`;
}
function tglNavHTML(){
  const s = TG.ls || 1; if(s === 1) return ""; // steg 1 har egne knapper (tglBuildHTML)
  return `<div class="tgl-nav">${s > 1 ? `<button class="big ghost" data-a="tgls" data-v="${s - 1}">← ${esc(T("Forrige", "Back"))}</button>` : "<span></span>"}${s < TGL_N ? `<button class="big" data-a="tgls" data-v="${s + 1}">${esc(T("Neste steg", "Next step"))} →</button>` : ""}</div>`;
}

// ---------- side og samspill ----------
const TG_PAINT = { learn: tglLearn, table: tglRef, explore: tgExplore, exact: tgExactFig, radians: tgRadians, sym: tgSym, graphs: tgGraphs, eq: tgEq };
const TG_INTRO = {
  learn: ["", ""], // tglIntroHTML
  table: ["Alle verdiene du bør kunne, samlet på ett sted. Kom tilbake hit når du vil slå opp noe.", "All the values you should know, in one place. Come back here whenever you want to look something up."],
  explore: ["Dra punktet rundt sirkelen. Punktet har koordinatene $(\\cos v, \\sin v)$: cos er hvor langt til siden, sin er hvor høyt opp. Radien er alltid 1.", "Drag the point around the circle. The point has coordinates $(\\cos\\theta, \\sin\\theta)$: cos is how far across, sin is how far up. The radius is always 1."],
  exact: ["Noen vinkler har eksakte verdier du bør kunne. De kommer fra to trekanter: et halvt kvadrat (45°) og en halv likesidet trekant (30° og 60°).", "Some angles have exact values you should know. They come from two triangles: half a square (45°) and half an equilateral triangle (30° and 60°)."],
  radians: ["En radian er vinkelen der buen er like lang som radien. På enhetssirkelen er vinkelen i radianer rett og slett buelengden.", "A radian is the angle where the arc is as long as the radius. On the unit circle the angle in radians is simply the arc length."],
  sym: ["Speil punktet, og se hvordan sin og cos henger sammen. Da trenger du bare å kunne 1. kvadrant, resten følger av symmetri.", "Mirror the point and see how sin and cos are related. Then you only need to know quadrant I, the rest follows from symmetry."],
  graphs: ["Rull ut sirkelen: høyden til punktet gir sinusgrafen, og x-koordinaten gir cosinusgrafen.", "Unroll the circle: the height of the point gives the sine graph, and the x-coordinate gives the cosine graph."],
  eq: ["Løs $\\sin x = a$ ved å tegne linja $y = a$. Den treffer sirkelen to steder, og derfor har likningen to løsninger per runde. Dra linja.", "Solve $\\sin x = a$ by drawing the line $y = a$. It hits the circle in two places, which is why the equation has two solutions per turn. Drag the line."],
  quiz: ["Bruk det du har lært. Svar raskt og bygg opp en rekke.", "Use what you have learned. Answer quickly and build a streak."]
};
function tgOpen(st, from){
  TG.from = from || (screen === "trig" ? TG.from : screen); if(st && TG_PAINT[st] || st === "quiz") TG.st = st;
  cancelAnimationFrame(TG.anim); TG.anim = 0; overlay = null; screen = "trig"; (S.tgSeen ||= {})[TG.st] = 1; save(); render(); window.scrollTo(0, 0);
}
function tgRouteOpen(slug){ const s = TG_ST.find(x => x[4] === slug || x[5] === slug); TG.st = s ? s[0] : "explore"; TG.from = "home"; }
const tgSlug = () => { const s = TG_ST.find(x => x[0] === TG.st); return s[LANG === "en" ? 5 : 4]; };
function tgControlsHTML(){
  const seg = (a, opts, cur) => `<div class="seg tg-seg">${opts.map(([v, l]) => `<button class="${String(v) === String(cur) ? "on" : ""}" data-a="${a}" data-v="${v}">${l}</button>`).join("")}</div>`;
  const tog = (k, l) => `<button class="tg-chip ${TG[k] ? "on" : ""}" data-a="tgtog" data-k="${k}" aria-pressed="${!!TG[k]}">${l}</button>`;
  const units = seg("tgrad", [[0, T("Grader", "Degrees")], [1, T("Radianer", "Radians")]], TG.rad ? 1 : 0);
  const range = (max = 359) => `<label class="tg-range"><span>${esc(tgVt())}</span><input type="range" id="tgrange" min="0" max="${max}" step="1" value="${Math.round(TG.v)}" aria-label="${esc(T("Vinkel i grader", "Angle in degrees"))}"></label>`;
  const spin = `<button class="tg-chip" data-a="tgspin">${TG.anim ? "⏸ " + T("Stopp", "Stop") : "▶ " + T("Snurr", "Spin")}</button>`;
  switch(TG.st){
    case "learn": { const s = TG.ls || 1; return (s === 2 || s === 3 ? `${range(360)}<div class="tg-ctl">${spin}${s === 3 ? `<button class="tg-chip" data-a="tglshift">↔ ${esc(T("Forskyv sinus π/2", "Shift sine π/2"))}</button>` : ""}</div>` : s !== 4 ? "" : `<p class="picknote">${esc(T("Trykk på et punkt eller en kolonne i tabellen for å velge vinkel.", "Tap a point or a column in the table to choose an angle."))}</p>`); }
    case "explore": return `${range()}<div class="tg-ctl">${units}${tog("tan", "tan")}${tog("ref", T("Referansevinkel", "Reference angle"))}${tog("snap", T("Fest til fine vinkler", "Snap to nice angles"))}${tog("eul", "Euler e<sup>i" + esc(tgVt()) + "</sup>")}${spin}</div>`;
    case "exact": return `<div class="tg-ctl">${seg("tgex", [["45", "45°"], ["3060", "30° / 60°"], ["all", T("Hele sirkelen", "Whole circle")]], TG.ex)}${TG.ex === "3060" ? seg("tge36", [[60, "60°"], [30, "30°"]], TG.e36) : ""}${TG.ex === "all" ? units : ""}</div>`;
    case "radians": return `${range(360)}<div class="tg-ctl tg-quick">${[30, 45, 60, 90, 120, 180, 270, 360].map(d => `<button class="tg-chip ${TG.v === d ? "on" : ""}" data-a="tgset" data-v="${d}">${tex(tgRadTex(d))}</button>`).join("")}${spin}</div>`;
    case "sym": return `${range()}<div class="tg-ctl">${seg("tgsym", [["m180", TG.rad ? "π − " + tgVt() : "180° − " + tgVt()], ["p180", TG.rad ? "π + " + tgVt() : "180° + " + tgVt()], ["neg", "−" + tgVt()], ["c90", TG.rad ? "π/2 − " + tgVt() : "90° − " + tgVt()]], TG.sym)}${units}</div>`;
    case "graphs": return `<div class="tg-ctl">${seg("tggr", [["unroll", T("Rull ut", "Unroll")], ["trans", T("Transformer", "Transform")]], TG.gr)}${TG.gr === "unroll" ? seg("tgfn", [["sin", "sin"], ["cos", "cos"]], TG.fn) + units + spin : ""}</div>${TG.gr === "unroll" ? range(360) : tgTransSliders()}`;
    case "eq": return `<label class="tg-range"><span>a</span><input type="range" id="tgarange" min="${TG.eq === "tan" ? -3 : -1}" max="${TG.eq === "tan" ? 3 : 1}" step="0.01" value="${TG.a}" aria-label="a"></label><div class="tg-ctl">${seg("tgeq", [["sin", "sin x = a"], ["cos", "cos x = a"], ["tan", "tan x = a"]], TG.eq)}${units}</div>`;
    default: return "";
  }
}
function tgTransSliders(){
  const sl = (id, lbl, min, max, step, val) => `<label class="tg-range"><span>${lbl}</span><input type="range" data-tgk="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><b id="tgk_${id}">${id === "ph" ? tex(TG_PH[val + 4]) : esc(nf(val, 1))}</b></label>`;
  return `<div class="tg-sliders">${sl("A", "A", -3, 3, 0.5, TG.A)}${sl("k", "k", 0.5, 4, 0.5, TG.k)}${sl("ph", "φ", -4, 4, 1, TG.ph)}${sl("d", "d", -2, 2, 0.5, TG.d)}</div>`;
}
function renderTrig(){
  const st = TG_ST.find(x => x[0] === TG.st) || TG_ST[0], i = TG_ST.indexOf(st), nx = TG_ST[i + 1], seen = S.tgSeen || {};
  const tabs = `<nav class="tg-tabs" aria-label="${esc(T("Stasjoner", "Stations"))}">${TG_ST.map(s => `<button class="${s[0] === TG.st ? "on" : ""} ${seen[s[0]] ? "seen" : ""}" data-a="tgst" data-s="${s[0]}" ${s[0] === TG.st ? 'aria-current="page"' : ""}><span aria-hidden="true">${s[1]}</span>${esc(T(s[2], s[3]))}</button>`).join("")}</nav>`;
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="tgback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(t("tgKicker"))}</small><b>${esc(t("tgTitle"))}</b></div></div></div>`;
  const intro = TG.st === "learn" ? tglIntroHTML() : `<p class="tg-intro">${rich(T(TG_INTRO[TG.st][0], TG_INTRO[TG.st][1]))}</p>`;
  if(TG.st === "quiz"){ $app.innerHTML = `${top}<div class="wrap tg-tw">${tabs}</div><main class="wrap tg tg-quiz">${TG.quiz ? "" : intro}${tgQuizHTML()}</main>`; tgBind(); return; }
  const wide = TG.st === "graphs" || tglWide(), nofig = TG.st === "table" || TG.st === "learn" && (TG.ls || 1) === 1;
  $app.innerHTML = `${top}<div class="wrap tg-tw">${tabs}</div><main class="wrap tg">${intro}
    ${nofig ? "" : `<div class="tg-figwrap ${wide ? "wide" : ""}"><svg id="tgsvg" class="tg-svg" viewBox="${TG.st === "learn" ? tglLearn().vb : wide ? "0 0 640 300" : "-165 -165 330 330"}" role="img" aria-label="${esc(T("Enhetssirkelen, dra punktet", "The unit circle, drag the point"))}"></svg></div>`}
    ${tgControlsHTML()}<div id="tgread" class="tg-read" aria-live="polite"></div>
    ${TG.st === "exact" ? tgMemoHTML() : ""}<div id="tggoals">${tgGoalsHTML(TG.st === "graphs" && TG.gr !== "trans" ? "" : TG.st)}</div>
    ${TG.st === "learn" ? tglNavHTML() : ""}${nx && (TG.st !== "learn" || (TG.ls || 1) === TGL_N) ? `<button class="big tg-next" data-a="tgst" data-s="${nx[0]}">${esc(T("Neste:", "Next:"))} ${nx[1]} ${esc(T(nx[2], nx[3]))}</button>` : ""}</main>`;
  tgPaint(); tgBind();
}
function tgPaint(){
  const svg = document.getElementById("tgsvg");
  if(TG.st === "quiz"){ const Q = TG.quiz; if(svg && Q && !Q.done) svg.innerHTML = tgQFig(Q.items[Q.i]); return; }
  const r = TG_PAINT[TG.st](); if(svg && r.svg){ svg.innerHTML = r.svg; if(r.vb && svg.getAttribute("viewBox") !== r.vb) svg.setAttribute("viewBox", r.vb); }
  const rd = document.getElementById("tgread"); if(rd) rd.innerHTML = r.read;
  const rg = document.getElementById("tgrange"); if(rg && +rg.value !== Math.round(TG.v)) rg.value = Math.round(TG.v);
  tgCheckGoals();
}
// Pekerposisjon i SVG-koordinater.
function tgPt(svg, e){ const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const m = svg.getScreenCTM(); return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 }; }
const tgAngleAt = (x, y, cx = 0, cy = 0) => mod360(tgDeg(Math.atan2(-(y - cy), x - cx)));
function tgSnapTo(d, list, tol){ let best = null, bd = 1e9; for(const s of list){ const dd = Math.min(Math.abs(d - s), 360 - Math.abs(d - s)); if(dd < bd){ bd = dd; best = s; } } return bd <= tol ? best : null; }
function tgDragAt(svg, e){
  const p = tgPt(svg, e);
  if(TG.st === "quiz"){ const Q = TG.quiz; if(!Q || Q.done || Q.ans) return; const it = Q.items[Q.i]; if(it.type !== "place") return;
    const d = tgSnapTo(tgAngleAt(p.x, p.y), TG_SPECIALS, 180); if(d !== it.placed){ it.placed = d; sfx("tap"); svg.innerHTML = tgQFig(it); const b = document.querySelector(".tg-check"); if(b) b.disabled = false; } return; }
  TG.touched = true;
  if(TG.st === "learn"){ const s = TG.ls || 1;
    if(s === 1 || s === 5) return;
    if(s === 4){ let d = tgAngleAt(p.x, p.y); if(d > 225) d = 0; else if(d > 90) d = 90;
      const i = TGL_V.reduce((b, v, k) => Math.abs(v[0] - d) < Math.abs(TGL_V[b][0] - d) ? k : b, 0); if(i !== TG.lsel){ TG.lsel = i; sfx("tap"); tgPaint(); } return; }
    let d = s === 3 && p.x > TG_GX - 20 ? Math.max(0, Math.min(360, (p.x - TG_GX) * 360 / TG_GW)) : tgAngleAt(p.x, p.y, s === 3 ? TG_CX : 0, s === 3 ? TG_CY : 0);
    const sn = tgSnapTo(d, TG_SPECIALS.concat(s === 3 ? [360] : []), 3), nv = sn != null ? sn : Math.round(d);
    if(nv !== TG.v){ if(sn != null && sn !== TG.lastSnap) sfx("tap"); TG.lastSnap = sn; TG.v = nv; tgPaint(); } return; }
  if(TG.st === "exact"){ if(TG.ex !== "all") return; const d = tgSnapTo(tgAngleAt(p.x, p.y), TG_SPECIALS, 180); if(d !== TG.exSel){ TG.exSel = d; sfx("tap"); tgPaint(); } return; }
  if(TG.st === "eq"){
    let a = TG.eq === "sin" ? -p.y / TG_R : TG.eq === "cos" ? p.x / TG_R : (Math.abs(p.x) < 8 ? TG.a : -p.y / p.x);
    if(TG.eq === "tan" && p.x > TG_R * 0.6) a = -p.y / TG_R;
    const lim = TG.eq === "tan" ? 3 : 1; a = Math.max(-lim, Math.min(lim, a)); a = tgSnapNice(a, TG.eq === "tan" ? TG_NICE_TAN : TG_NICE, 0.035); a = Math.round(a * 1e6) / 1e6;
    if(Math.abs(Math.abs(a) - 1) < 0.02 && TG.eq !== "tan") a = Math.sign(a);
    TG.a = a; const r = document.getElementById("tgarange"); if(r) r.value = a; tgPaint(); return; }
  let d;
  if(TG.st === "graphs"){ if(TG.gr !== "unroll") return; d = p.x > TG_GX - 20 ? Math.max(0, Math.min(360, (p.x - TG_GX) * 360 / TG_GW)) : tgAngleAt(p.x, p.y, TG_CX, TG_CY); }
  else d = tgAngleAt(p.x, p.y);
  if(TG.st === "radians" && TG.v > 300 && d < 60 && TG.dragging) d = 360; // dra forbi en hel runde
  const sn = (TG.snap || TG.st !== "explore") && TG.st !== "radians" ? tgSnapTo(d, TG_SPECIALS, TG.st === "explore" ? 4 : 3) : TG.st === "radians" ? tgSnapTo(d, [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360], 2.5) : null;
  const nv = sn != null ? sn : Math.round(d);
  if(nv !== TG.v){ if(sn != null && sn !== TG.lastSnap) sfx("tap"); TG.lastSnap = sn; TG.v = nv; tgPaint(); }
}
function tgBind(){
  const svg = document.getElementById("tgsvg");
  if(svg){
    const move = e => { if(!TG.dragging) return; e.preventDefault(); tgDragAt(svg, e); };
    svg.addEventListener("pointerdown", e => { TG.dragging = true; if(TG.anim){ cancelAnimationFrame(TG.anim); TG.anim = 0; } try{ svg.setPointerCapture(e.pointerId); }catch(x){} tgDragAt(svg, e); });
    svg.addEventListener("pointermove", move);
    const up = () => { TG.dragging = false; }; svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
  }
  const rg = document.getElementById("tgrange"); if(rg) rg.addEventListener("input", () => { TG.v = +rg.value; TG.touched = true; tgPaint(); });
  const ar = document.getElementById("tgarange"); if(ar) ar.addEventListener("input", () => { TG.a = tgSnapNice(+ar.value, TG.eq === "tan" ? TG_NICE_TAN : TG_NICE, 0.012); tgPaint(); });
  document.querySelectorAll("[data-tgk]").forEach(inp => inp.addEventListener("input", () => { const k = inp.dataset.tgk; TG[k] = +inp.value; const b = document.getElementById("tgk_" + k); if(b) b.innerHTML = k === "ph" ? tex(TG_PH[TG.ph + 4]) : esc(nf(TG[k], 1)); tgPaint(); }));
}
function tgSpin(){
  if(TG.anim){ cancelAnimationFrame(TG.anim); TG.anim = 0; render(); return; }
  const max = TG.st === "explore" || TG.st === "sym" ? 359 : 360; if(TG.v >= max) TG.v = 0; TG.touched = true; let last = performance.now();
  const step = now => { if(screen !== "trig" || !TG.anim){ TG.anim = 0; return; } const dt = Math.min(64, now - last); last = now; TG.v = Math.min(max, TG.v + dt * 0.06);
    const rv = TG.v; TG.v = Math.round(rv * 10) / 10; tgPaint(); TG.v = rv; if(rv >= max){ TG.v = max === 359 ? 0 : 360; TG.anim = 0; tgPaint(); const b = document.querySelector('[data-a="tgspin"]'); if(b) b.textContent = "▶ " + T("Snurr", "Spin"); return; } TG.anim = requestAnimationFrame(step); };
  TG.anim = requestAnimationFrame(step); const b = document.querySelector('[data-a="tgspin"]'); if(b) b.textContent = "⏸ " + T("Stopp", "Stop");
}
// Steg 3: sinusbølgen glir π/2 (90°) til venstre og lander oppå cosinusbølgen.
function tglShift(){
  cancelAnimationFrame(TG.wan); TG.wan = 0; cancelAnimationFrame(TG.anim); TG.anim = 0;
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches){ TG.wsh = 90; tgPaint(); return; }
  TG.wsh = 0; const t0 = performance.now();
  const step = now => { if(screen !== "trig" || TG.st !== "learn" || (TG.ls || 1) !== 3 || TG.wsh == null){ TG.wan = 0; return; }
    const p = Math.max(0, Math.min(1, (now - t0 - 500) / 2600)), e = p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p);
    TG.wsh = 90 * e; tgPaint(); if(p < 1) TG.wan = requestAnimationFrame(step); else { TG.wan = 0; TG.wsh = 90; sfx("ok"); tgPaint(); } };
  TG.wan = requestAnimationFrame(step);
}
function tgClick(a, b){
  if(!a.startsWith("tg")) return false;
  const d = b && b.dataset;
  if(a === "tgopen"){ tgOpen(d.s, screen); return true; }
  if(a === "tggame"){ TG.quiz = null; tgOpen("quiz", screen); return true; }
  if(a === "tgback"){ labBack(TG.from); return true; }
  if(a === "tgst"){ tglPlayStop(); cancelAnimationFrame(TG.anim); TG.anim = 0; TG.st = d.s; if(TG.st === "radians" && TG.v > 360) TG.v = 30; if(TG.st !== "radians" && TG.v === 360) TG.v = 0; (S.tgSeen ||= {})[TG.st] = 1; save(); render(); window.scrollTo(0, 0); return true; }
  if(a === "tgrad"){ TG.rad = d.v === "1"; render(); return true; }
  if(a === "tgtog"){ TG[d.k] = !TG[d.k]; render(); return true; }
  if(a === "tgspin"){ tgSpin(); return true; }
  if(a === "tgset"){ TG.v = +d.v; TG.touched = true; render(); return true; }
  if(a === "tgex"){ TG.ex = d.v; render(); return true; }
  if(a === "tge36"){ TG.e36 = +d.v; render(); return true; }
  if(a === "tgsym"){ TG.sym = d.v; render(); return true; }
  if(a === "tggr"){ TG.gr = d.v; render(); return true; }
  if(a === "tgfn"){ TG.fn = d.v; render(); return true; }
  if(a === "tgeq"){ TG.eq = d.v; if(TG.eq !== "tan") TG.a = Math.max(-1, Math.min(1, TG.a)); render(); return true; }
  if(a === "tgls"){ tglPlayStop(); cancelAnimationFrame(TG.wan); TG.wan = 0; TG.wsh = null; TG.ls = Math.max(1, Math.min(TGL_N, +d.v)); if(TG.ls === 2 || TG.ls === 3){ cancelAnimationFrame(TG.anim); TG.anim = 0; if(TG.v > 360) TG.v = 30; } render(); window.scrollTo(0, 0); return true; }
  if(a === "tglb"){ tglPlayStop(); TG.lb = +d.v; TG.lb = tglB(); sfx("tap"); tgPaint();
    const f = [b.id, "tglbNext", "tglbPrev"].map(id => document.getElementById(id)).find(x => x && !x.disabled); if(f) f.focus({ preventScroll: true }); return true; }
  if(a === "tglplay"){ tglPlay(); const f = document.getElementById("tglbPlay"); if(f) f.focus(); return true; }
  if(a === "tglbuild"){ tglPlayStop(); TG.ls = 1; TG.lb = 0; tgOpen("learn", TG.from); return true; }
  if(a === "tglshift"){ tglShift(); return true; }
  if(a === "tglsel"){ TG.lsel = +d.i; tgPaint(); return true; }
  if(a === "tglans"){ if(TG.lq && TG.lq.pick < 0){ TG.lq.pick = +d.k; const ok = TG.lq.opts[TG.lq.pick] === tglAnswer(TG.lq.fn, TG.lq.i); sfx(ok ? "ok" : "bad"); buzz(ok); tgPaint(); } return true; }
  if(a === "tglq"){ tglNewQ(); tgPaint(); return true; }
  if(a === "tgqstart"){ tgQStart(); return true; }
  if(a === "tgans"){ const Q = TG.quiz, it = Q.items[Q.i], i = +d.i; tgQAnswer(it.opts[i] === it.right, i); return true; }
  if(a === "tgcheck"){ const it = TG.quiz.items[TG.quiz.i]; if(it.placed != null) tgQAnswer(it.placed === it.d, null); return true; }
  if(a === "tgqnext"){ tgQNext(); window.scrollTo(0, 0); return true; }
  return false;
}
