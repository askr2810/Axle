// Lister flagg og endringsforslag fra gjennomgang (supabase/gjennomgang.sql).
// Forslag publiseres ikke av seg selv. Nøkkelen ligger bare i AXLE_FEEDBACK_KEY (aldri i repoet).
//   node tools/gjennomgang.mjs                         → åpne flagg og forslag som tekst
//   node tools/gjennomgang.mjs --json                  → rå JSON
//   node tools/gjennomgang.mjs --all                   → også behandlede
//   node tools/gjennomgang.mjs --json --all
//   node tools/gjennomgang.mjs --mark flag 1,2         → marker flagg som behandlet
//   node tools/gjennomgang.mjs --mark suggestion 3     → marker forslag som behandlet
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfg = fs.readFileSync(path.join(ROOT, "config.js"), "utf8");
const pick = k => (cfg.match(new RegExp(k + `\\s*:\\s*"([^"]*)"`)) || [])[1] || "";
const url = process.env.AXLE_SUPABASE_URL || pick("supabaseUrl"), anon = process.env.AXLE_SUPABASE_KEY || pick("supabaseKey"), key = process.env.AXLE_FEEDBACK_KEY;
if(!url || !anon){ console.error("Fant ikke supabaseUrl/supabaseKey i config.js."); process.exit(2); }
if(!key){ console.error("Mangler AXLE_FEEDBACK_KEY (se kommentaren øverst i supabase/gjennomgang.sql)."); process.exit(2); }
const rpc = async (name, body) => {
  const r = await fetch(url + "/rest/v1/rpc/" + name, { method: "POST", headers: { apikey: anon, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => null); if(!r.ok) throw new Error(`${name}: ${r.status} ${JSON.stringify(j)}`); return j;
};
const args = process.argv.slice(2);
if(args[0] === "--mark"){
  const kind = args[1] === "suggestion" ? "suggestion" : args[1] === "flag" ? "flag" : "";
  if(!kind){ console.error("Bruk: --mark flag 1,2   eller   --mark suggestion 3"); process.exit(2); }
  const ids = String(args[2] || "").split(",").map(Number).filter(n => Number.isInteger(n) && n > 0);
  if(!ids.length){ console.error("Oppgi minst ett id."); process.exit(2); }
  console.log("Markert:", await rpc("review_export_mark", { p_key: key, p_kind: kind, p_ids: ids }));
} else {
  const data = await rpc("review_export", { p_key: key, p_all: args.includes("--all") });
  if(args.includes("--json")) console.log(JSON.stringify(data, null, 2));
  else {
    const flags = data.flags || [], suggestions = data.suggestions || [];
    console.log(`${flags.length} flagg, ${suggestions.length} forslag${args.includes("--all") ? "" : " (åpne)"}\n`);
    for(const f of flags) console.log([`#${f.id} · flagg · ${String(f.created_at || "").slice(0, 16)} · ${f.topic_id || ""}${f.handled ? " · behandlet" : ""}`,
      f.reviewer_name && "  Fagperson: " + f.reviewer_name, f.content_hash && "  Hash: " + f.content_hash, f.comment && "  Kommentar: " + f.comment].filter(Boolean).join("\n") + "\n");
    for(const s of suggestions) console.log([`#${s.id} · forslag · ${s.field || ""} · ${s.lang || ""} · ${String(s.created_at || "").slice(0, 16)} · ${s.topic_id || ""}${s.status && s.status !== "pending" ? " · " + s.status : ""}`,
      s.reviewer_name && "  Fagperson: " + s.reviewer_name, s.content_hash && "  Hash: " + s.content_hash,
      s.before_text && "  Før: " + String(s.before_text).slice(0, 240), s.after_text && "  Etter: " + String(s.after_text).slice(0, 240)].filter(Boolean).join("\n") + "\n");
  }
}
