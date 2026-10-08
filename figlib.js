// ============================================================
//  FIGURBIBLIOTEK – store, tydelige og parametriske illustrasjoner til emnesidene og teorien.
//  Samme tegnefunksjon brukes for mange oppgaver: bare verdiene byttes (lengde, hvor kraften står i prosent
//  av lengden, navn på størrelser). En bjelke på 10 m med kraft i x = 2 m og en på 5 m med kraft i x = 4 m ser like ut,
//  men kraften står 20 % og 80 % ut, og målene viser «10 m» og «5 m».
//  Brukes som art: () => FL.beam({...}) på emnesider (tegnes når siden vises, så språket blir riktig).
//  Fargene ligger i FL_CSS (lyst og mørkt tema), og teksten følger temaet.
// ============================================================
const FL = {};
const FL_CSS = `.fl{display:block;width:100%;height:auto;overflow:visible;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
.fl text,svg.fl text{fill:currentColor;font-size:13px;font-style:normal}.fl .fl-sym,svg.fl text.fl-sym{font-style:italic;font-family:"Times New Roman",Georgia,serif;font-size:16px}.fl .fl-sm{font-size:11px;opacity:.8}.fl .fl-b{font-weight:700}
.fl .fl-beam{fill:#7A8796;stroke:#4A5563;stroke-width:1.2}.fl .fl-sup{fill:#C9D1DA;stroke:#4A5563;stroke-width:1.4}.fl .fl-gnd{stroke:#4A5563;stroke-width:1.2}
.fl .fl-load{stroke:#D9483B;stroke-width:2.6;fill:none}.fl .fl-loadf{fill:#D9483B;stroke:none}.fl .fl-q{fill:#D9483B;opacity:.12}.fl .fl-react{stroke:#1E9A5E;stroke-width:2.4;fill:none}.fl .fl-reactf{fill:#1E9A5E;stroke:none}
.fl .fl-dim{stroke:currentColor;stroke-width:1;opacity:.55;fill:none}.fl .fl-ax{stroke:currentColor;stroke-width:1.2;opacity:.6;fill:none}
.fl .fl-v{fill:#2B6FD6;fill-opacity:.22;stroke:#2B6FD6;stroke-width:2}.fl .fl-m{fill:#E07B00;fill-opacity:.22;stroke:#E07B00;stroke-width:2}
.fl .fl-vt{fill:#2B6FD6;font-weight:700}.fl .fl-mt{fill:#E07B00;font-weight:700}.fl .fl-lt{fill:#D9483B;font-weight:700}.fl .fl-rt{fill:#1E9A5E;font-weight:700}
.fl .fl-w{stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}.fl .fl-oa{fill:#EAF0F8;stroke:currentColor;stroke-width:2}
.fl .fl-res{fill:#FFF6E0;stroke:currentColor;stroke-width:2}.fl .fl-sig1{stroke:#2B6FD6;stroke-width:2.4;fill:none}.fl .fl-sig2{stroke:#E07B00;stroke-width:2.6;fill:none}
.fl .fl-node{fill:currentColor}.fl .fl-cap{fill:#EAF0F8;stroke:#B7C4D4;stroke-width:1}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .fl .fl-oa,:root:not([data-theme="light"]) .fl .fl-cap{fill:#26303C}:root:not([data-theme="light"]) .fl .fl-res{fill:#3A3324}:root:not([data-theme="light"]) .fl .fl-sup{fill:#4A5563}}
:root[data-theme="dark"] .fl .fl-oa,:root[data-theme="dark"] .fl .fl-cap{fill:#26303C}:root[data-theme="dark"] .fl .fl-res{fill:#3A3324}:root[data-theme="dark"] .fl .fl-sup{fill:#4A5563}`;
if(typeof document !== "undefined" && document.head){ const st = document.createElement("style"); st.textContent = FL_CSS; document.head.appendChild(st); }
const flN = x => (+x).toFixed(1);
const flEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
// Tekst med senket skrift: «R_f» og «V_inn» gir R med f/inn senket.
const flT = (x, y, s, cls = "", anchor = "middle") => `<text x="${flN(x)}" y="${flN(y)}" text-anchor="${anchor}" class="${cls}">${flEsc(s).replace(/_([A-Za-z0-9æøåÆØÅ]+)/g, '<tspan dy="4" font-size="72%">$1</tspan><tspan dy="-4">​</tspan>')}</text>`;
const flArrow = (x1, y1, x2, y2, cls = "fl-load", head = 9) => { const a = Math.atan2(y2 - y1, x2 - x1), h = head, w = head * 0.5;
  const bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a);
  return `<path d="M${flN(x1)} ${flN(y1)}L${flN(bx)} ${flN(by)}" class="${cls}"/><path d="M${flN(x2)} ${flN(y2)}L${flN(bx - w * Math.sin(a))} ${flN(by + w * Math.cos(a))}L${flN(bx + w * Math.sin(a))} ${flN(by - w * Math.cos(a))}Z" class="${cls}f"/>`; };
// Målestrek med piler og tekst over
const flDim = (x1, x2, y, label) => `<path d="M${flN(x1)} ${y - 6}V${y + 6}M${flN(x2)} ${y - 6}V${y + 6}M${flN(x1)} ${y}H${flN(x2)}" class="fl-dim"/><path d="M${flN(x1)} ${y}l7 -3.5v7zM${flN(x2)} ${y}l-7 -3.5v7z" class="fl-dim" style="fill:currentColor"/>${label ? flT((x1 + x2) / 2, y - 5, label, "fl-sm") : ""}`;

