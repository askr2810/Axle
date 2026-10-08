// ============================================================
//  REGULERINGSLABEN – se sammenhengen mellom uttrykket G(s), polene/nullpunktene i s-planet og sprangresponsen.
//  Modus «poles»: dra polene (×) og nullpunktet (○) i s-planet. Tidskonstant, dempning, oversving og innsvingningstid
//  regnes ut og vises rett på grafen. Modus «pid»: velg en prosess og skru på Kp, Ki og Kd – se de lukkede polene flytte seg
//  og responsen endre seg. Brukes i teorien (![ctl:poles], ![ctl:pid]) og som egen lab (#/regulering).
//  All regning er ekte: tilstandsrom + RK4 for responsen, Durand–Kerner for røttene.
// ============================================================
const CT_ST = {}; let ctSeq = 0;
const CT_C = { pole: "#D9483B", zero: "#2B6FD6", resp: "#2B6FD6", ref: "#5A6772", ok: "#1E9A5E", warn: "#E07B00" };
// ---------- polynomer (koeffisienter fra høyeste grad) og komplekse tall ----------
const cpMul = (a, b) => { const r = new Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => r[i + j] += x * y)); return r; };
const cpAdd = (a, b) => { const n = Math.max(a.length, b.length), r = new Array(n).fill(0); a.forEach((x, i) => r[n - a.length + i] += x); b.forEach((x, i) => r[n - b.length + i] += x); return r; };
const cxMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cxDiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1] || 1e-300; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
function cpRoots(p){ // Durand–Kerner, p = [a_n … a_0]
  while(p.length > 1 && Math.abs(p[0]) < 1e-12) p = p.slice(1);
  const n = p.length - 1; if(n < 1) return [];
  const a = p.map(x => x / p[0]);
  let z = Array.from({ length: n }, (_, k) => { const r = 1 + Math.max(...a.slice(1).map(Math.abs)), t = 2 * Math.PI * k / n + 0.4; return [r * Math.cos(t) * 0.7, r * Math.sin(t) * 0.7]; });
  const ev = x => a.reduce((acc, c) => { const m = cxMul(acc, x); return [m[0] + c, m[1]]; }, [0, 0]);
  for(let it = 0; it < 300; it++){
    let moved = 0;
    z = z.map((zi, i) => { let den = [1, 0]; z.forEach((zj, j) => { if(i !== j) den = cxMul(den, [zi[0] - zj[0], zi[1] - zj[1]]); });
      const d = cxDiv(ev(zi), den); moved = Math.max(moved, Math.abs(d[0]) + Math.abs(d[1])); return [zi[0] - d[0], zi[1] - d[1]]; });
    if(moved < 1e-12) break;
  }
  return z.map(r => [Math.abs(r[0]) < 1e-9 ? 0 : r[0], Math.abs(r[1]) < 1e-7 ? 0 : r[1]]);
}
// Sprangrespons for G(s) = N(s)/D(s) (strengt egentlig), regulerbar kanonisk form + RK4.
function ctStep(N, D, T, steps = 1500){
  const a = D.map(x => x / D[0]), n = a.length - 1; N = N.map(x => x / D[0]);
  const b = new Array(n).fill(0); N.slice().reverse().forEach((x, i) => { if(i < n) b[i] = x; }); // b[0] = konstantledd
  const f = x => { const dx = x.slice(1); let last = 1; for(let i = 0; i < n; i++) last -= a[n - i] * x[i]; dx.push(last); return dx; };
  let x = new Array(n).fill(0); const dt = T / steps, out = [];
  for(let k = 0; k <= steps; k++){
    out.push(b.reduce((s, bi, i) => s + bi * x[i], 0));
    const k1 = f(x), k2 = f(x.map((v, i) => v + dt / 2 * k1[i])), k3 = f(x.map((v, i) => v + dt / 2 * k2[i])), k4 = f(x.map((v, i) => v + dt * k3[i]));
    x = x.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    if(!x.every(Number.isFinite)) { while(out.length <= steps) out.push(NaN); break; }
  }
  return out;
}
// Nøkkeltall fra en respons y (tidssteg dt), sluttverdi yf
function ctMetrics(y, dt, yf){
  const ok = y.every(Number.isFinite) && Number.isFinite(yf) && Math.abs(yf) > 1e-9;
  if(!ok) return {};
  const t10 = y.findIndex(v => v / yf >= 0.1), t90 = y.findIndex(v => v / yf >= 0.9), t63 = y.findIndex(v => v / yf >= 0.632);
  const peak = Math.max(...y.map(v => v / yf)), ipk = y.findIndex(v => v / yf === peak);
  let ts = null; for(let i = y.length - 1; i >= 0; i--) if(Math.abs(y[i] / yf - 1) > 0.02){ ts = (i + 1) * dt; break; }
  const settled = ts != null && ts < (y.length - 1) * dt * 0.97;
  return { tr: t10 >= 0 && t90 >= 0 ? (t90 - t10) * dt : null, t63: t63 >= 0 ? t63 * dt : null, os: Math.max(0, (peak - 1) * 100), tpk: ipk * dt, ts: settled ? ts : null };
}
// ---------- modell for «poles» ----------
const CT_PRE = {
  first: { nb: "1. orden", en: "1st order", p: [[-1.5, 0]], z: null },
  second: { nb: "2. orden (svinger)", en: "2nd order (oscillates)", p: [[-1, 2.4]], z: null },
  zero: { nb: "Med nullpunkt", en: "With a zero", p: [[-1.2, 1.2]], z: -2 },
  slow: { nb: "To reelle poler", en: "Two real poles", p: [[-0.6, 0], [-3, 0]], z: null },
  unst: { nb: "Ustabil", en: "Unstable", p: [[0.3, 1.8]], z: null }
};
function ctPolesOf(st){ // liste av komplekse poler (komplekse kommer i par)
  const out = []; for(const [s, w] of st.p){ if(Math.abs(w) < 1e-9) out.push([s, 0]); else { out.push([s, Math.abs(w)]); out.push([s, -Math.abs(w)]); } } return out;
}
function ctModel(st){
  const poles = ctPolesOf(st);
  let D = [1]; for(const [s, w] of st.p){ if(Math.abs(w) < 1e-9) D = cpMul(D, [1, -s]); else D = cpMul(D, [1, -2 * s, s * s + w * w]); }
  let N = [1]; if(st.z != null && poles.length >= 2) N = [1, -st.z];
  // forsterkning K slik at G(0) = 1 (bare når det gir mening)
  const D0 = D[D.length - 1], N0 = N[N.length - 1], K = Math.abs(N0) > 1e-6 && Math.abs(D0) > 1e-9 ? D0 / N0 : 1;
  const stable = poles.every(p => p[0] < -1e-9), slow = Math.max(...poles.map(p => p[0]));
  const T = stable ? Math.min(20, Math.max(2.5, 6 / Math.abs(slow))) : 6;
  const y = ctStep(N.map(x => x * K), D, T);
  return { poles, D, N, K, stable, T, y, yf: stable ? 1 : NaN, m: stable ? ctMetrics(y, T / (y.length - 1), 1) : {} };
}
// ---------- modell for «pid» ----------
const CT_PLANT = {
  p1: { nb: "1. orden: 1/(s+1)", en: "1st order: 1/(s+1)", N: [1], D: [1, 1], tex: "\\frac{1}{s+1}" },
  p2: { nb: "2. orden: 2/((s+1)(s+2))", en: "2nd order: 2/((s+1)(s+2))", N: [2], D: [1, 3, 2], tex: "\\frac{2}{(s+1)(s+2)}" },
  p3: { nb: "Treg: 1/(s+1)³", en: "Sluggish: 1/(s+1)³", N: [1], D: [1, 3, 3, 1], tex: "\\frac{1}{(s+1)^3}" }
};
function ctPid(st){
  const P = CT_PLANT[st.plant], a = P.D.map(x => x / P.D[0]), Nn = P.N.map(x => x / P.D[0]), n = a.length - 1;
  const b = new Array(n).fill(0); Nn.slice().reverse().forEach((x, i) => { if(i < n) b[i] = x; });
  const Tend = 10, steps = 5000, dt = Tend / steps, Tf = 0.05;
  let x = new Array(n).fill(0), I = 0, dF = 0, yPrev = 0; const y = [], u = [];
  for(let k = 0; k <= steps; k++){
    const yk = b.reduce((s, bi, i) => s + bi * x[i], 0), e = 1 - yk;
    // D-ledd på målingen (ingen spark ved sprang), filtrert med Tf
    dF += dt / Tf * ((-(yk - yPrev) / dt) - dF); yPrev = yk;
    const uk = Math.max(-50, Math.min(50, st.Kp * e + st.Ki * I + st.Kd * (k ? dF : 0)));
    y.push(yk); u.push(uk);
    I += e * dt;
    const dx = x.slice(1); let last = uk; for(let i = 0; i < n; i++) last -= a[n - i] * x[i]; dx.push(last);
    x = x.map((v, i) => v + dt * dx[i]);
    if(!x.every(Number.isFinite) || Math.abs(yk) > 1e6){ while(y.length <= steps) y.push(NaN); break; }
  }
  // lukkede poler: s·D + (Kd s² + Kp s + Ki)·N   (uten I-ledd faller faktoren s bort)
  const C = st.Ki > 0 ? [st.Kd, st.Kp, st.Ki] : [st.Kd, st.Kp], char = cpAdd(st.Ki > 0 ? cpMul([1, 0], P.D) : P.D, cpMul(C, P.N));
  const poles = cpRoots(char.slice()), stable = poles.every(p => p[0] < -1e-6);
  const yf = stable ? (st.Ki > 0 ? 1 : (st.Kp * P.N[P.N.length - 1]) / (P.D[P.D.length - 1] + st.Kp * P.N[P.N.length - 1])) : NaN;
  return { P, T: Tend, y, u, poles, stable, yf, ess: stable ? 1 - yf : NaN, m: stable ? ctMetrics(y, dt, yf) : {} };
}
// ---------- tegning ----------
const CT_S = { x0: 22, x1: 338, y0: 10, y1: 180, smin: -8, smax: 3, wmax: 5 };
const ctSX = s => CT_S.x0 + (s - CT_S.smin) / (CT_S.smax - CT_S.smin) * (CT_S.x1 - CT_S.x0);
const ctWY = w => (CT_S.y0 + CT_S.y1) / 2 - w / CT_S.wmax * (CT_S.y1 - CT_S.y0) / 2;
const cf1 = x => x.toFixed(1);
function ctPlaneSVG(st, poles, zeros, drag){
  const { x0, x1, y0, y1 } = CT_S, X0 = ctSX(0), Y0 = ctWY(0);
  let s = `<rect x="${x0}" y="${y0}" width="${cf1(X0 - x0)}" height="${y1 - y0}" class="ct-lhp"/><rect x="${cf1(X0)}" y="${y0}" width="${cf1(x1 - X0)}" height="${y1 - y0}" class="ct-rhp"/>`;
  for(let k = Math.ceil(CT_S.smin); k <= CT_S.smax; k++) if(k) s += `<path d="M${cf1(ctSX(k))} ${y0}V${y1}" class="ct-grid"/><text x="${cf1(ctSX(k))}" y="${cf1(Y0 + 12)}" class="ct-tl">${k}</text>`;
  for(let k = -4; k <= 4; k += 2) if(k) s += `<path d="M${x0} ${cf1(ctWY(k))}H${x1}" class="ct-grid"/><text x="${cf1(X0 - 4)}" y="${cf1(ctWY(k) + 3)}" class="ct-tl" text-anchor="end">${k}j</text>`;
  s += `<path d="M${x0} ${cf1(Y0)}H${x1}M${cf1(X0)} ${y0}V${y1}" class="ct-ax"/><text x="${x1 - 2}" y="${cf1(Y0 - 5)}" class="ct-al" text-anchor="end">Re</text><text x="${cf1(X0 + 5)}" y="${y0 + 10}" class="ct-al">Im</text>`;
  s += `<text x="${x0 + 6}" y="${y1 - 6}" class="ct-zone ok">${esc(T("stabilt", "stable"))}</text><text x="${x1 - 6}" y="${y1 - 6}" class="ct-zone bad" text-anchor="end">${esc(T("ustabilt", "unstable"))}</text>`;
  // hjelpelinjer for et kompleks polpar: ωn (avstand til origo) og dempning ζ (vinkel)
  const cp = poles.find(p => p[1] > 1e-6);
  if(cp){ const r = Math.hypot(cp[0], cp[1]); s += `<path d="M${cf1(X0)} ${cf1(Y0)}L${cf1(ctSX(cp[0]))} ${cf1(ctWY(cp[1]))}" class="ct-guide"/><path d="M${cf1(ctSX(cp[0]))} ${cf1(Y0)}V${cf1(ctWY(cp[1]))}" class="ct-guide"/>`;
    if(cp[0] < 0) s += `<text x="${cf1((X0 + ctSX(cp[0])) / 2 - 4)}" y="${cf1((Y0 + ctWY(cp[1])) / 2 - 4)}" class="ct-gl" text-anchor="end">ωₙ=${nf(r, 2)}</text>`; }
  for(const z of zeros) s += `<circle cx="${cf1(ctSX(z))}" cy="${cf1(Y0)}" r="7" class="ct-zero" style="stroke:${CT_C.zero}"/>`;
  for(const p of poles){ const x = ctSX(Math.max(CT_S.smin, Math.min(CT_S.smax, p[0]))), y = ctWY(Math.max(-CT_S.wmax, Math.min(CT_S.wmax, p[1]))); s += `<path d="M${cf1(x - 6)} ${cf1(y - 6)}l12 12m0 -12l-12 12" class="ct-pole" style="stroke:${CT_C.pole}"/>`; }
  // dra-håndtak (bare i «poles»)
  if(drag) s += drag;
  return s;
}
function ctRespSVG(y, Tm, yf, m, ref, extra){
  const L = 34, R = 346, Tp = 10, B = 150, fin = y.filter(Number.isFinite);
  let ymin = Math.min(0, ...fin), ymax = Math.max(1.2, ...fin, Number.isFinite(yf) ? yf * 1.1 : 0); ymax = Math.min(ymax, 3); ymin = Math.max(ymin, -1.5);
  const X = t => L + t / Tm * (R - L), Y = v => B - (v - ymin) / (ymax - ymin) * (B - Tp), clip = v => Math.max(Tp - 4, Math.min(B + 4, Y(v)));
  let s = `<clipPath id="ctc${++ctSeq}"><rect x="${L}" y="${Tp - 2}" width="${R - L}" height="${B - Tp + 4}"/></clipPath>`;
  const yStep = ymax - ymin > 2.5 ? 1 : 0.5;
  for(let v = Math.ceil(ymin / yStep) * yStep; v <= ymax + 1e-9; v += yStep) s += `<path d="M${L} ${cf1(Y(v))}H${R}" class="ct-grid"/><text x="${L - 4}" y="${cf1(Y(v) + 3)}" class="ct-tl" text-anchor="end">${nf(v, 1)}</text>`;
  const tStep = Tm <= 5 ? 1 : Tm <= 12 ? 2 : 5;
  for(let t = 0; t <= Tm + 1e-9; t += tStep) s += `<text x="${cf1(X(t))}" y="${B + 13}" class="ct-tl">${nf(t, 0)}</text>`;
  s += `<text x="${R}" y="${B + 24}" class="ct-al" text-anchor="end">t (s)</text><path d="M${L} ${cf1(Y(0))}H${R}M${L} ${Tp}V${B}" class="ct-ax"/>`;
  if(ref != null) s += `<path d="M${L} ${cf1(Y(ref))}H${R}" class="ct-ref"/><text x="${R - 2}" y="${cf1(Y(ref) - 4)}" class="ct-gl" text-anchor="end">${esc(T("ønsket verdi", "setpoint"))}</text>`;
  if(Number.isFinite(yf)){
    s += `<rect x="${L}" y="${cf1(Y(yf * 1.02))}" width="${R - L}" height="${cf1(Math.max(1, Y(yf * 0.98) - Y(yf * 1.02)))}" class="ct-band"/><path d="M${L} ${cf1(Y(yf))}H${R}" class="ct-fin"/>`;
    if(m.t63 != null && m.os < 1) s += `<path d="M${cf1(X(m.t63))} ${cf1(Y(0))}V${cf1(Y(0.632 * yf))}H${L}" class="ct-guide"/><circle cx="${cf1(X(m.t63))}" cy="${cf1(Y(0.632 * yf))}" r="3.5" fill="${CT_C.warn}"/><text x="${cf1(X(m.t63) + 5)}" y="${cf1(Y(0.632 * yf) + 12)}" class="ct-gl" style="fill:${CT_C.warn}">τ = ${nf(m.t63, 2)} s (63 %)</text>`;
    if(m.os >= 1) s += `<circle cx="${cf1(X(m.tpk))}" cy="${cf1(Y(yf * (1 + m.os / 100)))}" r="3.5" fill="${CT_C.pole}"/><text x="${cf1(X(m.tpk) + 5)}" y="${cf1(Y(yf * (1 + m.os / 100)) - 4)}" class="ct-gl" style="fill:${CT_C.pole}">${esc(T("oversving", "overshoot"))} ${nf(m.os, 0)} %</text>`;
    if(m.ts != null) s += `<path d="M${cf1(X(m.ts))} ${Tp}V${B}" class="ct-ts"/><text x="${cf1(X(m.ts) + 3)}" y="${B - 5}" class="ct-gl" style="fill:${CT_C.ok}">tₛ ${nf(m.ts, 1)} s</text>`;
  }
  s += `<path d="${y.map((v, i) => Number.isFinite(v) ? (i ? "L" : "M") + cf1(X(i / (y.length - 1) * Tm)) + " " + cf1(clip(v)) : "").join("")}" class="ct-resp" clip-path="url(#ctc${ctSeq})"/>`;
  return s + (extra || "");
}
// ---------- forklaring (enkelt først) ----------
function ctExplain(st, M){
  const B = (c, x) => `<b style="color:${c}">${x}</b>`;
  if(st.mode === "pid"){
    const k = [];
    if(!M.stable) k.push(`⚠️ ${esc(T("En lukket pol ligger i høyre halvplan – systemet er ustabilt. Skru ned Kp eller Ki, eller øk Kd.", "A closed-loop pole is in the right half-plane – the system is unstable. Lower Kp or Ki, or increase Kd."))}`);
    else {
      k.push(st.Ki > 0 ? `✅ ${esc(T("I-leddet summerer opp avviket over tid, så utgangen havner nøyaktig på ønsket verdi (stasjonært avvik 0).", "The I-term adds up the error over time, so the output ends exactly at the setpoint (zero steady-state error)."))}`
        : `📏 ${esc(T("Bare P: det blir et stasjonært avvik på", "P only: there is a steady-state error of"))} ${B(CT_C.warn, nf(M.ess * 100, 0) + " %")}. ${esc(T("Større Kp gjør det mindre, men gir mer svinging. Et I-ledd fjerner det helt.", "A larger Kp makes it smaller but causes more oscillation. An I-term removes it completely."))}`);
      if(M.m.os > 5) k.push(`〰️ ${esc(T("Oversving", "Overshoot"))} ${B(CT_C.pole, nf(M.m.os, 0) + " %")}: ${esc(T("de lukkede polene har stor imaginærdel. Øk Kd for å dempe, eller senk Kp/Ki.", "the closed-loop poles have a large imaginary part. Increase Kd to damp it, or lower Kp/Ki."))}`);
      if(M.m.ts != null) k.push(`⏱ ${esc(T("Innsvingningstid", "Settling time"))} ${B(CT_C.ok, nf(M.m.ts, 1) + " s")} – ${esc(T("jo lenger til venstre den tregeste polen ligger, jo raskere.", "the further left the slowest pole is, the faster."))}`);
    }
    return k.map(x => `<p>${x}</p>`).join("");
  }
  const cp = M.poles.find(p => p[1] > 1e-6), real = M.poles.filter(p => Math.abs(p[1]) < 1e-6);
  const out = [];
  if(!M.stable) out.push(`⚠️ ${esc(T("En pol ligger i høyre halvplan (positiv realdel). Da vokser responsen uten grense – systemet er ustabilt. Dra polen til venstre for den loddrette aksen.", "A pole is in the right half-plane (positive real part). The response then grows without bound – the system is unstable. Drag the pole left of the vertical axis."))}`);
  else if(cp){ const wn = Math.hypot(cp[0], cp[1]), z = -cp[0] / wn;
    out.push(`〰️ ${esc(T("Polparet", "The pole pair"))} ${B(CT_C.pole, `${nf(cp[0], 1)} ± ${nf(cp[1], 1)}j`)}: ${esc(T("høyden (imaginærdelen) gir hvor fort det svinger, avstanden til venstre (realdelen) gir hvor fort svingningene dør ut.", "the height (imaginary part) sets how fast it oscillates, the distance to the left (real part) sets how fast the oscillations die out."))}`);
    out.push(`📐 ${esc(T("Dempning", "Damping"))} ζ = ${B(CT_C.warn, nf(z, 2))}, ${esc(T("egenfrekvens", "natural frequency"))} ωₙ = ${nf(wn, 2)} rad/s → ${esc(T("oversving", "overshoot"))} ${B(CT_C.pole, nf(M.m.os || 0, 0) + " %")}. ${esc(T("Lav ζ (polene nær den loddrette aksen) = mye svinging.", "Low ζ (poles close to the vertical axis) = lots of oscillation."))}`);
  } else if(real.length === 1){ const tau = -1 / real[0][0];
    out.push(`⏱ ${esc(T("Polen ligger i", "The pole is at"))} s = ${B(CT_C.pole, nf(real[0][0], 2))}. ${esc(T("Tidskonstanten er", "The time constant is"))} τ = 1/${nf(-real[0][0], 2)} = ${B(CT_C.warn, nf(tau, 2) + " s")}: ${esc(T("etter én tidskonstant har responsen nådd 63 % av sluttverdien, etter fire er den nesten fremme.", "after one time constant the response has reached 63 % of its final value, after four it is almost there."))}`);
    out.push(`👉 ${esc(T("Dra polen mot venstre – se responsen bli raskere.", "Drag the pole to the left – watch the response get faster."))}`);
  } else { const slow = Math.max(...real.map(p => p[0]));
    out.push(`🐢 ${esc(T("To reelle poler gir ingen svinging. Den tregeste polen (nærmest aksen, s =", "Two real poles give no oscillation. The slowest pole (closest to the axis, s ="))} ${B(CT_C.pole, nf(slow, 2))}) ${esc(T("bestemmer nesten alene hvor fort systemet er – den kalles den dominerende polen.", "decides almost alone how fast the system is – it is called the dominant pole."))}`); }
  if(st.z != null && M.poles.length >= 2) out.push(st.z > 0 ? `↩️ ${esc(T("Nullpunktet ligger i høyre halvplan: responsen starter i feil retning før den snur (invers respons).", "The zero is in the right half-plane: the response starts in the wrong direction before turning (inverse response)."))}`
    : `🔵 ${esc(T("Nullpunktet påvirker bare formen: jo nærmere polene det ligger, jo raskere start og mer oversving. Det endrer ikke stabiliteten.", "The zero only affects the shape: the closer it is to the poles, the faster the start and the more overshoot. It does not change stability."))}`);
  return out.map(x => `<p>${x}</p>`).join("");
}
function ctTex(st, M){
  const n2 = x => mf(x, 2);
  if(st.mode === "pid"){ const terms = [st.Kp ? mf(st.Kp, 1) : "", st.Ki ? `\\frac{${n2(st.Ki)}}{s}` : "", st.Kd ? `${n2(st.Kd)}\\,s` : ""].filter(Boolean);
    return `G(s) = ${M.P.tex},\\quad C(s) = ${terms.join(" + ") || "0"}`; }
  const fac = ([s, w]) => Math.abs(w) < 1e-9 ? `(s ${s <= 0 ? "+" : "-"} ${n2(Math.abs(s))})` : `(s^2 ${s <= 0 ? "+" : "-"} ${n2(Math.abs(2 * s))}s + ${n2(s * s + w * w)})`;
  const num = st.z != null && M.poles.length >= 2 ? `${n2(M.K)}\\,(s ${st.z <= 0 ? "+" : "-"} ${n2(Math.abs(st.z))})` : n2(M.K);
  return `G(s) = \\frac{${num}}{${st.p.map(fac).join("")}}`;
}
function ctInner(st){
  const M = st.mode === "pid" ? ctPid(st) : ctModel(st);
  const zeros = st.mode === "poles" && st.z != null && M.poles.length >= 2 ? [st.z] : [];
  const handles = st.mode === "poles" ? st.p.map((p, i) => `<circle cx="${cf1(ctSX(p[0]))}" cy="${cf1(ctWY(p[1]))}" r="16" class="ct-h" data-cth="p${i}"/>`).join("") + zeros.map(z => `<circle cx="${cf1(ctSX(z))}" cy="${cf1(ctWY(0))}" r="16" class="ct-h" data-cth="z"/>`).join("") : "";
  const chips = st.mode === "pid"
    ? [[T("stasjonært avvik", "steady-state error"), Number.isFinite(M.ess) ? nf(Math.abs(M.ess) * 100, 0) + " %" : "–"], [T("oversving", "overshoot"), M.m.os != null ? nf(M.m.os, 0) + " %" : "–"], [T("stigetid", "rise time"), M.m.tr != null ? nf(M.m.tr, 2) + " s" : "–"], [T("innsvingning", "settling"), M.m.ts != null ? nf(M.m.ts, 1) + " s" : "–"]]
    : [[T("sluttverdi", "final value"), M.stable ? "1" : "∞"], [T("stigetid", "rise time"), M.m.tr != null ? nf(M.m.tr, 2) + " s" : "–"], [T("oversving", "overshoot"), M.m.os != null ? nf(M.m.os, 0) + " %" : "–"], [T("innsvingning", "settling"), M.m.ts != null ? nf(M.m.ts, 1) + " s" : "–"]];
  const ctl = st.mode === "pid"
    ? `<div class="ct-pre">${Object.entries(CT_PLANT).map(([k, P]) => `<button data-ct="plant" data-k="${k}" class="${st.plant === k ? "on" : ""}">${esc(T(P.nb, P.en))}</button>`).join("")}</div>
       <div class="ct-sl">${[["Kp", 0, 20, 0.5, "#D9483B", T("P: reagerer på avviket nå", "P: reacts to the error now")], ["Ki", 0, 10, 0.25, "#1E9A5E", T("I: summerer avviket over tid", "I: adds up the error over time")], ["Kd", 0, 5, 0.1, "#7B4FD6", T("D: bremser når det går fort", "D: brakes when things move fast")]].map(([k, a, b, sp, c, d]) =>
         `<label style="--c:${c}"><span><b>${k}</b> = <output>${nf(st[k], 2)}</output><small>${esc(d)}</small></span><input type="range" min="${a}" max="${b}" step="${sp}" value="${st[k]}" data-ct="gain" data-k="${k}"></label>`).join("")}</div>`
    : `<div class="ct-pre">${Object.entries(CT_PRE).map(([k, P]) => `<button data-ct="pre" data-k="${k}" class="${st.pre === k ? "on" : ""}">${esc(T(P.nb, P.en))}</button>`).join("")}</div>`;
  return `<div class="ct-hd"><span class="sim-tag">${I.bolt}${esc(T("Prøv selv", "Try it"))}</span><b>${esc(st.mode === "pid" ? T("PID-regulering: skru og se", "PID control: turn the knobs and watch") : T("Poler, nullpunkter og sprangrespons", "Poles, zeros and step response"))}</b></div>
    <p class="ct-lead">${esc(st.mode === "pid" ? T("Skru på Kp, Ki og Kd. Øverst ser du hvor de lukkede polene havner, under ser du hvordan systemet følger et sprang i ønsket verdi.", "Turn Kp, Ki and Kd. At the top you see where the closed-loop poles end up, below you see how the system follows a step in the setpoint.") : T("Dra polene (×) og nullpunktet (○) i s-planet. Se uttrykket og sprangresponsen endre seg med en gang.", "Drag the poles (×) and the zero (○) in the s-plane. Watch the expression and the step response change at once."))}</p>
    ${ctl}
    <div class="ct-eq">${texD(ctTex(st, M))}</div>
    <svg class="ct-svg ct-plane" viewBox="0 0 360 190" role="img" aria-label="${esc(T("s-planet", "the s-plane"))}">${ctPlaneSVG(st, M.poles, zeros, handles)}</svg>
    <svg class="ct-svg" viewBox="0 0 360 178" role="img" aria-label="${esc(T("sprangrespons", "step response"))}">${ctRespSVG(M.y, M.T, M.yf, M.m || {}, st.mode === "pid" ? 1 : null)}</svg>
    <div class="ct-chips">${chips.map(([k, v]) => `<span><small>${esc(k)}</small><b>${v}</b></span>`).join("")}</div>
    <div class="ct-ex">${ctExplain(st, M)}</div>
    <details class="mv-f"><summary>${esc(T("Formlene bak", "The formulas behind it"))}</summary>
      <div class="dmath">${texD("G(s) = \\frac{K}{\\tau s + 1}\\;\\Rightarrow\\; p = -\\frac{1}{\\tau}")}</div>
      <div class="dmath">${texD("G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2},\\quad p = -\\zeta\\omega_n \\pm j\\,\\omega_n\\sqrt{1-\\zeta^2}")}</div>
      <div class="dmath">${texD("M_p = e^{-\\zeta\\pi/\\sqrt{1-\\zeta^2}},\\qquad t_s \\approx \\frac{4}{\\zeta\\omega_n}")}</div>
      <div class="dmath">${texD("1 + C(s)G(s) = 0\\quad\\text{(" + T("lukkede poler", "closed-loop poles") + ")}")}</div>
    </details>`;
}
function ctHTML(mode){
  const uid = "ct" + (++ctSeq), pre = CT_PRE[mode === "pid" ? "first" : mode] ? mode : "second";
  CT_ST[uid] = mode === "pid" ? { uid, mode: "pid", plant: "p2", Kp: 2, Ki: 0, Kd: 0 } : { uid, mode: "poles", pre, p: CT_PRE[pre].p.map(x => x.slice()), z: CT_PRE[pre].z };
  return `<div class="ct fig" data-ctid="${uid}">${ctInner(CT_ST[uid])}</div>`;
}
const ctEl = st => document.querySelector(`.ct[data-ctid="${st.uid}"]`);
function ctUpdate(st){ const el = ctEl(st); if(!el) return; const keep = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.k;
  el.innerHTML = ctInner(st); if(keep){ const r = el.querySelector(`input[data-k="${keep}"]`); if(r) r.focus(); } }
