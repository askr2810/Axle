// Teoribok – emnesider for nye fag: ELKR, GEO og ML (add_courses2.js og add_courses3.js).
// Samme format som top_ref.js. Test: node tools/test_topics.js top_new_c.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- ELKR 0: Transformatoren ----------
TOPICS("ELKR", 0, [
{ id: "omsetningsforhold",
  fig: `<svg viewBox="0 0 240 140"><rect x="95" y="20" width="50" height="100" class="d"/><path d="M60 40c-12 0-12 10 0 10s12 10 0 10-12 10 0 10 12 10 0 10-12 10 0 10" class="a"/><path d="M180 50c12 0 12 10 0 10s-12 10 0 10 12 10 0 10" class="g"/><text x="30" y="75">U1</text><text x="196" y="75">U2</text><text x="54" y="32">N1</text><text x="176" y="42">N2</text></svg>`,
  nb: O("Omsetningsforhold", "En transformator har to spoler rundt en felles jernkjerne. Vekselstrømmen i primærspolen lager et magnetfelt som gir spenning i sekundærspolen. Spenningen omsettes i samme forhold som antall vindinger.",
    [[R`\frac{U_1}{U_2} = \frac{N_1}{N_2}`, "spenning følger vindingstallet"], [R`\frac{I_1}{I_2} = \frac{N_2}{N_1}`, "strømmen omsettes motsatt"]],
    [["U_1,\\ U_2", "primær- og sekundærspenning", "V"], ["N_1,\\ N_2", "antall vindinger", ""], ["I_1,\\ I_2", "primær- og sekundærstrøm", "A"]],
    R`$N_1 = 1000$, $N_2 = 50$ og $U_1 = 230$ V:
$U_2 = 230\cdot 50/1000 = 11{,}5$ V.`, "Transformatoren virker bare med vekselstrøm. Likestrøm gir ikke noe varierende magnetfelt."),
  en: O("Turns ratio", "A transformer has two coils around a shared iron core. The alternating current in the primary coil creates a magnetic field that induces a voltage in the secondary coil. The voltage is transformed in the same ratio as the number of turns.",
    [[R`\frac{U_1}{U_2} = \frac{N_1}{N_2}`, "voltage follows the turns"], [R`\frac{I_1}{I_2} = \frac{N_2}{N_1}`, "current is transformed inversely"]],
    [["U_1,\\ U_2", "primary and secondary voltage", "V"], ["N_1,\\ N_2", "number of turns", ""], ["I_1,\\ I_2", "primary and secondary current", "A"]],
    R`$N_1 = 1000$, $N_2 = 50$ and $U_1 = 230$ V:
$U_2 = 230\cdot 50/1000 = 11{,}5$ V.`, "A transformer only works with AC. DC gives no changing magnetic field.") },
{ id: "ideell-transformator",
  nb: O("Ideell transformator", "I en ideell transformator går ingen energi tapt. Da er effekten inn lik effekten ut. Transformerer du spenningen opp, går strømmen ned tilsvarende, og omvendt.",
    [[R`U_1 I_1 = U_2 I_2`, "effekt inn er lik effekt ut"], [R`S = U\,I`, "tilsynelatende effekt"]],
    [["S", "tilsynelatende effekt", "VA"], ["U", "spenning", "V"], ["I", "strøm", "A"]],
    R`230 V inn, 12 V ut og 5 A på sekundærsiden:
$I_1 = 12\cdot 5/230 \approx 0{,}26$ A.`, "Siden med høyest spenning har minst strøm, og kan derfor ha tynnere ledning."),
  en: O("Ideal transformer", "In an ideal transformer no energy is lost. The power in then equals the power out. If you step the voltage up, the current goes down correspondingly, and the other way round.",
    [[R`U_1 I_1 = U_2 I_2`, "power in equals power out"], [R`S = U\,I`, "apparent power"]],
    [["S", "apparent power", "VA"], ["U", "voltage", "V"], ["I", "current", "A"]],
    R`230 V in, 12 V out and 5 A on the secondary side:
$I_1 = 12\cdot 5/230 \approx 0.26$ A.`, "The side with the highest voltage has the least current, so it can use thinner wire.") },
{ id: "trafo-tap",
  nb: O("Tap og virkningsgrad", "Ekte transformatorer har tap. Jerntapet skyldes magnetiseringen av kjernen og er nesten konstant. Kobbertapet skyldes motstanden i viklingene og vokser med kvadratet av strømmen. Virkningsgraden er gjerne over 95 %.",
    [[R`\eta = \frac{P_2}{P_2 + P_{Fe} + P_{Cu}}`, "virkningsgrad"], [R`P_{Cu} = R\,I^2`, "kobbertap"]],
    [[R`\eta`, "virkningsgrad", ""], ["P_{Fe}", "jerntap", "W"], ["P_{Cu}", "kobbertap", "W"]],
    R`Levert 10 kW, jerntap 150 W og kobbertap 250 W:
$\eta = 10\,000/10\,400 \approx 96\,\%$.`, "Halv last gir en firedel av kobbertapet, men samme jerntap."),
  en: O("Losses and efficiency", "Real transformers have losses. Iron loss comes from magnetizing the core and is almost constant. Copper loss comes from the resistance of the windings and grows with the square of the current. The efficiency is typically above 95 %.",
    [[R`\eta = \frac{P_2}{P_2 + P_{Fe} + P_{Cu}}`, "efficiency"], [R`P_{Cu} = R\,I^2`, "copper loss"]],
    [[R`\eta`, "efficiency", ""], ["P_{Fe}", "iron loss", "W"], ["P_{Cu}", "copper loss", "W"]],
    R`Delivered 10 kW, iron loss 150 W and copper loss 250 W:
$\eta = 10\,000/10\,400 \approx 96\,\%$.`, "Half load gives a quarter of the copper loss, but the same iron loss.") }
]);

