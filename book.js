// ============================================================
//  TEORIBOK – all teorien samlet og lett å slå opp i.
//  Forside med søk og fag → fag med én flis per emne (og formelark) → emneside med
//  «formler på ett blikk», hopp til avsnitt, forrige/neste og «Øv på dette».
//  Innholdet hentes fra THEORY_DB (learn.js/add_*.js), så ny teori dukker opp her av seg selv.
// ============================================================
let BK = { v: "home", code: null, u: 0, tab: "topics", q: "" };

const bkDoc = (code, u) => { const d = theoryOf(code, u); return d ? withSims(code, u, withFigs(code, u, String(d[LANG] || d.nb))) : ""; };
const bkCourses = () => COURSES.filter(c => (THEORY_DB[c.code] || []).some(Boolean) || (TOPIC_DB[c.code] || []).some(l => l && l.length));
const bkUnits = c => c.units.map((_, u) => u).filter(u => theoryOf(c.code, u) || topicsOf(c.code, u).length);
const bkCol = c => c.group === "Forkurs" ? "var(--ok)" : ["var(--u0)","var(--u1)","var(--u2)","var(--gold-deep)"][COURSES.indexOf(c) % 4];
// ---------- emnesider (TOPIC_DB fra topics.js og top_*.js): ett begrep per side ----------
const tpText = tp => tp[LANG] || tp.nb;
const tpFx = s => LANG === "en" ? String(s).replace(/\{,\}/g, ".") : String(s);
function tpTileHTML(code, tp, label){
  const x = tpText(tp), key = x.f && x.f[0] ? x.f[0][0] : "";
  const art = tp.fig ? `<span class="tfig" aria-hidden="true">${tp.fig}</span>` : `<span class="tfx" aria-hidden="true">${key ? tex(tpFx(key)) : ""}</span>`;
  const seen = (S.topicSeen || {})[code + ":" + tp.id];
  return `<button class="tptile ${seen ? "seen" : ""}" data-a="bktopic" data-c="${esc(code)}" data-id="${esc(tp.id)}">${art}${label ? `<span class="tc">${esc(label)}</span>` : ""}<span class="tt">${esc(x.t)}</span></button>`;
}
function renderBookTopic(){
  const c = COURSE(BK.code), hit = topicFind(c.code, BK.topic);
  if(!hit){ BK.v = "course"; return renderBookCourse(); }
  const x = tpText(hit.tp), flat = topicsFlat(c.code), idx = flat.findIndex(f => f.tp.id === hit.tp.id), prev = flat[idx - 1], next = flat[idx + 1];
  const formulas = (x.f || []).map(([l, d]) => `<div class="fbox"><div class="fm">${texD(tpFx(l))}</div>${d ? `<div class="fd">${rich(d)}</div>` : ""}</div>`).join("");
  const legend = (x.legend || []).length ? `<table class="legend"><tbody>${x.legend.map(([s, m, un]) => `<tr><td class="ls">${tex(tpFx(s))}</td><td>${rich(m)}</td><td class="lu">${/\\/.test(un || "") ? tex(un) : esc(String(un || "").replace(/\{,\}/g, LANG === "en" ? "." : ","))}</td></tr>`).join("")}</tbody></table>` : "";
  const ex = x.ex ? `<div class="exbox"><div class="exbox-h">${esc(t("tpExample"))}</div>${String(x.ex).split("\n").map(l => `<p>${rich(l)}</p>`).join("")}</div>` : "";
  const nav = (tpx, dir) => tpx ? `<button class="tnav ${dir}" data-a="bktopic" data-c="${esc(c.code)}" data-id="${esc(tpx.tp.id)}"><small>${esc(t(dir === "prev" ? "bkPrev" : "bkNext"))}</small><b>${esc(tpText(tpx.tp).t)}</b></button>` : `<span></span>`;
  $app.innerHTML = `${bkTop("bkback", courseName(c) + " · " + unitTitle(c, hit.u), x.t)}
    <main class="wrap topic">
      <h1>${esc(x.t)}</h1>
      ${hit.tp.fig ? `<figure class="tpfig" aria-hidden="true">${hit.tp.fig}</figure>` : ""}
      <p class="intro">${rich(x.intro)}</p>
      ${formulas}${legend}${ex}
      ${x.tip ? `<div class="callout">${rich(x.tip)}</div>` : ""}
      <div class="tnavs">${nav(prev, "prev")}${nav(next, "next")}</div>
      ${theoryOf(c.code, hit.u) ? `<button class="big ghost" data-a="bkunit" data-c="${esc(c.code)}" data-u="${hit.u}">${esc(t("tpFull"))}</button>` : ""}
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="bktopicpractice" data-c="${esc(c.code)}" data-u="${hit.u}">${esc(t("thStart"))}</button></div></div>`;
}
// Formler fra forklaringen, ikke fra utregninger i eksempler eller «slik løser du»-delen.
const BK_SKIP = /eksempel|example|slik løser|how to solve|vanlige feil|common mistakes|løsning|solution/i;
function bkFormulas(src){
  const out = []; let s2 = false, s3 = false;
  for(const raw of src.split("\n")){
    const L = raw.trim(), h = L.match(/^(#{2,3})\s+(.*)$/);
    if(h){ if(h[1] === "##"){ s2 = BK_SKIP.test(h[2]); s3 = false; } else s3 = BK_SKIP.test(h[2]); continue; }
    const m = L.match(/^\$\$(.+)\$\$$/);
    // hopp over talluttrykk som «B·6 − 12·2 = 0» (utregninger)
    if(m && !s2 && !s3 && !/\d\s*(\\cdot|[-+·*])\s*\d/.test(m[1])) out.push(...m[1].split(/,?\s*\\qquad\s*/).map(x => x.trim().replace(/,$/, "")).filter(Boolean)); // én formel per linje
  }
  return out;
}
function bkRemember(src){ const out = []; for(const L of src.split("\n")){ const m = L.trim().match(/^>\s?(.+)$/); if(m) out.push(m[1]); } return out; }
function bkSections(src){ const out = []; for(const L of src.split("\n")){ const m = L.trim().match(/^##\s+(.+)$/); if(m) out.push(m[1]); } return out; }
// Det første avsnittet under første overskrift: en kort ingress til flisene og søket.
function bkLead(src){
  const p = src.split(/\n\s*\n/).map(x => x.replace(/^##.*\n?/, "").trim()).find(x => x && !/^(#|>|-|!\[|\d+[.)]|\$\$|```)/.test(x) && !/\\|\{/.test(x.replace(/\$[^$]*\$/g, "")) && !/^(svar|answer)\b/i.test(x));
  return p ? plain(p.replace(/\$[^$]*\$/g, "").replace(/\s+([,.])/g, "$1")).replace(/\*\*/g, "") : "";
}

let BK_INDEX = null, BK_INDEX_LANG = null;
function bkIndex(){
  if(BK_INDEX && BK_INDEX_LANG === LANG) return BK_INDEX;
  BK_INDEX = []; BK_INDEX_LANG = LANG;
  for(const c of bkCourses()) for(const u of bkUnits(c)){
    const src = bkDoc(c.code, u);
    BK_INDEX.push({ code: c.code, u, title: unitTitle(c, u), course: courseName(c), text: plain(src).replace(/\*\*/g, "").replace(/#+ /g, "") });
    for(const tp of topicsOf(c.code, u)){ const x = tpText(tp); // emnesidene: tittel, ingress og symbolforklaringer
      BK_INDEX.push({ code: c.code, u, id: tp.id, title: x.t, course: courseName(c) + " · " + unitTitle(c, u), text: plain([x.intro, ...(x.legend || []).map(l => l[1]), ...(x.f || []).map(f => f[1]), x.tip].join(" ")) }); }
  }
  return BK_INDEX;
}
function bkSearch(q){
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 1); if(!words.length) return [];
  const hits = [];
  for(const it of bkIndex()){
    const title = (it.title + " " + it.course).toLowerCase(), text = it.text.toLowerCase();
    if(!words.every(w => title.includes(w) || text.includes(w))) continue;
    let score = it.id ? 3 : 0; for(const w of words){ if(title.includes(w)) score += it.id ? 14 : 10; let i = -1, n = 0; while((i = text.indexOf(w, i + 1)) >= 0 && n < 20) n++; score += n; }
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
    it.id ? `<button class="bk-hit tp" data-a="bktopic" data-c="${esc(it.code)}" data-id="${esc(it.id)}"><small>${esc(t("tpTopic"))} · ${esc(it.course)}</small><b>${esc(it.title)}</b><span>${bkMark(snip, BK.q)}</span></button>`
    : `<button class="bk-hit" data-a="bkunit" data-c="${esc(it.code)}" data-u="${it.u}"><small>${esc(it.course)} · ${esc(t("unit", it.u + 1))}</small><b>${esc(it.title)}</b><span>${bkMark(snip, BK.q)}</span></button>`).join("");
}

function bkTop(back, small, title, right){
  return `<div class="top"><div class="wrap">${back === "home" ? "" : `<button class="iconbtn" data-a="${back}" aria-label="${esc(t("back"))}">${I.left}</button>`}
    <div class="th-t"><small>${esc(small)}</small><b>${esc(title)}</b></div>${right || `<span class="th-ic" aria-hidden="true">${I.book}</span>`}</div></div>`;
}
function renderBook(){
  if(BK.v === "topic") return renderBookTopic();
  if(BK.v === "unit") return renderBookUnit();
  if(BK.v === "course") return renderBookCourse();
  const groups = new Map(), favs = bkCourses().filter(c => isFav(c.code)), list0 = bkCourses().filter(c => inStudy(c, viewStudy()));
  if(favs.length) groups.set("★", favs); // favorittene øverst (står også i sin vanlige gruppe)
  for(const c of list0){ const g = c.group; if(!groups.has(g)) groups.set(g, []); groups.get(g).push(c); }
  const order = [...groups.keys()].sort((a, b) => (a === "★" ? -2 : a === "Forkurs" ? -1 : 0) - (b === "★" ? -2 : b === "Forkurs" ? -1 : 0));
  let list = "";
  for(const g of order){
    list += `<div class="grp ${g === "★" ? "grp-fav" : ""}">${g === "★" ? I_STAR_F + esc(t("favTitle")) : esc(groupName(g))}</div><div class="bk-courses">`;
    for(const c of groups.get(g)){
      const n = bkUnits(c).length, seen = bkUnits(c).filter(u => (S.theorySeen || {})[c.code + ":" + u]).length;
      list += `<div class="fav-row"><button class="bk-course" data-a="bkcourse" data-c="${esc(c.code)}"><span class="badge" style="background:${bkCol(c)}">${esc(courseShort(c))}</span>
        <span class="t"><b>${esc(courseName(c))}</b><span>${esc(t("bkTopics", n))}${seen ? " · " + esc(t("bkReadN", seen)) : ""}</span></span>${I.chevron}</button>${favStarHTML(c.code)}</div>`;
    }
    list += `</div>`;
  }
  $app.innerHTML = `${bkTop("home", t("bkSub"), t("bkTitle"))}
    <main class="wrap bk">
      <label class="bk-search">${I.search}<input type="search" id="bkq" placeholder="${esc(t("bkSearch"))}" aria-label="${esc(t("bkSearch"))}" value="${esc(BK.q)}" autocomplete="off"></label>
      <div id="bkres">${BK.q.trim() ? bkResultsHTML() : ""}</div>
      <div id="bklist" ${BK.q.trim() ? "hidden" : ""}>${studyTabsHTML()}${list || `<p class="fr-hint">${esc(t("stNoTheory"))}</p>`}</div>
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
      const src = bkDoc(c.code, u), tps = topicsOf(c.code, u), f = tps.length ? [] : bkFormulas(src), r = bkRemember(src);
      const tf = tps.flatMap(tp => (tpText(tp).f || []).map(([l, d]) => `<div class="fbox sm"><div class="fm">${texD(tpFx(l))}</div><div class="fd"><button class="bk-link sm" data-a="bktopic" data-c="${esc(c.code)}" data-id="${esc(tp.id)}">${esc(tpText(tp).t)}</button>${d ? " · " + rich(d) : ""}</div></div>`));
      if(!f.length && !r.length && !tf.length) return "";
      return `<section><h3><button class="bk-link" data-a="bkunit" data-c="${esc(c.code)}" data-u="${u}"><span class="bk-num" style="background:${col}">${u + 1}</span>${esc(unitTitle(c, u))}</button></h3>
        ${tf.join("")}${f.map(x => `<div class="dmath">${texD(x)}</div>`).join("")}${r.map(x => `<div class="callout">${inline(x).replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>")}</div>`).join("")}</section>`;
    }).join("") + `</div>`;
  } else {
    body = units.map(u => {
      const tps = topicsOf(c.code, u), seen = (S.theorySeen || {})[c.code + ":" + u];
      if(tps.length) return `<section class="libu" id="bku${u}"><div class="libu-h"><div><small>${esc(t("unit", u + 1))}</small><h2>${esc(unitTitle(c, u))}</h2></div>
          ${theoryOf(c.code, u) ? `<button class="kbtn" data-a="bkunit" data-c="${esc(c.code)}" data-u="${u}">${seen ? I.checkS : I.book}${esc(t("tpFullShort"))}</button>` : ""}</div>
          <div class="tiles2">${tps.map(tp => tpTileHTML(c.code, tp)).join("")}</div></section>`;
      const src = bkDoc(c.code, u), fs = bkFormulas(src), f = fs.find(x => x.length <= 60) || null;
      return `<div class="bk-grid one"><button class="bk-tile" data-a="bkunit" data-c="${esc(c.code)}" data-u="${u}">
        <span class="bk-tile-h"><span class="bk-num" style="background:${col}">${u + 1}</span>${seen ? `<span class="bk-seen" title="${esc(t("bkRead"))}">${I.checkS}</span>` : ""}</span>
        <b>${esc(unitTitle(c, u))}</b>
        ${f ? `<span class="bk-fx" aria-hidden="true">${texD(f)}</span>` : `<span class="bk-lead">${esc(bkLead(src).slice(0, 240))}</span>`}</button></div>`;
    }).join("");
  }
  $app.innerHTML = `${bkTop("bkback", t("bkTitle"), courseName(c), favStarHTML(c.code))}
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
      ${teacherBubble(c.code, esc(t("tchTheory", unitTitle(c, u))), 52, "tch-th")}
      <button class="gd-cta" data-a="bkguided">${I.steps}<span><b>${esc(t("gdCta"))}</b><small>${esc(t("gdCtaSub"))}</small></span>${I.chevron}</button>
      ${topicsOf(c.code, u).length ? `<div class="bk-unit-tps"><div class="bk-glance-h">${esc(t("tpInUnit"))}</div><div class="tiles2">${topicsOf(c.code, u).map(tp => tpTileHTML(c.code, tp)).join("")}</div></div>` : ""}
      ${tyKeyHTML(src)}
      ${f.length ? `<div class="bk-glance"><div class="bk-glance-h">${esc(t("bkGlance"))}</div>${f.map(x => `<div class="dmath">${texD(x)}</div>`).join("")}</div>` : ""}
      ${html}
      ${cyHTML(c.code, u)}
      <div class="bk-nav">
        ${prev != null ? `<button class="bk-pn" data-a="bkunit" data-c="${esc(c.code)}" data-u="${prev}"><small>${esc(t("bkPrev"))}</small><b>${esc(unitTitle(c, prev))}</b></button>` : "<span></span>"}
        ${next != null ? `<button class="bk-pn nx" data-a="bkunit" data-c="${esc(c.code)}" data-u="${next}"><small>${esc(t("bkNext"))}</small><b>${esc(unitTitle(c, next))}</b></button>` : "<span></span>"}
      </div>
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="bkpractice">${esc(t("thStart"))}</button></div></div>`;
}
function openBook(){ BK = { v: "home", code: null, u: 0, tab: "topics", q: BK.q || "" }; screen = "book"; overlay = null; render(); window.scrollTo(0, 0); }
function bookBack(){
  if(BK.v === "topic"){ const u = (topicFind(BK.code, BK.topic) || {}).u; BK.v = BK.from === "unit" ? "unit" : "course"; render();
    const el = BK.v === "course" && document.getElementById("bku" + u); if(el) el.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0); return; }
  if(BK.v === "unit"){ BK.v = "course"; }
  else if(BK.v === "course"){ BK.v = "home"; }
  else { goHome(); return; }
  render(); window.scrollTo(0, 0);
}
function bookClick(a, b){
  if(a.startsWith("cy")) return cyClick(a, b);
  if(!a.startsWith("bk") && a !== "book") return false;
  if(a === "book") openBook();
  else if(a === "bkback") bookBack();
  else if(a === "bkcourse"){ BK.v = "course"; BK.code = b.dataset.c; BK.tab = "topics"; render(); window.scrollTo(0, 0); }
  else if(a === "bktab"){ BK.tab = b.dataset.t; render(); }
  else if(a === "bkunit"){ BK.v = "unit"; BK.code = b.dataset.c; BK.u = +b.dataset.u; (S.theorySeen ||= {})[BK.code + ":" + BK.u] = 1; bdgToast(checkBadges()); save(); render(); window.scrollTo(0, 0); }
  else if(a === "bksec"){ const h = document.getElementById("bk-s" + b.dataset.i); if(h) window.scrollTo({ top: h.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); }
  else if(a === "bkguided"){ gdOpen(BK.code, BK.u, null); }
  else if(a === "bktopic"){ if(BK.v !== "topic") BK.from = BK.v; BK.v = "topic"; BK.code = b.dataset.c; BK.topic = b.dataset.id; (S.topicSeen ||= {})[BK.code + ":" + BK.topic] = 1; save(); render(); window.scrollTo(0, 0); }
  else if(a === "bktopicpractice"){
    const code = b.dataset.c, u = +b.dataset.u, c = COURSE(code);
    if(S.current !== code){ S.current = code; save(); }
    let k = 0; const nn = nextNode(c); if(nn && nn[0] === u) k = nn[1]; else if(sub(code).done[u + "-2"]) k = 3;
    if(!isUnlocked(c, u, k)){ goHome(); toast(t("lockedNode")); return true; }
    startUnitLesson(code, u, k);
  }
  else if(a === "bkpractice"){
    const code = BK.code, u = BK.u; S.current = code; save(); goHome();
    const sec = document.querySelectorAll("main section")[u]; if(sec) sec.scrollIntoView({ block: "start" });
  }
  else return false;
  return true;
}

// ============================================================
//  LETTERE Å LÆRE: «Det viktigste» øverst og «Sjekk deg selv» nederst på teorisidene.
// ============================================================
function tyKeyHTML(src){
  const r = bkRemember(src); if(!r.length) return "";
  return `<div class="ty-key"><div class="ty-h">${I.star16}${esc(t("tyKey"))}</div>${r.map(x => `<p>${inline(x).replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>")}</p>`).join("")}</div>`;
}
let CY = { key: null, items: [], sel: [] };
function cyBuild(code, u){
  const c = COURSE(code), P = poolIds(c, [u]), ids = [];
  pick(ids, P.mc, 3); pick(ids, P.num, 3); pick(ids, P.gen, 3);
  const items = []; for(const id of ids){ try{ const it = itemFromId(c, id, { mc: true }); if(it && it.type === "mc") items.push(it); }catch(e){} }
  CY = { key: code + ":" + u + ":" + LANG, items, sel: items.map(() => null) };
}
function cyHTML(code, u){
  if(CY.key !== code + ":" + u + ":" + LANG) cyBuild(code, u);
  if(!CY.items.length) return "";
  const done = CY.sel.filter(x => x != null).length, right = CY.items.filter((it, i) => CY.sel[i] != null && it.opts[CY.sel[i]].ok).length;
  return `<section class="cy" id="cyq" data-code="${esc(code)}" data-u="${u}"><h3>${esc(t("cyTitle"))}</h3><p class="cy-sub">${esc(t("cySub"))}</p>` +
    CY.items.map((it, q) => {
      const s = CY.sel[q];
      return `<div class="cy-q"><div class="cy-p"><span class="cy-n">${q + 1}</span><div>${rich(it.prompt)}</div></div><div class="opts">` +
        it.opts.map((o, i) => `<button class="opt ${s == null ? "" : o.ok ? "right" : s === i ? "wrong" : ""}" data-a="cyans" data-q="${q}" data-i="${i}" ${s == null ? "" : "disabled"}><span class="k">${"ABCD"[i] || i + 1}</span><span>${rich(o.t)}</span></button>`).join("") +
        `</div>${s != null && it.expl ? `<div class="cy-e ${it.opts[s].ok ? "ok" : "bad"}"><b>${esc(t(it.opts[s].ok ? "cyRight" : "cyWrong"))}</b> ${rich(it.expl)}</div>` : ""}</div>`;
    }).join("") +
    `${done === CY.items.length ? `<p class="cy-score">${esc(t("cyScore", right, CY.items.length))}</p>` : ""}<button class="big ghost" data-a="cynew">${esc(t("cyNew"))}</button></section>`;
}
function cyClick(a, b){
  const box = document.getElementById("cyq"); if(!box) return false;
  const code = box.dataset.code, u = +box.dataset.u;
  if(a === "cyans"){ const q = +b.dataset.q; if(CY.sel[q] == null){ CY.sel[q] = +b.dataset.i; buzz(CY.items[q].opts[CY.sel[q]].ok); } }
  else if(a === "cynew") cyBuild(code, u);
  else return false;
  box.outerHTML = cyHTML(code, u);
  return true;
}
