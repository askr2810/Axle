// Gjennomgang for fagpersoner: hash, kø, chk, forslag som ikke endrer innholdet, og at SQL-en stenger tabellene.
const fs = require("fs"), path = require("path"), vm = require("vm"), { spawnSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "gjennomgang.js"), "utf8");
const sql = fs.readFileSync(path.join(ROOT, "supabase", "gjennomgang.sql"), "utf8");
let bad = 0; const fail = m => { bad++; console.log(m); };
const ctx = { LANG: "nb", ENQ: {}, T: (a, b) => a, esc: s => String(s == null ? "" : s) };
ctx.COURSE = code => ctx.COURSES[code] || null;
ctx.topicsOf = (code, u) => (ctx.TOPICS[code] && ctx.TOPICS[code][u]) || [];
ctx.theoryOf = (code, u) => (ctx.THEORY[code] && ctx.THEORY[code][u]) || null;
vm.createContext(ctx);
vm.runInContext(src + "\nthis.api = { rvHash, rvCanon, rvNeeds, rvSort, rvProgress, rvApproved, rvFlagOk, rvActionForKey, rvChkReport, rvCollect, rvFinish, rvSuggestionPayload, rvApplyState, rvMissing, rvPlainField };", ctx);
const api = ctx.api;

const item = (over) => api.rvFinish(Object.assign({
  id: "VG1T|tp|demo", code: "VG1T", unit: 0, kind: "tp", title: "Demo", titleEn: "Demo",
  nb: { theory: "Kraft er masse ganger akselerasjon.", example: "m = 2, a = 3, F = 6.", tip: "" },
  en: { theory: "Force is mass times acceleration.", example: "m = 2, a = 3, F = 6.", tip: "" },
  exercises: [{ i: 0, nb: { p: "Regn ut F.", a: "✓ 6", e: "" }, en: null }],
  chkRaw: ["2+2 ≈ 4"]
}, over));

const a = item(), b = item();
if(a.hash !== b.hash || !/^[0-9a-f]{16}$/.test(a.hash)) fail("hash er ustabil eller har feil lengde: " + a.hash);
const changed = item(); changed.nb = { theory: "Annen tekst.", example: "m = 2.", tip: "" }; changed.hash = api.rvHash(api.rvCanon(changed));
if(changed.hash === a.hash) fail("hash endret seg ikke når teorien endret seg");
const q2 = item(); q2.exercises = [{ i: 0, nb: { p: "Annet spørsmål.", a: "✓ 6", e: "" }, en: null }]; q2.hash = api.rvHash(api.rvCanon(q2));
if(q2.hash === a.hash) fail("hash endret seg ikke når oppgaven endret seg");

const ok = api.rvChkReport(["2+2 ≈ 4", "(2+3)^2 ≈ 25", "1.5*(0^2/2+9.81*2^2/2) ≈ 29.43"]);
if(ok.state !== "ok" || ok.bad) fail("tallsjekk som stemmer ble " + ok.state + " " + ok.bad);
const badChk = api.rvChkReport(["2+2 ≈ 5"]);
if(badChk.state !== "bad" || badChk.bad !== 1) fail("2+2 ≈ 5 skulle avvike");
const info = api.rvChkReport(["(5+sqrt(25-24))/2 ≈ 3", "se figur"]);
if(info.state !== "info") fail("ikke-numerisk chk skulle vises, fikk " + info.state);
if(api.rvChkReport([]).state !== "missing" || api.rvChkReport(null).state !== "missing") fail("tom chk skulle mangle");

const queue = api.rvSort([
  { title: "Beta", flags: 0, mine: "approved", unit: 0, approved: true },
  { title: "Alfa", flags: 1, mine: null, unit: 2, approved: false },
  { title: "Gamma", flags: 5, mine: null, unit: 1, approved: false },
  { title: "Delta", flags: 1, mine: null, unit: 2, approved: false }
]);
if(queue.map(x => x.title).join(",") !== "Gamma,Alfa,Delta,Beta") fail("køen prioriterer feil: " + queue.map(x => x.title).join(","));
const prog = api.rvProgress(queue);
if(prog.x !== 1 || prog.y !== 4) fail("fremdrift " + JSON.stringify(prog));
if(!api.rvNeeds(queue[0]) || api.rvNeeds(queue[3])) fail("ugjennomgått ble feil");

if(!api.rvApproved([{ hash: "aa", verdict: "flagged", at: "2026-01-01", id: 1 }, { hash: "aa", verdict: "approved", at: "2026-01-02", id: 2 }], "aa")) fail("siste godkjenning skulle gjelde");
if(api.rvApproved([{ hash: "aa", verdict: "approved", at: "2026-01-01", id: 1 }, { hash: "aa", verdict: "flagged", at: "2026-01-02", id: 2 }], "aa")) fail("flagg etter godkjenning skulle fjerne merket");
if(api.rvApproved([{ hash: "bb", verdict: "approved", at: "2026-01-02", id: 1 }], "aa")) fail("annen hash skulle ikke være godkjent");
if(api.rvApproved([], "aa")) fail("ingen rader er ikke godkjent");

if(api.rvFlagOk("a") || api.rvFlagOk("  ") || !api.rvFlagOk("ok") || !api.rvFlagOk("x".repeat(500)) || api.rvFlagOk("x".repeat(501))) fail("kommentarlengde");
if(api.rvActionForKey("g") !== "approve" || api.rvActionForKey("F") !== "flag" || api.rvActionForKey("e") !== "edit" || api.rvActionForKey("ArrowRight") !== "next" || api.rvActionForKey("P") !== "prev" || api.rvActionForKey("x")) fail("snarveier");

