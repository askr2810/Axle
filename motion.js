// ============================================================
//  BEVEGELSESLABEN – posisjon, fart og akselerasjon i tre koblede grafer.
//  Du drar i punktene på fartsgrafen v(t). Da ser du:
//    • stigningen til s-grafen er farten (grønn tangent), og stigningen til v-grafen er akselerasjonen (oransje strek)
//    • arealet under v-grafen er strekningen (blått), og arealet under a-grafen er endringen i fart (grønt)
//  En bil kjører langs en vei øverst. Brukes i teorien (![mv:forhåndsvalg]), på emnesiden «Fart og akselerasjon»
//  og som egen lab (#/bevegelse). Fargene følger størrelsen: s blå, v grønn, a oransje.
// ============================================================
const MV_T = 10, MV_N = 5, MV_DT = MV_T / MV_N; // 10 s, fem rette biter i fartsgrafen
const MV_VMIN = -8, MV_VMAX = 14;
const MV_PRE = [
  ["const", "Konstant fart", "Constant speed", [5, 5, 5, 5, 5, 5]],
  ["acc", "Gasser jevnt", "Steady acceleration", [0, 2, 4, 6, 8, 10]],
  ["brake", "Bremser", "Braking", [12, 9, 6, 3, 0, 0]],
  ["go", "Kjør og stopp", "Go and stop", [0, 6, 10, 10, 4, 0]],
  ["back", "Snur og rygger", "Turns and reverses", [6, 3, 0, -3, -6, -3]]
];
// Små oppgaver: [nb, en, test(m)] – m har v, a, s (funksjoner) og sEnd.
const MV_GOALS = [
  ["Kjør nøyaktig 40 m på 10 s.", "Drive exactly 40 m in 10 s.", m => Math.abs(m.sEnd - 40) < 1e-6],
  ["Start fra ro, gass med 2 m/s² i 4 s, og hold så farten konstant.", "Start from rest, accelerate at 2 m/s² for 4 s, then hold the speed constant.", m => m.v[0] === 0 && m.a[0] === 2 && m.a[1] === 2 && m.a.slice(2).every(x => x === 0)],
  ["Kjør fram og tilbake: bilen skal være tilbake på start etter 10 s.", "Drive there and back: the car must be back at the start after 10 s.", m => Math.abs(m.sEnd) < 1e-6 && m.v.some(x => Math.abs(x) > 0.1)],
  ["Bremse mykt: start i 10 m/s, stå stille ved 10 s, og aldri bremse hardere enn 2 m/s².", "Brake gently: start at 10 m/s, stop at 10 s, and never brake harder than 2 m/s².", m => m.v[0] === 10 && m.v[MV_N] === 0 && m.a.every(x => x >= -2 - 1e-9) && m.v.every(x => x >= 0)]
];
const MV_ST = {}; let mvSeq = 0;
const mvCol = { s: "#2B6FD6", v: "#1E9A5E", a: "#E07B00" };
function mvModel(v){
  const a = v.slice(1).map((x, i) => (x - v[i]) / MV_DT);
  const seg = t => Math.min(MV_N - 1, Math.max(0, Math.floor(t / MV_DT)));
  const vAt = t => { const i = seg(t); return v[i] + a[i] * (t - i * MV_DT); };
  const sAt = t => { let s = 0; const i = seg(t); for(let k = 0; k < i; k++) s += (v[k] + v[k + 1]) / 2 * MV_DT; const tau = t - i * MV_DT; return s + v[i] * tau + a[i] * tau * tau / 2; };
  return { v, a, vAt, sAt, aAt: t => a[seg(t)], seg, sEnd: sAt(MV_T) };
}
// «Pen» akse som alltid tar med 0: [min, maks, steg]
function mvNice(lo, hi){
  lo = Math.min(0, lo); hi = Math.max(0, hi); if(hi - lo < 1e-9){ hi = lo + 1; }
  const raw = (hi - lo) / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), st = [1, 2, 2.5, 5, 10].map(x => x * p).find(x => x >= raw) || raw;
  return [Math.floor(lo / st - 1e-9) * st, Math.ceil(hi / st + 1e-9) * st, st];
}
const mvN = (x, d = 1) => nf(Math.abs(x) < 0.05 && d <= 1 ? 0 : x, d);
// Plassering i svg-en (bredde 360)
const MV_X0 = 46, MV_X1 = 350, MV_ROWS = { s: [58, 84], v: [170, 96], a: [292, 58] }, MV_H = 362;
const mvX = t => MV_X0 + t / MV_T * (MV_X1 - MV_X0);
function mvSVG(st){
  const m = mvModel(st.v), t0 = st.t, uid = st.uid;
  const ss = Array.from({ length: 101 }, (_, i) => m.sAt(i / 100 * MV_T));
  const R = { s: mvNice(Math.min(...ss), Math.max(...ss)), v: [MV_VMIN, MV_VMAX, 2], a: mvNice(Math.min(...m.a, -1), Math.max(...m.a, 1)) };
  const Y = (k, y) => { const [top, h] = MV_ROWS[k], [lo, hi] = R[k]; return top + h - (y - lo) / (hi - lo) * h; };
  const f1 = x => x.toFixed(1);
  let s = "";
  // ---- veien med bilen ----
  const [slo, shi] = R.s, TX = x => 22 + (x - slo) / (shi - slo) * 316, car = TX(m.sAt(t0)), dir = m.vAt(t0) < -0.05 ? -1 : 1;
  s += `<rect x="12" y="14" width="336" height="26" rx="6" class="mv-road"/><path d="M18 27H342" class="mv-lane"/>`;
  for(let x = slo; x <= shi + 1e-9; x += R.s[2]) s += `<path d="M${f1(TX(x))} 40v4" class="mv-tick"/><text x="${f1(TX(x))}" y="53" class="mv-tt">${mvN(x, 0)}</text>`;
  s += `<path d="M${f1(TX(0))} 12v30" class="mv-start"/>`;
  s += `<g transform="translate(${f1(car)} 27) scale(${dir} 1)"><rect x="-13" y="-7" width="26" height="14" rx="4" fill="${mvCol.s}"/><rect x="2" y="-5" width="7" height="10" rx="2" fill="#BFE3F5"/><path d="M15 -3l5 3-5 3z" fill="${mvCol.s}"/></g>`;
  // ---- rutenett, akser og etiketter ----
  for(const k of ["s", "v", "a"]){
    const [top, h] = MV_ROWS[k], [lo, hi, step] = R[k];
    s += `<rect x="${MV_X0}" y="${top}" width="${MV_X1 - MV_X0}" height="${h}" class="mv-bg"/>`;
    for(let y = lo; y <= hi + 1e-9; y += step) s += `<path d="M${MV_X0} ${f1(Y(k, y))}H${MV_X1}" class="${Math.abs(y) < 1e-9 ? "mv-zero" : "mv-grid"}"/>` + (Math.abs(y) < 1e-9 || y === lo || y >= hi - 1e-9 ? `<text x="${MV_X0 - 4}" y="${f1(Y(k, y) + 3.5)}" class="mv-yl">${mvN(y, 0)}</text>` : "");
    s += `<text x="4" y="${top + 11}" class="mv-name" fill="${mvCol[k]}">${k}</text><text x="4" y="${top + 23}" class="mv-unit">${k === "s" ? "m" : k === "v" ? "m/s" : "m/s²"}</text>`;
  }
  for(let t = 0; t <= MV_T; t += 2) s += `<text x="${f1(mvX(t))}" y="${MV_ROWS.a[0] + MV_ROWS.a[1] + 13}" class="mv-tt">${t}</text>`;
  s += `<text x="4" y="${MV_ROWS.a[0] + MV_ROWS.a[1] + 13}" class="mv-unit">t (s)</text>`;
  // ---- arealer (fra 0 til t0) med klipping over/under null ----
  const area = (k, fn, cls) => {
    if(t0 <= 0) return "";
    const n = Math.max(2, Math.ceil(t0 / MV_T * 120)); let d = `M${f1(mvX(0))} ${f1(Y(k, 0))}`;
    for(let i = 0; i <= n; i++){ const t = t0 * i / n; d += `L${f1(mvX(t))} ${f1(Y(k, fn(Math.min(t, t0 - 1e-9 * (i === n)))))}`; }
    d += `L${f1(mvX(t0))} ${f1(Y(k, 0))}Z`;
    const [top, h] = MV_ROWS[k], z = Y(k, 0);
    return `<clipPath id="${uid}${k}p"><rect x="0" y="${top}" width="360" height="${f1(z - top)}"/></clipPath><clipPath id="${uid}${k}n"><rect x="0" y="${f1(z)}" width="360" height="${f1(top + h - z)}"/></clipPath>
      <path d="${d}" class="${cls}" clip-path="url(#${uid}${k}p)"/><path d="${d}" class="${cls} mv-neg" clip-path="url(#${uid}${k}n)"/>`;
  };
  s += area("v", m.vAt, "mv-ar-s") + area("a", m.aAt, "mv-ar-v");
  // ---- kurvene ----
  s += `<path d="${ss.map((y, i) => (i ? "L" : "M") + f1(mvX(i / 100 * MV_T)) + " " + f1(Y("s", y))).join("")}" class="mv-ln" stroke="${mvCol.s}"/>`;
  s += `<path d="${st.v.map((y, i) => (i ? "L" : "M") + f1(mvX(i * MV_DT)) + " " + f1(Y("v", y))).join("")}" class="mv-ln" stroke="${mvCol.v}"/>`;
  s += `<path d="${m.a.map((y, i) => `M${f1(mvX(i * MV_DT))} ${f1(Y("a", y))}H${f1(mvX((i + 1) * MV_DT))}` + (i < MV_N - 1 ? `V${f1(Y("a", m.a[i + 1]))}` : "")).join("")}" class="mv-ln" stroke="${mvCol.a}"/>`;
  // stigningen akkurat nå: tangenten på s (grønn = farten) og biten av v-grafen vi er på (oransje = akselerasjonen)
  const tv = m.vAt(t0), sv = m.sAt(t0), w = 1.6, ta = Math.max(0, t0 - w), tb = Math.min(MV_T, t0 + w), i = m.seg(t0);
  s += `<clipPath id="${uid}sc"><rect x="${MV_X0}" y="${MV_ROWS.s[0]}" width="${MV_X1 - MV_X0}" height="${MV_ROWS.s[1]}"/></clipPath>`;
  s += `<path d="M${f1(mvX(ta))} ${f1(Y("s", sv + tv * (ta - t0)))}L${f1(mvX(tb))} ${f1(Y("s", sv + tv * (tb - t0)))}" class="mv-tan" stroke="${mvCol.v}" clip-path="url(#${uid}sc)"/>`;
  s += `<path d="M${f1(mvX(i * MV_DT))} ${f1(Y("v", st.v[i]))}L${f1(mvX((i + 1) * MV_DT))} ${f1(Y("v", st.v[i + 1]))}" class="mv-tan" stroke="${mvCol.a}"/>`;
  // markøren (nå-tidspunktet) gjennom alle tre grafene
  s += `<path d="M${f1(mvX(t0))} ${MV_ROWS.s[0] - 2}V${MV_ROWS.a[0] + MV_ROWS.a[1] + 2}" class="mv-cur"/>`;
  s += `<circle cx="${f1(mvX(t0))}" cy="${f1(Y("s", sv))}" r="4.5" fill="${mvCol.s}" class="mv-dot"/><circle cx="${f1(mvX(t0))}" cy="${f1(Y("v", tv))}" r="4.5" fill="${mvCol.v}" class="mv-dot"/><circle cx="${f1(mvX(t0))}" cy="${f1(Y("a", m.aAt(t0)))}" r="4.5" fill="${mvCol.a}" class="mv-dot"/>`;
  // dra-flate og håndtak på fartsgrafen
  s += `<rect x="${MV_X0 - 10}" y="${MV_ROWS.v[0] - 8}" width="${MV_X1 - MV_X0 + 20}" height="${MV_ROWS.v[1] + 16}" class="mv-hit" data-mvd="hit"/>`;
  s += st.v.map((y, k) => `<circle cx="${f1(mvX(k * MV_DT))}" cy="${f1(Y("v", y))}" r="${st.drag === k ? 10 : 8}" class="mv-h${st.drag === k ? " on" : ""}" data-mvd="${k}" fill="${mvCol.v}"/>`).join("");
  return `<svg class="mv-svg" viewBox="0 0 360 ${MV_H}" role="img" aria-label="${esc(T("Posisjon, fart og akselerasjon over tid", "Position, velocity and acceleration over time"))}">${s}</svg>`;
}
function mvInfo(st){
  const m = mvModel(st.v), t0 = st.t, sv = m.sAt(t0), tv = m.vAt(t0), ta = m.aAt(t0), dv = tv - st.v[0];
  const chip = (k, lab, val, u) => `<span class="mv-r" style="--c:${mvCol[k]}"><small>${lab}</small><b>${val}</b> ${u}</span>`;
  const read = `<div class="mv-read">${chip("s", "t", mvN(t0), "s").replace(`--c:${mvCol.s}`, "--c:var(--muted)")}${chip("s", "s", mvN(sv), "m")}${chip("v", "v", mvN(tv), "m/s")}${chip("a", "a", mvN(ta), "m/s²")}</div>`;
  const B = (k, x) => `<b style="color:${mvCol[k]}">${x}</b>`;
  const rise = (k, x) => Math.abs(x) < 0.05 ? T(`${k}-grafen er flat: den endrer seg`, `The ${k}-graph is flat: it changes by`) : x > 0 ? T(`${k}-grafen stiger`, `The ${k}-graph rises`) : T(`${k}-grafen synker`, `The ${k}-graph falls`);
  const moving = Math.abs(tv) < 0.05 ? T("Bilen står stille akkurat nå.", "The car is standing still right now.") : tv > 0 ? T("Bilen kjører framover.", "The car is moving forward.") : T("Bilen rygger (negativ fart).", "The car is reversing (negative velocity).");
  const links = `<div class="mv-links">
    <p><span class="mv-k">📈 ${esc(T("Stigning", "Slope"))}</span> ${esc(rise("s", tv))} ${B("v", mvN(Math.abs(tv)) + " m")} ${esc(T("per sekund akkurat nå – det er farten", "per second right now – that is the velocity"))} ${B("v", "v = " + mvN(tv) + " m/s")}. ${esc(rise("v", ta))} ${B("a", mvN(Math.abs(ta)) + " m/s")} ${esc(T("per sekund – det er akselerasjonen", "per second – that is the acceleration"))} ${B("a", "a = " + mvN(ta) + " m/s²")}.</p>
    <p><span class="mv-k">🟦 ${esc(T("Areal", "Area"))}</span> ${esc(T("Det blå arealet under v-grafen er", "The blue area under the v-graph is"))} ${B("s", mvN(sv) + " m")} – ${esc(T("akkurat så langt bilen er fra start", "exactly how far the car is from the start"))}. ${esc(T("Det grønne arealet under a-grafen er", "The green area under the a-graph is"))} ${B("v", (dv >= 0 ? "+" : "") + mvN(dv) + " m/s")} – ${esc(T("så mye farten har endret seg", "how much the velocity has changed"))}.</p>
    <p class="mv-mov">${esc(moving)} ${esc(T("Areal under null teller negativt (bilen rygger).", "Area below zero counts as negative (the car reverses)."))}</p></div>`;
  return read + links;
}
function mvGoalsHTML(st){
  const m = mvModel(st.v), done = S.mvGoals || {};
  return `<div class="mv-goals"><b>🎯 ${esc(T("Prøv selv", "Try it"))}</b>${MV_GOALS.map((g, i) => { const ok = !st.pre && g[2](m); return `<p class="${ok ? "ok" : done[i] ? "was" : ""}"><span>${ok ? "✅" : done[i] ? "☑️" : "⬜"}</span>${esc(T(g[0], g[1]))}</p>`; }).join("")}</div>`;
}
function mvInner(st){
  return `<div class="mv-h"><span class="sim-tag">${I.bolt}${esc(T("Prøv selv", "Try it"))}</span><b>${esc(T("Posisjon, fart og akselerasjon", "Position, velocity and acceleration"))}</b></div>
    <p class="mv-lead">${esc(T("Dra i de grønne punktene på fartsgrafen og trykk ▶. Se hvordan bilen og de to andre grafene følger med.", "Drag the green points on the velocity graph and press ▶. Watch how the car and the other two graphs follow."))}</p>
    <div class="mv-ctl"><button class="mv-play" data-mv="play" aria-label="${esc(st.play ? T("Pause", "Pause") : T("Spill av", "Play"))}">${st.play ? "❚❚" : "▶"}</button><input type="range" min="0" max="${MV_T}" step="0.05" value="${st.t}" data-mv="t" aria-label="${esc(T("Tid", "Time"))}"></div>
    <div class="mv-svgw">${mvSVG(st)}</div>
    <div class="mv-pre">${MV_PRE.map(p => `<button data-mv="pre" data-p="${p[0]}" class="${st.pre === p[0] ? "on" : ""}">${esc(T(p[1], p[2]))}</button>`).join("")}</div>
    <div class="mv-info">${mvInfo(st)}</div>
    <div class="mv-gw">${mvGoalsHTML(st)}</div>
    <details class="mv-f"><summary>${esc(T("Formlene bak", "The formulas behind it"))}</summary>
      <div class="dmath">${texD("v(t) = s'(t) \\qquad a(t) = v'(t)")}</div>
      <div class="dmath">${texD("s(t) = s(0) + \\int_0^t v\\,d\\tau \\qquad v(t) = v(0) + \\int_0^t a\\,d\\tau")}</div>
      <p>${esc(T("Derivere = finne stigningen (fra s til v, fra v til a). Integrere = finne arealet (fra a til v, fra v til s). Det er to sider av samme sak.", "Differentiate = find the slope (from s to v, from v to a). Integrate = find the area (from a to v, from v to s). They are two sides of the same coin."))}</p>
    </details>`;
}
function mvHTML(pre){
  const p = MV_PRE.find(x => x[0] === pre) || MV_PRE[1], uid = "mv" + (++mvSeq);
  MV_ST[uid] = { uid, v: p[3].slice(), pre: p[0], t: 4, play: false, drag: null };
  return `<div class="mv fig" data-mvid="${uid}">${mvInner(MV_ST[uid])}</div>`;
}
const mvEl = st => document.querySelector(`.mv[data-mvid="${st.uid}"]`);
// Oppdaterer bare det som endres, så glidebryteren og dra-bevegelsen ikke avbrytes.
function mvUpdate(st, full){
  const el = mvEl(st); if(!el){ st.play = false; cancelAnimationFrame(st.raf); return; }
  if(full){ el.innerHTML = mvInner(st); return; }
  el.querySelector(".mv-svgw").innerHTML = mvSVG(st); el.querySelector(".mv-info").innerHTML = mvInfo(st);
  const r = el.querySelector('input[data-mv="t"]'); if(r && document.activeElement !== r) r.value = st.t;
  const pb = el.querySelector(".mv-play"); if(pb) pb.textContent = st.play ? "❚❚" : "▶";
}
function mvCheckGoals(st){
  const m = mvModel(st.v), done = (S.mvGoals ||= {}); let fresh = false;
  if(st.pre) return; // et ferdig forhåndsvalg teller ikke – du må lage bevegelsen selv
  MV_GOALS.forEach((g, i) => { if(g[2](m) && !done[i]){ done[i] = 1; fresh = true; if(typeof awardXP === "function") awardXP(3); if(typeof toast === "function") toast("✅ " + T(g[0], g[1]) + " +3 XP"); } });
  if(fresh){ save(); if(typeof sfx === "function") sfx("ok"); }
  const el = mvEl(st); if(el) el.querySelector(".mv-gw").innerHTML = mvGoalsHTML(st);
}
function mvPlay(st){
  if(st.play){ st.play = false; cancelAnimationFrame(st.raf); mvUpdate(st); return; }
  st.play = true; if(st.t >= MV_T - 0.01) st.t = 0;
  let last = performance.now();
  const step = now => { if(!st.play) return; st.t = Math.min(MV_T, st.t + (now - last) / 1000 * 1.25); last = now;
    if(st.t >= MV_T){ st.play = false; } mvUpdate(st); if(st.play) st.raf = requestAnimationFrame(step); };
  st.raf = requestAnimationFrame(step); mvUpdate(st);
}
// fra skjermkoordinat til fartsverdi (snappes til 0,5 m/s)
function mvVFromY(svg, clientY){
  const m = svg.getScreenCTM(); if(!m) return null; const y = (clientY - m.f) / m.d, [top, h] = MV_ROWS.v;
  const v = MV_VMIN + (top + h - y) / h * (MV_VMAX - MV_VMIN); return Math.max(MV_VMIN, Math.min(MV_VMAX, Math.round(v * 2) / 2));
}
function mvTFromX(svg, clientX){ const m = svg.getScreenCTM(); if(!m) return 0; return Math.max(0, Math.min(MV_T, ((clientX - m.e) / m.a - MV_X0) / (MV_X1 - MV_X0) * MV_T)); }
let MV_DRAG = null;
document.addEventListener("pointerdown", e => {
  const h = e.target.closest && e.target.closest("[data-mvd]"); if(!h) return;
  const box = h.closest(".mv"), st = box && MV_ST[box.dataset.mvid], svg = h.closest("svg"); if(!st || !svg) return;
  e.preventDefault();
  // på dra-flaten tar vi punktet nærmest der du trykket
  const k = h.dataset.mvd === "hit" ? Math.round(mvTFromX(svg, e.clientX) / MV_DT) : +h.dataset.mvd;
  MV_DRAG = { st, k }; st.drag = k; st.pre = null;
  const v = mvVFromY(svg, e.clientY); if(v != null) st.v[k] = v; mvUpdate(st);
  const el = mvEl(st); el.querySelectorAll(".mv-pre button.on").forEach(b => b.classList.remove("on"));
});
addEventListener("pointermove", e => {
  if(!MV_DRAG) return; const st = MV_DRAG.st, el = mvEl(st), svg = el && el.querySelector(".mv-svg"); if(!svg) return;
  const v = mvVFromY(svg, e.clientY); if(v != null && v !== st.v[MV_DRAG.k]){ st.v[MV_DRAG.k] = v; mvUpdate(st); }
});
addEventListener("pointerup", () => { if(!MV_DRAG) return; const st = MV_DRAG.st; MV_DRAG = null; st.drag = null; mvUpdate(st); mvCheckGoals(st); });
document.addEventListener("input", e => {
  const r = e.target.closest && e.target.closest('.mv input[data-mv="t"]'); if(!r) return;
  const st = MV_ST[r.closest(".mv").dataset.mvid]; if(!st) return; st.play = false; cancelAnimationFrame(st.raf); st.t = +r.value; mvUpdate(st);
});
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest(".mv [data-mv]"); if(!b || b.tagName === "INPUT") return;
  const st = MV_ST[b.closest(".mv").dataset.mvid]; if(!st) return;
  if(b.dataset.mv === "play") mvPlay(st);
  else if(b.dataset.mv === "pre"){ const p = MV_PRE.find(x => x[0] === b.dataset.p); if(p){ st.v = p[3].slice(); st.pre = p[0]; st.play = false; cancelAnimationFrame(st.raf); mvUpdate(st, true); mvCheckGoals(st); } }
});
// ---------- i teorien: ![mv:forhåndsvalg] før første passende overskrift ----------
const MV_UNITS = [["GFYS", "Bevegelse", "acc"], ["VGFY1", "Bevegelse", "acc"], ["GMAT", "Innføring i derivasjon", "go"], ["VGR1", "Derivasjon og drøfting", "go"],
  ["VGR2", "Integrasjon", "brake"], ["MEK1000", "Derivasjon", "go"], ["MEK1000", "Integrasjon", "brake"], ["MAT1000", "Dynamikk", "acc"]];
