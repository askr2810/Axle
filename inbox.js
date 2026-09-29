// ============================================================
//  MELDINGER – venner kan skrive til hverandre, lage grupper og sende sider fra appen (supabase/meldinger.sql).
//  • Venner → Meldinger: samtaler (venner og grupper) med siste melding og uleste. «＋ Ny gruppe» lager en gruppesamtale.
//  • Del-arket (share.js): trykk på personer/grupper for å velge dem (som på Instagram), skriv en hilsen og send,
//    hver for seg, eller lag en ny gruppe av de valgte og send dit.
//  • Delte sider vises som kort i samtalen og åpnes rett i appen.
//  • Uleste gir prikk på Venner-fanen; sjekkes ved oppstart, hvert minutt og oftere i en åpen samtale.
//  Samtale-nøkkel: venn = bruker-id, gruppe = "g-" + gruppe-id.
// ============================================================
let IB = { convs: null, with: null, msgs: null, loading: false, err: null, unread: 0, missing: false, busy: false, poll: 0, members: null };
Object.assign(UI.nb, { frView_messages: "Meldinger" });
Object.assign(UI.en, { frView_messages: "Messages" });
const ibIsMissing = e => !!e && (e.code === "PGRST202" || e.code === "42883" || (e.status === 404 && /rpc/.test(String(e.message || "rpc"))));
const ibIsG = k => typeof k === "string" && k.startsWith("g-");
const ibKey = c => c.kind === "group" ? "g-" + c.group_id : c.user_id;
function ibErr(e){
  if(ibIsMissing(e)) return T("Meldinger og grupper er ikke satt opp på serveren ennå (kjør supabase/meldinger.sql).", "Messages and groups are not set up on the server yet (run supabase/meldinger.sql).");
  const m = String((e && (e.msg || e.message)) || "");
  if(/not_friends/.test(m)) return T("Dere må være venner for å sende meldinger.", "You need to be friends to send messages.");
  if(/not_member/.test(m)) return T("Du er ikke med i denne gruppen.", "You are not in this group.");
  if(/blocked/.test(m)) return T("Du kan ikke sende meldinger til denne personen.", "You can't message this person.");
  if(/unclean/.test(m)) return T("Teksten inneholder ord som ikke er lov.", "The text contains words that aren't allowed.");
  if(/empty/.test(m)) return T("Meldingen er tom.", "The message is empty.");
  if(/too_many_members/.test(m)) return T("En gruppe kan ha opptil 32 personer.", "A group can have up to 32 people.");
  if(/too_many/.test(m)) return T("Du har sendt veldig mange meldinger. Vent litt.", "You've sent a lot of messages. Wait a bit.");
  return typeof frErr === "function" ? frErr(e) : T("Noe gikk galt.", "Something went wrong.");
}
async function ibUnread(){
  if(!CLOUD_ON || !AUTH || IB.missing || EMBED) return;
  try{ const n = +(await frRpc("unread_messages")) || 0; if(n !== IB.unread){ IB.unread = n; renderTabbar(); if(screen === "friends" && FR.view !== "messages" && !overlay) render(); } }
  catch(e){ if(ibIsMissing(e)) IB.missing = true; }
}
setInterval(() => { if(document.visibilityState === "visible") ibUnread(); }, 60000);
setTimeout(ibUnread, 4000);
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible") ibUnread(); });
async function ibLoadConvs(){
  if(IB.loading) return; IB.loading = true; IB.err = null;
  try{ IB.convs = ((await frRpc("get_conversations")) || []).map(c => Object.assign({ kind: "dm" }, c)); IB.unread = IB.convs.reduce((s, c) => s + (+c.unread || 0), 0); renderTabbar(); }
  catch(e){ IB.err = ibErr(e); if(ibIsMissing(e)) IB.missing = true; IB.convs = IB.convs || []; }
  IB.loading = false;
  if(screen === "friends" && FR.view === "messages" && !IB.with && !overlay) render();
  if(overlay && (overlay.share || overlay.newchat)) renderOverlay();
}
async function ibLoadMsgs(quiet){
  const w = IB.with; if(!w) return;
  try{
    const rows = ((ibIsG(w) ? await frRpc("get_group_messages", { p_group: w.slice(2) }) : await frRpc("get_messages", { p_with: w })) || []).slice().reverse();
    if(IB.with !== w) return;
    const same = IB.msgs && IB.msgs.length === rows.length && (IB.msgs[IB.msgs.length - 1] || {}).id === (rows[rows.length - 1] || {}).id;
    IB.msgs = rows; IB.err = null;
    const c = (IB.convs || []).find(x => ibKey(x) === w); if(c && c.unread){ IB.unread = Math.max(0, IB.unread - c.unread); c.unread = 0; renderTabbar(); }
    if(!same || !quiet) ibPaintMsgs(!same);
  }catch(e){ if(!quiet){ IB.err = ibErr(e); IB.msgs = IB.msgs || []; ibPaintMsgs(true); } }
}
function ibPoll(){
  clearInterval(IB.poll);
  IB.poll = setInterval(() => {
    if(screen !== "friends" || FR.view !== "messages" || document.visibilityState !== "visible"){ clearInterval(IB.poll); IB.poll = 0; return; }
    if(IB.with) ibLoadMsgs(true); else ibLoadConvs();
  }, 5000);
}
// Hvem/hva samtalen er med: en venn (navn og bilde fra vennelista) eller en gruppe.
function ibWho(k){
  if(ibIsG(k)){ const c = (IB.convs || []).find(x => ibKey(x) === k); return { group: true, key: k, display_name: c ? c.display_name : T("Gruppe", "Group"), members: c ? c.members : 0 }; }
  const f = (FR.rows || []).find(r => r.user_id === k) || (IB.convs || []).find(r => r.user_id === k);
  return f || { user_id: k, display_name: "?", avatar: null, photo: null };
}
const ibGroupAv = (name, size) => `<span class="ib-gav" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.42)}px" aria-hidden="true">👥</span>`;
const ibAv = (w, i, size) => w.group ? ibGroupAv(w.display_name, size) : frAvatar(w.display_name, i, w.avatar, size, w.photo);
const ibTime = iso => { const d = new Date(iso), now = new Date(); return d.toDateString() === now.toDateString() ? d.toLocaleTimeString(LANG === "en" ? "en-GB" : "nb-NO", { hour: "2-digit", minute: "2-digit" }) : frAgo(iso); };
// Lenker fra meldinger åpnes bare som adresser inne i appen.
const ibSafeLink = l => typeof l === "string" && /^#\/[A-Za-z0-9_./%:-]{1,200}$/.test(l) ? l : null;
function ibListHTML(){
  if(!IB.convs){ if(!IB.loading) setTimeout(ibLoadConvs, 0); return `<p class="fr-wait">${esc(t("frLoading"))}</p>`; }
  const friends = (FR.rows || []).filter(r => !r.is_me), has = new Set(IB.convs.map(c => c.user_id)), fresh = friends.filter(f => !has.has(f.user_id));
  const conv = (c, i) => { const g = c.kind === "group", who = c.last_from_me ? T("Du: ", "You: ") : g && c.last_sender ? c.last_sender + ": " : "";
    const prev = c.last_link_title || c.last_body ? esc(who) + (c.last_link_title ? "🔗 " + esc(c.last_link_title) + (c.last_body ? " · " : "") : "") + esc(String(c.last_body || "").slice(0, 80)) : esc(T(`${c.members} medlemmer`, `${c.members} members`));
    return `<button class="ib-conv ${c.unread ? "new" : ""}" data-a="ibopen" data-id="${esc(ibKey(c))}">${g ? ibGroupAv(c.display_name, 46) : frAvatar(c.display_name, i, c.avatar, 46, c.photo)}
    <span class="ib-ct"><b>${esc(c.display_name)}</b><small>${prev}</small></span>
    <span class="ib-meta"><small>${esc(ibTime(c.last_at))}</small>${c.unread ? `<i class="ib-n">${c.unread}</i>` : ""}</span></button>`; };
  return `${IB.err ? `<div class="fr-card"><p>${esc(IB.err)}</p></div>` : ""}
    ${friends.length && !IB.missing ? `<button class="ib-newg" data-a="ibnewchat"><span class="ib-gav" aria-hidden="true">＋</span><span><b>${esc(T("Ny gruppe", "New group"))}</b><small>${esc(T("Skriv til flere venner samtidig", "Write to several friends at once"))}</small></span>${I.chevron}</button>` : ""}
    ${IB.convs.length ? `<div class="ib-list">${IB.convs.map(conv).join("")}</div>` : `<div class="fr-card ib-empty"><span class="fr-big">💬</span><p>${esc(T("Ingen meldinger ennå. Skriv til en venn, eller trykk på del-knappen øverst på en side for å sende den.", "No messages yet. Write to a friend, or tap the share button at the top of a page to send it."))}</p></div>`}
    ${fresh.length ? `<h3 class="grp">${esc(T("Skriv til", "Write to"))}</h3><div class="ib-fresh">${fresh.map((f, i) => `<button class="ib-f" data-a="ibopen" data-id="${esc(f.user_id)}">${frAvatar(f.display_name, i, f.avatar, 48, f.photo)}<small>${esc(f.display_name)}</small></button>`).join("")}</div>` : friends.length ? "" : `<p class="fr-hint">${esc(T("Legg til venner under Venner for å kunne sende meldinger.", "Add friends under Friends to be able to send messages."))}</p>`}`;
}
function ibMsgHTML(m, i, all){
  const link = ibSafeLink(m.link), g = ibIsG(IB.with), prev = all[i - 1];
  const name = g && !m.from_me && (!prev || prev.from_id !== m.from_id) ? `<small class="ib-from">${esc(m.from_name || "?")}</small>` : "";
  return `${name}<div class="ib-m ${m.from_me ? "me" : "them"}">${link ? `<button class="ib-card" data-a="iblink" data-l="${esc(link)}"><span class="ib-ci" aria-hidden="true">🔗</span><span><small>${esc(T("Delt side", "Shared page"))}</small><b>${esc(m.link_title || link)}</b></span>${I.chevron}</button>` : ""}
    ${m.body ? `<p>${esc(m.body)}</p>` : ""}<small class="ib-mt">${esc(ibTime(m.created_at))}${m.from_me && m.read_at ? " · " + esc(T("Lest", "Read")) : ""}${m.from_me ? ` <button class="ib-del" data-a="ibdel" data-id="${m.id}" aria-label="${esc(T("Slett meldingen", "Delete the message"))}">${esc(T("Slett", "Delete"))}</button>` : ""}</small></div>`;
}
function ibChatHTML(){
  const w = ibWho(IB.with);
  const who = w.group ? `<button class="ib-who" data-a="ibchatmenu">${ibGroupAv(w.display_name, 36)}<span><b>${esc(w.display_name)}</b>${w.members ? `<small>${esc(T(`${w.members} medlemmer`, `${w.members} members`))}</small>` : ""}</span></button>
      <button class="fr-more" data-a="ibchatmenu" aria-label="${esc(T("Gruppen", "The group"))}">⋯</button>`
    : `<button class="ib-who" data-a="frperson" data-id="${esc(w.user_id)}">${frAvatar(w.display_name, 0, w.avatar, 36, w.photo)}<b>${esc(w.display_name)}</b></button>
      <button class="fr-more" data-a="frmod" data-id="${esc(w.user_id)}" aria-label="${esc(t("repMore"))}">⋯</button>`;
  return `<div class="ib-head"><button class="iconbtn" data-a="ibback" aria-label="${esc(t("back"))}">${I.left}</button>${who}</div>
    <div id="ibmsgs" class="ib-msgs" aria-live="polite">${ibMsgsInner()}</div>
    <div class="ib-compose"><textarea id="ibtext" rows="1" maxlength="500" placeholder="${esc(T("Skriv en melding …", "Write a message …"))}" aria-label="${esc(T("Melding", "Message"))}"></textarea><button class="ib-send" data-a="ibsend" aria-label="${esc(T("Send", "Send"))}" ${IB.busy ? "disabled" : ""}>➤</button></div>`;
}
function ibMsgsInner(){
  if(!IB.msgs) return `<p class="fr-wait">${esc(t("frLoading"))}</p>`;
  return (IB.err ? `<p class="fr-hint">${esc(IB.err)}</p>` : "") + (IB.msgs.length ? IB.msgs.map(ibMsgHTML).join("") : `<p class="fr-hint">${esc(T("Si hei! 👋", "Say hi! 👋"))}</p>`);
}
function ibPaintMsgs(scroll){
  const el = document.getElementById("ibmsgs"); if(!el) return;
  el.innerHTML = ibMsgsInner(); if(scroll) window.scrollTo(0, document.body.scrollHeight);
}
// Innholdet i Venner når fanen «Meldinger» er valgt.
function ibBodyHTML(){
  if(!IB.poll) setTimeout(ibPoll, 0);
  if(IB.with){ if(!IB.msgs) setTimeout(() => ibLoadMsgs(false), 0); if(ibIsG(IB.with) && !IB.convs && !IB.loading) setTimeout(ibLoadConvs, 0); return ibChatHTML(); }
  return ibListHTML();
}
function ibMount(){
  const ta = document.getElementById("ibtext"); if(!ta) return;
  ta.addEventListener("keydown", e => { if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); ibSend(); } });
  ta.addEventListener("input", () => { ta.style.height = "auto"; ta.style.height = Math.min(140, ta.scrollHeight) + "px"; });
  window.scrollTo(0, document.body.scrollHeight);
}
// Send til én samtale (venn eller gruppe).
function ibSendTo(key, body, link, title){
  return ibIsG(key) ? frRpc("send_group_message", { p_group: key.slice(2), p_body: body, p_link: link, p_title: title })
    : frRpc("send_message", { p_to: key, p_body: body, p_link: link, p_title: title });
}
async function ibSend(){
  const ta = document.getElementById("ibtext"), txt = ta ? ta.value.trim() : ""; if(!txt || IB.busy || !IB.with) return;
  IB.busy = true;
  try{ await ibSendTo(IB.with, txt, null, null); if(ta){ ta.value = ""; ta.style.height = "auto"; } sfx("tap"); await ibLoadMsgs(false); IB.convs = null; }
  catch(e){ toast(ibErr(e)); }
  IB.busy = false; if(ta) ta.focus();
}

