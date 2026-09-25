// ============================================================
//  FELLESSKAPSKURS – brukere lager egne kurs (maks 5 per bruker, maks 50 spørsmål) og deler dem.
//  Krever konto og supabase/fellesskap.sql. Spørsmålstyper: mc (flervalg), tf (sant/usant), num (tallsvar).
//  Spørsmål: { t, q, o:[...], a, n, tol (%), u, e }. Tekst kan ha $matte$ (vises med rich()).
// ============================================================
const CC_MAX_COURSES = 5, CC_MAX_Q = 50;
const CC_SUBJECTS = ["matte", "fysikk", "mekanikk", "elektro", "data", "kjemi", "bygg", "energi", "okonomi", "annet"];
const CC_EMOJI = ["📘", "📐", "🧮", "⚙️", "🔧", "⚡", "🔌", "💻", "🤖", "🧪", "🏗️", "🌊", "🔥", "🌱", "🚀", "🧠", "📊", "🎯", "🛠️", "🧲", "🛰️", "🌍", "💡", "⭐"];
let CC = { tab: "explore", q: "", sort: "popular", rows: null, mine: null, loading: false, err: null, view: null, edit: null, qedit: null };

async function ccRpc(name, args){ return frRpc(name, args); }
function ccErr(e){
  const m = (e && e.msg) || "", c = (e && e.code) || "";
  if(/too_many_courses/.test(m)) return t("ccTooMany", CC_MAX_COURSES);
  if(/bad_word/.test(m)) return t("frBadWord");
  if(/bad_questions/.test(m)) return t("ccBadQ");
  if(e && (e.status === 404 || /PGRST202|PGRST205|42P01|42883/.test(c))) return t("ccNoDb");
  return frErr(e);
}
async function ccLoad(){
  if(!CLOUD_ON || !AUTH) return;
  CC.loading = true; CC.err = null; ccRender();
  try{
    const [rows, mine] = await Promise.all([ccRpc("list_community", { q: CC.q, sort: CC.sort }), ccRpc("list_community", { q: "", sort: "mine" })]);
    CC.rows = rows || []; CC.mine = mine || [];
  }catch(e){ CC.err = ccErr(e); CC.rows = CC.rows || []; CC.mine = CC.mine || []; }
  CC.loading = false; ccRender();
}
function ccRender(){ if((screen === "community" || screen === "ccedit") && !overlay) render(); }
function openCommunity(){ screen = "community"; overlay = null; CC.view = null; render(); window.scrollTo(0, 0); if(CC.rows === null) ccLoad(); }
const ccSubj = s => t("ccSub_" + s) || s;

