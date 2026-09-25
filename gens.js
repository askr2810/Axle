// Oppgavegeneratorer: nye tall hver gang, svaret regnes ut i koden.
// Hver generator returnerer samme format som den faste banken: [tekst, svar, forklaring]
const R = {
  i:(a,b)=>a+Math.floor(Math.random()*(b-a+1)),
  p:a=>a[Math.floor(Math.random()*a.length)],
  f:(a,b,st)=>+(a+st*Math.floor(Math.random()*(Math.round((b-a)/st)+1))).toFixed(6),
  distinct:(n,a,b,ex=[])=>{const s=new Set();let g=0;while(s.size<n&&g++<500){const v=R.i(a,b);if(!ex.includes(v))s.add(v);}return [...s];}
};
const G_ = 9.81, DEG = Math.PI/180;
// tall på norsk: nf for tekst, mf for inne i $...$
function nf(x,d=2){ if(!Number.isFinite(x)) return String(x); if(x!==0){ const sd=2-Math.floor(Math.log10(Math.abs(x))); d=Math.max(d,Math.min(sd,7)); } let v=Math.round(x*10**d)/10**d; if(Object.is(v,-0)) v=0;
  let s=v.toFixed(d); if(s.includes(".")) s=s.replace(/0+$/,"").replace(/\.$/,""); return s.replace(".", (typeof LANG!=="undefined" && LANG==="en") ? "." : ",").replace("-","−"); }
function mf(x,d=2){ return nf(x,d).replace(",","{,}").replace("−","-"); }
const rel = (x,p=0.01,min=1e-9) => Math.max(Math.abs(x)*p, min);
// flervalg der riktig svar står først; like/ugyldige distraktorer byttes ut
function mcN(correct, wrongs, fmt){
  const c = fmt(correct); const out=[c]; const seen=new Set([c]);
  for(const w of wrongs){ if(!Number.isFinite(w)) continue; const s=fmt(w); if(!seen.has(s)){seen.add(s);out.push(s);} if(out.length===4) break; }
  let k=1; while(out.length<4 && k<40){ for(const f of [1+0.25*k,1-0.2*k,1+0.5*k]){ const s=fmt(correct*f+(correct===0?k:0)); if(!seen.has(s)){seen.add(s);out.push(s);} if(out.length===4) break;} k++; }
  return out;
}
const cf = a => a===1?"":a===-1?"-":String(a); // koeffisient foran variabel
const $m = s => "$"+s+"$";
function GEN(code, u, ...fns){ const c=COURSES.find(x=>x.code===code); (c.units[u].gen ||= []).push(...fns); }
function MORE(code, u, ...qs){ COURSES.find(x=>x.code===code).units[u].qs.push(...qs); }

// ================= MAPE1300 Mekanikk =================
GEN("MAPE1300",0,
 ()=>{ const F=R.f(50,600,10), d=R.f(0.2,2.5,0.1), M=F*d;
   return [T(`En kraft på ${nf(F)} N virker vinkelrett på en arm på ${nf(d)} m. Hvor stort er momentet?`,`A force of ${nf(F)} N acts perpendicular to a lever arm of ${nf(d)} m. How large is the moment?`),{n:M,tol:rel(M),u:"Nm"},`$M = Fd = ${mf(F)}\\cdot ${mf(d)} = ${mf(M,1)}$ Nm.`]; },
 ()=>{ const F=R.f(100,800,20), th=R.p([20,25,30,35,40,50,55,60,70]), ax=R.p(["x","y"]);
   const v = ax==="x"? F*Math.cos(th*DEG) : F*Math.sin(th*DEG);
   return [T(`En kraft på ${nf(F)} N peker ${th}° over horisontalen. Hva er ${ax==="x"?"den horisontale":"den vertikale"} komponenten?`,`A force of ${nf(F)} N points ${th}° above the horizontal. What is the ${ax==="x"?"horizontal":"vertical"} component?`),{n:v,tol:rel(v,0.01,0.5),u:"N"},
     `$F_${ax} = ${mf(F)}\\${ax==="x"?"cos":"sin"} ${th}^\\circ \\approx ${mf(v,1)}$ N.`]; },
 ()=>{ const L=R.i(3,10), a=R.i(1,L-1), P=R.f(2,30,1), side=R.p(["A","B"]);
   const RB=P*a/L, RA=P-RB, v= side==="A"?RA:RB;
   return [T(`En fritt opplagt bjelke A–B er ${L} m lang. En punktlast på ${nf(P)} kN står ${a} m fra A. Hva er opplagerkraften i ${side}?`,`A simply supported beam A–B is ${L} m long. A point load of ${nf(P)} kN acts ${a} m from A. What is the support reaction at ${side}?`),{n:v,tol:rel(v,0.01,0.02),u:"kN"},
     T(`Moment om A: $R_B\\cdot ${L} = ${mf(P)}\\cdot ${a}$, så $R_B = ${mf(RB)}$ kN og $R_A = P - R_B = ${mf(RA)}$ kN.`,`Moments about A: $R_B\\cdot ${L} = ${mf(P)}\\cdot ${a}$, so $R_B = ${mf(RB)}$ kN and $R_A = P - R_B = ${mf(RA)}$ kN.`)]; }
);
GEN("MAPE1300",1,
 ()=>{ const m=R.i(2,60), mu=R.f(0.1,0.8,0.05), F=mu*m*G_;
   return [T(`En kloss på ${m} kg ligger på et horisontalt underlag med $\\mu_s = ${mf(mu)}$. Hvor stor kraft skal til før den begynner å gli? ($g = 9{,}81$)`,`A block of ${m} kg rests on a horizontal surface with $\\mu_s = ${mf(mu)}$. How large a force is needed before it starts to slide? ($g = 9.81$)`),{n:F,tol:rel(F),u:"N"},T(`$F = \\mu_s mg = ${mf(mu)}\\cdot ${m}\\cdot 9{,}81 \\approx ${mf(F,1)}$ N.`,`$F = \\mu_s mg = ${mf(mu)}\\cdot ${m}\\cdot 9.81 \\approx ${mf(F,1)}$ N.`)]; },
 ()=>{ let th,mu; do{ th=R.i(10,45); mu=R.f(0.15,0.9,0.05);}while(Math.abs(Math.tan(th*DEG)-mu)<0.04);
   const slides = Math.tan(th*DEG)>mu;
   return [T(`En kloss ligger på et skråplan med helning ${th}°. Statisk friksjonskoeffisient er $\\mu_s = ${mf(mu)}$. Hva skjer?`,`A block rests on an inclined plane with an inclination of ${th}°. The coefficient of static friction is $\\mu_s = ${mf(mu)}$. What happens?`),
     slides?T(["Klossen glir nedover","Klossen blir liggende","Det avhenger av massen"],["The block slides down","The block stays at rest","It depends on the mass"]):T(["Klossen blir liggende","Klossen glir nedover","Det avhenger av massen"],["The block stays at rest","The block slides down","It depends on the mass"]),
     T(`Klossen glir hvis $\\tan\\theta > \\mu_s$. Her er $\\tan ${th}^\\circ \\approx ${mf(Math.tan(th*DEG))}$. Massen forkortes bort.`,`The block slides if $\\tan\\theta > \\mu_s$. Here $\\tan ${th}^\\circ \\approx ${mf(Math.tan(th*DEG))}$. The mass cancels out.`)]; }
);
GEN("MAPE1300",2,
 ()=>{ const v=R.i(5,40), t=R.i(2,10), a=v/t;
   return [T(`En bil akselererer jevnt fra ro til ${v} m/s på ${t} s. Hva er akselerasjonen?`,`A car accelerates uniformly from rest to ${v} m/s in ${t} s. What is the acceleration?`),{n:a,tol:rel(a,0.01,0.01),u:"m/s²"},`$a = ${v}/${t} \\approx ${mf(a)}$ m/s².`]; },
 ()=>{ const h=R.i(2,80), v=Math.sqrt(2*G_*h);
   return [T(`En gjenstand slippes fra ${h} m høyde. Hvor stor fart har den når den treffer bakken? (Se bort fra luftmotstand)`,`An object is dropped from a height of ${h} m. What is its speed when it hits the ground? (Neglect air resistance)`),{n:v,tol:rel(v),u:"m/s"},T(`Energibevaring: $v = \\sqrt{2gh} = \\sqrt{2\\cdot 9{,}81\\cdot ${h}} \\approx ${mf(v,1)}$ m/s.`,`Conservation of energy: $v = \\sqrt{2gh} = \\sqrt{2\\cdot 9.81\\cdot ${h}} \\approx ${mf(v,1)}$ m/s.`)]; },
 ()=>{ const m=R.f(0.5,20,0.5), v=R.i(2,15), E=0.5*m*v*v;
   return [T(`Hva er den kinetiske energien til ${nf(m)} kg med farten ${v} m/s?`,`What is the kinetic energy of ${nf(m)} kg moving at ${v} m/s?`),{n:E,tol:rel(E),u:"J"},`$E_k = \\tfrac12 mv^2 = \\tfrac12\\cdot ${mf(m)}\\cdot ${v}^2 = ${mf(E,1)}$ J.`]; },
 ()=>{ const m=R.f(0.5,10,0.5), r=R.f(0.2,3,0.1), v=R.i(2,12), F=m*v*v/r;
   return [T(`Et legeme på ${nf(m)} kg går i en sirkel med radius ${nf(r)} m og fart ${v} m/s. Hvor stor er sentripetalkraften?`,`A body of ${nf(m)} kg moves in a circle of radius ${nf(r)} m at a speed of ${v} m/s. What is the centripetal force?`),{n:F,tol:rel(F),u:"N"},`$F = mv^2/r = ${mf(m)}\\cdot ${v}^2/${mf(r)} \\approx ${mf(F,1)}$ N.`]; },
 ()=>{ const a=R.f(0.5,5,0.5), t=R.i(2,12), s=0.5*a*t*t;
   return [T(`Et legeme starter fra ro med konstant akselerasjon ${nf(a)} m/s². Hvor langt har det kommet etter ${t} s?`,`A body starts from rest with a constant acceleration of ${nf(a)} m/s². How far has it traveled after ${t} s?`),{n:s,tol:rel(s),u:"m"},`$s = \\tfrac12at^2 = \\tfrac12\\cdot ${mf(a)}\\cdot ${t}^2 = ${mf(s,1)}$ m.`]; }
);

