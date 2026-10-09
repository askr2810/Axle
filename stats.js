// ============================================================
//  BRUKSSTATISTIKK (supabase/innsikt.sql): små hendelser om hva som brukes, slik at admin kan se hva folk øver på
//  og hvor de faller fra. Ingen fritekst, ingen svar – bare hendelse, fag/enhet og tall. Sendes i bunter.
//  Sendes BARE når brukeren har sagt ja (S.statsOk === 1). Spørsmålet kommer én gang som en liten boks nederst
//  (stAsk), og svaret kan endres i Innstillinger. En tilfeldig enhets-id skiller nettlesere uten konto; den lages først etter et ja.
// ============================================================
const ST_KEY = "axle.dev";
let ST_Q = [], ST_T = null, ST_OFF = false;
function stDevice(){
  try{ let d = localStorage.getItem(ST_KEY); if(!d){ d = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 36); localStorage.setItem(ST_KEY, d); } return d; }
  catch(e){ return "nostore"; }
}
// e = hendelse, a/b = tekst (fag, enhet, skjerm …), n/m = tall (riktige, oppgaver …)
function stEv(e, a, b, n, m){
  if(ST_OFF || typeof S === "undefined" || S.statsOk !== 1 || typeof CLOUD_ON === "undefined" || !CLOUD_ON) return;
  ST_Q.push({ e, a: a == null ? null : String(a).slice(0, 60), b: b == null ? null : String(b).slice(0, 60), n: n == null ? null : Math.round(n), m: m == null ? null : Math.round(m),
    t: new Date().toISOString(), l: typeof LANG !== "undefined" ? LANG : null, p: typeof PLATFORM !== "undefined" ? PLATFORM : null });
  if(ST_Q.length > 200) ST_Q = ST_Q.slice(-200);
  clearTimeout(ST_T); ST_T = setTimeout(stFlush, ST_Q.length >= 25 ? 500 : 15000);
}
async function stFlush(keep){
  clearTimeout(ST_T); if(!ST_Q.length || ST_OFF) return;
  const batch = ST_Q.splice(0, 60), d = stDevice(); batch[0].d = d; batch.forEach(x => x.d = d);
  try{
    const tok = typeof AUTH !== "undefined" && AUTH ? await authToken().catch(() => null) : null;
    await sbFetch("/rest/v1/rpc/log_events", { method: "POST", body: JSON.stringify({ p: batch }), keepalive: !!keep }, tok || undefined);
  }catch(e){
    if(e && (e.status === 404 || /PGRST202|42883/.test(e.code || ""))) ST_OFF = true; // innsikt.sql er ikke kjørt: slutt å prøve
    else { ST_Q.unshift(...batch); if(ST_Q.length > 200) ST_Q = ST_Q.slice(0, 200); } // hele bunten prøves igjen senere (f.eks. uten nett); taket hindrer at køen vokser uten grense
  }
  if(ST_Q.length) ST_T = setTimeout(stFlush, 5000);
}
// Skjermbytter: kalles fra render() når skjermen endres. Teori og spill får med fag/enhet der det gir mening.
function stScreen(sc){
  const extra = sc === "book" && typeof BK !== "undefined" ? BK.v : sc === "lesson" && typeof L !== "undefined" && L ? L.kind : null;
  stEv("screen", sc, extra);
}
addEventListener("visibilitychange", () => { if(document.visibilityState === "hidden") stFlush(true); });
addEventListener("pagehide", () => stFlush(true));

// Samtykke: spør én gang, med en liten boks nederst (ikke en popup som stopper deg). Nei er like lett som ja.
function stAsk(){
  if(typeof S === "undefined" || S.statsOk != null || typeof CLOUD_ON === "undefined" || !CLOUD_ON || document.getElementById("stask")) return;
  if(S.noStats){ S.statsOk = 0; saveLocal(); return; } // slo det av før spørsmålet fantes
  const d = document.createElement("div"); d.id = "stask"; d.className = "stask"; d.setAttribute("role", "region"); d.setAttribute("aria-label", T("Bruksstatistikk", "Usage statistics"));
  d.innerHTML = `<p><b>${esc(T("Vil du hjelpe oss å gjøre Axle bedre?", "Want to help us improve Axle?"))}</b> ${esc(T("Da sender appen bruksstatistikk: hvilke sider, fag og øvinger som åpnes, og hvor mange oppgaver som løses. Er du logget inn, knyttes statistikken til kontoen din; ellers til en tilfeldig id på enheten. Vi sender aldri svarene dine, navn, e-post eller annen tekst du skriver.", "The app will then send usage statistics: which pages, courses and exercises are opened, and how many problems are solved. If you are logged in, the statistics are linked to your account; otherwise to a random id on the device. We never send your answers, name, email or other text you write."))} <a href="privacy.html" target="_blank" rel="noopener">${esc(T("Les mer", "Read more"))}</a></p>
    <div><button class="kbtn ghost" data-a="statno">${esc(T("Nei takk", "No thanks"))}</button><button class="kbtn" data-a="statyes">${esc(T("Ja, gjerne", "Yes, sure"))}</button></div>`;
  document.body.appendChild(d);
}
function stAnswer(ok){ S.statsOk = ok ? 1 : 0; if(!ok) ST_Q = []; saveLocal(); const d = document.getElementById("stask"); if(d) d.remove(); if(ok && typeof stScreen === "function") stScreen(screen); }
