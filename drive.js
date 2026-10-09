// ============================================================
//  FØRERKORT – eget oppsett for studiet «forer» (fag FKB og FKMC fra add_forer.js), inspirert av teoriprøven:
//  • Forsiden: sjanse for å bestå, start teoriprøve, øv, teori, skilt, feil, og «Hvor ligger du an» per kategori.
//  • Øving: 10 spørsmål med svar og forklaring med en gang (per kategori, blandet, feil eller skilt).
//  • Teoriprøve: 45 spørsmål, 90 minutter, høyst 7 feil. Hopp fritt, marker spørsmål, lever, se resultat og alle svar.
//  • Skilt: oversikt over skilt, lys og oppmerking.
//  • Trafikksituasjoner: animerte kryss (drive_scenes.js).
//  Statistikk per spørsmål i S.drive[kode].st («enhet:indeks» → [sett, riktige, sist riktig]); prøver i S.drive[kode].tests.
//  En pågående prøve ligger i S.driveRun, så den overlever at appen lukkes.
// ============================================================
let DV = null; // { view: "practice"|"test"|"result"|"signs"|"cats", … }
const DV_N = 10, DV_TEST_N = 45, DV_TEST_MIN = 90, DV_MAX_WRONG = 7;
const isDrive = c => !!c && c.group === "Førerkort";
const dvData = code => { S.drive ||= {}; return S.drive[code] ||= { st: {}, tests: [] }; };
// Spørsmålet på gjeldende språk: { q, opts (første er riktig), expl, img }.
function dvQ(code, qid){
  const [u, i] = qid.split(":").map(Number), c = COURSE(code), unit = c.units[u]; if(!unit || !unit.qs[i]) return null;
  const nb = unit.qs[i], en = LANG === "en" && ((ENQ[code] || [])[u] || [])[i];
  const src = unit.shared ? unit.shared + ":" + unit.sharedU : code + ":" + u;
  return { q: en ? en[0] : nb[0], opts: (en && en[1]) || nb[1], expl: en ? en[2] : nb[2], img: DRIVE_IMG[src + ":" + i] || null, u, i };
}
const dvCats = c => c.units.map((u, i) => i);
const dvAllIds = (c, u) => (u == null ? dvCats(c) : [u]).flatMap(k => c.units[k].qs.map((_, i) => k + ":" + i));
// Kategoristatistikk: [riktige, besvarte, antall spørsmål, sett]
function dvCatStat(code, u){
  const d = dvData(code), c = COURSE(code); let ok = 0, n = 0, seen = 0;
  c.units[u].qs.forEach((_, i) => { const s = d.st[u + ":" + i]; if(s){ ok += s[1]; n += s[0]; seen++; } });
  return [ok, n, c.units[u].qs.length, seen];
}
// Sannsynlighet for riktig per kategori (glattet), og sjansen for å bestå prøven (eksakt fordeling av antall feil).
function dvReady(code){
  const c = COURSE(code), plan = DRIVE_TEST[code] || [], d = dvData(code);
  let answered = 0; const ps = [];
  c.units.forEach((_, u) => { const [ok, n] = dvCatStat(code, u); answered += n; const p = (ok + 1.5) / (n + 3); for(let k = 0; k < (plan[u] || 0); k++) ps.push(p); });
  let dist = [1]; for(const p of ps){ const nx = new Array(dist.length + 1).fill(0); dist.forEach((w, k) => { nx[k] += w * p; nx[k + 1] += w * (1 - p); }); dist = nx; } // dist[k] = P(k feil)
  const pass = dist.slice(0, DV_MAX_WRONG + 1).reduce((a, b) => a + b, 0), expect = ps.reduce((a, b) => a + b, 0);
  const last = d.tests.slice(-5), testPass = last.length ? last.filter(x => x.pass).length / last.length : null;
  return { pass, expect, answered, enough: answered >= 40 || d.tests.length > 0, testPass };
}
// Velg spørsmål til en øverunde: usette og feil først, så resten.
function dvPickPractice(code, ids, n = DV_N){
  const d = dvData(code), score = id => { const s = d.st[id]; return !s ? 0 : s[2] ? 2 + s[1] / Math.max(1, s[0]) : 1; };
  return shuffle(ids).sort((a, b) => score(a) - score(b) + (Math.random() - 0.5) * 0.6).slice(0, n);
}
const dvWrongIds = code => { const d = dvData(code); return Object.keys(d.st).filter(id => d.st[id][2] === 0 && dvQ(code, id)); };
const dvSignIds = code => dvAllIds(COURSE(code)).filter(id => { const q = dvQ(code, id); return q && q.img; });
function dvMakeItem(code, qid){ const q = dvQ(code, qid); return { qid, order: shuffle(q.opts.map((_, k) => k)) }; }
function dvRecord(code, qid, ok){ const d = dvData(code), s = d.st[qid] ||= [0, 0, 0]; s[0]++; if(ok) s[1]++; s[2] = ok ? 1 : 0; }

