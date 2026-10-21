// Teoribok – emnesider for Matematikk 1P og 2P (VG1P, VG2P), LK20, med regnesjekk (chk) der eksemplet har tall (AX-18).
// Tallene følger eksemplene i add_vgs_m.js. Test: node tools/test_topics.js top_vgp.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VG1P 0: Prosent og vekstfaktor ----------
TOPICS("VG1P", 0, [
{ id: "prosentdel", chk: ["25/100 ≈ 0.25", "600*0.15 ≈ 90", "800*0.7 ≈ 560"],
  nb: O("Prosent og rabatt",
    R`Prosent betyr per hundre. En prosentdel av et beløp er beløpet ganget med prosenten delt på 100. Rabatt er en nedgang, så vekstfaktoren er 1 minus rabatten som desimaltall. Ny pris er gammel pris ganget med vekstfaktoren. Du kan kontrollere ved å regne ut hvor mange kroner rabatten er, og trekke dem fra. Prosentpoeng er noe annet enn prosent, og tas opp for seg.`,
    [[R`p\,\% = \frac{p}{100}`, "prosent som desimaltall"], [R`\text{ny} = \text{gammel} \cdot \left(1 - \frac{p}{100}\right)`, "pris etter rabatt"]],
    [["p", "prosenten", "%"]],
    R`$25\,\% = \dfrac{25}{100} = 0{,}25$.
15 % av 600 er $600 \cdot 0{,}15 = 90$.
Jakke til 800 kr med 30 % rabatt: $800 \cdot 0{,}70 = 560$ kr.`,
    R`Ny verdi er gammel verdi ganget med vekstfaktoren.`),
  en: O("Percent and discount",
    R`Percent means per hundred. A percentage of an amount is the amount times the percentage divided by 100. A discount is a decrease, so the growth factor is 1 minus the discount as a decimal. The new price is the old price times the growth factor. You can check by calculating how many kroner the discount is, and subtracting them. Percentage points are different from percent, and are treated separately.`,
    [[R`p\,\% = \frac{p}{100}`, "percent as a decimal"], [R`\text{new} = \text{old} \cdot \left(1 - \frac{p}{100}\right)`, "price after a discount"]],
    [["p", "the percentage", "%"]],
    R`$25\,\% = \dfrac{25}{100} = 0.25$.
15% of 600 is $600 \cdot 0.15 = 90$.
A jacket of 800 NOK with a 30% discount: $800 \cdot 0.70 = 560$ NOK.`,
    R`The new value is the old value times the growth factor.`) },
{ id: "flere-endringer", chk: ["1.1*0.9 ≈ 0.99", "(1-0.99)*100 ≈ 1", "1.2*0.8 ≈ 0.96", "(1-0.96)*100 ≈ 4"],
  nb: O("Flere endringer etter hverandre",
    R`Når prisen endres flere ganger, ganger du vekstfaktorene. Du legger ikke prosentene sammen, og du trekker dem ikke fra hverandre. Ti prosent opp og deretter ti prosent ned gir ikke den opprinnelige prisen, fordi den andre endringen regnes av det nye beløpet. Vekstfaktoren under 1 betyr at sluttverdien er lavere enn start. Hvor mange prosent lavere, finner du ved å trekke vekstfaktoren fra 1.`,
    [[R`b = b_1 \cdot b_2`, "vekstfaktor for begge endringene"], [R`p = (b - 1) \cdot 100`, "samlet prosent"]],
    [["b", "samlet vekstfaktor", ""], ["p", "samlet prosent", "%"]],
    R`+10 % og deretter −10 %: $1{,}1 \cdot 0{,}9 = 0{,}99$, som er $(1 - 0{,}99) \cdot 100 = 1$ % lavere enn start.
+20 % og deretter −20 %: $1{,}2 \cdot 0{,}8 = 0{,}96$, som er 4 % lavere.`,
    R`Gang faktorene. Ikke legg sammen prosentene.`),
  en: O("Several changes in a row",
    R`When the price changes several times, you multiply the growth factors. You do not add the percentages, and you do not subtract them from each other. Ten percent up and then ten percent down does not give the original price, because the second change is calculated from the new amount. A growth factor below 1 means the final value is lower than the start. How many percent lower is found by subtracting the growth factor from 1.`,
    [[R`b = b_1 \cdot b_2`, "growth factor for both changes"], [R`p = (b - 1) \cdot 100`, "overall percent"]],
    [["b", "overall growth factor", ""], ["p", "overall percent", "%"]],
    R`+10% and then −10%: $1.1 \cdot 0.9 = 0.99$, which is $(1 - 0.99) \cdot 100 = 1$% below the start.
+20% and then −20%: $1.2 \cdot 0.8 = 0.96$, which is 4% below.`,
    R`Multiply the factors. Do not add the percentages.`) },
{ id: "prosentpoeng", chk: ["450/1.1 ≈ 409.09", "25-20 ≈ 5", "(25-20)/20*100 ≈ 25"],
  nb: O("Baklengs og prosentpoeng",
    R`Kjenner du den nye verdien og vekstfaktoren, finner du den gamle ved å dele. En pris etter økning deles på en faktor større enn 1. Prosentpoeng er differansen mellom to prosenter, uten divisjon. Fra 20 % til 25 % er 5 prosentpoeng. Den relative økningen er derimot differansen delt på den første prosenten. De to svarene er ulike, og begge kan være riktige for hvert sitt spørsmål.`,
    [[R`\text{gammel} = \frac{\text{ny}}{b}`, "baklengs"], [R`\text{prosentpoeng} = p_2 - p_1`, "differanse av prosenter"]],
    [["b", "vekstfaktor", ""], ["p_1,\\ p_2", "de to prosentene", "%"]],
    R`450 kr etter 10 % økning: $\dfrac{450}{1{,}10} \approx 409{,}09$ kr.
Fra 20 % til 25 % er $25 - 20 = 5$ prosentpoeng, men $\dfrac{25 - 20}{20} \cdot 100 = 25$ % økning.`,
    R`Prosentpoeng er en differanse. Prosent er et forhold.`),
  en: O("Backwards and percentage points",
    R`If you know the new value and the growth factor, you find the old one by dividing. A price after an increase is divided by a factor greater than 1. Percentage points are the difference between two percentages, with no division. From 20% to 25% is 5 percentage points. The relative increase is instead the difference divided by the first percentage. The two answers are different, and both can be right for their own question.`,
    [[R`\text{old} = \frac{\text{new}}{b}`, "backwards"], [R`\text{percentage points} = p_2 - p_1`, "difference of percentages"]],
    [["b", "growth factor", ""], ["p_1,\\ p_2", "the two percentages", "%"]],
    R`450 NOK after a 10% increase: $\dfrac{450}{1.10} \approx 409.09$ NOK.
From 20% to 25% is $25 - 20 = 5$ percentage points, but $\dfrac{25 - 20}{20} \cdot 100 = 25$% increase.`,
    R`Percentage points are a difference. Percent is a ratio.`) }
]);

