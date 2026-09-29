// ============================================================
//  KRAFTLAB – et lodd i to snorer, over trinser og i talje, med dekomponering av kreftene.
//  • To snorer: loddet henger i to snorer festet i taket. Vinklene α (venstre) og β (høyre) velges hver for seg.
//  • Over trinser: snorene går over to trinser ned til motvekter. Styr med vinklene (motvektene regnes ut)
//    eller med massene (likevektsvinklene regnes ut). Kraften på hver trinse vises som en egen pil.
//  • Talje: n snorparter bærer lasten, F = G/n.
//  Dra loddet rett i figuren, eller bruk glidebryterne. Bryterne øverst skrur av og på det man vil se.
// ============================================================
let FC = { mode: "ropes", a: 40, b: 25, m: 10, ctrl: "angles", m1: 8, m2: 7, M: 10, n: 4, h: 1, from: "home",
  show: { str: true, comp: true, pul: true, ang: true, tri: true, vals: true } };
const FC_G = 9.81, FC_A = 120, FC_MODES = [["ropes", "🪢", "To snorer", "Two ropes", "snorer", "ropes"], ["pulleys", "⚙️", "Over trinser", "Over pulleys", "trinser", "pulleys"], ["tackle", "🏗️", "Talje", "Block and tackle", "talje", "tackle"]];
const FC_COL = { s1: "var(--c3)", s2: "var(--c5)", g: "var(--c2)", r: "var(--c4)" };
const fcR = d => d * Math.PI / 180, fcD = r => r * 180 / Math.PI;
const fcN = x => nf(x, x >= 100 ? 0 : 1);

// ---------- fysikk ----------
// Likevekt i knuten: S₁cos α = S₂cos β og S₁sin α + S₂sin β = G.
function fcSolveAngles(a, b, G){ const s = Math.sin(fcR(a + b)); return { S1: G * Math.cos(fcR(b)) / s, S2: G * Math.cos(fcR(a)) / s }; }
// Motvekter gitt: finn vinklene fra krafttrekanten (cosinussetningen), eller null hvis det ikke finnes likevekt.
function fcSolveMasses(S1, S2, G){
  if(!(G < S1 + S2 - 1e-9)) return { err: "fall" };
  const c1 = (G * G + S1 * S1 - S2 * S2) / (2 * G * S1), c2 = (G * G + S2 * S2 - S1 * S1) / (2 * G * S2);
  if(c1 <= 1e-6 || c2 <= 1e-6 || c1 > 1 || c2 > 1) return { err: S1 > S2 ? "left" : "right" };
  const a = 90 - fcD(Math.acos(Math.min(1, c1))), b = 90 - fcD(Math.acos(Math.min(1, c2)));
  if(a < 1 || b < 1) return { err: S1 > S2 ? "left" : "right" };
  return { a, b };
}
// Knuten der snorene møtes, med ankere/trinser i (±A, 0). Figuren skaleres så knuten ligger godt synlig:
// med to snorer i taket flyttes festene utover (de kan havne utenfor bildet) når vinklene er små; trinsene står fast.
function fcKnot(a, b){
  const A = FC_A, t = 2 * A * Math.sin(fcR(b)) / Math.sin(fcR(a + b)), x = -A + t * Math.cos(fcR(a)), y = t * Math.sin(fcR(a)), L = FC.lock;
  let sc = L ? L.sc : (y > 190 ? 190 / y : FC.mode === "ropes" && y < 115 ? Math.min(115 / y, 900 / A) : 1);
  if(L && y * sc > 250) sc = 250 / y;
  const ox = FC.mode !== "ropes" ? 0 : L ? L.ox : -x * sc; // med to snorer i taket holdes loddet midt i bildet
  return { x: x * sc + ox, y: y * sc, A: A * sc, sc, ox, L: -A * sc + ox, R: A * sc + ox };
}
function fcState(){
  const G = FC.mode === "pulleys" && FC.ctrl === "masses" ? FC.M * FC_G : FC.m * FC_G;
  if(FC.mode === "pulleys" && FC.ctrl === "masses"){ const S1 = FC.m1 * FC_G, S2 = FC.m2 * FC_G, r = fcSolveMasses(S1, S2, G); return r.err ? { G, S1, S2, err: r.err } : { G, S1, S2, a: r.a, b: r.b }; }
  const r = fcSolveAngles(FC.a, FC.b, G); return { G, S1: r.S1, S2: r.S2, a: FC.a, b: FC.b };
}

