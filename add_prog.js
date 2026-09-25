// ============================================================
//  add_prog.js – teori, faste oppgaver og generatorer for
//  MEK1300 (Python), MEK3100 (videregående programmering),
//  NUM (numeriske metoder) og MEK2200 (statistikk).
//  Alt ligger i en IIFE slik at hjelpefunksjonene ikke kolliderer med andre add_-filer.
// ============================================================
(() => {
// md`...`: rå tekst (enkle backslasher), ´ blir til backtick. Brukes uten ${}-interpolasjon.
const md = s => s.raw[0].replace(/´/g, "`");
const CB = s => "```" + s + "```";                        // kodeblokk i oppgavetekst
const pn = x => (x < 0 ? `(${x})` : String(x));            // tall i parentes hvis negativt
const lin = (a, b, x1, x2) => {                            // a*x1 + b*x2 som LaTeX
  const t1 = a === 0 ? "" : `${cf(a)}${x1}`;
  const t2 = b === 0 ? "" : (t1 ? (b < 0 ? ` - ${cf(-b)}${x2}` : ` + ${cf(b)}${x2}`) : `${cf(b)}${x2}`);
  return (t1 + t2) || "0";
};

// ================================================================
// MEK1300 Programmering med Python
// ================================================================

// ---------- Enhet 0: Grunnleggende Python ----------
THEORY("MEK1300", 0, {
nb: md`## Hva handler det om?
Et program er en oppskrift som datamaskinen følger linje for linje. I Python lagrer du verdier i **variabler**, regner med dem og skriver ut resultatet. Som ingeniør bruker du dette til å automatisere beregninger, lese måledata og teste ideer raskt, i stedet for å taste det samme inn på kalkulatoren hundre ganger.

Alt i Python har en **type**. Typen bestemmer hva du kan gjøre med verdien: tall kan du regne med, tekst kan du skjære opp og sette sammen.

## Begreper og formler
- **Variabel:** et navn som peker på en verdi. ´x = 5´ betyr «la x peke på 5» (tilordning). Det er ikke en ligning.
- **Typer:** ´int´ (heltall, ´7´), ´float´ (desimaltall, ´7.0´), ´str´ (tekst, ´"hei"´), ´bool´ (´True´ eller ´False´) og ´list´ (´[1, 2, 3]´).
- **Regneoperatorer:** ´+ - * /´, ´//´ (heltallsdivisjon, runder ned), ´%´ (rest) og ´**´ (potens).
- **Presedens:** ´**´ regnes før ´* / // %´, som igjen regnes før ´+ -´. Operatorer på samme nivå regnes fra venstre mot høyre. Bruk parenteser når du er i tvil.
- ´/´ gir alltid ´float´. ´//´ og ´%´ runder mot minus uendelig, så ´-7 // 2´ er ´-4´.
- **Indeksering:** første tegn har indeks 0, og ´s[-1]´ er det siste. **Utsnitt:** ´s[a:b]´ tar med indeks a til og med b − 1.
- **Konvertering:** ´int("42")´, ´float("2.5")´ og ´str(3)´. ´int(6.9)´ kutter desimalene og gir 6.
- **Utskrift:** ´print(f"F = {F:.1f} N")´ setter verdien inn i teksten med én desimal.

## Slik løser du oppgavene
1. Les koden linje for linje, og skriv ned verdien til hver variabel etter hver linje.
2. Finn typen til hver verdi (int, float eller str) før du regner.
3. Regn ut uttrykk i riktig rekkefølge: parenteser, så ´**´, så ´* / // %´ fra venstre, og til slutt ´+ -´.
4. Sjekk om svaret blir heltall eller desimaltall, og hvordan det skrives ut.

### Eksempel
En sensor sender teksten ´"L=1234mm"´. Vi vil ha lengden i meter:
´´´
s = "L=1234mm"
mm = int(s[2:-2])
m = mm / 1000
print(m, mm // 1000, mm % 1000)
´´´
1. ´s[2:-2]´ starter på indeks 2 (etter ´L=´) og stopper før de to siste tegnene. Det gir ´"1234"´.
2. ´int("1234")´ gjør teksten om til heltallet 1234.
3. ´mm / 1000´ gir float-verdien 1,234.
4. ´mm // 1000´ er 1 (hele meter), og ´mm % 1000´ er 234 (resten i millimeter).

Utskriften blir ´1.234 1 234´. Legg merke til at Python alltid bruker punktum som desimaltegn.

## Vanlige feil
- Å tro at ´input()´ gir et tall. Den gir alltid en streng, så du må skrive ´float(input())´.
- Å glemme at indekser starter på 0, og at sluttindeksen i et utsnitt ikke er med.
- Å bruke ´=´ (tilordning) når du mener ´==´ (sammenligning).
- Å sammenligne desimaltall med ´==´. ´0.1 + 0.2 == 0.3´ er ´False´ fordi desimaltall lagres binært med avrunding.
- Å legge sammen tekst og tall: ´"5" + 3´ gir ´TypeError´. Konverter først.

> Følg verdiene linje for linje og hold styr på typen. De fleste overraskelser i Python skyldes at en verdi har en annen type enn du tror.`,
en: md`## What is it about?
A program is a recipe that the computer follows line by line. In Python you store values in **variables**, calculate with them and print the result. As an engineer you use this to automate calculations, read measurement data and test ideas quickly, instead of typing the same thing into a calculator a hundred times.

Everything in Python has a **type**. The type decides what you can do with a value: you can calculate with numbers, and you can slice and join text.

## Concepts and formulas
- **Variable:** a name that refers to a value. ´x = 5´ means "let x refer to 5" (assignment). It is not an equation.
- **Types:** ´int´ (integer, ´7´), ´float´ (decimal number, ´7.0´), ´str´ (text, ´"hello"´), ´bool´ (´True´ or ´False´) and ´list´ (´[1, 2, 3]´).
- **Arithmetic operators:** ´+ - * /´, ´//´ (floor division, rounds down), ´%´ (remainder) and ´**´ (power).
- **Precedence:** ´**´ is evaluated before ´* / // %´, which in turn come before ´+ -´. Operators on the same level are evaluated from left to right. Use parentheses when in doubt.
- ´/´ always gives a ´float´. ´//´ and ´%´ round towards minus infinity, so ´-7 // 2´ is ´-4´.
- **Indexing:** the first character has index 0, and ´s[-1]´ is the last one. **Slicing:** ´s[a:b]´ includes indices a up to and including b − 1.
- **Conversion:** ´int("42")´, ´float("2.5")´ and ´str(3)´. ´int(6.9)´ drops the decimals and gives 6.
- **Output:** ´print(f"F = {F:.1f} N")´ inserts the value into the text with one decimal.

## How to solve the problems
1. Read the code line by line, and write down the value of every variable after each line.
2. Find the type of each value (int, float or str) before you calculate.
3. Evaluate expressions in the right order: parentheses, then ´**´, then ´* / // %´ from the left, and finally ´+ -´.
4. Check whether the result is an integer or a float, and how it is printed.

### Example
A sensor sends the text ´"L=1234mm"´. We want the length in meters:
´´´
s = "L=1234mm"
mm = int(s[2:-2])
m = mm / 1000
print(m, mm // 1000, mm % 1000)
´´´
1. ´s[2:-2]´ starts at index 2 (after ´L=´) and stops before the last two characters. This gives ´"1234"´.
2. ´int("1234")´ turns the text into the integer 1234.
3. ´mm / 1000´ gives the float 1.234.
4. ´mm // 1000´ is 1 (whole meters), and ´mm % 1000´ is 234 (the remaining millimeters).

The output is ´1.234 1 234´.

## Common mistakes
- Believing that ´input()´ returns a number. It always returns a string, so you must write ´float(input())´.
- Forgetting that indices start at 0 and that the end index of a slice is not included.
- Using ´=´ (assignment) when you mean ´==´ (comparison).
- Comparing floats with ´==´. ´0.1 + 0.2 == 0.3´ is ´False´ because floats are stored in binary with rounding.
- Adding text and numbers: ´"5" + 3´ raises ´TypeError´. Convert first.

> Follow the values line by line and keep track of the types. Most surprises in Python happen because a value has a different type than you think.`
});

BIQ("MEK1300", 0, [
  [md`Hvilken type har verdien som ´input()´ returnerer?`, ["str", "int", "float", "Det avhenger av hva brukeren skriver"],
   md`´input()´ gir alltid en streng, også når brukeren skriver et tall. Bruk ´float(input())´ eller ´int(input())´ for å regne med verdien.`,
   md`What type is the value returned by ´input()´?`, ["str", "int", "float", "It depends on what the user types"],
   md`´input()´ always returns a string, even when the user types a number. Use ´float(input())´ or ´int(input())´ to calculate with the value.`],
  [md`Hva skriver ´print(-7 // 2, -7 % 2)´ ut?`, ["-4 1", "-3 -1", "-3 1", "-4 -1"],
   md`´//´ runder ned mot minus uendelig, så $-3{,}5$ blir $-4$. Resten følger av $-7 = (-4)\cdot 2 + 1$, så ´%´ gir 1.`,
   md`What does ´print(-7 // 2, -7 % 2)´ print?`, ["-4 1", "-3 -1", "-3 1", "-4 -1"],
   md`´//´ rounds down towards minus infinity, so $-3.5$ becomes $-4$. The remainder follows from $-7 = (-4)\cdot 2 + 1$, so ´%´ gives 1.`],
  [md`Hva skriver ´print(0.1 + 0.2 == 0.3)´ ut?`, ["False", "True", "0.3", "SyntaxError"],
   md`Desimaltall lagres binært, og 0,1 og 0,2 kan ikke lagres eksakt. Summen blir ´0.30000000000000004´. Sammenlign derfor med en toleranse, for eksempel ´abs(a - b) < 1e-9´ eller ´math.isclose(a, b)´.`,
   md`What does ´print(0.1 + 0.2 == 0.3)´ print?`, ["False", "True", "0.3", "SyntaxError"],
   md`Floats are stored in binary, and 0.1 and 0.2 cannot be stored exactly. The sum becomes ´0.30000000000000004´. Compare with a tolerance instead, e.g. ´abs(a - b) < 1e-9´ or ´math.isclose(a, b)´.`],
  [md`Hva skriver ´print(2 + 3 * 4 ** 2 // 5)´ ut?`, { n: 11, tol: 0, u: "" },
   md`Potens først: $4^2 = 16$. Så ´*´ og ´//´ fra venstre mot høyre: ´3 * 16´ = 48 og ´48 // 5´ = 9. Til slutt 2 + 9 = 11.`,
   md`What does ´print(2 + 3 * 4 ** 2 // 5)´ print?`, null,
   md`Power first: $4^2 = 16$. Then ´*´ and ´//´ from left to right: ´3 * 16´ = 48 and ´48 // 5´ = 9. Finally 2 + 9 = 11.`]
]);

GEN("MEK1300", 0,
 // enkel: type til et uttrykk
 ()=>{ const op=R.p(["+","-","*","/","//"]), aF=R.i(0,2)===0, bF=R.i(0,2)===0, a=R.i(3,15), b=R.i(2,6);
   const as=aF?(a+0.5).toFixed(1):String(a), bs=bF?(b+0.5).toFixed(1):String(b), ex=`${as} ${op} ${bs}`;
   const res=(op==="/"||aF||bF)?"float":"int", opts=[res,...["int","float","str","bool"].filter(x=>x!==res)];
   const why = op==="/" ? T("`/` gir alltid float i Python 3, også når divisjonen går opp.","`/` always gives a float in Python 3, even when the division is exact.")
     : (aF||bF) ? T(`Minst én av operandene er float, og da blir resultatet float (også for \`${op}\`).`,`At least one operand is a float, so the result is a float (also for \`${op}\`).`)
     : T(`Begge operandene er int, og \`${op}\` mellom to int gir int.`,`Both operands are ints, and \`${op}\` between two ints gives an int.`);
   return [T(`Hvilken type har uttrykket \`${ex}\`?`,`What type does the expression \`${ex}\` have?`), opts, why]; },
 // middels: presedens
 ()=>{ const a=R.i(1,9), b=R.i(2,5), c=R.i(2,5), d=R.i(3,7), e=R.i(10,30), f=R.i(3,7);
   const C=c*c, P=b*C, Q=Math.floor(P/d), M=e%f, v=a+Q-M, ex=`${a} + ${b} * ${c} ** 2 // ${d} - ${e} % ${f}`;
   return [T(`Hva skriver \`print(${ex})\` ut?`,`What does \`print(${ex})\` print?`),{n:v,tol:0,u:""},
     T(`Først \`**\`: $${c}^2 = ${C}$. Så \`*\`, \`//\` og \`%\` fra venstre mot høyre: $${b}\\cdot ${C} = ${P}$, \`${P} // ${d}\` = ${Q} og \`${e} % ${f}\` = ${M}. Til slutt $${a} + ${Q} - ${M} = ${v}$.`,
       `First \`**\`: $${c}^2 = ${C}$. Then \`*\`, \`//\` and \`%\` from left to right: $${b}\\cdot ${C} = ${P}$, \`${P} // ${d}\` = ${Q} and \`${e} % ${f}\` = ${M}. Finally $${a} + ${Q} - ${M} = ${v}$.`)]; },
 // eksamen: tolke sensortekst
 ()=>{ const k=R.i(100,950), c=k/10, cs=c.toFixed(1), F=c*9/5+32, Fr=Math.round(F*10)/10;
   const code=[`s = "T=${cs}C"`,"c = float(s[2:-1])","f = c * 9 / 5 + 32","print(round(f, 1))"].join("\n");
   return [T(`En temperatursensor sender teksten i koden under (grader Celsius). Programmet regner om til Fahrenheit. Hva skriver det ut?${CB(code)}`,`A temperature sensor sends the text in the code below (degrees Celsius). The program converts it to Fahrenheit. What does it print?${CB(code)}`),{n:Fr,tol:0.01,u:""},
     T(`\`s[2:-1]\` tar med indeks 2 og fram til (men ikke med) siste tegn: \`"${cs}"\`. \`float\` gjør teksten om til tallet ${nf(c,1)}. Så er $f = ${mf(c,1)}\\cdot 9/5 + 32 = ${mf(F,2)}$, og \`round(f, 1)\` gir ${nf(Fr,1)}.`,
       `\`s[2:-1]\` takes index 2 up to (but not including) the last character: \`"${cs}"\`. \`float\` turns the text into the number ${nf(c,1)}. Then $f = ${mf(c,1)}\\cdot 9/5 + 32 = ${mf(F,2)}$, and \`round(f, 1)\` gives ${nf(Fr,1)}.`)]; }
);

// ---------- Enhet 1: Løkker og betingelser ----------
THEORY("MEK1300", 1, {
nb: md`## Hva handler det om?
Et program blir virkelig nyttig først når det kan ta valg og gjenta arbeid. **Betingelser** (´if´) lar programmet velge vei ut fra dataene, for eksempel å slå av en pumpe når trykket blir for høyt. **Løkker** (´for´ og ´while´) gjentar kode, for eksempel for å gå gjennom tusen måleverdier eller simulere en prosess minutt for minutt.

## Begreper og formler
- ´if´ / ´elif´ / ´else´: Python sjekker betingelsene ovenfra og ned og kjører **bare den første** grenen som er sann.
- Sammenligning: ´==´, ´!=´, ´<´, ´<=´, ´>´ og ´>=´. Logikk: ´and´, ´or´ og ´not´. Kjeder som ´0 < x < 10´ er lov.
- Sannhetsverdier: ´0´, ´0.0´, ´""´, ´[]´ og ´None´ regnes som usanne. Alt annet regnes som sant.
- ´for x in liste:´ går gjennom elementene ett for ett.
- ´range(start, stopp, steg)´ gir heltall fra start og opp til, men **ikke med**, stopp. ´range(a, b)´ gir b − a verdier.
- ´while betingelse:´ gjentar så lenge betingelsen er sann. Noe inne i løkka må endre betingelsen, ellers går den evig.
- ´break´ avslutter hele løkka. ´continue´ hopper over resten av runden og går til neste.
- **Innrykk** (fire mellomrom) bestemmer hva som hører til løkka eller ´if´-setningen.
- Vanlige mønstre: akkumulator (´total += x´), teller (´n += 1´) og søk (´if ...: break´).

## Slik løser du oppgavene
1. Lag en tabell med én kolonne per variabel og én rad per runde i løkka.
2. I en ´while´-løkke sjekker du betingelsen **før** hver runde.
3. Følg innrykket nøye: hva skjer inne i løkka, og hva skjer etterpå?
4. Stopp når betingelsen blir usann eller ´break´ kjøres, og les av verdiene.
5. Kontroller første og siste runde ekstra nøye. Det er der de fleste feilene skjer.

### Eksempel
En tank inneholder 500 L og tappes med 20 % av innholdet hvert minutt. Etter hvor mange minutter er det under 100 L igjen?
´´´
V = 500.0
t = 0
while V >= 100:
    V = 0.8 * V
    t += 1
print(t)
´´´
Verditabell (V etter hver runde): t = 1: 400, t = 2: 320, t = 3: 256, t = 4: 204,8, t = 5: 163,84, t = 6: 131,07, t = 7: 104,86 og t = 8: 83,89. Nå er ´V >= 100´ usann, og løkka stopper. Utskriften er 8.

Kontroll med matematikk: $500\cdot 0{,}8^t < 100$ gir $t > \ln 0{,}2/\ln 0{,}8 \approx 7{,}2$, altså 8 minutter.

## Vanlige feil
- Å tro at ´range(1, 5)´ tar med 5. Den gir 1, 2, 3 og 4.
- Å skrive to ´if´ når du mente ´if´ og ´elif´. Da kan begge grenene kjøre.
- Å glemme å oppdatere variabelen i en ´while´-løkke, slik at løkka aldri stopper.
- Feil innrykk: en linje som skulle vært inne i løkka, kjører bare én gang etterpå.
- Å regne én runde for mye eller for lite (off-by-one).

> Løkker og betingelser forstår du best med en verditabell. Skriv ned variablene for hver runde, så blir svaret sjelden feil.`,
en: md`## What is it about?
A program only becomes really useful when it can make decisions and repeat work. **Conditions** (´if´) let the program choose a path based on the data, for example switching off a pump when the pressure gets too high. **Loops** (´for´ and ´while´) repeat code, for example to go through a thousand measurements or to simulate a process minute by minute.

## Concepts and formulas
- ´if´ / ´elif´ / ´else´: Python checks the conditions from the top down and runs **only the first** branch that is true.
- Comparison: ´==´, ´!=´, ´<´, ´<=´, ´>´ and ´>=´. Logic: ´and´, ´or´ and ´not´. Chains such as ´0 < x < 10´ are allowed.
- Truth values: ´0´, ´0.0´, ´""´, ´[]´ and ´None´ count as false. Everything else counts as true.
- ´for x in my_list:´ goes through the elements one at a time.
- ´range(start, stop, step)´ gives integers from start up to, but **not including**, stop. ´range(a, b)´ gives b − a values.
- ´while condition:´ repeats as long as the condition is true. Something inside the loop must change the condition, or it runs forever.
- ´break´ ends the whole loop. ´continue´ skips the rest of the current iteration and moves to the next one.
- **Indentation** (four spaces) decides what belongs to the loop or the ´if´ statement.
- Common patterns: accumulator (´total += x´), counter (´n += 1´) and search (´if ...: break´).

## How to solve the problems
1. Make a table with one column per variable and one row per iteration.
2. In a ´while´ loop, check the condition **before** every iteration.
3. Follow the indentation carefully: what happens inside the loop, and what happens after it?
4. Stop when the condition becomes false or ´break´ runs, and read off the values.
5. Check the first and the last iteration extra carefully. That is where most mistakes happen.

### Example
A tank holds 500 L and 20% of the contents is drained every minute. After how many minutes is there less than 100 L left?
´´´
V = 500.0
t = 0
while V >= 100:
    V = 0.8 * V
    t += 1
print(t)
´´´
Value table (V after each iteration): t = 1: 400, t = 2: 320, t = 3: 256, t = 4: 204.8, t = 5: 163.84, t = 6: 131.07, t = 7: 104.86 and t = 8: 83.89. Now ´V >= 100´ is false, and the loop stops. The output is 8.

Check with mathematics: $500\cdot 0.8^t < 100$ gives $t > \ln 0.2/\ln 0.8 \approx 7.2$, i.e. 8 minutes.

## Common mistakes
- Believing that ´range(1, 5)´ includes 5. It gives 1, 2, 3 and 4.
- Writing two ´if´ statements when you meant ´if´ and ´elif´. Then both branches can run.
- Forgetting to update the variable in a ´while´ loop, so that the loop never stops.
- Wrong indentation: a line that should have been inside the loop runs only once afterwards.
- Doing one iteration too many or too few (off-by-one).

> Loops and conditions are easiest to understand with a value table. Write down the variables for every iteration, and your answer will rarely be wrong.`
});

BIQ("MEK1300", 1, [
  [md`Hva skriver koden ut?´´´x = 7
if x > 5:
    print("A")
if x > 3:
    print("B")´´´`, ["A og B", "Bare A", "Bare B", "Ingenting"],
   md`To separate ´if´-setninger sjekkes hver for seg. Begge betingelsene er sanne, så både A og B skrives ut. Med ´elif´ i stedet for den andre ´if´ ville bare A blitt skrevet ut.`,
   md`What does the code print?´´´x = 7
if x > 5:
    print("A")
if x > 3:
    print("B")´´´`, ["A and B", "Only A", "Only B", "Nothing"],
   md`Two separate ´if´ statements are checked independently. Both conditions are true, so both A and B are printed. With ´elif´ instead of the second ´if´, only A would have been printed.`],
  [md`Hva gir ´not (3 > 2 and 2 > 5)´?`, ["True", "False", "None", "SyntaxError"],
   md`´3 > 2´ er True og ´2 > 5´ er False. ´True and False´ er False, og ´not False´ er True.`,
   md`What does ´not (3 > 2 and 2 > 5)´ give?`, ["True", "False", "None", "SyntaxError"],
   md`´3 > 2´ is True and ´2 > 5´ is False. ´True and False´ is False, and ´not False´ is True.`],
  [md`Hva skriver koden ut?´´´n = 0
total = 0
while total <= 50:
    n += 1
    total += n * n
print(n)´´´`, { n: 5, tol: 0, u: "" },
   md`total blir 1, 5, 14, 30 og 55. Etter runden med n = 5 er total = 55, som er større enn 50, så løkka stopper. Utskriften er 5.`,
   md`What does the code print?´´´n = 0
total = 0
while total <= 50:
    n += 1
    total += n * n
print(n)´´´`, null,
   md`total becomes 1, 5, 14, 30 and 55. After the iteration with n = 5, total = 55, which is greater than 50, so the loop stops. The output is 5.`],
  [md`Hva skjer når koden kjøres?´´´i = 0
while i < 5:
    print(i)
i += 1´´´`, ["Løkka går evig og skriver 0 hele tiden", "Den skriver 0, 1, 2, 3 og 4", "Den skriver 0 til og med 5", "IndentationError"],
   md`´i += 1´ har ikke innrykk og hører derfor ikke til løkka. ´i´ forblir 0, betingelsen er alltid sann, og løkka stopper aldri. Koden er gyldig Python, så det blir ingen feilmelding.`,
   md`What happens when the code runs?´´´i = 0
while i < 5:
    print(i)
i += 1´´´`, ["The loop runs forever and keeps printing 0", "It prints 0, 1, 2, 3 and 4", "It prints 0 up to and including 5", "IndentationError"],
   md`´i += 1´ is not indented, so it does not belong to the loop. ´i´ stays 0, the condition is always true, and the loop never stops. The code is valid Python, so no error is raised.`]
]);

GEN("MEK1300", 1,
 // enkel: siste verdi fra range
 ()=>{ const neg=R.i(0,2)===0, s=R.i(2,5), k=R.i(3,6), r=R.i(0,s-1); let a,b; const vals=[];
   if(!neg){ a=R.i(0,10); b=a+s*k+r; for(let i=a;i<b;i+=s) vals.push(i); }
   else { a=R.i(35,50); b=a-s*k-r; for(let i=a;i>b;i-=s) vals.push(i); }
   const st=neg?-s:s, last=vals[vals.length-1], code=`for i in range(${a}, ${b}, ${st}):\n    print(i)`;
   return [T(`Hva er den siste verdien koden skriver ut?${CB(code)}`,`What is the last value the code prints?${CB(code)}`),{n:last,tol:0,u:""},
     T(`\`range\` stopper før ${b}, som aldri er med. Verdiene er ${vals.join(", ")}, så den siste er ${last}.`,`\`range\` stops before ${b}, which is never included. The values are ${vals.join(", ")}, so the last one is ${last}.`)]; },
 // middels: continue og break
 ()=>{ const lim=R.i(12,18), pos=R.i(3,5), xs=[]; for(let i=0;i<pos;i++) xs.push(R.i(-9,lim)); xs[R.i(0,pos-1)]=-R.i(1,9);
   const big=lim+R.i(1,15); xs.push(big); while(xs.length<7) xs.push(R.i(-9,30));
   let total=0; const used=[]; for(const x of xs){ if(x<0) continue; if(x>lim) break; total+=x; used.push(x); }
   const code=["total = 0",`for x in [${xs.join(", ")}]:`,"    if x < 0:","        continue",`    if x > ${lim}:`,"        break","    total += x","print(total)"].join("\n");
   const sumTxt=used.length?`${used.join(" + ")} = ${total}`:"0";
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:total,tol:0,u:""},
     T(`Negative tall hoppes over med \`continue\`. Ved x = ${big} er x > ${lim}, og \`break\` avslutter løkka, så resten av lista blir aldri sett på. Summen blir ${sumTxt}.`,
       `Negative numbers are skipped by \`continue\`. At x = ${big} we have x > ${lim}, and \`break\` ends the loop, so the rest of the list is never examined. The sum is ${sumTxt}.`)]; },
 // eksamen: tømming av tank
 ()=>{ let V0,p,Vmin,r; do{ V0=R.p([500,800,1000,1200,1500,2000]); p=R.i(5,30); Vmin=R.p([50,100,150,200,250,300]); r=Math.log(Vmin/V0)/Math.log((100-p)/100); }while(V0<2*Vmin||Math.abs(r-Math.round(r))<0.03);
   const q=(100-p)/100; let V=V0, t=0; while(V>Vmin){ V=V*q; t++; }
   const code=[`V = ${V0}.0`,"t = 0",`while V > ${Vmin}:`,`    V = V * ${q.toFixed(2)}`,"    t += 1","print(t)"].join("\n");
   return [T(`En tank med ${V0} L tappes slik at ${p} % av innholdet forsvinner hvert minutt. Programmet finner når det er ${Vmin} L eller mindre igjen. Hva skriver det ut?${CB(code)}`,
             `A tank holding ${V0} L is drained so that ${p}% of the contents disappears every minute. The program finds when ${Vmin} L or less remains. What does it print?${CB(code)}`),{n:t,tol:0,u:""},
     T(`Etter $t$ runder er $V = ${V0}\\cdot ${mf(q)}^t$. Løkka stopper første gang $V \\leq ${Vmin}$, altså når $${mf(q)}^t \\leq ${mf(Vmin/V0,3)}$. Det gir $t \\geq \\ln(${mf(Vmin/V0,3)})/\\ln(${mf(q)}) \\approx ${mf(r,2)}$. Løkka kjører derfor ${t} ganger (da er $V \\approx ${mf(V,1)}$ L), og utskriften er ${t}.`,
       `After $t$ iterations $V = ${V0}\\cdot ${mf(q)}^t$. The loop stops the first time $V \\leq ${Vmin}$, i.e. when $${mf(q)}^t \\leq ${mf(Vmin/V0,3)}$. This gives $t \\geq \\ln(${mf(Vmin/V0,3)})/\\ln(${mf(q)}) \\approx ${mf(r,2)}$. The loop therefore runs ${t} times (then $V \\approx ${mf(V,1)}$ L), and the output is ${t}.`)]; }
);

