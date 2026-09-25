// ============================================================
//  GMAT – Grunnleggende matematikk, enhet 4–6:
//  4 Eksponential- og logaritmefunksjoner, 5 Trigonometri og geometri, 6 Vektorer
//  Teori + faste oppgaver (BIQ) + generatorer (GEN). Alt inne i en IIFE for å unngå navnekollisjoner.
// ============================================================
(() => {
// ---------- hjelpere ----------
const pa = x => x < 0 ? `(${x})` : `${x}`;                 // heltall i parentes hvis negativt
const pam = x => x < 0 ? `(${mf(x)})` : mf(x);              // desimaltall i parentes hvis negativt
const vs = v => `(${v.join(", ")})`;                         // vektor med heltallskomponenter
const nz = (a, b) => { let x; do { x = R.i(a, b); } while (x === 0); return x; };

// ================= Enhet 4: Eksponential- og logaritmefunksjoner =================
THEORY("GMAT", 4, {
nb: `## Hva handler det om?

Mange størrelser i teknikk og natur endrer seg med **samme faktor** i hvert tidssteg, ikke med samme mengde. Et bankinnskudd med 4 % rente blir ganget med 1,04 hvert år. En radioaktiv kilde mister samme andel hvert år. En kondensator som lades ut, en kopp kaffe som kjøles ned og en bakteriekultur som vokser, følger samme mønster. Dette kalles **eksponentiell** vekst eller nedgang.

Sammenlign med lineær vekst: der legger vi til det samme hver gang ($+3$, $+3$, $+3$ …). Ved eksponentiell vekst ganger vi med det samme ($\\cdot 2$, $\\cdot 2$, $\\cdot 2$ …). Eksponentiell vekst virker langsom i starten, men blir etter hvert enormt rask.

**Logaritmen** er det motsatte av en potens. Den svarer på spørsmålet «hvilken eksponent trenger jeg?». Du trenger den når den ukjente står i eksponenten, for eksempel når du skal finne hvor lang tid noe tar.

## Begreper og formler

- Eksponentialfunksjon: $f(x) = a\\cdot b^x$, der $a = f(0)$ er startverdien og $b > 0$ er vekstfaktoren.
- $b > 1$ gir vekst, og $0 < b < 1$ gir nedgang.
- Prosentvis endring: økning med $p$ % gir $b = 1 + \\frac{p}{100}$, nedgang med $p$ % gir $b = 1 - \\frac{p}{100}$. Eksempel: $+5$ % gir $1{,}05$, og $-20$ % gir $0{,}80$.
- Tallet $e \\approx 2{,}718$ er det «naturlige» grunntallet. I fysikk og kalkulus skriver vi nesten alltid $N(t) = N_0e^{kt}$, der $k > 0$ betyr vekst og $k < 0$ betyr nedgang. Alle grunntall kan skrives om: $b^t = e^{t\\ln b}$.
- Logaritmer: $\\lg x = y$ betyr $10^y = x$, og $\\ln x = y$ betyr $e^y = x$. Generelt betyr $\\log_b x = y$ at $b^y = x$, og $\\log_b x = \\frac{\\ln x}{\\ln b}$.
- Logaritmen er bare definert for $x > 0$. Dessuten er $\\ln 1 = 0$ og $\\ln e = 1$.
- $e^{\\ln x} = x$ og $\\ln(e^x) = x$: de to funksjonene opphever hverandre.
- Regneregler (de gjelder også for $\\lg$):

$$\\ln(ab) = \\ln a + \\ln b \\qquad \\ln\\frac{a}{b} = \\ln a - \\ln b \\qquad \\ln(a^n) = n\\ln a$$

- Halveringstid og doblingstid: $T = \\frac{\\ln 2}{|k|}$. Etter tiden $t$ er andelen $\\left(\\tfrac12\\right)^{t/T}$ igjen.

## Slik løser du oppgavene

1. Finn startverdien ($a$ eller $N_0$) og vekstfaktoren ($b$) eller vekstraten ($k$).
2. Skriv modellen, for eksempel $N(t) = N_0\\cdot b^t$.
3. Skal du finne en **verdi**: sett inn $t$ og regn ut.
4. Skal du finne en **tid** (den ukjente står i eksponenten): isoler potensen alene på den ene siden, ta $\\ln$ på begge sider, bruk $\\ln(b^t) = t\\ln b$ og del.
5. Sjekk at svaret er rimelig: nedgang skal gi mindre verdier, og en tid skal være positiv.

### Eksempel

Aktiviteten til en radioaktiv kilde avtar med 12 % per år. Hvor lang tid tar det før aktiviteten er halvert?

1. Vekstfaktoren er $b = 1 - 0{,}12 = 0{,}88$, så $A(t) = A_0\\cdot 0{,}88^t$.
2. Halvert betyr $A(t) = 0{,}5A_0$. Del på $A_0$: $0{,}88^t = 0{,}5$.
3. Ta $\\ln$ på begge sider: $t\\ln 0{,}88 = \\ln 0{,}5$.
4. $t = \\dfrac{\\ln 0{,}5}{\\ln 0{,}88} = \\dfrac{-0{,}6931}{-0{,}1278} \\approx 5{,}42$ år.

Samme modell med $e$: $k = \\ln 0{,}88 \\approx -0{,}128$, så $A(t) = A_0e^{-0{,}128t}$ og $T = \\ln 2/0{,}128 \\approx 5{,}42$ år. Begge skrivemåtene gir samme svar.

## Vanlige feil

- Å regne prosent lineært: 10 % økning to år på rad gir $1{,}1^2 = 1{,}21$, altså 21 %, ikke 20 %.
- Feil vekstfaktor ved nedgang: 20 % nedgang gir $0{,}8$, ikke $0{,}2$ eller $-0{,}2$.
- $\\ln(a + b)$ er **ikke** $\\ln a + \\ln b$. Regnereglene gjelder produkt, brøk og potens.
- $(e^x)^2 = e^{2x}$, ikke $e^{x^2}$.
- Å blande $\\lg$ (grunntall 10) og $\\ln$ (grunntall $e$) på kalkulatoren.
- Å ta logaritmen av null eller av et negativt tall. Det er ikke definert.

> Eksponentialfunksjoner ganger med samme faktor i hvert steg. Står den ukjente i eksponenten: isoler potensen, ta $\\ln$ på begge sider og bruk $\\ln(b^x) = x\\ln b$.`,
en: `## What is it about?

Many quantities in engineering and nature change by the **same factor** in each time step, not by the same amount. A bank deposit at 4% interest is multiplied by 1.04 every year. A radioactive source loses the same fraction every year. A discharging capacitor, a cooling cup of coffee and a growing bacterial culture all follow the same pattern. This is called **exponential** growth or decay.

Compare this with linear growth, where we add the same amount each time ($+3$, $+3$, $+3$, ...). In exponential growth we multiply by the same number ($\\cdot 2$, $\\cdot 2$, $\\cdot 2$, ...). Exponential growth looks slow at first, but eventually becomes enormously fast.

The **logarithm** is the reverse of a power. It answers the question "which exponent do I need?". You need it whenever the unknown sits in the exponent, for example when you want to find how long something takes.

## Concepts and formulas

- Exponential function: $f(x) = a\\cdot b^x$, where $a = f(0)$ is the starting value and $b > 0$ is the growth factor.
- $b > 1$ gives growth, and $0 < b < 1$ gives decay.
- Percentage change: an increase of $p$% gives $b = 1 + \\frac{p}{100}$, and a decrease of $p$% gives $b = 1 - \\frac{p}{100}$. Example: $+5$% gives $1.05$, and $-20$% gives $0.80$.
- The number $e \\approx 2.718$ is the "natural" base. In physics and calculus we almost always write $N(t) = N_0e^{kt}$, where $k > 0$ means growth and $k < 0$ means decay. Any base can be rewritten: $b^t = e^{t\\ln b}$.
- Logarithms: $\\lg x = y$ means $10^y = x$, and $\\ln x = y$ means $e^y = x$. In general, $\\log_b x = y$ means $b^y = x$, and $\\log_b x = \\frac{\\ln x}{\\ln b}$. (Many English texts write $\\log$ or $\\log_{10}$ for $\\lg$.)
- The logarithm is only defined for $x > 0$. Also, $\\ln 1 = 0$ and $\\ln e = 1$.
- $e^{\\ln x} = x$ and $\\ln(e^x) = x$: the two functions undo each other.
- Rules (they also hold for $\\lg$):

$$\\ln(ab) = \\ln a + \\ln b \\qquad \\ln\\frac{a}{b} = \\ln a - \\ln b \\qquad \\ln(a^n) = n\\ln a$$

- Half-life and doubling time: $T = \\frac{\\ln 2}{|k|}$. After a time $t$, the fraction $\\left(\\tfrac12\\right)^{t/T}$ is left.

## How to solve the problems

1. Find the starting value ($a$ or $N_0$) and the growth factor ($b$) or the rate ($k$).
2. Write the model, for example $N(t) = N_0\\cdot b^t$.
3. To find a **value**: insert $t$ and calculate.
4. To find a **time** (the unknown is in the exponent): isolate the power on one side, take $\\ln$ of both sides, use $\\ln(b^t) = t\\ln b$ and divide.
5. Check that the answer is reasonable: decay should give smaller values, and a time should be positive.

### Example

The activity of a radioactive source drops by 12% per year. How long does it take for the activity to be halved?

1. The growth factor is $b = 1 - 0.12 = 0.88$, so $A(t) = A_0\\cdot 0.88^t$.
2. Halved means $A(t) = 0.5A_0$. Divide by $A_0$: $0.88^t = 0.5$.
3. Take $\\ln$ of both sides: $t\\ln 0.88 = \\ln 0.5$.
4. $t = \\dfrac{\\ln 0.5}{\\ln 0.88} = \\dfrac{-0.6931}{-0.1278} \\approx 5.42$ years.

The same model with $e$: $k = \\ln 0.88 \\approx -0.128$, so $A(t) = A_0e^{-0.128t}$ and $T = \\ln 2/0.128 \\approx 5.42$ years. Both ways of writing the model give the same answer.

## Common mistakes

- Treating percentages linearly: 10% growth two years in a row gives $1.1^2 = 1.21$, which is 21%, not 20%.
- The wrong factor for a decrease: a 20% decrease gives $0.8$, not $0.2$ or $-0.2$.
- $\\ln(a + b)$ is **not** $\\ln a + \\ln b$. The rules apply to products, quotients and powers.
- $(e^x)^2 = e^{2x}$, not $e^{x^2}$.
- Mixing up $\\lg$ (base 10) and $\\ln$ (base $e$) on the calculator.
- Taking the logarithm of zero or of a negative number. It is not defined.

> Exponential functions multiply by the same factor in every step. If the unknown is in the exponent: isolate the power, take $\\ln$ of both sides and use $\\ln(b^x) = x\\ln b$.`
});

BIQ("GMAT", 4, [
  ["En størrelse øker med 5 % per år. Hva er vekstfaktoren (tallet vi ganger med hvert år)?",
   ["$1{,}05$", "$0{,}05$", "$1{,}5$", "$5$"],
   "Vi ganger med $1 + \\frac{5}{100} = 1{,}05$. Tallet $0{,}05$ er bare selve økningen, og $1{,}5$ ville betydd 50 % vekst.",
   "A quantity increases by 5% per year. What is the growth factor (the number we multiply by each year)?",
   ["$1.05$", "$0.05$", "$1.5$", "$5$"],
   "We multiply by $1 + \\frac{5}{100} = 1.05$. The number $0.05$ is only the increase itself, and $1.5$ would mean 50% growth."],
  ["En størrelse starter på 80 og halveres hvert år. Hvilken funksjon beskriver den etter $t$ år?",
   ["$f(t) = 80\\cdot 0{,}5^t$", "$f(t) = 80 - 0{,}5t$", "$f(t) = 80\\cdot 2^t$", "$f(t) = 0{,}5\\cdot 80^t$"],
   "Startverdien er 80 og vekstfaktoren er $0{,}5$ (halvering hvert år). $80 - 0{,}5t$ er lineær nedgang, og $80\\cdot 2^t$ er dobling.",
   "A quantity starts at 80 and is halved every year. Which function describes it after $t$ years?",
   ["$f(t) = 80\\cdot 0.5^t$", "$f(t) = 80 - 0.5t$", "$f(t) = 80\\cdot 2^t$", "$f(t) = 0.5\\cdot 80^t$"],
   "The starting value is 80 and the growth factor is $0.5$ (halving every year). $80 - 0.5t$ is a linear decrease, and $80\\cdot 2^t$ is doubling."],
  ["Hva er $\\lg 0{,}001$? ($\\lg$ er logaritmen med grunntall 10.)",
   { n: -3, tol: 0, u: "" },
   "$0{,}001 = \\frac{1}{1000} = 10^{-3}$, så $\\lg 0{,}001 = -3$.",
   "What is $\\lg 0.001$? ($\\lg$ is the base-10 logarithm.)",
   null,
   "$0.001 = \\frac{1}{1000} = 10^{-3}$, so $\\lg 0.001 = -3$."],
  ["Hvilken regneregel for logaritmer er riktig?",
   ["$\\ln(ab) = \\ln a + \\ln b$", "$\\ln(a + b) = \\ln a + \\ln b$", "$\\ln(ab) = \\ln a\\cdot\\ln b$", "$\\ln(a^n) = (\\ln a)^n$"],
   "Logaritmen gjør produkt om til sum: $\\ln(ab) = \\ln a + \\ln b$. Det finnes ingen enkel regel for $\\ln(a + b)$, og riktig potensregel er $\\ln(a^n) = n\\ln a$.",
   "Which logarithm rule is correct?",
   ["$\\ln(ab) = \\ln a + \\ln b$", "$\\ln(a + b) = \\ln a + \\ln b$", "$\\ln(ab) = \\ln a\\cdot\\ln b$", "$\\ln(a^n) = (\\ln a)^n$"],
   "The logarithm turns a product into a sum: $\\ln(ab) = \\ln a + \\ln b$. There is no simple rule for $\\ln(a + b)$, and the correct power rule is $\\ln(a^n) = n\\ln a$."],
  ["Hva er $\\ln(-2)$?",
   ["Ikke definert (for reelle tall)", "$-\\ln 2 \\approx -0{,}693$", "$\\ln 2 \\approx 0{,}693$", "$0$"],
   "$\\ln x = y$ betyr $e^y = x$. Siden $e^y > 0$ for alle $y$, finnes det ingen $y$ som gir $-2$. Logaritmen er bare definert for positive tall.",
   "What is $\\ln(-2)$?",
   ["Not defined (for real numbers)", "$-\\ln 2 \\approx -0.693$", "$\\ln 2 \\approx 0.693$", "$0$"],
   "$\\ln x = y$ means $e^y = x$. Since $e^y > 0$ for every $y$, no $y$ gives $-2$. The logarithm is only defined for positive numbers."],
  ["Produksjonen i en fabrikk øker med 10 % per år i to år på rad. Hvor mye har den økt totalt?",
   ["21 %", "20 %", "10 %", "11 %"],
   "Vekstfaktoren for to år er $1{,}1^2 = 1{,}21$, altså en økning på 21 %. Det andre året regnes de 10 prosentene av et større tall.",
   "The output of a factory grows by 10% per year for two years in a row. What is the total increase?",
   ["21%", "20%", "10%", "11%"],
   "The growth factor for two years is $1.1^2 = 1.21$, an increase of 21%. In the second year, the 10% is taken of a larger number."],
  ["Spenningen over en kondensator som lades ut, er $U(t) = 12\\,e^{-t/0{,}5}$ volt, der $t$ er tiden i sekunder. Når har spenningen sunket til 3,0 V?",
   { n: 0.5 * Math.log(4), tol: 0.007, u: "s" },
   "$12e^{-t/0{,}5} = 3$ gir $e^{-t/0{,}5} = 0{,}25$. Ta $\\ln$ på begge sider: $-t/0{,}5 = \\ln 0{,}25 \\approx -1{,}386$, så $t = 0{,}5\\cdot 1{,}386 \\approx 0{,}693$ s.",
   "The voltage across a discharging capacitor is $U(t) = 12\\,e^{-t/0.5}$ volts, where $t$ is the time in seconds. When has the voltage dropped to 3.0 V?",
   null,
   "$12e^{-t/0.5} = 3$ gives $e^{-t/0.5} = 0.25$. Take $\\ln$ of both sides: $-t/0.5 = \\ln 0.25 \\approx -1.386$, so $t = 0.5\\cdot 1.386 \\approx 0.693$ s."],
  ["Energiforbruket til et datasenter dobles i løpet av 8 år. Anta samme prosentvise vekst hvert år. Hva er den årlige vekstprosenten?",
   { n: (2 ** (1 / 8) - 1) * 100, tol: 0.06, u: "%" },
   "Vekstfaktoren $b$ må oppfylle $b^8 = 2$, så $b = 2^{1/8} \\approx 1{,}0905$ (eller $\\ln b = \\frac{\\ln 2}{8}$). Vekstprosenten er $(1{,}0905 - 1)\\cdot 100 \\approx 9{,}05$ %.",
   "The energy use of a data center doubles over 8 years. Assume the same percentage growth every year. What is the annual growth rate in percent?",
   null,
   "The growth factor $b$ must satisfy $b^8 = 2$, so $b = 2^{1/8} \\approx 1.0905$ (or $\\ln b = \\frac{\\ln 2}{8}$). The growth rate is $(1.0905 - 1)\\cdot 100 \\approx 9.05$%."]
]);

GEN("GMAT", 4,
 // 1) eksakte logaritmer (ett steg)
 () => { const b = R.p([2, 3, 5, 10]); const [lo, hi] = { 2: [-4, 8], 3: [-3, 5], 5: [-3, 4], 10: [-4, 5] }[b]; const n = R.i(lo, hi);
   const xs = n >= 0 ? String(b ** n) : `\\tfrac{1}{${b ** (-n)}}`, L = b === 10 ? "\\lg" : `\\log_{${b}}`;
   return [T(`Hva er $${L} ${xs}$? Regn ut uten kalkulator.${b === 10 ? " ($\\lg$ er logaritmen med grunntall 10.)" : ""}`,
             `What is $${L} ${xs}$? Work it out without a calculator.${b === 10 ? " ($\\lg$ is the base-10 logarithm.)" : ""}`),
     { n, tol: 0, u: "" },
     T(`Logaritmen svarer på «hvilken eksponent?». Siden $${b}^{${n}} = ${xs}$, er $${L} ${xs} = ${n}$.`,
       `The logarithm answers "which exponent?". Since $${b}^{${n}} = ${xs}$, we get $${L} ${xs} = ${n}$.`)]; },
 // 2) prosentvis vekst/nedgang: verdi etter n år
 () => { const up = R.p([true, false]); const p = up ? R.p([2, 2.5, 3, 3.5, 4, 4.5, 5, 6]) : R.p([8, 10, 12, 15, 18, 20, 25]);
   const n = R.i(3, 15), A = up ? R.i(10, 200) * 1000 : R.i(20, 150) * 10000, b = up ? 1 + p / 100 : 1 - p / 100, V = A * b ** n;
   return [up ? T(`Du setter inn ${nf(A)} kr på en konto med ${nf(p)} % rente per år. Hvor mye står på kontoen etter ${n} år?`,
                  `You deposit NOK ${nf(A)} in an account that pays ${nf(p)}% interest per year. How much is in the account after ${n} years?`)
              : T(`En maskin koster ${nf(A)} kr ny, og verdien synker med ${p} % per år. Hva er maskinen verdt etter ${n} år?`,
                  `A machine costs NOK ${nf(A)} new, and its value drops by ${p}% per year. What is it worth after ${n} years?`),
     { n: V, tol: rel(V), u: "kr" },
     T(`Vekstfaktoren er $${mf(b, 3)}$, så verdien blir $${mf(A)}\\cdot ${mf(b, 3)}^{${n}} \\approx ${mf(V, 0)}$ kr.`,
       `The growth factor is $${mf(b, 3)}$, so the value becomes $${mf(A)}\\cdot ${mf(b, 3)}^{${n}} \\approx ${mf(V, 0)}$ NOK.`)]; },
 // 3) regneregler for logaritmer, uten kalkulator
 () => { const k = R.i(0, 3); let q, ex, ans;
   if (k === 0) { const n = R.p([2, 3]), m = R.p([2, 3, 4, 5]); ans = m ** n; q = `e^{${n}\\ln ${m}}`;
     ex = `e^{${n}\\ln ${m}} = \\left(e^{\\ln ${m}}\\right)^{${n}} = ${m}^{${n}} = ${ans}`; }
   else if (k === 1) { const [a, b] = R.p([[2, 50], [4, 25], [5, 20], [2, 500], [4, 250], [8, 125], [20, 50], [25, 40]]); ans = Math.round(Math.log10(a * b));
     q = `\\lg ${a} + \\lg ${b}`; ex = `\\lg ${a} + \\lg ${b} = \\lg(${a}\\cdot ${b}) = \\lg ${a * b} = ${ans}`; }
   else if (k === 2) { const [a, b] = R.p([[96, 3], [40, 5], [48, 3], [56, 7], [80, 5], [24, 3], [112, 7], [160, 5]]); ans = Math.round(Math.log2(a / b));
     q = `\\log_2 ${a} - \\log_2 ${b}`; ex = `\\log_2 ${a} - \\log_2 ${b} = \\log_2\\frac{${a}}{${b}} = \\log_2 ${a / b} = ${ans}`; }
   else { const n = R.p([1, 3, 4, 5, 6, 7]); ans = n / 2; q = `\\ln\\sqrt{e^{${n}}}`;
     ex = `\\ln\\sqrt{e^{${n}}} = \\ln e^{${n}/2} = \\tfrac{${n}}{2}\\ln e = ${mf(ans)}`; }
   return [T(`Hva er $${q}$? Bruk regnereglene og regn ut uten kalkulator.`, `What is $${q}$? Use the rules and work it out without a calculator.`),
     { n: ans, tol: 0.01, u: "" },
     T(`Regnereglene gir $${ex}$.`, `The rules give $${ex}$.`)]; },
 // 4) løs A·e^(kx) = C
 () => { const up = R.p([true, false]); let A, k, r;
   if (up) { A = R.p([2, 3, 4, 5]); k = R.p([0.2, 0.4, 0.5, 1.5, 2, 3]); r = R.p([3, 5, 6, 7.5, 10, 12, 20, 40]); }
   else { A = R.p([50, 80, 100, 200, 500]); k = R.p([-0.1, -0.2, -0.25, -0.5, -0.8, -1.5]); r = R.p([0.05, 0.1, 0.2, 0.25, 0.4, 0.6, 0.75]); }
   const C = A * r, L = Math.log(r), x = L / k;
   return [T(`Løs ligningen $${A}e^{${mf(k)}x} = ${mf(C)}$. Hva er $x$?`, `Solve the equation $${A}e^{${mf(k)}x} = ${mf(C)}$. What is $x$?`),
     { n: x, tol: rel(x, 0.01, 0.005), u: "" },
     T(`Del begge sider på ${A}: $e^{${mf(k)}x} = ${mf(r)}$. Ta $\\ln$ på begge sider: $${mf(k)}x = \\ln ${mf(r)} \\approx ${mf(L, 4)}$. Da er $x \\approx ${mf(x, 3)}$.`,
       `Divide both sides by ${A}: $e^{${mf(k)}x} = ${mf(r)}$. Take $\\ln$ of both sides: $${mf(k)}x = \\ln ${mf(r)} \\approx ${mf(L, 4)}$. Then $x \\approx ${mf(x, 3)}$.`)]; },
 // 5) halveringstid: tid til en gitt andel er igjen
 () => { const med = R.p([true, false]); const T12 = med ? R.p([2, 3, 4, 5, 6, 8, 12]) : R.p([5, 8, 12, 20, 30, 50]); const p = R.p([1, 2, 5, 10, 20, 30, 40]);
   const r = Math.log(p / 100) / Math.log(0.5), t = T12 * r;
   return [med ? T(`Et legemiddel brytes ned i kroppen med halveringstid ${T12} timer. Hvor lang tid tar det før bare ${p} % av dosen er igjen?`,
                   `A drug is broken down in the body with a half-life of ${T12} hours. How long does it take until only ${p}% of the dose is left?`)
               : T(`Et radioaktivt stoff har halveringstid ${T12} år. Hvor lang tid tar det før aktiviteten har sunket til ${p} % av startverdien?`,
                   `A radioactive substance has a half-life of ${T12} years. How long does it take for the activity to drop to ${p}% of its initial value?`),
     { n: t, tol: rel(t), u: med ? "h" : "år" },
     T(`Andelen som er igjen etter tiden $t$, er $\\left(\\tfrac12\\right)^{t/${T12}}$. Ligningen $\\left(\\tfrac12\\right)^{t/${T12}} = ${mf(p / 100)}$ gir $\\frac{t}{${T12}} = \\frac{\\ln ${mf(p / 100)}}{\\ln 0{,}5} \\approx ${mf(r, 3)}$, så $t \\approx ${mf(t, 1)}$ ${med ? "timer" : "år"}.`,
       `The fraction left after a time $t$ is $\\left(\\tfrac12\\right)^{t/${T12}}$. The equation $\\left(\\tfrac12\\right)^{t/${T12}} = ${mf(p / 100)}$ gives $\\frac{t}{${T12}} = \\frac{\\ln ${mf(p / 100)}}{\\ln 0.5} \\approx ${mf(r, 3)}$, so $t \\approx ${mf(t, 1)}$ ${med ? "hours" : "years"}.`)]; },
 // 6) Newtons avkjølingslov: finn k fra en måling, deretter tiden (eksamensnivå)
 () => { const Tr = R.p([15, 18, 20, 22, 25]), T0 = R.p([150, 180, 200, 250, 300, 400]), t1 = R.p([5, 8, 10, 12, 15]);
   const f1 = R.f(0.4, 0.8, 0.05), T1 = Math.round(Tr + f1 * (T0 - Tr)), fx = R.f(0.05, 0.3, 0.05), Tx = Math.round(Tr + fx * (T0 - Tr));
   const q1 = (T1 - Tr) / (T0 - Tr), k = -Math.log(q1) / t1, q2 = (Tx - Tr) / (T0 - Tr), t = -Math.log(q2) / k;
   return [T(`Et smidd stålemne på ${T0} °C legges til avkjøling i luft som holder ${Tr} °C. Etter ${t1} min er temperaturen ${T1} °C. Anta Newtons avkjølingslov $T(t) = T_L + (T_0 - T_L)e^{-kt}$, der $T_L$ er lufttemperaturen. Hvor mange minutter etter start er temperaturen ${Tx} °C?`,
             `A forged steel blank at ${T0} °C is left to cool in air at ${Tr} °C. After ${t1} min its temperature is ${T1} °C. Assume Newton's law of cooling, $T(t) = T_a + (T_0 - T_a)e^{-kt}$, where $T_a$ is the air temperature. How many minutes after the start is the temperature ${Tx} °C?`),
     { n: t, tol: rel(t), u: "min" },
     T(`Temperaturforskjellen til lufta avtar eksponentielt. Finn først $k$: $e^{-k\\cdot ${t1}} = \\frac{${T1} - ${Tr}}{${T0} - ${Tr}} \\approx ${mf(q1, 4)}$, så $k = \\frac{-\\ln ${mf(q1, 4)}}{${t1}} \\approx ${mf(k, 4)}$ per min. Deretter gir $e^{-kt} = \\frac{${Tx} - ${Tr}}{${T0} - ${Tr}} \\approx ${mf(q2, 4)}$ at $t = \\frac{-\\ln ${mf(q2, 4)}}{${mf(k, 4)}} \\approx ${mf(t, 1)}$ min.`,
       `The temperature difference to the air decays exponentially. First find $k$: $e^{-k\\cdot ${t1}} = \\frac{${T1} - ${Tr}}{${T0} - ${Tr}} \\approx ${mf(q1, 4)}$, so $k = \\frac{-\\ln ${mf(q1, 4)}}{${t1}} \\approx ${mf(k, 4)}$ per min. Then $e^{-kt} = \\frac{${Tx} - ${Tr}}{${T0} - ${Tr}} \\approx ${mf(q2, 4)}$ gives $t = \\frac{-\\ln ${mf(q2, 4)}}{${mf(k, 4)}} \\approx ${mf(t, 1)}$ min.`)]; }
);

// ================= Enhet 5: Trigonometri og geometri =================
THEORY("GMAT", 5, {
nb: `## Hva handler det om?

Trigonometri handler om sammenhengen mellom vinkler og lengder i trekanter. Ingeniører bruker det hele tiden: for å dele en kraft i en vannrett og en loddrett del, finne helningen på en rampe eller et tak, regne ut lengden på et skråstag eller beskrive noe som roterer eller svinger. I kalkulus og fysikk dukker $\\sin$ og $\\cos$ opp som funksjoner, og da måles vinkler i **radianer**.

## Begreper og formler

- Vinkelsummen i en trekant er $180^\\circ$. En rett vinkel er $90^\\circ$.
- Radianer: en hel omdreining er $360^\\circ = 2\\pi$ rad. Omregning: $\\text{rad} = \\text{grader}\\cdot\\frac{\\pi}{180}$. Altså er $180^\\circ = \\pi$ og $90^\\circ = \\pi/2$.
- Pythagoras (rettvinklet trekant, $c$ er hypotenusen, den lengste siden): $a^2 + b^2 = c^2$. De to korteste sidene kalles kateter.
- For en spiss vinkel $v$ i en rettvinklet trekant:

$$\\sin v = \\frac{\\text{motstående katet}}{\\text{hypotenus}} \\qquad \\cos v = \\frac{\\text{hosliggende katet}}{\\text{hypotenus}} \\qquad \\tan v = \\frac{\\text{motstående}}{\\text{hosliggende}}$$

- Kjenner du sidene og skal finne vinkelen, bruker du de omvendte funksjonene $\\sin^{-1}$, $\\cos^{-1}$ og $\\tan^{-1}$ (ofte «shift sin» på kalkulatoren).
- Eksakte verdier: $\\sin 30^\\circ = \\tfrac12$, $\\cos 60^\\circ = \\tfrac12$, $\\sin 45^\\circ = \\cos 45^\\circ = \\tfrac{\\sqrt2}{2}$, $\\sin 60^\\circ = \\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$.
- Enhetssirkelen: punktet med vinkel $v$ (målt mot klokka fra positiv $x$-akse) har koordinatene $(\\cos v, \\sin v)$. Slik defineres sin og cos for alle vinkler. Det gir $\\sin^2 v + \\cos^2 v = 1$ og viser fortegnene: for eksempel er $\\cos v < 0$ når $90^\\circ < v < 270^\\circ$.
- Vilkårlig trekant (sidene $a, b, c$ står overfor vinklene $A, B, C$):

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\qquad c^2 = a^2 + b^2 - 2ab\\cos C \\qquad \\text{Areal} = \\tfrac12 ab\\sin C$$

- Sirkel med radius $r$: omkrets $2\\pi r$, areal $\\pi r^2$, buelengde $s = r\\theta$ og sektorareal $A = \\tfrac12 r^2\\theta$ (med $\\theta$ i radianer).

## Slik løser du oppgavene

1. Tegn en skisse, og marker det du kjenner og det du skal finne.
2. Er det en rett vinkel? Bruk Pythagoras (bare sider) eller $\\sin$, $\\cos$, $\\tan$ (sider og vinkel).
3. Ingen rett vinkel? Bruk cosinussetningen når du kjenner to sider og vinkelen mellom dem (eller alle tre sidene), og sinussetningen når du kjenner en side og vinkelen overfor den.
4. Sjekk at kalkulatoren står i riktig modus: DEG for grader, RAD for radianer.
5. Kontroller svaret: hypotenusen er lengst, og den største vinkelen står overfor den lengste siden.

### Eksempel

En rampe er 4,0 m lang (langs skråningen) og hever seg 0,80 m. Hva er helningsvinkelen, og hvor lang er rampen målt langs bakken?

1. Høyden er motstående katet og rampen er hypotenusen: $\\sin v = \\dfrac{0{,}80}{4{,}0} = 0{,}20$.
2. $v = \\sin^{-1}(0{,}20) \\approx 11{,}5^\\circ$.
3. Bakkelengden er den hosliggende kateten: $b = \\sqrt{4{,}0^2 - 0{,}80^2} = \\sqrt{15{,}36} \\approx 3{,}92$ m.

Uten rett vinkel: to stenger på 3,0 m og 5,0 m er festet i samme punkt med $60^\\circ$ mellom seg. Avstanden mellom de frie endene er $c = \\sqrt{3^2 + 5^2 - 2\\cdot 3\\cdot 5\\cos 60^\\circ} = \\sqrt{19} \\approx 4{,}36$ m.

## Vanlige feil

- Kalkulatoren står i RAD mens vinkelen er i grader (eller omvendt). $\\sin 30$ i radianer gir $-0{,}988$, ikke $0{,}5$.
- Å bytte om motstående og hosliggende katet. Begge er definert ut fra vinkelen du ser på.
- Å bruke Pythagoras eller «sin = mot/hyp» i en trekant uten rett vinkel.
- Å tro at $\\sin^{-1} x$ betyr $1/\\sin x$. Det er den omvendte funksjonen, som gir en vinkel.
- Å bruke $s = r\\theta$ med $\\theta$ i grader.
- Sinussetningen kan gi to mulige vinkler ($v$ og $180^\\circ - v$), fordi de har samme sinus. Sjekk hvilken som passer med figuren.

> Rettvinklet trekant: Pythagoras og sin = mot/hyp, cos = hos/hyp, tan = mot/hos. Andre trekanter: sinus- og cosinussetningen. Rotasjon og kalkulus: bruk radianer, $180^\\circ = \\pi$.`,
en: `## What is it about?

Trigonometry links angles and lengths in triangles. Engineers use it all the time: to split a force into a horizontal and a vertical part, to find the slope of a ramp or a roof, to calculate the length of a diagonal brace, or to describe something that rotates or oscillates. In calculus and physics, $\\sin$ and $\\cos$ appear as functions, and then angles are measured in **radians**.

## Concepts and formulas

- The angles of a triangle add up to $180^\\circ$. A right angle is $90^\\circ$.
- Radians: one full turn is $360^\\circ = 2\\pi$ rad. Conversion: $\\text{rad} = \\text{degrees}\\cdot\\frac{\\pi}{180}$. So $180^\\circ = \\pi$ and $90^\\circ = \\pi/2$.
- Pythagoras (right triangle, $c$ is the hypotenuse, the longest side): $a^2 + b^2 = c^2$. The two shorter sides are called legs.
- For an acute angle $\\theta$ in a right triangle:

$$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} \\qquad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\qquad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$$

- If you know the sides and need the angle, use the inverse functions $\\sin^{-1}$, $\\cos^{-1}$ and $\\tan^{-1}$ (often "shift sin" on the calculator).
- Exact values: $\\sin 30^\\circ = \\tfrac12$, $\\cos 60^\\circ = \\tfrac12$, $\\sin 45^\\circ = \\cos 45^\\circ = \\tfrac{\\sqrt2}{2}$, $\\sin 60^\\circ = \\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$.
- The unit circle: the point at angle $\\theta$ (measured counterclockwise from the positive $x$-axis) has coordinates $(\\cos\\theta, \\sin\\theta)$. This is how sin and cos are defined for all angles. It gives $\\sin^2\\theta + \\cos^2\\theta = 1$ and shows the signs: for example, $\\cos\\theta < 0$ when $90^\\circ < \\theta < 270^\\circ$.
- Any triangle (sides $a, b, c$ opposite the angles $A, B, C$):

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\qquad c^2 = a^2 + b^2 - 2ab\\cos C \\qquad \\text{Area} = \\tfrac12 ab\\sin C$$

- Circle with radius $r$: circumference $2\\pi r$, area $\\pi r^2$, arc length $s = r\\theta$ and sector area $A = \\tfrac12 r^2\\theta$ (with $\\theta$ in radians).

## How to solve the problems

1. Draw a sketch, and mark what you know and what you need to find.
2. Is there a right angle? Use Pythagoras (sides only) or $\\sin$, $\\cos$, $\\tan$ (sides and an angle).
3. No right angle? Use the law of cosines when you know two sides and the angle between them (or all three sides), and the law of sines when you know a side and the angle opposite it.
4. Check that the calculator is in the right mode: DEG for degrees, RAD for radians.
5. Check the answer: the hypotenuse is the longest side, and the largest angle is opposite the longest side.

### Example

A ramp is 4.0 m long (along the slope) and rises 0.80 m. What is the angle of the slope, and how long is the ramp measured along the ground?

1. The rise is the opposite side and the ramp is the hypotenuse: $\\sin\\theta = \\dfrac{0.80}{4.0} = 0.20$.
2. $\\theta = \\sin^{-1}(0.20) \\approx 11.5^\\circ$.
3. The ground length is the adjacent side: $b = \\sqrt{4.0^2 - 0.80^2} = \\sqrt{15.36} \\approx 3.92$ m.

Without a right angle: two bars of 3.0 m and 5.0 m are joined at one point with $60^\\circ$ between them. The distance between their free ends is $c = \\sqrt{3^2 + 5^2 - 2\\cdot 3\\cdot 5\\cos 60^\\circ} = \\sqrt{19} \\approx 4.36$ m.

## Common mistakes

- The calculator is in RAD while the angle is in degrees (or the other way round). $\\sin 30$ in radians gives $-0.988$, not $0.5$.
- Swapping the opposite and the adjacent side. Both are defined relative to the angle you are looking at.
- Using Pythagoras or SOH CAH TOA in a triangle without a right angle.
- Thinking that $\\sin^{-1} x$ means $1/\\sin x$. It is the inverse function, which returns an angle.
- Using $s = r\\theta$ with $\\theta$ in degrees.
- The law of sines can give two possible angles ($\\theta$ and $180^\\circ - \\theta$), because they have the same sine. Check which one fits the figure.

> Right triangle: Pythagoras and SOH CAH TOA (sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent). Other triangles: the laws of sines and cosines. Rotation and calculus: use radians, $180^\\circ = \\pi$.`
});

BIQ("GMAT", 5, [
  ["To av vinklene i en trekant er $50^\\circ$ og $70^\\circ$. Hvor stor er den tredje vinkelen?",
   ["$60^\\circ$", "$120^\\circ$", "$240^\\circ$", "$80^\\circ$"],
   "Vinkelsummen i en trekant er $180^\\circ$: $180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$.",
   "Two of the angles in a triangle are $50^\\circ$ and $70^\\circ$. What is the third angle?",
   ["$60^\\circ$", "$120^\\circ$", "$240^\\circ$", "$80^\\circ$"],
   "The angles of a triangle add up to $180^\\circ$: $180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$."],
  ["I en rettvinklet trekant er $v$ en av de spisse vinklene. Hva er $\\cos v$?",
   ["Hosliggende katet delt på hypotenusen", "Motstående katet delt på hypotenusen", "Motstående katet delt på hosliggende katet", "Hypotenusen delt på hosliggende katet"],
   "$\\cos v = \\frac{\\text{hosliggende}}{\\text{hypotenus}}$. Motstående delt på hypotenus er $\\sin v$, og motstående delt på hosliggende er $\\tan v$.",
   "In a right triangle, $\\theta$ is one of the acute angles. What is $\\cos\\theta$?",
   ["The adjacent side divided by the hypotenuse", "The opposite side divided by the hypotenuse", "The opposite side divided by the adjacent side", "The hypotenuse divided by the adjacent side"],
   "$\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$. Opposite over hypotenuse is $\\sin\\theta$, and opposite over adjacent is $\\tan\\theta$."],
  ["Et hjul med radius 0,35 m ruller uten å skli og roterer en vinkel på 3,0 rad. Hvor langt har hjulet rullet?",
   { n: 1.05, tol: 0.011, u: "m" },
   "Buelengden er $s = r\\theta = 0{,}35\\cdot 3{,}0 = 1{,}05$ m. Formelen gjelder fordi vinkelen er i radianer.",
   "A wheel of radius 0.35 m rolls without slipping and turns through an angle of 3.0 rad. How far has the wheel rolled?",
   null,
   "The arc length is $s = r\\theta = 0.35\\cdot 3.0 = 1.05$ m. The formula works because the angle is in radians."],
  ["Hvor mange radianer er $180^\\circ$?",
   ["$\\pi$", "$2\\pi$", "$\\pi/2$", "$1$"],
   "En hel omdreining er $360^\\circ = 2\\pi$ rad, så en halv omdreining er $180^\\circ = \\pi$ rad $\\approx 3{,}14$ rad.",
   "How many radians is $180^\\circ$?",
   ["$\\pi$", "$2\\pi$", "$\\pi/2$", "$1$"],
   "A full turn is $360^\\circ = 2\\pi$ rad, so half a turn is $180^\\circ = \\pi$ rad $\\approx 3.14$ rad."],
  ["Du taster $\\sin 30$ på kalkulatoren og får $-0{,}988$. Hva er mest sannsynlig galt?",
   ["Kalkulatoren står i radianer (RAD), ikke grader (DEG)", "Kalkulatoren står i grader (DEG), ikke radianer (RAD)", "Du skulle brukt $\\sin^{-1}$ i stedet", "Ingenting, $\\sin 30^\\circ$ er negativ"],
   "$\\sin 30^\\circ = 0{,}5$. Verdien $-0{,}988$ er sinus til 30 **radianer** (nesten fem omdreininger). Sett kalkulatoren i DEG-modus når vinklene er i grader.",
   "You type $\\sin 30$ on your calculator and get $-0.988$. What is most likely wrong?",
   ["The calculator is in radians (RAD), not degrees (DEG)", "The calculator is in degrees (DEG), not radians (RAD)", "You should have used $\\sin^{-1}$ instead", "Nothing, $\\sin 30^\\circ$ is negative"],
   "$\\sin 30^\\circ = 0.5$. The value $-0.988$ is the sine of 30 **radians** (almost five full turns). Put the calculator in DEG mode when the angles are in degrees."],
  ["For hvilken av disse vinklene er $\\sin v > 0$ og $\\cos v < 0$?",
   ["$150^\\circ$", "$30^\\circ$", "$210^\\circ$", "$330^\\circ$"],
   "På enhetssirkelen er punktet $(\\cos v, \\sin v)$. Positiv $y$ og negativ $x$ betyr 2. kvadrant, altså mellom $90^\\circ$ og $180^\\circ$. Her er $\\sin 150^\\circ = 0{,}5$ og $\\cos 150^\\circ \\approx -0{,}866$.",
   "For which of these angles is $\\sin\\theta > 0$ and $\\cos\\theta < 0$?",
   ["$150^\\circ$", "$30^\\circ$", "$210^\\circ$", "$330^\\circ$"],
   "On the unit circle the point is $(\\cos\\theta, \\sin\\theta)$. Positive $y$ and negative $x$ means the second quadrant, between $90^\\circ$ and $180^\\circ$. Here $\\sin 150^\\circ = 0.5$ and $\\cos 150^\\circ \\approx -0.866$."],
  ["En mast er 12 m høy. Et stag går fra toppen av masten til et punkt på bakken 5,0 m fra foten av masten. Hvilken vinkel danner staget med bakken?",
   { n: Math.atan(2.4) / DEG, tol: 0.3, u: "°" },
   "Masten er motstående katet og avstanden langs bakken er hosliggende katet: $\\tan v = \\frac{12}{5{,}0} = 2{,}4$, så $v = \\tan^{-1} 2{,}4 \\approx 67{,}4^\\circ$. (Staget er $\\sqrt{12^2 + 5^2} = 13$ m langt.)",
   "A mast is 12 m tall. A stay runs from the top of the mast to a point on the ground 5.0 m from the foot of the mast. What angle does the stay make with the ground?",
   null,
   "The mast is the opposite side and the distance along the ground is the adjacent side: $\\tan\\theta = \\frac{12}{5.0} = 2.4$, so $\\theta = \\tan^{-1} 2.4 \\approx 67.4^\\circ$. (The stay is $\\sqrt{12^2 + 5^2} = 13$ m long.)"],
  ["I trekanten $ABC$ er $A = 40^\\circ$, $B = 65^\\circ$ og siden $a = 8{,}0$ m (overfor $A$). Hvor lang er siden $b$?",
   { n: 8 * Math.sin(65 * DEG) / Math.sin(40 * DEG), tol: 0.11, u: "m" },
   "Sinussetningen: $\\frac{b}{\\sin B} = \\frac{a}{\\sin A}$, så $b = \\frac{8{,}0\\cdot\\sin 65^\\circ}{\\sin 40^\\circ} = \\frac{8{,}0\\cdot 0{,}9063}{0{,}6428} \\approx 11{,}3$ m.",
   "In triangle $ABC$, $A = 40^\\circ$, $B = 65^\\circ$ and the side $a = 8.0$ m (opposite $A$). How long is side $b$?",
   null,
   "The law of sines: $\\frac{b}{\\sin B} = \\frac{a}{\\sin A}$, so $b = \\frac{8.0\\cdot\\sin 65^\\circ}{\\sin 40^\\circ} = \\frac{8.0\\cdot 0.9063}{0.6428} \\approx 11.3$ m."]
]);

const RADS = { 0: "0", 30: "\\frac{\\pi}{6}", 45: "\\frac{\\pi}{4}", 60: "\\frac{\\pi}{3}", 90: "\\frac{\\pi}{2}", 120: "\\frac{2\\pi}{3}", 135: "\\frac{3\\pi}{4}",
  150: "\\frac{5\\pi}{6}", 180: "\\pi", 210: "\\frac{7\\pi}{6}", 225: "\\frac{5\\pi}{4}", 240: "\\frac{4\\pi}{3}", 270: "\\frac{3\\pi}{2}", 300: "\\frac{5\\pi}{3}",
  315: "\\frac{7\\pi}{4}", 330: "\\frac{11\\pi}{6}" };
const EXACT = x => { const t = [[0, "0"], [0.5, "\\frac{1}{2}"], [Math.SQRT1_2, "\\frac{\\sqrt{2}}{2}"], [Math.sqrt(3) / 2, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  const s = t.find(p => Math.abs(p[0] - Math.abs(x)) < 1e-9)[1]; return (x < -1e-9 ? "-" : "") + s; };

GEN("GMAT", 5,
 // 1) grader <-> radianer (ett steg)
 () => { const d = R.p([15, 20, 30, 36, 40, 45, 60, 72, 75, 90, 120, 135, 150, 210, 225, 240, 270, 300, 315, 330]), toRad = R.p([true, false]);
   const g = gcd(d, 180), num = d / g, den = 180 / g, fr = `\\frac{${num === 1 ? "" : num}\\pi}{${den}}`, r = d * DEG;
   if (toRad) return [T(`Hvor mange radianer er $${d}^\\circ$?`, `How many radians is $${d}^\\circ$?`), { n: r, tol: rel(r, 0.01, 0.002), u: "rad" },
     T(`Gang med $\\frac{\\pi}{180^\\circ}$: $${d}^\\circ\\cdot\\frac{\\pi}{180^\\circ} = ${fr} \\approx ${mf(r, 3)}$ rad.`,
       `Multiply by $\\frac{\\pi}{180^\\circ}$: $${d}^\\circ\\cdot\\frac{\\pi}{180^\\circ} = ${fr} \\approx ${mf(r, 3)}$ rad.`)];
   return [T(`Hvor mange grader er $${fr}$ rad?`, `How many degrees is $${fr}$ rad?`), { n: d, tol: 0.5, u: "°" },
     T(`Gang med $\\frac{180^\\circ}{\\pi}$: $${fr}\\cdot\\frac{180^\\circ}{\\pi} = ${d}^\\circ$.`, `Multiply by $\\frac{180^\\circ}{\\pi}$: $${fr}\\cdot\\frac{180^\\circ}{\\pi} = ${d}^\\circ$.`)]; },
 // 2) Pythagoras
 () => { const hyp = R.p([true, false]);
   if (hyp) { const a = R.f(1.5, 12, 0.5), b = R.f(1.5, 12, 0.5), c = Math.hypot(a, b);
     return [T(`En rettvinklet trekant har kateter på ${nf(a)} m og ${nf(b)} m. Hvor lang er hypotenusen?`, `A right triangle has legs of ${nf(a)} m and ${nf(b)} m. How long is the hypotenuse?`),
       { n: c, tol: rel(c), u: "m" },
       T(`Pythagoras: $c = \\sqrt{${mf(a)}^2 + ${mf(b)}^2} = \\sqrt{${mf(a * a + b * b)}} \\approx ${mf(c)}$ m.`, `Pythagoras: $c = \\sqrt{${mf(a)}^2 + ${mf(b)}^2} = \\sqrt{${mf(a * a + b * b)}} \\approx ${mf(c)}$ m.`)]; }
   const L = R.f(3, 8, 0.5), a = R.f(0.8, 2.4, 0.2), h = Math.sqrt(L * L - a * a);
   return [T(`En stige på ${nf(L)} m står mot en loddrett vegg med foten ${nf(a)} m fra veggen. Hvor høyt opp på veggen når stigen?`, `A ${nf(L)} m ladder leans against a vertical wall with its foot ${nf(a)} m from the wall. How high up the wall does it reach?`),
     { n: h, tol: rel(h), u: "m" },
     T(`Stigen er hypotenusen: $h = \\sqrt{${mf(L)}^2 - ${mf(a)}^2} = \\sqrt{${mf(L * L - a * a)}} \\approx ${mf(h)}$ m.`, `The ladder is the hypotenuse: $h = \\sqrt{${mf(L)}^2 - ${mf(a)}^2} = \\sqrt{${mf(L * L - a * a)}} \\approx ${mf(h)}$ m.`)]; },
 // 3) finn en side med sin, cos eller tan
 () => { const k = R.i(0, 2);
   if (k === 0) { const L = R.f(4, 30, 0.5), v = R.i(8, 35), h = L * Math.sin(v * DEG);
     return [T(`Et transportbånd er ${nf(L)} m langt og heller ${v}° i forhold til gulvet. Hvor høyt løfter det varene?`, `A conveyor belt is ${nf(L)} m long and inclined at ${v}° to the floor. How high does it lift the goods?`),
       { n: h, tol: rel(h), u: "m" },
       T(`Båndet er hypotenusen og høyden er motstående katet: $h = ${mf(L)}\\sin ${v}^\\circ \\approx ${mf(h)}$ m.`, `The belt is the hypotenuse and the height is the opposite side: $h = ${mf(L)}\\sin ${v}^\\circ \\approx ${mf(h)}$ m.`)]; }
   if (k === 1) { const L = R.f(8, 40, 1), v = R.i(20, 75), b = L * Math.cos(v * DEG);
     return [T(`Bommen på en kran er ${nf(L)} m lang og peker ${v}° over horisontalen. Hvor langt ut (vannrett) når bommen?`, `The boom of a crane is ${nf(L)} m long and points ${v}° above the horizontal. How far out (horizontally) does the boom reach?`),
       { n: b, tol: rel(b), u: "m" },
       T(`Bommen er hypotenusen og den vannrette avstanden er hosliggende katet: $b = ${mf(L)}\\cos ${v}^\\circ \\approx ${mf(b)}$ m.`, `The boom is the hypotenuse and the horizontal reach is the adjacent side: $b = ${mf(L)}\\cos ${v}^\\circ \\approx ${mf(b)}$ m.`)]; }
   const d = R.i(10, 80), v = R.i(15, 65), h = d * Math.tan(v * DEG);
   return [T(`Du står ${d} m fra foten av en pipe og ser toppen ${v}° over horisontalen (regn som om øyet er på bakkenivå). Hvor høy er pipen?`, `You stand ${d} m from the foot of a chimney and see the top at ${v}° above the horizontal (treat your eye as being at ground level). How tall is the chimney?`),
     { n: h, tol: rel(h), u: "m" },
     T(`Høyden er motstående katet og avstanden er hosliggende katet: $h = ${d}\\tan ${v}^\\circ \\approx ${mf(h)}$ m.`, `The height is the opposite side and the distance is the adjacent side: $h = ${d}\\tan ${v}^\\circ \\approx ${mf(h)}$ m.`)]; },
 // 4) finn en vinkel med omvendte funksjoner
 () => { const k = R.i(0, 2);
   if (k === 0) { const h = R.i(3, 60), L = R.i(100, 600), v = Math.atan(h / L) / DEG;
     return [T(`En vei stiger ${h} m over en vannrett avstand på ${L} m. Hva er helningsvinkelen?`, `A road rises ${h} m over a horizontal distance of ${L} m. What is the angle of inclination?`),
       { n: v, tol: rel(v, 0.01, 0.05), u: "°" },
       T(`Stigningen er motstående og den vannrette avstanden hosliggende katet: $\\tan v = \\frac{${h}}{${L}} \\approx ${mf(h / L, 4)}$, så $v \\approx ${mf(v, 2)}^\\circ$.`,
         `The rise is the opposite side and the horizontal distance the adjacent side: $\\tan\\theta = \\frac{${h}}{${L}} \\approx ${mf(h / L, 4)}$, so $\\theta \\approx ${mf(v, 2)}^\\circ$.`)]; }
   if (k === 1) { const L = R.f(2, 12, 0.5), h = +(L * R.f(0.05, 0.3, 0.01)).toFixed(2), v = Math.asin(h / L) / DEG;
     return [T(`En rampe er ${nf(L)} m lang målt langs skråningen og hever seg ${nf(h)} m. Hva er helningsvinkelen?`, `A ramp is ${nf(L)} m long measured along the slope and rises ${nf(h)} m. What is the angle of inclination?`),
       { n: v, tol: rel(v, 0.01, 0.05), u: "°" },
       T(`Rampen er hypotenusen og høyden er motstående katet: $\\sin v = \\frac{${mf(h)}}{${mf(L)}} \\approx ${mf(h / L, 4)}$, så $v \\approx ${mf(v, 2)}^\\circ$.`,
         `The ramp is the hypotenuse and the rise is the opposite side: $\\sin\\theta = \\frac{${mf(h)}}{${mf(L)}} \\approx ${mf(h / L, 4)}$, so $\\theta \\approx ${mf(v, 2)}^\\circ$.`)]; }
   const L = R.i(5, 20), d = +(L * R.f(0.3, 0.9, 0.05)).toFixed(1), v = Math.acos(d / L) / DEG;
   return [T(`Et barduntau på ${L} m går fra toppen av en stang ned til et feste på bakken ${nf(d)} m fra foten av stangen. Hvilken vinkel danner tauet med bakken?`, `A ${L} m guy rope runs from the top of a pole down to an anchor on the ground ${nf(d)} m from the foot of the pole. What angle does the rope make with the ground?`),
     { n: v, tol: rel(v, 0.01, 0.05), u: "°" },
     T(`Tauet er hypotenusen og avstanden langs bakken er hosliggende katet: $\\cos v = \\frac{${mf(d)}}{${L}} \\approx ${mf(d / L, 4)}$, så $v \\approx ${mf(v, 2)}^\\circ$.`,
       `The rope is the hypotenuse and the distance along the ground is the adjacent side: $\\cos\\theta = \\frac{${mf(d)}}{${L}} \\approx ${mf(d / L, 4)}$, so $\\theta \\approx ${mf(v, 2)}^\\circ$.`)]; },
 // 5) eksakte verdier fra enhetssirkelen (flervalg)
 () => { const deg = R.p([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]), fn = R.p(["sin", "cos"]), useRad = R.p([true, false]);
   const c = Math.cos(deg * DEG), s = Math.sin(deg * DEG), val = fn === "sin" ? s : c, other = fn === "sin" ? c : s, right = EXACT(val);
   const ang = useRad ? RADS[deg] : `${deg}^\\circ`;
   const opts = [right];
   for (const o of [EXACT(-val), EXACT(other), EXACT(-other), "\\frac{1}{2}", "-\\frac{1}{2}", "\\frac{\\sqrt{3}}{2}", "-\\frac{\\sqrt{3}}{2}", "\\frac{\\sqrt{2}}{2}", "1", "-1", "0"]) {
     if (!opts.includes(o)) opts.push(o); if (opts.length === 4) break; }
   const ref = deg % 90 === 0 ? null : deg < 90 ? deg : deg < 180 ? 180 - deg : deg < 270 ? deg - 180 : 360 - deg;
   const pt = `\\left(${EXACT(c)}, ${EXACT(s)}\\right)`;
   return [T(`Hva er den eksakte verdien av $\\${fn}\\left(${ang}\\right)$?`, `What is the exact value of $\\${fn}\\left(${ang}\\right)$?`),
     opts.map(o => `$${o}$`),
     T(`På enhetssirkelen ligger vinkelen $${ang}${useRad ? "" : ""}$ i punktet $${pt}$${ref ? ` (referansevinkel $${ref}^\\circ$)` : ""}. Førstekoordinaten er cosinus og andrekoordinaten er sinus, så $\\${fn}\\left(${ang}\\right) = ${right}$.`,
       `On the unit circle, the angle $${ang}$ lands at the point $${pt}$${ref ? ` (reference angle $${ref}^\\circ$)` : ""}. The first coordinate is the cosine and the second is the sine, so $\\${fn}\\left(${ang}\\right) = ${right}$.`)]; },
 // 6) buelengde og sektorareal
 () => { const arc = R.p([true, false]);
   if (arc) { const r = R.i(5, 60), v = R.p([30, 40, 45, 50, 60, 72, 75, 80, 90, 100, 120, 135, 150, 200, 240, 270]), th = v * DEG, s = r * th;
     return [T(`En remskive har radius ${r} cm og roterer ${v}°. Hvor langt beveger et punkt på kanten seg?`, `A pulley of radius ${r} cm rotates through ${v}°. How far does a point on its rim move?`),
       { n: s, tol: rel(s), u: "cm" },
       T(`Gjør om til radianer: $\\theta = ${v}\\cdot\\frac{\\pi}{180} \\approx ${mf(th, 4)}$ rad. Buelengden er $s = r\\theta = ${r}\\cdot ${mf(th, 4)} \\approx ${mf(s)}$ cm.`,
         `Convert to radians: $\\theta = ${v}\\cdot\\frac{\\pi}{180} \\approx ${mf(th, 4)}$ rad. The arc length is $s = r\\theta = ${r}\\cdot ${mf(th, 4)} \\approx ${mf(s)}$ cm.`)]; }
   const r = R.f(2, 12, 0.5), v = R.p([30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270]), th = v * DEG, A = 0.5 * r * r * th;
   return [T(`En hagesprinkler vanner en sirkelsektor med radius ${nf(r)} m og åpningsvinkel ${v}°. Hvor stort areal blir vannet?`, `A garden sprinkler waters a circular sector with radius ${nf(r)} m and an opening angle of ${v}°. What area gets watered?`),
     { n: A, tol: rel(A), u: "m²" },
     T(`$\\theta = ${v}\\cdot\\frac{\\pi}{180} \\approx ${mf(th, 4)}$ rad. Arealet er $A = \\tfrac12 r^2\\theta = \\tfrac12\\cdot ${mf(r)}^2\\cdot ${mf(th, 4)} \\approx ${mf(A, 1)}$ m².`,
       `$\\theta = ${v}\\cdot\\frac{\\pi}{180} \\approx ${mf(th, 4)}$ rad. The area is $A = \\tfrac12 r^2\\theta = \\tfrac12\\cdot ${mf(r)}^2\\cdot ${mf(th, 4)} \\approx ${mf(A, 1)}$ m².`)]; },
 // 7) vilkårlige trekanter: cosinussetningen, sinussetningen og areal (eksamensnivå)
 () => { const k = R.i(0, 3);
   if (k === 0) { const a = R.i(80, 600), b = R.i(80, 600), v = R.i(25, 150), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(v * DEG));
     return [T(`En landmåler står i punktet P og måler avstanden til to punkter A og B: $PA = ${a}$ m og $PB = ${b}$ m. Vinkelen mellom siktelinjene er ${v}°. Hvor langt er det fra A til B?`,
               `A surveyor at point P measures the distances to two points A and B: $PA = ${a}$ m and $PB = ${b}$ m. The angle between the lines of sight is ${v}°. What is the distance from A to B?`),
       { n: c, tol: rel(c), u: "m" },
       T(`Vi kjenner to sider og vinkelen mellom dem, så vi bruker cosinussetningen: $AB^2 = ${a}^2 + ${b}^2 - 2\\cdot ${a}\\cdot ${b}\\cos ${v}^\\circ \\approx ${mf(c * c, 0)}$, så $AB \\approx ${mf(c, 1)}$ m.`,
         `We know two sides and the angle between them, so we use the law of cosines: $AB^2 = ${a}^2 + ${b}^2 - 2\\cdot ${a}\\cdot ${b}\\cos ${v}^\\circ \\approx ${mf(c * c, 0)}$, so $AB \\approx ${mf(c, 1)}$ m.`)]; }
   if (k === 1) { let a, b, c; do { a = R.f(1.5, 6, 0.5); b = R.f(1.5, 6, 0.5); c = R.f(1.5, 6, 0.5); } while (a + b <= c + 0.3 || a + c <= b + 0.3 || b + c <= a + 0.3 || a === b || a === c || b === c);
     const cosC = (a * a + b * b - c * c) / (2 * a * b), C = Math.acos(cosC) / DEG;
     return [T(`Et trekantet fagverk har staver med lengder ${nf(a)} m, ${nf(b)} m og ${nf(c)} m. Hvor stor er vinkelen mellom stavene på ${nf(a)} m og ${nf(b)} m?`,
               `A triangular truss has members of length ${nf(a)} m, ${nf(b)} m and ${nf(c)} m. What is the angle between the ${nf(a)} m and ${nf(b)} m members?`),
       { n: C, tol: rel(C, 0.01, 0.2), u: "°" },
       T(`Vinkelen står overfor staven på ${nf(c)} m. Cosinussetningen løst for vinkelen: $\\cos C = \\frac{${mf(a)}^2 + ${mf(b)}^2 - ${mf(c)}^2}{2\\cdot ${mf(a)}\\cdot ${mf(b)}} \\approx ${mf(cosC, 4)}$, så $C \\approx ${mf(C, 1)}^\\circ$.`,
         `The angle is opposite the ${nf(c)} m member. The law of cosines solved for the angle: $\\cos C = \\frac{${mf(a)}^2 + ${mf(b)}^2 - ${mf(c)}^2}{2\\cdot ${mf(a)}\\cdot ${mf(b)}} \\approx ${mf(cosC, 4)}$, so $C \\approx ${mf(C, 1)}^\\circ$.`)]; }
   if (k === 2) { const c = R.i(40, 300), A = R.i(40, 80), B = R.i(40, 80), C = 180 - A - B, b = c * Math.sin(B * DEG) / Math.sin(C * DEG);
     return [T(`For å finne avstanden over en elv måler du opp en grunnlinje $AB = ${c}$ m langs den ene bredden. Et tre T står på den andre bredden. Vinkelen ved A mellom grunnlinjen og siktelinjen mot treet er ${A}°, og vinkelen ved B er ${B}°. Hvor langt er det fra A til treet?`,
               `To find the distance across a river, you measure a baseline $AB = ${c}$ m along one bank. A tree T stands on the other bank. The angle at A between the baseline and the line of sight to the tree is ${A}°, and the angle at B is ${B}°. How far is it from A to the tree?`),
       { n: b, tol: rel(b), u: "m" },
       T(`Vinkelen ved treet er $T = 180^\\circ - ${A}^\\circ - ${B}^\\circ = ${C}^\\circ$. Sinussetningen: $\\frac{AT}{\\sin B} = \\frac{AB}{\\sin T}$, så $AT = \\frac{${c}\\sin ${B}^\\circ}{\\sin ${C}^\\circ} \\approx ${mf(b, 1)}$ m.`,
         `The angle at the tree is $T = 180^\\circ - ${A}^\\circ - ${B}^\\circ = ${C}^\\circ$. The law of sines: $\\frac{AT}{\\sin B} = \\frac{AB}{\\sin T}$, so $AT = \\frac{${c}\\sin ${B}^\\circ}{\\sin ${C}^\\circ} \\approx ${mf(b, 1)}$ m.`)]; }
   const a = R.i(15, 80), b = R.i(15, 80), v = R.i(30, 150), Ar = 0.5 * a * b * Math.sin(v * DEG);
   return [T(`En trekantet tomt har to sider på ${a} m og ${b} m, og vinkelen mellom dem er ${v}°. Hvor stort er arealet av tomten?`,
             `A triangular plot of land has two sides of ${a} m and ${b} m, and the angle between them is ${v}°. What is the area of the plot?`),
     { n: Ar, tol: rel(Ar), u: "m²" },
     T(`Arealsetningen: $A = \\tfrac12 ab\\sin v = \\tfrac12\\cdot ${a}\\cdot ${b}\\sin ${v}^\\circ \\approx ${mf(Ar, 0)}$ m².`,
       `The area formula: $A = \\tfrac12 ab\\sin\\theta = \\tfrac12\\cdot ${a}\\cdot ${b}\\sin ${v}^\\circ \\approx ${mf(Ar, 0)}$ m².`)]; }
);

// ================= Enhet 6: Vektorer =================
THEORY("GMAT", 6, {
nb: `## Hva handler det om?

Noen størrelser er fullstendig beskrevet av ett tall: masse (5 kg), temperatur (20 °C) og tid (3 s). De kalles **skalarer**. Andre størrelser har også en **retning**: en kraft på 200 N som drar oppover, er noe helt annet enn 200 N som drar sidelengs. Slike størrelser kalles **vektorer**. Krefter, hastighet, akselerasjon, forflytning og moment er vektorer.

I statikk og fysikk skal du nesten alltid legge sammen flere krefter eller hastigheter. Det gjør du ved å dele hver vektor opp i komponenter langs $x$- og $y$-aksen, legge sammen hver retning for seg og sette resultatet sammen igjen.

## Begreper og formler

- En vektor tegnes som en pil og skrives $\\vec a$. Lengden (størrelsen) skrives $|\\vec a|$.
- Komponentform: $\\vec a = (a_x, a_y)$ eller $\\vec a = a_x\\vec i + a_y\\vec j$, der $\\vec i$ og $\\vec j$ er enhetsvektorer (lengde 1) langs aksene. I tre dimensjoner er $\\vec a = (a_x, a_y, a_z)$. Mange norske skolebøker skriver $[a_x, a_y]$.
- Lengde: $|\\vec a| = \\sqrt{a_x^2 + a_y^2}$, og i 3D $|\\vec a| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$.
- Fra lengde og vinkel $\\theta$ (målt mot klokka fra positiv $x$-akse): $a_x = |\\vec a|\\cos\\theta$ og $a_y = |\\vec a|\\sin\\theta$.
- Retning fra komponenter: $\\tan\\theta = a_y/a_x$. Sjekk kvadranten ut fra fortegnene!
- Sum: $\\vec a + \\vec b = (a_x + b_x, a_y + b_y)$. Tall ganger vektor: $k\\vec a = (ka_x, ka_y)$.
- Vektor mellom to punkter: $\\overrightarrow{AB} = (x_B - x_A, y_B - y_A)$, altså «slutt minus start».
- Skalarproduktet (prikkproduktet) gir et **tall**:

$$\\vec a\\cdot\\vec b = a_xb_x + a_yb_y = |\\vec a||\\vec b|\\cos\\theta$$

- $\\vec a\\cdot\\vec b = 0$ betyr at vektorene står vinkelrett på hverandre. Arbeid er et skalarprodukt: $W = \\vec F\\cdot\\vec s$.
- Moment av en kraft $\\vec F$ om et punkt, der $\\vec r = (r_x, r_y)$ er vektoren fra punktet til angrepspunktet: $M = r_xF_y - r_yF_x$ (positivt mot klokka). Dette er $z$-komponenten av kryssproduktet $\\vec r\\times\\vec F$.

## Slik løser du oppgavene

Slik finner du summen (resultanten) av flere krefter:

1. Tegn kreftene og velg akser. Mål alle vinkler mot klokka fra positiv $x$-akse.
2. Del hver kraft i komponenter: $F_x = F\\cos\\theta$ og $F_y = F\\sin\\theta$. Pass på fortegnene.
3. Legg sammen hver retning for seg: $R_x = \\sum F_x$ og $R_y = \\sum F_y$.
4. Lengde: $R = \\sqrt{R_x^2 + R_y^2}$. Retning: $\\theta = \\tan^{-1}(R_y/R_x)$, justert til riktig kvadrant.
5. Likevekt betyr at resultanten er null: $\\sum F_x = 0$ og $\\sum F_y = 0$.

### Eksempel

To tau drar i en krok: $F_1 = 400$ N med vinkel $30^\\circ$ og $F_2 = 250$ N med vinkel $120^\\circ$ (begge målt fra positiv $x$-akse). Finn resultanten.

1. $F_{1x} = 400\\cos 30^\\circ \\approx 346{,}4$ N og $F_{1y} = 400\\sin 30^\\circ = 200{,}0$ N.
2. $F_{2x} = 250\\cos 120^\\circ = -125{,}0$ N og $F_{2y} = 250\\sin 120^\\circ \\approx 216{,}5$ N.
3. $R_x = 346{,}4 - 125{,}0 = 221{,}4$ N og $R_y = 200{,}0 + 216{,}5 = 416{,}5$ N.
4. $R = \\sqrt{221{,}4^2 + 416{,}5^2} \\approx 471{,}7$ N og $\\theta = \\tan^{-1}(416{,}5/221{,}4) \\approx 62{,}0^\\circ$.

Å svare $400 + 250 = 650$ N ville vært feil: krefter legges sammen som vektorer, ikke som tall.

## Vanlige feil

- Å legge sammen lengdene i stedet for komponentene. Som regel er $|\\vec a + \\vec b|$ mindre enn $|\\vec a| + |\\vec b|$.
- Feil fortegn på komponentene i 2., 3. og 4. kvadrant.
- Å stole blindt på $\\tan^{-1}$: kalkulatoren gir bare vinkler mellom $-90^\\circ$ og $90^\\circ$. For $\\vec a = (-3, -3)$ er retningen $225^\\circ$, ikke $45^\\circ$.
- Å bruke $\\sin$ for $x$-komponenten når vinkelen er målt fra $x$-aksen.
- $\\overrightarrow{AB}$ er $B$ minus $A$, ikke $A$ minus $B$.
- Å tro at skalarproduktet gir en vektor. Det gir et tall.

> Del opp i komponenter, legg sammen $x$ for seg og $y$ for seg, og sett sammen igjen med Pythagoras og $\\tan^{-1}$. Sjekk alltid kvadranten.`,
en: `## What is it about?

Some quantities are completely described by a single number: mass (5 kg), temperature (20 °C) and time (3 s). They are called **scalars**. Other quantities also have a **direction**: a force of 200 N pulling upward is something quite different from 200 N pulling sideways. Such quantities are called **vectors**. Forces, velocity, acceleration, displacement and moment are vectors.

In statics and physics you almost always need to add several forces or velocities. You do this by splitting each vector into components along the $x$- and $y$-axes, adding each direction separately and putting the result back together.

## Concepts and formulas

- A vector is drawn as an arrow and written $\\vec a$. Its length (magnitude) is written $|\\vec a|$.
- Component form: $\\vec a = (a_x, a_y)$ or $\\vec a = a_x\\vec i + a_y\\vec j$, where $\\vec i$ and $\\vec j$ are unit vectors (length 1) along the axes. In three dimensions, $\\vec a = (a_x, a_y, a_z)$. Some books write $\\langle a_x, a_y\\rangle$ or $[a_x, a_y]$.
- Magnitude: $|\\vec a| = \\sqrt{a_x^2 + a_y^2}$, and in 3D $|\\vec a| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$.
- From magnitude and angle $\\theta$ (measured counterclockwise from the positive $x$-axis): $a_x = |\\vec a|\\cos\\theta$ and $a_y = |\\vec a|\\sin\\theta$.
- Direction from components: $\\tan\\theta = a_y/a_x$. Check the quadrant from the signs!
- Sum: $\\vec a + \\vec b = (a_x + b_x, a_y + b_y)$. Number times vector: $k\\vec a = (ka_x, ka_y)$.
- Vector between two points: $\\overrightarrow{AB} = (x_B - x_A, y_B - y_A)$, that is, "end minus start".
- The scalar product (dot product) gives a **number**:

$$\\vec a\\cdot\\vec b = a_xb_x + a_yb_y = |\\vec a||\\vec b|\\cos\\theta$$

- $\\vec a\\cdot\\vec b = 0$ means that the vectors are perpendicular. Work is a dot product: $W = \\vec F\\cdot\\vec s$.
- Moment of a force $\\vec F$ about a point, where $\\vec r = (r_x, r_y)$ is the vector from the point to where the force acts: $M = r_xF_y - r_yF_x$ (positive counterclockwise). This is the $z$-component of the cross product $\\vec r\\times\\vec F$.

## How to solve the problems

To find the sum (resultant) of several forces:

1. Draw the forces and choose axes. Measure all angles counterclockwise from the positive $x$-axis.
2. Split each force into components: $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$. Watch the signs.
3. Add each direction separately: $R_x = \\sum F_x$ and $R_y = \\sum F_y$.
4. Magnitude: $R = \\sqrt{R_x^2 + R_y^2}$. Direction: $\\theta = \\tan^{-1}(R_y/R_x)$, adjusted to the correct quadrant.
5. Equilibrium means that the resultant is zero: $\\sum F_x = 0$ and $\\sum F_y = 0$.

### Example

Two ropes pull on a hook: $F_1 = 400$ N at an angle of $30^\\circ$ and $F_2 = 250$ N at $120^\\circ$ (both measured from the positive $x$-axis). Find the resultant.

1. $F_{1x} = 400\\cos 30^\\circ \\approx 346.4$ N and $F_{1y} = 400\\sin 30^\\circ = 200.0$ N.
2. $F_{2x} = 250\\cos 120^\\circ = -125.0$ N and $F_{2y} = 250\\sin 120^\\circ \\approx 216.5$ N.
3. $R_x = 346.4 - 125.0 = 221.4$ N and $R_y = 200.0 + 216.5 = 416.5$ N.
4. $R = \\sqrt{221.4^2 + 416.5^2} \\approx 471.7$ N and $\\theta = \\tan^{-1}(416.5/221.4) \\approx 62.0^\\circ$.

Answering $400 + 250 = 650$ N would be wrong: forces add as vectors, not as plain numbers.

## Common mistakes

- Adding the magnitudes instead of the components. Usually $|\\vec a + \\vec b|$ is smaller than $|\\vec a| + |\\vec b|$.
- Wrong signs on the components in the second, third and fourth quadrants.
- Trusting $\\tan^{-1}$ blindly: the calculator only returns angles between $-90^\\circ$ and $90^\\circ$. For $\\vec a = (-3, -3)$ the direction is $225^\\circ$, not $45^\\circ$.
- Using $\\sin$ for the $x$-component when the angle is measured from the $x$-axis.
- $\\overrightarrow{AB}$ is $B$ minus $A$, not $A$ minus $B$.
- Thinking that the dot product gives a vector. It gives a number.

> Split into components, add $x$ and $y$ separately, and put the result back together with Pythagoras and $\\tan^{-1}$. Always check the quadrant.`
});

BIQ("GMAT", 6, [
  ["Hvilken av disse størrelsene er en vektor?",
   ["Kraft", "Masse", "Temperatur", "Tid"],
   "En kraft har både størrelse og retning. Masse, temperatur og tid er beskrevet av ett tall alene (de er skalarer).",
   "Which of these quantities is a vector?",
   ["Force", "Mass", "Temperature", "Time"],
   "A force has both magnitude and direction. Mass, temperature and time are each described by a single number (they are scalars)."],
  ["Hva er $(2, 3) + (4, -1)$?",
   ["$(6, 2)$", "$(6, 4)$", "$(8, -3)$", "$(-2, 4)$"],
   "Legg sammen komponent for komponent: $(2 + 4,\\ 3 + (-1)) = (6, 2)$.",
   "What is $(2, 3) + (4, -1)$?",
   ["$(6, 2)$", "$(6, 4)$", "$(8, -3)$", "$(-2, 4)$"],
   "Add component by component: $(2 + 4,\\ 3 + (-1)) = (6, 2)$."],
  ["$\\vec a = (3, -2)$ og $\\vec b = (4, 5)$. Hva er skalarproduktet $\\vec a\\cdot\\vec b$?",
   { n: 2, tol: 0, u: "" },
   "Gang komponentene parvis og legg sammen: $\\vec a\\cdot\\vec b = 3\\cdot 4 + (-2)\\cdot 5 = 12 - 10 = 2$.",
   "$\\vec a = (3, -2)$ and $\\vec b = (4, 5)$. What is the dot product $\\vec a\\cdot\\vec b$?",
   null,
   "Multiply the components pairwise and add: $\\vec a\\cdot\\vec b = 3\\cdot 4 + (-2)\\cdot 5 = 12 - 10 = 2$."],
  ["To krefter på 30 N og 40 N virker i samme punkt. Hvilken størrelse kan resultanten IKKE ha?",
   ["80 N", "10 N", "50 N", "70 N"],
   "Resultanten ligger mellom $40 - 30 = 10$ N (motsatt retning) og $40 + 30 = 70$ N (samme retning). Står kreftene vinkelrett på hverandre, blir den $\\sqrt{30^2 + 40^2} = 50$ N. 80 N er umulig.",
   "Two forces of 30 N and 40 N act at the same point. Which magnitude can the resultant NOT have?",
   ["80 N", "10 N", "50 N", "70 N"],
   "The resultant lies between $40 - 30 = 10$ N (opposite directions) and $40 + 30 = 70$ N (same direction). If the forces are perpendicular, it is $\\sqrt{30^2 + 40^2} = 50$ N. 80 N is impossible."],
  ["Hva betyr det at $\\vec a\\cdot\\vec b = 0$ når ingen av vektorene er nullvektoren?",
   ["Vektorene står vinkelrett på hverandre", "Vektorene er parallelle", "Vektorene er like lange", "Summen $\\vec a + \\vec b$ er nullvektoren"],
   "$\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta$. Når ingen av lengdene er null, må $\\cos\\theta = 0$, altså $\\theta = 90^\\circ$.",
   "What does $\\vec a\\cdot\\vec b = 0$ mean when neither vector is the zero vector?",
   ["The vectors are perpendicular", "The vectors are parallel", "The vectors have the same length", "The sum $\\vec a + \\vec b$ is the zero vector"],
   "$\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta$. When neither length is zero, $\\cos\\theta$ must be 0, so $\\theta = 90^\\circ$."],
  ["En kraft på 100 N virker $30^\\circ$ over horisontalen. Hva er den horisontale komponenten?",
   ["$100\\cos 30^\\circ \\approx 86{,}6$ N", "$100\\sin 30^\\circ = 50$ N", "$100\\tan 30^\\circ \\approx 57{,}7$ N", "$100/\\cos 30^\\circ \\approx 115{,}5$ N"],
   "Den horisontale komponenten er hosliggende katet til vinkelen, og kraften er hypotenusen: $F_x = F\\cos 30^\\circ \\approx 86{,}6$ N. $F\\sin 30^\\circ = 50$ N er den vertikale komponenten.",
   "A force of 100 N acts $30^\\circ$ above the horizontal. What is its horizontal component?",
   ["$100\\cos 30^\\circ \\approx 86.6$ N", "$100\\sin 30^\\circ = 50$ N", "$100\\tan 30^\\circ \\approx 57.7$ N", "$100/\\cos 30^\\circ \\approx 115.5$ N"],
   "The horizontal component is the side adjacent to the angle, and the force is the hypotenuse: $F_x = F\\cos 30^\\circ \\approx 86.6$ N. $F\\sin 30^\\circ = 50$ N is the vertical component."],
  ["Hvor stor er vinkelen mellom $\\vec a = (2, 1)$ og $\\vec b = (1, 3)$?",
   { n: 45, tol: 0.5, u: "°" },
   "$\\vec a\\cdot\\vec b = 2\\cdot 1 + 1\\cdot 3 = 5$, $|\\vec a| = \\sqrt5$ og $|\\vec b| = \\sqrt{10}$. Da er $\\cos\\theta = \\frac{5}{\\sqrt5\\cdot\\sqrt{10}} = \\frac{5}{\\sqrt{50}} \\approx 0{,}707$, så $\\theta = 45^\\circ$.",
   "What is the angle between $\\vec a = (2, 1)$ and $\\vec b = (1, 3)$?",
   null,
   "$\\vec a\\cdot\\vec b = 2\\cdot 1 + 1\\cdot 3 = 5$, $|\\vec a| = \\sqrt5$ and $|\\vec b| = \\sqrt{10}$. Then $\\cos\\theta = \\frac{5}{\\sqrt5\\cdot\\sqrt{10}} = \\frac{5}{\\sqrt{50}} \\approx 0.707$, so $\\theta = 45^\\circ$."],
  ["Kraften $\\vec F = (20, -30)$ N angriper i punktet med $x = 0{,}5$ m og $y = 0{,}4$ m. Hva er momentet om origo? Regn moment mot klokka som positivt.",
   { n: -23, tol: 0.1, u: "Nm" },
   "$M = xF_y - yF_x = 0{,}5\\cdot(-30) - 0{,}4\\cdot 20 = -15 - 8 = -23$ Nm. Minustegnet betyr at kraften prøver å dreie med klokka.",
   "The force $\\vec F = (20, -30)$ N acts at the point $x = 0.5$ m, $y = 0.4$ m. What is its moment about the origin? Take counterclockwise moments as positive.",
   null,
   "$M = xF_y - yF_x = 0.5\\cdot(-30) - 0.4\\cdot 20 = -15 - 8 = -23$ Nm. The minus sign means the force tends to turn clockwise."]
]);

GEN("GMAT", 6,
 // 1) regning med vektorer på komponentform (flervalg)
 () => { let a1, a2, b1, b2, k, op, opts, cor, g = 0;
   do { a1 = R.i(-6, 6); a2 = R.i(-6, 6); b1 = nz(-6, 6); b2 = nz(-6, 6); k = R.p([2, 3]); op = R.p(["+", "-"]); const s = op === "+" ? 1 : -1;
     cor = [k * a1 + s * b1, k * a2 + s * b2];
     opts = [cor, [a1 + s * b1, a2 + s * b2], [k * a1 - s * b1, k * a2 - s * b2], [k * (a1 + s * b1), k * (a2 + s * b2)]].map(vs);
   } while ((new Set(opts).size < 4 || (a1 === 0 && a2 === 0)) && g++ < 300);
   return [T(`$\\vec a = ${vs([a1, a2])}$ og $\\vec b = ${vs([b1, b2])}$. Hva er $${k}\\vec a ${op} \\vec b$?`, `$\\vec a = ${vs([a1, a2])}$ and $\\vec b = ${vs([b1, b2])}$. What is $${k}\\vec a ${op} \\vec b$?`),
     opts.map(o => `$${o}$`),
     T(`Regn komponent for komponent: $${k}\\vec a ${op} \\vec b = (${k}\\cdot ${pa(a1)} ${op} ${pa(b1)},\\ ${k}\\cdot ${pa(a2)} ${op} ${pa(b2)}) = ${vs(cor)}$.`,
       `Work component by component: $${k}\\vec a ${op} \\vec b = (${k}\\cdot ${pa(a1)} ${op} ${pa(b1)},\\ ${k}\\cdot ${pa(a2)} ${op} ${pa(b2)}) = ${vs(cor)}$.`)]; },
 // 2) lengden av en vektor (2D eller 3D)
 () => { const three = R.p([true, false]);
   if (!three) { const vx = nz(-15, 15), vy = nz(-15, 15), m = Math.hypot(vx, vy);
     return [T(`En båt har hastigheten $\\vec v = ${vs([vx, vy])}$ m/s. Hva er farten, altså lengden av hastighetsvektoren?`, `A boat has the velocity $\\vec v = ${vs([vx, vy])}$ m/s. What is its speed, that is, the magnitude of the velocity vector?`),
       { n: m, tol: rel(m), u: "m/s" },
       T(`$|\\vec v| = \\sqrt{${pa(vx)}^2 + ${pa(vy)}^2} = \\sqrt{${vx * vx + vy * vy}} \\approx ${mf(m)}$ m/s.`, `$|\\vec v| = \\sqrt{${pa(vx)}^2 + ${pa(vy)}^2} = \\sqrt{${vx * vx + vy * vy}} \\approx ${mf(m)}$ m/s.`)]; }
   const Fx = nz(-40, 40) * 10, Fy = nz(-40, 40) * 10, Fz = nz(-40, 40) * 10, m = Math.hypot(Fx, Fy, Fz);
   return [T(`En kraft i rommet er $\\vec F = ${vs([Fx, Fy, Fz])}$ N. Hvor stor er kraften?`, `A force in space is $\\vec F = ${vs([Fx, Fy, Fz])}$ N. What is the magnitude of the force?`),
     { n: m, tol: rel(m), u: "N" },
     T(`I 3D: $|\\vec F| = \\sqrt{${pa(Fx)}^2 + ${pa(Fy)}^2 + ${pa(Fz)}^2} = \\sqrt{${Fx * Fx + Fy * Fy + Fz * Fz}} \\approx ${mf(m, 1)}$ N.`, `In 3D: $|\\vec F| = \\sqrt{${pa(Fx)}^2 + ${pa(Fy)}^2 + ${pa(Fz)}^2} = \\sqrt{${Fx * Fx + Fy * Fy + Fz * Fz}} \\approx ${mf(m, 1)}$ N.`)]; },
 // 3) komponenter med fortegn i alle kvadranter
 () => { const F = R.f(50, 900, 10), th = R.p([20, 35, 50, 65, 110, 125, 140, 160, 200, 215, 230, 250, 290, 305, 320, 340]), ax = R.p(["x", "y"]);
   const fn = ax === "x" ? "cos" : "sin", v = ax === "x" ? F * Math.cos(th * DEG) : F * Math.sin(th * DEG), neg = v < 0;
   return [T(`En kraft på ${nf(F)} N har retning ${th}°, målt mot klokka fra positiv $x$-akse. Hva er $F_${ax}$ (med fortegn)?`, `A force of ${nf(F)} N has direction ${th}°, measured counterclockwise from the positive $x$-axis. What is $F_${ax}$ (with sign)?`),
     { n: v, tol: rel(v, 0.01, 0.5), u: "N" },
     T(`$F_${ax} = F\\${fn}\\theta = ${mf(F)}\\${fn} ${th}^\\circ \\approx ${mf(v, 1)}$ N.${neg ? ` Minustegnet betyr at komponenten peker i negativ $${ax}$-retning.` : ""}`,
       `$F_${ax} = F\\${fn}\\theta = ${mf(F)}\\${fn} ${th}^\\circ \\approx ${mf(v, 1)}$ N.${neg ? ` The minus sign means that the component points in the negative $${ax}$-direction.` : ""}`)]; },
 // 4) retning fra komponenter (riktig kvadrant)
 () => { const Fx = nz(-40, 40) * 10, Fy = nz(-40, 40) * 10; let ang = Math.atan2(Fy, Fx) / DEG; if (ang < 0) ang += 360;
   const ref = Math.atan(Math.abs(Fy) / Math.abs(Fx)) / DEG, q = Fx > 0 ? (Fy > 0 ? 1 : 4) : (Fy > 0 ? 2 : 3);
   const how = { 1: `\\theta = ${mf(ref, 1)}^\\circ`, 2: `\\theta = 180^\\circ - ${mf(ref, 1)}^\\circ`, 3: `\\theta = 180^\\circ + ${mf(ref, 1)}^\\circ`, 4: `\\theta = 360^\\circ - ${mf(ref, 1)}^\\circ` }[q];
   const sg = `$F_x ${Fx > 0 ? ">" : "<"} 0$, $F_y ${Fy > 0 ? ">" : "<"} 0$`;
   return [T(`En kraft har komponentene $F_x = ${Fx}$ N og $F_y = ${Fy}$ N. Hvilken retning har kraften, målt mot klokka fra positiv $x$-akse (mellom 0° og 360°)?`,
             `A force has the components $F_x = ${Fx}$ N and $F_y = ${Fy}$ N. What is its direction, measured counterclockwise from the positive $x$-axis (between 0° and 360°)?`),
     { n: ang, tol: 0.5, u: "°" },
     T(`Referansevinkel: $\\tan^{-1}\\frac{|F_y|}{|F_x|} = \\tan^{-1}\\frac{${Math.abs(Fy)}}{${Math.abs(Fx)}} \\approx ${mf(ref, 1)}^\\circ$. Fortegnene (${sg}) gir ${q}. kvadrant, så $${how} \\approx ${mf(ang, 1)}^\\circ$.`,
       `Reference angle: $\\tan^{-1}\\frac{|F_y|}{|F_x|} = \\tan^{-1}\\frac{${Math.abs(Fy)}}{${Math.abs(Fx)}} \\approx ${mf(ref, 1)}^\\circ$. The signs (${sg}) put it in quadrant ${q}, so $${how} \\approx ${mf(ang, 1)}^\\circ$.`)]; },
 // 5) arbeid som skalarprodukt
 () => { let Fx, Fy, sx, sy, W; do { Fx = R.i(2, 40) * 5; Fy = nz(-20, 20) * 5; sx = R.i(1, 20); sy = nz(-10, 10); W = Fx * sx + Fy * sy; } while (W <= 0);
   return [T(`En kraft $\\vec F = ${vs([Fx, Fy])}$ N drar i en vogn, og vogna flytter seg $\\vec s = ${vs([sx, sy])}$ m mens kraften virker. Hvor stort arbeid gjør kraften?`,
             `A force $\\vec F = ${vs([Fx, Fy])}$ N pulls a cart, and the cart moves $\\vec s = ${vs([sx, sy])}$ m while the force acts. How much work does the force do?`),
     { n: W, tol: rel(W, 0.01, 0.5), u: "J" },
     T(`Arbeid er skalarproduktet av kraft og forflytning: $W = \\vec F\\cdot\\vec s = ${Fx}\\cdot ${sx} + ${pa(Fy)}\\cdot ${pa(sy)} = ${Fx * sx} ${Fy * sy < 0 ? "-" : "+"} ${Math.abs(Fy * sy)} = ${W}$ J.`,
       `Work is the dot product of force and displacement: $W = \\vec F\\cdot\\vec s = ${Fx}\\cdot ${sx} + ${pa(Fy)}\\cdot ${pa(sy)} = ${Fx * sx} ${Fy * sy < 0 ? "-" : "+"} ${Math.abs(Fy * sy)} = ${W}$ J.`)]; },
 // 6) vinkelen mellom to vektorer (2D eller 3D)
 () => { const dim = R.p([2, 3]); let a, b, dot, na, nb, cs, g = 0;
   do { a = Array.from({ length: dim }, () => R.i(-6, 6)); b = Array.from({ length: dim }, () => R.i(-6, 6));
     dot = a.reduce((s, x, i) => s + x * b[i], 0); na = a.reduce((s, x) => s + x * x, 0); nb = b.reduce((s, x) => s + x * x, 0); cs = na && nb ? dot / Math.sqrt(na * nb) : 1;
   } while ((na === 0 || nb === 0 || Math.abs(cs) > 0.995) && g++ < 300);
   const th = Math.acos(cs) / DEG, terms = a.map((x, i) => `${x}\\cdot ${pa(b[i])}`).join(" + ");
   return [T(`Hvor stor er vinkelen mellom $\\vec a = ${vs(a)}$ og $\\vec b = ${vs(b)}$?`, `What is the angle between $\\vec a = ${vs(a)}$ and $\\vec b = ${vs(b)}$?`),
     { n: th, tol: 0.5, u: "°" },
     T(`$\\vec a\\cdot\\vec b = ${terms} = ${dot}$, $|\\vec a| = \\sqrt{${na}}$ og $|\\vec b| = \\sqrt{${nb}}$. Da er $\\cos\\theta = \\frac{${dot}}{\\sqrt{${na}}\\cdot\\sqrt{${nb}}} \\approx ${mf(cs, 4)}$, så $\\theta \\approx ${mf(th, 1)}^\\circ$.`,
       `$\\vec a\\cdot\\vec b = ${terms} = ${dot}$, $|\\vec a| = \\sqrt{${na}}$ and $|\\vec b| = \\sqrt{${nb}}$. Then $\\cos\\theta = \\frac{${dot}}{\\sqrt{${na}}\\cdot\\sqrt{${nb}}} \\approx ${mf(cs, 4)}$, so $\\theta \\approx ${mf(th, 1)}^\\circ$.`)]; },
 // 7) resultant av tre krefter / likevekt (eksamensnivå)
 () => { let F, th, Rx, Ry, Rm, g = 0;
   do { F = [R.f(100, 800, 10), R.f(100, 800, 10), R.f(100, 800, 10)]; th = R.distinct(3, 0, 71).map(x => x * 5).sort((x, y) => x - y);
     Rx = F.reduce((s, f, i) => s + f * Math.cos(th[i] * DEG), 0); Ry = F.reduce((s, f, i) => s + f * Math.sin(th[i] * DEG), 0); Rm = Math.hypot(Rx, Ry);
   } while (Rm < 50 && g++ < 300);
   const eq = R.p([true, false]);
   const list = F.map((f, i) => `$F_${i + 1} = ${mf(f)}$ N ved ${th[i]}°`).join(", "), listEn = F.map((f, i) => `$F_${i + 1} = ${mf(f)}$ N at ${th[i]}°`).join(", ");
   const sx = F.map((f, i) => `${mf(f)}\\cos ${th[i]}^\\circ`).join(" + "), sy = F.map((f, i) => `${mf(f)}\\sin ${th[i]}^\\circ`).join(" + ");
   const core = `$R_x = ${sx} \\approx ${mf(Rx, 1)}$ N, $R_y = ${sy} \\approx ${mf(Ry, 1)}$ N`;
   return [eq ? T(`Tre krefter virker på en bolt: ${list}. Alle vinkler er målt mot klokka fra positiv $x$-akse. Hvor stor må en fjerde kraft være for at bolten skal være i likevekt?`,
                  `Three forces act on a bolt: ${listEn}. All angles are measured counterclockwise from the positive $x$-axis. How large must a fourth force be for the bolt to be in equilibrium?`)
              : T(`Tre krefter virker på en bolt: ${list}. Alle vinkler er målt mot klokka fra positiv $x$-akse. Hvor stor er resultanten?`,
                  `Three forces act on a bolt: ${listEn}. All angles are measured counterclockwise from the positive $x$-axis. What is the magnitude of the resultant?`),
     { n: Rm, tol: rel(Rm), u: "N" },
     T(`Summer komponentene: ${core}. $R = \\sqrt{R_x^2 + R_y^2} \\approx ${mf(Rm, 1)}$ N.${eq ? ` Den fjerde kraften må være like stor som resultanten og peke motsatt vei, altså ${nf(Rm, 1)} N.` : ""}`,
       `Add the components: ${core}. $R = \\sqrt{R_x^2 + R_y^2} \\approx ${mf(Rm, 1)}$ N.${eq ? ` The fourth force must be as large as the resultant and point the opposite way, so ${nf(Rm, 1)} N.` : ""}`)]; },
 // 8) moment av en kraft om et punkt, M = r_x F_y - r_y F_x (eksamensnivå)
 () => { let Fx, Fy, px, py, ax, ay, rx, ry, M, g = 0;
   do { Fx = nz(-30, 30) * 10; Fy = nz(-30, 30) * 10; px = R.f(0, 3, 0.1); py = R.f(0, 3, 0.1); ax = R.f(0, 1.5, 0.1); ay = R.f(0, 1.5, 0.1);
     rx = +(px - ax).toFixed(2); ry = +(py - ay).toFixed(2); M = rx * Fy - ry * Fx;
   } while ((rx === 0 || ry === 0 || Math.abs(M) < 5) && g++ < 300);
   const dir = M > 0 ? T("mot klokka", "counterclockwise") : T("med klokka", "clockwise");
   return [T(`Kraften $\\vec F = ${vs([Fx, Fy])}$ N angriper i punktet P med $x = ${mf(px)}$ m og $y = ${mf(py)}$ m. Hva er momentet om punktet A med $x = ${mf(ax)}$ m og $y = ${mf(ay)}$ m? Regn moment mot klokka som positivt.`,
             `The force $\\vec F = ${vs([Fx, Fy])}$ N acts at the point P with $x = ${mf(px)}$ m and $y = ${mf(py)}$ m. What is its moment about the point A with $x = ${mf(ax)}$ m and $y = ${mf(ay)}$ m? Take counterclockwise moments as positive.`),
     { n: M, tol: rel(M, 0.01, 0.5), u: "Nm" },
     T(`Armen fra A til P har komponentene $r_x = ${mf(px)} - ${mf(ax)} = ${mf(rx)}$ m og $r_y = ${mf(py)} - ${mf(ay)} = ${mf(ry)}$ m. $M_A = r_xF_y - r_yF_x = ${pam(rx)}\\cdot ${pa(Fy)} - ${pam(ry)}\\cdot ${pa(Fx)} = ${mf(M, 1)}$ Nm, altså ${dir}.`,
       `The lever arm from A to P has the components $r_x = ${mf(px)} - ${mf(ax)} = ${mf(rx)}$ m and $r_y = ${mf(py)} - ${mf(ay)} = ${mf(ry)}$ m. $M_A = r_xF_y - r_yF_x = ${pam(rx)}\\cdot ${pa(Fy)} - ${pam(ry)}\\cdot ${pa(Fx)} = ${mf(M, 1)}$ Nm, that is, ${dir}.`)]; }
);
})();
