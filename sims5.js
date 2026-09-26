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