// ---------- Enhet 2: Funksjoner og datastrukturer ----------
THEORY("MEK1300", 2, {
nb: md`## Hva handler det om?
Når et program vokser, deler du det opp i **funksjoner**: små, navngitte biter som tar inn verdier og gir tilbake et resultat. Da kan du teste hver del for seg og bruke den om igjen, for eksempel én funksjon som regner ut spenning og én som leser en fil med måledata. **Datastrukturer** bestemmer hvordan du lagrer mange verdier: en liste med målinger, en ordbok med materialdata eller en mengde med unike ID-er.

## Begreper og formler
- ´def f(a, b=2):´ definerer en funksjon med parameterne a og b. b har **standardverdien** 2.
- Kall: ´f(3)´, ´f(3, 5)´ eller med nøkkelord: ´f(3, b=5)´.
- ´return´ avslutter funksjonen og sender en verdi tilbake. Uten ´return´ blir resultatet ´None´. ´print´ viser bare noe på skjermen.
- Variabler som lages inne i en funksjon, er **lokale** og forsvinner når funksjonen er ferdig.
- **Liste** ´[3, 1, 2]´: ordnet og kan endres (´append´, ´pop´, ´insert´, ´sort´).
- **Tuppel** ´(3, 1, 2)´: ordnet, men kan ikke endres.
- **Ordbok** ´{"E": 210}´: nøkkel og verdi. Bruk ´d["E"]´, ´d.get(k, standard)´ og ´d.items()´.
- **Mengde** ´{1, 2, 3}´: uordnet og uten duplikater. ´x in mengde´ er raskt.
- **Listeforståelse:** ´[2 * x for x in xs if x > 0]´ lager en ny liste i én linje.
- Tilordning kopierer ikke: etter ´b = a´ peker a og b på **samme** liste. Bruk ´a.copy()´ for å få en kopi.

## Slik løser du oppgavene
1. Finn hvilke verdier parameterne får ved kallet (posisjon, nøkkelord eller standardverdi).
2. Gå gjennom funksjonskroppen linje for linje med disse verdiene.
3. Se etter ´return´: hva sendes tilbake, og hva blir bare skrevet ut?
4. Hold styr på om en liste eller ordbok **endres**, eller om det lages en ny.

### Eksempel
´´´
def middel(xs, grense=100):
    ok = [x for x in xs if x <= grense]
    return sum(ok) / len(ok)

data = {"A": [98, 102, 97], "B": [101, 99, 150]}
res = {k: middel(v, grense=120) for k, v in data.items()}
print(res["B"])
´´´
1. For nøkkelen ´"B"´ er ´xs = [101, 99, 150]´ og ´grense = 120´ (nøkkelordet overstyrer standardverdien 100).
2. Listeforståelsen beholder verdiene som er høyst 120: ´[101, 99]´. Verdien 150 er en feilmåling og filtreres bort.
3. ´sum(ok) / len(ok)´ blir 200 / 2 = 100.

Utskriften er ´100.0´. Det blir float fordi ´/´ er brukt. Tilsvarende blir ´res["A"]´ lik 99.

## Vanlige feil
- Å bruke ´print´ i stedet for ´return´. Da får den som kaller funksjonen, bare ´None´.
- Å tro at ´b = a´ lager en kopi av en liste.
- Å bruke en liste som standardverdi (´def f(x, lst=[]):´). Lista lages bare én gang og deles mellom alle kall. Bruk ´None´ og lag lista inne i funksjonen.
- Å slå opp en nøkkel som mangler: ´d["x"]´ gir ´KeyError´. Bruk ´d.get´ eller sjekk med ´in´ først.
- Å endre en liste mens du løkker over den.

> En funksjon tar inn parametere og gir tilbake én ting med ´return´. Lister og ordbøker kan endres, og alle navn som peker på samme objekt, ser endringen.`,
en: md`## What is it about?
As a program grows, you split it into **functions**: small, named pieces that take values in and give a result back. Then you can test each part on its own and reuse it, for example one function that computes stress and one that reads a file of measurements. **Data structures** decide how you store many values: a list of measurements, a dictionary of material data or a set of unique IDs.

## Concepts and formulas
- ´def f(a, b=2):´ defines a function with the parameters a and b. b has the **default value** 2.
- Calls: ´f(3)´, ´f(3, 5)´ or with a keyword: ´f(3, b=5)´.
- ´return´ ends the function and sends a value back. Without ´return´ the result is ´None´. ´print´ only shows something on the screen.
- Variables created inside a function are **local** and disappear when the function finishes.
- **List** ´[3, 1, 2]´: ordered and mutable (´append´, ´pop´, ´insert´, ´sort´).
- **Tuple** ´(3, 1, 2)´: ordered but immutable.
- **Dictionary** ´{"E": 210}´: key and value. Use ´d["E"]´, ´d.get(k, default)´ and ´d.items()´.
- **Set** ´{1, 2, 3}´: unordered and without duplicates. ´x in my_set´ is fast.
- **List comprehension:** ´[2 * x for x in xs if x > 0]´ builds a new list in one line.
- Assignment does not copy: after ´b = a´, a and b refer to the **same** list. Use ´a.copy()´ to get a copy.

## How to solve the problems
1. Find the values the parameters get in the call (positional, keyword or default).
2. Go through the function body line by line with those values.
3. Look for ´return´: what is sent back, and what is only printed?
4. Keep track of whether a list or dictionary is **modified** or a new one is created.

### Example
´´´
def mean_ok(xs, limit=100):
    ok = [x for x in xs if x <= limit]
    return sum(ok) / len(ok)

data = {"A": [98, 102, 97], "B": [101, 99, 150]}
res = {k: mean_ok(v, limit=120) for k, v in data.items()}
print(res["B"])
´´´
1. For the key ´"B"´, ´xs = [101, 99, 150]´ and ´limit = 120´ (the keyword overrides the default value 100).
2. The list comprehension keeps the values that are at most 120: ´[101, 99]´. The value 150 is a faulty measurement and is filtered out.
3. ´sum(ok) / len(ok)´ becomes 200 / 2 = 100.

The output is ´100.0´. It is a float because ´/´ is used. Similarly, ´res["A"]´ equals 99.

## Common mistakes
- Using ´print´ instead of ´return´. Then the caller only gets ´None´.
- Believing that ´b = a´ makes a copy of a list.
- Using a list as a default value (´def f(x, lst=[]):´). The list is created only once and shared by all calls. Use ´None´ and create the list inside the function.
- Looking up a missing key: ´d["x"]´ raises ´KeyError´. Use ´d.get´ or check with ´in´ first.
- Modifying a list while looping over it.

> A function takes parameters and gives back one thing with ´return´. Lists and dictionaries are mutable, and every name that refers to the same object sees the change.`
});

BIQ("MEK1300", 2, [
  [md`Hva skriver koden ut?´´´def f(x):
    print(x * 2)

y = f(3)
print(y)´´´`, ["6 og deretter None", "6 og deretter 6", "Bare 6", "None og deretter 6"],
   md`´f´ skriver ut 6, men har ingen ´return´ og gir derfor ´None´ tilbake. ´y´ blir ´None´, og det skrives ut på neste linje.`,
   md`What does the code print?´´´def f(x):
    print(x * 2)

y = f(3)
print(y)´´´`, ["6, then None", "6, then 6", "Only 6", "None, then 6"],
   md`´f´ prints 6, but it has no ´return´ and therefore returns ´None´. ´y´ becomes ´None´, which is printed on the next line.`],
  [md`Hva skriver koden ut?´´´a = [1, 2, 3]
b = a
b.append(4)
print(a)´´´`, ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "AttributeError"],
   md`´b = a´ lager ingen kopi. a og b er to navn på samme liste, så endringen gjort via b synes også i a. Bruk ´b = a.copy()´ hvis du vil ha en kopi.`,
   md`What does the code print?´´´a = [1, 2, 3]
b = a
b.append(4)
print(a)´´´`, ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "AttributeError"],
   md`´b = a´ does not make a copy. a and b are two names for the same list, so the change made through b is also seen in a. Use ´b = a.copy()´ if you want a copy.`],
  [md`Hva skriver koden ut?´´´def add(x, lst=[]):
    lst.append(x)
    return lst

add(1)
add(2)
print(len(add(3)))´´´`, { n: 3, tol: 0, u: "" },
   md`Standardverdien ´[]´ lages bare én gang, når funksjonen defineres. Alle kall uten ´lst´ deler derfor samme liste: [1], så [1, 2] og til slutt [1, 2, 3]. Lengden er 3. Skriv ´lst=None´ og lag en ny liste inne i funksjonen for å unngå dette.`,
   md`What does the code print?´´´def add(x, lst=[]):
    lst.append(x)
    return lst

add(1)
add(2)
print(len(add(3)))´´´`, null,
   md`The default value ´[]´ is created only once, when the function is defined. All calls without ´lst´ therefore share the same list: [1], then [1, 2] and finally [1, 2, 3]. The length is 3. Write ´lst=None´ and create a new list inside the function to avoid this.`],
  [md`Hva skriver koden ut?´´´def scale(xs, k=2):
    return [k * x for x in xs if x > 0]

data = [3, -1, 4, 0, 5]
r = scale(data, k=3)
print(sum(r) + len(r))´´´`, { n: 39, tol: 0, u: "" },
   md`Bare positive tall tas med: 3, 4 og 5 (0 er ikke større enn 0). Med k = 3 blir r = [9, 12, 15]. ´sum(r)´ = 36 og ´len(r)´ = 3, så svaret er 39.`,
   md`What does the code print?´´´def scale(xs, k=2):
    return [k * x for x in xs if x > 0]

data = [3, -1, 4, 0, 5]
r = scale(data, k=3)
print(sum(r) + len(r))´´´`, null,
   md`Only positive numbers are kept: 3, 4 and 5 (0 is not greater than 0). With k = 3, r = [9, 12, 15]. ´sum(r)´ = 36 and ´len(r)´ = 3, so the answer is 39.`]
]);

GEN("MEK1300", 2,
 // enkel: nøkkelordargumenter
 ()=>{ const A=R.i(1,9), B=R.i(2,6), C=R.i(2,6), K=R.i(2,9), kw=R.p(["b","c"]);
   const bb=kw==="b"?K:B, cc=kw==="c"?K:C, v=A+bb*cc, other=kw==="b"?"c":"b", ov=kw==="b"?C:B;
   const code=[`def f(a, b=${B}, c=${C}):`,"    return a + b * c","",`print(f(${A}, ${kw}=${K}))`].join("\n");
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:v,tol:0,u:""},
     T(`\`a\` = ${A} (posisjon), \`${kw}\` = ${K} (nøkkelord), og \`${other}\` beholder standardverdien ${ov}. Svaret er $${A} + ${bb}\\cdot ${cc} = ${v}$.`,
       `\`a\` = ${A} (positional), \`${kw}\` = ${K} (keyword), and \`${other}\` keeps its default value ${ov}. The result is $${A} + ${bb}\\cdot ${cc} = ${v}$.`)]; },
 // middels: ordbok som lager
 ()=>{ const s6=R.i(20,60), s8=R.i(15,40), s10=R.i(5,30), d=R.i(3,14), n12=R.i(3,25), lim=R.i(10,20);
   const st=[["M6",s6],["M8",s8-d],["M10",s10],["M12",n12]], ok=st.filter(x=>x[1]>=lim), tot=ok.reduce((s,x)=>s+x[1],0);
   const code=[`stock = {"M6": ${s6}, "M8": ${s8}, "M10": ${s10}}`,`stock["M8"] -= ${d}`,`stock["M12"] = ${n12}`,"total = 0","for k, v in stock.items():",`    if v >= ${lim}:`,"        total += v","print(total)"].join("\n");
   const lst=st.map(x=>`${x[0]}: ${x[1]}`).join(", "), sumTxt=`${ok.map(x=>x[1]).join(" + ")} = ${tot}`;
   return [T(`Et lagerprogram holder oversikt over bolter. Hva skriver koden ut?${CB(code)}`,`An inventory program keeps track of bolts. What does the code print?${CB(code)}`),{n:tot,tol:0,u:""},
     T(`Etter endringene er lageret ${lst}. Verdiene som er minst ${lim}, summeres: ${sumTxt}.`,`After the updates the stock is ${lst}. The values that are at least ${lim} are summed: ${sumTxt}.`)]; },
 // eksamen: funksjon som sjekker toleranse
 ()=>{ const nom=R.p([10,12,16,20,25,30,40]), tk=R.p([2,3,5,8]); const ks=[]; while(ks.length<8){ const k=R.i(-2*tk,2*tk); if(Math.abs(k)!==tk) ks.push(k); }
   const xs=ks.map(k=>(nom+k/100).toFixed(2)), ok=ks.filter(k=>Math.abs(k)<tk).length, pct=100*ok/8, tol=(tk/100).toFixed(2);
   const code=["def share_ok(xs, nom, tol):","    n = 0","    for x in xs:","        if abs(x - nom) <= tol:","            n += 1","    return 100 * n / len(xs)","",`d = [${xs.join(", ")}]`,`print(share_ok(d, ${nom}.0, ${tol}))`].join("\n");
   const devs=ks.map(k=>nf(Math.abs(k)/100,2)).join("; ");
   return [T(`Diameteren til 8 aksler er målt i mm. Nominelt mål er ${nom} mm med toleranse ±${nf(tk/100)} mm. Hva skriver programmet ut?${CB(code)}`,
             `The diameters of 8 shafts are measured in mm. The nominal size is ${nom} mm with a tolerance of ±${nf(tk/100)} mm. What does the program print?${CB(code)}`),{n:pct,tol:0.01,u:""},
     T(`Avvikene $|x - ${nom}|$ er ${devs} mm. ${ok} av 8 er innenfor ${nf(tk/100)} mm, så funksjonen returnerer $100\\cdot ${ok}/8 = ${mf(pct,1)}$.`,
       `The deviations $|x - ${nom}|$ are ${devs} mm. ${ok} of 8 are within ${nf(tk/100)} mm, so the function returns $100\\cdot ${ok}/8 = ${mf(pct,1)}$.`)]; }
);

