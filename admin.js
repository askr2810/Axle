// ============================================================
//  ADMINPANEL for mod- og admin-brukere (#/admin). Databasen: supabase/admin.sql.
//  Faner: Oversikt (tall), Rapporter (behandle), Brukere (søk, nullstill, roller), Kunngjøring (admin) og Logg.
//  Rettighetene sjekkes i databasen; appen skjuler bare knapper man uansett ikke får bruke.
//  Her ligger også kunngjøringsbanneret alle brukere ser på forsiden.
// ============================================================
let ADM = { days: 7, act: {}, tab: "overview", stats: null, reports: null, done: false, users: null, q: "", log: null, notice: undefined, open: null, confirm: null, err: null, busy: false };
const isAdmin = () => isStaff() && S.appRole === "admin";
const ADM_SQL = { feedback: "tilbakemelding.sql", insights: "innsikt.sql", activity: "innsikt.sql" };
const admMissing = e => e && (e.status === 404 || /PGRST202|42883/.test(e.code || ""));
function admErr(e, tab){
  if(admMissing(e)) return T(`Denne delen er ikke slått på ennå. Kjør supabase/${ADM_SQL[tab] || "admin.sql"} i Supabase → SQL Editor.`, `This part is not enabled yet. Run supabase/${ADM_SQL[tab] || "admin.sql"} in Supabase → SQL Editor.`);
  const m = (e && e.msg) || "";
  if(/not_admin/.test(m)) return t("admNotAdmin");
  if(/not_staff/.test(m)) return t("admNotStaff");
  if(/not_self/.test(m)) return t("admNotSelf");
  if(/not_allowed/.test(m)) return t("admNotAllowed");
  if(e && (e.status === 404 || /PGRST202|42883/.test(e.code || ""))) return t("admNoDb");
  return frErr(e);
}
function openAdmin(tab){ if(!isStaff()) return; overlay = null; screen = "admin"; if(tab) ADM.tab = tab; ADM.err = null; render(); window.scrollTo(0, 0); admLoad(); }
async function admLoad(force){
  const tab = ADM.tab; ADM.err = null;
  try{
    if(tab === "overview" && (force || !ADM.stats)){ ADM.stats = await frRpc("admin_stats"); }
    else if(tab === "reports" && (force || !ADM.reports)){ ADM.reports = null; admRender(); ADM.reports = (await frRpc("admin_reports", { p_handled: ADM.done })) || []; }
    else if(tab === "users" && (force || !ADM.users)){ ADM.users = (await frRpc("admin_find_users", { q: ADM.q })) || []; }
    else if(tab === "feedback" && (force || !ADM.fb)){ ADM.fb = null; admRender(); ADM.fb = (await frRpc("admin_feedback", { p_handled: ADM.fbDone })) || []; }
    else if(tab === "log" && (force || !ADM.log)){ ADM.log = (await frRpc("admin_log_list")) || []; }
    else if(tab === "notice" && (force || ADM.notice === undefined)){ ADM.notice = ((await frRpc("get_notice")) || [])[0] || null; }
    else if(tab === "insights" && (force || !ADM.ins || ADM.ins.days !== ADM.days)){ ADM.ins = null; admRender(); ADM.ins = await frRpc("admin_insights", { p_days: ADM.days }); }
  }catch(e){ ADM.err = admErr(e, tab); }
  admRender();
}
function admRender(){ if(screen === "admin" && !overlay) render(); }
const admAgo = d => d ? frAgo(d) : "–";
function admWho(r, sub){ // avatar + navn for en bruker i lister
  return `${frAvatar(r.display_name || r.target_name || "?", 1, r.avatar || r.target_avatar, 40, r.photo || r.target_photo)}<span class="fr-t"><b>${esc(r.display_name || r.target_name || t("admNoProfile"))}${staffTag(r.app_role)}</b><span>${esc(sub || "")}</span></span>`;
}
function renderAdmin(){
  if(!isStaff()){ screen = "profile"; renderProfile(); return; }
  const tabs = [["overview", "admTabOverview"], ["insights", "admTabInsights"], ["feedback", "admTabFeedback"], ["reports", "admTabReports"], ["users", "admTabUsers"]].concat(isAdmin() ? [["notice", "admTabNotice"]] : []).concat([["log", "admTabLog"]]);
  const openN = ADM.stats ? +ADM.stats.reports_open || 0 : 0;
  let body = "";
  if(ADM.err) body = `<p class="fr-hint">${esc(ADM.err)}</p><button class="big ghost" data-a="admreload">${esc(t("frRetry"))}</button>`;
  else if(ADM.tab === "overview") body = admOverviewHTML();
  else if(ADM.tab === "reports") body = admReportsHTML();
  else if(ADM.tab === "users") body = admUsersHTML();
  else if(ADM.tab === "notice") body = admNoticeHTML();
  else if(ADM.tab === "feedback") body = admFeedbackHTML();
  else if(ADM.tab === "insights") body = admInsightsHTML();
  else body = admLogHTML();
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="profile" aria-label="${esc(t("back"))}">${I.left}</button>
      <div class="th-t"><small>${esc(t(S.appRole === "admin" ? "roleAdmin" : "roleMod"))}</small><b>${esc(t("admTitle"))}</b></div><button class="iconbtn" data-a="admreload" aria-label="${esc(t("frRefresh"))}">${I.redo}</button></div></div>
    <main class="wrap adm">
      <div class="adm-hero"><span class="adm-av">${meAvHTML(56)}</span><div><b>${esc(t("admHello", S.name || ""))}</b><span>${esc(t(isAdmin() ? "admHelloAdmin" : "admHelloMod"))}</span></div></div>
      <div class="chips adm-tabs">${tabs.map(([k, l]) => `<button class="${ADM.tab === k ? "on" : ""}" data-a="admtab" data-t="${k}">${esc(t(l))}${k === "reports" && openN ? ` <em class="fr-n">${openN}</em>` : ""}</button>`).join("")}</div>
      ${body}
    </main>`;
}
function admOverviewHTML(){
  const s = ADM.stats; if(!s) return `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  const tile = (v, lab, ic, a) => `<${a ? `button data-a="${a}"` : "div"} class="pf-tile adm-tile">${ic}<b>${esc(String(v ?? 0))}</b><span>${esc(t(lab))}</span></${a ? "button" : "div"}>`;
  return `<div class="pf-grid adm-grid">
      ${tile(s.users, "admUsers", I.users)}${tile(s.new_1d, "admNew1", I.plus)}${tile(s.new_7d, "admNew7", I.plus)}
      ${tile(s.active_1d, "admAct1", I.fire)}${tile(s.active_7d, "admAct7", I.fire)}${tile(s.profiles, "admProfiles", I.person)}
      ${tile(s.friendships, "admFriends", I.users)}${tile(s.groups, "admGroups", I.users)}${tile(s.courses, "admCourses", I.book)}
      ${tile(s.reports_open, "admReportsOpen", I.flag, "admgoreports")}${tile(s.push, "admPush", I.bolt)}${tile(s.staff, "admStaff", I.star16)}
    </div>
    <p class="ps-note">${esc(t("admXpTotal", Number(s.xp_total || 0).toLocaleString(LANG === "en" ? "en" : "nb")))}${+s.courses_hidden ? " · " + esc(t("admHidden", s.courses_hidden)) : ""}</p>`;
}
const REP_KIND = { name: "admKindName", photo: "admKindPhoto", user: "admKindUser", course: "admKindCourse", group: "admKindGroup" };
function admReportsHTML(){
  const sw = `<div class="chips adm-sub"><button class="${ADM.done ? "" : "on"}" data-a="admdone" data-v="0">${esc(t("admOpen"))}</button><button class="${ADM.done ? "on" : ""}" data-a="admdone" data-v="1">${esc(t("admDone"))}</button></div>`;
  if(ADM.reports === null) return sw + `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  if(!ADM.reports.length) return sw + `<p class="fr-hint adm-empty">${esc(t(ADM.done ? "admNoneDone" : "admNoneOpen"))}</p>`;
  const act = (r, k, lab, bad) => `<button class="fr-act ${bad ? "adm-bad" : ""}" data-a="admres" data-id="${r.id}" data-k="${k}">${esc(ADM.confirm === r.id + k ? t("admSure") : t(lab))}</button>`;
  return sw + ADM.reports.map(r => {
    const acts = ADM.done ? "" : [
      r.target_user && (r.kind === "name" || r.kind === "user") ? act(r, "reset_name", "admResetName", 1) : "",
      r.target_user && (r.kind === "photo" || r.kind === "user") ? act(r, "remove_photo", "admRemovePhoto", 1) : "",
      r.kind === "course" ? act(r, "hide_course", "admHideCourse", 1) : "",
      r.kind === "group" ? act(r, "reset_group", "admResetGroup", 1) : "",
      r.kind === "group" && isAdmin() ? act(r, "delete_group", "admDeleteGroup", 1) : "",
      act(r, "dismiss", "admDismiss")].join("");
    const who = r.target_user ? `<button class="fr-who" data-a="admperson" data-id="${esc(r.target_user)}">${admWho(r, r.target_username ? "@" + r.target_username : "")}</button>` : `<span class="fr-t"><b>${esc(r.target_label || "?")}</b></span>`;
    return `<div class="fr-card adm-rep"><div class="adm-rh"><em class="adm-kind k-${esc(r.kind)}">${esc(t(REP_KIND[r.kind] || "admKindUser"))}</em>${+r.open_count > 1 ? `<em class="fr-n">${esc(t("admCount", r.open_count))}</em>` : ""}<small>${esc(admAgo(r.created_at))}</small></div>
      ${r.target_user ? `<div class="fr-hit">${who}</div>` : ""}
      ${r.target_photo ? `<div class="adm-photo">${photoImg(r.target_photo, 96)}</div>` : ""}
      ${r.kind === "course" || r.kind === "group" ? `<p class="adm-label">${esc(r.target_label || t("admGone"))}</p>` : ""}
      <p class="adm-why"><b>${esc(t(r.reason) || r.reason)}</b>${r.note ? ` – «${esc(r.note)}»` : ""}<br><small>${esc(t("admBy", r.reporter_name))}</small></p>
      ${acts ? `<div class="adm-acts">${acts}</div>` : ""}</div>`;
  }).join("");
}
// Hva slags konto er dette? En konto lages allerede når noen ber om kode, så «ingen venneprofil» er ofte bare et avbrutt forsøk.
function admAcctHTML(u){
  if(u.confirmed === undefined) return ""; // eldre admin.sql uten disse feltene
  const lines = !u.confirmed ? [T("Har bare bedt om innloggingskode, men aldri brukt den. Kan være et avbrutt forsøk, en skrivefeil i e-posten eller en bot.", "Only requested a sign-in code but never used it. Could be an abandoned attempt, a typo in the email or a bot.")]
    : [T("E-posten er bekreftet med kode", "Email confirmed with a code") + (u.last_sign_in ? " · " + T("sist innlogget ", "last sign-in ") + admAgo(u.last_sign_in) : ""),
       u.has_progress ? T("Har lagret fremgang i skyen", "Has saved progress to the cloud") : T("Ingen lagret fremgang ennå", "No saved progress yet"),
       !u.display_name ? T("Har ikke laget venneprofil (navn og brukernavn)", "Has not created a friend profile (name and username)") : ""].filter(Boolean);
  return `<ul class="adm-acct ${u.confirmed ? "ok" : "warn"}">${lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
}
function admUsersHTML(){
  const search = `<div class="fr-search">${I.search}<input type="search" id="admq" autocapitalize="none" autocomplete="off" spellcheck="false" placeholder="${esc(t(isAdmin() ? "admSearchPhA" : "admSearchPh"))}" value="${esc(ADM.q)}"></div>`;
  if(ADM.users === null) return search + `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  if(!ADM.users.length) return search + `<p class="fr-hint">${esc(t("frNoHits"))}</p>`;
  return search + `<div class="adm-users">${ADM.users.map(u => {
    const sub = [u.username ? "@" + u.username : "", u.email || "", u.member_no ? t("psMemberNo", u.member_no) : ""].filter(Boolean).join(" · ");
    const open = ADM.open === u.user_id, me = AUTH && u.user_id === AUTH.uid;
    const btn = (k, lab, bad) => `<button class="fr-act ${bad ? "adm-bad" : ""}" data-a="admuser" data-id="${esc(u.user_id)}" data-k="${k}">${esc(ADM.confirm === u.user_id + k ? t("admSure") : t(lab))}</button>`;
    return `<div class="fr-card adm-user ${open ? "open" : ""}"><button class="fr-who" data-a="admopen" data-id="${esc(u.user_id)}">${admWho(u, sub)}${+u.reports ? `<em class="fr-n adm-rn">${u.reports} ⚑</em>` : ""}</button>
      ${open ? `<p class="adm-meta">${esc(t("admJoined", fmtDate(u.created_at)))} · ${esc(t("admLast", admAgo(u.last_active)))} · ${esc(String(u.xp || 0))} XP</p>${admAcctHTML(u)}${admActHTML(u.user_id)}
        <div class="adm-acts">${u.display_name ? `<button class="fr-act" data-a="admperson" data-id="${esc(u.user_id)}">${esc(t("admSeeProfile"))}</button>` : ""}
          ${!me && (u.app_role !== "admin" || isAdmin()) ? btn("reset_name", "admResetName", 1) + (u.photo ? btn("remove_photo", "admRemovePhoto", 1) : "") : ""}
          ${isAdmin() && !me && u.app_role !== "admin" ? (u.app_role === "mod" ? btn("remove_role", "admRemoveMod", 1) : btn("set_mod", "admMakeMod")) : ""}</div>` : ""}</div>`;
  }).join("")}</div>`;
}
function admNoticeHTML(){
  const n = ADM.notice;
  return `<div class="fr-card adm-notice"><h3>${esc(t("admNoticeTitle"))}</h3><p class="ps-note">${esc(t("admNoticeText"))}</p>
    ${n === undefined ? `<p class="fr-hint">${esc(t("frLoading"))}</p>` : n ? `<div class="ntc-banner static">📣 <span>${esc(n.text_nb)}</span></div><small class="ps-note">${esc(t("admNoticeSince", fmtDate(n.created_at)))}</small>` : `<p class="fr-hint">${esc(t("admNoticeNone"))}</p>`}
    <label class="adm-lab">${esc(t("admNoticeNb"))}<textarea id="admnb" maxlength="280" rows="3">${esc(n ? n.text_nb : "")}</textarea></label>
    <label class="adm-lab">${esc(t("admNoticeEn"))}<textarea id="admen" maxlength="280" rows="3">${esc(n ? n.text_en || "" : "")}</textarea></label>
    <button class="big" data-a="admnotice" ${ADM.busy ? "disabled" : ""}>📣 ${esc(t("admNoticeSend"))}</button>
    ${n ? `<button class="big ghost adm-bad" data-a="admnoticeoff">${esc(t("admNoticeOff"))}</button>` : ""}</div>`;
}
const ADM_ACT = { reset_name: "admResetName", remove_photo: "admRemovePhoto", hide_course: "admHideCourse", reset_group: "admResetGroup", delete_group: "admDeleteGroup", dismiss: "admDismiss", set_mod: "admMakeMod", remove_role: "admRemoveMod", notice: "admNoticeSend", notice_off: "admNoticeOff" };
function admLogHTML(){
  if(ADM.log === null) return `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  if(!ADM.log.length) return `<p class="fr-hint">${esc(t("admLogNone"))}</p>`;
  return `<ul class="adm-log">${ADM.log.map(l => `<li><small>${esc(admAgo(l.created_at))}</small><b>${esc(l.actor_name)}</b> · ${esc(t(ADM_ACT[l.action] || "") || l.action)}${l.target_name ? ` → ${esc(l.target_name)}` : ""}${l.detail ? `<span>${esc(l.detail.replace(/^(\w+): (rep\w+)$/, (m, k, r) => t(REP_KIND[k] || "admKindUser") + ": " + t(r)))}</span>` : ""}</li>`).join("")}</ul>`;
}
// ---------- handlinger ----------
let admQTimer = null;
document.addEventListener("input", e => { if(e.target && e.target.id === "admq"){ ADM.q = e.target.value.trim(); clearTimeout(admQTimer); admQTimer = setTimeout(async () => {
  try{ ADM.users = (await frRpc("admin_find_users", { q: ADM.q })) || []; }catch(err){ ADM.err = admErr(err); }
  if(screen === "admin" && ADM.tab === "users"){ const el = document.getElementById("admq"), pos = el ? el.selectionStart : null; render(); const n = document.getElementById("admq"); if(n){ n.focus(); if(pos != null) n.setSelectionRange(pos, pos); } } }, 300); } });
function admConfirm(key){ if(ADM.confirm === key) return true; ADM.confirm = key; render(); setTimeout(() => { if(ADM.confirm === key){ ADM.confirm = null; admRender(); } }, 4000); return false; }
function adminClick(a, b){
  if(!a.startsWith("adm") && a !== "ntcclose" && a !== "admin") return false;
  if(a === "admin") openAdmin();
  else if(a === "ntcclose"){ if(NOTICE){ S.noticeSeen = NOTICE.id; save(); } render(); }
  else if(a === "admtab"){ ADM.tab = b.dataset.t; ADM.confirm = null; ADM.open = null; render(); admLoad(); }
  else if(a === "admreload"){ ADM.stats = null; admLoad(true); }
  else if(a === "admfbdone"){ ADM.fbDone = b.dataset.v === "1"; ADM.fb = null; render(); admLoad(true); }
  else if(a === "admfbmark"){ const id = +b.dataset.id; frRpc("admin_feedback_mark", { p_id: id, p_handled: !ADM.fbDone }).then(() => { ADM.fb = (ADM.fb || []).filter(x => x.id !== id); toast(t("admOk")); admRender(); }, e => toast(admErr(e))); }
  else if(a === "admfbcopy"){ const txt = admFeedbackText(ADM.fb || []); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(t("admFbCopied")), () => { overlay = { fbtext: txt }; renderOverlay(); }); }
  else if(a === "admgoreports"){ ADM.tab = "reports"; ADM.done = false; render(); admLoad(true); }
  else if(a === "admdone"){ ADM.done = b.dataset.v === "1"; ADM.reports = null; render(); admLoad(true); }
  else if(a === "admopen"){ ADM.open = ADM.open === b.dataset.id ? null : b.dataset.id; ADM.confirm = null; render(); if(ADM.open) admActLoad(ADM.open); }
  else if(a === "admdays"){ ADM.days = +b.dataset.v; render(); admLoad(true); }
  else if(a === "admevmore"){ ADM.evAll = !ADM.evAll; render(); }
  else if(a === "admcopyins"){ const txt = admInsightsText(ADM.ins); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(t("admFbCopied")), () => { overlay = { fbtext: txt }; renderOverlay(); }); }
  else if(a === "admperson") psOpen(b.dataset.id, "admin");
  else if(a === "admres"){
    const id = +b.dataset.id, k = b.dataset.k; if(!admConfirm(id + k)) return true;
    ADM.confirm = null; frRpc("admin_resolve", { p_report: id, p_action: k }).then(() => { toast(t("admOk")); ADM.stats = null; admLoad(true); frRpc("admin_stats").then(s => { ADM.stats = s; admRender(); }, () => {}); }, e => toast(admErr(e)));
  }
  else if(a === "admuser"){
    const id = b.dataset.id, k = b.dataset.k; if(!admConfirm(id + k)) return true;
    ADM.confirm = null; frRpc("admin_user_action", { uid: id, p_action: k }).then(() => { toast(t("admOk")); admLoad(true); }, e => toast(admErr(e)));
  }
  else if(a === "admnotice" || a === "admnoticeoff"){
    const nb = a === "admnoticeoff" ? "" : ((document.getElementById("admnb") || {}).value || "").trim(), en = a === "admnoticeoff" ? "" : ((document.getElementById("admen") || {}).value || "").trim();
    if(a === "admnotice" && !nb){ toast(t("admNoticeEmpty")); return true; }
    ADM.busy = true; render();
    frRpc("admin_set_notice", { p_nb: nb, p_en: en }).then(() => { ADM.busy = false; toast(t(nb ? "admNoticeSent" : "admNoticeRemoved")); ADM.notice = undefined; NOTICE = undefined; noticeFetch(); admLoad(true); }, e => { ADM.busy = false; render(); toast(admErr(e)); });
  }
  else return false;
  return true;
}
// ---------- tilbakemeldinger (tilbakemelding.sql) ----------
function admFeedbackHTML(){
  const sw = `<div class="chips adm-sw"><button class="${!ADM.fbDone ? "on" : ""}" data-a="admfbdone" data-v="0">${esc(t("admOpen"))}</button><button class="${ADM.fbDone ? "on" : ""}" data-a="admfbdone" data-v="1">${esc(t("admDone"))}</button>
    ${ADM.fb && ADM.fb.length ? `<button class="adm-copy" data-a="admfbcopy">📋 ${esc(t("admFbCopy"))}</button>` : ""}</div><p class="fr-hint">${esc(t("admFbHint"))}</p>`;
  if(ADM.fb === null || ADM.fb === undefined) return sw + `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  if(!ADM.fb.length) return sw + `<p class="fr-hint adm-empty">${esc(t("admFbNone"))}</p>`;
  return sw + ADM.fb.map(f => `<div class="fr-card adm-fb"><div class="adm-fb-h"><b>${esc(f.category || f.kind)}</b><span>${esc(admAgo(f.created_at))}${f.course ? " · " + esc(f.course) + (f.qid ? " " + esc(f.qid) : "") : ""}${f.platform ? " · " + esc(f.platform) : ""}</span></div>
      ${f.message ? `<p class="adm-fb-m">${esc(f.message)}</p>` : ""}
      ${f.prompt ? `<details><summary>${esc(t("admFbQ"))}</summary><p><b>${esc(t("admFbPrompt"))}</b> ${esc(f.prompt)}</p><p><b>${esc(t("admFbCorrect"))}</b> ${esc(f.correct || "")}</p><p><b>${esc(t("admFbAnswer"))}</b> ${esc(f.user_answer || "")}</p></details>` : ""}
      ${f.email ? `<p class="adm-fb-e">✉ ${esc(f.email)}</p>` : ""}${f.note ? `<p class="adm-fb-e">📝 ${esc(f.note)}</p>` : ""}
      <button class="exlink" data-a="admfbmark" data-id="${f.id}">${esc(t(ADM.fbDone ? "admFbReopen" : "admFbMark"))}</button></div>`).join("");
}
// Teksten som kan limes rett inn til Claude: én blokk per tilbakemelding, uten e-post.
function admFeedbackText(list){
  return `Tilbakemeldinger fra Axle (${list.length}). Vurder hva som bør endres, og fiks det som er feil:\n\n` + list.map(f => [`#${f.id} · ${f.category || f.kind} · ${String(f.created_at || "").slice(0, 10)}${f.platform ? " · " + f.platform : ""}`,
    f.message ? "Melding: " + f.message : "", f.course ? `Fag: ${f.course}${f.unit ? " enhet " + f.unit : ""}${f.qid ? " oppgave " + f.qid : ""}` : "", f.prompt ? "Oppgave: " + f.prompt : "",
    f.correct ? "Fasit: " + f.correct : "", f.user_answer ? "Svar fra bruker: " + f.user_answer : ""].filter(Boolean).join("\n")).join("\n\n");
}
// ---------- kunngjøring for alle (banner på forsiden) ----------
let NOTICE; // undefined = ikke hentet, null = ingen
async function noticeFetch(){
  if(!CLOUD_ON || NOTICE !== undefined) return;
  NOTICE = null;
  try{ const tok = AUTH ? await authToken() : null; NOTICE = ((await sbFetch("/rest/v1/rpc/get_notice", { method: "POST", body: "{}" }, tok || undefined)) || [])[0] || null; }catch(e){ NOTICE = null; }
  if(NOTICE && screen === "home" && !overlay) render();
}
function noticeHTML(){
  const n = NOTICE; if(!n || +S.noticeSeen === +n.id) return "";
  const txt = LANG === "en" && n.text_en ? n.text_en : n.text_nb;
  return `<div class="ntc-banner" role="status">📣 <span>${esc(txt)}</span><button class="ntc-x" data-a="ntcclose" aria-label="${esc(t("admClose"))}">${I.x}</button></div>`;
}
// ---------- innsikt (innsikt.sql): hva folk bruker og øver på ----------
const ADM_SCREEN = { home: ["Forsiden", "Home"], lesson: ["Øving", "Practice"], done: ["Ferdig økt", "Lesson done"], fail: ["Mislykket økt", "Lesson failed"], theory: ["Teori (hele)", "Theory (full)"],
  guided: ["Teori steg for steg", "Theory step by step"], book: ["Teori-fanen", "Theory tab"], practice: ["Øv-fanen", "Practice tab"], friends: ["Venner", "Friends"], profile: ["Profil", "Profile"],
  settings: ["Innstillinger", "Settings"], pick: ["Velg fag", "Pick course"], drive: ["Førerkort", "Driving"], exam: ["Prøveeksamen", "Mock exam"], admin: ["Admin", "Admin"] };
