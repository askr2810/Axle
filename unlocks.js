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
// Påskeegget «Øgle»: grønt hår, grønne klær og grønn bakgrunn – alle grønntoner teller (også turkisgrønn genser og bakgrunn).
const AV_GREEN = { hc: [9], sh: [1, 5], bg: [1, 5] };
function avColors(o){ const f = new Set(); for(const k in AV_FAM){ const x = AV_FAM[k][o[k]]; if(x) f.add(x); } return f.size; }
function groupDone(g){ return COURSES.some(c => c.group === g && (() => { const p = courseProgress(c); return p.tot > 0 && p.d === p.tot; })()); }
function coursesDone(){ return COURSES.filter(c => { const p = courseProgress(c); return p.tot > 0 && p.d === p.tot; }).length; }
const ADMIN_PET = 17, MOD_PET = 18, DINO_PET = 19; // Kommandør og Dino-konge (admin), Vokter (mod og admin). Databasen fjerner dem fra andre.
// [indeks i AV_NAMES.p, id, hemmelig? (true = påskeegg, "staff" = mod og admin, "admin" = bare admin), sjekk(o = avatar som vises i byggeren), hint nb, hint en]
// Hemmelige påskeegg har bare en kort kode som hint – man må prøve seg fram.
const PETS = [
  [1, "rainbow", true, o => avColors(o) >= RAINBOW_N, "🎨 ≥ 4", "🎨 ≥ 4"],
  [2, "lizard", true, o => AV_GREEN.hc.includes(o.hc) && AV_GREEN.sh.includes(o.sh) && AV_GREEN.bg.includes(o.bg), "🟢 H · K · B", "🟢 H · C · B"],
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
  [16, "moon", true, () => (S.stats || {}).night > 0, "00 → 04", "00 → 04"],
  [ADMIN_PET, "admin", "admin", () => false, "Bare for admin.", "Admins only."], // låses opp av rollen, ikke av en oppgave
  [MOD_PET, "guardian", "staff", () => false, "Bare for moderatorer og admin.", "Moderators and admins only."],
  [DINO_PET, "dino", "admin", () => false, "Bare for admin.", "Admins only."]
];
// Mod/admin (rolle fra databasen, se app_roles i venner.sql) har alt i Samlingen.
const isStaff = () => !!AUTH && (S.appRole === "mod" || S.appRole === "admin");
const staffTag = role => role === "mod" || role === "admin" ? `<span class="staff-tag">🛡️ ${esc(t(role === "admin" ? "roleAdmin" : "roleMod"))}</span>` : "";
const isAdminRole = () => isStaff() && S.appRole === "admin";
const petRoleOk = p => p[2] === "admin" ? isAdminRole() : p[2] === "staff" ? isStaff() : true;
const petVisible = i => { const p = PETS.find(x => x[0] === i); return !p || petRoleOk(p); };
const unlockedPets = () => new Set([0, ...PETS.filter(p => (p[2] === "admin" || p[2] === "staff") ? petRoleOk(p) : isStaff() || (S.unlocks || {})[p[1]]).map(p => p[0])]);
const petTotal = () => PETS.filter(petRoleOk).length;
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
  if(p === ADMIN_PET) return adminBack(id);
  if(p === MOD_PET) return modBack(id);
  if(p === 1) return ["#E53935", "#FB8C00", "#FDD835", "#43A047", "#1E88E5", "#8E24AA"].map((c, i) => `<path d="M${8 + i * 3} 78A${42 - i * 3} ${42 - i * 3} 0 0 1 ${92 - i * 3} 78" fill="none" stroke="${c}" stroke-width="3.2" opacity=".85"/>`).join("");
  if(p === 12) return `<defs><radialGradient id="${id}f"><stop offset="0" stop-color="#FFD54F" stop-opacity=".95"/><stop offset=".55" stop-color="#FF8F00" stop-opacity=".55"/><stop offset="1" stop-color="#FF3D00" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="50" cy="44" rx="38" ry="40" fill="url(#${id}f)"/><path d="M22 60c-6-14 2-24 6-30 0 8 4 10 6 12-1-10 4-20 12-26-2 10 4 14 4 14s4-6 2-14c8 6 12 16 11 26 2-2 6-4 6-12 4 6 12 16 6 30z" fill="#FF7043" opacity=".45"/>`;
  if(p === 14) return [[14, 20], [84, 16], [10, 52], [90, 46], [22, 8], [78, 34], [30, 30], [70, 10]].map(([x, y], i) => `<path d="M${x} ${y - 3.5}l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="${i % 2 ? "#FFB300" : "#E86A92"}" opacity=".9"/>`).join("");
  if(p === 16) return `<rect width="100" height="100" fill="#1A2340" opacity=".55"/><path d="M20 12a9 9 0 1 0 8 13 7 7 0 1 1-8-13z" fill="#FFF3C4"/>${[[70, 10], [86, 22], [40, 8], [90, 40], [12, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#fff"/>`).join("")}`;
  return "";
}
function petFront(p, id){
  switch(p){
    case ADMIN_PET: return adminFront(id);
    case MOD_PET: return modFront(id);
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

// ---------- «Kommandør»: admin-skinnet ----------
// Mørk verdensrommet-bakgrunn, regnbuering som roterer, pulserende sjokkbølge, gnist i bane, blinkende stjerner,
// svevende diamant over hodet og et glødende skjold på brystet. Animert med SVG (virker i alle nettlesere og i appen).
function adminBack(id){
  const spin = (from, to, dur) => `<animateTransform attributeName="transform" type="rotate" from="${from} 50 46" to="${to} 50 46" dur="${dur}s" repeatCount="indefinite"/>`;
  const stars = [[12, 14, 0], [86, 10, .6], [8, 60, 1.2], [92, 54, .3], [24, 88, .9], [78, 90, 1.5], [66, 6, 1.1], [34, 6, .4]]
    .map(([x, y, d]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#fff"><animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="${d}s" repeatCount="indefinite"/></circle>`).join("");
  return `<defs><radialGradient id="${id}ab" cx="50%" cy="42%" r="72%"><stop offset="0" stop-color="#4B23A8" stop-opacity=".55"/><stop offset=".6" stop-color="#1A1050" stop-opacity=".9"/><stop offset="1" stop-color="#070A22"/></radialGradient>
      <linearGradient id="${id}ar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B36EFF"/><stop offset=".35" stop-color="#6ED3FF"/><stop offset=".7" stop-color="#6EFFA0"/><stop offset="1" stop-color="#FF6EC7"/></linearGradient>
      <linearGradient id="${id}as" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C79BFF"/><stop offset="1" stop-color="#5B2DC2"/></linearGradient></defs>
    <rect width="100" height="100" fill="url(#${id}ab)"/>${stars}
    <circle cx="50" cy="46" r="30" fill="none" stroke="#B36EFF" stroke-width="1.2"><animate attributeName="r" values="24;47" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2.6s" repeatCount="indefinite"/></circle>
    <circle cx="50" cy="46" r="41" fill="none" stroke="url(#${id}ar)" stroke-width="2.4" stroke-dasharray="14 5 3 5" stroke-linecap="round">${spin(0, 360, 9)}</circle>
    <circle cx="50" cy="46" r="36" fill="none" stroke="#6ED3FF" stroke-width=".9" stroke-dasharray="1.5 3.5" opacity=".8">${spin(360, 0, 14)}</circle>
    <g><circle r="4" fill="#B36EFF" opacity=".45"/><circle r="1.8" fill="#fff"/><animateMotion dur="4.5s" repeatCount="indefinite" path="M50 5a41 41 0 1 1-.01 0"/></g>
    <g><path d="M50 1.5l4.5 5.5-4.5 5.5-4.5-5.5z" fill="url(#${id}ar)" stroke="#fff" stroke-width=".6"/><path d="M50 1.5v11M45.5 7h9" stroke="#fff" stroke-width=".4" opacity=".7"/>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.8;0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
}
function adminFront(id){
  return `<g transform="translate(75 81)"><circle r="9" fill="#B36EFF" opacity=".35"><animate attributeName="r" values="7;10.5;7" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".45;.15;.45" dur="1.8s" repeatCount="indefinite"/></circle>
    <path d="M0-7.5l6.2 2.3v4.5c0 4.2-2.7 6.9-6.2 8.3-3.5-1.4-6.2-4.1-6.2-8.3v-4.5z" fill="url(#${id}as)" stroke="#FFD36E" stroke-width="1.1"/>
    <path d="M0-3.6l1.2 2.4 2.6.4-1.9 1.8.5 2.6L0 2.4l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z" fill="#FFD36E"><animate attributeName="opacity" values="1;.55;1" dur="1.8s" repeatCount="indefinite"/></path></g>`;
}

// ---------- «Vokter»: mod-skinnet ----------
// Kjølig blågrønn aura, én roterende ring med skjoldmerker, rolig puls og et skjold med hake på brystet.
function modBack(id){
  return `<defs><radialGradient id="${id}mb" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#0F8A83" stop-opacity=".25"/><stop offset=".65" stop-color="#0B3B5C" stop-opacity=".75"/><stop offset="1" stop-color="#062033" stop-opacity=".92"/></radialGradient>
      <linearGradient id="${id}mr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6EFFD8"/><stop offset="1" stop-color="#3FA7FF"/></linearGradient>
      <linearGradient id="${id}ms" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6EE7D8"/><stop offset="1" stop-color="#1273B8"/></linearGradient></defs>
    <rect width="100" height="100" fill="url(#${id}mb)"/>
    <circle cx="50" cy="46" r="38" fill="none" stroke="#6EFFD8" stroke-width="1" opacity=".5"><animate attributeName="opacity" values=".15;.6;.15" dur="3s" repeatCount="indefinite"/></circle>
    <g><circle cx="50" cy="46" r="42" fill="none" stroke="url(#${id}mr)" stroke-width="2" stroke-dasharray="22 8" stroke-linecap="round"/>
      ${[0, 120, 240].map(r => `<path d="M50 1.5l3 1.1v2.2c0 2-1.3 3.3-3 4-1.7-.7-3-2-3-4V2.6z" fill="#6EFFD8" transform="rotate(${r} 50 46)"/>`).join("")}
      <animateTransform attributeName="transform" type="rotate" from="0 50 46" to="360 50 46" dur="16s" repeatCount="indefinite"/></g>`;
}
function modFront(id){
  return `<g transform="translate(75 81)"><circle r="8.5" fill="#6EFFD8" opacity=".3"><animate attributeName="opacity" values=".35;.1;.35" dur="2.4s" repeatCount="indefinite"/></circle>
    <path d="M0-7l5.8 2.1v4.2c0 3.9-2.5 6.4-5.8 7.7-3.3-1.3-5.8-3.8-5.8-7.7v-4.2z" fill="url(#${id}ms)" stroke="#E6FFFA" stroke-width="1"/>
    <path d="M-2.6.2l1.9 1.9 3.6-3.8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}

