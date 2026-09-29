// ============================================================
//  LABBEN – alt man kan dra i, samlet ett sted: de store labene (enhetssirkelen, kraftlaben)
//  og alle «Prøv selv»-simuleringene fra teorien, gruppert etter fag og søkbare.
//  Nås fra Teori-fanen, Bevis-siden, spillmenyen i Øv, søket i Teori og #/lab (#/lab/<simulering>).
//  Labene lenkes også fra teorisidene der de passer (LABS[].units).
// ============================================================
let LB = { q: "", sim: null, from: "home" };
Object.assign(UI.nb, { labTitle: "Labben", labSub: "Alt du kan dra i, samlet og søkbart" });
Object.assign(UI.en, { labTitle: "The lab", labSub: "Everything you can drag, collected and searchable" });
const LABS = [
  { id: "trig", ic: "🎯", t: ["Enhetssirkelen", "The unit circle"], sub: ["Sin, cos, tan, eksakte verdier, radianer, grafer, likninger og øving", "Sin, cos, tan, exact values, radians, graphs, equations and practice"],
    kw: "trigonometri trigonometry sinus cosinus tangens sin cos tan enhetssirkel unit circle radianer radians vinkel angle eksakte verdier exact values likning equation graf graph periode period", units: ["VG1T:3", "VGR2:3", "GMAT:5"], open: () => tgOpen("explore", screen) },
  { id: "forces", ic: "🪢", t: ["Snorer, trinser og krefter", "Ropes, pulleys and forces"], sub: ["Lodd i to snorer, trinser med motvekter og talje, med dekomponering", "A load in two ropes, pulleys with counterweights and block and tackle, with decomposition"],
    kw: "snordrag tension kraft force krefter forces dekomponering decomposition komponenter components trinse pulley talje tackle statikk statics likevekt equilibrium vektor vector tau rope snor lodd vinkel angle newton", units: ["GFYS:2", "VGFY1:1", "MAPE1300:0", "MAPE1300:1"], open: () => fcOpen("ropes", screen) }
];
// Faget (første kobling i SIM_MAP) som en simulering hører til, for gruppering og «Brukes i».
function labSimUses(name){
  const out = []; for(const k in SIM_MAP){ if([].concat(SIM_MAP[k]).includes(name)){ const [code, u] = k.split(":"), c = COURSE(code); if(c && c.units[+u]) out.push({ code, u: +u, c }); } }
  return out;
}
let LAB_CACHE = null;
function labSims(){
  if(LAB_CACHE && LAB_CACHE.lang === LANG) return LAB_CACHE.list;
  const list = Object.keys(SIMS).map(name => { const s = SIMS[name], uses = labSimUses(name), c = uses[0] && uses[0].c;
    const grp = c ? (c.group || courseName(c)) : T("Annet", "Other");
    return { name, t: T(s.t[0], s.t[1]), grp, uses, hay: [s.t[0], s.t[1], grp, ...uses.map(x => courseName(x.c) + " " + unitTitle(x.c, x.u))].join(" ").toLowerCase() }; });
  LAB_CACHE = { lang: LANG, list }; return list;
}
const labNorm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const labMatch = (hay, q) => labNorm(q).split(/\s+/).filter(Boolean).every(w => labNorm(hay).includes(w));
function labSearch(q){
  q = String(q || "").trim(); if(!q) return { labs: [], sims: [] };
  return { labs: LABS.filter(l => labMatch([l.t[0], l.t[1], l.sub[0], l.sub[1], l.kw].join(" "), q)), sims: labSims().filter(s => labMatch(s.hay, q)).slice(0, 12) };
}
const labCardHTML = l => `<button class="pf-card lab-big" data-a="labgo" data-id="${l.id}"><span class="pf-ic" aria-hidden="true">${l.ic}</span><span class="pf-tx"><b>${esc(T(l.t[0], l.t[1]))}</b><small>${esc(T(l.sub[0], l.sub[1]))}</small></span>${I.chevron}</button>`;
const labSimRow = s => `<button class="lab-sim" data-a="labsim" data-s="${s.name}"><span class="lab-si" aria-hidden="true">${I.bolt}</span><span><b>${esc(s.t)}</b><small>${esc(s.uses.length ? s.uses.slice(0, 2).map(x => courseName(x.c)).join(" · ") : s.grp)}</small></span>${(S.simGoals || {})[s.name] >= (SIMS[s.name].g || []).length && (SIMS[s.name].g || []).length ? `<em class="pf-ok">✓</em>` : I.chevron}</button>`;
function labListHTML(){
  const q = LB.q.trim();
  if(q){ const r = labSearch(q); if(!r.labs.length && !r.sims.length) return `<p class="bk-empty">${esc(T("Ingen treff. Prøv et annet ord, for eksempel «kraft», «sinus» eller «strøm».", "No hits. Try another word, for example \"force\", \"sine\" or \"current\"."))}</p>`;
    return r.labs.map(labCardHTML).join("") + r.sims.map(labSimRow).join(""); }
  const groups = {}; labSims().forEach(s => (groups[s.grp] ||= []).push(s));
  const mine = new Set(studyCourses(curStudy()).map(c => c.group || courseName(c)));
  const order = Object.keys(groups).sort((a, b) => (mine.has(b) - mine.has(a)) || a.localeCompare(b, "nb"));
  return `<h4 class="grp">${esc(T("Store laber", "Big labs"))}</h4>${LABS.map(labCardHTML).join("")}
    <h4 class="grp">${esc(T(`Prøv selv (${labSims().length})`, `Try it yourself (${labSims().length})`))}</h4>
    ${order.map(g => `<details class="lab-grp ${mine.has(g) ? "mine" : ""}"><summary><b>${esc(g)}</b><span>${groups[g].length}</span></summary>${groups[g].map(labSimRow).join("")}</details>`).join("")}`;
}
function renderLab(){
  const top = (title, small) => `<div class="top"><div class="wrap"><button class="iconbtn" data-a="labback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(small)}</small><b>${esc(title)}</b></div></div></div>`;
  if(LB.sim && SIMS[LB.sim]){
    const uses = labSimUses(LB.sim);
    $app.innerHTML = `${top(T(SIMS[LB.sim].t[0], SIMS[LB.sim].t[1]), T("Labben", "The lab"))}<main class="wrap lab-one">${simHTML(LB.sim)}
      ${uses.length ? `<h4 class="grp">${esc(T("Brukes i teorien", "Used in the theory"))}</h4><div class="lab-uses">${uses.map(x => `<button class="bk-hit" data-a="bkunit" data-c="${x.code}" data-u="${x.u}"><small>${esc(courseName(x.c))}</small><b>${esc(unitTitle(x.c, x.u))}</b></button>`).join("")}</div>` : ""}
      <button class="exlink" data-a="lablist">🧪 ${esc(T("Alle interaktive figurer", "All interactive figures"))}</button></main>`;
    return;
  }
  $app.innerHTML = `${top(T("Labben", "The lab"), T("Alt du kan dra i", "Everything you can drag"))}<main class="wrap lab">
    <p class="pf-intro">${esc(T("Interaktive figurer fra alle fagene samlet ett sted. Dra, skru og se hva som skjer. Du finner dem også inne i teorien der de hører hjemme.", "Interactive figures from all subjects in one place. Drag, turn and see what happens. You also find them inside the theory where they belong."))}</p>
    <label class="bk-search">${I.search}<input type="search" id="labq" placeholder="${esc(T("Søk: kraft, sinus, strøm, pH …", "Search: force, sine, current, pH …"))}" aria-label="${esc(T("Søk i labben", "Search the lab"))}" value="${esc(LB.q)}" autocomplete="off"></label>
    <div id="lablist">${labListHTML()}</div></main>`;
  const inp = document.getElementById("labq"); if(inp) inp.addEventListener("input", () => { LB.q = inp.value; document.getElementById("lablist").innerHTML = labListHTML(); });
}
function labOpen(sim, from){ LB.from = from || (screen === "lab" ? LB.from : screen); LB.sim = sim && SIMS[sim] ? sim : null; overlay = null; screen = "lab"; render(); window.scrollTo(0, 0); }
// Tilbake dit man kom fra (skjermer som trenger tilstand, faller tilbake til forsiden).
function labBack(f){
  cancelAnimationFrame(TG.anim); TG.anim = 0;
  if((f === "theory" && TH) || (f === "guided" && GD) || ["proofs", "practice", "book", "lab", "profile"].includes(f)){ if(f === "lab") LB.sim = null; screen = f; render(); window.scrollTo(0, 0); }
  else goHome();
}
function labClick(a, b){
  if(!a.startsWith("lab")) return false;
  const d = b && b.dataset;
  if(a === "labopen"){ labOpen(null, screen); return true; }
  if(a === "labgo"){ const l = LABS.find(x => x.id === d.id); if(l) l.open(); return true; }
  if(a === "labsim"){ if(screen === "lab"){ LB.sim = d.s; render(); window.scrollTo(0, 0); } else labOpen(d.s, screen); return true; }
  if(a === "lablist"){ LB.sim = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "labback"){ if(LB.sim){ LB.sim = null; render(); window.scrollTo(0, 0); } else labBack(LB.from); return true; }
  return false;
}
// Knapper på teorisiden til labene som passer enheten.
function labTheoryHTML(code, u){
  const ls = LABS.filter(l => l.units.includes(code + ":" + u)); if(!ls.length) return "";
  return `<div class="pf-links">${ls.map(l => `<button class="pf-link lab-link" data-a="labgo" data-id="${l.id}"><span aria-hidden="true">${l.ic}</span><span><small>${esc(T("Interaktiv lab", "Interactive lab"))}</small><b>${esc(T(l.t[0], l.t[1]))}</b></span>${I.chevron}</button>`).join("")}</div>`;
}
// Stort kort (Teori-fanen og Bevis-siden).
const labCtaHTML = () => `<button class="pf-cta lab-cta" data-a="labopen"><span class="pf-cta-ic" aria-hidden="true">🧪</span><span><b>${esc(T("Labben: alt du kan dra i", "The lab: everything you can drag"))}</b><small>${esc(T(`Enhetssirkelen, kraftlaben og ${Object.keys(SIMS).length} andre figurer`, `The unit circle, the force lab and ${Object.keys(SIMS).length} other figures`))}</small></span>${I.chevron}</button>`;
// Treff i Teori-søket.
function labHitsHTML(q){
  const r = labSearch(q); if(!r.labs.length && !r.sims.length) return "";
  return r.labs.map(l => `<button class="bk-hit lab-hit" data-a="labgo" data-id="${l.id}"><small>🧪 ${esc(T("Interaktiv lab", "Interactive lab"))}</small><b>${l.ic} ${esc(T(l.t[0], l.t[1]))}</b><span>${esc(T(l.sub[0], l.sub[1]))}</span></button>`).join("") +
    r.sims.slice(0, 4).map(s => `<button class="bk-hit lab-hit" data-a="labsim" data-s="${s.name}"><small>⚡ ${esc(T("Prøv selv", "Try it"))} · ${esc(s.grp)}</small><b>${esc(s.t)}</b></button>`).join("");
}

