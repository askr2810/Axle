// English: fixed questions (ELPE1300, MEK1000, ELFT2500, MEK2000)
EN_Q("ELPE1300",0,[
 ["12 V is applied across a 4 Ω resistor. What is the current?",null,"Ohm's law: $I = U/R = 12/4 = 3$ A."],
 ["Three 6 Ω resistors are connected in parallel. What is the total resistance?",null,"$1/R = 3/6$, so $R = 2$ Ω."],
 ["A 10 Ω resistor carries 2 A. How much power is dissipated?",null,"$P = RI^2 = 10\\cdot 4 = 40$ W."],
 ["Kirchhoff's current law says that …",["the sum of currents into a node equals the sum out","the sum of voltages around a loop is zero","current equals voltage divided by resistance","power equals voltage times current"],"It follows from conservation of charge. The loop rule is the voltage law (KVL)."],
 ["Voltage divider: 10 V across $R_1 = 1$ kΩ and $R_2 = 4$ kΩ in series. What is the voltage across $R_2$?",null,"$U_2 = 10\\cdot 4/(1+4) = 8$ V."],
 ["What does Kirchhoff's voltage law say?",["The sum of voltages around a closed loop is zero","The sum of currents into a node is zero","The voltage is equal across all resistors","$P = UI$"],"It follows from conservation of energy."],
 ["How does current divide between two resistors in parallel?",["Most current flows through the smaller resistance","Equally regardless of resistance","Most through the larger one","All current flows through the smaller one"],"Current divider: $I_1 = I\\,R_2/(R_1 + R_2)$."]
]);
EN_Q("ELPE1300",1,[
 ["What is the time constant of an RC circuit with $R = 10$ kΩ and $C = 100$ µF?",null,"$\\tau = RC = 10^4\\cdot 10^{-4} = 1$ s."],
 ["To what percentage of the final voltage is a capacitor charged after one time constant?",["≈ 63 %","≈ 50 %","≈ 37 %","≈ 86 %"],"$1 - e^{-1} \\approx 0.632$."],
 ["How does an ideal inductor behave in a DC circuit at steady state?",["Like a short circuit","Like an open circuit","Like a 1 Ω resistor","Like a capacitor"],"$u = L\\,di/dt = 0$ when the current is constant."],
 ["How does a capacitor behave in a DC circuit at steady state?",["Like an open circuit","Like a short circuit","Like an inductor","It keeps discharging"],"$i = C\\,du/dt = 0$ when the voltage is constant."],
 ["What is the unit of capacitance?",["Farad (F)","Henry (H)","Ohm (Ω)","Tesla (T)"],"Inductance is measured in henries."],
 ["What happens to the current in an inductor when a switch is opened suddenly?",["The inductor tries to maintain the current, and a high voltage spike can occur","The current stops with no effects","The inductor charges up","The voltage becomes zero"],"That is why a flyback diode is used across relay coils."]
]);
EN_Q("ELPE1300",2,[
 ["What is the reactance of a 100 µF capacitor at 50 Hz?",null,"$X_C = 1/(2\\pi fC) = 1/(2\\pi\\cdot 50\\cdot 10^{-4}) \\approx 31.8$ Ω."],
 ["A sinusoidal voltage has a peak value of 325 V. What is the RMS value?",null,"$U_{rms} = U_p/\\sqrt 2 \\approx 230$ V, i.e. ordinary European mains voltage."],
 ["With a purely inductive load, the current will …",["lag the voltage by 90°","lead the voltage by 90°","be in phase with the voltage","lag by 180°"],"Mnemonic ELI the ICE man: in an inductive load (L), E comes before I."],
 ["The power factor $\\cos\\varphi$ is the ratio between …",["active power and apparent power ($P/S$)","reactive and active power","voltage and current","S and Q"],"When $\\cos\\varphi = 1$ the load is purely resistive."],
 ["What is reactive power $Q$?",["Power that oscillates between source and magnetic/electric fields without doing useful work","The power that becomes heat","The power in a resistor","The sum of active and apparent power"],"The unit is VAr. $S^2 = P^2 + Q^2$."],
 ["Why is power factor correction applied to inductive loads?",["To reduce the reactive current and the losses in the grid","To increase the voltage","To change the frequency","To make the load inductive"],"Capacitors in parallel compensate for the motor's inductance."]
]);
EN_Q("ELPE1300",3,[
 ["What is a Thévenin equivalent?",["An ideal voltage source in series with one resistor","A current source in parallel with a resistor","A short-circuited network","A capacitor in series with an inductor"],"The Norton equivalent is the current source in parallel."],
 ["When is maximum power transferred to a load resistor $R_L$?",["When $R_L = R_{th}$","When $R_L = 0$","When $R_L$ is infinite","When $R_L = 2R_{th}$"],"The efficiency is then only 50 %."],
 ["How do you find $R_{th}$ in a circuit with only independent sources?",["Turn off the sources (short voltage sources, open current sources) and compute the resistance seen from the terminals","Short the terminals and measure the current","Add all resistances","Take the largest resistance"],"Alternatively: $R_{th} = U_{open}/I_{short}$."],
 ["What does the superposition principle say?",["In a linear circuit the response is the sum of the contributions from each source acting alone","Powers can be added","Current and voltage are always in phase","Parallel resistances are added"],"It does not apply to power, because power is quadratic."],
 ["How many independent node equations does a circuit with $n$ nodes need?",["$n - 1$","$n$","$n + 1$","$2n$"],"One node is chosen as ground (reference)."]
]);
EN_Q("MEK1000",0,[
 ["$\\dfrac{d}{dx}\\sin(2x) = $",["$2\\cos(2x)$","$\\cos(2x)$","$-2\\cos(2x)$","$2\\sin(2x)$"],"Chain rule: the outer derivative times the inner derivative (2)."],
 ["$\\dfrac{d}{dx}e^{x^2} = $",["$2x\\,e^{x^2}$","$e^{x^2}$","$x^2 e^{x^2-1}$","$e^{2x}$"],"Chain rule with $u = x^2$."],
 ["Product rule: $(fg)' = $",["$f'g + fg'$","$f'g'$","$f'g - fg'$","$(f'g - fg')/g^2$"],"$(f'g - fg')/g^2$ is the quotient rule, for $(f/g)'$."],
 ["$f(x) = x^2 - 4x$. For which $x$ does $f$ have a minimum?",null,"$f'(x) = 2x - 4 = 0$ gives $x = 2$, and $f'' = 2 > 0$."],
 ["$\\dfrac{d}{dx}\\ln x = $",["$1/x$","$\\ln x / x$","$e^x$","$x\\ln x - x$"],"$x\\ln x - x$ is the integral of $\\ln x$, not the derivative."],
 ["What is the quotient rule, $(f/g)'$?",["$\\dfrac{f'g - fg'}{g^2}$","$\\dfrac{f'g + fg'}{g^2}$","$\\dfrac{f'}{g'}$","$\\dfrac{fg' - f'g}{g}$"],"Remember the minus sign and $g^2$ in the denominator."],
 ["What does the mean value theorem say?",["There is a point where the derivative equals the average slope over the interval","The function always has a maximum","The integral equals the mean value","The derivative is always positive"],"Condition: $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$."],
 ["$\\dfrac{d}{dx}\\arctan x = $",["$\\dfrac{1}{1+x^2}$","$\\dfrac{1}{\\sqrt{1-x^2}}$","$\\tan x$","$-\\dfrac{1}{1+x^2}$"],"$\\dfrac{1}{\\sqrt{1-x^2}}$ is the derivative of $\\arcsin x$."]
]);
EN_Q("MEK1000",1,[
 ["$\\displaystyle\\int_0^{\\pi}\\sin x\\,dx = $",null,"$[-\\cos x]_0^{\\pi} = 1 - (-1) = 2$."],
 ["$\\displaystyle\\int \\frac1x\\,dx = $",["$\\ln|x| + C$","$-1/x^2 + C$","$x^0 + C$","$e^x + C$"],"The absolute value makes the formula valid for $x<0$ too."],
 ["$\\displaystyle\\int x e^x\\,dx = $",["$(x-1)e^x + C$","$xe^x + C$","$\\tfrac12 x^2 e^x + C$","$(x+1)e^x + C$"],"Integration by parts with $u = x$ and $v' = e^x$."],
 ["The formula for integration by parts is $\\int u v'\\,dx = $",["$uv - \\int u'v\\,dx$","$uv + \\int u'v\\,dx$","$u'v' - \\int uv$","$\\int u\\,dx\\cdot\\int v'\\,dx$"],"It comes from the product rule."],
 ["$\\displaystyle\\int_0^2 3x^2\\,dx = $",null,"$[x^3]_0^2 = 8$."],
 ["What does the fundamental theorem of calculus say?",["$\\int_a^b f(x)\\,dx = F(b) - F(a)$ where $F' = f$","Every function can be integrated","The integral is always positive","$\\int f = f'$"],"It links differentiation and integration."],
 ["Which substitution suits $\\int 2x\\cos(x^2)\\,dx$?",["$u = x^2$","$u = \\cos x$","$u = 2x$","Integration by parts with $u = \\cos(x^2)$"],"Then $du = 2x\\,dx$ and the integral is $\\sin(x^2) + C$."]
]);
EN_Q("MEK1000",2,[
 ["$\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x} = $",["1","0","∞","The limit does not exist"],"Can be shown with L'Hôpital or with $\\sin x \\approx x$ for small $x$."],
 ["The Taylor series of $e^x$ about 0 is …",["$1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$","$x - \\frac{x^3}{3!} + \\dots$","$1 - \\frac{x^2}{2!} + \\dots$","$1 + x + x^2 + x^3 + \\dots$"],"All derivatives of $e^x$ equal 1 at $x=0$. $x - x^3/3! + \\dots$ is the series for $\\sin x$, and $1 + x + x^2 + \\dots$ is the series for $1/(1-x)$."],
 ["$|3 + 4i| = $",null,"$\\sqrt{3^2+4^2} = 5$."],
 ["$e^{i\\pi} = $",["$-1$","$1$","$i$","$0$"],"Euler's formula: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$."],
 ["When can L'Hôpital's rule be used?",["For $0/0$ or $\\infty/\\infty$","Always","Only for polynomials","For $1/0$"],"Other indeterminate forms, such as $0\\cdot\\infty$, must first be rewritten as a fraction."],
 ["What is $i^2$?",["$-1$","$1$","$i$","$0$"],"The definition of the imaginary unit."],
 ["What is the complex conjugate of $a + bi$?",["$a - bi$","$-a + bi$","$b + ai$","$-a - bi$"],"$z\\bar z = a^2 + b^2 = |z|^2$."]
]);
EN_Q("ELFT2500",0,[
 ["What is `0x1F` in decimal?",null,"$1\\cdot16 + 15 = 31$."],
 ["What is the binary number `1010` in decimal?",null,"$8 + 2 = 10$."],
 ["What is the largest value of an unsigned 8-bit integer?",["255","256","127","128"],"$2^8 - 1 = 255$. 127 is the maximum for signed."],
 ["What does `x & 0x01` check in C?",["Whether the lowest bit is set (whether x is odd)","Whether x is greater than 1","Whether x is zero","Whether the highest bit is set"],"Bitwise AND with 1 masks out everything except bit 0."],
 ["A 10-bit ADC has a 5 V reference. What is the resolution, in mV?",null,"$5/2^{10} = 5/1024 \\approx 4.88$ mV per step."],
 ["What are a bit and a byte?",["A bit is 0 or 1; a byte is 8 bits","A byte is 4 bits","A bit is 8 bytes","They are the same"],"A nibble is 4 bits, i.e. one hexadecimal digit."],
 ["What is a floating-point number (float) good and bad at?",["Large range, but limited precision and rounding errors","Exact storage of all decimals","Only integers","Only negative numbers"],"That is why you should not compare floats with `==`."]
]);
EN_Q("ELFT2500",1,[
 ["A 5 V PWM signal has a 25 % duty cycle. What is the average voltage?",["1.25 V","2.5 V","3.75 V","5 V"],"$0.25\\cdot 5 = 1.25$ V."],
 ["Why use a pull-up resistor on a button input?",["So the input has a defined high level when the button is open","To limit the current to the LED","To increase the frequency","To protect against overvoltage"],"Without it the input floats and can read random values."],
 ["Which two lines does I²C use?",["SDA and SCL","MOSI and MISO","TX and RX","CS and CLK"],"Data and clock, both with pull-ups. MOSI and MISO belong to SPI, and TX and RX to UART."],
 ["What is the advantage of interrupts over polling?",["The CPU does not have to check constantly and reacts quickly to events","It is easier to debug","It uses more pins","It gives a higher clock frequency"],"An ISR only runs when the event actually happens."],
 ["UART is a …",["asynchronous serial protocol","synchronous parallel bus","wireless protocol","analogue signal type"],"UART has no shared clock. Both sides must agree on the baud rate."],
 ["What is the difference between SPI and I²C?",["SPI has a separate chip select per device and is faster; I²C uses addresses on two lines","SPI is asynchronous","I²C is always faster","They are identical"],"SPI uses MOSI, MISO, SCK and CS."],
 ["What is a watchdog timer?",["A timer that resets the microcontroller if the program hangs","A clock for date and time","A PWM generator","An ADC function"],"The program must “feed” the watchdog regularly."],
 ["What is the difference between volatile and non-volatile memory?",["Volatile (RAM) loses its contents without power; non-volatile (flash, EEPROM) keeps them","Volatile is always faster and larger","There is no difference","Non-volatile loses its contents"],"The program is stored in flash, variables in RAM."],
 ["What is debouncing a button?",["Filtering out contact bounce so one press is not registered as many","Making the button stiffer","Increasing the voltage","Connecting the button to ground"],"Can be done in hardware (RC) or software (waiting a few ms)."]
]);
EN_Q("ELFT2500",2,[
 ["The Nyquist criterion says the sampling frequency must be …",["more than twice the highest frequency in the signal","equal to the signal frequency","at least 10 times the clock frequency","half the signal frequency"],"Otherwise you get aliasing."],
 ["A signal contains frequencies up to 1 kHz. What is the minimum theoretical sampling frequency?",null,"$f_s > 2f_{max} = 2$ kHz. In practice you choose well above that."],
 ["What is a Wheatstone bridge typically used for?",["Measuring small changes in resistance, e.g. from strain gauges","Rectifying AC","Amplifying digital signals","Measuring frequency"],"The bridge turns small changes $\\Delta R$ into a measurable differential voltage."],
 ["A thermocouple measures temperature using …",["the Seebeck effect","the Hall effect","piezoelectricity","the photoelectric effect"],"Two dissimilar metals produce a voltage that depends on the temperature difference."],
 ["The measurements are tightly grouped but far from the true value. They are …",["precise but not accurate","accurate but not precise","both precise and accurate","neither precise nor accurate"],"Precision means low spread; accuracy means small systematic error."],
 ["What is an RTD, e.g. a PT100?",["A temperature sensor whose resistance increases with temperature (100 Ω at 0 °C)","A pressure sensor","A thermocouple","A light sensor"],"A PT100 has about 0.385 Ω/°C."],
 ["Why use an anti-aliasing filter in front of an ADC?",["To remove frequencies above half the sampling frequency","To amplify the signal","To reduce power consumption","To make the signal digital"],"A low-pass filter before sampling."],
 ["What does it mean that a sensor has hysteresis?",["The output depends on whether the measured quantity is increasing or decreasing","The sensor is linear","The sensor is fast","The sensor is digital"],"It gives different readings for the same input on the way up and on the way down."]
]);
EN_Q("MEK2000",0,[
 ["$\\det\\begin{pmatrix}2&1\\\\3&4\\end{pmatrix} = $",null,"$2\\cdot 4 - 1\\cdot 3 = 5$."],
 ["A square matrix $A$ is invertible if and only if …",["$\\det A \\neq 0$","$\\det A = 0$","$A$ is symmetric","all entries are positive"],"This is also equivalent to the columns being linearly independent."],
 ["$(AB)^T = $",["$B^TA^T$","$A^TB^T$","$BA$","$A^{-1}B^{-1}$"],"The order is reversed, just as for inverses."],
 ["$(1, 2, 3)\\cdot(4, 5, 6) = $",null,"$4 + 10 + 18 = 32$."],
 ["An eigenvector $\\vec v \\neq \\vec 0$ of $A$ satisfies …",["$A\\vec v = \\lambda\\vec v$","$A\\vec v = \\vec 0$","$A^T\\vec v = \\vec v$","$\\det(A\\vec v) = \\lambda$"],"$A$ only scales $\\vec v$, by the factor $\\lambda$."],
 ["What is the identity matrix?",["A square matrix with 1 on the diagonal and 0 elsewhere","A matrix of only 1s","A zero matrix","A symmetric matrix with a negative diagonal"],"$AI = IA = A$."],
 ["What is $A^{-1}$ for $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$?",["$\\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$","$\\begin{pmatrix}d&b\\\\c&a\\end{pmatrix}$","$\\dfrac{1}{ad+bc}\\begin{pmatrix}a&-b\\\\-c&d\\end{pmatrix}$","$\\begin{pmatrix}1/a&1/b\\\\1/c&1/d\\end{pmatrix}$"],"Swap the diagonal, change the sign of the off-diagonal, divide by the determinant."],
 ["Is matrix multiplication commutative?",["No, in general $AB \\neq BA$","Yes, always","Only for 2×2","Only if $\\det A = 0$"],"The order matters, just as for rotations."]
]);
EN_Q("MEK2000",1,[
 ["What is the largest eigenvalue of $\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$?",null,"$\\lambda^2 - 7\\lambda + 10 = 0$ gives $\\lambda = 5$ and $2$."],
 ["The sum of the eigenvalues of a matrix equals …",["the trace (sum of the diagonal)","the determinant","the rank","the number of rows"],"The product of the eigenvalues is the determinant."],
 ["A consistent linear system has more unknowns than equations. How many solutions does it have?",["Infinitely many","Exactly one","None","Exactly two"],"There is at least one free variable."],
 ["The rank of a matrix is …",["the number of pivots in the echelon form","the number of rows","the number of zero rows","the determinant"],"The rank is also the dimension of the column space."],
 ["If $\\det A = 0$, then $A\\vec x = \\vec 0$ has …",["non-trivial solutions","only the solution $\\vec x = \\vec 0$","no solution","exactly two solutions"],"The columns are then linearly dependent."],
 ["What is a basis of a vector space?",["A set of linearly independent vectors that spans the space","All vectors in the space","The zero vector","Any set of three vectors"],"In $\\mathbb R^3$ every basis consists of three vectors."],
 ["What characterises the eigenvalues of a real symmetric matrix?",["They are all real","They are all zero","They are all imaginary","They are always equal"],"The eigenvectors can moreover be chosen orthogonal."]
]);
EN_Q("MEK2000",2,[
 ["What is the general solution of $y' = ky$?",["$y = Ce^{kx}$","$y = kx + C$","$y = C\\sin(kx)$","$y = Ce^{-x/k}$"],"Solved by separation of variables."],
 ["What is the general solution of $y'' + y = 0$?",["$C_1\\cos x + C_2\\sin x$","$C_1e^x + C_2e^{-x}$","$Ce^{x}$","$C_1 + C_2x$"],"The characteristic equation $r^2 + 1 = 0$ gives $r = \\pm i$."],
 ["What is the general solution of $y'' - 3y' + 2y = 0$?",["$C_1e^{x} + C_2e^{2x}$","$C_1e^{-x} + C_2e^{-2x}$","$(C_1 + C_2x)e^{x}$","$C_1\\cos 2x + C_2\\sin x$"],"$r^2 - 3r + 2 = (r-1)(r-2) = 0$."],
 ["$y' = -2y$ and $y(0) = 5$. What is $y(\\ln 2)$?",null,"$y = 5e^{-2x}$, so $y(\\ln 2) = 5\\cdot 2^{-2} = 1.25$."],
 ["The characteristic equation has a double root $r$. What does the solution look like?",["$(C_1 + C_2x)e^{rx}$","$C_1e^{rx} + C_2e^{rx}$","$C e^{2rx}$","$C_1\\cos rx + C_2\\sin rx$"],"The second solution gets an extra factor $x$."],
 ["What is the integrating factor for $y' + p(x)y = q(x)$?",["$e^{\\int p(x)\\,dx}$","$e^{-x}$","$\\int q(x)\\,dx$","$p(x)q(x)$"],"Multiplying by it turns the left-hand side into $(\\mu y)'$."],
 ["What is a separable differential equation?",["One that can be written $y' = g(x)h(y)$","One with a constant solution","A second-order equation","One without a solution"],"You can then collect $y$ and $x$ on separate sides and integrate."]
]);
