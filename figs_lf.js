// ============================================================
//  FIGURER TIL «LÆR FØRST» (lessons.js) – bildene og knepene som kommer før oppgavene:
//  krokodillemunnen, tierrammen, termometeret, heisen, skålvekta, funksjonsmaskinen, rutene på Pytagoras …
//  Samme format som figures.js (viewBox 320 × 180). Alle tar et parameter p, så «Prøv selv» kan tegne figuren på nytt.
//  Hjelperne (soft, tx, col …) kommer fra figs_gs.js (GSF).
// ============================================================
(() => {
const { soft, solid, box, tx, col, car, circ, f1 } = GSF;
const minus = v => String(v).replace(/^-/, "−");
const sun = (x, y, r) => circ(x, y, r, `fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2`);

Object.assign(FIGS, {
  // Krokodillemunnen: munnen åpner seg alltid mot det største tallet. p = { a, b }
  lf_croc: (p = {}) => { const a = p.a ?? 9, b = p.b ?? 4, d = Math.sign(a - b); let s = "";
    s += col(64, 106, minus(a), d > 0 ? 4 : 3, "fg-big") + col(256, 106, minus(b), d < 0 ? 4 : 3, "fg-big");
    if(!d){ // like store: munnen er lukket
      s += `<rect x="116" y="74" width="88" height="34" rx="16" style="${soft(4, 40)}"/><line x1="122" y1="91" x2="198" y2="91" style="stroke:var(--c4);stroke-width:2.4"/>` + circ(186, 82, 4, "fill:var(--ink)");
      s += tx(160, 150, `${minus(a)} = ${minus(b)}`, "fg-b") + tx(160, 170, T("like store – munnen er lukket", "equal – the mouth is closed"), "fg-s");
      return { cap: T(`${minus(a)} og ${minus(b)} er like store. Da er krokodillen fornøyd og lukker munnen: =`, `${minus(a)} and ${minus(b)} are equal. The crocodile is happy and closes its mouth: =`), svg: s }; }
    // hengselet (der kjevene møtes) står ved det minste tallet, munnen åpner seg mot det største
    const vx = d > 0 ? 200 : 120, ox = d > 0 ? 112 : 208, dir = Math.sign(ox - vx), J = (t, y0, y1) => [f1(vx + (ox - vx) * t), f1(y0 + (y1 - y0) * t)];
    s += circ(vx - dir * 12, 92, 24, soft(4, 60));
    s += `<line x1="${vx}" y1="84" x2="${ox}" y2="44" style="stroke:var(--c4);stroke-width:20;stroke-linecap:round"/><line x1="${vx}" y1="100" x2="${ox}" y2="140" style="stroke:var(--c4);stroke-width:20;stroke-linecap:round"/>`;
    s += `<line x1="${vx}" y1="84" x2="${ox}" y2="44" style="stroke:color-mix(in srgb,var(--c4) 55%,var(--card));stroke-width:14;stroke-linecap:round"/><line x1="${vx}" y1="100" x2="${ox}" y2="140" style="stroke:color-mix(in srgb,var(--c4) 55%,var(--card));stroke-width:14;stroke-linecap:round"/>`;
    for(let i = 1; i <= 4; i++){ const t = 0.2 + i * 0.16, [xt, yt] = J(t, 92, 52), [xb, yb] = J(t, 92, 132);
      s += `<polygon points="${f1(xt - 4)},${yt} ${f1(xt + 4)},${yt} ${xt},${f1(yt + 8)}" style="fill:#fff;stroke:var(--c4);stroke-width:1"/><polygon points="${f1(xb - 4)},${yb} ${f1(xb + 4)},${yb} ${xb},${f1(yb - 8)}" style="fill:#fff;stroke:var(--c4);stroke-width:1"/>`; }
    const [ex, ey] = J(0.18, 84, 44); s += circ(ex, f1(ey - 12), 8, "fill:#fff;stroke:var(--c4);stroke-width:2.4") + circ(f1(ex + dir * 2), f1(ey - 12), 3.6, "fill:#16202a");
    const big = d > 0 ? a : b, sign = d > 0 ? ">" : "<";
    s += tx(160, 162, `${minus(a)} ${sign} ${minus(b)}`, "fg-b") + tx(160, 178, T(`krokodillen spiser ${minus(big)}`, `the crocodile eats ${minus(big)}`), "fg-s");
    return { cap: T(`Munnen åpner seg mot det største tallet: ${minus(a)} ${sign} ${minus(b)}. Vi leser: «${minus(a)} er ${d > 0 ? "større" : "mindre"} enn ${minus(b)}».`,
      `The mouth opens towards the bigger number: ${minus(a)} ${sign} ${minus(b)}. We read: "${minus(a)} is ${d > 0 ? "greater" : "less"} than ${minus(b)}".`), svg: s }; },

  // Tierrammen: a røde i rammen, b blå ved siden av; k av de blå er flyttet inn. p = { a, b, k }
  lf_tenframe: (p = {}) => { const a = p.a ?? 8, b = p.b ?? 5, k = Math.min(p.k ?? 0, b, 10 - a), c = 34, x0 = 30, y0 = 34; let s = "";
    for(let i = 0; i < 10; i++){ const x = x0 + (i % 5) * c, y = y0 + Math.floor(i / 5) * c;
      s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" style="fill:var(--card);stroke:var(--ink);stroke-width:1.6"/>`;
      if(i < a) s += circ(x + c / 2, y + c / 2, 11, soft(1, 70)); else if(i < a + k) s += circ(x + c / 2, y + c / 2, 11, soft(3, 70)); }
    const rest = b - k; for(let i = 0; i < rest; i++) s += circ(238 + (i % 3) * 26, y0 + 17 + Math.floor(i / 3) * 30, 11, soft(3, 70));
    s += tx(x0 + 2.5 * c, 24, T("tierramme: plass til 10", "ten frame: room for 10"), "fg-s fg-tick");
    const full = a + k === 10;
    s += tx(160, 132, full ? (rest ? `10 + ${rest} = ${10 + rest}` : "10") : `${a} + ${b}`, "fg-b");
    s += tx(160, 152, full ? T("Rammen er full!", "The frame is full!") : T(`Det er plass til ${10 - a - k} til i rammen`, `There is room for ${10 - a - k} more in the frame`), "fg-s" + (full ? " fg-okt" : ""));
    return { cap: T(`${a} røde og ${b} blå. Flytt blå inn i rammen til den er full (10) – så teller du resten.`, `${a} red and ${b} blue. Move blue into the frame until it is full (10) – then count the rest.`), svg: s }; },

  // Termometer: v grader, eventuelt med en pil fra «from». p = { v, from }
  lf_therm: (p = {}) => { const v = p.v ?? 3, Y = t => 92 - t * 7, x = 96; let s = "";
    s += `<rect x="${x - 9}" y="${Y(10) - 8}" width="18" height="${Y(-10) - Y(10) + 12}" rx="9" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/>`;
    s += circ(x, Y(-10) + 14, 13, `fill:var(--c1);stroke:var(--ink);stroke-width:2`) + `<rect x="${x - 4}" y="${f1(Y(v))}" width="8" height="${f1(Y(-10) + 8 - Y(v))}" style="fill:var(--c1)"/>`;
    for(let t = -10; t <= 10; t++){ const big = t % 5 === 0; s += `<line x1="${x + 10}" y1="${Y(t)}" x2="${x + (big ? 22 : 16)}" y2="${Y(t)}" style="stroke:var(--ink);stroke-width:${t === 0 ? 2.4 : big ? 1.6 : 0.8}"/>`; if(big) s += tx(x + 26, Y(t) + 4, minus(t), t === 0 ? "fg-b fg-tick" : "fg-s fg-tick", "start"); }
    s += `<rect x="${x - 70}" y="${Y(10) - 6}" width="56" height="${Y(0) - Y(10) + 6}" rx="6" style="${soft(2, 14)}"/>` + tx(x - 42, Y(5) + 4, T("varmt", "warm"), "fg-s");
    s += `<rect x="${x - 70}" y="${Y(0)}" width="56" height="${Y(-10) - Y(0) + 6}" rx="6" style="${soft(3, 14)}"/>` + tx(x - 42, Y(-5) + 4, T("kaldt", "cold"), "fg-s");
    if(p.from != null && p.from !== v) s += car(x + 52, Y(p.from), x + 52, Y(v), v > p.from ? 1 : 3, 2.4) + (p.hide ? "" : tx(x + 60, (Y(p.from) + Y(v)) / 2 + 4, (v > p.from ? "+" : "−") + Math.abs(v - p.from), "fg-b", "start"));
    s += col(250, 82, `${minus(v)} °C`, v > 0 ? 1 : v < 0 ? 3 : 4, "fg-big") + tx(250, 108, v > 0 ? T(`${v} varmegrader`, `${v} degrees above zero`) : v < 0 ? T(`${-v} kuldegrader`, `${-v} degrees below zero`) : T("null grader", "zero degrees"), "fg-s");
    return { cap: T(`Termometeret er en tallinje på høykant. Det viser ${minus(v)} grader. Under null er tallene negative.`, `The thermometer is a number line standing up. It shows ${minus(v)} degrees. Below zero the numbers are negative.`), svg: s }; },

  // Heisen: etasjene fra −3 til 5, heisen står i etasje v. p = { v, from }
  lf_lift: (p = {}) => { const v = p.v ?? 0, h = 17, Y = f => 106 - f * h; let s = "";
    s += `<rect x="70" y="${Y(5) - 10}" width="110" height="${Y(-3) - Y(5) + 29}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    s += `<rect x="70" y="${Y(0) + h - 10}" width="110" height="${Y(-3) - Y(0) + 9}" style="${soft(2, 14)};stroke:none"/>` + `<line x1="40" y1="${Y(0) + h - 10}" x2="210" y2="${Y(0) + h - 10}" style="stroke:var(--c4);stroke-width:3"/>`;
    s += tx(186, Y(0) + h - 15, T("bakken", "ground"), "fg-s", "start") + tx(186, Y(-2) + 4, T("kjeller", "basement"), "fg-s", "start");
    for(let f = -3; f <= 5; f++) s += `<line x1="70" y1="${Y(f) + 9}" x2="180" y2="${Y(f) + 9}" style="stroke:var(--line);stroke-width:1"/>` + tx(60, Y(f) + 4, minus(f), f === v ? "fg-b" : "fg-s", "end");
    s += `<rect x="96" y="${Y(v) - 8}" width="40" height="${h - 3}" rx="3" style="${soft(3, 55)}"/>` + `<line x1="116" y1="${Y(5) - 10}" x2="116" y2="${Y(v) - 8}" style="stroke:var(--muted);stroke-width:1.4"/>`;
    if(p.from != null && p.from !== v) s += car(158, Y(p.from), 158, Y(v), v > p.from ? 4 : 1, 2.4);
    s += col(270, 70, minus(v), 3, "fg-big") + tx(270, 94, T("etasje", "floor"), "fg-s") + tx(270, 140, T("opp = pluss", "up = plus"), "fg-s") + tx(270, 156, T("ned = minus", "down = minus"), "fg-s");
    return { cap: T(`Heisen: 0 er bakkeplan, opp er pluss og ned er minus. Heisen står i etasje ${minus(v)}.`, `The lift: 0 is ground level, up is plus and down is minus. The lift is on floor ${minus(v)}.`), svg: s }; },

  // Skålvekt: venstre har x bokser og n kuler, høyre har r kuler. take = kuler tatt bort på begge sider, div = delt på antall bokser.
  lf_balance: (p = {}) => { const x = p.x ?? 1, n = p.n ?? 3, r = p.r ?? 7, take = p.take ?? 0, div = p.div ? x : 1;
    const L = { x: x / div, n: (n - take) / div }, R = (r - take) / div, val = (r - n) / x, w = L.x * val + L.n - R, tilt = Math.max(-8, Math.min(8, w * 2)); let s = "";
    s += `<polygon points="160,150 146,172 174,172" style="${soft(5, 40)}"/><line x1="100" y1="172" x2="220" y2="172" style="stroke:var(--ink);stroke-width:2"/>`;
    s += `<g transform="rotate(${-tilt} 160 76)"><line x1="40" y1="76" x2="280" y2="76" style="stroke:var(--ink);stroke-width:3"/>`;
    const pan = cx => `<line x1="${cx - 54}" y1="76" x2="${cx - 50}" y2="130" style="stroke:var(--muted);stroke-width:1"/><line x1="${cx + 54}" y1="76" x2="${cx + 50}" y2="130" style="stroke:var(--muted);stroke-width:1"/><path d="M${cx - 56} 130 L${cx + 56} 130 Q${cx} 146 ${cx - 56} 130 Z" style="${soft(5, 22)}"/>`;
    s += pan(80) + pan(240) + `</g>`;
    const dy = cx => (cx - 160) * Math.tan(-tilt * Math.PI / 180);
    const balls = (cx, k, c0 = 0) => { let o = ""; const per = 6 - c0; for(let i = 0; i < k; i++){ const row = Math.floor(i / per), c = c0 + i % per; o += circ(f1(cx - 40 + c * 15 + (row % 2) * 4), f1(122 - row * 13 + dy(cx)), 6.5, soft(2, 70)); } return o; };
    let lx = 30; for(let i = 0; i < L.x; i++){ s += `<rect x="${lx}" y="${f1(98 + dy(80))}" width="24" height="26" rx="4" style="${soft(3, 55)}"/>` + tx(lx + 12, f1(116 + dy(80)), "x", "fg-i"); lx += 28; }
    if(Number.isInteger(L.n) && Number.isInteger(R)){ const off = Math.min(4, Math.ceil((L.x * 28 - 6) / 15)); s += balls(80, L.n, off); s += balls(240, R); }
    s += tx(160, 22, (L.x === 1 ? "x" : L.x + "x") + (L.n ? " + " + L.n : "") + " = " + R, "fg-b");
    s += tx(160, 40, Math.abs(w) < 1e-9 ? T("i balanse", "balanced") : T("ikke i balanse!", "not balanced!"), "fg-s" + (Math.abs(w) < 1e-9 ? " fg-okt" : " fg-redt"));
    return { cap: T("Likningen er en vekt i balanse. Gjør du det samme på begge sider, holder balansen.", "The equation is a balance. Do the same to both sides and it stays balanced."), svg: s }; },

  // Koordinatsystem med et punkt (x, y) og eventuelt en stjerne der punktet skal. p = { x, y, tx, ty }
  lf_coord: (p = {}) => { const x = p.x ?? 3, y = p.y ?? 2, u = 18, O = [110, 92], P = (a, b) => [O[0] + a * u, O[1] - b * u]; let s = "";
    for(let i = -5; i <= 5; i++){ const [X] = P(i, 0); s += `<line class="fg-mut" x1="${X}" y1="${P(0, 4)[1]}" x2="${X}" y2="${P(0, -4)[1]}" stroke-width=".5"/>`; }
    for(let j = -4; j <= 4; j++){ const [, Y] = P(0, j); s += `<line class="fg-mut" x1="${P(-5, 0)[0]}" y1="${Y}" x2="${P(5, 0)[0]}" y2="${Y}" stroke-width=".5"/>`; }
    s += fgAr(P(-5.4, 0)[0], O[1], P(5.5, 0)[0], O[1], "fg-ax", 1.6) + fgAr(O[0], P(0, -4.4)[1], O[0], P(0, 4.6)[1], "fg-ax", 1.6) + tx(P(5.5, 0)[0], O[1] + 16, "x", "fg-i", "end") + tx(O[0] - 8, P(0, 4.4)[1] + 4, "y", "fg-i", "end");
    if(p.tx != null){ const [sx, sy] = P(p.tx, p.ty); s += `<polygon points="${[0, 1, 2, 3, 4].map(k => { const a = -Math.PI / 2 + k * 4 * Math.PI / 5; return `${f1(sx + 9 * Math.cos(a))},${f1(sy + 9 * Math.sin(a))}`; }).join(" ")}" style="fill:var(--gold);stroke:var(--gold-deep);stroke-width:1.2"/>`; }
    const [px, py] = P(x, y), [qx] = P(x, 0);
    if(x) s += car(O[0], O[1], qx, O[1], 1, 2.4); if(y) s += car(qx, O[1], qx, py, 4, 2.4);
    s += circ(px, py, 6, "fill:var(--c3);stroke:var(--card);stroke-width:2") + circ(O[0], O[1], 3, "fill:var(--ink)");
    s += col(212, 40, `(${minus(x)}, ${minus(y)})`, 3, "fg-b", "start");
    s += col(212, 66, "x: " + (x > 0 ? T(`${x} til høyre`, `${x} right`) : x < 0 ? T(`${-x} til venstre`, `${-x} left`) : T("bli stående", "stay")), 1, "fg-s", "start");
    s += col(212, 84, "y: " + (y > 0 ? T(`${y} opp`, `${y} up`) : y < 0 ? T(`${-y} ned`, `${-y} down`) : T("bli stående", "stay")), 4, "fg-s", "start");
    s += tx(212, 120, T("Først bortover,", "First across,"), "fg-s", "start") + tx(212, 136, T("så opp eller ned.", "then up or down."), "fg-s", "start");
    return { cap: T(`Punktet (${minus(x)}, ${minus(y)}): gå først ${Math.abs(x)} bortover (x), så ${Math.abs(y)} opp eller ned (y). Minus er til venstre eller ned.`, `The point (${minus(x)}, ${minus(y)}): first go ${Math.abs(x)} across (x), then ${Math.abs(y)} up or down (y). Minus means left or down.`), svg: s }; },

  // Funksjonsmaskinen: x inn, a · x + b ut. p = { x, a, b }
  lf_machine: (p = {}) => { const x = p.x ?? 3, a = p.a ?? 2, b = p.b ?? 1, y = a * x + b; let s = "";
    s += `<rect x="104" y="48" width="112" height="70" rx="12" style="${soft(5, 26)}"/>` + circ(124, 62, 4, "fill:var(--c5)") + circ(138, 62, 4, "fill:var(--c2)");
    s += tx(160, 84, `· ${a}`, "fg-b") + tx(160, 104, b >= 0 ? `+ ${b}` : `− ${-b}`, "fg-b");
    s += `<rect x="18" y="66" width="52" height="34" rx="8" style="${soft(3, 40)}"/>` + tx(44, 89, minus(x), "fg-b") + car(72, 83, 102, 83, 3, 2.4) + tx(44, 58, T("inn", "in"), "fg-s");
    s += car(218, 83, 248, 83, 4, 2.4) + `<rect x="250" y="66" width="52" height="34" rx="8" style="${soft(4, 40)}"/>` + tx(276, 89, p.hide ? "?" : minus(y), "fg-b") + tx(276, 58, T("ut", "out"), "fg-s");
    s += tx(160, 150, `f(x) = ${a}x ${b >= 0 ? "+ " + b : "− " + -b}`, "fg-b") + tx(160, 170, `f(${minus(x)}) = ${a} · ${x < 0 ? "(" + minus(x) + ")" : x} ${b >= 0 ? "+ " + b : "− " + -b} = ${p.hide ? "?" : minus(y)}`, "fg-s");
    return { cap: p.hide ? T("Funksjonsmaskinen: et tall inn, et nytt tall ut.", "The function machine: a number in, a new number out.") : T(`Funksjonsmaskinen ganger med ${a} og legger til ${b}. Inn ${minus(x)}, ut ${minus(y)}.`, `The function machine multiplies by ${a} and adds ${b}. In ${minus(x)}, out ${minus(y)}.`), svg: s }; },

  // Pytagoras med ruter på sidene. p = { a, b } (katetene i ruter)
  lf_pyth: (p = {}) => { const a = p.a ?? 3, b = p.b ?? 4, c2 = a * a + b * b, c = Math.sqrt(c2), u = Math.min(14, 166 / (a + 2 * b), 196 / (2 * a + b)); let s = "";
    const Ax = 10 + a * u, Ay = 8 + (a + b) * u, B = [Ax + b * u, Ay], C = [Ax, Ay - a * u], nv = [a * u, -b * u];
    const cells = (P0, e1, e2, k, n, grid) => { let r = ""; const pt = (i, j) => [f1(P0[0] + e1[0] * i / k + e2[0] * j / k), f1(P0[1] + e1[1] * i / k + e2[1] * j / k)];
      if(!grid) return `<polygon points="${[pt(0, 0), pt(k, 0), pt(k, k), pt(0, k)].map(q => q.join(",")).join(" ")}" style="${solid(n, 30)};stroke:var(--c${n});stroke-width:1.2"/>`;
      for(let i = 0; i < k; i++) for(let j = 0; j < k; j++) r += `<polygon points="${[pt(i, j), pt(i + 1, j), pt(i + 1, j + 1), pt(i, j + 1)].map(q => q.join(",")).join(" ")}" style="${solid(n, (i + j) % 2 ? 22 : 40)}"/>`; return r; };
    s += cells([Ax - a * u, Ay - a * u], [a * u, 0], [0, a * u], a, 3, true) + cells([Ax, Ay], [b * u, 0], [0, b * u], b, 2, true);
    const ci = Number.isInteger(c); s += cells(B, [C[0] - B[0], C[1] - B[1]], nv, ci ? c : 1, 5, ci);
    s += `<polygon points="${Ax},${Ay} ${B} ${C}" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/>`;
    const ctr = (P0, e1, e2) => [f1(P0[0] + (e1[0] + e2[0]) / 2), f1(P0[1] + (e1[1] + e2[1]) / 2 + 5)];
    const [l1x, l1y] = ctr([Ax - a * u, Ay - a * u], [a * u, 0], [0, a * u]), [l2x, l2y] = ctr([Ax, Ay], [b * u, 0], [0, b * u]), [l3x, l3y] = ctr(B, [C[0] - B[0], C[1] - B[1]], nv);
    s += tx(l1x, l1y, String(a * a), "fg-b") + tx(l2x, l2y, String(b * b), "fg-b") + tx(l3x, l3y, String(c2), "fg-b");
    const cs = ci ? String(c) : T(String(+c.toFixed(1)).replace(".", ","), String(+c.toFixed(1)));
    s += tx(312, 40, `a = ${a},  b = ${b}`, "fg-s", "end") + tx(312, 66, "a² + b² = c²", "fg-b", "end") + tx(312, 92, `${a * a} + ${b * b} = ${c2}`, "fg-t", "end") + col(312, 118, `c = √${c2}${ci ? " = " : " ≈ "}${cs}`, 5, "fg-b", "end");
    return { cap: T(`Kvadratene på de korte sidene har ${a * a} og ${b * b} ruter. Til sammen ${c2} – like mange som kvadratet på den lange siden. Så c = √${c2}${ci ? " = " : " ≈ "}${cs}.`, `The squares on the short sides have ${a * a} and ${b * b} squares. Together ${c2} – as many as the square on the long side. So c = √${c2}${ci ? " = " : " ≈ "}${cs}.`), svg: s }; },

  // Potenser: b^n som prikker (inntil 64), med gangestykket. p = { b, n }
  lf_pow: (p = {}) => { const b = p.b ?? 2, n = p.n ?? 3, v = b ** n; let s = ""; if(v > 81) return null;
    const cols = Math.max(1, Math.ceil(Math.sqrt(v))), rows = Math.ceil(v / cols), sp = Math.min(18, 140 / cols, 140 / rows);
    for(let i = 0; i < v; i++) s += circ(f1(80 - (cols - 1) * sp / 2 + (i % cols) * sp), f1(92 - (rows - 1) * sp / 2 + Math.floor(i / cols) * sp), f1(sp * 0.36), soft(3 + (n % 2), 60));
    const prod = n === 0 ? "1" : Array(n).fill(b).join(" · ");
    s += col(176, 62, `${b}^${n}`.replace(/\^(\d+)/, (_, e) => `<tspan dy="-0.6em" font-size="70%">${e}</tspan><tspan dy="0.6em"> </tspan>`), 3, "fg-big", "start");
    s += tx(176, 98, n === 0 ? T("(ingen ganging)", "(no multiplying)") : prod, "fg-b", "start") + col(176, 124, `= ${p.hide ? "?" : v}`, 4, "fg-b", "start");
    s += tx(176, 150, T(`eksponenten er ${n}`, `the exponent is ${n}`), "fg-s", "start") + tx(176, 166, n === 0 ? T("Alt opphøyd i 0 er 1.", "Anything to the power 0 is 1.") : T(`${n} ${n === 1 ? "gang" : "ganger"}`, `${n} ${n === 1 ? "time" : "times"}`), "fg-s", "start");
    if(p.hide) return { cap: T(`${b} opphøyd i ${n}.`, `${b} to the power ${n}.`), svg: s };
    return { cap: T(`${b} opphøyd i ${n}: ${prod} = ${v}. Eksponenten sier hvor mange ganger grunntallet står i gangestykket.`, `${b} to the power ${n}: ${prod} = ${v}. The exponent says how many times the base appears in the product.`), svg: s }; },

  // Kvadratrot som kvadrat: et kvadrat med k ruter har side √k. p = { s }
  lf_sqrt: (p = {}) => { const n = p.s ?? 7, u = Math.min(16, 140 / n); let s = "";
    for(let i = 0; i < n; i++) for(let j = 0; j < n; j++) s += `<rect x="${f1(30 + i * u)}" y="${f1(24 + j * u)}" width="${f1(u)}" height="${f1(u)}" style="${solid(4, (i + j) % 2 ? 20 : 36)};stroke:var(--c4);stroke-width:.6"/>`;
    s += tx(f1(30 + n * u / 2), 18, String(n), "fg-b") + tx(22, f1(24 + n * u / 2 + 4), String(n), "fg-b", "end");
    s += tx(196, 70, T(`${n * n} ruter`, `${n * n} squares`), "fg-b", "start") + col(196, 100, `√${n * n} = ${n}`, 4, "fg-big", "start") + tx(196, 126, T("fordi", "because"), "fg-s", "start") + tx(196, 144, `${n} · ${n} = ${n * n}`, "fg-t", "start");
    return { cap: T(`Et kvadrat med ${n * n} ruter har sider på ${n}. Derfor er kvadratroten av ${n * n} lik ${n}.`, `A square of ${n * n} squares has sides of ${n}. So the square root of ${n * n} is ${n}.`), svg: s }; },

  // Linjalen: en blyant som starter på «start» og er «len» cm lang. p = { start, len }
  lf_ruler: (p = {}) => { const st = p.start ?? 0, len = p.len ?? 7, X = c => 22 + c * 22; let s = "";
    s += `<rect x="12" y="92" width="290" height="44" rx="4" style="${soft(2, 24)}"/>`;
    for(let i = 0; i <= 24; i++){ const x = 22 + i * 11, big = i % 2 === 0; s += `<line x1="${x}" y1="92" x2="${x}" y2="${big ? 106 : 100}" style="stroke:var(--ink);stroke-width:${big ? 1.4 : 0.8}"/>`; if(big) s += tx(x, 122, String(i / 2), i / 2 === 0 ? "fg-b" : "fg-s"); }
    const x0 = X(st), x1 = X(st + len);
    s += `<rect x="${x0}" y="58" width="${x1 - x0 - 18}" height="20" rx="3" style="${soft(4, 55)}"/><polygon points="${x1 - 18},58 ${x1},68 ${x1 - 18},78" style="${soft(2, 45)}"/><polygon points="${x1 - 5},65.5 ${x1},68 ${x1 - 5},70.5" style="fill:var(--ink)"/>`;
    s += `<line x1="${x0}" y1="80" x2="${x0}" y2="92" style="stroke:var(--c1);stroke-width:2;stroke-dasharray:3 2"/><line x1="${x1}" y1="80" x2="${x1}" y2="92" style="stroke:var(--c1);stroke-width:2;stroke-dasharray:3 2"/>`;
    s += st === 0 ? col(160, 30, T(`Starter på 0 → ${len} cm lang`, `Starts at 0 → ${len} cm long`), 4, "fg-b") : col(160, 30, T(`Fra ${st} til ${st + len}: ${st + len} − ${st} = ${len} cm`, `From ${st} to ${st + len}: ${st + len} − ${st} = ${len} cm`), 1, "fg-b");
    s += tx(160, 160, st === 0 ? T("Les av der blyanten slutter.", "Read where the pencil ends.") : T(`Den slutter på ${st + len}, men er ikke ${st + len} cm lang!`, `It ends at ${st + len}, but it is not ${st + len} cm long!`), "fg-s");
    return { cap: T(`Mål alltid fra 0 på linjalen. Blyanten er ${len} cm lang.`, `Always measure from 0 on the ruler. The pencil is ${len} cm long.`), svg: s }; },

  // Terning: de seks sidene, utvalgte sider er farget. p = { sel: [1–6] }
  lf_die: (p = {}) => { const sel = p.sel || [6]; let s = ""; const PIPS = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
    for(let k = 1; k <= 6; k++){ const x = 14 + (k - 1) * 50, y = 34, on = sel.includes(k);
      s += `<rect x="${x}" y="${y}" width="42" height="42" rx="8" style="${on ? soft(4, 40) : "fill:var(--card);stroke:var(--ink);stroke-width:2"}"/>`;
      PIPS[k].forEach(([i, j]) => { s += circ(x + 10 + i * 11, y + 10 + j * 11, 3.6, "fill:var(--ink)"); }); }
    const k = sel.length;
    s += tx(160, 112, T(`${k} av 6 sider`, `${k} of 6 sides`), "fg-b fg-tick") + (p.hide ? "" : col(160, 146, `P = ${k}/6` + (k === 3 ? " = 1/2" : k === 2 ? " = 1/3" : k === 6 ? " = 1" : ""), 4, "fg-b"));
    if(p.hide) return { cap: T("En terning har 6 like sider.", "A die has 6 equal sides."), svg: s };
    return { cap: T(`En terning har 6 like sider. ${k} av dem passer, så sjansen er ${k}/6.`, `A die has 6 equal sides. ${k} of them fit, so the chance is ${k}/6.`), svg: s }; },

  // Fast stoff, væske og gass: vannbiter i en boks ved temperatur t. p = { t }
  lf_states: (p = {}) => { const t = p.t ?? -10, st = t <= 0 ? 0 : t < 100 ? 1 : 2; let s = "";
    s += `<rect x="20" y="24" width="150" height="128" rx="8" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    const R = (i, k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    for(let i = 0; i < 20; i++){ let x, y;
      if(st === 0){ x = 48 + (i % 5) * 24; y = 64 + Math.floor(i / 5) * 22; }
      else if(st === 1){ x = 36 + R(i, 1) * 118; y = 98 + R(i, 2) * 44; }
      else { x = 34 + R(i, 3) * 122; y = 36 + R(i, 4) * 106; }
      s += circ(f1(x), f1(y), 7, soft(3, 60)); }
    if(st === 1) s += `<path d="M22 92 Q60 86 95 92 T168 92" style="fill:none;stroke:var(--c3);stroke-width:1.4"/>`;
    s += col(246, 56, minus(t) + " °C", t <= 0 ? 3 : t < 100 ? 4 : 1, "fg-big");
    s += tx(246, 86, [T("fast stoff (is)", "solid (ice)"), T("væske (vann)", "liquid (water)"), T("gass (damp)", "gas (steam)")][st], "fg-b");
    s += tx(246, 106, [T("bitene står stille", "the bits stay still"), T("bitene sklir rundt", "the bits slide around"), T("bitene flyr fritt", "the bits fly freely")][st], "fg-s");
    s += tx(246, 140, T("0 °C: smelter", "0 °C: melts"), "fg-s") + tx(246, 156, T("100 °C: koker", "100 °C: boils"), "fg-s");
    return { cap: T("Vann kan være fast stoff (is), væske (vann) og gass (damp). Varme gjør at de små bitene beveger seg mer.", "Water can be a solid (ice), a liquid (water) and a gas (steam). Heat makes the tiny bits move more."), svg: s }; },

  // Strømkrets med bryter. p = { on }
  lf_circuit: (p = {}) => { const on = !!p.on; let s = "";
    s += `<path d="M80 96 L80 40 L150 40 M190 40 L250 40 L250 140 L80 140 L80 112" style="fill:none;stroke:var(--ink);stroke-width:2.6"/>`;
    s += `<rect x="64" y="96" width="32" height="16" rx="2" style="${soft(2, 40)}"/><line x1="64" y1="96" x2="96" y2="96" style="stroke:var(--ink);stroke-width:3"/>` + tx(54, 108, "+", "fg-b", "end") + tx(46, 128, T("batteri", "battery"), "fg-s");
    s += circ(150, 40, 3.5, "fill:var(--ink)") + circ(190, 40, 3.5, "fill:var(--ink)") + (on ? `<line x1="150" y1="40" x2="190" y2="40" style="stroke:var(--c4);stroke-width:3.6"/>` : `<line x1="150" y1="40" x2="186" y2="20" style="stroke:var(--c1);stroke-width:3.6"/>`);
    s += tx(170, 64, T("bryter", "switch"), "fg-s");
    if(on) for(let i = 0; i < 8; i++){ const a = i * Math.PI / 4; s += `<line x1="${f1(250 + 20 * Math.cos(a))}" y1="${f1(90 + 20 * Math.sin(a))}" x2="${f1(250 + 30 * Math.cos(a))}" y2="${f1(90 + 30 * Math.sin(a))}" style="stroke:var(--gold-deep);stroke-width:2"/>`; }
    s += circ(250, 90, 15, on ? `fill:color-mix(in srgb,var(--gold) 80%,var(--card));stroke:var(--gold-deep);stroke-width:2` : `fill:var(--card);stroke:var(--ink);stroke-width:2`) + tx(288, 94, T("pære", "bulb"), "fg-s", "start");
    if(on) s += car(250, 120, 250, 136, 4, 1.8) + car(150, 140, 110, 140, 4, 1.8);
    s += tx(160, 170, on ? T("Lukket krets: strømmen går rundt, og pæra lyser.", "Closed circuit: the current flows round and the bulb lights.") : T("Åpen krets: ringen er brutt, og pæra lyser ikke.", "Open circuit: the loop is broken and the bulb is off."), "fg-s" + (on ? " fg-okt" : ""));
    return { cap: T("Strømmen trenger en lukket ring fra batteriet, gjennom pæra og tilbake.", "The current needs a closed loop from the battery, through the bulb and back."), svg: s }; },

  // Dag og natt: jorda snurrer, Norge er en prikk. p = { h } (klokketime 0–23; 12 = midt på dagen)
  lf_earth: (p = {}) => { const h = p.h ?? 12, cx = 210, cy = 90, r = 56, a = (h - 12) / 24 * 2 * Math.PI, px = cx - r * 0.8 * Math.cos(a), py = cy - r * 0.8 * Math.sin(a), day = Math.cos(a) > 0.05, night = Math.cos(a) < -0.05; let s = "";
    s += sun(34, 90, 24) + tx(34, 134, T("Sola", "The sun"), "fg-b");
    for(let i = -1; i <= 1; i++) s += car(66, 90 + i * 30, 140, 90 + i * 40, 2, 1.6);
    s += circ(cx, cy, r, `fill:color-mix(in srgb,var(--c3) 30%,var(--card));stroke:var(--ink);stroke-width:2`) + `<path d="M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} Z" style="fill:color-mix(in srgb,var(--ink) 55%,transparent)"/>`;
    s += `<path d="M${cx - 18} ${cy - r - 10} A 22 10 0 0 1 ${cx + 18} ${cy - r - 10}" style="fill:none;stroke:var(--muted);stroke-width:1.6"/><polygon points="${cx + 18},${cy - r - 14} ${cx + 24},${cy - r - 8} ${cx + 14},${cy - r - 6}" style="fill:var(--muted)"/>`;
    s += circ(f1(px), f1(py), 7, "fill:var(--c1);stroke:var(--card);stroke-width:2") + circ(14, 168, 6, "fill:var(--c1)") + tx(24, 172, T("= Norge", "= Norway"), "fg-s", "start");
    s += tx(cx - 30, cy + r + 18, T("dag", "day"), "fg-s") + tx(cx + 30, cy + r + 18, T("natt", "night"), "fg-s");
    s += tx(8, 20, day ? T("Dag i Norge", "Day in Norway") : night ? T("Natt i Norge", "Night in Norway") : T("Morgen eller kveld", "Morning or evening"), "fg-b" + (night ? "" : " fg-acct"), "start");
    return { cap: T("Sola lyser på halve jorda. Jorda snurrer én gang rundt seg selv i døgnet, så Norge er på dagsiden og så på nattsiden.", "The sun lights half of the earth. The earth spins once a day, so Norway is first on the day side and then on the night side."), svg: s }; },

  // Fart: en bil som har kjørt v · t km. p = { v, t, max }
  lf_car: (p = {}) => { const v = p.v ?? 60, t = p.t ?? 1, mx = p.max ?? 240, X = d => 24 + d / mx * 272, d = v * t; let s = "";
    s += `<rect x="14" y="88" width="292" height="26" rx="4" style="fill:color-mix(in srgb,var(--muted) 20%,var(--card))"/><line x1="18" y1="101" x2="302" y2="101" style="stroke:var(--card);stroke-width:2;stroke-dasharray:10 8"/>`;
    for(let k = 0; k <= mx; k += v){ s += `<line x1="${f1(X(k))}" y1="116" x2="${f1(X(k))}" y2="124" style="stroke:var(--ink);stroke-width:1.6"/>` + tx(f1(X(k)), 138, k + " km", "fg-s"); }
    const x = X(d); s += `<rect x="${f1(x - 26)}" y="70" width="30" height="16" rx="4" style="${soft(1, 70)}"/><rect x="${f1(x - 20)}" y="62" width="16" height="10" rx="3" style="${soft(1, 40)}"/>` + circ(f1(x - 19), 88, 4.5, "fill:var(--ink)") + circ(f1(x - 3), 88, 4.5, "fill:var(--ink)");
    for(let k = 1; k <= t; k++) s += `<path d="M${f1(X((k - 1) * v) + 4)} 56 Q${f1((X((k - 1) * v) + X(k * v)) / 2)} 36 ${f1(X(k * v) - 4)} 56" style="fill:none;stroke:var(--c3);stroke-width:2"/>` + col(f1((X((k - 1) * v) + X(k * v)) / 2), 32, T(`${k}. time`, `hour ${k}`), 3, "fg-s");
    s += tx(160, 166, `${t} h · ${v} km/h = ${d} km`, "fg-b");
    return { cap: T(`${v} km/h betyr ${v} km hver time. På ${t} ${t === 1 ? "time" : "timer"} kommer bilen ${d} km.`, `${v} km/h means ${v} km every hour. In ${t} ${t === 1 ? "hour" : "hours"} the car goes ${d} km.`), svg: s }; },

  // Ohms lov som vann i et rør: spenning = høyden på vannet, resistans = hvor trangt røret er, strøm = hvor mye som renner. p = { U, R }
  lf_ohm: (p = {}) => { const U = p.U ?? 6, R = p.R ?? 3, I = U / R, lvl = Math.min(1, U / 12); let s = "";
    s += `<rect x="20" y="30" width="60" height="110" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="21" y="${f1(139 - 108 * lvl)}" width="58" height="${f1(108 * lvl)}" class="fg-water"/>`;
    s += tx(50, 24, T(`spenning ${U} V`, `voltage ${U} V`), "fg-s");
    const w = Math.max(3, 22 - R * 3); s += `<rect x="80" y="${f1(132 - w / 2)}" width="200" height="${f1(w)}" style="fill:color-mix(in srgb,var(--accent) 35%,transparent);stroke:var(--ink);stroke-width:1.6"/>`;
    s += `<rect x="150" y="${f1(132 - w / 2 - 6)}" width="60" height="${f1(w + 12)}" rx="4" style="${soft(2, 30)}"/>` + tx(180, f1(132 - w / 2 - 12), T(`resistans ${R} Ω`, `resistance ${R} Ω`), "fg-s");
    const n = Math.min(6, Math.round(I * 1.5)); for(let i = 0; i < n; i++) s += car(96 + i * 30, 160, 114 + i * 30, 160, 3, 1.8);
    s += tx(96, 178, T("strøm: flere piler = mer strøm", "current: more arrows = more current"), "fg-s", "start");
    s += col(306, 50, `I = ${U} / ${R}`, 3, "fg-b", "end") + col(306, 86, `= ${T(String(+I.toFixed(2)).replace(".", ","), String(+I.toFixed(2)))} A`, 3, "fg-big", "end");
    return { cap: T(`Strømmen I = U / R = ${U} / ${R}. Mer spenning gir mer strøm; mer resistans (trangere rør) gir mindre.`, `The current I = U / R = ${U} / ${R}. More voltage gives more current; more resistance (a narrower pipe) gives less.`), svg: s }; },

  // Atomer før og etter: h H₂ + 1 O₂ → 2 H₂O. p = { h }
  lf_atoms: (p = {}) => { const h = p.h ?? 2; let s = ""; const H = (x, y) => circ(x, y, 7, `fill:var(--card);stroke:var(--ink);stroke-width:1.6`), O = (x, y) => circ(x, y, 10, soft(1, 55));
    for(let i = 0; i < h; i++){ const y = 44 + i * 26; s += H(30, y) + H(44, y); }
    s += tx(70, 80, "+", "fg-big") + O(96, 76) + O(116, 76) + fgAr(140, 76, 172, 76, "fg-line", 2.2);
    [[206, 60], [262, 98]].forEach(([x, y]) => { s += O(x, y) + H(x - 13, y + 11) + H(x + 13, y + 11); });
    const ok = h === 2, nH = 2 * h;
    s += tx(70, 150, T(`H før: ${nH}   O før: 2`, `H before: ${nH}   O before: 2`), "fg-s") + tx(236, 150, T("H etter: 4   O etter: 2", "H after: 4   O after: 2"), "fg-s");
    s += tx(160, 172, ok ? T("Like mange atomer før og etter ✓", "The same atoms before and after ✓") : T("Stemmer ikke – atomer kan ikke forsvinne!", "No match – atoms cannot vanish!"), "fg-s" + (ok ? " fg-okt" : " fg-redt"));
    return { cap: T("Hydrogen og oksygen blir til vann. Atomene bytter partner, men like mange er med før og etter.", "Hydrogen and oxygen become water. The atoms swap partners, but the same number are there before and after."), svg: s }; },

  // Forhold: saft 1 : 4. p = { n } dl saft
  lf_ratio: (p = {}) => { const n = p.n ?? 1, k = 4; let s = "";
    const cup = (x, a, b) => { const H = 96, tot = a + b, ha = H * a / tot; return `<path d="M${x} 40 L${x + 6} 140 L${x + 46} 140 L${x + 52} 40" style="fill:none;stroke:var(--ink);stroke-width:2"/>` +
      `<rect x="${x + 4}" y="${f1(140 - ha)}" width="44" height="${f1(ha)}" style="${solid(1, 55)}"/><rect x="${x + 3}" y="44" width="46" height="${f1(96 - ha)}" style="${solid(3, 22)}"/>`; };
    s += cup(26, 1, k) + tx(52, 158, "1 : 4", "fg-b") + tx(52, 174, T("oppskrift", "recipe"), "fg-s");
    s += cup(120, n, n * k) + tx(146, 158, `${n} : ${n * k}`, "fg-b") + tx(146, 174, T(`${n} ganger så mye`, `${n} times as much`), "fg-s");
    s += col(196, 60, T(`saft: ${n} dl`, `squash: ${n} dl`), 1, "fg-b", "start") + col(196, 84, T(`vann: ${n * k} dl`, `water: ${n * k} dl`), 3, "fg-b", "start") + tx(196, 108, T(`til sammen ${n * (k + 1)} dl`, `in total ${n * (k + 1)} dl`), "fg-s", "start");
    s += tx(196, 134, T("Gang begge delene", "Multiply both parts"), "fg-s", "start") + tx(196, 150, T("med det samme tallet.", "by the same number."), "fg-s", "start");
    return { cap: T(`Forholdet 1 : 4 betyr 1 del saft og 4 deler vann. Med ${n} dl saft trenger du ${n * k} dl vann – smaken blir den samme.`, `The ratio 1 : 4 means 1 part squash and 4 parts water. With ${n} dl of squash you need ${n * k} dl of water – it tastes the same.`), svg: s }; },

  // Symmetri: en sommerfugl med speillinje. p = {} (fast figur)
  lf_mirror: () => { let s = "";
    s += `<line x1="160" y1="16" x2="160" y2="164" style="stroke:var(--c1);stroke-width:2;stroke-dasharray:6 4"/>`;
    const wing = d => `<path d="M160 70 C${160 + d * 30} 20 ${160 + d * 96} 24 ${160 + d * 92} 64 C${160 + d * 90} 90 ${160 + d * 40} 90 160 92 C${160 + d * 50} 100 ${160 + d * 84} 120 ${160 + d * 70} 146 C${160 + d * 56} 166 ${160 + d * 24} 140 160 112 Z" style="${soft(5, 40)}"/>` + circ(160 + d * 58, 60, 9, soft(2, 70)) + circ(160 + d * 50, 124, 6, soft(3, 70));
    s += wing(-1) + wing(1) + `<rect x="155" y="58" width="10" height="66" rx="5" style="fill:var(--ink)"/>`;
    s += tx(40, 30, T("venstre", "left"), "fg-s") + tx(280, 30, T("høyre", "right"), "fg-s") + tx(172, 172, T("speillinje", "mirror line"), "fg-s fg-redt", "start");
    return { cap: T("Sommerfuglen er symmetrisk: den høyre halvdelen er et speilbilde av den venstre. Bretter du langs linja, passer de over hverandre.", "The butterfly is symmetrical: the right half is a mirror image of the left. Fold along the line and the halves match."), svg: s }; },

  // Måletrappa med et tall som flyttes k trinn ned fra «from». p = { v, from, k }
  lf_stairs: (p = {}) => { const L = ["km", "hm", "dam", "m", "dm", "cm", "mm"], from = p.from ?? "m", v = p.v ?? 3, k = p.k ?? 0, i0 = L.indexOf(from), i1 = Math.min(L.length - 1, i0 + k); let s = "";
    L.forEach((l, i) => { const x = 14 + i * 34, y = 24 + i * 16, on = i === i1, was = i === i0; s += `<rect x="${x}" y="${y}" width="34" height="${150 - y}" style="${on ? soft(4, 50) : was ? soft(3, 30) : soft(3, 10)}"/>` + tx(x + 17, y + 15, l, on || was ? "fg-b" : "fg-s"); });
    for(let i = i0; i < i1; i++){ const x = 14 + i * 34 + 17; s += `<path d="M${x + 6} ${24 + i * 16 - 6} Q${x + 24} ${24 + i * 16 - 18} ${x + 34} ${24 + (i + 1) * 16 - 6}" style="fill:none;stroke:var(--c4);stroke-width:1.8"/>` + col(x + 24, 24 + i * 16 - 18, "·10", 4, "fg-s fg-tick"); }
    const val = v * 10 ** (i1 - i0); s += col(312, 40, `${v} ${from} = ${val} ${L[i1]}`, 4, "fg-b", "end") + tx(312, 60, T(`${i1 - i0} ${i1 - i0 === 1 ? "trinn" : "trinn"} ned: · ${10 ** (i1 - i0)}`, `${i1 - i0} ${i1 - i0 === 1 ? "step" : "steps"} down: · ${10 ** (i1 - i0)}`), "fg-s", "end");
    s += tx(14, 172, T("ned ett trinn: · 10   opp ett trinn: : 10", "one step down: · 10   one step up: ÷ 10"), "fg-s fg-tick", "start");
    return { cap: T(`Måletrappa: hvert trinn ned ganger du med 10. ${v} ${from} er ${val} ${L[i1]}.`, `The unit staircase: each step down multiply by 10. ${v} ${from} is ${val} ${L[i1]}.`), svg: s }; },

  // Gjennomsnitt som tårn av klosser. p = { vals, med } (med = indeksen som er medianen og skal fremheves)
  lf_mean: (p = {}) => { const v = p.vals || [2, 6, 4], n = v.length, mean = v.reduce((a, b) => a + b, 0) / n, u = 16, base = 150; let s = "";
    s += `<line class="fg-line" x1="20" y1="${base}" x2="300" y2="${base}"/>`;
    v.forEach((h, i) => { const x = 60 + i * (220 / Math.max(1, n - 1)) - 18, hl = p.med === i; for(let k = 0; k < h; k++) s += `<rect x="${f1(x)}" y="${base - (k + 1) * u}" width="36" height="${u - 2}" rx="3" style="${soft(hl ? 2 : [3, 4, 5][i % 3], hl ? 70 : 50)}"/>`;
      s += tx(f1(x + 18), base + 16, String(h), "fg-b"); });
    if(p.med == null) s += `<line x1="20" y1="${f1(base - mean * u + 1)}" x2="300" y2="${f1(base - mean * u + 1)}" style="stroke:var(--c1);stroke-width:2;stroke-dasharray:6 4"/>` + col(300, f1(base - mean * u - 6), T(`gjennomsnitt ${+mean.toFixed(1)}`.replace(".", ","), `mean ${+mean.toFixed(1)}`), 1, "fg-s", "end");
    else s += col(160, 22, T(`median = ${v[p.med]}`, `median = ${v[p.med]}`), 2, "fg-b");
    return { cap: p.med == null ? T(`Tårnene har ${v.join(", ")} klosser. Deler vi likt, blir hvert tårn ${+mean.toFixed(1)} høyt: det er gjennomsnittet.`.replace(/(\d)\.(\d)/g, "$1,$2"), `The towers have ${v.join(", ")} blocks. Shared equally, each tower is ${+mean.toFixed(1)} tall: that is the mean.`)
      : T(`I rekkefølge: ${v.join(", ")}. Tallet i midten, ${v[p.med]}, er medianen.`, `In order: ${v.join(", ")}. The middle number, ${v[p.med]}, is the median.`), svg: s }; },

  // Rentes rente: 1000 kr med 10 % i n år, som søyler. p = { n }
  lf_growth: (p = {}) => { const n = p.n ?? 2, base = 150, k = 0.05; let s = "";
    s += `<line class="fg-line" x1="20" y1="${base}" x2="304" y2="${base}"/><line class="fg-mut" x1="20" y1="${base - 1500 * k}" x2="304" y2="${base - 1500 * k}" style="stroke-dasharray:5 4"/>` + tx(304, base - 1500 * k - 5, "1500 kr", "fg-s", "end");
    for(let i = 0; i <= 7; i++){ const v = 1000 * 1.1 ** i, x = 26 + i * 35, h = v * k, on = i <= n;
      s += `<rect x="${x}" y="${f1(base - h)}" width="26" height="${f1(h)}" rx="3" style="${on ? soft(i === n ? 4 : 3, i === n ? 60 : 40) : "fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 3"}"/>` + tx(x + 13, base + 15, String(i), "fg-s");
      if(i === n) s += col(x + 13, f1(base - h - 6), Math.round(v) + " kr", 4, "fg-b"); }
    s += tx(20, 20, T("1000 kr med 10 % rente", "1000 kr at 10 % interest"), "fg-b", "start") + tx(304, 176, T("år", "years"), "fg-s", "end");
    return { cap: T(`Etter ${n} år er 1000 kr blitt ${Math.round(1000 * 1.1 ** n)} kr. Søylene vokser mer og mer hvert år, fordi du får rente av renta.`, `After ${n} years 1000 kr has grown to ${Math.round(1000 * 1.1 ** n)} kr. The bars grow more each year because you earn interest on the interest.`), svg: s }; },

  // Pris med kroner og øre. p = { kr, ore }
  lf_price: (p = {}) => { const kr = p.kr ?? 24, ore = p.ore ?? 90; let s = "";
    s += `<path d="M40 50 L200 50 L230 90 L200 130 L40 130 Z" style="${soft(2, 22)}"/>` + circ(212, 90, 5, "fill:var(--card);stroke:var(--ink);stroke-width:1.6");
    s += tx(120, 104, T(`${kr},${String(ore).padStart(2, "0")} kr`, `${kr}.${String(ore).padStart(2, "0")} kr`), "fg-big");
    s += col(60, 160, T(`${kr} hele kroner`, `${kr} whole kroner`), 4, "fg-b", "start") + col(200, 160, T(`${ore} øre`, `${ore} øre`), 3, "fg-b", "start");
    s += tx(312, 36, T("100 øre = 1 krone", "100 øre = 1 krone"), "fg-s", "end");
    return { cap: T(`Prisen ${kr},${String(ore).padStart(2, "0")} kr er ${kr} hele kroner og ${ore} øre. Sifrene etter kommaet er deler av en krone.`, `The price ${kr}.${String(ore).padStart(2, "0")} kr is ${kr} whole kroner and ${ore} øre. The digits after the point are parts of a krone.`), svg: s }; }
});
})();
