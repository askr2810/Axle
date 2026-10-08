// ============================================================
//  add_zdeep_fem.js – Elementmetoden fra grunnen: stavproblemet (sterk form, energi), Gateaux-deriverte,
//  svak form B(u,v) = F(v), Galerkin, masterelementet ξ ∈ [−1, 1] med Jacobian, elementmatriser B^e og F^e,
//  kvadratiske elementer, Gauss-kvadratur og feil/konvergens. Notasjonen følger et vanlig formelark:
//  ε = u', σ = Eε, N = EAu', Π(u) = ½∫EA(u')² − ∫F_x u − Pu(L), δΠ(u, v), B^e_ij = ∫EA φ_i' φ_j', F^e_i = ∫F_x φ_i.
//  Strengene er String.raw, så LaTeX skrives med enkel backslash.
// ============================================================
(() => {
const S_ = String.raw;

// ================= Enhet 0: stavproblemet, energi og assemblering =================
DEEP("FEM", "Stavelementer og stivhetsmatriser",
S_`## Stavproblemet: hva vi egentlig løser
Tenk på staven som en lang fjær. Den er festet i venstre ende ($x = 0$), blir dratt i av en last som er fordelt langs hele lengden ($F_x$, i N/m – for eksempel egenvekt) og av en punktlast $P$ i høyre ende ($x = L$). Spørsmålet er: **hvor mye flytter hvert punkt seg?** Svaret er forskyvningsfeltet $u(x)$.

Tre enkle sammenhenger gir hele teorien:
1. **Kinematikk** – tøyningen er hvor fort forskyvningen endrer seg langs staven: $\varepsilon = u'(x)$.
2. **Materiale (Hookes lov)** – spenningen er proporsjonal med tøyningen: $\sigma = E\varepsilon$.
3. **Likevekt** – se på en liten bit $dx$: normalkraften på hver side og lasten $F_x\,dx$ må gå i null, $N(x+dx) - N(x) + F_x\,dx = 0$, altså $N' + F_x = 0$.

Setter vi sammen 1 og 2, får vi normalkraften $N = \sigma A = EA\,u'$. Inn i 3 gir det differensialligningen for staven.

### Sterk form
$$-(EA\,u')' = F_x \qquad \text{for } 0 < x < L$$
med randbetingelsene
- $u(0) = 0$ – staven er fast. Dette er en **essensiell** randbetingelse: den sier noe om $u$ selv.
- $EA\,u'(L) = P$ – kraften i enden. Dette er en **naturlig** randbetingelse: den sier noe om $u'$, altså om kraften.

Med konstant $EA$, jevn last $F_x = q$ og punktlast $P$ kan vi løse direkte:
$$u(x) = \frac{1}{EA}\Big((P + qL)\,x - \tfrac12 q x^2\Big)$$
$$N(x) = EA\,u'(x) = P + q\,(L - x)$$
Normalkraften er størst ved innfestingen, der hele lasten $P + qL$ må tas opp.

### Total potensiell energi
Elementmetoden bygger ikke direkte på differensialligningen, men på **energi**. Staven «velger» den forskyvningen som gjør den totale potensielle energien minst:
$$\Pi(u) = \frac12\int_0^L EA\,(u')^2\,dx \;-\; \int_0^L F_x\,u\,dx \;-\; P\,u(L)$$
- Første ledd er **tøyningsenergien** som lagres i staven (som $\tfrac12 k\delta^2$ i en fjær).
- De to siste leddene er **potensialet til lastene**: en last mister potensiell energi når den flytter seg i sin egen retning.

Med **$L^2$-indreproduktet** $(f, g) = \int_0^L f\,g\,dx$ blir det kortere: $\Pi(u) = \tfrac12\,(EA\,u', u') - (F_x, u) - P\,u(L)$.

**Prinsippet om minimum potensiell energi:** av alle forskyvninger som oppfyller $u(0) = 0$, er den riktige den som gir minst $\Pi$. Hvordan vi finner minimum av en slik «funksjon av en funksjon», står i enheten om svak form (Gateaux-deriverte).

## Fra kontinuerlig stav til fjærer
Del staven i elementer med lengde $h$. Inne i hvert element lar vi $u$ variere **lineært** mellom de to nodeverdiene. Da er tøyningen konstant, $\varepsilon = (u_2 - u_1)/h$, og normalkraften er $N = \frac{EA}{h}(u_2 - u_1)$. Hvert element oppfører seg altså som en fjær med stivhet $EA/h$:
$$B^e = \frac{EA}{h}\begin{pmatrix}1 & -1\\ -1 & 1\end{pmatrix}, \qquad F^e = \frac{q\,h}{2}\begin{pmatrix}1\\ 1\end{pmatrix}$$
Lastvektoren sier at en jevn last $q$ på elementet fordeles likt på de to nodene. Begge kommer ut av integralene $B^e_{ij} = \int EA\,\varphi_i'\varphi_j'\,dx$ og $F^e_i = \int F_x\,\varphi_i\,dx$ (se svak form).

![sim:fembar]

### Assemblering steg for steg
1. Nummerer nodene $0, 1, \dots, M$ og elementene $1, \dots, M$. Element $e$ kobler node $e-1$ og $e$. En **elementtabell** sier hvilke globale noder hvert element bruker.
2. Start med en global matrise $K$ og en lastvektor $\vec f$ fulle av nuller.
3. For hvert element: legg de fire tallene i $B^e$ inn på radene og kolonnene til elementets to noder, og legg $F^e$ inn i de samme radene i $\vec f$. Der to elementer deler en node, **summeres** bidragene.
4. Legg punktlaster rett inn i $\vec f$ (her $P$ i siste node).
5. Sett inn randbetingelsen $u_0 = 0$: stryk rad og kolonne 0. Først nå er $K$ ikke-singulær.
6. Løs $K\vec u = \vec f$. Regn ut normalkraften i hvert element, $N_e = \frac{EA}{h}(u_e - u_{e-1})$, og reaksjonen fra raden du strøk.

### Eksempel – to elementer, jevn last og punktlast
En stav med $EA = 2000$ kN og $L = 2$ m er fast i $x = 0$. Den har jevn last $q = 10$ kN/m og punktlast $P = 20$ kN i enden. Vi bruker to elementer med $h = 1$ m.
1. Hvert element: $EA/h = 2000$ kN/m og $F^e = \frac{10\cdot 1}{2}(1, 1) = (5, 5)$ kN.
2. Global (noder 0, 1, 2): $K = \begin{pmatrix}2000 & -2000 & 0\\ -2000 & 4000 & -2000\\ 0 & -2000 & 2000\end{pmatrix}$ og $\vec f = (5,\ 10,\ 25)$. Node 1 får last fra begge elementene ($5 + 5$), node 2 får $5$ pluss punktlasten $20$.
3. Stryk node 0: $\begin{pmatrix}4000 & -2000\\ -2000 & 2000\end{pmatrix}\begin{pmatrix}u_1\\ u_2\end{pmatrix} = \begin{pmatrix}10\\ 25\end{pmatrix}$.
4. Andre rad gir $u_2 = u_1 + 0{,}0125$. Inn i første rad: $2000\,u_1 - 25 = 10$, så $u_1 = 0{,}0175$ m og $u_2 = 0{,}0300$ m.
5. Normalkrefter: $N_1 = 2000\cdot 0{,}0175 = 35$ kN og $N_2 = 2000\cdot 0{,}0125 = 25$ kN. Reaksjonen: rad 0 gir $-2000\,u_1 = 5 + R$, så $R = -40$ kN – akkurat hele lasten $qL + P = 40$ kN, motsatt rettet.
6. Kontroll mot den eksakte løsningen: $u(1) = \frac{40 - 5}{2000} = 0{,}0175$ og $u(2) = \frac{80 - 20}{2000} = 0{,}03$. Nodeverdiene er **eksakte**, og elementkreftene $35$ og $25$ kN er lik den eksakte $N(x) = 40 - 10x$ midt i hvert element.

> For en 1D-stav med konstant $EA$, lineære elementer og riktig (konsistent) lastvektor blir nodeforskyvningene eksakte. Mellom nodene er $u^h$ en rett linje, og normalkraften er konstant i hvert element – lik gjennomsnittet av den eksakte normalkraften over elementet.`,
S_`## The bar problem: what we are actually solving
Think of the bar as a long spring. It is fixed at the left end ($x = 0$), pulled by a load distributed along its whole length ($F_x$, in N/m – for example self-weight) and by a point load $P$ at the right end ($x = L$). The question is: **how far does each point move?** The answer is the displacement field $u(x)$.

Three simple relations give the whole theory:
1. **Kinematics** – the strain is how fast the displacement changes along the bar: $\varepsilon = u'(x)$.
2. **Material (Hooke's law)** – the stress is proportional to the strain: $\sigma = E\varepsilon$.
3. **Equilibrium** – look at a small piece $dx$: the normal force on each side and the load $F_x\,dx$ must cancel, $N(x+dx) - N(x) + F_x\,dx = 0$, so $N' + F_x = 0$.

Combining 1 and 2 gives the normal force $N = \sigma A = EA\,u'$. Inserting into 3 gives the differential equation of the bar.

### Strong form
$$-(EA\,u')' = F_x \qquad \text{for } 0 < x < L$$
with the boundary conditions
- $u(0) = 0$ – the bar is fixed. This is an **essential** boundary condition: it says something about $u$ itself.
- $EA\,u'(L) = P$ – the force at the end. This is a **natural** boundary condition: it says something about $u'$, i.e. about the force.

With constant $EA$, a uniform load $F_x = q$ and a point load $P$ we can solve directly:
$$u(x) = \frac{1}{EA}\Big((P + qL)\,x - \tfrac12 q x^2\Big)$$
$$N(x) = EA\,u'(x) = P + q\,(L - x)$$
The normal force is largest at the support, where the whole load $P + qL$ must be carried.

### Total potential energy
The finite element method is not built directly on the differential equation but on **energy**. The bar "chooses" the displacement that makes the total potential energy smallest:
$$\Pi(u) = \frac12\int_0^L EA\,(u')^2\,dx \;-\; \int_0^L F_x\,u\,dx \;-\; P\,u(L)$$
- The first term is the **strain energy** stored in the bar (like $\tfrac12 k\delta^2$ in a spring).
- The last two terms are the **potential of the loads**: a load loses potential energy when it moves in its own direction.

With the **$L^2$ inner product** $(f, g) = \int_0^L f\,g\,dx$ it gets shorter: $\Pi(u) = \tfrac12\,(EA\,u', u') - (F_x, u) - P\,u(L)$.

**The principle of minimum potential energy:** of all displacements satisfying $u(0) = 0$, the correct one gives the smallest $\Pi$. How to find the minimum of such a "function of a function" is in the unit on the weak form (Gateaux derivative).

## From a continuous bar to springs
Split the bar into elements of length $h$. Inside each element we let $u$ vary **linearly** between the two nodal values. Then the strain is constant, $\varepsilon = (u_2 - u_1)/h$, and the normal force is $N = \frac{EA}{h}(u_2 - u_1)$. Each element behaves like a spring with stiffness $EA/h$:
$$B^e = \frac{EA}{h}\begin{pmatrix}1 & -1\\ -1 & 1\end{pmatrix}, \qquad F^e = \frac{q\,h}{2}\begin{pmatrix}1\\ 1\end{pmatrix}$$
The load vector says that a uniform load $q$ on the element is shared equally between the two nodes. Both come from the integrals $B^e_{ij} = \int EA\,\varphi_i'\varphi_j'\,dx$ and $F^e_i = \int F_x\,\varphi_i\,dx$ (see the weak form).

![sim:fembar]

### Assembly step by step
1. Number the nodes $0, 1, \dots, M$ and the elements $1, \dots, M$. Element $e$ connects nodes $e-1$ and $e$. An **element table** says which global nodes each element uses.
2. Start with a global matrix $K$ and a load vector $\vec f$ full of zeros.
3. For each element: add the four numbers of $B^e$ into the rows and columns of the element's two nodes, and add $F^e$ into the same rows of $\vec f$. Where two elements share a node, the contributions are **summed**.
4. Add point loads straight into $\vec f$ (here $P$ at the last node).
5. Impose the boundary condition $u_0 = 0$: delete row and column 0. Only now is $K$ non-singular.
6. Solve $K\vec u = \vec f$. Compute the normal force in each element, $N_e = \frac{EA}{h}(u_e - u_{e-1})$, and the reaction from the row you deleted.

### Example – two elements, uniform load and point load
A bar with $EA = 2000$ kN and $L = 2$ m is fixed at $x = 0$. It carries a uniform load $q = 10$ kN/m and a point load $P = 20$ kN at the end. We use two elements with $h = 1$ m.
1. Each element: $EA/h = 2000$ kN/m and $F^e = \frac{10\cdot 1}{2}(1, 1) = (5, 5)$ kN.
2. Global (nodes 0, 1, 2): $K = \begin{pmatrix}2000 & -2000 & 0\\ -2000 & 4000 & -2000\\ 0 & -2000 & 2000\end{pmatrix}$ and $\vec f = (5,\ 10,\ 25)$. Node 1 gets load from both elements ($5 + 5$), node 2 gets $5$ plus the point load $20$.
3. Delete node 0: $\begin{pmatrix}4000 & -2000\\ -2000 & 2000\end{pmatrix}\begin{pmatrix}u_1\\ u_2\end{pmatrix} = \begin{pmatrix}10\\ 25\end{pmatrix}$.
4. The second row gives $u_2 = u_1 + 0.0125$. Into the first row: $2000\,u_1 - 25 = 10$, so $u_1 = 0.0175$ m and $u_2 = 0.0300$ m.
5. Normal forces: $N_1 = 2000\cdot 0.0175 = 35$ kN and $N_2 = 2000\cdot 0.0125 = 25$ kN. The reaction: row 0 gives $-2000\,u_1 = 5 + R$, so $R = -40$ kN – exactly the whole load $qL + P = 40$ kN, in the opposite direction.
6. Check against the exact solution: $u(1) = \frac{40 - 5}{2000} = 0.0175$ and $u(2) = \frac{80 - 20}{2000} = 0.03$. The nodal values are **exact**, and the element forces $35$ and $25$ kN equal the exact $N(x) = 40 - 10x$ at the middle of each element.

> For a 1D bar with constant $EA$, linear elements and the correct (consistent) load vector, the nodal displacements are exact. Between the nodes $u^h$ is a straight line, and the normal force is constant in each element – equal to the average of the exact normal force over the element.`);

// ================= Enhet 1: Gateaux-deriverte, svak form, Galerkin og masterelementet =================
DEEP("FEM", "Svak form og formfunksjoner",
S_`## Gateaux-deriverte: når energien er en funksjon av en funksjon
Fra matematikken kjenner du den deriverte: $f'(x) = \lim_{\theta\to 0}\frac{f(x+\theta) - f(x)}{\theta}$, og minimum finner du der $f'(x) = 0$.

Energien $\Pi(u)$ tar inn en hel **funksjon** $u(x)$, ikke et tall. Vi kan likevel spørre: *hvor mye endrer $\Pi$ seg hvis vi dytter forskyvningen litt i en retning $v(x)$?* Det er **Gateaux-deriverte** (retningsderivert):
$$\delta\Pi(u, v) = \lim_{\theta\to 0}\frac{\Pi(u + \theta v) - \Pi(u)}{\theta} = \frac{d}{d\theta}\,\Pi(u + \theta v)\Big|_{\theta = 0}$$
Her er $u$ «punktet» vi står i, $v$ er retningen (en **variasjon** eller **testfunksjon**) og $\theta$ er et lite tall. Retningen må oppfylle $v(0) = 0$, ellers dytter vi staven løs fra innfestingen.

### Regnet ut for staven
Sett $u + \theta v$ inn i $\Pi$:
$$\Pi(u + \theta v) = \frac12\int_0^L EA\,(u' + \theta v')^2\,dx - \int_0^L F_x\,(u + \theta v)\,dx - P\,\big(u(L) + \theta\,v(L)\big)$$
Gang ut kvadratet, $(u' + \theta v')^2 = (u')^2 + 2\theta\,u'v' + \theta^2 (v')^2$, og samle etter potenser av $\theta$:
$$\Pi(u + \theta v) = \Pi(u) + \theta\Big(\int_0^L EA\,u'v'\,dx - \int_0^L F_x\,v\,dx - P\,v(L)\Big) + \frac{\theta^2}{2}\int_0^L EA\,(v')^2\,dx$$
Trekk fra $\Pi(u)$, del på $\theta$ og la $\theta \to 0$. Det siste leddet forsvinner:
$$\delta\Pi(u, v) = \int_0^L EA\,u'v'\,dx - \int_0^L F_x\,v\,dx - P\,v(L)$$

### Minimum betyr null i alle retninger
I et minimum kan ingen liten endring senke energien. Derfor må $\delta\Pi(u, v) = 0$ **for alle** tillatte $v$. Det er den **svake formen**:
$$\text{Finn } u \text{ med } u(0) = 0 \text{ slik at } B(u, v) = F(v) \text{ for alle } v \text{ med } v(0) = 0$$
$$B(u, v) = \int_0^L EA\,u'v'\,dx, \qquad F(v) = \int_0^L F_x\,v\,dx + P\,v(L)$$
- $B$ er **bilineær** (lineær i hvert argument) og **symmetrisk**, $B(u, v) = B(v, u)$. $F$ er **lineær**.
- Energien kan skrives $\Pi(u) = \tfrac12 B(u, u) - F(u)$ – akkurat som $\tfrac12 k u^2 - F u$ for en fjær, der minimum gir $k u = F$.
- Det er virkelig et minimum: når $u$ løser den svake formen, viser utregningen over at $\Pi(u + \theta v) - \Pi(u) = \tfrac{\theta^2}{2}B(v, v) > 0$ for alle $v \neq 0$.

### Fra sterk til svak form – og tilbake
Samme resultat får du uten energi. Gang den sterke formen $-(EA\,u')' = F_x$ med en testfunksjon $v$, integrer over staven og **delvis integrer** venstre side:
$$\int_0^L EA\,u'v'\,dx - \Big[EA\,u'\,v\Big]_0^L = \int_0^L F_x\,v\,dx$$
Randleddet: i $x = 0$ er $v(0) = 0$, og i $x = L$ er $EA\,u'(L) = P$. Det gir $B(u, v) = F(v)$ – den samme svake formen.

Veien tilbake viser hvorfor den naturlige randbetingelsen «kommer gratis». Delvis integrerer vi baklengs, får vi
$$\int_0^L\big(-(EA\,u')' - F_x\big)\,v\,dx + \big(EA\,u'(L) - P\big)\,v(L) = 0 \quad \text{for alle } v$$
Begge parentesene må da være null: differensialligningen **og** kraftbetingelsen i enden. Den essensielle betingelsen $u(0) = 0$ må derimot bygges inn i funksjonsrommet.
- Svak form krever bare at $u'$ kan kvadreres og integreres (rommet $H^1$), ikke at $u''$ finnes. Derfor kan vi bruke stykkevis lineære funksjoner med knekk i nodene.

## Galerkins metode
Vi kan ikke prøve alle funksjoner, så vi velger et **endelig** utvalg: basisfunksjoner $\psi_1, \dots, \psi_n$ med $\psi_j(0) = 0$, og søker
$$u^h(x) = \sum_{j=1}^{n} u_j\,\psi_j(x)$$
**Galerkin:** bruk de samme funksjonene som testfunksjoner, $v = \psi_i$ for $i = 1, \dots, n$. Inn i den svake formen:
$$\sum_{j=1}^{n} B(\psi_j, \psi_i)\,u_j = F(\psi_i) \quad\Longleftrightarrow\quad K\vec u = \vec f, \qquad K_{ij} = B(\psi_i, \psi_j),\quad f_i = F(\psi_i)$$
- Med **hattefunksjoner** (1 i sin egen node, 0 i alle andre, lineær imellom) er $u_j$ akkurat forskyvningen i node $j$.
- To hattefunksjoner overlapper bare når nodene er naboer, så $K$ blir **tridiagonal** – billig å løse selv med millioner av ukjente.
- $K$ er symmetrisk fordi $B$ er symmetrisk, og positivt definit fordi $B(v, v) > 0$ for alle $v \neq 0$.

## Masterelementet og Jacobianen
I stedet for å integrere over hvert fysiske element $[x_1, x_2]$ med lengde $h$, regner vi alt på ett **masterelement** $\xi \in [-1, 1]$ og avbilder. Lineære formfunksjoner på masterelementet:
$$\varphi_1(\xi) = \frac{1 - \xi}{2}, \qquad \varphi_2(\xi) = \frac{1 + \xi}{2}$$
Avbildningen bruker de samme funksjonene (**isoparametrisk**):
$$x(\xi) = x_1\,\varphi_1(\xi) + x_2\,\varphi_2(\xi), \qquad J = \frac{dx}{d\xi} = \frac{x_2 - x_1}{2} = \frac{h}{2}$$
To regler gjør resten:
- **Integraler:** $dx = J\,d\xi$, så $\int_{x_1}^{x_2} g\,dx = \int_{-1}^{1} g\big(x(\xi)\big)\,J\,d\xi$.
- **Deriverte:** kjerneregelen gir $\frac{d\varphi}{dx} = \frac{1}{J}\,\frac{d\varphi}{d\xi}$. For lineære elementer er $\frac{d\varphi_1}{dx} = -\frac1h$ og $\frac{d\varphi_2}{dx} = \frac1h$.

### Elementmatrisen $B^e$
$$B^e_{ij} = \int_{x_1}^{x_2} EA\,\frac{d\varphi_i}{dx}\,\frac{d\varphi_j}{dx}\,dx = \int_{-1}^{1} EA\,\frac{d\varphi_i}{d\xi}\,\frac{d\varphi_j}{d\xi}\,\frac{1}{J^2}\,J\,d\xi$$
Med konstant $EA$ og $\frac{d\varphi_1}{d\xi} = -\frac12$, $\frac{d\varphi_2}{d\xi} = \frac12$ blir $B^e_{11} = EA\cdot\frac14\cdot\frac1J\cdot 2 = \frac{EA}{h}$, og tilsvarende for de andre:
$$B^e = \frac{EA}{h}\begin{pmatrix}1 & -1\\ -1 & 1\end{pmatrix}$$

### Elementvektoren $F^e$
$$F^e_i = \int_{x_1}^{x_2} F_x\,\varphi_i\,dx = \int_{-1}^{1} F_x\big(x(\xi)\big)\,\varphi_i(\xi)\,J\,d\xi$$
- Jevn last $F_x = q$: $\int_{-1}^{1}\varphi_i\,d\xi = 1$, så $F^e = \frac{q h}{2}(1, 1)$.
- Last som varierer lineært fra $q_1$ til $q_2$ over elementet: $F^e = \frac{h}{6}\big(2q_1 + q_2,\ q_1 + 2q_2\big)$ – den tyngste enden får mest.

### Kvadratiske elementer
Med tre noder ($\xi = -1, 0, 1$):
$$\varphi_1 = \frac{\xi(\xi - 1)}{2}, \qquad \varphi_2 = 1 - \xi^2, \qquad \varphi_3 = \frac{\xi(\xi + 1)}{2}$$
Samme oppskrift (husk $J = h/2$) gir
$$B^e = \frac{EA}{3h}\begin{pmatrix}7 & -8 & 1\\ -8 & 16 & -8\\ 1 & -8 & 7\end{pmatrix}, \qquad F^e = q\,h\begin{pmatrix}1/6\\ 2/3\\ 1/6\end{pmatrix}$$
Legg merke til at jevn last **ikke** fordeles likt: midtnoden får $2/3$ av lasten.

### Gauss-kvadratur på masterelementet
Når $EA$ eller $F_x$ varierer, regner vi integralene numerisk: $\int_{-1}^{1} g(\xi)\,d\xi \approx \sum_k w_k\,g(\xi_k)$.
- 1 punkt: $\xi = 0$, $w = 2$ – eksakt for polynomer av grad $\le 1$.
- 2 punkter: $\xi = \pm\frac{1}{\sqrt3}$, $w = 1$ – eksakt for grad $\le 3$.
- Generelt er $n$ punkter eksakte opp til grad $2n - 1$.

### Eksempel – Gateaux-deriverte av en enkel funksjonal
La $\Pi(u) = \int_0^1\big(\tfrac12 (u')^2 - u\big)\,dx$ med $u(0) = u(1) = 0$. Finn den svake og den sterke formen.
1. $\Pi(u + \theta v) = \Pi(u) + \theta\int_0^1 (u'v' - v)\,dx + \tfrac{\theta^2}{2}\int_0^1 (v')^2\,dx$.
2. Altså $\delta\Pi(u, v) = \int_0^1 (u'v' - v)\,dx$. Svak form: $\int_0^1 u'v'\,dx = \int_0^1 v\,dx$ for alle $v$ med $v(0) = v(1) = 0$.
3. Delvis integrasjon (randleddet er null fordi $v = 0$ i begge ender): $\int_0^1 (-u'' - 1)\,v\,dx = 0$ for alle $v$, så $-u'' = 1$.
4. Løsningen er $u = \tfrac12 x(1 - x)$. Kontroll: $u'' = -1$ og $u(0) = u(1) = 0$.`,
S_`## The Gateaux derivative: when the energy is a function of a function
From mathematics you know the derivative: $f'(x) = \lim_{\theta\to 0}\frac{f(x+\theta) - f(x)}{\theta}$, and you find a minimum where $f'(x) = 0$.

The energy $\Pi(u)$ takes a whole **function** $u(x)$, not a number. We can still ask: *how much does $\Pi$ change if we nudge the displacement a little in a direction $v(x)$?* That is the **Gateaux derivative** (directional derivative):
$$\delta\Pi(u, v) = \lim_{\theta\to 0}\frac{\Pi(u + \theta v) - \Pi(u)}{\theta} = \frac{d}{d\theta}\,\Pi(u + \theta v)\Big|_{\theta = 0}$$
Here $u$ is the "point" we stand at, $v$ is the direction (a **variation** or **test function**) and $\theta$ is a small number. The direction must satisfy $v(0) = 0$, otherwise we would push the bar off its support.

### Worked out for the bar
Insert $u + \theta v$ into $\Pi$:
$$\Pi(u + \theta v) = \frac12\int_0^L EA\,(u' + \theta v')^2\,dx - \int_0^L F_x\,(u + \theta v)\,dx - P\,\big(u(L) + \theta\,v(L)\big)$$
Expand the square, $(u' + \theta v')^2 = (u')^2 + 2\theta\,u'v' + \theta^2 (v')^2$, and collect powers of $\theta$:
$$\Pi(u + \theta v) = \Pi(u) + \theta\Big(\int_0^L EA\,u'v'\,dx - \int_0^L F_x\,v\,dx - P\,v(L)\Big) + \frac{\theta^2}{2}\int_0^L EA\,(v')^2\,dx$$
Subtract $\Pi(u)$, divide by $\theta$ and let $\theta \to 0$. The last term vanishes:
$$\delta\Pi(u, v) = \int_0^L EA\,u'v'\,dx - \int_0^L F_x\,v\,dx - P\,v(L)$$

### A minimum means zero in every direction
At a minimum no small change can lower the energy. So $\delta\Pi(u, v) = 0$ **for all** admissible $v$. That is the **weak form**:
$$\text{Find } u \text{ with } u(0) = 0 \text{ such that } B(u, v) = F(v) \text{ for all } v \text{ with } v(0) = 0$$
$$B(u, v) = \int_0^L EA\,u'v'\,dx, \qquad F(v) = \int_0^L F_x\,v\,dx + P\,v(L)$$
- $B$ is **bilinear** (linear in each argument) and **symmetric**, $B(u, v) = B(v, u)$. $F$ is **linear**.
- The energy can be written $\Pi(u) = \tfrac12 B(u, u) - F(u)$ – just like $\tfrac12 k u^2 - F u$ for a spring, whose minimum gives $k u = F$.
- It really is a minimum: when $u$ solves the weak form, the computation above shows $\Pi(u + \theta v) - \Pi(u) = \tfrac{\theta^2}{2}B(v, v) > 0$ for all $v \neq 0$.

### From strong to weak form – and back
You get the same result without energy. Multiply the strong form $-(EA\,u')' = F_x$ by a test function $v$, integrate over the bar and **integrate the left side by parts**:
$$\int_0^L EA\,u'v'\,dx - \Big[EA\,u'\,v\Big]_0^L = \int_0^L F_x\,v\,dx$$
The boundary term: at $x = 0$ we have $v(0) = 0$, and at $x = L$ we have $EA\,u'(L) = P$. This gives $B(u, v) = F(v)$ – the same weak form.

The way back shows why the natural boundary condition "comes for free". Integrating by parts backwards gives
$$\int_0^L\big(-(EA\,u')' - F_x\big)\,v\,dx + \big(EA\,u'(L) - P\big)\,v(L) = 0 \quad \text{for all } v$$
Both brackets must then be zero: the differential equation **and** the force condition at the end. The essential condition $u(0) = 0$, on the other hand, must be built into the function space.
- The weak form only needs $u'$ to be square integrable (the space $H^1$), not $u''$ to exist. That is why we can use piecewise linear functions with kinks at the nodes.

## Galerkin's method
We cannot try every function, so we pick a **finite** set: basis functions $\psi_1, \dots, \psi_n$ with $\psi_j(0) = 0$, and look for
$$u^h(x) = \sum_{j=1}^{n} u_j\,\psi_j(x)$$
**Galerkin:** use the same functions as test functions, $v = \psi_i$ for $i = 1, \dots, n$. Into the weak form:
$$\sum_{j=1}^{n} B(\psi_j, \psi_i)\,u_j = F(\psi_i) \quad\Longleftrightarrow\quad K\vec u = \vec f, \qquad K_{ij} = B(\psi_i, \psi_j),\quad f_i = F(\psi_i)$$
- With **hat functions** (1 at their own node, 0 at all others, linear in between) $u_j$ is exactly the displacement at node $j$.
- Two hat functions only overlap when their nodes are neighbours, so $K$ is **tridiagonal** – cheap to solve even with millions of unknowns.
- $K$ is symmetric because $B$ is symmetric, and positive definite because $B(v, v) > 0$ for all $v \neq 0$.

## The master element and the Jacobian
Instead of integrating over each physical element $[x_1, x_2]$ of length $h$, we do everything on one **master element** $\xi \in [-1, 1]$ and map. Linear shape functions on the master element:
$$\varphi_1(\xi) = \frac{1 - \xi}{2}, \qquad \varphi_2(\xi) = \frac{1 + \xi}{2}$$
The mapping uses the same functions (**isoparametric**):
$$x(\xi) = x_1\,\varphi_1(\xi) + x_2\,\varphi_2(\xi), \qquad J = \frac{dx}{d\xi} = \frac{x_2 - x_1}{2} = \frac{h}{2}$$
Two rules do the rest:
- **Integrals:** $dx = J\,d\xi$, so $\int_{x_1}^{x_2} g\,dx = \int_{-1}^{1} g\big(x(\xi)\big)\,J\,d\xi$.
- **Derivatives:** the chain rule gives $\frac{d\varphi}{dx} = \frac{1}{J}\,\frac{d\varphi}{d\xi}$. For linear elements $\frac{d\varphi_1}{dx} = -\frac1h$ and $\frac{d\varphi_2}{dx} = \frac1h$.

### The element matrix $B^e$
$$B^e_{ij} = \int_{x_1}^{x_2} EA\,\frac{d\varphi_i}{dx}\,\frac{d\varphi_j}{dx}\,dx = \int_{-1}^{1} EA\,\frac{d\varphi_i}{d\xi}\,\frac{d\varphi_j}{d\xi}\,\frac{1}{J^2}\,J\,d\xi$$
With constant $EA$ and $\frac{d\varphi_1}{d\xi} = -\frac12$, $\frac{d\varphi_2}{d\xi} = \frac12$ we get $B^e_{11} = EA\cdot\frac14\cdot\frac1J\cdot 2 = \frac{EA}{h}$, and likewise for the others:
$$B^e = \frac{EA}{h}\begin{pmatrix}1 & -1\\ -1 & 1\end{pmatrix}$$

### The element vector $F^e$
$$F^e_i = \int_{x_1}^{x_2} F_x\,\varphi_i\,dx = \int_{-1}^{1} F_x\big(x(\xi)\big)\,\varphi_i(\xi)\,J\,d\xi$$
- Uniform load $F_x = q$: $\int_{-1}^{1}\varphi_i\,d\xi = 1$, so $F^e = \frac{q h}{2}(1, 1)$.
- A load varying linearly from $q_1$ to $q_2$ over the element: $F^e = \frac{h}{6}\big(2q_1 + q_2,\ q_1 + 2q_2\big)$ – the heavier end gets more.

### Quadratic elements
With three nodes ($\xi = -1, 0, 1$):
$$\varphi_1 = \frac{\xi(\xi - 1)}{2}, \qquad \varphi_2 = 1 - \xi^2, \qquad \varphi_3 = \frac{\xi(\xi + 1)}{2}$$
The same recipe (remember $J = h/2$) gives
$$B^e = \frac{EA}{3h}\begin{pmatrix}7 & -8 & 1\\ -8 & 16 & -8\\ 1 & -8 & 7\end{pmatrix}, \qquad F^e = q\,h\begin{pmatrix}1/6\\ 2/3\\ 1/6\end{pmatrix}$$
Note that a uniform load is **not** shared equally: the middle node gets $2/3$ of the load.

### Gauss quadrature on the master element
When $EA$ or $F_x$ varies, we evaluate the integrals numerically: $\int_{-1}^{1} g(\xi)\,d\xi \approx \sum_k w_k\,g(\xi_k)$.
- 1 point: $\xi = 0$, $w = 2$ – exact for polynomials of degree $\le 1$.
- 2 points: $\xi = \pm\frac{1}{\sqrt3}$, $w = 1$ – exact for degree $\le 3$.
- In general $n$ points are exact up to degree $2n - 1$.

### Example – the Gateaux derivative of a simple functional
Let $\Pi(u) = \int_0^1\big(\tfrac12 (u')^2 - u\big)\,dx$ with $u(0) = u(1) = 0$. Find the weak and the strong form.
1. $\Pi(u + \theta v) = \Pi(u) + \theta\int_0^1 (u'v' - v)\,dx + \tfrac{\theta^2}{2}\int_0^1 (v')^2\,dx$.
2. So $\delta\Pi(u, v) = \int_0^1 (u'v' - v)\,dx$. Weak form: $\int_0^1 u'v'\,dx = \int_0^1 v\,dx$ for all $v$ with $v(0) = v(1) = 0$.
3. Integration by parts (the boundary term is zero because $v = 0$ at both ends): $\int_0^1 (-u'' - 1)\,v\,dx = 0$ for all $v$, so $-u'' = 1$.
4. The solution is $u = \tfrac12 x(1 - x)$. Check: $u'' = -1$ and $u(0) = u(1) = 0$.`);

// ================= Enhet 2: feil og konvergens =================
DEEP("FEM", "Elementtyper, mesh og feil",
S_`## Hvor god er FEM-løsningen?
Kort sagt: Galerkin finner den **beste** løsningen som er mulig med funksjonene du har gitt den – målt i energi. Flere eller bedre elementer gir et bedre utvalg å velge fra.

### Galerkin-ortogonalitet
Den eksakte løsningen oppfyller $B(u, v) = F(v)$ for alle $v$, også for funksjoner $v^h$ i elementrommet. FEM-løsningen oppfyller $B(u^h, v^h) = F(v^h)$. Trekk fra hverandre:
$$B(u - u^h,\ v^h) = 0 \qquad \text{for alle } v^h$$
Feilen står «vinkelrett» på hele elementrommet, målt med $B$.

### Beste tilnærming i energinorm
**Energinormen** er $\|v\|_E = \sqrt{B(v, v)}$ – roten av to ganger tøyningsenergien. Av ortogonaliteten følger
$$\|u - u^h\|_E = \min_{v^h}\ \|u - v^h\|_E$$
Ingen annen funksjon i elementrommet er nærmere den eksakte løsningen, målt i energi (Céas lemma for symmetriske problemer).

### FEM er for stiv
For enhver tillatt $w$ er $\Pi(w) = \Pi(u) + \tfrac12\|w - u\|_E^2$. Med $w = u^h$:
$$\Pi(u^h) = \Pi(u) + \tfrac12\,\|u - u^h\|_E^2 \;\ge\; \Pi(u)$$
FEM gir altså alltid for høy potensiell energi. Det betyr at lastenes arbeid $F(u^h) = B(u^h, u^h)$ blir for lite: modellen er **for stiv**, og forskyvningene blir i snitt for små. Flere elementer gjør modellen mykere og nærmere fasit.

### Konvergensrate
For elementer av grad $p$, elementstørrelse $h$ og en glatt eksakt løsning:
- energifeilen (og spenningsfeilen): $\|u - u^h\|_E \approx C\,h^{p}$
- forskyvningsfeilen i $L^2$: $\|u - u^h\| \approx C\,h^{p+1}$

Halverer du $h$ med lineære elementer ($p = 1$), halveres energifeilen og forskyvningsfeilen blir omtrent en firedel. Med kvadratiske elementer ($p = 2$) blir de en firedel og en åttedel.

### Slik sjekker du en modell
1. Kjør med en grov mesh, halver elementstørrelsen og sammenlign. Endrer resultatet seg lite, har det konvergert.
2. Sjekk likevekt: summen av reaksjonskreftene skal være lik summen av lastene.
3. Se etter spenningstopper ved skarpe innvendige hjørner. De er singulariteter i modellen og vokser når meshen forfines – modeller heller med en reell radius.`,
S_`## How good is the FEM solution?
In short: Galerkin finds the **best** solution possible with the functions you have given it – measured in energy. More or better elements give a better set to choose from.

### Galerkin orthogonality
The exact solution satisfies $B(u, v) = F(v)$ for all $v$, including functions $v^h$ in the element space. The FEM solution satisfies $B(u^h, v^h) = F(v^h)$. Subtract:
$$B(u - u^h,\ v^h) = 0 \qquad \text{for all } v^h$$
The error is "perpendicular" to the whole element space, measured with $B$.

### Best approximation in the energy norm
The **energy norm** is $\|v\|_E = \sqrt{B(v, v)}$ – the square root of twice the strain energy. Orthogonality gives
$$\|u - u^h\|_E = \min_{v^h}\ \|u - v^h\|_E$$
No other function in the element space is closer to the exact solution, measured in energy (Céa's lemma for symmetric problems).

### FEM is too stiff
For any admissible $w$ we have $\Pi(w) = \Pi(u) + \tfrac12\|w - u\|_E^2$. With $w = u^h$:
$$\Pi(u^h) = \Pi(u) + \tfrac12\,\|u - u^h\|_E^2 \;\ge\; \Pi(u)$$
So FEM always gives too high a potential energy. That means the work of the loads $F(u^h) = B(u^h, u^h)$ is too small: the model is **too stiff**, and the displacements are on average too small. More elements make the model softer and closer to the true answer.

### Rate of convergence
For elements of degree $p$, element size $h$ and a smooth exact solution:
- the energy error (and stress error): $\|u - u^h\|_E \approx C\,h^{p}$
- the displacement error in $L^2$: $\|u - u^h\| \approx C\,h^{p+1}$

Halving $h$ with linear elements ($p = 1$) halves the energy error and makes the displacement error about a quarter. With quadratic elements ($p = 2$) they become a quarter and an eighth.

### How to check a model
1. Run with a coarse mesh, halve the element size and compare. If the result barely changes, it has converged.
2. Check equilibrium: the sum of the reaction forces must equal the sum of the loads.
3. Look for stress peaks at sharp re-entrant corners. They are singularities of the model and grow as the mesh is refined – model a real radius instead.`);

// ================= Flervalg =================
DQS("FEM", "Stavelementer og stivhetsmatriser", [
 ["Hva er den sterke formen for en stav med aksialstivhet $EA$ og fordelt last $F_x$?",
  ["$-(EA\\,u')' = F_x$", "$EA\\,u' = F_x$", "$(EA\\,u)'' = F_x$", "$-EA\\,u = F_x$"],
  "Normalkraften er $N = EA\\,u'$, og likevekt for en liten bit gir $N' + F_x = 0$.",
  "What is the strong form for a bar with axial stiffness $EA$ and distributed load $F_x$?",
  ["$-(EA\\,u')' = F_x$", "$EA\\,u' = F_x$", "$(EA\\,u)'' = F_x$", "$-EA\\,u = F_x$"],
  "The normal force is $N = EA\\,u'$, and equilibrium of a small piece gives $N' + F_x = 0$."],
 ["Hvilken randbetingelse er naturlig for staven?",
  ["$EA\\,u'(L) = P$ (kraft i enden)", "$u(0) = 0$ (fast innfesting)", "$u(L) = 0$", "$u'(0) = 0$ alltid"],
  "Naturlige randbetingelser handler om kraften ($u'$) og kommer inn via randleddet i den svake formen. Forskyvningsbetingelser er essensielle.",
  "Which boundary condition is natural for the bar?",
  ["$EA\\,u'(L) = P$ (force at the end)", "$u(0) = 0$ (fixed support)", "$u(L) = 0$", "$u'(0) = 0$ always"],
  "Natural boundary conditions concern the force ($u'$) and enter through the boundary term of the weak form. Displacement conditions are essential."],
 ["Hva betyr leddet $-P\\,u(L)$ i den totale potensielle energien $\\Pi(u)$?",
  ["Potensialet til punktlasten: den taper energi når enden flytter seg i lastens retning", "Tøyningsenergien i staven", "Reaksjonskraften i innfestingen", "Energien som går tapt som varme"],
  "Lastenes potensial er minus kraft ganger forskyvning. Tøyningsenergien er $\\tfrac12\\int EA(u')^2dx$.",
  "What does the term $-P\\,u(L)$ in the total potential energy $\\Pi(u)$ mean?",
  ["The potential of the point load: it loses energy when the end moves in the load's direction", "The strain energy in the bar", "The reaction force at the support", "Energy lost as heat"],
  "The potential of the loads is minus force times displacement. The strain energy is $\\tfrac12\\int EA(u')^2dx$."],
 ["En jevn last $q$ virker på et lineært stavelement med lengde $h$. Hva blir den konsistente lastvektoren $F^e$?",
  ["$\\frac{qh}{2}(1,\\ 1)$", "$qh\\,(1,\\ 1)$", "$\\frac{qh}{6}(2,\\ 1)$", "$\\frac{q}{h}(1,\\ -1)$"],
  "$F^e_i = \\int q\\,\\varphi_i\\,dx$, og hver lineær formfunksjon har integral $h/2$. Halve lasten går til hver node.",
  "A uniform load $q$ acts on a linear bar element of length $h$. What is the consistent load vector $F^e$?",
  ["$\\frac{qh}{2}(1,\\ 1)$", "$qh\\,(1,\\ 1)$", "$\\frac{qh}{6}(2,\\ 1)$", "$\\frac{q}{h}(1,\\ -1)$"],
  "$F^e_i = \\int q\\,\\varphi_i\\,dx$, and each linear shape function integrates to $h/2$. Half the load goes to each node."]
]);
DQS("FEM", "Svak form og formfunksjoner", [
 ["Hvordan er Gateaux-deriverte av $\\Pi$ i punktet $u$ og retningen $v$ definert?",
  ["$\\delta\\Pi(u, v) = \\lim_{\\theta\\to 0}\\frac{\\Pi(u + \\theta v) - \\Pi(u)}{\\theta}$", "$\\delta\\Pi(u, v) = \\Pi(u) - \\Pi(v)$", "$\\delta\\Pi(u, v) = \\frac{d\\Pi}{du}\\cdot\\frac{d\\Pi}{dv}$", "$\\delta\\Pi(u, v) = \\int_0^L u\\,v\\,dx$"],
  "Det er den retningsderiverte: hvor raskt $\\Pi$ endrer seg når vi går fra $u$ et lite stykke $\\theta$ i retning $v$.",
  "How is the Gateaux derivative of $\\Pi$ at the point $u$ in the direction $v$ defined?",
  ["$\\delta\\Pi(u, v) = \\lim_{\\theta\\to 0}\\frac{\\Pi(u + \\theta v) - \\Pi(u)}{\\theta}$", "$\\delta\\Pi(u, v) = \\Pi(u) - \\Pi(v)$", "$\\delta\\Pi(u, v) = \\frac{d\\Pi}{du}\\cdot\\frac{d\\Pi}{dv}$", "$\\delta\\Pi(u, v) = \\int_0^L u\\,v\\,dx$"],
  "It is the directional derivative: how fast $\\Pi$ changes when we move from $u$ a small step $\\theta$ in the direction $v$."],
 ["Hva blir $\\delta\\Pi(u, v)$ for $\\Pi(u) = \\tfrac12\\int_0^L EA(u')^2dx - \\int_0^L F_x u\\,dx - Pu(L)$?",
  ["$\\int_0^L EA\\,u'v'\\,dx - \\int_0^L F_x v\\,dx - P\\,v(L)$", "$\\tfrac12\\int_0^L EA\\,(v')^2dx$", "$\\int_0^L EA\\,u''v\\,dx$", "$\\int_0^L EA\\,u'v'\\,dx$"],
  "Kvadratet gir $2\\theta u'v'$, som med faktoren $\\tfrac12$ blir $\\theta\\,EA\\,u'v'$. Lastleddene er lineære i $u$ og gir $v$ direkte. $\\theta^2$-leddet forsvinner i grensen.",
  "What is $\\delta\\Pi(u, v)$ for $\\Pi(u) = \\tfrac12\\int_0^L EA(u')^2dx - \\int_0^L F_x u\\,dx - Pu(L)$?",
  ["$\\int_0^L EA\\,u'v'\\,dx - \\int_0^L F_x v\\,dx - P\\,v(L)$", "$\\tfrac12\\int_0^L EA\\,(v')^2dx$", "$\\int_0^L EA\\,u''v\\,dx$", "$\\int_0^L EA\\,u'v'\\,dx$"],
  "The square gives $2\\theta u'v'$, which with the factor $\\tfrac12$ becomes $\\theta\\,EA\\,u'v'$. The load terms are linear in $u$ and give $v$ directly. The $\\theta^2$ term vanishes in the limit."],
 ["Hvorfor må testfunksjonene $v$ oppfylle $v(0) = 0$ når staven er fast i $x = 0$?",
  ["De er tillatte endringer av forskyvningen, og den kan ikke endres der staven er fast", "For at integralet skal bli null", "Fordi $P$ virker i $x = 0$", "Det må de ikke"],
  "$u + \\theta v$ må også oppfylle $u(0) = 0$. Derfor forsvinner også randleddet i $x = 0$ ved delvis integrasjon.",
  "Why must the test functions $v$ satisfy $v(0) = 0$ when the bar is fixed at $x = 0$?",
  ["They are admissible changes of the displacement, which cannot change where the bar is fixed", "To make the integral zero", "Because $P$ acts at $x = 0$", "They don't have to"],
  "$u + \\theta v$ must also satisfy $u(0) = 0$. That is also why the boundary term at $x = 0$ vanishes in integration by parts."],
 ["Hva er Jacobianen $J = dx/d\\xi$ for et lineært element fra $x_1$ til $x_2$ avbildet fra masterelementet $\\xi\\in[-1, 1]$?",
  ["$(x_2 - x_1)/2$", "$x_2 - x_1$", "$2/(x_2 - x_1)$", "$1$"],
  "$x(\\xi) = x_1\\frac{1-\\xi}{2} + x_2\\frac{1+\\xi}{2}$, så $dx/d\\xi = (x_2 - x_1)/2 = h/2$. Masterelementet har lengde 2.",
  "What is the Jacobian $J = dx/d\\xi$ for a linear element from $x_1$ to $x_2$ mapped from the master element $\\xi\\in[-1, 1]$?",
  ["$(x_2 - x_1)/2$", "$x_2 - x_1$", "$2/(x_2 - x_1)$", "$1$"],
  "$x(\\xi) = x_1\\frac{1-\\xi}{2} + x_2\\frac{1+\\xi}{2}$, so $dx/d\\xi = (x_2 - x_1)/2 = h/2$. The master element has length 2."],
 ["Hvorfor blir den globale stivhetsmatrisen $K$ tridiagonal i 1D med hattefunksjoner?",
  ["$K_{ij} = B(\\psi_i, \\psi_j)$ er null når $\\psi_i$ og $\\psi_j$ ikke overlapper, og bare naboer overlapper", "Fordi $EA$ er konstant", "Fordi lasten er jevn", "Fordi Gauss-kvadraturen har to punkter"],
  "Hver hattefunksjon er bare ulik null på de to elementene rundt sin node.",
  "Why is the global stiffness matrix $K$ tridiagonal in 1D with hat functions?",
  ["$K_{ij} = B(\\psi_i, \\psi_j)$ is zero when $\\psi_i$ and $\\psi_j$ don't overlap, and only neighbours overlap", "Because $EA$ is constant", "Because the load is uniform", "Because Gauss quadrature has two points"],
  "Each hat function is only non-zero on the two elements around its node."]
]);
DQS("FEM", "Elementtyper, mesh og feil", [
 ["Hva sier Galerkin-ortogonaliteten?",
  ["$B(u - u^h, v^h) = 0$ for alle $v^h$ i elementrommet", "$u^h = u$ i alle punkter", "$B(u, u) = 0$", "Feilen er null i Gauss-punktene"],
  "Trekk $B(u^h, v^h) = F(v^h)$ fra $B(u, v^h) = F(v^h)$. Feilen er «vinkelrett» på elementrommet i energi-indreproduktet.",
  "What does Galerkin orthogonality say?",
  ["$B(u - u^h, v^h) = 0$ for all $v^h$ in the element space", "$u^h = u$ at every point", "$B(u, u) = 0$", "The error is zero at the Gauss points"],
  "Subtract $B(u^h, v^h) = F(v^h)$ from $B(u, v^h) = F(v^h)$. The error is \"perpendicular\" to the element space in the energy inner product."],
 ["Hvorfor sier vi at en forskyvningsbasert FEM-modell er «for stiv»?",
  ["$\\Pi(u^h) \\ge \\Pi(u)$, så lastenes arbeid og forskyvningene blir i snitt for små", "Fordi $E$ alltid overvurderes", "Fordi meshen har for mange noder", "Det er den ikke – den er for myk"],
  "$\\Pi(u^h) = \\Pi(u) + \\tfrac12\\|u - u^h\\|_E^2$. Elementrommet begrenser hvordan staven kan deformere seg, som om den var avstivet.",
  "Why do we say a displacement-based FEM model is \"too stiff\"?",
  ["$\\Pi(u^h) \\ge \\Pi(u)$, so the work of the loads and the displacements are on average too small", "Because $E$ is always overestimated", "Because the mesh has too many nodes", "It isn't – it is too soft"],
  "$\\Pi(u^h) = \\Pi(u) + \\tfrac12\\|u - u^h\\|_E^2$. The element space restricts how the bar can deform, as if it were braced."]
]);

// ================= Oppgavegeneratorer =================
const GU = (title, ...fns) => { const c = COURSES.find(x => x.code === "FEM"), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) GEN("FEM", u, ...fns); };
// to elementer, jevn last q og punktlast P i enden, fast i x = 0 (samme oppsett som eksempelet i teorien)
const bar2 = () => { const EA = R.p([1000, 2000, 4000, 5000]), L = R.p([2, 4]), q = R.p([5, 10, 20]), P = R.p([0, 10, 20, 50]), h = L / 2, k = EA / h;
  const u1 = (1.5 * q * h + P) / k, u2 = u1 + (q * h / 2 + P) / k; return { EA, L, q, P, h, k, u1, u2 }; };
const bar2Txt = b => T(`En stav med $EA = ${b.EA}$ kN og lengde $L = ${b.L}$ m er fast i $x = 0$. Den har jevn last $q = ${b.q}$ kN/m langs hele staven${b.P ? ` og punktlast $P = ${b.P}$ kN i enden` : ""}. Du bruker to like lineære elementer.`,
  `A bar with $EA = ${b.EA}$ kN and length $L = ${b.L}$ m is fixed at $x = 0$. It has a uniform load $q = ${b.q}$ kN/m along the whole bar${b.P ? ` and a point load $P = ${b.P}$ kN at the end` : ""}. You use two equal linear elements.`);
const bar2Sol = b => T(`$h = ${b.h}$ m, $EA/h = ${b.k}$ kN/m og $F^e = \\frac{qh}{2}(1, 1) = (${mf(b.q * b.h / 2)}, ${mf(b.q * b.h / 2)})$. Etter at node 0 er strøket: $\\begin{pmatrix}${2 * b.k} & ${-b.k}\\\\ ${-b.k} & ${b.k}\\end{pmatrix}\\vec u = \\begin{pmatrix}${mf(b.q * b.h)}\\\\ ${mf(b.q * b.h / 2 + b.P)}\\end{pmatrix}$. Summen av radene gir $${b.k}\\,u_1 = ${mf(1.5 * b.q * b.h + b.P)}$, så $u_1 = ${mf(b.u1 * 1000, 3)}$ mm og $u_2 = u_1 + ${mf(b.q * b.h / 2 + b.P)}/${b.k} = ${mf(b.u2 * 1000, 3)}$ mm.`,
  `$h = ${b.h}$ m, $EA/h = ${b.k}$ kN/m and $F^e = \\frac{qh}{2}(1, 1) = (${mf(b.q * b.h / 2)}, ${mf(b.q * b.h / 2)})$. After deleting node 0: $\\begin{pmatrix}${2 * b.k} & ${-b.k}\\\\ ${-b.k} & ${b.k}\\end{pmatrix}\\vec u = \\begin{pmatrix}${mf(b.q * b.h)}\\\\ ${mf(b.q * b.h / 2 + b.P)}\\end{pmatrix}$. Adding the rows gives $${b.k}\\,u_1 = ${mf(1.5 * b.q * b.h + b.P)}$, so $u_1 = ${mf(b.u1 * 1000, 3)}$ mm and $u_2 = u_1 + ${mf(b.q * b.h / 2 + b.P)}/${b.k} = ${mf(b.u2 * 1000, 3)}$ mm.`);
GU("Stavelementer og stivhetsmatriser",
 // forskyvningen i enden (eksamensstil)
 () => { const b = bar2(), u = b.u2 * 1000;
   return [bar2Txt(b) + T(" Hva er forskyvningen $u_2$ i enden (i mm)?", " What is the displacement $u_2$ at the end (in mm)?"), { n: u, tol: rel(u, 0.01, 0.001), u: "mm" },
     bar2Sol(b) + T(` Kontroll: eksakt $u(L) = \\frac{PL + qL^2/2}{EA}$ gir det samme – nodeverdiene er eksakte.`, ` Check: the exact $u(L) = \\frac{PL + qL^2/2}{EA}$ gives the same – the nodal values are exact.`)]; },
 // normalkraften i element 1
 () => { const b = bar2(), N = b.k * b.u1;
   return [bar2Txt(b) + T(" Hva er normalkraften $N_1$ i element 1 (nærmest innfestingen)?", " What is the normal force $N_1$ in element 1 (next to the support)?"), { n: N, tol: rel(N, 0.01, 0.01), u: "kN" },
     bar2Sol(b) + T(` $N_1 = \\frac{EA}{h}(u_1 - u_0) = ${b.k}\\cdot ${mf(b.u1, 5)} = ${mf(N)}$ kN. Det er lik den eksakte $N(x) = P + q(L - x)$ midt i elementet, $x = ${mf(b.h / 2)}$ m.`,
       ` $N_1 = \\frac{EA}{h}(u_1 - u_0) = ${b.k}\\cdot ${mf(b.u1, 5)} = ${mf(N)}$ kN. This equals the exact $N(x) = P + q(L - x)$ at the middle of the element, $x = ${mf(b.h / 2)}$ m.`)]; },
 // reaksjonskraften
 () => { const b = bar2(), Rr = b.q * b.L + b.P;
   return [bar2Txt(b) + T(" Hvor stor er reaksjonskraften i innfestingen (absoluttverdi)?", " How large is the reaction force at the support (absolute value)?"), { n: Rr, tol: rel(Rr, 0.01, 0.01), u: "kN" },
     T(`Rad 0 i $K\\vec u = \\vec f + \\vec R$ gir $-${b.k}\\,u_1 = ${mf(b.q * b.h / 2)} + R$, altså $|R| = ${mf(Rr)}$ kN. Det er hele lasten $qL + P = ${b.q}\\cdot ${b.L} + ${b.P}$ – likevekt.`,
       `Row 0 of $K\\vec u = \\vec f + \\vec R$ gives $-${b.k}\\,u_1 = ${mf(b.q * b.h / 2)} + R$, so $|R| = ${mf(Rr)}$ kN. That is the whole load $qL + P = ${b.q}\\cdot ${b.L} + ${b.P}$ – equilibrium.`)]; },
 // konsistent lastvektor for lineært varierende last
 () => { const h = R.p([0.5, 1, 2, 3]), q1 = R.p([0, 2, 4, 6]), q2 = R.p([3, 6, 9, 12]), i = R.p([1, 2]), F = i === 1 ? h / 6 * (2 * q1 + q2) : h / 6 * (q1 + 2 * q2);
   return [T(`En last varierer lineært fra $q_1 = ${q1}$ kN/m til $q_2 = ${q2}$ kN/m over et lineært element med lengde $h = ${mf(h)}$ m. Hva er $F^e_${i} = \\int F_x\\,\\varphi_${i}\\,dx$?`,
       `A load varies linearly from $q_1 = ${q1}$ kN/m to $q_2 = ${q2}$ kN/m over a linear element of length $h = ${mf(h)}$ m. What is $F^e_${i} = \\int F_x\\,\\varphi_${i}\\,dx$?`), { n: F, tol: rel(F, 0.01, 0.001), u: "kN" },
     T(`$F^e = \\frac{h}{6}(2q_1 + q_2,\\ q_1 + 2q_2)$, så $F^e_${i} = \\frac{${mf(h)}}{6}\\cdot ${i === 1 ? `(2\\cdot ${q1} + ${q2})` : `(${q1} + 2\\cdot ${q2})`} = ${mf(F, 3)}$ kN.`,
       `$F^e = \\frac{h}{6}(2q_1 + q_2,\\ q_1 + 2q_2)$, so $F^e_${i} = \\frac{${mf(h)}}{6}\\cdot ${i === 1 ? `(2\\cdot ${q1} + ${q2})` : `(${q1} + 2\\cdot ${q2})`} = ${mf(F, 3)}$ kN.`)]; },
 // assemblering med ulike elementer
 () => { const ks = [0, 1, 2].map(() => R.p([100, 200, 250, 400, 500, 800])), off = R.p([0, 1]), val = off ? -ks[2] : ks[1] + ks[2];
   return [T(`Tre stavelementer i serie (noder 0–1–2–3) har stivhetene $EA/h = ${ks[0]}$, $${ks[1]}$ og $${ks[2]}$ kN/m. Hva blir ${off ? "$K_{23}$" : "$K_{22}$"} i den globale stivhetsmatrisen (før randbetingelser)?`,
       `Three bar elements in series (nodes 0–1–2–3) have stiffnesses $EA/h = ${ks[0]}$, $${ks[1]}$ and $${ks[2]}$ kN/m. What is ${off ? "$K_{23}$" : "$K_{22}$"} in the global stiffness matrix (before boundary conditions)?`), { n: val, tol: 0.5, u: "kN/m" },
     off ? T(`Bare element 3 kobler node 2 og 3, så $K_{23} = -${ks[2]}$ kN/m.`, `Only element 3 connects nodes 2 and 3, so $K_{23} = -${ks[2]}$ kN/m.`)
         : T(`Node 2 deles av element 2 og 3, så diagonalbidragene summeres: $K_{22} = ${ks[1]} + ${ks[2]} = ${val}$ kN/m.`, `Node 2 is shared by elements 2 and 3, so the diagonal contributions add: $K_{22} = ${ks[1]} + ${ks[2]} = ${val}$ kN/m.`)]; }
);
GU("Stavelementer og stivhetsmatriser",
 // total potensiell energi for en gitt (lineær) prøvefunksjon
 () => { const EA = R.p([100, 200, 400, 500]), L = R.p([1, 2]), q = R.p([0, 10, 20, 40]), P = R.p([10, 20, 50]), c = R.p([0.05, 0.1, 0.2]);
   const U = EA * c * c * L / 2, Wq = q * c * L * L / 2, WP = P * c * L, Pi = U - Wq - WP;
   return [T(`En stav ($EA = ${EA}$ kN, $L = ${L}$ m) er fast i $x = 0$, har jevn last $q = ${q}$ kN/m og punktlast $P = ${P}$ kN i enden. Regn ut den totale potensielle energien $\\Pi(u)$ for prøvefunksjonen $u(x) = ${mf(c)}\\,x$ (i kNm).`,
       `A bar ($EA = ${EA}$ kN, $L = ${L}$ m) is fixed at $x = 0$, with a uniform load $q = ${q}$ kN/m and a point load $P = ${P}$ kN at the end. Compute the total potential energy $\\Pi(u)$ for the trial function $u(x) = ${mf(c)}\\,x$ (in kNm).`), { n: Pi, tol: rel(Pi, 0.01, 0.001), u: "kNm" },
     T(`$\\Pi(u) = \\tfrac12\\int_0^L EA(u')^2dx - \\int_0^L q\\,u\\,dx - P\\,u(L)$. Med $u' = ${mf(c)}$:\n1. Tøyningsenergi: $\\tfrac12\\cdot ${EA}\\cdot ${mf(c)}^2\\cdot ${L} = ${mf(U, 3)}$.\n2. Fordelt last: $\\int_0^{${L}} ${q}\\cdot ${mf(c)}x\\,dx = ${q}\\cdot ${mf(c)}\\cdot\\frac{${L}^2}{2} = ${mf(Wq, 3)}$.\n3. Punktlast: $P\\,u(L) = ${P}\\cdot ${mf(c * L, 3)} = ${mf(WP, 3)}$.\n4. $\\Pi = ${mf(U, 3)} - ${mf(Wq, 3)} - ${mf(WP, 3)} = ${mf(Pi, 3)}$ kNm.`,
       `$\\Pi(u) = \\tfrac12\\int_0^L EA(u')^2dx - \\int_0^L q\\,u\\,dx - P\\,u(L)$. With $u' = ${mf(c)}$:\n1. Strain energy: $\\tfrac12\\cdot ${EA}\\cdot ${mf(c)}^2\\cdot ${L} = ${mf(U, 3)}$.\n2. Distributed load: $\\int_0^{${L}} ${q}\\cdot ${mf(c)}x\\,dx = ${q}\\cdot ${mf(c)}\\cdot\\frac{${L}^2}{2} = ${mf(Wq, 3)}$.\n3. Point load: $P\\,u(L) = ${P}\\cdot ${mf(c * L, 3)} = ${mf(WP, 3)}$.\n4. $\\Pi = ${mf(U, 3)} - ${mf(Wq, 3)} - ${mf(WP, 3)} = ${mf(Pi, 3)}$ kNm.`)]; },
 // Rayleigh–Ritz: beste c i u = c x ved å minimere Π
 () => { const EA = R.p([100, 200, 400, 500]), L = R.p([1, 2]), q = R.p([0, 10, 20]), P = R.p([10, 20, 50]), c = (q * L / 2 + P) / EA, uL = c * L * 1000;
   return [T(`Samme type stav: $EA = ${EA}$ kN, $L = ${L}$ m, $q = ${q}$ kN/m og $P = ${P}$ kN, fast i $x = 0$. Bruk prøvefunksjonen $u(x) = c\\,x$ og finn den $c$ som gjør $\\Pi$ minst. Hva blir da $u(L)$ (i mm)?`,
       `The same kind of bar: $EA = ${EA}$ kN, $L = ${L}$ m, $q = ${q}$ kN/m and $P = ${P}$ kN, fixed at $x = 0$. Use the trial function $u(x) = c\\,x$ and find the $c$ that makes $\\Pi$ smallest. What is $u(L)$ then (in mm)?`), { n: uL, tol: rel(uL, 0.01, 0.001), u: "mm" },
     T(`1. Sett inn: $\\Pi(c) = \\tfrac12 EA\\,c^2 L - q\\,c\\,\\frac{L^2}{2} - P\\,c\\,L$.\n2. Minimum der $\\frac{d\\Pi}{dc} = EA\\,c\\,L - q\\frac{L^2}{2} - P L = 0$, altså $c = \\frac{qL/2 + P}{EA} = \\frac{${mf(q * L / 2)} + ${P}}{${EA}} = ${mf(c, 5)}$.\n3. $u(L) = cL = ${mf(c * L, 5)}$ m $= ${mf(uL, 3)}$ mm.\n4. Eksakt er $u(L) = \\frac{PL + qL^2/2}{EA}$ – det samme! En rett linje kan likevel ikke følge krumningen inne i staven når $q > 0$.`,
       `1. Insert: $\\Pi(c) = \\tfrac12 EA\\,c^2 L - q\\,c\\,\\frac{L^2}{2} - P\\,c\\,L$.\n2. Minimum where $\\frac{d\\Pi}{dc} = EA\\,c\\,L - q\\frac{L^2}{2} - P L = 0$, so $c = \\frac{qL/2 + P}{EA} = \\frac{${mf(q * L / 2)} + ${P}}{${EA}} = ${mf(c, 5)}$.\n3. $u(L) = cL = ${mf(c * L, 5)}$ m $= ${mf(uL, 3)}$ mm.\n4. The exact value is $u(L) = \\frac{PL + qL^2/2}{EA}$ – the same! A straight line still cannot follow the curvature inside the bar when $q > 0$.`)]; }
);
GU("Svak form og formfunksjoner",
 // Gateaux-deriverte med tall
 () => { const EA = R.p([2, 3, 4, 5]), c = R.p([1, 2, 3]), L = R.p([1, 2]), q = R.p([1, 2, 4, 6]), P = R.p([0, 1, 2, 3]), d = EA * c * L - q * L * L / 2 - P * L;
   return [T(`La $\\Pi(u) = \\tfrac12\\int_0^{${L}} ${EA}\\,(u')^2\\,dx - \\int_0^{${L}} ${q}\\,u\\,dx - ${P}\\,u(${L})$. Regn ut Gateaux-deriverte $\\delta\\Pi(u, v)$ for $u = ${c}x$ i retningen $v = x$.`,
       `Let $\\Pi(u) = \\tfrac12\\int_0^{${L}} ${EA}\\,(u')^2\\,dx - \\int_0^{${L}} ${q}\\,u\\,dx - ${P}\\,u(${L})$. Compute the Gateaux derivative $\\delta\\Pi(u, v)$ for $u = ${c}x$ in the direction $v = x$.`), { n: d, tol: 0.01, u: "" },
     T(`$\\delta\\Pi(u, v) = \\int_0^{${L}} ${EA}\\,u'v'\\,dx - \\int_0^{${L}} ${q}\\,v\\,dx - ${P}\\,v(${L})$. Med $u' = ${c}$ og $v' = 1$: $${EA}\\cdot ${c}\\cdot ${L} - ${q}\\cdot\\frac{${L}^2}{2} - ${P}\\cdot ${L} = ${mf(d)}$. Siden svaret ${d === 0 ? "er null, kan $u = " + c + "x$ være løsningen i denne retningen" : "ikke er null, er $u = " + c + "x$ ikke minimum"}.`,
       `$\\delta\\Pi(u, v) = \\int_0^{${L}} ${EA}\\,u'v'\\,dx - \\int_0^{${L}} ${q}\\,v\\,dx - ${P}\\,v(${L})$. With $u' = ${c}$ and $v' = 1$: $${EA}\\cdot ${c}\\cdot ${L} - ${q}\\cdot\\frac{${L}^2}{2} - ${P}\\cdot ${L} = ${mf(d)}$. Since the answer ${d === 0 ? "is zero, $u = " + c + "x$ may be the solution in this direction" : "is not zero, $u = " + c + "x$ is not the minimum"}.`)]; },
 // avbildning fra masterelementet
 () => { const x1 = R.p([0, 1, 2, 4, 6]), h = R.p([1, 2, 3, 4]), x2 = x1 + h, xi = R.p([-0.5, 0, 0.25, 0.5, 1 / Math.sqrt(3)]), x = (x1 + x2) / 2 + xi * h / 2, xs = Math.abs(xi - 1 / Math.sqrt(3)) < 1e-9 ? "1/\\sqrt3" : mf(xi);
   return [T(`Et lineært element går fra $x_1 = ${x1}$ til $x_2 = ${x2}$. Hvilken $x$ svarer til $\\xi = ${xs}$ på masterelementet $[-1, 1]$?`, `A linear element runs from $x_1 = ${x1}$ to $x_2 = ${x2}$. Which $x$ corresponds to $\\xi = ${xs}$ on the master element $[-1, 1]$?`), { n: x, tol: 0.005, u: "" },
     T(`$x(\\xi) = x_1\\frac{1 - \\xi}{2} + x_2\\frac{1 + \\xi}{2} = \\frac{x_1 + x_2}{2} + \\xi\\,\\frac{h}{2} = ${mf((x1 + x2) / 2)} + ${xs}\\cdot ${mf(h / 2)} = ${mf(x, 3)}$.`, `$x(\\xi) = x_1\\frac{1 - \\xi}{2} + x_2\\frac{1 + \\xi}{2} = \\frac{x_1 + x_2}{2} + \\xi\\,\\frac{h}{2} = ${mf((x1 + x2) / 2)} + ${xs}\\cdot ${mf(h / 2)} = ${mf(x, 3)}$.`)]; },
 // Jacobian og deriverte
 () => { const h = R.p([0.5, 2, 4, 5]), w = R.p([1, 2]), d = (w === 1 ? -1 : 1) / h;
   return [T(`Et lineært element har lengde $h = ${mf(h)}$. Hva er $\\frac{d\\varphi_${w}}{dx}$ når $\\varphi_${w}$ er definert på masterelementet $\\xi\\in[-1, 1]$?`, `A linear element has length $h = ${mf(h)}$. What is $\\frac{d\\varphi_${w}}{dx}$ when $\\varphi_${w}$ is defined on the master element $\\xi\\in[-1, 1]$?`), { n: d, tol: 0.001, u: "" },
     T(`$\\frac{d\\varphi_${w}}{d\\xi} = ${w === 1 ? "-" : ""}\\frac12$ og $J = h/2 = ${mf(h / 2)}$. Kjerneregelen: $\\frac{d\\varphi_${w}}{dx} = \\frac1J\\frac{d\\varphi_${w}}{d\\xi} = ${mf(d, 3)}$ $(= ${w === 1 ? "-" : ""}1/h)$.`, `$\\frac{d\\varphi_${w}}{d\\xi} = ${w === 1 ? "-" : ""}\\frac12$ and $J = h/2 = ${mf(h / 2)}$. The chain rule: $\\frac{d\\varphi_${w}}{dx} = \\frac1J\\frac{d\\varphi_${w}}{d\\xi} = ${mf(d, 3)}$ $(= ${w === 1 ? "-" : ""}1/h)$.`)]; },
 // kvadratisk element
 () => { const EA = R.p([300, 600, 900, 1200]), h = R.p([1, 2, 3]), e = R.p([[1, 1, 7], [1, 2, -8], [1, 3, 1], [2, 2, 16]]), val = e[2] * EA / (3 * h);
   return [T(`Et kvadratisk stavelement (noder i $\\xi = -1, 0, 1$) har $EA = ${EA}$ kN og lengde $h = ${h}$ m. Hva er $B^e_{${e[0]}${e[1]}}$?`, `A quadratic bar element (nodes at $\\xi = -1, 0, 1$) has $EA = ${EA}$ kN and length $h = ${h}$ m. What is $B^e_{${e[0]}${e[1]}}$?`), { n: val, tol: rel(val, 0.01, 0.5), u: "kN/m" },
     T(`$B^e = \\frac{EA}{3h}\\begin{pmatrix}7 & -8 & 1\\\\ -8 & 16 & -8\\\\ 1 & -8 & 7\\end{pmatrix}$, så $B^e_{${e[0]}${e[1]}} = ${e[2]}\\cdot\\frac{${EA}}{3\\cdot ${h}} = ${mf(val, 1)}$ kN/m. Det kommer fra $\\frac{2EA}{h}\\int_{-1}^{1}\\varphi_${e[0]}'\\varphi_${e[1]}'\\,d\\xi$ med $J = h/2$.`,
       `$B^e = \\frac{EA}{3h}\\begin{pmatrix}7 & -8 & 1\\\\ -8 & 16 & -8\\\\ 1 & -8 & 7\\end{pmatrix}$, so $B^e_{${e[0]}${e[1]}} = ${e[2]}\\cdot\\frac{${EA}}{3\\cdot ${h}} = ${mf(val, 1)}$ kN/m. It comes from $\\frac{2EA}{h}\\int_{-1}^{1}\\varphi_${e[0]}'\\varphi_${e[1]}'\\,d\\xi$ with $J = h/2$.`)]; },
 // lastvektor for kvadratisk element
 () => { const q = R.p([3, 6, 9, 12]), h = R.p([1, 2, 3]), mid = R.p([0, 1]), F = mid ? 2 * q * h / 3 : q * h / 6;
   return [T(`En jevn last $q = ${q}$ kN/m virker på et kvadratisk element med lengde $h = ${h}$ m. Hvor mye av lasten går til ${mid ? "midtnoden" : "hver endenode"}?`, `A uniform load $q = ${q}$ kN/m acts on a quadratic element of length $h = ${h}$ m. How much of the load goes to ${mid ? "the middle node" : "each end node"}?`), { n: F, tol: rel(F, 0.01, 0.001), u: "kN" },
     T(`$F^e = qh\\,(1/6,\\ 2/3,\\ 1/6)$, så ${mid ? "midtnoden" : "hver endenode"} får $${mid ? "\\frac23" : "\\frac16"}\\cdot ${q}\\cdot ${h} = ${mf(F, 3)}$ kN. Summen er hele lasten $qh = ${q * h}$ kN.`, `$F^e = qh\\,(1/6,\\ 2/3,\\ 1/6)$, so ${mid ? "the middle node" : "each end node"} gets $${mid ? "\\frac23" : "\\frac16"}\\cdot ${q}\\cdot ${h} = ${mf(F, 3)}$ kN. The sum is the whole load $qh = ${q * h}$ kN.`)]; },
 // Gauss-kvadratur for et tredjegradspolynom
 () => { const a = R.i(1, 4), b = R.i(1, 5), c = R.i(-3, 3), d = R.i(1, 6), I = 2 * b / 3 + 2 * d;
   return [T(`Bruk 2-punkts Gauss-kvadratur ($\\xi = \\pm 1/\\sqrt3$, vekt 1) på $\\int_{-1}^{1}(${a}\\xi^3 + ${b}\\xi^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}\\xi + ${d})\\,d\\xi$.`, `Use 2-point Gauss quadrature ($\\xi = \\pm 1/\\sqrt3$, weight 1) on $\\int_{-1}^{1}(${a}\\xi^3 + ${b}\\xi^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}\\xi + ${d})\\,d\\xi$.`), { n: I, tol: 0.005, u: "" },
     T(`De odde leddene ($\\xi^3$ og $\\xi$) blir motsatte i de to punktene og faller bort. Igjen: $2\\cdot(${b}\\cdot\\frac13 + ${d}) = ${mf(I, 3)}$. Det er eksakt, fordi 2 punkter integrerer grad $\\le 3$ eksakt.`, `The odd terms ($\\xi^3$ and $\\xi$) are opposite at the two points and cancel. Left: $2\\cdot(${b}\\cdot\\frac13 + ${d}) = ${mf(I, 3)}$. This is exact, since 2 points integrate degree $\\le 3$ exactly.`)]; }
);
GU("Elementtyper, mesh og feil",
 // konvergensrate
 () => { const p = R.p([1, 2]), m = R.p([1, 2]), kind = R.p(["E", "L2"]), e0 = R.p([8, 12, 16, 20, 24]), r = kind === "E" ? p : p + 1, e = e0 / Math.pow(2, r * m);
   const nb = kind === "E" ? "energifeilen" : "forskyvningsfeilen i $L^2$", en = kind === "E" ? "the energy error" : "the displacement error in $L^2$";
   return [T(`Med ${p === 1 ? "lineære" : "kvadratiske"} elementer er ${nb} ${e0} %. Du ${m === 1 ? "halverer" : "deler"} elementstørrelsen ${m === 1 ? "" : "på 4 "}(glatt løsning). Omtrent hvor stor blir feilen?`,
       `With ${p === 1 ? "linear" : "quadratic"} elements ${en} is ${e0} %. You ${m === 1 ? "halve" : "divide by 4"} the element size (smooth solution). Roughly how large does the error become?`), { n: e, tol: rel(e, 0.02, 0.01), u: "%" },
     T(`${kind === "E" ? "Energifeilen" : "$L^2$-feilen"} går som $h^{${r}}$ for grad $p = ${p}$. Faktor ${Math.pow(2, m)} på $h$ gir faktor $${Math.pow(2, m)}^{${r}} = ${Math.pow(2, r * m)}$: $${e0}/${Math.pow(2, r * m)} = ${mf(e, 3)}$ %.`,
       `${kind === "E" ? "The energy error" : "The $L^2$ error"} goes like $h^{${r}}$ for degree $p = ${p}$. A factor ${Math.pow(2, m)} in $h$ gives a factor $${Math.pow(2, m)}^{${r}} = ${Math.pow(2, r * m)}$: $${e0}/${Math.pow(2, r * m)} = ${mf(e, 3)}$ %.`)]; },
 // energi: Π(u^h) − Π(u)
 () => { const err = R.p([0.2, 0.4, 0.6, 0.8, 1.2]), Pi = -R.p([10, 20, 30, 50]), Ph = Pi + err * err / 2;
   return [T(`Den eksakte løsningen har $\\Pi(u) = ${Pi}$ J, og FEM-løsningen har energifeil $\\|u - u^h\\|_E = ${mf(err)}$ (i $\\sqrt{\\mathrm{J}}$). Hva er $\\Pi(u^h)$?`, `The exact solution has $\\Pi(u) = ${Pi}$ J, and the FEM solution has energy error $\\|u - u^h\\|_E = ${mf(err)}$ (in $\\sqrt{\\mathrm{J}}$). What is $\\Pi(u^h)$?`), { n: Ph, tol: 0.005, u: "J" },
     T(`$\\Pi(u^h) = \\Pi(u) + \\tfrac12\\|u - u^h\\|_E^2 = ${Pi} + \\tfrac12\\cdot ${mf(err)}^2 = ${mf(Ph, 3)}$ J – litt høyere enn den eksakte, fordi modellen er for stiv.`, `$\\Pi(u^h) = \\Pi(u) + \\tfrac12\\|u - u^h\\|_E^2 = ${Pi} + \\tfrac12\\cdot ${mf(err)}^2 = ${mf(Ph, 3)}$ J – slightly higher than the exact one, because the model is too stiff.`)]; }
);
})();