const MV_MAP = {};
for(const [code, title, pre] of MV_UNITS){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) MV_MAP[code + ":" + u] = pre; }
function withMv(code, u, src){
  const pre = MV_MAP[code + ":" + u]; if(!pre || src.includes("![mv:")) return src;
  const lines = src.split("\n");
  // etter den enkle innledningen: før den andre ##-overskriften (eller til slutt)
  const hs = lines.map((l, k) => /^##\s/.test(l.trim()) && k > 0 ? k : -1).filter(k => k >= 0), i = hs[1] != null ? hs[1] : hs[0];
  if(i == null) lines.push("", "![mv:" + pre + "]"); else lines.splice(i, 0, "![mv:" + pre + "]", "");
  return lines.join("\n");
}
// ---------- egen lab-skjerm (#/bevegelse) ----------
let MVS = { from: "home", uid: null };
function mvOpen(from){ MVS = { from: from || "home", uid: null }; overlay = null; screen = "motion"; render(); window.scrollTo(0, 0); }
function renderMotion(){
  // samme tilstand ved ny tegning (f.eks. språkbytte), ny lab når skjermen åpnes på nytt
  if(!MVS.uid || !MV_ST[MVS.uid]){ const h = mvHTML("acc"); MVS.uid = h.match(/data-mvid="(\w+)"/)[1]; }
  const st = MV_ST[MVS.uid]; st.play = false; cancelAnimationFrame(st.raf);
  MVS.html = `<div class="mv fig" data-mvid="${st.uid}">${mvInner(st)}</div>`;
  const links = MV_UNITS.map(([code, title]) => { const c = COURSE(code), u = c ? c.units.findIndex(x => x.title === title) : -1; return c && u >= 0 && inMyStudies(c) ? `<button class="bk-hit" data-a="bkunit" data-c="${code}" data-u="${u}"><small>${esc(courseName(c))}</small><b>${esc(unitTitle(c, u))}</b></button>` : ""; }).join("");
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="mvback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Labben", "The lab"))}</small><b>${esc(T("Bevegelseslaben", "The motion lab"))}</b></div></div></div>
    <main class="wrap lab-one">${MVS.html}${links ? `<h4 class="grp">${esc(T("Les mer i teorien", "Read more in the theory"))}</h4><div class="lab-uses">${links}</div>` : ""}</main>`;
}
function mvClick(a){
  if(a !== "mvback") return false;
  const f = MVS.from; if(f === "lab"){ screen = "lab"; LB.sim = null; render(); window.scrollTo(0, 0); } else if(typeof labBack === "function") labBack(f); else goHome();
  return true;
}
