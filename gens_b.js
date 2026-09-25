// Oppgavegeneratorer, del 2 (samme hjelpefunksjoner som gens.js)
// ================= ELFT2500 Innebygde systemer =================
GEN("ELFT2500",0,
 ()=>{ const v=R.i(16,255); const h=v.toString(16).toUpperCase();
   return [T(`Hva er \`0x${h}\` i titallssystemet?`,`What is \`0x${h}\` in decimal?`),{n:v,tol:0,u:""},`$${parseInt(h[0],16)}\\cdot 16 + ${parseInt(h[1],16)} = ${v}$.`]; },
 ()=>{ const v=R.i(5,255); const b=v.toString(2); const sum=[...b].map((c,i)=>c==="1"?2**(b.length-1-i):null).filter(x=>x!==null).join(" + ");
   return [T(`Hva er binærtallet \`${b}\` i titallssystemet?`,`What is the binary number \`${b}\` in decimal?`),{n:v,tol:0,u:""},T(`Summen av toerpotensene der biten er 1: ${sum} = ${v}.`,`The sum of the powers of two where the bit is 1: ${sum} = ${v}.`)]; },
 ()=>{ const v=R.i(5,63); return [T(`Hva er ${v} skrevet binært?`,`What is ${v} in binary?`),[v.toString(2),(v+1).toString(2),(v^1)===v+1?(v-1).toString(2):(v^1).toString(2),(v>>1).toString(2)+"1"].filter((x,i,a)=>a.indexOf(x)===i),`${v} = ${[...v.toString(2)].map((c,i,a)=>c==="1"?2**(a.length-1-i):null).filter(x=>x!==null).join(" + ")}.`]; },
 ()=>{ const n=R.p([8,10,12,16]), V=R.p([3.3,5]); const res=V/2**n*1000;
   return [T(`En ${n}-bits ADC har referansespenning ${nf(V,1)} V. Hvor stor er oppløsningen, i mV?`,`${n===8?"An":"A"} ${n}-bit ADC has a reference voltage of ${nf(V,1)} V. What is the resolution, in mV?`),{n:res,tol:rel(res,0.01,0.001),u:"mV"},`$${mf(V,1)}/2^{${n}} = ${mf(V,1)}/${2**n} \\approx ${mf(res,4)}$ mV.`]; },
 ()=>{ const n=R.p([8,10,12]), V=R.p([3.3,5]), k=R.i(1,2**n-1); const u=k*V/2**n;
   return [T(`En ${n}-bits ADC med referanse ${nf(V,1)} V gir verdien ${k}. Hvilken spenning tilsvarer det?`,`${n===8?"An":"A"} ${n}-bit ADC with a ${nf(V,1)} V reference gives the value ${k}. What voltage does this correspond to?`),{n:u,tol:rel(u,0.01,0.005),u:"V"},`$U = ${k}\\cdot ${mf(V,1)}/${2**n} \\approx ${mf(u,3)}$ V.`]; }
);
GEN("ELFT2500",1,
 ()=>{ const V=R.p([3.3,5,12,24]), d=R.p([10,20,25,40,50,60,75,80,90]); const u=V*d/100;
   return [T(`Et PWM-signal på ${nf(V,1)} V har ${d} % duty cycle. Hva er gjennomsnittsspenningen?`,`A PWM signal of ${nf(V,1)} V has a duty cycle of ${d}%. What is the average voltage?`),{n:u,tol:rel(u,0.01,0.01),u:"V"},`$${d/100 === 1 ? 1 : mf(d/100)}\\cdot ${mf(V,1)} = ${mf(u,3)}$ V.`]; },
 ()=>{ const f=R.p([100,500,1000,2000,5000]), on=R.p([0.1,0.2,0.25,0.5,0.75]); const Tp=1000/f, ton=Tp*on;
   return [T(`Et PWM-signal på ${f} Hz er høyt i ${nf(ton,3)} ms per periode. Hva er duty cycle?`,`A PWM signal at ${f} Hz is high for ${nf(ton,3)} ms per period. What is the duty cycle?`),{n:on*100,tol:0.5,u:"%"},T(`Perioden er $1/${f} = ${mf(Tp,3)}$ ms, og $${mf(ton,3)}/${mf(Tp,3)} = ${mf(on*100)}$ %.`,`The period is $1/${f} = ${mf(Tp,3)}$ ms, and $${mf(ton,3)}/${mf(Tp,3)} = ${mf(on*100)}$ %.`)]; },
 ()=>{ const b=R.p([9600,19200,38400,57600,115200]); const Bps=b/10;
   return [T(`UART går med ${b} baud i formatet 8N1 (1 start-, 8 data- og 1 stoppbit). Hvor mange byte kan sendes per sekund?`,`A UART runs at ${b} baud in the 8N1 format (1 start bit, 8 data bits and 1 stop bit). How many bytes can be sent per second?`),{n:Bps,tol:1,u:"byte/s"},T(`Hver byte tar 10 bit, så $${b}/10 = ${Bps}$ byte/s.`,`Each byte takes 10 bits, so $${b}/10 = ${Bps}$ bytes/s.`)]; }
);
GEN("ELFT2500",2,
 ()=>{ const f=R.p([0.5,1,2,5,10,20,44]); return [T(`Et signal inneholder frekvenser opp til ${nf(f,1)} kHz. Hva er minste teoretiske samplingsfrekvens?`,`A signal contains frequencies up to ${nf(f,1)} kHz. What is the minimum theoretical sampling frequency?`),{n:2*f,tol:0.01,u:"kHz"},T(`Nyquist: $f_s > 2f_{maks} = ${mf(2*f,1)}$ kHz.`,`Nyquist: $f_s > 2f_{max} = ${mf(2*f,1)}$ kHz.`)]; },
 ()=>{ const fs=R.p([100,200,500,1000]); const f=R.i(Math.round(fs*0.55),Math.round(fs*0.95)); const a=fs-f;
   return [T(`Et sinussignal på ${f} Hz samples med ${fs} Hz. Hvilken frekvens ser det ut til å ha etter sampling?`,`A sine signal of ${f} Hz is sampled at ${fs} Hz. What frequency does it appear to have after sampling?`),{n:a,tol:0.5,u:"Hz"},T(`${f} Hz er over Nyquist-frekvensen ${fs/2} Hz og foldes ned til $f_s - f = ${fs} - ${f} = ${a}$ Hz (aliasing).`,`${f} Hz is above the Nyquist frequency of ${fs/2} Hz and folds down to $f_s - f = ${fs} - ${f} = ${a}$ Hz (aliasing).`)]; }
);

