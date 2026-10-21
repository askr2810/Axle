// Animasjonene i appen (anim.js, docs/ANIMASJONER.md): manus, tidslinje, tegning og faglige verdier, uten nettleser. Kjøres i npm test.
// Derivasjon: tallene i fortellerteksten og under bildet regnes ut på nytt fra f(x) = x², sekanten dreier kontinuerlig (ingen hopp
// mellom to bilder), h står stille på tallene fortelleren nevner, og animasjonen kobles til de riktige enhetene.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const order = ['config.js', 'i18n.js', 'data.js', 'gens.js', 'gens_b.js', 'more.js', 'more2.js', 'more2_b.js', 'subjects2.js', 'subjects2_b.js', 'more3.js'];
const extra = [...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort()];
const files = [...order, ...extra.filter(f => !order.includes(f))].filter(f => fs.existsSync(path.join(ROOT, f)));
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const stub = 'var S = {}, screen = "home", document = { addEventListener(){}, getElementById(id){ return (global.AXLE_EL || {})[id] || null; }, querySelector(){ return null; } }, esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;" }[c]));\n';
const src = stub + files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + '\n;\n' + fs.readFileSync(path.join(ROOT, 'anim.js'), 'utf8') +
  ';module.exports={ANIMS,anSVG,AN_MAP,withAnim,anCardHTML,AN_SEE,AN_LAY,setLang:l=>{LANG=l},COURSES,anOpen,anNoteAudio};';
const tmp = path.join(require('os').tmpdir(), 'axle_anim_' + process.pid + '.js'); fs.writeFileSync(tmp, src);
const M = require(tmp); fs.unlinkSync(tmp);
const errs = []; let checks = 0; const ok = (c, m) => { checks++; if(!c) errs.push(m); };
const words = s => s.trim().split(/\s+/).length, near = (a, b, e = 1e-9) => Math.abs(a - b) <= e;

for(const [id, D] of Object.entries(M.ANIMS)){
  // ---- manus og tidslinje ----
  ok(D.end >= 60 && D.end <= 180, `${id}: lengde ${D.end} s (skal være 60–180 s)`);
  D.lines.forEach((l, i) => {
    const w = `${id} ${l.id}`;
    ok(i === 0 ? l.t0 === 0 : near(l.t0, D.lines[i - 1].t0 + D.lines[i - 1].d), `${w}: hull eller overlapp i tidslinja`);
    ok(l.d >= 4 && l.d <= 15, `${w}: replikken varer ${l.d} s (4–15 s)`);
    ok(l.vo[0] && l.vo[1], `${w}: mangler fortellertekst nb/en`);
    ok(words(l.vo[0]) / l.d <= 2.6, `${w}: for raskt på norsk (${words(l.vo[0])} ord på ${l.d} s)`);
    ok(words(l.vo[1]) / l.d <= 3.0, `${w}: for raskt på engelsk (${words(l.vo[1])} ord på ${l.d} s)`);
    ok(!/[æøåÆØÅ«»]/.test(l.vo[1]), `${w}: norske tegn i engelsk tekst`);
    ok(l.s >= 0 && l.s < D.scenes.length && (i === 0 || l.s >= D.lines[i - 1].s), `${w}: ugyldig scene`);
    ok(M.AN_SEE[id] && M.AN_SEE[id][i] && M.AN_SEE[id][i][0] && M.AN_SEE[id][i][1], `${w}: mangler bildebeskrivelse (tekstalternativ) nb/en`);
  });
  ok(M.AN_SEE[id].length === D.lines.length, `${id}: antall bildebeskrivelser ≠ antall replikker`);
  D.scenes.forEach((sc, k) => ok(D.lines.some(l => l.s === k) && sc[0] && sc[1], `${id}: scene ${k + 1} er tom eller mangler navn`));
  ok(D.lines.some(l => l.wait), `${id}: mangler tenkepause`);
  ok(D.check && D.check.opts[D.check.ans] != null && new Set(D.check.opts).size === D.check.opts.length && D.check.why[0] && D.check.why[1], `${id}: kontrollspørsmålet er ugyldig`);
  // ---- tegningen: hvert 0,1 s, begge oppsett og begge språk ----
  for(const lang of ['nb', 'en']){ M.setLang(lang);
    for(const lay of Object.keys(M.AN_LAY)) for(let t = 0; t <= D.end + 1e-9; t += 0.1){
      let svg; try{ svg = M.anSVG(id, t, lay); }catch(e){ ok(false, `${id} ${lang} ${lay} t=${t.toFixed(1)}: krasj ${e.message}`); continue; }
      checks++; if(/NaN|undefined|Infinity/.test(svg)) errs.push(`${id} ${lang} ${lay} t=${t.toFixed(1)}: ugyldig verdi i tegningen`);
      if(lang === 'en' && /[æøåÆØÅ]/.test(svg.replace(/<[^>]*>/g, ''))) errs.push(`${id} ${lay} t=${t.toFixed(1)}: norske tegn i engelsk tegning`);
      const [h1, h2] = D.hud(t); checks++; if(/NaN|undefined/.test(h1 + h2)) errs.push(`${id} ${lang} t=${t.toFixed(1)}: ugyldig tekst under bildet`);
    }
    ok(M.anCardHTML(id).includes('data-a="anopen"'), `${id}: kortet i teorien mangler knapp`);
  }
  M.setLang('nb');
}

