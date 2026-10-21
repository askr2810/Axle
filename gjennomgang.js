// ============================================================
//  GJENNOMGANG for fagpersoner (#/gjennomgang). Database: supabase/gjennomgang.sql.
//  Én emneside (eller enhet uten emnesider) av gangen: teori, eksempel, oppgaver med fasit og chk.
//  Godkjent / Flagg (kommentar kreves) / Foreslå endring. Forslag publiseres ikke.
//  Merket «Kontrollert av fagperson» vises bare når en aktiv godkjenning matcher innholdets hash.
//  Uten SQL-filen: siden forklarer det, og resten av appen virker som før. Ingen invitasjonslenke.
// ============================================================
let RV = { phase: "boot", forUser: null, loading: false, me: null, probed: false, code: "", study: "", tab: "queue",
  items: [], i: 0, flag: false, edit: null, comment: "", busy: false, err: "", focus: "", from: "", sealOff: false, seals: {},
  people: null, peopleErr: "", log: null, logErr: "" };

function rvHash(s){
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  const str = String(s);
  for(let i = 0; i < str.length; i++){
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ c, 0x85ebca6b);
    h2 = (h2 + i) | 0;
  }
  const hex = n => (n >>> 0).toString(16).padStart(8, "0");
  return hex(h1) + hex(h2);
}
function rvCanon(item){
  return JSON.stringify({ id: item.id, nb: item.nb, en: item.en, ex: (item.exercises || []).map(q => [q.i, q.nb, q.en]), chk: item.chkRaw || null });
}
function rvNeeds(it){ return !it.mine; }
function rvSort(items){
  return items.slice().sort((a, b) => {
    const au = rvNeeds(a), bu = rvNeeds(b);
    if(au !== bu) return au ? -1 : 1;
    const df = (b.flags || 0) - (a.flags || 0);
    if(df) return df;
    if((a.unit || 0) !== (b.unit || 0)) return (a.unit || 0) - (b.unit || 0);
    return String(a.title || "").localeCompare(String(b.title || ""), "nb");
  });
}
function rvProgress(items){
  const list = items || [];
  return { x: list.filter(it => it.approved).length, y: list.length };
}
// Samme regel som review_hash_ok: siste vurdering på denne hashen må være godkjent.
function rvApproved(rows, hash){
  const list = (rows || []).filter(r => r && r.hash === hash);
  list.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : (a.id || 0) - (b.id || 0)));
  return list.length > 0 && list[list.length - 1].verdict === "approved";
}
function rvFlagOk(text){ const t = String(text || "").trim(); return t.length >= 2 && t.length <= 500; }
function rvActionForKey(key){
  const k = String(key || "");
  if(k === "g" || k === "G") return "approve";
  if(k === "f" || k === "F") return "flag";
  if(k === "e" || k === "E") return "edit";
  if(k === "n" || k === "N" || k === "ArrowRight") return "next";
  if(k === "p" || k === "P" || k === "ArrowLeft") return "prev";
  return null;
}
function rvAnsText(a){
  if(Array.isArray(a)) return a.map((x, i) => (i ? "✗ " : "✓ ") + x).join("\n");
  if(a && typeof a === "object") return "= " + a.n + (a.u ? " " + a.u : "") + (a.tol != null ? " (± " + a.tol + ")" : "");
  return a == null ? "" : String(a);
}
function rvMathLine(s){
  const t = String(s || "").trim();
  if(!t) return "";
  if(t.includes("$")) return t;
  if(/\\/.test(t)) return "$$" + t + "$$";
  return t;
}
function rvTopicText(x){
  if(!x) return { theory: "", example: "", tip: "" };
  const f = (x.f || []).map(r => rvMathLine(r[0]) + (r[1] ? "\n" + r[1] : "")).filter(Boolean).join("\n\n");
  const legend = (x.legend || []).map(r => r.map(rvMathLine).join(" · ")).join("\n");
  const steps = (x.steps || []).map(g => {
    const rows = (g.rows || []).map(r => rvMathLine([].concat(r[0]).join("\n")) + (r[1] ? "\n" + r[1] : "")).join("\n\n");
    return [g.h || "", rows].filter(Boolean).join("\n");
  }).filter(Boolean).join("\n\n");
  return { theory: [x.intro || "", f, legend, steps].filter(Boolean).join("\n\n"), example: x.ex || "", tip: x.tip || "" };
}
function rvExtractExamples(src){
  const out = []; let on = false;
  for(const L of String(src || "").split("\n")){
    if(/^#{2,3}\s+/.test(L)){ on = /eksempel|example/i.test(L); if(on) out.push(L); continue; }
    if(on) out.push(L);
  }
  return out.join("\n").trim();
}
function rvFlattenChk(raw, out){
  if(raw == null || raw === "") return;
  if(Array.isArray(raw)){ raw.forEach(x => rvFlattenChk(x, out)); return; }
  if(typeof raw === "object"){ out.push(Object.entries(raw).map(([k, v]) => k + " = " + v).join(", ")); return; }
  out.push(String(raw));
}
function rvChkRaw(tp){
  const out = [];
  if(tp && tp.chk != null) rvFlattenChk(tp.chk, out);
  for(const lang of ["nb", "en"]){
    const steps = tp && tp[lang] && tp[lang].steps;
    if(steps) for(const g of steps) if(g && g.chk != null) rvFlattenChk(g.chk, out);
  }
  return out;
}
function rvChkUnique(list){
  const seen = new Set(), out = [];
  for(const x of list || []){ const k = typeof x === "string" ? x : JSON.stringify(x); if(seen.has(k)) continue; seen.add(k); out.push(x); }
  return out;
}
function rvChkEval(expr){
  const m = String(expr).trim().match(/^(.{1,200}?)\s*(?:≈|~=|\\approx)\s*([+-]?(?:\d+(?:[.,]\d+)?|\.\d+)(?:e[+-]?\d+)?)\s*$/i);
  if(!m) return null;
  let js = m[1].replace(/\{,\}/g, ".").replace(/,/g, ".").replace(/\^/g, "**").replace(/\s+/g, "");
  if(!/^[\d.+\-*/()]+$/.test(js.replace(/\*\*/g, "*"))) return null;
  let v; try{ v = Function('"use strict";return (' + js + ")")(); }catch(e){ return { ok: false }; }
  if(typeof v !== "number" || !isFinite(v)) return { ok: false };
  const want = parseFloat(m[2].replace(",", "."));
  return { ok: Math.abs(v - want) <= Math.max(0.015, Math.abs(want) * 0.01), got: Math.round(v * 1000) / 1000, want };
}
function rvChkReport(raw){
  const lines = [];
  rvFlattenChk(raw, lines);
  const parsed = lines.map(rawLine => {
    const ev = rvChkEval(rawLine);
    if(!ev) return { raw: rawLine, ok: null };
    return { raw: rawLine, ok: ev.ok, got: ev.got, want: ev.want };
  });
  if(!parsed.length) return { state: "missing", lines: [], bad: 0, n: 0 };
  const nums = parsed.filter(l => l.ok != null), bad = nums.filter(l => !l.ok).length;
  return { state: !nums.length ? "info" : bad ? "bad" : "ok", lines: parsed, bad, n: parsed.length };
}
function rvExercises(code, u){
  const c = COURSE(code), qs = (c && c.units[u] && c.units[u].qs) || [];
  const enAll = (typeof ENQ !== "undefined" && ENQ[code] && ENQ[code][u]) || [];
  return qs.map((q, i) => {
    const en = enAll[i];
    return { i, nb: { p: String(q[0] || ""), a: rvAnsText(q[1]), e: String(q[2] || "") },
      en: en ? { p: String(en[0] || ""), a: rvAnsText(en[1] != null ? en[1] : q[1]), e: String(en[2] || "") } : null };
  });
}
function rvFinish(item){
  item.hash = rvHash(rvCanon(item));
  item.chk = rvChkReport(item.chkRaw);
  item.flags = 0; item.approved = false; item.mine = null;
  return item;
}
function rvFromTopic(c, u, tp){
  return rvFinish({
    id: c.code + "|tp|" + tp.id, code: c.code, unit: u, kind: "tp", topicId: tp.id,
    title: (tp.nb && tp.nb.t) || tp.id, titleEn: (tp.en && tp.en.t) || (tp.nb && tp.nb.t) || tp.id,
    nb: rvTopicText(tp.nb), en: rvTopicText(tp.en || tp.nb), exercises: rvExercises(c.code, u), chkRaw: rvChkUnique(rvChkRaw(tp))
  });
}
function rvFromUnit(c, u, doc){
  const nbSrc = (doc && doc.nb) || "", enSrc = (doc && (doc.en || doc.nb)) || "";
  const tps = (typeof topicsOf === "function" ? topicsOf(c.code, u) : []) || [];
  return rvFinish({
    id: c.code + "|un|" + u, code: c.code, unit: u, kind: "un", topicId: null,
    title: c.units[u].title, titleEn: c.units[u].title,
    nb: { theory: nbSrc, example: rvExtractExamples(nbSrc), tip: "" },
    en: { theory: enSrc, example: rvExtractExamples(enSrc), tip: "" },
    exercises: rvExercises(c.code, u), chkRaw: rvChkUnique([].concat(...tps.map(rvChkRaw)))
  });
}
function rvCollect(code){
  const c = typeof COURSE === "function" ? COURSE(code) : null;
  if(!c) return [];
  const items = [];
  (c.units || []).forEach((unit, u) => {
    const tps = ((typeof topicsOf === "function" ? topicsOf(code, u) : []) || []).filter(tp => tp && tp.id && !tp.stub);
    if(tps.length) tps.forEach(tp => items.push(rvFromTopic(c, u, tp)));
    else {
      const doc = typeof theoryOf === "function" ? theoryOf(code, u) : null;
      if(doc || (unit.qs || []).length) items.push(rvFromUnit(c, u, doc));
    }
  });
  return items;
}
function rvApplyState(items, rows){
  const by = {};
  for(const r of rows || []) if(r && r.topic_id) by[r.topic_id] = r;
  for(const it of items){
    const r = by[it.id] || {};
    it.flags = +r.flags || 0; it.approved = !!r.approved; it.mine = r.mine || null;
  }
  return items;
}
function rvView(item){
  const en = typeof LANG !== "undefined" && LANG === "en";
  return (en && item.en && (item.en.theory || item.en.example)) ? item.en : (item.nb || { theory: "", example: "", tip: "" });
}
function rvPlainField(item, field){
  const v = rvView(item);
  if(field === "theory") return v.theory || "";
  if(field === "example") return v.example || "";
  if(field === "tip") return v.tip || "";
  const m = /^q(\d+)$/.exec(field || "");
  if(!m) return "";
  const q = (item.exercises || [])[+m[1]];
  if(!q) return "";
  const x = (typeof LANG !== "undefined" && LANG === "en" && q.en) ? q.en : q.nb;
  return x ? x.p : "";
}
function rvSuggestionPayload(item, field, text){
  const before = rvPlainField(item, field), after = String(text || "").replace(/\s+$/g, "").replace(/^\s+/g, "");
  if(!item || after.length < 1 || after.length > 8000 || after === String(before).trim()) return null;
  return { p_topic: item.id, p_hash: item.hash, p_field: field, p_lang: (typeof LANG !== "undefined" && LANG === "en") ? "en" : "nb", p_before: before, p_after: after };
}
function rvMissing(e){
  return !!(e && (e.status === 404 || /PGRST202|42883|schema cache|does not exist/i.test(String(e.code || "") + " " + String(e.msg || "") + " " + String(e.message || ""))));
}
function rvErr(e){
  if(rvMissing(e)) return T("Gjennomgang er ikke slått på ennå. Eieren må kjøre supabase/gjennomgang.sql i Supabase → SQL Editor. Resten av appen virker som før.", "Review is not switched on yet. The owner must run supabase/gjennomgang.sql in the Supabase SQL Editor. The rest of the app works as before.");
  const m = String((e && (e.msg || e.message)) || "");
  if(/flag_comment/.test(m)) return T("Flagging kreves med en kort kommentar (2–500 tegn).", "Flagging needs a short comment (2–500 characters).");
  if(/not_owner/.test(m)) return T("Bare eieren kan administrere fagpersoner.", "Only the owner can manage reviewers.");
  if(/not_reviewer|not_allowed/.test(m)) return T("Du har ikke tilgang til gjennomgang.", "You do not have access to review.");
  if(/no_user/.test(m)) return T("Fant ingen Axle-konto med den e-posten. Personen må ha logget inn minst én gang. Det sendes ingen invitasjonslenke.", "No Axle account with that email. The person must have signed in at least once. No invitation link is sent.");
  if(/last_owner/.test(m)) return T("Den siste eieren kan ikke fjernes.", "The last owner cannot be removed.");
  if(/bad_subject|no_subjects/.test(m)) return T("Oppgi fagkoder som VG1T, eller * for alle.", "Enter course codes such as VG1T, or * for all.");
  if(/rate/.test(m)) return T("For mange innsendinger. Vent litt.", "Too many submissions. Wait a moment.");
  if(e && e.kind === "offline") return T("Ingen nettforbindelse.", "No connection.");
  if(e && e.kind === "auth") return T("Logg inn på nytt.", "Sign in again.");
  return T("Noe gikk galt. Prøv igjen.", "Something went wrong. Try again.");
}
async function rvRpc(name, args){
  const tok = await authToken();
  if(!tok) throw new CloudError(typeof AUTH !== "undefined" && AUTH ? "offline" : "auth", 0);
  return sbFetch("/rest/v1/rpc/" + name, { method: "POST", body: JSON.stringify(args || {}) }, tok);
}
function rvShowEntry(){ return !!(RV.me && RV.me.ok); }
function rvAllowedCourses(){
  const me = RV.me;
  if(!me || !me.ok || typeof COURSES === "undefined") return [];
  const subs = me.subjects || [];
  const all = me.role === "owner" || subs.indexOf("*") >= 0;
  return COURSES.filter(c => all || subs.indexOf(c.code) >= 0);
}
function rvStudies(){
  if(typeof STUDIES === "undefined") return [];
  return STUDIES.filter(s => rvAllowedCourses().some(c => typeof inStudy !== "function" || inStudy(c, s.id)));
}
function rvCoursesInStudy(id){
  return rvAllowedCourses().filter(c => !id || typeof inStudy !== "function" || inStudy(c, id));
}
function rvCourseAllowed(code){ return rvAllowedCourses().some(c => c.code === code); }
function rvStudyNow(){
  const list = rvStudies();
  if(RV.study && list.some(s => s.id === RV.study)) return RV.study;
  if(RV.code && typeof COURSE === "function" && typeof studiesOf === "function"){
    const c = COURSE(RV.code), hit = c && studiesOf(c).find(id => list.some(s => s.id === id));
    if(hit) return hit;
  }
  return list.length ? list[0].id : "";
}
function rvCur(){ return (RV.items && RV.items[RV.i]) || null; }
function rvTitle(it){ return (typeof LANG !== "undefined" && LANG === "en" ? it.titleEn : it.title) || it.title; }

async function rvFetchState(items){
  const out = [];
  for(let i = 0; i < items.length; i += 400){
    const slice = items.slice(i, i + 400).map(it => ({ id: it.id, hash: it.hash }));
    const rows = await rvRpc("review_state", { p_items: slice });
    if(Array.isArray(rows)) out.push(...rows);
  }
  return out;
}
async function rvOpenCourse(code){
  RV.code = code; RV.flag = false; RV.edit = null; RV.tab = "queue";
  RV.phase = "loading";
  if(typeof render === "function" && typeof screen !== "undefined" && screen === "review") render();
  try{
    if(!rvCourseAllowed(code)){ RV.phase = "wrong-course"; return; }
    if(typeof ensureCourse === "function"){
      const ok = await ensureCourse(code);
      if(!ok){ RV.phase = "cf-fail"; return; }
    }
    const items = rvCollect(code);
    if(!items.length){ RV.items = []; RV.phase = "empty"; return; }
    rvApplyState(items, await rvFetchState(items));
    RV.items = rvSort(items);
    const i = RV.items.findIndex(rvNeeds);
    RV.i = i < 0 ? 0 : i;
    RV.phase = i < 0 ? "done" : "card";
  }catch(e){
    if(rvMissing(e)) RV.sealOff = true;
    RV.phase = rvMissing(e) ? "off" : "error";
    RV.err = rvErr(e);
  }finally{
    if(typeof render === "function" && typeof screen !== "undefined" && screen === "review") render();
  }
}
async function rvLoad(){
  try{
    if(typeof AUTH === "undefined" || !AUTH){ RV.phase = "need-login"; return; }
    if(typeof CLOUD_ON !== "undefined" && !CLOUD_ON){ RV.phase = "off"; return; }
    RV.phase = "loading";
    if(typeof render === "function" && screen === "review") render();
    const me = await rvRpc("review_me");
    RV.me = me && me.ok ? me : { ok: false };
    RV.probed = true;
    if(!RV.me.ok){ RV.phase = "denied"; return; }
    if(RV.code){ await rvOpenCourse(RV.code); return; }
    RV.phase = "pick";
  }catch(e){
    if(rvMissing(e)) RV.sealOff = true;
    RV.phase = rvMissing(e) ? "off" : (e && e.kind === "auth" ? "need-login" : "error");
    RV.err = rvErr(e);
  }finally{
    RV.loading = false;
    if(typeof render === "function" && typeof screen !== "undefined" && screen === "review") render();
  }
}
async function rvProbe(){
  if(RV.probed || typeof AUTH === "undefined" || !AUTH || (typeof CLOUD_ON !== "undefined" && !CLOUD_ON)) return;
  RV.probed = true;
  try{
    const me = await rvRpc("review_me");
    RV.me = me && me.ok ? me : { ok: false };
    if(RV.me.ok && typeof render === "function" && (screen === "profile" || screen === "settings")) render();
  }catch(e){ if(rvMissing(e)) RV.sealOff = true; RV.me = { ok: false }; }
}
function rvBoot(){ if(typeof AUTH_READY === "undefined") return; AUTH_READY.then(() => rvProbe()); }

function rvAdvance(){
  RV.flag = false; RV.edit = null; RV.busy = false;
  const n = RV.i + 1;
  if(RV.items && n < RV.items.length && rvNeeds(RV.items[n])){ RV.i = n; RV.phase = "card"; }
  else RV.phase = "done";
  if(typeof render === "function") render();
  try{ window.scrollTo(0, 0); }catch(e){}
}
async function rvApprove(){
  const it = rvCur(); if(!it || RV.busy || RV.flag) return;
  RV.busy = true; if(typeof render === "function") render();
  try{
    await rvRpc("review_submit", { p_topic: it.id, p_hash: it.hash, p_verdict: "approved", p_comment: null });
    it.mine = "approved"; it.approved = true; RV.seals[it.id + "|" + it.hash] = true;
    rvAdvance();
  }catch(e){ RV.busy = false; if(typeof toast === "function") toast(rvErr(e)); if(typeof render === "function") render(); }
}
async function rvSendFlag(text){
  const it = rvCur(); if(!it || RV.busy) return;
  if(!rvFlagOk(text)){ if(typeof toast === "function") toast(T("Skriv en kort kommentar (minst 2 tegn).", "Write a short comment (at least 2 characters).")); return; }
  RV.busy = true; if(typeof render === "function") render();
  try{
    await rvRpc("review_submit", { p_topic: it.id, p_hash: it.hash, p_verdict: "flagged", p_comment: String(text).trim() });
    it.mine = "flagged"; it.approved = false; it.flags = (it.flags || 0) + 1; RV.seals[it.id + "|" + it.hash] = false;
    rvAdvance();
  }catch(e){ RV.busy = false; if(typeof toast === "function") toast(rvErr(e)); if(typeof render === "function") render(); }
}
function rvFlagSend(){ const el = document.getElementById("rvflag"); rvSendFlag(el ? el.value : ""); }
async function rvSendSuggest(payload){
  const it = rvCur(); if(!it || !payload || RV.busy) return;
  const before = rvPlainField(it, payload.p_field);
  RV.busy = true; if(typeof render === "function") render();
  try{
    await rvRpc("review_suggest", payload);
    if(rvPlainField(it, payload.p_field) !== before) throw new Error("mutated");
    if(typeof toast === "function") toast(T("Forslaget er lagret. Det publiseres ikke.", "The suggestion is saved. It is not published."));
    rvAdvance();
  }catch(e){ RV.busy = false; if(typeof toast === "function") toast(rvErr(e)); if(typeof render === "function") render(); }
}
function rvSuggestSend(){
  const it = rvCur(); if(!it || !RV.edit) return;
  const el = document.getElementById("rvedit");
  const payload = rvSuggestionPayload(it, RV.edit.field, el ? el.value : "");
  if(!payload){ if(typeof toast === "function") toast(T("Endre teksten før du lagrer forslaget.", "Change the text before saving the suggestion.")); return; }
  rvSendSuggest(payload);
}
function rvEditOpen(field){
  const it = rvCur(); if(!it) return;
  RV.flag = false; RV.edit = { field, text: rvPlainField(it, field) }; RV.focus = "edit";
  if(typeof render === "function") render();
}
function rvMove(d){
  if(!RV.items || !RV.items.length) return;
  const n = RV.i + d; if(n < 0 || n >= RV.items.length) return;
  RV.i = n; RV.phase = "card"; RV.flag = false; RV.edit = null;
  if(typeof render === "function") render();
  try{ window.scrollTo(0, 0); }catch(e){}
}
function rvKey(e){
  const editEnter = e.key === "Enter" && e.target && e.target.id === "rvedit" && (e.metaKey || e.ctrlKey);
  if((e.ctrlKey || e.metaKey || e.altKey) && !editEnter) return false;
  const typing = e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]");
  if(typing){
    if(e.key === "Escape"){ RV.flag = false; RV.edit = null; if(typeof render === "function") render(); return true; }
    if(e.key === "Enter" && !e.shiftKey && e.target.id === "rvflag"){ e.preventDefault(); rvFlagSend(); return true; }
    if(editEnter){ e.preventDefault(); rvSuggestSend(); return true; }
    return false;
  }
  if(RV.phase !== "card" || RV.busy) return false;
  const act = rvActionForKey(e.key);
  if(!act) return false;
  e.preventDefault();
  if(act === "approve" && RV.flag) rvFlagSend();
  else if(act === "approve") rvApprove();
  else if(act === "flag"){ RV.flag = true; RV.edit = null; RV.focus = "flag"; if(typeof render === "function") render(); }
  else if(act === "edit") rvEditOpen(RV.edit ? RV.edit.field : "theory");
  else if(act === "next") rvMove(1);
  else if(act === "prev") rvMove(-1);
  return true;
}

