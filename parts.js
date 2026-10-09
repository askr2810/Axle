// ============================================================
//  DELVIS INTEGRASJON – egen lab i tre steg (#/delvis-integrasjon).
//    1. Formelen ∫u v' dx = uv − ∫u' v dx kommer rett ut av produktregelen (uv)' = u'v + uv', linje for linje,
//       med arealbildet ∫u dv + ∫v du = uv.
//    2. Velg selv hva som er u og v' i ∫x eˣ dx, ∫x cos x dx, ∫x² eˣ dx og ∫x ln x dx. Et komplisitetsmeter
//       (grønt → rødt) viser om det nye integralet ble enklere eller verre.
//    3. LIATE-regelen (logaritmisk, invers trig, algebraisk, trigonometrisk, eksponentiell) med en liten øving.
//  Fargene: u blå, v (og v') grønn, det nye integralet oransje. Samme farger i lys og mørk modus (hex, KaTeX tar ikke CSS-variabler).
// ============================================================
const PI_CU = "#3B7BE0", PI_CV = "#1E9A5E", PI_CR = "#E07B00";
const piU = s => `\\textcolor{${PI_CU}}{${s}}`, piV = s => `\\textcolor{${PI_CV}}{${s}}`, piR = s => `\\textcolor{${PI_CR}}{${s}}`;
// Utledningen: [tex, forklaring nb, en]
const PI_DERIV = [
  [`(${piU("u")}\\,${piV("v")})' = ${piU("u'")}\\,${piV("v")} + ${piU("u")}\\,${piV("v'")}`,
    "Start med produktregelen for derivasjon. Den sier hvordan et produkt av to funksjoner deriveres.", "Start with the product rule for differentiation. It says how a product of two functions is differentiated."],
  [`\\int (${piU("u")}\\,${piV("v")})'\\,dx = \\int ${piU("u'")}\\,${piV("v")}\\,dx + \\int ${piU("u")}\\,${piV("v'")}\\,dx`,
    "Integrer begge sider. Det er lov: like uttrykk har like integraler.", "Integrate both sides. That is allowed: equal expressions have equal integrals."],
  [`${piU("u")}\\,${piV("v")} = \\int ${piU("u'")}\\,${piV("v")}\\,dx + \\int ${piU("u")}\\,${piV("v'")}\\,dx`,
    "Å integrere en derivert gir funksjonen tilbake. Venstre side blir derfor bare uv.", "Integrating a derivative gives the function back. So the left side is just uv."],
  [`\\int ${piU("u")}\\,${piV("v'")}\\,dx = ${piU("u")}\\,${piV("v")} - \\int ${piU("u'")}\\,${piV("v")}\\,dx`,
    "Flytt ∫u'v dx over til den andre siden. Det er hele formelen for delvis integrasjon.", "Move ∫u'v dx to the other side. That is the whole formula for integration by parts."]
];
// Eksemplene i steg 2. Hvert valg: u, u', v', v, uv, resten (tex for ∫u'v dx), nivå 0–1 på meteret, forklaring, svar og kontroll.
const PI_EX = [
  { id: "xex", int: "x\\,e^{x}", f: ["x", "e^{x}"], ch: [
    { u: "x", du: "1", dv: "e^{x}", v: "e^{x}", uv: "x\\,e^{x}", rest: "\\int 1\\cdot e^{x}\\,dx = \\int e^{x}\\,dx", lv: 0.08,
      why: ["u = x ble til 1 da den ble derivert, og eˣ er like enkel når den integreres. Det nye integralet står rett i tabellen.", "u = x became 1 when differentiated, and eˣ is just as simple when integrated. The new integral is straight from the table."],
      ans: "x\\,e^{x} - e^{x} + C", chk: "(x e^{x} - e^{x})' = e^{x} + x e^{x} - e^{x} = x\\,e^{x}" },
    { u: "e^{x}", du: "e^{x}", dv: "x", v: "\\tfrac{x^{2}}{2}", uv: "\\tfrac{x^{2}}{2}\\,e^{x}", rest: "\\int \\tfrac{x^{2}}{2}\\,e^{x}\\,dx", lv: 0.82,
      why: ["x ble integrert og fikk høyere potens (x²/2), mens eˣ ikke ble enklere av å deriveres. Det nye integralet er verre enn det du startet med.", "x was integrated and got a higher power (x²/2), while eˣ did not get simpler when differentiated. The new integral is worse than the one you started with."] }] },
  { id: "xcos", int: "x\\,\\cos x", f: ["x", "\\cos x"], ch: [
    { u: "x", du: "1", dv: "\\cos x", v: "\\sin x", uv: "x\\sin x", rest: "\\int 1\\cdot \\sin x\\,dx = \\int \\sin x\\,dx", lv: 0.1,
      why: ["u = x forsvant (ble 1) ved derivasjon, og cos x ble bare sin x. ∫sin x dx = −cos x står i tabellen.", "u = x disappeared (became 1) when differentiated, and cos x just became sin x. ∫sin x dx = −cos x is in the table."],
      ans: "x\\sin x + \\cos x + C", chk: "(x\\sin x + \\cos x)' = \\sin x + x\\cos x - \\sin x = x\\cos x" },
    { u: "\\cos x", du: "-\\sin x", dv: "x", v: "\\tfrac{x^{2}}{2}", uv: "\\tfrac{x^{2}}{2}\\cos x", rest: "\\int \\tfrac{x^{2}}{2}\\,(-\\sin x)\\,dx", lv: 0.8,
      why: ["Å derivere cos x gir bare −sin x – like vanskelig. Samtidig gikk x opp til x²/2. Integralet ble tyngre, ikke lettere.", "Differentiating cos x only gives −sin x – just as hard. At the same time x went up to x²/2. The integral got heavier, not lighter."] }] },
  { id: "x2ex", int: "x^{2}\\,e^{x}", f: ["x^{2}", "e^{x}"], ch: [
    { u: "x^{2}", du: "2x", dv: "e^{x}", v: "e^{x}", uv: "x^{2}e^{x}", rest: "\\int 2x\\,e^{x}\\,dx", lv: 0.42,
      why: ["Potensen gikk ned fra x² til 2x – bedre, men ikke ferdig. Bruk delvis integrasjon én gang til med u = 2x, så er du i mål.", "The power went down from x² to 2x – better, but not done. Use integration by parts once more with u = 2x, and you are done."],
      ans: "x^{2}e^{x} - 2x\\,e^{x} + 2e^{x} + C", chk: "(x^{2}e^{x} - 2xe^{x} + 2e^{x})' = x^{2}e^{x}" },
    { u: "e^{x}", du: "e^{x}", dv: "x^{2}", v: "\\tfrac{x^{3}}{3}", uv: "\\tfrac{x^{3}}{3}\\,e^{x}", rest: "\\int \\tfrac{x^{3}}{3}\\,e^{x}\\,dx", lv: 0.95,
      why: ["x² ble til x³/3. For hver runde blir potensen større – du kommer aldri i mål på denne måten.", "x² became x³/3. Every round the power grows – you will never get there this way."] }] },
  { id: "xln", int: "x\\,\\ln x", f: ["x", "\\ln x"], ch: [
    { u: "x", du: "1", dv: "\\ln x", v: "x\\ln x - x", uv: "x\\,(x\\ln x - x)", rest: "\\int (x\\ln x - x)\\,dx", lv: 0.88,
      why: ["For å finne v måtte du integrere ln x – det krever selv delvis integrasjon, og det nye integralet inneholder fortsatt x ln x. Her er u = x feil valg!", "To find v you had to integrate ln x – which itself needs integration by parts, and the new integral still contains x ln x. Here u = x is the wrong choice!"] },
    { u: "\\ln x", du: "\\tfrac{1}{x}", dv: "x", v: "\\tfrac{x^{2}}{2}", uv: "\\tfrac{x^{2}}{2}\\ln x", rest: "\\int \\tfrac{x^{2}}{2}\\cdot\\tfrac{1}{x}\\,dx = \\int \\tfrac{x}{2}\\,dx", lv: 0.08,
      why: ["ln x er vanskelig å integrere, men blir enkel (1/x) når den deriveres. 1/x forkorter mot x²/2, og igjen står bare x/2.", "ln x is hard to integrate, but becomes simple (1/x) when differentiated. 1/x cancels against x²/2, leaving just x/2."],
      ans: "\\tfrac{x^{2}}{2}\\ln x - \\tfrac{x^{2}}{4} + C", chk: "\\left(\\tfrac{x^{2}}{2}\\ln x - \\tfrac{x^{2}}{4}\\right)' = x\\ln x + \\tfrac{x}{2} - \\tfrac{x}{2} = x\\ln x" }] }
];
// LIATE: [bokstav, nb, en, eksempel, kort nb, kort en] (de korte navnene får plass på stigen på mobil)
const PI_LIATE = [["L", "Logaritmisk", "Logarithmic", "\\ln x", "log", "log"], ["I", "Invers trig", "Inverse trig", "\\arctan x", "inv. trig", "inv. trig"], ["A", "Algebraisk", "Algebraic", "x^{2},\\ x", "algebra", "algebraic"],
  ["T", "Trigonometrisk", "Trigonometric", "\\sin x", "trig", "trig"], ["E", "Eksponentiell", "Exponential", "e^{x}", "eksp.", "exp."]];
