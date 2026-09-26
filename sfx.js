// ============================================================
//  LYD OG «JUICE» – korte, lyse lyder som lages med Web Audio (ingen lydfiler, virker offline).
//  sfx("ok", combo): klokkespill som stiger en halvtone for hvert riktige svar på rad.
//  sfx("bad"): mykt, lavt «dunk» (ikke straffende). sfx("complete"/"level"/"badge"/"flip"/"tap"/"proof"/"xp").
//  burst(el): små stjerner som spretter ut fra et element når man svarer riktig.
//  Slås av under Innstillinger → Lyder (S.sound === false).
// ============================================================
const SFX = { ctx: null, last: {}, master: null };
function sfxCtx(){
  try{
    if(!SFX.ctx){ const AC = window.AudioContext || window.webkitAudioContext; if(!AC) return null; SFX.ctx = new AC(); SFX.master = SFX.ctx.createGain(); SFX.master.gain.value = 0.9; SFX.master.connect(SFX.ctx.destination); }
    if(SFX.ctx.state === "suspended") SFX.ctx.resume();
    return SFX.ctx;
  }catch(e){ return null; }
}
// iOS/Safari: lyden må «låses opp» av en berøring.
["pointerdown", "touchend", "keydown"].forEach(ev => document.addEventListener(ev, () => { if(typeof S !== "undefined" && S.sound !== false) sfxCtx(); }, { once: true, passive: true }));

// Én tone med myk start og eksponentiell hale. bell: legger til en lys overtone som gir klokkeklang.
function sfxTone(f, at, dur, o = {}){
  const c = SFX.ctx, t0 = c.currentTime + at, vol = o.vol ?? 0.16, osc = c.createOscillator(), g = c.createGain();
  osc.type = o.type || "sine"; osc.frequency.setValueAtTime(f, t0);
  if(o.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, f * o.slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + (o.attack ?? 0.006)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g); g.connect(SFX.master); osc.start(t0); osc.stop(t0 + dur + 0.05);
  if(o.bell){ const o2 = c.createOscillator(), g2 = c.createGain(); o2.type = "sine"; o2.frequency.setValueAtTime(f * 2.76, t0);
    g2.gain.setValueAtTime(0.0001, t0); g2.gain.exponentialRampToValueAtTime(vol * 0.28, t0 + 0.004); g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.45);
    o2.connect(g2); g2.connect(SFX.master); o2.start(t0); o2.stop(t0 + dur); }
}
// Kort støy gjennom et båndpassfilter (sveip): brukes til «vend kortet».
function sfxWhoosh(at, dur, f0, f1, vol = 0.08){
  const c = SFX.ctx, t0 = c.currentTime + at, n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
  for(let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain(); src.buffer = buf; bp.type = "bandpass"; bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(f0, t0); bp.frequency.exponentialRampToValueAtTime(f1, t0 + dur); g.gain.setValueAtTime(vol, t0);
  src.connect(bp); bp.connect(g); g.connect(SFX.master); src.start(t0);
}
const SEMI = n => Math.pow(2, n / 12);
function sfx(kind, n = 0){
  if(typeof S !== "undefined" && S.sound === false) return;
  const now = Date.now(); if(SFX.last[kind] && now - SFX.last[kind] < 70) return; SFX.last[kind] = now; // ikke dobbel lyd
  if(!sfxCtx()) return;
  try{
    if(kind === "ok"){ // to toner (kvint) som stiger med comboen, og gnistre fra 3 på rad
      const b = 587.3 * SEMI(Math.min(n, 14) - 1);
      sfxTone(b, 0, 0.32, { bell: true, vol: 0.15 }); sfxTone(b * 1.498, 0.075, 0.5, { bell: true, vol: 0.15 });
      if(n >= 3) [2, 2.52, 3].forEach((m, i) => sfxTone(b * m, 0.16 + i * 0.045, 0.22, { vol: 0.045 }));
      if(n > 0 && n % 5 === 0) [1, 1.26, 1.5, 2].forEach((m, i) => sfxTone(b * m, 0.3 + i * 0.06, 0.35, { bell: true, vol: 0.08 }));
    }
    else if(kind === "bad"){ sfxTone(196, 0, 0.22, { type: "triangle", slide: 0.7, vol: 0.11 }); sfxTone(147, 0.09, 0.26, { type: "sine", slide: 0.8, vol: 0.08 }); }
    else if(kind === "tap"){ sfxTone(1800, 0, 0.03, { vol: 0.025, attack: 0.001 }); }
    else if(kind === "xp"){ sfxTone(1568, 0, 0.07, { vol: 0.05, bell: true }); }
    else if(kind === "flip"){ sfxWhoosh(0, 0.18, 700, 2600, 0.07); }
    else if(kind === "complete"){ [523.3, 659.3, 784, 1046.5].forEach((f, i) => sfxTone(f, i * 0.085, 0.42, { bell: true, vol: 0.12 })); [523.3, 659.3, 784].forEach(f => sfxTone(f, 0.38, 0.9, { type: "triangle", vol: 0.05 })); }
    else if(kind === "level"){ [392, 523.3, 659.3, 784, 1046.5, 1318.5].forEach((f, i) => sfxTone(f, i * 0.07, 0.5, { bell: true, vol: 0.11 })); [523.3, 784, 1046.5].forEach(f => sfxTone(f, 0.46, 1.2, { type: "triangle", vol: 0.05 })); }
    else if(kind === "badge"){ for(let i = 0; i < 7; i++) sfxTone(1046.5 * SEMI([0, 4, 7, 12, 16, 19, 24][i]), i * 0.05, 0.3, { bell: true, vol: 0.06 }); }
    else if(kind === "proof"){ [261.6, 329.6, 392, 523.3].forEach(f => sfxTone(f, 0, 1.1, { type: "triangle", vol: 0.06 })); sfxTone(1046.5, 0.05, 0.6, { bell: true, vol: 0.1 }); }
  }catch(e){}
}
// Stjerner som spretter ut fra midten av et element.
function burst(el, n = 12){
  if(!el || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  const r = el.getBoundingClientRect(), w = document.createElement("div"), cols = ["#F2B51D", "#2E9E5B", "#2B59C3", "#E86A92", "#0F8A83"];
  w.className = "burst"; w.setAttribute("aria-hidden", "true"); w.style.left = (r.left + r.width / 2) + "px"; w.style.top = (r.top + r.height / 2) + "px";
  w.innerHTML = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + Math.random() * 0.4, d = 40 + Math.random() * 46;
    return `<i style="--x:${(Math.cos(a) * d).toFixed(0)}px;--y:${(Math.sin(a) * d).toFixed(0)}px;background:${cols[i % cols.length]};animation-delay:${(Math.random() * 0.06).toFixed(2)}s"></i>`; }).join("");
  document.body.appendChild(w); setTimeout(() => w.remove(), 900);
}
// «+N XP» som flyter opp fra et element.
function floatXP(el, txt){
  if(!el) return; const r = el.getBoundingClientRect(), f = document.createElement("div");
  f.className = "float-xp"; f.textContent = txt; f.style.left = (r.left + r.width / 2) + "px"; f.style.top = r.top + "px"; f.setAttribute("aria-hidden", "true");
  document.body.appendChild(f); setTimeout(() => f.remove(), 1200);
}