// ---------- innebygd i de åpne nettsidene (?embed=1#/enhetssirkel/utforsk, #/krefter/snorer, #/lab/<sim>) ----------
// Bare laben vises: ingen fanelinje, topplinje eller popups. Høyden sendes til siden rundt (postMessage), så rammen vokser med innholdet.
const EMBED_SCREENS = ["trig", "forces", "lab"];
function embedInit(){
  document.documentElement.classList.add("embed");
  if(!EMBED_SCREENS.includes(screen)){ screen = "lab"; LB.sim = null; render(); }
  window.addEventListener("resize", embedPost);
  if(typeof ResizeObserver !== "undefined") new ResizeObserver(embedPost).observe(document.body);
}
let EMBED_H = 0;
function embedPost(){
  const h = Math.ceil(document.getElementById("app").getBoundingClientRect().height) + 4;
  if(h === EMBED_H) return; EMBED_H = h;
  try{ parent.postMessage({ axleEmbed: 1, h }, "*"); }catch(e){}
}
let EMBED_LAST = null;
function embedAfterRender(){
  if(!EMBED_SCREENS.includes(screen)){ // noe utenfor laben: åpne det i hele appen i en ny fane, og bli i laben her
    const r = routeOf(); window.open(shareUrl(r || "") .replace("#", (LANG === "en" ? "?lang=en" : "") + "#"), "_blank", "noopener");
    const back = EMBED_LAST || { screen: "lab" }; setTimeout(() => { screen = back.screen; render(); }, 0); return;
  }
  EMBED_LAST = { screen };
  const r = routeOf(), url = shareUrl(r || "").replace("#", (LANG === "en" ? "?lang=en" : "") + "#");
  const bar = `<div class="emb-bar"><span>⚡ ${esc(T("Interaktivt fra Axle", "Interactive from Axle"))}</span><a href="${esc(url)}" target="_blank" rel="noopener">${esc(T("Åpne i appen", "Open in the app"))} ↗</a></div>`;
  $app.insertAdjacentHTML("afterbegin", bar);
  setTimeout(embedPost, 30);
}
