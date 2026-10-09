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
  try{ TC.sets = (await frRpc("lekse_mine", {})) || []; TC.setsErr = false; }catch(e){ TC.sets = []; TC.setsErr = true; }
  if(typeof grLoadList === "function"){ try{ await grLoadList(); }catch(e){} }
  if(TC && screen === "teach") render();
}
const tcSave = () => { S.tc = { tab: TC.tab, code: TC.code, units: TC.units, cid: TC.cid, n: TC.n, secs: TC.secs }; save(); };
const tcSrc = () => TC.tab === "cc" || TC.tab === "pub" ? (TC.cid ? TC.cid : null) : `AX:${TC.code}:${TC.units.join(",")}`; // egne: «LS:id» eller «CC:id»
// Antall spørsmål som finnes i utvalget (for å vise «≈ 24 oppgaver» og for å ikke be om flere enn det finnes)
function tcAvail(){ const c = COURSE(TC.code); if(TC.tab === "cc"){ const r = (TC.mine || []).find(x => x.id === TC.cid); return r ? (r.n_questions ?? r.qcount ?? null) : null; }
  const P = poolIds(c, TC.units); return P.mc.length + P.num.length + P.gen.length; }
async function tcCfg(hw){
  const src = tcSrc(); if(!src){ toast(T("Velg en quiz først.", "Pick a quiz first.")); return null; }
  const cfg = { seed: 1 + Math.floor(Math.random() * 999999999), lvl: 0, n: /^LS:|^CC:/.test(src) ? (hw ? 50 : 30) : TC.n, secs: TC.secs, src }; // egne oppgaver: alle (live-quiz maks 30)
  if(!(await mqPrep(cfg))){ toast(T("Fant ikke spørsmålene. Sjekk nettet og prøv igjen.", "Could not load the questions. Check your connection and try again.")); return null; }
  const qs = mqQs(cfg); if(qs.length < (hw ? 1 : 3)){ toast(T("For få oppgaver – en quiz trenger minst 3.", "Too few problems – a quiz needs at least 3.")); return null; }
  cfg.n = qs.length;
  if(/^LS:/.test(src) && TC.tab === "pub") frRpc("lekse_use", { p_id: src.slice(3) }).catch(() => {}); // «brukt N ganger» for den som delte
  return cfg;
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
async function tcHomework(){
  TC.busy = true; render(); const cfg = await tcCfg(true); TC.busy = false; if(!cfg){ render(); return; }
  const title = String(TC.title || "").trim(), url = location.origin + location.pathname + "#/" + hwPath(cfg, title).replace(/^lekse/, rtW("hw"));
  const it = { url, key: hwKey(cfg), title: title || mqSrcName(cfg), n: cfg.n, at: Date.now(), hw: 1 };
  (S.tcLinks ||= []).unshift(it); S.tcLinks = S.tcLinks.slice(0, 30); save(); TC.qr = url; render();
  if(navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast(T("Leksen er laget – lenken er kopiert. Del den med klassen!", "Homework created – link copied. Share it with the class!")), () => {});
  setTimeout(() => document.querySelector(".tc-share")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  if(typeof stEv === "function") stEv("teach", "hw", cfg.src.split(":")[0]);
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

// ---------- deling: fag og nivå for oppgavesett i fellesskapet ----------
const LS_SUBJ = [["matte", "Matte", "Maths"], ["norsk", "Norsk", "Norwegian"], ["engelsk", "Engelsk", "English"], ["naturfag", "Naturfag", "Science"], ["samfunn", "Samfunnsfag", "Social studies"],
  ["krle", "KRLE", "RE"], ["fysikk", "Fysikk", "Physics"], ["kjemi", "Kjemi", "Chemistry"], ["biologi", "Biologi", "Biology"], ["historie", "Historie", "History"], ["geografi", "Geografi", "Geography"],
  ["ingenior", "Ingeniørfag", "Engineering"], ["helse", "Helse", "Health"], ["okonomi", "Økonomi", "Economics"], ["forerkort", "Førerkort", "Driving"], ["sprak", "Språk", "Languages"], ["annet", "Annet", "Other"]];
const LS_LVL = [["1-4", "1.–4. trinn", "Years 1–4"], ["5-7", "5.–7. trinn", "Years 5–7"], ["8-10", "8.–10. trinn", "Years 8–10"], ["vgs", "VGS", "Upper secondary"], ["hoyere", "Høyere utdanning", "Higher education"], ["alle", "Alle nivåer", "All levels"]];
const lsName = (L2, k) => { const r = L2.find(x => x[0] === k); return r ? T(r[1], r[2]) : (k || ""); };
const lsRowSub = r => [T(`${r.n} oppgaver`, `${r.n} problems`), lsName(LS_SUBJ, r.subject), lsName(LS_LVL, r.level), r.author ? T(`av ${r.author}`, `by ${r.author}`) : "", r.uses ? T(`brukt ${r.uses} ganger`, `used ${r.uses} times`) : ""].filter(Boolean).join(" · ");
// Søk i delte oppgavesett (åpent for alle) og publiserte fellesskapsquizer (krever konto)
async function tcPubLoad(){
  if(!TC || !CLOUD_ON) return; TC.pubBusy = true; TC.pubErr = false; if(screen === "teach") render();
  const q = TC.pq || "", sub = TC.psub || "";
  try{ TC.pub = (await sbFetch("/rest/v1/rpc/lekse_search", { method: "POST", body: JSON.stringify({ p_q: q, p_subject: sub, p_level: TC.plvl || "" }) }, AUTH ? await authToken() : null)) || []; }catch(e){ TC.pub = []; TC.pubErr = true; }
  try{ TC.pubcc = AUTH && !sub ? (((await frRpc("list_community", { q, sort: "popular", p_kind: "quiz" })) || []).filter(r => !r.mine).slice(0, 20)) : []; }catch(e){ TC.pubcc = []; }
  TC.pubBusy = false; if(TC && screen === "teach") render();
}
function tcPubHTML(){
  if(TC.pub == null && !TC.pubBusy) setTimeout(tcPubLoad, 0);
  const rows = TC.pub || [], cc = TC.pubcc || [];
  return `<p class="tc-note">${esc(T("Oppgavesett som andre har laget og delt. Velg ett og bruk det i en lekse eller quiz, eller kopier det og gjør det til ditt eget.", "Problem sets others have made and shared. Pick one and use it for homework or a quiz, or copy it and make it your own."))}</p>
    <div class="fr-search">${I.search}<input type="search" id="tcpq" placeholder="${esc(T("Søk, f.eks. «brøk» eller «gloser»", "Search, e.g. \"fractions\""))}" value="${esc(TC.pq || "")}" autocomplete="off"></div>
    <div class="chips tc-psub"><button class="${!TC.psub ? "on" : ""}" data-a="tcpsub" data-k="">${esc(T("Alle fag", "All subjects"))}</button>${LS_SUBJ.map(([k]) => `<button class="${TC.psub === k ? "on" : ""}" data-a="tcpsub" data-k="${k}">${esc(lsName(LS_SUBJ, k))}</button>`).join("")}</div>
    ${TC.pubBusy ? `<p class="tc-note">${esc(T("Søker …", "Searching …"))}</p>` : TC.pubErr && !cc.length ? `<p class="tc-note">${esc(T("Deling er ikke slått på ennå (supabase/laerer.sql).", "Sharing is not enabled yet (supabase/laerer.sql)."))}</p>`
      : !rows.length && !cc.length ? `<p class="tc-note">${esc(T("Ingen treff ennå. Lag et sett selv og del det – da blir du den første!", "No hits yet. Make a set yourself and share it – then you'll be the first!"))}</p>` : ""}
    <div class="tc-mine">${rows.map(r => { const v = "LS:" + r.id; return `<div class="tc-qrow"><button class="tc-q ${TC.cid === v ? "on" : ""}" data-a="tccid" data-id="${esc(v)}"><span>📝</span><span class="tc-qt"><b>${esc(r.title)}</b><small>${esc(lsRowSub(r))}</small></span><i aria-hidden="true">${TC.cid === v ? "✓" : ""}</i></button>${AUTH ? `<button class="kbtn ghost" data-a="tcpcopy" data-id="${esc(r.id)}" title="${esc(T("Kopier og endre", "Copy and edit"))}">${esc(T("Kopier", "Copy"))}</button>` : ""}</div>`; }).join("")}
      ${cc.map(r => { const v = "CC:" + r.id; return `<button class="tc-q ${TC.cid === v ? "on" : ""}" data-a="tccid" data-id="${esc(v)}"><span>${esc(r.emoji || "📘")}</span><span class="tc-qt"><b>${esc(r.title)}</b><small>${esc([T(`${r.n_questions} spørsmål`, `${r.n_questions} questions`), r.author ? T(`av ${r.author}`, `by ${r.author}`) : "", `👍 ${r.likes || 0}`].filter(Boolean).join(" · "))}</small></span><i aria-hidden="true">${TC.cid === v ? "✓" : ""}</i></button>`; }).join("")}</div>`;
}

// ---------- tegning ----------
function renderTeach(){
  if(!TC) return tcOpen();
  const c = COURSE(TC.code), avail = tcAvail(), links = S.tcLinks || [], groups = (typeof GR !== "undefined" && GR.list) || [];
  const src = TC.tab === "pub" ? tcPubHTML() : TC.tab === "ax"
    ? `<label class="tc-f"><span>${esc(T("Fag", "Subject"))}</span><select id="tccourse">${COURSES.map(x => `<option value="${x.code}" ${x.code === c.code ? "selected" : ""}>${esc(courseName(x))}</option>`).join("")}</select></label>
       <p class="tc-l">${esc(T("Enheter (velg én eller flere)", "Units (pick one or more)"))}</p>
       <div class="chips tc-units">${c.units.map((_, u) => `<button class="${TC.units.includes(u) ? "on" : ""}" data-a="tcunit" data-u="${u}" aria-pressed="${TC.units.includes(u)}">${u + 1}. ${esc(unitTitle(c, u))}</button>`).join("")}</div>
       ${avail != null ? `<p class="tc-note">${esc(T(`${avail} oppgaver å velge fra – mange får nye tall hver gang.`, `${avail} problems to pick from – many get new numbers each time.`))}</p>` : ""}`
    : !AUTH ? `<p class="tc-note">${esc(T("Logg inn for å lage dine egne spørsmål.", "Log in to make your own questions."))}</p><button class="big" data-a="aclogin">${esc(T("Logg inn", "Log in"))}</button>`
    : `<button class="tc-go live tc-new" data-a="tcnew"><span>✏️</span><div><b>${esc(T("Lag egne oppgaver", "Make your own problems"))}</b><small>${esc(T("Skriv spørsmålet og svaret – flervalg, tallsvar eller sant/usant. Ferdig på et par minutter.", "Write the question and the answer – multiple choice, number or true/false. Done in a couple of minutes."))}</small></div></button>
       ${TC.sets == null && TC.mine == null ? `<p class="tc-note">${esc(T("Henter oppgavene dine …", "Loading your problems …"))}</p>` : ""}
       ${TC.setsErr ? `<p class="tc-note">${esc(T("Egne oppgavesett er ikke slått på ennå (supabase/laerer.sql).", "Own problem sets are not enabled yet (supabase/laerer.sql)."))}</p>` : ""}
       ${(TC.sets || []).length || (TC.mine || []).length ? `<p class="tc-l">${esc(T("Velg hvilke oppgaver leksen skal ha", "Pick the problems for the homework"))}</p><div class="tc-mine">${(TC.sets || []).map(r => { const v = "LS:" + r.id; return `<div class="tc-qrow"><button class="tc-q ${TC.cid === v ? "on" : ""}" data-a="tccid" data-id="${esc(v)}"><span>📝</span><b>${esc(r.title)}</b><small>${r.n}</small><i aria-hidden="true">${TC.cid === v ? "✓" : ""}</i></button><button class="kbtn ghost" data-a="tcsetedit" data-id="${esc(r.id)}" aria-label="${esc(T("Endre", "Edit"))}">✏️</button></div>`; }).join("")}
         ${(TC.mine || []).map(r => { const v = "CC:" + r.id; return `<button class="tc-q ${TC.cid === v ? "on" : ""}" data-a="tccid" data-id="${esc(v)}"><span>${esc(r.emoji || "📘")}</span><b>${esc(r.title)}</b><i aria-hidden="true">${TC.cid === v ? "✓" : ""}</i></button>`; }).join("")}</div>` : ""}`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="tcback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>Axle</small><b>${esc(T("Lærerverktøy", "Teacher tools"))}</b></div></div></div>
  <main class="wrap tc">
    <section class="tc-hero"><h2>${esc(T("Bruk Axle i klassen", "Use Axle in class"))}</h2><p>${esc(T("Gratis og uten reklame. Velg oppgaver, del en lekse med klassen – eller kjør en quiz på tavla – og se hvordan det gikk.", "Free and without ads. Pick problems, share homework with the class – or run a quiz on the board – and see how it went."))}</p>
      <ol class="tc-steps"><li><b>1</b>${esc(T("Velg oppgaver", "Pick problems"))}</li><li><b>2</b>${esc(T("Del leksen", "Share the homework"))}</li><li><b>3</b>${esc(T("Se resultatene", "See the results"))}</li></ol></section>
    <section class="tc-card"><h3><span>1</span>${esc(T("Oppgaver", "Problems"))}</h3>
      <div class="seg tc-tab">${[["ax", T("Fra Axle", "From Axle")], ["cc", T("Mine egne", "My own")], ["pub", T("Fellesskapet", "Community")]].map(([k, l]) => `<button class="${TC.tab === k ? "on" : ""}" data-a="tctab" data-t="${k}">${esc(l)}</button>`).join("")}</div>
      ${src}</section>
    <section class="tc-card"><h3><span>2</span>${esc(T("Innstillinger", "Settings"))}</h3>
      <div class="tc-2"><div><p class="tc-l">${esc(T("Antall oppgaver", "Problems"))}</p><div class="seg">${TC_N.map(n => `<button class="${TC.n === n ? "on" : ""}" data-a="tcn" data-n="${n}">${n}</button>`).join("")}</div></div>
        <div><p class="tc-l">${esc(T("Tid per spørsmål (bare live-quiz)", "Time per question (live quiz only)"))}</p><div class="seg">${TC_SECS.map(n => `<button class="${TC.secs === n ? "on" : ""}" data-a="tcsecs" data-n="${n}">${n} s</button>`).join("")}</div></div></div></section>
    <section class="tc-card"><h3><span>3</span>${esc(T("Del med klassen", "Share with the class"))}</h3>
      <label class="tc-f"><span>${esc(T("Navn på leksen (valgfritt)", "Name of the homework (optional)"))}</span><input id="tctitle" class="ed-in" maxlength="60" value="${esc(TC.title || "")}" placeholder="${esc(T("F.eks. «Brøk – til fredag»", "E.g. \"Fractions – for Friday\""))}"></label>
      <button class="tc-go live" data-a="tchw" ${TC.busy ? "disabled" : ""}><span>📝</span><div><b>${esc(T("Lag en lekse", "Make homework"))}</b><small>${esc(T("Elevene jobber i eget tempo – uten tidtaking, med forklaring etter hvert svar. Du ser hvem som har gjort den og hvor mange de fikk riktig.", "Students work at their own pace – no timer, with an explanation after each answer. You see who has done it and how many they got right."))}</small></div></button>
      <button class="tc-go" data-a="tclive" ${TC.busy ? "disabled" : ""}><span>⚡</span><div><b>${esc(T("Quiz på tavla (live)", "Quiz on the board (live)"))}</b><small>${esc(T("Alle svarer samtidig på mobilen, med tid og toppliste. Fint som oppstart eller avslutning av timen.", "Everyone answers at the same time on their phones, with a timer and leaderboard. Nice to start or end a lesson."))}</small></div></button>
      <button class="tc-go" data-a="tclink" ${TC.busy ? "disabled" : ""}><span>🏆</span><div><b>${esc(T("Konkurranse med lenke", "Contest with a link"))}</b><small>${esc(T("Quiz med tid og poeng som elevene tar når det passer – én felles toppliste.", "A timed quiz with points that students take when it suits them – one shared leaderboard."))}</small></div></button>
      <button class="big ghost" data-a="tctry" ${TC.busy ? "disabled" : ""}>👀 ${esc(T("Prøv quizen selv først", "Try the quiz yourself first"))}</button>
      ${!AUTH ? `<p class="tc-note">${esc(T("Live-quiz og topplister krever at du og elevene er logget inn (gratis konto).", "Live quizzes and leaderboards need you and the students to be logged in (free account)."))}</p>` : ""}</section>
    ${TC.qr ? `<section class="tc-card tc-share"><h3>🔗 ${esc(T("Send denne lenken til klassen", "Send this link to the class"))}</h3><div class="tc-qrrow"><div class="qr tc-qr" data-qr="${esc(TC.qr)}"></div><div><input class="tc-url" readonly value="${esc(TC.qr)}" aria-label="${esc(T("Lenke", "Link"))}"><button class="big" data-a="tccopy" data-u="${esc(TC.qr)}">${esc(T("Kopier lenken", "Copy the link"))}</button></div></div></section>` : ""}
    ${links.length ? `<section class="tc-card"><h3>📋 ${esc(T("Dine lekser og lenker", "Your homework and links"))}</h3>${links.map((l, i) => `<div class="tc-link"><div><b>${l.hw ? "📝 " : "🏆 "}${esc(l.title)}</b><small>${esc(new Date(l.at).toLocaleDateString(LANG === "en" ? "en-GB" : "nb-NO", { day: "numeric", month: "short" }))} · ${l.n} ${esc(T("spørsmål", "questions"))}</small></div>
        <button class="kbtn ghost" data-a="tccopy" data-u="${esc(l.url)}">${esc(T("Kopier", "Copy"))}</button><button class="kbtn ghost" data-a="tcqr" data-u="${esc(l.url)}">QR</button><button class="kbtn" data-a="tcres" data-k="${esc(l.key)}">${esc(T("Resultater", "Results"))}</button></div>
        ${TC.res && TC.res.key === l.key ? tcResHTML() : ""}`).join("")}</section>` : ""}
    <section class="tc-card"><h3>👥 ${esc(T("Klassen", "The class"))}</h3><p class="tc-note">${esc(T("Lag en gruppe for klassen: egen toppliste for uka, og elevene blir med via lenke eller QR-kode.", "Make a group for the class: its own weekly leaderboard, and students join via a link or QR code."))}</p>
      ${groups.filter(g => ["owner", "admin"].includes(grRole(g))).map(g => { const L = grInviteLink(g); return `<div class="tc-link"><div><b>${esc(g.emoji + " " + g.name)}</b><small>${esc(T("Kode", "Code"))} ${esc(frFmtCode(g.code))}</small></div><button class="kbtn ghost" data-a="tccopy" data-u="${esc(L.url)}">${esc(T("Kopier", "Copy"))}</button><button class="kbtn ghost" data-a="tcqr" data-u="${esc(L.url)}">QR</button></div>`; }).join("")}
      <button class="big ghost" data-a="tcgroup">${I.plus} ${esc(T("Lag en gruppe for klassen", "Make a group for the class"))}</button></section>
  </main>`;
  const sel = document.getElementById("tccourse"); if(sel) sel.addEventListener("change", () => { TC.code = sel.value; TC.units = [0]; tcSave(); render(); });
  const ti = document.getElementById("tctitle"); if(ti) ti.addEventListener("input", () => { TC.title = ti.value; });
  const pq = document.getElementById("tcpq"); if(pq) pq.addEventListener("input", () => { TC.pq = pq.value; clearTimeout(TC.pqT); TC.pqT = setTimeout(async () => { const pos = pq.selectionStart; await tcPubLoad(); const n = document.getElementById("tcpq"); if(n){ n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e){} } }, 350); });
  qrFill();
}
function tcResHTML(){
  const r = TC.res; if(r.err) return `<p class="tc-note">${esc(r.err)}</p>`; if(!r.rows) return `<p class="tc-note">${esc(T("Henter …", "Loading …"))}</p>`;
  if(!r.rows.length) return `<p class="tc-note">${esc(T("Ingen har tatt quizen ennå.", "Nobody has taken the quiz yet."))}</p>`;
  const avg = r.rows.reduce((a, x) => a + (x.ok || 0), 0) / r.rows.length;
  const l = (S.tcLinks || []).find(x => x.key === r.key) || {}, n = l.n || "?";
  return `<div class="tc-res"><p class="tc-note">${esc(T(`${r.rows.length} elever har levert · i snitt ${avg.toFixed(1).replace(".", ",")} av ${n} riktige`, `${r.rows.length} students have handed in · ${avg.toFixed(1)} of ${n} correct on average`))}</p>${r.rows.map(x => `<div class="mq-brow ${x.me ? "me" : ""}"><span class="mq-pos">${l.hw ? "✓" : x.pos}</span><b>${esc(x.name || "?")}</b>${l.hw ? `<span class="mq-bs">${x.ok} / ${n}</span>` : `<small>${x.ok} ✓</small><span class="mq-bs">${mqF(x.score)}</span>`}</div>`).join("")}</div>`;
}
function tcClick(a, b){
  if(a === "tcopen"){ overlay = null; renderOverlay(); tcOpen(screen); return true; }
  if(!a.startsWith("tc") || !TC) return false;
  const d = (b && b.dataset) || {};
  switch(a){
    case "tcback": screen = TC.from && TC.from !== "teach" ? TC.from : "practice"; TC = null; render(); return true;
    case "tctab": TC.tab = d.t; tcSave(); render(); return true;
    case "tcpsub": TC.psub = d.k || ""; tcPubLoad(); return true;
    case "tcpcopy": if(!AUTH){ toast(T("Logg inn for å kopiere.", "Log in to copy.")); return true; }
      frRpc("lekse_copy", { p_id: d.id }).then(id => { toast(T("Kopiert – nå er settet ditt å endre.", "Copied – the set is now yours to edit.")); teOpen(id); }).catch(e => toast(/too_many/.test(String(e && (e.msg || e.message))) ? T("Du har nådd grensen på 200 sett.", "You have reached the limit of 200 sets.") : T("Kunne ikke kopiere.", "Could not copy."))); return true;
    case "tcunit": { const u = +d.u, i = TC.units.indexOf(u); if(i >= 0){ if(TC.units.length > 1) TC.units.splice(i, 1); } else TC.units.push(u); TC.units.sort((x, y) => x - y); tcSave(); render(); return true; }
    case "tccid": TC.cid = d.id; tcSave(); render(); return true;
    case "tcn": TC.n = +d.n; tcSave(); render(); return true;
    case "tcsecs": TC.secs = +d.n; tcSave(); render(); return true;
    case "tcnew": teOpen(null); return true;
    case "tcsetedit": teOpen(d.id); return true;
    case "tclive": tcLive(); return true;
    case "tclink": tcLink(); return true;
    case "tchw": tcHomework(); return true;
    case "tctry": tcCfg().then(cfg => { if(cfg) mqOpen(mqQuizPath(cfg), "teach"); }); return true;
    case "tccopy": if(navigator.clipboard) navigator.clipboard.writeText(d.u).then(() => toast(T("Lenken er kopiert!", "Link copied!")), () => toast(d.u)); else toast(d.u); return true;
    case "tcqr": TC.qr = TC.qr === d.u ? null : d.u; render(); if(TC.qr) setTimeout(() => document.querySelector(".tc-share")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60); return true;
    case "tcres": if(TC.res && TC.res.key === d.k){ TC.res = null; render(); } else tcResults(d.k); return true;
    case "tcgroup": screen = "friends"; if(typeof FR !== "undefined") FR.view = "groups"; render(); setTimeout(() => { overlay = { grnew: { emoji: "🎓", name: "" } }; renderOverlay(); }, 50); return true;
  }
  return false;
}

// ============================================================
//  LEKSE – elevene jobber i eget tempo med vanlige oppgaver (ingen tid, forklaring etter hvert svar).
//  Lenke: #/lekse/<kilde>/<seed>.<antall>[/<tittel>]. Alle får de samme oppgavene (seed).
//  Resultatet sendes til læreren via topplisten med nøkkel q<seed>.<antall>.0.<kilde> (0 sekunder = lekse).
// ============================================================
let HW = null, HW_PENDING = null;
const hwKey = c => `q${c.seed}.${c.n}.0.${c.src}`;
const hwPath = (c, title) => "lekse/" + encodeURIComponent(c.src) + "/" + c.seed + "." + c.n + (title ? "/" + encodeURIComponent(String(title).slice(0, 60)) : "");
// Samme oppgaver hos alle: utvalget og tallene i generatorene styres av seed. Blanding av flervalg og skrive-svar.
function hwItems(c){
  const s = String(c.src);
  return mqSeeded(c.seed, () => {
    let items = [];
    if(s.startsWith("CC:")) items = shuffle(ccItems(((MQ_CC[s.slice(3)] || {}).questions || []).filter(x => x.t !== "fc")));
    else if(s.startsWith("LS:")) items = lsItems((MQ_LS[s.slice(3)] || {}).questions || []);
    else { const [, code, us] = s.split(":"), co = COURSES.find(x => x.code === code); if(!co) return [];
      const P = poolIds(co, String(us || "0").split(",").map(Number).filter(u => co.units[u]));
      for(const id of shuffle([...P.mc, ...P.num, ...P.gen])){ if(items.length >= 60) break; try{ const it = itemFromId(co, id); if(it) items.push(it); }catch(e){} } }
    return items.filter(it => String(it.prompt).length < 600).slice(0, c.n);
  });
}
function hwOpen(arg){
  const p = String(arg || "").split("/"), m = (p[1] || "").match(/^(\d{1,10})\.(\d{1,2})$/);
  if(!p[0] || !m){ screen = "home"; render(); return; }
  HW = { cfg: { src: decodeURIComponent(p[0]).slice(0, 80), seed: +m[1], n: Math.min(50, Math.max(1, +m[2])) }, title: p[2] ? decodeURIComponent(p[2]).slice(0, 60) : "", ready: false, sent: null };
  screen = "hw"; render(); mqPrep(Object.assign({ lvl: 0 }, HW.cfg)).then(ok => { if(HW){ HW.ready = ok; HW.err = !ok; if(screen === "hw") render(); } });
}
function renderHw(){
  if(!HW){ const a = HW_PENDING; HW_PENDING = null; return hwOpen(a); }
  const c = HW.cfg, name = mqSrcName(Object.assign({ lvl: 0 }, c)), cnt = HW.ready ? hwItems(c).length || c.n : c.n;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="hwback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Lekse", "Homework"))}</small><b>${esc(HW.title || name)}</b></div></div></div>
  <main class="wrap hw">
    <section class="hw-card"><span class="hw-ic" aria-hidden="true">📝</span><h2>${esc(HW.title || T("Lekse fra læreren", "Homework from your teacher"))}</h2>
      <p class="hw-src">${esc(name)}</p>
      <ul class="hw-pts"><li>✏️ ${esc(T(`${cnt} ${cnt === 1 ? "oppgave" : "oppgaver"}`, `${cnt} problem${cnt === 1 ? "" : "s"}`))}</li><li>⏳ ${esc(T("Ingen tidtaking – bruk den tiden du trenger", "No timer – take the time you need"))}</li><li>💡 ${esc(T("Du ser forklaringen etter hvert svar", "You see the explanation after each answer"))}</li></ul>
      ${HW.err ? `<p class="du-err">${esc(T("Fant ikke oppgavene. Sjekk nettet og prøv igjen.", "Could not load the problems. Check your connection and try again."))}</p>` : ""}
      <button class="big" data-a="hwstart" ${HW.ready ? "" : "disabled"}>${esc(HW.ready ? T("Start leksen", "Start the homework") : T("Henter oppgavene …", "Loading the problems …"))}</button>
      ${AUTH ? `<p class="hw-note">✓ ${esc(T(`Resultatet sendes til læreren som «${S.name || T("deg", "you")}».`, `Your result is sent to the teacher as "${S.name || "you"}".`))}</p>`
        : `<p class="hw-note">${esc(T("Logg inn hvis læreren skal se resultatet ditt.", "Log in if your teacher should see your result."))} <button class="exlink" data-a="aclogin">${esc(T("Logg inn", "Log in"))}</button></p>`}
    </section></main>`;
}
function hwStart(){
  const items = hwItems(HW.cfg); if(!items.length){ toast(T("Fant ingen oppgaver.", "No problems found.")); return; }
  const src = HW.cfg.src, code = src.startsWith("AX:") ? src.split(":")[1] : S.current;
  startLesson("homework", code, items, { hw: { key: hwKey(HW.cfg), title: HW.title, cc: !src.startsWith("AX:") }, title: HW.title || T("Lekse", "Homework") });
}
// Kalles fra finishLesson
function hwSubmit(L){
  const ok = L.total - L.firstWrong.size, hw = L.meta.hw; hw.ok = ok;
  if(hw.test){ hw.sent = "test"; return; } // læreren prøver sine egne oppgaver
  if(!AUTH || typeof frRpc !== "function"){ hw.sent = "nologin"; return; }
  hw.sent = "sending";
  frRpc("mq_submit", { p_key: hw.key, p_score: ok * 100, p_ok: ok, p_name: S.name || "", p_av: S.avatar || null })
    .then(() => { hw.sent = "ok"; }, () => { hw.sent = "err"; }).then(() => { if(screen === "done") render(); });
}
function hwDoneHTML(L){
  const hw = L.meta && L.meta.hw; if(!hw) return "";
  if(hw.sent === "test") return `<p class="hw-sent">${esc(T("Slik ser elevene oppgavene. Ingenting ble sendt.", "This is how students see the problems. Nothing was sent."))}</p>`;
  return `<p class="hw-sent ${hw.sent}">${esc(hw.sent === "ok" ? T("✓ Sendt til læreren", "✓ Sent to your teacher") : hw.sent === "sending" ? T("Sender til læreren …", "Sending to your teacher …") : hw.sent === "nologin" ? T("Ikke sendt – logg inn neste gang, så ser læreren resultatet.", "Not sent – log in next time so your teacher sees the result.") : T("Kunne ikke sende. Sjekk nettet og ta leksen igjen.", "Could not send. Check your connection and take it again."))}</p>`;
}
function hwClick(a){
  if(a === "hwback"){ HW = null; screen = "home"; render(); return true; }
  if(a === "hwstart" && HW && HW.ready){ hwStart(); return true; }
  return false;
}


