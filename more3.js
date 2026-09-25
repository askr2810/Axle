// Runde 3: flere oppgaver i alle fag
// ---------- MAPE1300 Mekanikk ----------
MORE("MAPE1300",0,
 ["Hva er et kraftpar?",["To like store, motsatt rettede krefter som ikke ligger på samme linje, og som gir et rent moment","To krefter i samme retning","En kraft og en reaksjonskraft","To krefter som opphever hverandre helt"],"Momentet er $F\\cdot d$ og er det samme om hvilket som helst punkt."],
 ["Hvor mange ukjente gir et glidelager (rulleopplager) i 2D?",["1","2","3","0"],"Bare en kraft vinkelrett på underlaget."],
 ["Hva betyr det at en konstruksjon er statisk ubestemt?",["Den har flere ukjente reaksjoner enn likevektsligninger","Den er ustabil","Den har ingen opplagre","Lastene er ukjente"],"Da trengs også deformasjonsbetingelser."]
);
MORE("MAPE1300",1,
 ["Hva er friksjonsvinkelen $\\varphi$?",["Vinkelen der $\\tan\\varphi = \\mu_s$","Vinkelen mellom normalkraft og tyngde","Alltid 45°","Vinkelen der friksjonen er null"],"Et skråplan med helning over friksjonsvinkelen gjør at klossen glir."],
 ["Er kinetisk friksjonskoeffisient vanligvis større eller mindre enn statisk?",["Mindre","Større","Alltid lik","Den er alltid null"],"Derfor «rykker» det når noe begynner å gli."]
);
MORE("MAPE1300",3,
 ["Hva er skjærkraften like til venstre og høyre for en punktlast $P$?",["Den hopper med $P$","Den er lik på begge sider","Den blir null","Den dobles"],"Punktlaster gir sprang i skjærkraftdiagrammet og knekk i momentdiagrammet."],
 ["Hvordan ser skjærkraftdiagrammet ut for jevnt fordelt last?",["Lineært","Konstant","Parabolsk","Kubisk"],"$dV/dx = -q$. Momentdiagrammet blir da en parabel."]
);
GEN("MAPE1300",0,
 ()=>{ const F=R.f(10,200,10), d=R.f(0.1,1,0.05); return [T(`Et kraftpar består av to krefter på ${nf(F)} N med ${nf(d)} m avstand. Hvor stort er momentet?`,`A couple consists of two forces of ${nf(F)} N separated by a distance of ${nf(d)} m. What is the moment?`),{n:F*d,tol:rel(F*d),u:"Nm"},`$M = Fd = ${mf(F)}\\cdot ${mf(d)} = ${mf(F*d)}$ Nm.`]; }
);

// ---------- MEK1300 Programmering 1 ----------
MORE("MEK1300",0,
 ["Hva gir `\"Hei\".upper()`?",["\"HEI\"","\"hei\"","\"Hei\"","Feil"],"`upper()` returnerer en ny streng med store bokstaver."],
 ["Hva gir `10 ** -1`?",["0.1","-10","10","Feil"],"Negativ eksponent gir den inverse: $10^{-1}$."],
 ["Hva gir `type([1, 2])`?",["list","tuple","dict","set"],"Hakeparenteser gir en liste."]
);
MORE("MEK1300",1,
 ["Hva skriver koden ut?```x = 5\nwhile x > 0:\n    x -= 2\nprint(x)```",["-1","0","1","-2"],"x går 5 → 3 → 1 → −1. Da stopper løkka."],
 ["Hva gir `list(range(5, 0, -1))`?",["[5, 4, 3, 2, 1]","[5, 4, 3, 2, 1, 0]","[0, 1, 2, 3, 4]","[]"],"Negativt steg teller nedover. Stopp-verdien 0 er ikke med."]
);
MORE("MEK1300",2,
 ["Hva gjør `return` i en funksjon?",["Avslutter funksjonen og sender en verdi tilbake","Skriver ut en verdi","Starter funksjonen på nytt","Importerer en modul"],"Kode etter `return` i samme gren kjøres ikke."],
 ["Hva er en lokal variabel?",["En variabel som bare finnes inne i funksjonen der den er laget","En variabel i en egen fil","En konstant","En variabel som alle funksjoner kan endre"],"Globale variabler endres inne i en funksjon bare med `global`."]
);
GEN("MEK1300",2,
 ()=>{ const xs=R.distinct(5,1,20); const k=R.i(1,3); const out=xs.filter(x=>x%2===0).length;
   return [T(`Hva skriver koden ut?\`\`\`tall = [${xs.join(", ")}]\nn = 0\nfor t in tall:\n    if t % 2 == 0:\n        n += 1\nprint(n)\`\`\``,`What does the code print?\`\`\`numbers = [${xs.join(", ")}]\nn = 0\nfor t in numbers:\n    if t % 2 == 0:\n        n += 1\nprint(n)\`\`\``),{n:out,tol:0,u:""},T(`Koden teller partall: ${xs.filter(x=>x%2===0).join(", ")||"ingen"}, altså ${out}.`,`The code counts the even numbers: ${xs.filter(x=>x%2===0).join(", ")||"none"}, so the answer is ${out}.`)]; }
);

