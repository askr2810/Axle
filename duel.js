// ============================================================
//  DUELL – spill live mot en venn.
//  • Online (krever konto, supabase/duell.sql): «Kappløp» (10 spørsmål, raskest og flest riktige)
//    og «Tautrekking» (hvert riktig svar drar tauet mot deg, først til 5). Verten lager spørsmålene,
//    vennen blir med med kode, lenke (axle.no/#/duell/KODE) eller invitasjon. Tilstanden synkes hvert sekund.
//  • Lynduell på samme mobil: skjermen deles i to (den øverste halvdelen er snudd), samme spørsmål,
//    den som først trykker riktig får poenget. Ingen konto trengs.
// ============================================================
let DU = null;  // online-duell
let LO = null;  // lynduell på samme mobil
const DU_RACE_N = 10, DU_TUG_N = 40, DU_TUG_WIN = 5, DU_TUG_SECS = 90, LO_WIN = 7;

// ---------- spørsmål ----------
// Flervalg fra fagene i studiet (eller bare gjeldende fag) og pugge-kortene, gjort om til kompakte objekter som kan sendes.
function duQuestions(n, scope, maxLen = 260){
  const courses = scope === "course" ? [COURSE(S.current)] : snCourses(), out = [], seen = new Set();
  for(let k = 0; out.length < n && k < n * 8; k++){
    let it = null;
    if(scope !== "course" && Math.random() < 0.3){ const pool = drPool("all"); if(pool.length) it = drItem(snRand(pool), false); }
    else { const q = snQuestion(snRand(courses)); it = q && q.it; }
    if(!it || it.type !== "mc" || !it.opts || it.opts.length < 2 || String(it.prompt).length > maxLen || seen.has(it.prompt)) continue;
    const opts = it.opts.slice(0, 4); if(!opts.some(o => o.ok)) continue;
    seen.add(it.prompt); out.push({ p: it.prompt, o: opts.map(o => o.t), k: opts.findIndex(o => o.ok), e: it.expl || "" });
  }
  return out;
}

// ---------- nettverk ----------
const duRpc = (name, args) => frRpc(name, args);
function duErrText(e){
  const c = String((e && (e.msg || e.message)) || "");
  if(e && e.kind === "auth") return t("duNeedLogin");
  if(e && e.kind === "offline") return t("duOffline");
  if(/not_found/.test(c)) return t("duNotFound"); if(/full/.test(c)) return t("duFull"); if(/rate/.test(c)) return t("duRate");
  if(/function|does not exist|schema cache/i.test(c) || (e && e.status === 404)) return t("duNoDb");
  return t("duErr");
}
function duApply(r){
  if(!r || !DU) return;
  DU.offset = Date.parse(r.now) - Date.now();
  DU.code = r.code; DU.mode = r.mode; DU.isHost = r.is_host; DU.status = r.status; DU.hasGuest = r.has_guest;
  if(!DU.qs || !DU.qs.length) DU.qs = r.questions || [];
  DU.opp = r.opp || {}; DU.oppName = r.opp_name || t("duOpp"); DU.oppAv = r.opp_av;
  DU.startAt = r.start_at ? Date.parse(r.start_at) - DU.offset : null;
}
function duStopPoll(){ if(DU) clearTimeout(DU.timer); }
function duPollSoon(ms = 1000){ duStopPoll(); if(DU) DU.timer = setTimeout(duPoll, ms); }
async function duPoll(){
  if(!DU || screen !== "duel" || !DU.code) return;
  try{
    const playing = DU.view === "play" || DU.view === "count" || DU.view === "end";
    const r = playing && DU.status !== "waiting" ? await duRpc("duel_push", { p_code: DU.code, p_state: DU.me }) : await duRpc("duel_get", { p_code: DU.code });
    const before = DU.view; duApply(r); duStep(); DU.err = null;
    if(before !== DU.view || DU.view !== "play") duPaint();
    else if(DU.mode === "tug") duPaintTug(); else duPaintOpp();
  }catch(e){ if(DU) DU.netErr = (DU.netErr || 0) + 1; }
  if(DU && DU.view !== "end" && DU.status !== "left") duPollSoon(DU.view === "play" ? 900 : 1300);
  else if(DU && DU.view === "end" && !(DU.opp && DU.opp.done) && DU.status !== "left") duPollSoon(1500);
}
// Bestem hvilken skjerm vi er på ut fra status og klokka.
function duStep(){
  if(!DU) return;
  if(DU.status === "left" && DU.view !== "end"){ DU.view = "end"; DU.oppLeft = true; return; }
  if(DU.status === "waiting" || DU.status === "ready"){ if(DU.view !== "lobby") DU.view = "wait"; return; }
  if(DU.status === "playing" || DU.status === "done"){
    if(DU.view === "wait" || DU.view === "lobby"){ DU.view = "count"; duCountdown(); }
    if(DU.mode === "tug" && DU.view === "play") duTugCheck();
    if(DU.view === "end") return;
    if(DU.status === "done" && DU.me.done) DU.view = "end";
  }
}