// ================================================================
// MEK3100 Videregående programmering
// ================================================================

// ---------- Enhet 0: Objektorientering ----------
THEORY("MEK3100", 0, {
nb: md`## Hva handler det om?
Objektorientert programmering (OOP) lar deg samle data og funksjonene som hører til dataene, i én enhet: et **objekt**. En **klasse** er oppskriften, og et objekt er en konkret instans av den. Som ingeniør bruker du dette til å modellere ting i den virkelige verden – en sensor, en komponent, en simulering – slik at koden speiler problemet og blir lettere å bygge videre på.

## Begreper og formler
- **Klasse** vs **objekt**: klassen ´class Bil:´ er oppskriften, ´b = Bil()´ lager et objekt (en instans).
- **Instansattributt**: satt med ´self.x = ...´ i ´__init__´, unikt for hvert objekt.
- **Klassevariabel**: satt rett i klassekroppen (utenfor metoder), delt av alle objekter av klassen, med mindre et objekt får sin egen versjon via ´self.navn = ...´.
- **Magiske metoder** (dunder): ´__init__´ (konstruktør), ´__str__´ (teksten som brukes av ´print(obj)´), ´__eq__´ (´==´), ´__len__´ (´len(obj)´).
- **´@staticmethod´**: en metode uten ´self´, hører logisk til klassen men trenger ikke noe objekt.
- **´@classmethod´**: tar ´cls´ i stedet for ´self´ og virker på klassen selv (f.eks. en alternativ konstruktør).
- **Arv og overstyring:** en underklasse kan definere en metode med samme navn som foreldreklassen; da brukes underklassens versjon når metoden kalles (polymorfi).

## Slik løser du oppgavene
1. Finn ut om et attributt er en klassevariabel (delt) eller en instansvariabel (satt med ´self.´ i ´__init__´).
2. Følg hvert objekt for seg: hvilke metoder kalles på hvilket objekt, og i hvilken rekkefølge?
3. Ved arv: sjekk hvilken klasses versjon av metoden som faktisk kjører (den mest spesifikke som er definert for det objektet).
4. Ved en klassevariabel: husk at en endring gjort via ett objekt kan påvirke alle andre, med mindre det lages en ny instansvariabel med samme navn.

### Eksempel
´´´
class Konto:
    rente = 0.02          # klassevariabel, delt av alle kontoer
    def __init__(self, saldo):
        self.saldo = saldo  # instansvariabel

    def legg_til_rente(self):
        self.saldo += self.saldo * Konto.rente

a = Konto(1000)
b = Konto(500)
Konto.rente = 0.05
a.legg_til_rente()
print(round(a.saldo), round(b.saldo))
´´´
1. ´a´ og ´b´ får hver sin ´saldo´ (instansvariabler): 1000 og 500.
2. ´Konto.rente = 0.05´ endrer **klassevariabelen** for alle objekter, siden ingen av dem har fått sin egen ´rente´.
3. Bare ´a.legg_til_rente()´ kalles: $1000 + 1000\cdot 0{,}05 = 1050$.
4. ´b.saldo´ er uendret siden ´legg_til_rente´ aldri ble kalt på ´b´.

Utskriften blir ´1050 500´.

## Vanlige feil
- Å tro at en klassevariabel er privat for hvert objekt. Den er delt helt til noen setter en instansvariabel med samme navn.
- Å glemme ´self´ som første parameter i en vanlig metode.
- Å glemme parentes ved arv: ´class ElBil(Bil):´, ikke ´class ElBil: Bil´.
- Å blande sammen ´__init__´ (kjøres automatisk når objektet lages) med en vanlig metode du selv må kalle.
- Å tro at ´@staticmethod´ har tilgang til ´self´ eller objektets attributter – det har den ikke.

> Et objekt er data (attributter) + oppførsel (metoder) samlet i én ting. Instansvariabler er private per objekt; klassevariabler er delt helt til noen overstyrer dem lokalt.`,
en: md`## What is it about?
Object-oriented programming (OOP) lets you bundle data together with the functions that belong to it, in one unit: an **object**. A **class** is the blueprint, and an object is a concrete instance of it. As an engineer you use this to model real things – a sensor, a component, a simulation – so the code mirrors the problem and is easier to build on.

## Concepts and formulas
- **Class** vs **object**: the class ´class Car:´ is the blueprint, ´c = Car()´ creates an object (an instance).
- **Instance attribute:** set with ´self.x = ...´ in ´__init__´, unique to each object.
- **Class variable:** set directly in the class body (outside any method), shared by all objects of the class, unless an object gets its own version via ´self.name = ...´.
- **Magic methods** (dunder): ´__init__´ (constructor), ´__str__´ (the text used by ´print(obj)´), ´__eq__´ (´==´), ´__len__´ (´len(obj)´).
- **´@staticmethod´**: a method without ´self´, logically belongs to the class but does not need an object.
- **´@classmethod´**: takes ´cls´ instead of ´self´ and operates on the class itself (e.g. an alternative constructor).
- **Inheritance and overriding:** a subclass can define a method with the same name as the parent class; then the subclass's version runs when the method is called (polymorphism).

## How to solve the problems
1. Work out whether an attribute is a class variable (shared) or an instance variable (set with ´self.´ in ´__init__´).
2. Follow each object separately: which methods are called on which object, and in what order?
3. With inheritance: check which class's version of the method actually runs (the most specific one defined for that object).
4. With a class variable: remember that a change made through one object can affect all others, unless a new instance variable with the same name is created.

### Example
´´´
class Account:
    rate = 0.02          # class variable, shared by all accounts
    def __init__(self, balance):
        self.balance = balance  # instance variable

    def add_interest(self):
        self.balance += self.balance * Account.rate

a = Account(1000)
b = Account(500)
Account.rate = 0.05
a.add_interest()
print(round(a.balance), round(b.balance))
´´´
1. ´a´ and ´b´ each get their own ´balance´ (instance variables): 1000 and 500.
2. ´Account.rate = 0.05´ changes the **class variable** for every object, since neither of them has its own ´rate´.
3. Only ´a.add_interest()´ is called: $1000 + 1000\cdot 0.05 = 1050$.
4. ´b.balance´ is unchanged since ´add_interest´ was never called on ´b´.

The output is ´1050 500´.

## Common mistakes
- Believing a class variable is private to each object. It is shared until someone sets an instance variable with the same name.
- Forgetting ´self´ as the first parameter of a regular method.
- Forgetting the parentheses for inheritance: ´class ElectricCar(Car):´, not ´class ElectricCar: Car´.
- Confusing ´__init__´ (called automatically when the object is created) with a regular method you must call yourself.
- Believing that ´@staticmethod´ has access to ´self´ or the object's attributes – it does not.

> An object is data (attributes) + behavior (methods) bundled into one thing. Instance variables are private per object; class variables are shared until something overrides them locally.`
});

BIQ("MEK3100", 0, [
  [md`Hva er en klassevariabel i Python?`,
   ["En variabel definert i klassekroppen, delt av alle objekter av klassen", "En variabel som bare finnes inne i én metode", "Det samme som en instansvariabel", "En variabel som må ha en fast type"],
   md`Den settes utenfor ´__init__´ og deles av alle objekter helt til ett av dem får sin egen instansvariabel med samme navn.`,
   md`What is a class variable in Python?`,
   ["A variable defined in the class body, shared by all objects of the class", "A variable that only exists inside one method", "The same thing as an instance variable", "A variable that must have a fixed type"],
   md`It is set outside ´__init__´ and is shared by every object until one of them gets its own instance variable with the same name.`],
  [md`Hva skjer hvis en klasse ikke definerer ´__str__´, og du skriver ´print(obj)´?`,
   ["Python skriver ut en standardtekst med klassenavn og minneadresse", "Alle attributtene skrives ut automatisk, pent formatert", "Det gir en feilmelding", "print skriver ingenting"],
   md`Uten ´__str__´ bruker Python en standardrepresentasjon, for eksempel ´<__main__.Bil object at 0x...>´. Definer ´__str__´ for å styre teksten selv.`,
   md`What happens if a class does not define ´__str__´, and you write ´print(obj)´?`,
   ["Python prints a default text with the class name and memory address", "All the attributes are printed automatically, nicely formatted", "It raises an error", "print prints nothing"],
   md`Without ´__str__´, Python uses a default representation, for example ´<__main__.Car object at 0x...>´. Define ´__str__´ to control the text yourself.`],
  [md`Hva er forskjellen mellom ´@staticmethod´ og ´@classmethod´?`,
   ["´@classmethod´ får klassen (´cls´) som første argument, ´@staticmethod´ får ingen ekstra argument", "´@staticmethod´ kan endre klassevariabler, ´@classmethod´ kan det ikke", "De er to navn på det samme", "´@classmethod´ kan bare kalles på et objekt, ikke på klassen"],
   md`´@classmethod´ tar ´cls´ og kan for eksempel lage nye objekter (en alternativ konstruktør). ´@staticmethod´ er bare en vanlig funksjon plassert inne i klassen for oversikten.`,
   md`What is the difference between ´@staticmethod´ and ´@classmethod´?`,
   ["´@classmethod´ receives the class (´cls´) as its first argument, ´@staticmethod´ receives no extra argument", "´@staticmethod´ can change class variables, ´@classmethod´ cannot", "They are two names for the same thing", "´@classmethod´ can only be called on an object, not on the class"],
   md`´@classmethod´ takes ´cls´ and can for example create new objects (an alternative constructor). ´@staticmethod´ is just a regular function placed inside the class for organization.`],
  [md`Hva skriver koden ut?´´´class Form:
    def areal(self):
        return 0

class Rektangel(Form):
    def __init__(self, b, h):
        self.b = b
        self.h = h
    def areal(self):
        return self.b * self.h

class Trekant(Form):
    def __init__(self, b, h):
        self.b = b
        self.h = h
    def areal(self):
        return 0.5 * self.b * self.h

former = [Rektangel(4, 3), Trekant(6, 2), Rektangel(2, 5)]
total = 0
for f in former:
    total += f.areal()
print(total)´´´`,
   { n: 28, tol: 0, u: "" },
   md`Hver form bruker sin egen ´areal()´-metode (polymorfi): $4\cdot 3 = 12$, $0{,}5\cdot 6\cdot 2 = 6$ og $2\cdot 5 = 10$. Summen er $12 + 6 + 10 = 28$.`,
   md`What does the code print?´´´class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

class Triangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return 0.5 * self.w * self.h

shapes = [Rectangle(4, 3), Triangle(6, 2), Rectangle(2, 5)]
total = 0
for s in shapes:
    total += s.area()
print(total)´´´`,
   null,
   md`Each shape uses its own ´area()´ method (polymorphism): $4\cdot 3 = 12$, $0.5\cdot 6\cdot 2 = 6$ and $2\cdot 5 = 10$. The sum is $12 + 6 + 10 = 28$.`]
]);

GEN("MEK3100", 0,
 // enkel: klassevariabel som teller opprettede objekter
 ()=>{ const K=R.i(2,8);
   const code=["class Sensor:","    antall = 0","    def __init__(self):","        Sensor.antall += 1","",`for i in range(${K}):`,"    Sensor()","s = Sensor()","print(Sensor.antall)"].join("\n");
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:K+1,tol:0,u:""},
     T(`\`antall\` er en klassevariabel som deles av alle objekter. Hver gang \`__init__\` kjører, økes den med 1. Løkka lager ${K} objekter, og linja etter lager ett til, så \`Sensor.antall\` blir ${K} + 1 = ${K+1}.`,
       `\`antall\` is a class variable shared by every object. Each time \`__init__\` runs, it is increased by 1. The loop creates ${K} objects, and the next line creates one more, so \`Sensor.antall\` becomes ${K} + 1 = ${K+1}.`)]; },
 // middels: @classmethod som alternativ konstruktør
 ()=>{ const A=R.i(2,9), B=R.i(2,9), S=R.i(2,9); const total=A*B+S*S;
   const code=["class Rektangel:","    def __init__(self, b, h):","        self.b = b","        self.h = h","    @classmethod","    def kvadrat(cls, s):","        return cls(s, s)","    def areal(self):","        return self.b * self.h","",
     `r1 = Rektangel(${A}, ${B})`,`r2 = Rektangel.kvadrat(${S})`,"print(r1.areal() + r2.areal())"].join("\n");
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:total,tol:0,u:""},
     T(`\`r1\` har areal $${A}\\cdot ${B} = ${A*B}$. \`kvadrat\` lager et rektangel med ${S} som begge sider (via \`cls(s, s)\`), så \`r2\` har areal $${S}\\cdot ${S} = ${S*S}$. Summen er $${A*B} + ${S*S} = ${total}$.`,
       `\`r1\` has area $${A}\\cdot ${B} = ${A*B}$. \`kvadrat\` builds a rectangle with ${S} as both sides (via \`cls(s, s)\`), so \`r2\` has area $${S}\\cdot ${S} = ${S*S}$. The sum is $${A*B} + ${S*S} = ${total}$.`)]; },
 // eksamen: arv og overstyring, kostnad for en bilflåte
 ()=>{ const F1=R.i(5,12), F2=R.i(15,25), F3=R.i(5,12), KM=R.i(50,400), PB=R.f(15,22,0.5), PS=R.f(1,3,0.25);
   const k1=F1*KM/100*PB, k2=F2*KM/100*PS, k3=F3*KM/100*PB, total=k1+k2+k3, pbc=PB.toFixed(2), psc=PS.toFixed(2);
   const code=["class Kjoretoy:","    def __init__(self, forbruk):","        self.forbruk = forbruk","    def kostnad(self, km):",`        return self.forbruk * km / 100 * ${pbc}`,"",
     "class ElBil(Kjoretoy):","    def kostnad(self, km):",`        return self.forbruk * km / 100 * ${psc}`,"",
     `flate = [Kjoretoy(${F1}), ElBil(${F2}), Kjoretoy(${F3})]`,`total = sum(k.kostnad(${KM}) for k in flate)`,"print(round(total, 2))"].join("\n");
   return [T(`En bilflåte består av to fossilbiler (forbruk i liter per 100 km, bensinpris ${nf(PB,2)} kr/L) og én elbil (forbruk i kWh per 100 km, strømpris ${nf(PS,2)} kr/kWh, arvet klasse med egen ´kostnad´-metode). Alle kjører ${KM} km. Hva skriver koden ut?${CB(code)}`,
             `A vehicle fleet has two fuel-powered cars (fuel use in liters per 100 km, gasoline price ${nf(PB,2)} NOK/L) and one electric car (energy use in kWh per 100 km, electricity price ${nf(PS,2)} NOK/kWh, an inherited class with its own \`kostnad\` method). All of them drive ${KM} km. What does the code print?${CB(code)}`),
     {n:total,tol:0.02,u:"kr"},
     T(`\`ElBil\` overstyrer \`kostnad\` (polymorfi), så den bruker strømpris i stedet for bensinpris. Kostnadene blir $${nf(F1)}\\cdot ${KM}/100\\cdot ${nf(PB,2)} \\approx ${nf(k1,2)}$, $${nf(F2)}\\cdot ${KM}/100\\cdot ${nf(PS,2)} \\approx ${nf(k2,2)}$ og $${nf(F3)}\\cdot ${KM}/100\\cdot ${nf(PB,2)} \\approx ${nf(k3,2)}$ kr. Summen er omtrent ${nf(total,2)} kr.`,
       `\`ElBil\` overrides \`kostnad\` (polymorphism), so it uses the electricity price instead of the gasoline price. The costs are $${nf(F1)}\\cdot ${KM}/100\\cdot ${nf(PB,2)} \\approx ${nf(k1,2)}$, $${nf(F2)}\\cdot ${KM}/100\\cdot ${nf(PS,2)} \\approx ${nf(k2,2)}$ and $${nf(F3)}\\cdot ${KM}/100\\cdot ${nf(PB,2)} \\approx ${nf(k3,2)}$ NOK. The total is approximately ${nf(total,2)} NOK.`)]; }
);