// ================= MEK2000 Matematikk 2000 =================
GEN("MEK2000",0,
 ()=>{ const [a,b,c,d]=[R.i(-6,6),R.i(-6,6),R.i(-6,6),R.i(-6,6)]; const D=a*d-b*c;
   return [`$\\det\\begin{pmatrix}${a}&${b}\\\\${c}&${d}\\end{pmatrix} = $`,{n:D,tol:0,u:""},`$${a}\\cdot ${d} - ${b}\\cdot ${c} = ${D}$.`]; },
 ()=>{ const u=[R.i(-5,5),R.i(-5,5),R.i(-5,5)], v=[R.i(-5,5),R.i(-5,5),R.i(-5,5)]; const d=u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
   return [`$(${u.join(", ")})\\cdot(${v.join(", ")}) = $`,{n:d,tol:0,u:""},`$${u.map((x,i)=>`(${x})(${v[i]})`).join(" + ")} = ${d}$.`]; },
 ()=>{ const A=[[R.i(-3,4),R.i(-3,4)],[R.i(-3,4),R.i(-3,4)]], B=[[R.i(-3,4),R.i(-3,4)],[R.i(-3,4),R.i(-3,4)]]; const i=R.i(0,1), j=R.i(0,1);
   const v=A[i][0]*B[0][j]+A[i][1]*B[1][j]; const m=M=>`\\begin{pmatrix}${M[0][0]}&${M[0][1]}\\\\${M[1][0]}&${M[1][1]}\\end{pmatrix}`;
   return [T(`$A = ${m(A)}$ og $B = ${m(B)}$. Hva er elementet $(AB)_{${i+1}${j+1}}$?`,`$A = ${m(A)}$ and $B = ${m(B)}$. What is the element $(AB)_{${i+1}${j+1}}$?`),{n:v,tol:0,u:""},T(`Rad ${i+1} i $A$ ganget med kolonne ${j+1} i $B$: $(${A[i][0]})(${B[0][j]}) + (${A[i][1]})(${B[1][j]}) = ${v}$.`,`Row ${i+1} of $A$ times column ${j+1} of $B$: $(${A[i][0]})(${B[0][j]}) + (${A[i][1]})(${B[1][j]}) = ${v}$.`)]; },
 ()=>{ const u=[R.i(-4,4),R.i(-4,4),R.i(-4,4)], v=[R.i(-4,4),R.i(-4,4),R.i(-4,4)]; const k=R.i(0,2); const cr=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
   return [T(`Hva er ${["x","y","z"][k]}-komponenten av $(${u.join(", ")})\\times(${v.join(", ")})$?`,`What is the ${["x","y","z"][k]}-component of $(${u.join(", ")})\\times(${v.join(", ")})$?`),{n:cr[k],tol:0,u:""},T(`Kryssproduktet er $(${cr.join(", ")})$.`,`The cross product is $(${cr.join(", ")})$.`)]; }
);
GEN("MEK2000",1,
 ()=>{ const [l1,l2]=R.distinct(2,-4,7); const p=R.i(-3,6), s=l1+l2-p; const q=p*s-l1*l2; const Q=R.p(["max","min","tr","det"]);
   const M=`\\begin{pmatrix}${p}&${q}\\\\1&${s}\\end{pmatrix}`;
   if(Q==="tr") return [T(`Hva er summen av egenverdiene til $${M}$?`,`What is the sum of the eigenvalues of $${M}$?`),{n:l1+l2,tol:0,u:""},T(`Summen er sporet: $${p} + ${s} = ${l1+l2}$.`,`The sum equals the trace: $${p} + ${s} = ${l1+l2}$.`)];
   if(Q==="det") return [T(`Hva er produktet av egenverdiene til $${M}$?`,`What is the product of the eigenvalues of $${M}$?`),{n:l1*l2,tol:0,u:""},T(`Produktet er determinanten: $${p}\\cdot ${s} - ${q}\\cdot 1 = ${l1*l2}$.`,`The product equals the determinant: $${p}\\cdot ${s} - ${q}\\cdot 1 = ${l1*l2}$.`)];
   const v=Q==="max"?Math.max(l1,l2):Math.min(l1,l2);
   return [T(`Hva er den ${Q==="max"?"største":"minste"} egenverdien til $${M}$?`,`What is the ${Q==="max"?"largest":"smallest"} eigenvalue of $${M}$?`),{n:v,tol:0.01,u:""},T(`$\\lambda^2 ${l1+l2<=0?"+":"-"} ${Math.abs(l1+l2)}\\lambda ${l1*l2<0?"-":"+"} ${Math.abs(l1*l2)} = 0$ (spor og determinant) gir $\\lambda = ${Math.max(l1,l2)}$ og $${Math.min(l1,l2)}$.`,`$\\lambda^2 ${l1+l2<=0?"+":"-"} ${Math.abs(l1+l2)}\\lambda ${l1*l2<0?"-":"+"} ${Math.abs(l1*l2)} = 0$ (trace and determinant) gives $\\lambda = ${Math.max(l1,l2)}$ and $${Math.min(l1,l2)}$.`)]; },
 ()=>{ const n=R.i(2,4), m=R.i(n+1,n+3);
   return [T(`Et homogent system har ${n} ligninger og ${m} ukjente. Hvor mange frie variabler har det minst?`,`A homogeneous system has ${n} equations and ${m} unknowns. What is the minimum number of free variables?`),{n:m-n,tol:0,u:""},T(`Rangen er høyst ${n}, så minst $${m} - ${n} = ${m-n}$ variabler blir frie.`,`The rank is at most ${n}, so at least $${m} - ${n} = ${m-n}$ variables are free.`)]; }
);
GEN("MEK2000",2,
 ()=>{ const y0=R.i(1,10), k=R.p([-2,-1,-0.5,0.5,1,2]), t=R.p([0.5,1,2]); const v=y0*Math.exp(k*t);
   return [T(`$y' = ${mf(k)}y$ og $y(0) = ${y0}$. Hva er $y(${mf(t)})$?`,`$y' = ${mf(k)}y$ and $y(0) = ${y0}$. What is $y(${mf(t)})$?`),{n:v,tol:rel(v),u:""},T(`$y = ${y0}e^{${mf(k)}t}$, så $y(${mf(t)}) = ${y0}e^{${mf(k*t)}} \\approx ${mf(v,3)}$.`,`$y = ${y0}e^{${mf(k)}t}$, so $y(${mf(t)}) = ${y0}e^{${mf(k*t)}} \\approx ${mf(v,3)}$.`)]; },
 ()=>{ const [r1,r2]=R.distinct(2,-4,4,[0]); const p=-(r1+r2), q=r1*r2;
   const e=r=> r===0?"":r===1?"e^{x}":r===-1?"e^{-x}":`e^{${r}x}`; const term=(C,r)=> r===0?C:`${C}${e(r)}`;
   const sgn=(v,t)=> v===0?"":` ${v<0?"-":"+"} ${Math.abs(v)===1&&t?"":Math.abs(v)}${t}`;
   return [T(`Hva er den generelle løsningen av $y''${sgn(p,"y'")}${sgn(q,"y")} = 0$?`,`What is the general solution of $y''${sgn(p,"y'")}${sgn(q,"y")} = 0$?`),
     [`$${term("C_1",r1)} + ${term("C_2",r2)}$`,`$${term("C_1",-r1)} + ${term("C_2",-r2)}$`,`$(C_1 + C_2x)${e(r1)||"1"}$`,`$C_1\\cos ${Math.abs(r1)||1}x + C_2\\sin ${Math.abs(r2)||1}x$`],
     T(`Karakteristisk ligning: $r^2${sgn(p,"r")}${sgn(q,"")} = (r ${r1<0?"+":"-"} ${Math.abs(r1)})(r ${r2<0?"+":"-"} ${Math.abs(r2)}) = 0$, altså $r = ${r1}$ og $r = ${r2}$.`,`Characteristic equation: $r^2${sgn(p,"r")}${sgn(q,"")} = (r ${r1<0?"+":"-"} ${Math.abs(r1)})(r ${r2<0?"+":"-"} ${Math.abs(r2)}) = 0$, so $r = ${r1}$ and $r = ${r2}$.`)]; },
 ()=>{ const w=R.i(2,9); return [T(`Hva er perioden til løsningene av $y'' + ${w*w}y = 0$?`,`What is the period of the solutions of $y'' + ${w*w}y = 0$?`),{n:2*Math.PI/w,tol:0.01,u:""},T(`$r = \\pm ${w}i$ gir $\\cos ${w}x$ og $\\sin ${w}x$, med periode $2\\pi/${w} \\approx ${mf(2*Math.PI/w,3)}$.`,`$r = \\pm ${w}i$ gives $\\cos ${w}x$ and $\\sin ${w}x$, with period $2\\pi/${w} \\approx ${mf(2*Math.PI/w,3)}$.`)]; }
);

