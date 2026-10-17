// Lager sammenligningssiden for redesign-kopien: før og etter side om side for hver skjerm, med endringslista
// fra REDESIGN.md og lenker til begge versjonene. Se docs/REDESIGN.md.
// Bruk: node tools/redesign_report.js --for local/redesign/for --etter local/redesign/etter --ut release/www/_redesign
//        [--dagens http://192.168.1.5:8776/] [--kopi http://192.168.1.5:8777/]
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const BEFORE = path.resolve(arg('for', 'local/redesign/for')), AFTER = path.resolve(arg('etter', 'local/redesign/etter'));
const OUT = path.resolve(arg('ut', 'release/www/_redesign')), NOW = arg('dagens', ''), NEW = arg('kopi', '');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const readMan = d => { try{ return JSON.parse(fs.readFileSync(path.join(d, 'manifest.json'), 'utf8')); }catch(e){ return null; } };
const mb = readMan(BEFORE), ma = readMan(AFTER), man = ma || mb;
if(!man){ console.error('Fant ingen skjermbilder. Kjør tools/redesign_shots.js først.'); process.exit(1); }

fs.mkdirSync(path.join(OUT, 'for'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'etter'), { recursive: true });
const copy = (dir, sub) => { if(fs.existsSync(dir)) for(const f of fs.readdirSync(dir)) if(f.endsWith('.png')) fs.copyFileSync(path.join(dir, f), path.join(OUT, sub, f)); };
copy(BEFORE, 'for'); copy(AFTER, 'etter');

// Enkel markdown → HTML for REDESIGN.md (overskrifter, punkter, avsnitt, **fet**, `kode`)
function md(src){
  const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  let html = '', list = false;
  for(const line of src.split('\n')){
    const m = line.match(/^(#{1,4})\s+(.*)/), li = line.match(/^\s*[-*]\s+(.*)/);
    if(!li && list){ html += '</ul>'; list = false; }
    if(m) html += `<h${m[1].length + 1}>${inl(m[2])}</h${m[1].length + 1}>`;
    else if(li){ if(!list){ html += '<ul>'; list = true; } html += `<li>${inl(li[1])}</li>`; }
    else if(line.trim()) html += `<p>${inl(line)}</p>`;
  }
  return html + (list ? '</ul>' : '');
}
const notesFile = path.resolve('REDESIGN.md'), notes = fs.existsSync(notesFile) ? md(fs.readFileSync(notesFile, 'utf8')) : '<p>REDESIGN.md finnes ikke ennå.</p>';
const has = (sub, f) => fs.existsSync(path.join(OUT, sub, f));
const img = (sub, f, alt) => has(sub, f) ? `<a href="${sub}/${f}" target="_blank"><img loading="lazy" src="${sub}/${f}" alt="${esc(alt)}"></a>` : `<div class="none">Ingen bilde</div>`;

const rows = man.screens.map(s => `<section class="scr"><h3>${esc(s.name)}</h3>${man.sizes.map(z => `
  <div class="pair" data-size="${z}"><figure><figcaption>Før</figcaption>${img('for', `${s.id}__${z}.png`, s.name + ' før')}</figure>
  <figure><figcaption>Etter</figcaption>${img('etter', `${s.id}__${z}.png`, s.name + ' etter')}</figure></div>`).join('')}</section>`).join('');
const errs = ma && Object.keys(ma.errors || {}).length ? `<p class="warn">Feil i appen under skjermbildene: ${esc(Object.keys(ma.errors).join(', '))} (se local/redesign/etter/manifest.json).</p>` : '';

fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Axle redesign – før og etter</title><style>
:root{--paper:#EEF2EC;--card:#fff;--ink:#16202A;--muted:#5A6772;--line:#D5DDD3;--accent:#2B59C3;--accent-soft:#DCE5F8;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--paper:#0F151B;--card:#18212A;--ink:#E6ECEF;--muted:#94A2AD;--line:#27323C;--accent:#7AA0F5;--accent-soft:#1D2A44}}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 system-ui,sans-serif}
.wrap{max-width:1400px;margin:0 auto;padding:20px 16px 60px}
h1{font-size:28px;margin:0 0 6px}h2{margin:28px 0 10px}h3{margin:0 0 10px;font-size:18px}
.links{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}.links a{background:var(--accent);color:#fff;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:12px}
.links a.ghost{background:var(--card);color:var(--accent);border:2px solid var(--line)}
.tabs{position:sticky;top:0;z-index:2;background:var(--paper);padding:10px 0;display:flex;gap:8px;flex-wrap:wrap;border-bottom:2px solid var(--line)}
.tabs button{font:inherit;font-weight:700;border:2px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:8px 14px;cursor:pointer}
.tabs button.on{border-color:var(--accent);background:var(--accent-soft);color:var(--accent)}
.scr{background:var(--card);border:2px solid var(--line);border-radius:18px;padding:16px;margin:16px 0}
.pair{display:none;grid-template-columns:1fr 1fr;gap:16px}.pair.on{display:grid}
figure{margin:0}figcaption{font-weight:700;color:var(--muted);margin-bottom:6px}
img{width:100%;height:auto;border:2px solid var(--line);border-radius:12px;display:block}
.pair[data-size^=mobil] img{max-width:375px}
.none{color:var(--muted);border:2px dashed var(--line);border-radius:12px;padding:40px;text-align:center}
.notes{background:var(--card);border:2px solid var(--line);border-radius:18px;padding:8px 20px}
code{background:var(--accent-soft);padding:1px 5px;border-radius:5px}.warn{color:#D23F3A;font-weight:700}
</style></head><body><div class="wrap">
<h1>Axle redesign – før og etter</h1><p>Venstre: slik Axle er nå. Høyre: kopien. Trykk på et bilde for full størrelse.</p>
<div class="links">${NEW ? `<a href="${esc(NEW)}" target="_blank">Åpne kopien</a>` : ''}${NOW ? `<a class="ghost" href="${esc(NOW)}" target="_blank">Åpne dagens Axle</a>` : ''}<a class="ghost" href="#endringer">Endringslista</a></div>
${errs}
<div class="tabs" role="tablist">${man.sizes.map((z, i) => `<button data-z="${z}" class="${i ? '' : 'on'}">${esc(z.replace('-', ' ').replace('mork', 'mørk'))}</button>`).join('')}</div>
${rows}
<h2 id="endringer">Endringer (REDESIGN.md)</h2><div class="notes">${notes}</div>
</div><script>
const show = z => { document.querySelectorAll('.pair').forEach(p => p.classList.toggle('on', p.dataset.size === z)); document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.z === z)); };
document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => show(b.dataset.z)); show(${JSON.stringify(man.sizes[0])});
</script></body></html>`);
console.log('redesign-rapport: ' + path.join(OUT, 'index.html'));