// ---------- VG1P 1: Personlig økonomi ----------
TOPICS("VG1P", 1, [
{ id: "rentesrente", chk: ["10000*1.03^5 ≈ 11592.74", "5000*1.02^3 ≈ 5306.04"],
  nb: O("Rentes rente",
    R`Setter du inn et beløp med fast årlig rente, ganges beløpet med samme vekstfaktor hvert år. Renten ett år legges til saldoen og får selv rente året etter. Det er rentes rente. Vekstfaktoren er 1 pluss renten som desimaltall, og eksponenten er antall år. Formelen gjelder når du ikke setter inn eller tar ut noe underveis. Gebyrer er ikke med, så dette er ikke effektiv rente.`,
    [[R`K_n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n`, "saldo etter n år"]],
    [["K_0", "innskuddet", "kr"], ["p", "årlig rente", "%"], ["n", "antall år", ""]],
    R`10 000 kr med 3 % rente i 5 år: $10\,000 \cdot 1{,}03^5 \approx 11\,592{,}74$ kr.
5 000 kr med 2 % rente i 3 år: $5\,000 \cdot 1{,}02^3 = 5\,306{,}04$ kr.`,
    R`Eksponenten er antall år. Faktoren er 1 pluss renten, ikke renten alene.`),
  en: O("Compound interest",
    R`If you deposit an amount at a fixed annual rate, the amount is multiplied by the same growth factor every year. The interest one year is added to the balance and itself earns interest the next year. That is compound interest. The growth factor is 1 plus the rate as a decimal, and the exponent is the number of years. The formula applies when you deposit or withdraw nothing along the way. Fees are not included, so this is not the effective rate.`,
    [[R`K_n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n`, "balance after n years"]],
    [["K_0", "the deposit", "NOK"], ["p", "annual interest", "%"], ["n", "number of years", ""]],
    R`10,000 NOK at 3% interest for 5 years: $10\,000 \cdot 1.03^5 \approx 11\,592.74$ NOK.
5,000 NOK at 2% interest for 3 years: $5\,000 \cdot 1.02^3 = 5\,306.04$ NOK.`,
    R`The exponent is the number of years. The factor is 1 plus the rate, not the rate alone.`) },
{ id: "lonn-budsjett", chk: ["30000*0.7 ≈ 21000", "18000-16500 ≈ 1500"],
  nb: O("Lønn og budsjett",
    R`Bruttolønn er lønn før skatt, og nettolønn er det som blir igjen etter skattetrekk. I en forenklet modell er nettolønn brutto ganget med 1 minus skatteprosenten. Et budsjett setter opp planlagte inntekter og utgifter. Overskuddet er inntekter minus utgifter. Er differansen negativ, bruker du mer enn du får inn. Budsjettet sier ikke hva som faktisk skjedde, bare hva du planla.`,
    [[R`\text{netto} = \text{brutto} \cdot (1 - s)`, "forenklet skatt"], [R`\text{overskudd} = \text{inn} - \text{ut}`, "budsjett"]],
    [["s", "skatteprosent som desimaltall", ""]],
    R`Brutto 30 000 kr og 30 % trekk: $30\,000 \cdot 0{,}70 = 21\,000$ kr.
Inntekter 18 000 kr og utgifter 16 500 kr: overskudd $18\,000 - 16\,500 = 1500$ kr.`,
    R`Sammenlign lån med effektiv rente. Den tar med gebyrer, ikke bare den nominelle renten.`),
  en: O("Pay and a budget",
    R`Gross pay is pay before tax, and net pay is what remains after the tax deduction. In a simplified model, net pay is gross times 1 minus the tax rate. A budget lists planned income and expenses. The surplus is income minus expenses. If the difference is negative, you spend more than you receive. The budget does not say what actually happened, only what you planned.`,
    [[R`\text{net} = \text{gross} \cdot (1 - s)`, "simplified tax"], [R`\text{surplus} = \text{in} - \text{out}`, "budget"]],
    [["s", "tax rate as a decimal", ""]],
    R`Gross 30,000 NOK and a 30% deduction: $30\,000 \cdot 0.70 = 21\,000$ NOK.
Income 18,000 NOK and expenses 16,500 NOK: surplus $18\,000 - 16\,500 = 1500$ NOK.`,
    R`Compare loans by the effective rate. It includes fees, not only the nominal rate.`) },
{ id: "lanerente", chk: ["20000*0.09 ≈ 1800", "20000+1800 ≈ 21800"],
  nb: O("Rente på et lån",
    R`Rente er det du betaler for å låne penger. I ett år uten avdrag er renten lånet ganget med renten som desimaltall, og gjelden blir lånet pluss denne renten. Regnestykket tar ikke med gebyrer. Effektiv rente gjør det, og er den du bør bruke når du sammenligner to lånetilbud. Kredittkort og forbrukslån har ofte høy rente, så et lite beløp kan bli dyrt hvis det blir stående.`,
    [[R`\text{rente} = L \cdot r`, "rente i ett år uten avdrag"], [R`G = L + L \cdot r`, "gjeld etter ett år"]],
    [["L", "lånet", "kr"], ["r", "årlig rente som desimaltall", ""]],
    R`Lån på 20 000 kr med 9 % rente, uten avdrag og uten gebyr.
Renten ett år er $20\,000 \cdot 0{,}09 = 1800$ kr, så gjelden er $20\,000 + 1800 = 21\,800$ kr.`,
    R`Dette er nominell rente i ett år. Effektiv rente tar i tillegg med gebyrer.`),
  en: O("Interest on a loan",
    R`Interest is what you pay to borrow money. For one year with no repayment, the interest is the loan times the rate as a decimal, and the debt becomes the loan plus this interest. The calculation does not include fees. The effective rate does, and is the one you should use when you compare two loan offers. Credit cards and consumer loans often have a high rate, so a small amount can become expensive if it is left outstanding.`,
    [[R`\text{interest} = L \cdot r`, "interest for one year with no repayment"], [R`D = L + L \cdot r`, "debt after one year"]],
    [["L", "the loan", "NOK"], ["r", "annual rate as a decimal", ""]],
    R`A loan of 20,000 NOK at 9% interest, with no repayment and no fee.
The interest for one year is $20\,000 \cdot 0.09 = 1800$ NOK, so the debt is $20\,000 + 1800 = 21\,800$ NOK.`,
    R`This is the nominal rate for one year. The effective rate also includes fees.`) }
]);

