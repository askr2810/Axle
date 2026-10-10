// ============================================================
//  HURTIGSØK på Lær (forsiden) og Øv: skriv et emne og gå rett til teorien eller øvingen.
//  Bruker samme indeks som søket i Teori-fanen (bkSearch), men løfter fram fagene du har valgt.
//  + Små «dytt» etter fullførte økter: slå på påminnelser (etter 3 økter) og legg Axle på hjemskjermen (etter 5).
// ============================================================
let QS = { q: "" };
function qsHits(q){
  const mine = new Set(myCourses().map(c => c.code)), cur = S.current;
  return bkSearch(q).map(h => ({ ...h, score: h.score + (h.it.code === cur ? 40 : mine.has(h.it.code) ? 25 : 0) })).sort((a, b) => b.score - a.score).slice(0, 8);
}
function qsResultsHTML(place){
  const q = QS.q.trim(); if(q.length < 2) return "";
  const hits = qsHits(q);
  const tasks = typeof catSearch === "function" ? catSearch(q).slice(0, 3) : [];
  const taskHTML = tasks.map(e => `<div class="qs-hit qs-task"><button class="qs-main" data-a="catgo" data-c="${e.code}" data-u="${e.u}" data-id="${e.id}"><small>📚 ${esc(T("Løst oppgave", "Solved problem"))} · ${esc(courseName(COURSE(e.code)))}</small><span class="qs-tp">${(() => { const it = catItem(COURSE(e.code), e.id); return it ? rich(it.prompt) : esc(e.title); })()}</span></button></div>`).join("");
  if(!hits.length && !tasks.length) return `<p class="qs-empty">${esc(T("Fant ingen emner. Prøv et annet ord, eller se alle fag i Teori-fanen.", "No topics found. Try another word, or see all subjects in the Theory tab."))}</p>`;
  return (tasks.length ? `<div class="qs-sub">📚 ${esc(T("Løste oppgaver", "Solved problems"))}</div>` + taskHTML + (hits.length ? `<div class="qs-sub">📖 ${esc(T("Teori og emner", "Theory and topics"))}</div>` : "") : "") + hits.map(({ it, snip }) => {
    const c = COURSE(it.code), read = it.id ? `data-a="bktopic" data-c="${esc(it.code)}" data-id="${esc(it.id)}"` : `data-a="bkunit" data-c="${esc(it.code)}" data-u="${it.u}"`;
    const prac = c && c.units[it.u] ? `<button class="qs-go" data-a="bktopicpractice" data-c="${esc(it.code)}" data-u="${it.u}">✏️ ${esc(T("Øv", "Practise"))}</button>` : "";
    const readBtn = `<button class="qs-go ${place === "practice" ? "ghost" : ""}" ${read}>📖 ${esc(T("Les", "Read"))}</button>`;
    return `<div class="qs-hit"><button class="qs-main" ${place === "practice" && prac ? `data-a="bktopicpractice" data-c="${esc(it.code)}" data-u="${it.u}"` : read}>
        <small>${esc(it.id ? T("Emne", "Topic") + " · " : "")}${esc(it.course)}</small><b>${esc(it.title)}</b><span>${bkMark(snip, q)}</span></button>
      <div class="qs-acts">${place === "practice" ? prac + readBtn : readBtn + prac}</div></div>`; }).join("");
}
// Eksempel i søkefeltet som passer studiet
const QS_EX = () => ({ barn: ["brøk", "fractions"], ungdom: ["Pytagoras", "Pythagoras"], syk: ["blodtrykk", "blood pressure"], forer: ["vikeplikt", "right of way"], jus: ["avtaler", "contracts"], oko: ["budsjett", "budget"], vgs: ["derivasjon", "derivatives"] })[typeof curStudy === "function" ? curStudy() : "ing"] || ["derivasjon", "derivatives"];
function qsHTML(place){
  return `<div class="qs" data-place="${place}"><label class="bk-search qs-box">${I.search}<input type="search" class="qs-in" placeholder="${esc(place === "practice" ? T("Hva vil du øve på? F.eks. «brøk» eller «vikeplikt»", "What do you want to practise? E.g. \"fractions\"") : T(`Søk etter et emne, f.eks. «${QS_EX()[0]}»`, `Search for a topic, e.g. "${QS_EX()[1]}"`))}" aria-label="${esc(T("Søk etter emne", "Search for a topic"))}" value="${esc(QS.q)}" autocomplete="off" enterkeyhint="search"></label>
    <div class="qs-res" aria-live="polite">${qsResultsHTML(place)}</div></div>`;
}
document.addEventListener("input", e => {
  const inp = e.target.closest && e.target.closest(".qs-in"); if(!inp) return;
  QS.q = inp.value; const box = inp.closest(".qs"); box.querySelector(".qs-res").innerHTML = qsResultsHTML(box.dataset.place);
  clearTimeout(qsHTML.t); qsHTML.t = setTimeout(() => { if(QS.q.trim().length > 2 && typeof stEv === "function") stEv("search", box.dataset.place, QS.q.trim().length); }, 1500);
});

