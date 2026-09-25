// Runde 2: flere generatorer, flere faste oppgaver og to nye enheter
function UNIT(code, title, qs){ const c=COURSES.find(x=>x.code===code); c.units.push({title, qs}); return c.units.length-1; }
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const C_=(n,k)=>{let r=1;for(let i=1;i<=k;i++) r=r*(n-k+i)/i; return Math.round(r);};

// ================= MAPE1300 =================
GEN("MAPE1300",0,
 ()=>{ const t=R.p([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]), s=R.p([10,20,50,100]); const F1=t[0]*s,F2=t[1]*s,F=t[2]*s;
   return [T(`To krefter på ${F1} N og ${F2} N virker vinkelrett på hverandre i samme punkt. Hvor stor er resultanten?`,`Two forces of ${F1} N and ${F2} N act perpendicular to each other at the same point. What is the resultant?`),{n:F,tol:rel(F),u:"N"},`$R = \\sqrt{${F1}^2 + ${F2}^2} = ${F}$ N.`]; },
 ()=>{ const P=R.f(1,20,0.5), L=R.f(0.5,5,0.5); const M=P*L;
   return [T(`En utkraget bjelke (innspent i ene enden) er ${nf(L)} m lang og har en punktlast på ${nf(P)} kN ytterst. Hvor stort er momentet i innspenningen?`,`A cantilever beam (fixed at one end) is ${nf(L)} m long and carries a point load of ${nf(P)} kN at the free end. What is the moment at the fixed support?`),{n:M,tol:rel(M),u:"kNm"},T(`$M = PL = ${mf(P)}\\cdot ${mf(L)} = ${mf(M)}$ kNm. Vertikal reaksjon er ${nf(P)} kN.`,`$M = PL = ${mf(P)}\\cdot ${mf(L)} = ${mf(M)}$ kNm. The vertical reaction is ${nf(P)} kN.`)]; }
);
GEN("MAPE1300",1,
 ()=>{ const P=R.f(2,40,1), th=R.p([30,45,60]); const S=P/(2*Math.sin(th*DEG));
   return [T(`To like staver møtes i toppen av et symmetrisk fagverk og bærer en vertikal last på ${nf(P)} kN der. Stavene danner ${th}° med horisontalen. Hvor stor er trykkraften i hver stav?`,`Two identical members meet at the apex of a symmetric truss and carry a vertical load of ${nf(P)} kN there. The members make an angle of ${th}° with the horizontal. What is the compressive force in each member?`),{n:S,tol:rel(S),u:"kN"},T(`Vertikal likevekt: $2S\\sin ${th}^\\circ = ${mf(P)}$, så $S \\approx ${mf(S)}$ kN.`,`Vertical equilibrium: $2S\\sin ${th}^\\circ = ${mf(P)}$, so $S \\approx ${mf(S)}$ kN.`)]; },
 ()=>{ const m=R.i(5,50), th=R.p([15,20,25,30,35]), mu=R.f(0.1,0.3,0.05); const F=m*G_*(Math.sin(th*DEG)+mu*Math.cos(th*DEG));
   return [T(`Hvor stor kraft parallelt med skråplanet trengs for å dra en kasse på ${m} kg med jevn fart oppover et plan med helning ${th}°? ($\\mu_k = ${mf(mu)}$, $g = 9{,}81$)`,`What force parallel to the incline is needed to pull a ${m} kg crate at constant speed up a plane inclined at ${th}°? ($\\mu_k = ${mf(mu)}$, $g = 9.81$)`),{n:F,tol:rel(F),u:"N"},`$F = mg(\\sin\\theta + \\mu_k\\cos\\theta) \\approx ${mf(F,1)}$ N.`]; }
);
GEN("MAPE1300",2,
 ()=>{ const m1=R.i(1,10), v1=R.i(2,12), m2=R.i(1,10); const v=m1*v1/(m1+m2);
   return [T(`En vogn på ${m1} kg med fart ${v1} m/s kolliderer med en vogn på ${m2} kg i ro, og de henger sammen etterpå. Hva er felles fart?`,`A ${m1} kg cart moving at ${v1} m/s collides with a ${m2} kg cart at rest, and they stick together afterward. What is their common velocity?`),{n:v,tol:rel(v),u:"m/s"},T(`Bevegelsesmengde er bevart: $v = \\dfrac{${m1}\\cdot ${v1}}{${m1+m2}} \\approx ${mf(v)}$ m/s.`,`Momentum is conserved: $v = \\dfrac{${m1}\\cdot ${v1}}{${m1+m2}} \\approx ${mf(v)}$ m/s.`)]; },
 ()=>{ const h=R.f(1,40,1), v0=R.i(2,20); const x=v0*Math.sqrt(2*h/G_);
   return [T(`En ball kastes horisontalt med ${v0} m/s fra ${nf(h)} m høyde. Hvor langt ut lander den?`,`A ball is thrown horizontally at ${v0} m/s from a height of ${nf(h)} m. How far out does it land?`),{n:x,tol:rel(x),u:"m"},T(`Falltid $t = \\sqrt{2h/g} \\approx ${mf(Math.sqrt(2*h/G_),3)}$ s, og $x = v_0t \\approx ${mf(x)}$ m.`,`Fall time $t = \\sqrt{2h/g} \\approx ${mf(Math.sqrt(2*h/G_),3)}$ s, and $x = v_0t \\approx ${mf(x)}$ m.`)]; },
 ()=>{ const F=R.i(100,3000), v=R.f(0.5,30,0.5); const P=F*v;
   return [T(`En kraft på ${F} N trekker en last med konstant fart ${nf(v)} m/s. Hvor stor effekt kreves?`,`A force of ${F} N pulls a load at a constant speed of ${nf(v)} m/s. How much power is required?`),{n:P,tol:rel(P),u:"W"},`$P = Fv = ${F}\\cdot ${mf(v)} = ${mf(P,1)}$ W.`]; }
);
{ const u = UNIT("MAPE1300","Bøyning av bjelker",[
  ["Hvordan henger skjærkraft $V$ og bøyemoment $M$ sammen langs en bjelke?",["$dM/dx = V$","$dV/dx = M$","$M = V\\cdot x^2$","De er uavhengige"],"Momentet har ekstremverdi der skjærkraften skifter fortegn."],
  ["Hvor er bøyemomentet størst i en fritt opplagt bjelke med jevnt fordelt last?",["Midt på bjelken","Ved opplagrene","En firedel inn fra hver ende","Det er konstant"],"Der er skjærkraften null. $M_{maks} = qL^2/8$."],
  ["Hva er maksimalt moment i en utkraget bjelke med jevnt fordelt last $q$ og lengde $L$?",["$qL^2/2$ ved innspenningen","$qL^2/8$ midt på","$qL$ ytterst","$qL^2/12$"],"Resultanten $qL$ virker i $L/2$ fra innspenningen."],
  ["Hvordan ser momentdiagrammet ut for en fritt opplagt bjelke med én punktlast?",["Trekantformet med topp under lasten","Parabelformet","Rektangulært","Null overalt"],"Momentet vokser lineært fra hvert opplager inn mot lasten."],
  ["Hva skjer med nedbøyningen hvis du dobler lengden på en fritt opplagt bjelke med punktlast midt på?",["Den blir 8 ganger større","Den dobles","Den firedobles","Den er uendret"],"$\\delta = PL^3/(48EI)$, altså proporsjonal med $L^3$."],
  ["Hvorfor lages stålbjelker ofte som I-profiler?",["Mye materiale langt fra nøytralaksen gir stort $I$ per kilo","De er enklest å sveise","De tåler vridning best","De ruster mindre"],"Flensene tar bøyespenningen, og steget tar skjærkraften."]
 ]);
 GEN("MAPE1300",u,
  ()=>{ const P=R.f(2,40,1), L=R.f(2,10,0.5); const M=P*L/4;
    return [T(`En fritt opplagt bjelke på ${nf(L)} m har en punktlast på ${nf(P)} kN midt på. Hva er maksimalt bøyemoment?`,`A simply supported beam of ${nf(L)} m has a point load of ${nf(P)} kN at midspan. What is the maximum bending moment?`),{n:M,tol:rel(M),u:"kNm"},T(`$M_{maks} = PL/4 = ${mf(P)}\\cdot ${mf(L)}/4 = ${mf(M,3)}$ kNm.`,`$M_{max} = PL/4 = ${mf(P)}\\cdot ${mf(L)}/4 = ${mf(M,3)}$ kNm.`)]; },
  ()=>{ const q=R.f(1,20,1), L=R.f(2,10,0.5); const M=q*L*L/8;
    return [T(`En fritt opplagt bjelke på ${nf(L)} m har jevnt fordelt last ${nf(q)} kN/m. Hva er maksimalt bøyemoment?`,`A simply supported beam of ${nf(L)} m carries a uniformly distributed load of ${nf(q)} kN/m. What is the maximum bending moment?`),{n:M,tol:rel(M),u:"kNm"},T(`$M_{maks} = qL^2/8 = ${mf(q)}\\cdot ${mf(L)}^2/8 \\approx ${mf(M,3)}$ kNm.`,`$M_{max} = qL^2/8 = ${mf(q)}\\cdot ${mf(L)}^2/8 \\approx ${mf(M,3)}$ kNm.`)]; },
  ()=>{ const q=R.f(1,20,1), L=R.f(2,10,0.5); const Rr=q*L/2;
    return [T(`En fritt opplagt bjelke på ${nf(L)} m har jevnt fordelt last ${nf(q)} kN/m. Hva er opplagerkraften i hver ende?`,`A simply supported beam of ${nf(L)} m carries a uniformly distributed load of ${nf(q)} kN/m. What is the support reaction at each end?`),{n:Rr,tol:rel(Rr),u:"kN"},T(`Total last er $qL = ${mf(q*L)}$ kN, fordelt likt: $${mf(Rr)}$ kN.`,`The total load is $qL = ${mf(q*L)}$ kN, shared equally: $${mf(Rr)}$ kN.`)]; },
  ()=>{ const P=R.f(1,20,1), L=R.p([1,2,3,4]), I=R.p([1e6,2e6,5e6,1e7,2e7]); const d=P*1e3*(L*1e3)**3/(48*210e3*I);
    return [T(`En fritt opplagt stålbjelke ($E = 210$ GPa) er ${L} m lang og har $I = ${mf(I/1e6)}\\cdot10^6$ mm⁴. Hvor stor er nedbøyningen midt på med en punktlast på ${nf(P)} kN der?`,`A simply supported steel beam ($E = 210$ GPa) is ${L} m long and has $I = ${mf(I/1e6)}\\cdot10^6$ mm⁴. What is the midspan deflection under a point load of ${nf(P)} kN at midspan?`),{n:d,tol:rel(d,0.02),u:"mm"},T(`$\\delta = \\dfrac{PL^3}{48EI} = \\dfrac{${mf(P*1e3,0)}\\cdot ${L*1000}^3}{48\\cdot 210\\,000\\cdot ${mf(I,0)}} \\approx ${mf(d,3)}$ mm (N og mm).`,`$\\delta = \\dfrac{PL^3}{48EI} = \\dfrac{${mf(P*1e3,0)}\\cdot ${L*1000}^3}{48\\cdot 210\\,000\\cdot ${mf(I,0)}} \\approx ${mf(d,3)}$ mm (N and mm).`)]; }
 );
}
MORE("MAPE1300",2,
 ["Hva er forskjellen på et elastisk og et fullstendig uelastisk støt?",["Kinetisk energi er bevart i elastisk støt; i fullstendig uelastisk støt henger legemene sammen","Bevegelsesmengden er bare bevart i elastiske støt","Uelastiske støt skjer bare i væsker","Det er ingen forskjell"],"Bevegelsesmengden er bevart i begge tilfeller."],
 ["Hvilken retning har akselerasjonen i jevn sirkelbevegelse?",["Inn mot sentrum","Langs farten","Ut fra sentrum","Den er null"],"Farten er konstant i størrelse, men retningen endres."]
);