// ---------- BJELKE ----------
// o = { L: "6 m", sup: [["pin", 0], ["roller", 1]] eller [["fixed", 0]], loads: [{ x: 0.5, F: 1, label: "P" }],
//       dist: [{ x0: 0, x1: 1, q: 1, label: "q" }], dims: [[0, 0.5, "a"], …], diagrams: true, vLab: {…}, mLab: "PL/4" }
// Diagrammene regnes ut av lastene (statisk bestemte bjelker: fritt opplagt eller utkraget), så de alltid stemmer med figuren.
FL.beam = (o = {}) => {
  const X0 = 46, X1 = 314, W = X1 - X0, X = f => X0 + f * W, yB = o.dist && o.dist.length ? 92 : 78, sup = o.sup || [["pin", 0], ["roller", 1]], loads = o.loads || [], dist = o.dist || [];
  let s = "";
  // fordelt last: piler og linje over
  for(const d of dist){ const n = Math.max(3, Math.round((d.x1 - d.x0) * 12)); s += `<rect x="${flN(X(d.x0))}" y="${yB - 40}" width="${flN(X(d.x1) - X(d.x0))}" height="34" class="fl-q"/><path d="M${flN(X(d.x0))} ${yB - 40}H${flN(X(d.x1))}" class="fl-load"/>`;
    for(let i = 0; i <= n; i++) s += flArrow(X(d.x0 + (d.x1 - d.x0) * i / n), yB - 40, X(d.x0 + (d.x1 - d.x0) * i / n), yB - 7, "fl-load", 7);
    s += flT((X(d.x0) + X(d.x1)) / 2, yB - 46, d.label || "q", "fl-sym fl-lt"); }
  // bjelken
  s += `<rect x="${X0}" y="${yB - 6}" width="${W}" height="12" rx="2" class="fl-beam"/>`;
  // opplegg
  for(const [k, f] of sup){ const x = X(f);
    if(k === "fixed"){ const left = f < 0.5, wx = left ? X0 - 12 : X1; s += `<rect x="${wx}" y="${yB - 30}" width="12" height="60" class="fl-sup"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${left ? wx : wx + 12} ${yB - 26 + i * 10}l${left ? -8 : 8} 8" class="fl-gnd"/>`).join(""); }
    else { s += `<path d="M${flN(x)} ${yB + 6}l-12 20h24z" class="fl-sup"/>`;
      if(k === "roller") s += `<circle cx="${flN(x - 7)}" cy="${yB + 30}" r="3.6" class="fl-sup"/><circle cx="${flN(x + 7)}" cy="${yB + 30}" r="3.6" class="fl-sup"/><path d="M${flN(x - 18)} ${yB + 34}h36" class="fl-gnd"/>`;
      else s += `<path d="M${flN(x - 18)} ${yB + 26}h36" class="fl-gnd"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${flN(x - 16 + i * 8)} ${yB + 26}l-6 7" class="fl-gnd"/>`).join(""); } }
  // punktlaster
  for(const p of loads){ const x = X(p.x); s += flArrow(x, yB - 58, x, yB - 7, "fl-load", 11) + flT(x + 8, yB - 46, p.label || "P", "fl-sym fl-lt", "start"); }
  // nedbøyd form (stiplet) – utkraget med last i enden, eller fritt opplagt
  if(o.deflect){ const cant = sup.some(x => x[0] === "fixed"), A = 34; let d = "";
    for(let i = 0; i <= 60; i++){ const f = i / 60, v = cant ? f * f * (3 - f) / 2 : Math.sin(Math.PI * f); d += (i ? "L" : "M") + flN(X(f)) + " " + flN(yB + 7 + A * v); }
    s += `<path d="${d}" class="fl-sig2" style="stroke-dasharray:6 4"/>`; const fe = cant ? 1 : 0.5, ye = yB + A;
    s += flArrow(X(fe) + (cant ? 14 : 0), yB + 8, X(fe) + (cant ? 14 : 0), ye + 2, "fl-react", 7) + flT(X(fe) + (cant ? 20 : 8), yB + 26, "δ", "fl-sym fl-rt", "start"); }
  // mål
  const yD = yB + (o.deflect ? 62 : 50); s += flDim(X0, X1, yD, o.L || "L");
  (o.dims || []).forEach(([a, b, lab], i) => { s += flDim(X(a), X(b), yD + 22 + i * 0, lab); });
  let H = yD + ((o.dims || []).length ? 34 : 14);
  // skjær- og momentdiagram
  if(o.diagrams){
    const N = 400, xs = Array.from({ length: N + 1 }, (_, i) => i / N), qAt = x => dist.reduce((a, d) => a + (x >= d.x0 && x <= d.x1 ? (d.q ?? 1) : 0), 0);
    const Ptot = loads.reduce((a, p) => a + (p.F ?? 1), 0), Qtot = dist.reduce((a, d) => a + (d.q ?? 1) * (d.x1 - d.x0), 0);
    const Qmom = dist.reduce((a, d) => a + (d.q ?? 1) * (d.x1 - d.x0) * (d.x0 + d.x1) / 2, 0), Pmom = loads.reduce((a, p) => a + (p.F ?? 1) * p.x, 0);
    const cant = sup.some(x => x[0] === "fixed");
    let RA, MA = 0; if(cant){ RA = Ptot + Qtot; MA = -(Pmom + Qmom); } else { const a = sup[0][1], b = sup[1][1], RB = (Pmom + Qmom - (Ptot + Qtot) * a) / (b - a); RA = Ptot + Qtot - RB; }
    const V = [], M = []; let m = cant ? MA : 0, v = 0;
    xs.forEach((x, i) => { v = (cant || x >= sup[0][1] ? RA : 0) - loads.reduce((a, p) => a + (x > p.x ? (p.F ?? 1) : 0), 0) - dist.reduce((a, d) => a + (d.q ?? 1) * Math.max(0, Math.min(x, d.x1) - d.x0), 0);
      if(!cant && sup[1] && x > sup[1][1]) v += (Ptot + Qtot - RA); V.push(v); if(i) m += (V[i - 1] + v) / 2 / N; M.push(m); });
    const vMax = Math.max(...V.map(Math.abs), 1e-9), mMax = Math.max(...M.map(Math.abs), 1e-9);
    const plot = (arr, y0, h, cls, lab, peakLab, tcls) => { const Y = val => y0 - val / (arr === V ? vMax : mMax) * h;
      let d = `M${X0} ${y0}`; arr.forEach((val, i) => { d += `L${flN(X(xs[i]))} ${flN(Y(val))}`; }); d += `L${X1} ${y0}Z`;
      let t = `<path d="M${X0 - 8} ${y0}H${X1 + 8}" class="fl-ax"/><path d="${d}" class="${cls}"/>` + flT(X0 - 14, y0 + 5, lab, "fl-sym " + tcls, "end");
      const iPk = arr.reduce((b, val, i) => Math.abs(val) > Math.abs(arr[b]) + 1e-9 ? i : b, 0);
      if(peakLab) t += flT(Math.min(X1 - 20, Math.max(X0 + 20, X(xs[iPk]))), Y(arr[iPk]) + (arr[iPk] >= 0 ? -8 : 18), peakLab, tcls);
      return t; };
    const vy = H + 50, my = vy + 62;
    s += plot(V, vy, 34, "fl-v", "V", o.vLab, "fl-vt");
    // momentet tegnes med positivt (strekk i underkant) nedover, slik det er vanlig i Norge
    s += plot(M.map(x => -x), my, 40, "fl-m", "M", o.mLab, "fl-mt");
    H = my + 66;
    if(o.vLab2){ const iz = V.findIndex(v => v < 0); if(iz > 0) s += flT(X(xs[iz]) + 4, vy + 30, o.vLab2, "fl-vt", "start"); }
  }
  return `<svg class="fl" viewBox="0 0 360 ${Math.ceil(H)}" role="img">${s}</svg>`;
};