// ================= MEK1300 Programmering 1 =================
GEN("MEK1300",0,
 ()=>{ const a=R.i(7,60), b=R.i(2,9), op=R.p(["//","%"]); const v= op==="//"?Math.floor(a/b):a%b;
   return [T(`Hva skriver \`print(${a} ${op} ${b})\` ut?`,`What does \`print(${a} ${op} ${b})\` output?`),{n:v,tol:0,u:""},op==="//"?T(`Heltallsdivisjon: $${a}/${b} \\approx ${mf(a/b)}$ rundes ned til ${v}.`,`Integer division: $${a}/${b} \\approx ${mf(a/b)}$ is rounded down to ${v}.`):T(`Resten: $${a} = ${Math.floor(a/b)}\\cdot ${b} + ${v}$.`,`The remainder: $${a} = ${Math.floor(a/b)}\\cdot ${b} + ${v}$.`)]; },
 ()=>{ const xs=R.distinct(5,1,30), k=R.i(1,5);
   return [T(`Hva skriver koden ut?\`\`\`x = [${xs.join(", ")}]\nprint(x[-${k}])\`\`\``,`What does the code print?\`\`\`x = [${xs.join(", ")}]\nprint(x[-${k}])\`\`\``),{n:xs[xs.length-k],tol:0,u:""},T(`\`x[-${k}]\` er element nummer ${k} bakfra, altså ${xs[xs.length-k]}.`,`\`x[-${k}]\` is element number ${k} counted from the end, i.e. ${xs[xs.length-k]}.`)]; },
 ()=>{ const xs=R.distinct(6,1,20), a=R.i(0,2), b=R.i(3,6); const sl=xs.slice(a,b);
   return [T(`Hva skriver koden ut?\`\`\`x = [${xs.join(", ")}]\nprint(len(x[${a}:${b}]))\`\`\``,`What does the code print?\`\`\`x = [${xs.join(", ")}]\nprint(len(x[${a}:${b}]))\`\`\``),{n:sl.length,tol:0,u:""},T(`Utsnittet tar med indeks ${a} til og med ${b-1}, altså ${sl.length} elementer.`,`The slice includes indices ${a} through ${b-1}, i.e. ${sl.length} ${sl.length===1?"element":"elements"}.`)]; }
);
GEN("MEK1300",1,
 ()=>{ const a=R.i(0,5), s=R.i(1,3), b=a+s*R.i(3,6)+R.i(0,1); let sum=0; for(let i=a;i<b;i+=s) sum+=i;
   const iv=(()=>{const r=[];for(let i=a;i<b;i+=s)r.push(i);return r.join(", ")})();
   return [T(`Hva skriver koden ut?\`\`\`total = 0\nfor i in range(${a}, ${b}, ${s}):\n    total += i\nprint(total)\`\`\``,`What does the code print?\`\`\`total = 0\nfor i in range(${a}, ${b}, ${s}):\n    total += i\nprint(total)\`\`\``),{n:sum,tol:0,u:""},T(`\`i\` tar verdiene ${iv}. Summen er ${sum}.`,`\`i\` takes the values ${iv}. The sum is ${sum}.`)]; },
 ()=>{ const st=R.i(2,5), lim=R.i(10,40); let n=0,c=0; while(n<lim){n+=st;c++;}
   return [T(`Hvor mange ganger kjører løkka?\`\`\`n = 0\nwhile n < ${lim}:\n    n += ${st}\`\`\``,`How many times does the loop run?\`\`\`n = 0\nwhile n < ${lim}:\n    n += ${st}\`\`\``),{n:c,tol:0,u:""},T(`n øker med ${st} til den er minst ${lim}: det skjer etter ${c} runder (n = ${n}).`,`n increases by ${st} until it is at least ${lim}: this happens after ${c} iterations (n = ${n}).`)]; },
 ()=>{ const x=R.i(1,20), t1=R.i(3,10), t2=t1+R.i(3,8);
   const out = x<t1?"A":x<t2?"B":"C";
   return [T(`Hva skriver koden ut?\`\`\`x = ${x}\nif x < ${t1}:\n    print("A")\nelif x < ${t2}:\n    print("B")\nelse:\n    print("C")\`\`\``,`What does the code print?\`\`\`x = ${x}\nif x < ${t1}:\n    print("A")\nelif x < ${t2}:\n    print("B")\nelse:\n    print("C")\`\`\``),[out,...["A","B","C"].filter(v=>v!==out)],T(`Den første betingelsen som er sann, bestemmer. ${x} < ${t1} er ${x<t1?"sann":"usann"}${x>=t1?`, og ${x} < ${t2} er ${x<t2?"sann":"usann"}`:""}.`,`The first condition that is true decides. ${x} < ${t1} is ${x<t1?"true":"false"}${x>=t1?`, and ${x} < ${t2} is ${x<t2?"true":"false"}`:""}.`)]; }
);
GEN("MEK1300",2,
 ()=>{ const k=R.i(2,6), x=R.i(2,9), useB=R.p([true,false]), y=R.i(2,9);
   const v = useB ? x*y : x*k;
   return [T(`Hva returnerer kallet?\`\`\`def f(a, b=${k}):\n    return a * b\n\nf(${x}${useB?", "+y:""})\`\`\``,`What does the call return?\`\`\`def f(a, b=${k}):\n    return a * b\n\nf(${x}${useB?", "+y:""})\`\`\``),{n:v,tol:0,u:""},useB?T(`\`b\` får verdien ${y}, så svaret er $${x}\\cdot ${y} = ${v}$.`,`\`b\` gets the value ${y}, so the answer is $${x}\\cdot ${y} = ${v}$.`):T(`\`b\` får standardverdien ${k}, så svaret er $${x}\\cdot ${k} = ${v}$.`,`\`b\` gets the default value ${k}, so the answer is $${x}\\cdot ${k} = ${v}$.`)]; },
 ()=>{ const w=R.p(["python","ingenior","matematikk","robot","termo","kybernetikk"]); const ch=R.p([...new Set(w)]); const n=[...w].filter(c=>c===ch).length;
   return [T(`Hva returnerer \`"${w}".count("${ch}")\`?`,`What does \`"${w}".count("${ch}")\` return?`),{n,tol:0,u:""},T(`Bokstaven «${ch}» forekommer ${n} ${n===1?"gang":"ganger"} i «${w}».`,`The letter "${ch}" occurs ${n} ${n===1?"time":"times"} in "${w}".`)]; }
);