// ---------- ELKR 1: Elektriske motorer ----------
TOPICS("ELKR", 1, [
{ id: "synkront-turtall",
  nb: O("Synkront turtall", "I en asynkronmotor lager statorviklingene et magnetfelt som roterer. Hvor fort det roterer, avhenger av nettfrekvensen og antall poler. Flere poler gir lavere turtall.",
    [[R`n_s = \frac{120\,f}{p}`, "synkront turtall"]],
    [["n_s", "synkront turtall", "o/min"], ["f", "nettfrekvens", "Hz"], ["p", "antall poler", ""]],
    R`4-polet motor på 50 Hz:
$n_s = 120\cdot 50/4 = 1500$ o/min.`, "Antall poler er alltid et partall. Ett polpar er én nord- og én sørpol."),
  en: O("Synchronous speed", "In an induction motor the stator windings create a rotating magnetic field. How fast it rotates depends on the supply frequency and the number of poles. More poles give a lower speed.",
    [[R`n_s = \frac{120\,f}{p}`, "synchronous speed"]],
    [["n_s", "synchronous speed", "rpm"], ["f", "supply frequency", "Hz"], ["p", "number of poles", ""]],
    R`4-pole motor at 50 Hz:
$n_s = 120\cdot 50/4 = 1500$ rpm.`, "The number of poles is always even. One pole pair is one north and one south pole.") },
{ id: "sakking",
  nb: O("Sakking", "Rotoren i en asynkronmotor går litt saktere enn magnetfeltet. Forskjellen kalles sakking. Uten sakking ville det ikke blitt indusert strøm i rotoren, og motoren ville ikke gitt noe moment. Typisk sakking er 2–6 % ved full last.",
    [[R`s = \frac{n_s - n}{n_s}`, "sakking"], [R`n = n_s(1 - s)`, "rotorturtall"]],
    [["s", "sakking", ""], ["n", "rotorturtall", "o/min"], ["n_s", "synkront turtall", "o/min"]],
    R`$n_s = 1500$ og 4 % sakking:
$n = 1500\cdot 0{,}96 = 1440$ o/min.`, "Sakkingen øker med lasten. Tomgang gir nesten ingen sakking."),
  en: O("Slip", "The rotor of an induction motor runs slightly slower than the magnetic field. The difference is called slip. Without slip no current would be induced in the rotor, and the motor would produce no torque. Typical slip is 2–6 % at full load.",
    [[R`s = \frac{n_s - n}{n_s}`, "slip"], [R`n = n_s(1 - s)`, "rotor speed"]],
    [["s", "slip", ""], ["n", "rotor speed", "rpm"], ["n_s", "synchronous speed", "rpm"]],
    R`$n_s = 1500$ and 4 % slip:
$n = 1500\cdot 0.96 = 1440$ rpm.`, "Slip increases with load. At no load there is almost no slip.") },
{ id: "moment-effekt",
  nb: O("Moment og effekt", "Den mekaniske effekten fra en motor er dreiemomentet ganger vinkelhastigheten. Samme effekt kan komme som stort moment ved lavt turtall eller lite moment ved høyt turtall. Derfor brukes gir for å tilpasse motoren til lasten.",
    [[R`P = M\,\omega`, "mekanisk effekt"], [R`\omega = \frac{2\pi n}{60}`, "vinkelhastighet fra turtall"]],
    [["P", "effekt", "W"], ["M", "dreiemoment", "Nm"], [R`\omega`, "vinkelhastighet", "rad/s"], ["n", "turtall", "o/min"]],
    R`Motor på 1440 o/min som gir 50 Nm:
$\omega \approx 150{,}8$ rad/s og $P \approx 7{,}5$ kW.`, "Husk å regne om fra o/min til rad/s før du ganger med momentet."),
  en: O("Torque and power", "The mechanical power from a motor is torque times angular velocity. The same power can come as high torque at low speed or low torque at high speed. That is why gears are used to match the motor to the load.",
    [[R`P = M\,\omega`, "mechanical power"], [R`\omega = \frac{2\pi n}{60}`, "angular velocity from speed"]],
    [["P", "power", "W"], ["M", "torque", "Nm"], [R`\omega`, "angular velocity", "rad/s"], ["n", "speed", "rpm"]],
    R`A motor at 1440 rpm giving 50 Nm:
$\omega \approx 150.8$ rad/s and $P \approx 7.5$ kW.`, "Remember to convert from rpm to rad/s before multiplying by the torque.") }
]);

