// ============================================================
//  SKILTSPILLET (førerkort): finn skiltet eller hva det betyr, på tid, med kombo, tre liv og rekord.
//  • «Finn skiltet»: navnet vises, du trykker på riktig skilt av fire.  • «Hva betyr det?»: skiltet vises, du velger navnet.
//  • Velg alle skilt eller én skiltgruppe. Skilt du har bommet på kommer oftere (S.signSt[navn] = [sett, riktige, sist riktig]).
//  • Poeng: 100 + fartsbonus (opptil 100), ganget med kombo (×2 fra 3 på rad, ×3 fra 6, ×4 fra 10). Feil eller tiden ute: −1 liv.
//  Skjermen er DV.view === "game" i drive.js; handlingene heter «dvsg…».
// ============================================================
const SG_GROUPS = [["all", "Alle skilt", "All signs"], ["fare", "Fare", "Warning"], ["forbud", "Forbud", "Prohibitory"], ["pabud", "Påbud", "Mandatory"], ["oppl", "Opplysning", "Information"], ["vik", "Vikeplikt", "Right of way"]];
const SG_LIVES = 3, SG_MAX = 25; // en runde er maks 25 skilt – fullfører du med liv igjen, får du bonus
let SG = null;
const sgPool = g => FK_SIGN_INFO.filter(s => FK_SIGNS[s[0]] && (g === "all" ? !["linje", "lys"].includes(s[1]) : s[1] === g));
const sgSt = () => S.signSt ||= {};
const sgKnown = n => { const s = sgSt()[n]; return !!s && s[1] >= 2 && s[2] === 1 && s[1] / s[0] >= 0.7; };
// Hvor mange skilt du kan (til oversikten og skiltlista).
function sgMastery(){ const all = sgPool("all"); return { known: all.filter(s => sgKnown(s[0])).length, total: all.length }; }
const sgBest = () => (S.signBest ||= {});
const sgTime = () => Math.max(2.5, 8 - SG.ok * 0.22) * 1000; // tydelig kortere tid for hvert riktige svar (8 s → 2,5 s)
function sgNextQ(){
  const pool = sgPool(SG.group), st = sgSt();
  // vekt: usette og feil oftere, sist spurte aldri rett etter hverandre
  const w = s => { const x = st[s[0]]; return (SG.recent.includes(s[0]) ? 0.05 : 1) * (!x ? 2.2 : x[2] ? 1 + (1 - x[1] / x[0]) * 2 : 3.2); };
  let r = Math.random() * pool.reduce((a, s) => a + w(s), 0), ans = pool[0];
  for(const s of pool){ r -= w(s); if(r <= 0){ ans = s; break; } }
  // distraktorer: helst fra samme gruppe (vanskeligere), ellers fra alle
  const same = shuffle(sgPool(ans[1]).filter(s => s[0] !== ans[0])), rest = shuffle(sgPool("all").filter(s => s[0] !== ans[0] && s[1] !== ans[1]));
  const opts = shuffle([ans, ...same.concat(rest).slice(0, 3)]);
  const kind = SG.mode === "mix" ? (Math.random() < 0.5 ? "pick" : "name") : SG.mode;
  SG.q = { ans: ans[0], opts: opts.map(s => s[0]), kind, picked: null, t0: performance.now(), dur: sgTime() };
  SG.recent = [ans[0], ...SG.recent].slice(0, Math.min(6, pool.length - 1));
}
function sgStart(group = (SG && SG.group) || "all", mode = (SG && SG.mode) || "mix"){
  SG = { group, mode, score: 0, combo: 0, maxCombo: 0, lives: SG_LIVES, n: 0, ok: 0, missed: [], recent: [], over: false, fx: null };
  sgNextQ(); DV = { view: "game" }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); sgTick();
}
function sgTick(){
  cancelAnimationFrame(sgTick.raf);
  const step = () => {
    if(!SG || SG.over || !SG.q || SG.q.picked != null || screen !== "drive" || !DV || DV.view !== "game") return;
    const left = 1 - (performance.now() - SG.q.t0) / SG.q.dur, bar = document.getElementById("sgtime");
    if(bar){ bar.style.transform = `scaleX(${Math.max(0, left).toFixed(4)})`; bar.className = "sg-time " + (left < 0.25 ? "r" : left < 0.55 ? "y" : "g"); }
    if(left <= 0){ sgAnswer(-1); return; }
    sgTick.raf = requestAnimationFrame(step);
  };
  sgTick.raf = requestAnimationFrame(step);
}
function sgAnswer(j){
  const q = SG.q; if(!q || q.picked != null) return;
  cancelAnimationFrame(sgTick.raf);
  const ok = j >= 0 && q.opts[j] === q.ans, left = Math.max(0, 1 - (performance.now() - q.t0) / q.dur);
  q.picked = j; SG.n++;
  const st = sgSt()[q.ans] ||= [0, 0, 0]; st[0]++; if(ok) st[1]++; st[2] = ok ? 1 : 0;
  if(ok){ SG.ok++; SG.combo++; SG.maxCombo = Math.max(SG.maxCombo, SG.combo);
    const mult = SG.combo >= 10 ? 4 : SG.combo >= 6 ? 3 : SG.combo >= 3 ? 2 : 1, pts = (100 + Math.round(left * 100)) * mult;
    SG.score += pts; SG.fx = { pts, mult }; sfx("ok", SG.combo); buzz(true); }
  else { SG.combo = 0; SG.lives--; SG.fx = { miss: j < 0 ? "time" : "wrong" }; SG.missed.push(q.ans); sfx("bad"); buzz(false); }
  save(); render();
  if(ok){ const el = document.querySelector(".sg-opt.ok"); if(el) burst(el, 10); }
  clearTimeout(sgAnswer.t);
  sgAnswer.t = setTimeout(() => { if(!SG || DV.view !== "game") return; if(SG.lives <= 0 || SG.n >= SG_MAX) return sgOver(); SG.fx = null; sgNextQ(); render(); sgTick(); }, ok ? 650 : 1500);
}
function sgOver(){
  SG.over = true; SG.full = SG.lives > 0 && SG.n >= SG_MAX; if(SG.full){ SG.bonus = SG.lives * 500; SG.score += SG.bonus; }
  const key = SG.group + ":" + SG.mode, best = sgBest(), rec = SG.score > (best[key] || 0);
  SG.prevBest = best[key] || 0; SG.record = rec && SG.score > 0; if(rec) best[key] = SG.score;
  S.stats ||= {}; S.stats.signGames = (+S.stats.signGames || 0) + 1;
  const st = awardXP(3 + Math.min(12, Math.floor(SG.ok / 3))); bdgToast(checkBadges()); save(); render(); window.scrollTo(0, 0);
  setTimeout(() => SG && SG.record ? confetti("level") : sfx("complete"), 200); if(st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 900);
}
const sgName = n => fkSignName(n);
const sgInfo = n => FK_SIGN_INFO.find(s => s[0] === n);
function sgRender(){
  if(!SG){ DV = null; goHome(); return; }
  const top = dvTop(T("Skiltspillet", "Sign game"), T("Førerkort", "Driving licence"), SG.over ? "" : `<span class="sg-score" aria-label="${esc(T("Poeng", "Points"))}"><b>${SG.score}</b></span>`);
  if(SG.over){
    const missed = [...new Set(SG.missed)], acc = SG.n ? Math.round(SG.ok / SG.n * 100) : 0, m = sgMastery();
    $app.innerHTML = `${top}<main class="wrap sg sg-over">
      <div class="sg-final ${SG.record ? "rec" : ""}">${SG.record ? `<span class="sg-rec">🏆 ${esc(T("Ny rekord!", "New record!"))}</span>` : ""}<div class="sg-big">${SG.score}</div><small>${esc(T("poeng", "points"))}</small>${SG.full ? `<p class="sg-full">🏁 ${esc(T(`Hele runden klart! +${SG.bonus} bonus for ${SG.lives} liv igjen`, `Whole round done! +${SG.bonus} bonus for ${SG.lives} lives left`))}</p>` : ""}
        <div class="sg-stats"><span><b>${SG.ok}</b>${esc(T("riktige", "correct"))}</span><span><b>${acc} %</b>${esc(T("treff", "accuracy"))}</span><span><b>×${SG.maxCombo}</b>${esc(T("lengste kombo", "best streak"))}</span></div>
        <p>${esc(SG.record ? T(`Forrige rekord var ${SG.prevBest}.`, `Previous record was ${SG.prevBest}.`) : T(`Rekorden din er ${sgBest()[SG.group + ":" + SG.mode] || 0}.`, `Your record is ${sgBest()[SG.group + ":" + SG.mode] || 0}.`))} ${esc(T(`Du kan ${m.known} av ${m.total} skilt.`, `You know ${m.known} of ${m.total} signs.`))}</p></div>
      <button class="big" data-a="dvsgagain">🎮 ${esc(T("Spill igjen", "Play again"))}</button>
      ${missed.length ? `<h3 class="grp">${esc(T("Skilt du bommet på", "Signs you missed"))}</h3><div class="sg-missed">${missed.map(n => { const s = sgInfo(n);
        return `<div class="sg-mrow">${fkSign(n, 64)}<div><b>${esc(sgName(n))}</b><small>${esc(s ? T(s[4], s[5]) : "")}</small></div></div>`; }).join("")}</div>` : `<p class="dv-note">${esc(T("Ingen bom. Imponerende!", "No misses. Impressive!"))}</p>`}
      <button class="big ghost" data-a="dvsgmenu">${esc(T("Velg skiltgruppe", "Choose sign group"))}</button>
      <button class="big ghost" data-a="dvclose">${esc(T("Til oversikten", "To the overview"))}</button></main>`;
    return;
  }
  const q = SG.q, rev = q.picked != null, fx = SG.fx || {};
  const hearts = Array.from({ length: SG_LIVES }, (_, k) => `<i class="${k < SG.lives ? "" : "lost"}">❤️</i>`).join("");
  const mult = SG.combo >= 10 ? 4 : SG.combo >= 6 ? 3 : SG.combo >= 3 ? 2 : 1;
  const cls = j => !rev ? "" : q.opts[j] === q.ans ? "ok" : q.picked === j ? "bad" : "dim";
  const prompt = q.kind === "pick"
    ? `<p class="sg-ask">${esc(T("Finn skiltet", "Find the sign"))}</p><h2 class="sg-name">${esc(sgName(q.ans))}</h2>`
    : `<p class="sg-ask">${esc(T("Hva betyr skiltet?", "What does the sign mean?"))}</p><div class="sg-sign">${fkSign(q.ans, 132)}</div>`;
  const opts = q.kind === "pick"
    ? `<div class="sg-grid">${q.opts.map((n, j) => `<button class="sg-opt sg-tile ${cls(j)}" style="--d:${j * 55}ms" data-a="dvsgans" data-i="${j}" ${rev ? "disabled" : ""} aria-label="${esc(sgName(n))}">${fkSign(n, 96)}${rev ? `<small>${esc(sgName(n))}</small>` : ""}</button>`).join("")}</div>`
    : `<div class="sg-list">${q.opts.map((n, j) => `<button class="sg-opt sg-txt ${cls(j)}" style="--d:${j * 55}ms" data-a="dvsgans" data-i="${j}" ${rev ? "disabled" : ""}>${esc(sgName(n))}</button>`).join("")}</div>`;
  const info = sgInfo(q.ans);
  $app.innerHTML = `${top}<main class="wrap sg">
    <div class="sg-hud"><span class="sg-lives" aria-label="${esc(T(`${SG.lives} liv igjen`, `${SG.lives} lives left`))}">${hearts}</span><span class="sg-n">${Math.min(SG.n + (rev ? 0 : 1), SG_MAX)}/${SG_MAX}</span>
      <span class="sg-combo ${SG.combo >= 3 ? "on" : ""}" key="${SG.combo}">${SG.combo >= 3 ? `🔥 ${SG.combo} ${esc(T("på rad", "in a row"))} · ×${mult}` : esc(T(`${SG.ok} riktige`, `${SG.ok} correct`))}</span></div>
    <div class="sg-timebar"><i id="sgtime" class="sg-time g" style="transform:scaleX(${rev ? 0 : 1})"></i></div>
    <section class="sg-card ${rev ? (fx.pts ? "ok" : "bad") : ""}">${prompt}${fx.pts ? `<span class="sg-float">+${fx.pts}${fx.mult > 1 ? ` <em>×${fx.mult}</em>` : ""}</span>` : ""}</section>
    ${opts}
    ${rev && !fx.pts ? `<div class="dv-fb bad sg-fb"><b>${esc(fx.miss === "time" ? T("Tiden gikk ut", "Time ran out") : T("Feil", "Wrong"))}</b><p>${q.kind === "pick" ? "" : fkSign(q.ans, 44)}<span>${esc(T("Riktig svar:", "Correct answer:"))} <b>${esc(sgName(q.ans))}</b>. ${esc(info ? T(info[4], info[5]) : "")}</span></p></div>` : ""}
  </main>`;
}
function sgMenuHTML(){
  const best = sgBest(), m = sgMastery(), mode = (SG && SG.mode) || S.sgMode || "mix";
  return `<section class="sg-menu"><div class="sg-mhead"><span class="sg-mic" aria-hidden="true">🎮</span><div><b>${esc(T("Skiltspillet", "Sign game"))}</b><small>${esc(T(`Du kan ${m.known} av ${m.total} skilt · 25 skilt per runde, 3 liv, raskere og raskere`, `You know ${m.known} of ${m.total} signs · 25 signs per round, 3 lives, faster and faster`))}</small></div></div>
    <div class="sg-mbar"><i style="width:${Math.round(m.known / Math.max(1, m.total) * 100)}%"></i></div>
    <div class="seg sg-modes">${[["mix", "Blandet", "Mixed"], ["pick", "Finn skiltet", "Find the sign"], ["name", "Hva betyr det?", "What does it mean?"]].map(([k, nb, en]) => `<button class="${mode === k ? "on" : ""}" data-a="dvsgmode" data-m="${k}">${esc(T(nb, en))}</button>`).join("")}</div>
    <div class="sg-groups">${SG_GROUPS.map(([g, nb, en]) => { const n = sgPool(g).length, b = best[g + ":" + mode] || 0;
      return `<button class="sg-gbtn" data-a="dvsgplay" data-g="${g}"><span class="sg-gic">${fkSign(g === "all" ? "elg" : sgPool(g)[0][0], 40)}</span><span><b>${esc(T(nb, en))}</b><small>${esc(T(`${n} skilt`, `${n} signs`))}${b ? " · 🏆 " + b : ""}</small></span>${I.chevron}</button>`; }).join("")}</div></section>`;
}
function sgClick(a, dd){
  if(a === "dvsgans"){ sgAnswer(+dd.i); return true; }
  if(a === "dvsgplay"){ sgStart(dd.g, (SG && SG.mode) || S.sgMode || "mix"); return true; }
  if(a === "dvsgagain"){ sgStart(); return true; }
  if(a === "dvsgmode"){ S.sgMode = dd.m; if(SG) SG.mode = dd.m; save(); render(); return true; }
  if(a === "dvsgmenu"){ DV = { view: "signs", game: 1 }; render(); window.scrollTo(0, 0); return true; }
  if(a === "dvsgopen"){ DV = { view: "signs", game: 1 }; screen = "drive"; overlay = null; render(); window.scrollTo(0, 0); return true; }
  return false;
}
