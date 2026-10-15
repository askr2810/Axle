// Førerkort: bildet av understyring og overstyring (drive_pics.js, «skrens») er regnet ut, og testen sjekker at bevegelsen er fysisk riktig:
// samme sving og samme rattutslag; understyring = kursen svinger klart mindre enn vegen og bilen peker omtrent dit den går;
// overstyring = kursen følger omtrent svingen, men bilen roterer mye mer enn kursen (bakenden ut), og bakhjulene går utenfor forhjulene.
// Bruk: node tools/test_skrens.js
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'drive_pics.js'), 'utf8');
const M = new Function('const fkBars = () => "", fkMcTop = () => "";\n' + src + '\nreturn DRIVE_PICS;')();
const errs = []; let n = 0; const ok = (c, m) => { n++; if(!c) errs.push(m); };
for(const L of ['nb', 'en']){
  const r = M.skrens(L), d = r.data, U = d.under, O = d.over, endU = U[U.length - 1], endO = O[O.length - 1];
  ok(/<svg/.test(r.svg) && !/NaN|undefined/.test(r.svg), `${L}: ugyldig tegning`);
  ok(U.length === O.length && U[0].x === O[0].x && U[0].y === O[0].y && U[0].chi === O[0].chi, `${L}: ikke samme start og retning i begge panelene`);
  // understyring: kursen dreier under halvparten av svingen (90°), bilen peker nesten dit den går, og banen ender utenfor vegens bue
  ok(endU.chi < 45, `${L}: understyring – kursen dreier ${endU.chi.toFixed(0)}°, skal være klart under 90°`);
  ok(Math.max(...U.map(p => Math.abs(p.psi - p.chi))) <= 10, `${L}: understyring – bilen skal peke omtrent dit den går`);
  const rOut = p => Math.hypot(p.x - d.centre[0], p.y - d.centre[1]);
  ok(rOut(endU) > d.R + 25, `${L}: understyring – banen skal gå ut av svingen`);
  // overstyring: kursen dreier nesten like mye som vegen, men bilen har rotert langt forbi kursen (inn i svingen)
  ok(endO.chi > 70, `${L}: overstyring – kursen skal følge svingen omtrent (${endO.chi.toFixed(0)}°)`);
  ok(endO.psi - endO.chi > 40, `${L}: overstyring – bilen skal rotere mer enn kursen (β = ${(endO.psi - endO.chi).toFixed(0)}°)`);
  ok(O.every((p, k) => k === 0 || p.psi - p.chi >= O[k - 1].psi - O[k - 1].chi - 1e-9), `${L}: overstyring – rotasjonen skal øke jevnt`);
  // bakhjulene går utenfor forhjulene ved overstyring (lenger fra svingens sentrum), og omtrent i samme spor ved understyring
  const W = p => d.wheels(p), avg = (w, a, b) => [(w[a][0] + w[b][0]) / 2, (w[a][1] + w[b][1]) / 2], rad = q => Math.hypot(q[0] - d.centre[0], q[1] - d.centre[1]);
  const wo = W(O[Math.round(O.length * 0.75)]), wu = W(U[Math.round(U.length * 0.75)]);
  ok(rad(avg(wo, 'rl', 'rr')) > rad(avg(wo, 'fl', 'fr')) + 8, `${L}: overstyring – bakhjulene skal gå utenfor forhjulene`);
  ok(Math.abs(rad(avg(wu, 'rl', 'rr')) - rad(avg(wu, 'fl', 'fr'))) < 12, `${L}: understyring – bakhjulene skal følge omtrent i forhjulenes spor`);
  ok(d.STEER > 0, `${L}: forhjulene skal være styrt inn i svingen`);
  ok(!/styr dit du vil|slipp gassen|steer where|ease off/i.test(r.cap), `${L}: bildeteksten skal ikke gi råd om å rette opp skrensen (ikke kontrollert mot autoritativ kilde)`);
}
console.log(`skrens: ${n} sjekker, feil: ${errs.length}`); errs.forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