// ---------- Enhet 1: Algoritmer og datastrukturer ----------
THEORY("MEK3100", 1, {
nb: md`## Hva handler det om?
Når data blir store, er det ikke nok at koden virker – den må også være rask nok. Kompleksitetsanalyse (Big-O) gir deg et språk for å beskrive hvor mye arbeid en algoritme bruker når mengden data $n$ vokser, uavhengig av datamaskinen. Som ingeniør trenger du dette for å velge riktig datastruktur og algoritme før koden blir treg med ekte, store datasett – for eksempel måleserier med millioner av punkter.

## Begreper og formler
- **Amortisert kompleksitet:** ´liste.append(x)´ er $O(1)$ i gjennomsnitt, selv om lista av og til må kopieres til et større minneområde.
- ´liste.insert(0, x)´ og ´liste.pop(0)´ er $O(n)$: alle elementene bak innsettingspunktet må flyttes.
- En rekursiv funksjon trenger et **basistilfelle** for å stoppe, ellers gir den ´RecursionError´. Antall rekursive kall henger ofte sammen med hvor stor inndataen er.
- **Inversjon:** et par elementer som står i feil rekkefølge i en liste. Innsettingssortering bytter naboelementer helt til alle inversjoner er borte.
- Vanlige kompleksitetsklasser fra raskest til tregest: $O(1) < O(\log n) < O(n) < O(n\log n) < O(n^2) < O(2^n)$.
- To nøstede løkker som begge går $n$ ganger, gir til sammen $O(n^2)$ (kvadratisk).

## Slik løser du oppgavene
1. Finn hvilken del av koden som gjentas flest ganger når $n$ vokser – det er den som dominerer kompleksiteten.
2. Tell løkker i dybden: én løkke over $n$ gir $O(n)$, en løkke inni en løkke gir $O(n^2)$.
3. For rekursjon: skriv opp kallene helt til basistilfellet er nådd, og tell dem.
4. For sortering: følg algoritmen steg for steg med en konkret liste, og noter hver sammenligning og hvert bytte.

### Eksempel
Innsettingssortering bytter et element bakover til det står riktig, ett steg om gangen:
´´´
def sorter(a):
    bytter = 0
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j-1] > a[j]:
            a[j-1], a[j] = a[j], a[j-1]
            j -= 1
            bytter += 1
    return bytter

print(sorter([3, 1, 2]))
´´´
1. $i=1$: sammenlign $a[0]=3$ og $a[1]=1$. $3>1$, så de byttes: $[1, 3, 2]$, bytter = 1.
2. $i=2$: sammenlign $a[1]=3$ og $a[2]=2$. $3>2$, bytt: $[1, 2, 3]$, bytter = 2. Nå er $a[0]=1 \leq a[1]=2$, så den indre løkka stopper.
3. Lista er sortert, og funksjonen returnerer 2.

Utskriften blir ´2´, som er antall inversjoner i den opprinnelige lista (parene 3–1 og 3–2).

## Vanlige feil
- Å tro at ´append´ og ´insert(0, x)´ er like raske. De er hhv. $O(1)$ og $O(n)$.
- Å glemme basistilfellet i en rekursiv funksjon.
- Å telle bare den ytre løkka og glemme at en indre løkke multipliserer arbeidet.
- Å blande sammen antall **sammenligninger** og antall **bytter** i en sorteringsalgoritme – de er ikke alltid like mange.
- Å tro at $O(n\log n)$ og $O(n^2)$ er omtrent like raske for store $n$. Forskjellen blir enorm.

> Tell hvor mange ganger den tyngste operasjonen gjentas når $n$ vokser. Det, og bare det, bestemmer Big-O.`,
en: md`## What is it about?
When data grows large, it is not enough that the code works – it also has to be fast enough. Complexity analysis (Big-O) gives you a language for describing how much work an algorithm does as the amount of data $n$ grows, independent of the computer. As an engineer you need this to choose the right data structure and algorithm before the code becomes slow on real, large datasets – for example measurement series with millions of points.

## Concepts and formulas
- **Amortized complexity:** ´my_list.append(x)´ is $O(1)$ on average, even though the list occasionally has to be copied to a larger block of memory.
- ´my_list.insert(0, x)´ and ´my_list.pop(0)´ are $O(n)$: every element behind the insertion point has to be shifted.
- A recursive function needs a **base case** to stop, otherwise it raises ´RecursionError´. The number of recursive calls is often tied to the size of the input.
- **Inversion:** a pair of elements that are in the wrong order in a list. Insertion sort swaps neighboring elements until every inversion is gone.
- Common complexity classes from fastest to slowest: $O(1) < O(\log n) < O(n) < O(n\log n) < O(n^2) < O(2^n)$.
- Two nested loops that both run $n$ times together give $O(n^2)$ (quadratic).

## How to solve the problems
1. Find which part of the code repeats the most as $n$ grows – that is what dominates the complexity.
2. Count nested loops: one loop over $n$ gives $O(n)$, a loop inside a loop gives $O(n^2)$.
3. For recursion: write out the calls until the base case is reached, and count them.
4. For sorting: follow the algorithm step by step with a concrete list, noting every comparison and every swap.

### Example
Insertion sort swaps an element backward until it is in the right place, one step at a time:
´´´
def sort(a):
    swaps = 0
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j-1] > a[j]:
            a[j-1], a[j] = a[j], a[j-1]
            j -= 1
            swaps += 1
    return swaps

print(sort([3, 1, 2]))
´´´
1. $i=1$: compare $a[0]=3$ and $a[1]=1$. $3>1$, so they are swapped: $[1, 3, 2]$, swaps = 1.
2. $i=2$: compare $a[1]=3$ and $a[2]=2$. $3>2$, swap: $[1, 2, 3]$, swaps = 2. Now $a[0]=1 \leq a[1]=2$, so the inner loop stops.
3. The list is sorted, and the function returns 2.

The output is ´2´, which is the number of inversions in the original list (the pairs 3–1 and 3–2).

## Common mistakes
- Believing that ´append´ and ´insert(0, x)´ are equally fast. They are $O(1)$ and $O(n)$ respectively.
- Forgetting the base case in a recursive function.
- Counting only the outer loop and forgetting that an inner loop multiplies the work.
- Mixing up the number of **comparisons** and the number of **swaps** in a sorting algorithm – they are not always equal.
- Believing that $O(n\log n)$ and $O(n^2)$ are about equally fast for large $n$. The difference becomes enormous.

> Count how many times the heaviest operation repeats as $n$ grows. That, and only that, decides the Big-O.`
});

BIQ("MEK3100", 1, [
  [md`Hva er tidskompleksiteten til å legge til et element bakerst i en Python-liste med ´append´?`,
   ["$O(1)$ i gjennomsnitt (amortisert)", "$O(n)$", "$O(\\log n)$", "$O(n^2)$"],
   md`Lista har ledig kapasitet de fleste ganger. Bare av og til må hele lista kopieres til et større minneområde, men kostnaden fordelt over mange kall blir konstant.`,
   md`What is the time complexity of adding an element to the back of a Python list with ´append´?`,
   ["$O(1)$ on average (amortized)", "$O(n)$", "$O(\\log n)$", "$O(n^2)$"],
   md`The list has spare capacity most of the time. Only occasionally does the whole list have to be copied to a larger block of memory, but the cost spread over many calls is constant.`],
  [md`Hvorfor er ´liste.insert(0, x)´ treg for en lang liste?`,
   ["Alle de andre elementene må flyttes ett hakk, så det tar $O(n)$ tid", "Python må lage en helt ny liste hver gang, så det tar $O(n^2)$ tid", "Det er like raskt som ´append´, altså $O(1)$", "Det avhenger av om elementene er sortert"],
   md`Innsetting foran i en liste flytter alle elementene bak innsettingspunktet, i motsetning til ´append´ som bare legger til bakerst uten å flytte noe.`,
   md`Why is ´my_list.insert(0, x)´ slow for a long list?`,
   ["All the other elements have to shift over by one, so it takes $O(n)$ time", "Python has to build a brand new list every time, so it takes $O(n^2)$ time", "It is just as fast as ´append´, i.e. $O(1)$", "It depends on whether the elements are sorted"],
   md`Inserting at the front of a list shifts every element behind the insertion point, unlike ´append´, which only adds to the back without shifting anything.`],
  [md`Hvor mange sammenligninger trenger lineært søk i verste fall gjennom en liste med 200 elementer?`,
   { n: 200, tol: 0, u: "" },
   md`I verste fall (elementet finnes ikke, eller det er det siste) må alle 200 elementene sjekkes, ett for ett.`,
   md`How many comparisons does linear search need in the worst case through a list of 200 elements?`,
   null,
   md`In the worst case (the element is not there, or it is the last one) all 200 elements have to be checked, one by one.`],
  [md`Hva skriver koden ut?´´´def sorter(a):
    bytter = 0
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j-1] > a[j]:
            a[j-1], a[j] = a[j], a[j-1]
            j -= 1
            bytter += 1
    return bytter

print(sorter([5, 2, 4, 1, 3]))´´´`,
   { n: 7, tol: 0, u: "" },
   md`Antall bytter i innsettingssortering er lik antall par $(i, j)$ med $i<j$ der ´a[i] > a[j]´ (inversjoner). I ´[5, 2, 4, 1, 3]´ er disse parene (5,2), (5,4), (5,1), (5,3), (2,1), (4,1) og (4,3) – totalt 7, så det blir 7 bytter.`,
   md`What does the code print?´´´def sort(a):
    swaps = 0
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j-1] > a[j]:
            a[j-1], a[j] = a[j], a[j-1]
            j -= 1
            swaps += 1
    return swaps

print(sort([5, 2, 4, 1, 3]))´´´`,
   null,
   md`The number of swaps in insertion sort equals the number of pairs $(i, j)$ with $i<j$ where ´a[i] > a[j]´ (inversions). In ´[5, 2, 4, 1, 3]´ these pairs are (5,2), (5,4), (5,1), (5,3), (2,1) and (4,1) and (4,3) – 7 in total, so there are 7 swaps.`]
]);

GEN("MEK3100", 1,
 // enkel: rekursive kall talt via en global teller
 ()=>{ const N=R.i(3,9); const xs=Array.from({length:N},()=>R.i(1,20));
   const code=["kall = 0","def sum_rek(lst):","    global kall","    kall += 1","    if not lst:","        return 0","    return lst[0] + sum_rek(lst[1:])","",`sum_rek([${xs.join(", ")}])`,"print(kall)"].join("\n");
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:N+1,tol:0,u:""},
     T(`Hvert rekursive kall fjerner det første elementet fra lista, helt til lista er tom (basistilfellet). Med ${N} elementer blir det ${N} kall pluss det aller første kallet på hele lista, altså ${N} + 1 = ${N+1} kall totalt.`,
       `Each recursive call removes the first element from the list, until the list is empty (the base case). With ${N} elements this gives ${N} calls plus the very first call on the whole list, i.e. ${N} + 1 = ${N+1} calls in total.`)]; },
 // middels: klassifiser tidskompleksitet ut fra kodestruktur
 ()=>{ const kind=R.p(["const","single","double"]);
   const pool=["$O(1)$","$O(n)$","$O(n^2)$","$O(n\\log n)$"];
   const codes={
     const: ["def f(n):","    x = n * n + 3","    return x"],
     single: ["def f(n):","    total = 0","    for i in range(n):","        total += i","    return total"],
     double: ["def f(n):","    total = 0","    for i in range(n):","        for j in range(n):","            total += 1","    return total"]
   };
   const idx={const:0,single:1,double:2}[kind];
   const code=codes[kind].join("\n");
   const opts=[pool[idx],...pool.filter((_,i)=>i!==idx)];
   const why={
     const: T(`Koden gjør et fast antall regneoperasjoner, uansett hvor stor $n$ er. Ingen løkke gjentar arbeid avhengig av $n$.`,`The code performs a fixed number of arithmetic operations, no matter how large $n$ is. No loop repeats work depending on $n$.`),
     single: T(`Én løkke går gjennom $n$ verdier, og hver runde gjør et konstant arbeid. Det gir $O(n)$.`,`One loop runs through $n$ values, and each iteration does a constant amount of work. That gives $O(n)$.`),
     double: T(`For hver av de $n$ verdiene til \`i\` løper \`j\` gjennom alle $n$ verdiene. Det gir $n\\cdot n = n^2$ runder totalt, altså $O(n^2)$.`,`For each of the $n$ values of \`i\`, \`j\` runs through all $n$ values. That gives $n\\cdot n = n^2$ iterations in total, i.e. $O(n^2)$.`)
   }[kind];
   return [T(`Hva er tidskompleksiteten til funksjonen, som funksjon av \`n\`?${CB(code)}`,`What is the time complexity of the function, as a function of \`n\`?${CB(code)}`),opts,why]; },
 // eksamen: innsettingssortering med tilfeldig liste
 ()=>{ const a=R.distinct(5,1,30);
   let arr=[...a], sw=0;
   for(let i=1;i<arr.length;i++){ let j=i; while(j>0 && arr[j-1]>arr[j]){ const t=arr[j-1]; arr[j-1]=arr[j]; arr[j]=t; j--; sw++; } }
   const code=["def sorter(a):","    bytter = 0","    for i in range(1, len(a)):","        j = i","        while j > 0 and a[j-1] > a[j]:","            a[j-1], a[j] = a[j], a[j-1]","            j -= 1","            bytter += 1","    return bytter","",`print(sorter([${a.join(", ")}]))`].join("\n");
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:sw,tol:0,u:""},
     T(`Innsettingssortering bytter naboelementer helt til alle inversjoner er borte. Antall bytter er lik antall par der et større tall står før et mindre i lista ´[${a.join(", ")}]´, som er ${sw}. Sortert blir lista ´[${arr.join(", ")}]´.`,
       `Insertion sort swaps neighboring elements until every inversion is gone. The number of swaps equals the number of pairs where a larger number comes before a smaller one in the list \`[${a.join(", ")}]\`, which is ${sw}. Sorted, the list becomes \`[${arr.join(", ")}]\`.`)]; }
);

// ---------- Enhet 2: Numerikk med NumPy ----------
THEORY("MEK3100", 2, {
nb: md`## Hva handler det om?
NumPy gir Python rask, vektorisert regning med tallarrayer – uunnværlig for ingeniørberegninger med store datasett, som måleserier og simuleringer. I tillegg lærer du numeriske grunnmetoder: Newtons metode for å finne nullpunkter til en funksjon, og Eulers metode for å løse differensialligninger tilnærmet, steg for steg. ´try´/´except´ lar programmet håndtere feil i data uten å krasje.

## Begreper og formler
- ´np.array´: regneoperatorene ´+ - * /´ virker **elementvis**, ikke som matrisemultiplikasjon. Bruk ´@´ eller ´np.dot´ for matriseprodukt.
- **Boolsk indeksering:** ´a[a > k]´ gir en ny array med bare de elementene som oppfyller betingelsen.
- **Broadcasting:** arrayer med lik form, eller der én dimensjon er 1, kan regnes sammen elementvis. Ulike og ukompatible former gir ´ValueError´.
- ´np.mean´, ´np.std´, ´np.sum´, ´a.min()´/´a.max()´: statistikk over en array.
- **Newtons metode:** $x_{n+1} = x_n - f(x_n)/f'(x_n)$, følger tangenten ned til nullpunktet.
- **Eulers eksplisitte metode:** $y_{n+1} = y_n + h\,f(t_n, y_n)$ for $y' = f(t, y)$.
- ´try: ... except NavnPåFeil: ...´ fanger en bestemt feiltype. En generell ´except:´ fanger alt, også feil du egentlig burde ha oppdaget.

## Slik løser du oppgavene
1. Se om koden regner elementvis eller er matriseregning – sjekk om det står ´*´ eller ´@´/´np.dot´.
2. Med boolsk indeksering: regn ut betingelsen for hvert element først, og hent ut bare de som er ´True´.
3. For Newton/Euler: sett inn tallene i formelen, ett steg om gangen, og hold styr på hvilken verdi som er $x_n$/$y_n$ i neste steg.
4. Sjekk formene til arrayene før du legger dem sammen – stemmer de, eller kan de broadcaste?

### Eksempel
En sensor logger 5 målinger. Vi vil vite gjennomsnittet av målingene som er over 20:
´´´
import numpy as np
a = np.array([15, 24, 31, 18, 27])
over = a[a > 20]
print(over, round(over.mean(), 2))
´´´
1. ´a > 20´ gir en boolsk array ´[False, True, True, False, True]´.
2. ´a[a > 20]´ bruker den til å hente ut verdiene der betingelsen er sann: ´[24, 31, 27]´.
3. Gjennomsnittet er $(24+31+27)/3 = 27{,}33$.

Utskriften blir ´[24 31 27] 27.33´.

## Vanlige feil
- Å forveksle ´*´ (elementvis) med ´@´/´np.dot´ (matrisemultiplikasjon).
- Å tro at boolsk indeksering gir ´True´/´False´-verdier tilbake i stedet for de faktiske tallene.
- Å legge sammen arrayer med ukompatible former og bli overrasket over ´ValueError´.
- Å bruke en generell ´except:´ som fanger og skjuler feil du egentlig burde ha oppdaget.
- Å dele på ´f'(x)´ uten å sjekke at den ikke er null eller veldig liten i Newtons metode.

> Elementvis er standard i NumPy. Boolsk indeksering sammen med ´.mean()´/´.sum()´ er den vanligste måten å filtrere og oppsummere måledata på.`,
en: md`## What is it about?
NumPy gives Python fast, vectorized computation with numeric arrays – essential for engineering calculations on large datasets, such as measurement series and simulations. You will also learn basic numerical methods: Newton's method for finding the roots of a function, and Euler's method for solving differential equations approximately, step by step. ´try´/´except´ lets the program handle bad data without crashing.

## Concepts and formulas
- ´np.array´: the operators ´+ - * /´ act **elementwise**, not as matrix multiplication. Use ´@´ or ´np.dot´ for a matrix product.
- **Boolean indexing:** ´a[a > k]´ gives a new array with only the elements that satisfy the condition.
- **Broadcasting:** arrays with the same shape, or where one dimension is 1, can be combined elementwise. Different, incompatible shapes raise ´ValueError´.
- ´np.mean´, ´np.std´, ´np.sum´, ´a.min()´/´a.max()´: statistics over an array.
- **Newton's method:** $x_{n+1} = x_n - f(x_n)/f'(x_n)$, follows the tangent line down to the root.
- **Euler's explicit method:** $y_{n+1} = y_n + h\,f(t_n, y_n)$ for $y' = f(t, y)$.
- ´try: ... except SomeError: ...´ catches one specific error type. A bare ´except:´ catches everything, including errors you should really have noticed.

## How to solve the problems
1. Check whether the code computes elementwise or does matrix arithmetic – look for ´*´ versus ´@´/´np.dot´.
2. With boolean indexing: work out the condition for every element first, then keep only the ones that are ´True´.
3. For Newton/Euler: plug the numbers into the formula, one step at a time, and keep track of which value is $x_n$/$y_n$ for the next step.
4. Check the shapes of the arrays before adding them – do they match, or can they broadcast?

### Example
A sensor logs 5 measurements. We want the mean of the measurements above 20:
´´´
import numpy as np
a = np.array([15, 24, 31, 18, 27])
above = a[a > 20]
print(above, round(above.mean(), 2))
´´´
1. ´a > 20´ gives a boolean array ´[False, True, True, False, True]´.
2. ´a[a > 20]´ uses it to pick out the values where the condition is true: ´[24, 31, 27]´.
3. The mean is $(24+31+27)/3 = 27.33$.

The output is ´[24 31 27] 27.33´.

## Common mistakes
- Confusing ´*´ (elementwise) with ´@´/´np.dot´ (matrix multiplication).
- Believing that boolean indexing returns ´True´/´False´ values instead of the actual numbers.
- Adding arrays with incompatible shapes and being surprised by ´ValueError´.
- Using a bare ´except:´ that catches and hides errors you should really have noticed.
- Dividing by ´f'(x)´ without checking that it is not zero or very small in Newton's method.

> Elementwise is the default in NumPy. Boolean indexing together with ´.mean()´/´.sum()´ is the most common way to filter and summarize measurement data.`
});

BIQ("MEK3100", 2, [
  [md`Hva returnerer ´a[a > 5]´ når ´a = np.array([2, 8, 3, 9])´?`,
   ["[8, 9]", "[True, False, False, True]", "[2, 3]", "IndexError"],
   md`´a > 5´ gir en boolsk array ´[False, True, False, True]´. Brukt som indeks henter den ut elementene der verdien er ´True´, altså 8 og 9.`,
   md`What does ´a[a > 5]´ return when ´a = np.array([2, 8, 3, 9])´?`,
   ["[8, 9]", "[True, False, False, True]", "[2, 3]", "IndexError"],
   md`´a > 5´ gives a boolean array ´[False, True, False, True]´. Used as an index it picks out the elements where the value is ´True´, i.e. 8 and 9.`],
  [md`Hva skjer når du prøver å regne ´np.array([1, 2, 3]) + np.array([1, 2])´?`,
   ["Det gir ´ValueError´ fordi formene ikke er kompatible for broadcasting", "NumPy fyller ut med 0 og gir [2, 4, 3]", "Den korteste gjentas automatisk og gir [2, 4, 4]", "Den lengste kuttes og gir [2, 4]"],
   md`Broadcasting krever at formene er like, eller at én av dimensjonene er 1. $(3,)$ og $(2,)$ passer ikke sammen, så NumPy gir en feilmelding i stedet for å gjette hva du mente.`,
   md`What happens when you try to compute ´np.array([1, 2, 3]) + np.array([1, 2])´?`,
   ["It raises ´ValueError´ because the shapes are not compatible for broadcasting", "NumPy pads with 0 and gives [2, 4, 3]", "The shorter one repeats automatically and gives [2, 4, 4]", "The longer one is cut and gives [2, 4]"],
   md`Broadcasting requires the shapes to match, or one of the dimensions to be 1. $(3,)$ and $(2,)$ do not fit together, so NumPy raises an error instead of guessing what you meant.`],
  [md`Hva skriver koden ut?´´´a = np.array([4, 1, 7, 2, 9])
print(a[1:4].sum())´´´`,
   { n: 10, tol: 0, u: "" },
   md`´a[1:4]´ tar med indeks 1, 2 og 3: ´[1, 7, 2]´. Summen er $1+7+2=10$.`,
   md`What does the code print?´´´a = np.array([4, 1, 7, 2, 9])
print(a[1:4].sum())´´´`,
   null,
   md`´a[1:4]´ includes indices 1, 2 and 3: ´[1, 7, 2]´. The sum is $1+7+2=10$.`],
  [md`Bruk to Newton-steg på $f(x) = x^2 - 7$ fra $x_0 = 3$. Hva er $x_2$?`,
   { n: 2.645833, tol: 0.001, u: "" },
   md`Steg 1: $x_1 = x_0 - \dfrac{x_0^2-7}{2x_0} = 3 - \dfrac{2}{6} \approx 2{,}6667$. Steg 2: $x_2 = x_1 - \dfrac{x_1^2-7}{2x_1} \approx 2{,}6667 - \dfrac{0{,}1111}{5{,}3333} \approx 2{,}6458$. Dette nærmer seg raskt $\sqrt7 \approx 2{,}6458$ (kvadratisk konvergens).`,
   md`Use two Newton steps on $f(x) = x^2 - 7$ from $x_0 = 3$. What is $x_2$?`,
   null,
   md`Step 1: $x_1 = x_0 - \dfrac{x_0^2-7}{2x_0} = 3 - \dfrac{2}{6} \approx 2.6667$. Step 2: $x_2 = x_1 - \dfrac{x_1^2-7}{2x_1} \approx 2.6667 - \dfrac{0.1111}{5.3333} \approx 2.6458$. This quickly approaches $\sqrt7 \approx 2.6458$ (quadratic convergence).`]
]);