// ============================================================
//  LAG EGNE OPPGAVER – så enkelt som mulig: et navn og en liste med spørsmål.
//  Hvert spørsmål: flervalg (✓ riktig + ✗ feil), tallsvar (tall + enhet) eller sant/usant, og en valgfri forklaring.
//  Lagres med lekse_save (supabase/laerer.sql). Utkastet huskes lokalt mens man skriver.
// ============================================================
let TE = null;
const teBlank = t => t === "num" ? { t: "num", q: "", n: "", u: "", tol: 0, e: "" } : t === "tf" ? { t: "tf", q: "", a: 1, e: "" } : { t: "mc", q: "", o: ["", ""], a: 0, e: "" };
async function teOpen(id){
  TE = { id: id || null, title: "", qs: [teBlank("mc")], busy: false, err: null, from: screen, pub: false, wasPub: false, subject: "annet", level: "alle" };
  if(!id && S.teDraft) Object.assign(TE, { title: S.teDraft.title || "", qs: S.teDraft.qs && S.teDraft.qs.length ? S.teDraft.qs : TE.qs, pub: !!S.teDraft.pub, subject: S.teDraft.subject || "annet", level: S.teDraft.level || "alle" });
  screen = "tcedit"; render(); window.scrollTo(0, 0);
  if(id){ TE.busy = true; render();
    try{ const r = await frRpc("lekse_get", { p_id: id }); TE.title = r.title; TE.pub = TE.wasPub = !!r.is_public; TE.subject = r.subject || "annet"; TE.level = r.level || "alle"; TE.qs = (r.questions || []).map(x => x.t === "num" ? Object.assign({ u: "", tol: 0, e: "" }, x, { n: String(x.n).replace(".", LANG === "en" ? "." : ",") }) : Object.assign({ e: "" }, x)); }
    catch(e){ TE.err = T("Kunne ikke hente oppgavene.", "Could not load the problems."); }
    TE.busy = false; if(screen === "tcedit") render(); }
}
const teDraft = () => { if(TE && !TE.id){ S.teDraft = { title: TE.title, qs: TE.qs, pub: TE.pub, subject: TE.subject, level: TE.level }; saveLocal(); } };
// Symbolmeny i oppgavebyggeren (som formelverktøyet i Word): tegn settes inn der markøren står.
// Vanlige tegn settes inn som tekst; brøk, potens og rot åpner formelvinduet med tomme bokser å fylle ut.
// Hvert tegn: [vises, navn nb, navn en, formelmal?]. Med formelmal åpnes formelvinduet med tomme bokser å fylle ut.
const TE_SYM = [
  ["often", ["Vanlige", "Common"], "★", [["+", "pluss", "plus"], ["−", "minus", "minus"], ["·", "gange", "times"], [":", "dele", "divide"], ["=", "er lik", "equals"],
    ["\\frac{a}{b}", "brøk", "fraction", "\\frac{#?}{#?}"], ["x^2", "potens", "power", "#?^{#?}"], ["\\sqrt{x}", "rot", "root", "\\sqrt{#?}"],
    ["(", "parentes", "bracket"], [")", "parentes", "bracket"], ["%", "prosent", "percent"], ["≈", "omtrent", "approx."], ["≠", "ikke lik", "not equal"], ["°", "grader", "degrees"], ["π", "pi", "pi"]]],
  ["calc", ["Regning", "Arithmetic"], "±", [["+", "pluss", "plus"], ["−", "minus", "minus"], ["·", "gange", "times"], ["×", "kryss", "cross"], [":", "dele", "divide"], ["÷", "dele", "divide"],
    ["=", "er lik", "equals"], ["≠", "ikke lik", "not equal"], ["≈", "omtrent", "approx."], ["±", "pluss/minus", "plus/minus"], ["<", "mindre", "less"], [">", "større", "greater"],
    ["≤", "mindre/lik", "less/equal"], ["≥", "større/lik", "greater/equal"], ["(", "parentes", "bracket"], [")", "parentes", "bracket"], ["[", "klamme", "bracket"], ["]", "klamme", "bracket"],
    ["%", "prosent", "percent"], ["‰", "promille", "per mille"], ["…", "osv.", "etc."]]],
  ["frac", ["Brøk og potens", "Fractions & powers"], "½", [["\\frac{a}{b}", "brøk", "fraction", "\\frac{#?}{#?}"], ["2\\tfrac{1}{2}", "blandet tall", "mixed number", "#?\\frac{#?}{#?}"],
    ["x^2", "potens", "power", "#?^{#?}"], ["x^{-1}", "minus-potens", "negative power", "#?^{-#?}"], ["\\sqrt{x}", "kvadratrot", "square root", "\\sqrt{#?}"], ["\\sqrt[3]{x}", "n-te rot", "n-th root", "\\sqrt[#?]{#?}"],
    ["10^{n}", "tierpotens", "power of ten", "#?\\cdot 10^{#?}"], ["x_n", "senket", "subscript", "#?_{#?}"], ["|x|", "tallverdi", "absolute", "\\left|#?\\right|"],
    ["½", "en halv", "half"], ["⅓", "en tredjedel", "third"], ["¼", "en kvart", "quarter"], ["¾", "tre kvart", "three quarters"], ["²", "i andre", "squared"], ["³", "i tredje", "cubed"]]],
  ["fun", ["Likninger og funksjoner", "Equations & functions"], "ƒ", [["f(x)", "funksjon", "function"], ["\\Rightarrow", "gir", "implies", "\\Rightarrow"], ["\\Leftrightarrow", "ekvivalent", "equivalent", "\\Leftrightarrow"],
    ["\\log", "logaritme", "logarithm", "\\log\\left(#?\\right)"], ["\\ln", "ln", "ln", "\\ln\\left(#?\\right)"], ["e^{x}", "e opphøyd", "e to the", "e^{#?}"], ["\\sin", "sinus", "sine", "\\sin\\left(#?\\right)"], ["\\cos", "cosinus", "cosine", "\\cos\\left(#?\\right)"], ["\\tan", "tangens", "tangent", "\\tan\\left(#?\\right)"],
    ["f'(x)", "derivert", "derivative", "#?'(#?)"], ["\\int", "integral", "integral", "\\int_{#?}^{#?} #? \\, dx"], ["\\sum", "sum", "sum", "\\sum_{#?}^{#?} #?"], ["\\lim", "grense", "limit", "\\lim_{#? \\to #?} #?"],
    ["\\vec{v}", "vektor", "vector", "\\vec{#?}"], ["\\begin{pmatrix}a\\\\b\\end{pmatrix}", "koordinater", "column", "\\begin{pmatrix}#?\\\\#?\\end{pmatrix}"], ["∞", "uendelig", "infinity"]]],
  ["geo", ["Geometri", "Geometry"], "△", [["°", "grader", "degrees"], ["π", "pi", "pi"], ["∠", "vinkel", "angle"], ["⊥", "normal på", "perpendicular"], ["∥", "parallell", "parallel"],
    ["△", "trekant", "triangle"], ["□", "firkant", "square"], ["○", "sirkel", "circle"], ["≅", "kongruent", "congruent"], ["∼", "formlik", "similar"], ["\\overline{AB}", "linjestykke", "segment", "\\overline{#?}"],
    ["cm²", "kvadrat-cm", "sq. cm"], ["m²", "kvadratmeter", "sq. metre"], ["cm³", "kubikk-cm", "cubic cm"], ["m³", "kubikkmeter", "cubic metre"]]],
  ["unit", ["Enheter", "Units"], "m", [["mm", "millimeter", "millimetre"], ["cm", "centimeter", "centimetre"], ["dm", "desimeter", "decimetre"], ["m", "meter", "metre"], ["km", "kilometer", "kilometre"],
    ["g", "gram", "gram"], ["kg", "kilo", "kilogram"], ["L", "liter", "litre"], ["dL", "desiliter", "decilitre"], ["mL", "milliliter", "millilitre"], ["kr", "kroner", "kroner"],
    ["s", "sekund", "second"], ["min", "minutt", "minute"], ["h", "time", "hour"], ["°C", "celsius", "Celsius"], ["km/h", "km i timen", "km per hour"], ["m/s", "meter/sek", "m per s"], ["m/s²", "akselerasjon", "acceleration"],
    ["N", "newton", "newton"], ["kN", "kilonewton", "kilonewton"], ["Pa", "pascal", "pascal"], ["J", "joule", "joule"], ["W", "watt", "watt"], ["kWh", "kilowattime", "kWh"], ["V", "volt", "volt"], ["A", "ampere", "ampere"], ["Ω", "ohm", "ohm"]]],
  ["set", ["Mengder og logikk", "Sets & logic"], "∈", [["∈", "er med i", "in"], ["∉", "ikke med i", "not in"], ["⊂", "delmengde", "subset"], ["∪", "union", "union"], ["∩", "snitt", "intersection"], ["∅", "tom mengde", "empty set"],
    ["ℕ", "naturlige tall", "naturals"], ["ℤ", "hele tall", "integers"], ["ℚ", "rasjonale", "rationals"], ["ℝ", "reelle tall", "reals"], ["¬", "ikke", "not"], ["∧", "og", "and"], ["∨", "eller", "or"], ["∀", "for alle", "for all"], ["∃", "finnes", "exists"]]],
  ["chem", ["Kjemi og fysikk", "Chemistry & physics"], "⚗", [["→", "gir", "yields"], ["⇌", "likevekt", "equilibrium"], ["↑", "gass", "gas"], ["↓", "felling", "precipitate"], ["Δ", "endring", "change"],
    ["₂", "senket 2", "sub 2"], ["₃", "senket 3", "sub 3"], ["₄", "senket 4", "sub 4"], ["⁺", "pluss-ion", "plus ion"], ["⁻", "minus-ion", "minus ion"], ["²⁺", "2+", "2+"], ["²⁻", "2−", "2−"],
    ["H₂O", "vann", "water"], ["CO₂", "karbondioksid", "CO₂"], ["O₂", "oksygen", "oxygen"], ["·10", "· 10 opphøyd", "· 10 to the", "\\cdot 10^{#?}"]]],
  ["abc", ["Greske bokstaver", "Greek letters"], "α", [["α", "alfa", "alpha"], ["β", "beta", "beta"], ["γ", "gamma", "gamma"], ["δ", "delta", "delta"], ["ε", "epsilon", "epsilon"], ["θ", "theta", "theta"],
    ["λ", "lambda", "lambda"], ["μ", "my", "mu"], ["ρ", "rho", "rho"], ["σ", "sigma", "sigma"], ["τ", "tau", "tau"], ["φ", "fi", "phi"], ["ω", "omega", "omega"], ["Δ", "Delta", "Delta"], ["Σ", "Sigma", "Sigma"], ["Ω", "Omega", "Omega"]]]];