// ================= MEK2200 Statistikk =================
GEN("MEK2200",0,
 ()=>{ const p=R.p([0.8,0.85,0.9,0.95,0.98,0.99]), n=R.i(2,4), t=R.p(["serie","parallell"]);
   const v = t==="serie"? p**n : 1-(1-p)**n;
   return [T(`${n} uavhengige komponenter i ${t} har pålitelighet ${nf(p)} hver. Hva er systemets pålitelighet?`,`${n} independent components in ${t==="serie"?"series":"parallel"} each have a reliability of ${nf(p)}. What is the reliability of the system?`),{n:v,tol:0.0015,u:""},t==="serie"?T(`Alle må virke: $${mf(p)}^{${n}} \\approx ${mf(v,4)}$.`,`All of them must work: $${mf(p)}^{${n}} \\approx ${mf(v,4)}$.`):T(`Det holder at én virker: $1 - ${mf(1-p)}^{${n}} \\approx ${mf(v,5)}$.`,`It is enough that one works: $1 - ${mf(1-p)}^{${n}} \\approx ${mf(v,5)}$.`)]; },
 ()=>{ const s=R.i(2,12); const c=6-Math.abs(s-7); const v=c/36;
   return [T(`Du kaster to terninger. Hva er sannsynligheten for at summen blir ${s}? (desimaltall)`,`You roll two dice. What is the probability that the sum is ${s}? (decimal number)`),{n:v,tol:0.001,u:""},T(`${c} av 36 like sannsynlige utfall gir summen ${s}: $${c}/36 \\approx ${mf(v,4)}$.`,`${c} of the 36 equally likely outcomes give the sum ${s}: $${c}/36 \\approx ${mf(v,4)}$.`)]; },
 ()=>{ const a=R.f(0.2,0.7,0.05), b=R.f(0.2,0.7,0.05), ab=R.f(0.05,Math.min(a,b)-0.05,0.05); const v=a+b-ab;
   return [T(`$P(A) = ${mf(a)}$, $P(B) = ${mf(b)}$ og $P(A\\cap B) = ${mf(ab)}$. Hva er $P(A\\cup B)$?`,`$P(A) = ${mf(a)}$, $P(B) = ${mf(b)}$ and $P(A\\cap B) = ${mf(ab)}$. What is $P(A\\cup B)$?`),{n:v,tol:0.001,u:""},`$${mf(a)} + ${mf(b)} - ${mf(ab)} = ${mf(v)}$.`]; },
 ()=>{ const pa=R.f(0.01,0.1,0.01), sens=R.p([0.9,0.95,0.99]), fp=R.p([0.05,0.1]); const pb=sens*pa+fp*(1-pa), v=sens*pa/pb;
   return [T(`En feil forekommer i ${nf(pa*100)} % av produktene. En test oppdager feilen i ${nf(sens*100)} % av tilfellene, men slår falskt ut på ${nf(fp*100)} % av de feilfrie. Testen slår ut. Hva er sannsynligheten for at produktet faktisk er feil?`,`A defect occurs in ${nf(pa*100)}% of the products. A test detects the defect in ${nf(sens*100)}% of cases, but gives a false positive for ${nf(fp*100)}% of the defect-free products. The test is positive. What is the probability that the product is actually defective?`),{n:v,tol:0.005,u:""},`Bayes: $\\dfrac{${mf(sens)}\\cdot ${mf(pa)}}{${mf(sens)}\\cdot ${mf(pa)} + ${mf(fp)}\\cdot ${mf(1-pa)}} \\approx ${mf(v,3)}$.`]; }
);
GEN("MEK2200",1,
 ()=>{ const n=R.i(5,100), p=R.f(0.05,0.9,0.05), Q=R.p(["E","V"]);
   if(Q==="E") return [T(`$X\\sim\\text{Bin}(${n},\\ ${mf(p)})$. Hva er $E[X]$?`,`$X\\sim\\text{Bin}(${n},\\ ${mf(p)})$. What is $E[X]$?`),{n:n*p,tol:0.01,u:""},`$E[X] = np = ${mf(n*p)}$.`];
   return [T(`$X\\sim\\text{Bin}(${n},\\ ${mf(p)})$. Hva er $\\text{Var}(X)$?`,`$X\\sim\\text{Bin}(${n},\\ ${mf(p)})$. What is $\\text{Var}(X)$?`),{n:n*p*(1-p),tol:0.01,u:""},`$\\text{Var}(X) = np(1-p) = ${mf(n*p*(1-p),3)}$.`]; },
 ()=>{ const xs=Array.from({length:R.i(5,7)},()=>R.i(1,20)); const m=xs.reduce((a,b)=>a+b,0)/xs.length;
   return [T(`Hva er gjennomsnittet av ${xs.join(", ")}?`,`What is the mean of ${xs.join(", ")}?`),{n:m,tol:0.01,u:""},T(`Summen er ${xs.reduce((a,b)=>a+b,0)}, delt på ${xs.length}: ${nf(m,3)}.`,`The sum is ${xs.reduce((a,b)=>a+b,0)}, divided by ${xs.length}: ${nf(m,3)}.`)]; },
 ()=>{ const xs=Array.from({length:R.p([5,7])},()=>R.i(1,30)); const s=[...xs].sort((a,b)=>a-b); const med=s[(s.length-1)/2];
   return [T(`Hva er medianen av ${xs.join(", ")}?`,`What is the median of ${xs.join(", ")}?`),{n:med,tol:0,u:""},T(`Sortert: ${s.join(", ")}. Den midterste verdien er ${med}.`,`Sorted: ${s.join(", ")}. The middle value is ${med}.`)]; },
 ()=>{ const mu=R.i(50,200), sd=R.i(2,20), z=R.p([-2,-1.5,-1,-0.5,0.5,1,1.5,2,2.5]); const x=mu+z*sd;
   return [T(`En måling er normalfordelt med $\\mu = ${mu}$ og $\\sigma = ${sd}$. Hva er z-verdien til $x = ${mf(x,1)}$?`,`A measurement is normally distributed with $\\mu = ${mu}$ and $\\sigma = ${sd}$. What is the z-score of $x = ${mf(x,1)}$?`),{n:z,tol:0.01,u:""},`$z = (x-\\mu)/\\sigma = (${mf(x,1)} - ${mu})/${sd} = ${mf(z)}$.`]; },
 ()=>{ const lam=R.p([1,2,3,4]), k=R.p([0,1,2]); const fact=[1,1,2][k]; const v=lam**k*Math.exp(-lam)/fact;
   return [T(`Antall feil per time er Poisson-fordelt med $\\lambda = ${lam}$. Hva er $P(X = ${k})$?`,`The number of faults per hour is Poisson distributed with $\\lambda = ${lam}$. What is $P(X = ${k})$?`),{n:v,tol:0.002,u:""},`$P(X=${k}) = \\dfrac{${lam}^{${k}}e^{-${lam}}}{${k}!} \\approx ${mf(v,4)}$.`]; }
);
GEN("MEK2200",2,
 ()=>{ const sd=R.i(2,30), n=R.p([4,9,16,25,36,49,64,100]); const se=sd/Math.sqrt(n);
   return [T(`Et utvalg på $n = ${n}$ har standardavvik ${sd}. Hva er standardfeilen til gjennomsnittet?`,`A sample of $n = ${n}$ has a standard deviation of ${sd}. What is the standard error of the mean?`),{n:se,tol:rel(se),u:""},`$\\sigma/\\sqrt n = ${sd}/${Math.sqrt(n)} \\approx ${mf(se,3)}$.`]; },
 ()=>{ const p=R.p([0.001,0.01,0.02,0.05,0.1]), C=R.p([50000,200000,1000000,5000000]); const r=p*C;
   return [T(`En hendelse har sannsynlighet ${nf(p,3)} per år og konsekvens ${C.toLocaleString("nb-NO")} kr. Hva er forventet årlig tap?`,`An event has a probability of ${nf(p,3)} per year and a consequence of NOK ${C.toLocaleString("en-US")}. What is the expected annual loss?`),{n:r,tol:rel(r),u:"kr"},T(`Risiko = sannsynlighet × konsekvens = ${nf(r,0)} kr per år.`,`Risk = probability × consequence = NOK ${nf(r,0)} per year.`)]; },
 ()=>{ const xbar=R.i(20,200), sd=R.i(2,20), n=R.p([25,36,64,100]); const h=1.96*sd/Math.sqrt(n);
   return [T(`$\\bar x = ${xbar}$, $\\sigma = ${sd}$ (kjent) og $n = ${n}$. Hva er den øvre grensen i et 95 %-konfidensintervall for $\\mu$?`,`$\\bar x = ${xbar}$, $\\sigma = ${sd}$ (known) and $n = ${n}$. What is the upper limit of a 95% confidence interval for $\\mu$?`),{n:xbar+h,tol:rel(xbar+h,0.002),u:""},T(`$\\bar x + 1{,}96\\,\\sigma/\\sqrt n = ${xbar} + 1{,}96\\cdot ${sd}/${Math.sqrt(n)} \\approx ${mf(xbar+h,2)}$.`,`$\\bar x + 1.96\\,\\sigma/\\sqrt n = ${xbar} + 1.96\\cdot ${sd}/${Math.sqrt(n)} \\approx ${mf(xbar+h,2)}$.`)]; }
);

