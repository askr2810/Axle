// ============================================================
//  INNHOLDSREDIGERING – for fagfolk, mod og admin (supabase/innhold.sql).
//  Rettinger lagres i databasen og legges over innholdet i koden hos alle brukere:
//    nøkkel «FAG|q|enhet.nr|språk»  → fast oppgave { p: tekst, a: svar (liste med riktig først, eller {n, tol, u}), e: forklaring }
//    nøkkel «FAG|th|enhet|språk»    → teorien for enheten (markdown)
//    nøkkel «FAG|tp|emne-id|språk»  → emneside { t, intro, ex, tip }
//  Alt logges (hvem, når, før og etter), og hver retting kan angres eller gjenopprettes.
//  Rettingene huskes lokalt (localStorage), så de gjelder med en gang neste gang appen åpnes – også uten nett.
// ============================================================
const CP = { items: {}, orig: {}, v: null, can: false, checked: false };
const CP_LS = "axle.content.v1";
let ED = null; // redigeringsskjermen

// ---------- legg rettinger over innholdet ----------
const cpParse = k => { const [code, type, id, lang] = String(k).split("|"); return { code, type, id, lang }; };
function cpTarget(k){
  const { code, type, id, lang } = cpParse(k), c = COURSES.find(x => x.code === code); if(!c) return null;
  if(type === "q"){ const [u, i] = id.split(".").map(Number); if(!c.units[u] || !c.units[u].qs[i]) return null;
    if(lang === "nb") return { get: () => { const q = c.units[u].qs[i]; return { p: q[0], a: q[1], e: q[2] || "" }; }, set: v => { c.units[u].qs[i] = [v.p, v.a, v.e]; } };
    const en = ((ENQ[code] ||= [])[u] ||= []);
    return { get: () => { const q = en[i], nb = c.units[u].qs[i]; return q ? { p: q[0], a: q[1] || nb[1], e: q[2] || "" } : null; },
             set: v => { en[i] = v ? [v.p, Array.isArray(v.a) ? v.a : null, v.e] : undefined; } }; }
  if(type === "th"){ const u = +id; return { get: () => { const d = THEORY_DB[code] && THEORY_DB[code][u]; return d ? d[lang] || null : null; },
    set: v => { const d = ((THEORY_DB[code] ||= [])[u] ||= {}); if(v == null) delete d[lang]; else d[lang] = v; } }; }
  if(type === "tp"){ const hit = typeof topicFind === "function" && topicFind(code, id); if(!hit) return null; const tp = hit.tp;
    return { get: () => tp[lang] ? { t: tp[lang].t, intro: tp[lang].intro, ex: tp[lang].ex || "", tip: tp[lang].tip || "" } : null,
             set: v => { if(v == null) return; tp[lang] = Object.assign({}, tp[lang] || tp.nb, v); } }; }
  return null;
}
const cpClone = x => x == null ? x : JSON.parse(JSON.stringify(x));
function cpApply(k, v){ const tg = cpTarget(k); if(!tg) return; if(!(k in CP.orig)) CP.orig[k] = cpClone(tg.get()); tg.set(cpClone(v)); }
function cpUnapply(k){ if(!(k in CP.orig)) return; const tg = cpTarget(k); if(tg){ if(CP.orig[k] == null && cpParse(k).type !== "th") { const { type } = cpParse(k); if(type === "q") tg.set(null); } else tg.set(cpClone(CP.orig[k])); } delete CP.orig[k]; }
// Ny liste fra serveren: fjern rettinger som er angret, legg på nye/endrede.
function cpSet(items){
  const next = {}; for(const it of items || []) next[it.k] = it.v;
  for(const k of Object.keys(CP.items)) if(!(k in next)) cpUnapply(k);
  for(const [k, v] of Object.entries(next)) if(JSON.stringify(CP.items[k]) !== JSON.stringify(v)){ if(k in CP.orig){ const o = CP.orig[k]; cpUnapply(k); CP.orig[k] = o; } cpApply(k, v); }
  const changed = JSON.stringify(CP.items) !== JSON.stringify(next); CP.items = next; return changed;
}
// Ved oppstart: lokale rettinger med en gang, så de nyeste fra serveren.
try{ const c = JSON.parse(localStorage.getItem(CP_LS) || "null"); if(c && c.items){ CP.v = c.v; cpSet(Object.entries(c.items).map(([k, v]) => ({ k, v }))); } }catch(e){}
async function cpFetch(){
  if(typeof CLOUD_ON === "undefined" || !CLOUD_ON) return;
  try{ const r = await sbFetch("/rest/v1/rpc/content_active", { method: "POST", body: "{}" });
    if(!r) return; const changed = cpSet(r.items || []); CP.v = r.v;
    try{ localStorage.setItem(CP_LS, JSON.stringify({ v: CP.v, items: CP.items })); }catch(e){}
    if(changed && typeof render === "function" && !["lesson", "exam", "edit"].includes(screen)) render();
  }catch(e){}
}
async function cpWhoami(){
  if(!AUTH || CP.checked) return CP.can; CP.checked = true;
  try{ CP.can = !!(await frRpc("content_can_edit", {})); }catch(e){ CP.can = false; }
  if(CP.can && ["settings", "profile"].includes(screen)) render();
  return CP.can;
}
const canEdit = () => !!AUTH && (CP.can || (typeof isStaff === "function" && isStaff()));
addEventListener("load", () => { setTimeout(cpFetch, 700); if(typeof AUTH_READY !== "undefined") AUTH_READY.then(() => setTimeout(cpWhoami, 1600)); });

// ---------- hjelpere ----------
const edKey = (code, type, id, lang) => `${code}|${type}|${id}|${lang}`;
const edPlain = s => typeof plain === "function" ? plain(String(s || "")) : String(s || "");
function edErr(e){ const c = String((e && (e.msg || e.message)) || "");
  if(/not_allowed/.test(c)) return T("Du har ikke rettigheter til å rette innhold.", "You are not allowed to edit content.");
  if(/function|does not exist|schema cache/i.test(c) || (e && e.status === 404)) return T("Redigering er ikke slått på ennå (kjør supabase/innhold.sql).", "Editing is not enabled yet (run supabase/innhold.sql).");
  if(e && e.kind === "offline") return T("Ingen nettforbindelse.", "No connection.");
  return T("Noe gikk galt. Prøv igjen.", "Something went wrong. Try again."); }
