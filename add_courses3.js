// ============================================================
//  add_courses3.js – nye fag etter norske ingeniørstudieplaner:
//  GEO Geoteknikk (bygg), ML Maskinlæring og dataanalyse (data).
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
const deg = x => x * Math.PI / 180;

NEWCOURSE({ code: "GEO", group: "Bygg og anlegg", nb: "Geoteknikk", en: "Geotechnical Engineering", s: ["GT", "GT"],
  eqText: { nb: "Bygg: jord, effektivspenning, jordtrykk og stabilitet", en: "Civil: soil, effective stress, earth pressure and stability" },
  units: [["Jord og klassifisering", "Soil and classification"], ["Effektivspenning og setninger", "Effective stress and settlement"], ["Jordtrykk, bæreevne og stabilitet", "Earth pressure, bearing capacity and stability"]] });
NEWCOURSE({ code: "ML", group: "Programmering og data", nb: "Maskinlæring og dataanalyse", en: "Machine Learning and Data Analysis", s: ["ML", "ML"],
  eqText: { nb: "Data: modeller som lærer av data, regresjon og klassifisering", en: "Data: models that learn from data, regression and classification" },
  units: [["Data og grunnbegreper", "Data and core concepts"], ["Lineær regresjon og gradientnedstigning", "Linear regression and gradient descent"], ["Klassifisering og evaluering", "Classification and evaluation"]] });
Object.assign(PREREQ, { GEO: { need: ["MAPE1300"], nice: ["FAST", "BYGG"] }, ML: { need: ["MEK1300"], nice: ["MEK2200", "MEK2000"] } });

// ================= GEO 0: Jord og klassifisering =================
THEORY("GEO", 0, {
nb: md`## Hva handler det om?
Alt vi bygger, står på jord eller berg. Geoteknikk handler om hvordan jorda oppfører seg når vi belaster den, graver i den eller endrer grunnvannet. Første steg er alltid å finne ut **hva slags jord** det er, og hvor mye vann og luft den inneholder.

## Begreper og formler
- Jord består av tre faser: **korn** (fast stoff), **vann** og **luft**. Hulrommene mellom kornene heter porer.
- **Vanninnhold:** $w = m_w/m_s$ (vannets masse delt på tørre korns masse), ofte i prosent.
- **Poretall:** $e = V_p/V_s$ (porevolum delt på kornvolum).
- **Porøsitet:** $n = V_p/V$, og $n = \dfrac{e}{1+e}$.
- **Metningsgrad:** $S_r = V_w/V_p$. Under grunnvannstanden er jorda som regel fullt mettet, $S_r = 1$.
- **Tyngdetetthet:** $\gamma = \rho g$, i kN/m³. Vann: $\gamma_w \approx 10$ kN/m³.
- **Kornstørrelser:** leire under 0,002 mm, silt 0,002–0,063 mm, sand 0,063–2 mm, grus 2–63 mm, stein over 63 mm.
- **Sensitivitet:** $S_t = s_u/s_r$ (uforstyrret styrke delt på omrørt styrke). **Kvikkleire** har svært høy sensitivitet og blir flytende når den omrøres.

## Slik løser du oppgavene
1. Skriv opp hva som er kjent: masser, volumer eller forholdstall.
2. Tegn et fasediagram: korn nederst, så vann, så luft.
3. Bruk definisjonen direkte. Pass på hva som står i telleren og nevneren.

### Eksempel
En prøve veier 190 g våt og 160 g etter tørking. Hva er vanninnholdet?
1. Vannets masse: $190 - 160 = 30$ g.
2. $w = 30/160 = 0{,}1875 \approx 19$ %.

## Vanlige feil
- Å dele på den våte massen. Vanninnholdet regnes alltid mot **tørr** masse.
- Å blande poretall $e$ og porøsitet $n$. Poretallet kan være større enn 1, porøsiteten kan ikke.
- Å tro at leire og silt er det samme. Leire har mye mindre korn og oppfører seg helt annerledes.

> Vanninnhold regnes mot tørr masse. $n = e/(1+e)$. Kvikkleire = svært høy sensitivitet.`,
en: md`## What is it about?
Everything we build stands on soil or rock. Geotechnical engineering is about how soil behaves when we load it, dig in it or change the groundwater. The first step is always to find out **what kind of soil** it is, and how much water and air it contains.

## Concepts and formulas
- Soil consists of three phases: **grains** (solids), **water** and **air**. The spaces between the grains are called pores.
- **Water content:** $w = m_w/m_s$ (mass of water divided by mass of dry grains), often in percent.
- **Void ratio:** $e = V_p/V_s$ (pore volume divided by grain volume).
- **Porosity:** $n = V_p/V$, and $n = \dfrac{e}{1+e}$.
- **Degree of saturation:** $S_r = V_w/V_p$. Below the groundwater table the soil is usually fully saturated, $S_r = 1$.
- **Unit weight:** $\gamma = \rho g$, in kN/m³. Water: $\gamma_w \approx 10$ kN/m³.
- **Grain sizes:** clay below 0.002 mm, silt 0.002–0.063 mm, sand 0.063–2 mm, gravel 2–63 mm, cobbles above 63 mm.
- **Sensitivity:** $S_t = s_u/s_r$ (undisturbed strength divided by remoulded strength). **Quick clay** has a very high sensitivity and turns liquid when it is disturbed.

## How to solve the problems
1. Write down what is known: masses, volumes or ratios.
2. Draw a phase diagram: grains at the bottom, then water, then air.
3. Use the definition directly. Watch what is in the numerator and the denominator.

### Example
A sample weighs 190 g wet and 160 g after drying. What is the water content?
1. Mass of water: $190 - 160 = 30$ g.
2. $w = 30/160 = 0{,}1875 \approx 19$ %.

## Common mistakes
- Dividing by the wet mass. Water content is always relative to the **dry** mass.
- Mixing up void ratio $e$ and porosity $n$. The void ratio can exceed 1, the porosity cannot.
- Thinking clay and silt are the same. Clay has much smaller grains and behaves very differently.

> Water content is relative to dry mass. $n = e/(1+e)$. Quick clay = very high sensitivity.`
});
BIQ("GEO", 0, [
  ["En prøve veier 190 g våt og 160 g tørr. Hva er vanninnholdet i prosent?", { n: 18.75, tol: 0.3, u: "%" }, S`$w = (190-160)/160 = 30/160 = 0{,}1875 = 18{,}75$ %.`,
   "A sample weighs 190 g wet and 160 g dry. What is the water content in percent?", null, S`$w = (190-160)/160 = 30/160 = 0{,}1875 = 18{,}75$ %.`],
  ["Poretallet er $e = 0{,}6$. Hva er porøsiteten $n$?", { n: 0.375, tol: 0.005, u: "" }, S`$n = e/(1+e) = 0{,}6/1{,}6 = 0{,}375$.`,
   "The void ratio is $e = 0{,}6$. What is the porosity $n$?", null, S`$n = e/(1+e) = 0{,}6/1{,}6 = 0{,}375$.`],
  ["Hvilken jordart har minst korn?", ["Leire", "Silt", "Sand", "Grus"],
   "Leire har korn under 0,002 mm. Silt er 0,002–0,063 mm, sand 0,063–2 mm og grus 2–63 mm.",
   "Which soil type has the smallest grains?", ["Clay", "Silt", "Sand", "Gravel"],
   "Clay has grains below 0.002 mm. Silt is 0.002–0.063 mm, sand 0.063–2 mm and gravel 2–63 mm."],
  ["Hva kjennetegner kvikkleire?", ["Den mister nesten all styrke og blir flytende når den omrøres", "Den er svært grovkornet", "Den inneholder ikke vann", "Den er sterkere enn berg"],
   "Kvikkleire har svært høy sensitivitet: omrørt styrke er bare en liten brøkdel av den uforstyrrede. Et lite skred kan derfor utvikle seg til et stort.",
   "What characterizes quick clay?", ["It loses almost all its strength and turns liquid when disturbed", "It is very coarse-grained", "It contains no water", "It is stronger than rock"],
   "Quick clay has a very high sensitivity: the remoulded strength is only a small fraction of the undisturbed strength. A small slide can therefore grow into a large one."],
  ["Uforstyrret skjærstyrke er 30 kPa og omrørt styrke er 0,5 kPa. Hva er sensitiviteten?", { n: 60, tol: 0.5, u: "" }, S`$S_t = s_u/s_r = 30/0{,}5 = 60$.`,
   "The undisturbed shear strength is 30 kPa and the remoulded strength is 0.5 kPa. What is the sensitivity?", null, S`$S_t = s_u/s_r = 30/0{,}5 = 60$.`],
  ["En jord har densitet 1900 kg/m³. Hva er tyngdetettheten med $g = 9{,}81$ m/s²?", { n: 18.64, tol: 0.1, u: "kN/m³" }, S`$\gamma = \rho g = 1900\cdot 9{,}81 = 18\,639$ N/m³ $\approx 18{,}64$ kN/m³.`,
   "A soil has a density of 1900 kg/m³. What is the unit weight with $g = 9{,}81$ m/s²?", null, S`$\gamma = \rho g = 1900\cdot 9{,}81 = 18\,639$ N/m³ $\approx 18{,}64$ kN/m³.`],
  ["Hva er metningsgraden under grunnvannstanden?", ["Som regel 1 (alle porene er fylt med vann)", "0", "0,5", "Den er alltid større enn 1"],
   "Under grunnvannstanden er porene normalt fylt med vann, så $S_r = V_w/V_p = 1$.",
   "What is the degree of saturation below the groundwater table?", ["Usually 1 (all pores are filled with water)", "0", "0.5", "It is always greater than 1"],
   "Below the groundwater table the pores are normally filled with water, so $S_r = V_w/V_p = 1$."],
  ["Porevolumet er 0,4 m³ og kornvolumet er 0,6 m³. Hva er poretallet?", { n: 0.667, tol: 0.005, u: "" }, S`$e = V_p/V_s = 0{,}4/0{,}6 \approx 0{,}667$.`,
   "The pore volume is 0.4 m³ and the grain volume is 0.6 m³. What is the void ratio?", null, S`$e = V_p/V_s = 0{,}4/0{,}6 \approx 0{,}667$.`]
]);
GEN("GEO", 0,
 () => { const ms = R.i(120, 400), w = R.i(8, 45), mv = Math.round(ms * (1 + w / 100)), ww = (mv - ms) / ms * 100;
   return [T(`En prøve veier ${mv} g våt og ${ms} g tørr. Hva er vanninnholdet i prosent?`, `A sample weighs ${mv} g wet and ${ms} g dry. What is the water content in percent?`), { n: ww, tol: 0.3, u: "%" },
     S`$w = (${mv} - ${ms})/${ms} = ${mv - ms}/${ms} = ${mf(ww)}$ %.`]; },
 () => { const e = R.f(0.3, 1.5, 2), n = e / (1 + e);
   return [T(S`Poretallet er $e = ${mf(e)}$. Hva er porøsiteten $n$?`, S`The void ratio is $e = ${mf(e)}$. What is the porosity $n$?`), { n, tol: 0.005, u: "" }, S`$n = e/(1+e) = ${mf(e)}/${mf(1 + e)} = ${mf(n, 3)}$.`]; },
 () => { const n = R.f(0.25, 0.6, 2), e = n / (1 - n);
   return [T(S`Porøsiteten er $n = ${mf(n)}$. Hva er poretallet $e$?`, S`The porosity is $n = ${mf(n)}$. What is the void ratio $e$?`), { n: e, tol: rel(e), u: "" }, S`$e = n/(1-n) = ${mf(n)}/${mf(1 - n)} = ${mf(e, 3)}$.`]; },
 () => { const su = R.i(10, 60), sr = R.p([0.2, 0.5, 1, 2, 4, 10]), St = su / sr;
   return [T(`Uforstyrret skjærstyrke er ${su} kPa og omrørt styrke er ${nf(sr)} kPa. Hva er sensitiviteten?`, `The undisturbed shear strength is ${su} kPa and the remoulded strength is ${nf(sr)} kPa. What is the sensitivity?`), { n: St, tol: rel(St), u: "" },
     S`$S_t = s_u/s_r = ${su}/${mf(sr)} = ${mf(St)}$.`]; },
 () => { const rho = R.i(16, 22) * 100, g = rho * 9.81 / 1000;
   return [T(S`En jord har densitet ${rho} kg/m³. Hva er tyngdetettheten i kN/m³ ($g = 9{,}81$ m/s²)?`, S`A soil has a density of ${rho} kg/m³. What is the unit weight in kN/m³ ($g = 9{,}81$ m/s²)?`), { n: g, tol: 0.05, u: "kN/m³" },
     S`$\gamma = \rho g = ${rho}\cdot 9{,}81/1000 = ${mf(g)}$ kN/m³.`]; }
);

