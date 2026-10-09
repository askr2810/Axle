// ============================================================
//  ELEMENTKALKULATOREN – en stav (1D, aksial last) løst med elementmetoden, steg for steg.
//  Du definerer lengde, stivhet EA(x), fordelt last q(x), punktlaster og opplager, og velger hvilke steg du vil se:
//  sterk form, svak form, formfunksjoner, elementmatriser, sammensetting, løsning, normalkraft og eksakt løsning.
//  Hvert ledd kan trykkes på for å se hvordan man kom dit (som i Photomath). Alt regnes på nytt mens du skriver.
//  Nås fra Labben (#/elementkalkulator) og fra teorien i Elementmetoden.
// ============================================================
let EK = null;
const EK_STEPS = [
  ["ode", ["Differensialligningen", "The differential equation"]], ["weak", ["Svak form", "Weak form"]], ["mesh", ["Elementer og formfunksjoner", "Elements and shape functions"]],
  ["ke", ["Elementstivhetsmatriser", "Element stiffness matrices"]], ["fe", ["Lastvektorer", "Load vectors"]], ["asm", ["Sett sammen K og f", "Assemble K and f"]],
  ["solve", ["Randbetingelser og løsning", "Boundary conditions and solution"]], ["post", ["Tøyning og normalkraft", "Strain and normal force"]], ["exact", ["Sammenlign med eksakt løsning", "Compare with the exact solution"]]];
const EK_EX = [
  [["Jevn last og endelast", "Uniform load and end load"], { L: "4", ea: "20000", q: "5", P: [["10", "4"]], bc: "left", n: 2 }],
  [["Konisk stav (EA avtar)", "Tapered bar (EA decreases)"], { L: "2", ea: "1000(2 - x/2)", q: "0", P: [["10", "2"]], bc: "left", n: 4 }],
  [["Fast i begge ender", "Fixed at both ends"], { L: "3", ea: "30000", q: "0", P: [["15", "1"]], bc: "both", n: 3 }],
  [["Lineært økende last", "Linearly increasing load"], { L: "4", ea: "20000", q: "2x", P: [], bc: "left", n: 4 }]];

// ---------- uttrykk: tolkes trygt (ingen eval) og skrives pent som formel ----------
const EK_FN = ["sqrt", "sin", "cos", "tan", "exp", "ln"];
function ekParse(src){
  const s = String(src ?? "").replace(/,/g, ".").replace(/[·×]/g, "*").replace(/[−–]/g, "-").replace(/÷/g, "/").replace(/\s+/g, "");
  if(!s) throw new Error("empty");
  const tk = []; let i = 0;
  while(i < s.length){ const c = s[i];
    if(/[0-9.]/.test(c)){ let j = i; while(j < s.length && /[0-9.]/.test(s[j])) j++; const v = Number(s.slice(i, j)); if(!Number.isFinite(v)) throw new Error("num"); tk.push({ k: "n", v }); i = j; continue; }
    if(c === "π"){ tk.push({ k: "c", n: "pi" }); i++; continue; }
    if(/[a-zA-Z]/.test(c)){ let j = i; while(j < s.length && /[a-zA-Z]/.test(s[j])) j++; let w = s.slice(i, j); i = j;
      while(w){ const f = EK_FN.find(n => w.startsWith(n)); if(f){ tk.push({ k: "f", n: f }); w = w.slice(f.length); continue; }
        if(w.startsWith("pi")){ tk.push({ k: "c", n: "pi" }); w = w.slice(2); continue; }
        const ch = w[0]; w = w.slice(1);
        if(ch === "x" || ch === "L") tk.push({ k: "v", n: ch }); else if(ch === "e") tk.push({ k: "c", n: "e" }); else throw new Error("name"); }
      continue; }
    if("+-*/^()".includes(c)){ tk.push({ k: c }); i++; continue; }
    throw new Error("char"); }
  let p = 0; const peek = () => tk[p], eat = k => { if(tk[p] && tk[p].k === k){ p++; return true; } return false; };
  const atom = () => { const t = tk[p++]; if(!t) throw new Error("end");
    if(t.k === "n") return { t: "n", v: t.v }; if(t.k === "v") return { t: "v", n: t.n }; if(t.k === "c") return { t: "c", n: t.n };
    if(t.k === "f"){ if(!eat("(")) throw new Error("fn"); const a = expr(); if(!eat(")")) throw new Error("paren"); return { t: "f", n: t.n, a }; }
    if(t.k === "("){ const a = expr(); if(!eat(")")) throw new Error("paren"); return { t: "p", a }; }
    throw new Error("tok"); };
  const pow = () => { const b = atom(); if(eat("^")) return { t: "b", o: "^", a: b, b: unary() }; return b; };
  const unary = () => { if(eat("-")) return { t: "u", a: unary() }; if(eat("+")) return unary(); return pow(); };
  const term = () => { let a = unary();
    for(;;){ if(eat("*")){ a = { t: "b", o: "*", a, b: unary() }; continue; } if(eat("/")){ a = { t: "b", o: "/", a, b: unary() }; continue; }
      const n = peek(); if(n && ["n", "v", "c", "f", "("].includes(n.k)){ a = { t: "b", o: "*", a, b: pow(), imp: 1 }; continue; } return a; } };
  const expr = () => { let a = term(); for(;;){ if(eat("+")){ a = { t: "b", o: "+", a, b: term() }; continue; } if(eat("-")){ a = { t: "b", o: "-", a, b: term() }; continue; } return a; } };
  const ast = expr(); if(p !== tk.length) throw new Error("rest"); return ast;
}
function ekEval(n, x, L){
  switch(n.t){
    case "n": return n.v; case "v": return n.n === "x" ? x : L; case "c": return n.n === "pi" ? Math.PI : Math.E; case "p": return ekEval(n.a, x, L); case "u": return -ekEval(n.a, x, L);
    case "f": { const a = ekEval(n.a, x, L); return { sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log }[n.n](a); }
    case "b": { const a = ekEval(n.a, x, L), b = ekEval(n.b, x, L); return n.o === "+" ? a + b : n.o === "-" ? a - b : n.o === "*" ? a * b : n.o === "/" ? a / b : Math.pow(a, b); }
  } return NaN;
}
const EK_PREC = n => n.t === "b" ? ({ "+": 1, "-": 1, "*": 2, "/": 5, "^": 4 })[n.o] : n.t === "u" ? 3 : 5;
function ekTex(n, par = 0){
  const w = (s, pr) => pr < par ? `\\left(${s}\\right)` : s;
  switch(n.t){
    case "n": return ekNum(n.v, 6); case "v": return n.n; case "c": return n.n === "pi" ? "\\pi" : "e"; case "p": return ekTex(n.a, par);
    case "u": return w("-" + ekTex(n.a, 3), 3);
    case "f": return n.n === "sqrt" ? `\\sqrt{${ekTex(n.a)}}` : `\\${n.n}\\left(${ekTex(n.a)}\\right)`;
    case "b": {
      if(n.o === "+") return w(`${ekTex(n.a, 1)} + ${ekTex(n.b, 1)}`, 1);
      if(n.o === "-") return w(`${ekTex(n.a, 1)} - ${ekTex(n.b, 2)}`, 1);
      if(n.o === "/") return `\\frac{${ekTex(n.a)}}{${ekTex(n.b)}}`;
      if(n.o === "^") return w(`{${ekTex(n.a, 5)}}^{${ekTex(n.b)}}`, 4);
      const bb = n.b.t === "p" ? n.b.a : n.b, imp = n.a.t === "n" && (bb.t === "v" || bb.t === "c" || bb.t === "f" || n.b.t === "p" || (bb.t === "b" && bb.o === "^" && bb.a.t !== "n"));
      return w(imp ? `${ekTex(n.a, 2)}${n.b.t === "p" ? `\\left(${ekTex(n.b.a)}\\right)` : ekTex(n.b, 2)}` : `${ekTex(n.a, 2)} \\cdot ${ekTex(n.b, 2)}`, 2); }
  } return "?";
}
// Tall i formler: 4 gjeldende siffer, tusenskille og desimalkomma (punktum på engelsk via rich/decPoint)
function ekNum(v, sig = 4){
  if(!Number.isFinite(v)) return "?"; if(Math.abs(v) < 1e-12) return "0";
  const r = +v.toPrecision(sig), neg = r < 0, a = Math.abs(r);
  if(a >= 1e7 || a < 1e-4){ const [m, e] = a.toExponential(sig - 1).split("e"); return (neg ? "-" : "") + m.replace(/\.?0+$/, "").replace(".", "{,}") + " \\cdot 10^{" + (+e) + "}"; }
  let [ip, dp] = String(a).split("."); ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return (neg ? "-" : "") + ip + (dp ? "{,}" + dp : "");
}
const ekD = s => texD(typeof decPoint === "function" && decPoint() ? s.replace(/\{,\}/g, ".") : s);
const ekI = s => rich("$" + s + "$");
const ekTxt = v => { const s = ekNum(v).replace(/\\,/g, " ").replace(/\{,\}/g, typeof decPoint === "function" && decPoint() ? "." : ","); return s.includes("\\cdot") ? ekI(ekNum(v)) : s.replace(/^-/, "−"); };

