#!/usr/bin/env python3
"""Bygger alle versjoner av Axle fra kildefilene.

  dist/artifact.html        – versjonen som publiseres som Claude-artifact
  release/www/              – nett-/app-versjonen (brukes av Capacitor og GitHub Pages)
"""
import os, shutil, json

ROOT = os.path.dirname(os.path.abspath(__file__))
JS = ["config.js", "i18n.js", "data.js", "gens.js","gens_b.js", "more.js", "more2.js", "more2_b.js", "subjects2.js", "subjects2_b.js", "more3.js",
      "en_static_*.js", "learn.js", "add_*.js", "exam.js", "backup.js", "cloud.js", "book.js", "friends.js", "avatar.js", "app.js"]
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">'
KATEX_CDN = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"

def read(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()

def bundle():
    import glob
    parts = []
    for pat in JS:
        for f in sorted(glob.glob(os.path.join(ROOT, pat))):
            parts.append(f"// ===== {os.path.basename(f)} =====\n" + open(f, encoding="utf-8").read())
    return "\n".join(parts)

def build_artifact(js, css):
    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    html = (f"<title>Axle</title>\n{FONTS}\n<script src=\"{KATEX_CDN}\"></script>\n"
            f"<style>\n{css}</style>\n<div id=\"app\"></div>\n<script>\n{js}\n</script>\n")
    open(os.path.join(ROOT, "dist", "artifact.html"), "w", encoding="utf-8").write(html)

def build_www(js, css, out):
    os.makedirs(out, exist_ok=True)
    cfg = json.loads(read("release_meta.json"))
    import base64, hashlib, re
    stamp = hashlib.sha1((js + css).encode("utf-8")).hexdigest()[:10]  # ny verdi ved hver endring
    m = re.search(r'supabaseUrl:\s*"(https://[^"]+)"', read("config.js"))
    supa = (" " + m.group(1).rstrip("/")) if m else ""
    fallback = "if(!window.katex){document.write('<script src=\"" + KATEX_CDN + "\"><\\/script>');}"
    fb_hash = base64.b64encode(hashlib.sha256(fallback.encode("utf-8")).digest()).decode()
    # Innholdssikkerhetsregel: bare våre egne filer, KaTeX-reserven og skjemaet for tilbakemeldinger er tillatt.
    csp = ("default-src 'self'; "
           f"script-src 'self' 'sha256-{fb_hash}' https://cdnjs.cloudflare.com; "
           "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
           "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
           "img-src 'self' data: blob:; "
           f"connect-src 'self' https://api.web3forms.com{supa}; "
           "worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com")
    head = f"""<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="{csp}">
<meta name="copyright" content="© Axle – alle rettigheter forbeholdt">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2B59C3">
<meta name="description" content="{cfg['description_nb']}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<title>Axle</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<!-- Skrifter og KaTeX: lokale kopier (npm run vendor) med nett som reserve -->
<link rel="stylesheet" href="vendor/fonts.css" onerror="this.remove()">
<script src="vendor/katex.min.js"></script>
<script>{fallback}</script>
<style>
:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}
html,body{{margin:0}}
[hidden]{{display:none!important}}
img{{max-width:100%}}
{css}</style>
</head>
<body>
<div id="app"></div>
<script src="app.bundle.js?v={stamp}"></script>
</body>
</html>
"""
    open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(head)
    open(os.path.join(out, "app.bundle.js"), "w", encoding="utf-8").write(js)
    # statiske filer
    import hashlib
    for f in ["manifest.webmanifest", "sw.js", "privacy.html"]:
        src = os.path.join(ROOT, "web", f)
        if os.path.exists(src):
            txt = open(src, encoding="utf-8").read().replace("__BUILD__", stamp)
            open(os.path.join(out, f), "w", encoding="utf-8").write(txt)
    icons = os.path.join(ROOT, "web", "icons")
    if os.path.isdir(icons): shutil.copytree(icons, os.path.join(out, "icons"), dirs_exist_ok=True)
    # vendor/: KaTeX (ligger i prosjektet) + skrifter (npm run vendor legger dem i vendor/fonts)
    vsrc = os.path.join(ROOT, "vendor")
    if os.path.isdir(vsrc): shutil.copytree(vsrc, os.path.join(out, "vendor"), dirs_exist_ok=True)
    else: os.makedirs(os.path.join(out, "vendor"), exist_ok=True)
    if cfg.get("domain"): open(os.path.join(out, "CNAME"), "w").write(cfg["domain"] + "\n")  # eget domene på GitHub Pages
    fc = os.path.join(out, "vendor", "fonts.css")
    if not os.path.exists(fc): open(fc, "w").write("/* Ingen lokale skrifter ennå – kjør «npm install» og «npm run build». Systemskrifter brukes. */\n")

if __name__ == "__main__":
    js, css = bundle(), read("styles.css")
    build_artifact(js, css)
    if os.path.exists(os.path.join(ROOT, "release_meta.json")):
        build_www(js, css, os.path.join(ROOT, "release", "www"))
    print("OK", len(js), "bytes JS")