const admScreen = s => ADM_SCREEN[s] ? T(...ADM_SCREEN[s]) : s;
const admCourse = code => { const c = typeof COURSE === "function" && COURSES.find(x => x.code === code); return c ? courseName(c) : code || "?"; };
const admUnit = key => { const [code, u] = String(key || "").split(":"); const c = COURSES.find(x => x.code === code); return c && u != null && c.units[+u] ? `${courseName(c)} · ${unitTitle(c, +u)}` : key; };
const admPct = v => v == null ? "–" : v + " %";
function admBars(rows, lab, val, sub, fmt = v => v){
  if(!rows || !rows.length) return `<p class="fr-hint">${esc(T("Ingen data ennå.", "No data yet."))}</p>`;
  const max = Math.max(...rows.map(val), 1);
  return `<div class="adm-bars">${rows.map(r => `<div class="adm-bar"><span class="adm-bl">${esc(lab(r))}</span><span class="adm-bt"><i style="width:${Math.max(2, Math.round(100 * val(r) / max))}%"></i></span><b>${esc(String(fmt(val(r))))}</b>${sub ? `<small>${esc(sub(r))}</small>` : ""}</div>`).join("")}</div>`;
}
function admInsightsHTML(){
  const sw = `<div class="chips adm-sub">${[1, 7, 30, 90].map(d => `<button class="${ADM.days === d ? "on" : ""}" data-a="admdays" data-v="${d}">${d === 1 ? T("I dag", "Today") : T(`${d} dager`, `${d} days`)}</button>`).join("")}
    ${ADM.ins ? `<button class="adm-copy" data-a="admcopyins">📋 ${esc(T("Kopier for Claude", "Copy for Claude"))}</button>` : ""}</div>`;
  const s = ADM.ins; if(!s) return sw + `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  const tile = (v, lab) => `<div class="pf-tile adm-tile"><b>${esc(String(v ?? 0))}</b><span>${esc(lab)}</span></div>`;
  const ret = s.returning || {}, daily = s.daily || [];
  const dmax = Math.max(1, ...daily.map(d => d.devices));
  const sec = (h, body) => `<div class="fr-card adm-ins"><h3>${esc(h)}</h3>${body}</div>`;
  return sw + `<div class="pf-grid adm-grid">${tile(s.devices, T("Enheter i bruk", "Devices active"))}${tile(s.users, T("Innloggede brukere", "Logged-in users"))}${tile(s.signups, T("Nye kontoer", "New accounts"))}
      ${tile(ret.new ? `${ret.came_back}/${ret.new}` : "–", T("Nye som kom tilbake", "New who returned"))}${tile(s.push_users, T("Har varsler på", "Have notifications on"))}${tile(s.feedback_open, T("Åpne tilbakemeldinger", "Open feedback"))}</div>
    ${daily.length > 1 ? sec(T("Aktive enheter per dag", "Active devices per day"), `<div class="adm-days">${daily.map(d => `<span title="${esc(d.day)}: ${d.devices} / ${d.users} / ${d.lessons}"><i style="height:${Math.max(4, Math.round(100 * d.devices / dmax))}%"></i><small>${esc(d.day.slice(8))}</small></span>`).join("")}</div><p class="ps-note">${esc(T("Søyle = enheter. Hold over for innloggede og antall økter.", "Bar = devices. Hover for logged-in users and sessions."))}</p>`) : ""}
    ${sec(T("Fag det øves mest på", "Most practised courses"), admBars(s.courses, r => admCourse(r.course), r => r.sessions, r => `${r.devices} ${T("enh.", "dev.")} · ${admPct(r.accuracy)}`))}
    ${sec(T("Vanskeligste enheter (lavest andel riktig)", "Hardest units (lowest accuracy)"), admBars(s.hard_units, r => admUnit(r.course + ":" + r.unit), r => r.accuracy || 0, r => `${r.sessions} ${T("økter", "sessions")}`, v => v + " %"))}
    ${sec(T("Mest leste teori", "Most read theory"), admBars(s.theory, r => admUnit(r.course), r => r.opens, r => `${r.devices} ${T("enh.", "dev.")}`))}
    ${sec(T("Sider", "Screens"), admBars(s.screens, r => admScreen(r.screen), r => r.views, r => `${r.devices} ${T("enh.", "dev.")}`))}
    ${sec(T("Funksjoner", "Features"), admBars(s.features, r => r.feature, r => r.n, r => `${r.devices} ${T("enh.", "dev.")}`))}
    ${sec(T("Plattform og språk", "Platform and language"), `<p class="ps-note">${esc(Object.entries(s.platforms || {}).map(([k, v]) => `${k}: ${v}`).join(" · "))}<br>${esc(Object.entries(s.langs || {}).map(([k, v]) => `${k}: ${v}`).join(" · "))}</p>`)}`;
}
// Teksten som limes inn til Claude: tallene og det som skiller seg ut.
function admInsightsText(s){
  if(!s) return "";
  const L = (h, rows, f) => rows && rows.length ? `\n${h}:\n` + rows.map(r => "- " + f(r)).join("\n") : "";
  return `Innsikt fra Axle, siste ${s.days} dager. Se etter hva som bør forbedres (vanskelige enheter, lite brukte funksjoner, frafall):\n` +
    `Enheter: ${s.devices}, innloggede: ${s.users}, nye kontoer: ${s.signups}, nye som kom tilbake: ${(s.returning || {}).came_back}/${(s.returning || {}).new}, varsler på: ${s.push_users}, åpne tilbakemeldinger: ${s.feedback_open}` +
    L("Per dag (enheter/innloggede/økter)", s.daily, r => `${r.day}: ${r.devices}/${r.users}/${r.lessons}`) +
    L("Fag (økter, enheter, oppgaver, riktig)", s.courses, r => `${r.course} ${admCourse(r.course)}: ${r.sessions}, ${r.devices}, ${r.questions}, ${admPct(r.accuracy)}`) +
    L("Vanskeligste enheter", s.hard_units, r => `${r.course}:${r.unit} ${admUnit(r.course + ":" + r.unit)}: ${admPct(r.accuracy)} (${r.sessions} økter)`) +
    L("Teori lest", s.theory, r => `${r.course} ${admUnit(r.course)}: ${r.opens} (${r.devices} enheter)`) +
    L("Sider", s.screens, r => `${r.screen}: ${r.views} (${r.devices} enheter)`) +
    L("Funksjoner", s.features, r => `${r.feature}: ${r.n} (${r.devices} enheter)`) +
    `\nPlattform: ${JSON.stringify(s.platforms || {})} · Språk: ${JSON.stringify(s.langs || {})}`;
}
// ---------- én bruker: aktivitet, varsler og innstillinger ----------
async function admActLoad(uid){
  if(ADM.act[uid] && ADM.act[uid] !== "err") return;
  ADM.act[uid] = null;
  try{ ADM.act[uid] = await frRpc("admin_user_activity", { uid }); }catch(e){ ADM.act[uid] = { err: admErr(e, "activity") }; }
  admRender();
}
const ADM_EV = { screen: ["åpnet", "opened"], lesson: ["øvde", "practised"], theory: ["leste teori", "read theory"], tts: ["fikk teksten lest opp", "used read-aloud"], push: ["slo på varsler", "turned on notifications"] };
function admEvText(e){
  const verb = ADM_EV[e.ev] ? T(...ADM_EV[e.ev]) : e.ev;
  if(e.ev === "screen") return `${verb} ${admScreen(e.a)}${e.b ? " (" + e.b + ")" : ""}`;
  if(e.ev === "lesson") return `${verb} ${/^\d+$/.test(e.b || "") ? admUnit(e.a + ":" + e.b) : admCourse(e.a) + " · " + e.b}: ${e.n}/${e.m} ${T("riktig", "correct")}`;
  if(e.ev === "theory") return `${verb}: ${admUnit(e.a)} (${{ full: T("hele", "full"), guided: T("steg for steg", "step by step"), book: T("Teori-fanen", "Theory tab") }[e.b] || e.b})`;
  if(e.ev === "push") return `${verb} ${e.b ? T("kl. ", "at ") + e.b : ""}`;
  return [verb, e.a, e.b].filter(Boolean).join(" ");
}
function admActHTML(uid){
  const d = ADM.act[uid];
  if(d === undefined || d === null) return `<p class="fr-hint">${esc(t("frLoading"))}</p>`;
  if(d.err) return `<p class="fr-hint">${esc(d.err)}</p>`;
  const st = d.state, push = d.push || [], ev = d.events || [];
  const rows = [];
  rows.push(push.length ? `🔔 ${T("Varsler på", "Notifications on")}: ${push.map(p => `${p.kind}, ${T("kl.", "at")} ${p.at} (${p.tz})${p.last ? ", " + T("sist sendt ", "last sent ") + p.last : ""}`).join("; ")}` : `🔕 ${T("Ingen nettvarsler på", "No web notifications on")}${st && st.reminder && st.reminder.on ? ` · ${T("påminnelse i appen kl.", "in-app reminder at")} ${st.reminder.time}` : ""}`);
  if(st){
    const studies = [].concat(st.studies || st.study || []).filter(Boolean).map(id => { const x = STUDIES.find(s => s.id === id); return x ? T(x.nb, x.en) : id; }).join(", ");
    rows.push(`⚡ ${st.xp || 0} XP · 🔥 ${(st.streak && st.streak.count) || 0} ${T("dager på rad", "day streak")} · ${T("mål", "goal")} ${st.goal || 10} · ${st.days || 0} ${T("dager med øving", "days practised")}`);
    rows.push(`📚 ${T("Studie", "Study")}: ${studies || "–"} · ${T("nå", "now")}: ${admCourse(st.current)} · ${T("språk", "language")}: ${st.lang || "?"} · ${T("tema", "theme")}: ${st.theme || "auto"}`);
    rows.push(`📖 ${st.theory_seen || 0} ${T("teorisider lest", "theory pages read")} · 🏅 ${st.badges || 0} ${T("merker", "badges")}${st.stats_off ? " · " + T("har slått av statistikk", "has turned off statistics") : ""}`);
    const cs = Object.entries(st.courses || {}).filter(([, v]) => v.done || v.wrong).sort((a, b) => b[1].done - a[1].done).slice(0, 8);
    if(cs.length) rows.push(`🎯 ${cs.map(([k, v]) => `${admCourse(k)}: ${v.done} ${T("nivåer", "levels")}${v.wrong ? `, ${v.wrong} ${T("feil å repetere", "to review")}` : ""}`).join(" · ")}`);
  } else rows.push(T("Ingen fremgang lagret i skyen.", "No progress saved to the cloud."));
  const sum = (d.summary || []).slice(0, 6).map(r => `${admCourse(r.course)}: ${r.sessions} ${T("økter", "sessions")}, ${admPct(r.accuracy)}`).join(" · ");
  const list = ADM.evAll ? ev : ev.slice(0, 25);
  return `<div class="adm-act"><ul>${rows.map(r => `<li>${esc(r)}</li>`).join("")}${sum ? `<li>📈 ${esc(sum)}</li>` : ""}</ul>
    ${ev.length ? `<div class="adm-evh">${esc(T("Siste aktivitet", "Recent activity"))}</div><ol class="adm-ev">${list.map(e => `<li><small>${esc(fmtDate(e.at))} ${esc(new Date(e.at).toTimeString().slice(0, 5))}</small>${esc(admEvText(e))}</li>`).join("")}</ol>
      ${ev.length > 25 ? `<button class="exlink" data-a="admevmore">${esc(ADM.evAll ? T("Vis færre", "Show fewer") : T(`Vis alle ${ev.length}`, `Show all ${ev.length}`))}</button>` : ""}`
      : `<p class="ps-note">${esc(T("Ingen registrert aktivitet ennå (statistikken starter når innsikt.sql er kjørt).", "No recorded activity yet (statistics start once innsikt.sql has been run)."))}</p>`}</div>`;
}
