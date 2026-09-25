// Nye fag basert på vanlige emner ved NMBU, NTNU og OsloMet
const SIGMA_SB = 5.67e-8;
COURSES.push(

// ================= Fasthetslære =================
{ code:"FAST", name:"Fasthetslære", group:"Mekanikk og konstruksjon", isNew:true, also:"NMBU TBM120 · NTNU TKT4116", units:[
 { title:"Spenning og tøyning", qs:[
  ["Hva er Poissons tall $\\nu$?",["Forholdet mellom tverrkontraksjon og lengdetøyning: $\\nu = -\\varepsilon_{tverr}/\\varepsilon_{lengde}$","Forholdet mellom spenning og tøyning","Forholdet mellom skjær- og normalspenning","Flytegrensen delt på strekkfastheten"],"For stål er $\\nu \\approx 0{,}3$."],
  ["En stav er fastholdt i begge ender og varmes opp. Hva skjer?",["Det oppstår trykkspenning $\\sigma = E\\alpha\\Delta T$","Den blir lengre uten spenning","Det oppstår strekkspenning","Ingenting"],"Den vil utvide seg, men blir hindret."],
  ["Hva sier St. Venants prinsipp?",["Langt fra lastinnføringen avhenger spenningsfordelingen bare av resultanten, ikke av hvordan lasten påføres","Spenningen er alltid jevnt fordelt","Tøyning er proporsjonal med spenning","Materialet er isotropt"],"«Langt» betyr typisk omtrent én tverrsnittsbredde."],
  ["Hva er en spenningskonsentrasjonsfaktor $K_t$?",["Forholdet mellom maksimal lokal spenning og nominell spenning ved et hull eller en kjerv","Sikkerhetsfaktoren","Forholdet mellom $R_m$ og $R_e$","E-modulen delt på G-modulen"],"For et lite sirkulært hull i en stor plate er $K_t \\approx 3$."],
  ["Hvordan henger $E$, $G$ og $\\nu$ sammen for isotrope materialer?",["$G = \\dfrac{E}{2(1+\\nu)}$","$G = E(1+\\nu)$","$G = E/\\nu$","$G = 2E$"],"For stål: $210/(2\\cdot 1{,}3) \\approx 81$ GPa."]
 ], gen:[
  ()=>{ const F=R.f(5,100,5), L=R.p([0.5,1,2,3]), d=R.p([10,12,16,20,25]), E=R.p([70,210]); const A=Math.PI*d*d/4, dl=F*1e3*L*1e3/(A*E*1e3);
    return [T(`En rund stav (${E===210?"stål":"aluminium"}, $E = ${E}$ GPa) med diameter ${d} mm og lengde ${nf(L)} m belastes med ${nf(F)} kN strekk. Hvor mye forlenges den?`,`A round bar (${E===210?"steel":"aluminum"}, $E = ${E}$ GPa) with diameter ${d} mm and length ${nf(L)} m is loaded with ${nf(F)} kN in tension. How much does it elongate?`),{n:dl,tol:rel(dl),u:"mm"},T(`$\\delta = \\dfrac{FL}{AE}$, med $A = ${mf(A,1)}$ mm², gir $\\delta \\approx ${mf(dl,3)}$ mm.`,`$\\delta = \\dfrac{FL}{AE}$, with $A = ${mf(A,1)}$ mm², gives $\\delta \\approx ${mf(dl,3)}$ mm.`)]; },
  ()=>{ const dT=R.i(10,80), m=R.p([["stål",210,12],["aluminium",70,23]]); const s=m[1]*1e3*m[2]*1e-6*dT;
    return [T(`En ${m[0]}stav ($E = ${m[1]}$ GPa, $\\alpha = ${m[2]}\\cdot10^{-6}$/K) er fastholdt i begge ender og varmes ${dT} K. Hvor stor blir trykkspenningen?`,`${m[0]==="stål"?"A steel":"An aluminum"} bar ($E = ${m[1]}$ GPa, $\\alpha = ${m[2]}\\cdot10^{-6}$/K) is fixed at both ends and heated by ${dT} K. How large is the resulting compressive stress?`),{n:s,tol:rel(s),u:"MPa"},`$\\sigma = E\\alpha\\Delta T = ${m[1]*1000}\\cdot ${m[2]}\\cdot10^{-6}\\cdot ${dT} \\approx ${mf(s,1)}$ MPa.`]; },
  ()=>{ const e=R.p([0.5,1,1.5,2]), nu=R.p([0.3,0.33,0.25]); const v=nu*e;
    return [T(`En stav har lengdetøyning ${nf(e)} ‰ i strekk og $\\nu = ${mf(nu)}$. Hvor stor er tverrkontraksjonen, i promille?`,`A bar in tension has an axial strain of ${nf(e)} ‰ and $\\nu = ${mf(nu)}$. What is the lateral contraction, in per mille?`),{n:v,tol:rel(v),u:"‰"},T(`$|\\varepsilon_{tverr}| = \\nu\\varepsilon = ${mf(nu)}\\cdot ${mf(e)} = ${mf(v,3)}$ ‰.`,`$|\\varepsilon_{lat}| = \\nu\\varepsilon = ${mf(nu)}\\cdot ${mf(e)} = ${mf(v,3)}$ ‰.`)]; }
 ]},
 { title:"Torsjon og bøyning", qs:[
  ["Hvordan er skjærspenningen fordelt over et sirkulært tverrsnitt i torsjon?",["Lineært, null i sentrum og størst i overflaten","Jevnt fordelt","Størst i sentrum","Parabolsk med null i overflaten"],"$\\tau = Tr/J$."],
  ["Hva er det polare arealtreghetsmomentet for en massiv sirkulær aksel?",["$J = \\pi d^4/32$","$J = \\pi d^4/64$","$J = \\pi d^3/16$","$J = \\pi d^2/4$"],"$\\pi d^4/64$ er $I$ om en diameter, og $J = 2I$."],
  ["Hvorfor er hule aksler ofte gunstige?",["Materialet i sentrum bidrar lite til $J$, så hule aksler gir mye stivhet per kilo","De er alltid billigere","De tåler høyere temperatur","De har ingen skjærspenning"],"Mest mulig materiale bør ligge langt fra sentrum."],
  ["Hvordan beregnes vridningsvinkelen for en aksel?",["$\\theta = \\dfrac{TL}{GJ}$","$\\theta = \\dfrac{TJ}{GL}$","$\\theta = \\dfrac{GJ}{TL}$","$\\theta = TLGJ$"],"$\\theta$ blir i radianer."],
  ["Hva er bøyespenningen i avstand $y$ fra nøytralaksen?",["$\\sigma = My/I$","$\\sigma = MI/y$","$\\sigma = M/(yI)$","$\\sigma = Iy/M$"],"Naviers formel."]
 ], gen:[
  ()=>{ const Tq=R.p([100,200,500,1000]), L=R.p([0.5,1,2]), d=R.p([20,30,40,50]); const J=Math.PI*d**4/32, th=Tq*1e3*L*1e3/(80e3*J)*180/Math.PI;
    return [T(`En stålaksel ($G = 80$ GPa) med diameter ${d} mm og lengde ${nf(L)} m overfører ${Tq} Nm. Hvor stor er vridningsvinkelen, i grader?`,`A steel shaft ($G = 80$ GPa) with diameter ${d} mm and length ${nf(L)} m transmits ${Tq} Nm. What is the angle of twist, in degrees?`),{n:th,tol:rel(th,0.015),u:"°"},T(`$J = \\pi d^4/32 \\approx ${mf(J,0)}$ mm⁴, og $\\theta = TL/(GJ) \\approx ${mf(th*Math.PI/180,5)}$ rad $\\approx ${mf(th,3)}^\\circ$.`,`$J = \\pi d^4/32 \\approx ${mf(J,0)}$ mm⁴, and $\\theta = TL/(GJ) \\approx ${mf(th*Math.PI/180,5)}$ rad $\\approx ${mf(th,3)}^\\circ$.`)]; },
  ()=>{ const d=R.p([10,20,25,30,40,50]); const J=Math.PI*d**4/32; return [T(`Hva er $J$ for en massiv aksel med diameter ${d} mm, i mm⁴?`,`What is $J$ for a solid shaft with diameter ${d} mm, in mm⁴?`),{n:J,tol:rel(J),u:"mm⁴"},`$J = \\pi\\cdot ${d}^4/32 \\approx ${mf(J,0)}$ mm⁴.`]; },
  ()=>{ const M=R.f(0.5,20,0.5), y=R.p([50,75,100,150]), I=R.p([10,20,50,100]); const s=M*1e6*y/(I*1e6);
    return [T(`En bjelke har $I = ${I}\\cdot10^6$ mm⁴ og bøyemoment ${nf(M)} kNm. Hva er bøyespenningen ${y} mm fra nøytralaksen?`,`A beam has $I = ${I}\\cdot10^6$ mm⁴ and a bending moment of ${nf(M)} kNm. What is the bending stress ${y} mm from the neutral axis?`),{n:s,tol:rel(s),u:"MPa"},`$\\sigma = My/I = ${mf(M*1e6,0)}\\cdot ${y}/(${I}\\cdot10^6) \\approx ${mf(s,2)}$ MPa.`]; }
 ]},
 { title:"Spenningstransformasjon og knekking", qs:[
  ["Hva kjennetegner hovedspenningene?",["Skjærspenningen er null i de retningene","De er alltid like store","De virker bare i trykk","De er lik von Mises-spenningen"],"De er største og minste normalspenning."],
  ["Hvor ligger sentrum i Mohrs sirkel for plan spenning?",["I $(\\sigma_x + \\sigma_y)/2$","I $\\sigma_x$","I origo","I $\\tau_{xy}$"],"Radien er $\\sqrt{((\\sigma_x - \\sigma_y)/2)^2 + \\tau_{xy}^2}$."],
  ["Hva er von Mises-kriteriet?",["Flyt inntreffer når den ekvivalente spenningen (fra deviatorisk energi) når flytegrensen","Brudd inntreffer ved største normalspenning","Knekking inntreffer ved $P_{cr}$","Materialet er sprøtt"],"Det brukes mest for duktile materialer."],
  ["Hvordan påvirker lengden Eulers knekklast?",["$P_{cr} \\propto 1/L^2$","$P_{cr} \\propto L$","$P_{cr} \\propto 1/L$","Lengden spiller ingen rolle"],"Dobbel lengde gir en firedel av knekklasten."],
  ["Hva er den effektive knekklengden for en søyle som er innspent i foten og fri i toppen?",["$2L$","$L$","$0{,}7L$","$0{,}5L$"],"Leddet i begge ender gir $L$, og innspent i begge ender gir $0{,}5L$."]
 ], gen:[
  ()=>{ const sx=R.i(-8,12)*10, sy=R.i(-8,12)*10, t=R.i(-6,6)*10; const c=(sx+sy)/2, r=Math.hypot((sx-sy)/2,t); const Q=R.p(["s1","s2","tmax"]); const v=Q==="s1"?c+r:Q==="s2"?c-r:r;
    return [T(`Plan spenning: $\\sigma_x = ${sx}$ MPa, $\\sigma_y = ${sy}$ MPa og $\\tau_{xy} = ${t}$ MPa. Hva er ${Q==="s1"?"største hovedspenning $\\sigma_1$":Q==="s2"?"minste hovedspenning $\\sigma_2$":"største skjærspenning i planet"}?`,`Plane stress: $\\sigma_x = ${sx}$ MPa, $\\sigma_y = ${sy}$ MPa and $\\tau_{xy} = ${t}$ MPa. What is the ${Q==="s1"?"largest principal stress $\\sigma_1$":Q==="s2"?"smallest principal stress $\\sigma_2$":"maximum in-plane shear stress"}?`),{n:v,tol:rel(v,0.005,0.2),u:"MPa"},T(`Sentrum $= ${mf(c,1)}$ og radius $= \\sqrt{${mf(((sx-sy)/2)**2,1)} + ${t*t}} \\approx ${mf(r,2)}$. Da er $\\sigma_{1,2} = ${mf(c+r,2)},\\ ${mf(c-r,2)}$ og $\\tau_{maks} = ${mf(r,2)}$ MPa.`,`Center $= ${mf(c,1)}$ and radius $= \\sqrt{${mf(((sx-sy)/2)**2,1)} + ${t*t}} \\approx ${mf(r,2)}$. Then $\\sigma_{1,2} = ${mf(c+r,2)},\\ ${mf(c-r,2)}$ and $\\tau_{max} = ${mf(r,2)}$ MPa.`)]; },
  ()=>{ const s=R.i(50,250), t=R.i(20,120); const v=Math.sqrt(s*s+3*t*t);
    return [T(`Et punkt har normalspenning ${s} MPa og skjærspenning ${t} MPa. Hva er von Mises-spenningen?`,`A point has a normal stress of ${s} MPa and a shear stress of ${t} MPa. What is the von Mises stress?`),{n:v,tol:rel(v),u:"MPa"},`$\\sigma_v = \\sqrt{\\sigma^2 + 3\\tau^2} = \\sqrt{${s*s} + ${3*t*t}} \\approx ${mf(v,1)}$ MPa.`]; },
  ()=>{ const L=R.p([1,2,3,4]), K=R.p([[1,"leddet i begge ender","pinned at both ends"],[2,"innspent i foten og fri i toppen","fixed at the base and free at the top"],[0.5,"innspent i begge ender","fixed at both ends"]]), I=R.p([1e5,5e5,1e6,5e6]); const P=Math.PI**2*210e3*I/((K[0]*L*1e3)**2)/1e3;
    return [T(`En stålsøyle ($E = 210$ GPa, $I = ${mf(I/1e5)}\\cdot10^5$ mm⁴) er ${L} m lang og ${K[1]}. Hva er Eulers knekklast?`,`A steel column ($E = 210$ GPa, $I = ${mf(I/1e5)}\\cdot10^5$ mm⁴) is ${L} m long and ${K[2]}. What is the Euler buckling load?`),{n:P,tol:rel(P,0.015),u:"kN"},T(`$P_{cr} = \\dfrac{\\pi^2EI}{(KL)^2}$ med $K = ${mf(K[0],1)}$ gir $\\approx ${mf(P,1)}$ kN.`,`$P_{cr} = \\dfrac{\\pi^2EI}{(KL)^2}$ with $K = ${mf(K[0],1)}$ gives $\\approx ${mf(P,1)}$ kN.`)]; }
 ]}
]},

// ================= Fluidmekanikk =================
{ code:"FLUID", name:"Fluidmekanikk", group:"Energi og strømning", isNew:true, also:"NTNU TEP4100 · NMBU TPS200", units:[
 { title:"Hydrostatikk", qs:[
  ["Hva bestemmer trykket i en væske i ro?",["Bare dybden (og væskens tetthet)","Formen på beholderen","Volumet av væsken","Arealet av bunnen"],"$p = p_0 + \\rho gh$. Dette er det hydrostatiske paradokset."],
  ["Hva sier Arkimedes' prinsipp?",["Oppdriften er lik tyngden av fortrengt væske","Trykket er likt i alle retninger","Tyngden er lik massen","Oppdriften avhenger av dybden"],"$F_B = \\rho_{væske}gV_{fortrengt}$."],
  ["Hva er forskjellen på overtrykk og absolutt trykk?",["Overtrykk måles relativt til atmosfæretrykket","Absolutt trykk er alltid lavere","Det er det samme","Overtrykk gjelder bare gasser"],"$p_{abs} = p_{atm} + p_{over}$, der $p_{atm} \\approx 101{,}3$ kPa."],
  ["Hvorfor kan en hydraulisk presse gi stor kraft?",["Trykket er likt på begge stempler, så stort areal gir stor kraft","Væsken komprimeres","Væsken forsterker energien","Friksjonen hjelper til"],"$F_2 = F_1A_2/A_1$. Energien er bevart, så det lille stempelet må gå lenger."]
 ], gen:[
  ()=>{ const h=R.f(1,100,1), f=R.p([["ferskvann",1000,"fresh water"],["sjøvann",1025,"seawater"],["olje",880,"oil"]]); const p=f[1]*G_*h/1000;
    return [T(`Hva er overtrykket ${nf(h)} m under overflaten i ${f[0]} ($\\rho = ${f[1]}$ kg/m³)?`,`What is the gauge pressure ${nf(h)} m below the surface in ${f[2]} ($\\rho = ${f[1]}$ kg/m³)?`),{n:p,tol:rel(p),u:"kPa"},T(`$p = \\rho gh = ${f[1]}\\cdot 9{,}81\\cdot ${mf(h)} \\approx ${mf(p,1)}$ kPa.`,`$p = \\rho gh = ${f[1]}\\cdot 9.81\\cdot ${mf(h)} \\approx ${mf(p,1)}$ kPa.`)]; },
  ()=>{ const V=R.p([0.001,0.01,0.05,0.1,0.5]); const F=1000*G_*V; return [T(`Et legeme med volum ${nf(V*1000)} L er helt nedsenket i ferskvann. Hvor stor er oppdriften?`,`A body with a volume of ${nf(V*1000)} L is fully submerged in fresh water. What is the buoyant force?`),{n:F,tol:rel(F),u:"N"},T(`$F_B = \\rho gV = 1000\\cdot 9{,}81\\cdot ${mf(V,3)} \\approx ${mf(F,1)}$ N.`,`$F_B = \\rho gV = 1000\\cdot 9.81\\cdot ${mf(V,3)} \\approx ${mf(F,1)}$ N.`)]; },
  ()=>{ const F1=R.i(50,500), d1=R.p([10,20,25]), d2=R.p([100,150,200,250]); const F2=F1*(d2/d1)**2;
    return [T(`En hydraulisk presse har stempeldiametre ${d1} mm og ${d2} mm. Du trykker med ${F1} N på det lille. Hvor stor kraft gir det store?`,`A hydraulic press has piston diameters of ${d1} mm and ${d2} mm. You push with ${F1} N on the small piston. How large is the force from the large piston?`),{n:F2,tol:rel(F2),u:"N"},`$F_2 = F_1(d_2/d_1)^2 = ${F1}\\cdot ${mf((d2/d1)**2,2)} = ${mf(F2,0)}$ N.`]; },
  ()=>{ const h=R.f(1,30,1); const p=101.3+1000*G_*h/1000; return [T(`Hva er det absolutte trykket ${nf(h)} m under overflaten i ferskvann? ($p_{atm} = 101{,}3$ kPa)`,`What is the absolute pressure ${nf(h)} m below the surface in fresh water? ($p_{atm} = 101.3$ kPa)`),{n:p,tol:rel(p),u:"kPa"},T(`$p = 101{,}3 + ${mf(1000*G_*h/1000,1)} \\approx ${mf(p,1)}$ kPa.`,`$p = 101.3 + ${mf(1000*G_*h/1000,1)} \\approx ${mf(p,1)}$ kPa.`)]; }
 ]},
 { title:"Kontinuitet og Bernoulli", qs:[
  ["Hva sier kontinuitetsligningen for inkompressibel strømning i et rør?",["$A_1v_1 = A_2v_2$","$p_1 = p_2$","$v_1 = v_2$","$A_1p_1 = A_2p_2$"],"Volumstrømmen $Q$ er konstant."],
  ["Hvilke antakelser ligger bak Bernoullis ligning?",["Stasjonær, friksjonsfri og inkompressibel strømning langs en strømlinje","Turbulent strømning","Kompressibel gass","Strømning med pumpe"],"Tap og pumper legges til i den utvidede energiligningen."],
  ["Hva skjer med trykket der et rør snevres inn (venturi)?",["Det synker fordi farten øker","Det øker","Det er uendret","Det blir null"],"Venturimåleren utnytter dette til å måle strømning."],
  ["Hva er stagnasjonstrykk?",["Trykket der strømningen bremses helt til ro: $p + \\tfrac12\\rho v^2$","Trykket i en stillestående tank","Atmosfæretrykket","Trykket ved bunnen av et rør"],"Et pitotrør måler det."]
 ], gen:[
  ()=>{ const v1=R.f(0.5,5,0.5), d1=R.p([50,80,100,150]), d2=d1*R.p([0.5,0.6,0.75]); const v2=v1*(d1/d2)**2;
    return [T(`Vann strømmer med ${nf(v1)} m/s i et rør med diameter ${d1} mm, som snevres inn til ${d2} mm. Hva er farten i innsnevringen?`,`Water flows at ${nf(v1)} m/s in a pipe with diameter ${d1} mm, which narrows to ${d2} mm. What is the velocity in the constriction?`),{n:v2,tol:rel(v2),u:"m/s"},`$v_2 = v_1(d_1/d_2)^2 = ${mf(v1)}\\cdot ${mf((d1/d2)**2,3)} \\approx ${mf(v2,2)}$ m/s.`]; },
  ()=>{ const h=R.f(0.5,20,0.5); const v=Math.sqrt(2*G_*h); return [T(`Vann renner ut av et lite hull ${nf(h)} m under vannflaten i en stor tank. Hva er utløpsfarten?`,`Water flows out of a small hole ${nf(h)} m below the water surface in a large tank. What is the outflow velocity?`),{n:v,tol:rel(v),u:"m/s"},`Torricelli: $v = \\sqrt{2gh} \\approx ${mf(v,2)}$ m/s.`]; },
  ()=>{ const d=R.p([20,50,100,200]), v=R.f(0.5,4,0.5); const Q=Math.PI*(d/1000)**2/4*v*1000; return [T(`Hva er volumstrømmen i et rør med diameter ${d} mm når middelfarten er ${nf(v)} m/s?`,`What is the volumetric flow rate in a pipe with diameter ${d} mm when the mean velocity is ${nf(v)} m/s?`),{n:Q,tol:rel(Q),u:"L/s"},`$Q = Av = \\tfrac{\\pi}{4}\\cdot ${mf(d/1000,3)}^2\\cdot ${mf(v)} \\approx ${mf(Q,3)}$ L/s.`]; },
  ()=>{ const v1=R.f(1,4,0.5), v2=R.f(5,12,0.5); const dp=0.5*1000*(v2*v2-v1*v1)/1000; return [T(`Vann (1000 kg/m³) akselereres fra ${nf(v1)} m/s til ${nf(v2)} m/s i et horisontalt rør uten tap. Hvor mye faller trykket?`,`Water (1000 kg/m³) is accelerated from ${nf(v1)} m/s to ${nf(v2)} m/s in a horizontal pipe without losses. How much does the pressure drop?`),{n:dp,tol:rel(dp),u:"kPa"},`$p_1 - p_2 = \\tfrac12\\rho(v_2^2 - v_1^2) \\approx ${mf(dp,2)}$ kPa.`]; },
  ()=>{ const v=R.p([10,20,30,50]); const q=0.5*1.2*v*v; return [T(`Hva er det dynamiske trykket i luft ($\\rho = 1{,}2$ kg/m³) ved ${v} m/s?`,`What is the dynamic pressure in air ($\\rho = 1.2$ kg/m³) at ${v} m/s?`),{n:q,tol:rel(q),u:"Pa"},T(`$\\tfrac12\\rho v^2 = 0{,}6\\cdot ${v*v} = ${mf(q,0)}$ Pa.`,`$\\tfrac12\\rho v^2 = 0.6\\cdot ${v*v} = ${mf(q,0)}$ Pa.`)]; }
 ]},
 { title:"Rørstrømning og dimensjonsløse tall", qs:[
  ["Hva beskriver Reynoldstallet?",["Forholdet mellom treghetskrefter og viskøse krefter","Forholdet mellom trykk og tyngde","Varmeledning mot konveksjon","Farten delt på lydhastigheten"],"$Re = \\rho vD/\\mu$."],
  ["Omtrent under hvilket Reynoldstall er rørstrømning laminær?",["2300","230","23 000","1"],"Over ca. 4000 er den turbulent, og imellom er det et overgangsområde."],
  ["Hva er no-slip-betingelsen?",["Fluidet har samme fart som veggen der det er i kontakt med den","Fluidet glir fritt langs veggen","Trykket er null ved veggen","Farten er størst ved veggen"],"Den gir opphav til grensesjiktet."],
  ["Hva uttrykker Darcy–Weisbachs ligning?",["Friksjonstapet i et rør: $h_f = f\\dfrac{L}{D}\\dfrac{v^2}{2g}$","Kontinuitet","Oppdrift","Hydrostatisk trykk"],"For laminær strømning er $f = 64/Re$."],
  ["Hva skjer med trykktapet i et rør hvis farten dobles (ved omtrent konstant $f$)?",["Det firedobles","Det dobles","Det halveres","Det er uendret"],"$h_f \\propto v^2$."]
 ], gen:[
  ()=>{ const v=R.p([0.01,0.05,0.1,0.5,1,2]), D=R.p([10,25,50,100]); const Re=1000*v*D/1000/1e-3; const t=Re<2300?"Laminær":Re>4000?"Turbulent":"Overgangsområde";
    const EN={"Laminær":"Laminar","Turbulent":"Turbulent","Overgangsområde":"Transitional"};
    return [T(`Vann ($\\rho = 1000$ kg/m³, $\\mu = 10^{-3}$ Pa·s) strømmer med ${nf(v)} m/s i et rør med diameter ${D} mm. Hva slags strømning er det?`,`Water ($\\rho = 1000$ kg/m³, $\\mu = 10^{-3}$ Pa·s) flows at ${nf(v)} m/s in a pipe with diameter ${D} mm. What type of flow is it?`),[t,...["Laminær","Turbulent","Overgangsområde"].filter(x=>x!==t)].map(o=>T(o,EN[o])),`$Re = \\rho vD/\\mu = ${mf(Re,0)}$.`]; },
  ()=>{ const v=R.p([0.02,0.03,0.05]), D=R.p([10,20,25]); const Re=v*D*1000; const f=64/Re;
    return [T(`Laminær strømning i et rør har $Re = ${mf(Re,0)}$. Hva er friksjonsfaktoren $f$?`,`Laminar flow in a pipe has $Re = ${mf(Re,0)}$. What is the friction factor $f$?`),{n:f,tol:rel(f),u:""},`$f = 64/Re \\approx ${mf(f,4)}$.`]; },
  ()=>{ const f=R.p([0.015,0.02,0.025,0.03]), L=R.p([10,50,100,200]), D=R.p([0.05,0.1,0.2]), v=R.f(0.5,3,0.5); const h=f*L/D*v*v/(2*G_);
    return [T(`Et rør er ${L} m langt med diameter ${mf(D*1000,0)} mm, $f = ${mf(f,3)}$ og middelfart ${nf(v)} m/s. Hvor stort er friksjonstapet (løftehøyde)?`,`A pipe is ${L} m long with diameter ${mf(D*1000,0)} mm, $f = ${mf(f,3)}$ and mean velocity ${nf(v)} m/s. What is the friction loss (head loss)?`),{n:h,tol:rel(h),u:"m"},`$h_f = f\\dfrac{L}{D}\\dfrac{v^2}{2g} \\approx ${mf(h,3)}$ m.`]; },
  ()=>{ const Cd=R.p([0.3,0.5,1,1.2]), A=R.p([0.5,1,2,2.5]), v=R.p([10,20,30]); const F=0.5*1.2*v*v*Cd*A;
    return [T(`Et legeme med $C_D = ${mf(Cd,1)}$ og frontareal ${nf(A)} m² beveger seg med ${v} m/s i luft ($\\rho = 1{,}2$). Hvor stor er luftmotstanden?`,`A body with $C_D = ${mf(Cd,1)}$ and frontal area ${nf(A)} m² moves at ${v} m/s through air ($\\rho = 1.2$). How large is the drag force?`),{n:F,tol:rel(F),u:"N"},`$F_D = \\tfrac12\\rho v^2C_DA \\approx ${mf(F,1)}$ N.`]; }
 ]}
]},

// ================= Elementmetoden =================
{ code:"FEM", name:"Elementmetoden", group:"Mekanikk og konstruksjon", isNew:true, also:"NMBU TBM350 / TBM250", units:[
 { title:"Stavelementer og stivhetsmatriser", qs:[
  ["Hva er stivhetsmatrisen til et lineært stavelement (1D)?",["$\\dfrac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$","$\\dfrac{EA}{L}\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$","$\\dfrac{EI}{L^3}\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$","$EA\\,L\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$"],"Den er symmetrisk og singulær for ett element alene."],
  ["Hvorfor er den globale stivhetsmatrisen singulær før randbetingelsene er satt inn?",["Konstruksjonen kan bevege seg som et stivt legeme","Fordi den er symmetrisk","Fordi E er for liten","Fordi elementene er for store"],"Man må låse nok frihetsgrader til å hindre stivlegemebevegelse."],
  ["Hva gjør man ved assemblering?",["Legger elementmatrisene inn i den globale matrisen etter hvilke frihetsgrader de deler","Multipliserer alle elementmatrisene","Tar gjennomsnittet av elementene","Inverterer hver elementmatrise"],"Bidrag i felles noder summeres."],
  ["Hvorfor er stivhetsmatrisen symmetrisk for lineær elastisitet?",["Den kommer fra en symmetrisk bilineær form (Maxwell–Bettis resiprositet)","Fordi elementene er like lange","Fordi lasten er symmetrisk","Det er den ikke"],"Symmetri halverer lagringsbehovet og gir raskere løsere."],
  ["Hva løser man til slutt i en lineær statisk FEM-analyse?",["$K\\vec u = \\vec f$ for nodeforskyvningene","$\\vec u = K\\vec f$","$\\det K = 0$","$K = \\vec f$"],"Spenninger og tøyninger regnes ut fra $\\vec u$ etterpå."]
 ], gen:[
  ()=>{ const E=R.p([70,210]), A=R.p([50,100,200,500]), L=R.p([100,250,500,1000]); const k=E*1e3*A/L;
    return [T(`Hva er stivheten $EA/L$ til et stavelement med $E = ${E}$ GPa, $A = ${A}$ mm² og $L = ${L}$ mm?`,`What is the stiffness $EA/L$ of a bar element with $E = ${E}$ GPa, $A = ${A}$ mm² and $L = ${L}$ mm?`),{n:k,tol:rel(k),u:"N/mm"},`$EA/L = ${E*1000}\\cdot ${A}/${L} = ${mf(k,0)}$ N/mm.`]; },
  ()=>{ const k1=R.p([100,200,500,1000]), k2=R.p([100,200,400,1000]), F=R.p([100,500,1000]); const u=F/k1+F/k2;
    return [T(`To fjærelementer med $k_1 = ${k1}$ N/mm og $k_2 = ${k2}$ N/mm er koblet i serie. Node 1 er fastholdt, og kraften ${F} N virker i node 3. Hva er forskyvningen $u_3$?`,`Two spring elements with $k_1 = ${k1}$ N/mm and $k_2 = ${k2}$ N/mm are connected in series. Node 1 is fixed, and a force of ${F} N acts at node 3. What is the displacement $u_3$?`),{n:u,tol:rel(u),u:"mm"},T(`Systemet $K\\vec u = \\vec f$ gir $u_2 = F/k_1$ og $u_3 = u_2 + F/k_2 = ${mf(u,3)}$ mm.`,`The system $K\\vec u = \\vec f$ gives $u_2 = F/k_1$ and $u_3 = u_2 + F/k_2 = ${mf(u,3)}$ mm.`)]; },
  ()=>{ const k1=R.p([100,200,500]), k2=R.p([100,300,500]); const K22=k1+k2;
    return [T(`To stavelementer med stivhet $k_1 = ${k1}$ og $k_2 = ${k2}$ N/mm deler node 2. Hva blir diagonalelementet $K_{22}$ i den globale matrisen?`,`Two bar elements with stiffness $k_1 = ${k1}$ and $k_2 = ${k2}$ N/mm share node 2. What is the diagonal entry $K_{22}$ in the global matrix?`),{n:K22,tol:0,u:"N/mm"},T(`Begge elementene bidrar i node 2: $k_1 + k_2 = ${K22}$ N/mm.`,`Both elements contribute at node 2: $k_1 + k_2 = ${K22}$ N/mm.`)]; },
  ()=>{ const F=R.p([1,2,5,10]), E=210, A=R.p([50,100,200]), L=R.p([500,1000,2000]); const u=F*1e3*L/(E*1e3*A);
    return [T(`Et stavelement ($E = 210$ GPa, $A = ${A}$ mm², $L = ${L}$ mm) er fastholdt i node 1 og har kraften ${F} kN i node 2. Hva er $u_2$?`,`A bar element ($E = 210$ GPa, $A = ${A}$ mm², $L = ${L}$ mm) is fixed at node 1 and loaded with a force of ${F} kN at node 2. What is $u_2$?`),{n:u,tol:rel(u),u:"mm"},T(`Etter at node 1 er låst: $u_2 = FL/(EA) \\approx ${mf(u,4)}$ mm.`,`With node 1 fixed: $u_2 = FL/(EA) \\approx ${mf(u,4)}$ mm.`)]; }
 ]},
 { title:"Svak form og formfunksjoner", qs:[
  ["Hva oppnår man ved å skrive om til svak form?",["Lavere krav til deriverbarhet: én derivasjon flyttes over på testfunksjonen","Eksakte løsninger","Færre ukjente","At randbetingelsene forsvinner"],"Man integrerer delvis."],
  ["Hva er de lineære formfunksjonene på $[0, 1]$?",["$N_1 = 1 - \\xi$ og $N_2 = \\xi$","$N_1 = \\xi^2$ og $N_2 = 1 - \\xi^2$","$N_1 = N_2 = 1/2$","$N_1 = \\sin\\xi$ og $N_2 = \\cos\\xi$"],"Hver er 1 i sin egen node og 0 i den andre."],
  ["Hva betyr det at formfunksjonene er en «partisjon av enheten»?",["Summen av dem er 1 overalt i elementet","Integralet av hver er 1","De er ortogonale","De er alltid positive"],"Da kan elementet gjengi en konstant forskyvning (stivlegemebevegelse)."],
  ["Hva kjennetegner Galerkins metode?",["Testfunksjonene velges fra samme rom som formfunksjonene","Man bruker ingen testfunksjoner","Man minimerer feilen i ett punkt","Man bruker bare Fourierrekker"],"Standard FEM er Bubnov–Galerkin."],
  ["Hva er forskjellen på essensielle og naturlige randbetingelser?",["Essensielle (Dirichlet) settes direkte på ukjente; naturlige (Neumann) kommer inn via randleddet i svak form","Det er det samme","Naturlige gjelder bare varme","Essensielle kommer fra lasten"],"Forskyvning er essensiell, mens kraft eller fluks er naturlig."],
  ["Hvilke polynomer integrerer 2-punkts Gauss-kvadratur eksakt?",["Opp til grad 3","Opp til grad 1","Opp til grad 2","Alle"],"$n$ punkter integrerer eksakt opp til grad $2n-1$."]
 ], gen:[
  ()=>{ const u1=R.i(-5,10), u2=R.i(-5,10), L=R.p([1,2,4]), x=R.p([0.25,0.5,0.75]); const v=u1+(u2-u1)*x;
    return [T(`Et lineært element går fra $x = 0$ til $x = ${L}$ med nodeverdier $u_1 = ${u1}$ og $u_2 = ${u2}$. Hva er $u$ i $x = ${mf(x*L)}$?`,`A linear element runs from $x = 0$ to $x = ${L}$ with nodal values $u_1 = ${u1}$ and $u_2 = ${u2}$. What is $u$ at $x = ${mf(x*L)}$?`),{n:v,tol:0.001,u:""},T(`$u = N_1u_1 + N_2u_2$ med $\\xi = ${mf(x)}$: $${u1}(1 - ${mf(x)}) + ${u2}\\cdot ${mf(x)} = ${mf(v,3)}$.`,`$u = N_1u_1 + N_2u_2$ with $\\xi = ${mf(x)}$: $${u1}(1 - ${mf(x)}) + ${u2}\\cdot ${mf(x)} = ${mf(v,3)}$.`)]; },
  ()=>{ const x=R.p([0,0.2,0.25,0.5,0.6,0.75,1]), w=R.p([1,2]); const v=w===1?1-x:x;
    return [T(`Hva er $N_${w}(\\xi)$ i $\\xi = ${mf(x)}$ for et lineært element på $[0, 1]$?`,`What is $N_${w}(\\xi)$ at $\\xi = ${mf(x)}$ for a linear element on $[0, 1]$?`),{n:v,tol:0.001,u:""},T(`$N_1 = 1 - \\xi$ og $N_2 = \\xi$, så svaret er ${nf(v,2)}.`,`$N_1 = 1 - \\xi$ and $N_2 = \\xi$, so the answer is ${nf(v,2)}.`)]; },
  ()=>{ const a=R.i(1,5), b=R.i(1,4), c=R.i(1,4); const exact=2*a/3+2*c; const g1=2*c;
    return [T(`Hva gir 1-punkts Gauss-kvadratur ($\\xi = 0$, vekt 2) for $\\int_{-1}^{1}(${cf(a)}\\xi^2 + ${b}\\xi + ${c})\\,d\\xi$?`,`What does 1-point Gauss quadrature ($\\xi = 0$, weight 2) give for $\\int_{-1}^{1}(${cf(a)}\\xi^2 + ${b}\\xi + ${c})\\,d\\xi$?`),{n:g1,tol:0.001,u:""},T(`$2f(0) = 2\\cdot ${c} = ${g1}$. Den eksakte verdien er $${mf(exact,3)}$, så $\\xi^2$-leddet går tapt med bare ett punkt.`,`$2f(0) = 2\\cdot ${c} = ${g1}$. The exact value is $${mf(exact,3)}$, so the $\\xi^2$ term is lost with only one point.`)]; },
  ()=>{ const k=R.p([1,5,10,50]), A=R.p([1,2]), L=R.p([0.5,1,2]); const ke=k*A/L;
    return [T(`1D varmeledning: Et lineært element har $k = ${k}$ W/(m·K), $A = ${A}$ m² og $L = ${mf(L)}$ m. Hva er diagonalelementet i elementets ledningsmatrise?`,`1D heat conduction: A linear element has $k = ${k}$ W/(m·K), $A = ${A}$ m² and $L = ${mf(L)}$ m. What is the diagonal entry of the element conductance matrix?`),{n:ke,tol:rel(ke),u:"W/K"},T(`$\\dfrac{kA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$, så diagonalen er $${mf(ke,2)}$. Formen er den samme som for stavelementet.`,`$\\dfrac{kA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$, so the diagonal entry is $${mf(ke,2)}$. The form is the same as for the bar element.`)]; }
 ]},
 { title:"Elementtyper, mesh og feil", qs:[
  ["Hva kjennetegner et CST-element (lineær trekant)?",["Konstant tøyning og spenning i hele elementet","Kvadratisk forskyvning","Ingen frihetsgrader","Eksakt for bøyning"],"Det krever fin mesh der spenningsgradientene er store."],
  ["Hva er forskjellen på h- og p-forfining?",["h: mindre elementer; p: høyere polynomgrad","h: høyere grad; p: mindre elementer","h gjelder bare 3D","Det er det samme"],"Begge gir konvergens mot riktig løsning."],
  ["Hva er skjærlåsing (shear locking)?",["Lineære elementer blir kunstig stive i bøyning","At meshen ikke kan lages","At materialet flyter","At skjærkraften blir null"],"Løses med kvadratiske elementer eller redusert integrasjon."],
  ["Hvilken størrelse er kontinuerlig mellom elementene i vanlig forskyvningsbasert FEM?",["Forskyvningene","Spenningene","Både spenninger og tøyninger","Ingen"],"Spenningene hopper ofte mellom elementer og glattes i etterbehandlingen."],
  ["Hvor bør meshen være finest?",["Der spenningsgradientene er store, f.eks. ved hull og skarpe hjørner","Der det er lite last","Jevnt fordelt overalt","Ved randbetingelsene med null forskyvning"],"Gjør en konvergensstudie for å sjekke."],
  ["Hvorfor kan et skarpt innvendig hjørne gi spenninger som vokser når meshen forfines?",["Det er en teoretisk singularitet, og spenningen er uendelig i modellen","Programmet har en feil","Materialet er sprøtt","Lasten er for stor"],"Modeller heller med en reell radius."]
 ], gen:[
  ()=>{ const t=R.p([["2D-stav (fagverk)",2,"2D bar (truss)"],["2D-bjelke",3,"2D beam"],["3D-solid",3,"3D solid"],["3D-bjelke",6,"3D beam"],["2D-plan spenning",2,"2D plane stress"]]), n=R.i(4,40);
    return [T(`En modell har ${n} noder med elementtypen ${t[0]}. Hvor mange frihetsgrader har den før randbetingelsene?`,`A model has ${n} nodes with the element type ${t[2]}. How many degrees of freedom does it have before boundary conditions are applied?`),{n:n*t[1],tol:0,u:""},T(`${t[1]} frihetsgrader per node gir $${n}\\cdot ${t[1]} = ${n*t[1]}$.`,`${t[1]} degrees of freedom per node gives $${n}\\cdot ${t[1]} = ${n*t[1]}$.`)]; },
  ()=>{ const e=R.i(2,50), q=R.p(["lineære","kvadratiske"]); const n=q==="lineære"?e+1:2*e+1;
    return [T(`En 1D-stang deles i ${e} ${q} elementer. Hvor mange noder får modellen?`,`A 1D bar is divided into ${e} ${q==="lineære"?"linear":"quadratic"} elements. How many nodes does the model have?`),{n,tol:0,u:""},q==="lineære"?`$${e} + 1 = ${n}$.`:T(`Hvert kvadratiske element har en ekstra midtnode: $2\\cdot ${e} + 1 = ${n}$.`,`Each quadratic element has an extra midpoint node: $2\\cdot ${e} + 1 = ${n}$.`)]; },
  ()=>{ const p=R.p([1,2]), f=R.p([2,4]); const r=f**(p+1);
    return [T(`Feilen i forskyvning går som $O(h^{p+1})$ for elementer av grad $p = ${p}$. Hvor mye mindre blir feilen hvis elementstørrelsen deles på ${f}?`,`The displacement error scales as $O(h^{p+1})$ for elements of degree $p = ${p}$. By what factor does the error decrease if the element size is divided by ${f}?`),{n:r,tol:0,u:"ganger"},`$${f}^{${p+1}} = ${r}$.`]; }
 ]}
]},

// ================= Mekaniske svingninger =================
{ code:"SVING", name:"Maskindynamikk og svingninger", group:"Mekanikk og konstruksjon", isNew:true, also:"NMBU TMP310", units:[
 { title:"Frie svingninger", qs:[
  ["Hva er egenfrekvensen til et masse–fjær-system?",["$\\omega_n = \\sqrt{k/m}$","$\\omega_n = k/m$","$\\omega_n = \\sqrt{m/k}$","$\\omega_n = km$"],"$f_n = \\omega_n/(2\\pi)$."],
  ["To fjærer i parallell har stivheten …",["$k_1 + k_2$","$\\dfrac{k_1k_2}{k_1+k_2}$","$k_1k_2$","$|k_1 - k_2|$"],"I serie blir det $\\dfrac{k_1k_2}{k_1+k_2}$, akkurat som motstander i parallell."],
  ["Hva skjer med egenfrekvensen hvis massen firedobles?",["Den halveres","Den firedobles","Den dobles","Den er uendret"],"$\\omega_n \\propto 1/\\sqrt m$."],
  ["Hvordan kan du finne egenfrekvensen fra den statiske nedbøyningen $\\delta$?",["$\\omega_n = \\sqrt{g/\\delta}$","$\\omega_n = g\\delta$","$\\omega_n = \\delta/g$","$\\omega_n = \\sqrt{\\delta/g}$"],"$k\\delta = mg$ gir $k/m = g/\\delta$."]
 ], gen:[
  ()=>{ const k=R.p([1e3,5e3,1e4,5e4,1e5]), m=R.p([1,2,5,10,50]); const f=Math.sqrt(k/m)/(2*Math.PI);
    return [T(`En maskin på ${m} kg står på fjærer med total stivhet ${mf(k/1000,1)} kN/m. Hva er egenfrekvensen i Hz?`,`A ${m} kg machine rests on springs with a total stiffness of ${mf(k/1000,1)} kN/m. What is the natural frequency in Hz?`),{n:f,tol:rel(f),u:"Hz"},`$f_n = \\dfrac{1}{2\\pi}\\sqrt{k/m} \\approx ${mf(f,2)}$ Hz.`]; },
  ()=>{ const k1=R.p([100,200,300,500]), k2=R.p([100,200,400,600]), t=R.p(["serie","parallell"]); const k=t==="serie"?k1*k2/(k1+k2):k1+k2;
    return [T(`Fjærer med $k_1 = ${k1}$ N/m og $k_2 = ${k2}$ N/m kobles i ${t}. Hva er ekvivalent stivhet?`,`Springs with $k_1 = ${k1}$ N/m and $k_2 = ${k2}$ N/m are connected in ${t==="serie"?"series":"parallel"}. What is the equivalent stiffness?`),{n:k,tol:rel(k),u:"N/m"},t==="serie"?`$\\dfrac{k_1k_2}{k_1+k_2} = ${mf(k,2)}$ N/m.`:`$k_1 + k_2 = ${k}$ N/m.`]; },
  ()=>{ const d=R.p([0.5,1,2,5,10]); const f=Math.sqrt(G_/(d/1000))/(2*Math.PI);
    return [T(`En masse gir en statisk nedbøyning på ${nf(d)} mm på fjærene sine. Hva er egenfrekvensen?`,`A mass produces a static deflection of ${nf(d)} mm on its springs. What is the natural frequency?`),{n:f,tol:rel(f),u:"Hz"},T(`$f_n = \\dfrac{1}{2\\pi}\\sqrt{g/\\delta} = \\dfrac{1}{2\\pi}\\sqrt{9{,}81/${mf(d/1000,4)}} \\approx ${mf(f,2)}$ Hz.`,`$f_n = \\dfrac{1}{2\\pi}\\sqrt{g/\\delta} = \\dfrac{1}{2\\pi}\\sqrt{9.81/${mf(d/1000,4)}} \\approx ${mf(f,2)}$ Hz.`)]; }
 ]},
 { title:"Demping", qs:[
  ["Hva betyr $\\zeta = 1$?",["Kritisk demping: raskest retur uten svingning","Ingen demping","Overdempet","Ustabilt"],"$\\zeta < 1$ gir underdempet og $\\zeta > 1$ gir overdempet."],
  ["Hva er den dempede egenfrekvensen?",["$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$","$\\omega_d = \\omega_n(1+\\zeta)$","$\\omega_d = \\zeta\\omega_n$","$\\omega_d = \\omega_n/\\zeta$"],"For små $\\zeta$ er $\\omega_d \\approx \\omega_n$."],
  ["Hva er det logaritmiske dekrementet?",["$\\delta = \\ln(x_1/x_2)$ for to påfølgende topper","$x_1 - x_2$","$x_1/x_2$","$\\ln(\\omega_n)$"],"For små $\\zeta$ er $\\zeta \\approx \\delta/(2\\pi)$."],
  ["Hva er kritisk dempingskoeffisient?",["$c_c = 2\\sqrt{km}$","$c_c = \\sqrt{km}$","$c_c = k/m$","$c_c = 2km$"],"$\\zeta = c/c_c$."]
 ], gen:[
  ()=>{ const k=R.p([1000,4000,10000]), m=R.p([1,4,10]), c=R.p([10,50,100,200,400,1000]); const z=c/(2*Math.sqrt(k*m)); const t=z<0.999?"Underdempet":z>1.001?"Overdempet":"Kritisk dempet";
    const EN={"Underdempet":"underdamped","Overdempet":"overdamped","Kritisk dempet":"critically damped"};
    return [T(`$m = ${m}$ kg, $k = ${k}$ N/m og $c = ${c}$ Ns/m. Hva er dempingsforholdet $\\zeta$?`,`$m = ${m}$ kg, $k = ${k}$ N/m and $c = ${c}$ Ns/m. What is the damping ratio $\\zeta$?`),{n:z,tol:rel(z,0.01,0.001),u:""},T(`$\\zeta = c/(2\\sqrt{km}) = ${c}/${mf(2*Math.sqrt(k*m),1)} \\approx ${mf(z,3)}$. Systemet er ${t.toLowerCase()}.`,`$\\zeta = c/(2\\sqrt{km}) = ${c}/${mf(2*Math.sqrt(k*m),1)} \\approx ${mf(z,3)}$. The system is ${EN[t]}.`)]; },
  ()=>{ const wn=R.p([10,20,50,100]), z=R.p([0.05,0.1,0.2,0.3,0.5]); const wd=wn*Math.sqrt(1-z*z);
    return [T(`$\\omega_n = ${wn}$ rad/s og $\\zeta = ${mf(z)}$. Hva er den dempede egenfrekvensen?`,`$\\omega_n = ${wn}$ rad/s and $\\zeta = ${mf(z)}$. What is the damped natural frequency?`),{n:wd,tol:rel(wd,0.002),u:"rad/s"},`$\\omega_d = ${wn}\\sqrt{1 - ${mf(z*z,4)}} \\approx ${mf(wd,2)}$ rad/s.`]; },
  ()=>{ const x1=R.p([10,20,50]), r=R.p([1.2,1.5,2,3]); const x2=x1/r; const d=Math.log(r), z=d/Math.sqrt(4*Math.PI**2+d*d);
    return [T(`To påfølgende topper i en fri svingning er ${nf(x1)} mm og ${nf(x2,2)} mm. Hva er dempingsforholdet?`,`Two successive peaks in a free vibration are ${nf(x1)} mm and ${nf(x2,2)} mm. What is the damping ratio?`),{n:z,tol:0.003,u:""},T(`$\\delta = \\ln(${mf(x1)}/${mf(x2,2)}) = ${mf(d,3)}$, og $\\zeta = \\delta/\\sqrt{4\\pi^2 + \\delta^2} \\approx ${mf(z,3)}$.`,`$\\delta = \\ln(${mf(x1)}/${mf(x2,2)}) = ${mf(d,3)}$, and $\\zeta = \\delta/\\sqrt{4\\pi^2 + \\delta^2} \\approx ${mf(z,3)}$.`)]; },
  ()=>{ const k=R.p([1000,5000,20000]), m=R.p([2,5,10,20]); const cc=2*Math.sqrt(k*m);
    return [T(`Hva er kritisk dempingskoeffisient for $m = ${m}$ kg og $k = ${k}$ N/m?`,`What is the critical damping coefficient for $m = ${m}$ kg and $k = ${k}$ N/m?`),{n:cc,tol:rel(cc),u:"Ns/m"},`$c_c = 2\\sqrt{km} \\approx ${mf(cc,1)}$ Ns/m.`]; }
 ]},
 { title:"Tvungne svingninger og isolasjon", qs:[
  ["Hvor stor er forsterkningen ved resonans for et lett dempet system?",["Omtrent $1/(2\\zeta)$","1","$2\\zeta$","Uendelig uansett demping"],"Med $\\zeta = 0{,}05$ blir forsterkningen omtrent 10."],
  ["Når gir vibrasjonsisolering reduksjon av overført kraft?",["Når frekvensforholdet $r = \\omega/\\omega_n > \\sqrt2$","Når $r < 1$","Når $r = 1$","Aldri"],"Isolatorene bør derfor være myke nok til å gi lav egenfrekvens."],
  ["Hva er ubalansekraften fra en roterende masse $m$ med eksentrisitet $e$?",["$me\\omega^2$","$me\\omega$","$m\\omega^2$","$me/\\omega$"],"Den vokser med kvadratet av turtallet."],
  ["Hva skjer med amplituden langt over resonans ($r \\gg 1$) for en krafteksitert masse?",["Den går mot null","Den går mot uendelig","Den går mot den statiske utbøyningen","Den er konstant"],"Massen rekker ikke å følge kraften."]
 ], gen:[
  ()=>{ const F=R.p([100,200,500,1000]), k=R.p([1e4,5e4,1e5]), z=R.p([0.02,0.05,0.1]); const X=F/k/(2*z)*1000;
    return [T(`En harmonisk kraft med amplitude ${F} N virker på et system med $k = ${mf(k/1000)}$ kN/m og $\\zeta = ${mf(z)}$ ved resonans. Hvor stor blir amplituden?`,`A harmonic force with amplitude ${F} N acts on a system with $k = ${mf(k/1000)}$ kN/m and $\\zeta = ${mf(z)}$ at resonance. How large is the resulting amplitude?`),{n:X,tol:rel(X),u:"mm"},`$X = \\dfrac{F_0/k}{2\\zeta} = \\dfrac{${mf(F/k*1000,2)}\\text{ mm}}{${mf(2*z)}} = ${mf(X,1)}$ mm.`]; },
  ()=>{ const r=R.p([0.5,2,3,4,5]); const TR=1/Math.abs(1-r*r);
    return [T(`Hva er transmissibiliteten (udempet) ved frekvensforholdet $r = ${mf(r)}$?`,`What is the (undamped) transmissibility at the frequency ratio $r = ${mf(r)}$?`),{n:TR,tol:rel(TR),u:""},T(`$TR = 1/|1 - r^2| = 1/|1 - ${mf(r*r)}| \\approx ${mf(TR,3)}$. ${r>Math.SQRT2?"Kraften reduseres.":"Kraften forsterkes."}`,`$TR = 1/|1 - r^2| = 1/|1 - ${mf(r*r)}| \\approx ${mf(TR,3)}$. ${r>Math.SQRT2?"The force is reduced.":"The force is amplified."}`)]; },
  ()=>{ const m=R.p([0.01,0.05,0.1]), e=R.p([1,2,5,10]), n=R.p([1000,1500,3000]); const w=2*Math.PI*n/60; const F=m*e/1000*w*w;
    return [T(`En ubalanse på ${nf(m*1000)} g sitter ${e} mm fra aksen og roterer med ${n} rpm. Hvor stor er ubalansekraften?`,`An unbalance of ${nf(m*1000)} g is located ${e} mm from the axis and rotates at ${n} rpm. How large is the unbalance force?`),{n:F,tol:rel(F),u:"N"},`$F = me\\omega^2 = ${mf(m,3)}\\cdot ${mf(e/1000,3)}\\cdot ${mf(w,1)}^2 \\approx ${mf(F,1)}$ N.`]; }
 ]}
]},

// ================= Varmeoverføring =================
{ code:"VARME", name:"Varmeoverføring", group:"Energi og strømning", isNew:true, also:"NMBU FYS251", units:[
 { title:"Varmeledning", qs:[
  ["Hva sier Fouriers lov?",["$\\dot q = -k\\,dT/dx$","$\\dot q = hA\\Delta T$","$\\dot q = \\varepsilon\\sigma T^4$","$Q = mc\\Delta T$"],"Varmen strømmer fra varmt til kaldt, derav minustegnet."],
  ["Hva er den termiske motstanden til et plant sjikt?",["$R = L/(kA)$","$R = kA/L$","$R = L\\,kA$","$R = 1/L$"],"Sjikt i serie legges sammen, akkurat som elektriske motstander."],
  ["Hvorfor isolerer mineralull godt?",["Den holder på stillestående luft, som har lav varmeledningsevne","Den reflekterer all stråling","Den har høy tetthet","Den leder strøm"],"$k \\approx 0{,}035$ W/(m·K)."],
  ["Hva sier U-verdien til en vegg?",["Varmetap per m² per grad temperaturforskjell","Veggens tykkelse","Tettheten","Materialets pris"],"Enheten er W/(m²·K), og lav U-verdi betyr god isolasjon."]
 ], gen:[
  ()=>{ const L1=R.p([0.1,0.15,0.2]), k1=R.p([0.035,0.04]), L2=R.p([0.012,0.02]), k2=R.p([0.2,0.25]), A=R.p([1,10,20]), dT=R.i(15,40);
    const Rt=L1/(k1*A)+L2/(k2*A), Q=dT/Rt;
    return [T(`En vegg har ${mf(L1*1000,0)} mm isolasjon ($k = ${mf(k1,3)}$) og ${mf(L2*1000,0)} mm plate ($k = ${mf(k2,2)}$) og areal ${A} m². Temperaturforskjellen er ${dT} K. Hva er varmetapet (bare ledning)?`,`A wall has ${mf(L1*1000,0)} mm of insulation ($k = ${mf(k1,3)}$) and ${mf(L2*1000,0)} mm of board ($k = ${mf(k2,2)}$), with an area of ${A} m². The temperature difference is ${dT} K. What is the heat loss (conduction only)?`),{n:Q,tol:rel(Q),u:"W"},T(`$R = \\sum L/(kA) \\approx ${mf(Rt,4)}$ K/W, og $\\dot Q = \\Delta T/R \\approx ${mf(Q,1)}$ W.`,`$R = \\sum L/(kA) \\approx ${mf(Rt,4)}$ K/W, and $\\dot Q = \\Delta T/R \\approx ${mf(Q,1)}$ W.`)]; },
  ()=>{ const L=R.p([0.05,0.1,0.2]), k=R.p([0.04,0.8,1.4,50]), A=R.p([1,2,5]); const Rr=L/(k*A);
    return [T(`Hva er den termiske motstanden til et sjikt med $L = ${mf(L)}$ m, $k = ${mf(k,2)}$ W/(m·K) og $A = ${A}$ m²?`,`What is the thermal resistance of a layer with $L = ${mf(L)}$ m, $k = ${mf(k,2)}$ W/(m·K) and $A = ${A}$ m²?`),{n:Rr,tol:rel(Rr),u:"K/W"},`$R = L/(kA) \\approx ${mf(Rr,4)}$ K/W.`]; },
  ()=>{ const Ti=R.p([20,22]), To=R.p([-20,-10,0]), f=R.p([0.2,0.5,0.8,0.9]); const Tm=Ti-f*(Ti-To);
    return [T(`Innetemperaturen er ${Ti} °C og utetemperaturen ${nf(To)} °C. Det innerste sjiktet står for ${nf(f*100)} % av den totale termiske motstanden. Hva er temperaturen i overgangen mellom sjiktene?`,`The indoor temperature is ${Ti} °C and the outdoor temperature is ${nf(To)} °C. The innermost layer accounts for ${nf(f*100)}% of the total thermal resistance. What is the temperature at the interface between the layers?`),{n:Tm,tol:0.1,u:"°C"},T(`Temperaturfallet fordeler seg som motstandene: $${Ti} - ${mf(f)}\\cdot ${Ti-To} = ${mf(Tm,1)}$ °C.`,`The temperature drop is distributed in proportion to the resistances: $${Ti} - ${mf(f)}\\cdot ${Ti-To} = ${mf(Tm,1)}$ °C.`)]; }
 ]},
 { title:"Konveksjon", qs:[
  ["Hva er Newtons avkjølingslov?",["$\\dot Q = hA(T_s - T_\\infty)$","$\\dot Q = kA\\Delta T/L$","$\\dot Q = \\sigma T^4$","$\\dot Q = mc$"],"$h$ er varmeovergangstallet."],
  ["Hvilken type konveksjon har typisk høyest $h$?",["Kokende eller kondenserende vann","Naturlig konveksjon i luft","Tvungen konveksjon i luft","Stille luft"],"Faseoverganger gir tusenvis av W/(m²·K)."],
  ["Hva uttrykker Nusselttallet?",["Forholdet mellom konvektiv og konduktiv varmetransport","Forholdet mellom treghet og viskositet","Stråling mot ledning","Temperatur mot trykk"],"$Nu = hL/k$."],
  ["Når kan man bruke «lumped capacitance» (konstant temperatur i legemet)?",["Når Biottallet $Bi = hL_c/k < 0{,}1$","Når $Bi > 10$","Alltid","Bare i vann"],"Da er intern ledning mye raskere enn konveksjon på overflaten."]
 ], gen:[
  ()=>{ const h=R.p([5,10,25,50,100]), A=R.p([0.5,1,2,5]), dT=R.i(10,60); const Q=h*A*dT;
    return [T(`En overflate på ${nf(A)} m² er ${dT} K varmere enn luften rundt, og $h = ${h}$ W/(m²·K). Hvor stor er konveksjonsvarmen?`,`A surface of ${nf(A)} m² is ${dT} K warmer than the surrounding air, and $h = ${h}$ W/(m²·K). How large is the convective heat transfer?`),{n:Q,tol:rel(Q),u:"W"},`$\\dot Q = hA\\Delta T = ${h}\\cdot ${mf(A)}\\cdot ${dT} = ${mf(Q,0)}$ W.`]; },
  ()=>{ const h1=R.p([7.7,8,10]), h2=R.p([20,25]), L=R.p([0.1,0.15,0.2]), k=R.p([0.035,0.04]); const U=1/(1/h1+L/k+1/h2);
    return [T(`En vegg har $h_i = ${mf(h1,1)}$, $h_u = ${h2}$ W/(m²·K) og ${mf(L*1000,0)} mm isolasjon med $k = ${mf(k,3)}$. Hva er U-verdien?`,`A wall has $h_i = ${mf(h1,1)}$, $h_o = ${h2}$ W/(m²·K) and ${mf(L*1000,0)} mm of insulation with $k = ${mf(k,3)}$. What is the U-value?`),{n:U,tol:rel(U),u:"W/(m²K)"},T(`$U = 1/(1/h_i + L/k + 1/h_u) \\approx ${mf(U,3)}$ W/(m²·K).`,`$U = 1/(1/h_i + L/k + 1/h_o) \\approx ${mf(U,3)}$ W/(m²·K).`)]; },
  ()=>{ const h=R.p([10,50,100,500]), Lc=R.p([0.001,0.005,0.01,0.05]), k=R.p([15,50,200]); const Bi=h*Lc/k; const ok=Bi<0.1;
    return [T(`Et metallegeme har $k = ${k}$ W/(m·K), karakteristisk lengde ${mf(Lc*1000,0)} mm og $h = ${h}$ W/(m²·K). Kan du bruke lumped capacitance?`,`A metal body has $k = ${k}$ W/(m·K), a characteristic length of ${mf(Lc*1000,0)} mm and $h = ${h}$ W/(m²·K). Can you use the lumped capacitance method?`),ok?T(["Ja, $Bi < 0{,}1$","Nei, $Bi > 0{,}1$"],["Yes, $Bi < 0.1$","No, $Bi > 0.1$"]):T(["Nei, $Bi > 0{,}1$","Ja, $Bi < 0{,}1$"],["No, $Bi > 0.1$","Yes, $Bi < 0.1$"]),`$Bi = hL_c/k = ${mf(Bi,4)}$.`]; }
 ]},
 { title:"Stråling og transient varme", qs:[
  ["Hva sier Stefan–Boltzmanns lov?",["Utstrålt effekt er $\\varepsilon\\sigma AT^4$","Effekten er proporsjonal med $T$","Effekten er proporsjonal med $1/T^2$","Stråling krever et medium"],"$T$ skal være i kelvin."],
  ["Hva er et svart legeme?",["En ideell absorbent og emitter med $\\varepsilon = 1$","Et legeme som er malt svart","Et legeme uten temperatur","Et legeme som reflekterer alt"],"Ekte flater har $\\varepsilon < 1$."],
  ["Hva sier Wiens forskyvningslov?",["$\\lambda_{maks}T \\approx 2898$ µm·K","$\\lambda T^4$ er konstant","$\\lambda = c/f$","$\\lambda_{maks} \\propto T$"],"Varmere legemer har topp ved kortere bølgelengde."],
  ["Hva er tidskonstanten for et legeme som avkjøles med lumped capacitance?",["$\\tau = \\rho Vc/(hA)$","$\\tau = hA/(\\rho Vc)$","$\\tau = k/h$","$\\tau = L/k$"],"$T - T_\\infty = (T_0 - T_\\infty)e^{-t/\\tau}$."]
 ], gen:[
  ()=>{ const TK=R.p([400,500,600,800,1000]), Ts=R.p([293,300]), e=R.p([0.1,0.5,0.8,0.95]), A=R.p([0.1,0.5,1]); const Q=e*SIGMA_SB*A*(TK**4-Ts**4);
    return [T(`En flate på ${nf(A)} m² med $\\varepsilon = ${mf(e,2)}$ holder ${TK} K, og omgivelsene er ${Ts} K. Hva er netto strålingstap?`,`A surface of ${nf(A)} m² with $\\varepsilon = ${mf(e,2)}$ is held at ${TK} K, and the surroundings are at ${Ts} K. What is the net radiation loss?`),{n:Q,tol:rel(Q),u:"W"},T(`$\\dot Q = \\varepsilon\\sigma A(T^4 - T_{omg}^4) \\approx ${mf(Q,0)}$ W, med $\\sigma = 5{,}67\\cdot10^{-8}$.`,`$\\dot Q = \\varepsilon\\sigma A(T^4 - T_{surr}^4) \\approx ${mf(Q,0)}$ W, with $\\sigma = 5.67\\cdot10^{-8}$.`)]; },
  ()=>{ const TK=R.p([300,1000,3000,5800]); const l=2898/TK; return [T(`Ved hvilken bølgelengde stråler et svart legeme på ${TK} K mest, i µm?`,`At what wavelength does a black body at ${TK} K radiate most strongly, in µm?`),{n:l,tol:rel(l),u:"µm"},T(`$\\lambda_{maks} = 2898/${TK} \\approx ${mf(l,3)}$ µm.`,`$\\lambda_{max} = 2898/${TK} \\approx ${mf(l,3)}$ µm.`)]; },
  ()=>{ const tau=R.p([30,60,120,300]), T0=R.p([200,300,500]), Tinf=R.p([20,25]), t=R.p([1,2,3]); const TT=Tinf+(T0-Tinf)*Math.exp(-t);
    return [T(`Et legeme på ${T0} °C avkjøles i luft på ${Tinf} °C med tidskonstant ${tau} s. Hva er temperaturen etter ${t*tau} s?`,`A body at ${T0} °C cools in air at ${Tinf} °C with a time constant of ${tau} s. What is the temperature after ${t*tau} s?`),{n:TT,tol:rel(TT,0.005,0.2),u:"°C"},`$T = ${Tinf} + (${T0} - ${Tinf})e^{-${t}} \\approx ${mf(TT,1)}$ °C.`]; }
 ]}
]}
);
