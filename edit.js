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
function edOpen(o){ ED = Object.assign({ view: "browse", code: S.current, u: 0, q: "", lang: LANG, from: screen === "edit" ? "settings" : screen }, ED && ED.from ? { from: ED.from } : {}, o || {}); screen = "edit"; render(); window.scrollTo(0, 0); if(ED.view === "log") edLoadLog(); }
function edOpenItem(type, code, id){ edOpen({ view: "item", type, code, id, u: type === "q" || type === "th" ? +String(id).split(".")[0] : (topicFind(code, id) || {}).u || 0, log: null }); edLoadLog(edKey(code, type, id, LANG)); }
async function edLoadLog(key){
  const e = ED; e.logErr = null; e.logRows = null; render();
  try{ e.logRows = await frRpc("content_log", { p_key: key || null, p_course: key ? null : (e.allCourses ? null : e.code), p_limit: 150 }) || []; }catch(err){ e.logErr = edErr(err); }
  if(ED === e && screen === "edit") render();
}

// ---------- tegning ----------
function edTop(sub, title, back = "edback"){ return `<div class="top"><div class="wrap"><button class="iconbtn" data-a="${back}" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(sub)}</small><b>${esc(title)}</b></div></div></div>`; }
function edLogHTML(rows, err, single){
  if(err) return `<p class="ed-note">${esc(err)}</p>`;
  if(!rows) return `<p class="ed-note">${esc(T("Henter endringsloggen …", "Loading the change log …"))}</p>`;
  if(!rows.length) return `<p class="ed-note">${esc(T("Ingen rettinger ennå.", "No edits yet."))}</p>`;
  return `<div class="ed-log">${rows.map(r => { const d = edDiff(edFlat(r.old), edFlat(r.val)), when = new Date(r.created_at).toLocaleString(LANG === "en" ? "en-GB" : "nb-NO", { dateStyle: "medium", timeStyle: "short" });
    return `<article class="ed-row ${r.reverted_at ? "rev" : ""}"><div class="ed-rh"><b>${esc(r.author_name || "?")}</b><small>${esc(when)}</small>${r.reverted_at ? `<span class="ed-tag">${esc(T("angret", "undone"))}${r.reverted_name ? " · " + esc(r.reverted_name) : ""}</span>` : ""}</div>
      ${single ? "" : `<button class="exlink ed-k" data-a="edgoto" data-k="${esc(r.ckey)}">${esc(edKeyLabel(r.ckey))}</button>`}
      ${r.note ? `<p class="ed-why">💬 ${esc(r.note)}</p>` : ""}
      <details><summary>${esc(T("Vis endringen", "Show the change"))}</summary><div class="ed-diff"><div><small>${esc(T("Før", "Before"))}</small><pre>${d.a}</pre></div><div><small>${esc(T("Etter", "After"))}</small><pre>${d.b}</pre></div></div></details>
      <button class="kbtn ${r.reverted_at ? "" : "ghost"}" data-a="edrevert" data-id="${r.id}" data-u="${r.reverted_at ? 0 : 1}">${esc(r.reverted_at ? T("Gjenopprett", "Restore") : T("Angre", "Undo"))}</button></article>`; }).join("")}</div>`;
}
function renderEdit(){
  if(!ED) return edOpen();
  if(!canEdit()){ $app.innerHTML = `${edTop(T("Innhold", "Content"), T("Rett innhold", "Edit content"))}<main class="wrap"><p class="ed-note">${esc(T("Denne siden er for fagfolk og moderatorer. Logg inn med en konto som har rettigheter.", "This page is for subject experts and moderators. Log in with an account that has access."))}</p></main>`; return; }
  const c = COURSE(ED.code) || COURSES[0];
  if(ED.view === "log"){
    $app.innerHTML = `${edTop(T("Innhold", "Content"), T("Endringslogg", "Change log"))}<main class="wrap ed">
      <label class="ed-chk"><input type="checkbox" data-a="edall" ${ED.allCourses ? "checked" : ""}> ${esc(T("Alle fag", "All subjects"))} ${ED.allCourses ? "" : "· " + esc(courseName(c))}</label>
      ${edLogHTML(ED.logRows, ED.logErr)}</main>`; return;
  }
  if(ED.view === "item") return renderEditItem(c);
  // bla: fag, enhet, teori, emner og oppgaver
  const unit = c.units[ED.u] || c.units[0], q = ED.q.trim().toLowerCase(), mark = k => k in CP.items ? `<span class="ed-dot" title="${esc(T("rettet", "edited"))}">✎</span>` : "";
  const qs = unit.qs.map((x, i) => ({ i, p: edPlain(x[0]) })).filter(x => !q || x.p.toLowerCase().includes(q));
  const tps = (typeof topicsOf === "function" ? topicsOf(c.code, ED.u) : []);
  $app.innerHTML = `${edTop(T("Innhold", "Content"), T("Rett innhold", "Edit content"))}<main class="wrap ed">
    <p class="ed-intro">${esc(T("Finn det som skal rettes, endre teksten og lagre med en kort begrunnelse. Rettingen gjelder for alle med en gang, og kan alltid angres i loggen.", "Find what needs fixing, change the text and save with a short reason. The edit applies to everyone at once and can always be undone in the log."))}</p>
    <div class="ed-bar"><select id="edcourse" aria-label="${esc(T("Fag", "Subject"))}">${COURSES.map(x => `<option value="${x.code}" ${x.code === c.code ? "selected" : ""}>${esc(courseShort(x))} · ${esc(courseName(x))}</option>`).join("")}</select>
      <button class="kbtn ghost" data-a="edlog">🕘 ${esc(T("Endringslogg", "Change log"))}</button></div>
    <div class="chips ed-units">${c.units.map((_, u) => `<button class="${u === ED.u ? "on" : ""}" data-a="edunit" data-u="${u}">${u + 1}. ${esc(unitTitle(c, u))}</button>`).join("")}</div>
    <h3 class="ed-h">📖 ${esc(T("Teori og emner", "Theory and topics"))}</h3>
    ${theoryOf(c.code, ED.u) ? `<button class="ed-item" data-a="edopen" data-t="th" data-id="${ED.u}">${mark(edKey(c.code, "th", ED.u, ED.lang))}<b>${esc(T("Teorien for enheten", "The theory for the unit"))}</b><small>${esc(edPlain(String(theoryOf(c.code, ED.u)[ED.lang] || theoryOf(c.code, ED.u).nb || "").slice(0, 110)))} …</small></button>` : ""}
    ${tps.map(tp => `<button class="ed-item" data-a="edopen" data-t="tp" data-id="${esc(tp.id)}">${mark(edKey(c.code, "tp", tp.id, ED.lang))}<b>${esc((tp[ED.lang] || tp.nb).t)}</b><small>${esc(edPlain((tp[ED.lang] || tp.nb).intro).slice(0, 110))} …</small></button>`).join("")}
    <h3 class="ed-h">✏️ ${esc(T(`Oppgaver (${unit.qs.length} faste)`, `Problems (${unit.qs.length} fixed)`))}</h3>
    <input type="search" id="edq" class="ed-search" value="${esc(ED.q)}" placeholder="${esc(T("Søk i oppgavene …", "Search the problems …"))}">
    ${qs.map(x => `<button class="ed-item" data-a="edopen" data-t="q" data-id="${ED.u}.${x.i}">${mark(edKey(c.code, "q", ED.u + "." + x.i, ED.lang))}<span class="ed-n">${ED.u}.${x.i}</span><small>${esc(x.p.slice(0, 160))}</small></button>`).join("") || `<p class="ed-note">${esc(T("Ingen treff.", "No matches."))}</p>`}
    <p class="ed-note">${esc(T("Oppgaver med nye tall hver gang (generatorer) er kode og rettes ved å rapportere dem fra oppgaven.", "Problems with new numbers each time (generators) are code and are fixed by reporting them from the problem."))}</p>
  </main>`;
  const sel = document.getElementById("edcourse"); if(sel) sel.addEventListener("change", () => { ED.code = sel.value; ED.u = 0; ED.q = ""; render(); });
  const qi = document.getElementById("edq"); if(qi) qi.addEventListener("input", () => { ED.q = qi.value; clearTimeout(renderEdit.t); renderEdit.t = setTimeout(() => { const pos = qi.selectionStart; render(); const n = document.getElementById("edq"); if(n){ n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e){} } }, 250); });
}
// Skjemaet for én ting
function edCurrent(){ const tg = cpTarget(edKey(ED.code, ED.type, ED.id, ED.lang)); return tg ? cpClone(tg.get()) : null; }
function edPrevHTML(){
  const d = ED.draft;
  if(ED.type === "q"){ const mc = Array.isArray(d.a);
    return `<div class="ed-prev"><div>${rich(d.p || "")}</div>${mc ? `<ul>${d.a.map((o, i) => `<li class="${i ? "" : "ok"}">${rich(o)}</li>`).join("")}</ul>` : `<p><b>= ${esc(d.a.n)} ${esc(d.a.u || "")}</b></p>`}${d.e ? `<div class="fb-e">${rich(d.e)}</div>` : ""}</div>`; }
  if(ED.type === "th") return `<div class="ed-prev theory">${typeof richDoc === "function" ? richDoc(d || "") : esc(d)}</div>`;
  return `<div class="ed-prev"><h3>${esc(d.t || "")}</h3><p>${rich(d.intro || "")}</p>${d.ex ? `<div class="exbox">${String(d.ex).split("\n").map(l => `<p>${rich(l)}</p>`).join("")}</div>` : ""}${d.tip ? `<div class="callout">${rich(d.tip)}</div>` : ""}</div>`;
}
function renderEditItem(c){
  const k = edKey(c.code, ED.type, ED.id, ED.lang);
  if(ED.draft == null || ED.draftKey !== k){ const cur = edCurrent();
    ED.draft = cur != null ? cur : ED.type === "q" ? Object.assign(cpClone(cpTarget(edKey(c.code, "q", ED.id, "nb")).get()), { p: "", e: "" }) : ED.type === "th" ? "" : { t: "", intro: "", ex: "", tip: "" };
    ED.draftKey = k; ED.orig0 = cpClone(cur); }
  const d = ED.draft, ta = (f, v, rows, label) => `<label class="ed-f"><span>${esc(label)}</span><textarea data-ed="${f}" rows="${rows}">${esc(v || "")}</textarea></label>`;
  let form = "";
  if(ED.type === "q"){
    const mc = Array.isArray(d.a);
    form = ta("p", d.p, 3, T("Oppgavetekst", "Problem text")) + (mc
      ? `<div class="ed-opts"><span>${esc(T("Svaralternativer – det første er riktig", "Answer options – the first is correct"))}</span>${d.a.map((o, i) => `<label class="ed-opt ${i ? "" : "ok"}"><i>${i ? "✗" : "✓"}</i><input data-ed="a${i}" value="${esc(o)}"></label>`).join("")}</div>`
      : `<div class="ed-num"><label>${esc(T("Svar", "Answer"))}<input data-ed="n" type="number" step="any" value="${esc(d.a.n)}"></label><label>${esc(T("Toleranse", "Tolerance"))}<input data-ed="tol" type="number" step="any" value="${esc(d.a.tol ?? "")}"></label><label>${esc(T("Enhet", "Unit"))}<input data-ed="u" value="${esc(d.a.u || "")}"></label></div>`)
      + ta("e", d.e, 4, T("Forklaring / løsning", "Explanation / solution"));
  } else if(ED.type === "th") form = ta("md", d, 18, T("Teori (## overskrift, - punkt, $matte$, $$formel$$, > boks, ![fig:…])", "Theory (## heading, - bullet, $maths$, $$formula$$, > box, ![fig:…])"));
  else form = ta("t", d.t, 1, T("Tittel", "Title")) + ta("intro", d.intro, 5, T("Innledning", "Introduction")) + ta("ex", d.ex, 4, T("Eksempel", "Example")) + ta("tip", d.tip, 2, T("Tips", "Tip"));
  const dirty = () => JSON.stringify(ED.draft) !== JSON.stringify(ED.orig0);
  $app.innerHTML = `${edTop(courseName(c), edKeyLabel(k))}<main class="wrap ed">
    <div class="seg ed-lang">${["nb", "en"].map(l => `<button class="${ED.lang === l ? "on" : ""}" data-a="edlang" data-l="${l}">${l === "nb" ? "Norsk" : "English"}</button>`).join("")}</div>
    ${k in CP.items ? `<p class="ed-note">✎ ${esc(T("Denne er rettet før. Se historikken under.", "This has been edited before. See the history below."))}</p>` : ""}
    <div class="ed-form" id="edform">${form}</div>
    <h3 class="ed-h">👀 ${esc(T("Slik ser det ut", "Preview"))}</h3><div id="edprev">${edPrevHTML()}</div>
    <label class="ed-f"><span>${esc(T("Hva rettet du, og hvorfor? (vises i loggen)", "What did you fix, and why? (shown in the log)"))}</span><input id="ednote" maxlength="300" value="${esc(ED.note || "")}" placeholder="${esc(T("F.eks. feil fortegn i svaret", "E.g. wrong sign in the answer"))}"></label>
    ${ED.err ? `<p class="du-err">${esc(ED.err)}</p>` : ""}
    <div class="ed-acts"><button class="big" data-a="edsave" ${ED.busy ? "disabled" : ""}>${esc(ED.busy ? T("Lagrer …", "Saving …") : T("Lagre rettingen", "Save the edit"))}</button><button class="big ghost" id="edreset" data-a="edreset" ${dirty() ? "" : "disabled"}>${esc(T("Forkast endringene", "Discard changes"))}</button></div>
    <h3 class="ed-h">🕘 ${esc(T("Historikk for denne", "History for this item"))}</h3>${edLogHTML(ED.logRows, ED.logErr, true)}
  </main>`;
  document.getElementById("edform").addEventListener("input", e => { const f = e.target.dataset.ed; if(!f) return; const v = e.target.value, dd = ED.draft;
    if(ED.type === "q"){ if(f === "p" || f === "e") dd[f] = v; else if(/^a\d$/.test(f)) dd.a[+f.slice(1)] = v; else if(f === "n" || f === "tol") dd.a[f] = v === "" ? undefined : +v; else if(f === "u") dd.a.u = v; }
    else if(ED.type === "th") ED.draft = v; else dd[f] = v;
    clearTimeout(renderEditItem.t); renderEditItem.t = setTimeout(() => { const pv = document.getElementById("edprev"); if(pv) pv.innerHTML = edPrevHTML(); const rb = document.getElementById("edreset"); if(rb) rb.disabled = !dirty(); }, 300); });
  const nt = document.getElementById("ednote"); if(nt) nt.addEventListener("input", () => { ED.note = nt.value; });
}
async function edSave(){
  const c = COURSE(ED.code), k = edKey(c.code, ED.type, ED.id, ED.lang), d = cpClone(ED.draft);
  if(ED.type === "q"){ if(!String(d.p).trim()){ ED.err = T("Oppgaveteksten kan ikke være tom.", "The problem text cannot be empty."); return render(); }
    if(Array.isArray(d.a) && d.a.some(o => !String(o).trim())){ ED.err = T("Alle svaralternativene må ha tekst.", "All answer options need text."); return render(); }
    if(!Array.isArray(d.a) && !Number.isFinite(+d.a.n)){ ED.err = T("Svaret må være et tall.", "The answer must be a number."); return render(); }
    if(!Array.isArray(d.a)){ d.a.n = +d.a.n; if(d.a.tol == null || !Number.isFinite(+d.a.tol)) delete d.a.tol; } }
  if(JSON.stringify(d) === JSON.stringify(ED.orig0)){ ED.err = T("Ingenting er endret.", "Nothing has changed."); return render(); }
  if(!String(ED.note || "").trim()){ ED.err = T("Skriv kort hva du rettet – det hjelper alle som leser loggen.", "Write briefly what you fixed – it helps everyone reading the log."); return render(); }
  ED.busy = true; ED.err = null; render();
  try{ await frRpc("content_save", { p_key: k, p_val: d, p_old: ED.orig0 ?? null, p_note: ED.note, p_name: S.name || "" });
    ED.busy = false; ED.note = ""; ED.draft = null; await cpFetch(); toast(T("Rettingen er lagret og gjelder for alle ✓", "The edit is saved and applies to everyone ✓")); edLoadLog(k); }
  catch(e){ ED.busy = false; ED.err = edErr(e); render(); }
}
async function edRevert(id, undo){
  try{ await frRpc("content_revert", { p_id: +id, p_undo: !!undo }); await cpFetch(); ED.draft = null; toast(undo ? T("Rettingen er angret", "The edit was undone") : T("Rettingen er gjenopprettet", "The edit was restored"));
    edLoadLog(ED.view === "item" ? edKey(ED.code, ED.type, ED.id, ED.lang) : null); }
  catch(e){ toast(edErr(e)); }
}
function edClick(a, b){
  if(!a.startsWith("ed")) return false;
  const dd = (b && b.dataset) || {};
  if(a === "edopenscreen"){ overlay = null; edOpen({ view: "browse" }); return true; }
  if(a === "edrole"){ frRpc("admin_set_editor", { p_user: dd.id, p_on: dd.on === "1" }).then(() => toast(dd.on === "1" ? T("Personen kan nå rette innhold", "The person can now edit content") : T("Fagperson-tilgangen er fjernet", "Subject-expert access removed"))).catch(e => toast(edErr(e))); return true; }
  if(!ED) return false;
  if(a === "edback"){ if(ED.view === "item" || ED.view === "log"){ ED.view = "browse"; ED.draft = null; ED.err = null; render(); } else { screen = ED.from && ED.from !== "edit" ? ED.from : "settings"; ED = null; render(); } return true; }
  if(a === "edunit"){ ED.u = +dd.u; ED.q = ""; render(); return true; }
  if(a === "edopen"){ ED.view = "item"; ED.type = dd.t; ED.id = dd.id; ED.draft = null; ED.err = null; ED.note = ""; render(); window.scrollTo(0, 0); edLoadLog(edKey(ED.code, ED.type, ED.id, ED.lang)); return true; }
  if(a === "edlang"){ ED.lang = dd.l; ED.draft = null; render(); edLoadLog(edKey(ED.code, ED.type, ED.id, ED.lang)); return true; }
  if(a === "edsave"){ edSave(); return true; }
  if(a === "edreset"){ ED.draft = null; ED.err = null; render(); return true; }
  if(a === "edlog"){ ED.view = "log"; render(); edLoadLog(); return true; }
  if(a === "edall"){ ED.allCourses = b.checked; edLoadLog(); return true; }
  if(a === "edrevert"){ edRevert(dd.id, dd.u === "1"); return true; }
  if(a === "edgoto"){ const { code, type, id, lang } = cpParse(dd.k); Object.assign(ED, { view: "item", code, type, id, lang, draft: null, err: null }); render(); window.scrollTo(0, 0); edLoadLog(dd.k); return true; }
  return false;
}
// Liten knapp på teori- og emnesider for dem som kan rette
const edBtnHTML = (type, code, id) => canEdit() ? `<button class="exlink ed-quick" data-a="edquick" data-t="${type}" data-c="${esc(code)}" data-id="${esc(id)}">✏️ ${esc(T("Rett innholdet", "Edit the content"))}</button>` : "";
document.addEventListener("click", e => { const b = e.target.closest && e.target.closest('[data-a="edquick"]'); if(!b) return; e.stopPropagation();
  ED = null; edOpen({ view: "item", type: b.dataset.t, code: b.dataset.c, id: b.dataset.id, u: b.dataset.t === "tp" ? (topicFind(b.dataset.c, b.dataset.id) || {}).u || 0 : +String(b.dataset.id).split(".")[0] });
  edLoadLog(edKey(b.dataset.c, b.dataset.t, b.dataset.id, LANG)); }, true);