// ---------- OPERASJONSFORSTERKER ----------
// o = { type: "inv" | "noninv" | "follow", gain: 10 (for signalene), lab: { rin, rf, vin, vout } }
FL.opamp = (o = {}) => {
  const type = o.type || "inv", g = o.gain || (type === "follow" ? 1 : type === "noninv" ? 3 : 3), L = Object.assign({ rin: T("R_inn", "R_in"), rf: "R_f", rg: "R_g", vin: T("V_inn", "V_in"), vout: T("V_ut", "V_out") }, o.lab || {});
  const res = (x, y, w, lab, vert) => vert ? `<rect x="${x - 8}" y="${y}" width="16" height="${w}" rx="3" class="fl-res"/>${flT(x + 14, y + w / 2 + 5, lab, "fl-sym", "start")}`
    : `<rect x="${x}" y="${y - 8}" width="${w}" height="16" rx="3" class="fl-res"/>${flT(x + w / 2, y - 14, lab, "fl-sym")}`;
  const gnd = (x, y) => `<path d="M${x} ${y}v8M${x - 12} ${y + 8}h24M${x - 8} ${y + 13}h16M${x - 4} ${y + 18}h8" class="fl-w"/>`;
  const sine = (x, y, a, cls, inv) => { let d = ""; for(let i = 0; i <= 40; i++){ const t = i / 40; d += (i ? "L" : "M") + flN(x + t * 56) + " " + flN(y - (inv ? -1 : 1) * a * Math.sin(t * 2 * Math.PI)); } return `<path d="M${x} ${y}h56" class="fl-ax"/><path d="${d}" class="${cls}"/>`; };
  // forsterkeren: trekant fra x=170 til 250, minus øverst, pluss nederst
  let s = `<path d="M170 60L170 140L250 100Z" class="fl-oa"/>${flT(180, 85, "−", "fl-b")}${flT(180, 128, "+", "fl-b")}`;
  s += `<path d="M250 100H300" class="fl-w"/><circle cx="300" cy="100" r="3.5" class="fl-node"/>` + flT(306, 96, L.vout, "fl-sym", "start");
  if(type === "inv"){
    s += `<circle cx="20" cy="80" r="3.5" class="fl-node"/>${flT(14, 72, L.vin, "fl-sym", "start")}<path d="M20 80H70M110 80H170" class="fl-w"/>` + res(70, 80, 40, L.rin);
    s += `<circle cx="140" cy="80" r="3.5" class="fl-node"/><path d="M140 80V30H190M230 30H275V100" class="fl-w"/>` + res(190, 30, 40, L.rf) + `<circle cx="275" cy="100" r="3.5" class="fl-node"/>`;
    s += `<path d="M170 120H150V150" class="fl-w"/>` + gnd(150, 150);
  } else {
    s += `<circle cx="20" cy="120" r="3.5" class="fl-node"/>${flT(14, 112, L.vin, "fl-sym", "start")}<path d="M20 120H170" class="fl-w"/>`;
    if(type === "follow") s += `<path d="M170 80H140V30H275V100" class="fl-w"/><circle cx="275" cy="100" r="3.5" class="fl-node"/>`;
    else s += `<path d="M170 80H120V30H190M230 30H275V100" class="fl-w"/>` + res(190, 30, 40, L.rf) + `<circle cx="275" cy="100" r="3.5" class="fl-node"/><circle cx="120" cy="80" r="3.5" class="fl-node"/><path d="M120 80V90M120 130V150" class="fl-w"/><rect x="112" y="90" width="16" height="40" rx="3" class="fl-res"/>` + flT(106, 115, L.rg, "fl-sym", "end") + gnd(120, 150);
  }
  // signalene inn og ut
  const yS = 205; s += `<rect x="12" y="${yS - 36}" width="336" height="72" rx="10" class="fl-cap"/>`;
  s += sine(28, yS, 10, "fl-sig1") + flT(56, yS + 30, T("inn", "in"), "fl-sm");
  s += `<path d="M104 ${yS}h44" class="fl-dim"/><path d="M148 ${yS}l-7 -4v8z" class="fl-dim" style="fill:currentColor"/>` + flT(126, yS - 8, type === "inv" ? `× (−${g})` : `× ${g}`, "fl-sm fl-b");
  s += sine(164, yS, Math.min(30, 10 * g), "fl-sig2", type === "inv") + flT(192, yS + 30, T("ut", "out"), "fl-sm");
  s += flT(240, yS - 4, type === "inv" ? T("snudd og større", "inverted, larger") : type === "follow" ? T("samme signal", "same signal") : T("større, samme fase", "larger, same phase"), "fl-sm", "start");
  s += flT(240, yS + 14, type === "inv" ? `A = −${L.rf}/${L.rin}` : type === "follow" ? "A = 1" : `A = 1 + ${L.rf}/${L.rg}`, "fl-sym", "start");
  return `<svg class="fl" viewBox="0 0 360 248" role="img">${s}</svg>`;
};

