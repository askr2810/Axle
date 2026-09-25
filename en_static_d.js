// English: fixed questions (MEK2200, ELVE3610, MATS1500, MEK3100, DAVE3700 unit 0)
EN_Q("MEK2200",0,[
 ["What is the probability of rolling two sixes in a row with one die? (decimal)",null,"$1/36 \\approx 0.0278$."],
 ["$P(A\\cup B) = $",["$P(A) + P(B) - P(A\\cap B)$","$P(A) + P(B)$","$P(A)P(B)$","$P(A|B)P(B)$"],"The intersection must be subtracted, otherwise it is counted twice."],
 ["Two independent components in series each have reliability 0.9. What is the system reliability?",null,"Both must work: $0.9^2 = 0.81$."],
 ["Two independent components in parallel each have reliability 0.9. What is the system reliability?",null,"It is enough that one works: $1 - 0.1^2 = 0.99$."],
 ["Bayes' formula: $P(A|B) = $",["$\\dfrac{P(B|A)P(A)}{P(B)}$","$\\dfrac{P(A)P(B)}{P(A\\cap B)}$","$P(B|A)$","$P(A)+P(B|A)$"],"It is used to reverse the conditioning."],
 ["When are two events independent?",["When $P(A\\cap B) = P(A)P(B)$","When they cannot happen at the same time","When $P(A) = P(B)$","When $P(A\\cup B) = 1$"],"Disjoint events with positive probability are in fact dependent."],
 ["What is $P(A^c)$ (the complement)?",["$1 - P(A)$","$P(A)$","$0$","$P(A)/2$"],"Useful for “at least one” questions."]
]);
EN_Q("MEK2200",1,[
 ["In a normal distribution, roughly how much of the probability lies within $\\mu\\pm2\\sigma$?",["95 %","68 %","99.7 %","50 %"],"The 68–95–99.7 rule for ±1, ±2 and ±3σ."],
 ["$X\\sim\\text{Bin}(n = 10, p = 0.5)$. What is $E[X]$?",null,"$E[X] = np = 5$."],
 ["The Poisson distribution is typically used to model …",["the number of events in a time interval","lifetime","height in a population","the share of defectives in a small sample without replacement"],"For example the number of faults per hour. Lifetime is often modelled with the exponential or Weibull distribution."],
 ["What is the mean of the data 2, 4, 4, 4, 5, 5, 7, 9?",null,"The sum is 40, and $40/8 = 5$."],
 ["How are standard deviation and variance related?",["$\\sigma = \\sqrt{\\text{Var}(X)}$","$\\sigma = \\text{Var}(X)^2$","$\\sigma = \\text{Var}(X)/n$","They are the same"],"The standard deviation has the same unit as the data."],
 ["What does the central limit theorem say?",["The mean of many independent measurements is approximately normally distributed","All data are normally distributed","The variance goes to zero","The median equals the mean"],"It holds whatever the original distribution, given finite variance."],
 ["What does the correlation coefficient $r$ measure?",["The strength of the linear relationship between two variables","Causation","The mean","The slope of the regression"],"$r$ lies between −1 and 1. Correlation is not causation."]
]);
EN_Q("MEK2200",2,[
 ["What is the p-value?",["The probability of a result at least as extreme, given that $H_0$ is true","The probability that $H_0$ is true","The probability that $H_1$ is true","The significance level"],"A low p-value means the data fit $H_0$ poorly."],
 ["What is the standard error of the mean?",["$\\sigma/\\sqrt n$","$\\sigma/n$","$\\sigma\\sqrt n$","$\\sigma^2/n$"],"The uncertainty decreases with $\\sqrt n$."],
 ["A type I error is to …",["reject a true $H_0$","keep a false $H_0$","choose the wrong test","have too little data"],"The probability of a type I error is the significance level $\\alpha$."],
 ["A confidence interval gets wider when …",["the confidence level increases","the sample gets larger","the standard deviation decreases","you use z instead of t"],"Higher confidence requires a wider interval."],
 ["In a risk matrix, risk is often defined as …",["probability × consequence","probability + consequence","consequence / probability","consequence only"],"You can then prioritise measures against what is both likely and serious."],
 ["What is a type II error?",["Keeping $H_0$ when it is actually false","Rejecting a true $H_0$","Using the wrong distribution","Having too large an $n$"],"The power of the test is $1 - \\beta$, where $\\beta$ is the probability of a type II error."],
 ["What is FMEA?",["A systematic review of possible failure modes, causes and effects","A statistical test","A probability distribution","A type of regression"],"Failure Mode and Effects Analysis is used in product development."],
 ["What does the coefficient of determination $R^2$ measure in regression?",["The share of the variation in $y$ explained by the model","The slope","The number of observations","The standard error"],"$R^2$ lies between 0 and 1."],
 ["What is an ALARP assessment?",["Risk should be reduced as far as reasonably practicable","Risk must always be zero","A type of test","An accounting principle"],"“As Low As Reasonably Practicable” is widely used in the offshore industry."]
]);
EN_Q("ELVE3610",0,[
 ["What properties does a rotation matrix $R$ have?",["$R^T = R^{-1}$ and $\\det R = 1$","$R^T = R$ and $\\det R = 0$","$R^{-1} = -R$","All entries are positive"],"It is orthogonal and preserves lengths and orientation."],
 ["A 4×4 homogeneous transformation matrix contains …",["a rotation and a translation","only a rotation","only a scaling","the joint velocities"],"$T = \\begin{pmatrix}R & \\vec p\\\\ 0 & 1\\end{pmatrix}$."],
 ["The vector $(1, 0)$ is rotated 90° counterclockwise. What is the result?",["$(0, 1)$","$(0, -1)$","$(-1, 0)$","$(1, 1)$"],"$R(90^\\circ) = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$."],
 ["How many Denavit–Hartenberg parameters describe each joint?",["4","3","6","2"],"$\\theta$, $d$, $a$ and $\\alpha$."],
 ["What are Euler angles?",["Three successive rotations that describe an orientation","Angles in a triangle","Joint angles in a 2D arm","Angles between poles"],"They can give gimbal lock. That is why quaternions are also used."],
 ["What is gimbal lock?",["Two rotation axes line up, so one degree of freedom is lost","A joint locks mechanically","The robot is switched off","The gripper does not open"],"It is a singularity of Euler angles."]
]);
EN_Q("ELVE3610",1,[
 ["What is forward kinematics?",["Finding the tool's position and orientation from the joint angles","Finding the joint angles from the tool's position","Calculating the motor torques","Planning a path"],"Going the other way is inverse kinematics."],
 ["A planar 2-link arm has $L_1 = L_2 = 1$ m, $\\theta_1 = 0$ and $\\theta_2 = 90^\\circ$. How far is the tool from the base?",null,"The tool is at $(1, 1)$, so the distance is $\\sqrt 2 \\approx 1.414$ m."],
 ["Why is inverse kinematics often harder than forward kinematics?",["There may be several solutions, or none","It is always linear","It needs no trigonometry","There is always exactly one solution"],"An example is elbow up or elbow down."],
 ["The Jacobian relates …",["joint velocities to the tool velocity","joint angles to the masses","position to torques","acceleration to temperature"],"$\\dot{\\vec x} = J(\\vec q)\\,\\dot{\\vec q}$."],
 ["A singularity occurs when …",["the Jacobian loses rank","the robot stands still","all joint angles are zero","the motors are overloaded"],"The robot then loses a direction of motion."],
 ["What is the difference between joint-interpolated and linear (Cartesian) motion?",["Joint interpolation gives a curved tool path; linear motion keeps the tool on a straight line","There is no difference","Linear is always faster","Joint interpolation uses only one joint"],"On ABB robots they are called MoveJ and MoveL."],
 ["What is redundancy in a robot arm?",["More degrees of freedom than the task needs, so the same pose can be reached in many ways","It has two controllers","It has spare motors","It cannot move"],"A 7-axis arm is redundant for 6D tasks."]
]);
EN_Q("ELVE3610",2,[
 ["How many degrees of freedom are needed to position and orient a tool freely in 3D?",["6","3","4","12"],"Three for position and three for orientation."],
 ["SCARA robots are particularly well suited to …",["fast pick-and-place in a plane","welding large car bodies","walking on rough terrain","painting ceilings"],"They are stiff vertically and compliant horizontally."],
 ["What is the difference between a revolute and a prismatic joint?",["Revolute rotates, prismatic slides linearly","Revolute slides, prismatic rotates","Both rotate","Both are passive"],"They are often called R and P joints."],
 ["What does an incremental encoder on a robot joint measure?",["Change in angular position","Motor temperature","The torque","The current draw"],"It counts pulses. An absolute encoder gives the angle directly."],
 ["What is the difference between a collaborative robot (cobot) and a traditional industrial robot?",["A cobot is designed to work safely near people, with force and speed limits","A cobot is always larger","A cobot has more joints","A cobot needs no power"],"Traditional robots usually stand behind fences."],
 ["What is an end effector?",["What sits at the end of the arm, e.g. a gripper or welding torch","The robot's base","The controller","The encoder"],"The end effector determines what the robot actually does."],
 ["What is the workspace?",["All points the tool can reach","The area around the controller","The robot's floor area","The safety zone"],"There is a reachable and a dexterous workspace."],
 ["What does path planning do?",["Finds a collision-free path from start to goal","Selects a motor","Calculates moment of inertia","Calibrates a camera"],"Examples are A* and RRT."]
]);
EN_Q("MATS1500",0,[
 ["What crystal structure does iron (ferrite) have at room temperature?",["BCC (body-centred cubic)","FCC (face-centred cubic)","HCP","Amorphous"],"Above about 912 °C iron becomes FCC (austenite)."],
 ["What crystal structure does aluminium have?",["FCC","BCC","HCP","Tetragonal"],"FCC gives many slip systems and hence good ductility."],
 ["What happens to the strength when the grain size is reduced?",["It increases","It decreases","It is unchanged","The material becomes liquid"],"Hall–Petch: grain boundaries obstruct dislocations."],
 ["Which element is the most important alloying element in carbon steel, besides iron?",["Carbon","Chromium","Nickel","Aluminium"],"Even below 2 % carbon it changes the properties a lot."],
 ["What is a dislocation?",["A line defect in the crystal lattice that makes plastic deformation possible","An empty lattice site","A grain boundary","A surface crack"],"An empty lattice site is a vacancy, which is a point defect."],
 ["What structure does titanium have at room temperature?",["HCP (hexagonal close-packed)","FCC","BCC","Amorphous"],"HCP has few slip systems, so such metals are often less formable at room temperature."],
 ["Why are polymers usually much softer than metals?",["They are held together by weak bonds between the chains","They have no atoms","They are always crystalline","They contain a lot of carbon"],"Within the chains the bonds are covalent, but between the chains weak van der Waals forces act."],
 ["What is the atomic packing factor (APF) of FCC?",["0.74","0.68","0.52","1.00"],"BCC has 0.68 and simple cubic 0.52."],
 ["How many atoms belong to one BCC unit cell?",["2","4","1","6"],"One in the centre plus 8 × 1/8 at the corners. FCC has 4."],
 ["What is a phase diagram?",["A map of which phases are stable at different temperatures and compositions","A stress–strain curve","An image of the microstructure","A list of hardness values"],"An example is the iron–carbon diagram."],
 ["What is the difference between crystalline and amorphous materials?",["Crystalline materials have a regular atomic structure; amorphous ones lack long-range order","Amorphous materials are always metals","Crystalline materials are always liquid","There is no difference"],"Glass is amorphous. Most metals are crystalline."],
 ["What is an alloy?",["A mixture of a metal with other elements to obtain desired properties","A pure metal","A polymer","A ceramic"],"Brass is copper and zinc. Bronze is copper and tin."]
]);
EN_Q("MATS1500",1,[
 ["What is the tensile strength $R_m$?",["The highest stress on the stress–strain curve","The stress where the material starts to yield","The modulus of elasticity","The elongation at break"],"$R_e$ or $R_{p0.2}$ is the yield strength."],
 ["What does $R_{p0.2}$ mean?",["The stress that gives 0.2 % permanent strain","Tensile strength at 0.2 mm","Fracture stress at 20 °C","Hardness of 0.2 HV"],"It is used when the material has no distinct yield point."],
 ["Fatigue failure occurs …",["under varying load, even below the yield strength","only under static load above $R_m$","only at high temperature","only in brittle materials"],"Cracks grow a little with every load cycle."],
 ["Which test measures toughness (impact energy)?",["Charpy","Brinell","Vickers","Tensile test"],"A pendulum breaks a notched specimen, and the absorbed energy is measured."],
 ["A ductile material …",["deforms plastically a lot before fracture","breaks without plastic deformation","has no yield strength","is always hard"],"Examples are copper and structural steel. Glass and cast iron are brittle."],
 ["What is work hardening (cold working)?",["Plastic deformation increases strength because dislocations obstruct each other","Heating that softens the metal","Quenching in oil","Chrome surface treatment"],"It is reversed by annealing (recrystallisation)."],
 ["What does a Wöhler (S–N) curve show?",["Stress amplitude versus number of cycles to failure","Hardness versus temperature","Strain versus time","Price versus strength"],"Steel often has an endurance limit where the curve flattens out."]
]);
EN_Q("MATS1500",2,[
 ["What forms when steel is quenched from austenite?",["Martensite","Pearlite","Ferrite","Cementite"],"Martensite is hard and brittle because the carbon is trapped in the lattice."],
 ["Why is steel tempered after hardening?",["To make it less brittle, at slightly lower hardness","To make it harder","To remove the carbon","To increase the grain size"],"You get a better compromise between toughness and hardness."],
 ["Two different metals are in contact in an electrolyte. Which one corrodes?",["The less noble one (the anode)","The more noble one","Both equally","Neither"],"Galvanic corrosion. An example is zinc anodes on boats."],
 ["What makes steel stainless?",["At least about 10.5 % chromium, which forms a passive oxide layer","A lot of carbon","A coat of paint","A lot of nickel alone"],"The Cr₂O₃ layer repairs itself."],
 ["What is creep?",["Time-dependent deformation under constant load at high temperature","Crack growth under cyclic load","Corrosion in seawater","Rapid cooling"],"Creep matters in turbines and boilers."],
 ["What is the glass transition temperature $T_g$ of a polymer?",["The temperature where an amorphous polymer goes from hard and glassy to soft and rubbery","The melting point","The temperature where it burns","The temperature where it crystallises"],"Below $T_g$ amorphous polymers are brittle."],
 ["What is the goal of normalising steel?",["To obtain a fine-grained, uniform structure","To make it as hard as possible","To remove all carbon","To form martensite"],"The steel is heated above the austenite range and cooled in air."],
 ["What is hardenability?",["How deep the steel can be hardened by quenching","How hard the steel can become","How fast the steel rusts","The melting point"],"Alloying elements such as chromium and molybdenum increase hardenability."],
 ["What is case hardening (carburising)?",["Increasing the carbon content of the surface so it becomes hard while the core stays tough","Melting the surface","Painting the steel","Removing carbon"],"Used for gears."],
 ["Why are composites such as carbon fibre used?",["High strength and stiffness relative to weight","They are the cheapest","They withstand the highest temperatures of all","They are the easiest to recycle"],"The properties depend on the fibre direction (anisotropy)."]
]);
EN_Q("MEK3100",0,[
 ["What is `__init__` in a Python class?",["The constructor that runs when an object is created","A private variable","The destructor","A static method"],"It sets up the object's attributes."],
 ["What does `self` refer to in a method?",["The object (instance) the method is called on","The class itself","The parent class","The module"],"`obj.method()` becomes `Class.method(obj)`."],
 ["How do you create the class `Dog` that inherits from `Animal`?",["`class Dog(Animal):`","`class Dog extends Animal:`","`class Dog: Animal`","`Dog = Animal()`"],"The parent class goes in parentheses."],
 ["What is encapsulation?",["Hiding internal state behind a controlled interface","Inheriting methods","Creating many objects","Importing modules"],"In Python, `_name` is the convention for internal attributes."],
 ["What is polymorphism?",["Different classes can have the same method name with different behaviour","A class has many attributes","A function calls itself","A variable can change type"],"For example `area()` can work differently on `Circle` and `Rectangle`."],
 ["What does `super().__init__()` do in a subclass?",["Calls the parent class's constructor","Creates a new object of the parent class","Deletes the object","Makes the method static"],"That is how the parent's attributes are set up."],
 ["What is a `@property` in Python?",["A method that can be read like an attribute","A global variable","A constant","A kind of loop"],"`obj.area` instead of `obj.area()`."]
]);
EN_Q("MEK3100",1,[
 ["What is the time complexity of binary search in a sorted list?",["$O(\\log n)$","$O(n)$","$O(1)$","$O(n^2)$"],"The search range halves at every step."],
 ["What is the average cost of a lookup in a Python `dict`?",["$O(1)$","$O(n)$","$O(\\log n)$","$O(n\\log n)$"],"It is implemented as a hash table."],
 ["A stack follows the principle …",["LIFO: last in, first out","FIFO: first in, first out","random order","sorted order"],"A queue is FIFO."],
 ["What does a recursive function need in order to stop?",["A base case","A global variable","A loop","A `try` block"],"Without a base case you get a `RecursionError`."],
 ["What is the best possible complexity for comparison-based sorting?",["$O(n\\log n)$","$O(n)$","$O(\\log n)$","$O(n^2)$"],"Examples are mergesort and Python's Timsort."],
 ["What is a queue?",["A data structure with FIFO: first in, first out","One with LIFO","A sorted list","A tree"],"In Python `collections.deque` is often used."],
 ["What is a binary search tree?",["A tree where the left child is smaller and the right child larger than the node","A tree with two nodes","A sorted list","A hash table"],"Search, insertion and deletion take $O(\\log n)$ when the tree is balanced."]
]);
EN_Q("MEK3100",2,[
 ["What does `np.linspace(0, 1, 5)` give?",["[0, 0.25, 0.5, 0.75, 1]","[0, 0.2, 0.4, 0.6, 0.8]","[0, 1, 2, 3, 4]","[0.2, 0.4, 0.6, 0.8, 1]"],"Five evenly spaced points, including both end points."],
 ["What does the code give?```a = np.array([1, 2, 3])\nprint(a * 2)```",["[2 4 6]","[1 2 3 1 2 3]","[1 4 9]","TypeError"],"NumPy works element-wise. With a plain list you would get repetition."],
 ["Newton's method: $x_{n+1} = $",["$x_n - f(x_n)/f'(x_n)$","$x_n + f(x_n)$","$x_n - f'(x_n)/f(x_n)$","$(x_n + f(x_n))/2$"],"You follow the tangent down to the zero."],
 ["Euler's explicit method for $y' = f(t, y)$:",["$y_{n+1} = y_n + h\\,f(t_n, y_n)$","$y_{n+1} = y_n + f(t_n, y_n)$","$y_{n+1} = h\\,y_n$","$y_{n+1} = y_n - h\\,f'(y_n)$"],"The method is first-order accurate. Halving $h$ roughly halves the error."],
 ["What does `try` / `except` do?",["Catches and handles exceptions (errors) while the program runs","Tests the code automatically","Repeats the code until it succeeds","Imports modules safely"],"`except ValueError:` catches only that type of error."],
 ["What does `np.dot(A, B)` do for two matrices?",["Matrix multiplication","Element-wise multiplication","Sums all elements","Transposes"],"`A @ B` does the same. `A * B` is element-wise."],
 ["What is vectorisation in NumPy?",["Applying operations to whole arrays instead of Python loops","Turning numbers into vectors on paper","Drawing vectors","Storing data in lists"],"It is often 10–100 times faster."]
]);
EN_Q("DAVE3700",0,[
 ["$f(x, y) = x^2y$. What is $\\partial f/\\partial x$?",["$2xy$","$x^2$","$2x$","$2xy + x^2$"],"Treat $y$ as a constant."],
 ["The gradient $\\nabla f$ points in the direction where …",["$f$ increases fastest","$f$ is constant","$f$ decreases fastest","$f = 0$"],"$\\nabla f$ is perpendicular to the level curves."],
 ["$f = x^2 + y^2$. What is $|\\nabla f|$ at the point $(3, 4)$?",null,"$\\nabla f = (6, 8)$, and its length is 10."],
 ["A critical point has $f_{xx} > 0$ and $D = f_{xx}f_{yy} - f_{xy}^2 > 0$. What kind of point is it?",["Local minimum","Local maximum","Saddle point","The test is inconclusive"],"With $D < 0$ it would be a saddle point."],
 ["Lagrange's method for an extremum of $f$ subject to the constraint $g = 0$:",["$\\nabla f = \\lambda\\nabla g$","$\\nabla f = 0$","$f = \\lambda g$","$\\nabla f\\cdot\\nabla g = 0$"],"The level curves of $f$ and $g$ are tangent to each other."],
 ["What is the chain rule for $z = f(x(t), y(t))$?",["$\\dfrac{dz}{dt} = f_x\\dfrac{dx}{dt} + f_y\\dfrac{dy}{dt}$","$\\dfrac{dz}{dt} = f_xf_y$","$\\dfrac{dz}{dt} = f_x + f_y$","$\\dfrac{dz}{dt} = x'y'$"],"Each contribution goes through its intermediate variable."],
 ["What is the tangent plane to $z = f(x,y)$ at $(a,b)$?",["$z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$","$z = f(a,b)$","$z = f_xx + f_yy$","$z = \\nabla f$"],"It is the basis of linear approximation."]
]);
