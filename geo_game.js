// ============================================================
//  KARTSPILLET – lær land og historiske kart som et spill (samme preg som Skiltspillet).
//  Tre moduser: «Finn landet» (trykk på kartet), «Hvilket land?» (et land lyser, velg navnet)
//  og «Historie» (et land blinker på et historisk kart fra maps.js, velg hvilken side det var på).
//  15 spørsmål per runde, 3 liv, tiden blir kortere for hvert spørsmål. Rekord per region og modus i S.geoBest.
// ============================================================
Object.assign(UI.nb, { geoTitle: "Kartspillet", geoSub: "Finn land i Europa og verden, og hvem som var på hvilken side" });
Object.assign(UI.en, { geoTitle: "The map game", geoSub: "Find countries in Europe and the world, and who was on which side" });
const GE_MAX = 15, GE_LIVES = 3;
// Regioner: kartvisning (europe/world), landene det spørres om, og om kartet skal zoomes inn på dem.
const GE_REG = {
  europe: { v: "europe", ic: "🇪🇺", t: ["Europa", "Europe"], codes: "NO SE DK FI IS IE GB FR ES PT BE NL LU DE CH AT IT PL CZ SK HU SI HR BA RS ME XK MK AL GR BG RO MD UA BY LT LV EE RU TR CY" },
  africa: { v: "world", fit: 1, ic: "🌍", t: ["Afrika", "Africa"], codes: "MA DZ TN LY EG MR ML NE TD SD SS ER ET DJ SO KE UG RW BI TZ SN GM GW GN SL LR CI BF GH TG BJ NG CM CF GQ GA CG CD AO ZM MW MZ ZW BW NA ZA LS SZ MG" },
  asia: { v: "world", fit: 1, ic: "🌏", t: ["Asia og Midtøsten", "Asia and the Middle East"], codes: "TR SY LB IL JO IQ IR SA YE OM AE QA KW GE AM AZ KZ UZ TM KG TJ AF PK IN NP BT BD LK MM TH LA KH VN MY ID PH CN MN KP KR JP TW" },
  americas: { v: "world", fit: 1, ic: "🌎", t: ["Amerika", "The Americas"], codes: "CA US GL MX GT BZ HN SV NI CR PA CU HT DO JM CO VE GY SR EC PE BR BO PY CL AR UY" },
  world: { v: "world", ic: "🗺️", t: ["Hele verden", "The whole world"], codes: "CA US MX BR AR CL PE CO VE BO GL NO SE FI GB FR ES DE IT PL UA TR RU EG LY DZ MA NG ET KE CD AO ZA MG SA IR IQ KZ AF PK IN CN MN TH VN ID PH JP AU NZ PG" }
};
const GE_MODES = [["find", "Finn landet", "Find the country"], ["name", "Hvilket land?", "Which country?"], ["hist", "Historie", "History"]];
let GE = null;
const geBest = () => (S.geoBest ||= {});
const geKey = () => GE.mode === "hist" ? "hist:" + (GE.map || "all") : GE.reg + ":" + GE.mode;
const gePool = reg => GE_REG[reg].codes.split(" ").filter(c => MAP_GEO[GE_REG[reg].v].c[c]);
function geVB(reg){
  const R = GE_REG[reg], G = MAP_GEO[R.v];
  if(!R.fit) return [0, 0, G.w, G.h];
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for(const c of gePool(reg)){ const b = G.c[c].b; x0 = Math.min(x0, b[0]); y0 = Math.min(y0, b[1]); x1 = Math.max(x1, b[2]); y1 = Math.max(y1, b[3]); }
  const m = Math.max(x1 - x0, y1 - y0) * 0.04; return [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m].map(Math.round);
}
const geMid = (G, c) => { const o = G.c[c]; return o.a || [(o.b[0] + o.b[2]) / 2, (o.b[1] + o.b[3]) / 2]; };
const geHistMaps = () => Object.keys(MAPS).filter(id => MAPS[id].f.length && MAP_GEO[MAPS[id].v]);