// ---------- felles: graf med akser ----------
// fns: [[f, cls]], x/y-område, ramme (x, y, w, h). Returnerer svg og koordinatfunksjoner.
FL.plot = (fns, xr, yr, box, opt = {}) => {
  const [bx, by, bw, bh] = box, X = x => bx + (x - xr[0]) / (xr[1] - xr[0]) * bw, Y = y => by + bh - (y - yr[0]) / (yr[1] - yr[0]) * bh;
  let s = `<path d="M${bx} ${flN(Y(Math.max(yr[0], Math.min(yr[1], 0))))}H${bx + bw + 8}M${bx} ${by + bh}V${by - 8}" class="fl-ax"/><path d="M${bx + bw + 10} ${flN(Y(Math.max(yr[0], Math.min(yr[1], 0))))}l-7 -3.5v7z" class="fl-dim" style="fill:currentColor"/><path d="M${bx} ${by - 10}l-3.5 7h7z" class="fl-dim" style="fill:currentColor"/>`;
  if(opt.xl) s += flT(bx + bw + 6, Y(Math.max(yr[0], Math.min(yr[1], 0))) + 18, opt.xl, "fl-sym", "end");
  if(opt.yl) s += flT(bx + 8, by - 6, opt.yl, "fl-sym", "start");
  for(const [f, cls] of fns){ let d = ""; for(let i = 0; i <= 120; i++){ const x = xr[0] + (xr[1] - xr[0]) * i / 120, y = f(x); if(!Number.isFinite(y)) continue; d += (d ? "L" : "M") + flN(X(x)) + " " + flN(Math.max(by - 6, Math.min(by + bh + 6, Y(y)))); } s += `<path d="${d}" class="${cls}"/>`; }
  return { s, X, Y };
};

// ---------- KRETS: spenningskilde med motstander i serie eller parallell ----------
// o = { kind: "series" | "parallel" | "divider" | "ohm", n: 2 eller 3, lab: { V, R: ["R_1", …], I } }
FL.circuit = (o = {}) => {
  const kind = o.kind || "series", n = o.n || (kind === "ohm" ? 1 : kind === "divider" ? 2 : 3), R = (o.lab && o.lab.R) || Array.from({ length: n }, (_, i) => n === 1 ? "R" : "R_" + (i + 1));
  const V = (o.lab && o.lab.V) || "U", I = (o.lab && o.lab.I) || "I";
  const bat = (x, y) => `<path d="M${x} ${y - 30}V${y - 7}M${x} ${y + 7}V${y + 30}" class="fl-w"/><path d="M${x - 16} ${y - 7}H${x + 16}" class="fl-w" style="stroke-width:3"/><path d="M${x - 9} ${y + 7}H${x + 9}" class="fl-w" style="stroke-width:5"/>${flT(x - 22, y + 5, V, "fl-sym", "end")}${flT(x + 22, y - 10, "+", "fl-b fl-sm", "start")}`;
  const resH = (x, y, lab, w = 48) => `<rect x="${x}" y="${y - 9}" width="${w}" height="18" rx="3" class="fl-res"/>${flT(x + w / 2, y - 15, lab, "fl-sym")}`;
  const resV = (x, y, lab, h = 48) => `<rect x="${x - 9}" y="${y}" width="18" height="${h}" rx="3" class="fl-res"/>${flT(x + 15, y + h / 2 + 5, lab, "fl-sym", "start")}`;
  let s = "";
  if(kind === "parallel"){
    const xs = Array.from({ length: n }, (_, i) => 150 + i * 70);
    s += bat(50, 100) + `<path d="M50 70V30H${xs[n - 1]}M50 130V170H${xs[n - 1]}" class="fl-w"/>`;
    xs.forEach((x, i) => { s += `<path d="M${x} 30V76M${x} 124V170" class="fl-w"/>` + resV(x, 76, R[i]) + `<circle cx="${x}" cy="30" r="3.5" class="fl-node"/><circle cx="${x}" cy="170" r="3.5" class="fl-node"/>` + flArrow(x + 1, 42, x + 1, 66, "fl-react", 7) + flT(x - 6, 56, "I_" + (i + 1), "fl-sym fl-rt", "end"); });
    s += flArrow(70, 30, 110, 30, "fl-load", 8) + flT(90, 22, I, "fl-sym fl-lt");
    s += flT(185, 196, T("Lik spenning over alle grenene, strømmene deles", "Same voltage on every branch, currents split"), "fl-sm");
  } else {
    const k = kind === "ohm" ? 1 : n, xs = Array.from({ length: k }, (_, i) => 100 + i * (200 / k));
    s += bat(50, 100) + `<path d="M50 70V30H${xs[0]}M50 130V170H320V30H${xs[k - 1] + 48}" class="fl-w"/>`;
    xs.forEach((x, i) => { s += resH(x, 30, R[i]) + (i ? `<path d="M${xs[i - 1] + 48} 30H${x}" class="fl-w"/>` : "") + `<path d="M${x} 52H${x + 48}" class="fl-dim"/>` + flT(x + 24, 66, "U_" + (k === 1 ? "R" : i + 1), "fl-sym fl-mt"); });
    s += flArrow(140, 170, 100, 170, "fl-load", 8) + flT(120, 188, I, "fl-sym fl-lt");
    if(kind === "series") s += flT(190, 108, T("Samme strøm gjennom alle,", "Same current through all,"), "fl-sm") + flT(190, 124, T("spenningene summeres", "the voltages add up"), "fl-sm") + flT(190, 146, "U = U_1 + U_2 + U_3", "fl-sym");
    else s += flT(190, 116, kind === "ohm" ? "U = R · I" : "U_2 = U · R_2/(R_1 + R_2)", "fl-sym");
  }
  return `<svg class="fl" viewBox="0 0 360 205" role="img">${s}</svg>`;
};