// dra poler og nullpunkt
let CT_DRAG = null;
document.addEventListener("pointerdown", e => {
  const h = e.target.closest && e.target.closest("[data-cth]"); if(!h) return;
  const st = CT_ST[h.closest(".ct").dataset.ctid]; if(!st) return; e.preventDefault(); CT_DRAG = { st, k: h.dataset.cth };
});
addEventListener("pointermove", e => {
  if(!CT_DRAG) return; const { st, k } = CT_DRAG, el = ctEl(st), svg = el && el.querySelector(".ct-plane"), m = svg && svg.getScreenCTM(); if(!m) return;
  const x = (e.clientX - m.e) / m.a, y = (e.clientY - m.f) / m.d;
  const s = Math.round(Math.max(CT_S.smin + 0.2, Math.min(CT_S.smax - 0.2, CT_S.smin + (x - CT_S.x0) / (CT_S.x1 - CT_S.x0) * (CT_S.smax - CT_S.smin))) * 10) / 10;
  const w = Math.round(Math.max(0, Math.min(CT_S.wmax - 0.2, ((CT_S.y0 + CT_S.y1) / 2 - y) / ((CT_S.y1 - CT_S.y0) / 2) * CT_S.wmax)) * 10) / 10;
  if(k === "z") st.z = Math.abs(s) < 0.1 ? 0.1 : s; else st.p[+k.slice(1)] = [Math.abs(s) < 0.05 ? 0.05 : s, w < 0.15 ? 0 : w];
  st.pre = null; ctUpdate(st);
});
addEventListener("pointerup", () => { CT_DRAG = null; });
document.addEventListener("input", e => {
  const r = e.target.closest && e.target.closest('.ct input[data-ct="gain"]'); if(!r) return;
  const st = CT_ST[r.closest(".ct").dataset.ctid]; st[r.dataset.k] = +r.value; ctUpdate(st);
});
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest(".ct button[data-ct]"); if(!b) return;
  const st = CT_ST[b.closest(".ct").dataset.ctid];
  if(b.dataset.ct === "pre"){ const P = CT_PRE[b.dataset.k]; st.pre = b.dataset.k; st.p = P.p.map(x => x.slice()); st.z = P.z; }
  if(b.dataset.ct === "plant") st.plant = b.dataset.k;
  ctUpdate(st);
});
// ---------- i teorien ----------
const CT_UNITS = [["ELFT2400", "Laplace og overføringsfunksjoner", "second"], ["ELFT2400", "PID-regulering", "pid"], ["ELFT2400", "Stegrespons og førsteordens systemer", "first"]];
const CT_MAP = {};
for(const [code, title, mode] of CT_UNITS){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) CT_MAP[code + ":" + u] = mode; }
function withCtl(code, u, src){
  const mode = CT_MAP[code + ":" + u]; if(!mode || src.includes("![ctl:")) return src;
  const lines = src.split("\n"), hs = lines.map((l, k) => /^##\s/.test(l.trim()) && k > 0 ? k : -1).filter(k => k >= 0), i = hs[1] != null ? hs[1] : hs[0];
  if(i == null) lines.push("", "![ctl:" + mode + "]"); else lines.splice(i, 0, "![ctl:" + mode + "]", "");
  return lines.join("\n");
}
// ---------- egen lab-skjerm (#/regulering) ----------
let CTS = { from: "home", tab: "poles", uid: {} };
function ctOpen(from, tab){ CTS = { from: from || "home", tab: tab || "poles", uid: {} }; overlay = null; screen = "ctl"; render(); window.scrollTo(0, 0); }
function renderCtl(){
  const tab = CTS.tab; if(!CTS.uid[tab] || !CT_ST[CTS.uid[tab]]){ const h = ctHTML(tab === "pid" ? "pid" : "second"); CTS.uid[tab] = h.match(/data-ctid="(\w+)"/)[1]; }
  const st = CT_ST[CTS.uid[tab]];
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="ctback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Labben", "The lab"))}</small><b>${esc(T("Reguleringslaben", "The control lab"))}</b></div></div></div>
    <main class="wrap lab-one"><div class="seg ct-tabs">${[["poles", T("Poler og respons", "Poles and response")], ["pid", T("PID-regulator", "PID controller")]].map(([k, l]) => `<button class="${tab === k ? "on" : ""}" data-a="cttab" data-k="${k}">${esc(l)}</button>`).join("")}</div>
      <div class="ct fig" data-ctid="${st.uid}">${ctInner(st)}</div></main>`;
}
function ctClick(a, b){
  if(a === "cttab"){ CTS.tab = b.dataset.k; render(); return true; }
  if(a === "ctback"){ const f = CTS.from; if(typeof labBack === "function") labBack(f); else goHome(); return true; }
  return false;
}