// ================= GEO 1: Effektivspenning og setninger =================
THEORY("GEO", 1, {
nb: md`## Hva handler det om?
Tyngden av jorda over et punkt gir en spenning. Men i porene står vannet under trykk og bærer en del av lasten. Det er bare resten, **effektivspenningen**, som presser kornene sammen og gir jorda styrke. Dette er kanskje den viktigste ideen i hele geoteknikken.

## Begreper og formler
- **Totalspenning** (vertikal): $\sigma_v = \sum \gamma_i h_i$, summen av tyngdetetthet ganger tykkelse for lagene over.
- **Poretrykk** (hydrostatisk): $u = \gamma_w h_w$, der $h_w$ er dybden under grunnvannstanden og $\gamma_w \approx 10$ kN/m³.
- **Effektivspenning:** $\sigma' = \sigma - u$ (Terzaghis prinsipp).
- Under grunnvannstanden kan du også bruke **neddykket tyngdetetthet** $\gamma' = \gamma - \gamma_w$ direkte.
- **Setning** av et lag med tykkelse $H$ og ødometermodul $M$: $s = \dfrac{\Delta\sigma'\, H}{M}$.
- Senkes grunnvannet, går $u$ ned og $\sigma'$ opp. Da kan leira under bygninger sette seg.

## Slik løser du oppgavene
1. Tegn en søyle med lagene og grunnvannstanden.
2. Regn ut $\sigma_v$ ved å summere lag for lag ned til punktet.
3. Regn ut $u$ fra dybden under grunnvannstanden.
4. Trekk fra: $\sigma' = \sigma_v - u$.

### Eksempel
Sand med $\gamma = 20$ kN/m³, grunnvann 2 m under terreng. Finn $\sigma'$ i 6 m dybde.
1. $\sigma_v = 20\cdot 6 = 120$ kPa.
2. $u = 10\cdot (6-2) = 40$ kPa.
3. $\sigma' = 120 - 40 = 80$ kPa.

## Vanlige feil
- Å regne poretrykk fra terrengoverflaten i stedet for fra grunnvannstanden.
- Å bruke $\gamma'$ og i tillegg trekke fra $u$. Da trekker du fra vannet to ganger.
- Å glemme at setningen skyldes endringen i **effektiv**spenning, ikke totalspenning.

> $\sigma' = \sigma - u$. Poretrykk måles fra grunnvannstanden. Senket grunnvann gir setninger.`,
en: md`## What is it about?
The weight of the soil above a point gives a stress. But the water in the pores is under pressure and carries part of the load. Only the rest, the **effective stress**, pushes the grains together and gives the soil its strength. This may be the most important idea in all of geotechnics.

## Concepts and formulas
- **Total stress** (vertical): $\sigma_v = \sum \gamma_i h_i$, the sum of unit weight times thickness for the layers above.
- **Pore pressure** (hydrostatic): $u = \gamma_w h_w$, where $h_w$ is the depth below the groundwater table and $\gamma_w \approx 10$ kN/m³.
- **Effective stress:** $\sigma' = \sigma - u$ (Terzaghi's principle).
- Below the groundwater table you can also use the **submerged unit weight** $\gamma' = \gamma - \gamma_w$ directly.
- **Settlement** of a layer of thickness $H$ and oedometer modulus $M$: $s = \dfrac{\Delta\sigma'\, H}{M}$.
- If the groundwater is lowered, $u$ goes down and $\sigma'$ goes up. Clay under buildings can then settle.

## How to solve the problems
1. Draw a column with the layers and the groundwater table.
2. Compute $\sigma_v$ by summing layer by layer down to the point.
3. Compute $u$ from the depth below the groundwater table.
4. Subtract: $\sigma' = \sigma_v - u$.

### Example
Sand with $\gamma = 20$ kN/m³, groundwater 2 m below ground. Find $\sigma'$ at 6 m depth.
1. $\sigma_v = 20\cdot 6 = 120$ kPa.
2. $u = 10\cdot (6-2) = 40$ kPa.
3. $\sigma' = 120 - 40 = 80$ kPa.

## Common mistakes
- Computing pore pressure from the ground surface instead of from the groundwater table.
- Using $\gamma'$ and also subtracting $u$. That removes the water twice.
- Forgetting that settlement comes from the change in **effective** stress, not total stress.

> $\sigma' = \sigma - u$. Pore pressure is measured from the groundwater table. Lowered groundwater causes settlement.`
});
BIQ("GEO", 1, [
  ["Sand med $\\gamma = 20$ kN/m³ og grunnvann 2 m under terreng. Hva er effektivspenningen i 6 m dybde? ($\\gamma_w = 10$ kN/m³)", { n: 80, tol: 0.5, u: "kPa" },
   S`$\sigma_v = 20\cdot 6 = 120$ kPa, $u = 10\cdot 4 = 40$ kPa, $\sigma' = 120 - 40 = 80$ kPa.`,
   "Sand with $\\gamma = 20$ kN/m³ and groundwater 2 m below ground. What is the effective stress at 6 m depth? ($\\gamma_w = 10$ kN/m³)", null,
   S`$\sigma_v = 20\cdot 6 = 120$ kPa, $u = 10\cdot 4 = 40$ kPa, $\sigma' = 120 - 40 = 80$ kPa.`],
  ["Hva er poretrykket 7 m under grunnvannstanden? ($\\gamma_w = 10$ kN/m³)", { n: 70, tol: 0.5, u: "kPa" }, S`$u = \gamma_w h_w = 10\cdot 7 = 70$ kPa.`,
   "What is the pore pressure 7 m below the groundwater table? ($\\gamma_w = 10$ kN/m³)", null, S`$u = \gamma_w h_w = 10\cdot 7 = 70$ kPa.`],
  ["Hva skjer med effektivspenningen når grunnvannstanden senkes?", ["Den øker", "Den minker", "Den er uendret", "Den blir null"],
   "Poretrykket $u$ går ned, mens totalspenningen omtrent er den samme. Da blir $\\sigma' = \\sigma - u$ større, og leira kan sette seg.",
   "What happens to the effective stress when the groundwater table is lowered?", ["It increases", "It decreases", "It is unchanged", "It becomes zero"],
   "The pore pressure $u$ drops while the total stress is about the same. Then $\\sigma' = \\sigma - u$ grows, and clay can settle."],
  ["Et 4 m tykt leirlag med ødometermodul $M = 2000$ kPa får økt effektivspenning med 50 kPa. Hvor stor blir setningen i mm?", { n: 100, tol: 1, u: "mm" },
   S`$s = \Delta\sigma' H/M = 50\cdot 4/2000 = 0{,}1$ m $= 100$ mm.`,
   "A 4 m thick clay layer with oedometer modulus $M = 2000$ kPa gets an effective stress increase of 50 kPa. How large is the settlement in mm?", null,
   S`$s = \Delta\sigma' H/M = 50\cdot 4/2000 = 0{,}1$ m $= 100$ mm.`],
  ["Hva er den neddykkede tyngdetettheten for jord med $\\gamma = 19$ kN/m³? ($\\gamma_w = 10$ kN/m³)", { n: 9, tol: 0.05, u: "kN/m³" }, S`$\gamma' = \gamma - \gamma_w = 19 - 10 = 9$ kN/m³.`,
   "What is the submerged unit weight for soil with $\\gamma = 19$ kN/m³? ($\\gamma_w = 10$ kN/m³)", null, S`$\gamma' = \gamma - \gamma_w = 19 - 10 = 9$ kN/m³.`],
  ["Hvem formulerte prinsippet $\\sigma' = \\sigma - u$?", ["Karl Terzaghi", "Isaac Newton", "Daniel Bernoulli", "Leonhard Euler"],
   "Karl Terzaghi regnes som grunnleggeren av moderne jordmekanikk. Effektivspenningsprinsippet er hans viktigste bidrag.",
   "Who formulated the principle $\\sigma' = \\sigma - u$?", ["Karl Terzaghi", "Isaac Newton", "Daniel Bernoulli", "Leonhard Euler"],
   "Karl Terzaghi is regarded as the founder of modern soil mechanics. The effective stress principle is his most important contribution."],
  ["Hvilken spenning styrer styrken og sammentrykningen av jorda?", ["Effektivspenningen", "Totalspenningen", "Poretrykket", "Atmosfæretrykket"],
   "Det er kontakten mellom kornene som gir friksjon og sammentrykning, og den bestemmes av effektivspenningen.",
   "Which stress controls the strength and compression of soil?", ["The effective stress", "The total stress", "The pore pressure", "The atmospheric pressure"],
   "It is the contact between the grains that gives friction and compression, and it is determined by the effective stress."],
  ["Leire med $\\gamma = 18$ kN/m³ og grunnvann i terreng. Hva er effektivspenningen i 10 m dybde? ($\\gamma_w = 10$ kN/m³)", { n: 80, tol: 0.5, u: "kPa" },
   S`$\gamma' = 18 - 10 = 8$ kN/m³, så $\sigma' = 8\cdot 10 = 80$ kPa.`,
   "Clay with $\\gamma = 18$ kN/m³ and groundwater at the surface. What is the effective stress at 10 m depth? ($\\gamma_w = 10$ kN/m³)", null,
   S`$\gamma' = 18 - 10 = 8$ kN/m³, so $\sigma' = 8\cdot 10 = 80$ kPa.`]
]);
GEN("GEO", 1,
 () => { const g = R.i(17, 21), gw = R.i(0, 4), z = R.i(gw + 2, 15), sv = g * z, u = 10 * (z - gw), se = sv - u;
   return [T(S`Jord med $\gamma = ${g}$ kN/m³ og grunnvann ${gw} m under terreng. Hva er effektivspenningen i ${z} m dybde? ($\gamma_w = 10$ kN/m³)`,
             S`Soil with $\gamma = ${g}$ kN/m³ and groundwater ${gw} m below ground. What is the effective stress at ${z} m depth? ($\gamma_w = 10$ kN/m³)`), { n: se, tol: 0.5, u: "kPa" },
     S`$\sigma_v = ${g}\cdot ${z} = ${sv}$ kPa, $u = 10\cdot ${z - gw} = ${u}$ kPa, $\sigma' = ${sv} - ${u} = ${se}$ kPa.`]; },
 () => { const hw = R.i(2, 25), u = 10 * hw;
   return [T(S`Hva er poretrykket ${hw} m under grunnvannstanden? ($\gamma_w = 10$ kN/m³)`, S`What is the pore pressure ${hw} m below the groundwater table? ($\gamma_w = 10$ kN/m³)`), { n: u, tol: 0.5, u: "kPa" },
     S`$u = \gamma_w h_w = 10\cdot ${hw} = ${u}$ kPa.`]; },
 () => { const H = R.i(2, 10), M = R.p([1000, 1500, 2000, 3000, 5000, 8000]), ds = R.i(10, 80), s = ds * H / M * 1000;
   return [T(S`Et ${H} m tykt leirlag med $M = ${M}$ kPa får økt effektivspenning med ${ds} kPa. Hvor stor blir setningen i mm?`,
             S`A ${H} m thick clay layer with $M = ${M}$ kPa gets an effective stress increase of ${ds} kPa. How large is the settlement in mm?`), { n: s, tol: rel(s), u: "mm" },
     S`$s = \Delta\sigma' H/M = ${ds}\cdot ${H}/${M} = ${mf(s / 1000, 4)}$ m $= ${mf(s)}$ mm.`]; },
 () => { const d = R.i(1, 5), g = R.i(17, 20), z = R.i(8, 16), du = 10 * d;
   return [T(S`Grunnvannet senkes ${d} m (fra terreng) i leire med $\gamma = ${g}$ kN/m³. Hvor mye øker effektivspenningen i ${z} m dybde? ($\gamma_w = 10$ kN/m³, ingen endring i $\gamma$)`,
             S`The groundwater is lowered ${d} m (from the surface) in clay with $\gamma = ${g}$ kN/m³. How much does the effective stress increase at ${z} m depth? ($\gamma_w = 10$ kN/m³, no change in $\gamma$)`),
     { n: du, tol: 0.5, u: "kPa" }, T(S`Totalspenningen er uendret, mens poretrykket faller med $10\cdot ${d} = ${du}$ kPa. Effektivspenningen øker derfor med ${du} kPa.`,
                                         S`The total stress is unchanged while the pore pressure drops by $10\cdot ${d} = ${du}$ kPa. The effective stress therefore increases by ${du} kPa.`)]; }
);

