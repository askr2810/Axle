// ============================================================
//  add_vgs_c.js – VIDEREGÅENDE, runde 2: Fysikk 2, Matematikk S1 og Kjemi 2
// ============================================================
NEWCOURSE({ code: "VGFY2", study: "vgs", group: "VGS: realfag", nb: "Fysikk 2", en: "Physics 2", s: ["F2", "P2"], eqText: VG_EQ("Vg3 programfag (LK20)", "Year 13 elective (Norwegian curriculum)"),
  units: [["Kast og bevegelse i to dimensjoner", "Projectiles and motion in two dimensions"], ["Sirkelbevegelse og gravitasjon", "Circular motion and gravitation"], ["Elektromagnetisme", "Electromagnetism"], ["Kvantefysikk og relativitet", "Quantum physics and relativity"]] });
NEWCOURSE({ code: "VGS1", study: "vgs", group: "VGS: matematikk", nb: "Matematikk S1", en: "Mathematics S1", s: ["S1", "S1"], eqText: VG_EQ("Vg2 samfunnsfaglig matematikk (LK20)", "Year 12, social science maths (Norwegian curriculum)"),
  units: [["Algebra og likninger", "Algebra and equations"], ["Funksjoner og modeller", "Functions and models"], ["Derivasjon og optimering", "Differentiation and optimisation"], ["Sannsynlighet", "Probability"]] });
NEWCOURSE({ code: "VGKJ2", study: "vgs", group: "VGS: realfag", nb: "Kjemi 2", en: "Chemistry 2", s: ["K2", "C2"], eqText: VG_EQ("Vg3 programfag (LK20)", "Year 13 elective (Norwegian curriculum)"),
  units: [["Kjemisk likevekt", "Chemical equilibrium"], ["Organisk kjemi", "Organic chemistry"], ["Buffere og titrering", "Buffers and titration"], ["Elektrokjemi", "Electrochemistry"]] });

