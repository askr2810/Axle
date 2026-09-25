// Flere oppgaver, del 2 (bruker UNIT/gcd/C_ fra more2.js)
// ================= ELFT2500 =================
GEN("ELFT2500",0,
 ()=>{ const v=R.i(-128,-1); const b=(v+256).toString(16).toUpperCase().padStart(2,"0");
   return [T(`Et 8-bits heltall med fortegn (toerkomplement) har verdien \`0x${b}\`. Hvilket tall er det?`,`An 8-bit signed integer (two's complement) has the value \`0x${b}\`. What number is it?`),{n:v,tol:0,u:""},T(`\`0x${b}\` = ${v+256}. Siden øverste bit er 1, trekker vi fra 256: $${v+256} - 256 = ${v}$.`,`\`0x${b}\` = ${v+256}. Since the top bit is 1, we subtract 256: $${v+256} - 256 = ${v}$.`)]; },
 ()=>{ const n=R.i(0,7), op=R.p(["<<",">>"]); const x=op==="<<"?1:R.p([64,128,200,255]); const v=op==="<<"?(1<<n):(x>>n);
   return [T(`Hva er verdien av \`${x} ${op} ${n}\`?`,`What is the value of \`${x} ${op} ${n}\`?`),{n:v,tol:0,u:""},op==="<<"?T(`Venstreskift med ${n} er å gange med $2^{${n}}$: ${v}.`,`A left shift by ${n} is multiplication by $2^{${n}}$: ${v}.`):T(`Høyreskift med ${n} er heltallsdivisjon med $2^{${n}}$: ${v}.`,`A right shift by ${n} is integer division by $2^{${n}}$: ${v}.`)]; },
 ()=>{ const a=R.i(0,255), b=R.i(0,255), op=R.p(["&","|","^"]); const v=op==="&"?a&b:op==="|"?a|b:a^b;
   const expr=`\`0x${a.toString(16).toUpperCase().padStart(2,"0")} ${op} 0x${b.toString(16).toUpperCase().padStart(2,"0")}\``, bits=`\`${a.toString(2).padStart(8,"0")}\` ${op} \`${b.toString(2).padStart(8,"0")}\` = \`${v.toString(2).padStart(8,"0")}\` = ${v}.`;
   return [T(`Hva er ${expr} i titallssystemet?`,`What is ${expr} in decimal?`),{n:v,tol:0,u:""},T(`Bitvis ${op==="&"?"OG":op==="|"?"ELLER":"XOR"}: ${bits}`,`Bitwise ${op==="&"?"AND":op==="|"?"OR":"XOR"}: ${bits}`)]; }
);
GEN("ELFT2500",1,
 ()=>{ const f=R.p([8,16,48]), ps=R.p([1,8,64,256,1024]), top=R.p([255,1000,65535]); const Tp=(top+1)*ps/(f*1e6)*1000;
   return [T(`En timer drives av en klokke på ${f} MHz med prescaler ${ps} og teller fra 0 til ${top}. Hvor lang er perioden mellom hver overflyt?`,`A timer is clocked at ${f} MHz with prescaler ${ps} and counts from 0 to ${top}. How long is the period between overflows?`),{n:Tp,tol:rel(Tp),u:"ms"},`$(${top}+1)\\cdot ${ps}/(${f}\\cdot10^6) \\approx ${mf(Tp,4)}$ ms.`]; },
 ()=>{ const Vcc=R.p([3.3,5,12]), Vf=R.p([1.8,2,2.2,3]), I=R.p([5,10,15,20]); if(Vf>=Vcc) return [T(`En LED med 2 V spenningsfall skal få 10 mA fra 5 V. Hvilken seriemotstand trengs?`,`An LED with a 2 V voltage drop should get 10 mA from 5 V. What series resistor is needed?`),{n:300,tol:1,u:"Ω"},T(`$(5 - 2)/0{,}01 = 300$ Ω.`,`$(5 - 2)/0.01 = 300$ Ω.`)];
   const Rr=(Vcc-Vf)/(I/1000);
   return [T(`En LED med ${nf(Vf,1)} V spenningsfall skal få ${I} mA fra ${nf(Vcc,1)} V. Hvilken seriemotstand trengs?`,`An LED with a ${nf(Vf,1)} V voltage drop should get ${I} mA from ${nf(Vcc,1)} V. What series resistor is needed?`),{n:Rr,tol:rel(Rr),u:"Ω"},`$R = (${mf(Vcc,1)} - ${mf(Vf,1)})/${mf(I/1000,3)} \\approx ${mf(Rr,0)}$ Ω.`]; }
);
GEN("ELFT2500",2,
 ()=>{ const GF=R.p([2,2.1]), eps=R.p([100,200,500,1000]), R0=R.p([120,350]); const dR=GF*eps*1e-6*R0*1000;
   return [T(`En strekklapp har $R = ${R0}$ Ω og gauge factor ${nf(GF,1)}. Tøyningen er ${eps} µm/m. Hvor stor er motstandsendringen, i mΩ?`,`A strain gauge has $R = ${R0}$ Ω and gauge factor ${nf(GF,1)}. The strain is ${eps} µm/m. What is the change in resistance, in mΩ?`),{n:dR,tol:rel(dR),u:"mΩ"},`$\\Delta R = GF\\cdot\\varepsilon\\cdot R = ${mf(GF,1)}\\cdot ${eps}\\cdot10^{-6}\\cdot ${R0} \\approx ${mf(dR,1)}$ mΩ.`]; },
 ()=>{ const n=R.p([8,10,12]), V=R.p([3.3,5]); const q=V/2**n/2*1000;
   return [T(`Hva er maksimal kvantiseringsfeil (±½ LSB) for en ${n}-bits ADC med ${nf(V,1)} V referanse, i mV?`,`What is the maximum quantization error (±½ LSB) of an ADC with ${n}-bit resolution and a ${nf(V,1)} V reference, in mV?`),{n:q,tol:rel(q),u:"mV"},`$\\tfrac12\\cdot ${mf(V,1)}/2^{${n}} \\approx ${mf(q,3)}$ mV.`]; }
);
MORE("ELFT2500",2,
 ["Hva er en RTD, f.eks. PT100?",["En temperaturføler der motstanden øker med temperaturen (100 Ω ved 0 °C)","En trykkføler","Et termoelement","En lysføler"],"PT100 har ca. 0,385 Ω/°C."],
 ["Hvorfor bruker man et anti-aliasing-filter foran en ADC?",["For å fjerne frekvenser over halve samplingsfrekvensen","For å forsterke signalet","For å redusere strømforbruket","For å gjøre signalet digitalt"],"Et lavpassfilter før sampling."],
 ["Hva betyr det at en sensor har hysterese?",["Utgangen avhenger av om målestørrelsen øker eller minker","Sensoren er lineær","Sensoren er rask","Sensoren er digital"],"Den gir ulik verdi for samme inngang på vei opp og ned."]
);

