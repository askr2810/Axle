// ============================================================
//  SNACKS OG LYNRUNDE – for mobil og kort oppmerksomhetsspenn.
//  Snacks (#/snacks): en uendelig sveipefeed (som Reels/TikTok) med små kort fra studiet ditt:
//    spørsmål, «visste du?», formelkort som snus, simuleringer og bevis. +1 XP per riktig svar, combo og lyd.
//  Lynrunde (#/lynrunde): 60 sekunder, så mange riktige som mulig. Rekord per studie.
// ============================================================
let SN = null;  // { cards, combo, best, right, xp, n }
let SP = null;  // { end, score, combo, best, it, answered, timer, done, wrong }
const SN_BATCH = 10;

// Fag i studiet ditt, vektet: gjeldende fag ×4, favoritter ×2.
function snCourses(){
  const list = studyCourses(curStudy()).filter(c => c.units.some(u => u.qs.length || (u.gen || []).length)), out = [];
  for(const c of list){ const w = c.code === S.current ? 4 : isFav(c.code) ? 2 : 1; for(let i = 0; i < w; i++) out.push(c); }
  return out.length ? out : [COURSE(S.current)];
}
const snRand = a => a[Math.floor(Math.random() * a.length)];
function snQuestion(c){
  for(let tries = 0; tries < 8; tries++){
    const u = Math.floor(Math.random() * c.units.length), P = poolIds(c, [u]), ids = [...P.mc, ...P.gen, ...P.num]; if(!ids.length) continue;
    try{ const it = itemFromId(c, snRand(ids), { mc: true }); if(it && it.type === "mc" && it.opts.length >= 2 && String(it.prompt).length < 420) return { kind: "q", code: c.code, u, it, wrong: [], done: false }; }catch(e){}
  }
  return null;
}
function snFact(c){
  const us = c.units.map((_, i) => i).filter(i => theoryOf(c.code, i)); if(!us.length) return null;
  const u = snRand(us), doc = theoryOf(c.code, u), src = doc[LANG] || doc.nb, rem = bkRemember(src), pts = bkPoints(src, 6);
  const txt = rem.length && Math.random() < 0.6 ? snRand(rem) : pts.length ? snRand(pts) : rem[0]; if(!txt) return null;
  return { kind: "fact", code: c.code, u, txt };
}
function snFlash(){ const pool = typeof drPool === "function" ? drPool("all") : []; if(!pool.length) return null; const c = snRand(pool); return { kind: "flash", it: drItem(c, true), flipped: false }; }
function snSim(courses){
  const keys = []; for(const c of new Set(courses)) c.units.forEach((_, u) => { const m = SIM_MAP[c.code + ":" + u]; if(m) [].concat(m).forEach(n => keys.push([c.code, u, n])); });
  if(!keys.length) return null; const [code, u, name] = snRand(keys); return SIMS[name] ? { kind: "sim", code, u, name } : null;
}
function snProof(courses){
  const codes = new Set(courses.map(c => c.code)), ps = PROOFS.filter(p => p.units.some(k => codes.has(k.split(":")[0])));
  const fresh = ps.filter(p => !pfDone(p.id)); const p = snRand(fresh.length ? fresh : ps); return p ? { kind: "proof", id: p.id } : null;
}
function snMore(n = SN_BATCH){
  const courses = snCourses(), out = [];
  for(let k = 0; out.length < n && k < n * 4; k++){
    const r = Math.random(), c = snRand(courses);
    const card = r < 0.46 ? snQuestion(c) : r < 0.66 ? snFact(c) : r < 0.84 ? snFlash() : r < 0.95 ? snSim(courses) : snProof(courses);
    if(card && !(card.kind === "sim" && out.some(x => x.kind === "sim"))) out.push(card);
  }
  return out;
}
function snOpen(){ SN = { cards: snMore(), combo: 0, best: 0, right: 0, xp: 0, n: 0 }; overlay = null; screen = "snacks"; render(); }
const snTag = card => card.code ? `<span class="sn-tag">${esc(courseShort(COURSE(card.code)))} · ${esc(unitTitle(COURSE(card.code), card.u))}</span>` : "";
function snCardInner(card, i){
  if(card.kind === "q"){
    const it = card.it;
    return `${snTag(card)}<div class="krow sn-krow"><div class="sn-kicker">❓ ${esc(t("snQ"))}</div><button class="kbtn" data-a="scratch" data-c="${i}">${I.pencil}${t("scratch")}</button></div><div class="sn-prompt">${rich(it.prompt)}</div><div class="opts sn-opts">` +
      it.opts.map((o, j) => { const w = card.wrong.includes(j), show = card.done && o.ok;
        return `<button class="opt ${show ? "right" : w ? "wrong" : ""}" data-a="snans" data-c="${i}" data-i="${j}" ${card.done || w ? "disabled" : ""}><span class="k">${"ABCD"[j] || j + 1}</span><span>${rich(o.t)}</span></button>`; }).join("") +
      `</div>${card.done ? `<div class="sn-expl ${card.wrong.length ? "bad" : "ok"}"><b>${esc(card.wrong.length ? t("snAlmost") : pickLine(t("snYes")))}</b>${it.expl ? " " + rich(it.expl) : ""}</div>` : ""}`;
  }
  if(card.kind === "fact") return `${snTag(card)}<div class="sn-kicker">💡 ${esc(t("snFact"))}</div><div class="sn-big theory">${richDoc(card.txt)}</div>
    <button class="sn-more" data-a="snread" data-c="${i}">${I.book}${esc(t("snReadMore"))}</button>`;
  if(card.kind === "flash") return `<div class="sn-kicker">🃏 ${esc(t("snFlash"))}</div><button class="sn-flip ${card.flipped ? "on" : ""}" data-a="snflip" data-c="${i}">
      <span class="sn-face front"><small>${esc(t("flipQ"))}</small><span>${rich(card.it.prompt)}</span><em>${esc(t("flipTap"))}</em></span>
      <span class="sn-face back"><small>${esc(t("flipA"))}</small><span>${rich(card.it.answer)}</span>${card.it.expl ? `<em>${rich(card.it.expl)}</em>` : ""}</span></button>`;
  if(card.kind === "sim") return `${snTag(card)}<div class="sn-kicker">🎛 ${esc(t("snSim"))}</div>${simHTML(card.name)}`;
  if(card.kind === "proof"){ const p = pfById(card.id);
    return `<div class="sn-kicker">∎ ${esc(t("pfKicker"))}</div><div class="sn-proof"><span class="sn-proof-ic">${p.ic}</span><b>${rich(T(p.t[0], p.t[1]))}</b><small>${rich(T(p.sub[0], p.sub[1]))}</small>
      <button class="big" data-a="pfopen" data-id="${p.id}">${esc(t("snSeeProof"))}</button></div>`; }
  if(card.kind === "mile") return `<div class="sn-mile"><div class="sn-mile-n">${card.n}</div><b>${esc(t("snMile", card.n))}</b><span>${esc(t("snMileSub", card.right, card.best))}</span></div>`;
  return "";
}
function renderSnacks(){
  if(!SN){ snOpen(); return; }
  $app.innerHTML = `<div class="sn-top"><button class="iconbtn" data-a="snclose" aria-label="${esc(t("back"))}">${I.x}</button><b>${esc(t("snTitle"))}</b>
      <span class="sn-stat"><span class="sn-combo ${SN.combo >= 3 ? "hot" : ""}">${I.fire}<b id="sncombo">${SN.combo}</b></span><span class="sn-xp">${I.bolt}<b id="snxp">${SN.xp}</b></span></span></div>
    <main class="sn-feed" id="snfeed">${SN.cards.map((c, i) => `<section class="sn-card sn-${c.kind}" data-i="${i}"><div class="sn-in">${snCardInner(c, i)}</div></section>`).join("")}</main>
    ${!S.snSeen ? `<div class="sn-hint" aria-hidden="true">↑ ${esc(t("snSwipe"))}</div>` : ""}`;
  const feed = document.getElementById("snfeed");
  feed.addEventListener("scroll", () => { if(!S.snSeen && feed.scrollTop > 40){ S.snSeen = 1; saveLocal(); document.querySelector(".sn-hint")?.remove(); }
    if(feed.scrollTop + feed.clientHeight * 3 > feed.scrollHeight) snAppend(); }, { passive: true });
}
function snAppend(){
  if(!SN || SN.appending) return; SN.appending = true;
  const feed = document.getElementById("snfeed"), start = SN.cards.length, more = snMore();
  if(Math.floor((start + more.length) / 15) > Math.floor(start / 15)) more.splice(Math.min(more.length, 15 - start % 15), 0, { kind: "mile", n: Math.floor((start + more.length) / 15) * 15, right: SN.right, best: SN.best });
  SN.cards.push(...more);
  if(feed) feed.insertAdjacentHTML("beforeend", more.map((c, k) => `<section class="sn-card sn-${c.kind}" data-i="${start + k}"><div class="sn-in">${snCardInner(c, start + k)}</div></section>`).join(""));
  SN.appending = false;
}
function snRedraw(i){ const el = document.querySelector(`.sn-card[data-i="${i}"] .sn-in`); if(el) el.innerHTML = snCardInner(SN.cards[i], i);
  const cb = document.getElementById("sncombo"), xp = document.getElementById("snxp"); if(cb){ cb.textContent = SN.combo; cb.parentNode.classList.toggle("hot", SN.combo >= 3); } if(xp) xp.textContent = SN.xp; }
