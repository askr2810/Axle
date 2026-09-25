// ============================================================
//  PRØV SELV – interaktive simuleringer med glidebrytere (i stil med Brilliant).
//  Brukes med linjen ![sim:navn] i teorien, eller kobles til en enhet i SIM_MAP.
//  Hver simulering: t = tittel, p = [nøkkel, etikett, min, maks, steg, start, enhet],
//  q = en liten «prøv dette»-oppgave, f(v) → { svg, out: [[navn, verdi]] }.
// ============================================================
const smN = (x, d = 2) => nf(x, d);
let smSeq = 0;
const smBox = { L: 44, R: 304, T: 14, B: 150 };
// Graf: fns = [[fn, klasse]], xr/yr = [min, maks]. Returnerer svg og en funksjon som gjør om data → piksler.
function smPlot(fns, xr, yr, lx, ly, extra){
  const { L, R, T: Tp, B } = smBox;
  const X = x => L + (x - xr[0]) / (xr[1] - xr[0]) * (R - L), Y = y => B - (y - yr[0]) / (yr[1] - yr[0]) * (B - Tp);
  const y0 = Math.min(B, Math.max(Tp, Y(0)));
  let s = fgAr(L, y0, R + 8, y0, "fg-ax", 1.4) + fgAr(L, B + 4, L, Tp - 6, "fg-ax", 1.4) + fgT(R + 6, y0 + 16, lx, "fg-i", "end") + fgT(L - 8, Tp + 2, ly, "fg-i", "end");
  const cid = "smc" + (++smSeq); let cv = "";
  for(const [fn, cls, w] of fns){
    let d = "", pen = false;
    for(let i = 0; i <= 160; i++){ const x = xr[0] + (xr[1] - xr[0]) * i / 160, y = fn(x);
      if(!Number.isFinite(y) || y < yr[0] - (yr[1] - yr[0]) || y > yr[1] + (yr[1] - yr[0])){ pen = false; continue; }
      d += (pen ? "L" : "M") + X(x).toFixed(1) + " " + Math.min(B + 30, Math.max(Tp - 30, Y(y))).toFixed(1); pen = true; }
    cv += `<path class="${cls || "fg-acc"}" d="${d}" fill="none" stroke-width="${w || 2.4}"/>`;
  }
  s += `<clipPath id="${cid}"><rect x="${L}" y="${Tp - 4}" width="${R - L + 4}" height="${B - Tp + 8}"/></clipPath><g clip-path="url(#${cid})">${cv}</g>`;
  return { svg: s + (extra ? extra(X, Y) : ""), X, Y };
}
const smDot = (x, y, cls = "fg-dot", r = 4.5) => `<circle class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`;
const smLine = (x1, y1, x2, y2, cls = "fg-mut", dash) => `<line class="${cls}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-width="1.6"/>`;

