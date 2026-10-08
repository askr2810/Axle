// ============================================================
//  VELKOMMEN – første gang appen åpnes: en egen side (ikke en popup) som forteller hva Axle er,
//  lar deg velge språk og ett eller flere studier, og så tilpasser appen seg valget.
//  Vises bare når studiet ikke er valgt (se studyNeedsAsk i studies.js).
// ============================================================
const WEL = { sel: [] };
function renderWelcome(){
  const sel = WEL.sel, main = sel[0] && STUDY(sel[0]);
  const pts = [["📖", T("Enkelt først", "Simple first"), T("Kort forklaring og en tegning før formlene.", "A short explanation and a drawing before the formulas.")],
    ["🧪", T("Prøv selv", "Try it yourself"), T("Dra i figurene og se hva som skjer.", "Drag the figures and see what happens.")],
    ["🔁", T("Øv til det sitter", "Practise until it sticks"), T("Det du bommer på, kommer igjen.", "What you miss comes back.")]];
  $app.innerHTML = `<main class="wel">
    <div class="wel-top"><span class="wel-logo">${PLATFORM !== "claude" ? `<img src="icons/logo-192.png" width="40" height="40" alt="">` : ""}Axle</span>
      <div class="seg wel-lang" role="group" aria-label="Språk / Language">${[["nb", "Norsk"], ["en", "English"]].map(([l, n]) => `<button class="${LANG === l ? "on" : ""}" data-a="wellang" data-l="${l}" aria-pressed="${LANG === l}">${n}</button>`).join("")}</div></div>
    <section class="wel-hero"><h1>${esc(T("Læring gjort enkelt", "Learning made simple"))}</h1>
      <p>${esc(T("Axle gjør vanskelige temaer enkle – fra teoriprøven til ingeniørmatte. Gratis og uten reklame.", "Axle makes hard topics simple – from the driving test to engineering maths. Free and without ads."))}</p>
      <div class="wel-pts">${pts.map(([ic, h, p]) => `<div><span aria-hidden="true">${ico(ic)}</span><b>${esc(h)}</b><small>${esc(p)}</small></div>`).join("")}</div></section>
    <h2 class="wel-h">${esc(T("Hva vil du lære?", "What do you want to learn?"))}</h2>
    <p class="wel-sub">${esc(T("Velg ett eller flere. Det første du velger, ser du først. Du kan endre det når som helst.", "Pick one or more. The first one you pick is shown first. You can change it any time."))}</p>
    <div class="wel-grid">${STUDIES.map(s => { const k = sel.indexOf(s.id);
      return `<button class="wel-st ${k >= 0 ? "on" : ""}" data-a="welst" data-s="${s.id}" aria-pressed="${k >= 0}"><span class="wel-ic" aria-hidden="true">${ico(s.ic)}</span><b>${esc(studyName(s))}</b><small>${esc(T(s.sub[0], s.sub[1]))}</small>
        <i class="wel-ck" aria-hidden="true">${k === 0 && sel.length > 1 ? "★" : k >= 0 ? "✓" : ""}</i></button>`; }).join("")}</div>
    <div class="wel-go"><button class="big" data-a="welgo" ${sel.length ? "" : "disabled"}>${esc(main ? T(`Kom i gang med ${studyName(main).toLowerCase()} →`, `Get started with ${studyName(main).toLowerCase()} →`) : T("Velg minst ett for å starte", "Pick at least one to start"))}</button>
      <p>${esc(T("Har du allerede en konto?", "Already have an account?"))} <button class="exlink" data-a="aclogin">${esc(T("Logg inn", "Log in"))}</button></p>
      <p class="lp-note">${esc(T("Axle er et gratis øvingsverktøy og kan inneholde feil. Ved å bruke appen godtar du", "Axle is a free practice tool and may contain mistakes. By using the app you accept the"))} <button class="exlink" data-a="terms">${esc(T("vilkårene", "terms"))}</button>.</p></div>
  </main>`;
}
function welClick(a, b){
  if(!a.startsWith("wel")) return false;
  const d = (b && b.dataset) || {};
  if(a === "wellang"){ LANG = d.l; S.lang = LANG; S.langSet = 1; saveLocal(); render(); return true; }
  if(a === "welst"){ const i = WEL.sel.indexOf(d.s); if(i >= 0) WEL.sel.splice(i, 1); else WEL.sel.push(d.s); render(); return true; }
  if(a === "welgo"){
    if(!WEL.sel.length) return true;
    S.langSet = 1; S.studyPicked = 1; S.studies = []; setStudy(WEL.sel[0]); WEL.sel.slice(1).forEach(id => { if(!myStudies().includes(id)) toggleStudy(id); });
    S.studySet = 1; S.current = STUDY(S.study).home; save();
    if(typeof stEv === "function") stEv("welcome", WEL.sel.join(","), LANG);
    screen = "home"; render(); window.scrollTo(0, 0);
    toast(T("Velkommen til Axle! 🎉", "Welcome to Axle! 🎉")); setTimeout(bootPrompts, 600); return true;
  }
  return false;
}
