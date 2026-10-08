// ============================================================
//  OPPGAVEKATALOG – slå opp en oppgavetype og se fremgangsmåten på en lignende oppgave.
//  Alle regneoppgaver (generatorer gir nye tall hver gang) og forståelsesspørsmål i et fag, sortert etter enhet
//  og søkbare («total potensiell energi», «Thevenin» …). Hver oppgave kan prøves selv før løsningen vises.
//  Nås fra Øv («Løste oppgaver»), teorisidene (enheten) og søket på Lær/Øv. Adresse: #/oppgaver/KODE[/enhet].
// ============================================================
let CAT = { code: null, u: null, q: "", open: null, items: {}, from: "practice" };
// Alle oppgave-id-er i et fag: regneoppgaver først (generatorer og tallsvar), så forståelsesspørsmål.
function catIds(c, u){
  const P = poolIds(c, u == null ? range(c.units.length) : [u]);
  return { calc: [...P.gen, ...P.num], mc: P.mc };
}
function catItem(c, id, fresh){
  const key = c.code + ":" + id + ":" + LANG;
  if(fresh || !CAT.items[key]){ let it = null; try{ it = itemFromId(c, id); }catch(e){} CAT.items[key] = it; }
  return CAT.items[key];
}
// Søkeindeks på tvers av alle fag (bygges første gang noen søker)
let CAT_INDEX = null, CAT_INDEX_LANG = null;
function catIndex(){
  if(CAT_INDEX && CAT_INDEX_LANG === LANG) return CAT_INDEX;
  CAT_INDEX = []; CAT_INDEX_LANG = LANG;
  for(const c of COURSES){ const { calc, mc } = catIds(c, null);
    for(const id of [...calc, ...mc]){ const it = catItem(c, id); if(!it) continue;
      CAT_INDEX.push({ code: c.code, id, u: +id.split(".")[0], gen: id.includes(".g"), text: plain(String(it.prompt) + " " + String(it.expl || "")).toLowerCase(), title: plain(String(it.prompt)).replace(/\s+/g, " ") }); } }
  return CAT_INDEX;
}
function catSearch(q, code){
  const words = String(q).toLowerCase().split(/\s+/).filter(w => w.length > 1); if(!words.length) return [];
  const mine = new Set(myCourses().map(c => c.code));
  return catIndex().filter(e => (!code || e.code === code) && words.every(w => e.text.includes(w) || unitTitle(COURSE(e.code), e.u).toLowerCase().includes(w)))
    .map(e => ({ e, s: (e.code === S.current ? 30 : mine.has(e.code) ? 15 : 0) + (e.gen ? 5 : 0) + words.reduce((a, w) => a + (e.title.toLowerCase().includes(w) ? 6 : 1), 0) }))
    .sort((a, b) => b.s - a.s).slice(0, 30).map(x => x.e);
}
function catOpen(code, u, from){
  CAT = { code, u: u == null ? null : +u, q: "", open: null, items: CAT.items, from: from || (screen === "catalog" ? CAT.from : screen) };
  overlay = null; screen = "catalog"; render(); window.scrollTo(0, 0);
  if(typeof stEv === "function") stEv("catalog", code, u == null ? "all" : u);
}
// Del oppgaveteksten i sammenheng og selve spørsmålet (siste setning), uten å dele inni $…$
function catSplit(p){
  let inM = false, cut = -1;
  for(let i = 0; i < p.length - 1; i++){ if(p[i] === "$") inM = !inM; else if(!inM && /[.!:]/.test(p[i]) && p[i + 1] === " " && i < p.length - 3) cut = i + 1; }
  if(cut < 0) return ["", p];
  return [p.slice(0, cut).trim(), p.slice(cut).trim()];
}
function catRowHTML(c, id){
  const it = catItem(c, id); if(!it) return "";
  const open = CAT.open && CAT.open.id === id && CAT.open.code === c.code, gen = id.includes(".g");
  if(!open){ const [ctx, ask] = catSplit(String(it.prompt));
    return `<button class="cat-row" data-a="catopen" data-c="${c.code}" data-id="${id}"><span class="cat-ic" aria-hidden="true">${gen ? "🔁" : it.type === "mc" ? "💡" : "🧮"}</span><span class="cat-p"><b>${rich(ask)}</b>${ctx ? `<small>${rich(ctx)}</small>` : ""}</span>${I.chevron}</button>`; }
  const o = CAT.open, ans = it.type === "mc" ? `<div class="cat-opts">${it.opts.map((x, k) => `<button class="cat-opt ${o.pick != null ? (x.ok ? "ok" : o.pick === k ? "bad" : "dim") : ""}" data-a="catpick" data-k="${k}" ${o.pick != null ? "disabled" : ""}>${rich(x.t)}</button>`).join("")}</div>`
    : `<div class="cat-try"><input id="catin" inputmode="decimal" autocomplete="off" placeholder="${esc(T("Ditt svar", "Your answer"))}" value="${esc(o.input || "")}" ${o.checked ? "disabled" : ""}>${it.u ? `<span>${esc(it.u)}</span>` : ""}<button class="big ghost" data-a="catcheck" ${o.checked ? "disabled" : ""}>${esc(T("Sjekk", "Check"))}</button></div>`
      + (o.checked ? `<p class="cat-res ${o.ok ? "ok" : "bad"}">${o.ok ? "✓ " + esc(T("Riktig!", "Correct!")) : "✗ " + esc(T("Ikke helt – se fremgangsmåten under.", "Not quite – see the method below."))}</p>` : "");
  const sol = o.show || o.checked || o.pick != null;
  return `<div class="cat-card" id="cat-open"><div class="cat-q"><span class="cat-ic" aria-hidden="true">${gen ? "🔁" : it.type === "mc" ? "💡" : "🧮"}</span><div>${rich(it.prompt)}</div></div>
    ${ans}
    ${sol ? `<div class="cat-sol"><div class="cat-sol-h">✅ ${esc(T("Svar", "Answer"))}: <b>${rich(correctText(it))}</b></div><div class="cat-sol-h2">${esc(T("Fremgangsmåte", "Method"))}</div>${String(it.expl || "").split(/\n+/).map(p => `<p>${rich(p)}</p>`).join("")}</div>`
      : `<button class="exlink cat-show" data-a="catshow">${esc(T("Vis fremgangsmåten", "Show the method"))}</button>`}
    <div class="cat-acts">${gen ? `<button class="qs-go" data-a="catnew">🔁 ${esc(T("Ny variant med andre tall", "New variant with other numbers"))}</button>` : ""}<button class="qs-go ghost" data-a="bkunit" data-c="${c.code}" data-u="${id.split(".")[0]}">📖 ${esc(T("Les teorien", "Read the theory"))}</button><button class="qs-go ghost" data-a="catclose">${esc(T("Lukk", "Close"))}</button>${!gen && typeof edBtnHTML === "function" ? edBtnHTML("q", c.code, id) : ""}</div></div>`;
}
function renderCatalog(){
  const c = COURSE(CAT.code); if(!c){ goHome(); return; }
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="catback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(courseName(c))}</small><b>${esc(T("Løste oppgaver", "Solved problems"))}</b></div></div></div>`;
  let body = "";
  const q = CAT.q.trim();
  if(q.length > 1){ const hits = catSearch(q, CAT.code);
    body = hits.length ? `<p class="bk-count">${esc(T(`${hits.length} treff`, `${hits.length} hits`))}</p>` + hits.map(e => catRowHTML(c, e.id)).join("") : `<p class="qs-empty">${esc(T("Ingen oppgaver passer. Prøv et annet ord.", "No problems match. Try another word."))}</p>`; }
  else {
    const units = CAT.u == null ? range(c.units.length) : [CAT.u];
    body = units.map(u => { const { calc, mc } = catIds(c, u); if(!calc.length && !mc.length) return "";
      return `<section class="cat-unit"><h3>${esc(t("unit", u + 1))}: ${esc(unitTitle(c, u))}</h3>
        ${calc.length ? `<div class="cat-sub">${esc(T("Regneoppgaver", "Calculations"))} · ${calc.length}</div>${calc.map(id => catRowHTML(c, id)).join("")}` : ""}
        ${mc.length ? `<details class="cat-mc" ${CAT.open && CAT.open.id && mc.includes(CAT.open.id) ? "open" : ""}><summary>${esc(T("Forståelsesspørsmål", "Concept questions"))} · ${mc.length}</summary>${mc.map(id => catRowHTML(c, id)).join("")}</details>` : ""}</section>`; }).join("");
  }
  $app.innerHTML = `${top}<main class="wrap cat">
    <p class="cat-lead">${esc(T("Slå opp en oppgavetype og se hvordan den løses steg for steg. 🔁 betyr at du kan få nye tall og øve igjen.", "Look up a problem type and see how it is solved step by step. 🔁 means you can get new numbers and practise again."))}</p>
    <label class="bk-search">${I.search}<input type="search" id="catq" placeholder="${esc(T("Søk, f.eks. «potensiell energi» eller «Thevenin»", "Search, e.g. \"potential energy\" or \"Thevenin\""))}" value="${esc(CAT.q)}" autocomplete="off"></label>
    ${CAT.u != null ? `<button class="exlink" data-a="catall">${esc(T(`Vis alle enhetene i ${courseName(c)}`, `Show all units in ${courseName(c)}`))}</button>` : ""}
    <div id="catres">${body}</div></main>`;
  const inp = document.getElementById("catq");
  inp.addEventListener("input", () => { CAT.q = inp.value; clearTimeout(renderCatalog.t); renderCatalog.t = setTimeout(() => { const pos = inp.selectionStart; render(); const n = document.getElementById("catq"); if(n){ n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e){} } }, 250); });
  if(CAT.open && CAT.open.scroll){ CAT.open.scroll = false; const el = document.getElementById("cat-open"); if(el) el.scrollIntoView({ block: "start", behavior: "smooth" }); }
}
function catClick(a, b){
  if(!a.startsWith("cat")) return false;
  const d = (b && b.dataset) || {}, c = COURSE(CAT.code);
  if(a === "catopen"){ CAT.open = { code: d.c, id: d.id, scroll: true }; render(); return true; }
  if(a === "catclose"){ CAT.open = null; render(); return true; }
  if(a === "catshow"){ CAT.open.show = true; render(); return true; }
  if(a === "catnew"){ catItem(c, CAT.open.id, true); CAT.open = { code: CAT.open.code, id: CAT.open.id }; render(); return true; }
  if(a === "catpick"){ CAT.open.pick = +d.k; const it = catItem(c, CAT.open.id); buzz(it.opts[+d.k].ok); sfx(it.opts[+d.k].ok ? "ok" : "bad"); render(); return true; }
  if(a === "catcheck"){ const inp = document.getElementById("catin"), it = catItem(c, CAT.open.id); if(!inp || !inp.value.trim()) return true;
    const v = parseFloat(inp.value.replace(",", ".").replace(/\s/g, "")); CAT.open.input = inp.value; CAT.open.checked = true; CAT.open.ok = Number.isFinite(v) && Math.abs(v - it.n) <= (it.tol || Math.abs(it.n) * 0.01) + 1e-12;
    buzz(CAT.open.ok); sfx(CAT.open.ok ? "ok" : "bad"); render(); return true; }
  if(a === "catall"){ CAT.u = null; render(); return true; }
  if(a === "catgo"){ catOpen(d.c, d.u != null && d.u !== "" ? +d.u : null); if(d.id){ CAT.open = { code: d.c, id: d.id, scroll: true }; render(); } return true; }
  if(a === "catback"){ const f = CAT.from; if(["practice", "book", "home", "lab"].includes(f)){ screen = f; render(); window.scrollTo(0, 0); } else goHome(); return true; }
  return false;
}
// Kort på Øv og knapp i teorien
function catCardHTML(c){
  const { calc, mc } = catIds(c, null); if(calc.length + mc.length < 4) return "";
  return `<button class="qt-row cat-entry" data-a="catgo" data-c="${c.code}"><span class="qt-ic">${I.book}</span><span><b>${esc(T("Løste oppgaver", "Solved problems"))}</b><small>${esc(T(`${calc.length} regneoppgaver og ${mc.length} forståelsesspørsmål i ${courseName(c)}, med fremgangsmåte`, `${calc.length} calculations and ${mc.length} concept questions in ${courseName(c)}, with methods`))}</small></span>${I.chevron}</button>`;
}
