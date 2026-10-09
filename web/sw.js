// Service worker for nettversjonen: appen virker offline etter første besøk.
const CACHE = "axle-__BUILD__";
// Teori og emnesider per fag (c/<KODE>.js?v=<hash>) i en egen cache som overlever nye versjoner av appen, så fag man
// har åpnet virker offline. Filnavnet endres når innholdet endres; gamle versjoner ryddes bort når den nye workeren tar over.
const CCACHE = "axle-fag", CF_V = __CF__;
const CORE = ["./", "index.html", "app.bundle.js?v=__BUILD__", "manifest.webmanifest", "privacy.html",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/logo-192.png", "icons/logo-192-black.png", "icons/icon-black-48.png", "icons/icon-black-192.png", "icons/apple-touch-icon-black.png", "vendor/katex.min.js", "vendor/fonts.css"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== CCACHE).map(k => caches.delete(k))))
    .then(() => caches.open(CCACHE)).then(c => c.keys().then(rs => Promise.all(rs.filter(r => { const u = new URL(r.url), m = u.pathname.match(/\/c\/([A-Z0-9]+)\.js$/);
      return !m || CF_V[m[1]] !== u.searchParams.get("v"); }).map(r => c.delete(r)))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return; // skjemaer o.l. går rett til nettet
  // nettverk først for selve siden (nye versjoner), cache først for resten
  if (req.mode === "navigate") {
    // Bare selve appen (/ eller /index.html) lagres som «index.html»; de åpne fagsidene (/elementmetoden/ osv.) hentes fra nett.
    const p = new URL(req.url).pathname, app = p === "/" || p === "/index.html";
    e.respondWith(fetch(app ? new Request(req.url, { cache: "no-cache", credentials: "same-origin" }) : req).then(r => { if (app && r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put("index.html", c)); } return r; })
      .catch(() => app ? caches.match("index.html") : caches.match(req).then(h => h || caches.match("index.html"))));
    return;
  }
  if (/\/c\/[A-Z0-9]+\.js$/.test(url.pathname)) { // fagfil: fra fag-cachen, ellers nett (og lagre)
    e.respondWith(caches.open(CCACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
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
    // Er Axle allerede åpen: be fanen gå til siden varselet gjelder, og vis den.
    for (const c of list) if (c.url.startsWith(self.registration.scope) && "focus" in c){ c.postMessage({ type: "axle-open", url }); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