// Øving: integrand, faktorene og LIATE-bokstaven deres, merknad nb/en
const PI_LQ = [
  { int: "x\\,e^{x}", f: [["x", "A"], ["e^{x}", "E"]] },
  { int: "x^{3}\\,\\ln x", f: [["x^{3}", "A"], ["\\ln x", "L"]] },
  { int: "x^{2}\\,\\sin x", f: [["\\sin x", "T"], ["x^{2}", "A"]] },
  { int: "x\\,\\arctan x", f: [["x", "A"], ["\\arctan x", "I"]] },
  { int: "\\ln x", f: [["1", "A"], ["\\ln x", "L"]], note: ["Lurt triks: skriv ln x som ln x · 1. Da blir v' = 1 og v = x.", "Clever trick: write ln x as ln x · 1. Then v' = 1 and v = x."] },
  { int: "e^{x}\\,\\cos x", f: [["e^{x}", "E"], ["\\cos x", "T"]], note: ["Her går det faktisk an begge veier – etter to runder kommer det opprinnelige integralet tilbake, og du løser for det.", "Here both ways actually work – after two rounds the original integral comes back, and you solve for it."] }
];
const piRank = L => "LIATE".indexOf(L);
let PI = { from: "home", step: 1, s1: 0, ex: 0, pick: null, lq: 0, lp: null, score: {} };
function piOpen(from){ PI = { from: from || "home", step: 1, s1: 0, ex: 0, pick: null, lq: 0, lp: null, score: {} }; overlay = null; screen = "parts"; render(); window.scrollTo(0, 0); }
// ---------- steg 1 ----------
// Arealbildet: kurven fra (0,0) til (u,v). Arealet under kurven er ∫v du, arealet til venstre er ∫u dv, og sammen fyller de rektangelet uv.
function piAreaSVG(){
  const X = t => 40 + t * 200, Y = t => 150 - t * 120, pts = Array.from({ length: 41 }, (_, i) => { const t = i / 40; return [X(t), Y(Math.pow(t, 1.8))]; });
  const curve = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  return `<svg class="pi-svg" viewBox="0 0 300 180" role="img" aria-label="${esc(T("Arealet uv delt i to deler av en kurve", "The area uv split in two by a curve"))}">
    <path d="${curve}L${X(1)} ${Y(0)}Z" fill="${PI_CV}" fill-opacity=".22"/><path d="${curve}L${X(0)} ${Y(1)}Z" fill="${PI_CU}" fill-opacity=".22"/>
    <path d="${curve}" fill="none" stroke="var(--ink)" stroke-width="2"/><rect x="${X(0)}" y="${Y(1)}" width="200" height="120" fill="none" stroke="var(--muted)" stroke-dasharray="4 3"/>
    <path d="M${X(0)} ${Y(0)}H${X(1) + 18}M${X(0)} ${Y(0)}V${Y(1) - 14}" stroke="var(--muted)" stroke-width="1.4" fill="none"/>
    <text x="${X(1) + 22}" y="${Y(0) + 4}" class="pi-ax" fill="${PI_CU}">u</text><text x="${X(0) - 4}" y="${Y(1) - 18}" class="pi-ax" fill="${PI_CV}" text-anchor="middle">v</text>
    <text x="${X(0.68)}" y="${Y(0.18)}" class="pi-al" text-anchor="middle">∫ v du</text><text x="${X(0.26)}" y="${Y(0.7)}" class="pi-al" text-anchor="middle">∫ u dv</text>
    <text x="${X(1) + 4}" y="${Y(1) + 4}" class="pi-al">uv</text></svg>`;
}
function piStep1(){
  const n = PI.s1;
  const lines = PI_DERIV.slice(0, n + 1).map((d, i) => `<div class="pi-line${i === n ? " new" : ""}${i === PI_DERIV.length - 1 ? " fin" : ""}"><span class="pi-n">${i + 1}</span><div><div class="dmath">${texD(d[0])}</div><p>${esc(T(d[1], d[2]))}</p></div></div>`).join("");
  const done = n >= PI_DERIV.length - 1;
  return `<p class="pi-lead">${esc(T("Delvis integrasjon er produktregelen kjørt baklengs. Trykk deg gjennom utledningen.", "Integration by parts is the product rule run backwards. Tap through the derivation."))}</p>
    ${lines}
    ${done ? `<div class="pi-sum"><b>${esc(T("Slik bruker du den", "How to use it"))}</b><p>${esc(T("Du bytter ett integral mot et annet: u blir derivert (u → u'), og v' blir integrert (v' → v). Poenget er å velge slik at det nye integralet ∫u'v dx blir enklere enn det du startet med.", "You trade one integral for another: u is differentiated (u → u'), and v' is integrated (v' → v). The point is to choose so the new integral ∫u'v dx is simpler than the one you started with."))}</p>
      <p class="pi-note">${esc(T("I R2-boka står ofte samme regel med navnene byttet: ∫u'v dx = uv − ∫uv' dx. Det er akkurat den samme formelen.", "Some books write the same rule with the names swapped: ∫u'v dx = uv − ∫uv' dx. It is exactly the same formula."))}</p></div>
      <div class="pi-fig"><b>${esc(T("Som et areal", "As an area"))}</b>${piAreaSVG()}<p>${esc(T("De to fargede bitene fyller rektangelet: ∫u dv + ∫v du = uv. Kjenner du den ene biten, får du den andre ved å trekke fra.", "The two coloured pieces fill the rectangle: ∫u dv + ∫v du = uv. If you know one piece, you get the other by subtracting."))}</p></div>
      <div class="pi-act"><button class="big" data-a="pistep" data-s="2">${esc(T("Videre: velg u selv", "Next: choose u yourself"))} →</button></div>`
    : `<div class="pi-act"><button class="big" data-a="pinext">${esc(T("Neste linje", "Next line"))} ↓</button></div>`}`;
}
// ---------- steg 2 ----------
function piMeter(lv){
  const lab = lv < 0.3 ? T("Enkelt – står i tabellen", "Simple – in the table") : lv < 0.6 ? T("Enklere, men én runde til", "Simpler, but one more round") : T("Vanskeligere enn før", "Harder than before");
  return `<div class="pi-meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(lv * 100)}" aria-label="${esc(T("Hvor komplisert det nye integralet er", "How complicated the new integral is"))}">
    <div class="pi-mh"><small>${esc(T("Det nye integralet", "The new integral"))}</small><b style="color:${lv < 0.3 ? "var(--ok)" : lv < 0.6 ? "var(--c2)" : "var(--bad)"}">${esc(lab)}</b></div>
    <div class="pi-bar"><span class="pi-needle" style="left:${(lv * 100).toFixed(0)}%"></span></div><div class="pi-ml"><span>${esc(T("enkelt", "simple"))}</span><span>${esc(T("komplisert", "complicated"))}</span></div></div>`;
}
function piStep2(){
  const ex = PI_EX[PI.ex], c = PI.pick != null ? ex.ch[PI.pick] : null;
  const tabs = PI_EX.map((e, i) => `<button class="${i === PI.ex ? "on" : ""}" data-a="piex" data-e="${i}">${tex("\\int " + e.int + "\\,dx")}</button>`).join("");
  const picks = ex.ch.map((ch, i) => `<button class="pi-pick${PI.pick === i ? " on" : ""}" data-a="pipick" data-k="${i}"><small>${esc(T("u =", "u ="))}</small>${tex(piU(ch.u))}<small>${esc(T("og v' =", "and v' ="))}</small>${tex(piV(ch.dv))}</button>`).join("");
  let out = `<p class="pi-lead">${esc(T("Velg et integral, og bestem hvilken faktor som skal være u (den du deriverer). Den andre blir v' (den du integrerer).", "Pick an integral, and decide which factor is u (the one you differentiate). The other becomes v' (the one you integrate)."))}</p>
    <div class="pi-tabs hscroll">${tabs}</div>
    <div class="dmath pi-int">${texD("\\int " + ex.int + "\\,dx")}</div>
    <div class="pi-picks">${picks}</div>`;
  if(!c) return out + `<p class="pi-hint">${esc(T("Trykk på et av valgene over.", "Tap one of the choices above."))}</p>`;
  const good = c.lv < 0.6;
  out += `<div class="pi-grid">
      <div class="pi-cell"><small>${esc(T("deriver", "differentiate"))}</small>${tex(piU("u = " + c.u))}<span class="pi-arr">↓ <i>d/dx</i></span>${tex(piU("u' = " + c.du))}</div>
      <div class="pi-cell"><small>${esc(T("integrer", "integrate"))}</small>${tex(piV("v' = " + c.dv))}<span class="pi-arr">↓ <i>∫</i></span>${tex(piV("v = " + c.v))}</div></div>
    <div class="dmath">${texD("\\int " + ex.int + "\\,dx = " + c.uv + " - " + piR(c.rest))}</div>
    ${piMeter(c.lv)}
    <div class="pi-why ${good ? "ok" : "bad"}"><b>${good ? (c.lv < 0.3 ? "✅ " + esc(T("Godt valg!", "Good choice!")) : "👍 " + esc(T("Riktig vei", "The right way"))) : "⚠️ " + esc(T("Dette ble verre", "This got worse"))}</b><p>${esc(T(c.why[0], c.why[1]))}</p>
      ${c.ans ? `<div class="dmath">${texD("\\int " + ex.int + "\\,dx = " + c.ans)}</div><details><summary>${esc(T("Sjekk ved å derivere svaret", "Check by differentiating the answer"))}</summary><div class="dmath">${texD(c.chk)}</div><p>${esc(T("Derivasjon gir integranden tilbake – da er integralet riktig.", "Differentiating gives back the integrand – so the integral is right."))}</p></details>` : ""}</div>
    <div class="pi-act">${good ? "" : `<button class="big ghost" data-a="pipick" data-k="${1 - PI.pick}">${esc(T("Prøv det andre valget", "Try the other choice"))}</button>`}
      ${good ? `<button class="big" data-a="${PI.ex < PI_EX.length - 1 ? "piex" : "pistep"}" ${PI.ex < PI_EX.length - 1 ? `data-e="${PI.ex + 1}"` : `data-s="3"`}>${esc(PI.ex < PI_EX.length - 1 ? T("Neste integral", "Next integral") : T("Videre: LIATE-regelen", "Next: the LIATE rule"))} →</button>` : ""}</div>`;
  return out;
}
// ---------- steg 3 ----------
function piLadder(mark){
  return `<div class="pi-lad">${PI_LIATE.map(([L, nb, en, ex, snb, sen]) => { const m = mark && mark[L]; return `<div class="pi-rung${m ? " " + m : ""}" title="${esc(T(nb, en))}"><b>${L}</b><small>${esc(T(snb, sen))}</small>${tex(ex)}${m ? `<em>${m === "u" ? "u" : "v'"}</em>` : ""}</div>`; }).join("")}</div>
    <div class="pi-ladarr"><span>← ${esc(T("u herfra: blir enklere når den deriveres", "u from here: gets simpler when differentiated"))}</span><span>${esc(T("v' herfra: lett å integrere", "v' from here: easy to integrate"))} →</span></div>`;
}
function piStep3(){
  const q = PI_LQ[PI.lq], best = q.f.reduce((a, b) => piRank(b[1]) < piRank(a[1]) ? b : a), ans = PI.lp != null ? q.f[PI.lp] : null;
  const mark = ans ? Object.fromEntries(q.f.map(f => [f[1], f === best ? "u" : "v"])) : Object.fromEntries(q.f.map(f => [f[1], "hl"]));
  const ok = ans && ans === best, nDone = Object.keys(PI.score).length, nOk = Object.values(PI.score).filter(Boolean).length;
  return `<p class="pi-lead">${esc(T("Hvilken faktor skal være u? Huskeregelen LIATE: velg den som står lengst til venstre. Funksjoner til venstre blir enklere av å deriveres; de til høyre er lette å integrere.", "Which factor should be u? The LIATE rule of thumb: pick the one furthest to the left. Functions on the left get simpler when differentiated; those on the right are easy to integrate."))}</p>
    ${piLadder(mark)}
    <div class="pi-quiz"><div class="pi-qh"><small>${esc(T(`Oppgave ${PI.lq + 1} av ${PI_LQ.length}`, `Task ${PI.lq + 1} of ${PI_LQ.length}`))}</small><small>${nDone ? esc(T(`${nOk} av ${nDone} riktige`, `${nOk} of ${nDone} correct`)) : ""}</small></div>
      <div class="dmath">${texD("\\int " + q.int + "\\,dx")}</div>
      <p class="pi-q">${esc(T("Trykk på faktoren du vil la være u:", "Tap the factor you want as u:"))}</p>
      <div class="pi-picks">${q.f.map((f, i) => `<button class="pi-pick${PI.lp === i ? (ok ? " ok" : " bad") : ""}" data-a="pilpick" data-k="${i}" ${ans ? "disabled" : ""}>${tex(f[0])}<small>${f[1]} – ${esc(T(PI_LIATE[piRank(f[1])][1], PI_LIATE[piRank(f[1])][2]))}</small></button>`).join("")}</div>
      ${ans ? `<div class="pi-why ${ok ? "ok" : "bad"}"><b>${ok ? "✅ " + esc(T("Riktig!", "Correct!")) : "❌ " + esc(T("Ikke helt", "Not quite"))}</b><p>${esc(T(`${best[1]} kommer før ${q.f.find(f => f !== best)[1]} i LIATE, så u = `, `${best[1]} comes before ${q.f.find(f => f !== best)[1]} in LIATE, so u = `))}${tex(piU(best[0]))}${esc(T(" og v' = ", " and v' = "))}${tex(piV(q.f.find(f => f !== best)[0]))}.</p>${q.note ? `<p>${esc(T(q.note[0], q.note[1]))}</p>` : ""}</div>
        <div class="pi-act"><button class="big" data-a="pilq">${esc(PI.lq < PI_LQ.length - 1 ? T("Neste oppgave", "Next task") : T("Start på nytt", "Start over"))} →</button></div>` : ""}</div>
    <p class="pi-note">${esc(T("LIATE er en tommelfingerregel, ikke en lov. Den treffer i de aller fleste skoleoppgaver, men målet er alltid det samme som i steg 2: at det nye integralet blir enklere.", "LIATE is a rule of thumb, not a law. It works for almost all textbook problems, but the goal is always the same as in step 2: making the new integral simpler."))}</p>`;
}
function renderParts(){
  const steps = [[1, T("Fra produktregelen", "From the product rule")], [2, T("Velg u og v'", "Choose u and v'")], [3, T("LIATE-regelen", "The LIATE rule")]];
  const body = PI.step === 1 ? piStep1() : PI.step === 2 ? piStep2() : piStep3();
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="piback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Labben", "The lab"))}</small><b>${esc(T("Delvis integrasjon", "Integration by parts"))}</b></div></div></div>
    <main class="wrap lab-one"><div class="pi fig">
      <div class="pi-steps" role="tablist">${steps.map(([k, l]) => `<button role="tab" aria-selected="${PI.step === k}" class="${PI.step === k ? "on" : ""}" data-a="pistep" data-s="${k}"><b>${k}</b><span>${esc(l)}</span></button>`).join("")}</div>
      ${body}</div>${piTheoryLinks()}</main>`;
}
// Teorienhetene laben hører til (fylles inn under, når fagene er lastet)
const PI_UNITS = [["VGR2", "Integrasjonsmetoder"], ["MEK1000", "Integrasjon"]];
function piUnitKeys(){ return PI_UNITS.map(([code, title]) => { const c = typeof COURSE === "function" && COURSE(code), u = c ? c.units.findIndex(x => x.title === title) : -1; return u >= 0 ? code + ":" + u : null; }).filter(Boolean); }
function piTheoryLinks(){
  const links = piUnitKeys().map(k => { const [code, u] = k.split(":"), c = COURSE(code); return inMyStudies(c) ? `<button class="bk-hit" data-a="bkunit" data-c="${code}" data-u="${u}"><small>${esc(courseName(c))}</small><b>${esc(unitTitle(c, +u))}</b></button>` : ""; }).join("");
  return links ? `<h4 class="grp">${esc(T("Les mer i teorien", "Read more in the theory"))}</h4><div class="lab-uses">${links}</div>` : "";
}
function piClick(a, b){
  if(!a.startsWith("pi") || !["piback", "pistep", "pinext", "piex", "pipick", "pilpick", "pilq"].includes(a)) return false;
  if(a === "piback"){ const f = PI.from; if(f === "lab"){ screen = "lab"; LB.sim = null; render(); window.scrollTo(0, 0); } else if(typeof labBack === "function") labBack(f); else goHome(); return true; }
  if(a === "pistep"){ PI.step = +b.dataset.s; render(); window.scrollTo(0, 0); return true; }
  if(a === "pinext"){ PI.s1 = Math.min(PI_DERIV.length - 1, PI.s1 + 1); }
  else if(a === "piex"){ PI.ex = +b.dataset.e; PI.pick = null; }
  else if(a === "pipick"){ PI.pick = +b.dataset.k; }
  else if(a === "pilpick"){ if(PI.lp != null) return true; PI.lp = +b.dataset.k; const q = PI_LQ[PI.lq], best = q.f.reduce((x, y) => piRank(y[1]) < piRank(x[1]) ? y : x), ok = q.f[PI.lp] === best;
    if(!(PI.lq in PI.score)) PI.score[PI.lq] = ok; if(typeof sfx === "function") sfx(ok ? "ok" : "bad"); }
  else if(a === "pilq"){ PI.lq = (PI.lq + 1) % PI_LQ.length; PI.lp = null; if(PI.lq === 0) PI.score = {}; }
  render(); return true;
}
// I labben og som knapp på teorisidene til enhetene over
if(typeof LABS !== "undefined") LABS.push({ id: "parts", ic: "∫", t: ["Delvis integrasjon", "Integration by parts"], sub: ["Fra produktregelen til formelen, velg u og v' selv, og lær LIATE-regelen", "From the product rule to the formula, choose u and v' yourself, and learn the LIATE rule"],
  kw: "delvis integrasjon integration by parts produktregel product rule integral integrasjon integration derivasjon derivative liate u v metode technique",
  get units(){ return piUnitKeys(); }, courses: ["VGR2", "MEK1000"], open: () => piOpen(screen === "lab" ? "lab" : screen) });
