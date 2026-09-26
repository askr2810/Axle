// ============================================================
//  ADRESSE I NETTLESEREN – så en oppdatering (F5) lander der man var.
//  Bruker #-adresser (axle.no/#/teori/FAST/2), fordi GitHub Pages bare serverer faste filer,
//  og fordi axle.no/<fag>/ allerede er de åpne fagsidene for Google. Fungerer også i iOS/Android-appen.
//  Adressen byttes med replaceState, så tilbakeknappen i nettleseren oppfører seg som før.
//  Ord på norsk eller engelsk etter språket; begge forstås når adressen leses.
// ============================================================
const RT = { practice: ["ov", "practice"], book: ["teori", "theory"], friends: ["venner", "friends"], profile: ["profil", "profile"], badges: ["merker", "badges"],
  settings: ["innstillinger", "settings"], community: ["fellesskap", "community"], pick: ["fag", "courses"], groups: ["grupper", "groups"], theory: ["les", "read"], guided: ["steg", "steps"], topic: ["emne", "topic"], sheet: ["formler", "formulas"], person: ["person", "person"] };
const rtW = k => RT[k][LANG === "en" ? 1 : 0];
const rtKey = w => Object.keys(RT).find(k => RT[k].includes(String(w || "").toLowerCase()));
const rtCourse = code => COURSES.some(c => c.code === code) ? code : null;
// Nåværende skjerm som adresse ("" = forsiden), eller null for skjermer som ikke skal huskes (leksjon, eksamen …).
function routeOf(){
  switch(screen){
    case "home": return "";
    case "friends": return FR.view === "groups" ? [rtW("groups")].concat(GR.cur ? [GR.cur] : []).join("/") : rtW("friends");
    case "practice": case "profile": case "badges": case "settings": case "pick": case "community": return rtW(screen);
    case "avatar": return rtW("profile");
    case "person": return PS.id ? rtW("person") + "/" + PS.id : null;
    case "ccedit": return rtW("community");
    case "book":
      if(BK.v === "course" && BK.code) return [rtW("book"), BK.code].concat(BK.tab === "sheet" ? [rtW("sheet")] : []).join("/");
      if(BK.v === "unit" && BK.code) return [rtW("book"), BK.code, BK.u + 1].join("/");
      if(BK.v === "topic" && BK.code && BK.topic) return [rtW("book"), BK.code, rtW("topic"), BK.topic].join("/");
      return rtW("book");
    case "theory": return TH ? [rtW("theory"), TH.code, TH.u + 1].join("/") : "";
    case "guided": return GD ? [rtW("guided"), GD.code, GD.u + 1, GD.i + 1].join("/") : null; // steg for steg, med kortnummer
    default: return null;
  }
}
function routeSync(){
  const r = routeOf(); if(r === null) return;
  const h = r ? "#/" + r.split("/").map(encodeURIComponent).join("/") : "";
  if((location.hash && !location.hash.startsWith("#/")) || location.hash === h || (!h && !location.hash)) return; // andre #-adresser (innloggingslenker, meldinger) er ikke våre
  try{ history.replaceState(history.state, "", location.pathname + location.search + h); }catch(e){}
}
// Ved oppstart: les adressen og sett skjermen. Ukjente eller ugyldige adresser gir forsiden.
function routeBoot(){
  const h = location.hash || ""; if(!h.startsWith("#/") || /access_token=/.test(h)) return false;
  const p = h.slice(2).split("/").filter(Boolean).map(x => { try{ return decodeURIComponent(x); }catch(e){ return x; } });
  const k = rtKey(p[0]); if(!k) return false;
  if(k === "book"){
    const code = rtCourse(p[1]);
    BK = { v: "home", code: null, u: 0, tab: "topics", q: "" };
    if(code){
      const c = COURSE(code), units = bkUnits(c), u = parseInt(p[2], 10) - 1;
      if(rtKey(p[2]) === "topic" && p[3] && topicFind(code, p[3])) BK = { v: "topic", code, u: topicFind(code, p[3]).u, tab: "topics", q: "", topic: p[3] };
      else if(Number.isInteger(u) && units.includes(u)) BK = { v: "unit", code, u, tab: "topics", q: "" };
      else BK = { v: "course", code, u: 0, tab: rtKey(p[2]) === "sheet" ? "sheet" : "topics", q: "" };
    }
    screen = "book"; return true;
  }
  if(k === "theory"){
    const code = rtCourse(p[1]), u = parseInt(p[2], 10) - 1;
    if(code && Number.isInteger(u) && u >= 0 && u < COURSE(code).units.length && theoryOf(code, u)){ TH = { code, u, go: null }; screen = "theory"; return true; }
    return false;
  }
  if(k === "guided"){ // åpnes på nytt fra samme kort (svarene på spørsmålene før telles ikke)
    const code = rtCourse(p[1]), u = parseInt(p[2], 10) - 1, i = parseInt(p[3], 10) - 1;
    if(!(code && Number.isInteger(u) && u >= 0 && u < COURSE(code).units.length && theoryOf(code, u))) return false;
    gdOpen(code, u, null); if(!GD) return false;
    if(Number.isInteger(i) && i > 0 && i < GD.cards.length - 1) GD.i = i;
    return true;
  }
  if(k === "groups"){ screen = "friends"; FR.view = "groups"; GR.cur = /^[0-9a-f-]{36}$/i.test(p[1] || "") ? p[1] : null; GR.rows = null; return true; }
  if(k === "friends"){ screen = "friends"; FR.view = "friends"; return true; }
  if(k === "person"){ // en annens profil; «tilbake» går til Venner
    if(!psIsId(p[1])) return false;
    if(PS.id !== p[1]){ PS = { id: p[1], from: "friends", gid: null, row: psLocal(p[1]), busy: false, err: null, gone: false, confirm: null }; setTimeout(psLoad, 0); }
    screen = "person"; return true;
  }
  if(k === "topic" || k === "sheet") return false;
  if(k === "community"){ screen = "community"; setTimeout(() => { if(screen === "community" && CC.rows === null) ccLoad(); }, 0); return true; }
  screen = k; return true;
}
// Adressen endret utenfra (skrevet inn, eller en #/-lenke): gå dit, men aldri midt i en leksjon eller eksamen.
window.addEventListener("hashchange", () => {
  if(routeOf() === null || /access_token=/.test(location.hash)) return;
  const before = screen; overlay = null;
  if(routeBoot()){ if(screen !== "guided" || before === "guided") render(); window.scrollTo(0, 0); }
  else { screen = "home"; render(); window.scrollTo(0, 0); } // ukjent adresse: forsiden
});
