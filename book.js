// ============================================================
//  TEORIBOK – all teorien samlet og lett å slå opp i.
//  Forside med søk og fag → fag med én flis per emne (og formelark) → emneside med
//  «formler på ett blikk», hopp til avsnitt, forrige/neste og «Øv på dette».
//  Innholdet hentes fra THEORY_DB (learn.js/add_*.js), så ny teori dukker opp her av seg selv.
// ============================================================
let BK = { v: "home", code: null, u: 0, tab: "topics", q: "" };

const bkDoc = (code, u) => { const d = theoryOf(code, u); return d ? String(d[LANG] || d.nb) : ""; };
const bkCourses = () => COURSES.filter(c => (THEORY_DB[c.code] || []).some(Boolean));
const bkUnits = c => c.units.map((_, u) => u).filter(u => theoryOf(c.code, u));
const bkCol = c => c.group === "Forkurs" ? "var(--ok)" : ["var(--u0)","var(--u1)","var(--u2)","var(--gold-deep)"][COURSES.indexOf(c) % 4];
// Formler fra forklaringen, ikke fra utregninger i eksempler eller «slik løser du»-delen.
const BK_SKIP = /eksempel|example|slik løser|how to solve|vanlige feil|common mistakes|løsning|solution/i;
function bkFormulas(src){
  const out = []; let s2 = false, s3 = false;
  for(const raw of src.split("\n")){
    const L = raw.trim(), h = L.match(/^(#{2,3})\s+(.*)$/);
    if(h){ if(h[1] === "##"){ s2 = BK_SKIP.test(h[2]); s3 = false; } else s3 = BK_SKIP.test(h[2]); continue; }
    const m = L.match(/^\$\$(.+)\$\$$/);
    // hopp over talluttrykk som «B·6 − 12·2 = 0» (utregninger)
    if(m && !s2 && !s3 && !/\d\s*(\\cdot|[-+·*])\s*\d/.test(m[1])) out.push(m[1]);
  }
  return out;
}
function bkRemember(src){ const out = []; for(const L of src.split("\n")){ const m = L.trim().match(/^>\s?(.+)$/); if(m) out.push(m[1]); } return out; }
function bkSections(src){ const out = []; for(const L of src.split("\n")){ const m = L.trim().match(/^##\s+(.+)$/); if(m) out.push(m[1]); } return out; }
// Det første avsnittet under første overskrift: en kort ingress til flisene og søket.
function bkLead(src){
  const p = src.split(/\n\s*\n/).map(x => x.replace(/^##.*\n?/, "").trim()).find(x => x && !/^(#|>|-|\d+[.)]|\$\$|```)/.test(x) && !/\\|\{/.test(x.replace(/\$[^$]*\$/g, "")) && !/^(svar|answer)\b/i.test(x));
  return p ? plain(p.replace(/\$[^$]*\$/g, "").replace(/\s+([,.])/g, "$1")).replace(/\*\*/g, "") : "";
}

let BK_INDEX = null, BK_INDEX_LANG = null;
function bkIndex(){
  if(BK_INDEX && BK_INDEX_LANG === LANG) return BK_INDEX;
  BK_INDEX = []; BK_INDEX_LANG = LANG;
  for(const c of bkCourses()) for(const u of bkUnits(c)){
    const src = bkDoc(c.code, u);
    BK_INDEX.push({ code: c.code, u, title: unitTitle(c, u), course: courseName(c), text: plain(src).replace(/\*\*/g, "").replace(/#+ /g, "") });
  }
  return BK_INDEX;
}
function bkSearch(q){
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 1); if(!words.length) return [];
  const hits = [];
  for(const it of bkIndex()){
    const title = (it.title + " " + it.course).toLowerCase(), text = it.text.toLowerCase();
    if(!words.every(w => title.includes(w) || text.includes(w))) continue;
    let score = 0; for(const w of words){ if(title.includes(w)) score += 10; let i = -1, n = 0; while((i = text.indexOf(w, i + 1)) >= 0 && n < 20) n++; score += n; }
    const i = text.indexOf(words[0]), from = Math.max(0, i - 60);
    const snip = i < 0 ? it.text.slice(0, 140) : (from ? "…" : "") + it.text.slice(from, from + 160) + "…";
    hits.push({ it, score, snip });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 40);
}
function bkMark(snip, q){
  let h = esc(snip);
  for(const w of q.toLowerCase().split(/\s+/).filter(w => w.length > 1)){
    h = h.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>");
  }
  return h;
}
function bkResultsHTML(){
  const hits = bkSearch(BK.q);
  if(!hits.length) return `<p class="bk-empty">${esc(t("bkNoHits"))}</p>`;
  return `<p class="bk-count">${esc(t("bkHits", hits.length))}</p>` + hits.map(({ it, snip }) =>
    `<button class="bk-hit" data-a="bkunit" data-c="${esc(it.code)}" data-u="${it.u}"><small>${esc(it.course)} · ${esc(t("unit", it.u + 1))}</small><b>${esc(it.title)}</b><span>${bkMark(snip, BK.q)}</span></button>`).join("");
}

function bkTop(back, small, title){
  return `<div class="top"><div class="wrap"><button class="iconbtn" data-a="${back}" aria-label="${esc(t("back"))}">${back === "home" ? I.x : I.left}</button>
    <div class="th-t"><small>${esc(small)}</small><b>${esc(title)}</b></div><span class="th-ic" aria-hidden="true">${I.book}</span></div></div>`;
}
function renderBook(){
  if(BK.v === "unit") return renderBookUnit();
  if(BK.v === "course") return renderBookCourse();
  const groups = new Map();
  for(const c of bkCourses()){ const g = c.group; if(!groups.has(g)) groups.set(g, []); groups.get(g).push(c); }
  const order = [...groups.keys()].sort((a, b) => (a === "Forkurs" ? -1 : 0) - (b === "Forkurs" ? -1 : 0));
  let list = "";
  for(const g of order){
    list += `<div class="grp">${esc(groupName(g))}</div><div class="bk-courses">`;
    for(const c of groups.get(g)){
      const n = bkUnits(c).length, seen = bkUnits(c).filter(u => (S.theorySeen || {})[c.code + ":" + u]).length;
      list += `<button class="bk-course" data-a="bkcourse" data-c="${esc(c.code)}"><span class="badge" style="background:${bkCol(c)}">${esc(courseShort(c))}</span>
        <span class="t"><b>${esc(courseName(c))}</b><span>${esc(t("bkTopics", n))}${seen ? " · " + esc(t("bkReadN", seen)) : ""}</span></span>${I.chevron}</button>`;
    }
    list += `</div>`;
  }
  $app.innerHTML = `${bkTop("home", t("bkSub"), t("bkTitle"))}
    <main class="wrap bk">
      <label class="bk-search">${I.search}<input type="search" id="bkq" placeholder="${esc(t("bkSearch"))}" aria-label="${esc(t("bkSearch"))}" value="${esc(BK.q)}" autocomplete="off"></label>
      <div id="bkres">${BK.q.trim() ? bkResultsHTML() : ""}</div>
      <div id="bklist" ${BK.q.trim() ? "hidden" : ""}>${list}</div>
    </main>`;
  const inp = document.getElementById("bkq");
  inp.addEventListener("input", ()=>{ BK.q = inp.value; const has = !!BK.q.trim();
    document.getElementById("bkres").innerHTML = has ? bkResultsHTML() : ""; document.getElementById("bklist").hidden = has; });
}
function renderBookCourse(){
  const c = COURSE(BK.code), units = bkUnits(c), col = bkCol(c);
  let body;
  if(BK.tab === "sheet"){
    body = `<div class="bk-sheet">` + units.map(u => {
      const src = bkDoc(c.code, u), f = bkFormulas(src), r = bkRemember(src);
      if(!f.length && !r.length) return "";
      return `<section><h3><button class="bk-link" data-a="bkunit" data-c="${esc(c.code)}" data-u="${u}"><span class="bk-num" style="background:${col}">${u + 1}</span>${esc(unitTitle(c, u))}</button></h3>
        ${f.map(x => `<div class="dmath">${texD(x)}</div>`).join("")}${r.map(x => `<div class="callout">${inline(x).replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>")}</div>`).join("")}</section>`;
    }).join("") + `</div>`;
  } else {
    body = `<div class="bk-grid">` + units.map(u => {
      const src = bkDoc(c.code, u), fs = bkFormulas(src), f = fs.find(x => x.length <= 60) || null, seen = (S.theorySeen || {})[c.code + ":" + u];
      return `<button class="bk-tile" data-a="bkunit" data-c="${esc(c.code)}" data-u="${u}">
        <span class="bk-tile-h"><span class="bk-num" style="background:${col}">${u + 1}</span>${seen ? `<span class="bk-seen" title="${esc(t("bkRead"))}">${I.checkS}</span>` : ""}</span>
        <b>${esc(unitTitle(c, u))}</b>
        ${f ? `<span class="bk-fx" aria-hidden="true">${texD(f)}</span>` : `<span class="bk-lead">${esc(bkLead(src).slice(0, 240))}</span>`}</button>`;
    }).join("") + `</div>`;
  }
  $app.innerHTML = `${bkTop("bkback", t("bkTitle"), courseName(c))}
    <main class="wrap bk">
      <div class="seg bk-tabs" role="tablist"><button role="tab" aria-selected="${BK.tab !== "sheet"}" class="${BK.tab !== "sheet" ? "on" : ""}" data-a="bktab" data-t="topics">${esc(t("bkTopicsTab"))}</button><button role="tab" aria-selected="${BK.tab === "sheet"}" class="${BK.tab === "sheet" ? "on" : ""}" data-a="bktab" data-t="sheet">${esc(t("bkSheet"))}</button></div>
      ${body}
    </main>`;
}
function renderBookUnit(){
  const c = COURSE(BK.code), u = BK.u, src = bkDoc(c.code, u), units = bkUnits(c), i = units.indexOf(u);
  const f = bkFormulas(src), secs = bkSections(src);
  let n = 0; const html = richDoc(src).replace(/<h3>/g, () => `<h3 id="bk-s${n++}">`);
  const prev = units[i - 1], next = units[i + 1];
  $app.innerHTML = `${bkTop("bkback", courseName(c) + " · " + t("unit", u + 1), unitTitle(c, u))}
    <main class="wrap theory bk-unit">
      ${secs.length > 1 ? `<nav class="bk-toc" aria-label="${esc(t("bkToc"))}">${secs.map((s, k) => `<button data-a="bksec" data-i="${k}">${esc(plain(s))}</button>`).join("")}</nav>` : ""}
      ${f.length ? `<div class="bk-glance"><div class="bk-glance-h">${esc(t("bkGlance"))}</div>${f.map(x => `<div class="dmath">${texD(x)}</div>`).join("")}</div>` : ""}
      ${html}
      <div class="bk-nav">
        ${prev != null ? `<button class="bk-pn" data-a="bkunit" data-c="${esc(c.code)}" data-u="${prev}"><small>${esc(t("bkPrev"))}</small><b>${esc(unitTitle(c, prev))}</b></button>` : "<span></span>"}
        ${next != null ? `<button class="bk-pn nx" data-a="bkunit" data-c="${esc(c.code)}" data-u="${next}"><small>${esc(t("bkNext"))}</small><b>${esc(unitTitle(c, next))}</b></button>` : "<span></span>"}
      </div>
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="bkpractice">${esc(t("thStart"))}</button></div></div>`;
}
function openBook(){ BK = { v: "home", code: null, u: 0, tab: "topics", q: BK.q || "" }; screen = "book"; overlay = null; render(); window.scrollTo(0, 0); }
function bookBack(){
  if(BK.v === "unit"){ BK.v = "course"; }
  else if(BK.v === "course"){ BK.v = "home"; }
  else { goHome(); return; }
  render(); window.scrollTo(0, 0);
}
function bookClick(a, b){
  if(!a.startsWith("bk") && a !== "book") return false;
  if(a === "book") openBook();
  else if(a === "bkback") bookBack();
  else if(a === "bkcourse"){ BK.v = "course"; BK.code = b.dataset.c; BK.tab = "topics"; render(); window.scrollTo(0, 0); }
  else if(a === "bktab"){ BK.tab = b.dataset.t; render(); }
  else if(a === "bkunit"){ BK.v = "unit"; BK.code = b.dataset.c; BK.u = +b.dataset.u; (S.theorySeen ||= {})[BK.code + ":" + BK.u] = 1; save(); render(); window.scrollTo(0, 0); }
  else if(a === "bksec"){ const h = document.getElementById("bk-s" + b.dataset.i); if(h) window.scrollTo({ top: h.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); }
  else if(a === "bkpractice"){
    const code = BK.code, u = BK.u; S.current = code; save(); goHome();
    const sec = document.querySelectorAll("main section")[u]; if(sec) sec.scrollIntoView({ block: "start" });
  }
  else return false;
  return true;
}