// ================= GEO 2: Jordtrykk, bæreevne og stabilitet =================
THEORY("GEO", 2, {
nb: md`## Hva handler det om?
En støttemur må tåle trykket fra jorda bak, et fundament må ikke synke gjennom grunnen, og en skråning må ikke gli ut. Alle tre handler om det samme: jordas **skjærstyrke** mot kreftene som prøver å få den til å gli.

## Begreper og formler
- **Friksjonsvinkel** $\varphi$ beskriver styrken i sand og grus (drenert). **Udrenert skjærstyrke** $s_u$ beskriver leire ved rask belastning.
- **Aktivt jordtrykk** (jorda skyver på en mur som gir litt etter):
$$K_a = \tan^2\!\left(45^\circ - \dfrac{\varphi}{2}\right) = \dfrac{1-\sin\varphi}{1+\sin\varphi}$$
- **Passivt jordtrykk** (muren presses mot jorda): $K_p = 1/K_a$.
- Kraft per meter mur (tørr jord, høyde $H$): $P_a = \tfrac{1}{2} K_a \gamma H^2$, som virker i høyde $H/3$ over foten.
- **Bæreevne**, stripefundament på leire (udrenert): $q_u \approx 5{,}14\, s_u$ (pluss eventuelt overlagringstrykk).
- **Sikkerhetsfaktor:** $F = \dfrac{\text{mothold}}{\text{pådrag}}$. For en uendelig lang, tørr sandskråning: $F = \dfrac{\tan\varphi}{\tan\beta}$.

## Slik løser du oppgavene
1. Finn ut om det er sand ($\varphi$) eller leire ($s_u$), og om jorda skyver (aktivt) eller blir skjøvet (passivt).
2. Regn ut jordtrykkskoeffisienten eller bæreevnefaktoren.
3. Sett inn i formelen og sjekk enhetene (kPa = kN/m², kN per meter mur).

### Eksempel
Sand med $\varphi = 30^\circ$ og $\gamma = 18$ kN/m³ bak en 4 m høy mur. Finn aktiv kraft.
1. $K_a = (1 - \sin 30^\circ)/(1 + \sin 30^\circ) = 0{,}5/1{,}5 = 1/3$.
2. $P_a = \tfrac12 \cdot \tfrac13 \cdot 18 \cdot 4^2 = 48$ kN/m.

## Vanlige feil
- Å bytte om aktivt og passivt. Passivt trykk er alltid mye **større** enn aktivt.
- Å glemme kvadratet i $H^2$. Dobbel høyde gir fire ganger så stor kraft.
- Å bruke $\varphi$ for leire ved rask belastning. Da er det $s_u$ som gjelder.

> $K_a = (1-\sin\varphi)/(1+\sin\varphi)$, $K_p = 1/K_a$, $P_a = \tfrac12 K_a\gamma H^2$. $F = \tan\varphi/\tan\beta$ for tørr sandskråning.`,
en: md`## What is it about?
A retaining wall must withstand the pressure from the soil behind it, a foundation must not sink through the ground, and a slope must not slide. All three are about the same thing: the soil's **shear strength** against the forces trying to make it slide.

## Concepts and formulas
- The **friction angle** $\varphi$ describes the strength of sand and gravel (drained). The **undrained shear strength** $s_u$ describes clay under fast loading.
- **Active earth pressure** (the soil pushes on a wall that yields slightly):
$$K_a = \tan^2\!\left(45^\circ - \dfrac{\varphi}{2}\right) = \dfrac{1-\sin\varphi}{1+\sin\varphi}$$
- **Passive earth pressure** (the wall is pushed into the soil): $K_p = 1/K_a$.
- Force per metre of wall (dry soil, height $H$): $P_a = \tfrac{1}{2} K_a \gamma H^2$, acting at height $H/3$ above the base.
- **Bearing capacity**, strip footing on clay (undrained): $q_u \approx 5{,}14\, s_u$ (plus any overburden pressure).
- **Factor of safety:** $F = \dfrac{\text{resistance}}{\text{driving force}}$. For an infinitely long, dry sand slope: $F = \dfrac{\tan\varphi}{\tan\beta}$.

## How to solve the problems
1. Decide whether it is sand ($\varphi$) or clay ($s_u$), and whether the soil pushes (active) or is pushed (passive).
2. Compute the earth pressure coefficient or bearing capacity factor.
3. Insert into the formula and check the units (kPa = kN/m², kN per metre of wall).

### Example
Sand with $\varphi = 30^\circ$ and $\gamma = 18$ kN/m³ behind a 4 m high wall. Find the active force.
1. $K_a = (1 - \sin 30^\circ)/(1 + \sin 30^\circ) = 0{,}5/1{,}5 = 1/3$.
2. $P_a = \tfrac12 \cdot \tfrac13 \cdot 18 \cdot 4^2 = 48$ kN/m.

## Common mistakes
- Swapping active and passive. Passive pressure is always much **larger** than active.
- Forgetting the square in $H^2$. Double the height gives four times the force.
- Using $\varphi$ for clay under fast loading. Then $s_u$ applies.

> $K_a = (1-\sin\varphi)/(1+\sin\varphi)$, $K_p = 1/K_a$, $P_a = \tfrac12 K_a\gamma H^2$. $F = \tan\varphi/\tan\beta$ for a dry sand slope.`
});
BIQ("GEO", 2, [
  ["Hva er $K_a$ for sand med $\\varphi = 30^\\circ$?", { n: 0.333, tol: 0.005, u: "" }, S`$K_a = (1-\sin 30^\circ)/(1+\sin 30^\circ) = 0{,}5/1{,}5 = 0{,}333$.`,
   "What is $K_a$ for sand with $\\varphi = 30^\\circ$?", null, S`$K_a = (1-\sin 30^\circ)/(1+\sin 30^\circ) = 0{,}5/1{,}5 = 0{,}333$.`],
  ["Sand med $\\varphi = 30^\\circ$ og $\\gamma = 18$ kN/m³ står bak en 4 m høy mur. Hvor stor er den aktive kraften per meter mur?", { n: 48, tol: 0.5, u: "kN/m" },
   S`$P_a = \tfrac12 K_a\gamma H^2 = 0{,}5\cdot \tfrac13\cdot 18\cdot 16 = 48$ kN/m.`,
   "Sand with $\\varphi = 30^\\circ$ and $\\gamma = 18$ kN/m³ stands behind a 4 m high wall. How large is the active force per metre of wall?", null,
   S`$P_a = \tfrac12 K_a\gamma H^2 = 0{,}5\cdot \tfrac13\cdot 18\cdot 16 = 48$ kN/m.`],
  ["Hvor høyt over foten virker den aktive jordtrykkskraften på en mur med høyde $H$ (tørr jord)?", ["$H/3$", "$H/2$", "$2H/3$", "Ved foten"],
   "Trykket øker lineært med dybden, så trykkfordelingen er en trekant. Resultanten av en trekant virker i tyngdepunktet, $H/3$ over foten.",
   "How high above the base does the active earth force act on a wall of height $H$ (dry soil)?", ["$H/3$", "$H/2$", "$2H/3$", "At the base"],
   "The pressure increases linearly with depth, so the distribution is a triangle. The resultant of a triangle acts at its centroid, $H/3$ above the base."],
  ["Leire har $s_u = 25$ kPa. Hva er den udrenerte bæreevnen for et stripefundament på overflaten?", { n: 128.5, tol: 1, u: "kPa" }, S`$q_u = 5{,}14\, s_u = 5{,}14\cdot 25 = 128{,}5$ kPa.`,
   "Clay has $s_u = 25$ kPa. What is the undrained bearing capacity for a strip footing on the surface?", null, S`$q_u = 5{,}14\, s_u = 5{,}14\cdot 25 = 128{,}5$ kPa.`],
  ["En tørr sandskråning har $\\varphi = 35^\\circ$ og helning $\\beta = 25^\\circ$. Hva er sikkerhetsfaktoren?", { n: 1.502, tol: 0.01, u: "" },
   S`$F = \tan 35^\circ/\tan 25^\circ = 0{,}700/0{,}466 = 1{,}502$.`,
   "A dry sand slope has $\\varphi = 35^\\circ$ and inclination $\\beta = 25^\\circ$. What is the factor of safety?", null,
   S`$F = \tan 35^\circ/\tan 25^\circ = 0{,}700/0{,}466 = 1{,}502$.`],
  ["Hva skjer med den aktive kraften på en mur hvis høyden dobles?", ["Den blir fire ganger så stor", "Den dobles", "Den blir uendret", "Den halveres"],
   "$P_a = \\tfrac12 K_a\\gamma H^2$ er proporsjonal med $H^2$, så dobbel høyde gir $2^2 = 4$ ganger så stor kraft.",
   "What happens to the active force on a wall if the height is doubled?", ["It becomes four times larger", "It doubles", "It is unchanged", "It halves"],
   "$P_a = \\tfrac12 K_a\\gamma H^2$ is proportional to $H^2$, so double the height gives $2^2 = 4$ times the force."],
  ["Hva er størst for samme jord?", ["Passivt jordtrykk", "Aktivt jordtrykk", "De er like store", "Det avhenger bare av vanninnholdet"],
   "$K_p = 1/K_a$. For $\\varphi = 30^\\circ$ er $K_a = 1/3$ og $K_p = 3$, altså ni ganger så stort.",
   "Which is larger for the same soil?", ["Passive earth pressure", "Active earth pressure", "They are equal", "It depends only on water content"],
   "$K_p = 1/K_a$. For $\\varphi = 30^\\circ$, $K_a = 1/3$ and $K_p = 3$, nine times as large."],
  ["Hva betyr en sikkerhetsfaktor under 1 for en skråning?", ["Pådraget er større enn motholdet, så skråningen er ustabil", "Skråningen er svært sikker", "Skråningen er akkurat vannrett", "Jorda er tørr"],
   "$F = \\text{mothold}/\\text{pådrag}$. Når $F < 1$, er kreftene som vil få jorda til å gli, større enn styrken som holder igjen.",
   "What does a factor of safety below 1 mean for a slope?", ["The driving force exceeds the resistance, so the slope is unstable", "The slope is very safe", "The slope is exactly horizontal", "The soil is dry"],
   "$F = \\text{resistance}/\\text{driving force}$. When $F < 1$, the forces trying to make the soil slide exceed the strength holding it back."]
]);
GEN("GEO", 2,
 () => { const p = R.p([25, 28, 30, 32, 34, 36, 38, 40]), Ka = (1 - Math.sin(deg(p))) / (1 + Math.sin(deg(p)));
   return [T(S`Hva er $K_a$ for sand med $\varphi = ${p}^\circ$?`, S`What is $K_a$ for sand with $\varphi = ${p}^\circ$?`), { n: Ka, tol: 0.005, u: "" },
     S`$K_a = (1-\sin ${p}^\circ)/(1+\sin ${p}^\circ) = ${mf(1 - Math.sin(deg(p)), 3)}/${mf(1 + Math.sin(deg(p)), 3)} = ${mf(Ka, 3)}$.`]; },
 () => { const p = R.p([28, 30, 32, 34, 36]), g = R.i(16, 20), H = R.i(2, 8), Ka = (1 - Math.sin(deg(p))) / (1 + Math.sin(deg(p))), P = 0.5 * Ka * g * H * H;
   return [T(S`Sand med $\varphi = ${p}^\circ$ og $\gamma = ${g}$ kN/m³ står bak en ${H} m høy mur. Hvor stor er den aktive kraften per meter mur?`,
             S`Sand with $\varphi = ${p}^\circ$ and $\gamma = ${g}$ kN/m³ stands behind a ${H} m high wall. How large is the active force per metre of wall?`), { n: P, tol: rel(P), u: "kN/m" },
     S`$K_a = ${mf(Ka, 3)}$, $P_a = 0{,}5\cdot ${mf(Ka, 3)}\cdot ${g}\cdot ${H}^2 = ${mf(P)}$ kN/m.`]; },
 () => { const su = R.i(8, 60), q = 5.14 * su;
   return [T(S`Leire har $s_u = ${su}$ kPa. Hva er den udrenerte bæreevnen for et stripefundament på overflaten?`, S`Clay has $s_u = ${su}$ kPa. What is the undrained bearing capacity for a strip footing on the surface?`),
     { n: q, tol: rel(q), u: "kPa" }, S`$q_u = 5{,}14\cdot ${su} = ${mf(q)}$ kPa.`]; },
 () => { const p = R.p([30, 32, 34, 36, 38]), b = R.i(15, p - 2), F = Math.tan(deg(p)) / Math.tan(deg(b));
   return [T(S`En tørr sandskråning har $\varphi = ${p}^\circ$ og helning $\beta = ${b}^\circ$. Hva er sikkerhetsfaktoren?`, S`A dry sand slope has $\varphi = ${p}^\circ$ and inclination $\beta = ${b}^\circ$. What is the factor of safety?`),
     { n: F, tol: 0.01, u: "" }, S`$F = \tan ${p}^\circ/\tan ${b}^\circ = ${mf(Math.tan(deg(p)), 3)}/${mf(Math.tan(deg(b)), 3)} = ${mf(F, 3)}$.`]; },
 () => { const p = R.p([25, 30, 35, 40]), Ka = (1 - Math.sin(deg(p))) / (1 + Math.sin(deg(p))), Kp = 1 / Ka;
   return [T(S`Hva er $K_p$ for sand med $\varphi = ${p}^\circ$?`, S`What is $K_p$ for sand with $\varphi = ${p}^\circ$?`), { n: Kp, tol: rel(Kp), u: "" },
     S`$K_p = (1+\sin ${p}^\circ)/(1-\sin ${p}^\circ) = ${mf(Kp, 3)}$.`]; }
);