// ---------- MATS1600 Mekanisk design ----------
MORE("MATS1600",0,
 ["Hva er motstandsmomentet $W$ for et rektangel $b\\times h$?",["$bh^2/6$","$bh^3/12$","$bh/2$","$b^2h/3$"],"$\\sigma_{maks} = M/W$."],
 ["Hva er forskjellen på statisk og dynamisk dimensjonering?",["Dynamisk tar hensyn til utmatting ved varierende last","Statisk gjelder bare bevegelige deler","Det er ingen forskjell","Dynamisk ser bare på vekt"],"Varierende last kan gi brudd langt under flytegrensen."],
 ["Hvilken sikkerhetsfaktor mot flyt er vanlig i maskinkonstruksjon?",["Omtrent 1,5–3","0,5","Over 20","Nøyaktig 1"],"Valget avhenger av usikkerhet i last, materiale og konsekvens av brudd."]
);
MORE("MATS1600",1,
 ["Hva betyr det at et hull er målsatt Ø20 H7?",["Nominell diameter 20 mm med toleranseklasse H7","20 hull med 7 mm diameter","Dybde 20 mm og 7 gjenger","20 mm radius"],"H gir nedre avvik 0, og 7 angir toleransevidden."],
 ["Hva er en overgangspassning?",["En passning der det kan bli både litt klaring og litt grep","Alltid klaring","Alltid grep","En passning uten toleranse"],"Brukes når delene skal sitte nøyaktig, men kunne demonteres."]
);
GEN("MATS1600",1,
 ()=>{ const D=R.p([20,25,30,40]), hu=R.p([21,25,30]), eu=R.p([-7,-9,-20]), it=R.p([13,16]); const el=eu-it; const cmin=-eu;
   return [T(`Hull: Ø${D} +0,${String(hu).padStart(3,"0")} / 0. Aksel: Ø${D} −0,${String(-eu).padStart(3,"0")} / −0,${String(-el).padStart(3,"0")} (mm). Hva er minste klaring, i µm?`,`Hole: ⌀${D} +0.${String(hu).padStart(3,"0")} / 0. Shaft: ⌀${D} −0.${String(-eu).padStart(3,"0")} / −0.${String(-el).padStart(3,"0")} (mm). What is the minimum clearance, in µm?`),{n:cmin,tol:0.5,u:"µm"},T(`Minste klaring = minste hull − største aksel = $0 - (${eu}) = ${cmin}$ µm.`,`Minimum clearance = smallest hole − largest shaft = $0 - (${eu}) = ${cmin}$ µm.`)]; }
);

// ---------- MATS2100 Termodynamikk ----------
MORE("MATS2100",0,
 ["Hva er et åpent system i termodynamikken?",["Et system der masse kan strømme inn og ut","Et system uten vegger","Et system med konstant temperatur","Et isolert system"],"Eksempler er turbiner, pumper og varmevekslere."],
 ["Hva er nullte hovedsetning?",["To systemer i termisk likevekt med et tredje er i likevekt med hverandre","Energi er bevart","Entropien øker","Absolutt null kan ikke nås"],"Den er grunnlaget for temperaturmåling."],
 ["Hva er en isobar prosess?",["En prosess med konstant trykk","En prosess med konstant volum","En prosess uten varme","En prosess med konstant temperatur"],"Konstant volum kalles isokor."]
);
MORE("MATS2100",1,
 ["Hva er spesifikk varmekapasitet?",["Varmen som trengs for å heve 1 kg av stoffet 1 K","Varmen i 1 mol","Temperaturen der stoffet koker","Energien i en kWh"],"Vann har uvanlig høy verdi: ca. 4,18 kJ/(kg·K)."],
 ["Hva er latent varme?",["Varme som tilføres ved faseovergang uten temperaturendring","Varme lagret i metall","Varme fra friksjon","Varme som går tapt"],"Å fordampe vann krever ca. 2257 kJ/kg ved 100 °C."]
);
GEN("MATS2100",1,
 ()=>{ const m=R.f(0.5,5,0.5); const Q=m*2257; return [T(`Hvor mye varme trengs for å fordampe ${nf(m)} kg vann som allerede har 100 °C? (Fordampingsvarme 2257 kJ/kg)`,`How much heat is needed to evaporate ${nf(m)} kg of water that is already at 100 °C? (Latent heat of vaporization 2257 kJ/kg)`),{n:Q,tol:rel(Q),u:"kJ"},`$Q = mL = ${mf(m)}\\cdot 2257 \\approx ${mf(Q,0)}$ kJ.`]; }
);

// ---------- MEK1400 Fysikk ----------
MORE("MEK1400",1,
 ["Hva er elektrisk potensial (spenning)?",["Potensiell energi per ladning","Kraft per ladning","Strøm per tid","Ladning per volum"],"$U = W/q$, og enheten er volt = J/C."],
 ["Hva sier Faradays induksjonslov?",["Indusert spenning er lik minus endringen i magnetisk fluks per tid","Strøm er lik spenning delt på motstand","Ladning er bevart","Magnetfelt har ingen kilder"],"$\\varepsilon = -d\\Phi/dt$. Generatorer bygger på dette."]
);
MORE("MEK1400",2,
 ["Hva er arbeid i fysikk?",["Kraft ganger forflytning i kraftens retning","Kraft ganger tid","Masse ganger fart","Effekt delt på tid"],"$W = Fs\\cos\\theta$."],
 ["Hva er effekt?",["Arbeid per tid","Kraft per areal","Energi ganger tid","Masse per volum"],"Enheten er watt = J/s."],
 ["Hva er bevegelsesmengde?",["$p = mv$","$p = ma$","$p = \\tfrac12mv^2$","$p = mgh$"],"Den er bevart når summen av ytre krefter er null."]
);