// ================= MATS1600 Mekanisk design =================
GEN("MATS1600",0,
 ()=>{ const F=R.f(5,80,1), A=R.p([25,50,75,100,150,200,250,300]), s=F*1000/A;
   return [T(`En stav med tverrsnitt ${A} mm² belastes med ${nf(F)} kN strekk. Hva er normalspenningen?`,`A bar with a cross-sectional area of ${A} mm² is loaded with ${nf(F)} kN in tension. What is the normal stress?`),{n:s,tol:rel(s),u:"MPa"},`$\\sigma = F/A = ${mf(F*1000,0)}/${A} \\approx ${mf(s,1)}$ MPa (N/mm²).`]; },
 ()=>{ const s=R.f(50,300,10), E=R.p([70,110,210]), e=s/(E*1000)*1000;
   const mat = E===70?T("Aluminium","Aluminum"):E===110?T("Titan","Titanium"):T("Stål","Steel");
   return [T(`${mat} ($E = ${E}$ GPa) har spenningen ${nf(s)} MPa. Hva er tøyningen i promille?`,`${mat} ($E = ${E}$ GPa) is subjected to a stress of ${nf(s)} MPa. What is the strain in per mille (‰)?`),{n:e,tol:rel(e,0.01,0.005),u:"‰"},`$\\varepsilon = \\sigma/E = ${mf(s)}/${E*1000} \\approx ${mf(e,3)}$ ‰.`]; },
 ()=>{ const Re=R.p([235,275,355,460]), s=R.f(60,300,10), n=Re/s;
   return [T(`Et stål med flytegrense ${Re} MPa har en maksimal spenning på ${nf(s)} MPa. Hva er sikkerhetsfaktoren mot flyt?`,`A steel with a yield strength of ${Re} MPa has a maximum stress of ${nf(s)} MPa. What is the safety factor against yielding?`),{n,tol:rel(n,0.01,0.01),u:""},`$n = R_e/\\sigma = ${Re}/${mf(s)} \\approx ${mf(n)}$.`]; },
 ()=>{ const b=R.p([10,20,30,40,50]), h=R.p([20,40,60,80,100]), M=R.f(0.2,5,0.1); const W=b*h*h/6, s=M*1e6/W;
   return [T(`En rektangulær bjelke har $b = ${b}$ mm og $h = ${h}$ mm og et bøyemoment på ${nf(M)} kNm. Hva er maksimal bøyespenning?`,`A rectangular beam has $b = ${b}$ mm and $h = ${h}$ mm and is subjected to a bending moment of ${nf(M)} kNm. What is the maximum bending stress?`),{n:s,tol:rel(s),u:"MPa"},T(`$W = bh^2/6 = ${mf(W,0)}$ mm³, og $\\sigma = M/W = ${mf(M*1e6,0)}/${mf(W,0)} \\approx ${mf(s,1)}$ MPa.`,`$W = bh^2/6 = ${mf(W,0)}$ mm³, and $\\sigma = M/W = ${mf(M*1e6,0)}/${mf(W,0)} \\approx ${mf(s,1)}$ MPa.`)]; }
);
GEN("MATS1600",1,
 ()=>{ const D=R.p([10,16,20,25,30,40,50]), hu=R.p([15,18,21,25,30]), eu=R.p([-7,-9,-20,-25,15,21,28,35]), it=R.p([9,11,13,16]);
   const el=eu-it; const cmax=hu-el, cmin=0-eu;
   const type = cmin>0?"Klaringspassning":cmax<0?"Presspassning":"Overgangspassning";
   const Q = R.p(["max","type"]);
   const txt = T(`Hull: Ø${D} +0,${String(hu).padStart(3,"0")} / 0. Aksel: Ø${D} ${eu>=0?"+":"−"}0,${String(Math.abs(eu)).padStart(3,"0")} / ${el>=0?"+":"−"}0,${String(Math.abs(el)).padStart(3,"0")} (mm).`,`Hole: ⌀${D} +0.${String(hu).padStart(3,"0")} / 0. Shaft: ⌀${D} ${eu>=0?"+":"−"}0.${String(Math.abs(eu)).padStart(3,"0")} / ${el>=0?"+":"−"}0.${String(Math.abs(el)).padStart(3,"0")} (mm).`);
   if(Q==="max") return [T(`${txt} Hva er største klaring, i µm? (Negativ verdi betyr grep.)`,`${txt} What is the maximum clearance, in µm? (A negative value means interference.)`),{n:cmax,tol:0.5,u:"µm"},T(`Største klaring = største hull − minste aksel = $${hu} - (${el}) = ${cmax}$ µm.`,`Maximum clearance = largest hole − smallest shaft = $${hu} - (${el}) = ${cmax}$ µm.`)];
   const EN={"Klaringspassning":"Clearance fit","Presspassning":"Interference fit","Overgangspassning":"Transition fit"};
   return [T(`${txt} Hva slags passning er dette?`,`${txt} What type of fit is this?`),[type,...["Klaringspassning","Presspassning","Overgangspassning"].filter(t=>t!==type)].map(o=>T(o,EN[o])),T(`Minste klaring er $0 - (${eu}) = ${cmin}$ µm og største klaring er $${hu} - (${el}) = ${cmax}$ µm. ${type==="Overgangspassning"?"Den ene er positiv og den andre negativ.":type==="Klaringspassning"?"Begge er positive.":"Begge er negative."}`,`The minimum clearance is $0 - (${eu}) = ${cmin}$ µm and the maximum clearance is $${hu} - (${el}) = ${cmax}$ µm. ${type==="Overgangspassning"?"One is positive and the other is negative.":type==="Klaringspassning"?"Both are positive.":"Both are negative."}`)]; }
);
GEN("MATS1600",2,
 ()=>{ const z1=R.p([12,15,18,20,24,25]), k=R.p([2,2.5,3,4,5]), z2=z1*k; if(!Number.isInteger(z2)) return GEN_FALLBACK_GEAR();
   const n1=R.p([900,1000,1200,1450,1500,2800,3000]); const n2=n1/k;
   return [T(`Et tannhjul med ${z1} tenner driver et hjul med ${z2} tenner. Inngående turtall er ${n1} rpm. Hva er utgående turtall?`,`A gear with ${z1} teeth drives a gear with ${z2} teeth. The input speed is ${n1} rpm. What is the output speed?`),{n:n2,tol:rel(n2,0.005,0.5),u:"rpm"},T(`$i = ${z2}/${z1} = ${mf(k)}$, så $n_2 = ${n1}/${mf(k)} = ${mf(n2,1)}$ rpm.`,`$i = ${z2}/${z1} = ${mf(k)}$, so $n_2 = ${n1}/${mf(k)} = ${mf(n2,1)}$ rpm.`)]; },
 ()=>{ const M=R.f(10,400,10), n=R.p([500,750,1000,1450,1500,2000,3000]), P=M*2*Math.PI*n/60/1000;
   return [T(`En aksel overfører ${nf(M)} Nm ved ${n} rpm. Hvor stor er effekten?`,`A shaft transmits ${nf(M)} Nm at ${n} rpm. What is the power?`),{n:P,tol:rel(P),u:"kW"},T(`$\\omega = 2\\pi n/60 \\approx ${mf(2*Math.PI*n/60,1)}$ rad/s, og $P = M\\omega \\approx ${mf(P)}$ kW.`,`$\\omega = 2\\pi n/60 \\approx ${mf(2*Math.PI*n/60,1)}$ rad/s, and $P = M\\omega \\approx ${mf(P)}$ kW.`)]; },
 ()=>{ const P=R.f(0.5,30,0.5), n=R.p([750,1000,1450,1500,3000]), M=P*1000/(2*Math.PI*n/60);
   return [T(`En motor gir ${nf(P)} kW ved ${n} rpm. Hvor stort er momentet?`,`A motor delivers ${nf(P)} kW at ${n} rpm. What is the torque?`),{n:M,tol:rel(M),u:"Nm"},`$M = P/\\omega = ${mf(P*1000,0)}/${mf(2*Math.PI*n/60,1)} \\approx ${mf(M,1)}$ Nm.`]; }
);
function GEN_FALLBACK_GEAR(){ return [T(`Et tannhjul med 20 tenner driver et hjul med 60 tenner. Inngående turtall er 1500 rpm. Hva er utgående turtall?`,`A gear with 20 teeth drives a gear with 60 teeth. The input speed is 1500 rpm. What is the output speed?`),{n:500,tol:1,u:"rpm"},T(`$i = 60/20 = 3$, så $n_2 = 1500/3 = 500$ rpm.`,`$i = 60/20 = 3$, so $n_2 = 1500/3 = 500$ rpm.`)]; }