const SIMS = {
  // ---------- elektro ----------
  ohm: { t: ["Ohms lov", "Ohm's law"], p: [["U", "U", 1, 24, 1, 12, "V"], ["R", "R", 2, 60, 1, 12, "Ω"]],
    q: ["Doble R. Hva skjer med strømmen? Og med effekten?", "Double R. What happens to the current? And to the power?"],
    f: v => { const I = v.U / v.R, P = v.U * I, glow = Math.min(1, P / 60);
      return { out: [["I = U/R", smN(I) + " A"], ["P = UI", smN(P) + " W"]], svg: `
        <rect class="fg-line" x="60" y="40" width="200" height="110" rx="10" fill="none"/>
        <rect class="fg-box" x="46" y="78" width="28" height="34" rx="4"/>${fgT(60, 100, "+", "fg-b")}${fgT(92, 100, smN(v.U, 0) + " V", "fg-s", "start")}
        <rect class="fg-box" x="140" y="140" width="52" height="20" rx="3"/>${fgT(166, 176, smN(v.R, 0) + " Ω", "fg-s")}
        <circle cx="260" cy="95" r="${16 + glow * 14}" fill="var(--gold)" opacity="${(0.15 + glow * 0.55).toFixed(2)}"/>
        <circle class="fg-box" cx="260" cy="95" r="14"/><path class="fg-line" d="M252 99 l4 -8 4 8 4 -8" fill="none"/>
        ${fgAr(150, 40, 150 + Math.min(80, 12 + I * 14), 40, "fg-acc", 2.2)}${fgT(160, 30, "I = " + smN(I) + " A", "fg-i fg-acct", "start")}` }; } },
  rc: { t: ["Opplading av kondensator", "Charging a capacitor"], p: [["R", "R", 1, 20, 1, 5, "kΩ"], ["C", "C", 10, 200, 10, 100, "µF"]],
    q: ["Hvor mange prosent er ladet etter én tidskonstant τ? Etter 5τ?", "What percentage is charged after one time constant τ? After 5τ?"],
    f: v => { const tau = v.R * v.C / 1000, tmax = 5;
      const g = smPlot([[t => 1 - Math.exp(-t / tau)], [t => 1, "fg-mut", 1.2]], [0, tmax], [0, 1.15], "t (s)", "u/U", (X, Y) =>
        (tau <= tmax ? smLine(X(tau), Y(0), X(tau), Y(0.632), "fg-red", "4 3") + smDot(X(tau), Y(0.632), "fg-dot") + fgT(X(tau) + 6, Y(0.632) - 6, "63 %", "fg-s", "start") + fgT(X(tau), Y(0) + 14, "τ", "fg-i fg-redt") : "") +
        (5 * tau <= tmax ? smLine(X(5 * tau), Y(0), X(5 * tau), Y(0.993), "fg-mut", "3 3") + fgT(X(5 * tau), Y(0) + 14, "5τ", "fg-i") : ""));
      return { out: [["τ = RC", smN(tau) + " s"], ["5τ", smN(5 * tau) + " s"]], svg: g.svg }; } },
  sine: { t: ["Vekselspenning", "AC voltage"], p: [["A", "Û", 1, 10, 0.5, 6, "V"], ["f", "f", 1, 5, 0.5, 2, "Hz"], ["ph", "φ", -180, 180, 15, 0, "°"]],
    q: ["Still φ til 90°. Hvor ligger toppen nå i forhold til før?", "Set φ to 90°. Where is the peak now compared with before?"],
    f: v => { const w = 2 * Math.PI * v.f, ph = v.ph * Math.PI / 180;
      const g = smPlot([[t => v.A * Math.sin(w * t + ph)]], [0, 1], [-10.5, 10.5], "t (s)", "u");
      return { out: [["T = 1/f", smN(1 / v.f, 3) + " s"], ["ω = 2πf", smN(w) + " rad/s"], ["U_rms = Û/√2", smN(v.A / Math.SQRT2) + " V"]], svg: g.svg }; } },
  lowpass: { t: ["RC-lavpassfilter", "RC low-pass filter"], p: [["fc", "f_c", 50, 2000, 50, 500, "Hz"], ["fin", "f inn", 10, 10000, 10, 1000, "Hz"]],
    q: ["Sett f inn = f_c. Hvor mye av amplituden slipper gjennom?", "Set f in = f_c. How much of the amplitude gets through?"],
    f: v => { const H = f => 1 / Math.sqrt(1 + (f / v.fc) ** 2), lg = Math.log10;
      const g = smPlot([[x => 20 * lg(H(10 ** x))]], [1, 4], [-42, 4], "log f", "dB", (X, Y) => smLine(X(lg(v.fc)), Y(-42), X(lg(v.fc)), Y(-3), "fg-mut", "3 3") + fgT(X(lg(v.fc)), Y(-42) + 14, "f_c", "fg-s") + smDot(X(lg(v.fin)), Y(20 * lg(H(v.fin))), "fg-dot"));
      return { out: [["|H|", smN(H(v.fin), 3)], ["dB", smN(20 * lg(H(v.fin)), 1) + " dB"]], svg: g.svg }; } },
  trafo: { t: ["Transformatoren", "The transformer"], p: [["U1", "U₁", 100, 1000, 10, 230, "V"], ["N1", "N₁", 50, 1000, 10, 500, ""], ["N2", "N₂", 10, 1000, 10, 50, ""], ["I2", "I₂", 1, 20, 1, 5, "A"]],
    q: ["Gjør N₂ større enn N₁. Hva skjer med spenningen og strømmen på primærsiden?", "Make N₂ larger than N₁. What happens to the voltage and to the primary current?"],
    f: v => { const n = v.N1 / v.N2, U2 = v.U1 / n, I1 = v.I2 / n, coils = (x, N) => Array.from({ length: Math.max(2, Math.min(14, Math.round(N / 70))) }, (_, i) => `<ellipse class="fg-line" cx="${x}" cy="${46 + i * 7.5}" rx="14" ry="4"/>`).join("");
      return { out: [["U₂ = U₁·N₂/N₁", smN(U2) + " V"], ["I₁ = I₂·N₂/N₁", smN(I1) + " A"], ["S = U₂I₂", smN(U2 * v.I2) + " VA"]], svg: `
        <rect class="fg-fill" x="118" y="30" width="84" height="130" rx="6"/><rect class="fg-box" x="138" y="50" width="44" height="90" rx="2"/>
        ${coils(118, v.N1)}${coils(202, v.N2)}
        ${fgT(60, 90, smN(v.U1, 0) + " V", "fg-b")}${fgT(60, 108, "N₁ = " + v.N1, "fg-s")}${fgT(262, 90, smN(U2) + " V", "fg-b fg-acct")}${fgT(262, 108, "N₂ = " + v.N2, "fg-s")}
        ${fgT(160, 176, T("jernkjerne", "iron core"), "fg-s")}` }; } },
  motor: { t: ["Turtall i asynkronmotor", "Induction motor speed"], p: [["p", ["poler", "poles"], 2, 12, 2, 4, ""], ["f", "f", 50, 60, 10, 50, "Hz"], ["s", ["sakking", "slip"], 0, 10, 0.5, 3, "%"]],
    q: ["Hvor mange poler trenger du for ca. 1000 o/min på 50 Hz?", "How many poles do you need for about 1000 rpm at 50 Hz?"],
    f: v => { const ns = 120 * v.f / v.p, n = ns * (1 - v.s / 100), ang = (n / 3600) * 180 - 90;
      return { out: [["n_s = 120f/p", smN(ns, 0) + " " + T("o/min", "rpm")], ["n = n_s(1−s)", smN(n, 0) + " " + T("o/min", "rpm")]], svg: `
        <path class="fg-mut" d="M70 150 A90 90 0 1 1 250 150" fill="none" stroke-width="10" stroke-linecap="round"/>
        <path class="fg-acc" d="M70 150 A90 90 0 0 1 ${(160 + 90 * Math.sin(ang * Math.PI / 180)).toFixed(1)} ${(150 - 90 * Math.cos(ang * Math.PI / 180)).toFixed(1)}" fill="none" stroke-width="10" stroke-linecap="round"/>
        ${fgT(160, 132, smN(n, 0), "fg-b")}${fgT(160, 150, T("o/min", "rpm"), "fg-s")}${fgT(70, 172, "0", "fg-s")}${fgT(250, 172, "3600", "fg-s")}` }; } },
  bits: { t: ["Binære tall", "Binary numbers"], p: [["n", ["tall", "number"], 0, 255, 1, 42, ""]],
    q: ["Hvilket tall får du når alle 8 bitene er 1?", "Which number do you get when all 8 bits are 1?"],
    f: v => { const b = v.n.toString(2).padStart(8, "0");
      return { out: [[T("binært", "binary"), b], ["hex", "0x" + v.n.toString(16).toUpperCase().padStart(2, "0")]], svg: [...b].map((c, i) => `
        <rect x="${14 + i * 37}" y="52" width="32" height="44" rx="7" class="${c === "1" ? "fg-bit1" : "fg-box"}"/>${fgT(30 + i * 37, 82, c, c === "1" ? "fg-b fg-bitt" : "fg-b")}${fgT(30 + i * 37, 118, String(2 ** (7 - i)), "fg-s")}`).join("") + fgT(160, 150, b.split("").map((c, i) => c === "1" ? 2 ** (7 - i) : 0).filter(Boolean).join(" + ") + " = " + v.n, "fg-s") }; } },
  subnet: { t: ["Subnettmaske", "Subnet mask"], p: [["n", ["prefiks /n", "prefix /n"], 8, 30, 1, 24, ""]],
    q: ["Hvilket prefiks trenger du for minst 50 maskiner?", "Which prefix do you need for at least 50 hosts?"],
    f: v => { const host = 32 - v.n, mask = [0, 1, 2, 3].map(i => { const b = Math.max(0, Math.min(8, v.n - 8 * i)); return 256 - 2 ** (8 - b); }).map(x => x === 256 ? 0 : x);
      const cells = Array.from({ length: 32 }, (_, i) => `<rect x="${12 + i * 9.3 + Math.floor(i / 8) * 4}" y="60" width="8" height="30" rx="2" class="${i < v.n ? "fg-bit1" : "fg-box"}"/>`).join("");
      return { out: [[T("maske", "mask"), mask.join(".")], [T("adresser", "addresses"), nf(2 ** host, 0)], [T("brukbare verter", "usable hosts"), nf(Math.max(0, 2 ** host - 2), 0)]], svg:
        cells + fgT(12 + v.n * 4.7, 50, T("nettverk", "network") + " (" + v.n + " bit)", "fg-s fg-acct") + fgT(310 - host * 4.7, 112, T("vert", "host") + " (" + host + " bit)", "fg-s") }; } },
  // ---------- mekanikk og fysikk ----------
  projectile: { t: ["Skrått kast", "Projectile motion"], p: [["v", "v₀", 5, 30, 1, 20, "m/s"], ["a", "θ", 5, 85, 1, 45, "°"]],
    q: ["Hvilken vinkel gir lengst kast? Prøv 30° og 60°. Hva merker du?", "Which angle gives the longest throw? Try 30° and 60°. What do you notice?"],
    f: v => { const g = 9.81, r = v.a * Math.PI / 180, vx = v.v * Math.cos(r), vy = v.v * Math.sin(r), tf = 2 * vy / g, Rg = vx * tf, H = vy * vy / (2 * g);
      const gp = smPlot([], [0, 95], [0, 48], "x (m)", "y (m)", (X, Y) => `<path class="fg-acc" stroke-width="2.4" fill="none" d="${fgPath(s => { const t = s * tf; return [X(vx * t), Y(vy * t - g * t * t / 2)]; }, 0, 1, 60)}"/>` +
        smDot(X(Rg), Y(0), "fg-dot") + smLine(X(Rg / 2), Y(0), X(Rg / 2), Y(H), "fg-mut", "3 3") + fgAr(X(0), Y(0), X(0) + vx * 1.6, Y(0) - vy * 1.6, "fg-red", 2));
      return { out: [[T("lengde", "range"), smN(Rg) + " m"], [T("maks høyde", "max height"), smN(H) + " m"], [T("tid i lufta", "time of flight"), smN(tf) + " s"]], svg: gp.svg }; } },
  incline: { t: ["Kloss på skråplan", "Block on an incline"], p: [["a", "θ", 0, 60, 1, 25, "°"], ["mu", "μ", 0, 1, 0.05, 0.3, ""]],
    q: ["Finn vinkelen der klossen akkurat begynner å gli. Sjekk at tan θ = μ.", "Find the angle where the block just starts to slide. Check that tan θ = μ."],
    f: v => { const r = v.a * Math.PI / 180, g = 9.81, drive = g * Math.sin(r), fric = v.mu * g * Math.cos(r), slides = drive > fric + 1e-9, acc = slides ? drive - fric : 0;
      const x0 = 30, y0 = 150, L = 250, x1 = x0 + L * Math.cos(r), y1 = y0 - L * Math.sin(r), cx = x0 + 0.55 * L * Math.cos(r), cy = y0 - 0.55 * L * Math.sin(r);
      const nx = -Math.sin(r), ny = -Math.cos(r), bx = cx + nx * 13, by = cy + ny * 13;
      return { out: [[T("glir?", "slides?"), slides ? T("ja", "yes") : T("nei, står i ro", "no, stays put")], ["a", smN(acc) + " m/s²"], ["tan θ", smN(Math.tan(r))]], svg: `
        <polygon class="fg-fill" points="${x0},${y0} ${x1.toFixed(1)},${y0} ${x1.toFixed(1)},${y1.toFixed(1)}"/><polyline class="fg-line" points="${x0},${y0} ${x1.toFixed(1)},${y0} ${x1.toFixed(1)},${y1.toFixed(1)} ${x0},${y0}" fill="none"/>
        <rect class="${slides ? "fg-hot" : "fg-box"}" x="${bx - 16}" y="${by - 12}" width="32" height="24" rx="3" transform="rotate(${-v.a} ${bx.toFixed(1)} ${by.toFixed(1)})"/>
        ${fgAr(bx, by, bx, by + 50, "fg-red")}${fgT(bx + 6, by + 50, "G", "fg-i fg-redt", "start")}
        ${fgAr(bx, by, bx + nx * 48 * Math.cos(r), by + ny * 48 * Math.cos(r))}${fgT(bx + nx * 52, by + ny * 52, "N", "fg-i fg-acct")}
        ${v.mu > 0 ? fgAr(bx, by, bx + Math.cos(r) * 40 * Math.min(1, fric / Math.max(drive, 0.01)), by - Math.sin(r) * 40 * Math.min(1, fric / Math.max(drive, 0.01)), "fg-ok") + fgT(bx + Math.cos(r) * 44, by - Math.sin(r) * 44 - 6, "R", "fg-i fg-okt") : ""}` }; } },
  lever: { t: ["Moment og vippe", "Moment and a see-saw"], p: [["F1", "F₁", 10, 100, 5, 60, "N"], ["a1", "a₁", 0.2, 2, 0.1, 1, "m"], ["F2", "F₂", 10, 100, 5, 40, "N"], ["a2", "a₂", 0.2, 2, 0.1, 1.5, "m"]],
    q: ["Få vippa i balanse. Hva må være likt på begge sider?", "Balance the see-saw. What must be equal on both sides?"],
    f: v => { const M1 = v.F1 * v.a1, M2 = v.F2 * v.a2, tilt = Math.max(-14, Math.min(14, (M1 - M2) / 4)), r = tilt * Math.PI / 180, c = [160, 100], sc = 60;
      const P = d => [c[0] + d * sc * Math.cos(r), c[1] + d * sc * Math.sin(r)], A = P(-v.a1), B = P(v.a2), E1 = P(-2.2), E2 = P(2.2);
      return { out: [["M₁ = F₁a₁", smN(M1) + " Nm"], ["M₂ = F₂a₂", smN(M2) + " Nm"], ["ΣM", Math.abs(M1 - M2) < 0.01 ? T("0 – balanse!", "0 – balanced!") : smN(M1 - M2) + " Nm"]], svg: `
        <line class="fg-line" x1="${E1[0].toFixed(1)}" y1="${E1[1].toFixed(1)}" x2="${E2[0].toFixed(1)}" y2="${E2[1].toFixed(1)}" stroke-width="5"/>
        <polygon class="fg-fill" points="160,104 146,136 174,136"/><polygon class="fg-line" points="160,104 146,136 174,136" fill="none"/>${fgGround(160, 136, 60)}
        ${fgAr(A[0], A[1] - 12 - v.F1 * 0.5, A[0], A[1] - 4, "fg-red")}${fgT(A[0], A[1] - 18 - v.F1 * 0.5, "F₁", "fg-i fg-redt")}
        ${fgAr(B[0], B[1] - 12 - v.F2 * 0.5, B[0], B[1] - 4, "fg-red")}${fgT(B[0], B[1] - 18 - v.F2 * 0.5, "F₂", "fg-i fg-redt")}` }; } },
  beam: { t: ["Bjelke med punktlast", "Beam with a point load"], p: [["P", "P", 5, 50, 1, 20, "kN"], ["a", "a", 0.5, 5.5, 0.1, 2, "m"]],
    q: ["Hvor skal lasten stå for at momentet skal bli størst mulig?", "Where should the load be for the moment to be as large as possible?"],
    f: v => { const L = 6, b = L - v.a, RA = v.P * b / L, RB = v.P * v.a / L, M = v.P * v.a * b / L, X = x => 40 + x / L * 240, sc = 50 / 75;
      return { out: [["A = Pb/L", smN(RA) + " kN"], ["B = Pa/L", smN(RB) + " kN"], ["M_maks = Pab/L", smN(M) + " kNm"]], svg: `
        <rect class="fg-fill" x="40" y="40" width="240" height="10" rx="2"/><rect class="fg-line" x="40" y="40" width="240" height="10" rx="2" fill="none"/>
        <polygon class="fg-line" points="40,50 31,64 49,64" fill="none"/><circle class="fg-line" cx="280" cy="57" r="6" fill="none"/>
        ${fgAr(X(v.a), 6, X(v.a), 38, "fg-red")}${fgT(X(v.a) + 8, 18, smN(v.P, 0) + " kN", "fg-s fg-redt", "start")}
        ${fgAr(40, 72 + RA, 40, 66)}${fgAr(280, 72 + RB, 280, 66)}
        <line class="fg-mut" x1="40" y1="122" x2="280" y2="122"/><polygon class="fg-mfill" points="40,122 ${X(v.a).toFixed(1)},${(122 + M * sc).toFixed(1)} 280,122"/>
        <polyline class="fg-acc" points="40,122 ${X(v.a).toFixed(1)},${(122 + M * sc).toFixed(1)} 280,122" fill="none" stroke-width="2.2"/>${fgT(30, 126, "M", "fg-i", "end")}` }; } },
  hooke: { t: ["Spenning og tøyning i en stålstav", "Stress and strain in a steel bar"], p: [["F", "F", 1, 200, 1, 50, "kN"], ["d", "d", 5, 40, 1, 16, "mm"]],
    q: ["Finn diameteren der spenningen passerer flytegrensen 355 MPa for F = 100 kN.", "Find the diameter where the stress passes the 355 MPa yield strength for F = 100 kN."],
    f: v => { const A = Math.PI * v.d * v.d / 4, sig = v.F * 1000 / A, eps = sig / 210000, over = sig > 355, x = Math.min(sig, 500) / 500;
      return { out: [["A = πd²/4", smN(A) + " mm²"], ["σ = F/A", smN(sig) + " MPa"], ["ε = σ/E", smN(eps * 1000, 3) + " ‰"]], svg: `
        <rect class="${over ? "fg-hot" : "fg-fill"}" x="60" y="${80 - v.d * 0.8}" width="${150 + eps * 8000}" height="${v.d * 1.6}" rx="3"/>
        ${fgAr(60, 80, 26, 80, "fg-red")}${fgAr(210 + eps * 8000, 80, 250 + eps * 8000, 80, "fg-red")}
        <rect class="fg-box" x="40" y="140" width="240" height="12" rx="6"/><rect x="40" y="140" width="${(240 * x).toFixed(1)}" height="12" rx="6" fill="${over ? "var(--bad)" : "var(--ok)"}"/>
        <line class="fg-line" x1="${40 + 240 * 355 / 500}" y1="134" x2="${40 + 240 * 355 / 500}" y2="158"/>${fgT(40 + 240 * 355 / 500, 172, "f_y = 355", "fg-s")}
        ${over ? fgT(160, 30, T("Over flytegrensen!", "Above the yield strength!"), "fg-b fg-redt") : ""}` }; } },
  spring: { t: ["Masse–fjær-svingning", "Mass–spring oscillation"], p: [["m", "m", 0.5, 10, 0.5, 2, "kg"], ["k", "k", 50, 1000, 10, 200, "N/m"], ["z", "ζ", 0, 0.5, 0.02, 0.05, ""]],
    q: ["Firedobl massen. Hva skjer med perioden?", "Quadruple the mass. What happens to the period?"],
    f: v => { const wn = Math.sqrt(v.k / v.m), wd = wn * Math.sqrt(1 - v.z * v.z), T0 = 2 * Math.PI / wn;
      const g = smPlot([[t => Math.exp(-v.z * wn * t) * Math.cos(wd * t)], [t => Math.exp(-v.z * wn * t), "fg-mut", 1], [t => -Math.exp(-v.z * wn * t), "fg-mut", 1]], [0, 3], [-1.1, 1.1], "t (s)", "x");
      return { out: [["ω_n = √(k/m)", smN(wn) + " rad/s"], ["f_n", smN(wn / 2 / Math.PI) + " Hz"], ["T", smN(T0, 3) + " s"]], svg: g.svg }; } },
  resonance: { t: ["Resonans", "Resonance"], p: [["r", "ω/ω_n", 0.1, 3, 0.05, 0.8, ""], ["z", "ζ", 0.05, 1, 0.05, 0.1, ""]],
    q: ["Sett ω/ω_n = 1 og minsk dempingen. Hva skjer med utslaget?", "Set ω/ω_n = 1 and reduce the damping. What happens to the amplitude?"],
    f: v => { const Hf = r => 1 / Math.sqrt((1 - r * r) ** 2 + (2 * v.z * r) ** 2), H = Hf(v.r);
      const g = smPlot([[Hf]], [0, 3], [0, 6], "ω/ω_n", "X/X_st", (X, Y) => smDot(X(v.r), Y(Math.min(6, H))) + smLine(X(1), Y(0), X(1), Y(6), "fg-mut", "3 3"));
      return { out: [[T("forsterkning", "magnification"), smN(H)], [T("maks ved ζ", "peak at ζ"), smN(1 / (2 * v.z)) + T(" (ca.)", " (approx.)")]], svg: g.svg }; } },
  pressure: { t: ["Trykk i væske", "Pressure in a liquid"], p: [["h", ["dybde h", "depth h"], 0, 50, 1, 10, "m"], ["rho", "ρ", 700, 1300, 10, 1000, "kg/m³"]],
    q: ["Hvor dypt må du dykke i vann for at trykket skal bli dobbelt så stort som ved overflaten?", "How deep must you dive in water for the pressure to double compared with the surface?"],
    f: v => { const p = v.rho * 9.81 * v.h, pa = 101325 + p, y = 30 + v.h / 50 * 110;
      return { out: [["ρgh", smN(p / 1000) + " kPa"], [T("absolutt trykk", "absolute pressure"), smN(pa / 1000) + " kPa"], ["bar", smN(pa / 1e5)]], svg: `
        <rect class="fg-water" x="80" y="30" width="160" height="130" opacity=".6"/><line class="fg-line" x1="80" y1="30" x2="240" y2="30"/>
        <circle class="fg-box" cx="160" cy="${y.toFixed(1)}" r="9"/>
        ${[0, 1, 2, 3].map(i => { const a = i * Math.PI / 2, L = 10 + p / 12000; return fgAr(160 + Math.cos(a) * (10 + L + 4), y + Math.sin(a) * (10 + L + 4), 160 + Math.cos(a) * 11, y + Math.sin(a) * 11, "fg-red", 1.8); }).join("")}
        ${smLine(252, 30, 252, y, "fg-mut")}${fgT(258, (30 + y) / 2 + 4, "h = " + v.h + " m", "fg-s", "start")}` }; } },
  venturi: { t: ["Venturirør", "Venturi tube"], p: [["v1", "v₁", 0.5, 5, 0.1, 2, "m/s"], ["r", "d₂/d₁", 0.3, 1, 0.05, 0.5, ""]],
    q: ["Halver diameteren. Hvor mange ganger raskere går vannet?", "Halve the diameter. How many times faster does the water flow?"],
    f: v => { const v2 = v.v1 / (v.r * v.r), dp = 0.5 * 1000 * (v2 * v2 - v.v1 * v.v1), h1 = 38, h2 = h1 * v.r;
      return { out: [["v₂ = v₁(d₁/d₂)²", smN(v2) + " m/s"], ["Δp = ½ρ(v₂²−v₁²)", smN(dp / 1000) + " kPa"]], svg: `
        <path class="fg-water" opacity=".55" d="M20 ${80 - h1} L110 ${80 - h1} L150 ${80 - h2} L190 ${80 - h2} L230 ${80 - h1} L300 ${80 - h1} L300 ${80 + h1} L230 ${80 + h1} L190 ${80 + h2} L150 ${80 + h2} L110 ${80 + h1} L20 ${80 + h1}Z"/>
        <path class="fg-line" fill="none" d="M20 ${80 - h1} L110 ${80 - h1} L150 ${80 - h2} L190 ${80 - h2} L230 ${80 - h1} L300 ${80 - h1} M20 ${80 + h1} L110 ${80 + h1} L150 ${80 + h2} L190 ${80 + h2} L230 ${80 + h1} L300 ${80 + h1}"/>
        ${fgAr(40, 80, 40 + v.v1 * 10, 80, "fg-acc")}${fgAr(150, 80, 150 + Math.min(120, v2 * 10), 80, "fg-red")}
        ${fgT(55, 160, "v₁ = " + smN(v.v1), "fg-s")}${fgT(170, 160, "v₂ = " + smN(v2), "fg-s fg-redt")}` }; } },
  wall: { t: ["Varmetap gjennom en vegg", "Heat loss through a wall"], p: [["d", ["isolasjon d", "insulation d"], 50, 400, 10, 200, "mm"], ["lam", "λ", 0.02, 0.1, 0.005, 0.037, "W/mK"], ["dT", "ΔT", 5, 40, 1, 25, "K"]],
    q: ["Dobl isolasjonstykkelsen. Hvor mye går varmetapet ned?", "Double the insulation thickness. How much does the heat loss drop?"],
    f: v => { const U = v.lam / (v.d / 1000), q = U * v.dT, w = 20 + v.d / 400 * 110;
      return { out: [["U ≈ λ/d", smN(U, 3) + " W/m²K"], ["q = UΔT", smN(q) + " W/m²"], [T("per år (10 m², 5000 h)", "per year (10 m², 5000 h)"), smN(q * 10 * 5000 / 1000) + " kWh"]], svg: `
        <rect class="fg-hot" x="20" y="20" width="${140 - w / 2 - 20}" height="130" opacity=".6"/><rect class="fg-cold" x="${160 + w / 2}" y="20" width="${140 - w / 2}" height="130" opacity=".6"/>
        <rect x="${160 - w / 2}" y="20" width="${w}" height="130" fill="color-mix(in srgb,var(--gold) 45%,transparent)" stroke="var(--gold-deep)"/>
        ${fgT(60, 90, T("inne", "in"), "fg-b")}${fgT(270, 90, T("ute", "out"), "fg-b")}
        ${fgAr(160 - w / 2 - 20, 40, 160 + w / 2 + 12 + Math.min(40, q), 40, "fg-red", 1.5 + Math.min(4, q / 8))}${fgT(160, 172, "d = " + v.d + " mm", "fg-s")}` }; } },
  gas: { t: ["Idealgassloven", "The ideal gas law"], p: [["V", "V", 1, 10, 0.5, 5, "L"], ["T", "T", 200, 600, 10, 300, "K"], ["n", "n", 0.05, 1, 0.05, 0.2, "mol"]],
    q: ["Hold T fast og halver volumet. Hva skjer med trykket?", "Keep T fixed and halve the volume. What happens to the pressure?"],
    f: v => { const p = v.n * 8.314 * v.T / (v.V / 1000), w = 40 + v.V * 20;
      const dots = Array.from({ length: Math.round(v.n * 60) }, (_, i) => { const x = 62 + ((i * 73) % 100) / 100 * (w - 8), y = 50 + ((i * 37) % 100) / 100 * 86; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${v.T > 450 ? "var(--bad)" : "var(--accent)"}"/>`; }).join("");
      return { out: [["p = nRT/V", smN(p / 1000) + " kPa"], ["bar", smN(p / 1e5)]], svg: `
        <rect class="fg-box" x="56" y="44" width="${w}" height="100"/><rect class="fg-fill" x="${56 + w}" y="40" width="10" height="108"/>${fgAr(56 + w + 60, 94, 56 + w + 14, 94, "fg-red", 1.6 + Math.min(5, p / 150000))}${dots}` }; } },
  // ---------- matematikk ----------
  line: { t: ["Den lineære funksjonen", "The linear function"], p: [["a", "a", -3, 3, 0.25, 1, ""], ["b", "b", -5, 5, 0.5, 1, ""]],
    q: ["Hva skjer med grafen når a er negativ? Og når a = 0?", "What happens to the graph when a is negative? And when a = 0?"],
    f: v => { const g = smPlot([[x => v.a * x + v.b]], [-5, 5], [-8, 8], "x", "y", (X, Y) => smDot(X(0), Y(v.b)) + (v.a ? smLine(X(0), Y(v.b), X(1), Y(v.b), "fg-red") + smLine(X(1), Y(v.b), X(1), Y(v.a + v.b), "fg-red") + fgT(X(1) + 5, Y(v.b + v.a / 2) + 4, "a", "fg-i fg-redt", "start") : ""));
      return { out: [["y", `${smN(v.a)}x ${v.b < 0 ? "−" : "+"} ${smN(Math.abs(v.b))}`], [T("nullpunkt", "zero"), v.a ? "x = " + smN(-v.b / v.a) : "–"]], svg: g.svg }; } },
  tangent: { t: ["Den deriverte som stigningstall", "The derivative as a slope"], p: [["x", "x₀", -2.5, 2.5, 0.1, 1, ""]],
    q: ["Finn punktet der tangenten er vannrett. Hva er f′(x₀) der?", "Find the point where the tangent is horizontal. What is f′(x₀) there?"],
    f: v => { const f = x => x * x * x / 3 - x, d = x => x * x - 1, m = d(v.x), y0 = f(v.x);
      const g = smPlot([[f], [x => y0 + m * (x - v.x), "fg-red", 2]], [-3, 3], [-4, 4], "x", "y", (X, Y) => smDot(X(v.x), Y(y0)));
      return { out: [["f(x) = x³/3 − x", smN(y0)], ["f′(x₀) = x₀² − 1", smN(m)]], svg: g.svg }; } },
  riemann: { t: ["Integral som areal", "The integral as area"], p: [["n", ["antall søyler n", "number of bars n"], 1, 40, 1, 4, ""]],
    q: ["Øk n. Hva nærmer summen seg? (Svaret er 9.)", "Increase n. What does the sum approach? (The answer is 9.)"],
    f: v => { const f = x => x * x, a = 0, b = 3, h = (b - a) / v.n; let S = 0, bars = "";
      const g = smPlot([[f]], [0, 3.3], [0, 10], "x", "y", (X, Y) => { for(let i = 0; i < v.n; i++){ const x = a + i * h + h / 2, y = f(x); S += y * h; bars += `<rect class="fg-fill2" x="${X(a + i * h).toFixed(1)}" y="${Y(y).toFixed(1)}" width="${(X(h) - X(0)).toFixed(1)}" height="${(Y(0) - Y(y)).toFixed(1)}" stroke="var(--accent)" stroke-width=".6"/>`; } return bars; });
      return { out: [[T("sum av søyler", "sum of bars"), smN(S, 4)], ["∫₀³ x² dx", "9"], [T("feil", "error"), smN(9 - S, 4)]], svg: g.svg }; } },
  expo: { t: ["Eksponentiell vekst", "Exponential growth"], p: [["p", ["rente", "rate"], 1, 15, 0.5, 5, "%"], ["n", ["år", "years"], 1, 40, 1, 20, ""]],
    q: ["Hvor mange år tar det å doble beløpet med 7 % rente? (Tips: 72/7)", "How many years does it take to double the amount at 7 %? (Hint: 72/7)"],
    f: v => { const k = 1 + v.p / 100, K = 100000 * k ** v.n, top = Math.max(200000, K * 1.1);
      const g = smPlot([[x => 100000 * k ** x], [x => 100000 * (1 + v.p / 100 * x), "fg-mut", 1.4]], [0, 40], [0, top], T("år", "years"), "kr", (X, Y) => smDot(X(v.n), Y(K)));
      return { out: [[T("etter n år", "after n years"), nf(Math.round(K), 0) + " " + T("kr", "NOK")], [T("doblingstid", "doubling time"), smN(Math.log(2) / Math.log(k), 1) + " " + T("år", "years")]], svg: g.svg }; } },
  normal: { t: ["Normalfordelingen", "The normal distribution"], p: [["mu", "μ", -2, 2, 0.1, 0, ""], ["s", "σ", 0.4, 2, 0.1, 1, ""], ["k", ["± kσ", "± kσ"], 0.5, 3, 0.5, 1, ""]],
    q: ["Hvor stor andel ligger innenfor ±2σ? Og ±3σ?", "What share lies within ±2σ? And ±3σ?"],
    f: v => { const pdf = x => Math.exp(-((x - v.mu) ** 2) / (2 * v.s * v.s)) / (v.s * Math.sqrt(2 * Math.PI));
      const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
      const share = erf(v.k / Math.SQRT2);
      const g = smPlot([[pdf]], [-5, 5], [0, 1.05], "x", "f(x)", (X, Y) => `<path class="fg-fill2" d="${fgPath(s => [X(s), Y(pdf(s))], v.mu - v.k * v.s, v.mu + v.k * v.s, 50)} L${X(v.mu + v.k * v.s).toFixed(1)} ${Y(0)} L${X(v.mu - v.k * v.s).toFixed(1)} ${Y(0)}Z"/>`);
      return { out: [[T("andel innenfor", "share within"), smN(share * 100, 1) + " %"]], svg: g.svg }; } },
  vector: { t: ["Vektoraddisjon", "Vector addition"], p: [["a", "|a|", 1, 5, 0.5, 4, ""], ["th", "θ", 0, 180, 5, 60, "°"]],
    q: ["Hvilken vinkel gir den lengste summen? Og den korteste?", "Which angle gives the longest sum? And the shortest?"],
    f: v => { const r = v.th * Math.PI / 180, b = [3, 0], a = [v.a * Math.cos(r), v.a * Math.sin(r)], s = [a[0] + b[0], a[1] + b[1]], S = 26, O = [70, 140];
      const P = p => [O[0] + p[0] * S, O[1] - p[1] * S];
      return { out: [["|a + b|", smN(Math.hypot(s[0], s[1]))], ["a·b", smN(a[0] * b[0] + a[1] * b[1])]], svg:
        fgAr(...O, ...P(b), "fg-acc") + fgAr(...P(b), ...P(s), "fg-mutd", 1.8) + fgAr(...O, ...P(a), "fg-ok") + fgAr(...O, ...P(s), "fg-red", 2.6) +
        fgT(...P([1.5, -0.5]), "b", "fg-i fg-acct") + fgT(P(a)[0] - 8, P(a)[1], "a", "fg-i fg-okt", "end") + fgT(P(s)[0] + 8, P(s)[1], "a + b", "fg-i fg-redt", "start") }; } },
  combi: { t: ["Kombinasjoner og permutasjoner", "Combinations and permutations"], p: [["n", "n", 1, 20, 1, 10, ""], ["k", "k", 0, 20, 1, 3, ""]],
    q: ["Hvorfor er C(10, 3) = C(10, 7)?", "Why is C(10, 3) = C(10, 7)?"],
    f: v => { const k = Math.min(v.k, v.n), fact = m => { let r = 1; for(let i = 2; i <= m; i++) r *= i; return r; }, C = Math.round(fact(v.n) / fact(k) / fact(v.n - k)), P = Math.round(fact(v.n) / fact(v.n - k));
      return { out: [["C(n,k)", nf(C, 0)], ["P(n,k)", nf(P, 0)]], svg: Array.from({ length: v.n }, (_, i) => `<circle cx="${22 + (i % 10) * 30}" cy="${60 + Math.floor(i / 10) * 40}" r="12" class="${i < k ? "fg-bit1" : "fg-box"}"/>`).join("") +
        fgT(160, 160, T(`velg ${k} av ${v.n}`, `choose ${k} of ${v.n}`), "fg-s") }; } },
  earth: { t: ["Jordtrykk mot en mur", "Earth pressure on a wall"], p: [["phi", "φ", 20, 45, 1, 30, "°"], ["H", "H", 1, 8, 0.5, 4, "m"], ["g", "γ", 15, 22, 0.5, 18, "kN/m³"]],
    q: ["Hvor mye mindre blir kraften når φ går fra 25° til 40°?", "How much smaller does the force get when φ goes from 25° to 40°?"],
    f: v => { const sn = Math.sin(v.phi * Math.PI / 180), Ka = (1 - sn) / (1 + sn), Pa = 0.5 * Ka * v.g * v.H * v.H, h = v.H / 8 * 120, pmax = Ka * v.g * v.H, w = Math.min(120, pmax * 2.2);
      return { out: [["K_a", smN(Ka, 3)], ["K_p = 1/K_a", smN(1 / Ka, 3)], ["P_a = ½K_aγH²", smN(Pa) + " kN/m"]], svg: `
        <rect class="fg-fill" x="150" y="${150 - h}" width="150" height="${h}"/><line class="fg-line" x1="150" y1="150" x2="300" y2="150"/>
        <rect class="fg-box" x="132" y="${150 - h - 6}" width="18" height="${h + 6}"/>${fgGround(120, 156, 90)}
        <polygon points="150,${150 - h} 150,150 ${150 + w},150" fill="color-mix(in srgb,var(--bad) 22%,transparent)" stroke="var(--bad)" stroke-width="1.6"/>
        ${fgAr(150 + w / 2 + 40, 150 - h / 3, 152, 150 - h / 3, "fg-red", 2.4)}${fgT(150 + w / 2 + 44, 150 - h / 3 + 4, "P_a", "fg-i fg-redt", "start")}
        ${fgT(262, 150 - h + 16, T("jord", "soil"), "fg-s")}${fgT(141, 172, "H = " + smN(v.H) + " m", "fg-s")}` }; } },
  threshold: { t: ["Terskel, presisjon og gjenkalling", "Threshold, precision and recall"], p: [["th", ["terskel", "threshold"], 0.05, 0.95, 0.05, 0.5, ""]],
    q: ["Finn en terskel som gir gjenkalling over 0,9. Hva skjer med presisjonen?", "Find a threshold that gives recall above 0.9. What happens to the precision?"],
    f: v => { const neg = x => Math.exp(-((x - 0.35) ** 2) / (2 * 0.12 ** 2)), pos = x => 0.6 * Math.exp(-((x - 0.65) ** 2) / (2 * 0.12 ** 2));
      let TP = 0, FP = 0, FN = 0, TN = 0; for(let i = 0; i <= 200; i++){ const x = i / 200; if(x >= v.th){ TP += pos(x); FP += neg(x); } else { FN += pos(x); TN += neg(x); } }
      const P = TP / (TP + FP || 1), Rc = TP / (TP + FN || 1);
      const g = smPlot([[neg, "fg-mut", 2.2], [pos, "fg-acc", 2.4]], [0, 1], [0, 1.1], T("modellens sannsynlighet", "model probability"), "", (X, Y) =>
        `<rect x="${X(v.th).toFixed(1)}" y="${Y(1.1)}" width="${(X(1) - X(v.th)).toFixed(1)}" height="${Y(0) - Y(1.1)}" fill="color-mix(in srgb,var(--ok) 12%,transparent)"/>` + smLine(X(v.th), Y(0), X(v.th), Y(1.1), "fg-red") +
        fgT(X(0.35), Y(1.02), T("negative", "negatives"), "fg-s") + fgT(X(0.7), Y(0.7), T("positive", "positives"), "fg-s fg-acct") + fgT(X(v.th) + 4, Y(1.06), T("sier ja →", "says yes →"), "fg-s fg-okt", "start"));
      return { out: [[T("presisjon", "precision"), smN(P, 3)], [T("gjenkalling", "recall"), smN(Rc, 3)], ["F1", smN(2 * P * Rc / (P + Rc || 1), 3)]], svg: g.svg }; } },
  pctrl: { t: ["P-regulator på et førsteordens system", "P-controller on a first-order system"], p: [["K", "K_p", 0.5, 20, 0.5, 2, ""], ["tau", "τ", 0.5, 5, 0.5, 2, "s"]],
    q: ["Øk K_p. Blir det stasjonære avviket noen gang null?", "Increase K_p. Does the steady-state error ever become zero?"],
    f: v => { const ys = v.K / (1 + v.K), tc = v.tau / (1 + v.K);
      const g = smPlot([[t => ys * (1 - Math.exp(-t / tc))], [t => 1, "fg-mut", 1.2]], [0, 10], [0, 1.2], "t (s)", "y", (X, Y) => smLine(X(9.5), Y(ys), X(9.5), Y(1), "fg-red") + fgT(X(9.5) - 5, Y((1 + ys) / 2) + 4, "e", "fg-i fg-redt", "end"));
      return { out: [[T("stasjonært", "steady state"), smN(ys, 3)], [T("avvik e", "error e"), smN(1 - ys, 3)], [T("tidskonstant", "time constant"), smN(tc, 3) + " s"]], svg: g.svg }; } }
};
// Kobling enhet → simulering (vises etter figuren eller «Begreper og formler»).
const SIM_MAP = {
  "ELPE1300:0": "ohm", "GFYS:5": "ohm", "ELPE1300:1": "rc", "ELFT2400:3": "rc", "ELPE1300:2": "sine", "ELEK:2": "lowpass",
  "ELKR:0": "trafo", "ELKR:1": "motor", "ELFT2500:0": "bits", "DBNET:1": "subnet",
  "GFYS:1": "projectile", "MAPE1300:2": "projectile", "GFYS:2": "incline", "MAPE1300:1": "incline", "MAPE1300:0": "lever",
  "MAPE1300:3": "beam", "FAST:1": "beam", "FAST:0": "hooke", "MATS1500:1": "hooke", "SVING:0": "spring", "SVING:1": "spring", "MEK1400:0": "spring", "SVING:2": "resonance",
  "FLUID:0": "pressure", "GFYS:4": "pressure", "FLUID:1": "venturi", "VARME:0": "wall", "BYGG:1": "wall", "KJEMI:3": "gas",
  "GMAT:3": "line", "MEK1000:0": "tangent", "GMAT:7": "tangent", "MEK1000:3": "tangent", "MEK1000:1": "riemann", "GMAT:4": "expo", "OKON:0": "expo",
  "MEK2200:1": "normal", "GEO:1": "pressure", "GEO:2": "earth", "ML:1": "line", "ML:2": "threshold", "GMAT:6": "vector", "DISK:1": "combi", "ELFT2400:1": "pctrl"
};
function withSims(code, u, src){
  const name = SIM_MAP[code + ":" + u]; if(!name || src.includes("![sim:")) return src;
  const lines = src.split("\n"); let i = lines.findIndex(l => /^!\[fig:/.test(l.trim()));
  if(i < 0){ const h = lines.findIndex(l => /^##\s+(Begreper og formler|Concepts and formulas)/.test(l.trim()));
    if(h >= 0){ i = lines.findIndex((l, k) => k > h && /^##\s/.test(l.trim())) - 1; if(i < 0) i = lines.length - 1; } }
  if(i < 0) return src + "\n\n![sim:" + name + "]";
  lines.splice(i + 1, 0, "", "![sim:" + name + "]", "");
  return lines.join("\n");
}
function simVals(name, el){
  const S0 = SIMS[name], v = {};
  for(const p of S0.p){ const inp = el && el.querySelector(`input[data-k="${p[0]}"]`); v[p[0]] = inp ? +inp.value : p[5]; }
  return v;
}
function simOutHTML(r){ return r.out.map(([k, x]) => `<div><small>${esc(k)}</small><b>${esc(x)}</b></div>`).join(""); }
function simHTML(name){
  const S0 = SIMS[name]; if(!S0) return "";
  let r; try{ r = S0.f(simVals(name)); }catch(e){ return ""; }
  const unit = p => p[6] ? " " + p[6] : "", lbl = p => Array.isArray(p[1]) ? T(p[1][0], p[1][1]) : p[1];
  return `<div class="sim fig" data-sim="${name}"><div class="sim-h"><span class="sim-tag">${I.bolt}${esc(t("simTry"))}</span><b>${esc(T(S0.t[0], S0.t[1]))}</b></div>
    <svg class="sim-svg" viewBox="0 0 320 180" role="img" aria-label="${esc(T(S0.t[0], S0.t[1]))}">${r.svg}</svg>
    <div class="sim-out">${simOutHTML(r)}</div>
    <div class="sim-ctl">${S0.p.map(p => `<label><span class="sim-l">${esc(lbl(p))}</span><input type="range" min="${p[2]}" max="${p[3]}" step="${p[4]}" value="${p[5]}" data-k="${p[0]}" aria-label="${esc(lbl(p))}"><output>${esc(nf(p[5], 2) + unit(p))}</output></label>`).join("")}</div>
    ${S0.q ? `<p class="sim-q"><b>${esc(t("simQ"))}</b> ${esc(T(S0.q[0], S0.q[1]))}</p>` : ""}</div>`;
}
function simUpdate(el){
  const name = el.dataset.sim, S0 = SIMS[name]; if(!S0) return;
  const v = simVals(name, el); let r; try{ r = S0.f(v); }catch(e){ return; }
  el.querySelector(".sim-svg").innerHTML = r.svg; el.querySelector(".sim-out").innerHTML = simOutHTML(r);
  el.querySelectorAll(".sim-ctl label").forEach((lb, i) => { const p = S0.p[i]; lb.querySelector("output").textContent = nf(v[p[0]], 2) + (p[6] ? " " + p[6] : ""); });
  if(!el.dataset.played){ el.dataset.played = 1; S.stats ||= {}; S.stats.sims = (+S.stats.sims || 0) + 1; }
}
document.addEventListener("input", e => { const el = e.target.closest && e.target.closest(".sim"); if(el) simUpdate(el); });