// ---------- ELPE1300 Elektriske kretser ----------
MORE("ELPE1300",0,
 ["Hva sier Kirchhoffs spenningslov?",["Summen av spenninger rundt en lukket sløyfe er null","Summen av strømmer inn i en node er null","Spenningen er lik over alle motstander","$P = UI$"],"Den følger av at energien er bevart."],
 ["Hvordan fordeler strømmen seg mellom to motstander i parallell?",["Mest strøm går gjennom den minste motstanden","Likt uansett motstand","Mest gjennom den største","All strøm går gjennom den minste"],"Strømdeler: $I_1 = I\\,R_2/(R_1 + R_2)$."]
);
MORE("ELPE1300",1,
 ["Hva er enheten for kapasitans?",["Farad (F)","Henry (H)","Ohm (Ω)","Tesla (T)"],"Induktans måles i henry."],
 ["Hva skjer med strømmen i en spole når bryteren åpnes brått?",["Spolen prøver å holde strømmen, og det kan oppstå en høy spenningstopp","Strømmen stopper uten virkninger","Spolen lades opp","Spenningen blir null"],"Derfor brukes en frihjulsdiode over reléspoler."]
);
MORE("ELPE1300",2,
 ["Hva er reaktiv effekt $Q$?",["Effekt som pendler mellom kilde og magnetiske/elektriske felt uten å gjøre nyttig arbeid","Effekten som blir til varme","Effekten i en motstand","Summen av aktiv og tilsynelatende effekt"],"Enheten er VAr. $S^2 = P^2 + Q^2$."],
 ["Hvorfor faseforbedrer man induktive laster?",["For å redusere den reaktive strømmen og tapene i nettet","For å øke spenningen","For å endre frekvensen","For å gjøre lasten induktiv"],"Kondensatorer i parallell kompenserer for motorens induktans."]
);
GEN("ELPE1300",2,
 ()=>{ const t=R.p([[3,4,5],[6,8,10],[5,12,13],[8,6,10]]), s=R.p([1,10,100]); const P=t[0]*s,Q=t[1]*s,S=t[2]*s; const k=R.p(["S","pf"]);
   if(k==="S") return [T(`En last har aktiv effekt ${P} W og reaktiv effekt ${Q} VAr. Hva er tilsynelatende effekt?`,`A load has an active power of ${P} W and a reactive power of ${Q} VAr. What is the apparent power?`),{n:S,tol:rel(S),u:"VA"},`$S = \\sqrt{P^2 + Q^2} = ${S}$ VA.`];
   return [T(`En last har aktiv effekt ${P} W og reaktiv effekt ${Q} VAr. Hva er effektfaktoren?`,`A load has an active power of ${P} W and a reactive power of ${Q} VAr. What is the power factor?`),{n:P/S,tol:0.005,u:""},T(`$S = ${S}$ VA, så $\\cos\\varphi = P/S = ${mf(P/S,3)}$.`,`$S = ${S}$ VA, so $\\cos\\varphi = P/S = ${mf(P/S,3)}$.`)]; }
);

// ---------- MEK1000 Matematikk 1000 ----------
MORE("MEK1000",0,
 ["Hva er brøkregelen for derivasjon, $(f/g)'$?",["$\\dfrac{f'g - fg'}{g^2}$","$\\dfrac{f'g + fg'}{g^2}$","$\\dfrac{f'}{g'}$","$\\dfrac{fg' - f'g}{g}$"],"Husk minus og $g^2$ i nevneren."],
 ["Hva sier middelverdisetningen?",["Det finnes et punkt der den deriverte er lik den gjennomsnittlige stigningen over intervallet","Funksjonen har alltid et maksimum","Integralet er lik middelverdien","Den deriverte er alltid positiv"],"Forutsetning: $f$ er kontinuerlig på $[a,b]$ og deriverbar på $(a,b)$."],
 ["$\\dfrac{d}{dx}\\arctan x = $",["$\\dfrac{1}{1+x^2}$","$\\dfrac{1}{\\sqrt{1-x^2}}$","$\\tan x$","$-\\dfrac{1}{1+x^2}$"],"$\\dfrac{1}{\\sqrt{1-x^2}}$ er den deriverte av $\\arcsin x$."]
);
MORE("MEK1000",1,
 ["Hva sier analysens fundamentalteorem?",["$\\int_a^b f(x)\\,dx = F(b) - F(a)$ der $F' = f$","Alle funksjoner kan integreres","Integralet er alltid positivt","$\\int f = f'$"],"Det knytter derivasjon og integrasjon sammen."],
 ["Hvilken substitusjon passer for $\\int 2x\\cos(x^2)\\,dx$?",["$u = x^2$","$u = \\cos x$","$u = 2x$","Delvis integrasjon med $u = \\cos(x^2)$"],"Da blir $du = 2x\\,dx$ og integralet $\\sin(x^2) + C$."]
);
MORE("MEK1000",2,
 ["Hva er $i^2$?",["$-1$","$1$","$i$","$0$"],"Definisjonen av den imaginære enheten."],
 ["Hva er den komplekskonjugerte av $a + bi$?",["$a - bi$","$-a + bi$","$b + ai$","$-a - bi$"],"$z\\bar z = a^2 + b^2 = |z|^2$."]
);

// ---------- ELFT2500 Innebygde systemer ----------
MORE("ELFT2500",0,
 ["Hva er en bit og en byte?",["En bit er 0 eller 1; en byte er 8 bit","En byte er 4 bit","En bit er 8 byte","Det er det samme"],"En nibble er 4 bit, altså ett heksadesimalt siffer."],
 ["Hva er et flyttall (float) godt og dårlig til?",["Stort tallområde, men begrenset presisjon og avrundingsfeil","Eksakt lagring av alle desimaltall","Bare heltall","Bare negative tall"],"Derfor skal man ikke sammenligne flyttall med `==`."]
);
MORE("ELFT2500",1,
 ["Hva er forskjellen på flyktig og ikke-flyktig minne?",["Flyktig (RAM) mister innholdet uten strøm; ikke-flyktig (flash, EEPROM) beholder det","Flyktig er alltid raskere og større","Det er ingen forskjell","Ikke-flyktig mister innholdet"],"Programmet lagres i flash, variabler i RAM."],
 ["Hva er debouncing av en knapp?",["Å filtrere bort prelling slik at ett trykk ikke registreres som mange","Å gjøre knappen hardere","Å øke spenningen","Å koble knappen til jord"],"Kan gjøres i maskinvare (RC) eller programvare (vente noen ms)."]
);

// ---------- MEK2000 Matematikk 2000 ----------
MORE("MEK2000",0,
 ["Hva er identitetsmatrisen?",["En kvadratisk matrise med 1 på diagonalen og 0 ellers","En matrise med bare 1-ere","En nullmatrise","En symmetrisk matrise med negativ diagonal"],"$AI = IA = A$."],
 ["Hva er $A^{-1}$ for $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$?",["$\\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$","$\\begin{pmatrix}d&b\\\\c&a\\end{pmatrix}$","$\\dfrac{1}{ad+bc}\\begin{pmatrix}a&-b\\\\-c&d\\end{pmatrix}$","$\\begin{pmatrix}1/a&1/b\\\\1/c&1/d\\end{pmatrix}$"],"Bytt diagonalen, skift fortegn utenfor, del på determinanten."],
 ["Er matrisemultiplikasjon kommutativ?",["Nei, generelt er $AB \\neq BA$","Ja, alltid","Bare for 2×2","Bare hvis $\\det A = 0$"],"Rekkefølgen betyr noe, akkurat som for rotasjoner."]
);
MORE("MEK2000",1,
 ["Hva er en basis for et vektorrom?",["En mengde lineært uavhengige vektorer som utspenner rommet","Alle vektorer i rommet","Nullvektoren","Enhver mengde med tre vektorer"],"I $\\mathbb R^3$ består enhver basis av tre vektorer."],
 ["Hva kjennetegner egenverdiene til en symmetrisk reell matrise?",["De er alle reelle","De er alle null","De er alle imaginære","De er alltid like"],"Egenvektorene kan dessuten velges ortogonale."]
);
MORE("MEK2000",2,
 ["Hva er integrerende faktor for $y' + p(x)y = q(x)$?",["$e^{\\int p(x)\\,dx}$","$e^{-x}$","$\\int q(x)\\,dx$","$p(x)q(x)$"],"Ganger man med den, blir venstresiden $(\\mu y)'$."],
 ["Hva er en separabel differensialligning?",["En som kan skrives $y' = g(x)h(y)$","En som har konstant løsning","En av andre orden","En uten løsning"],"Da kan man samle $y$ og $x$ på hver sin side og integrere."]
);

