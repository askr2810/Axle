// ============================================================
//  MITT FOKUS – velg ett tema og bli god på det, steg for steg.
//  • Starter enkelt: en regneoppgave du ikke har sett før, kommer først som flervalg; når den sitter, skriver du svaret selv.
//  • Det du bommer på, kommer igjen i samme økt til du klarer det, og igjen i morgen.
//  • Det du kan, repeteres med økende mellomrom (1, 2, 4, 7, 14, 30 dager), så du beholder kontrollen.
//  • Når 80 % av temaet sitter, bygger du videre på neste enhet – og det gamle følger med i repetisjonen.
//  Tilstand: S.focus = { code, units: [u…], cur, daily }, S.mast[code][id] = [boks 0–6, neste dag].
//  Dagens utfordring kan følge fokuset (S.focus.daily).
// ============================================================
const FOC_INT = [0, 1, 2, 4, 7, 14, 30], FOC_N = 8;
const focMast = code => ((S.mast ||= {})[code] ||= {});
// Rekkefølge: forståelsesspørsmål og regneoppgaver flettet (regneoppgaver vises som flervalg første gang, så alt starter lett)
function focIds(c, u){ const P = poolIds(c, [u]), calc = [...P.num, ...P.gen], out = [];
  for(let i = 0; i < Math.max(P.mc.length, calc.length); i++){ if(P.mc[i]) out.push(P.mc[i]); if(calc[i]) out.push(calc[i]); } return out; }
function focMastery(c, u){ const ids = focIds(c, u), m = focMast(c.code); if(!ids.length) return { pct: 0, ok: 0, n: 0 };
  const ok = ids.filter(id => (m[id] || [0])[0] >= 3).length; return { pct: ok / ids.length, ok, n: ids.length }; }