// ---------- VG1P 2: Geometri og målestokk ----------
TOPICS("VG1P", 2, [
{ id: "areal-pytagoras", chk: ["4*3.5 ≈ 14", "sqrt(6^2+8^2) ≈ 10"],
  nb: O("Areal og Pytagoras",
    R`Arealet av et rektangel er lengde ganger bredde. Bruk samme enhet på begge sidene før du ganger. I en rettvinklet trekant er kvadratet av hypotenusen lik summen av kvadratene av katetene. Hypotenusen er den lengste siden og ligger mot den rette vinkelen. Ta kvadratrot til slutt, og sjekk at svaret er lengre enn hver katet. Areal og lengde er ulike størrelser og har ulike enheter.`,
    [[R`A = l \cdot b`, "rektangel"], [R`c = \sqrt{a^2 + b^2}`, "Pytagoras"]],
    [["l,\\ b", "sidene i rektangelet", "m"], ["c", "hypotenusen", "m"]],
    R`Et rom på 4 m ganger 3,5 m har areal $4 \cdot 3{,}5 = 14$ m².
Kateter 6 og 8: hypotenusen er $\sqrt{6^2 + 8^2} = 10$.`,
    R`Gjør om til samme enhet før du regner.`),
  en: O("Area and Pythagoras",
    R`The area of a rectangle is length times width. Use the same unit on both sides before you multiply. In a right triangle the square of the hypotenuse equals the sum of the squares of the legs. The hypotenuse is the longest side and lies opposite the right angle. Take the square root at the end, and check that the answer is longer than each leg. Area and length are different quantities and have different units.`,
    [[R`A = l \cdot w`, "rectangle"], [R`c = \sqrt{a^2 + b^2}`, "Pythagoras"]],
    [["l,\\ w", "the sides of the rectangle", "m"], ["c", "the hypotenuse", "m"]],
    R`A room of 4 m by 3.5 m has area $4 \cdot 3.5 = 14$ m².
Legs 6 and 8: the hypotenuse is $\sqrt{6^2 + 8^2} = 10$.`,
    R`Convert to the same unit before you calculate.`) },
{ id: "malestokk", chk: ["7*200000 ≈ 1400000", "1400000/100000 ≈ 14", "4*50000/100000 ≈ 2"],
  nb: O("Målestokk",
    R`Målestokk 1 til et tall betyr at 1 cm på kartet er så mange centimeter i virkeligheten. Du ganger avstanden på kartet med tallet etter kolon. For å få kilometer deler du centimeter på 100 000, fordi 1 km er 100 000 cm. Målestokken gjelder lengder. Areal på kartet må ganges med kvadratet av målestokktallet. Les alltid om svaret er i centimeter, meter eller kilometer.`,
    [[R`\text{virkelig} = \text{på kartet} \cdot m`, "lengde"], [R`1\,\text{km} = 100\,000\,\text{cm}`, "enhet"]],
    [["m", "målestokktallet", ""]],
    R`7 cm på kart i 1 : 200 000 er $7 \cdot 200\,000 = 1\,400\,000$ cm = 14 km.
4 cm i 1 : 50 000 er $4 \cdot 50\,000 / 100\,000 = 2$ km.`,
    R`Lengde ganges med målestokktallet. Areal ganges med kvadratet.`),
  en: O("Scale",
    R`A scale of 1 to a number means that 1 cm on the map is that many centimetres in reality. You multiply the distance on the map by the number after the colon. To get kilometres you divide centimetres by 100,000, because 1 km is 100,000 cm. The scale applies to lengths. An area on the map must be multiplied by the square of the scale number. Always read whether the answer is in centimetres, metres or kilometres.`,
    [[R`\text{real} = \text{on the map} \cdot m`, "length"], [R`1\,\text{km} = 100\,000\,\text{cm}`, "the unit"]],
    [["m", "the scale number", ""]],
    R`7 cm on a map at 1 : 200,000 is $7 \cdot 200\,000 = 1\,400\,000$ cm = 14 km.
4 cm at 1 : 50,000 is $4 \cdot 50\,000 / 100\,000 = 2$ km.`,
    R`A length is multiplied by the scale number. An area is multiplied by its square.`) },
{ id: "volum-enheter", chk: ["1*1000 ≈ 1000", "pi*1^2*2 ≈ 6.283", "pi*1^2*2*1000 ≈ 6283"],
  nb: O("Volum og enheter",
    R`Volumet av et prisme eller en sylinder er grunnflaten ganget med høyden. For en sylinder er grunnflaten pi ganger radius i andre. 1 kubikkmeter er 1000 liter, fordi 1 kubikkmeter er 1000 kubikkdesimeter og 1 kubikkdesimeter er 1 liter. 1 kvadratmeter er 10 000 kvadratcentimeter, så areal og volum har ulike omregninger. Regn ferdig i meter, og gjør om til liter til slutt.`,
    [[R`V = \pi r^2 h`, "sylinder"], [R`1\,\text{m}^3 = 1000\,\text{L}`, "omregning"]],
    [["r", "radius", "m"], ["h", "høyde", "m"], ["V", "volum", "m³"]],
    R`1 m³ er $1 \cdot 1000 = 1000$ liter.
Sylinder med radius 1 m og høyde 2 m: $\pi \cdot 1^2 \cdot 2 \approx 6{,}283$ m³ $\approx 6283$ liter.`,
    R`Gjør om til liter etter at volumet er regnet ut i kubikkmeter.`),
  en: O("Volume and units",
    R`The volume of a prism or a cylinder is the base area times the height. For a cylinder the base is pi times the radius squared. 1 cubic metre is 1000 litres, because 1 cubic metre is 1000 cubic decimetres and 1 cubic decimetre is 1 litre. 1 square metre is 10,000 square centimetres, so area and volume have different conversions. Finish the calculation in metres, and convert to litres at the end.`,
    [[R`V = \pi r^2 h`, "cylinder"], [R`1\,\text{m}^3 = 1000\,\text{L}`, "the conversion"]],
    [["r", "radius", "m"], ["h", "height", "m"], ["V", "volume", "m³"]],
    R`1 m³ is $1 \cdot 1000 = 1000$ litres.
A cylinder with radius 1 m and height 2 m: $\pi \cdot 1^2 \cdot 2 \approx 6.283$ m³ $\approx 6283$ litres.`,
    R`Convert to litres after the volume has been calculated in cubic metres.`) }
]);

