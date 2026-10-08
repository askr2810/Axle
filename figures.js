// ============================================================
//  FIGURER I TEORIEN – enkle SVG-skisser som følger appens farger (lys og mørk modus).
//  Brukes med linjen ![fig:navn] i teorien, eller kobles til en enhet i FIG_MAP
//  (settes da inn rett etter «Begreper og formler»).
// ============================================================
const fgAr = (x1, y1, x2, y2, cls = "fg-acc", w = 2.2) => {           // pil fra (x1,y1) til (x2,y2)
  const a = Math.atan2(y2 - y1, x2 - x1), h = 8, s = 0.45;
  const p1 = [x2 - h * Math.cos(a - s), y2 - h * Math.sin(a - s)], p2 = [x2 - h * Math.cos(a + s), y2 - h * Math.sin(a + s)];
  const bx = x2 - h * 0.8 * Math.cos(a), by = y2 - h * 0.8 * Math.sin(a);
  return `<g class="${cls}"><line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke-width="${w}"/><polygon points="${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/></g>`;
};
// «X_abc» blir X med senket abc (også midt i teksten, f.eks. «u_C/U»).
const fgSub = s => String(s).split(/_([A-Za-z0-9α-ωΑ-Ω]+)/).map((p, i) => i % 2 ? `<tspan dy="0.3em" font-size="72%">${p}</tspan>` : (i > 1 && p ? `<tspan dy="-0.216em">${p}</tspan>` : p)).join("");
const fgT = (x, y, s, cls = "fg-t", anchor = "middle") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${fgSub(s)}</text>`;
const fgPath = (fn, s0, s1, n = 60) => { let d = ""; for(let i = 0; i <= n; i++){ const s = s0 + (s1 - s0) * i / n, [x, y] = fn(s); d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1); } return d; };
const fgAxes = (x0, y0, x1, y1, lx, ly) => fgAr(x0, y0, x1, y0, "fg-ax", 1.6) + fgAr(x0, y0, x0, y1, "fg-ax", 1.6) + fgT(x1 - 2, y0 + 16, lx, "fg-i", "end") + fgT(x0 - 8, y1 + 4, ly, "fg-i", "end");
const fgGround = (x, y, w) => `<line class="fg-line" x1="${x - w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y}"/>` + Array.from({ length: Math.floor(w / 8) }, (_, i) => `<line class="fg-mut" x1="${x - w / 2 + 4 + i * 8}" y1="${y}" x2="${x - w / 2 + i * 8}" y2="${y + 6}"/>`).join("");

const FIGS = {
  beam_fbd: () => ({ cap: T("Frilegemediagram: bjelken alene med ytre laster og opplagerkrefter.", "Free-body diagram: the beam alone with external loads and support reactions."), svg: `
    <rect class="fg-fill" x="40" y="80" width="240" height="12" rx="2"/><rect class="fg-line" x="40" y="80" width="240" height="12" rx="2" fill="none"/>
    <polygon class="fg-line" points="40,92 30,110 50,110" fill="none"/>${fgGround(40, 110, 36)}
    <circle class="fg-line" cx="280" cy="99" r="7" fill="none"/>${fgGround(280, 110, 36)}
    ${fgAr(120, 36, 120, 78, "fg-red")}${fgT(120, 30, "12 kN")}${fgAr(220, 50, 220, 78, "fg-red")}${fgT(220, 44, "6 kN")}
    ${fgAr(40, 160, 40, 116)}${fgT(56, 152, "A<tspan baseline-shift='sub' font-size='9'>y</tspan>", "fg-i fg-acct", "start")}
    ${fgAr(280, 160, 280, 116)}${fgT(264, 152, "B<tspan baseline-shift='sub' font-size='9'>y</tspan>", "fg-i fg-acct", "end")}
    ${fgT(40, 74, "A", "fg-b")}${fgT(280, 74, "B", "fg-b")}
    <g class="fg-mut"><line x1="40" y1="176" x2="120" y2="176"/><line x1="40" y1="171" x2="40" y2="181"/><line x1="120" y1="171" x2="120" y2="181"/></g>${fgT(80, 171, "2 m", "fg-s")}` }),

  incline: () => {
    const u = [0.945, -0.327], n = [-0.327, -0.945], C = [168.4, 105.3], ang = -19.1;
    const P = (v, k) => [C[0] + v[0] * k, C[1] + v[1] * k];
    const G = [C[0], C[1] + 58], N = P(n, 55), Gp = P([-u[0], -u[1]], 50), Gn = P([-n[0], -n[1]], 52);
    return { cap: T("Kloss på skråplan: tyngden G deles i en komponent langs planet og en inn mot planet. N står vinkelrett på planet.", "Block on an incline: the weight G splits into a component along the plane and one into the plane. N is perpendicular to the plane."), svg: `
      <polygon class="fg-fill" points="30,150 290,150 290,60"/><polyline class="fg-line" points="30,150 290,150 290,60 30,150" fill="none"/>
      <path class="fg-mut" d="M70 150 A40 40 0 0 0 67.8 137" fill="none"/>${fgT(82, 145, "θ", "fg-i", "start")}
      <rect class="fg-box" x="${C[0] - 16}" y="${C[1] - 12}" width="32" height="24" rx="3" transform="rotate(${ang} ${C[0]} ${C[1]})"/>
      ${fgAr(C[0], C[1], G[0], G[1], "fg-red")}${fgT(G[0] - 8, G[1] + 2, "G", "fg-i fg-redt", "end")}
      ${fgAr(C[0], C[1], N[0], N[1])}${fgT(N[0] - 8, N[1], "N", "fg-i fg-acct", "end")}
      <g stroke-dasharray="4 3">${fgAr(C[0], C[1], Gp[0], Gp[1], "fg-mutd", 1.8)}${fgAr(C[0], C[1], Gn[0], Gn[1], "fg-mutd", 1.8)}</g>
      ${fgT(Gp[0] - 4, Gp[1] - 8, "G sin θ", "fg-s", "end")}${fgT(Gn[0] + 8, Gn[1] + 10, "G cos θ", "fg-s", "start")}` };
  },

  beam_moment: () => ({ cap: T("Fritt opplagt bjelke med punktlast på midten. Momentet er størst under lasten: M = PL/4.", "Simply supported beam with a point load at mid-span. The moment is largest under the load: M = PL/4."), svg: `
    <rect class="fg-fill" x="40" y="48" width="240" height="10" rx="2"/><rect class="fg-line" x="40" y="48" width="240" height="10" rx="2" fill="none"/>
    <polygon class="fg-line" points="40,58 31,72 49,72" fill="none"/><circle class="fg-line" cx="280" cy="65" r="6" fill="none"/>
    ${fgAr(160, 12, 160, 46, "fg-red")}${fgT(172, 24, "P", "fg-i fg-redt", "start")}
    <line class="fg-mut" x1="40" y1="100" x2="280" y2="100"/>
    <polygon class="fg-mfill" points="40,100 160,160 280,100"/><polyline class="fg-acc" points="40,100 160,160 280,100" fill="none" stroke-width="2.2"/>
    ${fgT(160, 170, "M<tspan baseline-shift='sub' font-size='9'>maks</tspan> = PL/4", "fg-i fg-acct")}${fgT(30, 104, "M", "fg-i", "end")}
    <g class="fg-mut"><line x1="40" y1="84" x2="280" y2="84"/><line x1="40" y1="79" x2="40" y2="89"/><line x1="280" y1="79" x2="280" y2="89"/></g>${fgT(160, 80, "L", "fg-i")}` }),

  tangent: () => {
    const f = s => 160 - (0.002 * s * s + 0.08 * s), X = s => 40 + s, P = [X(120), f(120)], Q = [X(210), f(210)], m = -(0.004 * 120 + 0.08);
    return { cap: T("Sekanten gjennom to punkter gir gjennomsnittlig vekstfart Δy/Δx. Når punktene nærmer seg hverandre, blir den tangenten, og stigningen blir f′(x).", "The secant through two points gives the average rate of change Δy/Δx. As the points approach each other it becomes the tangent, whose slope is f′(x)."), svg: `
      ${fgAxes(40, 160, 300, 12, "x", "y")}
      <path class="fg-acc" d="${fgPath(s => [X(s), f(s)], 0, 245)}" fill="none" stroke-width="2.4"/>
      <line class="fg-red" x1="${X(60)}" y1="${(P[1] + m * (60 - 120)).toFixed(1)}" x2="${X(235)}" y2="${(P[1] + m * (235 - 120)).toFixed(1)}" stroke-width="2"/>
      <line class="fg-mut" stroke-dasharray="5 4" x1="${X(90)}" y1="${(P[1] + (Q[1] - P[1]) / 90 * -30).toFixed(1)}" x2="${X(235)}" y2="${(P[1] + (Q[1] - P[1]) / 90 * 115).toFixed(1)}" stroke-width="1.8"/>
      <g class="fg-mut" stroke-dasharray="3 3"><line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${P[1]}"/><line x1="${Q[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}"/></g>
      ${fgT((P[0] + Q[0]) / 2, P[1] + 14, "Δx", "fg-i")}${fgT(Q[0] + 6, (P[1] + Q[1]) / 2, "Δy", "fg-i", "start")}
      <circle class="fg-dot" cx="${P[0]}" cy="${P[1]}" r="4"/><circle class="fg-dot" cx="${Q[0]}" cy="${Q[1]}" r="4"/>
      ${fgT(X(236), P[1] + m * (236 - 120) + 16, T("tangent", "tangent"), "fg-s fg-redt", "start")}${fgT(X(236), P[1] + (Q[1] - P[1]) / 90 * 116 - 4, T("sekant", "secant"), "fg-s", "start")}` };
  },

  area: () => {
    const f = s => 150 - (40 + 60 * Math.sin(s / 60) + s * 0.15), X = s => 40 + s;
    return { cap: T("Det bestemte integralet er arealet mellom grafen og x-aksen fra a til b.", "The definite integral is the area between the graph and the x-axis from a to b."), svg: `
      ${fgAxes(40, 150, 300, 12, "x", "y")}
      <path class="fg-fill2" d="M${X(50)} 150 ${fgPath(s => [X(s), f(s)], 50, 200).replace("M", "L")} L${X(200)} 150Z"/>
      <path class="fg-acc" d="${fgPath(s => [X(s), f(s)], 0, 250)}" fill="none" stroke-width="2.4"/>
      <line class="fg-mut" x1="${X(50)}" y1="150" x2="${X(50)}" y2="${f(50).toFixed(1)}"/><line class="fg-mut" x1="${X(200)}" y1="150" x2="${X(200)}" y2="${f(200).toFixed(1)}"/>
      ${fgT(X(50), 166, "a", "fg-i")}${fgT(X(200), 166, "b", "fg-i")}${fgT(X(125), 128, "A = ∫ f(x) dx", "fg-i fg-b")}` };
  },

  circuit_sp: () => ({ cap: T("R₁ i serie med parallellkoblingen av R₂ og R₃. Samme strøm går gjennom seriekoblede motstander, mens parallelle greiner har samme spenning.", "R₁ in series with the parallel combination of R₂ and R₃. The same current flows through series resistors, while parallel branches share the same voltage."), svg: `
    <g class="fg-line" fill="none"><polyline points="60,82 60,40 220,40 280,40 280,150 60,150 60,98"/><line x1="220" y1="40" x2="220" y2="150"/></g>
    <line class="fg-line" x1="46" y1="82" x2="74" y2="82" stroke-width="2.6"/><line class="fg-line" x1="52" y1="98" x2="68" y2="98" stroke-width="4"/>
    ${fgT(38, 94, "U", "fg-i", "end")}${fgT(76, 78, "+", "fg-s", "start")}
    <rect class="fg-box" x="115" y="32" width="50" height="16" rx="2"/>${fgT(140, 24, "R₁", "fg-i")}
    <rect class="fg-box" x="212" y="75" width="16" height="42" rx="2"/>${fgT(206, 100, "R₂", "fg-i", "end")}
    <rect class="fg-box" x="272" y="75" width="16" height="42" rx="2"/>${fgT(296, 100, "R₃", "fg-i", "start")}
    <circle class="fg-dot" cx="220" cy="40" r="3.5"/><circle class="fg-dot" cx="220" cy="150" r="3.5"/>
    ${fgAr(80, 40, 104, 40, "fg-acc", 2)}${fgT(92, 32, "I", "fg-i fg-acct")}` }),

  rc_curve: () => {
    const X = t => 50 + t * 48, Y = v => 150 - v * 110, tau = 1;
    return { cap: T("Stegrespons for et førsteordens system: etter én tidskonstant τ er 63 % av endringen nådd, etter fire τ omtrent 98 %.", "Step response of a first-order system: after one time constant τ, 63 % of the change is reached, after four τ about 98 %."), svg: `
      ${fgAxes(50, 150, 305, 14, "t", "y")}
      <line class="fg-mut" stroke-dasharray="5 4" x1="50" y1="${Y(1)}" x2="300" y2="${Y(1)}"/>${fgT(300, Y(1) - 6, T("sluttverdi", "final value"), "fg-s", "end")}
      <g class="fg-mut" stroke-dasharray="3 3"><line x1="50" y1="${Y(0.632)}" x2="${X(tau)}" y2="${Y(0.632)}"/><line x1="${X(tau)}" y1="${Y(0.632)}" x2="${X(tau)}" y2="150"/>
      <line x1="${X(4)}" y1="${Y(0.982)}" x2="${X(4)}" y2="150"/></g>
      <path class="fg-acc" d="${fgPath(t => [X(t), Y(1 - Math.exp(-t / tau))], 0, 5.2)}" fill="none" stroke-width="2.6"/>
      ${fgT(44, Y(0.632) + 4, "63 %", "fg-s", "end")}${fgT(X(tau), 166, "τ", "fg-i")}${fgT(X(4), 166, "4τ", "fg-i")}
      <circle class="fg-dot" cx="${X(tau)}" cy="${Y(0.632)}" r="4"/>` };
  },

  sine: () => {
    const X = t => 40 + t * 250, Y = v => 90 - v * 55;
    return { cap: T("Vekselspenning: amplituden Û er toppverdien, perioden T er tiden for én hel svingning, og f = 1/T.", "AC voltage: the amplitude Û is the peak value, the period T is the time for one full cycle, and f = 1/T."), svg: `
      ${fgAxes(40, 90, 305, 16, "t", "u")}<line class="fg-mut" x1="40" y1="90" x2="300" y2="90"/>
      <path class="fg-acc" d="${fgPath(t => [X(t), Y(Math.sin(2 * Math.PI * t))], 0, 1.02, 80)}" fill="none" stroke-width="2.6"/>
      ${fgAr(X(0.25) + 18, 90, X(0.25) + 18, Y(1), "fg-red", 1.8)}${fgT(X(0.25) + 24, 66, "Û", "fg-i fg-redt", "start")}
      <g class="fg-mut"><line x1="${X(0)}" y1="160" x2="${X(1)}" y2="160"/><line x1="${X(0)}" y1="154" x2="${X(0)}" y2="166"/><line x1="${X(1)}" y1="154" x2="${X(1)}" y2="166"/></g>${fgT(X(0.5), 156, "T", "fg-i")}` };
  },

  three_phase: () => {
    const X = t => 40 + t * 250, Y = v => 90 - v * 55, cls = ["fg-acc", "fg-ok", "fg-red"];
    return { cap: T("Trefase: tre spenninger med samme amplitude, forskjøvet 120° (en tredel periode) i forhold til hverandre.", "Three-phase: three voltages with the same amplitude, shifted 120° (a third of a period) relative to each other."), svg: `
      ${fgAxes(40, 90, 305, 16, "t", "u")}<line class="fg-mut" x1="40" y1="90" x2="300" y2="90"/>
      ${[0, 1, 2].map(k => `<path class="${cls[k]}" d="${fgPath(t => [X(t), Y(Math.sin(2 * Math.PI * (t - k / 3)))], 0, 1.02, 80)}" fill="none" stroke-width="2.4"/>`).join("")}
      ${fgT(X(0.25), Y(1) - 6, "L1", "fg-s fg-acct")}${fgT(X(0.25 + 1 / 3), Y(1) - 6, "L2", "fg-s fg-okt")}${fgT(X(0.25 + 2 / 3), Y(1) - 6, "L3", "fg-s fg-redt")}
      <g class="fg-mut"><line x1="${X(0.25)}" y1="164" x2="${X(0.25 + 1 / 3)}" y2="164"/></g>${fgT(X(0.25 + 1 / 6), 160, "120°", "fg-s")}` };
  },

  venturi: () => ({ cap: T("Innsnevring i et rør: der tverrsnittet er mindre, går væsken fortere (kontinuitet), og trykket blir lavere (Bernoulli).", "A constriction in a pipe: where the cross-section is smaller the fluid flows faster (continuity), and the pressure is lower (Bernoulli)."), svg: `
    <path class="fg-fill" d="M20 70 L110 70 L150 88 L190 88 L230 70 L300 70 L300 140 L230 140 L190 122 L150 122 L110 140 L20 140Z"/>
    <path class="fg-line" d="M20 70 L110 70 L150 88 L190 88 L230 70 L300 70 M20 140 L110 140 L150 122 L190 122 L230 140 L300 140" fill="none"/>
    ${fgAr(35, 105, 80, 105, "fg-acc", 2)}${fgAr(148, 105, 200, 105, "fg-acc", 3)}${fgAr(245, 105, 290, 105, "fg-acc", 2)}
    <g class="fg-line" fill="none"><polyline points="58,70 58,26 70,26 70,70"/><polyline points="164,88 164,52 176,52 176,88"/></g>
    <rect class="fg-water" x="59.5" y="36" width="9" height="34"/><rect class="fg-water" x="165.5" y="66" width="9" height="22"/>
    ${fgT(64, 170, "A₁, v₁, p₁", "fg-i")}${fgT(170, 170, "A₂, v₂, p₂", "fg-i")}
    ${fgT(82, 34, T("høyt trykk", "high pressure"), "fg-s", "start")}${fgT(188, 62, T("lavt trykk", "low pressure"), "fg-s", "start")}
` }),

  pump_curves: () => {
    const X = q => 50 + q * 240, Y = h => 150 - h * 125, pump = q => 0.95 - 0.7 * q * q, sys = q => 0.22 + 0.6 * q * q;
    const qo = Math.sqrt((0.95 - 0.22) / 1.3);
    return { cap: T("Pumpa havner i driftspunktet der pumpekurven (løftehøyden pumpa gir) skjærer systemkurven (løftehøyden rørsystemet krever).", "The pump operates where the pump curve (the head the pump delivers) crosses the system curve (the head the pipe system requires)."), svg: `
      ${fgAxes(50, 150, 305, 12, "Q", "H")}
      <path class="fg-acc" d="${fgPath(q => [X(q), Y(pump(q))], 0, 1.05)}" fill="none" stroke-width="2.4"/>
      <path class="fg-red" d="${fgPath(q => [X(q), Y(sys(q))], 0, 1.05)}" fill="none" stroke-width="2.4"/>
      <line class="fg-mut" stroke-dasharray="3 3" x1="50" y1="${Y(0.22)}" x2="80" y2="${Y(0.22)}"/>${fgT(44, Y(0.22) + 4, "H<tspan baseline-shift='sub' font-size='9'>st</tspan>", "fg-i", "end")}
      <circle class="fg-dot" cx="${X(qo)}" cy="${Y(pump(qo))}" r="5"/>${fgT(X(qo) - 6, Y(pump(qo)) - 12, T("driftspunkt", "operating point"), "fg-s fg-b", "end")}
      ${fgT(X(0.12), Y(pump(0.12)) - 8, T("pumpekurve", "pump curve"), "fg-s fg-acct", "start")}${fgT(X(0.9), Y(sys(0.9)) - 8, T("systemkurve", "system curve"), "fg-s fg-redt", "end")}` };
  },

  triangle: () => ({ cap: T("Rettvinklet trekant: sin v = motstående/hypotenus, cos v = hosliggende/hypotenus og tan v = motstående/hosliggende.", "Right triangle: sin v = opposite/hypotenuse, cos v = adjacent/hypotenuse and tan v = opposite/adjacent."), svg: `
    <polygon class="fg-fill" points="30,150 240,150 240,40"/><polygon class="fg-line" points="30,150 240,150 240,40" fill="none"/>
    <polyline class="fg-line" points="226,150 226,136 240,136" fill="none"/><path class="fg-acc" d="M75 150 A45 45 0 0 0 70.3 129.9" fill="none" stroke-width="2"/>
    ${fgT(82, 142, "v", "fg-i fg-acct", "start")}
    ${fgT(135, 168, T("hosliggende katet", "adjacent side"), "fg-s")}${fgT(250, 92, T("motstående", "opposite"), "fg-s", "start")}${fgT(250, 106, T("katet", "side"), "fg-s", "start")}
    ${fgT(128, 86, T("hypotenus", "hypotenuse"), "fg-s fg-b", "end")}` }),

  regression: () => {
    const pts = [[20, 38], [40, 52], [60, 44], [80, 70], [100, 74], [120, 106], [140, 90], [160, 110], [180, 104], [200, 128]], X = x => 50 + x * 1.2, Y = y => 160 - y;
    const a = 22.4, b = 0.53;
    return { cap: T("Regresjonslinja går gjennom punktskyen slik at summen av de kvadrerte residualene (de loddrette avstandene) blir minst mulig.", "The regression line runs through the scatter so that the sum of the squared residuals (the vertical distances) is as small as possible."), svg: `
      ${fgAxes(50, 160, 305, 14, "x", "y")}
      <line class="fg-acc" x1="${X(0)}" y1="${Y(a)}" x2="${X(210)}" y2="${Y(a + b * 210)}" stroke-width="2.4"/>
      ${pts.map(([x, y]) => `<line class="fg-red" x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(a + b * x).toFixed(1)}" stroke-width="1.4"/><circle class="fg-dot2" cx="${X(x)}" cy="${Y(y)}" r="4"/>`).join("")}
      ${fgT(X(212), Y(a + b * 212) - 6, "ŷ = a + bx", "fg-i fg-acct", "end")}${fgT(X(120) - 8, Y(100), T("residual", "residual"), "fg-s fg-redt", "end")}` };
  },

  heat_pump: () => ({ cap: T("Varmepumpas kretsløp: fordamperen tar opp varme ute, kompressoren tilfører arbeidet W, og kondensatoren avgir varme inne. Varmen inne er varmen ute pluss arbeidet.", "The heat pump cycle: the evaporator absorbs heat outdoors, the compressor adds the work W, and the condenser releases heat indoors. The heat indoors is the heat from outside plus the work."), svg: `
    <rect class="fg-hot" x="90" y="18" width="140" height="30" rx="8"/>${fgT(160, 38, T("kondensator", "condenser"), "fg-s fg-b")}
    <rect class="fg-cold" x="90" y="128" width="140" height="30" rx="8"/>${fgT(160, 148, T("fordamper", "evaporator"), "fg-s fg-b")}
    <circle class="fg-box" cx="262" cy="88" r="20"/>${fgT(262, 92, "K", "fg-b")}<polygon class="fg-box" points="48,78 68,78 58,98"/><polygon class="fg-box" points="48,98 68,98 58,78"/>
    <g class="fg-line" fill="none"><polyline points="230,33 262,33 262,68"/><polyline points="262,108 262,143 230,143"/><polyline points="90,143 58,143 58,98"/><polyline points="58,78 58,33 90,33"/></g>
    ${fgAr(262, 60, 262, 46, "fg-line", 2)}${fgAr(58, 116, 58, 130, "fg-line", 2)}
    ${fgAr(160, 16, 160, -2, "fg-red", 2.4)}${fgT(174, 11, "Q<tspan baseline-shift='sub' font-size='9'>H</tspan>", "fg-i fg-redt", "start")}
    ${fgAr(160, 178, 160, 160, "fg-acc", 2.4)}${fgT(172, 174, "Q<tspan baseline-shift='sub' font-size='9'>L</tspan>", "fg-i fg-acct", "start")}
    ${fgAr(308, 88, 284, 88, "fg-ok", 2.4)}${fgT(306, 80, "W", "fg-i fg-okt", "end")}
    ${fgT(20, 92, T("strupe-", "expansion"), "fg-s", "start")}${fgT(20, 104, T("ventil", "valve"), "fg-s", "start")}` }),

  stress_strain: () => {
    const X = e => 50 + e * 240, Y = s => 150 - s * 120;
    const d = `M${X(0)} ${Y(0)} L${X(0.12)} ${Y(0.62)} C${X(0.16)} ${Y(0.66)} ${X(0.2)} ${Y(0.64)} ${X(0.26)} ${Y(0.7)} C${X(0.5)} ${Y(0.92)} ${X(0.72)} ${Y(0.95)} ${X(0.86)} ${Y(0.84)} L${X(0.93)} ${Y(0.72)}`;
    return { cap: T("Spenning–tøyning for stål: rett linje (elastisk, stigning E) opp til flytegrensen Rₑ, deretter plastisk deformasjon opp til bruddgrensen Rₘ.", "Stress–strain for steel: a straight line (elastic, slope E) up to the yield strength Rₑ, then plastic deformation up to the tensile strength Rₘ."), svg: `
      ${fgAxes(50, 150, 305, 12, "ε", "σ")}
      <path class="fg-acc" d="${d}" fill="none" stroke-width="2.6"/>
      <g class="fg-mut" stroke-dasharray="3 3"><line x1="50" y1="${Y(0.62)}" x2="${X(0.12)}" y2="${Y(0.62)}"/><line x1="50" y1="${Y(0.945)}" x2="${X(0.7)}" y2="${Y(0.945)}"/></g>
      ${fgT(44, Y(0.62) + 4, "R<tspan baseline-shift='sub' font-size='9'>e</tspan>", "fg-i", "end")}${fgT(44, Y(0.945) + 4, "R<tspan baseline-shift='sub' font-size='9'>m</tspan>", "fg-i", "end")}
      ${fgT(X(0.075) + 8, Y(0.3), "E", "fg-i fg-acct", "start")}${fgT(X(0.93) + 4, Y(0.72) + 4, "×", "fg-b fg-redt", "start")}
      ${fgT(X(0.06), 166, T("elastisk", "elastic"), "fg-s")}${fgT(X(0.55), 166, T("plastisk", "plastic"), "fg-s")}` };
  },

  wave: () => {
    const X = x => 30 + x * 125, Y = v => 90 - v * 45;
    return { cap: T("Bølgelengden λ er avstanden mellom to bølgetopper. Bølgen flytter seg med farten v = fλ.", "The wavelength λ is the distance between two crests. The wave travels at the speed v = fλ."), svg: `
      <line class="fg-mut" x1="30" y1="90" x2="300" y2="90"/>
      <path class="fg-acc" d="${fgPath(x => [X(x), Y(Math.sin(2 * Math.PI * x))], 0, 2.1, 100)}" fill="none" stroke-width="2.6"/>
      <g class="fg-mut"><line x1="${X(0.25)}" y1="30" x2="${X(1.25)}" y2="30"/><line x1="${X(0.25)}" y1="24" x2="${X(0.25)}" y2="46"/><line x1="${X(1.25)}" y1="24" x2="${X(1.25)}" y2="46"/></g>${fgT(X(0.75), 26, "λ", "fg-i fg-b")}
      ${fgAr(X(1.75) + 14, 90, X(1.75) + 14, Y(-1), "fg-red", 1.8)}${fgT(X(1.75) + 22, 128, "A", "fg-i fg-redt", "start")}
      ${fgAr(220, 158, 290, 158, "fg-ok", 2.2)}${fgT(214, 162, "v", "fg-i fg-okt", "end")}` };
  },

  fillet_weld: () => ({ cap: T("Kilsveis i snitt: katetene z og a-målet (halsen), som er omtrent 0,7z. Spenningen regnes på arealet a · L.", "Fillet weld in section: the legs z and the throat a, which is about 0.7z. The stress is computed on the area a · L."), svg: `
    <rect class="fg-fill" x="40" y="120" width="240" height="22"/><rect class="fg-line" x="40" y="120" width="240" height="22" fill="none"/>
    <rect class="fg-fill" x="150" y="20" width="22" height="100"/><rect class="fg-line" x="150" y="20" width="22" height="100" fill="none"/>
    <polygon class="fg-weld" points="172,120 222,120 172,70"/><polygon class="fg-weld" points="150,120 100,120 150,70"/>
    <line class="fg-red" x1="172" y1="120" x2="197" y2="95" stroke-width="2.2"/>${fgT(204, 96, "a", "fg-i fg-redt", "start")}
    <g class="fg-mut"><line x1="172" y1="156" x2="222" y2="156"/><line x1="172" y1="150" x2="172" y2="162"/><line x1="222" y1="150" x2="222" y2="162"/>
    <line x1="236" y1="70" x2="236" y2="120"/><line x1="230" y1="70" x2="242" y2="70"/><line x1="230" y1="120" x2="242" y2="120"/></g>
    ${fgT(197, 172, "z", "fg-i")}${fgT(246, 99, "z", "fg-i", "start")}` })
};
// Brøkstaver: ½ + ⅓ med felles nevner 6 (Grunnleggende matematikk, enhet 1)
FIGS.fractions = () => {
  const x0 = 120, w = 180, c = w / 6, row = (y, n, fill, lab) => {
    let s = `<rect class="fg-box" x="${x0}" y="${y}" width="${w}" height="24" rx="3"/>`;
    fill.forEach((cl, i) => { if(cl) s += `<rect class="${cl}" x="${x0 + i * c}" y="${y}" width="${c}" height="24"/>`; });
    for(let i = 1; i < 6; i++) s += `<line class="${n && i % (6 / n) === 0 ? "fg-line" : "fg-mut"}" x1="${x0 + i * c}" y1="${y}" x2="${x0 + i * c}" y2="${y + 24}"/>`;
    return s + `<rect class="fg-line" x="${x0}" y="${y}" width="${w}" height="24" rx="3"/>` + fgT(x0 - 12, y + 17, lab, "fg-b", "end");
  };
  return { cap: T("Felles nevner: del begge brøkene i sjettedeler, så kan tellerne legges sammen. ½ + ⅓ = 3/6 + 2/6 = 5/6.", "Common denominator: split both fractions into sixths, then the numerators can be added. ½ + ⅓ = 3/6 + 2/6 = 5/6."),
    svg: row(18, 2, ["fg-water", "fg-water", "fg-water"], "1/2 = 3/6") + row(70, 3, ["fg-okw", "fg-okw"], "1/3 = 2/6") +
      row(122, 0, ["fg-water", "fg-water", "fg-water", "fg-okw", "fg-okw"], T("sum = 5/6", "sum = 5/6")) + fgT(x0 + w / 2, 168, T("seks like store biter", "six equal pieces"), "fg-s") };
};
// En ligning er en vekt i balanse: x + 3 = 7 (Grunnleggende matematikk, enhet 3)
FIGS.balance = () => {
  const sq = (x, y) => `<rect class="fg-unitsq" x="${x}" y="${y}" width="14" height="14" rx="2"/>`;
  let s = `<line class="fg-line" x1="30" y1="110" x2="290" y2="110" stroke-width="3"/><polygon class="fg-box" points="160,110 146,134 174,134"/>${fgGround(160, 134, 60)}`;
  s += `<rect class="fg-box" x="48" y="76" width="34" height="34" rx="3"/>` + fgT(65, 99, "x", "fg-i fg-acct");
  [92, 110, 128].forEach(x => { s += sq(x, 96); });
  [180, 198, 216, 234, 252].forEach(x => { s += sq(x, 96); }); [189, 207].forEach(x => { s += sq(x, 78); });
  s += fgT(160, 162, T("x + 3 = 7   ⇒   x = 7 − 3 = 4", "x + 3 = 7   ⇒   x = 7 − 3 = 4"), "fg-b");
  return { cap: T("En ligning er en vekt i balanse. Gjør det samme på begge sider (her: ta bort 3), så holder balansen og x står igjen alene.", "An equation is a balance. Do the same to both sides (here: remove 3), and it stays balanced with x left on its own."), svg: s };
};
// Potenser: 3² som et kvadrat med 9 ruter og 2³ som en kube med 8 små kuber (Grunnleggende matematikk, enhet 2)
FIGS.pow_sq = () => {
  let s = "";
  for(let i = 0; i < 3; i++) for(let j = 0; j < 3; j++) s += `<rect class="fg-fill2" x="${34 + j * 22}" y="${36 + i * 22}" width="22" height="22"/><rect class="fg-line" x="${34 + j * 22}" y="${36 + i * 22}" width="22" height="22" stroke-width="1.4"/>`;
  s += fgT(67, 130, "3² = 3 · 3 = 9", "fg-b");
  const X = 184, Y = 60, U = 24, dx = 14, dy = -10;
  s += `<polygon class="fg-fill" points="${X},${Y} ${X + 2 * U},${Y} ${X + 2 * U + 2 * dx},${Y + 2 * dy} ${X + 2 * dx},${Y + 2 * dy}"/>`;
  s += `<polygon class="fg-mfill" points="${X + 2 * U},${Y} ${X + 2 * U + 2 * dx},${Y + 2 * dy} ${X + 2 * U + 2 * dx},${Y + 2 * U + 2 * dy} ${X + 2 * U},${Y + 2 * U}"/>`;
  s += `<rect class="fg-fill2" x="${X}" y="${Y}" width="${2 * U}" height="${2 * U}"/>`;
  s += `<g class="fg-line" stroke-width="1.4"><line x1="${X + U}" y1="${Y}" x2="${X + U}" y2="${Y + 2 * U}"/><line x1="${X}" y1="${Y + U}" x2="${X + 2 * U}" y2="${Y + U}"/>
    <line x1="${X + U}" y1="${Y}" x2="${X + U + 2 * dx}" y2="${Y + 2 * dy}"/><line x1="${X + dx}" y1="${Y + dy}" x2="${X + 2 * U + dx}" y2="${Y + dy}"/>
    <line x1="${X + 2 * U + dx}" y1="${Y + dy}" x2="${X + 2 * U + dx}" y2="${Y + 2 * U + dy}"/><line x1="${X + 2 * U}" y1="${Y + U}" x2="${X + 2 * U + 2 * dx}" y2="${Y + U + 2 * dy}"/></g>`;
  s += `<polygon class="fg-line" fill="none" points="${X},${Y} ${X + 2 * dx},${Y + 2 * dy} ${X + 2 * U + 2 * dx},${Y + 2 * dy} ${X + 2 * U + 2 * dx},${Y + 2 * U + 2 * dy} ${X + 2 * U},${Y + 2 * U} ${X},${Y + 2 * U}"/><line class="fg-line" x1="${X + 2 * U}" y1="${Y}" x2="${X + 2 * U}" y2="${Y + 2 * U}"/><line class="fg-line" x1="${X}" y1="${Y}" x2="${X + 2 * U}" y2="${Y}"/><line class="fg-line" x1="${X + 2 * U}" y1="${Y}" x2="${X + 2 * U + 2 * dx}" y2="${Y + 2 * dy}"/>`;
  s += fgT(222, 130, "2³ = 2 · 2 · 2 = 8", "fg-b");
  return { cap: T("En potens er gjentatt ganging. 3² er et kvadrat med 9 ruter, og 2³ er en kube med 8 små kuber.", "A power is repeated multiplication. 3² is a square of 9 cells, and 2³ is a cube of 8 small cubes."), svg: s };
};
// Gjennomsnitt og median med en uteligger (ikke koblet: GMAT 9 har vippe-labben «meanmed» i sims7.js)
FIGS.mean_median = () => {
  const x = v => 30 + v * 26, data = [2, 3, 3, 4, 5, 9], seen = {};
  let s = `<line class="fg-line" x1="24" y1="112" x2="296" y2="112"/>`;
  for(let v = 0; v <= 10; v++) s += `<line class="fg-mut" x1="${x(v)}" y1="108" x2="${x(v)}" y2="116"/>` + fgT(x(v), 130, String(v), "fg-s");
  data.forEach(v => { const k = seen[v] = (seen[v] || 0) + 1; s += `<circle class="fg-dot" cx="${x(v)}" cy="${108 - k * 14 + 4}" r="6"/>`; });
  s += `<line class="fg-ok" x1="${x(3.5)}" y1="54" x2="${x(3.5)}" y2="112" stroke-width="2.4" stroke-dasharray="5 4"/>` + fgT(x(3.5), 46, T("median 3,5", "median 3.5"), "fg-okt");
  s += `<polygon class="fg-water" points="${x(26 / 6)},140 ${x(26 / 6) - 8},154 ${x(26 / 6) + 8},154"/>` + fgT(x(26 / 6) + 12, 152, T("gjennomsnitt ≈ 4,33", "mean ≈ 4.33"), "fg-acct", "start");
  s += fgT(x(9), 78, T("uteligger", "outlier"), "fg-s");
  return { cap: T("Tallene 2, 3, 3, 4, 5 og 9. Uteliggeren 9 drar gjennomsnittet opp, mens medianen (tallet i midten) nesten ikke flytter seg.", "The numbers 2, 3, 3, 4, 5 and 9. The outlier 9 pulls the mean up, while the median (the middle value) hardly moves."), svg: s };
};
// SI-prefikser som en trapp med faktor 1000 (Grunnleggende fysikk, enhet 1)
FIGS.prefixes = () => {
  const box = (cx, t, sub) => `<rect class="fg-box" x="${cx - 28}" y="52" width="56" height="34" rx="8"/>` + fgT(cx, 75, t, "fg-b") + fgT(cx, 104, sub, "fg-s"); // under boksen: navn og tierpotens
  let s = box(40, "km", "kilo · 10³") + box(120, "m", "") + box(200, "mm", "milli · 10⁻³") + box(280, "µm", "mikro · 10⁻⁶");
  [[68, 92], [148, 172], [228, 252]].forEach(([a, b]) => { s += fgAr(a, 44, b, 44, "fg-acc") + fgT((a + b) / 2, 34, "× 1000", "fg-s") + fgAr(b, 126, a, 126, "fg-red") + fgT((a + b) / 2, 142, "÷ 1000", "fg-s"); });
  return { cap: T("Hvert steg er en faktor 1000: 1 km = 1000 m og 1 m = 1000 mm. Mot en mindre enhet ganger du, mot en større deler du.", "Each step is a factor of 1000: 1 km = 1000 m and 1 m = 1000 mm. Towards a smaller unit you multiply, towards a larger one you divide."), svg: s };
};
// Energi i en bakke uten friksjon (Grunnleggende fysikk, enhet 4)
FIGS.energy = () => {
  const bar = (x, y, ep, ek) => `<rect class="fg-box" x="${x}" y="${y}" width="14" height="40"/><rect class="fg-water" x="${x}" y="${y + 40 - ep}" width="14" height="${ep}"/>` +
    `<rect class="fg-box" x="${x + 20}" y="${y}" width="14" height="40"/><rect class="fg-okw" x="${x + 20}" y="${y + 40 - ek}" width="14" height="${ek}"/>` + fgT(x + 7, y + 54, "E_p", "fg-s") + fgT(x + 27, y + 54, "E_k", "fg-s");
  let s = `<path class="fg-mfill" d="M20 50 C 90 50, 120 140, 200 140 L 300 140 L 300 160 L 20 160 Z"/><path class="fg-line" d="M20 50 C 90 50, 120 140, 200 140 L 300 140"/>`;
  s += `<circle class="fg-dot" cx="36" cy="41" r="9"/><circle class="fg-dot" cx="262" cy="131" r="9"/>` + fgAr(282, 131, 300, 131, "fg-acc");
  s += `<line class="fg-mut" x1="14" y1="50" x2="14" y2="140" stroke-dasharray="4 4"/>` + fgT(8, 100, "h", "fg-i", "end");
  s += bar(112, 4, 40, 0) + bar(214, 50, 0, 40);
  s += fgT(150, 176, T("E_p = mgh   →   E_k = ½mv²", "E_p = mgh   →   E_k = ½mv²"), "fg-b");
  return { cap: T("Uten friksjon blir stillingsenergien mgh på toppen til bevegelsesenergi ½mv² nederst. Summen er hele tiden den samme.", "Without friction, the potential energy mgh at the top becomes kinetic energy ½mv² at the bottom. The sum stays the same."), svg: s };
};
// Sannsynlighetstre for to myntkast (vgs 1P, sannsynlighet)
FIGS.tree = () => {
  const [A, B] = [T("K", "H"), T("M", "T")], node = (x, y, t) => `<circle class="fg-box" cx="${x}" cy="${y}" r="13"/>` + fgT(x, y + 5, t, "fg-b");
  const edge = (x1, y1, x2, y2) => `<line class="fg-line" x1="${x1 + 13}" y1="${y1}" x2="${x2 - 13}" y2="${y2}"/>` + fgT((x1 + x2) / 2, (y1 + y2) / 2 - 6, "½", "fg-s");
  let s = `<circle class="fg-dot" cx="30" cy="90" r="5"/>` + `<line class="fg-line" x1="34" y1="88" x2="117" y2="52"/><line class="fg-line" x1="34" y1="92" x2="117" y2="128"/>` + fgT(72, 62, "½", "fg-s") + fgT(72, 124, "½", "fg-s");
  s += node(130, 50, A) + node(130, 130, B);
  [[50, A, 28], [50, B, 72], [130, A, 108], [130, B, 152]].forEach(([y0, t, y1]) => { s += edge(130, y0, 220, y1) + node(220, y1, t); });
  [[28, A + A], [72, A + B], [108, B + A], [152, B + B]].forEach(([y, t]) => { s += fgT(258, y + 5, t, "fg-s", "start") + fgT(300, y + 5, "¼", "fg-b fg-acct", "end"); });
  return { cap: T("To myntkast (K = kron, M = mynt). Gang sannsynlighetene langs greinene: ½ · ½ = ¼. Legg sammen greinene som gir det du er ute etter, for eksempel én kron og én mynt: ¼ + ¼ = ½.", "Two coin tosses (H = heads, T = tails). Multiply along the branches: ½ · ½ = ¼. Add the branches you are after, for example one of each: ¼ + ¼ = ½."), svg: s };
};
// Standardform: flytt kommaet (vgs 2P, potenser og standardform)
FIGS.shift = () => {
  const ch = [["0", 70], [",", 86], ["0", 104], ["0", 128], ["0", 152], ["4", 176], ["5", 200]];
  let s = ch.map(([c, x]) => `<text x="${x}" y="70" class="fg-big" text-anchor="middle">${c}</text>`).join("");
  [[86, 116], [116, 140], [140, 164], [164, 188]].forEach(([a, b], i) => { s += `<path class="fg-acc" d="M${a} 80 Q ${(a + b) / 2} 102 ${b} 80" stroke-width="2"/>` + fgT((a + b) / 2, 114, String(i + 1), "fg-s fg-acct"); });
  s += `<circle class="fg-dotr" cx="188" cy="74" r="3.5"/>` + fgT(160, 158, "0,00045 = 4,5 · 10⁻⁴", "fg-b");
  return { cap: T("Flytt kommaet til det står ett siffer (1–9) foran det. Fire plasser mot høyre gir 10⁻⁴. Flytter du mot venstre, blir eksponenten positiv.", "Move the decimal point until one digit (1–9) is in front of it. Four places to the right gives 10⁻⁴. Moving left makes the exponent positive."), svg: s };
};
// Faktorisering som areal: (x + 2)(x + 3) (vgs 1T, faktorisering)
FIGS.area_factor = () => {
  const X = 40, Y = 30, a = 84, u = 20, cell = (x, y, w, h, cls, t) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><rect class="fg-line" x="${x}" y="${y}" width="${w}" height="${h}" stroke-width="1.4"/>` + fgT(x + w / 2, y + h / 2 + 5, t, "fg-b");
  let s = cell(X, Y, a, a, "fg-fill2", "x²") + cell(X + a, Y, 3 * u, a, "fg-okw", "3x") + cell(X, Y + a, a, 2 * u, "fg-unitsq", "2x") + cell(X + a, Y + a, 3 * u, 2 * u, "fg-water", "6");
  s += fgT(X + a / 2, Y - 8, "x", "fg-i") + fgT(X + a + 1.5 * u, Y - 8, "3", "fg-b") + fgT(X - 10, Y + a / 2 + 5, "x", "fg-i", "end") + fgT(X - 10, Y + a + u + 5, "2", "fg-b", "end");
  s += fgT(250, 80, "(x + 2)(x + 3)", "fg-b") + fgT(250, 106, "= x² + 5x + 6", "fg-b fg-acct");
  return { cap: T("Gang ut parentesene som et areal: hver bit er ett ledd, og x² + 3x + 2x + 6 = x² + 5x + 6. Å faktorisere er å gå motsatt vei.", "Multiply out the brackets as an area: each piece is one term, and x² + 3x + 2x + 6 = x² + 5x + 6. Factorising goes the other way."), svg: s };
};
// Bohrs atommodell for karbon (vgs kjemi 1, atomer)
FIGS.atom = () => {
  const cx = 96, cy = 92, e = (r, deg) => `<circle class="fg-dot" cx="${(cx + r * Math.cos(deg * Math.PI / 180)).toFixed(1)}" cy="${(cy + r * Math.sin(deg * Math.PI / 180)).toFixed(1)}" r="5"/>`;
  let s = `<circle class="fg-mut" cx="${cx}" cy="${cy}" r="42"/><circle class="fg-mut" cx="${cx}" cy="${cy}" r="72"/><circle class="fg-water" cx="${cx}" cy="${cy}" r="18"/>` + fgT(cx, cy + 5, "6p 6n", "fg-s");
  s += e(42, 0) + e(42, 180) + [45, 135, 225, 315].map(d => e(72, d)).join("");
  s += fgT(190, 50, T("Karbon (C)", "Carbon (C)"), "fg-b", "start") + fgT(190, 76, T("6 protoner i kjernen", "6 protons in the nucleus"), "fg-s", "start") +
    fgT(190, 98, T("6 elektroner: 2 + 4", "6 electrons: 2 + 4"), "fg-s", "start") + fgT(190, 120, T("4 i ytterste skall", "4 in the outer shell"), "fg-s fg-acct", "start") + fgT(190, 140, T("→ 4 bindinger", "→ 4 bonds"), "fg-s fg-acct", "start");
  return { cap: T("Bohrs atommodell for karbon: protoner og nøytroner i kjernen, elektronene i skall. Elektronene i det ytterste skallet bestemmer hvordan atomet binder seg.", "Bohr's model of carbon: protons and neutrons in the nucleus, electrons in shells. The electrons in the outer shell decide how the atom bonds."), svg: s };
};
// Kobling enhet → figur (settes inn etter «Begreper og formler»)
const FIG_MAP = {
  "MAPE1300:0": "beam_fbd", "MAPE1300:1": "incline", "MAPE1300:3": "beam_moment",
  "MEK1000:0": "tangent", "MEK1000:1": "area", "GMAT:7": "tangent", "GMAT:5": "triangle", "GMAT:0": "fractions", "GMAT:2": "balance", "GMAT:1": "pow_sq",
  "GFYS:0": "prefixes", "GFYS:3": "energy", "VG1P:4": "tree", "VG2P:2": "shift", "VG1T:5": "area_factor", "VGS1:0": "balance", "VGKJ1:0": "atom",
  "ELPE1300:0": "circuit_sp", "ELPE1300:1": "rc_curve", "ELPE1300:2": "sine", "ELPE1300:4": "three_phase", "ELFT2400:3": "rc_curve",
  "FLUID:1": "venturi", "FLUID:3": "pump_curves", "MEK2200:3": "regression", "MATS2100:3": "heat_pump",
  "FAST:0": "stress_strain", "MATS1500:1": "stress_strain", "GFYS:2": "incline", "GFYS:6": "wave", "MEK1400:0": "wave", "MATS1600:3": "fillet_weld"
};
function figureHTML(name){
  const f = FIGS[name]; if(!f) return "";
  const { svg, cap } = f();
  return `<figure class="fig"><svg viewBox="0 0 320 180" role="img" aria-label="${esc(cap)}">${svg}</svg><figcaption>${esc(cap)}</figcaption></figure>`;
}
function withFigs(code, u, src){
  const name = FIG_MAP[code + ":" + u]; if(!name || src.includes("![fig:")) return src;
  const lines = src.split("\n"); let i = lines.findIndex(l => /^##\s+(Begreper og formler|Concepts and formulas|Begreper og regler|Concepts and rules|Kort oppsummert|In short|Begreper|Concepts)$/.test(l.trim()));
  if(i < 0) i = lines.findIndex((l, k) => k > 0 && /^##\s/.test(l.trim())) - 1;
  if(i < 0) return src + "\n\n![fig:" + name + "]";
  lines.splice(i + 1, 0, "", "![fig:" + name + "]", "");
  return lines.join("\n");
}
