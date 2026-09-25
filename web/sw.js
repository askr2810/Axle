// Service worker for nettversjonen: appen virker offline etter første besøk.
const CACHE = "axle-__BUILD__";
const CORE = ["./", "index.html", "app.bundle.js?v=__BUILD__", "manifest.webmanifest", "privacy.html",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "vendor/katex.min.js", "vendor/fonts.css"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return; // skjemaer o.l. går rett til nettet
  // nettverk først for selve siden (nye versjoner), cache først for resten
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put("index.html", c)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })));
});

// Påminnelser (web push) fra Supabase-funksjonen «varsler».
self.addEventListener("push", e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: "Axle", body: e.data ? e.data.text() : "" }; }
  const title = d.title || "Axle";
  // Vis varselet. Feiler det med alle valgene, prøv igjen med bare tittel og tekst.
  const show = self.registration.showNotification(title, { body: d.body || "", icon: "icons/icon-192.png", tag: d.tag || "axle", data: { url: d.url || "./" } })
    .catch(() => self.registration.showNotification(title, { body: d.body || "" }));
  // Si fra til åpne faner at meldingen kom fram (brukes av «Send et testvarsel»).
  const tell = self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => cs.forEach(c => c.postMessage({ type: "axle-push", title, sw: CACHE })));
  e.waitUntil(Promise.all([show, tell]));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.startsWith(self.registration.scope) && "focus" in c) return c.focus();
    return self.clients.openWindow(url);
  }));
});