// ---------- MEK2200 Statistikk ----------
MORE("MEK2200",0,
 ["Når er to hendelser uavhengige?",["Når $P(A\\cap B) = P(A)P(B)$","Når de ikke kan skje samtidig","Når $P(A) = P(B)$","Når $P(A\\cup B) = 1$"],"Disjunkte hendelser med positiv sannsynlighet er faktisk avhengige."],
 ["Hva er $P(A^c)$ (komplementet)?",["$1 - P(A)$","$P(A)$","$0$","$P(A)/2$"],"Nyttig for «minst én»-spørsmål."]
);
MORE("MEK2200",2,
 ["Hva måler forklaringsgraden $R^2$ i regresjon?",["Andelen av variasjonen i $y$ som modellen forklarer","Stigningstallet","Antall observasjoner","Standardfeilen"],"$R^2$ ligger mellom 0 og 1."],
 ["Hva er en ALARP-vurdering?",["Risiko skal reduseres så langt som praktisk mulig","Risiko skal alltid være null","En type test","Et regnskapsprinsipp"],"«As Low As Reasonably Practicable» brukes mye i norsk offshore."]
);

// ---------- ELVE3610 Robotikk ----------
MORE("ELVE3610",0,
 ["Hva er Euler-vinkler?",["Tre påfølgende rotasjoner som beskriver en orientering","Vinkler i en trekant","Leddvinkler i en 2D-arm","Vinkler mellom poler"],"De kan gi gimbal lock. Derfor brukes også kvaternioner."],
 ["Hva er gimbal lock?",["At to rotasjonsakser faller sammen, slik at én frihetsgrad går tapt","At et ledd låser seg mekanisk","At roboten er slått av","At griperen ikke åpner"],"Det er en singularitet i Euler-vinkler."]
);
MORE("ELVE3610",2,
 ["Hva er et arbeidsområde (workspace)?",["Alle punkter verktøyet kan nå","Området rundt kontrolleren","Robotens gulvareal","Sikkerhetssonen"],"Det finnes nåbart og fingerferdig (dexterous) arbeidsområde."],
 ["Hva gjør baneplanlegging (path planning)?",["Finner en kollisjonsfri vei fra start til mål","Velger motor","Beregner treghetsmoment","Kalibrerer kamera"],"Eksempler er A* og RRT."]
);

// ---------- MATS1500 Materialteknologi ----------
MORE("MATS1500",0,
 ["Hva er forskjellen på krystallinske og amorfe materialer?",["Krystallinske har regelmessig atomstruktur; amorfe har ikke langtrekkende orden","Amorfe er alltid metaller","Krystallinske er alltid flytende","Det er ingen forskjell"],"Glass er amorft. De fleste metaller er krystallinske."],
 ["Hva er en legering?",["En blanding av et metall med andre grunnstoffer for å få ønskede egenskaper","Et rent metall","En polymer","En keramikk"],"Messing er kobber og sink. Bronse er kobber og tinn."]
);
MORE("MATS1500",2,
 ["Hva er herdbarhet?",["Hvor dypt stålet kan herdes ved bråkjøling","Hvor hardt stålet kan bli","Hvor fort stålet ruster","Smeltepunktet"],"Legeringselementer som krom og molybden øker herdbarheten."],
 ["Hva er settherding (karburering)?",["Å øke karboninnholdet i overflaten slik at den blir hard mens kjernen forblir seig","Å smelte overflaten","Å male stålet","Å fjerne karbon"],"Brukes for tannhjul."],
 ["Hvorfor brukes kompositter som karbonfiber?",["Høy styrke og stivhet i forhold til vekten","De er billigst","De tåler høyest temperatur av alt","De er lettest å resirkulere"],"Egenskapene avhenger av fiberretningen (anisotropi)."]
);
GEN("MATS1500",0,
 ()=>{ const s=R.p([["FCC",4],["BCC",2],["enkel kubisk",1]]), n=R.i(1,5); const sEn=s[0]==="enkel kubisk"?"simple cubic":s[0]; return [T(`Hvor mange atomer finnes i ${n} ${n===1?"enhetscelle":"enhetsceller"} med ${s[0]}-struktur?`,`How many atoms are there in ${n} ${sEn} ${n===1?"unit cell":"unit cells"}?`),{n:n*s[1],tol:0,u:""},T(`${s[0]} har ${s[1]} ${s[1]===1?"atom":"atomer"} per celle: $${n}\\cdot ${s[1]} = ${n*s[1]}$.`,`The ${sEn} structure has ${s[1]} ${s[1]===1?"atom":"atoms"} per cell: $${n}\\cdot ${s[1]} = ${n*s[1]}$.`)]; }
);