GEN("MEK3100", 2,
 // enkel: utsnitt og sum
 ()=>{ const L=R.i(5,7), a=Array.from({length:L},()=>R.i(-9,20)); const s=R.i(0,L-3), len=R.i(2,L-s), e=s+len;
   const slice=a.slice(s,e), sum=slice.reduce((x,y)=>x+y,0);
   const code=`a = np.array([${a.join(", ")}])\nprint(a[${s}:${e}].sum())`;
   return [T(`Hva skriver koden ut?${CB(code)}`,`What does the code print?${CB(code)}`),{n:sum,tol:0,u:""},
     T(`\`a[${s}:${e}]\` tar med indeks ${Array.from({length:len},(_,i)=>s+i).join(", ")}: [${slice.join(", ")}]. Summen er ${slice.join(" + ")} = ${sum}.`,
       `\`a[${s}:${e}]\` includes indices ${Array.from({length:len},(_,i)=>s+i).join(", ")}: [${slice.join(", ")}]. The sum is ${slice.join(" + ")} = ${sum}.`)]; },
 // middels: boolsk maske og gjennomsnitt
 ()=>{ let arr,K,f; do{ arr=Array.from({length:R.i(5,7)},()=>R.i(0,50)); K=R.i(10,40); f=arr.filter(x=>x>K); }while(f.length===0);
   const m=f.reduce((x,y)=>x+y,0)/f.length, mr=Math.round(m*100)/100;
   const code=`a = np.array([${arr.join(", ")}])\nok = a[a > ${K}]\nprint(round(ok.mean(), 2))`;
   return [T(`Målinger fra en sensor er lagret i \`a\`. Hva skriver koden ut?${CB(code)}`,`Measurements from a sensor are stored in \`a\`. What does the code print?${CB(code)}`),{n:mr,tol:0.005,u:""},
     T(`Verdiene over ${K} er [${f.join(", ")}]. Gjennomsnittet er $(${f.join("+")})/${f.length} \\approx ${nf(mr,2)}$.`,
       `The values above ${K} are [${f.join(", ")}]. The mean is $(${f.join("+")})/${f.length} \\approx ${nf(mr,2)}$.`)]; },
 // eksamen: to steg med Eulers metode, strøm i en RC-krets
 ()=>{ let k,h; do{ k=R.f(0.5,3,0.1); h=R.f(0.05,0.3,0.05); }while(h*k>=0.9);
   const I0=R.f(1,10,0.5), fac=1-h*k, I1=I0*fac, I2=I1*fac;
   return [T(`Strømmen i en utladningskrets avtar som $I' = -kI$, med $k = ${mf(k)}$ (per sekund) og $I_0 = ${nf(I0)}$ A. Bruk to steg med Eulers eksplisitte metode med steglengde $h = ${mf(h)}$ s. Hva er $I_2$?`,
             `The current in a discharging circuit decreases as $I' = -kI$, with $k = ${mf(k)}$ (per second) and $I_0 = ${nf(I0)}$ A. Use two steps of Euler's explicit method with step size $h = ${mf(h)}$ s. What is $I_2$?`),
     {n:I2,tol:rel(I2,0.01,0.001),u:"A"},
     T(`Hvert steg ganger med $(1 - hk) = 1 - ${mf(h)}\\cdot ${mf(k)} = ${mf(fac,4)}$. Etter to steg: $I_2 = ${nf(I0)}\\cdot ${mf(fac,4)}^2 \\approx ${mf(I2,4)}$ A.`,
       `Each step multiplies by $(1 - hk) = 1 - ${mf(h)}\\cdot ${mf(k)} = ${mf(fac,4)}$. After two steps: $I_2 = ${nf(I0)}\\cdot ${mf(fac,4)}^2 \\approx ${mf(I2,4)}$ A.`)]; }
);

// ================================================================
// NUM Numeriske metoder
// ================================================================

// ---------- Enhet 0: Ligningsløsning ----------
THEORY("NUM", 0, {
nb: md`## Hva handler det om?
Mange praktiske ingeniørligninger, som $f(x) = 0$ for rørfriksjon, spenning i en bjelke eller likevektspunkter i en prosess, har ingen enkel formel for løsningen. Numeriske metoder finner en tilnærmet rot ved å gjette, sjekke og forbedre gjetningen gradvis. Målet er alltid det samme: et tall $x^*$ der $f(x^*) \approx 0$, innenfor en gitt toleranse.

## Begreper og formler
- **Rot**: en verdi $x^*$ der $f(x^*) = 0$.
- **Halveringsmetoden (bisection)**: krever et intervall $[a,b]$ der $f(a)$ og $f(b)$ har ulikt fortegn. Midtpunktet $c=(a+b)/2$ testes, og halvparten med fortegnsskifte beholdes. Antall steg for toleranse $\varepsilon$: $n \geq \log_2\!\big((b-a)/\varepsilon\big)$.
- **Newtons metode**: $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$. Krever den deriverte og et startpunkt nær roten. Konvergensen er kvadratisk (antall riktige siffer omtrent dobles per steg) når den virker, men metoden kan divergere ved dårlig start eller hvis $f'(x_n)\approx 0$.
- **Sekantmetoden**: som Newton, men den deriverte erstattes med en differansekvotient: $x_{n+1} = x_n - f(x_n)\dfrac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}$. Trenger to startpunkter, ikke den deriverte.
- **Fikspunktiterasjon**: skriv $f(x)=0$ om til $x=g(x)$ og iterer $x_{n+1}=g(x_n)$. Konvergerer hvis $|g'(x)|<1$ nær roten.
- **Konvergensorden**: hvor raskt feilen $e_n=x_n-x^*$ minker. Lineær (halvering, fikspunkt): feilen skaleres med en omtrent konstant faktor per steg. Kvadratisk (Newton): $e_{n+1}\approx C e_n^2$.

## Slik løser du oppgavene
1. Sjekk hva som er gitt: et intervall (halvering), en funksjon og ett startpunkt med den deriverte (Newton), to startpunkter (sekant), eller en $g(x)$ (fikspunkt).
2. Regn ut $f$ (og eventuelt $f'$) i de nødvendige punktene.
3. Bruk riktig oppdateringsformel og finn neste verdi.
4. Gjenta til endringen er mindre enn toleransen, eller til ønsket antall steg er nådd.

### Eksempel
Finn en rot av $f(x) = x^2 - 3$ med Newtons metode, startet på $x_0 = 2$.
1. $f(x) = x^2-3$ og $f'(x)=2x$.
2. Steg 1: $x_1 = x_0 - \dfrac{f(x_0)}{f'(x_0)} = 2 - \dfrac{4-3}{4} = 2 - 0{,}25 = 1{,}75$.
3. Steg 2: $f(1{,}75)=1{,}75^2-3=0{,}0625$ og $f'(1{,}75)=3{,}5$, så $x_2 = 1{,}75 - 0{,}0625/3{,}5 \approx 1{,}7321$.

Svaret nærmer seg $\sqrt3 \approx 1{,}7321$ raskt, typisk for kvadratisk konvergens.

## Vanlige feil
- Å starte halveringsmetoden på et intervall der $f(a)$ og $f(b)$ har samme fortegn.
- Å glemme å sjekke om $f'(x_n)$ er nær null i Newtons metode (metoden kan da hoppe langt av gårde).
- Å blande sammen konvergenshastighet (hvor fort) med om metoden konvergerer i det hele tatt.
- Å tro at flere desimaler i mellomregningen automatisk gir et mer nøyaktig svar enn metoden faktisk kan levere.

> Halveringsmetoden er tregest, men alltid trygg. Newton er raskest, men trenger en god start og den deriverte.`,
en: md`## What is it about?
Many practical engineering equations, such as $f(x) = 0$ arising from pipe friction, beam stresses or equilibrium points in a process, have no simple formula for the solution. Numerical methods find an approximate root by guessing, checking and gradually improving the guess. The goal is always the same: a number $x^*$ where $f(x^*) \approx 0$, within a given tolerance.

## Concepts and formulas
- **Root**: a value $x^*$ where $f(x^*) = 0$.
- **Bisection method**: requires an interval $[a,b]$ where $f(a)$ and $f(b)$ have opposite signs. The midpoint $c=(a+b)/2$ is tested, and the half with the sign change is kept. Number of steps for tolerance $\varepsilon$: $n \geq \log_2\!\big((b-a)/\varepsilon\big)$.
- **Newton's method**: $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$. Requires the derivative and a starting point near the root. Convergence is quadratic (the number of correct digits roughly doubles each step) when it works, but the method can diverge with a poor start or if $f'(x_n)\approx 0$.
- **Secant method**: like Newton, but the derivative is replaced by a difference quotient: $x_{n+1} = x_n - f(x_n)\dfrac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}$. Needs two starting points, not the derivative.
- **Fixed-point iteration**: rewrite $f(x)=0$ as $x=g(x)$ and iterate $x_{n+1}=g(x_n)$. Converges if $|g'(x)|<1$ near the root.
- **Order of convergence**: how quickly the error $e_n=x_n-x^*$ shrinks. Linear (bisection, fixed point): the error scales by a roughly constant factor each step. Quadratic (Newton): $e_{n+1}\approx C e_n^2$.

## How to solve the problems
1. Check what is given: an interval (bisection), a function and one starting point with the derivative (Newton), two starting points (secant), or a $g(x)$ (fixed point).
2. Evaluate $f$ (and $f'$ if needed) at the required points.
3. Use the correct update formula and find the next value.
4. Repeat until the change is smaller than the tolerance, or the desired number of steps is reached.

### Example
Find a root of $f(x) = x^2 - 3$ with Newton's method, starting from $x_0 = 2$.
1. $f(x) = x^2-3$ and $f'(x)=2x$.
2. Step 1: $x_1 = x_0 - \dfrac{f(x_0)}{f'(x_0)} = 2 - \dfrac{4-3}{4} = 2 - 0.25 = 1.75$.
3. Step 2: $f(1.75)=1.75^2-3=0.0625$ and $f'(1.75)=3.5$, so $x_2 = 1.75 - 0.0625/3.5 \approx 1.7321$.

The answer quickly approaches $\sqrt3 \approx 1.7321$, typical for quadratic convergence.

## Common mistakes
- Starting bisection on an interval where $f(a)$ and $f(b)$ have the same sign.
- Forgetting to check whether $f'(x_n)$ is close to zero in Newton's method (the method can then jump far off track).
- Confusing the speed of convergence (how fast) with whether the method converges at all.
- Believing that more decimal places in the intermediate work automatically give a more accurate answer than the method can actually deliver.

> Bisection is the slowest method but always safe. Newton is the fastest, but needs a good starting guess and the derivative.`
});

BIQ("NUM", 0, [
  [md`Hvorfor foretrekker man ofte sekantmetoden framfor Newtons metode i praksis?`,
   ["Den trenger ikke den deriverte, men konvergerer fortsatt raskere enn halveringsmetoden", "Den er alltid raskere enn Newtons metode", "Den krever et intervall med fortegnsskifte, akkurat som halveringsmetoden", "Den konvergerer uansett hvilke startverdier man velger"],
   md`Sekantmetoden bruker en differansekvotient i stedet for $f'(x)$, så man slipper å derivere for hånd eller numerisk – men den er fortsatt raskere enn den lineære halveringsmetoden (superlineær konvergens).`,
   md`Why is the secant method often preferred over Newton's method in practice?`,
   ["It does not need the derivative, but still converges faster than the bisection method", "It is always faster than Newton's method", "It requires an interval with a sign change, just like the bisection method", "It converges no matter which starting values are chosen"],
   md`The secant method uses a difference quotient instead of $f'(x)$, so you avoid differentiating by hand or numerically – but it is still faster than the linear bisection method (superlinear convergence).`],
  [md`Hva skjer i Newtons metode hvis $f'(x_n) = 0$ i et steg?`,
   ["Metoden bryter sammen (deling på null), og man må velge et annet startpunkt", "Iterasjonen stopper automatisk med riktig svar", "Metoden bytter automatisk til halveringsmetoden", "$x_{n+1}$ blir alltid lik roten"],
   md`Oppdateringsformelen $x_{n+1} = x_n - f(x_n)/f'(x_n)$ er udefinert når $f'(x_n)=0$. I praksis må man da starte på nytt fra et annet punkt, eller bytte til en metode som ikke bruker den deriverte.`,
   md`What happens in Newton's method if $f'(x_n) = 0$ at some step?`,
   ["The method breaks down (division by zero), and a different starting point must be chosen", "The iteration automatically stops at the correct answer", "The method automatically switches to the bisection method", "$x_{n+1}$ always becomes equal to the root"],
   md`The update formula $x_{n+1} = x_n - f(x_n)/f'(x_n)$ is not defined when $f'(x_n)=0$. In practice you must then restart from a different point, or switch to a method that does not use the derivative.`],
  [md`Bruk fikspunktiterasjon $x_{n+1} = \sqrt{2x_n + 3}$, startet på $x_0 = 2$. Hva er $x_1$?`,
   {n: 2.6457513110645907, tol: 0.001, u: ""},
   md`$x_1 = \sqrt{2\cdot 2 + 3} = \sqrt7 \approx 2{,}6458$.`,
   md`Use fixed-point iteration $x_{n+1} = \sqrt{2x_n + 3}$, starting from $x_0 = 2$. What is $x_1$?`,
   null,
   md`$x_1 = \sqrt{2\cdot 2 + 3} = \sqrt7 \approx 2.6458$.`]
]);

GEN("NUM", 0,
 // enkel: ett Newton-steg for å finne en kvadratrot
 ()=>{ const a=R.i(5,90), x0=R.i(2,9), x1=(x0+a/x0)/2;
   return [T(`Newtons metode kan brukes til å finne $\\sqrt{${a}}$ ved å løse $f(x)=x^2-${a}=0$. Bruk ett steg fra $x_0=${x0}$. Hva er $x_1$?`,`Newton's method can be used to find $\\sqrt{${a}}$ by solving $f(x)=x^2-${a}=0$. Use one step from $x_0=${x0}$. What is $x_1$?`),
     {n:x1, tol:rel(x1,0.01,0.001), u:""},
     T(`$x_1 = x_0 - \\dfrac{x_0^2-${a}}{2x_0} = \\dfrac{x_0 + ${a}/x_0}{2} = \\dfrac{${x0} + ${nf(a/x0,4)}}{2} \\approx ${mf(x1,4)}$.`,
       `$x_1 = x_0 - \\dfrac{x_0^2-${a}}{2x_0} = \\dfrac{x_0 + ${a}/x_0}{2} = \\dfrac{${x0} + ${nf(a/x0,4)}}{2} \\approx ${mf(x1,4)}$.`)]; },
 // eksamen: to Newton-steg for tøyning i en ikke-lineær materiallov
 ()=>{ const E=R.i(100,300), k=R.i(200,1500), sigma=R.f(5,40,1);
   const e1=sigma/E, f1=k*e1*e1*e1, fp1=E+3*k*e1*e1, e2=e1-f1/fp1;
   return [T(`En ikke-lineær tøyningslov for et material er $\\sigma = E\\epsilon + k\\epsilon^3$, med $E=${E}$ MPa og $k=${k}$ MPa (materialkonstanter). Ved spenningen $\\sigma=${nf(sigma)}$ MPa finnes tøyningen $\\epsilon$ med Newtons metode, startet på $\\epsilon_0=0$ (den lineærelastiske gjetningen). Hva er $\\epsilon_2$ etter to steg?`,
             `A nonlinear strain law for a material is $\\sigma = E\\epsilon + k\\epsilon^3$, with $E=${E}$ MPa and $k=${k}$ MPa (material constants). At a stress $\\sigma=${nf(sigma)}$ MPa the strain $\\epsilon$ is found with Newton's method, starting from $\\epsilon_0=0$ (the linear-elastic guess). What is $\\epsilon_2$ after two steps?`),
     {n:e2, tol:rel(e2,0.01,0.0002), u:""},
     T(`$f(\\epsilon)=E\\epsilon+k\\epsilon^3-\\sigma$ og $f'(\\epsilon)=E+3k\\epsilon^2$. Steg 1: siden $\\epsilon_0=0$ er $f'(\\epsilon_0)=E$, så $\\epsilon_1 = \\sigma/E \\approx ${mf(e1,5)}$. Steg 2: $f(\\epsilon_1)=k\\epsilon_1^3 \\approx ${mf(f1,5)}$ og $f'(\\epsilon_1) \\approx ${mf(fp1,3)}$, så $\\epsilon_2 = \\epsilon_1 - f(\\epsilon_1)/f'(\\epsilon_1) \\approx ${mf(e2,5)}$.`,
       `$f(\\epsilon)=E\\epsilon+k\\epsilon^3-\\sigma$ and $f'(\\epsilon)=E+3k\\epsilon^2$. Step 1: since $\\epsilon_0=0$, $f'(\\epsilon_0)=E$, so $\\epsilon_1 = \\sigma/E \\approx ${mf(e1,5)}$. Step 2: $f(\\epsilon_1)=k\\epsilon_1^3 \\approx ${mf(f1,5)}$ and $f'(\\epsilon_1) \\approx ${mf(fp1,3)}$, so $\\epsilon_2 = \\epsilon_1 - f(\\epsilon_1)/f'(\\epsilon_1) \\approx ${mf(e2,5)}$.`)]; }
);

