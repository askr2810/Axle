// Lager maps_data.js: forhåndsprojiserte landgrenser (Natural Earth via world-atlas, fritt tilgjengelig) til kartene i maps.js.
// Bruk: node tools/make_maps.mjs   (kjøres bare når kartutsnitt eller stedspunkter endres; resultatet sjekkes inn)
// To utsnitt: «europe» (Europa, Nord-Afrika og Midtøsten, Mercator, 50m) og «world» (hele verden uten Antarktis, Equal Earth, 50m).
// Per land: d (SVG-sti, samme geometri brukes til tegning, markering og treffkontroll), a (et punkt INNE i den største synlige delen),
// b (boksen rundt den største synlige delen), v (andel av landets areal som er innenfor utsnittet, bare når den er under 1).
// Krim tegnes som en del av Ukraina (FNs generalforsamling, res. 68/262, og norsk offisiell holdning); Natural Earth legger den under Russland.
// Miljøvariabler for målinger: WORLD_DATA (f.eks. countries-110m.json), WORLD_KEEP, EUROPE_KEEP, MAPS_OUT (annen utfil).
import fs from "node:fs"; import { createRequire } from "node:module";
import { feature, merge } from "topojson-client";
import { presimplify, simplify, quantile } from "topojson-simplify";
import { geoMercator, geoEqualEarth, geoPath, geoContains, geoArea } from "d3-geo";
import countries from "i18n-iso-countries";
const require = createRequire(import.meta.url);
countries.registerLocale(require("i18n-iso-countries/langs/nb.json")); countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const EXTRA = { "Kosovo": "XK", "N. Cyprus": "CY_N", "Somaliland": "SO_S" }; // land uten ISO-nummer i dataene
const NAMES = { XK: ["Kosovo", "Kosovo"], CY_N: ["Nord-Kypros", "Northern Cyprus"], SO_S: ["Somaliland", "Somaliland"],
  // kortere og vanligere navn enn ISO-listen (brukes i Kartspillet)
  CD: ["DR Kongo", "DR Congo"], CG: ["Kongo-Brazzaville", "Republic of the Congo"], CI: ["Elfenbenskysten", "Ivory Coast"], MK: ["Nord-Makedonia", "North Macedonia"],
  LA: ["Laos", "Laos"], CZ: ["Tsjekkia", "Czechia"], US: ["USA", "USA"], GB: ["Storbritannia", "United Kingdom"], RU: ["Russland", "Russia"], IR: ["Iran", "Iran"],
  SY: ["Syria", "Syria"], KR: ["Sør-Korea", "South Korea"], KP: ["Nord-Korea", "North Korea"], VN: ["Vietnam", "Vietnam"], BO: ["Bolivia", "Bolivia"], VE: ["Venezuela", "Venezuela"],
  TZ: ["Tanzania", "Tanzania"], MD: ["Moldova", "Moldova"], TW: ["Taiwan", "Taiwan"], PS: ["Palestina", "Palestine"], VA: ["Vatikanstaten", "Vatican City"], BN: ["Brunei", "Brunei"],
  FK: ["Falklandsøyene", "Falkland Islands"], TL: ["Øst-Timor", "East Timor"], CN: ["Kina", "China"], CF: ["Den sentralafrikanske republikk", "Central African Rep."] };
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
  lindisfarne: [-1.8, 55.67], dublin: [-6.26, 53.35], york: [-1.08, 53.96], reykjavik: [-21.9, 64.1], novgorod: [31.27, 58.52], sevilla: [-6.0, 37.39],
  orknoy: [-3.0, 59.0], stamford: [-0.9, 53.98], atlant: [-24, 47], compiegne: [2.83, 49.42], wittenberg: [12.65, 51.87], geneve: [6.14, 46.2], trondheim: [10.4, 63.43],
  hedeby: [9.57, 54.49], uppsala: [17.64, 59.86], bergen: [5.32, 60.39], bryssel: [4.35, 50.85], strasbourg: [7.75, 48.58], maastricht: [5.69, 50.85], nicosia: [33.36, 35.17],
  murmansk: [33.08, 68.97], kaukasus: [44.8, 42.5], suez: [32.55, 30.0], gibraltar: [-5.35, 36.14], malta: [14.5, 35.9], tobruk: [23.96, 32.08],
  baskerland: [-2.5, 43.0], sapmi: [23.5, 69.0], wales: [-3.8, 52.4], steppe: [40, 48], skottland: [-4.2, 57.0], bretagne: [-3.0, 48.2],
  simferopol: [34.1, 44.95], dzjankoj: [34.4, 45.71], varanasi: [83.0, 25.32], bodhgaya: [84.99, 24.7], kinshasa: [15.3, -4.32], dakar: [-17.44, 14.69], addis: [38.75, 9.0], alger: [3.06, 36.75] };