async function rvLoadPeople(){
  RV.peopleBusy = true; RV.peopleErr = ""; if(typeof render === "function") render();
  try{ RV.people = (await rvRpc("review_people")) || []; }
  catch(e){ RV.peopleErr = rvErr(e); }
  RV.peopleBusy = false; if(typeof render === "function") render();
}
async function rvLoadLog(){
  RV.logBusy = true; RV.logErr = ""; if(typeof render === "function") render();
  try{ RV.log = (await rvRpc("review_log", { p_limit: 80 })) || []; }
  catch(e){ RV.logErr = rvErr(e); }
  RV.logBusy = false; if(typeof render === "function") render();
}
async function rvGrant(){
  const email = ((document.getElementById("rvmail") || {}).value || "").trim().toLowerCase();
  const name = ((document.getElementById("rvname") || {}).value || "").trim();
  const role = (document.getElementById("rvrole") || {}).value === "owner" ? "owner" : "reviewer";
  const active = !!((document.getElementById("rvactive") || {}).checked);
  const subjects = ((document.getElementById("rvsubs") || {}).value || "").split(/[,;\s]+/).map(s => s === "*" ? "*" : s.toUpperCase()).filter(Boolean);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toast(T("Skriv en gyldig e-post.", "Enter a valid email.")); return; }
  if(name.length < 1 || name.length > 60){ toast(T("Navnet må ha 1–60 tegn.", "The name must be 1–60 characters.")); return; }
  if(!subjects.length){ toast(T("Oppgi minst én fagkode, eller *.", "Enter at least one course code, or *.")); return; }
  RV.peopleBusy = true; if(typeof render === "function") render();
  try{
    await rvRpc("review_grant", { p_email: email, p_name: name, p_subjects: subjects, p_role: role, p_active: active });
    toast(T("Lagret.", "Saved."));
    RV.people = (await rvRpc("review_people")) || [];
  }catch(e){ toast(rvErr(e)); }
  RV.peopleBusy = false; if(typeof render === "function") render();
}
async function rvSetActive(id, on){
  RV.peopleBusy = true; if(typeof render === "function") render();
  try{ await rvRpc("review_set_active", { p_user: id, p_active: on }); RV.people = (await rvRpc("review_people")) || []; }
  catch(e){ toast(rvErr(e)); }
  RV.peopleBusy = false; if(typeof render === "function") render();
}

