// ============================================================
//  NAVIGASJON OG PROFIL
//  - Tab-meny nederst: Lær, Teori, Venner, Profil.
//  - Infoark når du trykker på rekke, kroner eller XP.
//  - Profilside med avatar, navn, statistikk, merker og fag.
// ============================================================
const TABS = [["home", "book2", "tabLearn"], ["practice", "bolt", "tabPractice"], ["book", "book", "tabTheory"], ["friends", "users", "tabFriends"], ["profile", "person", "tabProfile"]];
function tabOf(){ return screen === "home" ? "home" : (screen === "practice" || screen === "community") ? "practice" : screen === "book" && BK.v !== "unit" && BK.v !== "topic" ? "book" : screen === "friends" ? "friends" : (screen === "profile" || screen === "badges") ? "profile" : null; }
function tabbarHTML(active){
  return `<nav class="tabbar" aria-label="${esc(t("tabNav"))}"><div class="wrap">${TABS.map(([k, ic, lab]) =>
    `<button class="${k === active ? "on" : ""}" data-a="tab" data-t="${k}" aria-current="${k === active ? "page" : "false"}">${(k === "practice" && !dcDoneToday()) || (k === "friends" && FR.reqs && FR.reqs.length) ? `<i class="tab-dot"></i>` : ""}${k === "profile" && hasMeAv() ? meAvHTML(26, "tab-av") : I[ic]}<span>${esc(t(lab))}</span></button>`).join("")}</div></nav>`;
}
function renderTabbar(){
  document.querySelector(".tabbar")?.remove();
  const active = tabOf(); document.body.classList.toggle("has-tabs", !!active);
  if(active) document.body.insertAdjacentHTML("beforeend", tabbarHTML(active));
}
function goTab(k){
  overlay = null;
  if(k === "home") return goHome();
  if(k === "book") return openBook();
  if(k === "friends") return openFriends();
  if(k === "profile" || k === "practice"){ screen = k; render(); window.scrollTo(0, 0); }
}

// ---------- infoark: rekke, kroner og XP ----------
function weekXP(offset = 0){ const wk = weekKeyOf(addDays(new Date(), -7 * offset)); let s = 0; for(const k in S.daily || {}){ const [y, m, d] = k.split("-").map(Number); if(weekKeyOf(new Date(y, m - 1, d)) === wk) s += +S.daily[k] || 0; } return s; }
function statSheetHTML(k){
  const c = COURSE(S.current), close = `<button class="big" data-a="closeov">${esc(t("cont"))}</button>`;
  if(k === "streak"){
    const st = streakNow(), best = Math.max(+S.bestStreak || 0, st), today = new Date(), dow = (today.getDay() + 6) % 7, start = addDays(today, -dow - 21);
    let cal = t("days").map(d => `<span class="cal-h">${esc(d)}</span>`).join("");
    for(let i = 0; i < 28; i++){ const d = addDays(start, i), key = dayKey(d), on = (S.daily[key] || 0) > 0, fut = d > today;
      cal += `<span class="cal-d ${on ? "on" : ""} ${key === dayKey() ? "today" : ""} ${fut ? "fut" : ""}">${d.getDate()}</span>`; }
    return `<div class="dialog pop sheet-stat" role="dialog" aria-label="${esc(t("streakTitle"))}"><div class="ss-big fire">${I.fire}<b>${st}</b></div><h3>${esc(t("ssStreak", st))}</h3>
      <p>${esc(st ? t("ssStreakOn") : t("ssStreakOff"))}</p><div class="ss-row"><div><b>${best}</b><span>${esc(t("ssBest"))}</span></div><div><b>${Object.keys(S.daily || {}).filter(k => S.daily[k] > 0).length}</b><span>${esc(t("ssDays60"))}</span></div></div>
      <div class="cal">${cal}</div>${close}</div>`;
  }
  if(k === "crowns"){
    const tot = COURSES.reduce((s, x) => s + crowns(x), 0);
    const rows = c.units.map((_, u) => { const has = sub(c.code).done[u + "-3"]; return `<li class="${has ? "on" : ""}">${has ? I.crown : `<span class="cr-empty"></span>`}<span>${esc(unitTitle(c, u))}</span></li>`; }).join("");
    return `<div class="dialog pop sheet-stat" role="dialog" aria-label="${esc(t("crownsTitle"))}"><div class="ss-big crowns">${I.crown}<b>${crowns(c)}</b></div><h3>${esc(t("ssCrowns", crowns(c), c.units.length))}</h3>
      <p>${esc(t("ssCrownsHow"))}</p><ul class="cr-list">${rows}</ul><p class="ss-note">${esc(t("ssCrownsAll", tot))}</p>${close}</div>`;
  }
  const goal = S.goal || 10, today = S.daily[dayKey()] || 0, days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6));
  const vals = days.map(d => S.daily[dayKey(d)] || 0), mx = Math.max(goal, ...vals);
  const bars = days.map((d, i) => `<div class="xbar"><i style="height:${Math.max(3, vals[i] / mx * 100)}%" class="${vals[i] >= goal ? "ok" : ""}"></i><small>${esc(t("days")[(d.getDay() + 6) % 7])}</small></div>`).join("");
  return `<div class="dialog pop sheet-stat" role="dialog" aria-label="${esc(t("xpTitle"))}"><div class="ss-big xp">${I.bolt}<b>${S.xp}</b></div><h3>${esc(t("ssXp"))}</h3>
    <div class="ss-row"><div><b>${today}/${goal}</b><span>${esc(t("ssToday"))}</span></div><div><b>${weekXP(0)}</b><span>${esc(t("ssWeek"))}</span></div><div><b>${weekXP(1)}</b><span>${esc(t("ssLastWeek"))}</span></div></div>
    <div class="bars" style="--goal:${goal / mx * 100}%">${bars}</div><p class="ss-note">${esc(t("ssXpHow"))}</p>
    <button class="big ghost" data-a="settings">${esc(t("ssGoal"))}</button>${close}</div>`;
}

