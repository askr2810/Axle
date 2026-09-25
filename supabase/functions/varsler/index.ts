// @ts-nocheck
// Axle: daglige påminnelser (web push), i stil med Duolingo.
// Kalles hvert kvarter av pg_cron (se supabase/varsler.sql). For hver nettleser som har slått på påminnelser:
//  - Hovedpåminnelse på valgt klokkeslett hvis du ikke har øvd i dag, eller har øvd men ikke tatt dagens utfordring.
//  - «Siste sjanse» kl. 22 hvis rekka di står i fare (du har en rekke, men har ikke øvd i dag).
// Maks én av hver per dag. Med { "test": true } og innloggingstoken sendes et testvarsel til deg selv.
// Hemmeligheter (Edge Functions → Secrets): VAPID_PUBLIC_KEY og VAPID_PRIVATE_KEY.
import webpushMod from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";
import { createECDH } from "node:crypto";

// Alt settes opp inne i forespørselen, så en feil gir et forklarende svar i stedet for at funksjonen ikke starter.
let webpush = null, sb = null;
function serviceKey() {
  const legacy = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "").trim();
  if (legacy) return legacy;
  try { const j = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}"); return String(j.default ?? Object.values(j)[0] ?? ""); } catch { return ""; } // nye API-nøkler (sb_secret_…)
}
async function setup() {
  if (!webpush) webpush = webpushMod;
  if (!sb) {
    const url = Deno.env.get("SUPABASE_URL") ?? "", key = serviceKey();
    if (!url || !key) throw new Error("missing_service_key: fant verken SUPABASE_SERVICE_ROLE_KEY eller SUPABASE_SECRET_KEYS");
    sb = createClient(url, key, { auth: { persistSession: false } });
  }
}
// VAPID-nøklene settes ved første kall, så en manglende/feil nøkkel gir en forklarende feilmelding.
let vapidErr = null, vapidDone = false;
async function initVapid() {
  if (vapidDone) return vapidErr;
  vapidDone = true;
  const pub = (Deno.env.get("VAPID_PUBLIC_KEY") ?? "").trim(), priv = (Deno.env.get("VAPID_PRIVATE_KEY") ?? "").trim();
  if (!pub || !priv) return (vapidErr = "missing_vapid: legg inn VAPID_PUBLIC_KEY og VAPID_PRIVATE_KEY under Edge Functions → Secrets");
  if (priv.length !== 43) return (vapidErr = `bad_vapid: VAPID_PRIVATE_KEY har ${priv.length} tegn, skal ha 43`);
  try {
    // Sjekk at den private nøkkelen hører til den offentlige.
    const b64u = (x) => Uint8Array.from(atob(x.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - x.length % 4) % 4)), (c) => c.charCodeAt(0));
    const ec = createECDH("prime256v1"); ec.setPrivateKey(b64u(priv));
    const got = btoa(String.fromCharCode(...ec.getPublicKey())).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    if (got !== pub) return (vapidErr = "bad_vapid: VAPID_PRIVATE_KEY passer ikke med VAPID_PUBLIC_KEY");
  } catch { /* sjekken er bare en hjelp */ }
  try { webpush.setVapidDetails("https://axle.no", pub, priv); } catch (e) { vapidErr = "bad_vapid: " + (e && e.message || e); }
  return vapidErr;
}

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const LATE = "22:00";
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

// Lokal dato og klokkeslett i brukerens tidssone.
function localNow(tz, now) {
  let p;
  try { p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now); }
  catch { p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Oslo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now); }
  const g = (t) => p.find((x) => x.type === t)?.value ?? "00";
  const day = `${g("year")}-${g("month")}-${g("day")}`, d = new Date(day + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return { day, yesterday: d.toISOString().slice(0, 10), hm: `${g("hour")}:${g("minute")}` };
}

