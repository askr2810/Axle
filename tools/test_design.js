// ============================================================
//  test_design.js – passer på designreglene i docs/DESIGN.md som kan sjekkes automatisk.
//  1) Ingen nye emoji i grensesnittkoden uten et linjeikon i EMO (app.js).
//  2) Ingen nye fargeoverganger (linear-/radial-gradient) i styles.css.
//  3) Ingen nye kort med tykk farget venstrekant (border-left på 3 px eller mer) i styles.css.
//  Det som fantes da testen ble laget, står i tools/design_baseline.json. Testen feiler bare på nye tilfeller.
//  Kjør:  node tools/test_design.js            (sjekk)
//         node tools/test_design.js --update   (godta dagens tilstand som ny grunnlinje – bare når du har vurdert det)
// ============================================================
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), BASE = path.join(__dirname, "design_baseline.json");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");

// Innholdsfiler (oppgaver, teori, emnesider, data) kan ha emoji i fagteksten; de sjekkes ikke her.
const CONTENT = /^(add_|en_static_|top_|drill_|gens|more|subjects|data\.js|maps_data|drive_pics|drive_scenes|drive_signs|figs_|figures|figlib|topics|learn|lessons|timeline|sorts|code_tasks|code_avr|avr|sims)/;
const uiFiles = fs.readdirSync(ROOT).filter(f => f.endsWith(".js") && !CONTENT.test(f)).sort();

// Emoji som har et ikon: nøklene i EMO-blokkene i app.js
const app = read("app.js");
const emoKeys = new Set();
for (const m of app.matchAll(/(?:const EMO = \{|Object\.assign\(EMO, \{)([\s\S]*?)\n\}\);?/g))
  for (const k of m[1].matchAll(/"([^"\x00-\x7F]{1,4})"\s*:/g)) emoKeys.add(k[1].replace(/️/g, ""));

// Ekte emoji (bildetegn). Vanlige tegn som ▶ ★ ✓ × → teller ikke.
const EMOJI = /(?:\p{Extended_Pictographic}️|[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}])/gu;
const emojiNow = {};
for (const f of uiFiles) {
  for (const m of read(f).matchAll(EMOJI)) {
    const e = m[0].replace(/️/g, "");
    if (emoKeys.has(e)) continue;
    (emojiNow[e] ||= new Set()).add(f);
  }
}

const css = read("styles.css");
const count = re => (css.match(re) || []).length;
const now = {
  emoji: Object.fromEntries(Object.entries(emojiNow).map(([e, s]) => [e, [...s].sort()]).sort()),
  gradients: count(/(?:linear|radial|conic)-gradient\(/g),
  leftStripes: count(/border-left:\s*(?:[3-9]|\d{2,})px\s+solid/g)
};

if (process.argv.includes("--update")) {
  fs.writeFileSync(BASE, JSON.stringify(now, null, 1) + "\n");
  console.log("design: ny grunnlinje skrevet til tools/design_baseline.json");
  process.exit(0);
}
const base = fs.existsSync(BASE) ? JSON.parse(fs.readFileSync(BASE, "utf8")) : { emoji: {}, gradients: 0, leftStripes: 0 };
const errs = [];
for (const [e, files] of Object.entries(now.emoji)) {
  const old = new Set(base.emoji[e] || []);
  const fresh = files.filter(f => !old.has(f));
  if (fresh.length) errs.push(`Ny emoji ${e} i ${fresh.join(", ")}. Bruk et linjeikon (I.… eller ico()), eller legg ${e} til i EMO i app.js med et ikon i samme stil. Se docs/DESIGN.md, del 1.`);
}
if (now.gradients > base.gradients) errs.push(`Flere fargeoverganger i styles.css (${base.gradients} → ${now.gradients}). Bruk flate farger fra tokens. Se docs/DESIGN.md, del 3.`);
if (now.leftStripes > base.leftStripes) errs.push(`Flere kort med tykk farget venstrekant i styles.css (${base.leftStripes} → ${now.leftStripes}). Gi hele kanten en svak farge og la ikonet bære betydningen. Se docs/DESIGN.md, del 3.`);

const nEmoji = Object.keys(now.emoji).length;
console.log(`design: ${uiFiles.length} filer, ${emoKeys.size} emoji med ikon, ${nEmoji} eldre uten ikon, ${now.gradients} gradienter, ${now.leftStripes} venstrestriper, feil: ${errs.length}`);
if (errs.length) { errs.forEach(e => console.log("  ✗ " + e)); process.exit(1); }