// ---------- RC: opplading med tidskonstant, eller filter med knekkfrekvens ----------
FL.rc = (o = {}) => {
  const type = o.type || "charge";
  if(type === "charge"){
    const P = FL.plot([[t => 1 - Math.exp(-t), "fl-sig2"]], [0, 5.6], [0, 1.15], [50, 22, 270, 140], { xl: "t", yl: "u_C" });
    let s = P.s + `<path d="M${P.X(0)} ${flN(P.Y(1))}H${flN(P.X(5.6))}" class="fl-dim" style="stroke-dasharray:5 4"/>` + flT(P.X(0) - 6, P.Y(1) + 4, "U", "fl-sym", "end");
    [[1, "63 %"], [2, "86 %"], [3, "95 %"], [5, "99 %"]].forEach(([k, l]) => { const y = 1 - Math.exp(-k); s += `<path d="M${flN(P.X(k))} ${flN(P.Y(0))}V${flN(P.Y(y))}" class="fl-dim" style="stroke-dasharray:3 3"/><circle cx="${flN(P.X(k))}" cy="${flN(P.Y(y))}" r="3.5" class="fl-loadf"/>` + flT(P.X(k), P.Y(0) + 16, k === 1 ? "τ" : k + "τ", "fl-sym") + flT(P.X(k) + (k === 5 ? -4 : 6), P.Y(y) + (k === 1 ? 16 : -6), l, "fl-sm fl-lt", k === 5 ? "end" : "start"); });
    s += flT(200, 196, "τ = R·C", "fl-sym");
    return `<svg class="fl" viewBox="0 0 360 205" role="img">${s}</svg>`;
  }
  // filter: skjema + amplituderespons (logaritmisk frekvensakse)
  const low = type === "low", sch = `<path d="M20 50H60M108 50H170M170 50V64M170 92V110M20 110H190M170 50H190" class="fl-w"/><rect x="60" y="41" width="48" height="18" rx="3" class="fl-res"/>`
    + `<path d="M156 64H184M156 70H184" class="fl-w" style="stroke-width:3"/><path d="M170 70V92" class="fl-w"/>`;
  // høypass: bytt plass på R og C
  const schH = `<path d="M20 50H62M70 50H170M170 50V64M170 112V110M20 110H190M170 50H190" class="fl-w"/><path d="M62 36V64M70 36V64" class="fl-w" style="stroke-width:3"/><rect x="161" y="64" width="18" height="46" rx="3" class="fl-res"/>`;
  let s = (low ? sch + flT(84, 34, "R", "fl-sym") + flT(192, 82, "C", "fl-sym", "start") : schH + flT(66, 30, "C", "fl-sym") + flT(186, 92, "R", "fl-sym", "start"))
    + `<circle cx="20" cy="50" r="3.5" class="fl-node"/><circle cx="190" cy="50" r="3.5" class="fl-node"/>` + flT(14, 42, T("inn", "in"), "fl-sm", "start") + flT(196, 46, T("ut", "out"), "fl-sm", "start");
  const P = FL.plot([[w => low ? 1 / Math.sqrt(1 + Math.pow(10, 2 * w)) : 1 / Math.sqrt(1 + Math.pow(10, -2 * w)), "fl-sig2"]], [-2, 2], [0, 1.15], [234, 22, 110, 90], { xl: "f", yl: "A" });
  s += P.s + `<path d="M${flN(P.X(0))} ${flN(P.Y(0))}V${flN(P.Y(0.707))}" class="fl-dim" style="stroke-dasharray:3 3"/><circle cx="${flN(P.X(0))}" cy="${flN(P.Y(0.707))}" r="3.5" class="fl-loadf"/>` + flT(P.X(0), P.Y(0) + 16, "f_c", "fl-sym");
  s += flT(180, 150, low ? T("Lave frekvenser slipper gjennom", "Low frequencies pass") : T("Høye frekvenser slipper gjennom", "High frequencies pass"), "fl-sm") + flT(180, 172, "f_c = 1/(2πRC)", "fl-sym");
  return `<svg class="fl" viewBox="0 0 360 185" role="img">${s}</svg>`;
};

