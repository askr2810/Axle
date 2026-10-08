#!/usr/bin/env python3
"""Lager alle ikon-, splash- og butikkbildene for Axle fra de to logoene i brand/.

  brand/axle-logo-a.png        – «A»-merket: hovedmerket, brukes overalt (ikoner, favicon, i appen)
  brand/axle-lockup(-light).png – «A»-merket med «Axle» i Bricolage Grotesque ved siden av (splash, delingsbilde),
                                  mørk tekst for lys bakgrunn og lys tekst for mørk
  brand/axle-logo.png          – «Axle» inne i flisen; brukes bare som kilde for rutenettet (navnet blir for trangt i flisen)

Begge er flisene slik de er tegnet: blått rutenett, gult bokmerke, sort kant og avrundede hjørner.
Der et ikon må fylle hele flaten (iOS, Android, maskable), klippes kanten bort og rutenettet
forlenges utover, så bokmerket og bokstavene havner innenfor det plattformen klipper til.
Krever Pillow. Kjør: python3 tools/make_logo.py  (eller npm run icons)
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAPER, PAPER_DARK = (238, 242, 236), (15, 23, 32)

# Målt i kildefilene (2161 × 2161): kant og hjørner ligger innenfor INSET, rutenettlinjene
# starter i x/y = 246 og går igjen hver 275,33 px, og bakgrunnen er flat #196FFF.
INSET, LINE0, PITCH = 72, 246, (1898 - 246) / 6
CELL = (522, 1622)   # øvre venstre hjørne av en tom rute i ordmerket (linjene ligger langs venstre og øvre kant)

def src(name): return Image.open(os.path.join(ROOT, "brand", name)).convert("RGBA")
A, WORD = src("axle-logo-a.png"), src("axle-logo.png")
LOCK, LOCK_L = src("axle-lockup.png"), src("axle-lockup-light.png")

def grid(w, h, x0, y0):
    """Tomt rutenett i kildeoppløsning, med en linje i (x0, y0)."""
    cell = WORD.crop((CELL[0], CELL[1], CELL[0] + int(PITCH) + 2, CELL[1] + int(PITCH) + 2))
    out = Image.new("RGBA", (w, h))
    kx0, ky0 = -int(x0 // PITCH) - 1, -int(y0 // PITCH) - 1
    for ky in range(ky0, int((h - y0) // PITCH) + 2):
        for kx in range(kx0, int((w - x0) // PITCH) + 2):
            out.paste(cell, (round(x0 + kx * PITCH), round(y0 + ky * PITCH)))
    return out

def extend(tile, left, top, right, bottom):
    """Innsiden av flisen (uten kant og hjørner) med rutenettet forlenget utover på hver side."""
    n = tile.width
    core = tile.crop((INSET, INSET, n - INSET, n - INSET))
    first = LINE0 - INSET
    out = grid(core.width + left + right, core.height + top + bottom, left + first, top + first)
    out.paste(core, (left, top))
    return out

def square(tile, pad): return extend(tile, pad, pad, pad, pad)

def centered(bg, tile, size, canvas):
    out = Image.new("RGBA", canvas, bg + (255,))
    out.alpha_composite(tile.resize((size, size), Image.LANCZOS), ((canvas[0] - size) // 2, (canvas[1] - size) // 2))
    return out

def lockup(bg, lk, width, canvas):
    out = Image.new("RGBA", canvas, bg + (255,)); h = round(lk.height * width / lk.width)
    out.alpha_composite(lk.resize((width, h), Image.LANCZOS), ((canvas[0] - width) // 2, (canvas[1] - h) // 2))
    return out

def save(im, *parts, size=None, rgb=False):
    if size: im = im.resize(size if isinstance(size, tuple) else (size, size), Image.LANCZOS)
    if rgb: im = im.convert("RGB")
    p = os.path.join(ROOT, *parts); os.makedirs(os.path.dirname(p), exist_ok=True)
    im.save(p, optimize=True); print("  ", "/".join(parts), "%d×%d" % im.size)

APP = square(A, 150)        # hele flaten fylt; bokmerket går klar av hjørnene iOS og Google Play runder av
MASKABLE = square(A, 560)   # PWA maskable: alt viktig innenfor sirkelen med radius 40 % av bredden
ADAPTIVE = square(A, 870)   # Android adaptiv: innenfor den synlige sirkelen (radius 1/3 av laget)

print("Axle-logo:")
# Capacitor (@capacitor/assets lager iOS- og Android-størrelsene fra disse)
save(APP, "assets", "icon-only.png", size=1024, rgb=True)
save(ADAPTIVE, "assets", "icon-foreground.png", size=1024, rgb=True)
save(grid(2161, 2161, LINE0, LINE0), "assets", "icon-background.png", size=1024, rgb=True)
for name, col, lk in (("splash.png", PAPER, LOCK), ("splash-dark.png", PAPER_DARK, LOCK_L)):
    save(lockup(col, lk, 1000, (2732, 2732)), "assets", name, rgb=True)

# Butikkene
save(APP, "store", "app-store-icon-1024.png", size=1024, rgb=True)
save(APP, "store", "play-icon-512.png", size=512, rgb=True)
# 1024 × 500: «A»-merket med rutenettet forlenget rundt (2017 × 2017 kjerne → 5359 × 2617)
save(extend(A, 1671, 300, 1671, 300), "store", "play-feature-graphic-1024x500.png", size=(1024, 500), rgb=True)  # luft rundt merket

# Nett / PWA
for s in (48, 192, 512): save(A, "web", "icons", "icon-%d.png" % s, size=s)   # flisen med runde hjørner
save(MASKABLE, "web", "icons", "icon-maskable-512.png", size=512, rgb=True)
save(APP, "web", "icons", "apple-touch-icon.png", size=180, rgb=True)
save(A, "web", "icons", "logo-192.png", size=192)                             # merket i appen (velkomst, språkvalg)
save(lockup(PAPER, LOCK, 820, (1200, 630)), "web", "icons", "og-image.png", rgb=True)  # delingsbilde
A.resize((256, 256), Image.LANCZOS).save(os.path.join(ROOT, "web", "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("   web/favicon.ico 16/32/48")
