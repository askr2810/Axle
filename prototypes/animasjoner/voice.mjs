// Lager fortellerstemme for en animasjonsprototype med ElevenLabs (valgfritt; prototypen virker med bare teksting).
// Bruk (fra repo-mappa):
//   node prototypes/animasjoner/voice.mjs derivasjon --dry-run          viser tekstene og antall tegn, sender ingenting
//   ELEVENLABS_API_KEY=… node prototypes/animasjoner/voice.mjs derivasjon [--lang nb|en] [--force] [--only l03,l04]
// Miljøvariabler: ELEVENLABS_API_KEY (påkrevd, legges aldri i repoet og skrives aldri ut),
//   ELEVENLABS_VOICE_ID (stemmen; velg en norsk stemme i ElevenLabs' stemmebibliotek), ELEVENLABS_MODEL (standard eleven_v4).
// Resultat: prototypes/animasjoner/<id>/audio/<lang>/<replikk>.mp3 og audio/manifest.json (varighet per replikk).
// audio/ er i .gitignore. Eksisterende filer lages ikke på nytt uten --force (sparer kreditter).
// Manustekst sendes til ElevenLabs. Ingen brukerdata.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2), opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const id = args.find(a => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--lang" && args[args.indexOf(a) - 1] !== "--only");
if (!id || !/^[a-z0-9-]+$/.test(id) || !fs.existsSync(path.join(DIR, id, "anim.js"))) {
  console.error("Bruk: node prototypes/animasjoner/voice.mjs <id> [--lang nb|en] [--dry-run] [--force] [--only l01,l02]"); process.exit(1);
}
const lang = opt("--lang") || "nb", dry = args.includes("--dry-run"), force = args.includes("--force");
const only = (opt("--only") || "").split(",").filter(Boolean);
if (!["nb", "en"].includes(lang)) { console.error("--lang må være nb eller en"); process.exit(1); }
const A = createRequire(import.meta.url)(path.join(DIR, id, "anim.js"));
const li = lang === "en" ? 1 : 0;
// Uttale: replikken kan ha say: [nb, en] når TTS-teksten må skrives annerledes enn tekstingen.
const say = l => (l.say ? l.say[li] : l.vo[li]);
const lines = A.lines.filter(l => !only.length || only.includes(l.id));
const chars = lines.reduce((n, l) => n + say(l).length, 0);
console.log(`${A.title[li]} (${lang}): ${lines.length} replikker, ${chars} tegn.`);
if (dry) { lines.forEach(l => console.log(`  ${l.id}  ${say(l)}`)); process.exit(0); }

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error("ELEVENLABS_API_KEY er ikke satt. Prototypen virker uten lyd (bare teksting)."); process.exit(1); }
// Standardstemmen er en av ElevenLabs' ferdige stemmer. Den er ikke valgt for norsk; sett ELEVENLABS_VOICE_ID til en norsk stemme.
const VOICE = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_v4";
if (!process.env.ELEVENLABS_VOICE_ID) console.warn("Merk: ELEVENLABS_VOICE_ID er ikke satt; bruker en standard engelsk stemme.");
const FORMAT = "mp3_44100_128", BYTES_PER_S = 128000 / 8; // konstant bitrate → varighet ≈ bytes / 16 000

const outDir = path.join(DIR, id, "audio", lang);
fs.mkdirSync(outDir, { recursive: true });
const manPath = path.join(DIR, id, "audio", "manifest.json");
const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, "utf8")) : {};
man[lang] = man[lang] || {};

for (const l of lines) {
  const file = path.join(outDir, l.id + ".mp3"), k = A.lines.indexOf(l);
  if (fs.existsSync(file) && !force && man[lang][l.id]) { console.log(`  ${l.id}: finnes, hoppet over`); continue; }
  const body = { text: say(l), model_id: MODEL, language_code: lang === "en" ? "en" : "no", seed: 1,
    previous_text: k > 0 ? say(A.lines[k - 1]) : undefined, next_text: k < A.lines.length - 1 ? say(A.lines[k + 1]) : undefined };
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE)}?output_format=${FORMAT}`, {
    method: "POST", headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" }, body: JSON.stringify(body) });
  if (!r.ok) { console.error(`  ${l.id}: feil ${r.status} ${(await r.text()).slice(0, 300)}`); process.exit(1); }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(file, buf);
  const dur = Math.round(buf.length / BYTES_PER_S * 100) / 100;
  man[lang][l.id] = { file: `${lang}/${l.id}.mp3`, dur, chars: say(l).length };
  const rate = say(l).split(/\s+/).length / dur;
  console.log(`  ${l.id}: ${dur} s (planlagt ${l.d} s, ${rate.toFixed(1)} ord/s)`);
  fs.writeFileSync(manPath, JSON.stringify(man, null, 1));
}
man[lang]._meta = { voice: VOICE, model: MODEL, made: new Date().toISOString().slice(0, 10) };
fs.writeFileSync(manPath, JSON.stringify(man, null, 1));
console.log(`Ferdig: ${path.relative(process.cwd(), manPath)}. Start en lokal server (se README.md) og slå på «Lyd».`);