// ---------- skjermer ----------
function duOpen(code){
  duStopPoll(); DU = { view: code ? "joining" : "lobby", mode: S.duMode || "race", scope: S.duScope || "study", joinCode: code || "", me: {}, opp: {}, qs: null };
  overlay = null; screen = "duel"; render(); window.scrollTo(0, 0);
  if(code) duJoin(code);
}
async function duCreate(){
  if(!AUTH){ overlay = { login: 1, step: "email", email: "" }; renderOverlay(); return; }
  const n = DU.mode === "tug" ? DU_TUG_N : DU_RACE_N, qs = duQuestions(n, DU.scope);
  if(qs.length < 3){ toast(t("stNoTheory")); return; }
  S.duMode = DU.mode; S.duScope = DU.scope; saveLocal();
  DU.busy = true; duPaint();
  try{ const r = await duRpc("duel_create", { p_mode: DU.mode, p_questions: qs, p_name: S.name || "", p_av: S.avatar || null, p_invite: DU.inviteId || null }); DU.qs = null; duApply(r); DU.view = "wait"; DU.busy = false; duPaint(); duPollSoon(1300);
    if(DU.inviteId) toast(t("duInvited", DU.inviteName || ""));
    if(FR.rows === null && !FR.loading) frLoad().then(() => { if(DU && DU.view === "wait") duPaint(); }); }
  catch(e){ DU.busy = false; DU.err = duErrText(e); duPaint(); }
}
async function duJoin(code){
  code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if(code.length !== 5){ DU.err = t("duNotFound"); DU.view = "lobby"; duPaint(); return; }
  if(!AUTH){ DU.view = "lobby"; DU.joinCode = code; DU.err = t("duNeedLogin"); duPaint(); return; }
  DU.busy = true; duPaint();
  try{ const r = await duRpc("duel_join", { p_code: code, p_name: S.name || "", p_av: S.avatar || null }); duApply(r); DU.busy = false; DU.view = "wait"; duStep(); duPaint(); duPollSoon(900); }
  catch(e){ DU.busy = false; DU.view = "lobby"; DU.err = duErrText(e); duPaint(); }
}
async function duStart(){
  try{ const r = await duRpc("duel_start", { p_code: DU.code }); duApply(r); duStep(); duPaint(); duPollSoon(600); }catch(e){ toast(duErrText(e)); }
}
function duCountdown(){
  clearInterval(DU.cd); sfx("tap");
  DU.cd = setInterval(() => {
    if(!DU || screen !== "duel"){ clearInterval(DU && DU.cd); return; }
    const left = Math.ceil(((DU.startAt || Date.now()) - Date.now()) / 1000), el = document.getElementById("ducount");
    if(left <= 0){ clearInterval(DU.cd); DU.view = "play"; DU.me = { i: 0, s: 0, c: 0, w: 0, done: false }; DU.qStart = Date.now(); DU.t0 = Date.now(); duPaint(); sfx("level"); duPollSoon(500);
      if(DU.mode === "tug") DU.tugTimer = setInterval(() => { if(!DU || DU.view !== "play"){ clearInterval(DU && DU.tugTimer); return; } const s = document.getElementById("dutugsec"); if(s) s.textContent = Math.max(0, Math.ceil(DU_TUG_SECS - (Date.now() - DU.t0) / 1000)); duTugCheck(); }, 250);
      return; }
    if(el && el.textContent !== String(left)){ el.textContent = left; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); sfx("tap"); }
  }, 100);
}
function duAnswer(j){
  if(!DU || DU.view !== "play" || DU.locked || DU.me.done) return;
  const q = DU.qs[DU.me.i % DU.qs.length], ok = j === q.k; DU.pick = j; DU.locked = true; buzz(ok);
  if(ok){ DU.me.c++; DU.combo = (DU.combo || 0) + 1; const secs = (Date.now() - DU.qStart) / 1000; DU.me.s += 100 + Math.max(0, Math.round(50 - secs * 5)); }
  else { DU.me.w++; DU.combo = 0; }
  duPaint(); sfx(ok ? "ok" : "bad", DU.combo || 0); if(ok) burst(document.querySelector(".du-q .opt.right"), 10);
  if(DU.mode === "tug"){ duTugCheck(); if(DU.view === "play") duPaintTug(); }
  setTimeout(() => {
    if(!DU || DU.view !== "play") return;
    DU.me.i++; DU.locked = false; DU.pick = null; DU.qStart = Date.now();
    if(DU.mode === "race" && DU.me.i >= DU.qs.length){ DU.me.done = true; DU.view = "end"; duFinish(); }
    duPaint(); duPush();
  }, ok ? 450 : (DU.mode === "tug" ? 1500 : 1100));
  duPush();
}
async function duPush(){ if(!DU || !DU.code) return; try{ const r = await duRpc("duel_push", { p_code: DU.code, p_state: DU.me }); duApply(r); }catch(e){} }
function duTugPos(){ return (DU.me.c || 0) - ((DU.opp && DU.opp.c) || 0); }
function duTugCheck(){
  if(!DU || DU.view !== "play" || DU.mode !== "tug") return;
  const pos = duTugPos(), timeUp = Date.now() - DU.t0 >= DU_TUG_SECS * 1000;
  if(Math.abs(pos) >= DU_TUG_WIN || timeUp || (DU.opp && DU.opp.done)){ DU.me.done = true; DU.view = "end"; duFinish(); duPaint(); duPush(); }
}
function duResult(){
  if(DU.oppLeft && !(DU.opp && DU.opp.done)) return "win";
  if(DU.mode === "tug"){ const p = duTugPos(); return p > 0 ? "win" : p < 0 ? "lose" : "draw"; }
  if(!DU.opp || !DU.opp.done) return "wait";
  return DU.me.s > DU.opp.s ? "win" : DU.me.s < DU.opp.s ? "lose" : "draw";
}
function duFinish(){
  if(DU.finished) return; DU.finished = true; clearInterval(DU.tugTimer);
  S.stats ||= {}; S.stats.duels = (+S.stats.duels || 0) + 1; awardXP(5); save();
  duPollSoon(800);
}
function duFinalFx(){ // når resultatet er klart (motstanderen er også ferdig)
  if(DU.fx) return; const r = duResult(); if(r === "wait") return; DU.fx = true;
  if(r === "win"){ S.stats.duelWins = (+S.stats.duelWins || 0) + 1; awardXP(10); save(); setTimeout(() => confetti("level"), 200); } else sfx("complete");
  bdgToast(checkBadges());
}
function duLeave(){
  if(DU){ duStopPoll(); clearInterval(DU.cd); clearInterval(DU.tugTimer); if(DU.code && DU.view !== "end") duRpc("duel_leave", { p_code: DU.code }).catch(() => {}); }
  DU = null; goHome();
}
async function duInvite(id, name){
  try{ await duRpc("duel_invite", { p_code: DU.code, p_friend: id }); DU.invited = id; toast(t("duInvited", name)); duPaint(); }catch(e){ toast(duErrText(e)); }
}
function duShare(){
  const url = location.origin + location.pathname + "#/" + rtW("duel") + "/" + DU.code, txt = t("duShareText", DU.code);
  if(navigator.share) navigator.share({ title: "Axle", text: txt, url }).catch(() => {});
  else navigator.clipboard?.writeText(url).then(() => toast(t("duCopied")), () => toast(url));
}