const sug = item();
const snap = JSON.stringify(sug);
if(api.rvSuggestionPayload(sug, "theory", "  Kraft er masse ganger akselerasjon.  ")) fail("uforandret tekst skulle ikke bli forslag");
const payload = api.rvSuggestionPayload(sug, "theory", "Kraft er masse ganger akselerasjon. Og retning.");
if(!payload || payload.p_field !== "theory" || payload.p_lang !== "nb" || payload.p_topic !== sug.id || payload.p_hash !== sug.hash) fail("forslag-payload: " + JSON.stringify(payload));
if(JSON.stringify(sug) !== snap) fail("forslaget endret emnet");
if(api.rvSuggestionPayload(sug, "q0", "Regn ut kraften.") === null) fail("endret oppgavetekst skulle bli forslag");
if(api.rvPlainField(sug, "q0") !== "Regn ut F.") fail("oppgaveteksten ble endret");
ctx.LANG = "en";
const enp = api.rvSuggestionPayload(sug, "example", "A different example.");
if(!enp || enp.p_lang !== "en") fail("engelsk forslag");
ctx.LANG = "nb";

ctx.COURSES = { VG1T: { code: "VG1T", units: [
  { title: "Krefter", qs: [["Hva er F?", ["6 N", "0"], "F = ma"]] },
  { title: "Tom", qs: [] }
] } };
ctx.TOPICS = { VG1T: [[{ id: "kraft", stub: false, nb: { t: "Kraft", intro: "Masse og akselerasjon.", ex: "2·3 = 6", tip: "Husk enhet." }, en: { t: "Force", intro: "Mass and acceleration.", ex: "2·3 = 6", tip: "" }, chk: ["2*3 ≈ 6"] }], []] };
ctx.THEORY = { VG1T: [null, { nb: "## Forklaring\nTekst\n\n## Eksempel\nRegnestykket\n", en: "" }] };
ctx.ENQ = {};
const items = api.rvCollect("VG1T");
if(items.length !== 2) fail("forventet emne + enhet, fikk " + items.length);
if(items[0].id !== "VG1T|tp|kraft" || items[0].chk.state !== "ok" || !items[0].exercises.length || !items[0].nb.example) fail("emnekort: " + JSON.stringify(items[0] && { id: items[0].id, chk: items[0].chk, ex: items[0].exercises.length }));
if(items[1].id !== "VG1T|un|1" || !/Regnestykket/.test(items[1].nb.example)) fail("enhet uten emne mangler eksempel");
const stubOnly = { VG1T: [[{ id: "x", stub: 1, nb: { t: "Stub" } }]] };
ctx.TOPICS = stubOnly;
const skipped = api.rvCollect("VG1T");
if(skipped.some(it => it.kind === "tp")) fail("stub-emner skal ikke i køen");
ctx.TOPICS = { VG1T: [[{ id: "kraft", nb: { t: "Kraft", intro: "Masse.", ex: "2·3 = 6" }, chk: ["2*3 ≈ 6"] }], []] };
api.rvApplyState(items, [{ topic_id: items[0].id, flags: 3, approved: false, mine: null }]);
if(items[0].flags !== 3 || items[0].mine || items[0].approved) fail("tilstand ble feil lagt på");
if(!api.rvMissing({ status: 404 }) || !api.rvMissing({ code: "PGRST202" }) || api.rvMissing({ status: 500, message: "nei" })) fail("manglende SQL ble ikke gjenkjent");

if(!/Godkjent/.test(src) || !/Flagg/.test(src) || !/Foreslå endring/.test(src) || !/Kontrollert av fagperson/.test(src)) fail("norske knapper eller merke mangler i kildekoden");
if(/content_save|content_edits/.test(src)) fail("klienten skriver til publisert innhold");
if(!/supabase\/gjennomgang\.sql/.test(src)) fail("siden sier ikke hvilken SQL-fil som mangler");

for(const table of ["reviewers", "content_reviews", "content_suggestions"]){
  if(!new RegExp("alter table public\\." + table + " enable row level security").test(sql)) fail(table + " mangler RLS");
  if(!new RegExp("revoke all on public\\." + table + " from public, anon, authenticated").test(sql)) fail(table + " er ikke stengt for anon");
}
if(/create policy/i.test(sql)) fail("SQL har en policy; tilgang skal gå gjennom funksjoner");
if(/force row level security/i.test(sql)) fail("FORCE RLS ville stengt eier-funksjonene");
if(!/grant execute on function public\.review_seal\(text, text\) to anon, authenticated/.test(sql)) fail("merket kan ikke leses uten innlogging");
if(!/flag_comment/.test(sql)) fail("flagg uten kommentar stoppes ikke");
const sugFn = sql.slice(sql.indexOf("function public.review_suggest"), sql.indexOf("function public.review_seal"));
if(/content_edits|content_save/.test(sugFn)) fail("forslag publiseres");
if(/invite_token|create_user/.test(sql)) fail("SQL lager invitasjon eller konto");
if(!/no_user/.test(sql) || !/last_owner/.test(sql)) fail("eier-reglene mangler");
if(!/review_export/.test(sql) || !/review_export_mark/.test(sql)) fail("eksport for eier mangler");

const empty = spawnSync(process.execPath, [path.join(ROOT, "tools", "gjennomgang.mjs")], { env: Object.assign({}, process.env, { AXLE_FEEDBACK_KEY: "" }), encoding: "utf8" });
const out = (empty.stderr || "") + (empty.stdout || "");
if(empty.status !== 2 || !/AXLE_FEEDBACK_KEY/.test(out)) fail("verktøyet uten nøkkel: " + empty.status + " " + out.slice(0, 200));
if(/LIM-INN|eyJ/.test(out)) fail("verktøyet skrev ut en nøkkel");

console.log("gjennomgang: feil " + bad);
if(bad) process.exit(1);