// ================= MATS2100 Termodynamikk =================
GEN("MATS2100",0,
 ()=>{ const n=R.f(0.5,4,0.5), p=R.p([100,150,200,250,300,500]), Tk=R.p([280,300,320,350,400,450]); const V=n*8.314*Tk/(p*1000);
   return [T(`${nf(n)} mol ideell gass har trykket ${p} kPa og temperaturen ${Tk} K. Hva er volumet, i liter? ($R = 8{,}314$)`,`${nf(n)} mol of ideal gas has a pressure of ${p} kPa and a temperature of ${Tk} K. What is the volume, in liters? ($R = 8.314$)`),{n:V*1000,tol:rel(V*1000),u:"L"},T(`$V = nRT/p = ${mf(n)}\\cdot 8{,}314\\cdot ${Tk}/${p*1000} \\approx ${mf(V,4)}$ m³ = ${nf(V*1000,1)} L.`,`$V = nRT/p = ${mf(n)}\\cdot 8.314\\cdot ${Tk}/${p*1000} \\approx ${mf(V,4)}$ m³ = ${nf(V*1000,1)} L.`)]; },
 ()=>{ const c=R.i(-40,400), dir=R.p(["CK","KC"]);
   if(dir==="CK") return [T(`Hva er ${nf(c)} °C i kelvin?`,`What is ${nf(c)} °C in kelvin?`),{n:c+273.15,tol:0.2,u:"K"},T(`$T = ${c} + 273{,}15 = ${mf(c+273.15)}$ K.`,`$T = ${c} + 273.15 = ${mf(c+273.15)}$ K.`)];
   const K=c+273; return [T(`Hva er ${K} K i grader celsius?`,`What is ${K} K in degrees Celsius?`),{n:K-273.15,tol:0.2,u:"°C"},T(`$t = ${K} - 273{,}15 = ${mf(K-273.15)}$ °C.`,`$t = ${K} - 273.15 = ${mf(K-273.15)}$ °C.`)]; },
 ()=>{ const n=R.f(0.5,3,0.5), Tk=R.p([300,350,400]), r=R.p([2,3,4,5]); const W=n*8.314*Tk*Math.log(r)/1000;
   return [T(`${nf(n)} mol ideell gass ekspanderer isotermt ved ${Tk} K til ${r} ganger volumet. Hvor mye arbeid gjør gassen?`,`${nf(n)} mol of ideal gas expands isothermally at ${Tk} K to ${r} times its initial volume. How much work does the gas do?`),{n:W,tol:rel(W,0.02),u:"kJ"},T(`$W = nRT\\ln(V_2/V_1) = ${mf(n)}\\cdot 8{,}314\\cdot ${Tk}\\cdot\\ln ${r} \\approx ${mf(W)}$ kJ.`,`$W = nRT\\ln(V_2/V_1) = ${mf(n)}\\cdot 8.314\\cdot ${Tk}\\cdot\\ln ${r} \\approx ${mf(W)}$ kJ.`)]; }
);
GEN("MATS2100",1,
 ()=>{ const mat=R.p([["vann",4.18],["aluminium",0.90],["stål",0.46],["kobber",0.385]]); const m=R.f(0.5,10,0.5), dT=R.i(10,80); const Q=m*mat[1]*dT;
   const EN={"vann":"water","aluminium":"aluminum","stål":"steel","kobber":"copper"};
   return [T(`Hvor mye varme trengs for å varme ${nf(m)} kg ${mat[0]} ${dT} K? ($c = ${mf(mat[1],3)}$ kJ/(kg·K))`,`How much heat is needed to raise the temperature of ${nf(m)} kg of ${EN[mat[0]]} by ${dT} K? ($c = ${mf(mat[1],3)}$ kJ/(kg·K))`),{n:Q,tol:rel(Q),u:"kJ"},`$Q = mc\\Delta T = ${mf(m)}\\cdot ${mf(mat[1],3)}\\cdot ${dT} \\approx ${mf(Q,1)}$ kJ.`]; },
 ()=>{ const Th=R.p([400,500,600,700,800,900,1000]), Tc=R.p([280,290,300,320,350]); const e=(1-Tc/Th)*100;
   return [T(`En Carnot-maskin arbeider mellom ${Th} K og ${Tc} K. Hva er virkningsgraden?`,`A Carnot engine operates between ${Th} K and ${Tc} K. What is the efficiency?`),{n:e,tol:0.3,u:"%"},`$\\eta = 1 - ${Tc}/${Th} \\approx ${mf(e,1)}$ %.`]; },
 ()=>{ const tH=R.p([35,40,45,50,55]), tC=R.p([-10,-5,0,5,10]); const TH=tH+273.15, TC=tC+273.15, cop=TH/(TH-TC);
   return [T(`Hva er den teoretiske (Carnot) COP for en varmepumpe som henter varme ved ${nf(tC)} °C og leverer ved ${tH} °C?`,`What is the theoretical (Carnot) COP of a heat pump that extracts heat at ${nf(tC)} °C and delivers it at ${tH} °C?`),{n:cop,tol:rel(cop),u:""},T(`$COP = T_H/(T_H - T_C) = ${mf(TH)}/${mf(TH-TC)} \\approx ${mf(cop)}$. Husk kelvin!`,`$COP = T_H/(T_H - T_C) = ${mf(TH)}/${mf(TH-TC)} \\approx ${mf(cop)}$. Remember to use kelvin!`)]; }
);
GEN("MATS2100",2,
 ()=>{ const W=R.f(0.5,5,0.5), cop=R.f(2,5,0.5), Q=W*cop;
   return [T(`En varmepumpe leverer ${nf(Q)} kW varme og bruker ${nf(W)} kW strøm. Hva er COP?`,`A heat pump delivers ${nf(Q)} kW of heat and uses ${nf(W)} kW of electricity. What is the COP?`),{n:cop,tol:0.02,u:""},`$COP = Q_H/W = ${mf(Q)}/${mf(W)} = ${mf(cop)}$.`]; },
 ()=>{ const QH=R.i(50,500), eta=R.f(0.2,0.45,0.05), W=QH*eta, QC=QH-W;
   return [T(`En varmekraftmaskin tar opp ${QH} kJ varme og avgir ${nf(QC,1)} kJ til kald side. Hva er virkningsgraden?`,`A heat engine absorbs ${QH} kJ of heat and rejects ${nf(QC,1)} kJ to the cold side. What is the efficiency?`),{n:eta*100,tol:0.3,u:"%"},T(`$W = Q_H - Q_C = ${mf(W,1)}$ kJ, så $\\eta = W/Q_H = ${mf(eta*100,1)}$ %.`,`$W = Q_H - Q_C = ${mf(W,1)}$ kJ, so $\\eta = W/Q_H = ${mf(eta*100,1)}$ %.`)]; }
);

