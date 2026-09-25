// English: fixed questions (FAST, FLUID, FEM, SVING, VARME)
EN_Q("FAST",0,[
 ["What is Poisson's ratio $\\nu$?",["The ratio of lateral contraction to axial strain: $\\nu = -\\varepsilon_{lat}/\\varepsilon_{axial}$","The ratio of stress to strain","The ratio of shear stress to normal stress","The yield strength divided by the tensile strength"],"For steel $\\nu \\approx 0.3$."],
 ["A bar is fixed at both ends and heated. What happens?",["A compressive stress $\\sigma = E\\alpha\\Delta T$ develops","It gets longer without any stress","A tensile stress develops","Nothing"],"It wants to expand but is prevented from doing so."],
 ["What does Saint-Venant's principle say?",["Far from where the load is applied, the stress distribution depends only on the resultant, not on how the load is applied","The stress is always uniformly distributed","Strain is proportional to stress","The material is isotropic"],"\"Far\" typically means about one cross-section width."],
 ["What is a stress concentration factor $K_t$?",["The ratio of the maximum local stress to the nominal stress at a hole or notch","The safety factor","The ratio of $R_m$ to $R_e$","Young's modulus divided by the shear modulus"],"For a small circular hole in a large plate, $K_t \\approx 3$."],
 ["How are $E$, $G$ and $\\nu$ related for isotropic materials?",["$G = \\dfrac{E}{2(1+\\nu)}$","$G = E(1+\\nu)$","$G = E/\\nu$","$G = 2E$"],"For steel: $210/(2\\cdot 1.3) \\approx 81$ GPa."],
 ["What is shear strain $\\gamma$?",["The change in angle between two lines that were originally at right angles","Change in length per length","Change in volume","Rotation of the whole body"],"$\\tau = G\\gamma$."],
 ["What is the difference between engineering stress and true stress?",["Engineering stress uses the original area; true stress uses the current area","They are the same","True stress only applies in compression","Engineering stress is always larger"],"The difference becomes large after necking."]
]);
EN_Q("FAST",1,[
 ["How is the shear stress distributed over a circular cross-section in torsion?",["Linearly, zero at the centre and largest at the surface","Uniformly","Largest at the centre","Parabolically, zero at the surface"],"$\\tau = Tr/J$."],
 ["What is the polar moment of inertia of a solid circular shaft?",["$J = \\pi d^4/32$","$J = \\pi d^4/64$","$J = \\pi d^3/16$","$J = \\pi d^2/4$"],"$\\pi d^4/64$ is $I$ about a diameter, and $J = 2I$."],
 ["Why are hollow shafts often advantageous?",["The material near the centre contributes little to $J$, so hollow shafts give a lot of stiffness per kilogram","They are always cheaper","They withstand higher temperatures","They have no shear stress"],"As much material as possible should be far from the centre."],
 ["How is the angle of twist of a shaft calculated?",["$\\theta = \\dfrac{TL}{GJ}$","$\\theta = \\dfrac{TJ}{GL}$","$\\theta = \\dfrac{GJ}{TL}$","$\\theta = TLGJ$"],"$\\theta$ comes out in radians."],
 ["What is the bending stress at distance $y$ from the neutral axis?",["$\\sigma = My/I$","$\\sigma = MI/y$","$\\sigma = M/(yI)$","$\\sigma = Iy/M$"],"Navier's formula (the flexure formula)."],
 ["Where is the shear stress largest in a rectangular beam in bending?",["At the neutral axis","At the outer fibres","It is uniform","Only at the supports"],"For a rectangle $\\tau_{max} = 1.5V/A$."],
 ["What is the torsional section modulus $W_p$ of a solid shaft?",["$\\pi d^3/16$","$\\pi d^3/32$","$\\pi d^4/32$","$\\pi d^2/4$"],"$\\tau_{max} = T/W_p$."]
]);
EN_Q("FAST",2,[
 ["What characterizes the principal stresses?",["The shear stress is zero in those directions","They are always equal","They only act in compression","They equal the von Mises stress"],"They are the largest and smallest normal stresses."],
 ["Where is the centre of Mohr's circle for plane stress?",["At $(\\sigma_x + \\sigma_y)/2$","At $\\sigma_x$","At the origin","At $\\tau_{xy}$"],"The radius is $\\sqrt{((\\sigma_x - \\sigma_y)/2)^2 + \\tau_{xy}^2}$."],
 ["What is the von Mises criterion?",["Yielding occurs when the equivalent stress (from the distortion energy) reaches the yield strength","Fracture occurs at the largest normal stress","Buckling occurs at $P_{cr}$","The material is brittle"],"It is mostly used for ductile materials."],
 ["How does the length affect Euler's buckling load?",["$P_{cr} \\propto 1/L^2$","$P_{cr} \\propto L$","$P_{cr} \\propto 1/L$","The length does not matter"],"Doubling the length gives a quarter of the buckling load."],
 ["What is the effective buckling length of a column that is fixed at the base and free at the top?",["$2L$","$L$","$0.7L$","$0.5L$"],"Pinned at both ends gives $L$, and fixed at both ends gives $0.5L$."],
 ["What is the slenderness ratio $\\lambda$ of a column?",["Effective length divided by radius of gyration, $L_e/i$","Length divided by weight","Height divided by width","E divided by $R_e$"],"High slenderness gives buckling before yielding."],
 ["What does Tresca's yield criterion say?",["Yielding occurs when the maximum shear stress reaches $R_e/2$","Yielding at the largest normal stress","Yielding when the von Mises stress is 0","Yielding at $E\\varepsilon$"],"It is slightly more conservative than von Mises."]
]);
EN_Q("FLUID",0,[
 ["What determines the pressure in a fluid at rest?",["Only the depth (and the fluid density)","The shape of the container","The volume of fluid","The area of the bottom"],"$p = p_0 + \\rho gh$. This is the hydrostatic paradox."],
 ["What does Archimedes' principle say?",["The buoyant force equals the weight of the displaced fluid","The pressure is the same in all directions","Weight equals mass","The buoyancy depends on depth"],"$F_B = \\rho_{fluid}gV_{displaced}$."],
 ["What is the difference between gauge pressure and absolute pressure?",["Gauge pressure is measured relative to atmospheric pressure","Absolute pressure is always lower","They are the same","Gauge pressure only applies to gases"],"$p_{abs} = p_{atm} + p_{gauge}$, where $p_{atm} \\approx 101.3$ kPa."],
 ["Why can a hydraulic press produce a large force?",["The pressure is the same on both pistons, so a large area gives a large force","The fluid is compressed","The fluid amplifies the energy","Friction helps"],"$F_2 = F_1A_2/A_1$. Energy is conserved, so the small piston must move further."],
 ["Why does water rise in a thin glass tube (capillarity)?",["Adhesion between water and glass, and surface tension","Atmospheric pressure increases","The water becomes lighter","Magnetism"],"Mercury drops instead, because its cohesion is stronger."],
 ["What does a U-tube manometer measure?",["A pressure difference via the height difference of a liquid column","Temperature","Flow velocity directly","Viscosity"],"$\\Delta p = \\rho g\\Delta h$."]
]);
EN_Q("FLUID",1,[
 ["What does the continuity equation say for incompressible flow in a pipe?",["$A_1v_1 = A_2v_2$","$p_1 = p_2$","$v_1 = v_2$","$A_1p_1 = A_2p_2$"],"The volume flow rate $Q$ is constant."],
 ["What assumptions lie behind Bernoulli's equation?",["Steady, frictionless, incompressible flow along a streamline","Turbulent flow","Compressible gas","Flow with a pump"],"Losses and pumps are added in the extended energy equation."],
 ["What happens to the pressure where a pipe narrows (venturi)?",["It drops because the velocity increases","It rises","It is unchanged","It becomes zero"],"The venturi meter uses this to measure flow."],
 ["What is stagnation pressure?",["The pressure where the flow is brought completely to rest: $p + \\tfrac12\\rho v^2$","The pressure in a still tank","Atmospheric pressure","The pressure at the bottom of a pipe"],"A pitot tube measures it."],
 ["What is mass flow rate?",["$\\dot m = \\rho Av$","$\\dot m = Av$","$\\dot m = \\rho v^2$","$\\dot m = pA$"],"For incompressible flow both $\\dot m$ and $Q$ are conserved."],
 ["What is a pitot tube?",["An instrument that measures velocity from the difference between stagnation pressure and static pressure","A pump","A valve","A manometer for tanks"],"Used on aircraft: $v = \\sqrt{2\\Delta p/\\rho}$."]
]);
EN_Q("FLUID",2,[
 ["What does the Reynolds number describe?",["The ratio of inertial forces to viscous forces","The ratio of pressure to gravity","Conduction versus convection","Velocity divided by the speed of sound"],"$Re = \\rho vD/\\mu$."],
 ["Below roughly which Reynolds number is pipe flow laminar?",["2300","230","23,000","1"],"Above about 4000 it is turbulent, and in between is a transition region."],
 ["What is the no-slip condition?",["The fluid has the same velocity as the wall where it touches it","The fluid slides freely along the wall","The pressure is zero at the wall","The velocity is largest at the wall"],"It gives rise to the boundary layer."],
 ["What does the Darcy–Weisbach equation express?",["The friction loss in a pipe: $h_f = f\\dfrac{L}{D}\\dfrac{v^2}{2g}$","Continuity","Buoyancy","Hydrostatic pressure"],"For laminar flow $f = 64/Re$."],
 ["What happens to the pressure loss in a pipe if the velocity doubles (at roughly constant $f$)?",["It quadruples","It doubles","It halves","It is unchanged"],"$h_f \\propto v^2$."],
 ["What does the Moody chart describe?",["The friction factor as a function of Reynolds number and relative roughness","Pressure versus depth","Viscosity versus temperature","Pump curves"],"For turbulent flow the Colebrook equation is used."],
 ["What is a minor loss (local loss)?",["Pressure loss in bends, valves and contractions: $K v^2/(2g)$","Friction loss in straight pipes","Loss due to elevation","Loss in the pump"],"$K$ is a loss coefficient from a table."]
]);
EN_Q("FEM",0,[
 ["What is the stiffness matrix of a linear bar element (1D)?",["$\\dfrac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$","$\\dfrac{EA}{L}\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$","$\\dfrac{EI}{L^3}\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$","$EA\\,L\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$"],"It is symmetric, and singular for a single element on its own."],
 ["Why is the global stiffness matrix singular before the boundary conditions are applied?",["The structure can move as a rigid body","Because it is symmetric","Because E is too small","Because the elements are too large"],"Enough degrees of freedom must be locked to prevent rigid-body motion."],
 ["What happens during assembly?",["The element matrices are added into the global matrix according to which degrees of freedom they share","All element matrices are multiplied","The elements are averaged","Each element matrix is inverted"],"Contributions at shared nodes are summed."],
 ["Why is the stiffness matrix symmetric for linear elasticity?",["It comes from a symmetric bilinear form (Maxwell–Betti reciprocity)","Because the elements are the same length","Because the load is symmetric","It is not"],"Symmetry halves the storage and allows faster solvers."],
 ["What do you finally solve in a linear static FEM analysis?",["$K\\vec u = \\vec f$ for the nodal displacements","$\\vec u = K\\vec f$","$\\det K = 0$","$K = \\vec f$"],"Stresses and strains are computed from $\\vec u$ afterwards."],
 ["What is a degree of freedom (DOF) in FEM?",["An unknown displacement or rotation at a node","An element","A load","A material parameter"],"The total number of DOFs determines the size of the system of equations."],
 ["Why is the stiffness matrix usually sparse?",["Each node is only connected to a few neighbours","Because E is small","Because the loads are small","It is always full"],"Sparse storage and solvers save a lot of memory and time."]
]);
EN_Q("FEM",1,[
 ["What do you gain by rewriting to the weak form?",["Lower differentiability requirements: one derivative is moved onto the test function","Exact solutions","Fewer unknowns","The boundary conditions disappear"],"You integrate by parts."],
 ["What are the linear shape functions on $[0, 1]$?",["$N_1 = 1 - \\xi$ and $N_2 = \\xi$","$N_1 = \\xi^2$ and $N_2 = 1 - \\xi^2$","$N_1 = N_2 = 1/2$","$N_1 = \\sin\\xi$ and $N_2 = \\cos\\xi$"],"Each is 1 at its own node and 0 at the other."],
 ["What does it mean that the shape functions form a \"partition of unity\"?",["Their sum is 1 everywhere in the element","The integral of each is 1","They are orthogonal","They are always positive"],"Then the element can represent a constant displacement (rigid-body motion)."],
 ["What characterizes Galerkin's method?",["The test functions are chosen from the same space as the shape functions","No test functions are used","The error is minimized at a single point","Only Fourier series are used"],"Standard FEM is Bubnov–Galerkin."],
 ["What is the difference between essential and natural boundary conditions?",["Essential (Dirichlet) are imposed directly on the unknowns; natural (Neumann) enter through the boundary term of the weak form","They are the same","Natural ones only apply to heat","Essential ones come from the load"],"Displacement is essential, while force or flux is natural."],
 ["Which polynomials does 2-point Gauss quadrature integrate exactly?",["Up to degree 3","Up to degree 1","Up to degree 2","All"],"$n$ points integrate exactly up to degree $2n-1$."],
 ["What are isoparametric elements?",["Elements where the same shape functions are used for geometry and displacement","Elements with equal sides","Elements without nodes","Only triangles"],"This makes it easy to create curved elements."],
 ["Why use a reference element (e.g. $[-1,1]$)?",["Integration and shape functions are defined once and mapped to each element","To make the elements smaller","Because it is required by law","To avoid boundary conditions"],"The Jacobian matrix takes care of the mapping."]
]);
EN_Q("FEM",2,[
 ["What characterizes a CST element (linear triangle)?",["Constant strain and stress in the whole element","Quadratic displacement","No degrees of freedom","Exact for bending"],"It needs a fine mesh where stress gradients are large."],
 ["What is the difference between h- and p-refinement?",["h: smaller elements; p: higher polynomial degree","h: higher degree; p: smaller elements","h only applies in 3D","They are the same"],"Both converge towards the correct solution."],
 ["What is shear locking?",["Linear elements become artificially stiff in bending","The mesh cannot be generated","The material yields","The shear force becomes zero"],"Solved with quadratic elements or reduced integration."],
 ["Which quantity is continuous between elements in standard displacement-based FEM?",["The displacements","The stresses","Both stresses and strains","None"],"Stresses often jump between elements and are smoothed in post-processing."],
 ["Where should the mesh be finest?",["Where the stress gradients are large, e.g. at holes and sharp corners","Where there is little load","Evenly everywhere","At boundary conditions with zero displacement"],"Do a convergence study to check."],
 ["Why can a sharp re-entrant corner give stresses that keep growing as the mesh is refined?",["It is a theoretical singularity, and the stress is infinite in the model","The program has a bug","The material is brittle","The load is too large"],"Model it with a real radius instead."],
 ["What is the difference between linear and nonlinear FEM analysis?",["Nonlinear includes large deformations, plasticity or contact, and is solved iteratively","Linear is always more accurate","Nonlinear only uses triangles","There is no difference"],"Newton–Raphson is often used in nonlinear analysis."],
 ["How can you check that an FEM model is reasonable?",["Check the reaction forces against the applied load and compare with a hand calculation","See if the colours look nice","Increase the load until it breaks","Use the coarsest possible mesh"],"Also check units and that the deformation looks physically right."]
]);
EN_Q("SVING",0,[
 ["What is the natural frequency of a mass–spring system?",["$\\omega_n = \\sqrt{k/m}$","$\\omega_n = k/m$","$\\omega_n = \\sqrt{m/k}$","$\\omega_n = km$"],"$f_n = \\omega_n/(2\\pi)$."],
 ["Two springs in parallel have the stiffness …",["$k_1 + k_2$","$\\dfrac{k_1k_2}{k_1+k_2}$","$k_1k_2$","$|k_1 - k_2|$"],"In series it becomes $\\dfrac{k_1k_2}{k_1+k_2}$, just like resistors in parallel."],
 ["What happens to the natural frequency if the mass is quadrupled?",["It halves","It quadruples","It doubles","It is unchanged"],"$\\omega_n \\propto 1/\\sqrt m$."],
 ["How can you find the natural frequency from the static deflection $\\delta$?",["$\\omega_n = \\sqrt{g/\\delta}$","$\\omega_n = g\\delta$","$\\omega_n = \\delta/g$","$\\omega_n = \\sqrt{\\delta/g}$"],"$k\\delta = mg$ gives $k/m = g/\\delta$."],
 ["How many natural frequencies does a system with $n$ degrees of freedom have?",["$n$","1","$2n$","Infinitely many"],"Each natural frequency has an associated mode shape."],
 ["What is a torsional vibration?",["A twisting vibration, e.g. of a shaft with a flywheel","A vibration along the length","A sound wave","An electrical oscillation"],"$\\omega_n = \\sqrt{k_t/J}$."]
]);
EN_Q("SVING",1,[
 ["What does $\\zeta = 1$ mean?",["Critical damping: fastest return without oscillation","No damping","Overdamped","Unstable"],"$\\zeta < 1$ is underdamped and $\\zeta > 1$ is overdamped."],
 ["What is the damped natural frequency?",["$\\omega_d = \\omega_n\\sqrt{1-\\zeta^2}$","$\\omega_d = \\omega_n(1+\\zeta)$","$\\omega_d = \\zeta\\omega_n$","$\\omega_d = \\omega_n/\\zeta$"],"For small $\\zeta$, $\\omega_d \\approx \\omega_n$."],
 ["What is the logarithmic decrement?",["$\\delta = \\ln(x_1/x_2)$ for two successive peaks","$x_1 - x_2$","$x_1/x_2$","$\\ln(\\omega_n)$"],"For small $\\zeta$, $\\zeta \\approx \\delta/(2\\pi)$."],
 ["What is the critical damping coefficient?",["$c_c = 2\\sqrt{km}$","$c_c = \\sqrt{km}$","$c_c = k/m$","$c_c = 2km$"],"$\\zeta = c/c_c$."],
 ["What happens to the amplitude in a free, underdamped vibration?",["It decays exponentially","It is constant","It grows","It drops to zero instantly"],"The envelope is $e^{-\\zeta\\omega_nt}$."],
 ["Which damping gives the fastest return to equilibrium without overshoot?",["Critical damping","No damping","Heavy overdamping","Light damping"],"Car shock absorbers are often designed slightly below critical."]
]);
EN_Q("SVING",2,[
 ["How large is the amplification at resonance for a lightly damped system?",["About $1/(2\\zeta)$","1","$2\\zeta$","Infinite regardless of damping"],"With $\\zeta = 0.05$ the amplification is about 10."],
 ["When does vibration isolation reduce the transmitted force?",["When the frequency ratio $r = \\omega/\\omega_n > \\sqrt2$","When $r < 1$","When $r = 1$","Never"],"The isolators should therefore be soft enough to give a low natural frequency."],
 ["What is the unbalance force from a rotating mass $m$ with eccentricity $e$?",["$me\\omega^2$","$me\\omega$","$m\\omega^2$","$me/\\omega$"],"It grows with the square of the rotational speed."],
 ["What happens to the amplitude far above resonance ($r \\gg 1$) for a force-excited mass?",["It tends to zero","It tends to infinity","It tends to the static deflection","It is constant"],"The mass cannot keep up with the force."],
 ["What is a tuned mass damper?",["An extra mass–spring tuned to the natural frequency, which absorbs the vibrations","A rubber mat","A hydraulic cylinder","A heavier foundation"],"Used in skyscrapers and bridges."],
 ["What is the phase angle between force and displacement at resonance?",["90°","0°","180°","45°"],"Below resonance they are nearly in phase, and above resonance nearly in antiphase."]
]);
EN_Q("VARME",0,[
 ["What does Fourier's law say?",["$\\dot q = -k\\,dT/dx$","$\\dot q = hA\\Delta T$","$\\dot q = \\varepsilon\\sigma T^4$","$Q = mc\\Delta T$"],"Heat flows from hot to cold, hence the minus sign."],
 ["What is the thermal resistance of a plane layer?",["$R = L/(kA)$","$R = kA/L$","$R = L\\,kA$","$R = 1/L$"],"Layers in series add up, just like electrical resistors."],
 ["Why does mineral wool insulate well?",["It traps still air, which has a low thermal conductivity","It reflects all radiation","It has a high density","It conducts electricity"],"$k \\approx 0.035$ W/(m·K)."],
 ["What does the U-value of a wall tell you?",["Heat loss per m² per degree of temperature difference","The thickness of the wall","The density","The price of the material"],"The unit is W/(m²·K), and a low U-value means good insulation."],
 ["Which material has the highest thermal conductivity?",["Copper","Steel","Concrete","Air"],"Copper about 400, steel about 50, concrete about 1.4 and air about 0.026 W/(m·K)."],
 ["What is a thermal bridge?",["An area of the structure with much higher heat conduction than its surroundings","A bridge in a cold climate","An insulation layer","A type of heat pump"],"Examples are steel beams passing through the insulation."]
]);
EN_Q("VARME",1,[
 ["What is Newton's law of cooling?",["$\\dot Q = hA(T_s - T_\\infty)$","$\\dot Q = kA\\Delta T/L$","$\\dot Q = \\sigma T^4$","$\\dot Q = mc$"],"$h$ is the heat transfer coefficient."],
 ["Which type of convection typically has the highest $h$?",["Boiling or condensing water","Natural convection in air","Forced convection in air","Still air"],"Phase changes give thousands of W/(m²·K)."],
 ["What does the Nusselt number express?",["The ratio of convective to conductive heat transfer","The ratio of inertia to viscosity","Radiation versus conduction","Temperature versus pressure"],"$Nu = hL/k$."],
 ["When can you use the lumped capacitance method (uniform temperature in the body)?",["When the Biot number $Bi = hL_c/k < 0.1$","When $Bi > 10$","Always","Only in water"],"Then internal conduction is much faster than convection at the surface."],
 ["What distinguishes forced from natural convection?",["Forced is driven by a fan or pump; natural by buoyancy from temperature differences","Natural always gives the highest $h$","Forced only occurs in water","They are the same"],"Natural convection in air has $h$ of about 2–25 W/(m²·K)."],
 ["What do fins (heat sinks) do?",["Increase the surface area and thereby the heat dissipation","Insulate","Reduce $h$","Raise the temperature"],"The fin efficiency tells how effective the fin is."]
]);
EN_Q("VARME",2,[
 ["What does the Stefan–Boltzmann law say?",["The emitted power is $\\varepsilon\\sigma AT^4$","The power is proportional to $T$","The power is proportional to $1/T^2$","Radiation requires a medium"],"$T$ must be in kelvin."],
 ["What is a black body?",["An ideal absorber and emitter with $\\varepsilon = 1$","A body painted black","A body without temperature","A body that reflects everything"],"Real surfaces have $\\varepsilon < 1$."],
 ["What does Wien's displacement law say?",["$\\lambda_{max}T \\approx 2898$ µm·K","$\\lambda T^4$ is constant","$\\lambda = c/f$","$\\lambda_{max} \\propto T$"],"Hotter bodies peak at shorter wavelengths."],
 ["What is the time constant for a body cooling with lumped capacitance?",["$\\tau = \\rho Vc/(hA)$","$\\tau = hA/(\\rho Vc)$","$\\tau = k/h$","$\\tau = L/k$"],"$T - T_\\infty = (T_0 - T_\\infty)e^{-t/\\tau}$."],
 ["Why do thermos flasks have a shiny, silvered inside?",["Low emissivity reduces radiative heat transfer","It looks nice","To increase conduction","To increase convection"],"The vacuum stops conduction and convection."],
 ["What is emissivity?",["How well a surface radiates compared with a black body","How hot the surface is","How smooth the surface is","How thick the surface is"],"The value lies between 0 and 1."]
]);