// ================= MEK1300 =================
GEN("MEK1300",0,
 ()=>{ const w=R.p(["ingenior","mekatronikk","python","robotikk","termodynamikk"]); const a=R.i(0,3), b=a+R.i(2,4);
   const s=w.slice(a,b); const wrong=[w.slice(a,b+1), w.slice(a+1,b+1), w.slice(a-1<0?0:a-1,b-1)];
   return [T(`Hva gir \`"${w}"[${a}:${b}]\`?`,`What does \`"${w}"[${a}:${b}]\` return?`),[`"${s}"`,...[...new Set(wrong.filter(x=>x!==s))].map(x=>`"${x}"`)].slice(0,4),T(`Utsnitt tar med indeks ${a} til og med ${b-1}.`,`The slice includes indices ${a} through ${b-1}.`)]; },
 ()=>{ const x=R.f(1.1,9.9,0.1); const f=R.p(["int","round"]); const v=f==="int"?Math.trunc(x):Math.round(x);
   return [T(`Hva gir \`${f}(${x})\`?`,`What does \`${f}(${x})\` return?`),{n:v,tol:0,u:""},f==="int"?T(`\`int\` kutter bort desimalene (runder mot null), så svaret er ${v}.`,`\`int\` drops the decimals (rounds toward zero), so the answer is ${v}.`):T(`\`round\` runder til nærmeste heltall, altså ${v}.`,`\`round\` rounds to the nearest integer, giving ${v}.`)]; },
 ()=>{ const w=R.p(["hei","ingeniør","Python 3","a b c","NMBU"]);
   return [T(`Hva gir \`len("${w}")\`?`,`What does \`len("${w}")\` return?`),{n:[...w].length,tol:0,u:""},T(`Strengen har ${[...w].length} tegn. Mellomrom teller også.`,`The string has ${[...w].length} characters. Spaces count too.`)]; }
);
GEN("MEK1300",1,
 ()=>{ const a=R.i(2,5), b=R.i(2,5);
   return [T(`Hvor mange ganger kjører \`print\`?\`\`\`for i in range(${a}):\n    for j in range(${b}):\n        print(i, j)\`\`\``,`How many times does \`print\` run?\`\`\`for i in range(${a}):\n    for j in range(${b}):\n        print(i, j)\`\`\``),{n:a*b,tol:0,u:""},T(`Den ytre løkka kjører ${a} ganger og den indre ${b} ganger for hver: $${a}\\cdot ${b} = ${a*b}$.`,`The outer loop runs ${a} times, and the inner loop runs ${b} times for each: $${a}\\cdot ${b} = ${a*b}$.`)]; },
 ()=>{ const lim=R.p([50,100,200,1000]), st=R.i(1,3); let x=st,c=0; while(x<lim){x*=2;c++;}
   return [T(`Hva skriver koden ut?\`\`\`x = ${st}\nn = 0\nwhile x < ${lim}:\n    x *= 2\n    n += 1\nprint(n)\`\`\``,`What does the code print?\`\`\`x = ${st}\nn = 0\nwhile x < ${lim}:\n    x *= 2\n    n += 1\nprint(n)\`\`\``),{n:c,tol:0,u:""},T(`x dobles til den er minst ${lim} (x = ${x}), det tar ${c} runder.`,`x is doubled until it is at least ${lim} (x = ${x}), which takes ${c} iterations.`)]; },
 ()=>{ const n=R.i(8,25), d=R.p([2,3,5]); const v=Math.floor((n-1)/d)+1;
   return [T(`Hva gir \`len([i for i in range(${n}) if i % ${d} == 0])\`?`,`What does \`len([i for i in range(${n}) if i % ${d} == 0])\` return?`),{n:v,tol:0,u:""},T(`Tallene 0, ${d}, ${2*d}, … under ${n}: ${v} stykker.`,`The numbers 0, ${d}, ${2*d}, … below ${n}: ${v} in total.`)]; }
);
GEN("MEK1300",2,
 ()=>{ const k=R.p(["a","b","c"]), d={a:R.i(1,9),b:R.i(1,9)}; const def=R.i(0,5); const v= k in d ? d[k] : def;
   return [T(`Hva skriver koden ut?\`\`\`d = {"a": ${d.a}, "b": ${d.b}}\nprint(d.get("${k}", ${def}))\`\`\``,`What does the code print?\`\`\`d = {"a": ${d.a}, "b": ${d.b}}\nprint(d.get("${k}", ${def}))\`\`\``),{n:v,tol:0,u:""},k in d?T(`Nøkkelen finnes, så verdien ${v} returneres.`,`The key exists, so the value ${v} is returned.`):T(`Nøkkelen finnes ikke, så standardverdien ${def} returneres.`,`The key does not exist, so the default value ${def} is returned.`)]; },
 ()=>{ const xs=R.distinct(5,1,20); const f=R.p(["max","min","sum"]); const v=f==="max"?Math.max(...xs):f==="min"?Math.min(...xs):xs.reduce((a,b)=>a+b,0);
   return [T(`Hva gir \`${f}([${xs.join(", ")}])\`?`,`What does \`${f}([${xs.join(", ")}])\` return?`),{n:v,tol:0,u:""},T(`Den innebygde funksjonen \`${f}\` gir ${v}.`,`The built-in function \`${f}\` returns ${v}.`)]; }
);
MORE("MEK1300",0,
 ["Hva gir `f\"{3.14159:.2f}\"`?",["\"3.14\"","\"3.1\"","\"3.14159\"","\"3,14\""],"`.2f` betyr to desimaler."],
 ["Hva gir `bool(0)`?",["False","True","0","None"],"0, tom streng, tom liste og `None` regnes som usanne."],
 ["Hva gir `\"5\" + \"3\"`?",["\"53\"","8","\"8\"","TypeError"],"`+` mellom strenger setter dem sammen."],
 ["Hva gir `int(\"42\") + 1`?",["43","\"421\"","TypeError","42"],"`int` gjør strengen om til et heltall først."]
);
MORE("MEK1300",1,
 ["Hva gjør `continue` i en løkke?",["Hopper over resten av runden og går til neste","Avslutter løkka","Avslutter programmet","Gjentar samme runde"],"`break` avslutter hele løkka."],
 ["Hva skriver koden ut?```for i in range(3):\n    pass\nprint(i)```",["2","3","0","NameError"],"Løkkevariabelen beholder siste verdi etter løkka."]
);

