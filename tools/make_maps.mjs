// Lager maps_data.js: forhåndsprojiserte landgrenser (Natural Earth via world-atlas, fritt tilgjengelig) til kartene i maps.js.
// Bruk: node tools/make_maps.mjs   (kjøres bare når kartutsnitt eller stedspunkter endres; resultatet sjekkes inn)
// To utsnitt: «europe» (Europa, Nord-Afrika og Midtøsten, Mercator, 50m) og «world» (hele verden uten Antarktis, Equal Earth, 110m).
import fs from "node:fs"; import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { presimplify, simplify, quantile } from "topojson-simplify";
import { geoMercator, geoEqualEarth, geoPath, geoArea, geoCentroid } from "d3-geo";
import countries from "i18n-iso-countries";
const require = createRequire(import.meta.url);
countries.registerLocale(require("i18n-iso-countries/langs/nb.json")); countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const EXTRA = { "Kosovo": "XK", "N. Cyprus": "CY_N", "Somaliland": "SO_S" }; // land uten ISO-nummer i dataene
const NAMES = { XK: ["Kosovo", "Kosovo"], CY_N: ["Nord-Kypros", "Northern Cyprus"], SO_S: ["Somaliland", "Somaliland"] };
// Stedspunkter som piler og etiketter kan bruke: [lengdegrad, breddegrad]
const POINTS = { berlin: [13.4, 52.5], paris: [2.35, 48.86], london: [-0.13, 51.5], moskva: [37.6, 55.75], warszawa: [21, 52.23], wien: [16.37, 48.2], roma: [12.5, 41.9],
  beograd: [20.46, 44.8], sarajevo: [18.41, 43.86], istanbul: [28.98, 41.0], gallipoli: [26.5, 40.3], verdun: [5.38, 49.16], somme: [2.7, 49.95], marne: [3.5, 48.95], ypres: [2.88, 50.85],
  tannenberg: [20.1, 53.5], isonzo: [13.6, 46.0], brusel: [4.35, 50.85], oslo: [10.75, 59.91], narvik: [17.4, 68.4], kobenhavn: [12.57, 55.68], amsterdam: [4.9, 52.37],
  dunkerque: [2.37, 51.03], stalingrad: [44.5, 48.7], leningrad: [30.3, 59.94], kyiv: [30.52, 50.45], normandie: [-0.6, 49.35], sicilia: [14.0, 37.5], elalamein: [28.95, 30.83],
  athen: [23.73, 37.98], helsinki: [24.94, 60.17], budapest: [19.04, 47.5], bucuresti: [26.1, 44.43], sofia: [23.32, 42.7], madrid: [-3.7, 40.42], lisboa: [-9.14, 38.72],
  ankara: [32.86, 39.93], kairo: [31.24, 30.04], bagdad: [44.36, 33.31], jerusalem: [35.21, 31.77], stockholm: [18.07, 59.33], praha: [14.42, 50.08], kursk: [36.19, 51.73],
  minsk: [27.56, 53.9], riga: [24.1, 56.95], bastogne: [5.72, 50.0], dresden: [13.74, 51.05], tunis: [10.18, 36.8], napoli: [14.27, 40.85], anzio: [12.63, 41.45],
  // verden
  washington: [-77.04, 38.9], newyork: [-74, 40.7], tokyo: [139.7, 35.7], beijing: [116.4, 39.9], pearlharbor: [-157.95, 21.36], midway: [-177.37, 28.2], hiroshima: [132.46, 34.39],
  manila: [120.98, 14.6], singapore: [103.8, 1.35], sydney: [151.2, -33.87], delhi: [77.2, 28.6], capetown: [18.42, -33.92], nairobi: [36.82, -1.29], lagos: [3.38, 6.52],
  riodejaneiro: [-43.2, -22.9], mexico: [-99.13, 19.43], havana: [-82.37, 23.11], saigon: [106.7, 10.78], seoul: [126.98, 37.57], kabul: [69.2, 34.53], mekka: [39.83, 21.42],
  varanasi: [83.0, 25.32], bodhgaya: [84.99, 24.7], kinshasa: [15.3, -4.32], dakar: [-17.44, 14.69], addis: [38.75, 9.0], alger: [3.06, 36.75] };
const VIEWS = {
  europe: { data: "countries-50m.json", w: 1000, h: 860, proj: () => geoMercator(), box: [[-25, 27], [60, 72]], digits: 0, keep: 0.12 },
  world: { data: "countries-110m.json", w: 1000, h: 520, proj: () => geoEqualEarth(), box: null, digits: 0, keep: 0.6 }
};
const out = {};
for(const [vk, V] of Object.entries(VIEWS)){
  const topo = JSON.parse(fs.readFileSync(new URL(`../node_modules/world-atlas/${V.data}`, import.meta.url)));
  let st = presimplify(topo); st = simplify(st, quantile(st, 1 - V.keep)); // behold de viktigste punktene
  let fc = feature(st, st.objects.countries);
  fc.features = fc.features.filter(f => f.properties.name !== "Antarctica");
  const proj = V.proj();
  if(V.box){ const [[x0, y0], [x1, y1]] = V.box; proj.fitExtent([[0, 0], [V.w, V.h]], { type: "MultiPoint", coordinates: [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [(x0 + x1) / 2, y0], [(x0 + x1) / 2, y1]] }); proj.clipExtent([[-5, -5], [V.w + 5, V.h + 5]]); }
  else proj.fitExtent([[4, 4], [V.w - 4, V.h - 4]], fc);
  const path = geoPath(proj).digits(V.digits);
  const c = {};
  for(const f of fc.features){
    const name = f.properties.name, k = EXTRA[name] || (f.id && countries.numericToAlpha2(f.id)) || null;
    if(!k){ console.warn("Mangler kode:", name, f.id); continue; }
    const d = path(f); if(!d || d.length < 8) continue;
    // ankerpunkt: tyngdepunktet til den største delen (Frankrike uten Guyana, Russland uten Kaliningrad osv.)
    let main = f.geometry; if(main.type === "MultiPolygon"){ const parts = main.coordinates.map(p => ({ type: "Polygon", coordinates: p })); main = parts.sort((a, b) => geoArea(b) - geoArea(a))[0]; }
    const pc = proj(geoCentroid(main)); const inView = pc && pc[0] > 0 && pc[0] < V.w && pc[1] > 0 && pc[1] < V.h;
    const nm = NAMES[k] || [countries.getName(k, "nb") || name, countries.getName(k, "en") || name];
    (c[k] ||= { d: "", a: null, n: nm }).d += d; if(inView && !c[k].a) c[k].a = pc.map(Math.round);
  }
  const pts = {}; for(const [p, ll] of Object.entries(POINTS)){ const xy = proj(ll); if(xy && xy[0] >= 0 && xy[0] <= V.w && xy[1] >= 0 && xy[1] <= V.h) pts[p] = xy.map(Math.round); }
  out[vk] = { w: V.w, h: V.h, c, p: pts };
  console.log(vk, Object.keys(c).length, "land,", JSON.stringify(out[vk]).length, "tegn");
}
fs.writeFileSync(new URL("../maps_data.js", import.meta.url), "// Laget av tools/make_maps.mjs fra Natural Earth (world-atlas). Ikke rediger for hånd.\nconst MAP_GEO = " + JSON.stringify(out) + ";\n");