// ---------- MEK3100 Programmering 2 ----------
MORE("MEK3100",1,
 ["Hva er en kø (queue)?",["En datastruktur med FIFO: først inn, først ut","Med LIFO","En sortert liste","Et tre"],"I Python brukes gjerne `collections.deque`."],
 ["Hva er et binært søketre?",["Et tre der venstre barn er mindre og høyre barn er større enn noden","Et tre med to noder","En sortert liste","En hashtabell"],"Søk, innsetting og sletting tar $O(\\log n)$ når treet er balansert."]
);
MORE("MEK3100",2,
 ["Hva gjør `np.dot(A, B)` for to matriser?",["Matrisemultiplikasjon","Elementvis multiplikasjon","Summerer alle elementer","Transponerer"],"`A @ B` gjør det samme. `A * B` er elementvis."],
 ["Hva er vektorisering i NumPy?",["Å bruke operasjoner på hele arrays i stedet for Python-løkker","Å gjøre tall om til vektorer i papir","Å tegne vektorer","Å lagre data i lister"],"Det er ofte 10–100 ganger raskere."]
);

// ---------- DAVE3700 Matematikk 3000 ----------
MORE("DAVE3700",0,
 ["Hva er kjerneregelen for $z = f(x(t), y(t))$?",["$\\dfrac{dz}{dt} = f_x\\dfrac{dx}{dt} + f_y\\dfrac{dy}{dt}$","$\\dfrac{dz}{dt} = f_xf_y$","$\\dfrac{dz}{dt} = f_x + f_y$","$\\dfrac{dz}{dt} = x'y'$"],"Hvert bidrag går via sin mellomvariabel."],
 ["Hva er tangentplanet til $z = f(x,y)$ i $(a,b)$?",["$z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$","$z = f(a,b)$","$z = f_xx + f_yy$","$z = \\nabla f$"],"Det er grunnlaget for lineær tilnærming."]
);
MORE("DAVE3700",1,
 ["Hva sier Fubinis teorem?",["For kontinuerlige funksjoner på et rektangel kan integrasjonsrekkefølgen byttes","Alle integraler er null","Dobbeltintegraler kan ikke beregnes","Integralet avhenger av rekkefølgen"],"$\\iint f\\,dA = \\int\\!\\int f\\,dx\\,dy = \\int\\!\\int f\\,dy\\,dx$."],
 ["Hva er Jacobi-determinanten ved variabelskifte?",["Faktoren som skalerer areal- eller volumelementet","Summen av de partielle deriverte","Alltid 1","Gradientens lengde"],"For polarkoordinater er den $r$."]
);
MORE("DAVE3700",2,
 ["Hva sier divergensteoremet (Gauss)?",["Fluksen ut av en lukket flate er lik volumintegralet av divergensen","Sirkulasjonen er lik fluksen av curl","Gradienten er null","Volumet er konstant"],"$\\oiint \\vec F\\cdot d\\vec S = \\iiint \\nabla\\cdot\\vec F\\,dV$."],
 ["Hva sier Stokes' teorem?",["Sirkulasjonen rundt en kurve er lik fluksen av curl gjennom en flate den avgrenser","Fluksen er lik divergensen","Linjeintegraler er alltid null","Gradienten er virvelfri"],"Greens teorem er spesialtilfellet i planet."]
);

// ---------- STKD6610 Technology and Society II ----------
MORE("STKD6610",0,
 ["Hva er det tredelte bunnlinjeprinsippet (triple bottom line)?",["Å vurdere økonomiske, sosiale og miljømessige resultater","Å ha tre regnskapsår","Tre ledere i styret","Tre prosent overskudd"],"Kalles også «people, planet, profit»."],
 ["Hva er et karbonfotavtrykk?",["Samlede klimagassutslipp knyttet til et produkt, en person eller en aktivitet","Mengden kull brukt","Et avtrykk i karbonfiber","Antall trær hogd"],"Oppgis i CO₂-ekvivalenter."]
);
MORE("STKD6610",1,
 ["Hva er universell utforming?",["At produkter og omgivelser kan brukes av flest mulig uten spesialtilpasning","Et felles designspråk for alle land","At alle produkter ser like ut","En ISO-standard for skruer"],"Det er lovpålagt i mange sammenhenger i Norge."],
 ["Hva er algoritmisk skjevhet (bias)?",["At en algoritme systematisk gir urettferdige resultater, ofte på grunn av skjeve treningsdata","At en algoritme er treg","En type programmeringsfeil i syntaks","At en algoritme bruker mye minne"],"Det er et sentralt tema i etikk for KI."]
);

// ---------- ELFT2400 Kybernetikk ----------
MORE("ELFT2400",0,
 ["Hva er en overføringsfunksjon?",["Forholdet mellom Laplace-transformert utgang og inngang med null initialbetingelser","Forholdet mellom strøm og spenning","En tidsfunksjon","En differensiallikning i tid"],"$G(s) = Y(s)/U(s)$."],
 ["Hva er en dødtid i et system?",["En forsinkelse før utgangen reagerer på inngangen","At systemet er av","At forsterkningen er null","At systemet er ustabilt"],"Den gir $e^{-sT}$ i overføringsfunksjonen og gjør regulering vanskeligere."]
);
MORE("ELFT2400",2,
 ["Hva viser et Bodediagram?",["Amplitude og fase som funksjon av frekvens","Poler og nullpunkter","Sprangrespons","Tidsforsinkelse alene"],"Amplituden vises i dB og frekvensen logaritmisk."],
 ["Hva er båndbredden til et lukket system?",["Frekvensen der amplituden har falt 3 dB fra lavfrekvensnivået","Høyeste frekvens i signalet","Samplingsfrekvensen","Fasemarginen"],"Høyere båndbredde betyr raskere respons."]
);

// ---------- DAVE3705 Matematikk 4000 ----------
MORE("DAVE3705",0,
 ["Hva sier forskyvningsregelen (s-skift)?",["$\\mathcal L\\{e^{at}f(t)\\} = F(s-a)$","$\\mathcal L\\{f(t-a)\\} = F(s-a)$","$\\mathcal L\\{af(t)\\} = F(s)/a$","$\\mathcal L\\{f'\\} = F(s-a)$"],"Tidsforskyvning gir derimot en faktor $e^{-as}$."],
 ["Hva er Laplacetransformen av enhetssprangfunksjonen $u(t-a)$?",["$e^{-as}/s$","$1/s$","$e^{as}$","$a/s$"],"Brukes for krefter som slås på ved $t = a$."],
 ["Hva er $\\mathcal L\\{\\delta(t)\\}$ (Dirac-puls)?",["1","0","$1/s$","$s$"],"Impulsresponsen er derfor $g(t) = \\mathcal L^{-1}\\{G(s)\\}$."]
);
MORE("DAVE3705",2,
 ["Hva er en Dirichlet-randbetingelse?",["Verdien av løsningen er gitt på randen","Den deriverte er gitt på randen","Løsningen er periodisk","Ingen betingelse"],"En Neumann-randbetingelse gir den deriverte, for eksempel isolert rand."],
 ["Hva betyr en isolert ende i varmeligningen?",["$u_x = 0$ i enden (ingen varmefluks)","$u = 0$ i enden","$u_t = 0$","$u = 100$"],"Da blir egenfunksjonene cosinusfunksjoner."]
);

