// ============================================================
//  ui_fit.js – små hjelpere for lesbarhet på alle skjermer:
//  1) Formler som er for brede, krympes til de passer (ingen sideveis scrolling for å lese en ligning).
//  2) Horisontale rader (fag-chips, faner, merker …) kan blas med musehjul, dra med musa og piler på PC.
//  Kjøres etter hver endring i siden (MutationObserver), samlet i én animasjonsramme.
// ============================================================
const FIT_SEL = ".dmath,.fbox .fm,.sim-eq,.tptile .tfx,.tg-val,.tg-fx,.tg-forms,.tg-solve,.tg-gen,.tg-id,.bk-glance .dmath,.cy-e .katex-display,.gd-p .katex-display,.prompt .katex-display";
const HS_SEL = ".favbar,.study-tabs,.bk-toc,.adm-tabs,.tg-tabs,.sh-friends,.ib-fresh,.ave-tabs,.cd-keys,.cd-steps,.chips,.hscroll,.sw-row";
const FIT_MIN = 0.55; // aldri mindre enn 55 % av vanlig størrelse
function fitOne(el){
  if(!el.isConnected || !el.clientWidth) return;
  if(el.dataset.fitBase == null) el.dataset.fitBase = parseFloat(getComputedStyle(el).fontSize) || 16;
  const base = +el.dataset.fitBase; el.style.fontSize = "";
  const cs = getComputedStyle(el), pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  const room = el.clientWidth - pad;
  let need = el.scrollWidth - pad;
  for(const k of el.querySelectorAll(".katex,.katex-display>.katex,svg")) need = Math.max(need, k.getBoundingClientRect().width);
  if(need > room + 1){ const f = Math.max(FIT_MIN, room / need * 0.97); el.style.fontSize = (base * f).toFixed(2) + "px"; }
}
const HS_FINE = matchMedia("(pointer:fine)");
function hsUpdate(sc){
  const l = sc.querySelector(":scope > .hs-arr.l"), r = sc.querySelector(":scope > .hs-arr.r"); if(!l || !r) return;
  const can = sc.scrollWidth > sc.clientWidth + 4;
  l.hidden = !can || sc.scrollLeft < 4; r.hidden = !can || sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 4;
}
function hsSetup(sc){
  if(sc.dataset.hs || !HS_FINE.matches) return;
  const cs = getComputedStyle(sc); if(!/auto|scroll/.test(cs.overflowX) || !/flex/.test(cs.display)) return;
  sc.dataset.hs = 1;
  const mk = d => { const b = document.createElement("button"); b.type = "button"; b.className = "hs-arr " + d; b.setAttribute("aria-label", d === "l" ? T("Bla til venstre", "Scroll left") : T("Bla til høyre", "Scroll right")); b.textContent = d === "l" ? "‹" : "›"; b.hidden = true;
    b.addEventListener("click", e => { e.stopPropagation(); e.preventDefault(); sc.scrollBy({ left: (d === "l" ? -1 : 1) * Math.max(120, sc.clientWidth * 0.7), behavior: "smooth" }); }); return b; };
  sc.prepend(mk("l")); sc.append(mk("r"));
  sc.addEventListener("scroll", () => hsUpdate(sc), { passive: true });
  // musehjul opp/ned blar sidelengs når raden kan blas
  sc.addEventListener("wheel", e => { if(Math.abs(e.deltaY) > Math.abs(e.deltaX) && sc.scrollWidth > sc.clientWidth + 4){ const before = sc.scrollLeft; sc.scrollLeft += e.deltaY; if(sc.scrollLeft !== before) e.preventDefault(); } }, { passive: false });
  // dra med musa (et klikk teller ikke som klikk hvis man har dratt)
  let down = null, moved = false;
  sc.addEventListener("pointerdown", e => { if(e.pointerType !== "mouse" || e.button !== 0 || e.target.closest(".hs-arr")) return; down = { x: e.clientX, s: sc.scrollLeft }; moved = false; });
  addEventListener("pointermove", e => { if(!down) return; const dx = e.clientX - down.x; if(Math.abs(dx) > 5){ moved = true; sc.scrollLeft = down.s - dx; sc.classList.add("hs-drag"); } });
  addEventListener("pointerup", () => { if(down){ down = null; setTimeout(() => sc.classList.remove("hs-drag"), 0); } });
  sc.addEventListener("click", e => { if(moved){ e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  hsUpdate(sc);
}
let fitRaf = 0;
function fitAll(){
  fitRaf = 0;
  document.querySelectorAll(FIT_SEL).forEach(fitOne);
  document.querySelectorAll(HS_SEL).forEach(sc => { hsSetup(sc); if(sc.dataset.hs) hsUpdate(sc); });
}
const fitSoon = () => { if(!fitRaf) fitRaf = requestAnimationFrame(fitAll); };
new MutationObserver(fitSoon).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
addEventListener("resize", () => { document.querySelectorAll("[data-fit-base]").forEach(el => delete el.dataset.fitBase); fitSoon(); });
if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitSoon);