// ================= MEK2000 =================
GEN("MEK2000",0,
 ()=>{ const t=R.p([[1,2,2,3],[2,3,6,7],[1,4,8,9],[2,6,9,11],[4,4,7,9]]); const s=R.p([1,-1]);
   return [T(`Hva er lengden av vektoren $(${t[0]}, ${s*t[1]}, ${t[2]})$?`,`What is the length of the vector $(${t[0]}, ${s*t[1]}, ${t[2]})$?`),{n:t[3],tol:0.01,u:""},`$\\sqrt{${t[0]**2} + ${t[1]**2} + ${t[2]**2}} = \\sqrt{${t[3]**2}} = ${t[3]}$.`]; },
 ()=>{ const d=[R.i(-4,4),R.i(-4,4),R.i(-4,4)], o=[R.i(-5,5),R.i(-5,5),R.i(-5,5)];
   return [`$\\det\\begin{pmatrix}${d[0]}&${o[0]}&${o[1]}\\\\0&${d[1]}&${o[2]}\\\\0&0&${d[2]}\\end{pmatrix} = $`,{n:d[0]*d[1]*d[2],tol:0,u:""},T(`Trekantmatrise: produktet av diagonalen, $${d[0]}\\cdot ${d[1]}\\cdot ${d[2]} = ${d[0]*d[1]*d[2]}$.`,`Triangular matrix: the product of the diagonal, $${d[0]}\\cdot ${d[1]}\\cdot ${d[2]} = ${d[0]*d[1]*d[2]}$.`)]; }
);
GEN("MEK2000",1,
 ()=>{ let a,b,c,d; do{ [a,b,c,d]=[R.i(-4,5),R.i(-4,5),R.i(-4,5),R.i(-4,5)]; }while(a*d-b*c===0); const x=R.i(-5,5), y=R.i(-5,5); const e=a*x+b*y, f=c*x+d*y; const Q=R.p(["x","y"]);
   const t=(p,q)=>`${cf(p)}x ${q<0?"-":"+"} ${cf(Math.abs(q))}y`;
   const sys=`$\\begin{cases}${t(a,b)} = ${e}\\\\ ${t(c,d)} = ${f}\\end{cases}$`;
   return [T(`Løs systemet ${sys}. Hva er $${Q}$?`,`Solve the system ${sys}. What is $${Q}$?`),{n:Q==="x"?x:y,tol:0.001,u:""},T(`Løsningen er $x = ${x}$, $y = ${y}$ (determinanten er $${a*d-b*c} \\neq 0$, så løsningen er entydig).`,`The solution is $x = ${x}$, $y = ${y}$ (the determinant is $${a*d-b*c} \\neq 0$, so the solution is unique).`)]; }
);
GEN("MEK2000",2,
 ()=>{ const a=R.i(1,20), b=R.p([0.5,1,2,4,5]); return [T(`Hva er likevektsløsningen (stasjonær verdi) til $y' = ${a} - ${mf(b)}y$?`,`What is the equilibrium solution (steady-state value) of $y' = ${a} - ${mf(b)}y$?`),{n:a/b,tol:0.01,u:""},T(`$y' = 0$ gir $y = ${a}/${mf(b)} = ${mf(a/b,3)}$. Alle løsninger går mot denne.`,`$y' = 0$ gives $y = ${a}/${mf(b)} = ${mf(a/b,3)}$. All solutions tend toward this value.`)]; },
 ()=>{ const r=R.i(1,4), s=R.p([-1,1]); const rr=s*r;
   return [T(`Karakteristisk ligning har dobbel rot $r = ${rr}$. Hva er den generelle løsningen?`,`The characteristic equation has a double root $r = ${rr}$. What is the general solution?`),[`$(C_1 + C_2x)e^{${cf(rr)}x}$`,`$C_1e^{${cf(rr)}x} + C_2e^{${cf(-rr)}x}$`,`$C_1\\cos ${r}x + C_2\\sin ${r}x$`,`$C e^{${cf(2*rr)}x}$`],T(`Ved dobbel rot får den andre løsningen en ekstra faktor $x$.`,`With a double root, the second solution gets an extra factor $x$.`)]; }
);

