// ============================================================
//  GFYS – Grunnleggende fysikk, enhet 0–2
//  0: Størrelser, enheter og måling  1: Bevegelse  2: Krefter og Newtons lover
//  Teori (nb/en), 8 faste oppgaver og 6 generatorer per enhet.
// ============================================================
(() => {
// tall med fast antall desimaler (viser gjeldende siffer, f.eks. 2,50): i matte og i tekst
const fxm = (x, d) => { const s = x.toFixed(d); return T(s.replace(".", "{,}"), s); };

// ================= Enhet 0: Størrelser, enheter og måling =================
THEORY("GFYS", 0, {
nb: `## Hva handler det om?
All fysikk handler om å måle og regne med **størrelser** som lengde, tid, masse, fart og kraft. En fysisk størrelse er alltid et **tall ganger en enhet**. «Lengden er 3» sier ingenting – 3 mm og 3 km er svært forskjellige ting.

For en ingeniør kan en enhetsfeil bli dyr: en bjelke som er regnet med N der det skulle stått kN, er tusen ganger for svak. Her lærer du derfor SI-systemet, prefikser som kilo og milli, hvordan du regner om mellom enheter, og hvor mange siffer det er rimelig å ta med i et svar.

## Begreper og formler
- **Størrelse = tallverdi · enhet**, for eksempel $m = 2{,}5\\ \\mathrm{kg}$. Symbolet ($m$) skrives i kursiv, enheten (kg) rett.
- **SI-grunnenheter:** meter (m) for lengde, kilogram (kg) for masse, sekund (s) for tid, ampere (A) for elektrisk strøm, kelvin (K) for temperatur, mol for stoffmengde og candela (cd) for lysstyrke.
- **Avledede enheter** er bygd av grunnenhetene: fart i m/s, akselerasjon i m/s², kraft i newton ($1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$), energi i joule ($1\\ \\mathrm{J} = 1\\ \\mathrm{N\\cdot m}$), effekt i watt ($1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}$) og trykk i pascal ($1\\ \\mathrm{Pa} = 1\\ \\mathrm{N/m^2}$).
- **Prefikser** er tierpotenser foran enheten: giga (G) $= 10^9$, mega (M) $= 10^6$, kilo (k) $= 10^3$, centi (c) $= 10^{-2}$, milli (m) $= 10^{-3}$, mikro (µ) $= 10^{-6}$ og nano (n) $= 10^{-9}$.
- **Areal og volum:** omregningsfaktoren må også opphøyes. Siden $1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$, er $1\\ \\mathrm{m^2} = 100^2\\ \\mathrm{cm^2} = 10^4\\ \\mathrm{cm^2}$ og $1\\ \\mathrm{m^3} = 10^6\\ \\mathrm{cm^3}$. For væsker brukes liter: $1\\ \\mathrm{L} = 1\\ \\mathrm{dm^3}$ og $1\\ \\mathrm{m^3} = 1000\\ \\mathrm{L}$.
- **Fart:** $1\\ \\mathrm{m/s} = 3{,}6\\ \\mathrm{km/h}$. Fra km/h til m/s deler du på 3,6.
- **Gjeldende siffer** er sifrene som bærer informasjon. Nuller foran teller ikke ($0{,}0052$ har 2), mens nuller mellom andre sifre og nuller bakerst etter komma teller ($4{,}05$ og $3{,}40$ har 3). Ved ganging og deling skal svaret ha like mange gjeldende siffer som tallet med færrest.
- **Måleusikkerhet:** en måling skrives $x \\pm \\Delta x$. Den relative usikkerheten er $\\Delta x / x$, ofte oppgitt i prosent. Ved ganging og deling legger vi sammen de relative usikkerhetene.

## Slik løser du oppgavene
1. Skriv opp alle gitte størrelser med tall **og** enhet.
2. Gjør om til SI-grunnenheter (m, kg, s) før du setter inn i en formel. Bytt ut prefiksene med tierpotenser.
3. Regn om ved å gange med en brøk som er lik 1, for eksempel $\\frac{1000\\ \\mathrm{m}}{1\\ \\mathrm{km}}$ eller $\\frac{1\\ \\mathrm{h}}{3600\\ \\mathrm{s}}$. Enhetene forkortes akkurat som tall.
4. Kontroller enheten i svaret. Får du m/s når du skulle ha en lengde, er det feil i formelen.
5. Rund av til et rimelig antall gjeldende siffer til slutt – ikke underveis.

### Eksempel
En bil kjører med konstant fart 72 km/h. Hvor langt kjører den på 2,5 minutter?

1. Fart i SI: $72\\ \\mathrm{km/h} = \\frac{72\\cdot 1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = 20\\ \\mathrm{m/s}$.
2. Tid i SI: $2{,}5\\ \\mathrm{min} = 2{,}5\\cdot 60\\ \\mathrm{s} = 150\\ \\mathrm{s}$.
3. Strekning: $s = vt = 20\\ \\mathrm{m/s}\\cdot 150\\ \\mathrm{s} = 3000\\ \\mathrm{m}$.
4. Enhetskontroll: $\\mathrm{m/s}\\cdot\\mathrm{s} = \\mathrm{m}$, altså en lengde.

Svaret er 3,0 km. Vi oppgir to gjeldende siffer fordi 2,5 har to.

### Eksempel: måleusikkerhet
En plate måles til $a = 2{,}50 \\pm 0{,}02$ m og $b = 1{,}20 \\pm 0{,}01$ m. Arealet er $A = ab = 3{,}00\\ \\mathrm{m^2}$. De relative usikkerhetene er $0{,}02/2{,}50 = 0{,}8\\ \\%$ og $0{,}01/1{,}20 \\approx 0{,}8\\ \\%$, til sammen omtrent $1{,}6\\ \\%$. Da er $\\Delta A \\approx 0{,}016\\cdot 3{,}00 \\approx 0{,}05\\ \\mathrm{m^2}$, så $A = 3{,}00 \\pm 0{,}05\\ \\mathrm{m^2}$.

## Vanlige feil
- Å sette km/h rett inn i formler. Gjør om til m/s først (del på 3,6).
- Å tro at $1\\ \\mathrm{m^2} = 100\\ \\mathrm{cm^2}$. Riktig er $10\\,000\\ \\mathrm{cm^2}$, fordi både lengden og bredden skal regnes om.
- Å blande masse (kg) og tyngde (N). Et kilogram er ikke en kraft.
- Å skrive av alle sifrene fra kalkulatoren. Svaret kan ikke være mer nøyaktig enn målingene det bygger på.
- Å regne nuller foran tallet som gjeldende siffer: $0{,}004$ har bare ett.
- Å forveksle m for milli med m for meter: mN er millinewton, mens N·m (newtonmeter) er kraft ganger arm.

> Regn alltid i SI-enheter (m, kg, s), og ta med enheten i hvert mellomsteg. Da avslører enheten de fleste feil.`,
en: `## What is it about?
All of physics is about measuring and calculating with **quantities** such as length, time, mass, speed and force. A physical quantity is always a **number times a unit**. "The length is 3" tells you nothing – 3 mm and 3 km are very different things.

For an engineer, a unit error can be expensive: a beam calculated in N where it should have said kN is a thousand times too weak. This unit therefore covers the SI system, prefixes such as kilo and milli, how to convert between units, and how many digits it is reasonable to keep in an answer.

## Concepts and formulas
- **Quantity = numerical value × unit**, for example $m = 2.5\\ \\mathrm{kg}$. The symbol ($m$) is written in italics, the unit (kg) upright.
- **SI base units:** meter (m) for length, kilogram (kg) for mass, second (s) for time, ampere (A) for electric current, kelvin (K) for temperature, mole (mol) for amount of substance and candela (cd) for luminous intensity.
- **Derived units** are built from the base units: velocity in m/s, acceleration in m/s², force in newtons ($1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$), energy in joules ($1\\ \\mathrm{J} = 1\\ \\mathrm{N\\cdot m}$), power in watts ($1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}$) and pressure in pascals ($1\\ \\mathrm{Pa} = 1\\ \\mathrm{N/m^2}$).
- **Prefixes** are powers of ten placed in front of the unit: giga (G) $= 10^9$, mega (M) $= 10^6$, kilo (k) $= 10^3$, centi (c) $= 10^{-2}$, milli (m) $= 10^{-3}$, micro (µ) $= 10^{-6}$ and nano (n) $= 10^{-9}$.
- **Area and volume:** the conversion factor must be squared or cubed as well. Since $1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$, we get $1\\ \\mathrm{m^2} = 100^2\\ \\mathrm{cm^2} = 10^4\\ \\mathrm{cm^2}$ and $1\\ \\mathrm{m^3} = 10^6\\ \\mathrm{cm^3}$. Liquids are measured in liters: $1\\ \\mathrm{L} = 1\\ \\mathrm{dm^3}$ and $1\\ \\mathrm{m^3} = 1000\\ \\mathrm{L}$.
- **Speed:** $1\\ \\mathrm{m/s} = 3.6\\ \\mathrm{km/h}$. To go from km/h to m/s, divide by 3.6.
- **Significant figures** are the digits that carry information. Leading zeros do not count ($0.0052$ has 2), while zeros between other digits and trailing zeros after the decimal point do ($4.05$ and $3.40$ have 3). When multiplying or dividing, the result gets as many significant figures as the factor with the fewest.
- **Measurement uncertainty:** a measurement is written $x \\pm \\Delta x$. The relative uncertainty is $\\Delta x / x$, often given in percent. When multiplying or dividing, we add the relative uncertainties.

## How to solve the problems
1. Write down every given quantity with its number **and** its unit.
2. Convert to SI base units (m, kg, s) before substituting into a formula. Replace prefixes with powers of ten.
3. Convert by multiplying by a fraction equal to 1, for example $\\frac{1000\\ \\mathrm{m}}{1\\ \\mathrm{km}}$ or $\\frac{1\\ \\mathrm{h}}{3600\\ \\mathrm{s}}$. Units cancel just like numbers.
4. Check the unit of the answer. If you get m/s when you wanted a length, the formula is wrong.
5. Round to a sensible number of significant figures at the end – not along the way.

### Example
A car drives at a constant 72 km/h. How far does it travel in 2.5 minutes?

1. Speed in SI: $72\\ \\mathrm{km/h} = \\frac{72\\cdot 1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = 20\\ \\mathrm{m/s}$.
2. Time in SI: $2.5\\ \\mathrm{min} = 2.5\\cdot 60\\ \\mathrm{s} = 150\\ \\mathrm{s}$.
3. Distance: $s = vt = 20\\ \\mathrm{m/s}\\cdot 150\\ \\mathrm{s} = 3000\\ \\mathrm{m}$.
4. Unit check: $\\mathrm{m/s}\\cdot\\mathrm{s} = \\mathrm{m}$, which is a length.

The answer is 3.0 km. We give two significant figures because 2.5 has two.

### Example: measurement uncertainty
A plate is measured as $a = 2.50 \\pm 0.02$ m and $b = 1.20 \\pm 0.01$ m. The area is $A = ab = 3.00\\ \\mathrm{m^2}$. The relative uncertainties are $0.02/2.50 = 0.8\\ \\%$ and $0.01/1.20 \\approx 0.8\\ \\%$, about $1.6\\ \\%$ in total. So $\\Delta A \\approx 0.016\\cdot 3.00 \\approx 0.05\\ \\mathrm{m^2}$, and $A = 3.00 \\pm 0.05\\ \\mathrm{m^2}$.

## Common mistakes
- Plugging km/h straight into formulas. Convert to m/s first (divide by 3.6).
- Thinking that $1\\ \\mathrm{m^2} = 100\\ \\mathrm{cm^2}$. It is $10\\,000\\ \\mathrm{cm^2}$, because both the length and the width must be converted.
- Mixing up mass (kg) and weight (N). A kilogram is not a force.
- Copying every digit from the calculator. The answer cannot be more precise than the measurements it is based on.
- Counting leading zeros as significant: $0.004$ has only one.
- Confusing m for milli with m for meter: mN is a millinewton, while N·m (newton meter) is force times lever arm.

> Always calculate in SI units (m, kg, s) and carry the unit through every step. The unit will then reveal most mistakes.`
});

BIQ("GFYS", 0, [
 [`Hva er SI-grunnenheten for masse?`, [`kilogram (kg)`, `gram (g)`, `newton (N)`, `pund (lb)`],
  `Kilogram er grunnenheten for masse i SI (det eneste grunnenheten med prefiks i navnet). Newton er en enhet for kraft, ikke masse.`,
  `What is the SI base unit of mass?`, [`kilogram (kg)`, `gram (g)`, `newton (N)`, `pound (lb)`],
  `The kilogram is the SI base unit of mass (the only base unit with a prefix in its name). The newton is a unit of force, not mass.`],
 [`Hva betyr prefikset mikro (µ), som i µm?`, [`$10^{-6}$`, `$10^{-3}$`, `$10^{-9}$`, `$10^{6}$`],
  `mikro = $10^{-6}$, milli = $10^{-3}$ og nano = $10^{-9}$. Altså er $1\\ \\mu\\mathrm{m} = 10^{-6}$ m, en tusendels millimeter.`,
  `What does the prefix micro (µ) mean, as in µm?`, [`$10^{-6}$`, `$10^{-3}$`, `$10^{-9}$`, `$10^{6}$`],
  `micro = $10^{-6}$, milli = $10^{-3}$ and nano = $10^{-9}$. So $1\\ \\mu\\mathrm{m} = 10^{-6}$ m, a thousandth of a millimeter.`],
 [`Hvilket uttrykk er newton (N) skrevet med SI-grunnenheter?`, [`$\\mathrm{kg\\cdot m/s^2}$`, `$\\mathrm{kg\\cdot m/s}$`, `$\\mathrm{kg\\cdot m^2/s^2}$`, `$\\mathrm{kg/s^2}$`],
  `Newtons 2. lov $F = ma$ gir kg ganger m/s², altså $1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$. ($\\mathrm{kg\\cdot m^2/s^2}$ er joule, og $\\mathrm{kg\\cdot m/s}$ er enheten for bevegelsesmengde.)`,
  `Which expression is the newton (N) written in SI base units?`, [`$\\mathrm{kg\\cdot m/s^2}$`, `$\\mathrm{kg\\cdot m/s}$`, `$\\mathrm{kg\\cdot m^2/s^2}$`, `$\\mathrm{kg/s^2}$`],
  `Newton's second law $F = ma$ gives kg times m/s², so $1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$. ($\\mathrm{kg\\cdot m^2/s^2}$ is the joule, and $\\mathrm{kg\\cdot m/s}$ is the unit of momentum.)`],
 [`La $s$ være strekning (m), $v$ fart (m/s), $a$ akselerasjon (m/s²) og $t$ tid (s). Hvilken formel kan være riktig, bare ut fra enhetene?`, [`$s = \\tfrac12 at^2$`, `$s = \\tfrac12 at$`, `$s = vt^2$`, `$s = v/t$`],
  `Begge sider må ha samme enhet. $at^2$ gir $\\mathrm{m/s^2}\\cdot\\mathrm{s^2} = \\mathrm{m}$, som er en lengde. $at$ gir m/s, $vt^2$ gir m·s og $v/t$ gir m/s². Tallfaktoren $\\tfrac12$ har ingen enhet.`,
  `Let $s$ be distance (m), $v$ speed (m/s), $a$ acceleration (m/s²) and $t$ time (s). Based on units alone, which formula could be correct?`, [`$s = \\tfrac12 at^2$`, `$s = \\tfrac12 at$`, `$s = vt^2$`, `$s = v/t$`],
  `Both sides must have the same unit. $at^2$ gives $\\mathrm{m/s^2}\\cdot\\mathrm{s^2} = \\mathrm{m}$, which is a length. $at$ gives m/s, $vt^2$ gives m·s and $v/t$ gives m/s². The factor $\\tfrac12$ has no unit.`],
 [`Du regner ut arealet $A = 2{,}5\\ \\mathrm{m}\\cdot 3{,}142\\ \\mathrm{m}$, og kalkulatoren viser 7,855. Hvordan bør svaret oppgis?`, [`7,9 m²`, `7,855 m²`, `7,86 m²`, `8 m²`],
  `Ved ganging bestemmer tallet med færrest gjeldende siffer. 2,5 har 2 gjeldende siffer, så svaret skal også ha 2: 7,9 m².`,
  `You calculate the area $A = 2.5\\ \\mathrm{m}\\cdot 3.142\\ \\mathrm{m}$, and the calculator shows 7.855. How should the answer be given?`, [`7.9 m²`, `7.855 m²`, `7.86 m²`, `8 m²`],
  `When multiplying, the factor with the fewest significant figures decides. 2.5 has 2 significant figures, so the answer should also have 2: 7.9 m².`],
 [`Hva er 90 km/h i m/s?`, {n: 25, tol: 0.1, u: "m/s"},
  `$90\\ \\mathrm{km/h} = \\dfrac{90\\cdot 1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = 90/3{,}6 = 25$ m/s.`,
  `What is 90 km/h in m/s?`, null,
  `$90\\ \\mathrm{km/h} = \\dfrac{90\\cdot 1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = 90/3.6 = 25$ m/s.`],
 [`En tank rommer 0,35 m³. Hvor mange liter er det?`, {n: 350, tol: 1, u: "L"},
  `$1\\ \\mathrm{m^3} = 1000\\ \\mathrm{dm^3} = 1000\\ \\mathrm{L}$, så $0{,}35\\cdot 1000 = 350$ L.`,
  `A tank holds 0.35 m³. How many liters is that?`, null,
  `$1\\ \\mathrm{m^3} = 1000\\ \\mathrm{dm^3} = 1000\\ \\mathrm{L}$, so $0.35\\cdot 1000 = 350$ L.`],
 [`Stål har tettheten 7,85 g/cm³. Hva er tettheten i kg/m³?`, {n: 7850, tol: 10, u: "kg/m³"},
  `$1\\ \\mathrm{g} = 10^{-3}\\ \\mathrm{kg}$ og $1\\ \\mathrm{cm^3} = 10^{-6}\\ \\mathrm{m^3}$. Da blir $7{,}85\\ \\mathrm{g/cm^3} = 7{,}85\\cdot\\dfrac{10^{-3}\\ \\mathrm{kg}}{10^{-6}\\ \\mathrm{m^3}} = 7850$ kg/m³.`,
  `Steel has a density of 7.85 g/cm³. What is the density in kg/m³?`, null,
  `$1\\ \\mathrm{g} = 10^{-3}\\ \\mathrm{kg}$ and $1\\ \\mathrm{cm^3} = 10^{-6}\\ \\mathrm{m^3}$. So $7.85\\ \\mathrm{g/cm^3} = 7.85\\cdot\\dfrac{10^{-3}\\ \\mathrm{kg}}{10^{-6}\\ \\mathrm{m^3}} = 7850$ kg/m³.`]
]);

GEN("GFYS", 0,
 // 0: prefiks (ett steg)
 ()=>{ const c=R.p([["km","m",1000,0.2,9.5,0.1],["mm","m",0.001,20,950,10],["g","kg",0.001,50,950,10],["kN","N",1000,1.5,25,0.5],
     ["ms","s",0.001,20,900,10],["cm","m",0.01,5,95,1],["MW","kW",1000,1.2,9.5,0.1],["µm","mm",0.001,50,900,10]]);
   const x=R.f(c[3],c[4],c[5]), y=x*c[2];
   return [T(`Hva er ${nf(x)} ${c[0]} uttrykt i ${c[1]}?`,`What is ${nf(x)} ${c[0]} expressed in ${c[1]}?`),{n:y,tol:rel(y),u:c[1]},
     T(`Prefikset gir 1 ${c[0]} = ${nf(c[2])} ${c[1]}, så $${mf(x)}\\cdot ${mf(c[2])} = ${mf(y)}$ ${c[1]}.`,
       `The prefix gives 1 ${c[0]} = ${nf(c[2])} ${c[1]}, so $${mf(x)}\\cdot ${mf(c[2])} = ${mf(y)}$ ${c[1]}.`)]; },
 // 1: km/h <-> m/s
 ()=>{ const dir=R.i(0,1), v=dir?R.f(1.5,45,0.5):R.i(18,144), w=dir?v*3.6:v/3.6;
   if(dir) return [T(`Hva er ${nf(v)} m/s i km/h?`,`What is ${nf(v)} m/s in km/h?`),{n:w,tol:rel(w),u:"km/h"},
     T(`Gang med 3,6: $${mf(v)}\\cdot 3{,}6 = ${mf(w)}$ km/h, fordi $1\\ \\mathrm{m/s} = 3600\\ \\mathrm{m/h} = 3{,}6\\ \\mathrm{km/h}$.`,
       `Multiply by 3.6: $${mf(v)}\\cdot 3.6 = ${mf(w)}$ km/h, because $1\\ \\mathrm{m/s} = 3600\\ \\mathrm{m/h} = 3.6\\ \\mathrm{km/h}$.`)];
   return [T(`Hva er ${v} km/h i m/s?`,`What is ${v} km/h in m/s?`),{n:w,tol:rel(w),u:"m/s"},
     T(`Del på 3,6: $${v}/3{,}6 \\approx ${mf(w)}$ m/s, fordi $1\\ \\mathrm{km/h} = \\dfrac{1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = \\dfrac{1}{3{,}6}\\ \\mathrm{m/s}$.`,
       `Divide by 3.6: $${v}/3.6 \\approx ${mf(w)}$ m/s, because $1\\ \\mathrm{km/h} = \\dfrac{1000\\ \\mathrm{m}}{3600\\ \\mathrm{s}} = \\dfrac{1}{3.6}\\ \\mathrm{m/s}$.`)]; },
 // 2: gjeldende siffer
 ()=>{ const form=R.i(0,3), unit=R.p(["m","kg","s","N","J","Pa"]);
   const dig=n=>{ const d=[R.i(1,9)]; for(let i=1;i<n;i++) d.push(R.i(0,9)); return d; };
   let k, d, sN, sE, why;
   if(form===0){ k=R.i(1,3); d=dig(k); const z=R.i(1,3), trail=k>=2 && R.i(0,1)===1; if(trail) d[k-1]=0;
     const s="0."+"0".repeat(z)+d.join(""); sN=s.replace(".",","); sE=s;
     why=T(`Nuller foran det første sifferet som ikke er null, teller ikke – de viser bare hvor kommaet står.${trail?" En null bakerst etter komma teller derimot.":""} Gjeldende siffer: ${d.join(", ")}. Svar: ${k}.`,
           `Leading zeros do not count – they only show where the decimal point is.${trail?" A trailing zero after the decimal point does count, however.":""} Significant figures: ${d.join(", ")}. Answer: ${k}.`); }
   else if(form===1){ k=R.i(3,5); d=dig(k); d[k-1]=0; const p=R.i(1,k-1);
     const s=d.slice(0,p).join("")+"."+d.slice(p).join(""); sN=s.replace(".",","); sE=s;
     why=T(`Alle sifrene teller, også nullen bakerst etter komma – den forteller at målingen er gjort med denne nøyaktigheten. Svar: ${k}.`,
           `All the digits count, including the trailing zero after the decimal point – it tells you the measurement was made to that precision. Answer: ${k}.`); }
   else if(form===2){ k=R.i(3,4); d=dig(k); d[R.i(1,k-2)]=0; d[k-1]=R.i(1,9); sN=d.join(""); sE=sN;
     why=T(`Nuller mellom andre sifre teller alltid med. Alle ${k} sifrene er gjeldende. Svar: ${k}.`,
           `Zeros between other digits always count. All ${k} digits are significant. Answer: ${k}.`); }
   else { k=R.i(2,4); d=dig(k); const trail=R.i(0,1)===1; if(trail) d[k-1]=0; const e=R.p([-6,-5,-4,-3,3,4,5,6,8]), rest=d.slice(1).join("");
     sN=`$${d[0]}{,}${rest}\\cdot 10^{${e}}$`; sE=`$${d[0]}.${rest}\\cdot 10^{${e}}$`;
     why=T(`I tierpotensform teller alle sifrene i tallet foran tierpotensen${trail?", også nullen bakerst":""}. Tierpotensen viser bare hvor kommaet står. Svar: ${k}.`,
           `In scientific notation, all the digits in front of the power of ten count${trail?", including the trailing zero":""}. The power of ten only locates the decimal point. Answer: ${k}.`); }
   return [T(`Et måleresultat er oppgitt som ${sN} ${unit}. Hvor mange gjeldende siffer har det?`,`A measurement is reported as ${sE} ${unit}. How many significant figures does it have?`),{n:k,tol:0,u:""},why]; },
 // 3: areal og volum
 ()=>{ const k=R.i(0,3); let x, y, u, q, e;
   if(k===0){ x=R.f(20,2500,10); y=x/100; u="cm²";
     q=T(`Tverrsnittet av en stålstang har arealet ${nf(x)} mm². Hva er arealet i cm²?`,`The cross-section of a steel bar has an area of ${nf(x)} mm². What is the area in cm²?`);
     e=T(`$1\\ \\mathrm{cm} = 10\\ \\mathrm{mm}$, så $1\\ \\mathrm{cm^2} = 10^2\\ \\mathrm{mm^2} = 100\\ \\mathrm{mm^2}$. Da blir $${mf(x)}/100 = ${mf(y)}$ cm².`,
         `$1\\ \\mathrm{cm} = 10\\ \\mathrm{mm}$, so $1\\ \\mathrm{cm^2} = 10^2\\ \\mathrm{mm^2} = 100\\ \\mathrm{mm^2}$. This gives $${mf(x)}/100 = ${mf(y)}$ cm².`); }
   else if(k===1){ x=R.f(0.02,0.95,0.01); y=x*1e4; u="cm²";
     q=T(`En stålplate har arealet ${nf(x)} m². Hva er arealet i cm²?`,`A steel plate has an area of ${nf(x)} m². What is the area in cm²?`);
     e=T(`$1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$, så $1\\ \\mathrm{m^2} = 100^2\\ \\mathrm{cm^2} = 10\\,000\\ \\mathrm{cm^2}$. Da blir $${mf(x)}\\cdot 10\\,000 = ${mf(y)}$ cm².`,
         `$1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$, so $1\\ \\mathrm{m^2} = 100^2\\ \\mathrm{cm^2} = 10\\,000\\ \\mathrm{cm^2}$. This gives $${mf(x)}\\cdot 10\\,000 = ${mf(y)}$ cm².`); }
   else if(k===2){ x=R.f(40,2500,10); y=x/1000; u="m³";
     q=T(`En tank rommer ${nf(x)} L. Hva er volumet i m³?`,`A tank holds ${nf(x)} L. What is the volume in m³?`);
     e=T(`$1\\ \\mathrm{m^3} = (10\\ \\mathrm{dm})^3 = 1000\\ \\mathrm{dm^3} = 1000\\ \\mathrm{L}$. Da blir $${mf(x)}/1000 = ${mf(y)}$ m³.`,
         `$1\\ \\mathrm{m^3} = (10\\ \\mathrm{dm})^3 = 1000\\ \\mathrm{dm^3} = 1000\\ \\mathrm{L}$. This gives $${mf(x)}/1000 = ${mf(y)}$ m³.`); }
   else { x=R.f(150,5000,50); y=x/1000; u="L";
     q=T(`En motor har slagvolum ${nf(x)} cm³. Hvor mange liter er det?`,`An engine has a displacement of ${nf(x)} cm³. How many liters is that?`);
     e=T(`$1\\ \\mathrm{L} = 1\\ \\mathrm{dm^3} = (10\\ \\mathrm{cm})^3 = 1000\\ \\mathrm{cm^3}$. Da blir $${mf(x)}/1000 = ${mf(y)}$ L.`,
         `$1\\ \\mathrm{L} = 1\\ \\mathrm{dm^3} = (10\\ \\mathrm{cm})^3 = 1000\\ \\mathrm{cm^3}$. This gives $${mf(x)}/1000 = ${mf(y)}$ L.`); }
   return [q,{n:y,tol:rel(y),u},e]; },
 // 4: sammensatte enheter
 ()=>{ const k=R.i(0,2); let x, y, u, q, e;
   if(k===0){ x=R.f(20,600,10); y=x*60/1000; u="m³/h";
     q=T(`En pumpe leverer ${nf(x)} L/min. Hva er volumstrømmen i m³/h?`,`A pump delivers ${nf(x)} L/min. What is the flow rate in m³/h?`);
     e=T(`Én time er 60 min og $1\\ \\mathrm{m^3} = 1000\\ \\mathrm{L}$: $${mf(x)}\\ \\mathrm{L/min}\\cdot\\dfrac{60\\ \\mathrm{min/h}}{1000\\ \\mathrm{L/m^3}} = ${mf(y)}$ m³/h.`,
         `One hour is 60 min and $1\\ \\mathrm{m^3} = 1000\\ \\mathrm{L}$: $${mf(x)}\\ \\mathrm{L/min}\\cdot\\dfrac{60\\ \\mathrm{min/h}}{1000\\ \\mathrm{L/m^3}} = ${mf(y)}$ m³/h.`); }
   else if(k===1){ x=R.f(1.5,30,0.5); y=x*10; u="MPa";
     q=T(`En spenning i en stålbjelke er oppgitt som ${nf(x)} kN/cm². Hva er spenningen i MPa?`,`The stress in a steel beam is given as ${nf(x)} kN/cm². What is the stress in MPa?`);
     e=T(`$1\\ \\mathrm{kN/cm^2} = \\dfrac{1000\\ \\mathrm{N}}{100\\ \\mathrm{mm^2}} = 10\\ \\mathrm{N/mm^2}$, og $1\\ \\mathrm{N/mm^2} = 1\\ \\mathrm{MPa}$. Da blir $${mf(x)}\\cdot 10 = ${mf(y)}$ MPa.`,
         `$1\\ \\mathrm{kN/cm^2} = \\dfrac{1000\\ \\mathrm{N}}{100\\ \\mathrm{mm^2}} = 10\\ \\mathrm{N/mm^2}$, and $1\\ \\mathrm{N/mm^2} = 1\\ \\mathrm{MPa}$. This gives $${mf(x)}\\cdot 10 = ${mf(y)}$ MPa.`); }
   else { x=R.f(0.5,40,0.5); y=x*3.6; u="MJ";
     q=T(`En varmtvannsbereder bruker ${nf(x)} kWh i løpet av et døgn. Hvor mange MJ er det?`,`A water heater uses ${nf(x)} kWh in one day. How many MJ is that?`);
     e=T(`$1\\ \\mathrm{kWh} = 1000\\ \\mathrm{W}\\cdot 3600\\ \\mathrm{s} = 3{,}6\\cdot 10^6\\ \\mathrm{J} = 3{,}6\\ \\mathrm{MJ}$. Da blir $${mf(x)}\\cdot 3{,}6 = ${mf(y)}$ MJ.`,
         `$1\\ \\mathrm{kWh} = 1000\\ \\mathrm{W}\\cdot 3600\\ \\mathrm{s} = 3.6\\cdot 10^6\\ \\mathrm{J} = 3.6\\ \\mathrm{MJ}$. This gives $${mf(x)}\\cdot 3.6 = ${mf(y)}$ MJ.`); }
   return [q,{n:y,tol:rel(y),u},e]; },
 // 5: måleusikkerhet i et produkt (flere steg)
 ()=>{ const a=R.i(120,600)/10, da=R.p([0.1,0.2,0.5]), b=R.i(50,300)/10, db=R.p([0.1,0.2]);
   const A=a*b, ra=da/a, rb=db/b, p=ra+rb, dA=A*p, tol=Math.max(rel(dA,0.03), 0.051*10**Math.floor(Math.log10(dA)));
   return [T(`En plate måles til $a = ${fxm(a,1)} \\pm ${fxm(da,1)}$ cm og $b = ${fxm(b,1)} \\pm ${fxm(db,1)}$ cm. Hvor stor er den absolutte usikkerheten $\\Delta A$ i arealet $A = ab$? (Relative usikkerheter legges sammen ved ganging. Oppgi svaret med to gjeldende siffer.)`,
             `A plate is measured as $a = ${fxm(a,1)} \\pm ${fxm(da,1)}$ cm and $b = ${fxm(b,1)} \\pm ${fxm(db,1)}$ cm. What is the absolute uncertainty $\\Delta A$ in the area $A = ab$? (Relative uncertainties add when multiplying. Give the answer to two significant figures.)`),
     {n:dA,tol,u:"cm²"},
     T(`$A = ${fxm(a,1)}\\cdot ${fxm(b,1)} = ${mf(A)}$ cm². Relativ usikkerhet: $\\dfrac{${fxm(da,1)}}{${fxm(a,1)}} + \\dfrac{${fxm(db,1)}}{${fxm(b,1)}} = ${mf(ra*100)}\\,\\% + ${mf(rb*100)}\\,\\% = ${mf(p*100)}\\,\\%$. Da er $\\Delta A = ${mf(p)}\\cdot ${mf(A)} \\approx ${mf(dA)}$ cm².`,
       `$A = ${fxm(a,1)}\\cdot ${fxm(b,1)} = ${mf(A)}$ cm². Relative uncertainty: $\\dfrac{${fxm(da,1)}}{${fxm(a,1)}} + \\dfrac{${fxm(db,1)}}{${fxm(b,1)}} = ${mf(ra*100)}\\,\\% + ${mf(rb*100)}\\,\\% = ${mf(p*100)}\\,\\%$. So $\\Delta A = ${mf(p)}\\cdot ${mf(A)} \\approx ${mf(dA)}$ cm².`)]; }
);

// ================= Enhet 1: Bevegelse =================
THEORY("GFYS", 1, {
nb: `## Hva handler det om?
Kinematikk beskriver hvordan ting beveger seg – uten å spørre hvorfor. Vi bruker fire størrelser: posisjon (hvor), fart (hvor fort), akselerasjon (hvor raskt farten endres) og tid. Med dem kan du regne ut bremselengden til en bil, hvor lang tid en last bruker på å falle ned, eller hvor kraftig en robotarm må akselerere.

Her ser vi på bevegelse langs en rett linje. Da er fortegn nok til å angi retning: du velger en positiv retning, og størrelser som peker den andre veien, blir negative.

## Begreper og formler
- **Strekning (forflytning)** $s$ (m): hvor langt legemet har flyttet seg fra startpunktet, med fortegn.
- **Gjennomsnittsfart:** $\\bar v = \\dfrac{\\Delta s}{\\Delta t}$, enhet m/s. Farten kan ha fortegn som viser retningen (i mange bøker kalles den da hastighet).
- **Akselerasjon:** $a = \\dfrac{\\Delta v}{\\Delta t}$, enhet m/s². Har $a$ samme fortegn som farten, øker farten. Motsatt fortegn betyr nedbremsing.
- **Bevegelseslikningene** gjelder bare når akselerasjonen er **konstant**. Med startfart $v_0$ ved tiden $t = 0$:

$$v = v_0 + at$$

$$s = v_0 t + \\tfrac12 at^2$$

$$v^2 - v_0^2 = 2as$$

$$s = \\tfrac12 (v_0 + v)\\,t$$

- **Fritt fall:** uten luftmotstand har alle legemer akselerasjonen $g = 9{,}81\\ \\mathrm{m/s^2}$ rett nedover, uansett masse.
- **Grafer:** i en $s$-$t$-graf er stigningstallet farten. I en $v$-$t$-graf er stigningstallet akselerasjonen, og arealet under grafen er strekningen.
- **Kast:** vannrett og loddrett bevegelse er uavhengige av hverandre. En gjenstand som kastes vannrett, faller like fort som en som bare slippes.

## Slik løser du oppgavene
1. Tegn en enkel skisse og velg positiv retning (for eksempel fartsretningen eller oppover).
2. Skriv opp hvilke av $v_0$, $v$, $a$, $s$ og $t$ du kjenner, med fortegn, og hva du skal finne. Gjør om km/h til m/s.
3. Velg den likningen som inneholder de kjente størrelsene og den ukjente – og som mangler den størrelsen du verken kjenner eller trenger.
4. Løs med hensyn på den ukjente og sett inn tall.
5. Kontroller fortegn, enhet og om svaret er rimelig.

### Eksempel
En bil kjører i 72 km/h og bremser med konstant akselerasjon til stillstand på 4,0 s. Hvor lang er bremsestrekningen?

1. Positiv retning er fartsretningen. $v_0 = 72/3{,}6 = 20\\ \\mathrm{m/s}$, $v = 0$ og $t = 4{,}0\\ \\mathrm{s}$.
2. Akselerasjonen: $a = \\dfrac{v - v_0}{t} = \\dfrac{0 - 20}{4{,}0} = -5{,}0\\ \\mathrm{m/s^2}$. Minustegnet betyr nedbremsing.
3. Strekningen: $s = \\tfrac12 (v_0 + v)\\,t = \\tfrac12 (20 + 0)\\cdot 4{,}0 = 40\\ \\mathrm{m}$.
4. Kontroll med en annen likning: $s = \\dfrac{v^2 - v_0^2}{2a} = \\dfrac{0 - 400}{2\\cdot(-5{,}0)} = 40\\ \\mathrm{m}$.

Bremsestrekningen er 40 m. I en $v$-$t$-graf er dette arealet av trekanten med grunnlinje 4,0 s og høyde 20 m/s.

## Vanlige feil
- Å bruke km/h direkte i formlene. Gjør alltid om til m/s først.
- Å glemme minustegnet på akselerasjonen ved nedbremsing, eller på $g$ når oppover er valgt som positiv retning.
- Å bruke bevegelseslikningene når akselerasjonen ikke er konstant.
- Å regne gjennomsnittsfarten som gjennomsnittet av to farter. Riktig er total strekning delt på total tid.
- Å tro at både fart og akselerasjon er null i toppunktet av et loddrett kast. Farten er null, men akselerasjonen er fortsatt $g$ nedover.
- Å tro at tunge ting faller fortere. Uten luftmotstand faller alt med samme akselerasjon.

> Konstant akselerasjon knytter sammen fem størrelser: $v_0$, $v$, $a$, $s$ og $t$. Kjenner du tre av dem, gir likningene de to andre. Velg positiv retning først, og hold fortegnene konsekvent.`,
en: `## What is it about?
Kinematics describes how things move – without asking why. We use four quantities: position (where), velocity (how fast), acceleration (how quickly the velocity changes) and time. With them you can calculate the braking distance of a car, how long a falling load takes to reach the ground, or how hard a robot arm has to accelerate.

Here we study motion along a straight line. A sign is then enough to describe direction: you choose a positive direction, and quantities pointing the other way become negative.

## Concepts and formulas
- **Displacement** $s$ (m): how far the body has moved from its starting point, with sign.
- **Average velocity:** $\\bar v = \\dfrac{\\Delta s}{\\Delta t}$, in m/s. The velocity has a sign that shows the direction; its size is called the speed.
- **Acceleration:** $a = \\dfrac{\\Delta v}{\\Delta t}$, in m/s². If $a$ has the same sign as the velocity, the body speeds up. The opposite sign means it slows down.
- **The equations of motion** hold only when the acceleration is **constant**. With initial velocity $v_0$ at time $t = 0$:

$$v = v_0 + at$$

$$s = v_0 t + \\tfrac12 at^2$$

$$v^2 - v_0^2 = 2as$$

$$s = \\tfrac12 (v_0 + v)\\,t$$

- **Free fall:** without air resistance, every body has the acceleration $g = 9.81\\ \\mathrm{m/s^2}$ straight down, regardless of its mass.
- **Graphs:** in an $s$-$t$ graph the slope is the velocity. In a $v$-$t$ graph the slope is the acceleration, and the area under the graph is the displacement.
- **Projectiles:** the horizontal and vertical motions are independent. An object thrown horizontally falls just as fast as one that is simply dropped.

## How to solve the problems
1. Make a quick sketch and choose a positive direction (for example the direction of motion, or upward).
2. Write down which of $v_0$, $v$, $a$, $s$ and $t$ you know, with signs, and what you are looking for. Convert km/h to m/s.
3. Choose the equation that contains the known quantities and the unknown – and leaves out the one quantity you neither know nor need.
4. Solve for the unknown and substitute the numbers.
5. Check the sign, the unit and whether the answer is reasonable.

### Example
A car traveling at 72 km/h brakes with constant acceleration and stops in 4.0 s. How long is the braking distance?

1. The positive direction is the direction of motion. $v_0 = 72/3.6 = 20\\ \\mathrm{m/s}$, $v = 0$ and $t = 4.0\\ \\mathrm{s}$.
2. Acceleration: $a = \\dfrac{v - v_0}{t} = \\dfrac{0 - 20}{4.0} = -5.0\\ \\mathrm{m/s^2}$. The minus sign means braking.
3. Distance: $s = \\tfrac12 (v_0 + v)\\,t = \\tfrac12 (20 + 0)\\cdot 4.0 = 40\\ \\mathrm{m}$.
4. Check with another equation: $s = \\dfrac{v^2 - v_0^2}{2a} = \\dfrac{0 - 400}{2\\cdot(-5.0)} = 40\\ \\mathrm{m}$.

The braking distance is 40 m. In a $v$-$t$ graph this is the area of the triangle with base 4.0 s and height 20 m/s.

## Common mistakes
- Using km/h directly in the formulas. Always convert to m/s first.
- Forgetting the minus sign on the acceleration when braking, or on $g$ when upward is chosen as positive.
- Using the equations of motion when the acceleration is not constant.
- Taking the average velocity as the mean of two speeds. The correct value is total distance divided by total time.
- Believing that both velocity and acceleration are zero at the top of a vertical throw. The velocity is zero, but the acceleration is still $g$ downward.
- Believing that heavy objects fall faster. Without air resistance everything falls with the same acceleration.

> Constant acceleration links five quantities: $v_0$, $v$, $a$, $s$ and $t$. If you know three of them, the equations give you the other two. Choose the positive direction first and keep the signs consistent.`
});

BIQ("GFYS", 1, [
 [`En bil kjører 150 km på 2 timer. Hva er gjennomsnittsfarten?`, {n: 75, tol: 0.5, u: "km/h"},
  `$\\bar v = \\dfrac{s}{t} = \\dfrac{150\\ \\mathrm{km}}{2\\ \\mathrm{h}} = 75$ km/h.`,
  `A car covers 150 km in 2 hours. What is its average speed?`, null,
  `$\\bar v = \\dfrac{s}{t} = \\dfrac{150\\ \\mathrm{km}}{2\\ \\mathrm{h}} = 75$ km/h.`],
 [`Hva er akselerasjon?`, [`Endring i fart per tidsenhet`, `Tilbakelagt strekning per tidsenhet`, `Farten et legeme har i et bestemt øyeblikk`, `Tiden det tar å nå toppfarten`],
  `$a = \\dfrac{\\Delta v}{\\Delta t}$, med enhet m/s². Strekning per tid er fart, ikke akselerasjon.`,
  `What is acceleration?`, [`The change in velocity per unit time`, `The distance traveled per unit time`, `The speed of a body at a given instant`, `The time it takes to reach top speed`],
  `$a = \\dfrac{\\Delta v}{\\Delta t}$, in m/s². Distance per unit time is speed, not acceleration.`],
 [`Hva forteller stigningstallet i en posisjon–tid-graf ($s$-$t$-graf)?`, [`Farten`, `Akselerasjonen`, `Tilbakelagt strekning`, `Kraften på legemet`],
  `Stigningstallet er $\\Delta s/\\Delta t$, som er fart. En rett linje betyr konstant fart, og en krum graf betyr at farten endrer seg.`,
  `What does the slope of a position–time graph ($s$-$t$ graph) tell you?`, [`The velocity`, `The acceleration`, `The distance traveled`, `The force on the body`],
  `The slope is $\\Delta s/\\Delta t$, which is velocity. A straight line means constant velocity, and a curved graph means the velocity is changing.`],
 [`Hva forteller arealet under grafen i en fart–tid-graf ($v$-$t$-graf)?`, [`Strekningen (forflytningen)`, `Akselerasjonen`, `Farten`, `Tiden`],
  `Arealet er fart ganger tid: $\\mathrm{m/s}\\cdot\\mathrm{s} = \\mathrm{m}$, altså strekning. Stigningstallet i den samme grafen er akselerasjonen.`,
  `What does the area under a velocity–time graph ($v$-$t$ graph) tell you?`, [`The displacement (distance traveled)`, `The acceleration`, `The velocity`, `The time`],
  `The area is velocity times time: $\\mathrm{m/s}\\cdot\\mathrm{s} = \\mathrm{m}$, which is a distance. The slope of the same graph is the acceleration.`],
 [`En ball kastes rett opp. Hva gjelder i det høyeste punktet? (Se bort fra luftmotstand.)`, [`$v = 0$ og $a = 9{,}81\\ \\mathrm{m/s^2}$ nedover`, `$v = 0$ og $a = 0$`, `$v = 0$ og $a$ peker oppover`, `Både $v$ og $a$ er størst her`],
  `Tyngden virker hele tiden, så akselerasjonen er $g$ nedover under hele kastet. Farten skifter fortegn i toppunktet og er null akkurat der.`,
  `A ball is thrown straight up. What is true at the highest point? (Neglect air resistance.)`, [`$v = 0$ and $a = 9.81\\ \\mathrm{m/s^2}$ downward`, `$v = 0$ and $a = 0$`, `$v = 0$ and $a$ points upward`, `Both $v$ and $a$ are at their largest here`],
  `Gravity acts the whole time, so the acceleration is $g$ downward throughout the throw. The velocity changes sign at the top and is zero exactly there.`],
 [`Fra samme høyde og i samme øyeblikk slippes én kule, mens en annen skytes ut vannrett. Hvilken treffer bakken først? (Se bort fra luftmotstand.)`, [`De treffer samtidig`, `Kula som slippes`, `Kula som skytes ut vannrett`, `Det avhenger av massene`],
  `Den vannrette farten påvirker ikke den loddrette bevegelsen. Begge starter med loddrett fart null og har akselerasjonen $g$ nedover, så falltiden blir lik.`,
  `From the same height and at the same instant, one ball is dropped while another is fired horizontally. Which one hits the ground first? (Neglect air resistance.)`, [`They land at the same time`, `The dropped ball`, `The ball fired horizontally`, `It depends on the masses`],
  `The horizontal velocity does not affect the vertical motion. Both start with zero vertical velocity and accelerate at $g$ downward, so the fall time is the same.`],
 [`En bil akselererer fra 0 til 100 km/h på 8,0 s. Hva er den gjennomsnittlige akselerasjonen?`, {n: 3.472, tol: 0.04, u: "m/s²"},
  `$v = 100/3{,}6 \\approx 27{,}8$ m/s, så $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{27{,}8}{8{,}0} \\approx 3{,}47$ m/s².`,
  `A car accelerates from 0 to 100 km/h in 8.0 s. What is its average acceleration?`, null,
  `$v = 100/3.6 \\approx 27.8$ m/s, so $a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{27.8}{8.0} \\approx 3.47$ m/s².`],
 [`En bil kjører 30 km i 60 km/h og deretter 30 km i 90 km/h. Hva er gjennomsnittsfarten for hele turen?`, {n: 72, tol: 0.5, u: "km/h"},
  `Tidene er $30/60 = 0{,}5$ h og $30/90 \\approx 0{,}333$ h, til sammen $0{,}833$ h. Da er $\\bar v = \\dfrac{60\\ \\mathrm{km}}{0{,}833\\ \\mathrm{h}} = 72$ km/h – ikke 75 km/h, fordi bilen bruker lengre tid på den langsomme delen.`,
  `A car drives 30 km at 60 km/h and then 30 km at 90 km/h. What is its average speed for the whole trip?`, null,
  `The times are $30/60 = 0.5$ h and $30/90 \\approx 0.333$ h, $0.833$ h in total. So $\\bar v = \\dfrac{60\\ \\mathrm{km}}{0.833\\ \\mathrm{h}} = 72$ km/h – not 75 km/h, because the car spends more time on the slow part.`]
]);

GEN("GFYS", 1,
 // 0: gjennomsnittsfart
 ()=>{ const c=R.p([["En løper","A runner",100,1500,100,4,8],["En syklist","A cyclist",500,5000,250,6,12],["Et tog","A train",2000,20000,1000,15,40],["En gaffeltruck","A forklift",20,200,10,1,4]]);
   const s=R.f(c[2],c[3],c[4]), t=Math.max(2,Math.round(s/R.f(c[5],c[6],0.5))), v=s/t;
   return [T(`${c[0]} tilbakelegger ${nf(s)} m på ${t} s. Hva er gjennomsnittsfarten?`,`${c[1]} covers ${nf(s)} m in ${t} s. What is its average speed?`),{n:v,tol:rel(v),u:"m/s"},
     T(`$\\bar v = \\dfrac{s}{t} = \\dfrac{${mf(s)}\\ \\mathrm{m}}{${t}\\ \\mathrm{s}} \\approx ${mf(v)}$ m/s, som tilsvarer ${nf(v*3.6)} km/h.`,
       `$\\bar v = \\dfrac{s}{t} = \\dfrac{${mf(s)}\\ \\mathrm{m}}{${t}\\ \\mathrm{s}} \\approx ${mf(v)}$ m/s, which corresponds to ${nf(v*3.6)} km/h.`)]; },
 // 1: akselerasjon med fortegn
 ()=>{ const lo=R.i(0,20), hi=lo+R.i(3,20), t=R.i(2,12), up=R.i(0,1), v0=up?lo:hi, v=up?hi:lo, a=(v-v0)/t;
   return [T(`En bil endrer farten jevnt fra ${v0} m/s til ${v} m/s på ${t} s. Hva er akselerasjonen? (Oppgi fortegn: negativ ved nedbremsing.)`,
             `A car changes its speed uniformly from ${v0} m/s to ${v} m/s in ${t} s. What is its acceleration? (Include the sign: negative when braking.)`),{n:a,tol:rel(a,0.01,0.01),u:"m/s²"},
     T(`$a = \\dfrac{v - v_0}{t} = \\dfrac{${v} - ${v0}}{${t}} \\approx ${mf(a)}$ m/s². ${up?"Farten øker, så $a$ er positiv.":"Farten avtar, så $a$ er negativ (nedbremsing)."}`,
       `$a = \\dfrac{v - v_0}{t} = \\dfrac{${v} - ${v0}}{${t}} \\approx ${mf(a)}$ m/s². ${up?"The speed increases, so $a$ is positive.":"The speed decreases, so $a$ is negative (braking)."}`)]; },
 // 2: strekning med startfart og konstant akselerasjon
 ()=>{ const v0=R.i(2,15), a=R.f(0.5,3,0.5), t=R.i(2,8), s=v0*t+0.5*a*t*t, v=v0+a*t;
   return [T(`En bil har farten ${v0} m/s og akselererer så jevnt med ${nf(a)} m/s² i ${t} s. Hvor langt kjører den i løpet av disse ${t} sekundene?`,
             `A car traveling at ${v0} m/s then accelerates uniformly at ${nf(a)} m/s² for ${t} s. How far does it travel during those ${t} seconds?`),{n:s,tol:rel(s),u:"m"},
     T(`$s = v_0t + \\tfrac12at^2 = ${v0}\\cdot ${t} + \\tfrac12\\cdot ${mf(a)}\\cdot ${t}^2 = ${mf(s)}$ m. (Sluttfarten er $v = v_0 + at = ${mf(v)}$ m/s.)`,
       `$s = v_0t + \\tfrac12at^2 = ${v0}\\cdot ${t} + \\tfrac12\\cdot ${mf(a)}\\cdot ${t}^2 = ${mf(s)}$ m. (The final speed is $v = v_0 + at = ${mf(v)}$ m/s.)`)]; },
 // 3: fritt fall og loddrett kast
 ()=>{ const k=R.i(0,1);
   if(k===0){ const h=R.f(1.5,60,0.5), t=Math.sqrt(2*h/G_);
     return [T(`En skrue faller ned fra et stillas ${nf(h)} m over bakken. Hvor lang tid tar fallet? (Se bort fra luftmotstand, $g = 9{,}81$ m/s².)`,
               `A bolt falls from scaffolding ${nf(h)} m above the ground. How long does the fall take? (Neglect air resistance, $g = 9.81$ m/s².)`),{n:t,tol:rel(t),u:"s"},
       T(`Startfarten er null, så $h = \\tfrac12gt^2$ og $t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2\\cdot ${mf(h)}}{9{,}81}} \\approx ${mf(t)}$ s.`,
         `The initial velocity is zero, so $h = \\tfrac12gt^2$ and $t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2\\cdot ${mf(h)}}{9.81}} \\approx ${mf(t)}$ s.`)]; }
   const v0=R.i(3,25), H=v0*v0/(2*G_), tt=v0/G_;
   return [T(`En ball kastes rett opp med farten ${v0} m/s. Hvor høyt over utkastpunktet kommer den? (Se bort fra luftmotstand, $g = 9{,}81$ m/s².)`,
             `A ball is thrown straight up at ${v0} m/s. How high above the launch point does it rise? (Neglect air resistance, $g = 9.81$ m/s².)`),{n:H,tol:rel(H),u:"m"},
     T(`Med oppover som positiv retning er $a = -g$, og i toppunktet er $v = 0$. Da gir $v^2 - v_0^2 = 2as$ at $h = \\dfrac{v_0^2}{2g} = \\dfrac{${v0}^2}{2\\cdot 9{,}81} \\approx ${mf(H)}$ m. (Det tar $v_0/g \\approx ${mf(tt)}$ s å nå toppen.)`,
       `With upward as positive, $a = -g$, and at the top $v = 0$. Then $v^2 - v_0^2 = 2as$ gives $h = \\dfrac{v_0^2}{2g} = \\dfrac{${v0}^2}{2\\cdot 9.81} \\approx ${mf(H)}$ m. (It takes $v_0/g \\approx ${mf(tt)}$ s to reach the top.)`)]; },
 // 4: stopplengde = reaksjonsstrekning + bremsestrekning
 ()=>{ const vk=R.p([30,40,50,60,70,80,90,100,110]), tr=R.f(0.5,1.5,0.1), b=R.f(4,8,0.5);
   const v=vk/3.6, sr=v*tr, sb=v*v/(2*b), s=sr+sb;
   return [T(`En bilfører kjører i ${vk} km/h og ser en hindring. Reaksjonstiden er ${nf(tr)} s, og deretter bremser bilen med konstant akselerasjon $-${mf(b)}$ m/s² til den står stille. Hvor lang er den totale stopplengden?`,
             `A driver traveling at ${vk} km/h sees an obstacle. The reaction time is ${nf(tr)} s, after which the car brakes with a constant acceleration of $-${mf(b)}$ m/s² until it stops. What is the total stopping distance?`),{n:s,tol:rel(s),u:"m"},
     T(`$v_0 = ${vk}/3{,}6 \\approx ${mf(v)}$ m/s. Reaksjonsstrekning (konstant fart): $${mf(v)}\\cdot ${mf(tr)} \\approx ${mf(sr)}$ m. Bremsestrekning: $\\dfrac{v_0^2}{2|a|} = \\dfrac{${mf(v)}^2}{2\\cdot ${mf(b)}} \\approx ${mf(sb)}$ m. Stopplengde: $${mf(sr)} + ${mf(sb)} \\approx ${mf(s)}$ m.`,
       `$v_0 = ${vk}/3.6 \\approx ${mf(v)}$ m/s. Reaction distance (constant speed): $${mf(v)}\\cdot ${mf(tr)} \\approx ${mf(sr)}$ m. Braking distance: $\\dfrac{v_0^2}{2|a|} = \\dfrac{${mf(v)}^2}{2\\cdot ${mf(b)}} \\approx ${mf(sb)}$ m. Stopping distance: $${mf(sr)} + ${mf(sb)} \\approx ${mf(s)}$ m.`)]; },
 // 5: v-t-graf (trapes) og gjennomsnittsfart
 ()=>{ const v=R.i(10,22), t1=R.i(8,20), t2=R.i(20,90), t3=R.i(8,20);
   const s=0.5*v*t1+v*t2+0.5*v*t3, tt=t1+t2+t3, vm=s/tt;
   return [T(`Et T-banetog kjører mellom to stasjoner. $v$-$t$-grafen består av tre rette linjestykker: farten øker jevnt fra 0 til ${v} m/s på ${t1} s, holder seg på ${v} m/s i ${t2} s og avtar så jevnt til 0 på ${t3} s. Hva er gjennomsnittsfarten mellom stasjonene?`,
             `A metro train runs between two stations. Its $v$-$t$ graph consists of three straight segments: the speed increases uniformly from 0 to ${v} m/s in ${t1} s, stays at ${v} m/s for ${t2} s and then decreases uniformly to 0 in ${t3} s. What is the average speed between the stations?`),{n:vm,tol:rel(vm),u:"m/s"},
     T(`Strekningen er arealet under grafen: $s = \\tfrac12\\cdot ${v}\\cdot ${t1} + ${v}\\cdot ${t2} + \\tfrac12\\cdot ${v}\\cdot ${t3} = ${mf(s)}$ m. Total tid er $${t1} + ${t2} + ${t3} = ${tt}$ s, så $\\bar v = \\dfrac{${mf(s)}}{${tt}} \\approx ${mf(vm)}$ m/s.`,
       `The distance is the area under the graph: $s = \\tfrac12\\cdot ${v}\\cdot ${t1} + ${v}\\cdot ${t2} + \\tfrac12\\cdot ${v}\\cdot ${t3} = ${mf(s)}$ m. The total time is $${t1} + ${t2} + ${t3} = ${tt}$ s, so $\\bar v = \\dfrac{${mf(s)}}{${tt}} \\approx ${mf(vm)}$ m/s.`)]; }
);

// ================= Enhet 2: Krefter og Newtons lover =================
THEORY("GFYS", 2, {
nb: `## Hva handler det om?
En kraft er et dytt eller et drag. Kraft har både størrelse og retning (den er en vektor) og måles i newton (N). Newtons tre lover forteller hvordan krefter endrer bevegelsen. De er grunnlaget for all mekanikk du møter senere, fra likevekt i bjelker (statikk) til maskiner som akselererer (dynamikk).

Nøkkelen er å se på ett legeme om gangen og spørre: hvilke krefter virker **på** dette legemet? Summen av dem bestemmer akselerasjonen.

## Begreper og formler
- **Newtons 1. lov (treghetsloven):** Er summen av kreftene null, ligger legemet i ro eller beveger seg med konstant fart i en rett linje.
- **Newtons 2. lov:** $\\sum F = ma$. Kraftsummen gir akselerasjonen, og de har samme retning. $1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$.
- **Newtons 3. lov:** Når A virker på B med en kraft, virker B på A med en like stor, motsatt rettet kraft. Kreftene virker på **hvert sitt** legeme og opphever derfor aldri hverandre.
- **Tyngde (tyngdekraft):** $G = mg$, rettet loddrett nedover, med $g = 9{,}81\\ \\mathrm{m/s^2}$. Massen (kg) er den samme overalt, mens tyngden (N) avhenger av hvor du er.
- **Normalkraft $N$:** kraften fra et underlag, vinkelrett på underlaget. På et vannrett underlag uten andre loddrette krefter er $N = mg$. På et skråplan med helningsvinkel $\\theta$ er $N = mg\\cos\\theta$, og komponenten av tyngden langs planet er $mg\\sin\\theta$.
- **Friksjon $R$:** virker langs underlaget, mot bevegelsen (eller mot den retningen legemet «vil» gli). Når legemet glir, er $R = \\mu_k N$. Når det ligger i ro, er $R \\le \\mu_s N$, der $\\mu_s$ er det statiske friksjonstallet.
- **Snorkraft $S$:** en stram snor drar i legemet langs snoren. Over en lett, friksjonsfri trinse er snorkraften like stor i begge ender.
- **Kraftdiagram (frilegemediagram):** en figur av legemet alene, der alle kreftene som virker på det, er tegnet som piler.

## Slik løser du oppgavene
1. Velg legemet du ser på, og tegn det alene.
2. Tegn alle kreftene som virker på det: tyngde, normalkraft, friksjon, snorkrefter og andre ytre krefter. Ikke ta med krefter som legemet selv virker på andre med.
3. Velg akser: én langs akselerasjonen (bevegelsesretningen) og én vinkelrett på den. Del opp krefter som står på skrå, i komponenter.
4. Skriv Newtons 2. lov for hver akse: $\\sum F_x = ma$ og $\\sum F_y = 0$ (ingen akselerasjon vinkelrett på underlaget).
5. Løs likningene. Finn gjerne $N$ først, så friksjonen $R = \\mu N$, og til slutt akselerasjonen. Har du flere legemer (for eksempel koblet med en snor), skriver du én likning per legeme.

### Eksempel
En kasse på 20 kg dras bortover et vannrett gulv med en vannrett kraft på 100 N. Friksjonstallet er $\\mu_k = 0{,}30$. Finn akselerasjonen.

1. Krefter på kassa: tyngden $G$ nedover, normalkraften $N$ oppover, trekkraften $F = 100$ N forover og friksjonen $R$ bakover.
2. Loddrett: $\\sum F_y = 0$ gir $N = mg = 20\\cdot 9{,}81 = 196{,}2\\ \\mathrm{N}$.
3. Friksjon: $R = \\mu_k N = 0{,}30\\cdot 196{,}2 \\approx 58{,}9\\ \\mathrm{N}$.
4. Vannrett: $\\sum F_x = F - R = ma$ gir $a = \\dfrac{100 - 58{,}9}{20} \\approx 2{,}1\\ \\mathrm{m/s^2}$.

Kassa får akselerasjonen omtrent 2,1 m/s². Uten friksjon ville akselerasjonen vært $100/20 = 5{,}0\\ \\mathrm{m/s^2}$.

## Vanlige feil
- Å blande masse og tyngde: 50 kg er massen, tyngden er $50\\cdot 9{,}81 \\approx 491$ N.
- Å tro at normalkraften alltid er $mg$. Den er mindre på et skråplan, og den endres når noen drar på skrå eller når en heis akselererer.
- Å tro at det trengs en kraftsum for å holde farten konstant. Konstant fart betyr at kraftsummen er null – trekkraften balanserer bare friksjonen.
- Å la kraft og motkraft (3. lov) oppheve hverandre. De virker på hvert sitt legeme.
- Å tegne $ma$ som en egen kraft i kraftdiagrammet. $ma$ er resultatet av kreftene, ikke en kraft.
- Å bruke $\\mu_s$ når legemet glir (da gjelder $\\mu_k$), eller å regne friksjonen ut fra $mg$ når $N \\ne mg$.

> Tegn kraftdiagram, finn $N$ først, og sett så $\\sum F = ma$ langs bevegelsen og $\\sum F = 0$ på tvers av den.`,
en: `## What is it about?
A force is a push or a pull. A force has both a magnitude and a direction (it is a vector) and is measured in newtons (N). Newton's three laws tell us how forces change motion. They are the foundation of all the mechanics you will meet later, from equilibrium of beams (statics) to accelerating machines (dynamics).

The key is to look at one body at a time and ask: which forces act **on** this body? Their sum determines the acceleration.

## Concepts and formulas
- **Newton's first law (law of inertia):** if the net force is zero, the body stays at rest or keeps moving at constant velocity in a straight line.
- **Newton's second law:** $\\sum F = ma$. The net force gives the acceleration, and they point in the same direction. $1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\cdot m/s^2}$.
- **Newton's third law:** when A exerts a force on B, B exerts an equally large, opposite force on A. The two forces act on **different** bodies and therefore never cancel each other.
- **Weight (gravitational force):** $F_g = mg$, pointing straight down, with $g = 9.81\\ \\mathrm{m/s^2}$. The mass (kg) is the same everywhere, while the weight (N) depends on where you are.
- **Normal force $N$:** the force from a surface, perpendicular to the surface. On a horizontal surface with no other vertical forces, $N = mg$. On an incline with angle $\\theta$, $N = mg\\cos\\theta$, and the component of the weight along the incline is $mg\\sin\\theta$.
- **Friction $f$:** acts along the surface, opposing the motion (or the direction in which the body "wants" to slide). When the body slides, $f = \\mu_k N$. When it is at rest, $f \\le \\mu_s N$, where $\\mu_s$ is the coefficient of static friction.
- **Tension $T$:** a taut rope pulls on the body along the rope. Over a light, frictionless pulley the tension is the same at both ends.
- **Free-body diagram:** a sketch of the body on its own, with every force acting on it drawn as an arrow.

## How to solve the problems
1. Choose the body you are studying and draw it on its own.
2. Draw every force acting on it: weight, normal force, friction, tensions and any other external forces. Leave out the forces the body itself exerts on other things.
3. Choose axes: one along the acceleration (the direction of motion) and one perpendicular to it. Resolve forces that act at an angle into components.
4. Write Newton's second law for each axis: $\\sum F_x = ma$ and $\\sum F_y = 0$ (no acceleration perpendicular to the surface).
5. Solve the equations. It often pays to find $N$ first, then the friction $f = \\mu N$, and finally the acceleration. With several bodies (for example connected by a rope), write one equation per body.

### Example
A 20 kg crate is pulled across a horizontal floor by a horizontal force of 100 N. The coefficient of kinetic friction is $\\mu_k = 0.30$. Find the acceleration.

1. Forces on the crate: the weight $F_g$ downward, the normal force $N$ upward, the pulling force $F = 100$ N forward and the friction $f$ backward.
2. Vertical: $\\sum F_y = 0$ gives $N = mg = 20\\cdot 9.81 = 196.2\\ \\mathrm{N}$.
3. Friction: $f = \\mu_k N = 0.30\\cdot 196.2 \\approx 58.9\\ \\mathrm{N}$.
4. Horizontal: $\\sum F_x = F - f = ma$ gives $a = \\dfrac{100 - 58.9}{20} \\approx 2.1\\ \\mathrm{m/s^2}$.

The crate accelerates at about 2.1 m/s². Without friction the acceleration would have been $100/20 = 5.0\\ \\mathrm{m/s^2}$.

## Common mistakes
- Mixing up mass and weight: 50 kg is the mass; the weight is $50\\cdot 9.81 \\approx 491$ N.
- Assuming the normal force is always $mg$. It is smaller on an incline, and it changes when someone pulls at an angle or an elevator accelerates.
- Believing a net force is needed to keep the velocity constant. Constant velocity means the net force is zero – the pulling force only balances friction.
- Letting action and reaction (third law) cancel. They act on different bodies.
- Drawing $ma$ as a separate force in the free-body diagram. $ma$ is the result of the forces, not a force itself.
- Using $\\mu_s$ when the body is sliding (then $\\mu_k$ applies), or computing friction from $mg$ when $N \\ne mg$.

> Draw the free-body diagram, find $N$ first, then apply $\\sum F = ma$ along the motion and $\\sum F = 0$ across it.`
});

BIQ("GFYS", 2, [
 [`En astronaut har massen 80 kg på jorda. Hva er massen hennes på månen?`, [`80 kg`, `13 kg`, `0 kg`, `130 kg`],
  `Massen sier hvor tregt legemet er (hvor vanskelig det er å akselerere) og er den samme overalt. Det er tyngden $G = mg$ som blir mindre på månen, fordi $g$ er mindre der (ca. 1,6 m/s²).`,
  `An astronaut has a mass of 80 kg on Earth. What is her mass on the Moon?`, [`80 kg`, `13 kg`, `0 kg`, `130 kg`],
  `Mass measures the body's inertia (how hard it is to accelerate) and is the same everywhere. It is the weight $F_g = mg$ that is smaller on the Moon, because $g$ is smaller there (about 1.6 m/s²).`],
 [`En hockeypuck glir med konstant fart i en rett linje over glatt is (se bort fra friksjon og luftmotstand). Hva er kraftsummen på pucken?`, [`Null`, `En kraft i fartsretningen`, `En kraft mot fartsretningen`, `Lik tyngden, rettet nedover`],
  `Konstant fart i en rett linje betyr $a = 0$, og da er $\\sum F = ma = 0$ (Newtons 1. lov). Tyngden og normalkraften fra isen opphever hverandre. Det trengs ingen kraft for å holde farten ved like.`,
  `A hockey puck slides at constant velocity in a straight line across smooth ice (neglect friction and air resistance). What is the net force on the puck?`, [`Zero`, `A force in the direction of motion`, `A force opposite to the direction of motion`, `Equal to the weight, pointing down`],
  `Constant velocity in a straight line means $a = 0$, so $\\sum F = ma = 0$ (Newton's first law). The weight and the normal force from the ice cancel. No force is needed to keep it moving.`],
 [`En bok ligger i ro på et bord. Etter Newtons 3. lov: hva er motkraften til tyngden av boka (jorda som drar boka nedover)?`, [`Boka som drar jorda oppover`, `Normalkraften fra bordet på boka`, `Boka som trykker ned på bordet`, `Tyngden har ingen motkraft`],
  `Kraft og motkraft virker mellom de samme to legemene, men på hvert sitt. Tyngden er jorda som virker på boka, så motkraften er boka som virker på jorda. Normalkraften er like stor som tyngden her, men det følger av Newtons 1. lov (boka er i ro), ikke av 3. lov.`,
  `A book lies at rest on a table. According to Newton's third law, what is the reaction force to the weight of the book (the Earth pulling the book down)?`, [`The book pulling the Earth upward`, `The normal force from the table on the book`, `The book pressing down on the table`, `The weight has no reaction force`],
  `An action–reaction pair acts between the same two bodies, but on different ones. The weight is the Earth acting on the book, so the reaction is the book acting on the Earth. The normal force equals the weight here, but that follows from Newton's first law (the book is at rest), not the third.`],
 [`En kloss ligger på et skråplan med helningsvinkel $\\theta$. Hvor stor er normalkraften fra planet på klossen?`, [`$mg\\cos\\theta$`, `$mg$`, `$mg\\sin\\theta$`, `$mg\\tan\\theta$`],
  `Del tyngden i en komponent vinkelrett på planet, $mg\\cos\\theta$, og en langs planet, $mg\\sin\\theta$. Vinkelrett på planet er det ingen akselerasjon, så $N = mg\\cos\\theta$. Kontroll: for $\\theta = 0$ blir $N = mg$.`,
  `A block rests on an incline with angle $\\theta$. What is the normal force from the incline on the block?`, [`$mg\\cos\\theta$`, `$mg$`, `$mg\\sin\\theta$`, `$mg\\tan\\theta$`],
  `Split the weight into a component perpendicular to the incline, $mg\\cos\\theta$, and one along it, $mg\\sin\\theta$. There is no acceleration perpendicular to the incline, so $N = mg\\cos\\theta$. Check: for $\\theta = 0$ we get $N = mg$.`],
 [`Du står på en badevekt i en heis som starter fra ro og akselererer oppover. Hva viser vekta, sammenliknet med når heisen står stille?`, [`Mer`, `Mindre`, `Det samme`, `Null`],
  `Vekta måler normalkraften. Med oppover som positiv retning gir Newtons 2. lov $N - mg = ma$, så $N = m(g + a) > mg$. Du føler deg tyngre.`,
  `You stand on a bathroom scale in an elevator that starts from rest and accelerates upward. Compared with when the elevator is at rest, what does the scale show?`, [`More`, `Less`, `The same`, `Zero`],
  `The scale measures the normal force. Taking upward as positive, Newton's second law gives $N - mg = ma$, so $N = m(g + a) > mg$. You feel heavier.`],
 [`Hva er tyngden til en person med massen 75 kg? ($g = 9{,}81$ m/s²)`, {n: 735.75, tol: 7, u: "N"},
  `$G = mg = 75\\cdot 9{,}81 \\approx 736$ N.`,
  `What is the weight of a person with a mass of 75 kg? ($g = 9.81$ m/s²)`, null,
  `$F_g = mg = 75\\cdot 9.81 \\approx 736$ N.`],
 [`En bil med massen 1200 kg akselererer jevnt fra 0 til 20 m/s på 8,0 s. Hvor stor er kraftsummen på bilen?`, {n: 3000, tol: 30, u: "N"},
  `$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{20}{8{,}0} = 2{,}5$ m/s², så $\\sum F = ma = 1200\\cdot 2{,}5 = 3000$ N.`,
  `A car with a mass of 1200 kg accelerates uniformly from 0 to 20 m/s in 8.0 s. What is the net force on the car?`, null,
  `$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{20}{8.0} = 2.5$ m/s², so $\\sum F = ma = 1200\\cdot 2.5 = 3000$ N.`],
 [`Du drar en kasse på 30 kg bortover et vannrett gulv med en kraft på 150 N som peker 30° over vannrett. Friksjonstallet er $\\mu_k = 0{,}40$. Hva blir akselerasjonen? ($g = 9{,}81$ m/s²)`, {n: 1.406, tol: 0.02, u: "m/s²"},
  `Loddrett: $N + F\\sin 30^\\circ = mg$, så $N = 294{,}3 - 75 = 219{,}3$ N (mindre enn $mg$). Friksjon: $R = 0{,}40\\cdot 219{,}3 \\approx 87{,}7$ N. Vannrett: $a = \\dfrac{F\\cos 30^\\circ - R}{m} = \\dfrac{129{,}9 - 87{,}7}{30} \\approx 1{,}41$ m/s².`,
  `You pull a 30 kg crate across a horizontal floor with a force of 150 N directed 30° above the horizontal. The coefficient of kinetic friction is $\\mu_k = 0.40$. What is the acceleration? ($g = 9.81$ m/s²)`, null,
  `Vertical: $N + F\\sin 30^\\circ = mg$, so $N = 294.3 - 75 = 219.3$ N (less than $mg$). Friction: $f = 0.40\\cdot 219.3 \\approx 87.7$ N. Horizontal: $a = \\dfrac{F\\cos 30^\\circ - f}{m} = \\dfrac{129.9 - 87.7}{30} \\approx 1.41$ m/s².`]
]);

GEN("GFYS", 2,
 // 0: tyngde og masse
 ()=>{ const k=R.i(0,2);
   if(k===0){ const m=R.f(2,150,0.5), W=m*G_;
     return [T(`Hva er tyngden til en kasse med massen ${nf(m)} kg? ($g = 9{,}81$ m/s²)`,`What is the weight of a box with a mass of ${nf(m)} kg? ($g = 9.81$ m/s²)`),{n:W,tol:rel(W),u:"N"},
       T(`$G = mg = ${mf(m)}\\cdot 9{,}81 \\approx ${mf(W)}$ N.`,`$F_g = mg = ${mf(m)}\\cdot 9.81 \\approx ${mf(W)}$ N.`)]; }
   if(k===1){ const W=R.i(20,2000), m=W/G_;
     return [T(`En last har tyngden ${W} N. Hva er massen? ($g = 9{,}81$ m/s²)`,`A load has a weight of ${W} N. What is its mass? ($g = 9.81$ m/s²)`),{n:m,tol:rel(m),u:"kg"},
       T(`$m = \\dfrac{G}{g} = \\dfrac{${W}}{9{,}81} \\approx ${mf(m)}$ kg.`,`$m = \\dfrac{F_g}{g} = \\dfrac{${W}}{9.81} \\approx ${mf(m)}$ kg.`)]; }
   const m=R.f(2,150,0.5), Wm=m*1.62;
   return [T(`Et måleinstrument har massen ${nf(m)} kg. Hva er tyngden av instrumentet på månen, der $g = 1{,}62$ m/s²?`,`A measuring instrument has a mass of ${nf(m)} kg. What is its weight on the Moon, where $g = 1.62$ m/s²?`),{n:Wm,tol:rel(Wm),u:"N"},
     T(`Massen er den samme overalt, men $g$ er mindre: $G = mg = ${mf(m)}\\cdot 1{,}62 \\approx ${mf(Wm)}$ N. (På jorda ville tyngden vært ${nf(m*G_)} N.)`,
       `The mass is the same everywhere, but $g$ is smaller: $F_g = mg = ${mf(m)}\\cdot 1.62 \\approx ${mf(Wm)}$ N. (On Earth the weight would be ${nf(m*G_)} N.)`)]; },
 // 1: Newtons 2. lov, ett steg
 ()=>{ const k=R.i(0,2), m=R.i(2,60), a=R.f(0.5,6,0.5), F=m*a;
   if(k===0) return [T(`En kraftsum på ${nf(F)} N virker på en vogn med massen ${m} kg. Hva er akselerasjonen?`,`A net force of ${nf(F)} N acts on a cart with a mass of ${m} kg. What is its acceleration?`),{n:a,tol:rel(a),u:"m/s²"},
     T(`Newtons 2. lov: $a = \\dfrac{\\sum F}{m} = \\dfrac{${mf(F)}}{${m}} = ${mf(a)}$ m/s².`,`Newton's second law: $a = \\dfrac{\\sum F}{m} = \\dfrac{${mf(F)}}{${m}} = ${mf(a)}$ m/s².`)];
   if(k===1) return [T(`Hvor stor kraftsum trengs for å gi en vogn med massen ${m} kg akselerasjonen ${nf(a)} m/s²?`,`What net force is needed to give a cart with a mass of ${m} kg an acceleration of ${nf(a)} m/s²?`),{n:F,tol:rel(F),u:"N"},
     T(`Newtons 2. lov: $\\sum F = ma = ${m}\\cdot ${mf(a)} = ${mf(F)}$ N.`,`Newton's second law: $\\sum F = ma = ${m}\\cdot ${mf(a)} = ${mf(F)}$ N.`)];
   return [T(`En kraftsum på ${nf(F)} N gir en vogn akselerasjonen ${nf(a)} m/s². Hva er massen til vogna?`,`A net force of ${nf(F)} N gives a cart an acceleration of ${nf(a)} m/s². What is the mass of the cart?`),{n:m,tol:rel(m),u:"kg"},
     T(`Newtons 2. lov: $m = \\dfrac{\\sum F}{a} = \\dfrac{${mf(F)}}{${mf(a)}} = ${m}$ kg.`,`Newton's second law: $m = \\dfrac{\\sum F}{a} = \\dfrac{${mf(F)}}{${mf(a)}} = ${m}$ kg.`)]; },
 // 2: konstant fart med friksjon (1. lov)
 ()=>{ const m=R.i(10,120), mu=R.f(0.15,0.6,0.05), F=mu*m*G_;
   return [T(`En kasse på ${m} kg skyves bortover et vannrett gulv med konstant fart. Friksjonstallet er $\\mu_k = ${mf(mu)}$. Hvor stor vannrett kraft må du skyve med? ($g = 9{,}81$ m/s²)`,
             `A ${m} kg crate is pushed across a horizontal floor at constant velocity. The coefficient of kinetic friction is $\\mu_k = ${mf(mu)}$. How large a horizontal force must you push with? ($g = 9.81$ m/s²)`),{n:F,tol:rel(F),u:"N"},
     T(`Konstant fart betyr at kraftsummen er null (Newtons 1. lov). Skyvekraften må derfor være like stor som friksjonen: $F = R = \\mu_k N = \\mu_k mg = ${mf(mu)}\\cdot ${m}\\cdot 9{,}81 \\approx ${mf(F)}$ N.`,
       `Constant velocity means the net force is zero (Newton's first law). The pushing force must therefore equal the friction: $F = f = \\mu_k N = \\mu_k mg = ${mf(mu)}\\cdot ${m}\\cdot 9.81 \\approx ${mf(F)}$ N.`)]; },
 // 3: heis – normalkraft ved akselerasjon
 ()=>{ const m=R.i(45,110), a=R.f(0.5,3,0.1), dn=R.i(0,1), N=m*(G_+(dn?-a:a));
   return [T(`En person på ${m} kg står på en badevekt i en heis. Heisen starter fra ro og akselererer ${dn?"nedover":"oppover"} med ${nf(a)} m/s². Hvor stor er normalkraften fra vekta på personen? ($g = 9{,}81$ m/s²)`,
             `A ${m} kg person stands on a bathroom scale in an elevator. The elevator starts from rest and accelerates ${dn?"downward":"upward"} at ${nf(a)} m/s². What is the normal force from the scale on the person? ($g = 9.81$ m/s²)`),{n:N,tol:rel(N),u:"N"},
     T(`Kreftene på personen er normalkraften $N$ oppover og tyngden $mg$ nedover. Med ${dn?"nedover":"oppover"} som positiv retning gir Newtons 2. lov ${dn?"$mg - N = ma$, så $N = m(g - a)$":"$N - mg = ma$, så $N = m(g + a)$"} $= ${m}\\cdot(9{,}81 ${dn?"-":"+"} ${mf(a)}) \\approx ${mf(N)}$ N. Vekta viser ${dn?"mindre":"mer"} enn når heisen står stille (${nf(m*G_)} N).`,
       `The forces on the person are the normal force $N$ upward and the weight $mg$ downward. Taking ${dn?"downward":"upward"} as positive, Newton's second law gives ${dn?"$mg - N = ma$, so $N = m(g - a)$":"$N - mg = ma$, so $N = m(g + a)$"} $= ${m}\\cdot(9.81 ${dn?"-":"+"} ${mf(a)}) \\approx ${mf(N)}$ N. The scale reads ${dn?"less":"more"} than when the elevator is at rest (${nf(m*G_)} N).`)]; },
 // 4: skråplan med friksjon
 ()=>{ let th, mu; do{ th=R.i(20,50); mu=R.f(0.05,0.5,0.05); }while(Math.tan(th*DEG)-mu<0.1);
   const m=R.i(2,40), a=G_*(Math.sin(th*DEG)-mu*Math.cos(th*DEG));
   return [T(`En kloss på ${m} kg glir nedover et skråplan med helningsvinkel ${th}°. Friksjonstallet er $\\mu_k = ${mf(mu)}$. Hva er akselerasjonen nedover planet? ($g = 9{,}81$ m/s²)`,
             `A ${m} kg block slides down an incline at ${th}°. The coefficient of kinetic friction is $\\mu_k = ${mf(mu)}$. What is its acceleration down the incline? ($g = 9.81$ m/s²)`),{n:a,tol:rel(a),u:"m/s²"},
     T(`Langs planet: $mg\\sin\\theta - R = ma$, der $R = \\mu_k N$ og $N = mg\\cos\\theta$. Massen forkortes: $a = g(\\sin\\theta - \\mu_k\\cos\\theta) = 9{,}81(\\sin ${th}^\\circ - ${mf(mu)}\\cos ${th}^\\circ) \\approx ${mf(a)}$ m/s².`,
       `Along the incline: $mg\\sin\\theta - f = ma$, where $f = \\mu_k N$ and $N = mg\\cos\\theta$. The mass cancels: $a = g(\\sin\\theta - \\mu_k\\cos\\theta) = 9.81(\\sin ${th}^\\circ - ${mf(mu)}\\cos ${th}^\\circ) \\approx ${mf(a)}$ m/s².`)]; },
 // 5: to legemer med snor over trinse (eksamensnivå)
 ()=>{ let m1, m2, mu; do{ m1=R.i(2,20); m2=R.i(1,15); mu=R.f(0.1,0.5,0.05); }while(m2-mu*m1<0.5);
   const a=G_*(m2-mu*m1)/(m1+m2), S=m2*(G_-a), ask=R.i(0,1);
   return [T(`En kloss på ${m1} kg ligger på et vannrett bord og er festet til en snor som går over en lett, friksjonsfri trinse i bordkanten. I den andre enden av snoren henger et lodd på ${m2} kg. Friksjonstallet mellom kloss og bord er $\\mu_k = ${mf(mu)}$. ${ask?"Hvor stor er snorkraften mens systemet er i bevegelse?":"Hva er akselerasjonen til systemet?"} ($g = 9{,}81$ m/s²)`,
             `A ${m1} kg block lies on a horizontal table, attached to a rope that runs over a light, frictionless pulley at the edge of the table. A ${m2} kg weight hangs from the other end of the rope. The coefficient of kinetic friction between the block and the table is $\\mu_k = ${mf(mu)}$. ${ask?"What is the tension in the rope while the system is moving?":"What is the acceleration of the system?"} ($g = 9.81$ m/s²)`),
     ask?{n:S,tol:rel(S),u:"N"}:{n:a,tol:rel(a),u:"m/s²"},
     T(`Loddet: $m_2g - S = m_2a$. Klossen: $S - \\mu_k m_1g = m_1a$. Legger vi sammen likningene, forsvinner $S$: $a = \\dfrac{(m_2 - \\mu_k m_1)g}{m_1 + m_2} = \\dfrac{(${m2} - ${mf(mu)}\\cdot ${m1})\\cdot 9{,}81}{${m1+m2}} \\approx ${mf(a)}$ m/s². Snorkraften: $S = m_2(g - a) = ${m2}\\cdot(9{,}81 - ${mf(a)}) \\approx ${mf(S)}$ N.`,
       `Hanging weight: $m_2g - T = m_2a$. Block: $T - \\mu_k m_1g = m_1a$. Adding the equations eliminates $T$: $a = \\dfrac{(m_2 - \\mu_k m_1)g}{m_1 + m_2} = \\dfrac{(${m2} - ${mf(mu)}\\cdot ${m1})\\cdot 9.81}{${m1+m2}} \\approx ${mf(a)}$ m/s². Tension: $T = m_2(g - a) = ${m2}\\cdot(9.81 - ${mf(a)}) \\approx ${mf(S)}$ N.`)]; }
);
})();
