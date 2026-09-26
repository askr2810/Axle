// ============================================================
//  SAMLING – ting til avataren som låses opp (avatar-del «p»).
//  Noen er synlige belønninger (fullførte emner, rekke, kroner), andre er hemmelige påskeegg.
//  Opplåste ting lagres i S.unlocks { id: tidspunkt } og beholdes selv om betingelsen ikke lenger gjelder.
// ============================================================
// Fargefamilier for påskeegget «Regnbue»: bruk minst fire forskjellige farger i avataren
// (hår, klær, bakgrunn, briller, øyne, hodeplagg, antrekk og smykker teller).
const AV_FAM = {
  hc: { 3: "gul", 4: "rød", 6: "blå", 7: "rosa", 9: "grønn", 10: "lilla" },
  sh: { 0: "blå", 1: "turkis", 2: "lilla", 3: "gul", 4: "rød", 5: "grønn", 7: "rosa" },
  bg: { 0: "blå", 1: "grønn", 2: "gul", 3: "rosa", 4: "lilla", 5: "turkis" },
  g: { 7: "blå", 8: "rosa" }, e: { 5: "gul" },
  a: { 2: "gul", 4: "blå", 6: "gul" },            // hjelm, vernebriller, krone
  o: { 5: "rød", 6: "gul", 7: "gul" },            // superhelt, hawaiiskjorte, refleksvest
  x: { 2: "gul", 6: "blå" }                       // gullkjede, dråpeøredobber
};
const RAINBOW_N = 4;
function avColors(o){ const f = new Set(); for(const k in AV_FAM){ const x = AV_FAM[k][o[k]]; if(x) f.add(x); } return f.size; }
function groupDone(g){ return COURSES.some(c => c.group === g && (() => { const p = courseProgress(c); return p.tot > 0 && p.d === p.tot; })()); }
function coursesDone(){ return COURSES.filter(c => { const p = courseProgress(c); return p.tot > 0 && p.d === p.tot; }).length; }
// [indeks i AV_NAMES.p, id, hemmelig?, sjekk(o = avatar som vises i byggeren), hint nb, hint en]
// Hemmelige påskeegg har bare en kort kode som hint – man må prøve seg fram.
const PETS = [
  [1, "rainbow", true, o => avColors(o) >= RAINBOW_N, "🎨 ≥ 4", "🎨 ≥ 4"],
  [2, "lizard", true, o => o.hc === 9 && o.sh === 5 && o.bg === 1, "H10 · K6 · B2", "H10 · C6 · B2"],
  [3, "gear", false, () => groupDone("Mekanikk og konstruksjon"), "Fullfør et emne i Mekanikk og konstruksjon.", "Complete a course in Mechanics and Design."],
  [4, "spark", false, () => groupDone("Elektro og automasjon"), "Fullfør et emne i Elektro og automasjon.", "Complete a course in Electrical and Automation."],
  [5, "robot", false, () => groupDone("Programmering og data"), "Fullfør et emne i Programmering og data.", "Complete a course in Programming."],
  [6, "owl", false, () => groupDone("Matematikk og fysikk") || groupDone("Forkurs"), "Fullfør et emne i matematikk, fysikk eller forkurs.", "Complete a maths, physics or foundation course."],
  [7, "turbine", false, () => groupDone("Energi og strømning"), "Fullfør et emne i Energi og strømning.", "Complete a course in Energy and Fluids."],
  [8, "cone", false, () => groupDone("Bygg og anlegg"), "Fullfør et emne i Bygg og anlegg.", "Complete a course in Civil Engineering."],
  [9, "bulb", false, () => groupDone("Produktutvikling og økonomi"), "Fullfør et emne i Produktutvikling og økonomi.", "Complete a course in Product Development and Economics."],
  [10, "sprout", false, () => groupDone("Samfunn og bærekraft"), "Fullfør et emne i Samfunn og bærekraft.", "Complete a course in Society and Sustainability."],
  [11, "trophy", false, () => coursesDone() >= 3, "Fullfør tre hele emner.", "Complete three whole courses."],
  [12, "flame", false, () => Math.max(+S.bestStreak || 0, streakNow()) >= 14, "Øv 14 dager på rad.", "Practise 14 days in a row."],
  [13, "halo", false, () => COURSES.reduce((n, c) => n + crowns(c), 0) >= 10, "Vinn 10 kroner.", "Win 10 crowns."],
  [14, "stardust", false, () => (+(S.stats || {}).flawless || 0) >= 10, "Fullfør 10 leksjoner uten feil.", "Finish 10 lessons without mistakes."],
  [15, "ufo", true, () => (S.stats || {}).ufo > 0, "👆 ⁷", "👆 ⁷"],
  [16, "moon", true, () => (S.stats || {}).night > 0, "00 → 04", "00 → 04"]
];
const unlockedPets = () => new Set([0, ...PETS.filter(p => (S.unlocks || {})[p[1]]).map(p => p[0])]);
// Sjekker og lagrer nye opplåsinger. o = avataren i byggeren (for fargepåskeeggene). Returnerer de nye.
function checkUnlocks(o){
  S.unlocks ||= {}; const fresh = [];
  for(const p of PETS) if(!S.unlocks[p[1]]){ let ok = false; try{ ok = p[3](o || avParse(S.avatar)); }catch(e){} if(ok){ S.unlocks[p[1]] = Date.now(); fresh.push(p); } }
  if(fresh.length){ save(); if(fresh.some(p => p[2])) bdgToast(checkBadges()); setTimeout(() => { toast(t("unlNew", fresh.map(p => T(AV_NAMES.p[p[0]][0], AV_NAMES.p[p[0]][1])).join(", "))); confetti(); buzz(true); }, 500); }
  return fresh;
}
function noteNightLesson(){ const h = new Date().getHours(); if(h >= 0 && h < 4){ S.stats ||= {}; S.stats.night = (+S.stats.night || 0) + 1; } }

