// ============================================================
//  PRØV SELV, runde 7 – intuitive labber for tre temaer som trengte det mest.
//  bernpipe: rør som smalner og løftes, med trykkrør (piezometre) og energilinje – se trykket falle der farten øker.
//  meanmed:  gjennomsnitt som balansepunktet på en vippe og median som den midterste – dra én verdi langt ut.
//  spin:     kunstløperen som trekker armene inn (bevart spinn L = Iω).
//  torque:   skiftenøkkel: kraftmoment τ = F·r·sin θ.
// ============================================================
(() => {
const f1 = z => z.toFixed(1), RHO = 1000, G = 9.81;
const col = k => `var(--c${k})`;
Object.assign(SIMS, {
  // ---------- Bernoulli ----------
  bernpipe: { t: ["Bernoulli: trykk, fart og høyde i et rør", "Bernoulli: pressure, speed and height in a pipe"],
    p: [["r", ["innsnevring d₂/d₁", "narrowing d₂/d₁"], 0.3, 1, 0.05, 0.6, "", 1], ["v1", ["fart inn v₁", "speed in v₁"], 0.5, 4, 0.1, 1.5, "m/s", 2], ["dz", ["løft av den trange delen Δz", "lift of the narrow part Δz"], 0, 2, 0.1, 0, "m", 3]],
    a: ["Vannstanden i de tynne rørene viser trykket. Den stiplede streken er energilinjen: den ligger like høyt overalt. Avstanden opp til den (oransje) er fartsenergien.", "The water level in the thin tubes shows the pressure. The dashed line is the energy line: it is equally high everywhere. The gap up to it (orange) is the speed energy."],
    g: [["Rett rør (d₂/d₁ = 1) uten løft: sjekk at trykket er likt i begge trykkrørene. Løft så den midterste delen 1 m – hvor mye faller trykket?", "Straight pipe (d₂/d₁ = 1): check that both tubes show the same pressure. Then lift the middle part 1 m – how much does the pressure drop?", v => v.r === 1 && Math.abs(v.dz - 1) < 0.01],
        ["Uten løft og med d₂/d₁ = 0,5: still farten inn slik at vannet går 4 m/s i den trange delen.", "With no lift and d₂/d₁ = 0.5: set the speed in so the water flows at 4 m/s in the narrow part.", v => v.dz === 0 && Math.abs(v.r - 0.5) < 0.001 && Math.abs(v.v1 / (v.r * v.r) - 4) < 0.05],
        ["Få trykket i den trange delen ned til atmosfæretrykk eller lavere (0 kPa eller mindre). Da kan røret suge inn luft – slik virker en vannstrålepumpe.", "Get the pressure in the narrow part down to atmospheric or lower (0 kPa or less). Then the pipe can suck in air – this is how a water jet pump works.", (v, m) => m.p2 <= 0]],
    f: v => {
      const p1 = 25000, v2 = v.v1 / (v.r * v.r), dk = 0.5 * RHO * (v.v1 * v.v1 - v2 * v2), hz = RHO * G * v.dz, p2 = p1 + dk - hz;
      const S = 20, y0 = 136, h1 = 20, h2 = h1 * v.r, yc = y0 - v.dz * 16, cl = y => Math.max(6, Math.min(176, y));
      const top = `M14 ${y0 - h1}L96 ${y0 - h1}L128 ${yc - h2}L196 ${yc - h2}L228 ${y0 - h1}L306 ${y0 - h1}`, bot = `M306 ${y0 + h1}L228 ${y0 + h1}L196 ${yc + h2}L128 ${yc + h2}L96 ${y0 + h1}L14 ${y0 + h1}`;
      const water = top + "L" + bot.slice(1) + "Z";
      // strømningsstreker: farten vises som hvor fort strekene glir
      const flow = (d, vv) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 10" opacity=".85"><animate attributeName="stroke-dashoffset" from="16" to="0" dur="${Math.max(0.04, 16 / (vv * 14)).toFixed(3)}s" repeatCount="indefinite"/></path>`;
      // trykkrør: vannstand = trykkhøyde p/ρg over midten av røret
      const E = y0 - (p1 / (RHO * G) + v.v1 * v.v1 / (2 * G)) * S;   // energilinje
      const tube = (x, yp, p, vv, k) => { const lev = cl(yp - p / (RHO * G) * S), tt = (yp - (k ? h2 : h1));
        return `<rect x="${x - 4}" y="4" width="8" height="${tt - 4}" rx="3" style="fill:var(--card);stroke:var(--muted);stroke-width:1.4"/>` +
          (p > 0 ? `<rect x="${x - 2.6}" y="${f1(lev)}" width="5.2" height="${f1(tt - lev)}" class="fg-water"/>` : `<circle cx="${x}" cy="${tt - 6}" r="2.4" style="fill:none;stroke:var(--bad);stroke-width:1.4"/>`) +
          (E < Math.min(lev, tt) - 3 ? `<path d="M${x + 7} ${f1(Math.max(6, E))}V${f1(Math.min(lev, tt))}" style="stroke:var(--c2);stroke-width:3"/>` : ""); };
      let s = `<path d="${water}" class="fg-water" opacity=".6"/><path d="${top}" class="fg-line" fill="none"/><path d="${bot}" class="fg-line" fill="none"/>`;
      s += flow(`M18 ${y0}H96`, v.v1) + flow(`M132 ${yc}H192`, v2) + flow(`M232 ${y0}H302`, v.v1);
      s += tube(56, y0, p1, v.v1, 0) + tube(162, yc, p2, v2, 1);
      s += `<path d="M14 ${f1(Math.max(6, E))}H306" style="stroke:var(--c2);stroke-width:1.6;stroke-dasharray:5 4" fill="none"/>${fgT(304, Math.max(6, E) - 4, T("energilinje", "energy line"), "fg-s", "end")}`;
      s += fgT(56, y0 + h1 + 16, "p₁ = 25 kPa", "fg-s") + fgT(162, Math.min(176, yc + h2 + 16), "p₂ = " + smN(p2 / 1000, 1) + " kPa", p2 <= 0 ? "fg-s fg-redt" : "fg-s");
      if(v.dz > 0) s += `<path d="M206 ${y0}V${yc}" class="fg-ax" stroke-width="1.2"/>` + fgT(210, (y0 + yc) / 2 + 4, "Δz", "fg-s", "start");
      if(p2 <= 0) s += fgT(162, 14, T("undertrykk!", "suction!"), "fg-s fg-redt");
      return { m: { p2 }, svg: s,
        eq: [qt`v_2 = v_1\left(\frac{d_1}{d_2}\right)^2 = ${qv(2, v.v1, 1, "m/s")}\cdot\left(\frac{1}{${qc(1, qn(v.r, 2))}}\right)^2 = ${qr(v2, 2, "m/s")}`,
             qt`p_2 = p_1 + \tfrac12\rho\,(v_1^2 - v_2^2) - \rho g\,${qc(3, qt`\Delta z`)}`,
             qt`= 25 ${dk >= 0 ? "+" : "-"} ${qn(Math.abs(dk) / 1000, 2)} - ${qn(hz / 1000, 2)} = ${qr(p2 / 1000, 2, "kPa")}`],
        out: [[T("fart i den trange delen v₂", "speed in the narrow part v₂"), smN(v2, 2) + " m/s"], [T("trykk der p₂", "pressure there p₂"), smN(p2 / 1000, 1) + " kPa"], [T("trykkfall p₁ − p₂", "pressure drop p₁ − p₂"), smN((p1 - p2) / 1000, 1) + " kPa"]] };
    } },

  // ---------- gjennomsnitt og median ----------
  meanmed: { t: ["Gjennomsnitt og median: ukepenger i vennegjengen", "Mean and median: pocket money among friends"],
    p: [["n", ["antall venner", "number of friends"], 3, 7, 1, 5, "", 1], ["x", ["ukepenger til den siste vennen", "pocket money of the last friend"], 0, 1000, 10, 150, "kr", 2]],
    a: ["Gjennomsnittet er punktet der vippa balanserer. Medianen er den midterste når alle stiller seg i rekkefølge.", "The mean is the point where the seesaw balances. The median is the middle one when everyone lines up in order."],
    g: [["Gjør gjennomsnittet minst dobbelt så stort som medianen. Hvem «lyver» om hva som er vanlig?", "Make the mean at least twice the median. Which one \"lies\" about what is typical?", (v, m) => m.mean >= 2 * m.med],
        ["Få gjennomsnittet og medianen til å bli helt like.", "Make the mean and the median exactly equal.", (v, m) => Math.abs(m.mean - m.med) < 0.5],
        ["Med 4 venner er det ingen i midten. Få medianen til 135 kr – hvordan regnes den da?", "With 4 friends there is nobody in the middle. Get the median to 135 kr – how is it calculated then?", (v, m) => v.n === 4 && Math.abs(m.med - 135) < 0.01]],
    f: v => {
      const base = [100, 120, 150, 150, 180, 200], vals = [...base.slice(0, v.n - 1), v.x], n = vals.length, srt = vals.map((x, i) => ({ x, i })).sort((a, b) => a.x - b.x || a.i - b.i);
      const mean = vals.reduce((a, b) => a + b, 0) / n, mid = n % 2 ? [(n - 1) / 2] : [n / 2 - 1, n / 2], med = mid.reduce((a, k) => a + srt[k].x, 0) / mid.length;
      const max = Math.max(300, Math.ceil((v.x + 60) / 100) * 100), X = x => 22 + x / max * 276;
      // vippa: planke med mynter (venner) over sin verdi, trekant under i gjennomsnittet
      let s = `<rect x="16" y="76" width="288" height="5" rx="2.5" style="fill:var(--muted);opacity:.5"/>`;
      const placed = []; for(const { x, i } of srt){ const px = X(x), k = placed.filter(q => Math.abs(q - px) < 13).length, last = i === n - 1; placed.push(px);
        s += `<circle cx="${f1(X(x))}" cy="${68 - k * 15}" r="7" style="fill:${last ? col(2) : "var(--accent)"};stroke:var(--card);stroke-width:1.5"/>`; }
      s += `<path d="M${f1(X(mean))} 82l-10 16h20z" style="fill:var(--accent)"/>` + fgT(X(mean), 112, T("gjennomsnitt ", "mean ") + smN(mean, 0), "fg-s fg-acct");
      s += `<path d="M${f1(X(med))} 18V74" style="stroke:var(--gold-deep);stroke-width:2;stroke-dasharray:4 3"/>` + fgT(X(med), 13, T("median ", "median ") + smN(med, 0), "fg-s");
      // tallinje
      for(let t = 0; t <= max; t += max / 4) s += `<path d="M${f1(X(t))} 84v4" class="fg-ax"/>`;
      // sortert rekke med den midterste markert
      const bw = Math.min(40, 286 / n), x0 = 160 - bw * n / 2;
      srt.forEach(({ x, i }, k) => { const on = mid.includes(k);
        s += `<rect x="${f1(x0 + k * bw + 2)}" y="128" width="${f1(bw - 4)}" height="26" rx="6" style="fill:${on ? "color-mix(in srgb,var(--gold) 30%,var(--card))" : "var(--card)"};stroke:${on ? "var(--gold-deep)" : i === n - 1 ? col(2) : "var(--line)"};stroke-width:${on || i === n - 1 ? 2 : 1.2}"/>` + fgT(x0 + k * bw + bw / 2, 145, String(x), "fg-s"); });
      s += fgT(160, 172, n % 2 ? T("den midterste er medianen", "the middle one is the median") : T("partall: medianen er snittet av de to midterste", "even count: the median is the average of the two middle ones"), "fg-s");
      return { m: { mean, med }, svg: s,
        eq: [qt`\bar x = \frac{${vals.map((x, i) => i === n - 1 ? qc(2, x) : x).join(" + ")}}{${qc(1, n)}} = ${qr(mean, 1, "kr")}`,
             qt`\text{median} = ${mid.length === 1 ? qr(med, 0, "kr") : qt`\frac{${srt[mid[0]].x} + ${srt[mid[1]].x}}{2} = ${qr(med, 1, "kr")}`}`],
        out: [[T("gjennomsnitt", "mean"), smN(mean, 1) + " kr"], [T("median", "median"), smN(med, 1) + " kr"], [T("forskjell", "difference"), smN(mean - med, 1) + " kr"]] };
    } },

  // ---------- spinn ----------
  spin: { t: ["Kunstløperen: trekk armene inn", "The figure skater: pull the arms in"],
    p: [["r", ["avstand til hendene r", "distance to the hands r"], 0.2, 0.9, 0.05, 0.9, "m", 1], ["w0", ["startfart ω₀ (armene ute)", "start speed ω₀ (arms out)"], 1, 6, 0.1, 2, "rad/s", 2]],
    a: ["Ingen ytre moment virker, så spinnet L = Iω er det samme hele tiden. Mindre I betyr større ω.", "No external torque acts, so the angular momentum L = Iω stays the same. Smaller I means larger ω."],
    g: [["Trekk armene helt inn. Hvor mange ganger raskere snurrer hun nå?", "Pull the arms all the way in. How many times faster does she spin now?", v => v.r <= 0.2],
        ["Få henne til å snurre minst 4 ganger så fort som ved start.", "Make her spin at least 4 times as fast as at the start.", (v, m) => m.w / v.w0 >= 4],
        ["Velg startfarten slik at hun snurrer 2 runder i sekundet med armene helt inne.", "Choose the start speed so she spins 2 turns per second with the arms all the way in.", (v, m) => v.r <= 0.2 && Math.abs(m.w / (2 * Math.PI) - 2) < 0.05]],
    f: v => {
      const Ib = 1.0, ma = 4, I = r => Ib + 2 * ma * r * r, I0 = I(0.9), I1 = I(v.r), L = I0 * v.w0, w = L / I1, E0 = 0.5 * I0 * v.w0 * v.w0, E1 = 0.5 * I1 * w * w;
      const cx = 92, cy = 92, R = v.r / 0.9 * 70, per = 2 * Math.PI / w;
      let s = `<circle cx="${cx}" cy="${cy}" r="70" style="fill:none;stroke:var(--line);stroke-dasharray:3 5"/><circle cx="${cx}" cy="${cy}" r="${f1(R)}" style="fill:none;stroke:${col(1)};stroke-dasharray:4 4;opacity:.7"/>`;
      s += `<g><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${Math.max(0.12, per).toFixed(3)}s" repeatCount="indefinite"/>
        <path d="M${f1(cx - R)} ${cy}H${f1(cx + R)}" style="stroke:#E8B48A;stroke-width:6;stroke-linecap:round"/><circle cx="${f1(cx - R)}" cy="${cy}" r="6" style="fill:${col(1)}"/><circle cx="${f1(cx + R)}" cy="${cy}" r="6" style="fill:${col(1)}"/>
        <ellipse cx="${cx}" cy="${cy}" rx="17" ry="10" style="fill:var(--accent)"/><circle cx="${cx}" cy="${cy}" r="8" style="fill:#6B4A2E"/><path d="M${cx} ${cy - 8}l4 -6h-8z" style="fill:#E8B48A"/></g>`;
      s += fgT(cx, 178, T("sett ovenfra", "seen from above"), "fg-s");
      // søyler i forhold til start
      const bars = [["I", I1 / I0, "var(--c1)"], ["ω", w / v.w0, "var(--c2)"], ["L", 1, "var(--ok)"], ["E", E1 / E0, "var(--gold-deep)"]], top = 6;
      bars.forEach(([k, rel, c], i) => { const x = 196 + i * 30, h = Math.min(130, rel * 26);
        s += `<rect x="${x}" y="${f1(150 - h)}" width="20" height="${f1(h)}" rx="3" style="fill:${c}"/>` + fgT(x + 10, 165, k, "fg-i") + fgT(x + 10, Math.max(top + 8, 146 - h), "×" + smN(rel, 1), "fg-s"); });
      s += `<path d="M190 124H316" style="stroke:var(--muted);stroke-dasharray:2 3"/>` + fgT(253, 179, T("ganger startverdien", "times the start value"), "fg-s");
      return { m: { w }, svg: s,
        eq: [qt`L = I_0\omega_0 = ${qn(I0, 2)}\cdot ${qv(2, v.w0, 1, "rad/s")} = ${qn(L, 2)}\,\mathrm{kg\,m^2/s}`,
             qt`\omega = \frac{L}{I} = \frac{${qn(L, 2)}}{${qn(I1, 2)}} = ${qr(w, 2, "rad/s")} \;(${qn(w / (2 * Math.PI), 2)}\,\text{${T("runder/s", "turns/s")}})`],
        out: [[T("treghetsmoment I", "moment of inertia I"), smN(I1, 2) + " kg·m²"], [T("vinkelfart ω", "angular speed ω"), smN(w, 2) + " rad/s"], [T("runder per sekund", "turns per second"), smN(w / (2 * Math.PI), 2)], [T("rotasjonsenergi", "rotational energy"), "×" + smN(E1 / E0, 2)]] };
    } },

  // ---------- kraftmoment ----------
  torque: { t: ["Kraftmoment: skiftenøkkelen", "Torque: the wrench"],
    p: [["F", ["kraft F", "force F"], 0, 300, 10, 100, "N", 1], ["r", ["armlengde r", "arm length r"], 0.1, 0.5, 0.05, 0.25, "m", 2], ["th", ["vinkel θ mellom nøkkel og kraft", "angle θ between wrench and force"], 0, 180, 5, 90, "°", 3]],
    a: ["Bare den delen av kraften som står vinkelrett på nøkkelen, vrir. Lang arm gir mer moment for samme kraft.", "Only the part of the force at right angles to the wrench turns the bolt. A long arm gives more torque for the same force."],
    g: [["Løsne en fastrusta mutter: lag minst 60 Nm med en kraft på høyst 150 N.", "Loosen a rusted nut: make at least 60 Nm with a force of at most 150 N.", (v, m) => m.tau >= 60 - 1e-9 && v.F <= 150],
        ["Dra hardt (minst 200 N), men få null moment.", "Pull hard (at least 200 N), but get zero torque.", (v, m) => v.F >= 200 && m.tau < 0.5]],
    f: v => {
      const th = v.th * Math.PI / 180, tau = v.F * v.r * Math.sin(th), bx = 60, by = 118, L = v.r * 360, ex = bx + L;
      const fl = v.F > 0 ? 22 + v.F / 300 * 62 : 0, fx = ex + Math.cos(-th) * fl, fy = by + Math.sin(-th) * fl, px = ex, py = by - Math.sin(th) * fl;
      let s = `<path d="M${bx - 12} ${by}l6 -10.4h12l6 10.4 -6 10.4h-12z" style="fill:var(--muted)"/>`;
      s += `<rect x="${bx}" y="${by - 6}" width="${f1(L)}" height="12" rx="6" style="fill:${col(2)};opacity:.85"/><circle cx="${bx}" cy="${by}" r="13" style="fill:none;stroke:${col(2)};stroke-width:6"/>`;
      if(v.F > 0){ s += fgAr(ex, by, fx, fy, "fg-acc", 3) + fgT(fx + (Math.cos(th) > 0.3 ? 8 : 0), fy - 6, "F", "fg-i fg-acct");
        if(v.th % 180 !== 0) s += `<path d="M${f1(ex)} ${by}V${f1(py)}" style="stroke:${col(3)};stroke-width:2;stroke-dasharray:4 3"/>` + fgT(ex - 5, (by + py) / 2 + 4, "F⊥", "fg-s", "end"); }
      // momentpil rundt mutteren – størrelsen viser τ
      const ar = 22 + Math.min(30, tau / 4);
      if(tau > 0.5) s += `<path d="M${bx + ar} ${by}A${f1(ar)} ${f1(ar)} 0 0 0 ${bx} ${f1(by - ar)}" style="fill:none;stroke:var(--ok);stroke-width:${f1(2 + Math.min(4, tau / 25))}"/><path d="M${bx} ${f1(by - ar)}l9 -5v10z" style="fill:var(--ok)"/>`;
      s += fgT(bx, by + 36, "τ = " + smN(tau, 1) + " Nm", "fg-s fg-okt") + fgT((bx + ex) / 2, by + 22, "r = " + smN(v.r, 2) + " m", "fg-s");
      return { m: { tau }, svg: s,
        eq: [qt`\tau = F\,r\,\sin\theta = ${qv(1, v.F, 0, "N")}\cdot ${qv(2, v.r, 2, "m")}\cdot \sin ${qc(3, v.th + "^\\circ")} = ${qr(tau, 1, "Nm")}`],
        out: [["τ", smN(tau, 1) + " Nm"], ["F⊥ = F sin θ", smN(v.F * Math.sin(th), 0) + " N"]] };
    } }
});
// i teorien: legg labbene inn i riktig enhet
const add = (k, n) => { SIM_MAP[k] = [].concat(SIM_MAP[k] || [], n).filter((x, i, a) => a.indexOf(x) === i);
  // felles enheter i andre fag arver labbene
  if(typeof COURSES !== "undefined") for(const c of COURSES) c.units.forEach((u, i) => { if(u.shared && u.shared + ":" + u.sharedU === k) SIM_MAP[c.code + ":" + i] = [].concat(SIM_MAP[c.code + ":" + i] || [], n).filter((x, j, a) => a.indexOf(x) === j); }); };
add("FLUID:1", "bernpipe"); add("GMAT:8", "meanmed"); add("MEK2200:1", "meanmed"); add("MEK1400:2", ["torque", "spin"]);
})();