// ================= MATS1600 =================
GEN("MATS1600",0,
 ()=>{ const Tq=R.p([50,100,200,300,500,1000]), d=R.p([15,20,25,30,40,50]); const tau=16*Tq*1e3/(Math.PI*d**3);
   return [T(`En massiv aksel med diameter ${d} mm overfører et torsjonsmoment på ${Tq} Nm. Hva er maksimal skjærspenning?`,`A solid shaft with a diameter of ${d} mm transmits a torque of ${Tq} Nm. What is the maximum shear stress?`),{n:tau,tol:rel(tau),u:"MPa"},`$\\tau = \\dfrac{16T}{\\pi d^3} = \\dfrac{16\\cdot ${Tq*1000}}{\\pi\\cdot ${d}^3} \\approx ${mf(tau,1)}$ MPa.`]; },
 ()=>{ const F=R.f(5,60,1), As=R.p([20.1,36.6,58,84.3,157]); const s=F*1000/As; const M={20.1:"M6",36.6:"M8",58:"M10",84.3:"M12",157:"M16"}[As];
   return [T(`En ${M}-bolt (spenningsareal ${nf(As,1)} mm²) har forspenningskraft ${nf(F)} kN. Hva er strekkspenningen i bolten?`,`An ${M} bolt (tensile stress area ${nf(As,1)} mm²) has a preload of ${nf(F)} kN. What is the tensile stress in the bolt?`),{n:s,tol:rel(s),u:"MPa"},`$\\sigma = F/A_s = ${mf(F*1000,0)}/${mf(As,1)} \\approx ${mf(s,0)}$ MPa.`]; }
);
GEN("MATS1600",1,
 ()=>{ const up=R.p([-7,-9,-20,0,15,21]), it=R.p([9,11,13,16,19,21]);
   return [T(`En aksel har øvre avvik ${up>=0?"+":"−"}${Math.abs(up)} µm og nedre avvik ${up-it>=0?"+":"−"}${Math.abs(up-it)} µm. Hva er toleransevidden?`,`A shaft has an upper deviation of ${up>=0?"+":"−"}${Math.abs(up)} µm and a lower deviation of ${up-it>=0?"+":"−"}${Math.abs(up-it)} µm. What is the tolerance (width of the tolerance zone)?`),{n:it,tol:0,u:"µm"},T(`Toleransen er øvre minus nedre avvik: $${up} - (${up-it}) = ${it}$ µm.`,`The tolerance is the upper minus the lower deviation: $${up} - (${up-it}) = ${it}$ µm.`)]; }
);
GEN("MATS1600",2,
 ()=>{ const C=R.p([10,15,20,30,50]), P=R.p([1,2,2.5,4,5]); const L=(C/P)**3;
   return [T(`Et kulelager har dynamisk bæretall $C = ${C}$ kN og belastes med $P = ${mf(P,1)}$ kN. Hva er nominell levetid $L_{10}$ i millioner omdreininger?`,`A ball bearing has a dynamic load rating $C = ${C}$ kN and is loaded with $P = ${mf(P,1)}$ kN. What is the basic rating life $L_{10}$ in millions of revolutions?`),{n:L,tol:rel(L),u:"mill. omdr."},T(`For kulelagre er $L_{10} = (C/P)^3 = (${mf(C/P,3)})^3 \\approx ${mf(L,1)}$.`,`For ball bearings, $L_{10} = (C/P)^3 = (${mf(C/P,3)})^3 \\approx ${mf(L,1)}$.`)]; },
 ()=>{ const F=R.i(50,1000), x=R.f(2,50,1); const k=F/x;
   return [T(`En fjær trykkes ${nf(x)} mm sammen av en kraft på ${F} N. Hva er fjærstivheten?`,`A spring is compressed ${nf(x)} mm by a force of ${F} N. What is the spring stiffness?`),{n:k,tol:rel(k),u:"N/mm"},`$k = F/x = ${F}/${mf(x)} \\approx ${mf(k,2)}$ N/mm.`]; },
 ()=>{ const d1=R.p([80,100,125,150]), d2=R.p([200,250,300,400]), n1=R.p([1450,2900]); const n2=n1*d1/d2;
   return [T(`En reimdrift har drivskive ${d1} mm og drevet skive ${d2} mm. Drivskiven går med ${n1} rpm. Hva er turtallet på den drevne skiven? (Se bort fra slupp)`,`A belt drive has a ${d1} mm driving pulley and a ${d2} mm driven pulley. The driving pulley runs at ${n1} rpm. What is the rotational speed of the driven pulley? (Neglect slip)`),{n:n2,tol:rel(n2,0.005),u:"rpm"},`$n_2 = n_1\\,d_1/d_2 = ${n1}\\cdot ${d1}/${d2} = ${mf(n2,1)}$ rpm.`]; }
);
MORE("MATS1600",2,
 ["Hva er funksjonen til en kile (fjær) i en akselforbindelse?",["Overføre moment mellom aksel og nav","Hindre aksial bevegelse","Redusere friksjon","Tette mot olje"],"Aksial låsing gjøres ofte med låsering eller skulder."],
 ["Hvorfor er kjerv (skarpe hjørner) farlig i en aksel?",["De gir spenningskonsentrasjon som kan starte utmattingsbrudd","De gjør akselen tyngre","De øker stivheten","De gir mer friksjon i lagrene"],"Gi overganger en radius."],
 ["Hva betyr betegnelsen M12×1,25?",["Metrisk gjenge med 12 mm diameter og 1,25 mm stigning (fingjenge)","12 bolter med 1,25 mm lengde","Styrkeklasse 12","Hodet er 12 mm bredt"],"Standard grovgjenge for M12 har stigning 1,75 mm."],
 ["Hva forteller styrkeklassen 8.8 på en bolt?",["$R_m \\approx 800$ MPa og $R_e \\approx 0{,}8\\cdot R_m = 640$ MPa","Lengde 8,8 mm","8 mm diameter og 8 mm gjenge","Maks moment 88 Nm"],"Første tall × 100 er strekkfastheten. Andre tall × 10 er flytegrensen i prosent av den."]
);