// ---------- ELKR 2: Kraftsystemet og energi ----------
TOPICS("ELKR", 2, [
{ id: "energi-kwh",
  nb: O("Energi og kilowattimer", "Effekt er hvor fort energi brukes, og energi er effekt ganger tid. Strømregningen måles i kilowattimer. En kilowattime er energien et apparat på 1 kW bruker på én time, og det tilsvarer 3,6 megajoule.",
    [[R`E = P\cdot t`, "energi"], [R`1\ \text{kWh} = 3{,}6\cdot 10^6\ \text{J}`, "omregning"]],
    [["E", "energi", "kWh"], ["P", "effekt", "kW"], ["t", "tid", "h"]],
    R`En panelovn på 1,2 kW i 5 timer:
$E = 1{,}2\cdot 5 = 6$ kWh.`, "Effekt i kW ganger tid i timer gir direkte kWh."),
  en: O("Energy and kilowatt-hours", "Power is how fast energy is used, and energy is power times time. The electricity bill is measured in kilowatt-hours. One kilowatt-hour is the energy a 1 kW appliance uses in one hour, which equals 3.6 megajoules.",
    [[R`E = P\cdot t`, "energy"], [R`1\ \text{kWh} = 3{,}6\cdot 10^6\ \text{J}`, "conversion"]],
    [["E", "energy", "kWh"], ["P", "power", "kW"], ["t", "time", "h"]],
    R`A 1.2 kW panel heater for 5 hours:
$E = 1{,}2\cdot 5 = 6$ kWh.`, "Power in kW times time in hours gives kWh directly.") },
{ id: "linjetap",
  nb: O("Tap i kraftledninger", "Strømmen i en ledning gir varmetap i motstanden. Tapet vokser med kvadratet av strømmen. Med høy spenning trengs mindre strøm for samme effekt, og derfor overføres kraft over lange avstander med svært høy spenning.",
    [[R`P_{tap} = R\,I^2`, "effekttap i ledningen"], [R`I = \frac{P}{U}`, "strøm for en gitt effekt"]],
    [["P_{tap}", "tap", "W"], ["R", "ledningens motstand", "Ω"], ["I", "strøm", "A"], ["U", "spenning", "V"]],
    R`1 MW over en linje med $R = 2$ Ω:
ved 22 kV er $I \approx 45$ A og tapet ca. 4,1 kW, ved 11 kV blir tapet fire ganger så stort.`, "Dobbel spenning gir halv strøm og bare en firedel av tapet."),
  en: O("Losses in power lines", "Current in a line gives heat loss in the resistance. The loss grows with the square of the current. With high voltage less current is needed for the same power, which is why power is transmitted over long distances at very high voltage.",
    [[R`P_{loss} = R\,I^2`, "power loss in the line"], [R`I = \frac{P}{U}`, "current for a given power"]],
    [["P_{loss}", "loss", "W"], ["R", "line resistance", "Ω"], ["I", "current", "A"], ["U", "voltage", "V"]],
    R`1 MW over a line with $R = 2$ Ω:
at 22 kV $I \approx 45$ A and the loss is about 4.1 kW, at 11 kV the loss is four times as large.`, "Double the voltage gives half the current and only a quarter of the loss.") },
{ id: "kraftbalanse",
  nb: O("Balanse og frekvens", "I et kraftsystem må produksjonen hele tiden være lik forbruket. Er det for lite produksjon, bremses generatorene og frekvensen synker under 50 Hz. Vannkraftverk kan skrues raskt opp og ned og er derfor gode til å holde balansen.",
    [[R`P_{prod} = P_{forbruk} + P_{tap}`, "balansen som alltid må holde"], [R`f_{nom} = 50\ \text{Hz}`, "nominell frekvens i Europa"]],
    [["P_{prod}", "produsert effekt", "MW"], ["P_{forbruk}", "forbruk", "MW"], ["f", "frekvens", "Hz"]],
    R`En stor generator faller ut. Frekvensen synker, og reserver kobles inn automatisk til den er tilbake på 50 Hz.`, "Frekvensen er systemets puls: synker den, er det for lite produksjon."),
  en: O("Balance and frequency", "In a power system production must always equal consumption. If there is too little production, the generators slow down and the frequency drops below 50 Hz. Hydropower plants can be ramped up and down quickly and are therefore good at keeping the balance.",
    [[R`P_{prod} = P_{load} + P_{loss}`, "the balance that must always hold"], [R`f_{nom} = 50\ \text{Hz}`, "nominal frequency in Europe"]],
    [["P_{prod}", "produced power", "MW"], ["P_{load}", "consumption", "MW"], ["f", "frequency", "Hz"]],
    R`A large generator trips. The frequency drops, and reserves are switched in automatically until it is back at 50 Hz.`, "The frequency is the pulse of the system: if it drops, there is too little production.") }
]);

// ---------- GEO 0: Jord og klassifisering ----------
TOPICS("GEO", 0, [
{ id: "fasediagram",
  fig: `<svg viewBox="0 0 240 140"><rect x="80" y="15" width="80" height="25" class="d"/><rect x="80" y="40" width="80" height="35" class="fill"/><rect x="80" y="75" width="80" height="50" class="dash"/><path d="M80 75H160V125H80Z" class="d"/><text x="40" y="32">Va</text><text x="40" y="62">Vw</text><text x="40" y="104">Vs</text><text x="172" y="62">mw</text><text x="172" y="104">ms</text></svg>`,
  nb: O("Fasediagram og vanninnhold", "Jord består av korn, vann og luft. I et fasediagram tegnes de tre delene over hverandre, slik at masser og volumer blir oversiktlige. Vanninnholdet er massen av vann delt på massen av de tørre kornene.",
    [[R`w = \frac{m_w}{m_s}`, "vanninnhold"], [R`\rho = \frac{m}{V}`, "densitet"]],
    [["w", "vanninnhold", "%"], ["m_w", "masse av vann", "g"], ["m_s", "masse av tørre korn", "g"], ["V_a,\\ V_w,\\ V_s", "volum luft, vann og korn", "m³"]],
    R`Prøve 190 g våt og 160 g tørr:
$w = 30/160 \approx 19\,\%$.`, "Vanninnhold regnes mot tørr masse, ikke våt. Derfor kan det bli over 100 %."),
  en: O("Phase diagram and water content", "Soil consists of grains, water and air. In a phase diagram the three parts are drawn on top of each other so masses and volumes are easy to keep track of. The water content is the mass of water divided by the mass of the dry grains.",
    [[R`w = \frac{m_w}{m_s}`, "water content"], [R`\rho = \frac{m}{V}`, "density"]],
    [["w", "water content", "%"], ["m_w", "mass of water", "g"], ["m_s", "mass of dry grains", "g"], ["V_a,\\ V_w,\\ V_s", "volume of air, water and grains", "m³"]],
    R`Sample 190 g wet and 160 g dry:
$w = 30/160 \approx 19\,\%$.`, "Water content is relative to dry mass, not wet. That is why it can exceed 100 %.") },
{ id: "poretall",
  nb: O("Poretall og porøsitet", "Hulrommene mellom kornene kalles porer. Poretallet er porevolumet delt på kornvolumet, mens porøsiteten er porevolumet delt på hele volumet. Poretallet kan være større enn 1 i bløt leire, porøsiteten kan aldri det.",
    [[R`e = \frac{V_p}{V_s}`, "poretall"], [R`n = \frac{V_p}{V} = \frac{e}{1 + e}`, "porøsitet"]],
    [["e", "poretall", ""], ["n", "porøsitet", ""], ["V_p", "porevolum", "m³"], ["V_s", "kornvolum", "m³"]],
    R`$e = 0{,}6$:
$n = 0{,}6/1{,}6 = 0{,}375$.`, "Høyt poretall betyr løs jord som kan presses mye sammen."),
  en: O("Void ratio and porosity", "The spaces between the grains are called pores. The void ratio is the pore volume divided by the grain volume, while the porosity is the pore volume divided by the total volume. The void ratio can exceed 1 in soft clay, the porosity never can.",
    [[R`e = \frac{V_p}{V_s}`, "void ratio"], [R`n = \frac{V_p}{V} = \frac{e}{1 + e}`, "porosity"]],
    [["e", "void ratio", ""], ["n", "porosity", ""], ["V_p", "pore volume", "m³"], ["V_s", "grain volume", "m³"]],
    R`$e = 0.6$:
$n = 0.6/1.6 = 0.375$.`, "A high void ratio means loose soil that can be compressed a lot.") },
{ id: "kvikkleire",
  nb: O("Kornstørrelser og kvikkleire", "Jordarter sorteres etter kornstørrelse: leire, silt, sand og grus. Leire har så små korn at den oppfører seg helt annerledes enn sand. Kvikkleire er leire som mister nesten all styrke når den blir forstyrret, og det kan gi store skred.",
    [[R`S_t = \frac{s_u}{s_r}`, "sensitivitet"], [R`d_{leire} < 0{,}002\ \text{mm}`, "grensen for leire"]],
    [["S_t", "sensitivitet", ""], ["s_u", "uforstyrret skjærstyrke", "kPa"], ["s_r", "omrørt skjærstyrke", "kPa"]],
    R`$s_u = 30$ kPa og $s_r = 0{,}5$ kPa:
$S_t = 60$, altså svært sensitiv leire.`, "Et lite skred i kvikkleire kan utløse et mye større skred bakover i terrenget."),
  en: O("Grain sizes and quick clay", "Soils are sorted by grain size: clay, silt, sand and gravel. Clay has such small grains that it behaves completely differently from sand. Quick clay is clay that loses almost all its strength when disturbed, and it can cause large landslides.",
    [[R`S_t = \frac{s_u}{s_r}`, "sensitivity"], [R`d_{clay} < 0{,}002\ \text{mm}`, "the clay limit"]],
    [["S_t", "sensitivity", ""], ["s_u", "undisturbed shear strength", "kPa"], ["s_r", "remoulded shear strength", "kPa"]],
    R`$s_u = 30$ kPa and $s_r = 0.5$ kPa:
$S_t = 60$, a very sensitive clay.`, "A small slide in quick clay can trigger a much larger slide further back.") }
]);

