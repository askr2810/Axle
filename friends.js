// ============================================================
//  VENNER OG POENGTAVLE (krever konto, se cloud.js og supabase/venner.sql).
//  Hver bruker har et visningsnavn og en venne-kode. Legger du inn koden til en venn,
//  blir dere venner begge veier og ser hverandres XP, rekke, kroner og fag.
// ============================================================
let FR = { rows: null, loading: false, err: null, tab: "week", view: "friends", sugg: [], fof: null, editName: false, busy: false, reqs: [], editUser: false, userLater: false, search: { q: "", rows: null, busy: false, err: null } };
const FR_PENDING = "axle.pendingFriend";

// Uke = mandagens dato (lokal tid), f.eks. "2026-09-21".
function weekKeyOf(d){ const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dayKey(x); }
const lastWeekKey = () => weekKeyOf(addDays(new Date(), -7));
function myStats(){
  const wk = weekKeyOf(new Date()), lw = lastWeekKey(); let week = 0, prev = 0;
  for(const k in S.daily || {}){ const [y, m, dd] = k.split("-").map(Number), w = weekKeyOf(new Date(y, m - 1, dd)); if(w === wk) week += +S.daily[k] || 0; else if(w === lw) prev += +S.daily[k] || 0; }
  let cr = 0, lv = 0; for(const c of COURSES){ cr += crowns(c); lv += courseProgress(c).d; }
  return { xp: +S.xp || 0, streak: streakNow(), streak_last: S.streak && S.streak.last || null, week_xp: week, week_key: wk, prev_week_xp: prev, prev_week_key: lw, crowns: cr, levels: lv, course: S.current, updated_at: new Date().toISOString() };
}
// Tall slik de gjelder nå (rekke og ukes-XP kan være utdatert hvis vennen ikke har åpnet appen).
function frLive(r){
  const td = dayKey(), y = dayKey(addDays(new Date(), -1));
  return Object.assign({}, r, {
    streak: (r.streak_last === td || r.streak_last === y) ? r.streak : 0,
    week_xp: r.week_key === weekKeyOf(new Date()) ? r.week_xp : 0
  });
}
const frFmtCode = c => c ? c.slice(0, 4) + "-" + c.slice(4) : "";

