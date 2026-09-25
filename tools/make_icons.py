"""Lager app-ikon, splash og butikkgrafikk for Axle (PIL). Kjør: python3 tools/make_icons.py"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLUE, BLUE_D, NAVY, GOLD, WHITE, PAPER = (43,89,195), (28,63,145), (18,32,64), (233,161,0), (255,255,255), (238,242,236)

def lerp(a,b,t): return tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3))
def gradient(w,h,top,bot):
    im = Image.new("RGB",(w,h),top); d = ImageDraw.Draw(im)
    for y in range(h): d.line([(0,y),(w,y)], fill=lerp(top,bot,y/(h-1)))
    return im

def axle(size, bg=True, scale=1.0):
    """Hjulaksel sett ovenfra: to hjul forbundet med en aksel og et nav i midten."""
    S = size*4  # supersampling
    im = gradient(S,S,(58,108,214),BLUE_D) if bg else Image.new("RGBA",(S,S),(0,0,0,0))
    d = ImageDraw.Draw(im)
    c = S/2; k = S*scale
    # aksel
    aw, ah = k*0.62, k*0.085
    d.rounded_rectangle([c-aw/2, c-ah/2, c+aw/2, c+ah/2], radius=ah/2, fill=WHITE)
    # hjul (dekk)
    for sx in (-1, 1):
        wx = c + sx*k*0.30; ww, wh = k*0.15, k*0.50
        d.rounded_rectangle([wx-ww/2, c-wh/2, wx+ww/2, c+wh/2], radius=ww*0.42, fill=NAVY, outline=WHITE, width=int(k*0.028))
        # mønster i dekket
        for i in range(-3,4):
            y = c + i*wh*0.12
            d.line([(wx-ww*0.22, y), (wx+ww*0.22, y)], fill=(255,255,255,90) if not bg else lerp(NAVY,WHITE,0.35), width=int(k*0.012))
    # nav (differensial)
    r = k*0.105
    d.ellipse([c-r, c-r, c+r, c+r], fill=GOLD, outline=WHITE, width=int(k*0.022))
    r2 = k*0.035; d.ellipse([c-r2, c-r2, c+r2, c+r2], fill=WHITE)
    return im.resize((size,size), Image.LANCZOS)

def save(im, *p):
    path = os.path.join(ROOT, *p); os.makedirs(os.path.dirname(path), exist_ok=True); im.save(path); print("  ", os.path.relpath(path, ROOT), im.size)

def font(sz, bold=True):
    for f in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
              "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/Library/Fonts/Arial Bold.ttf"]:
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()

if __name__ == "__main__":
    print("Ikoner:")
    big = axle(1024)
    save(big.convert("RGB"), "assets", "icon-only.png")                 # @capacitor/assets (iOS + Android)
    save(axle(1024, bg=False, scale=0.62), "assets", "icon-foreground.png")  # Android adaptiv forgrunn (trygg sone)
    save(gradient(1024,1024,(58,108,214),BLUE_D), "assets", "icon-background.png")
    save(big.convert("RGB"), "store", "app-store-icon-1024.png")          # App Store (uten gjennomsiktighet)
    save(axle(512).convert("RGB"), "store", "play-icon-512.png")          # Google Play
    for s in (192, 512): save(axle(s).convert("RGB"), "web", "icons", f"icon-{s}.png")
    save(axle(180).convert("RGB"), "web", "icons", "apple-touch-icon.png")
    m = Image.new("RGB",(512,512)); m.paste(gradient(512,512,(58,108,214),BLUE_D)); fg = axle(512,bg=False,scale=0.7); m.paste(fg,(0,0),fg)
    save(m, "web", "icons", "icon-maskable-512.png")
    print("Splash:")
    for name, bgc in (("splash.png", PAPER), ("splash-dark.png", (15,23,32))):
        sp = Image.new("RGB",(2732,2732),bgc); ic = axle(560); mask = Image.new("L",(560,560),0)
        ImageDraw.Draw(mask).rounded_rectangle([0,0,559,559], radius=125, fill=255); sp.paste(ic,(1086,1086),mask); save(sp, "assets", name)
    print("Butikkgrafikk:")
    fg = Image.new("RGB",(1024,500)); fg.paste(gradient(1024,500,(58,108,214),BLUE_D))
    ic = axle(300); mask = Image.new("L",(300,300),0); ImageDraw.Draw(mask).rounded_rectangle([0,0,299,299], radius=66, fill=255)
    fg.paste(ic,(70,100),mask); d = ImageDraw.Draw(fg)
    d.text((420,150), "Axle", font=font(110), fill=WHITE)
    d.text((424,285), "Ingeniørtrening, 5 minutter om dagen", font=font(30, False), fill=(225,233,250))
    d.text((424,330), "Matte · fysikk · mekanikk · elektro", font=font(26, False), fill=(200,214,245))
    save(fg, "store", "play-feature-graphic-1024x500.png")