// ================= ELVE3610 Robotikk =================
GEN("ELVE3610",0,
 ()=>{ let x,y; do{ x=R.i(-5,5); y=R.i(-5,5);}while(x===0&&y===0||Math.abs(x)===Math.abs(y)); const th=R.p([90,180,270]); const c=Math.round(Math.cos(th*DEG)), s=Math.round(Math.sin(th*DEG)); const xr=c*x-s*y, yr=s*x+c*y;
   return [T(`Punktet $(${x}, ${y})$ roteres ${th}° mot klokka om origo. Hva blir punktet?`,`The point $(${x}, ${y})$ is rotated ${th}° counterclockwise about the origin. What is the resulting point?`),[`$(${xr}, ${yr})$`,`$(${-xr}, ${-yr})$`,`$(${yr}, ${xr})$`,`$(${-yr}, ${xr})$`,`$(${y}, ${x})$`].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),T(`$R = \\begin{pmatrix}${c}&${-s}\\\\${s}&${c}\\end{pmatrix}$ gir $(${xr}, ${yr})$.`,`$R = \\begin{pmatrix}${c}&${-s}\\\\${s}&${c}\\end{pmatrix}$ gives $(${xr}, ${yr})$.`)]; },
 ()=>{ const x=R.i(1,5), th=R.p([30,45,60]); const v=x*Math.cos(th*DEG);
   return [T(`Punktet $(${x}, 0)$ roteres ${th}° mot klokka om origo. Hva blir x-koordinaten?`,`The point $(${x}, 0)$ is rotated ${th}° counterclockwise about the origin. What is the new x-coordinate?`),{n:v,tol:0.01,u:""},`$x' = ${x}\\cos ${th}^\\circ \\approx ${mf(v,3)}$.`]; },
 ()=>{ const px=R.i(-5,5), py=R.i(-5,5), x=R.i(-3,3), y=R.i(-3,3);
   return [T(`En ramme er forskjøvet $(${px}, ${py})$ uten rotasjon. Et punkt har koordinatene $(${x}, ${y})$ i den nye rammen. Hva er x-koordinaten i basisrammen?`,`A frame is translated by $(${px}, ${py})$ without rotation. A point has the coordinates $(${x}, ${y})$ in the new frame. What is its x-coordinate in the base frame?`),{n:px+x,tol:0,u:""},T(`Ren translasjon: $${px} + (${x}) = ${px+x}$.`,`Pure translation: $${px} + (${x}) = ${px+x}$.`)]; }
);
GEN("ELVE3610",1,
 ()=>{ const L1=R.p([0.5,1,1.5,2]), L2=R.p([0.5,1,1.5]), t1=R.p([0,30,45,60,90]), t2=R.p([0,30,45,60,90,-30,-45]); const ax=R.p(["x","y"]);
   const x=L1*Math.cos(t1*DEG)+L2*Math.cos((t1+t2)*DEG), y=L1*Math.sin(t1*DEG)+L2*Math.sin((t1+t2)*DEG); const v=ax==="x"?x:y;
   return [T(`En planar 2-leddsarm har $L_1 = ${mf(L1,1)}$ m, $L_2 = ${mf(L2,1)}$ m, $\\theta_1 = ${t1}^\\circ$ og $\\theta_2 = ${t2}^\\circ$. Hva er verktøyets ${ax}-koordinat?`,`A planar two-link arm has $L_1 = ${mf(L1,1)}$ m, $L_2 = ${mf(L2,1)}$ m, $\\theta_1 = ${t1}^\\circ$ and $\\theta_2 = ${t2}^\\circ$. What is the ${ax}-coordinate of the tool?`),{n:v,tol:0.01,u:"m"},
     ax==="x"?`$x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1+\\theta_2) \\approx ${mf(v,3)}$ m.`:`$y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1+\\theta_2) \\approx ${mf(v,3)}$ m.`]; },
 ()=>{ const L1=R.p([0.5,1,1.5]), L2=R.p([0.3,0.5,1]);
   return [T(`En planar 2-leddsarm har $L_1 = ${mf(L1,1)}$ m og $L_2 = ${mf(L2,1)}$ m. Hvor langt fra basen kan verktøyet maksimalt nå?`,`A planar two-link arm has $L_1 = ${mf(L1,1)}$ m and $L_2 = ${mf(L2,1)}$ m. What is the maximum distance from the base that the tool can reach?`),{n:L1+L2,tol:0.001,u:"m"},T(`Når armen er strukket ut: $L_1 + L_2 = ${mf(L1+L2,1)}$ m. Minste rekkevidde er $|L_1 - L_2| = ${mf(Math.abs(L1-L2),1)}$ m.`,`With the arm fully extended: $L_1 + L_2 = ${mf(L1+L2,1)}$ m. The minimum reach is $|L_1 - L_2| = ${mf(Math.abs(L1-L2),1)}$ m.`)]; }
);
GEN("ELVE3610",2,
 ()=>{ const N=R.p([360,500,1000,1024,2048,4096]), c=R.i(10,N*2); const a=360*c/N;
   return [T(`En enkoder har ${N} pulser per omdreining. Hvor mange grader har akselen rotert etter ${c} pulser?`,`An encoder has ${N} pulses per revolution. How many degrees has the shaft rotated after ${c} pulses?`),{n:a,tol:0.05,u:"°"},`$${c}/${N}\\cdot 360^\\circ \\approx ${mf(a,2)}^\\circ$.`]; },
 ()=>{ const i=R.p([10,50,100,160]), n=R.p([1000,1500,3000,6000]); const w=n/i*6;
   return [T(`En robotledd-motor går med ${n} rpm gjennom et gir med utveksling ${i}:1. Hvor mange grader per sekund roterer leddet?`,`A robot joint motor runs at ${n} rpm through a gearbox with a gear ratio of ${i}:1. How many degrees per second does the joint rotate?`),{n:w,tol:rel(w),u:"°/s"},T(`$${n}/${i} = ${mf(n/i,2)}$ rpm, og $\\cdot 360/60 = ${mf(w,1)}$ °/s.`,`$${n}/${i} = ${mf(n/i,2)}$ rpm, and $\\cdot 360/60 = ${mf(w,1)}$ °/s.`)]; }
);