// ---------- GEO 1: Effektivspenning og setninger ----------
TOPICS("GEO", 1, [
{ id: "totalspenning",
  nb: O("Totalspenning og poretrykk", "Tyngden av jorda over et punkt gir totalspenningen. Under grunnvannstanden står vannet i porene under trykk, og dette poretrykket øker med dybden under vannspeilet. Begge regnes lag for lag.",
    [[R`\sigma_v = \sum \gamma_i\,h_i`, "vertikal totalspenning"], [R`u = \gamma_w\,h_w`, "poretrykk"]],
    [[R`\sigma_v`, "totalspenning", "kPa"], [R`\gamma_i`, "tyngdetetthet i lag i", "kN/m³"], ["u", "poretrykk", "kPa"], ["h_w", "dybde under grunnvannstanden", "m"]],
    R`Sand med $\gamma = 20$ kN/m³, 6 m dyp, grunnvann 2 m under terreng:
$\sigma_v = 120$ kPa og $u = 10\cdot 4 = 40$ kPa.`, "Poretrykket regnes fra grunnvannstanden, ikke fra terrengoverflaten."),
  en: O("Total stress and pore pressure", "The weight of the soil above a point gives the total stress. Below the groundwater table the water in the pores is under pressure, and this pore pressure increases with depth below the water table. Both are calculated layer by layer.",
    [[R`\sigma_v = \sum \gamma_i\,h_i`, "vertical total stress"], [R`u = \gamma_w\,h_w`, "pore pressure"]],
    [[R`\sigma_v`, "total stress", "kPa"], [R`\gamma_i`, "unit weight of layer i", "kN/m³"], ["u", "pore pressure", "kPa"], ["h_w", "depth below the groundwater table", "m"]],
    R`Sand with $\gamma = 20$ kN/m³, 6 m deep, groundwater 2 m below ground:
$\sigma_v = 120$ kPa and $u = 10\cdot 4 = 40$ kPa.`, "Pore pressure is measured from the groundwater table, not from the ground surface.") },
{ id: "effektivspenning",
  nb: O("Effektivspenning", "Det er bare den delen av spenningen som går gjennom kornkontaktene, som gir jorda styrke og presser den sammen. Den kalles effektivspenning og er totalspenningen minus poretrykket. Dette er Terzaghis prinsipp, grunnlaget for all geoteknikk.",
    [[R`\sigma' = \sigma - u`, "effektivspenning"], [R`\gamma' = \gamma - \gamma_w`, "neddykket tyngdetetthet"]],
    [[R`\sigma'`, "effektivspenning", "kPa"], [R`\sigma`, "totalspenning", "kPa"], ["u", "poretrykk", "kPa"]],
    R`Med $\sigma_v = 120$ kPa og $u = 40$ kPa:
$\sigma' = 80$ kPa.`, "Bruker du γ′, har du allerede trukket fra vannet. Da skal du ikke trekke fra u i tillegg."),
  en: O("Effective stress", "Only the part of the stress carried through the grain contacts gives the soil strength and compresses it. It is called effective stress and equals the total stress minus the pore pressure. This is Terzaghi's principle, the foundation of all geotechnics.",
    [[R`\sigma' = \sigma - u`, "effective stress"], [R`\gamma' = \gamma - \gamma_w`, "submerged unit weight"]],
    [[R`\sigma'`, "effective stress", "kPa"], [R`\sigma`, "total stress", "kPa"], ["u", "pore pressure", "kPa"]],
    R`With $\sigma_v = 120$ kPa and $u = 40$ kPa:
$\sigma' = 80$ kPa.`, "If you use γ′ you have already removed the water. Then do not subtract u as well.") },
{ id: "setning",
  nb: O("Setninger", "Når effektivspenningen øker, presses jorda sammen og bakken synker. Det kalles setning. I leire skjer det langsomt, fordi vannet bruker lang tid på å presses ut av porene. Ødometermodulen beskriver hvor stiv jorda er.",
    [[R`s = \frac{\Delta\sigma'\,H}{M}`, "setning av et lag"]],
    [["s", "setning", "m"], [R`\Delta\sigma'`, "økning i effektivspenning", "kPa"], ["H", "lagtykkelse", "m"], ["M", "ødometermodul", "kPa"]],
    R`4 m leire med $M = 2000$ kPa får 50 kPa ekstra:
$s = 50\cdot 4/2000 = 0{,}1$ m = 100 mm.`, "Senkes grunnvannet, øker effektivspenningen, og bygninger kan sette seg selv om ingen last er lagt på."),
  en: O("Settlement", "When the effective stress increases, the soil is compressed and the ground sinks. This is called settlement. In clay it happens slowly, because the water takes a long time to be squeezed out of the pores. The oedometer modulus describes how stiff the soil is.",
    [[R`s = \frac{\Delta\sigma'\,H}{M}`, "settlement of a layer"]],
    [["s", "settlement", "m"], [R`\Delta\sigma'`, "increase in effective stress", "kPa"], ["H", "layer thickness", "m"], ["M", "oedometer modulus", "kPa"]],
    R`4 m of clay with $M = 2000$ kPa gets 50 kPa extra:
$s = 50\cdot 4/2000 = 0.1$ m = 100 mm.`, "If the groundwater is lowered, the effective stress rises, and buildings can settle even without new load.") }
]);