function teSymHTML(){
  const tab = TE_SYM.find(x => x[0] === TE.symTab) || TE_SYM[0];
  return `<div class="te-symtabs" role="tablist" aria-label="${esc(T("Tegn og formler", "Symbols and formulas"))}">${TE_SYM.map(([k, l, ic]) => `<button type="button" role="tab" aria-selected="${tab[0] === k}" class="${tab[0] === k ? "on" : ""}" data-a="tesymtab" data-k="${k}"><i aria-hidden="true">${esc(ic)}</i>${esc(T(l[0], l[1]))}</button>`).join("")}</div>
    <div class="te-symk">${tab[3].map((it, j) => { const nm = T(it[1], it[2]);
      return `<button type="button" class="${it[3] ? "fx" : ""}" data-a="tesym" data-j="${j}" title="${esc(nm)}" aria-label="${esc(nm)}"><span class="g">${it[3] ? rich("$" + it[0] + "$") : esc(it[0])}</span><small>${esc(nm)}</small></button>`; }).join("")}
      <button type="button" class="fx free" data-a="tefx" title="${esc(T("Skriv en hel formel", "Write a whole formula"))}"><span class="g">∑</span><small>${esc(T("egen formel", "own formula"))}</small></button></div>
    <p class="te-symtip">${esc(T("Trykk der du vil ha tegnet, og så på knappen. Knapper med blå bakgrunn åpner et vindu med tomme bokser du fyller ut.", "Tap where you want the symbol, then the button. Buttons with a blue background open a window with empty boxes to fill in."))}</p>`;
}
// Siste tekstfelt læreren var i (spørsmål, svaralternativ, forklaring eller enhet)
// Smart tekstfelt (samme som i fagfolk-redigereren): formler vises tegnet som brikker, ingen $ eller \\frac å se.
const teRT = (k, i, j, val, ph, multi, cls = "") => `<div class="ed-rt te-rt ${cls}" contenteditable="true" role="textbox" spellcheck="true" data-te="${k}" data-i="${i}"${j != null ? ` data-j="${j}"` : ""} data-multi="${multi ? 1 : 0}" aria-label="${esc(ph)}" data-ph="${esc(ph)}">${edToHTML(val || "")}</div>`;
// Husk hvor markøren sto i et smart felt, så et tegn fra menyen havner der
document.addEventListener("selectionchange", () => { if(screen !== "tcedit" || !TE) return; const sel = document.getSelection(); if(!sel || !sel.rangeCount) return;
  const r = sel.getRangeAt(0), n = r.startContainer, el = (n.nodeType === 1 ? n : n.parentElement); const f = el && el.closest && el.closest(".te-rt"); if(f){ TE.fe = f; TE.rng = r.cloneRange(); } });