const focAddDays = n => dayKey(addDays(new Date(), n));
function focDue(c){ const m = focMast(c.code), td = dayKey(); return (S.focus.units || []).flatMap(u => focIds(c, u)).filter(id => m[id] && m[id][1] <= td && m[id][0] > 0); }
function focPlan(n = FOC_N){
  const f = S.focus, c = COURSE(f.code); if(!c) return [];
  const m = focMast(c.code), cur = focIds(c, f.cur), plan = [];
  const add = id => { if(id && !plan.includes(id) && plan.length < n) plan.push(id); };
  focDue(c).sort((a, b) => m[a][0] - m[b][0]).slice(0, Math.ceil(n * 0.4)).forEach(add);   // repetisjon som er på tur
  cur.filter(id => m[id] && m[id][0] < 2).slice(0, 3).forEach(add);                         // det du holder på å lære
  cur.filter(id => !m[id]).forEach(add);                                                     // nytt, i rekkefølge lett → vanskelig
  cur.slice().sort((a, b) => (m[a] || [0])[0] - (m[b] || [0])[0]).forEach(add);              // fyll opp med det svakeste
  return shuffle(plan);
}
function focItems(n){
  const c = COURSE(S.focus.code), m = focMast(c.code);
  return focPlan(n).map(id => { const box = (m[id] || [0])[0]; let it = null;
    try{ it = itemFromId(c, id, { mc: box === 0, strict: box >= 3 }); }catch(e){} return it; }).filter(Boolean);
}
function focStart(){
  if(!S.focus || !COURSE(S.focus.code)) { overlay = { focusPick: S.current }; renderOverlay(); return; }
  const items = focItems(FOC_N); if(!items.length){ toast(T("Fant ingen oppgaver i dette temaet.", "No problems in this topic.")); return; }
  startLesson("focus", S.focus.code, items, { focus: 1, fu: S.focus.cur }, 0);
}
// Kalles fra finishLesson for fokusøkter (og dagens utfordring når den følger fokuset)
function focRecord(){
  if(!S.focus) return null; const c = COURSE(S.focus.code); if(!c) return null;
  const m = focMast(c.code), td = dayKey();
  for(const raw of L.seen){ const id = String(raw).replace(/^[A-Z0-9]+:/, ""); if(!/^\d+\.g?\d+$/.test(id)) continue;
    const box = (m[id] || [0])[0];
    if(L.firstWrong.has(raw)) m[id] = [box > 0 ? 1 : 0, focAddDays(1)]; // bom: tilbake til start, ny sjanse i morgen
    else { const nb = Math.min(6, box + 1); m[id] = [nb, focAddDays(FOC_INT[nb])]; } }
  // mestret? bygg videre på neste enhet (det gamle blir med i repetisjonen)
  const ms = focMastery(c, S.focus.cur);
  if(ms.pct >= 0.8 && S.focus.cur + 1 < c.units.length && !S.focus.units.includes(S.focus.cur + 1)){
    const done = S.focus.cur; S.focus.cur = done + 1; S.focus.units.push(done + 1);
    return T(`🎉 Du mestrer «${unitTitle(c, done)}»! Neste tema: «${unitTitle(c, done + 1)}».`, `🎉 You master "${unitTitle(c, done)}"! Next topic: "${unitTitle(c, done + 1)}".`);
  }
  return null;
}
// ---------- kortet på Øv ----------
function focCardHTML(){
  const f = S.focus, c = f && COURSE(f.code);
  if(!c) return `<section class="fc-card fc-empty"><div class="fc-h"><span class="fc-ic" aria-hidden="true">🎯</span><div><b>${esc(T("Mitt fokus", "My focus"))}</b><small>${esc(T("Velg ett tema du vil bli god på. Du starter enkelt, får det du bommer på igjen til det sitter, og bygger videre når du er klar.", "Pick one topic you want to master. You start easy, get what you miss again until it sticks, and build on when you are ready."))}</small></div></div>
    <button class="big" data-a="focpick">${esc(T("Velg tema", "Choose a topic"))}</button></section>`;
  const ms = focMastery(c, f.cur), due = focDue(c).length;
  return `<section class="fc-card"><div class="fc-h"><span class="fc-ic" aria-hidden="true">🎯</span><div><small>${esc(T("Mitt fokus", "My focus"))} · ${esc(courseName(c))}</small><b>${esc(unitTitle(c, f.cur))}</b></div><button class="exlink" data-a="focpick">${esc(T("Bytt", "Change"))}</button></div>
    <div class="fc-bar"><i style="width:${Math.round(ms.pct * 100)}%"></i><span class="fc-goal" style="left:80%"></span></div>
    <p class="fc-sub">${esc(T(`${ms.ok} av ${ms.n} oppgavetyper sitter`, `${ms.ok} of ${ms.n} problem types mastered`))}${due ? ` · ${esc(T(`${due} til repetisjon i dag`, `${due} to review today`))}` : ""}${f.units.length > 1 ? ` · ${esc(T(`${f.units.length - 1} tema mestret`, `${f.units.length - 1} topics mastered`))}` : ""}</p>
    <button class="big" data-a="focstart">${esc(T(`Start økt (${FOC_N} oppgaver)`, `Start session (${FOC_N} problems)`))}</button>
    <label class="fc-daily"><input type="checkbox" data-a="focdaily" ${f.daily ? "checked" : ""}> ${esc(T("Dagens utfordring følger fokuset mitt", "The daily challenge follows my focus"))}</label></section>`;
}
// ---------- velg tema ----------
function focPickHTML(code){
  const list = myCourses().filter(c => !isDrive(c)), c = COURSE(code && list.some(x => x.code === code) ? code : (list[0] || {}).code);
  if(!c) return `<div class="dialog"><p>${esc(T("Velg et fag først.", "Choose a subject first."))}</p></div>`;
  return `<div class="dialog gm-menu fc-pick" role="dialog" aria-label="${esc(T("Velg fokus", "Choose focus"))}"><div class="sheet-h"><h3>🎯 ${esc(T("Hva vil du bli god på?", "What do you want to master?"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("back"))}">${I.x}</button></div>
    <div class="fc-courses hscroll">${[c, ...list.filter(x => x.code !== c.code)].map(x => `<button class="${x.code === c.code ? "on" : ""}" data-a="focpickc" data-c="${x.code}">${esc(courseShort(x))} · ${esc(courseName(x))}</button>`).join("")}</div>
    <div class="fc-units">${c.units.map((_, u) => { const ms = focMastery(c, u); if(!ms.n) return "";
      return `<button class="fc-unit" data-a="focset" data-c="${c.code}" data-u="${u}"><span class="fc-un">${u + 1}</span><span><b>${esc(unitTitle(c, u))}</b><small>${esc(T(`${ms.n} oppgavetyper`, `${ms.n} problem types`))}${ms.ok ? ` · ${Math.round(ms.pct * 100)} % ${esc(T("sitter", "mastered"))}` : ""}</small></span><span class="fc-mini"><i style="width:${Math.round(ms.pct * 100)}%"></i></span></button>`; }).join("")}</div></div>`;
}
function focClick(a, b){
  if(!a.startsWith("foc")) return false;
  const d = (b && b.dataset) || {};
  if(a === "focpick"){ overlay = { focusPick: (S.focus && S.focus.code) || S.current }; renderOverlay(); return true; }
  if(a === "focpickc"){ overlay = { focusPick: d.c }; renderOverlay(); return true; }
  if(a === "focset"){ const u = +d.u; S.focus = { code: d.c, units: [u], cur: u, daily: S.focus ? !!S.focus.daily : true }; save(); overlay = null; renderOverlay(); render(); toast(T("Fokus satt 🎯", "Focus set 🎯")); return true; }
  if(a === "focstart"){ focStart(); return true; }
  if(a === "focdaily"){ if(S.focus){ S.focus.daily = b.checked; save(); } return true; }
  return false;
}
