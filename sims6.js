// ============================================================
//  PRØV SELV, runde 6 – elementmetoden.
//  fembar: en stav fast i venstre ende med jevn last q og punktlast P, løst med n lineære elementer.
//  Viser eksakt u(x) og N(x) mot FEM-løsningen (stykkevis lineær u^h og stykkevis konstant N^h).
//  Løsningen regnes ut på ordentlig: assemblering av B^e og F^e, randbetingelse og Gauss-eliminasjon.
// ============================================================
(() => {
const FEM_EA = 20000, FEM_L = 4; // kN og m
function femSolve(n, q, P){
  const h = FEM_L / n, k = FEM_EA / h, N = n + 1;
  const K = Array.from({ length: N }, () => new Array(N).fill(0)), f = new Array(N).fill(0);
  for(let e = 0; e < n; e++){ // element e kobler node e og e+1
    const B = [[k, -k], [-k, k]], F = [q * h / 2, q * h / 2], idx = [e, e + 1];
    for(let a = 0; a < 2; a++){ f[idx[a]] += F[a]; for(let b = 0; b < 2; b++) K[idx[a]][idx[b]] += B[a][b]; }
  }
  f[n] += P;
  // randbetingelse u_0 = 0: stryk rad og kolonne 0, løs resten
  const A = K.slice(1).map(r => r.slice(1)), b = f.slice(1), m = n;
  for(let i = 0; i < m; i++){ for(let r = i + 1; r < m; r++){ const fct = A[r][i] / A[i][i]; if(!fct) continue; for(let c = i; c < m; c++) A[r][c] -= fct * A[i][c]; b[r] -= fct * b[i]; } }
  const x = new Array(m).fill(0); for(let i = m - 1; i >= 0; i--){ let s = b[i]; for(let c = i + 1; c < m; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
  const u = [0, ...x], Ne = Array.from({ length: n }, (_, e) => k * (u[e + 1] - u[e]));
  return { h, k, u, Ne };
}
Object.assign(SIMS, {
  fembar: { t: ["FEM-stav: flere elementer, bedre svar", "FEM bar: more elements, better answer"],
    p: [["n", ["antall elementer n", "number of elements n"], 1, 8, 1, 2, "", 1], ["q", ["jevn last q", "uniform load q"], 0, 20, 1, 10, "kN/m", 2], ["P", ["punktlast P", "point load P"], 0, 40, 5, 20, "kN", 3]],
    a: ["Staven: EA = 20 000 kN, L = 4 m, fast i venstre ende. Blå strek er eksakt løsning, oransje er FEM.", "The bar: EA = 20 000 kN, L = 4 m, fixed at the left end. Blue is the exact solution, orange is FEM."],
    q: ["Hvorfor treffer FEM forskyvningen nøyaktig i nodene, men ikke normalkraften ved innfestingen?", "Why does FEM hit the displacement exactly at the nodes, but not the normal force at the support?"],
    g: [["Med q = 10 og P = 20: få FEM-normalkraften i første element innen 5 % av den eksakte verdien ved innfestingen.", "With q = 10 and P = 20: get the FEM normal force in the first element within 5 % of the exact value at the support.", (v, m) => v.q === 10 && v.P === 20 && Math.abs(m.N1 - m.N0) / m.N0 < 0.05],
        ["Finn en last der én eneste element gir helt riktig normalkraft overalt.", "Find a load where a single element gives exactly the right normal force everywhere.", (v, m) => v.n === 1 && v.q === 0 && v.P > 0]],
    f: v => {
      const { h, k, u, Ne } = femSolve(v.n, v.q, v.P), L = FEM_L, EA = FEM_EA;
      const ue = x => ((v.P + v.q * L) * x - v.q * x * x / 2) / EA, Nx = x => v.P + v.q * (L - x);
      const uMax = Math.max(ue(L), 1e-9), NMax = Math.max(Nx(0), 1e-9);
      const X = x => 44 + x / L * 262, Yu = y => 74 - y / uMax * 58, YN = y => 170 - y / NMax * 52;
      const f1 = z => z.toFixed(1);
      let s = `<text x="8" y="22" class="fg-i">u</text><text x="8" y="124" class="fg-i">N</text>`;
      s += `<path d="M44 74H310M44 170H310" class="fg-ax" stroke-width="1.2"/><path d="M44 12V76M44 112V172" class="fg-ax" stroke-width="1.2"/>`;
      // nodene på aksen
      for(let i = 0; i <= v.n; i++) s += `<path d="M${f1(X(i * h))} 71v6M${f1(X(i * h))} 167v6" class="fg-mut" stroke-width="1.4"/>`;
      // eksakt u og N
      let d = ""; for(let i = 0; i <= 80; i++){ const x = L * i / 80; d += (i ? "L" : "M") + f1(X(x)) + " " + f1(Yu(ue(x))); }
      s += `<path d="${d}" class="fg-acc" fill="none" stroke-width="2.6"/>`;
      s += `<path d="M${f1(X(0))} ${f1(YN(Nx(0)))}L${f1(X(L))} ${f1(YN(Nx(L)))}" class="fg-acc" fill="none" stroke-width="2.6"/>`;
      // FEM: stykkevis lineær u^h og stykkevis konstant N^h
      s += `<path d="${u.map((y, i) => (i ? "L" : "M") + f1(X(i * h)) + " " + f1(Yu(y))).join("")}" style="stroke:#E07B00" fill="none" stroke-width="2.2" stroke-dasharray="6 3"/>`;
      s += u.map((y, i) => `<circle cx="${f1(X(i * h))}" cy="${f1(Yu(y))}" r="3.6" style="fill:#E07B00"/>`).join("");
      s += `<path d="${Ne.map((N, e) => `M${f1(X(e * h))} ${f1(YN(N))}H${f1(X((e + 1) * h))}`).join("")}" style="stroke:#E07B00" fill="none" stroke-width="2.6"/>`;
      s += fgT(54, 18, T("forskyvning", "displacement"), "fg-s", "start") + fgT(306, 116, T("normalkraft", "normal force"), "fg-s", "end");
      const errU = Math.max(...Array.from({ length: 81 }, (_, i) => { const x = L * i / 80, e = Math.min(v.n - 1, Math.floor(x / h)), t = (x - e * h) / h; return Math.abs(ue(x) - (u[e] * (1 - t) + u[e + 1] * t)); }));
      const N0 = Nx(0), N1 = Ne[0];
      return { m: { N0, N1 }, svg: s,
        eq: [qt`h = \frac{L}{${qc(1, v.n)}} = ${qn(h, 2)}\,\mathrm{m}, \quad B^e = \frac{EA}{h}\begin{pmatrix}1&-1\\-1&1\end{pmatrix} = ${qn(k, 0)}\begin{pmatrix}1&-1\\-1&1\end{pmatrix}`,
             qt`F^e = \frac{${qc(2, v.q)}\cdot ${qn(h, 2)}}{2}\begin{pmatrix}1\\1\end{pmatrix}, \quad N_1^h = ${qr(N1, 1, "kN")} \;\text{${T("mot", "vs")}}\; N(0) = ${qn(N0, 1)}\,\mathrm{kN}`],
        out: [[T("u(L), FEM", "u(L), FEM"), smN(u[v.n] * 1000, 2) + " mm"], [T("u(L), eksakt", "u(L), exact"), smN(ue(L) * 1000, 2) + " mm"],
              [T("største feil i u", "largest error in u"), smN(errU * 1000, 3) + " mm"], [T("N ved innfesting", "N at support"), smN(N1, 1) + " / " + smN(N0, 1) + " kN"]] };
    } }
});
})();
