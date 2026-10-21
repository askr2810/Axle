// Teoribok – emnesider for Kjemi 1 og Kjemi 2 (VGKJ1, VGKJ2), LK20, med regnesjekk (chk) fra start (AX-18).
// Atommassene og standardpotensialene er de som allerede står i teorien. Test: node tools/test_topics.js top_vgkj.js
(() => {
const R = String.raw;
const O = (t, intro, f, legend, ex, tip) => ({ t, intro, f, legend, ex, tip });

// ---------- VGKJ1 0: Atomer og periodesystemet ----------
TOPICS("VGKJ1", 0, [
{ id: "isotoper", chk: ["14-6 ≈ 8"],
  nb: O("Isotoper",
    R`Atomnummeret er antall protoner, og det bestemmer hvilket grunnstoff atomet er. Massetallet er protoner pluss nøytroner. Isotoper av samme grunnstoff har like mange protoner, men ulikt antall nøytroner, og derfor ulik masse. I et nøytralt atom er det like mange elektroner som protoner. Nøytronene påvirker massen og kjernestabiliteten, men ikke hvilken kjemi atomet har. Karbon-12 og karbon-14 er derfor begge karbon.`,
    [[R`A = Z + N`, "massetall"]],
    [["A", "massetall", ""], ["Z", "atomnummer, antall protoner", ""], ["N", "antall nøytroner", ""]],
    R`Karbon-14 har atomnummer 6.
Nøytroner: $14 - 6 = 8$. Et nøytralt atom har også 6 elektroner.`,
    R`Massetallet står oppe til venstre, atomnummeret nede. Det er nøytronene som er differansen.`),
  en: O("Isotopes",
    R`The atomic number is the number of protons, and it decides which element the atom is. The mass number is protons plus neutrons. Isotopes of the same element have the same number of protons but different numbers of neutrons, and therefore different masses. In a neutral atom there are as many electrons as protons. The neutrons affect the mass and the stability of the nucleus, but not the chemistry. Carbon-12 and carbon-14 are therefore both carbon.`,
    [[R`A = Z + N`, "mass number"]],
    [["A", "mass number", ""], ["Z", "atomic number, number of protons", ""], ["N", "number of neutrons", ""]],
    R`Carbon-14 has atomic number 6.
Neutrons: $14 - 6 = 8$. A neutral atom also has 6 electrons.`,
    R`The mass number is written at the upper left, the atomic number at the lower left. The neutrons are the difference.`) },
{ id: "elektronskall", chk: ["2+8+1 ≈ 11"],
  nb: O("Elektronskall",
    R`Elektronene ligger i skall rundt kjernen. I den enkle modellen som brukes her, tar det innerste skallet 2 elektroner og de to neste 8 hver. Skallet som fylles, følger perioden i periodesystemet. Elektronene i det ytterste skallet kalles valenselektroner, og det er de som deltar i bindinger. Natrium står i periode 3 og gruppe 1, så det har tre skall og ett valenselektron. Et fullt ytterskall er særlig stabilt.`,
    [[R`2,\ 8,\ 8,\ \ldots`, "plass i de første skallene"]],
    [["periode", "antall skall i bruk", ""], ["gruppe 1 og 2", "like mange valenselektroner som gruppenummeret", ""]],
    R`Nøytralt natrium har 11 elektroner.
Fordelingen er $2 + 8 + 1 = 11$, med ett valenselektron.`,
    R`Når natrium reagerer, er det det ene ytterelektronet som gis bort.`),
  en: O("Electron shells",
    R`The electrons lie in shells around the nucleus. In the simple model used here, the innermost shell takes 2 electrons and the next two take 8 each. The shell being filled follows the period in the periodic table. The electrons in the outermost shell are called valence electrons, and they are the ones that take part in bonds. Sodium is in period 3 and group 1, so it has three shells and one valence electron. A full outer shell is particularly stable.`,
    [[R`2,\ 8,\ 8,\ \ldots`, "room in the first shells"]],
    [["period", "number of shells in use", ""], ["groups 1 and 2", "as many valence electrons as the group number", ""]],
    R`Neutral sodium has 11 electrons.
The arrangement is $2 + 8 + 1 = 11$, with one valence electron.`,
    R`When sodium reacts, it is the single outer electron that is given away.`) },
{ id: "edelgass", chk: ["2+8+8 ≈ 18"],
  nb: O("Edelgasser",
    R`Edelgassene står i gruppe 18. De har fullt ytterste skall og reagerer nesten ikke, fordi det koster mye energi å bryte opp et slikt skall. Argon har atomnummer 18. I skallmodellen fylles det som 2, 8 og 8, og det ytterste skallet er fullt med 8 elektroner. Andre atomer reagerer ofte slik at de får like mange elektroner som nærmeste edelgass. Det er grunnen til at natrium gir bort ett elektron og klor tar opp ett.`,
    [[R`2 + 8 + 8 = 18`, "elektroner i argon"]],
    [["Ar", "argon, atomnummer 18", ""], ["gruppe 18", "edelgasser", ""]],
    R`Argon har 18 elektroner i et nøytralt atom.
$2 + 8 + 8 = 18$, og ytterskallet har 8.`,
    R`Helium er også en edelgass, men det har bare det innerste skallet, med 2 elektroner.`),
  en: O("Noble gases",
    R`The noble gases stand in group 18. They have a full outer shell and hardly react, because it costs a lot of energy to break up such a shell. Argon has atomic number 18. In the shell model it is filled as 2, 8 and 8, and the outer shell is full with 8 electrons. Other atoms often react so that they get as many electrons as the nearest noble gas. That is why sodium gives away one electron and chlorine takes up one.`,
    [[R`2 + 8 + 8 = 18`, "electrons in argon"]],
    [["Ar", "argon, atomic number 18", ""], ["group 18", "noble gases", ""]],
    R`Argon has 18 electrons in a neutral atom.
$2 + 8 + 8 = 18$, and the outer shell has 8.`,
    R`Helium is a noble gas too, but it has only the innermost shell, with 2 electrons.`) }
]);

// ---------- VGKJ1 1: Kjemiske bindinger ----------
TOPICS("VGKJ1", 1, [
{ id: "ionebinding", chk: ["11-1 ≈ 10", "17+1 ≈ 18"],
  nb: O("Ionebinding",
    R`En ionebinding dannes når et metall gir elektroner til et ikke-metall. Metallet blir et positivt ion, ikke-metallet et negativt, og motsatte ladninger holder krystallen sammen. Natrium i gruppe 1 gir bort sitt ene valenselektron og får samme elektronantall som neon. Klor i gruppe 17 tar opp ett elektron og får samme antall som argon. Begge ionene har da fullt ytterskall. Koksalt, NaCl, er bygget av like mange Na+ og Cl−.`,
    [[R`\mathrm{Na} \rightarrow \mathrm{Na}^+ + e^-`, "natrium gir fra seg ett elektron"], [R`\mathrm{Cl} + e^- \rightarrow \mathrm{Cl}^-`, "klor tar opp ett elektron"]],
    [["Na", "atomnummer 11", ""], ["Cl", "atomnummer 17", ""]],
    R`Natrium har 11 elektroner og sitter igjen med $11 - 1 = 10$ som Na+.
Klor har 17 og får $17 + 1 = 18$ som Cl−.`,
    R`Ioneforbindelser leder strøm når de er smeltet eller løst, fordi ionene da kan flytte seg.`),
  en: O("Ionic bonding",
    R`An ionic bond forms when a metal gives electrons to a non-metal. The metal becomes a positive ion, the non-metal a negative one, and opposite charges hold the crystal together. Sodium in group 1 gives away its one valence electron and gets the same electron count as neon. Chlorine in group 17 takes up one electron and gets the same count as argon. Both ions then have a full outer shell. Table salt, NaCl, is built from equal numbers of Na+ and Cl-.`,
    [[R`\mathrm{Na} \rightarrow \mathrm{Na}^+ + e^-`, "sodium gives away one electron"], [R`\mathrm{Cl} + e^- \rightarrow \mathrm{Cl}^-`, "chlorine takes up one electron"]],
    [["Na", "atomic number 11", ""], ["Cl", "atomic number 17", ""]],
    R`Sodium has 11 electrons and is left with $11 - 1 = 10$ as Na+.
Chlorine has 17 and gets $17 + 1 = 18$ as Cl-.`,
    R`Ionic compounds conduct current when melted or dissolved, because the ions can then move.`) },
{ id: "kovalent", chk: ["4*2 ≈ 8"],
  nb: O("Kovalent binding",
    R`Ikke-metaller binder seg ofte ved å dele elektronpar. Hvert delt par er én kovalent binding, og begge atomene teller de delte elektronene med i ytterskallet sitt. Karbon har fire valenselektroner og mangler fire for å få åtte. I metan deler karbon ett par med hvert av fire hydrogenatomer. Da har karbon åtte elektroner rundt seg, og hvert hydrogen har to, som helium. Molekylet er nøytralt, og bindingene sitter inne i molekylet.`,
    [[R`\mathrm{CH}_4`, "metan, fire kovalente bindinger"]],
    [["C", "fire valenselektroner", ""], ["H", "ett valenselektron", ""]],
    R`Karbon lager fire bindinger i metan.
Hver binding er to elektroner, så karbon har $4 \cdot 2 = 8$ elektroner i ytterskallet.`,
    R`Enkeltbinding er ett par, dobbeltbinding to par og trippelbinding tre par.`),
  en: O("Covalent bonding",
    R`Non-metals often bond by sharing electron pairs. Each shared pair is one covalent bond, and both atoms count the shared electrons in their outer shell. Carbon has four valence electrons and needs four more to get eight. In methane, carbon shares one pair with each of four hydrogen atoms. Carbon then has eight electrons around it, and each hydrogen has two, like helium. The molecule is neutral, and the bonds sit inside the molecule.`,
    [[R`\mathrm{CH}_4`, "methane, four covalent bonds"]],
    [["C", "four valence electrons", ""], ["H", "one valence electron", ""]],
    R`Carbon makes four bonds in methane.
Each bond is two electrons, so carbon has $4 \cdot 2 = 8$ electrons in its outer shell.`,
    R`A single bond is one pair, a double bond two pairs and a triple bond three pairs.`) },
{ id: "formelenhet", chk: ["2+2*(-1) ≈ 0", "22.99+35.45 ≈ 58.44"],
  nb: O("Formelenhet og ioneladning",
    R`Formelen for en ioneforbindelse velges slik at den samlede ladningen er null. Et ion med ladning +2 må balanseres av to ioner med ladning −1, eller av ett ion med ladning −2. Magnesium står i gruppe 2 og danner Mg2+. Klorid har ladning −1, så formelen blir MgCl2. Molar masse for en formelenhet finner du ved å legge sammen atommassene. For NaCl brukes massene 22,99 for natrium og 35,45 for klor.`,
    [[R`\mathrm{Mg}^{2+} + 2\,\mathrm{Cl}^- \rightarrow \mathrm{MgCl}_2`, "ladningene kansellerer"], [R`M(\mathrm{NaCl}) = M(\mathrm{Na}) + M(\mathrm{Cl})`, "molar masse"]],
    [["Mg", "ladning +2 i gruppen", ""], ["Na", "22,99", "g/mol"], ["Cl", "35,45", "g/mol"]],
    R`Ladningen i MgCl2: $2 + 2 \cdot (-1) = 0$.
NaCl: $22{,}99 + 35{,}45 = 58{,}44$ g/mol.`,
    R`Skriv det positive ionet først. Kryss gjerne ladningene over for å finne antall av hvert ion.`),
  en: O("Formula unit and ion charge",
    R`The formula of an ionic compound is chosen so that the total charge is zero. An ion of charge +2 must be balanced by two ions of charge -1, or by one ion of charge -2. Magnesium is in group 2 and forms Mg2+. Chloride has charge -1, so the formula is MgCl2. You find the molar mass of a formula unit by adding the atomic masses. For NaCl the masses 22.99 for sodium and 35.45 for chlorine are used.`,
    [[R`\mathrm{Mg}^{2+} + 2\,\mathrm{Cl}^- \rightarrow \mathrm{MgCl}_2`, "the charges cancel"], [R`M(\mathrm{NaCl}) = M(\mathrm{Na}) + M(\mathrm{Cl})`, "molar mass"]],
    [["Mg", "charge +2 in the group", ""], ["Na", "22.99", "g/mol"], ["Cl", "35.45", "g/mol"]],
    R`The charge in MgCl2: $2 + 2 \cdot (-1) = 0$.
NaCl: $22{,}99 + 35{,}45 = 58{,}44$ g/mol.`,
    R`Write the positive ion first. Cross the charges over if you need the count of each ion.`) }
]);

// ---------- VGKJ1 2: Stoffmengde og konsentrasjon ----------
TOPICS("VGKJ1", 2, [
{ id: "molar-masse", chk: ["2*1.008+16 ≈ 18.02", "12.01+2*16 ≈ 44.01"],
  nb: O("Molar masse",
    R`Ett mol er 6,02·10²³ partikler. Molar masse er massen av ett mol, i gram per mol, og den er tallmessig lik summen av atommassene i formelen. Atommassene som brukes her, er H 1,008, C 12,01 og O 16,00. Du slår dem sammen med riktig antall av hvert atom. For vann er det to hydrogen og ett oksygen. For karbondioksid er det ett karbon og to oksygen. Avrundingen til to desimaler er den som brukes i oppgavene.`,
    [[R`M = \sum n_i M_i`, "molar masse fra atommasser"]],
    [["M", "molar masse", "g/mol"], ["n_i", "antall av atomet i formelen", ""]],
    R`Vann: $2 \cdot 1{,}008 + 16{,}00 \approx 18{,}02$ g/mol.
Karbondioksid: $12{,}01 + 2 \cdot 16{,}00 = 44{,}01$ g/mol.`,
    R`Tell atomene i formelen før du ganger. I Ca(OH)2 er det to oksygen og to hydrogen.`),
  en: O("Molar mass",
    R`One mole is 6.02·10²³ particles. The molar mass is the mass of one mole, in grams per mole, and numerically it equals the sum of the atomic masses in the formula. The atomic masses used here are H 1.008, C 12.01 and O 16.00. Add them with the right count of each atom. For water that is two hydrogens and one oxygen. For carbon dioxide it is one carbon and two oxygens. Rounding to two decimals is what the problems use.`,
    [[R`M = \sum n_i M_i`, "molar mass from atomic masses"]],
    [["M", "molar mass", "g/mol"], ["n_i", "count of that atom in the formula", ""]],
    R`Water: $2 \cdot 1{,}008 + 16{,}00 \approx 18{,}02$ g/mol.
Carbon dioxide: $12{,}01 + 2 \cdot 16{,}00 = 44{,}01$ g/mol.`,
    R`Count the atoms in the formula before you multiply. In Ca(OH)2 there are two oxygens and two hydrogens.`) },
{ id: "stoffmengde", chk: ["36.04/18.02 ≈ 2", "2/0.5 ≈ 4"],
  nb: O("Stoffmengde og konsentrasjon",
    R`Stoffmengde er antall mol, og den er masse delt på molar masse. Konsentrasjon er stoffmengde delt på volumet av løsningen, ikke av løsemiddelet alene. Volumet må stå i liter når konsentrasjonen skal bli mol per liter. En løsning kan lages ved å veie stoffet, løse det og fylle opp til merket på kolben. Da er volumet det du fylte opp til, ikke vannet du helte i først.`,
    [[R`n = \frac{m}{M}`, "stoffmengde"], [R`c = \frac{n}{V}`, "konsentrasjon"]],
    [["n", "stoffmengde", "mol"], ["m", "masse", "g"], ["M", "molar masse", "g/mol"], ["V", "volum av løsningen", "L"], ["c", "konsentrasjon", "mol/L"]],
    R`36,04 g vann har molar masse 18,02 g/mol, så $n = 36{,}04/18{,}02 = 2$ mol.
Løst til 0,50 L: $c = 2/0{,}50 = 4$ mol/L.`,
    R`Milliliter må deles på 1000 før de settes inn som liter.`),
  en: O("Amount and concentration",
    R`Amount of substance is the number of moles, and it is mass divided by molar mass. Concentration is amount divided by the volume of the solution, not of the solvent alone. The volume must be in litres when the concentration is to be moles per litre. A solution can be made by weighing the substance, dissolving it and filling up to the mark on the flask. The volume is then what you filled up to, not the water you poured in first.`,
    [[R`n = \frac{m}{M}`, "amount of substance"], [R`c = \frac{n}{V}`, "concentration"]],
    [["n", "amount of substance", "mol"], ["m", "mass", "g"], ["M", "molar mass", "g/mol"], ["V", "volume of the solution", "L"], ["c", "concentration", "mol/L"]],
    R`36.04 g of water has molar mass 18.02 g/mol, so $n = 36{,}04/18{,}02 = 2$ mol.
Made up to 0.50 L: $c = 2/0{,}50 = 4$ mol/L.`,
    R`Millilitres must be divided by 1000 before they are entered as litres.`) },
{ id: "fortynning", chk: ["0.5*20/100 ≈ 0.1"],
  nb: O("Fortynning",
    R`Når du tynner ut en løsning med vann, er stoffmengden den samme før og etter. Konsentrasjonen ganger volumet er derfor konstant. Volumene må ha samme enhet på begge sider, for eksempel milliliter begge steder. Du trenger ikke gjøre om til liter så lenge enheten er felles. Fortynning senker konsentrasjonen, og den kan aldri bli høyere enn den du startet med. Husk å blande godt etterpå.`,
    [[R`c_1 V_1 = c_2 V_2`, "fortynning"]],
    [["c_1", "konsentrasjon før", "mol/L"], ["V_1", "volum du tar ut", "mL eller L"], ["c_2", "konsentrasjon etter", "mol/L"], ["V_2", "sluttvolum", "samme enhet"]],
    R`20 mL av en løsning på 0,50 mol/L tynnes ut til 100 mL.
$c_2 = 0{,}50 \cdot 20 / 100 = 0{,}10$ mol/L.`,
    R`V2 er det totale volumet etterpå, ikke volumet av vannet du tilsatte.`),
  en: O("Dilution",
    R`When you dilute a solution with water, the amount of substance is the same before and after. Concentration times volume is therefore constant. The volumes must have the same unit on both sides, for example millilitres in both places. You do not need to convert to litres as long as the unit is shared. Dilution lowers the concentration, and it can never become higher than the one you started with. Remember to mix well afterwards.`,
    [[R`c_1 V_1 = c_2 V_2`, "dilution"]],
    [["c_1", "concentration before", "mol/L"], ["V_1", "volume you take", "mL or L"], ["c_2", "concentration after", "mol/L"], ["V_2", "final volume", "same unit"]],
    R`20 mL of a 0.50 mol/L solution is diluted to 100 mL.
$c_2 = 0{,}50 \cdot 20 / 100 = 0{,}10$ mol/L.`,
    R`V2 is the total volume afterwards, not the volume of water you added.`) }
]);

// ---------- VGKJ1 3: Syrer, baser og pH ----------
TOPICS("VGKJ1", 3, [
{ id: "ph-sterk-syre", chk: ["-log10(0.01) ≈ 2"],
  nb: O("pH i en sterk syre",
    R`pH er den negative titallslogaritmen av konsentrasjonen av oksoniumioner. En sterk syre, som saltsyre, er fullstendig protolysert, så konsentrasjonen av oksonium er lik syrekonsentrasjonen. Ved 25 grader er rent vann nøytralt med pH 7. Under 7 er løsningen sur, over 7 basisk. Logaritmen gjør at en liten endring i pH svarer til en stor endring i konsentrasjon. Én enhet ned er ti ganger så mange oksoniumioner.`,
    [[R`\mathrm{pH} = -\lg[\mathrm{H}_3\mathrm{O}^+]`, "pH"], [R`[\mathrm{H}_3\mathrm{O}^+] = c`, "sterk ensyret syre"]],
    [["c", "syrekonsentrasjon", "mol/L"], ["\\lg", "titallslogaritme", ""]],
    R`Saltsyre med konsentrasjon 0,01 mol/L er en sterk syre.
$\mathrm{pH} = -\lg 0{,}01 = 2$.`,
    R`For en sterk base er det hydroksidkonsentrasjonen du kjenner. pH finner du via at produktet av de to ionene er 10⁻¹⁴ ved 25 °C.`),
  en: O("pH of a strong acid",
    R`pH is the negative base-10 logarithm of the concentration of oxonium ions. A strong acid, such as hydrochloric acid, is fully protolysed, so the oxonium concentration equals the acid concentration. At 25 degrees pure water is neutral with pH 7. Below 7 the solution is acidic, above 7 basic. The logarithm means that a small change in pH corresponds to a large change in concentration. One unit down is ten times as many oxonium ions.`,
    [[R`\mathrm{pH} = -\lg[\mathrm{H}_3\mathrm{O}^+]`, "pH"], [R`[\mathrm{H}_3\mathrm{O}^+] = c`, "strong monoprotic acid"]],
    [["c", "acid concentration", "mol/L"], ["\\lg", "base-10 logarithm", ""]],
    R`Hydrochloric acid of concentration 0.01 mol/L is a strong acid.
$\mathrm{pH} = -\lg 0{,}01 = 2$.`,
    R`For a strong base it is the hydroxide concentration you know. You find pH using that the product of the two ions is 10⁻¹⁴ at 25 °C.`) },
{ id: "ph-konsentrasjon", chk: ["10^(-3) ≈ 0.001", "10^2 ≈ 100"],
  nb: O("Fra pH til konsentrasjon",
    R`Kjenner du pH, får du oksoniumkonsentrasjonen ved å ta ti opphøyd i minus pH. Fordi skalaen er logaritmisk, betyr to pH-enheter en faktor på hundre, ikke en faktor på to. pH 3 er derfor hundre ganger så høy oksoniumkonsentrasjon som pH 5. Det er lett å undervurdere forskjellen hvis du bare ser på tallene 3 og 5. Samme regel gjelder oppover: pH 9 er ti ganger så basisk som pH 8, målt i hydroksid.`,
    [[R`[\mathrm{H}_3\mathrm{O}^+] = 10^{-\mathrm{pH}}`, "oksonium fra pH"]],
    [["\\mathrm{pH}", "oppgitt surhet", ""], ["[\\mathrm{H}_3\\mathrm{O}^+]", "oksoniumkonsentrasjon", "mol/L"]],
    R`pH 3 gir $[\mathrm{H}_3\mathrm{O}^+] = 10^{-3} = 0{,}001$ mol/L.
Fra pH 5 til pH 3 er faktoren $10^{2} = 100$.`,
    R`Skriv konsentrasjonen med enhet mol/L. 0,001 mol/L er det samme som 10⁻³ mol/L.`),
  en: O("From pH to concentration",
    R`If you know the pH, you get the oxonium concentration by taking ten to the power of minus pH. Because the scale is logarithmic, two pH units mean a factor of one hundred, not a factor of two. pH 3 is therefore a hundred times the oxonium concentration of pH 5. It is easy to underestimate the difference if you only look at the numbers 3 and 5. The same rule applies upwards: pH 9 is ten times as basic as pH 8, measured in hydroxide.`,
    [[R`[\mathrm{H}_3\mathrm{O}^+] = 10^{-\mathrm{pH}}`, "oxonium from pH"]],
    [["\\mathrm{pH}", "the stated acidity", ""], ["[\\mathrm{H}_3\\mathrm{O}^+]", "oxonium concentration", "mol/L"]],
    R`pH 3 gives $[\mathrm{H}_3\mathrm{O}^+] = 10^{-3} = 0{,}001$ mol/L.
From pH 5 to pH 3 the factor is $10^{2} = 100$.`,
    R`Write the concentration with the unit mol/L. 0.001 mol/L is the same as 10⁻³ mol/L.`) },
{ id: "noytralisering", chk: ["0.2*25/0.1 ≈ 50"],
  nb: O("Nøytralisering",
    R`En sterk syre og en sterk base nøytraliserer hverandre mol for mol når begge er ensyret og enverdige, slik saltsyre og natriumhydroksid er. Ved ekvivalenspunktet er stoffmengden base lik stoffmengden syre. Stoffmengden er konsentrasjon ganger volum. Volumene må ha samme enhet. Produktet er vann og et salt. For saltsyre og natriumhydroksid er saltet natriumklorid. Indikatoren skifter farge når du er ved ekvivalenspunktet.`,
    [[R`c_s V_s = c_b V_b`, "ekvivalens for en 1:1-reaksjon"]],
    [["c_s", "syrekonsentrasjon", "mol/L"], ["V_s", "syrevolum", "mL"], ["c_b", "basekonsentrasjon", "mol/L"], ["V_b", "basevolum", "mL"]],
    R`25 mL saltsyre med 0,20 mol/L nøytraliseres med 0,10 mol/L NaOH.
$V_b = 0{,}20 \cdot 25 / 0{,}10 = 50$ mL.`,
    R`Er syren toprotisk, trengs dobbelt så mye enverdig base. Sjekk reaksjonslikningen.`),
  en: O("Neutralisation",
    R`A strong acid and a strong base neutralise each other mole for mole when both are monoprotic and monobasic, as hydrochloric acid and sodium hydroxide are. At the equivalence point the amount of base equals the amount of acid. The amount is concentration times volume. The volumes must have the same unit. The products are water and a salt. For hydrochloric acid and sodium hydroxide the salt is sodium chloride. The indicator changes colour when you are at the equivalence point.`,
    [[R`c_s V_s = c_b V_b`, "equivalence for a 1:1 reaction"]],
    [["c_s", "acid concentration", "mol/L"], ["V_s", "acid volume", "mL"], ["c_b", "base concentration", "mol/L"], ["V_b", "base volume", "mL"]],
    R`25 mL of hydrochloric acid at 0.20 mol/L is neutralised with 0.10 mol/L NaOH.
$V_b = 0{,}20 \cdot 25 / 0{,}10 = 50$ mL.`,
    R`If the acid is diprotic, twice as much monobasic base is needed. Check the reaction equation.`) }
]);

// ---------- VGKJ1 4: Redoksreaksjoner ----------
TOPICS("VGKJ1", 4, [
{ id: "svovel-oksidasjon", chk: ["4*2-2 ≈ 6"],
  nb: O("Oksidasjonstall for svovel",
    R`Oksidasjonstallet er en bokføring av elektroner. I en nøytral forbindelse er summen null. Grunnstoffer i ren form har null, hydrogen har vanligvis +1, og oksygen har vanligvis −2. Du setter opp en likning for det ukjente tallet og løser den. Når tallet øker, er stoffet oksidert. Når det synker, er stoffet redusert. I svovelsyre er svovel sterkt oksidert, og syren kan virke som oksidasjonsmiddel.`,
    [[R`2\cdot(+1) + S + 4\cdot(-2) = 0`, "summen i H2SO4"]],
    [["H", "vanligvis +1", ""], ["O", "vanligvis −2", ""], ["S", "det ukjente", ""]],
    R`I H2SO4: $2 + S + 4 \cdot (-2) = 0$, altså $2 + S - 8 = 0$.
$S = 8 - 2 = 6$, så oksidasjonstallet er +6.`,
    R`Unntak: oksygen er −1 i peroksider, og hydrogen er −1 i hydrider av metaller.`),
  en: O("Oxidation number of sulfur",
    R`The oxidation number is a bookkeeping of electrons. In a neutral compound the sum is zero. Elements in pure form have zero, hydrogen is usually +1, and oxygen is usually -2. You set up an equation for the unknown number and solve it. When the number increases, the substance is oxidised. When it decreases, the substance is reduced. In sulfuric acid sulfur is strongly oxidised, and the acid can act as an oxidising agent.`,
    [[R`2\cdot(+1) + S + 4\cdot(-2) = 0`, "the sum in H2SO4"]],
    [["H", "usually +1", ""], ["O", "usually -2", ""], ["S", "the unknown", ""]],
    R`In H2SO4: $2 + S + 4 \cdot (-2) = 0$, that is $2 + S - 8 = 0$.
$S = 8 - 2 = 6$, so the oxidation number is +6.`,
    R`Exceptions: oxygen is -1 in peroxides, and hydrogen is -1 in metal hydrides.`) },
{ id: "permanganat", chk: ["8-1 ≈ 7"],
  nb: O("Mangan i permanganat",
    R`Samme regler gjelder i ioner, men da er summen av oksidasjonstallene lik ioneladningen, ikke null. Kaliumpermanganat er nøytralt. Kalium er et alkalimetall og har +1, og de fire oksygenatomene bidrar med −2 hver. Mangan må da gjøre opp resten. Det høye tallet forklarer hvorfor permanganat er et kraftig oksidasjonsmiddel: mangan kan ta opp elektroner og selv bli redusert. I sur løsning ender mangan ofte som Mn2+.`,
    [[R`(+1) + \mathrm{Mn} + 4\cdot(-2) = 0`, "summen i KMnO4"]],
    [["K", "+1", ""], ["O", "−2", ""], ["Mn", "det ukjente", ""]],
    R`I KMnO4: $1 + \mathrm{Mn} - 8 = 0$.
$\mathrm{Mn} = 8 - 1 = 7$, så oksidasjonstallet er +7.`,
    R`Den lilla fargen forsvinner når permanganat reduseres i sur løsning. Det brukes som tegn i titrering.`),
  en: O("Manganese in permanganate",
    R`The same rules apply in ions, but then the sum of the oxidation numbers equals the ion charge, not zero. Potassium permanganate is neutral. Potassium is an alkali metal and has +1, and the four oxygen atoms contribute -2 each. Manganese must then make up the rest. The high number explains why permanganate is a strong oxidising agent: manganese can take up electrons and itself be reduced. In acidic solution manganese often ends up as Mn2+.`,
    [[R`(+1) + \mathrm{Mn} + 4\cdot(-2) = 0`, "the sum in KMnO4"]],
    [["K", "+1", ""], ["O", "-2", ""], ["Mn", "the unknown", ""]],
    R`In KMnO4: $1 + \mathrm{Mn} - 8 = 0$.
$\mathrm{Mn} = 8 - 1 = 7$, so the oxidation number is +7.`,
    R`The purple colour disappears when permanganate is reduced in acidic solution. That is used as a sign in titration.`) },
{ id: "nitrat", chk: ["6-1 ≈ 5"],
  nb: O("Nitrogen i nitrat",
    R`Nitrationet har ladning −1, så oksidasjonstallene summeres til −1. Oksygen har −2, og det er tre av dem. Nitrogen får resten. Et høyt oksidasjonstall betyr at nitrogenet kan reduseres, og nitrat kan derfor virke som oksidasjonsmiddel, særlig i sur løsning. I ammoniakk er nitrogen derimot −3, fordi hydrogenene bidrar med +1 og molekylet er nøytralt. Samme grunnstoff kan altså ha vidt forskjellige tall i ulike forbindelser.`,
    [[R`N + 3\cdot(-2) = -1`, "summen i nitrationet"]],
    [["\\mathrm{NO}_3^-", "ioneladning −1", ""], ["O", "−2", ""]],
    R`I NO3−: $N + 3 \cdot (-2) = -1$, altså $N - 6 = -1$.
$N = 6 - 1 = 5$, så oksidasjonstallet er +5.`,
    R`Skriv ladningen på ionet med i regnestykket. Glemmer du den, får nitrogen feil tall.`),
  en: O("Nitrogen in nitrate",
    R`The nitrate ion has charge -1, so the oxidation numbers add up to -1. Oxygen is -2, and there are three of them. Nitrogen gets the rest. A high oxidation number means that the nitrogen can be reduced, and nitrate can therefore act as an oxidising agent, especially in acidic solution. In ammonia, nitrogen is instead -3, because the hydrogens contribute +1 and the molecule is neutral. The same element can thus have very different numbers in different compounds.`,
    [[R`N + 3\cdot(-2) = -1`, "the sum in the nitrate ion"]],
    [["\\mathrm{NO}_3^-", "ion charge -1", ""], ["O", "-2", ""]],
    R`In NO3-: $N + 3 \cdot (-2) = -1$, that is $N - 6 = -1$.
$N = 6 - 1 = 5$, so the oxidation number is +5.`,
    R`Include the charge of the ion in the calculation. If you forget it, nitrogen gets the wrong number.`) }
]);

// ---------- VGKJ2 0: Kjemisk likevekt ----------
TOPICS("VGKJ2", 0, [
{ id: "likevektskonstant", chk: ["0.8^2/(0.2*0.4) ≈ 8"],
  nb: O("Likevektskonstanten",
    R`Ved likevekt går reaksjonen like fort begge veier, og konsentrasjonene står stille. Likevektskonstanten K er et forhold mellom produkt og reaktant, hver opphøyd i koeffisienten fra den balanserte likningen. Rene stoffer i fast form og løsemiddelet vann tas ikke med. Stor K betyr at likevekten ligger mot produktene. K endres bare når temperaturen endres. En katalysator gjør at likevekten nås raskere, men den endrer ikke K.`,
    [[R`K = \frac{[\mathrm{HI}]^2}{[\mathrm{H}_2][\mathrm{I}_2]}`, "for H2 + I2 ⇌ 2 HI"]],
    [["K", "likevektskonstant", ""], ["[\,]", "konsentrasjon ved likevekt", "mol/L"]],
    R`Ved likevekt er [H2] = 0,20 mol/L, [I2] = 0,40 mol/L og [HI] = 0,80 mol/L.
$K = 0{,}80^2 / (0{,}20 \cdot 0{,}40) = 8$.`,
    R`Koeffisienten blir eksponent. Glemmer du kvadratet på HI, blir K feil.`),
  en: O("The equilibrium constant",
    R`At equilibrium the reaction goes equally fast both ways, and the concentrations stay put. The equilibrium constant K is a ratio of product to reactant, each raised to the coefficient from the balanced equation. Pure solids and the solvent water are left out. A large K means that the equilibrium lies towards the products. K changes only when the temperature changes. A catalyst makes the equilibrium arrive sooner, but it does not change K.`,
    [[R`K = \frac{[\mathrm{HI}]^2}{[\mathrm{H}_2][\mathrm{I}_2]}`, "for H2 + I2 in equilibrium with 2 HI"]],
    [["K", "equilibrium constant", ""], ["[\,]", "concentration at equilibrium", "mol/L"]],
    R`At equilibrium [H2] = 0.20 mol/L, [I2] = 0.40 mol/L and [HI] = 0.80 mol/L.
$K = 0{,}80^2 / (0{,}20 \cdot 0{,}40) = 8$.`,
    R`The coefficient becomes the exponent. If you forget the square on HI, K is wrong.`) },
{ id: "reaksjonskvotient", chk: ["0.4^2/(0.2*0.4) ≈ 2"],
  nb: O("Reaksjonskvotient",
    R`Reaksjonskvotienten Q regnes med samme brøk som K, men med konsentrasjonene akkurat nå, ikke nødvendigvis ved likevekt. Er Q mindre enn K, er det for lite produkt, og reaksjonen går mot høyre. Er Q større enn K, går den mot venstre. Er Q lik K, er systemet i likevekt. Dette er tallversjonen av Le Chateliers prinsipp: systemet motvirker en endring ved å forbruke det du la til. Temperaturen er det eneste som endrer selve K.`,
    [[R`Q = \frac{[\mathrm{HI}]^2}{[\mathrm{H}_2][\mathrm{I}_2]}`, "samme brøk som K, med nåverdiene"]],
    [["Q", "reaksjonskvotient", ""], ["K", "likevektskonstant", ""]],
    R`Nå er [H2] = 0,20, [I2] = 0,40 og [HI] = 0,40 mol/L, og K = 8 for reaksjonen.
$Q = 0{,}40^2 / (0{,}20 \cdot 0{,}40) = 2$. Siden 2 er mindre enn 8, går reaksjonen mot HI.`,
    R`Sammenlign alltid Q med K for den samme temperaturen.`),
  en: O("Reaction quotient",
    R`The reaction quotient Q is calculated with the same fraction as K, but with the concentrations right now, not necessarily at equilibrium. If Q is smaller than K, there is too little product, and the reaction goes to the right. If Q is larger than K, it goes to the left. If Q equals K, the system is at equilibrium. This is the numerical version of Le Chatelier's principle: the system counteracts a change by using up what you added. Temperature is the only thing that changes K itself.`,
    [[R`Q = \frac{[\mathrm{HI}]^2}{[\mathrm{H}_2][\mathrm{I}_2]}`, "the same fraction as K, with current values"]],
    [["Q", "reaction quotient", ""], ["K", "equilibrium constant", ""]],
    R`Now [H2] = 0.20, [I2] = 0.40 and [HI] = 0.40 mol/L, and K = 8 for the reaction.
$Q = 0{,}40^2 / (0{,}20 \cdot 0{,}40) = 2$. Since 2 is less than 8, the reaction goes towards HI.`,
    R`Always compare Q with K for the same temperature.`) },
{ id: "ukjent-likevekt", chk: ["sqrt(8*0.5*0.5) ≈ 1.414"],
  nb: O("Ukjent konsentrasjon",
    R`Kjenner du K og alle konsentrasjoner unntatt én, kan du løse likningen for den som mangler. For reaksjonen mellom hydrogen og jod er HI kvadrert, så du må ta kvadratrot til slutt. Husk at en konsentrasjon ikke kan være negativ, så det er den positive roten som gjelder. Enhetene er mol per liter når K er regnet fra konsentrasjoner. Sett svaret tilbake i brøken og se at du får samme K.`,
    [[R`[\mathrm{HI}] = \sqrt{K[\mathrm{H}_2][\mathrm{I}_2]}`, "når de andre er kjent"]],
    [["K", "likevektskonstant, her 8", ""], ["[\\mathrm{HI}]", "det ukjente", "mol/L"]],
    R`K = 8, [H2] = 0,50 mol/L og [I2] = 0,50 mol/L.
$[\mathrm{HI}] = \sqrt{8 \cdot 0{,}50 \cdot 0{,}50} \approx 1{,}414$ mol/L.`,
    R`Kontroll: 1,414 i andre, delt på 0,50 ganger 0,50, skal gi omtrent 8.`),
  en: O("An unknown concentration",
    R`If you know K and every concentration but one, you can solve the equation for the missing one. For the reaction between hydrogen and iodine, HI is squared, so you must take the square root at the end. Remember that a concentration cannot be negative, so it is the positive root that applies. The units are moles per litre when K is calculated from concentrations. Put the answer back into the fraction and check that you get the same K.`,
    [[R`[\mathrm{HI}] = \sqrt{K[\mathrm{H}_2][\mathrm{I}_2]}`, "when the others are known"]],
    [["K", "equilibrium constant, here 8", ""], ["[\\mathrm{HI}]", "the unknown", "mol/L"]],
    R`K = 8, [H2] = 0.50 mol/L and [I2] = 0.50 mol/L.
$[\mathrm{HI}] = \sqrt{8 \cdot 0{,}50 \cdot 0{,}50} \approx 1{,}414$ mol/L.`,
    R`Check: 1.414 squared, divided by 0.50 times 0.50, should give about 8.`) }
]);

// ---------- VGKJ2 1: Organisk kjemi ----------
TOPICS("VGKJ2", 1, [
{ id: "alkan", chk: ["2*4+2 ≈ 10"],
  nb: O("Alkaner",
    R`Alkaner er hydrokarboner med bare enkeltbindinger mellom karbonatomene. Hvert karbon danner fire bindinger i alt. I en rett kjede uten ringer blir den generelle formelen slik at hydrogenantallet er to ganger karbonantallet pluss to. Navnet følger antall karbon: metan ett, etan to, propan tre, butan fire. Alkaner brenner, men dobbeltbindingen som alkener har, mangler, så de tar ikke lett opp andre stoffer i en addisjon.`,
    [[R`\mathrm{C}_n\mathrm{H}_{2n+2}`, "rettkjedet alkan uten ring"]],
    [["n", "antall karbonatomer", ""]],
    R`Butan har 4 karbonatomer.
Hydrogen: $2 \cdot 4 + 2 = 10$, så formelen er C4H10.`,
    R`En ring eller en dobbeltbinding gir to hydrogen mindre enn den tilsvarende alkanen.`),
  en: O("Alkanes",
    R`Alkanes are hydrocarbons with only single bonds between the carbon atoms. Each carbon forms four bonds in all. In a straight chain without rings the general formula makes the number of hydrogens twice the number of carbons plus two. The name follows the carbon count: methane one, ethane two, propane three, butane four. Alkanes burn, but they lack the double bond that alkenes have, so they do not readily take up other substances in an addition.`,
    [[R`\mathrm{C}_n\mathrm{H}_{2n+2}`, "straight-chain alkane without a ring"]],
    [["n", "number of carbon atoms", ""]],
    R`Butane has 4 carbon atoms.
Hydrogen: $2 \cdot 4 + 2 = 10$, so the formula is C4H10.`,
    R`A ring or a double bond gives two hydrogens fewer than the corresponding alkane.`) },
{ id: "alken", chk: ["2*2 ≈ 4"],
  nb: O("Alkener",
    R`Alkener har minst én dobbeltbinding mellom karbonatomer. Dobbeltbindingen er reaktiv: den kan åpnes, og nye atomer kan legge seg til. Det kalles addisjon. En rettkjedet alken med én dobbeltbinding har to hydrogen færre enn alkanen med like mange karbon, så formelen er dobbelt så mange hydrogen som karbon. Eten er det minste. Det brukes til å lage plast. Navnet slutter på -en, mens alkaner slutter på -an og alkyner på -yn.`,
    [[R`\mathrm{C}_n\mathrm{H}_{2n}`, "rettkjedet alken med én dobbeltbinding"]],
    [["n", "antall karbonatomer", ""]],
    R`Eten har 2 karbonatomer og én dobbeltbinding.
Hydrogen: $2 \cdot 2 = 4$, så formelen er C2H4.`,
    R`Bromvann avfarges av alkener fordi brom adderes over dobbeltbindingen. Alkaner gjør ikke det.`),
  en: O("Alkenes",
    R`Alkenes have at least one double bond between carbon atoms. The double bond is reactive: it can open, and new atoms can be added. That is called addition. A straight-chain alkene with one double bond has two hydrogens fewer than the alkane with the same number of carbons, so the formula is twice as many hydrogens as carbons. Ethene is the smallest. It is used to make plastics. The name ends in -ene, while alkanes end in -ane and alkynes in -yne.`,
    [[R`\mathrm{C}_n\mathrm{H}_{2n}`, "straight-chain alkene with one double bond"]],
    [["n", "number of carbon atoms", ""]],
    R`Ethene has 2 carbon atoms and one double bond.
Hydrogen: $2 \cdot 2 = 4$, so the formula is C2H4.`,
    R`Bromine water is decolourised by alkenes because bromine adds across the double bond. Alkanes do not do that.`) },
{ id: "etanol", chk: ["2*12.01+6*1.008+16 ≈ 46.07"],
  nb: O("Etanol",
    R`Alkoholer har hydroksylgruppen OH på karbonkjeden. Etanol er alkoholen med to karbon, og formelen kan skrives C2H5OH eller C2H6O. Den funksjonelle gruppen gjør at etanol løser seg godt i vann, fordi OH kan danne hydrogenbindinger. Molar masse regnes fra atommassene C 12,01, H 1,008 og O 16,00, med alle atomene telt med. Endelsen -ol i navnet forteller at det er en alkohol. Metanol har ett karbon, propanol tre.`,
    [[R`M = 2M(\mathrm{C}) + 6M(\mathrm{H}) + M(\mathrm{O})`, "molar masse av C2H6O"]],
    [["C", "12,01", "g/mol"], ["H", "1,008", "g/mol"], ["O", "16,00", "g/mol"]],
    R`Etanol, C2H6O:
$M = 2 \cdot 12{,}01 + 6 \cdot 1{,}008 + 16{,}00 \approx 46{,}07$ g/mol.`,
    R`C2H6O kan også være en eter. Strukturen, ikke bare formelen, avgjør om det er etanol.`),
  en: O("Ethanol",
    R`Alcohols have the hydroxyl group OH on the carbon chain. Ethanol is the alcohol with two carbons, and the formula can be written C2H5OH or C2H6O. The functional group makes ethanol dissolve well in water, because OH can form hydrogen bonds. The molar mass is calculated from the atomic masses C 12.01, H 1.008 and O 16.00, with every atom counted. The ending -ol in the name tells you that it is an alcohol. Methanol has one carbon, propanol three.`,
    [[R`M = 2M(\mathrm{C}) + 6M(\mathrm{H}) + M(\mathrm{O})`, "molar mass of C2H6O"]],
    [["C", "12.01", "g/mol"], ["H", "1.008", "g/mol"], ["O", "16.00", "g/mol"]],
    R`Ethanol, C2H6O:
$M = 2 \cdot 12{,}01 + 6 \cdot 1{,}008 + 16{,}00 \approx 46{,}07$ g/mol.`,
    R`C2H6O can also be an ether. The structure, not the formula alone, decides whether it is ethanol.`) }
]);

// ---------- VGKJ2 2: Buffere og titrering ----------
TOPICS("VGKJ2", 2, [
{ id: "bufferlikning", chk: ["4.76+log10(0.2/0.1) ≈ 5.06"],
  nb: O("Bufferlikningen",
    R`En buffer er en svak syre og den korresponderende basen i samme løsning. pH ligger nær syrens pKa og endrer seg lite når du tilsetter litt sterk syre eller base. Bufferlikningen sier at pH er pKa pluss titallslogaritmen av base delt på syre. Er de to like store, er logaritmen null, og pH er lik pKa. Da tåler bufferen mest. Eddiksyre har pKa 4,76, den verdien oppgavene bruker. Enhetene i brøken kan være mol eller mol per liter, så lenge de er like.`,
    [[R`\mathrm{pH} = \mathrm{p}K_a + \lg\frac{[\mathrm{base}]}{[\mathrm{syre}]}`, "bufferlikningen"]],
    [["\\mathrm{p}K_a", "syrekonstanten på logform", ""], ["[\\mathrm{base}]", "korresponderende base", "mol/L"], ["[\\mathrm{syre}]", "svak syre", "mol/L"]],
    R`Eddiksyrebuffer med pKa 4,76, base 0,20 mol/L og syre 0,10 mol/L:
$\mathrm{pH} = 4{,}76 + \lg(0{,}20/0{,}10) \approx 5{,}06$.`,
    R`Er basen ti ganger syren, øker pH med 1 fra pKa. Er syren ti ganger basen, synker pH med 1.`),
  en: O("The buffer equation",
    R`A buffer is a weak acid and its conjugate base in the same solution. The pH lies near the pKa of the acid and changes little when you add a little strong acid or base. The buffer equation says that pH is pKa plus the base-10 logarithm of base divided by acid. If the two are equal, the logarithm is zero and the pH equals pKa. The buffer then resists the most. Acetic acid has pKa 4.76, the value the problems use. The units in the fraction can be moles or moles per litre, as long as they match.`,
    [[R`\mathrm{pH} = \mathrm{p}K_a + \lg\frac{[\mathrm{base}]}{[\mathrm{acid}]}`, "the buffer equation"]],
    [["\\mathrm{p}K_a", "the acid constant on log form", ""], ["[\\mathrm{base}]", "conjugate base", "mol/L"], ["[\\mathrm{acid}]", "weak acid", "mol/L"]],
    R`An acetic acid buffer with pKa 4.76, base 0.20 mol/L and acid 0.10 mol/L:
$\mathrm{pH} = 4{,}76 + \lg(0{,}20/0{,}10) \approx 5{,}06$.`,
    R`If the base is ten times the acid, pH rises by 1 from pKa. If the acid is ten times the base, pH falls by 1.`) },
{ id: "buffer-ti", chk: ["4.76+log10(10) ≈ 5.76", "4.76+log10(1) ≈ 4.76"],
  nb: O("Buffer når forholdet er ti",
    R`Logaritmen i bufferlikningen er null når base og syre er like, og den er 1 når basen er ti ganger så konsentrert som syren. pH flytter seg da nøyaktig én enhet fra pKa. Det er nyttig å kunne disse to særtilfellene uten kalkulator. Utenfor området fra en tidel til ti ganger er bufferen dårlig, fordi den ene parten nesten er brukt opp. En buffer med eddiksyre holder seg derfor i det sure området, rundt 4 til 6, ikke ved pH 7.`,
    [[R`\mathrm{pH} = \mathrm{p}K_a + \lg\frac{[\mathrm{base}]}{[\mathrm{syre}]}`, "bufferlikningen"]],
    [["\\lg 1", "0, like mengder", ""], ["\\lg 10", "1, ti ganger mer base", ""]],
    R`Eddiksyre, pKa 4,76. Like mengder: $\mathrm{pH} = 4{,}76 + \lg 1 = 4{,}76$.
Ti ganger mer base: $\mathrm{pH} = 4{,}76 + \lg 10 = 5{,}76$.`,
    R`Ti ganger mer syre gir pH = pKa − 1, altså 3,76 for eddiksyre.`),
  en: O("A buffer when the ratio is ten",
    R`The logarithm in the buffer equation is zero when base and acid are equal, and it is 1 when the base is ten times as concentrated as the acid. The pH then moves by exactly one unit from pKa. It is useful to know these two special cases without a calculator. Outside the range from one tenth to ten times, the buffer is poor, because one partner is almost used up. A buffer with acetic acid therefore stays in the acidic range, around 4 to 6, not at pH 7.`,
    [[R`\mathrm{pH} = \mathrm{p}K_a + \lg\frac{[\mathrm{base}]}{[\mathrm{acid}]}`, "the buffer equation"]],
    [["\\lg 1", "0, equal amounts", ""], ["\\lg 10", "1, ten times more base", ""]],
    R`Acetic acid, pKa 4.76. Equal amounts: $\mathrm{pH} = 4{,}76 + \lg 1 = 4{,}76$.
Ten times more base: $\mathrm{pH} = 4{,}76 + \lg 10 = 5{,}76$.`,
    R`Ten times more acid gives pH = pKa - 1, that is 3.76 for acetic acid.`) },
{ id: "titrering", chk: ["0.1*20/25 ≈ 0.08"],
  nb: O("Titrering",
    R`I en titrering tilsetter du en løsning med kjent konsentrasjon til du har reagert med hele den ukjente. For en sterk syre og en sterk base i forholdet 1:1 er stoffmengdene like ved ekvivalenspunktet. Du leser av volumet av titratoren og regner ut den ukjente konsentrasjonen. En indikator skal skifte farge nærmest mulig ekvivalenspunktet. Volumene kan stå i milliliter begge to. Husk hvilken av dem som er den ukjente.`,
    [[R`c_1 = \frac{c_2 V_2}{V_1}`, "ukjent konsentrasjon ved 1:1"]],
    [["c_1", "ukjent syrekonsentrasjon", "mol/L"], ["V_1", "volum av syren", "mL"], ["c_2", "konsentrasjon av NaOH", "mol/L"], ["V_2", "volum NaOH ved ekvivalens", "mL"]],
    R`25 mL saltsyre titreres med 0,10 mol/L NaOH. Ekvivalens etter 20 mL.
$c_1 = 0{,}10 \cdot 20 / 25 = 0{,}080$ mol/L.`,
    R`Skyll byretten med titratoren først, ellers blir den første porsjonen tynnere enn den skal.`),
  en: O("Titration",
    R`In a titration you add a solution of known concentration until you have reacted with all of the unknown. For a strong acid and a strong base in the ratio 1:1, the amounts are equal at the equivalence point. You read the volume of the titrant and calculate the unknown concentration. An indicator should change colour as close as possible to the equivalence point. The volumes can both be in millilitres. Remember which of them is the unknown.`,
    [[R`c_1 = \frac{c_2 V_2}{V_1}`, "unknown concentration at 1:1"]],
    [["c_1", "unknown acid concentration", "mol/L"], ["V_1", "volume of the acid", "mL"], ["c_2", "concentration of NaOH", "mol/L"], ["V_2", "volume of NaOH at equivalence", "mL"]],
    R`25 mL of hydrochloric acid is titrated with 0.10 mol/L NaOH. Equivalence after 20 mL.
$c_1 = 0{,}10 \cdot 20 / 25 = 0{,}080$ mol/L.`,
    R`Rinse the burette with the titrant first, otherwise the first portion is more dilute than it should be.`) }
]);

// ---------- VGKJ2 3: Elektrokjemi ----------
TOPICS("VGKJ2", 3, [
{ id: "cu-zn", chk: ["0.34-(-0.76) ≈ 1.10"],
  nb: O("Celle med kobber og sink",
    R`I en galvanisk celle skjer reduksjon ved katoden og oksidasjon ved anoden. Metallet med lavest standard reduksjonspotensial blir anoden, fordi det lettest gir fra seg elektroner. Cellespenningen er katodens potensial minus anodens. Tallene under er standardpotensialene fra teorien: kobber +0,34 V og sink −0,76 V. Siden sink har det laveste tallet, oksideres sink, og kobberionene reduseres. En positiv cellespenning betyr at reaksjonen er spontan under standardforhold.`,
    [[R`E^\circ = E^\circ_{\mathrm{katode}} - E^\circ_{\mathrm{anode}}`, "standard cellespenning"]],
    [["\\mathrm{Cu}^{2+}/\\mathrm{Cu}", "+0,34", "V"], ["\\mathrm{Zn}^{2+}/\\mathrm{Zn}", "−0,76", "V"]],
    R`Kobber er katode og sink er anode.
$E^\circ = 0{,}34 - (-0{,}76) = 1{,}10$ V.`,
    R`Elektronene går i ledningen fra anoden til katoden. Ionene i saltbroen holder løsningene nøytrale.`),
  en: O("A cell with copper and zinc",
    R`In a galvanic cell, reduction happens at the cathode and oxidation at the anode. The metal with the lowest standard reduction potential becomes the anode, because it most easily gives away electrons. The cell voltage is the cathode potential minus the anode potential. The numbers below are the standard potentials from the theory: copper +0.34 V and zinc -0.76 V. Since zinc has the lower number, zinc is oxidised and the copper ions are reduced. A positive cell voltage means the reaction is spontaneous under standard conditions.`,
    [[R`E^\circ = E^\circ_{\mathrm{cathode}} - E^\circ_{\mathrm{anode}}`, "standard cell voltage"]],
    [["\\mathrm{Cu}^{2+}/\\mathrm{Cu}", "+0.34", "V"], ["\\mathrm{Zn}^{2+}/\\mathrm{Zn}", "-0.76", "V"]],
    R`Copper is the cathode and zinc is the anode.
$E^\circ = 0{,}34 - (-0{,}76) = 1{,}10$ V.`,
    R`The electrons go in the wire from the anode to the cathode. The ions in the salt bridge keep the solutions neutral.`) },
{ id: "ag-cu", chk: ["0.80-0.34 ≈ 0.46"],
  nb: O("Celle med sølv og kobber",
    R`Sølv har høyere standardpotensial enn kobber, +0,80 V mot +0,34 V. Sølv blir derfor katode, og kobber blir anode, selv om kobber var katode da det sto mot sink. Hvilken elektrode som oksideres, avhenger av hvem den står mot, ikke av metallet alene. Differansen mellom potensialene er cellespenningen. Jo lenger fra hverandre metallene står i spenningsrekka, jo større blir spenningen. Sølvioner reduseres til sølv, og kobber løses opp som kobberioner.`,
    [[R`E^\circ = E^\circ(\mathrm{Ag}) - E^\circ(\mathrm{Cu})`, "sølv er katode"]],
    [["\\mathrm{Ag}^+/\\mathrm{Ag}", "+0,80", "V"], ["\\mathrm{Cu}^{2+}/\\mathrm{Cu}", "+0,34", "V"]],
    R`Sølv er katode og kobber er anode.
$E^\circ = 0{,}80 - 0{,}34 = 0{,}46$ V.`,
    R`Bytt ut sølv med et metall under kobber, så snur rollene, og kobber blir katode.`),
  en: O("A cell with silver and copper",
    R`Silver has a higher standard potential than copper, +0.80 V against +0.34 V. Silver therefore becomes the cathode, and copper becomes the anode, even though copper was the cathode when it was paired with zinc. Which electrode is oxidised depends on what it is paired with, not on the metal alone. The difference between the potentials is the cell voltage. The farther apart the metals stand in the electrochemical series, the larger the voltage. Silver ions are reduced to silver, and copper dissolves as copper ions.`,
    [[R`E^\circ = E^\circ(\mathrm{Ag}) - E^\circ(\mathrm{Cu})`, "silver is the cathode"]],
    [["\\mathrm{Ag}^+/\\mathrm{Ag}", "+0.80", "V"], ["\\mathrm{Cu}^{2+}/\\mathrm{Cu}", "+0.34", "V"]],
    R`Silver is the cathode and copper is the anode.
$E^\circ = 0{,}80 - 0{,}34 = 0{,}46$ V.`,
    R`Replace silver with a metal below copper, and the roles reverse, so copper becomes the cathode.`) },
{ id: "fe-zn", chk: ["(-0.44)-(-0.76) ≈ 0.32"],
  nb: O("Celle med jern og sink",
    R`Både jern og sink har negative standardpotensialer, −0,44 V og −0,76 V. Det minst negative, jern, blir likevel katode, og sink blir anode. Cellespenningen er fortsatt katode minus anode, og den er positiv. Dette er grunnen til at en sinkanode kan beskytte jern: sink oksideres heller enn jernet. Samme prinsipp brukes på skipsskrog. Regn med fortegnene. Minus minus et mer negativt tall gir en positiv spenning.`,
    [[R`E^\circ = E^\circ(\mathrm{Fe}) - E^\circ(\mathrm{Zn})`, "jern er katode"]],
    [["\\mathrm{Fe}^{2+}/\\mathrm{Fe}", "−0,44", "V"], ["\\mathrm{Zn}^{2+}/\\mathrm{Zn}", "−0,76", "V"]],
    R`Jern er katode og sink er anode.
$E^\circ = -0{,}44 - (-0{,}76) = 0{,}32$ V.`,
    R`Offeranoden må ha lavere potensial enn metallet den skal beskytte, og den brukes opp.`),
  en: O("A cell with iron and zinc",
    R`Both iron and zinc have negative standard potentials, -0.44 V and -0.76 V. The less negative one, iron, still becomes the cathode, and zinc becomes the anode. The cell voltage is still cathode minus anode, and it is positive. This is why a zinc anode can protect iron: zinc is oxidised rather than the iron. The same principle is used on ship hulls. Keep the signs. A minus minus a more negative number gives a positive voltage.`,
    [[R`E^\circ = E^\circ(\mathrm{Fe}) - E^\circ(\mathrm{Zn})`, "iron is the cathode"]],
    [["\\mathrm{Fe}^{2+}/\\mathrm{Fe}", "-0.44", "V"], ["\\mathrm{Zn}^{2+}/\\mathrm{Zn}", "-0.76", "V"]],
    R`Iron is the cathode and zinc is the anode.
$E^\circ = -0{,}44 - (-0{,}76) = 0{,}32$ V.`,
    R`The sacrificial anode must have a lower potential than the metal it is to protect, and it is used up.`) }
]);
})();
