// ============================================================
//  FAGFILER – teori og emnesider ligger i c/<KODE>.js og lastes først når faget åpnes (tools/split.js lager dem).
//  Hovedpakken har bare et tomt teoridokument per enhet (så knappene står der de skal), emnestubber (id og tittel)
//  og en liten søkeindeks (CF_IDX). Uten splitting (artifact-bygget, eller node mangler) ligger alt i pakken som før.
//
//  ensureCourse(code)  → Promise<true/false>, lastes én gang (promise-cache)
//  cfReady(code)       → er teorien og emnene for faget her?
//  cfNeed(code)        → i en render-funksjon: true hvis klar, ellers starter lastingen og tegner på nytt når den er ferdig
//  cfThen(code, fn)    → kjør fn når faget er lastet (viser «Laster …» så lenge)
// ============================================================
const CF_ON = typeof CF_V !== "undefined";
const CF_DONE = {}, CF_P = {}, CF_FAIL = {};
const cfReady = code => !CF_ON || !CF_V[code] || !!CF_DONE[code];
function ensureCourse(code){
  if(cfReady(code)) return Promise.resolve(true);
  if(CF_P[code]) return CF_P[code];
  return CF_P[code] = new Promise(res => {
    const s = document.createElement("script"); s.src = "c/" + code + ".js?v=" + CF_V[code]; s.async = true;
    s.onload = () => { if(!CF_DONE[code]){ delete CF_P[code]; CF_FAIL[code] = Date.now(); } res(!!CF_DONE[code]); };
    s.onerror = () => { delete CF_P[code]; CF_FAIL[code] = Date.now(); s.remove(); res(false); };
    document.head.appendChild(s);
  });
}
// Kalles av fagfila: legg inn teori og emner, og legg rettinger (edit.js) for faget på nytt.
function CF(code, d){
  (d.th || []).forEach((doc, u) => { if(doc) (THEORY_DB[code] ||= [])[u] = doc; });
  if(d.tp) TOPIC_DB[code] = d.tp;
  CF_DONE[code] = 1; delete CF_FAIL[code];
  if(typeof CP !== "undefined" && CP.items) for(const k of Object.keys(CP.items)) if(k.startsWith(code + "|th|") || k.startsWith(code + "|tp|")){ delete CP.orig[k]; cpApply(k, CP.items[k]); }
  if(typeof BK_INDEX !== "undefined") BK_INDEX = null; // søket bruker nå full tekst for faget
}
// Fagfilene kaller CF, og emnefigurene bruker figurbiblioteket FL og LANG; navnene forkortes i den minifiserte pakken, så de legges på globalThis.
globalThis.CF = CF; if(typeof FL !== "undefined") globalThis.FL = FL;
try{ if(!("LANG" in globalThis)) Object.defineProperty(globalThis, "LANG", { get: () => LANG, configurable: true }); }catch(e){} // språket akkurat nå
// Emnestubber fra søkeindeksen: id og tittel, så lister, adresser (#/teori/KODE/emne/id) og søk virker før fagfila er her.
if(CF_ON) for(const [code, units] of Object.entries(CF_IDX.tp || {})) if(CF_V[code])
  TOPIC_DB[code] = units.map(l => l && l.map(([id, nt, et]) => ({ id, nb: { t: nt }, en: { t: et || nt }, stub: 1 })));

let CF_BUSY = 0;
function cfBusy(d){
  CF_BUSY = Math.max(0, CF_BUSY + d); let el = document.getElementById("cf-load");
  if(CF_BUSY && !el){ el = document.createElement("div"); el.id = "cf-load"; el.className = "cf-load"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  if(el){ if(CF_BUSY) el.innerHTML = `<span class="cf-spin" aria-hidden="true"></span>${esc(T("Laster …", "Loading …"))}`; else el.remove(); }
}
const cfFailMsg = () => T("Fikk ikke hentet teorien. Sjekk nettet og prøv igjen.", "Could not fetch the theory. Check your connection and try again.");
function cfThen(code, fn){
  if(cfReady(code)){ fn(); return; }
  cfBusy(1); ensureCourse(code).then(ok => { cfBusy(-1); if(ok) fn(); else toast(cfFailMsg()); });
}
function cfNeed(code){
  if(cfReady(code)) return true;
  if(CF_FAIL[code] && Date.now() - CF_FAIL[code] < 4000) return false; // nylig feil: vis «Prøv igjen» i stedet for å hamre løs
  if(!CF_P[code]){ cfBusy(1); ensureCourse(code).then(() => { cfBusy(-1); render(); }); }
  return false;
}
// Det som vises der teorien skal stå, mens fagfila lastes (eller hvis den ikke kunne hentes)
const cfWaitHTML = code => CF_FAIL[code] && !CF_P[code]
  ? `<div class="cf-wait"><p>${esc(cfFailMsg())}</p><button class="big ghost" data-a="cfretry" data-c="${esc(code)}">${esc(T("Prøv igjen", "Try again"))}</button></div>`
  : `<div class="cf-wait" role="status"><span class="cf-spin" aria-hidden="true"></span>${esc(T("Laster …", "Loading …"))}</div>`;
function cfClick(a, b){ if(a !== "cfretry") return false; delete CF_FAIL[b.dataset.c]; render(); return true; }
// Søk i fag som ikke er lastet: ingress og stikkord fra indeksen (ikke full tekst)
const cfIdxText = (code, u) => { const x = CF_ON && CF_IDX.th[code] && CF_IDX.th[code][u]; return x ? (LANG === "en" ? x[2] + " " + x[3] : x[0] + " " + x[1]) : ""; };
const cfIdxTopic = (code, u, id) => { const l = CF_ON && CF_IDX.tp[code] && CF_IDX.tp[code][u], x = l && l.find(y => y[0] === id); return x ? (LANG === "en" ? x[4] : x[3]) : ""; };
// Favorittfaget lastes i bakgrunnen kort etter oppstart (service workeren tar vare på det for offline bruk).
if(CF_ON && typeof window !== "undefined") window.addEventListener("load", () => setTimeout(() => { try{ if(typeof S !== "undefined" && S.current) ensureCourse(S.current); }catch(e){} }, 1200));