// ---------- GEO 2: Jordtrykk, bæreevne og stabilitet ----------
TOPICS("GEO", 2, [
{ id: "jordtrykk",
  fig: `<svg viewBox="0 0 240 140"><rect x="95" y="20" width="14" height="100" class="d"/><path d="M109 20H220V120H109" class="fill"/><path d="M109 20L109 120L170 120Z" class="r"/><path d="M170 87H112" class="a"/><path d="M112 87l12-6v12z" class="af"/><text x="176" y="92">Pa</text><text x="70" y="74">H</text></svg>`,
  nb: O("Jordtrykk mot murer", "Jorda bak en støttemur skyver på muren. Gir muren litt etter, får vi aktivt jordtrykk, som er det minste. Presses muren inn mot jorda, får vi passivt jordtrykk, som er mye større. Trykket øker lineært med dybden.",
    [[R`K_a = \frac{1 - \sin\varphi}{1 + \sin\varphi}`, "aktiv jordtrykkskoeffisient"], [R`K_p = \frac{1}{K_a}`, "passiv koeffisient"], [R`P_a = \tfrac12 K_a\,\gamma\,H^2`, "aktiv kraft per meter mur"]],
    [[R`\varphi`, "friksjonsvinkel", "°"], [R`\gamma`, "tyngdetetthet", "kN/m³"], ["H", "murhøyde", "m"], ["P_a", "aktiv kraft", "kN/m"]],
    R`$\varphi = 30^\circ$, $\gamma = 18$ kN/m³ og $H = 4$ m:
$K_a = 1/3$ og $P_a = 0{,}5\cdot\tfrac13\cdot 18\cdot 16 = 48$ kN/m.`, "Dobbel murhøyde gir fire ganger så stor kraft, fordi H er kvadrert."),
  en: O("Earth pressure on walls", "The soil behind a retaining wall pushes on the wall. If the wall yields slightly, we get active earth pressure, the smallest. If the wall is pushed into the soil, we get passive earth pressure, which is much larger. The pressure increases linearly with depth.",
    [[R`K_a = \frac{1 - \sin\varphi}{1 + \sin\varphi}`, "active earth pressure coefficient"], [R`K_p = \frac{1}{K_a}`, "passive coefficient"], [R`P_a = \tfrac12 K_a\,\gamma\,H^2`, "active force per metre of wall"]],
    [[R`\varphi`, "friction angle", "°"], [R`\gamma`, "unit weight", "kN/m³"], ["H", "wall height", "m"], ["P_a", "active force", "kN/m"]],
    R`$\varphi = 30^\circ$, $\gamma = 18$ kN/m³ and $H = 4$ m:
$K_a = 1/3$ and $P_a = 0.5\cdot\tfrac13\cdot 18\cdot 16 = 48$ kN/m.`, "Double the wall height gives four times the force, because H is squared.") },
{ id: "baereevne",
  nb: O("Bæreevne", "Et fundament kan ikke belastes så mye at jorda under bryter sammen og fundamentet synker gjennom. For leire ved rask belastning regnes bæreevnen fra den udrenerte skjærstyrken. Med en sikkerhetsfaktor finner vi tillatt belastning.",
    [[R`q_u \approx 5{,}14\,s_u`, "bæreevne for stripefundament på leire"], [R`q_{till} = \frac{q_u}{F}`, "tillatt belastning"]],
    [["q_u", "bæreevne", "kPa"], ["s_u", "udrenert skjærstyrke", "kPa"], ["F", "sikkerhetsfaktor", ""]],
    R`$s_u = 25$ kPa:
$q_u = 128{,}5$ kPa, og med $F = 3$ blir $q_{till} \approx 43$ kPa.`, "Bruk udrenert styrke for leire ved rask belastning, og friksjonsvinkel for sand."),
  en: O("Bearing capacity", "A foundation cannot be loaded so much that the soil below fails and the foundation sinks through. For clay under fast loading the bearing capacity is calculated from the undrained shear strength. With a factor of safety we find the allowable load.",
    [[R`q_u \approx 5{,}14\,s_u`, "bearing capacity of a strip footing on clay"], [R`q_{allow} = \frac{q_u}{F}`, "allowable load"]],
    [["q_u", "bearing capacity", "kPa"], ["s_u", "undrained shear strength", "kPa"], ["F", "factor of safety", ""]],
    R`$s_u = 25$ kPa:
$q_u = 128.5$ kPa, and with $F = 3$ we get $q_{allow} \approx 43$ kPa.`, "Use undrained strength for clay under fast loading, and the friction angle for sand.") },
{ id: "skraning",
  nb: O("Skråningsstabilitet", "En skråning er stabil når jordas styrke er større enn kreftene som vil få den til å gli. Forholdet kalles sikkerhetsfaktor. For en lang, tørr sandskråning avhenger den bare av friksjonsvinkelen og helningen.",
    [[R`F = \frac{\text{mothold}}{\text{pådrag}}`, "sikkerhetsfaktor"], [R`F = \frac{\tan\varphi}{\tan\beta}`, "uendelig lang, tørr sandskråning"]],
    [["F", "sikkerhetsfaktor", ""], [R`\varphi`, "friksjonsvinkel", "°"], [R`\beta`, "skråningens helning", "°"]],
    R`$\varphi = 35^\circ$ og $\beta = 25^\circ$:
$F = 0{,}700/0{,}466 \approx 1{,}5$.`, "F under 1 betyr at skråningen vil gli. Vann i skråningen senker F kraftig."),
  en: O("Slope stability", "A slope is stable when the strength of the soil is greater than the forces trying to make it slide. The ratio is called the factor of safety. For a long, dry sand slope it depends only on the friction angle and the inclination.",
    [[R`F = \frac{\text{resistance}}{\text{driving force}}`, "factor of safety"], [R`F = \frac{\tan\varphi}{\tan\beta}`, "infinite dry sand slope"]],
    [["F", "factor of safety", ""], [R`\varphi`, "friction angle", "°"], [R`\beta`, "slope inclination", "°"]],
    R`$\varphi = 35^\circ$ and $\beta = 25^\circ$:
$F = 0.700/0.466 \approx 1.5$.`, "F below 1 means the slope will slide. Water in the slope lowers F sharply.") }
]);