// ================= MEK1400 Fysikk =================
GEN("MEK1400",0,
 ()=>{ const k=R.p([50,100,200,400,500,800]), m=R.p([0.2,0.5,1,2,4,5]); const w=Math.sqrt(k/m);
   return [T(`En fjær med $k = ${k}$ N/m bærer en masse på ${nf(m)} kg. Hva er vinkelfrekvensen?`,`A spring with $k = ${k}$ N/m carries a mass of ${nf(m)} kg. What is the angular frequency?`),{n:w,tol:rel(w),u:"rad/s"},`$\\omega = \\sqrt{k/m} = \\sqrt{${mf(k/m)}} \\approx ${mf(w)}$ rad/s.`]; },
 ()=>{ const L=R.f(0.2,3,0.1), Tp=2*Math.PI*Math.sqrt(L/G_);
   return [T(`Hva er perioden til en pendel med lengde ${nf(L)} m? ($g = 9{,}81$, små utslag)`,`What is the period of a pendulum of length ${nf(L)} m? ($g = 9.81$, small oscillations)`),{n:Tp,tol:rel(Tp),u:"s"},T(`$T = 2\\pi\\sqrt{L/g} = 2\\pi\\sqrt{${mf(L)}/9{,}81} \\approx ${mf(Tp)}$ s.`,`$T = 2\\pi\\sqrt{L/g} = 2\\pi\\sqrt{${mf(L)}/9.81} \\approx ${mf(Tp)}$ s.`)]; },
 ()=>{ const f=R.p([20,50,100,200,440,1000]), v=R.p([340,1480,5000,100]), lam=v/f;
   return [T(`En bølge med frekvens ${f} Hz går med farten ${v} m/s. Hva er bølgelengden?`,`A wave with a frequency of ${f} Hz travels at ${v} m/s. What is the wavelength?`),{n:lam,tol:rel(lam),u:"m"},`$\\lambda = v/f = ${v}/${f} \\approx ${mf(lam,3)}$ m.`]; }
);
GEN("MEK1400",1,
 ()=>{ const q1=R.i(1,9), q2=R.i(1,9), r=R.f(0.1,2,0.1); const F=8.99e9*q1*1e-6*q2*1e-6/(r*r);
   return [T(`To punktladninger på ${q1} µC og ${q2} µC står ${nf(r)} m fra hverandre. Hvor stor er kraften? ($k = 8{,}99\\cdot10^9$)`,`Two point charges of ${q1} µC and ${q2} µC are ${nf(r)} m apart. What is the force between them? ($k = 8.99\\cdot10^9$)`),{n:F,tol:rel(F),u:"N"},T(`$F = kq_1q_2/r^2 = 8{,}99\\cdot10^9\\cdot ${q1*q2}\\cdot10^{-12}/${mf(r*r)} \\approx ${mf(F,3)}$ N.`,`$F = kq_1q_2/r^2 = 8.99\\cdot10^9\\cdot ${q1*q2}\\cdot10^{-12}/${mf(r*r)} \\approx ${mf(F,3)}$ N.`)]; },
 ()=>{ const q=R.i(1,10), v=R.p([100,200,500,1000,2000]), B=R.f(0.1,2,0.1); const F=q*1e-6*v*B*1000;
   return [T(`En partikkel med ladning ${q} µC beveger seg med ${v} m/s vinkelrett på et magnetfelt på ${nf(B)} T. Hvor stor er kraften, i mN?`,`A particle with a charge of ${q} µC moves at ${v} m/s perpendicular to a magnetic field of ${nf(B)} T. What is the force, in mN?`),{n:F,tol:rel(F),u:"mN"},`$F = qvB = ${q}\\cdot10^{-6}\\cdot ${v}\\cdot ${mf(B)} \\approx ${mf(F,3)}$ mN.`]; }
);
GEN("MEK1400",2,
 ()=>{ const m=R.i(1,80), h=R.f(0.5,20,0.5), W=m*G_*h;
   return [T(`Hvor mye arbeid kreves for å løfte ${m} kg ${nf(h)} m rett opp? ($g = 9{,}81$)`,`How much work is required to lift ${m} kg straight up by ${nf(h)} m? ($g = 9.81$)`),{n:W,tol:rel(W),u:"J"},T(`$W = mgh = ${m}\\cdot 9{,}81\\cdot ${mf(h)} \\approx ${mf(W,1)}$ J.`,`$W = mgh = ${m}\\cdot 9.81\\cdot ${mf(h)} \\approx ${mf(W,1)}$ J.`)]; },
 ()=>{ const W=R.i(100,5000), t=R.i(2,120), P=W/t;
   return [T(`En motor utfører ${W} J arbeid på ${t} s. Hva er gjennomsnittseffekten?`,`A motor does ${W} J of work in ${t} s. What is the average power?`),{n:P,tol:rel(P),u:"W"},`$P = W/t = ${W}/${t} \\approx ${mf(P,1)}$ W.`]; },
 ()=>{ const f=R.p([4,4.5,5,5.5,6,6.5,7,7.5]); const lam=3e8/(f*1e14)*1e9;
   return [T(`Lys har frekvensen $${mf(f,1)}\\cdot 10^{14}$ Hz. Hva er bølgelengden? ($c = 3\\cdot10^8$ m/s)`,`Light has a frequency of $${mf(f,1)}\\cdot 10^{14}$ Hz. What is the wavelength? ($c = 3\\cdot10^8$ m/s)`),{n:lam,tol:rel(lam),u:"nm"},`$\\lambda = c/f \\approx ${mf(lam,0)}$ nm.`]; },
 ()=>{ const M=R.f(1,20,1), Rr=R.f(0.1,0.5,0.05), w=R.i(5,60); const E=0.5*(0.5*M*Rr*Rr)*w*w;
   return [T(`En massiv sylinder ($M = ${mf(M)}$ kg, $R = ${mf(Rr)}$ m) roterer om aksen med ${w} rad/s. Hva er rotasjonsenergien?`,`A solid cylinder ($M = ${mf(M)}$ kg, $R = ${mf(Rr)}$ m) rotates about its axis at ${w} rad/s. What is the rotational kinetic energy?`),{n:E,tol:rel(E),u:"J"},T(`$I = \\tfrac12MR^2 = ${mf(0.5*M*Rr*Rr,4)}$ kg·m², og $E = \\tfrac12I\\omega^2 \\approx ${mf(E,1)}$ J.`,`$I = \\tfrac12MR^2 = ${mf(0.5*M*Rr*Rr,4)}$ kg·m², and $E = \\tfrac12I\\omega^2 \\approx ${mf(E,1)}$ J.`)]; }
);

