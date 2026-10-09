// ============================================================
//  LÆR FØRST – korte, visuelle leksjoner som kommer før oppgavene i grunnskolen (studiene barn og ungdom).
//  Én leksjon per nytt begrep, 3–6 kort: et knep eller bilde (krokodillemunnen, tierrammen, pizzabiter …),
//  én ting barnet prøver selv (trykk på + og −, trykk på ting eller fargelegg ruter) og ett «sjekk at du skjønte det»-spørsmål.
//  Leksjonen kommer automatisk første gang en enhet åpnes, og ligger under enheten som «Lær: …».
//
//  Kort:
//    { fig: [figur, parametre], say: [nb, en] }                       bilde med kort tekst (figurene ligger i figs_gs.js og figs_lf.js)
//    { try: { ask, ctl: [{ k, l, min, max, step, v }], fig, p, goal, say, ok } }   + og − som endrer figuren
//    { try: { ask, items: [{ l, v, svg }], fig, map, goal, say, ok } }        trykk på ting (velg flere)
//    { try: { ask, grid: { r, c, fixed, half, solve }, goal, say, ok } }      fargelegg ruter
//    { q: [nbTekst, [riktig, feil …], nbForklaring, enTekst, enAlternativer, enForklaring], chk }   kontrollspørsmål (første alternativ er riktig)
//  Tekst er alltid et par [norsk, engelsk]. goal/say/ok får tilstanden (verdiene fra + og −, eller listen med valgte).
// ============================================================
const LESSONS = [];
const LESSON = def => { LESSONS.push(def); return def; };
const lfById = id => LESSONS.find(l => l.id === id) || null;

