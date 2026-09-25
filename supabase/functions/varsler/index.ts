// @ts-nocheck
// Axle: daglige påminnelser (web push), i stil med Duolingo.
// Kalles hvert kvarter av pg_cron (se supabase/varsler.sql). For hver nettleser som har slått på påminnelser:
//  - Hovedpåminnelse på valgt klokkeslett hvis du ikke har øvd i dag, eller har øvd men ikke tatt dagens utfordring.
//  - «Siste sjanse» kl. 22 hvis rekka di står i fare (du har en rekke, men har ikke øvd i dag).
// Maks én av hver per dag. Med { "test": true } og innloggingstoken sendes et testvarsel til deg selv.
// Hemmeligheter (Edge Functions → Secrets): VAPID_PUBLIC_KEY og VAPID_PRIVATE_KEY.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const sb = createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });
webpush.setVapidDetails("https://axle.no", Deno.env.get("VAPID_PUBLIC_KEY") ?? "", Deno.env.get("VAPID_PRIVATE_KEY") ?? "");

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

async function send(sub, msg) {
  const payload = JSON.stringify({ title: msg.title, body: msg.body, url: "/", tag: "axle-" + msg.kind });
  try {
    await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload, { TTL: 4 * 3600, urgency: "normal" });
    return true;
  } catch (e) {
    if (e && (e.statusCode === 404 || e.statusCode === 410)) await sb.from("push_subs").delete().eq("endpoint", sub.endpoint); // utløpt abonnement
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const now = new Date();
  let body = {};
  try { body = await req.json(); } catch { /* tom body fra cron */ }

  // Testvarsel til den innloggede brukeren.
  if (body && body.test) {
    const tok = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await sb.auth.getUser(tok);
    if (!u || !u.user) return new Response(JSON.stringify({ error: "auth" }), { status: 401, headers: { ...CORS, "Content-Type": "application/json" } });
    const { data: subs } = await sb.from("push_subs").select("*").eq("user_id", u.user.id);
    let sent = 0;
    for (const s of subs || []) { const T = TXT[s.lang === "en" ? "en" : "nb"].test; if (await send(s, { kind: "test", title: T[0], body: T[1] })) sent++; }
    return new Response(JSON.stringify({ sent }), { headers: { ...CORS, "Content-Type": "application/json" } });
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
  return new Response(JSON.stringify({ checked: (subs || []).length, sent }), { headers: { "Content-Type": "application/json" } });
});
