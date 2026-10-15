// Visuell kollisjonskontroll av ekte visninger i appen (oppgave 18): simuleringer, oppgaver med figur, flashcards og kartspillet.
// Ser etter tekst utenfor SVG, tekst over streker eller annen tekst (samme regel som check_figs.js), tekst som klippes,
// innhold som stikker ut av kortet sitt og overlapp i kontrollrader. Kjøres på 375, 768 og 1280 px, lyst og mørkt tema.
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_views.js [sims|cards|lesson|geo …]
// Kartetiketter som krysser landegrenser telles ikke (etikettene har hvit kant); piler, markører og andre etiketter telles.
// Krever Playwright (eller playwright-core og CHROMIUM=sti til Chrome). AXLE_URL kan peke til en annen server. Resultat: tmp/viewcheck.json.
// Automatiske funn er hint: se alltid på eksemplene før du retter.
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), os = require('os'), path = require('path');
const { CHECK, DOMCHECK } = require('./figcheck_lib.js');
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const want = process.argv.slice(2).filter(a => !a.startsWith('--')), on = m => !want.length || want.includes(m);
const SIZES = [[375, 760, 'light'], [375, 760, 'dark'], [768, 1024, 'light'], [1280, 860, 'light'], [1280, 860, 'dark']];
const LONG = 'Dette er en lang forklaring som skal sjekke at teksten brytes og blir inne i kortet, også når den går over mange linjer på en liten mobilskjerm. ';

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const all = [];
  for(const [w, h, theme] of SIZES){
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900 });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    const tag = `${w}px ${theme}`, add = (comp, ex, res) => res.forEach(r => all.push({ size: tag, comp, ex, ...r }));
    await p.goto(URL0); await p.waitForTimeout(1200);
    // ny bruker: VGS, «Helt fra start»
    try{ await p.click('[data-s=vgs]', { timeout: 2000 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(800); await p.click('[data-v=start]', { timeout: 2000 }); }catch(e){}

    if(on('sims') && w !== 768){ // simuleringer: start, hver glidebryter på min og maks, alle på min, alle på maks
      const names = await p.evaluate(() => Object.keys(SIMS));
      for(const name of names){
        const res = await p.evaluate(({ name, CHECK, DOMCHECK }) => {
          const chk = eval('(' + CHECK + ')'), dom = eval('(' + DOMCHECK + ')'), S0 = SIMS[name], out = [];
          const start = Object.fromEntries(S0.p.map(q => [q[0], q[5]])), vars = [['start', start], ['alle min', Object.fromEntries(S0.p.map(q => [q[0], q[2]]))], ['alle maks', Object.fromEntries(S0.p.map(q => [q[0], q[3]]))]];
          for(const q of S0.p){ vars.push([q[0] + '=min', { ...start, [q[0]]: q[2] }]); vars.push([q[0] + '=maks', { ...start, [q[0]]: q[3] }]); }
          document.getElementById('app').innerHTML = `<main class="wrap" id="vc">${simHTML(name)}</main>`; const el = document.querySelector('#vc .sim'); if(!el) return [{ k: 'tegnes ikke', lab: name, ex: '' }];
          for(const [lab, v] of vars){ for(const [k, x] of Object.entries(v)){ const inp = el.querySelector(`input[data-k="${k}"]`); if(inp) inp.value = x; } try{ simUpdate(el); }catch(e){ out.push({ k: 'krasj', lab: e.message, ex: lab }); continue; }
            chk('#vc .sim-svg').forEach(r => out.push({ ...r, ex: lab })); dom('#vc').forEach(r => out.push({ ...r, ex: lab })); }
          return out; }, { name, CHECK: CHECK.toString(), DOMCHECK: DOMCHECK.toString() });
        // samme funn for flere verdier telles én gang
        const seen = new Set(); add('simulering ' + name, '', res.filter(r => { const k = r.k + r.lab; if(seen.has(k)) return false; seen.add(k); return true; }));
      }
    }

    if(on('cards')){ // flashcards: korte og lange spørsmål, svar og forklaringer, før og etter at kortet er snudd
      const cases = [['kort', 'Hva er 2 + 2?', '4', ''], ['langt', LONG + LONG, LONG, LONG + LONG], ['langt ord', 'Elektrokardiogramtolkningsferdighetsopplæring?', 'Elektroencefalografiundersøkelsesprosedyre', '']];
      for(const [lab, q, a, ex] of cases){
        for(const kind of ['snacks', 'leksjon']){
          const res = await p.evaluate(({ kind, q, a, ex, DOMCHECK }) => { const dom = eval('(' + DOMCHECK + ')');
            if(kind === 'snacks'){ snOpen(); SN.cards[0] = { kind: 'flash', it: { prompt: q, answer: a, expl: ex }, flipped: false }; snRedraw(0); }
            else { mdPracticeDeck({ id: 'vc', name: 'Test', cards: [{ q, a }, { q, a }] }, 'flip'); render(); }
            const r1 = dom('#app'); if(kind === 'snacks'){ const f = document.querySelector('.sn-card[data-i="0"] .sn-flip'); if(f) f.classList.add('on'); } else { L.flipShown = true; render(); }
            return [...r1.map(r => ({ ...r, ex: 'forside' })), ...dom('#app').map(r => ({ ...r, ex: 'bakside' }))]; }, { kind, q, a, ex, DOMCHECK: DOMCHECK.toString() });
          add('flashcard ' + kind, lab, res);
          await p.evaluate(() => { try{ if(typeof L !== 'undefined' && L) L = null; screen = 'home'; overlay = null; render(); }catch(e){} });
        }
      }
    }

    if(on('lesson')){ // oppgaver med figur: et utvalg fra flere fag, før svar og etter feil svar (med forklaring)
      const res = await p.evaluate(({ CHECK, DOMCHECK }) => { const chk = eval('(' + CHECK + ')'), dom = eval('(' + DOMCHECK + ')'), out = [];
        for(const code of ['GS14', 'GS57', 'GU810', 'VG1T', 'VG1P', 'GFYS', 'SLMR', 'FKB', 'OBED']){ const c = COURSE(code); if(!c) continue;
          for(let u = 0; u < Math.min(c.units.length, 4); u++){ try{ startUnitLesson(code, u, 0); }catch(e){ continue; } if(screen !== 'lesson' || !L) continue;
            for(let k = 0; k < 3 && L && L.queue[0]; k++){ const it = L.queue[0], ex = `${code} enhet ${u + 1}: ${String(it.prompt).replace(/<[^>]+>|\$/g, '').slice(0, 40)}`;
              chk('.q-fig svg, .lbody .fig svg').forEach(r => out.push({ ...r, ex: ex + ' (før svar)' })); dom('#app', '.opt,.qcard,.q-fig').forEach(r => out.push({ ...r, ex: ex + ' (før svar)' }));
              if(it.type === 'mc'){ L.sel = it.opts.findIndex(o => !o.ok); } else if(it.type === 'num'){ L.input = '123456'; } else break;
              try{ checkAnswer(); }catch(e){ break; }
              chk('.q-fig svg, .lbody .fig svg').forEach(r => out.push({ ...r, ex: ex + ' (etter feil svar)' })); dom('#app', '.opt,.qcard,.q-fig,.lfoot').forEach(r => out.push({ ...r, ex: ex + ' (etter feil svar)' }));
              try{ nextQuestion(); }catch(e){ break; } } } }
        L = null; screen = 'home'; render(); return out; }, { CHECK: CHECK.toString(), DOMCHECK: DOMCHECK.toString() });
      add('oppgave', '', res);
    }

    if(on('geo')){ // kartspillet: alle land i alle regioner (Hvilket land? og Finn landet etter feil svar), og alle historiekart, vanlig og rolig modus
      for(const calm of [0, 1]){
        const res = await p.evaluate(({ calm, CHECK, DOMCHECK }) => { const chk = eval('(' + CHECK + ')'), dom = eval('(' + DOMCHECK + ')'), out = []; S.geoCalm = calm;
          for(const reg of Object.keys(GE_REG)) for(const mode of ['name', 'find']) for(const c of gePool(reg)){
            geStart(reg, mode); cancelAnimationFrame(geTick.raf); GE.q.c = GE.q.ans = c;
            if(mode === 'name'){ const o = GE.q.opts || []; GE.q.opts = [c, ...o.filter(x => x !== c)].slice(0, 4); GE.q.picked = GE.q.opts[1] || ''; } else GE.q.picked = 'sea';
            GE.fx = { miss: 'wrong' }; renderGeo(); dom('#app', '.sg-card,.sg-opt').forEach(r => out.push({ ...r, ex: `${reg} ${mode} ${c}` })); }
          for(const id of geHistMaps()) for(let k = 0; k < MAPS[id].f.length; k++){ geStart(null, 'hist', id); cancelAnimationFrame(geTick.raf); GE.q.k = k; renderGeo();
            chk('.ge .mp-svg', '.mp-c').forEach(r => out.push({ ...r, ex: `${id} steg ${k + 1}` })); dom('#app', '.sg-card,.sg-opt').forEach(r => out.push({ ...r, ex: `${id} steg ${k + 1}` })); }
          clearTimeout(geAnswer.t); GE = null; screen = 'home'; render(); return out; }, { calm, CHECK: CHECK.toString(), DOMCHECK: DOMCHECK.toString() });
        const seen = new Set(); add('kartspill' + (calm ? ' (rolig)' : ''), '', res.filter(r => { const k = r.k + r.lab; if(seen.has(k)) return false; seen.add(k); return true; }));
      }
    }
    if(errs.length) all.push({ size: tag, comp: 'sidefeil', k: 'feil', lab: errs.slice(0, 3).join(' | ') });
    await ctx.close();
  }
  const file = path.join(os.tmpdir(), 'viewcheck.json'); fs.writeFileSync(file, JSON.stringify(all, null, 1));
  const cnt = {}; all.forEach(r => { const k = r.comp.split(' ')[0] + ' / ' + r.k; cnt[k] = (cnt[k] || 0) + 1; });
  console.log('funn:', all.length, cnt); all.slice(0, 60).forEach(r => console.log(` - [${r.size}] ${r.comp} ${r.ex || ''} :: ${r.k} ${r.lab}${r.who ? ' (' + r.who + ')' : ''}`));
  console.log('alle funn:', file);
  await b.close();
})();
