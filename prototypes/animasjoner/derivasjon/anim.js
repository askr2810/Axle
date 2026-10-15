// Pilotanimasjon: «Fra sekant til tangent – hva den deriverte er» (manus: docs/animasjoner/derivasjon.md).
// Prototype utenfor appen. Leses av ../player.js (nettleser), ../voice.mjs (lyd) og tools/test_anim_proto.js (test).
// Hver replikk (line) har planlagt varighet d (s), fortellertekst vo [nb, en] og ev. wait (tenkepause).
// frame(i, p) tegner replikk i ved fremdrift p (0–1) som SVG. Alt tegnes fra (i, p), så hopp og tidslinje gir alltid samme bilde.
(function(){
  const W = 400, H = 300;
  // Grafen: x ∈ [-0,4; 5,6], y ∈ [-1,5; 28] tegnes i boksen 34–262 × 14–252. Høyre felt (272–394) er for tabeller og tekst.
  const GX0 = 34, GX1 = 262, GY0 = 14, GY1 = 252, XMIN = -0.4, XMAX = 5.6, YMIN = -1.5, YMAX = 28;
  const X = x => GX0 + (x - XMIN) / (XMAX - XMIN) * (GX1 - GX0), Y = y => GY1 - (y - YMIN) / (YMAX - YMIN) * (GY1 - GY0);
  const f = x => x * x;
  const r1 = n => Math.round(n * 10) / 10, r2 = n => Math.round(n * 100) / 100;
  const ease = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  const seg = (p, a, b) => ease((p - a) / (b - a)); // 0 før a, 1 etter b
  const lerp = (a, b, t) => a + (b - a) * t;
  let L = "nb"; const T = (nb, en) => L === "en" ? en : nb;
  const num = (n, d) => { const s = String(d == null ? n : Math.round(n * 10 ** d) / 10 ** d); return L === "en" ? s : s.replace(".", ","); };
  const txt = (x, y, s, cls, anchor, extra) => `<text x="${x}" y="${y}" class="${cls || ""}"${anchor ? ` text-anchor="${anchor}"` : ""}${extra || ""}>${s}</text>`;
  const ln = (x1, y1, x2, y2, cls, extra) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}"${extra || ""}/>`;
  const dot = (x, y, cls) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="5" class="${cls}"/>`;
  const op = o => o >= 1 ? "" : ` opacity="${Math.max(0, o).toFixed(2)}"`;

  function axes(){
    let s = ln(X(XMIN), Y(0), X(XMAX), Y(0), "ax") + ln(X(0), Y(YMIN), X(0), Y(YMAX), "ax");
    for (let x = 1; x <= 5; x++) s += ln(X(x), Y(0) - 3, X(x), Y(0) + 3, "ax") + txt(X(x), Y(0) + 17, x, "tk", "middle");
    for (const y of [10, 20]) s += ln(X(0) - 3, Y(y), X(0) + 3, Y(y), "ax") + txt(X(0) - 6, Y(y) + 5, y, "tk", "end");
    return s + txt(X(XMAX) - 2, Y(0) - 8, "x", "tk it", "end") + txt(X(0) + 8, Y(YMAX) + 12, "y", "tk it");
  }
  function curve(xEnd){
    const xe = Math.min(xEnd == null ? XMAX : xEnd, Math.sqrt(YMAX)); if (xe <= XMIN + 1e-6) return "";
    let d = ""; const n = 80;
    for (let k = 0; k <= n; k++){ const x = lerp(XMIN, xe, k / n); d += (k ? "L" : "M") + X(x).toFixed(1) + " " + Y(f(x)).toFixed(1); }
    return `<path d="${d}" class="cv"/>`;
  }
  // Rett linje med stigning m gjennom (x0, y0), klippet til grafboksen (clipPath i player.js).
  function line(x0, y0, m, cls, o){ const xa = XMIN, xb = XMAX; return ln(X(xa), Y(y0 + m * (xa - x0)), X(xb), Y(y0 + m * (xb - x0)), cls, (o == null ? "" : op(o)) + ' clip-path="url(#gclip)"'); }
  // Sekanten gjennom P(3, 9) og Q(3 + h, (3 + h)²) har stigning 6 + h.
  function secant(h, o, cls){ return line(3, 9, 6 + h, cls || "sec", o); }
  const P = (o, lab) => `<g${op(o == null ? 1 : o)}>${dot(3, 9, "pt")}${lab === false ? "" : txt(X(3) - 9, Y(9) + 4, "P", "lab", "end")}</g>`;
  const Q = (h, o, lab) => `<g${op(o == null ? 1 : o)}>${dot(3 + h, f(3 + h), "ptq")}${lab === false ? "" : txt(X(3 + h) + 9, Y(f(3 + h)) + 5, "Q", "lab q")}</g>`;
  const head = s => txt(272, 30, s, "hd");
  // Tabell i høyre felt: rader [[a, b], …], synlighet per rad.
  function table(h1, h2, rows, vis, hi){
    let s = txt(286, 62, h1, "th", "middle") + txt(352, 62, h2, "th", "middle") + ln(272, 68, 392, 68, "rule");
    rows.forEach((r, k) => { const o = vis[k] == null ? 1 : vis[k]; if (o <= 0) return; const y = 88 + k * 22, c = hi === k ? " hi" : "";
      s += `<g${op(o)}>` + txt(286, y, r[0], "td" + c, "middle") + txt(352, y, r[1], "td" + c, "middle") + "</g>"; });
    return s;
  }
  // Stigningstrekant fra P til Q: Δx bortover, Δy oppover.
  function triangle(h, o){
    const x2 = 3 + h, y2 = f(x2);
    return `<g${op(o)}>` + ln(X(3), Y(9), X(x2), Y(9), "tri") + ln(X(x2), Y(9), X(x2), Y(y2), "tri") +
      txt((X(3) + X(x2)) / 2, Y(9) + 17, num(h), "lab tri-t", "middle") + txt(X(x2) + 7, (Y(9) + Y(y2)) / 2 + 5, num(y2 - 9), "lab tri-t") + "</g>";
  }
  // h-klammen under grafen mellom x = 3 og x = 3 + h.
  function hBrace(h, o){
    if (h < 0.06) return ""; const y = Y(0) + 27;
    return `<g${op(o)}>` + ln(X(3), y - 4, X(3), y + 4, "tri") + ln(X(3 + h), y - 4, X(3 + h), y + 4, "tri") + ln(X(3), y, X(3 + h), y, "tri") +
      txt((X(3) + X(3 + h)) / 2, y + 19, "h", "lab it tri-t", "middle") + "</g>";
  }

  // Rekkefølgen av h i scene 6–7 og stigningen 6 + h (kontrollert i tools/test_anim_proto.js).
  const HS = [1, 0.5, 0.1, 0.01];
  function hAt(p){ // replikk 7 (h går 2 → 1 → 0,5 → 0,1)
    if (p < 0.3) return lerp(2, 1, seg(p, 0, 0.25));
    if (p < 0.6) return lerp(1, 0.5, seg(p, 0.33, 0.55));
    return lerp(0.5, 0.1, seg(p, 0.63, 0.88));
  }
  const slopeRows = () => HS.map(h => [num(h), num(6 + h, 2)]);

  const lines = [
    { id: "l01", s: 0, d: 8,
      vo: ["En rett linje er like bratt overalt. Men hvor bratt er denne kurven akkurat der x er 3?",
           "A straight line is equally steep everywhere. But how steep is this curve exactly where x is 3?"],
      see: ["Grafen til f(x) = x² tegnes fra venstre. Punktet P(3, 9) dukker opp.", "The graph of f(x) = x² is drawn from the left. The point P(3, 9) appears."],
      frame: p => axes() + curve(lerp(XMIN, XMAX, seg(p, 0, 0.6))) + P(seg(p, 0.6, 0.75)) +
        `<g${op(seg(p, 0.2, 0.4))}>` + head("f(x) = x²") + "</g>" + `<g${op(seg(p, 0.7, 0.85))}>` + txt(272, 58, "P = (3, 9)", "lab") + txt(272, 84, T("Hvor bratt", "How steep"), "mu") + txt(272, 104, T("er kurven i P?", "is it at P?"), "mu") + "</g>" },
    { id: "l02", s: 1, d: 10,
      vo: ["Vi låner en idé fra rette linjer. Vi velger et punkt til, der x er 5, og trekker en linje gjennom begge punktene.",
           "We borrow an idea from straight lines. We pick one more point, where x is 5, and draw a line through both points."],
      see: ["Punktet Q(5, 25) dukker opp. En rett linje (sekanten) trekkes gjennom P og Q.", "The point Q(5, 25) appears. A straight line (the secant) is drawn through P and Q."],
      frame: p => axes() + curve() + secant(2, seg(p, 0.45, 0.85)) + P() + Q(2, seg(p, 0.15, 0.35)) + head(T("Sekant", "Secant")) +
        `<g${op(seg(p, 0.15, 0.35))}>` + txt(272, 58, "Q = (5, 25)", "lab q") + "</g>" +
        `<g${op(seg(p, 0.7, 0.9))}>` + txt(272, 84, T("linje gjennom", "line through"), "mu") + txt(272, 104, T("P og Q", "P and Q"), "mu") + "</g>" },
    { id: "l03", s: 2, d: 7,
      vo: ["Linjen stiger 16 når vi går 2 bortover. Stigningstallet er 16 delt på 2, altså 8.",
           "The line rises 16 when we move 2 across. The slope is 16 divided by 2, which is 8."],
      see: ["En stigningstrekant: 2 bortover og 16 opp. Skjermtekst: stigning = 16 / 2 = 8.", "A slope triangle: 2 across and 16 up. Screen text: slope = 16 / 2 = 8."],
      frame: p => axes() + curve() + secant(2) + triangle(2, seg(p, 0, 0.3)) + P() + Q(2) + head(T("Sekant", "Secant")) +
        `<g${op(seg(p, 0.55, 0.75))}>` + txt(272, 58, T("stigning", "slope"), "mu") + txt(272, 82, "16 / 2 = 8", "big sec-t") + "</g>" },
    { id: "l04", s: 3, d: 9,
      vo: ["Hadde vi valgt x lik 4 i stedet, ville linjen fått stigningstallet 7. Svaret avhenger av hvilket punkt vi velger.",
           "If we had picked x equal to 4 instead, the line would have slope 7. The answer depends on which point we pick."],
      see: ["Q glir fra x = 5 til x = 4, og sekanten blir slakere. Tabell: Q ved x = 5 gir 8, Q ved x = 4 gir 7.", "Q slides from x = 5 to x = 4 and the secant gets less steep. Table: Q at x = 5 gives 8, Q at x = 4 gives 7."],
      frame: p => { const h = lerp(2, 1, seg(p, 0.1, 0.5));
        return axes() + curve() + secant(2, 0.35, "sec ghost") + secant(h) + P() + Q(h) + head(T("Andre Q?", "Another Q?")) +
          table(T("Q ved x", "Q at x"), T("stigning", "slope"), [["5", "8"], ["4", "7"]], [1, seg(p, 0.45, 0.6)]); } },
    { id: "l05", s: 3, d: 4,
      vo: ["Så ingen av dem er stigningen i selve punktet P.", "So neither of them is the slope at the point P itself."],
      see: ["Begge sekantene står igjen. Skjermtekst: «Ingen av dem er stigningen i P.»", "Both secants remain. Screen text: “Neither is the slope at P.”"],
      frame: p => axes() + curve() + secant(2, 0.35, "sec ghost") + secant(1) + P() + Q(1) + head(T("Andre Q?", "Another Q?")) +
        table(T("Q ved x", "Q at x"), T("stigning", "slope"), [["5", "8"], ["4", "7"]], [1, 1]) +
        `<g${op(seg(p, 0.2, 0.5))}>` + txt(272, 160, T("Ingen av dem", "Neither is"), "mu") + txt(272, 180, T("er stigningen i P.", "the slope at P."), "mu") + "</g>" },
    { id: "l06", s: 4, d: 9, wait: true,
      vo: ["Hva tror du skjer med stigningstallet når det andre punktet kommer nærmere og nærmere P? Tenk deg om, og trykk Fortsett.",
           "What do you think happens to the slope as the second point gets closer and closer to P? Think about it, then press Continue."],
      see: ["Tenkepause. Q står igjen ved x = 5. Spørsmålet står på skjermen, og animasjonen venter.", "Thinking pause. Q is back at x = 5. The question is on screen and the animation waits."],
      frame: p => axes() + curve() + secant(2, 0.5) + P() + Q(2) + head(T("Tenk selv", "Think first")) +
        `<g${op(seg(p, 0.1, 0.3))}>` + txt(272, 58, T("Q nærmer seg P.", "Q nears P."), "mu") + txt(272, 84, T("Hva skjer med", "What happens"), "lab") + txt(272, 104, T("stigningen?", "to the slope?"), "lab") + "</g>" },
    { id: "l07", s: 5, d: 6,
      vo: ["La det andre punktet gli mot P. Avstanden bortover mellom dem kaller vi h.",
           "Let the second point slide towards P. We call the distance across between them h."],
      see: ["Klammen h vises under grafen mellom x = 3 og x = 5.", "A bracket labelled h appears below the graph between x = 3 and x = 5."],
      frame: p => axes() + curve() + secant(2) + P() + Q(2) + hBrace(2, seg(p, 0.3, 0.6)) + head(T("Q mot P", "Q towards P")) +
        `<g${op(seg(p, 0.5, 0.7))}>` + table("h", T("stigning", "slope"), [["2", "8"]], [1]) + "</g>" },
    { id: "l08", s: 5, d: 9,
      vo: ["Når h er 1, er stigningen 7. Når h er en halv, er den 6,5. Når h er en tidel, er den 6,1.",
           "When h is 1, the slope is 7. When h is a half, it is 6.5. When h is a tenth, it is 6.1."],
      see: ["Q glir mot P i tre trinn (h = 1, 0,5 og 0,1). Tabellen fylles: 7, 6,5 og 6,1.", "Q slides towards P in three steps (h = 1, 0.5 and 0.1). The table fills in: 7, 6.5 and 6.1."],
      frame: p => { const h = hAt(p), rows = slopeRows();
        return axes() + curve() + secant(h) + P() + Q(h, 1, h > 0.4) + hBrace(h, 1) + head(T("Q mot P", "Q towards P")) +
          table("h", T("stigning", "slope"), rows, [seg(p, 0.22, 0.3), seg(p, 0.52, 0.6), seg(p, 0.85, 0.93), 0]); } },
    { id: "l09", s: 6, d: 8,
      vo: ["Tallene nærmer seg 6. Og linjen slutter å skjære gjennom kurven. Den legger seg inntil. Det er tangenten.",
           "The numbers approach 6. And the line stops cutting through the curve. It just touches it. That is the tangent."],
      see: ["h krymper til 0,01, linjen skifter farge og blir tangenten med stigning 6.", "h shrinks to 0.01, the line changes colour and becomes the tangent with slope 6."],
      frame: p => { const h = lerp(0.1, 0.01, seg(p, 0, 0.3)), t = seg(p, 0.45, 0.7);
        return axes() + curve() + secant(h, 1 - t) + line(3, 9, 6, "tan", t) + P() + Q(h, 1 - seg(p, 0.3, 0.45), false) + head(t > 0.5 ? T("Tangent", "Tangent") : T("Q mot P", "Q towards P")) +
          table("h", T("stigning", "slope"), slopeRows(), [1, 1, 1, seg(p, 0.15, 0.3)], 3) +
          `<g${op(seg(p, 0.6, 0.8))}>` + txt(272, 200, T("→ 6 når h → 0", "→ 6 as h → 0"), "lab tan-t") + "</g>"; } },
    { id: "l10", s: 7, d: 7,
      vo: ["Algebraen sier det samme. Vi regner ut stigningen mellom x lik 3 og x lik 3 pluss h.",
           "The algebra agrees. We find the slope between x equals 3 and x equals 3 plus h."],
      see: ["Grafen forsvinner. Regnestykket skrives linje for linje: stigning = (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h.", "The graph disappears. The working appears line by line: slope = (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h."],
      frame: p => algebra(p < 0.5 ? 1 : 2, p) },
    { id: "l11", s: 7, d: 8,
      vo: ["Ganger vi ut og forkorter med h, står 6 pluss h igjen. Når h går mot null, blir det 6.",
           "If we expand and cancel h, we are left with 6 plus h. As h goes to zero, that becomes 6."],
      see: ["Tre nye linjer: = (6h + h²) / h, = 6 + h og → 6 når h → 0.", "Three new lines: = (6h + h²) / h, = 6 + h and → 6 as h → 0."],
      frame: p => algebra(2 + Math.min(3, Math.floor(p * 3.6 + 0.4)), 1) },
    { id: "l12", s: 8, d: 8,
      vo: ["Gjør det samme der x er 1 og der x er 2. Da får du stigningene 2 og 4.",
           "Do the same where x is 1 and where x is 2. Then you get the slopes 2 and 4."],
      see: ["Tangenter i x = 1 og x = 2 tegnes. Tabellen x / stigning: 1 → 2, 2 → 4, 3 → 6.", "Tangents at x = 1 and x = 2 are drawn. The table x / slope: 1 → 2, 2 → 4, 3 → 6."],
      frame: p => everywhere(p, false) },
    { id: "l13", s: 8, d: 7,
      vo: ["Stigningen er hele tiden det dobbelte av x. Derfor er den deriverte av x i andre lik 2x.",
           "The slope is always twice x. That is why the derivative of x squared is 2x."],
      see: ["Skjermtekst: f′(x) = 2x.", "Screen text: f′(x) = 2x."],
      frame: p => everywhere(1, seg(p, 0.45, 0.7)) },
    { id: "l14", s: 9, d: 11,
      vo: ["Den deriverte er stigningen til tangenten. Vi finner den ved å la sekanten krympe til h nesten er null. Her er f derivert av 3 lik 6.",
           "The derivative is the slope of the tangent. We find it by letting the secant shrink until h is almost zero. Here, f prime of 3 is 6."],
      see: ["Oppsummering ved siden av grafen med tangenten i P: den deriverte = stigningen til tangenten; f′(3) = 6.", "Summary beside the graph with the tangent at P: the derivative = slope of the tangent; f′(3) = 6."],
      frame: p => axes() + curve() + line(3, 9, 6, "tan") + P() + head(T("Oppsummert", "Summary")) +
        `<g${op(seg(p, 0.05, 0.25))}>` + txt(272, 58, T("Den deriverte", "The derivative"), "lab") + txt(272, 78, T("= stigningen til", "= slope of the"), "mu") + txt(272, 98, T("tangenten", "tangent"), "mu tan-t") + "</g>" +
        `<g${op(seg(p, 0.3, 0.5))}>` + txt(272, 130, T("sekanten krymper:", "secant shrinks:"), "mu") + txt(272, 150, T("h → 0", "h → 0"), "lab") + "</g>" +
        `<g${op(seg(p, 0.65, 0.85))}>` + txt(272, 188, "f′(3) = 6", "big tan-t") + "</g>" }
  ];

  // Regnestykket (scene 8), uten graf. n = antall synlige linjer.
  function algebra(n, p){
    const rows = [
      [T("stigning", "slope") + " = (f(3 + h) − f(3)) / h", ""],
      ["= ((3 + h)² − 9) / h", ""],
      ["= (9 + 6h + h² − 9) / h = (6h + h²) / h", "sm"],
      ["= 6 + h", ""],
      [T("→ 6 når h → 0", "→ 6 as h → 0"), "tan-t"]
    ];
    let s = txt(24, 30, T("Regnet ut", "Worked out"), "hd");
    rows.forEach((r, k) => { if (k < n) s += txt(24, 72 + k * 40, r[0], "alg " + r[1]); });
    return s;
  }
  // Scene 9: tangenter i x = 1, 2, 3 og tabellen. p styrer tangentene, fx (0–1) viser f′(x) = 2x.
  function everywhere(p, fx){
    const o1 = seg(p, 0.1, 0.35), o2 = seg(p, 0.45, 0.7);
    let s = axes() + curve() + line(3, 9, 6, "tan") + line(1, 1, 2, "tan2", o1) + line(2, 4, 4, "tan2", o2) +
      dot(1, 1, "pt2") + dot(2, 4, "pt2") + P(1, false) + head(T("Overalt", "Everywhere"));
    s += table("x", T("stigning", "slope"), [["1", "2"], ["2", "4"], ["3", "6"]], [o1, o2, 1]);
    if (fx) s += `<g${op(fx)}>` + txt(272, 188, "f′(x) = 2x", "big tan-t") + "</g>";
    return s;
  }

  const ANIM = {
    id: "derivasjon", W, H,
    graph: { x: GX0, y: GY0, w: GX1 - GX0, h: GY1 - GY0 + 34 },
    title: ["Fra sekant til tangent: hva den deriverte er", "From secant to tangent: what the derivative is"],
    scenes: [
      ["Hvor bratt er kurven?", "How steep is the curve?"], ["En sekant", "A secant"], ["Stigningen til sekanten", "The slope of the secant"],
      ["Det avhenger av punktet", "It depends on the point"], ["Tenkepause", "Thinking pause"], ["Q glir mot P", "Q slides towards P"],
      ["Tangenten", "The tangent"], ["Algebraen", "The algebra"], ["Overalt på kurven", "Everywhere on the curve"], ["Oppsummering", "Summary"]
    ],
    lines,
    check: { q: ["Hva er f′(5) når f(x) = x²?", "What is f′(5) when f(x) = x²?"], opts: ["10", "25", "8", "5"], ans: 0,
      why: ["f′(x) = 2x, så f′(5) = 2 · 5 = 10. 25 er funksjonsverdien f(5), ikke stigningen. 8 er stigningen til sekanten fra x = 3 til x = 5. 5 glemmer faktoren 2.",
            "f′(x) = 2x, so f′(5) = 2 · 5 = 10. 25 is the function value f(5), not the slope. 8 is the slope of the secant from x = 3 to x = 5. 5 forgets the factor 2."] },
    // Tallene som fortelles og vises, slik testen kan regne dem ut på nytt.
    facts: { f, P: [3, 9], Q: [5, 25], hs: HS, slope: h => ((3 + h) ** 2 - 9) / h, tangent: 6, check: 10 },
    setLang(l){ L = l; },
    frame(i, p){ return lines[i].frame(Math.max(0, Math.min(1, p))); }
  };
  if (typeof module !== "undefined") module.exports = ANIM; else window.ANIM = ANIM;
})();
