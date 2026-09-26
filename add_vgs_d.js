// ============================================================
//  add_vgs_d.js – Matematikk 1T: fire nye enheter + flere oppgaver i de gamle
//  (ulikheter, polynomdivisjon, potenser/logaritmer, eksponentielle modeller)
// ============================================================
(() => {
const pl = terms => { let out = ""; for(const [c, v] of terms){ if(!c) continue; const a = Math.abs(c), co = v && a === 1 ? "" : String(a);
  out += out ? (c < 0 ? " - " : " + ") + co + v : (c < 0 ? "-" : "") + co + v; } return out || "0"; };
const TH = (code, u, nb, en) => THEORY(code, u, { nb, en });
const xm = a => a < 0 ? `(x + ${-a})` : a === 0 ? "x" : `(x - ${a})`; // (x - a) pent
const OR = () => T("eller", "or");

// ================= VG1T: nye enheter =================
const U_INEQ = ADDUNIT("VG1T", "Ulikheter og fortegnslinjer", "Inequalities and sign charts");
const U_POLY = ADDUNIT("VG1T", "Faktorisering og polynomdivisjon", "Factorisation and polynomial division");
const U_LOG = ADDUNIT("VG1T", "Potenser, røtter og logaritmer", "Powers, roots and logarithms");
const U_EXP = ADDUNIT("VG1T", "Eksponentielle modeller", "Exponential models");

// ---------------- Ulikheter og fortegnslinjer ----------------
TH("VG1T", U_INEQ, `## Hva handler det om?
En ulikhet spør **for hvilke** $x$ noe er større eller mindre enn noe annet. Svaret er et helt område av tall, ikke ett tall. Det viktigste verktøyet er **fortegnslinjen**: du finner der uttrykket er null eller ikke definert, og sjekker fortegnet mellom disse punktene.

## Begreper og formler
- Lineær ulikhet løses som en likning, men **snu ulikhetstegnet** når du ganger eller deler med et negativt tall: $-2x > 6 \\Rightarrow x < -3$.
- Andregradsulikhet: flytt alt over på én side, faktoriser $ax^2 + bx + c = a(x - x_1)(x - x_2)$ og lag fortegnslinje for hver faktor.
- Et produkt er positivt når det er et partall antall negative faktorer.
- Brøkulikhet $\\dfrac{P(x)}{Q(x)} \\ge 0$: nullpunktene til $Q$ er **aldri** med i løsningen (der er brøken ikke definert). Gang aldri med et uttrykk du ikke vet fortegnet til.
- Skrivemåter: $x < 2$ kan også skrives $\\langle \\leftarrow, 2 \\rangle$, og $1 \\le x \\le 4$ som $[1, 4]$.

### Eksempel 1
Løs $x^2 - 5x + 4 < 0$. Nullpunktene er $x = 1$ og $x = 4$, så $x^2 - 5x + 4 = (x - 1)(x - 4)$.
Fortegnslinje: begge faktorene er negative for $x < 1$ (produkt positivt), én er negativ mellom 1 og 4 (produkt negativt), ingen er negative for $x > 4$.
Løsning: $1 < x < 4$.

### Eksempel 2
Løs $\\dfrac{x + 3}{x - 1} \\ge 0$. Telleren er null i $x = -3$ (tas med), nevneren er null i $x = 1$ (tas aldri med).
Løsning: $x \\le -3$ eller $x > 1$.

> Tommelfingerregel for $a > 0$: $ax^2 + bx + c < 0$ **mellom** nullpunktene, $> 0$ **utenfor**.`,
`## What is it about?
An inequality asks **for which** $x$ something is greater or smaller than something else. The answer is a whole range of numbers, not a single number. The key tool is the **sign chart**: find where the expression is zero or undefined, and check the sign between these points.

## Concepts and formulas
- A linear inequality is solved like an equation, but **flip the inequality sign** when you multiply or divide by a negative number: $-2x > 6 \\Rightarrow x < -3$.
- Quadratic inequality: move everything to one side, factorise $ax^2 + bx + c = a(x - x_1)(x - x_2)$ and draw a sign chart for each factor.
- A product is positive when there is an even number of negative factors.
- Rational inequality $\\dfrac{P(x)}{Q(x)} \\ge 0$: the zeros of $Q$ are **never** part of the solution (the fraction is not defined there). Never multiply by an expression whose sign you do not know.
- Notation: $x < 2$ can also be written $(-\\infty, 2)$, and $1 \\le x \\le 4$ as $[1, 4]$.

### Example 1
Solve $x^2 - 5x + 4 < 0$. The zeros are $x = 1$ and $x = 4$, so $x^2 - 5x + 4 = (x - 1)(x - 4)$.
Sign chart: both factors are negative for $x < 1$ (product positive), one is negative between 1 and 4 (product negative), none for $x > 4$.
Solution: $1 < x < 4$.

### Example 2
Solve $\\dfrac{x + 3}{x - 1} \\ge 0$. The numerator is zero at $x = -3$ (included), the denominator is zero at $x = 1$ (never included).
Solution: $x \\le -3$ or $x > 1$.

> Rule of thumb for $a > 0$: $ax^2 + bx + c < 0$ **between** the zeros, $> 0$ **outside** them.`);
BIQ("VG1T", U_INEQ, [
 ["Løs $-2x > 6$.", ["$x < -3$", "$x > -3$", "$x < 3$", "$x > 3$"], "Del på $-2$ og snu tegnet: $x < -3$.",
  "Solve $-2x > 6$.", ["$x < -3$", "$x > -3$", "$x < 3$", "$x > 3$"], "Divide by $-2$ and flip the sign: $x < -3$."],
 ["For hvilke $x$ er $(x - 1)(x - 4) < 0$?", ["$1 < x < 4$", "$x < 1$ eller $x > 4$", "$x > 4$", "$x < 1$"], "Produktet er negativt når nøyaktig én faktor er negativ, altså mellom nullpunktene.",
  "For which $x$ is $(x - 1)(x - 4) < 0$?", ["$1 < x < 4$", "$x < 1$ or $x > 4$", "$x > 4$", "$x < 1$"], "The product is negative when exactly one factor is negative, i.e. between the zeros."],
 ["Løs $x^2 \\ge 9$.", ["$x \\le -3$ eller $x \\ge 3$", "$-3 \\le x \\le 3$", "$x \\ge 3$", "$x \\ge \\pm 3$"], "$x^2 - 9 = (x + 3)(x - 3) \\ge 0$ utenfor nullpunktene. Mange glemmer den negative delen.",
  "Solve $x^2 \\ge 9$.", ["$x \\le -3$ or $x \\ge 3$", "$-3 \\le x \\le 3$", "$x \\ge 3$", "$x \\ge \\pm 3$"], "$x^2 - 9 = (x + 3)(x - 3) \\ge 0$ outside the zeros. Many forget the negative part."],
 ["Hvorfor kan du ikke bare gange med $x - 2$ i $\\dfrac{1}{x - 2} > 1$?", ["Fortegnet til $x - 2$ er ukjent", "Det er ikke lov å gange ulikheter", "Da blir svaret alltid feil med 2", "$x - 2$ er alltid negativ"], "Er $x - 2$ negativ, må tegnet snus. Lag fortegnslinje for $\\dfrac{1 - (x - 2)}{x - 2} > 0$ i stedet.",
  "Why can't you just multiply by $x - 2$ in $\\dfrac{1}{x - 2} > 1$?", ["The sign of $x - 2$ is unknown", "You may never multiply inequalities", "The answer is always off by 2", "$x - 2$ is always negative"], "If $x - 2$ is negative, the sign must flip. Draw a sign chart for $\\dfrac{1 - (x - 2)}{x - 2} > 0$ instead."],
 ["Hvor mange heltall oppfyller $x^2 - 5x + 4 < 0$?", { n: 2, tol: 0, u: "" }, "Løsningen er $1 < x < 4$, så heltallene er 2 og 3: altså 2 heltall.",
  "How many integers satisfy $x^2 - 5x + 4 < 0$?", null, "The solution is $1 < x < 4$, so the integers are 2 and 3: that is 2 integers."],
 ["$\\dfrac{x + 3}{x - 1} \\ge 0$. Hvilken $x$-verdi kan aldri være med i løsningen?", { n: 1, tol: 0, u: "" }, "For $x = 1$ er nevneren null, og brøken er ikke definert. $x = 1$ er aldri med.",
  "$\\dfrac{x + 3}{x - 1} \\ge 0$. Which $x$-value can never be in the solution?", null, "For $x = 1$ the denominator is zero and the fraction is not defined. $x = 1$ is never included."],
 ["$x^2 + 1 > 0$ gjelder for …", ["alle $x$", "ingen $x$", "$x > -1$", "$x > 1$"], "$x^2 \\ge 0$, så $x^2 + 1 \\ge 1 > 0$ for alle $x$.",
  "$x^2 + 1 > 0$ holds for …", ["all $x$", "no $x$", "$x > -1$", "$x > 1$"], "$x^2 \\ge 0$, so $x^2 + 1 \\ge 1 > 0$ for all $x$."]
]);
GEN("VG1T", U_INEQ,
 () => { const a = R.p([-5, -4, -3, -2, 2, 3, 4, 5]), k = R.i(-6, 6), b = R.i(-9, 9), c = a * k + b, gt = R.p([true, false]);
   const res = (a > 0) === gt ? ">" : "<", s = `$${pl([[a, "x"], [b, ""]])} ${gt ? ">" : "<"} ${c}$`;
   const opts = [`$x ${res} ${k}$`, `$x ${res === ">" ? "<" : ">"} ${k}$`, `$x ${res} ${-k}$`, `$x ${res === ">" ? "<" : ">"} ${-k}$`];
   if(k === 0) opts.splice(2, 2, `$x ${res} ${a}$`, `$x ${res} ${-a}$`);
   return [T(`Løs ulikheten ${s}.`, `Solve the inequality ${s}.`), opts,
     T(`Trekk fra ${b}: $${a}x ${gt ? ">" : "<"} ${c - b}$. Del på ${a}${a < 0 ? " og snu tegnet fordi du deler på et negativt tall" : ""}: $x ${res} ${k}$.`,
       `Subtract ${b}: $${a}x ${gt ? ">" : "<"} ${c - b}$. Divide by ${a}${a < 0 ? " and flip the sign because you divide by a negative number" : ""}: $x ${res} ${k}$.`)]; },
 () => { const [r1, r2] = R.distinct(2, -6, 7).sort((x, y) => x - y), lt = R.p([true, false]), b = -(r1 + r2), c = r1 * r2;
   const inside = `$${r1} < x < ${r2}$`, outside = `$x < ${r1}$ ${OR()} $x > ${r2}$`;
   return [T(`Løs $${pl([[1, "x^2"], [b, "x"], [c, ""]])} ${lt ? "<" : ">"} 0$.`, `Solve $${pl([[1, "x^2"], [b, "x"], [c, ""]])} ${lt ? "<" : ">"} 0$.`),
     lt ? [inside, outside, `$x < ${r2}$`, `$x > ${r1}$`] : [outside, inside, `$x > ${r2}$`, `$x < ${r1}$`],
     T(`Nullpunktene er ${r1} og ${r2}, så uttrykket er $${xm(r1)}${xm(r2)}$. Parabelen smiler, så den er negativ mellom nullpunktene og positiv utenfor.`,
       `The zeros are ${r1} and ${r2}, so the expression is $${xm(r1)}${xm(r2)}$. The parabola opens upwards, so it is negative between the zeros and positive outside.`)]; },
 () => { const [r1, r2] = R.distinct(2, -5, 6).sort((x, y) => x - y), b = -(r1 + r2), c = r1 * r2, n = r2 - r1 + 1;
   return [T(`Hvor mange heltall oppfyller $${pl([[1, "x^2"], [b, "x"], [c, ""]])} \\le 0$?`, `How many integers satisfy $${pl([[1, "x^2"], [b, "x"], [c, ""]])} \\le 0$?`), { n, tol: 0, u: "" },
     T(`Nullpunktene er ${r1} og ${r2}, og løsningen er $${r1} \\le x \\le ${r2}$ (endepunktene er med). Det gir ${r2} - (${r1}) + 1 = ${n} heltall.`,
       `The zeros are ${r1} and ${r2}, and the solution is $${r1} \\le x \\le ${r2}$ (endpoints included). That gives ${r2} - (${r1}) + 1 = ${n} integers.`)]; },
 () => { const [a, b] = R.distinct(2, -5, 5); const s = `$\\dfrac{${xm(a).replace(/^\(|\)$/g, "")}}{${xm(b).replace(/^\(|\)$/g, "")}} \\ge 0$`;
   const ok = a < b ? `$x \\le ${a}$ ${OR()} $x > ${b}$` : `$x < ${b}$ ${OR()} $x \\ge ${a}$`, w1 = a < b ? `$x \\le ${a}$ ${OR()} $x \\ge ${b}$` : `$x \\le ${b}$ ${OR()} $x \\ge ${a}$`,
     w2 = a < b ? `$${a} \\le x < ${b}$` : `$${b} < x \\le ${a}$`, w3 = a < b ? `$x > ${b}$` : `$x \\ge ${a}$`;
   return [T(`Løs ${s}.`, `Solve ${s}.`), [ok, w1, w2, w3],
     T(`Telleren er null i $x = ${a}$ (med, fordi $\\ge$), nevneren er null i $x = ${b}$ (aldri med). Brøken er positiv når teller og nevner har samme fortegn.`,
       `The numerator is zero at $x = ${a}$ (included because of $\\ge$), the denominator is zero at $x = ${b}$ (never included). The fraction is positive when numerator and denominator have the same sign.`)]; }
);

// ---------------- Faktorisering og polynomdivisjon ----------------
TH("VG1T", U_POLY, `## Hva handler det om?
Å faktorisere er å skrive et uttrykk som et produkt. Det gjør det lett å finne nullpunkter, forkorte brøker og lage fortegnslinjer. Polynomdivisjon er «lang divisjon» med polynomer.

## Begreper og formler
- Felles faktor: $6x^2 + 9x = 3x(2x + 3)$.
- Kvadratsetningene baklengs: $x^2 - 9 = (x + 3)(x - 3)$, $x^2 + 6x + 9 = (x + 3)^2$.
- Med nullpunktene $x_1, x_2$: $ax^2 + bx + c = a(x - x_1)(x - x_2)$.
- Rasjonale uttrykk forkortes ved å faktorisere teller og nevner og stryke **faktorer** (aldri ledd): $\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x + 2)(x - 2)}{x - 2} = x + 2$ for $x \\ne 2$.
- **Restteoremet**: resten når $P(x)$ deles på $(x - a)$ er $P(a)$. Er $P(a) = 0$, går divisjonen opp, og $(x - a)$ er en faktor.
- Polynomdivisjon: del det første leddet, gang tilbake, trekk fra, og gjenta.

### Eksempel
$P(x) = x^3 - 2x^2 - x + 2$. Prøv $x = 1$: $P(1) = 1 - 2 - 1 + 2 = 0$, så $(x - 1)$ er en faktor.
Polynomdivisjon gir $P(x) : (x - 1) = x^2 - x - 2 = (x - 2)(x + 1)$.
Altså $P(x) = (x - 1)(x - 2)(x + 1)$, med nullpunktene $1$, $2$ og $-1$.

> Heltallige nullpunkter i et polynom med heltallige koeffisienter og ledende koeffisient 1 må gå opp i konstantleddet. Prøv dem først.`,
`## What is it about?
To factorise is to write an expression as a product. This makes it easy to find zeros, simplify fractions and draw sign charts. Polynomial division is "long division" with polynomials.

## Concepts and formulas
- Common factor: $6x^2 + 9x = 3x(2x + 3)$.
- Square identities backwards: $x^2 - 9 = (x + 3)(x - 3)$, $x^2 + 6x + 9 = (x + 3)^2$.
- With the zeros $x_1, x_2$: $ax^2 + bx + c = a(x - x_1)(x - x_2)$.
- Rational expressions are simplified by factorising numerator and denominator and cancelling **factors** (never terms): $\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x + 2)(x - 2)}{x - 2} = x + 2$ for $x \\ne 2$.
- **The remainder theorem**: the remainder when $P(x)$ is divided by $(x - a)$ is $P(a)$. If $P(a) = 0$, the division is exact and $(x - a)$ is a factor.
- Polynomial division: divide the leading term, multiply back, subtract, and repeat.

### Example
$P(x) = x^3 - 2x^2 - x + 2$. Try $x = 1$: $P(1) = 1 - 2 - 1 + 2 = 0$, so $(x - 1)$ is a factor.
Polynomial division gives $P(x) : (x - 1) = x^2 - x - 2 = (x - 2)(x + 1)$.
So $P(x) = (x - 1)(x - 2)(x + 1)$, with zeros $1$, $2$ and $-1$.

> Integer zeros of a polynomial with integer coefficients and leading coefficient 1 must divide the constant term. Try those first.`);
BIQ("VG1T", U_POLY, [
 ["Faktoriser $x^2 - 25$.", ["$(x + 5)(x - 5)$", "$(x - 5)^2$", "$(x + 5)^2$", "$x(x - 25)$"], "Tredje kvadratsetning baklengs: $a^2 - b^2 = (a + b)(a - b)$.",
  "Factorise $x^2 - 25$.", ["$(x + 5)(x - 5)$", "$(x - 5)^2$", "$(x + 5)^2$", "$x(x - 25)$"], "The third square identity backwards: $a^2 - b^2 = (a + b)(a - b)$."],
 ["Forkort $\\dfrac{x^2 + 3x}{x}$.", ["$x + 3$", "$x^2 + 3$", "$3x$", "$x + 3x$"], "$\\dfrac{x(x + 3)}{x} = x + 3$ (for $x \\ne 0$).",
  "Simplify $\\dfrac{x^2 + 3x}{x}$.", ["$x + 3$", "$x^2 + 3$", "$3x$", "$x + 3x$"], "$\\dfrac{x(x + 3)}{x} = x + 3$ (for $x \\ne 0$)."],
 ["Er det lov å stryke $x$ i $\\dfrac{x + 2}{x}$?", ["Nei, $x$ er et ledd i telleren, ikke en faktor", "Ja, det gir 2", "Ja, det gir $1 + 2$", "Bare når $x > 0$"], "Du kan bare stryke felles faktorer. $\\dfrac{x + 2}{x} = 1 + \\dfrac{2}{x}$.",
  "May you cancel $x$ in $\\dfrac{x + 2}{x}$?", ["No, $x$ is a term in the numerator, not a factor", "Yes, it gives 2", "Yes, it gives $1 + 2$", "Only when $x > 0$"], "You can only cancel common factors. $\\dfrac{x + 2}{x} = 1 + \\dfrac{2}{x}$."],
 ["Hva er resten når $x^3 + 2x - 5$ deles på $x - 1$?", { n: -2, tol: 0, u: "" }, "Restteoremet: resten er $P(1) = 1 + 2 - 5 = -2$.",
  "What is the remainder when $x^3 + 2x - 5$ is divided by $x - 1$?", null, "The remainder theorem: the remainder is $P(1) = 1 + 2 - 5 = -2$."],
 ["$P(3) = 0$. Hva vet du da?", ["$(x - 3)$ er en faktor i $P(x)$", "$(x + 3)$ er en faktor i $P(x)$", "$P(x)$ har ingen andre nullpunkter", "$P(0) = 3$"], "Restteoremet: $P(a) = 0$ betyr at divisjonen med $(x - a)$ går opp.",
  "$P(3) = 0$. What do you know?", ["$(x - 3)$ is a factor of $P(x)$", "$(x + 3)$ is a factor of $P(x)$", "$P(x)$ has no other zeros", "$P(0) = 3$"], "The remainder theorem: $P(a) = 0$ means division by $(x - a)$ is exact."],
 ["Skriv $2x^2 - 8x + 6$ på faktorisert form.", ["$2(x - 1)(x - 3)$", "$(x - 1)(x - 3)$", "$2(x + 1)(x + 3)$", "$(2x - 1)(x - 6)$"], "Nullpunktene er 1 og 3, og $a = 2$ må stå foran: $2(x - 1)(x - 3)$.",
  "Write $2x^2 - 8x + 6$ in factorised form.", ["$2(x - 1)(x - 3)$", "$(x - 1)(x - 3)$", "$2(x + 1)(x + 3)$", "$(2x - 1)(x - 6)$"], "The zeros are 1 and 3, and $a = 2$ must stand in front: $2(x - 1)(x - 3)$."]
]);
GEN("VG1T", U_POLY,
 () => { const a = R.i(-3, 3), p = R.i(-4, 4), q = R.i(-6, 6), r = R.i(-3, 3); const P = x => x ** 3 + p * x * x + q * x + r, rest = P(a);
   return [T(`Hva er resten når $${pl([[1, "x^3"], [p, "x^2"], [q, "x"], [r, ""]])}$ deles på $${xm(a).replace(/^\(|\)$/g, "")}$?`, `What is the remainder when $${pl([[1, "x^3"], [p, "x^2"], [q, "x"], [r, ""]])}$ is divided by $${xm(a).replace(/^\(|\)$/g, "")}$?`), { n: rest, tol: 0, u: "" },
     T(`Restteoremet: resten er $P(${a}) = ${rest}$.`, `The remainder theorem: the remainder is $P(${a}) = ${rest}$.`)]; },
 () => { const r = R.i(-4, 4), p = R.i(-5, 5), q = R.i(-6, 6); // (x - r)(x² + px + q)
   const A = p - r, B = q - r * p, C = -r * q;
   return [T(`Polynomdivisjonen $(${pl([[1, "x^3"], [A, "x^2"], [B, "x"], [C, ""]])}) : ${xm(r)}$ går opp og gir $x^2 + bx + c$. Hva er $c$?`,
       `The polynomial division $(${pl([[1, "x^3"], [A, "x^2"], [B, "x"], [C, ""]])}) : ${xm(r)}$ is exact and gives $x^2 + bx + c$. What is $c$?`), { n: q, tol: 0, u: "" },
     T(`Polynomdivisjon (eller sammenlikning av koeffisienter) gir $${pl([[1, "x^2"], [p, "x"], [q, ""]])}$, fordi $${xm(r)}(${pl([[1, "x^2"], [p, "x"], [q, ""]])}) = ${pl([[1, "x^3"], [A, "x^2"], [B, "x"], [C, ""]])}$. Altså er $c = ${q}$.`,
       `Polynomial division (or comparing coefficients) gives $${pl([[1, "x^2"], [p, "x"], [q, ""]])}$, because $${xm(r)}(${pl([[1, "x^2"], [p, "x"], [q, ""]])}) = ${pl([[1, "x^3"], [A, "x^2"], [B, "x"], [C, ""]])}$. So $c = ${q}$.`)]; },
 () => { const a = R.p([1, 2, 3, -1, -2]), [r1, r2] = R.distinct(2, -6, 6).sort((x, y) => x - y); if(r1 + r2 === 0) return GEN_FALLBACK_FACT(); const b = -a * (r1 + r2), c = a * r1 * r2;
   const ok = `$${cf(a)}${xm(r1)}${xm(r2)}$`;
   return [T(`Faktoriser $${pl([[a, "x^2"], [b, "x"], [c, ""]])}$.`, `Factorise $${pl([[a, "x^2"], [b, "x"], [c, ""]])}$.`),
     [ok, `$${cf(a)}${xm(-r1)}${xm(-r2)}$`, `$${cf(-a)}${xm(r1)}${xm(r2)}$`, `$${cf(a)}${xm(r1 - 1)}${xm(r2 + 1)}$`],
     T(`Nullpunktene er $x = ${r1}$ og $x = ${r2}$ (abc-formelen), og $a = ${a}$ står foran: $${cf(a)}${xm(r1)}${xm(r2)}$.`, `The zeros are $x = ${r1}$ and $x = ${r2}$ (the quadratic formula), and $a = ${a}$ stands in front: $${cf(a)}${xm(r1)}${xm(r2)}$.`)]; },
 () => { const a = R.i(1, 6), t = R.p([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].filter(x => x !== a)), v = t + a;
   return [T(`Forkort $\\dfrac{x^2 - ${a * a}}{x - ${a}}$ og regn ut verdien for $x = ${t}$.`, `Simplify $\\dfrac{x^2 - ${a * a}}{x - ${a}}$ and find its value at $x = ${t}$.`), { n: v, tol: 0, u: "" },
     T(`$\\dfrac{(x + ${a})(x - ${a})}{x - ${a}} = x + ${a}$, så verdien er $${t} + ${a} = ${v}$.`, `$\\dfrac{(x + ${a})(x - ${a})}{x - ${a}} = x + ${a}$, so the value is $${t} + ${a} = ${v}$.`)]; }
);

// ---------------- Potenser, røtter og logaritmer ----------------
TH("VG1T", U_LOG, `## Hva handler det om?
Potenser er gjentatt multiplikasjon, røtter er potenser med brøk som eksponent, og logaritmen svarer på spørsmålet «hvilken eksponent trenger jeg?». Med logaritmer kan du løse likninger der $x$ står i eksponenten.

## Begreper og formler
- $a^{\\frac{1}{n}} = \\sqrt[n]{a}$ og $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$. Eksempel: $8^{\\frac{2}{3}} = 2^2 = 4$.
- Rotregler: $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$, så $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$.
- Tierlogaritmen: $\\lg x = y \\iff 10^y = x$. Derfor er $\\lg 1000 = 3$ og $\\lg 0{,}01 = -2$.
- Logaritmereglene: $\\lg(ab) = \\lg a + \\lg b$, $\\lg\\dfrac{a}{b} = \\lg a - \\lg b$, $\\lg a^n = n\\lg a$.
- Likningen $a \\cdot b^x = c$ løses slik: $b^x = \\dfrac{c}{a}$, så $x = \\dfrac{\\lg(c/a)}{\\lg b}$.

### Eksempel
Løs $500 \\cdot 1{,}04^x = 800$. Del på 500: $1{,}04^x = 1{,}6$. Ta lg på begge sider: $x \\lg 1{,}04 = \\lg 1{,}6$, så $x = \\dfrac{\\lg 1{,}6}{\\lg 1{,}04} \\approx 12{,}0$.

> $\\lg$ «henter ned» eksponenten: $\\lg b^x = x\\lg b$.`,
`## What is it about?
Powers are repeated multiplication, roots are powers with a fraction as exponent, and the logarithm answers the question "which exponent do I need?". With logarithms you can solve equations where $x$ is in the exponent.

## Concepts and formulas
- $a^{\\frac{1}{n}} = \\sqrt[n]{a}$ and $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$. Example: $8^{\\frac{2}{3}} = 2^2 = 4$.
- Root rules: $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$, so $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$.
- The common logarithm: $\\lg x = y \\iff 10^y = x$. So $\\lg 1000 = 3$ and $\\lg 0.01 = -2$.
- The logarithm rules: $\\lg(ab) = \\lg a + \\lg b$, $\\lg\\dfrac{a}{b} = \\lg a - \\lg b$, $\\lg a^n = n\\lg a$.
- The equation $a \\cdot b^x = c$ is solved like this: $b^x = \\dfrac{c}{a}$, so $x = \\dfrac{\\lg(c/a)}{\\lg b}$.

### Example
Solve $500 \\cdot 1.04^x = 800$. Divide by 500: $1.04^x = 1.6$. Take lg of both sides: $x \\lg 1.04 = \\lg 1.6$, so $x = \\dfrac{\\lg 1.6}{\\lg 1.04} \\approx 12.0$.

> $\\lg$ "brings down" the exponent: $\\lg b^x = x\\lg b$.`);
BIQ("VG1T", U_LOG, [
 ["Hva er $8^{\\frac{2}{3}}$?", { n: 4, tol: 0, u: "" }, "$\\sqrt[3]{8} = 2$, og $2^2 = 4$.",
  "What is $8^{\\frac{2}{3}}$?", null, "$\\sqrt[3]{8} = 2$, and $2^2 = 4$."],
 ["Hva er $\\lg 0{,}01$?", { n: -2, tol: 0, u: "" }, "$10^{-2} = 0{,}01$, så $\\lg 0{,}01 = -2$.",
  "What is $\\lg 0.01$?", null, "$10^{-2} = 0.01$, so $\\lg 0.01 = -2$."],
 ["Hva er $\\lg 2 + \\lg 5$?", { n: 1, tol: 0, u: "" }, "$\\lg 2 + \\lg 5 = \\lg 10 = 1$.",
  "What is $\\lg 2 + \\lg 5$?", null, "$\\lg 2 + \\lg 5 = \\lg 10 = 1$."],
 ["Forenkle $\\sqrt{50}$.", ["$5\\sqrt{2}$", "$25\\sqrt{2}$", "$2\\sqrt{5}$", "$10\\sqrt{5}$"], "$\\sqrt{50} = \\sqrt{25}\\cdot\\sqrt{2} = 5\\sqrt{2}$.",
  "Simplify $\\sqrt{50}$.", ["$5\\sqrt{2}$", "$25\\sqrt{2}$", "$2\\sqrt{5}$", "$10\\sqrt{5}$"], "$\\sqrt{50} = \\sqrt{25}\\cdot\\sqrt{2} = 5\\sqrt{2}$."],
 ["Løs $2^x = 32$.", { n: 5, tol: 0, u: "" }, "$32 = 2^5$, så $x = 5$.",
  "Solve $2^x = 32$.", null, "$32 = 2^5$, so $x = 5$."],
 ["Hvilken regel er riktig?", ["$\\lg a^n = n\\lg a$", "$\\lg(a + b) = \\lg a + \\lg b$", "$\\lg(ab) = \\lg a \\cdot \\lg b$", "$\\lg\\dfrac{a}{b} = \\dfrac{\\lg a}{\\lg b}$"], "Logaritmen gjør produkt til sum og potens til produkt. Det finnes ingen regel for $\\lg(a + b)$.",
  "Which rule is correct?", ["$\\lg a^n = n\\lg a$", "$\\lg(a + b) = \\lg a + \\lg b$", "$\\lg(ab) = \\lg a \\cdot \\lg b$", "$\\lg\\dfrac{a}{b} = \\dfrac{\\lg a}{\\lg b}$"], "The logarithm turns a product into a sum and a power into a product. There is no rule for $\\lg(a + b)$."],
 ["Skriv $\\dfrac{a^3 \\cdot a^{-1}}{a^{\\frac12}}$ som én potens av $a$. Hva er eksponenten?", { n: 1.5, tol: 0.001, u: "" }, "$3 + (-1) - \\tfrac12 = 1{,}5$.",
  "Write $\\dfrac{a^3 \\cdot a^{-1}}{a^{\\frac12}}$ as a single power of $a$. What is the exponent?", null, "$3 + (-1) - \\tfrac12 = 1.5$."]
]);
GEN("VG1T", U_LOG,
 () => { const k = R.i(-4, 6), x = 10 ** k;
   return [T(`Hva er $\\lg ${mf(x, 6)}$?`, `What is $\\lg ${mf(x, 6)}$?`), { n: k, tol: 0, u: "" },
     T(`$10^{${k}} = ${mf(x, 6)}$, så $\\lg ${mf(x, 6)} = ${k}$.`, `$10^{${k}} = ${mf(x, 6)}$, so $\\lg ${mf(x, 6)} = ${k}$.`)]; },
 () => { const a = R.p([100, 200, 500, 1000, 2500]), b = R.p([1.02, 1.03, 1.04, 1.05, 1.08, 1.1, 0.9, 0.95, 0.8]), f = b > 1 ? R.p([1.5, 2, 3]) : R.p([0.5, 0.25, 0.6]), c = a * f, x = Math.log(f) / Math.log(b);
   return [T(`Løs $${a} \\cdot ${mf(b)}^x = ${mf(c)}$.`, `Solve $${a} \\cdot ${mf(b)}^x = ${mf(c)}$.`), { n: x, tol: rel(x, 0.01, 0.01), u: "" },
     T(`$${mf(b)}^x = ${mf(f)}$, så $x = \\dfrac{\\lg ${mf(f)}}{\\lg ${mf(b)}} = ${mf(x, 2)}$.`, `$${mf(b)}^x = ${mf(f)}$, so $x = \\dfrac{\\lg ${mf(f)}}{\\lg ${mf(b)}} = ${mf(x, 2)}$.`)]; },
 () => { const m = R.i(-3, 5), n = R.i(-3, 5), p = R.p([2, 3, -1, -2, 0.5]), e = m + n - p;
   return [T(`Skriv $\\dfrac{a^{${m}} \\cdot a^{${n}}}{a^{${mf(p)}}}$ som én potens av $a$. Hva er eksponenten?`, `Write $\\dfrac{a^{${m}} \\cdot a^{${n}}}{a^{${mf(p)}}}$ as a single power of $a$. What is the exponent?`), { n: e, tol: 0.001, u: "" },
     T(`Legg sammen i telleren og trekk fra nevneren: $${m} + (${n}) - (${mf(p)}) = ${mf(e)}$.`, `Add in the numerator and subtract the denominator: $${m} + (${n}) - (${mf(p)}) = ${mf(e)}$.`)]; },
 () => { const [b, n, m] = R.p([[4, 2, 3], [8, 3, 2], [27, 3, 2], [16, 4, 3], [9, 2, 3], [32, 5, 2], [125, 3, 2], [16, 2, 3]]), r = Math.round(b ** (1 / n)), v = r ** m;
   return [T(`Regn ut $${b}^{\\frac{${m}}{${n}}}$.`, `Calculate $${b}^{\\frac{${m}}{${n}}}$.`), { n: v, tol: 0, u: "" },
     T(`$\\sqrt[${n}]{${b}} = ${r}$, og $${r}^{${m}} = ${v}$.`, `$\\sqrt[${n}]{${b}} = ${r}$, and $${r}^{${m}} = ${v}$.`)]; }
);

// ---------------- Eksponentielle modeller ----------------
TH("VG1T", U_EXP, `## Hva handler det om?
Når noe øker eller minker med **samme prosent** hver periode, er veksten eksponentiell: befolkning, renter, verdifall på bil, medisin i blodet. Modellen er $f(x) = a \\cdot b^x$, der $a$ er startverdien og $b$ er vekstfaktoren.

## Begreper og formler
- Vekstfaktor ved økning på $p$ %: $b = 1 + \\dfrac{p}{100}$. Ved nedgang: $b = 1 - \\dfrac{p}{100}$.
- Etter $x$ perioder: $f(x) = a \\cdot b^x$. Eksempel: 20 000 kr med 5 % rente i 3 år gir $20\\,000 \\cdot 1{,}05^3 = 23\\,152{,}50$ kr.
- Vekstfaktor fra to målinger: $b = \\left(\\dfrac{y_2}{y_1}\\right)^{\\frac{1}{x_2 - x_1}}$.
- Når nås et nivå? Løs $a \\cdot b^x = c$ med logaritmer: $x = \\dfrac{\\lg(c/a)}{\\lg b}$.
- Lineær modell $ax + b$: **samme tall** legges til hver periode. Eksponentiell: **samme faktor** ganges på.
- Prosent og prosentpoeng: går renten fra 2 % til 3 %, øker den med 1 prosentpoeng, men med 50 %.

### Eksempel
En bil koster 400 000 kr og taper 15 % av verdien hvert år. Verdien etter $x$ år er $400\\,000 \\cdot 0{,}85^x$. Etter 4 år: $400\\,000 \\cdot 0{,}85^4 \\approx 208\\,800$ kr.

> Samme prosent hver gang → ganger med vekstfaktoren. Sjekk: $b > 1$ er vekst, $0 < b < 1$ er nedgang.`,
`## What is it about?
When something increases or decreases by **the same percentage** each period, the growth is exponential: population, interest, the value of a car, medicine in the blood. The model is $f(x) = a \\cdot b^x$, where $a$ is the initial value and $b$ is the growth factor.

## Concepts and formulas
- Growth factor for an increase of $p$ %: $b = 1 + \\dfrac{p}{100}$. For a decrease: $b = 1 - \\dfrac{p}{100}$.
- After $x$ periods: $f(x) = a \\cdot b^x$. Example: 20,000 NOK at 5 % interest for 3 years gives $20\\,000 \\cdot 1.05^3 = 23\\,152.50$ NOK.
- Growth factor from two measurements: $b = \\left(\\dfrac{y_2}{y_1}\\right)^{\\frac{1}{x_2 - x_1}}$.
- When is a level reached? Solve $a \\cdot b^x = c$ with logarithms: $x = \\dfrac{\\lg(c/a)}{\\lg b}$.
- Linear model $ax + b$: **the same number** is added each period. Exponential: **the same factor** is multiplied.
- Percent and percentage points: if the rate goes from 2 % to 3 %, it increases by 1 percentage point, but by 50 %.

### Example
A car costs 400,000 NOK and loses 15 % of its value each year. The value after $x$ years is $400\\,000 \\cdot 0.85^x$. After 4 years: $400\\,000 \\cdot 0.85^4 \\approx 208\\,800$ NOK.

> Same percentage each time → multiply by the growth factor. Check: $b > 1$ is growth, $0 < b < 1$ is decline.`);
BIQ("VG1T", U_EXP, [
 ["Hva er vekstfaktoren ved en nedgang på 7 %?", { n: 0.93, tol: 0.0001, u: "" }, "$1 - 0{,}07 = 0{,}93$.",
  "What is the growth factor for a decrease of 7 %?", null, "$1 - 0.07 = 0.93$."],
 ["$f(x) = 3000 \\cdot 1{,}12^x$. Hvor mange prosent øker $f$ per periode?", { n: 12, tol: 0, u: "%" }, "Vekstfaktoren 1,12 betyr 12 % økning per periode.",
  "$f(x) = 3000 \\cdot 1.12^x$. By how many percent does $f$ increase per period?", null, "The growth factor 1.12 means a 12 % increase per period."],
 ["Et tall øker med 10 hvert år. Hvilken modell passer?", ["Lineær", "Eksponentiell", "Andregrads", "Ingen av dem"], "Samme tall lagt til hver gang gir en lineær modell. Samme prosent gir eksponentiell.",
  "A number increases by 10 each year. Which model fits?", ["Linear", "Exponential", "Quadratic", "None of them"], "The same number added each time gives a linear model. The same percentage gives exponential."],
 ["Renten går fra 4 % til 5 %. Hvor mange prosent økte renten?", { n: 25, tol: 0, u: "%" }, "Økningen er 1 prosentpoeng, som er $1/4 = 25$ % av 4 %.",
  "The interest rate goes from 4 % to 5 %. By how many percent did the rate increase?", null, "The increase is 1 percentage point, which is $1/4 = 25$ % of 4 %."],
 ["En pris øker først med 20 % og synker så med 20 %. Hva skjer?", ["Prisen blir 4 % lavere enn start", "Prisen blir som før", "Prisen blir 4 % høyere", "Prisen blir 40 % lavere"], "$1{,}2 \\cdot 0{,}8 = 0{,}96$, altså 4 % lavere enn før.",
  "A price first rises by 20 % and then falls by 20 %. What happens?", ["The price ends 4 % below the start", "The price is unchanged", "The price ends 4 % higher", "The price ends 40 % lower"], "$1.2 \\cdot 0.8 = 0.96$, i.e. 4 % lower than before."],
 ["$f(x) = 200 \\cdot 1{,}1^x$. Regn ut $f(2)$.", { n: 242, tol: 0.01, u: "" }, "$200 \\cdot 1{,}1^2 = 200 \\cdot 1{,}21 = 242$.",
  "$f(x) = 200 \\cdot 1.1^x$. Calculate $f(2)$.", null, "$200 \\cdot 1.1^2 = 200 \\cdot 1.21 = 242$."]
]);
GEN("VG1T", U_EXP,
 () => { const a = R.p([10000, 20000, 50000, 150000, 400000]), p = R.p([-20, -15, -10, -5, 2, 3, 4, 5, 6, 8]), n = R.i(2, 12), b = 1 + p / 100, v = a * b ** n;
   return [T(`Et beløp på ${nf(a, 0)} kr ${p > 0 ? `øker med ${p} %` : `synker med ${-p} %`} per år. Hva er beløpet etter ${n} år?`, `An amount of ${nf(a, 0)} NOK ${p > 0 ? `increases by ${p} %` : `decreases by ${-p} %`} per year. What is the amount after ${n} years?`), { n: v, tol: rel(v, 0.005, 1), u: "kr" },
     T(`Vekstfaktoren er ${nf(b)}. $${a} \\cdot ${mf(b)}^{${n}} = ${mf(v, 0)}$ kr.`, `The growth factor is ${nf(b)}. $${a} \\cdot ${mf(b)}^{${n}} = ${mf(v, 0)}$ NOK.`)]; },
 () => { const y1 = R.p([200, 500, 1000, 2400]), p = R.p([3, 4, 5, 6, 8, 10, 12, -8, -10, -12]), n = R.i(2, 6), b = 1 + p / 100, y2 = Math.round(y1 * b ** n * 10) / 10, bb = (y2 / y1) ** (1 / n), pp = (bb - 1) * 100;
   return [T(`En størrelse er ${nf(y1, 0)} i år 0 og ${nf(y2, 1)} i år ${n}. Hvor mange prosent endrer den seg per år (negativt ved nedgang)?`, `A quantity is ${nf(y1, 0)} in year 0 and ${nf(y2, 1)} in year ${n}. By how many percent does it change per year (negative for a decrease)?`), { n: pp, tol: 0.15, u: "%" },
     T(`$b = \\left(\\dfrac{${mf(y2, 1)}}{${y1}}\\right)^{1/${n}} = ${mf(bb, 4)}$, altså ${nf(pp, 1)} % per år.`, `$b = \\left(\\dfrac{${mf(y2, 1)}}{${y1}}\\right)^{1/${n}} = ${mf(bb, 4)}$, i.e. ${nf(pp, 1)} % per year.`)]; },
 () => { const a = R.p([1000, 5000, 20000]), p = R.p([2, 3, 4, 5, 6, 7, 8]), f = R.p([1.5, 2, 3]), b = 1 + p / 100, x = Math.log(f) / Math.log(b), n = Math.ceil(x - 1e-9);
   return [T(`${nf(a, 0)} kr settes inn med ${p} % rente per år. Hvor mange hele år tar det før beløpet har passert ${nf(a * f, 0)} kr?`, `${nf(a, 0)} NOK is deposited at ${p} % interest per year. How many whole years does it take before the amount has passed ${nf(a * f, 0)} NOK?`), { n, tol: 0, u: T("år", "years") },
     T(`$${mf(b)}^x = ${mf(f)}$ gir $x = \\dfrac{\\lg ${mf(f)}}{\\lg ${mf(b)}} = ${mf(x, 2)}$. Etter ${n} hele år er beløpet passert.`, `$${mf(b)}^x = ${mf(f)}$ gives $x = \\dfrac{\\lg ${mf(f)}}{\\lg ${mf(b)}} = ${mf(x, 2)}$. After ${n} whole years the amount has been passed.`)]; },
 () => { const p1 = R.p([2, 3, 4, 5, 6]), d = R.p([1, 2, 0.5]), p2 = p1 + d, pct = d / p1 * 100;
   return [T(`Renten øker fra ${nf(p1)} % til ${nf(p2)} %. Hvor mange prosent økte renten?`, `The interest rate rises from ${nf(p1)} % to ${nf(p2)} %. By how many percent did the rate increase?`), { n: pct, tol: 0.1, u: "%" },
     T(`Økningen er ${nf(d)} prosentpoeng. I prosent av den gamle renten: $${mf(d)}/${p1} = ${mf(pct, 1)}$ %.`, `The increase is ${nf(d)} percentage points. As a percentage of the old rate: $${mf(d)}/${p1} = ${mf(pct, 1)}$ %.`)]; }
);

// ================= VG1T: flere oppgaver i de gamle enhetene =================
BIQ("VG1T", 0, [
 ["Forenkle $(2x - 3)^2$.", ["$4x^2 - 12x + 9$", "$4x^2 - 9$", "$4x^2 + 9$", "$2x^2 - 12x + 9$"], "Andre kvadratsetning: $(2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2$.",
  "Simplify $(2x - 3)^2$.", ["$4x^2 - 12x + 9$", "$4x^2 - 9$", "$4x^2 + 9$", "$2x^2 - 12x + 9$"], "The second square identity: $(2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2$."],
 ["Løs $\\dfrac{x}{3} + \\dfrac{x}{6} = 5$.", { n: 10, tol: 0, u: "" }, "Gang med 6: $2x + x = 30$, så $x = 10$.",
  "Solve $\\dfrac{x}{3} + \\dfrac{x}{6} = 5$.", null, "Multiply by 6: $2x + x = 30$, so $x = 10$."],
 ["Hva er $(3 \\cdot 10^4) \\cdot (2 \\cdot 10^{-6})$?", ["$6 \\cdot 10^{-2}$", "$6 \\cdot 10^{-24}$", "$5 \\cdot 10^{-2}$", "$6 \\cdot 10^{10}$"], "Gang tallene og legg sammen eksponentene: $6 \\cdot 10^{4 - 6} = 6 \\cdot 10^{-2}$.",
  "What is $(3 \\cdot 10^4) \\cdot (2 \\cdot 10^{-6})$?", ["$6 \\cdot 10^{-2}$", "$6 \\cdot 10^{-24}$", "$5 \\cdot 10^{-2}$", "$6 \\cdot 10^{10}$"], "Multiply the numbers and add the exponents: $6 \\cdot 10^{4 - 6} = 6 \\cdot 10^{-2}$."]
]);
GEN("VG1T", 0,
 () => { const a = R.p([1, 2, 3]), b = R.i(-6, 6) || 1, c = R.p([1, 2, 3]), d = R.i(-6, 6) || -1; // (ax + b)(cx + d)
   const A = a * c, B = a * d + b * c, C = b * d;
   return [T(`Multipliser ut $(${pl([[a, "x"], [b, ""]])})(${pl([[c, "x"], [d, ""]])})$ og skriv som $Ax^2 + Bx + C$. Hva er $B$?`, `Expand $(${pl([[a, "x"], [b, ""]])})(${pl([[c, "x"], [d, ""]])})$ and write it as $Ax^2 + Bx + C$. What is $B$?`), { n: B, tol: 0, u: "" },
     T(`$${pl([[a, "x"]])} \\cdot (${d}) + (${b}) \\cdot ${pl([[c, "x"]])}$ gir $B = ${a * d} + ${b * c} = ${B}$. Hele svaret: $${pl([[A, "x^2"], [B, "x"], [C, ""]])}$.`, `$${pl([[a, "x"]])} \\cdot (${d}) + (${b}) \\cdot ${pl([[c, "x"]])}$ gives $B = ${a * d} + ${b * c} = ${B}$. The full answer: $${pl([[A, "x^2"], [B, "x"], [C, ""]])}$.`)]; },
 () => { const a = R.p([2, 3, 4, 5, 6]), b = R.p([3, 4, 5, 6, 8].filter(x => x !== a)), L = a * b / gcdN(a, b), x = R.p([-2, -1, 1, 2, 3]) * L, s = x / a + x / b;
   return [T(`Løs $\\dfrac{x}{${a}} + \\dfrac{x}{${b}} = ${mf(s, 3)}$.`, `Solve $\\dfrac{x}{${a}} + \\dfrac{x}{${b}} = ${mf(s, 3)}$.`), { n: x, tol: 0.01, u: "" },
     T(`Gang med fellesnevneren ${L}: $${L / a}x + ${L / b}x = ${mf(s * L, 3)}$, så $x = ${x}$.`, `Multiply by the common denominator ${L}: $${L / a}x + ${L / b}x = ${mf(s * L, 3)}$, so $x = ${x}$.`)]; }
);
function GEN_FALLBACK_FACT(){ return [T("Faktoriser $x^2 - 5x + 6$.", "Factorise $x^2 - 5x + 6$."), ["$(x - 2)(x - 3)$", "$(x + 2)(x + 3)$", "$(x - 1)(x - 6)$", "$(x - 2)(x + 3)$"], T("Nullpunktene er 2 og 3.", "The zeros are 2 and 3.")]; }
function gcdN(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; }
BIQ("VG1T", 1, [
 ["Linja går gjennom $(0, 3)$ og har stigningstall $-2$. Hva er likningen?", ["$y = -2x + 3$", "$y = 3x - 2$", "$y = -2x - 3$", "$y = 2x + 3$"], "$y = ax + b$ med $a = -2$ og $b = 3$.",
  "The line passes through $(0, 3)$ with slope $-2$. What is its equation?", ["$y = -2x + 3$", "$y = 3x - 2$", "$y = -2x - 3$", "$y = 2x + 3$"], "$y = ax + b$ with $a = -2$ and $b = 3$."],
 ["Hvor skjærer $f(x) = x^2 - 2x - 3$ $y$-aksen?", { n: -3, tol: 0, u: "" }, "$f(0) = -3$: konstantleddet er skjæringen med $y$-aksen.",
  "Where does $f(x) = x^2 - 2x - 3$ cross the $y$-axis?", null, "$f(0) = -3$: the constant term is the $y$-intercept."],
 ["$f(x) = \\dfrac{1}{x - 2}$ har en vertikal asymptote i …", ["$x = 2$", "$x = -2$", "$y = 2$", "$x = 0$"], "Nevneren er null for $x = 2$, og der går grafen mot $\\pm\\infty$.",
  "$f(x) = \\dfrac{1}{x - 2}$ has a vertical asymptote at …", ["$x = 2$", "$x = -2$", "$y = 2$", "$x = 0$"], "The denominator is zero for $x = 2$, and there the graph tends to $\\pm\\infty$."]
]);
GEN("VG1T", 1,
 () => { const a = R.p([-3, -2, -1, 1, 2, 3]), b = R.i(-5, 5), c = R.p([-2, -1, 1, 2, 3].filter(x => x !== a)), d = R.i(-6, 6), x = (d - b) / (a - c), y = a * x + b;
   return [T(`Linjene $y = ${pl([[a, "x"], [b, ""]])}$ og $y = ${pl([[c, "x"], [d, ""]])}$ skjærer hverandre. Hva er $x$-koordinaten til skjæringspunktet?`, `The lines $y = ${pl([[a, "x"], [b, ""]])}$ and $y = ${pl([[c, "x"], [d, ""]])}$ intersect. What is the $x$-coordinate of the intersection?`), { n: x, tol: 0.01, u: "" },
     T(`Sett uttrykkene like: $${pl([[a - c, "x"]])} = ${d - b}$, så $x = ${mf(x, 3)}$ (og $y = ${mf(y, 3)}$).`, `Set the expressions equal: $${pl([[a - c, "x"]])} = ${d - b}$, so $x = ${mf(x, 3)}$ (and $y = ${mf(y, 3)}$).`)]; },
 () => { const a = R.p([1, 2, -1, -2]), b = R.i(-6, 6), c = R.i(-8, 8), x = R.i(-3, 4), v = a * x * x + b * x + c;
   return [T(`$f(x) = ${pl([[a, "x^2"], [b, "x"], [c, ""]])}$. Regn ut $f(${x})$.`, `$f(x) = ${pl([[a, "x^2"], [b, "x"], [c, ""]])}$. Calculate $f(${x})$.`), { n: v, tol: 0, u: "" },
     T(`$f(${x}) = ${a} \\cdot (${x})^2 + ${b} \\cdot (${x}) + ${c} = ${v}$.`, `$f(${x}) = ${a} \\cdot (${x})^2 + ${b} \\cdot (${x}) + ${c} = ${v}$.`)]; }
);
BIQ("VG1T", 2, [
 ["Hva er $f'(x)$ når $f(x) = 4x^3 - 2x + 7$?", ["$12x^2 - 2$", "$12x^2 - 2 + 7$", "$4x^2 - 2$", "$12x^3 - 2$"], "Deriver ledd for ledd: $(4x^3)' = 12x^2$, $(-2x)' = -2$, $(7)' = 0$.",
  "What is $f'(x)$ when $f(x) = 4x^3 - 2x + 7$?", ["$12x^2 - 2$", "$12x^2 - 2 + 7$", "$4x^2 - 2$", "$12x^3 - 2$"], "Differentiate term by term: $(4x^3)' = 12x^2$, $(-2x)' = -2$, $(7)' = 0$."],
 ["$f'(2) = -3$. Hva betyr det?", ["Grafen synker med stigningstall $-3$ i $x = 2$", "$f(2) = -3$", "Grafen har bunnpunkt i $x = 2$", "Grafen skjærer $x$-aksen i $x = 2$"], "Den deriverte er stigningstallet til tangenten. Negativ betyr at grafen synker der.",
  "$f'(2) = -3$. What does this mean?", ["The graph decreases with slope $-3$ at $x = 2$", "$f(2) = -3$", "The graph has a minimum at $x = 2$", "The graph crosses the $x$-axis at $x = 2$"], "The derivative is the slope of the tangent. Negative means the graph is decreasing there."],
 ["Et legeme har posisjon $s(t) = 5t^2$ meter. Hva er farten ved $t = 3$ s?", { n: 30, tol: 0, u: "m/s" }, "$v(t) = s'(t) = 10t$, så $v(3) = 30$ m/s.",
  "A body has position $s(t) = 5t^2$ metres. What is the velocity at $t = 3$ s?", null, "$v(t) = s'(t) = 10t$, so $v(3) = 30$ m/s."]
]);
GEN("VG1T", 2,
 () => { const a = R.p([1, 2, 3, -1]), b = R.i(-4, 4), c = R.i(-5, 5), x0 = R.i(-3, 3), f = x => a * x ** 3 + b * x * x + c * x, m = 3 * a * x0 * x0 + 2 * b * x0 + c, y0 = f(x0), k = y0 - m * x0;
   return [T(`Finn likningen for tangenten til $f(x) = ${pl([[a, "x^3"], [b, "x^2"], [c, "x"]])}$ i $x = ${x0}$, på formen $y = mx + k$. Hva er $k$?`, `Find the equation of the tangent to $f(x) = ${pl([[a, "x^3"], [b, "x^2"], [c, "x"]])}$ at $x = ${x0}$, in the form $y = mx + k$. What is $k$?`), { n: k, tol: 0, u: "" },
     T(`$f'(x) = ${pl([[3 * a, "x^2"], [2 * b, "x"], [c, ""]])}$, så $m = f'(${x0}) = ${m}$. $f(${x0}) = ${y0}$. $k = ${y0} - ${m} \\cdot (${x0}) = ${k}$.`, `$f'(x) = ${pl([[3 * a, "x^2"], [2 * b, "x"], [c, ""]])}$, so $m = f'(${x0}) = ${m}$. $f(${x0}) = ${y0}$. $k = ${y0} - ${m} \\cdot (${x0}) = ${k}$.`)]; },
 () => { const a = R.p([1, 2, 3]), [x1, x2] = R.distinct(2, -3, 5).sort((u, w) => u - w), f = x => a * x * x - 2 * x, g = (f(x2) - f(x1)) / (x2 - x1);
   return [T(`Finn gjennomsnittlig vekstfart til $f(x) = ${pl([[a, "x^2"], [-2, "x"]])}$ fra $x = ${x1}$ til $x = ${x2}$.`, `Find the average rate of change of $f(x) = ${pl([[a, "x^2"], [-2, "x"]])}$ from $x = ${x1}$ to $x = ${x2}$.`), { n: g, tol: 0.001, u: "" },
     T(`$\\dfrac{f(${x2}) - f(${x1})}{${x2} - (${x1})} = \\dfrac{${f(x2)} - (${f(x1)})}{${x2 - x1}} = ${mf(g, 3)}$.`, `$\\dfrac{f(${x2}) - f(${x1})}{${x2} - (${x1})} = \\dfrac{${f(x2)} - (${f(x1)})}{${x2 - x1}} = ${mf(g, 3)}$.`)]; }
);
BIQ("VG1T", 3, [
 ["Hva er $\\sin 30^\\circ$?", { n: 0.5, tol: 0.0001, u: "" }, "Eksakt verdi: $\\sin 30^\\circ = \\tfrac12 = 0{,}5$.",
  "What is $\\sin 30^\\circ$?", null, "Exact value: $\\sin 30^\\circ = \\tfrac12 = 0.5$."],
 ["I trekant $ABC$ kjenner du to sider og vinkelen mellom dem. Hva bruker du for å finne den tredje siden?", ["Cosinussetningen", "Sinussetningen", "Arealsetningen", "Pytagoras"], "To sider og mellomliggende vinkel: $c^2 = a^2 + b^2 - 2ab\\cos C$.",
  "In triangle $ABC$ you know two sides and the angle between them. What do you use to find the third side?", ["The cosine rule", "The sine rule", "The area formula", "Pythagoras"], "Two sides and the included angle: $c^2 = a^2 + b^2 - 2ab\\cos C$."],
 ["$\\sin v = 0{,}5$ og $0^\\circ < v < 180^\\circ$. Hvor mange løsninger finnes?", { n: 2, tol: 0, u: "" }, "$v = 30^\\circ$ og $v = 150^\\circ$, fordi $\\sin(180^\\circ - v) = \\sin v$. Altså 2 løsninger.",
  "$\\sin v = 0.5$ and $0^\\circ < v < 180^\\circ$. How many solutions are there?", null, "$v = 30^\\circ$ and $v = 150^\\circ$, because $\\sin(180^\\circ - v) = \\sin v$. So 2 solutions."]
]);
GEN("VG1T", 3,
 () => { const a = R.i(3, 12), b = R.i(3, 12), C = R.p([30, 45, 60, 75, 100, 120, 135]), A = 0.5 * a * b * Math.sin(C * DEG);
   return [T(`En trekant har sidene $a = ${a}$ og $b = ${b}$, og vinkelen mellom dem er $${C}^\\circ$. Hva er arealet?`, `A triangle has sides $a = ${a}$ and $b = ${b}$, and the angle between them is $${C}^\\circ$. What is the area?`), { n: A, tol: rel(A, 0.01), u: "" },
     T(`Arealsetningen: $A = \\tfrac12 \\cdot ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ = ${mf(A, 2)}$.`, `The area formula: $A = \\tfrac12 \\cdot ${a} \\cdot ${b} \\cdot \\sin ${C}^\\circ = ${mf(A, 2)}$.`)]; },
 () => { const A = R.p([30, 40, 45, 50, 60, 70]), B = R.p([35, 55, 65, 75, 80]), a = R.i(5, 15), b = a * Math.sin(B * DEG) / Math.sin(A * DEG);
   return [T(`I trekant $ABC$ er $A = ${A}^\\circ$, $B = ${B}^\\circ$ og $a = ${a}$. Finn siden $b$.`, `In triangle $ABC$, $A = ${A}^\\circ$, $B = ${B}^\\circ$ and $a = ${a}$. Find the side $b$.`), { n: b, tol: rel(b, 0.01), u: "" },
     T(`Sinussetningen: $b = \\dfrac{a \\sin B}{\\sin A} = \\dfrac{${a} \\sin ${B}^\\circ}{\\sin ${A}^\\circ} = ${mf(b, 2)}$.`, `The sine rule: $b = \\dfrac{a \\sin B}{\\sin A} = \\dfrac{${a} \\sin ${B}^\\circ}{\\sin ${A}^\\circ} = ${mf(b, 2)}$.`)]; },
 () => { const a = R.i(4, 12), b = R.i(4, 12), C = R.p([40, 60, 90, 110, 120]), c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * DEG));
   return [T(`To sider i en trekant er ${a} og ${b}, og vinkelen mellom dem er $${C}^\\circ$. Hvor lang er den tredje siden?`, `Two sides of a triangle are ${a} and ${b}, and the angle between them is $${C}^\\circ$. How long is the third side?`), { n: c, tol: rel(c, 0.01), u: "" },
     T(`Cosinussetningen: $c^2 = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cos ${C}^\\circ$, så $c = ${mf(c, 2)}$.`, `The cosine rule: $c^2 = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cos ${C}^\\circ$, so $c = ${mf(c, 2)}$.`)]; }
);
})();
