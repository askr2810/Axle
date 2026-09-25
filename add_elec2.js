// ============================================================
//  add_elec2.js – teori, faste oppgaver og generatorer for
//  ELEK (Elektronikk) og ELFT2500 (Innebygde systemer og måleteknikk)
// ============================================================
(() => {

// ================= ELEK – enhet 0: Dioder og transistorer =================
THEORY("ELEK", 0, {
nb: `## Hva handler det om?
En diode er en komponent som (nesten) bare slipper strøm gjennom i én retning, og en transistor er en komponent som lar en liten strøm eller spenning styre en mye større strøm. Sammen gjør de det mulig å likerette vekselspenning, stabilisere spenninger, forsterke signaler og bygge digitale svitsjer – grunnlaget for strømforsyninger, sensorgrensesnitt og logikk.

## Begreper og formler
- Silisiumdiode i lederetning: spenningsfallet er omtrent konstant, $V_D \\approx 0{,}7$ V, nesten uavhengig av strømmen.
- Diode i sperreretning: den leder (nesten) ikke strøm, helt til gjennombruddsspenningen nås.
- Zenerdiode: brukes bakvendt (i sperreretning) for å holde en fast spenning $V_Z$. Enkel spenningsregulator: en seriemotstand $R_S$ mellom kilden $V_{inn}$ og zenerdioden, $R_S = \\dfrac{V_{inn} - V_Z}{I_Z}$, der $I_Z$ er ønsket zenerstrøm.
- LED: fungerer som en diode med et større spenningsfall (ofte 1,8–3,3 V). Trenger alltid en seriemotstand: $R = \\dfrac{V_{forsyning} - V_{LED}}{I_{LED}}$.
- BJT: $I_C = \\beta I_B$ i **aktivt område**. I **avstengt** område (cutoff) er $I_B \\approx 0$ og transistoren leder ikke. I **metning** (saturation) er $V_{CE}$ svært lav (typisk 0,1–0,3 V) uavhengig av $\\beta$ – transistoren oppfører seg som en lukket bryter, og $I_C$ bestemmes da av resten av kretsen, ikke av $\\beta I_B$.
- MOSFET: styres av spenningen $V_{GS}$ mellom gate og source. Gaten trekker nesten ingen likestrøm.
- Brolikeretter: fire dioder gjør begge halvperiodene av en vekselspenning om til samme polaritet; en glattekondensator etter brua reduserer rippelspenningen.

## Slik løser du oppgavene
1. Se om komponenten er en diode, zenerdiode, LED eller transistor, og hvilket område den jobber i (lederetning/sperreretning, aktivt/metning/avstengt).
2. For dioder: sett $V_D \\approx 0{,}7$ V (silisium) i lederetning, og regn strømmen fra Ohms lov på resten av kretsen.
3. For zener-/LED-regulatorer: bruk $R = (V_{inn} - V_{diode})/I$, og pass på at alle spenninger og strømmer er i samme enhet.
4. For BJT: sjekk om oppgaven oppgir at transistoren er i aktivt område ($I_C = \\beta I_B$) eller i metning (da bestemmes $I_C$ av lastkretsen).
5. Kontroller svaret: er strømmen og spenningen realistiske (mA/V-nivå, ikke A/kV)?

### Eksempel
En zenerdiode med $V_Z = 5{,}6$ V skal stabilisere spenningen fra en 12 V-kilde. Ønsket zenerstrøm er 20 mA. Hvor stor seriemotstand trengs?
1. Spenningen som skal falle over motstanden: $V_{inn} - V_Z = 12 - 5{,}6 = 6{,}4$ V.
2. $R_S = \\dfrac{6{,}4}{0{,}02} = 320$ Ω.

Svar: $R_S = 320$ Ω.

## Vanlige feil
- Å tro at $I_C = \\beta I_B$ gjelder i metning – der bestemmes $I_C$ av lastkretsen, ikke av $\\beta$.
- Å glemme seriemotstanden for en LED og koble den rett på en spenningskilde (den ødelegges av for høy strøm).
- Å bruke feil spenningsfall: ca. 0,7 V for silisiumdioder, 0,3 V for Schottky, 1,8–3,3 V for LED, avhengig av farge.
- Å blande mA og A, eller kΩ og Ω, i samme utregning.

> En diode slipper strøm i én retning med et nesten konstant spenningsfall; en BJT er strømstyrt ($I_C = \\beta I_B$) i aktivt område, men oppfører seg som en bryter i metning; en MOSFET styres av spenning.`,
en: `## What is it about?
A diode is a component that lets current through in (almost) only one direction, and a transistor lets a small current or voltage control a much larger current. Together they make it possible to rectify AC voltage, stabilize voltages, amplify signals and build digital switches – the foundation of power supplies, sensor interfaces and logic.

## Concepts and formulas
- Silicon diode in forward bias: the voltage drop is roughly constant, $V_D \\approx 0.7$ V, almost independent of the current.
- Diode in reverse bias: it (almost) blocks all current, until the breakdown voltage is reached.
- Zener diode: used backwards (in reverse bias) to hold a fixed voltage $V_Z$. Simple voltage regulator: a series resistor $R_S$ between the source $V_{in}$ and the zener diode, $R_S = \\dfrac{V_{in} - V_Z}{I_Z}$, where $I_Z$ is the desired zener current.
- LED: behaves like a diode with a larger voltage drop (often 1.8–3.3 V). Always needs a series resistor: $R = \\dfrac{V_{supply} - V_{LED}}{I_{LED}}$.
- BJT: $I_C = \\beta I_B$ in the **active region**. In **cutoff**, $I_B \\approx 0$ and the transistor conducts no current. In **saturation**, $V_{CE}$ is very low (typically 0.1–0.3 V) regardless of $\\beta$ – the transistor behaves like a closed switch, and $I_C$ is then set by the rest of the circuit, not by $\\beta I_B$.
- MOSFET: controlled by the voltage $V_{GS}$ between gate and source. The gate draws almost no DC current.
- Bridge rectifier: four diodes turn both half-cycles of an AC voltage into the same polarity; a smoothing capacitor after the bridge reduces the ripple voltage.

## How to solve the problems
1. Identify whether the component is a diode, zener diode, LED or transistor, and which region it operates in (forward/reverse bias, active/saturation/cutoff).
2. For diodes: use $V_D \\approx 0.7$ V (silicon) in forward bias, and find the current from Ohm's law for the rest of the circuit.
3. For zener/LED regulators: use $R = (V_{in} - V_{diode})/I$, keeping all voltages and currents in the same unit.
4. For a BJT: check whether the transistor is in the active region ($I_C = \\beta I_B$) or in saturation (then $I_C$ is set by the load circuit).
5. Check the answer: are the current and voltage realistic (mA/V range, not A/kV)?

### Example
A zener diode with $V_Z = 5.6$ V is to stabilize the voltage from a 12 V source. The desired zener current is 20 mA. What series resistance is needed?
1. Voltage that must drop across the resistor: $V_{in} - V_Z = 12 - 5.6 = 6.4$ V.
2. $R_S = \\dfrac{6.4}{0.02} = 320$ Ω.

Answer: $R_S = 320$ Ω.

## Common mistakes
- Believing $I_C = \\beta I_B$ holds in saturation – there $I_C$ is set by the load circuit, not by $\\beta$.
- Forgetting the series resistor for an LED and connecting it directly to a voltage source (it is destroyed by excess current).
- Using the wrong voltage drop: about 0.7 V for silicon diodes, 0.3 V for Schottky, 1.8–3.3 V for LEDs depending on color.
- Mixing mA and A, or kΩ and Ω, in the same calculation.

> A diode passes current in one direction with an almost constant voltage drop; a BJT is current-controlled ($I_C = \\beta I_B$) in the active region, but behaves like a switch in saturation; a MOSFET is controlled by voltage.`
});

BIQ("ELEK", 0, [
 ["Hva skjer når en vanlig diode kobles i sperreretning (under gjennombruddsspenningen)?",
  ["Den leder (nesten) ikke strøm", "Den leder like godt som i lederetning", "Spenningsfallet over den blir 0 V", "Den kortslutter kretsen"],
  "En diode i sperreretning har et sperresjikt med svært høy motstand og slipper bare gjennom en forsvinnende liten lekkasjestrøm, helt til gjennombruddsspenningen nås.",
  "What happens when an ordinary diode is connected in reverse bias (below the breakdown voltage)?",
  ["It (almost) blocks all current", "It conducts just as well as in forward bias", "The voltage drop across it becomes 0 V", "It short-circuits the circuit"],
  "A diode in reverse bias has a depletion layer with very high resistance and only lets through a tiny leakage current, until the breakdown voltage is reached."],
 ["En BJT brukes som svitsj og er i metning (saturation). Hva kjennetegner denne tilstanden?",
  ["Spenningen $V_{CE}$ er svært lav (typisk 0,1–0,3 V), og $I_C$ bestemmes av lastkretsen, ikke av $\\beta I_B$", "$I_C = \\beta I_B$ gjelder fortsatt nøyaktig", "Transistoren leder ingen strøm i det hele tatt", "Basestrømmen $I_B$ er null"],
  "I metning er begge overgangene forspent slik at $V_{CE}$ blir svært lav. Transistoren er da som en lukket bryter, og kollektorstrømmen styres av resten av kretsen, ikke av $\\beta$.",
  "A BJT is used as a switch and is in saturation. What characterizes this state?",
  ["The voltage $V_{CE}$ is very low (typically 0.1–0.3 V), and $I_C$ is set by the load circuit rather than by $\\beta I_B$", "$I_C = \\beta I_B$ still holds exactly", "The transistor conducts no current at all", "The base current $I_B$ is zero"],
  "In saturation both junctions are forward-biased so $V_{CE}$ becomes very low. The transistor then behaves like a closed switch, and the collector current is set by the rest of the circuit, not by $\\beta$."],
 ["En zenerdiode med $V_Z = 6{,}2$ V skal stabilisere spenningen fra en kilde på 15 V. Zenerstrømmen skal være 15 mA (laststrømmen neglisjeres). Hvor stor seriemotstand $R_S$ trengs?",
  { n: (15 - 6.2) / 0.015, tol: rel((15 - 6.2) / 0.015), u: "Ω" },
  "Spenningen over motstanden: $15 - 6{,}2 = 8{,}8$ V. $R_S = 8{,}8/0{,}015 \\approx 586{,}7$ Ω.",
  "A zener diode with $V_Z = 6.2$ V is to stabilize the voltage from a 15 V source. The zener current should be 15 mA (the load current is neglected). What series resistance $R_S$ is needed?",
  null,
  "Voltage across the resistor: $15 - 6.2 = 8.8$ V. $R_S = 8.8/0.015 \\approx 586.7$ Ω."]
]);

GEN("ELEK", 0,
 // middels: seriemotstand for LED
 () => { const Vs = R.p([5, 6, 9, 12, 15]), Vled = R.p([1.8, 2.0, 2.1, 2.2, 3.0, 3.2]), I = R.p([0.005, 0.01, 0.015, 0.02, 0.025, 0.03]);
   const Rr = (Vs - Vled) / I;
   return [T(`En lysdiode (LED) med spenningsfall ${nf(Vled)} V skal ha en strøm på ${nf(I * 1000)} mA fra en ${Vs} V forsyning. Hvilken seriemotstand trengs?`,
             `An LED with a forward voltage drop of ${nf(Vled)} V is to carry a current of ${nf(I * 1000)} mA from a ${Vs} V supply. What series resistor is needed?`),
     { n: Rr, tol: rel(Rr), u: "Ω" },
     T(`$R = \\dfrac{V_S - V_{LED}}{I} = \\dfrac{${mf(Vs)} - ${mf(Vled)}}{${mf(I)}} \\approx ${mf(Rr, 3)}$ Ω.`,
       `$R = \\dfrac{V_S - V_{LED}}{I} = \\dfrac{${mf(Vs)} - ${mf(Vled)}}{${mf(I)}} \\approx ${mf(Rr, 3)}$ Ω.`)]; },
 // eksamen: baseresistans for BJT-svitsj med overdrivning
 () => { const VB = R.p([3.3, 5]), IC_mA = R.i(20, 300), beta = R.p([50, 100, 150, 200, 300]);
   const IC = IC_mA / 1000, IB = 2 * IC / beta, RB = (VB - 0.7) / IB;
   return [T(`En BJT skal brukes som svitsj for å styre en last med kollektorstrøm ${IC_mA} mA. Transistoren har $\\beta = ${beta}$ og styres fra en mikrokontrollerpinne på ${VB} V. For å være sikker på metning brukes en overdrivningsfaktor på 2, altså $I_B = 2I_C/\\beta$. Hvilken baseresistans $R_B$ trengs (med $V_{BE} = 0{,}7$ V)?`,
             `A BJT is used as a switch to drive a load with collector current ${IC_mA} mA. The transistor has $\\beta = ${beta}$ and is driven from a microcontroller pin at ${VB} V. To guarantee saturation, an overdrive factor of 2 is used, i.e. $I_B = 2I_C/\\beta$. What base resistor $R_B$ is needed (with $V_{BE} = 0.7$ V)?`),
     { n: RB, tol: rel(RB), u: "Ω" },
     T(`$I_B = 2\\cdot ${IC_mA}/${beta} \\approx ${mf(IB * 1000, 3)}$ mA. $R_B = \\dfrac{V_B - V_{BE}}{I_B} = \\dfrac{${mf(VB)} - 0{,}7}{${mf(IB)}} \\approx ${mf(RB, 3)}$ Ω.`,
       `$I_B = 2\\cdot ${IC_mA}/${beta} \\approx ${mf(IB * 1000, 3)}$ mA. $R_B = \\dfrac{V_B - V_{BE}}{I_B} = \\dfrac{${mf(VB)} - 0.7}{${mf(IB)}} \\approx ${mf(RB, 3)}$ Ω.`)]; }
);

// ================= ELEK – enhet 1: Operasjonsforsterkere =================
THEORY("ELEK", 1, {
nb: `## Hva handler det om?
En operasjonsforsterker (op-amp) er en forsterker med enormt høy forsterkning som nesten alltid brukes sammen med noen få motstander og kondensatorer i tilbakekobling. Det er tilbakekoblingen, ikke op-ampens egen (uforutsigbart høye) forsterkning, som bestemmer hva kretsen gjør. Med noen få grunnkretser – inverterende og ikke-inverterende forsterker, følger, summasjon, differens, integrator og differensiator – kan du forsterke sensorsignaler, filtrere, addere spenninger og bygge komparatorer.

## Begreper og formler
- Ideell op-amp med negativ tilbakekobling: ingen strøm inn i inngangene, og de to inngangene har samme spenning (virtuell kortslutning).
- Inverterende forsterker: $A = -R_f/R_{inn}$.
- Ikke-inverterende forsterker: $A = 1 + R_f/R_g$ (alltid $\\ge 1$).
- Spenningsfølger (buffer): $A=1$, høy inngangsimpedans, lav utgangsimpedans.
- Summasjonsforsterker (inverterende): $V_o = -R_f\\left(\\dfrac{V_1}{R_1}+\\dfrac{V_2}{R_2}+\\dots\\right)$.
- Differensforsterker med matchede motstandspar ($R_3=R_1$, $R_4=R_2$): $V_o = \\dfrac{R_2}{R_1}(V_2-V_1)$.
- Integrator: $V_o = -\\dfrac{1}{RC}\\displaystyle\\int V_{inn}\\,dt$. Differensiator: $V_o = -RC\\,\\dfrac{dV_{inn}}{dt}$.
- Metning: utgangen kan aldri gå forbi forsyningsspenningene; rail-to-rail-op-amper kommer nesten helt ut til dem.
- Gain-bandwidth-produkt (GBW): for de fleste op-amper er (lukket-sløyfe-forsterkning) × (øvre grensefrekvens) $\\approx$ en konstant $=GBW$. Høyere forsterkning gir altså lavere bånd-bredde: $f_{-3dB} \\approx GBW/A$.
- Slew rate ($SR$): den maksimale hastigheten utgangen kan endre seg med, i V/µs. Tiden for et spenningssprang $\\Delta V$ er minst $t = \\Delta V/SR$.

## Slik løser du oppgavene
1. Sjekk hvilken grunnkrets det er (inverterende, ikke-inverterende, følger, sum, differens, integrator/differensiator), og bruk riktig formel.
2. For gain/bandwidth-oppgaver: finn forsterkningen $A$ først, og bruk $f_{-3dB} = GBW/A$.
3. For slew rate: finn spenningsspranget $\\Delta V$ og del på slew rate.
4. Sjekk alltid om svaret er innenfor det op-ampen faktisk klarer å levere (metning ved forsyningsspenningen).
5. Pass på fortegn: inverterende kretser gir et utgangssignal med motsatt fortegn av inngangen.

### Eksempel
En op-amp har $GBW = 2$ MHz og kobles som ikke-inverterende forsterker med $R_f = 47$ kΩ og $R_g = 1$ kΩ. Hva er øvre grensefrekvens?
1. Forsterkning: $A = 1 + 47/1 = 48$.
2. $f_{-3dB} = \\dfrac{GBW}{A} = \\dfrac{2\\text{ MHz}}{48} \\approx 41{,}7$ kHz.

Svar: omtrent 41,7 kHz.

## Vanlige feil
- Å tro at forsterkningen er uendret ved alle frekvenser – i praksis begrenser GBW bånd-bredden.
- Å bruke $A=1+R_f/R_g$ på en inverterende forsterker, eller omvendt.
- Å glemme at utgangen metter ved forsyningsspenningen, selv om den ideelle formelen gir et større tall.
- Å blande $R_f$ og $R_{inn}$ i den inverterende formelen.

> Tilbakekoblingen bestemmer forsterkningen, ikke op-ampens egen forsterkning. Men verken forsterkning eller hastighet er uendelig: GBW begrenser bånd-bredden ved høy forsterkning, og slew rate begrenser hvor fort utgangen kan endre seg.`,
en: `## What is it about?
An operational amplifier (op-amp) is an amplifier with enormously high gain that is almost always used together with a few resistors and capacitors in feedback. It is the feedback network, not the op-amp's own (unpredictably high) open-loop gain, that decides what the circuit does. With a handful of basic circuits – inverting and non-inverting amplifier, follower, summing, difference, integrator and differentiator – you can amplify sensor signals, filter, add voltages and build comparators.

## Concepts and formulas
- Ideal op-amp with negative feedback: no current flows into the inputs, and the two inputs have the same voltage (virtual short).
- Inverting amplifier: $A = -R_f/R_{in}$.
- Non-inverting amplifier: $A = 1 + R_f/R_g$ (always $\\ge 1$).
- Voltage follower (buffer): $A=1$, high input impedance, low output impedance.
- Inverting summing amplifier: $V_o = -R_f\\left(\\dfrac{V_1}{R_1}+\\dfrac{V_2}{R_2}+\\dots\\right)$.
- Difference amplifier with matched resistor pairs ($R_3=R_1$, $R_4=R_2$): $V_o = \\dfrac{R_2}{R_1}(V_2-V_1)$.
- Integrator: $V_o = -\\dfrac{1}{RC}\\displaystyle\\int V_{in}\\,dt$. Differentiator: $V_o = -RC\\,\\dfrac{dV_{in}}{dt}$.
- Saturation: the output can never go past the supply rails; rail-to-rail op-amps get very close to them.
- Gain-bandwidth product (GBW): for most op-amps, (closed-loop gain) × (upper cutoff frequency) $\\approx$ a constant $=GBW$. Higher gain therefore gives lower bandwidth: $f_{-3dB} \\approx GBW/A$.
- Slew rate ($SR$): the maximum rate the output can change, in V/µs. The time for a voltage step $\\Delta V$ is at least $t = \\Delta V/SR$.

## How to solve the problems
1. Identify which basic circuit it is (inverting, non-inverting, follower, sum, difference, integrator/differentiator), and use the matching formula.
2. For gain/bandwidth problems: find the gain $A$ first, then use $f_{-3dB} = GBW/A$.
3. For slew rate: find the voltage step $\\Delta V$ and divide by the slew rate.
4. Always check whether the answer is within what the op-amp can actually deliver (saturation at the supply rails).
5. Watch the sign: inverting circuits give an output with the opposite sign of the input.

### Example
An op-amp has $GBW = 2$ MHz and is used as a non-inverting amplifier with $R_f = 47$ kΩ and $R_g = 1$ kΩ. What is the upper cutoff frequency?
1. Gain: $A = 1 + 47/1 = 48$.
2. $f_{-3dB} = \\dfrac{GBW}{A} = \\dfrac{2\\text{ MHz}}{48} \\approx 41.7$ kHz.

Answer: about 41.7 kHz.

## Common mistakes
- Assuming the gain stays the same at all frequencies – in practice the GBW limits the bandwidth.
- Using $A=1+R_f/R_g$ for an inverting amplifier, or the reverse.
- Forgetting that the output saturates at the supply rails even though the ideal formula gives a larger number.
- Mixing up $R_f$ and $R_{in}$ in the inverting formula.

> The feedback network sets the gain, not the op-amp's own open-loop gain. But neither the gain nor the speed is infinite: GBW limits the bandwidth at high gain, and slew rate limits how fast the output can change.`
});

BIQ("ELEK", 1, [
 ["Hva gjør en differensiator-krets med op-amp (kondensator på inngangen, motstand i tilbakekoblingen)?",
  ["Gir en utgang proporsjonal med den deriverte av inngangssignalet", "Gir en utgang proporsjonal med integralet av inngangssignalet", "Forsterker uten å endre signalformen", "Filtrerer bort alle høye frekvenser"],
  "$V_o = -RC\\,\\dfrac{dV_{inn}}{dt}$: jo raskere inngangen endrer seg, desto større blir utgangen.",
  "What does an op-amp differentiator circuit (capacitor on the input, resistor in the feedback) do?",
  ["It gives an output proportional to the derivative of the input signal", "It gives an output proportional to the integral of the input signal", "It amplifies without changing the shape of the signal", "It filters out all high frequencies"],
  "$V_o = -RC\\,\\dfrac{dV_{in}}{dt}$: the faster the input changes, the larger the output becomes."],
 ["En op-amp har et gain-bandwidth-produkt (GBW) på 1 MHz. Forsterkningen økes fra 10 til 100. Hva skjer med den øvre grensefrekvensen (bånd-bredden)?",
  ["Den reduseres til en tidel, fra 100 kHz til 10 kHz", "Den er uendret, fordi GBW er konstant uansett forsterkning", "Den øker til det tidobbelte, fra 100 kHz til 1 MHz", "Den blir null fordi forsterkningen er for høy"],
  "Fordi (forsterkning) × (bånd-bredde) $\\approx GBW$, gir en tidobling av forsterkningen en tidel av bånd-bredden: fra 100 kHz til 10 kHz.",
  "An op-amp has a gain-bandwidth product (GBW) of 1 MHz. The gain is increased from 10 to 100. What happens to the upper cutoff frequency (bandwidth)?",
  ["It is reduced to a tenth, from 100 kHz to 10 kHz", "It is unchanged, because GBW is constant regardless of gain", "It increases tenfold, from 100 kHz to 1 MHz", "It becomes zero because the gain is too high"],
  "Since (gain) × (bandwidth) $\\approx GBW$, a tenfold increase in gain gives a tenth of the bandwidth: from 100 kHz to 10 kHz."],
 ["En op-amp har slew rate $SR = 0{,}5$ V/µs. Hvor lang tid tar det minst for utgangen å gå fra $-5$ V til $+5$ V?",
  { n: 20, tol: 0.2, u: "µs" },
  "Spenningsspranget er $\\Delta V = 5-(-5) = 10$ V. $t = \\Delta V/SR = 10/0{,}5 = 20$ µs.",
  "An op-amp has a slew rate $SR = 0.5$ V/µs. What is the minimum time for the output to go from $-5$ V to $+5$ V?",
  null,
  "The voltage step is $\\Delta V = 5-(-5) = 10$ V. $t = \\Delta V/SR = 10/0.5 = 20$ µs."]
]);

GEN("ELEK", 1,
 // middels: bånd-bredde fra GBW og forsterkning
 () => { const GBW = R.p([0.5, 1, 2, 3, 5]), A = R.p([10, 20, 25, 50, 100, 200]);
   const fc = GBW * 1000 / A;
   return [T(`En op-amp har gain-bandwidth-produkt $GBW = ${nf(GBW)}$ MHz. Den kobles som en forsterker med forsterkning $A = ${A}$. Hva er den øvre grensefrekvensen (bånd-bredden)?`,
             `An op-amp has a gain-bandwidth product $GBW = ${nf(GBW)}$ MHz. It is used in a circuit with gain $A = ${A}$. What is the upper cutoff frequency (bandwidth)?`),
     { n: fc, tol: rel(fc), u: "kHz" },
     T(`$f_{-3dB} = GBW/A = ${mf(GBW)}\\text{ MHz}/${A} \\approx ${mf(fc, 3)}$ kHz.`,
       `$f_{-3dB} = GBW/A = ${mf(GBW)}\\text{ MHz}/${A} \\approx ${mf(fc, 3)}$ kHz.`)]; },
 // eksamen: differensforsterker med matchede motstandspar
 () => { const R1 = R.p([4.7, 10, 22]), R2 = R.p([10, 22, 47]), V1 = R.f(-2, 2, 0.5), V2 = R.f(-2, 2, 0.5);
   const Vo = (R2 / R1) * (V2 - V1);
   return [T(`En differensforsterker med op-amp har matchede motstandspar $R_1=R_3=${nf(R1)}$ kΩ og $R_2=R_4=${nf(R2)}$ kΩ. Inngangene er $V_1=${nf(V1)}$ V og $V_2=${nf(V2)}$ V. Hva er $V_o$?`,
             `A difference amplifier (op-amp) has matched resistor pairs $R_1=R_3=${nf(R1)}$ kΩ and $R_2=R_4=${nf(R2)}$ kΩ. The inputs are $V_1=${nf(V1)}$ V and $V_2=${nf(V2)}$ V. What is $V_o$?`),
     { n: Vo, tol: rel(Vo, 0.01, 0.02), u: "V" },
     T(`$V_o = \\dfrac{R_2}{R_1}(V_2-V_1) = \\dfrac{${mf(R2)}}{${mf(R1)}}\\cdot(${mf(V2)} - (${mf(V1)})) \\approx ${mf(Vo, 3)}$ V.`,
       `$V_o = \\dfrac{R_2}{R_1}(V_2-V_1) = \\dfrac{${mf(R2)}}{${mf(R1)}}\\cdot(${mf(V2)} - (${mf(V1)})) \\approx ${mf(Vo, 3)}$ V.`)]; }
);

// ================= ELEK – enhet 2: Filtre og signaler =================
THEORY("ELEK", 2, {
nb: `## Hva handler det om?
Et filter former hvordan en krets reagerer på ulike frekvenser: et lavpassfilter slipper gjennom lave frekvenser og demper høye, et høypassfilter er motsatt, og et båndpassfilter slipper gjennom et bestemt frekvensområde. Filtre brukes overalt – til å fjerne støy, hindre aliasing før en ADC, koble bort DC-nivå (AC-kobling) og forme lydsignaler. Nøkkelen til å beskrive forsterkning over mange tiår med frekvens er desibelskalaen (dB), en logaritmisk skala som gjør at man kan legge sammen i stedet for å gange.

## Begreper og formler
- Knekkfrekvens for RC-lavpass: $f_c = \\dfrac{1}{2\\pi RC}$. Samme formel for et RC-høypass.
- Amplitudeforhold for et førsteordens lavpass: $|H(f)| = \\dfrac{1}{\\sqrt{1+(f/f_c)^2}}$. Ved $f=f_c$ er $|H|=1/\\sqrt2 \\approx 0{,}707$ (−3 dB).
- Desibel for spenning/strøm (forsterkning $A = V_{ut}/V_{inn}$): $dB = 20\\log_{10}A$. For effekt: $dB = 10\\log_{10}(P_{ut}/P_{inn})$ (faktoren er 20 for spenning/strøm fordi effekt $\\propto V^2$).
- Dempning i dB for et førsteordens filter: $dB(f) = 20\\log_{10}|H(f)| = -20\\log_{10}\\sqrt{1+(f/f_c)^2}$.
- Fase for et førsteordens lavpass: $\\varphi(f) = -\\arctan(f/f_c)$. Ved $f=f_c$ er $\\varphi=-45°$.
- Roll-off (helning langt fra $f_c$): 20 dB/dekade per orden. Et andreordens filter (to RC-ledd) faller 40 dB/dekade.
- Båndpassfilter: høypass (knekk $f_1$) etterfulgt av lavpass (knekk $f_2 > f_1$); båndbredde $BW=f_2-f_1$.
- SNR (signal-støy-forhold): $SNR_{dB}=10\\log_{10}(P_s/P_n)$.

## Slik løser du oppgavene
1. Identifiser filtertype (lav-, høy- eller båndpass) og finn knekkfrekvensen(e) fra $f_c=1/(2\\pi RC)$.
2. Skal du finne dempning i dB ved en gitt frekvens: regn $|H|$ først, og ta så $20\\log_{10}|H|$.
3. Skal du finne $R$ eller $C$ for en ønsket $f_c$: løs formelen for den ukjente, f.eks. $C=1/(2\\pi Rf_c)$.
4. For båndpass: finn $f_1$ og $f_2$ hver for seg, og trekk fra for å finne båndbredden.
5. Husk at $\\log_{10}$ av et forhold mindre enn 1 gir et negativt tall (dempning), og over 1 gir et positivt tall (forsterkning).

### Eksempel
En forsterker har $V_{inn}=50$ mV og $V_{ut}=2$ V. Hva er forsterkningen i dB?
1. Spenningsforsterkning: $A = V_{ut}/V_{inn} = 2/0{,}05 = 40$.
2. $dB = 20\\log_{10}40 \\approx 32{,}0$ dB.

Svar: omtrent 32,0 dB.

## Vanlige feil
- Å bruke $10\\log_{10}$ på en spennings- eller strømforsterkning i stedet for $20\\log_{10}$.
- Å tro at −3 dB betyr at signalet er borte – det betyr omtrent halv effekt (71 % amplitude).
- Å blande fortegn: dempning gir negativ dB, forsterkning gir positiv dB.
- Å bruke hele frekvensen $f$ i stedet for forholdet $f/f_c$ i formlene for amplitude og fase.

> Desibel er en logaritmisk skala: $20\\log_{10}A$ for spenning/strøm, $10\\log_{10}$ for effekt. Ved knekkfrekvensen er dempningen alltid −3 dB og fasen alltid −45°, uansett hvilke $R$ og $C$ som er brukt.`,
en: `## What is it about?
A filter shapes how a circuit responds to different frequencies: a low-pass filter passes low frequencies and attenuates high ones, a high-pass filter is the opposite, and a band-pass filter passes a specific range of frequencies. Filters are everywhere – removing noise, preventing aliasing before an ADC, blocking a DC level (AC coupling), and shaping audio signals. The key to describing gain over many decades of frequency is the decibel (dB) scale, a logarithmic scale that lets you add instead of multiply.

## Concepts and formulas
- Cutoff frequency of an RC low-pass: $f_c = \\dfrac{1}{2\\pi RC}$. Same formula for an RC high-pass.
- Amplitude ratio of a first-order low-pass: $|H(f)| = \\dfrac{1}{\\sqrt{1+(f/f_c)^2}}$. At $f=f_c$, $|H|=1/\\sqrt2 \\approx 0.707$ (−3 dB).
- Decibels for voltage/current (gain $A = V_{out}/V_{in}$): $dB = 20\\log_{10}A$. For power: $dB = 10\\log_{10}(P_{out}/P_{in})$ (the factor is 20 for voltage/current because power $\\propto V^2$).
- Attenuation in dB for a first-order filter: $dB(f) = 20\\log_{10}|H(f)| = -20\\log_{10}\\sqrt{1+(f/f_c)^2}$.
- Phase of a first-order low-pass: $\\varphi(f) = -\\arctan(f/f_c)$. At $f=f_c$, $\\varphi=-45°$.
- Roll-off (slope far from $f_c$): 20 dB/decade per order. A second-order filter (two RC stages) falls 40 dB/decade.
- Band-pass filter: high-pass (cutoff $f_1$) followed by low-pass (cutoff $f_2 > f_1$); bandwidth $BW=f_2-f_1$.
- SNR (signal-to-noise ratio): $SNR_{dB}=10\\log_{10}(P_s/P_n)$.

## How to solve the problems
1. Identify the filter type (low-, high- or band-pass) and find the cutoff frequency (or frequencies) from $f_c=1/(2\\pi RC)$.
2. To find the attenuation in dB at a given frequency: compute $|H|$ first, then take $20\\log_{10}|H|$.
3. To find $R$ or $C$ for a desired $f_c$: solve the formula for the unknown, e.g. $C=1/(2\\pi Rf_c)$.
4. For a band-pass filter: find $f_1$ and $f_2$ separately, and subtract to get the bandwidth.
5. Remember that $\\log_{10}$ of a ratio below 1 gives a negative number (attenuation), and above 1 gives a positive number (gain).

### Example
An amplifier has $V_{in}=50$ mV and $V_{out}=2$ V. What is the gain in dB?
1. Voltage gain: $A = V_{out}/V_{in} = 2/0.05 = 40$.
2. $dB = 20\\log_{10}40 \\approx 32.0$ dB.

Answer: about 32.0 dB.

## Common mistakes
- Using $10\\log_{10}$ for a voltage or current gain instead of $20\\log_{10}$.
- Thinking that −3 dB means the signal is gone – it means roughly half the power (71% amplitude).
- Mixing up the sign: attenuation gives negative dB, gain gives positive dB.
- Using the raw frequency $f$ instead of the ratio $f/f_c$ in the amplitude and phase formulas.

> Decibels are a logarithmic scale: $20\\log_{10}A$ for voltage/current, $10\\log_{10}$ for power. At the cutoff frequency, the attenuation is always −3 dB and the phase is always −45°, no matter what $R$ and $C$ are used.`
});

BIQ("ELEK", 2, [
 ["Et RC-lavpassfilter har knekkfrekvens $f_c$. Hva skjer med amplituden til et signal med frekvens langt under $f_c$ (der $f \\ll f_c$)?",
  ["Den er omtrent uendret (forsterkning ≈ 1, altså 0 dB)", "Den er null", "Den dobles", "Den er alltid −3 dB, uansett frekvens"],
  "For $f \\ll f_c$ er $f/f_c \\approx 0$, så $|H| = 1/\\sqrt{1+(f/f_c)^2} \\approx 1$: signalet slipper nesten uendret gjennom.",
  "An RC low-pass filter has cutoff frequency $f_c$. What happens to the amplitude of a signal with frequency far below $f_c$ (where $f \\ll f_c$)?",
  ["It is roughly unchanged (gain ≈ 1, i.e. 0 dB)", "It is zero", "It doubles", "It is always −3 dB, regardless of frequency"],
  "For $f \\ll f_c$, $f/f_c \\approx 0$, so $|H| = 1/\\sqrt{1+(f/f_c)^2} \\approx 1$: the signal passes through almost unchanged."],
 ["En forsterker har $V_{inn} = 50$ mV og $V_{ut} = 2$ V. Hva er forsterkningen i dB?",
  { n: 20 * Math.log10(2 / 0.05), tol: 0.3, u: "dB" },
  "$A = V_{ut}/V_{inn} = 2/0{,}05 = 40$. $dB = 20\\log_{10}40 \\approx 32{,}0$ dB.",
  "An amplifier has $V_{in} = 50$ mV and $V_{out} = 2$ V. What is the gain in dB?",
  null,
  "$A = V_{out}/V_{in} = 2/0.05 = 40$. $dB = 20\\log_{10}40 \\approx 32.0$ dB."],
 ["Hvilken fase har utgangen i forhold til inngangen ved knekkfrekvensen til et RC-lavpassfilter?",
  ["−45°", "0°", "−90°", "−180°"],
  "$\\varphi(f) = -\\arctan(f/f_c)$. Ved $f=f_c$ er $f/f_c=1$, og $\\arctan 1 = 45°$, så $\\varphi=-45°$.",
  "What phase does the output have relative to the input at the cutoff frequency of an RC low-pass filter?",
  ["−45°", "0°", "−90°", "−180°"],
  "$\\varphi(f) = -\\arctan(f/f_c)$. At $f=f_c$, $f/f_c=1$, and $\\arctan 1 = 45°$, so $\\varphi=-45°$."]
]);

GEN("ELEK", 2,
 // middels: dempning i dB ved et multiplum av knekkfrekvensen
 () => { const fc = R.p([50, 100, 200, 500, 1000, 2000, 5000]), k = R.p([2, 3, 4, 5, 10]);
   const f = fc * k, dB = 20 * Math.log10(1 / Math.sqrt(1 + k * k));
   return [T(`Et førsteordens RC-lavpassfilter har knekkfrekvens $f_c = ${nf(fc)}$ Hz. Hvor mange dB er signalet dempet ved $f = ${nf(f)}$ Hz?`,
             `A first-order RC low-pass filter has cutoff frequency $f_c = ${nf(fc)}$ Hz. By how many dB is the signal attenuated at $f = ${nf(f)}$ Hz?`),
     { n: dB, tol: rel(dB, 0.01, 0.3), u: "dB" },
     T(`$f/f_c = ${k}$. $|H| = 1/\\sqrt{1+${k * k}} \\approx ${mf(1 / Math.sqrt(1 + k * k), 3)}$. $dB = 20\\log_{10}|H| \\approx ${mf(dB, 3)}$ dB.`,
       `$f/f_c = ${k}$. $|H| = 1/\\sqrt{1+${k * k}} \\approx ${mf(1 / Math.sqrt(1 + k * k), 3)}$. $dB = 20\\log_{10}|H| \\approx ${mf(dB, 3)}$ dB.`)]; },
 // eksamen: båndbredde til et to-trinns RC-båndpassfilter
 () => { const R1 = R.p([2.2, 4.7, 10, 22]), C1 = R.p([100, 220, 470, 1000]), R2 = R.p([1, 2.2, 4.7, 10]), C2 = R.p([1, 2.2, 4.7, 10]);
   const f1 = 1 / (2 * Math.PI * R1 * 1000 * C1 * 1e-9), f2 = 1 / (2 * Math.PI * R2 * 1000 * C2 * 1e-9), BW = f2 - f1;
   return [T(`Et audiobåndpassfilter lages ved å koble et RC-høypassfilter ($R_1=${nf(R1)}$ kΩ, $C_1=${nf(C1)}$ nF) etter et RC-lavpassfilter ($R_2=${nf(R2)}$ kΩ, $C_2=${nf(C2)}$ nF). Hva er filterets båndbredde?`,
             `An audio band-pass filter is built by cascading an RC high-pass filter ($R_1=${nf(R1)}$ kΩ, $C_1=${nf(C1)}$ nF) with an RC low-pass filter ($R_2=${nf(R2)}$ kΩ, $C_2=${nf(C2)}$ nF). What is the filter's bandwidth?`),
     { n: BW, tol: rel(BW), u: "Hz" },
     T(`Nedre knekk: $f_1 = 1/(2\\pi R_1C_1) \\approx ${mf(f1, 3)}$ Hz. Øvre knekk: $f_2 = 1/(2\\pi R_2C_2) \\approx ${mf(f2, 3)}$ Hz. Båndbredde: $BW = f_2-f_1 \\approx ${mf(BW, 3)}$ Hz.`,
       `Lower cutoff: $f_1 = 1/(2\\pi R_1C_1) \\approx ${mf(f1, 3)}$ Hz. Upper cutoff: $f_2 = 1/(2\\pi R_2C_2) \\approx ${mf(f2, 3)}$ Hz. Bandwidth: $BW = f_2-f_1 \\approx ${mf(BW, 3)}$ Hz.`)]; }
);

// ================= ELFT2500 – enhet 0: Tallsystemer og digital logikk =================
THEORY("ELFT2500", 0, {
nb: `## Hva handler det om?
Datamaskiner og mikrokontrollere lagrer og regner med alt som binære tall (0-er og 1-ere). For å lese og skrive kode effektivt bruker ingeniører også heksadesimale tall som en kompakt stenografi for binærtall, og de må vite hvordan negative tall representeres i et fast antall biter. Digital logikk – porter som AND, OR, NOT og XOR – er byggesteinene alle disse operasjonene til slutt bygges av, både i maskinvare og i uttrykk i C-kode.

## Begreper og formler
- Posisjonssystemer: et siffer på plass $k$ (fra 0, regnet fra høyre) har vekt $b^k$, der $b$ er grunntallet ($b=2$ binært, $b=16$ heksadesimalt, $b=10$ desimalt).
- Heksadesimalt: sifrene 0–9, A–F (A=10 … F=15). To heksadesimale siffer utgjør nøyaktig én byte (8 bit).
- $n$-bits usignert heltall: verdiområde $0$ til $2^n-1$.
- $n$-bits signert heltall (toerkomplement): verdiområde $-2^{n-1}$ til $2^{n-1}-1$. Øverste bit er 1 for negative tall. Et negativt tall $-x$ representeres som det usignerte tallet $2^n - x$.
- Bitvise operatorer i C: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT/komplement), \`<<\`/\`>>\` (skift). Skift til venstre med $k$ tilsvarer å gange med $2^k$.
- Logiske porter: AND gir 1 bare når begge innganger er 1. OR gir 1 når minst én inngang er 1. XOR gir 1 når inngangene er ulike. NOT snur en enkelt inngang. NAND/NOR er AND/OR etterfulgt av NOT.
- ADC-oppløsning: en $n$-bits ADC med referansespenning $V_{ref}$ har trinnstørrelse $\\Delta = V_{ref}/2^n$.

## Slik løser du oppgavene
1. Konvertering mellom grunntall: gang hvert siffer med grunntallets potens og summer (til desimalt), eller trekk fra størst mulig potens gjentatte ganger (fra desimalt).
2. Toerkomplement, negativt tall til bitmønster: regn $2^n - |x|$ og skriv det som et usignert binært/heksadesimalt tall.
3. Toerkomplement, bitmønster til tall: hvis øverste bit er 1, trekk $2^n$ fra den usignerte verdien.
4. Bitvise operatorer: skriv ut hvert tall i binær og regn bit for bit.
5. Logiske porter: sett opp en sannhetstabell hvis du er usikker, eller husk regelen for hver port.

### Eksempel
Hva er $-5$ skrevet som 8-bits toerkomplement, i heksadesimalt?
1. Usignert bitmønster: $2^8 - 5 = 256 - 5 = 251$.
2. $251$ i heksadesimalt: $251 = 15\\cdot16 + 11 = \\mathrm{FB}$.

Svar: \`0xFB\`.

## Vanlige feil
- Å glemme at det øverste bitet avgjør fortegnet i toerkomplement, og at man må trekke fra $2^n$ (ikke bare snu fortegnet på biten).
- Å blande bitvis AND (\`&\`) med logisk AND (\`&&\`), eller bitvis OR (\`|\`) med logisk OR (\`||\`) – de bitvise operatorene jobber bit for bit på hele tallet.
- Å tro at en 8-bits usignert verdi kan bli opptil 256 – den største verdien er $255=2^8-1$.
- Å regne ADC-oppløsning med $2^n-1$ i stedet for $2^n$ – standard er trinnstørrelse $\\Delta=V_{ref}/2^n$.

> Et $n$-bits usignert tall dekker $0$ til $2^n-1$; et $n$-bits signert (toerkomplement) tall dekker $-2^{n-1}$ til $2^{n-1}-1$, og et negativt tall $-x$ er bitmønsteret til $2^n-x$.`,
en: `## What is it about?
Computers and microcontrollers store and compute with everything as binary numbers (0s and 1s). To read and write code efficiently, engineers also use hexadecimal numbers as a compact shorthand for binary, and they need to know how negative numbers are represented in a fixed number of bits. Digital logic – gates such as AND, OR, NOT and XOR – are the building blocks all of these operations are ultimately built from, both in hardware and in expressions in C code.

## Concepts and formulas
- Positional number systems: a digit at position $k$ (from 0, counted from the right) has weight $b^k$, where $b$ is the base ($b=2$ binary, $b=16$ hexadecimal, $b=10$ decimal).
- Hexadecimal: digits 0–9, A–F (A=10 … F=15). Two hex digits make exactly one byte (8 bits).
- $n$-bit unsigned integer: range $0$ to $2^n-1$.
- $n$-bit signed integer (two's complement): range $-2^{n-1}$ to $2^{n-1}-1$. The top bit is 1 for negative numbers. A negative number $-x$ is represented as the unsigned number $2^n - x$.
- Bitwise operators in C: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT/complement), \`<<\`/\`>>\` (shift). Shifting left by $k$ is the same as multiplying by $2^k$.
- Logic gates: AND gives 1 only when both inputs are 1. OR gives 1 when at least one input is 1. XOR gives 1 when the inputs differ. NOT inverts a single input. NAND/NOR are AND/OR followed by NOT.
- ADC resolution: an $n$-bit ADC with reference voltage $V_{ref}$ has a step size $\\Delta = V_{ref}/2^n$.

## How to solve the problems
1. Converting between bases: multiply each digit by the base's power and sum (to decimal), or repeatedly subtract the largest possible power (from decimal).
2. Two's complement, negative number to bit pattern: compute $2^n - |x|$ and write it as an unsigned binary/hex number.
3. Two's complement, bit pattern to number: if the top bit is 1, subtract $2^n$ from the unsigned value.
4. Bitwise operators: write out each number in binary and work bit by bit.
5. Logic gates: build a truth table if unsure, or remember the rule for each gate.

### Example
What is $-5$ written as 8-bit two's complement, in hexadecimal?
1. Unsigned bit pattern: $2^8 - 5 = 256 - 5 = 251$.
2. $251$ in hexadecimal: $251 = 15\\cdot16 + 11 = \\mathrm{FB}$.

Answer: \`0xFB\`.

## Common mistakes
- Forgetting that the top bit determines the sign in two's complement, and that you must subtract from $2^n$ (not just flip the sign of the bit).
- Confusing bitwise AND (\`&\`) with logical AND (\`&&\`), or bitwise OR (\`|\`) with logical OR (\`||\`) – the bitwise operators work bit by bit on the whole number.
- Thinking an 8-bit unsigned value can reach 256 – the largest value is $255=2^8-1$.
- Computing ADC resolution with $2^n-1$ instead of $2^n$ – the standard is a step size of $\\Delta=V_{ref}/2^n$.

> An $n$-bit unsigned number covers $0$ to $2^n-1$; an $n$-bit signed (two's complement) number covers $-2^{n-1}$ to $2^{n-1}-1$, and a negative number $-x$ is the bit pattern of $2^n-x$.`
});

BIQ("ELFT2500", 0, [
 ["Hvilken logisk port gir utgang 1 bare når BEGGE innganger er 1?",
  ["AND", "OR", "XOR", "NOT"],
  "AND-porten er 1 kun når alle innganger er 1; ellers er den 0.",
  "Which logic gate gives an output of 1 only when BOTH inputs are 1?",
  ["AND", "OR", "XOR", "NOT"],
  "The AND gate is 1 only when all inputs are 1; otherwise it is 0."],
 ["Hva er $-5$ som 8-bits toerkomplement, i heksadesimalt?",
  ["0xFB", "0x05", "0xF5", "0xFA"],
  "Usignert bitmønster: $2^8-5=256-5=251=\\mathrm{0xFB}$.",
  "What is $-5$ as 8-bit two's complement, in hexadecimal?",
  ["0xFB", "0x05", "0xF5", "0xFA"],
  "Unsigned bit pattern: $2^8-5=256-5=251=\\mathrm{0xFB}$."],
 ["Hva er den minste (mest negative) verdien et 16-bits heltall med fortegn (toerkomplement) kan ha?",
  { n: -32768, tol: 0, u: "" },
  "Verdiområdet er $-2^{15}$ til $2^{15}-1$, altså $-32768$ til $32767$. Minsteverdien er $-32768$.",
  "What is the smallest (most negative) value a 16-bit signed integer (two's complement) can have?",
  null,
  "The range is $-2^{15}$ to $2^{15}-1$, i.e. $-32768$ to $32767$. The smallest value is $-32768$."]
]);

GEN("ELFT2500", 0,
 // middels: sannhetstabell for en logisk port
 () => { const gate = R.p(["AND", "OR", "XOR", "NAND", "NOR"]), a = R.i(0, 1), b = R.i(0, 1);
   const out = gate === "AND" ? (a & b) : gate === "OR" ? (a | b) : gate === "XOR" ? (a ^ b) : gate === "NAND" ? (1 - (a & b)) : (1 - (a | b));
   const RULE = { AND: ["AND er 1 bare når begge innganger er 1", "AND is 1 only when both inputs are 1"],
     OR: ["OR er 1 når minst én inngang er 1", "OR is 1 when at least one input is 1"],
     XOR: ["XOR er 1 når inngangene er ulike", "XOR is 1 when the inputs differ"],
     NAND: ["NAND er NOT(AND): motsatt av AND", "NAND is NOT(AND): the opposite of AND"],
     NOR: ["NOR er NOT(OR): motsatt av OR", "NOR is NOT(OR): the opposite of OR"] }[gate];
   return [T(`Hva er utgangen til en ${gate}-port med innganger $A=${a}$ og $B=${b}$?`,
             `What is the output of a ${gate} gate with inputs $A=${a}$ and $B=${b}$?`),
     { n: out, tol: 0, u: "" },
     T(`${RULE[0]}. Med $A=${a}$ og $B=${b}$ blir utgangen $${out}$.`,
       `${RULE[1]}. With $A=${a}$ and $B=${b}$ the output is $${out}$.`)]; },
 // eksamen: kode negativt tall som 8-bits toerkomplement
 () => { const x = R.i(1, 128), pattern = 256 - x;
   return [T(`Hvilket usignert (positivt) 8-bits tall tilsvarer bitmønsteret til $-${x}$ i toerkomplement?`,
             `What unsigned (positive) 8-bit number corresponds to the bit pattern of $-${x}$ in two's complement?`),
     { n: pattern, tol: 0, u: "" },
     T(`Bitmønsteret til et negativt tall $-x$ er $2^8-x$: $256-${x}=${pattern}$.`,
       `The bit pattern of a negative number $-x$ is $2^8-x$: $256-${x}=${pattern}$.`)]; }
);

// ================= ELFT2500 – enhet 1: Mikrokontrollere =================
THEORY("ELFT2500", 1, {
nb: `## Hva handler det om?
En mikrokontroller er en liten datamaskin på én brikke: prosessor, minne og inn/ut-pinner (GPIO) samlet, laget for å styre og lese av omgivelsene i sanntid. Den kobles til sensorer og aktuatorer via digitale og analoge grensesnitt, holder styr på tid med timere, og reagerer raskt på hendelser med avbrudd. Å forstå klokkefrekvens, kommunikasjonsprotokoller og minnetyper er nødvendig for både å skrive fungerende kode og å anslå om den rekker jobben i tide.

## Begreper og formler
- GPIO-pinne: en generell inn/ut-pinne som settes opp i programvare som inngang (leser spenning) eller utgang (driver spenning høy/lav).
- Pull-up/pull-down-motstand: gir en inngang et definert nivå når ingenting annet driver den (f.eks. en åpen bryter).
- PWM: et digitalt signal som svitsjer mellom høy og lav med en bestemt duty cycle $D$ (andelen av perioden signalet er høyt). Gjennomsnittsspenning: $V_{gj} = D\\cdot V_{høy}$.
- Klokkefrekvens og instruksjonstid: en instruksjon som tar $c$ klokkesykler på en klokke $f$, tar tiden $t = c/f$.
- Timer med prescaler $P$ og telleverdi $N$: periode mellom overflyt $= (N+1)\\cdot P/f_{klokke}$.
- UART: asynkron seriell kommunikasjon (ingen felles klokke), med en baudrate og et fast antall bit per overført ord (f.eks. 1 start + 8 data + 1 stopp = 10 bit).
- SPI: synkron, med felles klokke (SCK), egen chip select (CS) per enhet, datalinjer MOSI/MISO. Ingen start-/stoppbit, så gjennomstrømning $= f_{SCK}/8$ byte/s.
- I²C: synkron, to linjer (SDA, SCL) med åpen-drain-utganger og pull-up-motstander – enhetene kan bare trekke linjen lav, aldri drive den aktivt høy, derfor trengs pull-up for å få linjen høy igjen.
- Avbrudd (interrupt): CPU-en hopper til en avbruddsrutine (ISR) når en hendelse skjer, i stedet for å sjekke (polle) kontinuerlig.
- Minne: RAM er flyktig (mister innhold uten strøm, brukes til variabler), flash/EEPROM er ikke-flyktig (beholder innhold, brukes til programkode/lagrede data).

## Slik løser du oppgavene
1. Identifiser hva slags størrelse du skal finne: spenning/duty cycle, tidsintervall, eller byte-/bitrate.
2. For PWM: bruk $V_{gj}=D\\cdot V_{høy}$, eller finn $D$ fra pulslengde delt på periode.
3. For timing: regn ut tid per klokkesykel ($1/f$) og gang med antall sykler eller instruksjoner.
4. For kommunikasjon: tell bit per overført enhet (UART har start-/stoppbit, SPI og I²C har det normalt ikke) og del klokkefrekvensen på det tallet.
5. Sjekk om svaret er realistisk: mikrosekunder for enkeltinstruksjoner, millisekunder for typiske timerperioder.

### Eksempel
Et program med 200 instruksjoner, hver på 4 klokkesykler, kjører på en mikrokontroller med klokkefrekvens 8 MHz. Hvor lang tid tar programmet?
1. Totalt antall sykler: $200\\cdot4=800$.
2. Tid per sykel: $1/(8\\cdot10^6) = 0{,}125$ µs.
3. Total tid: $800\\cdot0{,}125 = 100$ µs.

Svar: 100 µs.

## Vanlige feil
- Å telle start- og stoppbit for SPI/I²C, som ikke har dem (bare UART har det).
- Å glemme å legge til 1 i telleverdien for en timer ($N+1$ sykler, siden telleren starter på 0).
- Å blande MHz og Hz, eller µs og ms, i samme utregning.
- Å tro at en pull-up-motstand trengs på alle digitale utganger – den trengs bare der ingenting aktivt driver linjen (åpne brytere, I²C-linjer).

> Instruksjonstid $=$ sykler delt på klokkefrekvens. Kommunikasjonshastighet $=$ klokkefrekvens delt på antall bit per overført enhet (husk start-/stoppbit for UART, ikke for SPI/I²C).`,
en: `## What is it about?
A microcontroller is a small computer on a single chip: a processor, memory and input/output pins (GPIO) combined, built to control and read the environment in real time. It connects to sensors and actuators through digital and analog interfaces, keeps track of time with timers, and reacts quickly to events with interrupts. Understanding clock speed, communication protocols and memory types is necessary both to write working code and to judge whether it finishes its job in time.

## Concepts and formulas
- GPIO pin: a general-purpose input/output pin configured in software as an input (reads a voltage) or an output (drives a voltage high/low).
- Pull-up/pull-down resistor: gives an input a defined level when nothing else is driving it (e.g. an open switch).
- PWM: a digital signal that switches between high and low with a given duty cycle $D$ (the fraction of the period the signal is high). Average voltage: $V_{avg} = D\\cdot V_{high}$.
- Clock speed and instruction time: an instruction that takes $c$ clock cycles on a clock $f$ takes time $t = c/f$.
- Timer with prescaler $P$ and count value $N$: period between overflows $= (N+1)\\cdot P/f_{clock}$.
- UART: asynchronous serial communication (no shared clock), with a baud rate and a fixed number of bits per transmitted word (e.g. 1 start + 8 data + 1 stop = 10 bits).
- SPI: synchronous, with a shared clock (SCK), a separate chip select (CS) per device, data lines MOSI/MISO. No start/stop bits, so throughput $= f_{SCK}/8$ bytes/s.
- I²C: synchronous, two lines (SDA, SCL) with open-drain outputs and pull-up resistors – devices can only pull the line low, never drive it actively high, so pull-ups are needed to bring the line back high.
- Interrupt: the CPU jumps to an interrupt service routine (ISR) when an event occurs, instead of continuously checking (polling).
- Memory: RAM is volatile (loses its content without power, used for variables), flash/EEPROM is non-volatile (keeps its content, used for program code/stored data).

## How to solve the problems
1. Identify what quantity you need: voltage/duty cycle, a time interval, or a byte/bit rate.
2. For PWM: use $V_{avg}=D\\cdot V_{high}$, or find $D$ from the pulse length divided by the period.
3. For timing: find the time per clock cycle ($1/f$) and multiply by the number of cycles or instructions.
4. For communication: count the bits per transmitted unit (UART has start/stop bits, SPI and I²C normally do not) and divide the clock frequency by that number.
5. Check whether the answer is realistic: microseconds for single instructions, milliseconds for typical timer periods.

### Example
A program with 200 instructions, each taking 4 clock cycles, runs on a microcontroller with a clock speed of 8 MHz. How long does the program take?
1. Total number of cycles: $200\\cdot4=800$.
2. Time per cycle: $1/(8\\cdot10^6) = 0.125$ µs.
3. Total time: $800\\cdot0.125 = 100$ µs.

Answer: 100 µs.

## Common mistakes
- Counting start and stop bits for SPI/I²C, which do not have them (only UART does).
- Forgetting to add 1 to the count value for a timer ($N+1$ cycles, since the counter starts at 0).
- Mixing MHz and Hz, or µs and ms, in the same calculation.
- Thinking a pull-up resistor is needed on every digital output – it is only needed where nothing actively drives the line (open switches, I²C lines).

> Instruction time $=$ cycles divided by clock speed. Communication speed $=$ clock speed divided by the number of bits per transmitted unit (remember start/stop bits for UART, not for SPI/I²C).`
});

BIQ("ELFT2500", 1, [
 ["Hva er en GPIO-pinne på en mikrokontroller?",
  ["En pinne som kan settes opp i programvare som digital inngang eller utgang", "En pinne som bare kan brukes til analog inngang", "En pinne som kun brukes til programmering av brikken", "En pinne som alltid er utgang"],
  "GPIO står for general purpose input/output – programmereren velger retning (inngang/utgang) og ofte også funksjon i koden.",
  "What is a GPIO pin on a microcontroller?",
  ["A pin that can be configured in software as a digital input or output", "A pin that can only be used as an analog input", "A pin used only for programming the chip", "A pin that is always an output"],
  "GPIO stands for general purpose input/output – the programmer chooses the direction (input/output) and often the function in code."],
 ["Hvorfor må SDA- og SCL-linjene i I²C ha pull-up-motstander?",
  ["Enhetene har åpen-drain-utganger som bare kan trekke linjen lav; pull-up-motstanden trekker linjen høy igjen", "For å begrense strømmen til mikrokontrolleren", "For å øke klokkefrekvensen på bussen", "Fordi I²C er et analogt signal"],
  "Uten pull-up ville linjen flyte når ingen enhet trekker den lav, siden ingen enhet aktivt driver den høy.",
  "Why must the SDA and SCL lines in I²C have pull-up resistors?",
  ["The devices have open-drain outputs that can only pull the line low; the pull-up resistor pulls the line back high", "To limit the current to the microcontroller", "To increase the clock frequency of the bus", "Because I²C is an analog signal"],
  "Without a pull-up, the line would float whenever no device pulls it low, since no device actively drives it high."],
 ["En mikrokontroller kjører på 8 MHz, og de fleste instruksjoner tar 4 klokkesykler. Hvor lang tid tar én instruksjon?",
  { n: 0.5, tol: 0.01, u: "µs" },
  "Tid per sykel: $1/(8\\cdot10^6)=0{,}125$ µs. Én instruksjon: $4\\cdot0{,}125=0{,}5$ µs.",
  "A microcontroller runs at 8 MHz, and most instructions take 4 clock cycles. How long does one instruction take?",
  null,
  "Time per cycle: $1/(8\\cdot10^6)=0.125$ µs. One instruction: $4\\cdot0.125=0.5$ µs."]
]);

GEN("ELFT2500", 1,
 // middels: gjennomstrømning på en SPI-buss
 () => { const fSPI = R.p([125, 250, 500, 1000, 2000, 4000, 8000]);
   const fHz = fSPI * 1000, rate = fHz / 8;
   return [T(`En SPI-buss går med klokkefrekvens ${nf(fSPI)} kHz. Hvor mange byte kan overføres per sekund (ingen start-/stoppbit som i UART)?`,
             `An SPI bus runs at a clock frequency of ${nf(fSPI)} kHz. How many bytes can be transferred per second (no start/stop bits like in UART)?`),
     { n: rate, tol: rel(rate), u: "byte/s" },
     T(`Hver byte er 8 bit uten ekstra bit: $f_{SCK}/8 = ${mf(fHz)}/8 \\approx ${mf(rate, 3)}$ byte/s.`,
       `Each byte is 8 bits with no extra bits: $f_{SCK}/8 = ${mf(fHz)}/8 \\approx ${mf(rate, 3)}$ byte/s.`)]; },
 // eksamen: total kjøretid for et program med gitt antall instruksjoner
 () => { const f = R.p([1, 2, 4, 8, 16, 20]), ni = R.i(50, 500), c = R.p([1, 2, 3, 4, 6]);
   const cycles = ni * c, t_us = cycles / f;
   return [T(`Et program med ${ni} instruksjoner, hver på ${c} klokkesykler, kjører på en mikrokontroller med klokkefrekvens ${nf(f)} MHz. Hvor lang tid tar programmet?`,
             `A program with ${ni} instructions, each taking ${c} clock cycles, runs on a microcontroller with a clock speed of ${nf(f)} MHz. How long does the program take?`),
     { n: t_us, tol: rel(t_us), u: "µs" },
     T(`Totalt antall sykler: $${ni}\\cdot${c}=${cycles}$. Tid per sykel: $1/${mf(f)}\\text{ MHz} \\approx ${mf(1 / f, 4)}$ µs. Total tid: $${cycles}\\cdot${mf(1 / f, 4)} \\approx ${mf(t_us, 3)}$ µs.`,
       `Total number of cycles: $${ni}\\cdot${c}=${cycles}$. Time per cycle: $1/${mf(f)}\\text{ MHz} \\approx ${mf(1 / f, 4)}$ µs. Total time: $${cycles}\\cdot${mf(1 / f, 4)} \\approx ${mf(t_us, 3)}$ µs.`)]; }
);

// ================= ELFT2500 – enhet 2: Måleteknikk =================
THEORY("ELFT2500", 2, {
nb: `## Hva handler det om?
Måleteknikk handler om å gå fra en fysisk størrelse (temperatur, kraft, lys, bevegelse) til et pålitelig digitalt tall en mikrokontroller kan bruke. Underveis må du velge riktig sensor, forsterke/kondisjonere signalet, sample det med riktig frekvens og filtrere mot støy og aliasing – og du må vite hvor mye du kan stole på resultatet (nøyaktighet, presisjon, oppløsning).

## Begreper og formler
- Sensitivitet (følsomhet): endringen i sensorens utgang per enhet endring i målestørrelsen, f.eks. mV/°C.
- Nøyaktighet vs. presisjon: nøyaktighet er hvor nær målingene er den sanne verdien (systematisk feil), presisjon er hvor tett målingene er samlet (spredning/støy).
- Nyquist-kriteriet: samplingsfrekvensen $f_s$ må være mer enn to ganger den høyeste frekvenskomponenten i signalet, $f_s > 2f_{maks}$, ellers oppstår aliasing.
- Aliasing: et signal med frekvens $f > f_s/2$ ser etter sampling ut som en lavere frekvens $|f_s\\cdot k - f|$ for et helt tall $k$ (det som ligger nærmest 0).
- Anti-aliasing-filter: et lavpassfilter foran ADC-en som demper frekvenser over $f_s/2$ før sampling. Dempningen ved en frekvens $f$ for ett enkelt RC-ledd er $20\\log_{10}\\big(1/\\sqrt{1+(f/f_c)^2}\\big)$ dB.
- Wheatstone-bro: fire motstander i en brokobling gjør en liten motstandsendring $\\Delta R$ (f.eks. fra en strekklapp) om til en målbar differansespenning.
- Strekklapp: $\\Delta R = GF\\cdot\\varepsilon\\cdot R$, der $GF$ er gauge factor og $\\varepsilon$ er tøyningen.
- RTD (f.eks. PT100): motstanden øker tilnærmet lineært med temperaturen, $R(T) \\approx R_0+\\alpha R_0 T$, med $R_0=100$ Ω og $\\alpha\\approx 0{,}385$ Ω/°C for PT100.
- Termoelement: gir en liten spenning fra Seebeck-effekten, proporsjonal med temperaturforskjellen mellom to sammenføyninger.
- Kvantiseringsfeil: for en $n$-bits ADC med referanse $V_{ref}$ er maksimal feil $\\pm\\tfrac12$ LSB $=\\pm\\tfrac12\\cdot V_{ref}/2^n$.

## Slik løser du oppgavene
1. Avgjør hvilket begrep oppgaven handler om: sampling/aliasing, sensor/bro, eller ADC-oppløsning.
2. Sampling: sjekk om $f_s>2f_{maks}$. Hvis ikke, finn alias-frekvensen ved å folde $f$ om $f_s/2$.
3. Anti-aliasing-filter: sett $f$ og $f_c$ inn i dB-formelen, eller finn $f_c$ fra ønsket dempning.
4. RTD: sett temperaturen inn i $R(T)=R_0+\\alpha R_0 T$.
5. Strekklapp/bro: bruk $\\Delta R = GF\\cdot\\varepsilon\\cdot R$ direkte, eller regn ut broens differansespenning fra $\\Delta R$.

### Eksempel
En PT100-sensor har $R_0=100$ Ω og $\\alpha\\approx 0{,}385$ Ω/°C. Hvor stor motstand har den ved 80 °C?
1. Sett inn i formelen: $R = R_0 + \\alpha R_0\\cdot T = 100 + 0{,}385\\cdot80$.
2. $R = 100 + 30{,}8 = 130{,}8$ Ω.

Svar: 130,8 Ω.

## Vanlige feil
- Å bruke $f_s \\ge 2f_{maks}$ i stedet for $f_s>2f_{maks}$ (ved akkurat Nyquist-frekvensen er signalet fortsatt tvetydig).
- Å glemme anti-aliasing-filteret og tro at man kan fjerne alias-frekvenser i etterkant – det kan man ikke, informasjonen er borte etter sampling.
- Å forveksle nøyaktighet (liten systematisk feil) med presisjon (liten spredning) – en sensor kan være presis uten å være nøyaktig.
- Å bruke $2^n-1$ i stedet for $2^n$ i kvantiseringsformelen (standard er trinnstørrelse $V_{ref}/2^n$).

> Sample alltid raskere enn $2f_{maks}$, og filtrer bort alt over $f_s/2$ *før* sampling – aliasing kan ikke fjernes etterpå. Presis er ikke det samme som nøyaktig.`,
en: `## What is it about?
Instrumentation is about turning a physical quantity (temperature, force, light, motion) into a reliable digital number a microcontroller can use. Along the way you must choose the right sensor, amplify/condition the signal, sample it at the right frequency and filter out noise and aliasing – and you need to know how much you can trust the result (accuracy, precision, resolution).

## Concepts and formulas
- Sensitivity: the change in a sensor's output per unit change in the measured quantity, e.g. mV/°C.
- Accuracy vs. precision: accuracy is how close the measurements are to the true value (systematic error), precision is how tightly the measurements are clustered (spread/noise).
- Nyquist criterion: the sampling frequency $f_s$ must be more than twice the highest frequency component in the signal, $f_s > 2f_{max}$, otherwise aliasing occurs.
- Aliasing: a signal with frequency $f > f_s/2$ appears after sampling as a lower frequency $|f_s\\cdot k - f|$ for some integer $k$ (whichever is closest to 0).
- Anti-aliasing filter: a low-pass filter placed before the ADC that attenuates frequencies above $f_s/2$ before sampling. The attenuation at a frequency $f$ for a single RC stage is $20\\log_{10}\\big(1/\\sqrt{1+(f/f_c)^2}\\big)$ dB.
- Wheatstone bridge: four resistors in a bridge configuration turn a small resistance change $\\Delta R$ (e.g. from a strain gauge) into a measurable differential voltage.
- Strain gauge: $\\Delta R = GF\\cdot\\varepsilon\\cdot R$, where $GF$ is the gauge factor and $\\varepsilon$ is the strain.
- RTD (e.g. PT100): the resistance increases approximately linearly with temperature, $R(T) \\approx R_0+\\alpha R_0 T$, with $R_0=100$ Ω and $\\alpha\\approx 0.385$ Ω/°C for PT100.
- Thermocouple: produces a small voltage from the Seebeck effect, proportional to the temperature difference between two junctions.
- Quantization error: for an $n$-bit ADC with reference $V_{ref}$, the maximum error is $\\pm\\tfrac12$ LSB $=\\pm\\tfrac12\\cdot V_{ref}/2^n$.

## How to solve the problems
1. Work out which concept the problem is about: sampling/aliasing, sensor/bridge, or ADC resolution.
2. Sampling: check whether $f_s>2f_{max}$. If not, find the alias frequency by folding $f$ around $f_s/2$.
3. Anti-aliasing filter: plug $f$ and $f_c$ into the dB formula, or find $f_c$ for a desired attenuation.
4. RTD: plug the temperature into $R(T)=R_0+\\alpha R_0 T$.
5. Strain gauge/bridge: use $\\Delta R = GF\\cdot\\varepsilon\\cdot R$ directly, or compute the bridge's differential voltage from $\\Delta R$.

### Example
A PT100 sensor has $R_0=100$ Ω and $\\alpha\\approx 0.385$ Ω/°C. What resistance does it have at 80 °C?
1. Plug into the formula: $R = R_0 + \\alpha R_0\\cdot T = 100 + 0.385\\cdot80$.
2. $R = 100 + 30.8 = 130.8$ Ω.

Answer: 130.8 Ω.

## Common mistakes
- Using $f_s \\ge 2f_{max}$ instead of $f_s>2f_{max}$ (at exactly the Nyquist frequency the signal is still ambiguous).
- Forgetting the anti-aliasing filter and thinking alias frequencies can be removed afterward – they cannot, the information is lost once sampling has happened.
- Confusing accuracy (small systematic error) with precision (small spread) – a sensor can be precise without being accurate.
- Using $2^n-1$ instead of $2^n$ in the quantization formula (the standard is a step size of $V_{ref}/2^n$).

> Always sample faster than $2f_{max}$, and filter out everything above $f_s/2$ *before* sampling – aliasing cannot be removed afterward. Precise is not the same as accurate.`
});

BIQ("ELFT2500", 2, [
 ["Hva menes med sensitiviteten (følsomheten) til en sensor?",
  ["Endringen i utgangssignalet per enhet endring i målestørrelsen (f.eks. mV/°C)", "Den absolutte nøyaktigheten til sensoren", "Tiden det tar før sensoren svarer på en endring", "Motstanden i sensorens tilkoblingsledninger"],
  "En temperatursensor med sensitivitet 10 mV/°C gir 10 mV mer utgang for hver grad temperaturen øker.",
  "What is meant by the sensitivity of a sensor?",
  ["The change in the output signal per unit change in the measured quantity (e.g. mV/°C)", "The sensor's absolute accuracy", "The time it takes for the sensor to respond to a change", "The resistance of the sensor's connecting wires"],
  "A temperature sensor with a sensitivity of 10 mV/°C gives 10 mV more output for every degree the temperature rises."],
 ["Hvorfor gir en full Wheatstone-bro (fire aktive strekklapper) en større utgangsspenning enn en kvartbro (én aktiv strekklapp) for samme tøyning?",
  ["Alle fire armene bidrar med sin egen $\\Delta R$ til differansespenningen, i stedet for bare én", "Den bruker en høyere forsyningsspenning", "Den har færre motstander og dermed mindre støy", "Den er alltid billigere å bygge"],
  "Når alle fire armene endrer motstand med tøyningen, summeres bidragene i broens utgangsspenning i stedet for at bare én arm bidrar.",
  "Why does a full Wheatstone bridge (four active strain gauges) give a larger output voltage than a quarter bridge (one active strain gauge) for the same strain?",
  ["All four arms contribute their own $\\Delta R$ to the differential voltage, instead of just one", "It uses a higher supply voltage", "It has fewer resistors and therefore less noise", "It is always cheaper to build"],
  "When all four arms change resistance with the strain, their contributions add up in the bridge's output voltage instead of only one arm contributing."],
 ["En PT100-sensor har $R_0=100$ Ω ved 0 °C og temperaturkoeffisient $\\alpha\\approx 0{,}385$ Ω/°C. Hvor stor motstand har den ved 60 °C (lineær tilnærming)?",
  { n: 123.1, tol: 0.5, u: "Ω" },
  "$R = 100 + 0{,}385\\cdot60 = 100+23{,}1=123{,}1$ Ω.",
  "A PT100 sensor has $R_0=100$ Ω at 0 °C and temperature coefficient $\\alpha\\approx 0.385$ Ω/°C. What resistance does it have at 60 °C (linear approximation)?",
  null,
  "$R = 100 + 0.385\\cdot60 = 100+23.1=123.1$ Ω."]
]);

GEN("ELFT2500", 2,
 // middels: RTD-motstand ved en gitt temperatur
 () => { const T_ = R.p([-20, -10, 0, 10, 20, 25, 30, 40, 50, 60, 70, 90, 100, 120, 150]);
   const Rt = 100 + 0.385 * T_;
   return [T(`En PT100-sensor har $R_0=100$ Ω ved 0 °C og $\\alpha\\approx 0{,}385$ Ω/°C. Hvor stor motstand har den ved ${nf(T_)} °C (lineær tilnærming)?`,
             `A PT100 sensor has $R_0=100$ Ω at 0 °C and $\\alpha\\approx 0.385$ Ω/°C. What resistance does it have at ${nf(T_)} °C (linear approximation)?`),
     { n: Rt, tol: rel(Rt, 0.01, 0.5), u: "Ω" },
     T(`$R = R_0+\\alpha T = 100 + 0{,}385\\cdot${mf(T_)} \\approx ${mf(Rt, 4)}$ Ω.`,
       `$R = R_0+\\alpha T = 100 + 0.385\\cdot${mf(T_)} \\approx ${mf(Rt, 4)}$ Ω.`)]; },
 // eksamen: dempning fra et enkelt anti-aliasing-filter ved Nyquist-frekvensen
 () => { const fs = R.p([8000, 10000, 16000, 20000, 32000, 44100, 48000]), k = R.p([2, 3, 4, 5, 6, 8, 10]);
   const fN = fs / 2, fc = fN / k, dB = -20 * Math.log10(Math.sqrt(1 + k * k));
   return [T(`Du sampler et signal med $f_s = ${nf(fs)}$ Hz og velger et enkelt (ett-pols) RC anti-aliasing-filter med knekkfrekvens $f_c = f_s/(2\\cdot${k}) = ${nf(fc)}$ Hz. Hvor mange dB demper filteret en støykomponent nøyaktig ved Nyquist-frekvensen $f_s/2$?`,
             `You sample a signal at $f_s = ${nf(fs)}$ Hz and choose a single-pole RC anti-aliasing filter with cutoff $f_c = f_s/(2\\cdot${k}) = ${nf(fc)}$ Hz. By how many dB does the filter attenuate a noise component exactly at the Nyquist frequency $f_s/2$?`),
     { n: dB, tol: rel(dB, 0.01, 0.3), u: "dB" },
     T(`Nyquist-frekvensen er $f_N=f_s/2=${nf(fN)}$ Hz, så $f_N/f_c=${k}$. Dempning: $20\\log_{10}(1/\\sqrt{1+${k}^2}) \\approx ${mf(dB, 3)}$ dB.`,
       `The Nyquist frequency is $f_N=f_s/2=${nf(fN)}$ Hz, so $f_N/f_c=${k}$. Attenuation: $20\\log_{10}(1/\\sqrt{1+${k}^2}) \\approx ${mf(dB, 3)}$ dB.`)]; }
);

// __SLUTT__
})();