// ---------- dytt etter fullførte økter ----------
let QS_INSTALL = null; // Chrome/Edge/Android: lagret installasjonsspørsmål
addEventListener("beforeinstallprompt", e => { e.preventDefault(); QS_INSTALL = e; });
addEventListener("appinstalled", () => { QS_INSTALL = null; (S.nudge ||= {}).home = "done"; save(); });
const qsStandalone = () => typeof IS_STANDALONE !== "undefined" && IS_STANDALONE;
// Kalles én gang per fullført økt (fra renderDone). Returnerer et kort eller "".
function nudgeHTML(r){
  if(typeof NATIVE !== "undefined" && NATIVE) return "";
  const N = (S.nudge ||= {});
  if(!r.nudgeCounted){ r.nudgeCounted = true; N.n = (N.n || 0) + 1; save(); }
  if(r.nudge === undefined){
    r.nudge = "";
    const canPush = typeof pushSupported === "function" && pushSupported() && !(S.reminder && S.reminder.on) && typeof Notification !== "undefined" && Notification.permission !== "denied";
    const iosNeedsHome = typeof IS_IOS !== "undefined" && IS_IOS && !qsStandalone();
    const due = k => N.n >= (N[k + "At"] || 0) && (N[k + "No"] || 0) < 3 && N[k] !== "done";
    if(N.n >= 3 && due("push") && (canPush || iosNeedsHome && !(S.reminder && S.reminder.on))) r.nudge = "push";
    else if(N.n >= 5 && !qsStandalone() && due("home")) r.nudge = "home";
  }
  if(r.nudge === "push") return `<div class="nudge"><span class="nudge-ic" aria-hidden="true">🔔</span><div><b>${esc(T("Vil du ha en liten påminnelse?", "Want a little reminder?"))}</b>
      <p>${esc(T("Én melding om dagen når rekka di er i fare – aldri mer. Du kan slå den av når som helst i Innstillinger.", "One message a day when your streak is at risk – never more. You can turn it off any time in Settings."))}</p>
      <div class="nudge-btns"><button class="big" data-a="nudgepush">${esc(T("Slå på påminnelser", "Turn on reminders"))}</button><button class="exlink" data-a="nudgeno" data-k="push">${esc(T("Ikke nå", "Not now"))}</button></div></div></div>`;
  if(r.nudge === "home") return `<div class="nudge"><span class="nudge-ic" aria-hidden="true">📲</span><div><b>${esc(T("Legg Axle på hjemskjermen", "Add Axle to your home screen"))}</b>
      <p>${esc(T("Da åpner du Axle med ett trykk, i fullskjerm som en vanlig app – helt gratis.", "Then you open Axle with one tap, full screen like a normal app – completely free."))}</p>
      <div class="nudge-btns"><button class="big" data-a="nudgehome">${esc(QS_INSTALL ? T("Installer", "Install") : T("Vis meg hvordan", "Show me how"))}</button><button class="exlink" data-a="nudgeno" data-k="home">${esc(T("Ikke nå", "Not now"))}</button></div></div></div>`;
  return "";
}
// Steg for steg for plattformen du er på.
function homeGuideHTML(){
  const ua = navigator.userAgent, ios = typeof IS_IOS !== "undefined" && IS_IOS, android = /Android/i.test(ua), safariIos = ios && !/CriOS|FxiOS|EdgiOS/.test(ua);
  const steps = ios ? (safariIos ? [T("Trykk på Del-knappen ⬆️ nederst (eller øverst) i Safari.", "Tap the Share button ⬆️ at the bottom (or top) of Safari."), T("Bla ned og velg «Legg til på Hjem-skjerm».", "Scroll down and choose \"Add to Home Screen\"."), T("Trykk «Legg til». Nå ligger Axle blant appene dine.", "Tap \"Add\". Axle is now among your apps.")]
      : [T("Åpne axle.no i Safari – det er bare Safari som kan legge nettsider på hjemskjermen på iPhone.", "Open axle.no in Safari – only Safari can add web pages to the home screen on iPhone."), T("Trykk på Del-knappen ⬆️ og velg «Legg til på Hjem-skjerm».", "Tap the Share button ⬆️ and choose \"Add to Home Screen\".")])
    : android ? [T("Trykk på menyen ⋮ øverst til høyre i Chrome.", "Tap the menu ⋮ at the top right in Chrome."), T("Velg «Installer app» eller «Legg til på startskjermen».", "Choose \"Install app\" or \"Add to Home screen\"."), T("Bekreft. Axle dukker opp blant appene dine.", "Confirm. Axle appears among your apps.")]
    : [T("I Chrome eller Edge: trykk på installer-ikonet ⊕ til høyre i adressefeltet.", "In Chrome or Edge: click the install icon ⊕ at the right of the address bar."), T("Eller åpne menyen ⋮ og velg «Installer Axle».", "Or open the menu ⋮ and choose \"Install Axle\"."), T("Axle åpnes da i eget vindu og kan festes til oppgavelinjen.", "Axle then opens in its own window and can be pinned to the taskbar.")];
  return `<div class="dialog hg" role="dialog" aria-label="${esc(T("Legg Axle på hjemskjermen", "Add Axle to your home screen"))}"><div class="sheet-h"><h3>📲 ${esc(T("Legg Axle på hjemskjermen", "Add Axle to your home screen"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    <ol class="hg-steps">${steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    ${ios ? `<p class="lp-note">${esc(T("På iPhone må Axle ligge på hjemskjermen for at påminnelser skal virke.", "On iPhone, Axle must be on the home screen for reminders to work."))}</p>` : ""}
    <button class="big" data-a="closeov">${esc(T("Skjønner", "Got it"))}</button></div>`;
}
function nudgeClick(a, b){
  if(!a.startsWith("nudge")) return false;
  const N = (S.nudge ||= {}), done = () => { if(L && L.result) L.result.nudge = ""; save(); render(); };
  if(a === "nudgeno"){ const k = b.dataset.k; N[k + "No"] = (N[k + "No"] || 0) + 1; N[k + "At"] = (N.n || 0) + 10; done(); return true; }
  if(a === "nudgepush"){
    if(typeof IS_IOS !== "undefined" && IS_IOS && !qsStandalone()){ overlay = { homeGuide: 1 }; renderOverlay(); return true; }
    S.reminder ||= { on: false, time: "19:00" }; S.reminder.on = true; save();
    pushEnable().then(ok => { if(ok){ N.push = "done"; toast(T("Påminnelser er på 🔔", "Reminders are on 🔔")); if(typeof stEv === "function") stEv("push", "nudge", "on"); } done(); });
    return true;
  }
  if(a === "nudgehome"){
    if(QS_INSTALL){ const p = QS_INSTALL; QS_INSTALL = null; p.prompt(); p.userChoice.then(c => { if(c && c.outcome === "accepted"){ N.home = "done"; } else { N.homeNo = (N.homeNo || 0) + 1; N.homeAt = (N.n || 0) + 10; } done(); }).catch(done); return true; }
    overlay = { homeGuide: 1 }; renderOverlay(); N.homeAt = (N.n || 0) + 15; save(); return true;
  }
  return false;
}