// ---------- VG1P 3: Lineære modeller og grafer ----------
TOPICS("VG1P", 3, [
{ id: "strommodell", chk: ["(649-49)/500 ≈ 1.2", "1.2*500+49 ≈ 649"],
  nb: O("Lineær modell",
    R`En lineær modell har et fast tillegg per enhet og en startverdi. Startverdien er kostnaden når x er null, og stigningstallet er hvor mye y øker når x øker med 1. Mellom to punkter er stigningstallet differansen i y delt på differansen i x. Strøm, taxi og timepris er typiske eksempler. Fast prosent per periode er ikke lineær, men eksponentiell.`,
    [[R`y = ax + b`, "lineær modell"], [R`a = \frac{y_2 - y_1}{x_2 - x_1}`, "stigningstall"]],
    [["a", "stigningstall", "kr"], ["b", "startverdi", "kr"], ["x", "antall enheter", ""]],
    R`Strøm: 49 kr i måneden pluss 1,20 kr per kWh. Ved 500 kWh er prisen $1{,}2 \cdot 500 + 49 = 649$ kr.
Stigningstallet mellom (0, 49) og (500, 649) er $\dfrac{649 - 49}{500} = 1{,}2$.`,
    R`Stigningstallet er endringen per enhet.`),
  en: O("A linear model",
    R`A linear model has a fixed addition per unit and a starting value. The starting value is the cost when x is zero, and the slope is how much y increases when x increases by 1. Between two points the slope is the difference in y divided by the difference in x. Electricity, a taxi and an hourly rate are typical examples. A fixed percentage per period is not linear, but exponential.`,
    [[R`y = ax + b`, "linear model"], [R`a = \frac{y_2 - y_1}{x_2 - x_1}`, "slope"]],
    [["a", "slope", "NOK"], ["b", "starting value", "NOK"], ["x", "number of units", ""]],
    R`Electricity: 49 NOK a month plus 1.20 NOK per kWh. At 500 kWh the price is $1.2 \cdot 500 + 49 = 649$ NOK.
The slope between (0, 49) and (500, 649) is $\dfrac{649 - 49}{500} = 1.2$.`,
    R`The slope is the change per unit.`) },
{ id: "omvendt-proporsjon", chk: ["4*6 ≈ 24", "24/8 ≈ 3"],
  nb: O("Omvendt proporsjon",
    R`To størrelser er proporsjonale når den ene er en konstant ganget med den andre, uten startverdi. Dobler du den ene, dobles den andre. De er omvendt proporsjonale når produktet er konstant. Dobler du den ene, halveres den andre. Arbeid med flere personer er et vanlig eksempel: antall dagsverk er det samme, så flere arbeidere bruker færre dager. Du finner produktet først, og deler deretter.`,
    [[R`y = kx`, "proporsjonal"], [R`x \cdot y = k`, "omvendt proporsjonal"]],
    [["k", "konstanten", ""]],
    R`4 arbeidere bruker 6 dager. Dagsverkene er $4 \cdot 6 = 24$.
8 arbeidere bruker $24/8 = 3$ dager.`,
    R`Omvendt proporsjon: produktet er konstant. Proporsjon: forholdet er konstant.`),
  en: O("Inverse proportion",
    R`Two quantities are proportional when one is a constant times the other, with no starting value. If you double one, you double the other. They are inversely proportional when the product is constant. If you double one, you halve the other. Work with more people is a common example: the number of worker-days is the same, so more workers take fewer days. You find the product first, and then divide.`,
    [[R`y = kx`, "proportional"], [R`x \cdot y = k`, "inversely proportional"]],
    [["k", "the constant", ""]],
    R`4 workers take 6 days. The worker-days are $4 \cdot 6 = 24$.
8 workers take $24/8 = 3$ days.`,
    R`Inverse proportion: the product is constant. Proportion: the ratio is constant.`) },
{ id: "skjaring", chk: ["(100-40)/(8-5) ≈ 20", "100+5*20 ≈ 200"],
  nb: O("Skjæringspunkt",
    R`To lineære tilbud koster like mye der grafene skjærer hverandre. Du setter uttrykkene lik hverandre og løser for x. Stigningstallet som er brattest, vinner når x blir stor. For å vite hvilket tilbud som er billigst på hver side, regner du ut prisen i skjæringspunktet og sammenligner ett punkt til venstre. x må gi mening i situasjonen, for eksempel et ikke-negativt antall.`,
    [[R`a_1 x + b_1 = a_2 x + b_2`, "lik kostnad"], [R`x = \frac{b_1 - b_2}{a_2 - a_1}`, "skjæringspunkt"]],
    [["a", "pris per enhet", "kr"], ["b", "fast ledd", "kr"]],
    R`Tilbud A er $100 + 5x$ og tilbud B er $40 + 8x$.
$x = \dfrac{100 - 40}{8 - 5} = 20$. Prisen der er $100 + 5 \cdot 20 = 200$ kr.`,
    R`Sett uttrykkene lik hverandre. Sjekk svaret i begge tilbud.`),
  en: O("Intersection",
    R`Two linear offers cost the same where the graphs intersect. You set the expressions equal and solve for x. The steeper slope wins when x becomes large. To know which offer is cheaper on each side, you calculate the price at the intersection and compare one point to the left. x must make sense in the situation, for example a non-negative number.`,
    [[R`a_1 x + b_1 = a_2 x + b_2`, "equal cost"], [R`x = \frac{b_1 - b_2}{a_2 - a_1}`, "intersection"]],
    [["a", "price per unit", "NOK"], ["b", "fixed term", "NOK"]],
    R`Offer A is $100 + 5x$ and offer B is $40 + 8x$.
$x = \dfrac{100 - 40}{8 - 5} = 20$. The price there is $100 + 5 \cdot 20 = 200$ NOK.`,
    R`Set the expressions equal. Check the answer in both offers.`) }
]);

