// ============================================================
//  DEL DENNE SIDEN – en deleknapp øverst på alle skjermer som har en adresse (route.js).
//  Lenken åpner nøyaktig samme sted hos mottakeren (f.eks. axle.no/#/enhetssirkel/utforsk).
//  Arket gir: systemets delemeny (mobil), kopier lenke, og send til en venn i Axle (meldinger, se inbox.js).
// ============================================================
const SHARE_SKIP = ["settings", "admin", "avatar", "ccedit", "home"];
// Full lenke til en adresse; i appen (iOS/Android) brukes nettadressen, ikke capacitor://.
function shareUrl(r){
  const base = typeof NATIVE !== "undefined" && NATIVE ? CONFIG.siteUrl.replace(/\/$/, "") + "/" : location.origin + location.pathname;
  return base + (r ? "#/" + r.split("/").map(encodeURIComponent).join("/") : "");
}
// Tittel fra topplinja, med litt ekstra der det hjelper (stasjon i laben, kort i steg-for-steg).
function shareTitle(){
  const b = document.querySelector("#app > .top .th-t b"), s = document.querySelector("#app > .top .th-t small");
  let title = b ? b.textContent.trim() : T(CONFIG.appName.nb, CONFIG.appName.en);
  const tab = document.querySelector(".tg-tabs button.on"); if(tab){ const c = tab.cloneNode(true); c.querySelectorAll("[aria-hidden]").forEach(x => x.remove()); title += " · " + c.textContent.replace("✓", "").trim(); }
  return { title, sub: s ? s.textContent.trim() : "" };
}
function shareInject(){
  if(SHARE_SKIP.includes(screen) || (screen === "friends" && FR.view === "messages")) return;
  const r = routeOf(); if(!r) return;
  const w = document.querySelector("#app > .top .wrap"); if(!w || w.querySelector(".sh-btn")) return;
  w.insertAdjacentHTML("beforeend", `<button class="iconbtn sh-btn" data-a="shareopen" aria-label="${esc(T("Del denne siden", "Share this page"))}" title="${esc(T("Del", "Share"))}">${I.share}</button>`);
}
function shareOpen(){
  const r = routeOf(); if(r === null) return;
  const { title, sub } = shareTitle();
  overlay = { share: { url: shareUrl(r), title, sub } }; renderOverlay();
}
function shareHTML(o){
  const canNative = !!navigator.share, fr = typeof ibFriendsHTML === "function" ? ibFriendsHTML(o) : "";
  return `<div class="dialog sh-sheet" role="dialog" aria-label="${esc(T("Del", "Share"))}"><div class="sheet-h"><h3>${esc(T("Del", "Share"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    <div class="sh-what"><small>${esc(o.sub || "Axle")}</small><b>${esc(o.title)}</b></div>
    <div class="sh-link"><input readonly value="${esc(o.url)}" aria-label="${esc(T("Lenke", "Link"))}" id="shurl"><button class="sh-copy" data-a="sharecopy">${I.copy}<span>${esc(T("Kopier", "Copy"))}</span></button></div>
    ${canNative ? `<button class="big" data-a="sharenative">${I.share} ${esc(T("Del med …", "Share with …"))}</button>` : ""}
    ${fr}</div>`;
}
function shareText(o){ return T(`Sjekk ut «${o.title}» i Axle`, `Check out "${o.title}" in Axle`); }
function shareCopy(url){
  const ok = () => { toast(T("Lenken er kopiert", "Link copied")); const b = document.querySelector(".sh-copy span"); if(b) b.textContent = T("Kopiert!", "Copied!"); };
  if(navigator.clipboard) navigator.clipboard.writeText(url).then(ok, () => { const i = document.getElementById("shurl"); if(i){ i.select(); try{ document.execCommand("copy"); ok(); }catch(e){} } });
  else { const i = document.getElementById("shurl"); if(i){ i.select(); try{ document.execCommand("copy"); ok(); }catch(e){} } }
}
function shareClick(a, b){
  if(!a.startsWith("share")) return false;
  const o = overlay && overlay.share;
  if(a === "shareopen"){ shareOpen(); return true; }
  if(!o) return true;
  if(a === "sharecopy"){ shareCopy(o.url); return true; }
  if(a === "sharenative"){ navigator.share({ title: o.title, text: shareText(o), url: o.url }).catch(() => {}); return true; }
  return false;
}