// ================= MEK2200 =================
GEN("MEK2200",0,
 ()=>{ const n=R.i(4,12), k=R.i(2,Math.min(5,n-1)); return [T(`På hvor mange måter kan du velge ${k} av ${n} komponenter når rekkefølgen ikke betyr noe?`,`In how many ways can you choose ${k} of ${n} components when the order does not matter?`),{n:C_(n,k),tol:0,u:""},`$\\binom{${n}}{${k}} = ${C_(n,k)}$.`]; },
 ()=>{ const p=R.p([0.01,0.02,0.05,0.1]), n=R.i(2,20); const v=1-(1-p)**n;
   return [T(`Hver av ${n} uavhengige komponenter er defekt med sannsynlighet ${nf(p)}. Hva er sannsynligheten for at minst én er defekt?`,`Each of ${n} independent components is defective with probability ${nf(p)}. What is the probability that at least one is defective?`),{n:v,tol:0.002,u:""},`$1 - (1 - ${mf(p)})^{${n}} \\approx ${mf(v,4)}$.`]; },
 ()=>{ const n=R.i(3,7); const f=[1,1,2,6,24,120,720,5040][n];
   return [T(`På hvor mange måter kan ${n} ulike deler monteres i rekkefølge?`,`In how many ways can ${n} different parts be assembled in sequence?`),{n:f,tol:0,u:""},`$${n}! = ${f}$.`]; }
);
GEN("MEK2200",1,
 ()=>{ const mt=R.p([100,500,1000,2000]), t=R.p([50,100,200,500,1000]); const v=Math.exp(-t/mt);
   return [T(`Levetiden er eksponentialfordelt med forventning ${mt} timer. Hva er sannsynligheten for at komponenten varer mer enn ${t} timer?`,`The lifetime is exponentially distributed with mean ${mt} hours. What is the probability that the component lasts more than ${t} hours?`),{n:v,tol:0.002,u:""},`$P(T > t) = e^{-t/${mt}} = e^{-${mf(t/mt,3)}} \\approx ${mf(v,4)}$.`]; },
 ()=>{ const xs=Array.from({length:R.i(4,6)},()=>R.i(1,12)); const m=xs.reduce((a,b)=>a+b,0)/xs.length; const s2=xs.reduce((a,x)=>a+(x-m)**2,0)/(xs.length-1);
   return [T(`Hva er utvalgsvariansen $s^2$ (med $n-1$) av ${xs.join(", ")}?`,`What is the sample variance $s^2$ (with $n-1$) of ${xs.join(", ")}?`),{n:s2,tol:rel(s2,0.005,0.01),u:""},T(`$\\bar x = ${mf(m,3)}$, og $s^2 = \\sum(x_i - \\bar x)^2/(n-1) \\approx ${mf(s2,3)}$.`,`$\\bar x = ${mf(m,3)}$, and $s^2 = \\sum(x_i - \\bar x)^2/(n-1) \\approx ${mf(s2,3)}$.`)]; },
 ()=>{ const z=R.p([[1,0.6827],[2,0.9545],[3,0.9973]]); return [T(`Hva er $P(|Z| < ${z[0]})$ når $Z\\sim N(0,1)$? (fire desimaler)`,`What is $P(|Z| < ${z[0]})$ when $Z\\sim N(0,1)$? (four decimal places)`),{n:z[1],tol:0.001,u:""},T(`${z[0]}σ-regelen: omtrent ${nf(z[1]*100,2)} %.`,`The ${z[0]}σ rule: about ${nf(z[1]*100,2)} %.`)]; }
);
GEN("MEK2200",2,
 ()=>{ const mtbf=R.p([500,1000,2000,5000]), mttr=R.p([2,5,10,24,48]); const A=mtbf/(mtbf+mttr);
   return [T(`Et system har MTBF = ${mtbf} h og MTTR = ${mttr} h. Hva er tilgjengeligheten?`,`A system has MTBF = ${mtbf} h and MTTR = ${mttr} h. What is the availability?`),{n:A,tol:0.0005,u:""},`$A = \\dfrac{MTBF}{MTBF + MTTR} = ${mtbf}/${mtbf+mttr} \\approx ${mf(A,4)}$.`]; },
 ()=>{ const mtbf=R.p([200,500,1000,4000]); return [T(`En komponent har MTBF ${mtbf} timer (konstant feilrate). Hva er feilraten $\\lambda$ per 1000 timer?`,`A component has an MTBF of ${mtbf} hours (constant failure rate). What is the failure rate $\\lambda$ per 1000 hours?`),{n:1000/mtbf,tol:0.01,u:""},T(`$\\lambda = 1/MTBF = ${mf(1/mtbf,5)}$ per time, altså ${nf(1000/mtbf,2)} per 1000 timer.`,`$\\lambda = 1/MTBF = ${mf(1/mtbf,5)}$ per hour, i.e. ${nf(1000/mtbf,2)} per 1000 hours.`)]; }
);
MORE("MEK2200",1,
 ["Hva sier sentralgrenseteoremet?",["Gjennomsnittet av mange uavhengige målinger blir tilnærmet normalfordelt","Alle data er normalfordelte","Variansen går mot null","Medianen er lik gjennomsnittet"],"Det gjelder uansett den opprinnelige fordelingen, gitt endelig varians."],
 ["Hva måler korrelasjonskoeffisienten $r$?",["Styrken på den lineære sammenhengen mellom to variabler","Årsakssammenheng","Gjennomsnittet","Stigningstallet i regresjonen"],"$r$ ligger mellom −1 og 1. Korrelasjon er ikke kausalitet."]
);

