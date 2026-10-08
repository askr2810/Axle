#!/usr/bin/env python3
"""Lager alle ikon-, splash- og butikkbildene for Axle fra de to logoene i brand/.

  brand/axle-logo-a.png        – «A»-merket: hovedmerket, brukes overalt (ikoner, favicon, i appen)
  brand/axle-lockup(-light).png – «A»-merket med «Axle» i Bricolage Grotesque ved siden av (splash, delingsbilde),
                                  mørk tekst for lys bakgrunn og lys tekst for mørk
  brand/axle-logo.png          – «Axle» inne i flisen; brukes bare som kilde for rutenettet (navnet blir for trangt i flisen)

Begge er flisene slik de er tegnet: blått rutenett, gult bokmerke, sort kant og avrundede hjørner.
Der et ikon må fylle hele flaten (iOS, Android, maskable), klippes kanten bort og rutenettet
forlenges utover, så bokmerket og bokstavene havner innenfor det plattformen klipper til.
Merket farges om fra kildefilene: blått blir appens egen blåfarge (BLUE = accent i appen), og
«black edition» får mørkegrå flis og svart bokmerke (valgfritt app-ikon i Innstillinger → Utseende).
Krever Pillow og numpy. Kjør: python3 tools/make_logo.py  (eller npm run icons)
"""
import os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAPER, PAPER_DARK = (238, 242, 236), (15, 23, 32)

# Målt i kildefilene (2161 × 2161): kant og hjørner ligger innenfor INSET, rutenettlinjene
# starter i x/y = 246 og går igjen hver 275,33 px, og bakgrunnen er flat #196FFF.
INSET, LINE0, PITCH = 72, 246, (1898 - 246) / 6
CELL = (522, 1622)   # øvre venstre hjørne av en tom rute i ordmerket (linjene ligger langs venstre og øvre kant)

def src(name): return Image.open(os.path.join(ROOT, "brand", name)).convert("RGBA")

SRC_BLUE, SRC_YELLOW = (25, 111, 255), (255, 242, 0)   # fargene i kildefilene
BLUE, GOLD = (43, 89, 195), (233, 161, 0)              # appens blå (accent / u0) og gull (belønning)
BLACK_ED = ((80, 80, 80), (15, 15, 15))                 # black edition: flis og bokmerke

def recolor(im, blue, yellow=SRC_YELLOW):
    """Bytt merkefargene. Hver piksel er en blanding av hvitt, kildeblått og svart (kant og kantutglatting),
    eller av gult og svart i bokmerket. Blandingsforholdet beholdes, bare fargene byttes."""
    a = np.asarray(im.convert("RGBA")).astype(np.float64); rgb, al = a[..., :3], a[..., 3:]
    M = np.array([[255.0, SRC_BLUE[0]], [255.0, SRC_BLUE[1]], [255.0, SRC_BLUE[2]]])
    wb = np.clip(rgb @ np.linalg.pinv(M).T, 0, None)                       # andel hvitt og blått
    out = wb[..., :1] * 255.0 + wb[..., 1:2] * np.array(blue, float)
    yel = (rgb[..., 0] - rgb[..., 2] > 60) & (rgb[..., 1] - rgb[..., 2] > 60)   # bokmerket (gult mot svart)
    t = np.clip(rgb[..., 0] / 255.0, 0, 1)[..., None]
    out[yel] = (t * np.array(yellow, float))[yel]
    return Image.fromarray(np.concatenate([np.clip(out, 0, 255), al], -1).astype(np.uint8), "RGBA")

def relock(lk, blue, yellow=SRC_YELLOW):
    """Lockupen: bare flisen til venstre farges om, teksten står som den er."""
    out = lk.copy(); n = lk.height; out.paste(recolor(lk.crop((0, 0, n, n)), blue, yellow), (0, 0)); return out

A0 = src("axle-logo-a.png")
A, WORD = recolor(A0, BLUE, GOLD), recolor(src("axle-logo.png"), BLUE, GOLD)
A_BW, WORD_BW = recolor(A0, *BLACK_ED), recolor(src("axle-logo.png"), *BLACK_ED)
LOCK, LOCK_L = relock(src("axle-lockup.png"), BLUE, GOLD), relock(src("axle-lockup-light.png"), BLUE, GOLD)

def grid(w, h, x0, y0, cellsrc=None):
    """Tomt rutenett i kildeoppløsning, med en linje i (x0, y0)."""
    cell = (cellsrc or WORD).crop((CELL[0], CELL[1], CELL[0] + int(PITCH) + 2, CELL[1] + int(PITCH) + 2))
    out = Image.new("RGBA", (w, h))
    kx0, ky0 = -int(x0 // PITCH) - 1, -int(y0 // PITCH) - 1
    for ky in range(ky0, int((h - y0) // PITCH) + 2):
        for kx in range(kx0, int((w - x0) // PITCH) + 2):
            out.paste(cell, (round(x0 + kx * PITCH), round(y0 + ky * PITCH)))
    return out

def extend(tile, left, top, right, bottom, cellsrc=None):
    """Innsiden av flisen (uten kant og hjørner) med rutenettet forlenget utover på hver side."""
    n = tile.width
    core = tile.crop((INSET, INSET, n - INSET, n - INSET))
    first = LINE0 - INSET
    out = grid(core.width + left + right, core.height + top + bottom, left + first, top + first, cellsrc)
    out.paste(core, (left, top))
    return out

def square(tile, pad, cellsrc=None): return extend(tile, pad, pad, pad, pad, cellsrc)

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

# Black edition (valgfritt app-ikon): de samme formatene som trengs for å bytte merket i appen og nettleseren
print("Black edition:")
save(A_BW, "brand", "axle-logo-a-black.png")
for sz in (48, 192, 512): save(A_BW, "web", "icons", "icon-black-%d.png" % sz, size=sz)
save(A_BW, "web", "icons", "logo-192-black.png", size=192)
save(square(A_BW, 150, WORD_BW), "web", "icons", "apple-touch-icon-black.png", size=180, rgb=True)
save(square(A_BW, 150, WORD_BW), "assets", "icon-only-black.png", size=1024, rgb=True)   # til alternativt ikon på iOS/Android