(() => {
const dec = (x, d = 2) => [String(+x.toFixed(d)).replace(".", ","), String(+x.toFixed(d))];
const m = v => String(v).replace(/^-/, "−");
// små bilder til knappene i «trykk på»-oppgavene (viewBox 48 × 48)
const coinSvg = v => { const gold = v >= 10, r = v === 1 ? 15 : v === 5 ? 20 : v === 10 ? 18 : 21;
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="${r}" style="fill:${gold ? "color-mix(in srgb,var(--gold) 45%,var(--card))" : "color-mix(in srgb,var(--muted) 22%,var(--card))"};stroke:${gold ? "var(--gold-deep)" : "var(--muted)"};stroke-width:2"/>${v === 5 ? `<circle cx="24" cy="24" r="4.5" style="fill:var(--card);stroke:var(--muted);stroke-width:1.4"/>` : ""}<text x="24" y="${v === 5 ? 17 : 29}" text-anchor="middle" style="font-weight:800;font-size:${v >= 10 ? 13 : 14}px;fill:var(--ink)">${v}</text></svg>`; };
const PIPS = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
const dieSvg = k => `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="5" width="38" height="38" rx="8" style="fill:var(--card);stroke:var(--ink);stroke-width:2.4"/>${PIPS[k].map(([i, j]) => `<circle cx="${14 + i * 10}" cy="${14 + j * 10}" r="3.4" style="fill:var(--ink)"/>`).join("")}</svg>`;
const sum = (sel, items) => sel.reduce((a, i) => a + items[i].v, 0);

// ================= BARNESKOLEN: MATEMATIKK 1.–4. =================
LESSON({ id: "croc", at: [["GS14", "Tall og plassverdi"]], t: ["> og <", "> and <"], cards: [
  { fig: ["lf_croc", { a: 9, b: 4 }], say: ["Tenk deg en sulten krokodille. Den vil alltid spise det **største** tallet.", "Imagine a hungry crocodile. It always wants to eat the **bigger** number."] },
  { fig: ["lf_croc", { a: 3, b: 8 }], say: ["Munnen åpner seg mot det største tallet. Her er 8 størst, så vi skriver $3 < 8$. Vi leser: «3 er **mindre enn** 8».", "The mouth opens towards the bigger number. Here 8 is bigger, so we write $3 < 8$. We read: \"3 is **less than** 8\"."] },
  { try: { ask: ["Trykk på + og −. Få krokodillen til å snu seg mot tallet til venstre.", "Press + and −. Make the crocodile turn towards the number on the left."],
    ctl: [{ k: "a", l: ["Tallet til venstre", "Left number"], min: 0, max: 12, v: 2 }], fig: "lf_croc", p: { b: 6 }, goal: s => s.a > 6,
    say: s => s.a > 6 ? [`$${s.a} > 6$ – krokodillen spiser ${s.a} fordi det er størst`, `$${s.a} > 6$ – the crocodile eats ${s.a} because it is bigger`] : s.a < 6 ? [`$${s.a} < 6$ – krokodillen spiser 6 fordi det er størst`, `$${s.a} < 6$ – the crocodile eats 6 because it is bigger`] : [`$${s.a} = 6$ – like store`, `$${s.a} = 6$ – equal`],
    ok: ["Ja! Nå er tallet til venstre størst, og munnen åpner seg mot det.", "Yes! Now the left number is bigger, and the mouth opens towards it."] } },
  { q: ["Hvilket tegn passer: 7 ☐ 4?", ["$>$", "$<$", "$=$"], "Munnen åpner seg mot 7, det største tallet: $7 > 4$.",
        "Which sign fits: 7 ☐ 4?", ["$>$", "$<$", "$=$"], "The mouth opens towards 7, the bigger number: $7 > 4$."] }
] });

LESSON({ id: "place", at: [["GS14", "Tall og plassverdi"]], t: ["Enere, tiere og hundrere", "Ones, tens and hundreds"], cards: [
  { fig: ["gs_place", { n: 7 }], say: ["Én liten kloss er en **ener**. Her er 7 enere.", "One small block is a **one**. Here are 7 ones."] },
  { fig: ["gs_place", { n: 23 }], say: ["Har du 10 enere, kan du lime dem sammen til en stang: en **tier**. 23 er 2 tiere og 3 enere.", "When you have 10 ones, you can glue them into a stick: a **ten**. 23 is 2 tens and 3 ones."] },
  { fig: ["gs_place", { n: 347 }], say: ["Ti stenger blir en plate: en **hundrer**. 347 er 3 hundrere, 4 tiere og 7 enere.", "Ten sticks make a flat: a **hundred**. 347 is 3 hundreds, 4 tens and 7 ones."] },
  { try: { ask: ["Bygg tallet 254 med plater, stenger og klosser.", "Build the number 254 with flats, sticks and blocks."],
    ctl: [{ k: "h", l: ["Hundrere", "Hundreds"], min: 0, max: 9, v: 0 }, { k: "t", l: ["Tiere", "Tens"], min: 0, max: 9, v: 0 }, { k: "e", l: ["Enere", "Ones"], min: 0, max: 9, v: 0 }],
    fig: "gs_place", map: s => ({ n: 100 * s.h + 10 * s.t + s.e }), goal: s => 100 * s.h + 10 * s.t + s.e === 254,
    say: s => [`Du har bygget **${100 * s.h + 10 * s.t + s.e}**.`, `You have built **${100 * s.h + 10 * s.t + s.e}**.`],
    ok: ["Riktig! 254 er 2 hundrere, 5 tiere og 4 enere.", "Right! 254 is 2 hundreds, 5 tens and 4 ones."] } },
  { q: ["Hvor mange tiere er det i tallet 58?", ["5", "8", "58", "13"], "I 58 står 5 på tierplassen. Det er 5 tiere og 8 enere.",
        "How many tens are there in 58?", ["5", "8", "58", "13"], "In 58 the 5 is in the tens place. That is 5 tens and 8 ones."], chk: () => String(Math.floor(58 / 10)) }
] });

LESSON({ id: "nline", at: [["GS14", "Pluss og minus"]], t: ["Tallinja: hopp fram og tilbake", "The number line: jump forwards and back"], cards: [
  { fig: ["gs_numline", { a: 3, b: 4, op: "+" }], say: ["På tallinja står tallene på rad. **Pluss** er å hoppe mot høyre: $3 + 4 = 7$.", "On the number line the numbers stand in a row. **Plus** means jumping right: $3 + 4 = 7$."] },
  { fig: ["gs_numline", { a: 9, b: 3, op: "-" }], say: ["**Minus** er å hoppe mot venstre: $9 - 3 = 6$.", "**Minus** means jumping left: $9 - 3 = 6$."] },
  { try: { ask: ["Start på 7. Hvor mange hopp må du ta for å lande på 12?", "Start at 7. How many jumps do you need to land on 12?"],
    ctl: [{ k: "b", l: ["Hopp", "Jumps"], min: 0, max: 10, v: 0 }], fig: "gs_numline", p: { a: 7, op: "+" }, goal: s => s.b === 5,
    say: s => [`$7 + ${s.b} = ${7 + s.b}$`, `$7 + ${s.b} = ${7 + s.b}$`], ok: ["Ja! 5 hopp: $7 + 5 = 12$.", "Yes! 5 jumps: $7 + 5 = 12$."] } },
  { q: ["Du står på 10 og hopper 4 mot venstre. Hvor lander du?", ["6", "14", "4", "10"], "Mot venstre er minus: $10 - 4 = 6$.",
        "You stand on 10 and jump 4 to the left. Where do you land?", ["6", "14", "4", "10"], "Left is minus: $10 - 4 = 6$."], chk: () => String(10 - 4) }
] });

LESSON({ id: "bridge10", at: [["GS14", "Pluss og minus"]], t: ["Over tieren", "Bridging ten"], cards: [
  { fig: ["lf_tenframe", { a: 8, b: 5, k: 0 }], say: ["En **tierramme** har plass til 10. Her er 8 røde og 5 blå. Hvor mange er det til sammen?", "A **ten frame** has room for 10. Here are 8 red and 5 blue. How many are there in total?"] },
  { fig: ["lf_tenframe", { a: 8, b: 5, k: 2 }], say: ["Flytt 2 blå inn, så er rammen full: 10. Da er 3 igjen. $8 + 5 = 10 + 3 = 13$.", "Move 2 blue in and the frame is full: 10. Then 3 are left. $8 + 5 = 10 + 3 = 13$."] },
  { try: { ask: ["7 røde og 6 blå. Flytt blå inn til rammen er full.", "7 red and 6 blue. Move blue in until the frame is full."],
    ctl: [{ k: "k", l: ["Flytt inn", "Move in"], min: 0, max: 3, v: 0 }], fig: "lf_tenframe", p: { a: 7, b: 6 }, goal: s => s.k === 3,
    say: s => s.k < 3 ? [`Det er plass til ${3 - s.k} til.`, `There is room for ${3 - s.k} more.`] : ["Rammen er full!", "The frame is full!"],
    ok: ["Riktig! 10 i rammen og 3 igjen: $7 + 6 = 10 + 3 = 13$.", "Right! 10 in the frame and 3 left: $7 + 6 = 10 + 3 = 13$."] } },
  { fig: ["gs_numline", { a: 13, b: 5, op: "-", via10: true }], say: ["Minus går også via 10: $13 - 5$. Ta først 3 ned til 10, så 2 til: $13 - 5 = 8$.", "Minus also goes via 10: $13 - 5$. First take 3 down to 10, then 2 more: $13 - 5 = 8$."] },
  { q: ["Hva er $9 + 4$?", ["13", "12", "14", "5"], "Ta 1 fra 4 for å gjøre 9 til 10. Da er 3 igjen: $10 + 3 = 13$.",
        "What is $9 + 4$?", ["13", "12", "14", "5"], "Take 1 from 4 to make 9 into 10. Then 3 are left: $10 + 3 = 13$."], chk: () => String(9 + 4) }
] });

LESSON({ id: "times", at: [["GS14", "Gangetabellen"]], t: ["Gange er like grupper", "Times means equal groups"], cards: [
  { fig: ["gs_array", { r: 3, c: 4 }], say: ["$3 \\cdot 4$ betyr **3 rader med 4** i hver. Tell prikkene: 12.", "$3 \\cdot 4$ means **3 rows of 4**. Count the dots: 12."] },
  { fig: ["gs_array"], say: ["Snu rutenettet: 4 rader med 3. Det er fortsatt 12! $3 \\cdot 4 = 4 \\cdot 3$.", "Turn the grid: 4 rows of 3. It is still 12! $3 \\cdot 4 = 4 \\cdot 3$."] },
  { try: { ask: ["Lag et rutenett med akkurat 12 prikker.", "Make a grid with exactly 12 dots."],
    ctl: [{ k: "r", l: ["Rader", "Rows"], min: 1, max: 6, v: 1 }, { k: "c", l: ["I hver rad", "In each row"], min: 1, max: 6, v: 1 }], fig: "gs_array", goal: s => s.r * s.c === 12,
    say: s => [`$${s.r} \\cdot ${s.c} = ${s.r * s.c}$`, `$${s.r} \\cdot ${s.c} = ${s.r * s.c}$`],
    ok: s => [`Riktig! $${s.r} \\cdot ${s.c} = 12$. Det finnes flere måter – prøv gjerne en til.`, `Right! $${s.r} \\cdot ${s.c} = 12$. There are more ways – try another one.`] } },
  { q: ["Hvilket gangestykke passer til 5 rader med 2 i hver?", ["$5 \\cdot 2$", "$5 + 2$", "$5 - 2$", "$2 + 2$"], "5 like rader med 2 i hver er $5 \\cdot 2 = 10$.",
        "Which multiplication fits 5 rows of 2?", ["$5 \\cdot 2$", "$5 + 2$", "$5 - 2$", "$2 + 2$"], "5 equal rows of 2 is $5 \\cdot 2 = 10$."] }
] });

LESSON({ id: "share", at: [["GS14", "Deling"]], t: ["Deling er rettferdig fordeling", "Dividing is fair sharing"], cards: [
  { fig: ["gs_share", { n: 12, k: 3 }], say: ["12 drops skal deles likt på 3 barn. Gi ett om gangen, rundt og rundt. Hver får 4: $12 : 3 = 4$.", "12 sweets are shared equally by 3 children. Give one at a time, round and round. Each gets 4: $12 : 3 = 4$."] },
  { fig: ["gs_share", { n: 13, k: 4 }], say: ["Går det ikke opp, blir noe til overs. Det kalles **resten**: $13 : 4 = 3$, rest 1.", "If it does not share out evenly, some are left over. That is the **remainder**: $13 : 4 = 3$, remainder 1."] },
  { try: { ask: ["Del 12 drops på så mange barn at hver får 2.", "Share 12 sweets between so many children that each gets 2."],
    ctl: [{ k: "k", l: ["Barn", "Children"], min: 1, max: 6, v: 1 }], fig: "gs_share", p: { n: 12 }, goal: s => s.k === 6,
    say: s => [`$12 : ${s.k} = ${Math.floor(12 / s.k)}$` + (12 % s.k ? `, rest ${12 % s.k}` : ""), `$12 : ${s.k} = ${Math.floor(12 / s.k)}$` + (12 % s.k ? `, remainder ${12 % s.k}` : "")],
    ok: ["Riktig! 6 barn får 2 hver: $12 : 6 = 2$.", "Right! 6 children get 2 each: $12 : 6 = 2$."] } },
  { q: ["15 epler deles likt i 5 kurver. Hvor mange epler blir det i hver kurv?", ["3", "5", "10", "20"], "$15 : 5 = 3$, fordi $5 \\cdot 3 = 15$.",
        "15 apples are shared equally between 5 baskets. How many apples go in each basket?", ["3", "5", "10", "20"], "$15 : 5 = 3$, because $5 \\cdot 3 = 15$."], chk: () => String(15 / 5) }
] });

LESSON({ id: "clock", at: [["GS14", "Klokka og penger"]], t: ["Klokka: hel og halv", "The clock: o'clock and half past"], cards: [
  { fig: ["gs_clock", { h: 3, m: 0 }], say: ["Den **korte** viseren viser timen. Den **lange** viser minuttene. Når den lange peker rett opp, er klokka hel: klokka tre.", "The **short** hand shows the hour. The **long** hand shows the minutes. When the long hand points straight up, it is o'clock: three o'clock."] },
  { fig: ["gs_clock", { h: 3, m: 30 }], say: ["Når den lange viseren peker på 6, har det gått en halvtime. På norsk sier vi **halv fire** – vi er halvveis til fire!", "When the long hand points at 6, half an hour has passed. We say **half past three**. (In Norwegian it is \"halv fire\" – half way to four!)"] },
  { fig: ["gs_clock", { h: 3, m: 15 }], say: ["Peker den lange viseren på 3, er det **kvart over**. Peker den på 9, er det **kvart på** neste time.", "When the long hand points at 3, it is **quarter past**. When it points at 9, it is **quarter to** the next hour."] },
  { try: { ask: ["Still klokka på halv seks.", "Set the clock to half past five."],
    ctl: [{ k: "h", l: ["Time", "Hour"], min: 1, max: 12, v: 12 }, { k: "m", l: ["Minutter", "Minutes"], min: 0, max: 55, step: 5, v: 0 }], fig: "gs_clock", goal: s => s.h === 5 && s.m === 30,
    say: s => { const [a, b] = clockWords(s.h, s.m); return [`Klokka er ${s.h}:${String(s.m).padStart(2, "0")} – «${a}»`, `The time is ${s.h}:${String(s.m).padStart(2, "0")} – ${b}`]; },
    ok: ["Riktig! 5:30 er halv seks – halvveis til seks.", "Right! 5:30 is half past five."] } },
  { q: ["Den lange viseren peker på 6. Den korte er mellom 7 og 8. Hva er klokka?", ["Halv åtte", "Halv sju", "Klokka seks", "Kvart over sju"], "Den korte har gått forbi 7, og den lange på 6 betyr halv: halvveis til åtte, altså halv åtte (7:30).",
        "The long hand points at 6. The short hand is between 7 and 8. What time is it?", ["Half past seven", "Half past six", "Six o'clock", "Quarter past seven"], "The short hand has passed 7, and the long hand on 6 means half past: 7:30, half past seven."] }
] });

LESSON({ id: "money", at: [["GS14", "Klokka og penger"]], t: ["Penger: legg sammen", "Money: add it up"], cards: [
  { fig: ["gs_coins"], say: ["Norske mynter er 1, 5, 10 og 20 kroner. Legg sammen for å finne hvor mye du har.", "Norwegian coins are 1, 5, 10 and 20 kroner. Add them up to find how much you have."] },
  { try: { ask: ["Trykk på myntene du trenger for å betale **27 kr**.", "Tap the coins you need to pay **27 kr**."],
    items: [20, 10, 10, 5, 1, 1, 1, 1].map(v => ({ l: v + " kr", v, svg: coinSvg(v) })), goal: (sel, it) => sum(sel, it) === 27,
    say: (sel, it) => [`Du har valgt **${sum(sel, it)} kr**.`, `You have picked **${sum(sel, it)} kr**.`],
    ok: ["Riktig! For eksempel $20 + 5 + 1 + 1 = 27$ kroner.", "Right! For example $20 + 5 + 1 + 1 = 27$ kroner."] } },
  { fig: ["gs_coins", { c: [50], pay: 35 }], say: ["Vekslepenger: betaler du med 50 kr for noe som koster 35 kr, får du $50 - 35 = 15$ kr tilbake.", "Change: if you pay 50 kr for something that costs 35 kr, you get $50 - 35 = 15$ kr back."] },
  { q: ["En bok koster 35 kr. Du betaler med 50 kr. Hvor mye får du tilbake?", ["15 kr", "85 kr", "25 kr", "5 kr"], "Vekslepenger = det du betaler minus prisen: $50 - 35 = 15$ kr.",
        "A book costs 35 kr. You pay with 50 kr. How much do you get back?", ["15 kr", "85 kr", "25 kr", "5 kr"], "Change = what you pay minus the price: $50 - 35 = 15$ kr."], chk: () => (50 - 35) + " kr" }
] });

// symmetri: venstre halvdel er tegnet, barnet speiler den over på høyre side (6 · 5 ruter, speillinja midt mellom kolonne 3 og 4)
const SYM_L = [2, 7, 8, 12, 13, 14, 19, 20, 26], SYM_R = SYM_L.map(i => Math.floor(i / 6) * 6 + 5 - i % 6);
LESSON({ id: "sym", at: [["GS14", "Former og mønstre"]], t: ["Symmetri: speilet", "Symmetry: the mirror"], cards: [
  { fig: ["lf_mirror"], say: ["En figur er **symmetrisk** når den ene halvdelen er et speilbilde av den andre. Bretter du langs den stiplede linja, passer halvdelene over hverandre.", "A shape is **symmetrical** when one half is a mirror image of the other. Fold along the dashed line and the halves match."] },
  { try: { ask: ["Fargelegg rutene på høyre side, så figuren blir symmetrisk om den røde linja.", "Colour the squares on the right so the shape is symmetrical about the red line."],
    grid: { r: 5, c: 6, fixed: SYM_L, half: true, solve: SYM_R }, goal: sel => sel.length === SYM_R.length && SYM_R.every(i => sel.includes(i)),
    say: sel => { const miss = SYM_R.filter(i => !sel.includes(i)).length, bad = sel.filter(i => !SYM_R.includes(i)).length;
      return bad ? [`${bad} ${bad === 1 ? "rute passer" : "ruter passer"} ikke med speilbildet.`, `${bad} ${bad === 1 ? "square does" : "squares do"} not match the mirror image.`] : miss ? [`${miss} ${miss === 1 ? "rute" : "ruter"} igjen.`, `${miss} ${miss === 1 ? "square" : "squares"} to go.`] : ["Alt stemmer!", "Everything matches!"]; },
    ok: ["Riktig! Nå er høyre side et speilbilde av venstre side.", "Right! Now the right side is a mirror image of the left side."] } },
  { q: ["Hvilken bokstav er symmetrisk om en loddrett linje midt på?", ["A", "F", "R", "J"], "A ser lik ut på begge sider av en loddrett linje midt på. F, R og J gjør ikke det.",
        "Which letter is symmetrical about a vertical line down the middle?", ["A", "F", "R", "J"], "A looks the same on both sides of a vertical line down the middle. F, R and J do not."] }
] });

LESSON({ id: "ruler", at: [["GS14", "Måle og veie"]], t: ["Linjalen: start på 0", "The ruler: start at 0"], cards: [
  { fig: ["lf_ruler", { start: 0, len: 7 }], say: ["Legg tingen du måler inntil **0** på linjalen – ikke inntil kanten. Les av der den slutter: 7 cm.", "Put the thing you measure at **0** on the ruler – not at the edge. Read where it ends: 7 cm."] },
  { fig: ["lf_ruler", { start: 2, len: 7 }], say: ["Starter du på 2, slutter blyanten på 9. Men den er ikke 9 cm! Den er $9 - 2 = 7$ cm.", "If you start at 2, the pencil ends at 9. But it is not 9 cm! It is $9 - 2 = 7$ cm."] },
  { try: { ask: ["Flytt blyanten så den starter på 0. Hvor lang er den?", "Move the pencil so it starts at 0. How long is it?"],
    ctl: [{ k: "start", l: ["Flytt", "Move"], min: 0, max: 5, v: 3 }], fig: "lf_ruler", p: { len: 6 }, goal: s => s.start === 0,
    say: s => [`Blyanten går fra ${s.start} til ${s.start + 6}.`, `The pencil goes from ${s.start} to ${s.start + 6}.`], ok: ["Riktig! Nå kan du lese rett av: 6 cm.", "Right! Now you can read it straight off: 6 cm."] } },
  { q: ["En spiker går fra 1 til 5 på linjalen. Hvor lang er den?", ["4 cm", "5 cm", "6 cm", "1 cm"], "Den starter på 1 og slutter på 5: $5 - 1 = 4$ cm.",
        "A nail goes from 1 to 5 on the ruler. How long is it?", ["4 cm", "5 cm", "6 cm", "1 cm"], "It starts at 1 and ends at 5: $5 - 1 = 4$ cm."], chk: () => (5 - 1) + " cm" }
] });

// ================= BARNESKOLEN: MATEMATIKK 5.–7. =================
LESSON({ id: "pizza", at: [["GS57", "Brøk"]], t: ["Brøk er pizzabiter", "Fractions are pizza slices"], cards: [
  { fig: ["gs_pizza", { n: 4, k: 1 }], say: ["Del en pizza i 4 **like** store biter. Én bit er $\\frac{1}{4}$ – en fjerdedel.", "Cut a pizza into 4 **equal** slices. One slice is $\\frac{1}{4}$ – a quarter."] },
  { fig: ["gs_pizza", { n: 4, k: 3 }], say: ["Tallet nederst, **nevneren**, er hvor mange biter pizzaen er delt i. Tallet øverst, **telleren**, er hvor mange biter du har: $\\frac{3}{4}$.", "The bottom number, the **denominator**, is how many slices the pizza is cut into. The top number, the **numerator**, is how many slices you have: $\\frac{3}{4}$."] },
  { try: { ask: ["Vis $\\frac{3}{8}$ av pizzaen.", "Show $\\frac{3}{8}$ of the pizza."],
    ctl: [{ k: "n", l: ["Biter i alt", "Slices in all"], min: 2, max: 8, v: 2 }, { k: "k", l: ["Farget", "Coloured"], min: 0, max: s => s.n, v: 0 }], fig: "gs_pizza", goal: s => s.n === 8 && s.k === 3,
    say: s => [`$\\frac{${s.k}}{${s.n}}$ – ${s.k} av ${s.n} biter`, `$\\frac{${s.k}}{${s.n}}$ – ${s.k} of ${s.n} slices`], ok: ["Riktig! 8 like biter, og 3 av dem er dine.", "Right! 8 equal slices, and 3 of them are yours."] } },
  { fig: ["gs_pizza"], say: ["$\\frac{1}{2}$ og $\\frac{2}{4}$ er like mye pizza. Jo flere biter pizzaen deles i, jo mindre blir hver bit.", "$\\frac{1}{2}$ and $\\frac{2}{4}$ are the same amount of pizza. The more slices the pizza is cut into, the smaller each slice."] },
  { q: ["En sjokolade har 6 like ruter. Du spiser 2. Hvor stor del har du spist?", ["$\\frac{2}{6}$", "$\\frac{6}{2}$", "$\\frac{2}{4}$", "$\\frac{4}{6}$"], "Nevneren er alle rutene (6), telleren er de du spiste (2): $\\frac{2}{6}$.",
        "A chocolate bar has 6 equal squares. You eat 2. What part have you eaten?", ["$\\frac{2}{6}$", "$\\frac{6}{2}$", "$\\frac{2}{4}$", "$\\frac{4}{6}$"], "The denominator is all the squares (6), the numerator is the ones you ate (2): $\\frac{2}{6}$."] }
] });

LESSON({ id: "decimal", at: [["GS57", "Desimaltall"]], t: ["Desimaltall: tideler og penger", "Decimals: tenths and money"], cards: [
  { fig: ["gs_decimal", { v: 0.3 }], say: ["Del 1 hel i 10 like deler. Hver del er en **tidel**: 0,1. Tre deler er 0,3.", "Split 1 whole into 10 equal parts. Each part is a **tenth**: 0.1. Three parts are 0.3."] },
  { fig: ["lf_price", { kr: 24, ore: 90 }], say: ["Du kjenner desimaltall fra prislapper. 24,90 kr er 24 hele kroner og 90 øre. 100 øre er 1 krone.", "You know decimals from price tags. 24.90 kr is 24 whole kroner and 90 øre. 100 øre is 1 krone."] },
  { try: { ask: ["Fargelegg 0,7 av stangen.", "Colour 0.7 of the bar."],
    ctl: [{ k: "d", l: ["Tideler", "Tenths"], min: 0, max: 10, v: 0 }], fig: "gs_decimal", map: s => ({ v: s.d / 10 }), goal: s => s.d === 7,
    say: s => { const [a, b] = dec(s.d / 10); return [`${s.d} ${s.d === 1 ? "tidel" : "tideler"} = ${a}`, `${s.d} ${s.d === 1 ? "tenth" : "tenths"} = ${b}`]; }, ok: ["Riktig! 0,7 er 7 tideler.", "Right! 0.7 is 7 tenths."] } },
  { q: ["Hvilket tall er det samme som 7 tideler?", ["0,7", "7,0", "0,07", "70"], "Det første sifferet etter kommaet er tidelene: 7 tideler = 0,7.",
        "Which number is the same as 7 tenths?", ["0.7", "7.0", "0.07", "70"], "The first digit after the decimal point is the tenths: 7 tenths = 0.7."] }
] });

LESSON({ id: "percent", at: [["GS57", "Prosent"], ["GU810", "Brøk, prosent og vekstfaktor"]], t: ["Prosent er «av hundre»", "Percent means out of a hundred"], cards: [
  { fig: ["gs_percent", { k: 1 }], say: ["Tenk deg 100 ruter. Én rute er **1 prosent**: 1 %. Prosent betyr «av hundre».", "Imagine 100 squares. One square is **1 percent**: 1 %. Percent means \"out of a hundred\"."] },
  { fig: ["gs_percent", { k: 50 }], say: ["50 av 100 ruter er 50 % – halvparten. 100 % er alt sammen.", "50 of 100 squares is 50 % – half. 100 % is all of it."] },
  { try: { ask: ["Fargelegg 25 % av rutenettet.", "Colour 25 % of the grid."],
    ctl: [{ k: "k", l: ["Ruter", "Squares"], min: 0, max: 100, step: 5, v: 0 }], fig: "gs_percent", goal: s => s.k === 25,
    say: s => [`${s.k} av 100 ruter = ${s.k} %`, `${s.k} of 100 squares = ${s.k} %`], ok: ["Riktig! 25 % er 25 av 100 – det samme som en fjerdedel.", "Right! 25 % is 25 out of 100 – the same as a quarter."] } },
  { q: ["Hvor mange prosent er 10 av 100 ruter?", ["10 %", "1 %", "100 %", "90 %"], "Prosent er «av hundre»: 10 av 100 er 10 %.",
        "What percent is 10 of 100 squares?", ["10 %", "1 %", "100 %", "90 %"], "Percent is \"out of a hundred\": 10 of 100 is 10 %."], chk: () => (10 / 100 * 100) + " %" }
] });

LESSON({ id: "area", at: [["GS57", "Areal og omkrets"]], t: ["Omkrets og areal", "Perimeter and area"], cards: [
  { fig: ["gs_area", { w: 4, h: 3, unit: "", mode: "edge" }], say: ["**Omkrets**: tenk deg at en maur går rundt kanten. Hvor langt går den? $4 + 3 + 4 + 3 = 14$.", "**Perimeter**: imagine an ant walking round the edge. How far does it walk? $4 + 3 + 4 + 3 = 14$."] },
  { fig: ["gs_area", { w: 4, h: 3, unit: "", mode: "fill" }], say: ["**Areal**: hvor mange ruter får plass inni? 3 rader med 4: $3 \\cdot 4 = 12$ ruter.", "**Area**: how many squares fit inside? 3 rows of 4: $3 \\cdot 4 = 12$ squares."] },
  { try: { ask: ["Fargelegg et rektangel med areal 6 ruter.", "Colour a rectangle with an area of 6 squares."],
    grid: { r: 5, c: 6, solve: [0, 1, 2, 6, 7, 8] }, goal: sel => lfRect(sel, 6) === 6,
    say: sel => [`${sel.length} ${sel.length === 1 ? "rute" : "ruter"}` + (sel.length && !lfRect(sel, 6) ? " – men det er ikke et helt rektangel ennå" : ""), `${sel.length} ${sel.length === 1 ? "square" : "squares"}` + (sel.length && !lfRect(sel, 6) ? " – but it is not a full rectangle yet" : "")],
    ok: ["Riktig! For eksempel 2 rader med 3: $2 \\cdot 3 = 6$.", "Right! For example 2 rows of 3: $2 \\cdot 3 = 6$."] } },
  { q: ["Et rektangel er 5 ruter langt og 2 ruter høyt. Hva er arealet?", ["10 ruter", "7 ruter", "14 ruter", "25 ruter"], "Areal er rutene inni: 2 rader med 5 er $2 \\cdot 5 = 10$ ruter. (Omkretsen er 14.)",
        "A rectangle is 5 squares long and 2 squares high. What is its area?", ["10 squares", "7 squares", "14 squares", "25 squares"], "Area is the squares inside: 2 rows of 5 is $2 \\cdot 5 = 10$ squares. (The perimeter is 14.)"], chk: () => (5 * 2) + " ruter" }
] });

LESSON({ id: "stairs", at: [["GS57", "Måling og enheter"]], t: ["Måletrappa", "The unit staircase"], cards: [
  { fig: ["gs_stairs"], say: ["Tenk på enhetene som en trapp. Hvert trinn **ned** ganger du med 10. Hvert trinn **opp** deler du på 10.", "Think of the units as a staircase. Each step **down** you multiply by 10. Each step **up** you divide by 10."] },
  { try: { ask: ["Gjør om 3 m til cm. Gå ned trappa trinn for trinn.", "Change 3 m into cm. Walk down the stairs step by step."],
    ctl: [{ k: "k", l: ["Trinn ned", "Steps down"], min: 0, max: 3, v: 0 }], fig: "lf_stairs", p: { v: 3, from: "m" }, goal: s => s.k === 2,
    say: s => { const u = ["m", "dm", "cm", "mm"][s.k], v = 3 * 10 ** s.k; return [`3 m = ${v} ${u}`, `3 m = ${v} ${u}`]; }, ok: ["Riktig! To trinn ned: $3 \\cdot 100 = 300$ cm.", "Right! Two steps down: $3 \\cdot 100 = 300$ cm."] } },
  { q: ["Hvor mange centimeter er 2 meter?", ["200 cm", "20 cm", "2000 cm", "2 cm"], "Fra m til cm er to trinn ned: $2 \\cdot 100 = 200$ cm.",
        "How many centimetres are 2 metres?", ["200 cm", "20 cm", "2000 cm", "2 cm"], "From m to cm is two steps down: $2 \\cdot 100 = 200$ cm."], chk: () => (2 * 100) + " cm" }
] });

LESSON({ id: "eqkids", at: [["GS57", "Enkle likninger"]], t: ["Likning som vekt", "An equation is a balance"], cards: [
  { fig: ["lf_balance", { x: 1, n: 3, r: 7 }], say: ["Vekta er i **balanse**: begge sider veier like mye. Boksen er $x$. Til venstre: $x$ og 3 kuler. Til høyre: 7 kuler.", "The scale is **balanced**: both sides weigh the same. The box is $x$. On the left: $x$ and 3 balls. On the right: 7 balls."] },
  { try: { ask: ["Ta bort like mange kuler fra **begge** sider til boksen står alene.", "Take the same number of balls off **both** sides until the box is alone."],
    ctl: [{ k: "take", l: ["Ta bort", "Take off"], min: 0, max: 3, v: 0 }], fig: "lf_balance", p: { x: 1, n: 3, r: 7 }, goal: s => s.take === 3,
    say: s => [`$x${3 - s.take ? " + " + (3 - s.take) : ""} = ${7 - s.take}$`, `$x${3 - s.take ? " + " + (3 - s.take) : ""} = ${7 - s.take}$`], ok: ["Riktig! Boksen veier like mye som 4 kuler: $x = 4$.", "Right! The box weighs the same as 4 balls: $x = 4$."] } },
  { fig: ["lf_balance", { x: 1, n: 3, r: 7, take: 3 }], say: ["Sjekk svaret: sett inn 4 for $x$. $4 + 3 = 7$ ✓", "Check the answer: put 4 in for $x$. $4 + 3 = 7$ ✓"] },
  { q: ["Løs likningen $x + 5 = 9$.", ["$x = 4$", "$x = 14$", "$x = 5$", "$x = 9$"], "Ta bort 5 på begge sider: $x = 9 - 5 = 4$. Sjekk: $4 + 5 = 9$ ✓",
        "Solve the equation $x + 5 = 9$.", ["$x = 4$", "$x = 14$", "$x = 5$", "$x = 9$"], "Take 5 off both sides: $x = 9 - 5 = 4$. Check: $4 + 5 = 9$ ✓"], chk: () => `$x = ${9 - 5}$` }
] });

LESSON({ id: "therm", at: [["GS57", "Negative tall og koordinater"]], t: ["Negative tall: termometeret", "Negative numbers: the thermometer"], cards: [
  { fig: ["lf_therm", { v: 3 }], say: ["Termometeret er en tallinje som står på høykant. Over 0 er det varmegrader.", "A thermometer is a number line standing up. Above 0 the temperature is positive."] },
  { fig: ["lf_therm", { v: -4 }], say: ["Under 0 er det kuldegrader. Vi skriver $-4$. Jo lenger ned, jo kaldere – og jo **mindre** er tallet. $-4$ er mindre enn $-1$.", "Below 0 it is below zero. We write $-4$. The further down, the colder – and the **smaller** the number. $-4$ is less than $-1$."] },
  { try: { ask: ["Det er 2 grader. Så blir det 5 grader kaldere. Still termometeret.", "It is 2 degrees. Then it gets 5 degrees colder. Set the thermometer."],
    ctl: [{ k: "v", l: ["Grader", "Degrees"], min: -10, max: 10, v: 2 }], fig: "lf_therm", p: { from: 2 }, goal: s => s.v === -3,
    say: s => [`${m(s.v)} °C`, `${m(s.v)} °C`], ok: ["Riktig! $2 - 5 = -3$. Det er 3 kuldegrader.", "Right! $2 - 5 = -3$. It is 3 degrees below zero."] } },
  { q: ["Hvilket tall er minst?", ["$-5$", "$-1$", "$0$", "$3$"], "På termometeret står $-5$ lengst ned. Det er det kaldeste – og det minste tallet.",
        "Which number is the smallest?", ["$-5$", "$-1$", "$0$", "$3$"], "On the thermometer $-5$ is furthest down. It is the coldest – and the smallest number."], chk: () => `$${Math.min(-5, -1, 0, 3)}$` }
] });

LESSON({ id: "coord", at: [["GS57", "Negative tall og koordinater"], ["GU810", "Lineære funksjoner"]], t: ["Koordinatsystemet", "The coordinate system"], cards: [
  { fig: ["lf_coord", { x: 3, y: 2 }], say: ["Et punkt har to tall: $(3, 2)$. Først **bortover** ($x$), så **opp** ($y$). Huskeregel: gå bortover gangen før du går opp trappa.", "A point has two numbers: $(3, 2)$. First **across** ($x$), then **up** ($y$). Remember: walk along the corridor before you go up the stairs."] },
  { fig: ["lf_coord", { x: -2, y: -1 }], say: ["Minus betyr den andre veien: $x = -2$ er 2 til **venstre**, $y = -1$ er 1 **ned**. Midten er origo, $(0, 0)$.", "Minus means the other way: $x = -2$ is 2 to the **left**, $y = -1$ is 1 **down**. The middle is the origin, $(0, 0)$."] },
  { try: { ask: ["Flytt prikken til stjerna i $(-3, 2)$.", "Move the dot to the star at $(-3, 2)$."],
    ctl: [{ k: "x", l: ["x (bortover)", "x (across)"], min: -4, max: 4, v: 0 }, { k: "y", l: ["y (opp/ned)", "y (up/down)"], min: -3, max: 3, v: 0 }], fig: "lf_coord", p: { tx: -3, ty: 2 }, goal: s => s.x === -3 && s.y === 2,
    say: s => [`Prikken står i $(${s.x}, ${s.y})$.`, `The dot is at $(${s.x}, ${s.y})$.`], ok: ["Riktig! 3 til venstre og 2 opp.", "Right! 3 to the left and 2 up."] } },
  { q: ["Hvor ligger punktet $(0, 4)$?", ["4 rett opp fra origo", "4 til høyre for origo", "4 til venstre for origo", "I origo"], "$x = 0$: ikke bortover. $y = 4$: 4 opp. Punktet ligger på $y$-aksen, 4 over origo.",
        "Where is the point $(0, 4)$?", ["4 straight up from the origin", "4 to the right of the origin", "4 to the left of the origin", "At the origin"], "$x = 0$: no steps across. $y = 4$: 4 up. The point is on the $y$-axis, 4 above the origin."] }
] });

LESSON({ id: "chance", at: [["GS57", "Sannsynlighet"]], t: ["Sannsynlighet: terningen", "Probability: the die"], cards: [
  { fig: ["gs_chance"], say: ["Sjansen for at noe skjer går fra 0 (umulig) til 1 (helt sikkert). En mynt gir kron 1 av 2 ganger: $\\frac{1}{2}$.", "The chance of something happening goes from 0 (impossible) to 1 (certain). A coin gives heads 1 in 2 times: $\\frac{1}{2}$."] },
  { fig: ["lf_die", { sel: [6] }], say: ["En terning har 6 sider som er like sannsynlige. Sjansen for en sekser er 1 av 6: $\\frac{1}{6}$.", "A die has 6 sides that are equally likely. The chance of a six is 1 in 6: $\\frac{1}{6}$."] },
  { try: { ask: ["Trykk på alle sidene som er **partall**.", "Tap all the sides that are **even numbers**."],
    items: [1, 2, 3, 4, 5, 6].map(k => ({ l: String(k), v: k, svg: dieSvg(k) })), fig: "lf_die", map: (sel, it) => ({ sel: sel.map(i => it[i].v) }),
    goal: (sel, it) => sel.length === 3 && sel.every(i => it[i].v % 2 === 0),
    say: sel => [`${sel.length} av 6 sider`, `${sel.length} of 6 sides`], ok: ["Riktig! 2, 4 og 6. Sjansen for partall er $\\frac{3}{6} = \\frac{1}{2}$.", "Right! 2, 4 and 6. The chance of an even number is $\\frac{3}{6} = \\frac{1}{2}$."] } },
  { q: ["Hva er sjansen for å få 3 på en vanlig terning?", ["$\\frac{1}{6}$", "$\\frac{3}{6}$", "$\\frac{1}{3}$", "$\\frac{6}{3}$"], "Bare én av de 6 sidene er en 3-er, så sjansen er $\\frac{1}{6}$.",
        "What is the chance of rolling a 3 on an ordinary die?", ["$\\frac{1}{6}$", "$\\frac{3}{6}$", "$\\frac{1}{3}$", "$\\frac{6}{3}$"], "Only one of the 6 sides is a 3, so the chance is $\\frac{1}{6}$."] }
] });

LESSON({ id: "mean", at: [["GS57", "Statistikk"], ["GU810", "Sannsynlighet og statistikk"]], t: ["Gjennomsnitt: jevn ut tårnene", "The mean: even out the towers"], cards: [
  { fig: ["lf_mean", { vals: [2, 6, 4] }], say: ["Tre barn har bygget tårn med 2, 6 og 4 klosser. **Gjennomsnittet** er hvor høye tårnene blir hvis vi deler klossene rettferdig.", "Three children built towers of 2, 6 and 4 blocks. The **mean** is how tall the towers are if we share the blocks fairly."] },
  { try: { ask: ["Flytt klosser fra det høyeste tårnet til det laveste til alle er like høye.", "Move blocks from the tallest tower to the shortest until they are all the same height."],
    ctl: [{ k: "k", l: ["Flytt", "Move"], min: 0, max: 4, v: 0 }], fig: "lf_mean", map: s => ({ vals: [2 + s.k, 6 - s.k, 4] }), goal: s => s.k === 2,
    say: s => [`Tårnene: ${2 + s.k}, ${6 - s.k} og 4`, `The towers: ${2 + s.k}, ${6 - s.k} and 4`], ok: ["Riktig! Alle er 4 høye. Gjennomsnittet er 4: $\\frac{2 + 6 + 4}{3} = \\frac{12}{3} = 4$.", "Right! They are all 4 tall. The mean is 4: $\\frac{2 + 6 + 4}{3} = \\frac{12}{3} = 4$."] } },
  { fig: ["lf_mean", { vals: [2, 4, 6], med: 1 }], say: ["**Medianen** er tallet i midten når du stiller dem i rekkefølge: 2, **4**, 6. Medianen er 4.", "The **median** is the middle number when you put them in order: 2, **4**, 6. The median is 4."] },
  { q: ["Finn gjennomsnittet av 3, 5 og 10.", ["6", "5", "18", "7"], "Legg sammen og del på hvor mange tall det er: $\\frac{3 + 5 + 10}{3} = \\frac{18}{3} = 6$.",
        "Find the mean of 3, 5 and 10.", ["6", "5", "18", "7"], "Add them up and divide by how many numbers there are: $\\frac{3 + 5 + 10}{3} = \\frac{18}{3} = 6$."], chk: () => String((3 + 5 + 10) / 3) }
] });

// ================= UNGDOMSSKOLEN: MATEMATIKK 8.–10. =================
LESSON({ id: "lift", at: [["GU810", "Tall og regnerekkefølge"]], t: ["Negative tall: heisen", "Negative numbers: the lift"], cards: [
  { fig: ["lf_lift", { v: 0 }], say: ["Tenk på en heis. 0 er bakkeplan. **Opp** er pluss, **ned** er minus. Kjelleretasjene er $-1$, $-2$ og $-3$.", "Think of a lift. 0 is ground level. **Up** is plus, **down** is minus. The basement floors are $-1$, $-2$ and $-3$."] },
  { fig: ["lf_lift", { v: -2, from: 3 }], say: ["Fra 3. etasje og 5 etasjer ned: $3 - 5 = -2$. Du havner i andre kjeller.", "From floor 3 and 5 floors down: $3 - 5 = -2$. You end up on the second basement floor."] },
  { try: { ask: ["Du er i etasje $-3$. Kjør heisen 5 etasjer opp.", "You are on floor $-3$. Take the lift 5 floors up."],
    ctl: [{ k: "v", l: ["Etasje", "Floor"], min: -3, max: 5, v: -3 }], fig: "lf_lift", p: { from: -3 }, goal: s => s.v === 2,
    say: s => [`Etasje ${m(s.v)}: $-3 ${s.v + 3 >= 0 ? "+ " + (s.v + 3) : "- " + -(s.v + 3)} = ${s.v}$`, `Floor ${m(s.v)}: $-3 ${s.v + 3 >= 0 ? "+ " + (s.v + 3) : "- " + -(s.v + 3)} = ${s.v}$`], ok: ["Riktig! $-3 + 5 = 2$.", "Right! $-3 + 5 = 2$."] } },
  { q: ["Det er $-6$ grader. Temperaturen stiger 4 grader. Hva er temperaturen nå?", ["$-2$ grader", "$-10$ grader", "$2$ grader", "$10$ grader"], "Stiger er opp: $-6 + 4 = -2$.",
        "It is $-6$ degrees. The temperature rises 4 degrees. What is the temperature now?", ["$-2$ degrees", "$-10$ degrees", "$2$ degrees", "$10$ degrees"], "Rising is up: $-6 + 4 = -2$."], chk: () => `$${-6 + 4}$ grader` }
] });

LESSON({ id: "power", at: [["GU810", "Potenser og kvadratrøtter"]], t: ["Potenser og kvadratrøtter", "Powers and square roots"], cards: [
  { fig: ["lf_pow", { b: 2, n: 3 }], say: ["$2^3$ betyr $2 \\cdot 2 \\cdot 2$. Det lille tallet oppe, **eksponenten**, sier hvor mange ganger du ganger. $2^3 = 8$ – ikke 6!", "$2^3$ means $2 \\cdot 2 \\cdot 2$. The small raised number, the **exponent**, says how many times you multiply. $2^3 = 8$ – not 6!"] },
  { try: { ask: ["Hvilken eksponent gir 64?", "Which exponent gives 64?"],
    ctl: [{ k: "n", l: ["Eksponent", "Exponent"], min: 0, max: 6, v: 1 }], fig: "lf_pow", p: { b: 2 }, goal: s => s.n === 6,
    say: s => [`$2^{${s.n}} = ${2 ** s.n}$`, `$2^{${s.n}} = ${2 ** s.n}$`], ok: ["Riktig! $2^6 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 64$. Hver gang eksponenten øker med 1, dobles svaret.", "Right! $2^6 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 64$. Each time the exponent goes up by 1, the answer doubles."] } },
  { fig: ["lf_sqrt", { s: 7 }], say: ["**Kvadratrot** går motsatt vei: Et kvadrat med 49 ruter har sider på 7. Derfor er $\\sqrt{49} = 7$.", "The **square root** goes the other way: a square of 49 squares has sides of 7. So $\\sqrt{49} = 7$."] },
  { q: ["Hva er $3^2$?", ["9", "6", "5", "32"], "$3^2 = 3 \\cdot 3 = 9$. Eksponenten 2 betyr at 3 står to ganger i gangestykket.",
        "What is $3^2$?", ["9", "6", "5", "32"], "$3^2 = 3 \\cdot 3 = 9$. The exponent 2 means 3 appears twice in the product."], chk: () => String(3 ** 2) }
] });

LESSON({ id: "eqbal", at: [["GU810", "Algebra og likninger"]], t: ["Likningen som skålvekt", "The equation as a balance"], cards: [
  { fig: ["lf_balance", { x: 2, n: 3, r: 11 }], say: ["$2x + 3 = 11$ er en vekt i balanse: to bokser og 3 kuler veier like mye som 11 kuler.", "$2x + 3 = 11$ is a balanced scale: two boxes and 3 balls weigh the same as 11 balls."] },
  { try: { ask: ["Steg 1: Ta bort like mange kuler fra begge sider, så bare boksene er igjen til venstre.", "Step 1: Take the same number of balls off both sides so only the boxes are left on the left."],
    ctl: [{ k: "take", l: ["Ta bort", "Take off"], min: 0, max: 3, v: 0 }], fig: "lf_balance", p: { x: 2, n: 3, r: 11 }, goal: s => s.take === 3,
    say: s => [`$2x${3 - s.take ? " + " + (3 - s.take) : ""} = ${11 - s.take}$`, `$2x${3 - s.take ? " + " + (3 - s.take) : ""} = ${11 - s.take}$`], ok: ["Bra! Nå står det $2x = 8$.", "Good! Now it says $2x = 8$."] } },
  { try: { ask: ["Steg 2: To bokser veier 8. Del begge sider i to.", "Step 2: Two boxes weigh 8. Split both sides in two."],
    ctl: [{ k: "div", l: ["Del i to", "Split in two"], min: 0, max: 1, v: 0 }], fig: "lf_balance", p: { x: 2, n: 3, r: 11, take: 3 }, goal: s => s.div === 1,
    say: s => s.div ? ["$x = 4$", "$x = 4$"] : ["$2x = 8$", "$2x = 8$"], ok: ["Riktig! $x = 4$. Sjekk: $2 \\cdot 4 + 3 = 11$ ✓", "Right! $x = 4$. Check: $2 \\cdot 4 + 3 = 11$ ✓"] } },
  { q: ["Løs likningen $3x + 2 = 14$.", ["$x = 4$", "$x = 12$", "$x = 6$", "$x = 5$"], "Ta bort 2 på begge sider: $3x = 12$. Del på 3: $x = 4$. Sjekk: $3 \\cdot 4 + 2 = 14$ ✓",
        "Solve the equation $3x + 2 = 14$.", ["$x = 4$", "$x = 12$", "$x = 6$", "$x = 5$"], "Take 2 off both sides: $3x = 12$. Divide by 3: $x = 4$. Check: $3 \\cdot 4 + 2 = 14$ ✓"], chk: () => `$x = ${(14 - 2) / 3}$` }
] });

LESSON({ id: "machine", at: [["GU810", "Lineære funksjoner"]], t: ["Funksjonsmaskinen", "The function machine"], cards: [
  { fig: ["lf_machine", { x: 3, a: 2, b: 1 }], say: ["En funksjon er en maskin: Et tall går **inn**, maskinen gjør det samme med alle tall, og et nytt tall kommer **ut**. Denne ganger med 2 og legger til 1.", "A function is a machine: a number goes **in**, the machine does the same thing to every number, and a new number comes **out**. This one multiplies by 2 and adds 1."] },
  { fig: ["lf_machine", { x: 5, a: 2, b: 1 }], say: ["Vi skriver maskinen som $f(x) = 2x + 1$. $x$ er tallet inn, $f(x)$ er tallet ut. Inn 5, ut 11.", "We write the machine as $f(x) = 2x + 1$. $x$ is the number in, $f(x)$ is the number out. In 5, out 11."] },
  { try: { ask: ["Hvilket tall må inn for at 13 skal komme ut?", "Which number must go in for 13 to come out?"],
    ctl: [{ k: "x", l: ["Inn", "In"], min: 0, max: 8, v: 0 }], fig: "lf_machine", p: { a: 2, b: 1 }, goal: s => s.x === 6,
    say: s => [`Inn ${s.x} → ut ${2 * s.x + 1}`, `In ${s.x} → out ${2 * s.x + 1}`], ok: ["Riktig! $f(6) = 2 \\cdot 6 + 1 = 13$.", "Right! $f(6) = 2 \\cdot 6 + 1 = 13$."] } },
  { q: ["$f(x) = 3x - 1$. Hva kommer ut når $x = 4$?", ["11", "12", "7", "13"], "$f(4) = 3 \\cdot 4 - 1 = 12 - 1 = 11$.",
        "$f(x) = 3x - 1$. What comes out when $x = 4$?", ["11", "12", "7", "13"], "$f(4) = 3 \\cdot 4 - 1 = 12 - 1 = 11$."], chk: () => String(3 * 4 - 1) }
] });

LESSON({ id: "ratio", at: [["GU810", "Lineære funksjoner"]], t: ["Forhold: saftoppskriften", "Ratio: the squash recipe"], cards: [
  { fig: ["lf_ratio", { n: 1 }], say: ["På saftflaska står det **1 : 4**. Det betyr 1 del saft og 4 deler vann.", "The squash bottle says **1 : 4**. That means 1 part squash and 4 parts water."] },
  { fig: ["lf_ratio", { n: 3 }], say: ["Skal du lage 3 ganger så mye, ganger du **begge** delene med 3: 3 dl saft og 12 dl vann. Smaken blir den samme. Det er **proporsjonalitet**.", "To make 3 times as much, multiply **both** parts by 3: 3 dl squash and 12 dl water. It tastes the same. That is **proportionality**."] },
  { try: { ask: ["Du har 4 dl saft. Lag en blanding som smaker likt.", "You have 4 dl of squash. Make a mix that tastes the same."],
    ctl: [{ k: "n", l: ["Saft (dl)", "Squash (dl)"], min: 1, max: 5, v: 1 }], fig: "lf_ratio", goal: s => s.n === 4,
    say: s => [`${s.n} dl saft + ${4 * s.n} dl vann`, `${s.n} dl squash + ${4 * s.n} dl water`], ok: ["Riktig! 4 dl saft trenger $4 \\cdot 4 = 16$ dl vann.", "Right! 4 dl of squash needs $4 \\cdot 4 = 16$ dl of water."] } },
  { q: ["Blandingsforholdet er 1 : 4. Hvor mye vann trenger du til 2 dl saft?", ["8 dl", "6 dl", "4 dl", "2 dl"], "Begge delene ganges med 2: $4 \\cdot 2 = 8$ dl vann.",
        "The mixing ratio is 1 : 4. How much water do you need for 2 dl of squash?", ["8 dl", "6 dl", "4 dl", "2 dl"], "Both parts are multiplied by 2: $4 \\cdot 2 = 8$ dl of water."], chk: () => (4 * 2) + " dl" }
] });

LESSON({ id: "pyth", at: [["GU810", "Geometri"]], t: ["Pytagoras: ruter på sidene", "Pythagoras: squares on the sides"], cards: [
  { fig: ["lf_pyth", { a: 3, b: 4 }], say: ["Tegn et kvadrat på hver side av en rettvinklet trekant og tell rutene: $9 + 16 = 25$. De to små kvadratene er til sammen like store som det store!", "Draw a square on each side of a right triangle and count the squares: $9 + 16 = 25$. The two small squares together are as big as the large one!"] },
  { fig: ["lf_pyth", { a: 3, b: 4 }], say: ["Derfor er $a^2 + b^2 = c^2$. Den lange siden er $c = \\sqrt{25} = 5$. Den heter **hypotenusen** og ligger alltid rett overfor den rette vinkelen.", "So $a^2 + b^2 = c^2$. The long side is $c = \\sqrt{25} = 5$. It is called the **hypotenuse** and is always opposite the right angle."] },
  { try: { ask: ["Finn en rettvinklet trekant der den lange siden $c$ blir 10.", "Find a right triangle where the long side $c$ is 10."],
    ctl: [{ k: "a", l: ["a", "a"], min: 1, max: 8, v: 3 }, { k: "b", l: ["b", "b"], min: 1, max: 8, v: 4 }], fig: "lf_pyth", goal: s => s.a * s.a + s.b * s.b === 100,
    say: s => { const c2 = s.a * s.a + s.b * s.b, c = Math.sqrt(c2), [cn, ce] = dec(c, 1); return [`$${s.a}^2 + ${s.b}^2 = ${c2}$, så $c ${Number.isInteger(c) ? "=" : "\\approx"} ${cn.replace(",", "{,}")}$`, `$${s.a}^2 + ${s.b}^2 = ${c2}$, so $c ${Number.isInteger(c) ? "=" : "\\approx"} ${ce}$`]; },
    ok: ["Riktig! $6^2 + 8^2 = 36 + 64 = 100 = 10^2$.", "Right! $6^2 + 8^2 = 36 + 64 = 100 = 10^2$."] } },
  { q: ["Katetene i en rettvinklet trekant er 5 og 12. Hvor lang er hypotenusen?", ["13", "17", "60", "7"], "$5^2 + 12^2 = 25 + 144 = 169$, og $\\sqrt{169} = 13$.",
        "The legs of a right triangle are 5 and 12. How long is the hypotenuse?", ["13", "17", "60", "7"], "$5^2 + 12^2 = 25 + 144 = 169$, and $\\sqrt{169} = 13$."], chk: () => String(Math.sqrt(5 * 5 + 12 * 12)) }
] });

LESSON({ id: "interest", at: [["GU810", "Privatøkonomi"]], t: ["Rentes rente", "Compound interest"], cards: [
  { fig: ["lf_growth", { n: 1 }], say: ["Du setter 1000 kr i banken med 10 % rente. Etter ett år får du 100 kr i rente: $1000 \\cdot 1{,}10 = 1100$ kr.", "You put 1000 kr in the bank at 10 % interest. After one year you get 100 kr interest: $1000 \\cdot 1.10 = 1100$ kr."] },
  { fig: ["lf_growth", { n: 2 }], say: ["Året etter får du rente av 1100 kr – også av renta fra i fjor. Det er **rentes rente**: $1000 \\cdot 1{,}10^2 = 1210$ kr.", "The year after you get interest on 1100 kr – including last year's interest. That is **compound interest**: $1000 \\cdot 1.10^2 = 1210$ kr."] },
  { try: { ask: ["Hvor mange år tar det før du har mer enn 1500 kr?", "How many years until you have more than 1500 kr?"],
    ctl: [{ k: "n", l: ["År", "Years"], min: 0, max: 7, v: 0 }], fig: "lf_growth", goal: s => s.n === 5,
    say: s => { const v = Math.round(1000 * 1.1 ** s.n); return [`Etter ${s.n} år: ${v} kr`, `After ${s.n} years: ${v} kr`]; }, ok: ["Riktig! Etter 4 år har du 1464 kr, etter 5 år 1611 kr.", "Right! After 4 years you have 1464 kr, after 5 years 1611 kr."] } },
  { q: ["Du sparer 2000 kr med 5 % rente i 2 år. Hvilket regnestykke gir beløpet?", ["$2000 \\cdot 1{,}05^2$", "$2000 \\cdot 1{,}05 \\cdot 2$", "$2000 + 5 \\cdot 2$", "$2000 \\cdot 0{,}05^2$"], "Vekstfaktoren for 5 % er 1,05. To år med rentes rente: gang med 1,05 to ganger, $2000 \\cdot 1{,}05^2 = 2205$ kr.",
        "You save 2000 kr at 5 % interest for 2 years. Which calculation gives the amount?", ["$2000 \\cdot 1.05^2$", "$2000 \\cdot 1.05 \\cdot 2$", "$2000 + 5 \\cdot 2$", "$2000 \\cdot 0.05^2$"], "The growth factor for 5 % is 1.05. Two years of compound interest: multiply by 1.05 twice, $2000 \\cdot 1.05^2 = 2205$ kr."] }
] });

// ================= NATURFAG =================
LESSON({ id: "foodchain", at: [["GSNAT", "Planter og dyr"]], t: ["Næringskjeden", "The food chain"], cards: [
  { fig: ["gu_food"], say: ["En **næringskjede** viser hvem som spiser hvem. Pilen peker dit energien går: gress → hare → rev.", "A **food chain** shows who eats whom. The arrow points where the energy goes: grass → hare → fox."] },
  { try: { ask: ["Trykk på alle **produsentene** – de som lager sin egen mat av sollys.", "Tap all the **producers** – the ones that make their own food from sunlight."],
    items: [{ l: ["Gress", "Grass"], v: 1 }, { l: ["Hare", "Hare"], v: 0 }, { l: ["Bjørk", "Birch"], v: 1 }, { l: ["Rev", "Fox"], v: 0 }, { l: ["Ugle", "Owl"], v: 0 }, { l: ["Mose", "Moss"], v: 1 }],
    goal: (sel, it) => sel.length === 3 && sel.every(i => it[i].v === 1), say: sel => [`Du har valgt ${sel.length}.`, `You have picked ${sel.length}.`],
    ok: ["Riktig! Gress, bjørk og mose er planter. De lager mat med fotosyntese og står først i næringskjeden.", "Right! Grass, birch and moss are plants. They make food by photosynthesis and come first in the food chain."] } },
  { q: ["Hva kalles sopp og bakterier som bryter ned døde planter og dyr?", ["Nedbrytere", "Produsenter", "Rovdyr", "Planteetere"], "Nedbryterne gjør døde planter og dyr om til næring i jorda, så nye planter kan vokse.",
        "What do we call fungi and bacteria that break down dead plants and animals?", ["Decomposers", "Producers", "Predators", "Herbivores"], "Decomposers turn dead plants and animals into nutrients in the soil, so new plants can grow."] }
] });

LESSON({ id: "states", at: [["GSNAT", "Stoffer og tilstander"]], t: ["Fast stoff, væske og gass", "Solid, liquid and gas"], cards: [
  { fig: ["lf_states", { t: -10 }], say: ["Is er **fast stoff**. De bitte små vannbitene står stille i rader, så isen har fast form.", "Ice is a **solid**. The tiny bits of water stay still in rows, so ice keeps its shape."] },
  { fig: ["lf_states", { t: 20 }], say: ["Varmer du opp, smelter isen til **væske** ved 0 °C. Bitene sklir rundt hverandre, så vannet tar formen til glasset.", "Warm it up and the ice melts into a **liquid** at 0 °C. The bits slide around each other, so the water takes the shape of the glass."] },
  { try: { ask: ["Varm opp vannet til det koker og blir damp.", "Heat the water until it boils and turns into steam."],
    ctl: [{ k: "t", l: ["Temperatur", "Temperature"], min: -20, max: 120, step: 10, v: -10 }], fig: "lf_states", goal: s => s.t >= 100,
    say: s => [s.t <= 0 ? "Is – fast stoff" : s.t < 100 ? "Vann – væske" : "Damp – gass", s.t <= 0 ? "Ice – solid" : s.t < 100 ? "Water – liquid" : "Steam – gas"], ok: ["Riktig! Ved 100 °C koker vannet og blir til damp – en **gass** der bitene flyr fritt.", "Right! At 100 °C the water boils and turns into steam – a **gas** where the bits fly freely."] } },
  { q: ["Hva skjer når vanndamp blir avkjølt?", ["Den blir til vann igjen", "Den blir til luft", "Den forsvinner", "Den blir til salt"], "Damp som kjøles ned, **kondenserer** og blir til vanndråper – som duggen på et kaldt speil.",
        "What happens when steam is cooled?", ["It turns back into water", "It turns into air", "It disappears", "It turns into salt"], "Steam that cools **condenses** into water drops – like the mist on a cold mirror."] }
] });

LESSON({ id: "circuit", at: [["GSNAT", "Elektrisitet og magneter"]], t: ["Strømkretsen må være lukket", "The circuit must be closed"], cards: [
  { fig: ["lf_circuit", { on: 0 }], say: ["Strømmen går i en ring: fra batteriet, gjennom pæra og tilbake. Her er ringen brutt ved bryteren, så pæra lyser ikke.", "Electricity flows in a loop: from the battery, through the bulb and back. Here the loop is broken at the switch, so the bulb is off."] },
  { try: { ask: ["Trykk på bryteren og få pæra til å lyse.", "Tap the switch and make the bulb light up."],
    items: [{ l: ["Bryteren", "The switch"], v: 1 }], fig: "lf_circuit", map: sel => ({ on: sel.length > 0 }), goal: sel => sel.length === 1,
    say: sel => sel.length ? ["Kretsen er lukket.", "The circuit is closed."] : ["Kretsen er åpen.", "The circuit is open."], ok: ["Riktig! Når ringen er lukket, kan strømmen gå rundt – og pæra lyser.", "Right! When the loop is closed, the current can flow round – and the bulb lights up."] } },
  { q: ["Hvilken ting leder strøm?", ["En spiker av jern", "Et viskelær", "En plastlinjal", "En treklosse"], "Metaller som jern leder strøm. Gummi, plast og tre er isolatorer.",
        "Which thing conducts electricity?", ["An iron nail", "A rubber", "A plastic ruler", "A wooden block"], "Metals like iron conduct electricity. Rubber, plastic and wood are insulators."] }
] });

LESSON({ id: "daynight", at: [["GSNAT", "Jorda og verdensrommet"]], t: ["Dag og natt", "Day and night"], cards: [
  { fig: ["lf_earth", { h: 12 }], say: ["Sola lyser bare på den ene halvdelen av jorda. Der er det **dag**. På den andre halvdelen er det **natt**.", "The sun only lights one half of the earth. There it is **day**. On the other half it is **night**."] },
  { try: { ask: ["Jorda snurrer rundt seg selv én gang i døgnet. Snurr den til det er natt i Norge.", "The earth spins round once a day. Spin it until it is night in Norway."],
    ctl: [{ k: "h", l: ["Klokka", "Time"], min: 0, max: 21, step: 3, v: 12 }], fig: "lf_earth", goal: s => Math.cos((s.h - 12) / 24 * 2 * Math.PI) < -0.05,
    say: s => { const c = Math.cos((s.h - 12) / 24 * 2 * Math.PI); return c > 0.05 ? [`Klokka ${s.h}: dag`, `${s.h}:00: day`] : c < -0.05 ? [`Klokka ${s.h}: natt`, `${s.h}:00: night`] : [`Klokka ${s.h}: morgen eller kveld`, `${s.h}:00: morning or evening`]; },
    ok: ["Riktig! Nå har Norge snurret bort fra sola, og det er natt.", "Right! Now Norway has spun away from the sun, and it is night."] } },
  { q: ["Hvorfor har vi dag og natt?", ["Jorda snurrer rundt seg selv", "Sola går rundt jorda", "Månen dekker for sola", "Jorda går rundt sola"], "Jorda snurrer rundt seg selv én gang i døgnet. Den siden som vender mot sola, har dag.",
        "Why do we have day and night?", ["The earth spins round", "The sun goes round the earth", "The moon covers the sun", "The earth goes round the sun"], "The earth spins round once a day. The side facing the sun has day."] }
] });

LESSON({ id: "speed", at: [["GUNAT", "Krefter, fart og energi"]], t: ["Fart: hvor langt på en time", "Speed: how far in an hour"], cards: [
  { fig: ["lf_car", { v: 60, t: 1 }], say: ["**60 km/h** betyr: Kjører du like fort hele tiden, kommer du 60 km på én time.", "**60 km/h** means: if you keep the same speed, you go 60 km in one hour."] },
  { try: { ask: ["Hvor lenge må bilen kjøre for å komme 180 km?", "How long must the car drive to go 180 km?"],
    ctl: [{ k: "t", l: ["Timer", "Hours"], min: 0, max: 4, v: 0 }], fig: "lf_car", p: { v: 60 }, goal: s => s.t === 3,
    say: s => [`$${s.t} \\text{ h} \\cdot 60 \\text{ km/h} = ${60 * s.t} \\text{ km}$`, `$${s.t} \\text{ h} \\cdot 60 \\text{ km/h} = ${60 * s.t} \\text{ km}$`], ok: ["Riktig! 3 timer: $60 \\cdot 3 = 180$ km.", "Right! 3 hours: $60 \\cdot 3 = 180$ km."] } },
  { fig: ["gu_speed"], say: ["Som formel: strekning = fart · tid, $s = v \\cdot t$. Og fart = strekning delt på tid, $v = \\frac{s}{t}$.", "As a formula: distance = speed · time, $s = v \\cdot t$. And speed = distance divided by time, $v = \\frac{s}{t}$."] },
  { q: ["En syklist sykler 15 km på én time. Hvor langt kommer hun på 2 timer med samme fart?", ["30 km", "17 km", "15 km", "7,5 km"], "$s = v \\cdot t = 15 \\cdot 2 = 30$ km.",
        "A cyclist rides 15 km in one hour. How far does she get in 2 hours at the same speed?", ["30 km", "17 km", "15 km", "7.5 km"], "$s = v \\cdot t = 15 \\cdot 2 = 30$ km."], chk: () => (15 * 2) + " km" }
] });

LESSON({ id: "ohm", at: [["GUNAT", "Elektrisitet"]], t: ["Strøm som vann i et rør", "Current like water in a pipe"], cards: [
  { fig: ["lf_ohm", { U: 6, R: 3 }], say: ["Tenk på strøm som vann. **Spenningen** (U) er hvor høyt vannet står – trykket. **Resistansen** (R) er hvor trangt røret er. **Strømmen** (I) er hvor mye vann som renner.", "Think of current as water. The **voltage** (U) is how high the water stands – the pressure. The **resistance** (R) is how narrow the pipe is. The **current** (I) is how much water flows."] },
  { try: { ask: ["Få strømmen til å bli 2 A.", "Make the current 2 A."],
    ctl: [{ k: "U", l: ["Spenning (V)", "Voltage (V)"], min: 0, max: 12, step: 2, v: 6 }, { k: "R", l: ["Resistans (Ω)", "Resistance (Ω)"], min: 1, max: 6, v: 6 }], fig: "lf_ohm", goal: s => s.U === 2 * s.R,
    say: s => { const [a, b] = dec(s.U / s.R); return [`$I = \\frac{U}{R} = \\frac{${s.U}}{${s.R}} = ${a.replace(",", "{,}")}$ A`, `$I = \\frac{U}{R} = \\frac{${s.U}}{${s.R}} = ${b}$ A`]; },
    ok: s => [`Riktig! $I = \\frac{${s.U}}{${s.R}} = 2$ A. Mer spenning gir mer strøm, mer resistans gir mindre.`, `Right! $I = \\frac{${s.U}}{${s.R}} = 2$ A. More voltage gives more current, more resistance gives less.`] } },
  { q: ["Hva skjer med strømmen hvis spenningen dobles og resistansen er den samme?", ["Den dobles", "Den halveres", "Den blir den samme", "Den blir null"], "$I = \\frac{U}{R}$. Dobbelt så stor $U$ med samme $R$ gir dobbelt så stor strøm.",
        "What happens to the current if the voltage is doubled and the resistance stays the same?", ["It doubles", "It halves", "It stays the same", "It becomes zero"], "$I = \\frac{U}{R}$. Twice the $U$ with the same $R$ gives twice the current."] }
] });

LESSON({ id: "atoms", at: [["GUNAT", "Kjemi: atomer og reaksjoner"]], t: ["Ingen atomer forsvinner", "No atoms disappear"], cards: [
  { fig: ["lf_atoms", { h: 2 }], say: ["Hydrogen ($H_2$) og oksygen ($O_2$) reagerer og blir til vann ($H_2O$). Atomene bytter bare partner – ingen forsvinner, og ingen nye kommer til.", "Hydrogen ($H_2$) and oxygen ($O_2$) react and become water ($H_2O$). The atoms just swap partners – none disappear and no new ones appear."] },
  { try: { ask: ["Det skal bli 2 vannmolekyler. Hvor mange $H_2$ trengs? Tell H-atomene på begge sider.", "We want 2 water molecules. How many $H_2$ are needed? Count the H atoms on both sides."],
    ctl: [{ k: "h", l: ["Antall H₂", "Number of H₂"], min: 1, max: 4, v: 1 }], fig: "lf_atoms", goal: s => s.h === 2,
    say: s => [`${2 * s.h} H før, 4 H etter`, `${2 * s.h} H before, 4 H after`], ok: ["Riktig! $2H_2 + O_2 \\rightarrow 2H_2O$: 4 H og 2 O på begge sider.", "Right! $2H_2 + O_2 \\rightarrow 2H_2O$: 4 H and 2 O on both sides."] } },
  { q: ["Før en reaksjon er det 6 O-atomer. Hvor mange O-atomer er det etter reaksjonen?", ["6", "3", "12", "0"], "I en kjemisk reaksjon forsvinner ingen atomer. Det er like mange O-atomer før og etter: 6.",
        "Before a reaction there are 6 O atoms. How many O atoms are there after the reaction?", ["6", "3", "12", "0"], "In a chemical reaction no atoms disappear. There are as many O atoms before as after: 6."] }
] });
LESSON({ id: "punnett", at: [["GUNAT", "Genetikk og evolusjon"]], t: ["Krysningsskjemaet", "The Punnett square"], cards: [
  { fig: ["gu_punnett"], say: ["Hvert barn får ett gen fra mor og ett fra far. Skjemaet viser alle fire måtene genene kan settes sammen på.", "Each child gets one gene from the mother and one from the father. The square shows all four ways the genes can combine."] },
  { try: { ask: ["Blå øyne (b) er **vikende**: barnet må ha b fra begge foreldrene. Trykk på rutene som gir blå øyne.", "Blue eyes (b) are **recessive**: the child needs b from both parents. Tap the squares that give blue eyes."],
    items: ["BB", "Bb", "bB", "bb"].map(g => ({ l: g, v: g === "bb" ? 1 : 0 })), goal: (sel, it) => sel.length === 1 && it[sel[0]].v === 1,
    say: sel => [`${sel.length} av 4 ruter valgt`, `${sel.length} of 4 squares picked`], ok: ["Riktig! Bare bb gir blå øyne: 1 av 4, altså 25 % sjanse.", "Right! Only bb gives blue eyes: 1 in 4, so a 25 % chance."] } },
  { q: ["Begge foreldrene er Bb. Hva er sjansen for at barnet får brune øyne (B er dominant)?", ["3 av 4", "1 av 4", "2 av 4", "4 av 4"], "BB, Bb og bB gir alle brune øyne fordi B er dominant. Det er 3 av 4 ruter.",
        "Both parents are Bb. What is the chance that the child has brown eyes (B is dominant)?", ["3 in 4", "1 in 4", "2 in 4", "4 in 4"], "BB, Bb and bB all give brown eyes because B is dominant. That is 3 of the 4 squares."] }
] });
})();

// Hvor mange ruter rektangelet har hvis de valgte rutene danner et helt rektangel (ellers 0). c = antall kolonner.
function lfRect(sel, c){
  if(!sel.length) return 0; const r = sel.map(i => Math.floor(i / c)), k = sel.map(i => i % c);
  const h = Math.max(...r) - Math.min(...r) + 1, w = Math.max(...k) - Math.min(...k) + 1; return h * w === sel.length ? sel.length : 0;
}
// Enhetene en leksjon hører til, som [kode, enhet]. Enheten finnes med tittelen.
const lfUnits = L => L.at.map(([code, title]) => { const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; return u >= 0 ? [code, u] : null; }).filter(Boolean);
const lfFor = (code, u) => LESSONS.filter(L => lfUnits(L).some(([c, v]) => c === code && v === u));
const lfSeen = id => !!((typeof S !== "undefined" && S.lfDone) || {})[id];
const lfTitle = L => T(L.t[0], L.t[1]);
const lfTx = p => p == null ? "" : Array.isArray(p) ? T(p[0], p[1]) : String(p);

// ---------- «Prøv selv»: tilstand, mål og løsning ----------
const lfKind = tr => tr.ctl ? "ctl" : tr.items ? "tap" : "grid";
const lfMax = (c, v) => typeof c.max === "function" ? c.max(v) : c.max;
function lfTryInit(tr){ if(tr.ctl){ const v = {}; tr.ctl.forEach(c => v[c.k] = c.v ?? c.min); return { v, n: 0 }; } return { sel: [], n: 0 }; }
const lfTryArg = (tr, st) => tr.ctl ? [st.v] : [st.sel, tr.items || []];
const lfAtGoal = (tr, st) => { try{ return !!tr.goal(...lfTryArg(tr, st)); }catch(e){ return false; } };
const lfFigParams = (tr, st) => Object.assign({}, tr.p || {}, tr.map ? tr.map(...lfTryArg(tr, st)) : tr.ctl ? st.v : {});
// En tilstand som når målet («Vis meg» og testene): prøver alle verdiene for + og −, eller alle valgene av ting.
function lfSolve(tr){
  if(tr.grid) return tr.grid.solve ? { sel: tr.grid.solve.slice(), n: 0 } : null;
  if(tr.items){ const n = tr.items.length; for(let mask = 0; mask < (1 << n); mask++){ const sel = []; for(let i = 0; i < n; i++) if(mask & (1 << i)) sel.push(i); if(lfAtGoal(tr, { sel })) return { sel, n: 0 }; } return null; }
  const ks = tr.ctl, v = {}; let found = null;
  const rec = i => { if(found) return; if(i === ks.length){ if(lfAtGoal(tr, { v })) found = { v: { ...v }, n: 0 }; return; }
    const c = ks[i]; for(let x = c.min; x <= lfMax(c, v); x += c.step || 1){ v[c.k] = x; rec(i + 1); } };
  rec(0); return found;
}

// ---------- skjermen ----------
let LF = null; // { ids, k, code, u, go, from, auto, i, st: [kortenes tilstand], right, asked, xp, anim }
function lfOpen(ids, o = {}){
  ids = ids.filter(id => lfById(id)); if(!ids.length) return false;
  LF = { ids, k: 0, code: o.code, u: o.u, go: o.go || null, from: screen, auto: !!o.auto };
  lfStart(); return true;
}
function lfStart(){
  const L = lfById(LF.ids[LF.k]);
  LF.i = 0; LF.right = 0; LF.xp = 0; LF.anim = "in";
  LF.st = L.cards.map(c => c.try ? lfTryInit(c.try) : c.q ? { wrong: [], done: false, order: shuffle(c.q[1].map((_, i) => i)) } : {});
  LF.asked = L.cards.filter(c => c.q).length;
  if(typeof stEv === "function") stEv("theory", L.id, "lesson");
  overlay = null; screen = "lf"; render(); window.scrollTo(0, 0);
}
const lfFigHTML = (name, p) => { const f = FIGS[name]; if(!f) return ""; let r = null; try{ r = f(p); }catch(e){} if(!r) return "";
  return `<figure class="fig lf-fig"><svg viewBox="0 0 320 180" role="img" aria-label="${esc(r.cap)}">${r.svg}</svg></figure>`; };
const lfSay = s => richDoc(lfTx(s)).replace(/<math(?=[\s>])(?![^>]*display="block")/g, '<math displaystyle="true"');
function lfCardHTML(L, card, st){
  if(card.fig) return `${LF.i === 0 ? `<div class="lf-head"><small>${esc(T("Lær først", "Learn first"))}</small><h2>${esc(T("Lær: ", "Learn: ") + lfTitle(L))}</h2></div>` : ""}${lfFigHTML(card.fig[0], card.fig[1])}<div class="lf-say">${lfSay(card.say)}</div>`;
  if(card.try){ const tr = card.try, kind = lfKind(tr), at = lfAtGoal(tr, st), arg = lfTryArg(tr, st);
    let ctl = "";
    if(kind === "ctl") ctl = `<div class="lf-ctls">${tr.ctl.map(c => { const v = st.v[c.k], mx = lfMax(c, st.v), lab = lfTx(c.l);
      return `<div class="lf-ctl"><span class="lf-cl">${esc(lab)}</span><button class="lf-step" data-a="lfstep" data-k="${c.k}" data-d="-1" ${v <= c.min ? "disabled" : ""} aria-label="${esc(lab)} −">−</button><output>${esc(String(v).replace(/^-/, "−"))}</output><button class="lf-step" data-a="lfstep" data-k="${c.k}" data-d="1" ${v >= mx ? "disabled" : ""} aria-label="${esc(lab)} +">+</button></div>`; }).join("")}</div>`;
    else if(kind === "tap") ctl = `<div class="lf-taps">${tr.items.map((it, i) => { const on = st.sel.includes(i); return `<button class="lf-tapb ${on ? "on" : ""} ${it.svg ? "pic" : ""}" data-a="lftap" data-i="${i}" aria-pressed="${on}">${it.svg || ""}<span>${esc(lfTx(it.l))}</span></button>`; }).join("")}</div>`;
    else { const g = tr.grid, fixed = g.fixed || [];
      ctl = `<div class="lf-grid ${g.half ? "mirror" : ""}" style="--c:${g.c}" role="group" aria-label="${esc(lfTx(tr.ask))}">${Array.from({ length: g.r * g.c }, (_, i) => { const fx = fixed.includes(i), on = st.sel.includes(i), off = !fx && g.half && i % g.c < g.c / 2;
        return `<button class="lf-cell ${fx ? "fx" : on ? "on" : ""}" data-a="lfcell" data-i="${i}" ${fx || off ? "disabled" : ""} aria-pressed="${fx || on}" aria-label="${esc(T(`Rad ${Math.floor(i / g.c) + 1}, rute ${i % g.c + 1}`, `Row ${Math.floor(i / g.c) + 1}, square ${i % g.c + 1}`))}"></button>`; }).join("")}</div>`; }
    const fig = tr.fig ? lfFigHTML(tr.fig, lfFigParams(tr, st)) : "", ok = [].concat(typeof tr.ok === "function" ? tr.ok(...arg) : tr.ok).map(x => x.replace(/^(Riktig|Right)!\s*/, ""));
    return `<div class="lf-try"><div class="gd-qh lf-tag">${I.target}${esc(T("Prøv selv", "Try it"))}</div><div class="lf-ask">${lfSay(tr.ask)}</div>${fig}
      <div class="lf-live" aria-live="polite">${tr.say ? lfSay(tr.say(...arg)) : ""}</div>${ctl}
      ${at ? `<div class="cy-e ok lf-ok"><b>${esc(T("Riktig!", "Right!"))}</b> ${lfSay(ok)}</div>` : !st.done && st.n >= 4 ? `<button class="gd-skip" data-a="lfshow">${I.bolt}${esc(T("Vis meg", "Show me"))}</button>` : ""}</div>`; }
  if(card.q){ const q = card.q, opts = T(q[1], q[4] || q[1]), ex = T(q[2], q[5]), right = st.done && !st.gaveUp;
    return `<div class="gd-q"><div class="krow"><div class="gd-qh">${I.star16}${esc(T("Sjekk at du skjønte det", "Check that you got it"))}</div></div><div class="gd-p">${richBig(T(q[0], q[3]))}</div><div class="opts">` +
      st.order.map((i, j) => { const w = st.wrong.includes(i), show = st.done && i === 0;
        return `<button class="opt ${show ? "right" : w ? "wrong" : ""}" data-a="lfans" data-i="${i}" ${st.done || w ? "disabled" : ""}><span class="k">${"ABCD"[j] || j + 1}</span><span>${richBig(opts[i])}</span></button>`; }).join("") +
      `</div>${st.wrong.length && !st.done ? `<p class="gd-try">${esc(t("gdTryAgain"))}</p>` : ""}${st.done ? `<div class="cy-e ${right ? "ok" : "bad"}"><b>${esc(t(right ? (st.wrong.length ? "gdRightNow" : "cyRight") : "gdAnswer"))}</b> ${rich(ex)}</div>` : ""}</div>`; }
  return "";
}
const lfNextUnseen = () => { for(let j = LF.k + 1; j < LF.ids.length; j++) if(!lfSeen(LF.ids[j]) || !LF.auto) return j; return -1; };
function renderLf(){
  if(!LF){ screen = "home"; renderHome(); return; }
  const L = lfById(LF.ids[LF.k]), n = L.cards.length + 1, end = LF.i >= L.cards.length, card = L.cards[LF.i], st = LF.st[LF.i];
  const ready = end || !(card.try || card.q) || (card.try ? st.done : st.done);
  const segs = Array.from({ length: n }, (_, i) => `<i class="${i < LF.i ? "on" : i === LF.i ? "cur" : ""} ${L.cards[i] && L.cards[i].q ? "q" : ""}"></i>`).join("");
  const nx = end ? lfNextUnseen() : -1, nxL = nx >= 0 ? lfById(LF.ids[nx]) : null;
  const endHTML = `<div class="gd-end"><div class="gd-end-ic">${I.checkS}</div><h2>${esc(T("Bra jobba!", "Well done!"))}</h2><p>${esc(T("Nå kan du: ", "Now you know: ") + lfTitle(L))}</p>
    ${LF.asked ? `<div class="gd-score"><b>${LF.right}/${LF.asked}</b><span>${esc(t("gdScore"))}</span></div>` : ""}${LF.xp ? `<div class="gd-xp">${I.bolt}+${LF.xp} XP</div>` : ""}</div>`;
  const foot = end ? (nxL ? `<button class="big" data-a="lfgo">${esc(T("Neste: ", "Next: ") + T("Lær: ", "Learn: ") + lfTitle(nxL))}</button>${LF.go ? `<button class="big ghost lf-alt" data-a="lfpractice">${esc(T("Til oppgavene", "To the questions"))}</button>` : ""}`
      : `<button class="big" data-a="lfpractice">${esc(LF.go ? T("Start oppgavene", "Start the questions") : T("Øv på dette", "Practise this"))}</button>`)
    : `<button class="big" data-a="lfnext" ${ready ? "" : "disabled"}>${esc(card.q && !st.done ? t("gdPick") : card.try && !st.done ? T("Prøv først", "Try it first") : t("cont"))}</button>`;
  $app.innerHTML = `<div class="top gd-top"><div class="wrap"><button class="iconbtn" data-a="lfclose" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="gd-prog" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${LF.i + 1}">${segs}</div></div></div>
    <main class="wrap gd lf"><div class="gd-card lf-card ${LF.anim === "in" ? "gd-in" : LF.anim === "r" ? "gd-from-l" : LF.anim === "l" ? "gd-from-r" : ""}">${end ? endHTML : lfCardHTML(L, card, st)}</div></main>
    <div class="lfoot ${card && card.q && st.done ? (st.gaveUp ? "bad" : "ok") : ""}"><div class="wrap gd-foot">
      ${LF.i > 0 && !end ? `<button class="gd-back" data-a="lfprev" aria-label="${esc(t("back"))}">${I.left}</button>` : ""}${foot}</div></div>`;
  LF.anim = null;
}
function lfGo(d){
  if(!LF) return; const L = lfById(LF.ids[LF.k]), card = L.cards[LF.i], st = LF.st[LF.i];
  if(d > 0 && (LF.i >= L.cards.length || ((card.try || card.q) && !st.done))) return;
  if(d < 0 && (LF.i === 0 || LF.i >= L.cards.length)) return;
  LF.i += d; LF.anim = d > 0 ? "l" : "r";
  if(LF.i >= L.cards.length) lfFinish(L);
  render(); window.scrollTo(0, 0);
}
function lfFinish(L){
  S.lfDone ||= {};
  if(!S.lfDone[L.id]){ S.lfDone[L.id] = Date.now(); LF.xp = 5 + LF.right; const st = awardXP(LF.xp); if(st && st.goalHit) setTimeout(() => toast(t("goalHitTitle")), 600); }
  bdgToast(checkBadges()); save(); setTimeout(() => confetti("complete"), 200); buzz(true);
}
function lfPractice(){
  const { code, u, go } = LF; LF = null; const c = COURSE(code); if(!c){ goHome(); return; }
  let uu = u, k = 0; const nn = nextNode(c);
  if(go){ uu = go.u; k = go.k; } else if(nn && nn[0] === u) k = nn[1]; else if(sub(code).done[u + "-2"]) k = 3;
  if(!isUnlocked(c, uu, k)){ goHome(); toast(t("lockedNode")); return; }
  startUnitLesson(code, uu, k);
}
function lfClick(a, b){
  if(!a.startsWith("lf")) return false;
  if(a === "lfopen"){ const code = b.dataset.c, u = +b.dataset.u, all = lfFor(code, u).map(L => L.id), id = b.dataset.id;
    lfOpen(id ? [id, ...all.filter(x => x !== id)] : all, { code, u }); return true; }
  if(!LF) return false;
  const L = lfById(LF.ids[LF.k]), card = L.cards[LF.i], st = LF.st[LF.i];
  if(a === "lfclose"){ const from = LF.from; LF = null; if(["book", "theory"].includes(from) && (from !== "theory" || TH)){ screen = from; render(); window.scrollTo(0, 0); } else goHome(); return true; }
  if(a === "lfnext"){ lfGo(1); return true; }
  if(a === "lfprev"){ lfGo(-1); return true; }
  if(a === "lfgo"){ const j = lfNextUnseen(); if(j >= 0){ LF.k = j; lfStart(); } return true; }
  if(a === "lfpractice"){ lfPractice(); return true; }
  if(!card) return true;
  if(card.try){ const tr = card.try, was = lfAtGoal(tr, st);
    if(a === "lfstep"){ const c = tr.ctl.find(x => x.k === b.dataset.k); if(!c) return true;
      st.v[c.k] = Math.max(c.min, Math.min(lfMax(c, st.v), st.v[c.k] + (+b.dataset.d) * (c.step || 1)));
      tr.ctl.forEach(x => { st.v[x.k] = Math.min(st.v[x.k], lfMax(x, st.v)); }); }
    else if(a === "lftap" || a === "lfcell"){ const i = +b.dataset.i; st.sel = st.sel.includes(i) ? st.sel.filter(x => x !== i) : [...st.sel, i]; }
    else if(a === "lfshow"){ const sol = lfSolve(tr); if(sol){ if(sol.v) st.v = sol.v; else st.sel = sol.sel; } st.shown = true; }
    else return true;
    st.n++; const at = lfAtGoal(tr, st); if(at) st.done = true;
    render(); if(at && !was){ buzz(true); sfx("ok", 1); burst(document.querySelector(".lf-ok")); } else if(a !== "lfshow") sfx("tap");
    return true; }
  if(card.q && a === "lfans" && !st.done){ const i = +b.dataset.i, ok = i === 0; buzz(ok);
    if(ok){ st.done = true; if(!st.wrong.length) LF.right++; }
    else { st.wrong.push(i); if(st.wrong.length >= Math.min(2, card.q[1].length - 1)){ st.done = true; st.gaveUp = true; } }
    render(); sfx(ok ? "ok" : "bad", ok ? LF.right : 0); if(ok) burst(document.querySelector(".gd-q .opt.right")); return true; }
  return true;
}
// «Lær: …»-knappene under en enhet (forsiden og teorien)
function lfChipsHTML(code, u){
  const list = lfFor(code, u); if(!list.length) return "";
  return `<div class="ulf">${list.map(L => `<button class="ulf-b ${lfSeen(L.id) ? "seen" : ""}" data-a="lfopen" data-c="${code}" data-u="${u}" data-id="${L.id}">${I.steps}<span>${esc(T("Lær: ", "Learn: ") + lfTitle(L))}</span>${lfSeen(L.id) ? `<i aria-label="${esc(T("ferdig", "done"))}">✓</i>` : ""}</button>`).join("")}</div>`;
}
// Leksjonene i en enhet som ikke er sett ennå (kommer automatisk før første oppgave)
const lfUnseen = (code, u) => lfFor(code, u).filter(L => !lfSeen(L.id)).map(L => L.id);
// piltaster som i steg for steg
if(typeof document !== "undefined") document.addEventListener("keydown", e => { if(screen !== "lf" || !LF || overlay || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if(e.key === "ArrowRight") lfGo(1); else if(e.key === "ArrowLeft") lfGo(-1); });