// ---------- spørsmål ----------
function geNextQ(){
  const prev = GE.recent.slice(-8), dur = Math.max(GE.mode === "name" ? 5000 : 6500, (GE.mode === "name" ? 9000 : 12000) * Math.pow(0.95, GE.n));
  if(GE.mode === "hist"){
    // et historisk kart, et tilfeldig tidssteg, en tilfeldig side – og et land fra den siden
    for(let tries = 0; tries < 40; tries++){
      const ids = GE.map ? [GE.map] : geHistMaps(), id = ids[Math.floor(Math.random() * ids.length)], M = MAPS[id], G = MAP_GEO[M.v];
      const k = Math.floor(Math.random() * M.f.length), fills = mpFrames(M)[k], vb = mpVB(M);
      const cand = Object.entries(fills).filter(([c, g]) => M.g[g] && G.c[c] && G.c[c].a && G.c[c].a[0] > vb[0] && G.c[c].a[0] < vb[0] + vb[2] && G.c[c].a[1] > vb[1] && G.c[c].a[1] < vb[1] + vb[3]);
      const groups = [...new Set(cand.map(x => x[1]))]; if(groups.length < 2) continue;
      const g = groups[Math.floor(Math.random() * groups.length)], pool = cand.filter(x => x[1] === g && !prev.includes(id + ":" + x[0])); if(!pool.length) continue;
      const [c] = pool[Math.floor(Math.random() * pool.length)];
      GE.q = { id, k, c, ans: g, opts: [...new Set(Object.values(fills))].filter(x => M.g[x]), t0: performance.now(), dur, picked: null };
      GE.recent.push(id + ":" + c); return;
    }
  }
  const G = MAP_GEO[GE_REG[GE.reg].v], pool = gePool(GE.reg), fresh = pool.filter(c => !prev.includes(c) && !GE.asked.includes(c));
  const from = fresh.length ? fresh : pool.filter(c => !prev.includes(c));
  // land du har bommet på før, kommer oftere igjen
  const st = geSt(), w = from.map(c => 1 + (st[c] && !st[c][2] ? 2 : 0)), tot = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * tot, c = from[0]; for(let i = 0; i < from.length; i++){ r -= w[i]; if(r <= 0){ c = from[i]; break; } }
  let opts = null;
  if(GE.mode === "name"){ // tre naboer som feilsvar (de nærmeste landene), så det faktisk krever at du vet hvor landet er
    const [cx, cy] = geMid(G, c), near = pool.filter(x => x !== c).map(x => { const [x2, y2] = geMid(G, x); return [x, Math.hypot(x2 - cx, y2 - cy)]; }).sort((a, b) => a[1] - b[1]).slice(0, 6).map(x => x[0]);
    opts = shuffle([c, ...shuffle(near).slice(0, 3)]);
  }
  GE.q = { c, ans: c, opts, t0: performance.now(), dur, picked: null, tap: null };
  GE.recent.push(c); GE.asked.push(c);
}
const geSt = () => (S.geoStat ||= {});

