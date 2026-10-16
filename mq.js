// ============================================================
//  HODEREGNING – mattestykker du klarer i hodet. Fire svarkort med hver sin tast (1–4), poeng etter hvor fort du svarer.
//  • Alene: 10, 15 eller 20 stykker på fire nivåer. Rekord per nivå.
//  • Utfordre en venn: en lenke (axle.no/#/hoderegning/…) med de samme stykkene og poengsummen din; vennen spiller når det passer.
//  • Ukens hoderegning: alle får de samme 15 stykkene hele uka – én felles toppliste.
//  • Live: verten lager et rom med kode, venner blir med (opptil 40), alle får samme stykke samtidig,
//    toppliste etter hvert stykke og pall til slutt.
//  Live og topplister krever konto og supabase/hoderegning.sql; alene og lenker virker uten.
//  Stykkene lages fra et tall (seed), så alle med samme seed får nøyaktig de samme stykkene og svaralternativene.
//  Lynpoeng: riktig svar gir 100 + inntil 100 for fart. Svar på rad gir lynfaktor ×1,1, ×1,2 … opptil ×1,5. Feil eller for sent gir 0.
// ============================================================
Object.assign(UI.nb, { mqTitle: "Hoderegning", mqSub: "Regn kjapt i hodet, spill live eller utfordre venner" });
Object.assign(UI.en, { mqTitle: "Mental maths", mqSub: "Calculate fast, play live or challenge friends" });
let MQ = null, MQ_PENDING = null;
const MQ_REV = 5000, MQ_WEEK = { lvl: 2, n: 15, secs: 10 };
const MQ_COL = ["var(--u0)", "var(--u1)", "var(--u2)", "var(--c2)"];   // Axles egne farger: blå, petrol, fiolett, oransje
const MQ_LV = () => [[1, T("Lett", "Easy"), "7 + 5", T("Pluss, minus og gangetabellen til 5", "Add, subtract, times tables to 5")], [2, T("Middels", "Medium"), "48 : 6", T("Hele gangetabellen og deling", "All times tables and division")],
  [3, T("Vanskelig", "Hard"), T("25 % av 80", "25% of 80"), T("Store tall, kvadrater og prosent", "Larger numbers, squares and percent")], [4, T("Ekspert", "Expert"), "14 × 13", T("Regnerekkefølge, brøk og negative tall", "Order of operations, fractions, negatives")]];
