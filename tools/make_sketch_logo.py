#!/usr/bin/env python3
"""Lager det tegnede app-ikonet («Tegnet» under Innstillinger → Utseende → App-ikon) og det tegnede ordmerket.

Bokstavene er Bricolage Grotesque (samme skrift som overskriftene i appen). Hvert omriss deles ved hjørnene
i streker, og hver strek tegnes to ganger med litt slingring og stikker litt forbi hjørnene, som en skisse.
Notatene (x², ½) er håndskrift (Caveat) gjort om til streker. Alt blir rene vektorer, så filene ser like ut overalt.

  web/icons/logo-192-sketch.png         merket i appen (flis med kant, som logo-192.png)
  web/icons/icon-sketch-48.png / -192   nettleserfanen (48 px uten notater og med tykkere strek)
  web/icons/apple-touch-icon-sketch.png hjemskjermen på iPhone (hele flaten)
  web/icons/wordmark-sketch(-dark).svg  «Axle» tegnet, for sidemenyen og velkomstsiden (lyst og mørkt tema)
  brand/axle-sketch-a.svg               kilden til ikonet i full størrelse
  assets/icon-only-sketch.png           alternativt app-ikon «sketch» for iOS/Android (1024 × 1024, hele flaten)

Krever: pip install fonttools skia-pathops cairosvg. Skriftene lastes ned fra Google Fonts første gang.
Kjør: python3 tools/make_sketch_logo.py
"""
import math, os, random, tempfile, urllib.request
import cairosvg
from fontTools.ttLib import TTFont
from fontTools.ttLib.removeOverlaps import removeOverlaps
from fontTools.pens.recordingPen import DecomposingRecordingPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, "web", "icons")
FONTS = {  # Bricolage Grotesque 700 (opsz 96) og Caveat 600, fra Google Fonts
    "bricolage": "https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpZJMnuECpwUxJBOm_OJWiaaD30YfKfjZZoLvfzlyM0.ttf",
    "caveat": "https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SII.ttf",
}
BLUE, INK, INK_DARK = "#2B59C3", "#16202A", "#E6ECEF"
NOTE_GOLD, NOTE_GREEN = "#F0B429", "#3CC48B"   # gull og grønn fra mørkt tema, lesbare på blått


def font(name):
    path = os.path.join(tempfile.gettempdir(), f"axle-{name}.ttf")
    if not os.path.exists(path): urllib.request.urlretrieve(FONTS[name], path)
    f = TTFont(path); removeOverlaps(f)   # e og A er satt sammen av overlappende deler; skjøtene skal ikke tegnes
    return f


def outline(f, ch, n=14):
    """Omrisset av en bokstav som lukkede polylinjer (font-enheter, y opp)."""
    gs = f.getGlyphSet(); pen = DecomposingRecordingPen(gs); gs[f.getBestCmap()[ord(ch)]].draw(pen)
    q = lambda a, b, c: [((1-t)**2*a[0]+2*(1-t)*t*b[0]+t*t*c[0], (1-t)**2*a[1]+2*(1-t)*t*b[1]+t*t*c[1]) for t in [i/n for i in range(1, n+1)]]
    cu = lambda a, b, c, d: [((1-t)**3*a[0]+3*(1-t)**2*t*b[0]+3*(1-t)*t*t*c[0]+t**3*d[0], (1-t)**3*a[1]+3*(1-t)**2*t*b[1]+3*(1-t)*t*t*c[1]+t**3*d[1]) for t in [i/n for i in range(1, n+1)]]
    out, cur = [], []
    for op, args in pen.value:
        if op == "moveTo": cur = [args[0]]
        elif op == "lineTo": cur.append(args[0])
        elif op == "qCurveTo":
            pts = list(args); a = cur[-1]
            if pts[-1] is None: pts = pts[:-1]
            offs, end = pts[:-1], pts[-1]
            for i, c in enumerate(offs):
                e = end if i == len(offs)-1 else ((c[0]+offs[i+1][0])/2, (c[1]+offs[i+1][1])/2)
                cur += q(a, c, e); a = e
        elif op == "curveTo": cur += cu(cur[-1], *args)
        elif op in ("closePath", "endPath"):
            if len(cur) > 1 and math.dist(cur[0], cur[-1]) < 1: cur = cur[:-1]
            if cur: out.append(cur)
            cur = []
    return out, gs[f.getBestCmap()[ord(ch)]].width


