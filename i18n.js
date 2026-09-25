// ============================================================
//  Språk: norsk bokmål (nb) og engelsk (en)
// ============================================================
const LS_KEY = "ingeniordrill.v1";
let LANG = (() => {
  try { const s = JSON.parse(localStorage.getItem(LS_KEY)); if (s && (s.lang === "nb" || s.lang === "en")) return s.lang; } catch (e) {}
  const n = ((typeof navigator !== "undefined" && (navigator.languages && navigator.languages[0] || navigator.language)) || "nb").toLowerCase();
  return /^(nb|nn|no)\b/.test(n) ? "nb" : "en";
})();
const T = (nb, en) => (LANG === "en" ? en : nb);

// Fagnavn, forkortelse, tilsvarende emner ved norske læresteder og engelske enhetstitler
const META = {
  MAPE1300: { nb:"Statikk og dynamikk", en:"Statics and Dynamics", s:["SD","SD"], eq:[["OsloMet","MAPE1300"],["NTNU","TKT4116"],["NMBU","FYS110"]], units:["Statics and equilibrium","Trusses and friction","Dynamics","Bending of beams"] },
  MEK1300:  { nb:"Programmering med Python", en:"Programming with Python", s:["Py","Py"], eq:[["OsloMet","MEK1300"],["NTNU","TDT4110"],["NMBU","INF120"]], units:["Python basics","Loops and conditions","Functions and data structures"] },
  MATS1600: { nb:"Maskinkonstruksjon", en:"Machine Design", s:["MK","MD"], eq:[["OsloMet","MATS1600"],["NTNU","TMM4112"],["NMBU","TMP220"]], units:["Stress and sizing","Tolerances and fits","Machine elements"] },
  MATS2100: { nb:"Termodynamikk", en:"Thermodynamics", s:["Td","Td"], eq:[["OsloMet","MATS2100"],["NTNU","TEP4120"],["NMBU","FYS102"]], units:["Basic concepts","Heat and entropy","Thermodynamic cycles"] },
  MEK1400:  { nb:"Fysikk", en:"Physics", s:["Fy","Ph"], eq:[["OsloMet","MEK1400"],["NTNU","TFY4104"],["NMBU","FYS101"]], units:["Oscillations and waves","Electricity and magnetism","Energy and rotation"] },
  ELPE1300: { nb:"Elektriske kretser", en:"Electric Circuits", s:["EK","EC"], eq:[["OsloMet","ELPE1300"],["NTNU","TET4100"],["NMBU","FYS230"]], units:["Direct current","Capacitors and inductors","Alternating current","Network analysis"] },
  MEK1000:  { nb:"Kalkulus", en:"Calculus", s:["Ka","Ca"], eq:[["OsloMet","MEK1000"],["NTNU","TMA4401"],["NMBU","MATH111"]], units:["Differentiation","Integration","Limits, series and complex numbers"] },
  ELFT2500: { nb:"Innebygde systemer og måleteknikk", en:"Embedded Systems and Instrumentation", s:["IS","ES"], eq:[["OsloMet","ELFT2500"],["NMBU","FYS103"]], units:["Number systems and digital logic","Microcontrollers","Measurement"] },
  MEK2000:  { nb:"Lineær algebra og differensialligninger", en:"Linear Algebra and Differential Equations", s:["LA","LA"], eq:[["OsloMet","MEK2000"],["NTNU","TMA4110"],["NMBU","MATH113"]], units:["Matrices","Linear systems and eigenvalues","Differential equations"] },
  MEK2200:  { nb:"Statistikk og risikoanalyse", en:"Statistics and Risk Analysis", s:["St","St"], eq:[["OsloMet","MEK2200"],["NTNU","TMA4240"],["NMBU","STAT100"]], units:["Probability","Distributions","Inference and risk"] },
  ELVE3610: { nb:"Robotikk", en:"Robotics", s:["Ro","Ro"], eq:[["OsloMet","ELVE3610"],["NTNU","TPK4170"]], units:["Rotations and transformations","Kinematics","Robot systems"] },
  MATS1500: { nb:"Materialteknologi", en:"Materials Technology", s:["Ma","Ma"], eq:[["OsloMet","MATS1500"],["NTNU","TMT4185"],["NMBU","TBM200"]], units:["Structure","Mechanical properties","Heat treatment and corrosion"] },
  MEK3100:  { nb:"Videregående programmering", en:"Intermediate Programming", s:["P2","P2"], eq:[["OsloMet","MEK3100"],["NTNU","TDT4100"],["NMBU","INF200"]], units:["Object orientation","Algorithms and data structures","Numerics with NumPy"] },
  DAVE3700: { nb:"Flervariabel analyse", en:"Multivariable Calculus", s:["FA","MC"], eq:[["OsloMet","DAVE3700"],["NTNU","TMA4420"],["NMBU","MATH112"]], units:["Partial derivatives","Multiple integrals","Vector calculus"] },
  STKD6610: { nb:"Teknologi, etikk og bærekraft", en:"Technology, Ethics and Sustainability", s:["TE","TE"], eq:[["OsloMet","STKD6610"]], units:["Sustainability","Ethics and responsibility"] },
  ELFT2400: { nb:"Reguleringsteknikk", en:"Control Engineering", s:["Re","Co"], eq:[["OsloMet","ELFT2400"],["NTNU","TTK4105"],["NMBU","TEL240"]], units:["Laplace and transfer functions","PID control","Frequency analysis"] },
  DAVE3705: { nb:"Laplace, Fourier og PDE", en:"Laplace, Fourier and PDEs", s:["LF","LF"], eq:[["OsloMet","DAVE3705"],["NTNU","TMA4130"]], units:["The Laplace transform","Fourier series","Partial differential equations"] },
  FAST:     { nb:"Fasthetslære", en:"Strength of Materials", s:["Fa","SM"], eq:[["NTNU","TKT4122"],["NMBU","TBM120"]], units:["Stress and strain","Torsion and bending","Stress transformation and buckling"] },
  FLUID:    { nb:"Fluidmekanikk", en:"Fluid Mechanics", s:["Fl","Fl"], eq:[["NTNU","TEP4100"],["NMBU","TPS200"]], units:["Hydrostatics","Continuity and Bernoulli","Pipe flow and dimensionless numbers"] },
  FEM:      { nb:"Elementmetoden", en:"Finite Element Method", s:["FE","FE"], eq:[["NTNU","TMM4135"],["NMBU","TBM350"]], units:["Bar elements and stiffness matrices","Weak form and shape functions","Element types, meshing and error"] },
  SVING:    { nb:"Maskindynamikk og svingninger", en:"Machine Dynamics and Vibrations", s:["Sv","Vi"], eq:[["NMBU","TMP310"]], units:["Free vibrations","Damping","Forced vibrations and isolation"] },
  VARME:    { nb:"Varmeoverføring", en:"Heat Transfer", s:["Va","HT"], eq:[["NTNU","TEP4130"],["NMBU","FYS251"]], units:["Conduction","Convection","Radiation and transient heat"] },
  NUM:      { nb:"Numeriske metoder", en:"Numerical Methods", s:["Nu","Nu"], eq:[["NTNU","TMA4320"]], units:["Solving equations","Interpolation and integration","Differential equations and stability"] },
  OKON:     { nb:"Ingeniørøkonomi", en:"Engineering Economics", s:["Øk","Ec"], eq:[["NMBU","INN200"]], units:["Interest and time value","Investment analysis","Costs and profitability"] },
  KJEMI:    { nb:"Generell kjemi", en:"General Chemistry", s:["Kj","Ch"], eq:[["NTNU","TMT4111"],["NMBU","KJM100"]], units:["Moles and stoichiometry","Acids, bases and equilibrium","Thermochemistry and electrochemistry"] },
  ELEK:     { nb:"Elektronikk", en:"Electronics", s:["El","El"], eq:[["NTNU","TTT4203"],["NMBU","FYS235"]], units:["Diodes and transistors","Operational amplifiers","Filters and signals"] },
  PROD:     { nb:"Produktutvikling", en:"Product Development", s:["PU","PD"], eq:[["NTNU","TMM4121"],["NMBU","TIP200"]], units:["Process and customer needs","Concept development and selection","Design for X and production"] }
};
const GROUP_NAMES = {
  "Mekanikk og konstruksjon": ["Mekanikk og konstruksjon","Mechanics and Design"],
  "Programmering og data": ["Programmering","Programming"],
  "Matematikk og fysikk": ["Matematikk og naturfag","Mathematics and Science"],
  "Elektro og automasjon": ["Elektro og automasjon","Electrical and Automation"],
  "Samfunn og bærekraft": ["Samfunn og bærekraft","Society and Sustainability"],
  "Energi og strømning": ["Energi og strømning","Energy and Fluids"],
  "Produktutvikling og økonomi": ["Produktutvikling og økonomi","Product Development and Economics"]
};
const courseName = c => (META[c.code] ? META[c.code][LANG] : c.name);
const courseShort = c => (META[c.code] ? META[c.code].s[LANG === "en" ? 1 : 0] : c.code.slice(0, 2));
const unitTitle = (c, u) => (LANG === "en" && META[c.code] && META[c.code].units[u]) || c.units[u].title;
const groupName = g => (GROUP_NAMES[g] ? GROUP_NAMES[g][LANG === "en" ? 1 : 0] : g);
const courseEq = c => (!META[c.code] ? "" : META[c.code].eqText ? META[c.code].eqText[LANG] : META[c.code].eq.map(([s, k]) => s + " " + k).join(" · "));

