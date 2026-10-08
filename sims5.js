// ============================================================
//  PRØV SELV, runde 5 – økonomi og administrasjon.
//  Nullpunkt og dekningsbidrag, marked og likevekt (med avgift), og avskrivninger (lineær mot saldo).
//  Samme format som sims.js, med levende formel (eq).
// ============================================================
(() => {
const soft = (n, p = 22) => `fill:color-mix(in srgb,var(--c${n}) ${p}%,transparent);stroke:none`;
const poly = (pts, st) => `<polygon points="${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" style="${st}"/>`;
const qkr = x => qc(9, (x < 0 ? "-" : "") + qk(Math.abs(x))) + qt`\,\mathrm{kr}`;

Object.assign(SIMS, {
  // ---------- Bedriftsøkonomi: dekningsbidrag og nullpunkt ----------
  breakeven: { t: ["Dekningsbidrag og nullpunkt", "Contribution margin and break-even"],
    p: [["p", ["pris", "price"], 50, 300, 10, 150, "kr", 1], ["vc", ["variabel kostnad", "variable cost"], 20, 200, 10, 90, "kr", 2],
        ["fc", ["faste kostnader", "fixed costs"], 40000, 400000, 20000, 120000, "kr", 3], ["x", ["solgt mengde", "units sold"], 0, 10000, 500, 3000, "", 4]],
    q: ["Hvorfor flytter nullpunktet seg når prisen endres, selv om de faste kostnadene er de samme?", "Why does the break-even point move when the price changes, even though fixed costs are the same?"],
    g: [["Still salget akkurat i nullpunktet (resultat 0).", "Set sales exactly at break-even (profit 0).", (v, m) => Math.abs(m.res) < 1e-6],
        ["Faste kostnader 200 000 og salg 5 000 enheter: få et overskudd på minst 100 000 kr.", "Fixed costs 200,000 and 5,000 units sold: make a profit of at least 100,000.", (v, m) => v.fc === 200000 && v.x === 5000 && m.res >= 100000]],
    f: v => { const db = v.p - v.vc, res = db * v.x - v.fc, be = db > 0 ? v.fc / db : null, xm = 10000, ym = Math.max(v.p * xm, v.fc + v.vc * xm) * 1.02;
      const g = smPlot([[x => v.p * x, "fg-acc", 2.6], [x => v.fc + v.vc * x, "fg-red", 2.4], [() => v.fc, "fg-mut", 1.2]], [0, xm], [0, ym], T("mengde", "units"), T("kr", "NOK"), (X, Y) =>
        (be != null && be <= xm ? smLine(X(be), Y(0), X(be), Y(v.p * be), "fg-ok", "4 3") + smDot(X(be), Y(v.p * be), "fg-dot2") + fgT(X(be), Y(0) + 14, T("nullpunkt", "break-even"), "fg-s fg-okt") : "") +
        smLine(X(v.x), Y(v.fc + v.vc * v.x), X(v.x), Y(v.p * v.x), res >= 0 ? "fg-ok" : "fg-red", "") + smDot(X(v.x), Y(v.p * v.x)) +
        fgT(X(0) + 14, 26, T("inntekt", "revenue"), "fg-s", "start") + fgT(X(0) + 14, 39, T("kostnad", "cost"), "fg-s fg-redt", "start"));
      return { m: { res, db }, eq: [qt`\mathrm{DB} = ${qc(1, v.p)} - ${qc(2, v.vc)} = ${qr(db, 0)}\,\mathrm{kr}`,
          be == null ? qt`\mathrm{DB} \le 0:\ \text{${T("aldri lønnsomt", "never profitable")}}` : qt`x_0 = \frac{${qc(3, qk(v.fc))}}{${qn(db, 0)}} = ${qr(be, 0)}`,
          qt`${T("\\text{resultat}", "\\text{profit}")} = ${qn(db, 0)}\cdot ${qc(4, qk(v.x))} - ${qc(3, qk(v.fc))} = ${qkr(res)}`],
        out: [[T("DB per enhet", "CM per unit"), smKr(db)], [T("nullpunkt", "break-even"), be == null ? "–" : smN(Math.ceil(be - 1e-9), 0) + " " + T("stk", "units")], [T("resultat", "profit"), smKr(res)]], svg: g.svg }; } },

  // ---------- Samfunnsøkonomi: tilbud, etterspørsel og likevekt ----------
  market: { t: ["Tilbud, etterspørsel og likevekt", "Supply, demand and equilibrium"],
    p: [["a", ["etterspørsel (maks betalingsvilje)", "demand (max willingness to pay)"], 60, 200, 5, 120, "kr", 1], ["c", ["tilbud (laveste pris)", "supply (lowest price)"], 0, 80, 5, 20, "kr", 2],
        ["d", ["tilbudskurvens stigning", "supply slope"], 0.5, 2, 0.5, 1, "", 3], ["t", ["avgift per enhet", "tax per unit"], 0, 40, 5, 0, "kr", 5]],
    q: ["Hvem betaler egentlig en avgift: kjøperne eller selgerne? Se på hvordan prisen flytter seg.", "Who really pays a tax: buyers or sellers? Watch how the price moves."],
    g: [["Uten avgift: få likevektsprisen til nøyaktig 100 kr.", "With no tax: make the equilibrium price exactly 100.", (v, m) => v.t === 0 && Math.abs(m.P - 100) < 1e-9],
        ["Med avgift 20 kr: få likevektsmengden til 30.", "With a 20 tax: make the equilibrium quantity 30.", (v, m) => v.t === 20 && Math.abs(m.Q - 30) < 1e-9]],
    f: v => { const Q = Math.max(0, (v.a - v.c - v.t) / (1 + v.d)), P = v.a - Q, Ps = P - v.t, qm = 200, pm = 240;
      const g = smPlot([[q => v.a - q, "fg-acc", 2.6], [q => v.c + v.d * q, "fg-red", 2.2], ...(v.t > 0 ? [[q => v.c + v.t + v.d * q, "fg-mut", 1.6]] : [])], [0, qm], [0, pm], "Q", "P", (X, Y) =>
        (Q > 0 ? poly([[X(0), Y(v.a)], [X(0), Y(P)], [X(Q), Y(P)]], soft(1, 26)) + poly([[X(0), Y(Ps)], [X(0), Y(v.c)], [X(Q), Y(Ps)]], soft(2, 26)) +
          (v.t > 0 ? `<rect x="${X(0).toFixed(1)}" y="${Y(P).toFixed(1)}" width="${(X(Q) - X(0)).toFixed(1)}" height="${(Y(Ps) - Y(P)).toFixed(1)}" style="${soft(5, 30)}"/>` : "") +
          smLine(X(0), Y(P), X(Q), Y(P), "fg-mut", "3 3") + smLine(X(Q), Y(0), X(Q), Y(P), "fg-mut", "3 3") + smDot(X(Q), Y(P)) : "") +
        fgT(X(0) + 14, 26, T("etterspørsel", "demand"), "fg-s", "start") + fgT(X(0) + 14, 39, T("tilbud", "supply"), "fg-s fg-redt", "start"));
      const cs = Q * (v.a - P) / 2, ps = Q * (Ps - v.c) / 2;
      return { m: { Q, P }, eq: [qt`${qc(1, v.a)} - Q = ${qc(2, v.c)} + ${qc(5, v.t)} + ${qc(3, qn(v.d, 1))}\,Q`,
          qt`Q = \frac{${qc(1, v.a)} - ${qc(2, v.c)} - ${qc(5, v.t)}}{1 + ${qc(3, qn(v.d, 1))}} = ${qr(Q, 1)},\quad P = ${qr(P, 1)}\,\mathrm{kr}`,
          qt`${T("\\text{selger får}", "\\text{seller gets}")}\ P - t = ${qn(Ps, 1)}\,\mathrm{kr}`],
        out: [[T("likevekt Q", "equilibrium Q"), smN(Q, 1)], [T("pris kjøper", "buyer price"), smN(P, 1) + " kr"], [T("konsumentoverskudd", "consumer surplus"), smN(cs, 0)], [T("produsentoverskudd", "producer surplus"), smN(ps, 0)], [T("avgiftsinntekt", "tax revenue"), smN(v.t * Q, 0)]], svg: g.svg }; } },

  // ---------- Regnskap: lineær avskrivning mot saldoavskrivning ----------
  deprec: { t: ["Avskrivning: lineær og saldo", "Depreciation: straight-line and declining balance"],
    p: [["k", ["anskaffelseskost", "cost"], 100000, 1000000, 50000, 500000, "kr", 1], ["L", ["levetid", "useful life"], 3, 15, 1, 5, T("år", "yr"), 2],
        ["s", ["saldosats", "declining rate"], 5, 40, 5, 20, "%", 3], ["n", ["år", "year"], 0, 15, 1, 0, "", 4]],
    q: ["Hvorfor når saldoavskrivning aldri helt ned til null?", "Why does declining-balance depreciation never quite reach zero?"],
    g: [["Saldosats 20 %: finn det første året der saldoen er under halvparten av kostprisen.", "Rate 20%: find the first year where the balance is below half of the cost.", v => v.s === 20 && (0.8 ** v.n) < 0.5 && (0.8 ** (v.n - 1)) >= 0.5],
        ["Finn en saldosats som gir lavere bokført verdi enn lineær avskrivning etter 2 år med 5 års levetid.", "Find a rate that gives a lower book value than straight-line after 2 years with a 5-year life.", v => v.L === 5 && v.n === 2 && (1 - v.s / 100) ** 2 < 1 - 2 / 5]],
    f: v => { const lin = n => v.k * Math.max(0, 1 - n / v.L), sal = n => v.k * (1 - v.s / 100) ** n, a = lin(v.n), b = sal(v.n);
      const g = smPlot([[lin, "fg-acc", 2.4], [sal, "fg-red", 2.4]], [0, 15], [0, v.k * 1.05], T("år", "yr"), T("kr", "NOK"), (X, Y) =>
        smLine(X(v.n), Y(0), X(v.n), Y(v.k), "fg-mut", "3 3") + smDot(X(v.n), Y(a)) + smDot(X(v.n), Y(b), "fg-dot2") +
        fgT(300, 28, T("lineær", "straight-line"), "fg-s", "end") + fgT(300, 42, T("saldo", "declining"), "fg-s fg-redt", "end"));
      return { eq: [qt`${T("\\text{lineær}", "\\text{straight}")}: ${qc(1, qk(v.k))}\cdot\left(1 - \frac{${qc(4, v.n)}}{${qc(2, v.L)}}\right) = ${qkr(a)}`,
          qt`${T("\\text{saldo}", "\\text{declining}")}: ${qc(1, qk(v.k))}\cdot ${qc(3, qn(1 - v.s / 100, 2))}^{${qc(4, v.n)}} = ${qkr(b)}`],
        out: [[T("lineær verdi", "straight-line value"), smKr(a)], [T("saldo", "balance"), smKr(b)], [T("avskrivning i år", "depreciation this year"), v.n === 0 ? "–" : smKr(sal(v.n - 1) - b)]], svg: g.svg }; } }
});

for(const [k, name] of [["OBED:0", "breakeven"], ["OMAT:0", "breakeven"], ["OSAM:0", "market"], ["OSAM:1", "market"], ["OREG:1", "deprec"], ["OSTAT:0", "normal"], ["OSTAT:2", "normal"]]){
  const cur = SIM_MAP[k]; SIM_MAP[k] = cur ? [].concat(cur, name).filter((x, i, a) => a.indexOf(x) === i) : name;
}
})();