// ================= ML 0: Data og grunnbegreper =================
THEORY("ML", 0, {
nb: md`## Hva handler det om?
Maskinlæring er å la datamaskinen finne mønstre i data i stedet for at vi skriver reglene selv. Du gir modellen mange eksempler, og den lærer seg en sammenheng den kan bruke på nye tilfeller: gjenkjenne feil i en produksjonslinje, anslå strømforbruk i morgen eller sortere e-post.

## Begreper og formler
- **Egenskaper** (features) $x$ er det modellen får inn. **Merkelapp** (label) $y$ er svaret vi vil at den skal gi.
- **Veiledet læring:** eksemplene har fasit $y$. **Regresjon** gir et tall, **klassifisering** gir en kategori.
- **Ikke-veiledet læring:** ingen fasit. For eksempel **klynging** (clustering) som finner grupper.
- **Trenings- og testsett:** modellen lærer på treningsdata og måles på testdata den aldri har sett, ofte fordelt 80/20.
- **Overtilpasning** (overfitting): modellen pugger treningsdataene, også støyen, og gjør det dårlig på nye data.
- **Min–maks-normalisering:** $x' = \dfrac{x - x_{min}}{x_{max} - x_{min}}$ gir verdier mellom 0 og 1.
- **Standardisering:** $z = \dfrac{x - \mu}{\sigma}$ gir gjennomsnitt 0 og standardavvik 1.
- **Middelkvadratfeil:** $\text{MSE} = \dfrac{1}{n}\sum (y_i - \hat y_i)^2$.

## Slik løser du oppgavene
1. Finn ut hva som er $x$ og hva som er $y$, og om svaret er et tall eller en kategori.
2. For normalisering: finn min og maks (eller $\mu$ og $\sigma$) og sett inn.
3. For feilmål: regn ut feilen for hvert punkt, kvadrer, og ta gjennomsnittet.

### Eksempel
Temperaturene 10, 15 og 30 °C skal min–maks-normaliseres. Hva blir 15?
1. $x_{min} = 10$, $x_{max} = 30$.
2. $x' = (15 - 10)/(30 - 10) = 5/20 = 0{,}25$.

## Vanlige feil
- Å teste modellen på de samme dataene den ble trent på. Da ser den mye bedre ut enn den er.
- Å normalisere med min og maks fra hele datasettet, inkludert testdata. Det lekker informasjon.
- Å tro at en mer komplisert modell alltid er bedre. Den kan lett overtilpasse.

> Tren på treningsdata, mål på testdata. Regresjon → tall, klassifisering → kategori. $z = (x-\mu)/\sigma$.`,
en: md`## What is it about?
Machine learning means letting the computer find patterns in data instead of us writing the rules. You give the model many examples, and it learns a relationship it can apply to new cases: spotting faults on a production line, estimating tomorrow's power use or sorting email.

## Concepts and formulas
- **Features** $x$ are what the model receives. The **label** $y$ is the answer we want it to give.
- **Supervised learning:** the examples have a known answer $y$. **Regression** gives a number, **classification** gives a category.
- **Unsupervised learning:** no answers. For example **clustering**, which finds groups.
- **Training and test sets:** the model learns on training data and is measured on test data it has never seen, often split 80/20.
- **Overfitting:** the model memorizes the training data, noise included, and does poorly on new data.
- **Min–max normalization:** $x' = \dfrac{x - x_{min}}{x_{max} - x_{min}}$ gives values between 0 and 1.
- **Standardization:** $z = \dfrac{x - \mu}{\sigma}$ gives mean 0 and standard deviation 1.
- **Mean squared error:** $\text{MSE} = \dfrac{1}{n}\sum (y_i - \hat y_i)^2$.

## How to solve the problems
1. Work out what $x$ is and what $y$ is, and whether the answer is a number or a category.
2. For normalization: find min and max (or $\mu$ and $\sigma$) and insert.
3. For error measures: compute the error for each point, square it, and take the mean.

### Example
The temperatures 10, 15 and 30 °C are to be min–max normalized. What does 15 become?
1. $x_{min} = 10$, $x_{max} = 30$.
2. $x' = (15 - 10)/(30 - 10) = 5/20 = 0{,}25$.

## Common mistakes
- Testing the model on the same data it was trained on. It then looks much better than it is.
- Normalizing with min and max from the whole dataset, test data included. That leaks information.
- Believing a more complex model is always better. It can easily overfit.

> Train on training data, measure on test data. Regression → number, classification → category. $z = (x-\mu)/\sigma$.`
});
BIQ("ML", 0, [
  ["Temperaturene 10, 15 og 30 °C min–maks-normaliseres. Hva blir 15?", { n: 0.25, tol: 0.005, u: "" }, S`$x' = (15-10)/(30-10) = 5/20 = 0{,}25$.`,
   "The temperatures 10, 15 and 30 °C are min–max normalized. What does 15 become?", null, S`$x' = (15-10)/(30-10) = 5/20 = 0{,}25$.`],
  ["En modell skal anslå prisen på en bolig i kroner. Hva slags oppgave er det?", ["Regresjon", "Klassifisering", "Klynging", "Ikke-veiledet læring"],
   "Svaret er et tall (en pris), og vi har eksempler med fasit. Det er veiledet regresjon.",
   "A model is to estimate the price of a home. What kind of task is it?", ["Regression", "Classification", "Clustering", "Unsupervised learning"],
   "The answer is a number (a price), and we have examples with known answers. It is supervised regression."],
  ["En modell skal avgjøre om en e-post er søppelpost eller ikke. Hva slags oppgave er det?", ["Klassifisering", "Regresjon", "Klynging", "Normalisering"],
   "Svaret er en kategori (søppel eller ikke), så det er klassifisering.",
   "A model is to decide whether an email is spam or not. What kind of task is it?", ["Classification", "Regression", "Clustering", "Normalization"],
   "The answer is a category (spam or not), so it is classification."],
  ["Modellen har 99 % treffsikkerhet på treningsdata, men bare 60 % på testdata. Hva er mest sannsynlig?", ["Overtilpasning", "Undertilpasning", "For lite trening", "Perfekt modell"],
   "Stor forskjell mellom trening og test betyr at modellen har pugget treningsdataene og ikke generaliserer. Det er overtilpasning.",
   "The model has 99 % accuracy on training data but only 60 % on test data. What is most likely?", ["Overfitting", "Underfitting", "Too little training", "A perfect model"],
   "A big gap between training and test means the model has memorized the training data and does not generalize. That is overfitting."],
  ["Et datasett har $\\mu = 50$ og $\\sigma = 10$. Hva er $z$-verdien for $x = 65$?", { n: 1.5, tol: 0.01, u: "" }, S`$z = (65-50)/10 = 1{,}5$.`,
   "A dataset has $\\mu = 50$ and $\\sigma = 10$. What is the $z$-score for $x = 65$?", null, S`$z = (65-50)/10 = 1{,}5$.`],
  ["Fasit er 3, 5 og 7, og modellen svarer 4, 5 og 5. Hva er MSE?", { n: 1.667, tol: 0.01, u: "" }, S`Feil: $-1, 0, 2$. Kvadrert: $1, 0, 4$. $\text{MSE} = 5/3 \approx 1{,}667$.`,
   "The true values are 3, 5 and 7, and the model answers 4, 5 and 5. What is the MSE?", null, S`Errors: $-1, 0, 2$. Squared: $1, 0, 4$. $\text{MSE} = 5/3 \approx 1{,}667$.`],
  ["Hvorfor holder vi av et testsett?", ["For å måle hvor godt modellen fungerer på data den ikke har sett", "For å trene raskere", "For å få flere egenskaper", "For å slippe normalisering"],
   "Testsettet brukes bare til slutt, til å anslå hvordan modellen vil gjøre det på nye, ukjente data.",
   "Why do we hold out a test set?", ["To measure how well the model works on data it has not seen", "To train faster", "To get more features", "To avoid normalization"],
   "The test set is used only at the end, to estimate how the model will do on new, unseen data."],
  ["Et datasett har 5000 rader og deles 80/20. Hvor mange rader havner i testsettet?", { n: 1000, tol: 0, u: "" }, S`$0{,}2\cdot 5000 = 1000$.`,
   "A dataset has 5000 rows and is split 80/20. How many rows end up in the test set?", null, S`$0{,}2\cdot 5000 = 1000$.`]
]);
GEN("ML", 0,
 () => { const lo = R.i(0, 40), hi = lo + R.i(20, 100), x = R.i(lo, hi), v = (x - lo) / (hi - lo);
   return [T(`Verdiene går fra ${lo} til ${hi}. Hva blir ${x} etter min–maks-normalisering?`, `The values range from ${lo} to ${hi}. What does ${x} become after min–max normalization?`), { n: v, tol: 0.005, u: "" },
     S`$x' = (${x} - ${lo})/(${hi} - ${lo}) = ${x - lo}/${hi - lo} = ${mf(v, 3)}$.`]; },
 () => { const mu = R.i(20, 200), sd = R.i(2, 30), x = mu + R.i(-3 * sd, 3 * sd), z = (x - mu) / sd;
   return [T(S`Et datasett har $\mu = ${mu}$ og $\sigma = ${sd}$. Hva er $z$-verdien for $x = ${x}$?`, S`A dataset has $\mu = ${mu}$ and $\sigma = ${sd}$. What is the $z$-score for $x = ${x}$?`), { n: z, tol: 0.01, u: "" },
     S`$z = (${x} - ${mu})/${sd} = ${mf(z, 3)}$.`]; },
 () => { const y = [R.i(1, 9), R.i(1, 9), R.i(1, 9), R.i(1, 9)], p = y.map(v => v + R.i(-3, 3)), e = y.map((v, i) => v - p[i]), mse = e.reduce((s, v) => s + v * v, 0) / 4;
   return [T(`Fasit er ${y.join(", ")} og modellen svarer ${p.join(", ")}. Hva er MSE?`, `The true values are ${y.join(", ")} and the model answers ${p.join(", ")}. What is the MSE?`), { n: mse, tol: 0.01, u: "" },
     T(S`Kvadrerte feil: $${e.map(v => v * v).join(", ")}$. $\text{MSE} = ${e.reduce((s, v) => s + v * v, 0)}/4 = ${mf(mse, 3)}$.`, S`Squared errors: $${e.map(v => v * v).join(", ")}$. $\text{MSE} = ${e.reduce((s, v) => s + v * v, 0)}/4 = ${mf(mse, 3)}$.`)]; },
 () => { const N = R.p([800, 1200, 2500, 5000, 10000, 40000]), f = R.p([10, 15, 20, 25, 30]), n = N * f / 100;
   return [T(`Et datasett har ${nf(N, 0)} rader. ${f} % brukes som testsett. Hvor mange rader er det i treningssettet?`, `A dataset has ${nf(N, 0)} rows. ${f} % is used as the test set. How many rows are in the training set?`), { n: N - n, tol: 0, u: "" },
     S`$${nf(N, 0)} - ${mf(f / 100)}\cdot ${nf(N, 0)} = ${nf(N, 0)} - ${nf(n, 0)} = ${nf(N - n, 0)}$.`]; }
);

