// ============================================================
//  BRUKSSTATISTIKK (supabase/innsikt.sql): små hendelser om hva som brukes, slik at admin kan se hva folk øver på
//  og hvor de faller fra. Ingen fritekst, ingen svar – bare hendelse, fag/enhet og tall. Sendes i bunter.
//  Kan slås av i Innstillinger (S.noStats). En tilfeldig enhets-id skiller nettlesere uten konto.
// ============================================================
const ST_KEY = "axle.dev";
let ST_Q = [], ST_T = null, ST_OFF = false;
function stDevice(){
  try{ let d = localStorage.getItem(ST_KEY); if(!d){ d = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 36); localStorage.setItem(ST_KEY, d); } return d; }
  catch(e){ return "nostore"; }
}
// e = hendelse, a/b = tekst (fag, enhet, skjerm …), n/m = tall (riktige, oppgaver …)
function stEv(e, a, b, n, m){
  if(ST_OFF || typeof S === "undefined" || S.noStats || typeof CLOUD_ON === "undefined" || !CLOUD_ON) return;
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
    else if(!keep) ST_Q.unshift(...batch.slice(0, 40)); // prøv igjen senere (f.eks. uten nett)
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
