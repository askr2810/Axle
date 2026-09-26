// ============================================================
//  PRØV SELV, DEL 2 – flere simuleringer og «oppgaver» i Brilliant-stil.
//  g = [[oppgave nb, oppgave en, (v, m) => løst?], ...] sjekkes når man slipper en glidebryter.
//  m er måltallene simuleringen regner ut (f returnerer { svg, out, m }).
//  Alle glidebrytere har faste grenser og steg, og tools/test_sims.js prøver kombinasjonene
//  slik at ingenting gir NaN/uendelig, og at hver oppgave faktisk kan løses.
// ============================================================
const smClamp = (x, a, b) => Math.max(a, Math.min(b, Number.isFinite(x) ? x : (x > 0 ? b : a)));
const smSec = x => Number.isFinite(x) ? smN(x) + " s" : "–";
const smPct = x => Number.isFinite(x) ? smN(x, 1) + " %" : "–";
// Stegrespons-mål: oversving (%), stigetid 10–90 %, innsvingningstid (2 %-bånd), stasjonært avvik mot ref.
function smStepInfo(ys, dt, ref = 1, known){ // known = kjent sluttverdi (ellers snittet av de siste 5 %)
  const n = ys.length, k = Math.max(5, Math.round(n / 20)); let avg = 0;
  for(let i = n - k; i < n; i++) avg += ys[i]; avg /= k;
  const fin = known != null ? known : avg, ess = Math.abs(ref - avg);
  if(Math.abs(fin) < 0.05) return { os: 0, tr: Infinity, ts: Infinity, ess, fin };
  let mx = -Infinity, t10 = -1, t90 = -1, last = -1;
  for(let i = 0; i < n; i++){ const y = ys[i]; if(y > mx) mx = y;
    if(t10 < 0 && y >= 0.1 * fin) t10 = i; if(t90 < 0 && y >= 0.9 * fin) t90 = i;
    if(Math.abs(y - fin) > 0.02 * Math.abs(fin)) last = i; }
  const os = Math.max(0, (mx - fin) / Math.abs(fin) * 100), tr = t90 >= 0 && t10 >= 0 ? (t90 - t10) * dt : Infinity;
  const ts = last >= n - k ? Infinity : (last + 1) * dt;
  return { os, tr, ts, ess, fin };
}
// PID på G(s) = 1/((s+1)(0,5s+1)): D-ledd på målingen med filter, pådrag begrenset til ±10 og anti-windup.
function smPidRun(Kp, Ki, Kd){
  const dt = 0.01, N = 1000, UM = 10; let x1 = 0, y = 0, I = 0, yp = 0, dF = 0; const ys = [], us = [];
  for(let i = 0; i <= N; i++){
    const e = 1 - y; dF += (-(y - yp) / dt - dF) * 0.2; yp = y;
    const raw = Kp * e + Ki * I + Kd * dF, u = smClamp(raw, -UM, UM);
    if(u === raw || e * raw < 0) I += e * dt;
    ys.push(y); us.push(u);
    x1 += dt * (u - x1); y += dt * (x1 - y) / 0.5;
  }
  return { ys, us, dt };
}
// Normert andreordens system x'' + 2ζx' + x = 1 (τ = ω₀t), semi-implisitt Euler.
function smSecond(z, tmax, dt){ const ys = []; let x = 0, v = 0; for(let t = 0; t <= tmax + 1e-9; t += dt){ ys.push(x); v += dt * (1 - x - 2 * z * v); x += dt * v; } return ys; }
const smSeries = (ys, dt) => t => ys[Math.min(ys.length - 1, Math.max(0, Math.round(t / dt)))];