// ---------- beregningen ----------
const EK_GP = [[-0.906179845938664, 0.236926885056189], [-0.538469310105683, 0.478628670499366], [0, 0.568888888888889], [0.538469310105683, 0.478628670499366], [0.906179845938664, 0.236926885056189]];
const ekGauss = (f, a, b) => { const m = (a + b) / 2, h = (b - a) / 2; return EK_GP.reduce((s, [t, w]) => s + w * f(m + h * t), 0) * h; };
function ekSolveLin(A, b){
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for(let c = 0; c < n; c++){ let p = c; for(let r = c + 1; r < n; r++) if(Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if(Math.abs(M[p][c]) < 1e-14) throw new Error("singular"); [M[c], M[p]] = [M[p], M[c]];
    for(let r = c + 1; r < n; r++){ const f = M[r][c] / M[c][c]; for(let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } }
  const x = Array(n).fill(0); for(let r = n - 1; r >= 0; r--){ let s = M[r][n]; for(let k = r + 1; k < n; k++) s -= M[r][k] * x[k]; x[r] = s / M[r][r]; } return x;
}
function ekCompute(cfg){
  const num = s => Number(String(s).replace(",", ".").replace(/[−–]/g, "-"));
  const L = num(cfg.L); if(!(L > 0) || L > 1e4) throw { m: T("Lengden L må være et positivt tall (i meter).", "The length L must be a positive number (in metres).") };
  let eaA, qA; try{ eaA = ekParse(cfg.ea); }catch(e){ throw { m: T("Forstår ikke EA(x). Skriv for eksempel 20000 eller 20000(1 - x/8).", "Can't read EA(x). Write e.g. 20000 or 20000(1 - x/8).") }; }
  try{ qA = ekParse(String(cfg.q).trim() === "" ? "0" : cfg.q); }catch(e){ throw { m: T("Forstår ikke q(x). Skriv for eksempel 5, 2x eller 0.", "Can't read q(x). Write e.g. 5, 2x or 0.") }; }
  const EA = x => ekEval(eaA, x, L), q = x => ekEval(qA, x, L);
  for(let i = 0; i <= 200; i++){ const x = L * i / 200, e = EA(x), w = q(x);
    if(!(e > 0) || !Number.isFinite(e)) throw { m: T(`EA(x) må være positiv i hele staven, men er ${ekTxt(e)} i x = ${ekTxt(x)}.`, `EA(x) must be positive along the whole bar, but is ${ekTxt(e)} at x = ${ekTxt(x)}.`) };
    if(!Number.isFinite(w)) throw { m: T("q(x) gir ikke et tall overalt i staven.", "q(x) is not a number everywhere along the bar.") }; }
  const P = (cfg.P || []).map(([p, x]) => [num(p), num(x)]).filter(([p, x]) => Number.isFinite(p) && Number.isFinite(x) && p !== 0);
  for(const [, x] of P) if(x < 0 || x > L) throw { m: T(`En punktlast står i x = ${ekTxt(x)}, utenfor staven (0 til ${ekTxt(L)}).`, `A point load is at x = ${ekTxt(x)}, outside the bar (0 to ${ekTxt(L)}).`) };
  const n = Math.max(1, Math.min(8, +cfg.n || 1)), cst = f => { const a = f(0); for(let i = 1; i <= 20; i++) if(Math.abs(f(L * i / 20) - a) > 1e-9 * Math.max(1, Math.abs(a))) return false; return true; };
  // noder: jevn inndeling + en node der hver punktlast virker
  const xs0 = Array.from({ length: n + 1 }, (_, i) => L * i / n), xsAll = [...xs0], added = [];
  for(const [, x] of P) if(!xsAll.some(v => Math.abs(v - x) < 1e-9 * L)){ xsAll.push(x); added.push(x); }
  const X = xsAll.sort((a, b) => a - b), nn = X.length, ne = nn - 1;
  const els = []; for(let e = 0; e < ne; e++){ const a = X[e], b = X[e + 1], Le = b - a, iEA = ekGauss(EA, a, b);
    els.push({ a, b, Le, iEA, k: iEA / (Le * Le), f1: ekGauss(x => (b - x) / Le * q(x), a, b), f2: ekGauss(x => (x - a) / Le * q(x), a, b), qa: q(a), qb: q(b) }); }
  const K = Array.from({ length: nn }, () => Array(nn).fill(0)), F = Array(nn).fill(0), Fq = Array(nn).fill(0), Fp = Array(nn).fill(0);
  els.forEach((el, e) => { K[e][e] += el.k; K[e][e + 1] -= el.k; K[e + 1][e] -= el.k; K[e + 1][e + 1] += el.k; Fq[e] += el.f1; Fq[e + 1] += el.f2; });
  for(const [p, x] of P){ const i = X.findIndex(v => Math.abs(v - x) < 1e-9 * L); Fp[i] += p; }
  for(let i = 0; i < nn; i++) F[i] = Fq[i] + Fp[i];
  const bc = ["left", "right", "both"].includes(cfg.bc) ? cfg.bc : "left", fixed = bc === "left" ? [0] : bc === "right" ? [nn - 1] : [0, nn - 1], free = [...Array(nn).keys()].filter(i => !fixed.includes(i));
  const Kff = free.map(i => free.map(j => K[i][j])), Ff = free.map(i => F[i]), uf = free.length ? ekSolveLin(Kff, Ff) : [];
  const u = Array(nn).fill(0); free.forEach((i, k) => { u[i] = uf[k]; });
  const R = fixed.map(i => K[i].reduce((s, kij, j) => s + kij * u[j], 0) - F[i]);
  els.forEach((el, e) => { el.eps = (u[e + 1] - u[e]) / el.Le; el.N = el.iEA / el.Le * el.eps; });
  // eksakt løsning: N' = -q (sprang -P i punktlaster), u' = N/EA, med randbetingelsene
  // Rutenett med punktlastene som doble punkter (venstre- og høyregrense), så spranget i N blir eksakt.
  const pts = []; for(let i = 0; i <= 2400; i++) pts.push([L * i / 2400, 0]);
  for(const [, xi] of P) if(xi >= 0 && xi < L) pts.push([xi, 0], [xi, 1]);
  pts.sort((p1, p2) => p1[0] - p2[0] || p1[1] - p2[1]);
  const gx = pts.map(p => p[0]), aft = pts.map(p => p[1]), M = gx.length - 1, Q = Array(M + 1).fill(0);
  for(let i = 1; i <= M; i++){ const a = gx[i - 1], b = gx[i]; Q[i] = Q[i - 1] + (b - a) / 6 * (q(a) + 4 * q((a + b) / 2) + q(b)); }
  const tol = 1e-12 * L, Pl = (x, af) => P.reduce((s, [p, xi]) => s + (xi < x - tol || (af && Math.abs(xi - x) <= tol) ? p : 0), 0), Ptot = P.reduce((s, [p]) => s + p, 0), Qt = Q[M];
  const G = gx.map((x, i) => Q[i] + Pl(x, aft[i])); // last fra 0 til x
  let N0; const cum = f => { const out = [0]; for(let i = 1; i <= M; i++) out.push(out[i - 1] + (gx[i] - gx[i - 1]) / 2 * (f(i - 1) + f(i))); return out; };
  // venstre fast: N(x) = alt som virker til høyre for x; høyre fast: N(x) = −(alt til venstre for x); begge faste: u(L) = 0 bestemmer N(0)
  if(bc === "left") N0 = Qt + Ptot;
  else if(bc === "right") N0 = 0;
  else { const I1 = cum(i => G[i] / EA(gx[i])), I0 = cum(i => 1 / EA(gx[i])); N0 = I1[M] / I0[M]; }
  const Nx = gx.map((x, i) => N0 - G[i]);
  const Iu = cum(i => Nx[i] / EA(gx[i])), ux = bc === "right" ? Iu.map(v => v - Iu[M]) : Iu;
  const uAt = x => { let lo = 0, hi = M; while(hi - lo > 1){ const m = (lo + hi) >> 1; if(gx[m] <= x) lo = m; else hi = m; } const w = gx[hi] - gx[lo]; return w > 0 ? ux[lo] + (ux[hi] - ux[lo]) * (x - gx[lo]) / w : ux[lo]; };
  return { L, n, eaA, qA, EA, q, eaC: cst(EA), qC: cst(q), qLin: !cst(q) && Math.abs(q(L / 2) - (q(0) + q(L)) / 2) < 1e-9 * Math.max(1, Math.abs(q(L))) && Math.abs(q(L / 4) - (3 * q(0) + q(L)) / 4) < 1e-9 * Math.max(1, Math.abs(q(L))),
    P, X, nn, ne, els, added, K, F, Fq, Fp, bc, fixed, free, Kff, Ff, u, R, gx, Nx, ux, uAt, Ptot, Qt };
}

// ---------- stegene (hvert ledd har en «hvorfor») ----------
const ekMat = (A, f = v => ekNum(v)) => `\\begin{bmatrix}${A.map(r => r.map(f).join(" & ")).join(" \\\\ ")}\\end{bmatrix}`;
const ekVec = (v, f = x => ekNum(x)) => `\\begin{bmatrix}${v.map(f).join(" \\\\ ")}\\end{bmatrix}`;
function ekSteps(r){
  const eaT = ekTex(r.eaA), qT = ekTex(r.qA), qPart = r.qC && Math.abs(r.q(0)) < 1e-14 ? "" : /^-/.test(qT) ? " " + qT : " + " + qT, fx = r.fixed.map(i => i === 0 ? "u(0) = 0" : "u(L) = 0"), endP = x => r.P.filter(([, xi]) => Math.abs(xi - x) < 1e-9 * r.L).reduce((s, [p]) => s + p, 0);
  const inner = r.P.filter(([, x]) => x > 1e-9 * r.L && x < r.L * (1 - 1e-9)), S = {}, k1 = "\\begin{bmatrix}1 & -1 \\\\ -1 & 1\\end{bmatrix}";
  const nod = i => `u_{${i + 1}}`;
  S.ode = { intro: T("Først sier vi hva som skal være oppfylt i hvert punkt av staven: likevekt og Hookes lov.", "First we state what must hold at every point of the bar: equilibrium and Hooke's law."), lines: [
    { tex: "\\frac{dN}{dx} + q(x) = 0", why: T("Se på en liten bit av staven med lengde dx. Kraften N trekker i hver ende, og lasten q·dx virker på biten. Likevekt: N(x + dx) − N(x) + q·dx = 0. Del på dx, så får du dN/dx + q = 0.", "Look at a small piece of the bar with length dx. The force N pulls at each end, and the load q·dx acts on the piece. Equilibrium: N(x + dx) − N(x) + q·dx = 0. Divide by dx and you get dN/dx + q = 0.") },
    { tex: "N = EA\\,\\varepsilon = EA\\,\\frac{du}{dx}", why: T("Hookes lov: σ = E·ε, og N = σ·A. Tøyningen er hvor mye staven strekkes per lengde, ε = du/dx (u er forskyvningen).", "Hooke's law: σ = E·ε, and N = σ·A. The strain is the stretch per unit length, ε = du/dx (u is the displacement).") },
    { tex: "\\frac{d}{dx}\\left(EA(x)\\,\\frac{du}{dx}\\right) + q(x) = 0,\\qquad 0 < x < L", why: T("Sett N = EA·du/dx inn i likevekten. Dette er stavens differensialligning – den sterke formen.", "Insert N = EA·du/dx into the equilibrium. This is the bar's differential equation – the strong form.") },
    r.eaC ? { tex: `${eaT}\\,\\frac{d^2u}{dx^2}${qPart} = 0`, why: T(`Med dine tall: EA = ${ekTxt(r.EA(0))} er konstant, så den kan flyttes ut av derivasjonen. Da står det EA·u'' = −q.`, `With your numbers: EA = ${ekTxt(r.EA(0))} is constant, so it moves outside the derivative. Then EA·u'' = −q.`) }
      : { tex: `\\frac{d}{dx}\\left(${eaT}\\,\\frac{du}{dx}\\right)${qPart} = 0`, why: T("Med dine uttrykk satt inn. EA varierer med x, så den må bli stående inne i derivasjonen.", "With your expressions inserted. EA varies with x, so it must stay inside the derivative.") },
    { tex: fx.join(",\\quad ") + (r.bc === "left" ? `,\\qquad N(L) = EA\\,u'(L) = ${ekNum(endP(r.L))}` : r.bc === "right" ? `,\\qquad N(0) = -${ekNum(endP(0)) === "0" ? "0" : `\\left(${ekNum(endP(0))}\\right)`}` : ""),
      why: T("Randbetingelsene: der staven er fast, kan den ikke flytte seg (u = 0) – det kalles en essensiell randbetingelse. I en fri ende må normalkraften være lik kraften som virker der (naturlig randbetingelse). Er det ingen kraft, er N = 0.", "Boundary conditions: where the bar is fixed it cannot move (u = 0) – an essential boundary condition. At a free end the normal force must equal the force acting there (natural boundary condition). With no force, N = 0.") },
    ...inner.map(([p, x]) => ({ tex: `N(x^-) - N(x^+) = ${ekNum(p)}\\quad \\text{i}\\ x = ${ekNum(x)}`, why: T("En punktlast inne i staven gir et sprang i normalkraften like stort som lasten. Til høyre for lasten bærer staven ikke lenger denne lasten.", "A point load inside the bar makes the normal force jump by the size of the load. To the right of the load the bar no longer carries it.") }))] };
  S.weak = { intro: T("FEM bruker ikke ligningen direkte, men en «svak» versjon der vi bare trenger én derivert.", "FEM does not use the equation directly, but a 'weak' version that only needs one derivative."), lines: [
    { tex: "\\int_0^L \\left[\\left(EA\\,u'\\right)' + q\\right] v\\,dx = 0", why: T("Gang ligningen med en vilkårlig testfunksjon v(x) (tenk på den som en tenkt, liten forskyvning) og integrer over staven. Hvis dette er null for alle v, må parentesen være null overalt. Vi velger v = 0 der u er kjent.", "Multiply the equation by an arbitrary test function v(x) (think of it as a small imagined displacement) and integrate over the bar. If this is zero for all v, the bracket must be zero everywhere. We choose v = 0 where u is known.") },
    { tex: "\\int_0^L \\left(EA\\,u'\\right)' v\\,dx = \\Big[EA\\,u'\\,v\\Big]_0^L - \\int_0^L EA\\,u'\\,v'\\,dx", why: T("Delvis integrasjon: ∫ f'·g dx = [f·g] − ∫ f·g' dx med f = EA·u' og g = v. Nå trenger u bare én derivert – derfor holder rette linjestykker (lineære elementer).", "Integration by parts: ∫ f'·g dx = [f·g] − ∫ f·g' dx with f = EA·u' and g = v. Now u needs only one derivative – that is why straight line pieces (linear elements) are enough.") },
    { tex: "\\int_0^L EA\\,u'\\,v'\\,dx = \\int_0^L q\\,v\\,dx + \\Big[N\\,v\\Big]_0^L" + (inner.length ? " + \\sum_i P_i\\,v(x_i)" : ""), why: T("Flytt leddet over. EA·u' er normalkraften N. Punktlaster inne i staven gir et ledd P·v(x) hver, fordi N hopper der.", "Move the term across. EA·u' is the normal force N. Point loads inside the bar give a term P·v(x) each, because N jumps there.") },
    { tex: "\\int_0^L EA\\,u'\\,v'\\,dx = \\int_0^L q\\,v\\,dx + \\sum_i P_i\\,v(x_i)", why: T("I en fast ende er v = 0, så randleddet forsvinner der. I en fri ende er N lik lasten i enden, som da blir en av punktlastene P_i. Venstre side er «indre virtuelt arbeid», høyre side «ytre virtuelt arbeid».", "At a fixed end v = 0, so the boundary term vanishes. At a free end N equals the end load, which becomes one of the point loads P_i. The left side is 'internal virtual work', the right side 'external virtual work'.") }] };
  const xsT = r.X.map((x, i) => `x_{${i + 1}} = ${ekNum(x)}`).join(",\\; ");
  S.mesh = { intro: T(`Staven deles i ${r.ne} element${r.ne === 1 ? "" : "er"} med ${r.nn} noder. Ukjente: forskyvningen i hver node.`, `The bar is split into ${r.ne} element${r.ne === 1 ? "" : "s"} with ${r.nn} nodes. Unknowns: the displacement at each node.`), lines: [
    { tex: xsT, why: r.added.length ? T(`Du valgte ${r.n} like elementer. I tillegg la vi en node der punktlasten virker (x = ${r.added.map(ekTxt).join(", ")}), så lasten havner rett på en node.`, `You chose ${r.n} equal elements. We also put a node where the point load acts (x = ${r.added.map(ekTxt).join(", ")}), so the load sits right on a node.`) : T(`Staven deles i ${r.n} like lange elementer. Punktlastene står allerede på noder.`, `The bar is split into ${r.n} equal elements. The point loads already sit on nodes.`) },
    { tex: "N_1(x) = \\frac{x_2 - x}{L_e},\\qquad N_2(x) = \\frac{x - x_1}{L_e}", why: T("Formfunksjonene: N₁ er 1 i elementets venstre node og 0 i høyre, N₂ omvendt. De er rette linjer.", "The shape functions: N₁ is 1 at the element's left node and 0 at the right, N₂ the other way round. They are straight lines.") },
    { tex: "u^h(x) = N_1(x)\\,u_1 + N_2(x)\\,u_2", why: T("Inne i elementet antar vi at forskyvningen varierer lineært mellom nodeverdiene u₁ og u₂.", "Inside the element we assume the displacement varies linearly between the nodal values u₁ and u₂.") },
    { tex: "\\varepsilon = \\frac{du^h}{dx} = \\underbrace{\\frac{1}{L_e}\\begin{bmatrix}-1 & 1\\end{bmatrix}}_{B}\\begin{bmatrix}u_1 \\\\ u_2\\end{bmatrix} = \\frac{u_2 - u_1}{L_e}", why: T("Deriverer vi N₁ og N₂, får vi −1/L_e og 1/L_e. Tøyningen blir derfor konstant i hvert element.", "Differentiating N₁ and N₂ gives −1/L_e and 1/L_e. So the strain is constant in each element.") }] };
  const allSame = r.els.every(el => Math.abs(el.k - r.els[0].k) < 1e-9 * r.els[0].k);
  S.ke = { intro: T("Hvert element får en 2×2-matrise som sier hvor stivt det er.", "Each element gets a 2×2 matrix saying how stiff it is."), lines: [
    { tex: `k^{(e)} = \\int_{x_1}^{x_2} B^{T} EA(x)\\, B\\,dx = \\frac{1}{L_e^2}\\left(\\int_{x_1}^{x_2} EA\\,dx\\right) ${k1}`, why: T("Sett u^h og v^h inn i ∫EA·u'·v'dx for ett element. Det blir vᵀ·k·u. Fordi B er konstant, er det bare EA som må integreres.", "Insert u^h and v^h into ∫EA·u'·v'dx for one element. It becomes vᵀ·k·u. Since B is constant, only EA has to be integrated.") },
    r.eaC ? { tex: `k^{(e)} = \\frac{EA}{L_e}${k1}`, why: T("Er EA konstant, er ∫EA dx = EA·L_e, og det forenkles til EA/L_e.", "If EA is constant, ∫EA dx = EA·L_e, and it simplifies to EA/L_e.") }
      : { tex: `k^{(e)} = \\frac{\\overline{EA}}{L_e}${k1},\\qquad \\overline{EA} = \\frac{1}{L_e}\\int_{x_1}^{x_2} ${eaT}\\,dx`, why: T("EA varierer, så elementet får gjennomsnittet av EA over elementet. Integralet regnes med Gauss-integrasjon (5 punkter, eksakt for polynomer opp til grad 9).", "EA varies, so the element uses the average EA over the element. The integral is computed with Gauss quadrature (5 points, exact for polynomials up to degree 9).") },
    ...(allSame ? [{ tex: `k^{(1)} = \\dots = k^{(${r.ne})} = ${ekNum(r.els[0].k)}\\,${k1}`, why: T(`Alle elementene er like: L_e = ${ekTxt(r.els[0].Le)} og EA/L_e = ${ekTxt(r.els[0].iEA)} / ${ekTxt(r.els[0].Le)}² = ${ekTxt(r.els[0].k)}.`, `All elements are equal: L_e = ${ekTxt(r.els[0].Le)} and EA/L_e = ${ekTxt(r.els[0].iEA)} / ${ekTxt(r.els[0].Le)}² = ${ekTxt(r.els[0].k)}.`) }]
      : r.els.map((el, e) => ({ tex: `k^{(${e + 1})} = ${ekNum(el.k)}\\,${k1}`, why: T(`Element ${e + 1} går fra x = ${ekTxt(el.a)} til ${ekTxt(el.b)}, så L_e = ${ekTxt(el.Le)}. ∫EA dx = ${ekTxt(el.iEA)}, og ${ekTxt(el.iEA)} / ${ekTxt(el.Le)}² = ${ekTxt(el.k)}.`, `Element ${e + 1} runs from x = ${ekTxt(el.a)} to ${ekTxt(el.b)}, so L_e = ${ekTxt(el.Le)}. ∫EA dx = ${ekTxt(el.iEA)}, and ${ekTxt(el.iEA)} / ${ekTxt(el.Le)}² = ${ekTxt(el.k)}.`) })))] };
  const qZero = r.qC && Math.abs(r.q(0)) < 1e-14;
  S.fe = { intro: T("Lastene gjøres om til krefter i nodene.", "The loads are turned into forces at the nodes."), lines: qZero ? [
    { tex: "f^{(e)} = 0", why: T("Det er ingen fordelt last (q = 0), så elementene får ingen lastvektor. Bare punktlastene virker.", "There is no distributed load (q = 0), so the elements get no load vector. Only the point loads act.") }] : [
    { tex: "f^{(e)} = \\int_{x_1}^{x_2} \\begin{bmatrix}N_1 \\\\ N_2\\end{bmatrix} q(x)\\,dx", why: T("Høyre side ∫q·v dx for ett element. Lasten fordeles på de to nodene, vektet med formfunksjonene: nær venstre node får venstre node mest.", "The right side ∫q·v dx for one element. The load is shared between the two nodes, weighted by the shape functions: near the left node, the left node gets most.") },
    r.qC ? { tex: "f^{(e)} = \\frac{q\\,L_e}{2}\\begin{bmatrix}1 \\\\ 1\\end{bmatrix}", why: T("Med konstant q får hver node halvparten av lasten på elementet (q·L_e).", "With constant q each node gets half of the load on the element (q·L_e).") }
      : r.qLin ? { tex: "f^{(e)} = \\frac{L_e}{6}\\begin{bmatrix}2q_1 + q_2 \\\\ q_1 + 2q_2\\end{bmatrix}", why: T("Med lineær q (q₁ i venstre node, q₂ i høyre) gir integralet denne formelen. Noden der lasten er størst, får mest.", "With linear q (q₁ at the left node, q₂ at the right) the integral gives this formula. The node where the load is largest gets most.") }
      : { tex: "f^{(e)} \\approx \\sum_{g} w_g\\,\\begin{bmatrix}N_1(x_g) \\\\ N_2(x_g)\\end{bmatrix} q(x_g)\\,\\frac{L_e}{2}", why: T("q er ikke en enkel linje, så integralet regnes med Gauss-integrasjon (5 punkter).", "q is not a simple line, so the integral is computed with Gauss quadrature (5 points).") },
    ...r.els.map((el, e) => ({ tex: `f^{(${e + 1})} = ${ekVec([el.f1, el.f2])}`, why: T(`Element ${e + 1}: q går fra ${ekTxt(el.qa)} til ${ekTxt(el.qb)} over L_e = ${ekTxt(el.Le)}. Til sammen ${ekTxt(el.f1 + el.f2)} kN på elementet.`, `Element ${e + 1}: q goes from ${ekTxt(el.qa)} to ${ekTxt(el.qb)} over L_e = ${ekTxt(el.Le)}. In total ${ekTxt(el.f1 + el.f2)} kN on the element.`) }))] };
  S.fe.lines.push(...r.P.map(([p, x]) => { const i = r.X.findIndex(v => Math.abs(v - x) < 1e-9 * r.L); return { tex: `F_{${i + 1}} \\mathrel{+}= ${ekNum(p)}`, why: T(`Punktlasten ${ekTxt(p)} kN i x = ${ekTxt(x)} står på node ${i + 1}, så den legges rett inn der. Positiv betyr i +x-retning.`, `The point load ${ekTxt(p)} kN at x = ${ekTxt(x)} sits on node ${i + 1}, so it goes straight in there. Positive means in the +x direction.`) }; }));
  const big = r.nn > 9;
  S.asm = { intro: T("Elementene settes sammen til ett stort ligningssystem for hele staven.", "The elements are put together into one large system of equations for the whole bar."), lines: [
    { tex: "K\\,u = f", why: T(`Element e kobler node e og e + 1. Hver elementmatrise legges inn i rad og kolonne e og e + 1 i den store matrisen K (${r.nn}×${r.nn}).`, `Element e connects node e and e + 1. Each element matrix is added into rows and columns e and e + 1 of the big matrix K (${r.nn}×${r.nn}).`) },
    big ? { tex: `K = \\text{${T("båndmatrise", "band matrix")}}\\ ${r.nn}\\times${r.nn}`, why: T("Matrisen er for stor til å vises pent, men har tall bare på diagonalen og rett ved siden av.", "The matrix is too large to show nicely, but only has numbers on the diagonal and right next to it.") }
      : { tex: `K = ${ekMat(r.K)}`, why: T("Der to elementer møtes i en node, legges stivhetene sammen. Derfor står k⁽¹⁾ + k⁽²⁾ på diagonalen i node 2. Matrisen er symmetrisk og har null langt fra diagonalen.", "Where two elements meet at a node, their stiffnesses are added. That is why k⁽¹⁾ + k⁽²⁾ sits on the diagonal at node 2. The matrix is symmetric and zero far from the diagonal.") },
    { tex: `f = ${big ? "\\dots" : ekVec(r.F)}`, why: T("Lastvektoren: bidragene fra den fordelte lasten i hvert element pluss punktlastene i nodene.", "The load vector: the contributions from the distributed load in each element plus the point loads at the nodes.") }] };
  const fixT = r.fixed.map(i => `${nod(i)} = 0`).join(",\\; "), ufT = r.free.map(i => nod(i));
  S.solve = { intro: T("Vi setter inn det vi vet (faste noder) og løser for resten.", "We insert what we know (fixed nodes) and solve for the rest."), lines: [
    { tex: fixT, why: T("I en fast node er forskyvningen kjent (null). Vi stryker raden og kolonnen til den noden. Raden tar vi vare på – den gir reaksjonskraften etterpå.", "At a fixed node the displacement is known (zero). We strike out that node's row and column. We keep the row – it gives the reaction force afterwards.") },
    r.free.length <= 6 ? { tex: `${ekMat(r.Kff)}${ekVec(ufT, s => s)} = ${ekVec(r.Ff)}`, why: T("Det som er igjen, er et vanlig lineært ligningssystem med én ligning per fri node.", "What remains is an ordinary linear system with one equation per free node.") }
      : { tex: "K_{ff}\\,u_f = f_f", why: T("Det som er igjen, er et vanlig lineært ligningssystem med én ligning per fri node.", "What remains is an ordinary linear system with one equation per free node.") },
    { tex: `${ekVec(ufT, s => s)} = ${ekVec(r.free.map(i => r.u[i]))}\\ \\text{m}`, why: r.free.length === 1 ? T(`Bare én ukjent: u = f / k = ${ekTxt(r.Ff[0])} / ${ekTxt(r.Kff[0][0])}.`, `Only one unknown: u = f / k = ${ekTxt(r.Ff[0])} / ${ekTxt(r.Kff[0][0])}.`) : T("Løst med Gauss-eliminasjon: bruk den første ligningen til å fjerne en ukjent fra de neste, til den siste ligningen har én ukjent. Sett så inn baklengs.", "Solved by Gaussian elimination: use the first equation to remove one unknown from the next ones, until the last equation has one unknown. Then substitute backwards.") },
    { tex: r.free.map(i => `${nod(i)} = ${ekNum(r.u[i] * 1000)}\\ \\text{mm}`).join(",\\; "), why: T("Det samme i millimeter (gang med 1000). Positiv betyr at punktet flytter seg i +x-retning.", "The same in millimetres (multiply by 1000). Positive means the point moves in the +x direction.") },
    { tex: r.fixed.map((i, k) => `R_{${i + 1}} = ${ekNum(r.R[k])}\\ \\text{kN}`).join(",\\; "), why: T(`Reaksjonen i opplageret fra raden vi strøk: R = (K·u)ᵢ − fᵢ. Sjekk: reaksjoner + punktlaster + ∫q dx = ${ekTxt(r.R.reduce((s, v) => s + v, 0))} + ${ekTxt(r.Ptot)} + ${ekTxt(r.Qt)} = ${ekTxt(r.R.reduce((s, v) => s + v, 0) + r.Ptot + r.Qt)} ≈ 0.`, `The support reaction from the row we struck out: R = (K·u)ᵢ − fᵢ. Check: reactions + point loads + ∫q dx = ${ekTxt(r.R.reduce((s, v) => s + v, 0))} + ${ekTxt(r.Ptot)} + ${ekTxt(r.Qt)} = ${ekTxt(r.R.reduce((s, v) => s + v, 0) + r.Ptot + r.Qt)} ≈ 0.`) }] };
  S.post = { intro: T("Fra forskyvningene finner vi tøyning og normalkraft i hvert element.", "From the displacements we find strain and normal force in each element."), lines: [
    { tex: "\\varepsilon^{(e)} = \\frac{u_{e+1} - u_e}{L_e},\\qquad N^{(e)} = " + (r.eaC ? "EA" : "\\overline{EA}") + "\\,\\varepsilon^{(e)}", why: T("Tøyningen er forlengelse delt på lengde. Normalkraften følger av Hookes lov. Med lineære elementer er begge konstante i hvert element.", "The strain is elongation divided by length. The normal force follows from Hooke's law. With linear elements both are constant in each element.") },
    ...r.els.map((el, e) => ({ tex: `N^{(${e + 1})} = ${ekNum(el.N)}\\ \\text{kN}`, why: T(`ε = (${ekTxt(r.u[e + 1])} − ${ekTxt(r.u[e])}) / ${ekTxt(el.Le)} = ${ekTxt(el.eps)}. ${el.N >= 0 ? "Positiv N betyr strekk." : "Negativ N betyr trykk."}`, `ε = (${ekTxt(r.u[e + 1])} − ${ekTxt(r.u[e])}) / ${ekTxt(el.Le)} = ${ekTxt(el.eps)}. ${el.N >= 0 ? "Positive N means tension." : "Negative N means compression."}`) }))] };
  const err = r.X.map((x, i) => [x, r.u[i], r.uAt(x)]), maxU = Math.max(...r.ux.map(Math.abs), 1e-30), worst = Math.max(...err.map(([, a, b]) => Math.abs(a - b))) / maxU;
  S.exact = { intro: T("Til slutt sjekker vi FEM mot den eksakte løsningen av differensialligningen.", "Finally we check FEM against the exact solution of the differential equation."), lines: [
    { tex: "N(x) = N(0) - \\int_0^x q\\,ds - \\sum_{x_i < x} P_i,\\qquad u(x) = \\int_0^x \\frac{N(s)}{EA(s)}\\,ds", why: T("Integrer dN/dx = −q én gang for å få N, og du/dx = N/EA én gang til for å få u. Konstanten N(0) bestemmes av randbetingelsene (fri ende: N = endelasten; to faste ender: u(L) = 0). Integralene regnes numerisk så det virker for alle EA(x) og q(x).", "Integrate dN/dx = −q once to get N, and du/dx = N/EA once more to get u. The constant N(0) is set by the boundary conditions (free end: N = end load; two fixed ends: u(L) = 0). The integrals are done numerically so it works for any EA(x) and q(x).") },
    { tex: `\\max_{\\text{${T("noder", "nodes")}}} \\frac{|u^h - u|}{\\max|u|} = ${ekNum(worst * 100, 2)}\\ \\%`, why: r.eaC ? T("For en stav med konstant EA gir lineære elementer eksakte forskyvninger i nodene (feilen over er bare avrunding). Feilen sitter mellom nodene, og i normalkraften, som FEM gjør stykkevis konstant.", "For a bar with constant EA, linear elements give exact displacements at the nodes (the error above is just rounding). The error sits between the nodes, and in the normal force, which FEM makes piecewise constant.") : T("Når EA varierer, er ikke nodeverdiene lenger helt eksakte. Prøv flere elementer og se feilen krympe.", "When EA varies, the nodal values are no longer exact. Try more elements and watch the error shrink.") }], plot: true };
  return S;
}

// ---------- tegninger ----------
function ekSketch(cfg){
  let r; try{ r = ekCompute(cfg); }catch(e){ r = null; }
  const L = r ? r.L : 1, X = x => 34 + 252 * x / L, y = 56; let s = "";
  const wall = x => { const d = x < 160 ? -1 : 1; let g = `<line class="fg-line" x1="${x}" y1="${y - 26}" x2="${x}" y2="${y + 26}" stroke-width="3"/>`; for(let i = 0; i < 6; i++) g += `<line class="fg-mut" x1="${x}" y1="${y - 22 + i * 9}" x2="${x + d * 8}" y2="${y - 28 + i * 9}"/>`; return g; };
  s += `<rect class="fg-fill" x="${X(0)}" y="${y - 8}" width="252" height="16" rx="2"/><rect class="fg-line" x="${X(0)}" y="${y - 8}" width="252" height="16" rx="2" fill="none"/>`;
  if(!r || r.bc !== "right") s += wall(X(0)); if(!r || r.bc !== "left") s += wall(X(L));
  if(r){
    const qm = Math.max(...Array.from({ length: 21 }, (_, i) => Math.abs(r.q(L * i / 20))));
    if(qm > 1e-12) for(let i = 0; i < 12; i++){ const x = L * (i + 0.5) / 12, v = r.q(x) / qm, len = 14 * Math.abs(v); if(len < 2) continue; const x0 = X(x), d = v > 0 ? 1 : -1; s += fgAr(x0 - d * len / 2, y + 18, x0 + d * len / 2, y + 18, "fg-acc", 1.6); }
    if(qm > 1e-12) s += fgT(X(L) + 4, y + 22, "q(x)", "fg-s fg-acct", "start");
    r.X.forEach((x, i) => { s += `<circle class="fg-dot" cx="${X(x)}" cy="${y}" r="3.5"/>` + fgT(X(x), y + 40, String(i + 1), "fg-s"); });
    r.P.forEach(([p, x], k) => { const x0 = X(x), d = p > 0 ? 1 : -1, yy = y - 20 - (k % 2) * 16; s += fgAr(x0 - (d > 0 ? 0 : -28) - (d > 0 ? 28 : 0), yy, x0 + (d > 0 ? 0 : -28) * 0, yy, "fg-red", 2.2).replace(/x1="[^"]+"/, `x1="${d > 0 ? x0 - 28 : x0 + 28}"`).replace(/x2="[^"]+"/, `x2="${x0}"`);
      s += fgT(d > 0 ? x0 - 30 : x0 + 30, yy + 4, `${ekTxt(Math.abs(p))} kN`, "fg-s fg-redt", d > 0 ? "end" : "start"); });
  }
  s += fgT(X(0), y + 58, "x = 0", "fg-s") + fgT(X(L), y + 58, "x = L", "fg-s");
  return `<figure class="fig ek-sk"><svg viewBox="0 0 320 124" role="img" aria-label="${esc(T("Skisse av staven", "Sketch of the bar"))}">${s}</svg></figure>`;
}
function ekPlot(r){
  const chart = (title, unit, fem, ex, step) => {
    const all = [...fem.flat().map(p => p[1]), ...ex.map(p => p[1]), 0], lo = Math.min(...all), hi = Math.max(...all), span = hi - lo || 1;
    const X = x => 40 + 268 * x / r.L, Y = v => 112 - 88 * (v - lo) / span;
    let s = `<line class="fg-mut" x1="40" y1="${Y(0).toFixed(1)}" x2="308" y2="${Y(0).toFixed(1)}"/><line class="fg-mut" x1="40" y1="20" x2="40" y2="116"/>`;
    s += `<path d="${ex.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join("")}" fill="none" style="stroke:var(--muted);stroke-width:2;stroke-dasharray:5 4"/>`;
    s += fem.map(seg => `<path d="${seg.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join("")}" fill="none" style="stroke:var(--accent);stroke-width:2.6"/>`).join("");
    if(!step) s += r.X.map((x, i) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(fem[0][i] ? fem[0][i][1] : 0).toFixed(1)}" r="3" style="fill:var(--accent)"/>`).join("");
    s += fgT(36, Y(hi) + 4, ekTxt(hi), "fg-s", "end") + (Math.abs(lo) > 1e-12 ? fgT(36, Y(lo) + 4, ekTxt(lo), "fg-s", "end") : "") + fgT(40, 132, "0", "fg-s") + fgT(308, 132, ekTxt(r.L) + " m", "fg-s");
    s += fgT(46, 14, `${title} (${unit})`, "fg-b", "start");
    return `<figure class="fig"><svg viewBox="0 0 320 138" role="img" aria-label="${esc(title)}">${s}</svg></figure>`; };
  const k = Math.max(1, Math.floor(r.gx.length / 240)), sub = (a, f = v => v) => a.filter((_, i) => i % k === 0 || i === a.length - 1).map((v, j) => [r.gx[Math.min(r.gx.length - 1, j * k)], f(v)]);
  const exU = r.gx.filter((_, i) => i % k === 0).map((x, j) => [x, r.ux[j * k] * 1000]), exN = r.gx.filter((_, i) => i % k === 0).map((x, j) => [x, r.Nx[j * k]]);
  const femU = [r.X.map((x, i) => [x, r.u[i] * 1000])], femN = r.els.map(el => [[el.a, el.N], [el.b, el.N]]);
  return `<div class="ek-leg"><span class="a"></span>${esc(T("FEM", "FEM"))}<span class="b"></span>${esc(T("Eksakt", "Exact"))}</div>` + chart(T("Forskyvning u", "Displacement u"), "mm", femU, exU, false) + chart(T("Normalkraft N", "Normal force N"), "kN", femN, exN, true);
}

// ---------- skjermen ----------
function ekOpen(from){ EK = { from: from || "home", open: {}, cfg: JSON.parse(JSON.stringify(S.ek || EK_EX[0][1])), show: S.ekShow || EK_STEPS.map(s => s[0]) }; overlay = null; screen = "ekalk"; render(); window.scrollTo(0, 0); }
function ekSave(){ S.ek = EK.cfg; S.ekShow = EK.show; saveLocal(); }
function ekOutHTML(){
  let r; try{ r = ekCompute(EK.cfg); }catch(e){ return `<p class="du-err">${esc((e && e.m) || T("Noe gikk galt i utregningen.", "Something went wrong in the calculation."))}</p>`; }
  const S2 = ekSteps(r), list = EK_STEPS.filter(([k]) => EK.show.includes(k));
  if(!list.length) return `<p class="tc-note">${esc(T("Velg minst ett steg over.", "Pick at least one step above."))}</p>`;
  return `<div class="ek-sum"><b>${esc(T("Svar", "Answer"))}</b> ${r.free.map(i => ekI(`u_{${i + 1}} = ${ekNum(r.u[i] * 1000)}\\ \\text{mm}`)).join(" · ")} · ${r.fixed.map((i, k) => ekI(`R_{${i + 1}} = ${ekNum(r.R[k])}\\ \\text{kN}`)).join(" · ")}</div>` +
    list.map(([k, t], si) => { const st = S2[k];
      return `<section class="ek-step"><h3><span>${si + 1}</span>${esc(T(t[0], t[1]))}</h3><p class="ek-in">${esc(st.intro)}</p>
        ${st.lines.map((ln, j) => { const id = k + "." + j, on = !!EK.open[id];
          return `<button class="ek-ln ${on ? "on" : ""}" data-a="ekwhy" data-k="${id}" aria-expanded="${on}"><div class="ek-tex">${ekD(ln.tex)}</div><span class="ek-q" aria-hidden="true">${on ? "−" : "?"}</span></button>${on ? `<div class="ek-why">${rich(ln.why)}</div>` : ""}`; }).join("")}
        ${st.plot ? ekPlot(r) : ""}</section>`; }).join("") + `<p class="ek-tip">${esc(T("Trykk på et ledd for å se hvordan vi kom dit.", "Tap a line to see how we got there."))}</p>`;
}
function ekUpdate(){ const o = document.getElementById("ekout"), sk = document.getElementById("eksk"); if(o) o.innerHTML = ekOutHTML(); if(sk) sk.innerHTML = ekSketch(EK.cfg); }
function renderEk(){
  if(!EK) ekOpen("home");
  const c = EK.cfg, f = (id, label, val, unit, ph, mode = "text") => `<label class="ek-f"><span>${label}</span><div><input id="${id}" data-ek="${id}" value="${esc(val)}" inputmode="${mode}" placeholder="${esc(ph || "")}" autocomplete="off" spellcheck="false">${unit ? `<i>${esc(unit)}</i>` : ""}</div></label>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="ekback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(T("Elementmetoden", "Finite elements"))}</small><b>${esc(T("Elementkalkulator: stav", "Element calculator: bar"))}</b></div></div></div>
  <main class="wrap ek">
    <div class="chips ek-ex">${EK_EX.map(([t2], i) => `<button data-a="ekex" data-i="${i}">${esc(T(t2[0], t2[1]))}</button>`).join("")}</div>
    <section class="ek-card"><h3>${esc(T("1 · Staven", "1 · The bar"))}</h3>
      <div id="eksk">${ekSketch(c)}</div>
      <div class="ek-grid">${f("L", T("Lengde L", "Length L"), c.L, "m", "4", "decimal")}${f("ea", T("Stivhet EA(x)", "Stiffness EA(x)"), c.ea, "kN", "20000 eller 20000(1 - x/8)")}${f("q", T("Fordelt last q(x)", "Distributed load q(x)"), c.q, "kN/m", "0, 5 eller 2x")}</div>
      <p class="ek-hint">${esc(T("Skriv x for posisjonen og L for lengden. Du kan bruke + − · / ^, parenteser, sqrt, sin, cos og exp. Positiv retning er +x (mot høyre).", "Write x for the position and L for the length. You can use + − · / ^, brackets, sqrt, sin, cos and exp. Positive direction is +x (to the right)."))}</p>
      <p class="ek-l">${esc(T("Punktlaster", "Point loads"))}</p>
      ${(c.P || []).map((p, i) => `<div class="ek-p"><label><span>P</span><input data-ek="P" data-i="${i}" value="${esc(p[0])}" inputmode="decimal" aria-label="${esc(T("Last P i kN", "Load P in kN"))}"><i>kN</i></label><label><span>x</span><input data-ek="X" data-i="${i}" value="${esc(p[1])}" inputmode="decimal" aria-label="${esc(T("Posisjon x i m", "Position x in m"))}"><i>m</i></label><button class="te-x" data-a="ekpdel" data-i="${i}" aria-label="${esc(T("Fjern lasten", "Remove the load"))}">✕</button></div>`).join("")}
      ${(c.P || []).length < 6 ? `<button class="te-more" data-a="ekpadd">＋ ${esc(T("Punktlast", "Point load"))}</button>` : ""}
      <p class="ek-l">${esc(T("Opplager", "Supports"))}</p>
      <div class="chips">${[["left", T("Fast i venstre ende", "Fixed at left end")], ["right", T("Fast i høyre ende", "Fixed at right end")], ["both", T("Fast i begge ender", "Fixed at both ends")]].map(([v, l]) => `<button class="${c.bc === v ? "on" : ""}" data-a="ekbc" data-v="${v}">${esc(l)}</button>`).join("")}</div>
      <p class="ek-l">${esc(T("Antall like elementer", "Number of equal elements"))}</p>
      <div class="chips">${[1, 2, 3, 4, 6, 8].map(v => `<button class="${+c.n === v ? "on" : ""}" data-a="ekn" data-v="${v}">${v}</button>`).join("")}</div></section>
    <section class="ek-card"><h3>${esc(T("2 · Hva vil du se?", "2 · What do you want to see?"))}</h3>
      <div class="chips ek-show">${EK_STEPS.map(([k, t2]) => `<button class="${EK.show.includes(k) ? "on" : ""}" data-a="ekstep" data-k="${k}" aria-pressed="${EK.show.includes(k)}">${EK.show.includes(k) ? "✓ " : ""}${esc(T(t2[0], t2[1]))}</button>`).join("")}</div>
      <div class="ek-allrow"><button class="exlink" data-a="ekall" data-v="1">${esc(T("Vis alle", "Show all"))}</button> · <button class="exlink" data-a="ekall" data-v="0">${esc(T("Bare svaret", "Just the answer"))}</button></div></section>
    <div id="ekout" class="ek-out">${ekOutHTML()}</div>
  </main>`;
  const m = $app.querySelector("main.ek"); let tm = 0;
  m.addEventListener("input", e => { const el = e.target, k = el.dataset && el.dataset.ek; if(!k) return;
    if(k === "P" || k === "X") EK.cfg.P[+el.dataset.i][k === "P" ? 0 : 1] = el.value; else EK.cfg[k] = el.value;
    clearTimeout(tm); tm = setTimeout(() => { ekSave(); ekUpdate(); }, 220); });
}
function ekClick(a, b){
  if(!a.startsWith("ek") || !EK) return false; const d = (b && b.dataset) || {};
  switch(a){
    case "ekback": { const f = EK.from; EK = null; if(typeof labBack === "function") labBack(f); else goHome(); return true; }
    case "ekex": EK.cfg = JSON.parse(JSON.stringify(EK_EX[+d.i][1])); EK.open = {}; ekSave(); render(); return true;
    case "ekbc": EK.cfg.bc = d.v; ekSave(); render(); return true;
    case "ekn": EK.cfg.n = +d.v; ekSave(); render(); return true;
    case "ekpadd": (EK.cfg.P ||= []).push(["10", String(EK.cfg.L || 1)]); ekSave(); render(); return true;
    case "ekpdel": EK.cfg.P.splice(+d.i, 1); ekSave(); render(); return true;
    case "ekstep": { const i = EK.show.indexOf(d.k); if(i >= 0) EK.show.splice(i, 1); else EK.show = EK_STEPS.map(s => s[0]).filter(k => k === d.k || EK.show.includes(k)); ekSave(); render(); return true; }
    case "ekall": EK.show = d.v === "1" ? EK_STEPS.map(s => s[0]) : []; ekSave(); render(); return true;
    case "ekwhy": EK.open[d.k] = !EK.open[d.k]; ekUpdate(); return true;
  }
  return false;
}
