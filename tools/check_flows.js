// Svarflyter (oppgave 19/20): etter riktig og feil svar skal «Neste»/«Fortsett» være helt synlig på skjermen, ikke dekket
// av noe annet, ha tastaturfokus og være minst 44 px høy, og Enter skal gå videre. Kjøres på 375, 768 og 1280 px, lyst og mørkt.
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8080) & node tools/check_flows.js
// Krever Playwright (eller playwright-core og CHROMIUM=sti til Chrome). AXLE_URL kan peke til en annen server. Avslutter med kode 1 ved feil.
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const URL0 = process.env.AXLE_URL || 'http://localhost:8080/';
const SIZES = [[375, 667, 'light'], [375, 667, 'dark'], [768, 1024, 'light'], [1280, 860, 'light'], [1280, 860, 'dark']];
// [navn, oppsett + svar (wrong = true/false), velger for «Neste», tilstand som skal endre seg når man går videre]
const FLOWS = [
  ['oppgave (flervalg)', w => { startUnitLesson('GS14', 0, 0); const it = L.queue[0]; if(it.type === 'mc') L.sel = it.opts.findIndex(o => w ? !o.ok : o.ok); else L.input = w ? '99999' : String(it.n); checkAnswer(); }, '.lfoot [data-a="next"]', () => L && L.answered + ':' + L.queue.length + ':' + (L.queue[0] && L.queue[0].prompt)],
  ['oppgave (lang forklaring)', w => { for(let t = 0; t < 40; t++){ startUnitLesson('OBED', 3, 0); const it = L.queue[0]; if(String(it.expl || '').length > 120 || t === 39){ if(it.type === 'mc') L.sel = it.opts.findIndex(o => w ? !o.ok : o.ok); else L.input = w ? '1' : String(it.n); checkAnswer(); return; } } }, '.lfoot [data-a="next"]', () => L && L.answered + ':' + L.queue.length + ':' + (L.queue[0] && L.queue[0].prompt)],
  ['teoriprøve førerkort', w => { S.current = 'FKB'; dvPractice('all'); const it = DV.items[DV.i]; dvAnswer(it.order.findIndex(x => w ? x !== 0 : x === 0)); }, '.next-dock button', () => DV && DV.i],
  ['skiltspill (feil)', w => { if(!w) return 'skip'; S.current = 'FKB'; sgStart('all', 'mix'); const q = SG.q; sgAnswer(q.opts.findIndex(x => x !== q.ans)); }, '.ge-next', () => SG && SG.n + ':' + (SG.q && SG.q.ans)],
  ['kartspill rolig', w => { S.geoCalm = 1; geStart('americas', 'name'); const c = GE.q.ans; GE.q.opts = [c, ...(GE.q.opts || []).filter(x => x !== c)].slice(0, 4); geAnswer(w ? GE.q.opts[1] : c); if(!w) return 'skip'; }, '.ge-next', () => GE && GE.n + ':' + GE.q.c],
  ['kartspill med tid (feil)', w => { if(!w) return 'skip'; S.geoCalm = 0; geStart('world', 'find'); GE.q.tap = 'sea'; geAnswer('sea'); }, '.ge-next', () => GE && GE.n + ':' + GE.q.c],
  ['lynrunde (feil)', w => { if(!w) return 'skip'; spOpen(); spStart(); const j = SP.it.opts.findIndex(o => !o.ok); document.querySelector(`[data-a="spans"][data-i="${j}"]`).click(); }, '.ge-next', () => SP && SP.answered],
  ['sant/usant (feil)', w => { if(!w) return 'skip'; tfOpen(); tfStart(); tfAnswer(!TF.cur.truth); }, '.ge-next', () => TF && TF.answered],
];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const fails = []; let n = 0;
  for(const [W, H, theme] of SIZES){
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, hasTouch: W < 900 }); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL0); await p.waitForTimeout(1200);
    try{ await p.click('[data-s=vgs]', { timeout: 2000 }); await p.click('[data-a=welgo]'); await p.waitForTimeout(800); await p.click('[data-v=start]', { timeout: 2000 }); }catch(e){}
    for(const [name, run, sel, state] of FLOWS) for(const wrong of [true, false]){
      const tag = `${W}×${H} ${theme} · ${name} · ${wrong ? 'feil' : 'riktig'} svar`;
      const skip = await p.evaluate(([r, w]) => { window.scrollTo(0, 0); return eval('(' + r + ')')(w); }, [run.toString(), wrong]).catch(e => 'feil: ' + e.message);
      if(skip === 'skip') continue; if(typeof skip === 'string' && skip.startsWith('feil')){ fails.push(tag + ': ' + skip); continue; }
      await p.waitForTimeout(300); n++;
      const m = await p.evaluate(sel => { const nb = document.querySelector(sel); if(!nb) return { finnes: false }; const r = nb.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { finnes: true, synlig: r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth + 1, udekket: !!hit && (hit === nb || nb.contains(hit)), fokus: document.activeElement === nb, hoyde: Math.round(r.height) }; }, sel);
      const bad = !m.finnes ? ['finnes ikke'] : [m.synlig ? '' : 'utenfor skjermen', m.udekket ? '' : 'dekket', m.fokus ? '' : 'mangler fokus', m.hoyde >= 44 ? '' : `for lav (${m.hoyde} px)`].filter(Boolean);
      if(m.finnes){ // Enter på knappen skal gå videre
        const before = await p.evaluate(s => JSON.stringify(eval('(' + s + ')')()), state.toString());
        await p.keyboard.press('Enter'); await p.waitForTimeout(400);
        const after = await p.evaluate(s => JSON.stringify(eval('(' + s + ')')()), state.toString());
        if(before === after) bad.push('Enter går ikke videre');
      }
      if(bad.length) fails.push(`${tag}: ${bad.join(', ')}`);
      await p.evaluate(() => { try{ clearTimeout(geAnswer.t); clearTimeout(sgAnswer.t); }catch(e){} try{ GE = null; SG = null; }catch(e){}
        try{ if(SP) clearInterval(SP.timer); SP = null; if(TF) clearInterval(TF.timer); TF = null; }catch(e){} L = null; overlay = null; screen = 'home'; render(); });
    }
    // Live-quiz (tavla og elev): «riktig svar»-animasjonen spilles én gang per spørsmål, også når skjermen tegnes på nytt av pollingen
    { n++; const r = await p.evaluate(async () => {
        const started = []; const on = e => { if(/^(pop|mqok)$/.test(e.animationName)) started.push(e.animationName); }; document.addEventListener('animationstart', on);
        const wait = () => new Promise(r => setTimeout(r, 60)), out = {};
        for(const role of ['host', 'elev']){
          mqOpen(null, role === 'host' ? 'teach' : 'home'); screen = 'mq'; const cfg = { secs: 10, n: 3, seed: 7, lvl: 2 };
          Object.assign(MQ, { mode: 'live', cfg, qs: mqQs(cfg), live: { startAt: 1000, isHost: role === 'host', players: [{ id: 'a', name: 'A', st: { i: 0, s: 100 } }], code: 'X' }, i: 0, chosen: role === 'host' ? null : 0, gained: 0, score: 0, ok: 0, streak: 0, view: 'rev' });
          started.length = 0; render(); await wait(); const first = started.length;
          for(let k = 0; k < 4; k++){ mqLiveApply({ code: 'X', is_host: role === 'host', status: 'run', players: MQ.live.players, cfg, start_at: null }); render(); await wait(); }
          const again = started.length - first; MQ.i = 1; MQ.view = 'q'; render(); await wait(); started.length = 0; MQ.view = 'rev'; render(); await wait();
          out[role] = { first, again, next: started.length }; }
        document.removeEventListener('animationstart', on); clearInterval(MQ.tick); clearTimeout(MQ.pollT); MQ = null; screen = 'home'; render(); return out; });
      for(const [role, v] of Object.entries(r)) if(!(v.first > 0 && v.again === 0 && v.next > 0)) fails.push(`${W}×${H} ${theme}: live-quiz (${role}) «riktig svar» spilles ${v.again} ganger ekstra (første ${v.first}, neste spørsmål ${v.next})`); }
    if(errs.length) fails.push(`${W}×${H} ${theme}: sidefeil ${errs.slice(0, 2).join(' | ')}`);
    await ctx.close();
  }
  console.log(`svarflyter: ${n} kontroller, feil: ${fails.length}`); fails.forEach(f => console.log(' - ' + f));
  await b.close(); process.exit(fails.length ? 1 : 0);
})();