// ================= ELVE3610 =================
GEN("ELVE3610",0,
 ()=>{ const px=R.i(-3,3), py=R.i(-3,3), x=R.i(-3,3), y=R.i(-3,3);
   return [T(`En ramme er rotert 90° mot klokka og forskjøvet $(${px}, ${py})$ i forhold til basen. Et punkt har koordinatene $(${x}, ${y})$ i den nye rammen. Hva er y-koordinaten i basisrammen?`,`A frame is rotated 90° counterclockwise and translated by $(${px}, ${py})$ relative to the base. A point has coordinates $(${x}, ${y})$ in the new frame. What is its y-coordinate in the base frame?`),{n:py+x,tol:0,u:""},T(`$R(90^\\circ)(${x}, ${y}) = (${-y}, ${x})$, pluss translasjon gir $(${px-y}, ${py+x})$.`,`$R(90^\\circ)(${x}, ${y}) = (${-y}, ${x})$, and adding the translation gives $(${px-y}, ${py+x})$.`)]; }
);
GEN("ELVE3610",1,
 ()=>{ const L=R.f(0.2,2,0.1), w=R.f(0.5,5,0.5); return [T(`Et ledd på ${nf(L)} m roterer med ${nf(w)} rad/s. Hvor stor fart har enden?`,`A ${nf(L)} m link rotates at ${nf(w)} rad/s. What is the speed of its end?`),{n:L*w,tol:rel(L*w),u:"m/s"},`$v = L\\omega = ${mf(L)}\\cdot ${mf(w)} = ${mf(L*w)}$ m/s.`]; },
 ()=>{ const L1=R.p([0.5,1,1.5]), L2=R.p([0.3,0.5,1]); const d=R.f(0.1,3,0.1); const ok=d<=L1+L2 && d>=Math.abs(L1-L2);
   const EN={"Ja":"Yes","Nei, det er for langt unna":"No, it is too far away","Nei, det er for nær basen":"No, it is too close to the base"};
   return [T(`En planar 2-leddsarm har $L_1 = ${mf(L1,1)}$ m og $L_2 = ${mf(L2,1)}$ m. Kan verktøyet nå et punkt ${nf(d)} m fra basen?`,`A planar 2-link arm has $L_1 = ${mf(L1,1)}$ m and $L_2 = ${mf(L2,1)}$ m. Can the tool reach a point ${nf(d)} m from the base?`),(ok?["Ja","Nei, det er for langt unna","Nei, det er for nær basen"]:(d>L1+L2?["Nei, det er for langt unna","Ja","Nei, det er for nær basen"]:["Nei, det er for nær basen","Ja","Nei, det er for langt unna"])).map(o=>T(o,EN[o])),T(`Arbeidsområdet er en ring med radier $|L_1 - L_2| = ${mf(Math.abs(L1-L2),1)}$ og $L_1 + L_2 = ${mf(L1+L2,1)}$ m.`,`The workspace is an annulus with radii $|L_1 - L_2| = ${mf(Math.abs(L1-L2),1)}$ and $L_1 + L_2 = ${mf(L1+L2,1)}$ m.`)]; }
);
GEN("ELVE3610",2,
 ()=>{ const m=R.f(0.5,10,0.5), L=R.f(0.2,1.5,0.1); const Tq=m*G_*L;
   return [T(`En robotarm holder en last på ${nf(m)} kg horisontalt ${nf(L)} m fra skulderleddet. Hvor stort moment må leddet holde (se bort fra armens egen vekt)?`,`A robot arm holds a load of ${nf(m)} kg horizontally ${nf(L)} m from the shoulder joint. What torque must the joint hold (ignore the weight of the arm itself)?`),{n:Tq,tol:rel(Tq),u:"Nm"},T(`$\\tau = mgL = ${mf(m)}\\cdot 9{,}81\\cdot ${mf(L)} \\approx ${mf(Tq,2)}$ Nm.`,`$\\tau = mgL = ${mf(m)}\\cdot 9.81\\cdot ${mf(L)} \\approx ${mf(Tq,2)}$ Nm.`)]; },
 ()=>{ const Tm=R.f(0.1,2,0.1), i=R.p([10,50,100,160]), eta=R.p([0.7,0.8,0.9]); const Tq=Tm*i*eta;
   return [T(`En motor gir ${nf(Tm)} Nm gjennom et gir med utveksling ${i}:1 og virkningsgrad ${nf(eta*100)} %. Hvor stort moment får leddet?`,`A motor delivers ${nf(Tm)} Nm through a gearbox with gear ratio ${i}:1 and efficiency ${nf(eta*100)} %. What torque does the joint get?`),{n:Tq,tol:rel(Tq),u:"Nm"},`$${mf(Tm)}\\cdot ${i}\\cdot ${mf(eta)} = ${mf(Tq,1)}$ Nm.`]; }
);
MORE("ELVE3610",1,
 ["Hva er forskjellen på ledd-interpolert og lineær (kartesisk) bevegelse?",["Ledd-interpolert gir krum bane for verktøyet; lineær holder verktøyet på en rett linje","Det er ingen forskjell","Lineær er alltid raskere","Ledd-interpolert bruker bare ett ledd"],"I ABB-roboter heter de MoveJ og MoveL."],
 ["Hva er redundans i en robotarm?",["Flere frihetsgrader enn oppgaven krever, slik at samme posisjon kan nås på mange måter","At den har to kontrollere","At den har ekstra motorer i reserve","At den ikke kan bevege seg"],"En 7-akset arm er redundant for 6D-oppgaver."]
);

// ================= MATS1500 =================
GEN("MATS1500",0,
 ()=>{ const m=R.p([["stål",7850],["aluminium",2700],["kobber",8960],["titan",4500]]), a=R.p([10,20,50,100]), b=R.p([10,20,50]), L=R.p([0.5,1,2,3]); const M=m[1]*a*b*1e-6*L;
   const EN={"stål":"steel","aluminium":"aluminum","kobber":"copper","titan":"titanium"};
   return [T(`Hva veier en ${m[0]}stang med tverrsnitt ${a}×${b} mm og lengde ${nf(L)} m? ($\\rho = ${m[1]}$ kg/m³)`,`What is the mass of a bar made of ${EN[m[0]]} with a ${a}×${b} mm cross-section and a length of ${nf(L)} m? ($\\rho = ${m[1]}$ kg/m³)`),{n:M,tol:rel(M),u:"kg"},`$m = \\rho V = ${m[1]}\\cdot ${mf(a*b*1e-6,6)}\\cdot ${mf(L)} \\approx ${mf(M,3)}$ kg.`]; }
);
GEN("MATS1500",1,
 ()=>{ const s=R.f(20,300,10), e=R.p([0.1,0.15,0.2,0.3,0.5]); const E=s/(e/100)/1000;
   return [T(`I det elastiske området gir en spenning på ${nf(s)} MPa en tøyning på ${nf(e)} %. Hva er E-modulen?`,`In the elastic region, a stress of ${nf(s)} MPa gives a strain of ${nf(e)} %. What is the modulus of elasticity E?`),{n:E,tol:rel(E),u:"GPa"},`$E = \\sigma/\\varepsilon = ${mf(s)}/${mf(e/100,4)} \\approx ${mf(E,1)}$ GPa.`]; }
);
MORE("MATS1500",0,
 ["Hva er pakningsgraden (APF) for FCC?",["0,74","0,68","0,52","1,00"],"BCC har 0,68 og enkel kubisk 0,52."],
 ["Hvor mange atomer tilhører én enhetscelle i BCC?",["2","4","1","6"],"Ett i sentrum pluss 8 × 1/8 i hjørnene. FCC har 4."],
 ["Hva er et fasediagram?",["Et kart over hvilke faser som er stabile ved ulike temperaturer og sammensetninger","En spenning–tøyning-kurve","Et bilde av mikrostrukturen","En oversikt over hardhetsverdier"],"Et eksempel er jern–karbon-diagrammet."]
);
MORE("MATS1500",1,
 ["Hva er arbeidsherding (kaldforming)?",["Plastisk deformasjon øker fastheten fordi dislokasjoner hindrer hverandre","Oppvarming som gjør metallet mykt","Herding i olje","Overflatebehandling med krom"],"Det reduseres ved gløding (rekrystallisering)."],
 ["Hva viser en Wöhlerkurve (S–N-kurve)?",["Spenningsamplitude mot antall sykler til brudd","Hardhet mot temperatur","Tøyning mot tid","Pris mot styrke"],"Stål har ofte en utmattingsgrense der kurven flater ut."]
);

