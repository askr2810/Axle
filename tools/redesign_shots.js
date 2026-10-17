// Skjermbilder av de viktigste skjermene i Axle, til redesign-kopien (se docs/REDESIGN.md).
// Tar de samme skjermene i samme tilstand hver gang, så «før» og «etter» kan sammenlignes side om side.
// Bruk: node tools/redesign_shots.js --url http://localhost:8777/ --out local/redesign/etter [--only mobil|pc]
// Krever Playwright (eller playwright-core og CHROMIUM=sti til Chrome). Skriver <out>/<skjerm>__<størrelse>.png og <out>/manifest.json.
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const URL0 = arg('url', process.env.AXLE_URL || 'http://localhost:8777/'), OUT = path.resolve(arg('out', 'local/redesign/etter')), ONLY = arg('only', '');

const SIZES = [['mobil-lys', 375, 812, 'light'], ['mobil-mork', 375, 812, 'dark'], ['pc-lys', 1280, 800, 'light'], ['pc-mork', 1280, 800, 'dark']]
  .filter(s => !ONLY || s[0].startsWith(ONLY));
// [fil, navn, oppsett]. route = nøkkel i RT (route.js), hash = fast adresse, js = kode som kjøres i appen.
const SCREENS = [
  ['01-velkomst', 'Velkomst (helt ny bruker)', { fresh: true }],
  ['02-forside', 'Forsiden (Lær)', {}],
  ['03-oppgave', 'Oppgave før svar', { js: `startUnitLesson('GS14', 0, 0); render();` }],
  ['04-oppgave-feil', 'Oppgave etter feil svar', { js: `startUnitLesson('GS14', 0, 0); const it = L.queue[0]; if(it.type === 'mc') L.sel = it.opts.findIndex(o => !o.ok); else L.input = '99999'; checkAnswer(); render();` }],
  ['05-ov', 'Øv', { route: 'practice' }],
  ['06-teori', 'Teori', { route: 'book' }],
  ['07-emneside', 'Emneside (Høyreregelen, førerkort)', { hash: '#/teori/FKB/emne/hoyreregelen' }],
  ['08-forerkort', 'Teoriprøve førerkort', { js: `S.current = 'FKB'; dvPractice('all'); render();` }],
  ['09-snacks', 'Snacks', { js: `snOpen();` }],
  ['10-venner', 'Venner', { route: 'friends' }],
  ['11-profil', 'Profil', { route: 'profile' }],
  ['12-innstillinger', 'Innstillinger', { route: 'settings' }],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const man = { url: URL0, when: new Date().toISOString(), sizes: SIZES.map(s => s[0]), screens: SCREENS.map(s => ({ id: s[0], name: s[1] })), errors: {} };
  for(const [sz, w, h, theme] of SIZES){
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); let errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL0); await p.waitForTimeout(1500);
    for(const [id, name, o] of SCREENS){
      errs = [];
      try{
        if(o.fresh){ /* første skjerm etter oppstart */ }
        else {
          if(id === '02-forside'){ // ny bruker: VGS, «Helt fra start» (samme som check_flows.js)
            try{ await p.click('[data-s=vgs]', { timeout: 2500 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(800); await p.click('[data-v=start]', { timeout: 2500 }); }catch(e){}
            await p.waitForTimeout(600); await p.keyboard.press('Escape').catch(() => {});
          }
          await p.evaluate(() => { try{ if(typeof L !== 'undefined') L = null; overlay = null; screen = 'home'; if(location.hash) location.hash = '#/'; render(); }catch(e){} });
          await p.waitForTimeout(300);
          if(o.route) await p.evaluate(k => { location.hash = '#/' + rtW(k); }, o.route);
          if(o.hash) await p.evaluate(hh => { location.hash = hh; }, o.hash);
          if(o.js) await p.evaluate(code => { eval(code); }, o.js);
        }
        await p.waitForTimeout(1000);
        await p.screenshot({ path: path.join(OUT, `${id}__${sz}.png`) });
      }catch(e){ errs.push('skjermbilde: ' + e.message); }
      if(errs.length) man.errors[`${id}__${sz}`] = errs;
    }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(man, null, 1));
  const ne = Object.keys(man.errors).length;
  console.log(`redesign-skjermbilder: ${SCREENS.length} skjermer × ${SIZES.length} størrelser i ${path.relative(process.cwd(), OUT) || OUT}` + (ne ? `, feil i ${ne} (se manifest.json)` : ''));
})();
