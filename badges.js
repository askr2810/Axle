// ============================================================
//  MERKER – utmerkelser som låses opp når du når mål (rekke, XP, kroner, feilfri osv.).
//  Opplåste merker lagres i S.badges { id: tidspunkt } og synkroniseres med kontoen.
// ============================================================
function bdgStats(){
  let levels = 0, cr = 0, started = 0, completed = 0;
  for(const c of COURSES){ const p = courseProgress(c); levels += p.d; cr += crowns(c); if(p.d) started++; if(p.tot && p.d === p.tot) completed++; }
  const st = S.stats || {};
  return { levels, crowns: cr, started, completed, xp: +S.xp || 0, streak: Math.max(+S.bestStreak || 0, streakNow()),
    theory: Object.keys(S.theorySeen || {}).length, challenges: +st.challenges || 0, weekwins: +st.weekwins || 0, exams: (S.examLog || []).length, flawless: +st.flawless || 0, reviews: +st.reviews || 0, friends: +st.friends || 0 };
}
// [id, nivå (1 bronse, 2 sølv, 3 gull), ikon, statistikk, mål, nb-navn, en-navn, nb-beskrivelse, en-beskrivelse]
const BADGES = [
  ["first",   1, "star",   "levels",   1,     "Første steg",    "First step",      "Fullfør din første leksjon",           "Complete your first lesson"],
  ["lv25",    2, "star",   "levels",   25,    "Flittig",        "Diligent",        "Fullfør 25 nivåer",                    "Complete 25 levels"],
  ["lv100",   3, "star",   "levels",   100,   "Arbeidshest",    "Workhorse",       "Fullfør 100 nivåer",                   "Complete 100 levels"],
  ["st3",     1, "fire",   "streak",   3,     "I gang",         "Warming up",      "Øv 3 dager på rad",                    "Practise 3 days in a row"],
  ["st7",     2, "fire",   "streak",   7,     "En hel uke",     "A whole week",    "Øv 7 dager på rad",                    "Practise 7 days in a row"],
  ["st30",    3, "fire",   "streak",   30,    "Uknuselig",      "Unbreakable",     "Øv 30 dager på rad",                   "Practise 30 days in a row"],
  ["xp500",   1, "bolt",   "xp",       500,   "500 XP",         "500 XP",          "Samle 500 XP",                         "Earn 500 XP"],
  ["xp2000",  2, "bolt",   "xp",       2000,  "2000 XP",        "2000 XP",         "Samle 2000 XP",                        "Earn 2000 XP"],
  ["xp10000", 3, "bolt",   "xp",       10000, "10 000 XP",      "10,000 XP",       "Samle 10 000 XP",                      "Earn 10,000 XP"],
  ["crown1",  1, "crown",  "crowns",   1,     "Første krone",   "First crown",     "Vinn krona i en enhet",                "Win the crown in a unit"],
  ["crown10", 2, "crown",  "crowns",   10,    "Kronesamler",    "Crown collector", "Vinn 10 kroner",                       "Win 10 crowns"],
  ["done1",   3, "trophy", "completed", 1,    "Fag fullført",   "Course complete", "Fullfør alle nivåene i et fag",        "Complete every level in a course"],
  ["flaw1",   1, "check",  "flawless", 1,     "Feilfri",        "Flawless",        "Fullfør en leksjon uten feil",         "Finish a lesson without mistakes"],
  ["flaw10",  2, "check",  "flawless", 10,    "Presisjon",      "Precision",       "Fullfør 10 leksjoner uten feil",       "Finish 10 lessons without mistakes"],
  ["th10",    1, "book",   "theory",   10,    "Teorileser",     "Theory reader",   "Les 10 teorisider",                    "Read 10 theory pages"],
  ["th40",    2, "book",   "theory",   40,    "Bokorm",         "Bookworm",        "Les 40 teorisider",                    "Read 40 theory pages"],
  ["exam1",   2, "doc",    "exams",    1,     "Eksamensklar",   "Exam ready",      "Fullfør en prøveeksamen",              "Complete a practice exam"],
  ["exam5",   3, "doc",    "exams",    5,     "Eksamensveteran","Exam veteran",    "Fullfør 5 prøveeksamener",             "Complete 5 practice exams"],
  ["multi3",  1, "steps",  "started",  3,     "Allsidig",       "All-rounder",     "Kom i gang med 3 fag",                 "Make progress in 3 courses"],
  ["rev5",    1, "redo",   "reviews",  5,     "Lærer av feil",  "Learning from mistakes", "Repeter feil 5 ganger",         "Review your mistakes 5 times"],
  ["dc5",     1, "bolt",   "challenges", 5,   "Utfordrer",      "Challenger",      "Fullfør 5 daglige utfordringer",       "Complete 5 daily challenges"],
  ["dc25",    3, "bolt",   "challenges", 25,  "Mester",         "Master",          "Fullfør 25 daglige utfordringer",      "Complete 25 daily challenges"],
  ["ww1",     3, "crown",  "weekwins", 1,     "Ukevinner",      "Weekly winner",   "Vinn ukeligaen blant vennene dine",    "Win the weekly league among your friends"],
  ["ww5",     3, "trophy", "weekwins", 5,     "Ligamester",     "League master",   "Vinn ukeligaen 5 ganger",              "Win the weekly league 5 times"],
  ["fr1",     1, "users",  "friends",  1,     "Sosial",         "Social",          "Legg til en venn",                     "Add a friend"],
  ["fr5",     2, "users",  "friends",  5,     "Populær",        "Popular",         "Ha 5 venner",                          "Have 5 friends"]
];
const bdgName = b => T(b[5], b[6]), bdgDesc = b => T(b[7], b[8]);
// Låser opp merker som er nådd. Returnerer de nye.
function checkBadges(){
  const st = bdgStats(), now = Date.now(), fresh = [];
  S.bestStreak = Math.max(+S.bestStreak || 0, streakNow());
  S.badges ||= {};
  for(const b of BADGES) if(!S.badges[b[0]] && st[b[3]] >= b[4]){ S.badges[b[0]] = now; fresh.push(b); }
  return fresh;
}
function bdgToast(list){ if(list && list.length) setTimeout(() => toast(t("bdgNew", list.map(bdgName).join(", "))), 400); }
function bdgStat(key, n = 1){ S.stats ||= {}; S.stats[key] = (+S.stats[key] || 0) + n; }