// ================= MEK3100 =================
GEN("MEK3100",0,
 ()=>{ const a=R.i(1,5), b=R.i(1,5), start=R.i(0,3);
   return [T(`Hva skriver koden ut?\`\`\`class Teller:\n    def __init__(self, n=${start}):\n        self.n = n\n    def øk(self, k=1):\n        self.n += k\n\nt = Teller()\nt.øk()\nt.øk(${a})\nt.øk(${b})\nprint(t.n)\`\`\``,`What does the code print?\`\`\`class Counter:\n    def __init__(self, n=${start}):\n        self.n = n\n    def inc(self, k=1):\n        self.n += k\n\nc = Counter()\nc.inc()\nc.inc(${a})\nc.inc(${b})\nprint(c.n)\`\`\``),{n:start+1+a+b,tol:0,u:""},`$${start} + 1 + ${a} + ${b} = ${start+1+a+b}$.`]; },
 ()=>{ const w=R.i(2,9), h=R.i(2,9);
   return [T(`Hva skriver koden ut?\`\`\`class Rektangel:\n    def __init__(self, b, h):\n        self.b = b\n        self.h = h\n    def areal(self):\n        return self.b * self.h\n\nr = Rektangel(${w}, ${h})\nprint(r.areal())\`\`\``,`What does the code print?\`\`\`class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(${w}, ${h})\nprint(r.area())\`\`\``),{n:w*h,tol:0,u:""},`$${w}\\cdot ${h} = ${w*h}$.`]; }
);
GEN("MEK3100",1,
 ()=>{ const ops=[]; const st=[]; for(let i=0;i<6;i++){ if(st.length&&Math.random()<0.4){ops.push("s.pop()");st.pop();} else {const v=R.i(1,9);ops.push(`s.append(${v})`);st.push(v);} } if(!st.length){ops.push("s.append(5)");st.push(5);}
   return [T(`Hva skriver koden ut?\`\`\`s = []\n${ops.join("\n")}\nprint(s[-1])\`\`\``,`What does the code print?\`\`\`s = []\n${ops.join("\n")}\nprint(s[-1])\`\`\``),{n:st[st.length-1],tol:0,u:""},T(`Lista brukes som stakk. Til slutt er den [${st.join(", ")}].`,`The list is used as a stack. At the end it is [${st.join(", ")}].`)]; },
 ()=>{ const n=R.p([8,16,32,64,1024]); return [T(`Hvor mange ganger kan du halvere ${n} før du kommer til 1?`,`How many times can you halve ${n} before you reach 1?`),{n:Math.log2(n),tol:0,u:""},T(`$\\log_2 ${n} = ${Math.log2(n)}$. Dette er grunnen til at binærsøk er $O(\\log n)$.`,`$\\log_2 ${n} = ${Math.log2(n)}$. This is why binary search is $O(\\log n)$.`)]; }
);
GEN("MEK3100",2,
 ()=>{ const b=R.i(1,4), n=R.p([1,2]); const h=b/n; let s=0; for(let i=0;i<=n;i++){ const x=i*h; s+=(i===0||i===n?0.5:1)*x*x; } s*=h;
   return [T(`Bruk trapesmetoden med ${n} ${n===1?"intervall":"intervaller"} på $\\int_0^{${b}} x^2\\,dx$. Hva blir tilnærmingen?`,`Use the trapezoidal rule with ${n} ${n===1?"interval":"intervals"} on $\\int_0^{${b}} x^2\\,dx$. What is the approximation?`),{n:s,tol:0.001,u:""},T(`$h = ${mf(h)}$. Trapes gir $${mf(s,4)}$, mens eksakt verdi er $${mf(b**3/3,4)}$.`,`$h = ${mf(h)}$. The trapezoidal rule gives $${mf(s,4)}$, while the exact value is $${mf(b**3/3,4)}$.`)]; },
 ()=>{ const a=R.p([2,3,4,6]), b=12/a; return [T(`Hva er \`np.arange(12).reshape(${a}, -1).shape\`?`,`What is \`np.arange(12).reshape(${a}, -1).shape\`?`),[`(${a}, ${b})`,`(${b}, ${a})`,`(${a}, 12)`,`(12,)`],T(`\`-1\` betyr «regn ut selv»: $12/${a} = ${b}$ kolonner.`,`\`-1\` means "work it out yourself": $12/${a} = ${b}$ columns.`)]; },
 ()=>{ const a=R.i(2,5), b=R.i(2,5); return [T(`Hva er \`np.zeros((${a}, ${b})).size\`?`,`What is \`np.zeros((${a}, ${b})).size\`?`),{n:a*b,tol:0,u:""},T(`\`size\` er totalt antall elementer: $${a}\\cdot ${b} = ${a*b}$.`,`\`size\` is the total number of elements: $${a}\\cdot ${b} = ${a*b}$.`)]; }
);