// ---------- ML 0: Data og grunnbegreper ----------
TOPICS("ML", 0, [
{ id: "trening-test",
  nb: O("Trenings- og testdata", "En modell lærer av treningsdata og måles på testdata den aldri har sett. Da får du et ærlig bilde av hvor godt den virker på nye tilfeller. Er modellen mye bedre på treningsdata enn på testdata, har den overtilpasset.",
    [[R`N_{test} = f\cdot N`, "antall testrader ved andel f"], [R`\text{gap} = \text{nøyaktighet}_{trening} - \text{nøyaktighet}_{test}`, "stort gap tyder på overtilpasning"]],
    [["N", "antall rader", ""], ["f", "andel til test, ofte 0,2", ""]],
    R`5000 rader og 80/20-fordeling:
4000 til trening og 1000 til test.`, "Ikke se på testdataene mens du bygger modellen. Da er de ikke lenger en ærlig test."),
  en: O("Training and test data", "A model learns from training data and is measured on test data it has never seen. That gives an honest picture of how well it works on new cases. If the model is much better on training data than on test data, it has overfitted.",
    [[R`N_{test} = f\cdot N`, "number of test rows with share f"], [R`\text{gap} = \text{accuracy}_{train} - \text{accuracy}_{test}`, "a large gap suggests overfitting"]],
    [["N", "number of rows", ""], ["f", "share for testing, often 0.2", ""]],
    R`5000 rows with an 80/20 split:
4000 for training and 1000 for testing.`, "Do not look at the test data while building the model. Then it is no longer an honest test.") },
{ id: "normalisering",
  nb: O("Normalisering", "Egenskaper med svært forskjellig skala, som temperatur i grader og trykk i pascal, kan få modellen til å legge for stor vekt på de største tallene. Normalisering setter dem på samme skala, enten mellom 0 og 1 eller med gjennomsnitt 0 og standardavvik 1.",
    [[R`x' = \frac{x - x_{min}}{x_{max} - x_{min}}`, "min–maks-normalisering"], [R`z = \frac{x - \mu}{\sigma}`, "standardisering"]],
    [["x'", "normalisert verdi", ""], [R`\mu`, "gjennomsnitt", ""], [R`\sigma`, "standardavvik", ""]],
    R`Temperaturer 10, 15 og 30:
15 blir $(15 - 10)/20 = 0{,}25$.`, "Finn min, maks, gjennomsnitt og standardavvik fra treningsdataene alene."),
  en: O("Normalization", "Features on very different scales, like temperature in degrees and pressure in pascals, can make the model put too much weight on the largest numbers. Normalization puts them on the same scale, either between 0 and 1 or with mean 0 and standard deviation 1.",
    [[R`x' = \frac{x - x_{min}}{x_{max} - x_{min}}`, "min–max normalization"], [R`z = \frac{x - \mu}{\sigma}`, "standardization"]],
    [["x'", "normalized value", ""], [R`\mu`, "mean", ""], [R`\sigma`, "standard deviation", ""]],
    R`Temperatures 10, 15 and 30:
15 becomes $(15 - 10)/20 = 0.25$.`, "Find min, max, mean and standard deviation from the training data only.") },
{ id: "mse",
  nb: O("Middelkvadratfeil", "For å vite om en regresjonsmodell er god, må vi måle hvor mye den bommer. Middelkvadratfeilen er gjennomsnittet av de kvadrerte avvikene mellom fasit og modell. Kvadreringen gjør at store feil straffes ekstra hardt.",
    [[R`\text{MSE} = \frac{1}{n}\sum (y_i - \hat y_i)^2`, "middelkvadratfeil"], [R`\text{RMSE} = \sqrt{\text{MSE}}`, "samme enhet som y"]],
    [["y_i", "fasit", ""], [R`\hat y_i`, "modellens svar", ""], ["n", "antall punkter", ""]],
    R`Fasit 3, 5, 7 og modell 4, 5, 5:
$\text{MSE} = (1 + 0 + 4)/3 \approx 1{,}67$.`, "RMSE er lettere å tolke, fordi den har samme enhet som det du spår."),
  en: O("Mean squared error", "To know whether a regression model is good, we must measure how much it misses. The mean squared error is the average of the squared deviations between the true values and the model. Squaring makes large errors count extra heavily.",
    [[R`\text{MSE} = \frac{1}{n}\sum (y_i - \hat y_i)^2`, "mean squared error"], [R`\text{RMSE} = \sqrt{\text{MSE}}`, "same unit as y"]],
    [["y_i", "true value", ""], [R`\hat y_i`, "model prediction", ""], ["n", "number of points", ""]],
    R`True values 3, 5, 7 and model 4, 5, 5:
$\text{MSE} = (1 + 0 + 4)/3 \approx 1.67$.`, "RMSE is easier to interpret, because it has the same unit as what you predict.") }
]);