function geStart(reg, mode, map){
  if(typeof MAP_GEO === "undefined") return;
  mode = mode || (GE && GE.mode) || S.geoMode || "find";
  GE = { view: "game", reg: reg || (GE && GE.reg) || "europe", mode, map: map === undefined ? (GE && GE.map) || null : map, from: (GE && GE.from) || (screen === "geo" ? "home" : screen),
    score: 0, combo: 0, maxCombo: 0, lives: GE_LIVES, n: 0, ok: 0, missed: [], recent: [], asked: [], over: false, fx: null };
  geNextQ(); screen = "geo"; overlay = null; render(); window.scrollTo(0, 0); geTick();
}
function geTick(){
  cancelAnimationFrame(geTick.raf);
  const step = () => {
    if(!GE || GE.view !== "game" || !GE.q || GE.q.picked != null || screen !== "geo") return;
    const left = 1 - (performance.now() - GE.q.t0) / GE.q.dur, bar = document.getElementById("getime");
    if(bar){ bar.style.transform = `scaleX(${Math.max(0, left).toFixed(4)})`; bar.className = "sg-time " + (left < 0.25 ? "r" : left < 0.55 ? "y" : "g"); }
    if(left <= 0){ geAnswer(null); return; }
    geTick.raf = requestAnimationFrame(step);
  };
  geTick.raf = requestAnimationFrame(step);
}
// pick = landkode (finn/hvilket land) eller gruppe (historie); null = tiden gikk ut
function geAnswer(pick, near){
  const q = GE.q; if(!q || q.picked != null) return;
  cancelAnimationFrame(geTick.raf);
  const ok = pick != null && (pick === q.ans || !!near), left = Math.max(0, 1 - (performance.now() - q.t0) / q.dur);
  q.picked = pick == null ? "" : pick; GE.n++;
  if(GE.mode !== "hist"){ const st = geSt()[q.ans] ||= [0, 0, 0]; st[0]++; if(ok) st[1]++; st[2] = ok ? 1 : 0; }
  if(ok){ GE.ok++; GE.combo++; GE.maxCombo = Math.max(GE.maxCombo, GE.combo);
    const mult = GE.combo >= 10 ? 4 : GE.combo >= 6 ? 3 : GE.combo >= 3 ? 2 : 1, pts = (100 + Math.round(left * 100)) * mult;
    GE.score += pts; GE.fx = { pts, mult }; sfx("ok", GE.combo); buzz(true); }
  else { GE.combo = 0; GE.lives--; GE.fx = { miss: pick == null ? "time" : "wrong" }; GE.missed.push(GE.mode === "hist" ? { id: q.id, k: q.k, c: q.c, g: q.ans } : q.ans); sfx("bad"); buzz(false); }
  save(); render();
  if(ok){ const el = document.querySelector(".ge-card"); if(el) burst(el, 10); }
  clearTimeout(geAnswer.t);
  geAnswer.t = setTimeout(() => { if(!GE || GE.view !== "game" || screen !== "geo") return; if(GE.lives <= 0 || GE.n >= GE_MAX) return geOver(); GE.fx = null; geNextQ(); render(); geTick(); }, ok ? 900 : 2200);
}
function geOver(){
  GE.over = true; GE.view = "over"; GE.full = GE.lives > 0 && GE.n >= GE_MAX; if(GE.full){ GE.bonus = GE.lives * 500; GE.score += GE.bonus; }
  const key = geKey(), best = geBest(); GE.prevBest = best[key] || 0; GE.record = GE.score > GE.prevBest; if(GE.record) best[key] = GE.score;
  GE.xp = Math.max(1, Math.round(GE.ok / 2) + (GE.full ? 2 : 0)); awardXP(GE.xp);
  if(typeof stEv === "function") stEv("game", "geo", GE.mode === "hist" ? "hist:" + (GE.map || "all") : GE.reg + ":" + GE.mode, GE.ok, GE.n);
  save(); render(); window.scrollTo(0, 0);
  if(GE.record) setTimeout(() => { const el = document.querySelector(".sg-final"); if(el) burst(el, 18); }, 200);
}

