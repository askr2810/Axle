// Edge Function «elever»: lager elevprofiler uten e-post, gir nytt engangspassord og lar elever bli med med klassekode.
// Oppsett: se supabase/ELEVER.md. Krever at supabase/elever.sql er kjørt. Bruker SUPABASE_URL, SUPABASE_ANON_KEY og
// SUPABASE_SERVICE_ROLE_KEY, som Supabase setter automatisk for Edge Functions. Ingen andre nøkler.
//
// Handlinger (POST JSON { action, ... }):
//   create  (lærer, innlogget)  { class_id, students: [{ name, username? }] }  → [{ name, login, password }]  (1–50 per kall)
//   reset   (lærer, innlogget)  { user_id }                                   → { login, password }
//   join    (uten innlogging)   { code, username, name, password }            → { login }
// Passord vises bare i svaret til læreren (eller velges av eleven) og lagres bare som hash i Supabase Auth. De logges aldri.
// Elevens interne adresse er <brukernavn>.<klassetagg>@elev.axle.no (ingen e-post sendes dit; e-posten bekreftes direkte).
// Skrevet uten typeannotasjoner, så tools/test_elever_fn.mjs kan kjøre den i Node med en etterlignet Supabase.

export const ELEV_DOMAIN = "elev.axle.no";
const WORDS = ["sol", "bok", "hav", "fjell", "skog", "elg", "rev", "ugle", "bjørn", "laks", "kake", "eple", "pære", "plomme", "melk", "ost", "brød", "snø", "regn", "vind",
  "stein", "sand", "strand", "båt", "tog", "buss", "sykkel", "ball", "drage", "stjerne", "måne", "sky", "lyn", "torden", "blomst", "tre", "gress", "fugl", "fisk", "katt",
  "hund", "hest", "ku", "sau", "geit", "gris", "and", "gås", "mus", "rotte", "frosk", "ørn", "hauk", "kråke", "måke", "sel", "hval", "krabbe", "reke", "tang", "is",
  "vann", "elv", "bekk", "sjø", "øy", "nes", "dal", "topp", "hytte", "hus", "dør", "vindu", "lampe", "stol", "bord", "seng", "pute", "teppe", "lue", "vott", "sko",
  "jakke", "genser", "sekk", "penn", "blyant", "papir", "kart", "kompass", "nøkkel", "lås", "klokke", "fløyte", "tromme", "gitar", "pianist", "maler", "baker", "smed", "bonde"]
  .map(w => w.replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a"));

// engangspassord som et barn kan skrive: tre ord og to sifre, f.eks. «hav-ugle-elg-47» (ca. 26 bit; innlogging er rate-begrenset hos Supabase)
export function makePassword(rand){
  const r = rand || (n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; });
  return [WORDS[r(WORDS.length)], WORDS[r(WORDS.length)], WORDS[r(WORDS.length)], String(10 + r(90))].join("-");
}
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const ERR = /too_many_students|too_many_classes|student_account|not_found|bad_code|bad_username|bad_name|username_taken/;