const TXT = {
  nb: {
    streak: [
      ["🔥 {n} dager på rad!", "Ikke la rekka ryke i dag. Dagens utfordring tar bare et par minutter."],
      ["Rekka di trenger deg 😬", "{n} dager på rad står på spill. Én rask runde holder."],
      ["{teacher} her 👋", "Jeg har laget dagens utfordring til deg. Rekka er på {n} dager, la oss holde den i live!"],
      ["Psst … {n} dager 🔥", "Du har bygd opp en fin rekke. {q} oppgaver, så er dagen reddet."]
    ],
    fresh: [
      ["Dagens utfordring er klar ⚡", "{q} oppgaver som passer dagsmålet ditt. Start en ny rekke i dag!"],
      ["Fem minutter til ingeniørhjernen? 🧠", "Dagens utfordring venter. Litt hver dag slår mye én gang i blant."],
      ["{teacher} savner deg 👀", "Det er en stund siden sist. Ta dagens utfordring og kom i gang igjen."]
    ],
    challenge: [
      ["Nesten i mål ⚡", "Du har øvd i dag. Ta dagens utfordring for full pott på dagsmålet!"],
      ["Én ting igjen i dag", "Dagens utfordring står fortsatt ugjort. {q} oppgaver, så er du ferdig."]
    ],
    late: [
      ["Siste sjanse! 🔥", "Rekka på {n} dager ryker ved midnatt. Én kort runde redder den."],
      ["{n} dager står på spill ⏰", "Det er ikke for sent. Ta en rask runde før midnatt."]
    ],
    test: ["Varsler er på 🎉", "Slik ser påminnelsene fra Axle ut. Vi sier fra når rekka di står i fare."]
  },
  en: {
    streak: [
      ["🔥 {n} days in a row!", "Don't let your streak break today. The daily challenge only takes a couple of minutes."],
      ["Your streak needs you 😬", "{n} days in a row are at stake. One quick round is enough."],
      ["{teacher} here 👋", "I've made today's challenge for you. Your streak is at {n} days, let's keep it alive!"],
      ["Psst … {n} days 🔥", "You've built a nice streak. {q} questions and the day is saved."]
    ],
    fresh: [
      ["Today's challenge is ready ⚡", "{q} questions that fit your daily goal. Start a new streak today!"],
      ["Five minutes for your engineering brain? 🧠", "Today's challenge is waiting. A little every day beats a lot now and then."],
      ["{teacher} misses you 👀", "It's been a while. Take today's challenge and get going again."]
    ],
    challenge: [
      ["Almost there ⚡", "You've practised today. Take the daily challenge for the full daily goal!"],
      ["One thing left today", "Today's challenge is still waiting. {q} questions and you're done."]
    ],
    late: [
      ["Last chance! 🔥", "Your {n}-day streak ends at midnight. One short round saves it."],
      ["{n} days at stake ⏰", "It's not too late. Take a quick round before midnight."]
    ],
    test: ["Notifications are on 🎉", "This is what Axle reminders look like. We'll let you know when your streak is in danger."]
  }
};
const TEACHERS = ["Frida", "Elektra", "Kai", "Berit", "Magnus", "Nora"];

// Bestemmer hva (om noe) som skal sendes nå. Returnerer { kind, title, body } eller null.
function decide(sub, state, now) {
  const L = localNow(sub.tz, now), st = state || {}, lang = sub.lang === "en" ? "en" : "nb", T = TXT[lang];
  const daily = st.daily || {}, practised = (+daily[L.day] || 0) > 0, dcDone = !!(st.dc && st.dc.day === L.day);
  const s = st.streak || {}, alive = s.last === L.day || s.last === L.yesterday, n = alive ? (+s.count || 0) : 0;
  const q = Math.max(3, Math.min(10, Math.round((+st.goal || 10) / 6)));
  const v = { n, q, teacher: pick(TEACHERS) };
  if (sub.late_day !== L.day && L.hm >= LATE && L.hm < "23:45" && n > 0 && !practised) {
    const [a, b] = pick(T.late); return { kind: "late", day: L.day, title: fill(a, v), body: fill(b, v) };
  }
  if (sub.main_day !== L.day && L.hm >= sub.remind_at && L.hm < (sub.remind_at >= LATE ? "23:45" : LATE)) {
    if (!practised) { const [a, b] = pick(n > 0 ? T.streak : T.fresh); return { kind: "main", day: L.day, title: fill(a, v), body: fill(b, v) }; }
    if (!dcDone) { const [a, b] = pick(T.challenge); return { kind: "main", day: L.day, title: fill(a, v), body: fill(b, v) }; }
  }
  return null;
}