// ================= MATS1500 Materialteknologi =================
GEN("MATS1500",1,
 ()=>{ const L0=R.p([50,80,100,200]), dL=R.f(0.1,20,0.1); const e=dL/L0*100;
   return [T(`En prøvestav med målelengde ${L0} mm forlenges ${nf(dL)} mm. Hva er tøyningen?`,`A test specimen with a gauge length of ${L0} mm is elongated by ${nf(dL)} mm. What is the strain?`),{n:e,tol:rel(e,0.01,0.005),u:"%"},`$\\varepsilon = \\Delta L/L_0 = ${mf(dL)}/${L0} = ${mf(e,3)}$ %.`]; },
 ()=>{ const d=R.p([5,8,10,12,16,20]), F=R.f(5,80,1); const A=Math.PI*d*d/4, s=F*1000/A;
   return [T(`En rund stav med diameter ${d} mm belastes med ${nf(F)} kN. Hva er spenningen?`,`A round bar with a diameter of ${d} mm is loaded with ${nf(F)} kN. What is the stress?`),{n:s,tol:rel(s),u:"MPa"},T(`$A = \\pi d^2/4 \\approx ${mf(A,1)}$ mm², og $\\sigma = F/A \\approx ${mf(s,1)}$ MPa.`,`$A = \\pi d^2/4 \\approx ${mf(A,1)}$ mm², and $\\sigma = F/A \\approx ${mf(s,1)}$ MPa.`)]; }
);
GEN("MATS1500",2,
 ()=>{ const m=R.p([["stål",12],["aluminium",23],["kobber",17]]), L=R.f(0.5,50,0.5), dT=R.i(10,80); const dL=m[1]*1e-6*L*dT*1000;
   const EN={"stål":"A steel","aluminium":"An aluminum","kobber":"A copper"};
   return [T(`En ${m[0]}skinne på ${nf(L)} m varmes ${dT} K. Hvor mye blir den lengre? ($\\alpha = ${m[1]}\\cdot10^{-6}$ /K)`,`${EN[m[0]]} rail of ${nf(L)} m is heated by ${dT} K. How much longer does it become? ($\\alpha = ${m[1]}\\cdot10^{-6}$ /K)`),{n:dL,tol:rel(dL),u:"mm"},`$\\Delta L = \\alpha L\\Delta T = ${m[1]}\\cdot10^{-6}\\cdot ${mf(L)}\\cdot ${dT} \\approx ${mf(dL,3)}$ mm.`]; }
);

// ================= MEK3100 Programmering 2 =================
GEN("MEK3100",1,
 ()=>{ const n=R.p([7,15,31,100,1000,1023,4095,1e6]); const s=Math.ceil(Math.log2(n+1));
   return [T(`Hvor mange sammenligninger trenger binærsøk i verste fall i en sortert liste med ${n.toLocaleString("nb-NO")} elementer?`,`In the worst case, how many comparisons does binary search need in a sorted list of ${n.toLocaleString("en-US")} elements?`),{n:s,tol:0,u:""},`$\\lceil\\log_2(n+1)\\rceil = ${s}$.`]; },
 ()=>{ const Ts=R.p([1,2,5,10]), k=R.p([2,3,4,10]), c=R.p(["n","n^2","n^3"]); const f= c==="n"?k:c==="n^2"?k*k:k**3; const v=Ts*f;
   return [T(`En algoritme med kompleksitet $O(${c})$ bruker ${Ts} s på $n$ elementer. Omtrent hvor lang tid bruker den på ${k}$n$ elementer?`,`An algorithm with complexity $O(${c})$ takes ${Ts} s for $n$ elements. Approximately how long does it take for ${k}$n$ elements?`),{n:v,tol:rel(v),u:"s"},T(`Tiden skalerer med $${k}^{${c==="n"?1:c==="n^2"?2:3}} = ${f}$, så $${Ts}\\cdot ${f} = ${v}$ s.`,`The time scales by $${k}^{${c==="n"?1:c==="n^2"?2:3}} = ${f}$, so $${Ts}\\cdot ${f} = ${v}$ s.`)]; },
 ()=>{ const n=R.i(3,7); const f=[1,1,2,6,24,120,720,5040][n];
   return [T(`Hva returnerer \`fak(${n})\`?\`\`\`def fak(n):\n    if n <= 1:\n        return 1\n    return n * fak(n - 1)\`\`\``,`What does \`fact(${n})\` return?\`\`\`def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\`\`\``),{n:f,tol:0,u:""},T(`$${n}! = ${f}$. Basistilfellet stopper rekursjonen ved 1.`,`$${n}! = ${f}$. The base case stops the recursion at 1.`)]; }
);
GEN("MEK3100",2,
 ()=>{ const a=R.i(0,5), n=R.p([3,5,6,11,21]), b=a+R.p([1,2,4,5,10]); const st=(b-a)/(n-1);
   return [T(`Hva er avstanden mellom punktene i \`np.linspace(${a}, ${b}, ${n})\`?`,`What is the spacing between the points in \`np.linspace(${a}, ${b}, ${n})\`?`),{n:st,tol:0.0005,u:""},T(`$(${b} - ${a})/(${n} - 1) = ${mf(st,4)}$. Begge endepunktene er med.`,`$(${b} - ${a})/(${n} - 1) = ${mf(st,4)}$. Both endpoints are included.`)]; },
 ()=>{ const c=R.p([2,3,5,7,10]), x0=R.i(1,4); const x1=x0-(x0*x0-c)/(2*x0);
   return [T(`Ett steg med Newtons metode på $f(x) = x^2 - ${c}$ fra $x_0 = ${x0}$. Hva er $x_1$?`,`One step of Newton's method on $f(x) = x^2 - ${c}$ from $x_0 = ${x0}$. What is $x_1$?`),{n:x1,tol:0.001,u:""},`$x_1 = x_0 - \\dfrac{x_0^2 - ${c}}{2x_0} = ${x0} - \\dfrac{${x0*x0-c}}{${2*x0}} \\approx ${mf(x1,4)}$.`]; },
 ()=>{ const y0=R.i(1,5), k=R.p([-2,-1,-0.5,0.5,1,2]), h=R.p([0.1,0.2,0.5]); const y1=y0+h*k*y0;
   return [T(`Ett steg med Eulers metode for $y' = ${mf(k)}y$, $y(0) = ${y0}$, med steglengde $h = ${mf(h)}$. Hva er $y_1$?`,`One step of Euler's method for $y' = ${mf(k)}y$, $y(0) = ${y0}$, with step size $h = ${mf(h)}$. What is $y_1$?`),{n:y1,tol:0.001,u:""},`$y_1 = y_0 + h\\cdot ${mf(k)}\\,y_0 = ${y0} + ${mf(h)}\\cdot ${mf(k*y0)} = ${mf(y1,3)}$.`]; },
 ()=>{ const a=R.distinct(3,1,9), s=R.i(2,4);
   return [T(`Hva skriver koden ut?\`\`\`a = np.array([${a.join(", ")}])\nprint(a.sum() * ${s})\`\`\``,`What does the code print?\`\`\`a = np.array([${a.join(", ")}])\nprint(a.sum() * ${s})\`\`\``),{n:a.reduce((x,y)=>x+y,0)*s,tol:0,u:""},T(`\`a.sum()\` er ${a.reduce((x,y)=>x+y,0)}, ganger ${s} blir ${a.reduce((x,y)=>x+y,0)*s}.`,`\`a.sum()\` is ${a.reduce((x,y)=>x+y,0)}, and times ${s} that gives ${a.reduce((x,y)=>x+y,0)*s}.`)]; }
);

