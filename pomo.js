// ============================================================
//  HJELPEMIDLER: Pomodoro-timer.
//  • En flytende «øy» øverst viser tiden mens du bruker resten av appen (trykk for pause, hopp over, stopp).
//  • Fokusskjermen (#/pomodoro) er et rolig rom med bare tiden: stor ring, valgfri bakgrunn, fullskjerm,
//    og innstillinger for lengder, lang pause, automatisk start og lyd.
//  • «Skjul tiden»: øya forsvinner og fokusskjermen viser ingen tall. Når tiden er ute, popper et vindu fram.
//  Tilstand i S.pomo = { phase: "work" | "break" | "long", end, left (ved pause), running, work, brk, long, every,
//                        auto, sound, hide, bg, task, done, day }.
// ============================================================
const PO_SETS = [[25, 5], [50, 10], [15, 3]];
const PO_BG = { natt: ["Natt", "Night", "linear-gradient(160deg,#0E1424,#1B2340 60%,#26244A)"], skog: ["Skog", "Forest", "linear-gradient(160deg,#0F2A20,#1D4A36 55%,#2E6B4B)"],
  hav: ["Hav", "Ocean", "linear-gradient(160deg,#0B2236,#12466B 55%,#1F7A9C)"], solnedgang: ["Solnedgang", "Sunset", "linear-gradient(160deg,#3A1838,#8A3A4F 50%,#E0805A)"],
  papir: ["Papir", "Paper", "linear-gradient(160deg,#F6F1E7,#EFE6D4)"], svart: ["Svart", "Black", "#000"] };
const po = () => { const p = (S.pomo ||= { phase: "work", running: false, work: 25, brk: 5, done: 0 });
  p.long ??= 15; p.every ??= 4; p.auto ??= false; p.sound ??= true; p.hide ??= false; p.bg ??= "natt"; return p; };
const PO_EYEOFF = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7c2 0 3.7.7 5.1 1.6M22 12s-3.6 7-10 7c-2 0-3.7-.7-5.1-1.6"/><path d="M4 20 20 4"/></svg>`;
let PO_TICK = 0, PO_OPEN = false, PO_SET = false, PO_PEEK = false, PO_WAKE = null, PO_FROM = "practice";
const poLen = p => (p.phase === "work" ? p.work : p.phase === "long" ? p.long : p.brk) * 60000;
const poLeft = p => p.running ? Math.max(0, p.end - Date.now()) : (p.left ?? poLen(p));
const poFmt = ms => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const poPhaseName = ph => ph === "work" ? T("Fokus", "Focus") : ph === "long" ? T("Lang pause", "Long break") : T("Pause", "Break");
function poStart(){ const p = po(); p.running = true; p.end = Date.now() + (p.left ?? poLen(p)); delete p.left; save(); poRun(); if(typeof stEv === "function") stEv("pomo", p.phase, "start"); }
function poPause(){ const p = po(); p.left = poLeft(p); p.running = false; save(); poRun(); }
function poStop(){ const p = po(); p.running = false; delete p.left; p.phase = "work"; save(); PO_OPEN = false; poRun(); }
// Neste fase. Etter hver «every»-te økt kommer en lang pause. Uten automatisk start venter den nye fasen på deg.
function poNext(auto){ const p = po();
  if(p.phase === "work"){ p.done = (p.done || 0) + 1; p.phase = p.done % p.every === 0 ? "long" : "break"; } else p.phase = "work";
  delete p.left; if(auto){ p.running = true; p.end = Date.now() + poLen(p); } else { p.running = false; p.left = poLen(p); } save(); }
// Myk klokkeklang (tre toner) – egen bryter, uavhengig av appens øvrige lyder
function poChime(){ const p = po(); if(!p.sound || typeof sfxCtx !== "function" || !sfxCtx()) return;
  try{ [[659, 0], [784, .22], [988, .44]].forEach(([f, at]) => sfxTone(f, at, 1.6, { vol: .14, bell: true })); }catch(e){} }
