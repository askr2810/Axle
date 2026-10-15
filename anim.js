// ============================================================
//  ANIMASJONER – kodede undervisningsfilmer (arbeidsmåte og regler: docs/ANIMASJONER.md, manus: docs/animasjoner/<id>.md).
//  Alt i bildet regnes ut fra ett tidspunkt t (sekunder): kamera, kurve, punkter, h, sekant, tangent og tekst. Derfor er bevegelsen
//  kontinuerlig, hopp i tidslinjen gir alltid samme bilde, og alt kan testes uten nettleser (tools/test_anim.js).
//  Lyd: ferdige lydfiler per replikk i anim/<id>/<lang>/ (laget én gang med tools/anim_voice.mjs, aldri i appen),
//  eller valgfri opplesing med stemmen på enheten (samme som «Lytt»). Animasjonen fungerer like godt uten lyd.
//  Visning: egen skjerm #/animasjon/<id>, et kort i teorien (![anim:<id>]) og i Labben (LABS i lab.js).
// ============================================================
const AN_E = {
  io: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,            // myk start og stopp
  out: t => 1 - Math.pow(1 - t, 3),
  back: t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }, // litt over og tilbake (punkter som dukker opp)
  lin: t => t
};
const anClamp = (v, a, b) => Math.max(a, Math.min(b, v));
// fremdrift mellom to tidspunkter, med kurve
const anSeg = (t, a, b, e) => { const p = anClamp((t - a) / ((b - a) || 1e-9), 0, 1); return (e || AN_E.io)(p); };
// nøkkelverdier [[tid, verdi, kurve?], …]: verdien glir fra forrige nøkkel med kurven til nøkkelen
function anTrack(t, keys){
  if(t <= keys[0][0]) return keys[0][1];
  for(let i = 1; i < keys.length; i++){ const [t1, v1, e] = keys[i], [t0, v0] = keys[i - 1]; if(t <= t1) return v0 + (v1 - v0) * anSeg(t, t0, t1, e); }
  return keys[keys.length - 1][1];
}
const anNum = (n, d) => { const s = (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d); return LANG === "en" ? s : s.replace(".", ","); };

