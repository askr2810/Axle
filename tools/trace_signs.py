# Vektoriserer skiltreferanser (Statens vegvesens skilttegninger) til SVG-stier i skiltets 100 × 100-rute.
# Krever numpy, scipy, scikit-image og pillow.
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
# ---------- fareskilt 1200 × 1050: barn (142) og glatt kjørebane (116) ----------
for key, f in [("barn", "142_barn.jpg"), ("glatt", "116_glatt_kjorebane.jpg")]:
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
# ---------- elg (146.1): lite bilde, så det forstørres før sporingen. Plasseres etter den røde trekantens ytre ramme ----------
im = Image.open(f"{SRC}/146.1_elg.png").convert("RGB"); K = 5
im = im.resize((im.width * K, im.height * K), Image.LANCZOS)
a = np.asarray(im).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
red = (r > 140) & (g < 110) & (b < 110)
ink = (r < 100) & (g < 100) & (b < 100)
ys, xs = np.nonzero(red)
# den røde trekanten i barn-referansen fyller x 0–100 og y 6,25–93,75 i skiltruten
S = 100 / (xs.max() - xs.min() + 1); OX = -xs.min() * S; OY = 6.25 - ys.min() * S
out["elg"] = trace(ink, S, S, OX, OY, 1.0, 1.6, 300, 2)
# ---------- påbudt kjøreretning, sving til høyre (402.4): hvit pil i blå sirkel. Sirkelen legges på fkBlueRound (r 44 rundt 50, 50) ----------
r, g, b = load("402.4_pabudt_hoyre.jpg")
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
# ---------- slutt på forkjørsveg (208) 196 × 196 ----------
r, g, b = load("208_slutt_paa_forkjorsveg.png")
ink = (r < 90) & (g < 90) & (b < 90)
yel = (r > 150) & (g > 140) & (b < 120)
S = 96 / 196; O = 2
out["yel"] = avg(r, g, b, yel & ndimage.binary_erosion(yel, iterations=2))
out["sluttArea"] = trace(ndimage.binary_fill_holes(ink), S, S, O, O, 0.7, 0.6, 500, 2)
out["sluttInk"] = trace(ink, S, S, O, O, 0.55, 0.6, 15, 2)
out["sluttYel"] = trace(yel, S, S, O, O, 0.55, 0.6, 15, 2)
# ---------- stopp (204) 264 × 264: rød åttekant med hvit kant og hvite bokstaver. Hele skiltet (med hvit kant) fyller 2–98 ----------
r, g, b = load("204_stopp.png")
red = (r > 150) & (g < 120) & (b < 110)
octa = ndimage.binary_fill_holes(red)
ys, xs = np.nonzero(octa)
S = 88 / (xs.max() - xs.min() + 1); OX = 6 - xs.min() * S; OY = 6 - ys.min() * S
out["stopRed"] = avg(r, g, b, red & ndimage.binary_erosion(red, iterations=4))
out["stopOct"] = trace(octa, S, S, OX, OY, 0.8, 0.8, 2000, 2)
out["stopText"] = trace(octa & ~red, S, S, OX, OY, 0.5, 0.7, 20, 2)