function snClick(a, b){
  if(!a.startsWith("sn") || !SN) return false;
  const i = +b.dataset.c, card = SN.cards[i];
  if(a === "snclose"){ SN = null; save(); goHome(); return true; }
  if(a === "snans" && card && card.kind === "q" && !card.done){
    const j = +b.dataset.i, ok = card.it.opts[j].ok; buzz(ok);
    if(ok){ card.done = true; if(!card.wrong.length){ SN.combo++; SN.right++; SN.best = Math.max(SN.best, SN.combo); SN.xp++; const st = awardXP(1); if(st.goalHit) setTimeout(() => { toast(t("goalHitTitle")); confetti(); }, 500); } }
    else { card.wrong.push(j); SN.combo = 0; if(card.wrong.length >= Math.min(2, card.it.opts.length - 1)) card.done = true; }
    snRedraw(i); sfx(ok ? "ok" : "bad", SN.combo);
    if(ok){ const el = document.querySelector(`.sn-card[data-i="${i}"] .opt.right`); burst(el, SN.combo >= 3 ? 18 : 12); if(!card.wrong.length) floatXP(el, "+1 XP"); }
    S.stats ||= {}; S.stats.snacks = (+S.stats.snacks || 0) + 1; saveLocal(); clearTimeout(SN.saveT); SN.saveT = setTimeout(save, 1500);
    return true;
  }
  if(a === "snflip" && card){ card.flipped = !card.flipped; b.classList.toggle("on", card.flipped); sfx("flip"); return true; }
  if(a === "snread" && card){ SN = null; openTheory(card.code, card.u); return true; }
  return false;
}

