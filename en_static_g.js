// English: fixed questions (NUM, OKON, KJEMI, ELEK, PROD)
EN_Q("NUM",0,[
 ["By how much is the uncertainty reduced in each step of the bisection method?",["It is halved","It is squared","It is reduced by a factor of ten","It is unchanged"],"The method is robust but slow (linear convergence)."],
 ["What is the order of convergence of Newton's method near a simple root?",["Quadratic","Linear","Cubic","It does not converge"],"The number of correct digits roughly doubles with each step."],
 ["What is a drawback of Newton's method?",["It needs the derivative and can diverge with a poor initial guess","It is always slow","It only works for polynomials","It requires an interval with a sign change"],"The secant method avoids the derivative."],
 ["What does the bisection method need to start?",["An interval $[a, b]$ where $f(a)$ and $f(b)$ have opposite signs","The derivative","A starting point close to the root","That $f$ is a polynomial"],"The intermediate value theorem then guarantees a root in the interval."],
 ["What is fixed-point iteration?",["Solving $x = g(x)$ by iterating $x_{n+1} = g(x_n)$","Finding the maximum of a function","Splitting the interval in two","Integrating numerically"],"It converges if $|g'(x)| < 1$ near the root."]
]);
EN_Q("NUM",1,[
 ["Which polynomials does Simpson's rule integrate exactly?",["Up to degree 3","Up to degree 1","Up to degree 2","Only constants"],"It is based on parabolas but gets one degree \"for free\"."],
 ["How does the error of the trapezoidal rule decrease when $h$ is halved?",["To about a quarter ($O(h^2)$)","To half","To a sixteenth","It is unchanged"],"Simpson's rule is $O(h^4)$ and thus drops to a sixteenth."],
 ["What is Runge's phenomenon?",["Large oscillations near the ends in high-degree interpolation at equally spaced points","Newton's method diverging","Rounding errors","Euler becoming unstable"],"Solved with Chebyshev points or splines."],
 ["How many points are needed for an interpolating polynomial of degree $n$?",["$n + 1$","$n$","$2n$","$n - 1$"],"Two points give a straight line."],
 ["What is a spline?",["A piecewise polynomial that is smooth at the joints","A single high-degree polynomial","A straight line","A Fourier series"],"Cubic splines are the most common."],
 ["What is Gaussian quadrature?",["Integration with optimally chosen points and weights","Integration with equally sized intervals","Differentiation","Interpolation"],"$n$ points give an exact answer up to degree $2n-1$."]
]);
EN_Q("NUM",2,[
 ["What is the order of the explicit Euler method?",["1","2","4","0"],"Global error $O(h)$."],
 ["What is the order of the classical Runge–Kutta method (RK4)?",["4","2","1","8"],"It uses four function evaluations per step."],
 ["What is a stiff problem?",["A problem with very different time scales, where explicit methods need tiny steps","A problem without a solution","A linear problem","A problem with only one variable"],"Implicit methods such as backward Euler are stable here."],
 ["Why is implicit (backward) Euler more expensive per step?",["You must solve an equation (often a system of equations) for $y_{n+1}$ in every step","It uses four evaluations","It has a higher order","It requires a smaller $h$"],"In return it is stable for large steps."],
 ["What are local and global truncation error?",["Local is the error in one step; global is the accumulated error at the final time","They are the same","Global is always smaller","Local only applies to RK4"],"For Euler the local error is $O(h^2)$ and the global error $O(h)$."],
 ["Why do we rewrite a higher-order ODE as a system of first-order equations?",["Most numerical solvers are made for first-order systems","Because it gives an exact solution","Because higher-order equations have no solution","To avoid initial conditions"],"$y'' = f$ becomes $y_1' = y_2$, $y_2' = f$."]
]);
EN_Q("OKON",0,[
 ["Why is 100 NOK today worth more than 100 NOK in one year?",["The money can earn interest in the meantime (plus inflation and risk)","Because banknotes wear out","Because taxes rise","It is not"],"This is the basis for discounting."],
 ["What is the present value of an amount $F$ in $n$ years at interest rate $r$?",["$F/(1+r)^n$","$F(1+r)^n$","$F - nr$","$F/(1+nr)$"],"This is called discounting."],
 ["What is the real interest rate?",["The interest rate adjusted for inflation","The interest rate before tax","The interest rate on loans","The central bank's rate"],"$(1 + r_{nom})/(1 + i) - 1$."],
 ["What does compound interest do?",["Interest is also calculated on previously earned interest","The rate is fixed","Interest is paid only once","The rate decreases over time"],"It gives exponential growth."],
 ["What is the effective interest rate?",["The actual annual rate when compounding and fees are included","The rate before fees","The nominal rate divided by 12","The policy rate"],"A monthly rate of $r/12$ gives an effective rate of $(1 + r/12)^{12} - 1$."]
]);
EN_Q("OKON",1,[
 ["When is an investment profitable according to the net present value method?",["When the net present value (NPV) is greater than zero","When the payback period is under one year","When undiscounted income exceeds the investment","When the interest rate is zero"],"NPV > 0 means the return is better than the discount rate."],
 ["What is the internal rate of return (IRR)?",["The discount rate that makes the net present value zero","The bank's lending rate","Inflation","The tax rate"],"The investment is profitable if the IRR is higher than the required return."],
 ["What is the weakness of the simple payback method?",["It ignores the time value of money and the cash flows after the payback period","It is hard to calculate","It uses too high an interest rate","It requires the IRR"],"It is still useful as a rough measure of risk."],
 ["What is an annuity loan?",["A loan with equal payments (interest + principal)","A loan with equal principal repayments","A loan without interest","A loan repaid all at once"],"A serial loan has equal principal repayments, so the payment decreases."],
 ["What is a serial loan?",["A loan with equal principal repayments, so the payment decreases over time","A loan with equal payments","A loan without repayments","A consumer loan"],"Total interest is lower than for an annuity loan with the same rate and term."],
 ["Why use a discount rate that is higher than the bank rate?",["To account for risk and alternative returns","To get a higher NPV","Because the law requires it","To avoid tax"],"Higher risk gives a higher required return."]
]);
EN_Q("OKON",2,[
 ["What is the difference between fixed and variable costs?",["Fixed costs do not change with the quantity produced, variable costs do","Fixed costs are always larger","Variable costs are paid only once","They are the same"],"Rent is fixed, and raw materials are variable."],
 ["What is the contribution margin per unit?",["Price minus variable cost per unit","Price minus fixed cost","Revenue minus tax","Total cost divided by quantity"],"It has to cover the fixed costs."],
 ["What is straight-line depreciation?",["An equal loss of value each year over the lifetime","A loss of value at a fixed percentage of the remaining value","No loss of value","Writing down to zero in the first year"],"$(I - \\text{salvage value})/n$ per year."],
 ["What is opportunity cost?",["The value of the best alternative you give up","The cost of a backup option","A hidden cost in the accounts","The price of spare parts"],"It is central to decisions even though it does not appear in the accounts."],
 ["What is a sunk cost?",["Costs that have already been incurred and cannot be recovered, and that should not affect new decisions","Future costs","Variable costs","Tax"],"A classic mistake is continuing a project just because a lot has been spent on it."],
 ["What are economies of scale?",["The cost per unit falls as the production volume increases","The price rises with volume","Fixed costs increase","Quality decreases"],"Fixed costs are spread over more units."]
]);
EN_Q("KJEMI",0,[
 ["What is Avogadro's number?",["$6.022\\cdot10^{23}$ particles per mole","$6.022\\cdot10^{-23}$","$8.314$","$9.81$"],"One mole of carbon-12 weighs 12 g (very nearly)."],
 ["What is the limiting reactant?",["The one that is used up first and determines how much product is formed","The one with the largest mass","The one in excess","The catalyst"],"Convert to moles and compare with the coefficients."],
 ["Which equation is balanced?",["$\\mathrm{CH_4 + 2O_2 \\to CO_2 + 2H_2O}$","$\\mathrm{CH_4 + O_2 \\to CO_2 + H_2O}$","$\\mathrm{CH_4 + 3O_2 \\to CO_2 + 2H_2O}$","$\\mathrm{2CH_4 + O_2 \\to CO_2 + H_2O}$"],"Count C, H and O on both sides."],
 ["What is molarity (concentration)?",["Moles of substance per litre of solution","Grams per litre","Moles per kg of solvent","Mass percent"],"$c = n/V$, with the unit mol/L (M)."],
 ["What is molar mass?",["The mass of one mole of the substance, in g/mol","The mass of one molecule in kg","The number of atoms in a mole","The density"],"It is found by adding up the atomic masses from the periodic table."],
 ["What is percent yield?",["Actual yield divided by theoretical yield, times 100","Mass of reactants","Mass of product","Number of moles"],"It is rarely 100 % in practice."]
]);
EN_Q("KJEMI",1,[
 ["What is the definition of pH?",["$\\mathrm{pH} = -\\log[\\mathrm{H^+}]$","$\\mathrm{pH} = \\log[\\mathrm{H^+}]$","$\\mathrm{pH} = [\\mathrm{OH^-}]$","$\\mathrm{pH} = 14[\\mathrm{H^+}]$"],"Low pH means an acidic solution."],
 ["What holds for water at 25 °C?",["$\\mathrm{pH + pOH} = 14$","$\\mathrm{pH = pOH} = 14$","$\\mathrm{pH} \\cdot \\mathrm{pOH} = 14$","$\\mathrm{pH} - \\mathrm{pOH} = 7$"],"$K_w = 10^{-14}$."],
 ["What is a buffer?",["A solution of a weak acid and its conjugate base, which resists changes in pH","A strong acid","Distilled water","A catalyst"],"Blood, for example, is buffered around pH 7.4."],
 ["What does Le Chatelier's principle say?",["An equilibrium shifts so as to counteract an external change","All reactions go to completion","The temperature is always constant","Pressure does not affect equilibria"],"For example, increased pressure favours the side with fewer gas molecules."],
 ["What characterizes a strong acid?",["It ionizes (dissociates) completely in water","It is concentrated","It is toxic","It has a high pH"],"Examples are HCl, HNO₃ and H₂SO₄ (first step)."]
]);
EN_Q("KJEMI",2,[
 ["What does it mean that a reaction is exothermic?",["It releases heat: $\\Delta H < 0$","It absorbs heat","It only happens at high temperature","It is slow"],"Combustion is exothermic."],
 ["What is oxidation?",["Loss of electrons","Gain of electrons","Gain of protons","Loss of neutrons"],"Memory aid: OIL RIG (Oxidation Is Loss, Reduction Is Gain)."],
 ["When is a reaction spontaneous at constant $T$ and $p$?",["When $\\Delta G = \\Delta H - T\\Delta S < 0$","When $\\Delta H > 0$","When $\\Delta S < 0$","When $\\Delta G > 0$"],"Spontaneous does not necessarily mean fast."],
 ["What happens in a galvanic cell?",["A spontaneous redox reaction produces an electric current","A current drives a non-spontaneous reaction","Water is split","Metals are melted"],"A battery is an example. Electrolysis goes the other way."],
 ["What is a catalyst?",["A substance that increases the reaction rate without being consumed, by lowering the activation energy","A substance that shifts the equilibrium","A product","A solvent"],"The equilibrium constant does not change."],
 ["What is electronegativity?",["An atom's ability to attract electrons in a bond","The number of electrons","The atomic mass","The ionization energy"],"Fluorine has the highest electronegativity."],
 ["What is an ionic bond?",["Electrostatic attraction between positive and negative ions","Sharing of electron pairs","A bond between metal atoms","A hydrogen bond"],"Example: NaCl."],
 ["Which metal is used as a sacrificial anode to protect steel in seawater?",["Zinc","Copper","Gold","Silver"],"Zinc is less noble than steel and corrodes instead."]
]);
EN_Q("ELEK",0,[
 ["Roughly how large is the voltage drop across a forward-biased silicon diode?",["0.7 V","0.1 V","2 V","5 V"],"Schottky diodes have around 0.3 V, and LEDs 1.8–3.3 V."],
 ["What is a Zener diode typically used for?",["Holding a stable reference voltage in reverse bias","Amplifying signals","Producing light","Rectifying large currents"],"It conducts at the Zener voltage in reverse bias."],
 ["How are the collector and base currents related in a BJT in the active region?",["$I_C = \\beta I_B$","$I_C = I_B$","$I_C = I_B/\\beta$","$I_C = 0$"],"$\\beta$ is typically 50–300."],
 ["What controls the current in a MOSFET?",["The voltage between gate and source","The current into the gate","The temperature","The drain current"],"The gate is insulated, so it draws almost no DC current."],
 ["What does a bridge rectifier do?",["Converts both half-cycles of an AC voltage to the same polarity","Amplifies the voltage","Filters out DC","Produces AC from DC"],"It uses four diodes."],
 ["What is a photodiode?",["A diode that produces a current when illuminated","A diode that emits light","A diode that stabilizes voltage","A diode for high voltage"],"It is used in light sensors and optocouplers."],
 ["What is the difference between NPN and PNP?",["Polarity: in an NPN current flows into the collector when the base is positive; PNP is the opposite","NPN is always larger","PNP has no base","They are the same"],"NPN is most often used to switch loads to ground."]
]);
EN_Q("ELEK",1,[
 ["Which two rules apply to an ideal op-amp with negative feedback?",["No current flows into the inputs, and the two inputs are at the same voltage","The output is always zero","The inputs draw infinite current","The gain is 1"],"The second rule is called the virtual short."],
 ["What is the gain of an inverting amplifier?",["$-R_f/R_{in}$","$1 + R_f/R_{in}$","$R_{in}/R_f$","1"],"The minus sign means a 180° phase shift."],
 ["What is the gain of a non-inverting amplifier?",["$1 + R_f/R_g$","$-R_f/R_g$","$R_g/R_f$","0"],"It is always at least 1."],
 ["What is a voltage follower (buffer) used for?",["To give high input impedance and low output impedance with a gain of 1","To invert the signal","To integrate","To filter high frequencies"],"It prevents the source from being loaded."],
 ["What happens if the ideal output would exceed the supply voltage?",["The output saturates (clips) near the supply voltage","The op-amp amplifies anyway","The output becomes zero","The gain doubles"],"Rail-to-rail op-amps get closest to the supply."],
 ["What does a comparator do?",["Compares two voltages and gives a high or low output","Amplifies linearly","Filters noise","Generates a sine wave"],"Hysteresis (Schmitt trigger) stops the output from toggling back and forth due to noise."],
 ["What is an op-amp integrator?",["A circuit with a capacitor in the feedback path whose output is proportional to the integral of the input","A circuit with two resistors","A voltage follower","A diode circuit"],"$V_o = -\\tfrac{1}{RC}\\int V_{in}\\,dt$."]
]);
EN_Q("ELEK",2,[
 ["What is the cutoff frequency of an RC low-pass filter?",["$f_c = \\dfrac{1}{2\\pi RC}$","$f_c = RC$","$f_c = 2\\pi RC$","$f_c = R/C$"],"At $f_c$ the gain is $1/\\sqrt2$, i.e. −3 dB."],
 ["What does a high-pass filter let through?",["Frequencies above the cutoff frequency","Frequencies below the cutoff frequency","Only DC","Nothing"],"It is used, for example, to remove a DC level (AC coupling)."],
 ["How steeply does a first-order low-pass filter roll off above the cutoff frequency?",["20 dB per decade","6 dB per decade","40 dB per decade","It does not roll off"],"A second-order filter rolls off at 40 dB per decade."],
 ["What does −3 dB mean?",["About half the power ($1/\\sqrt2$ in amplitude)","Zero signal","Double the power","Three times lower amplitude"],"$20\\log(1/\\sqrt2) \\approx -3.01$ dB."],
 ["What is a band-pass filter?",["A filter that passes frequencies within a certain range","A filter that blocks all frequencies","A low-pass filter","A filter for DC"],"It can be built as a high-pass followed by a low-pass."],
 ["What is the signal-to-noise ratio (SNR)?",["The ratio of signal power to noise power, often in dB","The frequency of the signal","The gain","The bandwidth"],"$SNR_{dB} = 10\\log(P_s/P_n)$."]
]);
EN_Q("PROD",0,[
 ["What is the typical sequence of a product development process (Ulrich & Eppinger)?",["Planning → concept development → system-level design → detail design → testing → production ramp-up","Detail design → concept → testing","Production → planning → sales","Testing → concept → planning"],"Later changes cost more, so the early phases matter."],
 ["What is the difference between a customer need and a specification?",["A need is expressed in the customer's language; a specification is a measurable quantity with a unit and a target value","They are the same","Specifications are vague","Needs always include numbers"],"For example: \"easy to carry\" becomes \"mass < 1.2 kg\"."],
 ["What is a stage-gate system?",["Development is split into phases with decision points (gates) in between","A type of prototype","Production equipment","A quality standard"],"At each gate: go, kill or recycle."],
 ["What does a House of Quality (QFD) show?",["The relationship between customer needs and technical characteristics","The factory floor plan","The budget","The project schedule"],"The \"roof\" shows how the technical characteristics affect each other."],
 ["Why make a function analysis (function tree)?",["To describe what the product must do, independent of the solution","To choose a colour","To calculate cost","To make drawings"],"It opens up more solution alternatives."],
 ["What is a requirements specification?",["A document with measurable requirements the product must meet","A sales brochure","A drawing of the finished product","A budget"],"It is used to evaluate concepts and verify the finished product."],
 ["What is a persona in product development?",["A fictional but realistic user who represents a target group","A real customer","A competitor","A project manager"],"It helps the team keep the focus on the user's needs."]
]);
EN_Q("PROD",1,[
 ["What is a morphological matrix?",["A table of sub-functions and possible solutions for each, which can be combined into concepts","A type of stiffness matrix","A Gantt chart","A risk matrix"],"It systematically produces many concepts."],
 ["What is a Pugh matrix (concept screening)?",["Concepts are rated +, 0 or − against a reference concept","A weighted cost calculation","An FEM model","A market analysis"],"Afterwards you can do weighted concept scoring."],
 ["What is a basic rule of brainstorming?",["Do not criticize ideas along the way, and aim for quantity","Only include realistic ideas","Let the leader decide","Discuss each idea thoroughly before the next"],"Evaluation comes in a later phase."],
 ["Why should you develop several concepts before choosing?",["To explore the solution space and avoid locking in too early","It is an ISO requirement","It always saves money","It is not necessary"],"The first concept is rarely the best."],
 ["What is a functional prototype?",["A prototype that tests whether the solution works, without focus on appearance","A model that only shows the appearance","A finished mass-produced unit","A 3D drawing"],"A \"looks-like\" prototype shows the form, a \"works-like\" prototype shows the function."]
]);
EN_Q("PROD",2,[
 ["What is the main goal of DFA (Design for Assembly)?",["Fewer parts and simpler assembly","Higher material cost","More screw joints","More complex parts"],"Ask for every part: does it have to be a separate part?"],
 ["Why do injection-moulded parts have a draft angle?",["So the part releases easily from the mould","For appearance","To save plastic","To increase strength"],"Typically 0.5–2°."],
 ["What is a typical limitation of FDM 3D printing?",["Overhangs beyond about 45° need support material","It can only print metals","It requires a mould","It cannot make holes"],"Parts are also weaker between the layers."],
 ["What is the relationship between tolerance and cost?",["Tighter tolerances usually mean higher cost","Tighter tolerances are always cheaper","No relationship","Tolerances only affect weight"],"Only specify tight tolerances where the function requires it."],
 ["What is the difference between alpha and beta prototypes?",["Alpha tests function with prototype parts; beta is close to the final product and is often tested by customers","Alpha is the finished product","Beta is only digital","They are the same"],"Rapid prototyping is used a lot in the alpha phase."],
 ["Which phases are included in a life cycle assessment (LCA) of a product?",["Raw materials, production, transport, use and disposal","Only production","Only use","Only design"],"Energy use, CO₂ emissions and recycling are among the things assessed."],
 ["What is DFM (Design for Manufacturing)?",["Designing parts so they are easy and cheap to produce","Designing for marketing","Designing for recycling","Designing for assembly"],"Examples are uniform wall thickness and standardized hole sizes."],
 ["Why should the wall thickness be uniform in injection-moulded parts?",["To avoid sink marks, warping and internal stresses","To save paint","To increase weight","It does not matter"],"Thick sections cool more slowly than thin ones."]
]);
