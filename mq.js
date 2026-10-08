// ============================================================
//  HODEREGNING – Kahoot-stil: mattestykker du klarer i hodet, fire fargede svar, poeng etter hvor fort du svarer.
//  • Alene: 10, 15 eller 20 stykker på fire nivåer. Rekord per nivå.
//  • Utfordre en venn: en lenke (axle.no/#/hoderegning/…) med de samme stykkene og poengsummen din; vennen spiller når det passer.
//  • Ukens hoderegning: alle får de samme 15 stykkene hele uka – én felles toppliste.
//  • Live: verten lager et rom med kode, venner blir med (opptil 40), alle får samme stykke samtidig,
//    toppliste etter hvert stykke og pall til slutt.
//  Live og topplister krever konto og supabase/hoderegning.sql; alene og lenker virker uten.
//  Stykkene lages fra et tall (seed), så alle med samme seed får nøyaktig de samme stykkene og svaralternativene.
//  Poeng som i Kahoot: riktig svar gir 500–1000 etter hvor raskt du svarte, pluss 100 per svar på rad (maks +500).
// ============================================================
Object.assign(UI.nb, { mqTitle: "Hoderegning", mqSub: "Kahoot-stil: regn kjapt, spill live eller utfordre venner" });
Object.assign(UI.en, { mqTitle: "Mental maths", mqSub: "Kahoot style: calculate fast, play live or challenge friends" });
let MQ = null, MQ_PENDING = null;
const MQ_REV = 5000, MQ_WEEK = { lvl: 2, n: 15, secs: 10 };
const MQ_COL = [["#E21B3C", "▲"], ["#1368CE", "◆"], ["#D89E00", "●"], ["#26890C", "■"]];
const MQ_LV = () => [[1, T("Lett", "Easy"), "7 + 5", T("Pluss, minus og gangetabellen til 5", "Add, subtract, times tables to 5")], [2, T("Middels", "Medium"), "48 : 6", T("Hele gangetabellen og deling", "All times tables and division")],
  [3, T("Vanskelig", "Hard"), T("25 % av 80", "25% of 80"), T("Store tall, kvadrater og prosent", "Larger numbers, squares and percent")], [4, T("Ekspert", "Expert"), "14 × 13", T("Regnerekkefølge, brøk og negative tall", "Order of operations, fractions, negatives")]];