// ================= DAVE3700 =================
GEN("DAVE3700",0,
 ()=>{ const a=R.i(-5,5), b=R.i(-5,5), d=R.p([[3,4],[4,3],[-3,4],[0,1],[1,0],[3,-4]]); const v=(a*d[0]+b*d[1])/5*(Math.abs(d[0])+Math.abs(d[1])===1?5:1);
   const u = Math.abs(d[0])+Math.abs(d[1])===1 ? `(${d[0]}, ${d[1]})` : `(${d[0]}/5, ${d[1]}/5)`;
   return [T(`$f(x,y) = ${cf(a)}x ${b<0?"-":"+"} ${cf(Math.abs(b))}y$. Hva er den retningsderiverte i retningen $\\vec u = ${u}$?`,`$f(x,y) = ${cf(a)}x ${b<0?"-":"+"} ${cf(Math.abs(b))}y$. What is the directional derivative in the direction $\\vec u = ${u}$?`),{n:v,tol:0.01,u:""},`$D_{\\vec u}f = \\nabla f\\cdot\\vec u = (${a}, ${b})\\cdot${u} = ${mf(v,3)}$.`]; },
 ()=>{ const a=R.i(1,4), b=R.i(1,4), x0=R.i(-2,2), y0=R.i(-2,2), dx=R.p([0.1,-0.1,0.2]), dy=R.p([0.1,-0.1,0.2]);
   const f0=a*x0*x0+b*y0*y0, L=f0+2*a*x0*dx+2*b*y0*dy;
   return [T(`Bruk lineær tilnærming av $f = ${cf(a)}x^2 + ${cf(b)}y^2$ om $(${x0}, ${y0})$ til å estimere $f(${mf(x0+dx,1)}, ${mf(y0+dy,1)})$.`,`Use a linear approximation of $f = ${cf(a)}x^2 + ${cf(b)}y^2$ about $(${x0}, ${y0})$ to estimate $f(${mf(x0+dx,1)}, ${mf(y0+dy,1)})$.`),{n:L,tol:0.005,u:""},`$f \\approx f(${x0},${y0}) + f_x\\Delta x + f_y\\Delta y = ${f0} + ${2*a*x0}\\cdot ${mf(dx)} + ${2*b*y0}\\cdot ${mf(dy)} = ${mf(L,3)}$.`]; }
);
GEN("DAVE3700",1,
 ()=>{ const a=R.i(1,5), b=R.i(1,5), c=R.i(1,5); return [T(`Hva er $\\displaystyle\\iiint_B 1\\,dV$ når $B = [0,${a}]\\times[0,${b}]\\times[0,${c}]$?`,`What is $\\displaystyle\\iiint_B 1\\,dV$ when $B = [0,${a}]\\times[0,${b}]\\times[0,${c}]$?`),{n:a*b*c,tol:0,u:""},T(`Volumet av boksen: $${a}\\cdot ${b}\\cdot ${c} = ${a*b*c}$.`,`The volume of the box: $${a}\\cdot ${b}\\cdot ${c} = ${a*b*c}$.`)]; },
 ()=>{ const r=R.i(1,4), h=R.i(1,5); const V=Math.PI*r*r*h; return [T(`Bruk sylinderkoordinater: Hva er volumet av en sylinder med radius ${r} og høyde ${h}?`,`Use cylindrical coordinates: What is the volume of a cylinder with radius ${r} and height ${h}?`),{n:V,tol:0.01,u:""},`$\\int_0^{${h}}\\!\\int_0^{2\\pi}\\!\\int_0^{${r}} r\\,dr\\,d\\theta\\,dz = ${r*r*h}\\pi \\approx ${mf(V,3)}$.`]; }
);
GEN("DAVE3700",2,
 ()=>{ const a=R.i(1,5), b=R.i(1,5); return [T(`Hva er z-komponenten av $\\nabla\\times(-${cf(a)}y,\\ ${cf(b)}x,\\ 0)$?`,`What is the z-component of $\\nabla\\times(-${cf(a)}y,\\ ${cf(b)}x,\\ 0)$?`),{n:a+b,tol:0,u:""},`$\\partial_x(${b}x) - \\partial_y(-${a}y) = ${b} + ${a} = ${a+b}$.`]; },
 ()=>{ const d=R.i(1,5), s=R.i(1,3); return [T(`$\\nabla\\cdot\\vec F = ${d}$ overalt. Hva er fluksen ut av en kube med sidekant ${s}?`,`$\\nabla\\cdot\\vec F = ${d}$ everywhere. What is the flux out of a cube with side length ${s}?`),{n:d*s**3,tol:0,u:""},T(`Divergensteoremet: fluksen er $\\iiint \\nabla\\cdot\\vec F\\,dV = ${d}\\cdot ${s}^3 = ${d*s**3}$.`,`Divergence theorem: the flux is $\\iiint \\nabla\\cdot\\vec F\\,dV = ${d}\\cdot ${s}^3 = ${d*s**3}$.`)]; }
);

// ================= STKD6610 =================
MORE("STKD6610",0,
 ["Hva er forskjellen på resirkulering og ombruk?",["Ombruk bruker produktet igjen som det er; resirkulering bryter det ned til råmateriale","Det er det samme","Resirkulering er alltid bedre for miljøet","Ombruk betyr å brenne avfall"],"Ombruk er vanligvis høyere i avfallshierarkiet."],
 ["Hva er «grønnvasking»?",["Å gi et misvisende inntrykk av at noe er miljøvennlig","Å vaske produksjonsutstyr","Å plante trær","Å bruke grønne farger i reklame"],"Markedsføringsloven forbyr villedende miljøpåstander."],
 ["Hva er Parisavtalens hovedmål?",["Å begrense oppvarmingen til godt under 2 °C, helst 1,5 °C","Å stoppe all oljeproduksjon innen 2025","Å plante en milliard trær","Å halvere befolkningsveksten"],"Den ble vedtatt i 2015."],
 ["Hva er en miljødeklarasjon (EPD)?",["Et standardisert dokument med livsløpsdata for et produkt","En miljøskatt","Et sertifikat for fornybar strøm","En forsikring"],"EPD-er brukes mye i byggebransjen."]
);
MORE("STKD6610",1,
 ["Hva er informert samtykke?",["At personer får tilstrekkelig informasjon og frivillig sier ja før de deltar","At bedriften informerer aksjonærer","At staten godkjenner et produkt","At man leser brukermanualen"],"Viktig i forskning og i innsamling av persondata (GDPR)."],
 ["Hva er et sentralt prinsipp i GDPR?",["Dataminimering: samle bare inn de personopplysningene man trenger","Alle data skal være offentlige","Data skal lagres for alltid","Man trenger aldri samtykke"],"Andre prinsipper er formålsbegrensning og lagringsbegrensning."],
 ["Hva menes med «ansvarlig innovasjon»?",["Å ta hensyn til samfunnsmessige og etiske konsekvenser tidlig i utviklingen","Å innovere så raskt som mulig","Å bare følge loven","Å overlate ansvaret til brukerne"],"Kalles også RRI (Responsible Research and Innovation)."],
 ["Hva er en interessekonflikt?",["Når personlige interesser kan påvirke en faglig vurdering","Uenighet i et prosjektteam","En juridisk tvist","Konkurranse mellom bedrifter"],"Den løses ofte ved å opplyse om den eller trekke seg (inhabilitet)."]
);

