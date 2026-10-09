// ============================================================
//  FIGURER TIL GRUNNSKOLEN (barneskole og ungdomsskole, matte og naturfag).
//  Enkle, fargerike tegninger som viser ideen før formelen: pizza-brøk, plassverdi-klosser, klokke, tallinje …
//  Samme format som figures.js (viewBox 320 × 180). Kobles til enhetene via tittel i FG nederst.
// ============================================================
// Klokkeslett med ord: [norsk, engelsk]. 3:30 = «halv fire» / "half past three". Brukes av klokkefigurene og «Lær først».
function clockWords(h, m){
  const NB = ["tolv", "ett", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni", "ti", "elleve", "tolv"], EN = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  const MIN = { 5: "five", 10: "ten", 20: "twenty", 25: "twenty-five" }, H = ((h % 12) + 12) % 12, N = (H + 1) % 12, n = NB[H || 12], nn = NB[N || 12], e = EN[H || 12], en = EN[N || 12];
  const nb = { 0: `klokka ${n}`, 5: `fem over ${n}`, 10: `ti over ${n}`, 15: `kvart over ${n}`, 20: `ti på halv ${nn}`, 25: `fem på halv ${nn}`, 30: `halv ${nn}`,
    35: `fem over halv ${nn}`, 40: `ti over halv ${nn}`, 45: `kvart på ${nn}`, 50: `ti på ${nn}`, 55: `fem på ${nn}` }[m];
  const eng = m === 0 ? `${e} o'clock` : m === 15 ? `quarter past ${e}` : m === 30 ? `half past ${e}` : m === 45 ? `quarter to ${en}` : m < 30 ? `${MIN[m]} past ${e}` : `${MIN[60 - m]} to ${en}`;
  return [nb || `${H || 12}:${String(m).padStart(2, "0")}`, eng];
}
(() => {
const soft = (n, p = 26) => `fill:color-mix(in srgb,var(--c${n}) ${p}%,var(--card));stroke:var(--c${n});stroke-width:1.6`;
const solid = (n, p = 70) => `fill:color-mix(in srgb,var(--c${n}) ${p}%,var(--card))`;
const box = (x, y, w, h, n, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="${soft(n)}"/>`;
const tx = (x, y, s, cls = "fg-t", a = "middle") => fgT(x, y, s, cls, a);
const col = (x, y, s, n, cls = "fg-b", a = "middle") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${a}" style="fill:var(--c${n})">${fgSub(s)}</text>`;
const ar = (x1, y1, x2, y2, cls = "fg-line", w = 1.8) => fgAr(x1, y1, x2, y2, cls, w);
const car = (x1, y1, x2, y2, n, w = 2) => `<g style="stroke:var(--c${n});fill:var(--c${n})">${fgAr(x1, y1, x2, y2, "", w).replace('<g class="">', "<g>")}</g>`;
const circ = (x, y, r, st) => `<circle cx="${x}" cy="${y}" r="${r}" style="${st}"/>`;
const f1 = v => +v.toFixed(1);
// Brøk skrevet med brøkstrek: teller over nevner
const frac = (x, y, a, b, n) => col(x, y, a, n, "fg-b") + `<line x1="${x - 9}" y1="${y + 5}" x2="${x + 9}" y2="${y + 5}" style="stroke:var(--c${n});stroke-width:2"/>` + col(x, y + 20, b, n, "fg-b");
// Kakestykke (sektor) fra vinkel a0 til a1 (grader, 0 = rett opp, med klokka)
const sector = (cx, cy, r, a0, a1, st) => { const p = a => [f1(cx + r * Math.sin(a * Math.PI / 180)), f1(cy - r * Math.cos(a * Math.PI / 180))], [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `<path d="M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z" style="${st}"/>`; };
// Pizza delt i n like biter, k av dem farget
const pizza = (cx, cy, r, n, k) => { let s = circ(cx, cy, r, `fill:var(--card);stroke:var(--ink);stroke-width:2`);
  for(let i = 0; i < k; i++) s += sector(cx, cy, r - 3, i * 360 / n, (i + 1) * 360 / n, solid(2, 75));
  for(let i = 0; i < n; i++){ const a = i * 360 / n * Math.PI / 180; s += `<line class="fg-line" x1="${cx}" y1="${cy}" x2="${f1(cx + r * Math.sin(a))}" y2="${f1(cy - r * Math.cos(a))}" stroke-width="1.6"/>`; }
  return s + circ(cx, cy, r, `fill:none;stroke:var(--c2);stroke-width:4`); };
// Tallinje med hopp (pil-buer) fra a, n hopp i retning d
const hops = (X, y, a, n, d, c) => { let s = ""; for(let i = 0; i < n; i++){ const x0 = X(a + i * d), x1 = X(a + (i + 1) * d), m = (x0 + x1) / 2;
  s += `<path d="M${x0} ${y - 2} Q${m} ${y - 26} ${x1} ${y - 3}" style="fill:none;stroke:var(--c${c});stroke-width:2"/>` + `<polygon points="${x1},${y - 2} ${x1 - 5 * d},${y - 10} ${x1 + 1.5 * d},${y - 10}" style="fill:var(--c${c})"/>`; } return s; };
// Tallinje med etiketter. Etiketter som ville overlappet naboen (f.eks. 884 og 885), legges på en rad lenger ned med en strek opp til tallet.
const numline = (y, from, to, X, labs, hl) => { let s = `<line class="fg-line" x1="${X(from) - 8}" y1="${y}" x2="${X(to) + 8}" y2="${y}"/>`;
  for(let n = from; n <= to; n++) s += `<line class="fg-line" x1="${X(n)}" y1="${y - (n % 5 ? 4 : 7)}" x2="${X(n)}" y2="${y + (n % 5 ? 4 : 7)}" stroke-width="${n % 5 ? 1.2 : 2}"/>`;
  const w = n => String(n).length * 7.4 + 6, end = [-1e9, -1e9]; // høyre kant av forrige etikett på rad 0 og rad 1
  [...labs].sort((p, q) => p - q).forEach(n => {
    const x = X(n), l = String(n).replace("-", "−"); let row = x - w(n) / 2 < end[0] + 2 ? 1 : 0; if(row && x - w(n) / 2 < end[1] + 2) return; // får ikke plass: hoppes over (skalatall)
    end[row] = x + w(n) / 2; const ly = y + 22 + row * 20;
    if(row) s += `<line x1="${x}" y1="${y + 9}" x2="${x}" y2="${ly - 12}" style="stroke:var(--muted);stroke-width:1"/>`;
    s += hl[n] ? col(x, ly, l, hl[n]) : tx(x, ly, l, "fg-s fg-tick"); }); return s; };
// Formeltrekant (s over v og t, U over R og I)
const tri = (top, bl, br) => `<polygon points="90,22 22,150 158,150" style="${soft(3, 14)}"/><line x1="51" y1="95" x2="129" y2="95" style="stroke:var(--c3);stroke-width:1.6"/><line x1="90" y1="95" x2="90" y2="150" style="stroke:var(--c3);stroke-width:1.6"/>` +
  tx(90, 82, top, "fg-big") + tx(62, 136, bl, "fg-big") + tx(118, 136, br, "fg-big");

Object.assign(FIGS, {
  // ---------- MATEMATIKK 1.–4. ----------
  // Plassverdi: tallet n (0–999) som hundrerplater, tierstenger og enerklosser. p = { n } (uten p: 347).
  gs_place: (p = {}) => { const n = Math.max(0, Math.min(999, Math.round(p.n ?? 347))), h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, e = n % 10; let s = "";
    const [cH, cT, cE] = n >= 100 ? [80, 222, 298] : [0, 120, 236];
    if(n >= 100){ const rows = Math.ceil(h / 3), sz = Math.min(44, (84 - (rows - 1) * 4) / rows), per = Math.min(3, h), W = per * sz + (per - 1) * 6, u = sz / 10;
      for(let k = 0; k < h; k++){ const inRow = Math.min(3, h - Math.floor(k / 3) * 3), Wr = inRow * sz + (inRow - 1) * 6, x0 = f1(cH - Wr / 2 + (k % 3) * (sz + 6)), y0 = f1(40 + Math.floor(k / 3) * (sz + 4)), S = f1(sz); // hver rad sentrert
        s += `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" style="${solid(3, 35)}"/>`;
        for(let i = 1; i < 10; i++) s += `<line x1="${f1(x0 + i * u)}" y1="${y0}" x2="${f1(x0 + i * u)}" y2="${f1(y0 + sz)}" style="stroke:var(--c3);stroke-width:.5"/><line x1="${x0}" y1="${f1(y0 + i * u)}" x2="${f1(x0 + sz)}" y2="${f1(y0 + i * u)}" style="stroke:var(--c3);stroke-width:.5"/>`;
        s += `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" style="fill:none;stroke:var(--c3);stroke-width:1.6"/>`; }
      s += tx(cH, 28, T("hundrere", "hundreds"), "fg-s") + (p.hide ? "" : col(cH, 150, String(h), 3, "fg-big")); }
    // tierstengene med like stor luft mellom seg som hundrerplatene (6), så de er lette å telle
    for(let k = 0; k < t; k++){ const x0 = f1(cT - (t * 13 - 6) / 2 + k * 13); s += `<rect x="${x0}" y="64" width="7" height="60" style="${soft(4, 45)}"/>`;
      for(let i = 1; i < 10; i++) s += `<line x1="${x0}" y1="${64 + i * 6}" x2="${f1(+x0 + 7)}" y2="${64 + i * 6}" style="stroke:var(--c4);stroke-width:.6"/>`; }
    for(let k = 0; k < e; k++) s += `<rect x="${cE - 5}" y="${f1(124 - (k + 1) * 9.4)}" width="10" height="8.6" rx="1.5" style="${soft(2, 55)}"/>`; // enerne stablet i én søyle, nedenfra
    s += tx(cT, 28, T("tiere", "tens"), "fg-s") + tx(cE, 28, T("enere", "ones"), "fg-s");
    if(p.hide) return { cap: T("Tallet bygget av hundrerplater, tierstenger og enerklosser.", "The number built from hundred flats, ten sticks and one blocks."), svg: s };
    s += col(cT, 150, String(t), 4, "fg-big") + col(cE, 150, String(e), 2, "fg-big");
    const terms = n >= 100 ? [100 * h, 10 * t, e] : [10 * t, e];
    s += tx(160, 174, terms.join(" + ") + " = " + n, "fg-b");
    const pl = (k, a, b, c, d) => `${k} ${T(k === 1 ? a : b, k === 1 ? c : d)}`, parts = [pl(t, "tier", "tiere", "ten", "tens"), pl(e, "ener", "enere", "one", "ones")];
    if(n >= 100) parts.unshift(pl(h, "hundrer", "hundrere", "hundred", "hundreds"));
    const list = parts.slice(0, -1).join(", ") + T(" og ", " and ") + parts[parts.length - 1];
    return { cap: T(`Tallet ${n}: ${list}. Plassen sifferet står på, bestemmer hvor mye det er verdt.`, `The number ${n}: ${list}. The place a digit stands in decides how much it is worth.`), svg: s }; },

  // Tallinje med hopp. Uten p: to eksempler (pluss og minus). p = { a, b, op: "+" | "-", via10 } viser a ± b med b hopp;
  // via10 deler hoppene i to farger: først til nærmeste tier, så resten. Gir null når tallene ikke får plass (mer enn 20 i bredden).
  gs_numline: (p) => { let s = "";
    if(p && p.a != null){ const a = p.a, b = p.b || 0, d = p.op === "-" ? -1 : 1, r = a + d * b;
      const lo = Math.floor(Math.min(a, r) / 5) * 5, hi = Math.max(lo + 20, Math.ceil(Math.max(a, r) / 5) * 5); if(hi - lo > 20 || !Number.isInteger(a) || !Number.isInteger(b)) return null;
      const X = n => 20 + (n - lo) * 14, y = 112, labs = new Set([a, r]), hl = { [a]: d > 0 ? 4 : 1, [r]: d > 0 ? 4 : 1 };
      for(let n = lo; n <= hi; n += 5) labs.add(n);
      if(p.hide){ labs.delete(r); delete hl[r]; }
      const ten = d > 0 ? Math.ceil(a / 10) * 10 : Math.floor(a / 10) * 10, first = p.via10 && ten !== a && Math.abs(ten - a) < b ? Math.abs(ten - a) : 0;
      if(first){ s += hops(X, y, a, first, d, 4) + hops(X, y, ten, b - first, d, 2); labs.add(ten); hl[ten] = 4;
        s += col((X(a) + X(ten)) / 2, y - 36, (d > 0 ? "+" : "−") + first, 4, "fg-b") + col((X(ten) + X(r)) / 2, y - 36, (d > 0 ? "+" : "−") + (b - first), 2, "fg-b"); }
      else s += hops(X, y, a, b, d, d > 0 ? 4 : 1);
      s += numline(y, lo, hi, X, [...labs].sort((u, v) => u - v), hl);
      s += col(20, 34, `${a} ${d > 0 ? "+" : "−"} ${b} = ${p.hide ? "?" : r}`.replace(/-(\d)/g, "−$1"), d > 0 ? 4 : 1, "fg-b", "start") + tx(300, 34, d > 0 ? T("pluss: hopp mot høyre", "plus: jump right") : T("minus: hopp mot venstre", "minus: jump left"), "fg-s", "end");
      if(p.hide) return { cap: T(`Start på ${a} og hopp ${b} ${d > 0 ? "mot høyre" : "mot venstre"}.`, `Start at ${a} and jump ${b} to the ${d > 0 ? "right" : "left"}.`), svg: s };
      return { cap: d > 0 ? T(`Start på ${a} og hopp ${b} mot høyre. Du lander på ${r}.`, `Start at ${a} and jump ${b} to the right. You land on ${r}.`) : T(`Start på ${a} og hopp ${b} mot venstre. Du lander på ${r}.`, `Start at ${a} and jump ${b} to the left. You land on ${r}.`), svg: s }; }
    const X = n => 20 + n * 14;
    s += col(20, 24, "8 + 5 = 13", 4, "fg-b", "start") + tx(300, 24, T("pluss: hopp mot høyre", "plus: jump right"), "fg-s", "end");
    s += hops(X, 66, 8, 5, 1, 4) + numline(66, 0, 20, X, [0, 5, 8, 13, 15, 20], { 8: 4, 13: 4 });
    s += col(20, 112, "15 − 4 = 11", 1, "fg-b", "start") + tx(300, 112, T("minus: hopp mot venstre", "minus: jump left"), "fg-s", "end");
    s += hops(X, 152, 15, 4, -1, 1) + numline(152, 0, 20, X, [0, 5, 11, 15, 20], { 15: 1, 11: 1 });
    return { cap: T("På tallinja går pluss mot høyre og minus mot venstre. Tell hoppene!", "On the number line, plus goes right and minus goes left. Count the jumps!"), svg: s }; },

  // Gange som rader. Uten p: 3 · 4 og 4 · 3 side om side. p = { r, c } (inntil 10 · 10).
  gs_array: (p) => { let s = "";
    if(p && p.r != null){ const r = p.r, c = p.c; if(!(r >= 1 && c >= 1 && r <= 10 && c <= 10)) return null;
      const sp = Math.min(24, 124 / r, 150 / c), rad = f1(sp * 0.37), x0 = 95 - (c - 1) * sp / 2, y0 = 84 - (r - 1) * sp / 2;
      for(let i = 0; i < r; i++) for(let j = 0; j < c; j++) s += circ(f1(x0 + j * sp), f1(y0 + i * sp), rad, soft(3, 55));
      s += col(196, 76, `${r} · ${c} = ${p.hide ? "?" : r * c}`, 3, "fg-b", "start") + tx(196, 96, T(`${r} ${r === 1 ? "rad" : "rader"} med ${c}`, `${r} ${r === 1 ? "row" : "rows"} of ${c}`), "fg-s", "start");
      if(p.hide) return { cap: T(`${r} rader med ${c} i hver.`, `${r} rows of ${c}.`), svg: s };
      return { cap: T(`${r} · ${c} betyr ${r} ${r === 1 ? "rad" : "rader"} med ${c} i hver. Til sammen ${r * c}.`, `${r} · ${c} means ${r} ${r === 1 ? "row" : "rows"} of ${c}. That is ${r * c} in total.`), svg: s }; }
    for(let r = 0; r < 3; r++) for(let c = 0; c < 4; c++) s += circ(36 + c * 24, 44 + r * 24, 9, soft(3, 55));
    for(let r = 0; r < 4; r++) for(let c = 0; c < 3; c++) s += circ(216 + c * 24, 32 + r * 24, 9, soft(2, 55));
    s += tx(72, 136, "3 · 4 = 12", "fg-b") + tx(72, 154, T("3 rader med 4", "3 rows of 4"), "fg-s");
    s += tx(240, 136, "4 · 3 = 12", "fg-b") + tx(240, 154, T("4 rader med 3", "4 rows of 3"), "fg-s");
    s += tx(160, 76, T("like", "same"), "fg-s fg-acct") + tx(160, 92, T("mange!", "amount!"), "fg-s fg-acct");
    return { cap: T("Gange er rader med like mange. Snu rutenettet, og svaret blir det samme: 3 · 4 = 4 · 3 = 12.", "Multiplying is rows of the same size. Turn the grid and the answer stays the same: 3 · 4 = 4 · 3 = 12."), svg: s }; },

  // Deling som rettferdig fordeling: n ting på k tallerkener, resten blir igjen. p = { n, k } (n ≤ 30, k ≤ 6). Uten p: 12 på 3.
  gs_share: (p = {}) => { const n = p.n ?? 12, k = p.k ?? 3; if(!(n >= 1 && n <= 30 && k >= 1 && k <= 6)) return null;
    const q = Math.floor(n / k), rem = n - q * k, per = Math.min(15, n), rx = Math.min(42, 150 / k - 6), m = Math.max(1, Math.floor((2 * rx - 6) / 12)); let s = "";
    if(q > m * 3) return null;
    for(let i = 0; i < n; i++){ const row = Math.floor(i / per), j = i % per, w = (Math.min(per, n - row * per) - 1) * 18; s += circ(f1(160 - w / 2 + j * 18), 20 + row * 18, 7, soft(i < q * k || p.hide ? 1 : 2, 45)); }
    for(let i = 0; i < k; i++){ const x = f1(10 + (i + 0.5) * 300 / k); s += car(160, n > per ? 50 : 32, x, 80, 5, 1.6) + `<ellipse cx="${x}" cy="126" rx="${f1(rx)}" ry="11" style="${soft(5, 18)}"/>`;
      if(!p.hide) for(let j = 0; j < q; j++){ const row = Math.floor(j / m), inRow = Math.min(m, q - row * m), c = j % m; s += circ(f1(x - (inRow - 1) * 6 + c * 12), 120 - row * 11, 5, soft(1, 45)); }
      if(!p.hide) s += tx(x, 154, String(q), "fg-b"); }
    if(p.hide) return { cap: T(`${n} ting skal deles likt på ${k}.`, `${n} things are shared equally between ${k}.`), svg: s + tx(160, 176, `${n} : ${k} = ?`, "fg-b") };
    s += tx(160, 176, `${n} : ${k} = ${q}` + (rem ? T(`, rest ${rem}`, `, remainder ${rem}`) : ""), "fg-b");
    return { cap: rem ? T(`Deling er rettferdig fordeling: ${n} drops på ${k} tallerkener gir ${q} på hver, og ${rem} blir til overs (resten).`, `Division is fair sharing: ${n} sweets on ${k} plates gives ${q} on each, and ${rem} are left over (the remainder).`)
      : T(`Deling er rettferdig fordeling: ${n} drops på ${k} tallerkener gir ${q} på hver.`, `Division is fair sharing: ${n} sweets on ${k} plates gives ${q} on each.`), svg: s }; },

  // Klokke med visere. p = { h: 1–12, m: 0–59 } (uten p: halv fire).
  gs_clock: (p = {}) => { const h = ((p.h ?? 3) + 11) % 12 + 1, m = p.m ?? 30, cx = 86, cy = 90; let s = circ(cx, cy, 72, `fill:var(--card);stroke:var(--ink);stroke-width:3`);
    for(let i = 0; i < 60; i++){ const a = i * 6 * Math.PI / 180, r0 = i % 5 ? 67 : 62; s += `<line class="fg-line" x1="${f1(cx + r0 * Math.sin(a))}" y1="${f1(cy - r0 * Math.cos(a))}" x2="${f1(cx + 70 * Math.sin(a))}" y2="${f1(cy - 70 * Math.cos(a))}" stroke-width="${i % 5 ? 0.8 : 2}"/>`; }
    for(let k = 1; k <= 12; k++){ const a = k * 30 * Math.PI / 180; s += tx(f1(cx + 50 * Math.sin(a)), f1(cy - 50 * Math.cos(a) + 5), String(k), "fg-b fg-tick"); }
    const hand = (deg, len, n, w) => { const a = deg * Math.PI / 180; return `<line x1="${cx}" y1="${cy}" x2="${f1(cx + len * Math.sin(a))}" y2="${f1(cy - len * Math.cos(a))}" style="stroke:var(--c${n});stroke-width:${w};stroke-linecap:round"/>`; };
    s += hand((h % 12) * 30 + m / 2, 28, 1, 6) + hand(m * 6, 40, 3, 3.5) + circ(cx, cy, 5, "fill:var(--ink)");
    const [wn, we] = clockWords(h, m), hm = `${h}:${String(m).padStart(2, "0")}`;
    s += col(176, 44, T("Kort viser", "Short hand"), 1, "fg-b", "start") + tx(176, 60, T("viser timene", "shows the hours"), "fg-s", "start");
    s += col(176, 88, T("Lang viser", "Long hand"), 3, "fg-b", "start") + tx(176, 104, T("viser minuttene", "shows the minutes"), "fg-s", "start");
    if(p.hide) return { cap: T("En klokke med kort og lang viser.", "A clock with a short and a long hand."), svg: s };
    s += tx(176, 140, T(`Klokka er ${hm}`, `The time is ${hm}`), "fg-b", "start") + tx(176, 158, T(`= «${wn}»`, `= ${we}`), "fg-s fg-acct", "start");
    return { cap: T(`Den korte viseren viser timene, den lange viser minuttene. Her er klokka ${hm}, «${wn}».`, `The short hand shows the hours, the long hand the minutes. Here the time is ${hm}, ${we}.`), svg: s }; },

  // Mynter og sedler. Uten p: alle myntene og en hundrelapp. p = { c: [verdier], pay } viser akkurat de pengene og summen (og vekslepenger når pay er gitt).
  gs_coins: (p) => { let s = "";
    const silver = `fill:color-mix(in srgb,var(--muted) 22%,var(--card));stroke:var(--muted);stroke-width:2`, gold = `fill:color-mix(in srgb,var(--gold) 45%,var(--card));stroke:var(--gold-deep);stroke-width:2`;
    const NOTE = { 50: 4, 100: 1, 200: 3, 500: 2, 1000: 5 }, W = v => v === 1 ? 32 : v === 5 ? 42 : v === 10 ? 38 : v === 20 ? 44 : 60;
    const money = (x, v, y = 60) => v === 1 ? circ(x, y, 16, silver) + tx(x, y + 5, "1", "fg-b") : v === 5 ? circ(x, y, 21, silver) + circ(x, y, 5, `fill:var(--card);stroke:var(--muted);stroke-width:1.5`) + tx(x, y - 9, "5", "fg-b")
      : v === 10 ? circ(x, y, 19, gold) + tx(x, y + 5, "10", "fg-b") : v === 20 ? circ(x, y, 22, gold) + tx(x, y + 5, "20", "fg-b") : `<rect x="${x - 28}" y="${y - 18}" width="56" height="36" rx="5" style="${soft(NOTE[v] || 4, 30)}"/>` + tx(x, y + 5, String(v), "fg-b");
    if(p && p.c){ const c = p.c, gap = 8, tot = c.reduce((a, v) => a + W(v), 0) + gap * (c.length - 1); if(!c.length || tot > 304 || c.some(v => !W(v) || (v > 20 && !NOTE[v]))) return null;
      let x = 160 - tot / 2; c.forEach(v => { const w = W(v); s += money(f1(x + w / 2), v) + tx(f1(x + w / 2), 102, v + " kr", "fg-s"); x += w + gap; });
      const sum = c.reduce((a, v) => a + v, 0), line = c.length > 1 ? c.map(v => v + " kr").join(" + ") + ` = ${sum} kr` : `${sum} kr`;
      s += tx(160, 140, line.length > 44 ? T(`Til sammen ${sum} kr`, `In total ${sum} kr`) : line, "fg-b");
      if(p.pay && !p.hide) s += tx(160, 162, T(`Pris ${p.pay} kr: du får ${sum - p.pay} kr tilbake.`, `Price ${p.pay} kr: you get ${sum - p.pay} kr back.`), "fg-s");
      return { cap: T(`Pengene til sammen: ${sum} kr.`, `The money in total: ${sum} kr.`), svg: s }; }
    s += money(36, 1) + money(88, 5) + money(142, 10) + money(198, 20) + money(272, 100);
    [[36, "1 kr"], [88, "5 kr"], [142, "10 kr"], [198, "20 kr"], [272, "100 kr"]].forEach(([x, l]) => { s += tx(x, 102, l, "fg-s"); });
    s += tx(160, 140, "20 kr + 10 kr + 5 kr = 35 kr", "fg-b");
    s += tx(160, 162, T("Betaler du med 100 kr, får du 65 kr tilbake.", "Pay with 100 kr and you get 65 kr back."), "fg-s");
    return { cap: T("Norske mynter og en hundrelapp. Legg sammen for å finne prisen, og trekk fra for å finne vekslepengene.", "Norwegian coins and a 100-krone note. Add to find the price, subtract to find the change."), svg: s }; },
  gs_shapes: () => { let s = ""; const dot = (x, y) => circ(x, y, 3.5, "fill:var(--c1)");
    s += `<polygon points="40,28 10,86 70,86" style="${soft(3, 30)}"/>` + dot(40, 28) + dot(10, 86) + dot(70, 86);
    s += `<rect x="92" y="28" width="58" height="58" style="${soft(4, 30)}"/>` + dot(92, 28) + dot(150, 28) + dot(92, 86) + dot(150, 86);
    s += `<rect x="168" y="40" width="80" height="46" style="${soft(2, 30)}"/>` + dot(168, 40) + dot(248, 40) + dot(168, 86) + dot(248, 86);
    s += circ(284, 57, 29, soft(5, 30));
    [[40, T("Trekant", "Triangle"), T("3 hjørner", "3 corners")], [121, T("Kvadrat", "Square"), T("4 like sider", "4 equal sides")], [208, T("Rektangel", "Rectangle"), T("4 rette hjørner", "4 right angles")], [284, T("Sirkel", "Circle"), T("ingen hjørner", "no corners")]]
      .forEach(([x, a, b]) => { s += tx(x, 108, a, "fg-b") + tx(x, 124, b, "fg-s"); });
    const tr = x => `<polygon points="${x},146 ${x - 9},162 ${x + 9},162" style="${soft(3, 45)}"/>`, sq = x => `<rect x="${x - 8}" y="146" width="16" height="16" style="${soft(4, 45)}"/>`;
    s += tx(14, 159, T("Mønster:", "Pattern:"), "fg-s", "start") + tr(84) + sq(110) + tr(136) + sq(162) + tr(188) + sq(214) + tx(244, 160, "?", "fg-b fg-acct");
    return { cap: T("Tell sider og hjørner (de røde prikkene). Et mønster gjentar seg – hva kommer etter firkanten?", "Count sides and corners (the red dots). A pattern repeats – what comes after the square?"), svg: s }; },

  // ---------- MATEMATIKK 5.–7. ----------
  // Brøk som pizza. Uten p: 1/2, 1/4 og 3/4. p = { n: biter, k: farget } viser én stor pizza med brøken ved siden av.
  gs_pizza: (p) => { let s = "";
    if(p && p.n != null){ const n = p.n, k = p.k ?? 0; if(!(n >= 1 && n <= 12 && k >= 0 && k <= n)) return null;
      s += pizza(100, 88, 66, n, k);
      s += col(236, 76, String(k), 2, "fg-big") + `<line x1="214" y1="88" x2="258" y2="88" style="stroke:var(--c2);stroke-width:3"/>` + col(236, 122, String(n), 2, "fg-big");
      s += tx(268, 68, T("teller", "numerator"), "fg-s", "start") + tx(268, 116, T("nevner", "denominator"), "fg-s", "start");
      s += tx(236, 168, T(`${k} av ${n} like biter`, `${k} of ${n} equal slices`), "fg-s");
      return { cap: T(`Pizzaen er delt i ${n} like biter, og ${k} av dem er farget: ${k}/${n}.`, `The pizza is cut into ${n} equal slices and ${k} of them are coloured: ${k}/${n}.`), svg: s }; }
    s = pizza(55, 62, 38, 2, 1) + pizza(160, 62, 38, 4, 1) + pizza(265, 62, 38, 4, 3);
    s += frac(55, 126, "1", "2", 2) + frac(160, 126, "1", "4", 2) + frac(265, 126, "3", "4", 2);
    s += tx(55, 172, T("en halv", "one half"), "fg-s") + tx(160, 172, T("en fjerdedel", "one quarter"), "fg-s") + tx(265, 172, T("tre fjerdedeler", "three quarters"), "fg-s");
    return { cap: T("Nevneren (nederst) sier hvor mange like biter pizzaen er delt i. Telleren (øverst) sier hvor mange biter du har.", "The denominator (bottom) says how many equal slices the pizza has. The numerator (top) says how many slices you have."), svg: s }; },

  // Desimaltall. p = { v } mellom 0 og 1: tideler som en stang med 10 deler, hundredeler som 100 ruter. Uten p: 0,3.
  gs_decimal: (p = {}) => { const v = p.v ?? 0.3; let s = ""; if(!(v >= 0 && v <= 1)) return null;
    const d = Math.round(v * 10), hund = Math.abs(v * 10 - d) > 1e-9, dec = x => T(String(+x.toFixed(2)).replace(".", ","), String(+x.toFixed(2)));
    if(hund){ const k = Math.round(v * 100), u = 11; if(Math.abs(v * 100 - k) > 1e-9) return null;
      for(let r = 0; r < 10; r++) for(let c = 0; c < 10; c++) s += `<rect x="${20 + c * u}" y="${24 + r * u}" width="${u}" height="${u}" style="${r * 10 + c < k ? solid(3, 55) : "fill:var(--card)"};stroke:var(--line);stroke-width:1"/>`;
      s += `<rect x="20" y="24" width="${10 * u}" height="${10 * u}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>` + tx(75, 156, T("1 hel = 100 ruter", "1 whole = 100 squares"), "fg-s fg-tick");
      s += tx(156, 56, T(`${k} av 100 ruter`, `${k} of 100 squares`), "fg-t fg-tick", "start") + col(156, 96, dec(v), 3, "fg-big", "start") + tx(156, 124, `= ${k}/100`, "fg-b", "start");
      return { cap: T(`${dec(v)} er ${k} hundredeler: ${k} av 100 like ruter.`, `${dec(v)} is ${k} hundredths: ${k} of 100 equal squares.`), svg: s }; }
    const x0 = 30, w = 26;
    for(let i = 0; i < 10; i++) s += `<rect x="${x0 + i * w}" y="36" width="${w}" height="32" style="${i < d ? solid(3, 55) : "fill:var(--card)"};stroke:var(--ink);stroke-width:1.4"/>`;
    s += tx(160, 26, T(`${d} av 10 like deler`, `${d} of 10 equal parts`), "fg-s");
    s += col(160, 92, T(`${dec(v)}  =  ${d}/10  =  ${d === 1 ? "én tidel" : d + " tideler"}`, `${dec(v)}  =  ${d}/10  =  ${d === 1 ? "one tenth" : d + " tenths"}`), 3, "fg-b");
    const X = n => x0 + n * w; s += `<line class="fg-line" x1="${x0}" y1="128" x2="${x0 + 10 * w}" y2="128"/>`;
    for(let i = 0; i <= 10; i++) s += `<line class="fg-line" x1="${X(i)}" y1="${i % 5 ? 123 : 120}" x2="${X(i)}" y2="${i % 5 ? 133 : 136}" stroke-width="${i % 5 ? 1.2 : 2}"/>`;
    s += circ(X(d), 128, 6, "fill:var(--c3)") + [0, 5, 10].filter(i => i !== d).map(i => tx(X(i), 154, i === 10 ? "1" : dec(i / 10), "fg-s")).join("") + col(X(d), 154, dec(v), 3);
    return { cap: T(`Desimaltall er en annen måte å skrive tideler på. ${dec(v)} ligger ${d === 1 ? "én tidel" : d + " tideler"} fra 0 på veien mot 1.`, `Decimals are another way to write tenths. ${dec(v)} lies ${d === 1 ? "one tenth" : d + " tenths"} from 0 on the way to 1.`), svg: s }; },

  // Prosent som 100 ruter. p = { k } (0–100). Uten p: 25 %.
  gs_percent: (p = {}) => { const k = p.k ?? 25, u = 11; let s = ""; if(!(Number.isInteger(k) && k >= 0 && k <= 100)) return null;
    for(let r = 0; r < 10; r++) for(let c = 0; c < 10; c++) s += `<rect x="${20 + c * u}" y="${24 + r * u}" width="${u}" height="${u}" style="${r * 10 + c < k ? solid(1, 55) : "fill:var(--card)"};stroke:var(--line);stroke-width:1"/>`;
    const FR = { 10: "1/10", 20: "1/5", 25: "1/4", 50: "1/2", 75: "3/4", 100: "1" }, dec = T(String(k / 100).replace(".", ","), String(k / 100));
    s += `<rect x="20" y="24" width="${10 * u}" height="${10 * u}" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>` + tx(75, 156, T("100 ruter = 100 %", "100 squares = 100 %"), "fg-s fg-tick");
    s += tx(156, 50, T(`${k} av 100 ruter`, `${k} of 100 squares`), "fg-t fg-tick", "start") + col(156, 90, `= ${k} %`, 1, "fg-big", "start") + (FR[k] ? tx(156, 118, "= " + FR[k], "fg-b", "start") : "") + tx(156, FR[k] ? 142 : 118, "= " + dec, "fg-b", "start");
    return { cap: k === 25 && !p.k ? T("Prosent betyr «av hundre». 25 % er 25 av 100 ruter – det samme som en firedel.", "Percent means \"out of a hundred\". 25 % is 25 of 100 squares – the same as a quarter.")
      : T(`Prosent betyr «av hundre». ${k} % er ${k} av 100 ruter.`, `Percent means "out of a hundred". ${k} % is ${k} of 100 squares.`), svg: s }; },

  // Areal og omkrets for et rektangel på w · h ruter. p = { w, h, unit, mode: "fill" | "edge" } (unit "" = bare ruter). Uten p: 5 m · 3 m.
  gs_area: (p = {}) => { const w = p.w ?? 5, h = p.h ?? 3, un = p.unit ?? "m", mode = p.mode || "both"; let s = ""; if(!(w >= 1 && h >= 1 && w <= 12 && h <= 8)) return null;
    const u = Math.min(22, 134 / w, 110 / h), x0 = 36, y0 = 48, L = v => un ? `${v} ${un}` : String(v), A = v => un ? `${v} ${un}²` : T(`${v} ruter`, `${v} squares`);
    for(let r = 0; r < h; r++) for(let c = 0; c < w; c++) s += `<rect x="${f1(x0 + c * u)}" y="${f1(y0 + r * u)}" width="${f1(u)}" height="${f1(u)}" style="${mode === "edge" ? "fill:var(--card)" : solid(4, 30)};stroke:var(--c4);stroke-width:.8"/>`;
    if(mode !== "fill") s += `<rect x="${x0}" y="${f1(y0)}" width="${f1(w * u)}" height="${f1(h * u)}" style="fill:none;stroke:var(--c1);stroke-width:4"/>`;
    s += tx(f1(x0 + w * u / 2), f1(y0 - 10), L(w), "fg-b") + tx(x0 - 8, f1(y0 + h * u / 2 + 5), L(h), "fg-b", "end");
    const per = w >= 10 || h >= 10 ? `2 · (${w} + ${h}) = ${L(2 * (w + h))}` : `${w} + ${h} + ${w} + ${h} = ${L(2 * (w + h))}`;
    if(p.hide) return { cap: T(`Et rektangel på ${L(w)} ganger ${L(h)}.`, `A rectangle of ${L(w)} by ${L(h)}.`), svg: s };
    if(mode !== "edge") s += col(176, mode === "fill" ? 80 : 52, T("Areal", "Area"), 4, "fg-b", "start") + tx(176, mode === "fill" ? 98 : 70, `${h} · ${w} = ${A(w * h)}`, "fg-t", "start") + tx(176, mode === "fill" ? 114 : 86, T("(rutene inni)", "(the squares inside)"), "fg-s", "start");
    if(mode !== "fill") s += col(176, mode === "edge" ? 80 : 118, T("Omkrets", "Perimeter"), 1, "fg-b", "start") + tx(176, mode === "edge" ? 98 : 136, per, "fg-t", "start") + tx(176, mode === "edge" ? 114 : 152, T("(rundt kanten)", "(around the edge)"), "fg-s", "start");
    return { cap: mode === "fill" ? T(`Arealet er hvor mange ruter som får plass inni: ${h} rader med ${w} gir ${A(w * h)}.`, `The area is how many squares fit inside: ${h} rows of ${w} gives ${A(w * h)}.`)
      : mode === "edge" ? T(`Omkretsen er hvor langt det er rundt kanten: ${L(2 * (w + h))}.`, `The perimeter is how far it is around the edge: ${L(2 * (w + h))}.`)
      : T("Areal er hvor mange ruter som får plass inni. Omkrets er hvor langt det er rundt – den røde kanten.", "Area is how many squares fit inside. Perimeter is how far it is around – the red edge."), svg: s }; },
  gs_stairs: () => { let s = ""; const L = ["km", "hm", "dam", "m", "dm", "cm", "mm"], main = { km: 1, m: 1, cm: 1, mm: 1 };
    L.forEach((l, i) => { const x = 20 + i * 40, y = 24 + i * 18; s += `<rect x="${x}" y="${y}" width="40" height="${150 - y}" style="${main[l] ? soft(3, 34) : soft(3, 12)}"/>` + tx(x + 20, y + 15, l, main[l] ? "fg-b" : "fg-s"); });
    s += tx(20, 172, T("↓ ett trinn ned: · 10", "↓ one step down: · 10"), "fg-s", "start") + tx(300, 172, T("↑ ett trinn opp: : 10", "↑ one step up: ÷ 10"), "fg-s", "end");
    s += tx(300, 34, "1 m = 100 cm", "fg-b", "end") + tx(300, 52, "1 km = 1000 m", "fg-b", "end");
    return { cap: T("Måletrappa: hvert trinn ned ganger du med 10, hvert trinn opp deler du på 10. Fra m til cm er det to trinn ned: · 100.", "The unit staircase: each step down multiply by 10, each step up divide by 10. From m to cm is two steps down: · 100."), svg: s }; },

  gs_bars: () => { let s = ""; const base = 150, k = 12, D = [[T("Eple", "Apple"), 5, 4], [T("Jordbær", "Strawberry"), 8, 1], [T("Banan", "Banana"), 4, 2], [T("Pære", "Pear"), 3, 4]];
    s += `<line class="fg-mut" x1="44" y1="${base}" x2="44" y2="${base - 8.6 * k}"/>`;
    for(let v = 0; v <= 8; v += 2){ s += `<line class="fg-mut" x1="${v ? 38 : 42}" y1="${base - v * k}" x2="${v ? 44 : 300}" y2="${base - v * k}" stroke-width="${v ? 1.2 : 1.6}"/>` + tx(34, base - v * k + 4, String(v), "fg-s", "end"); }
    D.forEach(([l, v, n], i) => { const x = 80 + i * 62; s += `<rect x="${x - 20}" y="${base - v * k}" width="40" height="${v * k}" rx="3" style="${soft(n, 55)}"/>` + tx(x, base - v * k + 17, String(v), "fg-b") + tx(x, 168, l, "fg-s"); });
    s += tx(142, 44, T("flest = typetall", "most = mode"), "fg-s fg-acct") + tx(300, 18, T("Favorittfrukt i 5B", "Favourite fruit in 5B"), "fg-b", "end");
    return { cap: T("Et søylediagram gjør tall lette å sammenligne: jo høyere søyle, jo flere. Typetallet er det svaret flest har valgt.", "A bar chart makes numbers easy to compare: the taller the bar, the more. The mode is the answer most people chose."), svg: s }; },

  // ---------- MATEMATIKK 8.–10. ----------
  gu_order: () => { let s = ""; const B = [["1", T("Parenteser", "Brackets"), "( )", 3], ["2", T("Potenser", "Powers"), "x²", 5], ["3", T("Gange, dele", "Times, divide"), "· :", 2], ["4", T("Pluss, minus", "Plus, minus"), "+ −", 4]];
    B.forEach(([n, l, sym, c], i) => { const x = 6 + i * 79; s += box(x, 20, 70, 62, c) + col(x + 35, 42, n + ".", c, "fg-b") + tx(x + 35, 58, l, "fg-s") + tx(x + 35, 74, sym, "fg-b"); if(i < 3) s += ar(x + 71, 51, x + 78, 51, "fg-line", 1.4); });
    s += tx(160, 110, "2 + 3 · (4 − 1)²", "fg-b") + tx(160, 132, "= 2 + 3 · 3²  =  2 + 3 · 9", "fg-t") + col(160, 154, "= 2 + 27 = 29", 4, "fg-b");
    return { cap: T("Regnerekkefølgen: parenteser først, så potenser, så gange og dele, til slutt pluss og minus.", "Order of operations: brackets first, then powers, then multiplying and dividing, and finally adding and subtracting."), svg: s }; },

  gu_solve: () => { let s = ""; const L = [["3x + 4 = 19", 26], ["3x = 15", 82], ["x = 5", 138]];
    L.forEach(([e, y], i) => { s += `<rect x="40" y="${y - 18}" width="130" height="28" rx="8" style="${i === 2 ? soft(4, 30) : soft(3, 14)}"/>` + tx(105, y + 1, e, "fg-b"); });
    s += ar(105, 38, 105, 62, "fg-line", 1.6) + ar(105, 94, 105, 118, "fg-line", 1.6);
    s += col(186, 54, T("− 4 på begge sider", "− 4 on both sides"), 1, "fg-s", "start") + col(186, 110, T(": 3 på begge sider", "÷ 3 on both sides"), 1, "fg-s", "start");
    s += tx(186, 142, T("Sjekk:", "Check:"), "fg-s", "start") + tx(186, 160, "3 · 5 + 4 = 19 ✓", "fg-t fg-okt", "start");
    return { cap: T("Løs en likning ved å gjøre det samme på begge sider til x står alene. Sett svaret inn til slutt og sjekk.", "Solve an equation by doing the same to both sides until x is alone. Put the answer back in to check."), svg: s }; },

  gu_line: () => { let s = ""; const O = [40, 150], u = 18, P = (x, y) => [O[0] + x * u, O[1] - y * u];
    for(let i = 1; i <= 4; i++){ const [x] = P(i, 0); s += `<line class="fg-mut" x1="${x}" y1="${P(0, 7)[1]}" x2="${x}" y2="${O[1]}" stroke-width=".5"/>`; }
    for(let j = 1; j <= 7; j++){ const [, y] = P(0, j); s += `<line class="fg-mut" x1="${O[0]}" y1="${y}" x2="${P(4, 0)[0]}" y2="${y}" stroke-width=".5"/>`; }
    s += fgAr(O[0], O[1], P(4.6, 0)[0], O[1], "fg-ax", 1.6) + fgAr(O[0], O[1], O[0], P(0, 7.6)[1], "fg-ax", 1.6) + tx(P(4.6, 0)[0], O[1] + 16, "x", "fg-i", "end") + tx(O[0] - 8, P(0, 7.4)[1] + 4, "y", "fg-i", "end");
    const [ax, ay] = P(-0.4, 0.2), [bx, by] = P(3.2, 7.4); s += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" style="stroke:var(--c5);stroke-width:3"/>`;
    const [p1x, p1y] = P(1, 3), [p2x] = P(2, 3), [, p3y] = P(2, 5);
    s += `<polyline points="${p1x},${p1y} ${p2x},${p1y} ${p2x},${p3y}" style="fill:none;stroke:var(--c1);stroke-width:2.4"/>` + col(p1x + 9, p1y + 14, "1", 1, "fg-s") + col(p2x + 6, p1y - 22, "2", 1, "fg-b", "start");
    s += circ(O[0], P(0, 1)[1], 5, "fill:var(--c3)");
    s += col(150, 36, "y = 2x + 1", 5, "fg-b", "start") + col(150, 70, T("stigningstall a = 2", "slope a = 2"), 1, "fg-b", "start") + tx(150, 86, T("1 bortover → 2 opp", "1 across → 2 up"), "fg-s", "start");
    s += col(150, 120, T("konstantledd b = 1", "intercept b = 1"), 3, "fg-b", "start") + tx(150, 136, T("krysser y-aksen i 1", "crosses the y-axis at 1"), "fg-s", "start");
    return { cap: T("I y = ax + b er a stigningstallet (hvor mye linja stiger for hvert steg bortover) og b der linja krysser y-aksen.", "In y = ax + b, a is the slope (how much the line rises per step across) and b is where it crosses the y-axis."), svg: s }; },

  gu_pyth: () => { let s = ""; const A = [120, 110], B = [168, 110], C = [120, 74], n = [36, -48];
    const cells = (P0, e1, e2, k, c) => { let r = ""; for(let i = 0; i < k; i++) for(let j = 0; j < k; j++){ const p = (a, b) => [f1(P0[0] + e1[0] * a / k + e2[0] * b / k), f1(P0[1] + e1[1] * a / k + e2[1] * b / k)];
      r += `<polygon points="${[p(i, j), p(i + 1, j), p(i + 1, j + 1), p(i, j + 1)].map(q => q.join(",")).join(" ")}" style="${solid(c, (i + j) % 2 ? 22 : 40)}"/>`; } return r; };
    s += cells([84, 74], [36, 0], [0, 36], 3, 3) + cells([120, 110], [48, 0], [0, 48], 4, 2) + cells(C, [B[0] - C[0], B[1] - C[1]], n, 5, 5);
    s += `<polygon points="${A} ${B} ${C}" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><polyline points="120,102 128,102 128,110" style="fill:none;stroke:var(--ink);stroke-width:1.4"/>`;
    s += tx(102, 98, "9", "fg-b") + tx(144, 140, "16", "fg-b") + tx(162, 72, "25", "fg-b");
    s += tx(220, 34, "a = 3,  b = 4", "fg-s", "start") + tx(220, 60, "a² + b² = c²", "fg-b", "start") + tx(220, 86, "9 + 16 = 25", "fg-t", "start") + col(220, 112, "c = √25 = 5", 5, "fg-b", "start");
    return { cap: T("Pytagoras: i en rettvinklet trekant er de to små kvadratene til sammen like store som det store. 9 + 16 = 25 ruter.", "Pythagoras: in a right triangle the two small squares together equal the big one. 9 + 16 = 25 squares."), svg: s }; },

  gu_bag: () => { let s = `<path d="M34 46 Q34 36 44 36 L120 36 Q130 36 130 46 L130 146 Q130 158 118 158 L46 158 Q34 158 34 146 Z" style="fill:color-mix(in srgb,var(--muted) 10%,var(--card));stroke:var(--ink);stroke-width:2"/>`;
    [[58, 136, 1], [82, 136, 1], [106, 136, 3], [70, 112, 3], [96, 112, 1]].forEach(([x, y, c]) => { s += circ(x, y, 11, soft(c, 70)); });
    s += tx(82, 26, T("3 røde, 2 blå", "3 red, 2 blue"), "fg-s");
    s += tx(156, 50, T("Trekk én kule:", "Draw one ball:"), "fg-b", "start");
    s += col(156, 80, T("P(rød) = 3/5", "P(red) = 3/5"), 1, "fg-b", "start") + tx(156, 98, T("= 0,6 = 60 %", "= 0.6 = 60 %"), "fg-s", "start");
    s += col(156, 128, T("P(blå) = 2/5", "P(blue) = 2/5"), 3, "fg-b", "start") + tx(156, 146, T("= 0,4 = 40 %", "= 0.4 = 40 %"), "fg-s", "start");
    return { cap: T("Sannsynlighet = gunstige utfall delt på mulige utfall. 3 av de 5 kulene er røde, så P(rød) = 3/5.", "Probability = favourable outcomes divided by possible outcomes. 3 of the 5 balls are red, so P(red) = 3/5."), svg: s }; },

  gu_budget: () => { let s = ""; const k = 0.029, base = 156, U = [[T("Sparing", "Savings"), 1000, 4], [T("Fritid", "Leisure"), 1200, 5], [T("Mat", "Food"), 800, 2], [T("Transport", "Transport"), 600, 3], [T("Mobil", "Phone"), 400, 1]];
    s += `<rect x="40" y="${f1(base - 4000 * k)}" width="60" height="${f1(4000 * k)}" rx="3" style="${soft(4, 45)}"/>` + tx(70, f1(base - 4000 * k) + 18, "4000", "fg-b");
    let y = base; U.forEach(([l, v, c], i) => { const h = v * k; y -= h; s += `<rect x="128" y="${f1(y)}" width="60" height="${f1(h)}" style="${soft(c, 50)}"/>`;
      s += `<rect x="216" y="${30 + i * 22}" width="12" height="12" rx="2" style="${soft(c, 50)}"/>` + tx(234, 40 + i * 22, `${l} ${v}`, "fg-s", "start"); });
    s += tx(70, 172, T("Inntekt", "Income"), "fg-s") + tx(158, 172, T("Utgifter", "Spending"), "fg-s") + tx(20, 18, T("Månedsbudsjett (kr)", "Monthly budget (kr)"), "fg-b", "start");
    s += tx(216, 150, T("Inn = ut ✓", "In = out ✓"), "fg-b fg-okt", "start");
    return { cap: T("Et budsjett viser hva du får inn og hva du bruker. Sett av sparing først – da går budsjettet opp uten at du går tom.", "A budget shows what comes in and what you spend. Put savings first – then the budget balances without running out."), svg: s }; },

  // ---------- NATURFAG 1.–7. ----------
  gs_heart: () => { let s = box(120, 8, 80, 32, 3) + tx(160, 29, T("Lungene", "Lungs"), "fg-b") + box(120, 140, 80, 32, 2) + tx(160, 161, T("Kroppen", "Body"), "fg-b");
    s += `<path d="M160 106 C128 86 136 64 160 78 C184 64 192 86 160 106 Z" style="${soft(1, 60)}"/>`;
    s += car(136, 138, 150, 102, 3) + car(150, 76, 136, 44, 3) + car(184, 44, 170, 76, 1) + car(170, 102, 184, 138, 1);
    s += tx(214, 92, T("Hjertet", "The heart"), "fg-b", "start") + tx(214, 108, T("pumper blodet", "pumps the blood"), "fg-s", "start");
    s += `<line x1="12" y1="80" x2="32" y2="80" style="stroke:var(--c1);stroke-width:3"/>` + tx(38, 84, T("med oksygen", "with oxygen"), "fg-s", "start");
    s += `<line x1="12" y1="102" x2="32" y2="102" style="stroke:var(--c3);stroke-width:3"/>` + tx(38, 106, T("uten oksygen", "without oxygen"), "fg-s", "start");
    return { cap: T("Hjertet pumper blodet rundt: til lungene for å hente oksygen, og så ut i kroppen der cellene bruker det.", "The heart pumps blood around: to the lungs to pick up oxygen, then out to the body where the cells use it."), svg: s }; },

  gs_photo: () => { let s = circ(40, 40, 18, `fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2`);
    for(let i = 0; i < 8; i++){ const a = i * Math.PI / 4; s += `<line x1="${f1(40 + 23 * Math.cos(a))}" y1="${f1(40 + 23 * Math.sin(a))}" x2="${f1(40 + 30 * Math.cos(a))}" y2="${f1(40 + 30 * Math.sin(a))}" style="stroke:var(--gold-deep);stroke-width:2"/>`; }
    s += `<line x1="10" y1="150" x2="310" y2="150" style="stroke:var(--c2);stroke-width:2.4"/>`;
    s += `<path d="M170 150 L170 66" style="stroke:var(--c4);stroke-width:4"/><path d="M170 150 L156 170 M170 150 L170 174 M170 150 L184 170" style="stroke:var(--c2);stroke-width:2;fill:none"/>`;
    s += `<ellipse cx="196" cy="80" rx="27" ry="12" transform="rotate(-24 196 80)" style="${soft(4, 60)}"/><ellipse cx="146" cy="104" rx="24" ry="11" transform="rotate(24 146 104)" style="${soft(4, 60)}"/>`;
    s += car(62, 52, 166, 76, 2) + tx(104, 50, T("lys", "light"), "fg-s");
    s += car(296, 52, 226, 70, 5) + tx(298, 42, T("CO₂ inn", "CO₂ in"), "fg-s", "end");
    s += car(222, 92, 292, 112, 3) + tx(300, 130, T("O₂ ut", "O₂ out"), "fg-s", "end");
    s += car(198, 170, 198, 128, 3) + tx(206, 160, T("vann", "water"), "fg-s", "start");
    s += tx(14, 132, T("Bladene lager", "The leaves make"), "fg-s", "start") + tx(14, 146, T("sukker (mat)", "sugar (food)"), "fg-b", "start");
    return { cap: T("Fotosyntese: med lys fra sola lager bladene sukker av vann og karbondioksid (CO₂). Oksygen (O₂) slippes ut.", "Photosynthesis: with sunlight the leaves make sugar from water and carbon dioxide (CO₂). Oxygen (O₂) is released."), svg: s }; },

  gs_states: () => { let s = ""; const X = [10, 122, 234];
    X.forEach(x => { s += `<rect x="${x}" y="24" width="76" height="92" rx="8" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/>`; });
    for(let r = 0; r < 4; r++) for(let c = 0; c < 4; c++) s += circ(23 + c * 17, 54 + r * 17, 7, soft(3, 60));
    [[134, 104], [150, 106], [166, 103], [182, 105], [140, 90], [157, 88], [174, 90], [190, 92], [148, 74], [166, 72], [186, 76]].forEach(([x, y]) => { s += circ(x, y, 7, soft(3, 60)); });
    [[250, 40], [290, 52], [262, 80], [298, 96], [246, 104], [278, 70]].forEach(([x, y]) => { s += circ(x, y, 7, soft(3, 60)); });
    s += ar(90, 70, 118, 70) + ar(202, 70, 230, 70);
    [[48, T("Fast", "Solid"), T("is", "ice")], [160, T("Flytende", "Liquid"), T("vann", "water")], [272, T("Gass", "Gas"), T("damp", "steam")]].forEach(([x, a, b]) => { s += tx(x, 136, a, "fg-b") + tx(x, 152, b, "fg-s"); });
    s += col(104, 172, T("smelter", "melts"), 1, "fg-s") + col(216, 172, T("fordamper", "evaporates"), 1, "fg-s");
    return { cap: T("Samme stoff kan være fast, flytende eller gass. Varmer vi opp, beveger de små delene seg mer og lenger fra hverandre.", "The same substance can be solid, liquid or gas. When heated, the tiny particles move more and spread further apart."), svg: s }; },

  gs_water: () => { let s = circ(298, 24, 14, `fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2`);
    s += `<path d="M10 140 L170 140 L170 172 L10 172 Z" style="${solid(3, 45)}"/><path d="M10 140 Q30 132 50 140 T90 140 T130 140 T170 140" style="fill:none;stroke:var(--c3);stroke-width:2"/>`;
    s += `<polygon points="176,172 248,74 316,172" style="${soft(4, 25)}"/>`;
    s += [[150, 40, 22], [176, 32, 26], [204, 40, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" style="fill:color-mix(in srgb,var(--muted) 18%,var(--card))"/>`).join("") + `<path d="M128 52 L226 52" style="stroke:var(--muted);stroke-width:1.4"/>`;
    s += `<g stroke-dasharray="4 4">${car(78, 132, 126, 64, 3)}</g>`;
    for(let i = 0; i < 4; i++) s += `<line x1="${196 + i * 9}" y1="${68 + (i % 2) * 6}" x2="${192 + i * 9}" y2="${82 + (i % 2) * 6}" style="stroke:var(--c3);stroke-width:2"/>`;
    s += car(214, 164, 176, 156, 3, 1.8);
    s += tx(70, 100, T("① vann blir", "① water turns"), "fg-s", "end") + tx(70, 114, T("til damp", "into vapour"), "fg-s", "end");
    s += tx(124, 30, T("② damp blir skyer", "② vapour forms clouds"), "fg-s", "end");
    s += tx(232, 60, T("③ regn og snø", "③ rain, snow"), "fg-s", "start");
    s += tx(90, 162, T("④ renner til havet", "④ flows to the sea"), "fg-s");
    return { cap: T("Vannets kretsløp: sola varmer vannet så det blir damp, dampen blir skyer, det regner eller snør, og vannet renner tilbake til havet.", "The water cycle: the sun warms water into vapour, vapour forms clouds, it rains or snows, and the water flows back to the sea."), svg: s }; },

  gs_daynight: () => { let s = circ(44, 96, 26, `fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2`) + tx(44, 140, T("Sola", "The sun"), "fg-b");
    for(let i = 0; i < 3; i++) s += car(80, 74 + i * 22, 148, 74 + i * 22, 2, 1.6);
    s += circ(210, 96, 50, `fill:color-mix(in srgb,var(--c3) 30%,var(--card));stroke:var(--ink);stroke-width:2`);
    s += `<path d="M210 46 A50 50 0 0 1 210 146 Z" style="fill:color-mix(in srgb,var(--ink) 72%,var(--card))"/>`;
    s += tx(186, 100, T("dag", "day"), "fg-b") + `<text x="234" y="100" text-anchor="middle" class="fg-b" style="fill:var(--card)">${T("natt", "night")}</text>`;
    s += `<path d="M176 38 Q210 20 244 38" style="fill:none;stroke:var(--c5);stroke-width:2"/><polygon points="244,38 234,36 240,29" style="fill:var(--c5)"/>`;
    s += tx(210, 170, T("Jorda snurrer én gang på 24 timer", "Earth spins once every 24 hours"), "fg-s");
    return { cap: T("Sola lyser alltid på den ene siden av jorda – der er det dag. Jorda snurrer, så vi skifter mellom dag og natt.", "The sun always lights one side of Earth – there it is day. Earth spins, so we switch between day and night."), svg: s }; },

  gs_circuit: () => { let s = `<path d="M100 82 L100 40 L176 40 M204 40 L280 40 L280 140 L210 140 M176 140 L100 140 L100 92" style="fill:none;stroke:var(--ink);stroke-width:2.4"/>`;
    s += `<line x1="84" y1="82" x2="116" y2="82" style="stroke:var(--ink);stroke-width:3"/><line x1="92" y1="92" x2="108" y2="92" style="stroke:var(--ink);stroke-width:5"/>` + tx(122, 86, "+", "fg-b", "start") + tx(122, 102, "−", "fg-b", "start") + tx(78, 90, T("batteri", "battery"), "fg-s", "end");
    s += circ(190, 40, 14, `fill:color-mix(in srgb,var(--gold) 60%,var(--card));stroke:var(--ink);stroke-width:2`) + `<path d="M182 44 L186 34 L190 44 L194 34 L198 44" style="fill:none;stroke:var(--ink);stroke-width:1.2"/>`;
    for(let i = -1; i <= 1; i++) s += `<line x1="${190 + i * 16}" y1="${20 - Math.abs(i) * 2}" x2="${190 + i * 22}" y2="${13 - Math.abs(i) * 4}" style="stroke:var(--gold-deep);stroke-width:2"/>`;
    s += tx(236, 26, T("lyspære", "bulb"), "fg-s", "start");
    s += circ(176, 140, 3.5, "fill:var(--ink)") + circ(210, 140, 3.5, "fill:var(--ink)") + `<line x1="176" y1="140" x2="208" y2="138" style="stroke:var(--ink);stroke-width:2.4"/>` + tx(193, 162, T("bryter (på)", "switch (on)"), "fg-s");
    s += car(280, 70, 280, 110, 3, 1.8) + tx(272, 94, T("strøm", "current"), "fg-s fg-acct", "end");
    return { cap: T("Strømmen trenger en lukket ring: fra batteriet, gjennom pæra og tilbake. Åpner du bryteren, slukner pæra.", "Current needs a closed loop: from the battery, through the bulb and back. Open the switch and the bulb goes out."), svg: s }; },

  // ---------- NATURFAG 8.–10. ----------
  gu_cell: () => { let s = `<ellipse cx="78" cy="92" rx="58" ry="42" style="${soft(1, 18)}"/>` + circ(78, 92, 13, soft(5, 55));
    [[52, 76], [104, 108], [58, 112], [100, 74]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" style="${solid(2, 50)}"/>`; });
    s += `<rect x="180" y="38" width="124" height="100" rx="6" style="${soft(4, 14)};stroke-width:4"/><rect x="186" y="44" width="112" height="88" rx="4" style="fill:none;stroke:var(--c4);stroke-width:1"/>`;
    s += `<rect x="198" y="56" width="66" height="50" rx="10" style="${soft(3, 22)}"/>` + circ(284, 64, 11, soft(5, 55));
    [[284, 100], [282, 122], [208, 122], [240, 124]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" style="${soft(4, 60)}"/>`; });
    s += tx(78, 24, T("Dyrecelle", "Animal cell"), "fg-b") + tx(242, 24, T("Plantecelle", "Plant cell"), "fg-b");
    s += `<g style="stroke:var(--muted);stroke-width:1"><line x1="78" y1="156" x2="78" y2="106"/><line x1="146" y1="158" x2="180" y2="134"/><line x1="214" y1="158" x2="214" y2="107"/><line x1="290" y1="158" x2="284" y2="128"/></g>`;
    s += tx(78, 170, T("cellekjerne", "nucleus"), "fg-s") + tx(146, 170, T("cellevegg", "cell wall"), "fg-s") + tx(214, 170, T("vakuole", "vacuole"), "fg-s") + tx(310, 170, T("grønnkorn", "chloroplast"), "fg-s", "end");
    return { cap: T("Alle celler har cellekjerne og cellemembran. Planteceller har i tillegg en stiv cellevegg, en stor vakuole og grønnkorn som lager mat.", "All cells have a nucleus and a cell membrane. Plant cells also have a stiff cell wall, a large vacuole and chloroplasts that make food."), svg: s }; },

  gu_reaction: () => { let s = ""; const H = (x, y) => circ(x, y, 8, `fill:var(--card);stroke:var(--ink);stroke-width:1.6`), O = (x, y) => circ(x, y, 12, soft(1, 55));
    s += H(38, 62) + H(54, 62) + H(38, 102) + H(54, 102) + tx(88, 88, "+", "fg-big") + O(116, 82) + O(138, 82) + ar(166, 82, 204, 82, "fg-line", 2.2);
    s += O(240, 60) + H(227, 73) + H(253, 73) + O(284, 98) + H(271, 111) + H(297, 111);
    s += tx(46, 140, "2 H₂", "fg-b") + tx(127, 140, "O₂", "fg-b") + tx(262, 140, "2 H₂O", "fg-b");
    s += tx(160, 166, T("4 H + 2 O før  →  4 H + 2 O etter", "4 H + 2 O before  →  4 H + 2 O after"), "fg-s fg-acct");
    return { cap: T("I en kjemisk reaksjon bytter atomene partner, men ingen atomer forsvinner. Hydrogen og oksygen blir til vann.", "In a chemical reaction the atoms swap partners, but no atoms disappear. Hydrogen and oxygen become water."), svg: s }; },

  gu_speed: () => { let s = tri("s", "v", "t");
    s += tx(186, 44, "v = s / t", "fg-b", "start") + tx(186, 68, "s = v · t", "fg-b", "start") + tx(186, 92, "t = s / v", "fg-b", "start");
    s += tx(186, 126, T("120 km på 2 timer:", "120 km in 2 hours:"), "fg-s", "start") + tx(186, 146, "v = 120 : 2", "fg-s", "start") + col(186, 164, "= 60 km/h", 5, "fg-b", "start");
    return { cap: T("Formeltrekanten: dekk over det du vil finne. Står de to andre ved siden av hverandre, ganger du; står de over hverandre, deler du.", "The formula triangle: cover what you want to find. Side by side means multiply; one above the other means divide."), svg: s }; },

  gu_ohm: () => { let s = tri("U", "R", "I");
    s += tx(186, 44, "U = R · I", "fg-b", "start") + tx(186, 68, "I = U / R", "fg-b", "start") + tx(186, 92, "R = U / I", "fg-b", "start");
    s += tx(186, 126, T("9 V over 3 Ω:", "9 V across 3 Ω:"), "fg-s", "start") + tx(186, 146, "I = 9 : 3", "fg-s", "start") + col(186, 164, "= 3 A", 5, "fg-b", "start");
    return { cap: T("Ohms lov med formeltrekanten: U er spenning (volt), R er resistans (ohm) og I er strøm (ampere).", "Ohm's law with the formula triangle: U is voltage (volts), R is resistance (ohms) and I is current (amperes)."), svg: s }; },

  gu_food: () => { let s = circ(32, 54, 18, `fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2`) + tx(32, 58, T("Sol", "Sun"), "fg-s");
    const B = [[100, T("Gress", "Grass"), T("produsent", "producer"), 4], [180, T("Hare", "Hare"), T("planteeter", "herbivore"), 2], [260, T("Rev", "Fox"), T("rovdyr", "predator"), 1]];
    B.forEach(([x, a, b, c], i) => { s += box(x - 29, 38, 58, 32, c) + tx(x, 59, a, "fg-b") + tx(x, 88, b, "fg-s"); s += ar(i ? x - 51 : 54, 54, x - 31, 54, "fg-line", 1.6);
      s += `<g stroke-dasharray="3 3">${ar(x, 96, x - (x - 160) * 0.4, 126, "fg-mutd", 1.4)}</g>`; });
    s += tx(140, 26, T("energi →", "energy →"), "fg-s fg-acct");
    s += box(50, 128, 220, 32, 5) + tx(160, 149, T("Nedbrytere: sopp og bakterier", "Decomposers: fungi and bacteria"), "fg-b");
    s += tx(160, 176, T("gjør døde planter og dyr om til næring i jorda", "turn dead plants and animals into nutrients"), "fg-s");
    return { cap: T("En næringskjede: energien fra sola går fra gress til hare til rev. Nedbryterne gjør det døde om til næring, så nye planter kan vokse.", "A food chain: energy from the sun passes from grass to hare to fox. Decomposers turn dead matter into nutrients so new plants can grow."), svg: s }; },

  gu_punnett: () => { let s = ""; const x0 = 122, y0 = 46, c = 44, K = [["BB", 2], ["Bb", 2], ["Bb", 2], ["bb", 3]];
    K.forEach(([g, n], k) => { const x = x0 + (k % 2) * c, y = y0 + Math.floor(k / 2) * c; s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" style="fill:var(--card);stroke:var(--ink);stroke-width:1.6"/>` + circ(x + c / 2, y + 14, 7, soft(n, 75)) + tx(x + c / 2, y + 37, g, "fg-b"); });
    s += tx(x0 + 22, 38, "B", "fg-b") + tx(x0 + 66, 38, "b", "fg-b") + tx(x0 - 10, y0 + 27, "B", "fg-b", "end") + tx(x0 - 10, y0 + 71, "b", "fg-b", "end");
    s += tx(x0 + 44, 18, T("mor: Bb", "mother: Bb"), "fg-s") + tx(x0 - 26, y0 + 49, T("far: Bb", "father: Bb"), "fg-s", "end");
    s += col(222, 58, T("B = brune øyne", "B = brown"), 2, "fg-b", "start") + tx(222, 74, T("(dominant)", "(dominant)"), "fg-s", "start");
    s += col(222, 100, T("b = blå øyne", "b = blue"), 3, "fg-b", "start") + tx(222, 116, T("(vikende)", "(recessive)"), "fg-s", "start");
    s += tx(222, 146, T("3 av 4: brune", "3 in 4: brown"), "fg-s", "start") + tx(222, 162, T("1 av 4: blå", "1 in 4: blue"), "fg-s", "start");
    return { cap: T("Krysningsskjema: hvert barn får ett gen fra mor og ett fra far. Har begge foreldrene Bb, er sjansen 1 av 4 for blå øyne.", "Punnett square: each child gets one gene from the mother and one from the father. With two Bb parents, the chance of blue eyes is 1 in 4."), svg: s }; },

  gu_solar: () => { let s = `<path d="M0 26.5 A72 72 0 0 1 0 153.5 Z" style="fill:color-mix(in srgb,var(--gold) 70%,var(--card));stroke:var(--gold-deep);stroke-width:2"/>` + tx(16, 94, T("Sola", "Sun"), "fg-b");
    const P = [[60, 3, T("Merkur", "Mercury"), 1, 1], [82, 5, "Venus", 2, 0], [106, 5.5, T("Jorda", "Earth"), 3, 1], [128, 4, "Mars", 1, 0], [168, 16, "Jupiter", 2, 1], [220, 13, "Saturn", 2, 0], [262, 8, "Uranus", 3, 1], [296, 8, "Neptun", 3, 0]];
    P.forEach(([x, r, l, c, below]) => { if(l === "Saturn") s += `<ellipse cx="${x}" cy="90" rx="${r + 9}" ry="4" style="fill:none;stroke:var(--gold-deep);stroke-width:2"/>`; s += circ(x, 90, r, soft(c, 60));
      s += tx(x, below ? 90 + r + 16 : 90 - r - 8, l === "Neptun" ? T("Neptun", "Neptune") : l, "fg-s"); });
    s += `<path d="M56 140 L56 146 L132 146 L132 140" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>` + tx(94, 162, T("steinplaneter", "rocky planets"), "fg-s");
    s += `<path d="M150 140 L150 146 L306 146 L306 140" style="fill:none;stroke:var(--muted);stroke-width:1.4"/>` + tx(228, 162, T("gasskjemper", "gas giants"), "fg-s");
    return { cap: T("De åtte planetene i rekkefølge fra sola (ikke i riktig størrelse eller avstand). De fire nærmeste er av stein, de fire ytterste er store gasskjemper.", "The eight planets in order from the sun (not to scale). The inner four are rocky, the outer four are giant planets of gas and ice."), svg: s }; }
});

// Figurer til enhetene som kom etter LK20-gjennomgangen (måling, koding, koordinater, sannsynlighet)
Object.assign(FIGS, {
  gs_measure: () => { let s = ""; const X = c => 20 + c * 20;
    s += `<rect x="16" y="34" width="292" height="30" rx="4" style="${soft(2, 28)}"/>`;
    for(let i = 0; i <= 28; i++){ const x = 20 + i * 10, big = i % 2 === 0; s += `<line x1="${x}" y1="34" x2="${x}" y2="${big ? 46 : 41}" style="stroke:var(--ink);stroke-width:${big ? 1.4 : 0.8}"/>`; }
    for(let c = 0; c <= 14; c += 2) s += tx(X(c), 59, String(c), "fg-s");
    s += `<rect x="${X(0)}" y="14" width="${X(9) - X(0) - 14}" height="12" rx="2" style="${soft(4, 55)}"/><polygon points="${X(9) - 14},14 ${X(9)},20 ${X(9) - 14},26" style="${soft(2, 45)}"/>`;
    s += tx(X(9) + 8, 24, "9 cm", "fg-b", "start");
    s += `<rect x="40" y="140" width="100" height="14" rx="4" style="${soft(3, 30)}"/><rect x="52" y="128" width="76" height="6" rx="3" style="fill:var(--ink)"/><line x1="90" y1="134" x2="90" y2="140" style="stroke:var(--ink);stroke-width:3"/>`;
    s += `<rect x="70" y="96" width="40" height="30" rx="6" style="${soft(2, 45)}"/>` + tx(90, 116, "1 kg", "fg-b") + tx(90, 172, "1 kg = 1000 g", "fg-s");
    s += `<polygon points="206,102 226,88 246,102" style="${soft(3, 40)}"/><rect x="206" y="102" width="40" height="52" style="${soft(3, 22)}"/>` + tx(226, 134, "1 L", "fg-b");
    for(let i = 0; i < 10; i++){ const x = 258 + (i % 5) * 10, y = i < 5 ? 112 : 134; s += `<rect x="${x}" y="${y}" width="7" height="16" rx="1.5" style="${soft(3, 40)}"/>`; }
    s += tx(256, 172, "1 L = 10 dL", "fg-s");
    return { cap: T("Mål fra 0 på linjalen: blyanten er 9 cm. En kilo er 1000 gram, og en liter er 10 desiliter.", "Measure from 0 on the ruler: the pencil is 9 cm. A kilo is 1000 grams, and a litre is 10 decilitres."), svg: s }; },

  gs_robot: () => { let s = ""; const c = 30, x0 = 20, y0 = 20, C = (i, j) => [x0 + i * c + c / 2, y0 + j * c + c / 2];
    for(let i = 0; i < 6; i++) for(let j = 0; j < 4; j++) s += `<rect x="${x0 + i * c}" y="${y0 + j * c}" width="${c}" height="${c}" style="fill:${(i + j) % 2 ? "var(--card)" : "color-mix(in srgb,var(--c3) 8%,var(--card))"};stroke:var(--line);stroke-width:1"/>`;
    const [gx, gy] = C(2, 2); s += `<polygon points="${[0, 1, 2, 3, 4].map(k => { const a = -Math.PI / 2 + k * 4 * Math.PI / 5; return `${f1(gx + 11 * Math.cos(a))},${f1(gy + 11 * Math.sin(a))}`; }).join(" ")}" style="fill:var(--gold);stroke:var(--gold-deep);stroke-width:1.2"/>`;
    const [ax, ay] = C(0, 3), [bx] = C(2, 3);
    s += car(ax + 12, ay, bx - 4, ay, 4, 2.4) + car(bx, ay - 4, bx, gy + 14, 4, 2.4);
    s += `<rect x="${ax - 11}" y="${ay - 11}" width="22" height="22" rx="6" style="${soft(5, 60)}"/>` + circ(ax + 3, ay - 4, 2.2, "fill:var(--ink)") + circ(ax + 3, ay + 4, 2.2, "fill:var(--ink)");
    s += tx(x0, 160, T("start", "start"), "fg-s", "start") + tx(gx, 160, T("mål", "goal"), "fg-s");
    [["1", T("gå 2 fram", "move 2"), 4], ["2", T("snu venstre", "turn left"), 2], ["3", T("gå 1 fram", "move 1"), 4]].forEach(([n, l, k], i) => { const y = 34 + i * 36; s += box(214, y, 96, 28, k, 8) + tx(222, y + 19, n + ".", "fg-b", "start") + tx(236, y + 19, l, "fg-s", "start"); });
    s += tx(262, 26, T("Koden", "The code"), "fg-b");
    return { cap: T("Roboten følger koden steg for steg: 2 ruter fram, snu til venstre, 1 rute fram – og den er på stjerna.", "The robot follows the code step by step: 2 squares forward, turn left, 1 square forward – and it is on the star."), svg: s }; },

  gs_coord: () => { let s = ""; const u = 18, O = [100, 92], P = (x, y) => [O[0] + x * u, O[1] - y * u];
    for(let i = -4; i <= 4; i++){ const [x] = P(i, 0); s += `<line class="fg-mut" x1="${x}" y1="${P(0, 3)[1]}" x2="${x}" y2="${P(0, -3)[1]}" stroke-width=".5"/>`; }
    for(let j = -3; j <= 3; j++){ const [, y] = P(0, j); s += `<line class="fg-mut" x1="${P(-4, 0)[0]}" y1="${y}" x2="${P(4, 0)[0]}" y2="${y}" stroke-width=".5"/>`; }
    s += fgAr(P(-4.4, 0)[0], O[1], P(4.6, 0)[0], O[1], "fg-ax", 1.6) + fgAr(O[0], P(0, -3.4)[1], O[0], P(0, 3.6)[1], "fg-ax", 1.6);
    s += tx(P(4.6, 0)[0] + 2, O[1] + 16, "x", "fg-i", "end") + tx(O[0] - 8, P(0, 3.5)[1] + 4, "y", "fg-i", "end");
    const pts = [["A", 3, 2, 4], ["B", -2, -1, 1], ["C", -3, 2, 3], ["D", 2, -2, 5]];
    pts.forEach(([n, x, y, k]) => { const [px, py] = P(x, y); s += circ(px, py, 5, `fill:var(--c${k})`) + col(px + 6, py - 6, n, k, "fg-b", "start"); });
    s += circ(O[0], O[1], 3.5, "fill:var(--ink)");
    pts.forEach(([n, x, y, k], i) => { s += circ(206, 34 + i * 22, 5, `fill:var(--c${k})`) + tx(216, 38 + i * 22, `${n} (${x}, ${y})`.replace(/-/g, "−"), "fg-t", "start"); });
    s += tx(198, 132, T("x: høyre +, venstre −", "x: right +, left −"), "fg-s", "start") + tx(198, 150, T("y: opp +, ned −", "y: up +, down −"), "fg-s", "start");
    return { cap: T("Et punkt (x, y): gå først sidelengs (minus = venstre), så opp eller ned (minus = ned). Midten er origo (0, 0).", "A point (x, y): first go sideways (minus = left), then up or down (minus = down). The middle is the origin (0, 0)."), svg: s }; },

  gs_chance: () => { let s = ""; const X = p => 30 + 260 * p, y = 66;
    s += `<rect x="30" y="${y - 6}" width="260" height="12" rx="6" style="fill:url(#gsch)"/><defs><linearGradient id="gsch"><stop offset="0" stop-color="var(--c1)" stop-opacity=".35"/><stop offset=".5" stop-color="var(--c2)" stop-opacity=".35"/><stop offset="1" stop-color="var(--c4)" stop-opacity=".45"/></linearGradient></defs>`;
    [[0, "0"], [0.5, "½"], [1, "1"]].forEach(([p, l]) => { s += `<line x1="${X(p)}" y1="${y - 10}" x2="${X(p)}" y2="${y + 10}" style="stroke:var(--ink);stroke-width:2"/>` + tx(X(p), y + 26, l, "fg-b"); });
    s += tx(X(0), y + 42, T("umulig", "impossible"), "fg-s") + tx(X(0.5), y + 42, T("like stor sjanse", "even chance"), "fg-s") + tx(X(1), y + 42, T("sikkert", "certain"), "fg-s");
    const ex = [[0, T("terningen viser 7", "die shows 7"), 1, 18], [1 / 6, T("sekser", "a six"), 2, 38], [0.5, T("kron", "heads"), 3, 18], [1, T("sola står opp", "the sun rises"), 4, 38]];
    ex.forEach(([p, l, k, ly]) => { s += circ(X(p), y, 6, `fill:var(--c${k});stroke:var(--card);stroke-width:2`) + `<line x1="${X(p)}" y1="${y - 8}" x2="${X(p)}" y2="${ly + 4}" style="stroke:var(--c${k});stroke-width:1.2"/>` + col(X(p), ly, l, k, "fg-s", p === 0 ? "start" : p === 1 ? "end" : "middle"); });
    s += `<rect x="60" y="128" width="34" height="34" rx="7" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/>` + [[68, 136], [68, 145], [68, 154], [86, 136], [86, 145], [86, 154]].map(([x, yy]) => circ(x, yy, 2.6, "fill:var(--ink)")).join("") + tx(102, 150, T("P(sekser) = 1/6", "P(six) = 1/6"), "fg-s", "start");
    s += circ(210, 145, 17, `fill:color-mix(in srgb,var(--gold) 45%,var(--card));stroke:var(--gold-deep);stroke-width:2`) + tx(210, 149, "kr", "fg-b") + tx(232, 150, T("P(kron) = 1/2", "P(heads) = 1/2"), "fg-s", "start");
    return { cap: T("Sannsynlighet går fra 0 (umulig) til 1 (sikkert). En rettferdig terning gir sekser 1 av 6 ganger, en rettferdig mynt kron 1 av 2 ganger – i det lange løp.", "Probability goes from 0 (impossible) to 1 (certain). A fair die gives a six 1 in 6 times, a fair coin heads 1 in 2 times – in the long run."), svg: s }; }
});
// Kobling til enhetene (finnes med tittel). Flere figurer i én enhet: liste.
const FG = [["GS14", "Måle og veie", "gs_measure"], ["GS14", "Koding: steg for steg", "gs_robot"], ["GS57", "Negative tall og koordinater", "gs_coord"], ["GS57", "Sannsynlighet", "gs_chance"], ["GS14", "Tall og plassverdi", "gs_place"], ["GS14", "Pluss og minus", "gs_numline"], ["GS14", "Gangetabellen", "gs_array"], ["GS14", "Deling", "gs_share"], ["GS14", "Klokka og penger", ["gs_clock", "gs_coins"]], ["GS14", "Former og mønstre", "gs_shapes"],
  ["GS57", "Brøk", "gs_pizza"], ["GS57", "Desimaltall", "gs_decimal"], ["GS57", "Prosent", "gs_percent"], ["GS57", "Areal og omkrets", "gs_area"], ["GS57", "Måling og enheter", "gs_stairs"], ["GS57", "Statistikk", "gs_bars"], ["GS57", "Enkle likninger", "balance"],
  ["GU810", "Tall og regnerekkefølge", "gu_order"], ["GU810", "Brøk, prosent og vekstfaktor", "pct_growth"], ["GU810", "Potenser og kvadratrøtter", "pow_sq"], ["GU810", "Algebra og likninger", "gu_solve"], ["GU810", "Lineære funksjoner", "gu_line"], ["GU810", "Geometri", "gu_pyth"], ["GU810", "Sannsynlighet og statistikk", "gu_bag"], ["GU810", "Privatøkonomi", "gu_budget"],
  ["GSNAT", "Kroppen", "gs_heart"], ["GSNAT", "Planter og dyr", "gs_photo"], ["GSNAT", "Stoffer og tilstander", "gs_states"], ["GSNAT", "Vær og klima", "gs_water"], ["GSNAT", "Jorda og verdensrommet", "gs_daynight"], ["GSNAT", "Elektrisitet og magneter", "gs_circuit"],
  ["GUNAT", "Celler og kroppen", "gu_cell"], ["GUNAT", "Kjemi: atomer og reaksjoner", "gu_reaction"], ["GUNAT", "Krefter, fart og energi", "gu_speed"], ["GUNAT", "Elektrisitet", "gu_ohm"], ["GUNAT", "Økologi og klima", "gu_food"], ["GUNAT", "Genetikk og evolusjon", "gu_punnett"], ["GUNAT", "Universet", "gu_solar"]];
globalThis.GSF = { soft, solid, box, tx, col, ar, car, circ, f1, frac, sector, pizza, hops, numline }; // brukes av figs_lf.js
for(const [code, title, name] of FG){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) FIG_MAP[code + ":" + u] = name; }
})();