// ================= DAVE3700 Matematikk 3000 =================
GEN("DAVE3700",0,
 ()=>{ const a=R.i(1,5), b=R.i(1,5), x=R.i(-3,3), y=R.i(-3,3); const gx=2*a*x, gy=2*b*y, n=Math.hypot(gx,gy);
   return [T(`$f(x,y) = ${a===1?"":a}x^2 + ${b===1?"":b}y^2$. Hva er $|\\nabla f|$ i $(${x}, ${y})$?`,`$f(x,y) = ${a===1?"":a}x^2 + ${b===1?"":b}y^2$. What is $|\\nabla f|$ at $(${x}, ${y})$?`),{n,tol:0.01,u:""},T(`$\\nabla f = (${2*a}x, ${2*b}y) = (${gx}, ${gy})$, og lengden er $\\approx ${mf(n,3)}$.`,`$\\nabla f = (${2*a}x, ${2*b}y) = (${gx}, ${gy})$, and its magnitude is $\\approx ${mf(n,3)}$.`)]; },
 ()=>{ const m=R.i(1,4), n=R.i(1,4), x=R.i(-2,3), y=R.i(-2,3), wrt=R.p(["x","y"]);
   const v= wrt==="x"? m*x**(m-1)*y**n : n*x**m*y**(n-1);
   return [T(`$f(x,y) = x^{${m}}y^{${n}}$. Hva er $f_${wrt}(${x}, ${y})$?`,`$f(x,y) = x^{${m}}y^{${n}}$. What is $f_${wrt}(${x}, ${y})$?`),{n:v,tol:0,u:""},wrt==="x"?T(`$f_x = ${m}x^{${m-1}}y^{${n}}$ gir ${v}.`,`$f_x = ${m}x^{${m-1}}y^{${n}}$ gives ${v}.`):T(`$f_y = ${n}x^{${m}}y^{${n-1}}$ gir ${v}.`,`$f_y = ${n}x^{${m}}y^{${n-1}}$ gives ${v}.`)]; },
 ()=>{ const a=R.i(1,4), b=R.i(1,4), c=R.i(-3,3); const Dv = (2*a)*(2*b)-c*c; const t = Dv>0?"Lokalt minimum":Dv<0?"Sadelpunkt":"Testen sier ingenting";
   const EN={"Lokalt minimum":"Local minimum","Lokalt maksimum":"Local maximum","Sadelpunkt":"Saddle point","Testen sier ingenting":"The test is inconclusive"};
   return [T(`$f(x,y) = ${a===1?"":a}x^2 ${c<0?"-":"+"} ${Math.abs(c)===1?"":Math.abs(c)}xy + ${b===1?"":b}y^2$ har et kritisk punkt i origo. Hva slags punkt er det?`,`$f(x,y) = ${a===1?"":a}x^2 ${c<0?"-":"+"} ${Math.abs(c)===1?"":Math.abs(c)}xy + ${b===1?"":b}y^2$ has a critical point at the origin. What type of point is it?`),[t,...["Lokalt minimum","Lokalt maksimum","Sadelpunkt","Testen sier ingenting"].filter(x=>x!==t)].slice(0,4).map(o=>T(o,EN[o])),T(`$D = f_{xx}f_{yy} - f_{xy}^2 = ${2*a}\\cdot ${2*b} - ${c}^2 = ${Dv}$.${Dv>0?` Og $f_{xx} = ${2*a} > 0$.`:""}`,`$D = f_{xx}f_{yy} - f_{xy}^2 = ${2*a}\\cdot ${2*b} - ${c}^2 = ${Dv}$.${Dv>0?` And $f_{xx} = ${2*a} > 0$.`:""}`)]; }
);
GEN("DAVE3700",1,
 ()=>{ const a=R.i(1,4), b=R.i(1,4); const v=a*a*b*b/4;
   return [`$\\displaystyle\\iint_{[0,${a}]\\times[0,${b}]} xy\\,dA = $`,{n:v,tol:0.01,u:""},`$\\int_0^{${a}}x\\,dx\\cdot\\int_0^{${b}}y\\,dy = ${mf(a*a/2)}\\cdot ${mf(b*b/2)} = ${mf(v,3)}$.`]; },
 ()=>{ const r=R.i(1,5); return [T(`Bruk polarkoordinater: Hva er $\\displaystyle\\iint_D 1\\,dA$ når $D$ er en disk med radius ${r}?`,`Use polar coordinates: What is $\\displaystyle\\iint_D 1\\,dA$ when $D$ is a disk of radius ${r}?`),{n:Math.PI*r*r,tol:0.01,u:""},`$\\int_0^{2\\pi}\\!\\int_0^{${r}} r\\,dr\\,d\\theta = 2\\pi\\cdot ${mf(r*r/2)} = ${r*r}\\pi \\approx ${mf(Math.PI*r*r,3)}$.`]; },
 ()=>{ const a=R.i(1,5), b=R.i(1,5), c=R.i(1,5); return [`$\\displaystyle\\iint_{[0,${a}]\\times[0,${b}]} (x + ${c})\\,dA = $`,{n:b*(a*a/2+c*a),tol:0.01,u:""},`$\\int_0^{${b}}\\left[\\tfrac{x^2}{2} + ${c}x\\right]_0^{${a}}dy = ${b}\\cdot ${mf(a*a/2+c*a)} = ${mf(b*(a*a/2+c*a))}$.`]; }
);
GEN("DAVE3700",2,
 ()=>{ const [a,b,c]=[R.i(-5,5),R.i(-5,5),R.i(-5,5)];
   return [`$\\nabla\\cdot(${a}x,\\ ${b}y,\\ ${c}z) = $`,{n:a+b+c,tol:0,u:""},`$\\partial_x(${a}x) + \\partial_y(${b}y) + \\partial_z(${c}z) = ${a+b+c}$.`]; },
 ()=>{ const p=R.i(-4,4), q=R.i(-4,4), k=R.i(1,3);
   return [T(`$\\vec F = (${k===1?"":k}y,\\ ${k===1?"":k}x)$. Beregn $\\int_C\\vec F\\cdot d\\vec r$ langs en vilkårlig kurve fra $(0, 0)$ til $(${p}, ${q})$.`,`$\\vec F = (${k===1?"":k}y,\\ ${k===1?"":k}x)$. Compute $\\int_C\\vec F\\cdot d\\vec r$ along an arbitrary curve from $(0, 0)$ to $(${p}, ${q})$.`),{n:k*p*q,tol:0,u:""},T(`$\\vec F = \\nabla(${k===1?"":k}xy)$ er konservativt, så svaret er $${k}\\cdot ${p}\\cdot ${q} = ${k*p*q}$.`,`$\\vec F = \\nabla(${k===1?"":k}xy)$ is conservative, so the answer is $${k}\\cdot ${p}\\cdot ${q} = ${k*p*q}$.`)]; },
 ()=>{ const a=R.i(1,5), b=R.i(1,5); return [T(`$\\vec F = (${a}x^2,\\ ${b}y)$. Hva er $\\nabla\\cdot\\vec F$ i punktet $(1, 1)$?`,`$\\vec F = (${a}x^2,\\ ${b}y)$. What is $\\nabla\\cdot\\vec F$ at the point $(1, 1)$?`),{n:2*a+b,tol:0,u:""},T(`$\\nabla\\cdot\\vec F = ${2*a}x + ${b}$, som i $(1,1)$ er ${2*a+b}.`,`$\\nabla\\cdot\\vec F = ${2*a}x + ${b}$, which at $(1,1)$ equals ${2*a+b}.`)]; }
);