Object.assign(SIMS, {
  // ---------- regulering og dynamikk ----------
  pid: { t: ["PID-regulator", "PID controller"], p: [["Kp", "K_p", 0, 20, 0.5, 2, "", 1], ["Ki", "K_i", 0, 10, 0.25, 0, "", 2], ["Kd", "K_d", 0, 5, 0.1, 0, "", 3]],
    q: ["Start med bare P. Legg så til I, og til slutt D. Hva gjør hvert ledd med kurven?", "Start with P only. Then add I, and finally D. What does each term do to the curve?"],
    g: [["Bare P-regulering (K_i = K_d = 0): få det stasjonære avviket under 10 %.", "P control only (K_i = K_d = 0): get the steady-state error below 10 %.", (v, m) => v.Ki === 0 && v.Kd === 0 && m.ess < 0.1],
        ["Legg til I-ledd: fjern avviket (under 1 %) og hold oversvingen under 25 %.", "Add integral action: remove the error (below 1 %) and keep the overshoot below 25 %.", (v, m) => v.Ki > 0 && m.ess < 0.01 && m.os < 25],
        ["Proff: oversving under 5 %, innsvingningstid under 2,5 s og null avvik.", "Pro level: overshoot below 5 %, settling time below 2.5 s and zero error.", (v, m) => m.os < 5 && m.ts < 2.5 && m.ess < 0.01],
        ["Ødelegg det: få systemet til å svinge uten å roe seg innen 10 s.", "Break it: make the system oscillate without settling within 10 s.", (v, m) => !Number.isFinite(m.ts) && m.os > 10]],
    f: v => { const r = smPidRun(v.Kp, v.Ki, v.Kd), m = smStepInfo(r.ys, r.dt, 1, v.Ki > 0 ? 1 : v.Kp / (1 + v.Kp)), Y = smSeries(r.ys, r.dt), U = smSeries(r.us, r.dt);
      const g = smPlot([[t => 1, "fg-mut", 1.2], [t => U(t) / 10, "fg-c2", 1.4], [Y, "fg-acc", 2.6]], [0, 10], [-0.3, 1.8], "t (s)", "y", (X, Yp) =>
        (Number.isFinite(m.ts) && m.ts <= 10 ? smLine(X(m.ts), Yp(-0.3), X(m.ts), Yp(1.8), "fg-ok", "4 3") + fgT(X(m.ts) + 4, Yp(1.62), "t_s", "fg-s fg-okt", "start") : "") +
        fgT(X(9.8), Yp(1.62), T("pådrag u/10", "input u/10"), "fg-s fg-c2t", "end") + fgT(X(9.8), Yp(1) - 5, T("mål", "setpoint"), "fg-s", "end"));
      return { eq: [qt`u = ${qc(1, qn(v.Kp, 1))}\,e + ${qc(2, qn(v.Ki, 2))}\!\int e\,dt + ${qc(3, qn(v.Kd, 1))}\,\frac{de}{dt}`, v.Ki > 0 ? qt`K_i > 0 \;\Rightarrow\; e_\infty = ${qr(0, 0)}` : qt`e_\infty = \frac{1}{1 + K_p} = \frac{1}{1 + ${qc(1, qn(v.Kp, 1))}} = ${qr(1 / (1 + v.Kp), 3)} \;${qrel(1 / (1 + v.Kp), 0.1, "le", 0)}\; 0{,}1`], m, out: [[T("oversving", "overshoot"), smPct(m.os)], [T("innsvingning", "settling"), smSec(m.ts)], [T("avvik", "error"), smN(m.ess * 100, 1) + " %"]], svg: g.svg }; } },
  second: { t: ["Andreordens stegrespons", "Second-order step response"], p: [["z", "ζ", 0.05, 2, 0.05, 0.2, "", 1], ["wn", "ω_n", 1, 10, 0.5, 3, "rad/s", 2]],
    q: ["Hold ω_n fast og øk ζ fra 0,1 til 1. Hva skjer med oversvingen og svingefrekvensen?", "Keep ω_n fixed and increase ζ from 0.1 to 1. What happens to the overshoot and the ringing?"],
    g: [["Still inn en oversving mellom 4 og 5 % (en vanlig designregel).", "Tune the overshoot to between 4 and 5 % (a common design rule).", (v, m) => m.os >= 4 && m.os <= 5],
        ["Ingen oversving (under 0,1 %) og innsvingningstid under 1 s.", "No overshoot (below 0.1 %) and a settling time below 1 s.", (v, m) => m.os < 0.1 && m.ts < 1],
        ["Mest mulig svinging: oversving over 70 %.", "As much ringing as possible: overshoot above 70 %.", (v, m) => m.os > 70]],
    f: v => { const dt = 0.01, ys = smSecond(v.z, 6 * v.wn, dt), m = smStepInfo(ys, dt / v.wn, 1, 1), Y = t => smSeries(ys, dt)(t * v.wn);
      const g = smPlot([[t => 1, "fg-mut", 1.2], [Y, "fg-acc", 2.6]], [0, 6], [0, 2], "t (s)", "y", (X, Yp) => Number.isFinite(m.ts) && m.ts <= 6 ? smLine(X(m.ts), Yp(0), X(m.ts), Yp(2), "fg-ok", "4 3") : "");
      return { eq: [qt`G(s) = \frac{${qc(2, qn(v.wn, 1))}^2}{s^2 + 2\cdot ${qc(1, qn(v.z))}\cdot ${qc(2, qn(v.wn, 1))}\,s + ${qc(2, qn(v.wn, 1))}^2}`, v.z < 1 ? qt`M_p = e^{-\pi\zeta/\sqrt{1 - \zeta^2}} = e^{-\pi\cdot ${qc(1, qn(v.z))}/\sqrt{1 - ${qc(1, qn(v.z))}^2}} = ${qr(100 * Math.exp(-Math.PI * v.z / Math.sqrt(1 - v.z * v.z)), 1, "\\%")}` : qt`\zeta = ${qc(1, qn(v.z))} \ge 1 \;\Rightarrow\; \text{${T("ingen oversving", "no overshoot")}}`], m, out: [[T("oversving", "overshoot"), smPct(m.os)], [T("innsvingning", "settling"), smSec(m.ts)], [T("poler", "poles"), v.z < 1 ? `−${smN(v.z * v.wn)} ± ${smN(v.wn * Math.sqrt(1 - v.z * v.z))}j` : T("reelle", "real")]], svg: g.svg }; } },
  rlc: { t: ["RLC-krets: stegrespons", "RLC circuit: step response"], p: [["R", "R", 5, 200, 5, 20, "Ω", 1], ["L", "L", 10, 200, 10, 100, "mH", 2], ["C", "C", 10, 200, 10, 100, "µF", 3]],
    q: ["Hvilken motstand gir kritisk demping? Sjekk at R = 2√(L/C).", "Which resistance gives critical damping? Check that R = 2√(L/C)."],
    g: [["Kritisk demping: få ζ mellom 0,95 og 1,05.", "Critical damping: get ζ between 0.95 and 1.05.", (v, m) => m.z >= 0.95 && m.z <= 1.05],
        ["Still resonansfrekvensen til 50 Hz (±1 Hz).", "Set the resonant frequency to 50 Hz (±1 Hz).", (v, m) => Math.abs(m.f0 - 50) <= 1],
        ["Kraftig ringing: oversving over 80 %.", "Heavy ringing: overshoot above 80 %.", (v, m) => m.os > 80]],
    f: v => { const L = v.L / 1000, C = v.C / 1e6, w0 = 1 / Math.sqrt(L * C), z = v.R / 2 * Math.sqrt(C / L), dt = 0.02, tm = 30 / w0 * 1000;
      const ys = smSecond(z, 30, dt), m = smStepInfo(ys, dt, 1, 1); m.z = z; m.f0 = w0 / 2 / Math.PI;
      const g = smPlot([[t => 1, "fg-mut", 1.2], [t => smSeries(ys, dt)(t / 1000 * w0), "fg-acc", 2.6]], [0, tm], [0, 2], "t (ms)", "u_C/U");
      return { eq: [qt`\zeta = \frac{R}{2}\sqrt{\frac{C}{L}} = \frac{${qc(1, v.R)}}{2}\sqrt{\frac{${qc(3, v.C)}\cdot 10^{-6}}{${qc(2, qn(v.L / 1000, 3))}}} = ${qr(z, 3)} \;${qrel(z, 1, "n", 0.01)}\; 1`, qt`f_0 = \frac{1}{2\pi\sqrt{LC}} = ${qr(m.f0, 1, "Hz")}`], m, out: [["ζ = (R/2)√(C/L)", smN(z, 3)], ["f₀ = 1/(2π√(LC))", smN(m.f0, 1) + " Hz"], [T("oversving", "overshoot"), smPct(m.os)]], svg: g.svg }; } },
  // ---------- signaler ----------
  fourier: { t: ["Fourierrekke", "Fourier series"], p: [["w", ["bølge (0 firkant, 1 sag, 2 trekant)", "wave (0 square, 1 saw, 2 triangle)"], 0, 2, 1, 0, ""], ["N", ["antall ledd", "number of terms"], 1, 25, 1, 3, "", 2]],
    q: ["Legg til ledd for firkantbølgen. Forsvinner «hornene» ved hoppene noen gang? (Gibbs-fenomenet)", "Add terms to the square wave. Do the «horns» at the jumps ever disappear? (The Gibbs phenomenon)"],
    g: [["Firkantbølge: få RMS-feilen under 15 %.", "Square wave: get the RMS error below 15 %.", (v, m) => v.w === 0 && m.err < 15],
        ["Trekantbølge: feil under 3 % med høyst 3 ledd. (Hvorfor går det så mye fortere enn for firkanten?)", "Triangle wave: error below 3 % with at most 3 terms. (Why is it so much faster than the square wave?)", (v, m) => v.w === 2 && v.N <= 3 && m.err < 3],
        ["Sagtann: feil under 20 % med færrest mulig ledd.", "Sawtooth: error below 20 % with as few terms as possible.", (v, m) => v.w === 1 && m.err < 20 && m.errPrev >= 20]],
    f: v => { const w = Math.round(v.w), P = Math.PI;
      const term = (k, x) => w === 0 ? 4 / P * Math.sin((2 * k - 1) * x) / (2 * k - 1) : w === 1 ? 2 / P * (k % 2 ? 1 : -1) * Math.sin(k * x) / k : 8 / (P * P) * (k % 2 ? 1 : -1) * Math.sin((2 * k - 1) * x) / (2 * k - 1) ** 2;
      const sum = (x, N) => { let s = 0; for(let k = 1; k <= N; k++) s += term(k, x); return s; };
      const tgt = x => w === 0 ? Math.sign(Math.sin(x)) : w === 1 ? (((x + P) % (2 * P) + 2 * P) % (2 * P) - P) / P : 2 / P * Math.asin(Math.sin(x));
      const rmsErr = N => { let e = 0, r = 0; for(let i = 0; i < 400; i++){ const x = -P + 2 * P * (i + 0.5) / 400; e += (sum(x, N) - tgt(x)) ** 2; r += tgt(x) ** 2; } return Math.sqrt(e / r) * 100; };
      const m = { err: rmsErr(v.N), errPrev: v.N > 1 ? rmsErr(v.N - 1) : Infinity };
      const g = smPlot([[tgt, "fg-mut", 1.6], [x => sum(x, v.N), "fg-acc", 2.4]], [-2 * P, 2 * P], [-1.5, 1.5], "x", "f");
      return { eq: [[qt`f(x) \approx \frac{4}{\pi}\sum_{k=1}^{${qc(2, v.N)}}\frac{\sin\big((2k-1)x\big)}{2k-1}`, qt`f(x) \approx \frac{2}{\pi}\sum_{k=1}^{${qc(2, v.N)}}(-1)^{k+1}\frac{\sin kx}{k}`, qt`f(x) \approx \frac{8}{\pi^2}\sum_{k=1}^{${qc(2, v.N)}}(-1)^{k+1}\frac{\sin\big((2k-1)x\big)}{(2k-1)^2}`][w], qt`\text{${T("RMS-feil", "RMS error")}} = ${qr(m.err, 1, "\\%")}`], m, out: [[T("bølge", "wave"), [T("firkant", "square"), T("sagtann", "sawtooth"), T("trekant", "triangle")][w]], [T("RMS-feil", "RMS error"), smPct(m.err)]], svg: g.svg }; } },
  alias: { t: ["Sampling og aliasing", "Sampling and aliasing"], p: [["f", ["signal f", "signal f"], 1, 20, 1, 3, "Hz", 1], ["fs", ["samplingsfrekvens f_s", "sample rate f_s"], 2, 40, 1, 20, "Hz", 3]],
    q: ["Senk f_s under 2f. Hvilken frekvens ser det samplede signalet ut til å ha?", "Lower f_s below 2f. What frequency does the sampled signal appear to have?"],
    g: [["Få et 9 Hz-signal til å se ut som 1 Hz.", "Make a 9 Hz signal look like 1 Hz.", (v, m) => v.f === 9 && m.fa === 1],
        ["Laveste f_s som unngår aliasing for et 7 Hz-signal (Nyquist).", "The lowest f_s that avoids aliasing for a 7 Hz signal (Nyquist).", v => v.f === 7 && v.fs === 15],
        ["Få signalet til å se helt flatt ut (0 Hz).", "Make the signal look completely flat (0 Hz).", (v, m) => m.fa === 0]],
    f: v => { const k = Math.round(v.f / v.fs), fa = Math.abs(v.f - k * v.fs), fs2 = v.f - k * v.fs, ns = Math.floor(v.fs);
      const g = smPlot([], [0, 1], [-1.3, 1.3], "t (s)", "", (X, Y) => {
        let s = `<path class="fg-c1" fill="none" stroke-width="1.6" opacity=".8" d="${fgPath(t => [X(t), Y(Math.sin(2 * Math.PI * v.f * t))], 0, 1, 500)}"/>`;
        s += `<path class="fg-c2" fill="none" stroke-width="2.2" stroke-dasharray="5 3" d="${fgPath(t => [X(t), Y(Math.sin(2 * Math.PI * fs2 * t))], 0, 1, 200)}"/>`;
        for(let i = 0; i <= ns; i++){ const t = i / v.fs; s += `<circle cx="${X(t).toFixed(1)}" cy="${Y(Math.sin(2 * Math.PI * v.f * t)).toFixed(1)}" r="3.6" fill="var(--c3)"/>`; }
        return s + fgT(X(1), Y(1.25), T("- - ser ut som", "- - looks like"), "fg-s fg-c2t", "end"); });
      return { eq: [qt`f_s = ${qc(3, v.fs)} \;${v.fs > 2 * v.f ? qc(6, ">") : qc(7, v.fs === 2 * v.f ? "=" : "<")}\; 2f = 2\cdot ${qc(1, v.f)} = ${2 * v.f}${qu("Hz")}`, qt`f_{\text{alias}} = |f - k f_s| = |${qc(1, v.f)} - ${k}\cdot ${qc(3, v.fs)}| = ${qr(fa, 0, "Hz")}`], m: { fa }, out: [["Nyquist f_s/2", smN(v.fs / 2, 1) + " Hz"], [T("ser ut som", "looks like"), smN(fa, 0) + " Hz"], ["OK?", v.fs > 2 * v.f ? T("ja", "yes") : T("aliasing!", "aliasing!")]], svg: g.svg }; } },
  // ---------- matematikk ----------
  quad: { t: ["Andregradsfunksjonen", "The quadratic function"], p: [["a", "a", -3, 3, 0.5, 1, "", 1], ["b", "b", -6, 6, 0.5, 0, "", 2], ["c", "c", -6, 6, 0.5, -2, "", 3]],
    q: ["Endre bare c. Hvorfor flytter hele grafen seg rett opp og ned?", "Change only c. Why does the whole graph move straight up and down?"],
    g: [["Lag en parabel med nøyaktig ett nullpunkt (dobbel rot).", "Make a parabola with exactly one zero (a double root).", (v, m) => v.a !== 0 && Math.abs(m.D) < 1e-9],
        ["Lag en parabel som aldri krysser x-aksen og åpner nedover.", "Make a parabola that never crosses the x-axis and opens downwards.", (v, m) => v.a < 0 && m.D < 0],
        ["Flytt toppunktet til (1, 2).", "Move the vertex (maximum) to (1, 2).", (v, m) => v.a < 0 && Math.abs(m.xv - 1) < 1e-9 && Math.abs(m.yv - 2) < 1e-9]],
    f: v => { const D = v.b * v.b - 4 * v.a * v.c, xv = v.a ? -v.b / (2 * v.a) : NaN, yv = v.a ? v.c - v.b * v.b / (4 * v.a) : NaN;
      const roots = v.a ? (D > 1e-12 ? [(-v.b - Math.sqrt(D)) / (2 * v.a), (-v.b + Math.sqrt(D)) / (2 * v.a)] : Math.abs(D) <= 1e-12 ? [xv] : []) : (v.b ? [-v.c / v.b] : []);
      const g = smPlot([[x => v.a * x * x + v.b * x + v.c]], [-5, 5], [-8, 8], "x", "y", (X, Y) => roots.filter(r => Math.abs(r) <= 5).map(r => smDot(X(r), Y(0), "fg-dot")).join("") + (v.a && Math.abs(xv) <= 5 && Math.abs(yv) <= 8 ? smDot(X(xv), Y(yv), "fg-dot2", 4) : ""));
      return { eq: [qt`y = ${qc(1, qn(v.a, 1))}x^2 ${v.b < 0 ? "-" : "+"} ${qc(2, qn(Math.abs(v.b), 1))}x ${v.c < 0 ? "-" : "+"} ${qc(3, qn(Math.abs(v.c), 1))}`, qt`D = (${qc(2, qn(v.b, 1))})^2 - 4\cdot(${qc(1, qn(v.a, 1))})\cdot(${qc(3, qn(v.c, 1))}) = ${qr(D, 2)} \;${qrel(D, 0, "n", 1e-9)}\; 0`, ...(v.a && D >= -1e-12 ? [qt`x = \frac{-b \pm \sqrt{D}}{2a} = \frac{${qn(-v.b, 1)} \pm \sqrt{${qn(Math.max(0, D), 2)}}}{${qn(2 * v.a, 1)}} = ${roots.map(r => qr(r, 2)).join(qt`\ \text{${T("og", "and")}}\ `)}`] : [])], m: { D, xv, yv }, out: [["D = b² − 4ac", smN(D)], [T("nullpunkter", "zeros"), roots.length ? roots.map(r => smN(r)).join(T(" og ", " and ")) : T("ingen", "none")], [T("topp/bunn", "vertex"), v.a ? `(${smN(xv)}, ${smN(yv)})` : "–"]], svg: g.svg }; } },
  trig: { t: ["Treff kurven: A·sin(bx + c) + d", "Match the curve: A·sin(bx + c) + d"], p: [["A", "A", 0.5, 3, 0.5, 1, "", 1], ["b", "b", 0.5, 3, 0.5, 1, "", 2], ["c", "c", -180, 180, 15, 0, "°", 3], ["d", "d", -2, 2, 0.5, 0, "", 4]],
    q: ["Hvilken konstant endrer amplituden, perioden, forskyvningen sideveis og likevektslinja?", "Which constant changes the amplitude, the period, the sideways shift and the midline?"],
    g: [["Legg den blå kurven oppå den stiplede: 2 sin x + 1.", "Put the blue curve on top of the dashed one: 2 sin x + 1.", (v, m) => m.hit],
        ["Ny kurve: sin 2x − 1.", "New curve: sin 2x − 1.", (v, m) => m.hit],
        ["Ny kurve: 1,5 cos x. (Tips: cos x = sin(x + 90°))", "New curve: 1.5 cos x. (Hint: cos x = sin(x + 90°))", (v, m) => m.hit],
        ["Mester: 0,5 sin(3x − 45°) + 1,5.", "Master: 0.5 sin(3x − 45°) + 1.5.", (v, m) => m.hit]],
    f: v => { const tg = [[2, 1, 0, 1], [1, 2, 0, -1], [1.5, 1, 90, 0], [0.5, 3, -45, 1.5]], gi = Math.min(tg.length - 1, Math.max(0, v._g | 0)), [A, b, c, d] = tg[gi], R = Math.PI / 180;
      const fn = x => v.A * Math.sin(v.b * x + v.c * R) + v.d, tf = x => A * Math.sin(b * x + c * R) + d;
      let dev = 0; for(let i = 0; i <= 200; i++){ const x = 2 * Math.PI * i / 200; dev = Math.max(dev, Math.abs(fn(x) - tf(x))); }
      const g = smPlot([[tf, "fg-red", 3], [fn, "fg-acc", 2.4]], [0, 2 * Math.PI], [-4.5, 4.5], "x", "y", (X, Y) => fgT(X(2 * Math.PI) - 2, Y(4.2), dev < 0.02 ? T("Treff! ✓", "Match! ✓") : "", "fg-b fg-okt", "end"));
      return { eq: [qt`y = ${qc(1, qn(v.A, 1))}\sin(${qc(2, qn(v.b, 1))}x ${v.c < 0 ? "-" : "+"} ${qc(3, Math.abs(v.c) + "^\\circ")}) ${v.d < 0 ? "-" : "+"} ${qc(4, qn(Math.abs(v.d), 1))}`, qt`T = \frac{2\pi}{b} = \frac{2\pi}{${qc(2, qn(v.b, 1))}} = ${qr(2 / v.b, 2)}\pi`], m: { hit: dev < 0.02, dev }, out: [[T("periode 2π/b", "period 2π/b"), smN(2 / v.b, 2) + "π"], [T("avstand til målet", "distance to target"), smN(dev)]], svg: g.svg.replace('class="fg-red" d', 'class="fg-red" stroke-dasharray="6 4" d') }; } },
  taylor: { t: ["Taylorpolynom", "Taylor polynomial"], p: [["fn", ["funksjon (0 sin, 1 cos, 2 eˣ)", "function (0 sin, 1 cos, 2 eˣ)"], 0, 2, 1, 0, ""], ["n", ["grad n", "degree n"], 0, 15, 1, 1, "", 2]],
    q: ["Øk graden. Hvor langt ut fra x = 0 blir tilnærmingen god?", "Increase the degree. How far from x = 0 does the approximation stay good?"],
    g: [["sin x: få feilen i x = 3 under 0,01.", "sin x: get the error at x = 3 below 0.01.", (v, m) => v.fn === 0 && m.err < 0.01],
        ["eˣ: relativ feil under 1 % i x = 3.", "eˣ: relative error below 1 % at x = 3.", (v, m) => v.fn === 2 && m.rel < 0.01],
        ["cos x: laveste grad som gir feil under 0,1 i x = 3.", "cos x: the lowest degree that gives an error below 0.1 at x = 3.", (v, m) => v.fn === 1 && m.err < 0.1 && m.errPrev >= 0.1]],
    f: v => { const w = Math.round(v.fn), der = k => w === 0 ? [0, 1, 0, -1][k % 4] : w === 1 ? [1, 0, -1, 0][k % 4] : 1, F = [Math.sin, Math.cos, Math.exp][w];
      const P = (x, n) => { let s = 0, t = 1; for(let k = 0; k <= n; k++){ if(k) t *= x / k; s += der(k) * t; } return s; };
      const err = n => Math.abs(P(3, n) - F(3)), m = { err: err(v.n), errPrev: v.n > 0 ? err(v.n - 1) : Infinity, rel: err(v.n) / Math.abs(F(3)) };
      const g = smPlot([[F, "fg-mut", 2], [x => P(x, v.n), "fg-acc", 2.4]], w === 2 ? [-3, 3.5] : [-7, 7], w === 2 ? [-2, 24] : [-2.5, 2.5], "x", "y", (X, Y) => smLine(X(3), Y(w === 2 ? -2 : -2.5), X(3), Y(w === 2 ? 24 : 2.5), "fg-red", "3 3"));
      return { eq: [qt`${["\\sin x", "\\cos x", "e^x"][w]} \approx ${(() => { const tm = []; for(let k = 0; k <= v.n; k++){ const c = der(k); if(!c) continue; tm.push([c, k === 0 ? "1" : k === 1 ? "x" : qt`\frac{x^{${k}}}{${k}!}`]); } const txt = tm.map(([c, x], i) => (i ? (c < 0 ? " - " : " + ") : (c < 0 ? "-" : "")) + x); return (txt.length > 5 ? [...txt.slice(0, 3), " + \\dots", txt[txt.length - 1]] : txt).join(""); })()}`, qt`n = ${qc(2, v.n)}:\ |P_n(3) - f(3)| = ${qr(m.err, 4)}`], m, out: [[T("feil i x = 3", "error at x = 3"), m.err < 1e-4 ? "< 0,0001".replace(",", T(",", ".")) : smN(m.err, 4)], [T("antall ledd ≠ 0", "non-zero terms"), String(Array.from({ length: v.n + 1 }, (_, k) => der(k)).filter(Boolean).length)]], svg: g.svg }; } },
  matrix: { t: ["Matrise som transformasjon", "A matrix as a transformation"], p: [["a", "a", -2, 2, 0.5, 1, "", 4], ["b", "b", -2, 2, 0.5, 0, "", 3], ["c", "c", -2, 2, 0.5, 0, "", 4], ["d", "d", -2, 2, 0.5, 1, "", 3]],
    q: ["Matrisen er [[a, b], [c, d]]. Kolonnene viser hvor e₁ og e₂ havner. Hva betyr det at det A er negativ?", "The matrix is [[a, b], [c, d]]. The columns show where e₁ and e₂ end up. What does a negative det A mean?"],
    g: [["Klem kvadratet flatt: gjør det A = 0.", "Squash the square flat: make det A = 0.", (v, m) => Math.abs(m.det) < 1e-9],
        ["Roter figuren 90° mot klokka.", "Rotate the figure 90° counterclockwise.", v => v.a === 0 && v.b === -1 && v.c === 1 && v.d === 0],
        ["Speil figuren om y-aksen.", "Reflect the figure in the y-axis.", v => v.a === -1 && v.b === 0 && v.c === 0 && v.d === 1],
        ["Firedobl arealet uten å speile.", "Quadruple the area without reflecting.", (v, m) => Math.abs(m.det - 4) < 1e-9]],
    f: v => { const det = v.a * v.d - v.b * v.c, O = [160, 96], S = 38, P = (x, y) => [O[0] + (v.a * x + v.b * y) * S, O[1] - (v.c * x + v.d * y) * S], Q = (x, y) => [O[0] + x * S, O[1] - y * S];
      const pts = (f, arr) => arr.map(([x, y]) => f(x, y).map(n => n.toFixed(1)).join(",")).join(" "), sq = [[0, 0], [1, 0], [1, 1], [0, 1]], F = [[0.2, 0.1], [0.2, 0.9], [0.75, 0.9], [0.2, 0.9], [0.2, 0.5], [0.6, 0.5]];
      let grid = ""; for(let i = -5; i <= 5; i++){ grid += smLine(...P(i, -5), ...P(i, 5), "fg-mut") + smLine(...P(-5, i), ...P(5, i), "fg-mut"); }
      return { eq: [qt`A = \begin{pmatrix} ${qc(4, qn(v.a, 1))} & ${qc(3, qn(v.b, 1))} \\ ${qc(4, qn(v.c, 1))} & ${qc(3, qn(v.d, 1))} \end{pmatrix}, \quad \det A = ad - bc = ${qr(det, 2)}`], m: { det }, out: [["det A = ad − bc", smN(det)], [T("areal ganges med", "area scaled by"), smN(Math.abs(det))], [T("orientering", "orientation"), det > 0 ? T("bevart", "kept") : det < 0 ? T("speilet", "flipped") : T("klemt flat", "squashed")]], svg:
        `<g opacity=".45">${grid}</g><polygon points="${pts(Q, sq)}" fill="none" stroke="var(--muted)" stroke-dasharray="3 3" stroke-width="1.4"/>
        <polygon class="fg-fill2" points="${pts(P, sq)}" stroke="var(--accent)" stroke-width="2"/><polyline points="${pts(P, F)}" fill="none" stroke="var(--bad)" stroke-width="2.6" stroke-linejoin="round"/>
        ${fgAr(...O, ...P(1, 0), "fg-c4", 2.8)}${fgAr(...O, ...P(0, 1), "fg-c3", 2.8)}${(() => { const l1 = P(1.2, -0.3), l2 = P(-0.3, 1.25); if(Math.abs(l1[1] - l2[1]) < 14 && Math.abs(l1[0] - l2[0]) < 80) l2[1] = l1[1] - 16; return fgT(...l1, "Ae₁ = (a, c)", "fg-s fg-c4t") + fgT(...l2, "Ae₂ = (b, d)", "fg-s fg-c3t"); })()}` }; } },
  // ---------- numerikk og maskinlæring ----------
  euler: { t: ["Eulers metode: steglengde og stabilitet", "Euler's method: step size and stability"], p: [["h", ["steglengde h", "step size h"], 0.02, 1.2, 0.02, 0.4, "", 1], ["meth", ["metode (0 Euler, 1 Heun)", "method (0 Euler, 1 Heun)"], 0, 1, 1, 0, "", 2]],
    q: ["Løser y′ = −2y. Øk h forbi 1. Hvorfor begynner løsningen å hoppe og vokse?", "Solves y′ = −2y. Increase h beyond 1. Why does the solution start to jump and grow?"],
    g: [["Gjør Euler ustabil: løsningen skal vokse i stedet for å dø ut.", "Make Euler unstable: the solution should grow instead of dying out.", (v, m) => v.meth === 0 && m.grow],
        ["Euler: få maksfeilen under 0,01.", "Euler: get the maximum error below 0.01.", (v, m) => v.meth === 0 && m.err < 0.01],
        ["Heun: maksfeil under 0,01 med steglengde h ≥ 0,1.", "Heun: maximum error below 0.01 with step size h ≥ 0.1.", (v, m) => v.meth === 1 && v.h >= 0.1 - 1e-9 && m.err < 0.01]],
    f: v => { const n = Math.ceil(4 / v.h - 1e-9), f = y => -2 * y, pts = [[0, 1]]; let y = 1, err = 0;
      for(let i = 1; i <= n; i++){ y = v.meth ? y + v.h / 2 * (f(y) + f(y + v.h * f(y))) : y + v.h * f(y); const t = i * v.h; pts.push([t, y]); err = Math.max(err, Math.abs(y - Math.exp(-2 * t))); }
      const m = { err, grow: Math.abs(y) > 1 };
      const g = smPlot([[t => Math.exp(-2 * t), "fg-mut", 2]], [0, 4], [-1.5, 1.5], "t", "y", (X, Y) => { const P = ([t, yy]) => [X(t), Y(smClamp(yy, -2, 2))];
        return `<polyline class="fg-acc" fill="none" stroke-width="2.2" points="${pts.map(p => P(p).map(n => n.toFixed(1)).join(",")).join(" ")}"/>` + (pts.length <= 60 ? pts.map(p => smDot(...P(p), "fg-dot", 3)).join("") : ""); });
      return { eq: [v.meth ? qt`y_{n+1} = (1 - 2h + 2h^2)\,y_n = ${qr(1 - 2 * v.h + 2 * v.h * v.h, 3)}\,y_n` : qt`y_{n+1} = (1 - 2\cdot ${qc(1, qn(v.h))})\,y_n = ${qr(1 - 2 * v.h, 3)}\,y_n`, qt`|${qn(v.meth ? 1 - 2 * v.h + 2 * v.h * v.h : 1 - 2 * v.h, 3)}| \;${qrel(Math.abs(v.meth ? 1 - 2 * v.h + 2 * v.h * v.h : 1 - 2 * v.h), 1, "le", 0)}\; 1 \;\Rightarrow\; \text{${Math.abs(v.meth ? 1 - 2 * v.h + 2 * v.h * v.h : 1 - 2 * v.h) < 1 ? T("stabil", "stable") : T("ustabil", "unstable")}}`], m, out: [[T("antall steg", "steps"), String(n)], [T("maksfeil", "max error"), m.err > 99 ? "> 99" : smN(m.err, 4)], ["|1 − 2h|", smN(Math.abs(1 - 2 * v.h), 2)]], svg: g.svg }; } },
  newton: { t: ["Newtons metode", "Newton's method"], p: [["x0", "x₀", -3, 3, 0.1, 3, "", 1], ["n", ["iterasjoner", "iterations"], 0, 6, 1, 1, "", 2]],
    q: ["Løser x² − 2 = 0. Følg tangentene: hvor mange riktige desimaler får du for hver iterasjon?", "Solves x² − 2 = 0. Follow the tangents: how many correct decimals do you gain per iteration?"],
    g: [["Få feilen under 0,000001 med høyst 3 iterasjoner.", "Get the error below 0.000001 with at most 3 iterations.", (v, m) => v.n <= 3 && m.err < 1e-6],
        ["Finn startverdien der metoden bryter sammen.", "Find the starting value where the method breaks down.", (v, m) => m.broken],
        ["Konverger mot den negative roten −√2.", "Converge to the negative root −√2.", (v, m) => m.x < 0 && m.err < 1e-3]],
    f: v => { const f = x => x * x - 2, d = x => 2 * x; let x = v.x0, broken = false; const seg = [];
      for(let i = 0; i < v.n; i++){ if(Math.abs(d(x)) < 1e-12){ broken = true; break; } const x1 = x - f(x) / d(x); seg.push([x, f(x), x1]); x = x1; }
      const err = Math.abs(Math.abs(x) - Math.SQRT2), m = { x, err, broken };
      const g = smPlot([[f]], [-3.2, 3.2], [-3, 8], "x", "y", (X, Y) => { const cx = u => smClamp(X(u), 0, 320), cy = u => smClamp(Y(u), 0, 180);
        return seg.map(([a, fa, b]) => smLine(cx(a), cy(fa), cx(b), cy(0), "fg-red") + smLine(cx(b), cy(0), cx(b), cy(f(b)), "fg-mut", "3 3")).join("") + `<circle cx="${cx(v.x0).toFixed(1)}" cy="${cy(f(v.x0)).toFixed(1)}" r="5" fill="var(--c1)"/>` + fgT(cx(v.x0), smClamp(cy(f(v.x0)) - 9, 10, 170), "x₀", "fg-s fg-c1t") + smDot(cx(x), cy(0), "fg-dot"); });
      return { eq: [qt`x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^2 - 2}{2x_n}`, broken ? qt`f'(x) = 0:\ \text{${T("tangenten er vannrett", "the tangent is horizontal")}}` : qt`x_0 = ${qc(1, qn(v.x0, 1))} \;\to\; x_{${qc(2, v.n)}} = ${qr(x, 7)}`, qt`\sqrt 2 = ${qn(Math.SQRT2, 7)}`], m, out: [["xₙ", broken ? T("f′(x) = 0 – tangenten treffer aldri", "f′(x) = 0 – the tangent never hits") : smN(x, 7)], [T("feil", "error"), broken ? "–" : err < 1e-7 ? "< 1e−7" : smN(err, 7)]], svg: g.svg }; } },
  gd: { t: ["Gradientnedstigning", "Gradient descent"], p: [["eta", ["læringsrate η", "learning rate η"], 0.05, 1.1, 0.05, 0.1, "", 1], ["n", ["steg", "steps"], 1, 30, 1, 5, "", 2]],
    q: ["Minimerer f(w) = (w − 3)² fra w = −2. Hva skjer når η blir for liten, for stor eller akkurat 0,5?", "Minimises f(w) = (w − 3)² from w = −2. What happens when η is too small, too large or exactly 0.5?"],
    g: [["Kom innen 0,01 fra minimum på høyst 10 steg.", "Get within 0.01 of the minimum in at most 10 steps.", (v, m) => v.n <= 10 && m.dist < 0.01],
        ["Treff minimum eksakt på ett steg.", "Hit the minimum exactly in one step.", (v, m) => v.n === 1 && m.dist < 1e-9],
        ["Få læringen til å divergere.", "Make the learning diverge.", (v, m) => m.dist > 5]],
    f: v => { let w = -2; const path = [w]; for(let i = 0; i < v.n; i++){ w = w - v.eta * 2 * (w - 3); path.push(w); } const m = { w, dist: Math.abs(w - 3) };
      const g = smPlot([[x => (x - 3) ** 2]], [-4, 10], [0, 50], "w", "f(w)", (X, Y) => { const P = x => [smClamp(X(x), 20, 316), smClamp(Y((x - 3) ** 2), 4, 150)];
        return `<polyline class="fg-red" fill="none" stroke-width="1.6" points="${path.map(x => P(x).map(n => n.toFixed(1)).join(",")).join(" ")}"/>` + path.map((x, i) => smDot(...P(x), i === path.length - 1 ? "fg-dot" : "fg-dot2", i === path.length - 1 ? 5 : 3)).join(""); });
      return { eq: [qt`w_{k+1} = w_k - \eta f'(w_k) = w_k - ${qc(1, qn(v.eta))}\cdot 2(w_k - 3)`, qt`w_{k+1} - 3 = (1 - 2\eta)(w_k - 3) = ${qr(1 - 2 * v.eta, 2)}\,(w_k - 3)`, qt`w_{${qc(2, v.n)}} = ${Math.abs(w) > 1e5 ? "\\pm\\infty" : qr(w, 4)}`], m, out: [["w", Math.abs(w) > 1e5 ? "±∞" : smN(w, 4)], [T("avstand til minimum", "distance to minimum"), m.dist > 1e5 ? "∞" : smN(m.dist, 4)], [T("faktor 1 − 2η", "factor 1 − 2η"), smN(1 - 2 * v.eta)]], svg: g.svg }; } },
  // ---------- fasthet ----------
  mohr: { t: ["Mohrs sirkel", "Mohr's circle"], p: [["sx", "σ_x", -100, 100, 10, 60, "MPa", 1], ["sy", "σ_y", -100, 100, 10, -20, "MPa", 3], ["tau", "τ_xy", -60, 60, 5, 30, "MPa", 2]],
    q: ["Sett τ_xy = 0. Hvor ligger hovedspenningene da?", "Set τ_xy = 0. Where are the principal stresses then?"],
    g: [["Ren skjær: få σ₁ = −σ₂ med τ_xy ≠ 0.", "Pure shear: make σ₁ = −σ₂ with τ_xy ≠ 0.", v => v.sx + v.sy === 0 && v.tau !== 0],
        ["Krymp sirkelen til et punkt (ingen skjærspenning i noen retning).", "Shrink the circle to a point (no shear stress in any direction).", (v, m) => m.R < 1e-9],
        ["Få σ₁ = 100 MPa med τ_xy ≠ 0.", "Get σ₁ = 100 MPa with τ_xy ≠ 0.", (v, m) => v.tau !== 0 && Math.abs(m.s1 - 100) < 0.5]],
    f: v => { const C = (v.sx + v.sy) / 2, R = Math.hypot((v.sx - v.sy) / 2, v.tau), s1 = C + R, s2 = C - R, th = 0.5 * Math.atan2(2 * v.tau, v.sx - v.sy) * 180 / Math.PI, k = 0.62, X = s => 160 + s * k, Y = t => 90 + t * k;
      // etikett utenfor sirkelen, i retning fra sentrum mot punktet
      const lab = (s, t, txt, cls) => { const dx = s - C, dy = t, L = Math.hypot(dx, dy) || 1, ux = L > 1e-9 ? dx / L : 1, uy = L > 1e-9 ? dy / L : 0;
        return fgT((X(s) + ux * 10).toFixed(1), (Y(t) + uy * 14 + 4).toFixed(1), txt, "fg-s " + cls, ux >= 0 ? "start" : "end"); };
      return { eq: [qt`C = \frac{${qc(1, v.sx)} + (${qc(3, v.sy)})}{2} = ${qn(C, 1)}`, qt`R = \sqrt{\left(\frac{${qc(1, v.sx)} - (${qc(3, v.sy)})}{2}\right)^2 + (${qc(2, v.tau)})^2} = ${qn(R, 1)}`, qt`\sigma_{1,2} = C \pm R = ${qr(s1, 1, "MPa")},\ ${qr(s2, 1, "MPa")}`], m: { R, s1, s2 }, out: [["σ₁", smN(s1, 1) + " MPa"], ["σ₂", smN(s2, 1) + " MPa"], [T("τ_maks", "τ_max"), smN(R, 1) + " MPa"], ["θ_p", smN(th, 1) + "°"]], svg: `
        ${fgAr(10, 90, 312, 90, "fg-ax", 1.4)}${fgAr(160, 176, 160, 6, "fg-ax", 1.4)}${fgT(312, 104, "σ", "fg-i", "end")}${fgT(150, 14, "τ", "fg-i", "end")}
        <circle cx="${X(C).toFixed(1)}" cy="90" r="${Math.max(0.5, R * k).toFixed(1)}" class="fg-fill2" stroke="var(--accent)" stroke-width="2"/>
        ${smLine(X(v.sx), Y(v.tau), X(v.sy), Y(-v.tau), "fg-red")}${v.tau ? smDim(X(v.sx), 90, X(v.sx), Y(v.tau), v.sx >= C ? -8 : 8, "fg-c2", "") : ""}<circle cx="${X(v.sx).toFixed(1)}" cy="${Y(v.tau).toFixed(1)}" r="5" fill="var(--c1)"/><circle cx="${X(v.sy).toFixed(1)}" cy="${Y(-v.tau).toFixed(1)}" r="5" fill="var(--c3)"/>
        ${smDot(X(s1), 90, "fg-dot2", 4)}${smDot(X(s2), 90, "fg-dot2", 4)}${fgT(X(s1) + 5, 84, "σ₁", "fg-s", "start")}${fgT(X(s2) - 5, 84, "σ₂", "fg-s", "end")}${lab(v.sx, v.tau, "(σ_x, τ)", "fg-c1t")}${lab(v.sy, -v.tau, "(σ_y, −τ)", "fg-c3t")}` }; } },
  buckle: { t: ["Knekking av søyle (Euler)", "Column buckling (Euler)"], p: [["d", ["diameter d", "diameter d"], 20, 80, 5, 40, "mm", 3], ["L", "L", 1, 6, 0.5, 3, "m", 2], ["k", ["opplagring (0–3)", "supports (0–3)"], 0, 3, 1, 1, "", 1]],
    q: ["Doble lengden. Hvor mye mindre last tåler søylen nå?", "Double the length. How much less load can the column carry now?"],
    g: [["Tål over 500 kN med en 5 m lang stålsøyle.", "Carry more than 500 kN with a 5 m long steel column.", (v, m) => v.L === 5 && m.P > 500],
        ["Bær 100 kN med L = 4 m og tynnest mulig søyle.", "Carry 100 kN with L = 4 m and the thinnest possible column.", (v, m) => v.L === 4 && m.P >= 100 && m.Pthin < 100]],
    f: v => { const K = [2, 1, 0.7, 0.5][Math.round(v.k)], nm = [T("fast–fri", "fixed–free"), T("ledd–ledd", "pinned–pinned"), T("fast–ledd", "fixed–pinned"), T("fast–fast", "fixed–fixed")][Math.round(v.k)];
      const Pcr = d => Math.PI ** 2 * 210000 * Math.PI * d ** 4 / 64 / (K * v.L * 1000) ** 2 / 1000, P = Pcr(v.d), h = 40 + v.L / 6 * 110, top = 160 - h, w = Math.max(3, v.d / 6);
      // knekkform (bunnen er s = 0): fast–fri, ledd–ledd, fast–ledd (tilnærmet), fast–fast
      const amp = 14, sh = s => K === 2 ? 1 - Math.cos(s * Math.PI / 2) : K === 1 ? Math.sin(s * Math.PI) : K === 0.5 ? (1 - Math.cos(2 * Math.PI * s)) / 2 : Math.sin(Math.PI * s) * s ** 0.7 / 0.62;
      return { eq: [qt`I = \frac{\pi d^4}{64} = \frac{\pi\cdot ${qc(3, v.d)}^4}{64} = ${qn(Math.PI * v.d ** 4 / 64, 0)}${qu("mm^4")}`, qt`P_{cr} = \frac{\pi^2 E I}{(KL)^2} = \frac{\pi^2\cdot 210\,000\cdot I}{(${qc(1, qn(K, 1))}\cdot ${qc(2, qn(v.L * 1000, 0))})^2} = ${qr(P, 1, "kN")}`], m: { P, Pthin: v.d > 20 ? Pcr(v.d - 5) : 0 }, out: [["P_cr = π²EI/(KL)²", smN(P, 1) + " kN"], ["K", smN(K, 1) + " (" + nm + ")"]], svg: `
        ${fgGround(160, 160, 80)}<path class="fg-mut" fill="none" stroke-width="${w.toFixed(1)}" d="M160 160 L160 ${top.toFixed(1)}" opacity=".45"/>
        <path class="fg-c3" fill="none" stroke-width="${w.toFixed(1)}" stroke-linecap="round" d="${fgPath(s => [160 + amp * sh(s), 160 - s * h], 0, 1, 40)}"/>
        ${fgAr(160 + amp * sh(1), top - 30, 160 + amp * sh(1), top - 4, "fg-red", 2.4)}${fgT(172 + amp * sh(1), top - 14, "P", "fg-i fg-redt", "start")}${smDim(200, 160, 200, top, -1, "fg-c2", "")}${fgT(208, 100, "L = " + smN(v.L, 1) + " m", "fg-s fg-c2t", "start")}${fgT(160 - w / 2 - 6, 150, "d", "fg-s fg-c3t", "end")}` }; } },
  // ---------- termo og økonomi ----------
  carnot: { t: ["Carnot: virkningsgrad og COP", "Carnot: efficiency and COP"], p: [["Th", "T_H", 300, 900, 10, 600, "K", 1], ["Tc", "T_C", 250, 400, 5, 300, "K", 2]],
    q: ["Hvorfor blir en varmepumpe bedre jo mindre temperaturforskjellen er?", "Why does a heat pump get better the smaller the temperature difference is?"],
    g: [["Varmekraftmaskin: få η over 60 %.", "Heat engine: get η above 60 %.", (v, m) => m.eta > 0.6],
        ["Varmepumpe: få COP over 5.", "Heat pump: get the COP above 5.", (v, m) => m.cop > 5],
        ["Fryser ved T_C = 255 K: få kjøle-COP over 3.", "Freezer at T_C = 255 K: get the cooling COP above 3.", (v, m) => v.Tc === 255 && m.copK > 3]],
    f: v => { const ok = v.Th > v.Tc, eta = ok ? 1 - v.Tc / v.Th : 0, cop = ok ? v.Th / (v.Th - v.Tc) : Infinity, copK = ok ? v.Tc / (v.Th - v.Tc) : Infinity, wq = smClamp(eta * 60, 2, 60);
      return { eq: ok ? [qt`\eta = 1 - \frac{T_C}{T_H} = 1 - \frac{${qc(2, v.Tc)}}{${qc(1, v.Th)}} = ${qr(eta * 100, 1, "\\%")}`, qt`\mathrm{COP_{VP}} = \frac{T_H}{T_H - T_C} = \frac{${qc(1, v.Th)}}{${qc(1, v.Th)} - ${qc(2, v.Tc)}} = ${qr(cop, 2)}`] : [qt`T_H = ${qc(1, v.Th)} \le ${qc(2, v.Tc)} = T_C:\ \text{${T("ingen varmekraft", "no heat engine")}}`], m: { eta, cop, copK }, out: [["η = 1 − T_C/T_H", ok ? smPct(eta * 100) : "–"], ["COP_VP = T_H/(T_H − T_C)", ok ? smN(cop) : "–"], ["COP_K = T_C/(T_H − T_C)", ok ? smN(copK) : "–"]], svg: `
        <rect class="fg-hot" x="100" y="8" width="120" height="30" rx="8" opacity=".75"/>${fgT(160, 28, "T_H = " + v.Th + " K", "fg-b")}
        <rect class="fg-cold" x="100" y="142" width="120" height="30" rx="8" opacity=".75"/>${fgT(160, 162, "T_C = " + v.Tc + " K", "fg-b")}
        <circle class="fg-box" cx="160" cy="90" r="26"/>${fgT(160, 95, "W", "fg-b")}
        ${fgAr(160, 40, 160, 62, "fg-red", 4)}${fgAr(160, 118, 160, 140, "fg-acc", Math.max(1.5, 4 * (1 - eta)))}${fgAr(188, 90, 188 + wq, 90, "fg-ok", 3)}${fgT(196 + wq, 94, "η = " + (ok ? smN(eta * 100, 0) + " %" : "–"), "fg-s fg-okt", "start")}` }; } },
  npv: { t: ["Nåverdi og internrente", "Net present value and IRR"], p: [["a", ["innbetaling per år", "cash flow per year"], 50, 400, 10, 150, T("tusen kr", "k NOK"), 1], ["n", ["levetid", "lifetime"], 3, 20, 1, 10, T("år", "yr"), 2], ["r", ["kalkulasjonsrente", "discount rate"], 0, 20, 0.5, 5, "%", 3]],
    q: ["Investering: 1 million kr. Hvorfor faller nåverdien når renta øker?", "Investment: 1 million NOK. Why does the NPV fall when the rate rises?"],
    g: [["Finn internrenten: få NPV innen ±20 000 kr fra null.", "Find the IRR: get the NPV within ±20 000 NOK of zero.", (v, m) => Math.abs(m.npv) <= 20],
        ["10 % rente og 8 års levetid: lønnsomt med lavest mulig innbetaling.", "10 % rate and an 8-year lifetime: profitable with the lowest possible cash flow.", v => v.r === 10 && v.n === 8 && smNpv(v.a, 8, 10) >= 0 && smNpv(v.a - 10, 8, 10) < 0]],
    f: v => { const m = { npv: smNpv(v.a, v.n, v.r) }; let lo = -0.9, hi = 5, irr = null;
      if(smNpv(v.a, v.n, 0) > 0){ for(let i = 0; i < 80; i++){ const mid = (lo + hi) / 2; if(smNpv(v.a, v.n, mid * 100) > 0) lo = mid; else hi = mid; } irr = lo * 100; }
      const top = Math.max(500, smNpv(v.a, v.n, 0) * 1.1);
      const g = smPlot([[r => smNpv(v.a, v.n, r)]], [0, 30], [-1000, top], "r (%)", T("NPV (tusen kr)", "NPV (k NOK)"), (X, Y) => smDot(X(v.r), Y(smClamp(m.npv, -1000, top))) + (irr != null && irr <= 30 ? smLine(X(irr), Y(-1000), X(irr), Y(top), "fg-ok", "4 3") + fgT(X(irr) + 4, Y(-1000) - 6, "IRR", "fg-s fg-okt", "start") : ""));
      return { eq: [Math.abs(v.r) < 1e-9 ? qt`\mathrm{NPV} = -1000 + a\,n = -1000 + ${qc(1, v.a)}\cdot ${qc(2, v.n)} = ${qr(m.npv, 0)}` : qt`\mathrm{NPV} = -1000 + a\,\frac{1 - (1 + r)^{-n}}{r}`, qt`= -1000 + ${qc(1, v.a)}\cdot\frac{1 - ${qc(3, qn(1 + v.r / 100, 3))}^{-${qc(2, v.n)}}}{${qc(3, qn(v.r / 100, 3))}} = ${qr(m.npv, 0)}`, qt`\mathrm{NPV} ${qrel(m.npv, 0, "ge", 0.5)} 0 \;\Rightarrow\; \text{${m.npv >= 0 ? T("lønnsom", "profitable") : T("ikke lønnsom", "not profitable")}}`], m, out: [["NPV", nf(Math.round(m.npv * 1000), 0) + " " + T("kr", "NOK")], [T("internrente", "IRR"), irr == null ? "–" : smN(irr, 1) + " %"]], svg: g.svg }; } }
});
function smNpv(a, n, r){ const i = r / 100; return -1000 + (Math.abs(i) < 1e-9 ? a * n : a * (1 - (1 + i) ** -n) / i); }

