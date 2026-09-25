// Nye fag, del 2 (fortsettelse av subjects2.js)
COURSES.push(

// ================= Numeriske metoder =================
{ code:"NUM", name:"Numeriske metoder", group:"Matematikk og fysikk", isNew:true, also:"Inngår i matematikk- og programmeringsemner", units:[
 { title:"Ligningsløsning", qs:[
  ["Hvor mye reduseres usikkerheten for hvert steg i halveringsmetoden?",["Den halveres","Den kvadreres","Den reduseres med en tidel","Den er uendret"],"Metoden er robust, men treg (lineær konvergens)."],
  ["Hvilken konvergensorden har Newtons metode nær en enkel rot?",["Kvadratisk","Lineær","Kubisk","Den konvergerer ikke"],"Antall riktige siffer dobles omtrent for hvert steg."],
  ["Hva er en ulempe med Newtons metode?",["Den trenger den deriverte og kan divergere med dårlig startgjetning","Den er alltid treg","Den fungerer bare for polynomer","Den krever et intervall med fortegnsskifte"],"Sekantmetoden unngår den deriverte."],
  ["Hva krever halveringsmetoden for å starte?",["Et intervall $[a, b]$ der $f(a)$ og $f(b)$ har ulikt fortegn","Den deriverte","Et startpunkt nær roten","At $f$ er et polynom"],"Skjæringssetningen garanterer da en rot i intervallet."]
 ], gen:[
  ()=>{ const L=R.p([1,2,4,10]), tol=R.p([1e-2,1e-3,1e-4,1e-6]); const n=Math.ceil(Math.log2(L/tol));
    return [T(`Halveringsmetoden startes på et intervall med lengde ${L}. Hvor mange steg trengs for å få intervallet ned til $${tol>=1e-3?mf(tol,4):"10^{"+Math.log10(tol)+"}"}$?`,`The bisection method starts on an interval of length ${L}. How many steps are needed to reduce the interval to $${tol>=1e-3?mf(tol,4):"10^{"+Math.log10(tol)+"}"}$?`),{n,tol:0,u:""},T(`$n \\geq \\log_2(${L}/${tol}) \\approx ${mf(Math.log2(L/tol),2)}$, altså ${n} steg.`,`$n \\geq \\log_2(${L}/${tol}) \\approx ${mf(Math.log2(L/tol),2)}$, so ${n} steps.`)]; },
  ()=>{ const c=R.p([2,3,5,10,20]), x0=R.p([1,2,3]); const x1=x0-(x0**3-c)/(3*x0*x0);
    return [T(`Ett Newton-steg på $f(x) = x^3 - ${c}$ fra $x_0 = ${x0}$. Hva er $x_1$?`,`One Newton step on $f(x) = x^3 - ${c}$ from $x_0 = ${x0}$. What is $x_1$?`),{n:x1,tol:0.001,u:""},`$x_1 = x_0 - \\dfrac{x_0^3 - ${c}}{3x_0^2} = ${x0} - \\dfrac{${x0**3-c}}{${3*x0*x0}} \\approx ${mf(x1,4)}$.`]; },
  ()=>{ const c=R.p([2,3,5,7]); const a=1, b=c; const m=(a+b)/2; const side=m*m-c>0?"venstre":"høyre";
    return [T(`Halveringsmetoden på $f(x) = x^2 - ${c}$ i $[1, ${c}]$: første midtpunkt er $${mf(m)}$. Hvilken halvdel beholdes?`,`Bisection method on $f(x) = x^2 - ${c}$ in $[1, ${c}]$: the first midpoint is $${mf(m)}$. Which half is kept?`),side==="venstre"?[`$[1, ${mf(m)}]$`,`$[${mf(m)}, ${c}]$`]:[`$[${mf(m)}, ${c}]$`,`$[1, ${mf(m)}]$`],T(`$f(${mf(m)}) = ${mf(m*m-c,3)}$. Fortegnsskiftet ligger i ${side} halvdel.`,`$f(${mf(m)}) = ${mf(m*m-c,3)}$. The sign change lies in the ${side==="venstre"?"left":"right"} half.`)]; },
  ()=>{ const c=R.p([2,3,5]), x0=1, x1=2; const f=x=>x*x-c; const x2=x1-f(x1)*(x1-x0)/(f(x1)-f(x0));
    return [T(`Ett sekantsteg på $f(x) = x^2 - ${c}$ med $x_0 = 1$ og $x_1 = 2$. Hva er $x_2$?`,`One secant step on $f(x) = x^2 - ${c}$ with $x_0 = 1$ and $x_1 = 2$. What is $x_2$?`),{n:x2,tol:0.001,u:""},`$x_2 = x_1 - f(x_1)\\dfrac{x_1 - x_0}{f(x_1) - f(x_0)} \\approx ${mf(x2,4)}$.`]; }
 ]},
 { title:"Interpolasjon og integrasjon", qs:[
  ["Hvilke polynomer integrerer Simpsons metode eksakt?",["Opp til grad 3","Opp til grad 1","Opp til grad 2","Bare konstanter"],"Den er basert på parabler, men får en «gratis» grad."],
  ["Hvordan avtar feilen i trapesmetoden når $h$ halveres?",["Omtrent til en firedel ($O(h^2)$)","Til halvparten","Til en sekstendel","Den er uendret"],"Simpson har $O(h^4)$ og får dermed en sekstendel."],
  ["Hva er Runges fenomen?",["Store svingninger nær endene ved høygradig interpolasjon i jevnt fordelte punkter","At Newtons metode divergerer","Avrundingsfeil","At Euler blir ustabil"],"Løses med Chebyshev-punkter eller splines."],
  ["Hvor mange punkter trengs for et interpolasjonspolynom av grad $n$?",["$n + 1$","$n$","$2n$","$n - 1$"],"To punkter gir en rett linje."]
 ], gen:[
  ()=>{ const x0=R.i(0,5), x1=x0+R.p([1,2,4]), y0=R.i(-5,10), y1=R.i(-5,10), t=R.p([0.25,0.5,0.75]); const x=x0+t*(x1-x0), y=y0+t*(y1-y0);
    return [T(`Lineær interpolasjon mellom $(${x0}, ${y0})$ og $(${x1}, ${y1})$. Hva er $y$ i $x = ${mf(x)}$?`,`Linear interpolation between $(${x0}, ${y0})$ and $(${x1}, ${y1})$. What is $y$ at $x = ${mf(x)}$?`),{n:y,tol:0.001,u:""},`$y = ${y0} + \\dfrac{${y1} - ${y0}}{${x1} - ${x0}}(${mf(x)} - ${x0}) = ${mf(y,3)}$.`]; },
  ()=>{ const b=R.i(1,4), p=R.p([2,3]); const ex=b**(p+1)/(p+1);
    return [T(`Simpsons metode med ett dobbeltintervall på $\\int_0^{${b}} x^{${p}}\\,dx$. Hva blir svaret?`,`Simpson's rule with one double interval on $\\int_0^{${b}} x^{${p}}\\,dx$. What is the result?`),{n:ex,tol:0.001,u:""},T(`$\\tfrac{h}{3}(f_0 + 4f_1 + f_2)$ med $h = ${mf(b/2)}$ gir $${mf(ex,4)}$, som er eksakt fordi graden er ${p} ≤ 3.`,`$\\tfrac{h}{3}(f_0 + 4f_1 + f_2)$ with $h = ${mf(b/2)}$ gives $${mf(ex,4)}$, which is exact because the degree is ${p} ≤ 3.`)]; },
  ()=>{ const e=R.p([0.01,0.004,0.08,0.02]), m=R.p([["trapesmetoden",4],["Simpsons metode",16]]); const v=e/m[1];
    return [T(`Med ${m[0]} er feilen ${nf(e,3)}. Omtrent hvor stor blir feilen hvis $h$ halveres?`,`With ${m[1]===4?"the trapezoidal rule":"Simpson's rule"} the error is ${nf(e,3)}. Approximately how large will the error be if $h$ is halved?`),{n:v,tol:rel(v,0.01,1e-6),u:""},T(`Feilen skalerer som ${m[1]===4?"$h^2$":"$h^4$"}, så den deles på ${m[1]}: ${nf(v,5)}.`,`The error scales as ${m[1]===4?"$h^2$":"$h^4$"}, so it is divided by ${m[1]}: ${nf(v,5)}.`)]; },
  ()=>{ const b=R.i(1,3); const h=b/2; const f=x=>x*x; const Tr=h*(f(0)/2+f(h)+f(b)/2);
    return [T(`Trapesmetoden med 2 intervaller på $\\int_0^{${b}} x^2\\,dx$. Hva blir tilnærmingen?`,`The trapezoidal rule with 2 intervals on $\\int_0^{${b}} x^2\\,dx$. What is the approximation?`),{n:Tr,tol:0.001,u:""},T(`$h = ${mf(h)}$: $h(f_0/2 + f_1 + f_2/2) = ${mf(Tr,4)}$. Eksakt er $${mf(b**3/3,4)}$.`,`$h = ${mf(h)}$: $h(f_0/2 + f_1 + f_2/2) = ${mf(Tr,4)}$. The exact value is $${mf(b**3/3,4)}$.`)]; }
 ]},
 { title:"Differensialligninger og stabilitet", qs:[
  ["Hva er ordenen til Eulers eksplisitte metode?",["1","2","4","0"],"Global feil $O(h)$."],
  ["Hva er ordenen til den klassiske Runge–Kutta-metoden (RK4)?",["4","2","1","8"],"Den bruker fire funksjonsevalueringer per steg."],
  ["Hva er et stivt (stiff) problem?",["Et problem med svært ulike tidsskalaer, der eksplisitte metoder trenger bittesmå steg","Et problem uten løsning","Et lineært problem","Et problem med bare én variabel"],"Implisitte metoder som bakover-Euler er stabile her."],
  ["Hvorfor er implisitt (bakover-) Euler dyrere per steg?",["Man må løse en ligning (ofte et ligningssystem) for $y_{n+1}$ i hvert steg","Den bruker fire evalueringer","Den har høyere orden","Den krever mindre $h$"],"Til gjengjeld er den stabil for store steg."]
 ], gen:[
  ()=>{ const y0=R.i(1,5), k=R.p([-2,-1,1,2]), h=R.p([0.1,0.2,0.5]); let y=y0; for(let i=0;i<2;i++) y=y+h*k*y;
    return [T(`To steg med Eulers metode for $y' = ${cf(k)}y$, $y(0) = ${y0}$ og $h = ${mf(h)}$. Hva er $y_2$?`,`Two steps of Euler's method for $y' = ${cf(k)}y$, $y(0) = ${y0}$ and $h = ${mf(h)}$. What is $y_2$?`),{n:y,tol:0.001,u:""},T(`Hvert steg ganger med $(1 + h\\cdot ${k}) = ${mf(1+h*k)}$: $y_2 = ${y0}\\cdot ${mf(1+h*k)}^2 = ${mf(y,4)}$.`,`Each step multiplies by $(1 + h\\cdot ${k}) = ${mf(1+h*k)}$: $y_2 = ${y0}\\cdot ${mf(1+h*k)}^2 = ${mf(y,4)}$.`)]; },
  ()=>{ const l=R.p([-1,-2,-5,-10,-50,-100,-1000]); return [T(`Hva er største stabile steglengde for eksplisitt Euler på $y' = ${l}y$?`,`What is the largest stable step size for explicit Euler on $y' = ${l}y$?`),{n:2/Math.abs(l),tol:1e-4,u:""},T(`Stabilitet krever $|1 + h\\lambda| \\leq 1$, altså $h \\leq 2/|\\lambda| = ${mf(2/Math.abs(l),4)}$.`,`Stability requires $|1 + h\\lambda| \\leq 1$, i.e. $h \\leq 2/|\\lambda| = ${mf(2/Math.abs(l),4)}$.`)]; },
  ()=>{ const p=R.p([[1,"Euler"],[2,"Heun"],[4,"RK4"]]), f=R.p([2,4,10]); const r=f**p[0];
    return [T(`Du deler steglengden på ${f} med ${p[1]} (orden ${p[0]}). Omtrent hvor mye mindre blir den globale feilen?`,`You divide the step size by ${f} using ${p[1]} (order ${p[0]}). Approximately how many times smaller does the global error become?`),{n:r,tol:0,u:"ganger"},T(`Feilen skalerer som $h^{${p[0]}}$: $${f}^{${p[0]}} = ${r}$.`,`The error scales as $h^{${p[0]}}$: $${f}^{${p[0]}} = ${r}$.`)]; }
 ]}
]},

// ================= Ingeniørøkonomi =================
{ code:"OKON", name:"Ingeniørøkonomi", group:"Produktutvikling og økonomi", isNew:true, also:"Inngår i f.eks. NMBU INN200 og økonomiemner ved NTNU/OsloMet", units:[
 { title:"Rente og tidsverdi", qs:[
  ["Hvorfor er 100 kr i dag verdt mer enn 100 kr om ett år?",["Pengene kan forrentes i mellomtiden (og inflasjon og risiko)","Fordi sedler slites","Fordi skatten øker","Det er de ikke"],"Dette er grunnlaget for diskontering."],
  ["Hva er nåverdien av et beløp $F$ om $n$ år med rente $r$?",["$F/(1+r)^n$","$F(1+r)^n$","$F - nr$","$F/(1+nr)$"],"Det kalles diskontering."],
  ["Hva er realrente?",["Rente justert for inflasjon","Rente før skatt","Rente på lån","Rente fra Norges Bank"],"$(1 + r_{nom})/(1 + i) - 1$."],
  ["Hva gjør rentes rente?",["Renten beregnes også av tidligere opptjente renter","Renten er fast","Renten betales bare én gang","Renten avtar over tid"],"Det gir eksponentiell vekst."]
 ], gen:[
  ()=>{ const P=R.p([1000,10000,50000,100000]), r=R.p([0.02,0.03,0.05,0.07,0.1]), n=R.i(2,20); const F=P*(1+r)**n;
    return [T(`Du setter inn ${P.toLocaleString("nb-NO")} kr til ${nf(r*100)} % årlig rente. Hva er beløpet etter ${n} år?`,`You deposit ${P.toLocaleString("en-US")} NOK at ${nf(r*100)}% annual interest. What is the balance after ${n} years?`),{n:F,tol:rel(F,0.001),u:"kr"},T(`$F = P(1+r)^n = ${P}\\cdot ${mf(1+r)}^{${n}} \\approx ${nf(F,0)}$ kr.`,`$F = P(1+r)^n = ${P}\\cdot ${mf(1+r)}^{${n}} \\approx ${nf(F,0)}$ NOK.`)]; },
  ()=>{ const F=R.p([10000,100000,1000000]), r=R.p([0.04,0.06,0.08,0.1]), n=R.i(3,15); const P=F/(1+r)**n;
    return [T(`Hva er nåverdien av ${F.toLocaleString("nb-NO")} kr som kommer om ${n} år, med kalkulasjonsrente ${nf(r*100)} %?`,`What is the present value of ${F.toLocaleString("en-US")} NOK received in ${n} years, at a discount rate of ${nf(r*100)}%?`),{n:P,tol:rel(P,0.001),u:"kr"},T(`$P = F/(1+r)^n \\approx ${nf(P,0)}$ kr.`,`$P = F/(1+r)^n \\approx ${nf(P,0)}$ NOK.`)]; },
  ()=>{ const r=R.p([0.02,0.04,0.05,0.07,0.08,0.1,0.12]); const n=Math.log(2)/Math.log(1+r);
    return [T(`Hvor mange år tar det å doble et beløp ved ${nf(r*100)} % årlig rente?`,`How many years does it take to double an amount at ${nf(r*100)}% annual interest?`),{n,tol:0.05,u:"år"},T(`$n = \\ln 2/\\ln(1+r) \\approx ${mf(n,2)}$ år. Tommelfingerregelen er $72/${mf(r*100)} = ${mf(72/(r*100),1)}$.`,`$n = \\ln 2/\\ln(1+r) \\approx ${mf(n,2)}$ years. The rule of thumb (rule of 72) gives $72/${mf(r*100)} = ${mf(72/(r*100),1)}$.`)]; },
  ()=>{ const rn=R.p([0.04,0.05,0.06,0.08]), i=R.p([0.02,0.03,0.04]); const rr=((1+rn)/(1+i)-1)*100;
    return [T(`Nominell rente er ${nf(rn*100)} % og inflasjonen ${nf(i*100)} %. Hva er realrenten?`,`The nominal interest rate is ${nf(rn*100)}% and inflation is ${nf(i*100)}%. What is the real interest rate?`),{n:rr,tol:0.02,u:"%"},`$(1 + ${mf(rn)})/(1 + ${mf(i)}) - 1 \\approx ${mf(rr,3)}$ %.`]; }
 ]},
 { title:"Investeringsanalyse", qs:[
  ["Når er en investering lønnsom etter nåverdimetoden?",["Når netto nåverdi (NPV) er større enn null","Når tilbakebetalingstiden er under ett år","Når inntektene er større enn investeringen, udiskontert","Når renten er null"],"NPV > 0 betyr at avkastningen er bedre enn kalkulasjonsrenten."],
  ["Hva er internrenten (IRR)?",["Renten som gir netto nåverdi lik null","Bankens utlånsrente","Inflasjonen","Skattesatsen"],"Investeringen er lønnsom hvis IRR er høyere enn avkastningskravet."],
  ["Hva er svakheten ved enkel tilbakebetalingsmetode?",["Den ignorerer tidsverdien og kontantstrømmene etter tilbakebetalingstiden","Den er vanskelig å regne ut","Den bruker for høy rente","Den krever IRR"],"Den er likevel nyttig som et grovt risikomål."],
  ["Hva er et annuitetslån?",["Et lån med like store terminbeløp (renter + avdrag)","Et lån med like store avdrag","Et lån uten renter","Et lån som betales tilbake på én gang"],"Et serielån har like store avdrag, så terminbeløpet synker."]
 ], gen:[
  ()=>{ const I=R.p([100000,200000,500000]), C=R.p([20000,30000,50000,80000,120000]), n=R.i(3,10), r=R.p([0.05,0.07,0.1]); const af=(1-(1+r)**-n)/r; const npv=-I+C*af;
    return [T(`En investering koster ${I.toLocaleString("nb-NO")} kr og gir ${C.toLocaleString("nb-NO")} kr i året i ${n} år. Kalkulasjonsrenten er ${nf(r*100)} %. Hva er netto nåverdi?`,`An investment costs ${I.toLocaleString("en-US")} NOK and returns ${C.toLocaleString("en-US")} NOK per year for ${n} years. The discount rate is ${nf(r*100)}%. What is the net present value?`),{n:npv,tol:Math.max(Math.abs(npv)*0.002,10),u:"kr"},T(`Annuitetsfaktor $\\dfrac{1-(1+r)^{-n}}{r} = ${mf(af,4)}$, og $NPV = -${I} + ${C}\\cdot ${mf(af,4)} \\approx ${nf(npv,0)}$ kr. ${npv>0?"Den er lønnsom.":"Den er ikke lønnsom."}`,`Annuity factor $\\dfrac{1-(1+r)^{-n}}{r} = ${mf(af,4)}$, and $NPV = -${I} + ${C}\\cdot ${mf(af,4)} \\approx ${nf(npv,0)}$ NOK. ${npv>0?"The investment is profitable.":"The investment is not profitable."}`)]; },
  ()=>{ const I=R.p([60000,100000,240000]), C=R.p([12000,20000,30000,40000]); const t=I/C;
    return [T(`En maskin koster ${I.toLocaleString("nb-NO")} kr og sparer ${C.toLocaleString("nb-NO")} kr i året. Hva er enkel tilbakebetalingstid?`,`A machine costs ${I.toLocaleString("en-US")} NOK and saves ${C.toLocaleString("en-US")} NOK per year. What is the simple payback period?`),{n:t,tol:0.01,u:"år"},T(`$${I}/${C} = ${mf(t,2)}$ år.`,`$${I}/${C} = ${mf(t,2)}$ years.`)]; },
  ()=>{ const P=R.p([100000,500000,1000000,3000000]), r=R.p([0.03,0.04,0.05,0.06]), n=R.p([5,10,20,25]); const A=P*r/(1-(1+r)**-n);
    return [T(`Et annuitetslån på ${P.toLocaleString("nb-NO")} kr med ${nf(r*100)} % rente betales ned med ett terminbeløp i året i ${n} år. Hvor stort er terminbeløpet?`,`An annuity loan of ${P.toLocaleString("en-US")} NOK at ${nf(r*100)}% interest is repaid with one payment per year for ${n} years. How large is each payment?`),{n:A,tol:rel(A,0.001),u:"kr"},T(`$A = P\\dfrac{r}{1-(1+r)^{-n}} \\approx ${nf(A,0)}$ kr per år.`,`$A = P\\dfrac{r}{1-(1+r)^{-n}} \\approx ${nf(A,0)}$ NOK per year.`)]; },
  ()=>{ const I=R.p([100,200]), C=I*R.p([0.6,0.7]), n=2; const irr=(()=>{let lo=-0.9,hi=2;for(let k=0;k<100;k++){const m=(lo+hi)/2;const v=-I+C/(1+m)+C/(1+m)**2;if(v>0)lo=m;else hi=m;}return lo;})()*100;
    return [T(`En investering på ${I} gir ${mf(C)} etter ett år og ${mf(C)} etter to år. Hva er internrenten?`,`An investment of ${I} returns ${mf(C)} after one year and ${mf(C)} after two years. What is the internal rate of return (IRR)?`),{n:irr,tol:0.2,u:"%"},T(`Løs $-${I} + \\dfrac{${mf(C)}}{1+r} + \\dfrac{${mf(C)}}{(1+r)^2} = 0$, som gir $r \\approx ${mf(irr,1)}$ %.`,`Solve $-${I} + \\dfrac{${mf(C)}}{1+r} + \\dfrac{${mf(C)}}{(1+r)^2} = 0$, which gives $r \\approx ${mf(irr,1)}$ %.`)]; }
 ]},
 { title:"Kostnader og lønnsomhet", qs:[
  ["Hva er forskjellen på faste og variable kostnader?",["Faste endres ikke med produsert mengde, variable gjør det","Faste er alltid større","Variable betales bare én gang","Det er det samme"],"Husleie er fast, og råvarer er variable."],
  ["Hva er dekningsbidrag per enhet?",["Pris minus variabel kostnad per enhet","Pris minus fast kostnad","Omsetning minus skatt","Total kostnad delt på antall"],"Det skal dekke de faste kostnadene."],
  ["Hva er lineær avskrivning?",["Like stor verdinedgang hvert år over levetiden","Verdinedgang med en fast prosent av restverdien","Ingen verdinedgang","Nedskriving til null første år"],"$(I - \\text{restverdi})/n$ per år."],
  ["Hva er alternativkostnad?",["Verdien av det beste alternativet man gir opp","Kostnaden ved et reservealternativ","En skjult kostnad i regnskapet","Prisen på reservedeler"],"Den er sentral i beslutninger selv om den ikke står i regnskapet."]
 ], gen:[
  ()=>{ const FC=R.p([50000,100000,200000,500000]), p=R.p([100,250,500,1000]), vc=p*R.p([0.4,0.5,0.6,0.7]); const Q=FC/(p-vc);
    return [T(`Faste kostnader er ${FC.toLocaleString("nb-NO")} kr. Et produkt selges for ${p} kr og har variabel kostnad ${nf(vc)} kr per stk. Hvor mange må selges for å gå i null?`,`Fixed costs are ${FC.toLocaleString("en-US")} NOK. A product sells for ${p} NOK and has a variable cost of ${nf(vc)} NOK per unit. How many must be sold to break even?`),{n:Q,tol:rel(Q,0.005,0.5),u:"stk"},T(`$Q = FK/(p - VK) = ${FC}/${mf(p-vc)} \\approx ${nf(Q,1)}$ stk.`,`$Q = FC/(p - VC) = ${FC}/${mf(p-vc)} \\approx ${nf(Q,1)}$ pcs.`)]; },
  ()=>{ const I=R.p([100000,250000,500000]), S=R.p([0,10000,50000]), n=R.p([4,5,8,10]); const d=(I-S)/n;
    return [T(`En maskin koster ${I.toLocaleString("nb-NO")} kr, har restverdi ${S.toLocaleString("nb-NO")} kr og levetid ${n} år. Hva er den årlige lineære avskrivningen?`,`A machine costs ${I.toLocaleString("en-US")} NOK, has a residual value of ${S.toLocaleString("en-US")} NOK and a service life of ${n} years. What is the annual straight-line depreciation?`),{n:d,tol:1,u:"kr"},T(`$(${I} - ${S})/${n} = ${nf(d,0)}$ kr per år.`,`$(${I} - ${S})/${n} = ${nf(d,0)}$ NOK per year.`)]; },
  ()=>{ const FC=R.p([20000,50000]), vc=R.p([20,50,80]), Q=R.p([500,1000,2000]); const TC=FC+vc*Q, AC=TC/Q;
    return [T(`Faste kostnader er ${FC.toLocaleString("nb-NO")} kr og variabel kostnad ${vc} kr/stk. Hva er gjennomsnittskostnaden per stk ved ${Q} stk?`,`Fixed costs are ${FC.toLocaleString("en-US")} NOK and the variable cost is ${vc} NOK/pc. What is the average cost per unit at ${Q} pcs?`),{n:AC,tol:0.01,u:"kr"},T(`$(${FC} + ${vc}\\cdot ${Q})/${Q} = ${mf(AC,2)}$ kr.`,`$(${FC} + ${vc}\\cdot ${Q})/${Q} = ${mf(AC,2)}$ NOK.`)]; }
 ]}
]},

// ================= Generell kjemi =================
{ code:"KJEMI", name:"Generell kjemi", group:"Matematikk og fysikk", isNew:true, also:"NMBU KJM100 · NTNU TMT4100", units:[
 { title:"Mol og støkiometri", qs:[
  ["Hva er Avogadros tall?",["$6{,}022\\cdot10^{23}$ partikler per mol","$6{,}022\\cdot10^{-23}$","$8{,}314$","$9{,}81$"],"Én mol karbon-12 veier 12 g (svært nær)."],
  ["Hva er den begrensende reaktanten?",["Den som brukes opp først og bestemmer hvor mye produkt som dannes","Den med størst masse","Den som er i overskudd","Katalysatoren"],"Regn om til mol og sammenlign med koeffisientene."],
  ["Hvilken ligning er balansert?",["$\\mathrm{CH_4 + 2O_2 \\to CO_2 + 2H_2O}$","$\\mathrm{CH_4 + O_2 \\to CO_2 + H_2O}$","$\\mathrm{CH_4 + 3O_2 \\to CO_2 + 2H_2O}$","$\\mathrm{2CH_4 + O_2 \\to CO_2 + H_2O}$"],"Tell C, H og O på begge sider."],
  ["Hva er molaritet (konsentrasjon)?",["Mol stoff per liter løsning","Gram per liter","Mol per kg løsemiddel","Masseprosent"],"$c = n/V$, med enheten mol/L (M)."]
 ], gen:[
  ()=>{ const s=R.p([["H₂O",18.02],["CO₂",44.01],["NaCl",58.44],["CH₄",16.04],["O₂",32.00],["NH₃",17.03],["C₆H₁₂O₆",180.16]]), m=R.p([1,5,10,18,36,50,100,180]); const n=m/s[1];
    return [T(`Hvor mange mol er ${m} g ${s[0]}? ($M = ${mf(s[1])}$ g/mol)`,`How many moles are in ${m} g of ${s[0]}? ($M = ${mf(s[1])}$ g/mol)`),{n,tol:rel(n,0.005),u:"mol"},`$n = m/M = ${m}/${mf(s[1])} \\approx ${mf(n,4)}$ mol.`]; },
  ()=>{ const m=R.p([8,16,32,50,100]); const n=m/16.04, mc=n*44.01;
    return [T(`Hvor mange gram CO₂ dannes når ${m} g metan brenner fullstendig? ($\\mathrm{CH_4 + 2O_2 \\to CO_2 + 2H_2O}$; $M$: CH₄ 16,04, CO₂ 44,01)`,`How many grams of CO₂ are formed when ${m} g of methane burns completely? ($\\mathrm{CH_4 + 2O_2 \\to CO_2 + 2H_2O}$; $M$: CH₄ 16.04, CO₂ 44.01)`),{n:mc,tol:rel(mc,0.005),u:"g"},T(`$n_{CH_4} = ${mf(n,4)}$ mol gir like mange mol CO₂: $${mf(n,4)}\\cdot 44{,}01 \\approx ${mf(mc,2)}$ g.`,`$n_{CH_4} = ${mf(n,4)}$ mol gives the same number of moles of CO₂: $${mf(n,4)}\\cdot 44.01 \\approx ${mf(mc,2)}$ g.`)]; },
  ()=>{ const c1=R.p([0.5,1,2,6]), V1=R.p([10,25,50,100]), V2=R.p([250,500,1000]); const c2=c1*V1/V2;
    return [T(`${V1} mL av en ${nf(c1)} M løsning fortynnes til ${V2} mL. Hva blir konsentrasjonen?`,`${V1} mL of a ${nf(c1)} M solution is diluted to ${V2} mL. What is the new concentration?`),{n:c2,tol:rel(c2),u:"M"},T(`$c_1V_1 = c_2V_2$ gir $c_2 = ${mf(c1)}\\cdot ${V1}/${V2} = ${mf(c2,4)}$ M.`,`$c_1V_1 = c_2V_2$ gives $c_2 = ${mf(c1)}\\cdot ${V1}/${V2} = ${mf(c2,4)}$ M.`)]; },
  ()=>{ const n=R.p([0.1,0.25,0.5,1]), V=R.p([0.25,0.5,1,2]); return [T(`${nf(n)} mol løses i vann til ${nf(V)} L løsning. Hva er konsentrasjonen?`,`${nf(n)} mol is dissolved in water to make ${nf(V)} L of solution. What is the concentration?`),{n:n/V,tol:0.001,u:"M"},`$c = n/V = ${mf(n)}/${mf(V)} = ${mf(n/V,3)}$ M.`]; }
 ]},
 { title:"Syrer, baser og likevekt", qs:[
  ["Hva er definisjonen av pH?",["$\\mathrm{pH} = -\\log[\\mathrm{H^+}]$","$\\mathrm{pH} = \\log[\\mathrm{H^+}]$","$\\mathrm{pH} = [\\mathrm{OH^-}]$","$\\mathrm{pH} = 14[\\mathrm{H^+}]$"],"Lav pH betyr sur løsning."],
  ["Hva gjelder for vann ved 25 °C?",["$\\mathrm{pH + pOH} = 14$","$\\mathrm{pH = pOH} = 14$","$\\mathrm{pH} \\cdot \\mathrm{pOH} = 14$","$\\mathrm{pH} - \\mathrm{pOH} = 7$"],"$K_w = 10^{-14}$."],
  ["Hva er en buffer?",["En løsning av en svak syre og dens korresponderende base, som motstår endring i pH","En sterk syre","Destillert vann","En katalysator"],"Blodet er for eksempel bufret rundt pH 7,4."],
  ["Hva sier Le Châteliers prinsipp?",["En likevekt forskyves slik at den motvirker en ytre endring","Alle reaksjoner går til fullføring","Temperaturen er alltid konstant","Trykk påvirker ikke likevekter"],"Et eksempel: økt trykk favoriserer siden med færre gassmolekyler."],
  ["Hva kjennetegner en sterk syre?",["Den protolyserer (dissosierer) fullstendig i vann","Den er konsentrert","Den er giftig","Den har høy pH"],"Eksempler er HCl, HNO₃ og H₂SO₄ (første trinn)."]
 ], gen:[
  ()=>{ const a=R.p([1,2,5]), k=R.i(1,4); const c=a*10**-k; const pH=-Math.log10(c);
    return [T(`Hva er pH i en ${nf(c,5)} M HCl-løsning?`,`What is the pH of a ${nf(c,5)} M HCl solution?`),{n:pH,tol:0.01,u:""},T(`HCl er en sterk syre: $[\\mathrm{H^+}] = ${mf(c,5)}$, og $\\mathrm{pH} = -\\log(${mf(c,5)}) \\approx ${mf(pH,2)}$.`,`HCl is a strong acid: $[\\mathrm{H^+}] = ${mf(c,5)}$, and $\\mathrm{pH} = -\\log(${mf(c,5)}) \\approx ${mf(pH,2)}$.`)]; },
  ()=>{ const c=R.p([0.001,0.01,0.05,0.1]); const pH=14+Math.log10(c);
    return [T(`Hva er pH i en ${nf(c,3)} M NaOH-løsning (25 °C)?`,`What is the pH of a ${nf(c,3)} M NaOH solution (25 °C)?`),{n:pH,tol:0.01,u:""},T(`$\\mathrm{pOH} = -\\log(${mf(c,3)}) = ${mf(-Math.log10(c),2)}$, så $\\mathrm{pH} = 14 - ${mf(-Math.log10(c),2)} = ${mf(pH,2)}$.`,`$\\mathrm{pOH} = -\\log(${mf(c,3)}) = ${mf(-Math.log10(c),2)}$, so $\\mathrm{pH} = 14 - ${mf(-Math.log10(c),2)} = ${mf(pH,2)}$.`)]; },
  ()=>{ const pH=R.p([2,3,4,5,9,11]); return [T(`En løsning har pH ${pH}. Hvor mange ganger høyere er $[\\mathrm{H^+}]$ enn i nøytralt vann (pH 7)?`,`A solution has pH ${pH}. How many times higher is $[\\mathrm{H^+}]$ than in neutral water (pH 7)?`),{n:10**(7-pH),tol:rel(10**(7-pH),0.001,1e-9),u:"ganger"},`$10^{7-${pH}} = ${nf(10**(7-pH),4)}$.`]; }
 ]},
 { title:"Termokjemi og elektrokjemi", qs:[
  ["Hva betyr det at en reaksjon er eksoterm?",["Den avgir varme: $\\Delta H < 0$","Den tar opp varme","Den skjer bare ved høy temperatur","Den er langsom"],"Forbrenning er eksoterm."],
  ["Hva er oksidasjon?",["Avgivelse av elektroner","Opptak av elektroner","Opptak av protoner","Avgivelse av nøytroner"],"Huskeregel: OIL RIG (Oxidation Is Loss, Reduction Is Gain)."],
  ["Når er en reaksjon spontan ved konstant $T$ og $p$?",["Når $\\Delta G = \\Delta H - T\\Delta S < 0$","Når $\\Delta H > 0$","Når $\\Delta S < 0$","Når $\\Delta G > 0$"],"Spontan betyr ikke nødvendigvis rask."],
  ["Hva skjer i en galvanisk celle?",["En spontan redoksreaksjon gir elektrisk strøm","Strøm driver en ikke-spontan reaksjon","Vann spaltes","Metaller smeltes"],"Et eksempel er et batteri. I elektrolyse går det motsatt vei."],
  ["Hva er en katalysator?",["Et stoff som øker reaksjonsfarten uten å forbrukes, ved å senke aktiveringsenergien","Et stoff som forskyver likevekten","Et produkt","Et løsemiddel"],"Likevektskonstanten endres ikke."]
 ], gen:[
  ()=>{ const dH=R.p([-100,-50,50,100,180]), dS=R.p([-200,-100,50,100,200]), Tk=R.p([250,298,500,1000]); const dG=dH-Tk*dS/1000; const sp=dG<0;
    return [T(`$\\Delta H = ${dH}$ kJ/mol og $\\Delta S = ${dS}$ J/(mol·K). Er reaksjonen spontan ved ${Tk} K?`,`$\\Delta H = ${dH}$ kJ/mol and $\\Delta S = ${dS}$ J/(mol·K). Is the reaction spontaneous at ${Tk} K?`),T(sp?["Ja, $\\Delta G < 0$","Nei, $\\Delta G > 0$"]:["Nei, $\\Delta G > 0$","Ja, $\\Delta G < 0$"],sp?["Yes, $\\Delta G < 0$","No, $\\Delta G > 0$"]:["No, $\\Delta G > 0$","Yes, $\\Delta G < 0$"]),`$\\Delta G = ${dH} - ${Tk}\\cdot(${mf(dS/1000,3)}) = ${mf(dG,1)}$ kJ/mol.`]; },
  ()=>{ const I=R.p([1,2,5,10]), t=R.p([600,1800,3600]), m=R.p([["kobber (Cu²⁺)",63.55,2],["sølv (Ag⁺)",107.87,1],["sink (Zn²⁺)",65.38,2]]); const mass=I*t*m[1]/(m[2]*96485); const mEN={"kobber (Cu²⁺)":"copper (Cu²⁺)","sølv (Ag⁺)":"silver (Ag⁺)","sink (Zn²⁺)":"zinc (Zn²⁺)"}[m[0]];
    return [T(`Hvor mange gram ${m[0]} felles ut ved elektrolyse med ${I} A i ${t/60} minutter? ($F = 96\\,485$ C/mol)`,`How many grams of ${mEN} are deposited by electrolysis at ${I} A for ${t/60} minutes? ($F = 96\\,485$ C/mol)`),{n:mass,tol:rel(mass,0.005),u:"g"},`$m = \\dfrac{ItM}{zF} = \\dfrac{${I}\\cdot ${t}\\cdot ${mf(m[1])}}{${m[2]}\\cdot 96\\,485} \\approx ${mf(mass,3)}$ g.`]; },
  ()=>{ const n=R.p([0.5,1,2]), Tk=R.p([273,298,373]), p=R.p([100,101.3,200]); const V=n*8.314*Tk/p;
    return [T(`Hvilket volum har ${nf(n)} mol ideell gass ved ${Tk} K og ${nf(p,1)} kPa?`,`What is the volume of ${nf(n)} mol of ideal gas at ${Tk} K and ${nf(p,1)} kPa?`),{n:V,tol:rel(V),u:"L"},T(`$V = nRT/p = ${mf(n)}\\cdot 8{,}314\\cdot ${Tk}/${mf(p,1)} \\approx ${mf(V,2)}$ L.`,`$V = nRT/p = ${mf(n)}\\cdot 8.314\\cdot ${Tk}/${mf(p,1)} \\approx ${mf(V,2)}$ L.`)]; }
 ]}
]},

// ================= Elektronikk =================
{ code:"ELEK", name:"Elektronikk", group:"Elektro og automasjon", isNew:true, also:"NMBU FYS235", units:[
 { title:"Dioder og transistorer", qs:[
  ["Omtrent hvor stort er spenningsfallet over en silisiumdiode i lederetning?",["0,7 V","0,1 V","2 V","5 V"],"Schottkydioder har rundt 0,3 V, og LED-er 1,8–3,3 V."],
  ["Hva brukes en zenerdiode typisk til?",["Å holde en stabil referansespenning i sperreretning","Å forsterke signaler","Å lage lys","Å likerette høy strøm"],"Den leder ved zenerspenningen i sperreretning."],
  ["Hvordan henger kollektor- og basisstrøm sammen i en BJT i aktivt område?",["$I_C = \\beta I_B$","$I_C = I_B$","$I_C = I_B/\\beta$","$I_C = 0$"],"$\\beta$ er typisk 50–300."],
  ["Hva styrer strømmen i en MOSFET?",["Spenningen mellom gate og source","Strømmen inn i gaten","Temperaturen","Drain-strømmen"],"Gaten er isolert, så den trekker nesten ingen likestrøm."],
  ["Hva gjør en brolikeretter?",["Gjør begge halvperiodene av vekselspenning om til samme polaritet","Forsterker spenningen","Filtrerer bort likespenning","Lager vekselstrøm fra likestrøm"],"Den bruker fire dioder."]
 ], gen:[
  ()=>{ const V=R.p([3.3,5,9,12]), Rr=R.p([220,330,470,1000,2200]); const I=(V-0.7)/Rr*1000;
    return [T(`En silisiumdiode og en motstand på ${Rr} Ω står i serie over ${nf(V,1)} V. Hvor stor er strømmen?`,`A silicon diode and a ${Rr} Ω resistor are connected in series across ${nf(V,1)} V. What is the current?`),{n:I,tol:rel(I),u:"mA"},T(`$I = (${mf(V,1)} - 0{,}7)/${Rr} \\approx ${mf(I,2)}$ mA.`,`$I = (${mf(V,1)} - 0.7)/${Rr} \\approx ${mf(I,2)}$ mA.`)]; },
  ()=>{ const b=R.p([50,100,150,200]), Ib=R.p([10,20,50,100]); return [T(`En BJT har $\\beta = ${b}$ og basisstrøm ${Ib} µA. Hva er kollektorstrømmen?`,`A BJT has $\\beta = ${b}$ and a base current of ${Ib} µA. What is the collector current?`),{n:b*Ib/1000,tol:0.001,u:"mA"},`$I_C = \\beta I_B = ${b}\\cdot ${Ib}$ µA $= ${mf(b*Ib/1000,2)}$ mA.`]; },
  ()=>{ const I=R.p([0.1,0.5,1]), f=R.p([50,100]), C=R.p([1000,2200,4700]); const Vr=I/(f*C*1e-6);
    return [T(`En likeretter med glattekondensator ${C} µF leverer ${nf(I)} A. Rippelfrekvensen er ${f} Hz. Omtrent hvor stor er rippelspenningen (topp–topp)?`,`A rectifier with a ${C} µF smoothing capacitor delivers ${nf(I)} A. The ripple frequency is ${f} Hz. Approximately how large is the ripple voltage (peak-to-peak)?`),{n:Vr,tol:rel(Vr),u:"V"},`$\\Delta V \\approx I/(fC) = ${mf(I)}/(${f}\\cdot ${C}\\cdot10^{-6}) \\approx ${mf(Vr,3)}$ V.`]; }
 ]},
 { title:"Operasjonsforsterkere", qs:[
  ["Hvilke to regler gjelder for en ideell op-amp med negativ tilbakekobling?",["Ingen strøm inn i inngangene, og de to inngangene har samme spenning","Utgangen er alltid null","Inngangene har uendelig strøm","Forsterkningen er 1"],"Den andre regelen kalles virtuell kortslutning."],
  ["Hva er forsterkningen til en inverterende forsterker?",["$-R_f/R_{inn}$","$1 + R_f/R_{inn}$","$R_{inn}/R_f$","1"],"Minustegnet betyr 180° faseskift."],
  ["Hva er forsterkningen til en ikke-inverterende forsterker?",["$1 + R_f/R_g$","$-R_f/R_g$","$R_g/R_f$","0"],"Den er alltid minst 1."],
  ["Hva brukes en spenningsfølger (buffer) til?",["Å gi høy inngangsimpedans og lav utgangsimpedans med forsterkning 1","Å invertere signalet","Å integrere","Å filtrere høye frekvenser"],"Den hindrer at kilden blir belastet."],
  ["Hva skjer hvis den ideelle utgangen overstiger forsyningsspenningen?",["Utgangen går i metning (klippes) nær forsyningsspenningen","Op-ampen forsterker uansett","Utgangen blir null","Forsterkningen dobles"],"Rail-to-rail-op-amper kommer nærmest forsyningen."]
 ], gen:[
  ()=>{ const Rin=R.p([1,2,4.7,10]), Rf=R.p([10,22,47,100]), Vin=R.p([-0.5,-0.2,0.1,0.2,0.5]); const Vo=-Rf/Rin*Vin;
    return [T(`En inverterende forsterker har $R_{inn} = ${mf(Rin,1)}$ kΩ og $R_f = ${Rf}$ kΩ. Inngangen er ${nf(Vin)} V. Hva er utgangen (ideelt, ingen metning)?`,`An inverting amplifier has $R_{in} = ${mf(Rin,1)}$ kΩ and $R_f = ${Rf}$ kΩ. The input is ${nf(Vin)} V. What is the output (ideal, no saturation)?`),{n:Vo,tol:rel(Vo,0.005,0.001),u:"V"},T(`$V_o = -\\dfrac{R_f}{R_{inn}}V_{inn} = -${mf(Rf/Rin,3)}\\cdot(${mf(Vin)}) \\approx ${mf(Vo,3)}$ V.`,`$V_o = -\\dfrac{R_f}{R_{in}}V_{in} = -${mf(Rf/Rin,3)}\\cdot(${mf(Vin)}) \\approx ${mf(Vo,3)}$ V.`)]; },
  ()=>{ const Rg=R.p([1,2.2,4.7,10]), Rf=R.p([10,22,47,100]); const A=1+Rf/Rg;
    return [T(`Hva er forsterkningen til en ikke-inverterende forsterker med $R_f = ${Rf}$ kΩ og $R_g = ${mf(Rg,1)}$ kΩ?`,`What is the gain of a non-inverting amplifier with $R_f = ${Rf}$ kΩ and $R_g = ${mf(Rg,1)}$ kΩ?`),{n:A,tol:rel(A),u:""},`$1 + R_f/R_g = 1 + ${mf(Rf/Rg,3)} \\approx ${mf(A,3)}$.`]; },
  ()=>{ const R1=10, R2=R.p([10,20]), Rf=R.p([10,20,50]), V1=R.p([0.5,1,2]), V2=R.p([-1,0.5,1]); const Vo=-Rf*(V1/R1+V2/R2);
    return [T(`En inverterende summasjonsforsterker har $R_1 = ${R1}$ kΩ, $R_2 = ${R2}$ kΩ og $R_f = ${Rf}$ kΩ. $V_1 = ${mf(V1)}$ V og $V_2 = ${mf(V2)}$ V. Hva er $V_o$?`,`An inverting summing amplifier has $R_1 = ${R1}$ kΩ, $R_2 = ${R2}$ kΩ and $R_f = ${Rf}$ kΩ. $V_1 = ${mf(V1)}$ V and $V_2 = ${mf(V2)}$ V. What is $V_o$?`),{n:Vo,tol:0.005,u:"V"},`$V_o = -R_f(V_1/R_1 + V_2/R_2) = -${Rf}(${mf(V1/R1,3)} + ${mf(V2/R2,3)}) = ${mf(Vo,3)}$ V.`]; },
  ()=>{ const Vs=R.p([5,12,15]), A=R.p([10,20,50,100]), Vin=R.p([0.1,0.2,0.5,1]); const ideal=A*Vin; const Vo=Math.min(ideal,Vs);
    return [T(`En ikke-inverterende forsterker med forsterkning ${A} forsynes med ±${Vs} V (anta rail-to-rail). Inngangen er ${nf(Vin)} V. Hva blir utgangen?`,`A non-inverting amplifier with a gain of ${A} is powered from ±${Vs} V (assume rail-to-rail). The input is ${nf(Vin)} V. What is the output?`),{n:Vo,tol:0.01,u:"V"},ideal>Vs?T(`Ideelt $${A}\\cdot ${mf(Vin)} = ${mf(ideal)}$ V, men utgangen går i metning ved ${Vs} V.`,`Ideally $${A}\\cdot ${mf(Vin)} = ${mf(ideal)}$ V, but the output saturates at ${Vs} V.`):T(`$${A}\\cdot ${mf(Vin)} = ${mf(ideal)}$ V, som ligger innenfor forsyningen.`,`$${A}\\cdot ${mf(Vin)} = ${mf(ideal)}$ V, which is within the supply range.`)]; }
 ]},
 { title:"Filtre og signaler", qs:[
  ["Hva er knekkfrekvensen til et RC-lavpassfilter?",["$f_c = \\dfrac{1}{2\\pi RC}$","$f_c = RC$","$f_c = 2\\pi RC$","$f_c = R/C$"],"Ved $f_c$ er forsterkningen $1/\\sqrt2$, altså −3 dB."],
  ["Hva slipper et høypassfilter gjennom?",["Frekvenser over knekkfrekvensen","Frekvenser under knekkfrekvensen","Bare likespenning","Ingenting"],"Det brukes for eksempel til å fjerne DC-nivå (AC-kobling)."],
  ["Hvor bratt faller et førsteordens lavpassfilter over knekkfrekvensen?",["20 dB per dekade","6 dB per dekade","40 dB per dekade","Det faller ikke"],"Et andreordens filter faller 40 dB per dekade."],
  ["Hva betyr −3 dB?",["Omtrent halv effekt ($1/\\sqrt2$ i amplitude)","Null signal","Dobbel effekt","Tre ganger lavere amplitude"],"$20\\log(1/\\sqrt2) \\approx -3{,}01$ dB."]
 ], gen:[
  ()=>{ const Rk=R.p([1,4.7,10,47]), C=R.p([10,100,470]); const fc=1/(2*Math.PI*Rk*1e3*C*1e-9);
    return [T(`Hva er knekkfrekvensen til et RC-lavpass med $R = ${mf(Rk,1)}$ kΩ og $C = ${C}$ nF?`,`What is the cutoff frequency of an RC low-pass filter with $R = ${mf(Rk,1)}$ kΩ and $C = ${C}$ nF?`),{n:fc,tol:rel(fc),u:"Hz"},`$f_c = 1/(2\\pi RC) \\approx ${mf(fc,1)}$ Hz.`]; },
  ()=>{ const fc=R.p([100,1000,5000]), k=R.p([0.5,1,2,10]); const f=fc*k; const g=1/Math.sqrt(1+k*k);
    return [T(`Et førsteordens lavpass har $f_c = ${fc}$ Hz. Hva er amplitudeforholdet $|H|$ ved ${mf(f,0)} Hz?`,`A first-order low-pass filter has $f_c = ${fc}$ Hz. What is the amplitude ratio $|H|$ at ${mf(f,0)} Hz?`),{n:g,tol:0.002,u:""},`$|H| = 1/\\sqrt{1 + (f/f_c)^2} = 1/\\sqrt{1 + ${mf(k*k,2)}} \\approx ${mf(g,4)}$.`]; },
  ()=>{ const fc=R.p([50,100,1000,10000]), Rk=R.p([1,10,100]); const C=1/(2*Math.PI*Rk*1e3*fc)*1e9;
    return [T(`Du vil ha et RC-lavpass med $f_c = ${fc}$ Hz og $R = ${Rk}$ kΩ. Hvilken kapasitans trengs?`,`You want an RC low-pass filter with $f_c = ${fc}$ Hz and $R = ${Rk}$ kΩ. What capacitance is needed?`),{n:C,tol:rel(C),u:"nF"},`$C = 1/(2\\pi Rf_c) \\approx ${mf(C,2)}$ nF.`]; }
 ]}
]},

// ================= Produktutvikling =================
{ code:"PROD", name:"Produktutvikling", group:"Produktutvikling og økonomi", isNew:true, also:"NMBU TIP200 · TMP320", units:[
 { title:"Prosess og kundebehov", qs:[
  ["Hva er den typiske rekkefølgen i en produktutviklingsprosess (Ulrich & Eppinger)?",["Planlegging → konseptutvikling → systemdesign → detaljdesign → testing → produksjonsoppstart","Detaljdesign → konsept → testing","Produksjon → planlegging → salg","Testing → konsept → planlegging"],"Senere endringer koster mer, så de tidlige fasene er viktige."],
  ["Hva er forskjellen på et kundebehov og en spesifikasjon?",["Et behov er uttrykt på kundens språk; en spesifikasjon er en målbar størrelse med enhet og målverdi","Det er det samme","Spesifikasjoner er vage","Behov har alltid tall"],"For eksempel: «lett å bære» blir til «masse < 1,2 kg»."],
  ["Hva er et stage-gate-system?",["Utviklingen deles i faser med beslutningspunkter (gates) mellom","En type prototyp","Et produksjonsutstyr","En kvalitetsstandard"],"Ved hver gate: fortsett, stopp eller gjør om."],
  ["Hva viser et «House of Quality» (QFD)?",["Sammenhengen mellom kundebehov og tekniske egenskaper","Fabrikkens planløsning","Budsjettet","Prosjektets tidsplan"],"«Taket» viser hvordan de tekniske egenskapene påvirker hverandre."],
  ["Hvorfor lager man en funksjonsanalyse (funksjonstre)?",["For å beskrive hva produktet skal gjøre, uavhengig av løsning","For å velge farge","For å beregne kostnad","For å lage tegninger"],"Det åpner for flere løsningsalternativer."]
 ], gen:[
  ()=>{ const n=R.i(3,8); return [T(`Hvor mange parvise sammenligninger må du gjøre for å rangere ${n} kundebehov mot hverandre (parvis sammenligning)?`,`How many comparisons must you make to rank ${n} customer needs against each other (pairwise comparison)?`),{n:n*(n-1)/2,tol:0,u:""},`$\\binom{${n}}{2} = ${n*(n-1)/2}$.`]; }
 ]},
 { title:"Konseptutvikling og valg", qs:[
  ["Hva er en morfologisk matrise?",["En tabell med delfunksjoner og mulige løsninger for hver, som kan kombineres til konsepter","En type stivhetsmatrise","Et Gantt-diagram","En risikomatrise"],"Den gir systematisk mange konsepter."],
  ["Hva er en Pugh-matrise (konseptscreening)?",["Konsepter vurderes med +, 0 eller − mot et referansekonsept","En vektet kostnadsberegning","En FEM-modell","En markedsanalyse"],"Deretter kan man gjøre en vektet konseptscoring."],
  ["Hva er en grunnregel i idémyldring (brainstorming)?",["Ikke kritiser ideer underveis, og gå for mengde","Bare ta med realistiske ideer","La lederen bestemme","Diskuter hver idé grundig før neste"],"Vurderingen kommer i en senere fase."],
  ["Hvorfor bør man utvikle flere konsepter før man velger?",["For å utforske løsningsrommet og unngå å låse seg for tidlig","Det er et krav fra ISO","Det sparer alltid penger","Det er ikke nødvendig"],"Det første konseptet er sjelden det beste."]
 ], gen:[
  ()=>{ const k=R.i(3,5); const opts=Array.from({length:k},()=>R.i(2,5)); const p=opts.reduce((a,b)=>a*b,1);
    return [T(`En morfologisk matrise har ${k} delfunksjoner med henholdsvis ${opts.join(", ")} løsningsalternativer. Hvor mange konseptkombinasjoner finnes i teorien?`,`A morphological matrix has ${k} subfunctions with ${opts.join(", ")} solution alternatives, respectively. How many concept combinations are possible in theory?`),{n:p,tol:0,u:""},T(`Produktet: $${opts.join("\\cdot ")} = ${p}$.`,`The product: $${opts.join("\\cdot ")} = ${p}$.`)]; },
  ()=>{ const w=R.p([[0.4,0.3,0.2,0.1],[0.3,0.3,0.2,0.2],[0.5,0.2,0.2,0.1]]); const s=[R.i(1,5),R.i(1,5),R.i(1,5),R.i(1,5)]; const tot=w.reduce((a,x,i)=>a+x*s[i],0);
    return [T(`Et konsept får poengene ${s.join(", ")} (skala 1–5) på fire kriterier med vektene ${w.map(x=>nf(x)).join(", ")}. Hva er vektet totalscore?`,`A concept receives the scores ${s.join(", ")} (scale 1–5) on four criteria with the weights ${w.map(x=>nf(x)).join(", ")}. What is the weighted total score?`),{n:tot,tol:0.001,u:""},`$${w.map((x,i)=>`${mf(x)}\\cdot ${s[i]}`).join(" + ")} = ${mf(tot,2)}$.`]; },
  ()=>{ const p=R.i(0,5), z=R.i(0,4), m=R.i(0,4); return [T(`I en Pugh-matrise får et konsept ${p} pluss, ${z} nuller og ${m} minus. Hva er nettoscore?`,`In a Pugh matrix, a concept gets ${p} plus, ${z} zero and ${m} minus ratings. What is the net score?`),{n:p-m,tol:0,u:""},T(`Netto = antall pluss − antall minus = $${p} - ${m} = ${p-m}$. Nullene teller ikke.`,`Net = number of pluses − number of minuses = $${p} - ${m} = ${p-m}$. The zeros do not count.`)]; }
 ]},
 { title:"Design for X og produksjon", qs:[
  ["Hva er hovedmålet med DFA (Design for Assembly)?",["Færre deler og enklere montasje","Høyere materialkostnad","Flere skrueforbindelser","Mer komplekse deler"],"Spør for hver del: må den være en egen del?"],
  ["Hvorfor har sprøytestøpte deler slippvinkel?",["Så delen løsner lett fra formen","For utseendets skyld","For å spare plast","For å øke styrken"],"Typisk 0,5–2°."],
  ["Hva er en typisk begrensning ved FDM-3D-printing?",["Overheng over ca. 45° trenger støttemateriale","Den kan bare printe metaller","Den krever støpeform","Den kan ikke lage hull"],"Delene er også svakere mellom lagene."],
  ["Hva er sammenhengen mellom toleranse og kostnad?",["Strammere toleranser gir vanligvis høyere kostnad","Strammere toleranser er alltid billigere","Ingen sammenheng","Toleranser påvirker bare vekt"],"Sett stramme toleranser bare der funksjonen krever det."],
  ["Hva er forskjellen på alfa- og betaprototyper?",["Alfa tester funksjon med prototypedeler; beta er nær ferdig produkt og testes ofte av kunder","Alfa er ferdig produkt","Beta er bare digital","Det er det samme"],"Rapid prototyping brukes mye i alfafasen."],
  ["Hvilke faser inngår i en livsløpsvurdering (LCA) av et produkt?",["Råvarer, produksjon, transport, bruk og avhending","Bare produksjon","Bare bruk","Bare design"],"I TIP200 vurderes blant annet energiforbruk, CO₂-utslipp og gjenvinning."]
 ], gen:[
  ()=>{ const Tf=R.p([20000,50000,100000,200000]), cm=R.p([5,10,20]), cp=R.p([60,100,150]); const Q=Tf/(cp-cm);
    return [T(`En del koster ${cp} kr/stk å 3D-printe. Sprøytestøping koster ${cm} kr/stk pluss en form til ${Tf.toLocaleString("nb-NO")} kr. Ved hvor mange stk blir sprøytestøping billigst?`,`A part costs ${cp} NOK/pc to 3D print. Injection molding costs ${cm} NOK/pc plus a mold costing ${Tf.toLocaleString("en-US")} NOK. At what quantity (pcs) does injection molding become cheaper?`),{n:Q,tol:rel(Q,0.005,0.5),u:"stk"},T(`Likt når $${cp}Q = ${Tf} + ${cm}Q$, altså $Q = ${Tf}/${cp-cm} \\approx ${nf(Q,0)}$ stk.`,`Equal when $${cp}Q = ${Tf} + ${cm}Q$, i.e. $Q = ${Tf}/${cp-cm} \\approx ${nf(Q,0)}$ pcs.`)]; },
  ()=>{ const V=R.p([10,25,50,100]), rho=R.p([["PLA",1.24],["ABS",1.04],["aluminium",2.7],["stål",7.85]]), pr=R.p([200,300,50,20]); const m=V*rho[1]; const c=m/1000*pr; const matEN={"PLA":"PLA","ABS":"ABS","aluminium":"aluminum","stål":"steel"}[rho[0]];
    return [T(`En del på ${V} cm³ lages i ${rho[0]} (${nf(rho[1],2)} g/cm³) som koster ${pr} kr/kg. Hva er materialkostnaden?`,`A part of ${V} cm³ is made of ${matEN} (${nf(rho[1],2)} g/cm³), which costs ${pr} NOK/kg. What is the material cost?`),{n:c,tol:rel(c),u:"kr"},T(`Masse $${V}\\cdot ${mf(rho[1],2)} = ${mf(m,1)}$ g, og kostnaden er $${mf(m/1000,4)}\\cdot ${pr} \\approx ${mf(c,2)}$ kr.`,`Mass $${V}\\cdot ${mf(rho[1],2)} = ${mf(m,1)}$ g, and the cost is $${mf(m/1000,4)}\\cdot ${pr} \\approx ${mf(c,2)}$ NOK.`)]; },
  ()=>{ const n0=R.i(8,20), n1=R.i(3,7), t=R.p([10,15,20,30]); const save=(n0-n1)*t;
    return [T(`En DFA-analyse reduserer antall deler fra ${n0} til ${n1}. Hver del tar ${t} s å montere. Hvor mange sekunder spares per produkt?`,`A DFA analysis reduces the number of parts from ${n0} to ${n1}. Each part takes ${t} s to assemble. How many seconds are saved per product?`),{n:save,tol:0,u:"s"},`$(${n0} - ${n1})\\cdot ${t} = ${save}$ s.`]; }
 ]}
]}
);
