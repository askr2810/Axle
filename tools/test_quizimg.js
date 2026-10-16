// Bilder i egne quizer og lekser (quizimg.js, oppgave 35): bare stier i Axles egen bøtte vises (aldri vilkårlige adresser),
// bildet og bildeteksten følger med spørsmålet gjennom lagring (qimgKeep) og over i oppgavene (lsItems, ccItems, toMC),
// og CSP-en tillater bilder fra Supabase. Oppgave 36: egen tid (s), avstemning (poll, bare i live) og bilde per svaralternativ (oi)
// lagres (qxKeep) og følger alternativet sitt når rekkefølgen blandes. Bruk: node tools/test_quizimg.js
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
global.document = { addEventListener(){} }; global.CONFIG = { supabaseUrl: 'https://x.supabase.co' };
global.T = (a, b) => a; global.esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
global.t = k => k; global.shuffle = a => a.slice().reverse(); global.QIMG = undefined;
const src = fs.readFileSync(path.join(ROOT, 'quizimg.js'), 'utf8') + '\n' + fs.readFileSync(path.join(ROOT, 'mq.js'), 'utf8').match(/function lsItems[\s\S]*?\}\)\.filter\(Boolean\); \}/)[0] + '\n'
  + fs.readFileSync(path.join(ROOT, 'community.js'), 'utf8').match(/function ccItems\(qs, live\)\{[\s\S]*?\n\}/)[0];
const M = new Function(src + ';return { qimgOk, qimgOf, qimgKeep, qimgHTML, qimgURL, lsItems, ccItems, qxKeep, qxSecs };')();
const errs = []; const E = m => errs.push(m);
const U = '3f2b6c1e-8d4a-4f6b-9a1c-2e5d7f8a9b0c', P = `${U}/0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d.webp`;
if (!M.qimgOk(P) || !M.qimgOk(P.replace('.webp', '.jpg'))) E('gyldig sti avvist');
for (const bad of ['https://evil.example/x.png', '../x.webp', `${U}/x.webp`, `${U}/0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d.svg`, `javascript:alert(1)`, P + '?x', `/${P}`, 42, null])
  if (M.qimgOk(bad) || M.qimgHTML({ src: bad, alt: '' })) E('ugyldig sti godtatt: ' + bad);
if (M.qimgURL(P) !== 'https://x.supabase.co/storage/v1/object/public/quizbilder/' + P) E('feil adresse: ' + M.qimgURL(P));
const h = M.qimgHTML(M.qimgOf({ img: P, alt: 'Trekant "3-4-5" <b>' }));
if (!/<img src="https:\/\/x\.supabase\.co\/storage\/v1\/object\/public\/quizbilder\//.test(h) || /<b>/.test(h) || !/alt="Trekant &quot;3-4-5&quot; &lt;b&gt;"/.test(h)) E('bildet eller bildeteksten escapes ikke: ' + h);
if (!/alt="Bilde til oppgaven"/.test(M.qimgHTML(M.qimgOf({ img: P })))) E('mangler reserve-tekst for skjermleser');
if (Object.keys(M.qimgKeep({ q: 'x' })).length) E('qimgKeep legger til felt uten bilde');
if (Object.keys(M.qimgKeep({ img: 'https://evil.example/x.png' })).length) E('qimgKeep beholder ugyldig sti');
if (M.qimgKeep({ img: P, alt: 'a'.repeat(300) }).alt.length !== 200) E('bildeteksten kortes ikke til 200 tegn');
const qs = [{ t: 'mc', q: 'Hva?', o: ['a', 'b'], a: 0, img: P, alt: 'A' }, { t: 'num', q: 'Tall?', n: 3, img: P }, { t: 'tf', q: 'Sant?', a: 1 }, { t: 'mc', q: 'Ond', o: ['a', 'b'], a: 0, img: 'https://evil.example/x.png' }];
for (const [name, f] of [['lsItems', M.lsItems], ['ccItems', M.ccItems]]) {
  const it = f(qs);
  if (!it[0].qimg || it[0].qimg.src !== P || it[0].qimg.alt !== 'A') E(name + ': flervalg mister bildet');
  if (!it[1].qimg || it[1].qimg.src !== P) E(name + ': tallsvar mister bildet');
  if (it[2].qimg) E(name + ': bilde der det ikke finnes');
  if (it[3].qimg) E(name + ': ugyldig sti slapp gjennom');
}
const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
if (!/expl:it\.expl, qimg:it\.qimg \}/.test(app)) E('toMC tar ikke med bildet');
if (!/\$\{qimgHTML\(it\.qimg, "lq"\)\}<div class="prompt">/.test(app)) E('oppgavevisningen viser ikke bildet');
if (!/q\.img \? qimgHTML\(q\.img, "mq"\)/.test(fs.readFileSync(path.join(ROOT, 'mq.js'), 'utf8'))) E('livequizen viser ikke bildet');
const b = fs.readFileSync(path.join(ROOT, 'build.py'), 'utf8');
if (!/img-src 'self' data: blob:\{supa\}/.test(b)) E('CSP tillater ikke bilder fra Supabase');
if (!/"quizimg\.js", "community\.js"/.test(b)) E('quizimg.js er ikke med i bygget');
if (!/quizbilder/.test(fs.readFileSync(path.join(ROOT, 'supabase', 'laerer.sql'), 'utf8'))) E('SQL for bøtta mangler i supabase/laerer.sql');