def strokes(poly, corner=32):
    """Del et lukket omriss ved hjørnene (retningsendring over `corner` grader)."""
    n = len(poly); cs = []
    for i in range(n):
        a, b, c = poly[i-1], poly[i], poly[(i+1) % n]
        d = math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(b[1]-a[1], b[0]-a[0])
        if abs((d+math.pi) % (2*math.pi) - math.pi) > math.radians(corner): cs.append(i)
    if not cs: return [poly + [poly[0]]]
    res = []
    for k, i in enumerate(cs):
        j, seg, m = cs[(k+1) % len(cs)], [poly[i]], i
        while m != j: m = (m+1) % n; seg.append(poly[m])
        res.append(seg)
    return res


def wobble(seg, rnd, amp, over):
    """Litt slingring langs streken, og litt forbi hjørnene i begge ender (kortere streker stikker mindre ut)."""
    tot = sum(math.dist(seg[i], seg[i+1]) for i in range(len(seg)-1))
    cap = min(over, .1*tot)
    def ext(p, q, o): L = math.dist(p, q) or 1; return (p[0]+(p[0]-q[0])/L*o, p[1]+(p[1]-q[1])/L*o)
    seg = [ext(seg[0], seg[1], cap*rnd.uniform(.3, 1))] + seg + [ext(seg[-1], seg[-2], cap*rnd.uniform(.3, 1))]
    dense = [seg[0]]
    for p in seg[1:]:
        q = dense[-1]; k = max(1, int(math.dist(p, q)/40))
        dense += [(q[0]+(p[0]-q[0])*t/k, q[1]+(p[1]-q[1])*t/k) for t in range(1, k+1)]
    ph = [rnd.uniform(0, 6.3) for _ in range(4)]; s, out = 0, []
    for i, p in enumerate(dense):
        if i: s += math.dist(p, dense[i-1])
        out.append((p[0]+amp*(math.sin(s/170+ph[0])+.5*math.sin(s/61+ph[1])), p[1]+amp*(math.sin(s/150+ph[2])+.5*math.sin(s/53+ph[3]))))
    return out


def d(pts, x0=0, y0=0, k=1):
    return "M" + " L".join(f"{x0+x*k:.1f} {y0-y*k:.1f}" for x, y in pts)


def sketch(f, text, x, y, size, seed=7, track=.09):
    """Tegnede bokstaver: liste med (bokstav, [strek 1, strek 2]) som path-data, og bredden."""
    k = size / f["head"].unitsPerEm; cx = x; res = []
    for ch in text:
        polys, w = outline(f, ch); rnd = random.Random(seed*100 + ord(ch))
        passes = [" ".join(d(wobble(s, rnd, amp, over), cx, y, k) for c in polys for s in strokes(c)) for amp, over in ((6, 16), (8, 24))]
        res.append((ch, passes)); cx += w*k + size*track
    return res, cx - size*track - x


def written(f, text, x, y, size, rot=0):
    """Håndskrift som fylt path (Caveat)."""
    k = size / f["head"].unitsPerEm; cx = x; parts = []
    for ch in text:
        polys, w = outline(f, ch, 8)
        parts.append(" ".join(d(p, cx, y, k) + " Z" for p in polys)); cx += w*k
    return f'<path transform="rotate({rot} {x} {y})" d="{" ".join(parts)}"/>'