// ---------- VG1P 4: Sannsynlighet ----------
TOPICS("VG1P", 4, [
{ id: "komplement", chk: ["1-0.3 ≈ 0.7", "12/30 ≈ 0.4"],
  nb: O("Sannsynlighet og komplement",
    R`En sannsynlighet er et tall fra 0 til 1. I en uniform modell deler du antall gunstige utfall på antall mulige. Komplementet er det som ikke skjer, og sannsynligheten er 1 minus den opprinnelige. Relativ frekvens er hvor ofte noe skjedde i et forsøk. Med mange forsøk nærmer den seg sannsynligheten, men et lite forsøk kan avvike. Én sekser på en terning er ett av seks utfall.`,
    [[R`P(A) = \frac{\text{gunstige}}{\text{mulige}}`, "uniform modell"], [R`P(\text{ikke } A) = 1 - P(A)`, "komplement"]],
    [["P(A)", "sannsynlighet for A", ""]],
    R`Sannsynlighet for regn 0,3 gir opphold $1 - 0{,}3 = 0{,}7$.
12 av 30 elever har briller: $\dfrac{12}{30} = 0{,}4$.`,
    R`Komplementet og den opprinnelige sannsynligheten summerer til 1.`),
  en: O("Probability and complement",
    R`A probability is a number from 0 to 1. In a uniform model you divide the number of favourable outcomes by the number of possible ones. The complement is what does not happen, and its probability is 1 minus the original. Relative frequency is how often something happened in an experiment. With many trials it approaches the probability, but a small experiment can differ. One six on a die is one of six outcomes.`,
    [[R`P(A) = \frac{\text{favourable}}{\text{possible}}`, "uniform model"], [R`P(\text{not } A) = 1 - P(A)`, "complement"]],
    [["P(A)", "probability of A", ""]],
    R`A probability of rain of 0.3 gives dry weather $1 - 0.3 = 0.7$.
12 of 30 students wear glasses: $\dfrac{12}{30} = 0.4$.`,
    R`The complement and the original probability add up to 1.`) },
{ id: "uavhengige-kast", chk: ["0.5*0.5 ≈ 0.25"],
  nb: O("Uavhengige forsøk",
    R`To forsøk er uavhengige når det første ikke endrer sannsynligheten for det andre. Da er sannsynligheten for begge produktet av sannsynlighetene. Et myntkast endrer ikke det neste. Et valgtre med sannsynlighet på hver gren viser de samme produktene. Trekker du uten å legge tilbake, er forsøkene avhengige, og du kan ikke gange de samme tallene på nytt.`,
    [[R`P(A \text{ og } B) = P(A) \cdot P(B)`, "uavhengige"]],
    [["P(A)", "sannsynlighet for A", ""], ["P(B)", "sannsynlighet for B", ""]],
    R`To myntkast. Sannsynligheten for kron begge ganger er $0{,}5 \cdot 0{,}5 = 0{,}25$.`,
    R`Uavhengig: gang. Uten tilbakelegging: sannsynligheten endrer seg.`),
  en: O("Independent trials",
    R`Two trials are independent when the first does not change the probability of the second. Then the probability of both is the product of the probabilities. A coin toss does not change the next one. A tree diagram with a probability on each branch shows the same products. If you draw without replacement, the trials are dependent, and you cannot multiply the same numbers again.`,
    [[R`P(A \text{ and } B) = P(A) \cdot P(B)`, "independent"]],
    [["P(A)", "probability of A", ""], ["P(B)", "probability of B", ""]],
    R`Two coin tosses. The probability of heads both times is $0.5 \cdot 0.5 = 0.25$.`,
    R`Independent: multiply. Without replacement: the probability changes.`) },
{ id: "minst-en-sekser", chk: ["1-(5/6)^2 ≈ 0.3056", "11/36 ≈ 0.3056"],
  nb: O("Minst én sekser",
    R`Sannsynligheten for minst én sekser er 1 minus sannsynligheten for ingen seksere. På ett terningkast er sannsynligheten for ikke sekser 5 av 6. To uavhengige kast gir dette forholdet i andre. Brøken 11 av 36 er den eksakte verdien. Kursets teoritekst runder den samme verdien til 0,31. Her står fire desimaler, så avrundingen kan kontrolleres mot brøken.`,
    [[R`P(\text{minst én}) = 1 - \left(\frac{5}{6}\right)^n`, "n terninger"]],
    [["n", "antall terninger", ""]],
    R`To terninger: $1 - \left(\dfrac{5}{6}\right)^2 = \dfrac{11}{36} \approx 0{,}3056$.`,
    R`Kurset runder 11/36 til 0,31. «Minst én» regnes med komplementet.`),
  en: O("At least one six",
    R`The probability of at least one six is 1 minus the probability of no sixes. On one dice roll the probability of not a six is 5 out of 6. Two independent rolls give this ratio squared. The fraction 11 out of 36 is the exact value. The course theory rounds the same value to 0.31. Four decimals are written here, so the rounding can be checked against the fraction.`,
    [[R`P(\text{at least one}) = 1 - \left(\frac{5}{6}\right)^n`, "n dice"]],
    [["n", "number of dice", ""]],
    R`Two dice: $1 - \left(\dfrac{5}{6}\right)^2 = \dfrac{11}{36} \approx 0.3056$.`,
    R`The course rounds 11/36 to 0.31. "At least one" is calculated with the complement.`) }
]);