// ---------- tegning ----------
function geMapSVG(q, rev){
  const R = GE_REG[GE.reg], G = MAP_GEO[R.v], vb = geVB(GE.reg), u = vb[2] / 400, pool = new Set(gePool(GE.reg));
  let paths = "";
  for(const [c, o] of Object.entries(G.c)){
    let cls = "mp-c ge-c" + (pool.has(c) ? " ge-in" : "");
    if(GE.mode === "name" && c === q.c) cls += rev ? " ge-ok" : " ge-q";
    if(GE.mode === "find" && rev){ if(c === q.ans) cls += q.picked === q.ans || GE.fx && GE.fx.pts ? " ge-ok" : " ge-show"; else if(c === q.tap) cls += " ge-bad"; }
    paths += `<path class="${cls}" data-gc="${c}" d="${o.d}"/>`;
  }
  // små land får en ring rundt seg så de synes
  let ring = "";
  // (u = kartenheter per skjermpiksel når kartet er ca. 400 px bredt)
  const ringOf = c => { const b = G.c[c].b, s = Math.max(b[2] - b[0], b[3] - b[1]); if(s / u > 26) return ""; const [x, y] = geMid(G, c);
    return `<circle class="ge-ring" cx="${x}" cy="${y}" r="${Math.max(s / 2 + 6 * u, 9 * u).toFixed(1)}" style="stroke-width:${(2.4 * u).toFixed(2)}"/>`; };
  if(GE.mode === "name" || (GE.mode === "find" && rev)) ring = ringOf(q.c);
  return `<svg class="mp-svg ge-svg" viewBox="${vb.join(" ")}" role="img" aria-label="${esc(T(R.t[0], R.t[1]))}"><rect class="mp-sea" x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/>${paths}${ring}</svg>`;
}
function geHistSVG(q, rev){
  // gjenbruker kart-tegningen fra maps.js; landet det spørres om blinker uten farge til du har svart
  return mpSVG({ id: q.id, uid: "ge", k: q.k, sel: rev ? q.c : null, quiz: rev ? null : { cur: { c: q.c } } });
}
function geTop(sub){
  return `<div class="top"><div class="wrap"><button class="iconbtn" data-a="geback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(sub)}</small><b>${esc(t("geoTitle"))}</b></div>${GE && GE.view === "game" ? `<span class="sg-score">${GE.score}</span>` : ""}</div></div>`;
}
function renderGeo(){
  if(typeof MAP_GEO === "undefined"){ goHome(); return; }
  if(!GE) GE = { view: "menu", reg: S.geoReg || "europe", mode: S.geoMode || "find", map: null, from: "home" };
  if(GE.view === "menu"){ $app.innerHTML = `${geTop(T("Lek og lær", "Play and learn"))}<main class="wrap sg">${geMenuHTML()}</main>`; return; }
  if(GE.view === "over"){ $app.innerHTML = `${geTop(T("Ferdig", "Finished"))}<main class="wrap sg sg-over">${geOverHTML()}</main>`; return; }
  const q = GE.q, rev = q.picked != null, fx = GE.fx || {}, mult = GE.combo >= 10 ? 4 : GE.combo >= 6 ? 3 : GE.combo >= 3 ? 2 : 1;
  const hearts = Array.from({ length: GE_LIVES }, (_, i) => `<i class="${i < GE.lives ? "" : "lost"}">❤️</i>`).join("");
  let prompt, opts = "", fb = "";
  if(GE.mode === "hist"){
    const M = MAPS[q.id], G = MAP_GEO[M.v];
    prompt = `<p class="sg-ask">${esc(T(M.t[0], M.t[1]))} · ${esc(T(M.f[q.k].y[0], M.f[q.k].y[1]))}</p><p class="sg-name ge-name">${esc(T(`Hvor hørte ${mpName(G, q.c)} til?`, `Where did ${mpName(G, q.c)} belong?`))}</p><div class="mp-wrap ge-wrap">${geHistSVG(q, rev)}</div>`;
    opts = `<div class="sg-list">${q.opts.map(g => { const cls = rev ? (g === q.ans ? "ok" : g === q.picked ? "bad" : "dim") : "";
      return `<button class="sg-opt sg-txt ge-grp ${cls}" data-a="geans" data-v="${g}" ${rev ? "disabled" : ""}><i style="background:${M.g[g][0]}"></i>${esc(T(M.g[g][1], M.g[g][2]))}</button>`; }).join("")}</div>`;
    if(rev && !fx.pts) fb = `<div class="dv-fb bad sg-fb"><b>${esc(fx.miss === "time" ? T("Tiden gikk ut", "Time ran out") : T("Feil", "Wrong"))}</b><p><span>${esc(mpName(G, q.c))}: <b>${esc(T(M.g[q.ans][1], M.g[q.ans][2]))}</b></span></p></div>`;
  } else {
    const G = MAP_GEO[GE_REG[GE.reg].v], name = mpName(G, q.c);
    if(GE.mode === "find"){
      prompt = `<p class="sg-ask">${esc(T("Trykk på", "Tap"))}</p><p class="sg-name ge-name">${esc(name)}</p><div class="mp-wrap ge-wrap ${rev ? "" : "ge-live"}">${geMapSVG(q, rev)}</div>`;
      if(rev && !fx.pts) fb = `<div class="dv-fb bad sg-fb"><b>${esc(fx.miss === "time" ? T("Tiden gikk ut", "Time ran out") : T("Ikke der", "Not there"))}</b><p><span>${q.tap && G.c[q.tap] ? esc(T(`Du trykket på ${mpName(G, q.tap)}.`, `You tapped ${mpName(G, q.tap)}.`)) + " " : ""}${esc(T(`${name} er markert med grønt.`, `${name} is marked in green.`))}</span></p></div>`;
    } else {
      prompt = `<p class="sg-ask">${esc(T("Hvilket land lyser?", "Which country is lit up?"))}</p><div class="mp-wrap ge-wrap">${geMapSVG(q, rev)}</div>`;
      opts = `<div class="sg-list ge-names">${q.opts.map(c => { const cls = rev ? (c === q.ans ? "ok" : c === q.picked ? "bad" : "dim") : "";
        return `<button class="sg-opt sg-txt ${cls}" data-a="geans" data-v="${c}" ${rev ? "disabled" : ""}>${esc(mpName(G, c))}</button>`; }).join("")}</div>`;
      if(rev && !fx.pts) fb = `<div class="dv-fb bad sg-fb"><b>${esc(fx.miss === "time" ? T("Tiden gikk ut", "Time ran out") : T("Feil", "Wrong"))}</b><p><span>${esc(T("Det var", "It was"))} <b>${esc(name)}</b>.</span></p></div>`;
    }
  }
  $app.innerHTML = `${geTop(GE.mode === "hist" ? T("Historie", "History") : T(GE_REG[GE.reg].t[0], GE_REG[GE.reg].t[1]))}<main class="wrap sg ge">
    <div class="sg-hud"><span class="sg-lives" aria-label="${esc(T(`${GE.lives} liv igjen`, `${GE.lives} lives left`))}">${hearts}</span><span class="sg-n">${Math.min(GE.n + (rev ? 0 : 1), GE_MAX)}/${GE_MAX}</span>
      <span class="sg-combo ${GE.combo >= 3 ? "on" : ""}">${GE.combo >= 3 ? `🔥 ${GE.combo} ${esc(T("på rad", "in a row"))} · ×${mult}` : esc(T(`${GE.ok} riktige`, `${GE.ok} correct`))}</span></div>
    <div class="sg-timebar"><i id="getime" class="sg-time g" style="transform:scaleX(${rev ? 0 : 1})"></i></div>
    <section class="sg-card ge-card ${rev ? (fx.pts ? "ok" : "bad") : ""}">${prompt}${fx.pts ? `<span class="sg-float">+${fx.pts}${fx.mult > 1 ? ` <em>×${fx.mult}</em>` : ""}</span>` : ""}</section>
    ${opts}${fb}
  </main>`;
}
function geMenuHTML(){
  const best = geBest(), mode = GE.mode || "find", st = geSt();
  const known = Object.keys(GE_REG).flatMap(r => gePool(r)).filter((c, i, a) => a.indexOf(c) === i), kn = known.filter(c => st[c] && st[c][2]).length;
  const rows = mode === "hist"
    ? [["", "📜", T("Alle historiekart", "All history maps"), T(`${geHistMaps().length} kart`, `${geHistMaps().length} maps`)], ...geHistMaps().map(id => [id, "🗺️", T(MAPS[id].t[0], MAPS[id].t[1]), T(`${MAPS[id].f.length} tidssteg`, `${MAPS[id].f.length} time steps`)])]
      .map(([id, ic, nm, sub]) => { const b = best["hist:" + (id || "all")] || 0;
        return `<button class="sg-gbtn" data-a="geplay" data-m="${id}"><span class="sg-gic ge-gic">${ic}</span><span><b>${esc(nm)}</b><small>${esc(sub)}${b ? " · 🏆 " + b : ""}</small></span>${I.chevron}</button>`; }).join("")
    : Object.entries(GE_REG).map(([r, R]) => { const b = best[r + ":" + mode] || 0, p = gePool(r), k = p.filter(c => st[c] && st[c][2]).length;
        return `<button class="sg-gbtn" data-a="geplay" data-r="${r}"><span class="sg-gic ge-gic">${R.ic}</span><span><b>${esc(T(R.t[0], R.t[1]))}</b><small>${esc(T(`${k} av ${p.length} land sitter`, `${k} of ${p.length} countries known`))}${b ? " · 🏆 " + b : ""}</small></span>${I.chevron}</button>`; }).join("");
  return `<section class="sg-menu"><div class="sg-mhead"><span class="sg-mic" aria-hidden="true">🗺️</span><div><b>${esc(t("geoTitle"))}</b><small>${esc(T(`${GE_MAX} spørsmål per runde, 3 liv, raskere og raskere · du kan ${kn} av ${known.length} land`, `${GE_MAX} questions per round, 3 lives, faster and faster · you know ${kn} of ${known.length} countries`))}</small></div></div>
    <div class="sg-mbar"><i style="width:${Math.round(kn / Math.max(1, known.length) * 100)}%"></i></div>
    <div class="seg sg-modes">${GE_MODES.map(([k, nb, en]) => `<button class="${mode === k ? "on" : ""}" data-a="gemode" data-m="${k}">${esc(T(nb, en))}</button>`).join("")}</div>
    <p class="ge-how">${esc(mode === "find" ? T("Et navn dukker opp – trykk på landet på kartet.", "A name appears – tap the country on the map.") : mode === "name" ? T("Et land lyser opp – velg riktig navn. Feilsvarene er nabolandene.", "A country lights up – pick the right name. The wrong answers are its neighbours.") : T("Et land blinker på et historisk kart – hvilken side var det på? Kartene er de samme som i historieteorien.", "A country flashes on a historical map – which side was it on? The maps are the same as in the history theory."))}</p>
    <div class="sg-groups">${rows}</div></section>`;
}
function geOverHTML(){
  const st = [[GE.ok, T("riktige", "correct")], [GE.maxCombo, T("lengste rekke", "best streak")], ["+" + GE.xp, "XP"]];
  const missed = [...new Map(GE.missed.map(m => [typeof m === "string" ? m : m.id + m.c, m])).values()].slice(0, 8);
  const mrow = m => { if(typeof m === "string"){ const G = MAP_GEO[GE_REG[GE.reg].v]; return `<div class="sg-mrow"><span class="ge-mic">📍</span><div><b>${esc(mpName(G, m))}</b></div></div>`; }
    const M = MAPS[m.id], G = MAP_GEO[M.v]; return `<div class="sg-mrow"><span class="ge-mic"><i style="background:${M.g[m.g][0]}"></i></span><div><b>${esc(mpName(G, m.c))}</b><small>${esc(T(M.f[m.k].y[0], M.f[m.k].y[1]))}: ${esc(T(M.g[m.g][1], M.g[m.g][2]))}</small></div></div>`; };
  return `<div class="sg-final ${GE.record ? "rec" : ""}">${GE.record ? `<span class="sg-rec">🏆 ${esc(T("Ny rekord!", "New record!"))}</span>` : ""}<div class="sg-big">${GE.score}</div>
      <p>${esc(GE.full ? T(`Hele runden! +${GE.bonus} for livene du hadde igjen.`, `Full round! +${GE.bonus} for the lives you had left.`) : T("Tom for liv – prøv igjen!", "Out of lives – try again!"))}</p>
      <div class="sg-stats">${st.map(([n, l]) => `<span><b>${n}</b>${esc(l)}</span>`).join("")}</div></div>
    <button class="big" data-a="geagain">🗺️ ${esc(T("Spill igjen", "Play again"))}</button>
    ${missed.length ? `<h4 class="grp">${esc(T("Disse må du øve mer på", "Practise these more"))}</h4><div class="sg-missed">${missed.map(mrow).join("")}</div>` : ""}
    <button class="big ghost" data-a="gemenu">${esc(T("Velg kart og modus", "Choose map and mode"))}</button>`;
}
function geBackTo(){
  clearTimeout(geAnswer.t); cancelAnimationFrame(geTick.raf);
  if(GE && GE.view !== "menu"){ GE.view = "menu"; render(); window.scrollTo(0, 0); return; }
  const f = GE && GE.from; GE = null;
  if(["practice", "book", "profile", "lab"].includes(f)){ screen = f; render(); window.scrollTo(0, 0); } else goHome();
}
function geClick(a, b){
  if(!a.startsWith("ge")) return false;
  const d = (b && b.dataset) || {};
  if(a === "geoopen"){ GE = { view: "menu", reg: S.geoReg || "europe", mode: S.geoMode || "find", map: null, from: screen === "geo" ? "home" : screen }; overlay = null; screen = "geo"; render(); window.scrollTo(0, 0); return true; }
  if(a === "gemode"){ S.geoMode = GE.mode = d.m; save(); render(); return true; }
  if(a === "geplay"){ if(d.r){ S.geoReg = d.r; save(); } geStart(d.r || GE.reg, GE.mode, GE.mode === "hist" ? d.m || null : null); return true; }
  if(a === "geagain"){ geStart(GE.reg, GE.mode, GE.map); return true; }
  if(a === "gemenu"){ GE.view = "menu"; render(); window.scrollTo(0, 0); return true; }
  if(a === "geans"){ geAnswer(d.v); return true; }
  if(a === "geback"){ geBackTo(); return true; }
  return false;
}
// «Finn landet»: trykk på kartet. Bommer du med noen få piksler på et lite land, teller det likevel.
document.addEventListener("click", e => {
  const svg = e.target.closest && e.target.closest(".ge-live .ge-svg"); if(!svg || !GE || GE.mode !== "find" || !GE.q || GE.q.picked != null) return;
  const G = MAP_GEO[GE_REG[GE.reg].v], q = GE.q, path = e.target.closest("[data-gc]"), tap = path ? path.dataset.gc : null;
  const m = svg.getScreenCTM(); let near = false;
  if(m){ const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()), b = G.c[q.ans].b, tol = 14 / m.a;
    const dx = Math.max(b[0] - p.x, 0, p.x - b[2]), dy = Math.max(b[1] - p.y, 0, p.y - b[3]);
    near = Math.hypot(dx, dy) < tol && (!tap || !gePool(GE.reg).includes(tap) || Math.max(G.c[q.ans].b[2] - G.c[q.ans].b[0], G.c[q.ans].b[3] - G.c[q.ans].b[1]) * m.a < 22); }
  q.tap = tap; geAnswer(tap || "sea", near);
});