// ---- derivasjon: faglige verdier ----
{
  const D = M.ANIMS.derivasjon, A = D.at, f = x => x * x, slope = h => (f(3 + h) - f(3)) / h, vo = D.lines.map(l => l.vo[0]).join(' ');
  ok(f(3) === 9 && f(5) === 25 && f(5) - f(3) === 16 && slope(2) === 8, 'sekanten fra x = 3 til x = 5 skal gå 2 bort og 16 opp (stigning 8)');
  for(const [h, m] of [[1, 7], [0.5, 6.5], [0.1, 6.1], [0.01, 6.01]]) ok(near(slope(h), m, 1e-9) && near(6 + h, m, 1e-12), `stigningen for h = ${h} skal være ${m}`);
  ok(Math.abs((f(3 + 1e-7) - f(3)) / 1e-7 - 6) < 1e-5, 'grensen ved x = 3 skal være 6');
  for(const [x, m] of [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]) ok(Math.abs((f(x + 1e-7) - f(x)) / 1e-7 - m) < 1e-5, `f′(${x}) skal være ${m}`);
  ok(D.check.opts[D.check.ans] === '10', 'kontrollspørsmålet: f′(5) = 10');
  for(const s of ['3 i andre, altså 9', 'der x er 5', '2 bort og 16 opp', '16 delt på 2, altså 8', 'Når h er 1, er stigningen 7', 'en halv, er den 6,5', 'en tidel, er den 6,1', 'nærmer seg 6', '6 opp for hver 1 bort', 'Stigningen i P er altså 6', '6 pluss h', 'stigningen 2, ved 2 er den 4, og ved 4 er den 8', 'det dobbelte av x', 'lik 2x', 'f derivert av 3 er 6'])
    ok(vo.includes(s), `fortellerteksten mangler «${s}» (tallene er kontrollert mot den)`);
  // h står stille på tallene mens fortelleren sier dem, og teksten under bildet viser riktig stigning
  for(const [p, h, txt] of [[0.15, 1, '7,00'], [0.52, 0.5, '6,50'], [0.9, 0.1, '6,10']]){ const t = A(8, p); ok(near(D.state(t).h, h, 1e-9), `h skal være ${h} ved replikk 8, ${p}`); ok(D.hud(t)[0].includes(txt), `teksten under bildet skal vise ${txt} når h = ${h}`); }
  ok(D.hud(A(4, 0.9))[0].includes('16') && D.hud(A(4, 0.9))[0].includes('8'), 'teksten under bildet skal vise 16 / 2 = 8');
  ok(near(D.state(A(9, 0.95)).h, 0.01, 1e-9) && D.hud(A(9, 0.95))[0].includes('6,01'), 'h = 0,01 skal gi stigning 6,01');
  for(const [p, x] of [[0.34, 1], [0.6, 2], [0.95, 4]]){ const t = A(13, p), sx = D.state(t).xT; ok(near(sx, x, 1e-9), `tangentpunktet skal stå på x = ${x}`); ok(D.hud(t)[0].includes(String(2 * x)), `stigningen ved x = ${x} skal vises som ${2 * x}`); }
  ok(near(D.state(A(15, 0.5)).xT, 3), 'oppsummeringen skal vise tangenten i x = 3');
  // kontinuerlig bevegelse: h synker monotont, og sekanten dreier høyst 1,5° mellom to bilder (60 bilder/s) i begge oppsett
  for(const lay of Object.keys(M.AN_LAY)){ const Lo = M.AN_LAY[lay]; let prevH = Infinity, prevAng = null, maxStep = 0, prevCam = null, maxCam = 0;
    for(let t = A(7, 0); t <= A(10, 0.3); t += 1 / 60){
      const h = D.state(t).h; ok(h <= prevH + 1e-12, `h øker ved t = ${t.toFixed(2)}`); prevH = h;
      const [x0, x1, y0, y1] = D.camAt(t, lay), m = slope(h), sxs = Lo.g[2] / (x1 - x0), sys = Lo.g[3] / (y1 - y0), ang = Math.atan2(m * sys, sxs) * 180 / Math.PI;
      if(prevAng != null) maxStep = Math.max(maxStep, Math.abs(ang - prevAng)); prevAng = ang;
      if(prevCam) maxCam = Math.max(maxCam, ...[x0, x1, y0, y1].map((v, k) => Math.abs(v - prevCam[k]) / (k < 2 ? prevCam[1] - prevCam[0] : prevCam[3] - prevCam[2]))); prevCam = [x0, x1, y0, y1];
    }
    ok(maxStep <= 1.5, `${lay}: sekanten hopper ${maxStep.toFixed(2)}° mellom to bilder`);
    ok(maxCam <= 0.02, `${lay}: kameraet hopper ${(maxCam * 100).toFixed(1)} % av vinduet mellom to bilder`);
  }
  // sekant og tangent: like før grensen, men ikke før h er liten (sekanten skal kunne skilles fra tangenten underveis)
  ok(slope(D.state(A(8, 0.15)).h) - 6 >= 0.99, 'sekanten skal være tydelig brattere enn tangenten ved h = 1');
  // tilknytning: kortet settes inn én gang i hver derivasjonsenhet
  for(const [code, title] of D.units){ const c = M.COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1;
    ok(u >= 0, `enheten ${code} «${title}» finnes ikke`); if(u < 0) continue;
    ok(M.AN_MAP[code + ':' + u] === 'derivasjon', `${code}:${u} er ikke koblet til animasjonen`);
    const out = M.withAnim(code, u, '# Tittel\nInnledning\n\n## Første\ntekst\n\n## Andre\ntekst');
    ok((out.match(/!\[anim:derivasjon\]/g) || []).length === 1 && out.indexOf('![anim:') < out.indexOf('## Andre'), `${code}: kortet settes ikke inn riktig i teorien`);
    ok(M.withAnim(code, u, out) === out, `${code}: kortet settes inn to ganger`); }
}