// ---------- SKRÅPLAN med kraftdekomponering ----------
FL.incline = (o = {}) => {
  const a = (o.angle || 30) * Math.PI / 180, x0 = 30, y0 = 180, L = 300, xt = x0 + L * Math.cos(a), yt = y0 - L * Math.sin(a);
  const bx = x0 + 0.55 * L * Math.cos(a), by = y0 - 0.55 * L * Math.sin(a), ux = Math.cos(a), uy = -Math.sin(a), nx = -Math.sin(a), ny = -Math.cos(a), w = 46, h = 30;
  const cx = bx + nx * h / 2, cy = by + ny * h / 2, G = 70;
  let s = `<path d="M${x0} ${y0}L${flN(xt)} ${y0}L${flN(xt)} ${flN(yt)}Z" class="fl-sup"/>`;
  s += `<path d="M${x0 + 46} ${y0}A46 46 0 0 0 ${flN(x0 + 46 * Math.cos(a))} ${flN(y0 - 46 * Math.sin(a))}" class="fl-dim"/>` + flT(x0 + 56, y0 - 8, "α", "fl-sym", "start");
  s += `<g transform="translate(${flN(bx)} ${flN(by)}) rotate(${flN(-a * 180 / Math.PI)})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="3" class="fl-beam"/></g>`;
  s += flArrow(cx, cy, cx, cy + G, "fl-load", 10) + flT(cx - 6, cy + G + 14, "G", "fl-sym fl-lt", "end");
  const gp = G * Math.cos(a), gs = G * Math.sin(a), ex = cx - nx * gp, ey = cy - ny * gp, sx = cx - ux * gs, sy = cy - uy * gs;
  s += `<path d="M${flN(ex)} ${flN(ey)}L${flN(cx)} ${flN(cy + G)}L${flN(sx)} ${flN(sy)}" class="fl-dim" style="stroke-dasharray:3 3"/>`;
  s += flArrow(cx, cy, ex, ey, "fl-dim", 8) + flT(ex + 10, ey + 6, "G cos α", "fl-sym fl-sm", "start");
  s += flArrow(cx, cy, sx, sy, "fl-dim", 8) + flT(sx - 8, sy - 2, "G sin α", "fl-sym fl-sm", "end");
  s += flArrow(cx, cy, cx + nx * gp, cy + ny * gp, "fl-react", 10) + flT(cx + nx * gp - 4, cy + ny * gp - 4, "N", "fl-sym fl-rt", "end");
  if(o.friction !== false) s += flArrow(cx, cy, cx + ux * 46, cy + uy * 46, "fl-react", 9) + flT(cx + ux * 46 + 6, cy + uy * 46, "R", "fl-sym fl-rt", "start");
  return `<svg class="fl" viewBox="0 0 360 200" role="img">${s}</svg>`;
};

// ---------- FJÆRER: i serie og i parallell, eller masse–fjær ----------
FL.springs = (o = {}) => {
  const coil = (x, y1, y2, lab) => { const n = 8, d = (y2 - y1 - 16) / n; let p = `M${x} ${y1}v8`; for(let i = 0; i < n; i++) p += `l${i % 2 ? -9 : 9} ${flN(d / 2)}l${i % 2 ? 9 : -9} ${flN(d / 2)}`; p += "v8"; return `<path d="${p}" class="fl-w"/>` + (lab ? flT(x + 16, (y1 + y2) / 2 + 5, lab, "fl-sym", "start") : ""); };
  const ceil = (x1, x2, y) => `<path d="M${x1} ${y}H${x2}" class="fl-w" style="stroke-width:3"/>` + Array.from({ length: Math.round((x2 - x1) / 10) }, (_, i) => `<path d="M${x1 + i * 10} ${y}l8 -8" class="fl-gnd"/>`).join("");
  const mass = (x, y, lab = "m") => `<rect x="${x - 24}" y="${y}" width="48" height="34" rx="4" class="fl-beam"/>${flT(x, y + 22, lab, "fl-sym")}`;
  let s = "";
  if(o.kind === "mass"){ s += ceil(130, 230, 20) + coil(180, 20, 110, "k") + mass(180, 110) + `<path d="M240 127H300" class="fl-dim" style="stroke-dasharray:4 3"/>` + flArrow(290, 127, 290, 165, "fl-load", 8) + flArrow(290, 127, 290, 89, "fl-load", 8) + flT(298, 131, "x", "fl-sym fl-lt", "start") + flT(180, 186, "T = 2π √(m/k)", "fl-sym"); return `<svg class="fl" viewBox="0 0 360 196" role="img">${s}</svg>`; }
  s += ceil(40, 160, 20) + coil(80, 20, 100, "k_1") + coil(120, 20, 100, "k_2") + `<path d="M70 100H130" class="fl-w"/><path d="M100 100V108" class="fl-w"/>` + mass(100, 108) + flT(100, 168, T("parallell", "parallel"), "fl-b") + flT(100, 188, "k = k_1 + k_2", "fl-sym");
  s += ceil(210, 330, 20) + coil(270, 20, 70, "k_1") + coil(270, 70, 120, "k_2") + mass(270, 120) + flT(270, 168, T("serie", "series"), "fl-b") + flT(270, 188, "1/k = 1/k_1 + 1/k_2", "fl-sym");
  return `<svg class="fl" viewBox="0 0 360 198" role="img">${s}</svg>`;
};

// ---------- SKRÅTT KAST ----------
FL.projectile = (o = {}) => {
  const a = (o.angle || 45) * Math.PI / 180, x0 = 84, y0 = 170, R = 240, H = R * Math.tan(a) / 4;
  const pt = u => [x0 + R * u, y0 - 4 * H * u * (1 - u)];
  let d = ""; for(let i = 0; i <= 60; i++){ const [x, y] = pt(i / 60); d += (i ? "L" : "M") + flN(x) + " " + flN(y); }
  let s = `<path d="M20 ${y0}H340" class="fl-gnd" style="stroke-width:2"/><path d="${d}" class="fl-sig1" style="stroke-dasharray:6 4"/>`;
  const vx = 60 * Math.cos(a), vy = 60 * Math.sin(a);
  s += flArrow(x0, y0, x0 + vx, y0 - vy, "fl-load", 10) + flT(x0 + vx + 4, y0 - vy - 6, "v_0", "fl-sym fl-lt", "start");
  s += flArrow(x0, y0, x0 + vx, y0, "fl-react", 8) + flT(x0 + vx + 4, y0 + 16, "v_0 cos α", "fl-sym fl-sm", "start");
  s += flArrow(x0, y0, x0, y0 - vy, "fl-react", 8) + flT(x0 - 6, y0 - vy, "v_0 sin α", "fl-sym fl-sm", "end");
  s += `<path d="M${x0 + 30} ${y0}A30 30 0 0 0 ${flN(x0 + 30 * Math.cos(a))} ${flN(y0 - 30 * Math.sin(a))}" class="fl-dim"/>` + flT(x0 + 36, y0 - 8, "α", "fl-sym", "start");
  const [tx, ty] = pt(0.5); s += `<circle cx="${flN(tx)}" cy="${flN(ty)}" r="4" class="fl-loadf"/>` + flArrow(tx, ty, tx + 40, ty, "fl-react", 8) + flT(tx, ty - 10, T("toppunkt: v_y = 0", "top: v_y = 0"), "fl-sm") + `<path d="M${flN(tx)} ${flN(ty + 8)}V${y0}" class="fl-dim" style="stroke-dasharray:3 3"/>` + flT(tx + 6, (ty + y0) / 2, "h", "fl-sym", "start");
  s += flDim(x0, x0 + R, y0 + 26, "");
  s += flT(x0 + R / 2 + 40, y0 + 42, T("rekkevidde", "range"), "fl-sm");
  return `<svg class="fl" viewBox="0 0 360 220" role="img">${s}</svg>`;
};

