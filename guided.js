// ============================================================
//  STEG FOR STEG – teorien i små kort med korte spørsmål innimellom (i stil med Brilliant).
//  Kortene lages automatisk fra teorien: ett kort per ##/###-avsnitt, figurer og «Prøv selv» får egne kort.
//  Spørsmålene hentes fra enhetens egne oppgaver. Gale svar kan prøves igjen.
// ============================================================
let GD = null; // { code, u, go, cards: [{ kind: "text", src } | { kind: "q", it, wrong: [], done }], i }
function gdSections(src){
  const secs = []; let cur = [], later = [];
  const push = () => { if(cur.some(l => l.trim() && !/^#{2,3}\s/.test(l.trim()))) secs.push(cur.join("\n")); cur = []; secs.push(...later); later = []; };
  for(const line of src.split("\n")){
    const L = line.trim();
    if(/^#{2,3}\s/.test(L)){ push(); cur.push(line); continue; }
    if(/^!\[(fig|sim):/.test(L)){ later.push(line); continue; } // figur og simulering får eget kort etter avsnittet
    cur.push(line);
  }
  push();
  // Slå sammen et kort som bare er en overskrift + én kort linje med neste kort.
  const out = [];
  for(const s of secs){
    const body = s.split("\n").filter(l => l.trim() && !/^#{2,3}\s/.test(l.trim()));
    if(out.length && body.length === 1 && body[0].length < 60 && !/^!\[/.test(body[0].trim()) && !/^!\[/.test(out[out.length - 1].trim())) out[out.length - 1] += "\n\n" + s;
    else out.push(s);
  }
  return out;
}
function gdQuestions(code, u, n){
  const c = COURSE(code), P = poolIds(c, [u]), ids = [], items = [];
  pick(ids, P.gen, Math.ceil(n / 2)); pick(ids, P.mc, n); pick(ids, P.num, n + 2);
  for(const id of shuffle(ids)){ if(items.length >= n) break; try{ const it = itemFromId(c, id, { mc: true }); if(it && it.type === "mc" && it.opts.length >= 2) items.push(it); }catch(e){} }
  return items;
}
function gdOpen(code, u, go){
  const doc = theoryOf(code, u); if(!doc){ if(go) startUnitLesson(code, go.u, go.k); return; }
  const src = withSims(code, u, withFigs(code, u, doc[LANG] || doc.nb)), secs = gdSections(src);
  const qs = gdQuestions(code, u, Math.min(4, Math.max(1, Math.floor(secs.length / 2)))), cards = [];
  const every = Math.max(2, Math.floor(secs.length / (qs.length + 1)));
  secs.forEach((s, i) => { cards.push({ kind: "text", src: s }); if((i + 1) % every === 0 && i < secs.length - 1 && qs.length) cards.push({ kind: "q", it: qs.shift(), wrong: [], done: false }); });
  while(qs.length) cards.push({ kind: "q", it: qs.shift(), wrong: [], done: false });
  cards.push({ kind: "end" });
  GD = { code, u, go, cards, i: 0, from: screen, right: 0, asked: cards.filter(c => c.kind === "q").length };
  (S.theorySeen ||= {})[code + ":" + u] = 1; bdgToast(checkBadges()); save();
  overlay = null; screen = "guided"; render(); window.scrollTo(0, 0);
}
function gdCardHTML(card, c){
  if(card.kind === "text"){
    const first = GD.i === 0;
    const p = GD.proof && pfById(GD.proof);
    const head = !first ? "" : p ? `<div class="pf-head"><span class="pf-ic" aria-hidden="true">${p.ic}</span><div><small>${esc(t("pfKicker"))}</small><b>${rich(T(p.t[0], p.t[1]))}</b></div></div>` : teacherBubble(GD.code, esc(t("gdHello", unitTitle(c, GD.u))), 48, "tch-th");
    return `${head}<div class="gd-text theory">${richDoc(card.src)}</div>`;
  }
  if(card.kind === "q"){
    const it = card.it, right = card.done && !card.gaveUp;
    return `<div class="gd-q"><div class="krow"><div class="gd-qh">${I.star16}${esc(t("gdCheck"))}</div><button class="kbtn" data-a="scratch">${I.pencil}${t("scratch")}</button></div><div class="gd-p">${rich(it.prompt)}</div><div class="opts">` +
      it.opts.map((o, i) => { const w = card.wrong.includes(i), show = card.done && o.ok;
        return `<button class="opt ${show ? "right" : w ? "wrong" : ""}" data-a="gdans" data-i="${i}" ${card.done || w ? "disabled" : ""}><span class="k">${"ABCD"[i] || i + 1}</span><span>${rich(o.t)}</span></button>`; }).join("") +
      `</div>${card.wrong.length && !card.done ? `<p class="gd-try">${esc(t("gdTryAgain"))}</p>` : ""}
      ${card.done ? `<div class="cy-e ${right ? "ok" : "bad"}"><b>${esc(t(right ? (card.wrong.length ? "gdRightNow" : "cyRight") : "gdAnswer"))}</b> ${it.expl ? rich(it.expl) : ""}</div>` : ""}</div>`;
  }
  // slutt
  if(GD.proof){ const p = pfById(GD.proof);
    return `<div class="gd-end pf-end"><div class="pf-qed" aria-hidden="true"><span>✓</span><small>Q.E.D.</small></div><h2>${esc(t("pfDoneTitle"))}</h2><p>${rich(T(p.t[0], p.t[1]))}</p>
      ${GD.asked ? `<div class="gd-score"><b>${GD.right}/${GD.asked}</b><span>${esc(t("gdScore"))}</span></div>` : ""}${GD.xp ? `<div class="gd-xp">${I.bolt}+${GD.xp} XP</div>` : ""}
      <p class="pf-count-l">${esc(t("pfProgress", PROOFS.filter(x => pfDone(x.id)).length, PROOFS.length))}</p></div>`; }
  const first = !(S.gdDone || {})[GD.code + ":" + GD.u];
  return `<div class="gd-end"><div class="gd-end-ic">${I.checkS}</div><h2>${esc(t("gdDoneTitle"))}</h2><p>${esc(t("gdDoneSub", unitTitle(c, GD.u)))}</p>
    ${GD.asked ? `<div class="gd-score"><b>${GD.right}/${GD.asked}</b><span>${esc(t("gdScore"))}</span></div>` : ""}
    ${GD.xp ? `<div class="gd-xp">${I.bolt}+${GD.xp} XP</div>` : ""}
    ${teacherBubble(GD.code, esc(pickLine(t("gdTchEnd"))), 44, "gd-tch")}</div>`;
}
function renderGuided(){
  if(!GD){ screen = "home"; renderHome(); return; }
  const c = GD.proof ? null : COURSE(GD.code), card = GD.cards[GD.i], n = GD.cards.length, isEnd = card.kind === "end";
  const canNext = card.kind !== "q" || card.done;
  const segs = GD.cards.map((k, i) => `<i class="${i < GD.i ? "on" : i === GD.i ? "cur" : ""} ${k.kind === "q" ? "q" : ""}"></i>`).join("");
  $app.innerHTML = `<div class="top gd-top"><div class="wrap"><button class="iconbtn" data-a="gdclose" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="gd-prog" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${GD.i + 1}">${segs}</div>
      ${GD.proof ? `<span class="gd-full pf-tag">∎ ${esc(t("pfKicker"))}</span>` : `<button class="gd-full" data-a="gdfull">${esc(t("gdFull"))}</button>`}</div></div>
    <main class="wrap gd"><div class="gd-card ${GD.dir === "r" ? "gd-from-l" : GD.dir === "l" ? "gd-from-r" : "gd-in"}">${gdCardHTML(card, c)}</div>
      ${!S.gdSwipeSeen && !isEnd ? `<p class="gd-swipe" aria-hidden="true">${esc(t("gdSwipe"))}</p>` : ""}</main>
    <div class="lfoot ${card.kind === "q" && card.done ? (card.gaveUp ? "bad" : "ok") : ""}"><div class="wrap gd-foot">
      ${GD.i > 0 && !isEnd ? `<button class="gd-back" data-a="gdprev" aria-label="${esc(t("back"))}">${I.left}</button>` : ""}
      ${isEnd && GD.proof ? (() => { const nx = pfNext(GD.proof); return nx ? `<button class="big" data-a="pfopen" data-id="${nx.id}">${esc(t("pfNext"))}</button><button class="big ghost pf-more" data-a="pflist">${esc(t("pfMore"))}</button>` : `<button class="big" data-a="pflist">${esc(t("pfMore"))}</button>`; })()
      : isEnd ? `<button class="big" data-a="gdpractice">${esc(t(GD.go ? "thStartFirst" : "thStart"))}</button>`
              : `<button class="big" data-a="gdnext" ${canNext ? "" : "disabled"}>${esc(t(card.kind === "q" && !card.done ? "gdPick" : "cont"))}</button>`}
    </div></div>`;
}
function gdFinish(){
  const key = GD.proof ? "proof:" + GD.proof : GD.code + ":" + GD.u; S.gdDone ||= {};
  if(!S.gdDone[key]){ S.gdDone[key] = Date.now(); GD.xp = 5 + GD.right; const st = awardXP(GD.xp); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); }
  bdgStat("guided"); bdgToast(checkBadges()); save(); setTimeout(() => confetti(GD && GD.proof ? "proof" : "complete"), 200); buzz(true);
}
function guidedClick(a, b){
  if(!a.startsWith("gd") || !GD) return false;
  const card = GD.cards[GD.i];
  if(a === "gdclose" && GD.proof){ const from = GD.from; GD = null; if(from === "theory" && TH){ screen = "theory"; render(); } else { screen = "proofs"; render(); } window.scrollTo(0, 0); return true; }
  if(a === "gdclose"){ const from = GD.from; GD = null; if(from === "book" || (from === "theory" && TH)){ screen = from; render(); window.scrollTo(0, 0); } else goHome(); return true; }
  if(a === "gdfull"){ const { code, u, go } = GD; GD = null; openTheory(code, u, go); return true; }
  if(a === "gdans" && card.kind === "q" && !card.done){
    const i = +b.dataset.i, ok = card.it.opts[i].ok; buzz(ok);
    if(ok){ card.done = true; if(!card.wrong.length) GD.right++; }
    else { card.wrong.push(i); if(card.wrong.length >= Math.min(2, card.it.opts.length - 1)){ card.done = true; card.gaveUp = true; } }
    render(); sfx(ok ? "ok" : "bad", ok ? GD.right : 0); if(ok) burst(document.querySelector(".gd-q .opt.right")); return true;
  }
  if(a === "gdnext" && (card.kind !== "q" || card.done)){ gdGo(1); return true; }
  if(a === "gdprev" && GD.i > 0){ gdGo(-1); return true; }
  if(a === "gdpractice"){ const { code, u, go } = GD; GD = null; TH = { code, u, go }; const c = COURSE(code), nn = nextNode(c); let uu = u, k = 0;
    if(go){ uu = go.u; k = go.k; } else if(nn && nn[0] === u) k = nn[1]; else if(sub(code).done[u + "-2"]) k = 3;
    TH = null; if(!isUnlocked(c, uu, k)){ goHome(); toast(t("lockedNode")); return true; } startUnitLesson(code, uu, k); return true; }
  return false;
}

// Bla fram og tilbake: knapper, sveip (venstre = neste, høyre = forrige) og piltaster. Kort man har vært på, kan man bla til igjen.
function gdGo(d){
  if(!GD) return; const card = GD.cards[GD.i];
  if(d > 0 && (card.kind === "end" || (card.kind === "q" && !card.done))) return;
  if(d < 0 && (GD.i === 0 || card.kind === "end")) return;
  GD.i += d; GD.dir = d > 0 ? "l" : "r";
  if(GD.cards[GD.i].kind === "end") gdFinish();
  render(); window.scrollTo(0, 0); GD && (GD.dir = null);
}
(() => {
  let sx = 0, sy = 0, st = 0, on = false;
  document.addEventListener("touchstart", e => { on = screen === "guided" && !!GD && !overlay && e.touches.length === 1 && !e.target.closest("input,.sim,.fig"); if(on){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now(); } }, { passive: true });
  document.addEventListener("touchend", e => {
    if(!on) return; on = false; const t0 = e.changedTouches[0], dx = t0.clientX - sx, dy = t0.clientY - sy;
    if(Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6 || Date.now() - st > 800) return;
    if(!S.gdSwipeSeen){ S.gdSwipeSeen = 1; saveLocal(); }
    gdGo(dx < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener("keydown", e => { if(screen !== "guided" || !GD || overlay || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if(e.key === "ArrowRight") gdGo(1); else if(e.key === "ArrowLeft") gdGo(-1); });
})();