// ---- publisert fortellerstemme (assets/anim/<id>/manifest.json, lages med tools/anim_voice.mjs) ----
// Bare lyd laget på en aktiv betalt plan kan ligge her, hver replikk må ha en fil, og teksten må være den samme som i manuset nå.
for(const id of Object.keys(M.ANIMS)){
  const mp = path.join(ROOT, 'assets', 'anim', id, 'manifest.json'); if(!fs.existsSync(mp)) continue;
  const man = JSON.parse(fs.readFileSync(mp, 'utf8')), meta = man._meta || {}, crypto = require('crypto'), sha = x => crypto.createHash('sha1').update(x).digest('hex').slice(0, 12);
  ok(meta.publish === true && !meta.sample && meta.plan && meta.plan.paid === true && meta.plan.status === 'active', `${id}: lyden i assets/anim er ikke laget på en aktiv betalt plan (kommersiell lisens)`);
  for(const lang of ['nb', 'en']){ if(!man[lang]) continue; M.setLang(lang); const li = lang === 'en' ? 1 : 0;
    for(const l of M.ANIMS[id].lines){ const a = man[lang][l.id], text = l.say ? l.say[li] : l.vo[li];
      ok(a && fs.existsSync(path.join(ROOT, 'assets', 'anim', id, a.file)), `${id} ${lang} ${l.id}: lydfila mangler`);
      ok(a && a.sha === sha(text), `${id} ${lang} ${l.id}: lyden er laget av en annen tekst enn manuset (lag den på nytt med tools/anim_voice.mjs)`);
      ok(a && a.dur > 0 && a.dur <= l.d + 4, `${id} ${lang} ${l.id}: lyden (${a && a.dur} s) er mye lengre enn replikken (${l.d} s)`); } }
  M.setLang('nb');
}

// manifestet kommer etter første tegning: lydmenyen har bare «Av», og skal få fortellerstemmen uten å tegne hele skjermen på nytt
{
  global.window = global; global.matchMedia = () => ({ matches: false }); global.fetch = () => new Promise(() => {});
  const sel = { options: [{ value: "off" }], value: "off", innerHTML: "" }; global.AXLE_EL = { "an-snd": sel };
  M.anOpen("derivasjon", "home", true);
  const man = JSON.parse(fs.readFileSync(path.join(ROOT, "assets", "anim", "derivasjon", "manifest.json"), "utf8"));
  ok(M.anNoteAudio("derivasjon", man) === "file", "manifest etter første tegning velger ikke fortellerstemmen");
  ok(sel.innerHTML.includes('value="file"') && sel.innerHTML.includes("Fortellerstemme"), "lydmenyen får ikke valget Fortellerstemme når manifestet kommer");
  ok(sel.innerHTML.includes("l00") === false, "lydmenyen skal ikke liste filnavn");
}

console.log(`animasjoner: ${Object.keys(M.ANIMS).length}, ${checks} sjekker, feil: ${errs.length}`);
errs.slice(0, 30).forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