// Ord-diff (LCS) for før/etter i loggen
function edDiff(a, b){
  const A = String(a || "").split(/(\s+)/), B = String(b || "").split(/(\s+)/);
  if(A.length * B.length > 250000) return { a: esc(a), b: esc(b) };
  const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for(let i = n - 1; i >= 0; i--) for(let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  let i = 0, j = 0, oa = "", ob = "";
  while(i < n && j < m){ if(A[i] === B[j]){ oa += esc(A[i]); ob += esc(B[j]); i++; j++; } else if(L[i + 1][j] >= L[i][j + 1]){ oa += `<del>${esc(A[i])}</del>`; i++; } else { ob += `<ins>${esc(B[j])}</ins>`; j++; } }
  while(i < n) oa += `<del>${esc(A[i++])}</del>`; while(j < m) ob += `<ins>${esc(B[j++])}</ins>`;
  return { a: oa, b: ob };
}
const edFlat = v => v == null ? "" : typeof v === "string" ? v : v.p != null ? [v.p, Array.isArray(v.a) ? v.a.map((x, i) => (i ? "✗ " : "✓ ") + x).join("\n") : v.a ? `= ${v.a.n} ± ${v.a.tol ?? ""} ${v.a.u || ""}` : "", v.e].join("\n\n") : [v.t, v.intro, v.ex, v.tip].filter(Boolean).join("\n\n");
function edKeyLabel(k){ const { code, type, id, lang } = cpParse(k), c = COURSE(code); if(!c) return k;
  const what = type === "q" ? T(`Oppgave ${id}`, `Problem ${id}`) : type === "th" ? T(`Teori, enhet ${+id + 1}`, `Theory, unit ${+id + 1}`) : T(`Emne «${id}»`, `Topic "${id}"`);
  return `${courseShort(c)} · ${what} · ${lang.toUpperCase()}`; }

// ---------- åpne ----------
function edOpen(o){ ED = Object.assign({ view: "browse", code: S.current, u: 0, uOpen: false, q: "", lang: LANG, from: screen === "edit" ? "settings" : screen }, ED && ED.from ? { from: ED.from } : {}, o || {}); screen = "edit"; render(); window.scrollTo(0, 0); if(ED.view === "log") edLoadLog(); }
async function edLoadLog(key){
  const e = ED; e.logErr = null; e.logRows = null; edHistDraw();
  try{ e.logRows = await frRpc("content_log", { p_key: key || null, p_course: key ? null : (e.allCourses ? null : e.code), p_limit: 150 }) || []; }catch(err){ e.logErr = edErr(err); }
  if(ED === e && screen === "edit") edHistDraw();
}
// I redigeringsskjemaet tegnes bare historikken på nytt, så feltene og en åpen formel ikke forsvinner.
function edHistDraw(){ const h = document.getElementById("edhist");
  if(ED && ED.view === "item"){ if(h){ h.innerHTML = edLogHTML(ED.logRows, ED.logErr, true); const n = document.getElementById("edhistn"); if(n) n.textContent = ED.logRows ? `(${ED.logRows.length})` : ""; } }
  else if(screen === "edit") render(); }

// ---------- smarte tekstfelt: tekst med formler som ferdig tegnede «brikker» ----------
// Fagfolk skal slippe $, \frac og **: formlene vises tegnet og endres i en visuell formelredigerer (MathLive),
// og fet skrift settes med en knapp. Under panseret lagres samme tekstformat som før ($…$, $$…$$ og **…**).
const edChip = (s, d) => `<span class="ed-mx${d ? " d" : ""}" contenteditable="false" data-tex="${esc(s)}" title="${esc(T("Trykk for å endre formelen", "Tap to edit the formula"))}">${tex(s)}</span>`;
function edToHTML(s, bold){
  return String(s ?? "").split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).map(p => {
    if(p.length > 4 && p.startsWith("$$") && p.endsWith("$$")) return edChip(p.slice(2, -2), true);
    if(p.length > 2 && p.startsWith("$") && p.endsWith("$")) return edChip(p.slice(1, -1), false);
    let h = esc(p); if(bold) h = h.replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>");
    return h.replace(/\n/g, "<br>");
  }).join("");
}
function edSer(n){
  let s = "";
  for(const c of n.childNodes){
    if(c.nodeType === 3){ s += c.nodeValue.replace(/\u00a0/g, " ").replace(/\u200b/g, ""); continue; }
    if(c.nodeType !== 1) continue;
    if(c.classList.contains("ed-mx")){ const x = c.dataset.tex || ""; if(x.trim()) s += c.classList.contains("d") ? `$$${x}$$` : `$${x}$`; continue; }
    if(c.tagName === "BR"){ s += "\n"; continue; }
    const inner = edSer(c);
    if(/^(DIV|P|LI)$/.test(c.tagName)){ s += (s && !s.endsWith("\n") ? "\n" : "") + inner; continue; }
    if(/^(B|STRONG)$/.test(c.tagName) || /bold|[6-9]00/.test((c.style && c.style.fontWeight) || "")){ const m = inner.match(/^(\s*)([\s\S]*?)(\s*)$/); s += m[2] ? `${m[1]}**${m[2]}**${m[3]}` : inner; continue; }
    s += inner;
  }
  return s;
}
const edVal = el => { let v = edSer(el).replace(/[ \t]+\n/g, "\n").replace(/\s+$/, ""); if(el.dataset.multi !== "1") v = v.replace(/\n/g, " "); return v.trim() ? v : ""; };
// path sier hvor verdien hører hjemme i utkastet (se edPut). o: { multi, bold, ph, cls, label }
function edRT(path, val, o = {}){
  return `<div class="ed-rtw ${o.cls || ""}"><div class="ed-rt" contenteditable="true" role="textbox" spellcheck="true" data-rt="${path}" data-multi="${o.multi ? 1 : 0}" data-bold="${o.bold ? 1 : 0}" aria-label="${esc(o.label || o.ph || "")}" data-ph="${esc(o.ph || "")}">${edToHTML(val, o.bold)}</div>
    <div class="ed-tools">${o.bold ? `<button type="button" class="ed-tb" data-tb="bold" aria-label="${esc(T("Fet skrift", "Bold"))}" title="${esc(T("Fet skrift", "Bold"))}"><b>B</b></button>` : ""}<button type="button" class="ed-tb" data-tb="fx">∑ ${esc(T("Formel", "Formula"))}</button></div></div>`;
}
function edPut(path, v){
  const p = String(path).split(".");
  if(p[0] === "b"){ const b = ED.blocks[+p[1]]; if(!b) return; if(p.length > 2){ if(b.items[+p[2]]) b.items[+p[2]].v = v; } else b.v = v; }
  else if(p[0] === "a") ED.draft.a[+p[1]] = v;
  else ED.draft[p[0]] = v;
  edDirtyUI();
}

// ---------- formelredigereren (MathLive lastes først når den trengs) ----------
let ED_ML = null;
function edMathLive(){
  if(window.MathfieldElement) return Promise.resolve(true);
  if(typeof PLATFORM !== "undefined" && PLATFORM === "claude") return Promise.resolve(false);
  return ED_ML ||= new Promise(res => { const s = document.createElement("script"); s.src = "vendor/mathlive/mathlive.min.js";
    s.onload = () => { try{ MathfieldElement.soundsDirectory = null; MathfieldElement.fontsDirectory = new URL("vendor/mathlive/fonts/", location.href).href; }catch(e){} res(!!window.MathfieldElement); };
    s.onerror = () => { ED_ML = null; res(false); }; document.head.appendChild(s); });
}
// MathLive kan lage kommandoer KaTeX ikke kjenner – gjør dem om til vanlige.
const edTexFix = s => String(s || "").replace(/\\exponentialE/g, "e").replace(/\\imaginaryI/g, "i").replace(/\\differentialD/g, "\\mathrm{d}").replace(/\\capitalDifferentialD/g, "D")
  .replace(/\\placeholder(\[[^\]]*\])?\{\}/g, "").replace(/\\mleft/g, "\\left").replace(/\\mright/g, "\\right").trim();
const edTexOk = s => { try{ if(window.katex) katex.renderToString(s, { throwOnError: true }); return true; }catch(e){ return false; } };
const ED_FXQ = [["a⁄b", "\\frac{#@}{#?}", "Brøk", "Fraction"], ["x²", "#@^{#?}", "Opphøyd", "Power"], ["xₙ", "#@_{#?}", "Senket", "Subscript"], ["√", "\\sqrt{#0}", "Kvadratrot", "Square root"],
  ["·", "\\cdot ", "Gange", "Times"], ["×", "\\times ", "Kryss", "Cross"], ["±", "\\pm ", "Pluss/minus", "Plus/minus"], ["≈", "\\approx ", "Omtrent lik", "Approximately"], ["≤", "\\le ", "Mindre eller lik", "Less or equal"], ["≥", "\\ge ", "Større eller lik", "Greater or equal"],
  ["π", "\\pi ", "Pi", "Pi"], ["Δ", "\\Delta ", "Delta", "Delta"], ["α", "\\alpha ", "Alfa", "Alpha"], ["θ", "\\theta ", "Theta", "Theta"], ["ω", "\\omega ", "Omega", "Omega"], ["μ", "\\mu ", "My", "Mu"],
  ["°", "^{\\circ}", "Grader", "Degrees"], ["→", "\\to ", "Pil", "Arrow"], ["∫", "\\int_{#?}^{#?}", "Integral", "Integral"], ["Σ", "\\sum_{#?}^{#?}", "Sum", "Sum"], ["abc", "\\text{#?}", "Vanlig tekst (f.eks. enheter)", "Plain text (e.g. units)"]];