// ---------- ML 1: Lineær regresjon og gradientnedstigning ----------
TOPICS("ML", 1, [
{ id: "lineaer-modell",
  nb: O("Lineær modell", "Den enkleste modellen som lærer av data, er en rett linje. Vekten sier hvor mye svaret endrer seg når egenskapen øker med én, og konstantleddet flytter linja opp eller ned. Læring betyr å finne de verdiene som gir minst feil.",
    [[R`\hat y = w\,x + b`, "lineær modell"], [R`\hat y = w_1 x_1 + w_2 x_2 + \dots + b`, "med flere egenskaper"]],
    [["w", "vekt (stigningstall)", ""], ["b", "konstantledd", ""], [R`\hat y`, "modellens svar", ""]],
    R`$\hat y = 2x + 1$ spår 9 for $x = 4$.`, "Nevrale nett er i bunn og grunn mange slike lineære ledd satt sammen med ikke-lineære funksjoner."),
  en: O("Linear model", "The simplest model that learns from data is a straight line. The weight says how much the answer changes when the feature increases by one, and the intercept moves the line up or down. Learning means finding the values that give the smallest error.",
    [[R`\hat y = w\,x + b`, "linear model"], [R`\hat y = w_1 x_1 + w_2 x_2 + \dots + b`, "with several features"]],
    [["w", "weight (slope)", ""], ["b", "intercept", ""], [R`\hat y`, "model prediction", ""]],
    R`$\hat y = 2x + 1$ predicts 9 for $x = 4$.`, "Neural networks are basically many such linear terms combined with non-linear functions.") },
{ id: "gradientnedstigning",
  fig: `<svg viewBox="0 0 240 140"><path d="M30 120H220M30 120V15" class="dim"/><path d="M40 25C80 110 160 110 200 25" class="a"/><circle cx="60" cy="58" r="5" class="rf"/><circle cx="85" cy="85" r="5" class="rf"/><circle cx="105" cy="96" r="5" class="rf"/><circle cx="120" cy="99" r="5" class="gf"/><path d="M60 58L85 85L105 96" class="dash"/><text x="212" y="134">w</text><text x="12" y="22">L</text></svg>`,
  nb: O("Gradientnedstigning", "Gradientnedstigning finner vektene som gir minst tap ved å gå små steg nedover. Gradienten peker oppover mot økende tap, så vi går motsatt vei. Læringsraten bestemmer hvor lange stegene er.",
    [[R`w \leftarrow w - \eta\,\frac{\partial L}{\partial w}`, "ett steg"], [R`\frac{\partial L}{\partial w} = -\frac{2}{n}\sum x_i\,(y_i - \hat y_i)`, "gradienten for MSE"]],
    [[R`\eta`, "læringsrate", ""], ["L", "tapsfunksjon", ""], [R`\frac{\partial L}{\partial w}`, "gradient", ""]],
    R`$w = 3$, gradient 4 og $\eta = 0{,}1$:
$w \leftarrow 3 - 0{,}4 = 2{,}6$.`, "Glem ikke minustegnet. Vi skal nedover, mot lavere tap."),
  en: O("Gradient descent", "Gradient descent finds the weights that give the smallest loss by taking small steps downhill. The gradient points uphill towards increasing loss, so we go the opposite way. The learning rate decides how long the steps are.",
    [[R`w \leftarrow w - \eta\,\frac{\partial L}{\partial w}`, "one step"], [R`\frac{\partial L}{\partial w} = -\frac{2}{n}\sum x_i\,(y_i - \hat y_i)`, "gradient for MSE"]],
    [[R`\eta`, "learning rate", ""], ["L", "loss function", ""], [R`\frac{\partial L}{\partial w}`, "gradient", ""]],
    R`$w = 3$, gradient 4 and $\eta = 0.1$:
$w \leftarrow 3 - 0.4 = 2.6$.`, "Do not forget the minus sign. We want to go downhill, towards lower loss.") },
{ id: "laeringsrate",
  nb: O("Læringsrate", "Læringsraten er det viktigste valget i gradientnedstigning. Er den for stor, hopper vektene over minimumet og tapet kan eksplodere. Er den for liten, går læringen svært sakte. Ofte prøver man flere verdier og ser på tapskurven.",
    [[R`\eta \in [10^{-4},\ 10^{-1}]`, "vanlig område å prøve"], [R`L_{t+1} > L_t`, "tegn på for stor læringsrate"]],
    [[R`\eta`, "læringsrate", ""], ["L_t", "tap etter steg t", ""]],
    R`Tapet går 5, 12, 40, 150 … : læringsraten er for stor.
Tapet går 5, 4,99, 4,98 … : den er antakelig for liten.`, "Plott tapet for hvert steg. Kurven forteller deg nesten alltid hva som er galt."),
  en: O("Learning rate", "The learning rate is the most important choice in gradient descent. If it is too large, the weights jump past the minimum and the loss can blow up. If it is too small, learning is very slow. Often several values are tried while watching the loss curve.",
    [[R`\eta \in [10^{-4},\ 10^{-1}]`, "common range to try"], [R`L_{t+1} > L_t`, "a sign of too large a learning rate"]],
    [[R`\eta`, "learning rate", ""], ["L_t", "loss after step t", ""]],
    R`The loss goes 5, 12, 40, 150 … : the learning rate is too large.
The loss goes 5, 4.99, 4.98 … : it is probably too small.`, "Plot the loss for every step. The curve almost always tells you what is wrong.") }
]);

