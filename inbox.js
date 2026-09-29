// ============================================================
//  MELDINGER – venner kan skrive til hverandre og sende sider fra appen (supabase/meldinger.sql).
//  • Venner → Meldinger: samtaler med siste melding og uleste; trykk for å åpne en samtale.
//  • Del-arket (share.js): «Send til en venn» sender lenken til siden man er på, med en valgfri hilsen.
//  • Delte sider vises som kort i samtalen og åpnes rett i appen.
//  • Uleste gir prikk på Venner-fanen; sjekkes ved oppstart, hvert minutt og oftere i en åpen samtale.
// ============================================================
let IB = { convs: null, with: null, msgs: null, loading: false, err: null, unread: 0, missing: false, busy: false, poll: 0 };
Object.assign(UI.nb, { frView_messages: "Meldinger" });
Object.assign(UI.en, { frView_messages: "Messages" });
const ibIsMissing = e => !!e && (e.code === "PGRST202" || e.code === "42883" || (e.status === 404 && /rpc/.test(String(e.message || "rpc"))));
function ibErr(e){
  if(ibIsMissing(e)) return T("Meldinger er ikke satt opp på serveren ennå (supabase/meldinger.sql).", "Messages are not set up on the server yet (supabase/meldinger.sql).");
  const m = String((e && (e.msg || e.message)) || "");
  if(/not_friends/.test(m)) return T("Dere må være venner for å sende meldinger.", "You need to be friends to send messages.");
  if(/blocked/.test(m)) return T("Du kan ikke sende meldinger til denne personen.", "You can't message this person.");
  if(/unclean/.test(m)) return T("Meldingen inneholder ord som ikke er lov.", "The message contains words that aren't allowed.");
  if(/empty/.test(m)) return T("Meldingen er tom.", "The message is empty.");
  if(/too_many/.test(m)) return T("Du har sendt veldig mange meldinger. Vent litt.", "You've sent a lot of messages. Wait a bit.");
  return typeof frErr === "function" ? frErr(e) : T("Noe gikk galt.", "Something went wrong.");
}
async function ibUnread(){
  if(!CLOUD_ON || !AUTH || IB.missing) return;
  try{ const n = +(await frRpc("unread_messages")) || 0; if(n !== IB.unread){ IB.unread = n; renderTabbar(); if(screen === "friends" && FR.view !== "messages" && !overlay) render(); } }
  catch(e){ if(ibIsMissing(e)) IB.missing = true; }
}
setInterval(() => { if(document.visibilityState === "visible") ibUnread(); }, 60000);
setTimeout(ibUnread, 4000);
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible") ibUnread(); });
async function ibLoadConvs(){
  if(IB.loading) return; IB.loading = true; IB.err = null;
  try{ IB.convs = (await frRpc("get_conversations")) || []; IB.unread = IB.convs.reduce((s, c) => s + (+c.unread || 0), 0); renderTabbar(); }
  catch(e){ IB.err = ibErr(e); if(ibIsMissing(e)) IB.missing = true; IB.convs = IB.convs || []; }
  IB.loading = false; if(screen === "friends" && FR.view === "messages" && !IB.with && !overlay) render();
}
async function ibLoadMsgs(quiet){
  const w = IB.with; if(!w) return;
  try{
    const rows = ((await frRpc("get_messages", { p_with: w })) || []).reverse();
    if(IB.with !== w) return;
    const same = IB.msgs && IB.msgs.length === rows.length && (IB.msgs[IB.msgs.length - 1] || {}).id === (rows[rows.length - 1] || {}).id;
    IB.msgs = rows; IB.err = null;
    const c = (IB.convs || []).find(x => x.user_id === w); if(c && c.unread){ IB.unread = Math.max(0, IB.unread - c.unread); c.unread = 0; renderTabbar(); }
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
// Hvem er det (vennelista har navn og bilde).
function ibWho(id){
  const f = (FR.rows || []).find(r => r.user_id === id) || (IB.convs || []).find(r => r.user_id === id);
  return f || { user_id: id, display_name: "?", avatar: null, photo: null };
}
const ibTime = iso => { const d = new Date(iso), now = new Date(); return d.toDateString() === now.toDateString() ? d.toLocaleTimeString(LANG === "en" ? "en-GB" : "nb-NO", { hour: "2-digit", minute: "2-digit" }) : frAgo(iso); };
// Lenker fra meldinger åpnes bare som adresser inne i appen.
const ibSafeLink = l => typeof l === "string" && /^#\/[A-Za-z0-9_./%:-]{1,200}$/.test(l) ? l : null;
function ibListHTML(){
  if(!IB.convs){ if(!IB.loading) setTimeout(ibLoadConvs, 0); return `<p class="fr-wait">${esc(t("frLoading"))}</p>`; }
  const friends = (FR.rows || []).filter(r => !r.is_me), has = new Set(IB.convs.map(c => c.user_id)), fresh = friends.filter(f => !has.has(f.user_id));
  const conv = (c, i) => `<button class="ib-conv ${c.unread ? "new" : ""}" data-a="ibopen" data-id="${esc(c.user_id)}">${frAvatar(c.display_name, i, c.avatar, 46, c.photo)}
    <span class="ib-ct"><b>${esc(c.display_name)}</b><small>${c.last_from_me ? esc(T("Du: ", "You: ")) : ""}${c.last_link_title ? "🔗 " + esc(c.last_link_title) + (c.last_body ? " · " : "") : ""}${esc(String(c.last_body || "").slice(0, 80))}</small></span>
    <span class="ib-meta"><small>${esc(ibTime(c.last_at))}</small>${c.unread ? `<i class="ib-n">${c.unread}</i>` : ""}</span></button>`;
  return `${IB.err ? `<div class="fr-card"><p>${esc(IB.err)}</p></div>` : ""}
    ${IB.convs.length ? `<div class="ib-list">${IB.convs.map(conv).join("")}</div>` : `<div class="fr-card ib-empty"><span class="fr-big">💬</span><p>${esc(T("Ingen meldinger ennå. Skriv til en venn, eller trykk på del-knappen øverst på en side for å sende den.", "No messages yet. Write to a friend, or tap the share button at the top of a page to send it."))}</p></div>`}
    ${fresh.length ? `<h3 class="grp">${esc(T("Skriv til", "Write to"))}</h3><div class="ib-fresh">${fresh.map((f, i) => `<button class="ib-f" data-a="ibopen" data-id="${esc(f.user_id)}">${frAvatar(f.display_name, i, f.avatar, 48, f.photo)}<small>${esc(f.display_name)}</small></button>`).join("")}</div>` : friends.length ? "" : `<p class="fr-hint">${esc(T("Legg til venner under Venner for å kunne sende meldinger.", "Add friends under Friends to be able to send messages."))}</p>`}`;
}
function ibMsgHTML(m){
  const link = ibSafeLink(m.link);
  return `<div class="ib-m ${m.from_me ? "me" : "them"}">${link ? `<button class="ib-card" data-a="iblink" data-l="${esc(link)}"><span class="ib-ci" aria-hidden="true">🔗</span><span><small>${esc(T("Delt side", "Shared page"))}</small><b>${esc(m.link_title || link)}</b></span>${I.chevron}</button>` : ""}
    ${m.body ? `<p>${esc(m.body)}</p>` : ""}<small class="ib-mt">${esc(ibTime(m.created_at))}${m.from_me && m.read_at ? " · " + esc(T("Lest", "Read")) : ""}${m.from_me ? ` <button class="ib-del" data-a="ibdel" data-id="${m.id}" aria-label="${esc(T("Slett meldingen", "Delete the message"))}">${esc(T("Slett", "Delete"))}</button>` : ""}</small></div>`;
}
function ibChatHTML(){
  const w = ibWho(IB.with);
  return `<div class="ib-head"><button class="iconbtn" data-a="ibback" aria-label="${esc(t("back"))}">${I.left}</button><button class="ib-who" data-a="frperson" data-id="${esc(w.user_id)}">${frAvatar(w.display_name, 0, w.avatar, 36, w.photo)}<b>${esc(w.display_name)}</b></button>
      <button class="fr-more" data-a="frmod" data-id="${esc(w.user_id)}" aria-label="${esc(t("repMore"))}">⋯</button></div>
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
  if(IB.with){ if(!IB.msgs) setTimeout(() => ibLoadMsgs(false), 0); return ibChatHTML(); }
  return ibListHTML();
}
function ibMount(){
  const ta = document.getElementById("ibtext"); if(!ta) return;
  ta.addEventListener("keydown", e => { if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); ibSend(); } });
  ta.addEventListener("input", () => { ta.style.height = "auto"; ta.style.height = Math.min(140, ta.scrollHeight) + "px"; });
  window.scrollTo(0, document.body.scrollHeight);
}
async function ibSend(){
  const ta = document.getElementById("ibtext"), txt = ta ? ta.value.trim() : ""; if(!txt || IB.busy || !IB.with) return;
  IB.busy = true;
  try{ await frRpc("send_message", { p_to: IB.with, p_body: txt, p_link: null, p_title: null }); if(ta){ ta.value = ""; ta.style.height = "auto"; } sfx("tap"); await ibLoadMsgs(false); IB.convs = null; }
  catch(e){ toast(ibErr(e)); }
  IB.busy = false; if(ta) ta.focus();
}
// Del-arket: rekke med venner man kan sende siden til.
function ibFriendsHTML(o){
  if(!CLOUD_ON) return "";
  if(!AUTH) return `<p class="sh-note">${esc(T("Logg inn for å sende siden til venner i Axle.", "Log in to send the page to friends in Axle."))}</p>`;
  if(IB.missing) return "";
  if(FR.rows === null){ if(!FR.loading) frLoad().then(() => { if(overlay && overlay.share) renderOverlay(); }); return `<p class="sh-note">${esc(t("frLoading"))}</p>`; }
  const fr = FR.rows.filter(r => !r.is_me); if(!fr.length) return `<p class="sh-note">${esc(T("Legg til venner for å sende sider til dem her i appen.", "Add friends to send pages to them here in the app."))}</p>`;
  const sent = o.sent || {};
  return `<h4 class="sh-h">${esc(T("Send til en venn i Axle", "Send to a friend in Axle"))}</h4>
    <input class="sh-msg" id="shnote" maxlength="300" placeholder="${esc(T("Legg til en hilsen (valgfritt)", "Add a note (optional)"))}" value="${esc(o.note || "")}">
    <div class="sh-friends">${fr.map((f, i) => `<button class="ib-f ${sent[f.user_id] ? "sent" : ""}" data-a="ibsendto" data-id="${esc(f.user_id)}" ${sent[f.user_id] ? "disabled" : ""}>${frAvatar(f.display_name, i, f.avatar, 48, f.photo)}<small>${esc(sent[f.user_id] ? T("Sendt ✓", "Sent ✓") : f.display_name)}</small></button>`).join("")}</div>`;
}
async function ibSendShare(id){
  const o = overlay && overlay.share; if(!o || (o.sent || {})[id]) return;
  const note = (document.getElementById("shnote") || {}).value || ""; o.note = note;
  const link = ibSafeLink("#/" + o.url.split("#/")[1]);
  try{ await frRpc("send_message", { p_to: id, p_body: note.trim(), p_link: link, p_title: o.title.slice(0, 120) }); (o.sent ||= {})[id] = 1; IB.convs = null; buzz(true); sfx("ok", 1);
    if(overlay && overlay.share === o) renderOverlay(); toast(T(`Sendt til ${ibWho(id).display_name}`, `Sent to ${ibWho(id).display_name}`)); }
  catch(e){ if(ibIsMissing(e)){ IB.missing = true; renderOverlay(); } toast(ibErr(e)); }
}
function ibOpen(id){ IB.with = id; IB.msgs = null; IB.err = null; FR.view = "messages"; screen = "friends"; overlay = null; render(); }
function ibClick(a, b){
  if(!a.startsWith("ib")) return false;
  const d = b && b.dataset;
  if(a === "ibopen"){ ibOpen(d.id); return true; }
  if(a === "ibback"){ IB.with = null; IB.msgs = null; IB.convs = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "ibsend"){ ibSend(); return true; }
  if(a === "ibsendto"){ ibSendShare(d.id); return true; }
  if(a === "iblink"){ const l = ibSafeLink(d.l); if(l){ if(location.hash === l){ routeBoot(); render(); } else location.hash = l; } return true; }
  if(a === "ibdel"){ const id = +d.id; frRpc("delete_message", { p_id: id }).then(() => { IB.msgs = (IB.msgs || []).filter(m => m.id !== id); ibPaintMsgs(false); }, e => toast(ibErr(e))); return true; }
  return false;
}