// Oppgaver til simuleringene som fantes fra før.
const smG = (name, g) => { if(SIMS[name]) SIMS[name].g = g; };
smG("pctrl", [["Få det stasjonære avviket under 5 %.", "Get the steady-state error below 5 %.", v => 1 / (1 + v.K) < 0.05],
  ["Med τ = 2 s: gjør den lukkede sløyfa raskere enn 0,2 s.", "With τ = 2 s: make the closed loop faster than 0.2 s.", v => v.tau === 2 && v.tau / (1 + v.K) < 0.2]]);
smG("lever", [["Balanser vippa med F₁ = 100 N og F₂ = 25 N.", "Balance the see-saw with F₁ = 100 N and F₂ = 25 N.", v => v.F1 === 100 && v.F2 === 25 && Math.abs(v.F1 * v.a1 - v.F2 * v.a2) < 0.01]]);
smG("incline", [["μ = 0,5: finn den største vinkelen der klossen står i ro.", "μ = 0.5: find the largest angle where the block stays put.", v => { const sl = a => Math.tan(a * Math.PI / 180) > v.mu + 1e-9; return v.mu === 0.5 && !sl(v.a) && sl(v.a + 1); }]]);
smG("projectile", [["Treff et mål 30 m unna (±0,5 m) med v₀ = 20 m/s.", "Hit a target 30 m away (±0.5 m) with v₀ = 20 m/s.", v => v.v === 20 && Math.abs(v.v * v.v * Math.sin(2 * v.a * Math.PI / 180) / 9.81 - 30) <= 0.5],
  ["Treff det samme målet med en høy bane (θ > 45°).", "Hit the same target with a high trajectory (θ > 45°).", v => v.v === 20 && v.a > 45 && Math.abs(v.v * v.v * Math.sin(2 * v.a * Math.PI / 180) / 9.81 - 30) <= 0.5]]);