def grid(size, step, sw, seed=3):
    rnd = random.Random(seed); lines = []
    for i in range(1, int(size/step)+1):
        v = i*step - step/2
        for horiz in (0, 1):
            ph = rnd.uniform(0, 6.3)
            pts = [(t, v + 1.2*math.sin(t/61+ph) + .4*math.sin(t/23+ph*2)) for t in range(-10, size+20, 24)]
            lines.append("M" + " L".join(f"{(a if horiz else b):.1f} {(b if horiz else a):.1f}" for a, b in pts))
    return f'<path d="{" ".join(lines)}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="{sw}" stroke-linecap="round"/>'


def icon_svg(B, C, *, tile=True, notes=True, small=False):
    """Som i forslaget: tynne doble streker, A-en midt på (uten bokmerke), x² og ½ i hjørnene."""
    S = 1024
    _, w = sketch(B, "A", 0, 0, 887)
    (_, passes), = sketch(B, "A", (S - w)/2, S*.783, 887)[0]
    if small:   # 96 px og mindre: én tykkere strek, ellers forsvinner A-en
        a = f'<path d="{passes[0]}" stroke-width="27"/>'
    else:
        a = f'<path d="{passes[0]}" stroke-width="12.5"/><path d="{passes[1]}" stroke-width="8" opacity=".85"/>'
    body = f'<rect width="{S}" height="{S}" fill="{BLUE}"/>{grid(S, 128, 5)}'
    if notes:
        body += f'<g fill="{NOTE_GOLD}">{written(C, "x²", 89, 239, 154, -8)}</g><g fill="{NOTE_GREEN}">{written(C, "½", 802, 956, 137, 6)}</g>'
    body += f'<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">{a}</g>'
    if tile:   # som logo-192.png: avrundet flis med sort kant og gjennomsiktige hjørner
        r, i = 205, 10
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}"><defs><clipPath id="c"><rect x="{i}" y="{i}" width="{S-2*i}" height="{S-2*i}" rx="{r}"/></clipPath></defs>'
                f'<g clip-path="url(#c)">{body}</g><rect x="{i}" y="{i}" width="{S-2*i}" height="{S-2*i}" rx="{r}" fill="none" stroke="#000" stroke-width="20"/></svg>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">{body}</svg>'


def wordmark_svg(B, color):
    size, pad = 1000, 60
    letters, w = sketch(B, "Axle", pad, 0, size)
    top, base = -760, 30   # over toppen av l og under grunnlinjen, med plass til strekene som stikker ut
    paths = "".join(f'<path d="{p[0]}" stroke-width="40"/><path d="{p[1]}" stroke-width="24" opacity=".85"/>' for _, p in letters)
    W, H = w + 2*pad, base - top + 2*pad
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {top-pad} {W:.0f} {H}" width="{W/H*40:.1f}" height="40">'
            f'<g fill="none" stroke="{color}" stroke-linecap="round" stroke-linejoin="round">{paths}</g></svg>')


def png(svg, path, px):
    cairosvg.svg2png(bytestring=svg.encode(), write_to=path, output_width=px, output_height=px)


if __name__ == "__main__":
    B, C = font("bricolage"), font("caveat")
    big = icon_svg(B, C)
    open(os.path.join(ROOT, "brand", "axle-sketch-a.svg"), "w").write(big)
    png(big, os.path.join(ICONS, "logo-192-sketch.png"), 192)
    png(big, os.path.join(ICONS, "icon-sketch-192.png"), 192)
    png(icon_svg(B, C, notes=False, small=True), os.path.join(ICONS, "icon-sketch-48.png"), 48)
    png(icon_svg(B, C, tile=False), os.path.join(ICONS, "apple-touch-icon-sketch.png"), 180)
    png(icon_svg(B, C, tile=False), os.path.join(ROOT, "assets", "icon-only-sketch.png"), 1024)   # app-ikonet på telefonen (se docs/PUBLISERING.md)
    open(os.path.join(ICONS, "wordmark-sketch.svg"), "w").write(wordmark_svg(B, INK))
    open(os.path.join(ICONS, "wordmark-sketch-dark.svg"), "w").write(wordmark_svg(B, INK_DARK))
    print("Tegnet ikon og ordmerke skrevet til web/icons/ og brand/axle-sketch-a.svg")