const mqN = x => x < 0 ? "−" + (-x) : String(x);
const mqF = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// ---------- stykker ----------
function mqRng(seed){ let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const mqI = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const mqPick = (r, a) => a[Math.floor(r() * a.length)];
function mqShuffle(r, a){ for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function mqHash(s){ let h = 2166136261; for(const ch of String(s)){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) % 1e9; }
// Fire alternativer: riktig svar og tre typiske feil (glemt mente, feil regningsart, én for mye …)
function mqMake(r, q, ans, near, neg){
  const ok = x => Number.isInteger(x) && x !== ans && (neg || x >= 0), cand = [];
  [...near, ans + 1, ans - 1, ans + 2, ans - 2, ans + 10, ans - 10, ans + 3, ans - 3, ans + 4, ans + 5, ans + 6, ans + 7].forEach(x => { if(ok(x) && !cand.includes(x)) cand.push(x); });
  const nr = mqShuffle(r, cand.filter(x => near.includes(x))), rest = mqShuffle(r, cand.filter(x => !near.includes(x)));
  const o = mqShuffle(r, [ans, ...[...nr.slice(0, 2), ...rest, ...nr.slice(2)].slice(0, 3)]);
  return { q, a: ans, o, k: o.indexOf(ans) };
}
function mqOne(r, lv){
  const K = [["add", "sub", "mul"], ["add", "sub", "mul", "div"], ["add2", "sub2", "mul2", "div2", "sq", "pct"], ["mul3", "ops", "frac", "neg", "pct2", "sq"]][lv - 1];
  const k = mqPick(r, K), I = (a, b) => mqI(r, a, b), av = T("av", "of"); let a, b, c, q, ans, near = [];
  switch(k){
    case "add": if(lv === 1){ a = I(1, 12); b = I(1, 20 - a); } else { a = I(12, 79); b = I(9, 99 - a); } q = `${a} + ${b}`; ans = a + b; near = [ans + 10, ans - 10]; break;
    case "sub": if(lv === 1){ a = I(6, 20); b = I(1, a - 1); } else { a = I(31, 99); b = I(6, a - 6); } q = `${a} − ${b}`; ans = a - b; near = [ans + 10, ans - 10, a + b]; break;
    case "mul": if(lv === 1){ a = I(2, 5); b = I(1, 10); } else { a = I(3, 10); b = I(3, 10); } q = `${a} × ${b}`; ans = a * b; near = [ans + a, ans - a, ans + b, ans - b, a + b]; break;
    case "div": b = I(2, 10); ans = I(2, 10); a = b * ans; q = `${a} : ${b}`; near = [ans + 1, ans - 1, ans + 2, a - b]; break;
    case "add2": a = I(25, 199); b = I(25, 199); q = `${a} + ${b}`; ans = a + b; near = [ans + 10, ans - 10, ans + 100, ans - 100]; break;
    case "sub2": a = I(101, 250); b = I(15, a - 20); q = `${a} − ${b}`; ans = a - b; near = [ans + 10, ans - 10, ans + 100]; break;
    case "mul2": a = I(12, 29); b = I(3, 9); q = `${a} × ${b}`; ans = a * b; near = [ans + b, ans - b, ans + 10, ans - 10, (a % 10) * b + Math.floor(a / 10) * 10]; break;
    case "div2": b = I(3, 9); ans = I(12, 40); a = b * ans; q = `${a} : ${b}`; near = [ans + 1, ans - 1, ans + 10, ans - 10]; break;
    case "sq": a = lv >= 4 ? I(13, 25) : I(4, 15); q = `${a}²`; ans = a * a; near = [a * 2, ans + a, ans - a, ans + 1, ans - 1]; break;
    case "pct": { const p = mqPick(r, [10, 20, 25, 50]), base = p === 25 ? 4 * I(2, 30) : p === 50 ? 2 * I(6, 60) : 10 * I(2, 30); q = `${p} % ${av} ${base}`; ans = base * p / 100; near = [ans * 2, Math.floor(ans / 2), ans + 10, base - ans]; break; }
    case "pct2": { const p = mqPick(r, [5, 15, 30, 40, 75]), base = 20 * I(2, 20); q = `${p} % ${av} ${base}`; ans = base * p / 100; near = [ans * 2, base - ans, ans + base / 10, ans - 5]; break; }
    case "mul3": a = I(11, 19); b = I(11, 15); q = `${a} × ${b}`; ans = a * b; near = [ans + 10, ans - 10, ans + a, ans - b]; break;
    case "ops": b = I(2, 9); c = I(2, 9);
      if(r() < .5){ a = I(2, 15); q = `${a} + ${b} × ${c}`; ans = a + b * c; near = [(a + b) * c, ans + 1, ans - c]; }
      else { a = I(2, 9); q = `(${a} + ${b}) × ${c}`; ans = (a + b) * c; near = [a + b * c, ans + c, ans - c]; } break;
    case "frac": { const d = mqPick(r, [3, 4, 5, 8]), n = I(1, d - 1), base = d * I(3, 15); q = `${n}/${d} ${av} ${base}`; ans = base / d * n; near = [base / d, ans + base / d, ans - base / d, base - ans]; break; }
    case "neg": { a = I(-15, 15) || 3; b = I(-12, 12) || -4; const op = mqPick(r, ["+", "−", "×"]), f = x => x < 0 ? `(−${-x})` : String(x);
      q = `${mqN(a)} ${op} ${f(b)}`; ans = op === "+" ? a + b : op === "−" ? a - b : a * b; near = [-ans, ans + 2, ans - 2, op === "×" ? ans + a : op === "+" ? a - b : a + b]; break; }
  }
  return mqMake(r, q, ans, near, lv >= 4);
}
const mqQs = cfg => { const r = mqRng(cfg.seed); return Array.from({ length: cfg.n }, () => mqOne(r, cfg.lvl)); };
const mqPoints = (ms, secs, streak) => Math.round(1000 * (1 - Math.min(1, ms / (secs * 1000)) / 2)) + Math.min(500, Math.max(0, streak - 1) * 100);
const mqKey = cfg => `${cfg.seed}.${cfg.lvl}.${cfg.n}.${cfg.secs}`;
const mqWeekKey = () => "w" + weekKeyOf(new Date());
const mqLvName = lv => (MQ_LV().find(x => x[0] === lv) || [])[1] || "";

// ---------- åpne og starte ----------
// arg fra adressen: «live/KODE», eller en utfordring «seed.nivå.antall.sek[.poeng.navn]».
function mqOpen(arg, from){
  MQ = { view: "menu", lvl: S.mqLvl || 2, n: S.mqN || 10, secs: S.mqSecs || 10, from: from || (screen !== "mq" ? screen : "home"), chal: null, live: null, board: null, joinCode: "" };
  const s = String(arg || "");
  if(/^live\//i.test(s)){ MQ.joinCode = s.slice(5).toUpperCase().slice(0, 5); if(AUTH) setTimeout(() => mqLiveJoin(MQ.joinCode), 0); }
  else if(/^\d{1,10}\.[1-4]\.\d{1,2}\.\d{1,2}/.test(s)){
    const p = s.split("."), cfg = { seed: +p[0], lvl: +p[1], n: Math.min(30, Math.max(5, +p[2])), secs: Math.min(30, Math.max(3, +p[3])) };
    MQ.chal = { cfg, score: p[4] != null && /^\d+$/.test(p[4]) ? +p[4] : null, name: p.slice(5).join(".").slice(0, 24) };
  }
  screen = "mq"; render(); window.scrollTo(0, 0);
}
function mqStart(mode, cfg){
  clearInterval(MQ.tick);
  Object.assign(MQ, { mode, cfg, qs: mqQs(cfg), i: 0, score: 0, ok: 0, streak: 0, bestStreak: 0, times: [], chosen: null, gained: 0, view: "count", goAt: Date.now() + 3000, board: null, result: null });
  MQ.tick = setInterval(mqTick, 100); render(); if(typeof stEv === "function") stEv("mq", mode, "lv" + cfg.lvl);
}
function mqShow(i){ MQ.i = i; MQ.chosen = null; MQ.gained = 0; MQ.qStart = Date.now(); MQ.view = "q"; render(); }
function mqAnswer(idx){
  if(!MQ || MQ.view !== "q" || MQ.chosen != null) return;
  const q = MQ.qs[MQ.i], ms = Date.now() - MQ.qStart; if(ms > MQ.cfg.secs * 1000 + 300) return;
  MQ.chosen = idx;
  if(idx === q.k){ MQ.streak++; MQ.bestStreak = Math.max(MQ.bestStreak, MQ.streak); MQ.ok++; MQ.gained = mqPoints(ms, MQ.cfg.secs, MQ.streak); MQ.times.push(ms); sfx("ok"); }
  else { MQ.streak = 0; MQ.gained = 0; if(idx >= 0) sfx("bad"); }
  MQ.score += MQ.gained; MQ.lastQ = MQ.i;
  if(MQ.mode === "live"){ mqLivePush(); render(); return; }
  MQ.view = "rev"; MQ.revUntil = Date.now() + (idx === q.k ? 1100 : 1900); render();
}
function mqTick(){
  if(!MQ || screen !== "mq"){ if(MQ) clearInterval(MQ.tick); return; }
  if(MQ.mode === "live") return mqLiveTick();
  const now = Date.now();
  if(MQ.view === "count"){ const n = Math.ceil((MQ.goAt - now) / 1000); if(n <= 0) mqShow(0); else { const el = document.getElementById("mqcount"); if(el && el.textContent !== String(n)){ el.textContent = n; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); } } }
  else if(MQ.view === "q"){ const left = MQ.cfg.secs * 1000 - (now - MQ.qStart); mqBar(left); if(left <= 0) mqAnswer(-1); }
  else if(MQ.view === "rev" && now >= MQ.revUntil){ if(MQ.i + 1 < MQ.qs.length) mqShow(MQ.i + 1); else mqFinish(); }
}
function mqBar(left){
  const bar = document.getElementById("mqbar"), sec = document.getElementById("mqsec"), T0 = MQ.cfg.secs * 1000;
  if(bar) bar.style.width = Math.max(0, Math.min(100, left / T0 * 100)) + "%";
  if(sec) sec.textContent = Math.max(0, Math.ceil(left / 1000));
}
function mqFinish(){
  clearInterval(MQ.tick); MQ.view = "end";
  const key = MQ.mode === "week" ? mqWeekKey() : mqKey(MQ.cfg), bk = MQ.cfg.lvl + "." + MQ.cfg.n;
  S.mqBest ||= {}; MQ.newBest = MQ.score > (S.mqBest[bk] || 0); if(MQ.newBest) S.mqBest[bk] = MQ.score;
  if(MQ.mode === "week"){ const w = S.mqWeek && S.mqWeek.key === key ? S.mqWeek : { key, best: 0, n: 0 }; w.n++; w.best = Math.max(w.best, MQ.score); S.mqWeek = w; }
  const st = awardXP(Math.max(1, MQ.ok)); save(); render();
  setTimeout(() => (MQ.newBest && MQ.score > 0) || (MQ.chal && MQ.chal.score != null && MQ.score > MQ.chal.score) ? confetti("level") : sfx("complete"), 200);
  if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
  if(AUTH && MQ.mode !== "live") mqSubmit(key);
}
// ---------- topplister ----------
function mqErr(e){
  const c = String((e && (e.msg || e.message)) || "");
  if(e && e.kind === "auth") return T("Logg inn for å spille live og komme på topplister.", "Log in to play live and get on the leaderboards.");
  if(e && e.kind === "offline") return T("Ingen nettforbindelse.", "No connection.");
  if(/not_found/.test(c)) return T("Fant ikke rommet. Sjekk koden.", "Room not found. Check the code.");
  if(/full/.test(c)) return T("Rommet er fullt.", "The room is full.");
  if(/rate/.test(c)) return T("Du har laget mange rom. Vent litt.", "You have created many rooms. Wait a bit.");
  if(/function|does not exist|schema cache/i.test(c) || (e && e.status === 404)) return T("Live-spill og topplister er ikke slått på ennå.", "Live games and leaderboards are not enabled yet.");
  return T("Noe gikk galt. Prøv igjen.", "Something went wrong. Try again.");
}
async function mqSubmit(key){
  const m = MQ; m.board = { key, rows: null };
  try{ await frRpc("mq_submit", { p_key: key, p_score: m.score, p_ok: m.ok, p_name: S.name || "", p_av: S.avatar || null }); }catch(e){ m.board.err = mqErr(e); if(MQ === m && screen === "mq") render(); return; }
  mqBoard(key);
}
async function mqBoard(key){
  const m = MQ; m.board = Object.assign(m.board && m.board.key === key ? m.board : {}, { key, err: null });
  try{ m.board.rows = await frRpc("mq_board", { p_key: key }) || []; }catch(e){ m.board.err = mqErr(e); }
  if(MQ === m && screen === "mq") render();
}
function mqShare(){
  const c = MQ.cfg, url = location.origin + location.pathname + "#/" + rtW("mq") + "/" + [c.seed, c.lvl, c.n, c.secs, MQ.score, encodeURIComponent((S.name || "").replace(/\./g, " ").slice(0, 24))].join(".");
  const txt = T(`Jeg fikk ${mqF(MQ.score)} poeng i hoderegning (${mqLvName(c.lvl).toLowerCase()}) på Axle. Klarer du å slå meg? 🧮`, `I scored ${mqF(MQ.score)} in mental maths (${mqLvName(c.lvl).toLowerCase()}) on Axle. Can you beat me? 🧮`);
  if(navigator.share) navigator.share({ title: "Axle", text: txt, url }).catch(() => {});
  else navigator.clipboard?.writeText(txt + " " + url).then(() => toast(T("Lenken er kopiert – send den til en venn!", "Link copied – send it to a friend!")), () => toast(url));
}

// ---------- live ----------
const mqStartAt = r => r.start_at ? Date.parse(r.start_at) - (Date.parse(r.now) - Date.now()) : null;
function mqLiveApply(r){
  if(!r || !MQ) return;
  const was = MQ.live && MQ.live.startAt;
  MQ.live = Object.assign(MQ.live || {}, { code: r.code, isHost: r.is_host, status: r.status, players: r.players || [], startAt: mqStartAt(r) });
  if(!MQ.cfg || MQ.cfg.seed !== r.cfg.seed) MQ.cfg = r.cfg;
  if(MQ.live.startAt && !was){ // spillet har startet: følg tidsplanen
    clearInterval(MQ.tick); Object.assign(MQ, { mode: "live", podDrawn: false, qs: mqQs(MQ.cfg), i: -1, score: 0, ok: 0, streak: 0, bestStreak: 0, times: [], chosen: null, gained: 0, view: "count" });
    MQ.tick = setInterval(mqTick, 100); render();
  } else if(screen === "mq" && ["lobby", "rev", "podium"].includes(MQ.view)) render();
}
async function mqLiveCreate(){
  if(!AUTH){ toast(mqErr({ kind: "auth" })); return; }
  MQ.busy = true; MQ.err = null; render();
  const cfg = { seed: 1 + Math.floor(Math.random() * 999999999), lvl: MQ.lvl, n: MQ.n, secs: MQ.secs };
  try{ const r = await frRpc("mq_create", { p_cfg: cfg, p_name: S.name || "", p_av: S.avatar || null }); MQ.busy = false; MQ.view = "lobby"; MQ.cfg = cfg; mqLiveApply(r); render(); mqPoll(1000); }
  catch(e){ MQ.busy = false; MQ.err = mqErr(e); render(); }
}
async function mqLiveJoin(code){
  code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
  if(code.length !== 5){ MQ.err = T("Koden har 5 tegn.", "The code has 5 characters."); render(); return; }
  if(!AUTH){ MQ.err = mqErr({ kind: "auth" }); render(); return; }
  MQ.busy = true; MQ.err = null; render();
  try{ const r = await frRpc("mq_join", { p_code: code, p_name: S.name || "", p_av: S.avatar || null }); MQ.busy = false; MQ.view = "lobby"; MQ.cfg = r.cfg; mqLiveApply(r); render(); mqPoll(800); }
  catch(e){ MQ.busy = false; MQ.err = mqErr(e); render(); }
}
function mqPoll(ms){ clearTimeout(MQ.pollT); const m = MQ; m.pollT = setTimeout(async () => {
  if(MQ !== m || screen !== "mq" || !m.live || m.view === "menu") return;
  try{ const r = m.dirty ? await frRpc("mq_push", { p_code: m.live.code, p_state: mqLiveState() }) : await frRpc("mq_get", { p_code: m.live.code }); m.dirty = false; mqLiveApply(r); }
  catch(e){ if(/not_found/.test(String((e && (e.msg || e.message)) || "")) && m.view === "lobby"){ m.view = "menu"; m.live = null; m.err = T("Verten stengte rommet.", "The host closed the room."); render(); return; } }
  if(m.view === "podium" && m.podiumPolls != null && --m.podiumPolls <= 0) return;
  mqPoll(m.view === "q" ? 1500 : 1000); }, ms); }
const mqLiveState = () => ({ i: MQ.i, a: MQ.lastQ ?? -1, s: MQ.score, k: MQ.ok, r: MQ.streak, g: MQ.gained });
function mqLivePush(){ MQ.dirty = true; mqPoll(150); }
function mqLiveTick(){
  const L = MQ.live; if(!L || !L.startAt) return;
  const now = Date.now(), T0 = MQ.cfg.secs * 1000, P = T0 + MQ_REV, el = now - L.startAt;
  if(el < 0){ if(MQ.view !== "count"){ MQ.view = "count"; render(); } const el2 = document.getElementById("mqcount"), n = String(Math.ceil(-el / 1000)); if(el2 && el2.textContent !== n){ el2.textContent = n; el2.classList.remove("pop"); void el2.offsetWidth; el2.classList.add("pop"); } return; }
  const idx = Math.floor(el / P);
  if(idx >= MQ.cfg.n){ if(MQ.view !== "podium"){ MQ.view = "podium"; MQ.podiumPolls = 4; MQ.dirty = true; mqPoll(100); clearInterval(MQ.tick);
      const me = mqRanked().findIndex(p => p.me); awardXP(Math.max(1, MQ.ok)); save(); render(); setTimeout(() => me === 0 ? confetti("level") : sfx("complete"), 300); } return; }
  const within = el - idx * P;
  if(within < T0){ if(MQ.i !== idx || MQ.view !== "q"){ MQ.i = idx; MQ.chosen = null; MQ.gained = 0; MQ.qStart = L.startAt + idx * P; MQ.view = "q"; render(); } mqBar(T0 - within);
    const n = document.getElementById("mqans"); if(n) n.textContent = mqAnsweredTxt(); }
  else if(MQ.view !== "rev" || MQ.i !== idx){ MQ.i = idx; if(MQ.chosen == null){ MQ.streak = 0; MQ.gained = 0; } MQ.view = "rev"; MQ.dirty = true; mqPoll(100); render(); }
}
// Alle spillere sortert etter poeng. Min egen poengsum er alltid den lokale (nyest).
function mqRanked(){ return (MQ.live && MQ.live.players || []).map(p => p.me ? Object.assign({}, p, { st: mqLiveState() }) : p).sort((a, b) => ((b.st || {}).s || 0) - ((a.st || {}).s || 0)); }
function mqAnsweredTxt(){ const ps = (MQ.live && MQ.live.players) || [], n = ps.filter(p => p.me ? MQ.chosen != null : ((p.st || {}).a ?? -1) >= MQ.i).length; return T(`${n} av ${ps.length} har svart`, `${n} of ${ps.length} answered`); }
function mqLeave(){
  if(MQ){ clearInterval(MQ.tick); clearTimeout(MQ.pollT); if(MQ.live && MQ.view === "lobby") frRpc("mq_leave", { p_code: MQ.live.code }).catch(() => {}); }
  const back = (MQ && MQ.from) || "home"; MQ = null; screen = back === "mq" ? "home" : back; render();
}
function mqShareRoom(){
  const url = location.origin + location.pathname + "#/" + rtW("mq") + "/live/" + MQ.live.code, txt = T(`Bli med på hoderegning live på Axle! Kode: ${MQ.live.code}`, `Join live mental maths on Axle! Code: ${MQ.live.code}`);
  if(navigator.share) navigator.share({ title: "Axle", text: txt, url }).catch(() => {});
  else navigator.clipboard?.writeText(url).then(() => toast(T("Lenken er kopiert!", "Link copied!")), () => toast(url));
}

// ---------- tegning ----------
const mqAv = (p, i, size) => p.me ? (meAvHTML(size, "fr-avs") || frAvatar(S.name || "?", 0, null, size)) : frAvatar(p.name || "?", i + 1, p.av, size);
const mqTop = (sub, title) => `<div class="top mq-top"><div class="wrap"><button class="iconbtn" data-a="mqback" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(sub)}</small><b>${esc(title)}</b></div>${MQ && MQ.qs && ["q", "rev"].includes(MQ.view) ? `<span class="mq-sc">${mqF(MQ.score)}</span>` : ""}</div></div>`;
function mqBoardHTML(b, title){
  if(!b) return "";
  if(b.err) return `<p class="mq-note">${esc(b.err)}</p>`;
  if(!b.rows) return `<p class="mq-note">${esc(T("Henter topplisten …", "Loading the leaderboard …"))}</p>`;
  if(!b.rows.length) return `<p class="mq-note">${esc(T("Ingen på topplisten ennå – bli den første!", "Nobody on the leaderboard yet – be the first!"))}</p>`;
  return `<section class="mq-board"><h3>🏆 ${esc(title || T("Toppliste", "Leaderboard"))}</h3>${b.rows.map((r, i) => `<div class="mq-brow ${r.me ? "me" : ""}"><span class="mq-pos">${r.pos <= 3 ? ["🥇", "🥈", "🥉"][r.pos - 1] : r.pos}</span>${frAvatar(r.name || "?", i, r.av, 30)}<b>${esc(r.name || T("Anonym", "Anonymous"))}${r.friend ? ` <small>${esc(T("venn", "friend"))}</small>` : ""}${r.me ? ` <small>${esc(T("deg", "you"))}</small>` : ""}</b><span class="mq-bs">${mqF(r.score)}</span></div>`).join("")}</section>`;
}
function mqTiles(q, rev){
  return `<div class="mq-tiles ${rev ? "rev" : ""} ${MQ.chosen != null && !rev ? "sent" : ""}">${q.o.map((v, i) => {
    const st = rev ? (i === q.k ? "ok" : i === MQ.chosen ? "bad" : "dim") : MQ.chosen != null ? (i === MQ.chosen ? "pick" : "dim") : "";
    return `<button class="mq-tile ${st}" style="--c:${MQ_COL[i][0]}" data-a="mqans" data-i="${i}" ${rev || MQ.chosen != null ? "disabled" : ""} aria-label="${esc(mqN(v))}"><span class="mq-sh" aria-hidden="true">${MQ_COL[i][1]}</span><b>${mqN(v)}</b>${rev && i === q.k ? `<span class="mq-ck" aria-hidden="true">✓</span>` : ""}</button>`; }).join("")}</div>`;
}
function mqResultBanner(q){
  const ok = MQ.chosen === q.k;
  return `<div class="mq-res ${ok ? "ok" : "bad"} pop"><b>${ok ? T("Riktig!", "Correct!") : MQ.chosen == null || MQ.chosen < 0 ? T("For sent!", "Too late!") : T("Feil", "Wrong")}</b>${ok ? `<span>+${mqF(MQ.gained)}</span>${MQ.streak > 1 ? `<span class="mq-fire">🔥 ${MQ.streak} ${esc(T("på rad", "in a row"))}</span>` : ""}` : `<span>${esc(T("Svaret er", "The answer is"))} ${mqN(q.a)}</span>`}</div>`;
}
function renderMq(){
  if(!MQ){ const a = MQ_PENDING; MQ_PENDING = null; mqOpen(a); return; }
  const v = MQ.view, lv = MQ_LV();
  if(v === "menu"){
    const wk = mqWeekKey(), my = S.mqWeek && S.mqWeek.key === wk ? S.mqWeek.best : 0, best = (S.mqBest || {})[MQ.lvl + "." + MQ.n] || 0, ch = MQ.chal;
    $app.innerHTML = `${mqTop(T("Spill", "Games"), T("Hoderegning", "Mental maths"))}<main class="wrap mq-menu">
      ${ch ? `<section class="mq-chal"><span class="mq-chic">⚔️</span><div><b>${esc(ch.score != null ? T(`${ch.name || "En venn"} utfordrer deg!`, `${ch.name || "A friend"} challenges you!`) : T("Du har fått en utfordring", "You got a challenge"))}</b>
        <small>${esc(mqLvName(ch.cfg.lvl))} · ${ch.cfg.n} ${esc(T("stykker", "problems"))} · ${ch.cfg.secs} s${ch.score != null ? " · " + esc(T(`å slå: ${mqF(ch.score)} poeng`, `to beat: ${mqF(ch.score)} points`)) : ""}</small></div>
        <button class="big" data-a="mqchal">${esc(T("Ta utfordringen", "Take the challenge"))}</button></section>` : ""}
      <section class="mq-hero"><div class="mq-hq" aria-hidden="true"><span>7 × 8</span><i>=</i><span>?</span></div><h2>${esc(T("Regn i hodet – kjappest vinner", "Calculate in your head – fastest wins"))}</h2>
        <p>${esc(T("Fire svar, fire farger. Riktig svar gir 500–1000 poeng – jo raskere, jo flere. Svar på rad gir bonus.", "Four answers, four colours. A correct answer gives 500–1000 points – the faster, the more. Answers in a row give a bonus."))}</p></section>
      <h3 class="mq-h">${esc(T("Nivå", "Level"))}</h3>
      <div class="mq-lvls">${lv.map(([n, name, ex, sub]) => `<button class="mq-lv ${MQ.lvl === n ? "on" : ""}" data-a="mqlvl" data-n="${n}"><span>${esc(ex)}</span><b>${esc(name)}</b><small>${esc(sub)}</small></button>`).join("")}</div>
      <div class="mq-opts"><div><h3 class="mq-h">${esc(T("Antall stykker", "Problems"))}</h3><div class="seg">${[10, 15, 20].map(n => `<button class="${MQ.n === n ? "on" : ""}" data-a="mqn" data-n="${n}">${n}</button>`).join("")}</div></div>
        <div><h3 class="mq-h">${esc(T("Tid per stykke", "Time per problem"))}</h3><div class="seg">${[5, 10, 20].map(n => `<button class="${MQ.secs === n ? "on" : ""}" data-a="mqsecs" data-n="${n}">${n} s</button>`).join("")}</div></div></div>
      <button class="big mq-go" data-a="mqsolo">▶ ${esc(T("Spill alene", "Play solo"))}</button>${best ? `<p class="mq-rec">🏆 ${esc(T(`Rekord på dette nivået: ${mqF(best)} poeng`, `Record at this level: ${mqF(best)} points`))}</p>` : ""}
      <section class="mq-card mq-live"><div class="mq-ch"><span>🎉</span><div><b>${esc(T("Live med venner", "Live with friends"))}</b><small>${esc(T("Som Kahoot: lag et rom, del koden, og alle får samme stykke samtidig. Toppliste etter hvert stykke og pall til slutt.", "Like Kahoot: create a room, share the code, and everyone gets the same problem at once. Leaderboard after each problem and a podium at the end."))}</small></div></div>
        ${MQ.err ? `<p class="du-err">${esc(MQ.err)}</p>` : ""}
        ${AUTH ? `<button class="big" data-a="mqcreate" ${MQ.busy ? "disabled" : ""}>${esc(MQ.busy ? T("Et øyeblikk …", "One moment …") : T("Lag et rom", "Create a room"))}</button>
          <div class="du-join"><input id="mqjoin" maxlength="5" autocapitalize="characters" autocomplete="off" placeholder="${esc(T("Kode", "Code"))}" value="${esc(MQ.joinCode || "")}" aria-label="${esc(T("Kode", "Code"))}"><button class="big ghost" data-a="mqjoin" ${MQ.busy ? "disabled" : ""}>${esc(T("Bli med", "Join"))}</button></div>`
          : `<button class="big" data-a="aclogin">${esc(T("Logg inn for å spille live", "Log in to play live"))}</button>`}</section>
      <section class="mq-card mq-week"><div class="mq-ch"><span>📅</span><div><b>${esc(T("Ukens hoderegning", "This week's mental maths"))}</b><small>${esc(T(`Alle får de samme ${MQ_WEEK.n} stykkene denne uka (${mqLvName(MQ_WEEK.lvl).toLowerCase()}, ${MQ_WEEK.secs} s). Spill når det passer – beste forsøk teller.`, `Everyone gets the same ${MQ_WEEK.n} problems this week (${mqLvName(MQ_WEEK.lvl).toLowerCase()}, ${MQ_WEEK.secs} s). Play when it suits you – your best attempt counts.`))}</small>${my ? `<small class="mq-wb">${esc(T(`Din beste denne uka: ${mqF(my)}`, `Your best this week: ${mqF(my)}`))}</small>` : ""}</div></div>
        <div class="mq-2"><button class="big" data-a="mqweek">${esc(my ? T("Prøv igjen", "Try again") : T("Spill", "Play"))}</button><button class="big ghost" data-a="mqwboard">${esc(T("Toppliste", "Leaderboard"))}</button></div>
        ${MQ.board && MQ.board.key === wk ? mqBoardHTML(MQ.board, T("Denne uka", "This week")) : ""}</section>
    </main>`;
    const inp = document.getElementById("mqjoin"); if(inp){ inp.addEventListener("input", () => { MQ.joinCode = inp.value.toUpperCase(); }); inp.addEventListener("keydown", e => { if(e.key === "Enter") mqLiveJoin(inp.value); }); }
    return;
  }
  if(v === "lobby"){
    const L = MQ.live, ps = L.players || [];
    $app.innerHTML = `${mqTop(T("Live", "Live"), T("Hoderegning", "Mental maths"))}<main class="wrap mq-lobby">
      <p class="du-k">${esc(T("Koden til rommet", "Room code"))}</p><div class="du-code">${esc(L.code)}</div>
      <p class="mq-cfg">${esc(mqLvName(MQ.cfg.lvl))} · ${MQ.cfg.n} ${esc(T("stykker", "problems"))} · ${MQ.cfg.secs} s</p>
      <button class="big ghost" data-a="mqshareroom">${esc(T("Del lenke til rommet", "Share a link to the room"))}</button>
      <h3 class="mq-h">${esc(T(`Spillere (${ps.length})`, `Players (${ps.length})`))}</h3>
      <div class="mq-pl">${ps.map((p, i) => `<span class="mq-p ${p.me ? "me" : ""}">${mqAv(p, i, 34)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b>${p.host ? `<small>${esc(T("vert", "host"))}</small>` : ""}</span>`).join("")}</div>
      ${L.isHost ? `<button class="big mq-go" data-a="mqlstart">${esc(ps.length > 1 ? T("Start spillet!", "Start the game!") : T("Start (vent gjerne på flere)", "Start (or wait for more)"))}</button>` : `<p class="du-wt"><span class="du-dots"><i></i><i></i><i></i></span> ${esc(T("Venter på at verten starter …", "Waiting for the host to start …"))}</p>`}
    </main>`;
    return;
  }
  if(v === "count"){
    const n = MQ.mode === "live" ? Math.max(1, Math.ceil((MQ.live.startAt - Date.now()) / 1000)) : Math.max(1, Math.ceil((MQ.goAt - Date.now()) / 1000));
    $app.innerHTML = `${mqTop(mqLvName(MQ.cfg.lvl), T("Hoderegning", "Mental maths"))}<main class="wrap mq-count"><div class="du-count pop" id="mqcount">${n}</div><p>${esc(T("Gjør deg klar!", "Get ready!"))}</p><small>${esc(T("Tips: trykk 1–4 på tastaturet", "Tip: press 1–4 on the keyboard"))}</small></main>`;
    return;
  }
  if(v === "q" || v === "rev"){
    const q = MQ.qs[MQ.i], rev = v === "rev", live = MQ.mode === "live";
    const ranked = live && rev ? mqRanked() : null, myPos = ranked ? ranked.findIndex(p => p.me) : -1;
    $app.innerHTML = `${mqTop(`${MQ.i + 1} / ${MQ.qs.length}`, T("Hoderegning", "Mental maths"))}<main class="wrap mq-play">
      <div class="mq-qc"><div class="mq-q">${esc(q.q)} <i>= ?</i></div>${!rev ? `<div class="mq-timer"><span id="mqsec">${MQ.cfg.secs}</span><div class="mq-bar"><i id="mqbar"></i></div></div>` : mqResultBanner(q)}</div>
      ${mqTiles(q, rev)}
      ${live && !rev ? `<p class="mq-wait" id="mqans">${esc(mqAnsweredTxt())}</p>${MQ.chosen != null ? `<p class="mq-sent">${esc(T("Svar sendt! Venter på de andre …", "Answer sent! Waiting for the others …"))}</p>` : ""}` : ""}
      ${ranked ? `<section class="mq-board mq-live-b"><h3>${esc(T(`Du er nr. ${myPos + 1} av ${ranked.length}`, `You are #${myPos + 1} of ${ranked.length}`))}</h3>${ranked.slice(0, 5).map((p, i) => `<div class="mq-brow ${p.me ? "me" : ""}"><span class="mq-pos">${i + 1}</span>${mqAv(p, i, 30)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}${(p.st || {}).r > 1 ? ` <small>🔥${p.st.r}</small>` : ""}</b><span class="mq-bs">${mqF((p.st || {}).s || 0)}</span></div>`).join("")}</section>` : ""}
      ${!live && rev ? `<button class="big ghost mq-next" data-a="mqnext">${esc(T("Neste", "Next"))} →</button>` : ""}
    </main>`;
    if(!rev) mqBar(MQ.cfg.secs * 1000 - (Date.now() - MQ.qStart));
    return;
  }
  if(v === "podium"){
    const r = mqRanked(), me = r.findIndex(p => p.me), top = [r[1], r[0], r[2]], an = !MQ.podDrawn; MQ.podDrawn = true;
    $app.innerHTML = `${mqTop(T("Live", "Live"), T("Resultat", "Results"))}<main class="wrap mq-end">
      <div class="mq-pod ${an ? "anim" : ""}">${top.map((p, j) => p ? `<div class="mq-pc p${[2, 1, 3][j]} ${p.me ? "me" : ""}">${mqAv(p, j, j === 1 ? 64 : 50)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b><span>${mqF((p.st || {}).s || 0)}</span><div class="mq-pb">${[2, 1, 3][j]}</div></div>` : `<div class="mq-pc empty"></div>`).join("")}</div>
      <h2>${esc(me === 0 ? T("Du vant! 🏆", "You won! 🏆") : T(`Du ble nr. ${me + 1}`, `You came #${me + 1}`))}</h2>
      <p class="mq-stat">${esc(T(`${MQ.ok} av ${MQ.cfg.n} riktige · ${mqF(MQ.score)} poeng · lengste rekke ${MQ.bestStreak}`, `${MQ.ok} of ${MQ.cfg.n} correct · ${mqF(MQ.score)} points · longest streak ${MQ.bestStreak}`))}</p>
      ${r.length > 3 ? `<section class="mq-board">${r.slice(3).map((p, i) => `<div class="mq-brow ${p.me ? "me" : ""}"><span class="mq-pos">${i + 4}</span>${mqAv(p, i + 3, 30)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b><span class="mq-bs">${mqF((p.st || {}).s || 0)}</span></div>`).join("")}</section>` : ""}
      <button class="big" data-a="mqmenu">${esc(T("Spill igjen", "Play again"))}</button></main>`;
    return;
  }
  if(v === "end"){
    const ch = MQ.mode === "chal" && MQ.chal && MQ.chal.score != null ? MQ.chal : null, avg = MQ.times.length ? MQ.times.reduce((a, b) => a + b, 0) / MQ.times.length / 1000 : 0;
    const won = ch && MQ.score > ch.score, tie = ch && MQ.score === ch.score;
    $app.innerHTML = `${mqTop(mqLvName(MQ.cfg.lvl), MQ.mode === "week" ? T("Ukens hoderegning", "This week's mental maths") : T("Hoderegning", "Mental maths"))}<main class="wrap mq-end">
      <div class="mq-big">${mqF(MQ.score)}<small>${esc(T("poeng", "points"))}</small></div>
      ${MQ.newBest && MQ.score > 0 ? `<p class="mq-rec">🏆 ${esc(T("Ny rekord!", "New record!"))}</p>` : ""}
      <div class="mq-stats"><span><b>${MQ.ok}/${MQ.cfg.n}</b><small>${esc(T("riktige", "correct"))}</small></span><span><b>${avg ? avg.toFixed(1).replace(".", LANG === "en" ? "." : ",") + " s" : "–"}</b><small>${esc(T("snittid", "avg. time"))}</small></span><span><b>🔥 ${MQ.bestStreak}</b><small>${esc(T("lengste rekke", "best streak"))}</small></span></div>
      ${ch ? `<section class="mq-vs ${won ? "won" : tie ? "" : "lost"}"><div><b>${esc(T("Deg", "You"))}</b><span>${mqF(MQ.score)}</span></div><i>VS</i><div><b>${esc(ch.name || T("Venn", "Friend"))}</b><span>${mqF(ch.score)}</span></div><p>${esc(won ? T("Du vant utfordringen! 🎉", "You won the challenge! 🎉") : tie ? T("Helt likt!", "A tie!") : T("Ikke denne gangen – prøv igjen!", "Not this time – try again!"))}</p></section>` : ""}
      <div class="mq-2"><button class="big" data-a="mqagain">${esc(T("Spill igjen", "Play again"))}</button><button class="big ghost" data-a="mqshare">⚔️ ${esc(ch ? T("Utfordre tilbake", "Challenge back") : T("Utfordre en venn", "Challenge a friend"))}</button></div>
      ${MQ.mode !== "solo" ? mqBoardHTML(MQ.board, MQ.mode === "week" ? T("Denne uka", "This week") : T("Alle som har tatt utfordringen", "Everyone who took the challenge")) : ""}
      ${!AUTH ? `<p class="mq-note">${esc(T("Logg inn for å komme på topplistene.", "Log in to get on the leaderboards."))}</p>` : ""}
      <button class="big ghost" data-a="mqmenu">${esc(T("Til menyen", "Back to the menu"))}</button></main>`;
  }
}
function mqClick(a, b){
  if(a === "mqopen"){ overlay = null; mqOpen(null, screen); return true; }
  if(!a.startsWith("mq") || !MQ) return false;
  const d = (b && b.dataset) || {}, solo = () => ({ seed: 1 + Math.floor(Math.random() * 999999999), lvl: MQ.lvl, n: MQ.n, secs: MQ.secs });
  if(a === "mqback"){ if(["q", "rev", "count"].includes(MQ.view) && MQ.mode !== "live"){ clearInterval(MQ.tick); MQ.view = "menu"; render(); return true; } mqLeave(); return true; }
  if(a === "mqlvl"){ MQ.lvl = S.mqLvl = +d.n; save(); render(); return true; }
  if(a === "mqn"){ MQ.n = S.mqN = +d.n; save(); render(); return true; }
  if(a === "mqsecs"){ MQ.secs = S.mqSecs = +d.n; save(); render(); return true; }
  if(a === "mqsolo"){ mqStart("solo", solo()); return true; }
  if(a === "mqchal"){ mqStart("chal", MQ.chal.cfg); return true; }
  if(a === "mqweek"){ const k = mqWeekKey(); mqStart("week", Object.assign({ seed: mqHash(k) }, MQ_WEEK)); return true; }
  if(a === "mqwboard"){ if(!AUTH){ toast(mqErr({ kind: "auth" })); return true; } MQ.board = { key: mqWeekKey(), rows: null }; render(); mqBoard(mqWeekKey()); return true; }
  if(a === "mqans"){ mqAnswer(+d.i); return true; }
  if(a === "mqnext"){ MQ.revUntil = 0; mqTick(); return true; }
  if(a === "mqagain"){ if(MQ.mode === "solo") mqStart("solo", solo()); else mqStart(MQ.mode, MQ.cfg); return true; }
  if(a === "mqshare"){ mqShare(); return true; }
  if(a === "mqmenu"){ clearInterval(MQ.tick); clearTimeout(MQ.pollT); MQ.view = "menu"; MQ.live = null; MQ.board = null; MQ.err = null; render(); return true; }
  if(a === "mqcreate"){ mqLiveCreate(); return true; }
  if(a === "mqjoin"){ mqLiveJoin((document.getElementById("mqjoin") || {}).value || MQ.joinCode); return true; }
  if(a === "mqshareroom"){ mqShareRoom(); return true; }
  if(a === "mqlstart"){ frRpc("mq_start", { p_code: MQ.live.code }).then(mqLiveApply).catch(e => toast(mqErr(e))); return true; }
  return false;
}
document.addEventListener("keydown", e => {
  if(screen !== "mq" || !MQ || overlay || (e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) return;
  if(MQ.view === "q" && /^[1-4]$/.test(e.key)){ e.preventDefault(); mqAnswer(+e.key - 1); }
  else if(MQ.view === "rev" && MQ.mode !== "live" && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); MQ.revUntil = 0; mqTick(); }
});