smG("riemann", [["Få feilen under 0,01.", "Get the error below 0.01.", v => { const h = 3 / v.n; let S = 0; for(let i = 0; i < v.n; i++){ const x = i * h + h / 2; S += x * x * h; } return Math.abs(9 - S) < 0.01; }]]);
smG("subnet", [["Minste nett med plass til minst 50 maskiner.", "The smallest network with room for at least 50 hosts.", v => v.n === 26]]);
smG("bits", [["Lag tallet 0xA5.", "Make the number 0xA5.", v => v.n === 165], ["Lag det største tallet der bare de fire nederste bitene er 0.", "Make the largest number where only the four lowest bits are 0.", v => v.n === 240]]);
smG("lowpass", [["f_c = 500 Hz: finn frekvensen som dempes nøyaktig 3 dB.", "f_c = 500 Hz: find the frequency that is attenuated by exactly 3 dB.", v => v.fc === 500 && Math.abs(10 * Math.log10(1 + (v.fin / v.fc) ** 2) - 3.01) < 0.2],
  ["Demp et 2 kHz-signal med minst 20 dB.", "Attenuate a 2 kHz signal by at least 20 dB.", v => v.fin === 2000 && 10 * Math.log10(1 + (v.fin / v.fc) ** 2) >= 20]]);
