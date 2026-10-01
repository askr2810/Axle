// ============================================================
//  ENHETSSIRKELEN – interaktiv lab for trigonometri (1T, R2 og grunnkurset i matte).
//  Sju stasjoner (Utforsk har også Eulers formel e^{iv}): Eksakte verdier, Radianer, Symmetri, Grafer, Likninger og Øv (runde med poeng).
//  Punktet dras rett i figuren (pekerhendelser), og en glidebryter under gjør det samme (tastatur og skjermleser).
//  Nås fra Bevis-siden, fra teorien i trigonometri-enhetene, fra spillmenyen og på #/enhetssirkel/<stasjon>.
//  Framdrift: S.tgSeen (besøkte stasjoner), S.tgGoals (løste utfordringer), S.tgBest (rekord i Øv).
// ============================================================
let TG = { st: "explore", v: 30, rad: false, snap: true, tan: false, ref: false, touched: false, ex: "45", e36: 60, exSel: 210, sym: "m180",
  gr: "unroll", fn: "sin", A: 1, k: 1, ph: 0, d: 0, eq: "sin", a: 0.5, from: "home", anim: 0, quiz: null };
const TG_ST = [["explore", "🧭", "Utforsk", "Explore", "utforsk", "explore"], ["exact", "✨", "Eksakte verdier", "Exact values", "eksakte", "exact"],
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
    ${ans ? `<div class="tg-fb ${ans.ok ? "ok" : "bad"}"><b>${esc(ans.ok ? tgPick(T(["Riktig!", "Sånn ja!", "Perfekt!"], ["Correct!", "Nice!", "Perfect!"])) : T("Ikke helt", "Not quite"))}</b><p>${tgQExpl(it)}</p></div><button class="big" data-a="tgqnext">${esc(Q.i + 1 < TG_QN ? T("Neste", "Next") : T("Se resultatet", "See the result"))}</button>` : ""}`;
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

// ---------- side og samspill ----------
const TG_PAINT = { explore: tgExplore, exact: tgExactFig, radians: tgRadians, sym: tgSym, graphs: tgGraphs, eq: tgEq };
const TG_INTRO = {
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
  const intro = `<p class="tg-intro">${rich(T(TG_INTRO[TG.st][0], TG_INTRO[TG.st][1]))}</p>`;
  if(TG.st === "quiz"){ $app.innerHTML = `${top}<div class="wrap tg-tw">${tabs}</div><main class="wrap tg tg-quiz">${TG.quiz ? "" : intro}${tgQuizHTML()}</main>`; tgBind(); return; }
  const wide = TG.st === "graphs";
  $app.innerHTML = `${top}<div class="wrap tg-tw">${tabs}</div><main class="wrap tg">${intro}
    <div class="tg-figwrap ${wide ? "wide" : ""}"><svg id="tgsvg" class="tg-svg" viewBox="${wide ? "0 0 640 300" : "-165 -165 330 330"}" role="img" aria-label="${esc(T("Enhetssirkelen, dra punktet", "The unit circle, drag the point"))}"></svg></div>
    ${tgControlsHTML()}<div id="tgread" class="tg-read" aria-live="polite"></div>
    ${TG.st === "exact" ? tgMemoHTML() : ""}<div id="tggoals">${tgGoalsHTML(TG.st === "graphs" && TG.gr !== "trans" ? "" : TG.st)}</div>
    ${nx ? `<button class="big tg-next" data-a="tgst" data-s="${nx[0]}">${esc(T("Neste:", "Next:"))} ${nx[1]} ${esc(T(nx[2], nx[3]))}</button>` : ""}</main>`;
  tgPaint(); tgBind();
}
function tgPaint(){
  const svg = document.getElementById("tgsvg"); if(!svg) return;
  if(TG.st === "quiz"){ const Q = TG.quiz; if(Q && !Q.done) svg.innerHTML = tgQFig(Q.items[Q.i]); return; }
  const r = TG_PAINT[TG.st](); svg.innerHTML = r.svg;
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
function tgClick(a, b){
  if(!a.startsWith("tg")) return false;
  const d = b && b.dataset;
  if(a === "tgopen"){ tgOpen(d.s, screen); return true; }
  if(a === "tggame"){ TG.quiz = null; tgOpen("quiz", screen); return true; }
  if(a === "tgback"){ labBack(TG.from); return true; }
  if(a === "tgst"){ cancelAnimationFrame(TG.anim); TG.anim = 0; TG.st = d.s; if(TG.st === "radians" && TG.v > 360) TG.v = 30; if(TG.st !== "radians" && TG.v === 360) TG.v = 0; (S.tgSeen ||= {})[TG.st] = 1; save(); render(); window.scrollTo(0, 0); return true; }
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
  if(a === "tgqstart"){ tgQStart(); return true; }
  if(a === "tgans"){ const Q = TG.quiz, it = Q.items[Q.i], i = +d.i; tgQAnswer(it.opts[i] === it.right, i); return true; }
  if(a === "tgcheck"){ const it = TG.quiz.items[TG.quiz.i]; if(it.placed != null) tgQAnswer(it.placed === it.d, null); return true; }
  if(a === "tgqnext"){ tgQNext(); window.scrollTo(0, 0); return true; }
  return false;
}