function poRing(){
  const p = po(), was = p.phase;
  poChime(); if(navigator.vibrate) try{ navigator.vibrate([200, 100, 200]); }catch(e){}
  const msg = was === "work" ? T("Bra jobba! Tid for pause 🌿", "Well done! Time for a break 🌿") : T("Pausen er over – klar for en ny økt? 🍅", "Break is over – ready for a new session? 🍅");
  try{ if("Notification" in window && Notification.permission === "granted" && document.visibilityState !== "visible") new Notification("Axle", { body: msg, icon: "icons/icon-192.png" }); }catch(e){}
  poNext(p.auto); poRun();
  // Tiden er ute: et vindu popper fram (også når tiden var skjult). På fokusskjermen holder det med skjermen selv.
  if(screen === "pomo" && !p.hide) toast(msg); else poPop(was);
}
// ---------- vinduet som popper fram ----------
function poPop(was){
  document.getElementById("po-pop")?.remove(); const p = po(), work = was === "work", el = document.createElement("div");
  el.id = "po-pop"; el.setAttribute("role", "alertdialog");
  const next = p.phase, mins = Math.round(poLen(p) / 60000);
  el.innerHTML = `<div class="po-popc"><div class="po-popi">${work ? "🌿" : "🍅"}</div><h3>${esc(work ? T("Tiden er ute – bra jobba!", "Time's up – well done!") : T("Pausen er over", "Break is over"))}</h3>
    <p>${esc(work ? T(`Du har fullført ${p.done} ${p.done === 1 ? "økt" : "økter"} i dag. Reis deg, drikk vann og se bort fra skjermen.`, `You have finished ${p.done} ${p.done === 1 ? "session" : "sessions"} today. Stand up, drink water and look away from the screen.`) : T("Klar for en ny runde med fokus?", "Ready for another round of focus?"))}</p>
    <div class="po-popb">${p.running ? `<button class="big" data-pp="ok">${esc(T("OK", "OK"))}</button>` : `<button class="big" data-pp="go">${esc(T(`Start ${poPhaseName(next).toLowerCase()} (${mins} min)`, `Start ${poPhaseName(next).toLowerCase()} (${mins} min)`))}</button>
      ${next !== "work" ? `<button class="big ghost" data-pp="skip">${esc(T("Hopp over pausen", "Skip the break"))}</button>` : ""}`}
      <button class="big ghost" data-pp="stop">${esc(T("Avslutt for nå", "Stop for now"))}</button></div></div>`;
  el.addEventListener("click", e => { const b = e.target.closest("[data-pp]"); if(!b) return; const a = b.dataset.pp; el.remove();
    if(a === "go") poStart(); else if(a === "skip"){ poNext(false); poStart(); } else if(a === "stop") poStop();
    if(screen === "pomo") render(); });
  document.body.appendChild(el);
}
// ---------- øya: liten pille øverst, utvides ved trykk ----------
function poRun(){
  clearInterval(PO_TICK); const p = po();
  let el = document.getElementById("po-island");
  const show = p.running || p.left != null;
  if(!show){ if(el) el.remove(); poWake(false); poScreenTick(); return; }
  if(!el){ el = document.createElement("div"); el.id = "po-island"; el.setAttribute("role", "timer"); document.body.appendChild(el);
    el.addEventListener("click", e => { const b = e.target.closest("[data-po]"); if(!b){ PO_OPEN = !PO_OPEN; poDraw(); return; } e.stopPropagation();
      const a = b.dataset.po; if(a === "pause") poPause(); else if(a === "play") poStart(); else if(a === "skip"){ poNext(po().auto || po().running); poRun(); } else if(a === "stop") poStop();
      else if(a === "full"){ PO_OPEN = false; poOpen(); } }); }
  poDraw(); poWake(p.running && screen === "pomo");
  if(p.running) PO_TICK = setInterval(() => { if(poLeft(po()) <= 0) poRing(); else poDraw(); }, 1000);
}
function poDraw(){
  const el = document.getElementById("po-island"), p = po();
  if(el){
    el.hidden = screen === "pomo" || !!p.hide;
    const left = poLeft(p), frac = 1 - left / poLen(p), work = p.phase === "work";
    const ring = `<svg class="po-ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" class="po-rb"/><circle cx="18" cy="18" r="15" class="po-rf" style="stroke-dasharray:${(94.25 * frac).toFixed(1)} 94.25"/></svg>`;
    el.className = (work ? "work" : "brk") + (PO_OPEN ? " open" : "") + (p.running ? "" : " paused");
    el.innerHTML = `<span class="po-main">${ring}<span class="po-ic">${work ? "🍅" : "🌿"}</span><b>${poFmt(left)}</b>${PO_OPEN ? `<small>${esc(poPhaseName(p.phase))} · ${esc(T(`${p.done || 0} økter i dag`, `${p.done || 0} sessions today`))}</small>` : ""}</span>
      ${PO_OPEN ? `<span class="po-btns">${p.running ? `<button data-po="pause" aria-label="${esc(T("Pause", "Pause"))}">⏸</button>` : `<button data-po="play" aria-label="${esc(T("Fortsett", "Resume"))}">▶</button>`}<button data-po="skip" aria-label="${esc(T("Hopp til neste", "Skip to next"))}">⏭</button><button data-po="stop" aria-label="${esc(T("Stopp", "Stop"))}">⏹</button><button data-po="full" aria-label="${esc(T("Åpne fokusskjermen", "Open the focus screen"))}">⛶</button></span>` : ""}`;
    el.setAttribute("aria-label", poPhaseName(p.phase) + " " + poFmt(left));
  }
  poScreenTick();
}
// Hold skjermen våken på fokusskjermen mens tiden går
async function poWake(on){
  try{ if(on && !PO_WAKE && navigator.wakeLock) PO_WAKE = await navigator.wakeLock.request("screen");
    else if(!on && PO_WAKE){ PO_WAKE.release(); PO_WAKE = null; } }catch(e){ PO_WAKE = null; }
}
// ---------- fokusskjermen ----------
function poOpen(from){ PO_FROM = from || (screen !== "pomo" ? screen : PO_FROM); PO_SET = false; PO_PEEK = false; screen = "pomo"; render(); window.scrollTo(0, 0); }
const poDots = p => { const n = p.every, k = (p.done || 0) % n, full = p.phase !== "work" && k === 0 && p.done ? n : k;
  return `<div class="pos-dots" aria-label="${esc(T(`${full} av ${n} økter før lang pause`, `${full} of ${n} sessions before a long break`))}">${Array.from({ length: n }, (_, i) => `<i class="${i < full ? "on" : ""}"></i>`).join("")}</div>`; };