// ---------------- Fra sekant til tangent (f(x) = x², stigningen ved x = 3 er 6) ----------------
const ANIMS = {};
ANIMS.derivasjon = (() => {
  const f = x => x * x, P0 = [3, 9];
  // Replikkene: tid d (s) og fortellertekst. Bevegelsen i hver replikk er ferdig før replikken slutter, så lyd som varer litt lenger
  // bare holder bildet stille. s = scene. wait = tenkepause (venter på eleven).
  const L = [
    { s: 0, d: 8, vo: ["Her er grafen til f av x lik x i andre. Jo lenger mot høyre, jo brattere blir den.", "Here is the graph of f of x equals x squared. The further right we go, the steeper it gets."] },
    { s: 0, d: 8, vo: ["Vi ser på punktet P der x er 3. Høyden der er 3 i andre, altså 9.", "We look at the point P where x is 3. The height there is 3 squared, which is 9."] },
    { s: 0, d: 7, vo: ["Men hvor bratt er kurven akkurat i P? En kurve har ingen fast stigning.", "But how steep is the curve exactly at P? A curve has no single slope."] },
    { s: 1, d: 11, vo: ["Vi velger et punkt Q til, der x er 5, og trekker en rett linje gjennom P og Q. Den kalles en sekant.", "We pick another point Q, where x is 5, and draw a straight line through P and Q. It is called a secant."] },
    { s: 1, d: 10, vo: ["Fra P til Q går linjen 2 bort og 16 opp. Stigningen er 16 delt på 2, altså 8.", "From P to Q the line goes 2 across and 16 up. The slope is 16 divided by 2, which is 8."] },
    { s: 1, d: 10, vo: ["Men sekanten skjærer gjennom kurven. 8 er et gjennomsnitt mellom x lik 3 og x lik 5, ikke stigningen i P.", "But the secant cuts through the curve. 8 is an average between x equals 3 and x equals 5, not the slope at P."] },
    { s: 2, d: 9, wait: true, vo: ["Hva skjer med stigningen hvis Q flyttes nærmere P? Tenk deg om, og trykk Fortsett.", "What happens to the slope if Q moves closer to P? Think about it, then press Continue."] },
    { s: 3, d: 11, vo: ["Vi lar Q gli mot P. Avstanden bort kaller vi h. Se hvordan sekanten dreier og blir slakere.", "We let Q slide towards P. We call the distance across h. Watch the secant turn and get less steep."] },
    { s: 3, d: 12, vo: ["Når h er 1, er stigningen 7. Når h er en halv, er den 6,5. Når h er en tidel, er den 6,1.", "When h is 1, the slope is 7. When h is a half, it is 6.5. When h is a tenth, it is 6.1."] },
    { s: 3, d: 10, vo: ["Tallene nærmer seg 6. Den stiplede grønne linjen viser hvor sekanten er på vei: mot tangenten.", "The numbers approach 6. The dashed green line shows where the secant is heading: towards the tangent."] },
    { s: 4, d: 9, vo: ["Når h nesten er null, faller sekanten sammen med tangenten. Den berører kurven i P uten å skjære gjennom.", "When h is almost zero, the secant merges with the tangent. It touches the curve at P without cutting through."] },
    { s: 4, d: 11, vo: ["Tangenten går 6 opp for hver 1 bort. Stigningen i P er altså 6. Den kaller vi f derivert av 3.", "The tangent goes 6 up for every 1 across. So the slope at P is 6. We call it f prime of 3."] },
    { s: 5, d: 14, vo: ["Algebraen sier det samme. Stigningen til sekanten er f av 3 pluss h minus 9, delt på h. Det forkortes til 6 pluss h, som går mot 6.", "The algebra says the same. The slope of the secant is f of 3 plus h minus 9, divided by h. That simplifies to 6 plus h, which tends to 6."] },
    { s: 6, d: 14, vo: ["Flytter vi punktet langs kurven, følger tangenten med. Ved x lik 1 er stigningen 2, ved 2 er den 4, og ved 4 er den 8.", "If we move the point along the curve, the tangent follows. At x equals 1 the slope is 2, at 2 it is 4, and at 4 it is 8."] },
    { s: 6, d: 10, vo: ["Stigningen er alltid det dobbelte av x. Derfor er den deriverte av x i andre lik 2x, og f derivert av 3 er 6.", "The slope is always twice x. That is why the derivative of x squared is 2x, and f prime of 3 is 6."] },
    { s: 7, d: 9, vo: ["Den deriverte er stigningen til tangenten: grensen for sekantens stigning når h går mot null.", "The derivative is the slope of the tangent: the limit of the secant's slope as h goes to zero."] }
  ];
  const S = [["Kurven og punktet", "The curve and the point"], ["Sekanten", "The secant"], ["Tenk selv", "Think first"], ["Mot grensen", "Towards the limit"],
    ["Tangenten", "The tangent"], ["Regnestykket", "The calculation"], ["Overalt på kurven", "Everywhere on the curve"], ["Oppsummert", "Summary"]];
  L.forEach((l, i) => l.id = "l" + String(i).padStart(2, "0"));
  let acc = 0; for(const l of L){ l.t0 = acc; acc += l.d; }
  const END = acc, A = (i, p) => L[i].t0 + L[i].d * p; // tid inne i replikk i

  // h (avstanden fra P til Q) glir kontinuerlig og stopper mykt ved tallene fortelleren nevner: 2 → 1 → 0,5 → 0,1 → 0,01
  const H = [[A(7, 0.2), 2], [A(7, 0.95), 1], [A(8, 0.3), 1], [A(8, 0.42), 0.5], [A(8, 0.62), 0.5], [A(8, 0.76), 0.1], [A(9, 0.3), 0.1], [A(9, 0.85), 0.01]];
  const hAt = t => anTrack(t, H);
  // kameraet: vinduet [x0, x1, y0, y1] i verdenskoordinater. Rolig inn mot P mens h går mot 0, og ut igjen.
  const CAMW = { wide: [-0.9, 6.3, -2.6, 30.5], narrow: [-0.7, 5.6, -2.6, 31] }, ZOOM = [1.75, 4.45, 3.2, 15.8];
  const camAt = (t, lay) => { const w = CAMW[lay], z = state(t).zoom; return w.map((v, k) => v + (ZOOM[k] - v) * z); };
  // tangentpunktet i scenen «Overalt»: 3 → 1 → 2 → 4 → 3, stopper ved hvert punkt fortelleren nevner
  const XT = [[A(13, 0.05), 3], [A(13, 0.28), 1], [A(13, 0.4), 1], [A(13, 0.55), 2], [A(13, 0.66), 2], [A(13, 0.86), 4], [A(14, 0.1), 4], [A(14, 0.45), 3]];

  // Alt som vises ved tid t (tall mellom 0 og 1 er synlighet). Brukes av tegningen og testene.
  function state(t){
    const o = (a, b, c, d) => anSeg(t, a, b) * (c == null ? 1 : 1 - anSeg(t, c, d));
    const s = {
      t, h: hAt(t), xT: anTrack(t, XT),
      axes: 1, curve: anSeg(t, A(0, 0.12), A(0, 0.7)), fLab: o(A(0, 0.6), A(0, 0.8), A(12, 0), A(12, 0.15)),
      P: anSeg(t, A(1, 0.05), A(1, 0.22), AN_E.back), guideV: o(A(1, 0.22), A(1, 0.45), A(2, 0.05), A(2, 0.3)), guideH: o(A(1, 0.45), A(1, 0.68), A(2, 0.05), A(2, 0.3)),
      ring: t >= A(2, 0.15) && t <= A(2, 0.95) ? Math.sin(anSeg(t, A(2, 0.15), A(2, 0.95), AN_E.lin) * Math.PI) : 0,
      Q: anSeg(t, A(3, 0.12), A(3, 0.28), AN_E.back) * (1 - anSeg(t, A(10, 0.2), A(10, 0.45))),
      sec: anSeg(t, A(3, 0.32), A(3, 0.72)) * (1 - anSeg(t, A(10, 0.25), A(10, 0.6))), secLab: o(A(3, 0.68), A(3, 0.85), A(7, 0.1), A(7, 0.3)),
      tri: o(A(4, 0.05), A(4, 0.3), A(12, 0), A(12, 0.12)) * (1 - anSeg(t, A(9, 0.5), A(9, 0.75))), triRise: anSeg(t, A(4, 0.3), A(4, 0.55)), hMode: anSeg(t, A(7, 0.05), A(7, 0.25)),
      arc: o(A(5, 0.05), A(5, 0.3), A(5, 0.8), A(6, 0.1)),
      ghost: anSeg(t, A(9, 0.1), A(9, 0.4)) * (1 - anSeg(t, A(10, 0.3), A(10, 0.5))),
      tan: anSeg(t, A(10, 0.25), A(10, 0.55)) * (1 - anSeg(t, A(12, 0), A(12, 0.1))) + anSeg(t, A(13, 0), A(13, 0.05)) * (t >= A(13, 0) ? 1 : 0),
      tanLab: o(A(10, 0.5), A(10, 0.7), A(11, 0), A(11, 0.15)),
      tanTri: o(A(11, 0.05), A(11, 0.35), A(12, 0), A(12, 0.1)) + o(A(15, 0.3), A(15, 0.5)),
      dim: o(A(12, 0), A(12, 0.1), A(13, 0), A(13, 0.06)), alg: t >= A(12, 0) && t < A(13, 0.08) ? anTrack(t, [[A(12, 0.12), 0], [A(12, 0.2), 1], [A(12, 0.3), 2], [A(12, 0.48), 3], [A(12, 0.66), 4], [A(12, 0.82), 5]]) : 0,
      zoom: anTrack(t, [[A(8, 0.55), 0], [A(9, 0.9), 1], [A(10, 0.45), 1], [A(10, 0.95), 0]]),
      follow: t >= A(13, 0) && t < A(15, 0), fan: anSeg(t, A(15, 0.05), A(15, 0.35)),
      cam: null
    };
    if(t >= A(13, 0)) s.Q = 0;
    if(t >= A(15, 0)){ s.tan = 1; s.xT = 3; }
    return s;
  }
  // levende tekst under bildet: [hovedlinje (HTML), liten linje]
  function hud(t){
    const s = state(t), h = s.h, m = 6 + h, i = L.findIndex((l, k) => t < (L[k + 1] ? L[k + 1].t0 : END + 1));
    const v = (x, c) => `<b class="an-${c}">${x}</b>`, fx = "<i>f</i>(<i>x</i>) = <i>x</i>²";
    if(i <= 0) return [fx, T("Grafen til en parabel", "The graph of a parabola")];
    if(i === 1) return [`P = (3, ${v(9, "ink")})`, `<i>f</i>(3) = 3² = 9`];
    if(i === 2) return [T("Hvor bratt er kurven akkurat i P?", "How steep is the curve exactly at P?"), T("En rett linje har én stigning. En kurve har ikke det.", "A straight line has one slope. A curve does not.")];
    if(i === 3) return [`Q = (5, ${v(25, "sec")})`, T("en rett linje gjennom P og Q: en sekant", "a straight line through P and Q: a secant")];
    if(i <= 5) return [`${T("stigning", "slope")} = ${v("16", "pur")} / ${v("2", "pur")} = ${v("8", "sec")}`, i === 5 ? T("gjennomsnitt fra x = 3 til x = 5", "average from x = 3 to x = 5") : `Q = (5, 25)`];
    if(i === 6) return [T("Hva skjer når Q nærmer seg P?", "What happens as Q moves towards P?"), T("Tenk selv før du trykker Fortsett.", "Think first, then press Continue.")];
    if(i <= 10) return [`<i>h</i> = ${v(anNum(h, 2), "pur")} &nbsp; ${T("stigning", "slope")} = 6 + <i>h</i> = ${v(anNum(m, 2), "sec")}`, i >= 9 ? T("nærmer seg 6", "approaching 6") : T("stigningen til sekanten", "the slope of the secant")];
    if(i === 11) return [`${T("stigning", "slope")} = ${v("6", "tan")} / ${v("1", "tan")} = ${v("6", "tan")}`, `<i>f</i>′(3) = 6`];
    if(i === 12) return [`6 + <i>h</i> → ${v("6", "tan")} ${T("når", "as")} <i>h</i> → 0`, T("samme svar som bildet", "the same answer as the picture")];
    if(i === 13){ const x = s.xT; return [`<i>x</i> = ${v(anNum(x, 1), "ink")} &nbsp; ${T("stigning", "slope")} = ${v(anNum(2 * x, 1), "tan")}`, T("stigningen er det dobbelte av x", "the slope is twice x")]; }
    if(i === 14) return [`<i>f</i>′(<i>x</i>) = ${v("2<i>x</i>", "tan")} &nbsp; <i>f</i>′(3) = 2 · 3 = ${v("6", "tan")}`, T("den deriverte av x²", "the derivative of x²")];
    return [`<i>f</i>′(3) = ${v("6", "tan")}`, T("stigningen til tangenten = grensen for sekantens stigning", "slope of the tangent = limit of the secant's slope")];
  }
  return {
    id: "derivasjon", t: ["Fra sekant til tangent", "From secant to tangent"],
    sub: ["Hva den deriverte er: stigningen i ett punkt, vist med f(x) = x²", "What the derivative is: the slope at one point, shown with f(x) = x²"],
    lines: L, scenes: S, end: END, at: A, state, hud, hAt, camAt, f, P0,
    poster: () => A(9, 0.6),
    units: [["VG1T", "Derivasjon og vekstfart"], ["VGR1", "Derivasjon og drøfting"], ["GMAT", "Innføring i derivasjon"], ["MEK1000", "Derivasjon"], ["VGS1", "Derivasjon og optimering"]],
    check: { q: ["Hva er f′(5) når f(x) = x²?", "What is f′(5) when f(x) = x²?"], opts: ["10", "25", "8", "5"], ans: 0,
      why: ["f′(x) = 2x, så f′(5) = 2 · 5 = 10. 25 er funksjonsverdien f(5), ikke stigningen. 8 er stigningen til sekanten fra x = 3 til x = 5. 5 glemmer faktoren 2.",
            "f′(x) = 2x, so f′(5) = 2 · 5 = 10. 25 is the function value f(5), not the slope. 8 is the slope of the secant from x = 3 to x = 5. 5 forgets the factor 2."] }
  };
})();

