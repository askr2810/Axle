// Kladdearket (oppgave 17 og 23): hva penn, finger og mus gjør (scRole), og at streken som tegnes bit for bit (scBegin/scPieces i scDraw)
// gir nøyaktig de samme tegnekommandoene som når hele streken tegnes på nytt (scStroke). Henter funksjonene fra app.js.
// Bruk: node tools/test_draw.js
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
function grab(name){ const i = src.indexOf('function ' + name + '('); if(i < 0) throw new Error('fant ikke ' + name);
  let d = 0, j = src.indexOf('{', i); for(; j < src.length; j++){ if(src[j] === '{') d++; else if(src[j] === '}' && --d === 0) break; } return src.slice(i, j + 1); }
const F = new Function(['scRole', 'scBegin', 'scPieces', 'scStroke'].map(grab).join('\n') + '\nreturn { scRole, scBegin, scPieces, scStroke };')();
const errs = []; let checks = 0; const ok = (c, m) => { checks++; if(!c) errs.push(m); };

// ---------- penn, finger og mus ----------
const pen = (o = {}) => ({ pointerType: 'pen', button: 0, buttons: 1, width: 1, height: 1, ...o });
const finger = (o = {}) => ({ pointerType: 'touch', button: 0, buttons: 1, width: 20, height: 20, ...o });
const mouse = (o = {}) => ({ pointerType: 'mouse', button: 0, buttons: 1, width: 1, height: 1, ...o });
const R = (e, mode, penUsed, penDown, tool) => F.scRole(e, mode || 'auto', !!penUsed, !!penDown, tool || 'pen');
// Penn
for(const mode of ['auto', 'pen', 'touch']) ok(R(pen(), mode) === 'draw', `penn tegner (${mode})`);
ok(R(pen({ buttons: 32 })) === 'erase' && R(pen({ button: 5 })) === 'erase', 'viskeknappen på pennen visker');
ok(R(pen(), 'auto', true, true, 'eraser') === 'erase', 'penn med viskelær valgt visker');
// Finger
ok(R(finger(), 'auto') === 'draw', 'finger tegner før en penn er brukt (auto)');
ok(R(finger(), 'auto', true) === 'pan', 'finger flytter arket etter at pennen er brukt (auto)');
ok(R(finger(), 'auto', true, true) === 'palm', 'finger mens pennen er nede er håndflaten');
ok(R(finger({ width: 60, height: 50 }), 'auto', true) === 'palm', 'stor kontaktflate etter pennen er håndflaten');
ok(R(finger({ width: 60, height: 50 }), 'auto', false) === 'draw', 'stor kontaktflate før pennen er brukt tegner (ingen penn i bruk)');
ok(R(finger(), 'pen') === 'pan' && R(finger({ width: 60 }), 'pen') === 'palm', 'innstilling «penn»: finger flytter, håndflate ignoreres');
ok(R(finger(), 'touch', true, true) === 'draw', 'innstilling «finger»: finger tegner også når pennen er nede');
ok(R(finger(), 'auto', false, false, 'eraser') === 'erase', 'finger med viskelær valgt visker');
// Mus
ok(R(mouse()) === 'draw', 'venstre museknapp tegner');
ok(R(mouse({ button: 1 })) === 'pan' && R(mouse({ button: 2 })) === 'pan', 'midtre og høyre museknapp flytter arket');
ok(R(mouse(), 'auto', true, true) === 'draw', 'musa påvirkes ikke av pennen');
ok(R(mouse(), 'auto', false, false, 'eraser') === 'erase', 'mus med viskelær valgt visker');

// ---------- bit for bit = hele streken ----------
// Et lerret som bare skriver ned kommandoene (avrundet), så de kan sammenlignes.
function rec(){ const ops = []; const r = n => Math.round(n * 1e6) / 1e6;
  return { ops, set strokeStyle(v){ ops.push('ss ' + v); }, set lineWidth(v){ ops.push('lw ' + r(v)); },
    beginPath(){}, moveTo(x, y){ ops.push('M ' + r(x) + ' ' + r(y)); }, lineTo(x, y){ ops.push('L ' + r(x) + ' ' + r(y)); },
    quadraticCurveTo(a, b, c, d){ ops.push('Q ' + [a, b, c, d].map(r).join(' ')); }, stroke(){ ops.push('S'); } }; }
const geo = ops => ops.filter(o => !o.startsWith('ss')); // fargen settes på nytt for hver bit; selve tegningen skal være lik
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for(const pr of [true, false]) for(const view of [{ s: 1, x: 0, y: 0 }, { s: 2.5, x: -40, y: 13 }]) for(let run = 0; run < 25; run++){
  const pts = [], s = { c: 1, pts, pr: pr || undefined }, colors = ['#111', '#c00'];
  const base = rec(); let live = null, n0 = 0, maxJump = 0;
  const add = () => { const p = { x: 50 + rnd() * 400, y: 50 + rnd() * 300 }; if(pr) p.p = rnd() < 0.1 ? 0 : rnd() * 1.2; pts.push(p); };
  add();
  for(let frame = 0; frame < 60; frame++){
    const k = 1 + Math.floor(rnd() * 5); for(let i = 0; i < k; i++) add(); // flere punkter per bilde (getCoalescedEvents)
    const pred = rnd() < 0.5 ? [{ x: 60, y: 70, p: 0.4 }, { x: 64, y: 72, p: 0.5 }] : null;
    // som scDraw: ferdige stykker inn i bakgrunnen, så halen (med anslåtte punkter) på skjermen
    if(!live) live = F.scBegin(s, view);
    F.scPieces(base, s, view, colors, live, pts.length - 1);
    const scr = rec(), shown = pred ? { ...s, pts: pts.concat(pred) } : s;
    F.scPieces(scr, shown, view, colors, { ...live }, shown.pts.length);
    const full = rec(); F.scStroke(full, shown, view, colors);
    ok(JSON.stringify(geo(base.ops).concat(geo(scr.ops))) === JSON.stringify(geo(full.ops)), `bit for bit ≠ hele streken (trykk=${pr}, zoom=${view.s}, bilde ${frame})`);
    if(errs.length > 5) break;
  }
  // bredden endres høyst 12 % per stykke
  if(pr){ const full = rec(); F.scStroke(full, s, view, colors); const ws = full.ops.filter(o => o.startsWith('lw')).map(o => +o.slice(3));
    for(let i = 1; i < ws.length; i++) maxJump = Math.max(maxJump, ws[i] / ws[i - 1], ws[i - 1] / ws[i]);
    ok(maxJump <= 1.12 + 1e-4, `bredden hopper ${maxJump.toFixed(3)}× mellom to stykker`); }
}
// én prikk og to punkter tegnes som før
{ const a = rec(); F.scStroke(a, { c: 0, pts: [{ x: 1, y: 2, p: 0.5 }], pr: true }, { s: 1, x: 0, y: 0 }, ['#000']); ok(a.ops.join('|') === 'ss #000|lw 2.4|M 1 2|L 1.1 2|S', 'prikk: ' + a.ops.join('|')); }
{ const a = rec(); F.scStroke(a, { c: 0, pts: [{ x: 0, y: 0 }, { x: 10, y: 0 }] }, { s: 1, x: 0, y: 0 }, ['#000']); ok(geo(a.ops).join('|') === 'lw 2.4|M 0 0|Q 10 0 10 0|S', 'to punkter: ' + a.ops.join('|')); }

console.log(`kladdeark: ${checks} sjekker, feil: ${errs.length}`);
errs.slice(0, 20).forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