// ---------- tegning ----------
const duAv = (me, size) => me ? (meAvHTML(size, "fr-avs") || frAvatar(S.name || "?", 0, null, size)) : frAvatar(DU.oppName, 1, DU.oppAv, size);
function duTop(title){ return `<div class="top"><div class="wrap"><button class="iconbtn" data-a="duleave" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(t("duKicker"))}</small><b>${esc(title)}</b></div></div></div>`; }
function duPaint(){ if(screen === "duel") render(); }
function duPaintTug(){ // flytt knuten uten å tegne alt på nytt, så den glir
  const pos = duTugPos(), g = document.getElementById("duknot"), a = document.getElementById("dutme"), b = document.getElementById("dutopp"), tx = document.getElementById("dutugtxt");
  if(g) g.style.transform = `translateX(${-Math.max(-1, Math.min(1, pos / DU_TUG_WIN)) * 120}px)`;
  if(a) a.textContent = DU.me.c || 0; if(b) b.textContent = (DU.opp && DU.opp.c) || 0;
  if(tx) tx.textContent = t(pos > 0 ? "duTugLead" : pos < 0 ? "duTugBehind" : "duTugEven");
}
function duPaintOpp(){ const el = document.getElementById("duopp"); if(el) el.innerHTML = duRaceBars(); }
function duRaceBars(){
  const n = DU.qs.length, me = DU.me.i || 0, op = (DU.opp && DU.opp.i) || 0;
  const lane = (who, i, s, av) => `<div class="du-lane"><span class="du-lav">${av}</span><div class="du-track"><i style="width:${Math.min(100, i / n * 100)}%"></i></div><b>${s || 0}</b></div>`;
  return lane("me", me, DU.me.s, duAv(true, 26)) + lane("opp", op, DU.opp && DU.opp.s, duAv(false, 26));
}
let DU_PENDING = null; // kode fra en lenke (#/duell/KODE)
function renderDuel(){
  if(!DU){ const c = DU_PENDING; DU_PENDING = null; duOpen(c); return; }
  const v = DU.view;
  if(v === "lobby" || v === "joining"){
    const mode = (m, ic) => `<button class="du-mode ${DU.mode === m ? "on" : ""}" data-a="dumode" data-m="${m}"><span>${ic}</span><b>${esc(t("duMode_" + m))}</b><small>${esc(t("duModeSub_" + m))}</small></button>`;
    $app.innerHTML = `${duTop(t("duTitle"))}<main class="wrap du-lobby">
      ${DU.inviteName ? `<p class="du-vs">⚔️ ${esc(t("duVsFriend", DU.inviteName))}</p>` : ""}
      <h3 class="du-h">${esc(t("duPickMode"))}</h3><div class="du-modes">${mode("race", "🏁")}${mode("tug", "🪢")}</div>
      <h3 class="du-h">${esc(t("duPickScope"))}</h3><div class="seg du-scope"><button class="${DU.scope === "course" ? "on" : ""}" data-a="duscope" data-s="course">${esc(courseShort(COURSE(S.current)))}</button><button class="${DU.scope !== "course" ? "on" : ""}" data-a="duscope" data-s="study">${esc(t("duMixed"))}</button></div>
      ${DU.err ? `<p class="du-err">${esc(DU.err)}</p>` : ""}
      ${AUTH ? `<button class="big du-go" data-a="ducreate" ${DU.busy ? "disabled" : ""}>${esc(DU.busy ? t("duBusy") : t("duCreate"))}</button>` : `<button class="big du-go" data-a="aclogin">${esc(t("duLoginBtn"))}</button><p class="picknote">${esc(t("duLoginWhy"))}</p>`}
      <div class="du-join"><input id="dujoin" maxlength="6" autocapitalize="characters" autocomplete="off" placeholder="${esc(t("duCodePh"))}" value="${esc(DU.joinCode || "")}" aria-label="${esc(t("duCodePh"))}"><button class="big ghost" data-a="dujoin">${esc(t("duJoin"))}</button></div>
      <div class="du-or"><span>${esc(t("duOr"))}</span></div>
      <button class="qt-row" data-a="loopen"><span class="gm-ic sn-t6">🤜</span><span><b>${esc(t("loTitle"))}</b><small>${esc(t("loSub"))}</small></span>${I.chevron}</button></main>`;
    return;
  }
  if(v === "wait"){
    const friends = (FR.rows || []).filter(r => !r.is_me).slice(0, 30);
    $app.innerHTML = `${duTop(t("duMode_" + DU.mode))}<main class="wrap du-wait">
      ${DU.hasGuest ? `<div class="du-face"><span>${duAv(true, 64)}</span><b class="du-vsx">VS</b><span>${duAv(false, 64)}</span></div><h2>${esc(DU.isHost ? t("duReady", DU.oppName) : t("duWaitHost", DU.oppName))}</h2>
        ${DU.isHost ? `<button class="big du-go" data-a="dustart">${esc(t("duStart"))}</button>` : `<div class="du-dots"><i></i><i></i><i></i></div>`}`
      : `<p class="du-k">${esc(t("duYourCode"))}</p><div class="du-code">${esc(DU.code)}</div><button class="big" data-a="dushare">${esc(t("duShare"))}</button>
        <p class="du-wt"><span class="du-dots"><i></i><i></i><i></i></span> ${esc(t("duWaiting"))}</p>
        ${friends.length ? `<h3 class="du-h">${esc(t("duInviteFriend"))}</h3><div class="du-fr">${friends.map((r, i) => `<div class="du-frow">${frAvatar(r.display_name, i, r.avatar, 36, r.photo)}<b>${esc(r.display_name)}</b><button class="kbtn" data-a="duinvite" data-id="${esc(r.user_id)}" data-n="${esc(r.display_name)}" ${DU.invited === r.user_id ? "disabled" : ""}>${esc(DU.invited === r.user_id ? t("duSent") : t("duInviteBtn"))}</button></div>`).join("")}</div>` : ""}`}</main>`;
    return;
  }
  if(v === "count"){
    $app.innerHTML = `${duTop(t("duMode_" + DU.mode))}<main class="wrap du-wait"><div class="du-face"><span>${duAv(true, 64)}</span><b class="du-vsx">VS</b><span>${duAv(false, 64)}</span></div>
      <div class="du-count pop" id="ducount">${Math.max(1, Math.ceil(((DU.startAt || Date.now()) - Date.now()) / 1000))}</div><p>${esc(t("duGetReady"))}</p></main>`;
    return;
  }
  if(v === "play"){
    const q = DU.qs[DU.me.i % DU.qs.length], lock = DU.locked;
    const head = DU.mode === "race" ? `<div class="du-bars" id="duopp">${duRaceBars()}</div><p class="du-qn">${esc(t("duQn", Math.min(DU.me.i + 1, DU.qs.length), DU.qs.length))}</p>` : duTugHTML();
    $app.innerHTML = `<div class="du-top wrap">${head}</div><main class="wrap du-q">${q ? `<div class="sn-prompt">${rich(q.p)}</div><div class="opts sn-opts">` +
      q.o.map((o, j) => `<button class="opt ${lock && j === q.k ? "right" : lock && DU.pick === j ? "wrong" : ""}" data-a="duans" data-i="${j}" ${lock ? "disabled" : ""}><span class="k">${"ABCD"[j]}</span><span>${rich(o)}</span></button>`).join("") + `</div>` : ""}</main>`;
    return;
  }
  // slutt
  const r = duResult(); if(r !== "wait") duFinalFx();
  const head = r === "wait" ? t("duWaitOpp", DU.oppName) : r === "win" ? t("duWin") : r === "lose" ? t("duLose", DU.oppName) : t("duDraw");
  const score = DU.mode === "tug" ? `${DU.me.c || 0} – ${(DU.opp && DU.opp.c) || 0}` : `${DU.me.s || 0} – ${(DU.opp && DU.opp.s) || 0}`;
  $app.innerHTML = `${duTop(t("duMode_" + DU.mode))}<main class="wrap du-wait du-end ${r}">
    <div class="du-face"><span class="${r === "win" ? "crown" : ""}">${duAv(true, 72)}</span><b class="du-vsx">VS</b><span class="${r === "lose" ? "crown" : ""}">${duAv(false, 72)}</span></div>
    <h2>${esc(head)}</h2><div class="du-score">${esc(score)}</div>
    ${r === "wait" ? `<div id="duopp" class="du-bars">${DU.mode === "race" ? duRaceBars() : ""}</div><div class="du-dots"><i></i><i></i><i></i></div>` : ""}
    ${DU.oppLeft ? `<p class="picknote">${esc(t("duOppLeft", DU.oppName))}</p>` : ""}
    <p>${esc(t("duYouStats", DU.me.c || 0, DU.me.w || 0))}</p>
    <button class="big du-go" data-a="duagain">${esc(t("duAgain"))}</button><button class="big ghost" data-a="duleave">${esc(t("back"))}</button></main>`;
}
function duTugHTML(){
  const pos = duTugPos(), x = Math.max(-1, Math.min(1, pos / DU_TUG_WIN)) * 120, sec = Math.max(0, Math.ceil(DU_TUG_SECS - (Date.now() - (DU.t0 || Date.now())) / 1000));
  return `<div class="du-tug"><div class="du-tugrow"><span class="du-tav me">${duAv(true, 34)}<b id="dutme">${DU.me.c || 0}</b></span><span class="du-tsec">⏱ <b id="dutugsec">${sec}</b></span><span class="du-tav opp"><b id="dutopp">${(DU.opp && DU.opp.c) || 0}</b>${duAv(false, 34)}</span></div>
    <svg viewBox="-160 -24 320 48" class="du-rope" aria-hidden="true"><line x1="-150" y1="0" x2="150" y2="0" class="du-r"/><line x1="-120" y1="-16" x2="-120" y2="16" class="du-goal me"/><line x1="120" y1="-16" x2="120" y2="16" class="du-goal opp"/>
      <g id="duknot" style="transform:translateX(${-x}px);transition:transform .45s cubic-bezier(.3,1.6,.5,1)"><line x1="0" y1="-12" x2="0" y2="12" class="du-flag"/><circle r="6" class="du-knot"/></g></svg>
    <p class="du-tugtxt" id="dutugtxt">${esc(pos > 0 ? t("duTugLead") : pos < 0 ? t("duTugBehind") : t("duTugEven"))}</p></div>`;
}

