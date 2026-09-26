// ============================================================
//  SPILL – korte, raske måter å lære på (laget for mobil og kort oppmerksomhet).
//  • Par-jakt: finn parene (begrep ↔ svar) så fort du kan. 3 runder à 5 par, feil gir +3 s.
//  • Sant eller usant: sveip høyre (sant) eller venstre (usant) på påstander i 45 sekunder.
//  Bruker pugge-kortene i studiet ditt (drPool) og flervalgsoppgaver fra fagene (snQuestion).
// ============================================================
let MT = null; // par-jakt: { round, rounds, pairs, left, right, sel, done, t0, pen, err, combo, finished }
let TF = null; // sant/usant: { end, score, combo, best, cur, started, done, timer, lastWrong }
const f1 = x => (+x).toFixed(1).replace(".", LANG === "en" ? "." : ",");
const GM_ROUNDS = 3, GM_PAIRS = 5, TF_SECS = 45;
const gmLen = s => String(s).replace(/\$[^$]*\$/g, m => "x".repeat(Math.min(12, m.length / 3))).length; // omtrentlig visningslengde (formler teller lite)

// ---------- Par-jakt ----------
function mtRoundPairs(){
  const pool = shuffle(drPool("all").filter(c => gmLen(drText(c[2])) <= 80 && gmLen(drText(c[3])) <= 44)), out = [], seenQ = new Set(), seenA = new Set();
  for(const c of pool){ const q = drText(c[2]), a = drText(c[3]); if(seenQ.has(q) || seenA.has(a)) continue; seenQ.add(q); seenA.add(a); out.push({ id: c[0], q, a }); if(out.length === GM_PAIRS) break; }
  return out;
}
function mtOpen(){ MT = { round: 0, pen: 0, err: 0, combo: 0, maxCombo: 0, best: ((S.matchBest || {})[curStudy()]) || 0 }; mtNewRound(); MT.t0 = Date.now(); overlay = null; screen = "match"; render(); mtTick(); }
function mtNewRound(){
  MT.pairs = mtRoundPairs(); MT.done = new Set(); MT.sel = null; MT.bad = null;
  MT.left = shuffle(MT.pairs.map((p, i) => i)); MT.right = shuffle(MT.pairs.map((p, i) => i));
}
function mtTime(){ return (Date.now() - MT.t0) / 1000 + MT.pen; }
function mtTick(){ clearInterval(MT.timer); MT.timer = setInterval(() => { if(screen !== "match" || !MT || MT.finished){ clearInterval(MT && MT.timer); return; } const el = document.getElementById("mttime"); if(el) el.textContent = f1(mtTime()); }, 100); }
function mtFinish(){
  clearInterval(MT.timer); MT.finished = true; MT.time = mtTime(); const key = curStudy(); S.matchBest ||= {};
  MT.newBest = !S.matchBest[key] || MT.time < S.matchBest[key]; if(MT.newBest) S.matchBest[key] = +MT.time.toFixed(1);
  MT.xp = Math.max(4, 15 - MT.err * 2); const st = awardXP(MT.xp); S.stats ||= {}; S.stats.games = (+S.stats.games || 0) + 1;
  bdgToast(checkBadges()); save(); render(); setTimeout(() => MT && MT.newBest ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}
function renderMatch(){
  if(!MT){ mtOpen(); return; }
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="gmclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(t("mtSub"))}</small><b>${esc(t("mtTitle"))}</b></div></div></div>`;
  if(MT.finished){
    $app.innerHTML = `${top}<main class="wrap sp-intro"><div class="sp-score">${f1(MT.time)}</div><h2>${esc(MT.newBest ? t("mtNewBest") : t("mtDone"))}</h2>
      <p>${esc(t("mtStats", MT.err, MT.maxCombo))}${MT.best && !MT.newBest ? " · " + esc(t("mtBest", f1(MT.best))) : ""}</p><div class="gd-xp">${I.bolt}+${MT.xp} XP</div>
      <button class="big sp-go" data-a="mtagain">${esc(t("spAgain"))}</button><button class="big ghost" data-a="gmclose">${esc(t("back"))}</button></main>`;
    return;
  }
  const cell = (side, i) => { const p = MT.pairs[i], done = MT.done.has(i), sel = MT.sel && MT.sel[0] === side && MT.sel[1] === i, bad = MT.bad && MT.bad.some(b => b[0] === side && b[1] === i);
    return `<button class="mt-c mt-${side} ${done ? "ok" : ""} ${sel ? "sel" : ""} ${bad ? "bad" : ""}" data-a="mtpick" data-s="${side}" data-i="${i}" ${done ? "disabled" : ""}>${rich(side === "q" ? p.q : p.a)}</button>`; };
  $app.innerHTML = `${top}<div class="mt-bar wrap"><span>${esc(t("mtRound", MT.round + 1, GM_ROUNDS))}</span><span class="mt-dots">${Array.from({ length: GM_ROUNDS }, (_, i) => `<i class="${i < MT.round ? "on" : i === MT.round ? "cur" : ""}"></i>`).join("")}</span><span class="mt-t">⏱ <b id="mttime">${f1(mtTime())}</b> s</span></div>
    <main class="wrap mt-grid"><div class="mt-col">${MT.left.map(i => cell("q", i)).join("")}</div><div class="mt-col">${MT.right.map(i => cell("a", i)).join("")}</div></main>
    <p class="mt-hint wrap">${esc(t("mtHint"))}</p>`;
}
function mtPick(side, i){
  if(!MT || MT.finished || MT.done.has(i)) return;
  if(!MT.sel || MT.sel[0] === side){ MT.sel = [side, i]; MT.bad = null; sfx("tap"); render(); return; }
  const other = MT.sel[1]; MT.sel = null;
  if(other === i){ MT.done.add(i); MT.combo++; MT.maxCombo = Math.max(MT.maxCombo, MT.combo); buzz(true); render(); sfx("ok", MT.combo);
    burst(document.querySelector(`.mt-c.mt-a[data-i="${i}"]`), 8);
    if(MT.done.size === MT.pairs.length){
      MT.round++;
      if(MT.round >= GM_ROUNDS) setTimeout(mtFinish, 350);
      else setTimeout(() => { if(MT && screen === "match"){ mtNewRound(); sfx("level"); render(); } }, 450);
    }
  } else { MT.combo = 0; MT.err++; MT.pen += 3; MT.bad = [[side, i], [side === "q" ? "a" : "q", other]]; buzz(false); sfx("bad"); render(); toast(t("mtPenalty")); }
}

// ---------- Sant eller usant ----------
function tfNext(){
  let cur = null;
  for(let k = 0; k < 12 && !cur; k++){
    if(Math.random() < 0.6){ const pool = drPool("all"); if(!pool.length) continue; const c = snRand(pool), truth = Math.random() < 0.5, w = snRand(c[4]);
      cur = { q: drText(c[2]), a: drText(truth ? c[3] : w), truth, right: drText(c[3]) }; }
    else { const cc = snRand(snCourses()), sq = cc && snQuestion(cc); if(!sq || String(sq.it.prompt).length > 200) continue;
      const ok = sq.it.opts.find(o => o.ok), bad = sq.it.opts.filter(o => !o.ok); if(!ok || !bad.length || gmLen(ok.t) > 90) continue;
      const truth = Math.random() < 0.5; cur = { q: sq.it.prompt, a: truth ? ok.t : snRand(bad).t, truth, right: ok.t, code: sq.code, u: sq.u }; }
  }
  TF.cur = cur; TF.answered = null;
}
function tfOpen(){ TF = { score: 0, combo: 0, maxCombo: 0, best: ((S.tfBest || {})[curStudy()]) || 0, started: false, done: false }; overlay = null; screen = "truefalse"; render(); }
function tfStart(){ TF.started = true; TF.end = Date.now() + TF_SECS * 1000; tfNext(); render(); clearInterval(TF.timer);
  TF.timer = setInterval(() => { if(screen !== "truefalse" || !TF){ clearInterval(TF && TF.timer); return; } const left = TF.end - Date.now();
    const bar = document.getElementById("tfbar"), sec = document.getElementById("tfsec"); if(bar) bar.style.width = Math.max(0, left / (TF_SECS * 10)) + "%"; if(sec) sec.textContent = Math.max(0, Math.ceil(left / 1000));
    if(left <= 0) tfFinish(); }, 100); }
function tfFinish(){
  clearInterval(TF.timer); TF.done = true; const key = curStudy(); S.tfBest ||= {}; TF.newBest = TF.score > (S.tfBest[key] || 0); if(TF.newBest) S.tfBest[key] = TF.score;
  TF.xp = Math.max(1, TF.score); const st = awardXP(TF.xp); S.stats ||= {}; S.stats.games = (+S.stats.games || 0) + 1;
  bdgToast(checkBadges()); save(); render(); setTimeout(() => TF.newBest && TF.score > 0 ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}
function renderTF(){
  if(!TF){ tfOpen(); return; }
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="gmclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(studyName(STUDY(curStudy())))}</small><b>${esc(t("tfTitle"))}</b></div></div></div>`;
  if(!TF.started){
    $app.innerHTML = `${top}<main class="wrap sp-intro"><div class="tf-demo"><span class="tf-no">✗</span><span class="tf-yes">✓</span></div><h2>${esc(t("tfHead"))}</h2><p>${esc(t("tfText", TF_SECS))}</p>${TF.best ? `<p class="sp-rec">🏆 ${esc(t("spBest", TF.best))}</p>` : ""}
      <button class="big sp-go" data-a="tfstart">${esc(t("spGo"))}</button></main>`;
    return;
  }
  if(TF.done){
    $app.innerHTML = `${top}<main class="wrap sp-intro"><div class="sp-score">${TF.score}</div><h2>${esc(TF.newBest && TF.score ? t("spNewBest") : t("spScore"))}</h2>
      <p>${esc(t("spBest", Math.max(TF.best, TF.score)))} · ${esc(t("spMaxCombo", TF.maxCombo))}</p><div class="gd-xp">${I.bolt}+${TF.xp} XP</div>
      <button class="big sp-go" data-a="tfagain">${esc(t("spAgain"))}</button><button class="big ghost" data-a="gmclose">${esc(t("back"))}</button></main>`;
    return;
  }
  const c = TF.cur, left = Math.max(0, TF.end - Date.now()), st = TF.answered;
  $app.innerHTML = `<div class="sp-top"><div class="sp-track"><i id="tfbar" style="width:${left / (TF_SECS * 10)}%"></i></div>
      <div class="sp-row"><span class="sp-sec">⏱ <b id="tfsec">${Math.ceil(left / 1000)}</b></span><span class="sp-pts">${TF.score} ${esc(t("spPts"))}</span><span class="sn-combo ${TF.combo >= 3 ? "hot" : ""}">${I.fire}<b>${TF.combo}</b></span></div></div>
    <main class="wrap tf-main">${c ? `<div class="tf-card ${st === true ? "ok" : st === false ? "bad" : ""}" id="tfcard"><div class="tf-q">${rich(c.q)}</div><div class="tf-arrow">↓</div><div class="tf-a">${rich(c.a)}</div>
      ${st === false ? `<div class="tf-fix">${esc(c.truth ? t("tfWasTrue") : t("tfWasFalse"))}${c.truth ? "" : ` ${esc(t("tfRight"))} ${rich(c.right)}`}</div>` : ""}</div>
      <div class="tf-btns"><button class="tf-b no" data-a="tfans" data-v="0" ${st != null ? "disabled" : ""}>✗ ${esc(t("tfFalse"))}</button><button class="tf-b yes" data-a="tfans" data-v="1" ${st != null ? "disabled" : ""}>✓ ${esc(t("tfTrue"))}</button></div>
      <p class="mt-hint">${esc(t("tfSwipe"))}</p>` : `<p>${esc(t("stNoTheory"))}</p>`}</main>`;
  tfSwipe();
}
function tfAnswer(v){
  if(!TF || !TF.cur || TF.answered != null || TF.done) return;
  const ok = v === TF.cur.truth; TF.answered = ok; buzz(ok);
  if(ok){ TF.combo++; TF.maxCombo = Math.max(TF.maxCombo, TF.combo); TF.score += TF.combo >= 5 ? 2 : 1; } else { TF.combo = 0; TF.end -= 3000; }
  render(); sfx(ok ? "ok" : "bad", TF.combo); if(ok) burst(document.getElementById("tfcard"), 10);
  setTimeout(() => { if(TF && !TF.done && screen === "truefalse"){ tfNext(); render(); } }, ok ? 380 : 1500);
}
// Sveip kortet: høyre = sant, venstre = usant.
function tfSwipe(){
  const el = document.getElementById("tfcard"); if(!el || TF.answered != null) return;
  let x0 = null, dx = 0;
  el.addEventListener("pointerdown", e => { x0 = e.clientX; dx = 0; el.setPointerCapture(e.pointerId); el.style.transition = "none"; });
  el.addEventListener("pointermove", e => { if(x0 == null) return; dx = e.clientX - x0; el.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`; el.classList.toggle("lean-yes", dx > 40); el.classList.toggle("lean-no", dx < -40); });
  const up = () => { if(x0 == null) return; x0 = null; el.style.transition = ""; el.style.transform = ""; el.classList.remove("lean-yes", "lean-no"); if(Math.abs(dx) > 70) tfAnswer(dx > 0); };
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
}

// ---------- felles ----------
function gmClick(a, b){
  if(a === "mtopen"){ mtOpen(); return true; }
  if(a === "tfopen"){ tfOpen(); return true; }
  if(a === "gmclose"){ if(MT) clearInterval(MT.timer); if(TF) clearInterval(TF.timer); MT = null; TF = null; goHome(); return true; }
  if(a === "mtagain"){ mtOpen(); return true; }
  if(a === "mtpick"){ mtPick(b.dataset.s, +b.dataset.i); return true; }
  if(a === "tfstart"){ tfStart(); return true; }
  if(a === "tfagain"){ tfOpen(); tfStart(); return true; }
  if(a === "tfans"){ tfAnswer(b.dataset.v === "1"); return true; }
  return false;
}

// ---------- Lek og lær-menyen og tilpasning av forsiden ----------
// Forsiden viser bare én knapp («Lek og lær») som åpner alle spillene. Spill man fester (S.homePins) vises som store fliser.
// Tilpass forsiden (S.homeHide): skjul dagens utfordring og favorittlinja.
const GAMES = [["sn", "snopen", "📱", "snTitle", "sn-t1"], ["sp", "spopen", "⚡", "spTitle", "sn-t2"], ["mt", "mtopen", "🧩", "mtTitle", "sn-t3"], ["tf", "tfopen", "👆", "tfTitle", "sn-t4"]];
function gmSub(id){
  const st = curStudy(), sp = (S.sprintBest || {})[st], mb = (S.matchBest || {})[st], tb = (S.tfBest || {})[st];
  if(id === "sn") return t("snSub"); if(id === "sp") return sp ? t("spBest", sp) : t("spSub");
  if(id === "mt") return mb ? t("mtBest", f1(mb)) : t("mtSub"); return tb ? t("spBest", tb) : t("tfSub");
}
const gmTile = g => `<button class="sn-tile ${g[4]}" data-a="${g[1]}"><span class="sn-ti">${g[2]}</span><b>${esc(t(g[3]))}</b><small>${esc(gmSub(g[0]))}</small></button>`;
const homePins = () => Array.isArray(S.homePins) ? S.homePins : [];
function homeGamesHTML(){
  const pins = GAMES.filter(g => homePins().includes(g[0]));
  return `${pins.length ? `<div class="sn-entry">${pins.map(gmTile).join("")}</div>` : ""}
    <button class="qt-row gm-row" data-a="gamesmenu"><span class="gm-ics" aria-hidden="true">${GAMES.map(g => `<i class="${g[4]}">${g[2]}</i>`).join("")}</span><span><b>${esc(t("gmTitle"))}</b><small>${esc(t("gmSub"))}</small></span>${I.chevron}</button>`;
}
// I Øv: alle spillene som små fliser.
const practiceGamesHTML = () => `<div class="sn-entry sn-sm">${GAMES.map(gmTile).join("")}</div>`;
function gamesMenuHTML(custom){
  const hide = S.homeHide || {}, tog = (k, on, lab) => `<div class="srow"><span class="lbl">${esc(lab)}</span><button class="tog ${on ? "on" : ""}" data-a="hometog" data-k="${k}" role="switch" aria-checked="${on}" aria-label="${esc(lab)}"></button></div>`;
  return `<div class="dialog gm-menu" role="dialog" aria-label="${esc(t(custom ? "gmCustom" : "gmTitle"))}"><div class="sheet-h"><h3>${esc(t(custom ? "gmCustom" : "gmTitle"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    ${GAMES.map(g => { const on = homePins().includes(g[0]);
      return `<div class="gm-item"><button class="gm-open" data-a="${g[1]}"><span class="gm-ic ${g[4]}">${g[2]}</span><span><b>${esc(t(g[3]))}</b><small>${esc(gmSub(g[0]))}</small></span></button>
        <button class="gm-pin ${on ? "on" : ""}" data-a="gmpin" data-g="${g[0]}" aria-pressed="${on}" title="${esc(t(on ? "gmUnpin" : "gmPin"))}" aria-label="${esc(t(on ? "gmUnpin" : "gmPin"))}">📌</button></div>`; }).join("")}
    <p class="lp-note">${esc(t("gmPinNote"))}</p>
    ${custom ? `<div class="sgroup">${tog("dc", !hide.dc, t("gmShowDc"))}${tog("fav", !hide.fav, t("gmShowFav"))}</div>` : ""}</div>`;
}
function gmMenuClick(a, b){
  if(a === "gamesmenu"){ overlay = { games: 1 }; renderOverlay(); return true; }
  if(a === "homecustom"){ overlay = { games: 1, custom: 1 }; renderOverlay(); return true; }
  if(a === "gmpin"){ const id = b.dataset.g, p = homePins().filter(x => x !== id); if(!homePins().includes(id)) p.push(id);
    S.homePins = GAMES.map(g => g[0]).filter(x => p.includes(x)); save(); render(); toast(t(p.includes(id) ? "gmPinned" : "gmUnpinned")); return true; }
  if(a === "hometog"){ S.homeHide ||= {}; S.homeHide[b.dataset.k] = !S.homeHide[b.dataset.k]; save(); render(); return true; }
  return false;
}