function ccCardHTML(r){
  return `<button class="cc-card" data-a="ccopen" data-id="${esc(r.id)}"><span class="cc-emo">${esc(r.emoji || "📘")}</span>
    <span class="cc-t"><b>${esc(r.title)}</b><span>${esc(r.author)}${r.author_username ? " · @" + esc(r.author_username) : ""}</span>
    <small>${esc(ccSubj(r.subject))} · ${esc(t("ccNQ", r.n_questions))}${r.mine && !r.published ? " · " + esc(t("ccDraft")) : ""}${r.hidden ? " · " + esc(t("ccHidden")) : ""}</small></span>
    <span class="cc-stats"><span class="${r.liked ? "on" : ""}">♥ ${r.likes}</span><span>▶ ${r.plays}</span></span></button>`;
}
function renderCommunity(){
  const head = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="tab" data-t="practice" aria-label="${esc(t("back"))}">${I.left}</button>
    <div class="th-t"><small>${esc(t("ccSub"))}</small><b>${esc(t("ccTitle"))}</b></div><span class="th-ic" aria-hidden="true">${I.users}</span></div></div>`;
  let body;
  if(!CLOUD_ON) body = `<div class="fr-card"><p>${esc(t("frNoCloud"))}</p></div>`;
  else if(!AUTH) body = `<div class="fr-card fr-intro"><span class="fr-big">${I.users}</span><h2>${esc(t("ccIntroTitle"))}</h2><p>${esc(t("ccIntroText"))}</p><button class="big" data-a="aclogin">${esc(t("acLogin"))}</button></div>`;
  else if(CC.view) body = ccDetailHTML(CC.view);
  else {
    const tabs = `<div class="seg cc-tabs" role="tablist">${["explore", "mine"].map(k => `<button role="tab" class="${CC.tab === k ? "on" : ""}" aria-selected="${CC.tab === k}" data-a="cctab" data-t="${k}">${esc(t(k === "explore" ? "ccExplore" : "ccMine"))}</button>`).join("")}</div>`;
    if(CC.tab === "mine"){
      const mine = CC.mine || [];
      body = tabs + `<p class="cc-limit">${esc(t("ccLimit", mine.length, CC_MAX_COURSES, CC_MAX_Q))}</p>
        <button class="big" data-a="ccnew" ${mine.length >= CC_MAX_COURSES ? "disabled" : ""}>${I.plus} ${esc(t("ccNew"))}</button>
        <div class="cc-list">${CC.mine === null || CC.loading ? `<p class="fr-wait">${esc(t("frLoading"))}</p>` : mine.length ? mine.map(ccCardHTML).join("") : `<p class="fr-hint">${esc(t("ccMineEmpty"))}</p>`}</div>`;
    } else {
      body = tabs + `<div class="fr-search">${I.search}<input type="search" id="ccq" placeholder="${esc(t("ccSearch"))}" value="${esc(CC.q)}" autocomplete="off"></div>
        <div class="chips cc-sort">${["popular", "new"].map(s => `<button class="${CC.sort === s ? "on" : ""}" data-a="ccsort" data-s="${s}">${esc(t(s === "popular" ? "ccPopular" : "ccNewest"))}</button>`).join("")}</div>
        <div class="cc-list">${CC.rows === null || CC.loading ? `<p class="fr-wait">${esc(t("frLoading"))}</p>` : CC.rows.length ? CC.rows.map(ccCardHTML).join("") : `<p class="fr-hint">${esc(t("ccEmpty"))}</p>`}</div>`;
    }
    if(CC.err) body += `<p class="fr-hint">${esc(CC.err)}</p>`;
  }
  $app.innerHTML = `${head}<main class="wrap fr cc">${body}</main>`;
  const q = document.getElementById("ccq");
  if(q) q.addEventListener("input", () => { CC.q = q.value; clearTimeout(CC.timer); CC.timer = setTimeout(async () => { const pos = q.selectionStart; await ccLoad(); const n = document.getElementById("ccq"); if(n){ n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e){} } }, 350); });
}
// ---------- detalj ----------
function ccFind(id){ return [...(CC.rows || []), ...(CC.mine || [])].find(r => r.id === id); }
function ccDetailHTML(r){
  return `<div class="fr-card cc-detail"><div class="cc-dh"><span class="cc-emo big">${esc(r.emoji || "📘")}</span><div><h2>${esc(r.title)}</h2><span>${esc(t("ccBy", r.author))}${r.author_username ? " · @" + esc(r.author_username) : ""}</span></div></div>
    ${r.description ? `<p>${esc(r.description)}</p>` : ""}
    <div class="cc-meta"><span>${esc(ccSubj(r.subject))}</span><span>${esc(t("ccNQ", r.n_questions))}</span><span>♥ ${r.likes}</span><span>▶ ${r.plays}</span></div>
    ${r.hidden ? `<p class="fr-hint">${esc(t("ccHiddenNote"))}</p>` : ""}
    <button class="big" data-a="ccplay" data-id="${esc(r.id)}" ${r.n_questions ? "" : "disabled"}>${esc(t("ccPlay"))}</button>
    ${r.mine ? `<button class="big ghost" data-a="ccedit" data-id="${esc(r.id)}">${I.pencil} ${esc(t("ccEdit"))}</button>`
             : `<button class="big ghost ${r.liked ? "liked" : ""}" data-a="cclike" data-id="${esc(r.id)}">${r.liked ? "♥ " + esc(t("ccLiked")) : "♡ " + esc(t("ccLike"))}</button>
                <button class="exlink fr-repl" data-a="ccreport" data-id="${esc(r.id)}">${I.flag}${esc(t("ccReport"))}</button>`}
    <button class="exlink" data-a="ccback">${esc(t("back"))}</button></div>`;
}
async function ccFetchQuestions(id){
  const tok = await authToken(); if(!tok) throw new CloudError("auth", 401);
  const rows = await sbFetch("/rest/v1/community_courses?id=eq." + encodeURIComponent(id) + "&select=*", { method: "GET" }, tok);
  if(!rows || !rows[0]) throw new CloudError("not_found", 404);
  return rows[0];
}
// Spørsmål → leksjonsoppgaver (samme motor som resten av appen).
function ccItems(qs){
  return qs.map((x, i) => {
    const id = "cc." + i;
    if(x.t === "num") return { id, type: "num", prompt: x.q, n: +x.n, tol: Math.abs(+x.n) * (Math.max(0, +x.tol || 1) / 100) || 1e-9, u: x.u || "", expl: x.e || "" };
    const opts = x.t === "tf" ? [{ t: t("ccTrue"), ok: +x.a === 1 }, { t: t("ccFalse"), ok: +x.a === 0 }] : shuffle(x.o.map((o, k) => ({ t: o, ok: k === +x.a })));
    return { id, type: "mc", prompt: x.q, opts, expl: x.e || "" };
  });
}
async function ccPlay(id, local){
  try{
    const c = local || await ccFetchQuestions(id);
    const qs = c.questions || []; if(!qs.length){ toast(t("ccNoQ")); return; }
    if(!local && !c.mine && c.owner !== (AUTH && AUTH.uid)) ccRpc("count_play", { cid: id }).catch(() => {});
    startLesson("community", S.current, ccItems(qs), { cid: id || "preview", title: c.title, own: !!local || c.owner === (AUTH && AUTH.uid) });
  }catch(e){ toast(ccErr(e)); }
}
// XP: 5 + riktige på første forsøk (maks 15), én gang per kurs per dag, ikke for egne kurs.
function ccXP(firstTry){
  const td = dayKey(); S.ccXp ||= {};
  if(L.meta.own || S.ccXp[L.meta.cid] === td) return 0;
  S.ccXp[L.meta.cid] = td; return Math.min(15, 5 + firstTry);
}
// ---------- redigering ----------
function ccBlank(){ return { id: null, title: "", description: "", emoji: "📘", subject: "annet", lang: LANG === "en" ? "en" : "nb", published: false, questions: [] }; }
async function ccEditOpen(id){
  try{
    CC.edit = id ? await ccFetchQuestions(id) : Object.assign(ccBlank(), (S.ccDraft && !S.ccDraft.id) ? S.ccDraft : {});
    CC.edit.questions = (CC.edit.questions || []).slice(); CC.qedit = null; CC.dirty = false;
    screen = "ccedit"; overlay = null; render(); window.scrollTo(0, 0);
  }catch(e){ toast(ccErr(e)); }
}
function ccDraftSave(){ const e = CC.edit; if(e && !e.id){ S.ccDraft = e; saveLocal(); } CC.dirty = true; }
function ccQPreview(x){
  const tp = { mc: t("ccTypeMc"), tf: t("ccTypeTf"), num: t("ccTypeNum") }[x.t];
  const ans = x.t === "num" ? `${nf(+x.n, 3)}${x.u ? " " + x.u : ""}` : x.t === "tf" ? t(+x.a ? "ccTrue" : "ccFalse") : x.o[+x.a];
  return `<span class="cc-qtype">${esc(tp)}</span><div class="cc-qtext">${rich(x.q)}</div><div class="cc-qans">✓ ${rich(String(ans))}</div>`;
}
function renderCCEdit(){
  const e = CC.edit; if(!e){ openCommunity(); return; }
  if(CC.qedit) return renderCCQEdit();
  const qs = e.questions;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="cceditclose" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="th-t"><small>${esc(t(e.id ? "ccEdit" : "ccNew"))}</small><b>${esc(e.title || t("ccUntitled"))}</b></div><span class="th-ic">${esc(e.emoji)}</span></div></div>
    <main class="wrap cc-ed">
      <div class="fr-card">
        <label class="cc-lbl">${esc(t("ccFTitle"))}<input id="cct" maxlength="60" value="${esc(e.title)}" placeholder="${esc(t("ccFTitlePh"))}"></label>
        <label class="cc-lbl">${esc(t("ccFDesc"))}<textarea id="ccd" maxlength="300" placeholder="${esc(t("ccFDescPh"))}">${esc(e.description)}</textarea></label>
        <div class="cc-lbl">${esc(t("ccFEmoji"))}<div class="cc-emojis">${CC_EMOJI.map(x => `<button class="${x === e.emoji ? "on" : ""}" data-a="ccemoji" data-e="${esc(x)}">${esc(x)}</button>`).join("")}</div></div>
        <div class="cc-row2"><label class="cc-lbl">${esc(t("ccFSubject"))}<select id="ccs">${CC_SUBJECTS.map(s => `<option value="${s}" ${s === e.subject ? "selected" : ""}>${esc(ccSubj(s))}</option>`).join("")}</select></label>
          <label class="cc-lbl">${esc(t("ccFLang"))}<select id="ccl"><option value="nb" ${e.lang === "nb" ? "selected" : ""}>Norsk</option><option value="en" ${e.lang === "en" ? "selected" : ""}>English</option></select></label></div>
        <div class="srow"><span class="lbl">${esc(t("ccFPublish"))}<span class="sub">${esc(t("ccFPublishSub"))}</span></span><button class="tog ${e.published ? "on" : ""}" data-a="ccpub" role="switch" aria-checked="${!!e.published}"></button></div>
      </div>
      <div class="cc-qh"><h3>${esc(t("ccQuestions"))} <span class="cc-cnt">${qs.length}/${CC_MAX_Q}</span></h3></div>
      <div class="cc-qs">${qs.length ? qs.map((x, i) => `<div class="cc-q"><div class="cc-qn">${i + 1}</div><div class="cc-qb">${ccQPreview(x)}</div>
        <div class="cc-qa"><button data-a="ccqup" data-i="${i}" ${i ? "" : "disabled"} aria-label="${esc(t("ccUp"))}">↑</button><button data-a="ccqdown" data-i="${i}" ${i < qs.length - 1 ? "" : "disabled"} aria-label="${esc(t("ccDown"))}">↓</button>
          <button data-a="ccqedit" data-i="${i}" aria-label="${esc(t("ccEditQ"))}">${I.pencil}</button><button data-a="ccqdup" data-i="${i}" ${qs.length >= CC_MAX_Q ? "disabled" : ""} aria-label="${esc(t("ccDupQ"))}">⧉</button><button data-a="ccqdel" data-i="${i}" aria-label="${esc(t("ccDelQ"))}">${I.trash}</button></div></div>`).join("")
        : `<p class="fr-hint">${esc(t("ccNoQYet"))}</p>`}</div>
      <div class="cc-add"><button class="big" data-a="ccqnew" ${qs.length >= CC_MAX_Q ? "disabled" : ""}>${I.plus} ${esc(t("ccAddQ"))}</button>
        <button class="big ghost" data-a="ccimport" ${qs.length >= CC_MAX_Q ? "disabled" : ""}>${esc(t("ccImport"))}</button></div>
      <button class="big ghost" data-a="cctest" ${qs.length ? "" : "disabled"}>▶ ${esc(t("ccTest"))}</button>
      ${e.id ? `<button class="big ghost" data-a="ccdelete" style="color:var(--bad)">${esc(CC.confirmDel ? t("ccDeleteSure") : t("ccDelete"))}</button>` : ""}
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="ccsave" ${CC.busy ? "disabled" : ""}>${esc(t("ccSave"))}</button></div></div>`;
  const bind = (id, k) => { const el = document.getElementById(id); if(el) el.addEventListener("input", () => { e[k] = el.value; ccDraftSave(); }); };
  bind("cct", "title"); bind("ccd", "description");
  ["ccs", "ccl"].forEach((id, i) => { const el = document.getElementById(id); if(el) el.addEventListener("change", () => { e[i ? "lang" : "subject"] = el.value; ccDraftSave(); }); });
}
// Redigering av ett spørsmål, med forhåndsvisning.
function ccQBlank(){ return { t: "mc", q: "", o: ["", "", "", ""], a: 0, n: "", tol: 1, u: "", e: "" }; }
function renderCCQEdit(){
  const x = CC.qedit.x, tp = x.t;
  const opts = tp === "mc" ? `<div class="cc-lbl">${esc(t("ccOptions"))}${x.o.map((o, k) => `<div class="cc-opt"><button class="cc-radio ${+x.a === k ? "on" : ""}" data-a="ccqa" data-i="${k}" aria-label="${esc(t("ccCorrect"))}">${+x.a === k ? "✓" : ""}</button>
        <input data-o="${k}" maxlength="150" value="${esc(o)}" placeholder="${esc(t("ccOptPh", k + 1))}">${x.o.length > 2 ? `<button class="cc-x" data-a="ccqorm" data-i="${k}" aria-label="${esc(t("ccDelQ"))}">${I.x}</button>` : ""}</div>`).join("")}
        ${x.o.length < 4 ? `<button class="exlink" data-a="ccqoadd">+ ${esc(t("ccAddOpt"))}</button>` : ""}<small class="cc-help">${esc(t("ccCorrectHelp"))}</small></div>`
    : tp === "tf" ? `<div class="cc-lbl">${esc(t("ccCorrect"))}<div class="seg">${[1, 0].map(v => `<button class="${+x.a === v ? "on" : ""}" data-a="ccqa" data-i="${v}">${esc(t(v ? "ccTrue" : "ccFalse"))}</button>`).join("")}</div></div>`
    : `<div class="cc-row3"><label class="cc-lbl">${esc(t("ccAnswer"))}<input id="ccqn" inputmode="decimal" value="${esc(String(x.n))}" placeholder="9,81"></label>
        <label class="cc-lbl">${esc(t("ccTol"))}<input id="ccqtol" inputmode="decimal" value="${esc(String(x.tol))}"></label>
        <label class="cc-lbl">${esc(t("ccUnit"))}<input id="ccqu" maxlength="20" value="${esc(x.u)}" placeholder="m/s²"></label></div>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="ccqcancel" aria-label="${esc(t("cancel"))}">${I.x}</button>
      <div class="th-t"><small>${esc(CC.edit.title || t("ccUntitled"))}</small><b>${esc(t(CC.qedit.i == null ? "ccAddQ" : "ccEditQ"))}</b></div></div></div>
    <main class="wrap cc-ed">
      <div class="seg cc-types">${["mc", "tf", "num"].map(k => `<button class="${tp === k ? "on" : ""}" data-a="ccqtype" data-t="${k}">${esc(t({ mc: "ccTypeMc", tf: "ccTypeTf", num: "ccTypeNum" }[k]))}</button>`).join("")}</div>
      <label class="cc-lbl">${esc(t("ccPrompt"))}<textarea id="ccqq" maxlength="500" placeholder="${esc(t("ccPromptPh"))}">${esc(x.q)}</textarea><small class="cc-help">${esc(t("ccMathHelp"))}</small></label>
      ${opts}
      <label class="cc-lbl">${esc(t("ccExpl"))}<textarea id="ccqe" maxlength="600" placeholder="${esc(t("ccExplPh"))}">${esc(x.e)}</textarea></label>
      <div class="cc-prev"><div class="cc-prev-h">${esc(t("ccPreview"))}</div><div id="ccprev"></div></div>
      ${CC.qedit.err ? `<p class="lgerr">${esc(CC.qedit.err)}</p>` : ""}
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="ccqsave">${esc(t("ccSaveQ"))}</button></div></div>`;
  const upd = () => { const p = document.getElementById("ccprev"); if(p) p.innerHTML = `<div class="prompt">${rich(x.q || "…")}</div>` + (x.t === "mc" ? `<div class="opts">${x.o.map((o, k) => `<div class="opt ${+x.a === k ? "right" : ""}"><span class="k">${k + 1}</span><span>${rich(o || "…")}</span></div>`).join("")}</div>` : x.t === "tf" ? `<div class="opts">${[1, 0].map(v => `<div class="opt ${+x.a === v ? "right" : ""}"><span>${esc(t(v ? "ccTrue" : "ccFalse"))}</span></div>`).join("")}</div>` : `<p class="cc-qans">✓ ${esc(String(x.n))} ${esc(x.u)}</p>`) + (x.e ? `<div class="cy-e ok">${rich(x.e)}</div>` : ""); };
  const bind = (id, fn) => { const el = document.getElementById(id); if(el) el.addEventListener("input", () => { fn(el.value); upd(); }); };
  bind("ccqq", v => x.q = v); bind("ccqe", v => x.e = v); bind("ccqn", v => x.n = v); bind("ccqtol", v => x.tol = v); bind("ccqu", v => x.u = v);
  document.querySelectorAll("[data-o]").forEach(el => el.addEventListener("input", () => { x.o[+el.dataset.o] = el.value; upd(); }));
  upd();
}
// Rydder og sjekker et spørsmål. Returnerer [spørsmål, feilmelding].
function ccQClean(x){
  const q = String(x.q || "").trim(), e = String(x.e || "").trim();
  if(!q) return [null, t("ccErrPrompt")];
  if((q.split("$").length - 1) % 2 || (e.split("$").length - 1) % 2) return [null, t("ccErrMath")];
  if(!isClean(q) || !isClean(e)) return [null, t("frBadWord")];
  if(x.t === "mc"){
    const o = x.o.map(s => String(s || "").trim()); if(o.some(s => !s)) return [null, t("ccErrOpts")];
    if(new Set(o).size !== o.length) return [null, t("ccErrDup")];
    if(o.some(s => !isClean(s))) return [null, t("frBadWord")];
    return [{ t: "mc", q, o, a: Math.min(+x.a || 0, o.length - 1), e }, null];
  }
  if(x.t === "tf") return [{ t: "tf", q, a: +x.a ? 1 : 0, e }, null];
  const n = parseFloat(String(x.n).replace(/\s/g, "").replace(",", ".")), tol = parseFloat(String(x.tol).replace(",", "."));
  if(!Number.isFinite(n)) return [null, t("ccErrNum")];
  return [{ t: "num", q, n, tol: Number.isFinite(tol) && tol >= 0 ? Math.min(tol, 50) : 1, u: String(x.u || "").trim().slice(0, 20), e }, null];
}
// Masseimport: én linje per spørsmål. «Spørsmål | riktig | galt | galt» eller «Spørsmål = 42 m» eller «Påstand = sant/usant».
function ccParseImport(txt){
  const out = [], bad = [];
  String(txt).split("\n").map(l => l.trim()).filter(Boolean).forEach((l, i) => {
    let x = null;
    if(l.includes("|")){ const p = l.split("|").map(s => s.trim()).filter(Boolean); if(p.length >= 3 && p.length <= 5) x = { t: "mc", q: p[0], o: shuffle(p.slice(1)), a: 0 }; if(x) x.a = x.o.indexOf(p[1]); }
    else { const m = l.match(/^(.+?)\s*=\s*(.+)$/); if(m){ const v = m[2].trim().toLowerCase();
      if(/^(sant|true|ja|yes)$/.test(v)) x = { t: "tf", q: m[1], a: 1 }; else if(/^(usant|false|nei|no)$/.test(v)) x = { t: "tf", q: m[1], a: 0 };
      else { const n = m[2].trim().match(/^(-?[\d\s]*[.,]?\d+(?:e-?\d+)?)\s*(.*)$/i); if(n) x = { t: "num", q: m[1], n: n[1], tol: 1, u: n[2] }; } } }
    const [c] = x ? ccQClean(x) : [null]; if(c) out.push(c); else bad.push(i + 1);
  });
  return { out, bad };
}
async function ccSave(){
  const e = CC.edit, title = String(e.title || "").trim(), desc = String(e.description || "").trim();
  if(title.length < 3){ toast(t("ccErrTitle")); return; }
  if(!isClean(title) || !isClean(desc)){ toast(t("frBadWord")); return; }
  if(e.published && !e.questions.length){ toast(t("ccErrPublishEmpty")); return; }
  CC.busy = true; render();
  const body = { title, description: desc, emoji: e.emoji, subject: e.subject, lang: e.lang, questions: e.questions, published: !!e.published };
  try{
    const tok = await authToken(); if(!tok) throw new CloudError("auth", 401);
    if(e.id) await sbFetch("/rest/v1/community_courses?id=eq." + encodeURIComponent(e.id), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(body) }, tok);
    else { const r = await sbFetch("/rest/v1/community_courses", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(Object.assign({ owner: AUTH.uid }, body)) }, tok); e.id = r && r[0] && r[0].id; S.ccDraft = null; save(); }
    CC.busy = false; CC.dirty = false; toast(t(e.published ? "ccSavedPub" : "ccSaved")); buzz(true);
    CC.tab = "mine"; CC.edit = null; screen = "community"; CC.view = null; await ccLoad(); window.scrollTo(0, 0);
  }catch(err){ CC.busy = false; render(); toast(ccErr(err)); }
}
function communityClick(a, b){
  if(!a.startsWith("cc")) return false;
  const e = CC.edit;
  if(a === "cctab"){ CC.tab = b.dataset.t; render(); }
  else if(a === "ccsort"){ CC.sort = b.dataset.s; ccLoad(); }
  else if(a === "ccopen"){ CC.view = ccFind(b.dataset.id); render(); window.scrollTo(0, 0); }
  else if(a === "ccback"){ CC.view = null; render(); }
  else if(a === "ccplay") ccPlay(b.dataset.id);
  else if(a === "cclike"){ const r = ccFind(b.dataset.id); ccRpc("toggle_like", { cid: b.dataset.id }).then(n => { if(r){ r.likes = n; r.liked = !r.liked; } buzz(true); render(); }, err => toast(ccErr(err))); }
  else if(a === "ccreport"){ const r = ccFind(b.dataset.id); overlay = { frrep: { kind: "course", id: null, target: b.dataset.id, reason: null, owner: r && r.owner } }; renderOverlay(); }
  else if(a === "ccnew") ccEditOpen(null);
  else if(a === "ccedit") ccEditOpen(b.dataset.id);
  else if(a === "cceditclose"){ if(CC.dirty && !CC.closeSure){ CC.closeSure = true; toast(t("ccUnsaved")); setTimeout(() => CC.closeSure = false, 3000); return true; } CC.edit = null; CC.closeSure = false; screen = "community"; render(); }
  else if(a === "ccemoji"){ e.emoji = b.dataset.e; ccDraftSave(); render(); }
  else if(a === "ccpub"){ e.published = !e.published; ccDraftSave(); render(); }
  else if(a === "ccqnew"){ CC.qedit = { i: null, x: ccQBlank() }; render(); window.scrollTo(0, 0); }
  else if(a === "ccqedit"){ const x = JSON.parse(JSON.stringify(e.questions[+b.dataset.i])); if(x.t === "mc") while(x.o.length < 2) x.o.push(""); CC.qedit = { i: +b.dataset.i, x }; render(); window.scrollTo(0, 0); }
  else if(a === "ccqdup"){ const i = +b.dataset.i; e.questions.splice(i + 1, 0, JSON.parse(JSON.stringify(e.questions[i]))); ccDraftSave(); render(); }
  else if(a === "ccqdel"){ e.questions.splice(+b.dataset.i, 1); ccDraftSave(); render(); }
  else if(a === "ccqup" || a === "ccqdown"){ const i = +b.dataset.i, j = a === "ccqup" ? i - 1 : i + 1; [e.questions[i], e.questions[j]] = [e.questions[j], e.questions[i]]; ccDraftSave(); render(); }
  else if(a === "ccqtype"){ const x = CC.qedit.x; x.t = b.dataset.t; if(x.t === "mc" && (!x.o || x.o.length < 2)) x.o = ["", "", "", ""]; x.a = x.t === "tf" ? 1 : 0; render(); }
  else if(a === "ccqa"){ CC.qedit.x.a = +b.dataset.i; render(); }
  else if(a === "ccqoadd"){ CC.qedit.x.o.push(""); render(); }
  else if(a === "ccqorm"){ const x = CC.qedit.x, k = +b.dataset.i; x.o.splice(k, 1); if(+x.a >= x.o.length) x.a = 0; else if(+x.a > k) x.a--; render(); }
  else if(a === "ccqcancel"){ CC.qedit = null; render(); }
  else if(a === "ccqsave"){ const [c, err] = ccQClean(CC.qedit.x); if(!c){ CC.qedit.err = err; render(); return true; }
    if(CC.qedit.i == null) e.questions.push(c); else e.questions[CC.qedit.i] = c; CC.qedit = null; ccDraftSave(); render(); toast(t("ccQSaved")); }
  else if(a === "ccimport"){ overlay = { ccimport: 1 }; renderOverlay(); }
  else if(a === "ccimportgo"){ const { out, bad } = ccParseImport((document.getElementById("ccimp") || {}).value || ""); const room = CC_MAX_Q - e.questions.length;
    e.questions.push(...out.slice(0, room)); ccDraftSave(); overlay = null; renderOverlay(); render(); toast(t("ccImported", Math.min(out.length, room), bad.length)); }
  else if(a === "cctest"){ ccPlay(null, { title: e.title, questions: e.questions }); }
  else if(a === "ccdelete"){ if(!CC.confirmDel){ CC.confirmDel = true; render(); setTimeout(() => { CC.confirmDel = false; }, 4000); return true; }
    authToken().then(tok => sbFetch("/rest/v1/community_courses?id=eq." + encodeURIComponent(e.id), { method: "DELETE", headers: { Prefer: "return=minimal" } }, tok))
      .then(() => { CC.confirmDel = false; CC.edit = null; screen = "community"; CC.view = null; toast(t("ccDeleted")); ccLoad(); }, err => toast(ccErr(err))); }
  else if(a === "ccsave") ccSave();
  else return false;
  return true;
}
function ccImportHTML(){
  return `<div class="dialog pop" role="dialog" aria-label="${esc(t("ccImport"))}"><h3>${esc(t("ccImport"))}</h3><p>${esc(t("ccImportText"))}</p>
    <pre class="code cc-ex">${esc(t("ccImportEx"))}</pre>
    <textarea id="ccimp" rows="8" placeholder="${esc(t("ccImportPh"))}"></textarea>
    <button class="big" data-a="ccimportgo">${esc(t("ccImportGo"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}
function ccCardPracticeHTML(){ // kort i Øv-fanen
  return `<button class="qt-row cc-entry" data-a="community"><span class="qt-ic">${I.users}</span><span><b>${esc(t("ccTitle"))}</b><small>${esc(t("ccEntrySub"))}</small></span>${I.chevron}</button>`;
}