// ---------- profil ----------
function renderProfile(){
  // Navnet ligger i venneprofilen: hent det i bakgrunnen hvis det mangler lokalt.
  if(AUTH && CLOUD_ON && !S.name && FR.rows === null && !FR.loading) frLoad().then(() => { if(screen === "profile" && S.name) render(); });
  let lv = 0; for(const c of COURSES) lv += courseProgress(c).d;
  const st = streakNow(), best = Math.max(+S.bestStreak || 0, st), cr = COURSES.reduce((s, x) => s + crowns(x), 0), have = S.badges || {};
  const nB = BADGES.filter(b => have[b[0]]).length;
  const recent = BADGES.filter(b => have[b[0]]).sort((a, b) => have[b[0]] - have[a[0]]).slice(0, 5);
  const courses = COURSES.map(c => ({ c, p: courseProgress(c) })).filter(x => x.p.d > 0 || x.c.code === S.current).sort((a, b) => b.p.d / b.p.tot - a.p.d / a.p.tot);
  const tile = (a, k, v, lab, ic) => `<button class="pf-tile" ${a ? `data-a="${a}" ${k ? `data-k="${k}"` : ""}` : "disabled"}>${ic}<b>${v}</b><span>${esc(lab)}</span></button>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><div class="th-t"><small>${esc(t("tabProfile"))}</small><b>${esc(S.name || t("pfYou"))}</b></div>
      <button class="iconbtn" data-a="settings" aria-label="${esc(t("settings"))}">${I.gear}</button></div></div>
    <main class="wrap pf">
      <div class="pf-head"><button class="pf-av" data-a="avedit" aria-label="${esc(t(hasMeAv() ? "avEdit" : "avMake"))}">${hasMeAv() ? meAvHTML(104) : `<span class="set-av0 big">${I.person}</span>`}<span class="pf-edit">${I.pencil}</span></button>
        <div class="pf-id"><b>${esc(S.name || t("pfYou"))}</b><span class="pf-lv">${esc(t("lvName", levelInfo(S.xp).lv))}</span><button class="exlink" data-a="pfname">${esc(t(S.name ? "frEditName" : "pfSetName"))}</button>
        <span class="pf-acc">${AUTH ? esc(AUTH.email || "") : `${esc(t("pfNotLogged"))} · <button class="exlink" data-a="aclogin">${esc(t("acLogin"))}</button>`}</span></div></div>
      ${levelBarHTML(S.xp, S.xp)}
      <div class="pf-grid">
        ${tile("statinfo", "streak", st, t("pfStreak"), I.fire)}${tile("statinfo", "streak", best, t("ssBest"), I.fire)}${tile("statinfo", "xp", S.xp, "XP", I.bolt)}
        ${tile("statinfo", "crowns", cr, t("pfCrowns"), I.crown)}${tile("", "", lv, t("pfLevels"), I.star16)}${tile("badges", "", nB + "/" + BADGES.length, t("bdgTitle"), I.trophyS)}
      </div>
      <div class="pf-sec"><div class="pf-sh"><b>${esc(t("bdgTitle"))}</b><button class="exlink" data-a="badges">${esc(t("pfSeeAll"))}</button></div>
        ${recent.length ? `<div class="pf-badges">${recent.map(b => `<button data-a="badges" title="${esc(bdgName(b))}">${badgeIcon(b, 50)}<small>${esc(bdgName(b))}</small></button>`).join("")}</div>` : `<p class="pf-empty">${esc(t("pfNoBadges"))}</p>`}</div>
      <div class="pf-sec"><div class="pf-sh"><b>${esc(t("pfCourses"))}</b><button class="exlink" data-a="pick">${esc(t("switchCourse"))}</button></div>
        ${courses.map(({ c, p }) => `<button class="pf-course ${c.code === S.current ? "sel" : ""}" data-a="choose" data-c="${esc(c.code)}"><span class="badge" style="background:${bkCol(c)}">${esc(courseShort(c))}</span>
          <span class="t"><b>${esc(courseName(c))}</b><span class="pf-bar"><i style="width:${p.d / p.tot * 100}%"></i></span></span><span class="n">${Math.round(p.d / p.tot * 100)} %</span></button>`).join("")}</div>
      <div class="sgroup pf-links">
        <button class="srow" data-a="settings">${I.gear}<span class="lbl">${esc(t("settings"))}</span>${I.chevron}</button>
        <button class="srow" data-a="feedback">${I.flag}<span class="lbl">${esc(t("setFeedback"))}</span>${I.chevron}</button>
      </div>
    </main>`;
}
function nameDialogHTML(){
  return `<div class="dialog pop" role="dialog" aria-label="${esc(t("pfSetName"))}"><h3>${esc(t("frPickName"))}</h3><p>${esc(t("pfNameText"))}</p>
    <input type="text" id="pfnamein" maxlength="24" autocomplete="nickname" placeholder="${esc(t("frNamePh"))}" value="${esc(S.name || "")}">
    <button class="big" data-a="pfnamesave">${esc(t("frSave"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function profileClick(a, b){
  if(a === "tab"){ goTab(b.dataset.t); return true; }
  if(a === "statinfo"){ overlay = { stat: b.dataset.k }; renderOverlay(); return true; }
  if(a === "preopen"){ overlay = { pre: 1 }; renderOverlay(); return true; }
  if(a === "profile"){ goTab("profile"); return true; }
  if(a === "pfname"){
    if(AUTH && CLOUD_ON){ FR.editName = true; openFriends(); }   // navnet ligger i venneprofilen
    else { overlay = { pfname: 1 }; renderOverlay(); }
    return true;
  }
  if(a === "pfnamesave"){ const v = ((document.getElementById("pfnamein") || {}).value || "").replace(/\s+/g, " ").trim().slice(0, 24); S.name = v || null; save(); overlay = null; renderOverlay(); render(); return true; }
  return false;
}

// ---------- Øv-fanen: dagsmål, dagens utfordring, repetisjon og prøveeksamener ----------
function renderPractice(){
  const c = COURSE(S.current), today = S.daily[dayKey()] || 0, goal = S.goal || 10, wrongN = sub(c.code).wrong.length;
  const now = new Date(), dow = (now.getDay() + 6) % 7, monday = addDays(now, -dow);
  const week = t("days").map((d, i) => { const k = dayKey(addDays(monday, i)), on = (S.daily[k] || 0) > 0;
    return `<div><span class="dot ${on ? "on" : ""} ${i === dow && !on ? "today" : ""}">${on ? I.checkS : ""}</span>${d}</div>`; }).join("");
  $app.innerHTML = `<div class="top"><div class="wrap"><div class="th-t"><small>${esc(courseName(c))}</small><b>${esc(t("tabPractice"))}</b></div>
      <button class="chip mini-chip" data-a="pick" aria-label="${esc(t("switchCourse"))}"><span class="code">${esc(courseShort(c))}</span>${I.down}</button></div></div>
    <main class="wrap prac">
      ${dcCardHTML()}
      ${drCardHTML()}
      ${todayCardHTML(c, today, goal, week)}
      ${ccCardPracticeHTML()}
      ${wrongN ? `<button class="qt-row rev" data-a="review"><span class="qt-ic">${I.redo}</span><span><b>${esc(t("reviewBtn", wrongN))}</b><small>${esc(t("prRevSub"))}</small></span>${I.chevron}</button>`
               : `<p class="prac-empty">${esc(t("prRevNone"))}</p>`}
      ${examHomeActions(c) ? `<div class="actions">${examHomeActions(c)}</div>` : ""}
      ${examHomeSection(c)}
    </main>`;
}
// «Bygger på»: en liten knapp på forsiden, detaljene i et eget ark.
function preBarHTML(c){
  if(!preCardHTML(c)) return "";
  const need = knownCodes(preOf(c.code).need).filter(k => !preReady(k));
  return `<button class="prebar" data-a="preopen">${I.steps}<span>${esc(t("preBar"))}: <b>${need.map(k => esc(courseShort(COURSE(k)))).join(" · ")}</b></span>${I.chevron}</button>`;
}