// ================= ELFT2400 =================
GEN("ELFT2400",0,
 ()=>{ const z=R.p([0.1,0.2,0.3,0.4,0.5,0.6,0.7]); const Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100;
   return [T(`Et andreordens system har $\\zeta = ${mf(z)}$. Hvor stort er oversvinget ved sprangrespons?`,`A second-order system has $\\zeta = ${mf(z)}$. How large is the overshoot in the step response?`),{n:Mp,tol:0.5,u:"%"},`$M_p = e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}} \\approx ${mf(Mp,1)}$ %.`]; },
 ()=>{ const z=R.p([0.3,0.5,0.7,0.8]), wn=R.p([1,2,4,5,10]); const ts=4/(z*wn);
   return [T(`Omtrent hva er innsvingningstiden (2 %) for et andreordens system med $\\zeta = ${mf(z)}$ og $\\omega_n = ${wn}$ rad/s?`,`Approximately what is the settling time (2 %) of a second-order system with $\\zeta = ${mf(z)}$ and $\\omega_n = ${wn}$ rad/s?`),{n:ts,tol:rel(ts),u:"s"},`$t_s \\approx 4/(\\zeta\\omega_n) = 4/${mf(z*wn)} \\approx ${mf(ts,2)}$ s.`]; }
);
GEN("ELFT2400",1,
 ()=>{ const Ku=R.p([2,4,5,8,10,20]), Tu=R.p([1,2,4,6,10]); const Q=R.p(["Kp","Ti","Td"]); const v=Q==="Kp"?0.6*Ku:Q==="Ti"?Tu/2:Tu/8;
   const qv=Q==="Kp"?"$K_p$":Q==="Ti"?"$T_i$":"$T_d$";
   return [T(`Ziegler–Nichols (svingemetoden): kritisk forsterkning $K_u = ${Ku}$ og periode $T_u = ${Tu}$ s. Hva blir ${qv} for en PID-regulator?`,`Ziegler–Nichols (ultimate gain method): ultimate gain $K_u = ${Ku}$ and period $T_u = ${Tu}$ s. What is ${qv} for a PID controller?`),{n:v,tol:0.01,u:Q==="Kp"?"":"s"},T(`Tabellen gir $K_p = 0{,}6K_u$, $T_i = T_u/2$ og $T_d = T_u/8$: ${nf(v,3)}.`,`The table gives $K_p = 0.6K_u$, $T_i = T_u/2$ and $T_d = T_u/8$: ${nf(v,3)}.`)]; }
);
GEN("ELFT2400",2,
 ()=>{ const K=R.p([1,2,5,10,20,50]); return [T(`Hva er gjennomskjæringsfrekvensen (der $|L| = 1$) for sløyfen $L(s) = ${K}/s$?`,`What is the crossover frequency (where $|L| = 1$) of the loop $L(s) = ${K}/s$?`),{n:K,tol:0.01,u:"rad/s"},T(`$|${K}/(j\\omega)| = ${K}/\\omega = 1$ gir $\\omega = ${K}$ rad/s. Fasen er alltid −90°, så fasemarginen er 90°.`,`$|${K}/(j\\omega)| = ${K}/\\omega = 1$ gives $\\omega = ${K}$ rad/s. The phase is always −90°, so the phase margin is 90°.`)]; },
 ()=>{ const a=R.p([1,2,5,10]), k=R.p([0.1,1,10]); const w=a*k; const ph=-Math.atan(w/a)*180/Math.PI;
   return [T(`Hva er fasen til $G(s) = \\dfrac{1}{s + ${a}}$ ved $\\omega = ${mf(w)}$ rad/s?`,`What is the phase of $G(s) = \\dfrac{1}{s + ${a}}$ at $\\omega = ${mf(w)}$ rad/s?`),{n:ph,tol:0.5,u:"°"},`$\\angle G = -\\arctan(\\omega/${a}) = -\\arctan(${mf(k)}) \\approx ${mf(ph,1)}^\\circ$.`]; }
);
MORE("ELFT2400",0,
 ["Hva er et nullpunkt i en overføringsfunksjon?",["En verdi av $s$ som gjør telleren null","En verdi av $s$ som gjør nevneren null","Når utgangen er null i stasjonær tilstand","En pol i origo"],"Poler gir nevner null, og de bestemmer stabiliteten."],
 ["Hva er et type 1-system?",["Et system med én integrator (pol i origo) i sløyfen","Et førsteordens system","Et system uten tilbakekobling","Et system med ett nullpunkt"],"Det har null stasjonært avvik for et sprang."]
);
MORE("ELFT2400",1,
 ["Hva er integratoroppvikling (windup)?",["I-leddet vokser mens pådraget er i metning, og gir store oversving","At motoren vikler opp kabelen","At D-leddet blir for stort","At sensoren driver"],"Anti-windup stopper integrasjonen ved metning."],
 ["Hva gjør en kaskaderegulering?",["En ytre regulator gir referanse til en raskere indre regulator","To regulatorer i parallell","Samme regulator brukes to ganger","Regulering uten sensor"],"Et eksempel er en posisjonssløyfe utenpå en hastighetssløyfe."]
);

