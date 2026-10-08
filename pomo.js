// ============================================================
//  HJELPEMIDLER: Pomodoro-timer med en flytende «øy» øverst på skjermen.
//  Jobb 25 min → pause 5 min (lengdene kan velges). Øya følger deg gjennom hele appen og viser tiden igjen;
//  trykk på den for pause, hopp over eller stopp. Ved slutt: lyd, vibrasjon og beskjed.
//  Tilstand i S.pomo = { phase: "work" | "break", end, left (ved pause), running, work, brk, done }.
// ============================================================
const PO_SETS = [[25, 5], [50, 10], [15, 3]];
const po = () => (S.pomo ||= { phase: "work", running: false, work: 25, brk: 5, done: 0 });
let PO_TICK = 0, PO_OPEN = false;
const poLen = p => (p.phase === "work" ? p.work : p.brk) * 60000;
const poLeft = p => p.running ? Math.max(0, p.end - Date.now()) : (p.left ?? poLen(p));
const poFmt = ms => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function poStart(){ const p = po(); p.running = true; p.end = Date.now() + (p.left ?? poLen(p)); delete p.left; save(); poRun(); if(typeof stEv === "function") stEv("pomo", p.phase, "start"); }
function poPause(){ const p = po(); p.left = poLeft(p); p.running = false; save(); poRun(); }
function poStop(){ const p = po(); p.running = false; delete p.left; p.phase = "work"; save(); PO_OPEN = false; poRun(); }
function poNext(){ const p = po(); if(p.phase === "work") p.done = (p.done || 0) + 1; p.phase = p.phase === "work" ? "break" : "work"; delete p.left; p.end = Date.now() + poLen(p); save(); }
function poRing(){
  const p = po(), work = p.phase === "work";
  if(typeof sfx === "function") sfx("complete"); if(navigator.vibrate) try{ navigator.vibrate([200, 100, 200]); }catch(e){}
  const msg = work ? T("Pause! Reis deg, drikk vann, se bort fra skjermen 🌿", "Break time! Stand up, drink water, look away from the screen 🌿") : T("Pausen er over – en ny økt 🍅", "Break is over – a new session 🍅");
  toast(msg);
  try{ if("Notification" in window && Notification.permission === "granted" && document.visibilityState !== "visible") new Notification("Axle", { body: msg, icon: "icons/icon-192.png" }); }catch(e){}
  poNext(); poRun();
}
// Øya: liten pille øverst, utvides ved trykk
function poRun(){
  clearInterval(PO_TICK); const p = po();
  let el = document.getElementById("po-island");
  const show = p.running || p.left != null;
  if(!show){ if(el) el.remove(); return; }
  if(!el){ el = document.createElement("div"); el.id = "po-island"; el.setAttribute("role", "timer"); document.body.appendChild(el);
    el.addEventListener("click", e => { const b = e.target.closest("[data-po]"); if(!b){ PO_OPEN = !PO_OPEN; poDraw(); return; } e.stopPropagation();
      const a = b.dataset.po; if(a === "pause") poPause(); else if(a === "play") poStart(); else if(a === "skip"){ poNext(); poRun(); } else if(a === "stop") poStop(); }); }
  poDraw(); if(p.running) PO_TICK = setInterval(() => { if(poLeft(po()) <= 0) poRing(); else poDraw(); }, 1000);
}
function poDraw(){
  const el = document.getElementById("po-island"); if(!el) return; const p = po(), left = poLeft(p), frac = 1 - left / poLen(p), work = p.phase === "work";
  const ring = `<svg class="po-ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" class="po-rb"/><circle cx="18" cy="18" r="15" class="po-rf" style="stroke-dasharray:${(94.25 * frac).toFixed(1)} 94.25"/></svg>`;
  el.className = (work ? "work" : "brk") + (PO_OPEN ? " open" : "") + (p.running ? "" : " paused");
  el.innerHTML = `<span class="po-main">${ring}<span class="po-ic">${work ? "🍅" : "🌿"}</span><b>${poFmt(left)}</b>${PO_OPEN ? `<small>${esc(work ? T("Fokus", "Focus") : T("Pause", "Break"))} · ${esc(T(`${p.done || 0} økter i dag`, `${p.done || 0} sessions today`))}</small>` : ""}</span>
    ${PO_OPEN ? `<span class="po-btns">${p.running ? `<button data-po="pause" aria-label="${esc(T("Pause", "Pause"))}">⏸</button>` : `<button data-po="play" aria-label="${esc(T("Fortsett", "Resume"))}">▶</button>`}<button data-po="skip" aria-label="${esc(T("Hopp til neste", "Skip to next"))}">⏭</button><button data-po="stop" aria-label="${esc(T("Stopp", "Stop"))}">⏹</button></span>` : ""}`;
  el.setAttribute("aria-label", (work ? T("Fokus", "Focus") : T("Pause", "Break")) + " " + poFmt(left));
}
// Kort i Øv (Hjelpemidler)
function poCardHTML(){
  const p = po(), on = p.running || p.left != null;
  return `<section class="po-card"><div class="po-h"><span aria-hidden="true">🍅</span><div><b>${esc(T("Pomodoro", "Pomodoro"))}</b><small>${esc(T("Jobb konsentrert, ta en kort pause, gjenta. Tiden vises i en liten øy øverst mens du bruker appen.", "Work focused, take a short break, repeat. The time shows in a small island at the top while you use the app."))}</small></div></div>
    <div class="seg po-sets">${PO_SETS.map(([w, b]) => `<button class="${p.work === w ? "on" : ""}" data-a="posset" data-w="${w}" data-b="${b}">${w}/${b} min</button>`).join("")}</div>
    <button class="big ${on ? "ghost" : ""}" data-a="${on ? "postop" : "postart"}">${esc(on ? T("Stopp timeren", "Stop the timer") : T(`Start ${p.work} min fokus`, `Start ${p.work} min focus`))}</button></section>`;
}
function poClick(a, b){
  if(!a.startsWith("pos")) return false;
  const p = po();
  if(a === "posset"){ if(p.running) return true; p.work = +b.dataset.w; p.brk = +b.dataset.b; delete p.left; p.phase = "work"; save(); render(); return true; }
  if(a === "postart"){ p.phase = "work"; delete p.left; poStart(); render(); if("Notification" in window && Notification.permission === "default") try{ Notification.requestPermission(); }catch(e){} return true; }
  if(a === "postop"){ poStop(); render(); return true; }
  return false;
}
// Ny dag: nullstill telleren. Fortsett en timer som gikk da appen ble lukket.
addEventListener("load", () => { try{ const p = po(); if(p.day !== dayKey()){ p.day = dayKey(); p.done = 0; } if(p.running && poLeft(p) <= 0){ p.running = false; p.phase = "work"; delete p.left; } poRun(); }catch(e){} });
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible" && S && S.pomo && S.pomo.running && poLeft(S.pomo) <= 0) poRing(); });
