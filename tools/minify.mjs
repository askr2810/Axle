// Gjør nettpakken kompakt og vanskelig å lese (minifisering med forkortede navn).
// Kjøres automatisk av «npm run build» etter build.py. Kildefilene endres ikke.
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
import { minify } from "terser";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "release", "www", "app.bundle.js");
const BANNER = "/*! © Axle – alle rettigheter forbeholdt / all rights reserved. Kopiering, gjenbruk og videredistribusjon er ikke tillatt. https://axle.no */";
const src = fs.readFileSync(FILE, "utf8");
const out = await minify(src, {
  ecma: 2020, toplevel: true,
  compress: { passes: 2 },
  mangle: { toplevel: true },
  format: { comments: false, preamble: BANNER }
});
fs.writeFileSync(FILE, out.code);
console.log(`  minifisert: ${src.length} → ${out.code.length} bytes`);