// «Last ned Axle»: én side som sier hvordan du får Axle som app på enheten du bruker, og på Mac/Windows.
function dlHTML(){
  const ua = navigator.userAgent, ios = typeof IS_IOS !== "undefined" && IS_IOS, android = /Android/i.test(ua), desk = !ios && !android, ready = !!CONFIG.desktopReady;
  const rel = "https://github.com/askr2810/axle/releases/latest/download/";
  const here = typeof NATIVE !== "undefined" && NATIVE ? `<p class="dl-ok">✓ ${esc(T("Du bruker allerede Axle-appen.", "You are already using the Axle app."))}</p>`
    : qsStandalone() ? `<p class="dl-ok">✓ ${esc(T("Axle ligger allerede som app på denne enheten.", "Axle is already installed as an app on this device."))}</p>`
    : `<p>${esc(T("Legg Axle på hjemskjermen – da åpnes den med ett trykk, i fullskjerm, og virker uten nett.", "Add Axle to your home screen – it opens with one tap, full screen, and works offline."))}</p>
       <button class="big" data-a="nudgehome">${esc(QS_INSTALL ? T("Installer Axle", "Install Axle") : T("Vis meg hvordan", "Show me how"))}</button>`;
  return `<div class="dialog dl" role="dialog" aria-label="${esc(T("Last ned Axle", "Download Axle"))}"><div class="sheet-h"><h3>⬇️ ${esc(T("Last ned Axle", "Download Axle"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(T("Lukk", "Close"))}">${I.x}</button></div>
    <section class="dl-sec"><b>${esc(ios ? T("På denne iPhonen/iPaden", "On this iPhone/iPad") : android ? T("På denne Android-telefonen", "On this Android phone") : T("På denne maskinen", "On this computer"))}</b>${here}</section>
    <section class="dl-sec"><b>${esc(T("Mac og Windows", "Mac and Windows"))}</b>
      ${ready ? `<div class="dl-btns"><a class="kbtn" href="${rel}Axle.dmg">${esc(T("Last ned for Mac", "Download for Mac"))}</a><a class="kbtn ghost" href="${rel}Axle-Setup.exe">${esc(T("Last ned for Windows", "Download for Windows"))}</a></div>
        ${dlStepsHTML(T)}`
        : `<p class="lp-note">${esc(T("Kommer snart. Til da kan du bruke axle.no i nettleseren, eller installere den som app fra nettleseren" + (desk ? " (knappen over)." : "."), "Coming soon. Until then you can use axle.no in the browser, or install it as an app from the browser" + (desk ? " (the button above)." : ".")))}</p>`}</section>
    <section class="dl-sec"><b>App Store og Google Play</b><p class="lp-note">${esc(T("Kommer. Nettappen over har alt det samme i mellomtiden.", "Coming. The web app above has everything in the meantime."))}</p></section>
    <a class="exlink dl-about" href="${LANG === "en" ? "/en/about/" : "/about/"}" target="_blank" rel="noopener">${esc(T("Les mer om Axle", "Read more about Axle"))} →</a></div>`;
}
