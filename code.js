// ============================================================
//  KODELABEN – skriv Python og se resultatet med en gang (oppgavene ligger i code_tasks.js).
//  Python kjører i en worker (vendor/pyworker.mjs + Pyodide i vendor/pyodide), lastes først når noen åpner laben,
//  og avsluttes ved evig løkke (tidsavbrudd). plt.plot/scatter/bar tegnes som SVG under koden.
//  «Live»: koden kjøres automatisk litt etter at du slutter å skrive.
//  Oppgaver med lang: "avr" er AVR-assembly (ATmega328P) og kjøres i simulatoren i avr.js, uten Python.
//  Framdrift: S.codeDone[id] = 1, utkast i S.codeSrc[id]. Skjerm: "code", adresse #/kode[/FAG-enhet/oppgave].
// ============================================================
let CD = { view: "list", key: null, i: 0, src: "", res: null, running: false, check: null, from: "home", hint: false, sol: false };
const CDR = { w: null, ready: false, loading: false, n: 0, pending: null, timer: 0 };
const cdTasks = key => CODE_TASKS[key] || [];
const cdAll = () => Object.keys(CODE_TASKS).flatMap(k => CODE_TASKS[k].map((t, i) => ({ ...t, key: k, i })));
const cdTask = () => CD.view === "task" ? cdTasks(CD.key)[CD.i] : null;
const cdDone = id => !!(S.codeDone || {})[id];
const cdKeyName = key => { const [code, u] = key.split(":"), c = COURSE(code); return c ? `${courseName(c)} · ${unitTitle(c, +u)}` : key; };
const cdLang = () => { const tk = cdTask(); return tk ? tk.lang || "py" : CD.view === "play" ? CD.lang || "py" : "py"; };
const CD_PLAY_AVR = `; Lekeplass: AVR-assembly for ATmega328P (Arduino Uno), 16 MHz
.include "m328pdef.inc"

    sbi  DDRB, PB5      ; pinne 13 (PB5) er utgang
    ldi  r16, 10        ; 10 skift = 5 blink
blink:
    sbi  PINB, PB5      ; skriv 1 til PINB: veksler LED-en
    rcall vent
    dec  r16
    brne blink
slutt:
    rjmp slutt          ; evig løkke på slutten

vent:                   ; ca. 50 µs: 255 · 3 sykler
    ldi  r17, 255
v1: dec  r17
    brne v1
    ret
`;
const CD_PLAY = PY`# Lekeplass: skriv Python og se resultatet
import math

for v in range(0, 361, 45):
    print(f"sin({v}°) = {math.sin(math.radians(v)):.3f}")
`;
// ---------- kjøring ----------
function cdBoot(){
  if(CDR.w) return;
  CDR.ready = false; CDR.loading = true;
  try { CDR.w = new Worker("vendor/pyworker.mjs", { type: "module" }); }
  catch(e){ CDR.loading = false; CDR.fail = String(e.message || e); cdPaintOut(); return; }
  CDR.w.onmessage = e => {
    const m = e.data;
    if(m.t === "ready"){ CDR.ready = true; CDR.loading = false; cdPaintStatus(); return; }
    if(m.t === "fail"){ CDR.fail = m.s; CDR.loading = false; cdKill(); cdPaintOut(); return; }
    const P = CDR.pending; if(!P || m.id !== P.id) return;
    if(m.t === "out" || m.t === "err"){ P.out += m.s; if(m.t === "err") P.errOut = true; cdPaintLive(P.out); return; }
    if(m.t === "done"){ clearTimeout(CDR.timer); CDR.pending = null; P.resolve({ ...m, out: P.out }); }
  };
  CDR.w.onerror = e => { CDR.fail = e.message || "Worker"; CDR.loading = false; cdKill(); cdPaintOut(); };
}
function cdKill(){ try { CDR.w && CDR.w.terminate(); } catch(_){} CDR.w = null; CDR.ready = false; }
// Kjøringer står i kø, så «Kjør» mens en live-kjøring pågår bare venter på tur.
function cdRun(code, check, stdin, ms){ const p = (CDR.q || Promise.resolve()).then(() => cdRun1(code, check, stdin, ms)); CDR.q = p.catch(() => {}); return p; }
function cdRun1(code, check, stdin, ms){
  cdBoot();
  return new Promise(resolve => {
    const id = ++CDR.n; CDR.pending = { id, out: "", resolve };
    const start = () => { CDR.timer = setTimeout(() => { if(!CDR.pending || CDR.pending.id !== id) return; const P = CDR.pending; CDR.pending = null; cdKill(); P.resolve({ ok: false, timeout: true, out: P.out }); }, ms); };
    // tidsfristen starter først når Python er klar (første oppstart tar et par sekunder)
    const wait = () => { if(!CDR.pending || CDR.pending.id !== id) return; if(CDR.ready){ start(); CDR.w.postMessage({ id, code, check, stdin }); } else if(!CDR.w) resolve({ ok: false, error: CDR.fail || "Python kunne ikke starte." }); else setTimeout(wait, 60); };
    wait();
  });
}
const cdNorm = s => String(s || "").replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
function cdOutMatch(out, want){
  const a = cdNorm(out), e = cdNorm(want); if(a === e) return true;
  return a.endsWith(e) && /[\s:]/.test(a[a.length - e.length - 1] || ""); // tillat en ledetekst fra input() foran svaret
}
// Kjenner igjen vanlige feil og forklarer dem kort på norsk.
function cdExplain(err){
  const m = String(err || ""), k = (m.match(/(\w+(?:Error|Exception))/) || [])[1];
  const X = {
    SyntaxError: ["Python forstår ikke linjen. Se etter manglende kolon, parentes eller anførselstegn.", "Python cannot parse the line. Look for a missing colon, bracket or quote."],
    IndentationError: ["Innrykket stemmer ikke. Linjene i en blokk må starte like langt inn (bruk 4 mellomrom).", "The indentation is off. Lines in a block must start at the same column (use 4 spaces)."],
    NameError: ["Et navn er ikke definert. Har du stavet variabelen likt overalt, og laget den før du bruker den?", "A name is not defined. Is the variable spelled the same everywhere, and created before use?"],
    TypeError: ["Feil type: for eksempel tekst + tall. Bruk `int()`, `float()` eller `str()` for å gjøre om.", "Wrong type: e.g. text + number. Use `int()`, `float()` or `str()` to convert."],
    ZeroDivisionError: ["Du deler på null.", "You are dividing by zero."],
    IndexError: ["Indeksen er utenfor lista. Husk at den første har indeks 0 og den siste `len(liste) - 1`.", "The index is outside the list. The first is index 0 and the last is `len(list) - 1`."],
    KeyError: ["Nøkkelen finnes ikke i ordboken. Bruk `.get(nøkkel, standard)` om den kan mangle.", "The key is not in the dictionary. Use `.get(key, default)` if it may be missing."],
    ValueError: ["Verdien passer ikke, for eksempel `int(\"abc\")`.", "The value does not fit, e.g. `int(\"abc\")`."],
    AttributeError: ["Objektet har ikke den metoden eller egenskapen. Sjekk stavingen.", "The object has no such method or attribute. Check the spelling."],
    ModuleNotFoundError: ["Modulen finnes ikke her. Standardbiblioteket (math, random, statistics …) og `matplotlib.pyplot` virker.", "The module is not available here. The standard library (math, random, statistics …) and `matplotlib.pyplot` work."],
    RecursionError: ["Funksjonen kaller seg selv for mange ganger. Mangler basistilfellet?", "The function calls itself too many times. Is the base case missing?"],
  };
  return X[k] ? T(X[k][0], X[k][1]) : "";
}
// ---------- graf ----------
function cdNice(lo, hi){ const span = hi - lo || 1, st = Math.pow(10, Math.floor(Math.log10(span / 4))), f = span / 4 / st, step = (f > 5 ? 10 : f > 2 ? 5 : f > 1 ? 2 : 1) * st; const out = []; for(let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10)); return out; }
function cdPlotSVG(plots, meta){
  if(!plots || !plots.length) return "";
  const xs = plots.flatMap(p => p.x).filter(Number.isFinite), ys = plots.flatMap(p => p.y).filter(Number.isFinite); if(!xs.length || !ys.length) return "";
  let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys, plots.some(p => p.kind === "bar") ? 0 : Infinity), y1 = Math.max(...ys);
  if(x0 === x1){ x0 -= 1; x1 += 1; } if(y0 === y1){ y0 -= 1; y1 += 1; } const py = (y1 - y0) * 0.06; y0 -= py; y1 += py;
  const W = 340, H = 210, L = 44, R = 10, Tp = meta && meta.title ? 26 : 10, B = 28;
  const sx = x => L + (x - x0) / (x1 - x0) * (W - L - R), sy = y => H - B - (y - y0) / (y1 - y0) * (H - B - Tp);
  const fmt = v => Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(1) : String(+v.toPrecision(4)).replace(".", decPoint() ? "." : ",");
  let g = cdNice(y0, y1).map(v => `<line x1="${L}" x2="${W - R}" y1="${sy(v).toFixed(1)}" y2="${sy(v).toFixed(1)}" class="cd-gl"/><text x="${L - 5}" y="${(sy(v) + 4).toFixed(1)}" text-anchor="end" class="cd-tk">${fmt(v)}</text>`).join("");
  g += cdNice(x0, x1).map(v => `<line y1="${Tp}" y2="${H - B}" x1="${sx(v).toFixed(1)}" x2="${sx(v).toFixed(1)}" class="cd-gl"/><text y="${H - B + 15}" x="${sx(v).toFixed(1)}" text-anchor="middle" class="cd-tk">${fmt(v)}</text>`).join("");
  if(y0 < 0 && y1 > 0) g += `<line x1="${L}" x2="${W - R}" y1="${sy(0).toFixed(1)}" y2="${sy(0).toFixed(1)}" class="cd-ax"/>`;
  const cols = ["var(--c3)", "var(--c1)", "var(--c4)", "var(--c2)", "var(--c5)"];
  plots.forEach((p, k) => { const col = cols[k % cols.length], pts = p.x.map((x, i) => [x, p.y[i]]).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
    if(p.kind === "line") g += `<polyline points="${pts.map(([x, y]) => sx(x).toFixed(1) + "," + sy(y).toFixed(1)).join(" ")}" style="fill:none;stroke:${col};stroke-width:2.4;stroke-linejoin:round"/>`;
    else if(p.kind === "dot") g += pts.map(([x, y]) => `<circle cx="${sx(x).toFixed(1)}" cy="${sy(y).toFixed(1)}" r="3.2" style="fill:${col}"/>`).join("");
    else { const bw = Math.max(2, (W - L - R) / Math.max(pts.length, 1) * 0.7); g += pts.map(([x, y]) => `<rect x="${(sx(x) - bw / 2).toFixed(1)}" y="${Math.min(sy(y), sy(Math.max(y0, 0))).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.abs(sy(y) - sy(Math.max(y0, 0))).toFixed(1)}" style="fill:${col};opacity:.85"/>`).join(""); } });
  if(meta && meta.title) g += `<text x="${W / 2}" y="16" text-anchor="middle" class="cd-ti">${esc(meta.title)}</text>`;
  const leg = plots.filter(p => p.label).map((p, k) => `<span><i style="background:${cols[plots.indexOf(p) % cols.length]}"></i>${esc(p.label)}</span>`).join("");
  return `<div class="cd-plot"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(T("Graf", "Graph"))}">${g}</svg>${leg ? `<div class="cd-leg">${leg}</div>` : ""}${meta && (meta.xlabel || meta.ylabel) ? `<small>${esc([meta.xlabel && "x: " + meta.xlabel, meta.ylabel && "y: " + meta.ylabel].filter(Boolean).join(" · "))}</small>` : ""}</div>`;
}
// ---------- utdata ----------
function cdOutHTML(){
  const r = CD.res;
  if(cdLang() === "avr") return r && r.avr ? avrOutHTML(r.avr) : `<pre class="cd-con cd-empty">${esc(T("Trykk ▶ Kjør for å se registrene, LED-ene og UART-utskriften her.", "Press ▶ Run to see the registers, LEDs and UART output here."))}</pre>`;
  if(CDR.fail) return `<div class="cd-err">${esc(T("Python kunne ikke starte på denne enheten.", "Python could not start on this device."))}<br><small>${esc(CDR.fail)}</small></div>`;
  if(!r) return `<pre class="cd-con cd-empty">${esc(T("Trykk ▶ Kjør for å se resultatet her.", "Press ▶ Run to see the result here."))}</pre>`;
  const out = r.out || "";
  let h = `<pre class="cd-con">${esc(out) || `<span class="cd-dim">${esc(T("(ingen utskrift)", "(no output)"))}</span>`}</pre>`;
  if(r.timeout) h += `<div class="cd-err"><b>${esc(T("Stoppet: koden brukte for lang tid.", "Stopped: the code took too long."))}</b> ${esc(T("Har du en løkke som aldri slutter?", "Do you have a loop that never ends?"))}</div>`;
  if(r.error){ const ex = cdExplain(r.error); h += `<div class="cd-err"><pre>${esc(r.error)}</pre>${ex ? `<p>💡 ${rich(ex)}</p>` : ""}</div>`; }
  h += cdPlotSVG(r.plots, r.meta);
  return h;
}
function cdVerdictHTML(){
  const v = CD.check; if(!v) return "";
  if(v.pass) return `<div class="dv-fb ok cd-verdict"><b>✓ ${esc(T("Riktig! Alle testene består.", "Correct! All tests pass."))}</b>${v.first ? `<p>+5 XP</p>` : ""}${cdNextBtn()}</div>`;
  return `<div class="dv-fb bad cd-verdict"><b>${esc(T("Ikke helt ennå", "Not quite yet"))}</b><p>${rich(v.msg)}</p></div>`;
}
function cdNextBtn(){ const L = cdTasks(CD.key); return CD.i + 1 < L.length ? `<button class="big" data-a="cdnext">${esc(T("Neste oppgave", "Next task"))} →</button>` : `<button class="big" data-a="cdlist">${esc(T("Til oppgavene", "To the tasks"))}</button>`; }
const cdPaintOut = () => { const el = document.getElementById("cdout"); if(el) el.innerHTML = cdOutHTML(); const v = document.getElementById("cdverdict"); if(v) v.innerHTML = cdVerdictHTML(); cdPaintStatus(); };
const cdPaintLive = s => { const el = document.querySelector("#cdout .cd-con"); if(el) el.textContent = s; };
function cdPaintStatus(){
  const el = document.getElementById("cdstat"); if(!el) return;
  if(cdLang() === "avr"){ el.textContent = T("AVR-simulator · ATmega328P · 16 MHz", "AVR simulator · ATmega328P · 16 MHz"); el.className = "cd-stat ok"; return; }
  el.textContent = CDR.fail ? "" : CD.running ? T("Kjører …", "Running …") : CDR.loading ? T("Starter Python … (første gang tar det litt tid)", "Starting Python … (takes a moment the first time)") : CDR.ready ? T("Python er klar", "Python is ready") : "";
  el.className = "cd-stat " + (CDR.ready && !CD.running ? "ok" : "");
  document.querySelectorAll("[data-a=cdrun],[data-a=cdcheck]").forEach(b => { b.disabled = CD.running && !CD.live; });
}
function cdVerdictSet(tk, pass, msg){
  const first = pass && !cdDone(tk.id);
  if(pass){ (S.codeDone ||= {})[tk.id] = 1; if(first){ awardXP(5); bdgToast(checkBadges()); } save(); sfx("ok", 3); buzz(true); setTimeout(() => { const el = document.getElementById("cdverdict"); if(el){ burst(el, 14); if(first) confetti && confetti(); } }, 60); }
  else { CD.tries = (CD.tries || 0) + 1; sfx("bad"); buzz(false); }
  CD.check = { pass, msg, first };
}
function cdExecAvr(withCheck){
  const tk = cdTask();
  if(withCheck && tk){ const v = avrCheck(tk, CD.src); CD.res = { avr: v.m }; cdVerdictSet(tk, v.pass, v.msg); }
  else CD.res = { avr: avrRun(CD.src, { init: tk && tk.cases ? tk.cases[0] : {}, maxCycles: tk && tk.maxCycles }) };
  cdPaintOut();
  if(withCheck){ const v = document.getElementById("cdverdict"); if(v) v.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
}
async function cdExec(withCheck, live){
  if(cdLang() === "avr") return cdExecAvr(withCheck);
  const tk = cdTask(), code = CD.src;
  CD.running = true; CD.live = !!live; cdPaintStatus();
  const r = await cdRun(code, withCheck && tk ? tk.check || null : null, tk && tk.stdin || CD.stdin || "", live ? 3000 : 10000);
  CD.running = false; CD.res = r;
  if(withCheck && tk){
    let pass = !r.error && !r.timeout, msg = "";
    if(r.timeout) msg = T("Koden ble stoppet fordi den brukte for lang tid.", "The code was stopped because it took too long.");
    else if(r.error) msg = T("Koden stopper med en feil. Se under.", "The code stops with an error. See below.");
    else {
      if(tk.out != null && !cdOutMatch(r.out, tk.out)){ pass = false; msg = T("Utskriften er ikke helt lik. Forventet:", "The output does not match. Expected:") + "```" + tk.out + "```"; }
      if(pass && tk.check && r.pass === false){ pass = false; msg = r.fail; }
    }
    cdVerdictSet(tk, pass, msg);
  }
  cdPaintOut();
  if(withCheck){ const v = document.getElementById("cdverdict"); if(v) v.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
}
// ---------- editor ----------
// Fargelegging: en <pre> under et gjennomsiktig tekstfelt viser koden med farger, mens du skriver i tekstfeltet.
const CD_KW = new Set("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
const CD_BI = new Set("print len range int float str list dict set tuple abs min max sum round sorted enumerate zip input open isinstance type map filter any all super self".split(" "));
function cdHL(src){
  const re = /(#[^\n]*)|([rRbBfF]{0,2}(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?))|(\b\d+(?:\.\d*)?(?:e[+-]?\d+)?\b)|([A-Za-z_]\w*)/g;
  let out = "", last = 0, m, prev = "";
  while((m = re.exec(src))){
    out += esc(src.slice(last, m.index)); last = re.lastIndex;
    const [w, com, str, num, id] = m;
    if(com) out += `<i class="c">${esc(com)}</i>`;
    else if(str) out += `<i class="s">${esc(str)}</i>`;
    else if(num) out += `<i class="n">${esc(num)}</i>`;
    else if(CD_KW.has(id)) out += `<i class="k">${id}</i>`;
    else if(prev === "def" || prev === "class") out += `<i class="f">${id}</i>`;
    else if(CD_BI.has(id)) out += `<i class="b">${id}</i>`;
    else out += esc(id);
    if(id) prev = id; else if(!/^\s*$/.test(w)) prev = "";
  }
  return out + esc(src.slice(last));
}
function cdHLAsm(src){
  const re = /(;[^\n]*|\/\/[^\n]*)|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])')|(\.[A-Za-z]+)|(0x[0-9A-Fa-f]+|\$[0-9A-Fa-f]+|0b[01]+|\b\d+\b)|([A-Za-z_]\w*)(\s*:)?/g;
  let out = "", last = 0, m, lineStart = true;
  while((m = re.exec(src))){
    const gap = src.slice(last, m.index); out += esc(gap); if(gap.includes("\n")) lineStart = !/\S/.test(gap.slice(gap.lastIndexOf("\n") + 1)); last = re.lastIndex;
    const [w, com, str, dir, num, id, colon] = m;
    if(com) out += `<i class="c">${esc(com)}</i>`;
    else if(str) out += `<i class="s">${esc(str)}</i>`;
    else if(dir) out += `<i class="k">${esc(dir)}</i>`;
    else if(num) out += `<i class="n">${esc(num)}</i>`;
    else if(colon) out += `<i class="f">${esc(id)}</i>${esc(colon)}`;
    else if(AVR_OPS[id.toLowerCase()] != null && lineStart) out += `<i class="k">${esc(id)}</i>`;
    else if(/^(r\d{1,2}|[XYZ][LH]?)$/i.test(id)) out += `<i class="b">${esc(id)}</i>`;
    else if(AVR_SYM[id.toUpperCase()] != null || /^(low|high)$/i.test(id)) out += `<i class="f">${esc(id)}</i>`;
    else out += esc(id);
    lineStart = !!colon;
  }
  return out + esc(src.slice(last));
}
function cdBindEditor(){
  const ta = document.getElementById("cded"), gut = document.getElementById("cdgut"); if(!ta) return;
  const hl = document.getElementById("cdhl");
  const lines = () => { const n = ta.value.split("\n").length; gut.textContent = Array.from({ length: n }, (_, i) => i + 1).join("\n"); if(hl) hl.innerHTML = (cdLang() === "avr" ? cdHLAsm : cdHL)(ta.value) + "\n "; };
  const save1 = () => { CD.src = ta.value; const tk = cdTask(); if(tk){ (S.codeSrc ||= {})[tk.id] = ta.value; } else if(CD.lang === "avr") S.codePlayAvr = ta.value; else S.codePlay = ta.value; clearTimeout(cdBindEditor.st); cdBindEditor.st = setTimeout(save, 600); };
  const ins = (txt, back = 0) => { const s = ta.selectionStart, e = ta.selectionEnd; ta.setRangeText(txt, s, e, "end"); if(back) ta.selectionStart = ta.selectionEnd = ta.selectionEnd - back; onInput(); };
  const onInput = () => { lines(); save1(); CD.check = null; const v = document.getElementById("cdverdict"); if(v) v.innerHTML = "";
    if(S.cdLive !== false){ clearTimeout(cdBindEditor.lt); cdBindEditor.lt = setTimeout(() => { if(cdLang() === "avr") cdExec(false, true); else if(CDR.ready && !CDR.pending) cdExec(false, true); }, cdLang() === "avr" ? 500 : 900); } };
  ta.addEventListener("input", onInput);
  ta.addEventListener("scroll", () => { gut.scrollTop = ta.scrollTop; if(hl){ hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; } });
  ta.addEventListener("keydown", e => {
    if(e.key === "Tab"){ e.preventDefault();
      if(e.shiftKey){ const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s - 1) + 1; const m = ta.value.slice(ls).match(/^ {1,4}/); if(m){ ta.setRangeText("", ls, ls + m[0].length, "start"); ta.selectionStart = ta.selectionEnd = Math.max(ls, s - m[0].length); onInput(); } }
      else ins("    "); return; }
    if(e.key === "Enter" && (e.ctrlKey || e.metaKey)){ e.preventDefault(); cdExec(false); return; }
    if(e.key === "Enter"){ const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s - 1) + 1, line = ta.value.slice(ls, s), ind = line.match(/^\s*/)[0];
      e.preventDefault(); ins("\n" + ind + (/:\s*$/.test(line) ? "    " : "")); return; }
    if(e.key === "Backspace" && ta.selectionStart === ta.selectionEnd){ const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s - 1) + 1, before = ta.value.slice(ls, s);
      if(before.length && /^ +$/.test(before) && before.length % 4 === 0){ e.preventDefault(); ta.setRangeText("", s - 4, s, "end"); onInput(); } }
  });
  // hurtigtaster for mobil: behold fokus i editoren
  document.querySelectorAll(".cd-keys button").forEach(b => { b.addEventListener("pointerdown", e => e.preventDefault()); b.addEventListener("click", () => { const k = b.dataset.k; ta.focus(); if(k === "tab") ins("    "); else if(k === "()" || k === "[]" || k === '""') ins(k, 1); else ins(k); }); });
  lines();
}
// Oppgavetekst: avsnitt (tom linje) og **fet** utenfor `kode`.
const cdRich = s => String(s).split(/\n{2,}/).map(par => `<p>${par.split(/(`[^`]+`)/g).map((x, i) => i % 2 ? rich(x) : rich(x).replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>")).join("")}</p>`).join("");
// ---------- skjermer ----------
function cdSet(key, i){
  CD.res = null; CD.check = null; CD.hint = false; CD.sol = false; CD.tries = 0;
  if(key === "play" || key === "playavr"){ CD.view = "play"; CD.key = null; CD.lang = key === "playavr" ? "avr" : "py"; CD.src = CD.lang === "avr" ? S.codePlayAvr || CD_PLAY_AVR : S.codePlay || CD_PLAY; }
  else if(key && CODE_TASKS[key]){ CD.view = "task"; CD.key = key; CD.i = Math.max(0, Math.min(cdTasks(key).length - 1, i || 0)); const tk = cdTask(); CD.src = (S.codeSrc || {})[tk.id] || tk.start; }
  else { CD.view = "list"; CD.key = key && Object.keys(CODE_TASKS).some(k => k.startsWith(key + ":")) ? key : null; }
}
function cdOpen(key, i, from){ CD.from = from || (screen === "code" ? CD.from : screen); cdSet(key, i); overlay = null; screen = "code"; render(); window.scrollTo(0, 0); }
// Adresse: #/kode, #/kode/MEK1300, #/kode/MEK1300-0/2, #/kode/lek
function cdRoute(){ return rtW("code") + (CD.view === "play" ? "/" + T("lek", "play") + (CD.lang === "avr" ? "-avr" : "") : CD.view === "task" ? "/" + CD.key.replace(":", "-") + "/" + (CD.i + 1) : CD.key ? "/" + CD.key : ""); }
function cdRouteOpen(p){ const a = p[1] || ""; CD.from = "home";
  if(a === "lek" || a === "play") return cdSet("play");
  if(a === "lek-avr" || a === "play-avr") return cdSet("playavr");
  const m = a.match(/^([A-Z0-9]+)-(\d+)$/); if(m) return cdSet(m[1] + ":" + m[2], (parseInt(p[2], 10) || 1) - 1);
  cdSet(a || null); }
function cdEditorHTML(){
  const keys = cdLang() === "avr" ? [["tab", "⇥"], [",", ","], [";", ";"], [":", ":"], ["r", "r"], ["0x", "0x"], ["0b", "0b"], ["(1<<", "(1<<"], [")", ")"]]
    : [["tab", "⇥"], [":", ":"], ["()", "( )"], ["[]", "[ ]"], ['""', "\" \""], ["=", "="], ["+", "+"], ["*", "*"], ["#", "#"]];
  return `<div class="cd-edw"><pre class="cd-gut" id="cdgut" aria-hidden="true"></pre><div class="cd-edbox"><pre class="cd-hl" id="cdhl" aria-hidden="true"></pre><textarea id="cded" class="cd-ed" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="${esc(T("Python-kode", "Python code"))}">${esc(CD.src)}</textarea></div></div>
    <div class="cd-keys" aria-hidden="true">${keys.map(([k, l]) => `<button type="button" data-k="${esc(k)}">${esc(l)}</button>`).join("")}</div>
    <div class="cd-bar"><button class="big cd-run" data-a="cdrun">▶ ${esc(T("Kjør", "Run"))}</button>${CD.view === "task" ? `<button class="big cd-check" data-a="cdcheck">✓ ${esc(T("Sjekk", "Check"))}</button>` : ""}</div>
    <div class="cd-row2"><span id="cdstat" class="cd-stat"></span><button class="tg-chip ${S.cdLive !== false ? "on" : ""}" data-a="cdlive" aria-pressed="${S.cdLive !== false}">⚡ ${esc(T("Live", "Live"))}</button></div>`;
}
function renderCode(){
  if(CD.view !== "list" && cdLang() !== "avr") cdBoot();
  const top = (title, small) => `<div class="top"><div class="wrap"><button class="iconbtn" data-a="cdback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(small)}</small><b>${esc(title)}</b></div></div></div>`;
  if(CD.view === "list"){
    const keys = Object.keys(CODE_TASKS).filter(k => !CD.key || k.startsWith(CD.key + ":")), all = cdAll(), done = all.filter(x => cdDone(x.id)).length;
    const mine = new Set(myCourses().map(c => c.code)), order = keys.slice().sort((a, b) => mine.has(b.split(":")[0]) - mine.has(a.split(":")[0]));
    $app.innerHTML = `${top(T("Kodelab", "Code lab"), T("Python og AVR-assembly", "Python and AVR assembly"))}<main class="wrap cd-list">
      <p class="pf-intro">${esc(T("Skriv ekte Python og se resultatet med en gang. Oppgavene sjekkes automatisk, og grafer med plt.plot tegnes rett under koden.", "Write real Python and see the result instantly. Tasks are checked automatically, and plt.plot graphs appear right below the code."))}</p>
      <div class="cd-sum"><b>${done}/${all.length}</b> ${esc(T("oppgaver løst", "tasks solved"))}<span class="dv-bar"><i class="g" style="width:${Math.round(done / all.length * 100)}%"></i></span></div>
      <button class="pf-cta" data-a="cdgo" data-k="play"><span class="pf-cta-ic" aria-hidden="true">🛝</span><span><b>${esc(T("Lekeplass", "Playground"))}</b><small>${esc(T("Fri koding i Python – prøv hva du vil", "Free coding in Python – try anything"))}</small></span>${I.chevron}</button>
      <button class="pf-cta" data-a="cdgo" data-k="playavr"><span class="pf-cta-ic" aria-hidden="true">🔌</span><span><b>${esc(T("Lekeplass: AVR-assembly", "Playground: AVR assembly"))}</b><small>${esc(T("ATmega328P (Arduino Uno) med LED-er, registre og UART", "ATmega328P (Arduino Uno) with LEDs, registers and UART"))}</small></span>${I.chevron}</button>
      ${order.map(k => `<h4 class="grp">${esc(cdKeyName(k))}</h4><div class="cd-tasks">${cdTasks(k).map((tk, i) => `<button class="cd-trow ${cdDone(tk.id) ? "done" : ""}" data-a="cdgo" data-k="${k}" data-i="${i}"><i>${cdDone(tk.id) ? "✓" : i + 1}</i><span>${esc(T(tk.t[0], tk.t[1]))}</span>${I.chevron}</button>`).join("")}</div>`).join("")}
      ${CD.key ? `<button class="exlink" data-a="cdall">${esc(T("Alle kodeoppgaver", "All code tasks"))}</button>` : ""}</main>`;
    return;
  }
  if(CD.view === "play"){
    const avr = CD.lang === "avr";
    $app.innerHTML = `${top(avr ? T("Lekeplass: AVR-assembly", "Playground: AVR assembly") : T("Lekeplass", "Playground"), T("Kodelab", "Code lab"))}<main class="wrap cd">
      ${cdEditorHTML()}<div id="cdout" class="cd-out">${cdOutHTML()}</div>
      ${avr ? avrHelpHTML() : `<details class="cd-help"><summary>${esc(T("Inndata til input()", "Input for input()"))}</summary><textarea id="cdstdin" rows="3" placeholder="${esc(T("Én linje per input()", "One line per input()"))}">${esc(CD.stdin || "")}</textarea></details>`}
      <button class="exlink" data-a="cdreset">${esc(T("Tilbakestill eksempelet", "Reset the example"))}</button></main>`;
    cdBindEditor(); cdPaintStatus();
    const si = document.getElementById("cdstdin"); if(si) si.addEventListener("input", () => { CD.stdin = si.value; });
    return;
  }
  const L = cdTasks(CD.key), tk = cdTask(); if(!tk){ CD.view = "list"; return renderCode(); }
  $app.innerHTML = `${top(T(tk.t[0], tk.t[1]), cdKeyName(CD.key))}
    <div class="cd-steps wrap">${L.map((x, i) => `<button class="${i === CD.i ? "cur" : ""} ${cdDone(x.id) ? "done" : ""}" data-a="cdgo" data-k="${CD.key}" data-i="${i}" aria-label="${i + 1}">${cdDone(x.id) ? "✓" : i + 1}</button>`).join("")}</div>
    <main class="wrap cd">
      <div class="cd-task">${cdRich(T(tk.p[0], tk.p[1]))}${tk.stdin ? `<p class="cd-in">${esc(T("Inndata:", "Input:"))} <code>${esc(tk.stdin)}</code></p>` : ""}</div>
      ${cdEditorHTML()}
      <div id="cdverdict">${cdVerdictHTML()}</div>
      <div id="cdout" class="cd-out">${cdOutHTML()}</div>
      <div class="cd-more">
        <button class="tg-chip ${CD.hint ? "on" : ""}" data-a="cdhint">💡 ${esc(T("Hint", "Hint"))}</button>
        <button class="tg-chip ${CD.sol ? "on" : ""}" data-a="cdsol">🔑 ${esc(T("Løsningsforslag", "Solution"))}</button>
        <button class="tg-chip" data-a="cdreset">↺ ${esc(T("Start på nytt", "Start over"))}</button></div>
      ${CD.hint ? `<div class="cd-hint">${rich(T(tk.hint[0], tk.hint[1]))}</div>` : ""}
      ${tk.lang === "avr" ? avrHelpHTML() : ""}
      ${CD.sol ? `<div class="cd-sol"><pre class="code">${esc(tk.sol)}</pre><button class="exlink" data-a="cdusesol">${esc(T("Bruk løsningen i editoren", "Use the solution in the editor"))}</button></div>` : ""}
    </main>`;
  cdBindEditor(); cdPaintStatus();
}
function cdClick(a, b){
  if(!a.startsWith("cd")) return false;
  const d = b && b.dataset;
  if(a === "cdopen"){ cdOpen(d && d.k || null, d && d.i ? +d.i : 0); return true; }
  if(a === "cdgo"){ cdOpen(d.k, +d.i || 0, CD.from); return true; }
  if(a === "cdall"){ CD.key = null; render(); return true; }
  if(a === "cdlist"){ CD.view = "list"; CD.key = null; render(); window.scrollTo(0, 0); return true; }
  if(a === "cdback"){ if(CD.view !== "list"){ CD.view = "list"; CD.key = null; render(); window.scrollTo(0, 0); return true; }
    const f = CD.from; if(["lab", "book", "practice", "theory", "profile"].includes(f) && !(f === "theory" && !TH)){ screen = f; render(); } else goHome(); return true; }
  if(a === "cdrun"){ cdExec(false); return true; }
  if(a === "cdcheck"){ cdExec(true); return true; }
  if(a === "cdlive"){ S.cdLive = S.cdLive === false; save(); render(); return true; }
  if(a === "cdhint"){ CD.hint = !CD.hint; render(); return true; }
  if(a === "cdsol"){ if(!CD.sol && !CD.tries && !confirm(T("Vil du se løsningsforslaget? Prøv gjerne én gang til først.", "Show the solution? Maybe try once more first."))) return true; CD.sol = !CD.sol; render(); return true; }
  if(a === "cdusesol"){ const tk = cdTask(); CD.src = tk.sol; (S.codeSrc ||= {})[tk.id] = tk.sol; save(); render(); return true; }
  if(a === "cdreset"){ const tk = cdTask(); CD.src = tk ? tk.start : CD.lang === "avr" ? CD_PLAY_AVR : CD_PLAY; if(tk) delete (S.codeSrc || {})[tk.id]; else if(CD.lang === "avr") S.codePlayAvr = null; else S.codePlay = null; CD.res = null; CD.check = null; save(); render(); return true; }
  if(a === "cdnext"){ cdOpen(CD.key, CD.i + 1, CD.from); return true; }
  return false;
}
// Laben i Labben-oversikten og lenker fra teorien (lab.js), og fanen for funksjonen i studievalget.
LABS.push({ id: "code", ic: "💻", t: ["Kodelab: Python og assembly", "Code lab: Python and assembly"], sub: ["Skriv kode og se resultatet med en gang", "Write code and see the result instantly"],
  kw: "python assembly avr arduino mikrokontroller microcontroller kode code programmering programming koding coding løkke loop funksjon function plot graf matplotlib", units: Object.keys(CODE_TASKS), open: () => cdOpen(null, 0) });
const labTheoryHTML0 = labTheoryHTML;
// På teorisiden: knappen åpner oppgavene for akkurat den enheten.
labTheoryHTML = (code, u) => labTheoryHTML0(code, u).replace(`data-a="labgo" data-id="code"`, `data-a="cdopen" data-k="${code}:${u}"`);
// Øv-fanen for fag med kodeoppgaver.
function cdPracticeCardHTML(c){
  if(!c || !Object.keys(CODE_TASKS).some(k => k.startsWith(c.code + ":"))) return "";
  const L = Object.keys(CODE_TASKS).filter(k => k.startsWith(c.code + ":")).flatMap(k => CODE_TASKS[k]), done = L.filter(x => cdDone(x.id)).length;
  return `<div class="dv-prac"><button class="qt-row" data-a="cdopen" data-k="${c.code}"><span class="qt-ic">💻</span><span><b>${esc(T("Kodeoppgaver", "Code tasks"))}</b><small>${esc((L.some(x => x.lang === "avr") ? T(`AVR-assembly med simulert Arduino · ${done}/${L.length} løst`, `AVR assembly on a simulated Arduino · ${done}/${L.length} solved`) : T(`Python med resultat med en gang · ${done}/${L.length} løst`, `Python with instant results · ${done}/${L.length} solved`)))}</small></span>${I.chevron}</button></div>`;
}
