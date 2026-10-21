// ============================================================
//  LÆRINGSKART (AX-22, AX-22b): tegner kartene i laeringskart_data.js. Bred skjerm (≥ 700 px): svømmebaner, én kolonne per
//  fagområde og én rad per trinn, med rette linjer bare mellom steg i samme kolonne. Forkunnskaper på tvers vises som buede
//  piler først når man peker på / fokuserer et kort (resten tones ned). Smal skjerm: loddrett sti uten linjer.
//  Hver node lenker til fagets teoriside i appen. Fremgangen er den som allerede lagres per fag
//  (courseProgress i app.js) – ingen nye data eller tabeller. Noder uten fag vises som «kommer».
// ============================================================
// LK.id = null gir oversikten over alle kart (fanen «Læringskart»); LK.focus = node som fremheves og rulles fram.
let LK = { id: null, focus: null };
function lkOpen(id, focus){ LK = { id: lkMap(id) ? id : null, focus: focus || null }; screen = "lk"; overlay = null; render(); if(!LK.focus) window.scrollTo(0, 0); }
// Kartene et fag er med i (til «Del av: …» på emnesidene)
const lkMapsOf = code => LK_MAPS.map(m => ({ m, n: m.nodes.find(n => n.code === code) })).filter(x => x.n);
function lkChipHTML(code){ return lkMapsOf(code).map(({ m, n }) => `<button class="lk-chip lk-a-${esc(n.area)}" data-a="lkopen" data-id="${esc(m.id)}" data-node="${esc(n.id)}"><i aria-hidden="true"></i>Del av: ${esc(m.t)}</button>`).join(""); }
function renderLkHome(){
  $app.innerHTML = `<div class="top"><div class="wrap"><div class="th-t"><small>Læringskart</small><b>Velg en læringsvei</b></div></div></div>
    <main class="wrap lk lk-home"><p class="pf-intro">Læringskartene viser en mulig rekkefølge gjennom fagene i Axle, fra videregående til studiet. Hvert steg lenker til faget, og fremgangen din vises underveis.</p>
      <p class="lk-disc" role="note">${esc(LK_DISCLAIMER)}</p>
      ${LK_MAPS.map(m => { const has = m.nodes.filter(lkHas), st = has.filter(n => courseProgress(COURSE(n.code)).d > 0).length, areas = [...new Set(m.nodes.map(n => n.area))];
        return `<button class="lk-mapcard" data-a="lkopen" data-id="${esc(m.id)}"><span class="lk-mapbar">${areas.map(a => `<i class="lk-a-${esc(a)}"></i>`).join("")}</span>
          <b>${esc(m.t)}</b><small>${esc(m.intro)}</small><span class="lk-mapmeta">${m.nodes.length} steg i ${m.sections.length} trinn · ${has.length} finnes i Axle · ${st} påbegynt</span>${I.chevron}</button>`; }).join("")}
      <p class="fr-hint">Flere læringskart kommer.</p></main>`;
}
const lkHas = n => !!(n.code && COURSES.some(c => c.code === n.code));
function lkNodeHTML(m, n){
  const pre = lkPrereq(m, n.id), preHTML = pre.length ? `<span class="lk-pre">Bygger på: ${pre.map(p => esc(p.t)).join(", ")}</span>` : "";
  if(!lkHas(n)) return `<li class="lk-node lk-soon lk-a-${esc(n.area)}" data-id="${esc(n.id)}" tabindex="0"><span class="lk-dot" aria-hidden="true"></span><div class="lk-card"><b>${esc(n.t)}</b><small>${esc(n.why)}</small>${preHTML}<span class="lk-tag">Kommer</span></div></li>`;
  const c = COURSE(n.code), p = courseProgress(c), pct = p.tot ? Math.round(p.d / p.tot * 100) : 0, done = p.tot && p.d >= p.tot;
  return `<li class="lk-node lk-a-${esc(n.area)}${done ? " lk-done" : p.d ? " lk-going" : ""}" data-id="${esc(n.id)}"><span class="lk-dot" aria-hidden="true"></span><button class="lk-card" data-a="lkgo" data-code="${esc(n.code)}">
    <b>${esc(n.t)}</b><small>${esc(n.why)}</small>${preHTML}
    <span class="lk-prog"><span class="pf-bar"><i style="width:${pct}%"></i></span><span>${p.d ? `${p.d} av ${p.tot} steg` : "Ikke startet"}</span></span></button></li>`;
}
function renderLk(){
  if(!lkMap(LK.id)) return renderLkHome();
  const m = lkMap(LK.id), has = m.nodes.filter(lkHas);
  const started = has.filter(n => courseProgress(COURSE(n.code)).d > 0).length;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="lkback" aria-label="Tilbake">${I.left}</button>
      <div class="th-t"><small>Læringskart</small><b>${esc(m.t)}</b></div><span class="pf-count">${started}/${has.length}</span></div></div>
    <main class="wrap lk">
      <p class="pf-intro">${esc(m.intro)}</p>
      <p class="lk-disc" role="note">${esc(LK_DISCLAIMER)}</p>
      <ul class="lk-legend" aria-label="Fagområder">${m.areas.map(a => `<li class="lk-a-${esc(a.id)}"><i aria-hidden="true"></i>${esc(a.t)}</li>`).join("")}</ul>
      <div class="lk-scroll"><div class="lk-lanes" id="lkgraph" style="--cols:${m.areas.length};--rows:${m.sections.length}"><svg class="lk-edges" id="lkedges" aria-hidden="true"></svg>
        <span class="lk-corner" style="grid-row:1;grid-column:1"></span>
        ${m.areas.map((a, i) => `<div class="lk-lanehd lk-a-${esc(a.id)}" style="grid-row:1;grid-column:${i + 2}"><i aria-hidden="true"></i>${esc(a.t)}</div>`).join("")}
        ${m.sections.map((sc, r) => `<div class="lk-band${r % 2 ? " alt" : ""}" style="grid-row:${r + 2};grid-column:1/-1"></div><div class="lk-stage" style="grid-row:${r + 2}"><b>${esc(sc.t)}</b><small>${esc(sc.sub)}</small></div>` +
          m.areas.map((a, i) => { const ns = m.nodes.filter(n => n.sec === sc.id && n.area === a.id); return ns.length ? `<ol class="lk-cell" style="grid-row:${r + 2};grid-column:${i + 2}">${ns.map(n => lkNodeHTML(m, n)).join("")}</ol>` : ""; }).join("")).join("")}
      </div></div>
      <div class="lk-list">
      ${m.sections.map(s => { const ns = m.nodes.filter(n => n.sec === s.id); return ns.length ? `<section class="lk-sec"><h2><span>${esc(s.t)}</span><small>${esc(s.sub)}</small></h2><ol class="lk-path">${ns.map(n => lkNodeHTML(m, n)).join("")}</ol></section>` : ""; }).join("")}</div>
      <p class="fr-hint">${has.length} av ${m.nodes.length} steg finnes i Axle. Steg merket «Kommer» er ikke laget ennå. Pek på et steg for å se hva det bygger på og hva det leder til.</p>
    </main>`;
  requestAnimationFrame(() => { lkDraw(m); lkFocus(); });
}
// Fra «Del av»-lenken: rull noden fram og fremhev den (og kantene dens) en stund.
function lkFocus(){
  const id = LK.focus, wide = document.getElementById("lkgraph"), g = wide && wide.offsetParent ? wide : document.querySelector(".lk-list"); if(!id || !g) return; LK.focus = null;
  const li = g.querySelector(`.lk-node[data-id="${id}"]`); if(!li) return;
  li.classList.add("lk-focus"); li.scrollIntoView({ block: "center" }); lkHl(g, id);
  setTimeout(() => { li.classList.remove("lk-focus"); if(!g.matches(":hover")) lkHl(g, null); }, 4000);
}
// Kantene (forkunnskap → steg) som buede piler i SVG over rutenettet. Bare på bred skjerm; på mobil viser stien og «Bygger på» det samme.
// Tegnes på nytt når størrelsen endres (ResizeObserver), og når skriftene er lastet.
let LK_RO = null;
function lkDraw(m){
  const g = document.getElementById("lkgraph"), sv = document.getElementById("lkedges"); if(!g || !sv) return;
  if(!LK_RO && typeof ResizeObserver !== "undefined"){ LK_RO = new ResizeObserver(() => { const mm = lkMap(LK.id); if(screen === "lk" && mm) lkDraw(mm); }); }
  if(LK_RO && g.dataset.ro !== "1"){ LK_RO.disconnect(); LK_RO.observe(g); g.dataset.ro = "1"; if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => lkDraw(m)); }
  const W = g.clientWidth, H = g.clientHeight; sv.setAttribute("viewBox", `0 0 ${W} ${H}`); sv.setAttribute("width", W); sv.setAttribute("height", H);
  if(!g.offsetParent || W < 600){ sv.innerHTML = ""; return; }
  const gr = g.getBoundingClientRect(), box = id => { const el = g.querySelector(`.lk-node[data-id="${id}"] .lk-card`); if(!el) return null; const r = el.getBoundingClientRect(); return { x: r.left - gr.left, y: r.top - gr.top, w: r.width, h: r.height }; };
  const col = id => { const el = g.querySelector(`.lk-node[data-id="${id}"]`); return el ? getComputedStyle(el).getPropertyValue("--lk").trim() : "#888"; };
  // flere kanter inn til samme kort spres litt langs toppkanten, så pilene ikke ligger oppå hverandre
  const into = {}, outof = {}; m.edges.forEach(([a, b]) => { (into[b] ||= []).push(a); (outof[a] ||= []).push(b); });
  const spread = (list, k, w) => list.length < 2 ? 0 : (k / (list.length - 1) - .5) * Math.min(w * .5, 24 * (list.length - 1));
  // Standard: bare rette, loddrette linjer mellom steg som følger etter hverandre i samme kolonne (samme fagområde).
  let out = "";
  for(const a of m.areas){
    const ids = m.sections.flatMap(sc => m.nodes.filter(n => n.sec === sc.id && n.area === a.id).map(n => n.id));
    for(let i = 1; i < ids.length; i++){ const A = box(ids[i - 1]), B = box(ids[i]); if(!A || !B) continue; const x = A.x + A.w / 2;
      out += `<line class="lk-c" data-from="${ids[i - 1]}" data-to="${ids[i]}" x1="${x}" y1="${A.y + A.h}" x2="${x}" y2="${B.y}" style="--ec:${col(ids[i])}"/>`; }
  }
  for(const [a, b] of m.edges){
    const A = box(a), B = box(b); if(!A || !B) continue;
    const c = col(a), sx = A.x + A.w / 2 + spread(outof[a], outof[a].indexOf(b), A.w), tx = B.x + B.w / 2 + spread(into[b], into[b].indexOf(a), B.w);
    let d, ax, ay, ang;
    if(B.y >= A.y + A.h - 2){ // nedover: fra bunnen av kilden til toppen av målet
      const sy = A.y + A.h, ty = B.y - 7, k = Math.max(30, (ty - sy) * .5);
      d = `M${sx},${sy} C${sx},${sy + k} ${tx},${ty - k} ${tx},${ty}`; ax = tx; ay = ty + 7; ang = 90;
    } else if(Math.abs(B.x - A.x) - A.w > 40){ // samme rad, ikke naboer: bue over kortene imellom, ned i toppen av målet
      const sy = A.y, ty = B.y - 7, top = Math.min(sy, ty) - 26;
      d = `M${sx},${sy} C${sx},${top} ${tx},${top} ${tx},${ty}`; ax = tx; ay = ty + 7; ang = 90;
    } else { // samme rad, naboer: sidelengs, fra kant til kant
      const right = B.x > A.x, sx2 = right ? A.x + A.w : A.x, tx2 = right ? B.x - 7 : B.x + B.w + 7, y = A.y + A.h / 2, ty = B.y + B.h / 2;
      d = `M${sx2},${y} C${(sx2 + tx2) / 2},${y} ${(sx2 + tx2) / 2},${ty} ${tx2},${ty}`; ax = right ? tx2 + 7 : tx2 - 7; ay = ty; ang = right ? 0 : 180;
    }
    const r = ang * Math.PI / 180, p = (l, s) => `${ax - Math.cos(r) * l - Math.sin(r) * s},${ay - Math.sin(r) * l + Math.cos(r) * s}`;
    out += `<g class="lk-e" data-from="${a}" data-to="${b}" style="--ec:${c}"><path d="${d}"/><polygon points="${ax},${ay} ${p(9, 5)} ${p(9, -5)}"/></g>`;
  }
  sv.innerHTML = out;
  if(g.dataset.hl !== "1"){ g.dataset.hl = "1";
    const on = e => { const li = e.target.closest && e.target.closest(".lk-node"); lkHl(g, li ? li.dataset.id : null); };
    g.addEventListener("mouseover", on); g.addEventListener("focusin", on);
    g.addEventListener("mouseleave", () => lkHl(g, null)); g.addEventListener("focusout", e => { if(!g.contains(e.relatedTarget)) lkHl(g, null); });
  }
}
// Fremhev kantene inn til og ut fra én node (og nodene i andre enden); resten tones ned.
function lkHl(g, id){
  g.classList.toggle("lk-hl", !!id); const rel = new Set(id ? [id] : []);
  g.querySelectorAll(".lk-e").forEach(e => { const hit = !!id && (e.dataset.from === id || e.dataset.to === id); e.classList.toggle("on", hit); if(hit){ rel.add(e.dataset.from); rel.add(e.dataset.to); } });
  g.querySelectorAll(".lk-c").forEach(e => e.classList.toggle("on", rel.has(e.dataset.from) && rel.has(e.dataset.to)));
  g.querySelectorAll(".lk-node").forEach(n => { n.classList.toggle("lk-rel", rel.has(n.dataset.id)); n.classList.toggle("lk-cur", n.dataset.id === id); });
}
function lkClick(a, b){
  if(!a.startsWith("lk")) return false;
  if(a === "lkopen") lkOpen(b.dataset.id, b.dataset.node);
  else if(a === "lkback") lkOpen(null);
  else if(a === "lkgo"){ const code = b.dataset.code; if(!COURSES.some(c => c.code === code)) return true; BK = { v: "course", code, u: 0, tab: "topics", q: "" }; screen = "book"; render(); window.scrollTo(0, 0); }
  else return false;
  return true;
}
