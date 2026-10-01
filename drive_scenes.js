// ============================================================
//  TRAFIKKSITUASJONER – animerte kryss for førerkortet (drive.js).
//  Du (blå) kommer alltid nedenfra og kjører oppover. Trykk på kjøretøyene i den rekkefølgen de skal kjøre,
//  trykk på den du har vikeplikt for, eller velg et svar. Etterpå spilles situasjonen av i riktig rekkefølge.
//  Kryssets armer heter etter kompasset: S (din), N (møtende), Ø/E (fra høyre), V/W (fra venstre).
//  Alt tegnes for arm S i en 320×320-figur og roteres 90° om gangen for de andre armene.
//  Statistikk: S.drive[kode].sc[id] = [sett, riktige].
// ============================================================
const SC_C = 160, SC_ROT = { S: 0, W: 1, N: 2, E: 3 }, SC_N = 8;
const SC_COL = { red: "#D9483B", yellow: "#E8B500", green: "#2E9D5B", orange: "#E07A1F", purple: "#8A5BD0", white: "#F4F6F8" };
const SC_NAME = { red: ["Rød bil", "Red car"], yellow: ["Gul bil", "Yellow car"], green: ["Grønn bil", "Green car"], orange: ["Oransje bil", "Orange car"], purple: ["Lilla bil", "Purple car"] };
// ---------- geometri ----------
const scLine = (a, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
const scQuad = (a, c, b, n = 20) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; });
const scCubic = (a, c1, c2, b, n = 26) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [0, 1].map(k => u * u * u * a[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * b[k]); });
const scArc = (r, a0, a1, n = 30) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [SC_C + r * Math.cos(a), SC_C + r * Math.sin(a)]; });
function scRot(p, k){ const a = k * Math.PI / 2, x = p[0] - SC_C, y = p[1] - SC_C; return [SC_C + x * Math.cos(a) - y * Math.sin(a), SC_C + x * Math.sin(a) + y * Math.cos(a)]; }
const scJoin = (...parts) => parts.reduce((o, p) => o.concat(o.length ? p.slice(1) : p), []);
// Banen for et kjøretøy (lokalt for arm S, så rotert). Returnerer { pts, stop } der stop er lengden fram til stopplinja.
function scPathLocal(v, lay){
  const L = 180 + (v.dx || 0);
  if(lay === "round"){
    const entry = scLine([L, 345], [178, 213]), ex = { right: 20, straight: -70, left: -160, u: -250 }[v.turn || "straight"];
    const exit = { right: [[345, 180]], straight: [[180, -25]], left: [[-25, 140]], u: [[140, 345]] }[v.turn || "straight"][0];
    const arc = scArc(52, 70, ex, Math.round(Math.abs(ex - 70) / 4)), last = arc[arc.length - 1];
    return { pts: scJoin(entry, arc, scLine(last, exit)), stop: 132 };
  }
  const entry = scLine([L, 345], [L, 205]);
  const tail = { straight: scLine([L, 205], [L, -25]), right: scJoin(scQuad([L, 205], [L, 180], [208, 180]), scLine([208, 180], [345, 180])),
    left: scJoin(scCubic([L, 205], [L, 150], [170, 140], [120, 140]), scLine([120, 140], [-25, 140])) }[v.turn || "straight"];
  return { pts: scJoin(entry, tail), stop: 140 };
}
function scBuild(sc, v){
  let pts, stop;
  if(v.path){ pts = scJoin(...v.path.slice(1).map((p, i) => scLine(v.path[i], p, 16))); stop = 0; }
  else { const r = scPathLocal(v, sc.lay); pts = r.pts.map(p => scRot(p, SC_ROT[v.from || "S"])); stop = r.stop; }
  const cum = [0]; for(let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const kind = v.kind || "car", half = kind === "ped" ? 0 : kind === "bus" ? 34 : kind === "bike" || kind === "mc" ? 14 : 21;
  const s0 = v.s0 != null ? v.s0 : v.path ? 0 : Math.max(0, stop - half - 4 - (v.q || 0) * 52);
  return { ...v, kind, pts, cum, len: cum[cum.length - 1], s0, s: s0 };
}
function scAt(b, s){
  s = Math.max(0, Math.min(b.len, s)); let i = 1; while(i < b.cum.length - 1 && b.cum[i] < s) i++;
  const seg = b.cum[i] - b.cum[i - 1] || 1, t = (s - b.cum[i - 1]) / seg, p0 = b.pts[i - 1], p1 = b.pts[i];
  return { x: p0[0] + (p1[0] - p0[0]) * t, y: p0[1] + (p1[1] - p0[1]) * t, a: Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * 180 / Math.PI + 90 };
}
// ---------- tegning ----------
function scVehicle(b, you){
  const col = you ? "var(--accent)" : SC_COL[b.col] || SC_COL.red;
  const bl = (x, y) => `<circle class="sc-blink" cx="${x}" cy="${y}" r="3.2" style="fill:#FFB400${b.blinkFrom != null && b.s < b.blinkFrom ? ";display:none" : ""}"/>`;
  const bk = (dx, dy) => b.blink === "L" ? bl(-dx, -dy) + bl(-dx, dy) : b.blink === "R" ? bl(dx, -dy) + bl(dx, dy) : "", blink = bk(8, 17);
  switch(b.kind){
    case "ped": return `<circle r="9" style="fill:${col};stroke:#fff;stroke-width:2"/><circle r="4.5" cy="-1" style="fill:#F2C9A0"/>`;
    case "bike": return `<rect x="-2" y="-14" width="4" height="28" rx="2" style="fill:#333"/><rect x="-7" y="-3" width="14" height="5" rx="2" style="fill:#555"/><circle r="6" cy="1" style="fill:${col};stroke:#fff;stroke-width:1.5"/>`;
    case "mc": return `<rect x="-5" y="-15" width="10" height="30" rx="5" style="fill:#2A2F35"/><rect x="-9" y="-9" width="18" height="4" rx="2" style="fill:#555"/><circle r="7" cy="2" style="fill:${col};stroke:#fff;stroke-width:2"/>${bk(6, 13)}`;
    case "bus": return `<rect x="-13" y="-36" width="26" height="72" rx="5" style="fill:#C8312A;stroke:#fff;stroke-width:1.5"/><rect x="-10" y="-32" width="20" height="8" rx="2" style="fill:#BFE3F5"/>${bk(12, 32)}`;
    case "amb": return `<rect x="-11" y="-21" width="22" height="42" rx="6" style="fill:#F7F8FA;stroke:#333;stroke-width:1"/><rect x="-11" y="-2" width="22" height="5" style="fill:#D9483B"/><rect x="-8" y="-16" width="16" height="7" rx="2" style="fill:#9DC7E0"/><rect class="sc-siren" x="-7" y="-6" width="14" height="4" rx="2" style="fill:#2F6BFF"/>`;
    default: return `<rect x="-11" y="-21" width="22" height="42" rx="6" style="fill:${col};stroke:rgba(0,0,0,.35);stroke-width:1"/><rect x="-8" y="-15" width="16" height="8" rx="2" style="fill:rgba(220,240,255,.85)"/><rect x="-8" y="10" width="16" height="5" rx="2" style="fill:rgba(220,240,255,.6)"/>${blink}`;
  }
}
function scArm(k, inner){ return `<g transform="rotate(${k * 90} ${SC_C} ${SC_C})">${inner}</g>`; }
const SC_ROAD = "#5E656D", SC_MARK = "#F4F4F4";
function scLayout(sc){
  const arms = { x: ["S", "N", "E", "W"], t: ["S", "E", "W"], road: [], round: ["S", "N", "E", "W"], avk: ["E", "W"] }[sc.lay] || [];
  let g = `<rect width="320" height="320" style="fill:#A7CF9A"/>`;
  if(sc.lay === "road") g += `<rect x="120" y="-5" width="80" height="330" style="fill:${SC_ROAD}"/><line x1="160" y1="0" x2="160" y2="320" style="stroke:${SC_MARK};stroke-width:2;stroke-dasharray:14 12"/>`;
  else {
    for(const a of arms) g += scArm(SC_ROT[a], `<rect x="120" y="160" width="80" height="165" style="fill:${SC_ROAD}"/><line x1="160" y1="${sc.lay === "round" ? 238 : 208}" x2="160" y2="325" style="stroke:${SC_MARK};stroke-width:2;stroke-dasharray:14 12"/>`);
    g += sc.lay === "round" ? `<circle cx="160" cy="160" r="76" style="fill:${SC_ROAD}"/><circle cx="160" cy="160" r="30" style="fill:#8DBF7E;stroke:${SC_MARK};stroke-width:3"/>` : `<rect x="120" y="120" width="80" height="80" style="fill:${SC_ROAD}"/>`;
    if(sc.lay === "avk") g += `<rect x="150" y="196" width="50" height="130" style="fill:#7A8189"/><rect x="0" y="200" width="320" height="10" style="fill:#C9CCC4"/><rect x="0" y="110" width="320" height="10" style="fill:#C9CCC4"/>`;
  }
  for(const a of sc.zebra || []) g += scArm(SC_ROT[a], Array.from({ length: 7 }, (_, i) => `<rect x="${124 + i * 11}" y="${a === "M" ? 0 : 214}" width="6" height="22" style="fill:${SC_MARK}"/>`).join(""));
  if(sc.cross) g += Array.from({ length: 7 }, (_, i) => `<rect x="${124 + i * 11}" y="${sc.cross}" width="6" height="24" style="fill:${SC_MARK}"/>`).join("");
  if(sc.bikelane) for(const k of [0, 2]) g += scArm(k, `<rect x="186" y="208" width="13" height="117" style="fill:#B9584E;opacity:.75"/><line x1="185" y1="208" x2="185" y2="325" style="stroke:${SC_MARK};stroke-width:1.5"/>`);
  if(sc.busstop) g += `<rect x="200" y="${sc.busstop}" width="22" height="80" style="fill:#7A8189"/><rect x="226" y="${sc.busstop + 30}" width="10" height="20" rx="2" style="fill:#3B6FB6"/><text x="231" y="${sc.busstop + 44}" text-anchor="middle" style="fill:#fff;font-size:11px;font-weight:800">B</text>`;
  for(const [a, name] of Object.entries(sc.signs || {})){
    if(name === "vikeplikt") g += scArm(SC_ROT[a], Array.from({ length: 5 }, (_, i) => `<path d="M${163 + i * 8} 206 l3.5 8 l3.5 -8z" style="fill:${SC_MARK}"/>`).join(""));
    const p = scRot([222, 236], SC_ROT[a]); g += `<g transform="translate(${(p[0] - 13).toFixed(1)} ${(p[1] - 13).toFixed(1)}) scale(.26)">${FK_SIGNS[name]()}</g>`;
  }
  for(const [a, st] of Object.entries(sc.lights || {})){
    const p = scRot([214, 218], SC_ROT[a]), col = { gronn: "#2ECC71", rod: "#E74C3C", gul: "#F1C40F" }[st];
    g += `<g transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})"><rect x="-6" y="-15" width="12" height="30" rx="3" style="fill:#222"/>${["rod", "gul", "gronn"].map((c, i) => `<circle cy="${-9 + i * 9}" r="3.4" style="fill:${c === st ? col : "#444"}"/>`).join("")}</g>`;
  }
  return g;
}
const scVName = (b, code) => b.id === "you" ? T("Deg", "You") : b.kind === "ped" ? T("Fotgjengeren", "The pedestrian") : b.kind === "bike" ? T("Syklisten", "The cyclist") : b.kind === "bus" ? T("Bussen", "The bus") : b.kind === "amb" ? T("Ambulansen", "The ambulance") : T(...(SC_NAME[b.col] || SC_NAME.red));
function scSVG(sc, built, st){
  const showPicks = st && !st.playing && sc.type !== "choice";
  let g = scLayout(sc);
  if(!st || !st.playing) for(const b of built) if(b.kind !== "ped" || b.path) g += `<polyline points="${b.pts.filter((_, i) => i % 2 === 0).map(p => p[0].toFixed(0) + "," + p[1].toFixed(0)).join(" ")}" style="fill:none;stroke:${b.id === "you" ? "var(--accent)" : SC_COL[b.col] || "#fff"};stroke-width:3;stroke-dasharray:5 6;opacity:.55;stroke-linecap:round"/>`;
  for(const b of built){ const p = scAt(b, b.s), you = b.id === "you";
    g += `<g id="scv-${b.id}" class="sc-veh ${showPicks && b.id !== "you" || showPicks && sc.type === "order" ? "tap" : ""}" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.a.toFixed(1)})" ${showPicks ? `data-a="scpick" data-v="${b.id}" role="button" aria-label="${esc(scVName(b))}"` : ""}><circle r="26" style="fill:transparent"/>${scVehicle(b, you)}</g>`;
  }
  if(showPicks) (st.picks || []).forEach((id, k) => { const b = built.find(x => x.id === id); if(!b) return; const p = scAt(b, b.s), ok = st.reveal ? (sc.type === "tap" ? sc.ans.includes(id) : sc.ans[k] === id) : null;
    g += `<g class="sc-badge" transform="translate(${p.x.toFixed(1)} ${(p.y - 30).toFixed(1)})"><circle r="11" style="fill:${ok == null ? "var(--ink)" : ok ? "#1E9A5E" : "#D23F3A"};stroke:#fff;stroke-width:2"/><text y="4.5" text-anchor="middle" style="fill:#fff;font-size:13px;font-weight:800">${sc.type === "tap" ? (ok ? "✓" : "✗") : k + 1}</text></g>`; });
  return `<svg class="sc-svg" id="scsvg" viewBox="0 0 320 320" role="img" aria-label="${esc(T("Trafikksituasjon", "Traffic situation"))}">${g}</svg>`;
}
// ---------- avspilling ----------
let SC_RAF = 0;
function scStop(){ cancelAnimationFrame(SC_RAF); SC_RAF = 0; }
function scPlay(){
  const D = DV && DV.sc; if(!D) return; scStop();
  const sc = D.list[D.i], built = D.built, order = sc.play || sc.ans, sched = {};
  let t = 0.25;
  for(const id of order){ const b = built.find(x => x.id === id); if(!b) continue; const sp = b.kind === "ped" ? 55 : b.kind === "bike" ? 95 : 130;
    sched[id] = { t0: t, sp }; const clear = b.kind === "ped" ? b.len - b.s0 : Math.min(b.len - b.s0, 175); t += clear / sp * 0.85 + 0.15; }
  built.forEach(b => { b.s = b.s0; }); D.playing = true;
  const el = document.getElementById("scsvg"); if(el) el.classList.add("playing");
  const T0 = performance.now(), end = t + 2.2;
  const step = now => {
    const tt = (now - T0) / 1000;
    for(const b of built){ const s = sched[b.id]; if(!s) continue; const dt = Math.max(0, tt - s.t0), ramp = Math.min(dt, 0.6);
      b.s = Math.min(b.len, b.s0 + s.sp * (dt - ramp + ramp * ramp / 1.2));
      const g = document.getElementById("scv-" + b.id); if(g){ const p = scAt(b, b.s); g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.a.toFixed(1)})`);
        if(b.blinkFrom != null) g.querySelectorAll(".sc-blink").forEach(c => { c.style.display = b.s >= b.blinkFrom ? "" : "none"; }); } }
    if(tt < end && document.getElementById("scsvg")) SC_RAF = requestAnimationFrame(step); else { SC_RAF = 0; D.playing = false; }
  };
  SC_RAF = requestAnimationFrame(step);
}
// ---------- øvingsrunde ----------
const scData = code => { const d = dvData(code); return d.sc ||= {}; };
function scStart(){
  const code = S.current, st = scData(code), mc = code === "FKMC";
  const score = s => { const r = st[s.id]; return !r ? 0 : r[1] < r[0] ? 1 : 2 + r[0]; };
  const list = shuffle(SCENES.slice()).sort((a, b) => score(a) - score(b)).slice(0, SC_N).map(s => ({ ...s, v: s.v.map(v => v.id === "you" && mc && !v.kind ? { ...v, kind: "mc" } : v) }));
  DV = { view: "scene", code, sc: { list, i: 0, ok: 0, res: [] } }; scLoad(); screen = "drive"; overlay = null; render(); window.scrollTo(0, 0);
}
function scLoad(){ const D = DV.sc, sc = D.list[D.i]; D.built = sc.v.map(v => scBuild(sc, v)); D.picks = []; D.reveal = false; D.pick = null; D.playing = false; }
function scCheck(){
  const D = DV.sc, sc = D.list[D.i];
  const ok = sc.type === "tap" ? sc.ans.includes(D.picks[0]) : sc.type === "choice" ? D.order[D.pick] === 0 : sc.ans.every((id, k) => D.picks[k] === id);
  D.reveal = true; D.res[D.i] = ok; if(ok) D.ok++;
  const r = scData(DV.code)[sc.id] ||= [0, 0]; r[0]++; if(ok) r[1]++; save();
  sfx(ok ? "ok" : "bad"); buzz(ok); render(); setTimeout(scPlay, 450);
}
const scRich = s => rich(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
function renderScene(){
  scStop();
  const D = DV.sc, n = D.list.length, title = T("Trafikksituasjoner", "Traffic situations");
  if(D.i >= n){
    $app.innerHTML = `${dvTop(title, T("Øving", "Practice"))}<main class="wrap dv dv-done"><div class="dv-big">${D.ok}/${n}</div><h2>${esc(D.ok === n ? T("Alt riktig!", "All correct!") : D.ok >= n * 0.75 ? T("Sterkt!", "Strong!") : T("Godt øvd", "Good practice"))}</h2>
      <div class="dv-sum">${D.res.map((ok, k) => `<span class="${ok ? "ok" : "bad"}">${k + 1}</span>`).join("")}</div>
      <button class="big" data-a="scagain">${esc(T("Nye situasjoner", "New situations"))}</button><button class="big ghost" data-a="dvclose">${esc(T("Tilbake", "Back"))}</button></main>`;
    return;
  }
  const sc = D.list[D.i], need = sc.type === "order" ? sc.ans.length : 1, rev = D.reveal;
  const how = sc.type === "order" ? T(`Trykk på kjøretøyene i den rekkefølgen de skal kjøre (${D.picks.length}/${need}).`, `Tap the vehicles in the order they should go (${D.picks.length}/${need}).`) : sc.type === "tap" ? T("Trykk på riktig kjøretøy i bildet.", "Tap the right vehicle in the picture.") : "";
  if(sc.type === "choice" && !D.order) D.order = shuffle(sc.opts[0].map((_, k) => k));
  const opts = sc.type === "choice" ? `<div class="dv-opts">${D.order.map((k, j) => { const right = k === 0, picked = D.pick === j, cls = rev ? (right ? "ok" : picked ? "bad" : "dim") : "";
    return `<button class="dv-opt ${cls}" data-a="scans" data-i="${j}" ${rev ? "disabled" : ""}><i>${"ABCD"[j]}</i><span>${rich(T(sc.opts[0][k], sc.opts[1][k]))}</span></button>`; }).join("")}</div>` : "";
  const ok = D.res[D.i];
  const right = sc.type === "order" ? sc.ans.map((id, k) => `${k + 1}. ${scVName(D.built.find(b => b.id === id))}`).join(" → ") : sc.type === "tap" ? scVName(D.built.find(b => b.id === sc.ans[0])) : "";
  $app.innerHTML = `${dvTop(title, T("Situasjon", "Situation"), `<span class="dv-count">${D.i + 1}/${n}</span>`)}
    <div class="dv-prog wrap"><i style="width:${((D.i + (rev ? 1 : 0)) / n * 100).toFixed(0)}%"></i></div>
    <main class="wrap dv scn">
      <p class="dv-qt">${scRich(T(sc.q[0], sc.q[1]))}</p>
      <div class="sc-box">${scSVG(sc, D.built, D)}</div>
      ${how && !rev ? `<p class="sc-how">${esc(how)}</p>` : ""}
      ${!rev && D.picks.length && sc.type === "order" ? `<div class="sc-picks">${D.picks.map((id, k) => `<span>${k + 1}. ${esc(scVName(D.built.find(b => b.id === id)))}</span>`).join("")}<button class="exlink" data-a="screset">${esc(T("Nullstill", "Reset"))}</button></div>` : ""}
      ${opts}
      ${rev ? `<div class="dv-fb ${ok ? "ok" : "bad"}"><b>${esc(ok ? tgPick(T(["Riktig!", "Sånn ja!", "Helt riktig!"], ["Correct!", "Nice!", "Exactly right!"])) : T("Ikke helt", "Not quite"))}</b>${right ? `<p class="sc-right">${esc(T("Riktig: ", "Correct: "))}<b>${esc(right)}</b></p>` : ""}<p>${scRich(T(sc.e[0], sc.e[1]))}</p></div>
        <div class="sc-btns"><button class="big ghost" data-a="screplay">▶ ${esc(T("Se igjen", "Watch again"))}</button><button class="big" data-a="scnext">${esc(D.i + 1 < n ? T("Neste", "Next") : T("Se resultatet", "See the result"))}</button></div>` : ""}
    </main>`;
}
function scClick(a, b){
  if(!a.startsWith("sc")) return false;
  const D = DV && DV.sc, dd = b && b.dataset;
  if(a === "scopen"){ scStart(); return true; }
  if(!D) return false;
  if(a === "scpick"){ if(D.reveal) return true; const sc = D.list[D.i], id = dd.v;
    if(sc.type === "tap"){ if(id === "you") return true; D.picks = [id]; scCheck(); return true; }
    if(D.picks.includes(id)) D.picks = D.picks.filter(x => x !== id); else D.picks.push(id);
    sfx("tap"); if(D.picks.length === sc.ans.length) scCheck(); else render(); return true; }
  if(a === "scans"){ if(D.reveal) return true; D.pick = +dd.i; scCheck(); return true; }
  if(a === "screset"){ D.picks = []; render(); return true; }
  if(a === "screplay"){ render(); setTimeout(scPlay, 50); return true; }
  if(a === "scnext"){ D.i++; D.order = null; if(D.i < D.list.length) scLoad(); else { const st = awardXP(3); S.stats ||= {}; S.stats.lessons = (+S.stats.lessons || 0) + 1; bdgToast(checkBadges()); save(); } render(); window.scrollTo(0, 0); return true; }
  if(a === "scagain"){ scStart(); return true; }
  return false;
}
// ---------- situasjonene ----------
// type: order (rekkefølge), tap (trykk på én), choice (flervalg, play = rekkefølgen i avspillingen).
const SCENES = [
  { id: "hoyre1", lay: "x", type: "order", ans: ["a", "you"],
    q: ["Krysset har ingen skilt eller lys. Hvem kjører først?", "The junction has no signs or lights. Who goes first?"],
    e: ["**Høyreregelen**: uten skilt eller lys har du vikeplikt for kjørende som kommer fra høyre. Den røde bilen kommer fra høyre for deg.", "**The right-hand rule**: without signs or lights you must give way to traffic coming from the right. The red car comes from your right."],
    v: [{ id: "you" }, { id: "a", from: "E", col: "red" }] },
  { id: "vik1", lay: "x", type: "order", ans: ["a", "you"], signs: { S: "vikeplikt", N: "vikeplikt" },
    q: ["Du har vikepliktskilt. Den gule bilen kommer fra venstre. Hvem kjører først?", "You have a give-way sign. The yellow car comes from the left. Who goes first?"],
    e: ["**Vikepliktskiltet** og haitennene betyr at du må slippe fram all trafikk på vegen du kjører inn på, også den som kommer fra venstre.", "The **give-way sign** and shark teeth mean you must let all traffic on the road you enter go first, including traffic from the left."],
    v: [{ id: "you" }, { id: "a", from: "W", col: "yellow" }] },
  { id: "fork1", lay: "x", type: "order", ans: ["you", "a"], signs: { S: "forkjorsvei", N: "forkjorsvei", E: "vikeplikt", W: "vikeplikt" },
    q: ["Du kjører på forkjørsvei. Den røde bilen kommer fra høyre. Hvem kjører først?", "You are on a priority road. The red car comes from the right. Who goes first?"],
    e: ["På **forkjørsvei** har trafikk fra sidevegene vikeplikt for deg, selv om de kommer fra høyre. De har vikepliktskilt og haitenner.", "On a **priority road**, traffic from the side roads must give way to you, even from the right. They have give-way signs and shark teeth."],
    v: [{ id: "you" }, { id: "a", from: "E", col: "red" }] },
  { id: "venstre1", lay: "x", type: "order", ans: ["a", "you"],
    q: ["Du skal svinge til venstre. En bil kommer mot deg og skal rett fram. Hvem kjører først?", "You are turning left. An oncoming car is going straight. Who goes first?"],
    e: ["Den som **svinger til venstre** har vikeplikt for møtende trafikk. Vent midt i krysset til den grønne bilen har passert.", "Whoever **turns left** must give way to oncoming traffic. Wait in the middle until the green car has passed."],
    v: [{ id: "you", turn: "left", blink: "L" }, { id: "a", from: "N", col: "green" }] },
  { id: "hoyre3", lay: "x", type: "order", ans: ["a", "you", "b"],
    q: ["Tre biler kommer samtidig, og det er ingen skilt. Sett dem i riktig rekkefølge.", "Three cars arrive at once and there are no signs. Put them in the right order."],
    e: ["Med høyreregelen venter alle på den som kommer fra høyre. Den røde har ingen til høyre for seg og kjører først, så du, og til slutt den gule, som har deg på sin høyre side.", "With the right-hand rule everyone waits for traffic from their right. The red car has nobody on its right and goes first, then you, and finally the yellow car, which has you on its right."],
    v: [{ id: "you" }, { id: "a", from: "E", col: "red" }, { id: "b", from: "W", col: "yellow" }] },
  { id: "fork2", lay: "x", type: "order", ans: ["a", "you", "b"], signs: { S: "forkjorsvei", N: "forkjorsvei", E: "vikeplikt", W: "vikeplikt" },
    q: ["Du er på forkjørsvei og skal svinge til venstre. Hvem kjører først?", "You are on a priority road and turning left. Who goes first?"],
    e: ["Den møtende grønne bilen kjører rett fram på forkjørsvegen, og du som svinger til venstre må vente på den. Den røde fra sidevegen har vikeplikt for dere begge.", "The oncoming green car goes straight on the priority road, and you must wait for it because you turn left. The red car from the side road must give way to both of you."],
    v: [{ id: "you", turn: "left", blink: "L" }, { id: "a", from: "N", col: "green" }, { id: "b", from: "E", col: "red" }] },
  { id: "gaaende1", lay: "x", type: "order", ans: ["p", "you"],
    q: ["Du skal svinge til høyre. En fotgjenger krysser vegen du svinger inn på. Hvem går eller kjører først?", "You are turning right. A pedestrian is crossing the road you turn into. Who goes first?"],
    e: ["Når du svinger, har du **vikeplikt for gående** som krysser vegen du svinger inn på, også uten gangfelt.", "When you turn, you must **give way to pedestrians** crossing the road you turn into, even without a crossing."],
    v: [{ id: "you", turn: "right", blink: "R" }, { id: "p", kind: "ped", col: "orange", path: [[232, 100], [232, 225]] }] },
  { id: "gangfelt1", lay: "road", type: "order", ans: ["p", "you"], cross: 120,
    q: ["En fotgjenger er på veg ut i gangfeltet foran deg. Hvem går eller kjører først?", "A pedestrian is about to step onto the crossing ahead. Who goes first?"],
    e: ["Du har **vikeplikt for gående** som er ute i eller på veg ut i gangfeltet. Sett ned farten i god tid og stopp.", "You must **give way to pedestrians** who are on or about to step onto the crossing. Slow down early and stop."],
    v: [{ id: "you", s0: 70 }, { id: "p", kind: "ped", col: "purple", path: [[96, 132], [224, 132]] }] },
  { id: "utr1", lay: "x", type: "order", ans: ["m", "you"],
    q: ["En ambulanse med blålys og sirene kommer fra venstre. Hvem kjører først?", "An ambulance with blue lights and siren comes from the left. Who goes first?"],
    e: ["**Utrykningskjøretøy** med blålys og sirene skal alltid slippes fram, uansett vikepliktsregler. Stopp eller kjør til side.", "**Emergency vehicles** with blue lights and siren must always be let through, whatever the right-of-way rules. Stop or pull aside."],
    v: [{ id: "you" }, { id: "m", from: "W", kind: "amb" }] },
  { id: "avk1", lay: "avk", type: "order", ans: ["a", "you"],
    q: ["Du kjører ut fra en parkeringsplass og skal til høyre. Hvem kjører først?", "You are leaving a car park and turning right. Who goes first?"],
    e: ["Den som kjører ut fra en **avkjørsel** (parkeringsplass, gårdsplass, bensinstasjon) har vikeplikt for all trafikk, også gående på fortauet.", "Whoever drives out of a **private exit** (car park, driveway, petrol station) must give way to all traffic, including pedestrians on the pavement."],
    v: [{ id: "you", turn: "right", blink: "R", dx: -5 }, { id: "a", from: "W", col: "green" }] },
  { id: "tkryss1", lay: "t", type: "order", ans: ["a", "you"],
    q: ["T-kryss uten skilt. Du kjører rett fram, den gule bilen kommer fra en sideveg til høyre for deg. Hvem kjører først?", "T-junction without signs. You go straight, the yellow car comes from a side road on your right. Who goes first?"],
    e: ["**Høyreregelen gjelder også i T-kryss**, selv om vegen din ser ut som hovedvegen. Uten skilt har du vikeplikt for den som kommer fra høyre.", "**The right-hand rule also applies at T-junctions**, even if your road looks like the main road. Without signs you must give way to traffic from the right."],
    v: [{ id: "you", from: "W" }, { id: "a", from: "S", col: "yellow", turn: "left", blink: "L" }] },
  { id: "rund1", lay: "round", type: "order", ans: ["you", "a"], signs: { S: "vikeplikt", N: "vikeplikt", E: "vikeplikt", W: "vikeplikt" },
    q: ["Du er allerede inne i rundkjøringen. Den røde bilen venter ved innkjøringen. Hvem kjører først?", "You are already in the roundabout. The red car waits at the entry. Who goes first?"],
    e: ["Det er **vikeplikt inn i rundkjøringen**. Den som allerede er inne, kjører først.", "There is a **give-way rule when entering a roundabout**. Whoever is already inside goes first."],
    v: [{ id: "you", from: "W", turn: "straight", s0: 180 }, { id: "a", from: "S", col: "red" }] },
  { id: "rund2", lay: "round", type: "choice", play: ["you"], signs: { S: "vikeplikt", N: "vikeplikt", E: "vikeplikt", W: "vikeplikt" },
    q: ["Du skal rett fram i rundkjøringen (andre avkjøring). Hvordan bruker du blinklyset?", "You are going straight on at the roundabout (second exit). How do you use the indicator?"],
    opts: [["Blinker til høyre etter at du har passert avkjøringen før den du skal ta", "Blinker til venstre når du kjører inn", "Blinker til høyre allerede før du kjører inn", "Du skal ikke blinke i rundkjøring"],
      ["Indicate right after passing the exit before yours", "Indicate left when entering", "Indicate right before entering", "You should not indicate in a roundabout"]],
    e: ["Skal du rett fram, blinker du ikke inn, men **blinker til høyre når du har passert avkjøringen før din**. Da vet de som venter at du skal ut.", "Going straight on, you do not indicate when entering, but **indicate right once you have passed the exit before yours**. Then those waiting know you are leaving."],
    v: [{ id: "you", turn: "straight", blink: "R", blinkFrom: 185 }] },
  { id: "buss1", lay: "road", type: "order", ans: ["bus", "you"], busstop: 130,
    q: ["Fartsgrensen er 50. Bussen blinker for å kjøre ut fra holdeplassen. Hvem kjører først?", "The speed limit is 50. The bus signals to pull out from the stop. Who goes first?"],
    e: ["Der fartsgrensen er **60 km/t eller lavere**, har du vikeplikt for buss som gir tegn til å kjøre ut fra holdeplass.", "Where the speed limit is **60 km/h or lower**, you must give way to a bus signalling to pull out from a stop."],
    v: [{ id: "you", s0: 40 }, { id: "bus", kind: "bus", blink: "L", path: [[211, 190], [208, 150], [182, 110], [180, 60], [180, -60]] }] },
  { id: "tap1", lay: "x", type: "tap", ans: ["a"],
    q: ["Du skal rett fram og det er ingen skilt. Trykk på bilen du har vikeplikt for.", "You are going straight and there are no signs. Tap the car you must give way to."],
    e: ["Den røde kommer fra høyre, så du har vikeplikt for den. Den gule fra venstre har vikeplikt for deg, og den grønne som svinger til høyre, krysser ikke kjørebanen din.", "The red car comes from your right, so you give way to it. The yellow car from the left gives way to you, and the green car turning right does not cross your path."],
    play: ["a", "c", "you", "b"],
    v: [{ id: "you" }, { id: "a", from: "E", col: "red" }, { id: "b", from: "W", col: "yellow" }, { id: "c", from: "N", col: "green", turn: "right", blink: "R" }] },
  { id: "lys1", lay: "x", type: "order", ans: ["a", "you"], lights: { S: "gronn", N: "gronn" },
    q: ["Du har grønt lys og skal svinge til venstre. Møtende har også grønt. Hvem kjører først?", "You have a green light and are turning left. Oncoming traffic also has green. Who goes first?"],
    e: ["Grønt lys betyr at du **kan** kjøre, men ikke at du har forkjørsrett. Som venstresvingende har du fortsatt vikeplikt for møtende.", "A green light means you **may** go, not that you have priority. Turning left, you still give way to oncoming traffic."],
    v: [{ id: "you", turn: "left", blink: "L" }, { id: "a", from: "N", col: "orange" }] },
  { id: "sykkel1", lay: "x", type: "order", bikelane: 1, ans: ["c", "you"],
    q: ["Du skal svinge til høyre. En syklist i sykkelfeltet til høyre for deg skal rett fram. Hvem kjører først?", "You are turning right. A cyclist in the bike lane on your right is going straight. Who goes first?"],
    e: ["Du må **slippe fram syklisten** som skal rett fram før du svinger over sykkelfeltet. Se i speilet og over skulderen (blindsonen).", "You must **let the cyclist going straight go first** before turning across the bike lane. Check your mirror and over your shoulder (blind spot)."],
    v: [{ id: "you", turn: "right", blink: "R", dx: -8 }, { id: "c", kind: "bike", col: "green", dx: 13, s0: 118 }] },
  { id: "tap2", lay: "x", type: "tap", ans: ["b"], signs: { S: "vikeplikt", N: "vikeplikt" },
    q: ["Du har vikepliktskilt og skal rett fram. Trykk på bilen som kommer til å kjøre først.", "You have a give-way sign and are going straight. Tap the car that will go first."],
    e: ["Kryssende trafikk på hovedvegen kjører før dere med vikeplikt. Den røde er nærmest og kjører først, og så kan du og den møtende kjøre.", "Crossing traffic on the main road goes before those with give-way signs. The red car goes first, then you and the oncoming car can go."],
    play: ["b", "you", "a"],
    v: [{ id: "you" }, { id: "a", from: "N", col: "yellow" }, { id: "b", from: "W", col: "red" }] },
];