// ---------- Nye fag: flere oppgaver ----------
MORE("FAST",0,
 ["Hva er skjærtøyning $\\gamma$?",["Vinkelendringen mellom to opprinnelig rette linjer","Lengdeendring per lengde","Volumendring","Rotasjon av hele legemet"],"$\\tau = G\\gamma$."],
 ["Hva er forskjellen på ingeniørspenning og sann spenning?",["Ingeniørspenning bruker opprinnelig areal; sann spenning bruker aktuelt areal","Det er det samme","Sann spenning gjelder bare trykk","Ingeniørspenning er alltid størst"],"Forskjellen blir stor etter innsnøring."]
);
MORE("FAST",1,
 ["Hvor er skjærspenningen størst i en rektangulær bjelke under bøyning?",["I nøytralaksen","I ytterfibrene","Jevnt fordelt","Ved opplagrene bare"],"For rektangel er $\\tau_{maks} = 1{,}5V/A$."],
 ["Hva er motstandsmomentet mot torsjon $W_p$ for en massiv aksel?",["$\\pi d^3/16$","$\\pi d^3/32$","$\\pi d^4/32$","$\\pi d^2/4$"],"$\\tau_{maks} = T/W_p$."]
);
MORE("FAST",2,
 ["Hva er slankhetsforholdet $\\lambda$ for en søyle?",["Effektiv lengde delt på treghetsradius, $L_e/i$","Lengde delt på vekt","Høyde delt på bredde","E delt på $R_e$"],"Høy slankhet gir knekking før flyt."],
 ["Hva sier Trescas flytkriterium?",["Flyt når største skjærspenning når $R_e/2$","Flyt ved største normalspenning","Flyt ved von Mises-spenning lik 0","Flyt ved $E\\varepsilon$"],"Det er litt mer konservativt enn von Mises."]
);
MORE("FLUID",0,
 ["Hvorfor stiger vann i et tynt glassrør (kapillaritet)?",["Adhesjon mellom vann og glass og overflatespenning","Atmosfæretrykket øker","Vannet blir lettere","Magnetisme"],"Kvikksølv synker i stedet, fordi kohesjonen er sterkere."],
 ["Hva måler et U-rør-manometer?",["Trykkforskjell via høydeforskjell i en væskesøyle","Temperatur","Strømningshastighet direkte","Viskositet"],"$\\Delta p = \\rho g\\Delta h$."]
);
MORE("FLUID",1,
 ["Hva er massestrøm?",["$\\dot m = \\rho Av$","$\\dot m = Av$","$\\dot m = \\rho v^2$","$\\dot m = pA$"],"For inkompressibel strømning er både $\\dot m$ og $Q$ bevart."],
 ["Hva er et pitotrør?",["Et instrument som måler fart via forskjellen mellom stagnasjonstrykk og statisk trykk","En pumpe","En ventil","Et manometer for tanker"],"Brukes på fly: $v = \\sqrt{2\\Delta p/\\rho}$."]
);
GEN("FLUID",1,
 ()=>{ const dp=R.p([50,100,200,500,1000]); const v=Math.sqrt(2*dp/1.2); return [T(`Et pitotrør i luft ($\\rho = 1{,}2$ kg/m³) måler en trykkforskjell på ${dp} Pa. Hva er farten?`,`A pitot tube in air ($\\rho = 1.2$ kg/m³) measures a pressure difference of ${dp} Pa. What is the flow velocity?`),{n:v,tol:rel(v),u:"m/s"},T(`$v = \\sqrt{2\\Delta p/\\rho} = \\sqrt{2\\cdot ${dp}/1{,}2} \\approx ${mf(v,2)}$ m/s.`,`$v = \\sqrt{2\\Delta p/\\rho} = \\sqrt{2\\cdot ${dp}/1.2} \\approx ${mf(v,2)}$ m/s.`)]; }
);
MORE("FLUID",2,
 ["Hva beskriver Moody-diagrammet?",["Friksjonsfaktoren som funksjon av Reynoldstall og relativ ruhet","Trykk mot dybde","Viskositet mot temperatur","Pumpekurver"],"For turbulent strømning brukes Colebrook-ligningen."],
 ["Hva er et singulærtap (lokaltap)?",["Trykktap i bend, ventiler og innsnevringer: $K v^2/(2g)$","Friksjonstap i rette rør","Tap på grunn av høyde","Tap i pumpen"],"$K$ er en tapskoeffisient fra tabell."]
);
MORE("FEM",0,
 ["Hva er en frihetsgrad (DOF) i FEM?",["En ukjent forskyvning eller rotasjon i en node","Et element","En last","En materialparameter"],"Totalt antall DOF bestemmer størrelsen på ligningssystemet."],
 ["Hvorfor blir stivhetsmatrisen ofte glissen (sparse)?",["Hver node er bare koblet til noen få naboer","Fordi E er liten","Fordi lastene er små","Den blir alltid full"],"Glissen lagring og løsere sparer mye minne og tid."]
);
MORE("FEM",1,
 ["Hva er isoparametriske elementer?",["Elementer der samme formfunksjoner brukes for geometri og forskyvning","Elementer med lik side","Elementer uten noder","Bare trekanter"],"Det gjør det enkelt å lage krumme elementer."],
 ["Hvorfor bruker man et referanseelement (f.eks. $[-1,1]$)?",["Integrasjon og formfunksjoner defineres én gang og avbildes til hvert element","For å gjøre elementene mindre","Fordi det er påkrevd av loven","For å unngå randbetingelser"],"Jacobi-matrisen tar hånd om avbildningen."]
);
MORE("FEM",2,
 ["Hva er forskjellen på lineær og ikke-lineær FEM-analyse?",["Ikke-lineær tar med store deformasjoner, plastisitet eller kontakt, og løses iterativt","Lineær er alltid mer nøyaktig","Ikke-lineær bruker bare trekanter","Det er ingen forskjell"],"Newton–Raphson brukes ofte i ikke-lineær analyse."],
 ["Hvordan kan du sjekke at en FEM-modell er rimelig?",["Kontroller reaksjonskrefter mot påført last og sammenlign med håndberegning","Se om fargene er fine","Øk lasten til den ryker","Bruk grovest mulig mesh"],"Sjekk også enheter og at deformasjonen ser fysisk riktig ut."]
);
MORE("SVING",0,
 ["Hvor mange egenfrekvenser har et system med $n$ frihetsgrader?",["$n$","1","$2n$","Uendelig mange"],"Hver egenfrekvens har en tilhørende egenform (mode)."],
 ["Hva er en torsjonssvingning?",["Vridningssvingning, f.eks. av en aksel med svinghjul","Svingning i lengderetningen","En lydbølge","En elektrisk svingning"],"$\\omega_n = \\sqrt{k_t/J}$."]
);
MORE("SVING",1,
 ["Hva skjer med amplituden i en fri, underdempet svingning?",["Den avtar eksponentielt","Den er konstant","Den øker","Den blir null momentant"],"Omhylningskurven er $e^{-\\zeta\\omega_nt}$."],
 ["Hvilken demping gir raskest retur til likevekt uten oversving?",["Kritisk demping","Ingen demping","Sterk overdemping","Svak demping"],"Bildempere dimensjoneres ofte litt under kritisk."]
);
MORE("SVING",2,
 ["Hva er en dynamisk svingningsdemper (tuned mass damper)?",["En ekstra masse–fjær avstemt til egenfrekvensen, som tar opp svingningene","En gummimatte","En hydraulisk sylinder","En tyngre fundament"],"Brukes i høyhus og bruer."],
 ["Hva er fasevinkelen mellom kraft og utslag ved resonans?",["90°","0°","180°","45°"],"Under resonans er de nesten i fase, og over resonans nesten motfase."]
);
MORE("VARME",0,
 ["Hvilket materiale har høyest varmeledningsevne?",["Kobber","Stål","Betong","Luft"],"Kobber ca. 400, stål ca. 50, betong ca. 1,4 og luft ca. 0,026 W/(m·K)."],
 ["Hva er en kuldebro?",["Et område i konstruksjonen med mye høyere varmeledning enn omgivelsene","En bro i kaldt klima","Et isolasjonssjikt","En type varmepumpe"],"Eksempler er stålbjelker gjennom isolasjonen."]
);
MORE("VARME",1,
 ["Hva skiller tvungen fra naturlig konveksjon?",["Tvungen drives av vifte eller pumpe; naturlig av oppdrift fra temperaturforskjeller","Naturlig gir alltid høyest $h$","Tvungen skjer bare i vann","Det er det samme"],"Naturlig konveksjon i luft har $h$ ca. 2–25 W/(m²·K)."],
 ["Hva gjør ribber (kjøleribber)?",["Øker overflatearealet og dermed varmeavgivelsen","Isolerer","Reduserer $h$","Øker temperaturen"],"Ribbevirkningsgraden sier hvor effektiv ribben er."]
);
MORE("VARME",2,
 ["Hvorfor har termoser en blank, forsølvet innside?",["Lav emissivitet reduserer strålingsoverføringen","Det ser pent ut","For å øke ledning","For å øke konveksjon"],"Vakuumet stopper ledning og konveksjon."],
 ["Hva er emissivitet?",["Hvor godt en flate stråler sammenlignet med et svart legeme","Hvor varm flaten er","Hvor glatt flaten er","Hvor tykk flaten er"],"Verdien ligger mellom 0 og 1."]
);
MORE("NUM",0,
 ["Hva er fikspunktiterasjon?",["Å løse $x = g(x)$ ved å iterere $x_{n+1} = g(x_n)$","Å finne maks av en funksjon","Å dele intervallet i to","Å integrere numerisk"],"Den konvergerer hvis $|g'(x)| < 1$ nær roten."]
);
MORE("NUM",1,
 ["Hva er en spline?",["Stykkevis polynom som er glatt i skjøtene","Et enkelt høygradspolynom","En rett linje","En Fourierrekke"],"Kubiske splines er mest brukt."],
 ["Hva er Gauss-kvadratur?",["Integrasjon med optimalt valgte punkter og vekter","Integrasjon med like store intervaller","Derivasjon","Interpolasjon"],"$n$ punkter gir eksakt svar opp til grad $2n-1$."]
);
MORE("NUM",2,
 ["Hva er lokal og global trunkeringsfeil?",["Lokal er feilen i ett steg; global er akkumulert feil ved sluttiden","Det er det samme","Global er alltid mindre","Lokal gjelder bare RK4"],"For Euler er lokal feil $O(h^2)$ og global $O(h)$."],
 ["Hvorfor skriver man en høyere ordens ODE som et system av første ordens ligninger?",["De fleste numeriske løsere er laget for systemer av første orden","Fordi det gir eksakt løsning","Fordi høyere ordens ligninger ikke har løsning","For å slippe initialbetingelser"],"$y'' = f$ blir $y_1' = y_2$, $y_2' = f$."]
);
MORE("OKON",0,
 ["Hva er effektiv rente?",["Den faktiske årlige renten når rentes rente og gebyrer er tatt med","Renten før gebyrer","Nominell rente delt på 12","Styringsrenten"],"Månedlig rente $r/12$ gir effektiv rente $(1 + r/12)^{12} - 1$."]
);
GEN("OKON",0,
 ()=>{ const r=R.p([0.03,0.05,0.06,0.08,0.12]); const e=((1+r/12)**12-1)*100; return [T(`Nominell årsrente er ${nf(r*100)} % med månedlig forrentning. Hva er effektiv årsrente?`,`The nominal annual interest rate is ${nf(r*100)} % with monthly compounding. What is the effective annual rate?`),{n:e,tol:0.01,u:"%"},`$(1 + ${mf(r)}/12)^{12} - 1 \\approx ${mf(e,3)}$ %.`]; }
);
MORE("OKON",1,
 ["Hva er et serielån?",["Et lån med like store avdrag, slik at terminbeløpet synker over tid","Et lån med like store terminbeløp","Et lån uten avdrag","Et forbrukslån"],"Totale renter blir lavere enn for et annuitetslån med samme rente og løpetid."],
 ["Hvorfor bruker man en kalkulasjonsrente som er høyere enn bankrenten?",["For å ta hensyn til risiko og alternativ avkastning","For å få høyere NPV","Fordi loven krever det","For å slippe skatt"],"Høyere risiko gir høyere avkastningskrav."]
);
MORE("OKON",2,
 ["Hva er sunk cost (sokkekostnad)?",["Kostnader som allerede er påløpt og ikke kan hentes inn, og som ikke skal påvirke nye beslutninger","Framtidige kostnader","Variable kostnader","Skatt"],"Et klassisk feilgrep er å fortsette et prosjekt bare fordi man har brukt mye på det."],
 ["Hva er skalafordeler?",["At kostnaden per enhet synker når produksjonsvolumet øker","At prisen øker med volumet","At faste kostnader øker","At kvaliteten synker"],"Faste kostnader fordeles på flere enheter."]
);
MORE("KJEMI",0,
 ["Hva er molar masse?",["Massen av én mol av stoffet, i g/mol","Massen av ett molekyl i kg","Antall atomer i en mol","Tettheten"],"Den finnes ved å summere atommassene fra periodesystemet."],
 ["Hva er utbytteprosent?",["Faktisk utbytte delt på teoretisk utbytte, ganget med 100","Masse reaktanter","Masse produkt","Antall mol"],"Den er sjelden 100 % i praksis."]
);
MORE("KJEMI",2,
 ["Hva er elektronegativitet?",["Et atoms evne til å trekke elektroner til seg i en binding","Antall elektroner","Atommassen","Ioniseringsenergien"],"Fluor har høyest elektronegativitet."],
 ["Hva er en ionebinding?",["Elektrostatisk tiltrekning mellom positive og negative ioner","Deling av elektronpar","En binding mellom metallatomer","En hydrogenbinding"],"Eksempel: NaCl."],
 ["Hvilket metall brukes som offeranode for å beskytte stål i sjøvann?",["Sink","Kobber","Gull","Sølv"],"Sink er mindre edelt enn stål og korroderer i stedet."]
);
MORE("ELEK",0,
 ["Hva er en fotodiode?",["En diode som gir strøm når den belyses","En diode som lyser","En diode som stabiliserer spenning","En diode for høy spenning"],"Den brukes i lyssensorer og optokoblere."],
 ["Hva er forskjellen på NPN og PNP?",["Polaritet: i NPN går strømmen inn i kollektor når basen er positiv; PNP er omvendt","NPN er alltid større","PNP har ingen base","Det er det samme"],"NPN brukes oftest til å svitsje laster mot jord."]
);
MORE("ELEK",1,
 ["Hva gjør en komparator?",["Sammenligner to spenninger og gir høy eller lav utgang","Forsterker lineært","Filtrerer støy","Lager en sinus"],"Hysterese (Schmitt-trigger) hindrer at utgangen skifter frem og tilbake ved støy."],
 ["Hva er en integrator med op-amp?",["En krets med kondensator i tilbakekoblingen som gir utgang proporsjonal med integralet av inngangen","En krets med to motstander","En spenningsfølger","En diode-krets"],"$V_o = -\\tfrac{1}{RC}\\int V_{inn}\\,dt$."]
);
MORE("ELEK",2,
 ["Hva er et båndpassfilter?",["Et filter som slipper gjennom frekvenser i et bestemt område","Et filter som stopper alle frekvenser","Et lavpassfilter","Et filter for likespenning"],"Det kan lages som høypass etterfulgt av lavpass."],
 ["Hva er signal–støy-forhold (SNR)?",["Forholdet mellom signaleffekt og støyeffekt, ofte i dB","Signalets frekvens","Forsterkningen","Båndbredden"],"$SNR_{dB} = 10\\log(P_s/P_n)$."]
);
GEN("ELEK",2,
 ()=>{ const r=R.p([10,100,1000,10000]); return [T(`Signaleffekten er ${r.toLocaleString("nb-NO")} ganger større enn støyeffekten. Hva er SNR i dB?`,`The signal power is ${r.toLocaleString("en-US")} times greater than the noise power. What is the SNR in dB?`),{n:10*Math.log10(r),tol:0.05,u:"dB"},`$10\\log_{10}(${r}) = ${mf(10*Math.log10(r),1)}$ dB.`]; }
);
MORE("PROD",0,
 ["Hva er en kravspesifikasjon?",["Et dokument med målbare krav produktet skal oppfylle","En salgsbrosjyre","En tegning av ferdig produkt","Et budsjett"],"Den brukes til å vurdere konsepter og verifisere det ferdige produktet."],
 ["Hva er en persona i produktutvikling?",["En fiktiv, men realistisk bruker som representerer en målgruppe","En ekte kunde","En konkurrent","En prosjektleder"],"Den hjelper teamet å holde fokus på brukerens behov."]
);
MORE("PROD",1,
 ["Hva er en funksjonell prototyp?",["En prototyp som tester om løsningen virker, uten fokus på utseende","En modell som bare viser utseendet","En ferdig serieprodusert enhet","En 3D-tegning"],"En «looks-like»-prototyp viser formen, en «works-like» viser funksjonen."]
);
MORE("PROD",2,
 ["Hva er DFM (Design for Manufacturing)?",["Å utforme deler slik at de er enkle og billige å produsere","Å designe for markedsføring","Å designe for gjenvinning","Å designe for montering"],"Eksempler er jevn godstykkelse og standardiserte hullmål."],
 ["Hvorfor bør godstykkelsen være jevn i sprøytestøpte deler?",["For å unngå synkemerker, vridning og indre spenninger","For å spare maling","For å øke vekten","Det spiller ingen rolle"],"Tykke partier kjøles saktere enn tynne."]
);