// ---------- «Dino-konge»: admin-avatar der hele figuren er en T-rex som brøler ----------
// Kroppen får klesfargen og bakgrunnen følger bakgrunnsvalget, så den kan fortsatt tilpasses. Kjeven åpner seg
// hvert tredje sekund (brøl), hodet vipper opp, lydbølger og en vulkan som ryker i bakgrunnen.
function dinoSVG(o, id, size, extraClass){
  const col = AV_SHIRT[o.sh] || "#2E7D32", bg = AV_BG[o.bg] || "#D5F0E6", dur = "3.2s";
  const K = `keyTimes="0;.52;.6;.8;.88;1" dur="${dur}" repeatCount="indefinite"`, calc = `calcMode="spline" keySplines=".4 0 .2 1;.2 1 .4 1;0 0 1 1;.4 0 .2 1;0 0 1 1"`;
  const upY = x => 50 - (x - 50) * 4 / 36; // underkant av overkjeven
  const topTeeth = [55, 61, 67, 73, 79].map(x => `<path d="M${x - 1.8} ${upY(x).toFixed(1)}l1.8 4 1.8-4z" fill="#FFFDF5"/>`).join("");
  const lowTeeth = [57, 63, 69, 75, 81].map(x => `<path d="M${x - 1.8} 50.5l1.8-3.6 1.8 3.6z" fill="#FFFDF5"/>`).join("");
  // pigger langs ryggen og bakhodet: trekanter som står ut fra kurvene (punkt og normal på Bézier-kurven)
  const bez = (P, t) => { const u = 1 - t, c = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t], d = [-3 * u * u, 3 * u * u - 6 * u * t, 6 * u * t - 3 * t * t, 3 * t * t];
    return { x: c.reduce((s, k, i) => s + k * P[i][0], 0), y: c.reduce((s, k, i) => s + k * P[i][1], 0), dx: d.reduce((s, k, i) => s + k * P[i][0], 0), dy: d.reduce((s, k, i) => s + k * P[i][1], 0) }; };
  const spike = (P, t, h) => { const b = bez(P, t), L = Math.hypot(b.dx, b.dy), tx = b.dx / L, ty = b.dy / L, nx = ty, ny = -tx;
    return `<path d="M${(b.x - tx * 2.8).toFixed(1)} ${(b.y - ty * 2.8).toFixed(1)}L${(b.x + nx * h).toFixed(1)} ${(b.y + ny * h).toFixed(1)}L${(b.x + tx * 2.8).toFixed(1)} ${(b.y + ty * 2.8).toFixed(1)}z" fill="${col}" stroke="rgba(0,0,0,.25)" stroke-width=".6" stroke-linejoin="round"/>`; };
  const back = [[14, 104], [12, 84], [18, 64], [32, 48]], skull = [[30, 40], [30, 24], [44, 17], [60, 18.5]];
  const spikes = [.2, .4, .6, .8].map(t => spike(back, t, 5.5)).join("") + [.12, .38].map(t => spike(skull, t, 5)).join("");
  const puff = (x, d) => `<circle cx="${x}" cy="56" r="3" fill="#9AA3AB" opacity="0"><animate attributeName="cy" values="56;34" dur="3s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="r" values="2.5;6" dur="3s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="3s" begin="${d}s" repeatCount="indefinite"/></circle>`;
  return `<svg class="av ${extraClass}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath>
      <linearGradient id="${id}ds" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB86B" stop-opacity=".55"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></linearGradient></defs>
    <g clip-path="url(#${id})"><rect width="100" height="100" fill="${bg}"/><rect width="100" height="70" fill="url(#${id}ds)"/>
      <path d="M-4 84L10 58h10l14 26z" fill="#6D4C41" opacity=".75"/><path d="M10 58l3 5 2-3 2 3 3-5z" fill="#FF7043"/>${puff(15, 0)}${puff(14, 1.5)}
      <path d="M-5 100C10 88 30 90 45 96s35 0 60-6v12H-5z" fill="rgba(0,0,0,.12)"/>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 34 62;0 34 62;-7 34 62;-7 34 62;0 34 62;0 34 62" ${K} ${calc}/>
        <path d="M14 104C12 84 18 64 32 48l20 5c4 12 10 28 22 51z" fill="${col}"/>
        <path d="M34 104C36 86 42 70 50 60c4 14 9 30 16 44z" fill="#FFF3C4" opacity=".55"/>
        <path d="M46 76q9 1 11 7l-3 1.4q-3-4.4-8-4.4z" fill="${col}" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
        ${spikes}
        <path d="M48 50L86 46L84 55L52 58z" fill="#7A1F2B"/>
        <g><animateTransform attributeName="transform" type="rotate" values="0 48 50;0 48 50;24 48 50;22 48 50;0 48 50;0 48 50" ${K} ${calc}/>
          <path d="M45 48L86 50C89 52 87 57 82 58L52 60C46 60 43 55 45 48z" fill="${col}" stroke="rgba(0,0,0,.28)" stroke-width=".7"/>
          <path d="M52 52.5q14 3 26 0" stroke="#E86A92" stroke-width="2.4" fill="none" stroke-linecap="round"/>${lowTeeth}</g>
        <path d="M30 40C30 24 44 17 60 18.5C74 20 86 24 90 32C92 37 90 44 86 46L50 50C42 51 33 49 30 40z" fill="${col}" stroke="rgba(0,0,0,.28)" stroke-width=".7"/>
        <path d="M34 36C38 28 48 24 58 24" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none" stroke-linecap="round"/>
        ${topTeeth}
        <circle cx="83" cy="33" r="1.1" fill="rgba(0,0,0,.55)"/>
        <circle cx="58" cy="31" r="4.6" fill="#fff"/><circle cx="59.3" cy="31.4" r="2.4" fill="#1B1B1B"/><circle cx="60.2" cy="30.4" r=".8" fill="#fff"/>
        <path d="M51.5 26.5L65 27" stroke="rgba(0,0,0,.55)" stroke-width="2" stroke-linecap="round"><animate attributeName="d" values="M51.5 26.5L65 27;M51.5 26.5L65 27;M52 25L65 28.5;M52 25L65 28.5;M51.5 26.5L65 27;M51.5 26.5L65 27" ${K}/></path>
        <path d="M49 20l2.6-9 4.4 5.6 4-8 4 8 4.4-5.6 2.6 9z" fill="#F2B51D" stroke="#C98B00" stroke-width="1"/><circle cx="60" cy="13.5" r="1.5" fill="#E86A92"/>
      </g>
      <g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0">
        <animate attributeName="opacity" values="0;0;.95;.95;0;0" ${K}/>
        <path d="M91 50q3 5 0 10"/><path d="M95 46q5 9 0 18"/><path d="M99 42q7 13 0 26"/></g>
    </g></svg>`;
}
