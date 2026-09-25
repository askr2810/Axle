// ============================================================
//  add_mat.js – teori, faste oppgaver og generatorer for
//  ELVE3610 (Robotikk), MATS1500 (Materialteknologi),
//  KJEMI (Generell kjemi) og FEM (Elementmetoden)
// ============================================================
(() => {

// ================= ELVE3610 – enhet 0: Rotasjoner og transformasjoner =================
THEORY("ELVE3610", 0, {
nb: `## Hva handler det om?
En robotarm må hele tiden vite hvor verktøyet er og hvordan det peker, både i sin egen ramme og i verdens (basis-) ramme. Til det trengs et presist matematisk språk for rotasjoner og forflytninger. Rotasjonsmatriser og homogene transformasjonsmatriser lar oss beskrive og kjede sammen slike bevegelser på en systematisk måte, ledd for ledd langs armen – nøyaktig det Denavit–Hartenberg-parametrene (DH-parametrene) bygger på.

## Begreper og formler
- En rotasjonsmatrise $R$ er ortogonal: $R^T = R^{-1}$ og $\\det R = 1$. Den bevarer lengder og vinkler.
- To rotasjoner kan settes sammen ved matrisemultiplikasjon: $R = R_1R_2$. I 3D er rekkefølgen viktig ($R_1R_2 \\ne R_2R_1$ generelt); i 2D om samme akse spiller rekkefølgen ingen rolle, og vinklene bare adderes.
- Homogen transformasjonsmatrise (4×4, eller 3×3 i planet) kombinerer rotasjon og translasjon i én operasjon: $$T = \\begin{pmatrix}R & \\vec p\\\\ 0 & 1\\end{pmatrix}$$ der $\\vec p$ er origo til den nye rammen, uttrykt i den gamle.
- Et punkt i lokale koordinater $\\vec x_L$ får globale koordinater $\\vec x_G = R\\vec x_L + \\vec p$.
- Inversen av en homogen transformasjon er $T^{-1} = \\begin{pmatrix}R^T & -R^T\\vec p\\\\ 0 & 1\\end{pmatrix}$ – transponering er billig, det er derfor $R^T=R^{-1}$ er så nyttig.
- Euler-vinkler beskriver en orientering med tre påfølgende rotasjoner, men kan gi **gimbal lock**: to akser faller sammen og én frihetsgrad går tapt. Kvaternioner unngår dette og interpolerer jevnere, men bruker fire tall i stedet for tre.
- DH-parametrene ($\\theta$, $d$, $a$, $\\alpha$) beskriver hvordan rammen til hvert ledd henger sammen med det forrige, med fire tall per ledd.

## Slik løser du oppgavene
1. Tegn (eller se for deg) hvilke rammer som er involvert, og hvordan de henger sammen.
2. Skriv opp rotasjonsmatrisen(e) og eventuell translasjon for hvert steg.
3. Multipliser/adder i riktig rekkefølge: fra det kjente punktet og utover mot den rammen du vil finne koordinatene i.
4. Skal du gå motsatt vei (finne lokale koordinater fra globale), bruk den inverse transformasjonen.
5. Sjekk svaret: en ren rotasjon endrer aldri lengden til en vektor.

### Eksempel
En ramme B er rotert 90° mot klokka og forskjøvet $(5, 0)$ i forhold til basisrammen A. Et punkt har koordinatene $(3, 4)$ i basisrammen. Hva er koordinatene i ramme B?
1. Dette er det motsatte av å transformere fra lokalt til globalt, så vi bruker inversen: $\\vec x_B = R^T(\\vec x_A - \\vec p)$.
2. Trekk fra translasjonen: $\\vec x_A - \\vec p = (3-5,\\ 4-0) = (-2, 4)$.
3. Roter med $-90°$ (motsatt av $R$): $R^T = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$, som gir $(0\\cdot(-2)+1\\cdot4,\\ -1\\cdot(-2)+0\\cdot4) = (4, 2)$.

Svar: punktet har koordinatene $(4, 2)$ i ramme B.

## Vanlige feil
- Å bytte om rekkefølgen på rotasjon og translasjon, eller på flere rotasjoner, i 3D.
- Å tro at $R^{-1} = -R$. Riktig er $R^{-1} = R^T$.
- Å glemme at inversen krever at du roterer MED $-\\theta$ (eller $R^T$) etter at translasjonen er trukket fra, ikke før.
- Å blande grader og radianer i samme utregning.
- Å tro at Euler-vinkler alltid er entydige og problemfrie – gimbal lock er en reell singularitet.

> Rotasjonsmatriser er ortogonale ($R^{-1}=R^T$) og bevarer lengder. Kjeder du sammen flere rammer, multipliserer du rotasjonene og adderer translasjonene i riktig rekkefølge – og for å gå baklengs bruker du inversen.`,
en: `## What is it about?
A robot arm must always know where its tool is and which way it points, both in its own frame and in the world (base) frame. This calls for a precise mathematical language for rotations and displacements. Rotation matrices and homogeneous transformation matrices let us describe and chain such motions systematically, link by link along the arm – exactly what the Denavit–Hartenberg (DH) parameters are built on.

## Concepts and formulas
- A rotation matrix $R$ is orthogonal: $R^T = R^{-1}$ and $\\det R = 1$. It preserves lengths and angles.
- Two rotations can be combined by matrix multiplication: $R = R_1R_2$. In 3D the order matters ($R_1R_2 \\ne R_2R_1$ in general); in 2D about the same axis the order does not matter, and the angles simply add.
- A homogeneous transformation matrix (4×4, or 3×3 in the plane) combines rotation and translation in one operation: $$T = \\begin{pmatrix}R & \\vec p\\\\ 0 & 1\\end{pmatrix}$$ where $\\vec p$ is the origin of the new frame, expressed in the old one.
- A point in local coordinates $\\vec x_L$ has global coordinates $\\vec x_G = R\\vec x_L + \\vec p$.
- The inverse of a homogeneous transform is $T^{-1} = \\begin{pmatrix}R^T & -R^T\\vec p\\\\ 0 & 1\\end{pmatrix}$ – transposing is cheap, which is why $R^T=R^{-1}$ is so useful.
- Euler angles describe an orientation with three successive rotations, but can suffer from **gimbal lock**: two axes line up and one degree of freedom is lost. Quaternions avoid this and interpolate more smoothly, but use four numbers instead of three.
- The DH parameters ($\\theta$, $d$, $a$, $\\alpha$) describe how each link's frame relates to the previous one, with four numbers per link.

## How to solve the problems
1. Sketch (or picture) which frames are involved and how they are linked.
2. Write down the rotation matrix/matrices and any translation for each step.
3. Multiply/add in the right order: from the known point outward toward the frame you want coordinates in.
4. To go the other way (find local coordinates from global ones), use the inverse transformation.
5. Check your answer: a pure rotation never changes the length of a vector.

### Example
A frame B is rotated 90° counterclockwise and shifted by $(5, 0)$ relative to the base frame A. A point has coordinates $(3, 4)$ in the base frame. What are its coordinates in frame B?
1. This is the reverse of transforming from local to global, so we use the inverse: $\\vec x_B = R^T(\\vec x_A - \\vec p)$.
2. Subtract the translation: $\\vec x_A - \\vec p = (3-5,\\ 4-0) = (-2, 4)$.
3. Rotate by $-90°$ (the opposite of $R$): $R^T = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$, which gives $(0\\cdot(-2)+1\\cdot4,\\ -1\\cdot(-2)+0\\cdot4) = (4, 2)$.

Answer: the point has coordinates $(4, 2)$ in frame B.

## Common mistakes
- Swapping the order of rotation and translation, or of several rotations, in 3D.
- Believing $R^{-1} = -R$. The correct relation is $R^{-1} = R^T$.
- Forgetting that the inverse requires rotating by $-\\theta$ (or $R^T$) after the translation has been subtracted, not before.
- Mixing degrees and radians in the same calculation.
- Assuming Euler angles are always unique and problem-free – gimbal lock is a real singularity.

> Rotation matrices are orthogonal ($R^{-1}=R^T$) and preserve lengths. When you chain several frames, multiply the rotations and add the translations in the right order – and to go backward, use the inverse.`
});

BIQ("ELVE3610", 0, [
 ["Er rotasjon i 3D kommutativ, altså er $R_1R_2 = R_2R_1$ generelt?",
  ["Nei, rekkefølgen på rotasjonene har som regel betydning", "Ja, alltid, akkurat som i 2D", "Bare hvis $R_1$ er identitetsmatrisen", "Bare hvis begge rotasjonene er om samme akse"],
  "I 3D roterer forskjellige akser rommet forskjellig, så $R_1R_2 \\ne R_2R_1$ generelt. Unntaket er nettopp rotasjon om samme akse, der vinklene bare adderes.",
  "Is rotation in 3D commutative, that is, is $R_1R_2 = R_2R_1$ in general?",
  ["No, the order of the rotations usually matters", "Yes, always, just like in 2D", "Only if $R_1$ is the identity matrix", "Only if both rotations are about the same axis"],
  "In 3D, rotations about different axes affect space differently, so $R_1R_2 \\ne R_2R_1$ in general. The exception is exactly rotation about the same axis, where the angles simply add."],
 ["Hva er en fordel med kvaternioner sammenlignet med Euler-vinkler for å representere en robotarms orientering?",
  ["De har ingen gimbal lock og interpolerer jevnt mellom orienteringer", "De bruker færre tall enn Euler-vinkler", "De er lineære funksjoner av leddvinklene", "De trenger aldri normaliseres"],
  "Kvaternioner bruker fire tall (mot tre for Euler-vinkler), men unngår singulariteten gimbal lock og gir jevn interpolasjon. De må normaliseres for å representere en gyldig rotasjon.",
  "What is an advantage of quaternions compared with Euler angles for representing a robot arm's orientation?",
  ["They have no gimbal lock and interpolate smoothly between orientations", "They use fewer numbers than Euler angles", "They are linear functions of the joint angles", "They never need to be normalized"],
  "Quaternions use four numbers (versus three for Euler angles), but avoid the gimbal-lock singularity and interpolate smoothly. They must be normalized to represent a valid rotation."],
 ["Punktet $(7, -2)$ roteres 180° om origo. Hva blir x-koordinaten?",
  { n: -7, tol: 0.01, u: "" },
  "En rotasjon på 180° snur fortegnet på begge koordinatene: $(x, y) \\to (-x, -y)$, så x-koordinaten blir $-7$.",
  "The point $(7, -2)$ is rotated 180° about the origin. What is the x-coordinate?",
  null,
  "A 180° rotation flips the sign of both coordinates: $(x, y) \\to (-x, -y)$, so the x-coordinate becomes $-7$."],
 ["En ramme B er rotert 90° mot klokka og forskjøvet $(5, 0)$ i forhold til basisrammen. Et punkt har koordinatene $(3, 4)$ i basisrammen. Hva er x-koordinaten til punktet i ramme B?",
  { n: 4, tol: 0.05, u: "" },
  "Bruk inversen: trekk fra translasjonen, $(3-5, 4-0) = (-2, 4)$, roter så med $-90°$: $R^T = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$ gir $(0\\cdot(-2)+1\\cdot4,\\ -1\\cdot(-2)+0\\cdot4) = (4, 2)$. x-koordinaten er 4.",
  "A frame B is rotated 90° counterclockwise and shifted by $(5, 0)$ relative to the base frame. A point has coordinates $(3, 4)$ in the base frame. What is the x-coordinate of the point in frame B?",
  null,
  "Use the inverse: subtract the translation, $(3-5, 4-0) = (-2, 4)$, then rotate by $-90°$: $R^T = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$ gives $(0\\cdot(-2)+1\\cdot4,\\ -1\\cdot(-2)+0\\cdot4) = (4, 2)$. The x-coordinate is 4."]
]);

GEN("ELVE3610", 0,
 // enkel: rotasjon om z-aksen i 3D
 () => { const x = R.p([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), y = R.p([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), z = R.i(-5, 5),
     th = R.p([30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
   const xr = x * Math.cos(th * DEG) - y * Math.sin(th * DEG);
   return [T(`Punktet $(${x}, ${y}, ${z})$ roteres ${th}° mot klokka om z-aksen. Hva blir x-koordinaten? (z-koordinaten endres ikke av denne rotasjonen.)`,
             `The point $(${x}, ${y}, ${z})$ is rotated ${th}° counterclockwise about the z-axis. What is the x-coordinate? (The z-coordinate is unchanged by this rotation.)`),
     { n: xr, tol: rel(xr, 0.01, 0.05), u: "" },
     T(`Rotasjon om z-aksen påvirker bare x og y: $x' = x\\cos\\theta - y\\sin\\theta = ${x}\\cos ${th}^\\circ - (${y})\\sin ${th}^\\circ \\approx ${mf(xr)}$.`,
       `Rotation about the z-axis only affects x and y: $x' = x\\cos\\theta - y\\sin\\theta = ${x}\\cos ${th}^\\circ - (${y})\\sin ${th}^\\circ \\approx ${mf(xr)}$.`)]; },
 // middels: rotasjon om et punkt som ikke er origo
 () => { const Qx = R.i(-4, 4), Qy = R.i(-4, 4), Px = Qx + R.p([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]), Py = Qy + R.p([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]),
     th = R.p([30, 45, 60, 90, 120, 135, 150, 210, 240, 270, 300, 330]);
   const dx = Px - Qx, dy = Py - Qy, dxr = dx * Math.cos(th * DEG) - dy * Math.sin(th * DEG), dyr = dx * Math.sin(th * DEG) + dy * Math.cos(th * DEG), Pyr = Qy + dyr;
   return [T(`Punktet $(${Px}, ${Py})$ roteres ${th}° mot klokka om punktet $Q = (${Qx}, ${Qy})$ (ikke origo). Hva blir y-koordinaten til det roterte punktet?`,
             `The point $(${Px}, ${Py})$ is rotated ${th}° counterclockwise about the point $Q = (${Qx}, ${Qy})$ (not the origin). What is the y-coordinate of the rotated point?`),
     { n: Pyr, tol: rel(Pyr, 0.01, 0.05), u: "" },
     T(`Flytt slik at Q blir origo: $(dx, dy) = (${dx}, ${dy})$. Roter: $dy' = dx\\sin\\theta + dy\\cos\\theta \\approx ${mf(dyr)}$. Flytt tilbake: $y' = Q_y + dy' = ${Qy} + ${mf(dyr)} \\approx ${mf(Pyr)}$.`,
       `Shift so Q becomes the origin: $(dx, dy) = (${dx}, ${dy})$. Rotate: $dy' = dx\\sin\\theta + dy\\cos\\theta \\approx ${mf(dyr)}$. Shift back: $y' = Q_y + dy' = ${Qy} + ${mf(dyr)} \\approx ${mf(Pyr)}$.`)]; },
 // eksamen: kjede av to rammetransformasjoner (2-leddet arm med verktøyoffset)
 () => { const th1 = R.p([15, 30, 45, 60, -15, -30, -45]), a1 = R.f(0.5, 2, 0.1), b1 = R.f(-1, 1, 0.1),
     th2 = R.p([20, 40, 60, 90, -20, -40]), a2 = R.f(0.1, 0.6, 0.05), b2 = R.f(-0.3, 0.3, 0.05),
     x2 = R.f(-0.3, 0.3, 0.05), y2 = R.f(-0.3, 0.3, 0.05);
   const x1 = x2 * Math.cos(th2 * DEG) - y2 * Math.sin(th2 * DEG) + a2, y1 = x2 * Math.sin(th2 * DEG) + y2 * Math.cos(th2 * DEG) + b2;
   const x0 = x1 * Math.cos(th1 * DEG) - y1 * Math.sin(th1 * DEG) + a1;
   return [T(`En robotarm har to ledd. Rammen for ledd 2 er rotert ${th1}° og forskjøvet $(${mf(a1)}, ${mf(b1)})$ m i forhold til basisrammen. Endeeffektoren er rotert ${th2}° og forskjøvet $(${mf(a2)}, ${mf(b2)})$ m i forhold til ledd 2. Et gripepunkt har koordinatene $(${mf(x2)}, ${mf(y2)})$ m i endeeffektor-rammen. Hva er x-koordinaten til gripepunktet i basisrammen?`,
             `A robot arm has two links. The frame of link 2 is rotated ${th1}° and shifted by $(${mf(a1)}, ${mf(b1)})$ m relative to the base frame. The end effector is rotated ${th2}° and shifted by $(${mf(a2)}, ${mf(b2)})$ m relative to link 2. A grip point has coordinates $(${mf(x2)}, ${mf(y2)})$ m in the end-effector frame. What is the x-coordinate of the grip point in the base frame?`),
     { n: x0, tol: rel(x0, 0.01, 0.01), u: "m" },
     T(`Transformer først til ledd 2: $x_1 = x_2\\cos\\theta_2 - y_2\\sin\\theta_2 + a_2 \\approx ${mf(x1)}$ m, $y_1 = x_2\\sin\\theta_2 + y_2\\cos\\theta_2 + b_2 \\approx ${mf(y1)}$ m. Transformer så til basisrammen: $x_0 = x_1\\cos\\theta_1 - y_1\\sin\\theta_1 + a_1 \\approx ${mf(x0)}$ m.`,
       `First transform to link 2: $x_1 = x_2\\cos\\theta_2 - y_2\\sin\\theta_2 + a_2 \\approx ${mf(x1)}$ m, $y_1 = x_2\\sin\\theta_2 + y_2\\cos\\theta_2 + b_2 \\approx ${mf(y1)}$ m. Then transform to the base frame: $x_0 = x_1\\cos\\theta_1 - y_1\\sin\\theta_1 + a_1 \\approx ${mf(x0)}$ m.`)]; }
);

// ================= ELVE3610 – enhet 1: Kinematikk =================
THEORY("ELVE3610", 1, {
nb: `## Hva handler det om?
Kinematikk beskriver sammenhengen mellom leddvinklene (eller leddforskyvningene) i en robotarm og posisjonen/orienteringen til verktøyet, uten å bry seg om kreftene som skaper bevegelsen. Foroverkinematikk går fra kjente leddvariabler til verktøyets posisjon; inverskinematikk går motsatt vei, fra ønsket verktøyposisjon til leddvariablene som gir den. Begge deler er nødvendige for å programmere og styre en robotarm i praksis.

## Begreper og formler
- Foroverkinematikk (FK): $\\mathbf{x} = f(\\mathbf q)$, der $\\mathbf q$ er leddvariablene (vinkler for revolutte ledd, lengder for prismatiske) og $\\mathbf x$ er verktøyets posisjon/orientering. Beregnes ved å kjede sammen DH-transformasjonene ledd for ledd (se enhet 0).
- Inverskinematikk (IK): finn $\\mathbf q$ gitt ønsket $\\mathbf x$. Kan ha ingen, én, eller flere løsninger (f.eks. albue opp/albue ned for en planar 2-leddsarm).
- For en planar 2-leddsarm med lengder $L_1, L_2$: $x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1+\\theta_2)$, $y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1+\\theta_2)$. Løs IK med cosinussetningen: $\\cos\\theta_2 = \\dfrac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2}$.
- Arbeidsområdet (workspace) er alle punkter verktøyet kan nå; for 2-leddsarmen er det en ring med indre radius $|L_1-L_2|$ og ytre radius $L_1+L_2$.
- Jacobimatrisen $J(\\mathbf q)$ relaterer leddhastigheter til verktøyets hastighet: $\\dot{\\mathbf x} = J(\\mathbf q)\\dot{\\mathbf q}$.
- Singularitet: en konfigurasjon der $J$ mister rang (blir ikke-inverterbar). Nær en singularitet krever selv en liten verktøyhastighet svært store leddhastigheter.
- Redundans: flere frihetsgrader enn oppgaven krever (f.eks. en 7-akset arm for en 6D-oppgave), som gir flere mulige leddløsninger for samme verktøyposisjon.
- Ledd-interpolert bevegelse (MoveJ) beveger leddene jevnt fra start til mål; bevegelsen til verktøyet blir en krum bane. Lineær/kartesisk bevegelse (MoveL) holder verktøyet på en rett linje, men kan kreve store og ujevne leddhastigheter.

## Slik løser du oppgavene
1. Avgjør om oppgaven er FK (kjente vinkler → posisjon) eller IK (kjent posisjon → vinkler).
2. For FK: sett inn i formlene ledd for ledd (eller multipliser DH-matrisene).
3. For IK på en planar arm: bruk cosinussetningen for å finne $\\theta_2$, og finn deretter $\\theta_1$ fra geometrien.
4. Sjekk alltid om målet ligger innenfor arbeidsområdet ($|L_1-L_2| \\le r \\le L_1+L_2$) før du løser IK.
5. For hastigheter: bruk Jacobimatrisen, og vær oppmerksom på singulariteter der $J$ mister rang.

### Eksempel
En planar 2-leddsarm har $L_1 = 1$ m og $L_2 = 0{,}6$ m. Verktøyet skal til $(1{,}2,\\ 0{,}4)$ m. Finn $\\theta_2$.
1. Avstand fra basen: $r = \\sqrt{1{,}2^2+0{,}4^2} \\approx 1{,}265$ m, som ligger innenfor $[0{,}4,\\ 1{,}6]$ m – målet er nåbart.
2. $\\cos\\theta_2 = \\dfrac{1{,}2^2+0{,}4^2-1^2-0{,}6^2}{2\\cdot1\\cdot0{,}6} \\approx 0{,}200$.
3. $\\theta_2 = \\arccos(0{,}200) \\approx 78{,}5^\\circ$ (albue opp-løsningen).

## Vanlige feil
- Å blande sammen FK og IK, eller tro IK alltid har nøyaktig én løsning.
- Å glemme å sjekke om målet i det hele tatt ligger i arbeidsområdet før man løser IK.
- Å tro at leddhastigheter alltid er begrensede – nær en singularitet kan de bli svært store.
- Å forveksle MoveJ og MoveL: MoveJ gir ikke en rett linje for verktøyet.

> Foroverkinematikk regner fra ledd til verktøy; inverskinematikk regner motsatt vei og kan ha flere løsninger. Jacobimatrisen knytter leddhastigheter til verktøyhastighet, og mister den rang, har du en singularitet.`,
en: `## What is it about?
Kinematics describes the relationship between the joint angles (or joint displacements) of a robot arm and the position/orientation of its tool, without worrying about the forces that produce the motion. Forward kinematics goes from known joint variables to the tool's position; inverse kinematics goes the other way, from a desired tool position to the joint variables that produce it. Both are needed to program and control a robot arm in practice.

## Concepts and formulas
- Forward kinematics (FK): $\\mathbf{x} = f(\\mathbf q)$, where $\\mathbf q$ are the joint variables (angles for revolute joints, lengths for prismatic ones) and $\\mathbf x$ is the tool's position/orientation. Computed by chaining the DH transformations link by link (see unit 0).
- Inverse kinematics (IK): find $\\mathbf q$ given a desired $\\mathbf x$. There may be no solution, one solution, or several (e.g. elbow-up/elbow-down for a planar 2-link arm).
- For a planar 2-link arm with lengths $L_1, L_2$: $x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1+\\theta_2)$, $y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1+\\theta_2)$. Solve the IK with the law of cosines: $\\cos\\theta_2 = \\dfrac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2}$.
- The workspace is all the points the tool can reach; for the 2-link arm it is a ring with inner radius $|L_1-L_2|$ and outer radius $L_1+L_2$.
- The Jacobian $J(\\mathbf q)$ relates joint velocities to the tool's velocity: $\\dot{\\mathbf x} = J(\\mathbf q)\\dot{\\mathbf q}$.
- A singularity is a configuration where $J$ loses rank (becomes non-invertible). Near a singularity, even a small tool velocity requires very large joint velocities.
- Redundancy: more degrees of freedom than the task requires (e.g. a 7-axis arm for a 6D task), giving multiple possible joint solutions for the same tool position.
- Joint-interpolated motion (MoveJ) moves the joints smoothly from start to goal; the tool then traces a curved path. Linear/Cartesian motion (MoveL) keeps the tool on a straight line, but can require large and uneven joint velocities.

## How to solve the problems
1. Decide whether the task is FK (known angles → position) or IK (known position → angles).
2. For FK: substitute into the formulas link by link (or multiply the DH matrices).
3. For IK on a planar arm: use the law of cosines to find $\\theta_2$, then find $\\theta_1$ from the geometry.
4. Always check whether the target lies within the workspace ($|L_1-L_2| \\le r \\le L_1+L_2$) before solving the IK.
5. For velocities: use the Jacobian, and watch out for singularities where $J$ loses rank.

### Example
A planar 2-link arm has $L_1 = 1$ m and $L_2 = 0.6$ m. The tool must reach $(1.2,\\ 0.4)$ m. Find $\\theta_2$.
1. Distance from the base: $r = \\sqrt{1.2^2+0.4^2} \\approx 1.265$ m, which lies within $[0.4,\\ 1.6]$ m – the target is reachable.
2. $\\cos\\theta_2 = \\dfrac{1.2^2+0.4^2-1^2-0.6^2}{2\\cdot1\\cdot0.6} \\approx 0.200$.
3. $\\theta_2 = \\arccos(0.200) \\approx 78.5^\\circ$ (the elbow-up solution).

## Common mistakes
- Mixing up FK and IK, or assuming IK always has exactly one solution.
- Forgetting to check whether the target even lies within the workspace before solving the IK.
- Assuming joint velocities are always bounded – near a singularity they can become very large.
- Confusing MoveJ and MoveL: MoveJ does not give a straight line for the tool.

> Forward kinematics computes from joints to tool; inverse kinematics computes the other way and may have several solutions. The Jacobian links joint velocities to tool velocity, and if it loses rank, you have a singularity.`
});

BIQ("ELVE3610", 1, [
 ["En robotarm med 6 ledd skal nå en ønsket posisjon OG orientering i 3D (en oppgave med 6 frihetsgrader). Hvilken størrelse har Jacobimatrisen $J(\\mathbf q)$ da?",
  ["6×6", "3×6", "6×3", "3×3"],
  "Jacobimatrisen har én rad per oppgavefrihetsgrad (her 6: tre for posisjon, tre for orientering) og én kolonne per ledd (her 6), altså 6×6.",
  "A robot arm with 6 joints must reach a desired position AND orientation in 3D (a task with 6 degrees of freedom). What size is the Jacobian $J(\\mathbf q)$ then?",
  ["6×6", "3×6", "6×3", "3×3"],
  "The Jacobian has one row per task degree of freedom (here 6: three for position, three for orientation) and one column per joint (here 6), i.e. 6×6."],
 ["En robotarm nærmer seg en singularitet, altså en konfigurasjon der Jacobimatrisen mister rang. Hva skjer med leddhastighetene som kreves for å holde en gitt (endelig) verktøyhastighet?",
  ["De kan bli vilkårlig store (går mot uendelig)", "De går mot null", "De er upåvirket", "Roboten stopper automatisk og trenger ingen leddhastighet"],
  "Nær en singularitet blir $J$ nesten ikke-inverterbar, så $\\dot{\\mathbf q} = J^{-1}\\dot{\\mathbf x}$ krever stadig større leddhastigheter for samme verktøyhastighet.",
  "A robot arm approaches a singularity, i.e. a configuration where the Jacobian loses rank. What happens to the joint velocities required to maintain a given (finite) tool velocity?",
  ["They can become arbitrarily large (tend to infinity)", "They tend to zero", "They are unaffected", "The robot stops automatically and needs no joint velocity"],
  "Near a singularity $J$ becomes nearly non-invertible, so $\\dot{\\mathbf q} = J^{-1}\\dot{\\mathbf x}$ requires ever larger joint velocities for the same tool velocity."],
 ["En robotarm har 7 ledd og skal utføre en oppgave som krever 6 frihetsgrader (posisjon og orientering i 3D). Hvor mange frihetsgrader har armen til overs (er redundante) for denne oppgaven?",
  { n: 1, tol: 0, u: "" },
  "Redundans er antall ledd minus antall oppgavefrihetsgrader: $7-6=1$.",
  "A robot arm has 7 joints and must perform a task that requires 6 degrees of freedom (position and orientation in 3D). How many degrees of freedom does the arm have to spare (how redundant is it) for this task?",
  null,
  "Redundancy is the number of joints minus the number of task degrees of freedom: $7-6=1$."]
]);

GEN("ELVE3610", 1,
 // enkel: tid for ledd-interpolert bevegelse med konstant vinkelhastighet
 () => { const dth = R.p([10, 15, 20, 25, 30, 45, 60, 75, 90, 120]), omega = R.p([5, 10, 15, 20, 30, 45, 60]); const t = dth / omega;
   return [T(`Et ledd roterer med konstant vinkelhastighet ${omega}°/s (MoveJ) og skal dreie ${dth}°. Hvor lang tid tar bevegelsen?`,
             `A joint rotates at a constant angular speed of ${omega}°/s (MoveJ) and must turn through ${dth}°. How long does the motion take?`),
     { n: t, tol: rel(t, 0.01, 0.02), u: "s" },
     T(`$t = \\Delta\\theta/\\omega = ${dth}/${omega} \\approx ${mf(t)}$ s.`, `$t = \\Delta\\theta/\\omega = ${dth}/${omega} \\approx ${mf(t)}$ s.`)]; },
 // eksamen: inverskinematikk for planar 2-leddsarm via cosinussetningen
 () => { const L1 = R.f(0.3, 1.5, 0.1), L2 = R.f(0.2, 1.2, 0.1), th1t = R.p([-60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90]), th2t = R.p([30, 45, 60, 75, 90, 105, 120, 135]);
   const x = L1 * Math.cos(th1t * DEG) + L2 * Math.cos((th1t + th2t) * DEG), y = L1 * Math.sin(th1t * DEG) + L2 * Math.sin((th1t + th2t) * DEG);
   let cosTh2 = (x * x + y * y - L1 * L1 - L2 * L2) / (2 * L1 * L2); cosTh2 = Math.max(-1, Math.min(1, cosTh2));
   const th2 = Math.acos(cosTh2) / DEG;
   return [T(`En planar 2-leddsarm har $L_1 = ${mf(L1)}$ m og $L_2 = ${mf(L2)}$ m. Verktøyet befinner seg i $(${mf(x)},\\ ${mf(y)})$ m, og armen er i «albue opp»-konfigurasjon ($\\theta_2$ mellom 0° og 180°). Hva er $\\theta_2$?`,
             `A planar 2-link arm has $L_1 = ${mf(L1)}$ m and $L_2 = ${mf(L2)}$ m. The tool is at $(${mf(x)},\\ ${mf(y)})$ m, and the arm is in the "elbow-up" configuration ($\\theta_2$ between 0° and 180°). What is $\\theta_2$?`),
     { n: th2, tol: rel(th2, 0.01, 0.5), u: "°" },
     T(`Cosinussetningen: $\\cos\\theta_2 = \\dfrac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2} \\approx ${mf(cosTh2, 3)}$, så $\\theta_2 = \\arccos(${mf(cosTh2, 3)}) \\approx ${mf(th2)}°$.`,
       `Law of cosines: $\\cos\\theta_2 = \\dfrac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2} \\approx ${mf(cosTh2, 3)}$, so $\\theta_2 = \\arccos(${mf(cosTh2, 3)}) \\approx ${mf(th2)}°$.`)]; }
);

// ================= ELVE3610 – enhet 2: Robotsystemer =================
THEORY("ELVE3610", 2, {
nb: `## Hva handler det om?
En robot er mer enn kinematikken – det er et komplett mekatronisk system av mekanisk struktur, aktuatorer, sensorer og styring. Å velge riktig robotkonfigurasjon, drivverk og sensorikk til en oppgave er like viktig som å regne riktig kinematikk, og det er her ingeniørens praktiske valg kommer inn.

## Begreper og formler
- Vanlige konfigurasjoner: leddarm/artikulert (flest frihetsgrader, fleksibel), SCARA (stiv vertikalt, ettergivende horisontalt – rask plukk-og-plasser i et plan), kartesisk/gantry (lineære akser i x, y, z – enkel og nøyaktig), sylindrisk og sfærisk (eldre typer), parallell/delta (lav bevegelig masse, høy hastighet, men begrenset arbeidsområde).
- Ledd: revolutt (R, roterer) og prismatisk (P, forskyves lineært). En robots type beskrives ofte med en bokstavkode, f.eks. RRR for en 3-leddet artikulert arm.
- Sensorer: en inkrementell enkoder teller pulser og må «hjemmes» (finne en referanseposisjon) etter oppstart; en absolutt enkoder gir vinkelen direkte, også rett etter et strømbrudd, men er dyrere. Oppløsningen til en absoluttenkoder med $n$ bits er $360^\\circ/2^n$.
- Aktuatorer: elektriske motorer (vanligst) driver som regel gjennom en girkasse (f.eks. harmonic drive) som øker moment og reduserer hastighet: $\\tau_{ut} = \\tau_{inn}\\cdot N \\cdot \\eta$, der $N$ er utvekslingen og $\\eta$ virkningsgraden.
- End effector (robotverktøy) er det som sitter ytterst – griper, sveisepistol, sugekopp osv. – og bestemmer hva roboten faktisk utfører.
- Kollaborative roboter (cobots) er laget for å jobbe trygt nær mennesker, med kraft- og hastighetsbegrensning, i motsetning til tradisjonelle roboter som ofte krever sikkerhetsgjerder.
- Baneplanlegging (path planning) finner en kollisjonsfri vei fra start til mål gjennom arbeidsområdet, f.eks. med algoritmer som A* eller RRT.

## Slik løser du oppgavene
1. Identifiser hvilken del av systemet oppgaven handler om: konfigurasjon, ledd/aktuator, sensor eller sikkerhet/planlegging.
2. For girkasser: hold styr på om du regner momentet inn eller ut av giret, og husk virkningsgraden.
3. For enkodere: skill mellom pulser per omdreining (inkrementell) og bits oppløsning (absolutt) – de gir svar i ulike enheter.
4. Tenk gjennom hvilken robotkonfigurasjon som passer oppgavens geometri og hastighetskrav.

### Eksempel
En motor gir 0,6 Nm inn på en girkasse med utveksling 100:1 og virkningsgrad 85 %. Hvor stort moment får leddet?
1. $\\tau_{ut} = \\tau_{inn}\\cdot N\\cdot\\eta = 0{,}6\\cdot 100\\cdot 0{,}85$.
2. $\\tau_{ut} = 51$ Nm.

## Vanlige feil
- Å blande sammen inkrementell og absolutt enkoder, eller glemme at inkrementelle må hjemmes.
- Å glemme virkningsgraden når man regner moment gjennom en girkasse.
- Å tro at flere frihetsgrader alltid er bedre – en SCARA er ofte raskere og billigere for en oppgave i et plan enn en full 6-akset arm.
- Å tro at cobots alltid er trege eller svake – de er trygge, ikke nødvendigvis langsomme.

> En robot er et mekatronisk system: velg konfigurasjon, ledd, sensor og aktuator ut fra oppgaven – og husk virkningsgraden når du regner moment gjennom en girkasse.`,
en: `## What is it about?
A robot is more than its kinematics – it is a complete mechatronic system of mechanical structure, actuators, sensors and control. Choosing the right robot configuration, drivetrain and sensing for a task matters just as much as computing the kinematics correctly, and this is where the engineer's practical choices come in.

## Concepts and formulas
- Common configurations: articulated arm (most degrees of freedom, very flexible), SCARA (stiff vertically, compliant horizontally – fast pick-and-place in a plane), Cartesian/gantry (linear axes in x, y, z – simple and accurate), cylindrical and spherical (older types), parallel/delta (low moving mass, high speed, but a limited workspace).
- Joints: revolute (R, rotates) and prismatic (P, slides linearly). A robot's type is often described with a letter code, e.g. RRR for a 3-joint articulated arm.
- Sensors: an incremental encoder counts pulses and must be "homed" (find a reference position) after start-up; an absolute encoder gives the angle directly, even right after a power loss, but is more expensive. The resolution of an $n$-bit absolute encoder is $360^\\circ/2^n$.
- Actuators: electric motors (most common) usually drive through a gearbox (e.g. a harmonic drive) that increases torque and reduces speed: $\\tau_{out} = \\tau_{in}\\cdot N \\cdot \\eta$, where $N$ is the gear ratio and $\\eta$ the efficiency.
- The end effector (robot tool) is whatever sits at the tip – a gripper, welding gun, suction cup, and so on – and determines what the robot actually does.
- Collaborative robots (cobots) are designed to work safely near people, with force and speed limiting, unlike traditional robots that often require safety fencing.
- Path planning finds a collision-free route from start to goal through the workspace, e.g. with algorithms such as A* or RRT.

## How to solve the problems
1. Identify which part of the system the question is about: configuration, joint/actuator, sensor, or safety/planning.
2. For gearboxes: keep track of whether you are computing the torque into or out of the gearbox, and remember the efficiency.
3. For encoders: distinguish between pulses per revolution (incremental) and bits of resolution (absolute) – they give answers in different units.
4. Think through which robot configuration suits the task's geometry and speed requirements.

### Example
A motor delivers 0.6 Nm into a gearbox with a ratio of 100:1 and an efficiency of 85%. How much torque does the joint get?
1. $\\tau_{out} = \\tau_{in}\\cdot N\\cdot\\eta = 0.6\\cdot 100\\cdot 0.85$.
2. $\\tau_{out} = 51$ Nm.

## Common mistakes
- Confusing incremental and absolute encoders, or forgetting that incremental ones must be homed.
- Forgetting the efficiency when computing torque through a gearbox.
- Assuming more degrees of freedom is always better – a SCARA is often faster and cheaper than a full 6-axis arm for a planar task.
- Assuming cobots are always slow or weak – they are safe, not necessarily slow.

> A robot is a mechatronic system: choose the configuration, joints, sensors and actuators to fit the task – and remember the efficiency when computing torque through a gearbox.`
});

BIQ("ELVE3610", 2, [
 ["Hvilken robotkonfigurasjon har typisk tre lineære (prismatiske) akser i x, y og z, og egner seg godt til CNC-liknende oppgaver med stor nøyaktighet?",
  ["Kartesisk robot (gantry-robot)", "SCARA-robot", "Delta-robot (parallellrobot)", "Sylindrisk robot"],
  "En kartesisk/gantry-robot beveger verktøyet langs tre rette, uavhengige akser, noe som gjør den enkel å styre nøyaktig.",
  "Which robot configuration typically has three linear (prismatic) axes in x, y and z, and is well suited to CNC-like tasks requiring high accuracy?",
  ["Cartesian robot (gantry robot)", "SCARA robot", "Delta robot (parallel robot)", "Cylindrical robot"],
  "A Cartesian/gantry robot moves the tool along three straight, independent axes, which makes it simple to control accurately."],
 ["En robot mister strømmen og startes opp igjen. Hva er den praktiske forskjellen mellom inkrementelle og absolutte enkodere i denne situasjonen?",
  ["Absolutte enkodere kjenner vinkelen umiddelbart; inkrementelle må først kjøre en hjemme-/referansesekvens", "Inkrementelle enkodere kjenner vinkelen umiddelbart; absolutte må hjemmes", "Begge må alltid hjemmes på nytt", "Ingen av dem husker posisjonen, uansett type"],
  "En absoluttenkoder gir en unik kode per posisjon uavhengig av strøm, mens en inkrementell enkoder bare teller pulser fra et referansepunkt og mister denne referansen ved strømbrudd.",
  "A robot loses power and is restarted. What is the practical difference between incremental and absolute encoders in this situation?",
  ["Absolute encoders know the angle immediately; incremental ones must first run a homing/referencing sequence", "Incremental encoders know the angle immediately; absolute ones must be homed", "Both must always be re-homed", "Neither remembers its position, regardless of type"],
  "An absolute encoder gives a unique code per position independent of power, while an incremental encoder only counts pulses from a reference point and loses that reference on a power loss."],
 ["En absolutt enkoder har 12 bits oppløsning over én hel omdreining (360°). Hva er den minste vinkelendringen enkoderen kan skille mellom?",
  { n: 360 / 4096, tol: rel(360 / 4096, 0.01, 0.0005), u: "°" },
  "12 bits gir $2^{12}=4096$ unike posisjoner per omdreining: $360^\\circ/4096 \\approx 0{,}0879°$.",
  "An absolute encoder has 12-bit resolution over one full revolution (360°). What is the smallest angular change the encoder can distinguish?",
  null,
  "12 bits give $2^{12}=4096$ unique positions per revolution: $360^\\circ/4096 \\approx 0.0879°$."]
]);

GEN("ELVE3610", 2,
 // enkel: total frihetsgrad med ekstra skinneakse
 () => { const nJoints = R.i(4, 7);
   return [T(`En robotarm med ${nJoints} ledd monteres på en lineær skinne som gir én ekstra frihetsgrad (for å øke rekkevidden). Hvor mange totale frihetsgrader har systemet?`,
             `A robot arm with ${nJoints} joints is mounted on a linear rail that adds one extra degree of freedom (to increase reach). How many total degrees of freedom does the system have?`),
     { n: nJoints + 1, tol: 0, u: "" },
     T(`Skinnen legger til én frihetsgrad: $${nJoints}+1=${nJoints + 1}$.`, `The rail adds one degree of freedom: $${nJoints}+1=${nJoints + 1}$.`)]; },
 // eksamen: motordimensjonering gjennom girkasse (inverst av standardoppgaven)
 () => { const Tjoint = R.p([20, 30, 40, 50, 60, 80, 100, 120, 150, 180, 200, 250]), N = R.p([50, 80, 100, 120, 150, 160, 200, 250]), effPct = R.i(75, 95), eff = effPct / 100;
   const Tmotor = Tjoint / (N * eff);
   return [T(`Et robotledd trenger et moment på ${Tjoint} Nm. Girkassen har utveksling ${N}:1 og virkningsgrad ${effPct} %. Hvor stort moment må motoren minst levere?`,
             `A robot joint needs a torque of ${Tjoint} Nm. The gearbox has a ratio of ${N}:1 and an efficiency of ${effPct}%. What is the minimum torque the motor must deliver?`),
     { n: Tmotor, tol: rel(Tmotor, 0.01, 0.001), u: "Nm" },
     T(`$\\tau_{ut}=\\tau_{inn}N\\eta \\Rightarrow \\tau_{inn}=\\tau_{ut}/(N\\eta) = ${Tjoint}/(${N}\\cdot ${mf(eff)}) \\approx ${mf(Tmotor, 4)}$ Nm.`,
       `$\\tau_{out}=\\tau_{in}N\\eta \\Rightarrow \\tau_{in}=\\tau_{out}/(N\\eta) = ${Tjoint}/(${N}\\cdot ${mf(eff)}) \\approx ${mf(Tmotor, 4)}$ Nm.`)]; }
);

// ================= FEM – enhet 0: Stavelementer og stivhetsmatriser =================
THEORY("FEM", 0, {
nb: `## Hva handler det om?
Elementmetoden (FEM) løser kompliserte konstruksjonsproblemer ved å dele opp en struktur i mange små, enkle elementer der vi kjenner sammenhengen mellom krefter og forskyvninger nøyaktig. Stavelementet (1D, aksialt) er det enkleste elementet og viser selve grunnideen: hvert element har en stivhetsmatrise som knytter nodeforskyvninger til nodekrefter, og disse settes sammen (assembleres) til en global ligning for hele strukturen.

## Begreper og formler
- Stivhetsmatrisen til et stavelement: $$k^{(e)} = \\frac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$$ der $E$ er E-modulen, $A$ tverrsnittsarealet og $L$ elementlengden.
- Elementligningen: $k^{(e)}\\vec u^{(e)} = \\vec f^{(e)}$, der $\\vec u^{(e)}$ er nodeforskyvningene og $\\vec f^{(e)}$ nodekreftene.
- Global assemblering: elementmatrisene legges inn i en global matrise $K$ etter hvilke globale frihetsgrader (DOF) nodene har. Noder som deles av flere elementer, får bidrag fra alle.
- Den globale ligningen $K\\vec u = \\vec f$ er singulær (ikke inverterbar) før randbetingelser er satt inn, fordi strukturen ellers kan bevege seg fritt som et stivt legeme.
- Randbetingelser (f.eks. en fastholdt node, $u=0$) fjernes fra ligningssystemet før man løser for de ukjente forskyvningene; deretter kan reaksjonskreftene i de fastholdte nodene regnes ut.
- Stivhetsmatrisen er symmetrisk (Maxwell–Bettis resiprositetsteorem) og som regel glissen (sparse), fordi hver node bare er koblet til sine nærmeste naboer.
- Spenningen i et element beregnes etterpå fra forskyvningene: $\\sigma = E\\varepsilon = E\\dfrac{u_2-u_1}{L}$.

## Slik løser du oppgavene
1. Sett opp stivhetsmatrisen $EA/L$ (eller den gitte fjærstivheten $k$) for hvert element.
2. Assembler: legg elementbidragene inn i riktige rader/kolonner i den globale matrisen etter nodenumrene.
3. Sett inn randbetingelsene (fjern rader/kolonner for fastholdte frihetsgrader, eller sett dem til en kjent verdi).
4. Løs $K\\vec u = \\vec f$ for de ukjente forskyvningene.
5. Regn ut spenning/tøyning og eventuelt reaksjonskrefter fra forskyvningene.

### Eksempel
To stavelementer i serie: element 1 har $k_1 = 800$ N/mm, element 2 har $k_2 = 400$ N/mm. Node 1 er fastholdt, og en kraft på 600 N virker i node 3 (den frie enden). Finn $u_3$.
1. Frihetsgraden i node 1 er fjernet ($u_1=0$).
2. Kraften i node 3 overføres gjennom begge elementene i serie, så forskyvningene legges sammen: $u_3 = F/k_1 + F/k_2$.
3. $u_3 = 600/800 + 600/400 = 0{,}75 + 1{,}5 = 2{,}25$ mm.

## Vanlige feil
- Å glemme å fjerne randbetingelsene før man løser ligningssystemet (matrisen er da singulær og kan ikke inverteres).
- Å legge sammen elementbidrag feil sted ved assemblering – sjekk alltid nodenumrene.
- Å blande enheter, f.eks. GPa og mm² uten å konvertere til N/mm² (MPa).
- Å tro at stivere (høyere $EA/L$) betyr mer forskyvning – det er motsatt.

> Stivhetsmatrisen $EA/L\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$ er byggesteinen i FEM: assembler den for hvert element inn i en global matrise, sett inn randbetingelser, og løs $K\\vec u = \\vec f$.`,
en: `## What is it about?
The finite element method (FEM) solves complicated structural problems by dividing a structure into many small, simple elements for which the relationship between forces and displacements is known exactly. The bar element (1D, axial) is the simplest element and shows the core idea: each element has a stiffness matrix that relates nodal displacements to nodal forces, and these are assembled into a global system of equations for the whole structure.

## Concepts and formulas
- The stiffness matrix of a bar element: $$k^{(e)} = \\frac{EA}{L}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$$ where $E$ is the elastic modulus, $A$ the cross-sectional area and $L$ the element length.
- The element equation: $k^{(e)}\\vec u^{(e)} = \\vec f^{(e)}$, where $\\vec u^{(e)}$ are the nodal displacements and $\\vec f^{(e)}$ the nodal forces.
- Global assembly: the element matrices are inserted into a global matrix $K$ according to the global degrees of freedom (DOFs) of their nodes. Nodes shared by several elements receive contributions from all of them.
- The global system $K\\vec u = \\vec f$ is singular (not invertible) before boundary conditions are applied, because otherwise the structure could move freely as a rigid body.
- Boundary conditions (e.g. a fixed node, $u=0$) are removed from the system before solving for the unknown displacements; the reaction forces at the fixed nodes can then be computed afterward.
- The stiffness matrix is symmetric (Maxwell–Betti reciprocity theorem) and usually sparse, because each node is only connected to its nearest neighbours.
- The stress in an element is computed afterward from the displacements: $\\sigma = E\\varepsilon = E\\dfrac{u_2-u_1}{L}$.

## How to solve the problems
1. Set up the stiffness $EA/L$ (or the given spring stiffness $k$) for each element.
2. Assemble: insert the element contributions into the correct rows/columns of the global matrix according to the node numbers.
3. Apply the boundary conditions (remove rows/columns for fixed degrees of freedom, or set them to a known value).
4. Solve $K\\vec u = \\vec f$ for the unknown displacements.
5. Compute stress/strain and, if needed, reaction forces from the displacements.

### Example
Two bar elements in series: element 1 has $k_1 = 800$ N/mm, element 2 has $k_2 = 400$ N/mm. Node 1 is fixed, and a force of 600 N acts at node 3 (the free end). Find $u_3$.
1. The degree of freedom at node 1 is removed ($u_1=0$).
2. The force at node 3 is transmitted through both elements in series, so the displacements add: $u_3 = F/k_1 + F/k_2$.
3. $u_3 = 600/800 + 600/400 = 0.75 + 1.5 = 2.25$ mm.

## Common mistakes
- Forgetting to remove the boundary conditions before solving the system (the matrix is then singular and cannot be inverted).
- Adding element contributions to the wrong place during assembly – always check the node numbers.
- Mixing units, e.g. GPa and mm² without converting to N/mm² (MPa).
- Assuming a stiffer element (higher $EA/L$) means more displacement – it is the opposite.

> The stiffness matrix $EA/L\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$ is the building block of FEM: assemble it for each element into a global matrix, apply the boundary conditions, and solve $K\\vec u = \\vec f$.`
});

BIQ("FEM", 0, [
 ["En stav er fastholdt i node 1 og har en kraft $F$ i den frie enden (node 2, ingen andre laster). Etter at du har løst $K\\vec u=\\vec f$, hva er reaksjonskraften i node 1?",
  ["$-F$ (like stor, motsatt rettet av den pålagte kraften)", "$F$ (samme retning)", "$0$, siden noden er fastholdt", "Kan ikke bestemmes uten å kjenne $E$ og $A$"],
  "Likevekt for hele staven krever at summen av ytre krefter er null: reaksjonen i node 1 må være $-F$.",
  "A bar is fixed at node 1 and has a force $F$ at the free end (node 2, no other loads). After solving $K\\vec u=\\vec f$, what is the reaction force at node 1?",
  ["$-F$ (equal in magnitude, opposite to the applied force)", "$F$ (same direction)", "$0$, since the node is fixed", "Cannot be determined without knowing $E$ and $A$"],
  "Equilibrium of the whole bar requires the sum of external forces to be zero: the reaction at node 1 must be $-F$."],
 ["Du dobler tverrsnittsarealet $A$ til et stavelement, men holder $E$ og $L$ uendret, og lasten er den samme. Hva skjer med forskyvningen i den frie enden?",
  ["Den halveres, fordi stivheten $EA/L$ dobles", "Den dobles", "Den er uendret", "Den firedobles"],
  "Stivheten $k=EA/L$ er proporsjonal med $A$, og forskyvningen $u=F/k$ er omvendt proporsjonal med stivheten.",
  "You double the cross-sectional area $A$ of a bar element but keep $E$ and $L$ unchanged, with the same load. What happens to the displacement at the free end?",
  ["It is halved, because the stiffness $EA/L$ doubles", "It doubles", "It is unchanged", "It quadruples"],
  "The stiffness $k=EA/L$ is proportional to $A$, and the displacement $u=F/k$ is inversely proportional to the stiffness."],
 ["Et stavelement har $E=200$ GPa og lengde $L=800$ mm. Løsningen gir nodeforskyvningene $u_1=0$ og $u_2=0{,}6$ mm. Hva er den aksielle spenningen i elementet?",
  { n: 150, tol: rel(150, 0.01, 1), u: "MPa" },
  "$\\varepsilon=(u_2-u_1)/L=0{,}6/800=0{,}00075$. $\\sigma=E\\varepsilon=200000\\cdot0{,}00075=150$ MPa (siden $E=200$ GPa $=200000$ MPa).",
  "A bar element has $E=200$ GPa and length $L=800$ mm. The solution gives nodal displacements $u_1=0$ and $u_2=0.6$ mm. What is the axial stress in the element?",
  null,
  "$\\varepsilon=(u_2-u_1)/L=0.6/800=0.00075$. $\\sigma=E\\varepsilon=200000\\cdot0.00075=150$ MPa (since $E=200$ GPa $=200000$ MPa)."]
]);

GEN("FEM", 0,
 // enkel: kraft fra stivhet og forskyvning
 () => { const k = R.p([50, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000]), u = R.f(0.1, 3, 0.1); const F = k * u;
   return [T(`Et stavelement har stivhet $k=${k}$ N/mm. Den ene enden er fastholdt, og den andre er forskjøvet ${nf(u)} mm. Hvor stor kraft virker i elementet?`,
             `A bar element has stiffness $k=${k}$ N/mm. One end is fixed, and the other is displaced ${nf(u)} mm. What is the force in the element?`),
     { n: F, tol: rel(F, 0.01, 0.5), u: "N" },
     T(`$F=ku=${k}\\cdot ${mf(u)} \\approx ${mf(F, 1)}$ N.`, `$F=ku=${k}\\cdot ${mf(u)} \\approx ${mf(F, 1)}$ N.`)]; },
 // eksamen: to elementer i serie med last i to noder
 () => { const k1 = R.p([200, 300, 400, 500, 600, 800]), k2 = R.p([150, 200, 300, 400, 500]), F2 = R.p([100, 200, 300, 500]), F3 = R.p([100, 150, 200, 300]);
   const u3 = (F2 + F3) / k1 + F3 / k2;
   return [T(`To stavelementer i serie (node 1–2–3) er fastholdt i node 1. Elementstivhetene er $k_1=${k1}$ N/mm (mellom node 1 og 2) og $k_2=${k2}$ N/mm (mellom node 2 og 3). En kraft på ${F2} N virker i node 2, og en kraft på ${F3} N virker i node 3. Hva er forskyvningen $u_3$?`,
             `Two bar elements in series (nodes 1–2–3) are fixed at node 1. The element stiffnesses are $k_1=${k1}$ N/mm (between nodes 1 and 2) and $k_2=${k2}$ N/mm (between nodes 2 and 3). A force of ${F2} N acts at node 2, and a force of ${F3} N acts at node 3. What is the displacement $u_3$?`),
     { n: u3, tol: rel(u3, 0.01, 0.001), u: "mm" },
     T(`Elementet mellom 1–2 bærer begge kreftene: $u_2=(F_2+F_3)/k_1$. Elementet mellom 2–3 bærer bare $F_3$: $u_3=u_2+F_3/k_2 = (${F2}+${F3})/${k1} + ${F3}/${k2} \\approx ${mf(u3, 4)}$ mm.`,
       `The element between 1–2 carries both forces: $u_2=(F_2+F_3)/k_1$. The element between 2–3 carries only $F_3$: $u_3=u_2+F_3/k_2 = (${F2}+${F3})/${k1} + ${F3}/${k2} \\approx ${mf(u3, 4)}$ mm.`)]; }
);

// ================= FEM – enhet 1: Svak form og formfunksjoner =================
THEORY("FEM", 1, {
nb: `## Hva handler det om?
For å bruke elementmetoden på problemer styrt av differensialligninger (f.eks. aksial elastisitet eller varmeledning) omformer vi den «sterke formen» (selve differensialligningen, som krever at løsningen er glatt nok til å deriveres to ganger) til en «svak form» ved å multiplisere med en testfunksjon og integrere delvis. Det senker kravet til deriverbarhet og er nøyaktig det som gjør det mulig å bruke enkle, stykkevis lineære formfunksjoner i hvert element.

## Begreper og formler
- Formfunksjoner $N_i(\\xi)$ interpolerer løsningen inne i elementet fra nodeverdiene: $u(\\xi) = \\sum_i N_i(\\xi)u_i$. For et lineært element på $\\xi\\in[0,1]$: $N_1 = 1-\\xi$, $N_2 = \\xi$.
- Formfunksjonene oppfyller Kronecker delta-egenskapen $N_i(\\xi_j) = \\delta_{ij}$ (1 i egen node, 0 i de andre) og er en partisjon av enheten ($\\sum_i N_i = 1$ overalt), slik at elementet kan gjengi en konstant (stivlegeme-) forskyvning nøyaktig.
- Galerkins metode velger testfunksjonene fra samme rom som formfunksjonene – standard FEM er derfor Bubnov–Galerkin.
- Essensielle (Dirichlet) randbetingelser settes direkte på de ukjente (f.eks. $u=0$); naturlige (Neumann) randbetingelser (kraft, fluks) kommer automatisk inn via randleddet som oppstår ved delvis integrasjon.
- Isoparametriske elementer bruker samme formfunksjoner til å beskrive både geometri og forskyvning. Avbildningen fra et referanseelement (f.eks. $\\xi\\in[-1,1]$) til det fysiske elementet styres av Jacobianen $J = dx/d\\xi$, som skalerer integraler mellom de to.
- Gauss-kvadratur beregner integraler numerisk med et fåtall punkter: $n$ punkter integrerer polynomer eksakt opp til grad $2n-1$. 2-punkts Gauss (ved $\\xi=\\pm1/\\sqrt3$, vekt 1 hver) er dermed eksakt til og med grad 3.

## Slik løser du oppgavene
1. Identifiser om du skal interpolere en verdi ($u=\\sum N_iu_i$), evaluere en formfunksjon i et punkt, eller integrere numerisk.
2. For interpolasjon: finn riktig $\\xi$ (normalisert posisjon) og sett inn i $N_1, N_2$.
3. For Gauss-kvadratur: sett inn kvadraturpunktene i integranden, multipliser med vektene og summer.
4. Husk Jacobianen når du bytter fra fysiske koordinater til referansekoordinater i et integral.

### Eksempel
Bruk 2-punkts Gauss-kvadratur ($\\xi=\\pm1/\\sqrt3$, vekt 1 hver) til å beregne $\\int_{-1}^{1}(2\\xi^2+3)\\,d\\xi$.
1. $f(1/\\sqrt3) = 2\\cdot(1/3)+3 = 3{,}667$, og $f(-1/\\sqrt3)$ blir det samme siden $\\xi^2$ er likt.
2. Summen: $1\\cdot3{,}667+1\\cdot3{,}667 = 7{,}333$.
3. Kontroll: eksakt verdi er $\\int_{-1}^1(2\\xi^2+3)d\\xi = 4/3+6 = 7{,}333$ – siden integranden har grad 2 ($\\le 3$), er 2-punkts Gauss eksakt.

## Vanlige feil
- Å blande sammen $\\xi$-konvensjonene $[0,1]$ (formfunksjoner) og $[-1,1]$ (Gauss-kvadratur) – sjekk alltid hvilket intervall oppgaven bruker.
- Å tro at flere Gauss-punkter alltid gir et «riktigere» svar enn nødvendig – for et polynom av lav grad er få punkter eksakt.
- Å glemme Jacobianen ved integrasjon over referanseelementet.
- Å tro naturlige og essensielle randbetingelser behandles likt i svak form.

> Svak form senker deriverbarhetskravet ved delvis integrasjon; formfunksjonene interpolerer løsningen og summerer til 1, og Gauss-kvadratur med $n$ punkter er eksakt opp til grad $2n-1$.`,
en: `## What is it about?
To apply the finite element method to problems governed by differential equations (e.g. axial elasticity or heat conduction), we recast the "strong form" (the differential equation itself, which requires the solution to be smooth enough to differentiate twice) into a "weak form" by multiplying by a test function and integrating by parts. This lowers the smoothness requirement and is exactly what makes it possible to use simple, piecewise-linear shape functions within each element.

## Concepts and formulas
- Shape functions $N_i(\\xi)$ interpolate the solution inside the element from the nodal values: $u(\\xi) = \\sum_i N_i(\\xi)u_i$. For a linear element on $\\xi\\in[0,1]$: $N_1 = 1-\\xi$, $N_2 = \\xi$.
- The shape functions satisfy the Kronecker delta property $N_i(\\xi_j) = \\delta_{ij}$ (1 at their own node, 0 at the others) and form a partition of unity ($\\sum_i N_i = 1$ everywhere), so the element can reproduce a constant (rigid-body) displacement exactly.
- Galerkin's method chooses the test functions from the same space as the shape functions – standard FEM is therefore Bubnov–Galerkin.
- Essential (Dirichlet) boundary conditions are imposed directly on the unknowns (e.g. $u=0$); natural (Neumann) boundary conditions (force, flux) enter automatically through the boundary term produced by integration by parts.
- Isoparametric elements use the same shape functions to describe both geometry and displacement. The mapping from a reference element (e.g. $\\xi\\in[-1,1]$) to the physical element is governed by the Jacobian $J = dx/d\\xi$, which scales integrals between the two.
- Gauss quadrature evaluates integrals numerically with only a few points: $n$ points integrate polynomials exactly up to degree $2n-1$. 2-point Gauss (at $\\xi=\\pm1/\\sqrt3$, weight 1 each) is therefore exact up to and including degree 3.

## How to solve the problems
1. Identify whether you need to interpolate a value ($u=\\sum N_iu_i$), evaluate a shape function at a point, or integrate numerically.
2. For interpolation: find the correct $\\xi$ (normalized position) and substitute into $N_1, N_2$.
3. For Gauss quadrature: substitute the quadrature points into the integrand, multiply by the weights and sum.
4. Remember the Jacobian when switching from physical coordinates to reference coordinates in an integral.

### Example
Use 2-point Gauss quadrature ($\\xi=\\pm1/\\sqrt3$, weight 1 each) to evaluate $\\int_{-1}^{1}(2\\xi^2+3)\\,d\\xi$.
1. $f(1/\\sqrt3) = 2\\cdot(1/3)+3 = 3.667$, and $f(-1/\\sqrt3)$ is the same since $\\xi^2$ is unchanged.
2. The sum: $1\\cdot3.667+1\\cdot3.667 = 7.333$.
3. Check: the exact value is $\\int_{-1}^1(2\\xi^2+3)d\\xi = 4/3+6 = 7.333$ – since the integrand has degree 2 ($\\le 3$), 2-point Gauss is exact.

## Common mistakes
- Mixing up the $\\xi$ conventions $[0,1]$ (shape functions) and $[-1,1]$ (Gauss quadrature) – always check which interval the problem uses.
- Assuming more Gauss points always give a "more correct" answer than needed – for a low-degree polynomial, few points are exact.
- Forgetting the Jacobian when integrating over the reference element.
- Assuming natural and essential boundary conditions are treated the same way in the weak form.

> The weak form lowers the smoothness requirement via integration by parts; the shape functions interpolate the solution and sum to 1, and Gauss quadrature with $n$ points is exact up to degree $2n-1$.`
});

BIQ("FEM", 1, [
 ["Hva representerer Jacobi-determinanten $J$ ved isoparametrisk avbildning fra referanseelementet til det fysiske elementet?",
  ["Forholdet mellom lengde (areal/volum) i det fysiske elementet og i referanseelementet", "Stivheten til elementet", "Antall noder i elementet", "Feilen i løsningen"],
  "$J = dx/d\\xi$ skalerer et lite intervall $d\\xi$ i referanseelementet til det tilsvarende fysiske intervallet $dx$, og brukes til å bytte variabel i integraler.",
  "What does the Jacobian determinant $J$ represent in the isoparametric mapping from the reference element to the physical element?",
  ["The ratio of length (area/volume) in the physical element to that in the reference element", "The stiffness of the element", "The number of nodes in the element", "The error in the solution"],
  "$J = dx/d\\xi$ scales a small interval $d\\xi$ in the reference element to the corresponding physical interval $dx$, and is used to change variables in integrals."],
 ["I den svake formen til $-\\dfrac{d}{dx}\\left(EA\\dfrac{du}{dx}\\right) = q$ oppstår et randledd etter delvis integrasjon. Hva representerer dette randleddet fysisk?",
  ["Den pålagte kraften/fluksen (naturlig randbetingelse) i endepunktene", "Feilen i formfunksjonen", "Massen til elementet", "Feilen i Gauss-kvadraturen"],
  "Delvis integrasjon flytter én derivasjon over på testfunksjonen og etterlater et randledd som nettopp er den naturlige randbetingelsen (kraft eller fluks).",
  "In the weak form of $-\\dfrac{d}{dx}\\left(EA\\dfrac{du}{dx}\\right) = q$, a boundary term appears after integration by parts. What does this boundary term physically represent?",
  ["The applied force/flux (natural boundary condition) at the endpoints", "The error in the shape function", "The mass of the element", "The error in the Gauss quadrature"],
  "Integration by parts moves one derivative onto the test function and leaves a boundary term that is exactly the natural boundary condition (force or flux)."],
 ["Hva gir 2-punkts Gauss-kvadratur ($\\xi=\\pm1/\\sqrt3$, vekt 1 hver) for $\\int_{-1}^{1}(3\\xi^2+2\\xi+5)\\,d\\xi$?",
  { n: 12, tol: 0.01, u: "" },
  "$f(1/\\sqrt3)+f(-1/\\sqrt3) = (3\\cdot\\tfrac13+\\tfrac{2}{\\sqrt3}+5)+(3\\cdot\\tfrac13-\\tfrac{2}{\\sqrt3}+5) = 12$. Dette er eksakt siden integranden har grad 2 ($\\le 3$).",
  "What does 2-point Gauss quadrature ($\\xi=\\pm1/\\sqrt3$, weight 1 each) give for $\\int_{-1}^{1}(3\\xi^2+2\\xi+5)\\,d\\xi$?",
  null,
  "$f(1/\\sqrt3)+f(-1/\\sqrt3) = (3\\cdot\\tfrac13+\\tfrac{2}{\\sqrt3}+5)+(3\\cdot\\tfrac13-\\tfrac{2}{\\sqrt3}+5) = 12$. This is exact since the integrand has degree 2 ($\\le 3$)."]
]);

GEN("FEM", 1,
 // enkel: Jacobianen til et lineært element på [0,1]
 () => { const xa = R.i(-5, 10), L = R.p([1, 2, 3, 4, 5, 6, 8, 10]), xb = xa + L;
   return [T(`Et lineært element strekker seg fra $x_a=${xa}$ til $x_b=${xb}$ (kartlagt til $\\xi\\in[0,1]$ ved $x=x_a+\\xi(x_b-x_a)$). Hva er Jacobianen $dx/d\\xi$?`,
             `A linear element runs from $x_a=${xa}$ to $x_b=${xb}$ (mapped to $\\xi\\in[0,1]$ via $x=x_a+\\xi(x_b-x_a)$). What is the Jacobian $dx/d\\xi$?`),
     { n: L, tol: 0, u: "" },
     T(`$dx/d\\xi = x_b-x_a = ${xb}-(${xa}) = ${L}$.`, `$dx/d\\xi = x_b-x_a = ${xb}-(${xa}) = ${L}$.`)]; },
 // eksamen: ekvivalent nodekraft fra jevnt fordelt last via Jacobian og formfunksjon
 () => { const q = R.p([2, 4, 5, 8, 10, 12, 15, 20]), L = R.p([200, 300, 400, 500, 600, 800, 1000]);
   const J = L / 2, f1 = q * J;
   return [T(`Et lineært element med lengde $L=${L}$ mm (kartlagt til referanseelementet $\\xi\\in[-1,1]$, med $N_1=(1-\\xi)/2$) belastes med en jevnt fordelt aksiallast $q=${q}$ N/mm. Hva er den ekvivalente nodekraften $f_1$ i node 1, $f_1=\\displaystyle\\int_{-1}^{1} qN_1(\\xi)\\,J\\,d\\xi$?`,
             `A linear element of length $L=${L}$ mm (mapped to the reference element $\\xi\\in[-1,1]$, with $N_1=(1-\\xi)/2$) carries a uniformly distributed axial load $q=${q}$ N/mm. What is the equivalent nodal force $f_1$ at node 1, $f_1=\\displaystyle\\int_{-1}^{1} qN_1(\\xi)\\,J\\,d\\xi$?`),
     { n: f1, tol: rel(f1, 0.01, 1), u: "N" },
     T(`Jacobianen er $J=L/2=${mf(J)}$ mm. Siden $\\int_{-1}^1 N_1\\,d\\xi=1$, blir $f_1=qJ = ${q}\\cdot ${mf(J)} \\approx ${mf(f1, 1)}$ N. (For konstant last fordeles den likt: $f_1=f_2=qL/2$.)`,
       `The Jacobian is $J=L/2=${mf(J)}$ mm. Since $\\int_{-1}^1 N_1\\,d\\xi=1$, we get $f_1=qJ = ${q}\\cdot ${mf(J)} \\approx ${mf(f1, 1)}$ N. (For a constant load, it splits evenly: $f_1=f_2=qL/2$.)`)]; }
);

// ================= FEM – enhet 2: Elementtyper, mesh og feil =================
THEORY("FEM", 2, {
nb: `## Hva handler det om?
Å velge riktig elementtype og lage en god mesh (nettverk av elementer) er avgjørende for om en FEM-analyse gir et nøyaktig og troverdig svar. Denne enheten handler om hvilke elementer som finnes, hvordan man forfiner en mesh, hvilke feilkilder som finnes, og hvordan man kontrollerer at en modell er riktig.

## Begreper og formler
- Elementtyper: CST (constant strain triangle, lineær trekant) gir konstant tøyning/spenning i hele elementet og krever fin mesh der spenningen varierer mye. Kvadratiske elementer (f.eks. LST) gir bedre nøyaktighet per element. Elementer har ulikt antall frihetsgrader per node avhengig av type (f.eks. 2 for 2D-stav, 3 for 2D-bjelke, 6 for 3D-bjelke).
- h-forfining: gjør elementene mindre (flere elementer). p-forfining: øker polynomgraden til formfunksjonene i eksisterende elementer. Begge gir konvergens mot den eksakte løsningen.
- Forskyvningene er kontinuerlige mellom elementer i vanlig forskyvningsbasert FEM, men spenningene er det ikke – de hopper ofte litt mellom elementer og glattes i etterbehandlingen.
- Feilen i forskyvning avtar typisk som $O(h^{p+1})$ når elementstørrelsen $h$ minker, for elementer av polynomgrad $p$. Halveres $h$, blir feilen $2^{p+1}$ ganger mindre.
- Skjærlåsing (shear locking): lineære elementer kan bli kunstig stive i bøyning. Løses med kvadratiske elementer eller redusert integrasjon.
- Ved skarpe innvendige hjørner er spenningen teoretisk uendelig (en singularitet); spenningen i modellen vokser da bare videre når meshen forfines, i stedet for å konvergere. Løsningen er å modellere en reell avrunding.
- En konvergensstudie forfiner meshen gradvis og sjekker om en interessestørrelse (f.eks. maks spenning) slutter å endre seg vesentlig – det er slik man vet meshen er fin nok.

## Slik løser du oppgavene
1. Identifiser hva slags feilkilde eller elementegenskap spørsmålet gjelder: elementtype, forfining, kontinuitet, eller singularitet.
2. For DOF-telling: multipliser antall noder med frihetsgrader per node for elementtypen.
3. For konvergens: bruk $O(h^{p+1})$ til å regne ut hvor mye mindre feilen blir når $h$ endres.
4. Husk at mesh bør være finest der spenningsgradientene er størst, ikke jevnt fordelt overalt.

### Eksempel
En modell med 3D-bjelkeelementer (6 frihetsgrader per node) har 25 noder. Feilen i forskyvning går som $O(h^2)$ (lineære elementer, $p=1$). Hvor mange frihetsgrader har modellen, og hvor mye mindre blir feilen hvis $h$ deles på 2?
1. Frihetsgrader: $25\\cdot 6 = 150$.
2. Feilfaktor: $2^{1+1} = 4$ ganger mindre feil.

## Vanlige feil
- Å tro spenningene er kontinuerlige mellom elementer slik forskyvningene er det.
- Å tro finere mesh alltid hjelper ved et skarpt hjørne – der er spenningen singulær og «konvergerer» aldri i modellen.
- Å glemme å multiplisere med frihetsgrader per node ved DOF-telling.
- Å forveksle h- og p-forfining.

> Finere mesh og høyere elementorden gir konvergens ($O(h^{p+1})$), unntatt ved singulariteter. Kontroller alltid resultatet med en konvergensstudie og en sjekk av reaksjonskrefter.`,
en: `## What is it about?
Choosing the right element type and building a good mesh (network of elements) is crucial for whether an FEM analysis gives an accurate and trustworthy answer. This unit covers what element types exist, how a mesh is refined, what sources of error exist, and how to check that a model is correct.

## Concepts and formulas
- Element types: CST (constant strain triangle, linear triangle) gives constant strain/stress throughout the element and needs a fine mesh where the stress varies a lot. Quadratic elements (e.g. LST) give better accuracy per element. Elements have different numbers of degrees of freedom per node depending on type (e.g. 2 for a 2D bar, 3 for a 2D beam, 6 for a 3D beam).
- h-refinement: makes the elements smaller (more elements). p-refinement: increases the polynomial degree of the shape functions in the existing elements. Both give convergence toward the exact solution.
- Displacements are continuous between elements in standard displacement-based FEM, but stresses are not – they often jump slightly between elements and are smoothed in post-processing.
- The displacement error typically decreases as $O(h^{p+1})$ as the element size $h$ shrinks, for elements of polynomial degree $p$. Halving $h$ makes the error $2^{p+1}$ times smaller.
- Shear locking: linear elements can become artificially stiff in bending. This is solved with quadratic elements or reduced integration.
- At sharp interior corners, the stress is theoretically infinite (a singularity); the stress in the model then just keeps growing as the mesh is refined, instead of converging. The fix is to model a real fillet radius.
- A mesh convergence study refines the mesh step by step and checks whether a quantity of interest (e.g. maximum stress) stops changing significantly – that is how you know the mesh is fine enough.

## How to solve the problems
1. Identify which error source or element property the question concerns: element type, refinement, continuity, or singularity.
2. For DOF counting: multiply the number of nodes by the degrees of freedom per node for the element type.
3. For convergence: use $O(h^{p+1})$ to compute how much smaller the error becomes when $h$ changes.
4. Remember that the mesh should be finest where the stress gradients are largest, not spread evenly everywhere.

### Example
A model with 3D beam elements (6 degrees of freedom per node) has 25 nodes. The displacement error scales as $O(h^2)$ (linear elements, $p=1$). How many degrees of freedom does the model have, and by what factor does the error shrink if $h$ is divided by 2?
1. Degrees of freedom: $25\\cdot 6 = 150$.
2. Error factor: $2^{1+1} = 4$ times smaller error.

## Common mistakes
- Assuming stresses are continuous between elements the way displacements are.
- Assuming a finer mesh always helps at a sharp corner – there the stress is singular and never "converges" in the model.
- Forgetting to multiply by the degrees of freedom per node when counting DOFs.
- Confusing h- and p-refinement.

> A finer mesh and a higher element order give convergence ($O(h^{p+1})$), except at singularities. Always check the result with a convergence study and a check of the reaction forces.`
});

BIQ("FEM", 2, [
 ["Hvor mange frihetsgrader har hver node i et vanlig 2D-bjelke-/rammeelement (planar frame element)?",
  ["3 (to forskyvninger og én rotasjon i planet)", "2 (bare forskyvninger)", "6 (som i 3D)", "1 (bare rotasjon)"],
  "I planet trenger man $u$, $v$ og rotasjonen $\\theta$ i hver node, altså 3 frihetsgrader per node.",
  "How many degrees of freedom does each node have in a standard 2D beam/frame element (planar frame element)?",
  ["3 (two displacements and one in-plane rotation)", "2 (displacements only)", "6 (as in 3D)", "1 (rotation only)"],
  "In the plane you need $u$, $v$ and the rotation $\\theta$ at each node, i.e. 3 degrees of freedom per node."],
 ["Hva er en konvergensstudie (mesh convergence study), og hvorfor gjør man den?",
  ["Man forfiner meshen gradvis og sjekker om resultatet (f.eks. maks spenning) slutter å endre seg vesentlig", "Man kjører analysen bare én gang med finest mulig mesh for å spare tid", "Man sjekker at fargene i post-prosesseringen ser fine ut", "Man bruker alltid samme mesh som i et tidligere, urelatert prosjekt"],
  "En konvergensstudie viser om løsningen er tilstrekkelig uavhengig av mesh-tettheten, og er den viktigste kontrollen av at en FEM-modell er til å stole på.",
  "What is a mesh convergence study, and why is it done?",
  ["The mesh is refined step by step and you check whether the result (e.g. maximum stress) stops changing significantly", "You run the analysis only once with the finest possible mesh to save time", "You check that the colours in post-processing look nice", "You always reuse the mesh from an earlier, unrelated project"],
  "A convergence study shows whether the solution is sufficiently independent of the mesh density, and is the most important check that an FEM model can be trusted."],
 ["En rektangulær plate meshes med et regulært rutenett av $6\\times4$ firenode kvadrilaterale elementer (plan spenningstilstand, 2 frihetsgrader per node). Hvor mange totale frihetsgrader har modellen før randbetingelsene settes inn?",
  { n: 70, tol: 0, u: "" },
  "Rutenettet gir $(6+1)(4+1)=35$ noder. Med 2 frihetsgrader per node blir det $35\\cdot2=70$.",
  "A rectangular plate is meshed with a regular grid of $6\\times4$ four-node quadrilateral elements (plane stress, 2 degrees of freedom per node). How many total degrees of freedom does the model have before boundary conditions are applied?",
  null,
  "The grid gives $(6+1)(4+1)=35$ nodes. With 2 degrees of freedom per node, that is $35\\cdot2=70$."]
]);

GEN("FEM", 2,
 // enkel: antall CST-trekanter fra et rutenett
 () => { const m = R.i(2, 12), n = R.i(2, 10); const tri = 2 * m * n;
   return [T(`Et rektangulært område deles inn i et rutenett med ${m}×${n} firkantceller, og hver celle splittes i to CST-trekanter. Hvor mange trekantelementer blir det totalt?`,
             `A rectangular domain is divided into a grid of ${m}×${n} quadrilateral cells, and each cell is split into two CST triangles. How many triangular elements are there in total?`),
     { n: tri, tol: 0, u: "" },
     T(`Hver av de $${m}\\cdot ${n}=${m * n}$ cellene gir 2 trekanter: $2\\cdot ${m * n}=${tri}$.`, `Each of the $${m}\\cdot ${n}=${m * n}$ cells gives 2 triangles: $2\\cdot ${m * n}=${tri}$.`)]; },
 // eksamen: ekstrapoler ny maks-spenning fra en konvergensstudie
 () => { const sigExact = R.p([80, 100, 120, 150, 180, 200, 250]), eh = R.p([8, 12, 16, 20, 24, 28, 32]);
   const sigH = sigExact - eh, sigH2 = sigExact - eh / 4;
   return [T(`En konvergensstudie med lineære elementer ($p=1$, feil $\\sim O(h^2)$) gir maks spenning $\\sigma_h=${sigH}$ MPa for elementstørrelse $h$. Den eksakte (konvergerte) verdien er $\\sigma_{eksakt}=${sigExact}$ MPa. Hvis du halverer elementstørrelsen, hva forventer du at den nye maks-spenningen blir?`,
             `A convergence study with linear elements ($p=1$, error $\\sim O(h^2)$) gives a maximum stress of $\\sigma_h=${sigH}$ MPa for element size $h$. The exact (converged) value is $\\sigma_{exact}=${sigExact}$ MPa. If you halve the element size, what do you expect the new maximum stress to be?`),
     { n: sigH2, tol: rel(sigH2, 0.01, 0.5), u: "MPa" },
     T(`Feilen ved $h$ er $e_h=\\sigma_{eksakt}-\\sigma_h=${sigExact}-${sigH}=${eh}$ MPa. Halvering av $h$ reduserer feilen med en faktor $2^{p+1}=4$: $e_{h/2}=${eh}/4=${mf(eh / 4)}$ MPa. Ny spenning: $\\sigma_{h/2}=\\sigma_{eksakt}-e_{h/2}=${sigExact}-${mf(eh / 4)} \\approx ${mf(sigH2, 1)}$ MPa.`,
       `The error at $h$ is $e_h=\\sigma_{exact}-\\sigma_h=${sigExact}-${sigH}=${eh}$ MPa. Halving $h$ reduces the error by a factor of $2^{p+1}=4$: $e_{h/2}=${eh}/4=${mf(eh / 4)}$ MPa. New stress: $\\sigma_{h/2}=\\sigma_{exact}-e_{h/2}=${sigExact}-${mf(eh / 4)} \\approx ${mf(sigH2, 1)}$ MPa.`)]; }
);

// __SLUTT__
})();