// ================= ELPE1300 Elektriske kretser =================
GEN("ELPE1300",0,
 ()=>{ const U=R.p([5,9,12,24,48,230]), Rr=R.p([2,4,5,10,22,47,100,220,470,1000]); const I=U/Rr;
   return [T(`${U} V ligger over en motstand på ${Rr} Ω. Hvor stor er strømmen?`,`A voltage of ${U} V is applied across a ${Rr} Ω resistor. What is the current?`),{n:I,tol:rel(I),u:"A"},`$I = U/R = ${U}/${Rr} \\approx ${mf(I,3)}$ A.`]; },
 ()=>{ const a=R.p([10,22,47,100,220,330,470]), b=R.p([10,22,47,68,100,150,220]); const p=a*b/(a+b);
   return [T(`To motstander på ${a} Ω og ${b} Ω kobles i parallell. Hva er den totale motstanden?`,`Two resistors of ${a} Ω and ${b} Ω are connected in parallel. What is the total resistance?`),{n:p,tol:rel(p),u:"Ω"},`$R = \\dfrac{R_1R_2}{R_1+R_2} = \\dfrac{${a*b}}{${a+b}} \\approx ${mf(p,1)}$ Ω.`]; },
 ()=>{ const r=R.distinct(3,1,12).map(x=>x*R.p([1,10])), s=r.reduce((x,y)=>x+y,0);
   return [T(`Motstander på ${r.join(" Ω, ")} Ω kobles i serie. Hva er den totale motstanden?`,`Resistors of ${r.join(" Ω, ")} Ω are connected in series. What is the total resistance?`),{n:s,tol:0.01,u:"Ω"},T(`I serie legges motstandene sammen: ${s} Ω.`,`In series, the resistances add up: ${s} Ω.`)]; },
 ()=>{ const U=R.p([5,10,12,15,24]), r1=R.p([1,2,3,4,5,10]), r2=R.p([1,2,3,4,5,10]); const u2=U*r2/(r1+r2);
   return [T(`Spenningsdeler: ${U} V over $R_1 = ${r1}$ kΩ og $R_2 = ${r2}$ kΩ i serie. Hva er spenningen over $R_2$?`,`Voltage divider: ${U} V across $R_1 = ${r1}$ kΩ and $R_2 = ${r2}$ kΩ in series. What is the voltage across $R_2$?`),{n:u2,tol:rel(u2),u:"V"},`$U_2 = U\\dfrac{R_2}{R_1+R_2} = ${U}\\cdot\\dfrac{${r2}}{${r1+r2}} \\approx ${mf(u2)}$ V.`]; },
 ()=>{ const I=R.f(0.1,5,0.1), Rr=R.p([2,5,10,22,47,100]); const P=I*I*Rr;
   return [T(`En motstand på ${Rr} Ω fører ${nf(I)} A. Hvor stor effekt avsettes?`,`A ${Rr} Ω resistor carries ${nf(I)} A. How much power is dissipated?`),{n:P,tol:rel(P),u:"W"},`$P = RI^2 = ${Rr}\\cdot ${mf(I)}^2 \\approx ${mf(P)}$ W.`]; }
);
GEN("ELPE1300",1,
 ()=>{ const Rk=R.p([1,2.2,4.7,10,22,47,100]), C=R.p([1,10,22,47,100,220,470]); const tau=Rk*1e3*C*1e-6;
   return [T(`Hva er tidskonstanten for en RC-krets med $R = ${mf(Rk,1)}$ kΩ og $C = ${C}$ µF, i millisekunder?`,`What is the time constant of an RC circuit with $R = ${mf(Rk,1)}$ kΩ and $C = ${C}$ µF, in milliseconds?`),{n:tau*1000,tol:rel(tau*1000),u:"ms"},`$\\tau = RC = ${mf(Rk*1e3,0)}\\cdot ${C}\\cdot10^{-6} \\approx ${mf(tau*1000,2)}$ ms.`]; },
 ()=>{ const U=R.p([5,10,12,24]), k=R.p([1,2,3,5]); const u=U*(1-Math.exp(-k));
   return [T(`En kondensator lades fra 0 V mot ${U} V gjennom en motstand. Hvor høy er spenningen etter ${k} ${k===1?"tidskonstant":"tidskonstanter"}?`,`A capacitor is charged from 0 V toward ${U} V through a resistor. What is the voltage after ${k} ${k===1?"time constant":"time constants"}?`),{n:u,tol:rel(u),u:"V"},`$u = U(1 - e^{-t/\\tau}) = ${U}(1 - e^{-${k}}) \\approx ${mf(u)}$ V.`]; },
 ()=>{ const C=R.p([10,100,470,1000,2200]), U=R.p([5,12,24,50,400]); const E=0.5*C*1e-6*U*U;
   return [T(`Hvor mye energi er lagret i en kondensator på ${C} µF ladet til ${U} V?`,`How much energy is stored in a ${C} µF capacitor charged to ${U} V?`),{n:E,tol:rel(E),u:"J"},`$E = \\tfrac12CU^2 = \\tfrac12\\cdot ${C}\\cdot10^{-6}\\cdot ${U}^2 \\approx ${mf(E,4)}$ J.`]; }
);
GEN("ELPE1300",2,
 ()=>{ const f=R.p([50,60,100,400,1000]), C=R.p([1,10,22,47,100]); const X=1/(2*Math.PI*f*C*1e-6);
   return [T(`Hva er reaktansen til en kondensator på ${C} µF ved ${f} Hz?`,`What is the reactance of a ${C} µF capacitor at ${f} Hz?`),{n:X,tol:rel(X),u:"Ω"},`$X_C = \\dfrac{1}{2\\pi fC} \\approx ${mf(X,1)}$ Ω.`]; },
 ()=>{ const f=R.p([50,60,100,1000]), L=R.p([10,50,100,200,500]); const X=2*Math.PI*f*L/1000;
   return [T(`Hva er reaktansen til en spole på ${L} mH ved ${f} Hz?`,`What is the reactance of a ${L} mH inductor at ${f} Hz?`),{n:X,tol:rel(X),u:"Ω"},`$X_L = 2\\pi fL = 2\\pi\\cdot ${f}\\cdot ${mf(L/1000,3)} \\approx ${mf(X,1)}$ Ω.`]; },
 ()=>{ const up=R.f(10,400,5), dir=R.p(["p2r","r2p"]);
   if(dir==="p2r"){ const r=up/Math.SQRT2; return [T(`En sinusspenning har toppverdi ${nf(up)} V. Hva er RMS-verdien?`,`A sinusoidal voltage has a peak value of ${nf(up)} V. What is the RMS value?`),{n:r,tol:rel(r),u:"V"},`$U_{rms} = U_p/\\sqrt2 \\approx ${mf(r,1)}$ V.`]; }
   const p=up*Math.SQRT2; return [T(`En sinusspenning har RMS-verdi ${nf(up)} V. Hva er toppverdien?`,`A sinusoidal voltage has an RMS value of ${nf(up)} V. What is the peak value?`),{n:p,tol:rel(p),u:"V"},`$U_p = \\sqrt2\\,U_{rms} \\approx ${mf(p,1)}$ V.`]; },
 ()=>{ const t=R.p([[3,4],[6,8],[5,12],[8,15],[9,12],[12,16],[20,21]]), s=R.p([1,10]); const Rr=t[0]*s, X=t[1]*s, Z=Math.hypot(Rr,X);
   return [T(`En seriekrets har $R = ${Rr}$ Ω og $X = ${X}$ Ω. Hva er impedansens absoluttverdi $|Z|$?`,`A series circuit has $R = ${Rr}$ Ω and $X = ${X}$ Ω. What is the magnitude of the impedance $|Z|$?`),{n:Z,tol:rel(Z),u:"Ω"},`$|Z| = \\sqrt{R^2 + X^2} = \\sqrt{${Rr*Rr} + ${X*X}} = ${mf(Z)}$ Ω.`]; }
);