// ================= MATS2100 =================
GEN("MATS2100",0,
 ()=>{ const p1=R.p([100,150,200,300]), V1=R.p([2,3,4,5,6]), V2=R.p([1,1.5,2,2.5,8,10]); const p2=p1*V1/V2;
   return [T(`En ideell gass med trykk ${p1} kPa og volum ${V1} L komprimeres eller ekspanderes isotermt til ${nf(V2)} L. Hva blir trykket?`,`An ideal gas at a pressure of ${p1} kPa and a volume of ${V1} L is compressed or expanded isothermally to ${nf(V2)} L. What is the new pressure?`),{n:p2,tol:rel(p2),u:"kPa"},T(`Boyles lov: $p_2 = p_1V_1/V_2 = ${p1}\\cdot ${V1}/${mf(V2)} = ${mf(p2,1)}$ kPa.`,`Boyle's law: $p_2 = p_1V_1/V_2 = ${p1}\\cdot ${V1}/${mf(V2)} = ${mf(p2,1)}$ kPa.`)]; },
 ()=>{ const V1=R.p([1,2,5,10]), T1=R.p([273,293,300]), T2=R.p([350,373,400,450,600]); const V2=V1*T2/T1;
   return [T(`En gass ved konstant trykk har volum ${V1} L ved ${T1} K. Hva er volumet ved ${T2} K?`,`A gas at constant pressure has a volume of ${V1} L at ${T1} K. What is the volume at ${T2} K?`),{n:V2,tol:rel(V2),u:"L"},`$V_2 = V_1T_2/T_1 = ${V1}\\cdot ${T2}/${T1} \\approx ${mf(V2,3)}$ L.`]; }
);
GEN("MATS2100",1,
 ()=>{ const k=R.p([[0.04,"mineralull"],[0.8,"betong"],[50,"stål"],[0.15,"tre"]]), A=R.f(1,20,1), dT=R.i(5,40), L=R.p([0.05,0.1,0.2,0.3]); const Q=k[0]*A*dT/L;
   const kEn={"mineralull":"mineral wool","betong":"concrete","stål":"steel","tre":"wood"}[k[1]];
   return [T(`En vegg av ${k[1]} ($k = ${mf(k[0],2)}$ W/(m·K)) er ${nf(L)} m tykk og har areal ${nf(A)} m². Temperaturforskjellen er ${dT} K. Hvor stor er varmestrømmen?`,`A ${kEn} wall ($k = ${mf(k[0],2)}$ W/(m·K)) is ${nf(L)} m thick and has an area of ${nf(A)} m². The temperature difference is ${dT} K. What is the heat flow rate?`),{n:Q,tol:rel(Q),u:"W"},T(`Fouriers lov: $\\dot Q = kA\\Delta T/L = ${mf(k[0],2)}\\cdot ${mf(A)}\\cdot ${dT}/${mf(L)} \\approx ${mf(Q,1)}$ W.`,`Fourier's law: $\\dot Q = kA\\Delta T/L = ${mf(k[0],2)}\\cdot ${mf(A)}\\cdot ${dT}/${mf(L)} \\approx ${mf(Q,1)}$ W.`)]; },
 ()=>{ const Q=R.i(100,5000), Tr=R.p([273,300,350,400,500]); const S=Q/Tr;
   return [T(`${Q} J varme tilføres et reservoar med konstant temperatur ${Tr} K. Hva er entropiendringen til reservoaret?`,`${Q} J of heat is supplied to a reservoir at a constant temperature of ${Tr} K. What is the entropy change of the reservoir?`),{n:S,tol:rel(S),u:"J/K"},`$\\Delta S = Q/T = ${Q}/${Tr} \\approx ${mf(S,3)}$ J/K.`]; }
);
GEN("MATS2100",2,
 ()=>{ const tc=R.p([-25,-18,-10,0,5]), th=R.p([25,30,35,40]); const Tc=tc+273.15,Th=th+273.15, c=Tc/(Th-Tc);
   return [T(`Hva er Carnot-COP for et kjøleanlegg som holder ${tc} °C inne og avgir varme ved ${th} °C?`,`What is the Carnot COP of a refrigeration system that keeps ${tc} °C inside and rejects heat at ${th} °C?`),{n:c,tol:rel(c),u:""},T(`$COP_K = T_C/(T_H - T_C) = ${mf(Tc)}/${mf(Th-Tc)} \\approx ${mf(c)}$.`,`$COP_R = T_C/(T_H - T_C) = ${mf(Tc)}/${mf(Th-Tc)} \\approx ${mf(c)}$.`)]; },
 ()=>{ const Q=R.p([5000,10000,15000,20000]), cop=R.f(2,4.5,0.5); const W=Q/cop;
   return [T(`Et hus trenger ${Q.toLocaleString("nb-NO")} kWh varme i året. Varmepumpen har årlig gjennomsnittlig COP på ${nf(cop)}. Hvor mye strøm bruker den?`,`A house needs ${Q.toLocaleString("en-US")} kWh of heat per year. The heat pump has an annual average COP of ${nf(cop)}. How much electricity does it use?`),{n:W,tol:rel(W),u:"kWh"},`$W = Q/COP = ${Q}/${mf(cop)} \\approx ${mf(W,0)}$ kWh.`]; }
);
MORE("MATS2100",2,
 ["Hvilken idealprosess brukes for gassturbiner og jetmotorer?",["Brayton (Joule)","Rankine","Otto","Stirling"],"Kompresjon, varmetilførsel ved konstant trykk, ekspansjon i turbin."],
 ["Hva skjer med entalpien når et kuldemedium strupes gjennom en ekspansjonsventil?",["Den er tilnærmet konstant","Den øker kraftig","Den blir null","Den halveres"],"Struping er en isentalpisk prosess, men trykk og temperatur faller."],
 ["Hva er en isentrop prosess?",["En reversibel og adiabatisk prosess","En prosess med konstant temperatur","En prosess med konstant trykk","En prosess med økende entropi"],"Ideelle kompressorer og turbiner modelleres ofte som isentrope."]
);