async function frRpc(name, args){
  const tok = await authToken(); if(!tok) throw new CloudError(AUTH ? "offline" : "auth", 0);
  return sbFetch("/rest/v1/rpc/" + name, { method: "POST", body: JSON.stringify(args || {}) }, tok);
}
// Kolonner som kom i senere versjoner av venner.sql. Mangler de i databasen, sendes de ikke.
const FR_NEW_COLS = ["avatar", "prev_week_xp", "prev_week_key"];
let FR_OLD_DB = false, FR_NO_PHOTO = false, FR_NO_FP = false;
function frBody(){ const b = myStats(); if(S.avatar) b.avatar = S.avatar; if(!FR_NO_PHOTO) b.photo = isPhoto(S.photo) ? S.photo : null; if(!FR_NO_FP) b.friends_public = !!S.friendsPublic; if(FR_OLD_DB) FR_NEW_COLS.forEach(k => delete b[k]); return b; }
// Sender profilen (f.eks. nytt bilde) til venner litt etter en endring.
let frPushTimer = null;
function frPushSoon(){ if(!CLOUD_ON || !AUTH) return; clearTimeout(frPushTimer); frPushTimer = setTimeout(async () => { try{ const tok = await authToken(); if(tok) await frPushStats(tok); }catch(e){} }, 800); }
async function frPushStats(tok){
  if(!AUTH) return;
  const url = "/rest/v1/profiles?user_id=eq." + encodeURIComponent(AUTH.uid), opt = b => ({ method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(b) });
  try{ await sbFetch(url, opt(frBody()), tok); }
  catch(e){
    if(/PGRST204|42703/.test(e.code || "") && !FR_NO_FP){ FR_NO_FP = true; return frPushStats(tok); } // grupper.sql ikke kjørt ennå
    if(/PGRST204|42703/.test(e.code || "") && !FR_NO_PHOTO){ FR_NO_PHOTO = true; return frPushStats(tok); }
    if(!FR_OLD_DB && /PGRST204|42703/.test(e.code || "")){ FR_OLD_DB = true; await sbFetch(url, opt(frBody()), tok); } else throw e; }
}
async function frLoad(){
  if(!CLOUD_ON || !AUTH || FR.loading) return;
  FR.loading = true; FR.err = null; frRender();
  try{
    try{ const tok = await authToken(); if(tok) await frPushStats(tok); }catch(e){}
    FR.rows = (await frRpc("get_friends")) || [];
    try{ FR.reqs = (await frRpc("get_friend_requests")) || []; }catch(e){ FR.reqs = []; }
    try{ FR.sugg = (await frRpc("get_suggestions")) || []; }catch(e){ FR.sugg = []; } // krever grupper.sql
    await grLoadInvites();
    if(typeof grPendingCheck === "function") grPendingCheck();
    const meRow = FR.rows.find(r => r.is_me); if(meRow && meRow.display_name && meRow.display_name !== S.name){ S.name = meRow.display_name; save(); }
    if(meRow && meRow.member_since) sinceUpdate(meRow.member_since); // kontoen ble laget
    if(!S.memberNo){ try{ const no = await frRpc("my_member_number"); if(+no > 0){ S.memberNo = +no; save(); bdgToast(checkBadges()); } }catch(e){} } // Pioner-merket
    const nf_ = FR.rows.filter(r => !r.is_me).length; S.stats ||= {};
    if(nf_ > (+S.stats.friends || 0)){ S.stats.friends = nf_; bdgToast(checkBadges()); save(); }
    const pend = (()=>{ try{ return localStorage.getItem(FR_PENDING); }catch(e){ return null; } })();
    if(pend && FR.rows.some(r => r.is_me)){
      try{ localStorage.removeItem(FR_PENDING); }catch(e){}
      FR.loading = false; await frAdd(pend, true); return;
    }
  }catch(e){ FR.err = frErr(e); }
  FR.loading = false; frRender();
}
async function frSaveName(name){
  name = name.replace(/\s+/g, " ").trim().slice(0, 24);
  if(!name){ toast(t("frNameEmpty")); return; }
  if(!isClean(name)){ toast(t("frBadWord")); return; }
  FR.busy = true; frRender();
  try{
    const tok = await authToken(); if(!tok) throw new CloudError("offline", 0);
    const me = (FR.rows || []).find(r => r.is_me);
    if(me) await sbFetch("/rest/v1/profiles?user_id=eq." + encodeURIComponent(AUTH.uid), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ display_name: name }) }, tok);
    else { const post = b => sbFetch("/rest/v1/profiles", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(Object.assign({ user_id: AUTH.uid, display_name: name }, b)) }, tok);
      try{ await post(frBody()); } catch(e){ if(/PGRST204|42703/.test(e.code || "")){ FR_NO_PHOTO = true; try{ await post(frBody()); } catch(e2){ if(!FR_OLD_DB && /PGRST204|42703/.test(e2.code || "")){ FR_OLD_DB = true; await post(frBody()); } else throw e2; } } else throw e; } }
    if(!me && !S.avatar){ S.avatar = avRandom(); save(); } // alle får en avatar de kan endre
    S.name = name; save(); FR.editName = false; FR.busy = false; await frLoad();
  }catch(e){ FR.busy = false; toast(frErr(e)); frRender(); }
}
async function frAdd(code, fromLink){
  const clean = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if(clean.length !== 8){ toast(t("frBadCode")); return; }
  FR.busy = true; frRender();
  try{ const name = await frRpc("add_friend", { code: clean }); toast(t("frAdded", name || "")); FR.busy = false; await frLoad(); }
  catch(e){ FR.busy = false; toast(frErr(e)); if(fromLink) await frLoad(); else frRender(); }
}
async function frRemove(uid){
  try{ await frRpc("remove_friend", { fid: uid }); overlay = null; renderOverlay(); toast(t("frRemoved")); await frLoad(); }
  catch(e){ toast(frErr(e)); }
}
// ---------- ordfilter (samme regler som public.is_clean i venner.sql) ----------
const BAD_SUB = /(fuck|fukk|føkk|cunt|nigg|faggot|retard|hitler|porn|whore|bitch|jævl|jaevl|kukk|horunge|motherf|asshole|wank|dildo|penis|vagina|nazi)/;
const BAD_WORD = / (sex|sexy|dick|cock|pussy|kuk|hore|faen|neger|mongo|rape|shit|tits|anal|cum|piss|homse|slut|sluts|fitte|fitta|pikk|pikken|kkk|bastard) /;
function isClean(txt){
  const n = String(txt || "").toLowerCase().replace(/[013457@$]/g, c => ({ "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s" })[c]);
  return !BAD_SUB.test(n.replace(/[^a-zæøå]/g, "")) && !BAD_WORD.test(" " + n.replace(/[^a-zæøå]+/g, " ") + " ");
}
// ---------- moderering: rapportere og blokkere ----------
const REP_REASONS = { group: ["repName", "repOffensive"], name: ["repName", "repOffensive"], photo: ["repPhoto"], user: ["repHarass", "repSpam", "repOther"], course: ["repWrong", "repOffensive", "repSpam", "repOther"] };
function frModHTML(o){ // meny for en annen bruker: rapporter navn/bilde/oppførsel eller blokker
  return `<div class="dialog pop" role="dialog" aria-label="${esc(o.name)}"><div class="fr-dh">${frAvatar(o.name, 1, o.avatar, 48, o.photo)}<h3>${esc(o.name)}</h3></div>
    <button class="srow" data-a="frrep" data-k="name"><span class="lbl">${esc(t("repNameBtn"))}</span>${I.flag}</button>
    ${isPhoto(o.photo) ? `<button class="srow" data-a="frrep" data-k="photo"><span class="lbl">${esc(t("repPhotoBtn"))}</span>${I.flag}</button>` : ""}
    <button class="srow" data-a="frrep" data-k="user"><span class="lbl">${esc(t("repUserBtn"))}</span>${I.flag}</button>
    <button class="big ghost" data-a="frblock" style="color:var(--bad)">${esc(o.confirmBlock ? t("blockSure") : t("blockBtn"))}</button>
    <p class="lgnote">${esc(t("blockNote"))}</p>
    <button class="big" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function frReportHTML(o){
  const reasons = REP_REASONS[o.kind] || REP_REASONS.user;
  return `<div class="dialog pop" role="dialog" aria-label="${esc(t("repTitle"))}"><h3>${esc(t("repTitle"))}</h3><p>${esc(t("repText"))}</p>
    <div class="chips">${reasons.map((r, i) => `<button class="${o.reason === i ? "on" : ""}" data-a="frrepwhy" data-i="${i}">${esc(t(r))}</button>`).join("")}</div>
    <textarea id="frrepnote" maxlength="500" placeholder="${esc(t("repNotePh"))}"></textarea>
    <button class="big" data-a="frrepsend" ${o.reason == null || o.busy ? "disabled" : ""}>${esc(t("repSend"))}</button>
    <button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button>
    <p class="lgnote">${esc(t("repContact", CONFIG.contactEmail))}</p></div>`;
}
function frModOpen(id){ // finn brukeren i vennelista, søketreff eller forespørsler
  const r = [...(FR.rows || []), ...(FR.search.rows || []), ...(FR.reqs || []), ...(FR.sugg || []), ...(FR.fof ? FR.fof.rows || [] : []), ...(typeof GR !== "undefined" && GR.rows || [])].find(x => x.user_id === id);
  if(!r) return; overlay = { frmod: { id, name: r.display_name, avatar: r.avatar, photo: r.photo } }; renderOverlay();
}
async function frReportSend(){
  const o = overlay && overlay.frrep; if(!o || o.reason == null) return;
  const note = ((document.getElementById("frrepnote") || {}).value || "").trim().slice(0, 500);
  o.busy = true; renderOverlay();
  try{ await frRpc("report_content", { p_kind: o.kind, p_target_user: o.id || null, p_target_id: o.target || null, p_reason: (REP_REASONS[o.kind] || REP_REASONS.user)[o.reason], p_note: note || null });
    overlay = null; renderOverlay(); toast(t("repThanks")); }
  catch(e){ o.busy = false; renderOverlay(); toast(/PGRST202|42883/.test(e.code || "") || e.status === 404 ? t("frUserNoDb") : frErr(e)); }
}
async function frBlock(id){
  try{ await frRpc("block_user", { fid: id }); overlay = null; renderOverlay(); toast(t("blockDone"));
    FR.search.rows = (FR.search.rows || []).filter(r => r.user_id !== id); FR.reqs = (FR.reqs || []).filter(r => r.user_id !== id); await frLoad(); renderTabbar(); }
  catch(e){ toast(/PGRST202|42883/.test(e.code || "") || e.status === 404 ? t("frUserNoDb") : frErr(e)); }
}
async function frBlocksOpen(){
  overlay = { frblocks: null }; renderOverlay();
  try{ overlay = { frblocks: (await frRpc("get_blocks")) || [] }; }catch(e){ overlay = { frblocks: [], err: frErr(e) }; }
  renderOverlay();
}
function frBlocksHTML(list){
  return `<div class="dialog pop" role="dialog" aria-label="${esc(t("blockList"))}"><h3>${esc(t("blockList"))}</h3>
    ${list === null ? `<p>${esc(t("frLoading"))}</p>` : list.length ? list.map(r => `<div class="fr-hit"><span class="fr-t"><b>${esc(r.display_name)}</b><span>${r.username ? "@" + esc(r.username) : ""}</span></span><button class="fr-act ghost" data-a="frunblock" data-id="${esc(r.user_id)}">${esc(t("unblockBtn"))}</button></div>`).join("") : `<p>${esc(t("blockNone"))}</p>`}
    <button class="big" data-a="closeov">${esc(t("cont"))}</button></div>`;
}
// ---------- brukernavn, søk og forespørsler ----------
const frMe = () => (FR.rows || []).find(r => r.is_me);
const FR_USER_RE = /^[a-z0-9_.]{3,20}$/;
function frUserSuggest(name){
  const base = String(name || "").toLowerCase().replace(/[æ]/g, "ae").replace(/[ø]/g, "o").replace(/[å]/g, "a").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "").slice(0, 14);
  return (base.length >= 3 ? base : "axle") + Math.floor(10 + Math.random() * 90);
}
async function frSaveUser(v){
  const u = String(v || "").trim().toLowerCase().replace(/^@/, "");
  if(!FR_USER_RE.test(u)){ toast(t("frUserBad")); return; }
  if(!isClean(u)){ toast(t("frBadWord")); return; }
  FR.busy = true; frRender();
  try{
    const tok = await authToken(); if(!tok) throw new CloudError("offline", 0);
    await sbFetch("/rest/v1/profiles?user_id=eq." + encodeURIComponent(AUTH.uid), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ username: u }) }, tok);
    const me = frMe(); if(me) me.username = u;
    FR.editUser = false; toast(t("frUserSaved", u));
  }catch(e){
    const c = (e && e.code) || "";
    toast(/bad_word/.test((e && e.msg) || "") ? t("frBadWord") : c === "23505" ? t("frUserTaken") : c === "23514" ? t("frUserBad") : /PGRST204|42703/.test(c) ? t("frUserNoDb") : frErr(e));
  }
  FR.busy = false; frRender();
}
let frSearchTimer = null, frSearchSeq = 0;
function frSearchInput(q){
  FR.search.q = q; clearTimeout(frSearchTimer);
  if(q.trim().replace(/^@/, "").length < 2){ FR.search.rows = null; FR.search.err = null; frResUpdate(); return; }
  frSearchTimer = setTimeout(async () => {
    const my = ++frSearchSeq; FR.search.busy = true; frResUpdate();
    try{ const rows = (await frRpc("search_users", { q: q.trim() })) || []; if(my !== frSearchSeq) return; FR.search.rows = rows; FR.search.err = null; }
    catch(e){ if(my !== frSearchSeq) return; FR.search.rows = []; FR.search.err = (e && (e.status === 404 || /PGRST202|42883/.test(e.code || ""))) ? t("frUserNoDb") : frErr(e); }
    FR.search.busy = false; frResUpdate();
  }, 300);
}
function frResHTML(){
  const s = FR.search;
  if(s.err) return `<p class="fr-hint">${esc(s.err)}</p>`;
  if(s.rows === null) return s.busy ? `<p class="fr-hint">${esc(t("frSearching"))}</p>` : "";
  if(!s.rows.length) return `<p class="fr-hint">${esc(s.busy ? t("frSearching") : t("frNoHits"))}</p>`;
  return frHitsHTML(s.rows);
}
// Liste med personer og knapp for å legge til (søk, forslag, venners venner). sub(r) = linje under navnet.
function frHitsHTML(rows, sub){
  return rows.map((r, i) => {
    if(r.status === "me") return "";
    const act = r.status === "friend" ? `<span class="fr-pill">${esc(t("frIsFriend"))}</span>`
      : r.status === "sent" ? `<span class="fr-pill">${esc(t("frSent"))}</span>`
      : r.status === "incoming" ? `<button class="fr-act" data-a="fracc" data-id="${esc(r.user_id)}">${esc(t("frAccept"))}</button>`
      : `<button class="fr-act" data-a="frreq" data-id="${esc(r.user_id)}" data-n="${esc(r.display_name)}">${I.plus}${esc(t("frReq"))}</button>`;
    return `<div class="fr-hit">${frAvatar(r.display_name, i, r.avatar, 40, r.photo)}<span class="fr-t"><b>${esc(r.display_name)}</b><span>${esc(sub ? sub(r) : r.username ? "@" + r.username : "")}</span></span>${act}<button class="fr-more" data-a="frmod" data-id="${esc(r.user_id)}" aria-label="${esc(t("repMore"))}">⋯</button></div>`;
  }).join("");
}
function frResUpdate(){ const el = document.getElementById("frres"); if(el) el.innerHTML = frResHTML(); }
async function frRequest(id, name){
  try{
    const st = await frRpc("request_friend", { fid: id });
    for(const list of [FR.search.rows, FR.sugg, FR.fof && FR.fof.rows]) for(const hit of list || []) if(hit.user_id === id) hit.status = st === "friend" ? "friend" : "sent";
    if(overlay && overlay.frfof) renderOverlay();
    toast(st === "friend" ? t("frAdded", name || "") : t("frReqSent", name || "")); buzz(true);
    if(st === "friend") await frLoad(); else frResUpdate();
  }catch(e){ toast(frErr(e)); }
}
async function frAnswer(id, accept){
  try{
    await frRpc("answer_friend_request", { fid: id, accept });
    FR.reqs = FR.reqs.filter(r => r.user_id !== id);
    const hit = (FR.search.rows || []).find(r => r.user_id === id); if(hit) hit.status = accept ? "friend" : "none";
    if(accept){ toast(t("frAccepted")); buzz(true); await frLoad(); } else { frRender(); renderTabbar(); }
  }catch(e){ toast(frErr(e)); }
}
// Henter forespørsler i bakgrunnen (prikk på Venner-fanen).
async function frPollReqs(){
  if(!CLOUD_ON || !AUTH) return;
  try{ FR.reqs = (await frRpc("get_friend_requests")) || []; if(FR.reqs.length) renderTabbar(); }catch(e){}
  grLoadInvites();
}
function frShareLinks(me){
  const url = CONFIG.siteUrl + "/?venn=" + me.friend_code, text = t("frShareText", frFmtCode(me.friend_code), url, me.username), e = encodeURIComponent;
  return `<div class="fr-share">
    ${navigator.share ? `<button class="fr-sh main" data-a="frshare">${I.share}<span>${esc(t("frShare"))}</span></button>` : ""}
    <a class="fr-sh" href="sms:?&body=${e(text)}">${I.chat}<span>${esc(t("frSms"))}</span></a>
    <a class="fr-sh" href="mailto:?subject=${e(t("frMailSubj"))}&body=${e(text)}">${I.mail}<span>${esc(t("frMail"))}</span></a>
    <a class="fr-sh" href="https://wa.me/?text=${e(text)}" target="_blank" rel="noopener">${I.chat}<span>WhatsApp</span></a>
    <button class="fr-sh" data-a="frcopy">${I.copy}<span>${esc(t("frCopyLink"))}</span></button></div>`;
}
function frErr(e){
  const m = (e && e.msg) || "";
  if(/bad_word/.test(m)) return t("frBadWord");
  if(/not_found/.test(m)) return t("frNotFound");
  if(/self/.test(m)) return t("frSelf");
  if(/too_many/.test(m)) return t("frTooMany");
  if(e && (e.status === 404 || /PGRST202|PGRST205|42P01|42883/.test(e.code || ""))) return t("frNotSetUp");
  return acErr(e);
}
// ---------- ukeliga ----------
// Forrige ukes XP for en rad: fra prev_week_* hvis oppdatert, ellers week_* hvis vennen ikke har åpnet appen siden.
function frLastWeek(r){ const lw = lastWeekKey(); return r.prev_week_key === lw ? +r.prev_week_xp || 0 : r.week_key === lw ? +r.week_xp || 0 : 0; }
function frLeague(rows){
  const withXp = rows.map(r => ({ r, xp: r.is_me ? myStats().prev_week_xp : frLastWeek(r) })).filter(x => x.xp > 0).sort((a, b) => b.xp - a.xp);
  const win = withXp[0] || null, lw = lastWeekKey();
  // merke hvis du vant forrige uke (minst én venn med i ligaen, og ikke delt førsteplass)
  if(win && win.r.is_me && rows.length >= 2 && !(withXp[1] && withXp[1].xp === win.xp)){
    S.weekWins ||= {}; if(!S.weekWins[lw]){ S.weekWins[lw] = 1; bdgStat("weekwins"); bdgToast(checkBadges()); save(); }
  }
  return win;
}
function frCountdown(){
  const now = new Date(), next = new Date(now); next.setHours(0, 0, 0, 0); next.setDate(next.getDate() + ((8 - next.getDay()) % 7 || 7));
  const ms = next - now, d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5);
  return d > 0 ? t("lgLeftDH", d, h) : t("lgLeftH", Math.max(1, h));
}
function frLeagueHTML(rows){
  const win = frLeague(rows);
  return `<div class="fr-card lg"><div class="lg-h"><b>${I.trophyS}${esc(t("lgTitle"))}</b><span>${esc(frCountdown())}</span></div>
    ${win ? `<div class="lg-win">${frAvatar(win.r.display_name, 0, win.r.is_me ? (S.avatar || win.r.avatar) : win.r.avatar, 40, win.r.is_me ? S.photo : win.r.photo)}<span><small>${esc(t("lgLastWinner"))}</small><b>${esc(win.r.display_name)}${win.r.is_me ? " " + esc(t("frYou")) : ""}</b></span><em>${win.xp} XP</em></div>`
          : `<p>${esc(t("lgNoWinner"))}</p>`}</div>`;
}
function frRender(){ if(screen === "friends" && !overlay) render(); }

function frAvatar(name, i, av, size, photo){
  if(isPhoto(photo)) return photoImg(photo, size || 40, "fr-avs");
  if(av && /^\d+(-\d+){3,}$/.test(av)) return avatarSVG(av, size || 40, "fr-avs");
  const cols = ["var(--u0)", "var(--u1)", "var(--u2)", "var(--gold-deep)", "var(--ok)"];
  const ch = (String(name || "?").trim()[0] || "?").toUpperCase();
  return `<span class="fr-av" style="background:${cols[i % cols.length]}">${esc(ch)}</span>`;
}
function frAgo(iso){
  if(!iso) return "";
  const d = Math.floor((new Date(dayKey()).getTime() - new Date(dayKey(new Date(iso))).getTime()) / 864e5);
  return d <= 0 ? t("frToday") : d === 1 ? t("frYesterday") : t("frDaysAgo", d);
}
function frCourseName(code){ const c = COURSES.find(x => x.code === code); return c ? courseName(c) : ""; }

function renderFriends(){
  const head = `<div class="top"><div class="wrap">
    <div class="th-t"><small>${esc(t("frSub"))}</small><b>${esc(t("frTitle"))}</b></div><span class="th-ic" aria-hidden="true">${I.users}</span></div></div>`;
  let body = "";
  if(!CLOUD_ON){ body = `<div class="fr-card"><p>${esc(t("frNoCloud"))}</p></div>`; }
  else if(!AUTH){
    body = `<div class="fr-card fr-intro"><span class="fr-big">${I.trophy}</span><h2>${esc(t("frIntroTitle"))}</h2><p>${esc(t("frIntroText"))}</p>
      <button class="big" data-a="aclogin">${esc(t("acLogin"))}</button></div>`;
  }
  else if(FR.rows === null){
    if(!FR.loading && !FR.err) setTimeout(frLoad, 0);
    body = FR.err ? `<div class="fr-card"><p>${esc(FR.err)}</p><button class="big" data-a="frreload">${esc(t("frRetry"))}</button></div>` : `<p class="fr-wait">${esc(t("frLoading"))}</p>`;
  }
  else {
    const me = FR.rows.find(r => r.is_me);
    if(!me || FR.editName){
      body = `<div class="fr-card"><h2>${esc(t(me ? "frEditName" : "frPickName"))}</h2><p>${esc(t("frNameText"))}</p>
        <input type="text" id="frname" maxlength="24" autocomplete="nickname" placeholder="${esc(t("frNamePh"))}" value="${esc(me ? me.display_name : "")}">
        <button class="big" data-a="frsavename" ${FR.busy ? "disabled" : ""}>${esc(t("frSave"))}</button>
        ${me ? `<button class="big ghost" data-a="frcancelname">${esc(t("cancel"))}</button>` : ""}</div>`;
    } else {
      const { rows, podium, board } = frBoardHTML(FR.rows, FR.tab, "frdetail");
      const meCard = `<div class="fr-card fr-me">${frAvatar(me.display_name, 0, S.avatar || me.avatar, 56, S.photo)}<div class="fr-me-t"><b>${esc(me.display_name)}</b>${me.username ? `<span class="fr-uname">@${esc(me.username)}</span>` : ""}<span class="fr-links"><button class="exlink" data-a="fredituser">${esc(t(me.username ? "frEditUser" : "frPickUser"))}</button><button class="exlink" data-a="freditname">${esc(t("frEditName"))}</button><button class="exlink" data-a="avedit">${esc(t("avEdit"))}</button></span></div></div>
        <div class="fr-card fr-pub"><span class="fr-pub-t"><b>${esc(t("frPublic"))}</b><small>${esc(t("frPublicSub"))}</small></span><button class="tog ${S.friendsPublic ? "on" : ""}" data-a="frpublic" role="switch" aria-checked="${!!S.friendsPublic}" aria-label="${esc(t("frPublic"))}"></button></div>`;
      const userCard = (FR.editUser || (!me.username && !FR.userLater)) ? `<div class="fr-card fr-user"><h2>${esc(t(me.username ? "frEditUser" : "frPickUser"))}</h2><p>${esc(t("frUserText"))}</p>
          <div class="fr-at"><span>@</span><input type="text" id="fruser" maxlength="20" autocapitalize="none" autocomplete="username" spellcheck="false" value="${esc(me.username || frUserSuggest(me.display_name))}"></div>
          <button class="big" data-a="frsaveuser" ${FR.busy ? "disabled" : ""}>${esc(t("frSave"))}</button><button class="big ghost" data-a="frlateruser">${esc(t(me.username ? "cancel" : "frLater"))}</button></div>` : "";
      const reqCard = FR.reqs.length ? `<div class="fr-card fr-reqs"><h3>${esc(t("frReqs"))} <span class="fr-n">${FR.reqs.length}</span></h3>${FR.reqs.map((r, i) =>
          `<div class="fr-hit">${frAvatar(r.display_name, i, r.avatar, 40, r.photo)}<span class="fr-t"><b>${esc(r.display_name)}</b><span>${r.username ? "@" + esc(r.username) : ""}</span></span><button class="fr-act" data-a="fracc" data-id="${esc(r.user_id)}">${esc(t("frAccept"))}</button><button class="fr-act ghost" data-a="frdec" data-id="${esc(r.user_id)}" aria-label="${esc(t("frDecline"))}">${I.x}</button><button class="fr-more" data-a="frmod" data-id="${esc(r.user_id)}" aria-label="${esc(t("repMore"))}">⋯</button></div>`).join("")}</div>` : "";
      const codeCard = `<div class="fr-card fr-find"><h3>${esc(t("frFind"))}</h3>
          <div class="fr-search">${I.search}<input type="search" id="frsearch" autocapitalize="none" autocomplete="off" spellcheck="false" placeholder="${esc(t("frSearchPh"))}" aria-label="${esc(t("frSearchPh"))}" value="${esc(FR.search.q)}"></div>
          <div id="frres" class="fr-res">${frResHTML()}</div>
          <div class="fr-or"><span>${esc(t("frOrShare"))}</span></div>
          ${frShareLinks(me)}
          <p class="fr-codeline">${esc(t("frYourCode"))}: <b class="fr-codev">${esc(frFmtCode(me.friend_code))}</b></p></div>
        <div class="fr-add"><input type="text" id="fradd" maxlength="12" autocapitalize="characters" autocomplete="off" placeholder="${esc(t("frAddPh"))}" aria-label="${esc(t("frAddPh"))}"><button class="big" data-a="fradd" ${FR.busy ? "disabled" : ""}>${esc(t("frAdd"))}</button></div>`;
      const boardHTML = `${frLeagueHTML(FR.rows)}
        <div class="seg fr-tabs" role="tablist">${["week", "total", "streak"].map(k => `<button role="tab" aria-selected="${FR.tab === k}" class="${FR.tab === k ? "on" : ""}" data-a="frtab" data-t="${k}">${esc(t("frTab_" + k))}</button>`).join("")}</div>
        ${podium}<div class="fr-board">${board}</div>
        ${rows.length < 2 ? `<p class="fr-hint">${esc(t("frEmpty"))}</p>` : ""}`;
      const suggCard = FR.sugg.filter(r => r.status !== "sent").length ? `<div class="fr-card fr-sugg"><h3>${esc(t("frSugg"))}</h3>${frHitsHTML(FR.sugg.slice(0, 8), r => t("frSuggVia", r.mutual, r.via || ""))}</div>` : "";
      body = meCard + userCard + reqCard + grInvitesHTML() + suggCard + (rows.length >= 2 ? boardHTML + codeCard : codeCard + boardHTML) + `
        <button class="exlink fr-refresh" data-a="frreload">${FR.loading ? esc(t("frLoading")) : esc(t("frRefresh"))}</button>`;
    }
  }
  const viewSeg = CLOUD_ON && AUTH && FR.rows && FR.rows.some(r => r.is_me) && !FR.editName ? `<div class="seg fr-view" role="tablist">${["friends", "groups"].map(k => `<button role="tab" aria-selected="${FR.view === k}" class="${FR.view === k ? "on" : ""}" data-a="frview" data-v="${k}">${esc(t("frView_" + k))}</button>`).join("")}</div>` : "";
  if(viewSeg && FR.view === "groups") body = grBodyHTML();
  $app.innerHTML = `${head}<main class="wrap fr">${viewSeg}${body}</main>`;
  const nm = document.getElementById("frname"); if(nm){ nm.focus(); nm.addEventListener("keydown", e => { if(e.key === "Enter") frSaveName(nm.value); }); }
  const ad = document.getElementById("fradd"); if(ad) ad.addEventListener("keydown", e => { if(e.key === "Enter") frAdd(ad.value); });
  const us = document.getElementById("fruser"); if(us) us.addEventListener("keydown", e => { if(e.key === "Enter") frSaveUser(us.value); });
  const sq = document.getElementById("frsearch"); if(sq){ sq.addEventListener("input", () => frSearchInput(sq.value)); if(FR.search.focus){ FR.search.focus = false; sq.focus(); } }
}
// Pall og liste for en toppliste (venner eller en gruppe). act = handling når man trykker på en annen person.
function frBoardHTML(raw, tab, act){
  const rows = raw.map(frLive), key = tab === "total" ? "xp" : tab === "streak" ? "streak" : "week_xp";
  rows.sort((a, b) => (b[key] - a[key]) || (b.xp - a.xp) || String(a.display_name).localeCompare(b.display_name));
  const unit = r => tab === "streak" ? `${r.streak}<small>${esc(t("frDays"))}</small>` : `${r[key]}<small>XP</small>`;
  const avOf = r => r.is_me ? (S.avatar || r.avatar) : r.avatar, phOf = r => r.is_me ? S.photo : r.photo;
  const click = r => r.is_me ? "" : `data-a="${act}" data-id="${esc(r.user_id)}"`;
  const podium = rows.length >= 2 ? `<div class="podium">${[1, 0, 2].map(i => { const r = rows[i]; if(!r) return `<div class="pd-col p${i + 1} empty"></div>`;
      return `<button class="pd-col p${i + 1} ${r.is_me ? "me" : ""}" ${click(r)}>
        <span class="pd-av">${i === 0 ? `<span class="pd-crown">${I.crown}</span>` : ""}${frAvatar(r.display_name, i, avOf(r), i === 0 ? 72 : 58, phOf(r))}</span>
        <b class="pd-name">${esc(r.display_name)}</b>${r.is_owner ? `<em class="fr-own pd-role">${esc(t("grOwner"))}</em>` : r.role === "admin" ? `<em class="fr-own adm pd-role">${esc(t("grRole_admin"))}</em>` : ""}<span class="pd-val">${unit(r)}</span>
        <span class="pd-block"><span class="pd-medal">${i + 1}</span></span></button>`; }).join("")}</div>` : "";
  const listRows = rows.length >= 2 ? rows.slice(3) : rows, off = rows.length >= 2 ? 3 : 0;
  const board = listRows.map((r, j) => { const i = j + off; return `<button class="fr-row ${r.is_me ? "me" : ""}" ${click(r)}>
      <span class="fr-rank r${i + 1}">${i + 1}</span>${frAvatar(r.display_name, i, avOf(r), 40, phOf(r))}
      <span class="fr-t"><b>${esc(r.display_name)}${r.is_me ? ` <em>${esc(t("frYou"))}</em>` : ""}${r.is_owner ? ` <em class="fr-own">${esc(t("grOwner"))}</em>` : r.role === "admin" ? ` <em class="fr-own adm">${esc(t("grRole_admin"))}</em>` : ""}</b><span>${esc(frCourseName(r.course))}${r.crowns ? ` · ${r.crowns} ${esc(t("frCrownsShort"))}` : ""}</span></span>
      <span class="fr-v">${unit(r)}</span></button>`; }).join("");
  return { rows, podium, board };
}
function frDetailHTML(id){
  const r0 = (FR.rows || []).find(x => x.user_id === id); if(!r0) return "";
  const r = frLive(r0), st = (label, v) => `<div class="fr-st"><b>${v}</b><span>${esc(label)}</span></div>`;
  return `<div class="dialog pop" role="dialog" aria-label="${esc(r.display_name)}"><div class="fr-dh">${frAvatar(r.display_name, 1, r.avatar, 56, r.photo)}<h3>${esc(r.display_name)}</h3></div>
    <div class="fr-stats">${st(t("frTab_week"), r.week_xp + " XP")}${st(t("frTab_total"), r.xp + " XP")}${st(t("frTab_streak"), r.streak + " " + t("frDays"))}${st(t("frCrowns"), r.crowns)}${st(t("frLevels"), r.levels)}${st(t("frLast"), esc(frAgo(r.updated_at)))}</div>
    ${r.course ? `<p class="fr-now">${esc(t("frNow", frCourseName(r.course)))}</p>` : ""}
    ${r.friends_since ? `<p class="fr-since">🤝 ${esc(t("frSince", fmtDate(r.friends_since)))}</p>` : ""}
    <button class="big ghost" data-a="frfof" data-id="${esc(id)}">${I.users}${esc(t("frFofBtn", r.display_name))}</button>
    <button class="big" data-a="closeov">${esc(t("cont"))}</button>
    <button class="big ghost" data-a="frremove" data-id="${esc(id)}" style="color:var(--bad)">${esc(overlay.confirm ? t("frRemoveSure") : t("frRemove"))}</button>
    <button class="exlink fr-repl" data-a="frmod" data-id="${esc(id)}">${I.flag}${esc(t("repOrBlock"))}</button></div>`;
}
// Vennene til en venn (hvis hen viser lista si).
async function frFofOpen(id){
  const r = (FR.rows || []).find(x => x.user_id === id); if(!r) return;
  FR.fof = { id, name: r.display_name, rows: null }; overlay = { frfof: 1 }; renderOverlay();
  try{ FR.fof.rows = (await frRpc("get_friend_friends", { fid: id })) || []; }catch(e){ FR.fof.rows = []; FR.fof.err = frErr(e); }
  if(overlay && overlay.frfof) renderOverlay();
}
function frFofHTML(){
  const f = FR.fof || {}, list = (f.rows || []).filter(r => r.status !== "me");
  return `<div class="dialog pop fr-fof" role="dialog" aria-label="${esc(t("frFof", f.name || ""))}"><h3>${esc(t("frFof", f.name || ""))}</h3>
    ${f.rows === null ? `<p class="fr-hint">${esc(t("frLoading"))}</p>` : f.err ? `<p class="fr-hint">${esc(f.err)}</p>` : list.length ? `<div class="fr-res">${frHitsHTML(list)}</div>` : `<p class="fr-hint">${esc(t("frFofNone", f.name || ""))}</p>`}
    <button class="big" data-a="closeov">${esc(t("cont"))}</button></div>`;
}
function openFriends(){ screen = "friends"; overlay = null; FR.rows = null; FR.err = null; render(); window.scrollTo(0, 0); }
function friendsClick(a, b){
  if(!a.startsWith("fr") && a !== "friends") return false;
  if(a === "friends") openFriends();
  else if(a === "frreload"){ FR.rows = FR.rows || null; frLoad(); }
  else if(a === "frsavename") frSaveName((document.getElementById("frname") || {}).value || "");
  else if(a === "freditname"){ FR.editName = true; render(); }
  else if(a === "frcancelname"){ FR.editName = false; render(); }
  else if(a === "frtab"){ FR.tab = b.dataset.t; render(); }
  else if(a === "frview"){ FR.view = b.dataset.v; if(FR.view === "friends") GR.cur = null; render(); window.scrollTo(0, 0); }
  else if(a === "frpublic"){ S.friendsPublic = !S.friendsPublic; save(); frPushSoon(); render(); toast(t(S.friendsPublic ? "frPublicOn" : "frPublicOff")); }
  else if(a === "frfof") frFofOpen(b.dataset.id);
  else if(a === "fradd") frAdd((document.getElementById("fradd") || {}).value || "");
  else if(a === "frshare" || a === "frcopy"){
    const me = frMe(); if(!me) return true;
    const url = CONFIG.siteUrl + "/?venn=" + me.friend_code, text = t("frShareText", frFmtCode(me.friend_code), url, me.username);
    if(a === "frshare" && navigator.share) navigator.share({ text }).catch(()=>{});
    else (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(()=>toast(t("frLinkCopied")), ()=>{});
  }
  else if(a === "fredituser"){ FR.editUser = true; render(); const u = document.getElementById("fruser"); if(u){ u.focus(); u.select(); } }
  else if(a === "frsaveuser") frSaveUser((document.getElementById("fruser") || {}).value || "");
  else if(a === "frlateruser"){ FR.editUser = false; FR.userLater = true; render(); }
  else if(a === "frreq") frRequest(b.dataset.id, b.dataset.n);
  else if(a === "frmod") frModOpen(b.dataset.id);
  else if(a === "frrep"){ const o = overlay.frmod; overlay = { frrep: { kind: b.dataset.k, id: o.id, reason: null } }; renderOverlay(); }
  else if(a === "frrepwhy"){ const note = (document.getElementById("frrepnote") || {}).value || ""; overlay.frrep.reason = +b.dataset.i; renderOverlay(); const n = document.getElementById("frrepnote"); if(n) n.value = note; }
  else if(a === "frrepsend") frReportSend();
  else if(a === "frblock"){ const o = overlay.frmod; if(o.confirmBlock) frBlock(o.id); else { o.confirmBlock = true; renderOverlay(); } }
  else if(a === "frblocks") frBlocksOpen();
  else if(a === "frunblock"){ frRpc("unblock_user", { fid: b.dataset.id }).then(() => { toast(t("unblockDone")); frBlocksOpen(); }, e => toast(frErr(e))); }
  else if(a === "fracc") frAnswer(b.dataset.id, true);
  else if(a === "frdec") frAnswer(b.dataset.id, false);
  else if(a === "frdetail"){ overlay = { friend: b.dataset.id }; renderOverlay(); }
  else if(a === "frremove"){ if(overlay && overlay.confirm) frRemove(b.dataset.id); else { overlay = { friend: b.dataset.id, confirm: true }; renderOverlay(); } }
  else return false;
  return true;
}
// Lenke fra en venn: axle.no/?venn=KODE → husk koden og åpne Venner.
function frBootLink(){
  let code = null; try{ code = new URLSearchParams(location.search).get("venn"); }catch(e){}
  if(!code) return false;
  try{ localStorage.setItem(FR_PENDING, code); }catch(e){}
  try{ history.replaceState(null, "", location.pathname + location.hash); }catch(e){}
  return true;
}
