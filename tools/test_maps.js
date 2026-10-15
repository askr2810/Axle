// Kartspillet og historiekartene: landet det spørres om skal synes i utsnittet, ha riktig form og bli truffet av samme geometri som tegnes.
// Sjekker Norge, Grønland, Russland, Krim, øyer, små land og land ved kanten av utsnittet, i både vanlig kartmodus og historikkmodus.
// Bruk: node tools/test_maps.js   (lager ikke kartdata; kjør node tools/make_maps.mjs først hvis maps_data.js skal endres)
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
const stub = 'const UI = { nb: {}, en: {} }, S = {}, T = (a, b) => a, esc = s => String(s), document = { addEventListener(){} };\n';
const src = ['maps_data.js', 'maps.js', 'geo_game.js'].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
const M = new Function(stub + src + ';return { MAP_GEO, MAPS, GE_REG, gePool, geAll, geVB, mpVB, mpFrames, mpVis, mpShown, mpInside, mpDist, mpMarker, mpRings, mpArea, mpMain };')();
const { MAP_GEO, MAPS, GE_REG } = M;
const errs = []; const E = m => errs.push(m); let checks = 0; const ok = (c, m) => { checks++; if(!c) E(m); };
const full = v => [0, 0, MAP_GEO[v].w, MAP_GEO[v].h];
const inBox = (p, vb) => p[0] >= vb[0] && p[0] <= vb[0] + vb[2] && p[1] >= vb[1] && p[1] <= vb[1] + vb[3];

// 1. Data: hvert land har en form, og ankerpunktet ligger inne i landet selv (ikke i nabolandet eller havet)
for(const [v, G] of Object.entries(MAP_GEO)) for(const [c, o] of Object.entries(G.c)){
  ok(M.mpRings(o).length && M.mpRings(o).every(r => r.length >= 3 && r.every(p => p.every(Number.isFinite))), `${v}/${c}: ugyldig sti`);
  if(o.a && !o.t) ok(M.mpDist(o, o.a[0] + 0.01, o.a[1] + 0.01) <= 0.5, `${v}/${c}: ankerpunktet ${o.a} ligger utenfor landet`);
}
// 2. Alle land som brukes i spillet og historiekartene, finnes i riktig kart
for(const [r, R] of Object.entries(GE_REG)) for(const c of R.codes.split(' ')) ok(MAP_GEO[R.v].c[c], `region ${r}: ${c} mangler i kartet ${R.v}`);
for(const [id, Mp] of Object.entries(MAPS)){ const G = MAP_GEO[Mp.v]; if(!G) continue;
  for(const fr of Mp.f) for(const list of Object.values(fr.s || {})) for(const c of String(list).split(/\s+/).filter(x => x && x !== '-')) ok(G.c[c] || G.p[c], `kart ${id}: ${c} finnes ikke i ${Mp.v}`); }

