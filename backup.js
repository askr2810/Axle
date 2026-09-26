// ============================================================
//  SIKKERHETSKOPI – flytt fremgangen mellom enheter med en kode eller en fil.
//  mergeState slår sammen to tilstander uten å miste noe. Den kan også brukes når kontoer kommer.
// ============================================================
const BK_PREFIX = "AXLE1:";

function bkEncode(obj){
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = ""; for(let i=0;i<bytes.length;i+=0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i+0x8000));
  return BK_PREFIX + btoa(bin);
}
function bkDecode(text){
  let s = String(text||"").trim();
  if(s.startsWith("{")) return JSON.parse(s); // rå JSON godtas også
  const i = s.indexOf(BK_PREFIX); if(i < 0) throw new Error("prefix");
  s = s.slice(i + BK_PREFIX.length).replace(/[^A-Za-z0-9+/=]/g, "");
  const bin = atob(s), bytes = new Uint8Array(bin.length);
  for(let k=0;k<bin.length;k++) bytes[k] = bin.charCodeAt(k);
  return JSON.parse(new TextDecoder().decode(bytes));
}
function backupSnapshot(){
  const snap = JSON.parse(JSON.stringify(S)); delete snap.outbox; delete snap.examRun;
  snap.exportedAt = Date.now(); return snap;
}

const isObj = x => x && typeof x === "object" && !Array.isArray(x);
function unionFlags(a, b){ const o = Object.assign({}, isObj(b)?b:{}); if(isObj(a)) for(const k in a) if(a[k]) o[k] = a[k]; return o; }

// Slår sammen fremgangen i b inn i a. Innstillingene (språk, mål, påminnelse osv.) på denne enheten beholdes.
function mergeState(a, b){
  const m = JSON.parse(JSON.stringify(a));
  if(!isObj(b)) return m;
  if(!m.avatar && typeof b.avatar === "string") m.avatar = b.avatar;
  if(!("photo" in m) && typeof b.photo === "string") m.photo = b.photo;
  if(isObj(b.drill)){ m.drill = Object.assign({}, m.drill || {}); for(const k in b.drill){ const x = b.drill[k], y = m.drill[k]; if(isObj(x) && (!y || (+x.at || 0) > (+y.at || 0))) m.drill[k] = x; } }
  m.gdDone = Object.assign({}, isObj(b.gdDone) ? b.gdDone : {}, a.gdDone || {});
  const strs = x => Array.isArray(x) ? x.filter(y => typeof y === "string" && y.length < 20).slice(0, 80) : null;
  if(!Array.isArray(a.favs) && strs(b.favs)) m.favs = strs(b.favs);              // favoritter og kilder: enheten som ikke har valgt noe, arver
  if(!a.dcSrc && ["auto", "favs", "pick"].includes(b.dcSrc)){ m.dcSrc = b.dcSrc; if(strs(b.dcPick)) m.dcPick = strs(b.dcPick); }
  m.simGoals = Object.assign({}, a.simGoals || {}); if(isObj(b.simGoals)) for(const k in b.simGoals) m.simGoals[k] = Math.max(+m.simGoals[k] || 0, +b.simGoals[k] || 0);
  if(!m.name && typeof b.name === "string") m.name = b.name;
  m.badges = Object.assign({}, isObj(b.badges) ? b.badges : {}, a.badges || {});
  m.stats = Object.assign({}, a.stats || {}); if(isObj(b.stats)) for(const k in b.stats) m.stats[k] = Math.max(+m.stats[k] || 0, +b.stats[k] || 0);
  if(isObj(b.dc) && (!m.dc || String(b.dc.day) > String(m.dc.day))) m.dc = b.dc;
  m.weekWins = Object.assign({}, isObj(b.weekWins) ? b.weekWins : {}, a.weekWins || {});
  m.bestStreak = Math.max(+a.bestStreak || 0, +b.bestStreak || 0);
  { const v = [+a.since, +b.since].filter(x => x > 0); if(v.length) m.since = Math.min(...v); } // «Med siden»: tidligste
  if(!(+a.memberNo > 0) && +b.memberNo > 0) m.memberNo = +b.memberNo; // medlemsnummer (Pioner-merket); databasen har siste ord ved oppstart
  m.xp = Math.max(+a.xp||0, +b.xp||0);
  m.daily = Object.assign({}, a.daily);
  if(isObj(b.daily)) for(const k in b.daily) m.daily[k] = Math.max(+m.daily[k]||0, +b.daily[k]||0);
  const sa = a.streak || {count:0,last:null}, sb = isObj(b.streak) ? b.streak : {count:0,last:null};
  m.streak = (String(sb.last||"") > String(sa.last||"") || (sb.last===sa.last && (+sb.count||0) > (+sa.count||0))) ? { count:+sb.count||0, last:sb.last } : { count:+sa.count||0, last:sa.last };
  m.theorySeen = unionFlags(a.theorySeen, b.theorySeen);
  m.preHidden = unionFlags(a.preHidden, b.preHidden);
  m.subjects = {};
  const codes = new Set([...Object.keys(a.subjects||{}), ...Object.keys(isObj(b.subjects)?b.subjects:{})]);
  for(const c of codes){
    const x = (a.subjects||{})[c] || {}, y = (isObj(b.subjects) && b.subjects[c]) || {};
    m.subjects[c] = Object.assign({}, y, x, {
      done: unionFlags(x.done, y.done),
      wrong: [...new Set([...(Array.isArray(x.wrong)?x.wrong:[]), ...(Array.isArray(y.wrong)?y.wrong:[])])]
    });
  }
  m.exams = JSON.parse(JSON.stringify(a.exams || {}));
  if(isObj(b.exams)) for(const c in b.exams){
    if(!isObj(b.exams[c])) continue;
    const hc = (m.exams[c] ||= {});
    for(const v in b.exams[c]){
      const y = b.exams[c][v]; if(!isObj(y)) continue;
      const x = hc[v]; if(!x){ hc[v] = y; continue; }
      x.attempts = Math.max(+x.attempts||0, +y.attempts||0);
      if(y.best && (!x.best || y.best.pct > x.best.pct)) x.best = y.best;
      if(y.last && (!x.last || (y.last.at||0) > (x.last.at||0))) x.last = y.last;
    }
  }
  const seen = new Set(), log = [];
  for(const e of [...(a.examLog||[]), ...(Array.isArray(b.examLog)?b.examLog:[])]){
    if(!isObj(e)) continue; const k = e.code+"|"+e.v+"|"+e.at; if(seen.has(k)) continue; seen.add(k); log.push(e);
  }
  m.examLog = log.sort((p,q)=>(p.at||0)-(q.at||0)).slice(-30);
  return m;
}

// Leser en kode eller fil og slår den sammen med fremgangen på enheten. Returnerer true ved suksess.
function importBackup(text){
  let r; try{ r = bkDecode(text); }catch(e){ return false; }
  if(!isObj(r) || r.v !== 1) return false;
  S = Object.assign(blank(), mergeState(S, r));
  save(); return true;
}
function backupFileName(){ return "axle-sikkerhetskopi-" + dayKey() + ".txt"; }
function downloadBackup(code){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([code], { type: "text/plain" }));
  a.download = backupFileName(); document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
