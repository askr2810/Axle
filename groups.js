// ============================================================
//  GRUPPER – egen toppliste for vennegjengen, familien, klassen …
//  Ligger som en egen fane på Venner-skjermen. Databasen: supabase/grupper.sql.
//  Inviter med lenke (axle.no/?gruppe=KODE) eller kode. Maks 10 grupper per bruker, 50 medlemmer per gruppe.
// ============================================================
let GR = { list: null, loading: false, err: null, cur: null, rows: null, rowsLoading: false, tab: "week", edit: false, busy: false, inv: [], fr: null };
const GR_PENDING = "axle.pendingGroup";
const GR_EMOJI = ["👥", "🏠", "🎓", "⚙️", "⚡", "🔥", "🚀", "🧮", "🏆", "🦊", "🐸", "🌊"];

function grErr(e){
  const m = (e && e.msg) || "";
  if(/group_full/.test(m)) return t("grFull");
  if(/too_many_groups/.test(m)) return t("grTooMany");
  if(/not_found/.test(m)) return t("grNotFound");
  if(/bad_name/.test(m)) return t("grBadName");
  if(e && (e.status === 404 || /PGRST202|PGRST205|42P01|42883/.test(e.code || ""))) return t("grNotSetUp");
  return frErr(e);
}
async function grLoadList(){
  if(!CLOUD_ON || !AUTH || GR.loading) return;
  GR.loading = true; GR.err = null; frRender();
  try{ GR.list = (await frRpc("list_my_groups")) || []; }catch(e){ GR.err = grErr(e); GR.list = GR.list || null; }
  await grLoadInvites();
  GR.loading = false; frRender();
}
async function grLoadGroup(id){
  GR.cur = id; GR.rowsLoading = true; GR.err = null; frRender();
  try{ GR.rows = (await frRpc("get_group", { gid: id })) || []; if(!GR.rows.length){ GR.cur = null; GR.rows = null; toast(t("grGone")); } }
  catch(e){ GR.err = grErr(e); GR.rows = null; }
  GR.rowsLoading = false; frRender();
}
const grOf = id => (GR.list || []).find(g => g.id === id);
// Invitasjoner fra venner (vises på Venner og Grupper, og gir prikk på Venner-fanen).
async function grLoadInvites(){ try{ GR.inv = (await frRpc("get_group_invites")) || []; }catch(e){ GR.inv = []; } renderTabbar(); }
function grInvitesHTML(){
  if(!GR.inv.length) return "";
  return `<div class="fr-card fr-reqs gr-invs"><h3>${esc(t("grInvites"))} <span class="fr-n">${GR.inv.length}</span></h3>${GR.inv.map(g =>
    `<div class="fr-hit"><span class="gr-emo">${esc(g.emoji)}</span><span class="fr-t"><b>${esc(g.name)}</b><span>${esc(t("grInvitedBy", g.inviter, g.members))}</span></span>
      <button class="fr-act" data-a="grinvacc" data-id="${esc(g.id)}">${esc(t("grJoinBtn"))}</button><button class="fr-act ghost" data-a="grinvdec" data-id="${esc(g.id)}" aria-label="${esc(t("frDecline"))}">${I.x}</button></div>`).join("")}</div>`;
}
// Legg til venner i gruppa: liste over vennene dine med status (med / invitert / inviter).
async function grFriendsOpen(){
  GR.fr = null; overlay = { grfriends: 1 }; renderOverlay();
  try{ GR.fr = (await frRpc("group_friend_status", { gid: GR.cur })) || []; }catch(e){ GR.fr = []; GR.frErr = grErr(e); }
  if(overlay && overlay.grfriends) renderOverlay();
}
function grFriendsHTML(){
  const g = grOf(GR.cur) || {}, list = GR.fr, open = (list || []).filter(r => r.status === "none");
  const row = (r, i) => `<div class="fr-hit">${frAvatar(r.display_name, i, r.avatar, 40, r.photo)}<span class="fr-t"><b>${esc(r.display_name)}</b><span>${r.username ? "@" + esc(r.username) : ""}</span></span>
    ${r.status === "member" ? `<span class="fr-pill">${esc(t("grIsMember"))}</span>` : r.status === "invited" ? `<span class="fr-pill">${esc(t("grInvited"))}</span>` : `<button class="fr-act" data-a="grinv" data-id="${esc(r.user_id)}">${I.plus}${esc(t("grInviteOne"))}</button>`}</div>`;
  return `<div class="dialog pop fr-fof gr-addfr" role="dialog" aria-label="${esc(t("grAddFriends"))}"><h3>${esc(t("grAddFriends"))}</h3><p>${esc(t("grAddFriendsText", g.name || ""))}</p>
    ${list === null ? `<p class="fr-hint">${esc(t("frLoading"))}</p>` : GR.frErr ? `<p class="fr-hint">${esc(GR.frErr)}</p>` : list.length ? `<div class="fr-res">${list.map(row).join("")}</div>` : `<p class="fr-hint">${esc(t("grNoFriends"))}</p>`}
    ${open.length > 1 ? `<button class="big" data-a="grinvall">${esc(t("grInviteAll", open.length))}</button>` : ""}
    <button class="big ${open.length > 1 ? "ghost" : ""}" data-a="closeov">${esc(t("frDone"))}</button></div>`;
}
async function grInvite(ids){
  try{ const n = await frRpc("invite_to_group", { gid: GR.cur, uids: ids }); (GR.fr || []).forEach(r => { if(ids.includes(r.user_id) && r.status === "none") r.status = "invited"; });
    buzz(true); toast(t("grInvitesSent", n || ids.length)); if(overlay && overlay.grfriends) renderOverlay(); }
  catch(e){ toast(grErr(e)); }
}
async function grAnswer(id, accept){
  const inv = GR.inv.find(g => g.id === id);
  try{ await frRpc("answer_group_invite", { gid: id, accept }); GR.inv = GR.inv.filter(g => g.id !== id); renderTabbar();
    if(accept){ buzz(true); toast(t("grJoined", inv ? inv.name : "")); FR.view = "groups"; GR.list = null; await grLoadList(); GR.rows = null; GR.cur = id; }
    render(); window.scrollTo(0, 0); }
  catch(e){ toast(grErr(e)); }
}
function grInviteLink(g){ const url = CONFIG.siteUrl + "/?gruppe=" + g.code; return { url, text: t("grInviteText", g.emoji + " " + g.name, url, frFmtCode(g.code)) }; }