// ================= MEK1400 =================
GEN("MEK1400",0,
 ()=>{ const Tp=R.p([0.01,0.02,0.05,0.1,0.25,0.5,2]); return [T(`En svingning har periode ${nf(Tp)} s. Hva er frekvensen?`,`An oscillation has a period of ${nf(Tp)} s. What is the frequency?`),{n:1/Tp,tol:rel(1/Tp),u:"Hz"},`$f = 1/T = 1/${mf(Tp)} = ${mf(1/Tp,2)}$ Hz.`]; },
 ()=>{ const k=R.p([100,200,500,1000]), x=R.f(0.01,0.2,0.01); const E=0.5*k*x*x;
   return [T(`En fjær med $k = ${k}$ N/m trykkes ${mf(x*100,0)} cm sammen. Hvor mye energi er lagret?`,`A spring with $k = ${k}$ N/m is compressed ${mf(x*100,0)} cm. How much energy is stored?`),{n:E,tol:rel(E),u:"J"},`$E = \\tfrac12kx^2 = \\tfrac12\\cdot ${k}\\cdot ${mf(x)}^2 \\approx ${mf(E,4)}$ J.`]; }
);
GEN("MEK1400",1,
 ()=>{ const I=R.p([1,2,5,10,20]), r=R.p([0.01,0.02,0.05,0.1]); const B=2e-7*I/r*1e6;
   return [T(`En lang, rett leder fører ${I} A. Hvor sterkt er magnetfeltet ${mf(r*100,0)} cm fra lederen, i µT? ($\\mu_0 = 4\\pi\\cdot10^{-7}$)`,`A long, straight conductor carries ${I} A. How strong is the magnetic field ${mf(r*100,0)} cm from the conductor, in µT? ($\\mu_0 = 4\\pi\\cdot10^{-7}$)`),{n:B,tol:rel(B),u:"µT"},`$B = \\dfrac{\\mu_0I}{2\\pi r} = \\dfrac{2\\cdot10^{-7}\\cdot ${I}}{${mf(r)}} = ${mf(B,1)}$ µT.`]; },
 ()=>{ const q=R.i(1,9), r=R.p([0.1,0.2,0.5,1]); const E=8.99e9*q*1e-6/(r*r);
   return [T(`Hvor sterkt er det elektriske feltet ${nf(r)} m fra en punktladning på ${q} µC, i kN/C? ($k = 8{,}99\\cdot10^9$)`,`How strong is the electric field ${nf(r)} m from a point charge of ${q} µC, in kN/C? ($k = 8.99\\cdot10^9$)`),{n:E/1000,tol:rel(E/1000),u:"kN/C"},`$E = kq/r^2 \\approx ${mf(E/1000,1)}$ kN/C.`]; }
);
GEN("MEK1400",2,
 ()=>{ const rpm=R.p([60,120,300,600,1500,3000]); const w=rpm*2*Math.PI/60;
   return [T(`Hva er ${rpm} omdreininger per minutt i rad/s?`,`What is ${rpm} revolutions per minute in rad/s?`),{n:w,tol:rel(w),u:"rad/s"},`$\\omega = 2\\pi n/60 = ${mf(w,2)}$ rad/s.`]; },
 ()=>{ const I=R.f(0.1,5,0.1), a=R.i(1,20); const Tm=I*a;
   return [T(`Et hjul har treghetsmoment ${nf(I)} kg·m². Hvor stort moment trengs for å gi det en vinkelakselerasjon på ${a} rad/s²?`,`A wheel has a moment of inertia of ${nf(I)} kg·m². What torque is needed to give it an angular acceleration of ${a} rad/s²?`),{n:Tm,tol:rel(Tm),u:"Nm"},`$\\tau = I\\alpha = ${mf(I)}\\cdot ${a} = ${mf(Tm)}$ Nm.`]; }
);
MORE("MEK1400",0,
 ["Hva er resonans?",["Stor amplitude når påtrykt frekvens er nær egenfrekvensen","At svingningen dør ut","At to bølger nuller hverandre","At frekvensen dobles"],"Demping begrenser toppen."],
 ["I en stående bølge på en streng fast i begge ender, hva er avstanden mellom to knuter?",["$\\lambda/2$","$\\lambda$","$\\lambda/4$","$2\\lambda$"],"Derfor er $L = n\\lambda/2$."]
);

