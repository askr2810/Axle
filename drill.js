// ============================================================
//  GRUNNBEGREPER – korte kort med matte- og fysikkfakta du ikke vil glemme
//  (integralet av cos, produktregelen, Newtons lover …), med repetisjon med økende mellomrom:
//  riktig svar → kortet kommer igjen om 3, 7, 16, 35 og 70 dager. Feil → i morgen, og på nytt i samme runde.
//  Status lagres i S.drill = { id: { b: boks 1–6, due: "ÅÅÅÅ-MM-DD", w: antall feil, at: tidspunkt } }.
// ============================================================
const DR_TAGS = {
  der: ["Derivasjon", "Derivatives"], int: ["Integrasjon", "Integrals"], trig: ["Trigonometri", "Trigonometry"], log: ["Potenser og logaritmer", "Powers and logarithms"],
  alg: ["Algebra og funksjoner", "Algebra and functions"], vec: ["Vektorer og matriser", "Vectors and matrices"], cplx: ["Komplekse tall", "Complex numbers"],
  lim: ["Grenser og rekker", "Limits and series"], stat: ["Statistikk", "Statistics"], ode: ["Differensialligninger", "Differential equations"],
  kin: ["Bevegelse", "Motion"], dyn: ["Krefter", "Forces"], en: ["Energi og bevegelsesmengde", "Energy and momentum"], rot: ["Sirkelbevegelse og gravitasjon", "Circular motion and gravity"],
  wav: ["Svingninger og bølger", "Oscillations and waves"], el: ["Elektrisitet", "Electricity"], th: ["Termodynamikk", "Thermodynamics"], fl: ["Fluider", "Fluids"], unit: ["Enheter og konstanter", "Units and constants"]
};
const DR_MATH = new Set(["der", "int", "trig", "log", "alg", "vec", "cplx", "lim", "stat", "ode"]);
// [id, tagg, spørsmål (nb | [nb, en]), riktig svar, [tre gale], forklaring (nb | [nb, en])]. Svar kan også være [nb, en].
const DS = String.raw;
const DRILL = [
  // ---------- derivasjon ----------
  ["d1", "der", DS`Hva er $\dfrac{d}{dx}\sin x$?`, DS`$\cos x$`, [DS`$-\cos x$`, DS`$-\sin x$`, DS`$\sin x$`], DS`Sinus deriveres til cosinus. Tenk på grafen: stigningen til $\sin x$ er størst i $x = 0$, der $\cos 0 = 1$.`],
  ["d2", "der", DS`Hva er $\dfrac{d}{dx}\cos x$?`, DS`$-\sin x$`, [DS`$\sin x$`, DS`$\cos x$`, DS`$-\cos x$`], DS`Cosinus deriveres til minus sinus. Rett etter $x = 0$ faller $\cos x$, og $-\sin x$ er negativ der.`],
  ["d3", "der", DS`Hva er $\dfrac{d}{dx}e^{kx}$?`, DS`$k\,e^{kx}$`, [DS`$e^{kx}$`, DS`$kx\,e^{kx-1}$`, DS`$\dfrac{e^{kx}}{k}$`], DS`Kjerneregelen: den deriverte av $e^u$ er $e^u\cdot u'$, og $u' = k$.`],
  ["d4", "der", DS`Hva er $\dfrac{d}{dx}\ln x$?`, DS`$\dfrac{1}{x}$`, [DS`$\ln x$`, DS`$\dfrac{1}{\ln x}$`, DS`$x\ln x - x$`], DS`$\ln x$ deriveres til $1/x$ (for $x > 0$).`],
  ["d5", "der", DS`Hva er $\dfrac{d}{dx}x^n$?`, DS`$n\,x^{n-1}$`, [DS`$x^{n-1}$`, DS`$\dfrac{x^{n+1}}{n+1}$`, DS`$n\,x^{n+1}$`], DS`Potensregelen: flytt eksponenten ned foran og trekk 1 fra eksponenten.`],
  ["d6", "der", ["Hva sier produktregelen?", "What does the product rule say?"], DS`$(uv)' = u'v + uv'$`, [DS`$(uv)' = u'v'$`, DS`$(uv)' = u'v - uv'$`, DS`$(uv)' = \dfrac{u'v - uv'}{v^2}$`], ["Deriver én faktor om gangen og legg sammen: $u'v + uv'$.", "Differentiate one factor at a time and add: $u'v + uv'$."]],
  ["d7", "der", ["Hva sier kvotientregelen?", "What does the quotient rule say?"], DS`$\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$`, [DS`$\left(\dfrac{u}{v}\right)' = \dfrac{u'}{v'}$`, DS`$\left(\dfrac{u}{v}\right)' = \dfrac{u'v + uv'}{v^2}$`, DS`$\left(\dfrac{u}{v}\right)' = \dfrac{uv' - u'v}{v}$`], ["Teller: «den deriverte av teller ganger nevner minus teller ganger den deriverte av nevner». Nevner i andre.", "Numerator: derivative of top times bottom minus top times derivative of bottom. Denominator squared."]],
  ["d8", "der", ["Hva sier kjerneregelen for $f(g(x))$?", "What does the chain rule say for $f(g(x))$?"], DS`$f'(g(x))\cdot g'(x)$`, [DS`$f'(x)\cdot g'(x)$`, DS`$f'(g'(x))$`, DS`$f(g'(x))$`], ["Deriver den ytre funksjonen med kjernen uendret, og gang med den deriverte av kjernen.", "Differentiate the outer function with the inner one unchanged, then multiply by the derivative of the inner function."]],
  ["d9", "der", DS`Hva er $\dfrac{d}{dx}\tan x$?`, DS`$\dfrac{1}{\cos^2 x}$`, [DS`$\dfrac{1}{\sin^2 x}$`, DS`$-\dfrac{1}{\cos^2 x}$`, DS`$\cot x$`], DS`$\tan x = \sin x/\cos x$. Kvotientregelen gir $(\cos^2 x + \sin^2 x)/\cos^2 x = 1/\cos^2 x = 1 + \tan^2 x$.`],
  ["d10", "der", DS`Hva er $\dfrac{d}{dx}\sin(3x)$?`, DS`$3\cos(3x)$`, [DS`$\cos(3x)$`, DS`$-3\cos(3x)$`, DS`$3\cos x$`], DS`Kjerneregelen: ytre $\cos(3x)$ ganger indre $(3x)' = 3$.`],
  ["d11", "der", DS`Hva er $\dfrac{d}{dx}\,x\,e^{x}$?`, DS`$(x+1)\,e^{x}$`, [DS`$e^{x}$`, DS`$x\,e^{x}$`, DS`$x\,e^{x-1}$`], DS`Produktregelen: $1\cdot e^x + x\cdot e^x = (x+1)e^x$.`],
  ["d12", "der", DS`Hva er $\dfrac{d}{dx}\sqrt{x}$?`, DS`$\dfrac{1}{2\sqrt{x}}$`, [DS`$\dfrac{\sqrt{x}}{2}$`, DS`$2\sqrt{x}$`, DS`$\dfrac{2}{3}x^{3/2}$`], DS`$\sqrt{x} = x^{1/2}$, så den deriverte er $\tfrac12 x^{-1/2} = \dfrac{1}{2\sqrt x}$.`],
  ["d13", "der", ["Hva betyr $f'(a) = 0$ grafisk?", "What does $f'(a) = 0$ mean graphically?"], ["Tangenten er vannrett i $x = a$", "The tangent is horizontal at $x = a$"], [["Grafen krysser $x$-aksen i $a$", "The graph crosses the $x$-axis at $a$"], ["Funksjonen er null i $a$", "The function is zero at $a$"], ["Grafen er loddrett i $a$", "The graph is vertical at $a$"]], ["Den deriverte er stigningstallet til tangenten. Null stigning betyr vannrett tangent: ofte et topp- eller bunnpunkt.", "The derivative is the slope of the tangent. Zero slope means a horizontal tangent: often a maximum or minimum."]],
  ["d14", "der", ["Hva forteller $f''(x) > 0$?", "What does $f''(x) > 0$ tell you?"], ["Grafen krummer oppover (konveks)", "The graph curves upwards (convex)"], [["Funksjonen vokser", "The function is increasing"], ["Funksjonen er positiv", "The function is positive"], ["Grafen har et toppunkt", "The graph has a maximum"]], ["Den andrederiverte beskriver krumningen. Positiv betyr at stigningen øker, altså en «smilende» graf.", "The second derivative describes curvature. Positive means the slope is increasing: a \"smiling\" graph."]],
  // ---------- integrasjon ----------
  ["i1", "int", DS`Hva er $\displaystyle\int \cos x\,dx$?`, DS`$\sin x + C$`, [DS`$-\sin x + C$`, DS`$\cos x + C$`, DS`$-\cos x + C$`], DS`Integrasjon er det motsatte av derivasjon, og $(\sin x)' = \cos x$.`],
  ["i2", "int", DS`Hva er $\displaystyle\int \sin x\,dx$?`, DS`$-\cos x + C$`, [DS`$\cos x + C$`, DS`$\sin x + C$`, DS`$-\sin x + C$`], DS`$(-\cos x)' = \sin x$. Minustegnet er lett å glemme!`],
  ["i3", "int", DS`Hva er $\displaystyle\int x^n\,dx$ (for $n \ne -1$)?`, DS`$\dfrac{x^{n+1}}{n+1} + C$`, [DS`$n\,x^{n-1} + C$`, DS`$\dfrac{x^{n}}{n} + C$`, DS`$x^{n+1} + C$`], DS`Legg 1 til eksponenten og del på den nye eksponenten. Sjekk: deriverer du svaret, får du $x^n$ tilbake.`],
  ["i4", "int", DS`Hva er $\displaystyle\int \dfrac{1}{x}\,dx$?`, DS`$\ln|x| + C$`, [DS`$\dfrac{x^0}{0} + C$`, DS`$-\dfrac{1}{x^2} + C$`, DS`$e^x + C$`], DS`Potensregelen virker ikke for $n = -1$. Her er svaret $\ln|x|$, siden $(\ln x)' = 1/x$.`],
  ["i5", "int", DS`Hva er $\displaystyle\int e^{kx}\,dx$?`, DS`$\dfrac{1}{k}e^{kx} + C$`, [DS`$k\,e^{kx} + C$`, DS`$e^{kx} + C$`, DS`$\dfrac{e^{kx+1}}{kx+1} + C$`], DS`Deriverer du $\tfrac1k e^{kx}$, får du $e^{kx}$. Del på den indre deriverte.`],
  ["i6", "int", ["Hva sier delvis integrasjon?", "What does integration by parts say?"], DS`$\displaystyle\int u\,v'\,dx = uv - \int u'\,v\,dx$`, [DS`$\displaystyle\int u\,v'\,dx = u'v' - \int uv\,dx$`, DS`$\displaystyle\int u\,v'\,dx = uv + \int u'\,v\,dx$`, DS`$\displaystyle\int u\,v'\,dx = u\int v'\,dx$`], ["Det er produktregelen baklengs. Velg $u$ som blir enklere når den deriveres (f.eks. $x$).", "It is the product rule backwards. Choose $u$ as the factor that gets simpler when differentiated (e.g. $x$)."]],
  ["i7", "int", DS`Hva er $\displaystyle\int_0^{\pi} \sin x\,dx$?`, DS`$2$`, [DS`$0$`, DS`$1$`, DS`$\pi$`], DS`$[-\cos x]_0^{\pi} = -\cos\pi + \cos 0 = 1 + 1 = 2$.`],
  ["i8", "int", ["Hva sier analysens fundamentalteorem?", "What does the fundamental theorem of calculus say?"], DS`$\displaystyle\int_a^b f(x)\,dx = F(b) - F(a)$, der $F' = f$`, [DS`$\displaystyle\int_a^b f(x)\,dx = f(b) - f(a)$`, DS`$\displaystyle\int_a^b f(x)\,dx = F(a) - F(b)$`, DS`$\displaystyle\int_a^b f(x)\,dx = f'(b) - f'(a)$`], ["Finn en antiderivert $F$ og regn ut forskjellen mellom endepunktene.", "Find an antiderivative $F$ and take the difference between the end points."]],
  ["i9", "int", DS`Hva er $\displaystyle\int \dfrac{1}{1+x^2}\,dx$?`, DS`$\arctan x + C$`, [DS`$\ln(1+x^2) + C$`, DS`$\dfrac{1}{2x} + C$`, DS`$\arcsin x + C$`], DS`$(\arctan x)' = \dfrac{1}{1+x^2}$.`],
  ["i10", "int", DS`Hva er $\displaystyle\int \cos(2x)\,dx$?`, DS`$\tfrac12\sin(2x) + C$`, [DS`$2\sin(2x) + C$`, DS`$\sin(2x) + C$`, DS`$-\tfrac12\sin(2x) + C$`], DS`Del på den indre deriverte 2: $(\tfrac12\sin 2x)' = \cos 2x$.`],
  ["i11", "int", ["Hva måler $\\int_a^b f(x)\\,dx$ når $f \\ge 0$?", "What does $\\int_a^b f(x)\\,dx$ measure when $f \\ge 0$?"], ["Arealet under grafen fra $a$ til $b$", "The area under the graph from $a$ to $b$"], [["Stigningen i $b$", "The slope at $b$"], ["Gjennomsnittet av $a$ og $b$", "The mean of $a$ and $b$"], ["Lengden av grafen", "The length of the graph"]], ["Integralet summerer uendelig mange tynne søyler $f(x)\\,dx$.", "The integral sums infinitely many thin strips $f(x)\\,dx$."]],
  // ---------- trigonometri ----------
  ["t1", "trig", ["Hva er enhetsformelen (trigonometrisk identitet)?", "What is the Pythagorean identity?"], DS`$\sin^2 x + \cos^2 x = 1$`, [DS`$\sin x + \cos x = 1$`, DS`$\sin^2 x - \cos^2 x = 1$`, DS`$\tan^2 x + 1 = \sin^2 x$`], ["Punktet $(\\cos x, \\sin x)$ ligger på enhetssirkelen, og Pytagoras gir summen 1.", "The point $(\\cos x, \\sin x)$ lies on the unit circle, and Pythagoras gives the sum 1."]],
  ["t2", "trig", DS`Hva er $\sin 30^\circ$?`, DS`$\tfrac12$`, [DS`$\tfrac{\sqrt3}{2}$`, DS`$\tfrac{\sqrt2}{2}$`, DS`$1$`], DS`I en likesidet trekant delt i to er motstående katet halvparten av hypotenusen: $\sin 30^\circ = 1/2$.`],
  ["t3", "trig", DS`Hva er $\cos 60^\circ$?`, DS`$\tfrac12$`, [DS`$\tfrac{\sqrt3}{2}$`, DS`$0$`, DS`$\tfrac{\sqrt2}{2}$`], DS`$\cos 60^\circ = \sin 30^\circ = 1/2$.`],
  ["t4", "trig", DS`Hva er $\sin 45^\circ$?`, DS`$\tfrac{\sqrt2}{2}$`, [DS`$\tfrac12$`, DS`$\tfrac{\sqrt3}{2}$`, DS`$1$`], DS`I en likebeint rettvinklet trekant med kateter 1 er hypotenusen $\sqrt2$, så $\sin 45^\circ = 1/\sqrt2 = \sqrt2/2$.`],
  ["t5", "trig", ["Hvor mange radianer er $180^\\circ$?", "How many radians is $180^\\circ$?"], DS`$\pi$`, [DS`$2\pi$`, DS`$\tfrac{\pi}{2}$`, DS`$180$`], ["En halv sirkel er $\\pi$ radianer. Omregning: $v_{rad} = v^\\circ\\cdot\\pi/180$.", "Half a circle is $\\pi$ radians. Conversion: $v_{rad} = v^\\circ\\cdot\\pi/180$."]],
  ["t6", "trig", DS`Hva er $\sin(2x)$?`, DS`$2\sin x\cos x$`, [DS`$2\sin x$`, DS`$\sin^2 x - \cos^2 x$`, DS`$\sin x + \cos x$`], DS`Dobbel vinkel: $\sin 2x = 2\sin x\cos x$.`],
  ["t7", "trig", DS`Hva er $\cos(2x)$?`, DS`$\cos^2 x - \sin^2 x$`, [DS`$2\cos x$`, DS`$2\sin x\cos x$`, DS`$1 + 2\sin^2 x$`], DS`$\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x$.`],
  ["t8", "trig", ["Hva er cosinussetningen?", "What is the law of cosines?"], DS`$c^2 = a^2 + b^2 - 2ab\cos C$`, [DS`$c^2 = a^2 + b^2$`, DS`$c^2 = a^2 + b^2 + 2ab\cos C$`, DS`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B}$`], ["Pytagoras med et korreksjonsledd. Når $C = 90^\\circ$ er $\\cos C = 0$, og du får Pytagoras.", "Pythagoras with a correction term. When $C = 90^\\circ$, $\\cos C = 0$ and you get Pythagoras."]],
  ["t9", "trig", ["Hva er sinussetningen?", "What is the law of sines?"], DS`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$`, [DS`$a\sin A = b\sin B$`, DS`$c^2 = a^2 + b^2 - 2ab\cos C$`, DS`$\dfrac{\sin A}{b} = \dfrac{\sin B}{a}$`], ["Forholdet mellom en side og sinus til motstående vinkel er likt for alle tre sidene.", "The ratio of a side to the sine of its opposite angle is the same for all three sides."]],
  ["t10", "trig", ["I en rettvinklet trekant, hva er $\\tan v$?", "In a right triangle, what is $\\tan v$?"], ["motstående katet / hosliggende katet", "opposite / adjacent"], [["hosliggende katet / hypotenus", "adjacent / hypotenuse"], ["motstående katet / hypotenus", "opposite / hypotenuse"], ["hypotenus / motstående katet", "hypotenuse / opposite"]], ["SOH-CAH-TOA: tangens = motstående over hosliggende.", "SOH-CAH-TOA: tangent = opposite over adjacent."]],
  // ---------- potenser og logaritmer ----------
  ["l1", "log", DS`Hva er $\ln(ab)$?`, DS`$\ln a + \ln b$`, [DS`$\ln a\cdot\ln b$`, DS`$\ln(a+b)$`, DS`$b\ln a$`], DS`Logaritmen gjør produkt om til sum.`],
  ["l2", "log", DS`Hva er $\ln(a^k)$?`, DS`$k\ln a$`, [DS`$(\ln a)^k$`, DS`$\ln k + \ln a$`, DS`$a\ln k$`], DS`Eksponenten kan flyttes ned foran: $\ln a^k = k\ln a$.`],
  ["l3", "log", DS`Hva er $a^m\cdot a^n$?`, DS`$a^{m+n}$`, [DS`$a^{mn}$`, DS`$(2a)^{m+n}$`, DS`$a^{m-n}$`], DS`Samme grunntall: legg sammen eksponentene.`],
  ["l4", "log", DS`Hva er $(a^m)^n$?`, DS`$a^{mn}$`, [DS`$a^{m+n}$`, DS`$a^{m^n}$`, DS`$m\,a^n$`], DS`Potens av potens: gang eksponentene.`],
  ["l5", "log", DS`Hva er $a^{-n}$?`, DS`$\dfrac{1}{a^n}$`, [DS`$-a^n$`, DS`$a^{1/n}$`, DS`$\sqrt[n]{a}$`], DS`Negativ eksponent betyr den omvendte: $a^{-n} = 1/a^n$.`],
  ["l6", "log", DS`Hva er $\ln e$?`, DS`$1$`, [DS`$0$`, DS`$e$`, DS`$\approx 2{,}718$`], DS`$\ln$ er logaritmen med grunntall $e$, og $e^1 = e$.`],
  ["l7", "log", DS`Hva er $\lg 1000$ (tierlogaritmen)?`, DS`$3$`, [DS`$1000$`, DS`$30$`, DS`$0{,}001$`], DS`$10^3 = 1000$, så $\lg 1000 = 3$.`],
  ["l8", "log", DS`Hva er $a^{1/n}$?`, DS`$\sqrt[n]{a}$`, [DS`$\dfrac{a}{n}$`, DS`$\dfrac{1}{a^n}$`, DS`$a^n$`], DS`En brøkeksponent er en rot: $a^{1/2} = \sqrt a$, $a^{1/3} = \sqrt[3]{a}$.`],
  ["l9", "log", DS`Løs $e^{x} = 5$.`, DS`$x = \ln 5$`, [DS`$x = 5/e$`, DS`$x = \lg 5$`, DS`$x = e^5$`], DS`Ta $\ln$ på begge sider: $x = \ln 5 \approx 1{,}61$.`],
  // ---------- algebra og funksjoner ----------
  ["a1", "alg", ["Hva er abc-formelen for $ax^2 + bx + c = 0$?", "What is the quadratic formula for $ax^2 + bx + c = 0$?"], DS`$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`, [DS`$x = \dfrac{b \pm \sqrt{b^2 - 4ac}}{2a}$`, DS`$x = \dfrac{-b \pm \sqrt{b^2 + 4ac}}{2a}$`, DS`$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{a}$`], ["Husk minus foran $b$ og $2a$ under hele brøken.", "Remember the minus in front of $b$ and $2a$ under the whole fraction."]],
  ["a2", "alg", DS`Hva er $(a+b)^2$?`, DS`$a^2 + 2ab + b^2$`, [DS`$a^2 + b^2$`, DS`$a^2 + ab + b^2$`, DS`$2a + 2b$`], DS`Første kvadratsetning. Det vanligste feilsvaret er å glemme $2ab$.`],
  ["a3", "alg", DS`Hva er $(a+b)(a-b)$?`, DS`$a^2 - b^2$`, [DS`$a^2 + b^2$`, DS`$(a-b)^2$`, DS`$a^2 - 2ab + b^2$`], DS`Konjugatsetningen: midtleddene $-ab$ og $+ab$ nuller hverandre ut.`],
  ["a4", "alg", ["Hva er stigningstallet til linja gjennom $(x_1, y_1)$ og $(x_2, y_2)$?", "What is the slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$?"], DS`$\dfrac{y_2 - y_1}{x_2 - x_1}$`, [DS`$\dfrac{x_2 - x_1}{y_2 - y_1}$`, DS`$y_2 - y_1$`, DS`$\dfrac{y_2 + y_1}{x_2 + x_1}$`], ["Endring i $y$ delt på endring i $x$.", "Change in $y$ divided by change in $x$."]],
  ["a5", "alg", ["Hva er diskriminanten, og hva betyr $b^2 - 4ac < 0$?", "What does a discriminant $b^2 - 4ac < 0$ mean?"], ["Ingen reelle løsninger", "No real solutions"], [["To reelle løsninger", "Two real solutions"], ["Én dobbel løsning", "One double solution"], ["Uendelig mange løsninger", "Infinitely many solutions"]], ["Negativt tall under rottegnet: løsningene er komplekse, og parabelen krysser ikke $x$-aksen.", "A negative number under the root: the solutions are complex, and the parabola does not cross the $x$-axis."]],
  ["a6", "alg", ["Hva er avstanden mellom $(x_1, y_1)$ og $(x_2, y_2)$?", "What is the distance between $(x_1, y_1)$ and $(x_2, y_2)$?"], DS`$\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$`, [DS`$(x_2-x_1) + (y_2-y_1)$`, DS`$\sqrt{x_2^2 + y_2^2} - \sqrt{x_1^2 + y_1^2}$`, DS`$(x_2-x_1)^2 + (y_2-y_1)^2$`], ["Pytagoras på forskjellene i $x$ og $y$.", "Pythagoras on the differences in $x$ and $y$."]],
  ["a7", "alg", ["Hva er arealet av en sirkel med radius $r$?", "What is the area of a circle with radius $r$?"], DS`$\pi r^2$`, [DS`$2\pi r$`, DS`$\pi d$`, DS`$\tfrac43\pi r^3$`], ["$2\\pi r$ er omkretsen, $\\tfrac43\\pi r^3$ er volumet av en kule.", "$2\\pi r$ is the circumference, $\\tfrac43\\pi r^3$ is the volume of a sphere."]],
  ["a8", "alg", ["Hva er volumet av en kule med radius $r$?", "What is the volume of a sphere with radius $r$?"], DS`$\tfrac43\pi r^3$`, [DS`$4\pi r^2$`, DS`$\pi r^2 h$`, DS`$\tfrac13\pi r^3$`], ["$4\\pi r^2$ er overflaten av kula.", "$4\\pi r^2$ is the surface area of the sphere."]],
  // ---------- vektorer og matriser ----------
  ["v1", "vec", DS`Hva er skalarproduktet $\vec a\cdot\vec b$?`, DS`$|\vec a||\vec b|\cos\theta$`, [DS`$|\vec a||\vec b|\sin\theta$`, DS`$|\vec a| + |\vec b|$`, DS`$\vec a\times\vec b$`], DS`Også $a_x b_x + a_y b_y + a_z b_z$. Er det null, står vektorene vinkelrett.`],
  ["v2", "vec", ["Hva betyr $\\vec a\\cdot\\vec b = 0$ (begge ulik null)?", "What does $\\vec a\\cdot\\vec b = 0$ mean (both non-zero)?"], ["Vektorene står vinkelrett på hverandre", "The vectors are perpendicular"], [["Vektorene er parallelle", "The vectors are parallel"], ["Vektorene er like lange", "The vectors have equal length"], ["Vektorene er like", "The vectors are equal"]], ["$\\cos 90^\\circ = 0$.", "$\\cos 90^\\circ = 0$."]],
  ["v3", "vec", DS`Hva er lengden av $\vec a = (3, 4)$?`, DS`$5$`, [DS`$7$`, DS`$25$`, DS`$1$`], DS`$|\vec a| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.`],
  ["v4", "vec", DS`Hva er determinanten til $\begin{pmatrix} a & b\\ c & d\end{pmatrix}$?`, DS`$ad - bc$`, [DS`$ab - cd$`, DS`$ad + bc$`, DS`$ac - bd$`], DS`Hoveddiagonal minus bidiagonal. Er determinanten null, har matrisen ingen invers.`],
  ["v5", "vec", ["Hvilken retning har kryssproduktet $\\vec a\\times\\vec b$?", "Which direction does the cross product $\\vec a\\times\\vec b$ have?"], ["Vinkelrett på både $\\vec a$ og $\\vec b$ (høyrehåndsregelen)", "Perpendicular to both $\\vec a$ and $\\vec b$ (right-hand rule)"], [["Langs $\\vec a$", "Along $\\vec a$"], ["Midt mellom $\\vec a$ og $\\vec b$", "Halfway between $\\vec a$ and $\\vec b$"], ["Det er et tall, ikke en vektor", "It is a number, not a vector"]], ["Lengden er $|\\vec a||\\vec b|\\sin\\theta$, lik arealet av parallellogrammet de utspenner.", "Its length is $|\\vec a||\\vec b|\\sin\\theta$, the area of the parallelogram they span."]],
  ["v6", "vec", ["Hva kjennetegner en egenvektor $\\vec v$ til $A$?", "What characterizes an eigenvector $\\vec v$ of $A$?"], DS`$A\vec v = \lambda\vec v$`, [DS`$A\vec v = \vec 0$`, DS`$A\vec v = \vec v^T$`, DS`$A^{-1}\vec v = A\vec v$`], ["Matrisen bare strekker (eller snur) vektoren, med faktoren $\\lambda$.", "The matrix only stretches (or flips) the vector, by the factor $\\lambda$."]],
  // ---------- komplekse tall ----------
  ["c1", "cplx", DS`Hva er $i^2$?`, DS`$-1$`, [DS`$1$`, DS`$i$`, DS`$-i$`], DS`Definisjonen av den imaginære enheten.`],
  ["c2", "cplx", ["Hva sier Eulers formel?", "What does Euler's formula say?"], DS`$e^{i\theta} = \cos\theta + i\sin\theta$`, [DS`$e^{i\theta} = \sin\theta + i\cos\theta$`, DS`$e^{i\theta} = \cos\theta - i\sin\theta$`, DS`$e^{i\theta} = 1 + i\theta$`], ["Med $\\theta = \\pi$ får du $e^{i\\pi} = -1$.", "With $\\theta = \\pi$ you get $e^{i\\pi} = -1$."]],
  ["c3", "cplx", DS`Hva er $|3 + 4i|$?`, DS`$5$`, [DS`$7$`, DS`$1$`, DS`$\sqrt7$`], DS`$|a + bi| = \sqrt{a^2 + b^2} = \sqrt{9 + 16} = 5$.`],
  ["c4", "cplx", DS`Hva er den konjugerte av $a + bi$?`, DS`$a - bi$`, [DS`$-a + bi$`, DS`$-a - bi$`, DS`$b + ai$`], DS`Bytt fortegn på imaginærdelen. $z\bar z = a^2 + b^2$.`],
  // ---------- grenser og rekker ----------
  ["r1", "lim", DS`Hva er $\displaystyle\lim_{x\to 0}\dfrac{\sin x}{x}$?`, DS`$1$`, [DS`$0$`, DS`$\infty$`, DS`$\text{finnes ikke}$`], DS`For små vinkler (i radianer) er $\sin x \approx x$.`],
  ["r2", "lim", ["Hva er summen av den geometriske rekka $1 + k + k^2 + \\dots$ når $|k| < 1$?", "What is the sum of the geometric series $1 + k + k^2 + \\dots$ when $|k| < 1$?"], DS`$\dfrac{1}{1-k}$`, [DS`$\dfrac{1}{1+k}$`, DS`$\dfrac{k}{1-k}$`, DS`$\infty$`], ["Med første ledd $a$: $\\dfrac{a}{1-k}$. For $k = 1/2$ blir summen 2.", "With first term $a$: $\\dfrac{a}{1-k}$. For $k = 1/2$ the sum is 2."]],
  ["r3", "lim", ["Hva er Taylor-rekka til $e^x$ rundt 0?", "What is the Taylor series of $e^x$ around 0?"], DS`$1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \dots$`, [DS`$1 + x + x^2 + x^3 + \dots$`, DS`$x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dots$`, DS`$1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \dots$`], ["De to andre alternativene er rekkene til $\\sin x$ og $\\cos x$.", "Two of the other options are the series for $\\sin x$ and $\\cos x$."]],
  ["r4", "lim", ["Hva er lineær tilnærming til $f$ nær $a$?", "What is the linear approximation of $f$ near $a$?"], DS`$f(a) + f'(a)(x - a)$`, [DS`$f(a) + f(x)(x - a)$`, DS`$f'(a)\,x$`, DS`$f(a)\,(x - a)$`], ["Tangentlinja: startverdi pluss stigning ganger avstand.", "The tangent line: starting value plus slope times distance."]],
  // ---------- statistikk ----------
  ["s1", "stat", ["Hvor stor andel ligger innenfor $\\pm 1\\sigma$ i en normalfordeling?", "What share lies within $\\pm 1\\sigma$ in a normal distribution?"], ["ca. 68 %", "about 68 %"], [["ca. 50 %", "about 50 %"], ["ca. 95 %", "about 95 %"], ["ca. 99,7 %", "about 99.7 %"]], ["68–95–99,7-regelen: $\\pm1\\sigma$, $\\pm2\\sigma$ og $\\pm3\\sigma$.", "The 68–95–99.7 rule: $\\pm1\\sigma$, $\\pm2\\sigma$ and $\\pm3\\sigma$."]],
  ["s2", "stat", DS`Hva er $P(A \cup B)$?`, DS`$P(A) + P(B) - P(A\cap B)$`, [DS`$P(A) + P(B)$`, DS`$P(A)\,P(B)$`, DS`$P(A) - P(B)$`], DS`Trekk fra snittet, ellers telles det to ganger.`],
  ["s3", "stat", ["Hvis $A$ og $B$ er uavhengige, hva er $P(A\\cap B)$?", "If $A$ and $B$ are independent, what is $P(A\\cap B)$?"], DS`$P(A)\,P(B)$`, [DS`$P(A) + P(B)$`, DS`$0$`, DS`$P(A)/P(B)$`], ["Uavhengig betyr at det ene ikke påvirker det andre, og da ganges sannsynlighetene.", "Independent means one does not affect the other, so the probabilities multiply."]],
  ["s4", "stat", DS`Hva er antall måter å velge $k$ av $n$ uten rekkefølge?`, DS`$\dbinom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$`, [DS`$\dfrac{n!}{(n-k)!}$`, DS`$n^k$`, DS`$n\cdot k$`], DS`$n!/(n-k)!$ teller med rekkefølge. Del på $k!$ når rekkefølgen ikke betyr noe.`],
  ["s5", "stat", ["Hvordan endres standardavviket til gjennomsnittet av $n$ målinger?", "How does the standard deviation of the mean of $n$ measurements change?"], DS`$\sigma/\sqrt{n}$`, [DS`$\sigma/n$`, DS`$\sigma\sqrt n$`, DS`$\sigma$`], ["Fire ganger så mange målinger halverer usikkerheten.", "Four times as many measurements halves the uncertainty."]],
  // ---------- differensialligninger ----------
  ["o1", "ode", DS`Hva er den generelle løsningen av $y' = ky$?`, DS`$y = Ce^{kx}$`, [DS`$y = kx + C$`, DS`$y = Ce^{x/k}$`, DS`$y = C\sin(kx)$`], DS`Vekstfarten er proporsjonal med mengden: eksponentiell vekst ($k > 0$) eller nedbrytning ($k < 0$).`],
  ["o2", "ode", DS`Hva er løsningen av $y'' + \omega^2 y = 0$?`, DS`$y = A\cos\omega t + B\sin\omega t$`, [DS`$y = Ae^{\omega t}$`, DS`$y = At + B$`, DS`$y = Ae^{-\omega t}\cos t$`], DS`Harmonisk svingning med vinkelfrekvens $\omega$, som en fjær uten demping.`],
  ["o3", "ode", ["Hva er den karakteristiske ligningen til $ay'' + by' + cy = 0$?", "What is the characteristic equation of $ay'' + by' + cy = 0$?"], DS`$ar^2 + br + c = 0$`, [DS`$ar + b = c$`, DS`$ar^2 + br = c$`, DS`$a + br + cr^2 = 0$`], ["Prøv $y = e^{rx}$. Røttene $r$ avgjør om løsningen vokser, avtar eller svinger.", "Try $y = e^{rx}$. The roots $r$ decide whether the solution grows, decays or oscillates."]],
  // ---------- bevegelse ----------
  ["k1", "kin", ["Hva er strekningen med konstant akselerasjon fra fart $v_0$?", "What is the distance with constant acceleration from speed $v_0$?"], DS`$s = v_0 t + \tfrac12 a t^2$`, [DS`$s = v_0 t + a t^2$`, DS`$s = \tfrac12 v_0 t^2$`, DS`$s = v_0 + a t$`], ["Arealet under fart–tid-grafen: et rektangel $v_0 t$ pluss en trekant $\\tfrac12 a t^2$.", "The area under the velocity–time graph: a rectangle $v_0 t$ plus a triangle $\\tfrac12 a t^2$."]],
  ["k2", "kin", ["Hvilken formel kobler fart og strekning uten tid?", "Which formula links speed and distance without time?"], DS`$v^2 - v_0^2 = 2as$`, [DS`$v - v_0 = 2as$`, DS`$v^2 = v_0^2 + at$`, DS`$v = v_0 + as$`], ["Tidløs formel, nyttig når $t$ ikke er oppgitt.", "The time-independent formula, useful when $t$ is not given."]],
  ["k3", "kin", ["Hva er akselerasjon?", "What is acceleration?"], ["Endring i fart per tid, $a = dv/dt$", "Change in velocity per time, $a = dv/dt$"], [["Strekning per tid", "Distance per time"], ["Kraft per masse ganget med tid", "Force per mass times time"], ["Fart ganget med tid", "Velocity times time"]], ["Enheten er m/s². Fart er $v = ds/dt$.", "The unit is m/s². Velocity is $v = ds/dt$."]],
  ["k4", "kin", ["Hva er tyngdeakselerasjonen ved jordoverflaten?", "What is the acceleration of gravity at the Earth's surface?"], DS`$9{,}81\ \text{m/s}^2$`, [DS`$9{,}81\ \text{m/s}$`, DS`$6{,}67\ \text{m/s}^2$`, DS`$3{,}0\ \text{m/s}^2$`], ["Alt faller like fort uten luftmotstand.", "Everything falls equally fast without air resistance."]],
  // ---------- krefter ----------
  ["f1", "dyn", ["Hva sier Newtons 2. lov?", "What does Newton's second law say?"], DS`$\sum F = ma$`, [DS`$F = mv$`, DS`$\sum F = 0$`, DS`$F = \tfrac12 mv^2$`], ["Summen av kreftene gir akselerasjonen. $\\sum F = 0$ er 1. lov (likevekt).", "The sum of forces gives the acceleration. $\\sum F = 0$ is the first law (equilibrium)."]],
  ["f2", "dyn", ["Hva sier Newtons 3. lov?", "What does Newton's third law say?"], ["Kraft og motkraft er like store og motsatt rettet, på hvert sitt legeme", "Action and reaction are equal and opposite, acting on different bodies"], [["Et legeme i ro forblir i ro", "A body at rest stays at rest"], ["Kraft er masse ganger akselerasjon", "Force is mass times acceleration"], ["Kraft og motkraft virker på samme legeme og nuller hverandre", "Action and reaction act on the same body and cancel"]], ["De virker på **forskjellige** legemer, så de kan ikke nulle hverandre ut.", "They act on **different** bodies, so they cannot cancel each other."]],
  ["f3", "dyn", ["Hva er friksjonskraften (glidning)?", "What is the (sliding) friction force?"], DS`$R = \mu N$`, [DS`$R = \mu mg\sin\theta$`, DS`$R = \mu/N$`, DS`$R = mg$`], ["Friksjonen er proporsjonal med normalkraften $N$, ikke direkte med tyngden.", "Friction is proportional to the normal force $N$, not directly to the weight."]],
  ["f4", "dyn", ["Hva er kraftmomentet om et punkt?", "What is the moment of a force about a point?"], [DS`$M = F\cdot d$ (arm vinkelrett på kraften)`, DS`$M = F\cdot d$ (arm perpendicular to the force)`], [DS`$M = F/d$`, DS`$M = F + d$`, DS`$M = F\cdot d\cdot\cos 90^\circ$`], ["Armen er den vinkelrette avstanden fra punktet til kraftens virkelinje.", "The arm is the perpendicular distance from the point to the line of action."]],
  ["f5", "dyn", ["Hva er likevektsbetingelsene for et stivt legeme i planet?", "What are the equilibrium conditions for a rigid body in the plane?"], DS`$\sum F_x = 0,\ \sum F_y = 0,\ \sum M = 0$`, [DS`$\sum F = ma$`, DS`$\sum M = I\alpha$`, DS`$\sum F_x = \sum F_y$`], ["Tre ligninger, så du kan finne tre ukjente.", "Three equations, so you can find three unknowns."]],
  ["f6", "dyn", ["Hva er fjærkraften (Hookes lov)?", "What is the spring force (Hooke's law)?"], DS`$F = -kx$`, [DS`$F = kx^2$`, DS`$F = \tfrac12 kx^2$`, DS`$F = k/x$`], ["$\\tfrac12 kx^2$ er energien i fjæra, ikke kraften.", "$\\tfrac12 kx^2$ is the energy in the spring, not the force."]],
  // ---------- energi og bevegelsesmengde ----------
  ["e1", "en", ["Hva er kinetisk energi?", "What is kinetic energy?"], DS`$E_k = \tfrac12 mv^2$`, [DS`$E_k = mv$`, DS`$E_k = mgh$`, DS`$E_k = mv^2$`], ["Dobbel fart gir fire ganger så mye energi.", "Double the speed gives four times the energy."]],
  ["e2", "en", ["Hva er potensiell energi i tyngdefeltet?", "What is gravitational potential energy?"], DS`$E_p = mgh$`, [DS`$E_p = \tfrac12 mgh$`, DS`$E_p = mg/h$`, DS`$E_p = mh$`], ["Høyden $h$ måles fra et valgfritt nullnivå.", "The height $h$ is measured from any chosen zero level."]],
  ["e3", "en", ["Hva er arbeid?", "What is work?"], DS`$W = F s\cos\theta$`, [DS`$W = F/s$`, DS`$W = F s\sin\theta$`, DS`$W = mv$`], ["Bare kraftkomponenten langs bevegelsen gjør arbeid.", "Only the force component along the motion does work."]],
  ["e4", "en", ["Hva er effekt?", "What is power?"], DS`$P = W/t = Fv$`, [DS`$P = Wt$`, DS`$P = F/v$`, DS`$P = mv^2$`], ["Enheten er watt = joule per sekund.", "The unit is the watt = joule per second."]],
  ["e5", "en", ["Hva er bevegelsesmengde (impuls)?", "What is momentum?"], DS`$p = mv$`, [DS`$p = \tfrac12 mv^2$`, DS`$p = ma$`, DS`$p = F/t$`], ["Bevaret i alle støt uten ytre krefter, også uelastiske.", "Conserved in every collision without external forces, inelastic ones too."]],
  ["e6", "en", ["Hva sier impulsloven?", "What does the impulse–momentum theorem say?"], DS`$F\,\Delta t = \Delta p$`, [DS`$F\,\Delta t = \Delta E$`, DS`$F = p\,\Delta t$`, DS`$F\,s = \Delta p$`], ["Lang bremsetid gir liten kraft. Det er derfor airbager virker.", "A long stopping time gives a small force. That is why airbags work."]],
  ["e7", "en", ["Hva er bevart i et fullstendig uelastisk støt?", "What is conserved in a perfectly inelastic collision?"], ["Bare bevegelsesmengden", "Only momentum"], [["Bare kinetisk energi", "Only kinetic energy"], ["Både bevegelsesmengde og kinetisk energi", "Both momentum and kinetic energy"], ["Ingenting", "Nothing"]], ["Noe kinetisk energi går over til varme og deformasjon.", "Some kinetic energy turns into heat and deformation."]],
  ["e8", "en", ["Hvilken fart får et legeme som faller fritt fra høyden $h$?", "What speed does a body reach after falling freely from height $h$?"], DS`$v = \sqrt{2gh}$`, [DS`$v = 2gh$`, DS`$v = \sqrt{gh}$`, DS`$v = gh^2$`], ["$mgh = \\tfrac12 mv^2$ gir $v = \\sqrt{2gh}$, uavhengig av massen.", "$mgh = \\tfrac12 mv^2$ gives $v = \\sqrt{2gh}$, independent of mass."]],
  // ---------- sirkelbevegelse og gravitasjon ----------
  ["g1", "rot", ["Hva er sentripetalakselerasjonen?", "What is the centripetal acceleration?"], DS`$a = \dfrac{v^2}{r}$`, [DS`$a = \dfrac{v}{r}$`, DS`$a = vr$`, DS`$a = \dfrac{r}{v^2}$`], ["Rettet inn mot sentrum. Også $a = \\omega^2 r$.", "Directed towards the centre. Also $a = \\omega^2 r$."]],
  ["g2", "rot", ["Hva er Newtons gravitasjonslov?", "What is Newton's law of gravitation?"], DS`$F = G\dfrac{m_1 m_2}{r^2}$`, [DS`$F = G\dfrac{m_1 m_2}{r}$`, DS`$F = G\,m_1 m_2\,r^2$`, DS`$F = \dfrac{m_1 m_2}{G r^2}$`], ["Dobbel avstand gir en firedel av kraften.", "Double the distance gives a quarter of the force."]],
  ["g3", "rot", ["Hva er sammenhengen mellom fart og vinkelfart?", "What links speed and angular velocity?"], DS`$v = \omega r$`, [DS`$v = \omega/r$`, DS`$v = \omega^2 r$`, DS`$v = 2\pi\omega$`], ["$\\omega$ i rad/s. Én runde er $2\\pi$ rad.", "$\\omega$ in rad/s. One turn is $2\\pi$ rad."]],
  ["g4", "rot", ["Hva er rotasjonsenergien?", "What is rotational kinetic energy?"], DS`$E = \tfrac12 I\omega^2$`, [DS`$E = I\omega$`, DS`$E = \tfrac12 m\omega^2$`, DS`$E = I\omega^2 r$`], ["Samme form som $\\tfrac12 mv^2$, med treghetsmoment $I$ og vinkelfart $\\omega$.", "Same form as $\\tfrac12 mv^2$, with moment of inertia $I$ and angular velocity $\\omega$."]],
  // ---------- svingninger og bølger ----------
  ["w1", "wav", ["Hva er bølgeligningen (sammenheng mellom fart, frekvens og bølgelengde)?", "What links wave speed, frequency and wavelength?"], DS`$v = f\lambda$`, [DS`$v = f/\lambda$`, DS`$v = \lambda/f^2$`, DS`$f = v\lambda$`], ["Én bølgelengde passerer per periode.", "One wavelength passes per period."]],
  ["w2", "wav", ["Hva er perioden til en masse–fjær-svingning?", "What is the period of a mass–spring oscillator?"], DS`$T = 2\pi\sqrt{m/k}$`, [DS`$T = 2\pi\sqrt{k/m}$`, DS`$T = \sqrt{m/k}$`, DS`$T = 2\pi mk$`], ["Tyngre masse gir tregere svingning; stivere fjær gir raskere.", "A heavier mass oscillates more slowly; a stiffer spring faster."]],
  ["w3", "wav", ["Hva er perioden til en matematisk pendel?", "What is the period of a simple pendulum?"], DS`$T = 2\pi\sqrt{L/g}$`, [DS`$T = 2\pi\sqrt{g/L}$`, DS`$T = 2\pi\sqrt{m/g}$`, DS`$T = 2\pi L/g$`], ["Uavhengig av massen (for små utslag).", "Independent of the mass (for small swings)."]],
  ["w4", "wav", ["Hva er sammenhengen mellom periode og frekvens?", "What links period and frequency?"], DS`$f = 1/T$`, [DS`$f = T$`, DS`$f = 2\pi T$`, DS`$f = T^2$`], ["Vinkelfrekvensen er $\\omega = 2\\pi f$.", "The angular frequency is $\\omega = 2\\pi f$."]],
  ["w5", "wav", ["Hva er lysfarten i vakuum?", "What is the speed of light in vacuum?"], DS`$3{,}00\cdot 10^8\ \text{m/s}$`, [DS`$3{,}00\cdot 10^6\ \text{m/s}$`, DS`$343\ \text{m/s}$`, DS`$3{,}00\cdot 10^{10}\ \text{m/s}$`], ["343 m/s er lydfarten i luft.", "343 m/s is the speed of sound in air."]],
  // ---------- elektrisitet ----------
  ["x1", "el", ["Hva er Ohms lov?", "What is Ohm's law?"], DS`$U = RI$`, [DS`$U = R/I$`, DS`$U = I/R$`, DS`$U = RI^2$`], ["Spenning = motstand ganger strøm.", "Voltage = resistance times current."]],
  ["x2", "el", ["Hva er elektrisk effekt?", "What is electric power?"], DS`$P = UI$`, [DS`$P = U/I$`, DS`$P = RI$`, DS`$P = U^2 R$`], ["Også $P = RI^2 = U^2/R$.", "Also $P = RI^2 = U^2/R$."]],
  ["x3", "el", ["Hva er total motstand for to motstander i parallell?", "What is the total resistance of two resistors in parallel?"], DS`$\dfrac{R_1 R_2}{R_1 + R_2}$`, [DS`$R_1 + R_2$`, DS`$\dfrac{R_1 + R_2}{R_1 R_2}$`, DS`$\sqrt{R_1 R_2}$`], ["Alltid mindre enn den minste. I serie legges de sammen.", "Always less than the smallest. In series they add."]],
  ["x4", "el", ["Hva er Coulombs lov?", "What is Coulomb's law?"], DS`$F = k\dfrac{q_1 q_2}{r^2}$`, [DS`$F = k\dfrac{q_1 q_2}{r}$`, DS`$F = k\,q_1 q_2 r^2$`, DS`$F = \dfrac{q_1 + q_2}{r^2}$`], ["Samme form som gravitasjonsloven, men kan både tiltrekke og frastøte.", "Same form as the law of gravitation, but it can both attract and repel."]],
  ["x5", "el", ["Hva er tidskonstanten i en RC-krets?", "What is the time constant of an RC circuit?"], DS`$\tau = RC$`, [DS`$\tau = R/C$`, DS`$\tau = 1/(RC)$`, DS`$\tau = 2\pi RC$`], ["Etter $\\tau$ er kondensatoren 63 % ladet; etter $5\\tau$ nesten helt.", "After $\\tau$ the capacitor is 63 % charged; after $5\\tau$ almost fully."]],
  ["x6", "el", ["Hva sier Kirchhoffs strømlov?", "What does Kirchhoff's current law say?"], ["Strøm inn i et knutepunkt = strøm ut", "Current into a node = current out"], [["Summen av spenninger rundt en sløyfe er null", "The sum of voltages around a loop is zero"], ["Strømmen er lik i alle grener", "The current is equal in all branches"], ["Spenningen er lik over alle motstander", "The voltage is equal across all resistors"]], ["Ladning hoper seg ikke opp. Den andre påstanden er spenningsloven.", "Charge does not pile up. The second statement is the voltage law."]],
  ["x7", "el", ["Hva er effektivverdien til en sinusspenning med toppverdi $\\hat U$?", "What is the RMS value of a sine voltage with peak $\\hat U$?"], DS`$\hat U/\sqrt2$`, [DS`$\hat U/2$`, DS`$\hat U\sqrt2$`, DS`$\hat U$`], ["230 V i stikkontakten er effektivverdien; toppen er ca. 325 V.", "The 230 V at the socket is the RMS value; the peak is about 325 V."]],
  // ---------- termodynamikk ----------
  ["h1", "th", ["Hva er idealgassloven?", "What is the ideal gas law?"], DS`$pV = nRT$`, [DS`$pV = nR/T$`, DS`$p = nRTV$`, DS`$pT = nRV$`], ["Temperaturen må være i kelvin.", "The temperature must be in kelvin."]],
  ["h2", "th", ["Hvor mye varme trengs for å varme opp masse $m$ med $\\Delta T$?", "How much heat is needed to warm a mass $m$ by $\\Delta T$?"], DS`$Q = mc\Delta T$`, [DS`$Q = m\Delta T/c$`, DS`$Q = c\Delta T$`, DS`$Q = mcT^2$`], ["$c$ er spesifikk varmekapasitet; for vann ca. 4,18 kJ/(kg·K).", "$c$ is the specific heat capacity; for water about 4.18 kJ/(kg·K)."]],
  ["h3", "th", ["Hva sier termodynamikkens 1. lov?", "What does the first law of thermodynamics say?"], DS`$\Delta U = Q - W$`, [DS`$\Delta U = Q + W^2$`, DS`$Q = W$`, DS`$\Delta S \ge 0$`], ["Energi er bevart: tilført varme minus arbeid gjort av systemet. $\\Delta S \\ge 0$ er 2. lov.", "Energy is conserved: heat added minus work done by the system. $\\Delta S \\ge 0$ is the second law."]],
  ["h4", "th", ["Hva er Carnot-virkningsgraden?", "What is the Carnot efficiency?"], DS`$\eta = 1 - \dfrac{T_C}{T_H}$`, [DS`$\eta = \dfrac{T_C}{T_H}$`, DS`$\eta = 1 - \dfrac{T_H}{T_C}$`, DS`$\eta = T_H - T_C$`], ["Den høyeste mulige virkningsgraden mellom to temperaturer (i kelvin).", "The highest possible efficiency between two temperatures (in kelvin)."]],
  ["h5", "th", ["Hvor mange kelvin er 0 °C?", "How many kelvin is 0 °C?"], DS`$273{,}15\ \text{K}$`, [DS`$0\ \text{K}$`, DS`$100\ \text{K}$`, DS`$-273{,}15\ \text{K}$`], ["Et temperatursprang på 1 °C er like stort som 1 K.", "A temperature step of 1 °C is the same size as 1 K."]],
  ["h6", "th", ["Hva er varmeledning gjennom en vegg (Fouriers lov)?", "What is heat conduction through a wall (Fourier's law)?"], DS`$\dot Q = \dfrac{\lambda A\,\Delta T}{d}$`, [DS`$\dot Q = \lambda A\,\Delta T\,d$`, DS`$\dot Q = \dfrac{A\,\Delta T}{\lambda d}$`, DS`$\dot Q = \lambda\,\Delta T$`], ["Dobbel tykkelse halverer varmetapet.", "Double the thickness halves the heat loss."]],
  // ---------- fluider ----------
  ["p1", "fl", ["Hva er trykket i dybden $h$ i en væske (overtrykk)?", "What is the (gauge) pressure at depth $h$ in a liquid?"], DS`$p = \rho g h$`, [DS`$p = \rho g/h$`, DS`$p = \tfrac12\rho h^2$`, DS`$p = \rho h$`], ["Hver 10. meter i vann gir ca. 1 bar ekstra.", "Every 10 metres of water adds about 1 bar."]],
  ["p2", "fl", ["Hva sier Bernoullis ligning langs en strømlinje?", "What does Bernoulli's equation say along a streamline?"], DS`$p + \tfrac12\rho v^2 + \rho g z = C$`, [DS`$p + \rho v + \rho g z = C$`, DS`$p\,v = C$`, DS`$p + \tfrac12\rho v^2 = \rho g z$`], ["Høyere fart gir lavere trykk.", "Higher speed gives lower pressure."]],
  ["p3", "fl", ["Hva sier kontinuitetsligningen for et rør?", "What does the continuity equation for a pipe say?"], DS`$A_1 v_1 = A_2 v_2$`, [DS`$A_1 v_2 = A_2 v_1$`, DS`$A_1 + v_1 = A_2 + v_2$`, DS`$v_1 = v_2$`], ["Smalere rør gir høyere fart, fordi like mye vann må komme gjennom.", "A narrower pipe gives higher speed, because the same amount of water must get through."]],
  ["p4", "fl", ["Hva er oppdriften på et nedsenket legeme (Arkimedes)?", "What is the buoyancy on a submerged body (Archimedes)?"], DS`$F_B = \rho_{f}\,g\,V$ ($\rho_f$ = fluid)`, [DS`$F_B = \rho_{b}\,g\,V$ ($\rho_b$ = body)`, DS`$F_B = mg$`, DS`$F_B = \rho g h$`], ["Lik tyngden av den fortrengte væsken ($\\rho_f$ er væskens tetthet, $\\rho_b$ legemets).", "Equal to the weight of the displaced fluid ($\\rho_f$ is the fluid density, $\\rho_b$ the body density)."]],
  // ---------- enheter og konstanter ----------
  ["u1", "unit", ["Hva betyr prefikset «mega» (M)?", "What does the prefix \"mega\" (M) mean?"], DS`$10^6$`, [DS`$10^3$`, DS`$10^9$`, DS`$10^{-6}$`], ["k = $10^3$, M = $10^6$, G = $10^9$.", "k = $10^3$, M = $10^6$, G = $10^9$."]],
  ["u2", "unit", ["Hva betyr prefikset «mikro» (µ)?", "What does the prefix \"micro\" (µ) mean?"], DS`$10^{-6}$`, [DS`$10^{-3}$`, DS`$10^{-9}$`, DS`$10^{6}$`], ["m = $10^{-3}$, µ = $10^{-6}$, n = $10^{-9}$.", "m = $10^{-3}$, µ = $10^{-6}$, n = $10^{-9}$."]],
  ["u3", "unit", ["Hva er 1 newton i grunnenheter?", "What is 1 newton in base units?"], DS`$1\ \text{kg}\cdot\text{m/s}^2$`, [DS`$1\ \text{kg}\cdot\text{m/s}$`, DS`$1\ \text{kg}\cdot\text{m}^2/\text{s}^2$`, DS`$1\ \text{J/s}$`], ["Fra $F = ma$. Kg·m²/s² er joule.", "From $F = ma$. Kg·m²/s² is the joule."]],
  ["u4", "unit", ["Hvor mange joule er 1 kWh?", "How many joules is 1 kWh?"], DS`$3{,}6\cdot 10^6\ \text{J}$`, [DS`$1000\ \text{J}$`, DS`$3600\ \text{J}$`, DS`$3{,}6\cdot 10^3\ \text{J}$`], DS`$1000\ \text{W}\cdot 3600\ \text{s} = 3{,}6\cdot 10^6$ J.`],
  ["u5", "unit", ["Hva er 1 pascal?", "What is 1 pascal?"], DS`$1\ \text{N/m}^2$`, [DS`$1\ \text{N}\cdot\text{m}$`, DS`$1\ \text{kg/m}^3$`, DS`$1\ \text{J/s}$`], ["1 bar = $10^5$ Pa, 1 MPa = 1 N/mm².", "1 bar = $10^5$ Pa, 1 MPa = 1 N/mm²."]],
  ["u6", "unit", ["Hvor mange m/s er 36 km/t?", "How many m/s is 36 km/h?"], DS`$10\ \text{m/s}$`, [DS`$36\ \text{m/s}$`, DS`$3{,}6\ \text{m/s}$`, DS`$130\ \text{m/s}$`], ["Del på 3,6 for å gå fra km/t til m/s.", "Divide by 3.6 to go from km/h to m/s."]],
  ["u7", "unit", ["Hva er 1 watt?", "What is 1 watt?"], DS`$1\ \text{J/s}$`, [DS`$1\ \text{J}\cdot\text{s}$`, DS`$1\ \text{N/s}$`, DS`$1\ \text{V/A}$`], ["V/A er ohm. V·A er watt.", "V/A is the ohm. V·A is the watt."]]
];
// Engelske versjoner av forklaringer (og spørsmål) som over bare står på norsk.
const DR_EN = {
  d1: "Sine differentiates to cosine. Think of the graph: the slope of $\\sin x$ is largest at $x = 0$, where $\\cos 0 = 1$.",
  d2: "Cosine differentiates to minus sine. Just after $x = 0$, $\\cos x$ is falling, and $-\\sin x$ is negative there.",
  d3: "The chain rule: the derivative of $e^u$ is $e^u\\cdot u'$, and $u' = k$.",
  d4: "$\\ln x$ differentiates to $1/x$ (for $x > 0$).",
  d5: "The power rule: bring the exponent down in front and subtract 1 from the exponent.",
  d9: "$\\tan x = \\sin x/\\cos x$. The quotient rule gives $(\\cos^2 x + \\sin^2 x)/\\cos^2 x = 1/\\cos^2 x = 1 + \\tan^2 x$.",
  d10: "The chain rule: outer $\\cos(3x)$ times inner $(3x)' = 3$.",
  d11: "The product rule: $1\\cdot e^x + x\\cdot e^x = (x+1)e^x$.",
  d12: "$\\sqrt{x} = x^{1/2}$, so the derivative is $\\tfrac12 x^{-1/2} = \\dfrac{1}{2\\sqrt x}$.",
  i1: "Integration is the reverse of differentiation, and $(\\sin x)' = \\cos x$.",
  i2: "$(-\\cos x)' = \\sin x$. The minus sign is easy to forget!",
  i3: "Add 1 to the exponent and divide by the new exponent. Check: differentiating the answer gives $x^n$ back.",
  i4: "The power rule fails for $n = -1$. Here the answer is $\\ln|x|$, since $(\\ln x)' = 1/x$.",
  i5: "Differentiating $\\tfrac1k e^{kx}$ gives $e^{kx}$. Divide by the inner derivative.",
  i10: "Divide by the inner derivative 2: $(\\tfrac12\\sin 2x)' = \\cos 2x$.",
  t2: "In an equilateral triangle cut in half, the opposite side is half the hypotenuse: $\\sin 30^\\circ = 1/2$.",
  t4: "In an isosceles right triangle with legs 1 the hypotenuse is $\\sqrt2$, so $\\sin 45^\\circ = 1/\\sqrt2 = \\sqrt2/2$.",
  t6: "Double angle: $\\sin 2x = 2\\sin x\\cos x$.",
  l1: "The logarithm turns a product into a sum.",
  l2: "The exponent can be moved down in front: $\\ln a^k = k\\ln a$.",
  l3: "Same base: add the exponents.",
  l4: "Power of a power: multiply the exponents.",
  l5: "A negative exponent means the reciprocal: $a^{-n} = 1/a^n$.",
  l6: "$\\ln$ is the logarithm with base $e$, and $e^1 = e$.",
  l7: "$10^3 = 1000$, so $\\lg 1000 = 3$.",
  l8: "A fractional exponent is a root: $a^{1/2} = \\sqrt a$, $a^{1/3} = \\sqrt[3]{a}$.",
  l9: "Take $\\ln$ of both sides: $x = \\ln 5 \\approx 1{,}61$.",
  a2: "The square of a sum. The most common mistake is forgetting $2ab$.",
  a3: "The difference of squares: the middle terms $-ab$ and $+ab$ cancel.",
  v1: "Also $a_x b_x + a_y b_y + a_z b_z$. If it is zero, the vectors are perpendicular.",
  v4: "Main diagonal minus the other diagonal. If the determinant is zero, the matrix has no inverse.",
  c1: "The definition of the imaginary unit.",
  c4: "Change the sign of the imaginary part. $z\\bar z = a^2 + b^2$.",
  r1: "For small angles (in radians), $\\sin x \\approx x$.",
  s2: "Subtract the intersection, otherwise it is counted twice.",
  s4: "$n!/(n-k)!$ counts with order. Divide by $k!$ when order does not matter.",
  o1: "The growth rate is proportional to the amount: exponential growth ($k > 0$) or decay ($k < 0$).",
  o2: "A harmonic oscillation with angular frequency $\\omega$, like an undamped spring.",
  u4: "$1000\\ \\text{W}\\cdot 3600\\ \\text{s} = 3{,}6\\cdot 10^6$ J."
};
const DR_ENQ = { l9: "Solve $e^{x} = 5$.", s4: "How many ways are there to choose $k$ of $n$ without order?", o1: "What is the general solution of $y' = ky$?", o2: "What is the solution of $y'' + \\omega^2 y = 0$?",
  i3: "What is $\\displaystyle\\int x^n\\,dx$ (for $n \\ne -1$)?", l7: "What is $\\lg 1000$ (base-10 logarithm)?", v1: "What is the dot product $\\vec a\\cdot\\vec b$?", v3: "What is the length of $\\vec a = (3, 4)$?",
  v4: "What is the determinant of $\\begin{pmatrix} a & b\\\\ c & d\\end{pmatrix}$?", c4: "What is the conjugate of $a + bi$?" };