// ================= ELFT2400 Kybernetikk =================
GEN("ELFT2400",0,
 ()=>{ const b=R.i(1,20), a=R.i(1,10); const Q=R.p(["sv","tau"]);
   if(Q==="sv") return [T(`$G(s) = \\dfrac{${b}}{s + ${a}}$ får et enhetssprang. Hva blir sluttverdien?`,`$G(s) = \\dfrac{${b}}{s + ${a}}$ is given a unit step input. What is the final value?`),{n:b/a,tol:0.01,u:""},`$G(0) = ${b}/${a} \\approx ${mf(b/a,3)}$.`];
   return [T(`Hva er tidskonstanten til $G(s) = \\dfrac{${b}}{s + ${a}}$?`,`What is the time constant of $G(s) = \\dfrac{${b}}{s + ${a}}$?`),{n:1/a,tol:0.005,u:"s"},T(`Skriv som $\\dfrac{${mf(b/a,3)}}{${mf(1/a,3)}s + 1}$: $\\tau = 1/${a} \\approx ${mf(1/a,3)}$ s.`,`Rewrite as $\\dfrac{${mf(b/a,3)}}{${mf(1/a,3)}s + 1}$: $\\tau = 1/${a} \\approx ${mf(1/a,3)}$ s.`)]; },
 ()=>{ const K=R.i(1,10), tau=R.p([0.5,1,2,5,10]), k=R.p([1,2,3,5]); const y=K*(1-Math.exp(-k));
   return [T(`$G(s) = \\dfrac{${K}}{${mf(tau)}s + 1}$ får et enhetssprang ved $t = 0$. Hva er utgangen ved $t = ${mf(k*tau)}$ s?`,`$G(s) = \\dfrac{${K}}{${mf(tau)}s + 1}$ is given a unit step input at $t = 0$. What is the output at $t = ${mf(k*tau)}$ s?`),{n:y,tol:rel(y),u:""},T(`$y(t) = ${K}(1 - e^{-t/${mf(tau)}})$, og $t = ${k}\\tau$ gir $${K}(1 - e^{-${k}}) \\approx ${mf(y,3)}$.`,`$y(t) = ${K}(1 - e^{-t/${mf(tau)}})$, and $t = ${k}\\tau$ gives $${K}(1 - e^{-${k}}) \\approx ${mf(y,3)}$.`)]; },
 ()=>{ const [p1,p2]=R.distinct(2,-6,3,[0]); const st = p1<0&&p2<0;
   return [T(`Et system har poler i $s = ${p1}$ og $s = ${p2}$. Er det stabilt?`,`A system has poles at $s = ${p1}$ and $s = ${p2}$. Is it stable?`),st?T(["Ja, begge polene har negativ realdel","Nei, minst én pol ligger i høyre halvplan","Det er marginalt stabilt"],["Yes, both poles have a negative real part","No, at least one pole lies in the right half-plane","It is marginally stable"]):T(["Nei, minst én pol ligger i høyre halvplan","Ja, begge polene har negativ realdel","Det er marginalt stabilt"],["No, at least one pole lies in the right half-plane","Yes, both poles have a negative real part","It is marginally stable"]),T(`Stabilt krever at alle poler ligger i venstre halvplan.`,`Stability requires all poles to lie in the left half-plane.`)]; }
);
GEN("ELFT2400",1,
 ()=>{ const wn=R.i(1,10), z=R.p([0.1,0.2,0.3,0.5,0.7,1]); const a=2*z*wn, b=wn*wn; const Q=R.p(["z","wn"]);
   const tf=`\\dfrac{${b}}{s^2 + ${mf(a,2)}s + ${b}}`;
   if(Q==="z") return [T(`Hva er dempingsforholdet $\\zeta$ i $${tf}$?`,`What is the damping ratio $\\zeta$ of $${tf}$?`),{n:z,tol:0.01,u:""},T(`$\\omega_n = \\sqrt{${b}} = ${wn}$ og $2\\zeta\\omega_n = ${mf(a,2)}$ gir $\\zeta = ${mf(z)}$.`,`$\\omega_n = \\sqrt{${b}} = ${wn}$ and $2\\zeta\\omega_n = ${mf(a,2)}$ give $\\zeta = ${mf(z)}$.`)];
   return [T(`Hva er den udempede egenfrekvensen $\\omega_n$ i $${tf}$?`,`What is the undamped natural frequency $\\omega_n$ of $${tf}$?`),{n:wn,tol:0.01,u:"rad/s"},T(`$\\omega_n^2 = ${b}$, så $\\omega_n = ${wn}$ rad/s.`,`$\\omega_n^2 = ${b}$, so $\\omega_n = ${wn}$ rad/s.`)]; },
 ()=>{ const K=R.p([1,2,4,5,10]), Kp=R.p([1,2,4,5,9,10]); const e=1/(1+Kp*K);
   return [T(`Prosessen $G(s) = \\dfrac{${K}}{s+1}$ reguleres med en ren P-regulator, $K_p = ${Kp}$. Hva er det stasjonære avviket etter et enhetssprang i referansen?`,`The process $G(s) = \\dfrac{${K}}{s+1}$ is controlled by a pure P controller, $K_p = ${Kp}$. What is the steady-state error after a unit step in the reference?`),{n:e,tol:0.002,u:""},T(`$e_\\infty = \\dfrac{1}{1 + K_pG(0)} = \\dfrac{1}{1 + ${Kp*K}} \\approx ${mf(e,4)}$. Et I-ledd ville fjernet det.`,`$e_\\infty = \\dfrac{1}{1 + K_pG(0)} = \\dfrac{1}{1 + ${Kp*K}} \\approx ${mf(e,4)}$. An integral (I) term would remove it.`)]; },
 ()=>{ const K=R.i(1,10), a=R.i(1,6); const cl=K/(a+K);
   return [T(`$G(s) = \\dfrac{${K}}{s + ${a}}$ kobles i lukket sløyfe med enhets negativ tilbakekobling. Hvor ligger polen i det lukkede systemet?`,`$G(s) = \\dfrac{${K}}{s + ${a}}$ is connected in a closed loop with unity negative feedback. Where is the pole of the closed-loop system?`),{n:-(a+K),tol:0,u:""},T(`$\\dfrac{G}{1+G} = \\dfrac{${K}}{s + ${a+K}}$, så polen ligger i $s = -${a+K}$. Sluttverdien er $${K}/${a+K} \\approx ${mf(cl,3)}$.`,`$\\dfrac{G}{1+G} = \\dfrac{${K}}{s + ${a+K}}$, so the pole is at $s = -${a+K}$. The final value is $${K}/${a+K} \\approx ${mf(cl,3)}$.`)]; }
);
GEN("ELFT2400",2,
 ()=>{ const g=R.p([0.01,0.1,0.5,2,10,100,1000,0.001]); const db=20*Math.log10(g);
   return [T(`Hva er $|G| = ${mf(g,3)}$ i desibel?`,`What is $|G| = ${mf(g,3)}$ in decibels?`),{n:db,tol:0.1,u:"dB"},`$20\\log_{10}(${mf(g,3)}) \\approx ${mf(db,1)}$ dB.`]; },
 ()=>{ const db=R.p([-40,-20,-6,0,6,20,40]); const g=10**(db/20);
   return [T(`En forsterkning er ${nf(db)} dB. Hva er det som tallverdi?`,`A gain is ${nf(db)} dB. What is it as a linear value?`),{n:g,tol:rel(g,0.01),u:""},`$10^{${db}/20} \\approx ${mf(g,3)}$.`]; },
 ()=>{ const n=R.i(1,3), dec=R.i(1,3); return [T(`Et system har ${n===1?"én reell pol":n+" like reelle poler"}. Hvor mange dB faller amplituden over ${dec} ${dec===1?"dekade":"dekader"}, godt over knekkfrekvensen?`,`A system has ${n===1?"one real pole":n+" equal real poles"}. By how many dB does the amplitude drop over ${dec} ${dec===1?"decade":"decades"}, well above the corner frequency?`),{n:20*n*dec,tol:0.5,u:"dB"},T(`Hver pol gir 20 dB per dekade: $20\\cdot ${n}\\cdot ${dec} = ${20*n*dec}$ dB.`,`Each pole contributes 20 dB per decade: $20\\cdot ${n}\\cdot ${dec} = ${20*n*dec}$ dB.`)]; }
);

