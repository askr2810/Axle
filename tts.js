// ============================================================
//  tts.js – «Lytt»: les teorien høyt med nettleserens innebygde talesyntese (Web Speech API, gratis, ingen server).
//  Leser overskrifter, avsnitt, punkter og huskeregler i rekkefølge og markerer det som leses.
//  Hopper over figurer, simuleringer, tidslinjer og oppgaver. Trykk på et avsnitt mens den leser for å hoppe dit.
// ============================================================
const TTS_OK = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
const TTS_RATES = [1, 1.25, 1.5, 0.85];
let TTS = null;
const TTS_IC = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>`; // { root, items: [{ el, parts }], i, playing }
function ttsBarHTML(){
  if(!TTS_OK) return "";
  return ttsBarInner() + `<button class="exlink tts-vpick" data-tts="voices">${esc(T("Velg stemme", "Choose voice"))}</button>`;
}
function ttsBarInner(){
  return `<div class="tts-bar"><button class="tts-go" data-tts="play">${TTS_IC}<span><b>${esc(T("Lytt til teksten", "Listen to the text"))}</b><small>${esc(T("Få teorien lest høyt", "Have the theory read aloud"))}</small></span></button></div>`;
}
// Liten høyttalerknapp til topplinjen. root = CSS-velger for teksten som skal leses.
function ttsTopBtn(root){
  return TTS_OK ? `<button class="iconbtn tts-top" data-tts="play" data-root="${esc(root)}" aria-label="${esc(T("Les teksten høyt", "Read the text aloud"))}" title="${esc(T("Les høyt", "Read aloud"))}">${TTS_IC}</button>` : "";
}
// Enkel opplesning av formler: \frac{a}{b} → a delt på b, x^2 → x i andre, osv.
function ttsTex(s){
  const nb = LANG !== "en";
  return String(s).replace(/\{,\}/g, ",").replace(/\\[dt]?frac(\d)(\d)/g, "\\frac{$1}{$2}").replace(/\\[dt]?frac\s*\{([^{}]*)\}\{([^{}]*)\}/g, nb ? "$1 delt på $2" : "$1 over $2").replace(/\^\{?2\}?/g, nb ? " i andre" : " squared").replace(/\^\{?3\}?/g, nb ? " i tredje" : " cubed")
    .replace(/\^\{([^{}]*)\}/g, nb ? " opphøyd i $1" : " to the power $1").replace(/\^(\w)/g, nb ? " opphøyd i $1" : " to the power $1").replace(/\\sqrt\{([^{}]*)\}/g, nb ? "kvadratroten av $1" : "the square root of $1")
    .replace(/\\cdot|\\times/g, nb ? " ganger " : " times ").replace(/\\approx/g, nb ? " omtrent lik " : " approximately ").replace(/\\Delta\s*/g, nb ? "delta " : "delta ").replace(/\\pi/g, " pi ")
    .replace(/=/g, nb ? " er lik " : " equals ").replace(/\+/g, nb ? " pluss " : " plus ").replace(/(^|[^a-zA-Z])-/g, nb ? "$1 minus " : "$1 minus ").replace(/\\(text|mathrm|mathbf|operatorname)\{([^{}]*)\}/g, "$2").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}_\\]/g, " ").replace(/\s+/g, " ").trim();
}
function ttsText(el){
  const c = el.cloneNode(true);
  c.querySelectorAll(".katex").forEach(k => { const a = k.querySelector("annotation"); k.replaceWith(" " + (a ? ttsTex(a.textContent) : "") + " "); });
  c.querySelectorAll("button,svg,.tts-bar").forEach(x => x.remove());
  return c.textContent.replace(/[«»"]/g, "").replace(/\s+/g, " ").trim();
}
// Lange avsnitt deles i setninger (Chrome stopper ofte lange ytringer etter ca. 15 sekunder).
function ttsSplit(s){
  const out = []; let cur = "";
  for(const p of s.split(/(?<=[.!?:;])\s+/)){ if((cur + " " + p).length > 220 && cur){ out.push(cur); cur = p; } else cur = cur ? cur + " " + p : p; }
  if(cur) out.push(cur); return out;
}
const TTS_SKIP = ".mp,.ty-key,.fig,figure,.sim,.tl,.wg,.tts-bar,.tch,.gd-cta,.cy,.pf-th,.lab-th,button";
function ttsCollect(root){
  return [...root.querySelectorAll("h1,h3,h4,p,li,.callout")].filter(el => !el.closest(TTS_SKIP) && !(el.tagName === "P" && el.closest(".callout")) && !(el.tagName === "P" && el.closest("li")))
    .map(el => ({ el, parts: ttsSplit(ttsText(el)) })).filter(x => x.parts.length && x.parts[0].length > 1);
}
// Stemmer for språket, best først. Nevrale stemmer (Edge: Pernille/Finn/Iselin «Online (Natural)», Apple: Nora forbedret/premium,
// Android: Google norsk) høres langt mer naturlige ut enn de gamle. Valget huskes (S.ttsVoice = voiceURI).
const ttsQ = v => /natural|neural|premium|enhanced|forbedret|wavenet/i.test(v.name) ? 3 : /google|pernille|finn|iselin|nora|siri/i.test(v.name) ? 2 : 1;
function ttsVoices(){
  const vs = speechSynthesis.getVoices(), want = LANG === "en" ? /^en/i : /^(nb|no|nn)/i;
  const cand = vs.filter(v => want.test(v.lang) || (LANG !== "en" && /norw|norsk|bokm/i.test(v.name)));
  const score = v => ttsQ(v) * 2 + (/microsoft|google/i.test(v.name) ? 0.5 : 0) + (LANG === "en" && /GB/i.test(v.lang) ? 0.3 : 0);
  return cand.sort((a, b) => score(b) - score(a));
}
function ttsVoice(){ const c = ttsVoices(), mine = S.ttsVoice && c.find(v => v.voiceURI === S.ttsVoice[LANG]); return mine || c[0] || null; }
// Forkortelser og enheter leses som ord: «f.eks.» → «for eksempel», «12 km/h» → «12 kilometer i timen».
const TTS_ABBR = { nb: [[/\bf\.eks\./gi, "for eksempel"], [/\bca\./gi, "cirka"], [/\bbl\.a\./gi, "blant annet"], [/\bdvs\./gi, "det vil si"], [/\bosv\./gi, "og så videre"], [/\bm\.m\./gi, "med mer"],
    [/\bevt\./gi, "eventuelt"], [/\bnr\./gi, "nummer"], [/\bpga\./gi, "på grunn av"], [/\bmht\./gi, "med hensyn til"], [/\biht\./gi, "i henhold til"], [/\bt\.o\.m\./gi, "til og med"], [/\binkl\./gi, "inkludert"], [/\bjf\./gi, "jamfør"]],
  en: [[/\be\.g\./gi, "for example"], [/\bi\.e\./gi, "that is"], [/\betc\./gi, "et cetera"], [/\bapprox\./gi, "approximately"], [/\bvs\./gi, "versus"]] };
const TTS_UNITS = [["km/h", "kilometer i timen", "kilometres per hour"], ["m/s²", "meter per sekund i andre", "metres per second squared"], ["m/s", "meter per sekund", "metres per second"], ["kWh", "kilowattimer", "kilowatt hours"],
  ["kW", "kilowatt", "kilowatts"], ["MW", "megawatt", "megawatts"], ["°C", "grader", "degrees"], ["%", "prosent", "percent"], ["‰", "promille", "per mille"], ["m²", "kvadratmeter", "square metres"], ["m³", "kubikkmeter", "cubic metres"],
  ["cm²", "kvadratcentimeter", "square centimetres"], ["cm³", "kubikkcentimeter", "cubic centimetres"], ["mm", "millimeter", "millimetres"], ["cm", "centimeter", "centimetres"], ["km", "kilometer", "kilometres"], ["kg", "kilo", "kilograms"],
  ["mg", "milligram", "milligrams"], ["ml", "milliliter", "millilitres"], ["dl", "desiliter", "decilitres"], ["kr", "kroner", "kroner"], ["kN", "kilonewton", "kilonewtons"], ["Nm", "newtonmeter", "newton metres"], ["Hz", "hertz", "hertz"]];
function ttsSay(s){
  const nb = LANG !== "en"; let t = String(s);
  for(const [re, w] of TTS_ABBR[nb ? "nb" : "en"]) t = t.replace(re, w);
  for(const [u, a, b] of TTS_UNITS){ const re = new RegExp("(\\d)\\s?" + u.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![A-Za-zæøåÆØÅ²³])", "g"); t = t.replace(re, "$1 " + (nb ? a : b)); }
  return t.replace(/−/g, nb ? " minus " : " minus ").replace(/\s+/g, " ").trim();
}
const ttsRate = () => TTS_RATES.includes(+S.ttsRate) ? +S.ttsRate : 1;
function ttsStart(root, from = 0){
  speechSynthesis.cancel();
  const items = ttsCollect(root); if(!items.length) return;
  if(LANG !== "en" && !ttsVoice() && speechSynthesis.getVoices().length && !S.ttsWarned){ S.ttsWarned = 1; save(); toast(T("Fant ingen norsk stemme på enheten – den leser med standardstemmen. Du kan laste ned norsk stemme i innstillingene for tekst-til-tale.", "No Norwegian voice found – using the default voice.")); }
  TTS = { root, items, i: from, playing: true, fails: 0, seq: (TTS ? TTS.seq : 0) + 1 };
  S.stats ||= {}; S.stats.tts = (+S.stats.tts || 0) + 1; if(typeof stEv === "function") stEv("tts", typeof screen !== "undefined" ? screen : null, LANG);
  ttsSpeak(); ttsUI();
}
function ttsSpeak(){
  if(!TTS || !TTS.playing) return;
  const T0 = TTS, it = T0.items[T0.i];
  if(!it || !T0.root.isConnected){ ttsStop(); return; }
  document.querySelectorAll(".tts-on").forEach(x => x.classList.remove("tts-on"));
  it.el.classList.add("tts-on");
  const r = it.el.getBoundingClientRect(); if(r.top < 70 || r.bottom > innerHeight - 140) it.el.scrollIntoView({ block: "center", behavior: "smooth" });
  const v = ttsVoice(), seq = T0.seq; let k = 0;
  const next = () => {
    if(!TTS || TTS.seq !== seq || !TTS.playing) return;
    if(k >= it.parts.length){ TTS.i++; ttsUI(); ttsSpeak(); return; }
    const u = new SpeechSynthesisUtterance(ttsSay(it.parts[k++]));
    u.lang = v ? v.lang : (LANG === "en" ? "en-GB" : "nb-NO"); if(v) u.voice = v; u.rate = ttsRate();
    u.onend = () => { TTS && (TTS.fails = 0); next(); };
    u.onerror = e => { if(e.error === "interrupted" || e.error === "canceled") return;
      if(TTS && ++TTS.fails >= 3){ ttsStop(); toast(T("Opplesning virker ikke i denne nettleseren. Prøv en annen nettleser eller sjekk innstillingene for tekst-til-tale.", "Read-aloud doesn't work in this browser. Try another browser or check your text-to-speech settings.")); return; } next(); };
    speechSynthesis.speak(u);
  };
  next();
}
// Pause = stopp og husk avsnittet (mer pålitelig enn speechSynthesis.pause() på Android).
function ttsPause(){ if(!TTS) return; TTS.playing = false; TTS.seq++; speechSynthesis.cancel(); ttsUI(); }
function ttsResume(){ if(!TTS) return; TTS.playing = true; TTS.seq++; ttsSpeak(); ttsUI(); }
function ttsStop(){ if(TTS) TTS.seq++; TTS = null; try{ speechSynthesis.cancel(); }catch(e){} document.querySelectorAll(".tts-on").forEach(x => x.classList.remove("tts-on")); ttsUI(); }
function ttsUI(){
  let m = document.querySelector(".tts-mini");
  if(!TTS){ if(m) m.remove(); document.querySelectorAll(".tts-bar,.tts-top").forEach(b => b.classList.remove("on")); return; }
  if(!m){ m = document.createElement("div"); m.className = "tts-mini"; m.setAttribute("role", "region"); m.setAttribute("aria-label", T("Opplesning", "Read aloud")); document.body.appendChild(m); }
  const n = TTS.items.length, i = Math.min(TTS.i + 1, n);
  m.innerHTML = `<button data-tts="${TTS.playing ? "pause" : "resume"}" aria-label="${esc(TTS.playing ? T("Pause", "Pause") : T("Fortsett", "Resume"))}">${TTS.playing ? "❚❚" : "▶"}</button>
    <button data-tts="prev" aria-label="${esc(T("Forrige avsnitt", "Previous paragraph"))}">⏮</button><button data-tts="next" aria-label="${esc(T("Neste avsnitt", "Next paragraph"))}">⏭</button>
    <span class="tts-p"><span style="width:${Math.round(100 * i / n)}%"></span></span><small>${i}/${n}</small>
    <button data-tts="rate" class="tts-rate" aria-label="${esc(T("Lesehastighet", "Speed"))}">${String(ttsRate()).replace(".", LANG === "en" ? "." : ",")}×</button>
    <button data-tts="stop" aria-label="${esc(T("Stopp", "Stop"))}">✕</button>`;
  TTS.root.querySelectorAll(".tts-bar").forEach(b => b.classList.add("on")); document.querySelectorAll(".tts-top").forEach(b => b.classList.add("on"));
}
if(TTS_OK){
  try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; }catch(e){}
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-tts]");
    if(b){ e.stopPropagation(); const a = b.dataset.tts;
      if(a === "play"){ const root = (b.dataset.root && document.querySelector(b.dataset.root)) || b.closest(".theory,.thbody,main") || document.body; if(TTS && TTS.root === root){ TTS.playing ? ttsPause() : ttsResume(); } else ttsStart(root); }
      else if(a === "voices") ttsVoiceDlg();
      else if(a === "vpick"){ (S.ttsVoice ||= {})[LANG] = b.dataset.v; save(); ttsVoiceDlg(); ttsTest(); }
      else if(a === "vtest") ttsTest();
      else if(a === "vclose") document.getElementById("ttsdlg")?.remove();
      else if(a === "pause") ttsPause(); else if(a === "resume") ttsResume(); else if(a === "stop") ttsStop();
      else if(a === "next" || a === "prev"){ if(!TTS) return; TTS.i = Math.max(0, Math.min(TTS.items.length - 1, TTS.i + (a === "next" ? 1 : -1))); TTS.seq++; speechSynthesis.cancel(); TTS.playing = true; ttsSpeak(); ttsUI(); }
      else if(a === "rate"){ const k = TTS_RATES.indexOf(ttsRate()); S.ttsRate = TTS_RATES[(k + 1) % TTS_RATES.length]; save(); if(TTS && TTS.playing){ TTS.seq++; speechSynthesis.cancel(); ttsSpeak(); } ttsUI(); }
      return; }
    // trykk på et avsnitt mens den leser: hopp dit
    if(TTS && TTS.root.isConnected){ const el = e.target.closest && e.target.closest("h3,h4,p,li,.callout"); const k = el ? TTS.items.findIndex(x => x.el === el || x.el.contains(el)) : -1;
      if(k >= 0 && !e.target.closest("a,button,input")){ TTS.i = k; TTS.seq++; speechSynthesis.cancel(); TTS.playing = true; ttsSpeak(); ttsUI(); } }
  });
  // Stopp når man går til en annen skjerm (teksten forsvinner fra siden).
  new MutationObserver(() => { if(TTS && !TTS.root.isConnected) ttsStop(); }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener("pagehide", () => { try{ speechSynthesis.cancel(); }catch(e){} });
}

// ---------- stemmevelger ----------
function ttsTest(){ try{ speechSynthesis.cancel(); const v = ttsVoice(), u = new SpeechSynthesisUtterance(ttsSay(T("Hei! Slik høres jeg ut når jeg leser teorien for deg. Farten er 12 m/s, f.eks. på en sykkel.", "Hi! This is how I sound when I read the theory to you. The speed is 12 m/s, e.g. on a bike.")));
  u.lang = v ? v.lang : (LANG === "en" ? "en-GB" : "nb-NO"); if(v) u.voice = v; u.rate = ttsRate(); speechSynthesis.speak(u); }catch(e){} }
function ttsTips(){
  const ua = navigator.userAgent, edge = /Edg\//.test(ua), apple = /Mac|iPhone|iPad/.test(ua) && !edge, android = /Android/.test(ua);
  if(LANG === "en") return "";
  if(edge) return "";
  if(apple) return T("Beste norske stemme på iPhone/Mac: Innstillinger → Tilgjengelighet → Opplest innhold → Stemmer → Norsk → last ned «Nora (forbedret)» eller premium. Start appen på nytt etterpå.", "");
  if(android) return T("Beste norske stemme på Android: Innstillinger → Tilgjengelighet → Tekst-til-tale → Google talemotor → Installer stemmedata → Norsk (bokmål).", "");
  return T("De mest naturlige norske stemmene er gratis i Microsoft Edge (Pernille, Finn og Iselin). Åpne axle.no i Edge for å bruke dem.", "");
}
function ttsVoiceDlg(){
  let d = document.getElementById("ttsdlg"); if(!d){ d = document.createElement("div"); d.id = "ttsdlg"; d.className = "tts-dlgbg"; document.body.appendChild(d);
    d.addEventListener("click", e => { if(e.target === d) d.remove(); }); }
  const vs = ttsVoices(), cur = ttsVoice(), best = vs.some(v => ttsQ(v) >= 3), tip = !best ? ttsTips() : "";
  const q = v => ttsQ(v) >= 3 ? `<span class="tts-q hi">${esc(T("naturlig", "natural"))}</span>` : ttsQ(v) === 2 ? `<span class="tts-q">${esc(T("god", "good"))}</span>` : "";
  d.innerHTML = `<div class="tts-dlg pop" role="dialog" aria-modal="true" aria-label="${esc(T("Velg stemme", "Choose voice"))}"><h3>🔊 ${esc(T("Velg stemme", "Choose voice"))}</h3>
    ${vs.length ? `<div class="tts-vl">${vs.map(v => `<button class="tts-v ${cur && cur.voiceURI === v.voiceURI ? "on" : ""}" data-tts="vpick" data-v="${esc(v.voiceURI)}"><b>${esc(v.name.replace(/^Microsoft |^Google /, "").replace(/ - .*$/, ""))}</b>${q(v)}<small>${esc(v.lang)}${v.localService ? "" : " · " + esc(T("på nett", "online"))}</small></button>`).join("")}</div>`
      : `<p>${esc(T("Fant ingen norske stemmer på denne enheten.", "No voices found for this language on this device."))}</p>`}
    ${tip ? `<p class="tts-tip">💡 ${esc(tip)}</p>` : ""}
    <div class="tts-da"><button class="big" data-tts="vtest">▶ ${esc(T("Test stemmen", "Test the voice"))}</button><button class="big ghost" data-tts="vclose">${esc(T("Ferdig", "Done"))}</button></div></div>`;
}
if(TTS_OK) try{ speechSynthesis.addEventListener("voiceschanged", () => { if(document.getElementById("ttsdlg")) ttsVoiceDlg(); }); }catch(e){}
