// ============================================================
//  Eksamensmodus – «Prøveeksamen» / «Practice exam»
//  Faste oppgavesett bygd av appens egen oppgavebank: samme oppgaver («formen»)
//  for et gitt sett, men generatorene gir nye tall ved hvert forsøk.
//  Lastes FØR app.js: toppnivået her definerer bare funksjoner og konstanter.
// ============================================================
const EXAMS_PER_COURSE = 3;
const EX_PTS = { mc: 2, num: 4 };          // poeng per deloppgave
const EX_MIN = { mc: 1.5, num: 4 };        // anbefalt tid (minutter) per deloppgave
const EX_TIMES = [60, 120, 180, 240];      // faste tidsvalg (minutter)
const EX_EXTRAS = [0, 15, 30, 60];         // ekstra tid (minutter)
// kjøretidstilstand (ikke lagret): oppsett, siste resultat, kladd per deloppgave, tidtaker
const EX = { setup: null, res: null, scr: {}, timer: 0, saveT: 0, bound: false, filter: "all", bp: {}, kind: {} };

const exSvg = (p, s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const EXI = {
  grid: exSvg('<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>', 18),
  doc: exSvg('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>', 20),
  clock: exSvg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>', 20),
  left: exSvg('<path d="m15 6-6 6 6 6"/>', 18),
  right: exSvg('<path d="m9 6 6 6-6 6"/>', 18),
  flag: exSvg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', 18),
  flagOn: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M5 4h11l-2 4 2 4H5z" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>',
  ok: exSvg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 18),
  bad: exSvg('<path d="M6 6l12 12M18 6 6 18"/>', 18)
};