// ================= DAVE3705 Matematikk 4000 =================
GEN("DAVE3705",0,
 ()=>{ const n=R.i(1,5); const f=[1,1,2,6,24,120][n];
   return [`$\\mathcal L\\{t^{${n}}\\} = $`,[`$\\dfrac{${f}}{s^{${n+1}}}$`,`$\\dfrac{1}{s^{${n+1}}}$`,`$\\dfrac{${f}}{s^{${n}}}$`,`$\\dfrac{${n}}{s^{${n+1}}}$`].filter((v,i,a)=>a.indexOf(v)===i),T(`$\\mathcal L\\{t^n\\} = n!/s^{n+1}$, og $${n}! = ${f}$.`,`$\\mathcal L\\{t^n\\} = n!/s^{n+1}$, and $${n}! = ${f}$.`)]; },
 ()=>{ const a=R.i(1,9), b=R.i(1,6), sg=R.p([1,-1]);
   return [`$\\mathcal L^{-1}\\left\\{\\dfrac{${a}}{s ${sg>0?"+":"-"} ${b}}\\right\\} = $`,[`$${cf(a)}e^{${sg>0?"-":""}${cf(b)}t}$`,`$${cf(a)}e^{${sg>0?"":"-"}${cf(b)}t}$`,`$${cf(a)}\\sin ${cf(b)}t$`,`$${a}t\\,e^{${sg>0?"-":""}${cf(b)}t}$`],T(`$\\mathcal L\\{e^{ct}\\} = 1/(s-c)$ med $c = ${sg>0?-b:b}$.`,`$\\mathcal L\\{e^{ct}\\} = 1/(s-c)$ with $c = ${sg>0?-b:b}$.`)]; },
 ()=>{ const w=R.i(1,9), k=R.p(["sin","cos"]);
   return [`$\\mathcal L\\{\\${k}(${w}t)\\} = $`,k==="sin"?[`$\\dfrac{${w}}{s^2 + ${w*w}}$`,`$\\dfrac{s}{s^2 + ${w*w}}$`,`$\\dfrac{${w}}{s^2 - ${w*w}}$`,`$\\dfrac{1}{s + ${w}}$`]:[`$\\dfrac{s}{s^2 + ${w*w}}$`,`$\\dfrac{${w}}{s^2 + ${w*w}}$`,`$\\dfrac{s}{s^2 - ${w*w}}$`,`$\\dfrac{1}{s + ${w}}$`],T(`Standardtabell med $\\omega = ${w}$, $\\omega^2 = ${w*w}$.`,`Standard table with $\\omega = ${w}$, $\\omega^2 = ${w*w}$.`)]; },
 ()=>{ const a=R.i(1,6); let y0; do{ y0=R.i(1,9);}while(y0===a); return [T(`Løs $y' + ${a}y = 0$, $y(0) = ${y0}$ med Laplace. Hva er $Y(s)$?`,`Solve $y' + ${a}y = 0$, $y(0) = ${y0}$ using the Laplace transform. What is $Y(s)$?`),[`$\\dfrac{${y0}}{s + ${a}}$`,`$\\dfrac{${y0}}{s - ${a}}$`,`$\\dfrac{${a}}{s + ${y0}}$`,`$\\dfrac{${y0===1?"":y0}s}{s + ${a}}$`],T(`$sY - ${y0} + ${a}Y = 0$ gir $Y = ${y0}/(s + ${a})$, altså $y = ${y0}e^{-${a}t}$.`,`$sY - ${y0} + ${a}Y = 0$ gives $Y = ${y0}/(s + ${a})$, so $y = ${y0}e^{-${a}t}$.`)]; }
);
GEN("DAVE3705",1,
 ()=>{ const n=R.p([1,3,5,7]), A=R.i(1,5); const b=4*A/(n*Math.PI);
   return [T(`En firkantbølge veksler mellom $+${A}$ og $-${A}$ med periode $2\\pi$ (odde). Hva er Fourierkoeffisienten $b_{${n}}$?`,`A square wave alternates between $+${A}$ and $-${A}$ with period $2\\pi$ (odd). What is the Fourier coefficient $b_{${n}}$?`),{n:b,tol:0.005,u:""},T(`For firkantbølgen er $b_n = \\dfrac{4A}{n\\pi}$ for odde $n$: $\\dfrac{${4*A}}{${n}\\pi} \\approx ${mf(b,4)}$.`,`For the square wave, $b_n = \\dfrac{4A}{n\\pi}$ for odd $n$: $\\dfrac{${4*A}}{${n}\\pi} \\approx ${mf(b,4)}$.`)]; },
 ()=>{ const L=R.p([1,2,0.5,Math.PI]); const Ls = L===Math.PI?"\\pi":mf(L);
   return [T(`En funksjon har periode $2L$ med $L = ${Ls}$. Hva er grunnvinkelfrekvensen $\\omega_0 = \\pi/L$?`,`A function has period $2L$ with $L = ${Ls}$. What is the fundamental angular frequency $\\omega_0 = \\pi/L$?`),{n:Math.PI/L,tol:0.005,u:"rad/enhet"},`$\\omega_0 = \\pi/${Ls} \\approx ${mf(Math.PI/L,4)}$.`]; },
 ()=>{ const c=R.i(-5,5), k=R.i(1,5); return [T(`$f(x) = ${c} + ${k}\\cos x$ på $[-\\pi, \\pi]$. Hva er middelverdien av $f$ (altså $a_0/2$)?`,`$f(x) = ${c} + ${k}\\cos x$ on $[-\\pi, \\pi]$. What is the mean value of $f$ (i.e. $a_0/2$)?`),{n:c,tol:0,u:""},T(`Cosinusleddet har middelverdi 0, så middelverdien er ${c}.`,`The cosine term has a mean value of 0, so the mean value is ${c}.`)]; }
);
GEN("DAVE3705",2,
 ()=>{ const c=R.p([1,2,0.5]), L=R.p([1,2,Math.PI]), n=R.i(1,3); const r=c*c*(n*Math.PI/L)**2; const Ls=L===Math.PI?"\\pi":mf(L);
   return [T(`Varmeligningen $u_t = ${c*c===1?"":mf(c*c)}u_{xx}$ på $[0, ${Ls}]$ med $u = 0$ i endene. Mode $n = ${n}$ avtar som $e^{-\\lambda t}$. Hva er $\\lambda$?`,`The heat equation $u_t = ${c*c===1?"":mf(c*c)}u_{xx}$ on $[0, ${Ls}]$ with $u = 0$ at the ends. Mode $n = ${n}$ decays as $e^{-\\lambda t}$. What is $\\lambda$?`),{n:r,tol:rel(r),u:""},`$\\lambda = c^2(n\\pi/L)^2 = ${mf(c*c)}\\cdot(${n}\\pi/${Ls})^2 \\approx ${mf(r,3)}$.`]; },
 ()=>{ const c=R.p([1,2,3,340]), L=R.p([1,2,0.5]), n=R.i(1,4); const w=c*n*Math.PI/L;
   return [T(`En streng med lengde ${nf(L)} og bølgefart $c = ${c}$ er fast i begge ender. Hva er vinkelfrekvensen til mode ${n}?`,`A string of length ${nf(L)} with wave speed $c = ${c}$ is fixed at both ends. What is the angular frequency of mode ${n}?`),{n:w,tol:rel(w),u:"rad/s"},`$\\omega_n = cn\\pi/L = ${c}\\cdot ${n}\\pi/${mf(L)} \\approx ${mf(w,2)}$ rad/s.`]; },
 ()=>{ const [a,d]=[R.i(-5,4),R.i(-5,4)], b=R.i(-3,3); const st=a<0&&d<0;
   return [T(`Er $\\vec x' = \\begin{pmatrix}${a}&${b}\\\\0&${d}\\end{pmatrix}\\vec x$ asymptotisk stabilt?`,`Is $\\vec x' = \\begin{pmatrix}${a}&${b}\\\\0&${d}\\end{pmatrix}\\vec x$ asymptotically stable?`),st?T(["Ja","Nei"],["Yes","No"]):T(["Nei","Ja"],["No","Yes"]),T(`Matrisen er trekantet, så egenverdiene er ${a} og ${d}. Stabilt krever at begge er negative.`,`The matrix is triangular, so the eigenvalues are ${a} and ${d}. Stability requires both to be negative.`)]; }
);
