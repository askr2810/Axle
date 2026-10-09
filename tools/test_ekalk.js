// Test av elementkalkulatoren (ekalk.js): FEM-løsningen og den eksakte løsningen sammenlignes med håndregnede svar,
// likevekt sjekkes, feilen skal minke med flere elementer, og ugyldige uttrykk skal gi en forståelig melding.
// Bruk: node tools/test_ekalk.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { T: (a) => a, esc: s => String(s), texD: s => s, rich: s => s, fgAr: () => '', fgT: () => '', decPoint: () => false, I: {}, S: {}, Math, Number, Array, JSON, String, Object, Error };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'ekalk.js'), 'utf8') + '\n;this.ekCompute = ekCompute; this.ekParse = ekParse; this.ekEval = ekEval; this.ekTex = ekTex; this.ekSteps = ekSteps;', ctx);
const { ekCompute, ekParse, ekEval, ekTex, ekSteps } = ctx;
let n = 0; const errs = [];
const ok = (cond, msg) => { n++; if(!cond) errs.push(msg); };
const near = (a, b, tol, msg) => ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg}: fikk ${a}, ventet ${b}`);
const run = cfg => ekCompute(Object.assign({ q: '0', P: [], bc: 'left', n: 2 }, cfg));
const sumR = r => r.R.reduce((s, v) => s + v, 0);
const nodesExact = (r, tol, msg) => r.X.forEach((x, i) => near(r.u[i], r.uAt(x), tol, `${msg} u i node ${i + 1}`));

// 1. Ingen last: alt er null
{ const r = run({ L: '4', ea: '20000' }); r.u.forEach((v, i) => near(v, 0, 1e-15, `null last u${i + 1}`)); near(sumR(r), 0, 1e-12, 'null last reaksjon'); }
// 2. Jevn last, fast venstre ende: u(x) = q(Lx − x²/2)/EA, R = −qL
{ const r = run({ L: '4', ea: '20000', q: '5', n: 2 });
  near(r.u[1], 5 * (4 * 2 - 2) / 20000, 1e-9, 'jevn last u(2)'); near(r.u[2], 5 * 8 / 20000, 1e-9, 'jevn last u(4)'); near(r.R[0], -20, 1e-9, 'jevn last R');
  nodesExact(r, 1e-6, 'jevn last'); near(r.els[0].N, 15, 1e-9, 'jevn last N i element 1 (snitt av 20 og 10)'); }
// 3. Punktlast i høyre ende: u(L) = PL/EA
{ const r = run({ L: '4', ea: '20000', P: [['10', '4']], n: 3 }); near(r.u[r.nn - 1], 10 * 4 / 20000, 1e-9, 'endelast u(L)'); near(r.R[0], -10, 1e-9, 'endelast R'); r.els.forEach((e, i) => near(e.N, 10, 1e-9, `endelast N${i + 1}`)); }
// 4. Feilen som ble rettet: fast HØYRE ende, last helt i VENSTRE ende (ikke tell lasten to ganger)
{ const r = run({ L: '4', ea: '20000', q: '5', P: [['10', '0']], bc: 'right', n: 2 });
  near(r.u[0], (10 * 4 + 5 * 16 / 2) / 20000, 1e-9, 'høyre fast, last i x=0: u(0)'); near(r.uAt(0), r.u[0], 1e-6, 'høyre fast, last i x=0: eksakt u(0)');
  nodesExact(r, 1e-6, 'høyre fast'); near(r.R[0], -30, 1e-9, 'høyre fast R'); }
// 5. Fast i begge ender, punktlast inne i staven: R1 = −P·b/L, R2 = −P·a/L, u(a) = P·a·b/(EA·L)
{ const r = run({ L: '3', ea: '30000', P: [['15', '1']], bc: 'both', n: 3 });
  near(r.R[0], -10, 1e-9, 'begge faste R1'); near(r.R[1], -5, 1e-9, 'begge faste R2'); near(r.u[1], 15 * 1 * 2 / (30000 * 3), 1e-9, 'begge faste u(1)'); nodesExact(r, 1e-5, 'begge faste'); }
// 6. Punktlast mellom nodene: det legges inn en node der lasten står, og nodeverdiene blir eksakte
{ const r = run({ L: '2', ea: '5000', P: [['8', '1.3']], n: 2 }); ok(r.X.some(x => Math.abs(x - 1.3) < 1e-12), 'node lagt inn ved punktlast'); ok(r.added.length === 1, 'én ekstra node');
  nodesExact(r, 1e-6, 'punktlast mellom noder'); near(r.u[r.nn - 1], 8 * 1.3 / 5000, 1e-9, 'punktlast mellom noder u(L)'); }
// 7. Lineært økende last q = 2x: u(L) = (L³ − L³/3)/EA, lineær lastformel brukes
{ const r = run({ L: '4', ea: '20000', q: '2x', n: 4 }); ok(r.qLin === true, 'q = 2x gjenkjennes som lineær'); near(r.u[r.nn - 1], (64 - 64 / 3) / 20000, 1e-9, 'lineær last u(L)'); nodesExact(r, 1e-6, 'lineær last'); }
// 8. Varierende EA(x): eksakt løsning mot analytisk svar, og feilen minker når antall elementer øker
{ const exact = 0.01 * 2 * Math.log(2); // ∫₀² 10 / (1000(2 − x/2)) dx
  let prev = Infinity;
  for(const ne of [1, 2, 4, 8]){ const r = run({ L: '2', ea: '1000(2 - x/2)', P: [['10', '2']], n: ne });
    near(r.uAt(2), exact, 1e-6, `varierende EA: eksakt u(L) med n=${ne}`);
    const e = Math.abs(r.u[r.nn - 1] - exact); ok(e < prev, `varierende EA: feilen skal minke (n=${ne}: ${e} ≥ ${prev})`); prev = e; }
  ok(prev < 1e-4 * 1, 'varierende EA: liten feil med 8 elementer'); }
// 9. Likevekt: reaksjoner + punktlaster + ∫q dx = 0 for mange tilfeldige oppsett
{ let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for(let k = 0; k < 60; k++){ const L = 1 + 5 * rnd(), bc = ['left', 'right', 'both'][k % 3];
    const P = Array.from({ length: k % 4 }, () => [String(Math.round(40 * rnd() - 20) || 3), String(+(L * rnd()).toFixed(3))]);
    const r = run({ L: String(L), ea: `${1000 + Math.round(9000 * rnd())}(1 + x/${(2 + 3 * rnd()).toFixed(2)})`, q: `${(10 * rnd() - 5).toFixed(2)} + ${(2 * rnd()).toFixed(2)}x`, P, bc, n: 1 + (k % 8) });
    near(sumR(r) + r.Ptot + r.Qt, 0, 1e-8, `likevekt i oppsett ${k}`);
    if(bc !== 'both') ok(Math.abs(r.u[r.fixed[0]]) < 1e-15, `fast node har u = 0 (oppsett ${k})`); } }
// 10. Steg-teksten lages uten feil for alle opplagerkombinasjoner
for(const bc of ['left', 'right', 'both']){ try{ const S = ekSteps(run({ L: '3', ea: '1000(1 + x)', q: '2', P: [['5', '1.5']], bc, n: 3 })); ok(['ode', 'weak', 'mesh', 'ke', 'fe', 'asm', 'solve', 'post', 'exact'].every(k => S[k] && S[k].lines.length), `alle steg finnes (${bc})`); }catch(e){ ok(false, `steg kastet (${bc}): ${e.m || e.message}`); } }
// 11. Uttrykk: tolkes riktig, og ugyldige verdier gir en melding (ikke NaN)
near(ekEval(ekParse('2x^2 + 3'), 2, 1), 11, 1e-12, 'parse 2x^2+3'); near(ekEval(ekParse('1000(2 - x/2)'), 2, 1), 1000, 1e-12, 'parse 1000(2-x/2)');
near(ekEval(ekParse('-x^2'), 3, 1), -9, 1e-12, 'parse -x^2'); near(ekEval(ekParse('20000*(1-x/L)'), 2, 4), 10000, 1e-12, 'parse med L'); near(ekEval(ekParse('2,5x'), 2, 1), 5, 1e-12, 'desimalkomma');
for(const bad of ['2x+', '(1+x', 'foo', '3 # 4']){ let threw = false; try{ ekParse(bad); }catch(e){ threw = true; } ok(threw, `ugyldig uttrykk avvises: ${bad}`); }
ok(/\\frac\{x\}\{2\}/.test(ekTex(ekParse('1000(2 - x/2)'))), 'pen formel med brøk');
const msg = cfg => { try{ run(cfg); return null; }catch(e){ return e && e.m; } };
ok(/positiv/.test(msg({ L: '4', ea: '-5' }) || ''), 'negativ EA gir melding');
ok(/positiv/.test(msg({ L: '2', ea: 'sqrt(x - 1)' }) || ''), 'EA med rot av negativt tall gir melding');
ok(/q\(x\)/.test(msg({ L: '1', ea: '1000', q: '1/(x - 0.5)' }) || ''), 'q som deler på null gir melding');
ok(/positiv/.test(msg({ L: '1', ea: '1000(x - 0.5)' }) || ''), 'EA som blir negativ inne i staven gir melding');
ok(/utenfor/.test(msg({ L: '2', ea: '1000', P: [['5', '3']] }) || ''), 'punktlast utenfor staven gir melding');
ok(/Lengden/.test(msg({ L: '-1', ea: '1000' }) || ''), 'negativ lengde gir melding');

console.log(`elementkalkulator: ${n} kontroller, feil: ${errs.length}`);
if(errs.length){ errs.slice(0, 30).forEach(e => console.log('  ' + e)); process.exit(1); }
