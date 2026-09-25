// English: fixed questions (MATS1600, MATS2100, MEK1400)
EN_Q("MATS1600",0,[
 ["A bar with cross-section 100 mm² carries 10 kN in tension. What is the normal stress?",null,"$\\sigma = F/A = 10\\,000\\text{ N}/100\\text{ mm}^2 = 100$ N/mm² = 100 MPa."],
 ["How is the safety factor against yielding defined?",["$n = R_e/\\sigma_{actual}$","$n = \\sigma_{actual}/R_e$","$n = E/\\sigma$","$n = R_m - \\sigma$"],"The yield strength divided by the actual stress. $n > 1$ means there is a margin."],
 ["Steel with $E = 210$ GPa has a stress of 210 MPa. What is the strain, in per mille?",null,"$\\varepsilon = \\sigma/E = 210/210\\,000 = 0.001 = 1$ ‰."],
 ["What is the second moment of area of a $b\\times h$ rectangle about the horizontal centroidal axis?",["$bh^3/12$","$b^3h/12$","$bh^2/6$","$bh^3/3$"],"$I = bh^3/12$. The height enters to the third power, which is why deep beams are stiff. $bh^2/6$ is the section modulus $W$."],
 ["Bending stress in a beam is largest …",["in the outer fibres, furthest from the neutral axis","at the neutral axis","equal over the whole cross-section","at the supports"],"$\\sigma = My/I$ grows linearly with the distance $y$ from the neutral axis."],
 ["What is the section modulus $W$ of a $b\\times h$ rectangle?",["$bh^2/6$","$bh^3/12$","$bh/2$","$b^2h/3$"],"$\\sigma_{max} = M/W$."],
 ["What is the difference between static and dynamic design?",["Dynamic design accounts for fatigue under varying load","Static design only applies to moving parts","There is no difference","Dynamic design only looks at weight"],"Varying loads can cause failure far below the yield strength."],
 ["Which safety factor against yielding is common in machine design?",["About 1.5–3","0.5","Over 20","Exactly 1"],"The choice depends on uncertainty in load and material and on the consequences of failure."]
]);
EN_Q("MATS1600",1,[
 ["What kind of fit is H7/g6?",["Clearance fit","Interference fit","Transition fit","Shrink fit"],"g shafts are slightly smaller than the nominal size, so there is always clearance with an H hole."],
 ["What characterises an interference fit?",["The shaft is larger than the hole","The hole is larger than the shaft","Both are exactly nominal size","The tolerance is zero"],"Negative clearance (interference) gives grip through friction."],
 ["In an H hole (hole-basis system), the lower deviation is …",["0","always negative","equal to the tolerance","dependent on the shaft"],"H means the smallest hole size equals the nominal size."],
 ["What does Ra indicate on a drawing?",["Surface roughness","Radius","Axial play","Material hardness"],"Ra is the arithmetic mean deviation of the surface profile, in µm."],
 ["What does tolerance grade IT7 mean compared with IT11?",["IT7 is a tighter (smaller) tolerance band","IT7 is looser","They are the same","IT7 only applies to holes"],"A lower IT number means tighter tolerance and more expensive manufacturing."],
 ["What is the purpose of geometric dimensioning and tolerancing (GD&T)?",["To control form, orientation and position, not just size","To specify the material","To set surface colour","To specify weight"],"Examples are flatness, parallelism and position."],
 ["What does it mean that a hole is dimensioned Ø20 H7?",["Nominal diameter 20 mm with tolerance class H7","20 holes of 7 mm diameter","Depth 20 mm and 7 threads","20 mm radius"],"H gives a lower deviation of 0, and 7 sets the tolerance width."],
 ["What is a transition fit?",["A fit that can give either slight clearance or slight interference","Always clearance","Always interference","A fit without tolerance"],"Used when parts must be located accurately but still be removable."]
]);
EN_Q("MATS1600",2,[
 ["A driving gear with 20 teeth drives a gear with 60 teeth. What happens to the speed?",["It is reduced to 1/3","It triples","It is unchanged","It is reduced to 1/2"],"The ratio is $i = 60/20 = 3$. The speed goes down 3 times and the torque up roughly 3 times."],
 ["A motor runs at 1500 rpm through a ratio $i = 3$. What is the output speed?",null,"$n_2 = n_1/i = 1500/3 = 500$ rpm."],
 ["A torque of 100 Nm is transmitted at 300 rad/s. What is the power?",null,"$P = M\\omega = 100\\cdot 300 = 30\\,000$ W = 30 kW."],
 ["Why are bolts preloaded?",["So the joint does not separate and to reduce fatigue","To make the bolt softer","To save material","To make it easier to loosen"],"Preload keeps the parts in contact, so the bolt sees less of the varying load."],
 ["What is an advantage of rolling (ball) bearings compared with plain bearings?",["Low friction already at start-up","They handle shocks better","They are quieter at very high speeds","They never need lubrication"],"Rolling contact gives low starting friction. Plain bearings need speed to build up a lubricating film."],
 ["What is the function of a key in a shaft–hub connection?",["To transmit torque between shaft and hub","To prevent axial movement","To reduce friction","To seal against oil"],"Axial locking is often done with a retaining ring or a shoulder."],
 ["Why are notches (sharp corners) dangerous in a shaft?",["They cause stress concentrations that can start fatigue cracks","They make the shaft heavier","They increase stiffness","They cause more friction in the bearings"],"Give transitions a radius."],
 ["What does the designation M12×1.25 mean?",["Metric thread with 12 mm diameter and 1.25 mm pitch (fine thread)","12 bolts of 1.25 mm length","Property class 12","The head is 12 mm wide"],"The standard coarse thread for M12 has a pitch of 1.75 mm."],
 ["What does property class 8.8 on a bolt tell you?",["$R_m \\approx 800$ MPa and $R_e \\approx 0.8\\cdot R_m = 640$ MPa","Length 8.8 mm","8 mm diameter and 8 mm thread","Max torque 88 Nm"],"The first number × 100 is the tensile strength. The second number × 10 is the yield strength as a percentage of it."]
]);
EN_Q("MATS2100",0,[
 ["The first law for a closed system (W = work done BY the system):",["$\\Delta U = Q - W$","$\\Delta U = Q + W$","$\\Delta U = W - Q$","$\\Delta S = Q/T$"],"Heat added raises the internal energy, and work done by the system lowers it."],
 ["1 mol of ideal gas has $p = 100$ kPa and $V = 0.025$ m³. What is the temperature? ($R = 8.314$ J/(mol·K))",null,"$T = pV/(nR) = 2500/8.314 \\approx 301$ K."],
 ["What is $\\Delta U$ for an ideal gas in an isothermal process?",["0","$Q$","$-W$","$nRT$"],"For an ideal gas $U$ depends only on $T$. Constant $T$ gives $\\Delta U = 0$ and hence $Q = W$."],
 ["An adiabatic process is characterised by …",["$Q = 0$","$\\Delta T = 0$","constant $p$","constant $V$"],"No heat exchange with the surroundings."],
 ["What is 25 °C in kelvin?",null,"$T = 25 + 273.15 = 298.15$ K."],
 ["What is an open system in thermodynamics?",["A system where mass can flow in and out","A system without walls","A system at constant temperature","An isolated system"],"Examples are turbines, pumps and heat exchangers."],
 ["What is the zeroth law?",["Two systems each in thermal equilibrium with a third are in equilibrium with each other","Energy is conserved","Entropy increases","Absolute zero cannot be reached"],"It is the basis of temperature measurement."],
 ["What is an isobaric process?",["A process at constant pressure","A process at constant volume","A process without heat","A process at constant temperature"],"Constant volume is called isochoric."]
]);
EN_Q("MATS2100",1,[
 ["How much heat is needed to warm 2 kg of water from 20 to 70 °C? ($c = 4.18$ kJ/(kg·K))",null,"$Q = mc\\Delta T = 2\\cdot 4.18\\cdot 50 = 418$ kJ."],
 ["What happens to the entropy of an isolated system?",["It increases or stays constant","It always decreases","It is always zero","It can freely rise or fall"],"Second law: $\\Delta S_{isolated} \\geq 0$."],
 ["The Carnot efficiency is …",["$1 - T_C/T_H$","$T_C/T_H$","$1 - T_H/T_C$","$W/Q_C$"],"The maximum theoretical efficiency between two reservoirs, with temperatures in kelvin."],
 ["A Carnot engine operates between 600 K and 300 K. What is the efficiency?",null,"$\\eta = 1 - 300/600 = 0.5 = 50$ %."],
 ["Enthalpy is defined as …",["$H = U + pV$","$H = U - TS$","$H = Q/T$","$H = U - pV$"],"$U - TS$ is the Helmholtz free energy."],
 ["What is specific heat capacity?",["The heat needed to raise 1 kg of the substance by 1 K","The heat in 1 mol","The boiling temperature","The energy in a kWh"],"Water has an unusually high value: about 4.18 kJ/(kg·K)."],
 ["What is latent heat?",["Heat added during a phase change without a change in temperature","Heat stored in metal","Heat from friction","Heat that is lost"],"Evaporating water takes about 2257 kJ/kg at 100 °C."]
]);
EN_Q("MATS2100",2,[
 ["A heat pump delivers 4 kW of heat and uses 1 kW of electricity. What is the COP?",null,"$COP_{heat} = Q_H/W = 4/1 = 4$."],
 ["The Rankine cycle is the ideal cycle for …",["steam power plants","petrol engines","diesel engines","gas turbines"],"Water is evaporated in the boiler, expands in the turbine, is condensed and pumped back."],
 ["The Otto cycle is the ideal cycle for …",["petrol engines","diesel engines","refrigerators","steam turbines"],"Heat is added at constant volume (ignition). The Diesel cycle adds heat at constant pressure."],
 ["A refrigerator moves heat from cold to hot. Why does this not violate the second law?",["Work is supplied","The refrigerant has negative entropy","The process is reversible","It actually does violate it"],"Heat does not flow from cold to hot by itself, but it can when work is supplied."],
 ["Which ideal cycle is used for gas turbines and jet engines?",["Brayton (Joule)","Rankine","Otto","Stirling"],"Compression, heat addition at constant pressure, expansion in a turbine."],
 ["What happens to the enthalpy when a refrigerant is throttled through an expansion valve?",["It stays approximately constant","It rises sharply","It becomes zero","It halves"],"Throttling is an isenthalpic process, but pressure and temperature drop."],
 ["What is an isentropic process?",["A reversible and adiabatic process","A process at constant temperature","A process at constant pressure","A process with increasing entropy"],"Ideal compressors and turbines are often modelled as isentropic."]
]);
EN_Q("MEK1400",0,[
 ["A spring with $k = 200$ N/m carries a mass of 0.5 kg. What is the angular frequency?",null,"$\\omega = \\sqrt{k/m} = \\sqrt{400} = 20$ rad/s."],
 ["What is the period of a simple pendulum (small swings)?",["$T = 2\\pi\\sqrt{L/g}$","$T = 2\\pi\\sqrt{g/L}$","$T = \\sqrt{L/g}$","$T = 2\\pi L/g$"],"The period does not depend on the mass."],
 ["A wave has $f = 50$ Hz and $\\lambda = 2$ m. What is the wave speed?",null,"$v = f\\lambda = 50\\cdot 2 = 100$ m/s."],
 ["If you double the length of a pendulum, the period becomes …",["$\\sqrt 2$ times longer","twice as long","four times as long","unchanged"],"$T \\propto \\sqrt L$."],
 ["What is resonance?",["Large amplitude when the driving frequency is close to the natural frequency","The oscillation dying out","Two waves cancelling each other","The frequency doubling"],"Damping limits the peak."],
 ["In a standing wave on a string fixed at both ends, what is the distance between two nodes?",["$\\lambda/2$","$\\lambda$","$\\lambda/4$","$2\\lambda$"],"That is why $L = n\\lambda/2$."]
]);
EN_Q("MEK1400",1,[
 ["Two point charges of 1 µC are 1 m apart. What is the force between them, in mN? ($k = 8.99\\cdot 10^9$)",null,"$F = kq_1q_2/r^2 = 8.99\\cdot10^9\\cdot 10^{-12} = 8.99\\cdot 10^{-3}$ N."],
 ["How does the electric field from a point charge decrease with distance?",["As $1/r^2$","As $1/r$","As $1/r^3$","It is constant"],"$E = kq/r^2$."],
 ["What is the direction of the magnetic force on a moving charge?",["Perpendicular to both $\\vec v$ and $\\vec B$","Along $\\vec v$","Along $\\vec B$","Opposite to $\\vec v$"],"$\\vec F = q\\vec v\\times\\vec B$. The force therefore does no work."],
 ["Lenz's law says that the induced current …",["opposes the change in magnetic flux","reinforces the change in flux","always flows clockwise","is proportional to the resistance"],"This is the minus sign in Faraday's law: $\\varepsilon = -d\\Phi/dt$."],
 ["What does Gauss's law say?",["The electric flux through a closed surface equals the enclosed charge divided by $\\varepsilon_0$","Magnetic flux is always zero","Current equals voltage over resistance","Force equals mass times acceleration"],"$\\oint \\vec E\\cdot d\\vec A = Q_{enc}/\\varepsilon_0$."],
 ["What is the unit tesla (T) a measure of?",["Magnetic flux density","Electric field","Inductance","Charge"],"$1\\text{ T} = 1\\text{ N}/(\\text{A}\\cdot\\text{m})$."],
 ["What is electric potential (voltage)?",["Potential energy per charge","Force per charge","Current per time","Charge per volume"],"$U = W/q$, and the unit is the volt = J/C."],
 ["What does Faraday's law of induction say?",["The induced voltage equals minus the rate of change of magnetic flux","Current equals voltage divided by resistance","Charge is conserved","Magnetic fields have no sources"],"$\\varepsilon = -d\\Phi/dt$. Generators are based on this."]
]);
EN_Q("MEK1400",2,[
 ["How much work is needed to lift 10 kg by 3 m? ($g = 9.81$)",null,"$W = mgh = 10\\cdot 9.81\\cdot 3 = 294.3$ J."],
 ["What is the moment of inertia of a solid cylinder about its axis of symmetry?",["$\\tfrac12 MR^2$","$MR^2$","$\\tfrac25 MR^2$","$\\tfrac13 ML^2$"],"$MR^2$ applies to a thin tube, and $\\tfrac25 MR^2$ to a solid sphere."],
 ["A figure skater pulls in her arms while spinning. Why does she spin faster?",["Angular momentum $L = I\\omega$ is conserved and $I$ decreases","Her energy increases","Friction decreases","Gravity changes"],"When $I$ decreases and $L$ is constant, $\\omega$ must increase."],
 ["Green light has $f = 6\\cdot 10^{14}$ Hz. What is the wavelength? ($c = 3\\cdot10^8$ m/s)",null,"$\\lambda = c/f = 5\\cdot 10^{-7}$ m = 500 nm."],
 ["A motor does 600 J of work in 2 minutes. What is the average power?",null,"$P = W/t = 600/120 = 5$ W."],
 ["What is work in physics?",["Force times displacement in the direction of the force","Force times time","Mass times speed","Power divided by time"],"$W = Fs\\cos\\theta$."],
 ["What is power?",["Work per unit time","Force per unit area","Energy times time","Mass per unit volume"],"The unit is the watt = J/s."],
 ["What is momentum?",["$p = mv$","$p = ma$","$p = \\tfrac12mv^2$","$p = mgh$"],"It is conserved when the sum of external forces is zero."]
]);
