// Felles avspiller for animasjonsprototypene (ingen avhengigheter). Prototype utenfor appen, se README.md.
// Tiden styres av avspilleren. Hver replikk varer planlagt tid, eller lydens lengde + PAD når innlest lyd finnes og lyden er på.
// Redusert bevegelse: trinnmodus, ett stillbilde (sluttbildet) per replikk, Forrige/Neste, ingen automatisk avspilling.
(function(){
  const A = window.ANIM, PAD = 0.5, $ = s => document.querySelector(s);
  const qs = new URLSearchParams(location.search);
  const st = { lang: qs.get("lang") === "en" ? "en" : "nb", t: 0, playing: false, speed: 1, cc: true, sound: false, waitAt: -1, done: false,
    step: qs.has("step") || matchMedia("(prefers-reduced-motion: reduce)").matches, audio: null, manifest: null, last: 0 };
  if (qs.get("theme")) document.documentElement.dataset.theme = qs.get("theme");
  const T = (nb, en) => st.lang === "en" ? en : nb, P2 = a => a[st.lang === "en" ? 1 : 0];
  const fmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const UI = {
    play: ["Spill", "Play"], pause: ["Pause", "Pause"], cont: ["Fortsett", "Continue"], replay: ["Spill på nytt", "Replay"],
    prev: ["Forrige scene", "Previous scene"], next: ["Neste scene", "Next scene"], prevS: ["Forrige", "Previous"], nextS: ["Neste", "Next"],
    time: ["Tidslinje", "Timeline"], speed: ["Hastighet", "Speed"], cc: ["Teksting", "Captions"], sound: ["Lyd", "Sound"],
    noSound: ["Ingen innlest lyd ennå (se README)", "No recorded audio yet (see README)"], scene: ["Scene", "Scene"],
    step: ["Trinnvis visning (redusert bevegelse)", "Step-by-step view (reduced motion)"], stepOn: ["Trinnvis", "Step by step"],
    tr: ["Transkript med beskrivelse av bildet", "Transcript with description of the picture"], see: ["Bildet", "Picture"],
    chk: ["Sjekk at du skjønte det", "Check that you got it"], right: ["Riktig.", "Correct."], wrong: ["Ikke helt.", "Not quite."],
    lang: ["English", "Norsk"], wait: ["Tenkepause: trykk Fortsett når du er klar.", "Thinking pause: press Continue when you are ready."]
  };
  const U = k => P2(UI[k]);

  // Varigheter: lyd (manifest) når lyden er på, ellers planlagt tid.
  function dur(i){ const a = st.sound && st.manifest && st.manifest[st.lang] && st.manifest[st.lang][A.lines[i].id]; return a ? a.dur + PAD : A.lines[i].d; }
  let starts = [], total = 0;
  function layout(){ starts = []; total = 0; A.lines.forEach((l, i) => { starts.push(total); total += dur(i); }); }
  function at(t){ // → [replikk, fremdrift]
    t = Math.max(0, Math.min(total, t));
    for (let i = A.lines.length - 1; i >= 0; i--) if (t >= starts[i]) return [i, Math.min(1, (t - starts[i]) / dur(i))];
    return [0, 0];
  }
  const sceneStart = s => starts[A.lines.findIndex(l => l.s === s)];

  // ---------- tegning ----------
  function render(){
    const [i, p0] = at(st.t), p = st.step ? 1 : p0, l = A.lines[i];
    A.setLang(st.lang);
    const g = A.graph;
    $("#stage").innerHTML = `<svg viewBox="0 0 ${A.W} ${A.H}" role="img" aria-labelledby="stage-d"><desc id="stage-d">${esc(P2(l.see))}</desc>` +
      `<defs><clipPath id="gclip"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}"/></clipPath></defs>${A.frame(i, p)}</svg>`;
    const cap = P2(l.vo);
    if ($("#cap").dataset.i !== i + st.lang) { $("#cap").textContent = cap; $("#cap").dataset.i = i + st.lang; }
    $("#cap").hidden = !st.cc;
    $("#scene").textContent = `${U("scene")} ${l.s + 1}/${A.scenes.length}: ${P2(A.scenes[l.s])}`;
    $("#time").value = String(Math.round(st.t * 10)); $("#time").max = String(Math.round(total * 10));
    $("#time").setAttribute("aria-valuetext", fmt(st.t) + " / " + fmt(total));
    $("#clock").textContent = st.step ? `${i + 1} / ${A.lines.length}` : fmt(st.t) + " / " + fmt(total);
    const waiting = st.waitAt === i && !st.playing;
    $("#play").textContent = st.done && !st.playing ? U("replay") : st.playing ? U("pause") : waiting ? U("cont") : U("play");
    $("#play").setAttribute("aria-pressed", st.playing ? "true" : "false");
    $("#wait").hidden = !waiting; $("#wait").textContent = U("wait");
    $("#prev").textContent = "‹ " + (st.step ? U("prevS") : U("prev")); $("#next").textContent = (st.step ? U("nextS") : U("next")) + " ›";
    $("#chk").hidden = !st.done;
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- lyd ----------
  function audioFor(i){ const m = st.manifest && st.manifest[st.lang]; return st.sound && m && m[A.lines[i].id] ? m[A.lines[i].id] : null; }
  function syncAudio(force){
    const [i, p] = at(st.t), a = audioFor(i);
    if (!a || !st.playing){ if (st.audio) st.audio.pause(); return; }
    const off = p * dur(i);
    if (!st.audio) st.audio = new Audio();
    if (st.audio.dataset.i !== String(i) + st.lang || force){
      st.audio.dataset.i = String(i) + st.lang; st.audio.src = a.file;
      st.audio.currentTime = Math.min(off, a.dur);
    }
    st.audio.playbackRate = st.speed;
    if (off < a.dur && st.audio.paused) st.audio.play().catch(() => {});
  }

  // ---------- avspilling ----------
  function tick(now){
    if (!st.playing) return;
    const dt = Math.min(0.1, (now - st.last) / 1000) * st.speed; st.last = now;
    const [i0] = at(st.t); let t = st.t + dt;
    // Tenkepause: stopp ved slutten av replikken med wait.
    if (A.lines[i0].wait && t >= starts[i0] + dur(i0)){ st.t = starts[i0] + dur(i0) - 1e-6; st.waitAt = i0; pause(); return; }
    if (t >= total){ st.t = total; st.done = true; pause(); return; }
    st.t = t; const [i1] = at(st.t); if (i1 !== i0) syncAudio(true);
    render(); requestAnimationFrame(tick);
  }
  function play(){
    if (st.step) return stepGo(1);
    if (st.done){ st.t = 0; st.done = false; }
    if (st.waitAt >= 0){ st.t = starts[st.waitAt] + dur(st.waitAt); st.waitAt = -1; }
    st.playing = true; st.last = performance.now(); syncAudio(true); render(); requestAnimationFrame(tick);
  }
  function pause(){ st.playing = false; if (st.audio) st.audio.pause(); render(); }
  function seek(t){ st.t = Math.max(0, Math.min(total, t)); st.done = st.t >= total; st.waitAt = -1; syncAudio(true); render(); }
  function sceneGo(d){
    const [i] = at(st.t), s = A.lines[i].s;
    let ns = d < 0 && st.t - sceneStart(s) > 1.5 ? s : s + d; // første trykk på Forrige går til starten av scenen
    ns = Math.max(0, Math.min(A.scenes.length - 1, ns));
    seek(sceneStart(ns) + 1e-6);
  }
  function stepGo(d){ // trinnmodus: én replikk om gangen, sluttbildet
    const [i] = at(st.t), ni = Math.max(0, Math.min(A.lines.length - 1, i + d));
    st.done = d > 0 && i === A.lines.length - 1; st.t = starts[ni] + 1e-6; render();
    if (st.done) $("#chk").scrollIntoView({ block: "nearest" });
  }

  // ---------- oppsett ----------
  function texts(){
    document.documentElement.lang = st.lang === "en" ? "en" : "nb";
    document.title = P2(A.title) + " – Axle (prototype)";
    $("#title").textContent = P2(A.title);
    $("#time").setAttribute("aria-label", U("time")); $("#speed").setAttribute("aria-label", U("speed"));
    $("#prev").setAttribute("aria-label", st.step ? U("prevS") : U("prev")); $("#next").setAttribute("aria-label", st.step ? U("nextS") : U("next"));
    $("#cc-l").textContent = U("cc"); $("#snd-l").textContent = U("sound"); $("#step-l").textContent = U("stepOn");
    $("#snd").disabled = !(st.manifest && st.manifest[st.lang]); $("#snd-w").title = $("#snd").disabled ? U("noSound") : "";
    $("#snd-n").textContent = $("#snd").disabled ? U("noSound") : "";
    $("#lang").textContent = U("lang");
    $("#tr-s").textContent = U("tr");
    $("#tr").innerHTML = A.scenes.map((sc, s) => `<h3>${s + 1}. ${esc(P2(sc))}</h3>` + A.lines.filter(l => l.s === s).map(l =>
      `<p>${esc(P2(l.vo))}</p><p class="see"><b>${U("see")}:</b> ${esc(P2(l.see))}</p>`).join("")).join("");
    $("#chk-h").textContent = U("chk"); $("#chk-q").textContent = P2(A.check.q); $("#chk-f").textContent = "";
    $("#chk-o").innerHTML = A.check.opts.map((o, k) => `<button type="button" data-k="${k}">${esc(o)}</button>`).join("");
  }
  function init(){
    layout(); texts(); render();
    $("#play").onclick = () => st.playing ? pause() : play();
    $("#prev").onclick = () => st.step ? stepGo(-1) : sceneGo(-1);
    $("#next").onclick = () => st.step ? stepGo(1) : sceneGo(1);
    $("#time").oninput = e => { pause(); seek(+e.target.value / 10); };
    $("#speed").onchange = e => { st.speed = +e.target.value; if (st.audio) st.audio.playbackRate = st.speed; };
    $("#cc").onchange = e => { st.cc = e.target.checked; render(); };
    $("#step").checked = st.step;
    $("#step").onchange = e => { st.step = e.target.checked; pause(); st.waitAt = -1; texts(); render(); };
    $("#snd").onchange = e => { const [i, p] = at(st.t); st.sound = e.target.checked; layout(); st.t = starts[i] + p * dur(i); syncAudio(true); render(); };
    $("#lang").onclick = () => { const [i, p] = at(st.t); st.lang = st.lang === "en" ? "nb" : "en"; if (!(st.manifest && st.manifest[st.lang])){ st.sound = false; $("#snd").checked = false; }
      layout(); st.t = starts[i] + p * dur(i); texts(); syncAudio(true); render(); };
    $("#chk-o").onclick = e => { const b = e.target.closest("button"); if (!b) return; const ok = +b.dataset.k === A.check.ans;
      [...$("#chk-o").children].forEach((c, k) => { c.disabled = true; c.classList.toggle("ok", k === A.check.ans); c.classList.toggle("bad", c === b && !ok);
        c.textContent = (k === A.check.ans ? "✓ " : c === b ? "✗ " : "") + A.check.opts[k]; });
      $("#chk-f").textContent = (ok ? U("right") : U("wrong")) + " " + P2(A.check.why); $("#chk-f").focus(); };
    document.addEventListener("keydown", e => {
      if (e.target.closest("input[type=range],select,textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === " " && !e.target.closest("button,input")){ e.preventDefault(); $("#play").click(); }
      else if (e.key === "ArrowLeft" && !e.target.closest("input")){ e.preventDefault(); $("#prev").click(); }
      else if (e.key === "ArrowRight" && !e.target.closest("input")){ e.preventDefault(); $("#next").click(); }
    });
    // Innlest lyd (valgfri): audio/manifest.json lages av ../voice.mjs. Mangler den, vises bare teksting.
    fetch("audio/manifest.json", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(m => {
      if (!m) return; for (const lg in m) for (const id in m[lg]) if (id[0] !== "_") m[lg][id].file = "audio/" + m[lg][id].file;
      st.manifest = m; texts(); render();
    }).catch(() => {});
    window.AXANIM = { st, seek, at, total: () => total, starts: () => starts, layout, render, stepGo }; // for tools/check_anim_proto.js
  }
  init();
})();