// ================= ML 1: Lineær regresjon og gradientnedstigning =================
THEORY("ML", 1, {
nb: md`## Hva handler det om?
Den enkleste modellen som lærer av data, er en rett linje: $\hat y = wx + b$. Modellen justerer vekten $w$ og konstantleddet $b$ slik at linja treffer punktene best mulig. Nøyaktig samme idé, bare med mange flere vekter, ligger bak store nevrale nett.

## Begreper og formler
- **Modell:** $\hat y = wx + b$. $w$ er stigningstallet, $b$ er skjæringen med $y$-aksen.
- **Tapsfunksjon:** $L = \text{MSE} = \dfrac1n\sum (y_i - \hat y_i)^2$. Målet er å gjøre $L$ så liten som mulig.
- **Minste kvadraters metode** gir svaret direkte:
$$w = \dfrac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad b = \bar y - w\bar x$$
- **Gradientnedstigning:** gå litt i motsatt retning av gradienten, om og om igjen:
$$w \leftarrow w - \eta\,\dfrac{\partial L}{\partial w}$$
der $\eta$ er **læringsraten**.
- For MSE er $\dfrac{\partial L}{\partial w} = -\dfrac2n\sum x_i\,(y_i - \hat y_i)$.
- **Forklaringsgrad** $R^2$ mellom 0 og 1: hvor stor del av variasjonen i $y$ modellen forklarer.

## Slik løser du oppgavene
1. Regn ut gjennomsnittene $\bar x$ og $\bar y$.
2. Regn ut avvikene fra gjennomsnittet og sett inn i formelen for $w$, deretter $b$.
3. For ett gradientsteg: regn ut gradienten, gang med $\eta$ og trekk fra.

### Eksempel
Punktene $(1, 2)$, $(2, 4)$ og $(3, 5)$. Finn $w$.
1. $\bar x = 2$, $\bar y = 11/3$.
2. $\sum (x-\bar x)(y-\bar y) = (-1)(-5/3) + 0 + (1)(4/3) = 3$ og $\sum (x-\bar x)^2 = 2$.
3. $w = 3/2 = 1{,}5$, og $b = 11/3 - 1{,}5\cdot 2 \approx 0{,}667$.

## Vanlige feil
- For stor læringsrate: tapet hopper fram og tilbake og kan eksplodere. For liten: det tar evigheter.
- Å glemme minustegnet i oppdateringen. Vi går **nedover**, mot lavere tap.
- Å tolke en god tilpasning som årsakssammenheng.

> $\hat y = wx + b$. Minimer MSE. $w \leftarrow w - \eta\,\partial L/\partial w$.`,
en: md`## What is it about?
The simplest model that learns from data is a straight line: $\hat y = wx + b$. The model adjusts the weight $w$ and the intercept $b$ so the line fits the points as well as possible. Exactly the same idea, just with many more weights, is behind large neural networks.

## Concepts and formulas
- **Model:** $\hat y = wx + b$. $w$ is the slope, $b$ is the intercept with the $y$-axis.
- **Loss function:** $L = \text{MSE} = \dfrac1n\sum (y_i - \hat y_i)^2$. The goal is to make $L$ as small as possible.
- **Least squares** gives the answer directly:
$$w = \dfrac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad b = \bar y - w\bar x$$
- **Gradient descent:** take a small step against the gradient, over and over:
$$w \leftarrow w - \eta\,\dfrac{\partial L}{\partial w}$$
where $\eta$ is the **learning rate**.
- For MSE, $\dfrac{\partial L}{\partial w} = -\dfrac2n\sum x_i\,(y_i - \hat y_i)$.
- **Coefficient of determination** $R^2$ between 0 and 1: how much of the variation in $y$ the model explains.

## How to solve the problems
1. Compute the means $\bar x$ and $\bar y$.
2. Compute the deviations from the mean and insert into the formula for $w$, then $b$.
3. For one gradient step: compute the gradient, multiply by $\eta$ and subtract.

### Example
The points $(1, 2)$, $(2, 4)$ and $(3, 5)$. Find $w$.
1. $\bar x = 2$, $\bar y = 11/3$.
2. $\sum (x-\bar x)(y-\bar y) = (-1)(-5/3) + 0 + (1)(4/3) = 3$ and $\sum (x-\bar x)^2 = 2$.
3. $w = 3/2 = 1{,}5$, and $b = 11/3 - 1{,}5\cdot 2 \approx 0{,}667$.

## Common mistakes
- Too large a learning rate: the loss jumps back and forth and can blow up. Too small: it takes forever.
- Forgetting the minus sign in the update. We go **downhill**, towards lower loss.
- Reading a good fit as cause and effect.

> $\hat y = wx + b$. Minimize MSE. $w \leftarrow w - \eta\,\partial L/\partial w$.`
});
BIQ("ML", 1, [
  ["Punktene $(1, 2)$, $(2, 4)$ og $(3, 5)$. Hva er stigningstallet $w$ med minste kvadraters metode?", { n: 1.5, tol: 0.01, u: "" },
   S`$\bar x = 2$, $\bar y = 11/3$. $\sum (x-\bar x)(y-\bar y) = 3$, $\sum (x-\bar x)^2 = 2$, så $w = 3/2 = 1{,}5$.`,
   "The points $(1, 2)$, $(2, 4)$ and $(3, 5)$. What is the slope $w$ by least squares?", null,
   S`$\bar x = 2$, $\bar y = 11/3$. $\sum (x-\bar x)(y-\bar y) = 3$, $\sum (x-\bar x)^2 = 2$, so $w = 3/2 = 1{,}5$.`],
  ["Modellen er $\\hat y = 2x + 1$. Hva spår den for $x = 4$?", { n: 9, tol: 0, u: "" }, S`$\hat y = 2\cdot 4 + 1 = 9$.`,
   "The model is $\\hat y = 2x + 1$. What does it predict for $x = 4$?", null, S`$\hat y = 2\cdot 4 + 1 = 9$.`],
  ["Vekten er $w = 3$, gradienten er $\\partial L/\\partial w = 4$ og læringsraten er $\\eta = 0{,}1$. Hva blir den nye vekten?", { n: 2.6, tol: 0.001, u: "" },
   S`$w \leftarrow 3 - 0{,}1\cdot 4 = 2{,}6$.`,
   "The weight is $w = 3$, the gradient is $\\partial L/\\partial w = 4$ and the learning rate is $\\eta = 0{,}1$. What is the new weight?", null,
   S`$w \leftarrow 3 - 0{,}1\cdot 4 = 2{,}6$.`],
  ["Tapet hopper opp og ned og blir større for hvert steg. Hva er den mest sannsynlige årsaken?", ["For stor læringsrate", "For liten læringsrate", "For mange testdata", "At $b$ er null"],
   "Med for stor $\\eta$ skyter hvert steg over minimumet, og feilen kan vokse. Prøv å minske læringsraten.",
   "The loss jumps up and down and grows with every step. What is the most likely cause?", ["Too large a learning rate", "Too small a learning rate", "Too much test data", "That $b$ is zero"],
   "With too large an $\\eta$ each step overshoots the minimum, and the error can grow. Try reducing the learning rate."],
  ["Hvorfor står det et minustegn i $w \\leftarrow w - \\eta\\,\\partial L/\\partial w$?", ["Gradienten peker oppover, og vi vil nedover mot lavere tap", "For å gjøre vektene negative", "Fordi læringsraten er negativ", "Det er bare en konvensjon uten betydning"],
   "Gradienten peker i retningen der tapet øker raskest. Vi går motsatt vei for å minske det.",
   "Why is there a minus sign in $w \\leftarrow w - \\eta\\,\\partial L/\\partial w$?", ["The gradient points uphill, and we want to go downhill to lower loss", "To make the weights negative", "Because the learning rate is negative", "It is just a convention with no meaning"],
   "The gradient points where the loss increases fastest. We go the opposite way to reduce it."],
  ["En modell har $R^2 = 0{,}9$. Hva betyr det?", ["Modellen forklarer 90 % av variasjonen i $y$", "Modellen tar feil 90 % av gangene", "Stigningstallet er 0,9", "90 % av dataene er testdata"],
   "$R^2$ er andelen av variasjonen i $y$ som modellen forklarer. 0,9 betyr 90 %.",
   "A model has $R^2 = 0{,}9$. What does it mean?", ["The model explains 90 % of the variation in $y$", "The model is wrong 90 % of the time", "The slope is 0.9", "90 % of the data is test data"],
   "$R^2$ is the share of the variation in $y$ that the model explains. 0.9 means 90 %."],
  ["Linja har $w = 1{,}5$, og gjennomsnittene er $\\bar x = 2$ og $\\bar y = 5$. Hva er $b$?", { n: 2, tol: 0.001, u: "" }, S`$b = \bar y - w\bar x = 5 - 1{,}5\cdot 2 = 2$.`,
   "The line has $w = 1{,}5$ and the means are $\\bar x = 2$ and $\\bar y = 5$. What is $b$?", null, S`$b = \bar y - w\bar x = 5 - 1{,}5\cdot 2 = 2$.`],
  ["Et punkt har $y = 10$, og modellen spår $\\hat y = 7$. Hva er det kvadrerte avviket?", { n: 9, tol: 0, u: "" }, S`$(10 - 7)^2 = 3^2 = 9$.`,
   "A point has $y = 10$ and the model predicts $\\hat y = 7$. What is the squared error?", null, S`$(10 - 7)^2 = 3^2 = 9$.`]
]);
GEN("ML", 1,
 () => { const w = R.i(-4, 5) || 2, b = R.i(-6, 6), x = R.i(-5, 10), y = w * x + b;
   return [T(S`Modellen er $\hat y = ${w}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$. Hva spår den for $x = ${x}$?`, S`The model is $\hat y = ${w}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$. What does it predict for $x = ${x}$?`), { n: y, tol: 0, u: "" },
     S`$\hat y = ${w}\cdot (${x}) ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${y}$.`]; },
 () => { const w = R.f(-3, 5, 1), g = R.f(-8, 8, 1) || 2, eta = R.p([0.01, 0.05, 0.1, 0.2, 0.5]), nw = w - eta * g;
   return [T(S`Vekten er $w = ${mf(w)}$, gradienten er ${mf(g)} og læringsraten er $\eta = ${mf(eta)}$. Hva blir den nye vekten?`, S`The weight is $w = ${mf(w)}$, the gradient is ${mf(g)} and the learning rate is $\eta = ${mf(eta)}$. What is the new weight?`),
     { n: nw, tol: 0.001, u: "" }, S`$w \leftarrow ${mf(w)} - ${mf(eta)}\cdot (${mf(g)}) = ${mf(nw, 3)}$.`]; },
 () => { const w0 = R.i(1, 3), b0 = R.i(0, 4), xs = [1, 2, 3, 4], ys = xs.map(x => w0 * x + b0 + R.p([-1, 0, 0, 1])), mx = 2.5, my = ys.reduce((a, b) => a + b) / 4;
   const sxy = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0), w = sxy / 5;
   return [T(S`Punktene har $x = 1, 2, 3, 4$ og $y = ${ys.join(", ")}$. Hva er stigningstallet $w$ med minste kvadraters metode?`, S`The points have $x = 1, 2, 3, 4$ and $y = ${ys.join(", ")}$. What is the slope $w$ by least squares?`),
     { n: w, tol: 0.01, u: "" }, S`$\bar x = 2{,}5$, $\bar y = ${mf(my)}$, $\sum (x-\bar x)(y-\bar y) = ${mf(sxy)}$, $\sum (x-\bar x)^2 = 5$${T(", så", ", so")} $w = ${mf(sxy)}/5 = ${mf(w, 3)}$.`]; },
 () => { const w = R.f(0.5, 4, 1), mx = R.i(1, 20), my = R.i(5, 60), b = my - w * mx;
   return [T(S`Linja har $w = ${mf(w)}$, og gjennomsnittene er $\bar x = ${mx}$ og $\bar y = ${my}$. Hva er $b$?`, S`The line has $w = ${mf(w)}$ and the means are $\bar x = ${mx}$ and $\bar y = ${my}$. What is $b$?`),
     { n: b, tol: 0.01, u: "" }, S`$b = \bar y - w\bar x = ${my} - ${mf(w)}\cdot ${mx} = ${mf(b, 3)}$.`]; }
);

