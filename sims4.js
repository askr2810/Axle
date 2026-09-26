// ============================================================
//  PRØV SELV, runde 4 – simuleringer som VISER hvorfor formlene stemmer (brukes i bevisene i proofs.js).
//  Sekant → tangent, arealfunksjonen, fullføre kvadratet, Pytagoras, Gauss-summen, sirkelarealet,
//  produktregelen, tallet e og sinussetningen. Samme format som sims.js, med levende formel (eq).
// ============================================================
(() => {
const soft = (n, p = 22) => `fill:color-mix(in srgb,var(--c${n}) ${p}%,transparent);stroke:var(--c${n});stroke-width:1.6`;
const rect = (x, y, w, h, st) => `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(0, w).toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" style="${st}"/>`;
const poly = (pts, st) => `<polygon points="${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" style="${st}"/>`;
const par = x => x < 0 ? "(" + qn(x) + ")" : qn(x);

Object.assign(SIMS, {
  // ---------- Sekant blir tangent: definisjonen av den deriverte ----------
  secant: { t: ["Fra sekant til tangent", "From secant to tangent"], p: [["x0", "x₀", -1, 2, 0.1, 1, "", 1], ["h", "h", 0.01, 2, 0.01, 1.5, "", 2]],
    q: ["Dra h mot 0. Hva nærmer stigningstallet til sekanten seg?", "Drag h towards 0. What does the slope of the secant approach?"],
    g: [["Gjør h mindre enn 0,05 og se at sekanten nesten blir tangenten.", "Make h smaller than 0.05 and see the secant almost become the tangent.", v => v.h <= 0.05 + 1e-9],
        ["Finn punktet der tangenten er vannrett (stigningstall 0), med h under 0,05.", "Find the point where the tangent is horizontal (slope 0), with h below 0.05.", v => Math.abs(v.x0) < 1e-9 && v.h <= 0.05 + 1e-9]],
    f: v => { const f = x => x * x, x1 = v.x0 + v.h, s = (f(x1) - f(v.x0)) / v.h, d = 2 * v.x0;
      const g = smPlot([[f, "fg-acc", 2.6], [x => f(v.x0) + d * (x - v.x0), "fg-mut", 1.4], [x => f(v.x0) + s * (x - v.x0), "fg-red", 2.2]], [-1.5, 3.5], [-1, 13], "x", "y", (X, Y) =>
        smLine(X(v.x0), Y(f(v.x0)), X(x1), Y(f(v.x0)), "fg-c2", "") + smLine(X(x1), Y(f(v.x0)), X(x1), Y(Math.min(13, f(x1))), "fg-c3", "3 3") +
        fgT(X(v.x0 + v.h / 2), Y(f(v.x0)) + 14, "h", "fg-i fg-c2t") + smDot(X(v.x0), Y(f(v.x0))) + (f(x1) <= 13 ? smDot(X(x1), Y(f(x1)), "fg-dot2") : "") +
        fgT(300, 30, T("sekant", "secant"), "fg-s fg-redt", "end") + fgT(300, 44, T("tangent", "tangent"), "fg-s", "end"));
      return { m: { s }, eq: [qt`\frac{f(x_0 + h) - f(x_0)}{h} = \frac{${par(x1)}^2 - ${par(v.x0)}^2}{${qc(2, qn(v.h))}} = ${qr(s, 3)}`,
          qt`= 2x_0 + h = 2\cdot ${par(v.x0)} + ${qc(2, qn(v.h))} \;\to\; ${qr(d, 2)} = f'(${qc(1, qn(v.x0, 1))})`],
        out: [[T("sekantens stigning", "secant slope"), smN(s, 3)], [T("tangentens stigning f′(x₀)", "tangent slope f′(x₀)"), smN(d, 2)], [T("forskjell", "difference"), smN(s - d, 3)]], svg: g.svg }; } },

  // ---------- Arealfunksjonen: analysens fundamentalteorem ----------
  ftc: { t: ["Arealfunksjonen A(x)", "The area function A(x)"], p: [["x", "x", 0.5, 3.4, 0.1, 2, "", 1], ["h", "h", 0.05, 0.8, 0.05, 0.6, "", 2]],
    q: ["Hvorfor blir den tynne stripen nesten et rektangel med høyde f(x)?", "Why does the thin strip become almost a rectangle of height f(x)?"],
    g: [["Gjør h så liten (0,1 eller mindre) at stripen og rektangelet f(x)·h nesten er like.", "Make h so small (0.1 or less) that the strip and the rectangle f(x)·h are almost equal.", v => v.h <= 0.1 + 1e-9]],
    f: v => { const f = x => 1 + 0.5 * x + 0.6 * Math.sin(1.5 * x), A = x => x + 0.25 * x * x + 0.4 * (1 - Math.cos(1.5 * x)), dA = A(v.x + v.h) - A(v.x), fx = f(v.x);
      const g = smPlot([[f, "fg-acc", 2.6]], [0, 4.2], [0, 3.6], "t", "f(t)", (X, Y) => {
        const area = (a, b) => { let d = `M${X(a).toFixed(1)} ${Y(0).toFixed(1)}`; for(let i = 0; i <= 40; i++){ const x = a + (b - a) * i / 40; d += `L${X(x).toFixed(1)} ${Y(f(x)).toFixed(1)}`; } return d + `L${X(b).toFixed(1)} ${Y(0).toFixed(1)}Z`; };
        return `<path d="${area(0, v.x)}" style="${soft(1, 20)};stroke:none"/><path d="${area(v.x, v.x + v.h)}" style="${soft(2, 45)}"/>` +
          rect(X(v.x), Y(fx), X(v.x + v.h) - X(v.x), Y(0) - Y(fx), "fill:none;stroke:var(--ink);stroke-width:1.4;stroke-dasharray:4 3") +
          fgT(X(v.x / 2), Y(0.45), "A(x)", "fg-b fg-c1t") + fgT(X(v.x + v.h / 2), Y(0) + 14, "h", "fg-i fg-c2t") + smDot(X(v.x), Y(fx), "fg-dot", 3.5); });
      return { eq: [qt`A(x + h) - A(x) = ${qr(dA, 3)}`, qt`\approx f(x)\cdot h = ${qn(fx, 3)}\cdot ${qc(2, qn(v.h))} = ${qn(fx * v.h, 3)}`,
          qt`\frac{A(x + h) - A(x)}{h} = ${qr(dA / v.h, 3)} \;\to\; f(${qc(1, qn(v.x, 1))}) = ${qr(fx, 3)}\ \ (h \to 0)`, qt`\Rightarrow\; A'(x) = f(x)`],
        out: [[T("stripen A(x+h) − A(x)", "the strip A(x+h) − A(x)"), smN(dA, 3)], [T("rektangelet f(x)·h", "the rectangle f(x)·h"), smN(fx * v.h, 3)], [T("forskjell", "difference"), smN(dA - fx * v.h, 4)]], svg: g.svg }; } },

  // ---------- Fullføre kvadratet (abc-formelen) ----------
  cmpsq: { t: ["Fullfør kvadratet", "Complete the square"], p: [["x", "x", 1, 6, 0.5, 4, "", 1], ["b", "b", 1, 8, 1, 4, "", 2]],
    q: ["Hvor stor bit mangler for at figuren skal bli et helt kvadrat?", "How big is the piece missing for the figure to become a full square?"],
    f: v => { const hb = v.b / 2, k = 150 / (v.x + hb), X0 = 20, Y0 = 16, xs = v.x * k, bs = hb * k;
      const svg = rect(X0, Y0, xs, xs, soft(1)) + rect(X0 + xs, Y0, bs, xs, soft(2)) + rect(X0, Y0 + xs, xs, bs, soft(2)) +
        rect(X0 + xs, Y0 + xs, bs, bs, "fill:color-mix(in srgb,var(--gold) 30%,transparent);stroke:var(--gold-deep);stroke-width:1.6;stroke-dasharray:5 3") +
        fgT(X0 + xs / 2, Y0 + xs / 2 + 5, "x²", "fg-b fg-c1t") + (bs > 26 ? fgT(X0 + xs + bs / 2, Y0 + xs / 2 + 4, "b/2 · x", "fg-s fg-c2t") + fgT(X0 + xs / 2, Y0 + xs + bs / 2 + 4, "b/2 · x", "fg-s fg-c2t") : "") +
        fgT(X0 + xs + bs / 2, Y0 + xs + bs / 2 + 4, bs > 30 ? "(b/2)²" : "", "fg-s") + fgT(X0 + xs / 2, Y0 - 3, "x", "fg-i fg-c1t") + fgT(X0 + xs + bs / 2, Y0 - 3, "b/2", "fg-s fg-c2t") +
        fgT(300, 60, T("mangler:", "missing:"), "fg-s", "end") + fgT(300, 80, "(b/2)² = " + smN(hb * hb, 2), "fg-b", "end");
      return { eq: [qt`x^2 + bx = x^2 + 2\cdot\frac{b}{2}\,x = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2`,
          qt`${qc(1, qn(v.x, 1))}^2 + ${qc(2, v.b)}\cdot ${qc(1, qn(v.x, 1))} = ${qn(v.x * v.x + v.b * v.x)} = (${qc(1, qn(v.x, 1))} + ${qn(hb)})^2 - ${qn(hb)}^2 = ${qn((v.x + hb) ** 2)} - ${qr(hb * hb, 2)}`],
        out: [["x² + bx", smN(v.x * v.x + v.b * v.x, 2)], ["(x + b/2)²", smN((v.x + hb) ** 2, 2)], [T("biten som mangler", "the missing piece"), smN(hb * hb, 2)]], svg }; } },

  // ---------- Pytagoras: flytt fire trekanter ----------
  pyth: { t: ["Pytagoras med fire trekanter", "Pythagoras with four triangles"], p: [["a", "a", 1, 4, 0.5, 3, "", 1], ["b", "b", 1, 4, 0.5, 2, "", 2], ["t", ["flytt trekantene", "move the triangles"], 0, 1, 0.05, 0, "", 3]],
    q: ["Arealet som ikke er dekket av trekanter, er det samme før og etter. Hvorfor?", "The area not covered by triangles is the same before and after. Why?"],
    g: [["Flytt trekantene helt (til 1) og se at a² og b² fyller like mye som c² gjorde.", "Move the triangles all the way (to 1) and see that a² and b² fill as much as c² did.", v => v.t >= 1 - 1e-9]],
    f: v => { const a = v.a, b = v.b, s = a + b, k = 152 / s, ox = 84, oy = 14, P = (x, y) => [ox + x * k, oy + (s - y) * k], t = v.t;
      const tri = [[[0, 0], [a, 0], [0, b], [0, a]], [[s, 0], [s, a], [a, 0], [0, 0]], [[s, s], [b, s], [s, a], [-b, 0]], [[0, s], [0, b], [b, s], [a, -b]]];
      let svg = rect(ox, oy, s * k, s * k, "fill:color-mix(in srgb,var(--gold) 26%,transparent);stroke:var(--ink);stroke-width:1.6");
      svg += tri.map(([p1, p2, p3, d], i) => poly([p1, p2, p3].map(([x, y]) => P(x + d[0] * t, y + d[1] * t)), `fill:color-mix(in srgb,var(--c${[5, 4, 5, 4][i]}) 55%,var(--card));stroke:var(--ink);stroke-width:1.2`)).join("");
      if(t <= 0.15) svg += fgT(...P(s / 2, s / 2 - 0.1), "c²", "fg-b");
      if(t >= 0.85) svg += fgT(...P(a / 2, a / 2 - 0.1), "a²", "fg-b fg-c1t") + fgT(...P(a + b / 2, a + b / 2 - 0.1), "b²", "fg-b fg-c2t");
      svg += fgT(ox - 8, oy + s * k / 2, "a + b", "fg-s", "end");
      return { eq: [qt`(a + b)^2 = ${t < 0.5 ? qt`\underbrace{c^2}_{\text{${T("gult", "yellow")}}}` : qt`\underbrace{a^2 + b^2}_{\text{${T("gult", "yellow")}}}`} + 4\cdot\tfrac12 ab`,
          qt`c^2 = a^2 + b^2 = ${qc(1, qn(a, 1))}^2 + ${qc(2, qn(b, 1))}^2 = ${qn(a * a + b * b)} \;\Rightarrow\; c = ${qr(Math.hypot(a, b), 3)}`],
        out: [["a² + b²", smN(a * a + b * b, 2)], ["c", smN(Math.hypot(a, b), 3)]], svg }; } },

  // ---------- Gauss: 1 + 2 + … + n ----------
  gauss: { t: ["Gauss' triks: 1 + 2 + … + n", "Gauss's trick: 1 + 2 + … + n"], p: [["n", "n", 1, 12, 1, 5, "", 1], ["c", ["vis kopien (0/1)", "show the copy (0/1)"], 0, 1, 1, 0, "", 2]],
    q: ["To like trapper blir et rektangel. Hvor stort er det?", "Two equal staircases make a rectangle. How big is it?"],
    g: [["Vis kopien (sett den til 1) og tell rutene i rektangelet.", "Show the copy (set it to 1) and count the squares in the rectangle.", v => v.c === 1]],
    f: v => { const n = v.n, cell = Math.min(200 / n, 138 / (n + 1)), x0 = 60, y0 = 158, S = n * (n + 1) / 2; let svg = "";
      for(let i = 1; i <= n; i++){ for(let j = 0; j < i; j++) svg += rect(x0 + (i - 1) * cell + 1, y0 - (j + 1) * cell + 1, cell - 2, cell - 2, soft(1, 40));
        if(v.c) for(let j = i; j < n + 1; j++) svg += rect(x0 + (i - 1) * cell + 1, y0 - (j + 1) * cell + 1, cell - 2, cell - 2, soft(2, 40)); }
      svg += fgT(x0 + n * cell / 2, y0 + 16, "n = " + n, "fg-s fg-c1t") + (v.c ? fgT(x0 - 6, y0 - (n + 1) * cell / 2, "n + 1", "fg-s", "end") : "");
      return { eq: [qt`S = 1 + 2 + \dots + ${qc(1, n)}`, v.c ? qt`2S = ${qc(1, n)}\cdot(${qc(1, n)} + 1) = ${n * (n + 1)} \;\Rightarrow\; S = \frac{${n}\cdot ${n + 1}}{2} = ${qr(S, 0)}` : qt`S = ${qr(S, 0)}\quad \text{(${T("vis kopien", "show the copy")})}`],
        out: [["S", String(S)], [T("rektangel", "rectangle"), n + " × " + (n + 1)]], svg }; } },

  // ---------- Sirkelens areal: kutt i kakestykker ----------
  circlearea: { t: ["Arealet av en sirkel", "The area of a circle"], p: [["N", ["antall kakestykker", "number of slices"], 4, 40, 2, 8, "", 1]],
    q: ["Hvilken figur ligner bitene mer og mer på når du øker antallet?", "Which shape do the pieces look more and more like as you increase the number?"],
    g: [["Del sirkelen i minst 30 biter og se at bitene blir et rektangel.", "Cut the circle into at least 30 slices and see the pieces become a rectangle.", v => v.N >= 30]],
    f: v => { const N = v.N, R = 40, th = 2 * Math.PI / N, cx = 58, cy = 88, w = R * th, x0 = 118, yT = 66, yB = yT + R * Math.cos(th / 2); let svg = "";
      for(let i = 0; i < N; i++){ const a0 = i * th, a1 = a0 + th, p0 = [cx + R * Math.cos(a0), cy - R * Math.sin(a0)], p1 = [cx + R * Math.cos(a1), cy - R * Math.sin(a1)];
        svg += `<path d="M${cx} ${cy}L${p0[0].toFixed(1)} ${p0[1].toFixed(1)}A${R} ${R} 0 0 0 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}Z" style="${soft(i % 2 ? 2 : 1, 45)};stroke-width:.8"/>`; }
      for(let i = 0; i < N; i++){ const up = i % 2 === 0, k = Math.floor(i / 2), ax = x0 + k * w + (up ? w / 2 : w), ay = up ? yT : yB, sh = Math.sin(th / 2) * R, ch = Math.cos(th / 2) * R;
        const pL = [ax - sh, up ? ay + ch : ay - ch], pR = [ax + sh, up ? ay + ch : ay - ch];
        svg += `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)}L${pL[0].toFixed(1)} ${pL[1].toFixed(1)}A${R} ${R} 0 0 ${up ? 0 : 1} ${pR[0].toFixed(1)} ${pR[1].toFixed(1)}Z" style="${soft(up ? 1 : 2, 45)};stroke-width:.8"/>`; }
      const W = N / 2 * w; svg += smLine(x0, yB + 16, x0 + W, yB + 16, "fg-c1", "") + fgT(x0 + W / 2, yB + 30, "≈ πr", "fg-b") + fgT(x0 + W + 12, (yT + yB) / 2 + 4, "r", "fg-i", "start");
      return { eq: [qt`A \approx \text{${T("bredde", "width")}}\cdot\text{${T("høyde", "height")}} = \pi r\cdot r = \pi r^2`, qt`N = ${qc(1, N)}:\ \text{${T("bredden", "the width")}} = \tfrac{N}{2}\cdot\tfrac{2\pi r}{N} = \pi r`],
        out: [[T("biter", "slices"), String(N)], [T("bredde", "width"), "πr"]], svg }; } },

  // ---------- Produktregelen som areal ----------
  prodrule: { t: ["Produktregelen som areal", "The product rule as area"], p: [["u", "u", 1, 4, 0.5, 3, "", 1], ["v", "v", 1, 3, 0.5, 2, "", 2], ["d", "Δ", 0, 1, 0.05, 0.6, "", 3]],
    q: ["Hvorfor forsvinner det lille hjørnet Δu·Δv når Δ blir liten?", "Why does the small corner Δu·Δv vanish when Δ gets small?"],
    g: [["Gjør Δ liten (0,1 eller mindre). Hvor stort er hjørnet nå?", "Make Δ small (0.1 or less). How big is the corner now?", v => v.d <= 0.1 + 1e-9 && v.d > 0]],
    f: v => { const k = Math.min(220 / (v.u + 1), 134 / (v.v + 1)), x0 = 40, y0 = 160, U = v.u * k, V = v.v * k, D = v.d * k;
      const svg = rect(x0, y0 - V, U, V, soft(1)) + rect(x0 + U, y0 - V, D, V, soft(2)) + rect(x0, y0 - V - D, U, D, soft(2)) + rect(x0 + U, y0 - V - D, D, D, "fill:color-mix(in srgb,var(--gold) 45%,transparent);stroke:var(--gold-deep);stroke-width:1.4") +
        fgT(x0 + U / 2, y0 - V / 2 + 5, "u · v", "fg-b fg-c1t") + fgT(x0 + U / 2, y0 + 14, "u", "fg-i") + fgT(x0 - 6, y0 - V / 2, "v", "fg-i", "end") +
        (D > 14 ? fgT(x0 + U + D + 6, y0 - V / 2, "Δu · v", "fg-s fg-c2t", "start") + fgT(x0 + U / 2, y0 - V - D - 5, "u · Δv", "fg-s fg-c2t") : "");
      return { eq: [qt`\Delta(uv) = \underbrace{\Delta u\cdot v}_{${qn(v.d * v.v)}} + \underbrace{u\cdot\Delta v}_{${qn(v.u * v.d)}} + \underbrace{\Delta u\,\Delta v}_{${qr(v.d * v.d, 4)}}`,
          qt`\text{${T("del på", "divide by")}}\ \Delta x,\ \Delta x \to 0:\quad (uv)' = u'v + uv'`],
        out: [[T("vekst i areal", "growth in area"), smN(v.d * v.v + v.u * v.d + v.d * v.d, 3)], [T("hjørnet ΔuΔv", "the corner ΔuΔv"), smN(v.d * v.d, 4)]], svg }; } },

  // ---------- Oppdag tallet e ----------
  elimit: { t: ["Oppdag tallet e", "Discover the number e"], p: [["a", ["grunntall a", "base a"], 2, 3.2, 0.01, 2, "", 1]],
    q: ["For hvilket grunntall er stigningen i x = 0 akkurat 1?", "For which base is the slope at x = 0 exactly 1?"],
    g: [["Finn grunntallet a der stigningen til aˣ i x = 0 er 1 (tre gjeldende siffer).", "Find the base a where the slope of aˣ at x = 0 is 1 (three significant figures).", v => Math.abs(Math.log(v.a) - 1) < 0.006]],
    f: v => { const h = 1e-4, sl = (Math.pow(v.a, h) - 1) / h, ok = Math.abs(sl - 1) < 0.006;
      const g = smPlot([[x => Math.pow(v.a, x), "fg-acc", 2.6], [x => 1 + x, "fg-mut", 1.4], [x => 1 + sl * x, ok ? "fg-ok" : "fg-red", 2]], [-1.6, 1.6], [0, 4.5], "x", "y", (X, Y) =>
        smDot(X(0), Y(1)) + fgT(300, 28, "y = 1 + x", "fg-s", "end") + fgT(300, 44, ok ? T("treff! a ≈ e", "match! a ≈ e") : "", "fg-b fg-okt", "end"));
      return { m: { sl }, eq: [qt`\frac{a^h - 1}{h}\Big|_{h = 0{,}0001} = \frac{${qc(1, qn(v.a, 2))}^{0{,}0001} - 1}{0{,}0001} = ${qr(sl, 4)} \;${qrel(sl, 1, "eq", 0.006)}\; 1`,
          qt`(a^x)' = ${qn(sl, 3)}\cdot a^x \qquad e = 2{,}71828\ldots \Rightarrow (e^x)' = e^x`],
        out: [[T("stigning i x = 0", "slope at x = 0"), smN(sl, 4)], ["ln a", smN(Math.log(v.a), 4)]], svg: g.svg }; } },

  // ---------- Sinussetningen: samme høyde to ganger ----------
  sinerule: { t: ["Sinussetningen", "The sine rule"], p: [["A", "A", 20, 110, 5, 50, "°", 1], ["B", "B", 20, 100, 5, 60, "°", 2]],
    q: ["Høyden h kan regnes ut på to måter. Hvilke?", "The height h can be calculated in two ways. Which?"],
    f: v => { const C = 180 - v.A - v.B, R = Math.PI / 180;
      if(C < 10) return { eq: [qt`A + B = ${v.A + v.B}^\circ:\ \text{${T("for store vinkler", "angles too large")}}`], out: [["C", smN(C, 0) + "°"]], svg: fgT(160, 90, T("A + B må være under 170°", "A + B must be below 170°"), "fg-b fg-redt") };
      const c = 6, a = c * Math.sin(v.A * R) / Math.sin(C * R), b = c * Math.sin(v.B * R) / Math.sin(C * R), Cx = b * Math.cos(v.A * R), Cy = b * Math.sin(v.A * R), h = Cy;
      const minx = Math.min(0, Cx), maxx = Math.max(c, Cx), k = Math.min(270 / (maxx - minx), 130 / Cy), ox = 25 - minx * k + (270 - (maxx - minx) * k) / 2, oy = 152, P = (x, y) => [ox + x * k, oy - y * k];
      const [ax, ay] = P(0, 0), [bx, by] = P(c, 0), [cx, cy] = P(Cx, Cy), [fx, fy] = P(Cx, 0);
      const svg = `<polygon points="${ax},${ay} ${bx},${by} ${cx.toFixed(1)},${cy.toFixed(1)}" style="fill:var(--accent-soft);stroke:var(--ink);stroke-width:1.8"/>` +
        (Cx < 0 || Cx > c ? smLine(Cx < 0 ? fx : bx, fy, Cx < 0 ? ax : fx, fy, "fg-mut", "3 3") : "") + smLine(cx, cy, fx, fy, "fg-c3", "5 3") + fgT(fx + 5, (cy + fy) / 2, "h", "fg-i fg-c3t", "start") +
        smArc(ax, ay, 22, 0, v.A, "fg-c1", "") + smArc(bx, by, 22, 180 - v.B, 180, "fg-c2", "") + fgT(ax - 6, ay + 4, "A", "fg-b fg-c1t", "end") + fgT(bx + 6, by + 4, "B", "fg-b fg-c2t", "start") + fgT(cx, cy - 7, "C", "fg-b") +
        fgT((ax + cx) / 2 - 8, (ay + cy) / 2, "b", "fg-i", "end") + fgT((bx + cx) / 2 + 8, (by + cy) / 2, "a", "fg-i", "start");
      return { eq: [qt`h = b\sin A = ${qn(b)}\cdot\sin ${qc(1, v.A + "^\\circ")} = ${qn(h)}`, qt`h = a\sin B = ${qn(a)}\cdot\sin ${qc(2, v.B + "^\\circ")} = ${qn(h)}`,
          qt`\Rightarrow\ \frac{a}{\sin A} = ${qr(a / Math.sin(v.A * R), 3)} \;${qc(6, "=")}\; ${qr(b / Math.sin(v.B * R), 3)} = \frac{b}{\sin B}`],
        out: [["a", smN(a, 3)], ["b", smN(b, 3)], ["C", smN(C, 0) + "°"]], svg }; } }
});
})();