// ---------- VG2P 0: Statistikk ----------
TOPICS("VG2P", 0, [
{ id: "sentralmal", chk: ["(25+27+28+30+90)/5 ≈ 40", "(4+6+8+10)/4 ≈ 7"],
  nb: O("Gjennomsnitt, median og typetall",
    R`Gjennomsnittet er summen delt på antall, og én svært høy verdi drar det opp. Medianen er den midterste verdien når tallene er sortert. Ved partall er den gjennomsnittet av de to midterste. Typetallet er verdien som forekommer oftest. Medianen beskriver ofte det typiske bedre når ett tall er ekstremt. Gjennomsnittet er likevel riktig som regnestykke, det svarer bare på et annet spørsmål.`,
    [[R`\bar x = \frac{\text{sum}}{n}`, "gjennomsnitt"], [R`\text{median}`, "midterste sorterte verdi"]],
    [["n", "antall verdier", ""]],
    R`Lønn 25, 27, 28, 30 og 90: gjennomsnitt $\dfrac{25 + 27 + 28 + 30 + 90}{5} = 40$, median 28.
Tallene 4, 6, 8 og 10 har gjennomsnitt $\dfrac{4 + 6 + 8 + 10}{4} = 7$.
I 2, 3, 3, 5, 3, 7, 2 er typetallet 3.`,
    R`Medianen er den midterste etter sortering. Den er ikke et nytt regnestykke utover det.`),
  en: O("Mean, median and mode",
    R`The mean is the sum divided by the count, and one very high value pulls it up. The median is the middle value once the numbers are sorted. For an even count it is the average of the two middle ones. The mode is the value that occurs most often. The median often describes the typical case better when one number is extreme. The mean is still correct as a calculation, it just answers a different question.`,
    [[R`\bar x = \frac{\text{sum}}{n}`, "mean"], [R`\text{median}`, "middle sorted value"]],
    [["n", "number of values", ""]],
    R`Pay 25, 27, 28, 30 and 90: mean $\dfrac{25 + 27 + 28 + 30 + 90}{5} = 40$, median 28.
The numbers 4, 6, 8 and 10 have mean $\dfrac{4 + 6 + 8 + 10}{4} = 7$.
In 2, 3, 3, 5, 3, 7, 2 the mode is 3.`,
    R`The median is the middle value after sorting. It is not a further calculation beyond that.`) },
{ id: "spredning", chk: ["19-4 ≈ 15", "(2+4+4+6)/4 ≈ 4", "sqrt(((2-4)^2+(4-4)^2+(4-4)^2+(6-4)^2)/4) ≈ 1.414"],
  nb: O("Variasjonsbredde og standardavvik",
    R`Variasjonsbredden er største verdi minus minste verdi. Den bruker bare de to ytterpunktene. Standardavviket her er kvadratroten av gjennomsnittet av de kvadrerte avvikene fra gjennomsnittet, altså delt på antall verdier. Noen kalkulatorer deler på antall minus 1 når de regner utvalgsstandardavvik, og da blir tallet større. Eksemplet bruker deling på antall, slik at regnestykket er entydig.`,
    [[R`\text{variasjonsbredde} = x_{\max} - x_{\min}`, "spredning"], [R`\sigma = \sqrt{\frac{\sum (x - \bar x)^2}{n}}`, "delt på antall"]],
    [["n", "antall verdier", ""], ["\\sigma", "standardavvik", ""]],
    R`Tallene 12, 4, 19 og 7 har variasjonsbredde $19 - 4 = 15$.
Tallene 2, 4, 4 og 6 har gjennomsnitt 4 og standardavvik $\sqrt{2} \approx 1{,}414$ når vi deler på 4.`,
    R`Deling på n og deling på n minus 1 er to ulike definisjoner. Her deles det på n.`),
  en: O("Range and standard deviation",
    R`The range is the largest value minus the smallest value. It uses only the two extremes. The standard deviation here is the square root of the average of the squared deviations from the mean, that is divided by the count. Some calculators divide by the count minus 1 when they compute a sample standard deviation, and then the number is larger. The example divides by the count, so the calculation is unambiguous.`,
    [[R`\text{range} = x_{\max} - x_{\min}`, "spread"], [R`\sigma = \sqrt{\frac{\sum (x - \bar x)^2}{n}}`, "divided by the count"]],
    [["n", "number of values", ""], ["\\sigma", "standard deviation", ""]],
    R`The numbers 12, 4, 19 and 7 have range $19 - 4 = 15$.
The numbers 2, 4, 4 and 6 have mean 4 and standard deviation $\sqrt{2} \approx 1.414$ when we divide by 4.`,
    R`Dividing by n and dividing by n minus 1 are two different definitions. Here we divide by n.`) },
{ id: "kvartiler", chk: ["(7+9)/2 ≈ 8", "(3+5)/2 ≈ 4", "(11+13)/2 ≈ 12", "12-4 ≈ 8"],
  nb: O("Kvartiler",
    R`Kvartilene deler de sorterte tallene i fire omtrent like store deler. Medianen er den midterste, og ved partall gjennomsnittet av de to midterste. Nedre kvartil er medianen i den nedre halvdelen, og øvre kvartil er medianen i den øvre. Kvartilbredden er øvre minus nedre. Den påvirkes ikke av én enkelt ekstrem verdi i enden, slik gjennomsnittet og variasjonsbredden gjør. Metoden her er medianen av hver halvdel.`,
    [[R`\text{kvartilbredde} = Q_3 - Q_1`, "spredning i midten"]],
    [["Q_1", "nedre kvartil", ""], ["Q_3", "øvre kvartil", ""]],
    R`Sortert: 1, 3, 5, 7, 9, 11, 13, 15. Median $\dfrac{7 + 9}{2} = 8$.
Nedre halvdel gir $Q_1 = \dfrac{3 + 5}{2} = 4$, øvre gir $Q_3 = \dfrac{11 + 13}{2} = 12$.
Kvartilbredden er $12 - 4 = 8$.`,
    R`Her er kvartilen medianen av halvdelen. Andre lærebøker kan dele annerledes.`),
  en: O("Quartiles",
    R`The quartiles split the sorted numbers into four roughly equal parts. The median is the middle value, and for an even count the average of the two middle ones. The lower quartile is the median of the lower half, and the upper quartile is the median of the upper half. The interquartile range is upper minus lower. It is not affected by one single extreme value at the end, the way the mean and the range are. The method here is the median of each half.`,
    [[R`\text{interquartile range} = Q_3 - Q_1`, "spread in the middle"]],
    [["Q_1", "lower quartile", ""], ["Q_3", "upper quartile", ""]],
    R`Sorted: 1, 3, 5, 7, 9, 11, 13, 15. Median $\dfrac{7 + 9}{2} = 8$.
The lower half gives $Q_1 = \dfrac{3 + 5}{2} = 4$, the upper gives $Q_3 = \dfrac{11 + 13}{2} = 12$.
The interquartile range is $12 - 4 = 8$.`,
    R`Here the quartile is the median of the half. Other textbooks may split differently.`) }
]);