// ---------- Enhet 1: Interpolasjon og integrasjon ----------
THEORY("NUM", 1, {
nb: md`## Hva handler det om?
Ofte har du bare noen få kjente punkter – fra en tabell, en sensor eller en beregning – og trenger en verdi mellom dem, eller et areal under en kurve du ikke kan integrere for hånd. **Interpolasjon** bygger en funksjon som går nøyaktig gjennom de kjente punktene, mens **numerisk integrasjon** tilnærmer et bestemt integral ved å summere areal av enkle former (rektangler, trapeser, parabler).

## Begreper og formler
- **Lineær interpolasjon** mellom $(x_0,y_0)$ og $(x_1,y_1)$: $y = y_0 + \dfrac{y_1-y_0}{x_1-x_0}(x-x_0)$.
- **Lagrange-interpolasjon**: for $n+1$ punkter finnes et entydig polynom av grad høyst $n$ som går gjennom alle punktene. Det bygges som en sum av basispolynomer $L_i(x)$, ett per punkt, der $L_i(x_i)=1$ og $L_i(x_j)=0$ for $j\neq i$.
- **Runges fenomen**: høygradig interpolasjon i jevnt fordelte punkter kan gi store, urealistiske svingninger nær endene. Løses med lavere grad, Chebyshev-punkter eller **splines** (stykkevise polynomer, glatte i skjøtene).
- **Midtpunktregelen**: den enkleste kvadraturregelen, $\int_a^b f(x)\,dx \approx (b-a)f\big(\tfrac{a+b}2\big)$.
- **Trapesmetoden**: $\int_a^b f(x)\,dx \approx (b-a)\dfrac{f(a)+f(b)}2$. Sammensatt med $n$ like store intervaller ($h=(b-a)/n$): $\dfrac{h}{2}\big(f_0+2f_1+\dots+2f_{n-1}+f_n\big)$. Feilen er $O(h^2)$.
- **Simpsons metode**: bruker parabler over par av intervaller, eksakt for polynomer opp til grad 3. Sammensatt (krever partall antall intervaller): $\dfrac{h}{3}\big(f_0+4f_1+2f_2+4f_3+\dots+f_n\big)$. Feilen er $O(h^4)$.

## Slik løser du oppgavene
1. Sjekk hva du skal gjøre: finne en mellomliggende verdi (interpolasjon) eller et areal/integral (kvadratur).
2. Ved interpolasjon: sett opp riktig formel (lineær for 2 punkter, Lagrange/kvadratisk for 3).
3. Ved integrasjon: finn $h$, regn ut funksjonsverdiene i alle punktene, og bruk riktig vektet sum.
4. Sjekk om metoden er eksakt for funksjonstypen (f.eks. er Simpson eksakt for et tredjegradspolynom).

### Eksempel
Interpoler kvadratisk gjennom $(0,0)$, $(1,1)$ og $(2,4)$ (altså $y=x^2$). Finn $y$ i $x=1{,}5$ med Lagranges formel.
$$L_0=\dfrac{(x-1)(x-2)}{(0-1)(0-2)},\ \ L_1=\dfrac{(x-0)(x-2)}{(1-0)(1-2)},\ \ L_2=\dfrac{(x-0)(x-1)}{(2-0)(2-1)}$$
I $x=1{,}5$: $L_0=-0{,}125$, $L_1=0{,}75$ og $L_2=0{,}375$. Da blir $y = 0\cdot L_0 + 1\cdot L_1 + 4\cdot L_2 = 0{,}75+1{,}5 = 2{,}25$, akkurat som $1{,}5^2$.

## Vanlige feil
- Å bruke Simpson med et oddetall delintervaller (metoden krever partall).
- Å tro trapesmetoden er eksakt for en krum kurve, ikke bare for en rett linje.
- Å blande sammen antall punkter og antall intervaller ($n+1$ punkter gir $n$ intervaller).
- Å ekstrapolere (gå utenfor datapunktene) og tro resultatet er like pålitelig som interpolasjon.

> Jo flere og jevnere fordelte punkter, desto bedre interpolasjon og integrasjon – men høy grad med jevnt fordelte punkter kan gi svingninger (Runges fenomen). Simpson er nesten alltid bedre enn trapes for samme antall punkter.`,
en: md`## What is it about?
Often you only have a few known points – from a table, a sensor or a calculation – and need a value between them, or the area under a curve you cannot integrate by hand. **Interpolation** builds a function that passes exactly through the known points, while **numerical integration** approximates a definite integral by summing the area of simple shapes (rectangles, trapezoids, parabolas).

## Concepts and formulas
- **Linear interpolation** between $(x_0,y_0)$ and $(x_1,y_1)$: $y = y_0 + \dfrac{y_1-y_0}{x_1-x_0}(x-x_0)$.
- **Lagrange interpolation**: for $n+1$ points there is a unique polynomial of degree at most $n$ passing through all of them. It is built as a sum of basis polynomials $L_i(x)$, one per point, where $L_i(x_i)=1$ and $L_i(x_j)=0$ for $j\neq i$.
- **Runge's phenomenon**: high-degree interpolation at evenly spaced points can produce large, unrealistic oscillations near the ends. This is avoided with a lower degree, Chebyshev points, or **splines** (piecewise polynomials, smooth at the joints).
- **Midpoint rule**: the simplest quadrature rule, $\int_a^b f(x)\,dx \approx (b-a)f\big(\tfrac{a+b}2\big)$.
- **Trapezoidal rule**: $\int_a^b f(x)\,dx \approx (b-a)\dfrac{f(a)+f(b)}2$. Composite, with $n$ equal intervals ($h=(b-a)/n$): $\dfrac{h}{2}\big(f_0+2f_1+\dots+2f_{n-1}+f_n\big)$. The error is $O(h^2)$.
- **Simpson's rule**: uses parabolas over pairs of intervals, exact for polynomials up to degree 3. Composite (requires an even number of intervals): $\dfrac{h}{3}\big(f_0+4f_1+2f_2+4f_3+\dots+f_n\big)$. The error is $O(h^4)$.

## How to solve the problems
1. Check what is asked for: an in-between value (interpolation) or an area/integral (quadrature).
2. For interpolation: set up the right formula (linear for 2 points, Lagrange/quadratic for 3).
3. For integration: find $h$, evaluate the function at every point, and use the correct weighted sum.
4. Check whether the method is exact for that type of function (e.g. Simpson is exact for a cubic polynomial).

### Example
Interpolate quadratically through $(0,0)$, $(1,1)$ and $(2,4)$ (i.e. $y=x^2$). Find $y$ at $x=1.5$ with Lagrange's formula.
$$L_0=\dfrac{(x-1)(x-2)}{(0-1)(0-2)},\ \ L_1=\dfrac{(x-0)(x-2)}{(1-0)(1-2)},\ \ L_2=\dfrac{(x-0)(x-1)}{(2-0)(2-1)}$$
At $x=1.5$: $L_0=-0.125$, $L_1=0.75$ and $L_2=0.375$. Then $y = 0\cdot L_0 + 1\cdot L_1 + 4\cdot L_2 = 0.75+1.5 = 2.25$, exactly like $1.5^2$.

## Common mistakes
- Using Simpson's rule with an odd number of intervals (the method requires an even number).
- Believing the trapezoidal rule is exact for a curved function, not just for a straight line.
- Confusing the number of points with the number of intervals ($n+1$ points give $n$ intervals).
- Extrapolating (going outside the data points) and assuming the result is as reliable as interpolation.

> More, evenly spaced points generally improve interpolation and integration – but a high degree with evenly spaced points can cause oscillations (Runge's phenomenon). Simpson's rule is almost always better than the trapezoidal rule for the same number of points.`
});

BIQ("NUM", 1, [
  [md`Hvorfor bruker man numerisk integrasjon i stedet for å integrere analytisk?`,
   ["Fordi mange funksjoner eller måledata ikke har noen enkel antiderivert", "Fordi det alltid gir et eksakt svar", "Fordi det er raskere for alle funksjoner, også de enkleste", "Fordi analytisk integrasjon ikke finnes for polynomer"],
   md`Analytisk integrasjon krever en kjent antiderivert. For mange funksjoner (eller data fra tabeller/sensorer) finnes ingen enkel antiderivert, og da må integralet tilnærmes numerisk.`,
   md`Why do we use numerical integration instead of integrating analytically?`,
   ["Because many functions or measured data sets have no simple antiderivative", "Because it always gives an exact answer", "Because it is faster for every function, even the simplest ones", "Because analytic integration does not exist for polynomials"],
   md`Analytic integration requires a known antiderivative. For many functions (or data from tables/sensors) no simple antiderivative exists, so the integral must be approximated numerically.`],
  [md`Sammensatt (composite) Simpsons metode krever at antall delintervaller er …`,
   ["et partall", "et oddetall", "et primtall", "et kvadrattall"],
   md`Simpson kombinerer intervallene to og to (én parabel per par), så antallet delintervaller må være partall. Med et oddetall må man bruke en annen metode på det siste intervallet.`,
   md`Composite Simpson's rule requires the number of subintervals to be …`,
   ["an even number", "an odd number", "a prime number", "a perfect square"],
   md`Simpson combines the intervals two at a time (one parabola per pair), so the number of subintervals must be even. With an odd number, another method must be used on the last interval.`],
  [md`Interpoler kvadratisk gjennom punktene $(0,1)$, $(2,5)$ og $(4,17)$. Hva er $y$ ved $x=3$?`,
   {n: 10, tol: 0.01, u: ""},
   md`Lagrange: $L_0(3)=\dfrac{(3-2)(3-4)}{(0-2)(0-4)}=-0{,}125$, $L_1(3)=\dfrac{(3-0)(3-4)}{(2-0)(2-4)}=0{,}75$ og $L_2(3)=\dfrac{(3-0)(3-2)}{(4-0)(4-2)}=0{,}375$. Da er $y=1\cdot(-0{,}125)+5\cdot 0{,}75+17\cdot 0{,}375=10$.`,
   md`Interpolate quadratically through the points $(0,1)$, $(2,5)$ and $(4,17)$. What is $y$ at $x=3$?`,
   null,
   md`Lagrange: $L_0(3)=\dfrac{(3-2)(3-4)}{(0-2)(0-4)}=-0.125$, $L_1(3)=\dfrac{(3-0)(3-4)}{(2-0)(2-4)}=0.75$ and $L_2(3)=\dfrac{(3-0)(3-2)}{(4-0)(4-2)}=0.375$. Then $y=1\cdot(-0.125)+5\cdot 0.75+17\cdot 0.375=10$.`]
]);

GEN("NUM", 1,
 // enkel: midtpunktregelen med ett intervall
 ()=>{ const a=R.i(0,3), b=a+R.i(2,6), m=(a+b)/2, est=(b-a)*m*m;
   return [T(`Bruk midtpunktregelen med ett intervall til å tilnærme $\\displaystyle\\int_{${a}}^{${b}} x^2\\,dx$.`,`Use the midpoint rule with one interval to approximate $\\displaystyle\\int_{${a}}^{${b}} x^2\\,dx$.`),
     {n:est, tol:rel(est,0.01,0.01), u:""},
     T(`Midtpunktet er $m=(${a}+${b})/2=${mf(m)}$. Regelen gir $(b-a)f(m)=${b-a}\\cdot ${mf(m)}^2 \\approx ${mf(est,2)}$.`,
       `The midpoint is $m=(${a}+${b})/2=${mf(m)}$. The rule gives $(b-a)f(m)=${b-a}\\cdot ${mf(m)}^2 \\approx ${mf(est,2)}$.`)]; },
 // eksamen: sammensatt trapesmetode på effektmålinger for å finne energi
 ()=>{ const P=Array.from({length:5},()=>R.i(50,400)), h=R.f(0.5,3,0.5);
   const E=h*(P[0]/2+P[1]+P[2]+P[3]+P[4]/2);
   const sumTxt=`${P[0]}/2 + ${P[1]} + ${P[2]} + ${P[3]} + ${P[4]}/2`;
   return [T(`Effekten fra en generator er målt til ${P.join(", ")} kW ved fem like store tidsintervaller (steglengde $h=${mf(h)}$ s). Bruk sammensatt trapesmetode til å finne energien som er levert.`,
             `The power output of a generator is measured as ${P.join(", ")} kW at five equally spaced instants (step length $h=${mf(h)}$ s). Use the composite trapezoidal rule to find the energy delivered.`),
     {n:E, tol:rel(E,0.01,0.5), u:"kJ"},
     T(`$E = h\\big(\\tfrac{P_0}{2}+P_1+P_2+P_3+\\tfrac{P_4}{2}\\big) = ${mf(h)}\\cdot(${sumTxt}) \\approx ${mf(E,1)}$ kJ.`,
       `$E = h\\big(\\tfrac{P_0}{2}+P_1+P_2+P_3+\\tfrac{P_4}{2}\\big) = ${mf(h)}\\cdot(${sumTxt}) \\approx ${mf(E,1)}$ kJ.`)]; }
);

// ---------- Enhet 2: Differensialligninger og stabilitet ----------
THEORY("NUM", 2, {
nb: md`## Hva handler det om?
Mange fysiske prosesser (nedkjøling, elektriske kretser, kjemiske reaksjoner, mekaniske svingninger) beskrives med differensialligninger uten noen enkel formel for løsningen. Numeriske løsere bygger løsningen skritt for skritt: gitt $y$ ved tiden $t$, regner de ut en tilnærming for $y$ ved $t+h$. Som ingeniør bruker du dette til å simulere systemer over tid, for eksempel temperaturen i en motor eller strømmen i en krets.

## Begreper og formler
- **Eulers eksplisitte metode**: $y_{n+1} = y_n + h f(t_n, y_n)$. Orden 1 (global feil $O(h)$). Enkel, men kan kreve svært liten $h$.
- **Heuns metode (forbedret Euler)**: en prediktor-korrektor-metode av orden 2. Prediktor: $y_p = y_n + h f(t_n,y_n)$. Korrektor: $y_{n+1} = y_n + \dfrac{h}{2}\big(f(t_n,y_n)+f(t_{n+1},y_p)\big)$ – altså gjennomsnittet av stigningstallet i start- og sluttpunktet av steget.
- **Bakover (implisitt) Euler**: $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$. $y_{n+1}$ står på begge sider, så man må løse en ligning. Dyrere per steg, men stabil selv med store $h$ – viktig for stive problemer.
- **Runge–Kutta 4 (RK4)**: orden 4, bruker fire vurderinger av $f$ per steg: $k_1=f(t_n,y_n)$, $k_2=f(t_n+\tfrac h2,y_n+\tfrac h2k_1)$, $k_3=f(t_n+\tfrac h2,y_n+\tfrac h2k_2)$, $k_4=f(t_n+h,y_n+hk_3)$, og $y_{n+1}=y_n+\dfrac h6(k_1+2k_2+2k_3+k_4)$.
- **Stivt problem**: svært ulike tidsskalaer i samme system. Eksplisitte metoder trenger da urealistisk liten $h$ for å være stabile, selv om selve nøyaktighetskravet ikke krever det.
- **Stabilitet**: for $y'=\lambda y$ er eksplisitt Euler stabil bare når $|1+h\lambda|\leq 1$. Implisitte metoder er stabile for mye større $h$.

## Slik løser du oppgavene
1. Identifiser $f(t,y)$, startverdien og steglengden $h$.
2. Velg riktig metode ut fra hva oppgaven spør om (Euler, Heun, RK4 eller implisitt).
3. Regn ut ett steg av gangen, og bruk resultatet fra forrige steg som utgangspunkt for det neste.
4. For stabilitet: sett opp $|1+h\lambda|$ (eksplisitt Euler) og sammenlign med 1.

### Eksempel
Løs $y'=-2y$, $y(0)=5$, med ett steg av Heuns metode og $h=0{,}5$.
1. $f(t,y)=-2y$, så $f(t_0,y_0)=-2\cdot5=-10$.
2. Prediktor: $y_p = 5 + 0{,}5\cdot(-10) = 0$.
3. Korrektor: $f(t_1,y_p)=-2\cdot 0=0$, så $y_1 = 5 + \dfrac{0{,}5}{2}(-10+0) = 5-2{,}5=2{,}5$.

Til sammenligning gir eksplisitt Euler $y_1=5+0{,}5\cdot(-10)=0$ – Heuns metode er mer nøyaktig fordi den bruker gjennomsnittet av to stigningstall.

## Vanlige feil
- Å bruke $y_n$ i stedet for prediktoren $y_p$ når man regner ut korrektorsteget i Heuns metode.
- Å tro implisitt Euler er «feil» fordi $y_{n+1}$ står på begge sider – det er nettopp poenget, og for et lineært problem kan man løse det algebraisk.
- Å bruke en for stor $h$ på et stivt problem med en eksplisitt metode, og få et resultat som «eksploderer».
- Å blande sammen antall funksjonsevalueringer (RK4 bruker fire per steg) med antall tidssteg.

> Jo høyere orden, desto mer nøyaktig per steg – men implisitte metoder vinner på stabilitet, ikke nøyaktighet, og er derfor best for stive problemer.`,
en: md`## What is it about?
Many physical processes (cooling, electrical circuits, chemical reactions, mechanical vibrations) are described by differential equations with no simple formula for the solution. Numerical solvers build the solution step by step: given $y$ at time $t$, they compute an approximation of $y$ at $t+h$. As an engineer you use this to simulate systems over time, for example the temperature in an engine or the current in a circuit.

## Concepts and formulas
- **Euler's explicit method**: $y_{n+1} = y_n + h f(t_n, y_n)$. Order 1 (global error $O(h)$). Simple, but can require a very small $h$.
- **Heun's method (improved Euler)**: a predictor–corrector method of order 2. Predictor: $y_p = y_n + h f(t_n,y_n)$. Corrector: $y_{n+1} = y_n + \dfrac{h}{2}\big(f(t_n,y_n)+f(t_{n+1},y_p)\big)$ – i.e. the average of the slope at the start and end of the step.
- **Backward (implicit) Euler**: $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$. $y_{n+1}$ appears on both sides, so an equation must be solved. More expensive per step, but stable even for large $h$ – important for stiff problems.
- **Classic Runge–Kutta (RK4)**: order 4, uses four evaluations of $f$ per step: $k_1=f(t_n,y_n)$, $k_2=f(t_n+\tfrac h2,y_n+\tfrac h2k_1)$, $k_3=f(t_n+\tfrac h2,y_n+\tfrac h2k_2)$, $k_4=f(t_n+h,y_n+hk_3)$, and $y_{n+1}=y_n+\dfrac h6(k_1+2k_2+2k_3+k_4)$.
- **Stiff problem**: very different time scales in the same system. Explicit methods then need an unrealistically small $h$ to stay stable, even though the accuracy requirement itself does not demand it.
- **Stability**: for $y'=\lambda y$, explicit Euler is stable only when $|1+h\lambda|\leq 1$. Implicit methods are stable for much larger $h$.

## How to solve the problems
1. Identify $f(t,y)$, the initial value and the step size $h$.
2. Choose the right method based on what the problem asks for (Euler, Heun, RK4 or implicit).
3. Compute one step at a time, using the result of the previous step as the starting point for the next.
4. For stability: form $|1+h\lambda|$ (explicit Euler) and compare it with 1.

### Example
Solve $y'=-2y$, $y(0)=5$, with one step of Heun's method and $h=0.5$.
1. $f(t,y)=-2y$, so $f(t_0,y_0)=-2\cdot5=-10$.
2. Predictor: $y_p = 5 + 0.5\cdot(-10) = 0$.
3. Corrector: $f(t_1,y_p)=-2\cdot 0=0$, so $y_1 = 5 + \dfrac{0.5}{2}(-10+0) = 5-2.5=2.5$.

For comparison, explicit Euler gives $y_1=5+0.5\cdot(-10)=0$ – Heun's method is more accurate because it uses the average of two slopes.

## Common mistakes
- Using $y_n$ instead of the predictor $y_p$ when computing the corrector step in Heun's method.
- Believing implicit Euler is "wrong" because $y_{n+1}$ appears on both sides – that is exactly the point, and for a linear problem it can be solved algebraically.
- Using too large an $h$ for a stiff problem with an explicit method, and getting a result that "explodes".
- Confusing the number of function evaluations (RK4 uses four per step) with the number of time steps.

> Higher order means more accuracy per step – but implicit methods win on stability, not accuracy, and are therefore best for stiff problems.`
});

BIQ("NUM", 2, [
  [md`Hva er Heuns metode (forbedret Euler)?`,
   ["En prediktor-korrektor-metode som bruker gjennomsnittet av stigningstallet i start- og sluttpunktet av steget", "Det samme som RK4", "En implisitt metode som krever ligningsløsning i hvert steg", "En metode med global feil $O(h^4)$"],
   md`Man regner først en prediktor med vanlig Euler, og bruker så gjennomsnittet av stigningstallet i start- og sluttpunktet til å korrigere steget. Det gir orden 2, mens RK4 har orden 4 og bruker fire vurderinger av $f$.`,
   md`What is Heun's method (improved Euler)?`,
   ["A predictor–corrector method that uses the average of the slope at the start and end of the step", "The same thing as RK4", "An implicit method that requires solving an equation at every step", "A method with global error $O(h^4)$"],
   md`A predictor is first computed with plain Euler, and then the average of the slope at the start and end of the step is used to correct it. This gives order 2, while RK4 has order 4 and uses four evaluations of $f$.`],
  [md`Hvorfor er en eksplisitt metode som Euler ofte ustabil for stive problemer, selv om selve nøyaktighetskravet ikke krever en liten steglengde?`,
   ["Fordi stabilitetsgrensen for steglengden er mye strengere enn nøyaktighetskravet", "Fordi eksplisitte metoder alltid divergerer for stive problemer", "Fordi steglengden aldri kan gjøres liten nok for et stivt problem", "Fordi stive problemer i prinsippet ikke kan løses numerisk"],
   md`For et stivt problem er det stabilitetskravet, ikke nøyaktighetskravet, som tvinger fram en svært liten $h$ i en eksplisitt metode. Implisitte metoder unngår dette fordi de er stabile for mye større $h$.`,
   md`Why is an explicit method such as Euler often unstable for stiff problems, even when the accuracy requirement itself does not call for a small step size?`,
   ["Because the stability limit on the step size is much stricter than the accuracy requirement", "Because explicit methods always diverge for stiff problems", "Because the step size can never be made small enough for a stiff problem", "Because stiff problems cannot in principle be solved numerically"],
   md`For a stiff problem it is the stability requirement, not the accuracy requirement, that forces a very small $h$ in an explicit method. Implicit methods avoid this because they are stable for much larger $h$.`],
  [md`Bruk ett steg med bakover (implisitt) Euler på $y'=-3y$, $y(0)=5$ og $h=0{,}2$. Hva er $y_1$?`,
   {n: 3.125, tol: 0.001, u: ""},
   md`$y_1 = y_0 + hf(t_1,y_1) = 5 - 3h\,y_1$, så $y_1(1+3h)=y_0$. Det gir $y_1 = \dfrac{5}{1+3\cdot 0{,}2} = \dfrac{5}{1{,}6} = 3{,}125$.`,
   md`Use one step of backward (implicit) Euler on $y'=-3y$, $y(0)=5$ and $h=0.2$. What is $y_1$?`,
   null,
   md`$y_1 = y_0 + hf(t_1,y_1) = 5 - 3h\,y_1$, so $y_1(1+3h)=y_0$. This gives $y_1 = \dfrac{5}{1+3\cdot 0.2} = \dfrac{5}{1.6} = 3.125$.`]
]);