const mqN = x => x < 0 ? "−" + (-x) : String(x);
const mqF = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// ---------- stykker ----------
function mqRng(seed){ let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const mqI = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const mqPick = (r, a) => a[Math.floor(r() * a.length)];
function mqShuffle(r, a){ for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function mqHash(s){ let h = 2166136261; for(const ch of String(s)){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) % 1e9; }
// Fire alternativer: riktig svar og tre typiske feil (glemt mente, feil regningsart, én for mye …)
function mqMake(r, q, ans, near, neg){
  const ok = x => Number.isInteger(x) && x !== ans && (neg || x >= 0), cand = [];
  [...near, ans + 1, ans - 1, ans + 2, ans - 2, ans + 10, ans - 10, ans + 3, ans - 3, ans + 4, ans + 5, ans + 6, ans + 7].forEach(x => { if(ok(x) && !cand.includes(x)) cand.push(x); });
  const nr = mqShuffle(r, cand.filter(x => near.includes(x))), rest = mqShuffle(r, cand.filter(x => !near.includes(x)));
  const o = mqShuffle(r, [ans, ...[...nr.slice(0, 2), ...rest, ...nr.slice(2)].slice(0, 3)]);
  return { q, a: ans, o, k: o.indexOf(ans) };
}
function mqOne(r, lv){
  const K = [["add", "sub", "mul"], ["add", "sub", "mul", "div"], ["add2", "sub2", "mul2", "div2", "sq", "pct"], ["mul3", "ops", "frac", "neg", "pct2", "sq"]][lv - 1];
  const k = mqPick(r, K), I = (a, b) => mqI(r, a, b), av = T("av", "of"); let a, b, c, q, ans, near = [];
  switch(k){
    case "add": if(lv === 1){ a = I(1, 12); b = I(1, 20 - a); } else { a = I(12, 79); b = I(9, 99 - a); } q = `${a} + ${b}`; ans = a + b; near = [ans + 10, ans - 10]; break;
    case "sub": if(lv === 1){ a = I(6, 20); b = I(1, a - 1); } else { a = I(31, 99); b = I(6, a - 6); } q = `${a} − ${b}`; ans = a - b; near = [ans + 10, ans - 10, a + b]; break;
    case "mul": if(lv === 1){ a = I(2, 5); b = I(1, 10); } else { a = I(3, 10); b = I(3, 10); } q = `${a} × ${b}`; ans = a * b; near = [ans + a, ans - a, ans + b, ans - b, a + b]; break;
    case "div": b = I(2, 10); ans = I(2, 10); a = b * ans; q = `${a} : ${b}`; near = [ans + 1, ans - 1, ans + 2, a - b]; break;
    case "add2": a = I(25, 199); b = I(25, 199); q = `${a} + ${b}`; ans = a + b; near = [ans + 10, ans - 10, ans + 100, ans - 100]; break;
    case "sub2": a = I(101, 250); b = I(15, a - 20); q = `${a} − ${b}`; ans = a - b; near = [ans + 10, ans - 10, ans + 100]; break;
    case "mul2": a = I(12, 29); b = I(3, 9); q = `${a} × ${b}`; ans = a * b; near = [ans + b, ans - b, ans + 10, ans - 10, (a % 10) * b + Math.floor(a / 10) * 10]; break;
    case "div2": b = I(3, 9); ans = I(12, 40); a = b * ans; q = `${a} : ${b}`; near = [ans + 1, ans - 1, ans + 10, ans - 10]; break;
    case "sq": a = lv >= 4 ? I(13, 25) : I(4, 15); q = `${a}²`; ans = a * a; near = [a * 2, ans + a, ans - a, ans + 1, ans - 1]; break;
    case "pct": { const p = mqPick(r, [10, 20, 25, 50]), base = p === 25 ? 4 * I(2, 30) : p === 50 ? 2 * I(6, 60) : 10 * I(2, 30); q = `${p} % ${av} ${base}`; ans = base * p / 100; near = [ans * 2, Math.floor(ans / 2), ans + 10, base - ans]; break; }
    case "pct2": { const p = mqPick(r, [5, 15, 30, 40, 75]), base = 20 * I(2, 20); q = `${p} % ${av} ${base}`; ans = base * p / 100; near = [ans * 2, base - ans, ans + base / 10, ans - 5]; break; }
    case "mul3": a = I(11, 19); b = I(11, 15); q = `${a} × ${b}`; ans = a * b; near = [ans + 10, ans - 10, ans + a, ans - b]; break;
    case "ops": b = I(2, 9); c = I(2, 9);
      if(r() < .5){ a = I(2, 15); q = `${a} + ${b} × ${c}`; ans = a + b * c; near = [(a + b) * c, ans + 1, ans - c]; }
      else { a = I(2, 9); q = `(${a} + ${b}) × ${c}`; ans = (a + b) * c; near = [a + b * c, ans + c, ans - c]; } break;
    case "frac": { const d = mqPick(r, [3, 4, 5, 8]), n = I(1, d - 1), base = d * I(3, 15); q = `${n}/${d} ${av} ${base}`; ans = base / d * n; near = [base / d, ans + base / d, ans - base / d, base - ans]; break; }
    case "neg": { a = I(-15, 15) || 3; b = I(-12, 12) || -4; const op = mqPick(r, ["+", "−", "×"]), f = x => x < 0 ? `(−${-x})` : String(x);
      q = `${mqN(a)} ${op} ${f(b)}`; ans = op === "+" ? a + b : op === "−" ? a - b : a * b; near = [-ans, ans + 2, ans - 2, op === "×" ? ans + a : op === "+" ? a - b : a + b]; break; }
  }
  return mqMake(r, q, ans, near, lv >= 4);
}
// ---------- quiz fra lærerverktøyet: spørsmål fra et Axle-fag eller lærerens egne (Fellesskap) ----------
// cfg.src = «AX:KODE:0,2» (enheter i et fag) eller «CC:<id>» (et quiz-kurs). Tilfeldighetene (utvalg, tall i generatorene,
// rekkefølgen på svarene) styres av seed, så alle i rommet får nøyaktig de samme spørsmålene.
const MQ_CC = {};   // quiz-kurs som er hentet: id → { title, questions }
// Lærerens egne oppgavesett (supabase/laerer.sql): «LS:<id>». Kan hentes uten konto, så elever slipper å logge inn for å gjøre leksen.
const MQ_LS = {};
// Egne spørsmål → oppgaver. Avstemninger (poll) tas bare med i live-quiz (live = true), siden de ikke har fasit.
// Feltene fra oppgave 35/36: qimg (bilde), secs (egen tid), poll, og img per svaralternativ.
function lsItems(qs, live){ return qs.map((x, i) => { const id = "ls." + i;
  if(x.poll && !live) return null;
  const ex = { qimg: qimgOf(x), secs: qxSecs(x) };
  if(x.t === "num"){ const n = +x.n, tp = +x.tol || 0; return Object.assign({ id, type: "num", prompt: x.q, n, tol: tp > 0 ? Math.abs(n) * tp / 100 : 1e-9, u: x.u || "", expl: x.e || "" }, ex); }
  const opts = x.t === "tf" ? [{ t: t("ccTrue"), ok: +x.a === 1 }, { t: t("ccFalse"), ok: +x.a === 0 }] : shuffle(qxOpts(x));
  return Object.assign({ id, type: "mc", prompt: x.q, opts, expl: x.e || "", poll: !!(x.poll && x.t === "mc") }, ex); }).filter(Boolean); }
async function mqPrep(cfg){
  if(cfg && cfg.src && /^LS:/.test(cfg.src)){ const id = cfg.src.slice(3); if(MQ_LS[id]) return true;
    try{ const r = await sbFetch("/rest/v1/rpc/lekse_get", { method: "POST", body: JSON.stringify({ p_id: id }) }, AUTH ? await authToken() : null); if(!r || !r.questions) return false; MQ_LS[id] = { title: r.title, questions: r.questions }; return true; }catch(e){ return false; } }
  if(!cfg || !cfg.src || !/^CC:/.test(cfg.src)) return true; const id = cfg.src.slice(3); if(MQ_CC[id]) return true;
  try{ const c = await ccFetchQuestions(id); MQ_CC[id] = { title: c.title, questions: c.questions || [] }; return true; }catch(e){ return false; }
}
function mqSeeded(seed, fn){ const orig = Math.random; Math.random = mqRng(seed); try{ return fn(); } finally { Math.random = orig; } }
function mqQuizItems(cfg, max){
  const s = String(cfg.src), want = max || cfg.n;
  return mqSeeded(cfg.seed, () => {
    let items = [];
    if(s.startsWith("CC:")) items = shuffle(ccItems(((MQ_CC[s.slice(3)] || {}).questions || []).filter(x => x.t !== "fc"), cfg.live));
    else if(s.startsWith("LS:")){ items = lsItems((MQ_LS[s.slice(3)] || {}).questions || [], cfg.live); if(cfg.mix) items = shuffle(items); } // lærerens rekkefølge, eller blandet (samme frø for alle)
    else { const [, code, us] = s.split(":"), c = COURSES.find(x => x.code === code); if(!c) return [];
      // fast tak på 60 kandidater, så utvalget (og rekkefølgen) er det samme uansett hvor mange spørsmål som spilles
      const units = String(us || "0").split(",").map(Number).filter(u => c.units[u]), P = poolIds(c, units);
      for(const id of shuffle([...P.mc, ...P.num, ...P.gen])){ if(items.length >= 60) break; try{ const it = itemFromId(c, id, { mc: true }); if(it) items.push(it); }catch(e){} } }
    const out = [];
    for(const it0 of items){ if(out.length >= want) break; const it = it0.type === "num" ? toMC(it0) : it0;
      if(it.type !== "mc" || !it.opts || it.opts.length < 2 || String(it.prompt).length > 420) continue;
      if(it.poll){ out.push({ q: it.prompt, o: it.opts.map(x => x.t), oi: it.opts.map(x => x.img || null), k: -1, a: "", rich: true, e: it.expl || "", img: it.qimg || null, secs: it.secs || 0, poll: true }); continue; }
      let o = it.opts; if(o.length > 4){ const ok = o.find(x => x.ok); o = shuffle([ok, ...o.filter(x => !x.ok).slice(0, 3)]); }
      out.push({ q: it.prompt, o: o.map(x => x.t), oi: o.map(x => x.img || null), k: o.findIndex(x => x.ok), a: (o.find(x => x.ok) || {}).t, rich: true, e: it.expl || "", img: it.qimg || null, secs: it.secs || 0 }); }
    return out;
  });
}
const mqQs = cfg => { if(cfg.src) return mqQuizItems(cfg); const r = mqRng(cfg.seed); return Array.from({ length: cfg.n }, () => mqOne(r, cfg.lvl)); };
// Navn på det som spilles: nivået i hoderegning, eller faget/quizen.
function mqSrcName(cfg){
  if(!cfg || !cfg.src) return mqLvName(cfg && cfg.lvl);
  if(/^CC:/.test(cfg.src)){ const c = MQ_CC[cfg.src.slice(3)]; return c ? c.title : T("Quiz", "Quiz"); }
  if(/^LS:/.test(cfg.src)){ const c = MQ_LS[cfg.src.slice(3)]; return c ? c.title : T("Lærerens oppgaver", "Teacher's problems"); }
  const [, code, us] = cfg.src.split(":"), c = COURSES.find(x => x.code === code); if(!c) return T("Quiz", "Quiz");
  const u = String(us || "").split(",").map(Number); return courseShort(c) + " · " + (u.length === 1 ? unitTitle(c, u[0]) : T(`${u.length} enheter`, `${u.length} units`));
}
const mqWord = cfg => cfg && cfg.src ? T("spørsmål", "questions") : T("stykker", "problems");
const mqTitleOf = cfg => cfg && cfg.src ? T("Quiz", "Quiz") : T("Hoderegning", "Mental maths");
const mqMult = streak => 1 + Math.min(5, Math.max(0, streak - 1)) / 10;
// Tid per spørsmål: egen tid på spørsmålet (secs), ellers standardtiden. I live er cfg.secs den lengste tiden (databasen
// bruker den til å anslå når spillet er slutt), og cfg.d standardtiden.
const mqDef = cfg => (cfg && (cfg.d || cfg.secs)) || 10;
const mqSecsOf = i => (MQ && MQ.qs && MQ.qs[i] && MQ.qs[i].secs) || mqDef(MQ && MQ.cfg);
// Når spørsmål i starter og hvor lenge det varer (ms fra start), samme utregning på alle enheter.
function mqSched(){ if(MQ.sched && MQ.sched.qs === MQ.qs) return MQ.sched.a; let at = 0; const a = MQ.qs.map((q, i) => { const T0 = mqSecsOf(i) * 1000, r = { at, T: T0 }; at += T0 + MQ_REV; return r; }); MQ.sched = { qs: MQ.qs, a }; return a; }
const mqPoints = (ms, secs, streak) => Math.round((100 + 100 * (1 - Math.min(1, ms / (secs * 1000)))) * mqMult(streak));
const mqKey = cfg => cfg.src ? `q${cfg.seed}.${cfg.n}.${cfg.secs}.${cfg.src}` : `${cfg.seed}.${cfg.lvl}.${cfg.n}.${cfg.secs}`;
// Lenke til en quiz-utfordring: #/hoderegning/quiz/<kilde>/<seed>.<antall>.<sek>[.<poeng>.<navn>]
const mqQuizPath = (cfg, score, name) => "quiz/" + encodeURIComponent(cfg.src) + "/" + [cfg.seed, cfg.n, cfg.secs].concat(score != null ? [score, encodeURIComponent(String(name || "").replace(/\./g, " ").slice(0, 24))] : []).join(".");
const mqWeekKey = () => "w" + weekKeyOf(new Date());
const mqLvName = lv => (MQ_LV().find(x => x[0] === lv) || [])[1] || "";

// ---------- åpne og starte ----------
// arg fra adressen: «live/KODE», eller en utfordring «seed.nivå.antall.sek[.poeng.navn]».
function mqOpen(arg, from){
  MQ = { view: "menu", lvl: S.mqLvl || 2, n: S.mqN || 10, secs: S.mqSecs || 10, from: from || (screen !== "mq" ? screen : "home"), chal: null, live: null, board: null, joinCode: "" };
  const s = String(arg || "");
  const qm = s.match(/^quiz\/([^/]+)\/(\d{1,10})\.(\d{1,2})\.(\d{1,2})(?:\.(\d+)\.?(.*))?$/);
  if(qm){ const cfg = { seed: +qm[2], lvl: 0, n: Math.min(30, Math.max(3, +qm[3])), secs: Math.min(60, Math.max(3, +qm[4])), src: decodeURIComponent(qm[1]).slice(0, 80) };
    MQ.chal = { cfg, score: qm[5] != null ? +qm[5] : null, name: decodeURIComponent(qm[6] || "").slice(0, 24) };
    mqPrep(cfg).then(() => { if(MQ && screen === "mq") render(); }); }
  else if(/^live\//i.test(s)){ MQ.joinCode = s.slice(5).toUpperCase().slice(0, 5); if(AUTH) setTimeout(() => mqLiveJoin(MQ.joinCode), 0); }
  else if(/^\d{1,10}\.[1-4]\.\d{1,2}\.\d{1,2}/.test(s)){
    const p = s.split("."), cfg = { seed: +p[0], lvl: +p[1], n: Math.min(30, Math.max(5, +p[2])), secs: Math.min(30, Math.max(3, +p[3])) };
    MQ.chal = { cfg, score: p[4] != null && /^\d+$/.test(p[4]) ? +p[4] : null, name: p.slice(5).join(".").slice(0, 24) };
  }
  screen = "mq"; render(); window.scrollTo(0, 0);
}
async function mqStart(mode, cfg){
  clearInterval(MQ.tick);
  if(cfg.src && !(await mqPrep(cfg))){ toast(T("Fant ikke spørsmålene. Sjekk nettet og prøv igjen.", "Could not load the questions. Check your connection and try again.")); return; }
  const qs = mqQs(cfg); if(!qs.length){ toast(T("Fant ingen spørsmål å spille.", "No questions to play.")); return; } cfg = Object.assign({}, cfg, { n: qs.length });
  Object.assign(MQ, { mode, cfg, qs, i: 0, score: 0, ok: 0, streak: 0, bestStreak: 0, times: [], chosen: null, gained: 0, view: "count", goAt: Date.now() + 3000, board: null, result: null, runId: Date.now(), revAnimKey: null }); // ny runde: «riktig svar»-animasjonen kan spilles igjen
  MQ.tick = setInterval(mqTick, 100); render(); if(typeof stEv === "function") stEv("mq", mode, "lv" + cfg.lvl);
}
function mqShow(i){ MQ.i = i; MQ.chosen = null; MQ.gained = 0; MQ.qStart = Date.now(); MQ.view = "q"; render(); }
function mqAnswer(idx){
  if(!MQ || MQ.view !== "q" || MQ.chosen != null || mqTeach()) return;
  const q = MQ.qs[MQ.i], ms = Date.now() - MQ.qStart; if(ms > mqSecsOf(MQ.i) * 1000 + 300) return;
  MQ.chosen = idx;
  if(q.poll){ MQ.gained = 0; if(idx >= 0) sfx("ok"); } // avstemning: ingen poeng, rekka står
  else if(idx === q.k){ MQ.streak++; MQ.bestStreak = Math.max(MQ.bestStreak, MQ.streak); MQ.ok++; MQ.gained = mqPoints(ms, mqSecsOf(MQ.i), MQ.streak); MQ.times.push(ms); sfx("ok"); }
  else { MQ.streak = 0; MQ.gained = 0; if(idx >= 0) sfx("bad"); }
  MQ.score += MQ.gained; MQ.lastQ = MQ.i;
  if(MQ.mode === "live"){ mqLivePush(); render(); return; }
  MQ.view = "rev"; MQ.revUntil = Date.now() + (idx === q.k ? 1100 : 1900); render();
}
function mqTick(){
  if(!MQ || screen !== "mq"){ if(MQ) clearInterval(MQ.tick); return; }
  if(MQ.mode === "live") return mqLiveTick();
  const now = Date.now();
  if(MQ.view === "count"){ const n = Math.ceil((MQ.goAt - now) / 1000); if(n <= 0) mqShow(0); else { const el = document.getElementById("mqcount"); if(el && el.textContent !== String(n)){ el.textContent = n; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); } } }
  else if(MQ.view === "q"){ const left = mqSecsOf(MQ.i) * 1000 - (now - MQ.qStart); mqBar(left); if(left <= 0) mqAnswer(-1); }
  else if(MQ.view === "rev" && now >= MQ.revUntil){ if(MQ.i + 1 < MQ.qs.length) mqShow(MQ.i + 1); else mqFinish(); }
}
function mqBar(left){
  const bar = document.getElementById("mqbar"), sec = document.getElementById("mqsec"), T0 = mqSecsOf(MQ.i) * 1000;
  if(bar) bar.style.width = Math.max(0, Math.min(100, left / T0 * 100)) + "%";
  if(sec) sec.textContent = Math.max(0, Math.ceil(left / 1000));
}
function mqFinish(){
  clearInterval(MQ.tick); MQ.view = "end";
  const key = MQ.mode === "week" ? mqWeekKey() : mqKey(MQ.cfg), bk = MQ.cfg.lvl + "." + MQ.cfg.n;
  S.mqBest ||= {}; MQ.newBest = !MQ.cfg.src && MQ.score > (S.mqBest[bk] || 0); if(MQ.newBest) S.mqBest[bk] = MQ.score;
  if(MQ.mode === "week"){ const w = S.mqWeek && S.mqWeek.key === key ? S.mqWeek : { key, best: 0, n: 0 }; w.n++; w.best = Math.max(w.best, MQ.score); S.mqWeek = w; }
  const st = awardXP(Math.max(1, MQ.ok)); save(); render();
  setTimeout(() => (MQ.newBest && MQ.score > 0) || (MQ.chal && MQ.chal.score != null && MQ.score > MQ.chal.score) ? confetti("level") : sfx("complete"), 200);
  if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
  if(AUTH && MQ.mode !== "live") mqSubmit(key);
}
// ---------- topplister ----------
function mqErr(e){
  const c = String((e && (e.msg || e.message)) || "");
  if(e && e.kind === "auth") return T("Logg inn for å spille live og komme på topplister.", "Log in to play live and get on the leaderboards.");
  if(e && e.kind === "offline") return T("Ingen nettforbindelse.", "No connection.");
  if(/not_found/.test(c)) return T("Fant ikke rommet. Sjekk koden.", "Room not found. Check the code.");
  if(/full/.test(c)) return T("Rommet er fullt.", "The room is full.");
  if(/rate/.test(c)) return T("Du har laget mange rom. Vent litt.", "You have created many rooms. Wait a bit.");
  if(/function|does not exist|schema cache/i.test(c) || (e && e.status === 404)) return T("Live-spill og topplister er ikke slått på ennå.", "Live games and leaderboards are not enabled yet.");
  return T("Noe gikk galt. Prøv igjen.", "Something went wrong. Try again.");
}
async function mqSubmit(key){
  const m = MQ; m.board = { key, rows: null };
  try{ await frRpc("mq_submit", { p_key: key, p_score: m.score, p_ok: m.ok, p_name: S.name || "", p_av: S.avatar || null }); }catch(e){ m.board.err = mqErr(e); if(MQ === m && screen === "mq") render(); return; }
  mqBoard(key);
}
async function mqBoard(key){
  const m = MQ; m.board = Object.assign(m.board && m.board.key === key ? m.board : {}, { key, err: null });
  try{ m.board.rows = await frRpc("mq_board", { p_key: key }) || []; }catch(e){ m.board.err = mqErr(e); }
  if(MQ === m && screen === "mq") render();
}
function mqShare(){
  const c = MQ.cfg, url = location.origin + location.pathname + "#/" + rtW("mq") + "/" + (c.src ? mqQuizPath(c, MQ.score, S.name) : [c.seed, c.lvl, c.n, c.secs, MQ.score, encodeURIComponent((S.name || "").replace(/\./g, " ").slice(0, 24))].join("."));
  const txt = c.src ? T(`Jeg fikk ${mqF(MQ.score)} poeng på quizen «${mqSrcName(c)}» på Axle. Klarer du mer? 🎯`, `I scored ${mqF(MQ.score)} on the quiz "${mqSrcName(c)}" on Axle. Can you beat it? 🎯`) : T(`Jeg fikk ${mqF(MQ.score)} poeng i hoderegning (${mqLvName(c.lvl).toLowerCase()}) på Axle. Klarer du å slå meg? 🧮`, `I scored ${mqF(MQ.score)} in mental maths (${mqLvName(c.lvl).toLowerCase()}) on Axle. Can you beat me? 🧮`);
  if(navigator.share) navigator.share({ title: "Axle", text: txt, url }).catch(() => {});
  else navigator.clipboard?.writeText(txt + " " + url).then(() => toast(T("Lenken er kopiert – send den til en venn!", "Link copied – send it to a friend!")), () => toast(url));
}

// ---------- live ----------
const mqStartAt = r => r.start_at ? Date.parse(r.start_at) - (Date.parse(r.now) - Date.now()) : null;
function mqLiveApply(r){
  if(!r || !MQ) return;
  const was = MQ.live && MQ.live.startAt;
  MQ.live = Object.assign(MQ.live || {}, { code: r.code, isHost: r.is_host, status: r.status, players: r.players || [], startAt: mqStartAt(r) });
  if(!MQ.cfg || MQ.cfg.seed !== r.cfg.seed) MQ.cfg = r.cfg;
  if(MQ.live.startAt && !was){ // spillet har startet: følg tidsplanen
    clearInterval(MQ.tick); Object.assign(MQ, { mode: "live", podDrawn: false, qs: mqQs(MQ.cfg), i: -1, score: 0, ok: 0, streak: 0, bestStreak: 0, times: [], chosen: null, gained: 0, view: "count" });
    MQ.tick = setInterval(mqTick, 100); render();
  } else if(screen === "mq" && ["lobby", "rev", "podium"].includes(MQ.view)) render();
}
async function mqLiveCreate(){
  if(!AUTH){ toast(mqErr({ kind: "auth" })); return; }
  MQ.busy = true; MQ.err = null; render();
  const cfg = { seed: 1 + Math.floor(Math.random() * 999999999), lvl: MQ.lvl, n: MQ.n, secs: MQ.secs };
  try{ const r = await frRpc("mq_create", { p_cfg: cfg, p_name: S.name || "", p_av: S.avatar || null }); MQ.busy = false; MQ.view = "lobby"; MQ.cfg = cfg; mqLiveApply(r); render(); mqPoll(1000); }
  catch(e){ MQ.busy = false; MQ.err = mqErr(e); render(); }
}
async function mqLiveJoin(code){
  code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
  if(code.length !== 5){ MQ.err = T("Koden har 5 tegn.", "The code has 5 characters."); render(); return; }
  if(!AUTH){ MQ.err = mqErr({ kind: "auth" }); render(); return; }
  MQ.busy = true; MQ.err = null; render();
  try{ const r = await frRpc("mq_join", { p_code: code, p_name: S.name || "", p_av: S.avatar || null }); await mqPrep(r.cfg); MQ.busy = false; MQ.view = "lobby"; MQ.cfg = r.cfg; mqLiveApply(r); render(); mqPoll(800); }
  catch(e){ MQ.busy = false; MQ.err = mqErr(e); render(); }
}
function mqPoll(ms){ clearTimeout(MQ.pollT); const m = MQ; m.pollT = setTimeout(async () => {
  if(MQ !== m || screen !== "mq" || !m.live || m.view === "menu") return;
  try{ const r = m.dirty ? await frRpc("mq_push", { p_code: m.live.code, p_state: mqLiveState() }) : await frRpc("mq_get", { p_code: m.live.code }); m.dirty = false; mqLiveApply(r); }
  catch(e){ if(/not_found/.test(String((e && (e.msg || e.message)) || "")) && m.view === "lobby"){ m.view = "menu"; m.live = null; m.err = T("Verten stengte rommet.", "The host closed the room."); render(); return; } }
  if(m.view === "podium" && m.podiumPolls != null && --m.podiumPolls <= 0) return;
  mqPoll(m.view === "q" ? 1500 : 1000); }, ms); }
const mqLiveState = () => ({ i: MQ.i, a: MQ.lastQ ?? -1, c: MQ.chosen ?? -1, s: MQ.score, k: MQ.ok, r: MQ.streak, g: MQ.gained });
function mqLivePush(){ MQ.dirty = true; mqPoll(150); }
function mqLiveTick(){
  const L = MQ.live; if(!L || !L.startAt) return;
  const now = Date.now(), el = now - L.startAt;
  if(el < 0){ if(MQ.view !== "count"){ MQ.view = "count"; render(); } const el2 = document.getElementById("mqcount"), n = String(Math.ceil(-el / 1000)); if(el2 && el2.textContent !== n){ el2.textContent = n; el2.classList.remove("pop"); void el2.offsetWidth; el2.classList.add("pop"); } return; }
  const sch = mqSched(); let idx = sch.findIndex(x => el < x.at + x.T + MQ_REV); if(idx < 0) idx = sch.length;
  if(idx >= sch.length){ if(MQ.view !== "podium"){ MQ.view = "podium"; MQ.podiumPolls = 4; MQ.dirty = true; mqPoll(100); clearInterval(MQ.tick);
      const me = mqRanked().findIndex(p => p.me); awardXP(Math.max(1, MQ.ok)); save(); render(); setTimeout(() => me === 0 ? confetti("level") : sfx("complete"), 300); } return; }
  const within = el - sch[idx].at, T0 = sch[idx].T;
  if(within < T0){ if(MQ.i !== idx || MQ.view !== "q"){ MQ.i = idx; MQ.chosen = null; MQ.gained = 0; MQ.qStart = L.startAt + sch[idx].at; MQ.view = "q"; render(); } mqBar(T0 - within);
    const n = document.getElementById("mqans"); if(n) n.textContent = mqAnsweredTxt(); }
  else if(MQ.view !== "rev" || MQ.i !== idx){ MQ.i = idx; if(MQ.chosen == null && !(MQ.qs[idx] || {}).poll){ MQ.streak = 0; MQ.gained = 0; } MQ.view = "rev"; MQ.dirty = true; mqPoll(100); render(); }
}
// Alle spillere sortert etter poeng. Min egen poengsum er alltid den lokale (nyest).
const mqTeach = () => !!(MQ && MQ.cfg && MQ.cfg.src && MQ.live && MQ.live.isHost); // læreren viser quizen på tavla og spiller ikke selv
// Lag (cfg.teams = 2–4, valgt av læreren): spillerne fordeles etter rekkefølgen de ble med i (1, 2, 3, 1, 2, 3 …), likt på alle enheter.
const MQ_TEAMS = [["Blå", "Blue", "#2B59C3"], ["Rød", "Red", "#C8312A"], ["Grønn", "Green", "#1E8A55"], ["Gul", "Yellow", "#B07800"]];
const mqTeamsN = () => { const n = +(MQ && MQ.cfg && MQ.cfg.teams) || 0; return n >= 2 && n <= 4 ? n : 0; };
const mqTeamName = k => T("Lag " + MQ_TEAMS[k][0], "Team " + MQ_TEAMS[k][1]);
function mqRanked(){ const n = mqTeamsN(); return (MQ.live && MQ.live.players || []).filter(p => !(MQ.cfg && MQ.cfg.src && p.host)).map((p, i) => Object.assign({}, p, p.me ? { st: mqLiveState() } : {}, { team: n ? i % n : null })).sort((a, b) => ((b.st || {}).s || 0) - ((a.st || {}).s || 0)); }
// Lagstilling: snittet av medlemmenes poeng, så et lag med færre spillere ikke taper bare fordi det er mindre.
function mqTeamRank(ranked){ const n = mqTeamsN(); if(!n) return [];
  return Array.from({ length: n }, (_, k) => { const m = ranked.filter(p => p.team === k), sum = m.reduce((a, p) => a + ((p.st || {}).s || 0), 0); return { k, n: m.length, avg: m.length ? Math.round(sum / m.length) : 0, me: m.some(p => p.me) }; })
    .filter(x => x.n).sort((a, b) => b.avg - a.avg); }
function mqTeamBoardHTML(ranked){ const r = mqTeamRank(ranked); if(!r.length) return "";
  return `<section class="mq-board mq-teams"><h3>${esc(T("Lagene", "Teams"))}</h3>${r.map((x, i) => `<div class="mq-brow ${x.me ? "me" : ""}"><span class="mq-pos">${i + 1}</span><span class="mq-tdot" style="background:${MQ_TEAMS[x.k][2]}" aria-hidden="true"></span><b>${esc(mqTeamName(x.k))}</b><small>${esc(x.me ? T("ditt lag · snitt", "your team · avg.") : T(`${x.n} spillere · snitt`, `${x.n} players · avg.`))}</small><span class="mq-bs">${mqF(x.avg)}</span></div>`).join("")}</section>`; }
function mqAnsweredTxt(){ const ps = ((MQ.live && MQ.live.players) || []).filter(p => !(MQ.cfg && MQ.cfg.src && p.host)), n = ps.filter(p => p.me ? MQ.chosen != null : ((p.st || {}).a ?? -1) >= MQ.i).length; return T(`${n} av ${ps.length} har svart`, `${n} of ${ps.length} answered`); }
function mqLeave(){
  if(MQ){ clearInterval(MQ.tick); clearTimeout(MQ.pollT); if(MQ.live && MQ.view === "lobby") frRpc("mq_leave", { p_code: MQ.live.code }).catch(() => {}); }
  const back = (MQ && MQ.from) || "home"; MQ = null; screen = back === "mq" ? "home" : back; render();
}
const mqRoomUrl = () => location.origin + location.pathname + "#/" + rtW("mq") + "/live/" + MQ.live.code;
function mqShareRoom(){
  const url = mqRoomUrl(), txt = T(`Bli med på hoderegning live på Axle! Kode: ${MQ.live.code}`, `Join live mental maths on Axle! Code: ${MQ.live.code}`);
  if(navigator.share) navigator.share({ title: "Axle", text: txt, url }).catch(() => {});
  else navigator.clipboard?.writeText(url).then(() => toast(T("Lenken er kopiert!", "Link copied!")), () => toast(url));
}

// ---------- tegning ----------
const mqAv = (p, i, size) => p.me ? (meAvHTML(size, "fr-avs") || frAvatar(S.name || "?", 0, null, size)) : frAvatar(p.name || "?", i + 1, p.av, size);
const mqTop = (sub, title) => `<div class="top mq-top"><div class="wrap"><button class="iconbtn" data-a="mqback" aria-label="${esc(t("back"))}">${I.x}</button><div class="th-t"><small>${esc(sub)}</small><b>${esc(title)}</b></div>${MQ && MQ.qs && ["q", "rev"].includes(MQ.view) && !mqTeach() ? `<span class="mq-sc">${mqF(MQ.score)}</span>` : ""}</div></div>`;
function mqBoardHTML(b, title){
  if(!b) return "";
  if(b.err) return `<p class="mq-note">${esc(b.err)}</p>`;
  if(!b.rows) return `<p class="mq-note">${esc(T("Henter topplisten …", "Loading the leaderboard …"))}</p>`;
  if(!b.rows.length) return `<p class="mq-note">${esc(T("Ingen på topplisten ennå – bli den første!", "Nobody on the leaderboard yet – be the first!"))}</p>`;
  return `<section class="mq-board"><h3>🏆 ${esc(title || T("Toppliste", "Leaderboard"))}</h3>${b.rows.map((r, i) => `<div class="mq-brow ${r.me ? "me" : ""}"><span class="mq-pos">${r.pos <= 3 ? ["🥇", "🥈", "🥉"][r.pos - 1] : r.pos}</span>${frAvatar(r.name || "?", i, r.av, 30)}<b>${esc(r.name || T("Anonym", "Anonymous"))}${r.friend ? ` <small>${esc(T("venn", "friend"))}</small>` : ""}${r.me ? ` <small>${esc(T("deg", "you"))}</small>` : ""}</b><span class="mq-bs">${mqF(r.score)}</span></div>`).join("")}</section>`;
}
// nøkkel for avsløringen av spørsmål i: samme spill (start/frø) og samme spørsmål gir samme nøkkel
const mqRevKey = () => `${(MQ.live && MQ.live.startAt) || MQ.runId || 0}:${MQ.cfg && MQ.cfg.seed}:${MQ.i}`;
// Hvor mange som valgte hvert alternativ på spørsmålet som vises (bare live). Verten spiller ikke i quiz.
const mqGraded = () => (MQ.qs || []).filter(q => !q.poll).length || MQ.cfg.n; // antall spørsmål med fasit
function mqCounts(q){
  const c = q.o.map(() => 0), ps = ((MQ.live && MQ.live.players) || []).filter(p => !(MQ.cfg && MQ.cfg.src && p.host));
  for(const p of ps){ const st = p.me ? { i: MQ.i, c: MQ.chosen ?? -1 } : (p.st || {}); if(st.i === MQ.i && st.c >= 0 && st.c < c.length) c[st.c]++; }
  return c;
}
function mqTiles(q, rev, anim = true){
  const cnt = rev && MQ.mode === "live" ? mqCounts(q) : null, tot = cnt ? Math.max(1, cnt.reduce((a, b) => a + b, 0)) : 1;
  const body = (v, i) => `${q.oi && q.oi[i] ? qimgHTML({ src: q.oi[i], alt: q.rich ? plain(v) : String(v) }, "opt") : ""}<kbd class="mq-key" aria-hidden="true">${i + 1}</kbd><b>${q.rich ? richBig(v) : mqN(v)}</b>`
    + (rev && i === q.k ? `<span class="mq-ck" aria-hidden="true">✓</span>` : "")
    + (cnt ? `<span class="mq-cnt" style="--p:${(cnt[i] / tot * 100).toFixed(0)}%"><i></i><em>${cnt[i]}</em></span>` : "");
  const poll = !!q.poll, hasImg = !!(q.oi && q.oi.some(Boolean));
  return `<div class="mq-tiles ${q.rich ? "quiz" : ""} ${hasImg ? "imgs" : ""} ${rev ? "rev" : ""} ${poll ? "poll" : ""} ${rev && !anim ? "still" : ""} ${MQ.chosen != null && !rev ? "sent" : ""}">${q.o.map((v, i) => {
    if(mqTeach()) return `<div class="mq-tile ${rev && !poll ? (i === q.k ? "ok" : "dim") : ""}" style="--c:${MQ_COL[i]}">${body(v, i)}</div>`;
    const st = rev ? (poll ? (i === MQ.chosen ? "pick" : "") : i === q.k ? "ok" : i === MQ.chosen ? "bad" : "dim") : MQ.chosen != null ? (i === MQ.chosen ? "pick" : "dim") : "";
    return `<button class="mq-tile ${st}" style="--c:${MQ_COL[i]}" data-a="mqans" data-i="${i}" ${rev || MQ.chosen != null ? "disabled" : ""} aria-label="${esc(q.rich ? plain(v) : mqN(v))}${cnt ? esc(T(`: ${cnt[i]} svar`, `: ${cnt[i]} answers`)) : ""}">${body(v, i)}</button>`; }).join("")}</div>`;
}
function mqResultBanner(q, anim = true){
  const pop = anim ? " pop" : "";
  if(q.poll) return `<div class="mq-res poll${pop}"><b>${esc(mqTeach() ? T("Slik svarte klassen", "How the class answered") : MQ.chosen == null || MQ.chosen < 0 ? T("Du svarte ikke", "You didn't answer") : T("Takk for svaret!", "Thanks for answering!"))}</b><span>${esc(T("Avstemning – ingen riktig svar", "Poll – no right answer"))}</span></div>`;
  if(mqTeach()) return `<div class="mq-res ok${pop}"><b>${esc(T("Riktig svar", "Correct answer"))}</b><span>${richBig(q.a)}</span></div>`;
  const ok = MQ.chosen === q.k;
  return `<div class="mq-res ${ok ? "ok" : "bad"}${pop}"><b>${ok ? T("Riktig!", "Correct!") : MQ.chosen == null || MQ.chosen < 0 ? T("For sent!", "Too late!") : T("Feil", "Wrong")}</b>${ok ? `<span>+${mqF(MQ.gained)}</span>${MQ.streak > 1 ? `<span class="mq-fire">⚡×${String(mqMult(MQ.streak)).replace(".", LANG === "en" ? "." : ",")} · ${MQ.streak} ${esc(T("på rad", "in a row"))}</span>` : ""}` : `<span>${esc(T("Svaret er", "The answer is"))} ${q.rich ? richBig(q.a) : mqN(q.a)}</span>`}</div>`;
}
function renderMq(){
  if(!MQ){ const a = MQ_PENDING; MQ_PENDING = null; mqOpen(a); return; }
  const v = MQ.view, lv = MQ_LV();
  if(v === "menu"){
    const wk = mqWeekKey(), my = S.mqWeek && S.mqWeek.key === wk ? S.mqWeek.best : 0, best = (S.mqBest || {})[MQ.lvl + "." + MQ.n] || 0, ch = MQ.chal;
    $app.innerHTML = `${mqTop(T("Spill", "Games"), T("Hoderegning", "Mental maths"))}<main class="wrap mq-menu">
      ${ch ? `<section class="mq-chal"><span class="mq-chic">⚔️</span><div><b>${esc(ch.score != null ? T(`${ch.name || "En venn"} utfordrer deg!`, `${ch.name || "A friend"} challenges you!`) : T("Du har fått en utfordring", "You got a challenge"))}</b>
        <small>${esc(mqSrcName(ch.cfg))} · ${ch.cfg.n} ${esc(mqWord(ch.cfg))} · ${ch.cfg.secs} s${ch.score != null ? " · " + esc(T(`å slå: ${mqF(ch.score)} poeng`, `to beat: ${mqF(ch.score)} points`)) : ""}</small></div>
        <button class="big" data-a="mqchal">${esc(T("Ta utfordringen", "Take the challenge"))}</button></section>` : ""}
      <section class="mq-hero"><div class="mq-hq" aria-hidden="true"><span>7 × 8</span><i>=</i><span>?</span></div><h2>${esc(T("Regn i hodet – kjappest vinner", "Calculate in your head – fastest wins"))}</h2>
        <p>${esc(T("Velg blant fire svar – med fingeren eller tastene 1–4. Riktig svar gir 100 lynpoeng pluss inntil 100 for fart, og svar på rad gir lynfaktor opptil ×1,5.", "Pick one of four answers – tap or press 1–4. A correct answer gives 100 lightning points plus up to 100 for speed, and answers in a row give a multiplier up to ×1.5."))}</p></section>
      <h3 class="mq-h">${esc(T("Nivå", "Level"))}</h3>
      <div class="mq-lvls">${lv.map(([n, name, ex, sub]) => `<button class="mq-lv ${MQ.lvl === n ? "on" : ""}" data-a="mqlvl" data-n="${n}"><span>${esc(ex)}</span><b>${esc(name)}</b><small>${esc(sub)}</small></button>`).join("")}</div>
      <div class="mq-opts"><div><h3 class="mq-h">${esc(T("Antall stykker", "Problems"))}</h3><div class="seg">${[10, 15, 20].map(n => `<button class="${MQ.n === n ? "on" : ""}" data-a="mqn" data-n="${n}">${n}</button>`).join("")}</div></div>
        <div><h3 class="mq-h">${esc(T("Tid per stykke", "Time per problem"))}</h3><div class="seg">${[5, 10, 20].map(n => `<button class="${MQ.secs === n ? "on" : ""}" data-a="mqsecs" data-n="${n}">${n} s</button>`).join("")}</div></div></div>
      <button class="big mq-go" data-a="mqsolo">▶ ${esc(T("Spill alene", "Play solo"))}</button>${best ? `<p class="mq-rec">🏆 ${esc(T(`Rekord på dette nivået: ${mqF(best)} poeng`, `Record at this level: ${mqF(best)} points`))}</p>` : ""}
      <section class="mq-card mq-live"><div class="mq-ch"><span>⚡</span><div><b>${esc(T("Lynrom med venner", "Live room with friends"))}</b><small>${esc(T("Lag et rom, del koden, og alle får samme stykke samtidig. Toppliste etter hvert stykke og pall til slutt.", "Create a room, share the code, and everyone gets the same problem at once. Leaderboard after each problem and a podium at the end."))}</small></div></div>
        ${MQ.err ? `<p class="du-err">${esc(MQ.err)}</p>` : ""}
        ${AUTH ? `<button class="big" data-a="mqcreate" ${MQ.busy ? "disabled" : ""}>${esc(MQ.busy ? T("Et øyeblikk …", "One moment …") : T("Lag et rom", "Create a room"))}</button>
          <div class="du-join"><input id="mqjoin" maxlength="5" autocapitalize="characters" autocomplete="off" placeholder="${esc(T("Kode", "Code"))}" value="${esc(MQ.joinCode || "")}" aria-label="${esc(T("Kode", "Code"))}"><button class="big ghost" data-a="mqjoin" ${MQ.busy ? "disabled" : ""}>${esc(T("Bli med", "Join"))}</button></div>`
          : `<button class="big" data-a="aclogin">${esc(T("Logg inn for å spille live", "Log in to play live"))}</button>`}</section>
      <section class="mq-card mq-week"><div class="mq-ch"><span>📅</span><div><b>${esc(T("Ukens hoderegning", "This week's mental maths"))}</b><small>${esc(T(`Alle får de samme ${MQ_WEEK.n} stykkene denne uka (${mqLvName(MQ_WEEK.lvl).toLowerCase()}, ${MQ_WEEK.secs} s). Spill når det passer – beste forsøk teller.`, `Everyone gets the same ${MQ_WEEK.n} problems this week (${mqLvName(MQ_WEEK.lvl).toLowerCase()}, ${MQ_WEEK.secs} s). Play when it suits you – your best attempt counts.`))}</small>${my ? `<small class="mq-wb">${esc(T(`Din beste denne uka: ${mqF(my)}`, `Your best this week: ${mqF(my)}`))}</small>` : ""}</div></div>
        <div class="mq-2"><button class="big" data-a="mqweek">${esc(my ? T("Prøv igjen", "Try again") : T("Spill", "Play"))}</button><button class="big ghost" data-a="mqwboard">${esc(T("Toppliste", "Leaderboard"))}</button></div>
        ${MQ.board && MQ.board.key === wk ? mqBoardHTML(MQ.board, T("Denne uka", "This week")) : ""}</section>
    </main>`;
    const inp = document.getElementById("mqjoin"); if(inp){ inp.addEventListener("input", () => { MQ.joinCode = inp.value.toUpperCase(); }); inp.addEventListener("keydown", e => { if(e.key === "Enter") mqLiveJoin(inp.value); }); }
    return;
  }
  if(v === "lobby"){
    const L = MQ.live, ps = L.players || [];
    const quiz = !!MQ.cfg.src, pl = quiz ? ps.filter(p => !p.host) : ps;
    $app.innerHTML = `${mqTop(T("Live", "Live"), mqTitleOf(MQ.cfg))}<main class="wrap mq-lobby ${mqTeach() ? "teach" : ""}">
      ${mqTeach() ? `<div class="mq-join"><div><p class="du-k">${esc(T("Gå til", "Go to"))} <b>${esc(location.host + location.pathname.replace(/\/$/, ""))}</b> → ${esc(T("Spill → Hoderegning", "Games → Mental maths"))} ${esc(T("og skriv koden", "and type the code"))}</p><div class="du-code">${esc(L.code)}</div>
        <p class="mq-cfg">${esc(mqSrcName(MQ.cfg))} · ${MQ.cfg.n} ${esc(mqWord(MQ.cfg))} · ${MQ.cfg.secs} s</p></div><div class="qr mq-qr" data-qr="${esc(mqRoomUrl())}" aria-label="${esc(T("QR-kode til rommet", "QR code for the room"))}"></div></div>
        <p class="mq-note">${esc(T("Eller skann QR-koden med mobilkameraet. Elevene trenger en gratis konto for å bli med.", "Or scan the QR code with the phone camera. Students need a free account to join."))}</p>`
      : `<p class="du-k">${esc(T("Koden til rommet", "Room code"))}</p><div class="du-code">${esc(L.code)}</div>
      <p class="mq-cfg">${esc(mqSrcName(MQ.cfg))} · ${MQ.cfg.n} ${esc(mqWord(MQ.cfg))} · ${MQ.cfg.secs} s</p>`}
      <button class="big ghost" data-a="mqshareroom">${esc(T("Del lenke til rommet", "Share a link to the room"))}</button>
      <h3 class="mq-h">${esc(quiz ? T(`Elever (${pl.length})`, `Students (${pl.length})`) : T(`Spillere (${ps.length})`, `Players (${ps.length})`))}</h3>
      ${mqTeamsN() ? `<p class="mq-note">${esc(T(`${mqTeamsN()} lag: spillerne fordeles etter rekkefølgen de ble med i. Lagpoeng er snittet av medlemmenes poeng.`, `${mqTeamsN()} teams: players are split in the order they joined. Team points are the members\u2019 average.`))}</p>` : ""}<div class="mq-pl">${pl.map((p, i) => { const k = mqTeamsN() && !(quiz && p.host) ? i % mqTeamsN() : null;
        return `<span class="mq-p ${p.me ? "me" : ""} ${k != null ? "team" : ""}" ${k != null ? `style="--tc:${MQ_TEAMS[k][2]}"` : ""}>${mqAv(p, i, 34)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b>${p.host ? `<small>${esc(T("vert", "host"))}</small>` : k != null ? `<small>${esc(mqTeamName(k))}</small>` : ""}</span>`; }).join("")}</div>
      ${L.isHost ? `<button class="big mq-go" data-a="mqlstart">${esc(quiz ? (pl.length ? T("Start quizen!", "Start the quiz!") : T("Start (venter på elever)", "Start (waiting for students)")) : ps.length > 1 ? T("Start spillet!", "Start the game!") : T("Start (vent gjerne på flere)", "Start (or wait for more)"))}</button>` : `<p class="du-wt"><span class="du-dots"><i></i><i></i><i></i></span> ${esc(T("Venter på at verten starter …", "Waiting for the host to start …"))}</p>`}
    </main>`;
    qrFill();
    return;
  }
  if(v === "count"){
    const n = MQ.mode === "live" ? Math.max(1, Math.ceil((MQ.live.startAt - Date.now()) / 1000)) : Math.max(1, Math.ceil((MQ.goAt - Date.now()) / 1000));
    $app.innerHTML = `${mqTop(mqSrcName(MQ.cfg), mqTitleOf(MQ.cfg))}<main class="wrap mq-count"><div class="du-count pop" id="mqcount">${n}</div><p>${esc(T("Gjør deg klar!", "Get ready!"))}</p>${mqTeach() ? "" : `<small>${esc(T("Tips: trykk 1–4 på tastaturet", "Tip: press 1–4 on the keyboard"))}</small>`}</main>`;
    return;
  }
  if(v === "q" || v === "rev"){
    const q = MQ.qs[MQ.i], rev = v === "rev", live = MQ.mode === "live";
    // «Riktig svar»-animasjonen spilles én gang per spørsmål: første gang visningen går fra spørsmål til avslørt svar.
    // Skjermen tegnes på nytt flere ganger i avsløringen (polling, toppliste); da er nøkkelen den samme, og animasjonen står stille.
    const revKey = mqRevKey(), anim = rev && MQ.revAnimKey !== revKey; if(rev) MQ.revAnimKey = revKey;
    const ranked = live && rev ? mqRanked() : null, myPos = ranked ? ranked.findIndex(p => p.me) : -1;
    $app.innerHTML = `${mqTop(`${MQ.i + 1} / ${MQ.qs.length}`, mqTitleOf(MQ.cfg))}<main class="wrap mq-play">
      <div class="mq-qc ${q.rich ? "quiz" : ""}">${q.img ? qimgHTML(q.img, "mq") : ""}<div class="mq-q">${q.rich ? richBig(q.q) : `${esc(q.q)} <i>= ?</i>`}</div>${!rev ? `<div class="mq-timer"><span id="mqsec">${mqSecsOf(MQ.i)}</span><div class="mq-bar"><i id="mqbar"></i></div></div>` : mqResultBanner(q, anim)}</div>
      ${mqTiles(q, rev, anim)}
      ${rev && q.rich && q.e ? `<div class="mq-expl">${rich(q.e)}</div>` : ""}
      ${live && !rev ? `<p class="mq-wait" id="mqans">${esc(mqAnsweredTxt())}</p>${MQ.chosen != null && !mqTeach() ? `<p class="mq-sent">${esc(T("Svar sendt! Venter på de andre …", "Answer sent! Waiting for the others …"))}</p>` : ""}` : ""}
      ${ranked && mqTeamsN() ? mqTeamBoardHTML(ranked) : ""}${ranked ? `<section class="mq-board mq-live-b"><h3>${esc(mqTeach() ? T("Toppliste", "Leaderboard") : T(`Du er nr. ${myPos + 1} av ${ranked.length}`, `You are #${myPos + 1} of ${ranked.length}`))}</h3>${ranked.slice(0, 5).map((p, i) => `<div class="mq-brow ${p.me ? "me" : ""}"><span class="mq-pos">${i + 1}</span>${mqAv(p, i, 30)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}${(p.st || {}).r > 1 ? ` <small>🔥${p.st.r}</small>` : ""}</b><span class="mq-bs">${mqF((p.st || {}).s || 0)}</span></div>`).join("")}</section>` : ""}
      ${!live && rev ? (() => { const ms = Math.max(0, MQ.revUntil - Date.now()); // går videre av seg selv: vis hvor lenge, «Neste» hopper over
        return `<div class="next-dock" data-k="mq${MQ.i}"><div class="ge-act-row"><span class="ge-auto"><i style="animation-duration:${ms}ms" aria-hidden="true"></i><small>${esc(T(`Går videre om ${nf(ms / 1000, 1)} sekunder`, `Moving on in ${nf(ms / 1000, 1)} seconds`))}</small></span><button class="big mq-next ge-next" data-a="mqnext">${esc(T("Neste nå", "Next now"))} →</button></div></div>`; })() : ""}
    </main>`;
    if(!rev) mqBar(MQ.cfg.secs * 1000 - (Date.now() - MQ.qStart));
    return;
  }
  if(v === "podium"){
    const r = mqRanked(), me = r.findIndex(p => p.me), top = [r[1], r[0], r[2]], an = !MQ.podDrawn; MQ.podDrawn = true;
    $app.innerHTML = `${mqTop(T("Live", "Live"), T("Resultat", "Results"))}<main class="wrap mq-end">
      <div class="mq-pod ${an ? "anim" : ""}">${top.map((p, j) => p ? `<div class="mq-pc p${[2, 1, 3][j]} ${p.me ? "me" : ""}">${mqAv(p, j, j === 1 ? 64 : 50)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b><span>${mqF((p.st || {}).s || 0)}</span><div class="mq-pb">${[2, 1, 3][j]}</div></div>` : `<div class="mq-pc empty"></div>`).join("")}</div>
      ${mqTeamsN() ? (() => { const tr = mqTeamRank(r); return tr.length ? `<p class="mq-twin" style="--tc:${MQ_TEAMS[tr[0].k][2]}">🏆 ${esc(T(`${mqTeamName(tr[0].k)} vant!`, `${mqTeamName(tr[0].k)} won!`))}</p>${mqTeamBoardHTML(r)}` : ""; })() : ""}
      <h2>${esc(mqTeach() ? T("Gratulerer til alle! 🎉", "Well done, everyone! 🎉") : me === 0 ? T("Du vant! 🏆", "You won! 🏆") : T(`Du ble nr. ${me + 1}`, `You came #${me + 1}`))}</h2>
      ${mqTeach() ? "" : `<p class="mq-stat">${esc(T(`${MQ.ok} av ${mqGraded()} riktige · ${mqF(MQ.score)} poeng · lengste rekke ${MQ.bestStreak}`, `${MQ.ok} of ${mqGraded()} correct · ${mqF(MQ.score)} points · longest streak ${MQ.bestStreak}`))}</p>`}
      ${r.length > 3 ? `<section class="mq-board">${r.slice(3).map((p, i) => `<div class="mq-brow ${p.me ? "me" : ""}"><span class="mq-pos">${i + 4}</span>${mqAv(p, i + 3, 30)}<b>${esc(p.me ? T("Deg", "You") : p.name || "?")}</b><span class="mq-bs">${mqF((p.st || {}).s || 0)}</span></div>`).join("")}</section>` : ""}
      <button class="big" data-a="mqmenu">${esc(T("Spill igjen", "Play again"))}</button></main>`;
    return;
  }
  if(v === "end"){
    const ch = MQ.mode === "chal" && MQ.chal && MQ.chal.score != null ? MQ.chal : null, avg = MQ.times.length ? MQ.times.reduce((a, b) => a + b, 0) / MQ.times.length / 1000 : 0;
    const won = ch && MQ.score > ch.score, tie = ch && MQ.score === ch.score;
    $app.innerHTML = `${mqTop(mqSrcName(MQ.cfg), MQ.mode === "week" ? T("Ukens hoderegning", "This week's mental maths") : mqTitleOf(MQ.cfg))}<main class="wrap mq-end">
      <div class="mq-big">${mqF(MQ.score)}<small>${esc(T("poeng", "points"))}</small></div>
      ${MQ.newBest && MQ.score > 0 ? `<p class="mq-rec">🏆 ${esc(T("Ny rekord!", "New record!"))}</p>` : ""}
      <div class="mq-stats"><span><b>${MQ.ok}/${MQ.cfg.n}</b><small>${esc(T("riktige", "correct"))}</small></span><span><b>${avg ? avg.toFixed(1).replace(".", LANG === "en" ? "." : ",") + " s" : "–"}</b><small>${esc(T("snittid", "avg. time"))}</small></span><span><b>🔥 ${MQ.bestStreak}</b><small>${esc(T("lengste rekke", "best streak"))}</small></span></div>
      ${ch ? `<section class="mq-vs ${won ? "won" : tie ? "" : "lost"}"><div><b>${esc(T("Deg", "You"))}</b><span>${mqF(MQ.score)}</span></div><i>VS</i><div><b>${esc(ch.name || T("Venn", "Friend"))}</b><span>${mqF(ch.score)}</span></div><p>${esc(won ? T("Du vant utfordringen! 🎉", "You won the challenge! 🎉") : tie ? T("Helt likt!", "A tie!") : T("Ikke denne gangen – prøv igjen!", "Not this time – try again!"))}</p></section>` : ""}
      <div class="mq-2"><button class="big" data-a="mqagain">${esc(T("Spill igjen", "Play again"))}</button><button class="big ghost" data-a="mqshare">⚔️ ${esc(ch ? T("Utfordre tilbake", "Challenge back") : T("Utfordre en venn", "Challenge a friend"))}</button></div>
      ${MQ.mode !== "solo" ? mqBoardHTML(MQ.board, MQ.mode === "week" ? T("Denne uka", "This week") : T("Alle som har tatt utfordringen", "Everyone who took the challenge")) : ""}
      ${!AUTH ? `<p class="mq-note">${esc(T("Logg inn for å komme på topplistene.", "Log in to get on the leaderboards."))}</p>` : ""}
      <button class="big ghost" data-a="mqmenu">${esc(T("Til menyen", "Back to the menu"))}</button></main>`;
  }
}
function mqClick(a, b){
  if(a === "mqopen"){ overlay = null; mqOpen(null, screen); return true; }
  if(!a.startsWith("mq") || !MQ) return false;
  const d = (b && b.dataset) || {}, solo = () => ({ seed: 1 + Math.floor(Math.random() * 999999999), lvl: MQ.lvl, n: MQ.n, secs: MQ.secs });
  if(a === "mqback"){ if(["q", "rev", "count"].includes(MQ.view) && MQ.mode !== "live"){ clearInterval(MQ.tick); MQ.view = "menu"; render(); return true; } mqLeave(); return true; }
  if(a === "mqlvl"){ MQ.lvl = S.mqLvl = +d.n; save(); render(); return true; }
  if(a === "mqn"){ MQ.n = S.mqN = +d.n; save(); render(); return true; }
  if(a === "mqsecs"){ MQ.secs = S.mqSecs = +d.n; save(); render(); return true; }
  if(a === "mqsolo"){ mqStart("solo", solo()); return true; }
  if(a === "mqchal"){ mqStart("chal", MQ.chal.cfg); return true; }
  if(a === "mqweek"){ const k = mqWeekKey(); mqStart("week", Object.assign({ seed: mqHash(k) }, MQ_WEEK)); return true; }
  if(a === "mqwboard"){ if(!AUTH){ toast(mqErr({ kind: "auth" })); return true; } MQ.board = { key: mqWeekKey(), rows: null }; render(); mqBoard(mqWeekKey()); return true; }
  if(a === "mqans"){ mqAnswer(+d.i); return true; }
  if(a === "mqnext"){ MQ.revUntil = 0; mqTick(); return true; }
  if(a === "mqagain"){ if(MQ.mode === "solo") mqStart("solo", solo()); else mqStart(MQ.mode, MQ.cfg); return true; }
  if(a === "mqshare"){ mqShare(); return true; }
  if(a === "mqmenu"){ clearInterval(MQ.tick); clearTimeout(MQ.pollT); MQ.view = "menu"; MQ.live = null; MQ.board = null; MQ.err = null; render(); return true; }
  if(a === "mqcreate"){ mqLiveCreate(); return true; }
  if(a === "mqjoin"){ mqLiveJoin((document.getElementById("mqjoin") || {}).value || MQ.joinCode); return true; }
  if(a === "mqshareroom"){ mqShareRoom(); return true; }
  if(a === "mqlstart"){ frRpc("mq_start", { p_code: MQ.live.code }).then(mqLiveApply).catch(e => toast(mqErr(e))); return true; }
  return false;
}
document.addEventListener("keydown", e => {
  if(screen !== "mq" || !MQ || overlay || (e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) return;
  if(MQ.view === "q" && /^[1-4]$/.test(e.key)){ e.preventDefault(); mqAnswer(+e.key - 1); }
  else if(MQ.view === "rev" && MQ.mode !== "live" && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); MQ.revUntil = 0; mqTick(); }
});
