// ============================================================
//  add_gs_a.js – BARNESKOLEN: Matematikk 1.–4. trinn og 5.–7. trinn (LK20).
//  Enkelt språk, korte forklaringer og mange oppgaver med nye tall hver gang.
// ============================================================
GROUP_NAMES["Barneskole"] = ["Barneskolen (1.–7.)", "Primary school (years 1–7)"];
GROUP_NAMES["Ungdomsskole"] = ["Ungdomsskolen (8.–10.)", "Lower secondary (years 8–10)"];
NEWCOURSE({ code: "GS14", study: "barn", group: "Barneskole", nb: "Matematikk 1.–4.", en: "Maths years 1–4", s: ["M1", "M1"], eqText: { nb: "1.–4. trinn (LK20)", en: "Years 1–4 (Norwegian curriculum)" }, units: [] });
NEWCOURSE({ code: "GS57", study: "barn", group: "Barneskole", nb: "Matematikk 5.–7.", en: "Maths years 5–7", s: ["M5", "M5"], eqText: { nb: "5.–7. trinn (LK20)", en: "Years 5–7 (Norwegian curriculum)" }, units: [] });
(() => {
const U = (code, nb, en, thNb, thEn, qs, ...gens) => { const u = ADDUNIT(code, nb, en); THEORY(code, u, { nb: thNb, en: thEn }); BIQ(code, u, qs); if(gens.length) GEN(code, u, ...gens); return u; };
const N = (n, tol = 0, u = "") => ({ n, tol, u });
const NAMES = [["Ola", "Ola"], ["Emma", "Emma"], ["Ali", "Ali"], ["Sara", "Sara"], ["Jonas", "Jonas"], ["Nora", "Nora"]];
const who = () => R.p(NAMES)[0];

// ================= MATEMATIKK 1.–4. =================
U("GS14", "Tall og plassverdi", "Numbers and place value",
`## Hva handler det om?
Alle tall er bygget av sifrene 0–9. Hvor et siffer står, bestemmer hvor mye det er verdt.

## Det viktigste
- **Enere** står lengst til høyre, så kommer **tiere** og **hundrere**.
- I tallet **347** er 3 hundrere, 4 tiere og 7 enere: $300 + 40 + 7$.
- På **tallinja** blir tallene større jo lenger til høyre du går.
- Tegnene $<$ og $>$ betyr «mindre enn» og «større enn». Den åpne siden peker mot det største tallet: $5 < 9$.

### Eksempel
Hva er størst, 58 eller 85? Se på tierne først: 8 tiere er mer enn 5 tiere, så $85 > 58$.

> Se alltid på sifferet lengst til venstre først – det er verdt mest.`,
`## What is it about?
Every number is built from the digits 0–9. Where a digit stands decides how much it is worth.

## Key points
- **Ones** are furthest to the right, then **tens** and **hundreds**.
- In **347** there are 3 hundreds, 4 tens and 7 ones: $300 + 40 + 7$.
- On the **number line** numbers get bigger the further right you go.
- The signs $<$ and $>$ mean "less than" and "greater than". The open side faces the bigger number: $5 < 9$.

### Example
Which is bigger, 58 or 85? Look at the tens first: 8 tens is more than 5 tens, so $85 > 58$.

> Always look at the digit furthest to the left first – it is worth the most.`,
[["Hvor mange tiere er det i tallet 63?", ["6", "3", "63", "9"], "I 63 står 6 på tierplassen og 3 på enerplassen. Det er 6 tiere.",
  "How many tens are there in 63?", ["6", "3", "63", "9"], "In 63, the 6 is in the tens place and the 3 in the ones place. That is 6 tens."],
 ["Hvilket tegn passer: 72 ☐ 27?", ["$>$", "$<$", "$=$", "$+$"], "72 har 7 tiere og 27 har bare 2 tiere, så 72 er størst: $72 > 27$.",
  "Which sign fits: 72 ☐ 27?", ["$>$", "$<$", "$=$", "$+$"], "72 has 7 tens and 27 has only 2 tens, so 72 is bigger: $72 > 27$."],
 ["Hvilket tall er 4 hundrere, 0 tiere og 6 enere?", ["406", "46", "460", "4006"], "$400 + 0 + 6 = 406$. Nullen holder plassen til tierne.",
  "Which number is 4 hundreds, 0 tens and 6 ones?", ["406", "46", "460", "4006"], "$400 + 0 + 6 = 406$. The zero holds the place of the tens."],
 ["Hvilket tall kommer rett før 100?", ["99", "101", "90", "10"], "Tallet rett før er én mindre: $100 - 1 = 99$.",
  "Which number comes just before 100?", ["99", "101", "90", "10"], "The number just before is one less: $100 - 1 = 99$."],
 ["Hva er verdien av sifferet 5 i tallet 352?", ["50", "5", "500", "352"], "5 står på tierplassen, så det er verdt 5 tiere, altså 50.",
  "What is the value of the digit 5 in 352?", ["50", "5", "500", "352"], "The 5 is in the tens place, so it is worth 5 tens, that is 50."],
 ["Hvilket tall er et partall?", ["14", "7", "21", "35"], "Partall slutter på 0, 2, 4, 6 eller 8. 14 slutter på 4.",
  "Which number is even?", ["14", "7", "21", "35"], "Even numbers end in 0, 2, 4, 6 or 8. 14 ends in 4."]],
 () => { const h = R.i(1, 9), t = R.i(0, 9), e = R.i(0, 9), n = 100 * h + 10 * t + e;
   return [T(`Hvilket tall er ${h} hundrere, ${t} tiere og ${e} enere?`, `Which number is ${h} hundreds, ${t} tens and ${e} ones?`), N(n),
     T(`$${100 * h} + ${10 * t} + ${e} = ${n}$.`, `$${100 * h} + ${10 * t} + ${e} = ${n}$.`)]; },
 () => { const n = R.i(11, 98), t = Math.floor(n / 10);
   return [T(`Hvor mange tiere er det i tallet ${n}?`, `How many tens are there in ${n}?`), N(t),
     T(`I ${n} står ${t} på tierplassen, så det er ${t} tiere.`, `In ${n} the digit ${t} is in the tens place, so there are ${t} tens.`)]; },
 () => { const n = R.i(10, 998), up = R.p([true, false]), ans = up ? n + 1 : n - 1;
   return [T(`Hvilket tall kommer rett ${up ? "etter" : "før"} ${n}?`, `Which number comes just ${up ? "after" : "before"} ${n}?`), N(ans),
     T(`Rett ${up ? "etter" : "før"} betyr én ${up ? "mer" : "mindre"}: $${n} ${up ? "+" : "-"} 1 = ${ans}$.`, `Just ${up ? "after" : "before"} means one ${up ? "more" : "less"}: $${n} ${up ? "+" : "-"} 1 = ${ans}$.`)]; },
 () => { const [a, b, c, d] = R.distinct(4, 12, 99), big = Math.max(a, b, c, d);
   return [T(`Hvilket tall er størst: ${a}, ${b}, ${c} eller ${d}?`, `Which number is biggest: ${a}, ${b}, ${c} or ${d}?`), [String(big), ...[a, b, c, d].filter(x => x !== big).map(String)],
     T(`Sammenlign tierne først. ${big} er størst.`, `Compare the tens first. ${big} is the biggest.`)]; }
);

U("GS14", "Pluss og minus", "Addition and subtraction",
`## Hva handler det om?
**Pluss** ($+$) er å legge sammen. **Minus** ($-$) er å ta bort – eller å finne hvor mye som mangler.

## Det viktigste
- **Tiervenner** er tall som blir 10 sammen: 1 og 9, 2 og 8, 3 og 7, 4 og 6, 5 og 5.
- Over tieren: $8 + 5$ – ta 2 for å komme til 10, så er det 3 igjen: $10 + 3 = 13$.
- Store tall: legg sammen tierne for seg og enerne for seg. $34 + 25 = 50 + 9 = 59$.
- Minus kan sjekkes med pluss: $12 - 5 = 7$ fordi $7 + 5 = 12$.

### Eksempel
Ola har 15 klinkekuler og gir bort 6. $15 - 6 = 9$. Han har 9 igjen.

> Rekkefølgen spiller ingen rolle i pluss ($3 + 8 = 8 + 3$), men den gjør det i minus.`,
`## What is it about?
**Plus** ($+$) means putting together. **Minus** ($-$) means taking away – or finding how much is missing.

## Key points
- **Number bonds to 10** are pairs that make 10: 1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5.
- Bridging ten: $8 + 5$ – take 2 to reach 10, then 3 are left: $10 + 3 = 13$.
- Big numbers: add the tens and the ones separately. $34 + 25 = 50 + 9 = 59$.
- Check minus with plus: $12 - 5 = 7$ because $7 + 5 = 12$.

### Example
Ola has 15 marbles and gives away 6. $15 - 6 = 9$. He has 9 left.

> The order does not matter in plus ($3 + 8 = 8 + 3$), but it does in minus.`,
[["Hvilket tall er tiervennen til 3?", ["7", "3", "10", "6"], "$3 + 7 = 10$, så 7 er tiervennen til 3.",
  "Which number makes 10 with 3?", ["7", "3", "10", "6"], "$3 + 7 = 10$, so 7 is the number bond of 3."],
 ["Hva er $9 + 6$?", ["15", "14", "16", "3"], "Ta 1 fra 6 for å gjøre 9 til 10. Da er 5 igjen: $10 + 5 = 15$.",
  "What is $9 + 6$?", ["15", "14", "16", "3"], "Take 1 from 6 to make 9 into 10. Then 5 are left: $10 + 5 = 15$."],
 ["Hva er $40 + 30$?", ["70", "7", "43", "700"], "4 tiere og 3 tiere er 7 tiere, altså 70.",
  "What is $40 + 30$?", ["70", "7", "43", "700"], "4 tens and 3 tens make 7 tens, that is 70."],
 ["Hvordan kan du sjekke at $14 - 6 = 8$?", ["Regne $8 + 6$ og se at det blir 14", "Regne $14 + 6$", "Regne $8 - 6$", "Det går ikke"], "Minus og pluss henger sammen: hvis $8 + 6 = 14$, er $14 - 6 = 8$.",
  "How can you check that $14 - 6 = 8$?", ["Work out $8 + 6$ and see that it is 14", "Work out $14 + 6$", "Work out $8 - 6$", "You cannot"], "Minus and plus belong together: if $8 + 6 = 14$, then $14 - 6 = 8$."],
 ["Hva er $100 - 1$?", ["99", "90", "101", "11"], "Ett mindre enn 100 er 99.",
  "What is $100 - 1$?", ["99", "90", "101", "11"], "One less than 100 is 99."],
 ["Emma har 12 kroner og får 5 til. Hvilket regnestykke passer?", ["$12 + 5$", "$12 - 5$", "$5 - 12$", "$12 \\cdot 5$"], "Hun får mer, så vi legger sammen: $12 + 5 = 17$.",
  "Emma has 12 kroner and gets 5 more. Which sum fits?", ["$12 + 5$", "$12 - 5$", "$5 - 12$", "$12 \\cdot 5$"], "She gets more, so we add: $12 + 5 = 17$."]],
 () => { const a = R.i(2, 9), b = R.i(10 - a, 9), s = a + b;
   return [T(`Hva er $${a} + ${b}$?`, `What is $${a} + ${b}$?`), N(s), T(`Gå via 10: $${a} + ${10 - a} = 10$, og $10 + ${b - (10 - a)} = ${s}$.`, `Bridge through 10: $${a} + ${10 - a} = 10$, and $10 + ${b - (10 - a)} = ${s}$.`)]; },
 () => { const a = R.i(11, 69), b = R.i(10, 99 - a), s = a + b;
   return [T(`Hva er $${a} + ${b}$?`, `What is $${a} + ${b}$?`), N(s), T(`Tierne: $${a - a % 10} + ${b - b % 10} = ${a - a % 10 + b - b % 10}$. Enerne: $${a % 10} + ${b % 10} = ${a % 10 + b % 10}$. Til sammen ${s}.`, `Tens: $${a - a % 10} + ${b - b % 10} = ${a - a % 10 + b - b % 10}$. Ones: $${a % 10} + ${b % 10} = ${a % 10 + b % 10}$. In total ${s}.`)]; },
 () => { const a = R.i(20, 99), b = R.i(3, a - 5), d = a - b;
   return [T(`Hva er $${a} - ${b}$?`, `What is $${a} - ${b}$?`), N(d), T(`$${a} - ${b} = ${d}$. Sjekk: $${d} + ${b} = ${a}$.`, `$${a} - ${b} = ${d}$. Check: $${d} + ${b} = ${a}$.`)]; },
 () => { const t = R.p([10, 20, 50, 100]), a = R.i(1, t - 1), m = t - a;
   return [T(`Hva mangler? $${a} + \\square = ${t}$`, `What is missing? $${a} + \\square = ${t}$`), N(m), T(`$${t} - ${a} = ${m}$, så det mangler ${m}.`, `$${t} - ${a} = ${m}$, so ${m} is missing.`)]; },
 () => { const n = who(), a = R.i(8, 30), b = R.i(2, a - 1), d = a - b;
   return [T(`${n} har ${a} klistremerker og gir bort ${b}. Hvor mange er igjen?`, `${n} has ${a} stickers and gives away ${b}. How many are left?`), N(d), T(`$${a} - ${b} = ${d}$.`, `$${a} - ${b} = ${d}$.`)]; }
);

U("GS14", "Gangetabellen", "Times tables",
`## Hva handler det om?
**Ganging** er en rask måte å legge sammen like tall. $3 \\cdot 4$ betyr «3 grupper med 4»: $4 + 4 + 4 = 12$.

## Det viktigste
- $3 \\cdot 4$ og $4 \\cdot 3$ blir det samme. Rekkefølgen spiller ingen rolle.
- **2-gangen** er dobling. **10-gangen**: sett en 0 bak tallet ($7 \\cdot 10 = 70$).
- **5-gangen** slutter alltid på 0 eller 5.
- **9-gangen**: $9 \\cdot n$ er $10 \\cdot n - n$. $9 \\cdot 6 = 60 - 6 = 54$.
- Alt ganget med 0 blir 0. Alt ganget med 1 blir seg selv.

### Eksempel
Det er 5 poser med 6 epler. $5 \\cdot 6 = 30$ epler.

> Kan du $n \\cdot 5$, finner du $n \\cdot 6$ ved å legge til $n$ én gang til.`,
`## What is it about?
**Multiplying** is a quick way to add equal numbers. $3 \\cdot 4$ means "3 groups of 4": $4 + 4 + 4 = 12$.

## Key points
- $3 \\cdot 4$ and $4 \\cdot 3$ are the same. The order does not matter.
- The **2 times table** is doubling. The **10 times table**: put a 0 after the number ($7 \\cdot 10 = 70$).
- The **5 times table** always ends in 0 or 5.
- The **9 times table**: $9 \\cdot n$ is $10 \\cdot n - n$. $9 \\cdot 6 = 60 - 6 = 54$.
- Anything times 0 is 0. Anything times 1 stays the same.

### Example
There are 5 bags with 6 apples. $5 \\cdot 6 = 30$ apples.

> If you know $n \\cdot 5$, you find $n \\cdot 6$ by adding $n$ once more.`,
[["Hva betyr $4 \\cdot 3$?", ["4 grupper med 3", "4 + 3", "4 grupper med 4", "3 minus 4"], "$4 \\cdot 3 = 3 + 3 + 3 + 3 = 12$.",
  "What does $4 \\cdot 3$ mean?", ["4 groups of 3", "4 + 3", "4 groups of 4", "3 minus 4"], "$4 \\cdot 3 = 3 + 3 + 3 + 3 = 12$."],
 ["Hva er $7 \\cdot 0$?", ["0", "7", "70", "1"], "Alt ganget med 0 blir 0.",
  "What is $7 \\cdot 0$?", ["0", "7", "70", "1"], "Anything times 0 is 0."],
 ["Hvilket tall er i 5-gangen?", ["35", "32", "27", "44"], "Tall i 5-gangen slutter på 0 eller 5: $7 \\cdot 5 = 35$.",
  "Which number is in the 5 times table?", ["35", "32", "27", "44"], "Numbers in the 5 times table end in 0 or 5: $7 \\cdot 5 = 35$."],
 ["Hva er $9 \\cdot 4$?", ["36", "32", "45", "13"], "$10 \\cdot 4 - 4 = 40 - 4 = 36$.",
  "What is $9 \\cdot 4$?", ["36", "32", "45", "13"], "$10 \\cdot 4 - 4 = 40 - 4 = 36$."],
 ["Hvis $6 \\cdot 8 = 48$, hva er $8 \\cdot 6$?", ["48", "14", "86", "56"], "Rekkefølgen spiller ingen rolle i ganging.",
  "If $6 \\cdot 8 = 48$, what is $8 \\cdot 6$?", ["48", "14", "86", "56"], "The order does not matter when multiplying."],
 ["Et bord har 4 bein. Hvor mange bein har 6 bord?", ["24", "10", "20", "46"], "$6 \\cdot 4 = 24$.",
  "A table has 4 legs. How many legs do 6 tables have?", ["24", "10", "20", "46"], "$6 \\cdot 4 = 24$."]],
 () => { const a = R.i(2, 10), b = R.i(2, 10), p = a * b;
   return [T(`Hva er $${a} \\cdot ${b}$?`, `What is $${a} \\cdot ${b}$?`), N(p), T(`$${a} \\cdot ${b} = ${p}$.`, `$${a} \\cdot ${b} = ${p}$.`)]; },
 () => { const a = R.i(2, 9), b = R.i(2, 10), p = a * b, thing = R.p([["poser med", "epler", "bags of", "apples"], ["esker med", "blyanter", "boxes of", "pencils"], ["rader med", "stoler", "rows of", "chairs"]]);
   return [T(`Det er ${a} ${thing[0]} ${b} ${thing[1]}. Hvor mange ${thing[1]} er det til sammen?`, `There are ${a} ${thing[2]} ${b} ${thing[3]}. How many ${thing[3]} are there in total?`), N(p), T(`$${a} \\cdot ${b} = ${p}$.`, `$${a} \\cdot ${b} = ${p}$.`)]; },
 () => { const a = R.i(2, 10), b = R.i(2, 10), p = a * b;
   return [T(`Hva mangler? $${a} \\cdot \\square = ${p}$`, `What is missing? $${a} \\cdot \\square = ${p}$`), N(b), T(`$${a} \\cdot ${b} = ${p}$, så det mangler ${b}.`, `$${a} \\cdot ${b} = ${p}$, so ${b} is missing.`)]; }
);

U("GS14", "Deling", "Division",
`## Hva handler det om?
**Deling** er å dele likt. $12 : 3$ betyr «del 12 på 3 like grupper» – hver får 4.

## Det viktigste
- Deling er det motsatte av ganging: $12 : 3 = 4$ fordi $3 \\cdot 4 = 12$.
- Når det ikke går opp, får du en **rest**: $13 : 4 = 3$ med rest 1.
- Å dele på 1 endrer ingenting. Å dele et tall på seg selv gir 1.
- Man kan ikke dele på 0.

### Eksempel
20 kjeks deles på 5 barn. $20 : 5 = 4$, så hvert barn får 4 kjeks.

> Bruk gangetabellen baklengs: hvilket tall ganger 5 blir 20?`,
`## What is it about?
**Division** is sharing equally. $12 : 3$ means "share 12 into 3 equal groups" – each gets 4.

## Key points
- Division is the opposite of multiplication: $12 : 3 = 4$ because $3 \\cdot 4 = 12$.
- When it does not divide evenly, there is a **remainder**: $13 : 4 = 3$ remainder 1.
- Dividing by 1 changes nothing. A number divided by itself is 1.
- You cannot divide by 0.

### Example
20 biscuits are shared between 5 children. $20 : 5 = 4$, so each child gets 4 biscuits.

> Use the times tables backwards: which number times 5 makes 20?`,
[["Hva er $15 : 3$?", ["5", "3", "45", "12"], "$3 \\cdot 5 = 15$, så $15 : 3 = 5$.",
  "What is $15 : 3$?", ["5", "3", "45", "12"], "$3 \\cdot 5 = 15$, so $15 : 3 = 5$."],
 ["Hva er $9 : 9$?", ["1", "0", "9", "81"], "Et tall delt på seg selv er 1.",
  "What is $9 : 9$?", ["1", "0", "9", "81"], "A number divided by itself is 1."],
 ["Hva er resten når du deler 17 på 5?", ["2", "3", "5", "0"], "$5 \\cdot 3 = 15$, og $17 - 15 = 2$. Resten er 2.",
  "What is the remainder when you divide 17 by 5?", ["2", "3", "5", "0"], "$5 \\cdot 3 = 15$, and $17 - 15 = 2$. The remainder is 2."],
 ["Hvilket gangestykke hører til $24 : 6 = 4$?", ["$6 \\cdot 4 = 24$", "$24 \\cdot 6 = 4$", "$6 + 4 = 24$", "$24 - 6 = 4$"], "Deling og ganging henger sammen: $6 \\cdot 4 = 24$.",
  "Which multiplication belongs to $24 : 6 = 4$?", ["$6 \\cdot 4 = 24$", "$24 \\cdot 6 = 4$", "$6 + 4 = 24$", "$24 - 6 = 4$"], "Division and multiplication belong together: $6 \\cdot 4 = 24$."],
 ["30 elever skal stå i 5 like lange rekker. Hvor mange står i hver rekke?", ["6", "5", "25", "35"], "$30 : 5 = 6$.",
  "30 pupils stand in 5 equal rows. How many are in each row?", ["6", "5", "25", "35"], "$30 : 5 = 6$."],
 ["Kan du dele 8 på 0?", ["Nei, det går ikke", "Ja, det blir 0", "Ja, det blir 8", "Ja, det blir 1"], "Ingen tall ganget med 0 blir 8, så deling på 0 går ikke.",
  "Can you divide 8 by 0?", ["No, it is not possible", "Yes, it is 0", "Yes, it is 8", "Yes, it is 1"], "No number times 0 makes 8, so dividing by 0 is not possible."]],
 () => { const b = R.i(2, 10), q = R.i(2, 10), a = b * q;
   return [T(`Hva er $${a} : ${b}$?`, `What is $${a} : ${b}$?`), N(q), T(`$${b} \\cdot ${q} = ${a}$, så $${a} : ${b} = ${q}$.`, `$${b} \\cdot ${q} = ${a}$, so $${a} : ${b} = ${q}$.`)]; },
 () => { const b = R.i(2, 9), q = R.i(2, 9), r = R.i(1, b - 1), a = b * q + r;
   return [T(`Hva blir resten når du deler ${a} på ${b}?`, `What is the remainder when you divide ${a} by ${b}?`), N(r), T(`$${b} \\cdot ${q} = ${b * q}$, og $${a} - ${b * q} = ${r}$. Resten er ${r}.`, `$${b} \\cdot ${q} = ${b * q}$, and $${a} - ${b * q} = ${r}$. The remainder is ${r}.`)]; },
 () => { const kids = R.i(2, 8), each = R.i(2, 9), tot = kids * each;
   return [T(`${tot} drops deles likt på ${kids} barn. Hvor mange får hvert barn?`, `${tot} sweets are shared equally between ${kids} children. How many does each child get?`), N(each), T(`$${tot} : ${kids} = ${each}$.`, `$${tot} : ${kids} = ${each}$.`)]; }
);

U("GS14", "Klokka og penger", "Time and money",
`## Hva handler det om?
Klokka og penger bruker vi hver dag. Begge handler om å telle i hopp.

## Det viktigste
- En time har **60 minutter**. Et døgn har **24 timer**.
- **Halv tre** er 2:30 (halvveis til tre). **Kvart over** er 15 minutter over, **kvart på** er 15 minutter før.
- Digital klokke: 14:20 er 20 minutter over to om ettermiddagen.
- Norske penger: kroner. Mynter 1, 5, 10 og 20 kr, sedler 50, 100, 200, 500 og 1000 kr.
- **Veksel**: det du får tilbake = det du betaler $-$ prisen.

### Eksempel
Du kjøper en is til 27 kr og betaler med 50 kr. $50 - 27 = 23$ kr tilbake.

> Når minuttene passerer 60, går du videre til neste time.`,
`## What is it about?
We use clocks and money every day. Both are about counting in jumps.

## Key points
- An hour has **60 minutes**. A day has **24 hours**.
- **Half past two** is 2:30. **Quarter past** is 15 minutes past, **quarter to** is 15 minutes before.
- Digital clock: 14:20 is twenty past two in the afternoon.
- Norwegian money: kroner. Coins 1, 5, 10 and 20 kr, notes 50, 100, 200, 500 and 1000 kr.
- **Change**: what you get back = what you pay $-$ the price.

### Example
You buy an ice cream for 27 kr and pay with 50 kr. $50 - 27 = 23$ kr back.

> When the minutes pass 60, move on to the next hour.`,
[["Hvor mange minutter er det i en time?", ["60", "100", "24", "30"], "En time har 60 minutter.",
  "How many minutes are there in an hour?", ["60", "100", "24", "30"], "An hour has 60 minutes."],
 ["Klokka er halv fire. Hvordan ser det ut på en digital klokke?", ["3:30", "4:30", "4:00", "3:15"], "Halv fire er halvveis fra tre til fire: 3:30.",
  "Which digital time is half past three?", ["3:30", "4:30", "4:00", "3:15"], "Half past three is halfway from three to four: 3:30."],
 ["Hvor mange minutter er et kvarter?", ["15", "25", "30", "45"], "Et kvarter er en fjerdedel av 60 minutter: 15 minutter.",
  "How many minutes is a quarter of an hour?", ["15", "25", "30", "45"], "A quarter of 60 minutes is 15 minutes."],
 ["Hvor mange timer er det i et døgn?", ["24", "12", "60", "7"], "Et døgn har 24 timer.",
  "How many hours are there in a day?", ["24", "12", "60", "7"], "A day has 24 hours."],
 ["Hvilken seddel er verdt mest?", ["500 kr", "200 kr", "100 kr", "50 kr"], "500 kr er mest av disse.",
  "Which note is worth most?", ["500 kr", "200 kr", "100 kr", "50 kr"], "500 kr is the most of these."],
 ["Hva er kvart på sju?", ["6:45", "7:15", "7:45", "6:15"], "Kvart på sju er 15 minutter før sju: 6:45.",
  "What is quarter to seven?", ["6:45", "7:15", "7:45", "6:15"], "Quarter to seven is 15 minutes before seven: 6:45."]],
 () => { const pay = R.p([20, 50, 100, 200]), price = R.i(Math.round(pay * 0.3), pay - 1), back = pay - price;
   return [T(`Noe koster ${price} kr. Du betaler med ${pay} kr. Hvor mye får du igjen?`, `Something costs ${price} kr. You pay with ${pay} kr. How much change do you get?`), N(back, 0, "kr"), T(`$${pay} - ${price} = ${back}$ kr.`, `$${pay} - ${price} = ${back}$ kr.`)]; },
 () => { const h = R.i(1, 10), m = R.p([0, 10, 15, 20, 30, 40, 45]), add = R.p([15, 20, 30, 45]), tot = m + add, nh = h + Math.floor(tot / 60), nm = tot % 60;
   return [T(`Klokka er ${h}:${String(m).padStart(2, "0")}. Hvor mange minutter over er klokka om ${add} minutter?`, `The time is ${h}:${String(m).padStart(2, "0")}. How many minutes past the hour is it in ${add} minutes?`), N(nm),
     T(`${m} + ${add} = ${tot} minutter${tot >= 60 ? `, som er én time og ${nm} minutter` : ""}. Klokka blir ${nh}:${String(nm).padStart(2, "0")}, altså ${nm} minutter over.`, `${m} + ${add} = ${tot} minutes${tot >= 60 ? `, which is one hour and ${nm} minutes` : ""}. The time will be ${nh}:${String(nm).padStart(2, "0")}, so ${nm} minutes past.`)]; },
 () => { const a = R.i(2, 9), b = R.i(1, 9), price = a * 10 + b, n = R.i(2, 4), tot = price * n;
   return [T(`En bolle koster ${price} kr. Hva koster ${n} boller?`, `A bun costs ${price} kr. What do ${n} buns cost?`), N(tot, 0, "kr"), T(`$${n} \\cdot ${price} = ${tot}$ kr.`, `$${n} \\cdot ${price} = ${tot}$ kr.`)]; }
);

U("GS14", "Former og mønstre", "Shapes and patterns",
`## Hva handler det om?
Rundt oss er det former: trekanter, firkanter og sirkler. Og overalt er det mønstre som gjentar seg.

## Det viktigste
- En **trekant** har 3 sider og 3 hjørner. En **firkant** har 4. En **femkant** har 5.
- Et **kvadrat** er en firkant der alle sidene er like lange.
- En **sirkel** har ingen hjørner.
- **Omkrets** er hvor langt det er rundt en figur – legg sammen alle sidene.
- I et **tallmønster** finner du regelen: $2, 5, 8, 11$ øker med 3 hver gang, så neste er 14.

### Eksempel
Et kvadrat har sider på 4 cm. Omkretsen er $4 + 4 + 4 + 4 = 16$ cm.

> Finn regelen ved å se hvor mye tallet endrer seg fra ett ledd til det neste.`,
`## What is it about?
There are shapes all around us: triangles, squares and circles. And everywhere there are patterns that repeat.

## Key points
- A **triangle** has 3 sides and 3 corners. A **quadrilateral** has 4. A **pentagon** has 5.
- A **square** is a quadrilateral where all sides are equally long.
- A **circle** has no corners.
- The **perimeter** is the distance around a shape – add up all the sides.
- In a **number pattern** find the rule: $2, 5, 8, 11$ grows by 3 each time, so the next is 14.

### Example
A square has sides of 4 cm. The perimeter is $4 + 4 + 4 + 4 = 16$ cm.

> Find the rule by looking at how much the number changes from one term to the next.`,
[["Hvor mange hjørner har en trekant?", ["3", "4", "2", "0"], "Tre-kant: 3 hjørner og 3 sider.",
  "How many corners does a triangle have?", ["3", "4", "2", "0"], "A triangle has 3 corners and 3 sides."],
 ["Hvilken form har ingen hjørner?", ["Sirkel", "Kvadrat", "Trekant", "Femkant"], "En sirkel er rund hele veien rundt.",
  "Which shape has no corners?", ["Circle", "Square", "Triangle", "Pentagon"], "A circle is round all the way around."],
 ["Hva er neste tall: 5, 10, 15, 20, …?", ["25", "21", "30", "40"], "Mønsteret øker med 5 hver gang: $20 + 5 = 25$.",
  "What is the next number: 5, 10, 15, 20, …?", ["25", "21", "30", "40"], "The pattern grows by 5 each time: $20 + 5 = 25$."],
 ["Hva kjennetegner et kvadrat?", ["4 like lange sider", "3 sider", "Ingen hjørner", "5 hjørner"], "Et kvadrat er en firkant med fire like lange sider og rette hjørner.",
  "What is special about a square?", ["4 sides of equal length", "3 sides", "No corners", "5 corners"], "A square is a quadrilateral with four equal sides and right angles."],
 ["Hva betyr omkrets?", ["Hvor langt det er rundt figuren", "Hvor stor flaten er", "Hvor mange hjørner den har", "Hvor høy den er"], "Omkretsen er summen av alle sidene.",
  "What does perimeter mean?", ["How far it is around the shape", "How big the surface is", "How many corners it has", "How tall it is"], "The perimeter is the sum of all the sides."],
 ["Hva kommer neste: 🔺🔵🔺🔵🔺 …?", ["🔵", "🔺", "🟩", "⭐"], "Mønsteret veksler mellom trekant og sirkel.",
  "What comes next: 🔺🔵🔺🔵🔺 …?", ["🔵", "🔺", "🟩", "⭐"], "The pattern alternates between triangle and circle."]],
 () => { const a = R.i(1, 20), d = R.i(2, 9), s = [0, 1, 2, 3].map(k => a + k * d), nx = a + 4 * d;
   return [T(`Hva er neste tall: ${s.join(", ")}, …?`, `What is the next number: ${s.join(", ")}, …?`), N(nx), T(`Tallene øker med ${d} hver gang: $${s[3]} + ${d} = ${nx}$.`, `The numbers grow by ${d} each time: $${s[3]} + ${d} = ${nx}$.`)]; },
 () => { const l = R.i(2, 12), b = R.i(2, 12), o = 2 * l + 2 * b;
   return [T(`Et rektangel er ${l} cm langt og ${b} cm bredt. Hva er omkretsen?`, `A rectangle is ${l} cm long and ${b} cm wide. What is the perimeter?`), N(o, 0, "cm"), T(`$${l} + ${b} + ${l} + ${b} = ${o}$ cm.`, `$${l} + ${b} + ${l} + ${b} = ${o}$ cm.`)]; },
 () => { const [nb, en, k] = R.p([["trekanter", "triangles", 3], ["firkanter", "quadrilaterals", 4], ["femkanter", "pentagons", 5], ["sekskanter", "hexagons", 6]]), n = R.i(2, 6), tot = n * k;
   return [T(`Hvor mange hjørner har ${n} ${nb} til sammen?`, `How many corners do ${n} ${en} have in total?`), N(tot), T(`Hver har ${k} hjørner: $${n} \\cdot ${k} = ${tot}$.`, `Each has ${k} corners: $${n} \\cdot ${k} = ${tot}$.`)]; }
);

// ================= MATEMATIKK 5.–7. =================
U("GS57", "Brøk", "Fractions",
`## Hva handler det om?
En **brøk** viser en del av noe helt. $\\frac{3}{4}$ av en pizza betyr at pizzaen er delt i 4 like store biter, og du har 3 av dem.

## Det viktigste
- Tallet under streken er **nevneren**: hvor mange like deler det hele er delt i.
- Tallet over er **telleren**: hvor mange deler du har.
- **Like brøker**: $\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}$. Gang (eller del) teller og nevner med samme tall.
- **Forkorte**: $\\frac{6}{8} = \\frac{3}{4}$ (del begge på 2).
- **Brøk av et tall**: $\\frac{3}{4}$ av 20 – del på nevneren og gang med telleren: $20 : 4 \\cdot 3 = 15$.
- Lik nevner: legg sammen tellerne. $\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$.

### Eksempel
Hva er $\\frac{2}{3}$ av 12? $12 : 3 = 4$, og $4 \\cdot 2 = 8$.

> Jo større nevner, jo mindre er hver bit: $\\frac{1}{8}$ er mindre enn $\\frac{1}{4}$.`,
`## What is it about?
A **fraction** shows a part of a whole. $\\frac{3}{4}$ of a pizza means the pizza is cut into 4 equal slices, and you have 3 of them.

## Key points
- The number below the line is the **denominator**: how many equal parts the whole is split into.
- The number above is the **numerator**: how many parts you have.
- **Equivalent fractions**: $\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}$. Multiply (or divide) top and bottom by the same number.
- **Simplifying**: $\\frac{6}{8} = \\frac{3}{4}$ (divide both by 2).
- **A fraction of a number**: $\\frac{3}{4}$ of 20 – divide by the denominator and multiply by the numerator: $20 : 4 \\cdot 3 = 15$.
- Same denominator: add the numerators. $\\frac{1}{5} + \\frac{2}{5} = \\frac{3}{5}$.

### Example
What is $\\frac{2}{3}$ of 12? $12 : 3 = 4$, and $4 \\cdot 2 = 8$.

> The bigger the denominator, the smaller each piece: $\\frac{1}{8}$ is less than $\\frac{1}{4}$.`,
[["Hva er nevneren i $\\frac{3}{7}$?", ["7", "3", "10", "21"], "Nevneren er tallet under brøkstreken: 7.",
  "What is the denominator in $\\frac{3}{7}$?", ["7", "3", "10", "21"], "The denominator is the number below the line: 7."],
 ["Hvilken brøk er lik $\\frac{1}{2}$?", ["$\\frac{3}{6}$", "$\\frac{2}{3}$", "$\\frac{1}{4}$", "$\\frac{2}{2}$"], "$\\frac{3}{6}$: gang teller og nevner i $\\frac{1}{2}$ med 3.",
  "Which fraction equals $\\frac{1}{2}$?", ["$\\frac{3}{6}$", "$\\frac{2}{3}$", "$\\frac{1}{4}$", "$\\frac{2}{2}$"], "$\\frac{3}{6}$: multiply top and bottom of $\\frac{1}{2}$ by 3."],
 ["Hva er størst?", ["$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{1}{6}$", "$\\frac{1}{10}$"], "Samme teller: jo mindre nevner, jo større bit. $\\frac{1}{3}$ er størst.",
  "Which is biggest?", ["$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{1}{6}$", "$\\frac{1}{10}$"], "Same numerator: the smaller the denominator, the bigger the piece. $\\frac{1}{3}$ is biggest."],
 ["Forkort $\\frac{4}{10}$.", ["$\\frac{2}{5}$", "$\\frac{1}{4}$", "$\\frac{4}{5}$", "$\\frac{2}{10}$"], "Del teller og nevner på 2: $\\frac{2}{5}$.",
  "Simplify $\\frac{4}{10}$.", ["$\\frac{2}{5}$", "$\\frac{1}{4}$", "$\\frac{4}{5}$", "$\\frac{2}{10}$"], "Divide top and bottom by 2: $\\frac{2}{5}$."],
 ["Hva er $\\frac{2}{7} + \\frac{3}{7}$?", ["$\\frac{5}{7}$", "$\\frac{5}{14}$", "$\\frac{6}{7}$", "$\\frac{1}{7}$"], "Lik nevner: legg sammen tellerne. $2 + 3 = 5$, nevneren blir 7.",
  "What is $\\frac{2}{7} + \\frac{3}{7}$?", ["$\\frac{5}{7}$", "$\\frac{5}{14}$", "$\\frac{6}{7}$", "$\\frac{1}{7}$"], "Same denominator: add the numerators. $2 + 3 = 5$, the denominator stays 7."],
 ["Hvor mange fjerdedeler er en hel?", ["4", "1", "2", "8"], "$\\frac{4}{4} = 1$.",
  "How many quarters make a whole?", ["4", "1", "2", "8"], "$\\frac{4}{4} = 1$."]],
 () => { const d = R.p([2, 3, 4, 5, 6, 8, 10]), t = R.i(1, d - 1), k = R.i(2, 12), n = d * k, ans = k * t;
   return [T(`Hva er $\\frac{${t}}{${d}}$ av ${n}?`, `What is $\\frac{${t}}{${d}}$ of ${n}?`), N(ans), T(`$${n} : ${d} = ${k}$, og $${k} \\cdot ${t} = ${ans}$.`, `$${n} : ${d} = ${k}$, and $${k} \\cdot ${t} = ${ans}$.`)]; },
 () => { const d = R.p([5, 7, 8, 9, 10, 12]), a = R.i(1, d - 2), b = R.i(1, d - 1 - a), s = a + b;
   return [T(`Hva er telleren i svaret: $\\frac{${a}}{${d}} + \\frac{${b}}{${d}} = \\frac{?}{${d}}$`, `What is the numerator of the answer: $\\frac{${a}}{${d}} + \\frac{${b}}{${d}} = \\frac{?}{${d}}$`), N(s), T(`Lik nevner: $${a} + ${b} = ${s}$, så svaret er $\\frac{${s}}{${d}}$.`, `Same denominator: $${a} + ${b} = ${s}$, so the answer is $\\frac{${s}}{${d}}$.`)]; },
 () => { const [t, d] = R.p([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]), k = R.i(2, 6);
   return [T(`Hvilken brøk er lik $\\frac{${t}}{${d}}$?`, `Which fraction equals $\\frac{${t}}{${d}}$?`), [`$\\frac{${t * k}}{${d * k}}$`, `$\\frac{${t + k}}{${d + k}}$`, `$\\frac{${t * k}}{${d}}$`, `$\\frac{${t}}{${d * k}}$`],
     T(`Gang teller og nevner med ${k}: $\\frac{${t * k}}{${d * k}}$.`, `Multiply top and bottom by ${k}: $\\frac{${t * k}}{${d * k}}$.`)]; }
);

U("GS57", "Desimaltall", "Decimals",
`## Hva handler det om?
**Desimaltall** har siffer etter kommaet. De viser deler av en hel, akkurat som brøk.

## Det viktigste
- Første siffer etter kommaet er **tideler**, det neste **hundredeler**. 0,7 = $\\frac{7}{10}$, 0,25 = $\\frac{25}{100}$.
- Når du legger sammen eller trekker fra: **sett kommaene under hverandre**.
- Gange med 10 flytter kommaet ett steg til høyre: $3{,}4 \\cdot 10 = 34$. Med 100: to steg.
- Dele på 10 flytter kommaet ett steg til venstre: $56 : 10 = 5{,}6$.
- **Avrunding**: se på neste siffer. 5 eller mer – rund opp. 4 eller mindre – rund ned. $3{,}6 \\approx 4$.

### Eksempel
$2{,}5 + 1{,}75 = 4{,}25$. Skriv 2,50 så begge har like mange desimaler.

> 0,5 er det samme som en halv, og 0,25 er en fjerdedel.`,
`## What is it about?
**Decimals** have digits after the decimal point. They show parts of a whole, just like fractions.

## Key points
- The first digit after the point is **tenths**, the next is **hundredths**. 0.7 = $\\frac{7}{10}$, 0.25 = $\\frac{25}{100}$.
- When you add or subtract: **line up the decimal points**.
- Multiplying by 10 moves the point one step right: $3.4 \\cdot 10 = 34$. By 100: two steps.
- Dividing by 10 moves the point one step left: $56 : 10 = 5.6$.
- **Rounding**: look at the next digit. 5 or more – round up. 4 or less – round down. $3.6 \\approx 4$.

### Example
$2.5 + 1.75 = 4.25$. Write 2.50 so both have the same number of decimals.

> 0.5 is the same as a half, and 0.25 is a quarter.`,
[["Hva er 0,5 som brøk?", ["$\\frac{1}{2}$", "$\\frac{1}{5}$", "$\\frac{5}{100}$", "$\\frac{2}{5}$"], "0,5 = $\\frac{5}{10} = \\frac{1}{2}$.",
  "What is 0.5 as a fraction?", ["$\\frac{1}{2}$", "$\\frac{1}{5}$", "$\\frac{5}{100}$", "$\\frac{2}{5}$"], "0.5 = $\\frac{5}{10} = \\frac{1}{2}$."],
 ["Hvilket tall er størst?", ["0,8", "0,75", "0,09", "0,5"], "Se på tidelene: 8 tideler er mest.",
  "Which number is biggest?", ["0.8", "0.75", "0.09", "0.5"], "Look at the tenths: 8 tenths is the most."],
 ["Hva er $4{,}2 \\cdot 10$?", ["42", "4,20", "420", "0,42"], "Gange med 10: kommaet flyttes ett steg til høyre.",
  "What is $4.2 \\cdot 10$?", ["42", "4.20", "420", "0.42"], "Multiplying by 10 moves the point one step to the right."],
 ["Rund av 7,4 til nærmeste hele tall.", ["7", "8", "7,5", "74"], "Sifferet etter kommaet er 4, så vi runder ned til 7.",
  "Round 7.4 to the nearest whole number.", ["7", "8", "7.5", "74"], "The digit after the point is 4, so we round down to 7."],
 ["Hvor mange hundredeler er 0,25?", ["25", "2", "5", "250"], "0,25 = $\\frac{25}{100}$.",
  "How many hundredths is 0.25?", ["25", "2", "5", "250"], "0.25 = $\\frac{25}{100}$."],
 ["Hva er $3 : 10$?", ["0,3", "30", "3,10", "0,03"], "Dele på 10: kommaet flyttes ett steg til venstre.",
  "What is $3 : 10$?", ["0.3", "30", "3.10", "0.03"], "Dividing by 10 moves the point one step to the left."]],
 () => { const a = R.f(1, 20, 0.1), b = R.f(0.1, 9.9, 0.1), s = +(a + b).toFixed(1);
   return [T(`Hva er $${mf(a)} + ${mf(b)}$?`, `What is $${mf(a)} + ${mf(b)}$?`), N(s, 0.001), T(`Sett kommaene under hverandre: $${mf(a)} + ${mf(b)} = ${mf(s)}$.`, `Line up the decimal points: $${mf(a)} + ${mf(b)} = ${mf(s)}$.`)]; },
 () => { const a = R.f(0.1, 99.9, 0.1), k = R.p([10, 100]), p = +(a * k).toFixed(2);
   return [T(`Hva er $${mf(a)} \\cdot ${k}$?`, `What is $${mf(a)} \\cdot ${k}$?`), N(p, 0.001), T(`Flytt kommaet ${k === 10 ? "ett" : "to"} steg til høyre: ${nf(p)}.`, `Move the point ${k === 10 ? "one step" : "two steps"} to the right: ${nf(p)}.`)]; },
 () => { const a = R.f(1, 50, 0.1), r = Math.round(a);
   if(Math.abs(a - Math.floor(a) - 0.5) < 1e-9) return [T(`Rund av ${nf(a + 0.1)} til nærmeste hele tall.`, `Round ${nf(a + 0.1)} to the nearest whole number.`), N(Math.round(a + 0.1)), T(`Sifferet etter kommaet er 6, så vi runder opp til ${Math.round(a + 0.1)}.`, `The digit after the point is 6, so we round up to ${Math.round(a + 0.1)}.`)];
   return [T(`Rund av ${nf(a)} til nærmeste hele tall.`, `Round ${nf(a)} to the nearest whole number.`), N(r), T(`Se på sifferet etter kommaet: ${r > a ? "5 eller mer, rund opp" : "4 eller mindre, rund ned"}. Svaret er ${r}.`, `Look at the digit after the point: ${r > a ? "5 or more, round up" : "4 or less, round down"}. The answer is ${r}.`)]; }
);

U("GS57", "Prosent", "Percent",
`## Hva handler det om?
**Prosent** betyr «av hundre». 30 % betyr 30 av 100. Prosent brukes om rabatter, karakterer og statistikk.

## Det viktigste
- 100 % er det hele. 50 % er halvparten. 25 % er en fjerdedel. 10 % er en tidel.
- **10 % av et tall**: del på 10. 10 % av 250 er 25.
- Andre prosenter bygges av 10 %: 30 % er tre ganger 10 %. 5 % er halvparten av 10 %.
- **Rabatt**: ny pris = gammel pris $-$ rabatten.
- Prosent som desimaltall: 35 % = 0,35.

### Eksempel
En genser koster 400 kr. Det er 25 % rabatt. 25 % av 400 er 100, så den koster $400 - 100 = 300$ kr.

> Finn 10 % først – da kan du finne nesten alle andre prosenter i hodet.`,
`## What is it about?
**Percent** means "out of a hundred". 30 % means 30 out of 100. Percentages are used for discounts, scores and statistics.

## Key points
- 100 % is the whole. 50 % is half. 25 % is a quarter. 10 % is a tenth.
- **10 % of a number**: divide by 10. 10 % of 250 is 25.
- Build other percentages from 10 %: 30 % is three times 10 %. 5 % is half of 10 %.
- **Discount**: new price = old price $-$ the discount.
- Percent as a decimal: 35 % = 0.35.

### Example
A jumper costs 400 kr. There is a 25 % discount. 25 % of 400 is 100, so it costs $400 - 100 = 300$ kr.

> Find 10 % first – then you can work out almost any percentage in your head.`,
[["Hva betyr 50 %?", ["Halvparten", "En tidel", "Det hele", "En fjerdedel"], "50 av 100 er halvparten.",
  "What does 50 % mean?", ["Half", "A tenth", "The whole", "A quarter"], "50 out of 100 is half."],
 ["Hva er 10 % av 80?", ["8", "10", "80", "0,8"], "10 %: del på 10. $80 : 10 = 8$.",
  "What is 10 % of 80?", ["8", "10", "80", "0.8"], "10 %: divide by 10. $80 : 10 = 8$."],
 ["Hvilken brøk er 25 %?", ["$\\frac{1}{4}$", "$\\frac{1}{25}$", "$\\frac{1}{2}$", "$\\frac{2}{5}$"], "25 av 100 er en fjerdedel.",
  "Which fraction is 25 %?", ["$\\frac{1}{4}$", "$\\frac{1}{25}$", "$\\frac{1}{2}$", "$\\frac{2}{5}$"], "25 out of 100 is a quarter."],
 ["Hva er 7 % som desimaltall?", ["0,07", "0,7", "7,0", "70"], "7 % = $\\frac{7}{100}$ = 0,07.",
  "What is 7 % as a decimal?", ["0.07", "0.7", "7.0", "70"], "7 % = $\\frac{7}{100}$ = 0.07."],
 ["Du fikk 18 av 20 poeng. Hvor mange prosent er det?", ["90 %", "18 %", "80 %", "20 %"], "$\\frac{18}{20} = \\frac{90}{100}$ = 90 %.",
  "You got 18 out of 20 points. What percentage is that?", ["90 %", "18 %", "80 %", "20 %"], "$\\frac{18}{20} = \\frac{90}{100}$ = 90 %."],
 ["Hvor mye er 100 % av 37?", ["37", "100", "0,37", "3,7"], "100 % er det hele: 37.",
  "How much is 100 % of 37?", ["37", "100", "0.37", "3.7"], "100 % is the whole: 37."]],
 () => { const p = R.p([10, 20, 25, 50, 75, 5, 30]), base = p === 25 || p === 75 ? 4 * R.i(5, 60) : p === 5 ? 20 * R.i(2, 30) : 10 * R.i(2, 60), a = base * p / 100;
   return [T(`Hva er ${p} % av ${base}?`, `What is ${p} % of ${base}?`), N(a), T(`10 % av ${base} er ${nf(base / 10)}. ${p} % er da $${mf(base / 10)} \\cdot ${mf(p / 10)}$, altså ${nf(a)}.`, `10 % of ${base} is ${nf(base / 10)}. ${p} % is then $${mf(base / 10)} \\cdot ${mf(p / 10)}$, that is ${nf(a)}.`)]; },
 () => { const p = R.p([10, 20, 25, 50]), price = (p === 25 ? 40 : 10) * R.i(5, 50), d = price * p / 100, np = price - d;
   return [T(`En vare koster ${price} kr. Den er satt ned med ${p} %. Hva er den nye prisen?`, `An item costs ${price} kr. It is reduced by ${p} %. What is the new price?`), N(np, 0, "kr"), T(`Rabatten er ${p} % av ${price} = ${d} kr. Ny pris: $${price} - ${d} = ${np}$ kr.`, `The discount is ${p} % of ${price} = ${d} kr. New price: $${price} - ${d} = ${np}$ kr.`)]; },
 () => { const tot = R.p([10, 20, 25, 50]), got = R.i(1, tot), p = got / tot * 100;
   return [T(`Du fikk ${got} av ${tot} riktige. Hvor mange prosent er det?`, `You got ${got} out of ${tot} right. What percentage is that?`), N(p, 0.01, "%"), T(`$\\frac{${got}}{${tot}} = ${mf(got / tot)}$, altså ${nf(p)} %.`, `$\\frac{${got}}{${tot}} = ${mf(got / tot)}$, that is ${nf(p)} %.`)]; }
);

U("GS57", "Areal og omkrets", "Area and perimeter",
`## Hva handler det om?
**Omkrets** er hvor langt det er rundt en figur. **Areal** er hvor stor flaten inni er.

## Det viktigste
- Omkrets: legg sammen alle sidene. Måles i cm, m …
- Areal av et **rektangel**: lengde · bredde. Måles i **kvadratcentimeter** (cm²) eller kvadratmeter (m²).
- Areal av et **kvadrat**: side · side.
- Areal av en **trekant**: $\\frac{\\text{grunnlinje} \\cdot \\text{høyde}}{2}$ – halvparten av et rektangel.
- 1 cm² er en rute på 1 cm ganger 1 cm.

### Eksempel
Et rom er 4 m langt og 3 m bredt. Areal: $4 \\cdot 3 = 12$ m². Omkrets: $4 + 3 + 4 + 3 = 14$ m.

> Areal har «²» i enheten fordi vi ganger to lengder.`,
`## What is it about?
The **perimeter** is the distance around a shape. The **area** is how big the surface inside is.

## Key points
- Perimeter: add up all the sides. Measured in cm, m …
- Area of a **rectangle**: length · width. Measured in **square centimetres** (cm²) or square metres (m²).
- Area of a **square**: side · side.
- Area of a **triangle**: $\\frac{\\text{base} \\cdot \\text{height}}{2}$ – half of a rectangle.
- 1 cm² is a square of 1 cm by 1 cm.

### Example
A room is 4 m long and 3 m wide. Area: $4 \\cdot 3 = 12$ m². Perimeter: $4 + 3 + 4 + 3 = 14$ m.

> Area has "²" in the unit because we multiply two lengths.`,
[["Hvilken enhet passer for areal?", ["cm²", "cm", "kg", "liter"], "Areal måles i kvadratenheter, for eksempel cm².",
  "Which unit fits for area?", ["cm²", "cm", "kg", "litre"], "Area is measured in square units, for example cm²."],
 ["Et kvadrat har sider på 5 cm. Hva er arealet?", ["25 cm²", "20 cm²", "10 cm²", "25 cm"], "$5 \\cdot 5 = 25$ cm².",
  "A square has sides of 5 cm. What is its area?", ["25 cm²", "20 cm²", "10 cm²", "25 cm"], "$5 \\cdot 5 = 25$ cm²."],
 ["Hvorfor deler vi på 2 i arealet av en trekant?", ["Trekanten er halvparten av et rektangel", "Den har 2 sider", "Det er en regel uten grunn", "Den har 2 hjørner"], "En trekant med samme grunnlinje og høyde er halvparten av rektangelet.",
  "Why do we divide by 2 for the area of a triangle?", ["The triangle is half of a rectangle", "It has 2 sides", "It is a rule without a reason", "It has 2 corners"], "A triangle with the same base and height is half of the rectangle."],
 ["Et rektangel er 6 cm langt og 2 cm bredt. Hva er omkretsen?", ["16 cm", "12 cm", "8 cm", "12 cm²"], "$6 + 2 + 6 + 2 = 16$ cm.",
  "A rectangle is 6 cm long and 2 cm wide. What is the perimeter?", ["16 cm", "12 cm", "8 cm", "12 cm²"], "$6 + 2 + 6 + 2 = 16$ cm."],
 ["To figurer har samme areal. Har de alltid samme omkrets?", ["Nei", "Ja", "Bare hvis de er trekanter", "Bare hvis de er røde"], "Et 1 · 4-rektangel og et 2 · 2-kvadrat har begge areal 4, men omkretsene er 10 og 8.",
  "Two shapes have the same area. Do they always have the same perimeter?", ["No", "Yes", "Only if they are triangles", "Only if they are red"], "A 1 · 4 rectangle and a 2 · 2 square both have area 4, but their perimeters are 10 and 8."],
 ["Hva er 1 m² i dm²?", ["100 dm²", "10 dm²", "1000 dm²", "1 dm²"], "1 m = 10 dm, så 1 m² = $10 \\cdot 10 = 100$ dm².",
  "What is 1 m² in dm²?", ["100 dm²", "10 dm²", "1000 dm²", "1 dm²"], "1 m = 10 dm, so 1 m² = $10 \\cdot 10 = 100$ dm²."]],
 () => { const l = R.i(2, 15), b = R.i(2, 12), a = l * b;
   return [T(`Et rektangel er ${l} cm langt og ${b} cm bredt. Hva er arealet?`, `A rectangle is ${l} cm long and ${b} cm wide. What is its area?`), N(a, 0, "cm²"), T(`$${l} \\cdot ${b} = ${a}$ cm².`, `$${l} \\cdot ${b} = ${a}$ cm².`)]; },
 () => { const g = 2 * R.i(2, 10), h = R.i(2, 12), a = g * h / 2;
   return [T(`En trekant har grunnlinje ${g} cm og høyde ${h} cm. Hva er arealet?`, `A triangle has base ${g} cm and height ${h} cm. What is its area?`), N(a, 0, "cm²"), T(`$\\frac{${g} \\cdot ${h}}{2} = ${a}$ cm².`, `$\\frac{${g} \\cdot ${h}}{2} = ${a}$ cm².`)]; },
 () => { const s = R.i(2, 15), o = 4 * s;
   return [T(`Et kvadrat har sider på ${s} m. Hva er omkretsen?`, `A square has sides of ${s} m. What is the perimeter?`), N(o, 0, "m"), T(`Fire like sider: $4 \\cdot ${s} = ${o}$ m.`, `Four equal sides: $4 \\cdot ${s} = ${o}$ m.`)]; }
);

U("GS57", "Måling og enheter", "Measurement and units",
`## Hva handler det om?
Vi måler lengde, vekt, volum og tid. **Enheten** forteller hva vi har målt med.

## Det viktigste
- Lengde: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.
- Vekt (masse): 1 kg = 1000 g. 1 tonn = 1000 kg.
- Volum: 1 liter = 10 dl = 1000 ml.
- Tid: 1 time = 60 min, 1 min = 60 s.
- Fra stor til liten enhet: **gang**. Fra liten til stor: **del**.

### Eksempel
2,5 m i cm: $2{,}5 \\cdot 100 = 250$ cm.

> «Kilo» betyr tusen: kilometer = 1000 meter, kilogram = 1000 gram.`,
`## What is it about?
We measure length, weight, volume and time. The **unit** tells us what we measured with.

## Key points
- Length: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.
- Weight (mass): 1 kg = 1000 g. 1 tonne = 1000 kg.
- Volume: 1 litre = 10 dl = 1000 ml.
- Time: 1 hour = 60 min, 1 min = 60 s.
- From a big unit to a small one: **multiply**. From small to big: **divide**.

### Example
2.5 m in cm: $2.5 \\cdot 100 = 250$ cm.

> "Kilo" means thousand: kilometre = 1000 metres, kilogram = 1000 grams.`,
[["Hvor mange meter er 1 km?", ["1000", "100", "10", "10 000"], "Kilo betyr tusen: 1 km = 1000 m.",
  "How many metres is 1 km?", ["1000", "100", "10", "10 000"], "Kilo means thousand: 1 km = 1000 m."],
 ["Hvilken enhet passer best for vekten til et eple?", ["gram", "tonn", "meter", "liter"], "Et eple veier rundt 150 gram.",
  "Which unit fits best for the weight of an apple?", ["grams", "tonnes", "metres", "litres"], "An apple weighs about 150 grams."],
 ["Hvor mange dl er 1 liter?", ["10", "100", "1000", "1"], "1 liter = 10 dl.",
  "How many dl is 1 litre?", ["10", "100", "1000", "1"], "1 litre = 10 dl."],
 ["Du gjør om fra m til cm. Ganger eller deler du?", ["Ganger med 100", "Deler på 100", "Ganger med 10", "Deler på 10"], "Fra stor til liten enhet ganger du. 1 m = 100 cm.",
  "You convert from m to cm. Do you multiply or divide?", ["Multiply by 100", "Divide by 100", "Multiply by 10", "Divide by 10"], "From a big unit to a small one you multiply. 1 m = 100 cm."],
 ["Hvor mange sekunder er 2 minutter?", ["120", "60", "200", "100"], "$2 \\cdot 60 = 120$ s.",
  "How many seconds are 2 minutes?", ["120", "60", "200", "100"], "$2 \\cdot 60 = 120$ s."],
 ["Hva veier mest?", ["2 kg", "1500 g", "900 g", "1 kg"], "2 kg = 2000 g, som er mest.",
  "Which weighs most?", ["2 kg", "1500 g", "900 g", "1 kg"], "2 kg = 2000 g, which is the most."]],
 () => { const [from, to, k, nb, en] = R.p([["m", "cm", 100, "", ""], ["km", "m", 1000, "", ""], ["kg", "g", 1000, "", ""], ["l", "dl", 10, "", ""], ["cm", "mm", 10, "", ""], ["l", "ml", 1000, "", ""]]), a = R.p([R.i(2, 20), R.f(0.5, 9.5, 0.5)]), r = +(a * k).toFixed(3);
   return [T(`Hvor mange ${to} er ${nf(a)} ${from}?`, `How many ${to} is ${nf(a)} ${from}?`), N(r, 0.001, to), T(`1 ${from} = ${k} ${to}, så $${mf(a)} \\cdot ${k} = ${mf(r)}$ ${to}.`, `1 ${from} = ${k} ${to}, so $${mf(a)} \\cdot ${k} = ${mf(r)}$ ${to}.`)]; },
 () => { const m = R.i(2, 12), s = m * 60;
   return [T(`Hvor mange sekunder er ${m} minutter?`, `How many seconds are ${m} minutes?`), N(s, 0, "s"), T(`$${m} \\cdot 60 = ${s}$ s.`, `$${m} \\cdot 60 = ${s}$ s.`)]; },
 () => { const cm = 10 * R.i(15, 900), m = cm / 100;
   return [T(`Hvor mange meter er ${cm} cm?`, `How many metres is ${cm} cm?`), N(m, 0.001, "m"), T(`Fra liten til stor enhet: del på 100. $${cm} : 100 = ${mf(m)}$ m.`, `From a small to a big unit: divide by 100. $${cm} : 100 = ${mf(m)}$ m.`)]; }
);

U("GS57", "Statistikk", "Statistics",
`## Hva handler det om?
Statistikk er å samle tall og beskrive dem kort. Hva er vanlig? Hvor stor er forskjellen?

## Det viktigste
- **Gjennomsnitt**: legg sammen alle tallene og del på hvor mange det er.
- **Median**: tallet i midten når du sorterer fra minst til størst.
- **Typetall**: tallet som forekommer flest ganger.
- **Variasjonsbredde**: største $-$ minste.
- Et **søylediagram** viser hvor mange det er i hver gruppe.

### Eksempel
Tallene 2, 4, 4, 5, 10. Gjennomsnitt: $\\frac{25}{5} = 5$. Median: 4. Typetall: 4. Variasjonsbredde: $10 - 2 = 8$.

> Ett veldig stort tall drar gjennomsnittet opp, men medianen påvirkes nesten ikke.`,
`## What is it about?
Statistics is collecting numbers and describing them briefly. What is typical? How big is the spread?

## Key points
- **Mean**: add all the numbers and divide by how many there are.
- **Median**: the middle number when you sort from smallest to largest.
- **Mode**: the number that occurs most often.
- **Range**: largest $-$ smallest.
- A **bar chart** shows how many there are in each group.

### Example
The numbers 2, 4, 4, 5, 10. Mean: $\\frac{25}{5} = 5$. Median: 4. Mode: 4. Range: $10 - 2 = 8$.

> One very large number pulls the mean up, but the median hardly changes.`,
[["Hva er typetallet i 3, 5, 5, 7, 9?", ["5", "7", "3", "9"], "5 forekommer to ganger, oftere enn de andre.",
  "What is the mode of 3, 5, 5, 7, 9?", ["5", "7", "3", "9"], "5 occurs twice, more often than the others."],
 ["Hva må du gjøre først for å finne medianen?", ["Sortere tallene", "Legge sammen tallene", "Dele på 2", "Finne det største"], "Medianen er tallet i midten når tallene er sortert.",
  "What must you do first to find the median?", ["Sort the numbers", "Add the numbers", "Divide by 2", "Find the largest"], "The median is the middle number when the numbers are sorted."],
 ["Hva er gjennomsnittet av 4 og 8?", ["6", "12", "4", "2"], "$\\frac{4 + 8}{2} = 6$.",
  "What is the mean of 4 and 8?", ["6", "12", "4", "2"], "$\\frac{4 + 8}{2} = 6$."],
 ["Hva er variasjonsbredden i 12, 3, 8, 15?", ["12", "15", "3", "38"], "$15 - 3 = 12$.",
  "What is the range of 12, 3, 8, 15?", ["12", "15", "3", "38"], "$15 - 3 = 12$."],
 ["Hvilket mål påvirkes mest av ett veldig stort tall?", ["Gjennomsnittet", "Medianen", "Typetallet", "Ingen av dem"], "Det store tallet legges med i summen, så gjennomsnittet øker mye.",
  "Which measure is affected most by one very large number?", ["The mean", "The median", "The mode", "None of them"], "The large number is included in the sum, so the mean rises a lot."],
 ["Hva viser et søylediagram?", ["Hvor mange det er i hver gruppe", "Tiden på dagen", "Bare gjennomsnittet", "Prosent av ingenting"], "Høyden på søylene viser antallet i hver gruppe.",
  "What does a bar chart show?", ["How many there are in each group", "The time of day", "Only the mean", "Percent of nothing"], "The height of the bars shows the number in each group."]],
 () => { const n = R.p([3, 4, 5]), m = R.i(3, 15), xs = Array.from({ length: n - 1 }, () => R.i(1, 20)), last = m * n - xs.reduce((a, b) => a + b, 0);
   if(last < 0 || last > 40) return [T("Hva er gjennomsnittet av 2, 4 og 6?", "What is the mean of 2, 4 and 6?"), N(4), T("$\\frac{2 + 4 + 6}{3} = \\frac{12}{3} = 4$.", "$\\frac{2 + 4 + 6}{3} = \\frac{12}{3} = 4$.")];
   const all = R.p([true, false]) ? [...xs, last] : [last, ...xs];
   return [T(`Hva er gjennomsnittet av ${all.join(", ")}?`, `What is the mean of ${all.join(", ")}?`), N(m), T(`Summen er ${m * n}, og det er ${n} tall: $\\frac{${m * n}}{${n}} = ${m}$.`, `The sum is ${m * n}, and there are ${n} numbers: $\\frac{${m * n}}{${n}} = ${m}$.`)]; },
 () => { const xs = Array.from({ length: 5 }, () => R.i(1, 30)), s = [...xs].sort((a, b) => a - b), med = s[2];
   return [T(`Hva er medianen av ${xs.join(", ")}?`, `What is the median of ${xs.join(", ")}?`), N(med), T(`Sortert: ${s.join(", ")}. Tallet i midten er ${med}.`, `Sorted: ${s.join(", ")}. The middle number is ${med}.`)]; },
 () => { const xs = R.distinct(5, 1, 40), r = Math.max(...xs) - Math.min(...xs);
   return [T(`Hva er variasjonsbredden i ${xs.join(", ")}?`, `What is the range of ${xs.join(", ")}?`), N(r), T(`Største minus minste: $${Math.max(...xs)} - ${Math.min(...xs)} = ${r}$.`, `Largest minus smallest: $${Math.max(...xs)} - ${Math.min(...xs)} = ${r}$.`)]; }
);

U("GS57", "Enkle likninger", "Simple equations",
`## Hva handler det om?
En **likning** er et regnestykke med et tall du ikke vet, ofte kalt $x$. Å løse likningen er å finne $x$.

## Det viktigste
- Tenk på en **vekt** i balanse: det som står på hver side av $=$ veier like mye.
- Gjør det samme på begge sider, så holder balansen.
- $x + 5 = 12$: trekk fra 5 på begge sider. $x = 7$.
- $3x = 15$: del på 3 på begge sider. $x = 5$.
- **Sjekk** svaret: sett det inn. $7 + 5 = 12$ ✓.

### Eksempel
$2x + 3 = 11$. Trekk fra 3: $2x = 8$. Del på 2: $x = 4$. Sjekk: $2 \\cdot 4 + 3 = 11$ ✓.

> $3x$ betyr $3 \\cdot x$.`,
`## What is it about?
An **equation** is a sum with a number you do not know, often called $x$. Solving the equation means finding $x$.

## Key points
- Think of **scales** in balance: what is on each side of $=$ weighs the same.
- Do the same thing on both sides and the balance holds.
- $x + 5 = 12$: subtract 5 on both sides. $x = 7$.
- $3x = 15$: divide by 3 on both sides. $x = 5$.
- **Check** the answer: put it back in. $7 + 5 = 12$ ✓.

### Example
$2x + 3 = 11$. Subtract 3: $2x = 8$. Divide by 2: $x = 4$. Check: $2 \\cdot 4 + 3 = 11$ ✓.

> $3x$ means $3 \\cdot x$.`,
[["Hva betyr $4x$?", ["$4 \\cdot x$", "$4 + x$", "$x - 4$", "$40 + x$"], "Et tall rett foran $x$ betyr ganging.",
  "What does $4x$ mean?", ["$4 \\cdot x$", "$4 + x$", "$x - 4$", "$40 + x$"], "A number right in front of $x$ means multiplying."],
 ["Løs $x + 6 = 10$.", ["$x = 4$", "$x = 16$", "$x = 6$", "$x = 10$"], "Trekk fra 6 på begge sider: $x = 10 - 6 = 4$.",
  "Solve $x + 6 = 10$.", ["$x = 4$", "$x = 16$", "$x = 6$", "$x = 10$"], "Subtract 6 on both sides: $x = 10 - 6 = 4$."],
 ["Løs $5x = 20$.", ["$x = 4$", "$x = 15$", "$x = 100$", "$x = 25$"], "Del på 5 på begge sider: $x = 4$.",
  "Solve $5x = 20$.", ["$x = 4$", "$x = 15$", "$x = 100$", "$x = 25$"], "Divide by 5 on both sides: $x = 4$."],
 ["Hva må du gjøre for å løse $x - 3 = 9$?", ["Legge til 3 på begge sider", "Trekke fra 3 på begge sider", "Gange med 3", "Dele på 9"], "Legg til 3: $x = 12$.",
  "What must you do to solve $x - 3 = 9$?", ["Add 3 on both sides", "Subtract 3 on both sides", "Multiply by 3", "Divide by 9"], "Add 3: $x = 12$."],
 ["Er $x = 3$ en løsning av $2x + 1 = 7$?", ["Ja", "Nei", "Bare hvis $x$ er 7", "Det kan man ikke vite"], "$2 \\cdot 3 + 1 = 7$ ✓.",
  "Is $x = 3$ a solution of $2x + 1 = 7$?", ["Yes", "No", "Only if $x$ is 7", "You cannot know"], "$2 \\cdot 3 + 1 = 7$ ✓."],
 ["Hvorfor må du gjøre det samme på begge sider?", ["Så likheten fortsatt stemmer", "Fordi det ser pent ut", "Det trenger du ikke", "For å få et større tall"], "Som en vekt: endrer du bare én side, er den ikke lenger i balanse.",
  "Why must you do the same on both sides?", ["So the equality still holds", "Because it looks nice", "You do not need to", "To get a bigger number"], "Like scales: if you change only one side, it is no longer balanced."]],
 () => { const x = R.i(1, 30), a = R.i(2, 30), b = x + a;
   return [T(`Løs $x + ${a} = ${b}$.`, `Solve $x + ${a} = ${b}$.`), N(x), T(`Trekk fra ${a} på begge sider: $x = ${b} - ${a} = ${x}$.`, `Subtract ${a} on both sides: $x = ${b} - ${a} = ${x}$.`)]; },
 () => { const x = R.i(2, 12), a = R.i(2, 9), b = a * x;
   return [T(`Løs $${a}x = ${b}$.`, `Solve $${a}x = ${b}$.`), N(x), T(`Del på ${a} på begge sider: $x = ${b} : ${a} = ${x}$.`, `Divide by ${a} on both sides: $x = ${b} : ${a} = ${x}$.`)]; },
 () => { const x = R.i(1, 10), a = R.i(2, 6), c = R.i(1, 15), b = a * x + c;
   return [T(`Løs $${a}x + ${c} = ${b}$.`, `Solve $${a}x + ${c} = ${b}$.`), N(x), T(`Trekk fra ${c}: $${a}x = ${b - c}$. Del på ${a}: $x = ${x}$.`, `Subtract ${c}: $${a}x = ${b - c}$. Divide by ${a}: $x = ${x}$.`)]; }
);
// ================= LK20-hull: måling, koding, negative tall/koordinater, sannsynlighet =================
U("GS14", "Måle og veie", "Measuring and weighing",
`## Hva handler det om?
Når vi måler, finner vi ut hvor langt, hvor tungt eller hvor mye noe er. Vi bruker linjal, vekt og litermål.

## Det viktigste
- **Lengde** måler vi i millimeter (mm), centimeter (cm) og meter (m). 1 cm er 10 mm, og 1 meter er 100 centimeter.
- **Vekt** måler vi i gram (g) og kilogram (kg). 1 kilo er 1000 gram.
- **Hvor mye det er plass til** måler vi i liter (L) og desiliter (dL). 1 liter er 10 desiliter.
- På linjalen begynner du å måle ved **0** – ikke ved kanten.

### Eksempel
En blyant er 15 cm lang. To blyanter etter hverandre blir $15 + 15 = 30$ cm.

> Velg en enhet som passer: en maur måler vi i millimeter, en blyant i centimeter og en fotballbane i meter.`,
`## What is it about?
When we measure, we find out how long, how heavy or how much something is. We use a ruler, scales and a measuring jug.

## Key points
- **Length** is measured in millimetres (mm), centimetres (cm) and metres (m). 1 cm is 10 mm, and 1 metre is 100 centimetres.
- **Weight** is measured in grams (g) and kilograms (kg). 1 kilo is 1000 grams.
- **How much fits inside** is measured in litres (L) and decilitres (dL). 1 litre is 10 decilitres.
- On a ruler you start measuring at **0** – not at the edge.

### Example
A pencil is 15 cm long. Two pencils end to end make $15 + 15 = 30$ cm.

> Pick a unit that fits: an ant in millimetres, a pencil in centimetres and a football pitch in metres.`,
[["Hvor mange centimeter er 1 meter?", ["100", "10", "1000", "60"], "1 meter er 100 centimeter.",
  "How many centimetres are there in 1 metre?", ["100", "10", "1000", "60"], "1 metre is 100 centimetres."],
 ["Hvor mange gram er 1 kilogram?", ["1000", "100", "10", "60"], "1 kilogram er 1000 gram.",
  "How many grams are there in 1 kilogram?", ["1000", "100", "10", "60"], "1 kilogram is 1000 grams."],
 ["Hvilken enhet passer best for lengden av en fotballbane?", ["meter", "centimeter", "gram", "liter"], "En fotballbane er omtrent 100 meter lang – meter passer.",
  "Which unit fits best for the length of a football pitch?", ["metres", "centimetres", "grams", "litres"], "A football pitch is about 100 metres long – metres fit."],
 ["Hva veier mest?", ["1 kg poteter", "500 g smør", "100 g sjokolade", "10 g godteri"], "1 kg er 1000 g, og det er mer enn de andre.",
  "Which weighs the most?", ["1 kg of potatoes", "500 g of butter", "100 g of chocolate", "10 g of sweets"], "1 kg is 1000 g, more than the others."],
 ["Hvor mange desiliter er 1 liter?", ["10", "100", "1000", "5"], "1 liter er 10 desiliter.",
  "How many decilitres are there in 1 litre?", ["10", "100", "1000", "5"], "1 litre is 10 decilitres."],
 ["Hvor begynner du å måle på linjalen?", ["Ved 0", "Ved 1", "Ved kanten av linjalen", "Hvor som helst"], "Du legger tingen inntil 0-streken. Kanten er ofte litt før 0.",
  "Where do you start measuring on a ruler?", ["At 0", "At 1", "At the edge of the ruler", "Anywhere"], "Put the object at the 0 mark. The edge is often a little before 0."],
 ["Hvilken enhet passer for hvor mye vann det er i en bøtte?", ["liter", "meter", "kilometer", "minutter"], "Hvor mye det er plass til, måler vi i liter.",
  "Which unit fits for how much water there is in a bucket?", ["litres", "metres", "kilometres", "minutes"], "How much fits inside is measured in litres."],
 ["En bok er 2 cm tykk. Hvor høy er en stabel med 5 bøker?", ["10 cm", "7 cm", "25 cm", "52 cm"], "$5 \\cdot 2 = 10$ cm.",
  "A book is 2 cm thick. How tall is a pile of 5 books?", ["10 cm", "7 cm", "25 cm", "52 cm"], "$5 \\cdot 2 = 10$ cm."]],
 () => { const a = R.i(1, 9); return [T(`Hvor mange centimeter er ${a} meter?`, `How many centimetres are ${a} metres?`), N(a * 100, 0, "cm"), T(`1 m = 100 cm, så ${a} m = $${a} \\cdot 100 = ${a * 100}$ cm.`, `1 m = 100 cm, so ${a} m = $${a} \\cdot 100 = ${a * 100}$ cm.`)]; },
 () => { const a = R.i(1, 5), b = R.i(1, 9) * 100; return [T(`En pakke veier ${a} kg og ${b} g. Hvor mange gram er det til sammen?`, `A parcel weighs ${a} kg and ${b} g. How many grams is that in total?`), N(a * 1000 + b, 0, "g"), T(`${a} kg = ${a * 1000} g. $${a * 1000} + ${b} = ${a * 1000 + b}$ g.`, `${a} kg = ${a * 1000} g. $${a * 1000} + ${b} = ${a * 1000 + b}$ g.`)]; },
 () => { const n = who(), a = R.i(60, 140), b = R.i(60, 140); return [T(`${n} hopper ${a} cm i første hopp og ${b} cm i andre. Hvor langt er det til sammen?`, `${n} jumps ${a} cm the first time and ${b} cm the second. How far is that in total?`), N(a + b, 0, "cm"), T(`$${a} + ${b} = ${a + b}$ cm.`, `$${a} + ${b} = ${a + b}$ cm.`)]; }
);

U("GS14", "Koding: steg for steg", "Coding: step by step",
`## Hva handler det om?
En datamaskin gjør nøyaktig det vi sier – verken mer eller mindre. Derfor må beskjedene være klare og stå i riktig rekkefølge. En slik oppskrift kaller vi en **algoritme**.

## Det viktigste
- En **algoritme** er en oppskrift med steg som gjøres ett for ett.
- **Rekkefølgen** betyr noe: du tar på sokkene *før* skoene.
- En **løkke** gjentar noe: «gjenta 4 ganger: gå 1 fram» er det samme som å skrive «gå 1 fram» fire ganger.
- En feil i koden kalles en **bug**. Å finne og rette feilen heter å **feilsøke**.

### Eksempel
Roboten ser mot høyre. Koden «gå 2 fram, snu til venstre, gå 1 fram» flytter den 2 ruter til høyre og så 1 rute opp.

> Les koden ett steg om gangen, og flytt fingeren på rutenettet mens du leser.`,
`## What is it about?
A computer does exactly what we tell it – no more, no less. So the instructions must be clear and in the right order. A recipe like that is called an **algorithm**.

## Key points
- An **algorithm** is a recipe with steps done one at a time.
- **Order** matters: you put on your socks *before* your shoes.
- A **loop** repeats something: "repeat 4 times: move 1 forward" is the same as writing "move 1 forward" four times.
- A mistake in code is called a **bug**. Finding and fixing it is called **debugging**.

### Example
The robot faces right. The code "move 2 forward, turn left, move 1 forward" moves it 2 squares right and then 1 square up.

> Read the code one step at a time and move your finger on the grid as you read.`,
[["Hva er en algoritme?", ["En oppskrift med steg i riktig rekkefølge", "En type datamaskin", "Et dataspill", "En feil i koden"], "En algoritme er en oppskrift – steg som gjøres ett for ett.",
  "What is an algorithm?", ["A recipe with steps in the right order", "A type of computer", "A computer game", "A mistake in the code"], "An algorithm is a recipe – steps done one at a time."],
 ["Hva kaller vi en feil i koden?", ["En bug", "En løkke", "En algoritme", "En robot"], "En feil i koden kalles en bug (engelsk for «insekt»).",
  "What do we call a mistake in code?", ["A bug", "A loop", "An algorithm", "A robot"], "A mistake in code is called a bug."],
 ["Hvilken rekkefølge er riktig når du pusser tennene?", ["Tannkrem på børsten → puss → skyll", "Puss → tannkrem på børsten → skyll", "Skyll → puss → tannkrem på børsten", "Puss → skyll → tannkrem på børsten"], "Tannkremen må på før du pusser, og du skyller til slutt.",
  "Which order is right when you brush your teeth?", ["Toothpaste on the brush → brush → rinse", "Brush → toothpaste on the brush → rinse", "Rinse → brush → toothpaste on the brush", "Brush → rinse → toothpaste on the brush"], "The toothpaste goes on before you brush, and you rinse at the end."],
 ["«Gjenta 3 ganger: hopp». Hvor mange hopp blir det?", ["3", "1", "4", "6"], "Løkka gjør «hopp» 3 ganger.",
  "\"Repeat 3 times: jump\". How many jumps is that?", ["3", "1", "4", "6"], "The loop does \"jump\" 3 times."],
 ["«Gjenta 4 ganger: gå 2 fram». Hvor mange ruter går roboten?", ["8", "6", "4", "2"], "$4 \\cdot 2 = 8$ ruter.",
  "\"Repeat 4 times: move 2 forward\". How many squares does the robot move?", ["8", "6", "4", "2"], "$4 \\cdot 2 = 8$ squares."],
 ["Roboten ser mot høyre og får beskjeden «snu til venstre». Hvilken vei ser den nå?", ["Opp", "Ned", "Til venstre", "Til høyre"], "Ser du mot høyre og snur deg en kvart runde mot venstre, ser du opp.",
  "The robot faces right and is told \"turn left\". Which way does it face now?", ["Up", "Down", "Left", "Right"], "Facing right and turning a quarter turn to the left, you face up."],
 ["Hvorfor må beskjedene til en datamaskin være helt nøyaktige?", ["Den gjør akkurat det som står – den gjetter ikke", "Den blir lei seg ellers", "Den liker lange beskjeder", "Det spiller ingen rolle"], "En datamaskin forstår ikke hva du mente, bare hva du skrev.",
  "Why must instructions to a computer be exact?", ["It does exactly what is written – it doesn't guess", "It gets sad otherwise", "It likes long messages", "It doesn't matter"], "A computer doesn't understand what you meant, only what you wrote."],
 ["Hva er en løkke i koding?", ["Noe som gjentas flere ganger", "En feil", "Det første steget", "En tegning"], "En løkke gjentar de samme stegene.",
  "What is a loop in coding?", ["Something that repeats several times", "A mistake", "The first step", "A drawing"], "A loop repeats the same steps."]],
 () => { const n = R.i(2, 6), k = R.i(2, 5); return [T(`«Gjenta ${n} ganger: gå ${k} fram». Hvor mange ruter går roboten?`, `"Repeat ${n} times: move ${k} forward". How many squares does the robot move?`), N(n * k), T(`Løkka går ${n} ganger, ${k} ruter hver gang: $${n} \\cdot ${k} = ${n * k}$.`, `The loop runs ${n} times, ${k} squares each time: $${n} \\cdot ${k} = ${n * k}$.`)]; },
 () => { const a = R.i(4, 9), b = R.i(1, a - 1), c = R.i(1, 6), e = a - b + c; return [T(`En robot står på 0 på en tallinje. Koden er: «gå ${a} fram, gå ${b} tilbake, gå ${c} fram». Hvor står den nå?`, `A robot stands at 0 on a number line. The code is: "move ${a} forward, move ${b} back, move ${c} forward". Where is it now?`), N(e), T(`$${a} - ${b} + ${c} = ${e}$.`, `$${a} - ${b} + ${c} = ${e}$.`)]; },
 () => { const n = R.i(3, 8); return [T(`«Gjenta ${n} ganger: gå 2 fram og 1 tilbake». Hvor langt fra start kommer roboten?`, `"Repeat ${n} times: move 2 forward and 1 back". How far from the start does the robot get?`), N(n), T(`Hver runde kommer den $2 - 1 = 1$ rute videre. Etter ${n} runder: ${n} ruter.`, `Each round it gets $2 - 1 = 1$ square further. After ${n} rounds: ${n} squares.`)]; }
);

U("GS57", "Negative tall og koordinater", "Negative numbers and coordinates",
`## Hva handler det om?
Termometeret viser minusgrader om vinteren. Tall under null kaller vi **negative tall**. Med to tallinjer på kryss kan vi også vise hvor et punkt er – det kalles et **koordinatsystem**.

## Det viktigste
- Negative tall står til venstre for 0 på tallinja. $-3$ er mindre enn $-1$.
- Fra $-4$ grader til $3$ grader har det blitt $7$ grader varmere.
- Et punkt skrives $(x, y)$: gå først $x$ sidelengs, så $y$ opp eller ned. Punktet $(3, 2)$ er 3 til høyre og 2 opp.
- Negativ $x$ betyr til **venstre**, negativ $y$ betyr **ned**. Punktet $(-2, -1)$ er 2 til venstre og 1 ned.
- Der aksene krysser hverandre, er **origo**: $(0, 0)$.

### Eksempel
Det er $-2$ grader om morgenen og $5$ grader om ettermiddagen. Det har blitt $2 + 5 = 7$ grader varmere.

> Sidelengs først, så opp eller ned – gå inn døra før du går i trappa.`,
`## What is it about?
Thermometers show minus degrees in winter. Numbers below zero are called **negative numbers**. With two number lines crossing, we can also show where a point is – that is a **coordinate system**.

## Key points
- Negative numbers are to the left of 0 on the number line. $-3$ is less than $-1$.
- From $-4$ degrees to $3$ degrees it has become $7$ degrees warmer.
- A point is written $(x, y)$: first go $x$ sideways, then $y$ up or down. The point $(3, 2)$ is 3 right and 2 up.
- Negative $x$ means **left**, negative $y$ means **down**. The point $(-2, -1)$ is 2 left and 1 down.
- Where the axes cross is the **origin**: $(0, 0)$.

### Example
It is $-2$ degrees in the morning and $5$ degrees in the afternoon. It has become $2 + 5 = 7$ degrees warmer.

> Sideways first, then up or down – walk in the door before you take the stairs.`,
[["Hvilket tall er minst?", ["$-5$", "$-1$", "$0$", "$2$"], "Jo lenger til venstre på tallinja, jo mindre. $-5$ er lengst til venstre.",
  "Which number is the smallest?", ["$-5$", "$-1$", "$0$", "$2$"], "The further left on the number line, the smaller. $-5$ is furthest left."],
 ["Det er $-3$ grader. Det blir 4 grader varmere. Hva viser termometeret nå?", ["$1$ grad", "$7$ grader", "$-7$ grader", "$-1$ grad"], "Fra $-3$ går du 4 steg opp: $-2, -1, 0, 1$.",
  "It is $-3$ degrees. It gets 4 degrees warmer. What does the thermometer show now?", ["$1$ degree", "$7$ degrees", "$-7$ degrees", "$-1$ degree"], "From $-3$ go 4 steps up: $-2, -1, 0, 1$."],
 ["Hvor ligger punktet $(4, 1)$?", ["4 til høyre og 1 opp", "1 til høyre og 4 opp", "4 til venstre og 1 ned", "5 til høyre"], "Første tall er sidelengs (positiv = høyre), andre tall er opp eller ned (positiv = opp).",
  "Where is the point $(4, 1)$?", ["4 right and 1 up", "1 right and 4 up", "4 left and 1 down", "5 right"], "The first number is sideways (positive = right), the second is up or down (positive = up)."],
 ["Hvor ligger punktet $(-3, 2)$?", ["3 til venstre og 2 opp", "3 til høyre og 2 opp", "2 til venstre og 3 opp", "3 til venstre og 2 ned"], "$x = -3$ er negativ, altså 3 til venstre. $y = 2$ er positiv, altså 2 opp.",
  "Where is the point $(-3, 2)$?", ["3 left and 2 up", "3 right and 2 up", "2 left and 3 up", "3 left and 2 down"], "$x = -3$ is negative, so 3 left. $y = 2$ is positive, so 2 up."],
 ["Hvor ligger punktet $(2, -4)$?", ["2 til høyre og 4 ned", "2 til venstre og 4 ned", "4 til høyre og 2 ned", "2 til høyre og 4 opp"], "$x = 2$: 2 til høyre. $y = -4$ er negativ: 4 ned.",
  "Where is the point $(2, -4)$?", ["2 right and 4 down", "2 left and 4 down", "4 right and 2 down", "2 right and 4 up"], "$x = 2$: 2 right. $y = -4$ is negative: 4 down."],
 ["Hvilket punkt ligger 1 til venstre og 3 ned fra origo?", ["$(-1, -3)$", "$(1, 3)$", "$(-3, -1)$", "$(1, -3)$"], "Venstre gir negativ $x$, ned gir negativ $y$: $(-1, -3)$.",
  "Which point is 1 left and 3 down from the origin?", ["$(-1, -3)$", "$(1, 3)$", "$(-3, -1)$", "$(1, -3)$"], "Left gives negative $x$, down gives negative $y$: $(-1, -3)$."],
 ["Hva heter punktet $(0, 0)$?", ["Origo", "Diagonalen", "Vinkelen", "Arealet"], "Der aksene krysser, er origo.",
  "What is the point $(0, 0)$ called?", ["The origin", "The diagonal", "The angle", "The area"], "Where the axes cross is the origin."],
 ["Hvilket tall ligger midt mellom $-4$ og $4$?", ["$0$", "$4$", "$-4$", "$8$"], "Begge er 4 steg fra 0.",
  "Which number is halfway between $-4$ and $4$?", ["$0$", "$4$", "$-4$", "$8$"], "Both are 4 steps from 0."],
 ["Hvilket tall er størst?", ["$-2$", "$-7$", "$-10$", "De er like store"], "$-2$ er nærmest 0 og lengst til høyre av disse.",
  "Which number is the biggest?", ["$-2$", "$-7$", "$-10$", "They are equal"], "$-2$ is closest to 0 and furthest right of these."],
 ["Hvor mange steg er det fra $-6$ til $-1$ på tallinja?", ["5", "7", "6", "$-7$"], "Tell: $-5, -4, -3, -2, -1$ – 5 steg.",
  "How many steps is it from $-6$ to $-1$ on the number line?", ["5", "7", "6", "$-7$"], "Count: $-5, -4, -3, -2, -1$ – 5 steps."],
 ["Hvilket tall er 3 mindre enn 1?", ["$-2$", "$2$", "$4$", "$-3$"], "$1 - 3 = -2$. Gå 3 steg til venstre fra 1.",
  "Which number is 3 less than 1?", ["$-2$", "$2$", "$4$", "$-3$"], "$1 - 3 = -2$. Go 3 steps left from 1."]],
 () => { const a = R.i(1, 9), b = R.i(1, 9); return [T(`Om natta er det $-${a}$ grader. Om dagen er det $${b}$ grader. Hvor mange grader varmere er det om dagen?`, `At night it is $-${a}$ degrees. In the daytime it is $${b}$ degrees. How many degrees warmer is it in the daytime?`), N(a + b, 0, "grader"), T(`Fra $-${a}$ opp til 0 er ${a} grader, og fra 0 opp til ${b} er ${b} grader: $${a} + ${b} = ${a + b}$.`, `From $-${a}$ up to 0 is ${a} degrees, and from 0 up to ${b} is ${b} degrees: $${a} + ${b} = ${a + b}$.`)]; },
 () => { const a = R.i(2, 12), b = R.i(1, 15), e = b - a; return [T(`Regn ut $-${a} + ${b}$.`, `Work out $-${a} + ${b}$.`), N(e), T(`Start på $-${a}$ og gå ${b} steg mot høyre. Du ender på $${e}$.`, `Start at $-${a}$ and move ${b} steps right. You end at $${e}$.`)]; },
 () => { const y = R.i(1, 6), x1 = R.i(-5, 1), x2 = R.i(x1 + 2, 7); return [T(`Hvor mange ruter er det bortover fra punktet $(${x1}, ${y})$ til punktet $(${x2}, ${y})$?`, `How many squares across is it from the point $(${x1}, ${y})$ to the point $(${x2}, ${y})$?`), N(x2 - x1), T(`Begge har $y = ${y}$, så vi teller bare bortover: $${x2} - (${x1}) = ${x2 - x1}$.`, `Both have $y = ${y}$, so we only count across: $${x2} - (${x1}) = ${x2 - x1}$.`)]; }
);

U("GS57", "Sannsynlighet", "Probability",
`## Hva handler det om?
Noe er **sikkert**, noe er **umulig**, og det meste er et sted midt imellom. Sannsynlighet sier hvor stor sjanse det er for at noe skjer.

## Det viktigste
- Sjansen går fra **0** (umulig) til **1** (sikkert). «Like stor sjanse» er $\\frac{1}{2}$.
- Når alle utfallene er **like sannsynlige**: sannsynlighet = antall utfall som passer, delt på antall mulige utfall.
- En vanlig (rettferdig) terning har 6 like sider. Sjansen for å få en sekser er $\\frac{1}{6}$.
- En rettferdig mynt har to sider som er like sannsynlige. Sjansen for kron er $\\frac{1}{2}$.
- Prøver du mange ganger, blir andelen ganger det skjer (den relative frekvensen) som regel nær sannsynligheten. Det gjelder mange forsøk til sammen, ikke hvert enkelt kast.

### Eksempel
I en pose er det 3 røde kuler og 1 blå. Sjansen for rød er $\\frac{3}{4}$, fordi 3 av de 4 kulene er røde.

> Tell først alle mulige utfall. Tell så dem som passer.`,
`## What is it about?
Some things are **certain**, some are **impossible**, and most are somewhere in between. Probability says how big the chance is that something happens.

## Key points
- The chance goes from **0** (impossible) to **1** (certain). "Even chance" is $\\frac{1}{2}$.
- When all outcomes are **equally likely**: probability = number of outcomes that fit, divided by the number of possible outcomes.
- An ordinary (fair) die has 6 equal faces. The chance of a six is $\\frac{1}{6}$.
- A fair coin has two equally likely sides. The chance of heads is $\\frac{1}{2}$.
- If you try many times, the share of times it happens (the relative frequency) is usually close to the probability. That holds for many tries together, not for each single throw.

### Example
A bag has 3 red balls and 1 blue. The chance of red is $\\frac{3}{4}$, because 3 of the 4 balls are red.

> First count all possible outcomes. Then count the ones that fit.`,
[["Hva er sjansen for å få 7 på en vanlig terning?", ["$0$ – det er umulig", "$\\frac{1}{6}$", "$\\frac{1}{7}$", "$1$"], "En vanlig terning har bare 1–6. Å få 7 er umulig.",
  "What is the chance of getting 7 on an ordinary die?", ["$0$ – it is impossible", "$\\frac{1}{6}$", "$\\frac{1}{7}$", "$1$"], "An ordinary die only has 1–6. Getting 7 is impossible."],
 ["Du kaster en rettferdig mynt. Hva er sjansen for kron?", ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$", "$1$"], "To like mulige sider, én av dem er kron.",
  "You toss a fair coin. What is the chance of heads?", ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$", "$1$"], "Two equally likely sides, one of them is heads."],
 ["Hva er sjansen for et partall på en terning?", ["$\\frac{1}{2}$", "$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], "Partallene er 2, 4 og 6 – 3 av 6, altså $\\frac{3}{6} = \\frac{1}{2}$.",
  "What is the chance of an even number on a die?", ["$\\frac{1}{2}$", "$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"], "The even numbers are 2, 4 and 6 – 3 of 6, so $\\frac{3}{6} = \\frac{1}{2}$."],
 ["Hvilket ord passer når sannsynligheten er 1?", ["Sikkert", "Umulig", "Lite sannsynlig", "Like stor sjanse"], "1 betyr at det skjer hver gang.",
  "Which word fits when the probability is 1?", ["Certain", "Impossible", "Unlikely", "Even chance"], "1 means it happens every time."],
 ["En pose har 2 røde og 8 grønne kuler. Hvilken farge trekker du mest sannsynlig?", ["Grønn", "Rød", "Like stor sjanse", "Blå"], "Det er flest grønne: 8 av 10.",
  "A bag has 2 red and 8 green balls. Which colour are you most likely to draw?", ["Green", "Red", "Even chance", "Blue"], "There are most green: 8 of 10."],
 ["Et lykkehjul har 4 like store felt. Ett av dem er gull. Hva er sjansen for gull?", ["$\\frac{1}{4}$", "$\\frac{1}{3}$", "$\\frac{3}{4}$", "$4$"], "1 felt passer av 4 mulige.",
  "A spinner has 4 equal sections. One of them is gold. What is the chance of gold?", ["$\\frac{1}{4}$", "$\\frac{1}{3}$", "$\\frac{3}{4}$", "$4$"], "1 section fits out of 4 possible."],
 ["Du kaster en terning 600 ganger. Omtrent hvor mange seksere får du?", ["100", "6", "300", "600"], "Sjansen er $\\frac{1}{6}$, og $600 : 6 = 100$. Det blir sjelden nøyaktig 100, men som regel i nærheten.",
  "You roll a die 600 times. About how many sixes do you get?", ["100", "6", "300", "600"], "The chance is $\\frac{1}{6}$, and $600 : 6 = 100$. Rarely exactly 100, but close."],
 ["Hva betyr sannsynlighet 0?", ["Det kan aldri skje", "Det skjer alltid", "Det skjer halvparten av gangene", "Det skjer nesten alltid"], "0 er umulig – det skjer aldri.",
  "What does probability 0 mean?", ["It can never happen", "It always happens", "It happens half the time", "It almost always happens"], "0 is impossible – it never happens."]],
 () => { const [r, b] = R.p([[1, 3], [3, 1], [1, 4], [2, 3], [3, 2], [1, 9], [3, 7], [7, 3], [1, 19], [5, 15]]), p = r * 100 / (r + b);
   return [T(`En pose har ${r} røde og ${b} blå kuler. Hva er sjansen for å trekke en rød, i prosent?`, `A bag has ${r} red and ${b} blue balls. What is the chance of drawing a red one, in percent?`), N(p, 0, "%"), T(`${r} av ${r + b} kuler er røde: $\\frac{${r}}{${r + b}} = ${mf(p)}\\ \\%$.`, `${r} of ${r + b} balls are red: $\\frac{${r}}{${r + b}} = ${mf(p)}\\ \\%$.`)]; },
 () => { const n = R.i(2, 20) * 6; return [T(`Du kaster en terning ${n} ganger. Omtrent hvor mange seksere kan du vente å få?`, `You roll a die ${n} times. About how many sixes can you expect?`), N(n / 6), T(`Sjansen for sekser er $\\frac{1}{6}$: $${n} : 6 = ${n / 6}$.`, `The chance of a six is $\\frac{1}{6}$: $${n} : 6 = ${n / 6}$.`)]; },
 () => { const f = R.p([4, 5, 6, 8, 10]), k = R.i(1, f - 1), w = [`$\\frac{${k}}{${f}}$`, `$\\frac{${f - k}}{${f}}$`, `$\\frac{1}{${f}}$`, `$\\frac{${k}}{${f + k}}$`, `$\\frac{${f}}{${k}}$`];
   const o = w.filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
   return [T(`Et lykkehjul har ${f} like store felt. ${k} av dem gir premie. Hva er sjansen for premie?`, `A spinner has ${f} equal sections. ${k} of them win a prize. What is the chance of a prize?`), o, T(`${k} felt passer av ${f} mulige: $\\frac{${k}}{${f}}$.`, `${k} sections fit out of ${f} possible: $\\frac{${k}}{${f}}$.`)]; }
);

})();
