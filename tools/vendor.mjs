// Kopierer skriftene (fra npm-pakkene @fontsource/*) inn i vendor/fonts slik at appen virker offline.
// Kjøres automatisk av «npm run build». Mangler pakkene, brukes systemskrifter (appen virker likevel).
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "vendor", "fonts"); fs.mkdirSync(OUT, { recursive: true });
const wanted = [ ["Figtree", "figtree", [400, 500, 600, 700]], ["Bricolage Grotesque", "bricolage-grotesque", [600, 800]], ["JetBrains Mono", "jetbrains-mono", [500]] ];
let css = "/* generert av tools/vendor.mjs */\n", n = 0;
for (const [family, pkg, weights] of wanted) {
  const dir = path.join(ROOT, "node_modules", "@fontsource", pkg, "files");
  if (!fs.existsSync(dir)) { console.warn(`  (mangler @fontsource/${pkg} – kjør npm install)`); continue; }
  for (const w of weights) {
    for (const subset of ["latin", "latin-ext"]) {
      const f = `${pkg}-${subset}-${w}-normal.woff2`, src = path.join(dir, f);
      if (!fs.existsSync(src)) continue;
      fs.copyFileSync(src, path.join(OUT, f)); n++;
      const range = subset === "latin" ? "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
        : "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
      css += `@font-face{font-family:"${family}";font-style:normal;font-weight:${w};font-display:swap;src:url(fonts/${f}) format("woff2");unicode-range:${range}}\n`;
    }
  }
}
fs.writeFileSync(path.join(ROOT, "vendor", "fonts.css"), css);
console.log(`  skrifter: ${n} filer kopiert til vendor/fonts`);