// ================= ELPE1300 =================
GEN("ELPE1300",1,
 ()=>{ const L=R.p([10,50,100,500]), I=R.f(0.5,10,0.5); const E=0.5*L*1e-3*I*I;
   return [T(`Hvor mye energi er lagret i en spole på ${L} mH med strømmen ${nf(I)} A?`,`How much energy is stored in a ${L} mH inductor carrying a current of ${nf(I)} A?`),{n:E,tol:rel(E),u:"J"},`$E = \\tfrac12LI^2 = \\tfrac12\\cdot ${mf(L/1000,3)}\\cdot ${mf(I)}^2 \\approx ${mf(E,4)}$ J.`]; },
 ()=>{ const U=R.p([5,10,12,24]), k=R.p([1,2,3]); const u=U*Math.exp(-k);
   return [T(`En kondensator ladet til ${U} V utlades gjennom en motstand. Hva er spenningen etter ${k} ${k===1?"tidskonstant":"tidskonstanter"}?`,`A capacitor charged to ${U} V is discharged through a resistor. What is the voltage after ${k} ${k===1?"time constant":"time constants"}?`),{n:u,tol:rel(u),u:"V"},`$u = Ue^{-t/\\tau} = ${U}e^{-${k}} \\approx ${mf(u,3)}$ V.`]; }
);
GEN("ELPE1300",2,
 ()=>{ const L=R.p([1,10,100]), C=R.p([1,10,100]); const f=1/(2*Math.PI*Math.sqrt(L*1e-3*C*1e-6));
   return [T(`Hva er resonansfrekvensen til en LC-krets med $L = ${L}$ mH og $C = ${C}$ µF?`,`What is the resonant frequency of an LC circuit with $L = ${L}$ mH and $C = ${C}$ µF?`),{n:f,tol:rel(f),u:"Hz"},`$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}} \\approx ${mf(f,1)}$ Hz.`]; },
 ()=>{ const Uf=R.p([230,400,690]); const Ul=Uf*Math.sqrt(3);
   return [T(`I et symmetrisk trefasesystem er fasespenningen ${Uf} V. Hva er linjespenningen?`,`In a balanced three-phase system, the phase voltage is ${Uf} V. What is the line voltage?`),{n:Ul,tol:rel(Ul),u:"V"},`$U_L = \\sqrt3\\,U_f \\approx ${mf(Ul,0)}$ V.`]; },
 ()=>{ const U=R.p([230,400]), I=R.f(1,20,1), pf=R.p([0.7,0.8,0.85,0.9,0.95,1]); const P=U*I*pf;
   return [T(`En enfaselast har ${U} V, ${nf(I)} A og effektfaktor ${nf(pf)}. Hva er aktiv effekt?`,`A single-phase load has ${U} V, ${nf(I)} A and a power factor of ${nf(pf)}. What is the active power?`),{n:P,tol:rel(P),u:"W"},`$P = UI\\cos\\varphi = ${U}\\cdot ${mf(I)}\\cdot ${mf(pf)} = ${mf(P,0)}$ W.`]; }
);
{ const u = UNIT("ELPE1300","Nettverksanalyse",[
  ["Hva er en Thévenin-ekvivalent?",["En ideell spenningskilde i serie med én motstand","En strømkilde i parallell med en motstand","En kortsluttet krets","En kondensator i serie med en spole"],"Norton-ekvivalenten er strømkilden i parallell."],
  ["Når overføres maksimal effekt til en lastmotstand $R_L$?",["Når $R_L = R_{th}$","Når $R_L = 0$","Når $R_L$ er uendelig","Når $R_L = 2R_{th}$"],"Da er virkningsgraden bare 50 %."],
  ["Hvordan finner du $R_{th}$ i en krets med bare uavhengige kilder?",["Slå av kildene (spenningskilder kortsluttes, strømkilder brytes) og beregn motstanden sett fra klemmene","Kortslutt klemmene og mål strømmen","Legg sammen alle motstander","Ta største motstand"],"Alternativt: $R_{th} = U_{åpen}/I_{kort}$."],
  ["Hva sier superposisjonsprinsippet?",["I en lineær krets er responsen summen av bidragene fra hver kilde alene","Effekter kan legges sammen","Strøm og spenning er alltid i fase","Motstander i parallell legges sammen"],"Det gjelder ikke for effekt, fordi effekt er kvadratisk."],
  ["Hvor mange uavhengige knutepunktsligninger trenger en krets med $n$ knutepunkter?",["$n - 1$","$n$","$n + 1$","$2n$"],"Ett knutepunkt velges som jord (referanse)."]
 ]);
 GEN("ELPE1300",u,
  ()=>{ const U=R.p([10,12,24]), r1=R.p([1,2,4,6]), r2=R.p([2,3,4,12]); const Vth=U*r2/(r1+r2), Rth=r1*r2/(r1+r2); const Q=R.p(["V","R"]);
    if(Q==="V") return [T(`En kilde på ${U} V med $R_1 = ${r1}$ kΩ i serie og $R_2 = ${r2}$ kΩ over klemmene. Hva er Thévenin-spenningen?`,`A ${U} V source has $R_1 = ${r1}$ kΩ in series and $R_2 = ${r2}$ kΩ across the terminals. What is the Thévenin voltage?`),{n:Vth,tol:rel(Vth),u:"V"},T(`Tomgangsspenning (spenningsdeler): $${U}\\cdot ${r2}/${r1+r2} \\approx ${mf(Vth,3)}$ V.`,`Open-circuit voltage (voltage divider): $${U}\\cdot ${r2}/${r1+r2} \\approx ${mf(Vth,3)}$ V.`)];
    return [T(`En kilde på ${U} V med $R_1 = ${r1}$ kΩ i serie og $R_2 = ${r2}$ kΩ over klemmene. Hva er Thévenin-motstanden?`,`A ${U} V source has $R_1 = ${r1}$ kΩ in series and $R_2 = ${r2}$ kΩ across the terminals. What is the Thévenin resistance?`),{n:Rth,tol:rel(Rth),u:"kΩ"},T(`Kortslutt kilden: $R_1 \\parallel R_2 = ${r1*r2}/${r1+r2} \\approx ${mf(Rth,3)}$ kΩ.`,`Short-circuit the source: $R_1 \\parallel R_2 = ${r1*r2}/${r1+r2} \\approx ${mf(Rth,3)}$ kΩ.`)]; },
  ()=>{ const V=R.p([5,10,12,20]), Rt=R.p([2,4,5,8,10,50]); const P=V*V/(4*Rt);
    return [T(`En Thévenin-kilde har $U_{th} = ${V}$ V og $R_{th} = ${Rt}$ Ω. Hva er den største effekten som kan leveres til en last?`,`A Thévenin source has $U_{th} = ${V}$ V and $R_{th} = ${Rt}$ Ω. What is the maximum power that can be delivered to a load?`),{n:P,tol:rel(P),u:"W"},T(`Med $R_L = R_{th}$: $P = U_{th}^2/(4R_{th}) = ${V*V}/${4*Rt} \\approx ${mf(P,3)}$ W.`,`With $R_L = R_{th}$: $P = U_{th}^2/(4R_{th}) = ${V*V}/${4*Rt} \\approx ${mf(P,3)}$ W.`)]; },
  ()=>{ const V=R.p([5,10,12,20]), Rt=R.p([2,4,5,8,10]); const I=V/Rt;
    return [T(`En Thévenin-kilde har $U_{th} = ${V}$ V og $R_{th} = ${Rt}$ Ω. Hva er Norton-strømmen (kortslutningsstrømmen)?`,`A Thévenin source has $U_{th} = ${V}$ V and $R_{th} = ${Rt}$ Ω. What is the Norton current (short-circuit current)?`),{n:I,tol:rel(I),u:"A"},`$I_N = U_{th}/R_{th} = ${V}/${Rt} = ${mf(I,3)}$ A.`]; }
 );
}