(() => {
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };

// ================= VGFY2 0: Kast =================
TH("VGFY2", 0, `## Hva handler det om?
Et kast er bevegelse i to retninger samtidig: jevn fart vannrett og fritt fall loddrett. Del bevegelsen i en $x$-del og en $y$-del og regn på dem hver for seg.

## Begreper og formler
- Startfart $v_0$ med vinkel $\\alpha$: $v_{0x} = v_0\\cos\\alpha$, $v_{0y} = v_0\\sin\\alpha$.
- Vannrett: $x = v_{0x}t$. Loddrett: $y = v_{0y}t - \\tfrac12 gt^2$.
- Rekkevidde på flat mark: $R = \\dfrac{v_0^2\\sin 2\\alpha}{g}$ (størst ved 45°).
- Største høyde: $h = \\dfrac{v_{0y}^2}{2g}$.
- Vannrett kast fra høyde $h$: falltid $t = \\sqrt{2h/g}$, lengde $x = v_0 t$.

> Vannrett: konstant fart. Loddrett: fritt fall. Tiden binder dem sammen.`,
`## What is it about?
A projectile moves in two directions at once: constant velocity horizontally and free fall vertically. Split the motion into an $x$-part and a $y$-part and calculate them separately.

## Concepts and formulas
- Initial speed $v_0$ at angle $\\alpha$: $v_{0x} = v_0\\cos\\alpha$, $v_{0y} = v_0\\sin\\alpha$.
- Horizontal: $x = v_{0x}t$. Vertical: $y = v_{0y}t - \\tfrac12 gt^2$.
- Range on level ground: $R = \\dfrac{v_0^2\\sin 2\\alpha}{g}$ (largest at 45°).
- Maximum height: $h = \\dfrac{v_{0y}^2}{2g}$.
- Horizontal throw from height $h$: fall time $t = \\sqrt{2h/g}$, distance $x = v_0 t$.

> Horizontal: constant velocity. Vertical: free fall. Time links them together.`);
BIQ("VGFY2", 0, [
 ["Ved hvilken vinkel gir et kast på flat mark lengst rekkevidde (uten luftmotstand)?", ["45°", "30°", "60°", "90°"], "$\\sin 2\\alpha$ er størst når $2\\alpha = 90^\\circ$.", "At which angle does a throw on level ground give the longest range (without air resistance)?", ["45°", "30°", "60°", "90°"], "$\\sin 2\\alpha$ is largest when $2\\alpha = 90^\\circ$."],
 ["Hva er den vannrette akselerasjonen i et kast uten luftmotstand?", ["Null", "$g$", "$-g$", "Den avhenger av vinkelen"], "Tyngdekraften virker bare loddrett.", "What is the horizontal acceleration of a projectile without air resistance?", ["Zero", "$g$", "$-g$", "It depends on the angle"], "Gravity acts only vertically."]
]);
GEN("VGFY2", 0,
 () => { const v0 = R.p([10, 15, 20, 25, 30]), a = R.p([15, 30, 40, 45, 50, 60, 75]); const Rr = v0 * v0 * Math.sin(2 * a * DEG) / G_;
   return [T(`En ball kastes med ${v0} m/s i ${a}° vinkel over flat mark. Hvor langt går den? (Se bort fra luftmotstand.)`, `A ball is thrown at ${v0} m/s at ${a}° over level ground. How far does it go? (Ignore air resistance.)`), { n: Rr, tol: 0.05, u: "m" },
     T(`$R = \\dfrac{${v0}^2 \\sin ${2 * a}^\\circ}{9{,}81} \\approx ${mf(Rr, 2)}$ m.`, `$R = \\dfrac{${v0}^2 \\sin ${2 * a}^\\circ}{9.81} \\approx ${mf(Rr, 2)}$ m.`)]; },
 () => { const h = R.p([1.25, 2, 5, 10, 20, 45]), v0 = R.p([2, 4, 5, 8, 10]); const t = Math.sqrt(2 * h / G_), x = v0 * t;
   return [T(`En stein kastes vannrett med ${v0} m/s fra ${nf(h, 2)} m høyde. Hvor langt ut lander den?`, `A stone is thrown horizontally at ${v0} m/s from a height of ${nf(h, 2)} m. How far out does it land?`), { n: x, tol: 0.02, u: "m" },
     T(`Falltid $t = \\sqrt{2 \\cdot ${mf(h, 2)}/9{,}81} \\approx ${mf(t, 3)}$ s. $x = ${v0} \\cdot ${mf(t, 3)} \\approx ${mf(x, 2)}$ m.`, `Fall time $t = \\sqrt{2 \\cdot ${mf(h, 2)}/9.81} \\approx ${mf(t, 3)}$ s. $x = ${v0} \\cdot ${mf(t, 3)} \\approx ${mf(x, 2)}$ m.`)]; }
);

// ================= VGFY2 1: Sirkelbevegelse og gravitasjon =================
TH("VGFY2", 1, `## Hva handler det om?
Et legeme i sirkelbevegelse trenger en kraft rettet inn mot sentrum. For planeter og satellitter er det gravitasjonskraften.

## Begreper og formler
- Sentripetalakselerasjon $a = \\dfrac{v^2}{r}$, sentripetalkraft $F = \\dfrac{mv^2}{r}$.
- Newtons gravitasjonslov: $F = G\\dfrac{m_1m_2}{r^2}$, med $G = 6{,}67 \\cdot 10^{-11}\\ \\text{Nm}^2/\\text{kg}^2$.
- Banefart for en satellitt: $v = \\sqrt{\\dfrac{GM}{r}}$, der $r$ måles fra sentrum av planeten.
- Jordas masse $5{,}97 \\cdot 10^{24}$ kg og radius $6{,}37 \\cdot 10^{6}$ m.

> Sirkel: kraften peker inn mot sentrum. Gravitasjonen avtar med avstanden i andre.`,
`## What is it about?
A body in circular motion needs a force directed towards the centre. For planets and satellites that force is gravity.

## Concepts and formulas
- Centripetal acceleration $a = \\dfrac{v^2}{r}$, centripetal force $F = \\dfrac{mv^2}{r}$.
- Newton's law of gravitation: $F = G\\dfrac{m_1m_2}{r^2}$, with $G = 6.67 \\cdot 10^{-11}\\ \\text{Nm}^2/\\text{kg}^2$.
- Orbital speed of a satellite: $v = \\sqrt{\\dfrac{GM}{r}}$, where $r$ is measured from the centre of the planet.
- Earth's mass $5.97 \\cdot 10^{24}$ kg and radius $6.37 \\cdot 10^{6}$ m.

> Circle: the force points towards the centre. Gravity decreases with the square of the distance.`);
BIQ("VGFY2", 1, [
 ["Avstanden mellom to masser dobles. Hva skjer med gravitasjonskraften?", ["Den blir en firedel", "Den halveres", "Den dobles", "Den er uendret"], "$F \\propto 1/r^2$, så dobbel avstand gir $1/4$.", "The distance between two masses is doubled. What happens to the gravitational force?", ["It becomes a quarter", "It is halved", "It is doubled", "It is unchanged"], "$F \\propto 1/r^2$, so double the distance gives $1/4$."],
 ["Hvilken retning har akselerasjonen i jevn sirkelbevegelse?", ["Inn mot sentrum", "Langs banen", "Ut fra sentrum", "Den er null"], "Farten endrer retning hele tiden, og akselerasjonen peker inn mot sentrum.", "What direction does the acceleration have in uniform circular motion?", ["Towards the centre", "Along the path", "Away from the centre", "It is zero"], "The velocity changes direction all the time, and the acceleration points towards the centre."]
]);
GEN("VGFY2", 1,
 () => { const h = R.p([300, 400, 800, 2000, 20200, 35786]); const r = 6.37e6 + h * 1e3, v = Math.sqrt(6.67e-11 * 5.97e24 / r) / 1000;
   return [T(`En satellitt går i sirkelbane ${nf(h)} km over jordoverflaten. Hva er banefarten i km/s?`, `A satellite orbits ${nf(h)} km above the Earth's surface. What is its orbital speed in km/s?`), { n: v, tol: 0.02, u: "km/s" },
     T(`$r = 6{,}37 \\cdot 10^6 + ${mf(h * 1e3 / 1e6, 4)} \\cdot 10^6$ m. $v = \\sqrt{GM/r} \\approx ${mf(v, 2)}$ km/s.`, `$r = 6.37 \\cdot 10^6 + ${mf(h * 1e3 / 1e6, 4)} \\cdot 10^6$ m. $v = \\sqrt{GM/r} \\approx ${mf(v, 2)}$ km/s.`)]; },
 () => { const m = R.p([0.5, 1, 2, 5, 1000]), v = R.p([2, 4, 5, 10, 20]), r = R.p([0.5, 1, 2, 5, 50]); const F = m * v * v / r;
   return [T(`Et legeme med masse ${nf(m, 1)} kg går i en sirkel med radius ${nf(r, 1)} m og fart ${v} m/s. Hvor stor er sentripetalkraften?`, `A body of mass ${nf(m, 1)} kg moves in a circle of radius ${nf(r, 1)} m at ${v} m/s. How large is the centripetal force?`), { n: F, tol: rel(F, 0.002), u: "N" },
     T(`$F = \\dfrac{mv^2}{r} = \\dfrac{${mf(m, 1)} \\cdot ${v}^2}{${mf(r, 1)}} = ${mf(F, 1)}$ N.`, `$F = \\dfrac{mv^2}{r} = \\dfrac{${mf(m, 1)} \\cdot ${v}^2}{${mf(r, 1)}} = ${mf(F, 1)}$ N.`)]; }
);

// ================= VGFY2 2: Elektromagnetisme =================
TH("VGFY2", 2, `## Hva handler det om?
Elektrisitet og magnetisme henger sammen. Strøm lager magnetfelt, magnetfelt gir krefter på ladninger i bevegelse, og et magnetfelt som endrer seg, induserer spenning.

## Begreper og formler
- Kraft på ladning i bevegelse: $F = qvB$ (når farten står vinkelrett på feltet).
- Kraft på strømførende leder: $F = ILB$.
- En ladning i et homogent magnetfelt går i sirkel med radius $r = \\dfrac{mv}{qB}$.
- Indusert spenning i en leder som beveger seg: $\\varepsilon = vBL$. Faradays lov: $\\varepsilon = -\\dfrac{d\\Phi}{dt}$.
- Lenz' regel: den induserte strømmen motvirker endringen som skapte den.

> Endring i magnetisk fluks gir indusert spenning. Det er slik generatorer virker.`,
`## What is it about?
Electricity and magnetism are connected. Current creates magnetic fields, magnetic fields exert forces on moving charges, and a changing magnetic field induces a voltage.

## Concepts and formulas
- Force on a moving charge: $F = qvB$ (when the velocity is perpendicular to the field).
- Force on a current-carrying conductor: $F = ILB$.
- A charge in a uniform magnetic field moves in a circle with radius $r = \\dfrac{mv}{qB}$.
- Induced emf in a moving conductor: $\\varepsilon = vBL$. Faraday's law: $\\varepsilon = -\\dfrac{d\\Phi}{dt}$.
- Lenz's law: the induced current opposes the change that caused it.

> A change in magnetic flux induces a voltage. That is how generators work.`);
BIQ("VGFY2", 2, [
 ["Hva sier Lenz' regel?", ["Den induserte strømmen motvirker endringen som skapte den", "Strømmen er alltid null", "Feltet dobles", "Spenningen er konstant"], "Det er en følge av energibevaring.", "What does Lenz's law say?", ["The induced current opposes the change that caused it", "The current is always zero", "The field doubles", "The voltage is constant"], "It follows from conservation of energy."],
 ["Hva skjer med en ladning som beveger seg parallelt med et magnetfelt?", ["Den påvirkes ikke av magnetisk kraft", "Den går i sirkel", "Den stopper", "Den akselererer langs feltet"], "Magnetisk kraft krever en fartskomponent vinkelrett på feltet.", "What happens to a charge moving parallel to a magnetic field?", ["It experiences no magnetic force", "It moves in a circle", "It stops", "It accelerates along the field"], "The magnetic force requires a velocity component perpendicular to the field."]
]);
GEN("VGFY2", 2,
 () => { const v = R.p([2, 5, 10, 20]), B = R.p([0.1, 0.2, 0.5, 1.2]), L = R.p([0.1, 0.2, 0.5, 1]); const e = v * B * L;
   return [T(`En leder med lengde ${nf(L, 1)} m beveger seg med ${v} m/s vinkelrett på et magnetfelt på ${nf(B, 1)} T. Hvor stor spenning induseres?`, `A conductor of length ${nf(L, 1)} m moves at ${v} m/s perpendicular to a magnetic field of ${nf(B, 1)} T. How large is the induced emf?`), { n: e, tol: 0.001, u: "V" },
     T(`$\\varepsilon = vBL = ${v} \\cdot ${mf(B, 1)} \\cdot ${mf(L, 1)} = ${mf(e, 3)}$ V.`, `$\\varepsilon = vBL = ${v} \\cdot ${mf(B, 1)} \\cdot ${mf(L, 1)} = ${mf(e, 3)}$ V.`)]; },
 () => { const I = R.p([1, 2, 5, 10]), L = R.p([0.1, 0.2, 0.5]), B = R.p([0.05, 0.1, 0.4, 0.8]); const F = I * L * B;
   return [T(`En leder med lengde ${nf(L, 1)} m fører ${I} A vinkelrett på et magnetfelt på ${nf(B, 2)} T. Hvor stor kraft virker på den?`, `A conductor of length ${nf(L, 1)} m carries ${I} A perpendicular to a magnetic field of ${nf(B, 2)} T. How large is the force on it?`), { n: F, tol: 0.0005, u: "N" },
     T(`$F = ILB = ${I} \\cdot ${mf(L, 1)} \\cdot ${mf(B, 2)} = ${mf(F, 3)}$ N.`, `$F = ILB = ${I} \\cdot ${mf(L, 1)} \\cdot ${mf(B, 2)} = ${mf(F, 3)}$ N.`)]; }
);

// ================= VGFY2 3: Kvantefysikk og relativitet =================
TH("VGFY2", 3, `## Hva handler det om?
På veldig små skalaer oppfører lys seg som partikler (fotoner), og partikler som bølger. Ved fart nær lysfarten går klokker langsommere for den som beveger seg.

## Begreper og formler
- Fotoelektrisk effekt: $E_k = hf - W$, der $W$ er løsrivningsarbeidet. Energien til et foton i eV: $E \\approx \\dfrac{1240}{\\lambda\\,(\\text{nm})}$.
- de Broglie-bølgelengde: $\\lambda = \\dfrac{h}{p}$.
- Tidsforlengelse: $\\Delta t = \\gamma\\,\\Delta t_0$, med $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$.
- Lengdeforkortning: $L = L_0/\\gamma$. Energi og masse: $E = mc^2$.

> Høyere frekvens gir mer energi per foton. $\\gamma$ er alltid 1 eller større.`,
`## What is it about?
On very small scales light behaves like particles (photons), and particles like waves. At speeds close to the speed of light, clocks run slower for the one who is moving.

## Concepts and formulas
- Photoelectric effect: $E_k = hf - W$, where $W$ is the work function. The energy of a photon in eV: $E \\approx \\dfrac{1240}{\\lambda\\,(\\text{nm})}$.
- de Broglie wavelength: $\\lambda = \\dfrac{h}{p}$.
- Time dilation: $\\Delta t = \\gamma\\,\\Delta t_0$, with $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}}$.
- Length contraction: $L = L_0/\\gamma$. Energy and mass: $E = mc^2$.

> Higher frequency gives more energy per photon. $\\gamma$ is always 1 or larger.`);
BIQ("VGFY2", 3, [
 ["Hvorfor frigjør rødt lys ikke elektroner fra et metall, uansett intensitet, mens UV-lys gjør det?", ["Hvert rødt foton har for lite energi", "Rødt lys er for svakt", "UV-lys er varmere", "Metallet reflekterer rødt"], "Det er energien per foton ($hf$) som må være større enn løsrivningsarbeidet.",
  "Why does red light not release electrons from a metal, whatever the intensity, while UV light does?", ["Each red photon has too little energy", "Red light is too weak", "UV light is hotter", "The metal reflects red"], "It is the energy per photon ($hf$) that must exceed the work function."],
 ["Hva er $\\gamma$ når $v = 0{,}6c$?", { n: 1.25, tol: 0.001, u: "" }, "$\\gamma = 1/\\sqrt{1 - 0{,}36} = 1/0{,}8 = 1{,}25$.", "What is $\\gamma$ when $v = 0.6c$?", null, "$\\gamma = 1/\\sqrt{1 - 0.36} = 1/0.8 = 1.25$."]
]);
GEN("VGFY2", 3,
 () => { const b = R.p([0.5, 0.6, 0.8, 0.9, 0.95, 0.99]), t0 = R.p([1, 2, 5, 10]); const g = 1 / Math.sqrt(1 - b * b), t = g * t0;
   return [T(`Et romskip har fart ${nf(b, 2)}$c$. Om bord går det ${t0} år. Hvor lang tid går det for en observatør på jorda?`, `A spaceship moves at ${nf(b, 2)}$c$. On board ${t0} years pass. How much time passes for an observer on Earth?`), { n: t, tol: 0.01, u: T("år", "years") },
     T(`$\\gamma = 1/\\sqrt{1 - ${mf(b, 2)}^2} \\approx ${mf(g, 3)}$, så $\\Delta t = ${mf(g, 3)} \\cdot ${t0} \\approx ${mf(t, 2)}$ år.`, `$\\gamma = 1/\\sqrt{1 - ${mf(b, 2)}^2} \\approx ${mf(g, 3)}$, so $\\Delta t = ${mf(g, 3)} \\cdot ${t0} \\approx ${mf(t, 2)}$ years.`)]; },
 () => { const lam = R.p([200, 250, 300, 350, 400]), W = R.p([1.9, 2.3, 2.8, 4.3]); const E = 1240 / lam, Ek = E - W;
   if(Ek <= 0) return [T(`Et foton med bølgelengde ${lam} nm treffer et metall med løsrivningsarbeid ${nf(W, 1)} eV. Hva er fotonets energi i eV?`, `A photon with wavelength ${lam} nm hits a metal with work function ${nf(W, 1)} eV. What is the photon's energy in eV?`), { n: E, tol: 0.02, u: "eV" },
     T(`$E \\approx 1240/${lam} \\approx ${mf(E, 2)}$ eV.`, `$E \\approx 1240/${lam} \\approx ${mf(E, 2)}$ eV.`)];
   return [T(`Lys med bølgelengde ${lam} nm treffer et metall med løsrivningsarbeid ${nf(W, 1)} eV. Hva er den største kinetiske energien til elektronene i eV?`, `Light with wavelength ${lam} nm hits a metal with work function ${nf(W, 1)} eV. What is the maximum kinetic energy of the electrons in eV?`), { n: Ek, tol: 0.02, u: "eV" },
     T(`$E_\\text{foton} \\approx 1240/${lam} \\approx ${mf(E, 2)}$ eV. $E_k = ${mf(E, 2)} - ${mf(W, 1)} \\approx ${mf(Ek, 2)}$ eV.`, `$E_\\text{photon} \\approx 1240/${lam} \\approx ${mf(E, 2)}$ eV. $E_k = ${mf(E, 2)} - ${mf(W, 1)} \\approx ${mf(Ek, 2)}$ eV.`)]; }
);

// ================= VGS1 0: Algebra og likninger =================
TH("VGS1", 0, `## Hva handler det om?
I S1 trenger du sikker algebra: brøker med bokstaver, faktorisering og likninger av første og andre grad, også med brøk.

## Begreper og formler
- Brøkregler: $\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{ad + bc}{bd}$, $\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{ac}{bd}$, $\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}$.
- Faktoriser før du forkorter: $\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x-2)(x+2)}{x-2} = x + 2$ (for $x \\ne 2$).
- Likninger med brøk: gang alle ledd med fellesnevneren, og sjekk at løsningen ikke gjør en nevner lik null.
- Ulikheter: snu ulikhetstegnet når du ganger eller deler med et negativt tall.

> Faktoriser, forkort, og sjekk at nevneren aldri blir null.`,
`## What is it about?
In S1 you need solid algebra: fractions with letters, factorising, and first- and second-degree equations, also with fractions.

## Concepts and formulas
- Fraction rules: $\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{ad + bc}{bd}$, $\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{ac}{bd}$, $\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}$.
- Factorise before cancelling: $\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x-2)(x+2)}{x-2} = x + 2$ (for $x \\ne 2$).
- Equations with fractions: multiply every term by the common denominator, and check that the solution does not make a denominator zero.
- Inequalities: reverse the inequality sign when you multiply or divide by a negative number.

> Factorise, cancel, and check that the denominator never becomes zero.`);
BIQ("VGS1", 0, [
 ["Forkort $\\dfrac{x^2 - 9}{x + 3}$.", ["$x - 3$", "$x + 3$", "$x - 9$", "$x^2 - 3$"], "$x^2 - 9 = (x-3)(x+3)$, og $x + 3$ forkortes.", "Simplify $\\dfrac{x^2 - 9}{x + 3}$.", ["$x - 3$", "$x + 3$", "$x - 9$", "$x^2 - 3$"], "$x^2 - 9 = (x-3)(x+3)$, and $x + 3$ cancels."],
 ["Løs $-2x > 6$.", ["$x < -3$", "$x > -3$", "$x > 3$", "$x < 3$"], "Del på $-2$ og snu ulikhetstegnet.", "Solve $-2x > 6$.", ["$x < -3$", "$x > -3$", "$x > 3$", "$x < 3$"], "Divide by $-2$ and reverse the inequality sign."]
]);
GEN("VGS1", 0,
 () => { const a = R.p([2, 3, 4, 5]), b = R.p([2, 3, 4, 6]), x = R.i(-8, 12); const c = x / a + x / b;
   return [T(`Løs $\\dfrac{x}{${a}} + \\dfrac{x}{${b}} = ${mf(c, 4)}$.`, `Solve $\\dfrac{x}{${a}} + \\dfrac{x}{${b}} = ${mf(c, 4)}$.`), { n: x, tol: 0.01, u: "" },
     T(`Gang med ${a * b}: $${b}x + ${a}x = ${mf(c * a * b, 3)}$, så $x = ${x}$.`, `Multiply by ${a * b}: $${b}x + ${a}x = ${mf(c * a * b, 3)}$, so $x = ${x}$.`)]; }
);

// ================= VGS1 1: Funksjoner og modeller =================
TH("VGS1", 1, `## Hva handler det om?
Mange sammenhenger i samfunn og økonomi kan beskrives med funksjoner: kostnader, inntekter, befolkningsvekst og priser.

## Begreper og formler
- Lineær modell: fast økning per enhet, $f(x) = ax + b$.
- Eksponentiell modell: fast prosentvis økning, $f(x) = a \\cdot b^x$. Vekstfaktor $b = 1 + p/100$.
- Kostnad $K(x)$, inntekt $I(x) = p \\cdot x$ og overskudd $O(x) = I(x) - K(x)$.
- Nullpunktet til overskuddet er der det går i balanse (break-even).

> Fast tillegg: lineær. Fast prosent: eksponentiell.`,
`## What is it about?
Many relationships in society and the economy can be described with functions: costs, income, population growth and prices.

## Concepts and formulas
- Linear model: a fixed increase per unit, $f(x) = ax + b$.
- Exponential model: a fixed percentage increase, $f(x) = a \\cdot b^x$. Growth factor $b = 1 + p/100$.
- Cost $K(x)$, income $I(x) = p \\cdot x$ and profit $O(x) = I(x) - K(x)$.
- The zero of the profit function is where it breaks even.

> Fixed addition: linear. Fixed percentage: exponential.`);
BIQ("VGS1", 1, [
 ["En by vokser med 2 % per år. Hvilken modell passer?", ["Eksponentiell", "Lineær", "Andregrads", "Konstant"], "Fast prosentvis vekst gir eksponentiell modell med vekstfaktor 1,02.", "A town grows by 2% per year. Which model fits?", ["Exponential", "Linear", "Quadratic", "Constant"], "A fixed percentage growth gives an exponential model with growth factor 1.02."],
 ["Hva er overskudd?", ["Inntekt minus kostnad", "Kostnad minus inntekt", "Inntekt ganger kostnad", "Pris ganger antall"], "$O(x) = I(x) - K(x)$.", "What is profit?", ["Income minus cost", "Cost minus income", "Income times cost", "Price times quantity"], "$O(x) = I(x) - K(x)$."]
]);
GEN("VGS1", 1,
 () => { const a = R.p([1000, 5000, 20000, 250000]), p = R.p([1.5, 2, 3, 4, 5, -2, -5]), n = R.i(3, 15); const v = a * Math.pow(1 + p / 100, n);
   return [T(`En størrelse er ${nf(a)} i dag og ${p > 0 ? "øker" : "synker"} med ${nf(Math.abs(p), 1)} % per år. Hva er den om ${n} år?`, `A quantity is ${nf(a)} today and ${p > 0 ? "increases" : "decreases"} by ${nf(Math.abs(p), 1)}% per year. What is it in ${n} years?`), { n: v, tol: rel(v, 0.002), u: "" },
     T(`$${a} \\cdot ${mf(1 + p / 100, 3)}^{${n}} \\approx ${mf(v, 0)}$.`, `$${a} \\cdot ${mf(1 + p / 100, 3)}^{${n}} \\approx ${mf(v, 0)}$.`)]; },
 () => { const fixed = R.p([2000, 5000, 10000, 20000]), var_ = R.p([20, 40, 50, 80]), price = var_ + R.p([20, 30, 50, 100]); const be = fixed / (price - var_);
   return [T(`Faste kostnader er ${nf(fixed)} kr, og hver enhet koster ${var_} kr å lage. Salgsprisen er ${price} kr. Hvor mange enheter må selges for å gå i balanse?`, `Fixed costs are ${nf(fixed)} NOK, and each unit costs ${var_} NOK to make. The selling price is ${price} NOK. How many units must be sold to break even?`), { n: be, tol: 0.01, u: "" },
     T(`$O(x) = ${price}x - (${var_}x + ${fixed}) = 0$ gir $x = ${fixed}/${price - var_} = ${mf(be, 2)}$.`, `$O(x) = ${price}x - (${var_}x + ${fixed}) = 0$ gives $x = ${fixed}/${price - var_} = ${mf(be, 2)}$.`)]; }
);

// ================= VGS1 2: Derivasjon og optimering =================
TH("VGS1", 2, `## Hva handler det om?
Den deriverte viser hvor raskt noe endrer seg. I økonomi brukes den til å finne hvilken produksjon som gir størst overskudd.

## Begreper og formler
- $(ax^n)' = anx^{n-1}$.
- Grensekostnad $K'(x)$: hvor mye det koster å lage én enhet til. Grenseinntekt $I'(x)$.
- Størst overskudd der $O'(x) = 0$, altså der grenseinntekt = grensekostnad.
- For $O(x) = -ax^2 + bx - c$ (med $a > 0$) er toppunktet i $x = \\dfrac{b}{2a}$.

> Maks overskudd: $O'(x) = 0$. Sjekk at det er et toppunkt.`,
`## What is it about?
The derivative shows how fast something changes. In economics it is used to find which production level gives the largest profit.

## Concepts and formulas
- $(ax^n)' = anx^{n-1}$.
- Marginal cost $K'(x)$: how much it costs to make one more unit. Marginal revenue $I'(x)$.
- Largest profit where $O'(x) = 0$, i.e. where marginal revenue = marginal cost.
- For $O(x) = -ax^2 + bx - c$ (with $a > 0$) the maximum is at $x = \\dfrac{b}{2a}$.

> Maximum profit: $O'(x) = 0$. Check that it is a maximum.`);
BIQ("VGS1", 2, [
 ["Hva er grensekostnad?", ["Kostnaden ved å lage én enhet til, $K'(x)$", "Den største kostnaden", "Faste kostnader", "Gjennomsnittskostnaden"], "Grensekostnaden er den deriverte av kostnadsfunksjonen.", "What is marginal cost?", ["The cost of making one more unit, $K'(x)$", "The largest cost", "Fixed costs", "The average cost"], "The marginal cost is the derivative of the cost function."]
]);
GEN("VGS1", 2,
 () => { const a = R.p([0.5, 1, 2, 0.1]), x0 = R.p([20, 40, 50, 100, 150]), c = R.p([500, 1000, 2000]); const b = 2 * a * x0;
   return [T(`Overskuddet er $O(x) = ${pl([[-a, "x^2"], [b, "x"], [-c, ""]]).replace(/(\d)\.(\d)/g, "$1{,}$2")}$ kroner, der $x$ er antall enheter. Hvor mange enheter gir størst overskudd?`, `The profit is $O(x) = ${pl([[-a, "x^2"], [b, "x"], [-c, ""]])}$ NOK, where $x$ is the number of units. How many units give the largest profit?`), { n: x0, tol: 0.01, u: "" },
     T(`$O'(x) = ${mf(-2 * a, 2)}x + ${mf(b, 2)} = 0$ gir $x = ${x0}$.`, `$O'(x) = ${mf(-2 * a, 2)}x + ${mf(b, 2)} = 0$ gives $x = ${x0}$.`)]; },
 () => { const a = R.p([0.01, 0.02, 0.05]), b = R.p([10, 20, 30]), x = R.p([50, 100, 200]); const k = 2 * a * x + b;
   return [T(`Kostnaden er $K(x) = ${mf(a, 2)}x^2 + ${b}x + 5000$. Hva er grensekostnaden ved $x = ${x}$?`, `The cost is $K(x) = ${mf(a, 2)}x^2 + ${b}x + 5000$. What is the marginal cost at $x = ${x}$?`), { n: k, tol: 0.01, u: T("kr", "NOK") },
     T(`$K'(x) = ${mf(2 * a, 2)}x + ${b}$, så $K'(${x}) = ${mf(k, 2)}$ kr.`, `$K'(x) = ${mf(2 * a, 2)}x + ${b}$, so $K'(${x}) = ${mf(k, 2)}$ NOK.`)]; }
);

// ================= VGS1 3: Sannsynlighet =================
TH("VGS1", 3, `## Hva handler det om?
Sannsynlighet beskriver hvor sannsynlig noe er, fra 0 (umulig) til 1 (sikkert).

## Begreper og formler
- Uavhengige hendelser: $P(A \\cap B) = P(A) \\cdot P(B)$.
- Komplementsetningen: $P(\\text{minst én}) = 1 - P(\\text{ingen})$.
- Kombinasjoner: $\\binom{n}{k}$ måter å velge $k$ av $n$ uten rekkefølge.
- Hypergeometrisk: trekning uten tilbakelegging fra to grupper.

> «Minst én»: regn ut sannsynligheten for ingen, og trekk fra 1.`,
`## What is it about?
Probability describes how likely something is, from 0 (impossible) to 1 (certain).

## Concepts and formulas
- Independent events: $P(A \\cap B) = P(A) \\cdot P(B)$.
- The complement rule: $P(\\text{at least one}) = 1 - P(\\text{none})$.
- Combinations: $\\binom{n}{k}$ ways of choosing $k$ of $n$ without order.
- Hypergeometric: drawing without replacement from two groups.

> "At least one": calculate the probability of none, and subtract from 1.`);
BIQ("VGS1", 3, [
 ["Du kaster en mynt tre ganger. Hva er sannsynligheten for minst én kron?", ["$\\dfrac{7}{8}$", "$\\dfrac{1}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{8}$"], "$1 - P(\\text{ingen kron}) = 1 - (1/2)^3 = 7/8$.", "You toss a coin three times. What is the probability of at least one head?", ["$\\dfrac{7}{8}$", "$\\dfrac{1}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{8}$"], "$1 - P(\\text{no heads}) = 1 - (1/2)^3 = 7/8$."]
]);
GEN("VGS1", 3,
 () => { const p = R.p([0.05, 0.1, 0.2, 0.25, 0.3]), n = R.i(2, 8); const P = 1 - Math.pow(1 - p, n);
   return [T(`Sannsynligheten for at en vare er defekt er ${nf(p, 2)}. Du kjøper ${n} uavhengige varer. Hva er sannsynligheten for at minst én er defekt? (Tre desimaler.)`, `The probability that an item is defective is ${nf(p, 2)}. You buy ${n} independent items. What is the probability that at least one is defective? (Three decimals.)`), { n: P, tol: 0.001, u: "" },
     T(`$1 - ${mf(1 - p, 2)}^{${n}} \\approx ${mf(P, 3)}$.`, `$1 - ${mf(1 - p, 2)}^{${n}} \\approx ${mf(P, 3)}$.`)]; }
);

// ================= VGKJ2 0: Kjemisk likevekt =================
TH("VGKJ2", 0, `## Hva handler det om?
Mange reaksjoner går begge veier. Ved likevekt går de like raskt begge veier, og konsentrasjonene endrer seg ikke lenger.

## Begreper og formler
- For $a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}$: $K = \\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}$.
- Stor $K$: likevekten ligger mot produktene. Liten $K$: mot reaktantene.
- Le Châteliers prinsipp: et system i likevekt motvirker endringer. Tilsetter du reaktant, forskyves likevekten mot produktene.
- $K$ endres bare av temperaturen, ikke av konsentrasjon, trykk eller katalysator.

> Le Châtelier: systemet motvirker det du gjør med det.`,
`## What is it about?
Many reactions go both ways. At equilibrium they go equally fast in both directions, and the concentrations no longer change.

## Concepts and formulas
- For $a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}$: $K = \\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}$.
- A large $K$: the equilibrium lies towards the products. A small $K$: towards the reactants.
- Le Châtelier's principle: a system at equilibrium counteracts changes. If you add reactant, the equilibrium shifts towards the products.
- $K$ is changed only by temperature, not by concentration, pressure or a catalyst.

> Le Châtelier: the system counteracts what you do to it.`);
BIQ("VGKJ2", 0, [
 ["Hva endrer verdien av likevektskonstanten $K$?", ["Bare temperaturen", "Konsentrasjonen", "En katalysator", "Trykket"], "En katalysator gjør bare at likevekten innstiller seg raskere.", "What changes the value of the equilibrium constant $K$?", ["Only the temperature", "The concentration", "A catalyst", "The pressure"], "A catalyst only makes the equilibrium establish faster."],
 ["Du tilsetter mer reaktant til en likevekt. Hva skjer?", ["Likevekten forskyves mot produktene", "Likevekten forskyves mot reaktantene", "Ingenting", "$K$ øker"], "Systemet motvirker endringen ved å forbruke noe av den tilsatte reaktanten.", "You add more reactant to an equilibrium. What happens?", ["The equilibrium shifts towards the products", "The equilibrium shifts towards the reactants", "Nothing", "$K$ increases"], "The system counteracts the change by using up some of the added reactant."]
]);
GEN("VGKJ2", 0,
 () => { const a = R.p([0.1, 0.2, 0.5]), b = R.p([0.1, 0.3, 0.4]), c = R.p([0.2, 0.6, 0.8, 1.2]); const K = c * c / (a * b);
   return [T(`For likevekten $\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}$ er $[\\text{H}_2] = ${mf(a, 1)}$, $[\\text{I}_2] = ${mf(b, 1)}$ og $[\\text{HI}] = ${mf(c, 1)}$ mol/L. Regn ut $K$.`, `For the equilibrium $\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}$, $[\\text{H}_2] = ${mf(a, 1)}$, $[\\text{I}_2] = ${mf(b, 1)}$ and $[\\text{HI}] = ${mf(c, 1)}$ mol/L. Calculate $K$.`), { n: K, tol: rel(K, 0.005), u: "" },
     T(`$K = \\dfrac{${mf(c, 1)}^2}{${mf(a, 1)} \\cdot ${mf(b, 1)}} \\approx ${mf(K, 2)}$.`, `$K = \\dfrac{${mf(c, 1)}^2}{${mf(a, 1)} \\cdot ${mf(b, 1)}} \\approx ${mf(K, 2)}$.`)]; }
);

// ================= VGKJ2 1: Organisk kjemi =================
TH("VGKJ2", 1, `## Hva handler det om?
Organisk kjemi er kjemien til karbonforbindelser. Karbon danner fire bindinger og kan lage lange kjeder og ringer.

## Begreper
- Alkaner (bare enkeltbindinger) får navn etter antall karbonatomer: metan (1), etan (2), propan (3), butan (4), pentan (5), heksan (6), heptan (7), oktan (8).
- Alkener har minst én dobbeltbinding (-en), alkyner en trippelbinding (-yn).
- Funksjonelle grupper: alkohol (-OH), aldehyd (-CHO), keton (C=O inne i kjeden), karboksylsyre (-COOH), ester (-COO-), amin (-NH₂).
- Isomerer har samme molekylformel, men ulik struktur.
- Reaksjonstyper: addisjon (typisk for alkener), substitusjon, eliminasjon og kondensasjon (for eksempel esterdannelse).

> Navnet forteller antall karbonatomer (met-, et-, prop-, but- …) og endelsen forteller gruppen.`,
`## What is it about?
Organic chemistry is the chemistry of carbon compounds. Carbon forms four bonds and can make long chains and rings.

## Concepts
- Alkanes (only single bonds) are named after the number of carbon atoms: methane (1), ethane (2), propane (3), butane (4), pentane (5), hexane (6), heptane (7), octane (8).
- Alkenes have at least one double bond (-ene), alkynes a triple bond (-yne).
- Functional groups: alcohol (-OH), aldehyde (-CHO), ketone (C=O inside the chain), carboxylic acid (-COOH), ester (-COO-), amine (-NH₂).
- Isomers have the same molecular formula but different structures.
- Reaction types: addition (typical of alkenes), substitution, elimination and condensation (for example ester formation).

> The name tells the number of carbon atoms (meth-, eth-, prop-, but- …) and the ending tells the group.`);
BIQ("VGKJ2", 1, [
 ["Hvilken funksjonell gruppe har en alkohol?", ["-OH", "-COOH", "-NH₂", "-CHO"], "Etanol, C₂H₅OH, er et eksempel.", "Which functional group does an alcohol have?", ["-OH", "-COOH", "-NH₂", "-CHO"], "Ethanol, C₂H₅OH, is an example."],
 ["Hva dannes når en karboksylsyre reagerer med en alkohol?", ["En ester og vann", "En alkan", "En amin", "Et salt og hydrogen"], "Esterdannelse er en kondensasjonsreaksjon. Mange estere lukter godt.", "What forms when a carboxylic acid reacts with an alcohol?", ["An ester and water", "An alkane", "An amine", "A salt and hydrogen"], "Ester formation is a condensation reaction. Many esters smell nice."],
 ["Hvilken reaksjonstype er typisk for alkener?", ["Addisjon", "Substitusjon", "Nøytralisering", "Fisjon"], "Dobbeltbindingen åpnes og nye atomer bindes på.", "Which reaction type is typical of alkenes?", ["Addition", "Substitution", "Neutralisation", "Fission"], "The double bond opens and new atoms are attached."]
]);
const ALK = [["metan", "methane"], ["etan", "ethane"], ["propan", "propane"], ["butan", "butane"], ["pentan", "pentane"], ["heksan", "hexane"], ["heptan", "heptane"], ["oktan", "octane"]];
GEN("VGKJ2", 1,
 () => { const n = R.i(1, 8); const wrong = R.distinct(3, 1, 8, [n]);
   return [T(`Hva heter den rettkjedede alkanen med ${n} karbonatom${n > 1 ? "er" : ""}?`, `What is the name of the straight-chain alkane with ${n} carbon atom${n > 1 ? "s" : ""}?`),
     [T(ALK[n - 1][0], ALK[n - 1][1]), ...wrong.map(k => T(ALK[k - 1][0], ALK[k - 1][1]))],
     T(`Met-, et-, prop-, but-, pent-, heks-, hept-, okt- betyr 1 til 8 karbonatomer, så ${n} gir ${ALK[n - 1][0]}.`, `Meth-, eth-, prop-, but-, pent-, hex-, hept-, oct- mean 1 to 8 carbon atoms, so ${n} gives ${ALK[n - 1][1]}.`)]; }
);

// ================= VGKJ2 2: Buffere og titrering =================
TH("VGKJ2", 2, `## Hva handler det om?
En buffer holder pH nesten konstant. Titrering brukes til å finne en ukjent konsentrasjon.

## Begreper og formler
- Bufferlikningen: $\\text{pH} = \\text{p}K_a + \\lg\\dfrac{[\\text{base}]}{[\\text{syre}]}$.
- Når syre og base er like konsentrert, er $\\text{pH} = \\text{p}K_a$. Da er bufferen best.
- Titrering: ved ekvivalenspunktet har tilsatt stoffmengde base reagert med all syren: $c_1V_1 = c_2V_2$ (for 1:1-reaksjoner).
- En indikator skifter farge nær ekvivalenspunktet.

> Buffer: $\\text{pH} = \\text{p}K_a + \\lg(\\text{base}/\\text{syre})$. Titrering: $c_1V_1 = c_2V_2$.`,
`## What is it about?
A buffer keeps the pH almost constant. Titration is used to find an unknown concentration.

## Concepts and formulas
- The buffer equation: $\\text{pH} = \\text{p}K_a + \\lg\\dfrac{[\\text{base}]}{[\\text{acid}]}$.
- When acid and base are equally concentrated, $\\text{pH} = \\text{p}K_a$. The buffer is then at its best.
- Titration: at the equivalence point, the added amount of base has reacted with all the acid: $c_1V_1 = c_2V_2$ (for 1:1 reactions).
- An indicator changes colour near the equivalence point.

> Buffer: $\\text{pH} = \\text{p}K_a + \\lg(\\text{base}/\\text{acid})$. Titration: $c_1V_1 = c_2V_2$.`);
BIQ("VGKJ2", 2, [
 ["En buffer har like mye svak syre som base. Hva er pH?", ["Lik $\\text{p}K_a$", "7", "0", "14"], "$\\lg 1 = 0$, så $\\text{pH} = \\text{p}K_a$.", "A buffer has equal amounts of weak acid and base. What is the pH?", ["Equal to $\\text{p}K_a$", "7", "0", "14"], "$\\lg 1 = 0$, so $\\text{pH} = \\text{p}K_a$."]
]);
GEN("VGKJ2", 2,
 () => { const pKa = R.p([4.76, 3.75, 7.21, 9.25]), base = R.p([0.05, 0.1, 0.2, 0.3]), acid = R.p([0.05, 0.1, 0.2, 0.3]); const pH = pKa + Math.log10(base / acid);
   return [T(`En buffer har $\\text{p}K_a = ${mf(pKa, 2)}$, [base] = ${nf(base, 2)} mol/L og [syre] = ${nf(acid, 2)} mol/L. Hva er pH?`, `A buffer has $\\text{p}K_a = ${mf(pKa, 2)}$, [base] = ${nf(base, 2)} mol/L and [acid] = ${nf(acid, 2)} mol/L. What is the pH?`), { n: pH, tol: 0.01, u: "" },
     T(`$\\text{pH} = ${mf(pKa, 2)} + \\lg\\dfrac{${mf(base, 2)}}{${mf(acid, 2)}} \\approx ${mf(pH, 2)}$.`, `$\\text{pH} = ${mf(pKa, 2)} + \\lg\\dfrac{${mf(base, 2)}}{${mf(acid, 2)}} \\approx ${mf(pH, 2)}$.`)]; },
 () => { const cb = R.p([0.1, 0.2, 0.05]), Vb = R.p([12.5, 15, 20, 25, 18.4]), Va = R.p([10, 20, 25]); const ca = cb * Vb / Va;
   return [T(`${Va} mL saltsyre titreres med ${nf(cb, 2)} mol/L NaOH. Ekvivalenspunktet nås etter ${nf(Vb, 1)} mL. Hva er konsentrasjonen av saltsyren?`, `${Va} mL of hydrochloric acid is titrated with ${nf(cb, 2)} mol/L NaOH. The equivalence point is reached after ${nf(Vb, 1)} mL. What is the concentration of the acid?`), { n: ca, tol: rel(ca, 0.005), u: "mol/L" },
     T(`$c_1 = \\dfrac{c_2V_2}{V_1} = \\dfrac{${mf(cb, 2)} \\cdot ${mf(Vb, 1)}}{${Va}} \\approx ${mf(ca, 4)}$ mol/L.`, `$c_1 = \\dfrac{c_2V_2}{V_1} = \\dfrac{${mf(cb, 2)} \\cdot ${mf(Vb, 1)}}{${Va}} \\approx ${mf(ca, 4)}$ mol/L.`)]; }
);

// ================= VGKJ2 3: Elektrokjemi =================
TH("VGKJ2", 3, `## Hva handler det om?
I en galvanisk celle (et batteri) gir en spontan redoksreaksjon strøm. I elektrolyse bruker man strøm til å drive en reaksjon som ellers ikke går.

## Begreper og formler
- Anoden: oksidasjon. Katoden: reduksjon.
- Cellespenning: $E^\\circ_\\text{celle} = E^\\circ_\\text{katode} - E^\\circ_\\text{anode}$ (standard reduksjonspotensialer).
- Eksempler: $\\text{Ag}^+/\\text{Ag}$ +0,80 V, $\\text{Cu}^{2+}/\\text{Cu}$ +0,34 V, $\\text{Pb}^{2+}/\\text{Pb}$ −0,13 V, $\\text{Ni}^{2+}/\\text{Ni}$ −0,26 V, $\\text{Fe}^{2+}/\\text{Fe}$ −0,44 V, $\\text{Zn}^{2+}/\\text{Zn}$ −0,76 V.
- Metallet med lavest potensial blir anoden (oksideres).

> Katoden har høyest reduksjonspotensial. $E = E_\\text{katode} - E_\\text{anode}$.`,
`## What is it about?
In a galvanic cell (a battery) a spontaneous redox reaction produces a current. In electrolysis, current is used to drive a reaction that would not otherwise happen.

## Concepts and formulas
- The anode: oxidation. The cathode: reduction.
- Cell voltage: $E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode}$ (standard reduction potentials).
- Examples: $\\text{Ag}^+/\\text{Ag}$ +0.80 V, $\\text{Cu}^{2+}/\\text{Cu}$ +0.34 V, $\\text{Pb}^{2+}/\\text{Pb}$ −0.13 V, $\\text{Ni}^{2+}/\\text{Ni}$ −0.26 V, $\\text{Fe}^{2+}/\\text{Fe}$ −0.44 V, $\\text{Zn}^{2+}/\\text{Zn}$ −0.76 V.
- The metal with the lowest potential becomes the anode (is oxidised).

> The cathode has the highest reduction potential. $E = E_\\text{cathode} - E_\\text{anode}$.`);
BIQ("VGKJ2", 3, [
 ["Hva skjer ved anoden i en galvanisk celle?", ["Oksidasjon", "Reduksjon", "Ingenting", "Nøytralisering"], "Huskeregel: anode–oksidasjon (begge begynner med vokal), katode–reduksjon.", "What happens at the anode in a galvanic cell?", ["Oxidation", "Reduction", "Nothing", "Neutralisation"], "Mnemonic: anode–oxidation (both begin with a vowel), cathode–reduction."]
]);
const POT = [["Ag", 0.80], ["Cu", 0.34], ["Pb", -0.13], ["Ni", -0.26], ["Fe", -0.44], ["Zn", -0.76]];
GEN("VGKJ2", 3,
 () => { const [i, j] = R.distinct(2, 0, POT.length - 1).sort((a, b) => a - b); const cat = POT[i], an = POT[j], E = cat[1] - an[1];
   return [T(`En galvanisk celle lages med ${cat[0]} og ${an[0]} (standardforhold). Hva er cellespenningen?`, `A galvanic cell is made with ${cat[0]} and ${an[0]} (standard conditions). What is the cell voltage?`), { n: E, tol: 0.005, u: "V" },
     T(`Katode: ${cat[0]} (${nf(cat[1], 2)} V). Anode: ${an[0]} (${nf(an[1], 2)} V). $E = ${mf(cat[1], 2)} - (${mf(an[1], 2)}) = ${mf(E, 2)}$ V.`, `Cathode: ${cat[0]} (${nf(cat[1], 2)} V). Anode: ${an[0]} (${nf(an[1], 2)} V). $E = ${mf(cat[1], 2)} - (${mf(an[1], 2)}) = ${mf(E, 2)}$ V.`)]; }
);
})();
