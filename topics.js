// ============================================================
//  Teoribok: korte, oversiktlige emnesider (én side per begrep),
//  gruppert per fag og enhet – et oppslagsverk ved siden av øvingen.
//  Lastes etter learn.js, før topics_*.js.
// ============================================================
// TOPICS("KODE", enhet, [ {
//   id: "moment",                       // unik innen faget, a–z0–9-
//   fig: `<svg viewBox="0 0 240 140">…</svg>`,   // valgfri figur (bare symboler, ingen ord – brukes på begge språk)
//   nb: { t, intro, f:[[latex, forklaring], …], legend:[[symbol, betydning, enhet], …], ex, tip },
//   en: { …samme felt på engelsk… }
// }, … ]);
//  t      tittel (kort, 1–4 ord)
//  intro  2–4 korte setninger: hva er det, og hvorfor bryr vi oss (kan ha $…$)
//  f      1–3 nøkkelformler (LaTeX uten $) med én linje forklaring hver
//  legend symbolforklaring: [symbol (LaTeX uten $), betydning, enhet eller ""]
//  ex     lite gjennomregnet eksempel, 1–4 linjer (kan ha $…$, linjeskift med \n)
//  tip    én setning: huskeregel eller vanlig feil
const TOPIC_DB = {};
function TOPICS(code, u, list) { const a = ((TOPIC_DB[code] ||= [])[u] ||= []); a.push(...list); }
const topicsOf = (code, u) => (TOPIC_DB[code] && TOPIC_DB[code][u]) || [];
function topicFind(code, id) {
  const units = TOPIC_DB[code] || [];
  for (let u = 0; u < units.length; u++) { const i = (units[u] || []).findIndex(x => x.id === id); if (i >= 0) return { u, i, tp: units[u][i] }; }
  return null;
}
// alle emner i et fag i rekkefølge (til forrige/neste)
const topicsFlat = code => (TOPIC_DB[code] || []).flatMap((list, u) => (list || []).map(tp => ({ u, tp })));