// ---------- tegning ----------
const fl = x => (+x).toFixed(1);
function fcArrow(x1, y1, x2, y2, col, w = 3.2, dash = "", cap = 0){
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); if(L < 2) return "";
  let brk = ""; if(cap && L > cap){ const k = cap / L; x2 = x1 + dx * k; y2 = y1 + dy * k; const mx = x1 + dx * k * 0.7, my = y1 + dy * k * 0.7, nx = -dy / L * 6, ny = dx / L * 6;
    brk = `<path d="M${fl(mx - nx - dx / L * 3)} ${fl(my - ny - dy / L * 3)} L${fl(mx + nx - dx / L * 3)} ${fl(my + ny - dy / L * 3)} M${fl(mx - nx + dx / L * 3)} ${fl(my - ny + dy / L * 3)} L${fl(mx + nx + dx / L * 3)} ${fl(my + ny + dy / L * 3)}" style="stroke:var(--card);stroke-width:3"/>`; }
  const l2 = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / l2, uy = (y2 - y1) / l2, h = Math.min(11, l2 * 0.45), bx = x2 - ux * h, by = y2 - uy * h;
  return `<line x1="${fl(x1)}" y1="${fl(y1)}" x2="${fl(bx)}" y2="${fl(by)}" style="stroke:${col};stroke-width:${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/>${brk}` +
    `<polygon points="${fl(x2)},${fl(y2)} ${fl(bx - uy * h * 0.5)},${fl(by + ux * h * 0.5)} ${fl(bx + uy * h * 0.5)},${fl(by - ux * h * 0.5)}" style="fill:${col}"/>`;
}
const fcL = (x1, y1, x2, y2, col, w = 2, extra = "") => `<line x1="${fl(x1)}" y1="${fl(y1)}" x2="${fl(x2)}" y2="${fl(y2)}" style="stroke:${col};stroke-width:${w}" stroke-linecap="round" ${extra}/>`;
const fcT = (x, y, s, col = "var(--ink)", anc = "middle", size = 12.5, w = 700) => `<text x="${fl(x)}" y="${fl(y)}" text-anchor="${anc}" dominant-baseline="central" style="fill:${col};font-size:${size}px;font-weight:${w};paint-order:stroke;stroke:var(--card);stroke-width:3px;stroke-linejoin:round">${esc(s)}</text>`;
function fcArc(cx, cy, r, a0, a1, col){ // vinkler i SVG-retning (y ned), grader
  const p = a => [cx + r * Math.cos(fcR(a)), cy + r * Math.sin(fcR(a))], [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `<path d="M${fl(x0)} ${fl(y0)} A${r} ${r} 0 0 ${a1 > a0 ? 1 : 0} ${fl(x1)} ${fl(y1)}" style="fill:none;stroke:${col};stroke-width:2"/>`;
}
const fcBox = (x, y, w, h, lbl) => `<rect x="${fl(x - w / 2)}" y="${fl(y)}" width="${w}" height="${h}" rx="5" style="fill:var(--ink);opacity:.85"/>` + `<text x="${fl(x)}" y="${fl(y + h / 2)}" text-anchor="middle" dominant-baseline="central" style="fill:var(--card);font-size:12px;font-weight:800">${esc(lbl)}</text>`;
const fcHatch = (x1, x2, y) => { let s = fcL(x1, y, x2, y, "var(--ink)", 2.4); for(let x = x1 + 4; x < x2; x += 12) s += fcL(x, y, x - 8, y - 8, "var(--muted)", 1.3); return s; };
// Krafter ved knuten: snordrag, komponenter og tyngde.
function fcKnotForces(K, st, sc){
  const sh = FC.show, a = fcR(st.a), b = fcR(st.b), cap = 150; let g = "";
  const v1 = [-st.S1 * Math.cos(a) * sc, -st.S1 * Math.sin(a) * sc], v2 = [st.S2 * Math.cos(b) * sc, -st.S2 * Math.sin(b) * sc];
  if(sh.comp){
    g += fcArrow(K.x, K.y, K.x + v1[0], K.y, FC_COL.s1, 2, "5 4", cap) + fcArrow(K.x, K.y, K.x, K.y + v1[1], FC_COL.s1, 2, "5 4", cap);
    g += fcArrow(K.x, K.y, K.x + v2[0], K.y, FC_COL.s2, 2, "5 4", cap) + fcArrow(K.x, K.y, K.x, K.y + v2[1], FC_COL.s2, 2, "5 4", cap);
    if(Math.abs(v1[0]) <= cap && Math.abs(v1[1]) <= cap) g += fcL(K.x + v1[0], K.y, K.x + v1[0], K.y + v1[1], FC_COL.s1, 1, 'stroke-dasharray="2 4" opacity=".7"') + fcL(K.x, K.y + v1[1], K.x + v1[0], K.y + v1[1], FC_COL.s1, 1, 'stroke-dasharray="2 4" opacity=".7"');
    if(Math.abs(v2[0]) <= cap && Math.abs(v2[1]) <= cap) g += fcL(K.x + v2[0], K.y, K.x + v2[0], K.y + v2[1], FC_COL.s2, 1, 'stroke-dasharray="2 4" opacity=".7"') + fcL(K.x, K.y + v2[1], K.x + v2[0], K.y + v2[1], FC_COL.s2, 1, 'stroke-dasharray="2 4" opacity=".7"');
  }
  if(sh.str){ g += fcArrow(K.x, K.y, K.x + v1[0], K.y + v1[1], FC_COL.s1, 3.4, "", cap) + fcArrow(K.x, K.y, K.x + v2[0], K.y + v2[1], FC_COL.s2, 3.4, "", cap);
    const e1 = Math.min(1, cap / Math.hypot(...v1)), e2 = Math.min(1, cap / Math.hypot(...v2));
    const lx1 = Math.max(-118, K.x + v1[0] * e1 * 0.6), lx2 = Math.min(118, K.x + v2[0] * e2 * 0.6);
    g += fcT(lx1, K.y + v1[1] * e1 * 0.6 - 16, "S₁" + (sh.vals ? " = " + fcN(st.S1) + " N" : ""), FC_COL.s1, "middle") + fcT(lx2, K.y + v2[1] * e2 * 0.6 - 16, "S₂" + (sh.vals ? " = " + fcN(st.S2) + " N" : ""), FC_COL.s2, "middle"); }
  g += fcArrow(K.x, K.y, K.x, K.y + st.G * sc, FC_COL.g, 3.4) + fcT(K.x + 10, K.y + st.G * sc - 8, "G" + (sh.vals ? " = " + fcN(st.G) + " N" : ""), FC_COL.g, "start");
  return g;
}
function fcFig(){
  const st = fcState(), sh = FC.show;
  if(FC.mode === "tackle") return fcTackle();
  const sc = 58 / st.G; let g = "";
  if(st.err){
    g += FC.mode === "pulleys" ? fcPulleyFrame(FC_A) : "";
    const msg = st.err === "fall" ? T("Motvektene er for lette: loddet faller ned.", "The counterweights are too light: the load falls.") : T(`Den ${st.err === "left" ? "venstre" : "høyre"} motvekten er for tung: den drar loddet helt opp til trinsa.`, `The ${st.err === "left" ? "left" : "right"} counterweight is too heavy: it pulls the load up to the pulley.`);
    return { svg: g + fcBox(0, 150, 50, 34, fcN(FC.M) + " kg") + fcT(0, 90, T("Ingen likevekt", "No equilibrium"), "var(--bad)", "middle", 15, 800), st, msg };
  }
  const K = fcKnot(st.a, st.b), A = K.A;
  if(FC.mode === "ropes") g += fcHatch(-190, 190, 0);
  else g += fcPulleyFrame(A, st, sc);
  // snorene
  g += fcL(K.L, 0, K.x, K.y, "var(--ink)", 2.2) + fcL(K.R, 0, K.x, K.y, "var(--ink)", 2.2);
  if(FC.mode === "ropes") g += `<circle cx="${fl(K.L)}" cy="0" r="4" style="fill:var(--ink)"/><circle cx="${fl(K.R)}" cy="0" r="4" style="fill:var(--ink)"/>`;
  else g += fcPulleys(A);
  // vinkler mot vannrett, tegnet ved knuten (samme vinkler som ved festene)
  if(sh.ang){ const r = 34;
    g += fcL(K.x - r - 22, K.y, K.x + r + 22, K.y, "var(--muted)", 1.2, 'stroke-dasharray="3 3"');
    g += fcArc(K.x, K.y, r, 180, 180 + st.a, "var(--c2)") + fcArc(K.x, K.y, r, 360 - st.b, 360, "var(--c2)");
    g += fcT(K.x - (r + 14) * Math.cos(fcR(st.a / 2)) - 4, K.y - (r + 14) * Math.sin(fcR(st.a / 2)) + 12, "α = " + nf(st.a, 1) + "°", "var(--c2)", "end", 11.5) + fcT(K.x + (r + 14) * Math.cos(fcR(st.b / 2)) + 4, K.y - (r + 14) * Math.sin(fcR(st.b / 2)) + 12, "β = " + nf(st.b, 1) + "°", "var(--c2)", "start", 11.5); }
  // loddet
  g += fcL(K.x, K.y, K.x, K.y + 16, "var(--ink)", 2) + fcBox(K.x, K.y + 16, 48, 32, fcN(FC.mode === "pulleys" && FC.ctrl === "masses" ? FC.M : FC.m) + " kg");
  g += fcKnotForces(K, st, sc);
  const drag = !(FC.mode === "pulleys" && FC.ctrl === "masses");
  g += `<circle cx="${fl(K.x)}" cy="${fl(K.y)}" r="24" style="fill:transparent" class="tg-hit"/><circle cx="${fl(K.x)}" cy="${fl(K.y)}" r="6.5" style="fill:${drag ? "var(--accent)" : "var(--ink)"};stroke:var(--card);stroke-width:2.5"/>`;
  if(drag && !FC.touched) g += `<circle cx="${fl(K.x)}" cy="${fl(K.y)}" r="13" class="tg-pulse" style="fill:var(--accent)"/>`;
  return { svg: g, st };
}
function fcPulleyFrame(A, st, sc){
  let g = fcHatch(-178, 178, -44) + fcL(-A, -44, -A, 0, "var(--muted)", 3) + fcL(A, -44, A, 0, "var(--muted)", 3);
  if(!st) return g;
  // snorene ned til motvektene
  const r = 13, y1 = 70 + Math.min(60, 8 * (st.S1 / FC_G) ** 0.5), y2 = 70 + Math.min(60, 8 * (st.S2 / FC_G) ** 0.5);
  g += fcL(-A - r, 0, -A - r, y1, "var(--ink)", 2.2) + fcL(A + r, 0, A + r, y2, "var(--ink)", 2.2);
  g += fcBox(-A - r, y1, 40, 30, fcN(st.S1 / FC_G) + " kg") + fcBox(A + r, y2, 40, 30, fcN(st.S2 / FC_G) + " kg");
  if(FC.show.str){ g += fcArrow(-A - r - 16, y1 - 34, -A - r - 16, y1 - 34 - Math.min(80, st.S1 * sc * 0.6), FC_COL.s1, 2.4) + fcArrow(A + r + 16, y2 - 34, A + r + 16, y2 - 34 - Math.min(80, st.S2 * sc * 0.6), FC_COL.s2, 2.4);
    g += fcT(-A - r - 22, y1 - 44, "S₁", FC_COL.s1, "end") + fcT(A + r + 22, y2 - 44, "S₂", FC_COL.s2, "start"); }
  // krefter på trinsene: summen av snordraget langs begge snordelene
  if(FC.show.pul){
    [[-A, st.S1, st.a, -1, FC_COL.s1, "R₁"], [A, st.S2, st.b, 1, FC_COL.s2, "R₂"]].forEach(([px, S, ang, sd, col, lb]) => {
      const u = [-sd * Math.cos(fcR(ang)), Math.sin(fcR(ang))], R = [u[0] * S, (u[1] + 1) * S], Rm = Math.hypot(...R), k = sc * 0.6;
      g += fcArrow(px, 0, px + R[0] * k, R[1] * k, FC_COL.r, 3.6, "", 120) + fcT(px + R[0] * k * Math.min(1, 120 / (Rm * k)) + sd * -8, Math.min(120, R[1] * k) + 12, lb + (FC.show.vals ? " = " + fcN(Rm) + " N" : ""), FC_COL.r, sd < 0 ? "end" : "start");
    });
  }
  return g;
}
const fcPulleys = A => [-A, A].map(x => `<circle cx="${fl(x)}" cy="0" r="13" style="fill:var(--card);stroke:var(--ink);stroke-width:2.4"/><circle cx="${fl(x)}" cy="0" r="3" style="fill:var(--ink)"/>`).join("");
// Talje: n snorparter mellom fast og løs blokk.
function fcTackle(){
  const n = FC.n, G = FC.m * FC_G, F = G / n, sh = FC.show, lift = FC.h, top = 0, low = 150 - lift * 30, w = 16 + n * 11, x0 = -w / 2;
  let g = fcHatch(-178, 178, -44) + fcL(0, -44, 0, top - 16, "var(--muted)", 3);
  g += `<rect x="${fl(x0 - 6)}" y="${top - 16}" width="${fl(w + 12)}" height="32" rx="12" style="fill:var(--card);stroke:var(--ink);stroke-width:2.2"/>` + fcT(0, top, T("fast", "fixed"), "var(--muted)", "middle", 10, 600);
  g += `<rect x="${fl(x0 - 6)}" y="${fl(low - 16)}" width="${fl(w + 12)}" height="32" rx="12" style="fill:var(--card);stroke:var(--ink);stroke-width:2.2"/>` + fcT(0, low, T("løs", "moving"), "var(--muted)", "middle", 10, 600);
  for(let i = 0; i < n; i++){ const x = x0 + 4 + i * (w - 8) / Math.max(1, n - 1 || 1); g += fcL(n === 1 ? 0 : x, top + 16, n === 1 ? 0 : x, low - 16, "var(--ink)", 2); if(sh.str && i < 6) g += fcArrow(n === 1 ? 0 : x, low - 20, n === 1 ? 0 : x, low - 20 - Math.max(14, 90 / n), FC_COL.s1, 2.2); }
  const px = x0 + w + 30; g += fcL(x0 + w + 4, top, px, top + 4, "var(--ink)", 2) + fcL(px, top + 4, px, 150 + 30 * lift * n / Math.max(n, 1) * 0.35, "var(--ink)", 2);
  const hy = 150 + lift * n * 10; g += fcArrow(px, Math.min(260, hy), px, Math.min(290, hy + 36), FC_COL.s2, 3.4) + fcT(px + 10, Math.min(280, hy + 20), "F" + (sh.vals ? " = " + fcN(F) + " N" : ""), FC_COL.s2, "start");
  g += fcL(0, low + 16, 0, low + 26, "var(--ink)", 2) + fcBox(0, low + 26, 50, 34, fcN(FC.m) + " kg") + fcArrow(0, low + 44, 0, low + 44 + 50, FC_COL.g, 3.2) + fcT(-10, low + 80, "G" + (sh.vals ? " = " + fcN(G) + " N" : ""), FC_COL.g, "end");
  if(sh.pul){ const Rt = G + F; g += fcArrow(0, -44, 0, -44 + Math.min(40, Rt / G * 22), FC_COL.r, 3) + fcT(12, -30, T("taket bærer ", "ceiling carries ") + fcN(Rt) + " N", FC_COL.r, "start", 11); }
  if(sh.str) g += fcT(x0 - 14, (top + low) / 2, n + " × " + fcN(F) + " N", FC_COL.s1, "end", 12);
  return { svg: g, st: { G, F } };
}
// Kraftdiagram: krafttrekanten og søyler som sammenligner S₁, S₂ og G.
function fcDiagram(st){
  if(FC.mode === "tackle"){ const n = FC.n, G = st.G, F = st.F, H = 110, k = H / G;
    return `<svg class="fc-svg2" viewBox="0 0 340 160" role="img" aria-label="${esc(T("Kraftdiagram", "Force diagram"))}">${[["G", G, FC_COL.g], ["F", F, FC_COL.s2], [T("tau", "rope") + " × n", F * n, FC_COL.s1]].map(([l, v, c], i) => `<rect x="${40 + i * 100}" y="${fl(140 - v * k)}" width="46" height="${fl(v * k)}" rx="4" style="fill:${c};opacity:.85"/>${fcT(63 + i * 100, 150, l, "var(--muted)", "middle", 11)}${fcT(63 + i * 100, 130 - v * k, fcN(v) + " N", c, "middle", 11)}`).join("")}</svg>`; }
  if(st.err) return "";
  const a = fcR(st.a), b = fcR(st.b), G = st.G, S1 = st.S1, S2 = st.S2;
  // trekanten: G ned, så S₂, så S₁ tilbake til start (lukket = likevekt)
  const P0 = [0, 0], P1 = [0, G], P2 = [S2 * Math.cos(b), G - S2 * Math.sin(b)];
  const xs = [P0[0], P1[0], P2[0]], ys = [P0[1], P1[1], P2[1]], w = Math.max(...xs) - Math.min(...xs) || 1, h = Math.max(...ys) - Math.min(...ys) || 1, k = Math.min(120 / h, 120 / w), ox = 70 - (Math.min(...xs) + w / 2) * k, oy = 18 - Math.min(...ys) * k;
  const Q = p => [ox + p[0] * k, oy + p[1] * k], [x0, y0] = Q(P0), [x1, y1] = Q(P1), [x2, y2] = Q(P2);
  let tri = FC.show.tri ? fcArrow(x0, y0, x1, y1, FC_COL.g, 3) + fcArrow(x1, y1, x2, y2, FC_COL.s2, 3) + fcArrow(x2, y2, x0, y0, FC_COL.s1, 3) + fcT(x0 - 8, (y0 + y1) / 2, "G", FC_COL.g, "end") + fcT((x1 + x2) / 2 + 8, (y1 + y2) / 2 + 6, "S₂", FC_COL.s2, "start") + fcT((x2 + x0) / 2 + 8, (y2 + y0) / 2 - 6, "S₁", FC_COL.s1, "start") + fcT(70, 152, T("krafttrekant", "force triangle"), "var(--muted)", "middle", 10.5, 600) : "";
  const M = Math.max(G, S1, S2), hk = 110 / M;
  const bars = [["S₁", S1, FC_COL.s1], ["S₂", S2, FC_COL.s2], ["G", G, FC_COL.g]].map(([l, v, c], i) => `<rect x="${170 + i * 56}" y="${fl(135 - v * hk)}" width="36" height="${fl(v * hk)}" rx="4" style="fill:${c};opacity:.85"/>${fcT(188 + i * 56, 147, l, "var(--muted)", "middle", 11)}${fcT(188 + i * 56, 125 - v * hk, fcN(v), c, "middle", 10.5)}`).join("") +
    fcL(162, 135 - G * hk, 332, 135 - G * hk, FC_COL.g, 1.2, 'stroke-dasharray="4 3"');
  return `<svg class="fc-svg2" viewBox="0 0 340 160" role="img" aria-label="${esc(T("Kraftdiagram", "Force diagram"))}">${tri}${bars}</svg>`;
}
function fcRead(st){
  if(FC.mode === "tackle"){ const n = FC.n;
    return `<div class="tg-forms"><p>${tex(`F = \\frac{G}{n} = \\frac{${mf(st.G, 1)}\\ \\text{N}}{${n}} = ${mf(st.F, 1)}\\ \\text{N}`)}</p><p>${tex(`s_{\\text{${T("tau", "rope")}}} = n\\cdot h = ${n}\\cdot ${mf(FC.h, 1)}\\ \\text{m} = ${mf(n * FC.h, 1)}\\ \\text{m}`)}</p>
      <p>${tex(`W = F\\cdot s = ${mf(st.F * n * FC.h, 0)}\\ \\text{J} = G\\cdot h`)}</p></div>
      <p class="tg-where">${esc(T(`Hver av de ${n} snorpartene bærer like mye, så du drar bare ${n === 1 ? "like mye som lasten" : `1/${n} av lasten`}. Prisen: du må dra ${n} ganger så langt. Arbeidet blir det samme (uten friksjon).`, `Each of the ${n} rope segments carries the same, so you only pull ${n === 1 ? "as much as the load" : `1/${n} of the load`}. The price: you must pull ${n} times as far. The work is the same (without friction).`))}</p>`; }
  if(st.err) return `<p class="tg-where fc-warn">⚠️ ${esc(fcFig().msg || "")}</p><p class="picknote">${esc(T("For likevekt må krafttrekanten gå opp: G < S₁ + S₂, og ingen motvekt kan være så tung at den alene overvinner de to andre.", "For equilibrium the force triangle must close: G < S₁ + S₂, and no counterweight can be so heavy that it alone beats the other two."))}</p>`;
  const a = mf(st.a, 1), b = mf(st.b, 1), G = st.G, S1 = st.S1, S2 = st.S2;
  let h = `<div class="tg-forms"><p><small>${esc(T("Vannrett:", "Horizontal:"))}</small> ${tex(`S_1\\cos ${a}^\\circ = S_2\\cos ${b}^\\circ \\;\\Rightarrow\\; ${mf(S1 * Math.cos(fcR(st.a)), 1)} = ${mf(S2 * Math.cos(fcR(st.b)), 1)}`)}</p>
    <p><small>${esc(T("Loddrett:", "Vertical:"))}</small> ${tex(`S_1\\sin ${a}^\\circ + S_2\\sin ${b}^\\circ = G \\;\\Rightarrow\\; ${mf(S1 * Math.sin(fcR(st.a)), 1)} + ${mf(S2 * Math.sin(fcR(st.b)), 1)} = ${mf(G, 1)}`)}</p>
    <p>${tex(`S_1 = \\frac{G\\cos\\beta}{\\sin(\\alpha + \\beta)} = ${mf(S1, 1)}\\ \\text{N}, \\quad S_2 = \\frac{G\\cos\\alpha}{\\sin(\\alpha + \\beta)} = ${mf(S2, 1)}\\ \\text{N}`)}</p></div>`;
  if(FC.mode === "pulleys"){ const R1 = S1 * Math.sqrt(2 + 2 * Math.sin(fcR(st.a))), R2 = S2 * Math.sqrt(2 + 2 * Math.sin(fcR(st.b)));
    h += `<div class="tg-forms"><p><small>${esc(T("Motvekter:", "Counterweights:"))}</small> ${tex(`m_1 = \\tfrac{S_1}{g} = ${mf(S1 / FC_G, 2)}\\ \\text{kg}, \\quad m_2 = \\tfrac{S_2}{g} = ${mf(S2 / FC_G, 2)}\\ \\text{kg}`)}</p>
      <p><small>${esc(T("Kraft på trinsene:", "Force on the pulleys:"))}</small> ${tex(`R = S\\sqrt{2 + 2\\sin\\alpha}:\\ R_1 = ${mf(R1, 1)}\\ \\text{N},\\ R_2 = ${mf(R2, 1)}\\ \\text{N}`)}</p></div>
      <p class="tg-where">${esc(T("Snordraget er det samme på begge sider av en trinse (uten friksjon). Trinsa kjenner summen av de to snordelene: rett ned til motvekten og skrått mot loddet. Jo brattere snora mot loddet, jo nærmere 2S.", "The rope tension is the same on both sides of a pulley (without friction). The pulley feels the sum of the two rope parts: straight down to the counterweight and slanted towards the load. The steeper the rope to the load, the closer to 2S."))}</p>`; }
  const lo = Math.min(st.a, st.b);
  h += `<p class="tg-where">${esc(lo < 12 ? T(`Se så store snordragene blir! Med ${nf(lo, 0)}° drar snora nesten vannrett, og bare sin ${nf(lo, 0)}° ≈ ${nf(Math.sin(fcR(lo)), 2)} av snordraget holder loddet oppe. Derfor ryker en stram klessnor lett.`, `See how large the tensions get! At ${nf(lo, 0)}° the rope pulls almost horizontally, and only sin ${nf(lo, 0)}° ≈ ${nf(Math.sin(fcR(lo)), 2)} of the tension holds the load up. That is why a tight clothesline snaps easily.`)
    : st.a > 70 && st.b > 70 ? T("Nesten loddrette snorer: hver snor bærer omtrent sin del av tyngden, og de vannrette komponentene er små.", "Almost vertical ropes: each rope carries roughly its share of the weight, and the horizontal components are small.")
    : T("Den brattere snora tar mest av tyngden. Dra loddet og se de stiplede komponentene: de vannrette er alltid like store og motsatte.", "The steeper rope takes most of the weight. Drag the load and watch the dashed components: the horizontal ones are always equal and opposite."))}</p>`;
  return h;
}
const FC_GOALS = {
  ropes: [["Få snordraget i venstre snor større enn tyngden G.", "Make the tension in the left rope larger than the weight G.", s => s.S1 > s.G],
    ["Gjør snordragene like store.", "Make the two tensions equal.", s => Math.abs(s.S1 - s.S2) < 0.005 * s.G],
    ["Finn vinklene der hver snor bærer nøyaktig G.", "Find the angles where each rope carries exactly G.", s => Math.abs(s.S1 - s.G) < 0.01 * s.G && Math.abs(s.S2 - s.G) < 0.01 * s.G],
    ["Få en av snorene til å dra med mer enn 4G.", "Make one of the ropes pull with more than 4G.", s => Math.max(s.S1, s.S2) > 4 * s.G]],
  pulleys: [["Styr med motvekter: finn en likevekt der vinklene er like (α = β).", "Control with counterweights: find an equilibrium where the angles are equal (α = β).", s => FC.ctrl === "masses" && !s.err && Math.abs(s.a - s.b) < 0.05],
    ["Få kraften på venstre trinse til minst 1,9 ganger snordraget.", "Make the force on the left pulley at least 1.9 times the rope tension.", s => !s.err && Math.sqrt(2 + 2 * Math.sin(fcR(s.a))) >= 1.9],
    ["Styr med motvekter: få loddet til å falle.", "Control with counterweights: make the load fall.", s => s.err === "fall"]],
  tackle: [["Løft 60 kg med under 150 N.", "Lift 60 kg with less than 150 N.", s => FC.m >= 60 && s.F < 150],
    ["Hvor mange snorparter trengs for å løfte 100 kg med 250 N?", "How many rope segments are needed to lift 100 kg with 250 N?", s => FC.m === 100 && s.F <= 250 && FC.n === 4]]
};
function fcGoalsHTML(){
  const G = FC_GOALS[FC.mode], done = i => !!(S.fcGoals || {})[FC.mode + ":" + i], n = G.filter((g, i) => done(i)).length;
  return `<div class="tg-goals"><h4>🎯 ${esc(T("Utfordringer", "Challenges"))} <span>${n}/${G.length}</span></h4>${G.map((g, i) => `<p class="${done(i) ? "ok" : ""}"><i>${done(i) ? "✓" : i + 1}</i>${esc(T(g[0], g[1]))}</p>`).join("")}</div>`;
}
function fcCheckGoals(st){
  let hit = false; FC_GOALS[FC.mode].forEach((g, i) => { const k = FC.mode + ":" + i; if(!(S.fcGoals || {})[k] && g[2](st)){ (S.fcGoals ||= {})[k] = 1; hit = true; } });
  if(!hit) return; save(); const el = document.getElementById("fcgoals"); if(el){ el.innerHTML = fcGoalsHTML(); burst(el.querySelector("p.ok:last-of-type") || el, 10); }
  sfx("ok", 3); buzz(true); toast(T("Utfordring løst! 🎉", "Challenge solved! 🎉"));
}

// ---------- side og samspill ----------
function fcSliders(){
  const sl = (k, lbl, min, max, step, u) => `<label class="tg-range"><span>${lbl}</span><input type="range" data-fck="${k}" min="${min}" max="${max}" step="${step}" value="${FC[k]}"><b id="fck_${k}">${esc(nf(FC[k], step < 1 ? 1 : 0) + u)}</b></label>`;
  if(FC.mode === "tackle") return `<div class="tg-sliders">${sl("m", "m", 5, 150, 5, " kg")}${sl("n", "n", 1, 6, 1, "")}${sl("h", "h", 0, 3, 0.5, " m")}</div>`;
  if(FC.mode === "pulleys" && FC.ctrl === "masses") return `<div class="tg-sliders">${sl("M", "M", 1, 30, 0.5, " kg")}${sl("m1", "m₁", 0.5, 60, 0.5, " kg")}${sl("m2", "m₂", 0.5, 60, 0.5, " kg")}</div>`;
  return `<div class="tg-sliders">${sl("a", "α", 3, 87, 1, "°")}${sl("b", "β", 3, 87, 1, "°")}${sl("m", "m", 1, 50, 1, " kg")}</div>`;
}
function renderForces(){
  const tabs = `<nav class="tg-tabs" aria-label="${esc(T("Oppsett", "Setups"))}">${FC_MODES.map(s => `<button class="${s[0] === FC.mode ? "on" : ""}" data-a="fcmode" data-m="${s[0]}"><span aria-hidden="true">${s[1]}</span>${esc(T(s[2], s[3]))}</button>`).join("")}</nav>`;
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="fcback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Kraftlab", "Force lab"))}</small><b>${esc(T("Snorer, trinser og krefter", "Ropes, pulleys and forces"))}</b></div></div></div>`;
  const intro = { ropes: T("Et lodd henger i to snorer. Dra loddet (eller bruk glidebryterne) og se hva som skjer med snordragene når vinklene blir store eller små. Vinklene måles mot vannrett.", "A load hangs from two ropes. Drag the load (or use the sliders) and see what happens to the tensions when the angles get large or small. The angles are measured from the horizontal."),
    pulleys: T("Snorene går over to trinser ned til motvekter. Velg vinklene og se hvilke motvekter som trengs, eller velg motvektene og se hvor loddet havner. Pilene på trinsene viser kraften trinseopphenget må tåle.", "The ropes run over two pulleys down to counterweights. Choose the angles and see which counterweights are needed, or choose the counterweights and see where the load settles. The arrows on the pulleys show the force the pulley mounts must withstand."),
    tackle: T("En talje fordeler lasten på flere snorparter. Velg antall parter og se hvor hardt du må dra, og hvor langt.", "A block and tackle shares the load between several rope segments. Choose the number of segments and see how hard you must pull, and how far.") }[FC.mode];
  const tog = (k, l) => `<button class="tg-chip ${FC.show[k] ? "on" : ""}" data-a="fctog" data-k="${k}" aria-pressed="${!!FC.show[k]}">${l}</button>`;
  const togs = FC.mode === "tackle" ? tog("str", T("Snordrag", "Tension")) + tog("pul", T("Kraft i taket", "Ceiling force")) + tog("vals", T("Tall", "Numbers"))
    : tog("str", T("Snordrag", "Tension")) + tog("comp", T("Komponenter", "Components")) + (FC.mode === "pulleys" ? tog("pul", T("Krefter på trinsene", "Pulley forces")) : "") + tog("ang", T("Vinkler", "Angles")) + tog("tri", T("Krafttrekant", "Force triangle")) + tog("vals", T("Tall", "Numbers"));
  const ctrl = FC.mode === "pulleys" ? `<div class="seg tg-seg">${[["angles", T("Styr med vinkler", "Control angles")], ["masses", T("Styr med motvekter", "Control counterweights")]].map(([v, l]) => `<button class="${FC.ctrl === v ? "on" : ""}" data-a="fcctrl" data-v="${v}">${esc(l)}</button>`).join("")}</div>` : "";
  $app.innerHTML = `${top}<div class="wrap tg-tw">${tabs}</div><main class="wrap tg fc"><p class="tg-intro">${esc(intro)}</p>
    <div class="tg-ctl fc-togs">${togs}</div>${ctrl ? `<div class="tg-ctl">${ctrl}</div>` : ""}
    <div class="tg-figwrap fc-fig"><svg id="fcsvg" class="tg-svg" viewBox="${FC.mode === "tackle" ? "-180 -60 360 360" : "-190 -60 380 330"}" role="img" aria-label="${esc(T("Kraftfigur, dra loddet", "Force figure, drag the load"))}"></svg></div>
    ${fcSliders()}<div id="fcdia" class="fc-dia"></div><div id="fcread" class="tg-read" aria-live="polite"></div><div id="fcgoals">${fcGoalsHTML()}</div>
    <button class="exlink" data-a="labopen">🧪 ${esc(T("Alle interaktive figurer", "All interactive figures"))}</button></main>`;
  fcPaint(); fcBind();
}
function fcPaint(){
  const svg = document.getElementById("fcsvg"); if(!svg) return;
  const r = fcFig(); svg.innerHTML = r.svg;
  const d = document.getElementById("fcdia"); if(d) d.innerHTML = fcDiagram(r.st);
  const rd = document.getElementById("fcread"); if(rd) rd.innerHTML = fcRead(r.st);
  if(!(FC.mode === "pulleys" && FC.ctrl === "masses")) ["a", "b"].forEach(k => { const inp = document.querySelector(`[data-fck="${k}"]`), b = document.getElementById("fck_" + k); if(inp && +inp.value !== FC[k]) inp.value = FC[k]; if(b) b.textContent = nf(FC[k], 0) + "°"; });
  fcCheckGoals(r.st);
}
function fcBind(){
  const svg = document.getElementById("fcsvg");
  if(svg){
    let drag = false;
    const at = e => { if(FC.mode === "tackle" || (FC.mode === "pulleys" && FC.ctrl === "masses")) return; const p = tgPt(svg, e), K = fcKnot(FC.a, FC.b), y = Math.max(4, p.y), x = Math.max(K.L + 2, Math.min(K.R - 2, p.x));
      const a = Math.round(Math.max(3, Math.min(87, fcD(Math.atan2(y, x - K.L))))), b = Math.round(Math.max(3, Math.min(87, fcD(Math.atan2(y, K.R - x)))));
      if(a !== FC.a || b !== FC.b){ FC.a = a; FC.b = b; FC.touched = true; fcPaint(); } };
    svg.addEventListener("pointerdown", e => { drag = true; const K0 = fcKnot(FC.a, FC.b); FC.lock = { sc: K0.sc, ox: K0.ox }; try{ svg.setPointerCapture(e.pointerId); }catch(x){} at(e); });
    svg.addEventListener("pointermove", e => { if(drag){ e.preventDefault(); at(e); } });
    const up = () => { if(!drag) return; drag = false; FC.lock = null; fcPaint(); }; svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
  }
  document.querySelectorAll("[data-fck]").forEach(inp => inp.addEventListener("input", () => { const k = inp.dataset.fck; FC[k] = +inp.value; FC.touched = true;
    const b = document.getElementById("fck_" + k); if(b) b.textContent = nf(FC[k], +inp.step < 1 ? 1 : 0) + ({ a: "°", b: "°", m: " kg", M: " kg", m1: " kg", m2: " kg", h: " m" }[k] || ""); fcPaint(); }));
}
function fcOpen(mode, from){ FC.from = from || (screen === "forces" ? FC.from : screen); if(FC_MODES.some(m => m[0] === mode)) FC.mode = mode; overlay = null; screen = "forces"; render(); window.scrollTo(0, 0); }
function fcRouteOpen(slug){ const m = FC_MODES.find(x => x[4] === slug || x[5] === slug); FC.mode = m ? m[0] : "ropes"; FC.from = "home"; }
const fcSlug = () => { const m = FC_MODES.find(x => x[0] === FC.mode); return m[LANG === "en" ? 5 : 4]; };
function fcClick(a, b){
  if(!a.startsWith("fc")) return false;
  const d = b && b.dataset;
  if(a === "fcopen"){ fcOpen(d.m, screen); return true; }
  if(a === "fcback"){ labBack(FC.from); return true; }
  if(a === "fcmode"){ FC.mode = d.m; if(FC.mode === "tackle" && FC.m < 5) FC.m = 5; if(FC.mode === "pulleys" && Math.min(FC.a, FC.b) < 15){ FC.a = 35; FC.b = 25; } if(FC.mode !== "tackle") FC.m = Math.min(FC.m, 50); render(); return true; }
  if(a === "fctog"){ FC.show[d.k] = !FC.show[d.k]; render(); return true; }
  if(a === "fcctrl"){ FC.ctrl = d.v; if(FC.ctrl === "masses"){ const st = fcSolveAngles(FC.a, FC.b, FC.m * FC_G); FC.M = FC.m; FC.m1 = Math.round(st.S1 / FC_G * 2) / 2; FC.m2 = Math.round(st.S2 / FC_G * 2) / 2; } render(); return true; }
  return false;
}