// ---------- velg mottakere (del-arket og «Ny gruppe») ----------
// o = { sel: { nøkkel: 1 }, sent: {}, note, gname, mk (vis gruppenavn), busy }
function ibTargets(withGroups){
  const convs = IB.convs || [], fr = (FR.rows || []).filter(r => !r.is_me);
  const recent = convs.filter(c => c.kind !== "group").map(c => c.user_id);
  const friends = fr.slice().sort((a, b) => { const ia = recent.indexOf(a.user_id), ib = recent.indexOf(b.user_id); return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib) || a.display_name.localeCompare(b.display_name, "nb"); })
    .map(f => ({ key: f.user_id, name: f.display_name, f }));
  const groups = withGroups ? convs.filter(c => c.kind === "group").map(c => ({ key: ibKey(c), name: c.display_name, g: c })) : [];
  return [...groups.slice(0, 6), ...friends];
}
function ibPickerHTML(o, withGroups){
  const sel = o.sel ||= {}, sent = o.sent || {}, list = ibTargets(withGroups);
  return `<div class="sh-friends">${list.map((x, i) => { const on = !!sel[x.key], done = !!sent[x.key];
    return `<button class="ib-f ${on ? "on" : ""} ${done ? "sent" : ""}" data-a="ibpick" data-id="${esc(x.key)}" aria-pressed="${on}" ${done ? "disabled" : ""}><span class="ib-fav">${x.g ? ibGroupAv(x.name, 52) : frAvatar(x.name, i, x.f.avatar, 52, x.f.photo)}${on ? `<i class="ib-tick" aria-hidden="true">✓</i>` : ""}</span><small>${esc(done ? T("Sendt ✓", "Sent ✓") : x.name)}</small></button>`; }).join("")}</div>`;
}
const ibSelKeys = o => Object.keys(o.sel || {}).filter(k => o.sel[k]);
const ibDefaultName = keys => keys.map(k => (ibWho(k).display_name || "").split(" ")[0]).join(", ").slice(0, 40);
// Del-arket: velg venner og grupper, skriv en hilsen, og send.
function ibFriendsHTML(o){
  if(!CLOUD_ON) return "";
  if(!AUTH) return `<p class="sh-note">${esc(T("Logg inn for å sende siden til venner i Axle.", "Log in to send the page to friends in Axle."))}</p>`;
  if(IB.missing) return "";
  if(FR.rows === null){ if(!FR.loading) frLoad().then(() => { if(overlay && overlay.share) renderOverlay(); }); return `<p class="sh-note">${esc(t("frLoading"))}</p>`; }
  if(IB.convs === null && !IB.loading) setTimeout(ibLoadConvs, 0);
  if(!FR.rows.some(r => !r.is_me)) return `<p class="sh-note">${esc(T("Legg til venner for å sende sider til dem her i appen.", "Add friends to send pages to them here in the app."))}</p>`;
  const keys = ibSelKeys(o), friendsOnly = keys.length >= 2 && keys.every(k => !ibIsG(k));
  let act = "";
  if(keys.length){
    act = `<div class="ib-sendbar"><input class="sh-msg" id="shnote" maxlength="300" placeholder="${esc(T("Skriv en melding …", "Write a message …"))}" value="${esc(o.note || "")}" aria-label="${esc(T("Melding", "Message"))}">
      ${o.mk ? `<label class="ib-gname"><span>${esc(T("Navn på gruppen", "Group name"))}</span><input id="shgname" maxlength="40" value="${esc(o.gname != null ? o.gname : ibDefaultName(keys))}"></label>
        <button class="big" data-a="ibsharego" data-m="group" ${o.busy ? "disabled" : ""}>👥 ${esc(T("Lag gruppe og send", "Create group and send"))}</button><button class="exlink" data-a="ibmk" data-v="0">${esc(T("Avbryt", "Cancel"))}</button>`
      : `<button class="big" data-a="ibsharego" data-m="each" ${o.busy ? "disabled" : ""}>${esc(keys.length === 1 ? T("Send", "Send") : T(`Send hver for seg (${keys.length})`, `Send separately (${keys.length})`))}</button>
        ${friendsOnly ? `<button class="big ghost" data-a="ibmk" data-v="1">👥 ${esc(T("Lag gruppe", "Create group"))}</button>` : ""}`}</div>`;
  }
  return `<h4 class="sh-h">${esc(T("Send i Axle", "Send in Axle"))}${keys.length ? ` <span class="ib-nsel">${esc(T(`${keys.length} valgt`, `${keys.length} selected`))}</span>` : ""}</h4>${ibPickerHTML(o, true)}${act}`;
}
// «Ny gruppe» fra Meldinger: velg venner og et navn.
function ibNewChatHTML(o){
  const keys = ibSelKeys(o);
  return `<div class="dialog sh-sheet" role="dialog" aria-label="${esc(T("Ny gruppe", "New group"))}"><div class="sheet-h"><h3>${esc(T("Ny gruppe", "New group"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    <p class="sh-note">${esc(T("Velg hvem som skal være med.", "Choose who should be in it."))}</p>${ibPickerHTML(o, false)}
    ${keys.length ? `<div class="ib-sendbar"><label class="ib-gname"><span>${esc(T("Navn på gruppen", "Group name"))}</span><input id="shgname" maxlength="40" value="${esc(o.gname != null ? o.gname : ibDefaultName(keys))}"></label>
      <button class="big" data-a="ibnewgo" ${o.busy ? "disabled" : ""}>👥 ${esc(T(`Lag gruppe (${keys.length + 1} personer)`, `Create group (${keys.length + 1} people)`))}</button></div>` : ""}</div>`;
}
// Husk det man skriver i feltene når arket tegnes på nytt.
document.addEventListener("input", e => {
  const o = overlay && (overlay.share || overlay.newchat); if(!o) return;
  if(e.target.id === "shnote") o.note = e.target.value;
  if(e.target.id === "shgname") o.gname = e.target.value;
});
async function ibShareGo(mode){
  const o = overlay && overlay.share; if(!o || o.busy) return;
  const keys = ibSelKeys(o); if(!keys.length) return;
  const link = ibSafeLink("#/" + o.url.split("#/")[1]), title = o.title.slice(0, 120), note = (o.note || "").trim();
  o.busy = true; renderOverlay();
  try{
    if(mode === "group"){
      const name = String(o.gname != null ? o.gname : ibDefaultName(keys)).trim() || ibDefaultName(keys);
      const gid = await frRpc("create_chat", { p_name: name, p_members: keys });
      await ibSendTo("g-" + gid, note, link, title);
      keys.forEach(k => (o.sent ||= {})[k] = 1); toast(T(`Sendt til gruppen «${name}»`, `Sent to the group "${name}"`));
    } else {
      let ok = 0; for(const k of keys){ try{ await ibSendTo(k, note, link, title); (o.sent ||= {})[k] = 1; ok++; }catch(e){ toast(ibErr(e)); if(ibIsMissing(e)) break; } }
      if(ok) toast(ok === 1 ? T(`Sendt til ${ibWho(keys.find(k => o.sent[k])).display_name}`, `Sent to ${ibWho(keys.find(k => o.sent[k])).display_name}`) : T(`Sendt til ${ok}`, `Sent to ${ok}`));
    }
    o.sel = {}; o.mk = false; o.note = ""; o.gname = null; IB.convs = null; buzz(true); sfx("ok", 1);
  }catch(e){ if(ibIsMissing(e)) IB.missing = mode !== "group" && IB.missing; toast(ibErr(e)); }
  o.busy = false; if(overlay && overlay.share === o) renderOverlay();
  if(IB.convs === null) ibLoadConvs();
}
async function ibNewGo(){
  const o = overlay && overlay.newchat; if(!o || o.busy) return;
  const keys = ibSelKeys(o); if(!keys.length) return;
  const name = String(o.gname != null ? o.gname : ibDefaultName(keys)).trim() || ibDefaultName(keys);
  o.busy = true; renderOverlay();
  try{ const gid = await frRpc("create_chat", { p_name: name, p_members: keys }); IB.convs = null; overlay = null; await ibLoadConvs(); ibOpen("g-" + gid); buzz(true); }
  catch(e){ o.busy = false; toast(ibErr(e)); renderOverlay(); }
}
// Gruppemenyen: medlemmer og «Forlat gruppen».
function ibChatMenuHTML(o){
  const w = ibWho(IB.with), ms = o.members;
  return `<div class="dialog sh-sheet" role="dialog" aria-label="${esc(w.display_name)}"><div class="sheet-h"><h3>${esc(w.display_name)}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    <h4 class="sh-h">${esc(T("Medlemmer", "Members"))}</h4>
    ${ms ? `<div class="ib-mems">${ms.map((m, i) => `<div class="ib-mem">${frAvatar(m.display_name, i, m.avatar, 36, m.photo)}<span><b>${esc(m.display_name)}${m.is_me ? " " + esc(T("(deg)", "(you)")) : ""}</b>${m.username ? `<small>@${esc(m.username)}</small>` : ""}</span></div>`).join("")}</div>` : `<p class="sh-note">${esc(t("frLoading"))}</p>`}
    <button class="big ghost ib-leave" data-a="ibleave">${esc(o.confirm ? T("Trykk igjen for å forlate", "Tap again to leave") : T("Forlat gruppen", "Leave the group"))}</button></div>`;
}
async function ibChatMenu(){
  overlay = { chatmenu: { members: null } }; renderOverlay();
  try{ const ms = await frRpc("get_chat_members", { p_group: IB.with.slice(2) }); if(overlay && overlay.chatmenu){ overlay.chatmenu.members = ms || []; renderOverlay(); } }catch(e){ toast(ibErr(e)); }
}
async function ibLeave(){
  const o = overlay && overlay.chatmenu; if(!o) return;
  if(!o.confirm){ o.confirm = true; renderOverlay(); return; }
  try{ await frRpc("leave_chat", { p_group: IB.with.slice(2) }); overlay = null; IB.with = null; IB.msgs = null; IB.convs = null; render(); toast(T("Du har forlatt gruppen", "You left the group")); }
  catch(e){ toast(ibErr(e)); }
}
function ibOpen(id){ IB.with = id; IB.msgs = null; IB.err = null; FR.view = "messages"; screen = "friends"; overlay = null; render(); }
function ibClick(a, b){
  if(!a.startsWith("ib")) return false;
  const d = b && b.dataset;
  if(a === "ibopen"){ ibOpen(d.id); return true; }
  if(a === "ibback"){ IB.with = null; IB.msgs = null; IB.convs = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "ibsend"){ ibSend(); return true; }
  if(a === "ibpick"){ const o = overlay && (overlay.share || overlay.newchat); if(o){ o.sel ||= {}; o.sel[d.id] = !o.sel[d.id]; if(!ibSelKeys(o).length) o.mk = false; o.gname = overlay.newchat ? o.gname : null; sfx("tap"); renderOverlay(); } return true; }
  if(a === "ibmk"){ const o = overlay && overlay.share; if(o){ o.mk = d.v === "1"; renderOverlay(); } return true; }
  if(a === "ibsharego"){ ibShareGo(d.m); return true; }
  if(a === "ibnewchat"){ overlay = { newchat: { sel: {} } }; renderOverlay(); return true; }
  if(a === "ibnewgo"){ ibNewGo(); return true; }
  if(a === "ibchatmenu"){ ibChatMenu(); return true; }
  if(a === "ibleave"){ ibLeave(); return true; }
  if(a === "iblink"){ const l = ibSafeLink(d.l); if(l){ if(location.hash === l){ routeBoot(); render(); } else location.hash = l; } return true; }
  if(a === "ibdel"){ const id = +d.id; frRpc("delete_message", { p_id: id }).then(() => { IB.msgs = (IB.msgs || []).filter(m => m.id !== id); ibPaintMsgs(false); }, e => toast(ibErr(e))); return true; }
  return false;
}