function edFxClose(){ const b = document.getElementById("edfx"); if(b) b.remove(); try{ window.mathVirtualKeyboard && window.mathVirtualKeyboard.hide(); }catch(e){} }
// o: { tex, onOk(tex), onDel?, tpl? (mal som settes inn med tomme bokser, f.eks. \\frac{#?}{#?}) }
async function edFx(o){
  edFxClose();
  const bg = document.createElement("div"); bg.className = "ed-fxbg"; bg.id = "edfx";
  bg.innerHTML = `<div class="ed-fx" role="dialog" aria-modal="true" aria-label="${esc(T("Formel", "Formula"))}">
    <div class="ed-fxh"><b>∑ ${esc(o.tex ? T("Endre formelen", "Edit the formula") : T("Ny formel", "New formula"))}</b><button type="button" class="iconbtn" data-x="close" aria-label="${esc(T("Lukk", "Close"))}">${I.x}</button></div>
    <div class="ed-fxmf" id="edfxmf"><p class="ed-note">${esc(T("Laster formelredigereren …", "Loading the formula editor …"))}</p></div>
    <div class="ed-fxq">${ED_FXQ.map(([l, s, nb, en], i) => `<button type="button" data-q="${i}" title="${esc(T(nb, en))}" aria-label="${esc(T(nb, en))}">${esc(l)}</button>`).join("")}</div>
    <p class="ed-fxtip">${esc(T("Skriv som på en kalkulator: / blir brøk, ^ blir opphøyd og _ blir senket. Piltastene flytter deg ut av en brøk.", "Type like on a calculator: / makes a fraction, ^ a power and _ a subscript. The arrow keys move you out of a fraction."))}</p>
    <div class="ed-fxpvw"><small>${esc(T("Slik blir den i appen", "How it looks in the app"))}</small><div id="edfxpv" class="ed-fxpv"></div></div>
    <details class="ed-fxsrc" id="edfxdet"><summary>${esc(T("Vis som kode (for viderekomne)", "Show as code (advanced)"))}</summary><textarea id="edfxsrc" rows="2" spellcheck="false" autocapitalize="off"></textarea></details>
    <p class="du-err" id="edfxerr" hidden></p>
    <div class="ed-fxa"><button type="button" class="big" data-x="ok">${esc(T("Bruk formelen", "Use the formula"))}</button>${o.onDel ? `<button type="button" class="big ghost ed-del" data-x="del">${esc(T("Fjern formelen", "Remove the formula"))}</button>` : ""}<button type="button" class="big ghost" data-x="close">${esc(T("Avbryt", "Cancel"))}</button></div></div>`;
  document.body.appendChild(bg);
  const src = bg.querySelector("#edfxsrc"), pv = bg.querySelector("#edfxpv"), slot = bg.querySelector("#edfxmf"), err = bg.querySelector("#edfxerr");
  let cur = o.tex || "", touched = false, mf = null;
  const draw = () => { const v = edTexFix(cur); pv.innerHTML = v ? texD(v) : `<span class="ed-note">${esc(T("(tom)", "(empty)"))}</span>`; err.hidden = true; };
  const done = how => {
    if(how === "close"){ edFxClose(); return; }
    if(how === "del"){ edFxClose(); o.onDel && o.onDel(); return; }
    const v = touched ? edTexFix(cur) : (o.tex || "");
    if(!v){ edFxClose(); if(o.tex && o.onDel) o.onDel(); return; }
    if(touched && !edTexOk(v)){ err.textContent = T("Denne formelen kan ikke vises i appen. Sjekk at alle parenteser og brøker er fylt ut.", "This formula cannot be shown in the app. Check that all brackets and fractions are filled in."); err.hidden = false; return; }
    edFxClose(); o.onOk(v);
  };
  bg.addEventListener("click", e => { if(e.target === bg) return done("close"); const x = e.target.closest("[data-x]"); if(x) return done(x.dataset.x);
    const q = e.target.closest("[data-q]"); if(!q) return; const tpl = ED_FXQ[+q.dataset.q][1];
    if(mf){ mf.insert(tpl, { focus: true, selectionMode: "placeholder", format: "latex" }); cur = mf.getValue("latex-without-placeholders"); touched = true; src.value = cur; draw(); }
    else { const s0 = src.selectionStart ?? src.value.length, ins = tpl.replace(/#[@?0]/g, ""); src.value = src.value.slice(0, s0) + ins + src.value.slice(src.selectionEnd ?? s0); cur = src.value; touched = true; draw(); src.focus(); } });
  bg.addEventListener("keydown", e => { if(e.key === "Escape"){ e.preventDefault(); done("close"); } });
  src.value = cur; draw();
  src.addEventListener("input", () => { cur = src.value; touched = true; if(mf) mf.value = cur; draw(); });
  const ok = await edMathLive();
  if(document.getElementById("edfx") !== bg) return;
  if(ok){
    try{ mf = new MathfieldElement(); mf.smartFence = true; mf.mathVirtualKeyboardPolicy = "auto";
      try{ if(ED && ED.lang === "nb") mf.decimalSeparator = ","; }catch(e){}
      mf.value = cur; slot.innerHTML = ""; slot.appendChild(mf);
      mf.addEventListener("input", () => { cur = mf.getValue("latex-without-placeholders"); touched = true; src.value = cur; draw(); });
      mf.addEventListener("keydown", e => { if(e.key === "Enter" && !e.shiftKey){ e.preventDefault(); done("ok"); } });
      if(o.tpl){ try{ mf.insert(o.tpl, { focus: true, selectionMode: "placeholder", format: "latex" }); cur = mf.getValue("latex-without-placeholders"); touched = true; src.value = cur; draw(); }catch(e){} }
      setTimeout(() => { try{ mf.focus(); }catch(e){} }, 60); return; }catch(e){ mf = null; }
  }
  if(o.tpl && !cur){ cur = o.tpl.replace(/#[@?0]/g, ""); touched = true; src.value = cur; draw(); }
  slot.innerHTML = ""; bg.querySelector("#edfxdet").open = true; setTimeout(() => src.focus(), 30);
}

// ---------- teori som blokker ----------
// Markeringen i teoriteksten (## overskrift, - punkt, $$formel$$, > boks, ![fig:…]) blir til blokker man kan rette,
// flytte og slette – uten å se et eneste rart tegn. Figurer og simuleringer er låste blokker (flyttes eller fjernes).
function edBlocks(md){
  const out = []; let para = null, list = null, box = null, code = null;
  for(const raw of String(md || "").split("\n")){
    const L = raw.trim();
    if(code){ code.lines.push(raw); if(/^```/.test(L)) code = null; continue; }
    if(/^```/.test(L)){ para = list = box = null; code = { k: "raw", lines: [raw] }; out.push(code); continue; }
    if(!L){ para = list = box = null; continue; }
    let m;
    if((m = L.match(/^(#{2,3})\s+(.*)$/))){ para = list = box = null; out.push({ k: "h", lv: m[1].length, v: m[2] }); continue; }
    if((m = L.match(/^!\[(\w+):([\w-]+)\]$/))){ para = list = box = null; out.push({ k: "emb", v: L, kind: m[1], name: m[2] }); continue; }
    if((m = L.match(/^\$\$(.+)\$\$$/))){ para = list = box = null; out.push({ k: "math", v: m[1].trim() }); continue; }
    if((m = L.match(/^>\s?(.*)$/))){ para = list = null; if(!box){ box = { k: "box", lines: [] }; out.push(box); } box.lines.push(m[1]); continue; }
    if(list && /^\s{2,}-\s/.test(raw)){ list.items.push({ v: L.replace(/^-\s+/, ""), sub: 1 }); continue; }
    if((m = L.match(/^-\s+(.*)$/)) || (m = L.match(/^\d+[.)]\s+(.*)$/))){ para = box = null; const ol = !/^-/.test(L);
      if(!list || list.ol !== ol){ list = { k: "list", ol, items: [] }; out.push(list); } list.items.push({ v: m[1] }); continue; }
    list = box = null; if(!para){ para = { k: "p", lines: [] }; out.push(para); } para.lines.push(L);
  }
  return out.map(b => b.k === "p" ? { k: "p", v: b.lines.join(" ") } : b.k === "box" ? { k: "box", v: b.lines.join("\n") } : b.k === "raw" ? { k: "raw", v: b.lines.join("\n") } : b);
}
const edLine = s => String(s || "").replace(/\s*\n\s*/g, " ").trim();
function edMd(bs){
  return bs.map(b => {
    if(b.k === "h") return edLine(b.v) ? "#".repeat(b.lv || 2) + " " + edLine(b.v) : "";
    if(b.k === "p") return String(b.v || "").split(/\n+/).map(edLine).filter(Boolean).join("\n\n"); // linjeskift i et avsnitt = nytt avsnitt
    if(b.k === "list"){ let n = 0; return b.items.filter(it => edLine(it.v)).map(it => (it.sub ? "  - " : b.ol ? `${++n}. ` : "- ") + edLine(it.v)).join("\n"); }
    if(b.k === "box") return String(b.v || "").split("\n").map(l => l.trim()).filter(Boolean).map(l => "> " + l).join("\n");
    if(b.k === "math") return edLine(b.v) ? `$$${edLine(b.v)}$$` : "";
    return String(b.v || "").replace(/\s+$/, "");
  }).filter(x => x.trim()).join("\n\n");
}
const ED_BK = { h: ["🔠", "Overskrift", "Heading"], p: ["¶", "Avsnitt", "Paragraph"], list: ["•", "Punktliste", "List"], math: ["∑", "Formel", "Formula"], box: ["💡", "Viktig-boks", "Key point"], emb: ["🖼️", "Figur", "Figure"], raw: ["⌨️", "Avansert", "Advanced"] };
const ED_EMB = { fig: ["Figur", "Figure"], pic: ["Bilde", "Picture"], sim: ["Prøv selv-simulering", "Try-it simulation"], tl: ["Tidslinje", "Timeline"], map: ["Kart", "Map"], mv: ["Animasjon", "Animation"], ctl: ["Lab", "Lab"], sort: ["Sorteringsoppgave", "Sorting task"], seq: ["Rekkefølge-oppgave", "Ordering task"] };
function edBlockHTML(b, i, n){
  const [ic, nb, en] = ED_BK[b.k] || ED_BK.raw;
  let body = "";
  if(b.k === "h") body = edRT(`b.${i}`, b.v, { ph: T("Overskrift", "Heading"), cls: "h" });
  else if(b.k === "p") body = edRT(`b.${i}`, b.v, { multi: 1, bold: 1, ph: T("Skriv et avsnitt …", "Write a paragraph …") });
  else if(b.k === "box") body = edRT(`b.${i}`, b.v, { multi: 1, bold: 1, ph: T("Det viktigste å huske …", "The key thing to remember …"), cls: "box" });
  else if(b.k === "list"){ let num = 0;
    body = b.items.map((it, j) => `<div class="ed-li ${it.sub ? "sub" : ""}"><span class="ed-bul" aria-hidden="true">${it.sub ? "◦" : b.ol ? (++num) + "." : "•"}</span>${edRT(`b.${i}.${j}`, it.v, { bold: 1, ph: T("Punkt", "Item"), cls: "li" })}</div>`).join("")
      + `<div class="ed-lirow"><button type="button" class="ed-mini" data-a="edliadd" data-b="${i}">＋ ${esc(T("Nytt punkt", "New item"))}</button><button type="button" class="ed-mini" data-a="edlitype" data-b="${i}">${esc(b.ol ? T("Bruk prikker •", "Use bullets •") : T("Bruk tall 1. 2. 3.", "Use numbers 1. 2. 3."))}</button></div>`; }
  else if(b.k === "math") body = `<button type="button" class="ed-mathblk" data-a="edmathblk" data-b="${i}">${b.v ? texD(b.v) : `<span class="ed-note">${esc(T("Trykk her for å skrive formelen", "Tap here to write the formula"))}</span>`}<small>✏️ ${esc(T("Trykk for å endre", "Tap to edit"))}</small></button>`;
  else if(b.k === "emb"){ const nm = ED_EMB[b.kind] || ["Innhold", "Content"], pvw = /^(fig|pic)$/.test(b.kind) ? `<div class="ed-embpv" aria-hidden="true">${richDoc(b.v)}</div>` : "";
    body = `<div class="ed-emb">${pvw}<p><b>${esc(T(nm[0], nm[1]))}</b> · <span class="mono">${esc(b.name)}</span><br><small>${esc(T("Kan flyttes eller fjernes. Selve figuren endres av utviklerne – skriv i notatet hvis den er feil.", "Can be moved or removed. The figure itself is changed by the developers – say so in the note if it is wrong."))}</small></p></div>`; }
  else body = `<textarea class="ed-raw" data-rawb="${i}" rows="${Math.min(14, String(b.v).split("\n").length + 1)}" spellcheck="false">${esc(b.v)}</textarea>`;
  return `<section class="ed-blk ed-k-${b.k}" data-b="${i}"><div class="ed-bh"><span class="ed-bl"><i aria-hidden="true">${ic}</i>${esc(T(nb, en))}</span><span class="ed-bb">
      <button type="button" data-a="edbup" data-b="${i}" ${i ? "" : "disabled"} aria-label="${esc(T("Flytt opp", "Move up"))}" title="${esc(T("Flytt opp", "Move up"))}">↑</button><button type="button" data-a="edbdn" data-b="${i}" ${i < n - 1 ? "" : "disabled"} aria-label="${esc(T("Flytt ned", "Move down"))}" title="${esc(T("Flytt ned", "Move down"))}">↓</button><button type="button" data-a="edbdel" data-b="${i}" aria-label="${esc(T("Slett", "Delete"))}" title="${esc(T("Slett", "Delete"))}">🗑</button></span></div>${body}</section>`;
}
function edAddSlot(i){
  if(ED.undoDel && ED.undoDel.i === i + 1) return `<div class="ed-undo">${esc(T("Blokken ble slettet.", "The block was deleted."))} <button type="button" class="exlink" data-a="edbundo">${esc(T("Angre", "Undo"))}</button></div>`;
  if(ED.addAt === i) return `<div class="ed-addmenu"><b>${esc(T("Legg til:", "Add:"))}</b>${["p", "h", "list", "math", "box"].map(k => `<button type="button" data-a="edbnew" data-k="${k}"><i aria-hidden="true">${ED_BK[k][0]}</i>${esc(T(ED_BK[k][1], ED_BK[k][2]))}</button>`).join("")}<button type="button" class="ed-addx" data-a="edbadd" data-b="none">${esc(T("Avbryt", "Cancel"))}</button></div>`;
  return `<div class="ed-add"><button type="button" data-a="edbadd" data-b="${i}" aria-label="${esc(T("Legg til en blokk her", "Add a block here"))}" title="${esc(T("Legg til en blokk her", "Add a block here"))}">＋</button></div>`;
}
function edTheoryForm(){
  if(ED.rawMode) return `<p class="ed-note">${esc(T("Avansert: hele teorien som tekst med markering (## overskrift, - punkt, $formel$, $$formel$$, > boks, **fet**).", "Advanced: the whole theory as marked-up text (## heading, - item, $maths$, $$formula$$, > box, **bold**)."))}</p>
    <textarea class="ed-raw big" id="edrawall" rows="22" spellcheck="false">${esc(ED.rawText || "")}</textarea>
    <button type="button" class="kbtn ghost" data-a="edraw">← ${esc(T("Tilbake til enkel redigering", "Back to simple editing"))}</button>`;
  const n = ED.blocks.length;
  return `<div class="ed-blocks">${edAddSlot(-1)}${ED.blocks.map((b, i) => edBlockHTML(b, i, n) + edAddSlot(i)).join("")}</div>
    <button type="button" class="exlink ed-rawlink" data-a="edraw">⌨️ ${esc(T("Vis som tekst med markering (for viderekomne)", "Show as marked-up text (advanced)"))}</button>`;
}

// ---------- utkast og verdi ----------
const edNum = s => +String(s ?? "").replace(/\s/g, "").replace(/−/g, "-").replace(",", ".");
const ED_PREC = [["0", "Helt likt", "Exact"], ["1", "± 1 %", "± 1 %"], ["2", "± 2 %", "± 2 %"], ["5", "± 5 %", "± 5 %"]];
function edPrecOf(a){ const { n, tol } = a; if(tol === undefined || tol === null) return "1"; if(tol === 0) return "0"; if(!n) return "c";
  const r = Math.abs(tol / n); return ["1", "2", "5"].find(p => Math.abs(r - p / 100) < 1e-6) || "c"; }
function edOut(){
  if(ED.type === "th") return ED.rawMode ? String(ED.rawText || "").replace(/\s+$/, "") : edMd(ED.blocks);
  const d = cpClone(ED.draft);
  if(ED.type === "q" && !Array.isArray(d.a)){ const n = edNum(d.a.n); d.a.n = Number.isFinite(n) ? n : d.a.n;
    if(ED.prec === "0") d.a.tol = 0; else if(ED.prec === "1") delete d.a.tol; else if(ED.prec !== "c" && Number.isFinite(n)) d.a.tol = +(Math.abs(n) * ED.prec / 100).toPrecision(6); }
  return d;
}
const edDirty = () => !!ED && ED.base != null && JSON.stringify(edOut()) !== ED.base;
function edDirtyUI(){ const d = edDirty(), s = document.getElementById("edstate"), b1 = document.getElementById("edsaveask"), b2 = document.getElementById("edreset");
  if(s){ s.textContent = d ? T("● Ulagrede endringer", "● Unsaved changes") : T("Ingen endringer ennå", "No changes yet"); s.classList.toggle("on", d); }
  if(b1) b1.disabled = !d; if(b2) b2.disabled = !d; }
function edCurrent(){ const tg = cpTarget(edKey(ED.code, ED.type, ED.id, ED.lang)); return tg ? cpClone(tg.get()) : null; }
function edInit(c, k){
  const cur = edCurrent(); ED.orig0 = cpClone(cur); ED.missing = cur == null;
  let v = cur;
  if(v == null){ const nb = cpTarget(edKey(c.code, ED.type, ED.id, "nb")); v = nb ? cpClone(nb.get()) : null; } // ingen engelsk ennå: start med den norske teksten
  if(ED.type === "th"){ ED.blocks = edBlocks(v || ""); ED.rawMode = false; ED.rawText = ""; ED.draft = null; }
  else if(ED.type === "q"){ ED.draft = v || { p: "", a: ["", ""], e: "" }; ED.draft.e = ED.draft.e || "";
    if(!Array.isArray(ED.draft.a)){ ED.draft.a = Object.assign({}, ED.draft.a); ED.prec = edPrecOf(ED.draft.a); ED.draft.a.n = String(ED.draft.a.n).replace(".", ED.lang === "nb" ? "," : "."); } }
  else ED.draft = { t: (v && v.t) || "", intro: (v && v.intro) || "", ex: (v && v.ex) || "", tip: (v && v.tip) || "" };
  Object.assign(ED, { draftKey: k, notes: [], note: "", err: null, tab: "edit", addAt: null, undoDel: null, saving: false });
  ED.base = JSON.stringify(edOut());
}

// ---------- tegning ----------
function edTop(sub, title, back = "edback"){ return `<div class="top"><div class="wrap"><button class="iconbtn" data-a="${back}" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(sub)}</small><b>${esc(title)}</b></div></div></div>`; }
function edLogHTML(rows, err, single){
  if(err) return `<p class="ed-note">${esc(err)}</p>`;
  if(!rows) return `<p class="ed-note">${esc(T("Henter endringsloggen …", "Loading the change log …"))}</p>`;
  if(!rows.length) return `<p class="ed-note">${esc(single ? T("Ingen har rettet denne ennå.", "Nobody has edited this yet.") : T("Ingen rettinger ennå.", "No edits yet."))}</p>`;
  return `<div class="ed-log">${rows.map(r => { const d = edDiff(edFlat(r.old), edFlat(r.val)), when = new Date(r.created_at).toLocaleString(LANG === "en" ? "en-GB" : "nb-NO", { dateStyle: "medium", timeStyle: "short" });
    return `<article class="ed-row ${r.reverted_at ? "rev" : ""}"><div class="ed-rh"><b>${esc(r.author_name || "?")}</b><small>${esc(when)}</small>${r.reverted_at ? `<span class="ed-tag">${esc(T("angret", "undone"))}${r.reverted_name ? " · " + esc(r.reverted_name) : ""}</span>` : ""}</div>
      ${single ? "" : `<button class="exlink ed-k" data-a="edgoto" data-k="${esc(r.ckey)}">${esc(edKeyLabel(r.ckey))}</button>`}
      ${r.note ? `<p class="ed-why">💬 ${esc(r.note)}</p>` : ""}
      <details><summary>${esc(T("Vis hva som ble endret", "Show what changed"))}</summary><div class="ed-diff"><div><small>${esc(T("Før", "Before"))}</small><pre>${d.a}</pre></div><div><small>${esc(T("Etter", "After"))}</small><pre>${d.b}</pre></div></div></details>
      <button class="kbtn ${r.reverted_at ? "" : "ghost"}" data-a="edrevert" data-id="${r.id}" data-u="${r.reverted_at ? 0 : 1}">${esc(r.reverted_at ? T("Gjenopprett", "Restore") : T("Angre denne rettingen", "Undo this edit"))}</button></article>`; }).join("")}</div>`;
}
const edMark = k => k in CP.items ? `<span class="ed-dot">✎ ${esc(T("rettet", "edited"))}</span>` : "";
function edSnip(s, q, len = 130){ const p = edPlain(s), i = q ? p.toLowerCase().indexOf(q) : -1;
  let a = i > 50 ? i - 40 : 0, out = p.slice(a, a + len); if(a) out = "… " + out; if(a + len < p.length) out += " …";
  return q ? esc(out).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/&/g, "&amp;").replace(/</g, "&lt;"), "gi"), m => `<mark>${m}</mark>`) : esc(out); }
const edAns = x => Array.isArray(x[1]) ? edPlain(x[1][0]) : `${x[1].n}${x[1].u ? " " + x[1].u : ""}`;
function edCard(t, id, title, snip, k, tag){ return `<button class="ed-card2" data-a="edopen" data-t="${t}" data-id="${esc(id)}"${tag && tag.u != null ? ` data-u="${tag.u}"` : ""}>${edMark(k)}<span class="ed-ty">${tag ? tag.l : ""}</span><b>${title}</b><small>${snip}</small></button>`; }
function edBrowseBody(c){
  const q = ED.q.trim().toLowerCase(), L = ED.lang;
  if(q){ // søk i hele faget
    const hits = [];
    c.units.forEach((unit, u) => {
      const th = theoryOf(c.code, u), ut = unitTitle(c, u);
      if(th){ const s = String(th[L] || th.nb || ""); if((ut + " " + edPlain(s)).toLowerCase().includes(q)) hits.push(edCard("th", u, `📖 ${esc(T("Teori", "Theory"))} · ${esc(ut)}`, edSnip(s, q), edKey(c.code, "th", u, L), { l: `${u + 1}`, u })); }
      for(const tp of (typeof topicsOf === "function" ? topicsOf(c.code, u) : [])){ const x = tp[L] || tp.nb, s = [x.t, x.intro, x.ex, x.tip].filter(Boolean).join(" ");
        if(edPlain(s).toLowerCase().includes(q)) hits.push(edCard("tp", tp.id, `🧩 ${esc(x.t)}`, edSnip(x.intro, q), edKey(c.code, "tp", tp.id, L), { l: `${u + 1}`, u })); }
      unit.qs.forEach((x, i) => { const s = [x[0], Array.isArray(x[1]) ? x[1].join(" ") : "", x[2] || ""].join(" "), id = `${u}.${i}`;
        if(id === q || edPlain(s).toLowerCase().includes(q)) hits.push(edCard("q", id, `✏️ ${esc(T("Oppgave", "Problem"))} ${id}`, edSnip(x[0], q), edKey(c.code, "q", id, L), { l: `${u + 1}`, u })); });
    });
    return `<h3 class="ed-h">${esc(T(`${hits.length} treff i ${courseShort(c)}`, `${hits.length} results in ${courseShort(c)}`))}</h3>${hits.slice(0, 80).join("") || `<p class="ed-note">${esc(T("Ingen treff. Prøv et annet ord, eller velg et annet fag.", "No results. Try another word or pick another subject."))}</p>`}`;
  }
  if(!ED.uOpen) return `<h3 class="ed-h">${esc(T("Eller velg en enhet", "Or pick a unit"))}</h3><div class="ed-ugrid">${c.units.map((unit, u) => { const n = unit.qs.length, tp = (typeof topicsOf === "function" ? topicsOf(c.code, u) : []).length, th = !!theoryOf(c.code, u);
    return `<button class="ed-ucard" data-a="edunit" data-u="${u}"><span class="ed-un">${u + 1}</span><b>${esc(unitTitle(c, u))}</b><small>${[th ? T("teori", "theory") : "", tp ? T(`${tp} emner`, `${tp} topics`) : "", T(`${n} oppgaver`, `${n} problems`)].filter(Boolean).join(" · ")}</small></button>`; }).join("")}</div>`;
  const u = ED.u, unit = c.units[u], th = theoryOf(c.code, u), tps = typeof topicsOf === "function" ? topicsOf(c.code, u) : [];
  return `<h2 class="ed-uh"><span class="ed-un">${u + 1}</span>${esc(unitTitle(c, u))}</h2>
    ${th ? `<h3 class="ed-h">📖 ${esc(T("Teorien", "The theory"))}</h3>${edCard("th", u, esc(T("Hele teorien for enheten", "The whole theory for the unit")), edSnip(String(th[L] || th.nb), ""), edKey(c.code, "th", u, L))}` : ""}
    ${tps.length ? `<h3 class="ed-h">🧩 ${esc(T(`Emnesider (${tps.length})`, `Topic pages (${tps.length})`))}</h3>${tps.map(tp => { const x = tp[L] || tp.nb; return edCard("tp", tp.id, esc(x.t), edSnip(x.intro, ""), edKey(c.code, "tp", tp.id, L)); }).join("")}` : ""}
    <h3 class="ed-h">✏️ ${esc(T(`Oppgaver (${unit.qs.length})`, `Problems (${unit.qs.length})`))}</h3>
    ${unit.qs.map((x, i) => edCard("q", `${u}.${i}`, `<span class="ed-n">${u}.${i}</span> ${edSnip(x[0], "", 150)}`, `✓ ${esc(edAns(x).slice(0, 80))}`, edKey(c.code, "q", `${u}.${i}`, L))).join("") || `<p class="ed-note">${esc(T("Ingen faste oppgaver i denne enheten.", "No fixed problems in this unit."))}</p>`}
    <p class="ed-note">${esc(T("Oppgaver som får nye tall hver gang, lages av kode. Finner du feil i dem, trykk på flagget i oppgaven og rapporter det.", "Problems that get new numbers each time are made by code. If you find a mistake in one, tap the flag in the problem and report it."))}</p>`;
}
function renderEdit(){
  if(!ED) return edOpen();
  if(!canEdit()){ $app.innerHTML = `${edTop(T("Innhold", "Content"), T("Rett innhold", "Edit content"))}<main class="wrap"><p class="ed-note">${esc(T("Denne siden er for fagfolk og moderatorer. Logg inn med en konto som har rettigheter.", "This page is for subject experts and moderators. Log in with an account that has access."))}</p></main>`; return; }
  const c = COURSE(ED.code) || COURSES[0];
  if(ED.view === "log"){
    $app.innerHTML = `${edTop(T("Innhold", "Content"), T("Endringslogg", "Change log"))}<main class="wrap ed">
      <p class="ed-intro">${esc(T("Alle rettinger, nyeste først. Alt kan angres – da gjelder forrige versjon igjen.", "All edits, newest first. Everything can be undone – the previous version then applies again."))}</p>
      <label class="ed-chk"><input type="checkbox" data-a="edall" ${ED.allCourses ? "checked" : ""}> ${esc(T("Vis alle fag", "Show all subjects"))} ${ED.allCourses ? "" : "· " + esc(courseName(c))}</label>
      ${edLogHTML(ED.logRows, ED.logErr)}</main>`; return;
  }
  if(ED.view === "item") return renderEditItem(c);
  $app.innerHTML = `${edTop(ED.uOpen ? courseShort(c) : T("Innhold", "Content"), T("Rett innhold", "Edit content"))}<main class="wrap ed">
    <section class="ed-hero"><p>${esc(T("Finn det som skal rettes, trykk på det og endre teksten. Lagre – så gjelder det for alle med en gang. Alt kan angres.", "Find what needs fixing, tap it and change the text. Save – and it applies to everyone at once. Everything can be undone."))}</p>
      <div class="ed-sbox">${I.search}<input type="search" id="edq" value="${esc(ED.q)}" placeholder="${esc(T("Søk etter et ord fra oppgaven eller teorien …", "Search for a word from the problem or theory …"))}" aria-label="${esc(T("Søk", "Search"))}" autocomplete="off"></div>
      <div class="ed-bar"><label class="ed-subj"><span>${esc(T("Fag", "Subject"))}</span><select id="edcourse">${COURSES.map(x => `<option value="${x.code}" ${x.code === c.code ? "selected" : ""}>${esc(courseShort(x))} · ${esc(courseName(x))}</option>`).join("")}</select></label>
        <div class="seg ed-lang" role="group" aria-label="${esc(T("Språk", "Language"))}">${["nb", "en"].map(l => `<button class="${ED.lang === l ? "on" : ""}" data-a="edlang" data-l="${l}">${l === "nb" ? "Norsk" : "English"}</button>`).join("")}</div></div></section>
    <div id="edres">${edBrowseBody(c)}</div>
    <button class="kbtn ghost ed-logbtn" data-a="edlog">🕘 ${esc(T("Se alle endringer (endringslogg)", "See all changes (change log)"))}</button>
  </main>`;
  const sel = document.getElementById("edcourse"); if(sel) sel.addEventListener("change", () => { ED.code = sel.value; ED.u = 0; ED.uOpen = false; render(); });
  const qi = document.getElementById("edq"); if(qi) qi.addEventListener("input", () => { ED.q = qi.value; clearTimeout(renderEdit.t); renderEdit.t = setTimeout(() => { const r = document.getElementById("edres"); if(r) r.innerHTML = edBrowseBody(c); }, 180); });
}
function edPrevHTML(){
  const d = edOut();
  if(ED.type === "q"){ const mc = Array.isArray(d.a);
    return `<div class="ed-prev"><div class="qtext">${richBig(d.p || "")}</div>${mc ? `<ul class="ed-pvopts">${d.a.map((o, i) => `<li class="${i ? "" : "ok"}">${i ? "✗" : "✓"} ${richBig(o)}</li>`).join("")}</ul>` : `<p class="ed-pvnum">= <b>${esc(String(d.a.n).replace(".", decPoint() ? "." : ","))} ${esc(d.a.u || "")}</b></p>`}${d.e ? `<div class="fb-e">${rich(d.e)}</div>` : ""}
      ${mc ? `<p class="ed-note">${esc(T("Svaralternativene stokkes når elevene får oppgaven.", "The options are shuffled when students get the problem."))}</p>` : ""}</div>`; }
  if(ED.type === "th") return `<div class="ed-prev theory">${richDoc(d || "")}</div>`;
  return `<div class="ed-prev"><h3>${esc(d.t || "")}</h3><p class="intro">${rich(d.intro || "")}</p>${d.ex ? `<div class="exbox"><div class="exbox-h">${esc(t("tpExample"))}</div>${String(d.ex).split("\n").map(l => `<p>${rich(l)}</p>`).join("")}</div>` : ""}${d.tip ? `<div class="callout">${rich(d.tip)}</div>` : ""}</div>`;
}
function edPrecHint(){ const a = ED.draft.a, n = edNum(a.n); if(!Number.isFinite(n)) return T("Skriv et tall, f.eks. 12,5", "Write a number, e.g. 12.5");
  if(ED.prec === "0") return T("Bare akkurat dette tallet godtas.", "Only exactly this number is accepted.");
  const tol = ED.prec === "c" ? a.tol : Math.abs(n) * ED.prec / 100, f = x => (+x.toPrecision(4)).toLocaleString(ED.lang === "en" ? "en-GB" : "nb-NO");
  return T(`Godtar svar fra ${f(n - tol)} til ${f(n + tol)}.`, `Accepts answers from ${f(n - tol)} to ${f(n + tol)}.`); }
function edQForm(){
  const d = ED.draft, mc = Array.isArray(d.a), enNum = !mc && ED.lang === "en";
  const ans = mc ? `<div class="ed-card ok"><div class="ed-ch">✓ ${esc(T("Riktig svar", "Correct answer"))}</div>${edRT("a.0", d.a[0], { ph: T("Det riktige svaret", "The correct answer"), cls: "show" })}</div>
      <p class="ed-lbl">${esc(T("Feil svar som elevene kan velge mellom", "Wrong answers students can choose from"))}</p>
      ${d.a.slice(1).map((o, j) => `<div class="ed-card bad"><div class="ed-ch">✗ ${esc(T("Feil svar", "Wrong answer"))} ${j + 1}${d.a.length > 2 ? `<button type="button" class="ed-x" data-a="edoptdel" data-i="${j + 1}" aria-label="${esc(T("Fjern dette svaret", "Remove this answer"))}" title="${esc(T("Fjern", "Remove"))}">🗑</button>` : ""}</div>${edRT(`a.${j + 1}`, o, { ph: T("Et galt, men fristende svar", "A wrong but tempting answer"), cls: "show" })}</div>`).join("")}
      ${d.a.length < 6 ? `<button type="button" class="ed-addbtn" data-a="edoptadd">＋ ${esc(T("Legg til et feil svar", "Add a wrong answer"))}</button>` : ""}`
    : enNum ? `<div class="ed-card ok"><div class="ed-ch">✓ ${esc(T("Riktig svar", "Correct answer"))}</div><p class="ed-pvnum"><b>${esc(String(d.a.n))} ${esc(d.a.u || "")}</b></p><small class="ed-hint">${esc(T("Tallsvaret er felles for begge språk og rettes på norsk.", "The numeric answer is shared by both languages and is edited in Norwegian."))}</small></div>`
    : `<div class="ed-card ok"><div class="ed-ch">✓ ${esc(T("Riktig svar", "Correct answer"))}</div>
        <div class="ed-numrow"><input class="ed-in num" id="ednum" inputmode="decimal" autocomplete="off" value="${esc(d.a.n)}" aria-label="${esc(T("Tallet", "The number"))}"><input class="ed-in" id="edunit" autocomplete="off" value="${esc(d.a.u || "")}" placeholder="${esc(T("enhet, f.eks. m/s", "unit, e.g. m/s"))}" aria-label="${esc(T("Enhet", "Unit"))}"></div>
        <p class="ed-lbl">${esc(T("Hvor nøyaktig må svaret være?", "How precise must the answer be?"))}</p>
        <div class="chips ed-prec">${ED_PREC.map(([v, nb, en]) => `<button type="button" class="${ED.prec === v ? "on" : ""}" data-a="edprec" data-v="${v}">${esc(T(nb, en))}</button>`).join("")}${ED.prec === "c" ? `<button type="button" class="on" data-a="edprec" data-v="c">± ${esc(String(d.a.tol))} ${esc(T("(som før)", "(as before)"))}</button>` : ""}</div>
        <small class="ed-hint" id="edprech">${esc(edPrecHint())}</small></div>`;
  return `<p class="ed-lbl">${esc(T("Spørsmålet", "The question"))}</p>${edRT("p", d.p, { multi: 0, ph: T("Skriv spørsmålet …", "Write the question …"), cls: "show lg" })}
    ${ans}
    <p class="ed-lbl">${esc(T("Forklaring – vises etter at eleven har svart", "Explanation – shown after the student answers"))}</p>${edRT("e", d.e, { ph: T("Forklar kort hvorfor svaret er riktig …", "Briefly explain why the answer is right …"), cls: "show" })}`;
}
function edTpForm(){ const d = ED.draft;
  return `<p class="ed-lbl">${esc(T("Tittel", "Title"))}</p>${edRT("t", d.t, { ph: T("Tittel", "Title"), cls: "show h" })}
    <p class="ed-lbl">${esc(T("Innledning – kort og enkelt", "Introduction – short and simple"))}</p>${edRT("intro", d.intro, { ph: T("Forklar emnet med enkle ord …", "Explain the topic in simple words …"), cls: "show" })}
    <p class="ed-lbl">${esc(T("Eksempel – én linje per steg", "Example – one line per step"))}</p>${edRT("ex", d.ex, { multi: 1, ph: T("Et regneeksempel …", "A worked example …"), cls: "show" })}
    <p class="ed-lbl">${esc(T("Tips", "Tip"))}</p>${edRT("tip", d.tip, { ph: T("Et godt tips eller en huskeregel …", "A good tip or rule of thumb …"), cls: "show" })}
    <p class="ed-note">${esc(T("Formlene, forklaringene av symbolene og figuren på emnesiden rettes av utviklerne – skriv i notatet hvis noe er feil der.", "The formulas, symbol explanations and figure on the topic page are changed by the developers – mention it in the note if something is wrong there."))}</p>`; }
const ED_WHY = [["Skrivefeil", "Typo"], ["Feil svar", "Wrong answer"], ["Feil i formel", "Formula error"], ["Uklar forklaring", "Unclear explanation"], ["Bedre formulering", "Better wording"], ["Oversettelse", "Translation"], ["Nytt innhold", "New content"]];
function renderEditItem(c){
  const k = edKey(c.code, ED.type, ED.id, ED.lang);
  if(ED.draftKey !== k) edInit(c, k);
  const dirty = edDirty(), form = ED.type === "q" ? edQForm() : ED.type === "th" ? edTheoryForm() : edTpForm();
  $app.innerHTML = `${edTop(courseName(c), edKeyLabel(k))}<main class="wrap ed ed-item">
    <div class="ed-tabs"><div class="seg" role="group">${[["edit", "✏️ " + T("Rediger", "Edit")], ["prev", "👀 " + T("Slik ser det ut", "Preview")]].map(([v, l]) => `<button class="${ED.tab === v ? "on" : ""}" data-a="edtab" data-v="${v}">${esc(l)}</button>`).join("")}</div>
      <div class="seg ed-lang" role="group" aria-label="${esc(T("Språk", "Language"))}">${["nb", "en"].map(l => `<button class="${ED.lang === l ? "on" : ""}" data-a="edlang" data-l="${l}">${l === "nb" ? "NO" : "EN"}</button>`).join("")}</div></div>
    ${ED.missing && ED.lang === "en" ? `<p class="ed-info">🌍 ${esc(T("Dette finnes ikke på engelsk ennå. Teksten under er den norske – oversett den og lagre.", "This does not exist in English yet. The text below is the Norwegian one – translate it and save."))}</p>` : ""}
    ${ED.tab === "prev" ? edPrevHTML() : `<p class="ed-how">${esc(T("Trykk i teksten for å skrive. Trykk på en formel for å endre den, eller på «∑ Formel» for å lage en ny.", "Tap the text to type. Tap a formula to change it, or “∑ Formula” to make a new one."))}</p><div class="ed-form" id="edform">${form}</div>`}
    <details class="ed-hist"><summary>🕘 ${esc(T("Historikk for denne", "History for this item"))} <span id="edhistn">${ED.logRows ? `(${ED.logRows.length})` : ""}</span></summary><div id="edhist">${edLogHTML(ED.logRows, ED.logErr, true)}</div></details>
  </main>
  <div class="ed-savebar"><div class="wrap"><span id="edstate" class="${dirty ? "on" : ""}">${esc(dirty ? T("● Ulagrede endringer", "● Unsaved changes") : T("Ingen endringer ennå", "No changes yet"))}</span>
    <button class="kbtn ghost" id="edreset" data-a="edreset" ${dirty ? "" : "disabled"}>${esc(T("Forkast", "Discard"))}</button><button class="kbtn" id="edsaveask" data-a="edsaveask" ${dirty ? "" : "disabled"}>${esc(T("Lagre", "Save"))}</button></div></div>
  ${ED.saving ? `<div class="ed-sheetbg"><div class="ed-sheet pop" role="dialog" aria-modal="true" aria-label="${esc(T("Lagre", "Save"))}">
    <h3>${esc(T("Hva rettet du?", "What did you fix?"))}</h3><p class="ed-note">${esc(T("Trykk på én eller flere. Det vises i endringsloggen, så andre forstår hvorfor.", "Tap one or more. It is shown in the change log so others understand why."))}</p>
    <div class="chips ed-why">${ED_WHY.map(([nb, en]) => { const v = T(nb, en); return `<button type="button" class="${ED.notes.includes(v) ? "on" : ""}" data-a="edwhy" data-v="${esc(v)}">${esc(v)}</button>`; }).join("")}</div>
    <input id="ednote" class="ed-in" maxlength="200" value="${esc(ED.note || "")}" placeholder="${esc(T("Noe mer? Skriv her (valgfritt)", "Anything else? Write here (optional)"))}">
    ${ED.err ? `<p class="du-err">${esc(ED.err)}</p>` : ""}
    <div class="ed-acts"><button class="big" data-a="edsave" ${ED.busy ? "disabled" : ""}>${esc(ED.busy ? T("Lagrer …", "Saving …") : T("Lagre for alle", "Save for everyone"))}</button><button class="big ghost" data-a="edsavecancel">${esc(T("Tilbake", "Back"))}</button></div></div></div>` : ""}`;
  edBind();
}
// Hendelser i skjemaet (feltene tegnes ikke på nytt mens man skriver)
function edBind(){
  const f = document.getElementById("edform");
  const nt = document.getElementById("ednote"); if(nt) nt.addEventListener("input", () => { ED.note = nt.value; });
  if(!f) return;
  const fieldOf = n => n && n.closest && n.closest(".ed-rt");
  f.addEventListener("input", e => {
    const rt = fieldOf(e.target); if(rt){ edPut(rt.dataset.rt, edVal(rt)); return; }
    if(e.target.id === "edrawall"){ ED.rawText = e.target.value; edDirtyUI(); return; }
    if(e.target.dataset.rawb != null){ const b = ED.blocks[+e.target.dataset.rawb]; if(b) b.v = e.target.value; edDirtyUI(); return; }
    if(e.target.id === "ednum"){ ED.draft.a.n = e.target.value; const h = document.getElementById("edprech"); if(h) h.textContent = edPrecHint(); edDirtyUI(); return; }
    if(e.target.id === "edunit"){ ED.draft.a.u = e.target.value; edDirtyUI(); }
  });
  f.addEventListener("keydown", e => {
    const rt = fieldOf(e.target); if(!rt) return;
    if((e.ctrlKey || e.metaKey) && /^[biu]$/i.test(e.key) && !(rt.dataset.bold === "1" && /b/i.test(e.key))){ e.preventDefault(); return; }
    if(e.key !== "Enter" || e.isComposing) return;
    const p = rt.dataset.rt.split(".");
    if(p[0] === "b" && p.length === 3){ e.preventDefault(); const b = ED.blocks[+p[1]], j = +p[2]; b.items.splice(j + 1, 0, { v: "", sub: b.items[j].sub }); edReform(`b.${p[1]}.${j + 1}`); return; } // nytt punkt
    if(rt.dataset.multi === "1"){ e.preventDefault(); document.execCommand("insertLineBreak"); return; }
    e.preventDefault();
  });
  f.addEventListener("keydown", e => { // tomt punkt + slett: fjern punktet
    const rt = fieldOf(e.target); if(!rt || e.key !== "Backspace") return; const p = rt.dataset.rt.split(".");
    if(p[0] === "b" && p.length === 3 && !edVal(rt)){ const b = ED.blocks[+p[1]], j = +p[2]; if(b.items.length > 1){ e.preventDefault(); b.items.splice(j, 1); edReform(`b.${p[1]}.${Math.max(0, j - 1)}`, true); } }
  });
  f.addEventListener("paste", e => { const rt = fieldOf(e.target); if(!rt) return; e.preventDefault();
    let s = (e.clipboardData || window.clipboardData).getData("text") || ""; if(rt.dataset.multi !== "1") s = s.replace(/\s*\n\s*/g, " ");
    document.execCommand("insertHTML", false, edToHTML(s, rt.dataset.bold === "1")); });
  f.addEventListener("mousedown", e => { if(e.target.closest(".ed-tb")) e.preventDefault(); }); // behold markøren i feltet
  f.addEventListener("click", e => {
    const tb = e.target.closest(".ed-tb");
    if(tb){ const rt = tb.closest(".ed-rtw").querySelector(".ed-rt");
      if(tb.dataset.tb === "bold"){ rt.focus(); document.execCommand("bold"); edPut(rt.dataset.rt, edVal(rt)); return; }
      const path = rt.dataset.rt, sel = ED.sel && ED.sel.path === path ? ED.sel.range : null;
      edFx({ tex: "", onOk: v => edInsertChip(path, sel, v) }); return; }
    const chip = e.target.closest(".ed-mx");
    if(chip){ const rt = fieldOf(chip), path = rt.dataset.rt, idx = [...rt.querySelectorAll(".ed-mx")].indexOf(chip);
      const find = () => { const r = document.querySelector(`.ed-rt[data-rt="${path}"]`); return r ? [r, r.querySelectorAll(".ed-mx")[idx]] : [null, null]; };
      edFx({ tex: chip.dataset.tex,
        onOk: v => { const [r, ch] = find(); if(!ch) return; ch.dataset.tex = v; ch.innerHTML = tex(v); edPut(path, edVal(r)); },
        onDel: () => { const [r, ch] = find(); if(!ch) return; ch.remove(); edPut(path, edVal(r)); } }); }
  });
}
// Husk hvor markøren står, så en ny formel havner der
document.addEventListener("selectionchange", () => { if(screen === "edit") edSelSave(); });
function edSelSave(){ const s = document.getSelection(); if(!s || !s.rangeCount) return; const r = s.getRangeAt(0), rt = r.startContainer && (r.startContainer.nodeType === 1 ? r.startContainer : r.startContainer.parentElement);
  const f = rt && rt.closest && rt.closest(".ed-rt"); if(f && ED) ED.sel = { path: f.dataset.rt, range: r.cloneRange() }; }
function edInsertChip(path, range, v){
  const rt = document.querySelector(`.ed-rt[data-rt="${path}"]`); if(!rt) return;
  const tmp = document.createElement("span"); tmp.innerHTML = edChip(v, false); const chip = tmp.firstChild, sp = document.createTextNode("\u00a0");
  if(range && rt.contains(range.startContainer)){ range.deleteContents();
    const pre = range.startContainer.nodeType === 3 ? range.startContainer.nodeValue.slice(0, range.startOffset) : "";
    range.insertNode(sp); range.insertNode(chip); if(pre && !/\s$/.test(pre)) chip.before(" "); }
  else rt.append(edVal(rt) ? " " : "", chip, sp);
  const s = document.getSelection(); if(s){ const r = document.createRange(); r.setStartAfter(sp); r.collapse(true); s.removeAllRanges(); s.addRange(r); }
  edPut(path, edVal(rt));
}
// Tegn skjemaet på nytt (etter at blokker er lagt til, flyttet eller slettet) og sett markøren i et felt
function edReform(focus, atEnd = true){
  const y = window.scrollY; render(); window.scrollTo(0, y);
  if(focus){ const el = document.querySelector(`.ed-rt[data-rt="${focus}"]`); if(el){ el.focus(); if(atEnd){ const s = document.getSelection(), r = document.createRange(); r.selectNodeContents(el); r.collapse(false); s.removeAllRanges(); s.addRange(r); } } }
}
async function edSave(){
  const c = COURSE(ED.code), k = edKey(c.code, ED.type, ED.id, ED.lang), d = edOut();
  const fail = m => { ED.err = m; render(); };
  if(ED.type === "q"){ if(!String(d.p).trim()) return fail(T("Spørsmålet kan ikke være tomt.", "The question cannot be empty."));
    if(Array.isArray(d.a) && d.a.some(o => !String(o).trim())) return fail(T("Alle svarene må ha tekst – fjern dem du ikke trenger.", "All answers need text – remove the ones you don't need."));
    if(!Array.isArray(d.a) && !Number.isFinite(d.a.n)) return fail(T("Svaret må være et tall, f.eks. 12,5.", "The answer must be a number, e.g. 12.5.")); }
  if(ED.type === "th" && !String(d).trim()) return fail(T("Teorien kan ikke være tom.", "The theory cannot be empty."));
  if(ED.type === "tp" && !String(d.t).trim()) return fail(T("Emnet må ha en tittel.", "The topic needs a title."));
  if(JSON.stringify(d) === ED.base) return fail(T("Ingenting er endret.", "Nothing has changed."));
  const note = [...(ED.notes || []), String(ED.note || "").trim()].filter(Boolean).join(" · ");
  if(!note) return fail(T("Trykk på hva du rettet (eller skriv det), så andre forstår endringen.", "Tap what you fixed (or write it) so others understand the change."));
  ED.busy = true; ED.err = null; render();
  try{ await frRpc("content_save", { p_key: k, p_val: d, p_old: ED.orig0 ?? null, p_note: note, p_name: S.name || "" });
    ED.busy = false; ED.saving = false; ED.draftKey = null; await cpFetch(); render(); window.scrollTo(0, 0);
    toast(T("Lagret – rettingen gjelder for alle ✓", "Saved – the edit applies to everyone ✓")); edLoadLog(k); }
  catch(e){ ED.busy = false; fail(edErr(e)); }
}
async function edRevert(id, undo){
  try{ await frRpc("content_revert", { p_id: +id, p_undo: !!undo }); await cpFetch(); if(ED.view === "item"){ ED.draftKey = null; render(); }
    toast(undo ? T("Rettingen er angret", "The edit was undone") : T("Rettingen er gjenopprettet", "The edit was restored"));
    edLoadLog(ED.view === "item" ? edKey(ED.code, ED.type, ED.id, ED.lang) : null); }
  catch(e){ toast(edErr(e)); }
}
function edLeave(go){ if(ED && ED.view === "item" && edDirty() && !confirm(T("Du har endringer som ikke er lagret. Vil du forkaste dem?", "You have unsaved changes. Discard them?"))) return; go(); }
function edClick(a, b){
  if(!a.startsWith("ed")) return false;
  const dd = (b && b.dataset) || {};
  if(a === "edopenscreen"){ overlay = null; ED = null; edOpen({ view: "browse" }); return true; }
  if(a === "edrole"){ frRpc("admin_set_editor", { p_user: dd.id, p_on: dd.on === "1" }).then(() => toast(dd.on === "1" ? T("Personen kan nå rette innhold", "The person can now edit content") : T("Fagperson-tilgangen er fjernet", "Subject-expert access removed"))).catch(e => toast(edErr(e))); return true; }
  if(!ED) return false;
  const bi = +dd.b, B = ED.blocks;
  const go = (fn, focus) => { fn(); ED.addAt = null; edReform(focus); return true; };
  switch(a){
    case "edback": edLeave(() => { edFxClose();
      if(ED.view === "item" && ED.fromItem === false){ screen = ED.from || "settings"; ED = null; render(); return; }
      if(ED.view === "item" || ED.view === "log"){ ED.view = "browse"; ED.draftKey = null; ED.err = null; render(); }
      else if(ED.uOpen && !ED.q){ ED.uOpen = false; render(); }
      else { screen = ED.from && ED.from !== "edit" ? ED.from : "settings"; ED = null; render(); } window.scrollTo(0, 0); }); return true;
    case "edunit": ED.u = +dd.u; ED.uOpen = true; ED.q = ""; render(); window.scrollTo(0, 0); return true;
    case "edopen": if(dd.u != null) ED.u = +dd.u; ED.uOpen = true; Object.assign(ED, { view: "item", type: dd.t, id: dd.id, draftKey: null, logRows: null, fromItem: undefined }); render(); window.scrollTo(0, 0); edLoadLog(edKey(ED.code, ED.type, ED.id, ED.lang)); return true;
    case "edlang": edLeave(() => { ED.lang = dd.l; ED.draftKey = null; render(); if(ED.view === "item") edLoadLog(edKey(ED.code, ED.type, ED.id, ED.lang)); }); return true;
    case "edtab": ED.tab = dd.v; render(); return true;
    case "edsaveask": if(!edDirty()) return true; ED.saving = true; ED.err = null; render(); return true;
    case "edsavecancel": ED.saving = false; ED.err = null; render(); return true;
    case "edwhy": { const i = ED.notes.indexOf(dd.v); if(i >= 0) ED.notes.splice(i, 1); else ED.notes.push(dd.v); ED.err = null; render(); return true; }
    case "edsave": edSave(); return true;
    case "edreset": if(confirm(T("Forkaste endringene du har gjort?", "Discard the changes you made?"))){ ED.draftKey = null; render(); } return true;
    case "edprec": ED.prec = dd.v; render(); return true;
    case "edoptadd": return go(() => ED.draft.a.push(""), `a.${ED.draft.a.length}`);
    case "edoptdel": return go(() => ED.draft.a.splice(+dd.i, 1));
    case "edbadd": ED.addAt = dd.b === "none" ? null : bi; ED.undoDel = null; edReform(); return true;
    case "edbnew": { const at = (ED.addAt ?? B.length - 1) + 1, nb = { p: { k: "p", v: "" }, h: { k: "h", lv: 2, v: "" }, list: { k: "list", ol: false, items: [{ v: "" }] }, math: { k: "math", v: "" }, box: { k: "box", v: "" } }[dd.k];
      B.splice(at, 0, nb); ED.addAt = null; edReform(nb.k === "list" ? `b.${at}.0` : `b.${at}`); if(nb.k === "math") edMathBlock(at); return true; }
    case "edbup": if(bi > 0) return go(() => { [B[bi - 1], B[bi]] = [B[bi], B[bi - 1]]; ED.undoDel = null; }); return true;
    case "edbdn": if(bi < B.length - 1) return go(() => { [B[bi + 1], B[bi]] = [B[bi], B[bi + 1]]; ED.undoDel = null; }); return true;
    case "edbdel": return go(() => { ED.undoDel = { i: bi, b: B[bi] }; B.splice(bi, 1); });
    case "edbundo": return go(() => { if(ED.undoDel){ B.splice(ED.undoDel.i, 0, ED.undoDel.b); ED.undoDel = null; } });
    case "edliadd": return go(() => B[bi].items.push({ v: "" }), `b.${bi}.${B[bi].items.length}`);
    case "edlitype": return go(() => { B[bi].ol = !B[bi].ol; });
    case "edmathblk": edMathBlock(bi); return true;
    case "edraw": if(ED.rawMode){ ED.blocks = edBlocks(ED.rawText); ED.rawMode = false; } else { ED.rawText = edMd(ED.blocks); ED.rawMode = true; } edReform(); return true;
    case "edlog": ED.view = "log"; render(); edLoadLog(); return true;
    case "edall": ED.allCourses = b.checked; edLoadLog(); return true;
    case "edrevert": edRevert(dd.id, dd.u === "1"); return true;
    case "edgoto": { const { code, type, id, lang } = cpParse(dd.k); Object.assign(ED, { view: "item", code, type, id, lang, draftKey: null, logRows: null }); render(); window.scrollTo(0, 0); edLoadLog(dd.k); return true; }
  }
  return false;
}
function edMathBlock(i){ const b = ED.blocks[i]; if(!b) return;
  edFx({ tex: b.v, onOk: v => { b.v = v; edReform(); }, onDel: () => { ED.undoDel = { i, b }; ED.blocks.splice(i, 1); edReform(); } }); }
// Liten knapp på teori- og emnesider (og etter en fast oppgave) for dem som kan rette
const edBtnHTML = (type, code, id, cls = "") => canEdit() ? `<button class="exlink ed-quick ${cls}" data-a="edquick" data-t="${type}" data-c="${esc(code)}" data-id="${esc(id)}">✏️ ${esc(type === "q" ? T("Rett oppgaven", "Edit the problem") : T("Rett innholdet", "Edit the content"))}</button>` : "";
document.addEventListener("click", e => { const b = e.target.closest && e.target.closest('[data-a="edquick"]'); if(!b) return; e.stopPropagation();
  const { t: type, c: code, id } = b.dataset; ED = null;
  edOpen({ view: "item", type, code, id, uOpen: true, fromItem: false, u: type === "tp" ? (topicFind(code, id) || {}).u || 0 : +String(id).split(".")[0] });
  edLoadLog(edKey(code, type, id, ED.lang)); }, true);