function badgeIcon(b, size = 64, locked){
  const tiers = [null, ["#E3A06B", "#9C5B2A"], ["#E1E6EA", "#8C99A6"], ["#F7D35C", "#C08A0B"]], [c1, c2] = tiers[b[1]];
  const ic = b[2] === "doc" ? I.docB : b[2] === "trophy" ? I.trophyS : I[b[2]] || I.star;
  return `<span class="bdg ${locked ? "locked" : ""}" style="--b1:${c1};--b2:${c2};width:${size}px;height:${size}px">${ic}</span>`;
}
function renderBadges(){
  const st = bdgStats(), have = S.badges || {}, n = BADGES.filter(b => have[b[0]]).length;
  const cards = BADGES.map(b => {
    const got = !!have[b[0]], v = Math.min(st[b[3]], b[4]);
    return `<div class="bdg-card ${got ? "got" : ""}">${badgeIcon(b, 62, !got)}<b>${esc(bdgName(b))}</b><span>${esc(bdgDesc(b))}</span>
      ${got ? `<small class="bdg-date">${esc(new Date(have[b[0]]).toLocaleDateString(LANG === "en" ? "en-GB" : "nb-NO"))}</small>` : `<div class="mini"><i style="width:${v / b[4] * 100}%"></i></div><small>${nf(v, 0)} / ${nf(b[4], 0)}</small>`}</div>`;
  }).join("");
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="home" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="th-t"><small>${esc(t("bdgCount", n, BADGES.length))}</small><b>${esc(t("bdgTitle"))}</b></div><span class="th-ic" aria-hidden="true">${I.trophyS}</span></div></div>
    <main class="wrap bdgs"><div class="meter bdg-meter"><i style="width:${n / BADGES.length * 100}%"></i></div><div class="bdg-grid">${cards}</div></main>`;
}
