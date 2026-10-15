// Felles kollisjonskontroll for SVG-figurer (brukes av check_figs.js og check_views.js). Kjøres i nettleseren med page.evaluate.
// CHECK(sel): tekst utenfor tegneflaten, tekst som krysser streker, tekst over annen tekst. Hvert funn: { fi (figurnr.), k, lab, d, who }.
const CHECK = (sel, skip) => {
      const issues = [];
      document.querySelectorAll(sel || '.fig svg, .tpart svg, figure svg').forEach((svg, fi) => {
        if(svg.closest('.fbox')) return;
        const vb = svg.viewBox.baseVal, sm = svg.getScreenCTM(); if(!vb || !sm || !vb.width) return;
        const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && getComputedStyle(t).display !== 'none' && getComputedStyle(t).opacity !== '0');
        const geo = [...svg.querySelectorAll('path,line,circle,rect,polyline,polygon,ellipse')].filter(g => { const cs = getComputedStyle(g); return cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0 && cs.visibility !== 'hidden' && cs.opacity !== '0' && cs.strokeOpacity !== '0' && !g.closest('defs,marker,clipPath,mask,pattern'); });
        const box = t => { const r = t.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
        const svgR = svg.getBoundingClientRect(), sx = svgR.width / vb.width;
        const vbScreen = { x: svgR.left, y: svgR.top, w: svgR.width, h: svgR.height };
        const B = texts.map(box);
        texts.forEach((t, i) => { const r = B[i], lab = t.textContent.trim().slice(0, 20);
          // utenfor tegneflaten
          const outX = Math.max(0, vbScreen.x - r.x, r.x + r.w - (vbScreen.x + vbScreen.w)), outY = Math.max(0, vbScreen.y - r.y, r.y + r.h - (vbScreen.y + vbScreen.h));
          if(outX > 3 || outY > 3) issues.push({ fi, k: 'utenfor', lab, d: Math.round(Math.max(outX, outY)) });
          // krysser streker: prøv punkter i den indre delen av tekstboksen
          const ins = { x: r.x + r.w * .12, y: r.y + r.h * .25, w: r.w * .76, h: r.h * .5 }; let hits = 0, tot = 0, who = '';
          for(let a = 0; a <= 4; a++) for(let c = 0; c <= 2; c++){ tot++; const X = ins.x + ins.w * a / 4, Y = ins.y + ins.h * c / 2;
            for(const g of geo){ if(g.contains(t) || t.contains(g) || (skip && g.matches(skip))) continue; const m = g.getScreenCTM(); if(!m) continue; const pt = svg.createSVGPoint(); pt.x = X; pt.y = Y; const q = pt.matrixTransform(m.inverse());
              try{ if(g.isPointInStroke(q)){ hits++; who = g.tagName + (g.getAttribute('class') ? '.' + g.getAttribute('class') : ''); break; } }catch(e){} } }
          if(hits >= 2) issues.push({ fi, k: 'strek', lab, d: hits, who });
          // tekst over tekst
          for(let j = i + 1; j < texts.length; j++){ const s = B[j], ox = Math.min(r.x + r.w, s.x + s.w) - Math.max(r.x, s.x), oy = Math.min(r.y + r.h, s.y + s.h) - Math.max(r.y, s.y);
            if(ox > 2 && oy > r.h * .3 && !t.contains(texts[j]) && !texts[j].contains(t)) issues.push({ fi, k: 'tekst', lab: lab + ' / ' + texts[j].textContent.trim().slice(0, 15), d: Math.round(ox) }); }
        });
      });
      return issues;
    };
// DOMCHECK(scope, boxes): tekst som klippes (overflow skjult), innhold som stikker ut av kortet sitt, og tekst over tekst i kontrollrader.
const DOMCHECK = (scope, boxes) => {
  const out = [], root = document.querySelector(scope) || document.body, nm = e => (e.tagName + '.' + String(e.className || '').split(' ')[0]).slice(0, 30), tx = e => (e.innerText || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
  const vis = e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0; };
  for(const e of root.querySelectorAll('*')){ if(!vis(e)) continue; const cs = getComputedStyle(e);
    if(/hidden|clip/.test(cs.overflow + cs.overflowY + cs.overflowX) && tx(e) && !e.matches('svg,svg *,.katex *,.sr,input,select,textarea') && (e.scrollHeight > e.clientHeight + 3 || e.scrollWidth > e.clientWidth + 3) && !/auto|scroll/.test(cs.overflowY + cs.overflowX) && cs.webkitLineClamp === 'none' && !(cs.textOverflow === 'ellipsis' && e.scrollHeight <= e.clientHeight + 3 && e.title))
      out.push({ k: 'klippet', lab: nm(e) + ' «' + tx(e) + '»', d: Math.max(e.scrollHeight - e.clientHeight, e.scrollWidth - e.clientWidth) }); }
  for(const b of root.querySelectorAll(boxes || '.sn-face,.fc-front,.fc-back,.sg-card,.sg-opt,.opt,.sim,.sim-ctl label,.qcard,.lfoot')){ if(!vis(b)) continue; const R = b.getBoundingClientRect();
    for(const e of b.querySelectorAll('p,span,b,small,em,output,label,h1,h2,h3,h4,li,.katex')){ if(!vis(e) || !tx(e) || getComputedStyle(e).position === 'absolute' && !e.closest('.sn-face') ) continue; let sc = e.parentElement; while(sc && sc !== b && !/auto|scroll/.test(getComputedStyle(sc).overflowX + getComputedStyle(sc).overflowY)) sc = sc.parentElement; if(sc && sc !== b) continue; // ligger i noe som kan rulles
      const r = e.getBoundingClientRect();
      const d = Math.max(R.left - r.left, r.right - R.right, R.top - r.top, r.bottom - R.bottom); if(d > 3){ out.push({ k: 'utenfor kortet', lab: nm(b) + ' ⊃ ' + nm(e) + ' «' + tx(e) + '»', d: Math.round(d) }); break; } } }
  for(const row of root.querySelectorAll('.sim-ctl label,.sim-out>div,.sg-hud,.mp-ctl')){ if(!vis(row)) continue; const kids = [...row.children].filter(vis), B = kids.map(k => k.getBoundingClientRect());
    for(let i = 0; i < kids.length; i++) for(let j = i + 1; j < kids.length; j++){ const a = B[i], c = B[j], ox = Math.min(a.right, c.right) - Math.max(a.left, c.left), oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
      if(ox > 2 && oy > 2) out.push({ k: 'overlapp', lab: nm(row) + ': ' + nm(kids[i]) + ' / ' + nm(kids[j]) + ' «' + tx(row) + '»', d: Math.round(Math.min(ox, oy)) }); } }
  return out;
};
module.exports = { CHECK, DOMCHECK };