// ================= MEK1000 Matematikk 1000 =================
GEN("MEK1000",0,
 ()=>{ const a=R.i(1,5), b=R.p([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c=R.p([-9,-7,-5,-3,-2,-1,1,2,3,4,6,8]), x=R.i(-3,3); const d=3*a*x*x+2*b*x+c;
   return [T(`$f(x) = ${cf(a)}x^3 ${b<0?"-":"+"} ${cf(Math.abs(b))}x^2 ${c<0?"-":"+"} ${cf(Math.abs(c))}x$. Hva er $f'(${x})$?`,`$f(x) = ${cf(a)}x^3 ${b<0?"-":"+"} ${cf(Math.abs(b))}x^2 ${c<0?"-":"+"} ${cf(Math.abs(c))}x$. What is $f'(${x})$?`),{n:d,tol:0.01,u:""},T(`$f'(x) = ${3*a}x^2 ${2*b<0?"-":"+"} ${Math.abs(2*b)}x ${c<0?"-":"+"} ${Math.abs(c)}$, så $f'(${x}) = ${d}$.`,`$f'(x) = ${3*a}x^2 ${2*b<0?"-":"+"} ${Math.abs(2*b)}x ${c<0?"-":"+"} ${Math.abs(c)}$, so $f'(${x}) = ${d}$.`)]; },
 ()=>{ const a=R.i(1,5), x0=R.p([-5,-4,-3,-2,-1,1,2,3,4,5]); const b=-2*a*x0; const cc=R.i(-9,9);
   return [T(`$f(x) = ${a===1?"":a}x^2 ${b<0?"-":"+"} ${Math.abs(b)}x ${cc<0?"-":"+"} ${Math.abs(cc)}$. For hvilken $x$ har $f$ bunnpunkt?`,`$f(x) = ${a===1?"":a}x^2 ${b<0?"-":"+"} ${Math.abs(b)}x ${cc<0?"-":"+"} ${Math.abs(cc)}$. For which $x$ does $f$ have its minimum?`),{n:x0,tol:0.01,u:""},T(`$f'(x) = ${2*a}x ${b<0?"-":"+"} ${Math.abs(b)} = 0$ gir $x = ${x0}$.`,`$f'(x) = ${2*a}x ${b<0?"-":"+"} ${Math.abs(b)} = 0$ gives $x = ${x0}$.`)]; },
 ()=>{ const k=R.i(2,7), fn=R.p(["sin","cos","e"]);
   if(fn==="e") return [`$\\dfrac{d}{dx}e^{${k}x} = $`,[`$${k}e^{${k}x}$`,`$e^{${k}x}$`,`$${k}xe^{${k}x-1}$`,`$e^{${k}x}/${k}$`],T(`Kjerneregelen gir en faktor ${k} fra den indre funksjonen.`,`The chain rule gives a factor of ${k} from the inner function.`)];
   if(fn==="sin") return [`$\\dfrac{d}{dx}\\sin(${k}x) = $`,[`$${k}\\cos(${k}x)$`,`$\\cos(${k}x)$`,`$-${k}\\cos(${k}x)$`,`$${k}\\sin(${k}x)$`],T(`Kjerneregelen: den ytre deriverte er cos, og den indre deriverte er ${k}.`,`The chain rule: the outer derivative is cos, and the inner derivative is ${k}.`)];
   return [`$\\dfrac{d}{dx}\\cos(${k}x) = $`,[`$-${k}\\sin(${k}x)$`,`$${k}\\sin(${k}x)$`,`$-\\sin(${k}x)$`,`$${k}\\cos(${k}x)$`],T(`$(\\cos u)' = -\\sin u\\cdot u'$, med $u' = ${k}$.`,`$(\\cos u)' = -\\sin u\\cdot u'$, with $u' = ${k}$.`)]; }
);
GEN("MEK1000",1,
 ()=>{ const a=R.i(1,6), c=R.i(1,8), b=R.i(1,4); const v=a*b**3/3+c*b;
   return [`$\\displaystyle\\int_0^{${b}} (${a===1?"":a}x^2 + ${c})\\,dx = $`,{n:v,tol:rel(v,0.005,0.01),u:""},`$\\left[\\tfrac{${a}}{3}x^3 + ${c}x\\right]_0^{${b}} = ${mf(a*b**3/3,3)} + ${c*b} \\approx ${mf(v,3)}$.`]; },
 ()=>{ const a=R.i(1,9), n=R.i(1,4);
   return [`$\\displaystyle\\int_1^{e^{${n}}} \\frac{${a}}{x}\\,dx = $`,{n:a*n,tol:0.01,u:""},`$${a}[\\ln x]_1^{e^{${n}}} = ${a}(${n} - 0) = ${a*n}$.`]; },
 ()=>{ const k=R.i(1,4), A=R.i(1,6);
   return [`$\\displaystyle\\int_0^{\\pi/${k}} ${A===1?"":A}\\sin(${k}x)\\,dx = $`,{n:2*A/k,tol:0.01,u:""},`$\\left[-\\tfrac{${A}}{${k}}\\cos(${k}x)\\right]_0^{\\pi/${k}} = \\tfrac{${A}}{${k}}(1 - (-1)) = ${mf(2*A/k,3)}$.`]; }
);
GEN("MEK1000",2,
 ()=>{ const t=R.p([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[7,24,25],[9,40,41]]); const sa=R.p([1,-1]), sb=R.p([1,-1]);
   return [`$|${sa*t[0]} ${sb<0?"-":"+"} ${t[1]}i| = $`,{n:t[2],tol:0.01,u:""},`$\\sqrt{${t[0]}^2 + ${t[1]}^2} = \\sqrt{${t[2]**2}} = ${t[2]}$.`]; },
 ()=>{ const a=R.i(-5,5), b=R.i(-5,5), c=R.i(-5,5), d=R.i(-5,5); const re=a*c-b*d;
   const z=(p,q)=>q===0?`${p}`:`${p}${q<0?"-":"+"}${Math.abs(q)===1?"":Math.abs(q)}i`;
   return [T(`Hva er realdelen av $(${z(a,b)})(${z(c,d)})$?`,`What is the real part of $(${z(a,b)})(${z(c,d)})$?`),{n:re,tol:0,u:""},T(`Realdelen er $ac - bd = ${a}\\cdot ${c} - (${b})(${d}) = ${re}$, fordi $i^2 = -1$.`,`The real part is $ac - bd = ${a}\\cdot ${c} - (${b})(${d}) = ${re}$, because $i^2 = -1$.`)]; },
 ()=>{ const a=R.i(1,9), b=R.i(1,9), p=R.p([-9,-7,-4,-2,-1,1,2,3,5,8]), q=R.p([-9,-6,-3,-1,1,2,4,7]); const v=a/b;
   return [`$\\displaystyle\\lim_{x\\to\\infty}\\frac{${cf(a)}x^2 ${p<0?"-":"+"} ${cf(Math.abs(p))}x}{${cf(b)}x^2 ${q<0?"-":"+"} ${Math.abs(q)}} = $`,{n:v,tol:0.01,u:""},T(`Del teller og nevner på $x^2$. Bare de ledende koeffisientene blir igjen: $${a}/${b} \\approx ${mf(v,3)}$.`,`Divide the numerator and denominator by $x^2$. Only the leading coefficients remain: $${a}/${b} \\approx ${mf(v,3)}$.`)]; }
);