function renderPomo(){
  const p = po(), left = poLeft(p), on = p.running || p.left != null, hid = p.hide && !PO_PEEK, R = 120, C = 2 * Math.PI * R;
  const light = p.bg === "papir", bg = (PO_BG[p.bg] || PO_BG.natt)[2];
  const ring = `<svg class="pos-ring" viewBox="0 0 280 280" aria-hidden="true"><circle cx="140" cy="140" r="${R}" class="pos-rb"/><circle cx="140" cy="140" r="${R}" class="pos-rf" id="pos-rf" style="stroke-dasharray:${(C * (1 - left / poLen(p))).toFixed(1)} ${C.toFixed(1)}"/></svg>`;
  const stepper = (k, lo, hi, step, label) => `<div class="pos-st"><span>${esc(label)}</span><div><button data-a="posstep" data-k="${k}" data-d="${-step}" data-lo="${lo}" data-hi="${hi}" aria-label="−">−</button><b>${p[k]}${k === "every" ? "" : " min"}</b><button data-a="posstep" data-k="${k}" data-d="${step}" data-lo="${lo}" data-hi="${hi}" aria-label="+">+</button></div></div>`;
  const tog = (k, label, sub) => `<label class="pos-tog"><span><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span><input type="checkbox" data-a="postog" data-k="${k}" ${p[k] ? "checked" : ""}></label>`;
  const settings = PO_SET ? `<section class="pos-set" aria-label="${esc(T("Innstillinger", "Settings"))}">
      <h3>${esc(T("Tilpass timeren", "Customise the timer"))}</h3>
      <div class="seg pos-pre">${PO_SETS.map(([w, b]) => `<button class="${p.work === w && p.brk === b ? "on" : ""}" data-a="posset" data-w="${w}" data-b="${b}">${w}/${b}</button>`).join("")}</div>
      ${stepper("work", 5, 120, 5, T("Fokus", "Focus"))}${stepper("brk", 1, 30, 1, T("Kort pause", "Short break"))}${stepper("long", 5, 60, 5, T("Lang pause", "Long break"))}${stepper("every", 2, 8, 1, T("Lang pause etter antall økter", "Long break after sessions"))}
      ${tog("auto", T("Start neste fase automatisk", "Start the next phase automatically"), T("Ellers venter timeren på deg når tiden er ute.", "Otherwise the timer waits for you when time is up."))}
      ${tog("sound", T("Klokkeklang når tiden er ute", "Chime when time is up"))}
      ${tog("hide", T("Skjul tiden mens jeg jobber", "Hide the time while I work"), T("Ingen nedtelling å stirre på. Et vindu popper fram når tiden er ute.", "No countdown to stare at. A window pops up when time is up."))}
      <div class="pos-bgs" role="radiogroup" aria-label="${esc(T("Bakgrunn", "Background"))}">${Object.entries(PO_BG).map(([k, v]) => `<button role="radio" aria-checked="${p.bg === k}" class="${p.bg === k ? "on" : ""}" data-a="posbg" data-k="${k}" style="background:${v[2]}"><span>${esc(T(v[0], v[1]))}</span></button>`).join("")}</div>
    </section>` : "";
  const center = hid
    ? `<div class="pos-hid"><span class="pos-big-ic">${p.phase === "work" ? "🍅" : "🌿"}</span><b>${esc(p.running ? T("Tiden er skjult", "The time is hidden") : poPhaseName(p.phase))}</b><small>${esc(p.running ? T("Jobb i ro – du får beskjed når tiden er ute.", "Work in peace – you will be told when time is up.") : T("Trykk start når du er klar.", "Press start when you are ready."))}</small>${p.running ? `<button class="pos-peek" data-a="pospeek">${esc(T("Kikk på tiden", "Peek at the time"))}</button>` : ""}</div>`
    : `<div class="pos-face">${ring}<div class="pos-mid"><small id="pos-ph">${esc(poPhaseName(p.phase))}</small><b id="pos-time">${poFmt(left)}</b>${poDots(p)}</div></div>`;
  $app.innerHTML = `<div class="pos ${light ? "light" : ""} ph-${p.phase} ${p.running ? "run" : ""}" style="background:${bg}">
    <div class="pos-top"><button class="pos-ib" data-a="posback" aria-label="${esc(t("back"))}">${I.left}</button>
      <span class="pos-title">🍅 ${esc(T("Fokusrom", "Focus room"))}</span>
      <span class="pos-tr"><button class="pos-ib" data-a="poshide" aria-label="${esc(p.hide ? T("Vis tiden", "Show the time") : T("Skjul tiden", "Hide the time"))}" title="${esc(p.hide ? T("Vis tiden", "Show the time") : T("Skjul tiden", "Hide the time"))}">${p.hide ? I.eye : PO_EYEOFF}</button>
      <button class="pos-ib" data-a="posfull" aria-label="${esc(T("Fullskjerm", "Full screen"))}" title="${esc(T("Fullskjerm", "Full screen"))}">⛶</button>
      <button class="pos-ib ${PO_SET ? "on" : ""}" data-a="posgear" aria-label="${esc(T("Innstillinger", "Settings"))}" aria-expanded="${PO_SET}">${I.gear}</button></span></div>
    <main class="pos-main">
      <input class="pos-task" id="postask" maxlength="60" value="${esc(p.task || "")}" placeholder="${esc(T("Hva jobber du med? (valgfritt)", "What are you working on? (optional)"))}" aria-label="${esc(T("Hva jobber du med?", "What are you working on?"))}">
      ${center}
      <div class="pos-ctl">${on ? `<button class="pos-sm" data-a="posreset" aria-label="${esc(T("Stopp", "Stop"))}" title="${esc(T("Stopp", "Stop"))}">⏹</button>` : `<span class="pos-sm-sp"></span>`}
        <button class="pos-play" data-a="${p.running ? "pospause" : "posgo"}" aria-label="${esc(p.running ? T("Pause", "Pause") : T("Start", "Start"))}">${p.running ? "❚❚" : "▶"}</button>
        <button class="pos-sm" data-a="posskip" aria-label="${esc(T("Hopp til neste fase", "Skip to the next phase"))}" title="${esc(T("Hopp til neste fase", "Skip to the next phase"))}">⏭</button></div>
      <p class="pos-sub">${esc(T(`${p.work} min fokus · ${p.brk} min pause · ${p.done || 0} ${(p.done || 0) === 1 ? "økt" : "økter"} i dag`, `${p.work} min focus · ${p.brk} min break · ${p.done || 0} ${(p.done || 0) === 1 ? "session" : "sessions"} today`))}</p>
      ${settings}
    </main></div>`;
  const ti = document.getElementById("postask"); if(ti) ti.addEventListener("input", () => { po().task = ti.value.slice(0, 60); clearTimeout(renderPomo.t); renderPomo.t = setTimeout(save, 400); });
  poWake(p.running);
}
// Oppdater bare tallene hvert sekund (ikke hele skjermen, så innstillinger og tekstfeltet får være i fred)
function poScreenTick(){
  if(screen !== "pomo") return; const p = po(), tm = document.getElementById("pos-time"), rf = document.getElementById("pos-rf");
  if(tm) tm.textContent = poFmt(poLeft(p));
  if(rf){ const C = 2 * Math.PI * 120; rf.style.strokeDasharray = `${(C * (1 - poLeft(p) / poLen(p))).toFixed(1)} ${C.toFixed(1)}`; }
  document.title = (p.running && !p.hide ? poFmt(poLeft(p)) + " · " : "") + T("Fokusrom", "Focus room") + " – Axle";
}
// ---------- kort i Øv (Hjelpemidler) ----------
function poCardHTML(){
  const p = po(), on = p.running || p.left != null;
  return `<section class="po-card"><div class="po-h"><span aria-hidden="true">🍅</span><div><b>${esc(T("Pomodoro", "Pomodoro"))}</b><small>${esc(T("Jobb konsentrert, ta en kort pause, gjenta. Tiden vises i en liten øy øverst – eller åpne fokusrommet med bare klokken på skjermen.", "Work focused, take a short break, repeat. The time shows in a small island at the top – or open the focus room with just the clock on screen."))}</small></div></div>
    <div class="seg po-sets">${PO_SETS.map(([w, b]) => `<button class="${p.work === w ? "on" : ""}" data-a="posset" data-w="${w}" data-b="${b}">${w}/${b} min</button>`).join("")}</div>
    <div class="po-cbtn"><button class="big ${on ? "ghost" : ""}" data-a="${on ? "postop" : "postart"}">${esc(on ? T("Stopp timeren", "Stop the timer") : T(`Start ${p.work} min fokus`, `Start ${p.work} min focus`))}</button>
    <button class="big ghost" data-a="posopen">⛶ ${esc(T("Fokusrom", "Focus room"))}</button></div></section>`;
}
function poAskNotify(){ if("Notification" in window && Notification.permission === "default") try{ Notification.requestPermission(); }catch(e){} }
function poClick(a, b){
  if(!a.startsWith("pos")) return false;
  const p = po(), d = (b && b.dataset) || {};
  if(a === "posset"){ if(p.running) { toast(T("Stopp timeren først for å bytte lengde.", "Stop the timer first to change the length.")); return true; } p.work = +d.w; p.brk = +d.b; delete p.left; p.phase = "work"; save(); render(); return true; }
  if(a === "postart"){ p.phase = "work"; delete p.left; poStart(); render(); poAskNotify(); return true; }
  if(a === "postop" || a === "posreset"){ poStop(); render(); return true; }
  if(a === "posopen"){ poOpen(screen); return true; }
  if(a === "posback"){ if(document.fullscreenElement) try{ document.exitFullscreen(); }catch(e){} poWake(false); screen = PO_FROM && PO_FROM !== "pomo" ? PO_FROM : "practice"; render(); poDraw(); return true; }
  if(a === "posgo"){ poStart(); render(); poAskNotify(); return true; }
  if(a === "pospause"){ poPause(); render(); return true; }
  if(a === "posskip"){ poNext(p.running || p.auto); poRun(); render(); return true; }
  if(a === "posgear"){ PO_SET = !PO_SET; render(); if(PO_SET) setTimeout(() => document.querySelector(".pos-set")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 30); return true; }
  if(a === "poshide"){ p.hide = !p.hide; PO_PEEK = false; save(); render(); poDraw(); toast(p.hide ? T("Tiden er skjult. Du får beskjed når den er ute.", "The time is hidden. You will be told when it is up.") : T("Tiden vises igjen.", "The time is shown again.")); return true; }
  if(a === "pospeek"){ PO_PEEK = true; render(); clearTimeout(poClick.pk); poClick.pk = setTimeout(() => { PO_PEEK = false; if(screen === "pomo") render(); }, 4000); return true; }
  if(a === "posfull"){ try{ if(document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }catch(e){} return true; }
  if(a === "posbg"){ p.bg = d.k; save(); render(); return true; }
  if(a === "postog"){ p[d.k] = b.checked; save(); if(d.k === "hide"){ PO_PEEK = false; render(); poDraw(); } return true; }
  if(a === "posstep"){ const k = d.k, v = Math.min(+d.hi, Math.max(+d.lo, (p[k] || 0) + +d.d));
    if(p[k] === v) return true; p[k] = v;
    // endret lengden på fasen som står stille: start den på nytt med ny lengde
    if(!p.running && ((k === "work" && p.phase === "work") || (k === "brk" && p.phase === "break") || (k === "long" && p.phase === "long"))) delete p.left;
    save(); render(); poRun(); return true; }
  return false;
}
// Ny dag: nullstill telleren. En timer som gikk ut mens appen var lukket, venter på deg i stedet for å forsvinne.
addEventListener("load", () => { try{ const p = po(); if(p.day !== dayKey()){ p.day = dayKey(); p.done = 0; } if(p.running && poLeft(p) <= 0) poRing(); else poRun(); }catch(e){} });
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible" && S && S.pomo){ if(S.pomo.running && poLeft(S.pomo) <= 0) poRing(); if(PO_WAKE === null && screen === "pomo" && S.pomo.running) poWake(true); } });
document.addEventListener("keydown", e => { if(screen !== "pomo" || overlay || (e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) return;
  if(e.key === " "){ e.preventDefault(); poClick(po().running ? "pospause" : "posgo", null); } else if(e.key === "f" || e.key === "F") poClick("posfull", null); });