smG("resonance", [["Få forsterkningen over 5.", "Get the magnification above 5.", v => 1 / Math.sqrt((1 - v.r * v.r) ** 2 + (2 * v.z * v.r) ** 2) > 5],
  ["Vibrasjonsisolasjon: forsterkning under 0,25.", "Vibration isolation: magnification below 0.25.", v => 1 / Math.sqrt((1 - v.r * v.r) ** 2 + (2 * v.z * v.r) ** 2) < 0.25]]);
smG("beam", [["P = 20 kN: plasser lasten der momentet blir størst.", "P = 20 kN: place the load where the moment is largest.", v => v.P === 20 && Math.abs(v.a - 3) < 1e-9]]);
smG("hooke", [["F = 100 kN: minste diameter som ikke gir flyt.", "F = 100 kN: the smallest diameter that does not yield.", v => { const s = d => v.F * 1000 / (Math.PI * d * d / 4); return v.F === 100 && s(v.d) <= 355 && s(v.d - 1) > 355; }]]);
smG("tangent", [["Finn et punkt der tangenten er vannrett.", "Find a point where the tangent is horizontal.", v => Math.abs(v.x * v.x - 1) < 1e-9], ["Finn et punkt der stigningstallet er 3.", "Find a point where the slope is 3.", v => Math.abs(v.x * v.x - 1 - 3) < 1e-9]]);
smG("line", [["Lag linjen gjennom (0, 2) og (2, −2).", "Make the line through (0, 2) and (2, −2).", v => v.a === -2 && v.b === 2]]);
smG("vector", [["Få |a + b| = 5 med |a| = 4.", "Get |a + b| = 5 with |a| = 4.", v => v.a === 4 && Math.abs(Math.hypot(v.a * Math.cos(v.th * Math.PI / 180) + 3, v.a * Math.sin(v.th * Math.PI / 180)) - 5) < 1e-9]]);
smG("expo", [["Få doblingstiden under 10 år.", "Get the doubling time below 10 years.", v => Math.log(2) / Math.log(1 + v.p / 100) < 10]]);
smG("spring", [["Still inn en periode på 1 s (±0,01 s).", "Tune the period to 1 s (±0.01 s).", v => Math.abs(2 * Math.PI * Math.sqrt(v.m / v.k) - 1) <= 0.01]]);
smG("combi", [["n = 10: finn k som gir flest kombinasjoner.", "n = 10: find the k that gives the most combinations.", v => v.n === 10 && v.k === 5]]);
smG("normal", [["Finn k slik at over 99 % ligger innenfor ±kσ.", "Find k so that more than 99 % lies within ±kσ.", v => v.k >= 3]]);

