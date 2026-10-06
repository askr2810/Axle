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
    sub: ["Matte (1P–R2), realfag, naturfag, samfunnskunnskap, geografi, historie og religion og etikk", "Maths (1P–R2), sciences, natural science, social studies, geography, history and religion and ethics"] },
  { id: "oko", nb: "Økonomi og administrasjon", en: "Business and administration", ic: "📊", home: "OBED", tab: ["Økonomi", "Business"], slug: ["okonomi", "business"],
    sub: ["Bedriftsøkonomi, regnskap, matte, statistikk og samfunnsøkonomi", "Business economics, accounting, maths, statistics and economics"] },
  { id: "forer", nb: "Førerkort", en: "Driving licence", ic: "🚗", home: "FKB", tab: ["Førerkort", "Licence"], slug: ["forerkort", "driving-licence"],
    sub: ["Teoriprøven for bil (B) og motorsykkel (A1, A2, A)", "The theory test for car (B) and motorcycle (A1, A2, A)"] },
  { id: "jus", nb: "Rettsvitenskap", en: "Law", ic: "⚖️", home: "JMET", tab: ["Jus", "Law"], slug: ["jus", "law"],
    sub: ["Juridisk metode, statsrett, avtaler, erstatning, forvaltning og strafferett", "Legal method, constitutional, contract, tort, administrative and criminal law"] }
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
// Flere studier samtidig (f.eks. VGS + Førerkort): S.study er hovedstudiet (vises først), S.studies er alle du har valgt.
const myStudies = () => [S.study || "ing", ...(Array.isArray(S.studies) ? S.studies : [])].filter((x, i, a) => STUDIES.some(s => s.id === x) && a.indexOf(x) === i);
const inMyStudies = c => myStudies().some(s => inStudy(c, s));
const myCourses = () => COURSES.filter(inMyStudies);
function toggleStudy(id){
  const l = myStudies();
  if(l.includes(id)){ if(l.length === 1) return false; S.studies = l.filter(x => x !== id); if(S.study === id) setStudy(S.studies[0]); }
  else S.studies = [...l, id];
  S.studySet = 1; save(); return true;
}
// Verktøy som bare vises for studiene de hører til (med mindre «Vis alt» er slått på i Innstillinger).
const FEATURES = { trig: ["ing", "vgs", "oko"], forces: ["ing", "vgs"], lab: ["ing", "vgs", "oko"], proofs: ["ing", "vgs", "oko"], code: ["ing", "vgs"], maps: ["vgs"], motion: ["ing", "vgs"] };
const hasFeature = f => !!S.showAll || myStudies().some(s => (FEATURES[f] || []).includes(s));
// Bytt favorittstudie: husk siste fag i det gamle studiet og hopp til siste (eller første) fag i det nye.
function setStudy(id){
  const s = STUDY(id); S.lastCourse ||= {};
  if(S.current) S.lastCourse[curStudy()] = S.current;
  S.study = s.id; S.studySet = 1; S.pickStudy = null; S.studies = [s.id, ...(Array.isArray(S.studies) ? S.studies : []).filter(x => x !== s.id)];
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
// Studiet byttes sjelden, så fanene vises bare når man ber om å se andre studier (lenke nederst i lista) eller allerede ser på et annet.
let stBrowse = false;
function studyTabsHTML(){
  const v = viewStudy(), fav = curStudy(), mine = myStudies(), list = stBrowse ? STUDIES : STUDIES.filter(s => mine.includes(s.id) || s.id === v);
  if(list.length < 2) return "";
  return `<div class="study-tabs" role="tablist">${list.map(s => `<button role="tab" aria-selected="${s.id === v}" class="${s.id === v ? "on" : ""}" data-a="studyview" data-s="${s.id}"><span aria-hidden="true">${s.ic}</span>${esc(s.tab ? T(...s.tab) : studyName(s))}${s.id === fav ? `<i class="study-star" aria-label="${esc(t("stMine"))}">★</i>` : ""}</button>`).join("")}</div>
    ${!mine.includes(v) ? `<div class="study-note"><span>${esc(t("stViewing", studyName(STUDY(v))))}</span><button class="exlink" data-a="studyadd" data-s="${v}">＋ ${esc(T("Legg til i studiene mine", "Add to my studies"))}</button></div>` : ""}`;
}
function studyMoreHTML(){ return stBrowse || !myStudies().includes(viewStudy()) ? "" : `<button class="exlink st-more" data-a="studybrowse">🔎 ${esc(t("stBrowse"))}</button>`; }
// Velg studie: første gang (uten lukkeknapp) og fra Innstillinger.
function studyPickHTML(first){
  const mine = myStudies(), fresh = first && !S.studyPicked;
  return `<div class="dialog pop studypick" role="dialog" aria-label="${esc(t("stTitle"))}">
    <h3>${esc(t(first ? "stTitleFirst" : "stTitle"))}</h3><p>${esc(T("Velg ett eller flere. Du får fag, teori, utfordringer og verktøy som passer det du har valgt. ★ er det du ser først.", "Choose one or more. You get courses, theory, challenges and tools that fit your choices. ★ is what you see first."))}</p>
    ${STUDIES.map(s => { const on = !fresh && mine.includes(s.id), main = on && s.id === curStudy();
      return `<div class="st-row"><button class="st-btn ${on ? "on" : ""}" data-a="studytog" data-s="${s.id}" aria-pressed="${on}"><span class="st-ic" aria-hidden="true">${s.ic}</span>
      <span><b>${esc(studyName(s))}</b><small>${esc(T(s.sub[0], s.sub[1]))} · ${esc(t("stCourses", studyCourses(s.id).length))}</small></span><i class="st-check" aria-hidden="true">${on ? "✓" : ""}</i></button>
      ${on && mine.length > 1 ? `<button class="st-star ${main ? "on" : ""}" data-a="studyset" data-s="${s.id}" aria-label="${esc(T("Vis først", "Show first"))}" title="${esc(T("Vis først", "Show first"))}">${main ? "★" : "☆"}</button>` : ""}</div>`; }).join("")}
    <p class="lp-note">${esc(t("stLater"))}</p>${first ? `<p class="lp-note">${esc(T("Axle er et gratis øvingsverktøy og kan inneholde feil. Ved å bruke appen godtar du", "Axle is a free practice tool and may contain mistakes. By using the app you accept the"))} <button class="exlink" data-a="terms">${esc(T("vilkårene", "terms"))}</button>.</p>` : ""}<button class="big" data-a="studydone" ${fresh ? "disabled" : ""}>${esc(first ? T("Fortsett", "Continue") : T("Ferdig", "Done"))}</button></div>`;
}
function studyClick(a, b){
  if(!a.startsWith("study")) return false;
  if(a === "studyopen"){ overlay = { studypick: 1 }; renderOverlay(); }
  else if(a === "studybrowse"){ stBrowse = true; render(); window.scrollTo(0, 0); }
  else if(a === "studyset"){ setStudy(b.dataset.s); renderOverlay(); toast(t("stSet", studyName(STUDY(b.dataset.s)))); }
  else if(a === "studytog"){ const id = b.dataset.s;
    if(overlay && overlay.first && !S.studyPicked){ S.studyPicked = 1; S.studies = []; setStudy(id); } // første valg blir hovedstudiet
    else if(!toggleStudy(id)) toast(T("Du må ha minst ett studie", "You need at least one field"));
    renderOverlay(); }
  else if(a === "studydone"){ const first = overlay && overlay.first; S.studySet = 1; S.studyPicked = 1; if(!inMyStudies(COURSE(S.current))) S.current = STUDY(S.study).home; save(); overlay = null; renderOverlay(); goHome(); if(first) setTimeout(bootPrompts, 400); }
  else if(a === "studyadd"){ toggleStudy(b.dataset.s); S.pickStudy = null; stBrowse = false; toast(T(`${studyName(STUDY(b.dataset.s))} er lagt til`, `${studyName(STUDY(b.dataset.s))} was added`)); render(); }
  else if(a === "studyshowall"){ S.showAll = !S.showAll; save(); render(); }
  else if(a === "studyview"){ S.pickStudy = b.dataset.s === curStudy() ? null : b.dataset.s; if(myStudies().includes(b.dataset.s)) stBrowse = false; saveLocal(); render(); }
  else if(a === "studyfav"){ stBrowse = false; setStudy(b.dataset.s); toast(t("stSet", studyName(STUDY(b.dataset.s)))); render(); }
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
