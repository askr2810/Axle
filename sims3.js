// ============================================================
//  PRØV SELV, runde 3 – videregående (realfag) og sykepleie.
//  Samme format som sims.js: t, p = [nøkkel, etikett, min, maks, steg, start, enhet, farge], q, g = oppgaver, f(v) → { svg, out, m }.
// ============================================================
(() => {
const bar = (x, y, w, h, col, op = 1) => `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(0, w).toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" rx="3" style="fill:${col};opacity:${op}"/>`;
const C = n => `var(--c${n})`;
const pct = x => smN(x, 1) + " %";

Object.assign(SIMS, {
  // ---------- 1T: enhetssirkelen ----------
  unitcircle: { t: ["Enhetssirkelen", "The unit circle"], p: [["v", "v", 0, 360, 5, 30, "°", 1]],
    q: ["Hvor er sin v størst? Hvor er cos v negativ?", "Where is sin v largest? Where is cos v negative?"],
    g: [["Finn en vinkel der sin v = 0,5 og cos v er negativ.", "Find an angle where sin v = 0.5 and cos v is negative.", v => v.v === 150],
        ["Finn vinkelen der cos v = −1.", "Find the angle where cos v = −1.", v => v.v === 180]],
    f: v => { const cx = 100, cy = 92, r = 68, a = v.v * Math.PI / 180, px = cx + r * Math.cos(a), py = cy - r * Math.sin(a), s = Math.sin(a), c = Math.cos(a);
      const tn = Math.abs(c) < 1e-9 ? T("udefinert", "undefined") : smN(s / c, 3);
      return { eq: [qt`\sin ${qc(1, v.v + "^\\circ")} = ${qr(s, 3)}, \quad \cos ${qc(1, v.v + "^\\circ")} = ${qr(c, 3)}`, Math.abs(c) < 1e-9 ? qt`\tan ${qc(1, v.v + "^\\circ")} = \frac{\sin}{\cos} = \frac{${qn(s, 0)}}{0}:\ \text{${T("udefinert", "undefined")}}` : qt`\tan ${qc(1, v.v + "^\\circ")} = \frac{\sin}{\cos} = \frac{${qn(s, 3)}}{${qn(c, 3)}} = ${qr(s / c, 3)}`, qt`\sin^2 + \cos^2 = ${qn(s * s, 3)} + ${qn(c * c, 3)} = 1`], out: [["sin v", smN(s, 3)], ["cos v", smN(c, 3)], ["tan v", tn]], svg: `
        <circle class="fg-line" cx="${cx}" cy="${cy}" r="${r}" fill="none" opacity=".5"/>
        ${fgAr(cx - r - 10, cy, cx + r + 14, cy, "fg-ax", 1.2)}${fgAr(cx, cy + r + 8, cx, cy - r - 12, "fg-ax", 1.2)}
        ${smArc(cx, cy, 22, 0, v.v === 0 ? 0.01 : v.v, "fg-c1", "")}
        <line class="fg-mut" x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke-width="2"/>
        <line class="fg-c2" x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${cy}" stroke-width="4"/>
        <line class="fg-c3" x1="${px.toFixed(1)}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke-width="4"/>
        ${smDot(px, py)}
        ${fgT(222, 58, "cos v = " + smN(c, 2), "fg-b fg-c2t", "start")}${fgT(222, 84, "sin v = " + smN(s, 2), "fg-b fg-c3t", "start")}${fgT(222, 110, "v = " + v.v + "°", "fg-b fg-c1t", "start")}` }; } },

  // ---------- Fysikk 1: fartsgraf ----------
  vt: { t: ["Fart–tid-graf", "Velocity–time graph"], p: [["v0", "v₀", 0, 20, 1, 5, "m/s", 1], ["a", "a", -4, 4, 0.5, 2, "m/s²", 2], ["t", "t", 1, 10, 1, 5, "s", 3]],
    q: ["Arealet under grafen er strekningen. Hva skjer med arealet når a er negativ?", "The area under the graph is the distance. What happens to the area when a is negative?"],
    g: [["Få bilen til å stå helt stille etter nøyaktig 5 s.", "Make the car come to a complete stop after exactly 5 s.", v => v.t === 5 && v.v0 > 0 && Math.abs(v.v0 + v.a * 5) < 1e-9],
        ["Kjør nøyaktig 100 m på 10 s med konstant fart.", "Drive exactly 100 m in 10 s at constant speed.", v => v.a === 0 && v.t === 10 && v.v0 === 10]],
    f: v => { const vt = t => v.v0 + v.a * t, s = v.v0 * v.t + 0.5 * v.a * v.t * v.t;
      const g = smPlot([[vt, "fg-acc", 2.6]], [0, 10], [-45, 65], "t (s)", "v", (X, Y) => {
        let pts = `${X(0)},${Y(0)} `; for(let i = 0; i <= 30; i++){ const tt = v.t * i / 30; pts += `${X(tt).toFixed(1)},${Y(vt(tt)).toFixed(1)} `; } pts += `${X(v.t)},${Y(0)}`;
        return `<polygon points="${pts}" style="fill:var(--c3);opacity:.22"/>` + smLine(X(v.t), Y(-45), X(v.t), Y(65), "fg-c3", "4 3") + smDot(X(v.t), Y(vt(v.t))) + fgT(X(v.t) + 4, Y(-45) - 4, "t", "fg-s fg-c3t", "start"); });
      return { eq: [qt`v = v_0 + at = ${qc(1, v.v0)} + ${v.a < 0 ? "(" + qc(2, qn(v.a, 1)) + ")" : qc(2, qn(v.a, 1))}\cdot ${qc(3, v.t)} = ${qr(vt(v.t), 1, "m/s")}`, qt`s = v_0 t + \tfrac12 a t^2 = ${qc(1, v.v0)}\cdot ${qc(3, v.t)} + \tfrac12\cdot ${v.a < 0 ? "(" + qc(2, qn(v.a, 1)) + ")" : qc(2, qn(v.a, 1))}\cdot ${qc(3, v.t)}^2 = ${qr(s, 1, "m")}`], out: [["v = v₀ + at", smN(vt(v.t), 1) + " m/s"], ["s = v₀t + ½at²", smN(s, 1) + " m"]], svg: g.svg }; } },

  // ---------- Fysikk 1: energibevaring ----------
  energy: { t: ["Energibevaring i fritt fall", "Energy conservation in free fall"], p: [["h", "h", 1, 20, 1, 10, "m", 1], ["m", "m", 1, 10, 1, 2, "kg", 3], ["x", ["falt", "fallen"], 0, 100, 5, 0, "%", 2]],
    q: ["Summen av søylene endrer seg ikke. Hvorfor?", "The sum of the bars does not change. Why?"],
    g: [["Finn punktet der kinetisk og potensiell energi er like store.", "Find the point where kinetic and potential energy are equal.", v => v.x === 50],
        ["Få farten ved bakken over 15 m/s.", "Make the speed at the ground exceed 15 m/s.", v => v.x === 100 && Math.sqrt(2 * 9.81 * v.h) > 15]],
    f: v => { const E = v.m * 9.81 * v.h, Ek = E * v.x / 100, Ep = E - Ek, sp = Math.sqrt(2 * 9.81 * v.h * v.x / 100), top = 20, bot = 160, by = top + (bot - top) * v.x / 100, H = bot - top - 10;
      return { eq: [qt`E = mgh = ${qc(3, v.m)}\cdot ${qn(9.81)}\cdot ${qc(1, v.h)} = ${qr(E, 0, "J")}`, qt`E_p + E_k = ${qn(Ep, 0)} + ${qn(Ek, 0)} = ${qn(E, 0)}${qu("J")} \;${qc(6, "=")}\; E`, qt`v = \sqrt{2g\cdot ${qc(2, qn(v.x / 100, 2))}\,h} = ${qr(sp, 2, "m/s")}`], out: [["E_p = mgh", smN(Ep, 0) + " J"], ["E_k = ½mv²", smN(Ek, 0) + " J"], ["v", smN(sp, 2) + " m/s"]], svg: `
        <line class="fg-line" x1="40" y1="${bot + 2}" x2="120" y2="${bot + 2}"/>${smLine(60, top, 60, bot, "fg-mut", "3 3")}
        <circle cx="80" cy="${(by - 8).toFixed(1)}" r="8" style="fill:var(--c1)"/>${fgT(34, top + 6, smN(v.h, 0) + " m", "fg-s", "end")}
        ${bar(170, bot - H * Ep / E, 40, H * Ep / E, C(1))}${bar(230, bot - H * Ek / E, 40, H * Ek / E, C(2))}
        <line class="fg-mut" x1="160" y1="${bot - H}" x2="280" y2="${bot - H}" stroke-dasharray="4 3" stroke-width="1.4"/>
        ${fgT(190, bot + 14, "E_p", "fg-s fg-c1t")}${fgT(250, bot + 14, "E_k", "fg-s fg-c2t")}${fgT(290, bot - H + 4, T("sum", "total"), "fg-s", "start")}` }; } },

  // ---------- Fysikk 1 / farmakologi: halveringstid ----------
  decay: { t: ["Halveringstid", "Half-life"], p: [["T", "T½", 1, 12, 1, 4, "h", 1], ["t", "t", 0, 48, 1, 10, "h", 2]],
    q: ["Hvor mye er igjen etter to halveringstider? Etter fire?", "How much is left after two half-lives? After four?"],
    g: [["Finn en tid der 12,5 % er igjen.", "Find a time when 12.5 % is left.", v => Math.abs(v.t / v.T - 3) < 1e-9],
        ["Hvilken halveringstid gir 25 % igjen etter 12 h?", "Which half-life leaves 25 % after 12 h?", v => v.T === 6 && v.t === 12]],
    f: v => { const N = t => 100 * Math.pow(0.5, t / v.T);
      const g = smPlot([[N, "fg-acc", 2.6]], [0, 48], [0, 108], "t (h)", "%", (X, Y) => {
        let s = ""; for(let k = 1; k * v.T <= 48 && k <= 4; k++) s += smLine(X(k * v.T), Y(0), X(k * v.T), Y(N(k * v.T)), "fg-c1", "3 3");
        return s + smLine(X(v.t), Y(0), X(v.t), Y(N(v.t)), "fg-c2") + smDot(X(v.t), Y(N(v.t))) + fgT(Math.min(X(v.t) + 6, 250), Math.max(Y(N(v.t)) - 8, 26), smN(N(v.t), 1) + " %", "fg-s fg-c2t", "start"); });
      return { eq: [qt`N = N_0\left(\tfrac12\right)^{t/T_{1/2}} = 100\,\%\cdot\left(\tfrac12\right)^{${qc(2, v.t)}/${qc(1, v.T)}} = ${qr(N(v.t), 1, "\\%")}`], out: [[T("igjen", "left"), pct(N(v.t))], [T("halveringstider", "half-lives"), smN(v.t / v.T, 2)]], svg: g.svg }; } },

  // ---------- Farmakologi: gjentatte doser og steady state ----------
  doses: { t: ["Gjentatte doser og steady state", "Repeated doses and steady state"], p: [["D", ["dose", "dose"], 100, 1000, 100, 500, "mg", 1], ["T", "T½", 2, 24, 1, 6, "h", 2], ["tau", ["doseintervall", "dose interval"], 4, 24, 2, 8, "h", 3]],
    q: ["Hvor mange doser tar det før toppene flater ut? Sammenlign med 4–5 halveringstider.", "How many doses before the peaks level out? Compare with 4–5 half-lives."],
    g: [["Gjør svingningene små: laveste nivå over 70 % av høyeste.", "Make the swings small: the lowest level above 70 % of the highest.", v => Math.pow(2, -v.tau / v.T) > 0.7],
        ["Gi en dose hver halveringstid.", "Give a dose every half-life.", v => v.tau === v.T]],
    f: v => { const k = Math.pow(0.5, 1 / v.T), A = t => { let s = 0; for(let n = 0; n * v.tau <= t + 1e-9; n++) s += v.D * Math.pow(k, t - n * v.tau); return s; };
      const mx = v.D / (1 - Math.pow(k, v.tau)), mn = mx * Math.pow(k, v.tau);
      const g = smPlot([[A, "fg-acc", 2.2]], [0, 72], [0, mx * 1.15], "t (h)", "mg", (X, Y) => smLine(X(0), Y(mx), X(72), Y(mx), "fg-c1", "4 3") + smLine(X(0), Y(mn), X(72), Y(mn), "fg-c3", "4 3") +
        fgT(X(72), Y(mx) - 5, T("topp", "peak"), "fg-s fg-c1t", "end") + fgT(X(72), Y(mn) + 13, T("bunn", "trough"), "fg-s fg-c3t", "end"));
      return { eq: [qt`k = \left(\tfrac12\right)^{\tau/T_{1/2}} = \left(\tfrac12\right)^{${qc(3, v.tau)}/${qc(2, v.T)}} = ${qn(Math.pow(k, v.tau), 3)}`, qt`C_{\max} = \frac{D}{1 - k} = \frac{${qc(1, v.D)}}{1 - ${qn(Math.pow(k, v.tau), 3)}} = ${qr(mx, 0, "mg")}`, qt`C_{\min} = C_{\max}\cdot k = ${qr(mn, 0, "mg")}`], out: [[T("topp (steady state)", "peak (steady state)"), smN(mx, 0) + " mg"], [T("bunn", "trough"), smN(mn, 0) + " mg"]], svg: g.svg }; } },

  // ---------- Kjemi 1: pH-skalaen ----------
  ph: { t: ["pH-skalaen", "The pH scale"], p: [["x", "pH", 0, 14, 0.1, 5, "", 1]],
    q: ["Én pH-enhet ned betyr ti ganger så mye H₃O⁺. Sjekk det med tallene.", "One pH unit down means ten times as much H₃O⁺. Check it with the numbers."],
    g: [["Still inn pH-en til blod (omtrent 7,4).", "Set the pH of blood (about 7.4).", v => Math.abs(v.x - 7.4) < 0.051],
        ["Finn pH når [H₃O⁺] = 0,001 mol/L.", "Find the pH when [H₃O⁺] = 0.001 mol/L.", v => Math.abs(v.x - 3) < 0.051]],
    f: v => { const L = 20, W = 280, X = p => L + W * p / 14, cols = ["#D7263D", "#E4572E", "#F29E4C", "#F1C453", "#EFEA5A", "#B9E769", "#83E377", "#16DB93", "#0DB39E", "#048BA8", "#2C699A", "#3D5A80", "#54478C", "#6D3F8C"];
      const ex = [[1.5, T("magesyre", "stomach acid")], [3, T("appelsin", "orange")], [5, T("kaffe", "coffee")], [7, T("vann", "water")], [8.3, T("natron", "baking soda")], [10.5, T("såpe", "soap")], [13, T("lut", "lye")]];
      const h = Math.pow(10, -v.x), kind = v.x < 6.95 ? T("sur", "acidic") : v.x > 7.05 ? T("basisk", "basic") : T("nøytral", "neutral");
      return { eq: [qt`[\mathrm{H_3O^+}] = 10^{-\mathrm{pH}} = 10^{-${qc(1, qn(v.x, 1))}} = ${qr(h / Math.pow(10, Math.floor(Math.log10(h))), 2)}\cdot 10^{${Math.floor(Math.log10(h))}}${qu("mol/L")}`, qt`\mathrm{pH} = ${qc(1, qn(v.x, 1))} \;${qrel(v.x, 7, "n", 0.04)}\; 7 \;\Rightarrow\; \text{${kind}}`], out: [["pH", smN(v.x, 1)], ["[H₃O⁺]", h.toExponential(1).replace(".", LANG === "en" ? "." : ",") + " mol/L"], [T("løsningen er", "the solution is"), kind]], svg: `
        ${cols.map((c, i) => bar(X(i), 70, W / 14 + 0.5, 34, c)).join("")}
        ${[0, 7, 14].map(p => fgT(X(p), 168, String(p), "fg-s")).join("")}
        ${ex.map(([p, s], i) => `<line class="fg-mut" x1="${X(p).toFixed(1)}" y1="${i % 2 ? 104 : 62}" x2="${X(p).toFixed(1)}" y2="${i % 2 ? 136 : 50}" stroke-width="1"/>` + fgT(X(p), i % 2 ? 148 : 44, s, "fg-s")).join("")}
        <path d="M${X(v.x).toFixed(1)} 64l-7-12h14z" style="fill:var(--ink)"/><rect x="${(X(v.x) - 2).toFixed(1)}" y="66" width="4" height="42" rx="2" style="fill:var(--ink)"/>
` }; } },

  // ---------- Kjemi 2: titreringskurve ----------
  titration: { t: ["Titrering: 25 mL 0,1 M HCl med 0,1 M NaOH", "Titration: 25 mL 0.1 M HCl with 0.1 M NaOH"], p: [["V", ["NaOH tilsatt", "NaOH added"], 0, 50, 1, 10, "mL", 1]],
    q: ["Hvorfor stiger pH så brått rundt 25 mL?", "Why does the pH rise so sharply around 25 mL?"],
    g: [["Finn ekvivalenspunktet.", "Find the equivalence point.", v => v.V === 25],
        ["Finn det første volumet der pH er over 11.", "Find the first volume where the pH is above 11.", v => { const f = V => { const nA = 2.5, nB = 0.1 * V, tot = 25 + V; return nB < nA ? -Math.log10((nA - nB) / tot) : nB === nA ? 7 : 14 + Math.log10((nB - nA) / tot); }; return f(v.V) > 11 && f(v.V - 1) <= 11; }]],
    f: v => { const pH = V => { const nA = 2.5, nB = 0.1 * V, tot = 25 + V; return Math.abs(nB - nA) < 1e-9 ? 7 : nB < nA ? -Math.log10((nA - nB) / tot) : 14 + Math.log10((nB - nA) / tot); };
      const g = smPlot([[pH, "fg-acc", 2.6]], [0, 50], [0, 14], "V (mL)", "pH", (X, Y) => smLine(X(25), Y(0), X(25), Y(14), "fg-c3", "4 3") + fgT(X(25) + 4, Y(13), T("ekv.", "equiv."), "fg-s fg-c3t", "start") + smDot(X(v.V), Y(pH(v.V))));
      return { eq: [qt`n_{\mathrm{NaOH}} = 0{,}1\cdot ${qc(1, v.V)} = ${qn(0.1 * v.V, 1)}\,\mathrm{mmol} \;${qrel(0.1 * v.V, 2.5, "n", 1e-9)}\; 2{,}5\,\mathrm{mmol} = n_{\mathrm{HCl}}`, Math.abs(0.1 * v.V - 2.5) < 1e-9 ? qt`\text{${T("ekvivalens", "equivalence")}}:\ \mathrm{pH} = ${qr(7, 0)}` : 0.1 * v.V < 2.5 ? qt`\mathrm{pH} = -\log\frac{2{,}5 - ${qn(0.1 * v.V, 1)}}{25 + ${qc(1, v.V)}} = ${qr(pH(v.V), 2)}` : qt`\mathrm{pH} = 14 + \log\frac{${qn(0.1 * v.V, 1)} - 2{,}5}{25 + ${qc(1, v.V)}} = ${qr(pH(v.V), 2)}`], out: [["pH", smN(pH(v.V), 2)], [T("ekvivalenspunkt", "equivalence point"), "25 mL"]], svg: g.svg }; } },

  // ---------- R1/S1: binomisk fordeling ----------
  binom: { t: ["Binomisk fordeling", "The binomial distribution"], p: [["n", "n", 1, 20, 1, 10, "", 1], ["p", "p", 0.05, 0.95, 0.05, 0.5, "", 2], ["k", "k", 0, 20, 1, 5, "", 3]],
    q: ["Flytt p. Hvor ligger toppen av fordelingen i forhold til np?", "Move p. Where is the peak of the distribution compared with np?"],
    g: [["Med n = 10: finn p slik at 3 er det mest sannsynlige antallet.", "With n = 10: find p so that 3 is the most likely number.", (v, m) => v.n === 10 && m.mode === 3],
        ["Gjør P(X = k) større enn 0,5.", "Make P(X = k) larger than 0.5.", (v, m) => m.pk > 0.5]],
    f: v => { const nCk = (n, k) => { let r = 1; for(let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; }, P = k => nCk(v.n, k) * Math.pow(v.p, k) * Math.pow(1 - v.p, v.n - k);
      const ps = Array.from({ length: v.n + 1 }, (_, k) => P(k)), mxp = Math.max(...ps), L = 44, W = 256, bw = W / (v.n + 1), H = 118;
      let mode = 0; ps.forEach((x, k) => { if(x > ps[mode]) mode = k; });
      const pk = v.k <= v.n ? P(v.k) : 0;
      const svg = ps.map((x, k) => bar(L + k * bw + 1, 150 - H * x / mxp, bw - 2, H * x / mxp, k === v.k ? C(3) : C(1), k === v.k ? 1 : 0.55)).join("") +
        `<line class="fg-ax" x1="${L}" y1="150" x2="${L + W}" y2="150" stroke-width="1.4"/>` + fgT(L, 164, "0", "fg-s") + fgT(L + W - bw / 2, 164, String(v.n), "fg-s") +
        (v.k <= v.n ? fgT(L + v.k * bw + bw / 2, Math.max(24, 150 - H * pk / mxp - 6), "k", "fg-s fg-c3t") : "");
      return { eq: [qt`P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}`, qt`= \binom{${qc(1, v.n)}}{${qc(3, v.k)}}\cdot ${qc(2, qn(v.p))}^{${qc(3, v.k)}}\cdot ${qn(1 - v.p)}^{${v.n - v.k}} = ${qr(pk, 4)}`, qt`E(X) = np = ${qc(1, v.n)}\cdot ${qc(2, qn(v.p))} = ${qr(v.n * v.p, 2)}`], m: { mode, pk }, out: [["P(X = k)", smN(pk, 4)], ["E(X) = np", smN(v.n * v.p, 2)]], svg }; } },

  // ---------- R2: geometrisk rekke ----------
  geoseries: { t: ["Geometrisk rekke", "Geometric series"], p: [["a", "a₁", 1, 10, 1, 4, "", 1], ["k", "k", -0.9, 0.9, 0.1, 0.5, "", 2], ["n", "n", 1, 20, 1, 5, "", 3]],
    q: ["Hva skjer med delsummene når k er negativ? Og når |k| nærmer seg 1?", "What happens to the partial sums when k is negative? And when |k| approaches 1?"],
    g: [["Få den uendelige summen til å bli 10 med a₁ = 5.", "Make the infinite sum equal 10 with a₁ = 5.", v => v.a === 5 && Math.abs(v.k - 0.5) < 1e-9],
        ["Få delsummene til å hoppe over og under grensen.", "Make the partial sums jump above and below the limit.", v => v.k < -0.05]],
    f: v => { const Sn = n => Math.abs(v.k - 1) < 1e-12 ? v.a * n : v.a * (1 - Math.pow(v.k, n)) / (1 - v.k), lim = v.a / (1 - v.k);
      const vals = Array.from({ length: 20 }, (_, i) => Sn(i + 1)), lo = Math.min(0, ...vals, lim), hi = Math.max(...vals, lim) * 1.12 + 0.1;
      const g = smPlot([], [0, 21], [lo, hi], "n", "S_n", (X, Y) => smLine(X(0), Y(lim), X(21), Y(lim), "fg-c2", "5 3") + fgT(X(21), Y(lim) - 5, T("grense", "limit"), "fg-s fg-c2t", "end") +
        vals.map((s, i) => `<circle cx="${X(i + 1).toFixed(1)}" cy="${Y(s).toFixed(1)}" r="${i + 1 === v.n ? 5 : 3}" style="fill:${i + 1 <= v.n ? "var(--c1)" : "var(--muted)"};opacity:${i + 1 <= v.n ? 1 : .45}"/>`).join(""));
      return { eq: [qt`S_n = a_1\frac{1 - k^n}{1 - k} = ${qc(1, v.a)}\cdot\frac{1 - (${qc(2, qn(v.k, 1))})^{${qc(3, v.n)}}}{1 - (${qc(2, qn(v.k, 1))})} = ${qr(Sn(v.n), 3)}`, qt`|k| < 1 \;\Rightarrow\; S_\infty = \frac{a_1}{1 - k} = \frac{${qc(1, v.a)}}{1 - (${qc(2, qn(v.k, 1))})} = ${qr(lim, 3)}`], out: [["S_n", smN(Sn(v.n), 3)], ["S∞ = a₁/(1 − k)", smN(lim, 3)]], svg: g.svg }; } },

  // ---------- R2 / biologi: logistisk vekst ----------
  logistic: { t: ["Logistisk vekst", "Logistic growth"], p: [["r", "r", 0.1, 1.5, 0.1, 0.5, "", 1], ["K", ["bæreevne K", "capacity K"], 100, 1000, 50, 500, "", 2], ["N0", "N₀", 10, 200, 10, 20, "", 3]],
    q: ["Hvor vokser bestanden raskest? Sammenlign med K/2.", "Where does the population grow fastest? Compare with K/2."],
    g: [["Få bestanden til å nå halve bæreevnen etter 9–11 tidsenheter.", "Make the population reach half the capacity after 9–11 time units.", (v, m) => m.th >= 9 && m.th <= 11]],
    f: v => { const N = t => v.K / (1 + (v.K - v.N0) / v.N0 * Math.exp(-v.r * t)), th = v.N0 >= v.K / 2 ? 0 : Math.log((v.K - v.N0) / v.N0) / v.r;
      const g = smPlot([[N, "fg-acc", 2.6]], [0, 30], [0, 1080], "t", "N", (X, Y) => smLine(X(0), Y(v.K), X(30), Y(v.K), "fg-c2", "5 3") + fgT(X(30), Y(v.K) - 5, "K", "fg-s fg-c2t", "end") +
        (th <= 30 ? smLine(X(th), Y(0), X(th), Y(v.K / 2), "fg-c3", "3 3") + smDot(X(th), Y(v.K / 2)) : ""));
      return { eq: [qt`N(t) = \frac{K}{1 + \frac{K - N_0}{N_0}e^{-rt}} = \frac{${qc(2, v.K)}}{1 + \frac{${qc(2, v.K)} - ${qc(3, v.N0)}}{${qc(3, v.N0)}}e^{-${qc(1, qn(v.r, 1))}t}}`, qt`N(10) = ${qr(N(10), 0)}`], m: { th }, out: [[T("halve K nås ved t", "half of K at t"), smN(th, 1)], ["N(10)", smN(N(10), 0)]], svg: g.svg }; } },

  // ---------- Biologi: krysningsskjema ----------
  punnett: { t: ["Krysningsskjema", "Punnett square"], p: [["m", ["mor (0 AA, 1 Aa, 2 aa)", "mother (0 AA, 1 Aa, 2 aa)"], 0, 2, 1, 0, "", 1], ["f", ["far (0 AA, 1 Aa, 2 aa)", "father (0 AA, 1 Aa, 2 aa)"], 0, 2, 1, 0, "", 2]],
    q: ["Hvilke foreldre kan få et barn med den recessive egenskapen (aa)?", "Which parents can have a child with the recessive trait (aa)?"],
    g: [["Få 25 % sannsynlighet for aa.", "Get a 25 % probability of aa.", v => v.m === 1 && v.f === 1], ["Få 50 % sannsynlighet for aa.", "Get a 50 % probability of aa.", v => v.m + v.f === 3]],
    f: v => { const G = ["AA", "Aa", "aa"], mo = G[v.m], fa = G[v.f], cells = []; for(const x of mo) for(const y of fa) cells.push([x, y].sort().join(""));
      const cnt = g => cells.filter(c => c === g).length * 25, x0 = 60, y0 = 40, s = 44;
      const sq = cells.map((c, i) => { const cx = x0 + (i % 2) * s, cy = y0 + Math.floor(i / 2) * s; return `<rect class="fg-line" x="${cx}" y="${cy}" width="${s}" height="${s}" style="fill:${c === "aa" ? "color-mix(in srgb,var(--c3) 30%,transparent)" : "transparent"}"/>` + fgT(cx + s / 2, cy + s / 2 + 5, c, "fg-b"); }).join("");
      const bars = ["AA", "Aa", "aa"].map((g, i) => bar(200, 44 + i * 36, 90 * cnt(g) / 100, 22, C(i + 1)) + fgT(194, 60 + i * 36, g, "fg-s", "end") + fgT(204 + 90 * cnt(g) / 100, 60 + i * 36, cnt(g) + " %", "fg-s", "start")).join("");
      return { eq: [qt`\text{${mo}} \times \text{${fa}}:\quad \tfrac{${cnt("AA") / 25}}{4}\,\text{AA} + \tfrac{${cnt("Aa") / 25}}{4}\,\text{Aa} + \tfrac{${cnt("aa") / 25}}{4}\,\text{aa}`], out: [["AA", cnt("AA") + " %"], ["Aa", cnt("Aa") + " %"], ["aa", cnt("aa") + " %"]], svg: sq + fgT(x0 + s / 2, y0 - 8, fa[0], "fg-s fg-c2t") + fgT(x0 + s * 1.5, y0 - 8, fa[1], "fg-s fg-c2t") +
        fgT(x0 - 10, y0 + s / 2 + 5, mo[0], "fg-s fg-c1t") + fgT(x0 - 10, y0 + s * 1.5 + 5, mo[1], "fg-s fg-c1t") + bars }; } },

  // ---------- Fysikk 2: satellittbane ----------
  orbit: { t: ["Satellitt i bane", "Satellite in orbit"], p: [["h", ["høyde", "altitude"], 200, 40000, 200, 400, "km", 1]],
    q: ["Hvorfor går satellitter langsommere jo høyere de er?", "Why do satellites move more slowly the higher they are?"],
    g: [["Finn høyden som gir omløpstid på omtrent 24 timer (geostasjonær bane).", "Find the altitude that gives an orbital period of about 24 hours (geostationary orbit).", (v, m) => Math.abs(m.Th - 24) < 0.5]],
    f: v => { const R = 6.371e6, r = R + v.h * 1000, vv = Math.sqrt(3.986e14 / r), Th = 2 * Math.PI * r / vv / 3600, cx = 110, cy = 90, rp = 22 + 58 * Math.log10(r / R) / Math.log10(46371 / 6371), a = Date.now ? 0.6 : 0;
      return { eq: [qt`v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{3{,}986\cdot 10^{14}}{(6371 + ${qc(1, v.h)})\cdot 10^3}} = ${qr(vv / 1000, 2, "km/s")}`, qt`T = \frac{2\pi r}{v} = ${qr(Th, 2, "h")}`], m: { Th }, out: [["v = √(GM/r)", smN(vv / 1000, 2) + " km/s"], [T("omløpstid", "period"), smN(Th, 2) + " h"]], svg: `
        <circle cx="${cx}" cy="${cy}" r="${rp.toFixed(1)}" fill="none" class="fg-c1" stroke-width="1.6" stroke-dasharray="4 3"/>
        <circle cx="${cx}" cy="${cy}" r="22" style="fill:#2B7BD8"/><path d="M${cx - 12} ${cy - 8}q6-6 12-2t10 4q-4 8-12 6t-10-8z" style="fill:#43A047"/>
        <circle cx="${(cx + rp * Math.cos(a)).toFixed(1)}" cy="${(cy - rp * Math.sin(a)).toFixed(1)}" r="5" style="fill:var(--c2)"/>
        ${fgT(236, 70, smN(vv / 1000, 2) + " km/s", "fg-b fg-c2t")}${fgT(236, 96, smN(Th, 1) + " h", "fg-b")}${fgT(236, 120, smN(v.h, 0) + " km", "fg-s fg-c1t")}` }; } },

  // ---------- Bil i sving: sentripetalkraft og friksjon ----------
  curve: { t: ["Bil i sving", "Car in a curve"], p: [["r", ["radius", "radius"], 10, 200, 5, 50, "m", 1], ["v", ["fart", "speed"], 10, 150, 5, 60, T("km/t", "km/h"), 2],
      ["s", ["underlag (0 is, 1 vått, 2 tørt)", "surface (0 ice, 1 wet, 2 dry)"], 0, 2, 1, 2, "", 3], ["m", ["masse", "mass"], 800, 2500, 100, 1300, "kg", 4]],
    q: ["Doble farten: hvor mye større blir kraften som trengs? Doble radien: hva skjer da?", "Double the speed: how much larger does the required force become? Double the radius: what happens then?"],
    g: [["Tørr asfalt, radius 50 m: finn den høyeste farten (i trinn på 5 km/t) uten å skli.", "Dry asphalt, radius 50 m: find the highest speed (in steps of 5 km/h) without skidding.", v => { const ok = sp => Math.pow(sp / 3.6, 2) / 50 <= 0.8 * 9.81; return v.s === 2 && v.r === 50 && ok(v.v) && !ok(v.v + 5); }],
        ["Is, 40 km/t: finn den minste radiusen (i trinn på 5 m) der bilen holder seg på veien.", "Ice, 40 km/h: find the smallest radius (in steps of 5 m) where the car stays on the road.", v => { const ok = r => Math.pow(40 / 3.6, 2) / r <= 0.1 * 9.81; return v.s === 0 && v.v === 40 && ok(v.r) && !ok(v.r - 5); }]],
    f: v => { const MU = [0.1, 0.5, 0.8], mu = MU[v.s], vs = v.v / 3.6, a = vs * vs / v.r, F = v.m * a, Fmax = mu * v.m * 9.81, vmax = Math.sqrt(mu * 9.81 * v.r) * 3.6, skid = a > mu * 9.81 + 1e-9;
      const cx = 160, cy = 172, R = 72 + (v.r - 10) / 190 * 76, ang = 118 * Math.PI / 180, px = cx + R * Math.cos(ang), py = cy - R * Math.sin(ang), road = ["#BFE6F5", "#7F8C99", "#555D66"][v.s];
      const arc = rr => `M${(cx + rr * Math.cos(Math.PI * 0.08)).toFixed(1)} ${(cy - rr * Math.sin(Math.PI * 0.08)).toFixed(1)} A${rr.toFixed(1)} ${rr.toFixed(1)} 0 0 0 ${(cx + rr * Math.cos(Math.PI * 0.92)).toFixed(1)} ${(cy - rr * Math.sin(Math.PI * 0.92)).toFixed(1)}`;
      const tx = Math.sin(ang), ty = Math.cos(ang), ux = -Math.cos(ang), uy = Math.sin(ang), fl = 12 + 34 * Math.min(1.6, F / Math.max(Fmax, 1)); // tangent (mot klokka) og retning inn mot sentrum
      const car = `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(-(ang * 180 / Math.PI) + 180).toFixed(1)})"><rect x="-7" y="-12" width="14" height="24" rx="4" style="fill:${skid ? "var(--bad)" : "var(--c2)"}"/><rect x="-5" y="-8" width="10" height="6" rx="2" style="fill:#fff;opacity:.7"/></g>`;
      return { eq: [qt`a = \frac{v^2}{r} = \frac{(${qc(2, qn(vs, 1))}\,\mathrm{m/s})^2}{${qc(1, v.r)}\,\mathrm{m}} = ${qr(a, 2, "m/s^2")}`, qt`a ${qrel(a, mu * 9.81, "le", 0.05)} \mu g = ${qc(3, qn(mu, 1))}\cdot ${qn(9.81)} = ${qn(mu * 9.81, 2)}\;\Rightarrow\;\text{${skid ? T("sklir!", "skids!") : T("holder", "grips")}}`], m: { skid }, out: [[T("a = v²/r", "a = v²/r"), smN(a, 2) + " m/s² (" + smN(a / 9.81, 2) + " g)"], [T("kraft som trengs F = ma", "force needed F = ma"), smN(F / 1000, 2) + " kN"],
          [T("maks friksjon μmg", "max friction μmg"), smN(Fmax / 1000, 2) + " kN"], [T("maks fart", "max speed"), smN(vmax, 0) + " " + T("km/t", "km/h")]], svg: `
        <path d="${arc(R)}" fill="none" style="stroke:${road}" stroke-width="22" stroke-linecap="round"/><path d="${arc(R)}" fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="6 6" opacity=".8"/>
        ${smDot(cx, cy, "fg-dot", 3)}${smLine(cx, cy, px, py, "fg-mut", "3 3")}${fgT(cx + 8, cy - 4, "r = " + v.r + " m", "fg-s fg-c1t", "start")}
        ${skid ? `<path d="M${px.toFixed(1)} ${py.toFixed(1)}l${(-tx * 90).toFixed(1)} ${(-ty * 90).toFixed(1)}" class="fg-red" stroke-width="2" stroke-dasharray="5 4" fill="none"/>` + fgT(22, 172, T("Sklir av veien!", "Skids off the road!"), "fg-b fg-redt", "start") : ""}
        ${fgAr(px, py, px + ux * fl, py + uy * fl, skid ? "fg-red" : "fg-ok", 2.6)}${fgAr(px, py, px - tx * 30, py - ty * 30, "fg-c2", 2)}
        ${car}${fgT(296, 26, ["❄ " + T("is", "ice"), "💧 " + T("vått", "wet"), "☀ " + T("tørt", "dry")][v.s] + "  μ = " + smN(mu, 1), "fg-s", "end")}` }; } },

  // ---------- Sentripetalakselerasjon som graf ----------
  centri: { t: ["Sentripetalakselerasjon", "Centripetal acceleration"], p: [["r", ["radius", "radius"], 10, 200, 5, 100, "m", 1], ["v", ["fart", "speed"], 10, 150, 5, 60, T("km/t", "km/h"), 2], ["s", ["underlag (0 is, 1 vått, 2 tørt)", "surface (0 ice, 1 wet, 2 dry)"], 0, 2, 1, 1, "", 3]],
    q: ["a = v²/r: hva skjer med a når farten dobles? Når radien dobles?", "a = v²/r: what happens to a when the speed doubles? When the radius doubles?"],
    g: [["Vått føre, radius 100 m: finn farten der akselerasjonen treffer friksjonsgrensen.", "Wet road, radius 100 m: find the speed where the acceleration reaches the friction limit.", v => v.s === 1 && v.r === 100 && Math.abs(Math.pow(v.v / 3.6, 2) / 100 - 0.5 * 9.81) < 0.2]],
    f: v => { const MU = [0.1, 0.5, 0.8], a = sp => Math.pow(sp / 3.6, 2) / v.r, lim = MU[v.s] * 9.81, cols = ["fg-c1", "fg-c3", "fg-c4"];
      const g = smPlot([[a, "fg-acc", 2.6]], [0, 150], [0, 12], T("v (km/t)", "v (km/h)"), "a", (X, Y) => MU.map((mu, i) => smLine(X(0), Y(mu * 9.81), X(150), Y(mu * 9.81), cols[i], i === v.s ? "" : "4 4") +
          fgT(X(3), Y(mu * 9.81) - 4, [T("is", "ice"), T("vått", "wet"), T("tørt", "dry")][i], "fg-s " + cols[i] + "t", "start")).join("") + smDot(X(v.v), Y(Math.min(12, a(v.v))), a(v.v) > lim ? "fg-dotr" : "fg-dot"));
      return { eq: [qt`a = \frac{v^2}{r} = \frac{(${qc(2, qn(v.v / 3.6, 1))})^2}{${qc(1, v.r)}} = ${qr(a(v.v), 2, "m/s^2")}`, qt`a ${qrel(a(v.v), lim, "le", 0.2)} \mu g = ${qc(3, qn(MU[v.s], 1))}\cdot ${qn(9.81)} = ${qn(lim, 2)}${qu("m/s^2")}`], out: [["a = v²/r", smN(a(v.v), 2) + " m/s²"], [T("friksjonsgrense μg", "friction limit μg"), smN(lim, 2) + " m/s²"], [T("maks fart", "max speed"), smN(Math.sqrt(lim * v.r) * 3.6, 0) + " " + T("km/t", "km/h")]], svg: g.svg }; } },

  // ---------- Sykepleie: NEWS2 ----------
  news2: { t: ["NEWS2-kalkulator", "NEWS2 calculator"], p: [["rr", ["resp.frekvens", "resp. rate"], 6, 32, 1, 16, "/min", 1], ["sp", "SpO₂", 85, 100, 1, 97, "%", 2], ["sbp", ["syst. BT", "syst. BP"], 80, 230, 5, 125, "mmHg", 3],
      ["hr", ["puls", "pulse"], 35, 150, 5, 75, "/min", 4], ["tp", ["temp.", "temp."], 34, 41, 0.1, 37, "°C", 5], ["o2", ["oksygen (0 nei, 1 ja)", "oxygen (0 no, 1 yes)"], 0, 1, 1, 0, ""], ["cv", ["ny forvirring (0/1)", "new confusion (0/1)"], 0, 1, 1, 0, ""]],
    q: ["Hvilke enkeltmålinger gir 3 poeng alene?", "Which single measurements score 3 points on their own?"],
    g: [["Lag en pasient med NEWS2 = 5.", "Create a patient with NEWS2 = 5.", (v, m) => m.sum === 5],
        ["Lag en pasient med høy risiko (7+) uten at noen enkeltmåling gir 3.", "Create a high-risk patient (7+) without any single measurement scoring 3.", (v, m) => m.sum >= 7 && m.max < 3]],
    f: v => { const s = [v.rr <= 8 ? 3 : v.rr <= 11 ? 1 : v.rr <= 20 ? 0 : v.rr <= 24 ? 2 : 3, v.sp <= 91 ? 3 : v.sp <= 93 ? 2 : v.sp <= 95 ? 1 : 0, v.o2 ? 2 : 0,
        v.sbp <= 90 ? 3 : v.sbp <= 100 ? 2 : v.sbp <= 110 ? 1 : v.sbp <= 219 ? 0 : 3, v.hr <= 40 ? 3 : v.hr <= 50 ? 1 : v.hr <= 90 ? 0 : v.hr <= 110 ? 1 : v.hr <= 130 ? 2 : 3, v.cv ? 3 : 0,
        v.tp <= 35.05 ? 3 : v.tp <= 36.05 ? 1 : v.tp <= 38.05 ? 0 : v.tp <= 39.05 ? 1 : 2];
      const sum = s.reduce((a, b) => a + b, 0), mx = Math.max(...s), lab = ["RF", "SpO₂", "O₂", T("BT", "BP"), T("puls", "pulse"), T("bev.", "cons."), "temp"], sc = ["#43A047", "#F2B51D", "#FB8C00", "#E53935"];
      const risk = sum >= 7 ? T("høy: akutt", "high: emergency") : sum >= 5 ? T("middels: haster", "medium: urgent") : mx === 3 ? T("lav, men 3 i én: rask vurdering", "low, but a 3: urgent review") : T("lav", "low");
      const rc = sum >= 7 ? sc[3] : sum >= 5 ? sc[2] : mx === 3 ? sc[1] : sc[0];
      return { eq: [qt`\text{NEWS2} = ${qc(1, s[0])} + ${qc(2, s[1])} + ${s[2]} + ${qc(3, s[3])} + ${qc(4, s[4])} + ${s[5]} + ${qc(5, s[6])} = ${qr(sum, 0)}`], m: { sum, max: mx }, out: [["NEWS2", String(sum)], [T("risiko", "risk"), risk]], svg: s.map((x, i) => bar(26 + i * 30, 140 - x * 30, 22, Math.max(3, x * 30), sc[x]) + fgT(37 + i * 30, 156, lab[i], "fg-s") + fgT(37 + i * 30, 132 - x * 30, String(x), "fg-s")).join("") +
        `<circle cx="266" cy="80" r="38" style="fill:${rc};opacity:.18"/><circle cx="266" cy="80" r="38" fill="none" style="stroke:${rc}" stroke-width="3"/>` + fgT(266, 92, String(sum), "fg-big") + fgT(266, 136, "NEWS2", "fg-s") }; } },

  // ---------- Sykepleie: BMI ----------
  bmi: { t: ["BMI", "BMI"], p: [["w", ["vekt", "weight"], 40, 150, 1, 70, "kg", 1], ["h", ["høyde", "height"], 1.4, 2.05, 0.01, 1.75, "m", 2]],
    q: ["Hvor mye må vekten endres for å flytte BMI én enhet hos en person på 1,75 m?", "How much must the weight change to move the BMI by one unit for a person who is 1.75 m?"],
    g: [["En person på 1,80 m: finn vekten som gir BMI 25.", "A person who is 1.80 m: find the weight that gives BMI 25.", v => Math.abs(v.h - 1.8) < 1e-9 && Math.abs(v.w / (v.h * v.h) - 25) < 0.2],
        ["Finn en vekt og høyde med BMI under 18,5.", "Find a weight and height with BMI below 18.5.", v => v.w / (v.h * v.h) < 18.5]],
    f: v => { const b = v.w / (v.h * v.h), L = 20, W = 280, X = x => L + W * (Math.min(40, Math.max(15, x)) - 15) / 25;
      const zones = [[15, 18.5, "#4FC3F7", T("under", "under")], [18.5, 25, "#43A047", T("normal", "normal")], [25, 30, "#F2B51D", T("over", "over")], [30, 40, "#E53935", T("fedme", "obesity")]];
      const cat = b < 18.5 ? T("undervekt", "underweight") : b < 25 ? T("normalvekt", "normal weight") : b < 30 ? T("overvekt", "overweight") : T("fedme", "obesity");
      return { eq: [qt`\text{BMI} = \frac{m}{h^2} = \frac{${qc(1, v.w)}}{${qc(2, qn(v.h, 2))}^2} = ${qr(b, 1)}`], out: [["BMI = kg/m²", smN(b, 1)], [T("kategori", "category"), cat]], svg: zones.map(([a, z, c, s]) => bar(X(a), 80, X(z) - X(a), 30, c, 0.85) + fgT((X(a) + X(z)) / 2, 128, s, "fg-s")).join("") +
        [18.5, 25, 30].map(x => fgT(X(x), 72, smN(x, 1), "fg-s")).join("") + `<path d="M${X(b).toFixed(1)} 78l-7-12h14z" style="fill:var(--ink)"/>` + fgT(160, 40, "BMI " + smN(b, 1), "fg-big") }; } },

  // ---------- Legemiddelregning: infusjon ----------
  drip: { t: ["Infusjon og dråpetakt", "Infusion and drip rate"], p: [["vol", ["volum", "volume"], 100, 1000, 50, 500, "ml", 1], ["hrs", ["tid", "time"], 0.5, 12, 0.5, 5, "t", 2], ["df", ["dråper/ml", "drops/mL"], 20, 60, 40, 20, "", 3]],
    q: ["Hva er sammenhengen mellom ml/t og dråper/min med et 60-sett?", "What is the relationship between mL/h and drops/min with a 60-set?"],
    g: [["Still inn 125 ml/t.", "Set 125 mL/h.", v => Math.abs(v.vol / v.hrs - 125) < 0.01],
        ["Med et 20-sett: få 20 dråper/min.", "With a 20-set: get 20 drops/min.", v => v.df === 20 && Math.abs(v.vol * 20 / (v.hrs * 60) - 20) < 0.01]],
    f: v => { const mlh = v.vol / v.hrs, dpm = v.vol * v.df / (v.hrs * 60), lvl = v.vol / 1000;
      return { eq: [qt`\frac{${qc(1, v.vol)}\,\mathrm{ml}}{${qc(2, qn(v.hrs, 1))}\,\mathrm{${T("t", "h")}}} = ${qr(mlh, 1, T("ml/t", "mL/h"))}`, qt`\frac{${qc(1, v.vol)}\cdot ${qc(3, v.df)}}{${qc(2, qn(v.hrs, 1))}\cdot 60} = ${qr(dpm, 1, T("dr/min", "drops/min"))}`], out: [[T("ml/t", "mL/h"), smN(mlh, 1)], [T("dråper/min", "drops/min"), smN(dpm, 1)]], svg: `
        <rect class="fg-line" x="40" y="14" width="60" height="84" rx="12" fill="none"/>${bar(42, 96 - 80 * lvl, 56, 80 * lvl, "#4FC3F7", 0.7)}
        ${fgT(70, 60, smN(v.vol, 0) + " ml", "fg-s")}<line class="fg-line" x1="70" y1="98" x2="70" y2="112"/><rect class="fg-line" x="60" y="112" width="20" height="30" rx="4" fill="none"/>
        ${Array.from({ length: Math.min(4, Math.max(1, Math.round(dpm / 20))) }, (_, i) => `<ellipse cx="70" cy="${118 + i * 6}" rx="2.4" ry="3" style="fill:#4FC3F7"/>`).join("")}
        <path class="fg-line" d="M70 142v10q0 12 40 12h60" fill="none"/>
        ${fgT(230, 64, smN(mlh, 1) + " " + T("ml/t", "mL/h"), "fg-b fg-c1t")}${fgT(230, 94, smN(dpm, 1) + " " + T("dr/min", "dr/min"), "fg-b fg-c3t")}${fgT(230, 120, v.df + " " + T("dråper/ml", "drops/mL"), "fg-s")}` }; } }
});

// Koble simuleringene (nye og gamle) til enhetene i videregående og sykepleie.
for(const [k, name] of [["VG1T:0", "quad"], ["VG1T:1", "line"], ["VG1T:1", "quad"], ["VG1T:2", "tangent"], ["VG1T:3", "unitcircle"],
  ["VGR1:0", "expo"], ["VGR1:1", "tangent"], ["VGR1:2", "vector"], ["VGR1:3", "binom"], ["VGR1:3", "combi"],
  ["VGR2:0", "riemann"], ["VGR2:1", "geoseries"], ["VGR2:2", "logistic"], ["VGR2:2", "euler"], ["VGR2:3", "trig"], ["VGR2:3", "unitcircle"],
  ["VGS1:1", "expo"], ["VGS1:2", "tangent"], ["VGS1:3", "binom"],
  ["VGFY1:0", "vt"], ["VGFY1:1", "incline"], ["VGFY1:2", "energy"], ["VGFY1:3", "ohm"], ["VGFY1:4", "decay"], ["VGFY2:0", "projectile"], ["VGFY2:1", "orbit"], ["VGFY2:1", "curve"], ["VGFY2:1", "centri"], ["VGFY1:1", "curve"], ["MAPE1300:2", "curve"], ["GFYS:2", "curve"],
  ["VGKJ1:2", "gas"], ["VGKJ1:3", "ph"], ["VGKJ2:2", "titration"], ["VGKJ2:2", "ph"], ["VGBI1:1", "punnett"], ["VGBI1:2", "logistic"],
  ["SFARM:0", "decay"], ["SFARM:0", "doses"], ["SKLIN:1", "news2"], ["SKLIN:2", "bmi"], ["SLMR:2", "drip"], ["SANA:2", "gas"]]){
  const cur = SIM_MAP[k]; SIM_MAP[k] = cur ? [].concat(cur, name).filter((x, i, a) => a.indexOf(x) === i) : name;
}
})();