// ================= DAVE3705 =================
GEN("DAVE3705",0,
 ()=>{ const a=R.i(1,5), sg=R.p([1,-1]); return [`$\\mathcal L\\{t\\,e^{${sg<0?"-":""}${cf(a)}t}\\} = $`,[`$\\dfrac{1}{(s ${sg<0?"+":"-"} ${a})^2}$`,`$\\dfrac{1}{s ${sg<0?"+":"-"} ${a}}$`,`$\\dfrac{1}{(s ${sg<0?"-":"+"} ${a})^2}$`,`$\\dfrac{${a}}{s^2}$`],T(`Forskyvningsregelen: $\\mathcal L\\{t\\} = 1/s^2$, og $e^{ct}$ bytter $s$ med $s - c$.`,`The shifting rule: $\\mathcal L\\{t\\} = 1/s^2$, and $e^{ct}$ replaces $s$ with $s - c$.`)]; },
 ()=>{ const b=R.i(1,9), a=R.i(1,6), c=R.i(1,5); const v=b/(a*c);
   return [T(`$Y(s) = \\dfrac{${b}}{s(s + ${a})(s + ${c})}$. Hva er $\\lim_{t\\to\\infty}y(t)$?`,`$Y(s) = \\dfrac{${b}}{s(s + ${a})(s + ${c})}$. What is $\\lim_{t\\to\\infty}y(t)$?`),{n:v,tol:0.005,u:""},T(`Sluttverditeoremet: $\\lim_{s\\to0}sY(s) = ${b}/(${a}\\cdot ${c}) \\approx ${mf(v,3)}$.`,`Final value theorem: $\\lim_{s\\to0}sY(s) = ${b}/(${a}\\cdot ${c}) \\approx ${mf(v,3)}$.`)]; },
 ()=>{ const a=R.i(1,9); return [`$\\mathcal L\\{f''(t)\\} = $`,[`$s^2F(s) - sf(0) - f'(0)$`,`$s^2F(s)$`,`$s^2F(s) - f(0) - f'(0)$`,`$sF(s) - f'(0)$`],T(`Bruk regelen for $f'$ to ganger.`,`Apply the rule for $f'$ twice.`)]; }
);
GEN("DAVE3705",1,
 ()=>{ const n=R.i(1,5); const b=2*(-1)**(n+1)/n; return [T(`Fourierrekken til $f(x) = x$ på $(-\\pi, \\pi)$ har $b_n = \\dfrac{2(-1)^{n+1}}{n}$. Hva er $b_{${n}}$?`,`The Fourier series of $f(x) = x$ on $(-\\pi, \\pi)$ has $b_n = \\dfrac{2(-1)^{n+1}}{n}$. What is $b_{${n}}$?`),{n:b,tol:0.005,u:""},`$b_{${n}} = 2(-1)^{${n+1}}/${n} = ${mf(b,3)}$.`]; },
 ()=>{ const k=R.i(1,6), m=R.i(1,6); const g=gcd(k,m); const Tp=2*Math.PI/g;
   return [T(`Hva er grunnperioden til $\\sin(${cf(k)}x) + \\cos(${cf(m)}x)$?`,`What is the fundamental period of $\\sin(${cf(k)}x) + \\cos(${cf(m)}x)$?`),{n:Tp,tol:0.01,u:""},T(`Periodene er $2\\pi/${k}$ og $2\\pi/${m}$. Felles periode er $2\\pi/\\gcd(${k}, ${m}) = 2\\pi/${g} \\approx ${mf(Tp,3)}$.`,`The periods are $2\\pi/${k}$ and $2\\pi/${m}$. The common period is $2\\pi/\\gcd(${k}, ${m}) = 2\\pi/${g} \\approx ${mf(Tp,3)}$.`)]; }
);
GEN("DAVE3705",2,
 ()=>{ const n=R.i(1,4), L=R.p([1,2,Math.PI]); const lam=(n*Math.PI/L)**2; const Ls=L===Math.PI?"\\pi":mf(L);
   return [T(`Egenverdiproblemet $X'' + \\lambda X = 0$, $X(0) = X(${Ls}) = 0$. Hva er egenverdi nummer ${n}?`,`The eigenvalue problem $X'' + \\lambda X = 0$, $X(0) = X(${Ls}) = 0$. What is eigenvalue number ${n}?`),{n:lam,tol:rel(lam),u:""},T(`$\\lambda_n = (n\\pi/L)^2 = (${n}\\pi/${Ls})^2 \\approx ${mf(lam,3)}$, med $X_n = \\sin(n\\pi x/L)$.`,`$\\lambda_n = (n\\pi/L)^2 = (${n}\\pi/${Ls})^2 \\approx ${mf(lam,3)}$, with $X_n = \\sin(n\\pi x/L)$.`)]; },
 ()=>{ const A=R.i(0,100), B=R.i(0,100), L=R.p([1,2,4,5,10]), x=R.f(0,L,L/4); const u=A+(B-A)*x/L;
   return [T(`Stasjonær varmeledning i en stav med lengde ${L} har $u(0) = ${A}$ og $u(${L}) = ${B}$. Hva er $u(${mf(x)})$?`,`Steady-state heat conduction in a rod of length ${L} has $u(0) = ${A}$ and $u(${L}) = ${B}$. What is $u(${mf(x)})$?`),{n:u,tol:0.01,u:""},T(`Stasjonært er $u_{xx} = 0$, så $u$ er lineær: $${A} + (${B - A})\\cdot ${mf(x)}/${L} = ${mf(u,2)}$.`,`At steady state $u_{xx} = 0$, so $u$ is linear: $${A} + (${B - A})\\cdot ${mf(x)}/${L} = ${mf(u,2)}$.`)]; },
 ()=>{ const c2=R.p([4,9,16,25,0.25]); return [T(`Hva er bølgefarten $c$ i $u_{tt} = ${mf(c2)}\\,u_{xx}$?`,`What is the wave speed $c$ in $u_{tt} = ${mf(c2)}\\,u_{xx}$?`),{n:Math.sqrt(c2),tol:0.001,u:""},`$c = \\sqrt{${mf(c2)}} = ${mf(Math.sqrt(c2))}$.`]; }
);
MORE("DAVE3705",2,
 ["Hva sier d'Alemberts løsning av bølgeligningen?",["$u = F(x - ct) + G(x + ct)$: to bølger som går hver sin vei","$u$ avtar eksponentielt","$u$ er konstant","$u = X(x)T(t)$ alltid"],"Formen beholdes mens bølgene forflytter seg."],
 ["Hva slags ligning er Laplaces ligning?",["Elliptisk","Parabolsk","Hyperbolsk","Ordinær"],"Varmeligningen er parabolsk og bølgeligningen hyperbolsk."]
);