const VIEWS = {
  europe: { data: "countries-50m.json", w: 1000, h: 860, proj: () => geoMercator(), box: [[-25, 27], [60, 72]], digits: 0, keep: +(process.env.EUROPE_KEEP || 0.3) },
  world: { data: process.env.WORLD_DATA || "countries-50m.json", w: 1000, h: 520, proj: () => geoEqualEarth(), box: null, digits: 0, keep: +(process.env.WORLD_KEEP || 0.2) }
};
// Ringer fra en SVG-sti med bare M, L og Z (det geoPath skriver): [[x, y], …] per ring
const ringsOf = d => d.split("M").filter(Boolean).map(s => s.replace(/Z/g, "").split("L").map(p => p.split(",").map(Number)));
// Fjern punkter som er like eller ligger på linje etter avrunding til hele piksler (gir ofte halvparten så lang sti)
const tidy = d => d.split("M").filter(Boolean).map(s => { const r = s.replace(/Z/g, "").split("L").map(p => p.split(",").map(Number)), o = [];
  for(const p of r){ if(o.length && o[o.length - 1][0] === p[0] && o[o.length - 1][1] === p[1]) continue;
    if(o.length >= 2){ const [a, b] = [o[o.length - 2], o[o.length - 1]]; if((b[0] - a[0]) * (p[1] - a[1]) === (b[1] - a[1]) * (p[0] - a[0]) && (p[0] - b[0]) * (b[0] - a[0]) + (p[1] - b[1]) * (b[1] - a[1]) >= 0){ o[o.length - 1] = p; continue; } }
    o.push(p); }
  while(o.length > 1 && o[0][0] === o[o.length - 1][0] && o[0][1] === o[o.length - 1][1]) o.pop();
  return o.length >= 3 ? "M" + o.map(p => p.join(",")).join("L") + "Z" : ""; }).join("");