// Siste felt læreren var i (spørsmål, svaralternativ, forklaring eller enhet)
function teTarget(){ const el = TE.fe; if(el && document.body.contains(el)) return el; return document.querySelector(`[data-te="q"][data-i="${TE.act || 0}"]`); }
function teCaret(el){ el.focus(); const sel = document.getSelection(); let r = TE.rng && el.contains(TE.rng.startContainer) ? TE.rng : null;
  if(!r){ r = document.createRange(); r.selectNodeContents(el); r.collapse(false); } sel.removeAllRanges(); sel.addRange(r); return r; }
// Sett inn vanlig tekst (txt) eller en formel (fx = LaTeX) der markøren står
function teIns(txt, fx){
  const el = teTarget(); if(!el) return;
  if(!el.isContentEditable){ const a = el.selectionStart ?? el.value.length, b = el.selectionEnd ?? a; el.focus(); el.setRangeText(fx ? "$" + fx + "$" : txt, a, b, "end"); el.dispatchEvent(new Event("input", { bubbles: true })); return; }
  const r = teCaret(el);
  if(!fx){ document.execCommand("insertText", false, txt); }
  else { const tmp = document.createElement("span"); tmp.innerHTML = edChip(fx, false); const chip = tmp.firstChild, sp = document.createTextNode("\u00a0");
    r.deleteContents(); r.insertNode(sp); r.insertNode(chip);
    const s2 = document.getSelection(), r2 = document.createRange(); r2.setStartAfter(sp); r2.collapse(true); s2.removeAllRanges(); s2.addRange(r2); }
  TE.rng = document.getSelection().rangeCount ? document.getSelection().getRangeAt(0).cloneRange() : null; TE.fe = el;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}
