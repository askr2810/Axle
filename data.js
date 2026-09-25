// Spørsmålsbank. Flervalg: [tekst, [RIKTIG, feil, feil, ...], forklaring]  (første alternativ er riktig; stokkes ved visning)
// Tallsvar: [tekst, {n: svar, tol: toleranse (absolutt), u: "enhet"}, forklaring]
// $...$ = matematikk (LaTeX), `...` = kode, ```...``` = kodeblokk
const COURSES = [
{ code:"MAPE1300", name:"Mekanikk", group:"Mekanikk og konstruksjon", units:[
 { title:"Statikk og likevekt", qs:[
  ["Hvilke betingelser må være oppfylt for at et stivt legeme i planet er i likevekt?",["$\\sum F_x=0,\\ \\sum F_y=0,\\ \\sum M=0$","Bare $\\sum F=0$","Bare $\\sum M=0$","$\\sum F = ma$"],"Både kraftsummen og momentsummen må være null. I planet gir det tre ligninger."],
  ["En kraft på 200 N virker vinkelrett på en momentarm på 0,5 m. Hva er momentet?",{n:100,tol:0.5,u:"Nm"},"$M = F\\cdot d = 200\\cdot 0{,}5 = 100$ Nm."],
  ["En fritt opplagt bjelke har lengde $L$ og en punktlast $P$ midt på. Hva er opplagerkreftene?",["$P/2$ i hver ende","$P$ i hver ende","$P$ i den ene, 0 i den andre","$PL/4$ i hver ende"],"Symmetri og $\\sum M=0$ gir at hvert opplager tar halve lasten. ($PL/4$ er maksimalt bøyemoment.)"],
  ["En kraft på 100 N peker 30° over horisontalen. Hva er den horisontale komponenten?",{n:86.6,tol:0.5,u:"N"},"$F_x = 100\\cos 30^\\circ \\approx 86{,}6$ N."],
  ["Hvor mange ukjente opplagerreaksjoner gir en fast innspenning i 2D?",["3","2","1","6"],"To krefter ($F_x$, $F_y$) og ett moment. I 3D blir det 6."],
  ["Et to-kraft-element (f.eks. en stav festet med bolter i begge ender, uten last imellom) har kraften rettet …",["langs linjen mellom festepunktene","vinkelrett på staven","alltid vertikalt","i vilkårlig retning"],"Med bare to krefter i likevekt må de være like store, motsatt rettet og ligge på samme linje."]
 ]},
 { title:"Fagverk og friksjon", qs:[
  ["Et knutepunkt i et fagverk har to staver som ikke ligger på linje, og ingen ytre last. Hva kan du si om stavkreftene?",["Begge er nullstaver","Begge har lik strekkraft","Den ene er i trykk, den andre i strekk","Det kan ikke avgjøres"],"Likevekt i to ikke-parallelle retninger krever at begge kreftene er null."],
  ["En kloss på 10 kg ligger på et horisontalt underlag med $\\mu_s = 0{,}4$. Hva er maks statisk friksjon? ($g = 9{,}81$ m/s²)",{n:39.24,tol:0.3,u:"N"},"$F_{maks} = \\mu_s N = 0{,}4\\cdot 10\\cdot 9{,}81 \\approx 39{,}2$ N."],
  ["Hvor ligger tyngdepunktet i en trekant, målt fra grunnlinjen?",["$h/3$","$h/2$","$2h/3$","$h/4$"],"Tyngdepunktet ligger der medianene møtes, en tredjedel av høyden over grunnlinjen."],
  ["Avhenger Coulomb-friksjon av størrelsen på kontaktflaten?",["Nei, bare av normalkraft og friksjonskoeffisient","Ja, større flate gir mer friksjon","Ja, større flate gir mindre friksjon","Bare for kinetisk friksjon"],"$F = \\mu N$. Kontaktarealet er ikke med i modellen."],
  ["Hva brukes snittmetoden til i fagverk?",["Finne kreftene i noen få utvalgte staver raskt","Finne tyngdepunktet","Beregne nedbøyning","Finne friksjonskoeffisienten"],"Du snitter gjennom inntil tre staver og bruker likevekt for den ene delen."]
 ]},
 { title:"Dynamikk", qs:[
  ["En bil akselererer jevnt fra 0 til 20 m/s på 5 s. Hva er akselerasjonen?",{n:4,tol:0.05,u:"m/s²"},"$a = \\Delta v/\\Delta t = 20/5 = 4$ m/s²."],
  ["En stein faller fritt fra ro i 2 s. Hvor stor er farten? ($g = 9{,}81$ m/s²)",{n:19.62,tol:0.1,u:"m/s"},"$v = gt = 9{,}81\\cdot 2 = 19{,}62$ m/s."],
  ["Hvis farten dobles, hva skjer med kinetisk energi?",["Den firedobles","Den dobles","Den halveres","Den er uendret"],"$E_k = \\tfrac12 mv^2$, så dobbel $v$ gir fire ganger så stor $E_k$."],
  ["Et legeme på 2 kg går i en sirkel med radius 0,5 m og fart 3 m/s. Hvor stor er sentripetalkraften?",{n:36,tol:0.2,u:"N"},"$F = mv^2/r = 2\\cdot 9/0{,}5 = 36$ N."],
  ["Impuls ($\\int F\\,dt$) er lik …",["endringen i bevegelsesmengde","endringen i kinetisk energi","arbeidet som er utført","effekten"],"Impulsloven: $\\int F\\,dt = \\Delta(mv)$."]
 ]}
]},
{ code:"MEK1300", name:"Programmering 1", group:"Programmering og data", units:[
 { title:"Grunnleggende Python", qs:[
  ["Hva skriver `print(7 // 2)` ut?",["3","3.5","4","1"],"`//` er heltallsdivisjon og runder ned."],
  ["Hva skriver `print(7 % 3)` ut?",["1","2","0","2.33"],"`%` gir resten: $7 = 2\\cdot 3 + 1$."],
  ["Hvilken type har uttrykket `3 / 2` i Python 3?",["float","int","str","decimal"],"`/` gir alltid float i Python 3 (1.5)."],
  ["Hva skriver koden ut?```x = [1, 2, 3]\nprint(x[-1])```",["3","1","-1","IndexError"],"Negative indekser teller bakfra; `-1` er siste element."],
  ["Hva blir `\"abc\" * 2`?",["\"abcabc\"","\"aabbcc\"","TypeError","\"abc2\""],"Å gange en streng med et heltall gjentar den."]
 ]},
 { title:"Løkker og betingelser", qs:[
  ["Hva skriver koden ut?```for i in range(2, 8, 2):\n    print(i, end=\" \")```",["2 4 6","2 4 6 8","2 3 4 5 6 7","0 2 4 6"],"`range(start, stopp, steg)`. Stopp-verdien er ikke med."],
  ["Hvor mange ganger kjører løkka?```n = 0\nwhile n < 10:\n    n += 3```",["4","3","10","Uendelig mange"],"n går 0 → 3 → 6 → 9 → 12. Løkka kjører 4 ganger."],
  ["Hva gir `[i**2 for i in range(4)]`?",["[0, 1, 4, 9]","[1, 4, 9, 16]","[0, 2, 4, 6]","[0, 1, 2, 3]"],"En listeforståelse over 0, 1, 2, 3 der hvert tall kvadreres."],
  ["Hvilket uttrykk er det samme som `x > 5 and x < 10`?",["`5 < x < 10`","`5 > x > 10`","`x in range(5, 10)`","`not (x < 5 or x > 10)`"],"Python støtter sammenkjedede sammenligninger. `range` er feil fordi den bare gjelder heltall og tar med 5."],
  ["Hva gjør `break` i en løkke?",["Avslutter løkka med en gang","Hopper til neste runde","Avslutter programmet","Starter løkka på nytt"],"`continue` hopper til neste runde, mens `break` går helt ut av løkka."]
 ]},
 { title:"Funksjoner og datastrukturer", qs:[
  ["Hva returnerer en funksjon som ikke har noen `return`-setning?",["None","0","En tom streng","Den gir en feil"],"Python returnerer `None` implisitt."],
  ["Hva returnerer `f(3)`?```def f(a, b=2):\n    return a * b```",["6","3","5","TypeError"],"`b` får standardverdien 2, så $3\\cdot 2 = 6$."],
  ["Hva skriver koden ut?```d = {\"a\": 1}\nd[\"b\"] = 2\nprint(len(d))```",["2","1","3","KeyError"],"Å tilordne en ny nøkkel legger den til i ordboka."],
  ["Hva er hovedforskjellen på en liste og en tuppel?",["En tuppel kan ikke endres etter at den er laget","En tuppel kan bare inneholde tall","En liste kan ikke inneholde duplikater","Det er ingen forskjell"],"Tupler er immutable. Lister er mutable."],
  ["Hva gjør `s.split(\",\")` når `s = \"a,b,c\"`?",["Gir ['a', 'b', 'c']","Gir 'abc'","Gir ('a', 'b', 'c')","Fjerner kommaene i `s`"],"`split` deler strengen ved skilletegnet og returnerer en liste."]
 ]}
]},
{ code:"MATS1600", name:"Mekanisk design", group:"Mekanikk og konstruksjon", units:[
 { title:"Spenning og dimensjonering", qs:[
  ["En stav med tverrsnitt 100 mm² belastes med 10 kN strekk. Hva er normalspenningen?",{n:100,tol:0.5,u:"MPa"},"$\\sigma = F/A = 10\\,000\\text{ N}/100\\text{ mm}^2 = 100$ N/mm² = 100 MPa."],
  ["Hvordan defineres sikkerhetsfaktoren mot flyt?",["$n = R_e/\\sigma_{faktisk}$","$n = \\sigma_{faktisk}/R_e$","$n = E/\\sigma$","$n = R_m - \\sigma$"],"Flytegrensen delt på den faktiske spenningen. $n > 1$ betyr margin."],
  ["Stål med $E = 210$ GPa har en spenning på 210 MPa. Hva er tøyningen, i promille?",{n:1,tol:0.02,u:"‰"},"$\\varepsilon = \\sigma/E = 210/210\\,000 = 0{,}001 = 1$ ‰."],
  ["Hva er arealtreghetsmomentet til et rektangel $b\\times h$ om den horisontale tyngdepunktsaksen?",["$bh^3/12$","$b^3h/12$","$bh^2/6$","$bh^3/3$"],"$I = bh^3/12$. Høyden inngår i tredje potens, derfor er høye bjelker stive. $bh^2/6$ er motstandsmomentet $W$."],
  ["Bøyespenning i en bjelke er størst …",["i ytterfibrene, lengst fra nøytralaksen","i nøytralaksen","like stor over hele tverrsnittet","ved opplagrene"],"$\\sigma = My/I$ vokser lineært med avstanden $y$ fra nøytralaksen."]
 ]},
 { title:"Toleranser og passninger", qs:[
  ["Hva slags passning er H7/g6?",["Klaringspassning","Presspassning","Overgangspassning","Krympepassning"],"g-akslinger er litt mindre enn nominelt mål, så det blir alltid klaring mot et H-hull."],
  ["Hva kjennetegner en presspassning?",["Akselen er større enn hullet","Hullet er større enn akselen","Begge har nøyaktig nominelt mål","Toleransen er null"],"Negativ klaring (overmål) gir grep ved friksjon."],
  ["I et H-hull (hullbasissystemet) er nedre grenseavvik …",["0","alltid negativt","lik toleransen","avhengig av akselen"],"H betyr at hullets minste mål er lik nominelt mål."],
  ["Hva angir Ra på en arbeidstegning?",["Overflateruhet","Radius","Aksialt spillerom","Materialets hardhet"],"Ra er det aritmetiske middelavviket for overflateprofilen, i µm."]
 ]},
 { title:"Maskinelementer", qs:[
  ["Et drivhjul med 20 tenner driver et hjul med 60 tenner. Hva skjer med turtallet?",["Det reduseres til 1/3","Det tredobles","Det er uendret","Det reduseres til 1/2"],"Utvekslingen er $i = 60/20 = 3$. Turtallet går ned 3 ganger og momentet opp omtrent 3 ganger."],
  ["En motor går med 1500 rpm gjennom en utveksling $i = 3$. Hva er utgående turtall?",{n:500,tol:1,u:"rpm"},"$n_2 = n_1/i = 1500/3 = 500$ rpm."],
  ["Et moment på 100 Nm overføres ved 300 rad/s. Hvor stor er effekten?",{n:30,tol:0.1,u:"kW"},"$P = M\\omega = 100\\cdot 300 = 30\\,000$ W = 30 kW."],
  ["Hvorfor forspenner man bolter?",["For at forbindelsen ikke skal glippe og for å redusere utmatting","For å gjøre bolten mykere","For å spare materiale","For å kunne skru den løs lettere"],"Forspenning holder delene i kontakt, slik at bolten ser mindre av den varierende lasten."],
  ["Hva er en fordel med rullelager (kulelager) sammenlignet med glidelager?",["Lav friksjon allerede ved oppstart","Tåler støt bedre","Er stillere ved svært høye turtall","Trenger aldri smøring"],"Rullende kontakt gir lav startfriksjon. Glidelagre trenger fart for å bygge opp en smørefilm."]
 ]}
]},
{ code:"MATS2100", name:"Termodynamikk", group:"Mekanikk og konstruksjon", units:[
 { title:"Grunnbegreper", qs:[
  ["Første hovedsetning for et lukket system (W = arbeid utført AV systemet):",["$\\Delta U = Q - W$","$\\Delta U = Q + W$","$\\Delta U = W - Q$","$\\Delta S = Q/T$"],"Tilført varme øker den indre energien, og arbeid systemet utfører senker den."],
  ["1 mol ideell gass har $p = 100$ kPa og $V = 0{,}025$ m³. Hva er temperaturen? ($R = 8{,}314$ J/(mol·K))",{n:300.7,tol:1,u:"K"},"$T = pV/(nR) = 2500/8{,}314 \\approx 301$ K."],
  ["Hva er $\\Delta U$ for en ideell gass i en isoterm prosess?",["0","$Q$","$-W$","$nRT$"],"For en ideell gass avhenger $U$ bare av $T$. Konstant $T$ gir $\\Delta U = 0$ og dermed $Q = W$."],
  ["En adiabatisk prosess kjennetegnes ved …",["$Q = 0$","$\\Delta T = 0$","$p$ er konstant","$V$ er konstant"],"Ingen varmeutveksling med omgivelsene."],
  ["Hva er 25 °C i kelvin?",{n:298.15,tol:0.2,u:"K"},"$T = 25 + 273{,}15 = 298{,}15$ K."]
 ]},
 { title:"Varme og entropi", qs:[
  ["Hvor mye varme trengs for å varme 2 kg vann fra 20 til 70 °C? ($c = 4{,}18$ kJ/(kg·K))",{n:418,tol:1,u:"kJ"},"$Q = mc\\Delta T = 2\\cdot 4{,}18\\cdot 50 = 418$ kJ."],
  ["Hva skjer med entropien i et isolert system?",["Den øker eller holder seg konstant","Den synker alltid","Den er alltid null","Den kan øke eller synke fritt"],"Andre hovedsetning: $\\Delta S_{isolert} \\geq 0$."],
  ["Carnot-virkningsgraden er …",["$1 - T_C/T_H$","$T_C/T_H$","$1 - T_H/T_C$","$W/Q_C$"],"Maksimal teoretisk virkningsgrad mellom to reservoarer, med temperaturer i kelvin."],
  ["En Carnot-maskin arbeider mellom 600 K og 300 K. Hva er virkningsgraden?",{n:50,tol:0.5,u:"%"},"$\\eta = 1 - 300/600 = 0{,}5 = 50$ %."],
  ["Entalpi er definert som …",["$H = U + pV$","$H = U - TS$","$H = Q/T$","$H = U - pV$"],"$U - TS$ er Helmholtz fri energi."]
 ]},
 { title:"Kretsprosesser", qs:[
  ["En varmepumpe leverer 4 kW varme og bruker 1 kW strøm. Hva er COP?",{n:4,tol:0.05,u:""},"$COP_{varme} = Q_H/W = 4/1 = 4$."],
  ["Rankine-prosessen er idealprosessen for …",["dampkraftverk","bensinmotorer","dieselmotorer","gassturbiner"],"Vann fordampes i kjelen, ekspanderer i turbinen, kondenseres og pumpes tilbake."],
  ["Otto-prosessen er idealprosessen for …",["bensinmotorer","dieselmotorer","kjøleskap","dampturbiner"],"Varme tilføres ved konstant volum (tenning). Diesel-prosessen tilfører varme ved konstant trykk."],
  ["I et kjøleskap flyttes varme fra kaldt til varmt. Hvorfor bryter ikke det andre hovedsetning?",["Det tilføres arbeid","Kuldemediet har negativ entropi","Prosessen er reversibel","Det bryter faktisk loven"],"Varme går ikke av seg selv fra kaldt til varmt, men det går an når man tilfører arbeid."]
 ]}
]},
{ code:"MEK1400", name:"Fysikk", group:"Matematikk og fysikk", units:[
 { title:"Svingninger og bølger", qs:[
  ["En fjær med $k = 200$ N/m bærer en masse på 0,5 kg. Hva er vinkelfrekvensen?",{n:20,tol:0.1,u:"rad/s"},"$\\omega = \\sqrt{k/m} = \\sqrt{400} = 20$ rad/s."],
  ["Hva er perioden til en matematisk pendel (små utslag)?",["$T = 2\\pi\\sqrt{L/g}$","$T = 2\\pi\\sqrt{g/L}$","$T = \\sqrt{L/g}$","$T = 2\\pi L/g$"],"Perioden avhenger ikke av massen."],
  ["En bølge har $f = 50$ Hz og $\\lambda = 2$ m. Hva er bølgefarten?",{n:100,tol:0.5,u:"m/s"},"$v = f\\lambda = 50\\cdot 2 = 100$ m/s."],
  ["Hvis du dobler lengden på en pendel, blir perioden …",["$\\sqrt 2$ ganger lengre","dobbelt så lang","fire ganger så lang","uendret"],"$T \\propto \\sqrt L$."]
 ]},
 { title:"Elektrisitet og magnetisme", qs:[
  ["To punktladninger på 1 µC står 1 m fra hverandre. Hvor stor er kraften mellom dem, i mN? ($k = 8{,}99\\cdot 10^9$)",{n:8.99,tol:0.05,u:"mN"},"$F = kq_1q_2/r^2 = 8{,}99\\cdot10^9\\cdot 10^{-12} = 8{,}99\\cdot 10^{-3}$ N."],
  ["Hvordan avtar det elektriske feltet fra en punktladning med avstanden?",["Som $1/r^2$","Som $1/r$","Som $1/r^3$","Det er konstant"],"$E = kq/r^2$."],
  ["Hvilken retning har magnetkraften på en ladning i bevegelse?",["Vinkelrett på både $\\vec v$ og $\\vec B$","Langs $\\vec v$","Langs $\\vec B$","Motsatt av $\\vec v$"],"$\\vec F = q\\vec v\\times\\vec B$. Kraften gjør derfor ikke arbeid."],
  ["Lenz' lov sier at den induserte strømmen …",["motvirker endringen i magnetisk fluks","forsterker endringen i fluks","alltid går med klokka","er proporsjonal med motstanden"],"Dette er minustegnet i Faradays lov: $\\varepsilon = -d\\Phi/dt$."]
 ]},
 { title:"Energi og rotasjon", qs:[
  ["Hvor mye arbeid kreves for å løfte 10 kg 3 m opp? ($g = 9{,}81$)",{n:294.3,tol:0.5,u:"J"},"$W = mgh = 10\\cdot 9{,}81\\cdot 3 = 294{,}3$ J."],
  ["Hva er treghetsmomentet til en massiv sylinder om symmetriaksen?",["$\\tfrac12 MR^2$","$MR^2$","$\\tfrac25 MR^2$","$\\tfrac13 ML^2$"],"$MR^2$ gjelder et tynt rør, og $\\tfrac25 MR^2$ en massiv kule."],
  ["En kunstløper trekker inn armene mens hun snurrer. Hvorfor går hun raskere rundt?",["Spinnet $L = I\\omega$ er bevart, og $I$ minker","Energien øker","Friksjonen minker","Tyngdekraften endres"],"Når $I$ minker og $L$ er konstant, må $\\omega$ øke."],
  ["Grønt lys har $f = 6\\cdot 10^{14}$ Hz. Hva er bølgelengden? ($c = 3\\cdot10^8$ m/s)",{n:500,tol:2,u:"nm"},"$\\lambda = c/f = 5\\cdot 10^{-7}$ m = 500 nm."],
  ["En motor utfører 600 J arbeid på 2 minutter. Hva er gjennomsnittseffekten?",{n:5,tol:0.05,u:"W"},"$P = W/t = 600/120 = 5$ W."]
 ]}
]},
{ code:"ELPE1300", name:"Elektriske kretser", group:"Elektro og automasjon", units:[
 { title:"Likestrøm", qs:[
  ["12 V ligger over en motstand på 4 Ω. Hvor stor er strømmen?",{n:3,tol:0.02,u:"A"},"Ohms lov: $I = U/R = 12/4 = 3$ A."],
  ["Tre motstander på 6 Ω kobles i parallell. Hva er den totale motstanden?",{n:2,tol:0.02,u:"Ω"},"$1/R = 3/6$, så $R = 2$ Ω."],
  ["En motstand på 10 Ω fører 2 A. Hvor stor effekt avsettes?",{n:40,tol:0.2,u:"W"},"$P = RI^2 = 10\\cdot 4 = 40$ W."],
  ["Kirchhoffs strømlov sier at …",["summen av strømmer inn i et knutepunkt er lik summen ut","summen av spenninger i en sløyfe er null","strøm er lik spenning delt på motstand","effekt er lik spenning ganger strøm"],"Det følger av at ladning er bevart. Sløyferegelen er spenningsloven (KVL)."],
  ["Spenningsdeler: 10 V over $R_1 = 1$ kΩ og $R_2 = 4$ kΩ i serie. Hva er spenningen over $R_2$?",{n:8,tol:0.05,u:"V"},"$U_2 = 10\\cdot 4/(1+4) = 8$ V."]
 ]},
 { title:"Kondensator og spole", qs:[
  ["Hva er tidskonstanten for en RC-krets med $R = 10$ kΩ og $C = 100$ µF?",{n:1,tol:0.01,u:"s"},"$\\tau = RC = 10^4\\cdot 10^{-4} = 1$ s."],
  ["Hvor mange prosent av sluttspenningen er en kondensator ladet opp til etter én tidskonstant?",["≈ 63 %","≈ 50 %","≈ 37 %","≈ 86 %"],"$1 - e^{-1} \\approx 0{,}632$."],
  ["Hvordan oppfører en ideell spole seg i en likestrømskrets i stasjonær tilstand?",["Som en kortslutning","Som et brudd","Som en motstand på 1 Ω","Som en kondensator"],"$u = L\\,di/dt = 0$ når strømmen er konstant."],
  ["Hvordan oppfører en kondensator seg i en likestrømskrets i stasjonær tilstand?",["Som et brudd","Som en kortslutning","Som en spole","Den lades ut hele tiden"],"$i = C\\,du/dt = 0$ når spenningen er konstant."]
 ]},
 { title:"Vekselstrøm", qs:[
  ["Hva er reaktansen til en kondensator på 100 µF ved 50 Hz?",{n:31.83,tol:0.1,u:"Ω"},"$X_C = 1/(2\\pi fC) = 1/(2\\pi\\cdot 50\\cdot 10^{-4}) \\approx 31{,}8$ Ω."],
  ["En sinusspenning har toppverdi 325 V. Hva er RMS-verdien?",{n:229.8,tol:1,u:"V"},"$U_{rms} = U_p/\\sqrt 2 \\approx 230$ V, altså vanlig nettspenning."],
  ["Med en rent induktiv last vil strømmen …",["ligge 90° etter spenningen","ligge 90° foran spenningen","være i fase med spenningen","ligge 180° etter"],"Huskeregel ELI the ICE man: i en induktiv last (L) kommer E før I."],
  ["Effektfaktoren $\\cos\\varphi$ er forholdet mellom …",["aktiv effekt og tilsynelatende effekt ($P/S$)","reaktiv og aktiv effekt","spenning og strøm","S og Q"],"Når $\\cos\\varphi = 1$ er lasten rent resistiv."]
 ]}
]},
{ code:"MEK1000", name:"Matematikk 1000", group:"Matematikk og fysikk", units:[
 { title:"Derivasjon", qs:[
  ["$\\dfrac{d}{dx}\\sin(2x) = $",["$2\\cos(2x)$","$\\cos(2x)$","$-2\\cos(2x)$","$2\\sin(2x)$"],"Kjerneregelen: den ytre deriverte ganger den indre deriverte (2)."],
  ["$\\dfrac{d}{dx}e^{x^2} = $",["$2x\\,e^{x^2}$","$e^{x^2}$","$x^2 e^{x^2-1}$","$e^{2x}$"],"Kjerneregelen med $u = x^2$."],
  ["Produktregelen: $(fg)' = $",["$f'g + fg'$","$f'g'$","$f'g - fg'$","$(f'g - fg')/g^2$"],"$(f'g - fg')/g^2$ er brøkregelen, for $(f/g)'$."],
  ["$f(x) = x^2 - 4x$. For hvilken $x$ har $f$ bunnpunkt?",{n:2,tol:0.01,u:""},"$f'(x) = 2x - 4 = 0$ gir $x = 2$, og $f'' = 2 > 0$."],
  ["$\\dfrac{d}{dx}\\ln x = $",["$1/x$","$\\ln x / x$","$e^x$","$x\\ln x - x$"],"$x\\ln x - x$ er integralet av $\\ln x$, ikke den deriverte."]
 ]},
 { title:"Integrasjon", qs:[
  ["$\\displaystyle\\int_0^{\\pi}\\sin x\\,dx = $",{n:2,tol:0.01,u:""},"$[-\\cos x]_0^{\\pi} = 1 - (-1) = 2$."],
  ["$\\displaystyle\\int \\frac1x\\,dx = $",["$\\ln|x| + C$","$-1/x^2 + C$","$x^0 + C$","$e^x + C$"],"Absoluttverditegnet gjør at formelen også gjelder for $x<0$."],
  ["$\\displaystyle\\int x e^x\\,dx = $",["$(x-1)e^x + C$","$xe^x + C$","$\\tfrac12 x^2 e^x + C$","$(x+1)e^x + C$"],"Delvis integrasjon med $u = x$ og $v' = e^x$."],
  ["Formelen for delvis integrasjon er $\\int u v'\\,dx = $",["$uv - \\int u'v\\,dx$","$uv + \\int u'v\\,dx$","$u'v' - \\int uv$","$\\int u\\,dx\\cdot\\int v'\\,dx$"],"Den kommer fra produktregelen."],
  ["$\\displaystyle\\int_0^2 3x^2\\,dx = $",{n:8,tol:0.01,u:""},"$[x^3]_0^2 = 8$."]
 ]},
 { title:"Grenser, rekker og komplekse tall", qs:[
  ["$\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x} = $",["1","0","∞","Grensen finnes ikke"],"Kan vises med L'Hôpital eller med $\\sin x \\approx x$ for små $x$."],
  ["Taylorrekken til $e^x$ om 0 er …",["$1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$","$x - \\frac{x^3}{3!} + \\dots$","$1 - \\frac{x^2}{2!} + \\dots$","$1 + x + x^2 + x^3 + \\dots$"],"Alle deriverte av $e^x$ er 1 i $x=0$. $x - x^3/3! + \\dots$ er rekken for $\\sin x$, og $1 + x + x^2 + \\dots$ er rekken for $1/(1-x)$."],
  ["$|3 + 4i| = $",{n:5,tol:0.01,u:""},"$\\sqrt{3^2+4^2} = 5$."],
  ["$e^{i\\pi} = $",["$-1$","$1$","$i$","$0$"],"Eulers formel: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$."],
  ["Når kan L'Hôpitals regel brukes?",["Ved $0/0$ eller $\\infty/\\infty$","Alltid","Bare ved polynomer","Ved $1/0$"],"Andre ubestemte former, som $0\\cdot\\infty$, må skrives om til en brøk først."]
 ]}
]},
{ code:"ELFT2500", name:"Innebygde systemer og instrumentering", group:"Elektro og automasjon", units:[
 { title:"Tallsystemer og digital logikk", qs:[
  ["Hva er `0x1F` i titallssystemet?",{n:31,tol:0,u:""},"$1\\cdot16 + 15 = 31$."],
  ["Hva er binærtallet `1010` i titallssystemet?",{n:10,tol:0,u:""},"$8 + 2 = 10$."],
  ["Hva er den største verdien et 8-bits heltall uten fortegn kan ha?",["255","256","127","128"],"$2^8 - 1 = 255$. 127 er maks med fortegn."],
  ["Hva sjekker `x & 0x01` i C?",["Om laveste bit er satt (om x er oddetall)","Om x er større enn 1","Om x er null","Om høyeste bit er satt"],"Bitvis OG med 1 maskerer bort alt unntatt bit 0."],
  ["En 10-bits ADC har referansespenning 5 V. Hvor stor er oppløsningen, i mV?",{n:4.88,tol:0.03,u:"mV"},"$5/2^{10} = 5/1024 \\approx 4{,}88$ mV per trinn."]
 ]},
 { title:"Mikrokontrollere", qs:[
  ["Et PWM-signal på 5 V har 25 % duty cycle. Hva er gjennomsnittsspenningen?",["1,25 V","2,5 V","3,75 V","5 V"],"$0{,}25\\cdot 5 = 1{,}25$ V."],
  ["Hvorfor bruker man en pull-up-motstand på en knappeinngang?",["Så inngangen har et definert høyt nivå når knappen er åpen","For å begrense strømmen til LED-en","For å øke frekvensen","For å beskytte mot overspenning"],"Uten den flyter inngangen og kan lese tilfeldige verdier."],
  ["Hvilke to linjer bruker I²C?",["SDA og SCL","MOSI og MISO","TX og RX","CS og CLK"],"Data og klokke, begge med pull-up. MOSI og MISO hører til SPI, og TX og RX til UART."],
  ["Hva er fordelen med avbrudd (interrupt) fremfor polling?",["CPU-en slipper å sjekke hele tiden og reagerer raskt på hendelser","Det er enklere å feilsøke","Det bruker flere pinner","Det gir høyere klokkefrekvens"],"En ISR kjører bare når hendelsen faktisk skjer."],
  ["UART er en …",["asynkron seriell protokoll","synkron parallell buss","trådløs protokoll","analog signaltype"],"UART har ingen felles klokke. Begge sider må være enige om baudraten."]
 ]},
 { title:"Måleteknikk", qs:[
  ["Nyquist-kriteriet sier at samplingsfrekvensen må være …",["større enn 2 ganger den høyeste frekvensen i signalet","lik signalfrekvensen","minst 10 ganger klokkefrekvensen","halvparten av signalfrekvensen"],"Ellers får du aliasing."],
  ["Et signal inneholder frekvenser opp til 1 kHz. Hva er minste teoretiske samplingsfrekvens?",{n:2,tol:0.01,u:"kHz"},"$f_s > 2f_{maks} = 2$ kHz. I praksis velger man godt over det."],
  ["Hva brukes en Wheatstone-bro typisk til?",["Å måle små motstandsendringer, f.eks. fra strekklapper","Å likerette vekselstrøm","Å forsterke digitale signaler","Å måle frekvens"],"Broen gjør små endringer i $\\Delta R$ om til en målbar differansespenning."],
  ["Et termoelement måler temperatur ved hjelp av …",["Seebeck-effekten","Hall-effekten","piezoelektrisitet","fotoelektrisk effekt"],"To ulike metaller gir en spenning som avhenger av temperaturforskjellen."],
  ["Målingene er tett samlet, men langt fra den sanne verdien. Da er de …",["presise, men ikke nøyaktige","nøyaktige, men ikke presise","både presise og nøyaktige","verken presise eller nøyaktige"],"Presisjon betyr lav spredning, nøyaktighet betyr liten systematisk feil."]
 ]}
]},
{ code:"MEK2000", name:"Matematikk 2000", group:"Matematikk og fysikk", units:[
 { title:"Matriser", qs:[
  ["$\\det\\begin{pmatrix}2&1\\\\3&4\\end{pmatrix} = $",{n:5,tol:0.01,u:""},"$2\\cdot 4 - 1\\cdot 3 = 5$."],
  ["En kvadratisk matrise $A$ er inverterbar hvis og bare hvis …",["$\\det A \\neq 0$","$\\det A = 0$","$A$ er symmetrisk","alle elementene er positive"],"Det er også ekvivalent med at kolonnene er lineært uavhengige."],
  ["$(AB)^T = $",["$B^TA^T$","$A^TB^T$","$BA$","$A^{-1}B^{-1}$"],"Rekkefølgen snus, akkurat som for inverser."],
  ["$(1, 2, 3)\\cdot(4, 5, 6) = $",{n:32,tol:0,u:""},"$4 + 10 + 18 = 32$."],
  ["En egenvektor $\\vec v \\neq \\vec 0$ til $A$ oppfyller …",["$A\\vec v = \\lambda\\vec v$","$A\\vec v = \\vec 0$","$A^T\\vec v = \\vec v$","$\\det(A\\vec v) = \\lambda$"],"$A$ bare skalerer $\\vec v$, med faktoren $\\lambda$."]
 ]},
 { title:"Lineære systemer og egenverdier", qs:[
  ["Hva er den største egenverdien til $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$?",{n:5,tol:0.01,u:""},"$\\lambda^2 - 7\\lambda + 10 = 0$ gir $\\lambda = 5$ og $2$."],
  ["Summen av egenverdiene til en matrise er lik …",["sporet (summen av diagonalen)","determinanten","rangen","antall rader"],"Produktet av egenverdiene er determinanten."],
  ["Et konsistent lineært system har flere ukjente enn ligninger. Hvor mange løsninger har det?",["Uendelig mange","Nøyaktig én","Ingen","Nøyaktig to"],"Det finnes minst én fri variabel."],
  ["Rangen til en matrise er …",["antall pivotelementer i trappeformen","antall rader","antall nullrader","determinanten"],"Rangen er også dimensjonen til kolonnerommet."],
  ["Hvis $\\det A = 0$, har $A\\vec x = \\vec 0$ …",["ikke-trivielle løsninger","bare løsningen $\\vec x = \\vec 0$","ingen løsning","nøyaktig to løsninger"],"Da er kolonnene lineært avhengige."]
 ]},
 { title:"Differensialligninger", qs:[
  ["Hva er den generelle løsningen av $y' = ky$?",["$y = Ce^{kx}$","$y = kx + C$","$y = C\\sin(kx)$","$y = Ce^{-x/k}$"],"Løses ved separasjon av variable."],
  ["Hva er den generelle løsningen av $y'' + y = 0$?",["$C_1\\cos x + C_2\\sin x$","$C_1e^x + C_2e^{-x}$","$Ce^{x}$","$C_1 + C_2x$"],"Den karakteristiske ligningen $r^2 + 1 = 0$ gir $r = \\pm i$."],
  ["Hva er den generelle løsningen av $y'' - 3y' + 2y = 0$?",["$C_1e^{x} + C_2e^{2x}$","$C_1e^{-x} + C_2e^{-2x}$","$(C_1 + C_2x)e^{x}$","$C_1\\cos 2x + C_2\\sin x$"],"$r^2 - 3r + 2 = (r-1)(r-2) = 0$."],
  ["$y' = -2y$ og $y(0) = 5$. Hva er $y(\\ln 2)$?",{n:1.25,tol:0.01,u:""},"$y = 5e^{-2x}$, så $y(\\ln 2) = 5\\cdot 2^{-2} = 1{,}25$."],
  ["Den karakteristiske ligningen har en dobbel rot $r$. Hvordan ser løsningen ut?",["$(C_1 + C_2x)e^{rx}$","$C_1e^{rx} + C_2e^{rx}$","$C e^{2rx}$","$C_1\\cos rx + C_2\\sin rx$"],"Den andre løsningen får en ekstra faktor $x$."]
 ]}
]},
{ code:"MEK2200", name:"Statistikk og risikoanalyse", group:"Matematikk og fysikk", units:[
 { title:"Sannsynlighet", qs:[
  ["Hva er sannsynligheten for å få to seksere på rad med en terning? (desimaltall)",{n:0.0278,tol:0.0005,u:""},"$1/36 \\approx 0{,}0278$."],
  ["$P(A\\cup B) = $",["$P(A) + P(B) - P(A\\cap B)$","$P(A) + P(B)$","$P(A)P(B)$","$P(A|B)P(B)$"],"Snittet må trekkes fra, ellers blir det telt to ganger."],
  ["To uavhengige komponenter i serie har pålitelighet 0,9 hver. Hva er systemets pålitelighet?",{n:0.81,tol:0.001,u:""},"Begge må virke: $0{,}9^2 = 0{,}81$."],
  ["To uavhengige komponenter i parallell har pålitelighet 0,9 hver. Hva er systemets pålitelighet?",{n:0.99,tol:0.001,u:""},"Det holder at én virker: $1 - 0{,}1^2 = 0{,}99$."],
  ["Bayes' formel: $P(A|B) = $",["$\\dfrac{P(B|A)P(A)}{P(B)}$","$\\dfrac{P(A)P(B)}{P(A\\cap B)}$","$P(B|A)$","$P(A)+P(B|A)$"],"Den brukes til å snu betingelsen."]
 ]},
 { title:"Fordelinger", qs:[
  ["I en normalfordeling ligger omtrent hvor mye av sannsynligheten innenfor $\\mu\\pm2\\sigma$?",["95 %","68 %","99,7 %","50 %"],"68–95–99,7-regelen for ±1, ±2 og ±3σ."],
  ["$X\\sim\\text{Bin}(n = 10, p = 0{,}5)$. Hva er $E[X]$?",{n:5,tol:0.01,u:""},"$E[X] = np = 5$."],
  ["Poissonfordelingen brukes typisk til å modellere …",["antall hendelser i et tidsintervall","levetid","høyde i en populasjon","andel defekte i et lite utvalg uten tilbakelegging"],"For eksempel antall feil per time. Levetid modelleres ofte med eksponential- eller Weibullfordeling."],
  ["Hva er gjennomsnittet av dataene 2, 4, 4, 4, 5, 5, 7, 9?",{n:5,tol:0.01,u:""},"Summen er 40, og $40/8 = 5$."],
  ["Hvordan henger standardavvik og varians sammen?",["$\\sigma = \\sqrt{\\text{Var}(X)}$","$\\sigma = \\text{Var}(X)^2$","$\\sigma = \\text{Var}(X)/n$","De er det samme"],"Standardavviket har samme enhet som dataene."]
 ]},
 { title:"Inferens og risiko", qs:[
  ["Hva er p-verdien?",["Sannsynligheten for et minst like ekstremt resultat, gitt at $H_0$ er sann","Sannsynligheten for at $H_0$ er sann","Sannsynligheten for at $H_1$ er sann","Signifikansnivået"],"En lav p-verdi betyr at dataene passer dårlig med $H_0$."],
  ["Hva er standardfeilen til gjennomsnittet?",["$\\sigma/\\sqrt n$","$\\sigma/n$","$\\sigma\\sqrt n$","$\\sigma^2/n$"],"Usikkerheten synker med $\\sqrt n$."],
  ["En type I-feil er å …",["forkaste en sann $H_0$","beholde en usann $H_0$","velge feil test","ha for lite data"],"Sannsynligheten for type I-feil er signifikansnivået $\\alpha$."],
  ["Et konfidensintervall blir bredere når …",["konfidensnivået øker","utvalget blir større","standardavviket minker","man bruker z i stedet for t"],"Høyere sikkerhet krever et større intervall."],
  ["I en risikomatrise defineres risiko ofte som …",["sannsynlighet × konsekvens","sannsynlighet + konsekvens","konsekvens / sannsynlighet","bare konsekvens"],"Da kan man prioritere tiltak mot det som både er sannsynlig og alvorlig."]
 ]}
]},
{ code:"ELVE3610", name:"Introduksjon til robotikk", group:"Elektro og automasjon", units:[
 { title:"Rotasjoner og transformasjoner", qs:[
  ["Hvilke egenskaper har en rotasjonsmatrise $R$?",["$R^T = R^{-1}$ og $\\det R = 1$","$R^T = R$ og $\\det R = 0$","$R^{-1} = -R$","Alle elementene er positive"],"Den er ortogonal og bevarer lengder og orientering."],
  ["En 4×4 homogen transformasjonsmatrise inneholder …",["en rotasjon og en translasjon","bare en rotasjon","bare en skalering","leddhastighetene"],"$T = \\begin{pmatrix}R & \\vec p\\\\ 0 & 1\\end{pmatrix}$."],
  ["Vektoren $(1, 0)$ roteres 90° mot klokka. Hva blir resultatet?",["$(0, 1)$","$(0, -1)$","$(-1, 0)$","$(1, 1)$"],"$R(90^\\circ) = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$."],
  ["Hvor mange Denavit–Hartenberg-parametere beskriver hvert ledd?",["4","3","6","2"],"$\\theta$, $d$, $a$ og $\\alpha$."]
 ]},
 { title:"Kinematikk", qs:[
  ["Hva er foroverkinematikk?",["Å finne verktøyets posisjon og orientering fra leddvinklene","Å finne leddvinklene fra verktøyets posisjon","Å beregne motormomentene","Å planlegge en bane"],"Å gå andre veien er inverskinematikk."],
  ["En planar 2-leddsarm har $L_1 = L_2 = 1$ m, $\\theta_1 = 0$ og $\\theta_2 = 90^\\circ$. Hvor langt er verktøyet fra basen?",{n:1.414,tol:0.01,u:"m"},"Verktøyet står i $(1, 1)$, så avstanden er $\\sqrt 2 \\approx 1{,}414$ m."],
  ["Hvorfor er inverskinematikk ofte vanskeligere enn foroverkinematikk?",["Det kan finnes flere løsninger, eller ingen","Den er alltid lineær","Den krever ikke trigonometri","Det finnes alltid nøyaktig én løsning"],"Et eksempel er albue opp eller albue ned."],
  ["Jacobimatrisen relaterer …",["leddhastigheter til verktøyets hastighet","leddvinkler til massene","posisjon til momenter","akselerasjon til temperatur"],"$\\dot{\\vec x} = J(\\vec q)\\,\\dot{\\vec q}$."],
  ["En singularitet oppstår når …",["Jacobimatrisen mister rang","roboten står stille","alle leddvinklene er null","motorene er overbelastet"],"Da mister roboten en bevegelsesretning."]
 ]},
 { title:"Robotsystemer", qs:[
  ["Hvor mange frihetsgrader trengs for å posisjonere og orientere et verktøy fritt i 3D?",["6","3","4","12"],"Tre for posisjon og tre for orientering."],
  ["SCARA-roboter egner seg særlig godt til …",["rask plukk-og-plasser i et plan","sveising av store karosserier","å gå i ulendt terreng","maling av tak"],"De er stive vertikalt og ettergivende horisontalt."],
  ["Hva er forskjellen på et revolutt og et prismatisk ledd?",["Revolutt roterer, prismatisk forskyves lineært","Revolutt forskyves, prismatisk roterer","Begge roterer","Begge er passive"],"De kalles ofte R- og P-ledd."],
  ["Hva måler en inkrementell enkoder på et robotledd?",["Endring i vinkelposisjon","Motortemperatur","Momentet","Strømforbruket"],"Den teller pulser. En absoluttenkoder gir vinkelen direkte."]
 ]}
]},
{ code:"MATS1500", name:"Materialteknologi", group:"Mekanikk og konstruksjon", units:[
 { title:"Struktur", qs:[
  ["Hvilken krystallstruktur har jern (ferritt) ved romtemperatur?",["BCC (romsentrert kubisk)","FCC (flatesentrert kubisk)","HCP","Amorf"],"Over ca. 912 °C blir jern FCC (austenitt)."],
  ["Hvilken krystallstruktur har aluminium?",["FCC","BCC","HCP","Tetragonal"],"FCC gir mange glidesystemer og dermed god duktilitet."],
  ["Hva skjer med fastheten når kornstørrelsen gjøres mindre?",["Den øker","Den synker","Den er uendret","Materialet blir flytende"],"Hall–Petch: korngrensene hindrer dislokasjoner."],
  ["Hvilket grunnstoff er det viktigste legeringselementet i karbonstål, i tillegg til jern?",["Karbon","Krom","Nikkel","Aluminium"],"Selv under 2 % karbon endrer egenskapene mye."]
 ]},
 { title:"Mekaniske egenskaper", qs:[
  ["Hva er strekkfastheten $R_m$?",["Den høyeste spenningen i spenning–tøyning-kurven","Spenningen der materialet begynner å flyte","Elastisitetsmodulen","Bruddtøyningen"],"$R_e$ eller $R_{p0,2}$ er flytegrensen."],
  ["Hva betyr $R_{p0,2}$?",["Spenningen som gir 0,2 % varig tøyning","Strekkfasthet ved 0,2 mm","Bruddspenning ved 20 °C","Hardhet på 0,2 HV"],"Den brukes når materialet ikke har en tydelig flytegrense."],
  ["Utmattingsbrudd skjer …",["ved varierende last, selv under flytegrensen","bare ved statisk last over $R_m$","bare ved høy temperatur","bare i sprø materialer"],"Sprekker vokser litt for hver lastsyklus."],
  ["Hvilken test måler seighet (slagenergi)?",["Charpy","Brinell","Vickers","Strekkprøving"],"En pendel slår av en prøvestav med kjerv, og man måler energien som går med."],
  ["Et duktilt materiale …",["deformeres plastisk mye før brudd","ryker uten plastisk deformasjon","har ingen flytegrense","er alltid hardt"],"Eksempler er kobber og konstruksjonsstål. Glass og støpejern er sprø."]
 ]},
 { title:"Varmebehandling og korrosjon", qs:[
  ["Hva dannes når stål bråkjøles fra austenitt?",["Martensitt","Perlitt","Ferritt","Sementitt"],"Martensitt er hard og sprø fordi karbonet blir fanget i gitteret."],
  ["Hvorfor anløper man stål etter herding?",["For å gjøre det mindre sprøtt, med litt lavere hardhet","For å gjøre det hardere","For å fjerne karbonet","For å øke kornstørrelsen"],"Man får et bedre kompromiss mellom seighet og hardhet."],
  ["To ulike metaller er i kontakt i en elektrolytt. Hvilket korroderer?",["Det minst edle (anoden)","Det mest edle","Begge like mye","Ingen av dem"],"Galvanisk korrosjon. Et eksempel er sinkanoder på båter."],
  ["Hva gjør stål rustfritt?",["Minst ca. 10,5 % krom, som danner et passivt oksidsjikt","Mye karbon","Et malingsbelegg","Mye nikkel alene"],"Cr₂O₃-sjiktet reparerer seg selv."],
  ["Hva er kryp?",["Tidsavhengig deformasjon under konstant last ved høy temperatur","Sprekkvekst ved syklisk last","Korrosjon i sjøvann","Rask avkjøling"],"Kryp er viktig i turbiner og kjeler."]
 ]}
]},
{ code:"MEK3100", name:"Programmering 2", group:"Programmering og data", units:[
 { title:"Objektorientering", qs:[
  ["Hva er `__init__` i en Python-klasse?",["Konstruktøren som kjører når et objekt opprettes","En privat variabel","Destruktøren","En statisk metode"],"Den setter opp objektets attributter."],
  ["Hva refererer `self` til i en metode?",["Objektet (instansen) metoden kalles på","Klassen selv","Foreldreklassen","Modulen"],"`obj.metode()` blir til `Klasse.metode(obj)`."],
  ["Hvordan lager du klassen `Hund` som arver fra `Dyr`?",["`class Hund(Dyr):`","`class Hund extends Dyr:`","`class Hund: Dyr`","`Hund = Dyr()`"],"Foreldreklassen står i parentes."],
  ["Hva er innkapsling?",["Å skjule intern tilstand bak et kontrollert grensesnitt","Å arve metoder","Å lage mange objekter","Å importere moduler"],"I Python brukes `_navn` som konvensjon for interne attributter."]
 ]},
 { title:"Algoritmer og datastrukturer", qs:[
  ["Hva er tidskompleksiteten til binærsøk i en sortert liste?",["$O(\\log n)$","$O(n)$","$O(1)$","$O(n^2)$"],"Søkeområdet halveres for hvert steg."],
  ["Hva er den gjennomsnittlige kostnaden ved oppslag i en Python-`dict`?",["$O(1)$","$O(n)$","$O(\\log n)$","$O(n\\log n)$"],"Den er implementert som en hashtabell."],
  ["En stakk (stack) følger prinsippet …",["LIFO: sist inn, først ut","FIFO: først inn, først ut","tilfeldig rekkefølge","sortert rekkefølge"],"En kø er FIFO."],
  ["Hva trenger en rekursiv funksjon for å stoppe?",["Et basistilfelle","En global variabel","En løkke","En `try`-blokk"],"Uten basistilfelle får du `RecursionError`."],
  ["Hva er den beste mulige kompleksiteten for sammenligningsbasert sortering?",["$O(n\\log n)$","$O(n)$","$O(\\log n)$","$O(n^2)$"],"Eksempler er mergesort og Pythons Timsort."]
 ]},
 { title:"Numerikk med NumPy", qs:[
  ["Hva gir `np.linspace(0, 1, 5)`?",["[0, 0.25, 0.5, 0.75, 1]","[0, 0.2, 0.4, 0.6, 0.8]","[0, 1, 2, 3, 4]","[0.2, 0.4, 0.6, 0.8, 1]"],"Fem jevnt fordelte punkter der begge endepunktene er med."],
  ["Hva gir koden?```a = np.array([1, 2, 3])\nprint(a * 2)```",["[2 4 6]","[1 2 3 1 2 3]","[1 4 9]","TypeError"],"NumPy regner elementvis. Med en vanlig liste ville du fått en gjentakelse."],
  ["Newtons metode: $x_{n+1} = $",["$x_n - f(x_n)/f'(x_n)$","$x_n + f(x_n)$","$x_n - f'(x_n)/f(x_n)$","$(x_n + f(x_n))/2$"],"Du følger tangenten ned til nullpunktet."],
  ["Eulers eksplisitte metode for $y' = f(t, y)$:",["$y_{n+1} = y_n + h\\,f(t_n, y_n)$","$y_{n+1} = y_n + f(t_n, y_n)$","$y_{n+1} = h\\,y_n$","$y_{n+1} = y_n - h\\,f'(y_n)$"],"Metoden har første ordens nøyaktighet. Halvert $h$ gir omtrent halvert feil."],
  ["Hva gjør `try` / `except`?",["Fanger og håndterer unntak (feil) mens programmet kjører","Tester koden automatisk","Gjentar koden til den lykkes","Importerer moduler trygt"],"`except ValueError:` fanger bare den feiltypen."]
 ]}
]},
{ code:"DAVE3700", name:"Matematikk 3000", group:"Matematikk og fysikk", units:[
 { title:"Partielle deriverte", qs:[
  ["$f(x, y) = x^2y$. Hva er $\\partial f/\\partial x$?",["$2xy$","$x^2$","$2x$","$2xy + x^2$"],"Behandle $y$ som en konstant."],
  ["Gradienten $\\nabla f$ peker i retningen der …",["$f$ øker raskest","$f$ er konstant","$f$ minker raskest","$f = 0$"],"$\\nabla f$ står vinkelrett på nivåkurvene."],
  ["$f = x^2 + y^2$. Hva er $|\\nabla f|$ i punktet $(3, 4)$?",{n:10,tol:0.01,u:""},"$\\nabla f = (6, 8)$, og lengden er 10."],
  ["Et kritisk punkt har $f_{xx} > 0$ og $D = f_{xx}f_{yy} - f_{xy}^2 > 0$. Hva slags punkt er det?",["Lokalt minimum","Lokalt maksimum","Sadelpunkt","Testen sier ingenting"],"Med $D < 0$ ville det vært et sadelpunkt."],
  ["Lagrange-metoden for ekstremum av $f$ under bibetingelsen $g = 0$:",["$\\nabla f = \\lambda\\nabla g$","$\\nabla f = 0$","$f = \\lambda g$","$\\nabla f\\cdot\\nabla g = 0$"],"Nivåkurvene til $f$ og $g$ tangerer hverandre."]
 ]},
 { title:"Multiple integraler", qs:[
  ["$\\displaystyle\\iint_{[0,1]\\times[0,1]} xy\\,dA = $",{n:0.25,tol:0.001,u:""},"$\\int_0^1 x\\,dx\\cdot\\int_0^1 y\\,dy = \\tfrac12\\cdot\\tfrac12 = \\tfrac14 = 0{,}25$."],
  ["Hva er arealelementet i polarkoordinater?",["$dA = r\\,dr\\,d\\theta$","$dA = dr\\,d\\theta$","$dA = r^2\\,dr\\,d\\theta$","$dA = \\sin\\theta\\,dr\\,d\\theta$"],"Faktoren $r$ er Jacobi-determinanten."],
  ["Hva er volumelementet i kulekoordinater?",["$\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\rho\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\rho^2\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$"],"$\\varphi$ måles fra $z$-aksen."],
  ["Hva er arealet av en sirkel med radius 2, regnet som $\\int_0^{2\\pi}\\!\\int_0^2 r\\,dr\\,d\\theta$?",{n:12.566,tol:0.01,u:""},"$2\\pi\\cdot 2 = 4\\pi \\approx 12{,}57$."]
 ]},
 { title:"Vektoranalyse", qs:[
  ["$\\nabla\\cdot(x, y, z) = $",{n:3,tol:0,u:""},"$1 + 1 + 1 = 3$."],
  ["$\\nabla\\times(\\nabla f) = $",["$\\vec 0$","$\\nabla^2 f$","$\\nabla f$","$1$"],"Et gradientfelt er virvelfritt."],
  ["Greens teorem knytter et linjeintegral rundt en lukket kurve til …",["et dobbeltintegral over området innenfor","et volumintegral","den deriverte i ett punkt","en uendelig rekke"],"$\\oint P\\,dx + Q\\,dy = \\iint (Q_x - P_y)\\,dA$."],
  ["$\\vec F = (y, x)$. Beregn $\\int_C\\vec F\\cdot d\\vec r$ fra $(0, 0)$ til $(1, 2)$.",{n:2,tol:0.01,u:""},"$\\vec F = \\nabla(xy)$ er konservativt, så svaret er $xy$ i endepunktet minus i startpunktet: $2 - 0$."],
  ["Et vektorfelt er konservativt (på et enkelt sammenhengende område) hvis …",["$\\nabla\\times\\vec F = \\vec 0$","$\\nabla\\cdot\\vec F = 0$","$|\\vec F|$ er konstant","$\\vec F$ er lineært"],"Da finnes en potensialfunksjon, og linjeintegralet er uavhengig av veien."]
 ]}
]},
{ code:"STKD6610", name:"Technology and Society II", group:"Samfunn og bærekraft", units:[
 { title:"Bærekraft", qs:[
  ["En livsløpsanalyse (LCA) vurderer miljøbelastningen …",["fra råvareuttak til avfallshåndtering","bare i bruksfasen","bare i produksjonen","bare ved gjenvinning"],"Man sier gjerne «fra vugge til grav»."],
  ["Hvor mange av FNs bærekraftsmål finnes det?",["17","10","8","21"],"De ble vedtatt i 2015 og har frist i 2030."],
  ["Sirkulær økonomi handler om å …",["holde materialer og produkter i bruk så lenge som mulig","produsere mest mulig","brenne avfall for energi","bruke bare fornybar energi"],"Stikkord er reparasjon, ombruk, gjenvinning og design for demontering."],
  ["Hva er en rebound-effekt?",["At effektivisering fører til mer bruk, slik at mye av gevinsten spises opp","At produkter returneres","At utslipp synker av seg selv","At et produkt blir resirkulert"],"Et eksempel: mer effektive biler kan føre til mer kjøring."],
  ["Hva omfatter scope 3-utslipp?",["Indirekte utslipp i verdikjeden, både oppstrøms og nedstrøms","Direkte utslipp fra egne kilder","Utslipp fra innkjøpt strøm","Bare transport"],"Scope 1 er direkte utslipp, scope 2 er kjøpt energi og scope 3 er resten av verdikjeden."]
 ]},
 { title:"Etikk og ansvar", qs:[
  ["Konsekvensetikk vurderer en handling ut fra …",["resultatene den fører til","om den følger en plikt","personens karakter","loven"],"Utilitarisme er et eksempel."],
  ["Pliktetikk (f.eks. Kant) vurderer en handling ut fra …",["om den følger en moralsk plikt eller regel, uansett utfall","hvor mye nytte den gir","hva flertallet mener","hva som er lønnsomt"],"Et eksempel er det kategoriske imperativ."],
  ["Hva er føre-var-prinsippet?",["Mangel på full vitenskapelig sikkerhet skal ikke brukes som grunn til å utsette tiltak mot alvorlig skade","Man skal alltid vente på mer data","Man skal velge den billigste løsningen","Man skal forsikre seg"],"Det brukes ofte i miljø- og helsespørsmål."],
  ["Hva betyr varsling i arbeidslivet?",["Å si fra om kritikkverdige forhold","Å gi beskjed om sykefravær","Å sende ut alarmer ved brann","Å rapportere til kunder"],"Arbeidsmiljøloven gir vern mot gjengjeldelse."],
  ["Dydsetikk legger vekt på …",["hvilken karakter og hvilke egenskaper en god person har","regler","konsekvenser","kontrakter"],"Den går tilbake til Aristoteles."]
 ]}
]},
{ code:"ELFT2400", name:"Kybernetikk", group:"Elektro og automasjon", units:[
 { title:"Laplace og overføringsfunksjoner", qs:[
  ["$\\mathcal L\\{e^{-at}\\} = $",["$\\dfrac{1}{s+a}$","$\\dfrac{1}{s-a}$","$\\dfrac{a}{s+a}$","$\\dfrac{s}{s^2+a^2}$"],"Dette er grunnleggende for førsteordens systemer."],
  ["Et førsteordens system $K/(\\tau s + 1)$ får et enhetssprang. Hva blir sluttverdien?",["$K$","$1$","$\\tau$","$K/\\tau$"],"Sett $s = 0$ i overføringsfunksjonen."],
  ["$\\tau = 2$ s. Hvor lang tid tar det før sprangresponsen når 63 % av sluttverdien?",{n:2,tol:0.01,u:"s"},"Det tar én tidskonstant, altså 2 s."],
  ["$G(s) = 5/(s+2)$ får et enhetssprang. Hva blir sluttverdien?",{n:2.5,tol:0.01,u:""},"$G(0) = 5/2 = 2{,}5$."],
  ["Når er et lineært system stabilt?",["Når alle poler ligger i venstre halvplan","Når alle nullpunkter ligger i høyre halvplan","Når det har en pol i origo","Når forsterkningen er under 1"],"Da har alle polene negativ realdel."]
 ]},
 { title:"PID-regulering", qs:[
  ["Hvilket ledd i en PID-regulator fjerner stasjonært avvik?",["I-leddet","P-leddet","D-leddet","Ingen av dem"],"Integralet vokser så lenge det finnes et avvik."],
  ["Hva gjør D-leddet?",["Reagerer på hvor fort avviket endrer seg, og demper","Fjerner stasjonært avvik","Øker forsterkningen ved lave frekvenser","Filtrerer måleverdien"],"Det er følsomt for støy og filtreres derfor ofte."],
  ["Hva skjer vanligvis hvis du øker P-forsterkningen mye?",["Systemet blir raskere, men får mer oversving og kan bli ustabilt","Systemet blir tregere","Det stasjonære avviket blir større","Ingenting"],"Det er et kompromiss mellom fart og stabilitet."],
  ["Hva er lukket-sløyfe-overføringsfunksjonen med $G$ forover og $H$ i tilbakekoblingen?",["$\\dfrac{G}{1 + GH}$","$\\dfrac{G}{1 - GH}$","$GH$","$\\dfrac{1}{1+G}$"],"Gjelder negativ tilbakekobling."],
  ["Hva er dempingsforholdet $\\zeta$ i $\\dfrac{16}{s^2 + 4s + 16}$?",{n:0.5,tol:0.01,u:""},"$\\omega_n = 4$ og $2\\zeta\\omega_n = 4$, så $\\zeta = 0{,}5$."]
 ]},
 { title:"Frekvensanalyse", qs:[
  ["Hva er $|G| = 0{,}1$ i desibel?",{n:-20,tol:0.1,u:"dB"},"$20\\log_{10}(0{,}1) = -20$ dB."],
  ["Hvor mye faller amplitudeforløpet i et Bodediagram etter én enkel pol?",["20 dB per dekade","40 dB per dekade","6 dB per dekade","10 dB per dekade"],"Det tilsvarer omtrent 6 dB per oktav."],
  ["Hva er fasemarginen?",["Hvor mye ekstra fasedreining sløyfen tåler ved 0 dB før den blir ustabil","Fasen ved $\\omega = 0$","Forsterkningen ved −180°","Tiden til oversving"],"Man sikter ofte mot 45–60°."],
  ["Hva brukes Ziegler–Nichols-metoden til?",["Å finne startverdier for PID-parametere","Å løse differensialligninger","Å tegne rotkurver","Å måle støy"],"Den bygger på kritisk forsterkning og periode, eller på sprangresponsen."]
 ]}
]},
{ code:"DAVE3705", name:"Matematikk 4000", group:"Matematikk og fysikk", isNew:true, units:[
 { title:"Laplacetransformasjonen", qs:[
  ["$\\mathcal L\\{1\\} = $",["$1/s$","$1$","$s$","$1/s^2$"],"$\\int_0^\\infty e^{-st}\\,dt = 1/s$ for $s > 0$."],
  ["$\\mathcal L\\{t\\} = $",["$1/s^2$","$1/s$","$2/s^3$","$s^2$"],"Generelt er $\\mathcal L\\{t^n\\} = n!/s^{n+1}$."],
  ["$\\mathcal L\\{f'(t)\\} = $",["$sF(s) - f(0)$","$sF(s)$","$F(s)/s$","$F'(s)$"],"Derfor gjør Laplace differensialligninger om til algebraiske ligninger."],
  ["$\\mathcal L\\{\\sin\\omega t\\} = $",["$\\dfrac{\\omega}{s^2+\\omega^2}$","$\\dfrac{s}{s^2+\\omega^2}$","$\\dfrac{1}{s+\\omega}$","$\\dfrac{\\omega}{s^2-\\omega^2}$"],"$\\dfrac{s}{s^2+\\omega^2}$ er transformen av $\\cos\\omega t$."],
  ["$\\mathcal L^{-1}\\left\\{\\dfrac{1}{s-3}\\right\\} = $",["$e^{3t}$","$e^{-3t}$","$\\sin 3t$","$3t$"],"Bruk $\\mathcal L\\{e^{at}\\} = 1/(s-a)$."],
  ["Delbrøkoppspalting: $\\dfrac{1}{s(s+1)} = $",["$\\dfrac1s - \\dfrac{1}{s+1}$","$\\dfrac1s + \\dfrac1{s+1}$","$\\dfrac{1}{s+1} - \\dfrac1s$","$\\dfrac{1}{s^2}$"],"Sjekk: $\\dfrac{(s+1) - s}{s(s+1)}$. Den inverse er $1 - e^{-t}$."]
 ]},
 { title:"Fourierrekker", qs:[
  ["En odde funksjon har en Fourierrekke med bare …",["sinusledd","cosinusledd","konstantledd","komplekse ledd"],"$\\sin$ er odde og $\\cos$ er like. Da blir $a_0 = a_n = 0$."],
  ["Hvilke harmoniske finnes i Fourierrekken til en symmetrisk firkantbølge?",["Bare odde harmoniske (1, 3, 5, …)","Bare like harmoniske","Alle harmoniske","Bare grunntonen"],"$\\frac4\\pi\\left(\\sin x + \\frac13\\sin 3x + \\frac15\\sin 5x + \\dots\\right)$."],
  ["Hva er Gibbs-fenomenet?",["Et oversving på ca. 9 % nær sprang som ikke forsvinner når flere ledd tas med","At rekken divergerer","At alle koeffisientene blir null","En fasefeil"],"Oversvinget flytter seg nærmere spranget, men blir ikke mindre."],
  ["For en $2L$-periodisk funksjon er $a_n = $",["$\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\frac{n\\pi x}{L}\\,dx$","$\\dfrac1{2L}\\displaystyle\\int_{-L}^{L} f(x)\\sin\\frac{n\\pi x}{L}\\,dx$","$\\displaystyle\\int_0^L f(x)\\,dx$","$\\dfrac{2}{L}\\displaystyle\\int_{-L}^{L} f(x)\\,dx$"],"Integranden med $\\sin$ gir $b_n$."],
  ["Hva sier Parsevals identitet?",["Energien i signalet er lik summen av kvadratene av koeffisientene (skalert)","At rekken alltid konvergerer","At $a_0 = 0$","At rekken er periodisk"],"$\\frac1L\\int_{-L}^{L} f^2\\,dx = \\frac{a_0^2}{2} + \\sum (a_n^2 + b_n^2)$."]
 ]},
 { title:"Partielle differensialligninger", qs:[
  ["Hvilken ligning er varmeligningen (i én dimensjon)?",["$u_t = c^2u_{xx}$","$u_{tt} = c^2u_{xx}$","$u_{xx} + u_{yy} = 0$","$u_t + cu_x = 0$"],"Den er av første orden i tid og beskriver diffusjon."],
  ["Hvilken ligning er bølgeligningen?",["$u_{tt} = c^2u_{xx}$","$u_t = c^2u_{xx}$","$u_{xx} = 0$","$u_t = u$"],"Den er av andre orden i tid, og forstyrrelser forplanter seg med farten $c$."],
  ["Ved separasjon av variable antar man at …",["$u(x, t) = X(x)\\,T(t)$","$u = X + T$","$u = e^{x+t}$","$u$ er konstant"],"Da får man to ordinære differensialligninger koblet sammen med en separasjonskonstant."],
  ["Hvordan oppfører mode $n$ seg i løsningen av varmeligningen på $[0, L]$ med $u = 0$ i endene?",["Den avtar som $e^{-c^2(n\\pi/L)^2t}$","Den svinger uten demping","Den vokser eksponentielt","Den er konstant"],"Høye moder dør raskt ut, og derfor glattes profilen."],
  ["Laplaces ligning $\\nabla^2u = 0$ beskriver typisk …",["en stasjonær (tidsuavhengig) tilstand","en bølge","varmeledning i starten","støt"],"Et eksempel er stasjonær temperaturfordeling eller et potensialfelt."],
  ["Systemet $\\vec x' = A\\vec x$ er asymptotisk stabilt når …",["alle egenverdiene til $A$ har negativ realdel","$\\det A > 0$","$A$ er symmetrisk","sporet er positivt"],"Løsningene er kombinasjoner av $e^{\\lambda t}\\vec v$."]
 ]}
]}
];
