// ============================================================
//  STUDIER – Axle dekker flere studier (ingeniør, sykepleie, videregående …).
//  Hvert fag hører til ett eller flere studier: c.study = "syk" eller ["ing", "vgs"] (standard "ing").
//  S.study = favorittstudiet (det man lander på), S.studySet = valgt (spørres ikke igjen).
//  Man kan alltid se og øve på fag fra andre studier uten å bytte favoritt (S.pickStudy = studiet man ser på i lista).
// ============================================================
const STUDIES = [
  { id: "ing", nb: "Ingeniør", en: "Engineering", ic: "⚙️", home: "MEK1000", slug: ["ingenior", "engineering"],
    sub: ["Matte, fysikk, mekanikk, elektro, data og mer", "Maths, physics, mechanics, electrical, computing and more"] },
  { id: "syk", nb: "Sykepleie", en: "Nursing", ic: "🩺", home: "SLMR", slug: ["sykepleie", "nursing"],
    sub: ["Legemiddelregning, anatomi, farmakologi og smittevern", "Drug calculations, anatomy, pharmacology and infection control"] },
  { id: "vgs", nb: "Videregående", en: "Upper secondary", ic: "🎒", home: "VG1T", tab: ["VGS", "Upper sec."], slug: ["videregaende", "upper-secondary"],
    sub: ["Studiespesialisering: 1T, R1, R2, S1, S2, fysikk, kjemi og biologi", "General studies: maths 1T, R1, R2, S1, S2, physics, chemistry and biology"] },
  { id: "oko", nb: "Økonomi og administrasjon", en: "Business and administration", ic: "📊", home: "OBED", tab: ["Økonomi", "Business"], slug: ["okonomi", "business"],
    sub: ["Bedriftsøkonomi, regnskap, matte, statistikk og samfunnsøkonomi", "Business economics, accounting, maths, statistics and economics"] }
];
// Fag som passer i flere studier (grunnkursene brukes både av ingeniører og på videregående).
for(const code of ["GMAT", "GFYS"]){ const c = COURSES.find(x => x.code === code); if(c) c.study = ["ing", "vgs"]; }
{ const c = COURSES.find(x => x.code === "OKON"); if(c) c.study = ["ing", "oko"]; }
const studiesOf = c => !c ? ["ing"] : Array.isArray(c.study) ? c.study : [c.study || "ing"];
const studyOf = c => studiesOf(c)[0];
const inStudy = (c, id) => studiesOf(c).includes(id);
const STUDY = id => STUDIES.find(s => s.id === id) || STUDIES[0];
const curStudy = () => STUDY(S.study).id;
const viewStudy = () => STUDY(S.pickStudy || S.study).id; // studiet man ser på i fag- og teorilista
const studyName = s => T(s.nb, s.en);
const studyCourses = id => COURSES.filter(c => inStudy(c, id));
// Bytt favorittstudie: husk siste fag i det gamle studiet og hopp til siste (eller første) fag i det nye.
function setStudy(id){
  const s = STUDY(id); S.lastCourse ||= {};
  if(S.current) S.lastCourse[curStudy()] = S.current;
  S.study = s.id; S.studySet = 1; S.pickStudy = null;
  if(!inStudy(COURSE(S.current), s.id)){ const last = S.lastCourse[s.id]; S.current = last && COURSES.some(c => c.code === last && inStudy(c, s.id)) ? last : s.home; }
  save();
}
// Nye brukere spørres én gang; de som allerede har fremgang (fra før studiene fantes) er ingeniører.
function studyNeedsAsk(){
  if(S.studySet) return false;
  if((+S.xp || 0) > 0){ S.study = S.study || "ing"; S.studySet = 1; saveLocal(); return false; }
  return true;
}
// Faner øverst i fag- og teorilista: bytt hvilket studie du ser på.
function studyTabsHTML(){
  const v = viewStudy(), fav = curStudy();
  return `<div class="study-tabs" role="tablist">${STUDIES.map(s => `<button role="tab" aria-selected="${s.id === v}" class="${s.id === v ? "on" : ""}" data-a="studyview" data-s="${s.id}"><span aria-hidden="true">${s.ic}</span>${esc(s.tab ? T(...s.tab) : studyName(s))}${s.id === fav ? `<i class="study-star" aria-label="${esc(t("stMine"))}">★</i>` : ""}</button>`).join("")}</div>
    ${v !== fav ? `<div class="study-note"><span>${esc(t("stViewing", studyName(STUDY(v))))}</span><button class="exlink" data-a="studyfav" data-s="${v}">★ ${esc(t("stMakeMine"))}</button></div>` : ""}`;
}
// Velg studie: første gang (uten lukkeknapp) og fra Innstillinger.
function studyPickHTML(first){
  return `<div class="dialog pop studypick" role="dialog" aria-label="${esc(t("stTitle"))}">
    <h3>${esc(t(first ? "stTitleFirst" : "stTitle"))}</h3><p>${esc(t("stText"))}</p>
    ${STUDIES.map(s => `<button class="st-btn ${!first && s.id === curStudy() ? "on" : ""}" data-a="studyset" data-s="${s.id}"><span class="st-ic" aria-hidden="true">${s.ic}</span>
      <span><b>${esc(studyName(s))}</b><small>${esc(T(s.sub[0], s.sub[1]))} · ${esc(t("stCourses", studyCourses(s.id).length))}</small></span>${!first && s.id === curStudy() ? `<em>★</em>` : ""}</button>`).join("")}
    <p class="lp-note">${esc(t("stLater"))}</p>${first ? "" : `<button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button>`}</div>`;
}
function studyClick(a, b){
  if(!a.startsWith("study")) return false;
  if(a === "studyopen"){ overlay = { studypick: 1 }; renderOverlay(); }
  else if(a === "studyset"){ const first = !S.studySet; setStudy(b.dataset.s); overlay = null; renderOverlay(); toast(t("stSet", studyName(STUDY(b.dataset.s)))); goHome(); if(first) setTimeout(bootPrompts, 400); }
  else if(a === "studyview"){ S.pickStudy = b.dataset.s === curStudy() ? null : b.dataset.s; saveLocal(); render(); }
  else if(a === "studyfav"){ setStudy(b.dataset.s); toast(t("stSet", studyName(STUDY(b.dataset.s)))); render(); }
  else return false;
  return true;
}
// axle.no/?studie=sykepleie (fra de åpne studiesidene): velg studiet hvis man ikke har valgt før.
(function studyLink(){
  let q = null; try{ q = new URLSearchParams(location.search).get("studie"); }catch(e){}
  if(!q) return;
  const s = STUDIES.find(x => x.id === q || x.slug.includes(q));
  window.STUDY_URL = s ? s.id : null;
  try{ const p = new URLSearchParams(location.search); p.delete("studie"); history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "") + location.hash); }catch(e){}
})();