// ---------- oppgave 36 ----------
const P2 = `${U}/1a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d.jpg`;
const q36 = [{ t: 'mc', q: 'Stem', o: ['x', 'y', 'z'], a: 0, poll: 1, s: 30 }, { t: 'mc', q: 'Bilder', o: ['katt', 'hund'], a: 1, oi: [P, P2], s: 7 }, { t: 'num', q: 'Tall', n: 2, s: 60 }];
for (const [name, f] of [['lsItems', M.lsItems], ['ccItems', M.ccItems]]) {
  const off = f(q36), on = f(q36, true);
  if (off.some(x => x.poll)) E(name + ': avstemning tatt med utenfor live');
  if (off.length !== 2 || off[0].id.slice(-1) !== '1') E(name + ': id-ene følger ikke originalrekkefølgen når avstemningen hoppes over');
  const poll = on.find(x => x.poll); if (!poll || poll.opts.some(o => o.ok) || poll.secs !== 30) E(name + ': avstemning i live skal ha 30 s og ingen riktige');
  const im = on.find(x => x.prompt === 'Bilder'); if (!im) { E(name + ': mangler bildespørsmålet'); continue; }
  const cat = im.opts.find(o => o.t === 'katt'), dog = im.opts.find(o => o.t === 'hund');
  if (!cat || cat.img !== P || !dog || dog.img !== P2) E(name + ': bildene følger ikke alternativene sine etter blanding');
  if (!dog.ok || cat.ok) E(name + ': riktig svar flyttet seg');
  if (im.secs !== 0) E(name + ': ugyldig tid (7 s) godtatt');
  if (on.find(x => x.prompt === 'Tall').secs !== 60) E(name + ': egen tid på tallspørsmål mangler');
}
const k1 = M.qxKeep({ t: 'mc', o: ['a', 'b'], poll: true, s: 20, oi: [null, P] }, ['a', 'b']);
if (k1.poll !== 1 || k1.s !== 20 || !k1.oi || k1.oi[1] !== P || k1.oi[0] !== null) E('qxKeep lagrer ikke avstemning, tid og bilder: ' + JSON.stringify(k1));
if (Object.keys(M.qxKeep({ t: 'mc', o: ['a', 'b'], s: 7, oi: ['https://evil.example/x.png', null] })).length) E('qxKeep lagrer ugyldig tid eller bilde');
if (Object.keys(M.qxKeep({ t: 'tf', poll: true })).length) E('avstemning lagres på sant/usant');
const mq = fs.readFileSync(path.join(ROOT, 'mq.js'), 'utf8'), tc = fs.readFileSync(path.join(ROOT, 'teach.js'), 'utf8');
if (!/function mqSched\(\)/.test(mq) || !/sch\.findIndex\(x => el < x\.at \+ x\.T \+ MQ_REV\)/.test(mq)) E('livequizen følger ikke tid per spørsmål');
if (!/c: MQ\.chosen \?\? -1/.test(mq)) E('svaret sendes ikke med (trengs for svarfordeling)');
if (!/cfg\.d = TC\.secs; cfg\.secs = mx;/.test(tc)) E('romoppsettet får ikke lengste tid (databasen anslår slutten med cfg.secs)');
if (!/if\(TC\.teams\) cfg\.teams = TC\.teams;/.test(tc) || !/cfg\.mix = 1/.test(tc)) E('lag og blanding kommer ikke med i romoppsettet');
if (errs.length) { console.log(errs.join('\n')); console.log('FEIL: ' + errs.length); process.exit(1); }
console.log('quizbilder og quizvalg: trygge stier, escaping, lagring, visning, egen tid, avstemning, bilder på svar, lag og blanding – feil: 0');