// ---------------- tegning ----------------
// To oppsett: «narrow» (mobil, høyere bilde) og «wide» (PC). Teksten har fast størrelse i viewBox, så den blir 14–20 px på skjermen.
const AN_LAY = { wide: { W: 720, H: 405, g: [58, 16, 646, 352], fs: 17 }, narrow: { W: 400, H: 400, g: [44, 12, 344, 352], fs: 17 } };
function anSVG(id, t, lay){
  const D = ANIMS[id], s = D.state(t), Lo = AN_LAY[lay], [gx, gy, gw, gh] = Lo.g, fs = Lo.fs;
  const [x0, x1, y0, y1] = D.camAt(t, lay), f = D.f;
  const X = x => gx + (x - x0) / (x1 - x0) * gw, Y = y => gy + gh - (y - y0) / (y1 - y0) * gh, n1 = v => v.toFixed(1);
  // tegneflaten for linjer og kurve: grafen, men over raden med tallene på x-aksen
  const yb = Math.min(gy + gh, Y(0) + 1, gy + gh - fs - 8);
  // klipper et linjestykke til tegneflaten (Liang–Barsky), så bare det som synes tegnes
  const clipSeg = (ax, ay, bx, by) => { let t0 = 0, t1 = 1; const dx = bx - ax, dy = by - ay;
    for(const [p, q] of [[-dx, ax - gx], [dx, gx + gw - ax], [-dy, ay - gy], [dy, yb - ay]]){ if(p === 0){ if(q < 0) return null; continue; } const r = q / p; if(p < 0){ if(r > t1) return null; if(r > t0) t0 = r; } else { if(r < t0) return null; if(r < t1) t1 = r; } }
    return [ax + t0 * dx, ay + t0 * dy, ax + t1 * dx, ay + t1 * dy]; };
  const op = (v, inner) => v <= 0.001 ? "" : v >= 0.999 ? inner : `<g opacity="${v.toFixed(3)}">${inner}</g>`;
  const txt = (x, y, str, cls, anchor) => `<text x="${n1(x)}" y="${n1(y)}" class="${cls || ""}"${anchor ? ` text-anchor="${anchor}"` : ""}>${str}</text>`;
  const line = (xa, ya, xb, yb, cls, extra) => `<line x1="${n1(xa)}" y1="${n1(ya)}" x2="${n1(xb)}" y2="${n1(yb)}" class="${cls}"${extra || ""}/>`;
  const dot = (x, y, r, cls, sc) => `<circle cx="${n1(X(x))}" cy="${n1(Y(y))}" r="${(r * (sc == null ? 1 : sc)).toFixed(2)}" class="${cls}"/>`;
  // en rett linje y = y0' + m (x − xa) over hele vinduet, klippet til grafen; draw (0–1) lar den vokse ut fra punktet
  const ray = (xa, ya, m, cls, draw = 1) => { const span = (x1 - x0) * 1.2 * draw, xa0 = xa - span, xb = xa + span, c = clipSeg(X(xa0), Y(ya + m * (xa0 - xa)), X(xb), Y(ya + m * (xb - xa))); return c ? line(c[0], c[1], c[2], c[3], cls) : ""; };
  const dim = 1 - s.dim;
  let g = "";
  // rutenett og akser
  const tick = (a, b, step) => { const out = []; for(let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(+v.toFixed(6)); return out; };
  const sx = (x1 - x0) > 4 ? 1 : 0.5, sy = (y1 - y0) > 16 ? 5 : 2;
  let grid = "", ax = "";
  for(const v of tick(x0, x1, sx)) if(Math.abs(v) > 1e-9){ grid += line(X(v), gy, X(v), gy + gh, "an-grid"); if(Number.isInteger(v) && !(v === 3 && s.guideV > 0)) ax += txt(X(v), Math.min(gy + gh - 4, Math.max(gy + 14, Y(0) + fs + 2)), v, "an-tk", "middle"); }
  for(const v of tick(y0, y1, sy)) if(Math.abs(v) > 1e-9){ grid += line(gx, Y(v), gx + gw, Y(v), "an-grid"); if((v % 5 === 0 || sy < 5) && !(Math.abs(v - 9) < 2.5 && s.guideH > 0)) ax += txt(Math.max(30, Math.min(gx + gw - 4, X(0) - 7)), Y(v) + fs * 0.35, v, "an-tk", "end"); }
  const axis = (x0 <= 0 && x1 >= 0 ? line(X(0), gy, X(0), gy + gh, "an-ax") : "") + (y0 <= 0 && y1 >= 0 ? line(gx, Y(0), gx + gw, Y(0), "an-ax") : "");
  if(s.dim > 0.999) return anWrap(D, Lo, gx, gy, gw, gh, anAlg(s, Lo, lay, txt));
  if(dim <= 0.001) return anWrap(D, Lo, gx, gy, gw, gh, "");
  g += op(s.axes * dim, grid + axis + ax);
  // kurven (tegnes inn fra venstre), og buen mellom P og Q som framheves i scenen «gjennomsnitt»
  // kurven: bare punktene inne i tegneflaten (med et nøyaktig endepunkt på kanten)
  const cur = (xa, xb, cls) => { let d = "", pen = false, prev = null; const n = 120;
    for(let k = 0; k <= n; k++){ const x = xa + (xb - xa) * k / n, p = [X(x), Y(f(x))], inside = p[0] >= gx - 1e-6 && p[0] <= gx + gw + 1e-6 && p[1] >= gy && p[1] <= yb;
      if(inside){ if(!pen && prev){ const c = clipSeg(prev[0], prev[1], p[0], p[1]); d += c ? `M${n1(c[0])} ${n1(c[1])}L${n1(p[0])} ${n1(p[1])}` : `M${n1(p[0])} ${n1(p[1])}`; } else d += (pen ? "L" : "M") + n1(p[0]) + " " + n1(p[1]); pen = true; }
      else if(pen){ const c = clipSeg(prev[0], prev[1], p[0], p[1]); if(c) d += `L${n1(c[2])} ${n1(c[3])}`; pen = false; }
      prev = p; }
    return d ? `<path d="${d}" class="${cls}"/>` : ""; };
  const xr = x0 + (Math.min(x1, Math.sqrt(Math.max(0, y1)) + 0.2) - x0) * s.curve;
  if(s.curve > 0) g += op(dim, cur(x0, xr, "an-cv"));
  const h = s.h, Q = [3 + h, f(3 + h)], m = (f(3 + h) - 9) / h;
  if(s.arc > 0) g += op(s.arc * dim, cur(3, 3 + h, "an-arc"));
  // navnet på kurven: på venstre side av kurven, der ingen linjer går (skjules når kameraet er nær P)
  const fz = Math.max(0, 1 - 4 * s.zoom);
  if(s.fLab > 0 && fz > 0){ const lx = 2.05; g += op(s.fLab * dim * fz, txt(X(lx) - 14, Y(f(lx)) - 2, "f(x) = x²", "an-lab an-cvt", "end")); }
  // hjelpelinjer til aksene: x = 3 og f(3) = 9
  if(s.guideV > 0) g += op(s.guideV, line(X(3), Y(0), X(3), Y(9 * s.guideV), "an-guide") + txt(X(3), Y(0) + fs + 2, "3", "an-lab an-ink", "middle"));
  if(s.guideH > 0) g += op(s.guideH, line(X(3), Y(9), X(3) + (X(0) - X(3)) * s.guideH, Y(9), "an-guide") + txt(X(0) - 8, Y(9) + fs * 0.35, "9", "an-lab an-ink", "end") + txt(X(3) + 10, Y(4.5) + 5, "f(3) = 9", "an-lab an-mut", "start"));
  // svake sekanter som en vifte i oppsummeringen: de nærmer seg tangenten
  if(s.fan > 0) for(const hh of [2, 1, 0.5]) g += op(s.fan * 0.32, ray(3, 9, 6 + hh, "an-sec an-thin"));
  // stiplet grønn tangent som «mål» mens h går mot 0
  if(s.ghost > 0) g += op(s.ghost * 0.9, ray(3, 9, 6, "an-tan an-dash"));
  // sekanten gjennom P og Q
  if(s.sec > 0) g += op(Math.min(1, s.sec * 3) * dim, ray(3, 9, m, "an-sec", s.sec));
  if(s.secLab > 0){ const xl = Math.min(3 + (y0 + 0.62 * (y1 - y0) - 9) / m, x1 - 0.8); g += op(s.secLab, txt(X(xl) - 12, Y(9 + m * (xl - 3)) - 6, T("sekant", "secant"), "an-lab an-sect", "end")); }
  // tangenten: i P, eller i et punkt som følger kurven («Overalt»)
  const xT = s.follow ? s.xT : 3, mT = 2 * xT;
  if(s.tan > 0) g += op(Math.min(1, s.tan) * dim, ray(xT, f(xT), mT, "an-tan"));
  if(s.tanLab > 0){ const xl = Math.min(4.35, x1 - 0.9); g += op(s.tanLab, txt(X(xl) + 10, Y(9 + 6 * (xl - 3)) + fs, "tangent", "an-lab an-tant", "start")); }
  // stigningstrekanten for sekanten: «bort» (h) og «opp» (f(3+h) − 9)
  if(s.tri > 0 && h > 0.004){
    const xa = X(3), xb = X(3 + h), ya = Y(9), yb = Y(Q[1]), r = s.triRise, mode = s.hMode;
    let tri = line(xa, ya, xb, ya, "an-tri") + (r > 0 ? line(xb, ya, xb, ya + (yb - ya) * r, "an-tri") : "");
    const runLab = mode < 0.5 ? T("2 bort", "2 across") : "h", riseLab = mode < 0.5 ? T("16 opp", "16 up") : T("opp", "up");
    if(xb - xa > 18) tri += txt((xa + xb) / 2, ya + fs + 4, runLab, "an-lab an-purt", "middle");
    // «opp» til høyre for streken; får den ikke plass (smal skjerm), står den på innsiden, lavt i trekanten der det er fritt mellom kurven og streken
    const room = gx + gw - (xb + 8), wLab = riseLab.length * fs * 0.62;
    if(r > 0.6 && ya - yb > 26) tri += op((r - 0.6) / 0.4, room >= wLab ? txt(xb + 8, (ya + yb) / 2 + fs * 0.35, riseLab, "an-lab an-purt", "start") : txt(xb - 8, ya - (ya - yb) * 0.22, riseLab, "an-lab an-purt", "end"));
    g += op(s.tri * dim, tri);
  }
  // tangenttrekanten: 1 bort og 6 opp fra P
  if(s.tanTri > 0){
    const a = Math.min(1, s.tanTri), xa = X(3), xb = X(4), ya = Y(9), yb = Y(15);
    g += op(a * dim, `<path d="M${n1(xa)} ${n1(ya)}L${n1(xb)} ${n1(ya)}L${n1(xb)} ${n1(yb)}Z" class="an-tanfill"/>` + line(xa, ya, xb, ya, "an-tri an-trig") + line(xb, ya, xb, yb, "an-tri an-trig")
      + txt((xa + xb) / 2, ya + fs + 4, T("1 bort", "1 across"), "an-lab an-tant", "middle") + txt(xb + 8, (ya + yb) / 2 + fs * 0.35, T("6 opp", "6 up"), "an-lab an-tant", "start"));
  }
  // punktene: Q (oransje) og P (mørk), med en lys ring rundt P når spørsmålet stilles
  if(s.Q > 0 && h > 0.03){ g += op(Math.min(1, s.Q) * dim, dot(Q[0], Q[1], 6.5, "an-q", s.Q) + (h > 0.35 ? txt(X(Q[0]) - 10, Y(Q[1]) - 9, "Q", "an-lab an-sect", "end") : "")); }
  if(s.ring > 0) g += `<circle cx="${n1(X(3))}" cy="${n1(Y(9))}" r="${(9 + 13 * s.ring).toFixed(1)}" class="an-ring" opacity="${(0.55 * s.ring).toFixed(2)}"/>`; // myk glorie som pulserer rundt P
  if(s.follow){ g += dot(xT, f(xT), 6.5, "an-p2"); }
  if(s.P > 0) g += op(dim, dot(3, 9, 7, "an-p", s.P) + op(Math.min(1, s.P), txt(X(3) - 11, Y(9) - 10, "P", "an-lab an-ink", "end")));
  return anWrap(D, Lo, gx, gy, gw, gh, g);
}
// regnestykket (scene «Regnestykket»): linje for linje, med samme farger som i bildet; grafen er tonet helt ut
function anAlg(s, Lo, lay, txt){
  const [gx, gy, gw, gh] = Lo.g, wide = lay === "wide", hh = '<tspan class="an-purt">h</tspan>', six = '<tspan class="an-tant">6</tspan>';
  const R = [`${T("stigning", "slope")} = (f(3 + ${hh}) − f(3)) / ${hh}`, `= ((3 + ${hh})² − 9) / ${hh}`, `= (6${hh} + ${hh}²) / ${hh}`, `= ${six} + ${hh}`, `→ ${six} ${T("når", "as")} ${hh} → 0`];
  const dy = wide ? 56 : 58, lx = gx + (wide ? gw * 0.2 : 8), ly = gy + (gh - dy * (R.length - 1)) / 2 + 6; let g = "";
  R.forEach((r, k) => { const v = anClamp(s.alg - k, 0, 1); if(v > 0) g += `<g opacity="${v.toFixed(3)}" transform="translate(0 ${((1 - v) * 12).toFixed(1)})">` + txt(lx, ly + k * dy, r, "an-alg" + (k >= 3 ? " an-algk" : "") + (wide ? "" : " an-algn"), "start") + "</g>"; });
  return g;
}
// linjene klippes til grafen og stopper over raden med tallene på x-aksen (yb = nedre kant)
const anWrap = (D, Lo, gx, gy, gw, gh, g, yb) => `<svg class="an-svg" viewBox="0 0 ${Lo.W} ${Lo.H}" role="img" aria-label="${esc(T(D.t[0], D.t[1]))}"><defs><clipPath id="an-clip"><rect x="${gx}" y="${gy}" width="${gw}" height="${((yb == null ? gy + gh : yb) - gy).toFixed(1)}"/></clipPath></defs>${g}</svg>`;

// ---------------- avspilleren ----------------
// AN.st: tid, avspilling, lyd («off» | «file» | «device»), teksting, trinnmodus (redusert bevegelse), tenkepause og slutt.
let AN = null;
const AN_AUDIO = {}; // id → { nb: { l00: { file, dur } … } } fra anim/<id>/manifest.json (finnes bare når en ferdig innspilling er publisert)
const anLay = () => { const el = document.querySelector(".an-stage"), w = el ? el.clientWidth : innerWidth; return w < 560 ? "narrow" : "wide"; };
const anReduce = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const anFmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function anLineAt(D, t){ for(let i = D.lines.length - 1; i >= 0; i--) if(t >= D.lines[i].t0 - 1e-9) return i; return 0; }
function anOpen(id, from, quiet){
  if(!ANIMS[id]) id = "derivasjon";
  if(AN) anStop();
  AN = { id, from: from || screen || "home", t: 0, playing: false, waitAt: -1, done: false, cc: S.anCC !== false, snd: S.anSnd || "off", step: anReduce(), raf: 0, last: 0, hold: false, spoke: -1, picked: null };
  anLoadAudio(id); overlay = null; screen = "anim"; if(!quiet){ render(); window.scrollTo(0, 0); }
}
function anLoadAudio(id){
  if(AN_AUDIO[id] !== undefined) return; AN_AUDIO[id] = null;
  try{ fetch(`anim/${id}/manifest.json`, { cache: "no-cache" }).then(r => r.ok ? r.json() : null).then(m => { if(!m) return; AN_AUDIO[id] = m; if(AN && AN.id === id && screen === "anim") anRefresh(true); }).catch(() => {}); }catch(e){}
}
const anFiles = () => { const m = AN && AN_AUDIO[AN.id]; return m && m[LANG] ? m[LANG] : null; };
function renderAnim(){
  const D = ANIMS[AN.id];
  const uses = D.units.map(([code, title]) => { const c = COURSE(code), u = c ? c.units.findIndex(x => x.title === title) : -1; return c && u >= 0 && inMyStudies(c) ? `<button class="bk-hit" data-a="bkunit" data-c="${code}" data-u="${u}"><small>${esc(courseName(c))}</small><b>${esc(unitTitle(c, u))}</b></button>` : ""; }).join("");
  const sndOpts = [["off", T("Av", "Off")], ...(anFiles() ? [["file", T("Fortellerstemme", "Narrator")]] : []), ...(typeof TTS_OK !== "undefined" && TTS_OK ? [["device", T("Les opp (enhetens stemme)", "Read aloud (device voice)")]] : [])];
  if(!sndOpts.some(o => o[0] === AN.snd)) AN.snd = "off";
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="anback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Animasjon", "Animation"))}</small><b>${esc(T(D.t[0], D.t[1]))}</b></div></div></div>
  <main class="wrap an-main">
    <p class="an-sub">${esc(T(D.sub[0], D.sub[1]))}</p>
    <section class="an-player" aria-label="${esc(T("Animasjon", "Animation"))}">
      <p class="an-scene" id="an-scene" aria-live="polite"></p>
      <div class="an-stage" id="an-stage"></div>
      <div class="an-hud" id="an-hud" aria-hidden="true"><b id="an-hud1"></b><small id="an-hud2"></small></div>
      <p class="an-wait" id="an-wait" hidden></p>
      <div class="an-ctl">
        <button class="an-play" id="an-play" data-a="anplay" aria-pressed="false"></button>
        <button class="an-btn" data-a="anprev" id="an-prev"></button>
        <button class="an-btn" data-a="annext" id="an-next"></button>
      </div>
      <div class="an-tl"><input type="range" id="an-time" min="0" max="${Math.round(D.end * 10)}" step="1" value="0" aria-label="${esc(T("Tidslinje", "Timeline"))}"><span id="an-clock" aria-hidden="true"></span></div>
      <p class="an-cap" id="an-cap" aria-live="polite"></p>
      <div class="an-opts">
        <label><input type="checkbox" id="an-cc" ${AN.cc ? "checked" : ""}> ${esc(T("Teksting", "Captions"))}</label>
        <label><input type="checkbox" id="an-step" ${AN.step ? "checked" : ""}> ${esc(T("Trinnvis", "Step by step"))}</label>
        <label class="an-snd">${esc(T("Lyd", "Sound"))} <select id="an-snd">${sndOpts.map(([v, l]) => `<option value="${v}" ${v === AN.snd ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label>
      </div>
    </section>
    <section class="an-check" id="an-check" hidden aria-labelledby="an-chk-h"></section>
    <details class="an-tr"><summary>${esc(T("Hele teksten med beskrivelse av bildet", "Full text with a description of the picture"))}</summary>${anTranscript(D)}</details>
    ${uses ? `<h4 class="grp">${esc(T("Les mer i teorien", "Read more in the theory"))}</h4><div class="lab-uses">${uses}</div>` : ""}
  </main>`;
  anBind(); anRefresh(true);
}
// tekstalternativet: hele fortellerteksten og hva som vises, scene for scene
const AN_SEE = {
  derivasjon: [["Koordinatsystemet tones inn, og grafen til f(x) = x² tegnes fra venstre.", "The coordinate system fades in, and the graph of f(x) = x² is drawn from the left."],
    ["Punktet P = (3, 9) dukker opp. Stiplede linjer viser x = 3 og høyden f(3) = 9.", "The point P = (3, 9) appears. Dashed lines show x = 3 and the height f(3) = 9."],
    ["En ring pulserer rundt P.", "A ring pulses around P."],
    ["Punktet Q = (5, 25) dukker opp, og en oransje rett linje (sekanten) tegnes gjennom P og Q.", "The point Q = (5, 25) appears, and an orange straight line (the secant) is drawn through P and Q."],
    ["En lilla trekant viser 2 bort og 16 opp fra P til Q. Under bildet: stigning = 16 / 2 = 8.", "A purple triangle shows 2 across and 16 up from P to Q. Below: slope = 16 / 2 = 8."],
    ["Buen av kurven mellom P og Q lyser opp: sekanten skjærer kurven i to punkter.", "The arc of the curve between P and Q lights up: the secant cuts the curve at two points."],
    ["Tenkepause. Animasjonen venter.", "Thinking pause. The animation waits."],
    ["Q glir jevnt mot P, og sekanten dreier og blir slakere. Trekanten heter nå h bort og opp. Under bildet vises h og stigningen 6 + h.", "Q slides smoothly towards P, and the secant turns and gets less steep. The triangle is now h across and up. Below, h and the slope 6 + h are shown."],
    ["Q stopper ved h = 1, 0,5 og 0,1. Stigningen er 7, 6,5 og 6,1.", "Q stops at h = 1, 0.5 and 0.1. The slope is 7, 6.5 and 6.1."],
    ["Kameraet går nær P. En stiplet grønn linje (tangenten) vises, og sekanten legger seg nesten oppå den når h = 0,01 (stigning 6,01).", "The camera moves close to P. A dashed green line (the tangent) appears, and the secant almost lies on it when h = 0.01 (slope 6.01)."],
    ["Sekanten og Q forsvinner, og tangenten blir heltrukken grønn. Kameraet går ut igjen.", "The secant and Q disappear, and the tangent becomes solid green. The camera moves back out."],
    ["En grønn trekant fra P viser 1 bort og 6 opp. Under bildet: f′(3) = 6.", "A green triangle from P shows 1 across and 6 up. Below: f′(3) = 6."],
    ["Bildet dempes, og utregningen vises linje for linje: (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h = (6h + h²) / h = 6 + h → 6.", "The picture dims, and the calculation appears line by line: (f(3 + h) − f(3)) / h = ((3 + h)² − 9) / h = (6h + h²) / h = 6 + h → 6."],
    ["Et grønt punkt glir langs kurven til x = 1, 2 og 4, og tangenten følger med. Stigningen er 2, 4 og 8.", "A green point slides along the curve to x = 1, 2 and 4, and the tangent follows. The slope is 2, 4 and 8."],
    ["Punktet går tilbake til x = 3. Under bildet: f′(x) = 2x og f′(3) = 2 · 3 = 6.", "The point returns to x = 3. Below: f′(x) = 2x and f′(3) = 2 · 3 = 6."],
    ["Tangenten i P med trekanten 1 bort og 6 opp, og svake sekanter (h = 2, 1 og 0,5) som nærmer seg den.", "The tangent at P with the triangle 1 across and 6 up, and faint secants (h = 2, 1 and 0.5) approaching it."]]
};
function anTranscript(D){
  const see = AN_SEE[D.id] || [];
  return D.scenes.map((sc, k) => `<h4>${k + 1}. ${esc(T(sc[0], sc[1]))}</h4>` + D.lines.map((l, i) => l.s === k ? `<p>${esc(T(l.vo[0], l.vo[1]))}</p>${see[i] ? `<p class="an-see"><b>${esc(T("Bildet", "Picture"))}:</b> ${esc(T(see[i][0], see[i][1]))}</p>` : ""}` : "").join("")).join("");
}
function anBind(){
  const $ = id => document.getElementById(id), D = ANIMS[AN.id];
  $("an-time").addEventListener("input", e => { const v = +e.target.value / 10; anPause(); anSeek(v); }); // les verdien før pausen tegner glidebryteren på nytt
  $("an-cc").addEventListener("change", e => { AN.cc = e.target.checked; S.anCC = AN.cc; save(); anRefresh(); });
  $("an-step").addEventListener("change", e => { AN.step = e.target.checked; anPause(); AN.waitAt = -1; if(AN.step) AN.t = D.lines[anLineAt(D, AN.t)].t0 + D.lines[anLineAt(D, AN.t)].d - 1e-3; anRefresh(true); });
  $("an-snd").addEventListener("change", e => { AN.snd = e.target.value; S.anSnd = AN.snd; save(); anAudioStop(); if(AN.playing) anAudioLine(true); });
  if(!anRefresh.rs){ anRefresh.rs = true; window.addEventListener("resize", () => { if(screen === "anim" && AN) anRefresh(true); }); }
}
function anRefresh(full){
  if(!AN || screen !== "anim") return; const D = ANIMS[AN.id], $ = id => document.getElementById(id); if(!$("an-stage")) return;
  const i = anLineAt(D, AN.t), l = D.lines[i], lay = anLay(), tt = AN.step ? l.t0 + l.d - 1e-3 : AN.t;
  $("an-stage").innerHTML = anSVG(AN.id, tt, lay); $("an-stage").dataset.lay = lay;
  const [h1, h2] = D.hud(tt); if($("an-hud1").innerHTML !== h1) $("an-hud1").innerHTML = h1; if($("an-hud2").innerHTML !== h2) $("an-hud2").innerHTML = h2;
  if(full || $("an-cap").dataset.i !== String(i)){ $("an-cap").textContent = T(l.vo[0], l.vo[1]); $("an-cap").dataset.i = i; $("an-scene").textContent = `${T("Scene", "Scene")} ${l.s + 1}/${D.scenes.length}: ${T(D.scenes[l.s][0], D.scenes[l.s][1])}`; }
  $("an-cap").hidden = !AN.cc;
  $("an-time").value = String(Math.round(AN.t * 10));
  $("an-clock").textContent = AN.step ? `${i + 1} / ${D.lines.length}` : `${anFmt(AN.t)} / ${anFmt(D.end)}`;
  $("an-time").setAttribute("aria-valuetext", `${anFmt(AN.t)} / ${anFmt(D.end)}`);
  const waiting = AN.waitAt === i && !AN.playing;
  const pl = $("an-play"), lab = AN.done && !AN.playing ? T("Spill på nytt", "Replay") : AN.playing ? T("Pause", "Pause") : waiting ? T("Fortsett", "Continue") : AN.step ? T("Neste", "Next") : T("Spill", "Play");
  if(pl.dataset.l !== lab){ pl.innerHTML = `${AN.playing ? AN_IC.pause : AN.done ? I.redo : AN_IC.play}<span>${esc(lab)}</span>`; pl.dataset.l = lab; }
  pl.setAttribute("aria-pressed", AN.playing ? "true" : "false");
  $("an-wait").hidden = !waiting; $("an-wait").textContent = T("Tenkepause: trykk Fortsett når du er klar.", "Thinking pause: press Continue when you are ready.");
  $("an-prev").textContent = "‹ " + T("Forrige", "Previous"); $("an-prev").setAttribute("aria-label", AN.step ? T("Forrige bilde", "Previous picture") : T("Forrige scene", "Previous scene"));
  $("an-next").textContent = T("Neste", "Next") + " ›"; $("an-next").setAttribute("aria-label", AN.step ? T("Neste bilde", "Next picture") : T("Neste scene", "Next scene"));
  if(full || AN.done !== AN.chkShown){ AN.chkShown = AN.done; const c = $("an-check"); c.hidden = !AN.done; if(AN.done && !c.innerHTML) c.innerHTML = anCheckHTML(D); }
}
const AN_IC = { play: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>`, pause: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor"/></svg>` };
function anCheckHTML(D){
  const c = D.check, p = AN.picked;
  return `<h3 id="an-chk-h">${esc(T("Prøv selv", "Try it yourself"))}</h3><p>${esc(T(c.q[0], c.q[1]))}</p><div class="an-opts2">${c.opts.map((o, k) => { const cls = p == null ? "" : k === c.ans ? "ok" : k === p ? "bad" : "dim";
    return `<button class="sg-opt sg-txt an-ans ${cls}" data-a="anans" data-k="${k}" ${p != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>
    ${p != null ? `<div class="dv-fb ${p === c.ans ? "ok" : "bad"} an-fb" tabindex="-1"><b>${esc(p === c.ans ? T("Riktig", "Correct") : T("Ikke helt", "Not quite"))}</b><p>${esc(T(c.why[0], c.why[1]))}</p></div>` : ""}`;
}

// tid og avspilling
function anTick(now){
  if(!AN || !AN.playing || screen !== "anim"){ if(AN){ AN.raf = 0; AN.playing = false; anAudioStop(); } return; }
  const D = ANIMS[AN.id], dt = Math.min(0.1, (now - AN.last) / 1000) * (AN.speed || 1); AN.last = now;
  const i = anLineAt(D, AN.t), l = D.lines[i], end = l.t0 + l.d;
  let t = AN.t + dt;
  // lyden for replikken er ikke ferdig: bildet står stille ved slutten av replikken til den er det (ingen avkutting)
  if(t >= end - 1e-3 && anAudioBusy(i)){ AN.t = end - 1e-3; AN.hold = true; anRefresh(); AN.raf = requestAnimationFrame(anTick); return; }
  AN.hold = false;
  if(l.wait && t >= end){ AN.t = end - 1e-3; AN.waitAt = i; anPause(); return; }
  if(t >= D.end){ AN.t = D.end; AN.done = true; anPause(); const c = document.getElementById("an-check"); if(c) setTimeout(() => c.scrollIntoView({ block: "nearest", behavior: anReduce() ? "auto" : "smooth" }), 60); return; }
  AN.t = t; if(anLineAt(D, t) !== i) anAudioLine(false);
  anRefresh(); AN.raf = requestAnimationFrame(anTick);
}
function anPlay(){
  const D = ANIMS[AN.id];
  if(AN.step){ anStepGo(1); return; }
  if(AN.done){ AN.t = 0; AN.done = false; AN.picked = null; const c = document.getElementById("an-check"); if(c){ c.innerHTML = ""; c.hidden = true; } }
  if(AN.waitAt >= 0){ const l = D.lines[AN.waitAt]; AN.t = l.t0 + l.d; AN.waitAt = -1; }
  AN.playing = true; AN.last = performance.now(); anAudioLine(true);
  cancelAnimationFrame(AN.raf); AN.raf = requestAnimationFrame(anTick); anRefresh();
}
function anPause(){ if(!AN) return; AN.playing = false; cancelAnimationFrame(AN.raf); AN.raf = 0; anAudioStop(); anRefresh(); }
function anStop(){ if(!AN) return; AN.playing = false; cancelAnimationFrame(AN.raf); anAudioStop(); }
function anSeek(t){ const D = ANIMS[AN.id]; AN.t = anClamp(t, 0, D.end); AN.done = AN.t >= D.end - 1e-6; AN.waitAt = -1; anAudioStop(); anRefresh(); }
function anScene(d){
  const D = ANIMS[AN.id];
  if(AN.step){ anStepGo(d); return; }
  const s = D.lines[anLineAt(D, AN.t)].s, st = k => D.lines.find(l => l.s === k).t0, back = d < 0 && AN.t - st(s) > 1.5;
  const ns = anClamp(back ? s : s + d, 0, D.scenes.length - 1), was = AN.playing; anPause(); anSeek(st(ns) + 1e-4); if(was) anPlay();
}
function anStepGo(d){
  const D = ANIMS[AN.id], i = anLineAt(D, AN.t), last = D.lines.length - 1;
  if(d > 0 && i === last){ AN.done = true; anRefresh(); const c = document.getElementById("an-check"); if(c) c.scrollIntoView({ block: "nearest" }); return; }
  const ni = anClamp(i + d, 0, last); AN.t = D.lines[ni].t0 + 1e-4; AN.done = false; anRefresh(); if(AN.snd !== "off"){ anAudioStop(); anAudioSay(ni, 0); }
}

// lyd: ferdig innspilling («file») eller enhetens stemme («device»). Én replikk om gangen; bildet venter hvis lyden varer lenger.
let AN_A = { el: null, i: -1, busy: false, seq: 0 };
function anAudioBusy(i){ return AN && AN.snd !== "off" && AN_A.i === i && AN_A.busy; }
function anAudioStop(){ AN_A.seq++; AN_A.busy = false; AN_A.i = -1; if(AN_A.el){ try{ AN_A.el.pause(); }catch(e){} } try{ if(typeof TTS_OK !== "undefined" && TTS_OK && AN_A.dev){ speechSynthesis.cancel(); AN_A.dev = false; } }catch(e){} }
function anAudioLine(resume){
  if(!AN || AN.snd === "off") return; const D = ANIMS[AN.id], i = anLineAt(D, AN.t), off = AN.t - D.lines[i].t0;
  if(AN_A.i === i && AN_A.busy) return;
  // midt i en replikk: lydfila startes på samme sted; enhetens stemme kan ikke starte midt i en setning, så den venter til neste replikk
  if(AN.snd === "device" && resume && off > 0.4) return;
  anAudioSay(i, off);
}
function anAudioSay(i, off){
  const D = ANIMS[AN.id], l = D.lines[i], seq = ++AN_A.seq; AN_A.i = i; AN_A.busy = true;
  const done = () => { if(AN_A.seq === seq) AN_A.busy = false; };
  if(AN.snd === "file"){ const m = anFiles(), a = m && m[l.id]; if(!a){ done(); return; }
    if(off >= a.dur){ done(); return; }
    const el = AN_A.el || (AN_A.el = new Audio()); el.onended = done; el.onerror = done; el.src = `anim/${AN.id}/${a.file}`; try{ el.currentTime = off; }catch(e){} el.play().catch(done); return; }
  if(AN.snd === "device" && typeof TTS_OK !== "undefined" && TTS_OK){
    try{ speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(typeof ttsSay === "function" ? ttsSay(T(l.vo[0], l.vo[1])) : T(l.vo[0], l.vo[1])), v = typeof ttsVoice === "function" ? ttsVoice() : null;
      if(v) u.voice = v; u.lang = LANG === "en" ? "en-GB" : "nb-NO"; u.rate = 0.95; u.onend = done; u.onerror = done; AN_A.dev = true; speechSynthesis.speak(u);
      setTimeout(() => { if(AN_A.seq === seq && AN_A.busy && !speechSynthesis.speaking && !speechSynthesis.pending) done(); }, 1500); }catch(e){ done(); }
    return; }
  done();
}

function anClick(a, b){
  if(!a || a.slice(0, 2) !== "an") return false;
  if(a === "anopen"){ anOpen(b.dataset.id, screen); return true; }
  if(!AN) return false;
  if(a === "anback"){ anStop(); const f = AN.from; AN = null; if(typeof labBack === "function") labBack(f); else goHome(); return true; }
  if(a === "anplay"){ AN.playing ? anPause() : anPlay(); return true; }
  if(a === "anprev"){ anScene(-1); return true; }
  if(a === "annext"){ anScene(1); return true; }
  if(a === "anans"){ if(AN.picked == null){ AN.picked = +b.dataset.k; const D = ANIMS[AN.id], ok = AN.picked === D.check.ans; if(typeof sfx === "function") sfx(ok ? "ok" : "bad"); const c = document.getElementById("an-check"); c.innerHTML = anCheckHTML(D); const fb = c.querySelector(".an-fb"); if(fb) fb.focus(); } return true; }
  return false;
}
document.addEventListener("keydown", e => {
  if(screen !== "anim" || !AN || e.metaKey || e.ctrlKey || e.altKey) return;
  if(e.target.closest && e.target.closest("input[type=range],select,textarea,input[type=text]")) return;
  if(e.key === " " && !(e.target.closest && e.target.closest("button,input"))){ e.preventDefault(); AN.playing ? anPause() : anPlay(); }
  else if(e.key === "ArrowRight" && !(e.target.closest && e.target.closest("input"))){ e.preventDefault(); anScene(1); }
  else if(e.key === "ArrowLeft" && !(e.target.closest && e.target.closest("input"))){ e.preventDefault(); anScene(-1); }
});

// ---------------- kortet i teorien og koblingen til enhetene ----------------
function anCardHTML(id){
  const D = ANIMS[id]; if(!D) return "";
  return `<figure class="fig an-card"><button class="an-cardbtn" data-a="anopen" data-id="${id}" aria-label="${esc(T(`Spill animasjonen: ${D.t[0]}`, `Play the animation: ${D.t[1]}`))}">
    <span class="an-poster">${anSVG(id, D.poster(), "wide")}<span class="an-pbadge">${AN_IC.play}<b>${esc(T("Spill animasjonen", "Play the animation"))}</b><small>${anFmt(D.end)}</small></span></span></button>
    <figcaption><b>${esc(T("Animasjon", "Animation"))}: ${esc(T(D.t[0], D.t[1]))}.</b> ${esc(T(D.sub[0], D.sub[1]))}</figcaption></figure>`;
}
const AN_MAP = {};
for(const [id, D] of Object.entries(ANIMS)) for(const [code, title] of D.units){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) AN_MAP[code + ":" + u] = id; }
// etter den korte innledningen (før den andre ##-overskriften), så eleven ser bildet før formlene
function withAnim(code, u, src){
  const id = AN_MAP[code + ":" + u]; if(!id || src.includes("![anim:")) return src;
  const lines = src.split("\n"), hs = lines.map((l, k) => /^##\s/.test(l.trim()) && k > 0 ? k : -1).filter(k => k >= 0), i = hs[1] != null ? hs[1] : hs[0];
  if(i == null) lines.push("", "![anim:" + id + "]"); else lines.splice(i, 0, "![anim:" + id + "]", "");
  return lines.join("\n");
}
