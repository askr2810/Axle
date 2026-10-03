// ============================================================
//  FIGURER TIL FELLESFAGENE PÅ VGS (1P, 2P, naturfag, geografi, samfunnskunnskap, historie, religion og etikk).
//  Samme format som figures.js (viewBox 320 × 180). Kobles til enhetene via tittel i FIG_MAP nederst.
// ============================================================
(() => {
const C = n => `var(--c${n})`;
const soft = (n, p = 26) => `fill:color-mix(in srgb,var(--c${n}) ${p}%,var(--card));stroke:var(--c${n});stroke-width:1.6`;
const box = (x, y, w, h, n, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" style="${soft(n)}"/>`;
const tx = (x, y, s, cls = "fg-t", a = "middle") => fgT(x, y, s, cls, a);
const ar = (x1, y1, x2, y2, cls = "fg-line", w = 1.8) => fgAr(x1, y1, x2, y2, cls, w);
const circ = (x, y, r, st) => `<circle cx="${x}" cy="${y}" r="${r}" style="${st}"/>`;

Object.assign(FIGS, {
  // ---------- 1P / 2P ----------
  pct_growth: () => ({ cap: T("Vekstfaktor: 800 kr med 30 % rabatt blir 800 · 0,70 = 560 kr. Med 30 % økning blir det 800 · 1,30 = 1040 kr.", "Growth factor: 800 NOK with a 30 % discount becomes 800 · 0.70 = 560 NOK. With a 30 % increase it becomes 800 · 1.30 = 1040 NOK."), svg:
    `${box(20, 90, 60, 70, 2, 4)}${tx(50, 130, "800", "fg-b")}${tx(50, 176, T("før", "before"), "fg-s")}
     ${box(130, 111, 60, 49, 5, 4)}${tx(160, 140, "560", "fg-b")}${tx(160, 176, "· 0,70", "fg-s")}
     ${box(240, 69, 60, 91, 3, 4)}${tx(270, 118, "1040", "fg-b")}${tx(270, 176, "· 1,30", "fg-s")}
     ${ar(84, 110, 126, 128, "fg-red")}${tx(105, 104, "−30 %", "fg-s fg-redt")}${ar(84, 100, 236, 84, "fg-ok")}${tx(160, 70, "+30 %", "fg-s fg-okt")}
     <line class="fg-mut" x1="10" y1="160" x2="310" y2="160"/>` }),
  map_scale: () => ({ cap: T("Målestokk 1 : 50 000: 1 cm på kartet er 500 m i terrenget. Tette høydekurver betyr bratt.", "Scale 1 : 50,000: 1 cm on the map is 500 m on the ground. Close contour lines mean steep terrain."), svg:
    `<rect x="10" y="10" width="300" height="130" rx="10" class="fg-fill"/>
     ${[46, 36, 26, 16].map((r, i) => `<ellipse cx="${210 - i * 4}" cy="70" rx="${r * 2}" ry="${r}" class="fg-mut"/>`).join("")}${tx(206, 74, "▲ 812", "fg-s")}
     <path d="M20 118 Q90 60 150 96 T300 40" class="fg-acc" stroke-width="3" fill="none"/>${tx(60, 128, T("vei", "road"), "fg-s")}
     ${circ(40, 40, 5, "fill:var(--bad)")}${tx(52, 44, "A", "fg-b", "start")}${circ(280, 118, 5, "fill:var(--bad)")}${tx(268, 122, "B", "fg-b", "end")}
     <g><rect x="20" y="150" width="50" height="8" style="fill:var(--ink)"/><rect x="70" y="150" width="50" height="8" style="fill:var(--card);stroke:var(--ink)"/><rect x="120" y="150" width="50" height="8" style="fill:var(--ink)"/></g>
     ${tx(20, 174, "0", "fg-s")}${tx(70, 174, "500 m", "fg-s")}${tx(120, 174, "1 km", "fg-s")}${tx(170, 174, "1,5 km", "fg-s")}${tx(290, 172, "1 : 50 000", "fg-b", "end")}` }),
  stats_mm: () => { const xs = [25, 27, 28, 30, 90], X = v => 20 + (v - 20) * 3.6;
    return { cap: T("Én ekstrem verdi (90) drar gjennomsnittet opp til 40, mens medianen (28) står i ro.", "One extreme value (90) pulls the mean up to 40, while the median (28) stays put."), svg:
    `<line class="fg-line" x1="20" y1="110" x2="300" y2="110"/>${[20, 40, 60, 80, 100].map(v => `<line class="fg-mut" x1="${X(v)}" y1="106" x2="${X(v)}" y2="114"/>` + tx(X(v), 128, String(v), "fg-s")).join("")}
     ${xs.map(v => circ(X(v), 96, 7, soft(1, 60))).join("")}
     <line x1="${X(28)}" y1="40" x2="${X(28)}" y2="104" style="stroke:var(--ok);stroke-width:2.4"/>${tx(X(28), 34, T("median 28", "median 28"), "fg-b fg-okt")}
     <line x1="${X(40)}" y1="60" x2="${X(40)}" y2="104" style="stroke:var(--bad);stroke-width:2.4;stroke-dasharray:5 3"/>${tx(X(40) + 4, 56, T("gjennomsnitt 40", "mean 40"), "fg-b fg-redt", "start")}
     ${tx(160, 160, T("lønn i tusen kr", "pay in thousand NOK"), "fg-s")}` }; },
  exp_lin: () => { const X = x => 40 + x * 26, Y = y => 150 - y * 1.1;
    return { cap: T("Lineær vekst legger til like mye hver periode, eksponentiell vekst ganger med like mye. Etter hvert vinner alltid den eksponentielle.", "Linear growth adds the same amount each period, exponential growth multiplies by the same factor. Eventually exponential always wins."), svg:
    `${fgAxes(40, 150, 310, 16, T("år", "years"), "")}
     <path class="fg-acc" stroke-width="2.6" fill="none" d="${fgPath(s => [X(s), Y(20 + 8 * s)], 0, 10)}"/>
     <path class="fg-red" stroke-width="2.6" fill="none" d="${fgPath(s => [X(s), Y(20 * 1.22 ** s)], 0, 10)}"/>
     ${tx(X(10) - 4, Y(100) - 6, T("lineær: +8 per år", "linear: +8 per year"), "fg-s fg-acct", "end")}${tx(X(8.3), Y(20 * 1.22 ** 9) - 4, T("eksponentiell: ·1,22", "exponential: ·1.22"), "fg-s fg-redt", "end")}` }; },

  // ---------- naturfag ----------
  energy_flow: () => ({ cap: T("Virkningsgrad: av 100 J tilført blir bare 10 J lys i en glødepære. Resten blir varme, men energien forsvinner ikke.", "Efficiency: of 100 J supplied, only 10 J becomes light in an incandescent bulb. The rest becomes heat, but no energy is lost."), svg:
    `${box(12, 60, 70, 60, 2)}${tx(47, 86, "100 J", "fg-b")}${tx(47, 104, T("strøm", "electric"), "fg-s")}
     <path d="M82 70 C150 70 170 40 230 40" style="fill:none;stroke:var(--c4);stroke-width:8;opacity:.8"/><path d="M82 100 C150 100 170 130 230 130" style="fill:none;stroke:var(--bad);stroke-width:34;opacity:.45"/>
     ${box(232, 22, 78, 36, 4)}${tx(271, 45, T("10 J lys", "10 J light"), "fg-b")}${box(232, 108, 78, 44, 5)}${tx(271, 135, T("90 J varme", "90 J heat"), "fg-b")}
     ${tx(160, 172, "η = 10 / 100 = 10 %", "fg-b")}` }),
  greenhouse: () => ({ cap: T("Drivhuseffekten: sollys slipper gjennom atmosfæren, men klimagasser holder igjen en del av varmestrålingen fra jorda.", "The greenhouse effect: sunlight passes through the atmosphere, but greenhouse gases hold back part of the heat radiation from Earth."), svg:
    `${circ(34, 28, 18, "fill:var(--gold);stroke:var(--gold-deep)")}
     <path d="M0 150 Q160 120 320 150 L320 180 L0 180Z" style="${soft(3, 40)}"/>${tx(270, 170, T("jorda", "Earth"), "fg-b")}
     <path d="M0 70 Q160 44 320 70" style="fill:none;stroke:var(--c1);stroke-width:10;opacity:.35"/>${tx(300, 58, T("klimagasser", "greenhouse gases"), "fg-s", "end")}
     ${ar(48, 42, 120, 136, "fg-acc", 2.4)}${tx(70, 100, T("sollys", "sunlight"), "fg-s fg-acct", "end")}
     ${ar(160, 136, 196, 16, "fg-red", 2)}${tx(206, 22, T("slipper ut", "escapes"), "fg-s fg-redt", "start")}
     ${ar(210, 136, 236, 70, "fg-red", 2)}${ar(236, 70, 262, 132, "fg-red", 2)}${tx(252, 98, T("holdes igjen", "held back"), "fg-s fg-redt", "start")}` }),
  radiation: () => ({ cap: T("Hvor langt strålingen når: alfa stoppes av papir, beta av noen millimeter aluminium, og gamma dempes først av tykt bly.", "How far radiation reaches: alpha is stopped by paper, beta by a few millimetres of aluminium, and gamma is only weakened by thick lead."), svg:
    `${[["α", 1, 90], ["β", 4, 170], ["γ", 5, 300]].map(([s, n, end], i) => { const y = 40 + i * 44;
      return tx(18, y + 5, s, "fg-b") + `<line x1="32" y1="${y}" x2="${end}" y2="${y}" style="stroke:${C(n)};stroke-width:3${s === "γ" ? ";stroke-dasharray:1 0" : ""}"/>` + `<polygon points="${end},${y - 5} ${end + 8},${y} ${end},${y + 5}" style="fill:${C(n)}"/>`; }).join("")}
     <rect x="96" y="18" width="5" height="138" style="fill:var(--card);stroke:var(--ink)"/>${tx(98, 172, T("papir", "paper"), "fg-s")}
     <rect x="176" y="18" width="12" height="138" style="fill:color-mix(in srgb,var(--muted) 40%,var(--card));stroke:var(--ink)"/>${tx(182, 172, "Al", "fg-s")}
     <rect x="250" y="18" width="30" height="138" style="fill:color-mix(in srgb,var(--ink) 55%,var(--card));stroke:var(--ink)"/>${tx(265, 172, T("bly", "lead"), "fg-s")}` }),
  ph_scale: () => { const cols = ["#e53935", "#f4511e", "#fb8c00", "#fdd835", "#c0ca33", "#7cb342", "#43a047", "#26a69a", "#0097a7", "#1e88e5", "#3949ab", "#5e35b1", "#7b1fa2", "#8e24aa", "#6a1b9a"];
    return { cap: T("pH-skalaen: under 7 er surt, 7 er nøytralt og over 7 er basisk. Hvert trinn er en faktor 10.", "The pH scale: below 7 is acidic, 7 is neutral and above 7 is basic. Each step is a factor of 10."), svg:
    `${cols.map((c, i) => `<rect x="${12 + i * 20}" y="70" width="20" height="30" style="fill:${c}"/>` + tx(22 + i * 20, 116, String(i), "fg-s")).join("")}
     ${[[2, T("sitron", "lemon")], [3, T("eddik", "vinegar")], [7, T("vann", "water")], [10, T("såpe", "soap")], [13, T("lut", "lye")]].map(([v, s], i) => `<line class="fg-mut" x1="${22 + v * 20}" y1="${i % 2 ? 44 : 30}" x2="${22 + v * 20}" y2="68"/>` + tx(22 + v * 20, i % 2 ? 40 : 26, s, "fg-s")).join("")}
     ${tx(60, 142, T("surt", "acidic"), "fg-b fg-redt")}${tx(162, 142, T("nøytralt", "neutral"), "fg-b fg-okt")}${tx(262, 142, T("basisk", "basic"), "fg-b fg-acct")}` }; },

  // ---------- geografi ----------
  latlon: () => { const cx = 110, cy = 90, r = 72;
    return { cap: T("Breddegrader (vannrette) måler nord–sør fra ekvator. Lengdegrader (fra pol til pol) måler øst–vest fra Greenwich.", "Latitudes (horizontal) measure north–south from the equator. Longitudes (pole to pole) measure east–west from Greenwich."), svg:
    `${circ(cx, cy, r, soft(1, 18))}
     ${[-50, -25, 25, 50].map(d => { const y = cy - r * Math.sin(d * Math.PI / 180), w = r * Math.cos(d * Math.PI / 180); return `<ellipse cx="${cx}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * 0.16).toFixed(1)}" class="fg-mut"/>`; }).join("")}
     <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.16}" style="fill:none;stroke:var(--bad);stroke-width:2.4"/>
     ${[0.35, 0.7].map(k => `<ellipse cx="${cx}" cy="${cy}" rx="${r * k}" ry="${r}" class="fg-mut"/>`).join("")}<line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" style="stroke:var(--ok);stroke-width:2.4"/>
     ${tx(200, 94, T("ekvator 0°", "equator 0°"), "fg-s fg-redt", "start")}${tx(200, 40, T("breddegrad: N/S", "latitude: N/S"), "fg-s", "start")}${tx(200, 150, T("lengdegrad: Ø/V", "longitude: E/W"), "fg-s", "start")}
     ${tx(cx, 12, T("Nordpolen", "North Pole"), "fg-s")}${tx(cx + 6, cy + r - 8, "Greenwich 0°", "fg-s fg-okt", "start")}` }; },
  plates: () => ({ cap: T("Tre typer plategrenser: divergent (fra hverandre, ny havbunn), konvergent (mot hverandre, subduksjon og fjell) og transform (forbi hverandre, jordskjelv).", "Three kinds of plate boundaries: divergent (apart, new seafloor), convergent (together, subduction and mountains) and transform (past each other, earthquakes)."), svg:
    `${[0, 1, 2].map(i => { const x = 8 + i * 106, n = [3, 5, 4][i], lab = [T("divergent", "divergent"), T("konvergent", "convergent"), T("transform", "transform")][i];
      const body = i === 0 ? `${box(x, 70, 44, 30, n, 3)}${box(x + 54, 70, 44, 30, n, 3)}${ar(x + 30, 60, x + 8, 60)}${ar(x + 68, 60, x + 90, 60)}<path d="M${x + 44} 100 L${x + 49} 76 L${x + 54} 100" style="fill:var(--bad);opacity:.7"/>`
        : i === 1 ? `${box(x, 70, 50, 30, n, 3)}<polygon points="${x + 50},70 ${x + 98},70 ${x + 98},100 ${x + 50},120" style="${soft(n)}"/>${ar(x + 8, 60, x + 34, 60)}${ar(x + 90, 60, x + 64, 60)}<path d="M${x + 40} 70 L${x + 48} 44 L${x + 56} 70" style="fill:var(--muted);opacity:.7"/>`
        : `${box(x, 56, 98, 26, n, 3)}${box(x, 86, 98, 26, n, 3)}${ar(x + 20, 69, x + 70, 69)}${ar(x + 78, 99, x + 28, 99)}`;
      return body + tx(x + 49, 146, lab, "fg-b"); }).join("")}` }),
  orographic: () => ({ cap: T("Orografisk nedbør: fuktig luft fra havet presses opp over fjellet, avkjøles og gir nedbør. På lesiden er det tørt (regnskygge).", "Orographic rain: moist air from the sea is forced up over the mountain, cools and gives rain. The lee side is dry (rain shadow)."), svg:
    `<rect x="0" y="140" width="80" height="40" class="fg-water"/>${tx(40, 172, T("hav", "sea"), "fg-s")}
     <path d="M60 150 L160 40 L260 150 Z" style="${soft(3, 34)}"/>
     <path d="M20 128 C70 120 100 90 140 50" class="fg-acc" stroke-width="2.4" fill="none"/>${ar(128, 64, 144, 44, "fg-acc")}
     <ellipse cx="110" cy="46" rx="34" ry="14" style="fill:var(--card);stroke:var(--muted);stroke-width:1.6"/>${[92, 104, 116, 128].map(x => `<line x1="${x}" y1="64" x2="${x - 5}" y2="80" style="stroke:var(--c1);stroke-width:2"/>`).join("")}
     ${ar(180, 40, 280, 120, "fg-red")}${tx(92, 104, T("lo: vått", "windward: wet"), "fg-b", "end")}${tx(300, 100, T("le: tørt", "lee: dry"), "fg-b fg-redt", "end")}` }),
  pyramids: () => { const young = [16, 14, 12, 10, 8, 6, 4, 2], old = [6, 7, 8, 8, 9, 9, 8, 6];
    const pyr = (d, cx) => d.map((v, i) => `<rect x="${cx - v * 3.6}" y="${140 - i * 14}" width="${v * 3.6}" height="12" style="${soft(1, 50)}"/><rect x="${cx}" y="${140 - i * 14}" width="${v * 3.6}" height="12" style="${soft(5, 50)}"/>`).join("");
    return { cap: T("Befolkningspyramider: bred bunn betyr mange barn og rask vekst (til venstre). Smal bunn betyr en aldrende befolkning (til høyre).", "Population pyramids: a wide base means many children and fast growth (left). A narrow base means an ageing population (right)."), svg:
    `${pyr(young, 80)}${pyr(old, 240)}${tx(80, 172, T("ung befolkning", "young population"), "fg-b")}${tx(240, 172, T("aldrende befolkning", "ageing population"), "fg-b")}${tx(160, 146, T("0 år", "age 0"), "fg-s")}${tx(160, 48, T("80+", "80+"), "fg-s")}` }; },

  // ---------- samfunnskunnskap ----------
  powers: () => ({ cap: T("Maktfordelingen i Norge: folket velger Stortinget, regjeringen må ha Stortingets tillit, og domstolene er uavhengige. Pressen kontrollerer alle tre.", "Separation of powers in Norway: the people elect Parliament, the government needs Parliament's confidence, and the courts are independent. The press checks all three."), svg:
    `${box(120, 6, 80, 28, 3)}${tx(160, 25, T("Folket", "The people"), "fg-b")}${ar(160, 34, 160, 56, "fg-acc", 2.2)}${tx(166, 50, T("velger", "elect"), "fg-s fg-acct", "start")}
     ${box(100, 58, 120, 34, 1)}${tx(160, 74, "Stortinget", "fg-b")}${tx(160, 87, T("lovgivende", "legislative"), "fg-s")}
     ${box(8, 124, 120, 34, 2)}${tx(68, 140, T("Regjeringen", "Government"), "fg-b")}${tx(68, 153, T("utøvende", "executive"), "fg-s")}
     ${box(192, 124, 120, 34, 4)}${tx(252, 140, T("Domstolene", "Courts"), "fg-b")}${tx(252, 153, T("dømmende", "judicial"), "fg-s")}
     ${ar(120, 92, 84, 122, "fg-line")}${tx(92, 104, T("tillit", "confidence"), "fg-s", "end")}${ar(200, 92, 236, 122, "fg-line")}${tx(228, 104, T("lover", "laws"), "fg-s", "start")}
     ${tx(160, 176, T("+ pressen: den fjerde statsmakt", "+ the press: the fourth estate"), "fg-s")}` }),
  econ_flow: () => ({ cap: T("Det økonomiske kretsløpet: husholdningene selger arbeid og får lønn, og kjøper varer fra bedriftene. Staten tar inn skatt og gir velferd tilbake.", "The circular flow: households sell labour and earn wages, and buy goods from firms. The state collects taxes and gives welfare back."), svg:
    `${box(14, 62, 96, 44, 1)}${tx(62, 88, T("Husholdninger", "Households"), "fg-b")}${box(210, 62, 96, 44, 2)}${tx(258, 88, T("Bedrifter", "Firms"), "fg-b")}${box(122, 128, 76, 34, 3)}${tx(160, 150, T("Staten", "The state"), "fg-b")}
     <path d="M110 70 C150 40 170 40 210 70" class="fg-acc" stroke-width="2" fill="none"/>${ar(196, 60, 210, 70, "fg-acc")}${tx(160, 36, T("arbeid →", "labour →"), "fg-s fg-acct")}
     <path d="M210 98 C170 128 150 128 110 98" class="fg-red" stroke-width="2" fill="none"/>${ar(124, 108, 110, 98, "fg-red")}${tx(160, 20, T("← lønn og varer", "← wages and goods"), "fg-s fg-redt")}
     ${ar(62, 106, 122, 140, "fg-mutd")}${tx(70, 132, T("skatt", "tax"), "fg-s", "end")}${ar(198, 140, 258, 106, "fg-mutd")}${tx(250, 132, T("velferd", "welfare"), "fg-s", "start")}` }),

  // ---------- historie ----------
  tl_medieval: () => tlFig([[793, "Lindisfarne"], [900, T("rikssamling", "unification")], [1030, "Stiklestad"], [1349, T("svartedauden", "Black Death")], [1397, T("Kalmarunionen", "Kalmar Union")]], 750, 1450, T("Tidslinje: vikingtid og middelalder i Norge.", "Timeline: the Viking Age and Middle Ages in Norway.")),
  tl_early_modern: () => tlFig([[1492, "Columbus"], [1517, "Luther"], [1537, T("reformasjon i Norge", "Reformation in Norway")], [1776, T("USA uavhengig", "US independence")], [1789, T("franske rev.", "French Rev.")]], 1450, 1830, T("Tidslinje: fra oppdagelsene til revolusjonene.", "Timeline: from the voyages of discovery to the revolutions.")),
  tl_norway: () => tlFig([[1814, T("Grunnloven", "Constitution")], [1884, T("parlamentarisme", "parliamentarism")], [1898, T("stemmerett menn", "male suffrage")], [1905, T("selvstendighet", "independence")], [1913, T("stemmerett kvinner", "female suffrage")]], 1800, 1925, T("Tidslinje: Norges vei mot selvstendighet og demokrati.", "Timeline: Norway's path to independence and democracy.")),
  tl_wars: () => tlFig([[1914, T("1. verdenskrig", "WWI")], [1918, T("fred", "peace")], [1929, T("krakket", "the Crash")], [1933, "Hitler"], [1939, T("2. verdenskrig", "WWII")], [1940, T("9. april", "9 April")], [1945, T("frigjøring", "liberation")]], 1910, 1950, T("Tidslinje: verdenskrigene og mellomkrigstiden.", "Timeline: the world wars and the interwar years."), [[1914, 1918, 5], [1939, 1945, 5], [1940, 1945, 1]]),
  tl_cold: () => tlFig([[1949, "NATO"], [1961, T("muren bygd", "Wall built")], [1962, T("Cubakrisen", "Cuba")], [1969, "Ekofisk"], [1989, T("muren faller", "Wall falls")], [1991, T("Sovjet oppløst", "USSR ends")]], 1945, 1995, T("Tidslinje: den kalde krigen og oljealderen.", "Timeline: the Cold War and the oil age."), [[1961, 1989, 4]]),

  // ---------- religion og etikk ----------
  religions: () => { const d = [[T("Kristendom", "Christianity"), 2.4, 1], [T("Islam", "Islam"), 1.9, 3], [T("Uten religion", "No religion"), 1.2, 4], [T("Hinduisme", "Hinduism"), 1.2, 5], [T("Buddhisme", "Buddhism"), 0.5, 2]];
    return { cap: T("Omtrentlig antall tilhengere i verden (milliarder). Jødedommen har om lag 15 millioner, for lite til å synes her.", "Approximate followers worldwide (billions). Judaism has about 15 million, too few to show here."), svg:
    d.map(([n, v, c], i) => `<rect x="112" y="${14 + i * 32}" width="${v * 78}" height="22" rx="4" style="${soft(c, 50)}"/>` + tx(104, 30 + i * 32, n, "fg-b", "end") + tx(118 + v * 78, 30 + i * 32, nf(v, 1), "fg-s", "start")).join("") }; },
  trinity: () => ({ cap: T("Treenigheten: én Gud i tre personer. Hver person er Gud, men de er ikke den samme personen.", "The Trinity: one God in three persons. Each person is God, but they are not the same person."), svg:
    `<polygon points="160,14 60,160 260,160" style="${soft(1, 14)}"/>${circ(160, 90, 30, soft(3, 40))}${tx(160, 95, T("Gud", "God"), "fg-b")}
     ${circ(160, 26, 22, soft(2))}${tx(160, 31, T("Far", "Father"), "fg-b")}${circ(70, 150, 22, soft(4))}${tx(70, 155, T("Sønn", "Son"), "fg-b")}${circ(250, 150, 22, soft(5))}${tx(250, 148, T("Hellig", "Holy"), "fg-s")}${tx(250, 160, T("Ånd", "Spirit"), "fg-s")}` }),
  pillars: () => { const p = [["shahada", T("tro", "faith")], ["salah", T("bønn", "prayer")], ["zakat", T("allmisse", "alms")], ["sawm", T("faste", "fasting")], ["hajj", T("pilegrim", "pilgrimage")]];
    return { cap: T("Islams fem søyler bærer troen, som søyler bærer et tak.", "The Five Pillars of Islam hold up the faith, as pillars hold up a roof."), svg:
    `<polygon points="30,40 160,8 290,40" style="${soft(3, 40)}"/><rect x="30" y="40" width="260" height="10" style="${soft(3, 50)}"/><rect x="24" y="150" width="272" height="12" style="${soft(3, 50)}"/>
     ${p.map(([a, b], i) => { const x = 46 + i * 52; return `<rect x="${x}" y="52" width="24" height="96" style="${soft(i + 1, 34)}"/>` + tx(x + 12, 176, a, "fg-s") + `<text x="${x + 12}" y="100" class="fg-b" text-anchor="middle" transform="rotate(-90 ${x + 12} 100)">${esc(b)}</text>`; }).join("")}` }; },
  samsara: () => { const cx = 120, cy = 90, r = 58, st = [T("fødsel", "birth"), T("liv", "life"), T("død", "death"), T("gjenfødsel", "rebirth")];
    return { cap: T("Samsara: kretsløpet av fødsel, liv, død og gjenfødsel, styrt av karma. Målet er å bryte ut: moksha i hinduismen, nirvana i buddhismen.", "Samsara: the cycle of birth, life, death and rebirth, driven by karma. The goal is to break out: moksha in Hinduism, nirvana in Buddhism."), svg:
    `${circ(cx, cy, r, "fill:none;stroke:var(--c2);stroke-width:3;stroke-dasharray:10 6")}
     ${st.map((s, i) => { const a = -Math.PI / 2 + i * Math.PI / 2, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); return circ(x.toFixed(1), y.toFixed(1), 6, "fill:var(--c2)") + tx((cx + (r + 26) * Math.cos(a)).toFixed(1), (cy + (r + 18) * Math.sin(a) + 4).toFixed(1), s, "fg-b"); }).join("")}
     ${tx(cx, cy + 5, "karma", "fg-i")}${ar(cx + r + 34, cy - 10, 270, 40, "fg-ok", 2.4)}${box(236, 14, 80, 24, 3)}${tx(276, 31, T("frigjøring", "liberation"), "fg-b fg-okt")}` }; },
  ethics: () => ({ cap: T("Fire måter å vurdere en handling på: følgene (konsekvensetikk), plikten (pliktetikk), karakteren (dydsetikk) og intensjonen (sinnelagsetikk).", "Four ways to judge an action: its outcomes (consequentialism), duty (duty ethics), character (virtue ethics) and intention (ethics of intention)."), svg:
    `${box(118, 70, 84, 40, 3)}${tx(160, 95, T("Handling", "Action"), "fg-b")}
     ${[[14, 10, 1, T("Følger", "Outcomes"), T("konsekvensetikk", "consequentialism")], [206, 10, 2, T("Plikt", "Duty"), T("pliktetikk", "duty ethics")], [14, 130, 4, T("Karakter", "Character"), T("dydsetikk", "virtue ethics")], [206, 130, 5, T("Intensjon", "Intention"), T("sinnelagsetikk", "ethics of intention")]].map(([x, y, n, a, b]) =>
       box(x, y, 100, 40, n) + tx(x + 50, y + 18, a, "fg-b") + tx(x + 50, y + 33, b, "fg-s") + ar(x < 100 ? 118 : 202, y < 100 ? 76 : 104, x < 100 ? x + 100 : x, y < 100 ? y + 30 : y + 10, "fg-mutd", 1.6)).join("")}` }),
  cave: () => ({ cap: T("Platons hulelignelse: fangene ser bare skygger på veggen og tror det er virkeligheten. Den som kommer ut, ser verden slik den er.", "Plato's allegory of the cave: the prisoners see only shadows on the wall and think they are reality. The one who gets out sees the world as it is."), svg:
    `<path d="M10 170 L10 20 Q160 -10 250 30 L250 170Z" style="fill:color-mix(in srgb,var(--ink) 12%,var(--card));stroke:var(--ink);stroke-width:1.6"/>
     <rect x="14" y="40" width="30" height="100" style="fill:color-mix(in srgb,var(--ink) 30%,var(--card))"/><ellipse cx="30" cy="92" rx="10" ry="16" style="fill:var(--ink);opacity:.55"/>${tx(30, 156, T("skygger", "shadows"), "fg-s")}
     ${[70, 86, 102].map(x => circ(x, 116, 7, "fill:var(--ink)") + `<rect x="${x - 6}" y="123" width="12" height="18" rx="3" style="fill:var(--ink)"/>`).join("")}${tx(86, 156, T("fanger", "prisoners"), "fg-s")}
     <path d="M190 132 Q196 108 204 132 Q210 116 214 132Z" style="fill:#fb8c00"/>${tx(202, 148, T("bål", "fire"), "fg-s")}
     ${circ(292, 34, 16, "fill:var(--gold);stroke:var(--gold-deep)")}${ar(250, 60, 286, 52, "fg-ok", 2.2)}${tx(290, 76, T("ut i lyset", "into the light"), "fg-s fg-okt", "end")}` })
});

// Tidslinje med hendelser [år, tekst] og valgfrie perioder [fra, til, farge].
function tlFig(ev, a, b, cap, spans = []){
  const X = y => 18 + (y - a) / (b - a) * 284;
  const svg = `<line class="fg-line" x1="14" y1="96" x2="306" y2="96"/>` +
    spans.map(([f, t, n], i) => `<rect x="${X(f).toFixed(1)}" y="${88 - i * 3}" width="${(X(t) - X(f)).toFixed(1)}" height="${16 + i * 6}" rx="4" style="fill:color-mix(in srgb,var(--c${n}) 30%,transparent)"/>`).join("") +
    ev.map(([y, s], i) => { const up = i % 2 === 0, x = X(y), ly = up ? 56 - (i % 4 === 0 ? 0 : 18) : 136 + (i % 4 === 1 ? 0 : 18);
      return `<line class="fg-mut" x1="${x.toFixed(1)}" y1="96" x2="${x.toFixed(1)}" y2="${up ? ly + 6 : ly - 16}"/>` + `<circle cx="${x.toFixed(1)}" cy="96" r="5" style="fill:var(--c${(i % 5) + 1});stroke:var(--ink);stroke-width:1.2"/>` +
        fgT(x, up ? ly - 8 : ly - 2, String(y), "fg-b") + fgT(x, up ? ly + 4 : ly + 10, s, "fg-s"); }).join("");
  return { cap, svg };
}

// Kobling til enhetene (finnes med tittel).
const FV = [["VG1P", "Prosent og vekstfaktor", "pct_growth"], ["VG1P", "Geometri og målestokk", "map_scale"], ["VG2P", "Statistikk", "stats_mm"], ["VG2P", "Eksponentiell vekst", "exp_lin"],
  ["VGNAT", "Energi og energikilder", "energy_flow"], ["VGNAT", "Klima og bærekraft", "greenhouse"], ["VGNAT", "Stråling og radioaktivitet", "radiation"], ["VGNAT", "Kjemi i hverdagen", "ph_scale"],
  ["VGGEO", "Kart og geografiske verktøy", "latlon"], ["VGGEO", "Jordas indre og platetektonikk", "plates"], ["VGGEO", "Klima og vær", "orographic"], ["VGGEO", "Befolkning og migrasjon", "pyramids"],
  ["VGSAMF", "Demokrati og politikk i Norge", "powers"], ["VGSAMF", "Økonomi, arbeidsliv og velferd", "econ_flow"],
  ["VGREL", "Religion i Norge og verden", "religions"], ["VGREL", "Kristendom", "trinity"], ["VGREL", "Islam", "pillars"], ["VGREL", "Hinduisme og buddhisme", "samsara"], ["VGREL", "Etiske teorier", "ethics"], ["VGREL", "Filosofi", "cave"]];
for(const [code, title, name] of FV){ const c = typeof COURSES !== "undefined" && COURSES.find(x => x.code === code), u = c ? c.units.findIndex(x => x.title === title) : -1; if(u >= 0) FIG_MAP[code + ":" + u] = name; }
})();