// ---------- TRYKK I VÆSKE og OPPDRIFT ----------
FL.fluid = (o = {}) => {
  const buoy = o.kind === "buoyancy";
  let s = `<rect x="40" y="40" width="200" height="140" class="fl-cap" style="fill:#2B6FD6;fill-opacity:.16;stroke:#2B6FD6"/><path d="M40 40V180H240V40" class="fl-w"/><path d="M40 40H240" class="fl-sig1"/>`;
  if(!buoy){
    [70, 110, 150].forEach((y, i) => { const L = 14 + i * 12; s += flArrow(240 - 4 - L, y, 236, y, "fl-load", 7) + flArrow(44 + L, y, 44, y, "fl-load", 7); });
    s += `<path d="M262 40H278M262 150H278M270 40V150" class="fl-dim"/>` + flT(280, 100, "h", "fl-sym", "start") + flT(140, 30, "p_0", "fl-sym") + flT(300, 140, "p = p_0 + ρ g h", "fl-sym", "middle");
    s += flT(140, 196, T("Trykket øker med dybden", "Pressure grows with depth"), "fl-sm");
  } else {
    s += `<rect x="110" y="70" width="60" height="50" rx="4" class="fl-beam"/>` + flArrow(140, 95, 140, 160, "fl-load", 10) + flT(148, 160, "G", "fl-sym fl-lt", "start") + flArrow(140, 95, 140, 22, "fl-react", 10) + flT(148, 28, "F_b", "fl-sym fl-rt", "start");
    s += flT(300, 90, "F_b = ρ V g", "fl-sym") + flT(300, 112, T("= tyngden av", "= weight of"), "fl-sm") + flT(300, 128, T("fortrengt væske", "displaced fluid"), "fl-sm");
  }
  return `<svg class="fl" viewBox="0 0 360 205" role="img">${s}</svg>`;
};

// ---------- SPENNING–TØYNING ----------
FL.stressStrain = () => {
  const P = FL.plot([], [0, 1], [0, 1.15], [50, 20, 270, 150], { xl: "ε", yl: "σ" });
  const pts = [[0, 0], [0.12, 0.62], [0.14, 0.64], [0.3, 0.66], [0.55, 0.92], [0.75, 1], [0.92, 0.82]];
  let d = `M${flN(P.X(0))} ${flN(P.Y(0))}L${flN(P.X(0.12))} ${flN(P.Y(0.62))}`; d += `C${flN(P.X(0.13))} ${flN(P.Y(0.66))} ${flN(P.X(0.16))} ${flN(P.Y(0.6))} ${flN(P.X(0.3))} ${flN(P.Y(0.66))}`;
  d += `C${flN(P.X(0.45))} ${flN(P.Y(0.75))} ${flN(P.X(0.6))} ${flN(P.Y(1.02))} ${flN(P.X(0.75))} ${flN(P.Y(1))}C${flN(P.X(0.85))} ${flN(P.Y(0.98))} ${flN(P.X(0.9))} ${flN(P.Y(0.9))} ${flN(P.X(0.92))} ${flN(P.Y(0.82))}`;
  let s = P.s + `<path d="${d}" class="fl-sig2"/>` + `<path d="M${flN(P.X(0.04))} ${flN(P.Y(0.207))}h18v-${flN(0.31 * 150 * 0.65)}" class="fl-dim"/>` + flT(P.X(0.04) + 22, P.Y(0.12), "E", "fl-sym fl-vt", "start");
  s += `<circle cx="${flN(P.X(0.12))}" cy="${flN(P.Y(0.62))}" r="4" class="fl-loadf"/>` + flT(P.X(0.12) - 6, P.Y(0.62) - 8, T("flytegrense", "yield"), "fl-sm fl-lt", "end");
  s += `<circle cx="${flN(P.X(0.75))}" cy="${flN(P.Y(1))}" r="4" class="fl-loadf"/>` + flT(P.X(0.75), P.Y(1) - 10, T("strekkfasthet", "tensile strength"), "fl-sm fl-lt") + `<path d="M${flN(P.X(0.92))} ${flN(P.Y(0.82))}l6 6m0 -6l-6 6" class="fl-load"/>` + flT(P.X(0.92), P.Y(0.82) + 20, T("brudd", "fracture"), "fl-sm");
  s += flT(P.X(0.06), P.Y(0) - 8, T("elastisk", "elastic"), "fl-sm", "start") + flT(P.X(0.45), P.Y(0) - 8, T("plastisk", "plastic"), "fl-sm");
  return `<svg class="fl" viewBox="0 0 360 200" role="img">${s}</svg>`;
};

