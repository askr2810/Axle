// ============================================================
//  ENHETER OG TALLFORMAT
//  • S.units = "si" (standard) eller "us": med «us» viser simuleringene også amerikanske enheter (ft, lb, mph, °F …).
//  • S.dec = "auto" (etter språket), "comma" eller "point": desimaltegnet i hele appen (se decPoint i gens.js).
//  • Enhetskonverterer som egen fane i kladdearket (lengde, masse, fart, volum, areal, energi, trykk, kraft, effekt, temperatur).
// ============================================================
const UNITS = {
  length: [["m", 1], ["km", 1000], ["cm", 0.01], ["mm", 0.001], ["in", 0.0254], ["ft", 0.3048], ["yd", 0.9144], ["mi", 1609.344], ["nmi", 1852]],
  mass: [["kg", 1], ["g", 0.001], ["t", 1000], ["lb", 0.45359237], ["oz", 0.028349523125], ["st", 6.35029318]],
  speed: [["m/s", 1], ["km/h", 1 / 3.6], ["mph", 0.44704], ["kn", 1852 / 3600], ["ft/s", 0.3048]],
  volume: [["L", 0.001], ["mL", 1e-6], ["m³", 1], ["dL", 1e-4], ["gal (US)", 0.003785411784], ["qt (US)", 0.000946352946], ["cup (US)", 0.0002365882365], ["fl oz (US)", 2.95735295625e-5], ["gal (UK)", 0.00454609], ["ft³", 0.028316846592]],
  area: [["m²", 1], ["km²", 1e6], ["cm²", 1e-4], ["ha", 1e4], ["daa", 1000], ["ft²", 0.09290304], ["in²", 0.00064516], ["acre", 4046.8564224], ["mi²", 2589988.110336]],
  energy: [["J", 1], ["kJ", 1000], ["MJ", 1e6], ["kWh", 3.6e6], ["cal", 4.184], ["kcal", 4184], ["BTU", 1055.05585262], ["ft·lbf", 1.3558179483]],
  pressure: [["Pa", 1], ["kPa", 1000], ["MPa", 1e6], ["bar", 1e5], ["atm", 101325], ["psi", 6894.757293168], ["mmHg", 133.322387415]],
  force: [["N", 1], ["kN", 1000], ["lbf", 4.4482216152605], ["kgf", 9.80665]],
  power: [["W", 1], ["kW", 1000], ["MW", 1e6], ["hp", 745.69987158227]],
  temp: [["°C"], ["°F"], ["K"]]
};
const UNIT_CATS = [["length", "Lengde", "Length"], ["mass", "Masse", "Mass"], ["speed", "Fart", "Speed"], ["temp", "Temperatur", "Temperature"], ["volume", "Volum", "Volume"], ["area", "Areal", "Area"], ["energy", "Energi", "Energy"], ["pressure", "Trykk", "Pressure"], ["force", "Kraft", "Force"], ["power", "Effekt", "Power"]];
// Standard fra/til når man åpner en kategori: metrisk → amerikansk.
const UNIT_DEF = { length: ["m", "ft"], mass: ["kg", "lb"], speed: ["km/h", "mph"], temp: ["°C", "°F"], volume: ["L", "gal (US)"], area: ["m²", "ft²"], energy: ["kJ", "kcal"], pressure: ["kPa", "psi"], force: ["N", "lbf"], power: ["kW", "hp"] };
function unitConvert(v, from, to, cat){
  if(cat === "temp"){ const k = from === "°C" ? v + 273.15 : from === "°F" ? (v - 32) * 5 / 9 + 273.15 : v; return to === "°C" ? k - 273.15 : to === "°F" ? (k - 273.15) * 9 / 5 + 32 : k; }
  const L = UNITS[cat], f = L.find(u => u[0] === from), g = L.find(u => u[0] === to); return f && g ? v * f[1] / g[1] : NaN;
}
// Amerikansk motstykke til en metrisk enhet, brukt i simuleringene.
const US_EQ = { m: ["length", "ft"], km: ["length", "mi"], cm: ["length", "in"], mm: ["length", "in"], kg: ["mass", "lb"], g: ["mass", "oz"], "m/s": ["speed", "mph"], "km/h": ["speed", "mph"], "°C": ["temp", "°F"],
  N: ["force", "lbf"], kN: ["force", "lbf"], L: ["volume", "gal (US)"], ml: ["volume", "fl oz (US)"], mL: ["volume", "fl oz (US)"], "m²": ["area", "ft²"], "m³": ["volume", "ft³"], kPa: ["pressure", "psi"], bar: ["pressure", "psi"], kW: ["power", "hp"], J: ["energy", "ft·lbf"], kJ: ["energy", "BTU"] };
