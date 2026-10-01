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
const FK_MU = [7, 5, 2.5, 1]; // retardasjon (m/s²): tørr asfalt, våt asfalt, snø, is
const fkFore = k => [T("tørr asfalt", "dry tarmac"), T("våt asfalt", "wet tarmac"), T("snø", "snow"), T("is", "ice")][k - 1];
// Bil sett ovenfra, front mot høyre, sentrert i (x, y)
const smCar = (x, y, col = "#2B59C3") => `<g transform="translate(${x.toFixed(1)} ${y})"><rect x="-13" y="-7" width="26" height="14" rx="4" style="fill:${col}"/><rect x="3" y="-5" width="6" height="10" rx="1.5" style="fill:rgba(220,240,255,.9)"/><rect x="11" y="-6" width="2.4" height="3.4" rx=".8" style="fill:#FFF3B0"/><rect x="11" y="2.6" width="2.4" height="3.4" rx=".8" style="fill:#FFF3B0"/><rect x="-13" y="-6" width="2" height="3" style="fill:#E0201B"/><rect x="-13" y="3" width="2" height="3" style="fill:#E0201B"/></g>`;
const smRoad = (y0 = 70, h = 46) => `<rect x="0" y="${y0}" width="320" height="${h}" style="fill:#5E656D"/><line x1="0" y1="${y0 + h / 2}" x2="320" y2="${y0 + h / 2}" style="stroke:#F4F4F4;stroke-width:1.6;stroke-dasharray:10 8"/>`;
const smKid = (x, y) => `<g transform="translate(${x.toFixed(1)} ${y})"><circle cy="-15" r="3.6" style="fill:#F1C7A1"/><path d="M0 -11L-1 -3M0 -9L-5 -5M0 -9L5 -6M-1 -3L-4 4M-1 -3L3 4" style="stroke:#E07A1F;stroke-width:3;stroke-linecap:round;fill:none"/></g>`;
Object.assign(SIMS, {
  dvstopp: { t: ["Stopplengde: fart, reaksjon og føre", "Stopping distance: speed, reaction and road surface"],
    p: [["v", ["fart", "speed"], 20, 120, 5, 50, "km/t", 1], ["tr", ["reaksjonstid", "reaction time"], 0.5, 2.5, 0.1, 1, "s", 2], ["f", ["føre (1 tørt – 4 is)", "surface (1 dry – 4 ice)"], 1, 4, 1, 1, "", 3]],
    q: ["Et barn løper ut 40 meter foran deg. Stopper du i tide?", "A child runs out 40 metres ahead. Do you stop in time?"],
    g: [["Tørr asfalt og 1 s reaksjonstid: finn den høyeste farten der du stopper før barnet (40 m).", "Dry tarmac and 1 s reaction time: find the highest speed where you stop before the child (40 m).", v => v.f === 1 && Math.abs(v.tr - 1) < 1e-9 && v.v === 60],
        ["Is og 1 s reaksjonstid: still inn den høyeste farten der du fortsatt stopper før barnet.", "Ice and 1 s reaction time: set the highest speed where you still stop before the child.", v => v.f === 4 && Math.abs(v.tr - 1) < 1e-9 && v.v === 25],
        ["Du er trøtt (2 s reaksjonstid) og kjører 50 km/t på tørr asfalt. Rekker du å stoppe?", "You are tired (2 s reaction time) and drive at 50 km/h on dry tarmac. Can you stop in time?", v => v.f === 1 && Math.abs(v.tr - 2) < 1e-9 && v.v === 50]],
    f: v => { const ms = v.v / 3.6, a = FK_MU[v.f - 1], sr = ms * v.tr, sb = ms * ms / (2 * a), st = sr + sb, ok = st <= 40, k = 2.4, x0 = 16;
      let s = smRoad(70, 46) + `<rect x="${x0}" y="128" width="${(sr * k).toFixed(1)}" height="9" rx="2" style="fill:#2B6FD6"/><rect x="${(x0 + sr * k).toFixed(1)}" y="128" width="${(sb * k).toFixed(1)}" height="9" rx="2" style="fill:#D1453B"/>`;
      s += `<line x1="${x0 + 40 * k}" y1="62" x2="${x0 + 40 * k}" y2="142" style="stroke:#E9A100;stroke-width:1.5;stroke-dasharray:3 3"/>` + smKid(x0 + 40 * k + 4, 88) + fgT(x0 + 40 * k, 56, "40 m", "fg-s");
      s += smCar(Math.min(316, x0 + st * k) - 13, 104, ok ? "#2B59C3" : "#D23F3A") + smCar(x0 + 13, 82, "rgba(43,89,195,.35)");
      s += fgT(x0, 160, T("reaksjon", "reaction") + " " + smN(sr, 0) + " m", "fg-s", "start") + fgT(x0 + sr * k + 4, 172, T("bremsing", "braking") + " " + smN(sb, 0) + " m", "fg-s fg-redt", "start");
      s += fgT(306, 30, ok ? T("Stopper før barnet", "Stops before the child") : T("Treffer barnet!", "Hits the child!"), ok ? "fg-t fg-okt" : "fg-t fg-redt", "end");
      return { m: { st }, eq: [qt`s = ${qc(1, qn(ms, 1))}\cdot ${qc(2, qn(v.tr, 1))} + \frac{${qc(1, qn(ms, 1))}^2}{2\cdot ${qc(3, qn(a, 1))}} = ${qr(st, 0)}\,\mathrm{m}`],
        out: [[T("fart", "speed"), smN(ms, 1) + " m/s"], [T("føre", "surface"), fkFore(v.f)], [T("stopplengde", "stopping distance"), smN(st, 0) + " m"]], svg: s }; } },
  dvavstand: { t: ["Avstand til bilen foran", "Distance to the car in front"],
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
    p: [["e", ["alkoholenheter", "alcohol units"], 1, 10, 1, 4, "", 1], ["kg", ["vekt", "weight"], 50, 110, 5, 70, "kg", 2], ["r", ["kropp (1 kvinne, 2 mann)", "body (1 female, 2 male)"], 1, 2, 1, 2, "", 3], ["h", ["timer etter", "hours later"], 0, 16, 1, 0, "t", 4]],
    q: ["Dette er en grov formel. Bruk den aldri til å regne ut om du kan kjøre: er du i tvil, kjører du ikke.", "This is a rough formula. Never use it to work out whether you can drive: if in doubt, do not drive."],
    g: [["4 enheter, 70 kg, mann: finn første hele time der promillen er under 0,2.", "4 units, 70 kg, male: find the first whole hour where the level is below 0.2.", v => v.e === 4 && v.kg === 70 && v.r === 2 && v.h === 8],
        ["Samme mengde, men 55 kg kvinne: hvor mange timer tar det nå?", "Same amount, but a 55 kg female: how many hours does it take now?", v => v.e === 4 && v.kg === 55 && v.r === 1 && v.h === 11]],
    f: v => { const rr = v.r === 2 ? 0.7 : 0.6, peak = v.e * 12 / (v.kg * rr), pr = h => Math.max(0, peak - 0.15 * h), now = pr(v.h), sober = peak / 0.15, under = Math.max(0, (peak - 0.2) / 0.15);
      const g = smPlot([[pr, "fg-acc", 2.6], [() => 0.2, "fg-red", 1.4]], [0, 16], [0, Math.max(1, peak * 1.1)], T("timer", "hours"), "‰", (X, Y) => smDot(X(v.h), Y(now)) + fgT(X(16) - 2, Y(0.2) - 5, T("grensen 0,2", "limit 0.2"), "fg-s fg-redt", "end"));
      return { m: { now }, eq: [qt`${T("\\text{promille}", "\\text{level}")} \approx \frac{${qc(1, v.e)}\cdot 12}{${qc(2, v.kg)}\cdot ${qc(3, qn(rr, 1))}} - 0{,}15\cdot ${qc(4, v.h)} = ${qr(now, 2)}`],
        out: [[T("promille nå", "level now"), smN(now, 2) + " ‰"], [T("under 0,2 etter", "below 0.2 after"), smN(under, 1) + " " + T("t", "h")], [T("edru etter", "sober after"), smN(sober, 1) + " " + T("t", "h")]], svg: g.svg }; } },
  dvblind: { t: ["Kjørt i blinde", "Driving blind"],
    p: [["v", ["fart", "speed"], 30, 110, 10, 50, "km/t", 1], ["t", ["sekunder blikket er borte", "seconds looking away"], 0.5, 4, 0.5, 1, "s", 2]],
    q: ["Hvor langt kjører du uten å se vegen når du ser på mobilen, eller sovner et øyeblikk?", "How far do you drive without seeing the road when you look at your phone, or doze off for a moment?"],
    g: [["Finn hvor langt du kjører på 2 sekunder i 80 km/t.", "Find how far you travel in 2 seconds at 80 km/h.", v => v.v === 80 && v.t === 2],
        ["Mikrosøvn: 3 sekunder i 90 km/t. Hvor langt blir det?", "Microsleep: 3 seconds at 90 km/h. How far is that?", v => v.v === 90 && v.t === 3]],
    f: v => { const ms = v.v / 3.6, d = ms * v.t, k = 280 / 125, x0 = 20;
      let s = smRoad(70, 46) + smCar(x0, 104) + smCar(Math.min(306, x0 + d * k), 104, "rgba(43,89,195,.45)") + `<rect x="${x0}" y="126" width="${(d * k).toFixed(1)}" height="8" rx="2" style="fill:#D1453B"/>`;
      for(let m = 0; m <= 120; m += 20) s += `<line x1="${x0 + m * k}" y1="118" x2="${x0 + m * k}" y2="122" style="stroke:#9AA3AC;stroke-width:1.2"/>` + fgT(x0 + m * k, 156, m + " m", "fg-s");
      s += fgT(x0 + d * k / 2, 50, smN(d, 0) + " m " + T("i blinde", "blind"), "fg-t fg-redt");
      return { m: { d }, eq: [qt`s = ${qc(1, qn(ms, 1))}\,\mathrm{m/s}\cdot ${qc(2, qn(v.t, 1))}\,\mathrm{s} = ${qr(d, 0)}\,\mathrm{m}`], out: [[T("fart", "speed"), smN(ms, 1) + " m/s"], [T("i blinde", "blind"), smN(d, 0) + " m"]], svg: s }; } },
  dvsving: { t: ["Fart i sving og veggrep", "Speed in a bend and grip"],
    p: [["r", ["svingradius", "bend radius"], 20, 200, 10, 60, "m", 1], ["f", ["føre (1 tørt – 4 is)", "surface (1 dry – 4 ice)"], 1, 4, 1, 1, "", 2], ["v", ["din fart", "your speed"], 20, 120, 5, 60, "km/t", 3]],
    q: ["Hvorfor må du senke farten mye mer i en krapp sving på glatt føre?", "Why must you slow down much more in a tight bend on a slippery road?"],
    g: [["Radius 60 m på tørr asfalt: finn den høyeste farten (i trinn på 5) som holder.", "Radius 60 m on dry tarmac: find the highest speed (in steps of 5) that holds.", v => v.r === 60 && v.f === 1 && v.v === 70],
        ["Samme sving på snø: still inn den høyeste farten som holder.", "The same bend on snow: set the highest speed that holds.", v => v.r === 60 && v.f === 3 && v.v === 40]],
    f: v => { const a = FK_MU[v.f - 1], vmax = Math.sqrt(a * v.r) * 3.6, ok = v.v <= vmax + 1e-9, R = 40 + v.r * 0.55, cx = 30, cy = 170 + 0;
      let s = `<path d="M${cx} ${cy - R}A${R} ${R} 0 0 1 ${cx + R} ${cy}" style="fill:none;stroke:#5E656D;stroke-width:34"/><path d="M${cx} ${cy - R}A${R} ${R} 0 0 1 ${cx + R} ${cy}" style="fill:none;stroke:#F4F4F4;stroke-width:1.4;stroke-dasharray:8 7"/>`;
      const ang = 0.55 * Math.PI / 2, px = cx + R * Math.sin(ang), py = cy - R * Math.cos(ang);
      s += ok ? `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(ang * 180 / Math.PI).toFixed(1)})">${smCar(0, 0)}</g>` : `<path d="M${px.toFixed(1)} ${py.toFixed(1)}l${(40 * Math.cos(ang)).toFixed(1)} ${(40 * Math.sin(ang) * -0.2).toFixed(1)}" style="stroke:#D23F3A;stroke-width:2;stroke-dasharray:4 3"/><g transform="translate(${(px + 40 * Math.cos(ang)).toFixed(1)} ${(py - 8).toFixed(1)}) rotate(${(ang * 180 / Math.PI - 30).toFixed(1)})">${smCar(0, 0, "#D23F3A")}</g>`;
      s += fgT(306, 40, ok ? T("Bilen holder vegen", "The car holds the road") : T("Bilen sklir ut!", "The car slides off!"), ok ? "fg-t fg-okt" : "fg-t fg-redt", "end") + fgT(306, 60, T("maks", "max") + " " + smN(vmax, 0) + " km/t", "fg-s", "end");
      return { m: { vmax }, eq: [qt`v_{\max} = \sqrt{${qc(2, qn(a, 1))}\cdot ${qc(1, v.r)}} = ${qr(vmax / 3.6, 1)}\,\mathrm{m/s} = ${qr(vmax, 0)}\,\mathrm{km/t}`],
        out: [[T("høyeste fart", "max speed"), smN(vmax, 0) + " km/t"], [T("din fart", "your speed"), v.v + " km/t"], [T("føre", "surface"), fkFore(v.f)]], svg: s }; } },
});
Object.assign(SIM_MAP, { "FKB:2": ["dvstopp", "dvavstand"], "FKB:6": ["dvblind", "dvpromille"], "FKB:8": "dvsving", "FKMC:2": "dvstopp", "FKMC:3": "dvsving" });
})();