// ---------- VG2P 1: Eksponentiell vekst ----------
TOPICS("VG2P", 1, [
{ id: "byvekst", chk: ["20000*1.02^10 ≈ 24380"],
  nb: O("Vekst med fast prosent",
    R`Vokser noe med samme prosent hver periode, er modellen eksponentiell. Startverdien ganges med vekstfaktoren én gang per periode. To prosent vekst gir faktoren 1,02, ikke 2. En fast økning i antall personer per år er lineær, ikke eksponentiell. Etter mange perioder blir den eksponentielle modellen mye større enn den lineære, selv om de starter likt. Avrundingen under er til nærmeste hele innbygger.`,
    [[R`f(x) = a \cdot b^x`, "eksponentiell modell"], [R`b = 1 + \frac{p}{100}`, "vekstfaktor"]],
    [["a", "startverdi", ""], ["p", "prosent per periode", "%"]],
    R`20 000 innbyggere og 2 % vekst i året. Etter 10 år: $20\,000 \cdot 1{,}02^{10} \approx 24\,380$.`,
    R`Fast prosent gir eksponentiell modell. Fast tall gir lineær.`),
  en: O("Growth by a fixed percentage",
    R`If something grows by the same percentage each period, the model is exponential. The starting value is multiplied by the growth factor once per period. Two percent growth gives the factor 1.02, not 2. A fixed increase in the number of people per year is linear, not exponential. After many periods the exponential model becomes much larger than the linear one, even if they start equal. The rounding below is to the nearest whole inhabitant.`,
    [[R`f(x) = a \cdot b^x`, "exponential model"], [R`b = 1 + \frac{p}{100}`, "growth factor"]],
    [["a", "starting value", ""], ["p", "percent per period", "%"]],
    R`20,000 inhabitants and 2% growth per year. After 10 years: $20\,000 \cdot 1.02^{10} \approx 24\,380$.`,
    R`A fixed percentage gives an exponential model. A fixed amount gives a linear one.`) },
{ id: "halveringstid", chk: ["15/5 ≈ 3", "80/2^3 ≈ 10"],
  nb: O("Halveringstid",
    R`Halveringstid er tiden til en mengde er halvert. Etter én halveringstid er halvparten igjen, etter to er en firedel igjen, og så videre. Antall halveringer er tiden delt på halveringstiden. Resten er startmengden delt på 2 opphøyd i det antallet. Modellen brukes for radioaktive stoffer og for annen nedgang som halveres med faste mellomrom. En fast prosent som ikke er 50, er ikke en halvering.`,
    [[R`\text{rester} = a \cdot \left(\frac{1}{2}\right)^{t/T}`, "etter tiden t"]],
    [["a", "startmengde", ""], ["T", "halveringstid", ""], ["t", "tid", ""]],
    R`Halveringstid 5 år, start 80 g, tid 15 år.
Antall halveringer er $15/5 = 3$, og resten er $80/2^3 = 10$ g.`,
    R`Tre halveringer: 80, 40, 20, 10.`),
  en: O("Half-life",
    R`The half-life is the time until a quantity has halved. After one half-life half remains, after two a quarter remains, and so on. The number of halvings is the time divided by the half-life. The remainder is the starting amount divided by 2 raised to that number. The model is used for radioactive substances and for other decrease that halves at fixed intervals. A fixed percentage that is not 50 is not a halving.`,
    [[R`\text{remaining} = a \cdot \left(\frac{1}{2}\right)^{t/T}`, "after time t"]],
    [["a", "starting amount", ""], ["T", "half-life", ""], ["t", "time", ""]],
    R`Half-life 5 years, start 80 g, time 15 years.
The number of halvings is $15/5 = 3$, and the remainder is $80/2^3 = 10$ g.`,
    R`Three halvings: 80, 40, 20, 10.`) },
{ id: "doblingstid-2p", chk: ["70/7 ≈ 10", "ln(2)/ln(1.07) ≈ 10.24"],
  nb: O("Doblingstid",
    R`Doblingstid er tiden til en størrelse er doblet. 70-regelen sier at du kan dele 70 på prosenten og få et omtrentlig antall perioder. Den er en tommelfingerregel, ikke en eksakt formel. Den eksakte tiden er logaritmen av 2 delt på logaritmen av vekstfaktoren. For 7 % rente gir regelen 10 år, mens logaritmen gir litt over 10 år. Bruk logaritmen når oppgaven ber om en nøyaktig verdi.`,
    [[R`t \approx \frac{70}{p}`, "70-regelen"], [R`t = \frac{\ln 2}{\ln(1 + p/100)}`, "eksakt doblingstid"]],
    [["p", "prosent per periode", "%"], ["t", "antall perioder", ""]],
    R`7 % rente. 70-regelen: $\dfrac{70}{7} = 10$ år.
Eksakt: $\dfrac{\ln 2}{\ln 1{,}07} \approx 10{,}24$ år.`,
    R`10 år er regelen. 10,24 år er logaritmen. De er ikke samme regnestykke.`),
  en: O("Doubling time",
    R`The doubling time is the time until a quantity has doubled. The rule of 70 says that you can divide 70 by the percentage and get an approximate number of periods. It is a rule of thumb, not an exact formula. The exact time is the logarithm of 2 divided by the logarithm of the growth factor. For 7% interest the rule gives 10 years, while the logarithm gives a little over 10 years. Use the logarithm when the task asks for an exact value.`,
    [[R`t \approx \frac{70}{p}`, "the rule of 70"], [R`t = \frac{\ln 2}{\ln(1 + p/100)}`, "exact doubling time"]],
    [["p", "percent per period", "%"], ["t", "number of periods", ""]],
    R`7% interest. The rule of 70: $\dfrac{70}{7} = 10$ years.
Exact: $\dfrac{\ln 2}{\ln 1.07} \approx 10.24$ years.`,
    R`10 years is the rule. 10.24 years is the logarithm. They are not the same calculation.`) }
]);