const unitsUS = () => { try{ return S.units === "us"; }catch(e){ return false; } };
// «12,5 m/s» → «≈ 28 mph» (tom streng hvis teksten ikke er et tall med kjent enhet).
function usHint(txt){
  if(!unitsUS()) return "";
  const m = String(txt).match(/^(−?-?[\d\s .,]+)\s*([^\d\s(][^()]*?)\s*$/); if(!m) return "";
  const eq = US_EQ[m[2].trim()]; if(!eq) return "";
  const v = parseFloat(m[1].replace(/[\s ]/g, "").replace("−", "-").replace(",", ".")); if(!Number.isFinite(v)) return "";
  const r = unitConvert(v, m[2].trim() === "ml" ? "mL" : m[2].trim(), eq[1], eq[0]); return Number.isFinite(r) ? "≈ " + nf(r, Math.abs(r) < 10 ? 2 : 1) + " " + eq[1] : "";
}

// ---------- konverterer i kladdearket ----------
function unitsTabHTML(st){
  const cv = st.conv ||= { cat: "length", from: "m", to: "ft", v: "1" }, L = UNITS[cv.cat];
  const opt = sel => L.map(u => `<option value="${esc(u[0])}" ${u[0] === sel ? "selected" : ""}>${esc(u[0])}</option>`).join("");
  return `<div class="uc"><div class="uc-cats">${UNIT_CATS.map(([k, nb, en]) => `<button class="${k === cv.cat ? "on" : ""}" data-a="ucat" data-c="${k}">${esc(T(nb, en))}</button>`).join("")}</div>
    <div class="uc-row"><input id="ucv" inputmode="decimal" autocomplete="off" value="${esc(cv.v)}" aria-label="${esc(t("ucValue"))}"><select id="ucfrom" aria-label="${esc(t("ucFrom"))}">${opt(cv.from)}</select></div>
    <button class="iconbtn uc-swap" data-a="ucswap" aria-label="${esc(t("ucSwap"))}">⇅</button>
    <div class="uc-row uc-out"><b id="ucres">${esc(unitsResult(cv))}</b><select id="ucto" aria-label="${esc(t("ucTo"))}">${opt(cv.to)}</select></div>
    <p class="uc-all" id="ucall">${esc(unitsAll(cv))}</p></div>`;
}
function unitsNum(s){ const v = parseFloat(String(s).replace(/[\s ]/g, "").replace("−", "-").replace(",", ".")); return v; }
function unitsResult(cv){ const v = unitsNum(cv.v); if(!Number.isFinite(v)) return "–"; const r = unitConvert(v, cv.from, cv.to, cv.cat); return Number.isFinite(r) ? fmtCalc(r) : "–"; }
function unitsAll(cv){ const v = unitsNum(cv.v); if(!Number.isFinite(v)) return ""; return UNITS[cv.cat].filter(u => u[0] !== cv.from).map(u => fmtCalc(unitConvert(v, cv.from, u[0], cv.cat)) + " " + u[0]).join(" · "); }
function unitsMount(){
  const st = scratchState(), cv = st.conv, upd = () => { const r = document.getElementById("ucres"), a = document.getElementById("ucall"); if(r) r.textContent = unitsResult(cv); if(a) a.textContent = unitsAll(cv); };
  const v = document.getElementById("ucv"), f = document.getElementById("ucfrom"), to = document.getElementById("ucto");
  if(v){ v.addEventListener("input", () => { cv.v = v.value; upd(); }); v.focus(); v.select(); }
  if(f) f.addEventListener("change", () => { cv.from = f.value; upd(); });
  if(to) to.addEventListener("change", () => { cv.to = to.value; upd(); });
}
function unitsClick(a, b){
  if(a === "ucat"){ const st = scratchState(), c = b.dataset.c, d = UNIT_DEF[c]; st.conv = { cat: c, from: unitsUS() ? d[1] : d[0], to: unitsUS() ? d[0] : d[1], v: (st.conv && st.conv.v) || "1" }; renderOverlay(); return true; }
  if(a === "ucswap"){ const cv = scratchState().conv; [cv.from, cv.to] = [cv.to, cv.from]; renderOverlay(); return true; }
  if(a === "setunits"){ S.units = b.dataset.u === "us" ? "us" : "si"; save(); render(); return true; }
  if(a === "setdec"){ S.dec = ["comma", "point"].includes(b.dataset.d) ? b.dataset.d : "auto"; save(); render(); return true; }
  return false;
}
