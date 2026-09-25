// English: fixed questions (DAVE3700 units 1–2, STKD6610, ELFT2400, DAVE3705)
EN_Q("DAVE3700",1,[
 ["$\\displaystyle\\iint_{[0,1]\\times[0,1]} xy\\,dA = $",null,"$\\int_0^1 x\\,dx\\cdot\\int_0^1 y\\,dy = \\tfrac12\\cdot\\tfrac12 = \\tfrac14 = 0.25$."],
 ["What is the area element in polar coordinates?",["$dA = r\\,dr\\,d\\theta$","$dA = dr\\,d\\theta$","$dA = r^2\\,dr\\,d\\theta$","$dA = \\sin\\theta\\,dr\\,d\\theta$"],"The factor $r$ is the Jacobian determinant."],
 ["What is the volume element in spherical coordinates?",["$\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\rho\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\rho^2\\,d\\rho\\,d\\varphi\\,d\\theta$","$\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$"],"$\\varphi$ is measured from the $z$-axis."],
 ["What is the area of a circle with radius 2, computed as $\\int_0^{2\\pi}\\!\\int_0^2 r\\,dr\\,d\\theta$?",null,"$2\\pi\\cdot 2 = 4\\pi \\approx 12.57$."],
 ["What does Fubini's theorem say?",["For continuous functions on a rectangle the order of integration can be swapped","All integrals are zero","Double integrals cannot be computed","The integral depends on the order"],"$\\iint f\\,dA = \\int\\!\\int f\\,dx\\,dy = \\int\\!\\int f\\,dy\\,dx$."],
 ["What is the Jacobian determinant in a change of variables?",["The factor that scales the area or volume element","The sum of the partial derivatives","Always 1","The length of the gradient"],"For polar coordinates it is $r$."]
]);
EN_Q("DAVE3700",2,[
 ["$\\nabla\\cdot(x, y, z) = $",null,"$1 + 1 + 1 = 3$."],
 ["$\\nabla\\times(\\nabla f) = $",["$\\vec 0$","$\\nabla^2 f$","$\\nabla f$","$1$"],"A gradient field is irrotational."],
 ["Green's theorem links a line integral around a closed curve to …",["a double integral over the enclosed region","a volume integral","the derivative at one point","an infinite series"],"$\\oint P\\,dx + Q\\,dy = \\iint (Q_x - P_y)\\,dA$."],
 ["$\\vec F = (y, x)$. Compute $\\int_C\\vec F\\cdot d\\vec r$ from $(0, 0)$ to $(1, 2)$.",null,"$\\vec F = \\nabla(xy)$ is conservative, so the answer is $xy$ at the end point minus at the start point: $2 - 0$."],
 ["A vector field is conservative (on a simply connected region) if …",["$\\nabla\\times\\vec F = \\vec 0$","$\\nabla\\cdot\\vec F = 0$","$|\\vec F|$ is constant","$\\vec F$ is linear"],"A potential function then exists, and the line integral is path-independent."],
 ["What does the divergence theorem (Gauss) say?",["The flux out of a closed surface equals the volume integral of the divergence","The circulation equals the flux of the curl","The gradient is zero","The volume is constant"],"$\\oiint \\vec F\\cdot d\\vec S = \\iiint \\nabla\\cdot\\vec F\\,dV$."],
 ["What does Stokes' theorem say?",["The circulation around a curve equals the flux of the curl through a surface it bounds","The flux equals the divergence","Line integrals are always zero","The gradient is irrotational"],"Green's theorem is the special case in the plane."]
]);
EN_Q("STKD6610",0,[
 ["A life cycle assessment (LCA) evaluates the environmental impact …",["from extraction of raw materials to waste handling","only in the use phase","only in production","only at recycling"],"Often called “cradle to grave”."],
 ["How many UN Sustainable Development Goals are there?",["17","10","8","21"],"They were adopted in 2015 with a 2030 deadline."],
 ["The circular economy is about …",["keeping materials and products in use for as long as possible","producing as much as possible","burning waste for energy","using only renewable energy"],"Key words are repair, reuse, recycling and design for disassembly."],
 ["What is a rebound effect?",["Efficiency gains lead to more use, eating up much of the benefit","Products being returned","Emissions falling by themselves","A product being recycled"],"Example: more efficient cars can lead to more driving."],
 ["What do scope 3 emissions cover?",["Indirect emissions in the value chain, both upstream and downstream","Direct emissions from own sources","Emissions from purchased electricity","Transport only"],"Scope 1 is direct emissions, scope 2 purchased energy and scope 3 the rest of the value chain."],
 ["What does “functional unit” mean in a life cycle assessment?",["What the products are compared per, e.g. “1 km of transport”","The part of the product that wears most","The factory that makes it","The number of components"],"Without a common functional unit the comparison is unfair."],
 ["What is a greenhouse gas account in CO₂ equivalents?",["All greenhouse gases converted to the amount of CO₂ with the same warming effect","CO₂ emissions only","The number of trees needed","Energy use in kWh"],"Methane and nitrous oxide are weighted by GWP (Global Warming Potential)."],
 ["What is a typical example of design for disassembly?",["Screw joints instead of glue, so materials can be separated","Gluing all parts together","Using as many material types as possible","Making the product lighter"],"It makes repair and material recycling possible."],
 ["Which phase often dominates the carbon footprint of an electric vehicle in Norway?",["Production, especially the battery","The use phase","Disposal","Transport to the dealer"],"Norwegian electricity has low emissions, so production weighs most."],
 ["What is the difference between recycling and reuse?",["Reuse uses the product again as it is; recycling breaks it down into raw material","They are the same","Recycling is always better for the environment","Reuse means burning waste"],"Reuse is usually higher in the waste hierarchy."],
 ["What is “greenwashing”?",["Giving a misleading impression that something is environmentally friendly","Washing production equipment","Planting trees","Using green colours in advertising"],"Marketing law prohibits misleading environmental claims."],
 ["What is the main goal of the Paris Agreement?",["To limit warming to well below 2 °C, preferably 1.5 °C","To stop all oil production by 2025","To plant a billion trees","To halve population growth"],"It was adopted in 2015."],
 ["What is an environmental product declaration (EPD)?",["A standardised document with life cycle data for a product","An environmental tax","A certificate for renewable electricity","An insurance policy"],"EPDs are widely used in the construction industry."],
 ["What is the triple bottom line?",["Assessing economic, social and environmental performance","Having three financial years","Three directors on the board","Three per cent profit"],"Also called “people, planet, profit”."],
 ["What is a carbon footprint?",["Total greenhouse gas emissions linked to a product, person or activity","The amount of coal used","An imprint in carbon fibre","The number of trees cut"],"Stated in CO₂ equivalents."]
]);
EN_Q("STKD6610",1,[
 ["Consequentialist ethics judges an action by …",["the outcomes it leads to","whether it follows a duty","the person's character","the law"],"Utilitarianism is an example."],
 ["Duty ethics (e.g. Kant) judges an action by …",["whether it follows a moral duty or rule, regardless of outcome","how much utility it gives","what the majority thinks","what is profitable"],"An example is the categorical imperative."],
 ["What is the precautionary principle?",["Lack of full scientific certainty must not be a reason to postpone measures against serious harm","Always wait for more data","Choose the cheapest solution","Take out insurance"],"It is often used in environmental and health issues."],
 ["What is whistleblowing in working life?",["Speaking up about wrongdoing or unacceptable conditions","Reporting sick leave","Sounding fire alarms","Reporting to customers"],"Employment law protects against retaliation."],
 ["Virtue ethics emphasises …",["what character and qualities a good person has","rules","consequences","contracts"],"It goes back to Aristotle."],
 ["What is “dual use” of technology about?",["The same technology can be used for both civilian and military purposes","Technology always has two users","A product has two functions","Reusing components"],"Examples are drones, encryption and chemicals."],
 ["What is a central principle in codes of ethics for engineers?",["Holding public safety, health and welfare paramount","Maximising the employer's profit","Never reporting errors","Always choosing the cheapest solution"],"The engineer has a responsibility that goes beyond the client."],
 ["What is a stakeholder analysis?",["Mapping who is affected by, or can affect, a project","An interest calculation","A materials test","A risk matrix"],"It is used to consider all affected parties early."],
 ["What is meant by technological determinism?",["The view that technology drives social development more than the other way round","That technology is always neutral","That all technology is planned by the state","That technology does not affect society"],"The opposite view is that society shapes technology (social construction)."],
 ["What is informed consent?",["People receive sufficient information and voluntarily agree before taking part","A company informs its shareholders","The state approves a product","Reading the user manual"],"Important in research and in collecting personal data (GDPR)."],
 ["What is a central principle of the GDPR?",["Data minimisation: collect only the personal data you need","All data must be public","Data must be stored forever","Consent is never needed"],"Other principles are purpose limitation and storage limitation."],
 ["What is meant by “responsible innovation”?",["Considering social and ethical consequences early in development","Innovating as fast as possible","Only following the law","Leaving responsibility to the users"],"Also called RRI (Responsible Research and Innovation)."],
 ["What is a conflict of interest?",["When personal interests can influence a professional judgement","Disagreement in a project team","A legal dispute","Competition between companies"],"It is often handled by disclosing it or stepping aside."],
 ["What is universal design?",["Products and environments usable by as many people as possible without special adaptation","A common design language for all countries","All products looking the same","An ISO standard for screws"],"It is required by law in many contexts in Norway."],
 ["What is algorithmic bias?",["An algorithm systematically giving unfair results, often because of skewed training data","An algorithm being slow","A kind of syntax error","An algorithm using a lot of memory"],"It is a central topic in AI ethics."]
]);
EN_Q("ELFT2400",0,[
 ["$\\mathcal L\\{e^{-at}\\} = $",["$\\dfrac{1}{s+a}$","$\\dfrac{1}{s-a}$","$\\dfrac{a}{s+a}$","$\\dfrac{s}{s^2+a^2}$"],"This is fundamental for first-order systems."],
 ["A first-order system $K/(\\tau s + 1)$ receives a unit step. What is the final value?",["$K$","$1$","$\\tau$","$K/\\tau$"],"Set $s = 0$ in the transfer function."],
 ["$\\tau = 2$ s. How long does it take for the step response to reach 63 % of the final value?",null,"It takes one time constant, i.e. 2 s."],
 ["$G(s) = 5/(s+2)$ receives a unit step. What is the final value?",null,"$G(0) = 5/2 = 2.5$."],
 ["When is a linear system stable?",["When all poles lie in the left half-plane","When all zeros lie in the right half-plane","When it has a pole at the origin","When the gain is below 1"],"All poles then have negative real part."],
 ["What is a zero of a transfer function?",["A value of $s$ that makes the numerator zero","A value of $s$ that makes the denominator zero","When the output is zero at steady state","A pole at the origin"],"Poles make the denominator zero, and they determine stability."],
 ["What is a type 1 system?",["A system with one integrator (pole at the origin) in the loop","A first-order system","A system without feedback","A system with one zero"],"It has zero steady-state error for a step."],
 ["What is a transfer function?",["The ratio of the Laplace-transformed output to input with zero initial conditions","The ratio of current to voltage","A time function","A differential equation in time"],"$G(s) = Y(s)/U(s)$."],
 ["What is dead time in a system?",["A delay before the output reacts to the input","The system being switched off","The gain being zero","The system being unstable"],"It gives $e^{-sT}$ in the transfer function and makes control harder."]
]);
EN_Q("ELFT2400",1,[
 ["Which term of a PID controller removes steady-state error?",["The I term","The P term","The D term","None of them"],"The integral keeps growing as long as there is an error."],
 ["What does the D term do?",["Reacts to how fast the error changes, and adds damping","Removes steady-state error","Increases gain at low frequencies","Filters the measurement"],"It is sensitive to noise and is therefore often filtered."],
 ["What usually happens if you increase the P gain a lot?",["The system becomes faster, but gets more overshoot and may become unstable","The system becomes slower","The steady-state error grows","Nothing"],"It is a trade-off between speed and stability."],
 ["What is the closed-loop transfer function with $G$ forward and $H$ in the feedback?",["$\\dfrac{G}{1 + GH}$","$\\dfrac{G}{1 - GH}$","$GH$","$\\dfrac{1}{1+G}$"],"Applies to negative feedback."],
 ["What is the damping ratio $\\zeta$ in $\\dfrac{16}{s^2 + 4s + 16}$?",null,"$\\omega_n = 4$ and $2\\zeta\\omega_n = 4$, so $\\zeta = 0.5$."],
 ["What is integrator windup?",["The I term grows while the actuator is saturated, causing large overshoot","The motor winding up the cable","The D term becoming too large","The sensor drifting"],"Anti-windup stops the integration during saturation."],
 ["What does cascade control do?",["An outer controller gives the setpoint to a faster inner controller","Two controllers in parallel","The same controller used twice","Control without a sensor"],"An example is a position loop around a speed loop."]
]);
EN_Q("ELFT2400",2,[
 ["What is $|G| = 0.1$ in decibels?",null,"$20\\log_{10}(0.1) = -20$ dB."],
 ["How much does the magnitude fall in a Bode plot after a single pole?",["20 dB per decade","40 dB per decade","6 dB per decade","10 dB per decade"],"That is about 6 dB per octave."],
 ["What is the phase margin?",["How much extra phase lag the loop tolerates at 0 dB before becoming unstable","The phase at $\\omega = 0$","The gain at −180°","The time to overshoot"],"A target of 45–60° is common."],
 ["What is the Ziegler–Nichols method used for?",["Finding starting values for PID parameters","Solving differential equations","Drawing root loci","Measuring noise"],"It is based on the ultimate gain and period, or on the step response."],
 ["What is the gain margin?",["How much the loop gain can be increased before the system becomes unstable","The phase at 0 dB","The rise time","The maximum output"],"It is read where the phase is −180°."],
 ["What is the advantage of feedforward?",["It compensates for known disturbances before they cause an error","It removes the need for sensors","It makes the system unstable","It replaces the I term"],"It is often used together with feedback."],
 ["What does a Bode plot show?",["Magnitude and phase as functions of frequency","Poles and zeros","Step response","Time delay only"],"The magnitude is shown in dB and the frequency logarithmically."],
 ["What is the bandwidth of a closed-loop system?",["The frequency where the magnitude has dropped 3 dB from the low-frequency level","The highest frequency in the signal","The sampling frequency","The phase margin"],"Higher bandwidth means a faster response."]
]);
EN_Q("DAVE3705",0,[
 ["$\\mathcal L\\{1\\} = $",["$1/s$","$1$","$s$","$1/s^2$"],"$\\int_0^\\infty e^{-st}\\,dt = 1/s$ for $s > 0$."],
 ["$\\mathcal L\\{t\\} = $",["$1/s^2$","$1/s$","$2/s^3$","$s^2$"],"In general $\\mathcal L\\{t^n\\} = n!/s^{n+1}$."],
 ["$\\mathcal L\\{f'(t)\\} = $",["$sF(s) - f(0)$","$sF(s)$","$F(s)/s$","$F'(s)$"],"That is why Laplace turns differential equations into algebraic equations."],
 ["$\\mathcal L\\{\\sin\\omega t\\} = $",["$\\dfrac{\\omega}{s^2+\\omega^2}$","$\\dfrac{s}{s^2+\\omega^2}$","$\\dfrac{1}{s+\\omega}$","$\\dfrac{\\omega}{s^2-\\omega^2}$"],"$\\dfrac{s}{s^2+\\omega^2}$ is the transform of $\\cos\\omega t$."],
 ["$\\mathcal L^{-1}\\left\\{\\dfrac{1}{s-3}\\right\\} = $",["$e^{3t}$","$e^{-3t}$","$\\sin 3t$","$3t$"],"Use $\\mathcal L\\{e^{at}\\} = 1/(s-a)$."],
 ["Partial fractions: $\\dfrac{1}{s(s+1)} = $",["$\\dfrac1s - \\dfrac{1}{s+1}$","$\\dfrac1s + \\dfrac1{s+1}$","$\\dfrac{1}{s+1} - \\dfrac1s$","$\\dfrac{1}{s^2}$"],"Check: $\\dfrac{(s+1) - s}{s(s+1)}$. The inverse is $1 - e^{-t}$."],
 ["What does the shift theorem (s-shift) say?",["$\\mathcal L\\{e^{at}f(t)\\} = F(s-a)$","$\\mathcal L\\{f(t-a)\\} = F(s-a)$","$\\mathcal L\\{af(t)\\} = F(s)/a$","$\\mathcal L\\{f'\\} = F(s-a)$"],"A time shift instead gives a factor $e^{-as}$."],
 ["What is the Laplace transform of the unit step $u(t-a)$?",["$e^{-as}/s$","$1/s$","$e^{as}$","$a/s$"],"Used for forces that switch on at $t = a$."],
 ["What is $\\mathcal L\\{\\delta(t)\\}$ (Dirac impulse)?",["1","0","$1/s$","$s$"],"The impulse response is therefore $g(t) = \\mathcal L^{-1}\\{G(s)\\}$."]
]);
EN_Q("DAVE3705",1,[
 ["An odd function has a Fourier series with only …",["sine terms","cosine terms","a constant term","complex terms"],"$\\sin$ is odd and $\\cos$ is even. Hence $a_0 = a_n = 0$."],
 ["Which harmonics appear in the Fourier series of a symmetric square wave?",["Only odd harmonics (1, 3, 5, …)","Only even harmonics","All harmonics","Only the fundamental"],"$\\frac4\\pi\\left(\\sin x + \\frac13\\sin 3x + \\frac15\\sin 5x + \\dots\\right)$."],
 ["What is the Gibbs phenomenon?",["An overshoot of about 9 % near jumps that does not vanish as more terms are added","The series diverging","All coefficients becoming zero","A phase error"],"The overshoot moves closer to the jump but does not get smaller."],
 ["For a $2L$-periodic function, $a_n = $",["$\\dfrac1L\\displaystyle\\int_{-L}^{L} f(x)\\cos\\frac{n\\pi x}{L}\\,dx$","$\\dfrac1{2L}\\displaystyle\\int_{-L}^{L} f(x)\\sin\\frac{n\\pi x}{L}\\,dx$","$\\displaystyle\\int_0^L f(x)\\,dx$","$\\dfrac{2}{L}\\displaystyle\\int_{-L}^{L} f(x)\\,dx$"],"The integrand with $\\sin$ gives $b_n$."],
 ["What does Parseval's identity say?",["The energy of the signal equals the (scaled) sum of the squared coefficients","The series always converges","$a_0 = 0$","The series is periodic"],"$\\frac1L\\int_{-L}^{L} f^2\\,dx = \\frac{a_0^2}{2} + \\sum (a_n^2 + b_n^2)$."],
 ["An even function has a Fourier series with only …",["cosine terms (and a constant term)","sine terms","odd harmonics","imaginary terms"],"$b_n = 0$ because $f(x)\\sin(nx)$ is odd."],
 ["What does the Fourier series converge to at a jump?",["The average of the left and right limits","The left limit","The right limit","Zero"],"Dirichlet's theorem."]
]);
EN_Q("DAVE3705",2,[
 ["Which equation is the heat equation (in one dimension)?",["$u_t = c^2u_{xx}$","$u_{tt} = c^2u_{xx}$","$u_{xx} + u_{yy} = 0$","$u_t + cu_x = 0$"],"It is first order in time and describes diffusion."],
 ["Which equation is the wave equation?",["$u_{tt} = c^2u_{xx}$","$u_t = c^2u_{xx}$","$u_{xx} = 0$","$u_t = u$"],"It is second order in time, and disturbances travel at speed $c$."],
 ["In separation of variables one assumes that …",["$u(x, t) = X(x)\\,T(t)$","$u = X + T$","$u = e^{x+t}$","$u$ is constant"],"You then get two ordinary differential equations linked by a separation constant."],
 ["How does mode $n$ behave in the solution of the heat equation on $[0, L]$ with $u = 0$ at the ends?",["It decays like $e^{-c^2(n\\pi/L)^2t}$","It oscillates without damping","It grows exponentially","It is constant"],"High modes die out quickly, which is why the profile smooths out."],
 ["Laplace's equation $\\nabla^2u = 0$ typically describes …",["a steady (time-independent) state","a wave","the start of heat conduction","shocks"],"An example is a steady temperature distribution or a potential field."],
 ["The system $\\vec x' = A\\vec x$ is asymptotically stable when …",["all eigenvalues of $A$ have negative real part","$\\det A > 0$","$A$ is symmetric","the trace is positive"],"The solutions are combinations of $e^{\\lambda t}\\vec v$."],
 ["What does d'Alembert's solution of the wave equation say?",["$u = F(x - ct) + G(x + ct)$: two waves travelling in opposite directions","$u$ decays exponentially","$u$ is constant","$u = X(x)T(t)$ always"],"The shapes are preserved while the waves move."],
 ["What type of equation is Laplace's equation?",["Elliptic","Parabolic","Hyperbolic","Ordinary"],"The heat equation is parabolic and the wave equation hyperbolic."],
 ["What is a Dirichlet boundary condition?",["The value of the solution is given on the boundary","The derivative is given on the boundary","The solution is periodic","No condition"],"A Neumann boundary condition gives the derivative, for example an insulated boundary."],
 ["What does an insulated end mean in the heat equation?",["$u_x = 0$ at the end (no heat flux)","$u = 0$ at the end","$u_t = 0$","$u = 100$"],"The eigenfunctions then become cosines."]
]);
