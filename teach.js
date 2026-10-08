// ============================================================
//  LÆRERVERKTØY (#/laerer) – bruk Axle i klassen, gratis.
//  1. Velg spørsmål: enheter i et Axle-fag, eller dine egne (lages i Fellesskap, samme enkle redigering).
//  2. Kjør: live-quiz på tavla (elevene svarer på mobilen, toppliste etter hvert spørsmål og pall til slutt),
//     eller en lenke elevene tar når det passer (lekse/ukeskonkurranse) – med toppliste du kan følge.
//  3. Klassen: en gruppe med invitasjonslenke og QR-kode.
//  Live og lenker bruker hoderegningsmotoren (mq.js, supabase/hoderegning.sql) med cfg.src = kilden til spørsmålene.
// ============================================================
let TC = null;
const TC_N = [5, 10, 15, 20], TC_SECS = [10, 20, 30, 45];
function tcOpen(from){
  const st = S.tc || {};
  TC = { tab: st.tab || "ax", code: COURSES.some(c => c.code === st.code) ? st.code : S.current, units: st.units || [0], cid: st.cid || null, n: st.n || 10, secs: st.secs || 20,
    from: from || (screen !== "teach" ? screen : "practice"), mine: null, busy: false, err: null, qr: null, res: null };
  screen = "teach"; render(); window.scrollTo(0, 0); tcLoad();
}
async function tcLoad(){
  if(!CLOUD_ON || !AUTH) return;
  try{ TC.mine = ((await frRpc("list_community", { q: "", sort: "mine", p_kind: "all" })) || []).filter(r => !ccIsCards(r)); }catch(e){ TC.mine = []; }
  if(typeof grLoadList === "function"){ try{ await grLoadList(); }catch(e){} }
  if(TC && screen === "teach") render();
}
const tcSave = () => { S.tc = { tab: TC.tab, code: TC.code, units: TC.units, cid: TC.cid, n: TC.n, secs: TC.secs }; save(); };
const tcSrc = () => TC.tab === "cc" ? (TC.cid ? "CC:" + TC.cid : null) : `AX:${TC.code}:${TC.units.join(",")}`;
// Antall spørsmål som finnes i utvalget (for å vise «≈ 24 oppgaver» og for å ikke be om flere enn det finnes)
function tcAvail(){ const c = COURSE(TC.code); if(TC.tab === "cc"){ const r = (TC.mine || []).find(x => x.id === TC.cid); return r ? (r.n_questions ?? r.qcount ?? null) : null; }
  const P = poolIds(c, TC.units); return P.mc.length + P.num.length + P.gen.length; }
async function tcCfg(){
  const src = tcSrc(); if(!src){ toast(T("Velg en quiz først.", "Pick a quiz first.")); return null; }
  const cfg = { seed: 1 + Math.floor(Math.random() * 999999999), lvl: 0, n: TC.n, secs: TC.secs, src };
  if(!(await mqPrep(cfg))){ toast(T("Fant ikke spørsmålene. Sjekk nettet og prøv igjen.", "Could not load the questions. Check your connection and try again.")); return null; }
  const qs = mqQs(cfg); if(qs.length < 3){ toast(T("For få spørsmål – velg flere enheter.", "Too few questions – pick more units.")); return null; }
  cfg.n = qs.length; return cfg;
}
async function tcLive(){
  if(!AUTH){ toast(mqErr({ kind: "auth" })); return; }
  TC.busy = true; render(); const cfg = await tcCfg(); if(!cfg){ TC.busy = false; render(); return; }
  try{ const r = await frRpc("mq_create", { p_cfg: cfg, p_name: S.name || T("Lærer", "Teacher"), p_av: S.avatar || null });
    TC.busy = false; mqOpen(null, "teach"); MQ.cfg = cfg; MQ.view = "lobby"; mqLiveApply(r); render(); mqPoll(1000);
    if(typeof stEv === "function") stEv("teach", "live", cfg.src.split(":")[0]); }
  catch(e){ TC.busy = false; const m = mqErr(e); toast(/bad_cfg/.test(String(e && (e.msg || e.message))) ? T("Kjør supabase/hoderegning.sql på nytt for å slå på quiz.", "Run supabase/hoderegning.sql again to enable quizzes.") : m); render(); }
}
async function tcLink(){
  TC.busy = true; render(); const cfg = await tcCfg(); TC.busy = false; if(!cfg){ render(); return; }
  const url = location.origin + location.pathname + "#/" + rtW("mq") + "/" + mqQuizPath(cfg), it = { url, key: mqKey(cfg), title: mqSrcName(cfg), n: cfg.n, at: Date.now() };
  (S.tcLinks ||= []).unshift(it); S.tcLinks = S.tcLinks.slice(0, 20); save(); TC.qr = url; render();
  if(navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast(T("Lenken er kopiert – del den med klassen!", "Link copied – share it with the class!")), () => {});
  if(typeof stEv === "function") stEv("teach", "link", cfg.src.split(":")[0]);
}
async function tcResults(key){
  TC.res = { key, rows: null, err: null }; render();
  try{ TC.res.rows = (await frRpc("mq_board", { p_key: key })) || []; }catch(e){ TC.res.err = mqErr(e); }
  if(TC && screen === "teach") render();
}