// ================= MEK1000 =================
GEN("MEK1000",0,
 ()=>{ const a=R.i(1,5), b=R.i(-5,5), n=R.i(2,4), x=R.i(-2,2); const v=n*a*(a*x+b)**(n-1);
   return [T(`$f(x) = (${cf(a)}x ${b<0?"-":"+"} ${Math.abs(b)})^{${n}}$. Hva er $f'(${x})$?`,`$f(x) = (${cf(a)}x ${b<0?"-":"+"} ${Math.abs(b)})^{${n}}$. What is $f'(${x})$?`),{n:v,tol:0.01,u:""},T(`Kjerneregelen: $f'(x) = ${n}\\cdot ${a}(${cf(a)}x ${b<0?"-":"+"} ${Math.abs(b)})^{${n-1}}$, som gir ${v}.`,`Chain rule: $f'(x) = ${n}\\cdot ${a}(${cf(a)}x ${b<0?"-":"+"} ${Math.abs(b)})^{${n-1}}$, which gives ${v}.`)]; },
 ()=>{ const n=R.i(2,5), x=R.i(1,3); const s=n*x**(n-1), y=x**n;
   return [T(`Hva er stigningstallet til tangenten til $y = x^{${n}}$ i punktet $x = ${x}$?`,`What is the slope of the tangent to $y = x^{${n}}$ at the point $x = ${x}$?`),{n:s,tol:0,u:""},T(`$y' = ${n}x^{${n-1}}$, så $y'(${x}) = ${s}$. Tangenten går gjennom $(${x}, ${y})$.`,`$y' = ${n}x^{${n-1}}$, so $y'(${x}) = ${s}$. The tangent passes through $(${x}, ${y})$.`)]; },
 ()=>{ const x=R.i(0,2); const v=(2*x+x*x)*Math.exp(x);
   return [T(`$f(x) = x^2e^x$. Hva er $f'(${x})$?`,`$f(x) = x^2e^x$. What is $f'(${x})$?`),{n:v,tol:rel(v,0.005,0.001),u:""},T(`Produktregelen: $f' = (2x + x^2)e^x$, som i $x = ${x}$ gir $\\approx ${mf(v,3)}$.`,`Product rule: $f' = (2x + x^2)e^x$, which at $x = ${x}$ gives $\\approx ${mf(v,3)}$.`)]; }
);
GEN("MEK1000",1,
 ()=>{ const a=R.i(1,4); const v=a**3/6;
   return [T(`Hva er arealet mellom $y = ${cf(a)}x$ og $y = x^2$?`,`What is the area between $y = ${cf(a)}x$ and $y = x^2$?`),{n:v,tol:0.01,u:""},T(`Skjæring i $x = 0$ og $x = ${a}$: $\\int_0^{${a}}(${cf(a)}x - x^2)\\,dx = ${a}^3/6 \\approx ${mf(v,3)}$.`,`Intersections at $x = 0$ and $x = ${a}$: $\\int_0^{${a}}(${cf(a)}x - x^2)\\,dx = ${a}^3/6 \\approx ${mf(v,3)}$.`)]; },
 ()=>{ const b=R.i(1,6); return [T(`Hva er middelverdien av $f(x) = x^2$ på $[0, ${b}]$?`,`What is the mean value of $f(x) = x^2$ on $[0, ${b}]$?`),{n:b*b/3,tol:0.01,u:""},`$\\dfrac{1}{${b}}\\int_0^{${b}}x^2\\,dx = ${b}^2/3 \\approx ${mf(b*b/3,3)}$.`]; },
 ()=>{ const k=R.i(1,3), b=R.i(1,2); const v=(Math.exp(k*b)-1)/k;
   return [`$\\displaystyle\\int_0^{${b}} e^{${cf(k)}x}\\,dx = $`,{n:v,tol:rel(v,0.005),u:""},`$\\left[\\tfrac{1}{${k}}e^{${cf(k)}x}\\right]_0^{${b}} = \\tfrac{e^{${k*b}} - 1}{${k}} \\approx ${mf(v,3)}$.`]; }
);
GEN("MEK1000",2,
 ()=>{ const r=R.p([[1,2],[1,3],[2,3],[1,4],[3,4],[1,5]]); const v=1/(1-r[0]/r[1]);
   return [`$\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\tfrac{${r[0]}}{${r[1]}}\\right)^n = $`,{n:v,tol:0.01,u:""},T(`Geometrisk rekke: $\\dfrac{1}{1 - ${r[0]}/${r[1]}} = ${mf(v,3)}$.`,`Geometric series: $\\dfrac{1}{1 - ${r[0]}/${r[1]}} = ${mf(v,3)}$.`)]; },
 ()=>{ const x=R.p([0.1,0.2,0.3,0.5]); const v=1+x+x*x/2;
   return [T(`Bruk Taylorpolynomet av grad 2 for $e^x$ om 0 til å tilnærme $e^{${mf(x)}}$.`,`Use the degree-2 Taylor polynomial of $e^x$ about 0 to approximate $e^{${mf(x)}}$.`),{n:v,tol:0.0005,u:""},T(`$1 + x + x^2/2 = ${mf(v,4)}$. Den eksakte verdien er $${mf(Math.exp(x),4)}$.`,`$1 + x + x^2/2 = ${mf(v,4)}$. The exact value is $${mf(Math.exp(x),4)}$.`)]; },
 ()=>{ const p=R.p([[1,1,45],[1,-1,-45],[-1,1,135],[0,1,90],[1,0,0],[-1,0,180],[0,-1,-90]]);
   const z=`${p[0]===0?"":p[0]}${p[1]===0?"":(p[1]<0?"-":(p[0]===0?"":"+"))+"i"}`;
   return [T(`Hva er argumentet til $z = ${z}$, i grader (mellom −180° og 180°)?`,`What is the argument of $z = ${z}$, in degrees (between −180° and 180°)?`),{n:p[2],tol:0.5,u:"°"},T(`$z$ ligger i punktet $(${p[0]}, ${p[1]})$ i det komplekse planet, som gir vinkelen ${p[2]}°.`,`$z$ lies at the point $(${p[0]}, ${p[1]})$ in the complex plane, which gives the angle ${p[2]}°.`)]; }
);

