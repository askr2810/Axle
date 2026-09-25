// English: fixed questions (MAPE1300, MEK1300)
EN_Q("MAPE1300",0,[
 ["Which conditions must hold for a rigid body in the plane to be in equilibrium?",["$\\sum F_x=0,\\ \\sum F_y=0,\\ \\sum M=0$","Only $\\sum F=0$","Only $\\sum M=0$","$\\sum F = ma$"],"Both the force sum and the moment sum must be zero. In the plane that gives three equations."],
 ["A force of 200 N acts perpendicular to a moment arm of 0.5 m. What is the moment?",null,"$M = F\\cdot d = 200\\cdot 0.5 = 100$ Nm."],
 ["A simply supported beam has length $L$ and a point load $P$ at midspan. What are the support reactions?",["$P/2$ at each end","$P$ at each end","$P$ at one end, 0 at the other","$PL/4$ at each end"],"Symmetry and $\\sum M=0$ mean each support carries half the load. ($PL/4$ is the maximum bending moment.)"],
 ["A force of 100 N points 30° above the horizontal. What is the horizontal component?",null,"$F_x = 100\\cos 30^\\circ \\approx 86.6$ N."],
 ["How many unknown reactions does a fixed support give in 2D?",["3","2","1","6"],"Two forces ($F_x$, $F_y$) and one moment. In 3D it is 6."],
 ["A two-force member (e.g. a bar bolted at both ends with no load in between) carries its force …",["along the line between the attachment points","perpendicular to the bar","always vertically","in any direction"],"With only two forces in equilibrium they must be equal, opposite and on the same line."],
 ["What is a couple?",["Two equal, opposite forces not on the same line that produce a pure moment","Two forces in the same direction","A force and its reaction","Two forces that cancel completely"],"The moment is $F\\cdot d$ and is the same about any point."],
 ["How many unknowns does a roller support give in 2D?",["1","2","3","0"],"Only a force perpendicular to the surface."],
 ["What does it mean that a structure is statically indeterminate?",["It has more unknown reactions than equilibrium equations","It is unstable","It has no supports","The loads are unknown"],"Deformation conditions are then needed as well."]
]);
EN_Q("MAPE1300",1,[
 ["A truss joint has two members that are not collinear and no external load. What can you say about the member forces?",["Both are zero-force members","Both have equal tension","One is in compression, the other in tension","It cannot be determined"],"Equilibrium in two non-parallel directions requires both forces to be zero."],
 ["A 10 kg block rests on a horizontal surface with $\\mu_s = 0.4$. What is the maximum static friction? ($g = 9.81$ m/s²)",null,"$F_{max} = \\mu_s N = 0.4\\cdot 10\\cdot 9.81 \\approx 39.2$ N."],
 ["Where is the centroid of a triangle, measured from the base?",["$h/3$","$h/2$","$2h/3$","$h/4$"],"The centroid is where the medians meet, one third of the height above the base."],
 ["Does Coulomb friction depend on the size of the contact area?",["No, only on the normal force and the coefficient of friction","Yes, a larger area gives more friction","Yes, a larger area gives less friction","Only for kinetic friction"],"$F = \\mu N$. The contact area is not part of the model."],
 ["What is the method of sections used for in trusses?",["Finding the forces in a few selected members quickly","Finding the centroid","Calculating deflection","Finding the coefficient of friction"],"You cut through up to three members and use equilibrium for one of the parts."],
 ["What is the angle of friction $\\varphi$?",["The angle where $\\tan\\varphi = \\mu_s$","The angle between normal force and weight","Always 45°","The angle where friction is zero"],"On an incline steeper than the angle of friction, the block slides."],
 ["Is the kinetic coefficient of friction usually larger or smaller than the static one?",["Smaller","Larger","Always equal","It is always zero"],"That is why things “jerk” when they start to slide."]
]);
EN_Q("MAPE1300",2,[
 ["A car accelerates uniformly from 0 to 20 m/s in 5 s. What is the acceleration?",null,"$a = \\Delta v/\\Delta t = 20/5 = 4$ m/s²."],
 ["A stone falls freely from rest for 2 s. How fast is it moving? ($g = 9.81$ m/s²)",null,"$v = gt = 9.81\\cdot 2 = 19.62$ m/s."],
 ["If the speed doubles, what happens to the kinetic energy?",["It quadruples","It doubles","It halves","It is unchanged"],"$E_k = \\tfrac12 mv^2$, so double $v$ gives four times the $E_k$."],
 ["A 2 kg body moves in a circle of radius 0.5 m at 3 m/s. What is the centripetal force?",null,"$F = mv^2/r = 2\\cdot 9/0.5 = 36$ N."],
 ["Impulse ($\\int F\\,dt$) equals …",["the change in momentum","the change in kinetic energy","the work done","the power"],"Impulse–momentum theorem: $\\int F\\,dt = \\Delta(mv)$."],
 ["What is the difference between an elastic and a perfectly inelastic collision?",["Kinetic energy is conserved in an elastic collision; in a perfectly inelastic one the bodies stick together","Momentum is only conserved in elastic collisions","Inelastic collisions only happen in liquids","There is no difference"],"Momentum is conserved in both cases."],
 ["What is the direction of the acceleration in uniform circular motion?",["Towards the centre","Along the velocity","Away from the centre","It is zero"],"The speed is constant, but the direction changes."]
]);
EN_Q("MAPE1300",3,[
 ["How are shear force $V$ and bending moment $M$ related along a beam?",["$dM/dx = V$","$dV/dx = M$","$M = V\\cdot x^2$","They are independent"],"The moment has an extreme value where the shear force changes sign."],
 ["Where is the bending moment largest in a simply supported beam with a uniformly distributed load?",["At midspan","At the supports","A quarter in from each end","It is constant"],"The shear force is zero there. $M_{max} = qL^2/8$."],
 ["What is the maximum moment in a cantilever with a uniformly distributed load $q$ and length $L$?",["$qL^2/2$ at the fixed end","$qL^2/8$ at midspan","$qL$ at the free end","$qL^2/12$"],"The resultant $qL$ acts at $L/2$ from the fixed end."],
 ["What does the moment diagram look like for a simply supported beam with one point load?",["Triangular with the peak under the load","Parabolic","Rectangular","Zero everywhere"],"The moment grows linearly from each support towards the load."],
 ["What happens to the deflection if you double the length of a simply supported beam with a point load at midspan?",["It becomes 8 times larger","It doubles","It quadruples","It is unchanged"],"$\\delta = PL^3/(48EI)$, so it is proportional to $L^3$."],
 ["Why are steel beams often made as I-sections?",["Lots of material far from the neutral axis gives a large $I$ per kilogram","They are the easiest to weld","They resist torsion best","They rust less"],"The flanges take the bending stress and the web takes the shear force."],
 ["What happens to the shear force just left and right of a point load $P$?",["It jumps by $P$","It is the same on both sides","It becomes zero","It doubles"],"Point loads give jumps in the shear diagram and kinks in the moment diagram."],
 ["What does the shear diagram look like for a uniformly distributed load?",["Linear","Constant","Parabolic","Cubic"],"$dV/dx = -q$. The moment diagram then becomes a parabola."]
]);
EN_Q("MEK1300",0,[
 ["What does `print(7 // 2)` print?",["3","3.5","4","1"],"`//` is integer (floor) division and rounds down."],
 ["What does `print(7 % 3)` print?",["1","2","0","2.33"],"`%` gives the remainder: $7 = 2\\cdot 3 + 1$."],
 ["What type does the expression `3 / 2` have in Python 3?",["float","int","str","decimal"],"`/` always gives a float in Python 3 (1.5)."],
 ["What does the code print?```x = [1, 2, 3]\nprint(x[-1])```",["3","1","-1","IndexError"],"Negative indices count from the end; `-1` is the last element."],
 ["What is `\"abc\" * 2`?",["\"abcabc\"","\"aabbcc\"","TypeError","\"abc2\""],"Multiplying a string by an integer repeats it."],
 ["What does `f\"{3.14159:.2f}\"` give?",["\"3.14\"","\"3.1\"","\"3.14159\"","\"3,14\""],"`.2f` means two decimals."],
 ["What does `bool(0)` give?",["False","True","0","None"],"0, the empty string, the empty list and `None` count as false."],
 ["What does `\"5\" + \"3\"` give?",["\"53\"","8","\"8\"","TypeError"],"`+` between strings concatenates them."],
 ["What does `int(\"42\") + 1` give?",["43","\"421\"","TypeError","42"],"`int` converts the string to an integer first."],
 ["What does `\"Hei\".upper()` give?",["\"HEI\"","\"hei\"","\"Hei\"","Error"],"`upper()` returns a new string in upper case."],
 ["What does `10 ** -1` give?",["0.1","-10","10","Error"],"A negative exponent gives the reciprocal: $10^{-1}$."],
 ["What does `type([1, 2])` give?",["list","tuple","dict","set"],"Square brackets create a list."]
]);
EN_Q("MEK1300",1,[
 ["What does the code print?```for i in range(2, 8, 2):\n    print(i, end=\" \")```",["2 4 6","2 4 6 8","2 3 4 5 6 7","0 2 4 6"],"`range(start, stop, step)`. The stop value is not included."],
 ["How many times does the loop run?```n = 0\nwhile n < 10:\n    n += 3```",["4","3","10","Infinitely many"],"n goes 0 → 3 → 6 → 9 → 12. The loop runs 4 times."],
 ["What does `[i**2 for i in range(4)]` give?",["[0, 1, 4, 9]","[1, 4, 9, 16]","[0, 2, 4, 6]","[0, 1, 2, 3]"],"A list comprehension over 0, 1, 2, 3 where each number is squared."],
 ["Which expression is the same as `x > 5 and x < 10`?",["`5 < x < 10`","`5 > x > 10`","`x in range(5, 10)`","`not (x < 5 or x > 10)`"],"Python supports chained comparisons. `range` is wrong because it only covers integers and includes 5."],
 ["What does `break` do in a loop?",["Exits the loop immediately","Skips to the next iteration","Ends the program","Restarts the loop"],"`continue` skips to the next iteration, while `break` leaves the loop entirely."],
 ["What does `continue` do in a loop?",["Skips the rest of the iteration and moves to the next","Exits the loop","Ends the program","Repeats the same iteration"],"`break` exits the whole loop."],
 ["What does the code print?```for i in range(3):\n    pass\nprint(i)```",["2","3","0","NameError"],"The loop variable keeps its last value after the loop."],
 ["What does the code print?```x = 5\nwhile x > 0:\n    x -= 2\nprint(x)```",["-1","0","1","-2"],"x goes 5 → 3 → 1 → −1. Then the loop stops."],
 ["What does `list(range(5, 0, -1))` give?",["[5, 4, 3, 2, 1]","[5, 4, 3, 2, 1, 0]","[0, 1, 2, 3, 4]","[]"],"A negative step counts down. The stop value 0 is not included."]
]);
EN_Q("MEK1300",2,[
 ["What does a function without a `return` statement return?",["None","0","An empty string","It raises an error"],"Python returns `None` implicitly."],
 ["What does `f(3)` return?```def f(a, b=2):\n    return a * b```",["6","3","5","TypeError"],"`b` gets its default value 2, so $3\\cdot 2 = 6$."],
 ["What does the code print?```d = {\"a\": 1}\nd[\"b\"] = 2\nprint(len(d))```",["2","1","3","KeyError"],"Assigning to a new key adds it to the dictionary."],
 ["What is the main difference between a list and a tuple?",["A tuple cannot be changed after it is created","A tuple can only hold numbers","A list cannot hold duplicates","There is no difference"],"Tuples are immutable. Lists are mutable."],
 ["What does `s.split(\",\")` do when `s = \"a,b,c\"`?",["Gives ['a', 'b', 'c']","Gives 'abc'","Gives ('a', 'b', 'c')","Removes the commas in `s`"],"`split` splits the string at the separator and returns a list."],
 ["What does the code print?```def f(x):\n    x.append(4)\n\na = [1, 2, 3]\nf(a)\nprint(len(a))```",["4","3","None","TypeError"],"Lists are passed by reference, so `f` modifies the same list."],
 ["What does `print(sorted([3, 1, 2], reverse=True))` print?",["[3, 2, 1]","[1, 2, 3]","None","[2, 1, 3]"],"`sorted` returns a new, sorted list."],
 ["What does `return` do in a function?",["Ends the function and sends a value back","Prints a value","Restarts the function","Imports a module"],"Code after `return` in the same branch is not run."],
 ["What is a local variable?",["A variable that only exists inside the function where it was created","A variable in a separate file","A constant","A variable every function can change"],"Global variables can only be reassigned inside a function with `global`."]
]);