// ---------- ML 2: Klassifisering og evaluering ----------
TOPICS("ML", 2, [
{ id: "forvekslingsmatrise",
  nb: O("Forvekslingsmatrisen", "En klassifiseringsmodell kan ta feil på to måter: den kan slå falsk alarm, eller overse noe som er der. Forvekslingsmatrisen teller opp de fire utfallene, og alle vanlige mål regnes ut fra disse fire tallene.",
    [[R`\text{treff} = \frac{TP + TN}{TP + TN + FP + FN}`, "treffsikkerhet"]],
    [["TP", "sant positiv: fant det som var der", ""], ["FP", "falsk positiv: falsk alarm", ""], ["FN", "falsk negativ: oversett", ""], ["TN", "sant negativ", ""]],
    R`TP = 40, FP = 10, FN = 20, TN = 930:
treffsikkerhet $= 970/1000 = 97\,\%$, selv om modellen overser en tredel av de positive.`, "Når klassene er skjeve, sier treffsikkerhet lite. Se på presisjon og gjenkalling i stedet."),
  en: O("The confusion matrix", "A classification model can be wrong in two ways: it can raise a false alarm, or miss something that is there. The confusion matrix counts the four outcomes, and all the usual measures are calculated from these four numbers.",
    [[R`\text{accuracy} = \frac{TP + TN}{TP + TN + FP + FN}`, "accuracy"]],
    [["TP", "true positive: found what was there", ""], ["FP", "false positive: false alarm", ""], ["FN", "false negative: missed", ""], ["TN", "true negative", ""]],
    R`TP = 40, FP = 10, FN = 20, TN = 930:
accuracy $= 970/1000 = 97\,\%$, even though the model misses a third of the positives.`, "When the classes are imbalanced, accuracy says little. Look at precision and recall instead.") },
{ id: "presisjon-gjenkalling",
  nb: O("Presisjon og gjenkalling", "Presisjon svarer på hvor ofte modellen har rett når den sier ja. Gjenkalling svarer på hvor mange av de ekte tilfellene den fant. F1 er et kompromiss mellom dem. Hva som er viktigst, avhenger av hva som koster mest: falske alarmer eller oversette tilfeller.",
    [[R`P = \frac{TP}{TP + FP}`, "presisjon"], [R`R = \frac{TP}{TP + FN}`, "gjenkalling"], [R`F_1 = \frac{2PR}{P + R}`, "F1-mål"]],
    [["P", "presisjon", ""], ["R", "gjenkalling", ""], ["F_1", "harmonisk middel av P og R", ""]],
    R`TP = 40, FP = 10, FN = 20:
$P = 0{,}8$, $R \approx 0{,}67$ og $F_1 \approx 0{,}73$.`, "Ved kreftscreening er gjenkalling viktigst, ved spamfilter er presisjon viktigst."),
  en: O("Precision and recall", "Precision answers how often the model is right when it says yes. Recall answers how many of the real cases it found. F1 is a compromise between them. Which matters most depends on what costs more: false alarms or missed cases.",
    [[R`P = \frac{TP}{TP + FP}`, "precision"], [R`R = \frac{TP}{TP + FN}`, "recall"], [R`F_1 = \frac{2PR}{P + R}`, "F1 score"]],
    [["P", "precision", ""], ["R", "recall", ""], ["F_1", "harmonic mean of P and R", ""]],
    R`TP = 40, FP = 10, FN = 20:
$P = 0.8$, $R \approx 0.67$ and $F_1 \approx 0.73$.`, "In cancer screening recall matters most, in a spam filter precision matters most.") },
{ id: "sigmoid-terskel",
  fig: `<svg viewBox="0 0 240 140"><path d="M20 120H220M120 125V10" class="dim"/><path d="M20 118C80 118 95 115 120 70S160 22 220 22" class="a"/><path d="M20 70H220" class="dash"/><circle cx="120" cy="70" r="4" class="rf"/><text x="200" y="136">z</text><text x="100" y="18">σ</text></svg>`,
  nb: O("Sigmoid og terskel", "Logistisk regresjon gjør et vilkårlig tall om til en sannsynlighet mellom 0 og 1 med sigmoidfunksjonen. Over en valgt terskel sier modellen ja. Senker du terskelen, finner modellen flere ekte tilfeller, men gir også flere falske alarmer.",
    [[R`\sigma(z) = \frac{1}{1 + e^{-z}}`, "sigmoidfunksjonen"], [R`\hat y = 1 \iff \sigma(z) \ge t`, "beslutning med terskel t"]],
    [[R`\sigma(z)`, "sannsynlighet", ""], ["z", "lineær kombinasjon av egenskapene", ""], ["t", "terskel, ofte 0,5", ""]],
    R`$\sigma(0) = 0{,}5$ og $\sigma(2) \approx 0{,}88$.
Med terskel 0,5 blir $z = 2$ klassifisert som ja.`, "Terskelen er et valg, ikke en naturlov. Velg den ut fra hva feilene koster."),
  en: O("Sigmoid and threshold", "Logistic regression turns any number into a probability between 0 and 1 with the sigmoid function. Above a chosen threshold the model says yes. Lowering the threshold finds more real cases, but also gives more false alarms.",
    [[R`\sigma(z) = \frac{1}{1 + e^{-z}}`, "the sigmoid function"], [R`\hat y = 1 \iff \sigma(z) \ge t`, "decision with threshold t"]],
    [[R`\sigma(z)`, "probability", ""], ["z", "linear combination of the features", ""], ["t", "threshold, often 0.5", ""]],
    R`$\sigma(0) = 0.5$ and $\sigma(2) \approx 0.88$.
With threshold 0.5, $z = 2$ is classified as yes.`, "The threshold is a choice, not a law of nature. Choose it from what the errors cost.") }
]);
})();