// ---------- tegning (koordinater 0–100, høyre skulder rundt x 76, y 82) ----------
function petBack(p, id){
  if(p === 1) return ["#E53935", "#FB8C00", "#FDD835", "#43A047", "#1E88E5", "#8E24AA"].map((c, i) => `<path d="M${8 + i * 3} 78A${42 - i * 3} ${42 - i * 3} 0 0 1 ${92 - i * 3} 78" fill="none" stroke="${c}" stroke-width="3.2" opacity=".85"/>`).join("");
  if(p === 12) return `<defs><radialGradient id="${id}f"><stop offset="0" stop-color="#FFD54F" stop-opacity=".95"/><stop offset=".55" stop-color="#FF8F00" stop-opacity=".55"/><stop offset="1" stop-color="#FF3D00" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="50" cy="44" rx="38" ry="40" fill="url(#${id}f)"/><path d="M22 60c-6-14 2-24 6-30 0 8 4 10 6 12-1-10 4-20 12-26-2 10 4 14 4 14s4-6 2-14c8 6 12 16 11 26 2-2 6-4 6-12 4 6 12 16 6 30z" fill="#FF7043" opacity=".45"/>`;
  if(p === 14) return [[14, 20], [84, 16], [10, 52], [90, 46], [22, 8], [78, 34], [30, 30], [70, 10]].map(([x, y], i) => `<path d="M${x} ${y - 3.5}l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="${i % 2 ? "#FFB300" : "#E86A92"}" opacity=".9"/>`).join("");
  if(p === 16) return `<rect width="100" height="100" fill="#1A2340" opacity=".55"/><path d="M20 12a9 9 0 1 0 8 13 7 7 0 1 1-8-13z" fill="#FFF3C4"/>${[[70, 10], [86, 22], [40, 8], [90, 40], [12, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#fff"/>`).join("")}`;
  return "";
}
function petFront(p){
  switch(p){
    case 2: return `<g transform="translate(0 -5)"><path d="M60 86c6-5 16-6 22-2 3 2 2 5-1 5-5-1-10 0-14 3z" fill="#43A047"/><path d="M80 84c4-2 8-1 9 2-2 2-6 2-9 1z" fill="#66BB6A"/><circle cx="85.5" cy="84.3" r=".9" fill="#1B1B1B"/>
      <path d="M62 88c-5 3-9 2-12 0 3 0 6-1 8-3" fill="none" stroke="#2E7D32" stroke-width="2.2" stroke-linecap="round"/><path d="M68 88l-1 3M74 87l1 3" stroke="#2E7D32" stroke-width="1.6" stroke-linecap="round"/>
      ${[[66, 86], [71, 85], [76, 85]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#A5D6A7"/>`).join("")}</g>`;
    case 3: { const c = [76, 80]; let d = ""; for(let i = 0; i < 8; i++){ const a = i * Math.PI / 4; d += `<rect x="${c[0] - 1.6}" y="${c[1] - 9}" width="3.2" height="4" rx=".6" fill="#90A4AE" transform="rotate(${i * 45} ${c[0]} ${c[1]})"/>`; }
      return `<g>${d}<circle cx="76" cy="80" r="6.5" fill="#90A4AE"/><circle cx="76" cy="80" r="2.4" fill="#ECEFF1"/><circle cx="74" cy="79" r=".8" fill="#263238"/><circle cx="78" cy="79" r=".8" fill="#263238"/></g>`; }
    case 4: return `<g><circle cx="80" cy="70" r="8" fill="#FFF59D" opacity=".45"/><rect x="73" y="67" width="14" height="6" rx="3" fill="#37474F"/><path d="M71 66h6M83 66h6" stroke="#90A4AE" stroke-width="1.6"/><path d="M81 69l-3 4h3l-2 4 5-5h-3l2-3z" fill="#FFD600"/></g>`;
    case 5: return `<g><path d="M76 67v-3" stroke="#546E7A" stroke-width="1.4"/><circle cx="76" cy="63" r="1.5" fill="#E53935"/><rect x="69" y="68" width="14" height="11" rx="3" fill="#B0BEC5"/><circle cx="73" cy="73" r="1.8" fill="#29B6F6"/><circle cx="79" cy="73" r="1.8" fill="#29B6F6"/><path d="M73 76.5h6" stroke="#546E7A" stroke-width="1.2"/><rect x="70" y="80" width="12" height="8" rx="2" fill="#90A4AE"/></g>`;
    case 6: return `<g><ellipse cx="77" cy="80" rx="7" ry="8.5" fill="#8D6E63"/><path d="M71 73l2 3M83 73l-2 3" stroke="#6D4C41" stroke-width="2"/><circle cx="74.3" cy="77" r="2.8" fill="#fff"/><circle cx="79.7" cy="77" r="2.8" fill="#fff"/><circle cx="74.6" cy="77.3" r="1.3" fill="#212121"/><circle cx="79.4" cy="77.3" r="1.3" fill="#212121"/><path d="M76 80l1 1.6 1-1.6z" fill="#FFB300"/><text x="77" y="87" text-anchor="middle" font-family="Georgia,serif" font-size="5" font-weight="700" fill="#FFF3E0">π</text></g>`;
    case 7: return `<g><path d="M78 90V70" stroke="#ECEFF1" stroke-width="1.8"/>${[0, 120, 240].map(r => `<path d="M78 70l-1.2-10q1.2-1 2.4 0z" fill="#fff" stroke="#B0BEC5" stroke-width=".4" transform="rotate(${r} 78 70)"/>`).join("")}<circle cx="78" cy="70" r="1.4" fill="#90A4AE"/></g>`;
    case 8: return `<g><path d="M76 68l-6 18h12z" fill="#FF6D00"/><path d="M73.5 76h5M72 81h8" stroke="#fff" stroke-width="2"/><rect x="67" y="86" width="18" height="3" rx="1" fill="#E65100"/></g>`;
    case 9: return `<g><circle cx="77" cy="72" r="10" fill="#FFF59D" opacity=".4"/><circle cx="77" cy="72" r="6" fill="#FFEE58" stroke="#F9A825" stroke-width=".8"/><path d="M75 72q2 3 4 0" stroke="#F57F17" stroke-width=".8" fill="none"/><rect x="74.5" y="77.5" width="5" height="4" rx="1" fill="#90A4AE"/><path d="M74.5 79h5" stroke="#607D8B" stroke-width=".6"/></g>`;
    case 10: return `<g><path d="M71 82h12l-2 7h-8z" fill="#A1887F"/><path d="M77 82v-6" stroke="#388E3C" stroke-width="1.4"/><path d="M77 77c-4 0-6-3-6-5 3 0 6 2 6 5zM77 76c0-4 3-6 6-6 0 3-2 6-6 6z" fill="#66BB6A"/></g>`;
    case 11: return `<g><path d="M71 69h12v4a6 6 0 0 1-12 0z" fill="#FFCA28" stroke="#F9A825" stroke-width=".8"/><path d="M71 70h-3a3 3 0 0 0 3 4M83 70h3a3 3 0 0 1-3 4" fill="none" stroke="#F9A825" stroke-width="1.2"/><rect x="75.5" y="78" width="3" height="4" fill="#F9A825"/><rect x="72" y="82" width="10" height="3" rx="1" fill="#8D6E63"/><path d="M75 71l1 1.2" stroke="#fff" stroke-width=".8"/></g>`;
    case 13: return `<ellipse cx="50" cy="15" rx="15" ry="4" fill="none" stroke="#FFD54F" stroke-width="2.6"/><ellipse cx="50" cy="15" rx="15" ry="4" fill="none" stroke="#FFF8E1" stroke-width=".8"/>`;
    case 15: return `<g><path d="M70 30l-8 26h20z" fill="#B2FF59" opacity=".25"/><ellipse cx="76" cy="28" rx="12" ry="4" fill="#90A4AE"/><path d="M70 27a6 5 0 0 1 12 0z" fill="#80DEEA" opacity=".9"/>${[68, 76, 84].map(x => `<circle cx="${x}" cy="29" r="1" fill="#FFEB3B"/>`).join("")}</g>`;
  }
  return "";
}