export async function handle(req, env, fetchFn){
  const f = fetchFn || fetch;
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json(405, { error: "method" });
  if (!env || !env.URL || !env.SERVICE || !env.ANON) return json(500, { error: "config" });
  let body; try { body = await req.json(); } catch (e) { return json(400, { error: "bad_json" }); }
  const svc = (p, opts) => f(env.URL + p, { ...opts, headers: { apikey: env.SERVICE, Authorization: `Bearer ${env.SERVICE}`, "Content-Type": "application/json", ...(opts && opts.headers || {}) } });
  const rpc = async (name, args) => { const r = await svc(`/rest/v1/rpc/${name}`, { method: "POST", body: JSON.stringify(args) }); const t = await r.text(); let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {}
    if (!r.ok) { const m = String((j && (j.message || j.msg)) || t); const k = (m.match(ERR) || [])[0]; throw Object.assign(new Error(k || "db"), { code: k || (/does not exist|schema cache/i.test(m) ? "not_installed" : "db") }); }
    return j; };
  const createUser = async (login, password) => { const r = await svc("/auth/v1/admin/users", { method: "POST", body: JSON.stringify({ email: `${login}@${ELEV_DOMAIN}`, password, email_confirm: true, user_metadata: { elev: true } }) });
    const j = await r.json().catch(() => ({})); if (!r.ok || !(j.id || (j.user && j.user.id))) throw Object.assign(new Error("auth"), { code: "auth" }); return j.id || j.user.id; };
  // læreren: kontrolleres med lærerens eget innloggingstoken; elevprofiler kan ikke bruke lærerhandlingene
  const teacher = async () => { const tok = String(req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!tok || tok === env.ANON) return null;
    const r = await f(env.URL + "/auth/v1/user", { headers: { apikey: env.ANON, Authorization: `Bearer ${tok}` } }); if (!r.ok) return null;
    const u = await r.json().catch(() => null); if (!u || !u.id || String(u.email || "").endsWith("@" + ELEV_DOMAIN)) return null; return u.id; };
  try {
    if (body.action === "create") {
      const me = await teacher(); if (!me) return json(401, { error: "not_teacher" });
      const list = Array.isArray(body.students) ? body.students.slice(0, 51) : [];
      if (!body.class_id || !list.length || list.length > 50) return json(400, { error: "bad_request" });
      const out = [];
      for (const s of list) {
        const name = String(s && s.name || "").trim().slice(0, 40); if (!name) { out.push({ name, error: "bad_name" }); continue; }
        let r; try { r = await rpc("elev_reserve", { p_teacher: me, p_class: body.class_id, p_base: String(s.username || ""), p_display: name }); }
        catch (e) { out.push({ name, error: e.code }); if (e.code === "too_many_students" || e.code === "not_found" || e.code === "not_installed") break; continue; }
        const password = makePassword();
        try { const uid = await createUser(r.login, password); await rpc("elev_bind", { p_row: r.row, p_user: uid }); out.push({ name, login: r.login, password, uid }); }
        catch (e) { await rpc("elev_unreserve", { p_row: r.row }).catch(() => {}); out.push({ name, error: "auth" }); }
      }
      return json(200, { students: out });
    }
    if (body.action === "reset") {
      const me = await teacher(); if (!me) return json(401, { error: "not_teacher" });
      if (!body.user_id || !(await rpc("elev_owned", { p_teacher: me, p_user: body.user_id }))) return json(404, { error: "not_found" });
      const password = makePassword();
      const r = await svc(`/auth/v1/admin/users/${encodeURIComponent(body.user_id)}`, { method: "PUT", body: JSON.stringify({ password }) });
      if (!r.ok) return json(502, { error: "auth" });
      const u = await r.json().catch(() => ({})), login = String(u.email || "").replace("@" + ELEV_DOMAIN, "");
      return json(200, { login, password });
    }
    if (body.action === "join") {
      const pw = String(body.password || ""), uname = String(body.username || "").trim().toLowerCase();
      if (pw.length < 8 || pw.length > 72 || pw.toLowerCase().includes(uname)) return json(400, { error: "weak_password" });
      const r = await rpc("elev_reserve_code", { p_code: String(body.code || ""), p_username: uname, p_display: String(body.name || "").trim().slice(0, 40) });
      try { const uid = await createUser(r.login, pw); await rpc("elev_bind", { p_row: r.row, p_user: uid }); }
      catch (e) { await rpc("elev_unreserve", { p_row: r.row }).catch(() => {}); return json(502, { error: "auth" }); }
      return json(200, { login: r.login });
    }
    return json(400, { error: "bad_action" });
  } catch (e) {
    const code = (e && e.code) || "server";
    return json(code === "not_installed" ? 501 : ERR.test(code) ? 400 : 500, { error: code });
  }
}

if (typeof Deno !== "undefined") Deno.serve(req => handle(req, { URL: Deno.env.get("SUPABASE_URL"), SERVICE: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), ANON: Deno.env.get("SUPABASE_ANON_KEY") }));
