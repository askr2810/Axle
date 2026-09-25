// ============================================================
//  DAGENS UTFORDRING – tre blandede oppgaver fra fagene du har startet.
//  Utvalget er likt hele dagen (seedet på datoen), tallene i generatorene er nye hver gang.
//  Gir ekstra XP én gang per dag. Status lagres i S.dc = { day, right, n }.
// ============================================================
const DC_N = 3;
function dcCourses(){
  const list = COURSES.filter(c => c.code === S.current || courseProgress(c).d > 0);
  return list.length ? list : [COURSE(S.current)];
}
function dcPlan(){
  const day = dayKey(), rng = exRng(exHash("dc:" + day)), cs = dcCourses();
  const order = exShuffle(cs.slice(), rng), plan = [];
  for(let i = 0; i < DC_N; i++){
    const c = order[i % order.length], nx = nextNode(c), maxU = nx ? nx[0] : c.units.length - 1;
    const u = Math.floor(rng() * (maxU + 1)), P = poolIds(c, [u]);
    const pool = P.gen.length ? P.gen : P.num.concat(P.mc); if(!pool.length) continue;
    plan.push({ code: c.code, id: pool[Math.floor(rng() * pool.length)] });
  }
  return plan;
}
const dcDoneToday = () => !!(S.dc && S.dc.day === dayKey());
function startChallenge(){
  const items = dcPlan().map(p => { const it = itemFromId(COURSE(p.code), p.id); if(it){ it.id = p.code + ":" + it.id; it.dcCode = p.code; } return it; }).filter(Boolean);
  if(!items.length) return;
  startLesson("challenge", S.current, items, { day: dayKey() });
}
function dcCardHTML(){
  const plan = dcPlan(), done = dcDoneToday();
  const chips = [...new Set(plan.map(p => p.code))].map(code => { const c = COURSE(code); return `<span class="dc-chip">${esc(courseShort(c))}</span>`; }).join("");
  return `<div class="dc-card ${done ? "done" : ""}"><div class="dc-ic">${done ? I.checkS : I.bolt}</div>
    <div class="dc-t"><b>${esc(t("dcTitle"))}</b><span>${esc(done ? t("dcDone", S.dc.right, S.dc.n) : t("dcSub", DC_N))}</span><div class="dc-chips">${chips}</div></div>
    ${done ? "" : `<button class="dc-go" data-a="dcstart">${esc(t("dcStart"))}</button>`}</div>`;
}
