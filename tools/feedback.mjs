// Henter tilbakemeldinger fra Axle (supabase/tilbakemelding.sql) slik at Claude kan lese og vurdere dem.
// Nøkkelen ligger bare i miljøvariabelen AXLE_FEEDBACK_KEY (aldri i repoet eller appen).
//   node tools/feedback.mjs              → åpne tilbakemeldinger som tekst
//   node tools/feedback.mjs --all        → også behandlede
//   node tools/feedback.mjs --json       → rå JSON
//   node tools/feedback.mjs --mark 12,13 "Fikset fasit i VG1T 4.2"   → marker som behandlet med merknad
//   node tools/feedback.mjs --innsikt [dager]   → bruksstatistikk (supabase/innsikt.sql) + åpne tilbakemeldinger
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfg = fs.readFileSync(path.join(ROOT, "config.js"), "utf8");
const pick = k => (cfg.match(new RegExp(k + `\\s*:\\s*"([^"]*)"`)) || [])[1] || "";
const url = process.env.AXLE_SUPABASE_URL || pick("supabaseUrl"), anon = process.env.AXLE_SUPABASE_KEY || pick("supabaseKey"), key = process.env.AXLE_FEEDBACK_KEY;
if(!url || !anon){ console.error("Fant ikke supabaseUrl/supabaseKey i config.js."); process.exit(2); }
if(!key){ console.error("Mangler AXLE_FEEDBACK_KEY (se kommentaren nederst i supabase/tilbakemelding.sql)."); process.exit(2); }
const rpc = async (name, body) => {
  const r = await fetch(url + "/rest/v1/rpc/" + name, { method: "POST", headers: { apikey: anon, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => null); if(!r.ok) throw new Error(`${name}: ${r.status} ${JSON.stringify(j)}`); return j;
};
const args = process.argv.slice(2);
if(args[0] === "--innsikt"){
  const s = await rpc("insights_export", { p_key: key, p_days: +args[1] || 7 });
  if(args.includes("--json")){ console.log(JSON.stringify(s, null, 2)); process.exit(0); }
  const L = (h, rows, f) => rows && rows.length ? `\n${h}:\n` + rows.map(r => "  " + f(r)).join("\n") : "";
  console.log(`Innsikt, siste ${s.days} dager: ${s.devices} enheter, ${s.users} innloggede, ${s.signups} nye kontoer, ${s.returning?.came_back}/${s.returning?.new} nye kom tilbake, ${s.push_users} med varsler, ${s.feedback_open} åpne tilbakemeldinger` +
    L("Per dag (enheter/innloggede/økter)", s.daily, r => `${r.day}: ${r.devices}/${r.users}/${r.lessons}`) +
    L("Fag (økter, enheter, oppgaver, % riktig)", s.courses, r => `${r.course}: ${r.sessions}, ${r.devices}, ${r.questions}, ${r.accuracy ?? "–"} %`) +
    L("Vanskeligste enheter", s.hard_units, r => `${r.course}:${r.unit}: ${r.accuracy ?? "–"} % (${r.sessions} økter)`) +
    L("Teori lest", s.theory, r => `${r.course}: ${r.opens} (${r.devices} enheter)`) +
    L("Sider", s.screens, r => `${r.screen}: ${r.views} (${r.devices} enheter)`) +
    L("Funksjoner", s.features, r => `${r.feature}: ${r.n} (${r.devices} enheter)`) +
    `\nPlattform: ${JSON.stringify(s.platforms)} · Språk: ${JSON.stringify(s.langs)}\nTilbakemeldinger: ${(s.feedback || []).length} åpne (kjør uten flagg for å lese dem)`);
} else if(args[0] === "--mark"){
  const ids = String(args[1] || "").split(",").map(Number).filter(Number.isFinite);
  console.log("Markert:", await rpc("feedback_export_mark", { p_key: key, p_ids: ids, p_note: args[2] || null }));
} else {
  const rows = await rpc("feedback_export", { p_key: key, p_all: args.includes("--all") });
  if(args.includes("--json")) console.log(JSON.stringify(rows, null, 2));
  else {
    console.log(`${rows.length} tilbakemeldinger${args.includes("--all") ? "" : " (åpne)"}\n`);
    for(const f of rows) console.log([`#${f.id} · ${f.category || f.kind} · ${String(f.at).slice(0, 16)} · ${f.platform || ""} ${f.version || ""} · ${f.lang || ""}${f.handled ? " · behandlet" : ""}`,
      f.message && "  Melding: " + f.message, f.course && `  Fag: ${f.course}${f.unit ? " enhet " + f.unit : ""}${f.qid ? " oppgave " + f.qid : ""}`,
      f.prompt && "  Oppgave: " + f.prompt, f.correct && "  Fasit: " + f.correct, f.answer && "  Svar: " + f.answer, f.note && "  Merknad: " + f.note].filter(Boolean).join("\n") + "\n");
  }
}