// ---------- Lynrunde: 60 sekunder ----------
const SP_SECS = 60;
function spNext(){
  const courses = snCourses(); let q = null;
  for(let k = 0; k < 10 && !q; k++){ const c = snRand(courses), cand = Math.random() < 0.3 ? snFlash() : snQuestion(c);
    if(cand && cand.kind === "flash"){ const d = DRILL.find(x => "dr:" + x[0] === cand.it.id); if(d) q = { it: drItem(d, false) }; }
    else if(cand && String(cand.it.prompt).length < 260) q = { it: cand.it, code: cand.code }; }
  SP.it = q ? q.it : null; SP.answered = null; SP.scratch = null;
}
function spOpen(){ SP = { end: 0, score: 0, combo: 0, best: ((S.sprintBest || {})[curStudy()]) || 0, started: false, done: false }; overlay = null; screen = "sprint"; render(); }
function spStart(){ SP.started = true; SP.end = Date.now() + SP_SECS * 1000; spNext(); render(); clearInterval(SP.timer);
  SP.timer = setInterval(() => { if(screen !== "sprint" || !SP){ clearInterval(SP && SP.timer); return; } const left = SP.end - Date.now();
    const bar = document.getElementById("spbar"), sec = document.getElementById("spsec"); if(bar) bar.style.width = Math.max(0, left / (SP_SECS * 10)) + "%"; if(sec) sec.textContent = Math.max(0, Math.ceil(left / 1000));
    if(left <= 10000 && left > 0 && Math.ceil(left / 1000) !== SP.lastTick){ SP.lastTick = Math.ceil(left / 1000); sfx("xp"); }
    if(left <= 0) spFinish(); }, 100); }