// ---------- deterministisk tilfeldighet ----------
function exHash(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function exRng(seed) { // mulberry32
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
}
function exShuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// Hvilken type gir en generator? Prøvekjøres med et fast frø (Math.random byttes ut midlertidig),
// så svaret er det samme hver gang. Brukes til 60/40-fordelingen, rekkefølgen og poeng/tid i oversikten.
function exGenKind(c, u, j) {
  const key = c.code + ":" + u + ".g" + j;
  if (EX.kind[key]) return EX.kind[key];
  const g = (c.units[u].gen || [])[j], orig = Math.random; let mc = 0, kind = "num";
  try { Math.random = exRng(exHash(key)); for (let k = 0; k < 4; k++) { const q = g(); if (q && Array.isArray(q[1])) mc++; } kind = mc === 4 ? "mc" : "num"; }
  catch (e) { kind = "num"; }
  finally { Math.random = orig; }
  return (EX.kind[key] = kind);
}

// ---------- oppgavesett (blueprint) ----------
// examBlueprint(c, v): v = 1..EXAMS_PER_COURSE. Én «Oppgave» per enhet, n deloppgaver per enhet,
// ca. 60 % regneoppgaver og 40 % flervalg. Hver kandidatliste får en fast (seeded) permutasjon per fag,
// og variant v tar et utsnitt med forskjøvet startpunkt, slik at variantene overlapper minst mulig.
function examBlueprint(c, v) {
  const key = c.code + ":" + v;
  if (EX.bp[key]) return EX.bp[key];
  const U = c.units.length, n = Math.min(7, Math.max(3, Math.round(24 / U)));
  const vr = exRng(exHash(c.code + ":" + v)), tasks = [];
  c.units.forEach((unit, u) => {
    const mc = [], num = [];
    unit.qs.forEach((q, i) => (Array.isArray(q[1]) ? mc : num).push(u + "." + i));
    (unit.gen || []).forEach((_, j) => (exGenKind(c, u, j) === "mc" ? mc : num).push(u + ".g" + j));
    const pr = exRng(exHash(c.code + ":u" + u)); // samme permutasjon for alle varianter
    const pm = exShuffle(mc, pr), pn = exShuffle(num, pr);
    let nn = Math.min(pn.length, Math.round(n * 0.6));
    const nm = Math.min(pm.length, n - nn);
    nn = Math.min(pn.length, n - nm);
    const take = (list, k) => { const s = Math.floor((v - 1) * list.length / EXAMS_PER_COURSE); const out = []; for (let i = 0; i < k; i++) out.push(list[(s + i) % list.length]); return out; };
    const parts = exShuffle(take(pm, nm), vr).map(id => ({ id, kind: "mc" }))
      .concat(exShuffle(take(pn, nn), vr).map(id => ({ id, kind: "num" })));
    if (!parts.length) return;
    const nMC = parts.filter(p => p.kind === "mc").length, nNum = parts.length - nMC;
    tasks.push({ u, parts, nMC, nNum, pts: nMC * EX_PTS.mc + nNum * EX_PTS.num });
  });
  const nMC = tasks.reduce((s, x) => s + x.nMC, 0), nNum = tasks.reduce((s, x) => s + x.nNum, 0);
  const recMin = Math.max(15, Math.ceil((nMC * EX_MIN.mc + nNum * EX_MIN.num) / 15) * 15);
  return (EX.bp[key] = { code: c.code, v, tasks, nParts: nMC + nNum, nMC, nNum, pts: tasks.reduce((s, x) => s + x.pts, 0), recMin });
}

// ---------- hjelpere ----------
function exPrefs() {
  if (!S.examPrefs || typeof S.examPrefs !== "object") S.examPrefs = {};
  const P = S.examPrefs;
  if (!(P.time === "rec" || P.time === "custom" || P.time === "none" || EX_TIMES.includes(P.time))) P.time = "rec";
  if (!(Number.isInteger(P.custom) && P.custom >= 5 && P.custom <= 600)) P.custom = 90;
  if (!EX_EXTRAS.includes(P.extra)) P.extra = 0;
  return P;
}
function exBaseMinutes(bp, P) { return P.time === "rec" ? bp.recMin : P.time === "custom" ? P.custom : P.time === "none" ? null : P.time; }
function exDur(min) { min = Math.max(0, Math.round(min)); return t("exDur", Math.floor(min / 60), min % 60); }
function exClock(ms, up, short) {
  const s = Math.max(0, up ? Math.floor(ms / 1000) : Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60, p2 = k => String(k).padStart(2, "0");
  return short && !h ? m + ":" + p2(x) : h + ":" + p2(m) + ":" + p2(x);
}
function exTimerText(r) { const now = Date.now(); return r.deadline != null ? exClock(r.deadline - now) : exClock(now - r.startedAt, true); }
function exLeftText(r) { return r.deadline != null ? t("exLeft", exClock(r.deadline - Date.now(), false, true)) : t("exNoLimitShort"); }
function exLow(r) { return r.deadline != null && r.deadline - Date.now() < 5 * 60000; }
function examGradeOf(pct) { return pct >= 89 ? "A" : pct >= 77 ? "B" : pct >= 65 ? "C" : pct >= 53 ? "D" : pct >= 41 ? "E" : "F"; }
function exHasAnswer(x, a) { return x.it.type === "mc" ? (Number.isInteger(a) && a >= 0 && a < x.it.opts.length) : (a != null && String(a).trim() !== ""); }
function exAnsweredN(r) { return r.items.reduce((s, x, i) => s + (exHasAnswer(x, r.answers[i]) ? 1 : 0), 0); }
function exFlaggedN(r) { return r.items.reduce((s, x, i) => s + (r.flags[i] ? 1 : 0), 0); }
function exLetter(k) { return String.fromCharCode(97 + k) + ")"; }
function exUnitOf(x) { return +String(x.id).split(".")[0]; }
function exRunValid(r) {
  return !!(r && typeof r === "object" && COURSES.some(c => c.code === r.code) && Array.isArray(r.items) && r.items.length &&
    r.items.every(x => x && x.it && (x.it.type === "mc" ? Array.isArray(x.it.opts) : Number.isFinite(x.it.n))) && typeof r.startedAt === "number");
}
function examCheck(x, a) {
  const it = x.it, answered = exHasAnswer(x, a); let ok = false;
  if (answered) {
    if (it.type === "mc") ok = !!it.opts[a].ok;
    else { const v = parseNum(a); ok = Number.isFinite(v) && Math.abs(v - it.n) <= Math.max(it.tol, 1e-9); }
  }
  return { answered, ok, got: ok ? x.pts : 0 };
}

// ---------- start, lagring og tidtaker ----------
function examStart(code, v) {
  const c = COURSE(code), bp = examBlueprint(c, v), P = exPrefs(), items = [];
  bp.tasks.forEach(tk => {
    const parts = tk.parts.map(p => { const q = rawQ(c, p.id); return q ? makeItem(q, p.id) : null; }).filter(Boolean);
    parts.sort((a, b) => (a.type === "mc" ? 0 : 1) - (b.type === "mc" ? 0 : 1)); // flervalg først (stabil sortering)
    if (!parts.length) return;
    const task = items.length ? items[items.length - 1].task + 1 : 0;
    parts.forEach((it, k) => items.push({ id: it.id, task, part: k, pts: EX_PTS[it.type], it }));
  });
  if (!items.length) { toast(t("exEmpty")); return; }
  const base = exBaseMinutes(bp, P), extra = base == null ? 0 : P.extra, now = Date.now();
  S.examRun = { code: c.code, v, startedAt: now, deadline: base == null ? null : now + (base + extra) * 60000, minutes: base, extra,
    idx: 0, items, answers: {}, flags: {}, lang: LANG, paused: false, warned5: false };
  EX.scr = {}; overlay = null; save();
  examStartTicker(); screen = "exam"; render(); window.scrollTo(0, 0);
}
function examFlush() { if (EX.saveT) { clearTimeout(EX.saveT); EX.saveT = 0; save(); } }
function examStartTicker() { if (!EX.timer && S.examRun) EX.timer = setInterval(examTick, 1000); }
function examStopTicker() { if (EX.timer) { clearInterval(EX.timer); EX.timer = 0; } }
function examTick() {
  const r = S.examRun;
  if (!r) { examStopTicker(); return; }
  if (r.deadline != null) {
    const left = r.deadline - Date.now();
    if (left <= 0) { examTimeUp(); return; }
    if (left <= 5 * 60000 && !r.warned5 && (r.minutes || 0) + (r.extra || 0) > 5) { r.warned5 = true; save(); toast(t("exFiveLeft")); }
  }
  const low = exLow(r);
  document.querySelectorAll("[data-extime]").forEach(el => { el.textContent = exTimerText(r); });
  document.querySelectorAll("[data-exleft]").forEach(el => { el.textContent = exLeftText(r); });
  document.querySelectorAll(".extimer").forEach(el => el.classList.toggle("low", low));
}
function examTimeUp() {
  // midt i en vanlig leksjon: lever i bakgrunnen og vis resultatet senere fra forsiden
  const stay = screen === "lesson" || screen === "done" || screen === "fail";
  examSubmit(true, !stay);
  toast(t("exTimeUp"));
}
// Kalles fra app.js ved oppstart (og etter at lagret tilstand er byttet ut). enter=true: gå rett inn i en aktiv eksamen.
function examBoot(enter) {
  if (!EX.bound) {
    EX.bound = true;
    document.addEventListener("visibilitychange", () => { if (document.hidden) examFlush(); else examTick(); });
    window.addEventListener("pagehide", examFlush);
  }
  const r = S.examRun;
  if (!r) { examStopTicker(); return; }
  if (!exRunValid(r)) { S.examRun = null; saveLocal(); examStopTicker(); return; }
  if (r.deadline != null && Date.now() >= r.deadline) {
    if (enter) { examSubmit(true, false); overlay = null; screen = "examResult"; } // kalleren tegner skjermen
    else examSubmit(true, screen === "home" || screen === "exam");
    toast(t("exTimeUp"));
    return;
  }
  if (enter && !r.paused) screen = "exam";
  examStartTicker();
}
function examScHost() { // vertsobjekt for kladdearket under eksamen
  const r = S.examRun, i = r.idx, key = r.startedAt + ":" + i;
  return { item: r.items[i].it, scratchObj: (EX.scr[key] ||= {}), answered: false,
    setAnswer: v => { r.answers[i] = v; save(); } };
}

// ---------- innlevering og retting ----------
function examSubmit(auto, go) {
  const r = S.examRun; if (!r) return;
  clearTimeout(EX.saveT); EX.saveT = 0;
  const now = Date.now(), end = r.deadline != null ? Math.min(now, r.deadline) : now;
  const res = r.items.map((x, i) => examCheck(x, r.answers[i]));
  const score = res.reduce((s, x) => s + x.got, 0), max = r.items.reduce((s, x) => s + x.pts, 0);
  const pct = max ? Math.floor(score / max * 100 + 1e-9) : 0, grade = examGradeOf(pct);
  const secs = Math.max(0, Math.round((end - r.startedAt) / 1000)), answeredN = res.filter(x => x.answered).length;
  // historikk
  if (!S.exams || typeof S.exams !== "object") S.exams = {};
  const hc = (S.exams[r.code] ||= {}), h = (hc[r.v] ||= { attempts: 0, best: null, last: null });
  const prevBest = h.best ? h.best.pct : null;
  h.attempts = (h.attempts || 0) + 1; h.last = { pct, grade, at: now, secs };
  if (!h.best || pct > h.best.pct) h.best = { pct, grade, at: now };
  if (!Array.isArray(S.examLog)) S.examLog = [];
  S.examLog.push({ code: r.code, v: r.v, pct, grade, at: now, secs, score, max });
  while (S.examLog.length > 30) S.examLog.shift();
  // feil besvarte deloppgaver til «Repeter feil»
  const s = sub(r.code), w = new Set(s.wrong); let added = 0;
  res.forEach((x, i) => { if (x.answered && !x.ok && !w.has(r.items[i].id)) { w.add(r.items[i].id); added++; } });
  s.wrong = [...w];
  // XP (ingenting for en helt tom besvarelse)
  const xp = answeredN ? 20 + Math.round(pct / 5) : 0, st = xp ? awardXP(xp) : null;
  EX.res = { code: r.code, v: r.v, items: r.items, answers: r.answers, flags: r.flags, res, score, max, pct, grade, secs,
    minutes: r.minutes, extra: r.extra || 0, untimed: r.deadline == null, auto: !!auto, xp, added,
    newBest: prevBest != null && pct > prevBest, streakUp: !!(st && st.streakUp), streak: st ? st.streak : 0, unseen: !go };
  S.examRun = null; EX.scr = {}; EX.filter = "all";
  bdgToast(checkBadges()); if (st && st.goalHit) { setTimeout(confetti, 300); toast(t("goalHitTitle")); }
  save(); examStopTicker();
  if (go) { overlay = null; screen = "examResult"; render(); window.scrollTo(0, 0); }
}

// ---------- navigasjon ----------
function examGo(i) {
  const r = S.examRun; if (!r) return;
  r.idx = Math.max(0, Math.min(r.items.length - 1, i));
  EX.saveT && clearTimeout(EX.saveT); EX.saveT = 0;
  overlay = null; save(); render(); window.scrollTo(0, 0);
}
function examNav(d) {
  const r = S.examRun; if (!r) return;
  if (d > 0 && r.idx >= r.items.length - 1) { examFlush(); overlay = { exam: "submit" }; renderOverlay(); return; }
  examGo(r.idx + d);
}
function examInput(el) { // kalles fra input-hendelsen i app.js
  if (el.id === "exnum") {
    const r = S.examRun; if (!r || screen !== "exam") return;
    if (el.value.trim() === "") delete r.answers[r.idx]; else r.answers[r.idx] = el.value;
    exUpdateCounts(r);
    clearTimeout(EX.saveT); EX.saveT = setTimeout(() => { EX.saveT = 0; save(); }, 500);
  } else if (el.id === "excustom") {
    const v = parseInt(el.value, 10), P = exPrefs();
    if (Number.isInteger(v) && v >= 5 && v <= 600) { P.custom = v; save(); }
    const tot = document.querySelector("[data-extotal]"); if (tot && EX.setup) tot.textContent = exTotalText(examBlueprint(COURSE(EX.setup.code), EX.setup.v), P);
  }
}
function exUpdateCounts(r) {
  const a = exAnsweredN(r), n = r.items.length;
  document.querySelectorAll("[data-exans]").forEach(el => { el.textContent = a; });
  const pr = document.querySelector(".exprog"); if (pr) pr.setAttribute("aria-label", t("exAnsweredAria", a, n));
  const bar = document.querySelector(".exbar i"); if (bar) bar.style.width = (a / n * 100) + "%";
}
function examKey(e) { // tastatur på eksamensskjermen (overlays håndteres i app.js)
  const r = S.examRun; if (!r) return;
  const tag = (e.target && e.target.tagName || "").toLowerCase(), typing = tag === "input" || tag === "textarea";
  if (e.key === "Enter") {
    if (!typing && e.target.closest && e.target.closest("button")) return; // la knappen selv håndtere Enter
    e.preventDefault(); examNav(1);
  } else if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
  else if (/^[1-6]$/.test(e.key) && r.items[r.idx].it.type === "mc") {
    const i = +e.key - 1; if (i < r.items[r.idx].it.opts.length) { r.answers[r.idx] = i; save(); render(); }
  } else if (e.key === "ArrowRight" && r.idx < r.items.length - 1) examGo(r.idx + 1);
  else if (e.key === "ArrowLeft" && r.idx > 0) examGo(r.idx - 1);
}

// ---------- klikk (kalles fra app.js; returnerer true hvis håndtert) ----------
function examClick(a, b) {
  if (!a.startsWith("ex")) return false;
  const r = S.examRun;
  switch (a) {
    case "exjump": { const el = document.getElementById("exams"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); break; }
    case "exsetup": EX.setup = { code: b.dataset.c || S.current, v: +b.dataset.v || 1 }; overlay = null; screen = "examSetup"; render(); window.scrollTo(0, 0); break;
    case "extime": { const P = exPrefs(), v = b.dataset.t; P.time = /^\d+$/.test(v) ? +v : v; save(); render();
      if (v === "custom") { const inp = document.getElementById("excustom"); if (inp) { inp.focus({ preventScroll: true }); inp.select(); } } break; }
    case "exextra": exPrefs().extra = +b.dataset.x; save(); render(); break;
    case "exstart": if (!EX.setup) break; if (r) { overlay = { exam: "replace" }; renderOverlay(); } else examStart(EX.setup.code, EX.setup.v); break;
    case "exreplaceok": S.examRun = null; examStopTicker(); overlay = null; if (EX.setup) examStart(EX.setup.code, EX.setup.v); else { save(); goHome(); } break;
    case "exresume": if (r) { r.paused = false; save(); overlay = null; screen = "exam"; examStartTicker(); render(); window.scrollTo(0, 0); } break;
    case "exsel": if (r) { r.answers[r.idx] = +b.dataset.i; save(); render(); } break;
    case "exclear": if (r) { delete r.answers[r.idx]; save(); render(); } break;
    case "exnext": examNav(1); break;
    case "exprev": examNav(-1); break;
    case "exgo": examGo(+b.dataset.i); break;
    case "exflag": if (r) { if (r.flags[r.idx]) delete r.flags[r.idx]; else r.flags[r.idx] = true; save(); render(); } break;
    case "exov": if (r) { examFlush(); overlay = { exam: "overview" }; renderOverlay(); const cur = document.querySelector(".excell.cur"); if (cur) cur.focus({ preventScroll: true }); } break;
    case "exclose": if (r) { examFlush(); overlay = { exam: "close" }; renderOverlay(); } break;
    case "exlater": if (r) { r.paused = true; examFlush(); save(); goHome(); } break;
    case "exsubmit": if (r) { examFlush(); overlay = { exam: "submit" }; renderOverlay(); } break;
    case "exsubmitok": examSubmit(false, true); break;
    case "exdiscard": overlay = { exam: "discard" }; renderOverlay(); break;
    case "exdiscardok": S.examRun = null; EX.scr = {}; save(); examStopTicker(); goHome(); toast(t("exDiscarded")); break;
    case "exresult": if (EX.res) { EX.res.unseen = false; overlay = null; screen = "examResult"; render(); window.scrollTo(0, 0); } break;
    case "exreview": if (EX.res) { screen = "examReview"; render(); window.scrollTo(0, 0); } break;
    case "exretake": if (EX.res) { EX.setup = { code: EX.res.code, v: EX.res.v }; screen = "examSetup"; render(); window.scrollTo(0, 0); } break;
    case "exfilter": EX.filter = b.dataset.f === "wrong" ? "wrong" : "all"; render(); break;
    case "exrep": {
      const R = EX.res; if (!R) break; const i = +b.dataset.i, x = R.items[i], ans = R.answers[i]; if (!x) break;
      const yours = x.it.type === "mc" ? (exHasAnswer(x, ans) ? x.it.opts[ans].t : "") : (ans || "");
      openReport("report", reportContext(x.it, yours, { course: R.code, level: "exam" + R.v }));
      break;
    }
    default: return false;
  }
  return true;
}

// ---------- forsiden ----------
function examHomeActions(c) {
  let h = "";
  const r = S.examRun;
  if (r) {
    const rc = COURSE(r.code);
    h += `<button class="pill exgo" data-a="exresume"><span class="l1">${EXI.clock}<span>${esc(t("exContinue"))} · <span data-exleft>${esc(exLeftText(r))}</span></span></span><small>${esc(t("exName", r.v))} · ${esc(courseName(rc))}</small></button>`;
  } else if (EX.res && EX.res.unseen) {
    h += `<button class="pill exgo" data-a="exresult"><span class="l1">${EXI.doc}<span>${esc(t("exSeeResult", EX.res.grade, EX.res.pct))}</span></span><small>${esc(t("exName", EX.res.v))} · ${esc(courseName(COURSE(EX.res.code)))}</small></button>`;
  }
  return h;
}
function examHomeJump() { return `<button class="pill exj" data-a="exjump">${EXI.doc}${esc(t("exJumpBtn"))}</button>`; }
function examHomeSection(c) {
  const r = S.examRun, hist = (S.exams && S.exams[c.code]) || {};
  let cards = "";
  for (let v = 1; v <= EXAMS_PER_COURSE; v++) {
    const bp = examBlueprint(c, v), h = hist[v], running = r && r.code === c.code && r.v === v;
    const side = running ? `<span class="gbadge run">${esc(t("exInProgress"))}</span>`
      : h && h.best ? `<span class="gbadge g-${esc(h.best.grade)}">${esc(h.best.grade)} · ${esc(t("exPct", h.best.pct))}</span><small>${esc(t("exAttempts", h.attempts || 0))}</small>`
      : `<small>${esc(t("exNotTaken"))}</small>`;
    const label = `${t("exName", v)}. ${t("exMeta", bp.nParts, bp.pts, exDur(bp.recMin))}. ${running ? t("exInProgress") : h && h.best ? t("exBestLine", h.best.grade, h.best.pct, h.attempts || 0) : t("exNotTaken")}`;
    cards += `<button class="excard" data-a="exsetup" data-c="${esc(c.code)}" data-v="${v}" aria-label="${esc(label)}">
      <span class="exno" aria-hidden="true">${v}</span>
      <span class="t"><b>${esc(t("exName", v))}</b><span>${esc(t("exMeta", bp.nParts, bp.pts, exDur(bp.recMin)))}</span></span>
      <span class="exside" aria-hidden="true">${side}</span></button>`;
  }
  return `<section class="exsec" id="exams" aria-labelledby="exsec-h"><div class="exsec-h"><h2 id="exsec-h">${esc(t("exSection"))}</h2><p>${esc(t("exIntro"))}</p></div>${cards}</section>`;
}

// ---------- oppsett ----------
function exTotalText(bp, P) {
  const base = exBaseMinutes(bp, P);
  if (base == null) return t("exNoLimitNote");
  return t("exTotalTime", exDur(base + P.extra), exDur(base), P.extra ? exDur(P.extra) : "");
}
function renderExamSetup() {
  const st = EX.setup; if (!st) { screen = "home"; renderHome(); return; }
  const c = COURSE(st.code), bp = examBlueprint(c, st.v), P = exPrefs(), r = S.examRun;
  const h = S.exams && S.exams[c.code] && S.exams[c.code][st.v];
  const radio = (on, attrs, label) => `<button role="radio" aria-checked="${on}" class="${on ? "on" : ""}" ${attrs}>${esc(label)}</button>`;
  const timeChips = [["rec", t("exRec", exDur(bp.recMin))], ...EX_TIMES.map(m => [String(m), exDur(m)]), ["custom", t("exCustom")], ["none", t("exNoLimit")]]
    .map(([k, l]) => radio(String(P.time) === k, `data-a="extime" data-t="${k}"`, l)).join("");
  const extraChips = EX_EXTRAS.map(m => radio(P.extra === m, `data-a="exextra" data-x="${m}" ${P.time === "none" ? "disabled" : ""}`, m ? "+" + exDur(m) : t("exNone"))).join("");
  const tasks = bp.tasks.map((tk, i) => `<li><span class="n">${esc(t("exTask", i + 1))}</span><span class="tt">${esc(unitTitle(c, tk.u))}</span><span class="m">${esc(t("exParts", tk.parts.length))} · ${esc(t("exPts", tk.pts))}</span></li>`).join("");
  const running = r ? `<div class="exnote-run" role="note"><p>${esc(t("exRunningNote", t("exName", r.v), courseName(COURSE(r.code))))}</p><button class="kbtn" data-a="exresume">${esc(t("exResumeIt"))}</button></div>` : "";
  $app.innerHTML = `<main class="wrap exsetup">
    <div class="sheet-h"><div class="exttl"><small>${esc(courseName(c))}</small><h1>${esc(t("exName", st.v))}</h1></div><button class="iconbtn" data-a="tab" data-t="practice" aria-label="${esc(t("back"))}">${I.x}</button></div>
    ${running}
    <div class="sgroup"><ol class="extasks">${tasks}</ol><div class="extot">${esc(t("exTotal", bp.nParts, bp.pts))}</div></div>
    ${h && h.best ? `<p class="exhist">${esc(t("exBestLine", h.best.grade, h.best.pct, h.attempts || 0))}</p>` : ""}
    <div class="sgroup"><div class="stext exrules"><b>${esc(t("exRulesTitle"))}</b><ul>${t("exRules").map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <div class="sgroup exopt">
      <div class="exopt-h" id="ex-time-h">${esc(t("exTime"))}</div>
      <div class="chips" role="radiogroup" aria-labelledby="ex-time-h">${timeChips}</div>
      ${P.time === "custom" ? `<label class="excustom"><input type="number" id="excustom" min="5" max="600" step="5" inputmode="numeric" value="${esc(P.custom)}" aria-label="${esc(t("exCustomAria"))}"><span>${esc(t("exMinutes"))}</span></label>` : ""}
      <div class="exopt-h" id="ex-extra-h">${esc(t("exExtra"))}</div>
      <p class="exsub">${esc(t("exExtraNote"))}</p>
      <div class="chips ${P.time === "none" ? "dim" : ""}" role="radiogroup" aria-labelledby="ex-extra-h">${extraChips}</div>
      <p class="extotal" data-extotal aria-live="polite">${esc(exTotalText(bp, P))}</p>
    </div>
    <button class="big exstartbtn" data-a="exstart">${esc(t("exStart"))}</button>
  </main>`;
}

// ---------- eksamen ----------
function renderExam() {
  const r = S.examRun; if (!r) { screen = "home"; renderHome(); return; }
  const c = COURSE(r.code), n = r.items.length, x = r.items[r.idx], it = x.it, a = r.answers[r.idx], flag = !!r.flags[r.idx];
  const answered = exAnsweredN(r), last = r.idx === n - 1;
  const head = `${t("exTask", x.task + 1)} · ${unitTitle(c, exUnitOf(x))} · ${exLetter(x.part)} · ${t("exPts", x.pts)}`;
  let body = `<div class="krow"><p class="kicker">${esc(head)}</p><button class="kbtn" data-a="scratch">${I.pencil}${t("scratch")}</button></div><div class="prompt">${rich(it.prompt)}</div>`;
  if (it.type === "mc") {
    body += `<div class="opts" role="radiogroup" aria-label="${esc(t("pickAnswer"))}">` + it.opts.map((o, i) =>
      `<button class="opt ${a === i ? "sel" : ""}" role="radio" aria-checked="${a === i}" data-a="exsel" data-i="${i}"><span class="k">${i + 1}</span><span>${rich(o.t)}</span></button>`).join("") + `</div>`;
    body += `<div class="exunder"><p class="hint">${esc(t("exMcHint"))}</p>${exHasAnswer(x, a) ? `<button class="exlink" data-a="exclear">${esc(t("exClear"))}</button>` : ""}</div>`;
  } else {
    body += `<label class="num"><input id="exnum" inputmode="decimal" autocomplete="off" placeholder="${esc(t("answerPh"))}" value="${esc(a == null ? "" : a)}" aria-label="${esc(t("answerPh"))}">${it.u ? `<span class="u">${esc(it.u)}</span>` : ""}</label><p class="hint">${t("numHint")}</p>`;
  }
  const timed = r.deadline != null;
  $app.innerHTML = `<div class="lesson exam">
    <div class="exhead"><div class="wrap">
      <button class="iconbtn" data-a="exclose" aria-label="${esc(t("exCloseAria"))}">${I.x}</button>
      <span class="extimer ${timed ? "" : "free"} ${exLow(r) ? "low" : ""}"><small>${esc(timed ? t("exTimeLeft") : t("exElapsed"))}</small><b role="timer" aria-label="${esc(timed ? t("exTimeLeft") : t("exElapsed"))}" data-extime>${esc(exTimerText(r))}</b></span>
      <span class="exprog" aria-label="${esc(t("exAnsweredAria", answered, n))}"><small aria-hidden="true">${esc(t("exAnsweredLbl"))}</small><b aria-hidden="true"><span data-exans>${answered}</span> / ${n}</b></span>
      <button class="exovbtn" data-a="exov" aria-haspopup="dialog">${EXI.grid}<span>${esc(t("exOverview"))}</span></button>
    </div><div class="exbar" aria-hidden="true"><i style="width:${answered / n * 100}%"></i></div></div>
    <main class="wrap lbody">${body}</main>
    <div class="lfoot exfoot"><div class="wrap exnav">
      <button class="big ghost" data-a="exprev" aria-label="${esc(t("exPrev"))}" ${r.idx === 0 ? "disabled" : ""}>${EXI.left}<span>${esc(t("exPrev"))}</span></button>
      <button class="exflag ${flag ? "on" : ""}" data-a="exflag" aria-pressed="${flag}" aria-label="${esc(t("exFlag"))}" title="${esc(t("exFlagAria"))}">${flag ? EXI.flagOn : EXI.flag}<span>${esc(flag ? t("exFlagged") : t("exFlag"))}</span></button>
      <button class="big ${last ? "exsubmitbtn" : ""}" data-a="exnext"><span>${esc(last ? t("exSubmit") : t("exNext"))}</span>${last ? "" : EXI.right}</button>
    </div></div></div>`;
  const inp = document.getElementById("exnum");
  if (inp && !overlay) { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); }
}

// ---------- dialoger (renderOverlay i app.js kaller denne når overlay.exam er satt) ----------
function examOverlayHTML() {
  const o = overlay.exam, r = S.examRun;
  const dlg = (label, inner, cls = "") => `<div class="dialog pop ${cls}" role="dialog" aria-modal="true" aria-label="${esc(label)}">${inner}</div>`;
  if (o === "replace" && r) {
    const name = t("exName", r.v), cn = courseName(COURSE(r.code));
    return dlg(t("exReplaceTitle"), `<h3>${esc(t("exReplaceTitle"))}</h3><p>${esc(t("exReplaceText", name, cn))}</p>
      <button class="big" data-a="exresume">${esc(t("exResumeIt"))}</button>
      <button class="big ghost danger" data-a="exreplaceok">${esc(t("exReplaceOk"))}</button>
      <button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button>`);
  }
  if (!r) return dlg("", `<button class="big" data-a="closeov">${esc(t("cont"))}</button>`);
  if (o === "close") return dlg(t("exCloseTitle"), `<h3>${esc(t("exCloseTitle"))}</h3><p>${esc(r.deadline != null ? t("exCloseTimed") : t("exCloseFree"))}</p>
      <button class="big" data-a="exlater">${esc(t("exLater"))}</button>
      <button class="big ghost" data-a="exsubmit">${esc(t("exSubmitNow"))}</button>
      <button class="big ghost danger" data-a="exdiscard">${esc(t("exDiscard"))}</button>
      <button class="exlink center" data-a="closeov">${esc(t("exBackTo"))}</button>`);
  if (o === "discard") return dlg(t("exDiscardTitle"), `<h3>${esc(t("exDiscardTitle"))}</h3><p>${esc(t("exDiscardText"))}</p>
      <button class="big" data-a="closeov">${esc(t("exBackTo"))}</button>
      <button class="big ghost danger" data-a="exdiscardok">${esc(t("exDiscardOk"))}</button>`);
  if (o === "submit") {
    const un = r.items.length - exAnsweredN(r), fl = exFlaggedN(r);
    return dlg(t("exSubmitTitle"), `<h3>${esc(t("exSubmitTitle"))}</h3><p>${esc(t("exSubmitText", un, fl))}</p>
      <button class="big" data-a="exsubmitok">${esc(t("exSubmitOk"))}</button>
      <button class="big ghost" data-a="closeov">${esc(t("exBackTo"))}</button>`);
  }
  if (o === "overview") {
    const c = COURSE(r.code), groups = [];
    r.items.forEach((x, i) => { (groups[x.task] ||= []).push(i); });
    const cells = groups.map((ids, ti) => {
      const u = exUnitOf(r.items[ids[0]]);
      return `<div class="exgrp"><div class="exgrp-h"><b>${esc(t("exTask", ti + 1))}</b> <span>${esc(unitTitle(c, u))}</span></div><div class="exgrid">${ids.map(i => {
        const x = r.items[i], an = exHasAnswer(x, r.answers[i]), fl = !!r.flags[i], cur = i === r.idx;
        const st = [an ? t("exStAnswered") : t("exStUnanswered"), fl ? t("exStFlagged") : "", cur ? t("exStCurrent") : ""].filter(Boolean).join(", ");
        return `<button class="excell ${an ? "ans" : ""} ${fl ? "flag" : ""} ${cur ? "cur" : ""}" data-a="exgo" data-i="${i}" aria-label="${esc(t("exTask", ti + 1) + " " + exLetter(x.part) + ": " + st)}" ${cur ? 'aria-current="step"' : ""}>${esc(exLetter(x.part).slice(0, 1))}</button>`;
      }).join("")}</div></div>`;
    }).join("");
    return dlg(t("exOverview"), `<div class="exov-h"><h3>${esc(t("exOverview"))}</h3><button class="iconbtn" data-a="closeov" aria-label="${esc(t("exClose"))}">${I.x}</button></div>
      <p>${esc(t("exOvSummary", exAnsweredN(r), r.items.length, exFlaggedN(r)))}</p>
      <div class="exleg" aria-hidden="true"><span><i class="excell ans"></i>${esc(t("exLegAnswered"))}</span><span><i class="excell flag"></i>${esc(t("exLegFlagged"))}</span><span><i class="excell cur"></i>${esc(t("exLegCurrent"))}</span></div>
      <div class="exgroups">${cells}</div>
      <button class="big" data-a="exsubmit">${esc(t("exSubmitOk"))}</button>`, "exov");
  }
  return dlg("", `<button class="big" data-a="closeov">${esc(t("cont"))}</button>`);
}

// ---------- resultat ----------
function renderExamResult() {
  const R = EX.res; if (!R) { screen = "home"; renderHome(); return; }
  R.unseen = false;
  const c = COURSE(R.code), tasks = [];
  R.items.forEach((x, i) => { const tk = (tasks[x.task] ||= { u: exUnitOf(x), got: 0, max: 0 }); tk.got += R.res[i].got; tk.max += x.pts; });
  const allowed = R.untimed ? t("exNoLimitTile") : exDur((R.minutes || 0) + (R.extra || 0));
  const bars = tasks.map((tk, i) => `<div class="exbrow"><div class="exbrow-t"><span><b>${esc(t("exTask", i + 1))}</b> ${esc(unitTitle(c, tk.u))}</span><span class="v">${tk.got}/${tk.max}</span></div>
    <div class="meter" role="img" aria-label="${esc(t("exTask", i + 1) + ": " + t("exOf", tk.got, tk.max))}"><i style="width:${tk.max ? tk.got / tk.max * 100 : 0}%"></i></div></div>`).join("");
  $app.innerHTML = `<main class="wrap exres pop">
    <p class="kicker">${esc(t("exName", R.v))} · ${esc(courseName(c))}</p>
    <div class="exgrade g-${esc(R.grade)}" role="img" aria-label="${esc(t("exGradeAria", R.grade))}">${esc(R.grade)}</div>
    <p class="exscore">${esc(t("exScore", R.pct, R.score, R.max))}</p>
    ${R.newBest ? `<p class="exbest">${esc(t("exNewBest"))}</p>` : ""}
    ${R.auto ? `<p class="exauto">${esc(t("exAuto"))}</p>` : ""}
    <p class="exscale">${esc(t("exGradeNote"))}</p>
    <div class="tiles">
      <div class="tile t3"><small>${esc(t("exUsed"))}</small><b>${esc(exClock(R.secs * 1000, true))}</b></div>
      <div class="tile t2"><small>${esc(t("exAllowed"))}</small><b class="${allowed.length > 7 ? "sm" : ""}">${esc(allowed)}</b></div>
      <div class="tile t1"><small>XP</small><b>+${R.xp}</b></div>
    </div>
    <div class="sgroup exbars"><div class="exopt-h">${esc(t("exPerTask"))}</div>${bars}</div>
    ${R.added ? `<p class="exsub">${esc(t("exWrongAdded", R.added))}</p>` : ""}
    <button class="big" data-a="exreview">${esc(t("exReview"))}</button>
    <button class="big ghost" data-a="exretake">${esc(t("exRetake"))}</button>
    <button class="big ghost" data-a="tab" data-t="practice">${esc(t("exHome"))}</button>
  </main>`;
}

// ---------- gjennomgang ----------
function renderExamReview() {
  const R = EX.res; if (!R) { screen = "home"; renderHome(); return; }
  const c = COURSE(R.code), nWrong = R.res.filter(x => !x.ok).length, only = EX.filter === "wrong";
  let body = "", lastTask = -1;
  R.items.forEach((x, i) => {
    const rs = R.res[i], it = x.it, a = R.answers[i];
    if (only && rs.ok) return;
    if (x.task !== lastTask) { lastTask = x.task; body += `<h3 class="exrev-h">${esc(t("exTask", x.task + 1))} · <span>${esc(unitTitle(c, exUnitOf(x)))}</span></h3>`; }
    const yours = !rs.answered ? `<i>${esc(t("exNoAnswer"))}</i>` : it.type === "mc" ? rich(it.opts[a].t) : esc(String(a).trim()) + (it.u ? " " + esc(it.u) : "");
    const cls = rs.ok ? "ok" : rs.answered ? "bad" : "none", stat = rs.ok ? t("exCorrect") : rs.answered ? t("exWrong") : t("exUnanswered");
    body += `<article class="exitem ${cls}">
      <div class="exitem-h"><span class="mark" role="img" aria-label="${esc(stat)}">${rs.ok ? EXI.ok : EXI.bad}</span><b>${esc(exLetter(x.part))}</b><span class="pts">${esc(t("exOf", rs.got, x.pts))}</span>${R.flags[i] ? `<span class="exflagged" title="${esc(t("exLegFlagged"))}">${EXI.flagOn}</span>` : ""}
        <button class="fb-rep" data-a="exrep" data-i="${i}">${esc(t("report"))}</button></div>
      <div class="exitem-q">${rich(it.prompt)}</div>
      <div class="exans"><span>${esc(t("exYour"))}:</span> <span>${yours}</span></div>
      <div class="exans right"><span>${esc(t("exRight"))}:</span> <span>${rich(correctText(it))}</span></div>
      ${it.expl ? `<div class="fb-e">${rich(it.expl)}</div>` : ""}
    </article>`;
  });
  if (!body) body = `<p class="exempty">${esc(t("exNoneWrong"))}</p>`;
  $app.innerHTML = `<div class="top"><div class="wrap">
      <button class="iconbtn" data-a="exresult" aria-label="${esc(t("exBackResult"))}">${EXI.left}</button>
      <div class="exrev-t"><b>${esc(t("exReviewTitle"))}</b><small>${esc(t("exName", R.v))} · ${esc(courseName(c))}</small></div>
      <span class="gbadge g-${esc(R.grade)}">${esc(R.grade)} · ${esc(t("exPct", R.pct))}</span>
    </div></div>
    <main class="wrap exrev">
      <div class="chips" role="radiogroup" aria-label="${esc(t("exReviewTitle"))}">
        <button role="radio" aria-checked="${!only}" class="${only ? "" : "on"}" data-a="exfilter" data-f="all">${esc(t("exFilterAll"))} (${R.items.length})</button>
        <button role="radio" aria-checked="${only}" class="${only ? "on" : ""}" data-a="exfilter" data-f="wrong">${esc(t("exFilterWrong", nWrong))}</button>
      </div>
      ${body}
      <button class="big ghost" data-a="exresult">${esc(t("exBackResult"))}</button>
    </main>`;
}
