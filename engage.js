// ============================================================
//  ENGASJEMENT: spillernivå fra XP, kombo-bonus, rekke-milepæler og animasjoner.
// ============================================================
// Nivå n krever totalt 25·n·(n−1) XP: nivå 2 ved 50, 3 ved 150, 4 ved 300, 5 ved 500 …
const lvNeed = n => 25 * n * (n - 1);
function levelInfo(xp){
  let n = 1; while(lvNeed(n + 1) <= xp) n++;
  const lo = lvNeed(n), hi = lvNeed(n + 1);
  return { lv: n, cur: xp - lo, span: hi - lo, frac: (xp - lo) / (hi - lo), toNext: hi - xp };
}
const STREAK_MILES = [3, 7, 14, 30, 50, 100, 200, 365];
function levelBarHTML(xpBefore, xpAfter){
  const a = levelInfo(xpBefore), b = levelInfo(xpAfter), from = a.lv === b.lv ? a.frac : 0;
  return `<div class="lvbar"><div class="lvbar-h"><b>${esc(t("lvName", b.lv))}</b><span>${esc(t("lvToNext", b.toNext, b.lv + 1))}</span></div>
    <div class="lvtrack"><i style="--from:${(from * 100).toFixed(1)}%;--to:${(b.frac * 100).toFixed(1)}%"></i></div></div>`;
}
function levelUpHTML(lv){
  return `<div class="lvup"><div class="lvup-wrap"><span class="lvup-rays"></span><div class="lvup-badge"><b>${lv}</b></div></div><h2>${esc(t("lvUpTitle"))}</h2><p>${esc(t("lvUpSub", lv))}</p></div>`;
}
function streakMileHTML(n){
  return `<div class="stmile"><span class="stmile-fire">${I.fire}</span><div><b>${esc(t("stMileTitle", n))}</b><span>${esc(t("stMileSub", n))}</span></div></div>`;
}
// Tall som teller opp (resultatskjermen)
function countUp(){
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-count]").forEach(el => {
    const to = +el.dataset.count, pre = el.dataset.pre || "", suf = el.dataset.suf || "", t0 = performance.now(), dur = 900;
    const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(to * e) + suf; if(k < 1) requestAnimationFrame(step); };
    el.textContent = pre + "0" + suf; requestAnimationFrame(step);
  });
}