// ---------- SØYLE som knekker ----------
FL.column = (o = {}) => {
  const cases = o.cases || [["ledd–ledd", "pinned–pinned", 1], ["fast–fri", "fixed–free", 2], ["fast–ledd", "fixed–pinned", 0.7], ["fast–fast", "fixed–fixed", 0.5]];
  let s = "";
  cases.forEach(([nb, en, K], i) => { const x = 50 + i * 86, yT = 30, yB = 150;
    const shape = t => K === 1 ? Math.sin(Math.PI * t) : K === 2 ? 1 - Math.cos(Math.PI * t / 2) : K === 0.5 ? (1 - Math.cos(2 * Math.PI * t)) / 2 : Math.sin(4.49 * t) * 0.72 - 0.2 * Math.sin(Math.PI * t) * 0;
    let d = ""; for(let j = 0; j <= 30; j++){ const t = j / 30, yy = yB - (yB - yT) * t; d += (j ? "L" : "M") + flN(x + 16 * (K === 2 ? shape(t) * 1.2 : shape(t))) + " " + flN(yy); }
    s += `<path d="M${x} ${yB}V${yT}" class="fl-dim" style="stroke-dasharray:4 3"/><path d="${d}" class="fl-sig2"/>` + flArrow(x, yT - 26, x, yT - 2, "fl-load", 8);
    s += `<path d="M${x - 14} ${yB}h28" class="fl-w" style="stroke-width:3"/>` + (K === 1 || K === 0.7 ? `<path d="M${x - 10} ${yT}h20" class="fl-w"/>` : K === 0.5 ? `<path d="M${x - 14} ${yT}h28" class="fl-w" style="stroke-width:3"/>` : "");
    s += flT(x, 172, T(nb, en), "fl-sm") + flT(x, 190, `L_k = ${String(K).replace(".", T(",", "."))}L`, "fl-sym fl-vt"); });
  return `<svg class="fl" viewBox="0 0 360 200" role="img">${s}</svg>`;
};

// ---------- SPRANGRESPONS (1. og 2. orden) ----------
FL.step = (o = {}) => {
  const order = o.order || 1, z = o.zeta ?? 0.3;
  const f = order === 1 ? t => 1 - Math.exp(-t) : t => { const wd = Math.sqrt(1 - z * z); return 1 - Math.exp(-z * t) * (Math.cos(wd * t) + z / wd * Math.sin(wd * t)); };
  const T0 = order === 1 ? 5 : 14, P = FL.plot([[f, "fl-sig2"]], [0, T0], [0, 1.6], [50, 22, 280, 140], { xl: "t", yl: "y" });
  let s = P.s + `<path d="M${P.X(0)} ${flN(P.Y(1))}H${P.X(T0)}" class="fl-dim" style="stroke-dasharray:5 4"/>` + flT(P.X(0) - 6, P.Y(1) + 4, "K", "fl-sym", "end");
  if(order === 1) s += `<path d="M${flN(P.X(1))} ${flN(P.Y(0))}V${flN(P.Y(0.632))}" class="fl-dim" style="stroke-dasharray:3 3"/><circle cx="${flN(P.X(1))}" cy="${flN(P.Y(0.632))}" r="4" class="fl-loadf"/>` + flT(P.X(1), P.Y(0) + 16, "τ", "fl-sym") + flT(P.X(1) + 8, P.Y(0.632) + 14, "63 %", "fl-sm fl-lt", "start");
  else { const wd = Math.sqrt(1 - z * z), tp = Math.PI / wd, mp = f(tp); s += `<circle cx="${flN(P.X(tp))}" cy="${flN(P.Y(mp))}" r="4" class="fl-loadf"/>` + flT(P.X(tp) + 8, P.Y(mp) - 4, T("oversving", "overshoot") + ` ${Math.round((mp - 1) * 100)} %`, "fl-sm fl-lt", "start") + `<path d="M${flN(P.X(tp))} ${flN(P.Y(0))}V${flN(P.Y(mp))}" class="fl-dim" style="stroke-dasharray:3 3"/>` + flT(P.X(tp), P.Y(0) + 16, "t_p", "fl-sym") + flT(250, 30, `ζ = ${String(z).replace(".", T(",", "."))}`, "fl-sym", "start"); }
  return `<svg class="fl" viewBox="0 0 360 200" role="img">${s}</svg>`;
};

// ---------- BLOKKSKJEMA: lukket sløyfe ----------
FL.loop = (o = {}) => {
  const blk = (x, y, w, lab) => `<rect x="${x}" y="${y - 20}" width="${w}" height="40" rx="6" class="fl-oa"/>${flT(x + w / 2, y + 5, lab, "fl-sym")}`;
  let s = flArrow(10, 70, 56, 70, "fl-dim", 8) + flT(14, 62, "r", "fl-sym", "start") + `<circle cx="70" cy="70" r="13" class="fl-oa"/>${flT(70, 75, "Σ", "fl-b")}${flT(52, 64, "+", "fl-sm fl-b")}${flT(64, 98, "−", "fl-b")}`;
  s += flArrow(83, 70, 120, 70, "fl-dim", 8) + flT(100, 62, "e", "fl-sym") + blk(120, 70, 70, "C(s)") + flArrow(190, 70, 222, 70, "fl-dim", 8) + flT(206, 62, "u", "fl-sym") + blk(222, 70, 70, "G(s)");
  s += `<path d="M292 70H340" class="fl-w"/>` + flArrow(330, 70, 350, 70, "fl-dim", 8) + flT(344, 62, "y", "fl-sym", "end") + `<path d="M320 70V140H70V83" class="fl-w"/>` + flArrow(70, 100, 70, 84, "fl-dim", 8);
  s += flT(130, 26, T("regulator", "controller"), "fl-sm") + flT(257, 26, T("prosess", "process"), "fl-sm") + flT(195, 158, T("måling tilbake", "measurement fed back"), "fl-sm");
  s += flT(180, 190, "y/r = C·G / (1 + C·G)", "fl-sym");
  return `<svg class="fl" viewBox="0 0 360 200" role="img">${s}</svg>`;
};