for(const c of DRILL){
  if(!Array.isArray(c[2])) c[2] = [c[2], DR_ENQ[c[0]] || c[2].replace(/^Hva er /, "What is ")];
  if(!Array.isArray(c[5]) && DR_EN[c[0]]) c[5] = [c[5], DR_EN[c[0]]];
}
const drText = x => Array.isArray(x) ? T(x[0], x[1]) : x;
const DR_INT = [0, 1, 3, 7, 16, 35, 70]; // dager til neste gang for boks 1–6
const drState = () => (S.drill ||= {});
const drCard = id => DRILL.find(c => c[0] === id);
function drPool(topic){ return DRILL.filter(c => topic === "all" || (topic === "m") === DR_MATH.has(c[1])); }
function drCounts(topic = "all"){
  const st = drState(), td = dayKey(), pool = drPool(topic);
  let due = 0, fresh = 0, known = 0;
  for(const c of pool){ const s = st[c[0]]; if(!s) fresh++; else { if(s.due <= td) due++; if(s.b >= 4) known++; } }
  return { due, fresh, known, total: pool.length };
}
// Runde på 10 kort: først de som er forfalt (lavest boks og flest feil først), så nye kort, så de som snart forfaller.
function drPick(topic, n = 10){
  const st = drState(), td = dayKey(), pool = drPool(topic);
  const due = shuffle(pool.filter(c => st[c[0]] && st[c[0]].due <= td)).sort((a, b) => (st[a[0]].b - st[b[0]].b) || ((st[b[0]].w || 0) - (st[a[0]].w || 0)));
  const fresh = shuffle(pool.filter(c => !st[c[0]]));
  const later = pool.filter(c => st[c[0]] && st[c[0]].due > td).sort((a, b) => st[a[0]].due < st[b[0]].due ? -1 : 1);
  const pick = due.slice(0, 7); for(const c of fresh){ if(pick.length >= n) break; pick.push(c); }
  for(const c of due.slice(7).concat(later)){ if(pick.length >= n) break; if(!pick.includes(c)) pick.push(c); }
  return shuffle(pick);
}
function drItem(c){
  const opts = shuffle([{ t: drText(c[3]), ok: true }].concat(c[4].map(x => ({ t: drText(x), ok: false }))));
  return { id: "dr:" + c[0], type: "mc", prompt: drText(c[2]), opts, expl: drText(c[5]), drTag: c[1] };
}
function startDrill(topic){
  const cards = drPick(topic); if(!cards.length) return;
  S.drillTopic = topic;
  startLesson("drill", S.current, cards.map(drItem), { topic });
}
// Oppdaterer boksene etter en runde.
function drRecord(){
  const st = drState(), now = Date.now(), td = new Date();
  const ids = new Set([...L.solved, ...L.firstWrong].filter(id => String(id).startsWith("dr:")));
  let up = 0;
  for(const id of ids){
    const key = id.slice(3), s = st[key] || { b: 0, w: 0 }, wrong = L.firstWrong.has(id);
    s.b = wrong ? 1 : (s.b ? Math.min(6, s.b + 1) : 2); if(wrong) s.w = (s.w || 0) + 1; else up++;
    s.due = dayKey(addDays(td, DR_INT[s.b])); s.at = now; st[key] = s;
  }
  bdgStat("drills", ids.size);
  return up;
}
function drCardHTML(){
  const c = drCounts(), m = drCounts("m"), f = drCounts("f"), started = c.total - c.fresh;
  const sub = c.due ? t("drDue", c.due) : started ? t("drAllDone") : t("drIntro");
  return `<div class="dr-card"><div class="dr-h"><span class="dr-ic">${I.redo}</span><div><b>${esc(t("drTitle"))}</b><span>${esc(sub)}</span></div></div>
    <div class="dr-meter"><i style="width:${c.known / c.total * 100}%"></i></div><small class="dr-known">${esc(t("drKnown", c.known, c.total))}</small>
    <div class="dr-btns"><button class="dr-b" data-a="drstart" data-t="all"><b>${esc(t("drMix"))}</b>${c.due ? `<em>${c.due}</em>` : ""}</button>
      <button class="dr-b" data-a="drstart" data-t="m"><b>${esc(t("drMath"))}</b>${m.due ? `<em>${m.due}</em>` : ""}</button>
      <button class="dr-b" data-a="drstart" data-t="f"><b>${esc(t("drPhys"))}</b>${f.due ? `<em>${f.due}</em>` : ""}</button></div></div>`;
}