// ---------- Førerkort: stopplengde, avstand, promille, kjørt i blinde og fart i sving ----------
(() => {
let dvkUid = 0;
// Rad med sammenligningsfigurer (fkBeast), der den siste kan være delvis fylt. n kan være et desimaltall.
const smIcons = (kind, n, yb = 172, hmax = 108, top = 56) => { const B = typeof FK_BEAST !== "undefined" ? FK_BEAST[kind] : { w: 90, h: 40 };
  const nd = Math.min(12, Math.max(1, Math.ceil(n - 1e-9))), fit = r => Math.min(1.6, 300 / (Math.ceil(nd / r) * B.w * 1.08), (hmax - (r - 1) * 8) / r / B.h);
  const rows = [1, 2, 3].filter(r => r <= nd).reduce((b, r) => fit(r) > fit(b) + 1e-9 ? r : b, 1), cols = Math.ceil(nd / rows), sc = fit(rows), gap = (300 - cols * B.w * sc) / (cols + 1), rh = (hmax - (rows - 1) * 8) / rows;
  const one = (x, by) => typeof fkBeast === "function" ? fkBeast(kind, x, by, sc) : `<rect x="${(x - B.w * sc / 2).toFixed(1)}" y="${(by - B.h * sc).toFixed(1)}" width="${(B.w * sc).toFixed(1)}" height="${(B.h * sc).toFixed(1)}" rx="6" style="fill:#8E969F"/>`;
  let s = "";
  for(let i = 0; i < nd; i++){ const r = Math.floor(i / cols), j = i - r * cols, by = yb - (rows - 1 - r) * (rh + 8) - (rh - B.h * sc) / 2 * (rows > 1 ? 1 : 0), x0 = 10 + gap * (j + 1) + B.w * sc * j, cx = x0 + B.w * sc / 2, fr = Math.min(1, n - i);
    if(fr >= 0.999 || n > 12) s += one(cx, by);
    else { const id = "dvi" + (++dvkUid); s += `<g style="opacity:.18">${one(cx, by)}</g><clipPath id="${id}"><rect x="${(x0 - 4).toFixed(1)}" y="${by - B.h * sc - 6}" width="${(B.w * sc * fr + 4).toFixed(1)}" height="${B.h * sc + 8}"/></clipPath><g clip-path="url(#${id})">${one(cx, by)}</g>`; } }
  return s; };
const smR = (x, d = 1) => smN(Math.round(x * 10 ** d) / 10 ** d, d);
const smBig = (x, y, txt, col, an, fs = 22) => `<text x="${x}" y="${y}" class="fg-big" text-anchor="${an}" style="font-size:${fs}px;fill:var(${col})">${txt}</text>`;
const smEtg = h => { const e = h / 3; return e < 0.95 ? T("under én etasje", "under one storey") : "≈ " + smR(e, e < 10 ? 1 : 0) + " " + (Math.round(e * 10) === 10 ? T("etasje", "storey") : T("etasjer", "storeys")); };
const FK_MU = [7, 5, 2.5, 1]; // retardasjon (m/s²): tørr asfalt, våt asfalt, snø, is
const fkFore = k => [T("tørr asfalt", "dry tarmac"), T("våt asfalt", "wet tarmac"), T("snø", "snow"), T("is", "ice")][k - 1];
// Bil sett ovenfra, front mot høyre, sentrert i (x, y)
const smCar = (x, y, col = "#2B59C3") => `<g transform="translate(${x.toFixed(1)} ${y})"><rect x="-13" y="-7" width="26" height="14" rx="4" style="fill:${col}"/><rect x="3" y="-5" width="6" height="10" rx="1.5" style="fill:rgba(220,240,255,.9)"/><rect x="11" y="-6" width="2.4" height="3.4" rx=".8" style="fill:#FFF3B0"/><rect x="11" y="2.6" width="2.4" height="3.4" rx=".8" style="fill:#FFF3B0"/><rect x="-13" y="-6" width="2" height="3" style="fill:#E0201B"/><rect x="-13" y="3" width="2" height="3" style="fill:#E0201B"/></g>`;
// Føre som glidebryter: 1 is → 4 tørr asfalt (vises som ikon, navn og farge, ikke som tall).
const FK_STEPS = [["is", "ice", "🧊", "#8FD3F4"], ["snø", "snow", "❄️", "#DCE6EF"], ["våt asfalt", "wet tarmac", "💧", "#3D6A9E"], ["tørr asfalt", "dry tarmac", "☀️", "#8A9097"]];
const fkA = f => FK_MU[4 - f]; // glidebryterverdi → retardasjon
const FK_ROAD = ["#BFDCEB", "#E9EEF2", "#3F464E", "#5E656D"]; // veifarge for is, snø, vått, tørt
// Vei med føre: is er blank og blålig med glansstriper, snø er hvit med spor og fnugg, vått er mørkt med speilinger.
function smRoad(y0 = 70, h = 46, f = 4){
  let s = `<rect x="0" y="${y0}" width="320" height="${h}" style="fill:${FK_ROAD[f - 1]}"/>`;
  if(f === 1) for(let i = 0; i < 9; i++) s += `<path d="M${18 + i * 36} ${y0 + 6 + (i % 3) * 11}l22 -5" style="stroke:#fff;stroke-width:2;opacity:.75;stroke-linecap:round"/>`;
  if(f === 2){ s += `<rect x="0" y="${y0 + h * 0.18}" width="320" height="${h * 0.16}" style="fill:#AEB7C0;opacity:.55"/><rect x="0" y="${y0 + h * 0.66}" width="320" height="${h * 0.16}" style="fill:#AEB7C0;opacity:.55"/>`;
    for(let i = 0; i < 16; i++) s += `<circle cx="${(i * 41) % 320 + 6}" cy="${y0 - 26 + (i * 17) % 22}" r="${1.6 + (i % 3) * 0.6}" style="fill:#fff;stroke:#9FB0BF;stroke-width:.5"/>`; }
  if(f === 3) for(let i = 0; i < 7; i++) s += `<ellipse cx="${30 + i * 44}" cy="${y0 + 8 + (i % 2) * (h - 16)}" rx="${12 + (i % 3) * 4}" ry="3" style="fill:#7FA7D1;opacity:.55"/>`;
  return s + `<line x1="0" y1="${y0 + h / 2}" x2="320" y2="${y0 + h / 2}" style="stroke:${f === 2 ? "#B8C2CC" : "#F4F4F4"};stroke-width:1.6;stroke-dasharray:10 8"/>`;
}
const smKid = (x, y) => `<g transform="translate(${x.toFixed(1)} ${y})"><circle cy="-15" r="3.6" style="fill:#F1C7A1"/><path d="M0 -11L-1 -3M0 -9L-5 -5M0 -9L5 -6M-1 -3L-4 4M-1 -3L3 4" style="stroke:#E07A1F;stroke-width:3;stroke-linecap:round;fill:none"/></g>`;
Object.assign(SIMS, {
  dvstopp: { t: ["Stopplengde: fart, reaksjon og føre", "Stopping distance: speed, reaction and road surface"],
    a: ["Antatt: bremsing med 7 m/s² på tørr asfalt, 5 på våt, 2,5 på snø og 1 på is. Barnet står 40 m foran.", "Assumed: braking at 7 m/s² on dry tarmac, 5 wet, 2.5 snow and 1 ice. The child is 40 m ahead."],
    p: [["v", ["fart", "speed"], 20, 120, 5, 50, "km/t", 1], ["tr", ["reaksjonstid", "reaction time"], 0.5, 2.5, 0.1, 1, "s", 2], ["f", ["føre", "road surface"], 1, 4, 1, 4, "", 3, FK_STEPS]],
    q: ["Et barn løper ut 40 meter foran deg. Stopper du i tide?", "A child runs out 40 metres ahead. Do you stop in time?"],
    g: [["Tørr asfalt og 1 s reaksjonstid: finn den høyeste farten der du stopper før barnet (40 m).", "Dry tarmac and 1 s reaction time: find the highest speed where you stop before the child (40 m).", v => v.f === 4 && Math.abs(v.tr - 1) < 1e-9 && v.v === 60],
        ["Is og 1 s reaksjonstid: still inn den høyeste farten der du fortsatt stopper før barnet.", "Ice and 1 s reaction time: set the highest speed where you still stop before the child.", v => v.f === 1 && Math.abs(v.tr - 1) < 1e-9 && v.v === 25],
        ["Du er trøtt (2 s reaksjonstid) og kjører 50 km/t på tørr asfalt. Rekker du å stoppe?", "You are tired (2 s reaction time) and drive at 50 km/h on dry tarmac. Can you stop in time?", v => v.f === 4 && Math.abs(v.tr - 2) < 1e-9 && v.v === 50]],
    f: v => { const ms = v.v / 3.6, a = fkA(v.f), sr = ms * v.tr, sb = ms * ms / (2 * a), st = sr + sb, ok = st <= 40, k = 2.4, x0 = 16;
      let s = smRoad(70, 46, v.f) + `<rect x="${x0}" y="128" width="${(sr * k).toFixed(1)}" height="9" rx="2" style="fill:#2B6FD6"/><rect x="${(x0 + sr * k).toFixed(1)}" y="128" width="${(sb * k).toFixed(1)}" height="9" rx="2" style="fill:#D1453B"/>`;
      s += `<line x1="${x0 + 40 * k}" y1="62" x2="${x0 + 40 * k}" y2="142" style="stroke:#E9A100;stroke-width:1.5;stroke-dasharray:3 3"/>` + smKid(x0 + 40 * k + 4, 88) + fgT(x0 + 40 * k, 56, "40 m", "fg-s");
      s += smCar(Math.min(316, x0 + st * k) - 13, 104, ok ? "#2B59C3" : "#D23F3A") + smCar(x0 + 13, 82, "rgba(43,89,195,.35)");
      s += fgT(x0, 160, T("reaksjon", "reaction") + " " + smN(sr, 0) + " m", "fg-s", "start") + fgT(x0 + sr * k + 4, 172, T("bremsing", "braking") + " " + smN(sb, 0) + " m", "fg-s fg-redt", "start");
      s += fgT(306, 30, ok ? T("Stopper før barnet", "Stops before the child") : T("Treffer barnet!", "Hits the child!"), ok ? "fg-t fg-okt" : "fg-t fg-redt", "end");
      return { m: { st }, eq: [qt`s = ${qc(1, qn(ms, 1))}\cdot ${qc(2, qn(v.tr, 1))} + \frac{${qc(1, qn(ms, 1))}^2}{2\cdot ${qc(3, qn(a, 1))}} = ${qr(st, 0)}\,\mathrm{m}`],
        out: [[T("fart", "speed"), smN(ms, 1) + " m/s"], [T("føre", "surface"), fkFore(5 - v.f)], [T("stopplengde", "stopping distance"), smN(st, 0) + " m"]], svg: s }; } },
  dvavstand: { t: ["Avstand til bilen foran", "Distance to the car in front"],
    a: ["Antatt: bilen foran bremser like hardt som deg, så det er reaksjonstiden som må dekkes av luka.", "Assumed: the car ahead brakes as hard as you, so the gap must cover your reaction time."],
    p: [["v", ["fart", "speed"], 30, 110, 10, 80, "km/t", 1], ["s", ["avstand i sekunder", "gap in seconds"], 0.5, 5, 0.5, 1, "s", 2], ["tr", ["reaksjonstid", "reaction time"], 0.5, 2, 0.5, 1, "s", 3]],
    q: ["Bilen foran bråbremser. Du bremser like hardt, men først etter reaksjonstiden. Holder avstanden?", "The car in front brakes hard. You brake just as hard, but only after your reaction time. Is the gap enough?"],
    g: [["80 km/t: still inn avstanden etter tresekundersregelen.", "80 km/h: set the gap by the three-second rule.", v => v.v === 80 && v.s === 3],
        ["Reaksjonstid 1,5 s: finn den minste avstanden (i sekunder) der du så vidt rekker å reagere. Merk hvor lite margin det gir.", "Reaction time 1.5 s: find the smallest gap (in seconds) where you only just have time to react. Note how little margin that leaves.", v => Math.abs(v.tr - 1.5) < 1e-9 && v.s === 1.5]],
    f: v => { const ms = v.v / 3.6, gap = ms * v.s, need = ms * v.tr, ok = gap >= need, k = 300 / Math.max(110, gap + 40), xb = 20, xa = xb + gap * k;
      let s = smRoad(70, 46) + smCar(xb, 104, ok ? "#2B59C3" : "#D23F3A") + smCar(Math.min(306, xa + 26), 104, "#E9A100");
      s += `<rect x="${xb + 13}" y="122" width="${Math.max(0, gap * k - 13).toFixed(1)}" height="8" rx="2" style="fill:#1E9A5E"/><rect x="${xb + 13}" y="134" width="${Math.max(0, need * k - 13).toFixed(1)}" height="8" rx="2" style="fill:#D1453B"/>`;
      s += fgT(xb, 160, T("avstand", "gap") + " " + smN(gap, 0) + " m", "fg-s fg-okt", "start") + fgT(xb, 174, T("kjørt før du bremser", "travelled before you brake") + " " + smN(need, 0) + " m", "fg-s fg-redt", "start");
      const safe = ok && v.s >= 3;
      s += fgT(306, 30, !ok ? T("For tett!", "Too close!") : safe ? T("Trygg avstand", "Safe gap") : T("Så vidt nok, liten margin", "Only just enough, little margin"), !ok ? "fg-t fg-redt" : safe ? "fg-t fg-okt" : "fg-t fg-acct", "end");
      return { m: { gap, need }, eq: [qt`d = ${qc(1, qn(ms, 1))}\cdot ${qc(2, qn(v.s, 1))} = ${qr(gap, 0)}\,\mathrm{m}`, qt`${T("\\text{reaksjon}", "\\text{reaction}")} = ${qc(1, qn(ms, 1))}\cdot ${qc(3, qn(v.tr, 1))} = ${qn(need, 0)}\,\mathrm{m}`],
        out: [[T("avstand", "gap"), smN(gap, 0) + " m"], [T("trygg?", "safe?"), !ok ? T("nei", "no") : safe ? T("ja", "yes") : T("lite margin", "little margin")]], svg: s }; } },
  dvpromille: { t: ["Promille over tid (bare til læring)", "Blood alcohol over time (for learning only)"],
    a: ["Bare til læring, aldri for å avgjøre om du kan kjøre: er du i tvil, kjører du ikke. Antatt: Widmarks formel, 12 g alkohol per enhet, kroppsvann 0,7 (mann) og 0,6 (kvinne), forbrenning 0,15 ‰ i timen. Det varierer mye fra person til person.", "For learning only, never to decide whether you can drive: if in doubt, do not drive. Assumed: the Widmark formula, 12 g alcohol per unit, body water 0.7 (male) and 0.6 (female), burning 0.15 per mille an hour. It varies a lot between people."],
    p: [["e", ["alkoholenheter", "alcohol units"], 1, 10, 1, 4, "", 1], ["kg", ["vekt", "weight"], 50, 110, 5, 70, "kg", 2], ["r", ["kropp", "body"], 1, 2, 1, 2, "", 3, [["kvinne", "female", "👩", "#C2185B"], ["mann", "male", "👨", "#2B6FD6"]]], ["h", ["timer etter", "hours later"], 0, 16, 1, 0, "t", 4]],
    q: ["Dette er en grov formel. Bruk den aldri til å regne ut om du kan kjøre: er du i tvil, kjører du ikke.", "This is a rough formula. Never use it to work out whether you can drive: if in doubt, do not drive."],
    g: [["4 enheter, 70 kg, mann: finn første hele time der promillen er under 0,2.", "4 units, 70 kg, male: find the first whole hour where the level is below 0.2.", v => v.e === 4 && v.kg === 70 && v.r === 2 && v.h === 8],
        ["Samme mengde, men 55 kg kvinne: hvor mange timer tar det nå?", "Same amount, but a 55 kg female: how many hours does it take now?", v => v.e === 4 && v.kg === 55 && v.r === 1 && v.h === 11]],
    f: v => { const rr = v.r === 2 ? 0.7 : 0.6, peak = v.e * 12 / (v.kg * rr), pr = h => Math.max(0, peak - 0.15 * h), now = pr(v.h), sober = peak / 0.15, under = Math.max(0, (peak - 0.2) / 0.15);
      const g = smPlot([[pr, "fg-acc", 2.6], [() => 0.2, "fg-red", 1.4]], [0, 16], [0, Math.max(1, peak * 1.1)], T("timer", "hours"), "‰", (X, Y) => smDot(X(v.h), Y(now)) + fgT(X(16) - 2, Y(0.2) - 5, T("grensen 0,2", "limit 0.2"), "fg-s fg-redt", "end"));
      return { m: { now }, eq: [qt`${T("\\text{promille}", "\\text{level}")} \approx \frac{${qc(1, v.e)}\cdot 12}{${qc(2, v.kg)}\cdot ${qc(3, qn(rr, 1))}} - 0{,}15\cdot ${qc(4, v.h)} = ${qr(now, 2)}`],
        out: [[T("promille nå", "level now"), smN(now, 2) + " ‰"], [T("under 0,2 etter", "below 0.2 after"), smN(under, 1) + " " + T("t", "h")], [T("edru etter", "sober after"), smN(sober, 1) + " " + T("t", "h")]], svg: g.svg }; } },
  dvblind: { t: ["Blikket på mobilen", "Eyes on your phone"],
    a: ["Antatt: farten er den samme mens du ser ned. Bybuss 12 m, fotballbane 105 m (vises fra 0,8 bane). Busser og bane er tegnet i samme målestokk som vegen.", "Assumed: the speed stays the same while you look down. City bus 12 m, football pitch 105 m (shown from 0.8 pitch). Buses and pitch are drawn to the same scale as the road."],
    p: [["v", ["fart", "speed"], 30, 110, 10, 50, "km/t", 1], ["t", ["sekunder du ser på mobilen", "seconds looking at your phone"], 0.5, 4, 0.5, 1, "s", 2]],
    g: [["Du leser en melding i 2 sekunder i 80 km/t. Still det inn: hvor mange busslengder kjører du uten å se på vegen?", "You read a message for 2 seconds at 80 km/h. Set it up: how many bus lengths do you travel without looking at the road?", v => v.v === 80 && v.t === 2],
        ["Du bytter sang i 4 sekunder i 80 km/t. Hvor stor del av en fotballbane kjører du uten å se på vegen?", "You change songs for 4 seconds at 80 km/h. How much of a football pitch do you travel without looking at the road?", v => v.v === 80 && v.t === 4]],
    f: v => { const ms = v.v / 3.6, d = ms * v.t, xs = 30, pitch = d >= 0.8 * 105, k = (312 - xs) / (pitch ? 125 : d < 40 ? 45 : 95), x1 = xs + d * k, nb = d / 12, nf = d / 105;
      const big = (x, y, txt, col, an) => `<text x="${x}" y="${y}" class="fg-big" text-anchor="${an}" style="font-size:22px;fill:var(${col})">${txt}</text>`;
      let s = fgT(8, 14, T("Du ser på mobilen i", "You look at your phone for") + " " + smN(v.t, 1) + " s", "fg-s", "start") + big(8, 38, smN(d, 0) + " m", "--bad", "start");
      s += fgT(312, 14, T("uten å se på vegen, like langt som", "without looking at the road, as far as"), "fg-s", "end") + big(312, 38, "≈ " + smR(nb) + " " + (Math.round(nb * 10) === 10 ? T("buss", "bus") : T("busser", "buses")), "--accent", "end");
      s += `<rect x="0" y="46" width="320" height="26" style="fill:#5E656D"/><line x1="0" y1="59" x2="320" y2="59" style="stroke:#F4F4F4;stroke-width:1.4;stroke-dasharray:9 7"/>`;
      s += smCar(xs - 13, 65) + `<rect x="${xs - 18}" y="47.5" width="6" height="9" rx="1.2" style="fill:#1B1F24"/><rect x="${xs - 17.2}" y="48.6" width="4.4" height="6.6" rx=".6" style="fill:#7FB2FF"/>`;
      s += smCar(Math.min(306, x1 - 13), 65, "rgba(43,89,195,.45)") + `<rect x="${xs}" y="75" width="${(d * k).toFixed(1)}" height="5" rx="2" style="fill:#D1453B"/>`;
      if(typeof fkBeast === "function"){ const bw = 12 * k, sc = bw / 120, nd = Math.ceil(nb - 1e-9); let g = "", ghost = "";
        const by = pitch ? 112 : 128; for(let i = 0; i < nd; i++) g += fkBeast("buss", xs + bw * (i + 0.5), by, sc);
        if(nb % 1 > 1e-6) ghost = `<g style="opacity:.18">${fkBeast("buss", xs + bw * (nd - 0.5), by, sc)}</g>`;
        const id = "dvb" + (++dvkUid); s += ghost + `<clipPath id="${id}"><rect x="${xs - 2}" y="${by - 40}" width="${(d * k + 2).toFixed(1)}" height="42"/></clipPath><g clip-path="url(#${id})">${g}</g>`;
        if(pitch) s += `<g transform="translate(${(xs + 105 * k / 2).toFixed(1)} 168) scale(${k.toFixed(3)} 1)">${fkBeast("fotballbane", 0, 0, 1).replace(/^<g transform="[^"]*">/, "<g>")}</g>`;
        if(!pitch) s += fgT(xs, by + 16, T("én bybuss = 12 m", "one city bus = 12 m"), "fg-s", "start");
      }
      if(pitch) s += `<rect x="${xs}" y="170" width="${(d * k).toFixed(1)}" height="5" rx="2" style="fill:#D1453B"/>` + fgT(312, 124, "≈ " + smR(nf, 1) + " " + (Math.round(nf * 10) === 10 ? T("fotballbane", "football pitch") : T("fotballbaner", "football pitches")), "fg-s fg-redt", "end");
      return { m: { d }, eq: [qt`s = ${qc(1, qn(ms, 1))}\,\mathrm{m/s}\cdot ${qc(2, qn(v.t, 1))}\,\mathrm{s} = ${qr(d, 0)}\,\mathrm{m}`],
        out: [[T("uten å se på vegen", "without looking at the road"), smN(d, 0) + " m"], [T("busslengder", "bus lengths"), smR(nb)], ...(pitch ? [[T("fotballbaner", "football pitches"), smR(nf, 1)]] : [])], svg: s }; } },
  dvsving: { t: ["Fart i sving og veggrep", "Speed in a bend and grip"],
    a: ["Antatt: flat sving og veggrep som gir 7, 5, 2,5 og 1 m/s² sideveis (tørt, vått, snø, is). Dårlige dekk gir mindre.", "Assumed: a flat bend and grip giving 7, 5, 2.5 and 1 m/s² sideways (dry, wet, snow, ice). Worn tyres give less."],
    p: [["r", ["svingradius", "bend radius"], 20, 200, 10, 60, "m", 1], ["f", ["føre", "road surface"], 1, 4, 1, 4, "", 2, FK_STEPS], ["v", ["din fart", "your speed"], 20, 120, 5, 60, "km/t", 3]],
    q: ["Hvorfor må du senke farten mye mer i en krapp sving på glatt føre?", "Why must you slow down much more in a tight bend on a slippery road?"],
    g: [["Radius 60 m på tørr asfalt: finn den høyeste farten (i trinn på 5) som holder.", "Radius 60 m on dry tarmac: find the highest speed (in steps of 5) that holds.", v => v.r === 60 && v.f === 4 && v.v === 70],
        ["Samme sving på snø: still inn den høyeste farten som holder.", "The same bend on snow: set the highest speed that holds.", v => v.r === 60 && v.f === 2 && v.v === 40]],
    f: v => { const a = fkA(v.f), vmax = Math.sqrt(a * v.r) * 3.6, ok = v.v <= vmax + 1e-9, R = 40 + v.r * 0.55, cx = 30, cy = 170 + 0;
      let s = `<path d="M${cx} ${cy - R}A${R} ${R} 0 0 1 ${cx + R} ${cy}" style="fill:none;stroke:${FK_ROAD[v.f - 1]};stroke-width:34"/>${v.f === 1 ? `<path d="M${cx} ${cy - R + 9}A${R - 9} ${R - 9} 0 0 1 ${cx + R - 9} ${cy}" style="fill:none;stroke:#fff;stroke-width:2.5;opacity:.7;stroke-dasharray:14 22"/>` : v.f === 2 ? Array.from({ length: 14 }, (_, i) => `<circle cx="${(i * 47) % 300 + 12}" cy="${(i * 29) % 150 + 12}" r="${1.8 + (i % 3) * 0.7}" style="fill:#fff;stroke:#9FB0BF;stroke-width:.5"/>`).join("") : v.f === 3 ? `<path d="M${cx} ${cy - R - 8}A${R + 8} ${R + 8} 0 0 1 ${cx + R + 8} ${cy}" style="fill:none;stroke:#7FA7D1;stroke-width:4;opacity:.5;stroke-dasharray:18 26"/>` : ""}<path d="M${cx} ${cy - R}A${R} ${R} 0 0 1 ${cx + R} ${cy}" style="fill:none;stroke:#F4F4F4;stroke-width:1.4;stroke-dasharray:8 7"/>`;
      const ang = 0.55 * Math.PI / 2, px = cx + R * Math.sin(ang), py = cy - R * Math.cos(ang);
      s += ok ? `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(ang * 180 / Math.PI).toFixed(1)})">${smCar(0, 0)}</g>` : `<path d="M${px.toFixed(1)} ${py.toFixed(1)}l${(40 * Math.cos(ang)).toFixed(1)} ${(40 * Math.sin(ang) * -0.2).toFixed(1)}" style="stroke:#D23F3A;stroke-width:2;stroke-dasharray:4 3"/><g transform="translate(${(px + 40 * Math.cos(ang)).toFixed(1)} ${(py - 8).toFixed(1)}) rotate(${(ang * 180 / Math.PI - 30).toFixed(1)})">${smCar(0, 0, "#D23F3A")}</g>`;
      s += fgT(306, 40, ok ? T("Bilen holder vegen", "The car holds the road") : T("Bilen sklir ut!", "The car slides off!"), ok ? "fg-t fg-okt" : "fg-t fg-redt", "end") + fgT(306, 60, T("maks", "max") + " " + smN(vmax, 0) + " km/t", "fg-s", "end");
      return { m: { vmax }, eq: [qt`v_{\max} = \sqrt{${qc(2, qn(a, 1))}\cdot ${qc(1, v.r)}} = ${qr(vmax / 3.6, 1)}\,\mathrm{m/s} = ${qr(vmax, 0)}\,\mathrm{km/t}`],
        out: [[T("høyeste fart", "max speed"), smN(vmax, 0) + " km/t"], [T("din fart", "your speed"), v.v + " km/t"], [T("føre", "surface"), fkFore(5 - v.f)]], svg: s }; } },
  dvkrasj: { t: ["Hvor tung blir du i et krasj?", "How heavy do you get in a crash?"],
    a: ["Antatt: med belte bremses kroppen over ca. 40 cm (beltet og knusesonen), uten belte ca. 10 cm mot ratt eller rute. Tallene er gjennomsnitt, toppene er høyere. Ku 600 kg, bil 1 500 kg, elefant 5 000 kg.", "Assumed: with a belt the body stops over about 40 cm (belt and crumple zone), without one about 10 cm against wheel or windscreen. Numbers are averages, peaks are higher. Cow 600 kg, car 1,500 kg, elephant 5,000 kg."],
    p: [["v", ["fart", "speed"], 10, 110, 10, 30, "km/t", 1], ["m", ["kroppsvekt", "body weight"], 10, 120, 5, 75, "kg", 2], ["b", ["belte", "seat belt"], 1, 2, 1, 1, "", 3, [["med belte", "belt on", "✅", "#1E9A5E"], ["uten belte", "no belt", "⚠️", "#D9483B"]]]],
    q: ["Grov modell: med belte bremses kroppen over omtrent 40 cm (beltet og knusesonen), uten belte bare omtrent 10 cm mot rattet, dashbordet eller ruta. Tallene er et gjennomsnitt, toppene er enda høyere.", "Rough model: with a belt the body stops over about 40 cm (belt and crumple zone), without one only about 10 cm against the wheel, dashboard or windscreen. The numbers are an average, the peaks are even higher."],
    g: [["Med belte og 75 kg: finn den laveste farten der kroppen veier mer enn en elefant (5 tonn).", "With a belt and 75 kg: find the lowest speed where your body weighs more than an elephant (5 tonnes).", v => v.m === 75 && v.b === 1 && v.v === 90],
        ["Samme person uten belte: hvor lav fart skal til før du veier mer enn en elefant?", "Same person without a belt: how low a speed is enough to weigh more than an elephant?", v => v.m === 75 && v.b === 2 && v.v === 50],
        ["Et barn på 20 kg sitter på fanget uten sikring i 50 km/t. Still det inn og se hva den voksne måtte holdt igjen.", "A 20 kg child sits on a lap without restraint at 50 km/h. Set it up and see what the adult would have to hold back.", v => v.m === 20 && v.b === 2 && v.v === 50]],
    f: v => { const ms = v.v / 3.6, d = v.b === 1 ? 0.4 : 0.1, gf = ms * ms / (2 * d * 9.81), W = v.m * gf;
      const kind = W >= 5000 ? "elefant" : W >= 1500 ? "bil" : W >= 600 ? "ku" : "person", B = typeof FK_BEAST !== "undefined" ? FK_BEAST[kind] : { kg: { elefant: 5000, bil: 1500, ku: 600, person: 75 }[kind], w: 90, h: 60 };
      const n = W / B.kg, nd = Math.min(12, Math.max(1, Math.ceil(n - 1e-9))), rows = nd > 6 ? 2 : 1, cols = Math.ceil(nd / rows), sc = Math.min(1.6, 300 / (cols * B.w * 1.08), (rows === 2 ? 50 : 108) / B.h), gap = (300 - cols * B.w * sc) / (cols + 1);
      const NM = { elefant: ["elefant", "elefanter", "elephant", "elephants"], bil: ["bil", "biler", "car", "cars"], ku: ["ku", "kyr", "cow", "cows"], person: ["voksen person", "voksne personer", "adult", "adults"] }[kind];
      const nr = Math.round(n * 10) / 10, nm = nr === 1 ? T(NM[0], NM[2]) : T(NM[1], NM[3]);
      const one = (x, op, by) => typeof fkBeast === "function" ? fkBeast(kind, x, by, sc) : `<rect x="${(x - B.w * sc / 2).toFixed(1)}" y="${(by - B.h * sc).toFixed(1)}" width="${(B.w * sc).toFixed(1)}" height="${(B.h * sc).toFixed(1)}" rx="6" style="fill:#8E969F;opacity:${op}"/>`;
      let s = "";
      for(let i = 0; i < nd; i++){ const r = rows === 2 && i >= cols ? 1 : 0, j = i - r * cols, by = rows === 2 ? (r ? 172 : 116) : 172, x0 = 10 + gap * (j + 1) + B.w * sc * j, cx = x0 + B.w * sc / 2 + (kind === "elefant" ? -2 * sc : 0), fr = Math.min(1, n - i);
        if(fr >= 0.999 || n > 12) s += one(cx, 1, by);
        else { const id = "dvk" + (++dvkUid); s += `<g style="opacity:.18">${one(cx, 1, by)}</g><clipPath id="${id}"><rect x="${(x0 - 4).toFixed(1)}" y="${by - 120}" width="${(B.w * sc * fr + 4).toFixed(1)}" height="124"/></clipPath><g clip-path="url(#${id})">${one(cx, 1, by)}</g>`; } }
      const big = (x, y, txt, col, an) => `<text x="${x}" y="${y}" class="fg-big" text-anchor="${an}" style="font-size:22px;fill:var(${col})">${txt}</text>`;
      s += fgT(10, 16, T("Du veier", "You weigh") + " " + v.m + " kg, " + T("i krasjet", "in the crash"), "fg-s", "start") + big(10, 42, (W >= 10000 ? smN(W / 1000, 1) + " " + T("tonn", "t") : smN(W, 0) + " kg"), "--bad", "start");
      s += fgT(310, 16, T("like tungt som", "as heavy as"), "fg-s", "end") + big(310, 42, "≈ " + smN(nr, 1) + " " + nm, "--accent", "end");
      return { m: { W, gf }, eq: [qt`W = \frac{${qc(2, v.m)}\cdot ${qc(1, qn(ms, 1))}^2}{2\cdot ${qc(3, qn(d, 1))}\cdot 9{,}81} = ${qr(W, 0)}\,\mathrm{kg}`],
        out: [[T("ganger tyngre", "times heavier"), smN(gf, gf < 10 ? 1 : 0) + " ×"], [T("tilsvarer", "equals"), smN(W, 0) + " kg"], [T("belte", "belt"), v.b === 1 ? T("ja", "yes") : T("nei", "no")]], svg: s }; } },
  dvfall: { t: ["Krasj eller fall fra høyden?", "Crash or fall from a height?"],
    a: ["Antatt: fritt fall uten luftmotstand, h = v²/(2g). En etasje regnes som 3 m, stupetårnet er 10 m.", "Assumed: free fall without air resistance, h = v²/(2g). One storey counts as 3 m, the diving tower is 10 m."],
    p: [["v", ["fart i krasjet", "speed in the crash"], 10, 110, 10, 30, "km/t", 1]],
    g: [["Finn farten der et krasj er like hardt som å falle fra 10-meteren i stupetårnet.", "Find the speed where a crash is as hard as falling from the 10 m diving platform.", v => v.v === 50],
        ["Hvilken fart tilsvarer et fall fra 8. etasje (ca. 24 m)?", "Which speed equals a fall from the 8th floor (about 24 m)?", v => v.v === 80]],
    f: v => { const ms = v.v / 3.6, h = ms * ms / (2 * 9.81), g0 = 172, k = 104 / Math.max(12, h * 1.12), Y = m => g0 - m * k, fl = Math.max(1, Math.ceil(h / 3 - 1e-9));
      let s = fgT(8, 14, T("Å krasje i", "Crashing at") + " " + v.v + " km/t " + T("er som å falle fra", "is like falling from"), "fg-s", "start") + smBig(8, 40, smR(h) + " m", "--bad", "start");
      s += fgT(312, 14, T("det er", "that is"), "fg-s", "end") + smBig(312, 40, smEtg(h), "--accent", "end");
      s += `<line x1="0" y1="${g0}" x2="320" y2="${g0}" style="stroke:#7A8590;stroke-width:1.5"/>`;
      const bx = 150, bw = 70; // boligblokk
      s += `<rect x="${bx}" y="${Y(fl * 3).toFixed(1)}" width="${bw}" height="${(fl * 3 * k).toFixed(1)}" style="fill:#C9B79C;stroke:rgba(0,0,0,.3)"/>`;
      for(let f = 0; f < fl; f++) for(let w = 0; w < 4; w++) s += `<rect x="${bx + 7 + w * 16}" y="${(Y(f * 3 + 2.4)).toFixed(1)}" width="9" height="${(1.4 * k).toFixed(1)}" style="fill:#5F7FA6"/>`;
      s += `<rect x="${bx - 2}" y="${(Y(fl * 3) - 2).toFixed(1)}" width="${bw + 4}" height="2.5" style="fill:#8B7B66"/>`;
      // stupetårn 10 m med plattformer på 1, 3, 5, 7,5 og 10 m
      const tx = 268; s += `<rect x="${tx - 3}" y="${Y(10)}" width="6" height="${10 * k}" style="fill:#9AA3AC"/>`;
      [[1, 12], [3, 14], [5, 16], [7.5, 18], [10, 22]].forEach(([m, w]) => { s += `<rect x="${tx - 4}" y="${(Y(m) - 1.2).toFixed(1)}" width="${w}" height="2.4" style="fill:#2B6FD6"/>`; });
      s += `<rect x="${tx - 30}" y="${g0 - 4}" width="76" height="4" style="fill:#5DADE2"/>` + fgT(tx + 4, Y(10) - 6, T("10-meteren", "10 m tower"), "fg-s", "middle");
      // høyden h
      const yh = Y(h); s += `<line x1="24" y1="${yh.toFixed(1)}" x2="300" y2="${yh.toFixed(1)}" style="stroke:#D1453B;stroke-width:1.6;stroke-dasharray:5 4"/>`;
      s += `<path d="M30 ${yh.toFixed(1)}V${g0}" style="stroke:#D1453B;stroke-width:2"/><path d="M26 ${g0 - 6}L30 ${g0}L34 ${g0 - 6}" style="fill:none;stroke:#D1453B;stroke-width:2"/>` + (typeof fkBeast === "function" ? fkBeast("bil", 100, g0, 1.5 * k / 36) + fkBeast("person", 128, g0, 1.8 * k / 60) : "");
      s += fgT(36, Math.max(58, yh - 5), smR(h) + " m", "fg-s fg-redt", "start");
      return { m: { h }, eq: [qt`h = \frac{${qc(1, qn(ms, 1))}^2}{2\cdot 9{,}81} = ${qr(h, 1)}\,\mathrm{m}`],
        out: [[T("fallhøyde", "fall height"), smR(h) + " m"], [T("etasjer", "storeys"), smR(h / 3)], [T("× 10-meteren", "× 10 m tower"), smR(h / 10)]], svg: s }; } },
  dvtreff: { t: ["Hvor fort treffer du?", "How fast do you hit?"],
    a: ["Antatt: 1 s reaksjonstid og tørr asfalt (bremser med 7 m/s²). Fallhøyden er h = v²/(2g), en etasje 3 m.", "Assumed: 1 s reaction time and dry tarmac (braking at 7 m/s²). The fall height is h = v²/(2g), one storey 3 m."],
    p: [["v", ["fart", "speed"], 30, 110, 10, 50, "km/t", 1], ["D", ["avstand til barnet", "distance to the child"], 10, 60, 2, 30, "m", 2]],
    g: [["Et barn løper ut 20 m foran deg. Finn den høyeste farten der du rekker å stoppe.", "A child runs out 20 m ahead. Find the highest speed where you manage to stop.", v => v.D === 20 && v.v === 40],
        ["Samme barn, men du kjører 60 km/t. Still det inn og se hvor fort du treffer.", "Same child, but you drive at 60 km/h. Set it up and see how fast you hit.", v => v.D === 20 && v.v === 60],
        ["I 30 km/t: finn den korteste avstanden der du fortsatt rekker å stoppe.", "At 30 km/h: find the shortest distance where you still manage to stop.", v => v.v === 30 && v.D === 14]],
    f: v => { const ms = v.v / 3.6, a = 7, sr = ms, st = sr + ms * ms / (2 * a), hit = st > v.D, vi = !hit ? 0 : v.D <= sr ? ms : Math.sqrt(Math.max(0, ms * ms - 2 * a * (v.D - sr))), h = vi * vi / (2 * 9.81);
      const x0 = 24, k = 270 / 100, X = m => x0 + m * k;
      let s = "";
      if(hit){ s += fgT(8, 14, T("Du treffer barnet i", "You hit the child at"), "fg-s", "start") + smBig(8, 40, smN(vi * 3.6, 0) + " km/t", "--bad", "start");
        s += fgT(312, 14, T("som et fall fra", "like a fall from"), "fg-s", "end") + smBig(312, 40, smR(h) + " m", "--accent", "end") + fgT(312, 56, smEtg(h), "fg-s", "end"); }
      else { s += fgT(8, 14, T("Du stopper", "You stop"), "fg-s", "start") + smBig(8, 40, smR(v.D - st) + " m " + T("før", "short"), "--ok", "start") + fgT(312, 14, T("stopplengde", "stopping distance"), "fg-s", "end") + smBig(312, 40, smR(st) + " m", "--accent", "end"); }
      s += smRoad(70, 46) + smCar(x0 - 13, 104) + smKid(X(v.D), 90);
      const xe = X(Math.min(st, 106)); s += smCar(Math.min(310, (hit ? X(v.D) : xe) - 13), 104, hit ? "rgba(210,63,58,.75)" : "rgba(43,89,195,.45)");
      s += `<rect x="${x0}" y="124" width="${(sr * k).toFixed(1)}" height="7" rx="2" style="fill:#2B6FD6"/><rect x="${X(sr).toFixed(1)}" y="124" width="${Math.max(0, Math.min(306, xe) - X(sr)).toFixed(1)}" height="7" rx="2" style="fill:#D1453B"/>`;
      s += `<line x1="${X(v.D).toFixed(1)}" y1="64" x2="${X(v.D).toFixed(1)}" y2="140" style="stroke:#E9A100;stroke-width:1.6;stroke-dasharray:3 3"/>` + fgT(X(v.D), 152, v.D + " m", "fg-s");
      s += fgT(x0, 172, T("reaksjon", "reaction") + " " + smN(sr, 1) + " m", "fg-s", "start") + fgT(312, 172, T("bremsing", "braking") + " " + smN(st - sr, 1) + " m", "fg-s fg-redt", "end");
      return { m: { vi, st }, eq: [qt`v_{\text{${T("treff", "hit")}}} = \sqrt{${qc(1, qn(ms, 1))}^2 - 2\cdot 7\cdot(${qc(2, v.D)} - ${qn(sr, 1)})} = ${hit ? qr(vi, 1) : qr(0, 0)}\,\mathrm{m/s}`],
        out: [[T("stopplengde", "stopping distance"), smN(st, 1) + " m"], [T("treffart", "impact speed"), hit ? smN(vi * 3.6, 0) + " km/t" : T("stopper", "stops")]], svg: s }; } },
  dvforbi: { t: ["Forbikjøring av vogntog", "Overtaking a lorry"],
    a: ["Antatt: vogntog 18,75 m, bil 4,5 m, 20 m luke før og etter, jevn fart uten akselerasjon. Fri sikt = det du kjører + det møtende bil kjører. Fotballbane 105 m.", "Assumed: lorry 18.75 m, car 4.5 m, 20 m gap before and after, steady speed without accelerating. Clear view = what you drive + what the oncoming car drives. Football pitch 105 m."],
    p: [["v", ["din fart", "your speed"], 80, 110, 5, 100, "km/t", 1], ["u", ["vogntogets fart", "lorry speed"], 60, 90, 5, 80, "km/t", 2], ["m", ["møtende bil", "oncoming car"], 60, 110, 10, 80, "km/t", 3]],
    g: [["Vogntoget kjører 80, du 90 og møtende bil 80. Hvor mange fotballbaner fri sikt trenger du?", "The lorry does 80, you 90 and the oncoming car 80. How many football pitches of clear view do you need?", v => v.v === 90 && v.u === 80 && v.m === 80],
        ["Vogntoget kjører 70 og møtende bil 80. Hvor fort må du kjøre for å klare deg med under 4 fotballbaner (420 m)? Fartsgrensen er 100.", "The lorry does 70 and the oncoming car 80. How fast must you go to manage with under 4 football pitches (420 m)? The limit is 100.", (v, m) => v.u === 70 && v.m === 80 && v.v <= 100 && m.S < 420]],
    f: v => { const L = 20 + 18.75 + 4.5 + 20, dv = (v.v - v.u) / 3.6, ok = dv > 0, t = ok ? L / dv : Infinity, s1 = ok ? v.v / 3.6 * t : 0, s2 = ok ? v.m / 3.6 * t : 0, S = s1 + s2;
      let s = "";
      if(!ok){ s += fgT(160, 90, T("Du tar ikke igjen vogntoget!", "You never catch the lorry!"), "fg-t fg-redt") + fgT(160, 110, T("Din fart må være høyere enn vogntogets.", "Your speed must be higher than the lorry's."), "fg-s");
        return { m: { S: Infinity }, eq: [qt`\Delta v \le 0`], out: [[T("fri sikt", "clear view"), "–"]], svg: s }; }
      s += fgT(8, 14, T("Forbikjøringen tar", "The overtake takes") + " " + smN(t, 1) + " s. " + T("Fri sikt:", "Clear view:"), "fg-s", "start") + smBig(8, 40, (S >= 1000 ? smR(S / 1000, 2) + " km" : smN(S, 0) + " m"), "--bad", "start");
      s += fgT(312, 14, T("like langt som", "as far as"), "fg-s", "end") + smBig(312, 40, "≈ " + smR(S / 105) + " " + T("fotballbaner", "pitches"), "--accent", "end");
      s += smIcons("fotballbane", S / 105, 172, 104);
      return { m: { S, t }, eq: [qt`t = \frac{${qn(L, 1)}}{(${qc(1, v.v)} - ${qc(2, v.u)})/3{,}6} = ${qr(t, 1)}\,\mathrm{s}`, qt`S = \frac{(${qc(1, v.v)} + ${qc(3, v.m)})\cdot ${qn(t, 1)}}{3{,}6} = ${qr(S, 0)}\,\mathrm{m}`],
        out: [[T("tid", "time"), smN(t, 1) + " s"], [T("du kjører", "you drive"), smN(s1, 0) + " m"], [T("fri sikt", "clear view"), smN(S, 0) + " m"]], svg: s }; } },
});
Object.assign(SIM_MAP, { "FKB:2": ["dvstopp", "dvtreff", "dvavstand", "dvkrasj", "dvfall"], "FKB:3": "dvforbi", "FKB:7": ["dvkrasj", "dvfall"], "FKB:6": ["dvblind", "dvpromille"], "FKB:8": "dvsving", "FKMC:2": ["dvstopp", "dvtreff"], "FKMC:3": "dvsving" });
})();
