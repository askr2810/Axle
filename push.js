// ============================================================
//  PÅMINNELSER I NETTLESEREN (web push). Krever konto, supabase/varsler.sql og Edge Function «varsler».
//  Nettleseren melder seg på hos sin push-tjeneste, og abonnementet lagres i Supabase.
//  Serveren sender én påminnelse på valgt klokkeslett (rekke i fare / dagens utfordring) og «siste sjanse» kl. 22.
// ============================================================
const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const IS_STANDALONE = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const pushSupported = () => !NATIVE && CLOUD_ON && !!CONFIG.vapidPublicKey && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
function pushNote(){ // forklaring under bryteren når push ikke går
  if(NATIVE || pushSupported()) return "";
  if(IS_IOS && !IS_STANDALONE) return t("pushIosHint");
  return t("pushUnsupported");
}
// Service workeren sier fra når en push-melding kom fram. Da vet vi at serveren og nettleseren snakker sammen.
if("serviceWorker" in navigator) navigator.serviceWorker.addEventListener("message", ev => {
  if(ev.data && ev.data.type === "axle-push") toast(t("pushGot", ev.data.title || "Axle"));
});
function b64uToBytes(s){ const p = "=".repeat((4 - s.length % 4) % 4), b = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(b, c => c.charCodeAt(0)); }
const pushTz = () => { try{ return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Oslo"; }catch(e){ return "Europe/Oslo"; } };
async function pushSave(sub){
  const j = sub.toJSON(), tok = await authToken(); if(!tok) throw new CloudError("auth", 401);
  await sbFetch("/rest/v1/rpc/save_push_sub", { method: "POST", body: JSON.stringify({ p_endpoint: j.endpoint, p_p256dh: j.keys.p256dh, p_auth: j.keys.auth, p_tz: pushTz(), p_remind_at: S.reminder.time || "19:00", p_lang: LANG === "en" ? "en" : "nb" }) }, tok);
  S.pushSynced = dayKey(); save();
}
async function pushEnable(){
  if(!AUTH){ S.reminder.on = false; save(); toast(t("pushNeedLogin")); overlay = { login: 1, step: "email", email: "" }; renderOverlay(); return false; }
  const perm = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
  if(perm !== "granted"){ S.reminder.on = false; save(); toast(t(perm === "denied" ? "pushDenied" : "pushNotNow")); return false; }
  try{
    const reg = await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(CONFIG.vapidPublicKey) });
    await pushSave(sub); S.reminder.on = true; save(); return true;
  }catch(e){
    S.reminder.on = false; save();
    toast(e && (e.status === 404 || /PGRST202|42883/.test(e.code || "")) ? t("pushNoDb") : t("pushFailed")); return false;
  }
}
async function pushDisable(){
  try{
    const reg = await navigator.serviceWorker.ready, sub = await reg.pushManager.getSubscription();
    if(sub){ const ep = sub.endpoint; await sub.unsubscribe().catch(() => {}); const tok = await authToken(); if(tok) await sbFetch("/rest/v1/rpc/delete_push_sub", { method: "POST", body: JSON.stringify({ p_endpoint: ep }) }, tok).catch(() => {}); }
  }catch(e){}
}
// Holder abonnementet oppdatert (ny tid, nytt språk, ny tidssone, fornyet nøkkel).
async function pushResync(force){
  if(!pushSupported() || !AUTH || !S.reminder.on || Notification.permission !== "granted") return;
  if(!force && S.pushSynced === dayKey()) return;
  try{ const reg = await navigator.serviceWorker.ready, sub = await reg.pushManager.getSubscription(); if(sub) await pushSave(sub); else await pushEnable(); }catch(e){}
}
async function pushTest(){
  // 1) Lokalt varsel rett fra nettleseren (viser om maskinen i det hele tatt viser varsler fra Chrome).
  try{ const reg = await navigator.serviceWorker.ready; await reg.showNotification(t("pushLocalTitle"), { body: t("pushLocalBody"), icon: "icons/icon-192.png", tag: "axle-local" }); }catch(e){}
  // 2) Varsel via serveren (Supabase → push-tjenesten → nettleseren). Registrer nettleserens nåværende abonnement først.
  let mine = "";
  try{ const reg = await navigator.serviceWorker.ready; let sub = await reg.pushManager.getSubscription();
    if(!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uToBytes(CONFIG.vapidPublicKey) });
    await pushSave(sub); mine = "…" + sub.endpoint.slice(-10); }catch(e){ alert(t("pushTestFailed") + "\n\n" + t("pushFailed") + " (" + (e && (e.message || e.code) || e) + ")"); return; }
  try{
    const tok = await authToken(); if(!tok) throw 0;
    const r = await fetch(CONFIG.supabaseUrl + "/functions/v1/varsler", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok, apikey: CONFIG.supabaseKey }, body: JSON.stringify({ test: true }) });
    const j = await r.json().catch(() => ({}));
    if(r.ok && j.sent){
      toast(t("pushTestSent"));
      if(j.targets && !j.targets.includes(mine)) alert("Axle\n\n" + t("pushTestMismatch") + "\n\n" + mine + " ≠ " + j.targets.join(", "));
      console.log("push-test", mine, j);
    }
    else if(r.status === 404 && !j.error) toast(t("pushNoFn"));
    else {
      const e = String(j.error || j.message || j.msg || ("HTTP " + r.status));
      const hint = /no_subs/.test(e) ? t("pushHintResub") : /missing_vapid|bad_vapid/.test(e) ? t("pushHintKeys") : /^push: 40[13]/.test(e) ? t("pushHintMismatch") : /auth|401/.test(e) ? t("pushHintAuth") : "";
      if(/no_subs/.test(e)) pushResync(true);
      alert(t("pushTestFailed") + "\n\n" + e + (hint ? "\n\n" + hint : ""));
    }
  }catch(e){ alert(t("pushTestFailed") + "\n\n" + t("pushHintNet") + "\n\n(" + (e && e.message || e) + ")"); }
}
// Slår påminnelser av/på: appen bruker lokale varsler, nettleseren web push.
async function reminderToggle(){
  if(NATIVE){ S.reminder.on = !S.reminder.on; save(); render(); if(await scheduleReminder() && S.reminder.on) toast(t("reminderOn", S.reminder.time)); return; }
  if(!pushSupported()){ toast(pushNote() || t("pushUnsupported")); return; }
  if(S.reminder.on){ S.reminder.on = false; save(); render(); await pushDisable(); toast(t("pushOff")); return; }
  S.reminder.on = true; render();
  const ok = await pushEnable(); render();
  if(ok){ toast(t("reminderOn", S.reminder.time)); bdgToast(checkBadges()); }
}
function reminderPromptHTML(){ // etter en leksjon: spør om påminnelser, slik Duolingo gjør
  if(S.reminder.on || S.remPromptOff || (!NATIVE && !pushSupported()) || (S.remPromptAt && Date.now() - S.remPromptAt < 5 * 864e5)) return "";
  return `<div class="rem-ask"><span class="rem-ic">${I.fire}</span><div><b>${esc(t("remAskTitle"))}</b><span>${esc(t("remAskText"))}</span></div>
    <button class="rem-go" data-a="remask">${esc(t("remAskGo"))}</button><button class="rem-x" data-a="remasknot" aria-label="${esc(t("remAskNo"))}">${I.x}</button></div>`;
}
