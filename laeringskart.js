// ============================================================
//  LÆRINGSKART (AX-22): tegner kartene i laeringskart_data.js som en loddrett sti, trinn for trinn.
//  Hver node lenker til fagets teoriside i appen. Fremgangen er den som allerede lagres per fag
//  (courseProgress i app.js) – ingen nye data eller tabeller. Noder uten fag vises som «kommer».
// ============================================================
let LK = { id: "maskiningenior" };
function lkOpen(id){ LK = { id: lkMap(id) ? id : LK_MAPS[0].id }; screen = "lk"; overlay = null; render(); window.scrollTo(0, 0); }
const lkHas = n => !!(n.code && COURSES.some(c => c.code === n.code));
function lkNodeHTML(m, n){
  const pre = lkPrereq(m, n.id), preHTML = pre.length ? `<span class="lk-pre">Bygger på: ${pre.map(p => esc(p.t)).join(", ")}</span>` : "";
  if(!lkHas(n)) return `<li class="lk-node lk-soon"><span class="lk-dot" aria-hidden="true"></span><div class="lk-card"><b>${esc(n.t)}</b><small>${esc(n.why)}</small>${preHTML}<span class="lk-tag">Kommer</span></div></li>`;
  const c = COURSE(n.code), p = courseProgress(c), pct = p.tot ? Math.round(p.d / p.tot * 100) : 0, done = p.tot && p.d >= p.tot;
  return `<li class="lk-node${done ? " lk-done" : p.d ? " lk-going" : ""}"><span class="lk-dot" aria-hidden="true"></span><button class="lk-card" data-a="lkgo" data-code="${esc(n.code)}">
    <b>${esc(n.t)}</b><small>${esc(n.why)}</small>${preHTML}
    <span class="lk-prog"><span class="pf-bar"><i style="width:${pct}%"></i></span><span>${p.d ? `${p.d} av ${p.tot} steg` : "Ikke startet"}</span></span></button></li>`;
}
function renderLk(){
  const m = lkMap(LK.id) || LK_MAPS[0], has = m.nodes.filter(lkHas);
  const started = has.filter(n => courseProgress(COURSE(n.code)).d > 0).length;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="lkback" aria-label="Tilbake">${I.left}</button>
      <div class="th-t"><small>Læringskart</small><b>${esc(m.t)}</b></div><span class="pf-count">${started}/${has.length}</span></div></div>
    <main class="wrap lk">
      <p class="pf-intro">${esc(m.intro)}</p>
      <p class="lk-disc" role="note">${esc(LK_DISCLAIMER)}</p>
      ${m.sections.map(s => { const ns = m.nodes.filter(n => n.sec === s.id); return ns.length ? `<section class="lk-sec"><h2><span>${esc(s.t)}</span><small>${esc(s.sub)}</small></h2><ol class="lk-path">${ns.map(n => lkNodeHTML(m, n)).join("")}</ol></section>` : ""; }).join("")}
      <p class="fr-hint">${has.length} av ${m.nodes.length} steg finnes i Axle. Steg merket «Kommer» er ikke laget ennå.</p>
    </main>`;
}
function lkCtaHTML(){ const m = LK_MAPS[0]; return `<button class="pf-cta lk-cta" data-a="lkopen" data-id="${m.id}"><span class="pf-cta-ic" aria-hidden="true">${svg('<circle cx="6" cy="5" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="19" r="2"/><path d="M8 5h4a4 4 0 0 1 4 4v1M16 14v1a4 4 0 0 1-4 4H8"/>', 24)}</span><span><b>Læringskart</b><small>${esc(m.t)}</small></span>${I.chevron}</button>`; }
function lkClick(a, b){
  if(!a.startsWith("lk")) return false;
  if(a === "lkopen") lkOpen(b.dataset.id);
  else if(a === "lkback") openBook(true);
  else if(a === "lkgo"){ const code = b.dataset.code; if(!COURSES.some(c => c.code === code)) return true; BK = { v: "course", code, u: 0, tab: "topics", q: "" }; screen = "book"; render(); window.scrollTo(0, 0); }
  else return false;
  return true;
}
