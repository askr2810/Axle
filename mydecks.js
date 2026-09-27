// ============================================================
//  MINE KORTSTOKKER – egne flashcards som kan øves, spilles (Par-jakt) og deles med en lenke.
//  Lagres i S.myDecks = [{ id, name, cards: [{ q, a }], known: { indeks: boks }, at }].
//  Deling uten server: kortstokken pakkes (komprimert JSON) inn i adressen #/kort/del/<kode>.
//  Import fra tekst: ett kort per linje, spørsmål og svar skilt med tabulator, semikolon, « - » eller «=» (som Quizlet-eksport).
// ============================================================
let MD = { view: "list" };
let MD_PENDING = null; // delingskode fra en lenke
const MD_MAX = 300;
const myDecks = () => (Array.isArray(S.myDecks) ? S.myDecks : (S.myDecks = []));
const mdFind = id => myDecks().find(d => d.id === id);
const mdKnown = d => d.cards.filter((_, i) => ((d.known || {})[i] || 0) >= 2).length;

function mdOpen(view = "list"){ MD = { view }; overlay = null; screen = "mydecks"; render(); window.scrollTo(0, 0); }
function mdNew(){ MD = { view: "edit", edit: { id: null, name: "", cards: [{ q: "", a: "" }, { q: "", a: "" }, { q: "", a: "" }] } }; screen = "mydecks"; overlay = null; render(); window.scrollTo(0, 0); }
function mdEdit(id){ const d = mdFind(id); if(!d) return; MD = { view: "edit", edit: { id: d.id, name: d.name, cards: d.cards.map(c => ({ ...c })) } }; render(); window.scrollTo(0, 0); }
function mdSave(){
  const e = MD.edit, cards = e.cards.map(c => ({ q: String(c.q || "").trim().slice(0, 400), a: String(c.a || "").trim().slice(0, 400) })).filter(c => c.q && c.a).slice(0, MD_MAX);
  const name = String(e.name || "").trim().slice(0, 60) || t("mdUntitled");
  if(cards.length < 2){ toast(t("mdNeed2")); return; }
  if(e.id){ const d = mdFind(e.id); d.name = name; d.cards = cards; d.known = {}; d.at = Date.now(); }
  else myDecks().unshift({ id: "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, cards, known: {}, at: Date.now() });
  save(); toast(t("mdSaved")); mdOpen();
}
// Tekst → kort
function mdParse(txt){
  return String(txt || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => { const m = l.split(/\t| ; |;| - | – | = |=/); return m.length >= 2 ? { q: m[0].trim(), a: m.slice(1).join(" ").trim() } : null; }).filter(c => c && c.q && c.a).slice(0, MD_MAX);
}

// ---------- øving ----------
function mdPractice(id, mode){
  const d = mdFind(id); if(!d || d.cards.length < 2) return;
  const flip = mode === "flip" || d.cards.length < 4, kn = d.known || {};
  const order = d.cards.map((c, i) => i).sort((a, b) => ((kn[a] || 0) - (kn[b] || 0)) || (Math.random() - 0.5)).slice(0, 15);
  const items = order.map(i => { const c = d.cards[i], id2 = "my:" + d.id + ":" + i;
    if(flip) return { id: id2, type: "flip", prompt: c.q, answer: c.a, expl: "" };
    const wrong = shuffle(d.cards.filter((x, j) => j !== i && x.a !== c.a).map(x => x.a)).filter((v, k, arr) => arr.indexOf(v) === k).slice(0, 3);
    return { id: id2, type: "mc", prompt: c.q, opts: shuffle([{ t: c.a, ok: true }, ...wrong.map(w => ({ t: w, ok: false }))]), expl: "" }; });
  startLesson("mydeck", S.current, shuffle(items), { title: d.name, did: d.id });
}
// Etter runden: riktig første gang flytter kortet opp en boks, feil setter det tilbake.
function mdRecord(){
  const d = mdFind(L.meta.did); if(!d) return; d.known ||= {};
  for(const id of new Set([...L.solved, ...L.firstWrong])){ const i = +String(id).split(":")[2]; if(!Number.isInteger(i)) continue; d.known[i] = L.firstWrong.has(id) ? 0 : Math.min(5, (d.known[i] || 0) + 1); }
  d.at = Date.now();
}
// Par-jakt med egne kort
function mdMatch(id){
  const d = mdFind(id); if(!d || d.cards.length < 5){ toast(t("mdNeed5")); return; }
  GM_POOL = d.cards.map((c, i) => ["my" + i, "my", c.q, c.a, [], ""]); mtOpen();
}

// ---------- deling ----------
const b64u = bytes => { let s = ""; for(let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const unb64u = s => { const b = atob(s.replace(/-/g, "+").replace(/_/g, "/")), u = new Uint8Array(b.length); for(let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
async function mdEncode(d){
  const bytes = new TextEncoder().encode(JSON.stringify({ v: 1, n: d.name, c: d.cards.map(c => [c.q, c.a]) }));
  if(typeof CompressionStream === "function"){ try{ const buf = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer(); return "z" + b64u(new Uint8Array(buf)); }catch(e){} }
  return "j" + b64u(bytes);
}
async function mdDecode(code){
  const raw = unb64u(code.slice(1)); let bytes = raw;
  if(code[0] === "z") bytes = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
  const o = JSON.parse(new TextDecoder().decode(bytes));
  if(!o || !Array.isArray(o.c)) throw new Error("bad");
  return { name: String(o.n || "").slice(0, 60) || t("mdUntitled"), cards: o.c.filter(x => Array.isArray(x) && x[0] && x[1]).slice(0, MD_MAX).map(x => ({ q: String(x[0]).slice(0, 400), a: String(x[1]).slice(0, 400) })) };
}
async function mdShare(id){
  const d = mdFind(id); if(!d) return;
  const url = location.origin + location.pathname + "#/" + rtW("mydecks") + "/del/" + await mdEncode(d);
  if(navigator.share) navigator.share({ title: d.name, text: t("mdShareText", d.name, d.cards.length), url }).catch(() => {});
  else if(navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast(t("mdCopied")), () => prompt(t("mdCopyThis"), url));
  else prompt(t("mdCopyThis"), url);
}
async function mdOpenShared(code){
  try{ const d = await mdDecode(code); if(d.cards.length < 1) throw 0; overlay = { mdimport: d }; renderOverlay(); }
  catch(e){ toast(t("mdBadLink")); }
}

// ---------- tegning ----------
function renderMyDecks(){
  if(MD_PENDING){ const c = MD_PENDING; MD_PENDING = null; MD = { view: "list" }; setTimeout(() => mdOpenShared(c), 50); }
  const top = (title, back = "mdback") => `<div class="top"><div class="wrap"><button class="iconbtn" data-a="${back}" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(t("drTitleS"))}</small><b>${esc(title)}</b></div></div></div>`;
  if(MD.view === "edit"){
    const e = MD.edit;
    $app.innerHTML = `${top(e.id ? t("mdEditTitle") : t("mdNewTitle"), "mdlist")}<main class="wrap md-ed">
      <label class="md-l">${esc(t("mdName"))}<input class="md-name" data-mdf="name" maxlength="60" value="${esc(e.name)}" placeholder="${esc(t("mdNamePh"))}"></label>
      <div class="md-cards">${e.cards.map((c, i) => `<div class="md-card"><span class="md-n">${i + 1}</span>
        <textarea data-mdf="q" data-i="${i}" rows="2" maxlength="400" placeholder="${esc(t("mdFront"))}">${esc(c.q)}</textarea>
        <textarea data-mdf="a" data-i="${i}" rows="2" maxlength="400" placeholder="${esc(t("mdBack"))}">${esc(c.a)}</textarea>
        <button class="iconbtn md-del" data-a="mdrow" data-i="${i}" aria-label="${esc(t("mdDelCard"))}">${I.x}</button></div>`).join("")}</div>
      <button class="big ghost" data-a="mdadd">＋ ${esc(t("mdAddCard"))}</button>
      <p class="picknote">${esc(t("mdMathTip"))}</p>
      <button class="big" data-a="mdsave">${esc(t("mdSave"))}</button>
      ${e.id ? `<button class="exlink md-rm" data-a="mdremove" data-id="${e.id}">${esc(MD.confirm ? t("mdDeleteSure") : t("mdDelete"))}</button>` : ""}</main>`;
    return;
  }
  if(MD.view === "import"){
    const n = mdParse(MD.txt).length;
    $app.innerHTML = `${top(t("mdImport"), "mdlist")}<main class="wrap md-ed">
      <label class="md-l">${esc(t("mdName"))}<input class="md-name" data-mdf="iname" maxlength="60" value="${esc(MD.iname || "")}" placeholder="${esc(t("mdNamePh"))}"></label>
      <p class="picknote">${esc(t("mdImportHelp"))}</p>
      <textarea class="md-paste" data-mdf="txt" rows="10" placeholder="${esc(t("mdImportPh"))}">${esc(MD.txt || "")}</textarea>
      <p class="md-count" id="mdcount">${esc(t("mdFound", n))}</p>
      <button class="big" data-a="mdimportgo">${esc(t("mdImportGo"))}</button></main>`;
    return;
  }
  const list = myDecks();
  $app.innerHTML = `${top(t("mdTitle"), "mdback")}<main class="wrap md-list">
    ${list.length ? "" : `<div class="md-empty"><span>📚</span><h2>${esc(t("mdEmptyTitle"))}</h2><p>${esc(t("mdEmptyText"))}</p></div>`}
    <div class="md-new"><button class="big" data-a="mdnew">＋ ${esc(t("mdNewTitle"))}</button><button class="big ghost" data-a="mdimportopen">${esc(t("mdImport"))}</button></div>
    ${list.map(d => { const k = mdKnown(d), n = d.cards.length;
      return `<div class="md-deck"><div class="md-dh"><b>${esc(d.name)}</b><small>${esc(t("mdCount", n))} · ${esc(t("drKnown", k, n))}</small></div>
        <div class="dr-meter"><i style="width:${n ? k / n * 100 : 0}%"></i></div>
        <div class="md-act"><button class="kbtn md-go" data-a="mdplay" data-id="${d.id}" data-m="flip">🃏 ${esc(t("drModeFlip"))}</button>${n >= 4 ? `<button class="kbtn" data-a="mdplay" data-id="${d.id}" data-m="mc">${esc(t("drModeMc"))}</button>` : ""}${n >= 5 ? `<button class="kbtn" data-a="mdmatch" data-id="${d.id}">🧩 ${esc(t("mtTitle"))}</button>` : ""}
          <span class="md-sp"></span><button class="iconbtn" data-a="mdshare" data-id="${d.id}" aria-label="${esc(t("mdShare"))}" title="${esc(t("mdShare"))}">${I.share || "⤴"}</button><button class="iconbtn" data-a="mdedit" data-id="${d.id}" aria-label="${esc(t("mdEditTitle"))}" title="${esc(t("mdEditTitle"))}">${I.pencil}</button></div></div>`; }).join("")}
    ${list.length ? `<p class="picknote">${esc(t("mdShareNote"))}</p>` : ""}</main>`;
}
function mdImportHTML(d){
  return `<div class="dialog pop" role="dialog" aria-label="${esc(t("mdImportTitle"))}"><h3>📚 ${esc(d.name)}</h3><p>${esc(t("mdImportText", d.cards.length))}</p>
    <div class="md-prev">${d.cards.slice(0, 4).map(c => `<div><b>${rich(c.q)}</b><span>${rich(c.a)}</span></div>`).join("")}${d.cards.length > 4 ? `<small>… ${esc(t("mdMore", d.cards.length - 4))}</small>` : ""}</div>
    <button class="big" data-a="mdimportsave">${esc(t("mdImportSave"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`;
}

// Tekstfeltene oppdaterer utkastet uten å tegne siden på nytt (så markøren blir stående).
document.addEventListener("input", e => {
  const el = e.target, f = el && el.dataset && el.dataset.mdf; if(!f || screen !== "mydecks") return;
  if(f === "name" && MD.edit) MD.edit.name = el.value;
  else if((f === "q" || f === "a") && MD.edit){ const c = MD.edit.cards[+el.dataset.i]; if(c) c[f] = el.value; }
  else if(f === "iname") MD.iname = el.value;
  else if(f === "txt"){ MD.txt = el.value; const n = document.getElementById("mdcount"); if(n) n.textContent = t("mdFound", mdParse(MD.txt).length); }
});
function mdClick(a, b){
  if(!a.startsWith("md")) return false;
  if(a === "mdopen"){ mdOpen(); return true; }
  if(a === "mdback"){ screen = "practice"; render(); window.scrollTo(0, 0); return true; }
  if(a === "mdlist"){ mdOpen(); return true; }
  if(a === "mdnew"){ mdNew(); return true; }
  if(a === "mdedit"){ mdEdit(b.dataset.id); return true; }
  if(a === "mdadd"){ if(MD.edit.cards.length < MD_MAX){ MD.edit.cards.push({ q: "", a: "" }); render(); const tas = document.querySelectorAll('.md-card textarea[data-mdf="q"]'); tas[tas.length - 1]?.focus(); } return true; }
  if(a === "mdrow"){ MD.edit.cards.splice(+b.dataset.i, 1); if(!MD.edit.cards.length) MD.edit.cards.push({ q: "", a: "" }); render(); return true; }
  if(a === "mdsave"){ mdSave(); return true; }
  if(a === "mdremove"){ if(!MD.confirm){ MD.confirm = true; render(); return true; } S.myDecks = myDecks().filter(d => d.id !== b.dataset.id); save(); toast(t("mdDeleted")); mdOpen(); return true; }
  if(a === "mdplay"){ if(overlay){ overlay = null; renderOverlay(); } mdPractice(b.dataset.id, b.dataset.m); return true; }
  if(a === "mdmatch"){ mdMatch(b.dataset.id); return true; }
  if(a === "mdshare"){ mdShare(b.dataset.id); return true; }
  if(a === "mdimportopen"){ MD = { view: "import", txt: "", iname: "" }; render(); return true; }
  if(a === "mdimportgo"){ const cards = mdParse(MD.txt); if(cards.length < 2){ toast(t("mdNeed2")); return true; }
    MD = { view: "edit", edit: { id: null, name: MD.iname || "", cards } }; render(); window.scrollTo(0, 0); toast(t("mdFound", cards.length)); return true; }
  if(a === "mdimportsave"){ const d = overlay && overlay.mdimport; if(d){ myDecks().unshift({ id: "d" + Date.now().toString(36), name: d.name, cards: d.cards, known: {}, at: Date.now() }); save(); overlay = null; renderOverlay(); toast(t("mdSaved")); mdOpen(); } return true; }
  return false;
}
