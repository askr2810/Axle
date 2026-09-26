// Lager Axle-logoen: blueprint (blå med hvite ruter) og en minimalistisk «Axle» i appens egen skrift (Figtree).
// Tegnes som SVG og gjøres om til alle ikon- og splash-størrelsene med Chromium. Kjør: node tools/make_logo.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const { chromium } = require('playwright');
const FONT = path.join(ROOT, 'node_modules/@fontsource/figtree/files/figtree-latin-500-normal.woff2');
const BLUE = '#1F4FA8', BLUE_D = '#173F8C', PAPER = '#EEF2EC';

// grid: tynne linjer hver 32. enhet, tydeligere hver 128. (i et 1024-rutenett)
function grid(op = 1){
  let s = '';
  for(let i = 32; i < 1024; i += 32){ const major = i % 128 === 0, a = (major ? 0.26 : 0.11) * op, w = major ? 3 : 1.6;
    s += `<path d="M${i} 0V1024M0 ${i}H1024" stroke="#fff" stroke-opacity="${a}" stroke-width="${w}"/>`; }
  return s;
}
const bg = `<defs><radialGradient id="g" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#2A5FC0"/><stop offset="1" stop-color="${BLUE_D}"/></radialGradient></defs><rect width="1024" height="1024" fill="url(#g)"/>${grid()}`;
const word = (scale = 1) => `<text x="512" y="512" dy="0.35em" text-anchor="middle" font-family="AxleFigtree" font-weight="500" font-size="${300 * scale}" letter-spacing="${-6 * scale}" fill="#fff">Axle</text>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">${body}</svg>`;
const ICON = svg(bg + word());

(async () => {
  const b = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  const p = await b.newPage();
  const fontData = fs.readFileSync(FONT).toString('base64');
  async function render(inner, size, out, transparent, box = size){
    await p.setViewportSize({ width: box, height: box });
    await p.setContent(`<!doctype html><html><head><style>@font-face{font-family:AxleFigtree;src:url(data:font/woff2;base64,${fontData}) format("woff2");font-weight:500}
      html,body{margin:0;background:${transparent ? 'transparent' : PAPER}}#x{width:${box}px;height:${box}px;display:grid;place-items:center}#x svg{width:${size}px;height:${size}px;display:block}</style></head>
      <body><div id="x">${inner}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready);
    const file = path.join(ROOT, out); fs.mkdirSync(path.dirname(file), { recursive: true });
    await p.locator('#x').screenshot({ path: file, omitBackground: !!transparent });
    console.log('  ', out, box + '×' + box);
  }
  fs.writeFileSync(path.join(ROOT, 'web/icons/logo.svg'), ICON.replace('font-family="AxleFigtree"', 'font-family="Figtree, Arial, sans-serif"'));
  await render(ICON, 1024, 'assets/icon-only.png');
  await render(svg(word(0.62)), 1024, 'assets/icon-foreground.png', true);            // Android adaptiv forgrunn (trygg sone)
  await render(svg(bg), 1024, 'assets/icon-background.png');
  await render(ICON, 1024, 'store/app-store-icon-1024.png');
  await render(ICON, 512, 'store/play-icon-512.png');
  for(const s of [192, 512]) await render(ICON, s, `web/icons/icon-${s}.png`);
  await render(ICON, 180, 'web/icons/apple-touch-icon.png');
  await render(svg(bg + word(0.78)), 512, 'web/icons/icon-maskable-512.png');          // maskable: litt mindre skrift
  for(const [name, col] of [['splash.png', PAPER], ['splash-dark.png', '#0F1720']]){
    await p.setViewportSize({ width: 2732, height: 2732 });
    await p.setContent(`<!doctype html><html><head><style>@font-face{font-family:AxleFigtree;src:url(data:font/woff2;base64,${fontData}) format("woff2");font-weight:500}
      html,body{margin:0;background:${col}}#x{width:2732px;height:2732px;display:grid;place-items:center}#x svg{width:560px;height:560px;border-radius:125px;display:block}</style></head><body><div id="x">${ICON}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.locator('#x').screenshot({ path: path.join(ROOT, 'assets', name)});
    console.log('   assets/' + name);
  }
  await b.close();
})();
