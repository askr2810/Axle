// ============================================================
//  VENNER OG POENGTAVLE (krever konto, se cloud.js og supabase/venner.sql).
//  Hver bruker har et visningsnavn og en venne-kode. Legger du inn koden til en venn,
//  blir dere venner begge veier og ser hverandres XP, rekke, kroner og fag.
// ============================================================
let FR = { rows: null, loading: false, err: null, tab: "week", editName: false, busy: false };
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
let FR_OLD_DB = false;
function frBody(){ const b = myStats(); if(S.avatar) b.avatar = S.avatar; if(FR_OLD_DB) FR_NEW_COLS.forEach(k => delete b[k]); return b; }
async function frPushStats(tok){
  if(!AUTH) return;
  const url = "/rest/v1/profiles?user_id=eq." + encodeURIComponent(AUTH.uid), opt = b => ({ method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(b) });
  try{ await sbFetch(url, opt(frBody()), tok); }
  catch(e){ if(!FR_OLD_DB && /PGRST204|42703/.test(e.code || "")){ FR_OLD_DB = true; await sbFetch(url, opt(frBody()), tok); } else throw e; }
}
async function frLoad(){
  if(!CLOUD_ON || !AUTH || FR.loading) return;
  FR.loading = true; FR.err = null; frRender();
  try{
    try{ const tok = await authToken(); if(tok) await frPushStats(tok); }catch(e){}
    FR.rows = (await frRpc("get_friends")) || [];
    const meRow = FR.rows.find(r => r.is_me); if(meRow && meRow.display_name && meRow.display_name !== S.name){ S.name = meRow.display_name; save(); }
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
  FR.busy = true; frRender();
  try{
    const tok = await authToken(); if(!tok) throw new CloudError("offline", 0);
    const me = (FR.rows || []).find(r => r.is_me);
    if(me) await sbFetch("/rest/v1/profiles?user_id=eq." + encodeURIComponent(AUTH.uid), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ display_name: name }) }, tok);
    else { const post = b => sbFetch("/rest/v1/profiles", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(Object.assign({ user_id: AUTH.uid, display_name: name }, b)) }, tok);
      try{ await post(frBody()); } catch(e){ if(!FR_OLD_DB && /PGRST204|42703/.test(e.code || "")){ FR_OLD_DB = true; await post(frBody()); } else throw e; } }
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
function frErr(e){
  const m = (e && e.msg) || "";
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
    ${win ? `<div class="lg-win">${frAvatar(win.r.display_name, 0, win.r.is_me ? (S.avatar || win.r.avatar) : win.r.avatar, 40)}<span><small>${esc(t("lgLastWinner"))}</small><b>${esc(win.r.display_name)}${win.r.is_me ? " " + esc(t("frYou")) : ""}</b></span><em>${win.xp} XP</em></div>`
          : `<p>${esc(t("lgNoWinner"))}</p>`}</div>`;
}
function frRender(){ if(screen === "friends" && !overlay) render(); }

function frAvatar(name, i, av, size){
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
      const rows = FR.rows.map(frLive), key = FR.tab === "total" ? "xp" : FR.tab === "streak" ? "streak" : "week_xp";
      rows.sort((a, b) => (b[key] - a[key]) || (b.xp - a.xp) || String(a.display_name).localeCompare(b.display_name));
      const unit = r => FR.tab === "streak" ? `${r.streak}<small>${esc(t("frDays"))}</small>` : `${r[key]}<small>XP</small>`;
      const avOf = r => r.is_me ? (S.avatar || r.avatar) : r.avatar;
      const podium = rows.length >= 2 ? `<div class="podium">${[1, 0, 2].map(i => { const r = rows[i]; if(!r) return `<div class="pd-col p${i + 1} empty"></div>`;
          return `<button class="pd-col p${i + 1} ${r.is_me ? "me" : ""}" ${r.is_me ? "" : `data-a="frdetail" data-id="${esc(r.user_id)}"`}>
            <span class="pd-av">${i === 0 ? `<span class="pd-crown">${I.crown}</span>` : ""}${frAvatar(r.display_name, i, avOf(r), i === 0 ? 72 : 58)}</span>
            <b class="pd-name">${esc(r.display_name)}</b><span class="pd-val">${unit(r)}</span>
            <span class="pd-block"><span class="pd-medal">${i + 1}</span></span></button>`; }).join("")}</div>` : "";
      const listRows = rows.length >= 2 ? rows.slice(3) : rows, off = rows.length >= 2 ? 3 : 0;
      const board = listRows.map((r, j) => { const i = j + off; return `<button class="fr-row ${r.is_me ? "me" : ""}" ${r.is_me ? "" : `data-a="frdetail" data-id="${esc(r.user_id)}"`}>
          <span class="fr-rank r${i + 1}">${i + 1}</span>${frAvatar(r.display_name, i, avOf(r))}
          <span class="fr-t"><b>${esc(r.display_name)}${r.is_me ? ` <em>${esc(t("frYou"))}</em>` : ""}</b><span>${esc(frCourseName(r.course))}${r.crowns ? ` · ${r.crowns} ${esc(t("frCrownsShort"))}` : ""}</span></span>
          <span class="fr-v">${unit(r)}</span></button>`; }).join("");
      const meCard = `<div class="fr-card fr-me">${frAvatar(me.display_name, 0, S.avatar || me.avatar, 56)}<div class="fr-me-t"><b>${esc(me.display_name)}</b><span class="fr-links"><button class="exlink" data-a="freditname">${esc(t("frEditName"))}</button><button class="exlink" data-a="avedit">${esc(t("avEdit"))}</button></span></div></div>`;
      const codeCard = `<div class="fr-card fr-code"><small>${esc(t("frYourCode"))}</small><div class="fr-codev">${esc(frFmtCode(me.friend_code))}</div>
          <p>${esc(t("frCodeText"))}</p><button class="big" data-a="frshare">${esc(t(navigator.share ? "frShare" : "frCopy"))}</button></div>
        <div class="fr-add"><input type="text" id="fradd" maxlength="12" autocapitalize="characters" autocomplete="off" placeholder="${esc(t("frAddPh"))}" aria-label="${esc(t("frAddPh"))}"><button class="big" data-a="fradd" ${FR.busy ? "disabled" : ""}>${esc(t("frAdd"))}</button></div>`;
      const boardHTML = `${frLeagueHTML(FR.rows)}
        <div class="seg fr-tabs" role="tablist">${["week", "total", "streak"].map(k => `<button role="tab" aria-selected="${FR.tab === k}" class="${FR.tab === k ? "on" : ""}" data-a="frtab" data-t="${k}">${esc(t("frTab_" + k))}</button>`).join("")}</div>
        ${podium}<div class="fr-board">${board}</div>
        ${rows.length < 2 ? `<p class="fr-hint">${esc(t("frEmpty"))}</p>` : ""}`;
      body = meCard + (rows.length >= 2 ? boardHTML + codeCard : codeCard + boardHTML) + `
        <button class="exlink fr-refresh" data-a="frreload">${FR.loading ? esc(t("frLoading")) : esc(t("frRefresh"))}</button>`;
    }
  }
  $app.innerHTML = `${head}<main class="wrap fr">${body}</main>`;
  const nm = document.getElementById("frname"); if(nm){ nm.focus(); nm.addEventListener("keydown", e => { if(e.key === "Enter") frSaveName(nm.value); }); }
  const ad = document.getElementById("fradd"); if(ad) ad.addEventListener("keydown", e => { if(e.key === "Enter") frAdd(ad.value); });
}
function frDetailHTML(id){
  const r0 = (FR.rows || []).find(x => x.user_id === id); if(!r0) return "";
  const r = frLive(r0), st = (label, v) => `<div class="fr-st"><b>${v}</b><span>${esc(label)}</span></div>`;
  return `<div class="dialog pop" role="dialog" aria-label="${esc(r.display_name)}"><div class="fr-dh">${frAvatar(r.display_name, 1, r.avatar, 56)}<h3>${esc(r.display_name)}</h3></div>
    <div class="fr-stats">${st(t("frTab_week"), r.week_xp + " XP")}${st(t("frTab_total"), r.xp + " XP")}${st(t("frTab_streak"), r.streak + " " + t("frDays"))}${st(t("frCrowns"), r.crowns)}${st(t("frLevels"), r.levels)}${st(t("frLast"), esc(frAgo(r.updated_at)))}</div>
    ${r.course ? `<p class="fr-now">${esc(t("frNow", frCourseName(r.course)))}</p>` : ""}
    <button class="big" data-a="closeov">${esc(t("cont"))}</button>
    <button class="big ghost" data-a="frremove" data-id="${esc(id)}" style="color:var(--bad)">${esc(overlay.confirm ? t("frRemoveSure") : t("frRemove"))}</button></div>`;
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
  else if(a === "fradd") frAdd((document.getElementById("fradd") || {}).value || "");
  else if(a === "frshare"){
    const me = (FR.rows || []).find(r => r.is_me); if(!me) return true;
    const text = t("frShareText", frFmtCode(me.friend_code), CONFIG.siteUrl + "/?venn=" + me.friend_code);
    if(navigator.share) navigator.share({ text }).catch(()=>{});
    else (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(()=>toast(t("frCopied")), ()=>{});
  }
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