// ---------- visning ----------
function grBodyHTML(){
  if(GR.cur) return grGroupHTML();
  if(GR.list === null){
    if(!GR.loading && !GR.err) setTimeout(grLoadList, 0);
    return GR.err ? `<div class="fr-card"><p>${esc(GR.err)}</p><button class="big" data-a="grreload">${esc(t("frRetry"))}</button></div>` : `<p class="fr-wait">${esc(t("frLoading"))}</p>`;
  }
  const cards = GR.list.map(g => `<button class="gr-item" data-a="gropen" data-id="${esc(g.id)}"><span class="gr-emo">${esc(g.emoji)}</span>
      <span class="fr-t"><b>${esc(g.name)}</b><span>${esc(t("grMembers", g.members))}${g.is_owner ? " · " + esc(t("grOwner")) : ""}</span></span>${I.chevron}</button>`).join("");
  return `${grInvitesHTML()}<div class="fr-card gr-intro"><h2>${esc(t("grTitle"))}</h2><p>${esc(t("grIntro"))}</p>
      <div class="gr-btns"><button class="big" data-a="grnew">${I.plus}${esc(t("grNew"))}</button><button class="big ghost" data-a="grjoinopen">${esc(t("grJoin"))}</button></div></div>
    ${GR.list.length ? `<div class="gr-list">${cards}</div>` : `<p class="fr-hint">${esc(t("grEmpty"))}</p>`}
    ${GR.err ? `<p class="fr-hint">${esc(GR.err)}</p>` : ""}`;
}
function grGroupHTML(){
  if(GR.list === null){ if(!GR.loading && !GR.err) setTimeout(grLoadList, 0); return `<p class="fr-wait">${esc(t("frLoading"))}</p>`; } // etter oppdatering (#/grupper/<id>)
  const g = grOf(GR.cur);
  if(!g){ GR.cur = null; return grBodyHTML(); }
  if(GR.rows === null || GR.rowsLoading && !GR.rows){
    if(!GR.rowsLoading && !GR.err) setTimeout(() => grLoadGroup(g.id), 0);
    return `<button class="exlink gr-back" data-a="grback">${I.left}${esc(t("grBack"))}</button>` + (GR.err ? `<div class="fr-card"><p>${esc(GR.err)}</p></div>` : `<p class="fr-wait">${esc(t("frLoading"))}</p>`);
  }
  const { rows, podium, board } = frBoardHTML(GR.rows, GR.tab, "grmember");
  const wk = rows.reduce((s, r) => s + (+r.week_xp || 0), 0), myRank = rows.findIndex(r => r.is_me) + 1;
  const inv = grInviteLink(g), e = encodeURIComponent;
  const editCard = GR.edit ? `<div class="fr-card gr-edit"><h3>${esc(t("grRename"))}</h3>
      <div class="gr-emos">${GR_EMOJI.map(x => `<button class="${(GR.editEmoji || g.emoji) === x ? "on" : ""}" data-a="gremoji" data-e="${x}">${x}</button>`).join("")}</div>
      <input type="text" id="grname" maxlength="30" value="${esc(g.name)}" aria-label="${esc(t("grNamePh"))}">
      <button class="big" data-a="grsave" ${GR.busy ? "disabled" : ""}>${esc(t("frSave"))}</button><button class="big ghost" data-a="grcanceledit">${esc(t("cancel"))}</button>
      <button class="exlink" data-a="grnewcode">${esc(t("grNewCode"))}</button></div>` : "";
  return `<button class="exlink gr-back" data-a="grback">${I.left}${esc(t("grBack"))}</button>
    <div class="fr-card gr-head"><span class="gr-emo big">${esc(g.emoji)}</span><div class="fr-t"><b>${esc(g.name)}</b><span>${esc(t("grMembers", rows.length))}${myRank ? " · " + esc(t("grRank", myRank, rows.length)) : ""}</span></div>
      <button class="fr-more" data-a="grmenu" aria-label="${esc(t("repMore"))}">⋯</button></div>
    ${editCard}
    <div class="fr-card lg"><div class="lg-h"><b>${I.trophyS}${esc(t("grWeek"))}</b><span>${esc(frCountdown())}</span></div><p class="gr-sum">${esc(t("grWeekSum", wk))}</p></div>
    <div class="seg fr-tabs" role="tablist">${["week", "total", "streak"].map(k => `<button role="tab" aria-selected="${GR.tab === k}" class="${GR.tab === k ? "on" : ""}" data-a="grtab" data-t="${k}">${esc(t("frTab_" + k))}</button>`).join("")}</div>
    ${podium}<div class="fr-board">${board}</div>
    ${rows.length < 2 ? `<p class="fr-hint">${esc(t("grAloneFr"))}</p>` : ""}
    <button class="big gr-addbtn" data-a="grfriends">${I.users}${esc(t("grAddFriends"))}</button>
    <div class="fr-card fr-find"><h3>${esc(t("grInviteLinkH"))}</h3>
      <div class="fr-share">
        ${navigator.share ? `<button class="fr-sh main" data-a="grshare">${I.share}<span>${esc(t("frShare"))}</span></button>` : ""}
        <a class="fr-sh" href="sms:?&body=${e(inv.text)}">${I.chat}<span>${esc(t("frSms"))}</span></a>
        <a class="fr-sh" href="mailto:?subject=${e(t("grMailSubj"))}&body=${e(inv.text)}">${I.mail}<span>${esc(t("frMail"))}</span></a>
        <a class="fr-sh" href="https://wa.me/?text=${e(inv.text)}" target="_blank" rel="noopener">${I.chat}<span>WhatsApp</span></a>
        <button class="fr-sh" data-a="grcopy">${I.copy}<span>${esc(t("frCopyLink"))}</span></button></div>
      <p class="fr-codeline">${esc(t("grCode"))}: <b class="fr-codev">${esc(frFmtCode(g.code))}</b></p></div>
    <button class="exlink fr-refresh" data-a="grreloadgroup">${GR.rowsLoading ? esc(t("frLoading")) : esc(t("frRefresh"))}</button>`;
}
// ---------- dialoger ----------
function grNewHTML(o){
  return `<div class="dialog pop gr-dlg" role="dialog" aria-label="${esc(t("grNew"))}"><h3>${esc(t("grNew"))}</h3><p>${esc(t("grNewText"))}</p>
    <div class="gr-emos">${GR_EMOJI.map(x => `<button class="${o.emoji === x ? "on" : ""}" data-a="grnewemoji" data-e="${x}">${x}</button>`).join("")}</div>
    <input type="text" id="grnewname" maxlength="30" placeholder="${esc(t("grNamePh"))}" value="${esc(o.name || "")}">
    ${o.err ? `<p class="lgerr">${esc(o.err)}</p>` : ""}
    <button class="big" data-a="grcreate" ${o.busy ? "disabled" : ""}>${esc(t("grCreate"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function grJoinHTML(o){
  if(o.peek) return `<div class="dialog pop gr-dlg" role="dialog" aria-label="${esc(o.peek.name)}"><span class="gr-emo huge">${esc(o.peek.emoji)}</span>
    <h3>${esc(t("grJoinTitle", o.peek.name))}</h3><p>${esc(t("grMembers", o.peek.members))}</p>${o.err ? `<p class="lgerr">${esc(o.err)}</p>` : ""}
    <button class="big" data-a="grjoin" ${o.busy ? "disabled" : ""}>${esc(t("grJoinBtn"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button>
    <button class="exlink fr-repl" data-a="grreportpeek">${I.flag}${esc(t("grReport"))}</button></div>`;
  return `<div class="dialog pop gr-dlg" role="dialog" aria-label="${esc(t("grJoin"))}"><h3>${esc(t("grJoin"))}</h3><p>${esc(t("grJoinText"))}</p>
    <input type="text" id="grcode" maxlength="12" autocapitalize="characters" autocomplete="off" placeholder="${esc(t("grCodePh"))}" value="${esc(o.code || "")}">
    ${o.err ? `<p class="lgerr">${esc(o.err)}</p>` : ""}
    <button class="big" data-a="grpeek" ${o.busy ? "disabled" : ""}>${esc(t("grFind"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function grMemberHTML(id){
  const r0 = (GR.rows || []).find(x => x.user_id === id); if(!r0) return "";
  const r = frLive(r0), g = grOf(GR.cur), st = (label, v) => `<div class="fr-st"><b>${v}</b><span>${esc(label)}</span></div>`;
  const sent = (FR.search.rows || []).concat(FR.sugg || []).some(x => x.user_id === id && x.status === "sent") || (overlay && overlay.sent);
  return `<div class="dialog pop" role="dialog" aria-label="${esc(r.display_name)}"><div class="fr-dh">${frAvatar(r.display_name, 1, r.avatar, 56, r.photo)}<h3>${esc(r.display_name)}</h3></div>
    <div class="fr-stats">${st(t("frTab_week"), r.week_xp + " XP")}${st(t("frTab_total"), r.xp + " XP")}${st(t("frTab_streak"), r.streak + " " + t("frDays"))}${st(t("frCrowns"), r.crowns)}${st(t("frLevels"), r.levels)}${st(t("frLast"), esc(frAgo(r.updated_at)))}</div>
    ${r.course ? `<p class="fr-now">${esc(t("frNow", frCourseName(r.course)))}</p>` : ""}
    ${r.is_friend ? `<p class="fr-hint">${esc(t("frIsFriend"))}</p>` : sent ? `<p class="fr-hint">${esc(t("frSent"))}</p>` : `<button class="big" data-a="graddfriend" data-id="${esc(id)}" data-n="${esc(r.display_name)}">${I.plus}${esc(t("grAddFriend"))}</button>`}
    ${g && g.is_owner ? `<button class="big ghost" data-a="grkick" data-id="${esc(id)}" style="color:var(--bad)">${esc(overlay && overlay.confirmKick ? t("grKickSure") : t("grKick"))}</button>` : ""}
    <button class="big ghost" data-a="closeov">${esc(t("cont"))}</button>
    <button class="exlink fr-repl" data-a="frmod" data-id="${esc(id)}">${I.flag}${esc(t("repOrBlock"))}</button></div>`;
}
function grMenuHTML(o){
  const g = grOf(GR.cur); if(!g) return "";
  return `<div class="dialog pop" role="dialog" aria-label="${esc(g.name)}"><div class="fr-dh"><span class="gr-emo big">${esc(g.emoji)}</span><h3>${esc(g.name)}</h3></div>
    ${g.is_owner ? `<button class="srow" data-a="gredit"><span class="lbl">${esc(t("grRename"))}</span>${I.chevron}</button>` : ""}
    <button class="srow" data-a="grreport"><span class="lbl">${esc(t("grReport"))}</span>${I.flag}</button>
    <button class="big ghost" data-a="grleave" style="color:var(--bad)">${esc(o.confirmLeave ? t("grLeaveSure") : t("grLeave"))}</button>
    ${g.is_owner ? `<button class="big ghost" data-a="grdelete" style="color:var(--bad)">${esc(o.confirmDelete ? t("grDeleteSure") : t("grDelete"))}</button>` : ""}
    <button class="big" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function grOverlayHTML(){
  if(overlay.grnew) return grNewHTML(overlay.grnew);
  if(overlay.grjoin) return grJoinHTML(overlay.grjoin);
  if(overlay.grmember) return grMemberHTML(overlay.grmember);
  if(overlay.grmenu) return grMenuHTML(overlay.grmenu);
  if(overlay.grfriends) return grFriendsHTML();
  return "";
}
// ---------- handlinger ----------
async function grCreate(){
  const o = overlay.grnew, name = ((document.getElementById("grnewname") || {}).value || "").trim(); o.name = name;
  if(name.length < 2){ o.err = t("grBadName"); renderOverlay(); return; }
  if(!isClean(name)){ o.err = t("frBadWord"); renderOverlay(); return; }
  o.busy = true; o.err = null; renderOverlay();
  try{ const id = await frRpc("create_group", { p_name: name, p_emoji: o.emoji }); overlay = null; renderOverlay(); buzz(true); toast(t("grCreated", name));
    await grLoadList(); GR.rows = null; GR.cur = id; render(); window.scrollTo(0, 0);
    if((FR.rows || []).some(r => !r.is_me)) grFriendsOpen(); } // rett til «Legg til venner»
  catch(e){ o.busy = false; o.err = grErr(e); renderOverlay(); }
}
async function grPeek(code){
  const o = overlay.grjoin; o.code = code; if(!code.trim()) return;
  o.busy = true; o.err = null; renderOverlay();
  try{ const r = (await frRpc("peek_group", { p_code: code }))[0]; o.busy = false;
    if(!r){ o.err = t("grNotFound"); renderOverlay(); return; }
    if(r.is_member){ overlay = null; renderOverlay(); FR.view = "groups"; await grLoadList(); GR.rows = null; GR.cur = r.id; render(); return; }
    o.peek = r; renderOverlay(); }
  catch(e){ o.busy = false; o.err = grErr(e); renderOverlay(); }
}
async function grJoin(){
  const o = overlay.grjoin; o.busy = true; o.err = null; renderOverlay();
  try{ const r = (await frRpc("join_group", { p_code: o.code }))[0]; overlay = null; renderOverlay(); buzz(true); toast(t("grJoined", r ? r.name : ""));
    FR.view = "groups"; await grLoadList(); GR.rows = null; GR.cur = r ? r.id : null; screen = "friends"; render(); window.scrollTo(0, 0); }
  catch(e){ o.busy = false; o.err = grErr(e); renderOverlay(); }
}
// Invitasjonslenke: husk koden til innlogging og profil er klar, og spør så.
function grPendingCheck(){
  let code = null; try{ code = localStorage.getItem(GR_PENDING); localStorage.removeItem(GR_PENDING); }catch(e){}
  if(!code) return; FR.view = "groups"; overlay = { grjoin: { code } }; renderOverlay(); grPeek(code);
}
function grBootLink(){
  let code = null; try{ code = new URLSearchParams(location.search).get("gruppe"); }catch(e){}
  if(!code) return false;
  try{ localStorage.setItem(GR_PENDING, code); }catch(e){}
  try{ const q = new URLSearchParams(location.search); q.delete("gruppe"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }catch(e){}
  FR.view = "groups"; return true;
}
function grClick(a, b){
  if(!a.startsWith("gr")) return false;
  const g = grOf(GR.cur);
  if(a === "grreload"){ GR.list = null; GR.err = null; grLoadList(); }
  else if(a === "gropen"){ GR.rows = null; GR.cur = b.dataset.id; GR.edit = false; render(); window.scrollTo(0, 0); }
  else if(a === "grback"){ GR.cur = null; GR.rows = null; GR.edit = false; render(); window.scrollTo(0, 0); grLoadList(); }
  else if(a === "grreloadgroup"){ if(GR.cur) grLoadGroup(GR.cur); }
  else if(a === "grtab"){ GR.tab = b.dataset.t; render(); }
  else if(a === "grnew"){ overlay = { grnew: { emoji: "👥", name: "" } }; renderOverlay(); setTimeout(() => document.getElementById("grnewname")?.focus(), 50); }
  else if(a === "grnewemoji"){ const o = overlay.grnew; o.name = (document.getElementById("grnewname") || {}).value || o.name; o.emoji = b.dataset.e; renderOverlay(); }
  else if(a === "grcreate") grCreate();
  else if(a === "grjoinopen"){ overlay = { grjoin: { code: "" } }; renderOverlay(); setTimeout(() => document.getElementById("grcode")?.focus(), 50); }
  else if(a === "grpeek") grPeek((document.getElementById("grcode") || {}).value || "");
  else if(a === "grjoin") grJoin();
  else if(a === "grfriends") grFriendsOpen();
  else if(a === "grinv") grInvite([b.dataset.id]);
  else if(a === "grinvall") grInvite((GR.fr || []).filter(r => r.status === "none").map(r => r.user_id));
  else if(a === "grinvacc") grAnswer(b.dataset.id, true);
  else if(a === "grinvdec") grAnswer(b.dataset.id, false);
  else if(a === "grmember"){ overlay = { grmember: b.dataset.id }; renderOverlay(); }
  else if(a === "graddfriend"){ frRequest(b.dataset.id, b.dataset.n).then(() => { if(overlay && overlay.grmember){ overlay.sent = true; renderOverlay(); } }); }
  else if(a === "grkick"){
    if(!overlay.confirmKick){ overlay.confirmKick = true; renderOverlay(); return true; }
    const id = b.dataset.id; frRpc("remove_group_member", { gid: GR.cur, uid: id }).then(() => { overlay = null; renderOverlay(); toast(t("grKicked")); grLoadGroup(GR.cur); }, e => toast(grErr(e)));
  }
  else if(a === "grmenu"){ overlay = { grmenu: {} }; renderOverlay(); }
  else if(a === "gredit"){ overlay = null; renderOverlay(); GR.edit = true; GR.editEmoji = g && g.emoji; render(); }
  else if(a === "gremoji"){ GR.editEmoji = b.dataset.e; const nm = (document.getElementById("grname") || {}).value; render(); const el = document.getElementById("grname"); if(el && nm != null) el.value = nm; }
  else if(a === "grcanceledit"){ GR.edit = false; render(); }
  else if(a === "grsave" || a === "grnewcode"){
    const name = ((document.getElementById("grname") || {}).value || (g && g.name) || "").trim();
    if(!isClean(name)){ toast(t("frBadWord")); return true; }
    GR.busy = true; render();
    frRpc("update_group", { gid: GR.cur, p_name: name, p_emoji: GR.editEmoji || (g && g.emoji), p_new_code: a === "grnewcode" })
      .then(async () => { GR.busy = false; GR.edit = a === "grnewcode" ? GR.edit : false; toast(t(a === "grnewcode" ? "grCodeNew" : "grSaved")); await grLoadList(); }, e => { GR.busy = false; render(); toast(grErr(e)); });
  }
  else if(a === "grleave"){
    const o = overlay.grmenu; if(!o.confirmLeave){ o.confirmLeave = true; renderOverlay(); return true; }
    frRpc("leave_group", { gid: GR.cur }).then(() => { overlay = null; renderOverlay(); toast(t("grLeft")); GR.cur = null; GR.rows = null; GR.list = null; render(); }, e => toast(grErr(e)));
  }
  else if(a === "grdelete"){
    const o = overlay.grmenu; if(!o.confirmDelete){ o.confirmDelete = true; renderOverlay(); return true; }
    frRpc("delete_group", { gid: GR.cur }).then(() => { overlay = null; renderOverlay(); toast(t("grDeleted")); GR.cur = null; GR.rows = null; GR.list = null; render(); }, e => toast(grErr(e)));
  }
  else if(a === "grreport"){ overlay = { frrep: { kind: "group", id: null, target: GR.cur, reason: null } }; renderOverlay(); }
  else if(a === "grreportpeek"){ const p = overlay.grjoin && overlay.grjoin.peek; if(p){ overlay = { frrep: { kind: "group", id: null, target: p.id, reason: null } }; renderOverlay(); } }
  else if(a === "grshare" || a === "grcopy"){
    if(!g) return true; const { text } = grInviteLink(g);
    if(a === "grshare" && navigator.share) navigator.share({ text }).catch(() => {});
    else (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast(t("frLinkCopied")), () => {});
  }
  else return false;
  return true;
}
document.addEventListener("keydown", e => {
  if(e.key !== "Enter" || !overlay) return;
  if(overlay.grnew && e.target.id === "grnewname") grCreate();
  else if(overlay.grjoin && !overlay.grjoin.peek && e.target.id === "grcode") grPeek(e.target.value);
});
