# Vektoriserer skiltreferanser (Statens vegvesens skilttegninger) til SVG-stier i skiltets 100 × 100-rute.
# Bruk: python3 tools/trace_signs.py [mappe]  → skriver drive_signs_ref.js (standard: tools/sign_refs, kjøres fra rotmappen)
# Hvert bilde deles i fargelag (svart, rød, blå, gul). Konturene finnes med marching squares, forenkles (Douglas–Peucker)
# og skrives som én sti per lag med fill-rule evenodd, så hull (f.eks. vinduet i bilen) blir riktige.
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage import measure

SRC = sys.argv[1] if len(sys.argv) > 1 else "tools/sign_refs"
def load(f):
    a = np.asarray(Image.open(f"{SRC}/{f}").convert("RGB")).astype(float)
    return a[..., 0], a[..., 1], a[..., 2]

def trace(mask, sx, sy, ox, oy, tol, sigma, min_area, dec=1):
    m = ndimage.gaussian_filter(mask.astype(float), sigma) if sigma else mask.astype(float)
    m = np.pad(m, 2)
    parts = []
    for c in measure.find_contours(m, 0.5):
        c = measure.approximate_polygon(c, tolerance=tol)
        if len(c) < 3: continue
        y, x = c[:, 0] - 2, c[:, 1] - 2
        area = 0.5 * abs(np.dot(x, np.roll(y, 1)) - np.dot(y, np.roll(x, 1)))
        if area < min_area: continue
        pts = [f"{ox + px * sx:.{dec}f} {oy + py * sy:.{dec}f}" for px, py in zip(x, y)]
        # fjern like punkt på rad etter avrunding
        out = [pts[0]] + [p for i, p in enumerate(pts[1:], 1) if p != pts[i - 1]]
        parts.append("M" + "L".join(out) + "Z")
    return "".join(parts)

def avg(r, g, b, mask):
    return "#%02X%02X%02X" % (int(r[mask].mean()), int(g[mask].mean()), int(b[mask].mean()))

out = {}
# ---------- fareskilt 1200 × 1050: barn (146) og glatt kjørebane (118) ----------
for key, f in [("barn", "146_barn.jpg"), ("glatt", "118_glatt_kjorebane.jpg")]:
    r, g, b = load(f)
    red = (r > 140) & (g < 120) & (b < 100)
    ink = (r < 110) & (g < 110) & (b < 110)
    S = 100 / 1200; OY = (100 - 1050 * S) / 2
    area = ndimage.binary_fill_holes(red)
    if key == "barn":
        out["triRed"] = avg(r, g, b, red & ndimage.binary_erosion(red, iterations=6))
        out["ink"] = avg(r, g, b, ink & ndimage.binary_erosion(ink, iterations=4))
        out["triBase"] = trace(area, S, S, 0, OY, 1.2, 1.2, 4000)
        out["triRedPath"] = trace(red, S, S, 0, OY, 1.2, 1.2, 4000)
    out[key] = trace(ink, S, S, 0, OY, 0.9, 1.0, 60)
# ---------- elg (142): lite bilde, så det forstørres før sporingen. Plasseres etter den røde trekantens ytre ramme ----------
im = Image.open(f"{SRC}/142_elg.png").convert("RGB"); K = 5
im = im.resize((im.width * K, im.height * K), Image.LANCZOS)
a = np.asarray(im).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
red = (r > 140) & (g < 110) & (b < 110)
ink = (r < 100) & (g < 100) & (b < 100)
ys, xs = np.nonzero(red)
# den røde trekanten i barn-referansen fyller x 0–100 og y 6,25–93,75 i skiltruten
S = 100 / (xs.max() - xs.min() + 1); OX = -xs.min() * S; OY = 6.25 - ys.min() * S
out["elg"] = trace(ink, S, S, OX, OY, 1.0, 1.6, 300, 2)
# ---------- påbudt kjøreretning til høyre (402): hvit pil i blå sirkel. Sirkelen legges på fkBlueRound (r 44 rundt 50, 50) ----------
r, g, b = load("402_pabudt_hoyre.jpg")
blue = (b > 150) & (r < 90) & (g < 120)
disk = ndimage.binary_fill_holes(blue)
ys, xs = np.nonzero(disk)
S = 88 / (xs.max() - xs.min() + 1); OX = 6 - xs.min() * S; OY = 6 - ys.min() * S
out["pabudHoyre"] = trace(disk & ~blue, S, S, OX, OY, 0.8, 1.0, 400, 2)
# ---------- gangfelt (516) 447 × 447 ----------
r, g, b = load("516_gangfelt.jpg")
blue = (b > 70) & (r < 70) & (b > g + 30)
ink = (r < 90) & (g < 90) & (b < 90) & ~blue
S = 88 / 447; O = 6
out["blue"] = avg(r, g, b, blue & ndimage.binary_erosion(blue, iterations=4))
out["gangSquare"] = trace(ndimage.binary_fill_holes(blue), S, S, O, O, 0.6, 0.8, 500, 2)
out["gangBlue"] = trace(blue, S, S, O, O, 0.6, 0.8, 500, 2)
out["gangfelt"] = trace(ink, S, S, O, O, 0.6, 0.8, 20, 2)
# ---------- slutt på forkjørsveg (308) 196 × 196 ----------
r, g, b = load("308_slutt_paa_forkjorsveg.png")
ink = (r < 90) & (g < 90) & (b < 90)
yel = (r > 150) & (g > 140) & (b < 120)
S = 96 / 196; O = 2
out["yel"] = avg(r, g, b, yel & ndimage.binary_erosion(yel, iterations=2))
out["sluttArea"] = trace(ndimage.binary_fill_holes(ink), S, S, O, O, 0.7, 0.6, 500, 2)
out["sluttInk"] = trace(ink, S, S, O, O, 0.55, 0.6, 15, 2)
out["sluttYel"] = trace(yel, S, S, O, O, 0.55, 0.6, 15, 2)

with open("drive_signs_ref.js", "w") as fh:
    fh.write("// ============================================================\n")
    fh.write("//  SKILT VEKTORISERT FRA STATENS VEGVESENS SKILTTEGNINGER (laget av tools/trace_signs.py, ikke rediger for hånd).\n")
    fh.write("//  Stiene ligger i skiltets 100 × 100-rute og tegnes i drive_signs.js (fkTri, gangfelt, barn, glatt, slutt på forkjørsveg).\n")
    fh.write("// ============================================================\n")
    fh.write("const FK_TRACE = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print({k: len(v) for k, v in out.items()})