function teSymMount(i){
  const bar = document.getElementById("tesym"), at = document.querySelector(`.te-q[data-qi="${i}"] .te-qq`); if(!bar || !at) return;
  if(at.nextElementSibling !== bar) at.insertAdjacentElement("afterend", bar);
}
function renderTeEdit(){
  if(!TE) return teOpen(null);
  const q = TE.qs, mc = (x, i) => `<div class="te-ans ok"><span>✓</span>${teRT("o", i, 0, x.o[0], T("Riktig svar", "Correct answer"))}</div>
      ${x.o.slice(1).map((o, j) => `<div class="te-ans bad"><span>✗</span>${teRT("o", i, j + 1, o, T("Feil svar", "Wrong answer"))}${x.o.length > 2 ? `<button class="te-x" data-a="teodel" data-i="${i}" data-j="${j + 1}" aria-label="${esc(T("Fjern", "Remove"))}">✕</button>` : ""}</div>`).join("")}
      ${x.o.length < 4 ? `<button class="te-more" data-a="teoadd" data-i="${i}">＋ ${esc(T("Feil svar", "Wrong answer"))}</button>` : ""}`;
  const num = (x, i) => `<div class="te-num"><div class="te-ans ok"><span>✓</span><input data-te="n" data-i="${i}" inputmode="decimal" value="${esc(x.n)}" placeholder="${esc(T("Svaret (tall)", "The answer (number)"))}" aria-label="${esc(T("Svaret", "The answer"))}"></div><input class="te-u" data-te="u" data-i="${i}" value="${esc(x.u || "")}" placeholder="${esc(T("enhet", "unit"))}" aria-label="${esc(T("Enhet", "Unit"))}"></div>
      <div class="chips te-tol">${[[0, T("Helt likt", "Exact")], [1, "± 1 %"], [5, "± 5 %"]].map(([v, l]) => `<button class="${(+x.tol || 0) === v ? "on" : ""}" data-a="tetol" data-i="${i}" data-v="${v}">${esc(l)}</button>`).join("")}</div>`;
  const tf = (x, i) => `<div class="chips te-tf">${[[1, T("Sant", "True")], [0, T("Usant", "False")]].map(([v, l]) => `<button class="${+x.a === v ? "on" : ""}" data-a="tetf" data-i="${i}" data-v="${v}">${+x.a === v ? "✓ " : ""}${esc(l)}</button>`).join("")}</div><p class="te-hint">${esc(T("Trykk på det som er riktig.", "Tap the one that is correct."))}</p>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="teback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Lærerverktøy", "Teacher tools"))}</small><b>${esc(TE.id ? T("Endre oppgavene", "Edit the problems") : T("Lag egne oppgaver", "Make your own problems"))}</b></div></div></div>
  <main class="wrap te">
    ${TE.busy && !q.length ? `<p class="tc-note">${esc(T("Henter …", "Loading …"))}</p>` : ""}
    <label class="te-title"><span>${esc(T("Navn", "Name"))}</span><input id="tetitle" maxlength="80" value="${esc(TE.title)}" placeholder="${esc(T("F.eks. «Brøk 6B» eller «Gloser uke 12»", "E.g. \"Fractions 6B\""))}"></label>
    ${q.map((x, i) => `<section class="te-q" data-qi="${i}">
      <div class="te-qh"><b>${i + 1}</b><div class="seg te-type">${[["mc", T("Flervalg", "Choice")], ["num", T("Tall", "Number")], ["tf", T("Sant/usant", "True/false")]].map(([k, l]) => `<button class="${x.t === k ? "on" : ""}" data-a="tetype" data-i="${i}" data-k="${k}">${esc(l)}</button>`).join("")}</div>
        <button class="te-x" data-a="teqdel" data-i="${i}" aria-label="${esc(T("Slett oppgaven", "Delete the problem"))}" ${q.length < 2 ? "disabled" : ""}>🗑</button></div>
      <div class="te-qq">${teRT("q", i, null, x.q, x.t === "tf" ? T("Skriv en påstand, f.eks. «Et kvadrat har fire like lange sider.»", "Write a statement") : T("Skriv spørsmålet, f.eks. «Hva er 3 · 4?»", "Write the question, e.g. \"What is 3 · 4?\""), true, "lg")}</div>
      ${i === (TE.act || 0) ? `<div class="te-sym" id="tesym">${teSymHTML()}</div>` : ""}
      ${x.t === "num" ? num(x, i) : x.t === "tf" ? tf(x, i) : mc(x, i)}
      ${x.e || x.showE ? teRT("e", i, null, x.e, T("Forklaring som vises etter svaret (valgfritt)", "Explanation shown after the answer (optional)"), true, "te-e") : `<button class="te-more" data-a="teeshow" data-i="${i}">＋ ${esc(T("Forklaring (valgfritt)", "Explanation (optional)"))}</button>`}
    </section>`).join("")}
    ${q.length < 50 ? `<button class="te-add" data-a="teqadd">＋ ${esc(T("Ny oppgave", "New problem"))}</button>` : ""}
    <section class="te-share"><div class="srow"><span class="lbl">${esc(T("Del med fellesskapet", "Share with the community"))}<span class="sub">${esc(T("Andre kan finne oppgavene, øve på dem, bruke dem i lekser og kopiere dem. Navnet ditt vises.", "Others can find the problems, practise them, use them for homework and copy them. Your name is shown."))}</span></span><button class="tog ${TE.pub ? "on" : ""}" data-a="tepub" role="switch" aria-checked="${!!TE.pub}" aria-label="${esc(T("Del med fellesskapet", "Share with the community"))}"></button></div>
      ${TE.pub ? `<p class="tc-l">${esc(T("Fag", "Subject"))}</p><div class="chips">${LS_SUBJ.map(([k]) => `<button class="${TE.subject === k ? "on" : ""}" data-a="tesubj" data-k="${k}">${esc(lsName(LS_SUBJ, k))}</button>`).join("")}</div>
        <p class="tc-l">${esc(T("Nivå", "Level"))}</p><div class="chips">${LS_LVL.map(([k]) => `<button class="${TE.level === k ? "on" : ""}" data-a="telvl" data-k="${k}">${esc(lsName(LS_LVL, k))}</button>`).join("")}</div>` : ""}</section>
    ${TE.err ? `<p class="du-err">${esc(TE.err)}</p>` : ""}
  </main>
  <div class="ed-savebar"><div class="wrap"><span>${esc(T(`${q.length} ${q.length === 1 ? "oppgave" : "oppgaver"}`, `${q.length} problem${q.length === 1 ? "" : "s"}`))}</span><button class="kbtn ghost" data-a="tetest">${esc(T("Prøv selv", "Try it"))}</button><button class="kbtn" data-a="tesave" ${TE.busy ? "disabled" : ""}>${esc(TE.busy ? T("Lagrer …", "Saving …") : T("Lagre", "Save"))}</button></div></div>`;
  const m = $app.querySelector("main.te");
  m.addEventListener("input", e => { const el = e.target.closest ? e.target.closest("[data-te], #tetitle") : e.target; if(!el) return; if(el.id === "tetitle"){ TE.title = el.value; teDraft(); return; }
    const k = el.dataset.te, x = TE.qs[+el.dataset.i]; if(!k || !x) return; const v = el.isContentEditable ? edVal(el) : el.value;
    if(k === "o") x.o[+el.dataset.j] = v; else x[k] = v;
    teDraft(); });
  // Smarte felt: lim inn som ren tekst, Enter gir ikke linjeskift i svaralternativer, og trykk på en formel for å endre den
  m.addEventListener("paste", e => { const el = e.target.closest && e.target.closest(".te-rt"); if(!el) return; e.preventDefault();
    let t2 = (e.clipboardData || window.clipboardData).getData("text") || ""; if(el.dataset.multi !== "1") t2 = t2.replace(/\s*\n\s*/g, " ");
    document.execCommand("insertHTML", false, edToHTML(t2)); });
  m.addEventListener("keydown", e => { const el = e.target.closest && e.target.closest(".te-rt"); if(el && e.key === "Enter" && el.dataset.multi !== "1") e.preventDefault(); });
  m.addEventListener("click", e => { const chip = e.target.closest(".te-rt .ed-mx"); if(!chip) return; const el = chip.closest(".te-rt");
    edFx({ tex: chip.dataset.tex, onOk: v => { if(!document.body.contains(chip)) return; chip.dataset.tex = v; chip.innerHTML = tex(v); el.dispatchEvent(new Event("input", { bubbles: true })); },
      onDel: () => { if(!document.body.contains(chip)) return; chip.remove(); el.dispatchEvent(new Event("input", { bubbles: true })); } }); });
  // Symbolmenyen følger feltet læreren skriver i (tallsvaret tar bare tall, så der står den stille)
  m.addEventListener("focusin", e => { const el = e.target, k = el.dataset && el.dataset.te; if(!k || k === "n") return; TE.fe = el; const i = +el.dataset.i;
    if(i !== (TE.act || 0)){ TE.act = i; teSymMount(i); } });
  m.addEventListener("mousedown", e => { if(e.target.closest("#tesym")) e.preventDefault(); });
}
function teClean(){
  const out = [], bad = i => { TE.err = T(`Oppgave ${i + 1} mangler noe.`, `Problem ${i + 1} is missing something.`); return null; };
  const long = (i, nb, en) => { TE.err = T(`Oppgave ${i + 1}: ${nb}.`, `Problem ${i + 1}: ${en}.`); return null; };
  for(const [i, x] of TE.qs.entries()){ const q = String(x.q || "").trim(); if(!q) return bad(i); if(q.length > 500) return long(i, "spørsmålet er for langt (maks 500 tegn)", "the question is too long (max 500 characters)");
    const e = String(x.e || "").trim(); if(e.length > 600) return long(i, "forklaringen er for lang (maks 600 tegn)", "the explanation is too long (max 600 characters)");
    if(x.t === "mc" && x.o.some(o => String(o || "").trim().length > 150)) return long(i, "et svaralternativ er for langt (maks 150 tegn)", "an answer option is too long (max 150 characters)");
    if(x.t === "num"){ const n = +String(x.n).replace(/\s/g, "").replace(",", ".").replace("−", "-"); if(!Number.isFinite(n) || String(x.n).trim() === "") return bad(i); out.push({ t: "num", q, n, u: String(x.u || "").trim().slice(0, 20), tol: +x.tol || 0, e }); }
    else if(x.t === "tf") out.push({ t: "tf", q, a: +x.a ? 1 : 0, e });
    else { const o = x.o.map(s => String(s || "").trim()); if(o.some(s => !s)) return bad(i); if(new Set(o).size !== o.length){ TE.err = T(`Oppgave ${i + 1} har like svar.`, `Problem ${i + 1} has identical answers.`); return null; } out.push({ t: "mc", q, o, a: 0, e }); } }
  return out;
}
async function teSave(){
  TE.err = null; const title = String(TE.title || "").trim(); if(!title){ TE.err = T("Gi oppgavene et navn.", "Give the problems a name."); render(); return; }
  const qs = teClean(); if(!qs){ render(); return; }
  if(!AUTH){ TE.err = T("Logg inn for å lagre.", "Log in to save."); render(); return; }
  TE.busy = true; render();
  try{ const id = await frRpc("lekse_save", { p_id: TE.id, p_title: title, p_questions: qs }); MQ_LS[id] = { title, questions: qs }; if(!TE.id){ S.teDraft = null; save(); }
    if(TE.pub || TE.wasPub){ try{ await frRpc("lekse_publish", { p_id: id, p_public: !!TE.pub, p_subject: TE.subject || "annet", p_level: TE.level || "alle", p_author: S.name || "" }); if(TE.pub) toast(T("Delt med fellesskapet 🎉", "Shared with the community 🎉")); }
      catch(e){ const m = String((e && (e.msg || e.message)) || ""); setTimeout(() => toast(/bad_word/.test(m) ? T("Lagret, men ikke delt: tittelen eller navnet ditt ble stoppet av ordfilteret.", "Saved, but not shared: the title or your name was stopped by the word filter.") : T("Lagret, men deling er ikke slått på ennå (supabase/laerer.sql).", "Saved, but sharing is not enabled yet (supabase/laerer.sql).")), 1800); } }
    TE = null; if(!TC) tcOpen("practice"); TC.tab = "cc"; TC.cid = "LS:" + id; tcSave(); screen = "teach"; render(); window.scrollTo(0, 0); tcLoad();
    toast(T("Lagret ✓ – nå kan du lage en lekse av dem.", "Saved ✓ – now you can make homework from them.")); }
  catch(e){ TE.busy = false; const m = String((e && (e.msg || e.message)) || ""); TE.err = /function|does not exist|schema cache/i.test(m) || (e && e.status === 404) ? T("Egne oppgavesett er ikke slått på ennå (kjør supabase/laerer.sql).", "Own problem sets are not enabled yet (run supabase/laerer.sql).") : /bad_questions/.test(m) ? T("Noen av oppgavene er for lange eller mangler svar.", "Some problems are too long or missing answers.") : T("Kunne ikke lagre. Prøv igjen.", "Could not save. Try again."); render(); }
}
function teClick(a, b){
  if(!a.startsWith("te") || !TE) return false;
  const d = (b && b.dataset) || {}, x = TE.qs[+d.i];
  switch(a){
    case "teback": if(TE.busy) return true; TE = null; screen = TC ? "teach" : "practice"; render(); return true;
    case "tetype": if(x && x.t !== d.k){ const nq = teBlank(d.k); nq.q = x.q; nq.e = x.e; TE.qs[+d.i] = nq; teDraft(); render(); } return true;
    case "teqadd": TE.qs.push(teBlank(TE.qs.length ? TE.qs[TE.qs.length - 1].t : "mc")); teDraft(); render(); setTimeout(() => { const el = document.querySelector(`[data-te="q"][data-i="${TE.qs.length - 1}"]`); if(el){ el.focus(); el.scrollIntoView({ block: "center", behavior: "smooth" }); } }, 30); return true;
    case "teqdel": if(TE.qs.length > 1 && confirm(T("Slette denne oppgaven?", "Delete this problem?"))){ TE.qs.splice(+d.i, 1); teDraft(); render(); } return true;
    case "teoadd": if(x && x.o.length < 4){ x.o.push(""); teDraft(); render(); } return true;
    case "teodel": if(x && x.o.length > 2){ x.o.splice(+d.j, 1); teDraft(); render(); } return true;
    case "tetol": if(x){ x.tol = +d.v; teDraft(); render(); } return true;
    case "tetf": if(x){ x.a = +d.v; teDraft(); render(); } return true;
    case "teeshow": if(x){ x.showE = true; render(); setTimeout(() => document.querySelector(`[data-te="e"][data-i="${d.i}"]`)?.focus(), 30); } return true;
    case "tesymtab": TE.symTab = d.k; { const bar = document.getElementById("tesym"); if(bar) bar.innerHTML = teSymHTML(); } return true;
    case "tesym": { const tab = TE_SYM.find(z => z[0] === TE.symTab) || TE_SYM[0], it = tab[3][+d.j]; if(it == null) return true;
      if(!it[3]){ teIns(it[0]); return true; }
      if(!/#\?/.test(it[3])){ teIns("", it[3]); return true; } // ferdig formel uten bokser (f.eks. ⇒): rett inn
      const el = teTarget(); if(typeof edFx === "function") edFx({ tex: "", tpl: it[3], onOk: v => { if(el && document.body.contains(el)) TE.fe = el; teIns("", v); } }); return true; }
    case "tefx": { const el = teTarget(); if(typeof edFx === "function") edFx({ tex: "", onOk: v => { if(el && document.body.contains(el)) TE.fe = el; teIns("", v); } }); return true; }
    case "tesave": teSave(); return true;
    case "tepub": TE.pub = !TE.pub; teDraft(); render(); return true;
    case "tesubj": TE.subject = d.k; teDraft(); render(); return true;
    case "telvl": TE.level = d.k; teDraft(); render(); return true;
    case "tetest": { TE.err = null; const qs = teClean(); if(!qs){ render(); return true; } const items = lsItems(qs); startLesson("homework", S.current, items, { hw: { key: "", title: TE.title || T("Prøv selv", "Try it"), cc: true, test: true }, title: TE.title || T("Prøv selv", "Try it") }); return true; }
  }
  return false;
}

// ---------- delte oppgavesett på Fellesskap-siden: øv, bruk i lekse, kopier, rapporter ----------
async function lsCommunityLoad(){
  try{ CC.ls = (await sbFetch("/rest/v1/rpc/lekse_search", { method: "POST", body: JSON.stringify({ p_q: CC.q || "", p_subject: "", p_level: "" }) }, AUTH ? await authToken() : null)) || []; }catch(e){ CC.ls = []; }
}
const lsCardHTML = r => `<button class="cc-card" data-a="lsview" data-id="${esc(r.id)}"><span class="cc-emo">📝</span>
  <span class="cc-t"><b>${esc(r.title)}</b><span>${esc(r.author || T("Anonym", "Anonymous"))}</span><small><em class="cc-kind qz">${esc(T("Oppgavesett", "Problem set"))}</em> ${esc([lsName(LS_SUBJ, r.subject), lsName(LS_LVL, r.level), T(`${r.n} oppgaver`, `${r.n} problems`)].join(" · "))}</small></span>
  <span class="cc-stats"><span>▶ ${r.uses || 0}</span></span></button>`;
function lsDetailHTML(r){
  return `<div class="dialog pop ls-dlg" role="dialog" aria-label="${esc(r.title)}"><div class="sheet-h"><h3>📝 ${esc(r.title)}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(T("Lukk", "Close"))}">${I.x}</button></div>
    <p class="tc-note">${esc(lsRowSub(r))}</p>
    <button class="big" data-a="lsplay" data-id="${esc(r.id)}">▶ ${esc(T("Øv på oppgavene", "Practise the problems"))}</button>
    <button class="big ghost" data-a="lsteach" data-id="${esc(r.id)}">🎓 ${esc(T("Bruk i en lekse eller quiz", "Use for homework or a quiz"))}</button>
    ${AUTH && !r.mine ? `<button class="big ghost" data-a="lscopy" data-id="${esc(r.id)}">📋 ${esc(T("Kopier og endre", "Copy and edit"))}</button>` : ""}
    ${AUTH && !r.mine ? `<button class="exlink ls-rep" data-a="lsrep" data-id="${esc(r.id)}">${esc(T("Rapporter (feil eller upassende innhold)", "Report (mistakes or inappropriate content)"))}</button>` : ""}</div>`;
}
function lsClick(a, b){
  if(!a.startsWith("ls")) return false; const d = (b && b.dataset) || {}, row = () => (CC.ls || []).find(x => x.id === d.id) || (overlay && overlay.lsview) || { id: d.id, title: "" };
  if(a === "lsview"){ overlay = { lsview: row() }; renderOverlay(); return true; }
  if(a === "lsplay"){ const r = row(); overlay = null; renderOverlay();
    mqPrep({ src: "LS:" + d.id, lvl: 0 }).then(ok => { const qs = ok && MQ_LS[d.id] && MQ_LS[d.id].questions; if(!qs || !qs.length){ toast(T("Fant ikke oppgavene.", "Could not find the problems.")); return; }
      startLesson("homework", S.current, shuffle(lsItems(qs)), { hw: { key: "", title: r.title || MQ_LS[d.id].title, cc: true, test: true }, title: r.title || MQ_LS[d.id].title }); }); return true; }
  if(a === "lsteach"){ overlay = null; renderOverlay(); tcOpen(screen); TC.tab = "pub"; TC.cid = "LS:" + d.id; tcSave(); render(); return true; }
  if(a === "lscopy"){ overlay = null; renderOverlay(); frRpc("lekse_copy", { p_id: d.id }).then(id => { toast(T("Kopiert – nå er settet ditt å endre.", "Copied – the set is now yours to edit.")); teOpen(id); }).catch(() => toast(T("Kunne ikke kopiere.", "Could not copy."))); return true; }
  if(a === "lsrep"){ if(!confirm(T("Rapportere dette oppgavesettet? Sett som rapporteres av flere, skjules til en moderator har sett på dem.", "Report this problem set? Sets reported by several people are hidden until a moderator has looked at them."))) return true;
    frRpc("lekse_report", { p_id: d.id, p_reason: "" }).then(() => toast(T("Takk – vi ser på det.", "Thanks – we'll take a look."))).catch(() => toast(T("Kunne ikke sende rapporten.", "Could not send the report."))); overlay = null; renderOverlay(); return true; }
  return false;
}