// ---------- QR-kode (vendor/qrcode, MIT – lastes først når den trengs) ----------
let QR_LIB = null;
function qrLib(){ if(window.qrcode) return Promise.resolve(true);
  return QR_LIB ||= new Promise(res => { const s = document.createElement("script"); s.src = "vendor/qrcode/qrcode.js"; s.onload = () => res(!!window.qrcode); s.onerror = () => { QR_LIB = null; res(false); }; document.head.appendChild(s); }); }
// Fyll alle <div data-qr="tekst"> på siden med en QR-kode
async function qrFill(){
  const els = [...document.querySelectorAll("[data-qr]")].filter(e => !e.dataset.qrDone); if(!els.length || !(await qrLib())) return;
  for(const el of els){ try{ const q = qrcode(0, "M"); q.addData(el.dataset.qr); q.make(); el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); el.dataset.qrDone = 1; }catch(e){} }
}

// ---------- tegning ----------
function renderTeach(){
  if(!TC) return tcOpen();
  const c = COURSE(TC.code), avail = tcAvail(), links = S.tcLinks || [], groups = (typeof GR !== "undefined" && GR.list) || [];
  const src = TC.tab === "ax"
    ? `<label class="tc-f"><span>${esc(T("Fag", "Subject"))}</span><select id="tccourse">${COURSES.map(x => `<option value="${x.code}" ${x.code === c.code ? "selected" : ""}>${esc(courseName(x))}</option>`).join("")}</select></label>
       <p class="tc-l">${esc(T("Enheter (velg én eller flere)", "Units (pick one or more)"))}</p>
       <div class="chips tc-units">${c.units.map((_, u) => `<button class="${TC.units.includes(u) ? "on" : ""}" data-a="tcunit" data-u="${u}" aria-pressed="${TC.units.includes(u)}">${u + 1}. ${esc(unitTitle(c, u))}</button>`).join("")}</div>
       ${avail != null ? `<p class="tc-note">${esc(T(`${avail} oppgaver å velge fra – mange får nye tall hver gang.`, `${avail} problems to pick from – many get new numbers each time.`))}</p>` : ""}`
    : !AUTH ? `<p class="tc-note">${esc(T("Logg inn for å lage dine egne spørsmål.", "Log in to make your own questions."))}</p><button class="big" data-a="aclogin">${esc(T("Logg inn", "Log in"))}</button>`
    : `${TC.mine == null ? `<p class="tc-note">${esc(T("Henter quizene dine …", "Loading your quizzes …"))}</p>` : TC.mine.length ? `<div class="tc-mine">${TC.mine.map(r => `<button class="tc-q ${TC.cid === r.id ? "on" : ""}" data-a="tccid" data-id="${esc(r.id)}"><span>${esc(r.emoji || "📘")}</span><b>${esc(r.title)}</b><i aria-hidden="true">${TC.cid === r.id ? "✓" : ""}</i></button>`).join("")}</div>` : `<p class="tc-note">${esc(T("Du har ingen egne quizer ennå.", "You have no quizzes of your own yet."))}</p>`}
       <button class="big ghost" data-a="tcnew">${I.plus} ${esc(T("Lag nye spørsmål", "Make new questions"))}</button>
       <p class="tc-note">${esc(T("Flervalg, sant/usant og tallsvar – skriv spørsmålet og svarene, ferdig.", "Multiple choice, true/false and numeric answers – write the question and the answers, done."))}</p>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="tcback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>Axle</small><b>${esc(T("Lærerverktøy", "Teacher tools"))}</b></div></div></div>
  <main class="wrap tc">
    <section class="tc-hero"><h2>${esc(T("Bruk Axle i klassen", "Use Axle in class"))}</h2><p>${esc(T("Gratis og uten reklame. Velg spørsmål, kjør en live-quiz på tavla eller del en lenke – og se hvordan det gikk.", "Free and without ads. Pick questions, run a live quiz on the board or share a link – and see how it went."))}</p>
      <ol class="tc-steps"><li><b>1</b>${esc(T("Velg spørsmål", "Pick questions"))}</li><li><b>2</b>${esc(T("Live eller lenke", "Live or link"))}</li><li><b>3</b>${esc(T("Se resultatene", "See the results"))}</li></ol></section>
    <section class="tc-card"><h3><span>1</span>${esc(T("Spørsmål", "Questions"))}</h3>
      <div class="seg tc-tab">${[["ax", T("Fra Axle", "From Axle")], ["cc", T("Mine egne", "My own")]].map(([k, l]) => `<button class="${TC.tab === k ? "on" : ""}" data-a="tctab" data-t="${k}">${esc(l)}</button>`).join("")}</div>
      ${src}</section>
    <section class="tc-card"><h3><span>2</span>${esc(T("Innstillinger", "Settings"))}</h3>
      <div class="tc-2"><div><p class="tc-l">${esc(T("Antall spørsmål", "Questions"))}</p><div class="seg">${TC_N.map(n => `<button class="${TC.n === n ? "on" : ""}" data-a="tcn" data-n="${n}">${n}</button>`).join("")}</div></div>
        <div><p class="tc-l">${esc(T("Tid per spørsmål", "Time per question"))}</p><div class="seg">${TC_SECS.map(n => `<button class="${TC.secs === n ? "on" : ""}" data-a="tcsecs" data-n="${n}">${n} s</button>`).join("")}</div></div></div></section>
    <section class="tc-card"><h3><span>3</span>${esc(T("Kjør", "Run"))}</h3>
      <button class="tc-go live" data-a="tclive" ${TC.busy ? "disabled" : ""}><span>⚡</span><div><b>${esc(T("Live-quiz i klassen", "Live quiz in class"))}</b><small>${esc(T("Vis rommet på tavla. Elevene blir med med kode eller QR og svarer på mobilen – toppliste etter hvert spørsmål.", "Show the room on the board. Students join with a code or QR and answer on their phones – leaderboard after each question."))}</small></div></button>
      <button class="tc-go" data-a="tclink" ${TC.busy ? "disabled" : ""}><span>🔗</span><div><b>${esc(T("Lenke til lekse eller ukeskonkurranse", "Link for homework or a weekly contest"))}</b><small>${esc(T("Alle får de samme spørsmålene og tar quizen når det passer. Du ser topplisten.", "Everyone gets the same questions and takes the quiz when it suits them. You see the leaderboard."))}</small></div></button>
      <button class="big ghost" data-a="tctry" ${TC.busy ? "disabled" : ""}>👀 ${esc(T("Prøv quizen selv først", "Try the quiz yourself first"))}</button>
      ${!AUTH ? `<p class="tc-note">${esc(T("Live-quiz og topplister krever at du og elevene er logget inn (gratis konto).", "Live quizzes and leaderboards need you and the students to be logged in (free account)."))}</p>` : ""}</section>
    ${TC.qr ? `<section class="tc-card tc-share"><h3>🔗 ${esc(T("Del med klassen", "Share with the class"))}</h3><div class="tc-qrrow"><div class="qr tc-qr" data-qr="${esc(TC.qr)}"></div><div><input class="tc-url" readonly value="${esc(TC.qr)}" aria-label="${esc(T("Lenke", "Link"))}"><button class="big" data-a="tccopy" data-u="${esc(TC.qr)}">${esc(T("Kopier lenken", "Copy the link"))}</button></div></div></section>` : ""}
    ${links.length ? `<section class="tc-card"><h3>📋 ${esc(T("Dine lenker", "Your links"))}</h3>${links.map((l, i) => `<div class="tc-link"><div><b>${esc(l.title)}</b><small>${esc(new Date(l.at).toLocaleDateString(LANG === "en" ? "en-GB" : "nb-NO", { day: "numeric", month: "short" }))} · ${l.n} ${esc(T("spørsmål", "questions"))}</small></div>
        <button class="kbtn ghost" data-a="tccopy" data-u="${esc(l.url)}">${esc(T("Kopier", "Copy"))}</button><button class="kbtn ghost" data-a="tcqr" data-u="${esc(l.url)}">QR</button><button class="kbtn" data-a="tcres" data-k="${esc(l.key)}">${esc(T("Resultater", "Results"))}</button></div>
        ${TC.res && TC.res.key === l.key ? tcResHTML() : ""}`).join("")}</section>` : ""}
    <section class="tc-card"><h3>👥 ${esc(T("Klassen", "The class"))}</h3><p class="tc-note">${esc(T("Lag en gruppe for klassen: egen toppliste for uka, og elevene blir med via lenke eller QR-kode.", "Make a group for the class: its own weekly leaderboard, and students join via a link or QR code."))}</p>
      ${groups.filter(g => ["owner", "admin"].includes(grRole(g))).map(g => { const L = grInviteLink(g); return `<div class="tc-link"><div><b>${esc(g.emoji + " " + g.name)}</b><small>${esc(T("Kode", "Code"))} ${esc(frFmtCode(g.code))}</small></div><button class="kbtn ghost" data-a="tccopy" data-u="${esc(L.url)}">${esc(T("Kopier", "Copy"))}</button><button class="kbtn ghost" data-a="tcqr" data-u="${esc(L.url)}">QR</button></div>`; }).join("")}
      <button class="big ghost" data-a="tcgroup">${I.plus} ${esc(T("Lag en gruppe for klassen", "Make a group for the class"))}</button></section>
  </main>`;
  const sel = document.getElementById("tccourse"); if(sel) sel.addEventListener("change", () => { TC.code = sel.value; TC.units = [0]; tcSave(); render(); });
  qrFill();
}
function tcResHTML(){
  const r = TC.res; if(r.err) return `<p class="tc-note">${esc(r.err)}</p>`; if(!r.rows) return `<p class="tc-note">${esc(T("Henter …", "Loading …"))}</p>`;
  if(!r.rows.length) return `<p class="tc-note">${esc(T("Ingen har tatt quizen ennå.", "Nobody has taken the quiz yet."))}</p>`;
  const avg = r.rows.reduce((a, x) => a + (x.ok || 0), 0) / r.rows.length;
  return `<div class="tc-res"><p class="tc-note">${esc(T(`${r.rows.length} elever · i snitt ${avg.toFixed(1).replace(".", ",")} riktige`, `${r.rows.length} students · ${avg.toFixed(1)} correct on average`))}</p>${r.rows.map(x => `<div class="mq-brow ${x.me ? "me" : ""}"><span class="mq-pos">${x.pos}</span><b>${esc(x.name || "?")}</b><small>${x.ok} ✓</small><span class="mq-bs">${mqF(x.score)}</span></div>`).join("")}</div>`;
}
function tcClick(a, b){
  if(a === "tcopen"){ overlay = null; renderOverlay(); tcOpen(screen); return true; }
  if(!a.startsWith("tc") || !TC) return false;
  const d = (b && b.dataset) || {};
  switch(a){
    case "tcback": screen = TC.from && TC.from !== "teach" ? TC.from : "practice"; TC = null; render(); return true;
    case "tctab": TC.tab = d.t; tcSave(); render(); return true;
    case "tcunit": { const u = +d.u, i = TC.units.indexOf(u); if(i >= 0){ if(TC.units.length > 1) TC.units.splice(i, 1); } else TC.units.push(u); TC.units.sort((x, y) => x - y); tcSave(); render(); return true; }
    case "tccid": TC.cid = d.id; tcSave(); render(); return true;
    case "tcn": TC.n = +d.n; tcSave(); render(); return true;
    case "tcsecs": TC.secs = +d.n; tcSave(); render(); return true;
    case "tcnew": if(typeof ccEditOpen === "function"){ screen = "community"; ccEditOpen(null); } return true;
    case "tclive": tcLive(); return true;
    case "tclink": tcLink(); return true;
    case "tctry": tcCfg().then(cfg => { if(cfg) mqOpen(mqQuizPath(cfg), "teach"); }); return true;
    case "tccopy": if(navigator.clipboard) navigator.clipboard.writeText(d.u).then(() => toast(T("Lenken er kopiert!", "Link copied!")), () => toast(d.u)); else toast(d.u); return true;
    case "tcqr": TC.qr = TC.qr === d.u ? null : d.u; render(); if(TC.qr) setTimeout(() => document.querySelector(".tc-share")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60); return true;
    case "tcres": if(TC.res && TC.res.key === d.k){ TC.res = null; render(); } else tcResults(d.k); return true;
    case "tcgroup": screen = "friends"; if(typeof FR !== "undefined") FR.view = "groups"; render(); setTimeout(() => { overlay = { grnew: { emoji: "🎓", name: "" } }; renderOverlay(); }, 50); return true;
  }
  return false;
}