GEN("NUM", 2,
 // medium: ett steg med Heuns metode
 ()=>{ const k=R.f(0.1,2,0.1), h=R.f(0.05,0.5,0.05), y0=R.i(2,20);
   const k1=-k*y0, yp=y0+h*k1, k2=-k*yp, y1=y0+h/2*(k1+k2);
   return [T(`Bruk ett steg med Heuns metode (forbedret Euler) på $y'=-${mf(k)}y$, $y(0)=${y0}$ og steglengde $h=${mf(h)}$. Hva er $y_1$?`,
             `Use one step of Heun's method (improved Euler) on $y'=-${mf(k)}y$, $y(0)=${y0}$ and step size $h=${mf(h)}$. What is $y_1$?`),
     {n:y1, tol:rel(y1,0.01,0.002), u:""},
     T(`Prediktor: $y_p = ${y0} + ${mf(h)}\\cdot(-${mf(k)}\\cdot ${y0}) \\approx ${mf(yp,4)}$. Korrektor: $y_1 = ${y0} + \\dfrac{${mf(h)}}{2}\\big((-${mf(k)}\\cdot ${y0})+(-${mf(k)}\\cdot ${mf(yp,4)})\\big) \\approx ${mf(y1,4)}$.`,
       `Predictor: $y_p = ${y0} + ${mf(h)}\\cdot(-${mf(k)}\\cdot ${y0}) \\approx ${mf(yp,4)}$. Corrector: $y_1 = ${y0} + \\dfrac{${mf(h)}}{2}\\big((-${mf(k)}\\cdot ${y0})+(-${mf(k)}\\cdot ${mf(yp,4)})\\big) \\approx ${mf(y1,4)}$.`)]; },
 // eksamen: ett steg med RK4 for nedkjøling av et objekt
 ()=>{ const k=R.f(0.05,0.5,0.05), h=R.i(1,5), T0=R.i(60,95), Ta=R.i(15,25);
   const k1=-k*(T0-Ta), k2=-k*(T0+h/2*k1-Ta), k3=-k*(T0+h/2*k2-Ta), k4=-k*(T0+h*k3-Ta);
   const T1=T0+h/6*(k1+2*k2+2*k3+k4);
   return [T(`Et objekt kjøles ned etter $T'=-k(T-T_a)$, med $k=${mf(k)}$ per minutt, romtemperatur $T_a=${Ta}$ °C og starttemperatur $T_0=${T0}$ °C. Bruk ett steg med RK4 og $h=${h}$ min. Hva er $T_1$?`,
             `An object cools according to $T'=-k(T-T_a)$, with $k=${mf(k)}$ per minute, ambient temperature $T_a=${Ta}$ °C and initial temperature $T_0=${T0}$ °C. Use one step of RK4 with $h=${h}$ min. What is $T_1$?`),
     {n:T1, tol:rel(T1,0.01,0.05), u:"°C"},
     T(`$f(T)=-k(T-T_a)$. $k_1 \\approx ${mf(k1,4)}$, $k_2 \\approx ${mf(k2,4)}$, $k_3 \\approx ${mf(k3,4)}$, $k_4 \\approx ${mf(k4,4)}$. $T_1 = T_0 + \\dfrac{h}{6}(k_1+2k_2+2k_3+k_4) \\approx ${mf(T1,3)}$ °C.`,
       `$f(T)=-k(T-T_a)$. $k_1 \\approx ${mf(k1,4)}$, $k_2 \\approx ${mf(k2,4)}$, $k_3 \\approx ${mf(k3,4)}$, $k_4 \\approx ${mf(k4,4)}$. $T_1 = T_0 + \\dfrac{h}{6}(k_1+2k_2+2k_3+k_4) \\approx ${mf(T1,3)}$ °C.`)]; }
);

// ================================================================
// MEK2200 Statistikk og risikoanalyse
// ================================================================

// ---------- Enhet 0: Sannsynlighet ----------
THEORY("MEK2200", 0, {
nb: md`## Hva handler det om?
Sannsynlighetsregning gir deg verktøy til å håndtere usikkerhet: hvor sannsynlig er det at en komponent svikter, at en test gir riktig svar, eller at to hendelser skjer samtidig? Som ingeniør bruker du dette til pålitelighetsberegninger, kvalitetskontroll og risikovurdering.

## Begreper og formler
- **Sannsynlighet** $P(A)$ ligger mellom 0 og 1. $P(A^c)=1-P(A)$ (komplement).
- **Union**: $P(A\cup B) = P(A)+P(B)-P(A\cap B)$. For disjunkte (uforenlige) hendelser er $P(A\cap B)=0$, så $P(A\cup B)=P(A)+P(B)$.
- **Betinget sannsynlighet**: $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}$ – sannsynligheten for $A$ gitt at $B$ har skjedd.
- **Uavhengighet**: $A$ og $B$ er uavhengige hvis $P(A\cap B)=P(A)P(B)$. Disjunkte hendelser (med positiv sannsynlighet) er faktisk avhengige, siden det ene utelukker det andre.
- **Bayes' formel**: $P(A\mid B) = \dfrac{P(B\mid A)P(A)}{P(B)}$ – brukes til å snu betingelsen (f.eks. fra «testresultat gitt tilstand» til «tilstand gitt testresultat»).
- **Pålitelighet**: komponenter i **serie** krever at alle virker: $R=R_1R_2\cdots$. Komponenter i **parallell** krever at minst én virker: $R=1-(1-R_1)(1-R_2)\cdots$.
- **Kombinatorikk**: antall måter å velge $k$ av $n$ uten hensyn til rekkefølge: $\binom{n}{k}=\dfrac{n!}{k!(n-k)!}$. Med hensyn til rekkefølge (permutasjoner av $k$ av $n$): $n(n-1)\cdots(n-k+1)$.

## Slik løser du oppgavene
1. Identifiser hva som spørres om: union, snitt, komplement, betinget sannsynlighet eller Bayes.
2. Sjekk om hendelsene er uavhengige, disjunkte eller ingen av delene – det avgjør hvilken formel som gjelder.
3. Ved pålitelighet: tegn opp om komponentene er i serie, parallell eller en kombinasjon.
4. Ved telling: avgjør om rekkefølgen betyr noe (permutasjon) eller ikke (kombinasjon).

### Eksempel
En brannalarm har to uavhengige sensorer i parallell, hver med pålitelighet 0,95 (sannsynlighet for at den fungerer når det brenner). Hva er sannsynligheten for at alarmen IKKE utløses?
Systemet virker hvis minst én sensor virker: $R = 1-(1-0{,}95)(1-0{,}95) = 1-0{,}05^2 = 1-0{,}0025 = 0{,}9975$.
Sannsynligheten for at alarmen ikke utløses, er komplementet: $1-0{,}9975 = 0{,}0025$.

## Vanlige feil
- Å tro at disjunkte hendelser er uavhengige. De er faktisk sterkt avhengige: skjer den ene, kan ikke den andre skje.
- Å legge sammen sannsynligheter uten å trekke fra snittet når hendelsene ikke er disjunkte.
- Å forveksle serie og parallell: serie er svakere (alle må virke), parallell er sterkere (én er nok).
- Å bruke kombinasjoner når rekkefølgen faktisk betyr noe, eller omvendt.

> Uavhengighet handler om at én hendelse ikke påvirker sannsynligheten for den andre – det er noe helt annet enn at hendelsene ikke kan skje samtidig.`,
en: md`## What is it about?
Probability theory gives you tools to handle uncertainty: how likely is it that a component fails, that a test gives the correct result, or that two events happen at the same time? As an engineer you use this for reliability calculations, quality control and risk assessment.

## Concepts and formulas
- **Probability** $P(A)$ lies between 0 and 1. $P(A^c)=1-P(A)$ (complement).
- **Union**: $P(A\cup B) = P(A)+P(B)-P(A\cap B)$. For disjoint (mutually exclusive) events $P(A\cap B)=0$, so $P(A\cup B)=P(A)+P(B)$.
- **Conditional probability**: $P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}$ – the probability of $A$ given that $B$ has occurred.
- **Independence**: $A$ and $B$ are independent if $P(A\cap B)=P(A)P(B)$. Disjoint events (with positive probability) are actually dependent, since one rules out the other.
- **Bayes' formula**: $P(A\mid B) = \dfrac{P(B\mid A)P(A)}{P(B)}$ – used to flip the conditioning (e.g. from "test result given condition" to "condition given test result").
- **Reliability**: components in **series** require all of them to work: $R=R_1R_2\cdots$. Components in **parallel** require at least one to work: $R=1-(1-R_1)(1-R_2)\cdots$.
- **Combinatorics**: number of ways to choose $k$ out of $n$ regardless of order: $\binom{n}{k}=\dfrac{n!}{k!(n-k)!}$. With order taken into account (permutations of $k$ out of $n$): $n(n-1)\cdots(n-k+1)$.

## How to solve the problems
1. Identify what is being asked: union, intersection, complement, conditional probability or Bayes.
2. Check whether the events are independent, disjoint or neither – that decides which formula applies.
3. For reliability: sketch whether the components are in series, parallel or a combination.
4. For counting: decide whether the order matters (permutation) or not (combination).

### Example
A fire alarm has two independent sensors in parallel, each with reliability 0.95 (probability of working when there is a fire). What is the probability that the alarm does NOT trigger?
The system works if at least one sensor works: $R = 1-(1-0.95)(1-0.95) = 1-0.05^2 = 1-0.0025 = 0.9975$.
The probability that the alarm does not trigger is the complement: $1-0.9975 = 0.0025$.

## Common mistakes
- Believing that disjoint events are independent. They are actually strongly dependent: if one happens, the other cannot.
- Adding probabilities without subtracting the intersection when the events are not disjoint.
- Confusing series and parallel: series is weaker (everything must work), parallel is stronger (one is enough).
- Using combinations when order actually matters, or the other way around.

> Independence is about one event not affecting the probability of the other – that is something completely different from the events not being able to happen at the same time.`
});

BIQ("MEK2200", 0, [
  [md`Hva er $P(A\mid B)$ (betinget sannsynlighet)?`,
   ["$\\dfrac{P(A\\cap B)}{P(B)}$", "$P(A)P(B)$", "$\\dfrac{P(A\\cup B)}{P(B)}$", "$\\dfrac{P(B)}{P(A)}$"],
   md`Betinget sannsynlighet er andelen av $B$ som også ligger i $A$: $P(A\mid B)=P(A\cap B)/P(B)$. Denne brukes blant annet til å utlede Bayes' formel.`,
   md`What is $P(A\mid B)$ (conditional probability)?`,
   ["$\\dfrac{P(A\\cap B)}{P(B)}$", "$P(A)P(B)$", "$\\dfrac{P(A\\cup B)}{P(B)}$", "$\\dfrac{P(B)}{P(A)}$"],
   md`Conditional probability is the fraction of $B$ that also lies in $A$: $P(A\mid B)=P(A\cap B)/P(B)$. This is used, among other things, to derive Bayes' formula.`],
  [md`To hendelser er disjunkte (kan ikke skje samtidig). Er de dermed uavhengige?`,
   ["Nei, disjunkte hendelser med positiv sannsynlighet er avhengige", "Ja, disjunkte hendelser er alltid uavhengige", "Ja, men bare hvis $P(A)=P(B)$", "Det avhenger av om de er komplementære"],
   md`Uavhengighet krever $P(A\cap B)=P(A)P(B)$. Disjunkte hendelser har $P(A\cap B)=0$, så de er bare uavhengige hvis $P(A)=0$ eller $P(B)=0$. Ellers er det å vite at den ene skjedde, svært informativt om den andre (den kan ikke ha skjedd) – altså avhengighet.`,
   md`Two events are disjoint (cannot happen at the same time). Does that make them independent?`,
   ["No, disjoint events with positive probability are dependent", "Yes, disjoint events are always independent", "Yes, but only if $P(A)=P(B)$", "It depends on whether they are complementary"],
   md`Independence requires $P(A\cap B)=P(A)P(B)$. Disjoint events have $P(A\cap B)=0$, so they are only independent if $P(A)=0$ or $P(B)=0$. Otherwise, knowing that one occurred is highly informative about the other (it cannot have occurred) – that is dependence.`],
  [md`På hvor mange måter kan du velge og rangere en førsteplass, andreplass og tredjeplass blant 10 deltakere?`,
   {n: 720, tol: 0, u: ""},
   md`Rekkefølgen betyr noe (permutasjon av 3 av 10): $10\cdot 9\cdot 8 = 720$.`,
   md`In how many ways can you choose and rank a first, second and third place among 10 participants?`,
   null,
   md`Order matters here (permutation of 3 out of 10): $10\cdot 9\cdot 8 = 720$.`]
]);

GEN("MEK2200", 0,
 // enkel: betinget sannsynlighet fra P(A) og P(A∩B)
 ()=>{ const pA=R.f(0.4,0.9,0.05), frac=R.f(0.1,0.7,0.05), pI=+(pA*frac).toFixed(3), ans=pI/pA;
   return [T(`I en gruppe er $P(A)=${mf(pA)}$ og $P(A\\cap B)=${mf(pI,3)}$. Hva er $P(B\\mid A)$?`,
             `In a group, $P(A)=${mf(pA)}$ and $P(A\\cap B)=${mf(pI,3)}$. What is $P(B\\mid A)$?`),
     {n:ans, tol:rel(ans,0.01,0.003), u:""},
     T(`$P(B\\mid A) = \\dfrac{P(A\\cap B)}{P(A)} = \\dfrac{${mf(pI,3)}}{${mf(pA)}} \\approx ${mf(ans,3)}$.`,
       `$P(B\\mid A) = \\dfrac{P(A\\cap B)}{P(A)} = \\dfrac{${mf(pI,3)}}{${mf(pA)}} \\approx ${mf(ans,3)}$.`)]; },
 // eksamen: kombinert pålitelighetsnettverk (parallell + serie)
 ()=>{ const p1=R.f(0.8,0.99,0.01), p2=R.f(0.8,0.99,0.01), p3=R.f(0.8,0.99,0.01);
   const Rp=1-(1-p1)*(1-p2), Rsys=Rp*p3;
   return [T(`Et system har to uavhengige, redundante sensorer i parallell (pålitelighet ${nf(p1)} og ${nf(p2)}), koblet i serie med en styringsenhet med pålitelighet ${nf(p3)}. Hva er systemets totale pålitelighet?`,
             `A system has two independent, redundant sensors in parallel (reliability ${nf(p1)} and ${nf(p2)}), connected in series with a control unit of reliability ${nf(p3)}. What is the overall system reliability?`),
     {n:Rsys, tol:rel(Rsys,0.01,0.001), u:""},
     T(`Sensorparet: $R_{par} = 1-(1-${mf(p1)})(1-${mf(p2)}) \\approx ${mf(Rp,4)}$. I serie med styringsenheten: $R = R_{par}\\cdot ${mf(p3)} \\approx ${mf(Rsys,4)}$.`,
       `Sensor pair: $R_{par} = 1-(1-${mf(p1)})(1-${mf(p2)}) \\approx ${mf(Rp,4)}$. In series with the control unit: $R = R_{par}\\cdot ${mf(p3)} \\approx ${mf(Rsys,4)}$.`)]; }
);

// ---------- Enhet 1: Fordelinger ----------
THEORY("MEK2200", 1, {
nb: md`## Hva handler det om?
Data fra målinger eller prosesser varierer. Sannsynlighetsfordelinger gir en matematisk modell for denne variasjonen, slik at du kan beregne sannsynligheter, forventede verdier og hvor pålitelig en måling er. Sentralmål (gjennomsnitt, median, modus) og spredningsmål (varians, standardavvik) oppsummerer data; fordelinger som normal-, binomisk- og Poissonfordelingen beskriver hvordan tilfeldige utfall oppstår.

## Begreper og formler
- **Gjennomsnitt** $\bar x = \tfrac1n\sum x_i$. **Median**: den midterste verdien i sortert rekkefølge. **Modus**: verdien som forekommer oftest.
- **Varians og standardavvik**: $\sigma^2=\text{Var}(X)$, $\sigma=\sqrt{\text{Var}(X)}$. Utvalgsvarians bruker $n-1$ i nevneren: $s^2=\tfrac{1}{n-1}\sum(x_i-\bar x)^2$ – dette gir en forventningsrett estimator for populasjonsvariansen (Bessels korreksjon).
- **Normalfordeling**: symmetrisk klokkeform. 68–95–99,7-regelen: omtrent 68 %, 95 % og 99,7 % av sannsynligheten ligger innenfor $\mu\pm1\sigma$, $\pm2\sigma$ og $\pm3\sigma$. **z-verdi**: $z=(x-\mu)/\sigma$.
- **Binomisk fordeling** $X\sim\text{Bin}(n,p)$: antall suksesser i $n$ uavhengige forsøk. $E[X]=np$, $\text{Var}(X)=np(1-p)$, $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$.
- **Poissonfordeling**: antall hendelser i et tidsintervall med rate $\lambda$: $P(X=k)=\lambda^k e^{-\lambda}/k!$.
- **Eksponentialfordeling**: ventetid eller levetid med konstant rate: $P(T>t)=e^{-t/\mu}$.
- **Sentralgrenseteoremet (CLT)**: gjennomsnittet av mange uavhengige målinger blir tilnærmet normalfordelt, uansett den opprinnelige fordelingen.
- **Korrelasjon** $r\in[-1,1]$: styrken på den lineære sammenhengen mellom to variabler. Korrelasjon er ikke det samme som årsakssammenheng.

## Slik løser du oppgavene
1. Bestem hva slags fordeling situasjonen beskriver (antall suksesser → binomisk, hendelser per tid → Poisson, kontinuerlig måling → normal).
2. Finn parametrene ($n,p$ eller $\lambda$ eller $\mu,\sigma$).
3. Bruk riktig formel for det som spørres om: forventning, varians, sannsynlighet for en bestemt verdi, eller z-verdi.
4. Ved normalfordeling: regn om til z-verdi før du bruker en sannsynlighetsregel.

### Eksempel
En maskin produserer deler der 8 % er defekte. Du kontrollerer 5 tilfeldige deler. Hva er sannsynligheten for nøyaktig 1 defekt?
Dette er binomisk med $n=5$, $p=0{,}08$ og $k=1$: $P(X=1)=\binom{5}{1}(0{,}08)^1(0{,}92)^4 = 5\cdot 0{,}08\cdot 0{,}7164 \approx 0{,}2866$.

## Vanlige feil
- Å bruke $n$ i stedet for $n-1$ i utvalgsvariansen (eller omvendt for en hel populasjon).
- Å tro modus alltid er unik – et datasett kan ha flere modi eller ingen.
- Å bruke normalfordelingen på data som åpenbart ikke er symmetriske (f.eks. levetider, som ofte er eksponential- eller Weibullfordelte).
- Å tolke en høy korrelasjon som bevis på årsakssammenheng.

> Sjekk alltid hvilken fordeling som passer situasjonen før du regner – riktig formel avhenger helt av om du teller suksesser, hendelser per tid eller måler noe kontinuerlig.`,
en: md`## What is it about?
Data from measurements or processes vary. Probability distributions give a mathematical model of this variation, so you can compute probabilities, expected values and how reliable a measurement is. Measures of center (mean, median, mode) and spread (variance, standard deviation) summarize data; distributions such as the normal, binomial and Poisson distributions describe how random outcomes arise.

## Concepts and formulas
- **Mean** $\bar x = \tfrac1n\sum x_i$. **Median**: the middle value in sorted order. **Mode**: the value that occurs most often.
- **Variance and standard deviation**: $\sigma^2=\text{Var}(X)$, $\sigma=\sqrt{\text{Var}(X)}$. Sample variance uses $n-1$ in the denominator: $s^2=\tfrac{1}{n-1}\sum(x_i-\bar x)^2$ – this gives an unbiased estimator of the population variance (Bessel's correction).
- **Normal distribution**: symmetric bell shape. The 68–95–99.7 rule: about 68%, 95% and 99.7% of the probability lies within $\mu\pm1\sigma$, $\pm2\sigma$ and $\pm3\sigma$. **z-score**: $z=(x-\mu)/\sigma$.
- **Binomial distribution** $X\sim\text{Bin}(n,p)$: the number of successes in $n$ independent trials. $E[X]=np$, $\text{Var}(X)=np(1-p)$, $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$.
- **Poisson distribution**: the number of events in a time interval with rate $\lambda$: $P(X=k)=\lambda^k e^{-\lambda}/k!$.
- **Exponential distribution**: waiting time or lifetime with a constant rate: $P(T>t)=e^{-t/\mu}$.
- **Central limit theorem (CLT)**: the mean of many independent measurements becomes approximately normally distributed, regardless of the original distribution.
- **Correlation** $r\in[-1,1]$: the strength of the linear relationship between two variables. Correlation is not the same as causation.

## How to solve the problems
1. Decide which kind of distribution the situation describes (number of successes → binomial, events per time → Poisson, continuous measurement → normal).
2. Find the parameters ($n,p$ or $\lambda$ or $\mu,\sigma$).
3. Use the correct formula for what is asked: expectation, variance, the probability of a specific value, or the z-score.
4. For the normal distribution: convert to a z-score before applying a probability rule.

### Example
A machine produces parts where 8% are defective. You inspect 5 random parts. What is the probability of exactly 1 defective part?
This is binomial with $n=5$, $p=0.08$ and $k=1$: $P(X=1)=\binom{5}{1}(0.08)^1(0.92)^4 = 5\cdot 0.08\cdot 0.7164 \approx 0.2866$.

## Common mistakes
- Using $n$ instead of $n-1$ in the sample variance (or the other way around for an entire population).
- Believing the mode is always unique – a data set can have several modes or none.
- Applying the normal distribution to data that is clearly not symmetric (e.g. lifetimes, which are often exponentially or Weibull distributed).
- Interpreting a high correlation as proof of causation.

> Always check which distribution fits the situation before you calculate – the right formula depends entirely on whether you are counting successes, events per time, or measuring something continuous.`
});

