// ============================================================
//  add_gs_c.js – UNGDOMSSKOLEN: Matematikk 8.–10. trinn (LK20). Kjernestoffet fram mot eksamen etter 10. trinn.
// ============================================================
NEWCOURSE({ code: "GU810", study: "ungdom", group: "Ungdomsskole", nb: "Matematikk 8.–10.", en: "Maths years 8–10", s: ["M8", "M8"], eqText: { nb: "8.–10. trinn (LK20)", en: "Years 8–10 (Norwegian curriculum)" }, units: [] });
(() => {
const U = (nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT("GU810", nb, en); THEORY("GU810", u, { nb: thNb, en: thEn }); BIQ("GU810", u, qs); if(gens.length) GEN("GU810", u, ...gens); return u; };
const N = (n, tol = 0, u = "") => ({ n, tol, u });
const neg = x => x < 0 ? `(${x})` : String(x);

U("Tall og regnerekkefølge", "Numbers and order of operations",
`## Hva handler det om?
Når et regnestykke har flere regnearter, må alle regne i samme rekkefølge – ellers får vi ulike svar.

## Det viktigste
- **Regnerekkefølge**: 1) parenteser, 2) potenser, 3) gange og dele, 4) pluss og minus.
- **Negative tall**: minus ganger minus blir pluss. $(-3) \\cdot (-4) = 12$, mens $(-3) \\cdot 4 = -12$.
- Å trekke fra et negativt tall er det samme som å legge til: $5 - (-2) = 7$.
- Et **primtall** har bare to faktorer: 1 og seg selv (2, 3, 5, 7, 11 …).
- **Primfaktorisering**: $60 = 2 \\cdot 2 \\cdot 3 \\cdot 5$.

### Eksempel
$3 + 4 \\cdot 2 = 3 + 8 = 11$ – ikke 14, for ganging kommer før pluss.

> Usikker? Sett parenteser rundt det som skal regnes først.`,
`## What is it about?
When a calculation has several operations, everyone must work them out in the same order – otherwise we get different answers.

## Key points
- **Order of operations**: 1) brackets, 2) powers, 3) multiply and divide, 4) add and subtract.
- **Negative numbers**: minus times minus is plus. $(-3) \\cdot (-4) = 12$, while $(-3) \\cdot 4 = -12$.
- Subtracting a negative number is the same as adding: $5 - (-2) = 7$.
- A **prime number** has exactly two factors: 1 and itself (2, 3, 5, 7, 11 …).
- **Prime factorisation**: $60 = 2 \\cdot 2 \\cdot 3 \\cdot 5$.

### Example
$3 + 4 \\cdot 2 = 3 + 8 = 11$ – not 14, because multiplying comes before adding.

> Not sure? Put brackets around what should be done first.`,
[["Hva er $2 + 3 \\cdot 5$?", ["17", "25", "13", "30"], "Gange først: $3 \\cdot 5 = 15$, så $2 + 15 = 17$.",
  "What is $2 + 3 \\cdot 5$?", ["17", "25", "13", "30"], "Multiply first: $3 \\cdot 5 = 15$, then $2 + 15 = 17$."],
 ["Hva er $(-6) \\cdot (-2)$?", ["12", "-12", "-8", "8"], "Minus ganger minus blir pluss.",
  "What is $(-6) \\cdot (-2)$?", ["12", "-12", "-8", "8"], "Minus times minus is plus."],
 ["Hva er $4 - (-3)$?", ["7", "1", "-7", "-1"], "Å trekke fra et negativt tall er å legge til: $4 + 3 = 7$.",
  "What is $4 - (-3)$?", ["7", "1", "-7", "-1"], "Subtracting a negative is adding: $4 + 3 = 7$."],
 ["Hvilket tall er et primtall?", ["13", "15", "21", "27"], "13 kan bare deles på 1 og 13.",
  "Which number is a prime?", ["13", "15", "21", "27"], "13 can only be divided by 1 and 13."],
 ["Primfaktoriser 18.", ["$2 \\cdot 3 \\cdot 3$", "$2 \\cdot 9$", "$3 \\cdot 6$", "$1 \\cdot 18$"], "Alle faktorene må være primtall: $18 = 2 \\cdot 3 \\cdot 3$.",
  "Prime factorise 18.", ["$2 \\cdot 3 \\cdot 3$", "$2 \\cdot 9$", "$3 \\cdot 6$", "$1 \\cdot 18$"], "All factors must be primes: $18 = 2 \\cdot 3 \\cdot 3$."],
 ["Hva er $(2 + 3)^2$?", ["25", "13", "10", "11"], "Parentesen først: $5^2 = 25$.",
  "What is $(2 + 3)^2$?", ["25", "13", "10", "11"], "Brackets first: $5^2 = 25$."]],
 () => { const a = R.i(1, 20), b = R.i(2, 9), c = R.i(2, 9), v = a + b * c;
   return [T(`Regn ut $${a} + ${b} \\cdot ${c}$.`, `Calculate $${a} + ${b} \\cdot ${c}$.`), N(v), T(`Gange først: $${b} \\cdot ${c} = ${b * c}$. Så $${a} + ${b * c} = ${v}$.`, `Multiply first: $${b} \\cdot ${c} = ${b * c}$. Then $${a} + ${b * c} = ${v}$.`)]; },
 () => { const a = R.i(2, 9), b = R.i(2, 9), c = R.i(2, 6), v = (a + b) * c;
   return [T(`Regn ut $(${a} + ${b}) \\cdot ${c}$.`, `Calculate $(${a} + ${b}) \\cdot ${c}$.`), N(v), T(`Parentesen først: $${a + b} \\cdot ${c} = ${v}$.`, `Brackets first: $${a + b} \\cdot ${c} = ${v}$.`)]; },
 () => { const a = R.i(-12, 12) || 5, b = R.i(-12, 12) || -3, op = R.p(["+", "-", "\\cdot"]), v = op === "+" ? a + b : op === "-" ? a - b : a * b;
   return [T(`Regn ut $${neg(a)} ${op} ${neg(b)}$.`, `Calculate $${neg(a)} ${op} ${neg(b)}$.`), N(v), T(`$${neg(a)} ${op} ${neg(b)} = ${v}$.${op === "\\cdot" ? T(" Like fortegn gir pluss, ulike gir minus.", " Same signs give plus, different signs give minus.") : ""}`, `$${neg(a)} ${op} ${neg(b)} = ${v}$.${op === "\\cdot" ? " Same signs give plus, different signs give minus." : ""}`)]; },
 () => { const [a, b] = R.distinct(2, 2, 12), g = (x, y) => y ? g(y, x % y) : x, l = a * b / g(a, b);
   return [T(`Hva er det minste tallet som både ${a} og ${b} går opp i (minste felles multiplum)?`, `What is the smallest number that both ${a} and ${b} divide into (lowest common multiple)?`), N(l), T(`Tell i ${Math.max(a, b)}-gangen til du finner et tall ${Math.min(a, b)} går opp i: ${l}.`, `Count in the ${Math.max(a, b)} times table until you find a number ${Math.min(a, b)} divides into: ${l}.`)]; }
);

U("Brøk, prosent og vekstfaktor", "Fractions, percent and growth factor",
`## Hva handler det om?
Prosent brukes overalt: rabatter, renter, lønn og statistikk. **Vekstfaktoren** gjør det enkelt å regne med økning og nedgang.

## Det viktigste
- Brøk med ulik nevner: finn **fellesnevner**. $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.
- **Prosent av**: $p\\,\\%$ av $x$ er $\\frac{p}{100} \\cdot x$.
- **Vekstfaktor**: øker med $p\\,\\%$ → gang med $1 + \\frac{p}{100}$. Synker med $p\\,\\%$ → gang med $1 - \\frac{p}{100}$.
- 25 % økning: vekstfaktor 1,25. 20 % rabatt: vekstfaktor 0,80.
- **Prosentvis endring** = $\\frac{\\text{endring}}{\\text{opprinnelig verdi}} \\cdot 100\\,\\%$.

### Eksempel
En jakke til 800 kr settes ned med 30 %. Ny pris: $800 \\cdot 0{,}70 = 560$ kr.

> Prosentpoeng er noe annet enn prosent: fra 10 % til 12 % er 2 prosentpoeng, men 20 % økning.`,
`## What is it about?
Percentages are everywhere: discounts, interest, pay and statistics. The **growth factor** makes it easy to calculate increases and decreases.

## Key points
- Fractions with different denominators: find a **common denominator**. $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.
- **Percent of**: $p\\,\\%$ of $x$ is $\\frac{p}{100} \\cdot x$.
- **Growth factor**: increase by $p\\,\\%$ → multiply by $1 + \\frac{p}{100}$. Decrease by $p\\,\\%$ → multiply by $1 - \\frac{p}{100}$.
- 25 % increase: growth factor 1.25. 20 % discount: growth factor 0.80.
- **Percentage change** = $\\frac{\\text{change}}{\\text{original value}} \\cdot 100\\,\\%$.

### Example
A jacket for 800 kr is reduced by 30 %. New price: $800 \\cdot 0.70 = 560$ kr.

> Percentage points are not the same as percent: from 10 % to 12 % is 2 percentage points, but a 20 % increase.`,
[["Hva er vekstfaktoren når noe øker med 15 %?", ["1,15", "0,15", "0,85", "15"], "$1 + 0{,}15 = 1{,}15$.",
  "What is the growth factor when something increases by 15 %?", ["1.15", "0.15", "0.85", "15"], "$1 + 0.15 = 1.15$."],
 ["Hva er vekstfaktoren ved 40 % rabatt?", ["0,60", "0,40", "1,40", "1,60"], "$1 - 0{,}40 = 0{,}60$.",
  "What is the growth factor with a 40 % discount?", ["0.60", "0.40", "1.40", "1.60"], "$1 - 0.40 = 0.60$."],
 ["Hva er $\\frac{1}{4} + \\frac{1}{3}$?", ["$\\frac{7}{12}$", "$\\frac{2}{7}$", "$\\frac{1}{7}$", "$\\frac{2}{12}$"], "Fellesnevner 12: $\\frac{3}{12} + \\frac{4}{12} = \\frac{7}{12}$.",
  "What is $\\frac{1}{4} + \\frac{1}{3}$?", ["$\\frac{7}{12}$", "$\\frac{2}{7}$", "$\\frac{1}{7}$", "$\\frac{2}{12}$"], "Common denominator 12: $\\frac{3}{12} + \\frac{4}{12} = \\frac{7}{12}$."],
 ["En pris øker med 10 % og så synker den med 10 %. Hvor ender den?", ["Litt under startprisen", "Akkurat på startprisen", "Litt over startprisen", "Det kommer an på valutaen"], "$1{,}10 \\cdot 0{,}90 = 0{,}99$, altså 1 % lavere.",
  "A price rises by 10 % and then falls by 10 %. Where does it end?", ["Slightly below the start price", "Exactly at the start price", "Slightly above the start price", "It depends on the currency"], "$1.10 \\cdot 0.90 = 0.99$, so 1 % lower."],
 ["Renta går fra 4 % til 5 %. Hvor mange prosentpoeng har den økt?", ["1", "25", "5", "20"], "$5 - 4 = 1$ prosentpoeng (men 25 % økning).",
  "The interest rate goes from 4 % to 5 %. By how many percentage points has it risen?", ["1", "25", "5", "20"], "$5 - 4 = 1$ percentage point (but a 25 % increase)."],
 ["Hva er $\\frac{2}{3} \\cdot \\frac{3}{4}$?", ["$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{6}{7}$", "$\\frac{8}{9}$"], "Gang teller med teller og nevner med nevner: $\\frac{6}{12} = \\frac{1}{2}$.",
  "What is $\\frac{2}{3} \\cdot \\frac{3}{4}$?", ["$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{6}{7}$", "$\\frac{8}{9}$"], "Multiply top by top and bottom by bottom: $\\frac{6}{12} = \\frac{1}{2}$."]],
 () => { const p = R.p([5, 10, 15, 20, 25, 30, 40]), up = R.p([true, false]), x = 100 * R.i(2, 40), f = up ? 1 + p / 100 : 1 - p / 100, v = Math.round(x * f * 100) / 100;
   return [T(`En vare koster ${x} kr. Prisen ${up ? "øker" : "settes ned"} med ${p} %. Hva er den nye prisen?`, `An item costs ${x} kr. The price ${up ? "rises" : "is reduced"} by ${p} %. What is the new price?`), N(v, 0.01, "kr"),
     T(`Vekstfaktor: $${mf(f)}$. Ny pris: $${x} \\cdot ${mf(f)} = ${mf(v)}$ kr.`, `Growth factor: $${mf(f)}$. New price: $${x} \\cdot ${mf(f)} = ${mf(v)}$ kr.`)]; },
 () => { const old = 10 * R.i(5, 80), p = R.p([10, 20, 25, 50, 5, 40]), up = R.p([true, false]), nw = old * (up ? 1 + p / 100 : 1 - p / 100);
   return [T(`En pris endrer seg fra ${old} kr til ${nf(nw)} kr. Hvor mange prosent har prisen ${up ? "økt" : "sunket"}?`, `A price changes from ${old} kr to ${nf(nw)} kr. By how many percent has the price ${up ? "risen" : "fallen"}?`), N(p, 0.01, "%"),
     T(`Endringen er ${nf(Math.abs(nw - old))} kr. $\\frac{${mf(Math.abs(nw - old))}}{${old}} \\cdot 100\\,\\% = ${p}\\,\\%$.`, `The change is ${nf(Math.abs(nw - old))} kr. $\\frac{${mf(Math.abs(nw - old))}}{${old}} \\cdot 100\\,\\% = ${p}\\,\\%$.`)]; },
 () => { const p = R.p([2, 3, 4, 5, 8]), n = R.i(2, 5), k = 1000 * R.i(5, 50), v = Math.round(k * (1 + p / 100) ** n);
   return [T(`Du setter ${k} kr i banken med ${p} % rente per år. Hvor mye har du etter ${n} år (rund av til hele kroner)?`, `You put ${k} kr in the bank at ${p} % interest per year. How much do you have after ${n} years (round to whole kroner)?`), N(v, 1, "kr"),
     T(`$${k} \\cdot ${mf(1 + p / 100)}^{${n}} \\approx ${v}$ kr.`, `$${k} \\cdot ${mf(1 + p / 100)}^{${n}} \\approx ${v}$ kr.`)]; }
);

U("Potenser og kvadratrøtter", "Powers and square roots",
`## Hva handler det om?
**Potenser** er en kort måte å skrive gjentatt ganging. **Kvadratroten** er det motsatte av å kvadrere.

## Det viktigste
- $2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$. Tallet nede er **grunntallet**, tallet oppe er **eksponenten**.
- $a^m \\cdot a^n = a^{m+n}$ og $\\frac{a^m}{a^n} = a^{m-n}$.
- $a^0 = 1$ og $a^{-n} = \\frac{1}{a^n}$.
- **Standardform**: $a \\cdot 10^n$ der $1 \\le a < 10$. $45\\,000 = 4{,}5 \\cdot 10^4$.
- $\\sqrt{49} = 7$ fordi $7^2 = 49$.

### Eksempel
$3^2 \\cdot 3^3 = 3^5 = 243$.

> $(-2)^2 = 4$, men $-2^2 = -4$: parentesen bestemmer hva som kvadreres.`,
`## What is it about?
**Powers** are a short way to write repeated multiplication. The **square root** is the opposite of squaring.

## Key points
- $2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$. The number below is the **base**, the number above is the **exponent**.
- $a^m \\cdot a^n = a^{m+n}$ and $\\frac{a^m}{a^n} = a^{m-n}$.
- $a^0 = 1$ and $a^{-n} = \\frac{1}{a^n}$.
- **Standard form**: $a \\cdot 10^n$ where $1 \\le a < 10$. $45\\,000 = 4.5 \\cdot 10^4$.
- $\\sqrt{49} = 7$ because $7^2 = 49$.

### Example
$3^2 \\cdot 3^3 = 3^5 = 243$.

> $(-2)^2 = 4$, but $-2^2 = -4$: the brackets decide what is squared.`,
[["Hva er $5^0$?", ["1", "0", "5", "50"], "Alle tall (unntatt 0) opphøyd i 0 er 1.",
  "What is $5^0$?", ["1", "0", "5", "50"], "Any number (except 0) to the power 0 is 1."],
 ["Skriv $a^3 \\cdot a^4$ som én potens.", ["$a^7$", "$a^{12}$", "$a^1$", "$2a^7$"], "Like grunntall: legg sammen eksponentene. $3 + 4 = 7$.",
  "Write $a^3 \\cdot a^4$ as one power.", ["$a^7$", "$a^{12}$", "$a^1$", "$2a^7$"], "Same base: add the exponents. $3 + 4 = 7$."],
 ["Hva er $10^{-2}$?", ["0,01", "-100", "-20", "0,1"], "$10^{-2} = \\frac{1}{100} = 0{,}01$.",
  "What is $10^{-2}$?", ["0.01", "-100", "-20", "0.1"], "$10^{-2} = \\frac{1}{100} = 0.01$."],
 ["Skriv 3 200 000 på standardform.", ["$3{,}2 \\cdot 10^6$", "$32 \\cdot 10^5$", "$3{,}2 \\cdot 10^5$", "$0{,}32 \\cdot 10^7$"], "Kommaet flyttes 6 plasser: $3{,}2 \\cdot 10^6$.",
  "Write 3 200 000 in standard form.", ["$3.2 \\cdot 10^6$", "$32 \\cdot 10^5$", "$3.2 \\cdot 10^5$", "$0.32 \\cdot 10^7$"], "The point moves 6 places: $3.2 \\cdot 10^6$."],
 ["Mellom hvilke hele tall ligger $\\sqrt{50}$?", ["7 og 8", "6 og 7", "8 og 9", "24 og 26"], "$7^2 = 49$ og $8^2 = 64$, så $\\sqrt{50}$ er litt over 7.",
  "Between which whole numbers is $\\sqrt{50}$?", ["7 and 8", "6 and 7", "8 and 9", "24 and 26"], "$7^2 = 49$ and $8^2 = 64$, so $\\sqrt{50}$ is a little over 7."],
 ["Hva er $(-3)^2$?", ["9", "-9", "6", "-6"], "$(-3) \\cdot (-3) = 9$.",
  "What is $(-3)^2$?", ["9", "-9", "6", "-6"], "$(-3) \\cdot (-3) = 9$."]],
 () => { const b = R.p([2, 3, 4, 5, 10]), e = b === 2 ? R.i(2, 10) : b === 10 ? R.i(2, 6) : R.i(2, 4), v = b ** e;
   return FIGQ({ f: "lf_pow", p: { b, n: e } }, [T(`Regn ut $${b}^{${e}}$.`, `Calculate $${b}^{${e}}$.`), N(v), T(`$${b}^{${e}}$ er ${b} ganget med seg selv ${e} ganger: ${v}.`, `$${b}^{${e}}$ is ${b} multiplied by itself ${e} times: ${v}.`)]); },
 () => { const r = R.i(2, 20), s = r * r;
   return FIGQ(r <= 12 ? { f: "lf_sqrt", p: { s: r }, only: "after" } : null, [T(`Hva er $\\sqrt{${s}}$?`, `What is $\\sqrt{${s}}$?`), N(r), T(`$${r}^2 = ${s}$, så $\\sqrt{${s}} = ${r}$.`, `$${r}^2 = ${s}$, so $\\sqrt{${s}} = ${r}$.`)]); },
 () => { const m = R.i(2, 9), n = R.i(2, 9), b = R.p(["a", "x", "2", "3"]), s = m + n;
   return [T(`Skriv $${b}^{${m}} \\cdot ${b}^{${n}}$ som én potens. Hva blir eksponenten?`, `Write $${b}^{${m}} \\cdot ${b}^{${n}}$ as one power. What is the exponent?`), N(s), T(`Like grunntall: $${m} + ${n} = ${s}$, så $${b}^{${s}}$.`, `Same base: $${m} + ${n} = ${s}$, so $${b}^{${s}}$.`)]; },
 () => { const a = R.f(1, 9.9, 0.1), n = R.i(3, 7), v = Math.round(a * 10 ** n);
   return [T(`Skriv $${mf(a)} \\cdot 10^{${n}}$ som et vanlig tall.`, `Write $${mf(a)} \\cdot 10^{${n}}$ as an ordinary number.`), N(v), T(`Flytt kommaet ${n} plasser til høyre: ${v}.`, `Move the point ${n} places to the right: ${v}.`)]; }
);

U("Algebra og likninger", "Algebra and equations",
`## Hva handler det om?
Algebra er regning med bokstaver. Med likninger kan du finne ukjente tall i alt fra oppskrifter til mobilabonnement.

## Det viktigste
- **Like ledd** kan slås sammen: $3x + 2x = 5x$, men $3x + 2$ kan ikke forenkles.
- **Gange inn i parentes**: $3(x + 4) = 3x + 12$.
- **Sette utenfor parentes**: $6x + 9 = 3(2x + 3)$.
- **Løse likninger**: samle $x$-ene på én side og tallene på den andre. Gjør det samme på begge sider.
- **Sjekk** alltid ved å sette løsningen inn i likningen.

### Eksempel
$5x - 3 = 2x + 9$. Trekk fra $2x$: $3x - 3 = 9$. Legg til 3: $3x = 12$. Del på 3: $x = 4$.

> Flytter du et ledd over likhetstegnet, skifter det fortegn.`,
`## What is it about?
Algebra is calculating with letters. With equations you can find unknown numbers in everything from recipes to phone plans.

## Key points
- **Like terms** can be combined: $3x + 2x = 5x$, but $3x + 2$ cannot be simplified.
- **Expanding brackets**: $3(x + 4) = 3x + 12$.
- **Factorising**: $6x + 9 = 3(2x + 3)$.
- **Solving equations**: collect the $x$ terms on one side and the numbers on the other. Do the same on both sides.
- Always **check** by putting the solution into the equation.

### Example
$5x - 3 = 2x + 9$. Subtract $2x$: $3x - 3 = 9$. Add 3: $3x = 12$. Divide by 3: $x = 4$.

> When you move a term across the equals sign, it changes sign.`,
[["Forenkle $4x + 3 - x + 5$.", ["$3x + 8$", "$5x + 8$", "$11x$", "$3x + 2$"], "$4x - x = 3x$ og $3 + 5 = 8$.",
  "Simplify $4x + 3 - x + 5$.", ["$3x + 8$", "$5x + 8$", "$11x$", "$3x + 2$"], "$4x - x = 3x$ and $3 + 5 = 8$."],
 ["Gang ut $2(x - 5)$.", ["$2x - 10$", "$2x - 5$", "$x - 10$", "$2x + 10$"], "Begge leddene ganges med 2.",
  "Expand $2(x - 5)$.", ["$2x - 10$", "$2x - 5$", "$x - 10$", "$2x + 10$"], "Both terms are multiplied by 2."],
 ["Sett utenfor parentes: $4x + 12$.", ["$4(x + 3)$", "$4(x + 12)$", "$2(x + 6)$", "$x(4 + 12)$"], "Største felles faktor er 4: $4(x + 3)$.",
  "Factorise $4x + 12$.", ["$4(x + 3)$", "$4(x + 12)$", "$2(x + 6)$", "$x(4 + 12)$"], "The greatest common factor is 4: $4(x + 3)$."],
 ["Løs $3x = x + 8$.", ["$x = 4$", "$x = 2$", "$x = 8$", "$x = 11$"], "Trekk fra $x$: $2x = 8$, så $x = 4$.",
  "Solve $3x = x + 8$.", ["$x = 4$", "$x = 2$", "$x = 8$", "$x = 11$"], "Subtract $x$: $2x = 8$, so $x = 4$."],
 ["Et abonnement koster 99 kr i måneden pluss 2 kr per minutt. Hvilket uttrykk gir prisen for $x$ minutter?", ["$99 + 2x$", "$99x + 2$", "$101x$", "$2(99 + x)$"], "Fast beløp pluss 2 kr for hvert minutt.",
  "A plan costs 99 kr a month plus 2 kr per minute. Which expression gives the price for $x$ minutes?", ["$99 + 2x$", "$99x + 2$", "$101x$", "$2(99 + x)$"], "A fixed amount plus 2 kr for each minute."],
 ["Hva betyr det at $x = 3$ er løsningen av en likning?", ["Begge sider blir like når du setter inn 3", "Svaret er alltid 3", "$x$ er størst når den er 3", "Likningen har tre løsninger"], "Løsningen er verdien som gjør venstre og høyre side like.",
  "What does it mean that $x = 3$ is the solution of an equation?", ["Both sides are equal when you put in 3", "The answer is always 3", "$x$ is largest when it is 3", "The equation has three solutions"], "The solution is the value that makes the left and right sides equal."]],
 () => { const x = R.i(-10, 12), a = R.i(2, 9), b = R.i(-20, 20), c = a * x + b;
   return [T(`Løs likningen $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}$.`, `Solve the equation $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}$.`), N(x),
     T(`$${a}x = ${c} ${b < 0 ? "+" : "-"} ${Math.abs(b)} = ${c - b}$, så $x = \\frac{${c - b}}{${a}} = ${x}$.`, `$${a}x = ${c} ${b < 0 ? "+" : "-"} ${Math.abs(b)} = ${c - b}$, so $x = \\frac{${c - b}}{${a}} = ${x}$.`)]; },
 () => { const x = R.i(-8, 10), a = R.i(3, 9), c = R.i(1, a - 1), b = R.i(-10, 10), d = (a - c) * x + b;
   return [T(`Løs $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c === 1 ? "" : c}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}$.`, `Solve $${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c === 1 ? "" : c}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}$.`), N(x),
     T(`Samle $x$-ene: $${a - c}x = ${d - b}$, så $x = ${x}$.`, `Collect the $x$ terms: $${a - c}x = ${d - b}$, so $x = ${x}$.`)]; },
 () => { const x = R.i(-6, 10), a = R.i(2, 6), b = R.i(1, 9), c = a * (x + b);
   return [T(`Løs $${a}(x + ${b}) = ${c}$.`, `Solve $${a}(x + ${b}) = ${c}$.`), N(x), T(`Del på ${a}: $x + ${b} = ${c / a}$, så $x = ${x}$.`, `Divide by ${a}: $x + ${b} = ${c / a}$, so $x = ${x}$.`)]; },
 () => { const a = R.i(2, 9), b = R.i(2, 9), x = R.i(2, 6), v = a * x + b;
   return FIGQ({ f: "lf_machine", p: { x, a, b } }, [T(`Hva er verdien av $${a}x + ${b}$ når $x = ${x}$?`, `What is the value of $${a}x + ${b}$ when $x = ${x}$?`), N(v), T(`$${a} \\cdot ${x} + ${b} = ${v}$.`, `$${a} \\cdot ${x} + ${b} = ${v}$.`)]); }
);

U("Lineære funksjoner", "Linear functions",
`## Hva handler det om?
En **funksjon** kobler hver $x$ til nøyaktig én $y$. En **lineær funksjon** gir en rett linje.

## Det viktigste
- $f(x) = ax + b$. **Stigningstallet** $a$ sier hvor mye $y$ øker når $x$ øker med 1. **Konstantleddet** $b$ er der linja krysser $y$-aksen.
- Stigningstall fra to punkter: $a = \\frac{y_2 - y_1}{x_2 - x_1}$.
- $a > 0$: linja stiger. $a < 0$: linja synker.
- **Proporsjonale** størrelser: $y = ax$ (linja går gjennom origo). Dobbelt så mye $x$ gir dobbelt så mye $y$.
- Lag en **verditabell** og tegn punktene for å se grafen.

### Eksempel
Taxi: 50 kr i startpris og 15 kr per km. $f(x) = 15x + 50$. 8 km koster $15 \\cdot 8 + 50 = 170$ kr.

> Stigningstallet er «hvor mye per enhet» – kr per km, liter per minutt.`,
`## What is it about?
A **function** links each $x$ to exactly one $y$. A **linear function** gives a straight line.

## Key points
- $f(x) = ax + b$. The **slope** $a$ says how much $y$ increases when $x$ increases by 1. The **constant term** $b$ is where the line crosses the $y$-axis.
- Slope from two points: $a = \\frac{y_2 - y_1}{x_2 - x_1}$.
- $a > 0$: the line rises. $a < 0$: the line falls.
- **Proportional** quantities: $y = ax$ (the line goes through the origin). Twice as much $x$ gives twice as much $y$.
- Make a **table of values** and plot the points to see the graph.

### Example
Taxi: 50 kr starting fee and 15 kr per km. $f(x) = 15x + 50$. 8 km costs $15 \\cdot 8 + 50 = 170$ kr.

> The slope is "how much per unit" – kr per km, litres per minute.`,
[["Hva er stigningstallet til $f(x) = -2x + 7$?", ["$-2$", "7", "2", "$-7$"], "Tallet foran $x$ er stigningstallet.",
  "What is the slope of $f(x) = -2x + 7$?", ["$-2$", "7", "2", "$-7$"], "The number in front of $x$ is the slope."],
 ["Hvor krysser $y = 3x + 4$ $y$-aksen?", ["I $(0, 4)$", "I $(4, 0)$", "I $(0, 3)$", "I $(3, 4)$"], "På $y$-aksen er $x = 0$, så $y = 4$.",
  "Where does $y = 3x + 4$ cross the $y$-axis?", ["At $(0, 4)$", "At $(4, 0)$", "At $(0, 3)$", "At $(3, 4)$"], "On the $y$-axis $x = 0$, so $y = 4$."],
 ["Hvilken funksjon viser proporsjonale størrelser?", ["$y = 5x$", "$y = 5x + 2$", "$y = x^2$", "$y = 5$"], "Proporsjonal: $y = ax$, linja går gjennom origo.",
  "Which function shows proportional quantities?", ["$y = 5x$", "$y = 5x + 2$", "$y = x^2$", "$y = 5$"], "Proportional: $y = ax$, the line goes through the origin."],
 ["Linja går gjennom $(1, 3)$ og $(3, 7)$. Hva er stigningstallet?", ["2", "4", "$\\frac{1}{2}$", "3"], "$\\frac{7 - 3}{3 - 1} = \\frac{4}{2} = 2$.",
  "The line goes through $(1, 3)$ and $(3, 7)$. What is the slope?", ["2", "4", "$\\frac{1}{2}$", "3"], "$\\frac{7 - 3}{3 - 1} = \\frac{4}{2} = 2$."],
 ["En linje synker mot høyre. Hva vet du om stigningstallet?", ["Det er negativt", "Det er positivt", "Det er 0", "Det er større enn 1"], "Synkende linje betyr negativt stigningstall.",
  "A line falls to the right. What do you know about the slope?", ["It is negative", "It is positive", "It is 0", "It is greater than 1"], "A falling line means a negative slope."],
 ["Hva betyr $b$ i $f(x) = ax + b$ i en praktisk situasjon?", ["Startverdien når $x = 0$", "Prisen per enhet", "Hvor mange enheter du kjøper", "Det største svaret"], "Konstantleddet er verdien før noe har skjedd – for eksempel startprisen.",
  "What does $b$ in $f(x) = ax + b$ mean in a practical situation?", ["The starting value when $x = 0$", "The price per unit", "How many units you buy", "The largest answer"], "The constant term is the value before anything has happened – for example the starting fee."]],
 () => { const a = R.i(-5, 6) || 2, b = R.i(-10, 10), x = R.i(-5, 8), v = a * x + b;
   return FIGQ({ f: "lf_machine", p: { x, a, b } }, [T(`$f(x) = ${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$. Hva er $f(${x})$?`, `$f(x) = ${a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)}$. What is $f(${x})$?`), N(v), T(`$${a} \\cdot ${neg(x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${v}$.`, `$${a} \\cdot ${neg(x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${v}$.`)]); },
 () => { const a = R.i(-4, 5) || 3, x1 = R.i(-4, 3), x2 = x1 + R.i(1, 4), b = R.i(-5, 5), y1 = a * x1 + b, y2 = a * x2 + b;
   return [T(`En linje går gjennom $(${x1}, ${y1})$ og $(${x2}, ${y2})$. Hva er stigningstallet?`, `A line goes through $(${x1}, ${y1})$ and $(${x2}, ${y2})$. What is the slope?`), N(a), T(`$a = \\frac{${y2} - ${neg(y1)}}{${x2} - ${neg(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${a}$.`, `$a = \\frac{${y2} - ${neg(y1)}}{${x2} - ${neg(x1)}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${a}$.`)]; },
 () => { const start = 10 * R.i(3, 9), per = R.i(8, 20), km = R.i(2, 25), v = start + per * km;
   return [T(`En taxi koster ${start} kr i startpris og ${per} kr per km. Hva koster en tur på ${km} km?`, `A taxi costs ${start} kr to start and ${per} kr per km. What does a ${km} km trip cost?`), N(v, 0, "kr"), T(`$f(x) = ${per}x + ${start}$. $f(${km}) = ${per} \\cdot ${km} + ${start} = ${v}$ kr.`, `$f(x) = ${per}x + ${start}$. $f(${km}) = ${per} \\cdot ${km} + ${start} = ${v}$ kr.`)]; }
);

U("Geometri", "Geometry",
`## Hva handler det om?
Geometri handler om former, vinkler, areal og volum – fra å tegne et hus til å beregne hvor mye maling som trengs.

## Det viktigste
- Vinkelsummen i en **trekant** er 180°. I en firkant er den 360°.
- **Pytagoras**: i en rettvinklet trekant er $a^2 + b^2 = c^2$, der $c$ er hypotenusen (den lengste siden).
- **Sirkel**: omkrets $O = 2\\pi r$, areal $A = \\pi r^2$. $\\pi \\approx 3{,}14$.
- **Volum** av et prisme: grunnflate · høyde. Sylinder: $V = \\pi r^2 h$.
- **Formlike** figurer har like vinkler, og sidene står i samme forhold.

### Eksempel
Katetene er 6 cm og 8 cm. $c^2 = 36 + 64 = 100$, så $c = 10$ cm.

> Pytagoras gjelder bare i trekanter med en rett vinkel (90°).`,
`## What is it about?
Geometry is about shapes, angles, area and volume – from drawing a house to working out how much paint you need.

## Key points
- The angles in a **triangle** add up to 180°. In a quadrilateral they add up to 360°.
- **Pythagoras**: in a right-angled triangle $a^2 + b^2 = c^2$, where $c$ is the hypotenuse (the longest side).
- **Circle**: circumference $C = 2\\pi r$, area $A = \\pi r^2$. $\\pi \\approx 3.14$.
- **Volume** of a prism: base area · height. Cylinder: $V = \\pi r^2 h$.
- **Similar** shapes have equal angles, and their sides are in the same ratio.

### Example
The legs are 6 cm and 8 cm. $c^2 = 36 + 64 = 100$, so $c = 10$ cm.

> Pythagoras only applies in triangles with a right angle (90°).`,
[["To vinkler i en trekant er 50° og 60°. Hvor stor er den tredje?", ["70°", "90°", "110°", "180°"], "$180° - 50° - 60° = 70°$.",
  "Two angles in a triangle are 50° and 60°. How big is the third?", ["70°", "90°", "110°", "180°"], "$180° - 50° - 60° = 70°$."],
 ["Hvilken side er hypotenusen?", ["Den lengste, motsatt den rette vinkelen", "Den korteste", "Den som står loddrett", "Grunnlinja"], "Hypotenusen ligger motsatt den rette vinkelen og er alltid lengst.",
  "Which side is the hypotenuse?", ["The longest, opposite the right angle", "The shortest", "The vertical one", "The base"], "The hypotenuse lies opposite the right angle and is always the longest."],
 ["Hva er arealet av en sirkel med radius 10 cm?", ["$100\\pi$ cm²", "$20\\pi$ cm²", "$10\\pi$ cm²", "$100$ cm²"], "$A = \\pi r^2 = \\pi \\cdot 100$.",
  "What is the area of a circle with radius 10 cm?", ["$100\\pi$ cm²", "$20\\pi$ cm²", "$10\\pi$ cm²", "$100$ cm²"], "$A = \\pi r^2 = \\pi \\cdot 100$."],
 ["Hvor mange liter er 1 dm³?", ["1", "10", "100", "1000"], "1 dm³ = 1 liter.",
  "How many litres is 1 dm³?", ["1", "10", "100", "1000"], "1 dm³ = 1 litre."],
 ["To trekanter er formlike. Sidene i den store er dobbelt så lange. Hva skjer med arealet?", ["Det blir 4 ganger så stort", "Det dobles", "Det blir likt", "Det blir 8 ganger så stort"], "Både lengde og høyde dobles: $2 \\cdot 2 = 4$.",
  "Two triangles are similar. The sides of the big one are twice as long. What happens to the area?", ["It becomes 4 times as big", "It doubles", "It stays the same", "It becomes 8 times as big"], "Both length and height double: $2 \\cdot 2 = 4$."],
 ["Er en trekant med sidene 5, 12 og 13 rettvinklet?", ["Ja", "Nei", "Bare hvis den er likesidet", "Det kan man ikke vite"], "$25 + 144 = 169 = 13^2$ ✓.",
  "Is a triangle with sides 5, 12 and 13 right-angled?", ["Yes", "No", "Only if it is equilateral", "You cannot know"], "$25 + 144 = 169 = 13^2$ ✓."]],
 () => { const [p, q, r] = R.p([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]]);
   return FIGQ({ f: "lf_pyth", p: { a: p, b: q }, only: "after" }, [T(`En rettvinklet trekant har kateter på ${p} cm og ${q} cm. Hvor lang er hypotenusen?`, `A right-angled triangle has legs of ${p} cm and ${q} cm. How long is the hypotenuse?`), N(r, 0.01, "cm"), T(`$c^2 = ${p}^2 + ${q}^2 = ${p * p + q * q}$, så $c = \\sqrt{${p * p + q * q}} = ${r}$ cm.`, `$c^2 = ${p}^2 + ${q}^2 = ${p * p + q * q}$, so $c = \\sqrt{${p * p + q * q}} = ${r}$ cm.`)]); },
 () => { const a = R.i(20, 100), b = R.i(10, 150 - a), c = 180 - a - b;
   return [T(`To av vinklene i en trekant er ${a}° og ${b}°. Hvor stor er den tredje vinkelen?`, `Two of the angles in a triangle are ${a}° and ${b}°. How big is the third angle?`), N(c, 0, "°"), T(`$180° - ${a}° - ${b}° = ${c}°$.`, `$180° - ${a}° - ${b}° = ${c}°$.`)]; },
 () => { const r = R.i(2, 15), A = Math.PI * r * r;
   return [T(`Hva er arealet av en sirkel med radius ${r} cm? Rund av til én desimal.`, `What is the area of a circle with radius ${r} cm? Round to one decimal place.`), N(+A.toFixed(1), 0.15, "cm²"), T(`$A = \\pi r^2 = \\pi \\cdot ${r * r} \\approx ${mf(+A.toFixed(1))}$ cm².`, `$A = \\pi r^2 = \\pi \\cdot ${r * r} \\approx ${mf(+A.toFixed(1))}$ cm².`)]; },
 () => { const l = R.i(2, 12), b = R.i(2, 10), h = R.i(2, 10), V = l * b * h;
   return [T(`Ei eske er ${l} cm lang, ${b} cm bred og ${h} cm høy. Hva er volumet?`, `A box is ${l} cm long, ${b} cm wide and ${h} cm high. What is its volume?`), N(V, 0, "cm³"), T(`$V = ${l} \\cdot ${b} \\cdot ${h} = ${V}$ cm³.`, `$V = ${l} \\cdot ${b} \\cdot ${h} = ${V}$ cm³.`)]; }
);

U("Sannsynlighet og statistikk", "Probability and statistics",
`## Hva handler det om?
**Sannsynlighet** sier hvor trolig noe er, fra 0 (umulig) til 1 (sikkert). **Statistikk** beskriver data med noen få tall.

## Det viktigste
- $P(A) = \\frac{\\text{antall gunstige utfall}}{\\text{antall mulige utfall}}$ når alle utfall er like sannsynlige.
- En terning: $P(\\text{seks}) = \\frac{1}{6}$.
- $P(\\text{ikke } A) = 1 - P(A)$.
- To uavhengige hendelser: $P(A \\text{ og } B) = P(A) \\cdot P(B)$.
- **Gjennomsnitt**, **median**, **typetall** og **variasjonsbredde** beskriver et datasett.

### Eksempel
Sannsynligheten for to seksere på rad: $\\frac{1}{6} \\cdot \\frac{1}{6} = \\frac{1}{36}$.

> Terningen husker ikke: etter fem enere er sjansen for en ener fortsatt $\\frac{1}{6}$.`,
`## What is it about?
**Probability** says how likely something is, from 0 (impossible) to 1 (certain). **Statistics** describes data with a few numbers.

## Key points
- $P(A) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}}$ when all outcomes are equally likely.
- A die: $P(\\text{six}) = \\frac{1}{6}$.
- $P(\\text{not } A) = 1 - P(A)$.
- Two independent events: $P(A \\text{ and } B) = P(A) \\cdot P(B)$.
- **Mean**, **median**, **mode** and **range** describe a data set.

### Example
The probability of two sixes in a row: $\\frac{1}{6} \\cdot \\frac{1}{6} = \\frac{1}{36}$.

> The die has no memory: after five ones the chance of a one is still $\\frac{1}{6}$.`,
[["Hva er sannsynligheten for å få et partall med én terning?", ["$\\frac{1}{2}$", "$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], "Partall: 2, 4, 6 – tre av seks utfall.",
  "What is the probability of rolling an even number with one die?", ["$\\frac{1}{2}$", "$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], "Even: 2, 4, 6 – three out of six outcomes."],
 ["Sannsynligheten for regn er 0,3. Hva er sannsynligheten for oppholdsvær?", ["0,7", "0,3", "1,3", "0"], "$1 - 0{,}3 = 0{,}7$.",
  "The probability of rain is 0.3. What is the probability of no rain?", ["0.7", "0.3", "1.3", "0"], "$1 - 0.3 = 0.7$."],
 ["Hvilken sannsynlighet er umulig?", ["1,2", "0", "0,5", "1"], "Sannsynligheter ligger alltid mellom 0 og 1.",
  "Which probability is impossible?", ["1.2", "0", "0.5", "1"], "Probabilities are always between 0 and 1."],
 ["Du har fått fem kron på rad med en mynt. Hva er sjansen for kron neste gang?", ["$\\frac{1}{2}$", "Mindre enn $\\frac{1}{2}$", "Større enn $\\frac{1}{2}$", "0"], "Mynten husker ikke – hvert kast er uavhengig.",
  "You got heads five times in a row. What is the chance of heads next time?", ["$\\frac{1}{2}$", "Less than $\\frac{1}{2}$", "More than $\\frac{1}{2}$", "0"], "The coin has no memory – each toss is independent."],
 ["Lønningene i en bedrift er 30, 32, 35, 36 og 200 (tusen kr). Hvilket mål gir best bilde av en typisk lønn?", ["Medianen", "Gjennomsnittet", "Variasjonsbredden", "Summen"], "Den ene store lønna drar gjennomsnittet opp. Medianen (35) er mer typisk.",
  "The salaries in a company are 30, 32, 35, 36 and 200 (thousand kr). Which measure best shows a typical salary?", ["The median", "The mean", "The range", "The sum"], "The one big salary pulls the mean up. The median (35) is more typical."],
 ["Hva er sannsynligheten for to kron på rad?", ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "1"], "$\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.",
  "What is the probability of two heads in a row?", ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "1"], "$\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$."]],
 () => { const r = R.i(1, 9), b = R.i(1, 9), g = R.i(0, 6), tot = r + b + g, p = r / tot;
   return [T(`En pose har ${r} røde, ${b} blå${g ? ` og ${g} grønne` : ""} kuler. Du trekker én. Hva er sannsynligheten for rød? Svar med desimaltall.`, `A bag has ${r} red, ${b} blue${g ? ` and ${g} green` : ""} marbles. You draw one. What is the probability of red? Answer as a decimal.`), N(+p.toFixed(3), 0.005),
     T(`$P(\\text{rød}) = \\frac{${r}}{${tot}} \\approx ${mf(+p.toFixed(3))}$.`, `$P(\\text{red}) = \\frac{${r}}{${tot}} \\approx ${mf(+p.toFixed(3))}$.`)]; },
 () => { const k = R.i(1, 5), p = k / 6;
   return FIGQ({ f: "lf_die", p: { sel: [6, 5, 4, 3, 2].slice(0, k) } }, [T(`Hva er sannsynligheten for å få ${k === 1 ? "en sekser" : `mer enn ${6 - k}`} med én terning? Svar med desimaltall.`, `What is the probability of rolling ${k === 1 ? "a six" : `more than ${6 - k}`} with one die? Answer as a decimal.`), N(+p.toFixed(3), 0.005),
     T(`${k} gunstige av 6 mulige: $\\frac{${k}}{6} \\approx ${mf(+p.toFixed(3))}$.`, `${k} favourable out of 6 possible: $\\frac{${k}}{6} \\approx ${mf(+p.toFixed(3))}$.`)]); },
 () => { const xs = Array.from({ length: R.p([5, 7]) }, () => R.i(1, 20)), s = [...xs].sort((a, b) => a - b), med = s[(s.length - 1) / 2];
   return [T(`Hva er medianen av ${xs.join(", ")}?`, `What is the median of ${xs.join(", ")}?`), N(med), T(`Sortert: ${s.join(", ")}. Tallet i midten er ${med}.`, `Sorted: ${s.join(", ")}. The middle number is ${med}.`)]; }
);

U("Privatøkonomi", "Personal finance",
`## Hva handler det om?
Å ha kontroll på egne penger: lønn, skatt, budsjett, sparing og lån.

## Det viktigste
- Et **budsjett** setter opp inntekter og utgifter. Overskudd = inntekter $-$ utgifter.
- **Bruttolønn** er lønna før skatt, **nettolønn** er det du får utbetalt etter skatt.
- **Rente på sparing**: pengene vokser med vekstfaktoren hvert år. $10\\,000 \\cdot 1{,}04^3$ etter tre år med 4 % rente.
- **Rentes rente**: du får rente også av renta fra året før.
- **Lån** koster renter. Lang nedbetalingstid gir lavere avdrag, men mer renter totalt.

### Eksempel
Du tjener 4000 kr og bruker 3200 kr i måneden. Overskudd: 800 kr. På ett år sparer du $12 \\cdot 800 = 9600$ kr.

> Forbrukslån har ofte svært høy rente. Spar heller først.`,
`## What is it about?
Being in control of your own money: pay, tax, budgets, saving and loans.

## Key points
- A **budget** lists income and expenses. Surplus = income $-$ expenses.
- **Gross pay** is pay before tax, **net pay** is what you are paid after tax.
- **Interest on savings**: the money grows by the growth factor every year. $10\\,000 \\cdot 1.04^3$ after three years at 4 % interest.
- **Compound interest**: you also earn interest on the interest from the year before.
- **Loans** cost interest. A longer repayment time gives lower instalments, but more interest in total.

### Example
You earn 4000 kr and spend 3200 kr a month. Surplus: 800 kr. In a year you save $12 \\cdot 800 = 9600$ kr.

> Consumer loans often have very high interest. Save first instead.`,
[["Hva er nettolønn?", ["Lønna etter skatt", "Lønna før skatt", "Skatten du betaler", "Feriepengene"], "Netto = det som faktisk kommer inn på kontoen.",
  "What is net pay?", ["Pay after tax", "Pay before tax", "The tax you pay", "Holiday pay"], "Net = what actually reaches your account."],
 ["Hva betyr rentes rente?", ["Du får rente også av tidligere renter", "Renta dobles hvert år", "Banken tar dobbel rente", "Renta er null"], "Renta legges til beløpet, og neste år får du rente av det nye beløpet.",
  "What does compound interest mean?", ["You earn interest on earlier interest too", "The interest doubles every year", "The bank charges double interest", "The interest is zero"], "The interest is added to the amount, and next year you earn interest on the new amount."],
 ["Inntekter 5000 kr, utgifter 5600 kr. Hva har du?", ["Et underskudd på 600 kr", "Et overskudd på 600 kr", "Et overskudd på 10 600 kr", "Ingenting"], "$5000 - 5600 = -600$: du bruker mer enn du tjener.",
  "Income 5000 kr, expenses 5600 kr. What do you have?", ["A deficit of 600 kr", "A surplus of 600 kr", "A surplus of 10 600 kr", "Nothing"], "$5000 - 5600 = -600$: you spend more than you earn."],
 ["Hva skjer med de totale rentekostnadene hvis du betaler ned et lån over lengre tid?", ["De blir større", "De blir mindre", "De blir like", "De forsvinner"], "Du skylder penger lenger, så du betaler renter i flere år.",
  "What happens to the total interest cost if you repay a loan over a longer time?", ["It gets bigger", "It gets smaller", "It stays the same", "It disappears"], "You owe money for longer, so you pay interest for more years."],
 ["Hvilken vekstfaktor brukes for 3 % rente?", ["1,03", "0,03", "1,3", "3"], "$1 + \\frac{3}{100} = 1{,}03$.",
  "Which growth factor is used for 3 % interest?", ["1.03", "0.03", "1.3", "3"], "$1 + \\frac{3}{100} = 1.03$."],
 ["Hvorfor er et budsjett lurt?", ["Du ser om pengene strekker til før du bruker dem", "Det gir høyere lønn", "Det fjerner skatten", "Banken krever det alltid"], "Med budsjett planlegger du i stedet for å bli overrasket.",
  "Why is a budget a good idea?", ["You see whether the money will last before you spend it", "It gives higher pay", "It removes tax", "The bank always requires it"], "With a budget you plan instead of being surprised."]],
 () => { const inn = 100 * R.i(30, 80), ut = 100 * R.i(15, Math.floor(inn / 100) - 2), m = R.p([3, 6, 12]), v = (inn - ut) * m;
   return [T(`Du har ${inn} kr i inntekt og ${ut} kr i utgifter hver måned. Hvor mye sparer du på ${m} måneder?`, `You have ${inn} kr income and ${ut} kr expenses each month. How much do you save in ${m} months?`), N(v, 0, "kr"), T(`Overskudd per måned: $${inn} - ${ut} = ${inn - ut}$ kr. $${m} \\cdot ${inn - ut} = ${v}$ kr.`, `Surplus per month: $${inn} - ${ut} = ${inn - ut}$ kr. $${m} \\cdot ${inn - ut} = ${v}$ kr.`)]; },
 () => { const brutto = 1000 * R.i(20, 60), sk = R.p([20, 22, 25, 30]), netto = brutto * (1 - sk / 100);
   return [T(`Bruttolønna er ${brutto} kr, og du betaler ${sk} % skatt. Hva er nettolønna?`, `Gross pay is ${brutto} kr, and you pay ${sk} % tax. What is the net pay?`), N(netto, 0.5, "kr"), T(`$${brutto} \\cdot ${mf(1 - sk / 100)} = ${mf(netto)}$ kr.`, `$${brutto} \\cdot ${mf(1 - sk / 100)} = ${mf(netto)}$ kr.`)]; },
 () => { const k = 1000 * R.i(2, 50), p = R.p([2, 3, 4, 5]), v = k * p / 100;
   return [T(`Du har ${k} kr på en konto med ${p} % rente. Hvor mye får du i rente det første året?`, `You have ${k} kr in an account with ${p} % interest. How much interest do you get in the first year?`), N(v, 0.5, "kr"), T(`$${k} \\cdot ${mf(p / 100)} = ${mf(v)}$ kr.`, `$${k} \\cdot ${mf(p / 100)} = ${mf(v)}$ kr.`)]; }
);
})();