// ---------- øving ----------
function dvPractice(kind, u){
  const c = COURSE(S.current), code = c.code;
  const ids = kind === "wrong" ? dvWrongIds(code) : kind === "signs" ? dvSignIds(code) : dvAllIds(c, kind === "cat" ? u : null);
  if(!ids.length){ toast(T("Ingen spørsmål her ennå.", "No questions here yet.")); return; }
  const pick = dvPickPractice(code, ids, Math.min(DV_N, ids.length));
  DV = { view: "practice", kind, u, code, items: pick.map(id => dvMakeItem(code, id)), i: 0, ans: null, ok: 0, combo: 0 };
  screen = "drive"; overlay = null; render(); window.scrollTo(0, 0);
}
function dvAnswer(k){
  const it = DV.items[DV.i]; if(DV.ans != null) return;
  const ok = it.order[k] === 0; DV.ans = k; it.pick = k; it.ok = ok;
  dvRecord(DV.code, it.qid, ok); if(ok){ DV.ok++; DV.combo++; sfx("ok", DV.combo); buzz(true); awardXP(1); } else { DV.combo = 0; sfx("bad"); buzz(false); }
  save(); render();
  if(ok) burst(document.querySelector(".dv-opt.ok"), 8);
}
function dvNext(){
  if(DV.i + 1 < DV.items.length){ DV.i++; DV.ans = null; render(); window.scrollTo(0, 0); return; }
  DV.view = "done"; const st = awardXP(3); S.stats ||= {}; S.stats.lessons = (+S.stats.lessons || 0) + 1; bdgToast(checkBadges()); save(); render(); window.scrollTo(0, 0);
  setTimeout(() => DV && DV.ok === DV.items.length ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}

// ---------- teoriprøve ----------
// Gratis prøve: 10 spørsmål på 15 minutter, med skilt og spørsmål fra flere kategorier. Lagres ikke i prøvehistorikken.
const DV_MINI_N = 10, DV_MINI_MIN = 15;
function dvMiniStart(){
  const c = COURSE(S.current), code = c.code, signs = shuffle(dvSignIds(code)).slice(0, 3);
  const cats = shuffle(dvCats(c)), rest = [];
  for(const u of cats){ if(rest.length >= DV_MINI_N - signs.length) break; const id = shuffle(dvAllIds(c, u)).find(x => !signs.includes(x) && !dvQ(code, x).img); if(id) rest.push(id); }
  const ids = shuffle([...signs, ...rest]).slice(0, DV_MINI_N);
  S.driveRun = { code, mini: 1, items: ids.map(id => dvMakeItem(code, id)), ans: {}, flag: {}, i: 0, t0: Date.now(), end: Date.now() + DV_MINI_MIN * 60000 };
  save(); DV = { view: "test" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); dvTick();
}
function dvTestStart(){
  const c = COURSE(S.current), code = c.code, plan = DRIVE_TEST[code] || c.units.map(() => Math.ceil(DV_TEST_N / c.units.length));
  let ids = []; c.units.forEach((_, u) => { ids.push(...shuffle(dvAllIds(c, u)).slice(0, plan[u] || 0)); });
  if(ids.length < DV_TEST_N){ const rest = shuffle(dvAllIds(c).filter(x => !ids.includes(x))); ids.push(...rest.slice(0, DV_TEST_N - ids.length)); }
  ids = shuffle(ids.slice(0, DV_TEST_N));
  S.driveRun = { code, items: ids.map(id => dvMakeItem(code, id)), ans: {}, flag: {}, i: 0, t0: Date.now(), end: Date.now() + DV_TEST_MIN * 60000 };
  save(); DV = { view: "test" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); dvTick();
}
function dvTick(){
  clearInterval(dvTick.t);
  dvTick.t = setInterval(() => {
    const r = S.driveRun; if(!r){ clearInterval(dvTick.t); return; }
    if(Date.now() >= r.end){ clearInterval(dvTick.t); dvSubmit(true); return; }
    const el = document.getElementById("dvclock"); if(el) el.textContent = dvClock(r.end - Date.now());
  }, 1000);
}
const dvClock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function dvSubmit(timeUp){
  const r = S.driveRun; if(!r) return;
  clearInterval(dvTick.t);
  const c = COURSE(r.code), per = {}; let ok = 0;
  r.items.forEach((it, k) => { const a = r.ans[k], right = a != null && it.order[a] === 0; if(right) ok++;
    const u = +it.qid.split(":")[0]; (per[u] ||= [0, 0]); per[u][1]++; if(right) per[u][0]++; dvRecord(r.code, it.qid, right); });
  const wrong = r.items.length - ok, res = { at: Date.now(), ok, n: r.items.length, pass: r.mini ? wrong <= 1 : wrong <= DV_MAX_WRONG, mini: !!r.mini, time: Math.round((Math.min(Date.now(), r.end) - r.t0) / 1000), per, items: r.items, ans: r.ans, timeUp: !!timeUp };
  const d = dvData(r.code);
  if(r.mini){ d.minis = (d.minis || 0) + 1; S.driveRun = null; awardXP(3 + ok); S.stats ||= {}; S.stats.exams = (+S.stats.exams || 0) + 1; bdgToast(checkBadges()); save();
    DV = { view: "result", code: r.code, res, show: "wrong" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); setTimeout(() => res.pass ? confetti("level") : sfx("complete"), 300); quizAccountAsk(ok, res.n); return; }
  d.tests.push(res); while(d.tests.length > 20) d.tests.shift();
  S.driveRun = null; const st = awardXP(5 + Math.round(ok / 5)); S.stats ||= {}; S.stats.exams = (+S.stats.exams || 0) + 1; bdgToast(checkBadges()); save();
  DV = { view: "result", code: r.code, ti: d.tests.length - 1, show: "wrong" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0);
  setTimeout(() => res.pass ? confetti("level") : sfx("complete"), 250); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
  void c;
}

// ---------- tegning ----------
const dvTop = (title, small, right) => `<div class="top"><div class="wrap"><button class="iconbtn" data-a="dvclose" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(small)}</small><b>${esc(title)}</b></div>${right || ""}</div></div>`;
const dvCatName = (c, u) => unitTitle(c, u);
function dvQuestionHTML(q, it, state){ // state: { picked, reveal, locked }
  const letters = "ABCD";
  return `<div class="dv-q">${q.img ? `<div class="dv-img">${fkSign(q.img, 150)}</div>` : ""}<p class="dv-qt">${rich(q.q)}</p></div>
    <div class="dv-opts">${it.order.map((k, j) => { const right = k === 0, picked = state.picked === j;
      const cls = state.reveal ? (right ? "ok" : picked ? "bad" : "dim") : picked ? "sel" : "";
      return `<button class="dv-opt ${cls}" data-a="${state.act}" data-i="${j}" ${state.locked ? "disabled" : ""}><i>${letters[j]}</i><span>${rich(q.opts[k])}</span></button>`; }).join("")}</div>`;
}
function renderDrive(){
  if(!DV){ if(S.driveRun){ DV = { view: "test" }; dvTick(); } else { goHome(); return; } }
  const v = DV.view;
  if(v === "practice" || v === "done") return dvRenderPractice();
  if(v === "test") return dvRenderTest();
  if(v === "result") return dvRenderResult();
  if(v === "signs") return dvRenderSigns();
  if(v === "scene") return renderScene();
  if(v === "game") return sgRender();
  goHome();
}
function dvRenderPractice(){
  const c = COURSE(DV.code), title = DV.kind === "cat" ? dvCatName(c, DV.u) : DV.kind === "wrong" ? T("Spørsmål du har hatt feil", "Questions you got wrong") : DV.kind === "signs" ? T("Skilt og lys", "Signs and lights") : T("Blandet øving", "Mixed practice");
  if(DV.view === "done"){
    const n = DV.items.length;
    $app.innerHTML = `${dvTop(title, T("Øving", "Practice"))}<main class="wrap dv dv-done"><div class="dv-big">${DV.ok}/${n}</div><h2>${esc(DV.ok === n ? T("Alt riktig!", "All correct!") : DV.ok >= n * 0.8 ? T("Sterkt!", "Strong!") : T("Godt øvd", "Good practice"))}</h2>
      <div class="dv-sum">${DV.items.map((it, k) => `<span class="${it.ok ? "ok" : "bad"}">${k + 1}</span>`).join("")}</div>
      <button class="big" data-a="dvagain">${esc(T("Én runde til", "One more round"))}</button><button class="big ghost" data-a="dvclose">${esc(T("Tilbake", "Back"))}</button></main>`;
    return;
  }
  const it = DV.items[DV.i], q = dvQ(DV.code, it.qid), rev = DV.ans != null;
  $app.innerHTML = `${dvTop(title, T("Øving", "Practice"), `<span class="dv-count">${DV.i + 1}/${DV.items.length}</span>`)}
    <div class="dv-prog wrap"><i style="width:${((DV.i + (rev ? 1 : 0)) / DV.items.length * 100).toFixed(0)}%"></i></div>
    <main class="wrap dv">${dvQuestionHTML(q, it, { picked: DV.ans, reveal: rev, locked: rev, act: "dvans" })}
    ${rev ? `<button class="big" data-a="dvnext">${esc(DV.i + 1 < DV.items.length ? T("Neste", "Next") : T("Se resultatet", "See the result"))}</button>
      <div class="dv-fb ${it.ok ? "ok" : "bad"}"><b>${esc(it.ok ? tgPick(T(["Riktig!", "Sånn ja!", "Helt riktig!"], ["Correct!", "Nice!", "Exactly right!"])) : T("Feil", "Wrong"))}</b><p>${rich(q.expl)}</p></div>` : ""}</main>`;
}
function dvRenderTest(){
  const r = S.driveRun; if(!r){ DV = null; goHome(); return; }
  const it = r.items[r.i], q = dvQ(r.code, it.qid), c = COURSE(r.code), nAns = Object.keys(r.ans).length;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="dvpause" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(courseName(c))}</small><b>${esc(r.mini ? T("Gratis teoriprøve", "Free theory test") : T("Teoriprøve", "Theory test"))}</b></div>
      <span class="dv-clock">⏱ <b id="dvclock">${dvClock(r.end - Date.now())}</b></span></div></div>
    <main class="wrap dv dv-test"><div class="dv-thead"><b>${esc(T(`Spørsmål ${r.i + 1} av ${r.items.length}`, `Question ${r.i + 1} of ${r.items.length}`))}</b>
      <button class="dv-flag ${r.flag[r.i] ? "on" : ""}" data-a="dvflag" aria-pressed="${!!r.flag[r.i]}">🚩 ${esc(r.flag[r.i] ? T("Markert", "Flagged") : T("Marker", "Flag"))}</button></div>
      ${dvQuestionHTML(q, it, { picked: r.ans[r.i], reveal: false, locked: false, act: "dvtans" })}
      <div class="dv-nav"><button class="big ghost" data-a="dvgo" data-d="-1" ${r.i === 0 ? "disabled" : ""}>← ${esc(T("Forrige", "Previous"))}</button><button class="big" data-a="dvgo" data-d="1" ${r.i + 1 >= r.items.length ? "disabled" : ""}>${esc(T("Neste", "Next"))} →</button></div>
      <div class="dv-grid">${r.items.map((_, k) => `<button class="${k === r.i ? "cur" : ""} ${r.ans[k] != null ? "done" : ""} ${r.flag[k] ? "flag" : ""}" data-a="dvjump" data-i="${k}" aria-label="${k + 1}">${k + 1}</button>`).join("")}</div>
      <p class="dv-note">${esc(T(`${nAns} av ${r.items.length} besvart. Du kan hoppe fritt mellom spørsmålene og endre svar til du leverer.`, `${nAns} of ${r.items.length} answered. You can jump freely between questions and change answers until you submit.`))}</p>
      <button class="big dv-submit" data-a="dvsubmit">${esc(T("Lever prøven", "Submit the test"))}</button></main>`;
}
function dvRenderResult(){
  const d = dvData(DV.code), res = DV.res || d.tests[DV.ti], c = COURSE(DV.code); if(!res){ DV = null; goHome(); return; }
  const wrong = res.n - res.ok, mm = Math.floor(res.time / 60);
  const cats = Object.keys(res.per).map(Number).sort((a, b) => (res.per[a][0] / res.per[a][1]) - (res.per[b][0] / res.per[b][1]));
  const list = res.items.map((it, k) => ({ it, k, q: dvQ(DV.code, it.qid), a: res.ans[k] })).filter(x => x.q && (DV.show === "all" || x.a == null || x.it.order[x.a] !== 0));
  $app.innerHTML = `${dvTop(T("Resultat", "Result"), courseName(c))}<main class="wrap dv dv-res">
    ${res.mini ? dvMiniHeroHTML(res) + dvMiniNextHTML(res) : `<div class="dv-verdict ${res.pass ? "pass" : "fail"}"><div class="dv-big">${res.ok}/${res.n}</div><h2>${esc(res.pass ? T("Bestått! 🎉", "Passed! 🎉") : T("Ikke bestått", "Not passed"))}</h2>
      <p>${esc(T(`${wrong} feil (grensen er ${DV_MAX_WRONG}) · ${mm} min`, `${wrong} mistakes (the limit is ${DV_MAX_WRONG}) · ${mm} min`))}${res.timeUp ? " · " + esc(T("tiden gikk ut", "time ran out")) : ""}</p></div>`}
    <h3 class="grp">${esc(T("Per kategori", "By category"))}</h3>
    <div class="dv-cats">${cats.map(u => { const [ok, n] = res.per[u], p = ok / n; return `<div class="dv-cat"><span>${esc(dvCatName(c, u))}</span><b class="${p >= 0.85 ? "g" : p >= 0.6 ? "y" : "r"}">${ok}/${n}</b></div>`; }).join("")}</div>
    <div class="seg dv-seg"><button class="${DV.show !== "all" ? "on" : ""}" data-a="dvshow" data-v="wrong">${esc(T(`Feil (${wrong})`, `Wrong (${wrong})`))}</button><button class="${DV.show === "all" ? "on" : ""}" data-a="dvshow" data-v="all">${esc(T("Alle svar", "All answers"))}</button></div>
    ${list.length ? list.map(x => `<details class="dv-rev ${x.a != null && x.it.order[x.a] === 0 ? "ok" : "bad"}"><summary><em>${x.k + 1}</em>${rich(x.q.q)}</summary>
      ${x.q.img ? `<div class="dv-img sm">${fkSign(x.q.img, 90)}</div>` : ""}
      <p class="dv-ra">${x.a == null ? esc(T("Ikke besvart", "Not answered")) : `${esc(T("Ditt svar:", "Your answer:"))} ${rich(x.q.opts[x.it.order[x.a]])}`}</p>
      <p class="dv-rc">${esc(T("Riktig:", "Correct:"))} <b>${rich(x.q.opts[0])}</b></p><p class="dv-re">${rich(x.q.expl)}</p></details>`).join("") : `<p class="dv-note">${esc(T("Ingen feil å vise. Sterkt!", "No mistakes to show. Great!"))}</p>`}
    ${res.mini ? "" : `<button class="big" data-a="dvtest">${esc(T("Ta en ny prøve", "Take a new test"))}</button>${wrong ? `<button class="big ghost" data-a="dvprac" data-k="wrong">${esc(T("Øv på feilene", "Practise your mistakes"))}</button>` : ""}`}
    <button class="big ghost" data-a="dvclose">${esc(T("Til oversikten", "To the overview"))}</button></main>`;
}
function dvRenderSigns(){
  const sel = DV.sel;
  $app.innerHTML = `${dvTop(T("Skilt, lys og oppmerking", "Signs, lights and markings"), courseName(COURSE(S.current)))}<main class="wrap dv dv-signs">
    ${sgMenuHTML()}
    <button class="big ghost" data-a="dvprac" data-k="signs">🚦 ${esc(T("Skiltquiz med teorispørsmål", "Sign quiz with theory questions"))}</button>
    ${FK_SIGN_GROUPS.map(([g, nb, en]) => `<h3 class="grp">${esc(T(nb, en))}</h3><div class="dv-sgrid">${FK_SIGN_INFO.filter(s => s[1] === g).map(s => `<button class="dv-sg ${sel === s[0] ? "on" : ""}" data-a="dvsign" data-s="${s[0]}">${sgKnown(s[0]) ? `<em class="dv-known" title="${esc(T("Du kan dette skiltet", "You know this sign"))}">✓</em>` : ""}${fkSign(s[0], 64)}<b>${esc(T(s[2], s[3]))}</b>${sel === s[0] ? `<small>${FK_SIGN_NR[s[0]] ? `<span class="dv-sgnr">${esc(T("Skilt", "Sign"))} ${FK_SIGN_NR[s[0]]}</span> ` : ""}${esc(T(s[4], s[5]))}</small>` : ""}</button>`).join("")}</div>`).join("")}</main>`;
}
// ---------- gratis prøve: resultat ----------
function dvMiniHeroHTML(res){
  const est = Math.round(res.ok / res.n * DV_TEST_N), need = DV_TEST_N - DV_MAX_WRONG, p = res.ok / res.n, C = 2 * Math.PI * 52;
  const msg = p >= 0.9 ? T("Sterkt! Du er godt i gang.", "Strong! You are well on your way.") : p >= 0.7 ? T("Godt jobbet! Litt mer øving, så er du der.", "Well done! A bit more practice and you are there.") : T("En fin start. Med litt øving går det fort framover.", "A good start. With some practice you will improve quickly.");
  return `<div class="dv-mini-hero ${res.pass ? "pass" : ""}"><div class="dv-mring-w"><svg class="dv-mring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" style="--len:${(p * C).toFixed(1)};--C:${C.toFixed(1)}"/></svg>
    <div class="dv-mscore"><b>${res.ok}</b><span>/ ${res.n}</span></div></div>
    <h2>${esc(msg)}</h2>
    <p>${esc(T(`På den ekte prøven tilsvarer det omtrent ${est} av 45 riktige. Du trenger ${need} for å bestå.`, `On the real test that is about ${est} of 45 correct. You need ${need} to pass.`))}</p>
    <div class="dv-mbar"><i style="--w:${Math.round(est / DV_TEST_N * 100)}%"></i><em style="left:${(need / DV_TEST_N * 100).toFixed(1)}%">${need}</em></div></div>`;
}
function dvMiniNextHTML(res){
  const wrong = res.n - res.ok;
  return `<div class="dv-next"><h3 class="grp">${esc(T("Hva nå?", "What next?"))}</h3>
    <button class="dv-nrow" data-a="dvtest"><span>📝</span><span><b>${esc(T("Ta en full teoriprøve", "Take a full theory test"))}</b><small>${esc(T("45 spørsmål · 90 min · som den ekte", "45 questions · 90 min · like the real one"))}</small></span>${I.chevron}</button>
    ${wrong ? `<button class="dv-nrow" data-a="dvprac" data-k="wrong"><span>🎯</span><span><b>${esc(T("Øv på det du bommet på", "Practise what you missed"))}</b><small>${esc(T(`${wrong} spørsmål med forklaring`, `${wrong} questions with explanations`))}</small></span>${I.chevron}</button>` : ""}
    <button class="dv-nrow" data-a="dvsgopen"><span>🎮</span><span><b>${esc(T("Spill skiltspillet", "Play the sign game"))}</b><small>${esc(T("Lær alle skiltene på tid", "Learn every sign against the clock"))}</small></span>${I.chevron}</button>
    <button class="dv-nrow" data-a="dvmini"><span>🔁</span><span><b>${esc(T("Ny gratis prøve", "Another free test"))}</b><small>${esc(T("10 nye spørsmål", "10 new questions"))}</small></span>${I.chevron}</button>
    ${typeof CLOUD_ON !== "undefined" && CLOUD_ON && !AUTH ? `<div class="dv-save"><b>💾 ${esc(T("Lagre fremgangen din", "Save your progress"))}</b><p>${esc(T("Lag en gratis konto med e-posten din, så har du resultatene på alle enhetene dine. Ingen passord.", "Create a free account with your email to keep your results on all your devices. No password."))}</p><button class="big ghost" data-a="dvsave">${esc(T("Lag gratis konto", "Create a free account"))}</button></div>` : ""}
    </div>`;
}
// ---------- statistikk på forsiden ----------
// Søylediagram over prøvene: grønne søyler er bestått (minst 38 av 45), varme farger ikke bestått. Søylene vokser fram.
function dvChartHTML(tests){
  if(!tests.length) return `<div class="dv-chart empty"><b>📊 ${esc(T("Her kommer utviklingen din", "Your progress will show here"))}</b><p>${esc(T("Ta en teoriprøve, så ser du resultatet ditt over tid, med grensen for å bestå.", "Take a theory test to see your results over time, with the pass mark."))}</p><button class="big" data-a="dvtest">${esc(T("Ta en teoriprøve", "Take a theory test"))}</button></div>`;
  const L = tests.slice(-14), W = 340, H = 190, top = 18, base = 156, n = L.length, gap = 6, bw = Math.min(30, (W - 8 - gap * (n - 1)) / n), x0 = (W - (bw * n + gap * (n - 1))) / 2;
  const pass = DV_TEST_N - DV_MAX_WRONG, y = v => base - v / DV_TEST_N * (base - top);
  const date = ts => { const d = new Date(ts); return d.getDate() + "." + (d.getMonth() + 1) + "."; };
  let g = `<defs><linearGradient id="dvgP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3CCB98"/><stop offset="1" stop-color="#0E9F6E"/></linearGradient><linearGradient id="dvgF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFA36C"/><stop offset="1" stop-color="#F0603E"/></linearGradient></defs>`;
  L.forEach((r, k) => { const v = Math.round(r.ok / r.n * DV_TEST_N), x = x0 + k * (bw + gap), yy = y(v);
    g += `<g class="dv-cb" style="--d:${k * 60}ms"><rect x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${bw.toFixed(1)}" height="${(base - yy).toFixed(1)}" rx="${Math.min(7, bw / 3).toFixed(1)}" fill="url(#${r.pass ? "dvgP" : "dvgF"})"/>
      <text x="${(x + bw / 2).toFixed(1)}" y="${(yy + 13).toFixed(1)}" text-anchor="middle" class="dv-cv">${r.ok}</text></g>`; });
  g += `<line x1="4" x2="${W - 4}" y1="${y(pass).toFixed(1)}" y2="${y(pass).toFixed(1)}" class="dv-cpass"/><text x="${W - 6}" y="${(y(pass) - 4).toFixed(1)}" text-anchor="end" class="dv-cl">${esc(T("bestått", "pass"))} ${pass}</text>`;
  g += `<line x1="4" x2="${W - 4}" y1="${base}" y2="${base}" class="dv-cax"/>`;
  [0, Math.floor((n - 1) / 2), n - 1].filter((v, i, a) => a.indexOf(v) === i).forEach(k => { g += `<text x="${(x0 + k * (bw + gap) + bw / 2).toFixed(1)}" y="${base + 16}" text-anchor="middle" class="dv-cl">${date(L[k].at)}</text>`; });
  const passed = tests.filter(r => r.pass).length, last3 = tests.slice(-3).filter(r => r.pass).length;
  return `<div class="dv-chart"><div class="dv-chh"><span><b>${tests.length}</b> ${esc(T("prøver", "tests"))}</span><span><b>${passed}</b> ${esc(T("bestått", "passed"))}</span><span><b>${Math.max(...tests.map(r => r.ok))}</b> ${esc(T("beste", "best"))}</span></div>
    <svg viewBox="0 0 ${W} ${H - 14}" role="img" aria-label="${esc(T("Resultatene dine på teoriprøvene over tid", "Your theory test results over time"))}">${g}</svg>
    <p class="dv-note">${esc(last3 === 3 ? T("Tre beståtte på rad. Du er klar for prøven!", "Three passes in a row. You are ready for the test!") : T("Målet er tre beståtte prøver på rad før den ekte prøven.", "Aim for three passes in a row before the real test."))}</p></div>`;
}
// Personlige anbefalinger: de svakeste kategoriene (med nok svar), ellers de du ikke har øvd på.
function dvRecHTML(c, code){
  const rows = c.units.map((u, k) => { const [ok, n] = dvCatStat(code, k); return { k, n, p: n ? ok / n : null }; });
  let pick = rows.filter(r => r.n >= 3 && r.p < 0.85).sort((a, b) => a.p - b.p).slice(0, 2), why = "weak";
  if(!pick.length){ pick = rows.filter(r => !r.n).slice(0, 2); why = "new"; }
  if(!pick.length) return `<div class="dv-rec good"><b>🌟 ${esc(T("Du ligger godt an i alle kategoriene", "You are doing well in every category"))}</b><p>${esc(T("Ta en full teoriprøve for å holde formen.", "Take a full theory test to stay sharp."))}</p></div>`;
  return `<div class="dv-rec"><b>🎯 ${esc(T("Anbefalt for deg", "Recommended for you"))}</b><p>${esc(why === "weak" ? T("Her mister du flest poeng. Ti spørsmål hver gir rask framgang.", "This is where you lose the most points. Ten questions each gives quick progress.") : T("Disse kategoriene har du ikke øvd på ennå.", "You have not practised these categories yet."))}</p>
    ${pick.map(r => `<button class="dv-recrow" data-a="dvprac" data-k="cat" data-u="${r.k}"><span><b>${esc(dvCatName(c, r.k))}</b><small>${esc(r.p == null ? T("Ikke øvd ennå", "Not practised yet") : T(`${Math.round(r.p * 100)} % riktig`, `${Math.round(r.p * 100)} % correct`))}</small></span><em>${esc(T("Øv nå", "Practise"))}</em></button>`).join("")}</div>`;
}
// ---------- forsiden for førerkort ----------
function renderDriveHome(){
  const c = COURSE(S.current), code = c.code, d = dvData(code), rd = dvReady(code), st = streakNow(), wrongN = dvWrongIds(code).length;
  const pct = Math.round(rd.pass * 100), exp = Math.round(rd.expect);
  const other = COURSES.filter(x => isDrive(x));
  const ring = rd.enough ? `<svg class="dv-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="12"/><circle cx="60" cy="60" r="50" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(pct / 100 * 314).toFixed(0)} 314" transform="rotate(-90 60 60)"/><text x="60" y="68" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">${pct}%</text></svg>` : `<div class="dv-ring0">?</div>`;
  const cats = c.units.map((u, k) => { const [ok, n, tot, seen] = dvCatStat(code, k), p = n ? ok / n : null, lvl = p == null ? "" : p >= 0.85 ? "g" : p >= 0.6 ? "y" : "r";
    return `<button class="dv-ccard ${lvl}" style="--d:${k * 45}ms" data-a="dvprac" data-k="cat" data-u="${k}"><span class="dv-cch"><b>${esc(dvCatName(c, k))}</b><em>${p == null ? "–" : Math.round(p * 100) + " %"}</em></span>
      <span class="dv-cbarw"><i style="--w:${p == null ? 0 : Math.max(4, Math.round(p * 100))}%"></i></span><small>${esc(n ? T(`${seen} av ${tot} spørsmål sett`, `${seen} of ${tot} questions seen`) : T("Ikke øvd ennå", "Not practised yet"))}</small></button>`; }).join("");
  const tests = d.tests.slice(-5).reverse();
  $app.innerHTML = `<div class="top"><div class="wrap">
      <button class="chip" data-a="pick" aria-label="${t("switchCourse")}"><span class="code">${esc(courseShort(c))}</span><span class="nm">${esc(courseName(c))}</span>${I.down}</button>
      <button class="stat fire ${st ? "" : "off"}" data-a="statinfo" data-k="streak" aria-label="${t("streakTitle")}: ${st}">${I.fire}${st}</button>
      <button class="stat xp" data-a="statinfo" data-k="xp" aria-label="${t("xpTitle")}: ${S.xp}">${I.bolt}${S.xp}</button></div></div>
    <main class="wrap dv-home">
      ${noticeHTML()}${betaNoteHTML(code, true)}${qsHTML("home")}
      ${other.length > 1 ? `<div class="seg dv-cls">${other.map(x => `<button class="${x.code === code ? "on" : ""}" data-a="dvcourse" data-c="${x.code}">${x.code === "FKB" ? "🚗 " + esc(T("Bil (B)", "Car (B)")) : "🏍️ " + esc(T("MC (A1, A2, A)", "Motorcycle (A1, A2, A)"))}</button>`).join("")}</div>` : ""}
      ${S.driveRun && S.driveRun.code === code ? `<button class="pill exgo dv-resume" data-a="dvresume"><span class="l1">⏱ ${esc(S.driveRun.mini ? T("Fortsett den gratis prøven", "Continue the free test") : T("Fortsett teoriprøven", "Continue the theory test"))}</span><small>${esc(T(`${Object.keys(S.driveRun.ans).length} av ${S.driveRun.items.length} besvart · ${dvClock(S.driveRun.end - Date.now())} igjen`, `${Object.keys(S.driveRun.ans).length} of ${S.driveRun.items.length} answered · ${dvClock(S.driveRun.end - Date.now())} left`))}</small></button>` : ""}
      <div class="dvh-a">${!d.tests.length && rd.answered < 20 && !S.driveRun ? `<button class="dv-free" data-a="dvmini"><span class="dv-free-ic" aria-hidden="true">${fkSign("gangfelt", 54)}</span><span><b>${esc(T("Prøv en gratis teoriprøve", "Try a free theory test"))}</b><small>${esc(T("10 spørsmål · ca. 5 minutter · ingen innlogging", "10 questions · about 5 minutes · no sign-in"))}</small></span><em>${esc(T("Start", "Start"))} →</em></button>` : ""}
      <section class="dv-hero ${code === "FKMC" ? "mc" : ""}">
        <div class="dv-hx">${ring}<div><small>${esc(T("Sjanse for å bestå", "Chance of passing"))}</small><b>${rd.enough ? esc(T(`Anslått ${exp} av 45 riktige`, `About ${exp} of 45 correct`)) : esc(T("Svar på noen spørsmål, så regner vi ut hvor du ligger an", "Answer some questions and we will estimate where you stand"))}</b>
          <span>${esc(T("Teoriprøven: 45 spørsmål · 90 min · høyst 7 feil", "Theory test: 45 questions · 90 min · at most 7 mistakes"))}</span></div></div>
        <button class="big dv-start" data-a="dvtest">${esc(T("Ta en teoriprøve", "Take a theory test"))}</button>
        <button class="dv-minilink" data-a="dvmini">${esc(T("eller en kort prøve med 10 spørsmål", "or a short test with 10 questions"))}</button>
      </section>
      <button class="dv-scene-cta" data-a="scopen"><span class="dv-sc-ic" aria-hidden="true">🚦</span><span><b>${esc(T("Trafikksituasjoner", "Traffic situations"))}</b><small>${esc(T(`Animerte kryss: hvem kjører først? · ${Object.values(scData(code)).filter(r => r[1]).length}/${SCENES.length} klart`, `Animated junctions: who goes first? · ${Object.values(scData(code)).filter(r => r[1]).length}/${SCENES.length} solved`))}</small></span>${I.chevron}</button>
      ${(() => { const m = sgMastery(), b = Math.max(0, ...Object.values(S.signBest || {})); return `<button class="dv-scene-cta sg-cta" data-a="dvsgopen"><span class="dv-sc-ic" aria-hidden="true">🎮</span><span><b>${esc(T("Skiltspillet", "Sign game"))}</b><small>${esc(T(`Finn riktig skilt på tid · du kan ${m.known} av ${m.total}`, `Find the right sign against the clock · you know ${m.known} of ${m.total}`))}${b ? " · 🏆 " + b : ""}</small></span>${I.chevron}</button>`; })()}
      <div class="dv-tiles">
        <button data-a="dvprac" data-k="mix"><span>🎯</span><b>${esc(T("Rask øving", "Quick practice"))}</b><small>${esc(T("10 blandede spørsmål", "10 mixed questions"))}</small></button>
        <button data-a="dvbook"><span>📖</span><b>${esc(T("Teori", "Theory"))}</b><small>${esc(T(`${c.units.length} kapitler`, `${c.units.length} chapters`))}</small></button>
        <button data-a="dvsigns"><span>🚦</span><b>${esc(T("Skilt", "Signs"))}</b><small>${esc(T("Skilt, lys og linjer", "Signs, lights and lines"))}</small></button>
        <button data-a="dvprac" data-k="wrong" ${wrongN ? "" : "disabled"}><span>❌</span><b>${esc(T("Feil", "Mistakes"))}</b><small>${esc(wrongN ? T(`${wrongN} å øve på`, `${wrongN} to practise`) : T("Ingen ennå", "None yet"))}</small></button>
      </div></div><div class="dvh-b">
      <h3 class="grp">${esc(T("Din fremgang", "Your progress"))}</h3>
      ${dvChartHTML(d.tests)}
      ${dvRecHTML(c, code)}
      <h3 class="grp">${esc(T("Hvor ligger du an?", "Where do you stand?"))}</h3>
      <p class="dv-note">${esc(T("Trykk på en kategori for å øve på den. Rødt betyr at du bør øve mer før prøven.", "Tap a category to practise it. Red means you should practise more before the test."))}</p>
      <div class="dv-ccards">${cats}</div>
      ${tests.length ? `<h3 class="grp">${esc(T("Dine siste prøver", "Your latest tests"))}</h3><div class="dv-tests">${tests.map((x, k) => `<button class="dv-trow ${x.pass ? "pass" : "fail"}" data-a="dvres" data-i="${d.tests.length - 1 - k}"><b>${x.ok}/${x.n}</b><span>${esc(x.pass ? T("Bestått", "Passed") : T("Ikke bestått", "Not passed"))}</span><small>${esc(frAgo(new Date(x.at).toISOString()))}</small>${I.chevron}</button>`).join("")}</div>` : ""}
      ${layoutHTML("home")}
      <p class="dv-disc">${esc(T("Øvingsmateriale laget med omhu, men det kan inneholde feil. Følg alltid gjeldende trafikkregler, og sjekk Statens vegvesen ved tvil.", "Practice material made with care, but it may contain mistakes. Always follow the current traffic rules, and check official sources if in doubt."))} <button class="exlink" data-a="terms">${esc(T("Vilkår", "Terms"))}</button></p></div>
    </main>`;
}
// Øv-fanen: snarveier øverst når du holder på med førerkort.
function dvPracticeCardHTML(c){
  if(!isDrive(c)) return "";
  return `<div class="dv-prac"><button class="qt-row" data-a="dvtest"><span class="qt-ic">📝</span><span><b>${esc(T("Teoriprøve", "Theory test"))}</b><small>${esc(T("45 spørsmål · 90 min", "45 questions · 90 min"))}</small></span>${I.chevron}</button>
    <button class="qt-row" data-a="dvprac" data-k="mix"><span class="qt-ic">🎯</span><span><b>${esc(T("Rask øving", "Quick practice"))}</b><small>${esc(T("10 blandede spørsmål med forklaring", "10 mixed questions with explanations"))}</small></span>${I.chevron}</button>
    <button class="qt-row" data-a="scopen"><span class="qt-ic">🚗</span><span><b>${esc(T("Trafikksituasjoner", "Traffic situations"))}</b><small>${esc(T("Animerte kryss: hvem kjører først?", "Animated junctions: who goes first?"))}</small></span>${I.chevron}</button>
    <button class="qt-row" data-a="dvsigns"><span class="qt-ic">🚦</span><span><b>${esc(T("Skilt", "Signs"))}</b><small>${esc(T("Oversikt og skiltquiz", "Overview and sign quiz"))}</small></span>${I.chevron}</button></div>`;
}
function dvClick(a, b){
  if(!a.startsWith("dv")) return false;
  const dd = b && b.dataset;
  if(a.startsWith("dvsg")) return sgClick(a, dd || {});
  if(a === "dvprac"){ dvPractice(dd.k, dd.u != null ? +dd.u : null); return true; }
  if(a === "dvagain"){ dvPractice(DV.kind, DV.u); return true; }
  if(a === "dvans"){ dvAnswer(+dd.i); return true; }
  if(a === "dvnext"){ dvNext(); return true; }
  if(a === "dvclose"){ DV = null; goHome(); return true; }
  if(a === "dvmini"){ if(S.driveRun && S.driveRun.code === S.current){ DV = { view: "test" }; screen = "drive"; render(); dvTick(); return true; } dvMiniStart(); return true; }
  if(a === "dvsave"){ overlay = { login: 1, step: "email", email: "" }; renderOverlay(); return true; }
  if(a === "dvtest"){ if(S.driveRun && S.driveRun.code === S.current){ DV = { view: "test" }; screen = "drive"; render(); dvTick(); return true; } dvTestStart(); return true; }
  if(a === "dvresume"){ DV = { view: "test" }; screen = "drive"; overlay = null; render(); dvTick(); return true; }
  if(a === "dvtans"){ const r = S.driveRun; r.ans[r.i] = +dd.i; save(); sfx("tap"); render(); return true; }
  if(a === "dvgo"){ const r = S.driveRun; r.i = Math.max(0, Math.min(r.items.length - 1, r.i + +dd.d)); save(); render(); window.scrollTo(0, 0); return true; }
  if(a === "dvjump"){ S.driveRun.i = +dd.i; save(); render(); window.scrollTo(0, 0); return true; }
  if(a === "dvflag"){ const r = S.driveRun; r.flag[r.i] = !r.flag[r.i]; save(); render(); return true; }
  if(a === "dvpause"){ clearInterval(dvTick.t); DV = null; goHome(); toast(T("Prøven er satt på pause. Tiden går likevel.", "The test is paused. The clock keeps running.")); return true; }
  if(a === "dvsubmit"){ const r = S.driveRun, left = r.items.length - Object.keys(r.ans).length;
    overlay = { dvsubmit: left }; renderOverlay(); return true; }
  if(a === "dvsubmitok"){ overlay = null; renderOverlay(); dvSubmit(false); return true; }
  if(a === "dvres"){ DV = { view: "result", code: S.current, ti: +dd.i, show: "wrong" }; screen = "drive"; render(); window.scrollTo(0, 0); return true; }
  if(a === "dvshow"){ DV.show = dd.v; render(); return true; }
  if(a === "dvsigns"){ DV = { view: "signs" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "dvsign"){ DV.sel = DV.sel === dd.s ? null : dd.s; render(); return true; }
  if(a === "dvbook"){ BK = { v: "course", code: S.current, u: 0, tab: "topics", q: "" }; screen = "book"; render(); window.scrollTo(0, 0); return true; }
  if(a === "dvcourse"){ S.current = dd.c; save(); render(); return true; }
  return false;
}
function dvSubmitHTML(left){
  return `<div class="dialog pop" role="dialog"><h3>${esc(T("Levere prøven?", "Submit the test?"))}</h3><p>${esc(left ? T(`Du har ${left} spørsmål uten svar. De teller som feil.`, `You have ${left} unanswered questions. They count as mistakes.`) : T("Du har svart på alle spørsmålene.", "You have answered all the questions."))}</p>
    <button class="big" data-a="dvsubmitok">${esc(T("Lever", "Submit"))}</button><button class="big ghost" data-a="closeov">${esc(T("Fortsett prøven", "Continue the test"))}</button></div>`;
}