// Flere simuleringer per enhet: SIM_MAP-verdien blir en liste.
for(const [k, name] of [["ELFT2400:1", "pid"], ["ELFT2400:3", "second"], ["ELFT2400:0", "second"], ["SVING:1", "second"], ["ELPE1300:1", "rlc"], ["ELEK:2", "fourier"], ["DAVE3705:1", "fourier"],
  ["ELFT2500:2", "alias"], ["ELFT2500:1", "alias"], ["GMAT:2", "quad"], ["GMAT:3", "quad"], ["GMAT:5", "trig"], ["MEK1000:2", "taylor"], ["MEK2000:0", "matrix"], ["MEK2000:1", "matrix"], ["ELVE3610:0", "matrix"],
  ["NUM:2", "euler"], ["MEK2000:2", "euler"], ["NUM:0", "newton"], ["ML:1", "gd"], ["MEK3100:2", "gd"], ["FAST:2", "mohr"], ["FAST:2", "buckle"], ["BYGG:0", "buckle"], ["MATS2100:2", "carnot"], ["MATS2100:3", "carnot"],
  ["OKON:1", "npv"], ["OKON:0", "npv"]]){
  const cur = SIM_MAP[k]; SIM_MAP[k] = cur ? [].concat(cur, name).filter((x, i, a) => a.indexOf(x) === i) : name;
}