async function send(sub, msg, errs) {
  const payload = JSON.stringify({ title: msg.title, body: msg.body, url: "/", tag: "axle-" + msg.kind });
  try {
    await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload, { TTL: 4 * 3600, urgency: "normal" });
    return true;
  } catch (e) {
    if (errs) errs.push(`${e && e.statusCode || "?"} ${String(e && (e.body || e.message) || e).slice(0, 160)}`);
    if (e && (e.statusCode === 404 || e.statusCode === 410)) await sb.from("push_subs").delete().eq("endpoint", sub.endpoint); // utløpt abonnement
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const J = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json" } });
  try {
  // Åpnes adressen i nettleseren (GET), vises bare en statussjekk. Ingenting sendes.
  if (req.method === "GET") {
    let setupErr = null; try { await setup(); } catch (e) { setupErr = String(e && e.message || e); }
    const vErr = setupErr ? null : await initVapid();
    let subs = null; if (!setupErr) { const r = await sb.from("push_subs").select("endpoint", { count: "exact", head: true }); subs = r.error ? "db-feil: " + r.error.message : r.count; }
    return J({ ok: !setupErr && !vErr, versjon: "2026-09-25b", nokkel_database: setupErr || "ok", vapid: vErr || "ok", pameldte_nettlesere: subs });
  }
  const now = new Date();
  await setup();
  const vErr = await initVapid(); if (vErr) return J({ error: vErr }, 500);
  let body = {};
  try { body = await req.json(); } catch { /* tom body fra cron */ }

  // Testvarsel til den innloggede brukeren.
  if (body && body.test) {
    const tok = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await sb.auth.getUser(tok);
    if (!u || !u.user) return J({ error: "auth: innloggingen ble ikke godkjent" }, 401);
    const { data: subs, error: e1 } = await sb.from("push_subs").select("*").eq("user_id", u.user.id);
    if (e1) return J({ error: "db: " + e1.message }, 500);
    if (!subs || !subs.length) return J({ sent: 0, subs: 0, error: "no_subs: fant ingen påmeldte nettlesere for deg" });
    let sent = 0; const errs = [];
    for (const s of subs) { const T = TXT[s.lang === "en" ? "en" : "nb"].test; if (await send(s, { kind: "test", title: T[0], body: T[1] }, errs)) sent++; }
    return J({ sent, subs: subs.length, error: errs[0] ? "push: " + errs[0] : undefined });
  }

  // Vanlig kjøring fra cron.
  const { data: subs, error } = await sb.from("push_subs").select("*").limit(10000);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  const ids = [...new Set((subs || []).map((s) => s.user_id))], states = new Map();
  for (let i = 0; i < ids.length; i += 200) {
    const { data } = await sb.from("progress").select("user_id, state").in("user_id", ids.slice(i, i + 200));
    for (const r of data || []) states.set(r.user_id, r.state);
  }
  let sent = 0;
  for (const sub of subs || []) {
    const msg = decide(sub, states.get(sub.user_id), now);
    if (!msg) continue;
    // Merk som sendt først (atomisk), så to samtidige kjøringer ikke sender dobbelt.
    const col = msg.kind === "late" ? "late_day" : "main_day";
    const { data: claimed } = await sb.from("push_subs").update({ [col]: msg.day }).eq("endpoint", sub.endpoint)
      .or(`${col}.is.null,${col}.neq.${msg.day}`).select("endpoint");
    if (!claimed || !claimed.length) continue;
    if (await send(sub, msg)) sent++;
  }
  return J({ checked: (subs || []).length, sent });
  } catch (e) { return J({ error: "crash: " + String(e && e.message || e).slice(0, 200) }, 500); }
});