# ---------- offisielle skilttegninger (tools/sign_refs/official/png, laget av tools/render_sign_refs.js) ----------
# Hvert skilt deles i fargelag etter nærmeste farge i paletten og skrives som en liste [farge, sti]: først hele skiltets
# silhuett i hvitt, så gult, oransje (farlig gods), blått, grønt, rødt, grått og svart oppå. Fareskilt (trekanter) fyller hele bredden 0–100 som fkTri;
# de andre skiltene fyller 3–97. Fargene settes i drive_signs.js (FK_RED, FK_BLUE …), så de følger de offisielle verdiene.
OFFICIAL = {
  "vikeplikt": "202", "forkjorsvei": "206", "forkjorskryss": "210",
  "sving_hoyre": "100.1", "sving_venstre": "100.2", "farlige_svinger": "102.1", "smalere_veg": "106.1", "ujevn_veg": "108",
  "tunnel": "122", "vegkryss": "124", "rundkjoring_fare": "126", "trafikklys_fare": "132", "motende_trafikk": "148", "fare_generell": "156",
  "innkjoring_forbudt": "302", "forbudt_kjoretoy": "306.0", "svinge_hoyre_forbudt": "330.1", "svinge_venstre_forbudt": "330.2",
  "vending_forbudt": "332", "forbikjoring_forbudt": "334", "stans_forbudt": "370", "parkering_forbudt": "372",
  "fart30": "362.30", "fart40": "362.40", "fart50": "362.50", "fart60": "362.60", "fart70": "362.70", "fart80": "362.80",
  "fart90": "362.90", "fart100": "362.100", "fart110": "362.110", "slutt_fart60": "364.60",
  "pabud_rett": "402.3", "pabud_venstre": "402.5", "pabud_kjorefelt": "404.1", "rundkjoring": "406",
  "motorveg": "502", "motorveg_slutt": "504", "moteplass": "524", "envegskjoring": "526.1", "blindveg": "527.1", "parkering": "552",
  # oppgave 33: flere skilt (navn og numre fra skiltforskriften)
  "farlige_svinger_v": "102.2", "bratt_ned": "104.2", "bratt_opp": "104.1", "smalere_veg_h": "106.2", "smalere_veg_v": "106.3",
  "fartshump": "109", "vegarbeid": "110", "steinsprut": "112", "rasfare": "114.1", "rasfare_v": "114.2",
  "farlig_vegskulder": "117", "bevegelig_bru": "118", "kai": "120", "planovergang_bom": "134", "planovergang_uten": "135",
  "avstand_1": "136.1", "avstand_2": "136.2", "avstand_3": "136.3", "andreaskors": "138.1", "andreaskors_fler": "138.2",
  "sporvogn": "139", "avstand_gangfelt": "140", "syklende": "144", "rein": "146.2", "hjort": "146.3",
  "ku": "146.4", "sau": "146.5", "ko": "149", "fly": "150", "militaer": "151",
  "sidevind": "152", "trafikkulykke": "153", "skiloper": "154", "ridende": "155", "vik_motende": "212",
  "motende_vik": "214", "forbudt_motorvogn": "306.1", "forbudt_traktor": "306.3", "forbudt_mc": "306.4", "forbudt_lastebil": "306.5",
  "forbudt_sykkel": "306.6", "forbudt_gaende": "306.7", "forbudt_gaende_sykkel": "306.8", "forbudt_ridende": "306.9", "forbudt_farlig_gods": "308",
  "forbudt_tyngre": "310", "breddegrense": "312", "hoydegrense": "314", "lengdegrense": "316", "vektgrense": "318.1",
  "vektgrense_vogntog": "318.2", "aksellast": "320", "boggilast": "322", "forbikjoring_lastebil": "335", "slutt_forbikjoring": "336",
  "slutt_forbikjoring_lastebil": "337", "slutt_fart50": "364.50", "slutt_fart70": "364.70", "slutt_fart80": "364.80", "fartssone": "366",
  "fartssone_slutt": "368", "parkeringssone": "376.2", "parkeringssone_slutt": "378.1", "pabud_hoyre_bare": "402.1", "pabud_venstre_bare": "402.2",
  "pabud_rett_hoyre": "402.6", "pabud_rett_venstre": "402.7", "pabud_hoyre_venstre": "402.8", "pabud_kjorefelt_v": "404.2", "rundkjoring_retning": "408",
  "motortrafikkveg": "503", "motortrafikkveg_slutt": "505", "tungtrafikkfelt": "506", "tungtrafikkfelt_slutt": "507", "kollektivfelt_buss": "508.1",
  "kollektivfelt_taxi": "508.2", "sambruksfelt": "509", "kollektivfelt_slutt": "510.1", "sambruksfelt_slutt": "511", "holdeplass_buss": "512",
  "holdeplass_trikk": "513", "holdeplass_taxi": "514", "gangveg": "518", "sykkelveg": "520", "sykkelfelt": "521.1",
  "gang_sykkelveg": "522", "enveg_hoyre": "526.2", "enveg_venstre": "526.3", "blindveg_kryssende": "527.2", "blindveg_sykkel": "527.3",
  "valgfritt_felt": "528", "gatetun": "540", "gatetun_slutt": "542", "gagate": "548", "gagate_slutt": "550",
  "havarilomme": "555", "fotoboks": "556.1", "videokontroll": "558", "feil_retning": "565",
}
PAL = [("w", (250, 250, 250)), ("r", (225, 50, 35)), ("r", (195, 20, 5)), ("b", (5, 70, 165)), ("k", (10, 10, 10)), ("y", (245, 180, 0)), ("g", (165, 165, 150)), ("n", (30, 150, 60)), ("o", (240, 120, 0))]
out["sign"] = {}
for name, nr in OFFICIAL.items():
    a = np.asarray(Image.open(f"{SRC}/official/png/{nr}.png").convert("RGBA")).astype(float)
    alpha = a[..., 3] > 128
    rgb = a[..., :3]
    dist = np.stack([((rgb - np.array(c)) ** 2).sum(-1) for _, c in PAL], -1)
    cls = np.array([k for k, _ in PAL])[dist.argmin(-1)]
    ys, xs = np.nonzero(alpha)
    w, h = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
    tri = nr.startswith("1") or nr in ("202", "210")
    S = (100 if tri else 94) / max(w, h)
    OX = (100 - w * S) / 2 - xs.min() * S; OY = (100 - h * S) / 2 - ys.min() * S
    tol, sig = 0.35 / S / 100 * 100, 1.0
    layers = [["w", trace(ndimage.binary_fill_holes(alpha), S, S, OX, OY, 0.5 / S / 4, sig, 400, 1)]]
    for k in "yobnrgk":
        m = alpha & (cls == k)
        if m.sum() < 30: continue
        m = ndimage.binary_opening(m, iterations=1)   # bort med enkeltpiksler i kantene (kantutjevning)
        d = trace(m, S, S, OX, OY, 0.4 / S / 4, sig, 25, 1)
        if d: layers.append([k, d])
    out["sign"][name] = layers

with open("drive_signs_ref.js", "w") as fh:
    fh.write("// ============================================================\n")
    fh.write("//  SKILT VEKTORISERT FRA STATENS VEGVESENS SKILTTEGNINGER (laget av tools/trace_signs.py, ikke rediger for hånd).\n")
    fh.write("//  Stiene ligger i skiltets 100 × 100-rute og tegnes i drive_signs.js (fkTri, gangfelt, barn, glatt, slutt på forkjørsveg,\n")
    fh.write("//  og FK_TRACE.sign: hele skilt sporet fra de offisielle tegningene, som lister med [farge, sti]).\n")
    fh.write("// ============================================================\n")
    fh.write("const FK_TRACE = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print({k: (len(v) if not isinstance(v, dict) else sum(len(p) for L in v.values() for _, p in L)) for k, v in out.items()})
