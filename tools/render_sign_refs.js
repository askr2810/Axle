// Lager PNG-versjoner (480 px, gjennomsiktig bakgrunn) av de offisielle skilttegningene i tools/sign_refs/official/*.svg,
// som tools/trace_signs.py vektoriserer. SVG-ene er Statens vegvesens skilttegninger fra Wikimedia Commons
// («NO road sign <nr>.svg», offentlig eiendom). Kjøres bare når skilt legges til eller byttes.
// Bruk: NODE_PATH=<sti til playwright(-core)> CHROMIUM=<sti til Chrome> node tools/render_sign_refs.js
let chromium; try{ ({ chromium } = require('playwright')); }catch(e){ ({ chromium } = require('playwright-core')); }
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, 'sign_refs', 'official'), OUT = path.join(DIR, 'png'); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const p = await b.newPage({ viewport: { width: 480, height: 480 } });
  for(const f of fs.readdirSync(DIR).filter(f => f.endsWith('.svg'))){
    const svg = fs.readFileSync(path.join(DIR, f), 'utf8');
    await p.setContent(`<style>html,body{margin:0;background:transparent}img{width:480px;height:480px;object-fit:contain;display:block}</style><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`);
    await p.waitForTimeout(80);
    await p.screenshot({ path: path.join(OUT, f.replace(/\.svg$/, '.png')), omitBackground: true });
  }
  await b.close(); console.log('PNG-er i', OUT);
})();
