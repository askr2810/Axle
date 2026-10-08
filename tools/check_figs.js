// Sjekker alle illustrasjoner på de statiske sidene: tekst som krysser streker, overlapper annen tekst eller havner utenfor.
// Bruk: python3 build.py && node tools/seo.js && (cd release/www && python3 -m http.server 8080) & node tools/check_figs.js [filter]
// Krever Playwright (NODE_PATH til en global installasjon). Resultat i figcheck.json.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', 'release', 'www');
const pages = []; (function walk(d, rel){ for(const f of fs.readdirSync(d)){ const p = path.join(d, f), r = rel + '/' + f;
  if(['vendor','icons','.well-known'].includes(f)) continue; if(fs.statSync(p).isDirectory()) walk(p, r); else if(f === 'index.html' && rel) pages.push(rel + '/'); } })(ROOT, '');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const p = await b.newPage({ viewport: { width: 420, height: 900 } });
  await p.route(/fonts\.(googleapis|gstatic)/, r => r.abort());
  const out = [];
  const only = process.argv[2] ? new RegExp(process.argv[2]) : null;
  for(const u of pages){ if(only && !only.test(u)) continue;
    const html = fs.readFileSync(ROOT + u + 'index.html', 'utf8'); if(!/class="(fig|tpart)/.test(html)) continue;
    await p.goto('http://localhost:8080' + u, { waitUntil: 'domcontentloaded' });
    const res = await p.evaluate(() => {
      const issues = [];
      document.querySelectorAll('.fig svg, .tpart svg, figure svg').forEach((svg, fi) => {
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
            for(const g of geo){ if(g.contains(t) || t.contains(g)) continue; const m = g.getScreenCTM(); if(!m) continue; const pt = svg.createSVGPoint(); pt.x = X; pt.y = Y; const q = pt.matrixTransform(m.inverse());
              try{ if(g.isPointInStroke(q)){ hits++; who = g.tagName + (g.getAttribute('class') ? '.' + g.getAttribute('class') : ''); break; } }catch(e){} } }
          if(hits >= 2) issues.push({ fi, k: 'strek', lab, d: hits, who });
          // tekst over tekst
          for(let j = i + 1; j < texts.length; j++){ const s = B[j], ox = Math.min(r.x + r.w, s.x + s.w) - Math.max(r.x, s.x), oy = Math.min(r.y + r.h, s.y + s.h) - Math.max(r.y, s.y);
            if(ox > 2 && oy > r.h * .3 && !t.contains(texts[j]) && !texts[j].contains(t)) issues.push({ fi, k: 'tekst', lab: lab + ' / ' + texts[j].textContent.trim().slice(0, 15), d: Math.round(ox) }); }
        });
      });
      return issues;
    });
    if(res.length) out.push({ u, res });
  }
  fs.writeFileSync('figcheck.json', JSON.stringify(out, null, 1));
  const cnt = {}; out.forEach(o => o.res.forEach(r => cnt[r.k] = (cnt[r.k] || 0) + 1));
  console.log('sider med funn:', out.length, cnt);
  await b.close();
})();