function spFinish(){
  clearInterval(SP.timer); SP.done = true; const key = curStudy(); S.sprintBest ||= {}; SP.newBest = SP.score > (S.sprintBest[key] || 0);
  if(SP.newBest) S.sprintBest[key] = SP.score; SP.xp = Math.max(1, Math.round(SP.score * 1.5)); const st = awardXP(SP.xp);
  S.stats ||= {}; S.stats.sprints = (+S.stats.sprints || 0) + 1; bdgToast(checkBadges()); save(); render();
  setTimeout(() => SP.newBest && SP.score > 0 ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}
function renderSprint(){
  if(!SP){ spOpen(); return; }
  if(!SP.started){
    $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="spclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(studyName(STUDY(curStudy())))}</small><b>${esc(t("spTitle"))}</b></div></div></div>
      <main class="wrap sp-intro"><div class="sp-clock">60</div><h2>${esc(t("spHead"))}</h2><p>${esc(t("spText"))}</p>${SP.best ? `<p class="sp-rec">🏆 ${esc(t("spBest", SP.best))}</p>` : ""}
        <button class="big sp-go" data-a="spstart">${esc(t("spGo"))}</button></main>`;
    return;
  }
  if(SP.done){
    $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="spclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(t("spTitle"))}</small><b>${esc(t("spDone"))}</b></div></div></div>
      <main class="wrap sp-intro"><div class="sp-score">${SP.score}</div><h2>${esc(SP.newBest && SP.score ? t("spNewBest") : t("spScore"))}</h2>
        <p>${esc(t("spBest", Math.max(SP.best, SP.score)))} · ${esc(t("spMaxCombo", SP.maxCombo || 0))}</p><div class="gd-xp">${I.bolt}+${SP.xp} XP</div>
        <button class="big sp-go" data-a="spagain">${esc(t("spAgain"))}</button><button class="big ghost" data-a="spclose">${esc(t("back"))}</button></main>`;
    return;
  }
  const it = SP.it, left = Math.max(0, SP.end - Date.now());
  $app.innerHTML = `<div class="sp-top"><div class="sp-track"><i id="spbar" style="width:${left / (SP_SECS * 10)}%"></i></div>
      <div class="sp-row"><span class="sp-sec">⏱ <b id="spsec">${Math.ceil(left / 1000)}</b></span><span class="sp-pts">${SP.score} ${esc(t("spPts"))}</span><span class="sn-combo ${SP.combo >= 3 ? "hot" : ""}">${I.fire}<b>${SP.combo}</b></span></div></div>
    <main class="wrap sp-q ${SP.answered === false ? "shake" : ""}">${it ? `<div class="krow"><span></span><button class="kbtn" data-a="scratch">${I.pencil}${t("scratch")}</button></div><div class="sn-prompt">${rich(it.prompt)}</div><div class="opts sn-opts">` +
      it.opts.map((o, j) => `<button class="opt ${SP.answered != null && o.ok ? "right" : SP.answered === false && SP.pick === j ? "wrong" : ""}" data-a="spans" data-i="${j}" ${SP.answered != null ? "disabled" : ""}><span class="k">${"ABCD"[j] || j + 1}</span><span>${rich(o.t)}</span></button>`).join("") + `</div>` : `<p>${esc(t("stNoTheory"))}</p>`}</main>`;
}
function spClick(a, b){
  if(!a.startsWith("sp") || a === "spx") return false;
  if(a === "spclose"){ if(SP) clearInterval(SP.timer); SP = null; goHome(); return true; }
  if(a === "spstart"){ spStart(); return true; }
  if(a === "spagain"){ spOpen(); spStart(); return true; }
  if(a === "spans" && SP && SP.it && SP.answered == null && !SP.done){
    const j = +b.dataset.i, ok = SP.it.opts[j].ok; SP.pick = j; SP.answered = ok; buzz(ok);
    if(ok){ SP.combo++; SP.maxCombo = Math.max(SP.maxCombo || 0, SP.combo); SP.score += SP.combo >= 5 ? 2 : 1; } else { SP.combo = 0; SP.end -= 3000; }
    render(); sfx(ok ? "ok" : "bad", SP.combo); if(ok) burst(document.querySelector(".sp-q .opt.right"), 10);
    setTimeout(() => { if(SP && !SP.done && screen === "sprint"){ spNext(); render(); } }, ok ? 420 : 1100);
    return true;
  }
  return false;
}
// Inngangen på forsiden og i Øv: to store fliser.
function snEntryHTML(){
  const best = ((S.sprintBest || {})[curStudy()]) || 0;
  return `<div class="sn-entry"><button class="sn-tile sn-t1" data-a="snopen"><span class="sn-ti">📱</span><b>${esc(t("snTitle"))}</b><small>${esc(t("snSub"))}</small></button>
    <button class="sn-tile sn-t2" data-a="spopen"><span class="sn-ti">⚡</span><b>${esc(t("spTitle"))}</b><small>${esc(best ? t("spBest", best) : t("spSub"))}</small></button></div>`;
}
function snEntryClick(a){ if(a === "snopen"){ snOpen(); return true; } if(a === "spopen"){ spOpen(); return true; } return false; }