const ringArea = r => { let a = 0; for(let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); return a / 2; };
const inRings = (rings, x, y) => { let k = false; for(const r of rings) for(let i = 0, j = r.length - 1; i < r.length; j = i++){ const [xi, yi] = r[i], [xj, yj] = r[j]; if((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) k = !k; } return k; };
const edgeDist = (rings, x, y) => { let m = Infinity; for(const r of rings) for(let i = 0, j = r.length - 1; i < r.length; j = i++){ const [ax, ay] = r[j], [bx, by] = r[i], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy, t = L ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / L)) : 0; m = Math.min(m, Math.hypot(x - ax - t * dx, y - ay - t * dy)); } return m; };
// Et punkt godt inne i ringen (rutenett-søk etter punktet lengst fra kanten), så markeringer ikke havner i nabolandet (Norge, Chile, Kroatia)
function inside(ring, all){
  const xs = ring.map(p => p[0]), ys = ring.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  let best = null, bd = -1; const n = 24;
  for(let i = 0; i <= n; i++) for(let j = 0; j <= n; j++){ const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * j / n; if(!inRings(all, x, y)) continue; const dd = edgeDist(all, x, y); if(dd > bd){ bd = dd; best = [x, y]; } }
  if(!best){ // bitteliten ring: finere søk, ellers et hjørne av ringen (alltid på landet)
    for(let i = 0; i <= 4 * n && !best; i++) for(let j = 0; j <= 4 * n; j++){ const x = x0 + (x1 - x0) * i / (4 * n), y = y0 + (y1 - y0) * j / (4 * n); if(inRings(all, x, y)){ best = [x, y]; break; } }
    if(!best) return ring[0]; }
  const r = best.map(Math.round); return inRings(all, r[0] + 0.01, r[1] + 0.01) ? r : best.map(v => +v.toFixed(1));
}
const out = {};
for(const [vk, V] of Object.entries(VIEWS)){
  const topo = JSON.parse(fs.readFileSync(new URL(`../node_modules/world-atlas/${V.data}`, import.meta.url)));
  let st = presimplify(topo); st = simplify(st, quantile(st, V.keep)); // keep = andelen punkter som beholdes (de viktigste)
  // Krim: flytt Russlands delpolygon som inneholder Simferopol over til Ukraina (merge fjerner grensen mellom dem)
  const geoms = st.objects.countries.geometries, ru = geoms.find(g => g.id === "643"), ua = geoms.find(g => g.id === "804");
  const ci = ru.arcs.findIndex(arcs => geoContains(feature(st, { type: "Polygon", arcs }), [34.1, 44.95]));
  if(ci < 0) throw new Error("Fant ikke Krim i Russlands geometri");
  const crimea = { type: "Polygon", arcs: ru.arcs[ci] }; ru.arcs = ru.arcs.filter((_, i) => i !== ci);
  const uaGeo = merge(st, [ua, crimea]);
  const raw = new Map(feature(topo, topo.objects.countries).features.map(f => [f.properties.name, f])); // uforenklet, for land som blir borte
  let fc = feature(st, st.objects.countries);
  fc.features = fc.features.filter(f => f.properties.name !== "Antarctica");
  for(const f of fc.features) if(f.id === "804") f.geometry = uaGeo;
  const proj = V.proj().precision(0); // ingen ekstra punkter langs lange linjer (de forsvinner likevel ved avrunding)
  if(V.box){ const [[x0, y0], [x1, y1]] = V.box; proj.fitExtent([[0, 0], [V.w, V.h]], { type: "MultiPoint", coordinates: [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [(x0 + x1) / 2, y0], [(x0 + x1) / 2, y1]] }); }
  else proj.fitExtent([[4, 4], [V.w - 4, V.h - 4]], fc);
  const pathFull = geoPath(V.proj().precision(0).scale(proj.scale()).translate(proj.translate())).digits(V.digits); // uten klipping: for å regne ut hvor stor andel av landet som er synlig
  if(V.box) proj.clipExtent([[-5, -5], [V.w + 5, V.h + 5]]);
  const path = geoPath(proj).digits(V.digits);
  const c = {}, full = {};
  for(const f of fc.features){
    const name = f.properties.name, k = EXTRA[name] || (f.id && countries.numericToAlpha2(f.id)) || null;
    if(!k){ console.warn("Mangler kode:", name, f.id); continue; }
    let d = tidy(path(f) || ""), tiny = 0;
    if(!d){ // landet er for lite til å få en form på dette kartet: en liten rute på riktig sted, og t: 1 så spillet viser en markør i stedet
      const p = path.centroid(raw.get(name)); if(!p.every(Number.isFinite) || p[0] < 0 || p[0] > V.w || p[1] < 0 || p[1] > V.h) continue;
      const [x, y] = p.map(Math.round); d = `M${x},${y - 1}L${x + 1},${y}L${x},${y + 1}L${x - 1},${y}Z`; tiny = 1; }
    const nm = NAMES[k] || [countries.getName(k, "nb") || name, countries.getName(k, "en") || name];
    if(c[k] && tiny) continue; // et annet stykke av landet har allerede en form
    if(c[k] && c[k].t){ c[k].d = ""; delete c[k].t; }
    (c[k] ||= { d: "", n: nm }).d += d; if(tiny) c[k].t = 1;
    // synlig andel: av landets hoveddel målt på kloden (Svalbard skal ikke telle mer enn Fastlands-Norge fordi Mercator blåser det opp)
    let main = f.geometry; if(main.type === "MultiPolygon") main = main.coordinates.map(p => ({ type: "Polygon", coordinates: p })).sort((a, b) => geoArea(b) - geoArea(a))[0];
    const A = g => Math.abs(ringsOf(tidy(g || "")).reduce((s, r) => s + ringArea(r), 0)), fa = A(pathFull(main));
    if(fa > 0 && !full[k]) full[k] = Math.min(1, A(path(main)) / fa);
  }
  for(const [k, o] of Object.entries(c)){
    // samme ringer som tegnes: den største delen innenfor kartet gir ankerpunkt og boks
    const rings = ringsOf(o.d), sign = Math.sign(rings.reduce((s, r) => s + ringArea(r), 0)) || 1;
    const vis = r => { const cl = r.map(([x, y]) => [Math.max(0, Math.min(V.w, x)), Math.max(0, Math.min(V.h, y))]); return ringArea(cl) * sign; };
    let outer = rings.filter(r => ringArea(r) * sign > 0); if(!outer.length) outer = rings; // bittesmå land kan bli en strek etter avrundingen
    const main = outer.sort((p, q) => vis(q) - vis(p) || Math.abs(ringArea(q)) - Math.abs(ringArea(p)))[0];
    const xs = main.map(p => p[0]), ys = main.map(p => p[1]);
    o.b = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)].map(Math.round);
    o.a = vis(main) > 0 ? inside(main, rings) : null;
    const v = full[k] ?? 1; if(v < 0.995) o.v = +v.toFixed(2);
  }
  const pts = {}; for(const [p, ll] of Object.entries(POINTS)){ const xy = proj(ll); if(xy && xy[0] >= 0 && xy[0] <= V.w && xy[1] >= 0 && xy[1] <= V.h) pts[p] = xy.map(Math.round); }
  out[vk] = { w: V.w, h: V.h, c, p: pts };
  const pn = Object.values(c).reduce((s, o) => s + o.d.split(/[ML]/).length - 1, 0);
  console.log(vk, V.data, "keep", V.keep, Object.keys(c).length, "land,", pn, "punkter,", JSON.stringify(out[vk]).length, "tegn");
}
const file = process.env.MAPS_OUT ? new URL(process.env.MAPS_OUT, "file://" + process.cwd() + "/") : new URL("../maps_data.js", import.meta.url);
fs.writeFileSync(file, "// Laget av tools/make_maps.mjs fra Natural Earth (world-atlas). Ikke rediger for hånd.\nconst MAP_GEO = " + JSON.stringify(out) + ";\n");