function rvParas(text, kind){
  const s = String(text || "").trim();
  if(!s) return "";
  if(kind === "un" && typeof richDoc === "function") return `<div class="rv-doc">${richDoc(s)}</div>`;
  return s.split(/\n{2,}/).map(p => `<p>${typeof rich === "function" ? rich(p) : esc(p)}</p>`).join("");
}
function rvChkHTML(chk){
  if(!chk || chk.state === "missing") return `<p class="rv-miss">${esc(T("Ingen kontrollsjekk (chk) på dette emnet.", "No check (chk) on this topic."))}</p>`;
  const sum = chk.state === "ok" ? T("Alle tallsjekkene stemmer.", "Every numeric check matches.")
    : chk.state === "bad" ? T("En tallsjekk stemmer ikke.", "A numeric check does not match.")
    : T("Sjekkverdier vises. De er ikke et rent talluttrykk.", "Check values are shown. They are not a plain numeric expression.");
  const rows = chk.lines.map(l => {
    const mark = l.ok === true ? "✓" : l.ok === false ? "✗" : "·";
    const cls = l.ok === true ? "ok" : l.ok === false ? "bad" : "";
    const extra = l.got != null ? " → " + l.got : "";
    return `<li class="${cls}"><span aria-hidden="true">${mark}</span><code>${esc(l.raw + extra)}</code></li>`;
  }).join("");
  return `<p class="rv-chksum ${chk.state}">${esc(sum)}</p><ul class="rv-chk">${rows}</ul>`;
}
function rvEditBtn(field, label){
  return `<button class="kbtn" data-a="rvedit" data-f="${esc(field)}">${esc(label || T("Foreslå endring", "Suggest a change"))}</button>`;
}
function rvBlock(field, title, body, kind){
  if(RV.edit && RV.edit.field === field){
    return `<section class="rv-sec"><h2>${esc(title)}</h2><label class="rv-lbl" for="rvedit">${esc(T("Forslag til ny tekst", "Suggested new text"))}</label><textarea id="rvedit" class="rv-ta" maxlength="8000">${esc(RV.edit.text)}</textarea><p class="rv-note">${esc(T("Forslaget lagres til eieren og publiseres ikke. Ctrl+Enter lagrer.", "The suggestion is saved for the owner and is not published. Ctrl+Enter saves."))}</p><div class="rv-editacts"><button class="big" data-a="rvsuggest">${esc(T("Lagre forslag", "Save suggestion"))}</button><button class="big ghost" data-a="rvcancel">${esc(T("Avbryt", "Cancel"))}</button></div></section>`;
  }
  const empty = !String(body || "").trim();
  const html = empty ? `<p class="rv-miss">${esc(title === T("Gjennomregnet eksempel", "Worked example") ? T("Ingen gjennomregnet eksempel.", "No worked example.") : T("Ingen tekst.", "No text."))}</p>` : rvParas(body, field === "theory" ? kind : "");
  return `<section class="rv-sec"><div class="rv-sh"><h2>${esc(title)}</h2>${rvEditBtn(field)}</div>${html}</section>`;
}
function rvQsHTML(item){
  const qs = item.exercises || [];
  if(!qs.length) return `<p class="rv-miss">${esc(T("Ingen oppgaver i denne enheten.", "No problems in this unit."))}</p>`;
  return `<div class="rv-qs">${qs.map(q => {
    const x = (typeof LANG !== "undefined" && LANG === "en" && q.en) ? q.en : q.nb;
    const field = "q" + q.i;
    if(RV.edit && RV.edit.field === field) return rvBlock(field, T("Oppgave", "Problem") + " " + (q.i + 1), x.p, "tp");
    return `<article class="rv-q"><div class="rv-sh"><h3>${esc(T("Oppgave", "Problem"))} ${q.i + 1}</h3>${rvEditBtn(field, T("Foreslå endring", "Suggest a change"))}</div><div>${typeof rich === "function" ? rich(x.p) : esc(x.p)}</div><div class="rv-ans"><b>${esc(T("Fasit", "Answer"))}</b>${String(x.a).split("\n").map(l => `<div>${typeof rich === "function" ? rich(l) : esc(l)}</div>`).join("")}</div>${x.e ? `<div class="rv-expl">${typeof rich === "function" ? rich(x.e) : esc(x.e)}</div>` : ""}</article>`;
  }).join("")}</div>`;
}
function rvCardHTML(){
  const it = rvCur(); if(!it) return "";
  const v = rvView(it), pr = rvProgress(RV.items), pct = pr.y ? Math.round(100 * pr.x / pr.y) : 0;
  const unit = (typeof COURSE === "function" && COURSE(it.code)) ? unitTitle(COURSE(it.code), it.unit) : "";
  const chkHead = it.chk && it.chk.state === "ok" ? T("stemmer", "matches") : it.chk && it.chk.state === "bad" ? T("avviker", "does not match") : it.chk && it.chk.state === "missing" ? T("mangler", "missing") : T("vises", "shown");
  return `<p class="rv-prog" aria-live="polite"><b>${esc(T(`${pr.x} av ${pr.y} emner godkjent`, `${pr.x} of ${pr.y} topics approved`))}</b><span class="rv-bar" aria-hidden="true"><i style="width:${pct}%"></i></span></p>
    <p class="rv-pos">${esc(T(`Emne ${RV.i + 1} av ${RV.items.length}`, `Topic ${RV.i + 1} of ${RV.items.length}`))}${unit ? " · " + esc(unit) : ""}${it.flags ? " · " + esc(T(`flagget ${it.flags} ganger`, `flagged ${it.flags} times`)) : ""}${it.mine ? " · " + esc(it.mine === "approved" ? T("du godkjente denne versjonen", "you approved this version") : T("du flagget denne versjonen", "you flagged this version")) : ""}</p>
    <article class="rv-card"><h1>${esc(rvTitle(it))}</h1>
      ${rvBlock("theory", T("Teori", "Theory"), v.theory, it.kind)}
      ${v.tip ? rvBlock("tip", T("Husk", "Remember"), v.tip, "tp") : ""}
      ${rvBlock("example", T("Gjennomregnet eksempel", "Worked example"), v.example, "tp")}
      <section class="rv-sec"><div class="rv-sh"><h2>${esc(T("Oppgaver med fasit", "Problems with answers"))}</h2></div>${rvQsHTML(it)}</section>
      <section class="rv-sec"><h2>${esc(T("Kontrollsjekk", "Check"))} · ${esc(chkHead)}</h2>${rvChkHTML(it.chk)}</section>
    </article>
    <div class="rv-foot"><div class="wrap"><p class="rv-keys"><kbd>G</kbd> ${esc(T("godkjenn", "approve"))} · <kbd>F</kbd> ${esc(T("flagg", "flag"))} · <kbd>E</kbd> ${esc(T("endre", "edit"))} · <kbd>N</kbd>/<kbd>P</kbd> ${esc(T("neste/forrige", "next/previous"))}</p>${RV.flag ? `<div class="rv-flag"><label class="rv-lbl" for="rvflag">${esc(T("Hvorfor flagges emnet? Kort kommentar kreves.", "Why flag this topic? A short comment is required."))}</label><textarea id="rvflag" class="rv-ta" maxlength="500" required>${esc(RV.comment || "")}</textarea><div class="rv-editacts"><button class="big" data-a="rvflagsend" ${RV.busy ? "disabled" : ""}>${esc(T("Send flagg", "Send flag"))}</button><button class="big ghost" data-a="rvcancel">${esc(T("Avbryt", "Cancel"))}</button></div></div>` : `<div class="rv-acts"><button class="big" data-a="rvok" ${RV.busy ? "disabled" : ""}>${esc(T("Godkjent", "Approved"))} <kbd>G</kbd></button><button class="big ghost rv-flagbtn" data-a="rvflag" ${RV.busy ? "disabled" : ""}>${esc(T("Flagg", "Flag"))} <kbd>F</kbd></button><button class="big ghost" data-a="rvedit" data-f="theory" ${RV.busy ? "disabled" : ""}>${esc(T("Foreslå endring", "Suggest a change"))} <kbd>E</kbd></button></div>`}</div></div>`;
}
function rvPickersHTML(){
  const study = rvStudyNow(), studies = rvStudies(), courses = rvCoursesInStudy(study);
  if(!studies.length) return "";
  return `<div class="rv-picks"><label class="rv-lbl">${esc(T("Nivå", "Level"))}<select id="rvstudy">${studies.map(s => `<option value="${esc(s.id)}" ${s.id === study ? "selected" : ""}>${esc(typeof studyName === "function" ? studyName(s) : s.id)}</option>`).join("")}</select></label>
    <label class="rv-lbl">${esc(T("Fag", "Subject"))}<select id="rvcourse"><option value="">${esc(T("Velg fag", "Choose subject"))}</option>${courses.map(c => `<option value="${esc(c.code)}" ${c.code === RV.code ? "selected" : ""}>${esc(courseName(c))}</option>`).join("")}</select></label></div>`;
}
function rvPeopleHTML(){
  if(RV.peopleBusy && !RV.people) return `<p class="rv-miss">${esc(T("Laster …", "Loading …"))}</p>`;
  const rows = (RV.people || []).map(p => {
    const subs = Array.isArray(p.subjects) ? p.subjects : String(p.subjects || "").replace(/[{}"]/g, "").split(",").filter(Boolean);
    const role = p.role === "owner" ? T("eier", "owner") : T("fagperson", "reviewer");
    const state = p.active ? T("aktiv", "active") : T("av", "off");
    const btn = p.role === "owner" && p.active ? "" : `<button class="kbtn" data-a="rvactive" data-id="${esc(p.user_id)}" data-on="${p.active ? "0" : "1"}">${esc(p.active ? T("Fjern tilgang", "Remove access") : T("Gi tilgang", "Grant access"))}</button>`;
    return `<li class="rv-person"><b>${esc(p.name || "")}</b> <span>${esc(p.email || "")}</span><small>${esc(role)} · ${esc(subs.join(", "))} · ${esc(state)}</small>${btn}</li>`;
  }).join("");
  return `<section class="rv-sec"><h2>${esc(T("Fagpersoner", "Reviewers"))}</h2>
    <p class="rv-note">${esc(T("Første eier settes i SQL-editoren, se supabase/gjennomgang.sql. Etter det kan du legge til og fjerne folk her. Kontoen må finnes fra før. Det lages ingen invitasjonslenke.", "The first owner is added in the SQL editor, see supabase/gjennomgang.sql. After that you can add and remove people here. The account must already exist. No invitation link is created."))}</p>
    ${RV.peopleErr ? `<p class="rv-miss">${esc(RV.peopleErr)}</p>` : `<ul class="rv-people">${rows || `<li class="rv-miss">${esc(T("Ingen fagpersoner ennå.", "No reviewers yet."))}</li>`}</ul>`}
    <h3>${esc(T("Legg til eller oppdater", "Add or update"))}</h3>
    <label class="rv-lbl">${esc(T("E-post", "Email"))}<input id="rvmail" type="email" autocomplete="off" inputmode="email"></label>
    <label class="rv-lbl">${esc(T("Navn", "Name"))}<input id="rvname" type="text" maxlength="60" autocomplete="off"></label>
    <label class="rv-lbl">${esc(T("Fagkoder", "Course codes"))}<input id="rvsubs" type="text" placeholder="${esc(T("VG1T, VG2P eller *", "VG1T, VG2P or *"))}" autocomplete="off"></label>
    <label class="rv-lbl">${esc(T("Rolle", "Role"))}<select id="rvrole"><option value="reviewer">${esc(T("Fagperson", "Reviewer"))}</option><option value="owner">${esc(T("Eier", "Owner"))}</option></select></label>
    <label class="rv-check"><input id="rvactive" type="checkbox" checked> ${esc(T("Aktiv", "Active"))}</label>
    <button class="big" data-a="rvgrant" ${RV.peopleBusy ? "disabled" : ""}>${esc(T("Lagre fagperson", "Save reviewer"))}</button></section>`;
}
function rvLogHTML(){
  if(RV.logBusy && !RV.log) return `<p class="rv-miss">${esc(T("Laster …", "Loading …"))}</p>`;
  if(RV.logErr) return `<p class="rv-miss">${esc(RV.logErr)}</p>`;
  const rows = (RV.log || []).map(r => `<li><b>${esc(r.verdict === "approved" ? T("Godkjent", "Approved") : T("Flagg", "Flag"))}</b> ${esc(r.topic_id || "")}<small>${esc(r.reviewer_name || "")} · ${esc(String(r.created_at || "").slice(0, 16))} · ${esc(r.content_hash || "")}</small>${r.comment ? `<p>${esc(r.comment)}</p>` : ""}</li>`).join("");
  return `<section class="rv-sec"><h2>${esc(T("Alle vurderinger", "All reviews"))}</h2><ul class="rv-log">${rows || `<li class="rv-miss">${esc(T("Ingen vurderinger ennå.", "No reviews yet."))}</li>`}</ul></section>`;
}
function rvHTML(){
  const back = RV.from === "profile" ? "profile" : "home";
  const owner = RV.me && RV.me.role === "owner";
  const tabs = owner ? `<div class="seg rv-tabs" role="tablist"><button role="tab" data-a="rvtab" data-t="queue" aria-selected="${RV.tab === "queue"}" class="${RV.tab === "queue" ? "on" : ""}">${esc(T("Kø", "Queue"))}</button><button role="tab" data-a="rvtab" data-t="people" aria-selected="${RV.tab === "people"}" class="${RV.tab === "people" ? "on" : ""}">${esc(T("Fagpersoner", "Reviewers"))}</button><button role="tab" data-a="rvtab" data-t="log" aria-selected="${RV.tab === "log"}" class="${RV.tab === "log" ? "on" : ""}">${esc(T("Logg", "Log"))}</button></div>` : "";
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="${back}" aria-label="${esc(T("Tilbake", "Back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Fagperson", "Reviewer"))}</small><b>${esc(T("Gjennomgang", "Review"))}</b></div></div></div>`;
  let body = "";
  if(RV.phase === "boot" || RV.phase === "loading") body = `<p class="rv-miss" role="status">${esc(T("Laster …", "Loading …"))}</p>`;
  else if(RV.phase === "need-login") body = `<section class="rv-sec"><h1>${esc(T("Logg inn for å gjennomgå", "Sign in to review"))}</h1><p>${esc(T("Siden er for fagpersoner med Axle-konto. Eieren gir tilgang. Det finnes ingen invitasjonslenke.", "This page is for reviewers with an Axle account. The owner grants access. There is no invitation link."))}</p><button class="big" data-a="aclogin">${esc(T("Logg inn", "Sign in"))}</button></section>`;
  else if(RV.phase === "off") body = `<section class="rv-sec"><h1>${esc(T("Gjennomgang er ikke slått på", "Review is not switched on"))}</h1><p>${esc(RV.err || T("Eieren må kjøre supabase/gjennomgang.sql i Supabase → SQL Editor. Resten av appen virker som før.", "The owner must run supabase/gjennomgang.sql in the Supabase SQL Editor. The rest of the app works as before."))}</p></section>`;
  else if(RV.phase === "denied") body = `<section class="rv-sec"><h1>${esc(T("Ingen tilgang", "No access"))}</h1><p>${esc(T("Du er logget inn, men er ikke fagperson. Eieren legger deg inn i databasen. Det finnes ingen invitasjonslenke.", "You are signed in, but you are not a reviewer. The owner adds you in the database. There is no invitation link."))}</p></section>`;
  else if(RV.phase === "error") body = `<section class="rv-sec"><h1>${esc(T("Noe gikk galt", "Something went wrong"))}</h1><p>${esc(RV.err || "")}</p><button class="big" data-a="rvretry">${esc(T("Prøv igjen", "Try again"))}</button></section>`;
  else {
    body = tabs + (RV.tab === "queue" ? rvPickersHTML() : "");
    if(RV.tab === "people") body += rvPeopleHTML();
    else if(RV.tab === "log") body += rvLogHTML();
    else if(RV.phase === "wrong-course") body += `<p class="rv-miss">${esc(T("Du har ikke dette faget.", "You do not have this subject."))}</p>`;
    else if(RV.phase === "cf-fail") body += `<p class="rv-miss">${esc(T("Fikk ikke hentet faget.", "Could not load the subject."))}</p><button class="big ghost" data-a="rvretry">${esc(T("Prøv igjen", "Try again"))}</button>`;
    else if(RV.phase === "empty") body += `<p class="rv-miss">${esc(T("Dette faget har ikke emner å gjennomgå.", "This subject has no topics to review."))}</p>`;
    else if(RV.phase === "pick") body += `<p class="rv-note">${esc(T("Velg nivå og fag. Køen tar ugjennomgåtte emner først, og de som er flagget flest ganger.", "Choose a level and a subject. The queue puts unreviewed topics first, then the ones flagged most often."))}</p>`;
    else if(RV.phase === "done"){
      const pr = rvProgress(RV.items);
      body += `<section class="rv-sec"><h1>${esc(T("Køen er gjennomgått", "The queue is done"))}</h1><p>${esc(T(`${pr.x} av ${pr.y} emner godkjent`, `${pr.x} of ${pr.y} topics approved`))}</p><button class="big" data-a="rvagain">${esc(T("Se emnene på nytt", "Look through the topics again"))}</button></section>`;
    } else if(RV.phase === "card") body += rvCardHTML();
  }
  return `${top}<main class="wrap rv">${body}</main>`;
}
function renderReview(){
  const want = (typeof AUTH !== "undefined" && AUTH && AUTH.uid) || "";
  if(RV.forUser !== want){ RV.forUser = want; RV.phase = "boot"; RV.loading = false; }
  if(RV.phase === "boot" && !RV.loading){ RV.loading = true; setTimeout(rvLoad, 0); }
  $app.innerHTML = rvHTML();
  const study = document.getElementById("rvstudy"), course = document.getElementById("rvcourse");
  if(study) study.addEventListener("change", () => { RV.study = study.value; const list = rvCoursesInStudy(RV.study); if(!list.some(c => c.code === RV.code)){ RV.code = ""; RV.phase = "pick"; } render(); });
  if(course) course.addEventListener("change", () => { if(course.value) rvOpenCourse(course.value); else { RV.code = ""; RV.phase = "pick"; render(); } });
  if(RV.focus === "flag"){ const el = document.getElementById("rvflag"); if(el) el.focus(); }
  if(RV.focus === "edit"){ const el = document.getElementById("rvedit"); if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }
  RV.focus = "";
}
function rvClick(a, b){
  if(a === "rvopen"){ RV.from = "profile"; screen = "review"; overlay = null; render(); window.scrollTo(0, 0); return true; }
  if(typeof screen === "undefined" || screen !== "review") return false;
  if(a === "rvok"){ rvApprove(); return true; }
  if(a === "rvflag"){ RV.flag = true; RV.edit = null; RV.focus = "flag"; render(); return true; }
  if(a === "rvflagsend"){ rvFlagSend(); return true; }
  if(a === "rvedit"){ rvEditOpen(b.dataset.f || "theory"); return true; }
  if(a === "rvsuggest"){ rvSuggestSend(); return true; }
  if(a === "rvcancel"){ RV.flag = false; RV.edit = null; render(); return true; }
  if(a === "rvagain"){ RV.i = 0; RV.phase = RV.items.length ? "card" : "empty"; RV.flag = false; RV.edit = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "rvretry"){ RV.forUser = null; RV.sealOff = false; render(); return true; }
  if(a === "rvtab"){
    RV.tab = b.dataset.t || "queue";
    if(RV.tab === "people" && !RV.people) rvLoadPeople();
    else if(RV.tab === "log" && !RV.log) rvLoadLog();
    else render();
    return true;
  }
  if(a === "rvgrant"){ rvGrant(); return true; }
  if(a === "rvactive"){ rvSetActive(b.dataset.id, b.dataset.on === "1"); return true; }
  return false;
}

async function rvSealFetch(item){
  const k = item.id + "|" + item.hash;
  if(RV.sealOff || RV.seals[k] != null || typeof sbFetch !== "function") return;
  RV.seals[k] = "wait";
  try{
    const ok = await sbFetch("/rest/v1/rpc/review_seal", { method: "POST", body: JSON.stringify({ p_id: item.id, p_hash: item.hash }) });
    RV.seals[k] = ok === true;
    if(ok === true && typeof screen !== "undefined" && screen === "book" && typeof BK !== "undefined" && BK.v === "topic" && BK.code === item.code && BK.topic === item.topicId && typeof render === "function") render();
  }catch(e){
    if(rvMissing(e)) RV.sealOff = true;
    delete RV.seals[k];
  }
}
function rvBadgeHTML(code, id){
  if((typeof CLOUD_ON !== "undefined" && !CLOUD_ON) || RV.sealOff || typeof COURSE !== "function") return "";
  let item = null;
  try{
    const c = COURSE(code), hit = typeof topicFind === "function" ? topicFind(code, id) : null;
    if(!c || !hit || !hit.tp || hit.tp.stub) return "";
    item = rvFromTopic(c, hit.u, hit.tp);
  }catch(e){ return ""; }
  const v = RV.seals[item.id + "|" + item.hash];
  if(v == null) rvSealFetch(item);
  if(v !== true) return "";
  return `<p class="rv-badge">${esc(T("Kontrollert av fagperson", "Checked by a subject expert"))}</p>`;
}
if(typeof window !== "undefined" && window.addEventListener) window.addEventListener("load", rvBoot);
