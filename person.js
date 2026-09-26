// ============================================================
//  PROFILSIDE FOR ANDRE – trykk på en venn, et gruppemedlem, et søketreff eller et forslag.
//  Henter public.get_profile (supabase/venner.sql): full statistikk for venner og folk i samme gruppe,
//  ellers navn, bilde og merkene personen selv viser. Adresse: #/person/<id>.
//  Her ligger også valget av hvilke av dine egne merker andre får se (S.badgesPublic, S.badgeHide).
// ============================================================
let PS = { id: null, from: "friends", row: null, busy: false, err: null, gone: false, confirm: null };
const psIsId = x => /^[0-9a-f-]{36}$/i.test(x || "");
// Det vi allerede vet om personen (vises med en gang, og brukes hvis get_profile ikke finnes i databasen ennå).
function psLocal(id){
  const hit = l => (l || []).find(x => x.user_id === id);
  const fr = hit(FR.rows), gr = typeof GR !== "undefined" ? hit(GR.rows) : null, other = hit(FR.search.rows) || hit(FR.sugg) || hit(FR.reqs) || hit(FR.fof && FR.fof.rows);
  if(!fr && !gr && !other) return null;
  const r = Object.assign({}, other || {}, gr || {}, fr || {});
  if(fr){ r.status = fr.is_me ? "me" : "friend"; r.is_friend = !fr.is_me; }
  else if(FR.reqs && hit(FR.reqs)) r.status = "incoming";
  if(r.is_me) r.status = "me";
  if(gr){ r.g_role = gr.is_owner ? "owner" : gr.role || "member"; r.g_joined = gr.joined_at; }
  return r;
}
function psOpen(id, from){
  if(!psIsId(id)) return;
  overlay = null; PS = { id, from: from || "friends", gid: from === "groups" ? GR.cur : null, row: psLocal(id), busy: false, err: null, gone: false, confirm: null };
  screen = "person"; render(); window.scrollTo(0, 0); psLoad();
}
async function psLoad(){
  const id = PS.id; if(!id) return;
  if(!CLOUD_ON || !AUTH){ PS.err = t("psLogin"); psRender(); return; }
  PS.busy = true; psRender();
  try{
    const r = ((await frRpc("get_profile", { uid: id })) || [])[0];
    if(PS.id !== id) return;
    if(!r) PS.gone = true;
    else { const k0 = PS.row || {}; PS.row = Object.assign({ g_role: k0.g_role, g_joined: k0.g_joined }, r, { fetched: true }); } // databasen har siste ord
  }catch(e){ if(!(e.status === 404 || /PGRST202|42883/.test(e.code || ""))) PS.err = frErr(e); } // uten get_profile: det vi vet lokalt
  PS.busy = false; psRender();
}
function psRender(){ if(screen === "person" && !overlay) render(); }
function psBack(){
  const f = PS.from; overlay = null;
  if(f === "badges" || f === "profile" || f === "admin"){ screen = f; }
  else { screen = "friends"; FR.view = f === "groups" ? "groups" : "friends"; if(f === "groups" && PS.gid){ GR.cur = PS.gid; GR.rows = null; } }
  render(); window.scrollTo(0, 0);
}
// Merkene en person viser: "first,st7,pioneer" → BADGES-rader (Pioner bare med gyldig nummer).
function psBadges(r){
  const no = +r.member_no || 0;
  return String(r.badges || "").split(",").map(id => BADGES.find(b => b[0] === id)).filter(b => b && (b[0] !== "pioneer" || (no > 0 && no <= PIONEER_MAX)));
}
function renderPerson(){
  const r0 = PS.row, r = r0 ? frLive(r0) : null, name = r ? r.display_name : "";
  const back = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="psback" aria-label="${esc(t("back"))}">${I.left}</button>
    <div class="th-t"><small>${esc(t(PS.from === "groups" ? "psFromGroup" : PS.from === "admin" ? "admTitle" : PS.from === "badges" || PS.from === "profile" ? "tabProfile" : "tabFriends"))}</small><b>${esc(name || t("psTitle"))}</b></div></div></div>`;
  if(!r){
    $app.innerHTML = back + `<main class="wrap pf ps">${PS.gone ? `<p class="fr-hint">${esc(t("psGone"))}</p>` : PS.err ? `<p class="fr-hint">${esc(PS.err)}</p><button class="big ghost" data-a="psreload">${esc(t("frRetry"))}</button>` : `<p class="fr-hint">${esc(t("frLoading"))}</p>`}</main>`;
    return;
  }
  const me = r.status === "me" || r.is_me || (AUTH && r.user_id === AUTH.uid), full = r.xp != null;
  const av = me ? (S.avatar || r.avatar) : r.avatar, photo = me ? S.photo : r.photo, no = +r.member_no || 0;
  const tile = (v, lab, ic) => `<div class="pf-tile">${ic}<b>${v}</b><span>${esc(lab)}</span></div>`;
  // forholdet dere imellom
  const rel = [];
  if(r.friends_since) rel.push(["🤝", t("frSince", fmtDate(r.friends_since))]);
  if(r.g_role === "owner" || r.g_role === "admin") { const x = t(r.g_role === "owner" ? "grOwner" : "grRole_admin"); rel.push(["⭐", x[0].toUpperCase() + x.slice(1)]); }
  if(r.g_joined) rel.push(["👥", t("grSince", fmtDate(r.g_joined))]);
  if(r.shared_groups) rel.push(["🏷️", t("psGroups", r.shared_groups)]);
  if(!me && +r.mutual_friends > 0) rel.push(["🫂", t("psMutual", +r.mutual_friends)]);
  // hovedknapp etter status
  const st = me ? "me" : r.status || (r.is_friend ? "friend" : "none");
  const act = st === "me" ? `<p class="ps-note">${esc(t(S.statsPrivate === false ? "psMeNotePub" : "psMeNote"))}</p><button class="big ghost" data-a="badges">${I.eye}${esc(t("psEditBadges"))}</button>`
    : st === "friend" ? (r.friends_public ? `<button class="big ghost" data-a="frfof" data-id="${esc(r.user_id)}">${I.users}${esc(t("frFofBtn", name))}</button>` : "")
    : st === "sent" ? `<p class="ps-note"><span class="fr-pill">${esc(t("frSent"))}</span></p>`
    : st === "incoming" ? `<p class="ps-note">${esc(t("psWantsFriend", name))}</p><div class="ps-two"><button class="big" data-a="psacc">${esc(t("frAccept"))}</button><button class="big ghost" data-a="psdec">${esc(t("frDecline"))}</button></div>`
    : `<button class="big" data-a="psreq">${I.plus}${esc(t("grAddFriend"))}</button>`;
  // admin i gruppa man kom fra
  const g = PS.gid ? grOf(PS.gid) : null, gr = g && GR.cur === PS.gid ? (GR.rows || []).find(x => x.user_id === r.user_id) : null, grole = gr ? (gr.is_owner ? "owner" : gr.role || "member") : null;
  let adm = "";
  if(g && gr && !me){
    if(grRole(g) === "owner" && grole !== "owner") adm += `<button class="big ghost" data-a="psrole" data-r="${grole === "admin" ? "member" : "admin"}">${esc(t(grole === "admin" ? "grUnAdmin" : "grMakeAdmin"))}</button>`;
    if((grRole(g) === "owner" && grole !== "owner") || (grRole(g) === "admin" && grole === "member"))
      adm += `<button class="big ghost ps-bad" data-a="pskick">${esc(t(PS.confirm === "kick" ? "grKickSure" : "grKick"))}</button>${g.visibility === "open" ? `<p class="lgnote">${esc(t("grKickOpenNote"))}</p>` : ""}`;
    if(adm) adm = `<div class="pf-sec"><div class="pf-sh"><b>${esc(g.emoji + " " + g.name)}</b></div>${adm}</div>`;
  }
  const bl = me ? bdgShown().map(id => BADGES.find(b => b[0] === id)) : psBadges(r); // egne: slik de er valgt nå
  const badgeSec = `<div class="pf-sec"><div class="pf-sh"><b>${esc(t("bdgTitle"))}</b>${me ? `<button class="exlink" data-a="badges">${esc(t("psChoose"))}</button>` : ""}</div>
    ${bl.length ? `<div class="ps-badges">${bl.map(b => `<button data-a="psbadge" data-id="${b[0]}" title="${esc(T(b[5], b[6]))}">${badgeIcon(b, 54, false, me ? undefined : no)}<small>${esc(T(b[5], b[6]))}</small></button>`).join("")}</div>`
      : `<p class="pf-empty">${esc(me ? t(S.badgesPublic === false ? "psMeHidden" : "psMeNone") : r0.fetched || r0.badges !== undefined ? t("psNoBadges", name) : t("frLoading"))}</p>`}</div>`;
  $app.innerHTML = back + `<main class="wrap pf ps">
      <div class="pf-head"><span class="pf-av">${frAvatar(name, 1, av, 104, photo)}</span>
        <div class="pf-id"><b>${esc(name)}</b>${r.username ? `<span class="ps-user">@${esc(r.username)}</span>` : ""}${full ? `<span class="pf-lv">${esc(t("lvName", levelInfo(+r.xp || 0).lv))}</span>` : ""}${staffTag(me && isStaff() ? S.appRole : r.app_role)}
          ${no > 0 ? `<span class="pf-since">${esc(t("psMemberNo", no))}</span>` : ""}${st === "friend" ? `<span class="fr-pill ps-fr">${I.check}${esc(t("frIsFriend"))}</span>` : ""}</div></div>
      ${rel.length ? `<ul class="ps-rel">${rel.map(([ic, tx]) => `<li><span aria-hidden="true">${ic}</span>${esc(tx)}</li>`).join("")}</ul>` : ""}
      <div class="ps-act">${act}</div>
      ${full ? `<div class="pf-grid">${tile(r.week_xp, t("frTab_week"), I.bolt)}${tile(r.xp, "XP", I.bolt)}${tile(r.streak, t("pfStreak"), I.fire)}${tile(r.crowns, t("pfCrowns"), I.crown)}${tile(r.levels, t("pfLevels"), I.star16)}${tile(esc(frAgo(r.updated_at)), t("frLast"), I.person)}</div>
        ${r.course ? `<p class="fr-now">${esc(t("frNow", frCourseName(r.course)))}</p>` : ""}`
        : `<p class="ps-note">${esc(t("psPrivate", name))}</p>`}
      ${badgeSec}${adm}
      ${!me ? `<div class="ps-foot">${st === "friend" ? `<button class="big ghost ps-bad" data-a="psremove">${esc(t(PS.confirm === "remove" ? "frRemoveSure" : "frRemove"))}</button>` : ""}
        <button class="exlink fr-repl" data-a="frmod" data-id="${esc(r.user_id)}">${I.flag}${esc(t("repOrBlock"))}</button></div>` : ""}
    </main>`;
}
// ---------- dine egne merker: hvilke vises på profilen ----------
function bdgShown(){
  if(S.badgesPublic === false) return [];
  const have = S.badges || {}, hide = S.badgeHide || {};
  return bdgAll().filter(b => have[b[0]] && !hide[b[0]]).sort((a, b) => have[b[0]] - have[a[0]]).map(b => b[0]).slice(0, 60);
}
function bdgVisHTML(){
  const on = S.badgesPublic !== false;
  return `<div class="fr-card fr-pub bdg-pub"><span class="fr-pub-t"><b>${esc(t("bdgPub"))}</b><small>${esc(t(on ? "bdgPubOn" : "bdgPubOff"))}</small>
      ${AUTH ? `<button class="exlink" data-a="psme">${I.eye}${esc(t("psSeeMine"))}</button>` : ""}</span>
    <button class="tog ${on ? "on" : ""}" data-a="bdgpub" role="switch" aria-checked="${on}" aria-label="${esc(t("bdgPub"))}"></button></div>`;
}
function psClick(a, b){
  if(a === "bdgeggsee"){ overlay = null; screen = "badges"; render(); window.scrollTo(0, 0); return true; }
  if(a === "bdgpub"){ S.badgesPublic = S.badgesPublic === false; save(); frPushSoon(); render(); toast(t(S.badgesPublic ? "bdgPubToastOn" : "bdgPubToastOff")); return true; }
  if(a === "bdgeye"){ const id = b.dataset.id; S.badgeHide ||= {}; if(S.badgeHide[id]) delete S.badgeHide[id]; else S.badgeHide[id] = 1; save(); frPushSoon(); render(); return true; }
  if(!a.startsWith("ps")) return false;
  const r = PS.row || {};
  if(a === "psback") psBack();
  else if(a === "psreload"){ PS.err = null; psLoad(); }
  else if(a === "psme"){ if(AUTH) psOpen(AUTH.uid, screen === "badges" ? "badges" : "profile"); }
  else if(a === "psbadge"){ const bd = BADGES.find(x => x[0] === b.dataset.id); if(bd) toast(T(bd[5], bd[6]) + " – " + (bd[0] === "pioneer" && +r.member_no > 0 ? t("pioneerDesc", r.member_no) : T(bd[7], bd[8]))); }
  else if(a === "psreq") frRequest(r.user_id, r.display_name).then(() => { if(PS.row && PS.row.user_id === r.user_id){ PS.row.status = PS.row.status === "none" || !PS.row.status ? "sent" : PS.row.status; psLoad(); } });
  else if(a === "psacc" || a === "psdec") frRpc("answer_friend_request", { fid: r.user_id, accept: a === "psacc" }).then(async () => {
      if(a === "psacc"){ buzz(true); toast(t("frAdded", r.display_name || "")); } FR.reqs = (FR.reqs || []).filter(x => x.user_id !== r.user_id); renderTabbar();
      if(PS.row) PS.row.status = a === "psacc" ? "friend" : "none"; await psLoad(); frLoad(); }, e => toast(frErr(e)));
  else if(a === "psremove"){
    if(PS.confirm !== "remove"){ PS.confirm = "remove"; render(); return true; }
    frRpc("remove_friend", { fid: r.user_id }).then(async () => { toast(t("frRemoved")); PS.confirm = null; Object.assign(PS.row, { status: "none", is_friend: false, friends_since: null }); await psLoad(); frLoad(); }, e => toast(frErr(e)));
  }
  else if(a === "psrole") frRpc("set_group_role", { gid: PS.gid, uid: r.user_id, p_role: b.dataset.r }).then(async () => { toast(t(b.dataset.r === "admin" ? "grMadeAdmin" : "grUnAdmined")); await grLoadGroup(PS.gid); PS.row = Object.assign(PS.row, psLocal(r.user_id) || {}); render(); }, e => toast(grErr(e)));
  else if(a === "pskick"){
    if(PS.confirm !== "kick"){ PS.confirm = "kick"; render(); return true; }
    frRpc("remove_group_member", { gid: PS.gid, uid: r.user_id }).then(() => { toast(t("grKicked")); psBack(); }, e => toast(grErr(e)));
  }
  else return false;
  return true;
}