// Enheter i svar (brukes når en fast oppgave vises på engelsk)
const UNIT_EN = { "stk":"pcs", "år":"years", "ganger":"times", "mill. omdr.":"million rev.", "kr":"NOK", "rad/enhet":"rad/unit", "‰":"‰" };

// Engelske oversettelser av faste oppgaver: ENQ[kode][enhet][nr] = [tekst, alternativer|null, forklaring]
const ENQ = {};
function EN_Q(code, u, list) { (ENQ[code] ||= [])[u] = list; }
// Engelske generatorer, i samme rekkefølge som de norske

// ------------------------------------------------------------
//  Tekster i brukergrensesnittet
// ------------------------------------------------------------
const UI = {
  nb: {
    dailyGoal: "Dagens mål", goalReached: "Dagens mål er nådd", days: ["Ma","Ti","On","To","Fr","Lø","Sø"],
    reviewBtn: n => `Repeter feil (${n})`, unit: n => `Enhet ${n}`, jumpHere: "Hopp hit", start: "START",
    streakTitle: "Dager på rad", crownsTitle: "Kroner i dette faget", xpTitle: "Total XP", switchCourse: "Bytt fag", settings: "Innstillinger",
    foot1: (n, q, g) => `${n} har ${q} faste oppgaver og ${g} oppgavetyper med nye tall hver gang.`,
    foot2: (d, t, c, u) => `${d} av ${t} nivåer fullført · ${c} av ${u} kroner.`,
    allCrowns: "Alle enheter har krone. Imponerende!", allLevels: "Alle nivåer er fullført. Ta mesterprøvene for å vinne kroner.",
    lockedNode: "Fullfør nivået før, eller bruk «Hopp hit».", lockedMaster: "Fullfør Nivå 3 for å ta mesterprøven.",
    nodeDone: ", fullført – øv igjen", nodeOpen: ", åpen", nodeLocked: ", låst",
    pickTitle: "Velg fag", resetAll: "Nullstill all fremgang", newTag: "NY", equiv: "Tilsvarer",
    levels: [["Grunnleggende","Nivå 1"],["Øving","Nivå 2"],["Avansert","Nivå 3"],["Mester","Krone"]],
    pickAnswer: "Velg riktig svar", writeAnswer: "Skriv svaret", review: "Repetisjon", jumpTest: "Hopp over-test",
    numHint: "Bruk komma eller punktum. Brøk som 1/4 går også.", answerPh: "Svar", check: "Sjekk", correct: "Riktig!",
    streakN: n => `${n} på rad!`, notQuite: "Ikke helt", rightAnswer: "Riktig svar:", cont: "Fortsett",
    quitAria: "Avslutt økten", livesLeft: n => `${n} liv igjen`, scratch: "Kladd", report: "Rapporter feil", reportShort: "Rapporter",
    thinkWrong: "Mener du fasiten er feil?",
    doneFlawless: "Feilfri økt!", doneReview: "Repetisjon fullført", doneLevel: s => `${s} fullført!`, doneJump: "Hoppet er godkjent!", doneCrown: "Krone vunnet!",
    jumpUnlocked: u => `Enhetene før «${u}» er låst opp.`, crownWon: u => `Du har bestått mesterprøven i «${u}».`,
    streakLine: n => `Du har nå øvd ${n} ${n === 1 ? "dag" : "dager"} på rad.`, tileXp: "XP", tileFirst: "Første forsøk", tileTime: "Tid",
    failTitle: "Ikke bestått denne gangen", failJump: "Hopp over-testen", failMaster: "Mesterprøven",
    failText: (w, n, d, t) => `${w} krever færre enn ${n} feil. Du kom til oppgave ${d} av ${t}.`,
    failHint: "Øv mer på nivåene i enheten og prøv igjen. Feilene ligger i «Repeter feil».", retry: "Prøv igjen", back: "Tilbake",
    quitTitle: "Avslutte økten?", quitText: "Du mister fremgangen i denne leksjonen.", keepGoing: "Fortsett å øve", quit: "Avslutt",
    resetTitle: "Nullstille all fremgang?", resetText: "XP, rekke og fullførte leksjoner i alle fag slettes. Det kan ikke angres.", cancel: "Avbryt", reset: "Nullstill", resetDone: "Fremgangen er nullstilt.",
    jumpTitle: u => `Hopp til «${u}»?`, jumpText: "Du får 10 oppgaver fra enhetene før. Med færre enn 3 feil låses de opp, så du kan starte her.", startTest: "Start testen",
    // Innstillinger
    setTitle: "Innstillinger", setLang: "Språk", setGoal: "Dagens mål", setGoalUnit: "XP per dag",
    setReminder: "Daglig påminnelse", setReminderNote: "Påminnelser fungerer i app-versjonen for iPhone og Android.", setReminderTime: "Tidspunkt",
    reminderTitle: "Tid for dagens drill", reminderBody: "Fem minutter holder. Hold rekka i gang!",
    reminderDenied: "Varsler er slått av for appen. Slå dem på i telefonens innstillinger.", reminderOn: h => `Påminnelse hver dag kl. ${h}.`,
    setHaptics: "Vibrasjon ved svar", setFeedback: "Send tilbakemelding", setPrivacy: "Personvern", setAbout: "Om appen", setReset: "Nullstill all fremgang",
    setInbox: n => `Innkomne rapporter (${n})`, inboxEmpty: "Ingen rapporter ennå.",
    bkMake: "Lag sikkerhetskopi", bkMakeSub: "Flytt fremgangen til en annen enhet", bkLoad: "Hent sikkerhetskopi", bkLoadSub: "Slå sammen med fremgangen her",
    bkOutText: "Kopier koden eller lagre den som fil, og åpne «Hent sikkerhetskopi» på den andre enheten. Koden inneholder bare fremgangen din.",
    bkInText: "Lim inn koden eller velg fila. Fremgangen slås sammen med den som allerede er her, og ingenting overskrives.",
    bkCopy: "Kopier kode", bkShare: "Del", bkFile: "Last ned fil", bkPick: "Velg fil", bkImport: "Hent", bkCopied: "Koden er kopiert.",
    acLogin: "Logg inn", acLoginSub: "Samme fremgang på mobil og PC. Valgfritt.", acLoginText: "Skriv inn e-posten din, så sender vi deg en kode. Du trenger ikke passord.",
    acEmail: "E-postadresse", acSend: "Send kode", acCodeTitle: "Skriv inn koden", acCodeText: e => `Vi har sendt en kode til ${e}. Sjekk også søppelpost.`,
    acVerify: "Logg inn", acOtherEmail: "Bruk en annen e-post", acBadEmail: "Skriv inn en gyldig e-postadresse.", acBadCode: "Koden er feil eller utløpt. Prøv igjen eller be om en ny.",
    acErrOffline: "Ingen nettforbindelse. Prøv igjen når du er på nett.", acErrRate: "For mange forsøk. Vent litt og prøv igjen.", acError: "Noe gikk galt med synkroniseringen. Prøv igjen senere.",
    acLoggedIn: e => `Logget inn som ${e}. Fremgangen er synkronisert.`, acLoggedOut: "Du er logget ut. Fremgangen ligger fortsatt på denne enheten.",
    acSyncNow: "Synkroniser nå", acSyncing: "Synkroniserer …", acSynced: h => `Synkronisert kl. ${h}`, acSyncedToast: "Fremgangen er synkronisert.", acOffline: "Ikke synkronisert – ingen nett", acSyncOn: "Synkronisering er på",
    acLogout: "Logg ut", acDelete: "Slett konto", acDelTitle: "Slette kontoen?", acDelOk: "Slett konto",
    acDelText: "Kontoen og fremgangen som er lagret hos oss slettes for godt. Fremgangen på denne enheten blir liggende til du nullstiller den eller sletter appen.",
    acDeleted: "Kontoen er slettet.", acPrivacyNote: "Vi lagrer bare e-postadressen og fremgangen din, i EU. Du kan slette kontoen når som helst.",
    bkEmpty: "Lim inn en kode eller velg en fil først.", bkBad: "Fant ingen gyldig sikkerhetskopi i det du limte inn.", bkDone: "Fremgangen er hentet og slått sammen.",
    about: v => `Axle, versjon ${v}. Oppgavene er laget med hjelp av KI og testet automatisk. Finner du en feil, trykk på flagget i oppgaven – det hjelper alle. Kontakt: ${CONFIG.contactEmail}`,
    // Rapport
    repTitle: "Rapporter feil", fbTitle: "Send tilbakemelding", repWhat: "Hva er galt?",
    repCats: ["Feil fasit","Feil i forklaringen","Uklar oppgave","Skrivefeil eller språk","Annet"],
    repMsg: "Beskriv gjerne kort (valgfritt)", fbMsg: "Hva vil du si til oss?", repEmail: "E-post hvis du vil ha svar (valgfritt)",
    send: "Send", sent: "Takk! Rapporten er sendt.", queued: "Lagret. Den sendes når du er på nett igjen.",
    notConfigured: "Tilbakemelding er ikke satt opp i denne versjonen ennå. Rapporten er lagret på enheten.", openingMail: "Åpner e-postappen med rapporten ferdig utfylt …",
    theory: "Teori", theoryFor: u => `Teori: ${u}`, readTheory: "Les teorien for denne delen", thStart: "Øv på dette", thStartFirst: "Start første leksjon",
    noTheory: "Teori for denne delen kommer snart.", preTitle: "Bygger på", preHide: "Skjul", preDone: "fullført",
    preText: "Dette faget forutsetter fagene under. Er du usikker, ta dem først – trykk for å bytte fag.", preNice: n => `Også nyttig å kunne: ${n}.`,
    builtOn: "Bygger på", pickTheme: "Etter tema", pickOrder: "Anbefalt rekkefølge", stepN: n => n===1 ? "Trinn 1 · start her" : `Trinn ${n}`,
    orderNote: "Fagene er sortert etter hva de bygger på. Begynner du fra bunnen, ta Grunnleggende matematikk og fysikk først.",
    needText: "Skriv litt først.", yourAnswer: "Ditt svar",
    // Kladd
    scDraw: "Tegn", scCalc: "Kalkulator", scPen: "Penn", scEraser: "Viskelær", scUndo: "Angre", scClear: "Tøm", scFit: "Tilpass",
    scZoomIn: "Zoom inn", scZoomOut: "Zoom ut", scClose: "Lukk kladd", scTip: "Tegn med én finger. Zoom og flytt med to.",
    calcPh: "Skriv et uttrykk, f.eks. 2*sin(30) eller sqrt(2)/4", calcUse: "Bruk som svar", calcUsed: "Satt inn i svarfeltet.",
    calcErr: "Forstår ikke uttrykket", calcEmpty: "Regn her. Pil opp henter forrige linje. «ans» er forrige svar.",
    privacyTitle: "Personvern",
    // Eksamen
    exSection: "Eksamenstrening", exIntro: "Faste oppgavesett med samme form hver gang, men nye tall. Ta tiden og få en veiledende karakter.",
    exJumpBtn: "Prøveeksamener", exName: v => `Prøveeksamen ${v}`, exMeta: (n, p, d) => `${n} deloppgaver · ${p} poeng · ${d}`,
    exNotTaken: "Ikke tatt ennå", exAttempts: n => `${n} forsøk`, exInProgress: "Pågår", exPct: p => `${p} %`,
    exBestLine: (g, p, n) => `Beste resultat: ${g} · ${p} % · ${n} forsøk`,
    exContinue: "Fortsett eksamen", exLeft: s => `${s} igjen`, exNoLimitShort: "uten tidsgrense",
    exSeeResult: (g, p) => `Se eksamensresultatet (${g} · ${p} %)`, exEmpty: "Fant ingen oppgaver til denne eksamenen.",
    exDur: (h, m) => h ? (m ? `${h} t ${m} min` : `${h} t`) : `${m} min`,
    exTask: n => `Oppgave ${n}`, exParts: n => n === 1 ? "1 deloppgave" : `${n} deloppgaver`, exPts: n => `${n} poeng`,
    exOf: (g, m) => `${g} av ${m} poeng`, exTotal: (n, p) => `Totalt ${n} deloppgaver og ${p} poeng`,
    exRulesTitle: "Slik fungerer det",
    exRules: ["Ingen fasit underveis – du ser resultatet når du leverer.", "Du kan hoppe mellom deloppgavene og endre svar helt til du leverer.",
      "Kladdeark og kalkulator er tilgjengelig.", "Tallene er nye hver gang, men oppgavene har samme form.", "Karakteren er veiledende."],
    exTime: "Tid", exRec: d => `Anbefalt (${d})`, exCustom: "Egendefinert", exNoLimit: "Uten tidsgrense", exMinutes: "minutter",
    exCustomAria: "Egendefinert tid i minutter", exExtra: "Ekstra tid", exExtraNote: "For deg som har krav på utvidet tid. Valget huskes til neste gang.", exNone: "Ingen",
    exTotalTime: (tot, base, extra) => extra ? `Tid totalt: ${tot} (${base} + ${extra} ekstra)` : `Tid totalt: ${tot}`,
    exNoLimitNote: "Ingen tidsgrense. Klokka viser medgått tid.", exStart: "Start eksamen",
    exRunningNote: (name, course) => `Du har en eksamen som pågår: ${name} · ${course}.`, exResumeIt: "Fortsett den",
    exReplaceTitle: "Forkaste eksamenen som pågår?", exReplaceText: (name, course) => `${name} i ${course} er ikke levert. Starter du en ny, slettes svarene i den.`,
    exReplaceOk: "Forkast og start ny",
    exCloseAria: "Lukk eksamen", exTimeLeft: "Tid igjen", exElapsed: "Uten tid", exAnsweredLbl: "Besvart", exAnsweredAria: (a, n) => `${a} av ${n} besvart`,
    exOverview: "Oversikt", exPrev: "Forrige", exNext: "Neste", exFlag: "Merk", exFlagged: "Merket", exSubmit: "Lever",
    exFlagAria: "Merk deloppgaven så du finner den igjen", exClear: "Fjern svaret", exMcHint: "Du kan endre svaret helt til du leverer.",
    exCloseTitle: "Lukke eksamen?", exCloseTimed: "Svarene dine er lagret. Klokka går videre mens du er borte.", exCloseFree: "Svarene dine er lagret.",
    exLater: "Fortsett senere", exSubmitNow: "Lever nå", exDiscard: "Forkast eksamen", exBackTo: "Tilbake til eksamen",
    exDiscardTitle: "Forkaste eksamen?", exDiscardText: "Svarene slettes, og forsøket blir ikke registrert.", exDiscardOk: "Forkast", exDiscarded: "Eksamen er forkastet.",
    exSubmitTitle: "Levere eksamen?", exSubmitOk: "Lever eksamen",
    exSubmitText: (u, f) => (u === 0 ? "Alle deloppgavene er besvart." : u === 1 ? "1 deloppgave er ubesvart." : `${u} deloppgaver er ubesvart.`) +
      (f ? (f === 1 ? " 1 er merket." : ` ${f} er merket.`) : "") + " Etter levering kan du ikke endre svarene.",
    exOvSummary: (a, n, f) => `${a} av ${n} besvart · ${f} merket`, exClose: "Lukk",
    exLegAnswered: "Besvart", exLegFlagged: "Merket", exLegCurrent: "Her er du",
    exStAnswered: "besvart", exStUnanswered: "ubesvart", exStFlagged: "merket", exStCurrent: "her er du",
    exFiveLeft: "5 minutter igjen", exTimeUp: "Tiden er ute – eksamen levert",
    exGradeNote: "Veiledende karakter etter vanlig prosentskala: A\u00a0≥\u00a089\u00a0%, B\u00a0≥\u00a077\u00a0%, C\u00a0≥\u00a065\u00a0%, D\u00a0≥\u00a053\u00a0%, E\u00a0≥\u00a041\u00a0%, ellers F.",
    exGradeAria: g => `Karakter ${g}`, exScore: (p, g, m) => `${p} % · ${g} av ${m} poeng`, exNewBest: "Ny personlig rekord!",
    exAuto: "Tiden gikk ut, og eksamen ble levert automatisk.", exUsed: "Brukt tid", exAllowed: "Tildelt", exNoLimitTile: "Ubegrenset",
    exPerTask: "Per oppgave", exWrongAdded: n => `${n} feil er lagt i «Repeter feil».`,
    exReview: "Se gjennomgang", exRetake: "Ta eksamen på nytt", exHome: "Til forsiden",
    exReviewTitle: "Gjennomgang", exYour: "Ditt svar", exRight: "Riktig svar", exNoAnswer: "Ikke besvart",
    exCorrect: "Riktig", exWrong: "Feil", exUnanswered: "Ubesvart", exFilterAll: "Alle", exFilterWrong: n => `Feil og ubesvart (${n})`,
    exNoneWrong: "Alt er riktig. Godt jobbet!", exBackResult: "Tilbake til resultatet"
  },
  en: {
    dailyGoal: "Daily goal", goalReached: "Daily goal reached", days: ["Mo","Tu","We","Th","Fr","Sa","Su"],
    reviewBtn: n => `Review mistakes (${n})`, unit: n => `Unit ${n}`, jumpHere: "Jump here", start: "START",
    streakTitle: "Day streak", crownsTitle: "Crowns in this course", xpTitle: "Total XP", switchCourse: "Switch course", settings: "Settings",
    foot1: (n, q, g) => `${n} has ${q} fixed questions and ${g} question types with new numbers every time.`,
    foot2: (d, t, c, u) => `${d} of ${t} levels completed · ${c} of ${u} crowns.`,
    allCrowns: "Every unit has a crown. Impressive!", allLevels: "All levels completed. Take the master tests to win crowns.",
    lockedNode: "Complete the previous level first, or use “Jump here”.", lockedMaster: "Complete Level 3 to take the master test.",
    nodeDone: ", completed – practise again", nodeOpen: ", open", nodeLocked: ", locked",
    pickTitle: "Choose a course", resetAll: "Reset all progress", newTag: "NEW", equiv: "Equivalent to",
    levels: [["Basics","Level 1"],["Practice","Level 2"],["Advanced","Level 3"],["Master","Crown"]],
    pickAnswer: "Choose the correct answer", writeAnswer: "Type the answer", review: "Review", jumpTest: "Jump test",
    numHint: "Use a decimal point. Fractions like 1/4 also work.", answerPh: "Answer", check: "Check", correct: "Correct!",
    streakN: n => `${n} in a row!`, notQuite: "Not quite", rightAnswer: "Correct answer:", cont: "Continue",
    quitAria: "Quit the session", livesLeft: n => `${n} lives left`, scratch: "Scratchpad", report: "Report a problem", reportShort: "Report",
    thinkWrong: "Think the answer key is wrong?",
    doneFlawless: "Flawless session!", doneReview: "Review completed", doneLevel: s => `${s} completed!`, doneJump: "Jump approved!", doneCrown: "Crown won!",
    jumpUnlocked: u => `The units before “${u}” are unlocked.`, crownWon: u => `You passed the master test in “${u}”.`,
    streakLine: n => `You have practised ${n} ${n === 1 ? "day" : "days"} in a row.`, tileXp: "XP", tileFirst: "First try", tileTime: "Time",
    failTitle: "Not passed this time", failJump: "The jump test", failMaster: "The master test",
    failText: (w, n, d, t) => `${w} requires fewer than ${n} mistakes. You reached question ${d} of ${t}.`,
    failHint: "Practise the unit's levels and try again. Your mistakes are in “Review mistakes”.", retry: "Try again", back: "Back",
    quitTitle: "Quit the session?", quitText: "You will lose your progress in this lesson.", keepGoing: "Keep practising", quit: "Quit",
    resetTitle: "Reset all progress?", resetText: "XP, streak and completed lessons in every course will be deleted. This cannot be undone.", cancel: "Cancel", reset: "Reset", resetDone: "Progress has been reset.",
    jumpTitle: u => `Jump to “${u}”?`, jumpText: "You get 10 questions from the earlier units. With fewer than 3 mistakes they are unlocked, so you can start here.", startTest: "Start the test",
    setTitle: "Settings", setLang: "Language", setGoal: "Daily goal", setGoalUnit: "XP per day",
    setReminder: "Daily reminder", setReminderNote: "Reminders work in the iPhone and Android app.", setReminderTime: "Time",
    reminderTitle: "Time for today's drill", reminderBody: "Five minutes is enough. Keep your streak going!",
    reminderDenied: "Notifications are turned off for the app. Turn them on in your phone's settings.", reminderOn: h => `Reminder every day at ${h}.`,
    setHaptics: "Vibrate on answers", setFeedback: "Send feedback", setPrivacy: "Privacy", setAbout: "About the app", setReset: "Reset all progress",
    setInbox: n => `Incoming reports (${n})`, inboxEmpty: "No reports yet.",
    bkMake: "Create backup", bkMakeSub: "Move your progress to another device", bkLoad: "Restore backup", bkLoadSub: "Merge with the progress here",
    bkOutText: "Copy the code or save it as a file, then open «Restore backup» on the other device. The code only contains your progress.",
    bkInText: "Paste the code or choose the file. It is merged with the progress already here, and nothing is overwritten.",
    bkCopy: "Copy code", bkShare: "Share", bkFile: "Download file", bkPick: "Choose file", bkImport: "Restore", bkCopied: "Code copied.",
    acLogin: "Log in", acLoginSub: "Same progress on phone and computer. Optional.", acLoginText: "Enter your email and we'll send you a code. No password needed.",
    acEmail: "Email address", acSend: "Send code", acCodeTitle: "Enter the code", acCodeText: e => `We sent a code to ${e}. Check your spam folder too.`,
    acVerify: "Log in", acOtherEmail: "Use another email", acBadEmail: "Enter a valid email address.", acBadCode: "The code is wrong or expired. Try again or request a new one.",
    acErrOffline: "No internet connection. Try again when you're online.", acErrRate: "Too many attempts. Wait a moment and try again.", acError: "Something went wrong while syncing. Try again later.",
    acLoggedIn: e => `Logged in as ${e}. Your progress is synced.`, acLoggedOut: "You're logged out. Your progress is still on this device.",
    acSyncNow: "Sync now", acSyncing: "Syncing …", acSynced: h => `Synced at ${h}`, acSyncedToast: "Progress synced.", acOffline: "Not synced – offline", acSyncOn: "Sync is on",
    acLogout: "Log out", acDelete: "Delete account", acDelTitle: "Delete your account?", acDelOk: "Delete account",
    acDelText: "Your account and the progress stored with us are permanently deleted. The progress on this device stays until you reset it or delete the app.",
    acDeleted: "Your account has been deleted.", acPrivacyNote: "We only store your email address and your progress, in the EU. You can delete your account at any time.",
    bkEmpty: "Paste a code or choose a file first.", bkBad: "No valid backup found in what you pasted.", bkDone: "Progress restored and merged.",
    about: v => `Axle, version ${v}. The questions were made with the help of AI and tested automatically. If you find a mistake, tap the flag on the question – it helps everyone. Contact: ${CONFIG.contactEmail}`,
    repTitle: "Report a problem", fbTitle: "Send feedback", repWhat: "What is wrong?",
    repCats: ["Wrong answer key","Error in the explanation","Unclear question","Typo or language","Other"],
    repMsg: "Short description (optional)", fbMsg: "What would you like to tell us?", repEmail: "Email if you want a reply (optional)",
    send: "Send", sent: "Thank you! The report has been sent.", queued: "Saved. It will be sent when you are online again.",
    notConfigured: "Feedback is not set up in this version yet. The report is saved on the device.", openingMail: "Opening your email app with the report filled in …",
    theory: "Theory", theoryFor: u => `Theory: ${u}`, readTheory: "Read the theory for this part", thStart: "Practice this", thStartFirst: "Start the first lesson",
    noTheory: "Theory for this part is coming soon.", preTitle: "Builds on", preHide: "Hide", preDone: "completed",
    preText: "This course assumes the courses below. If you are unsure, take them first – tap to switch course.", preNice: n => `Also useful: ${n}.`,
    builtOn: "Builds on", pickTheme: "By topic", pickOrder: "Recommended order", stepN: n => n===1 ? "Step 1 · start here" : `Step ${n}`,
    orderNote: "Courses are sorted by what they build on. If you are starting from scratch, take Foundations of Mathematics and Physics first.",
    needText: "Please write something first.", yourAnswer: "Your answer",
    scDraw: "Draw", scCalc: "Calculator", scPen: "Pen", scEraser: "Eraser", scUndo: "Undo", scClear: "Clear", scFit: "Fit",
    scZoomIn: "Zoom in", scZoomOut: "Zoom out", scClose: "Close scratchpad", scTip: "Draw with one finger. Zoom and pan with two.",
    calcPh: "Type an expression, e.g. 2*sin(30) or sqrt(2)/4", calcUse: "Use as answer", calcUsed: "Inserted into the answer field.",
    calcErr: "Can't read the expression", calcEmpty: "Calculate here. Arrow up recalls the last line. “ans” is the last result.",
    privacyTitle: "Privacy",
    // Exam
    exSection: "Exam practice", exIntro: "Fixed problem sets with the same structure every time, but new numbers. Take the time and get an indicative grade.",
    exJumpBtn: "Practice exams", exName: v => `Practice exam ${v}`, exMeta: (n, p, d) => `${n} questions · ${p} points · ${d}`,
    exNotTaken: "Not taken yet", exAttempts: n => n === 1 ? "1 attempt" : `${n} attempts`, exInProgress: "In progress", exPct: p => `${p}%`,
    exBestLine: (g, p, n) => `Best result: ${g} · ${p}% · ${n === 1 ? "1 attempt" : n + " attempts"}`,
    exContinue: "Continue exam", exLeft: s => `${s} left`, exNoLimitShort: "no time limit",
    exSeeResult: (g, p) => `See exam result (${g} · ${p}%)`, exEmpty: "No questions were found for this exam.",
    exDur: (h, m) => h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`,
    exTask: n => `Problem ${n}`, exParts: n => n === 1 ? "1 question" : `${n} questions`, exPts: n => n === 1 ? "1 point" : `${n} points`,
    exOf: (g, m) => `${g} of ${m} points`, exTotal: (n, p) => `In total ${n} questions and ${p} points`,
    exRulesTitle: "How it works",
    exRules: ["No answer key during the exam – you see the result when you hand in.", "You can move between questions and change your answers until you hand in.",
      "The scratchpad and calculator are available.", "The numbers are new every time, but the problems have the same structure.", "The grade is only indicative."],
    exTime: "Time", exRec: d => `Recommended (${d})`, exCustom: "Custom", exNoLimit: "No time limit", exMinutes: "minutes",
    exCustomAria: "Custom time in minutes", exExtra: "Extra time", exExtraNote: "For those entitled to extended time. Your choice is remembered.", exNone: "None",
    exTotalTime: (tot, base, extra) => extra ? `Total time: ${tot} (${base} + ${extra} extra)` : `Total time: ${tot}`,
    exNoLimitNote: "No time limit. The clock shows elapsed time.", exStart: "Start exam",
    exRunningNote: (name, course) => `You have an exam in progress: ${name} · ${course}.`, exResumeIt: "Continue it",
    exReplaceTitle: "Discard the exam in progress?", exReplaceText: (name, course) => `${name} in ${course} has not been handed in. If you start a new one, its answers are deleted.`,
    exReplaceOk: "Discard and start new",
    exCloseAria: "Close the exam", exTimeLeft: "Time left", exElapsed: "No limit", exAnsweredLbl: "Answered", exAnsweredAria: (a, n) => `${a} of ${n} answered`,
    exOverview: "Overview", exPrev: "Previous", exNext: "Next", exFlag: "Flag", exFlagged: "Flagged", exSubmit: "Hand in",
    exFlagAria: "Flag this question so you can find it again", exClear: "Clear answer", exMcHint: "You can change your answer until you hand in.",
    exCloseTitle: "Leave the exam?", exCloseTimed: "Your answers are saved. The clock keeps running while you are away.", exCloseFree: "Your answers are saved.",
    exLater: "Continue later", exSubmitNow: "Hand in now", exDiscard: "Discard exam", exBackTo: "Back to the exam",
    exDiscardTitle: "Discard the exam?", exDiscardText: "Your answers are deleted and the attempt is not recorded.", exDiscardOk: "Discard", exDiscarded: "The exam was discarded.",
    exSubmitTitle: "Hand in the exam?", exSubmitOk: "Hand in exam",
    exSubmitText: (u, f) => (u === 0 ? "All questions are answered." : u === 1 ? "1 question is unanswered." : `${u} questions are unanswered.`) +
      (f ? (f === 1 ? " 1 is flagged." : ` ${f} are flagged.`) : "") + " You cannot change your answers after handing in.",
    exOvSummary: (a, n, f) => `${a} of ${n} answered · ${f} flagged`, exClose: "Close",
    exLegAnswered: "Answered", exLegFlagged: "Flagged", exLegCurrent: "You are here",
    exStAnswered: "answered", exStUnanswered: "unanswered", exStFlagged: "flagged", exStCurrent: "current",
    exFiveLeft: "5 minutes left", exTimeUp: "Time is up – the exam has been handed in",
    exGradeNote: "Indicative grade (common Norwegian A–F percentage scale): A\u00a0≥\u00a089%, B\u00a0≥\u00a077%, C\u00a0≥\u00a065%, D\u00a0≥\u00a053%, E\u00a0≥\u00a041%, otherwise F.",
    exGradeAria: g => `Grade ${g}`, exScore: (p, g, m) => `${p}% · ${g} of ${m} points`, exNewBest: "New personal best!",
    exAuto: "Time ran out, so the exam was handed in automatically.", exUsed: "Time used", exAllowed: "Allowed", exNoLimitTile: "Unlimited",
    exPerTask: "Per problem", exWrongAdded: n => `${n} ${n === 1 ? "mistake was" : "mistakes were"} added to “Review mistakes”.`,
    exReview: "See review", exRetake: "Retake the exam", exHome: "Back to home",
    exReviewTitle: "Review", exYour: "Your answer", exRight: "Correct answer", exNoAnswer: "Not answered",
    exCorrect: "Correct", exWrong: "Wrong", exUnanswered: "Not answered", exFilterAll: "All", exFilterWrong: n => `Wrong or unanswered (${n})`,
    exNoneWrong: "Everything is correct. Well done!", exBackResult: "Back to the result"
  }
};
const t = (key, ...a) => { const v = (UI[LANG] && UI[LANG][key] !== undefined) ? UI[LANG][key] : UI.nb[key]; return typeof v === "function" ? v(...a) : (v === undefined ? key : v); };

// Personvernerklæring (vises i appen og som egen side)
const PRIVACY = {
  nb: `<p><b>Kort fortalt:</b> Appen har ingen reklame og ingen sporing. Konto er valgfritt.</p>
<p><b>Fremgang</b> (XP, dager på rad, fullførte nivåer, innstillinger) lagres lokalt på enheten din. Uten konto sendes den ikke til oss.</p>
<p><b>Konto (valgfritt).</b> Logger du inn, lagrer vi e-postadressen din og en kopi av fremgangen, slik at du får samme fremgang på alle enhetene dine. Dataene lagres hos Supabase i EU (Frankfurt). E-posten med innloggingskoden sendes via tjenesten Resend. Vi bruker dataene bare til innlogging og synkronisering, deler dem ikke med andre og bruker dem ikke til reklame. Du kan slette kontoen under Innstillinger → Slett konto. Da slettes e-postadressen og fremgangen hos oss for godt.</p>
<p><b>Feilrapporter og tilbakemeldinger</b> sendes bare når du selv trykker «Send». Rapporten inneholder det du skriver, hvilken oppgave det gjelder, svaret ditt, språk, appversjon og plattform. Oppgir du e-post, brukes den bare til å svare deg. Rapportene sendes via tjenesten Web3Forms (eller e-postappen din) til utviklerens e-post og slettes når de er behandlet.</p>
<p><b>Påminnelser</b> planlegges lokalt på telefonen. Ingen data sendes ut.</p>
<p>Du kan når som helst slette all fremgang under Innstillinger, eller slette appen. Spørsmål om personvern kan sendes via «Send tilbakemelding» eller til engidrilli@gmail.com.</p>`,
  en: `<p><b>In short:</b> The app has no ads and no tracking. An account is optional.</p>
<p><b>Progress</b> (XP, streak, completed levels, settings) is stored locally on your device. Without an account it is not sent to us.</p>
<p><b>Account (optional).</b> If you log in, we store your email address and a copy of your progress so you get the same progress on all your devices. The data is stored with Supabase in the EU (Frankfurt). The email with your login code is sent through the Resend service. We use the data only for login and syncing, do not share it and do not use it for advertising. You can delete your account under Settings → Delete account, which permanently deletes your email address and progress from our systems.</p>
<p><b>Error reports and feedback</b> are sent only when you tap “Send”. A report contains what you write, which question it concerns, your answer, language, app version and platform. If you give an email address, it is used only to reply to you. Reports are delivered through the Web3Forms service (or your own email app) to the developer's email and deleted once handled.</p>
<p><b>Reminders</b> are scheduled locally on your phone. No data is sent anywhere.</p>
<p>You can delete all progress at any time under Settings, or delete the app. Privacy questions can be sent through “Send feedback” or to engidrilli@gmail.com.</p>`
};