// 3. Vanlig kartmodus: hver region spør bare om land som synes, og små land får markør
for(const r of Object.keys(GE_REG)){
  const G = MAP_GEO[GE_REG[r].v], vb = M.geVB(r), pool = M.gePool(r), u = vb[2] / 360;
  ok(pool.length >= 0.9 * M.geAll(r).length, `region ${r}: bare ${pool.length} av ${M.geAll(r).length} land kan spørres om`);
  for(const c of pool){
    const vis = M.mpVis(G, c, vb); ok(vis.f >= 0.15 && vis.box, `region ${r}: ${c} synes nesten ikke (andel ${vis.f.toFixed(2)})`);
    const o = G.c[c], s = vis.box ? Math.max(vis.box[2] - vis.box[0], vis.box[3] - vis.box[1]) / u : 0, mk = M.mpMarker(G, c, vb);
    ok(s >= 24 || mk, `region ${r}: ${c} er ${s.toFixed(0)} px og har ingen markør`);
    if(mk){ const [, cx, cy, rr] = mk.match(/cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"/).map(Number);
      ok(inBox([cx, cy], vb), `region ${r}: markøren for ${c} er utenfor kartet`);
      ok([[vis.box[0], vis.box[1]], [vis.box[2], vis.box[3]]].every(([x, y]) => Math.hypot(x - cx, y - cy) <= rr + 1), `region ${r}: markøren for ${c} dekker ikke landet`); }
    // treffkontrollen bruker samme ringer: et trykk på ankerpunktet treffer landet
    if(o.a && !o.t) ok(M.mpDist(o, o.a[0] + 0.01, o.a[1] + 0.01) <= 0.5, `region ${r}: trykk på ${c} treffer ikke ${c}`);
  }
}
// 4. Historikkmodus og «Test deg»: alle land som kan blinke, synes i kartutsnittet
let histQ = 0;
for(const [id, Mp] of Object.entries(MAPS)){ const G = MAP_GEO[Mp.v]; if(!G || !Mp.f.length) continue; const vb = M.mpVB(Mp);
  M.mpFrames(Mp).forEach((fills, k) => { for(const [c, g] of Object.entries(fills)) if(Mp.g[g] && G.c[c] && M.mpShown(G, c, vb)){ histQ++;
    const vis = M.mpVis(G, c, vb); ok(vis.box && vis.f >= 0.15, `kart ${id} steg ${k}: ${c} kan blinke, men synes nesten ikke`); } }); }
ok(histQ > 300, `bare ${histQ} mulige historiespørsmål`);

// 5. Konkrete land som har vært feil
const W = MAP_GEO.world, EU = MAP_GEO.europe;
const ringPts = o => M.mpRings(o).reduce((s, r) => s + r.length, 0);
// Norge: hele fastlandet synes, formen har nok punkter til å ligne Norge, og markeringen havner i Norge (ikke i Sverige)
ok(M.gePool('europe').includes('NO') && M.gePool('world').includes('NO'), 'Norge kan ikke spørres om');
ok(M.mpVis(EU, 'NO', full('europe')).f > 0.99 && M.mpVis(W, 'NO', full('world')).f > 0.99, 'Fastlands-Norge er klippet');
ok(ringPts(W.c.NO) >= 150, `Norge på verdenskartet har bare ${ringPts(W.c.NO)} punkter (blir en klump)`);
ok(Math.abs(M.mpArea(M.mpMain(W.c.NO))) > Math.abs(M.mpArea(M.mpRings(W.c.NO).find(r => r !== M.mpMain(W.c.NO)) || [[0, 0]])), 'hoveddelen av Norge er ikke fastlandet');
for(const G of [W, EU]) ok(!M.mpInside(G.c.SE, ...G.c.NO.a) && !M.mpInside(G.c.FI, ...G.c.NO.a), 'Norges ankerpunkt ligger i nabolandet');
ok(M.mpMarker(W, 'NO', full('world')), 'Norge på verdenskartet (lite) har ingen markør');
// Grønland: synes i Amerika og verden, men ikke i Europakartet (der er bare et hjørne med)
ok(M.gePool('americas').includes('GL') && M.gePool('world').includes('GL'), 'Grønland kan ikke spørres om i Amerika/verden');
ok(!M.mpShown(EU, 'GL', full('europe')), 'Grønland kan spørres om i Europakartet, der bare et hjørne synes');
for(const id of Object.keys(MAPS).filter(id => MAPS[id].v === 'europe')) ok(!M.mpShown(EU, 'GL', M.mpVB(MAPS[id])), `Grønland kan blinke i ${id}`);
// Russland: den europeiske delen er stor nok i Europakartet; hele landet synes i verdenskartet
ok(M.gePool('europe').includes('RU') && M.gePool('world').includes('RU'), 'Russland kan ikke spørres om');
ok(M.mpVis(W, 'RU', full('world')).f > 0.99, 'Russland er klippet i verdenskartet');
// Krim er Ukraina (FNs generalforsamling, res. 68/262), ikke Russland
for(const [v, G] of [['europe', EU], ['world', W]]) for(const p of ['simferopol', 'dzjankoj']){
  ok(G.p[p] && M.mpInside(G.c.UA, ...G.p[p]), `${v}: ${p} er ikke i Ukraina`); ok(G.p[p] && !M.mpInside(G.c.RU, ...G.p[p]), `${v}: ${p} er i Russland`); }
// Øyer: hovedøya synes og ankerpunktet er på land
for(const [r, cs] of [['europe', 'IS GB IE CY'], ['asia', 'JP PH ID LK TW'], ['africa', 'MG'], ['americas', 'CU JM HT'], ['world', 'NZ ID JP MG GB']])
  for(const c of cs.split(' ')) ok(M.gePool(r).includes(c), `region ${r}: øya/øyriket ${c} kan ikke spørres om`);
// Små land: synes ikke som form, men har markør og kan trykkes på
for(const [r, cs] of [['europe', 'LU XK ME MK SI AL MD BE NL CH'], ['africa', 'GM RW BI DJ SZ LS'], ['americas', 'SV JM BZ'], ['asia', 'LB QA KW BT']])
  for(const c of cs.split(' ')){ const G = MAP_GEO[GE_REG[r].v]; ok(M.gePool(r).includes(c), `region ${r}: ${c} kan ikke spørres om`); }
for(const c of 'LU XK ME'.split(' ')) ok(M.mpMarker(EU, c, full('europe')), `${c} har ingen markør i Europakartet`);
for(const c of 'VA MC SM LI'.split(' ')) ok(EU.c[c] && EU.c[c].t && M.mpMarker(EU, c, full('europe')), `${c}: bitteliten stat mangler eller har ingen markør`);
// Land ved kanten: delvis synlige land spørres bare om når det meste (eller en stor bit) synes
for(const c of 'PK MR EH AF'.split(' ')) ok(!M.mpShown(EU, c, full('europe')), `${c} er nesten utenfor Europakartet, men kan spørres om`);
for(const c of 'TR CY IS PT MA EG IL'.split(' ')) ok(M.mpShown(EU, c, full('europe')), `${c} ved kanten av Europakartet kan ikke spørres om`);
for(const [r, c] of [['americas', 'CL'], ['americas', 'CA'], ['africa', 'ZA'], ['africa', 'EG'], ['asia', 'JP'], ['asia', 'TR'], ['asia', 'ID']])
  ok(M.mpVis(MAP_GEO.world, c, M.geVB(r)).f > 0.99, `region ${r}: ${c} er klippet ved kanten`);

console.log(`kart: ${Object.keys(EU.c).length} land i Europa, ${Object.keys(W.c).length} i verden, ${histQ} mulige historiespørsmål, ${checks} sjekker, feil: ${errs.length}`);
errs.forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
