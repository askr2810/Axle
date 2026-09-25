// ============================================================
//  DAGENS UTFORDRING – tre blandede oppgaver fra fagene du har startet.
//  Utvalget er likt hele dagen (seedet på datoen), tallene i generatorene er nye hver gang.
//  Gir ekstra XP én gang per dag. Status lagres i S.dc = { day, right, n }.
// ============================================================
// Antall oppgaver følger dagsmålet: 10 XP → 3, 20 → 4, 30 → 5, 50 → 8. Alt riktig på første forsøk gir hele dagsmålet.
const dcN = () => Math.max(3, Math.min(10, Math.round((S.goal || 10) / 6)));
const dcXP = (right, n) => Math.round((S.goal || 10) * (0.5 + 0.5 * right / n));
// Kildene (fag og/eller grunnbegreper) velges i favs.js (dcSources). Grunnbegreper foretrekker kort som er «på tur» i terpinga.
function dcPlan(){
  const day = dayKey(), rng = exRng(exHash("dc:" + day)), srcs = dcSources(), td = dayKey();
  const order = exShuffle(srcs.slice(), rng), plan = [], used = new Set(), st = typeof drState === "function" ? drState() : {};
  for(let i = 0, N = dcN(), tries = 0; plan.length < N && tries < N * 6; tries++, i++){
    const x = order[i % order.length];
    if(FAV_DRILL[x]){
      const pool = drPool(FAV_DRILL[x][2]).filter(c => !used.has("dr:" + c[0])), due = pool.filter(c => st[c[0]] && st[c[0]].due <= td), from = due.length ? due : pool;
      if(!from.length) continue; const c = from[Math.floor(rng() * from.length)]; used.add("dr:" + c[0]); plan.push({ code: x, dr: c[0] }); continue;
    }
    const c = COURSE(x), nx = nextNode(c), maxU = nx ? nx[0] : c.units.length - 1;
    const u = Math.floor(rng() * (maxU + 1)), P = poolIds(c, [u]);
    const pool = P.gen.length ? P.gen : P.num.concat(P.mc); if(!pool.length) continue;
    const id = pool[Math.floor(rng() * pool.length)]; if(used.has(x + ":" + id)) continue; used.add(x + ":" + id);
    plan.push({ code: x, id });
  }
  return plan;
}
const dcDoneToday = () => !!(S.dc && S.dc.day === dayKey());
function startChallenge(){
  const items = dcPlan().map(p => {
    if(p.dr){ const c = DRILL.find(d => d[0] === p.dr); if(!c) return null; const it = drItem(c); it.dcCode = p.code; return it; }
    const it = itemFromId(COURSE(p.code), p.id); if(it){ it.id = p.code + ":" + it.id; it.dcCode = p.code; } return it; }).filter(Boolean);
  if(!items.length) return;
  startLesson("challenge", S.current, items, { day: dayKey() });
}
function dcTileHTML(){
  const done = dcDoneToday();
  return `<button class="qt dc ${done ? "done" : ""}" ${done ? "disabled" : `data-a="dcstart"`}><span class="qt-ic">${done ? I.checkS : I.bolt}</span><b>${esc(t("dcTitle"))}</b><small>${esc(done ? t("qtDcDone", S.dc.right, S.dc.n) : t("qtDcSub"))}</small></button>`;
}
function dcCardHTML(){
  const plan = dcPlan(), done = dcDoneToday();
  const chips = [...new Set(plan.map(p => p.code))].map(code => `<span class="dc-chip">${esc(srcShort(code))}</span>`).join("") +
    (done ? "" : `<button class="dc-chip dc-src" data-a="dcsrcopen" aria-label="${esc(t("dcSrcTitle"))}">${I_STAR_O}${esc(t("dcSrcBtn"))}</button>`);
  return `<div class="dc-card ${done ? "done" : ""}"><div class="dc-ic">${done ? I.checkS : I.bolt}</div>
    <div class="dc-t"><b>${esc(t("dcTitle"))}</b><span>${esc(done ? t("dcDone", S.dc.right, S.dc.n) : t("dcSub", dcN(), S.goal || 10))}</span><div class="dc-chips">${chips}</div></div>
    ${done ? "" : `<button class="dc-go" data-a="dcstart">${esc(t("dcStart"))}</button>`}</div>`;
}

// Ved oppstart: først «logg inn / lag bruker» (om man ikke er innlogget, maks én gang per dag), deretter dagens utfordring.
let DC_NEXT = false;
function bootPrompts(){
  if(screen !== "home" || overlay) return;
  if(AUTH && !S.acEver){ S.acEver = 1; saveLocal(); } // denne enheten har vært innlogget: aldri vis innloggings-popupen
  if(CLOUD_ON && !AUTH && !S.acEver && S.loginAsked !== dayKey()){
    S.loginAsked = dayKey(); saveLocal(); DC_NEXT = true;
    overlay = { login: 1, step: "email", email: "", intro: true }; renderOverlay(); return;
  }
  dcMaybePrompt();
}
function dcAfterOverlay(){ if(DC_NEXT){ DC_NEXT = false; setTimeout(dcMaybePrompt, 350); } }
// Popup når appen åpnes første gang i løpet av dagen og utfordringen ikke er tatt. Vises bare én gang per dag.
function dcMaybePrompt(){
  if(dcDoneToday() || S.dcAsked === dayKey() || screen !== "home" || overlay) return;
  S.dcAsked = dayKey(); saveLocal();
  overlay = "dcpop"; renderOverlay();
}
function dcPopupHTML(){
  const n = dcN(), g = S.goal || 10, st = streakNow(), tc = teacherOf(S.current), done = (S.daily[dayKey()] || 0) >= g;
  return `<div class="dialog dcpop" role="dialog" aria-label="${esc(t("dcTitle"))}">
    <div class="dcpop-hero"><div class="dcpop-glow"></div><div class="dcpop-ic">${I.bolt}</div></div>
    <small class="dcpop-k">${esc(t("dcPopKick"))}</small>
    <h3>${esc(t("dcTitle"))}</h3>
    <div class="dcpop-facts"><span>${esc(t("dcPopQs", n))}</span><span>${I.bolt} +${g} XP</span>${st ? `<span class="fire">${I.fire}${st}</span>` : ""}</div>
    <div class="tch dcpop-tch">${avatarSVG(tc.av, 44, "tch-av")}<div class="tch-b"><b>${esc(tc.name)}</b><span>${esc(pickLine(t(st ? "dcPopTchSt" : "dcPopTch")).replace("{n}", st))}</span></div></div>
    <button class="dcpop-go" data-a="dcpopgo"><span>${esc(t("dcPopGo"))}</span></button>
    <button class="dcpop-later" data-a="dclater">${esc(t("dcPopLater"))}</button>
  </div>`;
}
