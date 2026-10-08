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
  // mål
  const yD = yB + 50; s += flDim(X0, X1, yD, o.L || "L");
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
    else s += `<path d="M170 80H140V30H190M230 30H275V100" class="fl-w"/>` + res(190, 30, 40, L.rf) + `<circle cx="275" cy="100" r="3.5" class="fl-node"/><circle cx="140" cy="80" r="3.5" class="fl-node"/><path d="M140 80V96M140 136V150" class="fl-w"/>` + res(140, 96, 40, L.rg, true) + gnd(140, 150);
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