// ---------- invitasjoner ----------
let DU_INV = { at: 0, list: [] };
async function duCheckInvites(){
  if(!AUTH || !CLOUD_ON || Date.now() - DU_INV.at < 25000) return; DU_INV.at = Date.now();
  try{ const rows = await duRpc("duel_invites", {}); DU_INV.list = rows || []; if(DU_INV.list.length && screen === "home" && !overlay) render(); }catch(e){ DU_INV.list = []; }
}
function duInviteHTML(){
  const d = (DU_INV.list || []).filter(x => !(S.duSeen || []).includes(x.code))[0]; if(!d) return "";
  return `<div class="du-invite"><span class="du-iic">⚔️</span><span><b>${esc(t("duInviteFrom", d.host_name || t("duOpp")))}</b><small>${esc(t("duMode_" + d.mode))}</small></span>
    <button class="kbtn" data-a="duaccept" data-c="${esc(d.code)}">${esc(t("duJoin"))}</button><button class="iconbtn" data-a="dudismiss" data-c="${esc(d.code)}" aria-label="${esc(t("back"))}">${I.x}</button></div>`;
}

// ---------- Lynduell på samme mobil ----------
function loOpen(){ if(LO) clearTimeout(LO.skip); LO = { view: "intro", s: [0, 0] }; overlay = null; if(DU){ duStopPoll(); DU = null; } screen = "local"; render(); }
function loNext(){
  let q = null; for(let k = 0; k < 6 && !q; k++){ const qs = duQuestions(1, "study", 170); q = qs[0] && qs[0].o.every(o => String(o).length < 70) ? qs[0] : null; }
  LO.q = q; LO.lock = [false, false]; LO.winner = null; LO.pick = [null, null]; LO.qid = (LO.qid || 0) + 1;
  const id = LO.qid; clearTimeout(LO.skip);
  LO.skip = setTimeout(() => { if(LO && LO.view === "play" && LO.qid === id && LO.winner == null){ LO.winner = -1; render(); setTimeout(() => { if(LO && LO.qid === id && LO.view === "play"){ loNext(); render(); } }, 1400); } }, 20000); // ingen svarte riktig: vis svaret og gå videre
}
function loStart(){ LO.view = "play"; LO.s = [0, 0]; loNext(); sfx("level"); render(); }
function loAnswer(p, j){
  if(!LO || LO.view !== "play" || !LO.q || LO.winner != null || LO.lock[p]) return;
  LO.pick[p] = j;
  if(j === LO.q.k){ LO.winner = p; LO.s[p]++; buzz(true); sfx("ok", LO.s[p]); render(); burst(document.querySelector(`.lo-half.p${p} .opt.right`), 10);
    setTimeout(() => { if(!LO) return; if(LO.s[p] >= LO_WIN){ LO.view = "end"; LO.champ = p; awardXP(5); save(); render(); confetti("level"); } else { loNext(); render(); } }, 1200); }
  else { LO.lock[p] = true; buzz(false); sfx("bad"); render(); const id = LO.qid;
    if(LO.lock[0] && LO.lock[1]){ LO.winner = -1; setTimeout(() => { if(LO && LO.view === "play" && LO.qid === id){ loNext(); render(); } }, 1400); }
    else setTimeout(() => { if(LO && LO.view === "play" && LO.qid === id && LO.winner == null){ LO.winner = -1; render(); setTimeout(() => { if(LO && LO.qid === id && LO.view === "play"){ loNext(); render(); } }, 1400); } }, 6000); } // den andre har 6 sekunder på seg
}
function renderLocal(){
  if(!LO){ loOpen(); return; }
  if(LO.view === "intro"){
    $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="loclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(t("duKicker"))}</small><b>${esc(t("loTitle"))}</b></div></div></div>
      <main class="wrap sp-intro"><div class="lo-demo"><span>🤜</span><span>🤛</span></div><h2>${esc(t("loHead"))}</h2><p>${esc(t("loText", LO_WIN))}</p><button class="big sp-go" data-a="lostart">${esc(t("spGo"))}</button></main>`;
    return;
  }
  if(LO.view === "end"){
    $app.innerHTML = `<div class="lo lo-end"><div class="lo-half p1 flip"><h2>${esc(LO.champ === 1 ? t("loYouWin") : t("loYouLose"))}</h2><b class="lo-big">${LO.s[1]} – ${LO.s[0]}</b></div>
      <div class="lo-mid"><button class="kbtn" data-a="lostart">${esc(t("duAgain"))}</button><button class="kbtn" data-a="loclose">${esc(t("back"))}</button></div>
      <div class="lo-half p0"><h2>${esc(LO.champ === 0 ? t("loYouWin") : t("loYouLose"))}</h2><b class="lo-big">${LO.s[0]} – ${LO.s[1]}</b></div></div>`;
    return;
  }
  const q = LO.q, half = p => `<div class="lo-half p${p} ${p === 1 ? "flip" : ""} ${LO.lock[p] ? "locked" : ""} ${LO.winner === p ? "won" : ""}">
      <div class="lo-score">${"●".repeat(LO.s[p])}<span>${"○".repeat(LO_WIN - LO.s[p])}</span></div>
      ${q ? `<div class="lo-p">${rich(q.p)}</div><div class="opts lo-opts">${q.o.map((o, j) => `<button class="opt ${LO.winner != null && j === q.k ? "right" : LO.pick[p] === j && j !== q.k ? "wrong" : ""}" data-a="loans" data-p="${p}" data-i="${j}" ${LO.lock[p] || LO.winner != null ? "disabled" : ""}><span>${rich(o)}</span></button>`).join("")}</div>` : ""}
      ${LO.lock[p] && (LO.winner == null || LO.winner === -1) && LO.winner !== p ? `<p class="lo-lock">${esc(t("loLocked"))}</p>` : ""}</div>`;
  $app.innerHTML = `<div class="lo">${half(1)}<div class="lo-mid"><b>${LO.s[1]}</b><button class="iconbtn" data-a="loclose" aria-label="${esc(t("back"))}">${I.x}</button><b>${LO.s[0]}</b></div>${half(0)}</div>`;
}

// ---------- klikk ----------
function duClick(a, b){
  if(a === "duopen"){ duOpen(); return true; }
  if(a === "duchal"){ duChallenge(b.dataset.id, b.dataset.n); return true; }
  if(a === "loopen"){ loOpen(); return true; }
  if(!a.startsWith("du") && !a.startsWith("lo")) return false;
  if(a === "duleave"){ duLeave(); return true; }
  if(a === "dumode"){ DU.mode = b.dataset.m; render(); return true; }
  if(a === "duscope"){ DU.scope = b.dataset.s; render(); return true; }
  if(a === "ducreate"){ DU.err = null; duCreate(); return true; }
  if(a === "dujoin"){ const v = (document.getElementById("dujoin") || {}).value || DU.joinCode; DU.err = null; DU.joinCode = v; duJoin(v); return true; }
  if(a === "dustart"){ duStart(); return true; }
  if(a === "dushare"){ duShare(); return true; }
  if(a === "duinvite"){ duInvite(b.dataset.id, b.dataset.n); return true; }
  if(a === "duans"){ duAnswer(+b.dataset.i); return true; }
  if(a === "duagain"){ duStopPoll(); duOpen(); return true; }
  if(a === "duaccept"){ S.duSeen = [...(S.duSeen || []), b.dataset.c].slice(-20); saveLocal(); duOpen(b.dataset.c); return true; }
  if(a === "dudismiss"){ S.duSeen = [...(S.duSeen || []), b.dataset.c].slice(-20); saveLocal(); render(); return true; }
  if(a === "lostart"){ loStart(); return true; }
  if(a === "loclose"){ if(LO) clearTimeout(LO.skip); LO = null; goHome(); return true; }
  if(a === "loans"){ loAnswer(+b.dataset.p, +b.dataset.i); return true; }
  return false;
}
// Duell fra en venns profil eller vennelista: åpne lobbyen med vennen som invitert.
function duChallenge(id, name){ duOpen(); DU.inviteId = id; DU.inviteName = name; render(); }