// ================= ML 2: Klassifisering og evaluering =================
THEORY("ML", 2, {
nb: md`## Hva handler det om?
En klassifiseringsmodell sier «ja» eller «nei»: er delen defekt, er svulsten ondartet, er transaksjonen svindel? For å vite om modellen er god, må vi telle opp hvor den treffer og hvor den bommer. Og vi må velge hvor streng den skal være.

## Begreper og formler
- **Forvekslingsmatrisen** (confusion matrix) teller fire utfall:
  sant positiv (TP), falsk positiv (FP), sant negativ (TN) og falsk negativ (FN).
- **Treffsikkerhet** (accuracy): $\dfrac{TP + TN}{N}$.
- **Presisjon:** $\dfrac{TP}{TP + FP}$. Av dem modellen sa ja til, hvor mange var riktige?
- **Gjenkalling** (recall): $\dfrac{TP}{TP + FN}$. Av alle de ekte positive, hvor mange fant modellen?
- **F1-mål:** $F_1 = \dfrac{2PR}{P + R}$, et kompromiss mellom presisjon $P$ og gjenkalling $R$.
- **Logistisk regresjon** gir en sannsynlighet med sigmoidfunksjonen $\sigma(z) = \dfrac{1}{1 + e^{-z}}$. Over en **terskel** (ofte 0,5) sier modellen ja.
- **k nærmeste naboer** (k-NN): et nytt punkt får samme klasse som flertallet av de $k$ nærmeste punktene.

## Slik løser du oppgavene
1. Sett opp de fire tallene TP, FP, TN og FN.
2. Velg riktig formel: presisjon ser på de positive **svarene**, gjenkalling på de positive **tilfellene**.
3. Tenk på hva som er verst: en falsk alarm eller et tilfelle som blir oversett?

### Eksempel
En modell finner 40 av 50 defekte deler, og slår falsk alarm på 10 fine deler. Presisjon og gjenkalling?
1. $TP = 40$, $FN = 10$, $FP = 10$.
2. Presisjon $= 40/50 = 0{,}8$. Gjenkalling $= 40/50 = 0{,}8$.

## Vanlige feil
- Å stole på treffsikkerhet når klassene er skjeve. Er bare 1 % svindel, får en modell som alltid sier «nei», 99 %.
- Å bytte om presisjon og gjenkalling.
- Å tro at terskelen må være 0,5. Lavere terskel gir høyere gjenkalling, men lavere presisjon.

> Presisjon = TP/(TP+FP), gjenkalling = TP/(TP+FN). Skjeve klasser → ikke stol på treffsikkerhet alene.`,
en: md`## What is it about?
A classification model says "yes" or "no": is the part defective, is the tumour malignant, is the transaction fraud? To know whether the model is good, we must count where it hits and where it misses. And we must choose how strict it should be.

## Concepts and formulas
- The **confusion matrix** counts four outcomes:
  true positive (TP), false positive (FP), true negative (TN) and false negative (FN).
- **Accuracy:** $\dfrac{TP + TN}{N}$.
- **Precision:** $\dfrac{TP}{TP + FP}$. Of those the model said yes to, how many were right?
- **Recall:** $\dfrac{TP}{TP + FN}$. Of all the real positives, how many did the model find?
- **F1 score:** $F_1 = \dfrac{2PR}{P + R}$, a compromise between precision $P$ and recall $R$.
- **Logistic regression** gives a probability with the sigmoid function $\sigma(z) = \dfrac{1}{1 + e^{-z}}$. Above a **threshold** (often 0.5) the model says yes.
- **k nearest neighbours** (k-NN): a new point gets the class of the majority of the $k$ nearest points.

## How to solve the problems
1. Set up the four numbers TP, FP, TN and FN.
2. Pick the right formula: precision looks at the positive **answers**, recall at the positive **cases**.
3. Think about what is worse: a false alarm or a missed case?

### Example
A model finds 40 of 50 defective parts and raises a false alarm on 10 good parts. Precision and recall?
1. $TP = 40$, $FN = 10$, $FP = 10$.
2. Precision $= 40/50 = 0{,}8$. Recall $= 40/50 = 0{,}8$.

## Common mistakes
- Trusting accuracy when the classes are imbalanced. If only 1 % is fraud, a model that always says "no" gets 99 %.
- Swapping precision and recall.
- Believing the threshold must be 0.5. A lower threshold gives higher recall but lower precision.

> Precision = TP/(TP+FP), recall = TP/(TP+FN). Imbalanced classes → do not trust accuracy alone.`
});
BIQ("ML", 2, [
  ["TP = 40, FP = 10, FN = 20. Hva er presisjonen?", { n: 0.8, tol: 0.005, u: "" }, S`$P = TP/(TP+FP) = 40/50 = 0{,}8$.`,
   "TP = 40, FP = 10, FN = 20. What is the precision?", null, S`$P = TP/(TP+FP) = 40/50 = 0{,}8$.`],
  ["TP = 40, FP = 10, FN = 20. Hva er gjenkallingen?", { n: 0.667, tol: 0.005, u: "" }, S`$R = TP/(TP+FN) = 40/60 \approx 0{,}667$.`,
   "TP = 40, FP = 10, FN = 20. What is the recall?", null, S`$R = TP/(TP+FN) = 40/60 \approx 0{,}667$.`],
  ["Presisjonen er 0,8 og gjenkallingen er 0,5. Hva er F1?", { n: 0.615, tol: 0.005, u: "" }, S`$F_1 = 2\cdot 0{,}8\cdot 0{,}5/(0{,}8+0{,}5) = 0{,}8/1{,}3 \approx 0{,}615$.`,
   "The precision is 0.8 and the recall is 0.5. What is F1?", null, S`$F_1 = 2\cdot 0{,}8\cdot 0{,}5/(0{,}8+0{,}5) = 0{,}8/1{,}3 \approx 0{,}615$.`],
  ["Hva er $\\sigma(0)$ for sigmoidfunksjonen?", { n: 0.5, tol: 0.001, u: "" }, S`$\sigma(0) = 1/(1 + e^0) = 1/2 = 0{,}5$.`,
   "What is $\\sigma(0)$ for the sigmoid function?", null, S`$\sigma(0) = 1/(1 + e^0) = 1/2 = 0{,}5$.`],
  ["Bare 1 % av transaksjonene er svindel. En modell sier alltid «ikke svindel». Hvilken treffsikkerhet får den?", { n: 99, tol: 0.1, u: "%" },
   S`Den har rett på alle de 99 % som ikke er svindel, altså 99 % treffsikkerhet. Men gjenkallingen er 0, så modellen er ubrukelig.`,
   "Only 1 % of transactions are fraud. A model always says \"not fraud\". What accuracy does it get?", null,
   S`It is right on all the 99 % that are not fraud, so 99 % accuracy. But the recall is 0, so the model is useless.`],
  ["Ved kreftscreening er det verst å overse syke. Hvilket mål er viktigst å få høyt?", ["Gjenkalling", "Presisjon", "Treffsikkerhet", "MSE"],
   "Gjenkalling måler hvor mange av de ekte positive modellen finner. Et oversett tilfelle (FN) er det farligste her.",
   "In cancer screening it is worst to miss sick patients. Which measure is most important to get high?", ["Recall", "Precision", "Accuracy", "MSE"],
   "Recall measures how many of the real positives the model finds. A missed case (FN) is the most dangerous here."],
  ["Hva skjer vanligvis når terskelen senkes fra 0,5 til 0,3?", ["Gjenkallingen øker og presisjonen synker", "Presisjonen øker og gjenkallingen synker", "Begge øker", "Ingenting endres"],
   "Med lavere terskel sier modellen oftere ja. Den fanger flere ekte positive (høyere gjenkalling), men gir også flere falske alarmer (lavere presisjon).",
   "What usually happens when the threshold is lowered from 0.5 to 0.3?", ["Recall rises and precision falls", "Precision rises and recall falls", "Both rise", "Nothing changes"],
   "With a lower threshold the model says yes more often. It catches more real positives (higher recall) but also gives more false alarms (lower precision)."],
  ["I k-NN med $k = 5$ har de fem nærmeste naboene klassene A, B, A, A, B. Hvilken klasse får det nye punktet?", ["A", "B", "Uavgjort", "Ingen"],
   "Tre av fem naboer er A, så flertallet bestemmer: klasse A.",
   "In k-NN with $k = 5$ the five nearest neighbours have the classes A, B, A, A, B. Which class does the new point get?", ["A", "B", "A tie", "None"],
   "Three of five neighbours are A, so the majority decides: class A."]
]);
GEN("ML", 2,
 () => { const TP = R.i(10, 90), FP = R.i(1, 40), P = TP / (TP + FP);
   return [T(`En modell har TP = ${TP} og FP = ${FP}. Hva er presisjonen?`, `A model has TP = ${TP} and FP = ${FP}. What is the precision?`), { n: P, tol: 0.005, u: "" }, S`$P = ${TP}/(${TP}+${FP}) = ${TP}/${TP + FP} = ${mf(P, 3)}$.`]; },
 () => { const TP = R.i(10, 90), FN = R.i(1, 40), Rc = TP / (TP + FN);
   return [T(`En modell har TP = ${TP} og FN = ${FN}. Hva er gjenkallingen?`, `A model has TP = ${TP} and FN = ${FN}. What is the recall?`), { n: Rc, tol: 0.005, u: "" }, S`$R = ${TP}/(${TP}+${FN}) = ${TP}/${TP + FN} = ${mf(Rc, 3)}$.`]; },
 () => { const TP = R.i(20, 80), FP = R.i(2, 30), FN = R.i(2, 30), TN = R.i(50, 400), N = TP + FP + FN + TN, A = (TP + TN) / N;
   return [T(`TP = ${TP}, FP = ${FP}, FN = ${FN}, TN = ${TN}. Hva er treffsikkerheten?`, `TP = ${TP}, FP = ${FP}, FN = ${FN}, TN = ${TN}. What is the accuracy?`), { n: A, tol: 0.005, u: "" },
     S`$(${TP}+${TN})/${N} = ${TP + TN}/${N} = ${mf(A, 3)}$.`]; },
 () => { const P = R.f(0.4, 0.95, 2), Rc = R.f(0.3, 0.95, 2), F = 2 * P * Rc / (P + Rc);
   return [T(`Presisjonen er ${nf(P)} og gjenkallingen er ${nf(Rc)}. Hva er F1?`, `The precision is ${nf(P)} and the recall is ${nf(Rc)}. What is F1?`), { n: F, tol: 0.005, u: "" },
     S`$F_1 = 2\cdot ${mf(P)}\cdot ${mf(Rc)}/(${mf(P)}+${mf(Rc)}) = ${mf(F, 3)}$.`]; },
 () => { const z = R.f(-4, 4, 1), s = 1 / (1 + Math.exp(-z));
   return [T(S`Hva er $\sigma(${mf(z)})$ for sigmoidfunksjonen $\sigma(z) = 1/(1+e^{-z})$?`, S`What is $\sigma(${mf(z)})$ for the sigmoid function $\sigma(z) = 1/(1+e^{-z})$?`), { n: s, tol: 0.002, u: "" },
     S`$\sigma(${mf(z)}) = 1/(1 + e^{${mf(-z)}}) = ${mf(s, 3)}$.`]; }
);
})();