// ---------- VG2P 2: Potenser og standardform ----------
TOPICS("VG2P", 2, [
{ id: "standardform", chk: ["4.5*10^4 ≈ 45000", "1.5e8/(3e5) ≈ 500", "500/60 ≈ 8.33"],
  nb: O("Standardform",
    R`Standardform skriver et tall som et tall fra og med 1 til under 10, ganget med en tierpotens. Kommaet flyttes så det står ett siffer foran, og antall plasser blir eksponenten. Positive eksponenter gir store tall, negative gir små. Når du deler to tall på standardform, deler du forfaktorene og trekker eksponentene fra hverandre. Lysets reisetid under er eksakt 500 sekunder, og minuttene er den tiden delt på 60.`,
    [[R`k \cdot 10^n`, "1 ≤ k < 10"], [R`\frac{a \cdot 10^m}{b \cdot 10^n} = \frac{a}{b} \cdot 10^{m-n}`, "divisjon"]],
    [["k", "forfaktoren", ""], ["n", "eksponenten", ""]],
    R`$45\,000 = 4{,}5 \cdot 10^4$.
Avstanden til sola $1{,}5 \cdot 10^8$ km og lysfart $3 \cdot 10^5$ km/s gir $\dfrac{1{,}5 \cdot 10^8}{3 \cdot 10^5} = 500$ sekunder, som er $\dfrac{500}{60} \approx 8{,}33$ minutter.`,
    R`Ett siffer foran komma. Kurset sier drøyt 8 minutter om den samme reisen.`),
  en: O("Standard form",
    R`Standard form writes a number as a number from 1 up to but not including 10, times a power of ten. The decimal point is moved so that one digit stands in front, and the number of places becomes the exponent. Positive exponents give large numbers, negative ones give small numbers. When you divide two numbers in standard form, you divide the coefficients and subtract the exponents. The travel time of light below is exactly 500 seconds, and the minutes are that time divided by 60.`,
    [[R`k \cdot 10^n`, "1 ≤ k < 10"], [R`\frac{a \cdot 10^m}{b \cdot 10^n} = \frac{a}{b} \cdot 10^{m-n}`, "division"]],
    [["k", "the coefficient", ""], ["n", "the exponent", ""]],
    R`$45\,000 = 4.5 \cdot 10^4$.
The distance to the Sun $1.5 \cdot 10^8$ km and the speed of light $3 \cdot 10^5$ km/s give $\dfrac{1.5 \cdot 10^8}{3 \cdot 10^5} = 500$ seconds, which is $\dfrac{500}{60} \approx 8.33$ minutes.`,
    R`One digit before the decimal point. The course says just over 8 minutes for the same journey.`) },
{ id: "potensregler", chk: ["2^(3+4) ≈ 128", "2^3*2^4 ≈ 128", "10^-2 ≈ 0.01", "3*2*10^(4+3) ≈ 60000000"],
  nb: O("Potensregler",
    R`Når du ganger sammen potenser med samme grunntall, legger du sammen eksponentene. Deler du, trekker du dem fra. En potens av en potens ganger eksponentene. Et tall i nullte er 1, og en negativ eksponent er 1 delt på den positive potensen. På standardform ganger du forfaktorene for seg og tierpotensene for seg. Hvis forfaktoren blir 10 eller mer, flytter du kommaet og justerer eksponenten.`,
    [[R`a^m \cdot a^n = a^{m+n}`, "produkt"], [R`a^{-n} = \frac{1}{a^n}`, "negativ eksponent"], [R`(a^m)^n = a^{mn}`, "potens av potens"]],
    [["a", "grunntall", ""], ["m,\\ n", "eksponenter", ""]],
    R`$2^3 \cdot 2^4 = 2^{3+4} = 2^7 = 128$.
$10^{-2} = 0{,}01$.
$(3 \cdot 10^4) \cdot (2 \cdot 10^3) = 6 \cdot 10^7 = 60\,000\,000$.`,
    R`Samme grunntall: legg sammen eksponentene. Ulike grunntall kan ikke slås sammen slik.`),
  en: O("Rules of powers",
    R`When you multiply powers with the same base, you add the exponents. If you divide, you subtract them. A power of a power multiplies the exponents. A number to the power zero is 1, and a negative exponent is 1 divided by the positive power. In standard form you multiply the coefficients separately and the powers of ten separately. If the coefficient becomes 10 or more, you move the decimal point and adjust the exponent.`,
    [[R`a^m \cdot a^n = a^{m+n}`, "product"], [R`a^{-n} = \frac{1}{a^n}`, "negative exponent"], [R`(a^m)^n = a^{mn}`, "power of a power"]],
    [["a", "base", ""], ["m,\\ n", "exponents", ""]],
    R`$2^3 \cdot 2^4 = 2^{3+4} = 2^7 = 128$.
$10^{-2} = 0.01$.
$(3 \cdot 10^4) \cdot (2 \cdot 10^3) = 6 \cdot 10^7 = 60\,000\,000$.`,
    R`Same base: add the exponents. Different bases cannot be combined that way.`) },
{ id: "prefikser", chk: ["3*10^3 ≈ 3000", "3*10^-5 ≈ 0.00003"],
  nb: O("Prefikser",
    R`Et prefiks er en tierpotens med et navn. Kilo er tusen, altså 10 i tredje. Mega er en million og giga en milliard. Milli er en tusendel og mikro en milliondel. Du gjør om ved å gange med potensen prefikset står for. Små tall på standardform har negativ eksponent. Et tall som 0,00003 er lite, og standardformen har ett siffer foran komma.`,
    [[R`\text{kilo} = 10^3`, "tusen"], [R`\text{milli} = 10^{-3}`, "tusendel"], [R`\text{mikro} = 10^{-6}`, "milliondel"]],
    [["10^3", "kilo", ""], ["10^{-5}", "fem plasser under 1", ""]],
    R`3 km er $3 \cdot 10^3 = 3000$ m.
$0{,}00003 = 3 \cdot 10^{-5}$.`,
    R`Positiv eksponent flytter kommaet til høyre. Negativ eksponent flytter det til venstre.`),
  en: O("Prefixes",
    R`A prefix is a power of ten with a name. Kilo is one thousand, that is 10 to the third. Mega is one million and giga one billion. Milli is one thousandth and micro one millionth. You convert by multiplying by the power the prefix stands for. Small numbers in standard form have a negative exponent. A number with several zeros after the decimal point is small, and the standard form has one digit before the point.`,
    [[R`\text{kilo} = 10^3`, "one thousand"], [R`\text{milli} = 10^{-3}`, "one thousandth"], [R`\text{micro} = 10^{-6}`, "one millionth"]],
    [["10^3", "kilo", ""], ["10^{-5}", "five places below 1", ""]],
    R`3 km is $3 \cdot 10^3 = 3000$ m.
$0.00003 = 3 \cdot 10^{-5}$.`,
    R`A positive exponent moves the decimal point to the right. A negative exponent moves it to the left.`) }
]);
})();