BIQ("MEK2200", 1, [
  [md`Hva er modus (typetallet) i et datasett?`,
   ["Den verdien som forekommer oftest", "Den midterste verdien", "Gjennomsnittet av alle verdiene", "Den største verdien minus den minste"],
   md`Modus er den hyppigst forekommende verdien. Det er ikke det samme som medianen (den midterste verdien) eller gjennomsnittet.`,
   md`What is the mode of a data set?`,
   ["The value that occurs most often", "The middle value", "The average of all the values", "The largest value minus the smallest"],
   md`The mode is the most frequently occurring value. It is not the same as the median (the middle value) or the mean.`],
  [md`Hvorfor bruker man $n-1$ (ikke $n$) i nevneren når man regner utvalgsvarians fra et utvalg?`,
   ["Fordi det gir en forventningsrett (unbiased) estimator for populasjonsvariansen", "Fordi det alltid gir et større svar, uansett data", "Det er bare en konvensjon uten statistisk betydning", "Fordi man mister en frihetsgrad ved å bruke variansen i stedet for standardavviket"],
   md`Når gjennomsnittet er beregnet fra det samme utvalget, blir summen av kvadratavvik i snitt litt for liten hvis man deler på $n$. Å dele på $n-1$ (Bessels korreksjon) korrigerer for dette og gir en forventningsrett estimator.`,
   md`Why do we use $n-1$ (not $n$) in the denominator when computing the sample variance from a sample?`,
   ["Because it gives an unbiased estimator of the population variance", "Because it always gives a larger answer, regardless of the data", "It is just a convention with no statistical meaning", "Because a degree of freedom is lost by using the variance instead of the standard deviation"],
   md`When the mean is computed from the same sample, the sum of squared deviations is on average slightly too small if you divide by $n$. Dividing by $n-1$ (Bessel's correction) corrects for this and gives an unbiased estimator.`],
  [md`$X\sim\text{Bin}(n=5,\ p=0{,}3)$. Hva er $P(X=2)$?`,
   {n: 0.3087, tol: 0.001, u: ""},
   md`$P(X=2)=\binom{5}{2}(0{,}3)^2(0{,}7)^3 = 10\cdot 0{,}09\cdot 0{,}343 = 0{,}3087$.`,
   md`$X\sim\text{Bin}(n=5,\ p=0.3)$. What is $P(X=2)$?`,
   null,
   md`$P(X=2)=\binom{5}{2}(0.3)^2(0.7)^3 = 10\cdot 0.09\cdot 0.343 = 0.3087$.`]
]);

GEN("MEK2200", 1,
 // enkel: finn modus
 ()=>{ const mode=R.i(1,20), oth=R.distinct(4,1,20,[mode]), arr=[oth[0],mode,oth[1],mode,oth[2],oth[3]];
   return [T(`Hva er modus (typetallet) i datasettet ${arr.join(", ")}?`,`What is the mode of the data set ${arr.join(", ")}?`),
     {n:mode, tol:0, u:""},
     T(`${mode} forekommer 2 ganger, mens de andre verdiene bare forekommer én gang hver. Modus er derfor ${mode}.`,
       `${mode} occurs 2 times, while the other values occur only once each. The mode is therefore ${mode}.`)]; },
 // eksamen: sannsynlighet i binomisk fordeling (generell n, p, k)
 ()=>{ const n=R.i(4,6), k=R.i(0,n), p=R.f(0.2,0.8,0.05);
   const ck=C_(n,k), prob=ck*Math.pow(p,k)*Math.pow(1-p,n-k);
   return [T(`$X\\sim\\text{Bin}(n=${n},\\ p=${mf(p)})$. Hva er $P(X=${k})$?`,`$X\\sim\\text{Bin}(n=${n},\\ p=${mf(p)})$. What is $P(X=${k})$?`),
     {n:prob, tol:rel(prob,0.02,0.0001), u:""},
     T(`$P(X=${k}) = \\binom{${n}}{${k}}${mf(p)}^{${k}}(1-${mf(p)})^{${n-k}} = ${ck}\\cdot ${mf(Math.pow(p,k),4)}\\cdot ${mf(Math.pow(1-p,n-k),4)} \\approx ${mf(prob,4)}$.`,
       `$P(X=${k}) = \\binom{${n}}{${k}}${mf(p)}^{${k}}(1-${mf(p)})^{${n-k}} = ${ck}\\cdot ${mf(Math.pow(p,k),4)}\\cdot ${mf(Math.pow(1-p,n-k),4)} \\approx ${mf(prob,4)}$.`)]; }
);

// ---------- Enhet 2: Inferens og risiko ----------
THEORY("MEK2200", 2, {
nb: md`## Hva handler det om?
Inferens handler om å trekke konklusjoner om en hel populasjon ut fra et utvalg – for eksempel om en ny prosess virkelig gir bedre kvalitet, eller hvor sikker du kan være på et gjennomsnitt. Risikoanalyse bruker sannsynlighet og konsekvens til å prioritere hvilke farer som er verdt å gjøre noe med. Begge deler handler om å ta beslutninger under usikkerhet, med tall som grunnlag i stedet for magefølelse.

## Begreper og formler
- **Hypotesetesting**: $H_0$ (nullhypotesen, «ingen effekt») testes mot $H_1$. **p-verdien** er sannsynligheten for et minst like ekstremt resultat, gitt at $H_0$ er sann. Forkast $H_0$ hvis p-verdien er mindre enn signifikansnivået $\alpha$ (ofte 0,05).
- **Ensidig vs. tosidig test**: en tosidig test sjekker avvik i begge retninger fra $H_0$; en ensidig test sjekker bare én retning (f.eks. «er den nye metoden bedre», ikke «annerledes»).
- **Type I-feil**: å forkaste en sann $H_0$ (sannsynlighet $\alpha$). **Type II-feil**: å beholde en usann $H_0$ (sannsynlighet $\beta$).
- **Standardfeil**: $\sigma_{\bar x}=\sigma/\sqrt n$. **Konfidensintervall** for $\mu$ med kjent $\sigma$: $\bar x \pm z\cdot\sigma/\sqrt n$ ($z=1{,}96$ for 95 %). Er $\sigma$ ukjent, brukes $t$-fordelingen med utvalgets standardavvik i stedet – nødvendig særlig ved lite utvalg.
- **Lineær regresjon**: stigningstallet $b=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2}$. $R^2$ er andelen av variasjonen i $y$ som modellen forklarer (mellom 0 og 1).
- **Risiko** = sannsynlighet × konsekvens. **FMEA** (Failure Mode and Effects Analysis): systematisk gjennomgang av mulige feilmoder, årsaker og konsekvenser. **ALARP**: risiko skal reduseres så langt som praktisk mulig.
- **Pålitelighet**: $A=\dfrac{MTBF}{MTBF+MTTR}$ (tilgjengelighet), $\lambda=1/MTBF$ (feilrate).

## Slik løser du oppgavene
1. Identifiser hva som testes ($H_0$/$H_1$) eller hvilket risikomål som etterspørres.
2. Finn de nødvendige størrelsene: $\bar x$, $\sigma$ (eller $s$), $n$, og eventuelt sannsynlighet og konsekvens.
3. Sett tallene inn i riktig formel, og pass på enheter.
4. Tolk svaret i sammenheng: er p-verdien under $\alpha$? Er risikoen akseptabel?

### Eksempel
Du måler $x=2, 4, 6, 8$ (timer) og $y=5, 7, 8, 14$ (tonn produsert). Finn stigningstallet i regresjonslinjen.
$\bar x=5$ og $\bar y=8{,}5$. Avvikene i $x$: $-3,-1,1,3$; i $y$: $-3{,}5,-1{,}5,-0{,}5,5{,}5$. Produktene summerer til $28$, og $\sum(x_i-\bar x)^2=20$. Stigningstallet blir $b=28/20=1{,}4$.

## Vanlige feil
- Å tro p-verdien er sannsynligheten for at $H_0$ er sann. Den er sannsynligheten for dataene, gitt at $H_0$ er sann.
- Å bruke $z$ i stedet for $t$ når $\sigma$ er ukjent og utvalget er lite.
- Å tro et konfidensintervall blir smalere med høyere konfidensnivå – det motsatte er sant.
- Å rangere risiko etter bare sannsynlighet eller bare konsekvens, i stedet for produktet av de to.

> En liten p-verdi betyr «dataene passer dårlig med $H_0$», ikke «$H_1$ er bevist». Og risiko er alltid et produkt av to ting: hvor sannsynlig, og hvor alvorlig.`,
en: md`## What is it about?
Inference is about drawing conclusions about an entire population from a sample – for example whether a new process really gives better quality, or how confident you can be in a mean value. Risk analysis uses probability and consequence to prioritize which hazards are worth acting on. Both are about making decisions under uncertainty, backed by numbers instead of gut feeling.

## Concepts and formulas
- **Hypothesis testing**: $H_0$ (the null hypothesis, "no effect") is tested against $H_1$. The **p-value** is the probability of a result at least as extreme, given that $H_0$ is true. Reject $H_0$ if the p-value is smaller than the significance level $\alpha$ (often 0.05).
- **One-tailed vs. two-tailed test**: a two-tailed test checks deviations in both directions from $H_0$; a one-tailed test checks only one direction (e.g. "is the new method better", not "different").
- **Type I error**: rejecting a true $H_0$ (probability $\alpha$). **Type II error**: retaining a false $H_0$ (probability $\beta$).
- **Standard error**: $\sigma_{\bar x}=\sigma/\sqrt n$. **Confidence interval** for $\mu$ with known $\sigma$: $\bar x \pm z\cdot\sigma/\sqrt n$ ($z=1.96$ for 95%). If $\sigma$ is unknown, the $t$-distribution is used with the sample's standard deviation instead – necessary especially for small samples.
- **Linear regression**: the slope $b=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2}$. $R^2$ is the fraction of the variation in $y$ that the model explains (between 0 and 1).
- **Risk** = probability × consequence. **FMEA** (Failure Mode and Effects Analysis): a systematic review of possible failure modes, causes and consequences. **ALARP**: risk should be reduced as far as reasonably practicable.
- **Reliability**: $A=\dfrac{MTBF}{MTBF+MTTR}$ (availability), $\lambda=1/MTBF$ (failure rate).

## How to solve the problems
1. Identify what is being tested ($H_0$/$H_1$) or which risk measure is being asked for.
2. Find the necessary quantities: $\bar x$, $\sigma$ (or $s$), $n$, and possibly probability and consequence.
3. Plug the numbers into the correct formula, and watch the units.
4. Interpret the answer in context: is the p-value below $\alpha$? Is the risk acceptable?

### Example
You measure $x=2, 4, 6, 8$ (hours) and $y=5, 7, 8, 14$ (tonnes produced). Find the slope of the regression line.
$\bar x=5$ and $\bar y=8.5$. The deviations in $x$: $-3,-1,1,3$; in $y$: $-3.5,-1.5,-0.5,5.5$. The products sum to $28$, and $\sum(x_i-\bar x)^2=20$. The slope is $b=28/20=1.4$.

## Common mistakes
- Believing the p-value is the probability that $H_0$ is true. It is the probability of the data, given that $H_0$ is true.
- Using $z$ instead of $t$ when $\sigma$ is unknown and the sample is small.
- Believing a confidence interval gets narrower with a higher confidence level – the opposite is true.
- Ranking risk by only probability or only consequence, instead of the product of the two.

> A small p-value means "the data fits $H_0$ poorly", not "$H_1$ is proven". And risk is always a product of two things: how likely, and how severe.`
});

BIQ("MEK2200", 2, [
  [md`Når bruker man $t$-fordelingen i stedet for normalfordelingen ved et konfidensintervall for gjennomsnittet?`,
   ["Når populasjonens standardavvik er ukjent, og man bruker utvalgets standardavvik i stedet", "Når utvalget er svært stort (n > 1000)", "Alltid, uansett situasjon", "Bare når dataene ikke er normalfordelte"],
   md`$t$-fordelingen tar hensyn til den ekstra usikkerheten ved å anslå $\sigma$ fra utvalget selv (med $s$). Med kjent $\sigma$ brukes normalfordelingen direkte.`,
   md`When do you use the $t$-distribution instead of the normal distribution for a confidence interval for the mean?`,
   ["When the population standard deviation is unknown, and the sample standard deviation is used instead", "When the sample is very large (n > 1000)", "Always, regardless of the situation", "Only when the data is not normally distributed"],
   md`The $t$-distribution accounts for the extra uncertainty of estimating $\sigma$ from the sample itself (using $s$). With a known $\sigma$, the normal distribution is used directly.`],
  [md`Hva betyr det at en hypotesetest er «tosidig» (two-tailed)?`,
   ["Man tester avvik i begge retninger fra $H_0$ (både større og mindre)", "Man tester bare om verdien er større enn forventet", "Man bruker dobbelt så mange data som normalt", "Man har to forskjellige nullhypoteser samtidig"],
   md`En tosidig test avviser $H_0$ hvis resultatet er ekstremt i noen av retningene. En ensidig test sjekker bare én bestemt retning, for eksempel «er den nye metoden bedre enn den gamle».`,
   md`What does it mean for a hypothesis test to be "two-tailed"?`,
   ["Deviations in both directions from $H_0$ are tested (both larger and smaller)", "Only whether the value is larger than expected is tested", "Twice as much data as usual is used", "There are two different null hypotheses at the same time"],
   md`A two-tailed test rejects $H_0$ if the result is extreme in either direction. A one-tailed test checks only one specific direction, for example "is the new method better than the old one".`],
  [md`Du har målt $x=2, 4, 6, 8$ (timer) og $y=5, 7, 8, 14$ (tonn produsert). Hva er stigningstallet i regresjonslinjen (minste kvadraters metode)?`,
   {n: 1.4, tol: 0.01, u: ""},
   md`$\bar x=5$ og $\bar y=8{,}5$. Avvikene i $x$: $-3,-1,1,3$; i $y$: $-3{,}5,-1{,}5,-0{,}5,5{,}5$. Produktene summerer til $28$, og $\sum(x_i-\bar x)^2=20$. Stigningstallet er $b=28/20=1{,}4$.`,
   md`You have measured $x=2, 4, 6, 8$ (hours) and $y=5, 7, 8, 14$ (tonnes produced). What is the slope of the regression line (least squares)?`,
   null,
   md`$\bar x=5$ and $\bar y=8.5$. The deviations in $x$: $-3,-1,1,3$; in $y$: $-3.5,-1.5,-0.5,5.5$. The products sum to $28$, and $\sum(x_i-\bar x)^2=20$. The slope is $b=28/20=1.4$.`]
]);

GEN("MEK2200", 2,
 // enkel: nødvendig utvalgsstørrelse for en gitt feilmargin
 ()=>{ const sigma=R.f(2,20,0.5), E=R.f(0.5,3,0.1), raw=(1.96*sigma/E)**2, n=Math.ceil(raw);
   return [T(`Du ønsker en feilmargin på høyst $E=${mf(E)}$ ved 95 % konfidensnivå, og kjenner $\\sigma=${mf(sigma)}$. Hvor stort utvalg $n$ trenger du minst (rund opp til nærmeste heltall)?`,
             `You want a margin of error of at most $E=${mf(E)}$ at 95% confidence, and know $\\sigma=${mf(sigma)}$. What is the minimum sample size $n$ you need (round up to the nearest integer)?`),
     {n:n, tol:0, u:""},
     T(`Feilmarginen er $z\\sigma/\\sqrt n \\leq E$, som gir $n \\geq (z\\sigma/E)^2 = (1{,}96\\cdot ${mf(sigma)}/${mf(E)})^2 \\approx ${mf(raw,1)}$. Avrundet opp: $n=${n}$.`,
       `The margin of error is $z\\sigma/\\sqrt n \\leq E$, which gives $n \\geq (z\\sigma/E)^2 = (1.96\\cdot ${mf(sigma)}/${mf(E)})^2 \\approx ${mf(raw,1)}$. Rounded up: $n=${n}$.`)]; },
 // eksamen: sum av forventet årlig risikokostnad for tre feilmoder
 ()=>{ const P=[R.f(0.001,0.02,0.001),R.f(0.001,0.02,0.001),R.f(0.001,0.02,0.001)], C=[R.i(5,200)*1000,R.i(5,200)*1000,R.i(5,200)*1000];
   const terms=P.map((p,i)=>p*C[i]), total=terms.reduce((a,b)=>a+b,0);
   const listNb=["A","B","C"].map((nm,i)=>`${nm}: $p=${mf(P[i],3)}$, konsekvens ${nf(C[i])} kr`).join("; ");
   const listEn=["A","B","C"].map((nm,i)=>`${nm}: $p=${mf(P[i],3)}$, consequence NOK ${nf(C[i])}`).join("; ");
   const termsNb=["A","B","C"].map((nm,i)=>`$${mf(P[i],3)}\\cdot ${nf(C[i])} \\approx ${mf(terms[i],1)}$ kr`).join(", ");
   const termsEn=["A","B","C"].map((nm,i)=>`$${mf(P[i],3)}\\cdot ${nf(C[i])} \\approx ${mf(terms[i],1)}$ NOK`).join(", ");
   return [T(`Et system har tre uavhengige feilmoder med årlig sannsynlighet og konsekvens: ${listNb}. Hva er summen av forventet årlig risikokostnad (sannsynlighet × konsekvens for hver mode, summert)?`,
             `A system has three independent failure modes with annual probability and consequence: ${listEn}. What is the sum of the expected annual risk cost (probability × consequence for each mode, summed)?`),
     {n:total, tol:rel(total,0.01,1), u:"kr"},
     T(`Hver mode: ${termsNb}. Summen er $${terms.map(t=>mf(t,1)).join(" + ")} \\approx ${mf(total,1)}$ kr.`,
       `Each mode: ${termsEn}. The sum is $${terms.map(t=>mf(t,1)).join(" + ")} \\approx ${mf(total,1)}$ NOK.`)]; }
);

})();
