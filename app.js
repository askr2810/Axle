
// ============================================================
//  Axle – ingeniørtrening / engineering practice
// ============================================================
const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function tex(s){
  try{ if(window.katex) return katex.renderToString(s,{output:"mathml",throwOnError:false}); }catch(e){}
  return '<span class="mono">'+esc(s)+'</span>';
}
function inline(s){
  return s.split(/(`[^`]+`|\$[^$]+\$)/g).map(p=>{
    if(p.startsWith("`")&&p.endsWith("`")&&p.length>1) return "<code>"+esc(p.slice(1,-1))+"</code>";
    if(p.startsWith("$")&&p.endsWith("$")&&p.length>1) return tex(p.slice(1,-1));
    return esc(p).replace(/(\d) (%|‰|°C|°|kr\b|kWh\b|kW\b|kN\b|mm\b|cm\b|m\/s\b|m\b|s\b|N\b|W\b|V\b|A\b|J\b|Hz\b|kg\b|g\b)/g, "$1\u00a0$2"); // tall og enhet på samme linje
  }).join("");
}
function rich(s){
  s = String(s); if(LANG==="en") s = s.replace(/\{,\}/g,".");
  return s.split(/```([\s\S]*?)```/g).map((p,i)=> i%2 ? '<pre class="code">'+esc(p.replace(/^\n|\n$/g,""))+"</pre>" : inline(p)).join("");
}
// teori-dokument (markering: ## ### - 1. > $$ ``` **fet**), se learn.js
function texD(s){
  try{ if(window.katex) return katex.renderToString(s,{output:"mathml",displayMode:true,throwOnError:false}); }catch(e){}
  return '<div class="mono">'+esc(s)+'</div>';
}
function richDoc(src){
  let s = String(src||""); if(LANG==="en") s = s.replace(/\{,\}/g,".");
  const inl = x => inline(x).replace(/\*\*([^*]+?)\*\*/g,"<b>$1</b>");
  const out = []; let para = [], list = null, box = [], code = null;
  const fPara = () => { if(para.length){ out.push("<p>"+inl(para.join(" "))+"</p>"); para = []; } };
  const fList = () => { if(list){ out.push(`<${list.t}>`+list.items.map(x=>"<li>"+inl(x)+"</li>").join("")+`</${list.t}>`); list = null; } };
  const fBox = () => { if(box.length){ out.push('<div class="callout">'+box.map(inl).join("<br>")+"</div>"); box = []; } };
  const fAll = () => { fPara(); fList(); fBox(); };
  for(const raw of s.split("\n")){
    const L = raw.trim();
    if(code){ if(/^```/.test(L)){ out.push('<pre class="code">'+esc(code.join("\n"))+"</pre>"); code = null; } else code.push(raw); continue; }
    if(/^```/.test(L)){ fAll(); code = []; continue; }
    if(!L){ fAll(); continue; }
    let m;
    if((m = L.match(/^(#{2,3})\s+(.*)$/))){ fAll(); const h = m[1].length===2 ? "h3" : "h4"; out.push(`<${h}>${inl(m[2])}</${h}>`); continue; }
    if((m = L.match(/^!\[fig:(\w+)\]$/))){ fAll(); out.push(figureHTML(m[1])); continue; }
    if((m = L.match(/^!\[sim:(\w+)\]$/))){ fAll(); out.push(simHTML(m[1])); continue; }
    if((m = L.match(/^\$\$(.+)\$\$$/))){ fPara(); fList(); fBox(); out.push('<div class="dmath">'+texD(m[1])+"</div>"); continue; }
    if((m = L.match(/^>\s?(.*)$/))){ fPara(); fList(); box.push(m[1]); continue; }
    if((m = L.match(/^-\s+(.*)$/)) || (m = L.match(/^\d+[.)]\s+(.*)$/))){ fPara(); fBox(); const tp = /^-/.test(L) ? "ul" : "ol";
      if(!list || list.t!==tp){ fList(); list = { t:tp, items:[] }; } list.items.push(m[1]); continue; }
    fList(); fBox(); para.push(L);
  }
  if(code) out.push('<pre class="code">'+esc(code.join("\n"))+"</pre>");
  fAll(); return out.join("");
}
// ren tekst (til rapporter)
const plain = s => String(s).replace(/```([\s\S]*?)```/g," [kode: $1] ").replace(/\$/g,"").replace(/`/g,"").replace(/\s+/g," ").trim();
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pad = n => String(n).padStart(2,"0");
const dayKey = (d=new Date()) => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const addDays = (d,n) => { const x=new Date(d); x.setDate(x.getDate()+n); return x; };
const COURSE = code => COURSES.find(c=>c.code===code) || COURSES[0];
const range = n => [...Array(n).keys()];
const REQ = 3, NODES_PER_UNIT = 4;
const LEVELS = [ {n:5, xp:10}, {n:6, xp:12}, {n:7, xp:15}, {n:10, xp:20, hearts:3} ];
const lvName = k => t("levels")[k][0], lvShort = k => t("levels")[k][1];

const svg = (p, s=22, fill=false, sw=2.2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" ${fill?'fill="currentColor"':`fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`} aria-hidden="true">${p}</svg>`;
const I = {
  fire: svg('<path d="M12 2c1 3.5-1.6 5.3-1.6 8.2 0 1.3.8 2.3 2 2.3 1.5 0 2.2-1.3 1.9-3.2 2.8 1.9 4.7 4.6 4.7 7.6C19 20.6 15.9 23 12 23s-7-2.4-7-6.1C5 11.6 9.7 8.7 12 2z"/>',20,true),
  bolt: svg('<path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.6z"/>',20,true),
  down: svg('<path d="m6 9 6 6 6-6"/>',18,false,2.6),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>',30,false,3.4),
  star: svg('<path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/>',30,true),
  lock: svg('<path d="M7 10V7.5a5 5 0 0 1 10 0V10h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V7.5a3 3 0 0 0-6 0z"/>',24,true),
  x: svg('<path d="M6 6l12 12M18 6 6 18"/>',24,false,2.6),
  redo: svg('<path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/>',20,false,2.4),
  crown: svg('<path d="M3 7.5l4.6 4.1L12 4l4.4 7.6L21 7.5 19.3 19H4.7z"/>',20,true),
  crownBig: svg('<path d="M3 7.5l4.6 4.1L12 4l4.4 7.6L21 7.5 19.3 19H4.7z"/>',30,true),
  heart: svg('<path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z"/>',22,true),
  heartOff: svg('<path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z"/>',22,false,2),
  gear: svg('<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',22,false,1.8),
  flag: svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',22),
  eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',22),
  eyeOff: svg('<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.1 3.9M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',22),
  pencil: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>',18),
  pen: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>',20),
  eraser: svg('<path d="m7 21-4-4 11-11 7 7-8 8z"/><path d="M11 21h10"/>',20),
  undo: svg('<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',20),
  trash: svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',20),
  zin: svg('<circle cx="11" cy="11" r="7"/><path d="M11 8v6M8 11h6M20 20l-4-4"/>',20),
  zout: svg('<circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-4-4"/>',20),
  fit: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',20),
  chevron: svg('<path d="m9 6 6 6-6 6"/>',18),
  left: svg('<path d="m15 5-7 7 7 7"/>',22,false,2.6),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',20),
  plus: svg('<path d="M12 5v14M5 12h14"/>',18,false,2.8),
  chat: svg('<path d="M4 5h16v11H9l-5 4z"/>',20,false,2.2),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',20,false,2.2),
  copy: svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',20,false,2.2),
  share: svg('<path d="M12 3v12M7 8l5-5 5 5M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/>',20,false,2.2),
  users: svg('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',20),
  trophy: svg('<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H4v2a3 3 0 0 0 4 3M16 5h4v2a3 3 0 0 1-4 3M12 13v4M8 21h8M9 17h6v4H9z"/>',44,false,1.8),
  star16: svg('<path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/>',16,true),
  dice: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',22),
  docB: svg('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',26),
  trophyS: svg('<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H4v2a3 3 0 0 0 4 3M16 5h4v2a3 3 0 0 1-4 3M12 13v4M8 21h8M9 17h6v4H9z"/>',22),
  book2: svg('<path d="M4 20V10l8-6 8 6v10h-5v-6H9v6z"/>',22),
  person: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',22),
  checkS: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>',16,false,3.2),
  book: svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',18),
  steps: svg('<path d="M4 20h5v-5h5v-5h6"/>',18),
  okc:'<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="m7 12.5 3.3 3.3L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  badc:'<svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>'
};

// ---------- plattform ----------
const CAP = window.Capacitor;
const NATIVE = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
// Native tillegg (Capacitor). Uten bundler: bruk Capacitor.Plugins, ellers registerPlugin(navn) fra runtime-en.
const PL = !NATIVE ? {} : new Proxy({}, { get(o, name){
  if(typeof name !== "string") return undefined;
  if(!(name in o)){ let pl = (CAP.Plugins && CAP.Plugins[name]) || null;
    if(!pl && typeof CAP.registerPlugin === "function" && (!CAP.isPluginAvailable || CAP.isPluginAvailable(name))){ try{ pl = CAP.registerPlugin(name); }catch(e){ pl = null; } }
    o[name] = pl; }
  return o[name]; } });
const PLATFORM = NATIVE ? (CAP.getPlatform ? CAP.getPlatform() : "native") : (window.claude ? "claude" : "web");

// ---------- lagring ----------
const blank = () => ({ v:1, current:"GMAT", theorySeen:{}, preHidden:{}, pickMode:"theme", xp:0, daily:{}, streak:{count:0,last:null}, subjects:{}, updatedAt:0,
  lang:LANG, goal:10, reminder:{on:false, time:"19:00"}, haptics:true, outbox:[],
  examPrefs:{time:"rec", custom:90, extra:0}, exams:{}, examLog:[], examRun:null });
function loadLocal(){ try{ const r = JSON.parse(localStorage.getItem(LS_KEY)); if(r && r.v===1) return Object.assign(blank(), r); }catch(e){} return blank(); }
function saveLocal(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){} }
let S = loadLocal(); if(LANG_URL){ S.lang = LANG_URL; S.langSet = 1; saveLocal(); } LANG = S.lang || LANG; // langSet = valgt selv (spør ikke igjen)
const sub = code => (S.subjects[code] ||= { done:{}, wrong:[] });

let remoteRef = null, remoteChain = Promise.resolve(), claudeDb = null, isOwner = false, FB_NO_DB = false;
function pushRemote(){
  if(!remoteRef) return;
  const snap = JSON.parse(JSON.stringify(S)); delete snap.outbox;
  remoteChain = remoteChain.then(()=>remoteRef.set({ state: snap })).catch(()=>{});
}
function nativeSave(){ if(PL.Preferences) PL.Preferences.set({ key: LS_KEY, value: JSON.stringify(S) }).catch(()=>{}); }
function save(){ S.updatedAt = Date.now(); saveLocal(); nativeSave(); pushRemote(); cloudSchedule(); }
async function nativeLoad(){
  if(!PL.Preferences) return;
  try{
    const { value } = await PL.Preferences.get({ key: LS_KEY });
    if(value){ const r = JSON.parse(value); if(r && r.v===1 && (r.updatedAt||0) > (S.updatedAt||0)){ S = Object.assign(blank(), r); LANG = S.lang || LANG; saveLocal(); examBoot(screen==="home"); if(screen!=="lesson") render(); } }
  }catch(e){}
}

// ---------- avledede tall ----------
function streakNow(){ const {count,last} = S.streak; const td = dayKey(), y = dayKey(addDays(new Date(),-1)); return (last===td || last===y) ? count : 0; }
function unitDone(code,u){ let n=0; for(let k=0;k<REQ;k++) if(sub(code).done[u+"-"+k]) n++; return n; }
function crowns(c){ let n=0; c.units.forEach((_,u)=>{ if(sub(c.code).done[u+"-3"]) n++; }); return n; }
function courseProgress(c){ const tot=c.units.length*REQ; let d=0; c.units.forEach((_,u)=> d+=unitDone(c.code,u)); return {d,tot}; }
function nextNode(c){ for(let u=0;u<c.units.length;u++) for(let k=0;k<REQ;k++) if(!sub(c.code).done[u+"-"+k]) return [u,k]; return null; }
function isUnlocked(c,u,k){ const d = sub(c.code).done; if(d[u+"-"+k]) return true; if(k===3) return !!d[u+"-2"]; const n = nextNode(c); return !!n && n[0]===u && n[1]===k; }
const unitLocked = (c,u) => !isUnlocked(c,u,0);

// ---------- skjermtilstand ----------
let screen = "home", L = null, overlay = null, toastTimer = null;
function toast(msg){
  document.querySelector(".toast")?.remove();
  const el = document.createElement("div"); el.className="toast"; el.setAttribute("role","status"); el.textContent = msg; document.body.appendChild(el);
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.remove(), 2800);
}
function buzz(ok){
  if(!S.haptics) return;
  try{
    if(PL.Haptics){ ok ? PL.Haptics.impact({style:"LIGHT"}) : PL.Haptics.notification({type:"ERROR"}); }
    else if(navigator.vibrate){ navigator.vibrate(ok ? 12 : [30,40,30]); }
  }catch(e){}
}

// ---------- hjem ----------
function renderHome(){
  duCheckInvites();
  const c = COURSE(S.current), st = streakNow(), today = S.daily[dayKey()]||0, goal = S.goal||10;
  const wrongN = sub(c.code).wrong.length;
  const now = new Date(); const dow = (now.getDay()+6)%7; const monday = addDays(now,-dow);
  const week = t("days").map((d,i)=>{ const k=dayKey(addDays(monday,i)); const on=(S.daily[k]||0)>0; const isT=i===dow;
    return `<div><span class="dot ${on?"on":""} ${isT&&!on?"today":""}">${on?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>':""}</span>${d}</div>`; }).join("");
  const nn = nextNode(c);
  let path = "";
  c.units.forEach((u,ui)=>{
    const col = `var(--u${ui%3})`, dn = sub(c.code).done, crown = dn[ui+"-3"], locked = unitLocked(c,ui);
    path += `<section><div class="unit" style="background:${col}"><div><small>${t("unit",ui+1)}</small><h2>${esc(unitTitle(c,ui))}</h2></div><div class="uside">${theoryOf(c.code,ui)?`<button class="ubook" data-a="theory" data-u="${ui}" aria-label="${esc(t("theoryFor",unitTitle(c,ui)))}">${I.book}<span>${t("theory")}</span></button>`:""}${crown?`<span class="ucrown" title="${esc(lvName(3))}">${I.crown}</span>`:`<span class="cnt">${unitDone(c.code,ui)}/${REQ}</span>`}${locked&&ui>0?`<button class="jump" data-a="jump" data-u="${ui}">${t("jumpHere")}</button>`:""}</div></div><div class="nodes ${nn&&nn[0]===ui&&nn[1]===0?"hascur":""}">`;
    for(let k=0;k<NODES_PER_UNIT;k++){
      const off = [0,-56,36,-20,50,-44][(ui*NODES_PER_UNIT+k)%6];
      const done = dn[ui+"-"+k], cur = nn && nn[0]===ui && nn[1]===k, master = k===3, open = isUnlocked(c,ui,k);
      const cls = done ? (master?"done master":"done") : cur ? "cur" : (master&&open) ? "open master" : "locked";
      const icon = master ? I.crownBig : done ? I.check : cur ? I.star : I.lock;
      const label = `${lvShort(k)}, ${lvName(k)}${done?t("nodeDone"):open?t("nodeOpen"):t("nodeLocked")}`;
      path += `<div class="nwrap" style="translate:${off}px 0"><button class="node ${cls}" style="--c:${col}" data-a="node" data-u="${ui}" data-k="${k}" aria-label="${esc(label)}">${cur?`<span class="bubble ${off>0?"side-l":"side-r"}">${t("start")}</span>`:""}${icon}</button><span class="ncap">${lvName(k)}</span></div>`;
    }
    path += `</div></section>`;
  });
  const {d,tot} = courseProgress(c);
  const nQ = c.units.reduce((n,u)=>n+u.qs.length,0), nG = c.units.reduce((n,u)=>n+(u.gen||[]).length,0);
  $app.innerHTML = `
  <div class="top"><div class="wrap">
    <button class="chip" data-a="pick" aria-label="${t("switchCourse")}"><span class="code">${esc(courseShort(c))}</span><span class="nm">${esc(courseName(c))}</span>${I.down}</button>
    <button class="stat fire ${st?"":"off"}" data-a="statinfo" data-k="streak" aria-label="${t("streakTitle")}: ${st}">${I.fire}${st}</button>
    <button class="stat crowns" data-a="statinfo" data-k="crowns" aria-label="${t("crownsTitle")}: ${crowns(c)}">${I.crown}${crowns(c)}</button>
    <button class="stat xp" data-a="statinfo" data-k="xp" aria-label="${t("xpTitle")}: ${S.xp}">${I.bolt}${S.xp}</button>
  </div></div>
  <main class="wrap">
    ${noticeHTML()}
    ${duInviteHTML()}
    ${layoutHTML("home")}
    ${examHomeActions(c) ? `<div class="actions">${examHomeActions(c)}</div>` : ""}
    ${preBarHTML(c)}
    ${path}
    ${layLinkHTML("home")}
    <p class="foot-note">${esc(t("foot1",courseName(c),nQ,nG))}<br>${d===tot?(crowns(c)===c.units.length?t("allCrowns"):t("allLevels")):esc(t("foot2",d,tot,crowns(c),c.units.length))}</p>
  </main>`;
}

// ---------- fagvelger ----------
function pickRowHTML(c){
  const {d,tot} = courseProgress(c);
  const col = c.group==="Forkurs" ? "var(--ok)" : ["var(--u0)","var(--u1)","var(--u2)","var(--gold-deep)"][COURSES.indexOf(c)%4];
  const eq = courseEq(c), need = knownCodes(preOf(c.code).need);
  return `<div class="fav-row"><button class="subj ${c.code===S.current?"sel":""}" data-a="choose" data-c="${c.code}">
    <span class="badge" style="background:${col}">${esc(courseShort(c))}</span>
    <span class="t"><b>${esc(courseName(c))}${c.isNew?`<span class="newtag">${t("newTag")}</span>`:""}</b>${eq?`<span>${esc(eq)}</span>`:""}${need.length?`<span class="pre">${esc(t("builtOn"))}: ${esc(need.map(k=>courseName(COURSE(k))).join(", "))}</span>`:""}</span>
    <span class="p">${d}/${tot}<div class="mini"><i style="width:${d/tot*100}%"></i></div></span></button>${favStarHTML(c.code)}</div>`;
}

function renderPick(){
  const order = S.pickMode==="order", groups = new Map(), SC = studyCourses(viewStudy());
  const add = (k,c) => { if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(c); };
  if(order){ SC.map((c,i)=>[courseStep(c.code)*1000 + (c.group==="Forkurs"?0:500) + i, c]).sort((a,b)=>a[0]-b[0]).forEach(([k,c])=>add("s"+Math.floor(k/1000),c)); }
  else { SC.filter(c=>c.group==="Forkurs").forEach(c=>add(c.group,c)); SC.filter(c=>c.group!=="Forkurs").forEach(c=>add(c.group,c)); }
  const decks = Object.keys(FAV_DRILL).filter(x => FAV_DRILL[x][4] === viewStudy());
  const favs = COURSES.filter(c=>isFav(c.code)); // favorittene øverst (står også i sin vanlige gruppe)
  let h = `<div class="sheet"><div class="wrap"><div class="sheet-h"><h1>${t("pickTitle")}</h1><button class="iconbtn" data-a="home" aria-label="${t("back")}">${I.x}</button></div>
    ${studyTabsHTML()}
    <div class="seg pickseg" role="radiogroup"><button role="radio" aria-checked="${!order}" class="${order?"":"on"}" data-a="pickmode" data-m="theme">${esc(t("pickTheme"))}</button><button role="radio" aria-checked="${order}" class="${order?"on":""}" data-a="pickmode" data-m="order">${esc(t("pickOrder"))}</button></div>
    ${order?`<p class="picknote">${esc(t("orderNote"))}</p>`:""}
    <p class="picknote favnote">${I_STAR_O}<span>${esc(t("favHint"))}</span></p>
    ${favs.length?`<div class="grp grp-fav">${I_STAR_F}${esc(t("favTitle"))}</div>${favs.map(pickRowHTML).join("")}`:""}
    ${decks.length?`<div class="grp">${esc(viewStudy()==="ing" ? t("favCore") : t("drTitleS"))}</div>`:""}${decks.map(x=>`<div class="fav-row"><button class="subj" data-a="drstart" data-t="${FAV_DRILL[x][2]}"><span class="badge core">${FAV_DRILL[x][3]}</span><span class="t"><b>${esc(srcName(x))}</b><span>${esc(t("favCoreSub"))}</span></span><span class="p">${esc(t("drCountN", drCounts(FAV_DRILL[x][2]).known, drCounts(FAV_DRILL[x][2]).total))}</span></button>${favStarHTML(x)}</div>`).join("")}`;
  groups.forEach((list,g)=>{
    h += `<div class="grp">${esc(order ? t("stepN", +g.slice(1)) : groupName(g))}</div>`;
    list.forEach(c=>{ h += pickRowHTML(c); });
  });
  h += `${studyMoreHTML()}</div></div>`;
  $app.innerHTML = h;
}

// ---------- innstillinger ----------
function acErr(e, sending){ const k = e && e.kind;
  const msg = t(k==="offline" ? "acErrOffline" : k==="rate" ? "acErrRate" : k==="badcode" ? "acBadCode" : sending ? "acErrSend" : "acError");
  return e && e.status && k!=="badcode" && k!=="rate" ? msg + " (" + e.status + (e.code ? " " + e.code : "") + ")" : msg; }
function renderSettings(){
  const goalOpts = [10,20,30,50], rem = S.reminder;
  $app.innerHTML = `<div class="sheet"><div class="wrap settings">
    <div class="sheet-h"><h1>${t("setTitle")}</h1><button class="iconbtn" data-a="profile" aria-label="${t("back")}">${I.x}</button></div>
    <div class="sgroup"><button class="srow set-av" data-a="avedit">${hasMeAv() ? meAvHTML(48) : `<span class="set-av0">${I.users}</span>`}<span class="lbl">${t(hasMeAv() ? "avEdit" : "avMake")}<span class="sub">${t("avSetSub")}</span></span>${I.chevron}</button></div>
    <div class="sgroup">
      <button class="srow" data-a="homecustom"><span class="lbl">${esc(t("layTitle"))}<span class="sub">${esc(t("laySetSub"))}</span></span>${I.chevron}</button>
      <button class="srow" data-a="studyopen"><span class="lbl">${esc(t("stSetting"))}<span class="sub">${esc(STUDY(S.study).ic + " " + studyName(STUDY(S.study)))}</span></span>${I.chevron}</button>
      <div class="srow"><span class="lbl">${t("setLang")}</span><div class="seg"><button class="${LANG==="nb"?"on":""}" data-a="setlang" data-l="nb">Norsk</button><button class="${LANG==="en"?"on":""}" data-a="setlang" data-l="en">English</button></div></div>
      <div class="srow"><span class="lbl">${t("setTheme")}</span><div class="seg">${["auto","light","dark"].map(k=>`<button class="${(S.theme||"auto")===k?"on":""}" data-a="settheme" data-m="${k}" aria-pressed="${(S.theme||"auto")===k}">${esc(t("theme_"+k))}</button>`).join("")}</div></div>
      <div class="srow"><span class="lbl">${t("setGoal")}<span class="sub">${t("setGoalUnit")}</span></span><div class="seg">${goalOpts.map(g=>`<button class="${(S.goal||10)===g?"on":""}" data-a="setgoal" data-g="${g}">${g}</button>`).join("")}</div></div>
      <button class="srow" data-a="dcsrcopen"><span class="lbl">${t("dcSrcSet")}<span class="sub">${esc(dcSrcLabel())}</span></span>${I.chevron}</button>
      <div class="srow"><span class="lbl">${t("setReminder")}<span class="sub">${esc(pushNote() || t(NATIVE ? "setReminderSubApp" : "setReminderSubWeb"))}</span></span><button class="tog ${rem.on&&(NATIVE||pushSupported())?"on":""}" data-a="remtoggle" role="switch" aria-checked="${!!(rem.on&&(NATIVE||pushSupported()))}" aria-label="${t("setReminder")}" ${NATIVE||pushSupported()?"":"disabled"}></button></div>
      ${rem.on&&(NATIVE||pushSupported())?`<div class="srow"><span class="lbl">${t("setReminderTime")}</span><input type="time" id="remtime" value="${esc(rem.time)}"></div>${NATIVE?"":`<button class="srow" data-a="pushtest"><span class="lbl">${t("pushTest")}<span class="sub">${t("pushTestSub")}</span></span>${I.chevron}</button>`}`:""}
      <div class="srow"><span class="lbl">${t("setSound")}</span><button class="tog ${S.sound!==false?"on":""}" data-a="sndtoggle" role="switch" aria-checked="${S.sound!==false}" aria-label="${t("setSound")}"></button></div>
      <div class="srow"><span class="lbl">${t("setHaptics")}</span><button class="tog ${S.haptics?"on":""}" data-a="haptoggle" role="switch" aria-checked="${!!S.haptics}" aria-label="${t("setHaptics")}"></button></div>
    </div>
    ${CLOUD_ON ? (AUTH ? `<div class="sgroup">
      <div class="srow"><span class="lbl">${esc(AUTH.email||"")}<span class="sub">${esc(cloudStatusText())}</span></span></div>
      <button class="srow" data-a="acemail"><span class="lbl">${t("acEmailChange")}${AUTH.newEmail ? `<span class="sub">${esc(t("acEmailPending", AUTH.newEmail))}</span>` : ""}</span>${I.chevron}</button>
      <button class="srow" data-a="acsync"><span class="lbl">${t("acSyncNow")}</span>${I.chevron}</button>
      <button class="srow" data-a="aclogout"><span class="lbl">${t("acLogout")}</span></button>
      <button class="srow danger" data-a="acdelete"><span class="lbl">${t("acDelete")}</span></button>
    </div>` : `<div class="sgroup">
      <button class="srow" data-a="aclogin"><span class="lbl">${t("acLogin")}<span class="sub">${t("acLoginSub")}</span></span>${I.chevron}</button>
    </div>`) : ""}
    <div class="sgroup">
      <button class="srow" data-a="backup"><span class="lbl">${t("bkMake")}<span class="sub">${t("bkMakeSub")}</span></span>${I.chevron}</button>
      <button class="srow" data-a="restore"><span class="lbl">${t("bkLoad")}<span class="sub">${t("bkLoadSub")}</span></span>${I.chevron}</button>
    </div>
    <div class="sgroup">
      <button class="srow" data-a="feedback"><span class="lbl">${t("setFeedback")}</span>${I.chevron}</button>
      ${CLOUD_ON && AUTH ? `<button class="srow" data-a="frblocks"><span class="lbl">${t("blockList")}<span class="sub">${t("blockListSub")}</span></span>${I.chevron}</button>` : ""}
      <a class="srow" href="mailto:${esc(CONFIG.contactEmail)}?subject=${encodeURIComponent("Axle: rapport om misbruk")}"><span class="lbl">${t("abuseContact")}<span class="sub">${esc(CONFIG.contactEmail)}</span></span>${I.chevron}</a>
      <button class="srow" data-a="privacy"><span class="lbl">${t("setPrivacy")}</span>${I.chevron}</button>
      ${claudeDb&&isOwner?`<button class="srow" data-a="inbox"><span class="lbl">${t("setInbox","…")}</span>${I.chevron}</button>`:""}
    </div>
    <div class="sgroup"><div class="stext"><p><b>${esc(T(CONFIG.appName.nb,CONFIG.appName.en))}</b></p><p>${esc(t("about",CONFIG.appVersion))}</p></div></div>
    <div class="sgroup"><button class="srow danger" data-a="reset"><span class="lbl">${t("setReset")}</span></button></div>
  </div></div>`;
  const tm = document.getElementById("remtime");
  if(tm) tm.addEventListener("change", async ()=>{ S.reminder.time = tm.value || "19:00"; save(); if(NATIVE){ if(await scheduleReminder()) toast(t("reminderOn", S.reminder.time)); } else { await pushResync(true); toast(t("reminderOn", S.reminder.time)); } });
}
async function scheduleReminder(){
  const LN = PL.LocalNotifications; if(!LN) return false;
  try{ await LN.cancel({ notifications:[{id:1}] }); }catch(e){}
  if(!S.reminder.on) return true;
  try{
    let p = await LN.checkPermissions(); if(p.display!=="granted") p = await LN.requestPermissions();
    if(p.display!=="granted"){ S.reminder.on=false; save(); toast(t("reminderDenied")); render(); return false; }
    const [h,m] = S.reminder.time.split(":").map(Number);
    await LN.schedule({ notifications:[{ id:1, title:t("reminderTitle"), body:t("reminderBody"), schedule:{ on:{hour:h, minute:m}, allowWhileIdle:true } }] });
    return true;
  }catch(e){ return false; }
}

// ---------- leksjon: bygging ----------
function makeItem(q, id){
  const [prompt, ans, expl] = q;
  if(Array.isArray(ans)){ const opts = shuffle(ans.map((x,i)=>({t:x, ok:i===0}))); return { id, type:"mc", prompt, opts, expl }; }
  return { id, type:"num", prompt, n:ans.n, tol:ans.tol ?? Math.abs(ans.n)*0.01, u:ans.u||"", expl };
}
function fmtAns(x){ const a=Math.abs(x); const d = a===0?0 : a>=1000?0 : a>=100?1 : a>=10?2 : a>=1?3 : 4; return nf(x,d); }
function toMC(it){
  const f = x => fmtAns(x)+(it.u?" "+it.u:""), n = Math.abs(it.n)<1e-9 ? 0 : it.n;
  const groups = (it.tol===0 && Number.isInteger(n)) ? [[n+1,n-1],[n+2,n-2,n*2],[-n,n+3,n*10]] : [[n*1.25,n*0.8,n*1.5,n*0.5],[n*10,n/10,n*100],[n*2,-n,n/2,n*Math.PI]];
  const seen = new Set([f(n)]), opts = [{t:f(n), ok:true}];
  for(const g of groups){ for(const x of shuffle(g)){ const s=f(x); if(Number.isFinite(x) && !seen.has(s)){ seen.add(s); opts.push({t:s, ok:false}); break; } } }
  let k=2; while(opts.length<4 && k<60){ const s=f(n===0?k:n*(1+0.1*k)); if(!seen.has(s)){ seen.add(s); opts.push({t:s, ok:false}); } k++; }
  return { id:it.id, type:"mc", prompt:it.prompt, opts:shuffle(opts), expl:it.expl };
}
// id-er: "u.i" = fast oppgave nr. i, "u.gj" = generator nr. j (nye tall hver gang)
function rawQ(c, id){
  const [u, rest] = id.split("."); const unit = c.units[+u]; if(!unit) return null;
  if(rest.startsWith("g")){ const g = (unit.gen||[])[+rest.slice(1)]; if(!g) return null; const q = g();
    if(LANG==="en" && q && q[1] && !Array.isArray(q[1]) && UNIT_EN[q[1].u] !== undefined) q[1] = { ...q[1], u: UNIT_EN[q[1].u] };
    return q; }
  let q = unit.qs[+rest]; if(!q) return null;
  if(LANG==="en"){ const e = ENQ[c.code] && ENQ[c.code][+u] && ENQ[c.code][+u][+rest];
    if(e) q = [e[0], Array.isArray(q[1]) ? (e[1] || q[1]) : { ...q[1], u: (UNIT_EN[q[1].u] ?? q[1].u) }, e[2]]; }
  return q;
}
function itemFromId(c, id, opt={}){
  const q = rawQ(c, id); if(!q) return null;
  const it = makeItem(q, id);
  if(it.type==="num" && opt.mc) return toMC(it);
  if(it.type==="num" && opt.strict) it.tol = it.tol/2;
  return it;
}
function poolIds(c, units){
  const P = {mc:[], num:[], gen:[]};
  units.forEach(u=>{ const unit=c.units[u]; unit.qs.forEach((q,i)=>(Array.isArray(q[1])?P.mc:P.num).push(u+"."+i)); (unit.gen||[]).forEach((_,j)=>P.gen.push(u+".g"+j)); });
  return P;
}
function pick(ids, from, n){ for(const id of shuffle(from)){ if(ids.length>=n) break; if(!ids.includes(id)) ids.push(id); } }
function buildIds(c, u, k){
  const n = LEVELS[k].n, here = poolIds(c,[u]), ids = [];
  if(k===0){ pick(ids, here.mc, 3); pick(ids, here.gen, n); pick(ids, here.mc.concat(here.num), n); }
  else if(k===1){ pick(ids, here.gen, 3); pick(ids, here.mc.concat(here.num), n); pick(ids, here.gen, n); }
  else if(k===2){ const prev = poolIds(c, range(u)); pick(ids, prev.gen.concat(prev.num), 2); pick(ids, here.gen, ids.length+4); pick(ids, here.num, n); pick(ids, here.mc, n); pick(ids, here.gen, n); }
  else { const all = poolIds(c, range(u+1)); pick(ids, all.gen, 6); pick(ids, all.num.concat(all.mc), n); pick(ids, all.gen, n); }
  const g = here.gen; let j = 0; while(ids.length < n && g.length) ids.push(g[j++ % g.length]);
  return shuffle(ids);
}
function startLesson(kind, code, items, meta={}, hearts=0){
  L = { kind, code, meta, queue: items, total: items.length, solved: new Set(), firstWrong: new Set(), seen: new Set(),
        combo:0, answered:false, sel:null, input:"", start:Date.now(), hearts, maxHearts:hearts, done:0, scratch:null };
  screen = "lesson"; render(); window.scrollTo(0,0);
}
function startUnitLesson(code, u, k){
  const c = COURSE(code), opt = {mc:k===0, strict:k>=2};
  startLesson("unit", code, buildIds(c,u,k).map(id=>itemFromId(c,id,opt)).filter(Boolean), {u,k}, LEVELS[k].hearts||0);
}
function startJump(code, u){
  const c = COURSE(code), all = poolIds(c, range(u)), ids = [];
  pick(ids, all.gen, 6); pick(ids, all.num.concat(all.mc), 10); pick(ids, all.gen, 10);
  let j = 0; while(ids.length < 10 && all.gen.length) ids.push(all.gen[j++ % all.gen.length]);
  startLesson("jump", code, shuffle(ids).map(id=>itemFromId(c,id,{strict:true})).filter(Boolean), {u}, 3);
}
function startReview(code){
  const c = COURSE(code); const ids = shuffle(sub(code).wrong).slice(0, 5);
  const items = ids.map(id=>itemFromId(c,id)).filter(Boolean);
  if(!items.length){ sub(code).wrong = []; save(); render(); return; }
  startLesson("review", code, items);
}
function parseNum(raw){
  raw = String(raw).trim().replace(/\s/g,"").replace(",",".").replace(/−/g,"-");
  if(!raw) return NaN;
  const m = raw.match(/^(-?[\d.]+(?:e-?\d+)?)\/(-?[\d.]+)$/i);
  return m ? parseFloat(m[1])/parseFloat(m[2]) : Number(raw);
}
function checkAnswer(){
  const it = L.queue[0]; let ok;
  if(it.type==="mc"){ if(L.sel==null) return; ok = it.opts[L.sel].ok; }
  else { if(!L.input.trim()) return; const v = parseNum(L.input); ok = Number.isFinite(v) && Math.abs(v - it.n) <= Math.max(it.tol, 1e-9); }
  L.answered = true; L.ok = ok; buzz(ok); L.tline = pickLine(t(ok ? "tchRight" : "tchWrong"));
  const firstTime = !L.seen.has(it.id); L.seen.add(it.id);
  if(ok){ L.solved.add(it.id); L.combo++; if(L.combo >= 3 && firstTime){ L.bonus = (L.bonus||0) + 1; L.bonusNow = true; } else L.bonusNow = false; }
  else { L.combo = 0; if(firstTime) L.firstWrong.add(it.id); if(L.maxHearts) L.hearts--; }
  render(); sfx(ok ? "ok" : "bad", L.combo);
  if(ok){ burst(document.querySelector(".opt.right, .num.right"), L.combo >= 3 ? 18 : 12); if(L.bonusNow) floatXP(document.querySelector(".combo-xp"), "+1 XP"); }
}
function nextQuestion(){
  const it = L.queue.shift(); L.scratch = null;
  if(L.maxHearts){
    L.done++; L.answered=false; L.sel=null; L.input="";
    if(L.hearts<=0){ screen="fail"; render(); return; }
    if(!L.queue.length) finishLesson(); else render();
    return;
  }
  if(!L.ok) L.queue.push(it.type==="mc" ? {...it, opts: shuffle(it.opts)} : {...it});
  L.answered=false; L.sel=null; L.input="";
  if(!L.queue.length) finishLesson(); else render();
}
// XP, dagsmål og rekke (brukes av leksjoner og eksamen). Kalleren lagrer.
function awardXP(gained){
  const td = dayKey(), y = dayKey(addDays(new Date(),-1)), before = streakNow(), goal = S.goal||10, had = S.daily[td]||0;
  if(S.streak.last !== td){ S.streak.count = (S.streak.last===y ? S.streak.count : 0) + 1; S.streak.last = td; }
  S.xp += gained; S.daily[td] = (S.daily[td]||0) + gained;
  const keys = Object.keys(S.daily).sort(); while(keys.length>60) delete S.daily[keys.shift()];
  return { streak: streakNow(), streakUp: streakNow()>before, goalHit: had < goal && had + gained >= goal };
}
function finishLesson(){
  const s = sub(L.code);
  const firstTry = L.total - L.firstWrong.size;
  const gained = L.kind==="community" ? ccXP(firstTry) : L.kind==="challenge" ? dcXP(firstTry, L.total) : (L.kind==="unit" ? LEVELS[L.meta.k].xp : L.kind==="jump" ? 20 : 10) + firstTry;
  const xpBefore = S.xp, lvBefore = levelInfo(S.xp).lv;
  const st = awardXP(gained + (L.bonus||0));
  if(L.kind==="unit") s.done[L.meta.u+"-"+L.meta.k] = true;
  if(L.kind==="jump") for(let uu=0; uu<L.meta.u; uu++) for(let k=0;k<REQ;k++) s.done[uu+"-"+k] = true;
  if(L.kind==="challenge"){ S.dc = { day: L.meta.day, right: firstTry, n: L.total }; bdgStat("challenges"); }
  if(L.kind==="drill" || L.kind==="challenge") drRecord(); // grunnbegreper i utfordringen teller også i terpinga
  noteNightLesson();
  const wrong = new Set(s.wrong);
  if(L.kind!=="challenge" && L.kind!=="drill" && L.kind!=="community") L.firstWrong.forEach(id=>wrong.add(id)); // utfordringen blander fag, feil der havner ikke i «Repeter feil»
  if(L.kind==="review") [...L.solved].forEach(id=>{ if(!L.firstWrong.has(id)) wrong.delete(id); });
  s.wrong = [...wrong];
  if(L.firstWrong.size === 0) bdgStat("flawless");
  if(L.kind === "review") bdgStat("reviews");
  const newBadges = checkBadges();
  checkUnlocks();
  save();
  L.result = { xpBefore, levelUp: levelInfo(S.xp).lv > lvBefore ? levelInfo(S.xp).lv : 0, streakMile: st.streakUp && STREAK_MILES.includes(st.streak) ? st.streak : 0, bonus: L.bonus||0, goalHit: st.goalHit, newBadges, gained: gained + (L.bonus||0), acc: Math.round(firstTry/L.total*100), secs: Math.round((Date.now()-L.start)/1000), streak: st.streak, streakUp: st.streakUp };
  screen = "done"; render();
}
function correctText(it){ return it.type==="mc" ? it.opts.find(o=>o.ok).t : it.type==="flip" ? it.answer : nf(it.n,3)+(it.u?" "+it.u:""); }
// Flashcard: personen snur kortet og sier selv om hen kunne det. Teller som riktig/feil akkurat som et vanlig svar.
function flipGrade(ok){
  const it = L.queue[0]; L.answered = true; L.ok = ok; buzz(ok);
  const firstTime = !L.seen.has(it.id); L.seen.add(it.id);
  if(ok){ L.solved.add(it.id); L.combo++; } else { L.combo = 0; if(firstTime) L.firstWrong.add(it.id); }
  sfx(ok ? "ok" : "bad", L.combo);
  L.flipShown = false; nextQuestion(); window.scrollTo(0,0);
}
function renderLesson(){
  const it = L.queue[0];
  const pct = (L.maxHearts ? (L.done + (L.answered?1:0)) : L.solved.size) / L.total * 100;
  const lvl = L.kind==="unit" ? `${lvShort(L.meta.k)} · ${lvName(L.meta.k)} · ` : L.kind==="jump" ? t("jumpTest")+" · " : L.kind==="review" ? t("review")+" · " : L.kind==="challenge" ? t("dcTitle")+" · " : L.kind==="drill" ? drTitle()+" · "+(it.drTag ? T(DR_TAGS[it.drTag][0], DR_TAGS[it.drTag][1])+" · " : "") : L.kind==="community" ? (L.meta.title||t("ccTitle"))+" · " : "";
  if(it.type==="flip"){ // flashcard
    const shown = !!L.flipShown;
    $app.innerHTML = `<div class="lesson"><div class="wrap lhead"><button class="iconbtn" data-a="quit" aria-label="${t("quitAria")}">${I.x}</button><div class="bar" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div><span class="combo">${L.combo>=2?L.combo+"×":""}</span><button class="iconbtn flag" data-a="report" aria-label="${t("report")}" title="${t("report")}">${I.flag}</button></div>
      <main class="wrap lbody"><p class="kicker">${esc(lvl)}${esc(t("flipKicker"))}</p>
        <button class="flipcard ${shown?"on":""}" data-a="flipshow" aria-label="${esc(t("flipShow"))}"><span class="fc-in"><span class="fc-front"><em class="fc-tag">${esc(t("flipQ"))}</em><span class="fc-txt">${rich(it.prompt)}</span><small>${esc(t("flipTap"))}</small></span><span class="fc-back"><em class="fc-tag">${esc(t("flipA"))}</em><b class="fc-txt">${rich(it.answer)}</b>${it.expl?`<span class="fc-ex">${rich(it.expl)}</span>`:""}</span></span></button></main>
      <div class="lfoot"><div class="wrap">${shown ? `<p class="fc-q">${esc(t("flipAsk"))}</p><div class="fc-btns"><button class="big ghost fc-no" data-a="flipno">${esc(t("flipNo"))}</button><button class="big fc-yes" data-a="flipyes">${esc(t("flipYes"))}</button></div>` : `<button class="big" data-a="flipshow">${esc(t("flipShow"))}</button>`}</div></div></div>`;
    return;
  }
  let body = `<div class="krow"><p class="kicker">${esc(lvl)}${it.type==="mc"?t("pickAnswer"):t("writeAnswer")}</p><button class="kbtn" data-a="scratch">${I.pencil}${t("scratch")}</button></div><div class="prompt">${rich(it.prompt)}</div>`;
  if(it.type==="mc"){
    body += `<div class="opts" role="radiogroup">` + it.opts.map((o,i)=>{
      let cls = L.sel===i ? "sel" : "";
      if(L.answered){ if(o.ok) cls="right"; else if(L.sel===i) cls="wrong"; }
      return `<button class="opt ${cls}" role="radio" aria-checked="${L.sel===i}" data-a="sel" data-i="${i}" ${L.answered?"disabled":""}><span class="k">${i+1}</span><span>${rich(o.t)}</span></button>`;
    }).join("") + `</div>`;
  } else {
    const cls = L.answered ? (L.ok?"right":"wrong") : "";
    body += `<label class="num ${cls}"><input id="numin" inputmode="decimal" autocomplete="off" placeholder="${t("answerPh")}" value="${esc(L.input)}" ${L.answered?"disabled":""} aria-label="${t("answerPh")}">${it.u?`<span class="u">${esc(it.u)}</span>`:""}</label><p class="hint">${t("numHint")}</p>`;
  }
  let foot;
  if(!L.answered){
    const can = it.type==="mc" ? L.sel!=null : L.input.trim()!=="";
    foot = `<div class="lfoot"><div class="wrap"><button class="big" data-a="check" ${can?"":"disabled"}>${t("check")}</button></div></div>`;
  } else {
    foot = `<div class="lfoot ${L.ok?"ok":"bad"} pop"><div class="wrap">
      <div class="fb-h ${L.ok&&L.combo>=3?"combo":""}">${L.ok?(L.combo>=3?`<span class="combo-fire">${I.fire}</span>`:I.okc):I.badc}${L.ok?(L.combo>=3?t("streakN",L.combo):t("correct")):t("notQuite")}${L.ok&&L.bonusNow?`<span class="combo-xp">+1 XP</span>`:""}</div>
      ${L.ok?"":`<div class="fb-a">${t("rightAnswer")} ${rich(correctText(it))}</div>`}
      ${L.tline && L.kind !== "exam" ? teacherBubble(L.code, esc(L.tline), 34, "tch-fb") : ""}
      ${it.expl?`<div class="fb-e">${rich(it.expl)}</div>`:""}
      ${L.ok || !theoryOf(L.code,+it.id.split(".")[0]) ? "" : `<button class="fb-th" data-a="thov">${I.book}${t("readTheory")}</button>`}
      ${L.ok?"":`<button class="fb-rep" data-a="report">${t("thinkWrong")} ${t("reportShort")}</button>`}
      <button class="big" data-a="next">${t("cont")}</button></div></div>`;
  }
  const side = L.maxHearts ? `<span class="hearts" aria-label="${t("livesLeft",L.hearts)}">${range(L.maxHearts).map(i=>i<L.hearts?I.heart:I.heartOff).join("")}</span>` : `<span class="combo">${L.combo>=2?L.combo+"×":""}</span>`;
  $app.innerHTML = `<div class="lesson"><div class="wrap lhead"><button class="iconbtn" data-a="quit" aria-label="${t("quitAria")}">${I.x}</button><div class="bar" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>${side}<button class="iconbtn flag" data-a="report" aria-label="${t("report")}" title="${t("report")}">${I.flag}</button></div>
    <main class="wrap lbody">${body}</main>${foot}</div>`;
  const inp = document.getElementById("numin");
  if(inp && !L.answered && !overlay){ inp.focus({preventScroll:true}); inp.setSelectionRange(inp.value.length, inp.value.length); }
}
function renderDone(){
  const r = L.result, m = Math.floor(r.secs/60), sec = r.secs%60, c = COURSE(L.code), u = L.meta && L.meta.u;
  const title = L.kind==="community" ? t("ccDoneTitle") : L.kind==="drill" ? t("drDoneTitle") : L.kind==="challenge" ? t("dcDoneTitle") : L.kind==="jump" ? t("doneJump") : (L.kind==="unit" && L.meta.k===3) ? t("doneCrown") : r.acc===100 ? t("doneFlawless") : L.kind==="review" ? t("doneReview") : t("doneLevel", lvShort(L.meta.k));
  const sub2 = L.kind==="drill" ? t("drDoneSub", L.total - L.firstWrong.size, L.total) : L.kind==="jump" ? t("jumpUnlocked", unitTitle(c,u)) : (L.kind==="unit" && L.meta.k===3) ? t("crownWon", unitTitle(c,u)) : null;
  $app.innerHTML = `<main class="wrap finish pop">
    ${r.goalHit ? goalCelebrateHTML(L.code, r) : teacherBubble(L.code, esc(pickLine(t(r.acc === 100 ? "tchFlawless" : r.acc >= 70 ? "tchDone" : "tchDoneLow"))), 64, "tch-done")}
    ${r.levelUp ? levelUpHTML(r.levelUp) : ""}
    ${r.streakMile ? streakMileHTML(r.streakMile) : ""}
    <h1>${esc(title)}</h1>
    ${sub2?`<p>${esc(sub2)}</p>`:""}
    <p>${r.streakUp?esc(t("streakLine",r.streak)):esc(courseName(c))}</p>
    <div class="tiles">
      <div class="tile t1"><small>${t("tileXp")}</small><b data-count="${r.gained}" data-pre="+">+${r.gained}</b></div>
      <div class="tile t2"><small>${t("tileFirst")}</small><b data-count="${r.acc}" data-suf="%">${r.acc}%</b></div>
      <div class="tile t3"><small>${t("tileTime")}</small><b>${m}:${pad(sec)}</b></div>
    </div>
    ${r.bonus ? `<p class="dx-bonus">${I.fire}${esc(t("comboBonus", r.bonus))}</p>` : ""}
    ${levelBarHTML(r.xpBefore ?? S.xp, S.xp)}
    ${r.newBadges && r.newBadges.length ? `<div class="dx-badges"><small>${esc(t("bdgNewTitle"))}</small><div>${r.newBadges.map(b => `<button class="dx-badge" data-a="badges">${badgeIcon(b, 54)}<b>${esc(bdgName(b))}</b></button>`).join("")}</div></div>` : ""}
    ${doneExtrasHTML(c, u, r)}
    <button class="big" data-a="home">${t("cont")}</button>
  </main>`;
  if(!r.animated){ r.animated = true; countUp(); if(r.levelUp && !r.goalHit) setTimeout(() => confetti("level"), 300); else if(!r.goalHit) setTimeout(() => sfx("complete"), 150); }
}
// «I dag»-kortet: læreren med neste steg, dagsmålet som ring og ukas dager.
function todayCardHTML(c, today, goal, week){
  const nx = nextNode(c), tc = teacherOf(c.code), pct = Math.min(1, today / goal), R = 22, L = 2 * Math.PI * R;
  const line = nx ? t(nx[1] === 0 && !(S.theorySeen||{})[c.code + ":" + nx[0]] ? "tchHomeTheory" : "tchHomeNext", unitTitle(c, nx[0]), lvShort(nx[1])) : t("tchHomeDone");
  return `<div class="todaycard"><div class="today-top">${avatarSVG(tc.av, 46, "tch-av")}
      <div class="today-msg"><b>${esc(tc.name)}</b><span>${esc(line)}</span></div>
      <button class="ring ${pct >= 1 ? "full" : ""}" data-a="statinfo" data-k="xp" aria-label="${esc(t("dailyGoal"))}: ${Math.min(today, goal)} / ${goal} XP">
        <svg width="58" height="58" viewBox="0 0 58 58"><circle cx="29" cy="29" r="${R}" class="ring-bg"/><circle cx="29" cy="29" r="${R}" class="ring-fg" stroke-dasharray="${(L * pct).toFixed(1)} ${L.toFixed(1)}" transform="rotate(-90 29 29)"/></svg>
        <span><b>${Math.min(today, goal)}</b><small>/${goal} XP</small></span></button></div>
    <button class="week" data-a="statinfo" data-k="streak" aria-label="${esc(t("streakTitle"))}">${week}</button></div>`;
}
// (eldre) Læreren i faget hilser på forsiden og peker på neste steg.
function homeTeacherHTML(c){
  const nx = nextNode(c), tc = teacherOf(c.code);
  const line = nx ? t(nx[1] === 0 && !(S.theorySeen||{})[c.code + ":" + nx[0]] ? "tchHomeTheory" : "tchHomeNext", unitTitle(c, nx[0]), lvShort(nx[1])) : t("tchHomeDone");
  return `<div class="tch tch-home">${avatarSVG(tc.av, 56, "tch-av")}<div class="tch-b"><b>${esc(tc.name)} <em>${esc(t("tchRole", T(tc.nb, tc.en)))}</em></b><span>${esc(line)}</span></div></div>`;
}
// Dagsmålet nådd: ring som fylles, hake, konfetti og en hyggelig kommentar fra læreren.
function goalCelebrateHTML(code, r){
  if(!r.celebrated){ r.celebrated = true; r.goalLine = pickLine(t("tchGoal")); setTimeout(confetti, 350); buzz(true); }
  const R = 46, Lc = (2 * Math.PI * R).toFixed(1);
  return `<div class="gc"><div class="gc-ring"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" class="ring-bg"/><circle cx="60" cy="60" r="${R}" class="gc-fg" style="--len:${Lc}" stroke-dasharray="${Lc}" transform="rotate(-90 60 60)"/></svg>
    <span class="gc-check">${I.checkS}</span></div><h2 class="gc-t">${esc(t("goalHitTitle"))}</h2><p class="gc-s">${esc(t("goalHitSub", S.goal || 10))}</p>
    ${teacherBubble(code, esc(r.goalLine), 60, "tch-done gc-tch")}</div>`;
}
function confetti(snd = "complete"){
  if(snd) sfx(snd);
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelector(".confetti")?.remove();
  const cols = ["#F2B51D", "#2B59C3", "#0F8A83", "#E86A92", "#7A4BC2", "#2E9E5B", "#F07A1A"], w = document.createElement("div"); w.className = "confetti"; w.setAttribute("aria-hidden", "true");
  w.innerHTML = Array.from({ length: 70 }, () => { const x = Math.random() * 100, d = Math.random() * 0.8, dur = 2.2 + Math.random() * 1.8, r = Math.random() * 720 - 360, s = 6 + Math.random() * 7, drift = Math.random() * 30 - 15;
    return `<i style="left:${x.toFixed(1)}%;width:${s.toFixed(1)}px;height:${(s * 0.45).toFixed(1)}px;background:${cols[Math.floor(Math.random() * cols.length)]};animation-delay:${d.toFixed(2)}s;animation-duration:${dur.toFixed(2)}s;--r:${r.toFixed(0)}deg;--dx:${drift.toFixed(0)}vw"></i>`; }).join("");
  document.body.appendChild(w); setTimeout(() => w.remove(), 5000);
}
// Etter leksjonen: dagsmål, feil som havner i «Repeter feil», og neste steg.
function doneExtrasHTML(c, u, r){
  const today = S.daily[dayKey()] || 0, goal = S.goal || 10, pct = Math.min(100, today / goal * 100);
  const wrongN = L.firstWrong.size, here = c.code === S.current, nx = here ? nextNode(c) : null;
  let h = r.goalHit ? "" : `<div class="dx-goal"><div class="goal-h"><b>${today >= goal ? t("goalReached") : t("dailyGoal")}</b><span>${Math.min(today, goal)} / ${goal} XP</span></div><div class="meter"><i style="width:${pct}%"></i></div></div>`;
  if(wrongN) h += `<p class="dx-wrong">${esc(t("dxWrong", wrongN))}</p>`;
  const btns = [];
  if(here && u != null && r.acc < 60 && theoryOf(c.code, u)) btns.push(`<button class="pill" data-a="theory" data-u="${u}">${I.book}${t("dxTheory")}</button>`);
  if(here && L.kind !== "review" && (sub(c.code).wrong || []).length) btns.push(`<button class="pill rev" data-a="review">${I.redo}${t("reviewBtn", sub(c.code).wrong.length)}</button>`);
  if(nx && L.kind !== "review") btns.push(`<button class="pill dx-next" data-a="node" data-u="${nx[0]}" data-k="${nx[1]}">${I.bolt}${esc(t("dxNext", lvShort(nx[1]), unitTitle(c, nx[0])))}</button>`);
  if(btns.length) h += `<div class="actions dx-acts">${btns.join("")}</div>`;
  return h + reminderPromptHTML();
}
function renderFail(){
  $app.innerHTML = `<main class="wrap finish pop">
    <h1 style="color:var(--bad)">${t("failTitle")}</h1>
    <p>${esc(t("failText", L.kind==="jump"?t("failJump"):t("failMaster"), L.maxHearts, L.done, L.total))}</p>
    <p>${t("failHint")}</p>
    <button class="big" data-a="retry">${t("retry")}</button>
    <button class="big ghost" data-a="home">${t("back")}</button>
  </main>`;
  if(!L.failSaved){ const s = sub(L.code), w = new Set(s.wrong); L.firstWrong.forEach(id=>w.add(id)); s.wrong=[...w]; L.failSaved = true; save(); }
}

// ---------- tilbakemelding ----------
// Kontekst for en feilrapport: et item + brukerens svar (tekst) + {course, level}. Uten argumenter: gjeldende leksjonsoppgave.
function reportContext(it, yours, meta){
  if(!it){
    if(screen!=="lesson" || !L || !L.queue[0]) return null;
    it = L.queue[0]; yours = it.type==="mc" ? (L.sel!=null ? it.opts[L.sel].t : "") : L.input;
    meta = { course: L.code, level: L.kind==="unit" ? L.meta.k+1 : L.kind };
  }
  const c = COURSE(meta.course);
  return { course:c.code, courseName:courseName(c), unit: it.id.split(".")[0], level: meta.level,
    qid: it.id, prompt: plain(it.prompt), correct: plain(correctText(it)), userAnswer: plain(yours||"") };
}
async function deliver(p){
  if(claudeDb){ await claudeDb.collection("feedback").add(p); return "sent"; }
  // Supabase (tilbakemelding.sql): lagres i databasen og vises i adminpanelet. Mangler funksjonen, prøves de gamle veiene.
  if(typeof CLOUD_ON !== "undefined" && CLOUD_ON && !FB_NO_DB){
    try{ const tok = AUTH ? await authToken().catch(() => null) : null; await sbFetch("/rest/v1/rpc/submit_feedback", { method: "POST", body: JSON.stringify({ p }) }, tok || undefined); return "sent"; }
    catch(e){ if(e && e.kind === "offline") throw e; if(e && /PGRST202|42883|404/.test(String(e.code || e.status || ""))) FB_NO_DB = true; else if(e && (e.kind === "rate" || e.msg === "rate")) throw e; }
  }
  if(!CONFIG.web3formsKey) return "nocfg";
  const lines = Object.entries(p).filter(([k,v])=>v!==""&&v!=null&&k!=="email").map(([k,v])=>`${k}: ${v}`).join("\n");
  const body = { access_key: CONFIG.web3formsKey, subject: `${CONFIG.appName.nb}: ${p.category}${p.course?" – "+p.course+" "+p.qid:""}`,
    from_name: CONFIG.appName.nb, message: lines, botcheck: "" };
  if(p.email) body.email = p.email;
  const r = await fetch("https://api.web3forms.com/submit", { method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(()=>({}));
  if(r.ok && j.success!==false) return "sent";
  throw new Error("send failed");
}
function mailtoFeedback(p){
  const subj = `${CONFIG.appName.nb}: ${p.category}${p.course?" – "+p.course+" "+p.qid:""}`;
  const body = Object.entries(p).filter(([k,v])=>v!==""&&v!=null&&k!=="email").map(([k,v])=>`${k}: ${v}`).join("\n");
  location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body.slice(0,1800))}`;
}
async function sendFeedback(p){
  try{ const r = await deliver(p); if(r==="sent"){ toast(t("sent")); return; }
    if(CONFIG.contactEmail && !window.claude){ mailtoFeedback(p); toast(t("openingMail")); return; }
    S.outbox.push(p); save(); toast(t("notConfigured")); }
  catch(e){ S.outbox.push(p); save(); toast(t("queued")); }
}
async function flushOutbox(){
  if(!S.outbox || !S.outbox.length) return;
  const rest = [];
  for(const p of S.outbox){ try{ const r = await deliver(p); if(r!=="sent") rest.push(p); }catch(e){ rest.push(p); } }
  if(rest.length !== S.outbox.length){ S.outbox = rest; save(); }
}
function openReport(kind, ctx){ overlay = { report: kind, cat: kind==="report" ? 0 : -1, ctx: kind==="report" ? (ctx || reportContext()) : null }; renderOverlay(); }

// ---------- kladdeark ----------
const INKS = ["--ink","--accent","--bad"];
// Vertsobjekt for kladdearket: leksjon (L) eller eksamen. item = oppgaven, scratchObj = objektet som eier .scratch,
// answered = svaret er låst, setAnswer = «Bruk som svar».
function scHost(){
  if(screen==="exam" && S.examRun) return examScHost();
  const none = () => {};
  if(screen==="snacks" && SN){ const c = SN.cards[SN.scCard] || SN.cards[0]; return { item: c.it || {}, scratchObj: c, answered: !!c.done, setAnswer: none }; }
  if(screen==="sprint" && SP) return { item: SP.it || {}, scratchObj: SP, answered: SP.answered != null, setAnswer: none };
  if(screen==="guided" && GD){ const c = GD.cards[GD.i]; return { item: c.it || {}, scratchObj: c, answered: !!c.done, setAnswer: none }; }
  return { item: L.queue[0], scratchObj: L, answered: L.answered, setAnswer: v => { L.input = v; } };
}
function scratchState(){
  const h = scHost().scratchObj;
  if(!h.scratch) h.scratch = { tab:"draw", strokes:[], hist:[], view:{s:1,x:0,y:0}, tool:"pen", color:0,
    calc:{ lines:[], vars:{}, ans:null, mode:"deg", recall:-1 } };
  return h.scratch;
}
let SCR = null; // kjøretidsobjekter for lerretet
// Hva som tegner: "auto" (finger til en penn er brukt, så bare penn), "pen" (bare penn, fingre flytter/zoomer) eller "touch" (alt tegner, ingen håndflatefilter).
const scMode = () => S.scInput === "pen" || S.scInput === "touch" ? S.scInput : "auto";
function scratchHTML(){
  const host = scHost(), st = scratchState(), it = host.item;
  const draw = `<div class="sc-tools">
      <button class="tbtn ${st.tool==="pen"?"on":""}" data-a="sctool" data-t="pen" aria-label="${t("scPen")}" title="${t("scPen")}">${I.pen}</button>
      <button class="tbtn ${st.tool==="eraser"?"on":""}" data-a="sctool" data-t="eraser" aria-label="${t("scEraser")}" title="${t("scEraser")}">${I.eraser}</button>
      ${INKS.map((v,i)=>`<button class="swatch ${st.color===i?"on":""}" data-a="sccolor" data-i="${i}" style="background:var(${v})" aria-label="${t("scPen")} ${i+1}"></button>`).join("")}
      <span class="sc-sep"></span>
      <button class="tbtn" data-a="scundo" aria-label="${t("scUndo")}" title="${t("scUndo")}">${I.undo}</button>
      <button class="tbtn" data-a="scclear" aria-label="${t("scClear")}" title="${t("scClear")}">${I.trash}</button>
      <span class="sc-sep"></span>
      <button class="tbtn" data-a="sczoom" data-f="0.8" aria-label="${t("scZoomOut")}" title="${t("scZoomOut")}">${I.zout}</button>
      <button class="tbtn" data-a="sczoom" data-f="1.25" aria-label="${t("scZoomIn")}" title="${t("scZoomIn")}">${I.zin}</button>
      <button class="tbtn" data-a="scfit" aria-label="${t("scFit")}" title="${t("scFit")}">${I.fit}</button>
      <span class="sc-sep"></span>
      <div class="sc-mode" role="radiogroup" aria-label="${esc(t("scInput"))}">${["auto","pen","touch"].map(m=>`<button role="radio" aria-checked="${scMode()===m}" class="${scMode()===m?"on":""}" data-a="scinput" data-m="${m}" title="${esc(t("scInTip_"+m))}">${esc(t("scIn_"+m))}</button>`).join("")}</div>
    </div><div class="sc-canvas"><canvas id="sccv"></canvas></div><p class="sc-tip">${t("scTip_"+scMode())}</p>`;
  const keys = ["√(","^","π","(",")","sin(","cos(","tan(","ln(","°","e"];
  const calc = `<div class="calc"><div class="calc-lines" id="calclines" aria-live="polite"></div>
      <div class="calc-keys">${keys.map(k=>`<button data-a="calckey" data-k="${esc(k)}">${esc(k.length>1?k.replace("(",""):k)}</button>`).join("")}<button class="mode" data-a="calcmode">${st.calc.mode==="deg"?"DEG":"RAD"}</button></div>
      <div class="calc-in"><input id="calcin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t("calcPh"))}" aria-label="${esc(t("scCalc"))}"><button data-a="calcgo" aria-label="=">=</button></div>
      ${it.type==="num"&&!host.answered?`<button class="big ghost" data-a="calcuse">${t("calcUse")}</button>`:""}</div>`;
  return `<div class="sc" role="dialog" aria-label="${t("scratch")}">
    <div class="wrap sc-top"><div class="sc-tabs"><button class="${st.tab==="draw"?"on":""}" data-a="sctab" data-t="draw">${t("scDraw")}</button><button class="${st.tab==="calc"?"on":""}" data-a="sctab" data-t="calc">${t("scCalc")}</button></div>
    <button class="iconbtn" data-a="scclose" aria-label="${t("scClose")}">${I.x}</button></div>
    <div class="wrap sc-q">${rich(it.prompt)}</div>
    <div class="sc-body">${st.tab==="draw"?draw:calc}</div></div>`;
}
function mountScratch(){
  const st = scratchState();
  if(st.tab==="draw") initCanvas(); else { renderCalcLines(); const inp=document.getElementById("calcin"); if(inp){ inp.focus(); inp.addEventListener("keydown", calcKey); } }
}
function initCanvas(){
  const cv = document.getElementById("sccv"); if(!cv) return;
  const st = scratchState(), ctx = cv.getContext("2d");
  SCR = { cv, ctx, ptrs:new Map(), cur:null, pinch:null, pan:null, erasing:false, pen:false, penId:null, tap2:null, base:null, dirty:true, raf:0, w:1, h:1, dpr:1 };
  const cs = getComputedStyle(document.documentElement);
  SCR.colors = INKS.map(v=>cs.getPropertyValue(v).trim()||"#222"); SCR.grid = cs.getPropertyValue("--line").trim()||"#ddd";
  const resize = () => { const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio||1; cv.width = Math.max(1,Math.round(r.width*dpr)); cv.height = Math.max(1,Math.round(r.height*dpr)); SCR.dpr=dpr; SCR.w=r.width; SCR.h=r.height; scDraw(); };
  if(window.ResizeObserver){ SCR.ro = new ResizeObserver(resize); SCR.ro.observe(cv); } resize();
  const pos = e => { const r = cv.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; };
  const toW = p => ({ x:(p.x-st.view.x)/st.view.s, y:(p.y-st.view.y)/st.view.s });
  const eraseAt = w => { const rad = 12/st.view.s; const hit=[]; st.strokes.forEach((s,i)=>{ if(s.pts.some(p=>Math.hypot(p.x-w.x,p.y-w.y)<rad)) hit.push(i); });
    if(hit.length){ const removed = hit.map(i=>({i, s:st.strokes[i]})); for(let k=hit.length-1;k>=0;k--) st.strokes.splice(hit[k],1); st.hist.push({erase:removed}); scDraw(); } };
  // Penn (Apple Pencil o.l.): trykkfølsom strek, og håndflaten ignoreres mens pennen er nede.
  // Finger: tegner til en penn er brukt, deretter flytter én finger arket. To fingre: zoom/flytt, et kort trykk med to fingre angrer.
  const isPalm = e => scMode()!=="touch" && e.pointerType==="touch" && (SCR.penId!=null || ((SCR.pen || scMode()==="pen") && (e.width>40 || e.height>40)));
  const touchesOf = () => [...SCR.ptrs.values()].filter(p=>p.type!=="pen");
  cv.addEventListener("pointerdown", e=>{
    const isPen = e.pointerType==="pen";
    if(isPen && scMode()!=="touch"){
      SCR.pen = true; SCR.penId = e.pointerId;
      for(const [id,p] of SCR.ptrs) if(p.type!=="pen") SCR.ptrs.delete(id); // hånd som landet før pennen
      if(SCR.cur && !SCR.cur.pr && SCR.cur.pts.length < 12 && st.strokes[st.strokes.length-1]===SCR.cur){ st.strokes.pop(); st.hist.pop(); SCR.cur = null; SCR.dirty = true; } // prikk fra hånda
      SCR.pinch = null; SCR.pan = null; SCR.tap2 = null;
    } else if(isPalm(e)) return;
    try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    SCR.ptrs.set(e.pointerId, {...pos(e), type:e.pointerType});
    const touches = touchesOf();
    if(!isPen && touches.length===2){ // to fingre: zoom og flytt
      if(SCR.cur){ if(SCR.cur.pts.length<4){ st.strokes.pop(); st.hist.pop(); } SCR.cur=null; }
      SCR.erasing=false; SCR.pan=null;
      const [a,b] = touches; SCR.pinch = { d0: Math.hypot(a.x-b.x,a.y-b.y)||1, m0:{x:(a.x+b.x)/2,y:(a.y+b.y)/2}, v0:{...st.view} };
      SCR.tap2 = { t0: Date.now(), moved: false }; scDraw();
      return;
    }
    if(!isPen && touches.length>2) return;
    const panOnly = (e.pointerType==="touch" && (scMode()==="pen" || (scMode()==="auto" && SCR.pen))) || e.button===1 || e.button===2;
    if(panOnly){ SCR.pan = { p0:pos(e), v0:{...st.view} }; return; }
    const w = toW(pos(e));
    if(st.tool==="eraser" || (isPen && ((e.buttons & 32) || e.button===5))){ SCR.erasing = true; eraseAt(w); return; } // viskeknapp på penn
    SCR.cur = { c:st.color, pts:[isPen ? {...w, p:e.pressure||0.5} : w], pr: isPen || undefined }; st.strokes.push(SCR.cur); st.hist.push({add:true}); scDraw(true);
  });
  cv.addEventListener("pointermove", e=>{
    if(!SCR.ptrs.has(e.pointerId)) return;
    SCR.ptrs.set(e.pointerId, {...pos(e), type:e.pointerType});
    if(SCR.pinch && e.pointerType!=="pen" && touchesOf().length>=2){
      const [a,b] = touchesOf(), P = SCR.pinch; const d = Math.hypot(a.x-b.x,a.y-b.y), m = {x:(a.x+b.x)/2,y:(a.y+b.y)/2};
      if(SCR.tap2 && (Math.abs(d-P.d0)>12 || Math.hypot(m.x-P.m0.x, m.y-P.m0.y)>12)) SCR.tap2.moved = true;
      const s = Math.min(8, Math.max(0.2, P.v0.s*d/P.d0)); const wx = (P.m0.x-P.v0.x)/P.v0.s, wy = (P.m0.y-P.v0.y)/P.v0.s;
      st.view = { s, x: m.x - wx*s, y: m.y - wy*s }; scDraw(); return;
    }
    if(SCR.pan){ const p = pos(e); st.view = { ...SCR.pan.v0, x: SCR.pan.v0.x + p.x - SCR.pan.p0.x, y: SCR.pan.v0.y + p.y - SCR.pan.p0.y }; scDraw(); return; }
    if(SCR.erasing){ eraseAt(toW(pos(e))); return; }
    if(SCR.cur){ const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (evs.length?evs:[e]).forEach(ev=>SCR.cur.pts.push(SCR.cur.pr ? {...toW(pos(ev)), p:ev.pressure||e.pressure||0.5} : toW(pos(ev)))); scDraw(true); }
  });
  const end = e => {
    if(!SCR.ptrs.has(e.pointerId)) return;
    SCR.ptrs.delete(e.pointerId);
    if(e.pointerId===SCR.penId) SCR.penId = null;
    if(touchesOf().length<2) SCR.pinch=null;
    if(SCR.tap2 && !touchesOf().length){ const tp = SCR.tap2; SCR.tap2 = null; if(!tp.moved && Date.now()-tp.t0 < 350 && e.type==="pointerup"){ scUndo(); buzz(true); } }
    if(!SCR.ptrs.size){ if(SCR.cur) SCR.dirty = true; SCR.cur=null; SCR.pan=null; SCR.erasing=false; scDraw(); }
  };
  cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
  cv.addEventListener("contextmenu", e=>e.preventDefault());
  cv.addEventListener("wheel", e=>{ e.preventDefault(); const p = pos(e);
    if(e.ctrlKey || e.metaKey){ scZoom(Math.exp(-e.deltaY*0.01), p); }
    else if(e.shiftKey){ st.view = {...st.view, x: st.view.x - e.deltaY}; scDraw(); }
    else { scZoom(Math.exp(-e.deltaY*0.0015), p); } }, {passive:false});
}
function scZoom(f, p){
  const st = scratchState(); if(!SCR) return; p = p || {x:SCR.w/2, y:SCR.h/2};
  const s = Math.min(8, Math.max(0.2, st.view.s*f)); const wx = (p.x-st.view.x)/st.view.s, wy = (p.y-st.view.y)/st.view.s;
  st.view = { s, x: p.x - wx*s, y: p.y - wy*s }; scDraw();
}
function scFit(){
  const st = scratchState(); if(!SCR) return;
  const pts = st.strokes.flatMap(s=>s.pts); if(!pts.length){ st.view={s:1,x:0,y:0}; scDraw(); return; }
  let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity; for(const p of pts){ x0=Math.min(x0,p.x); x1=Math.max(x1,p.x); y0=Math.min(y0,p.y); y1=Math.max(y1,p.y); }
  const s = Math.min(4, Math.max(0.2, Math.min((SCR.w-40)/Math.max(1,x1-x0), (SCR.h-40)/Math.max(1,y1-y0))));
  st.view = { s, x: SCR.w/2 - (x0+x1)/2*s, y: SCR.h/2 - (y0+y1)/2*s }; scDraw();
}
// Tegner kladden. Ferdige streker ligger i et mellomlager (SCR.base) som bare tegnes på nytt når noe endrer seg;
// under en pennestrek (live) tegnes bare lageret + streken som pågår, så det holder følge også med mye kladd.
function scStroke(ctx, s, v, colors){
  const P = s.pts, n = P.length, base = Math.max(1, 2.4*v.s), X = p => p.x*v.s+v.x, Y = p => p.y*v.s+v.y;
  ctx.strokeStyle = colors[s.c]||colors[0];
  if(n===1){ ctx.lineWidth = base*(s.pr ? 0.5+P[0].p : 1); ctx.beginPath(); ctx.moveTo(X(P[0]),Y(P[0])); ctx.lineTo(X(P[0])+0.1,Y(P[0])); ctx.stroke(); return; }
  if(s.pr){ // trykkfølsom: hvert stykke får sin egen tykkelse, med myke overganger via midtpunkter
    let mx = X(P[0]), my = Y(P[0]);
    for(let i=1;i<n;i++){
      const a = P[i-1], b = P[i], nx = i<n-1 ? (X(b)+X(P[i+1]))/2 : X(b), ny = i<n-1 ? (Y(b)+Y(P[i+1]))/2 : Y(b);
      ctx.lineWidth = base*(0.35 + 1.25*Math.min(1, ((a.p||0.5)+(b.p||0.5))/2)); ctx.beginPath(); ctx.moveTo(mx,my); ctx.quadraticCurveTo(X(b),Y(b),nx,ny); ctx.stroke(); mx = nx; my = ny;
    }
    return;
  }
  ctx.lineWidth = base; ctx.beginPath(); ctx.moveTo(X(P[0]),Y(P[0]));
  for(let i=1;i<n-1;i++) ctx.quadraticCurveTo(X(P[i]),Y(P[i]),(X(P[i])+X(P[i+1]))/2,(Y(P[i])+Y(P[i+1]))/2);
  ctx.lineTo(X(P[n-1]),Y(P[n-1])); ctx.stroke();
}
function scDraw(live){
  if(!SCR) return; if(!live) SCR.dirty = true; cancelAnimationFrame(SCR.raf);
  SCR.raf = requestAnimationFrame(()=>{
    if(!SCR) return;
    const st = scratchState(), {ctx, dpr, cv} = SCR, v = st.view, W = SCR.w, H = SCR.h;
    if(!SCR.base || SCR.base.width!==cv.width || SCR.base.height!==cv.height){ SCR.base = document.createElement("canvas"); SCR.base.width = cv.width; SCR.base.height = cv.height; SCR.dirty = true; }
    if(SCR.dirty){
      const b = SCR.base.getContext("2d"); b.setTransform(dpr,0,0,dpr,0,0); b.clearRect(0,0,W,H);
      const g = 24*v.s;
      if(g>6){ b.strokeStyle = SCR.grid; b.lineWidth = 1; b.beginPath();
        for(let x = ((v.x%g)+g)%g; x<W; x+=g){ b.moveTo(Math.round(x)+.5,0); b.lineTo(Math.round(x)+.5,H); }
        for(let y = ((v.y%g)+g)%g; y<H; y+=g){ b.moveTo(0,Math.round(y)+.5); b.lineTo(W,Math.round(y)+.5); }
        b.stroke(); }
      b.lineCap="round"; b.lineJoin="round";
      for(const s of st.strokes) if(s!==SCR.cur) scStroke(b, s, v, SCR.colors);
      SCR.dirty = false;
    }
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height); ctx.drawImage(SCR.base,0,0);
    if(SCR.cur){ ctx.setTransform(dpr,0,0,dpr,0,0); ctx.lineCap="round"; ctx.lineJoin="round"; scStroke(ctx, SCR.cur, v, SCR.colors); }
  });
}
function scUndo(){
  const st = scratchState(), h = st.hist.pop(); if(!h) return;
  if(h.add) st.strokes.pop(); else if(h.erase) h.erase.forEach(({i,s})=>st.strokes.splice(i,0,s)); else if(h.clear) st.strokes = h.clear;
  scDraw();
}
// Kalkulator: trygg uttrykksparser uten eval
const CALC_FN = { sin:1, cos:1, tan:1, asin:1, acos:1, atan:1, sinh:1, cosh:1, tanh:1, sqrt:1, cbrt:1, ln:1, log:1, log10:1, log2:1, exp:1, abs:1, round:1, floor:1, ceil:1 };
function calcEval(src, env){
  let s = String(src).replace(/−/g,"-").replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/π/g,"pi").replace(/\*\*/g,"^").replace(/(\d),(\d)/g,"$1.$2");
  let assign = null; const am = s.match(/^\s*([A-Za-z_]\w*)\s*=(?!=)\s*(.+)$/);
  if(am && !CALC_FN[am[1]] && !["pi","e","ans"].includes(am[1])){ assign = am[1]; s = am[2]; }
  const toks = []; const re = /\s*(?:(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_]\w*)|(\S))/y; let m;
  re.lastIndex = 0;
  while(re.lastIndex < s.length && (m = re.exec(s))){ if(m[1]) toks.push({t:"n", v:parseFloat(m[1])}); else if(m[2]) toks.push({t:"id", v:m[2]}); else if(m[3]) toks.push({t:"op", v:m[3]}); }
  let i = 0; const peek = () => toks[i], take = () => toks[i++];
  const isOp = v => toks[i] && toks[i].t==="op" && toks[i].v===v;
  const deg = env.mode==="deg", D = Math.PI/180;
  const fns = { sin:x=>Math.sin(deg?x*D:x), cos:x=>Math.cos(deg?x*D:x), tan:x=>Math.tan(deg?x*D:x),
    asin:x=>Math.asin(x)/(deg?D:1), acos:x=>Math.acos(x)/(deg?D:1), atan:x=>Math.atan(x)/(deg?D:1),
    sinh:Math.sinh, cosh:Math.cosh, tanh:Math.tanh, sqrt:Math.sqrt, cbrt:Math.cbrt, ln:Math.log, log:Math.log10, log10:Math.log10, log2:Math.log2, exp:Math.exp, abs:Math.abs, round:Math.round, floor:Math.floor, ceil:Math.ceil };
  const fact = n => { if(n<0 || n>170 || !Number.isInteger(n)) throw 0; let r=1; for(let k=2;k<=n;k++) r*=k; return r; };
  function expr(){ let v = term(); while(isOp("+")||isOp("-")){ const o = take().v; const r = term(); v = o==="+" ? v+r : v-r; } return v; }
  function startsPrimary(){ const p = peek(); return p && (p.t==="n" || p.t==="id" || (p.t==="op" && (p.v==="(" || p.v==="√"))); }
  function term(){ let v = unary(); for(;;){ if(isOp("*")||isOp("/")){ const o = take().v; const r = unary(); v = o==="*" ? v*r : v/r; } else if(startsPrimary()){ v = v*unary(); } else break; } return v; }
  function unary(){ if(isOp("-")){ take(); return -unary(); } if(isOp("+")){ take(); return unary(); } return power(); }
  function power(){ const b = postfix(); if(isOp("^")){ take(); return Math.pow(b, unary()); } return b; }
  function postfix(){ let v = primary(); for(;;){ if(isOp("!")){ take(); v = fact(v); } else if(isOp("°")){ take(); if(!deg) v = v*D; } else if(isOp("%")){ take(); v = v/100; } else break; } return v; }
  function primary(){
    const p = take(); if(!p) throw 0;
    if(p.t==="n") return p.v;
    if(p.t==="op" && p.v==="("){ const v = expr(); if(!isOp(")")) throw 0; take(); return v; }
    if(p.t==="op" && p.v==="√") return Math.sqrt(postfix());
    if(p.t==="id"){
      const n = p.v;
      if(CALC_FN[n]){ if(isOp("(")){ take(); const a = expr(); if(!isOp(")")) throw 0; take(); return fns[n](a); } return fns[n](power()); }
      if(n==="pi") return Math.PI; if(n==="e") return Math.E; if(n==="ans"){ if(env.ans==null) throw 0; return env.ans; }
      if(Object.prototype.hasOwnProperty.call(env.vars, n)) return env.vars[n];
    }
    throw 0;
  }
  if(!toks.length) throw 0;
  const v = expr(); if(i < toks.length) throw 0; if(!Number.isFinite(v)) throw 0;
  if(assign) env.vars[assign] = v;
  return { v, assign };
}
function fmtCalc(v){
  let s; const a = Math.abs(v);
  if(a!==0 && (a>=1e10 || a<1e-6)) s = v.toExponential(6).replace(/\.?0+e/,"e"); else s = String(parseFloat(v.toPrecision(10)));
  return (LANG==="en" ? s : s.replace(".",",")).replace("-","−");
}
function renderCalcLines(){
  const el = document.getElementById("calclines"); if(!el) return; const c = scratchState().calc;
  el.innerHTML = c.lines.length ? c.lines.map(l=>`<div class="ln"><span class="src">${esc(l.src)}</span>${l.err?`<span class="err">${esc(t("calcErr"))}</span>`:`<span class="out">${l.assign?esc(l.assign)+" = ":"= "}${esc(fmtCalc(l.v))}</span>`}</div>`).join("") : `<div class="empty">${esc(t("calcEmpty"))}</div>`;
  el.scrollTop = el.scrollHeight;
}
function calcRun(){
  const inp = document.getElementById("calcin"); if(!inp || !inp.value.trim()) return; const c = scratchState().calc;
  try{ const r = calcEval(inp.value, c); c.ans = r.v; c.lines.push({src:inp.value, v:r.v, assign:r.assign}); inp.value=""; }
  catch(e){ c.lines.push({src:inp.value, err:true}); }
  c.recall = -1; renderCalcLines(); inp.focus();
}
function calcKey(e){
  const inp = e.target, c = scratchState().calc;
  if(e.key==="Enter"){ e.preventDefault(); calcRun(); }
  else if(e.key==="ArrowUp"){ const src = c.lines.map(l=>l.src); if(!src.length) return; c.recall = c.recall<0 ? src.length-1 : Math.max(0,c.recall-1); inp.value = src[c.recall]; e.preventDefault(); }
  else if(e.key==="ArrowDown"){ const src = c.lines.map(l=>l.src); if(c.recall<0) return; c.recall++; inp.value = c.recall<src.length ? src[c.recall] : ""; if(c.recall>=src.length) c.recall=-1; e.preventDefault(); }
}

// ---------- overlays ----------
function renderOverlay(){
  document.querySelector(".scrim")?.remove(); document.querySelector(".sc")?.remove(); document.querySelector(".thsheet")?.remove();
  if(SCR){ if(SCR.ro) SCR.ro.disconnect(); cancelAnimationFrame(SCR.raf); } SCR = null;
  if(!overlay){ dcAfterOverlay(); return; }
  if(overlay.theory){ const w = document.createElement("div"); w.innerHTML = theorySheetHTML(overlay.theory); document.body.appendChild(w.firstElementChild); return; }
  if(overlay.scratch){ const w = document.createElement("div"); w.innerHTML = scratchHTML(); document.body.appendChild(w.firstElementChild); mountScratch(); return; }
  const d = document.createElement("div"); d.className = overlay==="dcpop" || overlay==="langpick" || overlay.crop || overlay.studypick ? "scrim center" : "scrim";
  if(overlay==="dcpop") d.innerHTML = dcPopupHTML();
  else if(overlay==="langpick") d.innerHTML = langPickHTML();
  else if(overlay.crop) d.innerHTML = cropHTML();
  else if(overlay.studypick) d.innerHTML = studyPickHTML(overlay.first);
  else if(overlay.games) d.innerHTML = gamesMenuHTML(overlay.games);
  else if(overlay.layout) d.innerHTML = layoutEditHTML(overlay.layout);
  else if(overlay.topics) d.innerHTML = topicPickHTML(overlay.topics);
  else if(overlay.bdgegg){ d.className = "scrim center"; d.innerHTML = eggPopHTML(); }
  else if(overlay.jump!=null){ const c=COURSE(S.current); d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("jumpHere")}"><h3>${esc(t("jumpTitle",unitTitle(c,overlay.jump)))}</h3><p>${t("jumpText")}</p><button class="big" data-a="jumpok">${t("startTest")}</button><button class="big ghost" data-a="closeov">${t("cancel")}</button></div>`; }
  else if(overlay==="quit") d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("quitTitle")}"><h3>${t("quitTitle")}</h3><p>${t("quitText")}</p><button class="big" data-a="stay">${t("keepGoing")}</button><button class="big ghost" data-a="quitok" style="color:var(--bad)">${t("quit")}</button></div>`;
  else if(overlay==="reset") d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("resetTitle")}"><h3>${t("resetTitle")}</h3><p>${t("resetText")}</p><button class="big" data-a="closeov">${t("cancel")}</button><button class="big ghost" data-a="resetok" style="color:var(--bad)">${t("reset")}</button></div>`;
  else if(overlay.login){ const o = overlay;
    d.innerHTML = o.step==="code"
      ? `<div class="dialog pop" role="dialog" aria-label="${t("acLogin")}"><h3>${t("acCodeTitle")}</h3><p>${esc(t("acCodeText", o.email))}</p>
        <input type="text" id="lgcode" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456" aria-label="${esc(t("acCodeTitle"))}">
        ${o.err?`<p class="lgerr">${esc(o.err)}</p>`:""}
        <button class="big" data-a="lgverify" ${o.busy?"disabled":""}>${t("acVerify")}</button><button class="big ghost" data-a="lgback" ${o.busy?"disabled":""}>${t("acOtherEmail")}</button><button class="big ghost" data-a="closeov">${t("cancel")}</button></div>`
      : o.intro ? `<div class="dialog pop lgintro" role="dialog" aria-label="${t("acIntroTitle")}"><div class="lgi-ic">${I.users}</div><h3>${t("acIntroTitle")}</h3>
        <ul class="lgi-list">${t("acIntroPts").map(p=>`<li>${I.checkS}<span>${esc(p)}</span></li>`).join("")}</ul><p>${t("acLoginText")}</p>
        <input type="email" id="lgmail" autocomplete="email" placeholder="${esc(t("acEmail"))}" aria-label="${esc(t("acEmail"))}" value="${esc(o.email||"")}">
        ${o.err?`<p class="lgerr">${esc(o.err)}</p>`:""}
        <button class="big" data-a="lgsend" ${o.busy?"disabled":""}>${t("acIntroGo")}</button><button class="big ghost" data-a="closeov">${t("acIntroLater")}</button>
        <p class="lgnote">${t("acPrivacyNote")}</p></div>`
      : `<div class="dialog pop" role="dialog" aria-label="${t("acLogin")}"><h3>${t("acLogin")}</h3><p>${t("acLoginText")}</p>
        <input type="email" id="lgmail" autocomplete="email" placeholder="${esc(t("acEmail"))}" aria-label="${esc(t("acEmail"))}" value="${esc(o.email||"")}">
        ${o.err?`<p class="lgerr">${esc(o.err)}</p>`:""}
        <button class="big" data-a="lgsend" ${o.busy?"disabled":""}>${t("acSend")}</button><button class="big ghost" data-a="closeov">${t("cancel")}</button>
        <p class="lgnote">${t("acPrivacyNote")}</p></div>`; }
  else if(overlay.frfof) d.innerHTML = frFofHTML();
  else if(overlay.acemail){ const o = overlay.acemail; d.innerHTML = o.step === "sent"
    ? `<div class="dialog pop" role="dialog" aria-label="${esc(t("acEmailChange"))}"><h3>${esc(t("acEmailSentTitle"))}</h3><p>${esc(t("acEmailSentText", o.email, AUTH ? AUTH.email : ""))}</p><button class="big" data-a="closeov">${esc(t("cont"))}</button></div>`
    : `<div class="dialog pop" role="dialog" aria-label="${esc(t("acEmailChange"))}"><h3>${esc(t("acEmailChange"))}</h3><p>${esc(t("acEmailText", AUTH ? AUTH.email : ""))}</p>
      <input type="email" id="acnewmail" autocomplete="email" placeholder="${esc(t("acEmailNew"))}" value="${esc(o.email||"")}">${o.err?`<p class="lgerr">${esc(o.err)}</p>`:""}
      <button class="big" data-a="acemailsend" ${o.busy?"disabled":""}>${esc(t("acEmailSend"))}</button><button class="big ghost" data-a="closeov">${esc(t("cancel"))}</button></div>`; }
  else if(overlay.grnew || overlay.grjoin || overlay.grmenu || overlay.grfriends || overlay.grset || overlay.gropen) d.innerHTML = grOverlayHTML();
  else if(overlay.frmod) d.innerHTML = frModHTML(overlay.frmod);
  else if(overlay.frrep) d.innerHTML = frReportHTML(overlay.frrep);
  else if("frblocks" in overlay) d.innerHTML = frBlocksHTML(overlay.frblocks);
  else if(overlay.dcsrc) d.innerHTML = dcSrcHTML();
  else if(overlay.ccimport) d.innerHTML = ccImportHTML();
  else if(overlay.stat) d.innerHTML = statSheetHTML(overlay.stat);
  else if(overlay.pre) d.innerHTML = `<div class="dialog pop pre-dlg" role="dialog">${preCardHTML(COURSE(S.current)) || `<p>${esc(t("preDone"))}</p>`}<p class="ss-note">${esc(t("preText"))}</p><button class="big" data-a="closeov">${esc(t("cont"))}</button></div>`;
  else if(overlay.pfname){ d.innerHTML = nameDialogHTML(); setTimeout(()=>{ const i=document.getElementById("pfnamein"); if(i){ i.focus(); i.addEventListener("keydown", e=>{ if(e.key==="Enter") document.querySelector('[data-a="pfnamesave"]')?.click(); }); } }, 0); }
  else if(overlay==="acdelete") d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("acDelTitle")}"><h3>${t("acDelTitle")}</h3><p>${t("acDelText")}</p><button class="big" data-a="closeov">${t("cancel")}</button><button class="big ghost" data-a="acdeleteok" style="color:var(--bad)">${t("acDelOk")}</button></div>`;
  else if(overlay.backup==="out") d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("bkMake")}"><h3>${t("bkMake")}</h3><p>${t("bkOutText")}</p>
      <textarea id="bkcode" readonly aria-label="${esc(t("bkMake"))}">${esc(overlay.code)}</textarea>
      <button class="big" data-a="bkcopy">${t("bkCopy")}</button>${NATIVE?(navigator.share?`<button class="big ghost" data-a="bkshare">${t("bkShare")}</button>`:""):`<button class="big ghost" data-a="bkfile">${t("bkFile")}</button>`}<button class="big ghost" data-a="closeov">${t("cont")}</button></div>`;
  else if(overlay.backup==="in") d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${t("bkLoad")}"><h3>${t("bkLoad")}</h3><p>${t("bkInText")}</p>
      <textarea id="bkin" placeholder="AXLE1:…" aria-label="${esc(t("bkLoad"))}"></textarea>
      <label class="big ghost bkpick">${t("bkPick")}<input type="file" id="bkfilein" accept=".txt,.json,text/plain,application/json" hidden></label>
      <button class="big" data-a="bkimport">${t("bkImport")}</button><button class="big ghost" data-a="closeov">${t("cancel")}</button></div>`;
  else if(overlay==="privacy") d.innerHTML = `<div class="dialog pop privacy" role="dialog" aria-label="${t("privacyTitle")}"><h3>${t("privacyTitle")}</h3>${PRIVACY[LANG]}<button class="big" data-a="closeov">${t("cont")}</button></div>`;
  else if(overlay.exam) d.innerHTML = examOverlayHTML();
  else if(overlay.fbtext){ d.innerHTML = `<div class="dialog pop" role="dialog"><h3>${esc(t("admFbCopy"))}</h3><textarea class="fbtext" readonly rows="12">${esc(overlay.fbtext)}</textarea><button class="big" data-a="closeov">${t("cont")}</button></div>`; const ta = d.querySelector("textarea"); if(ta){ ta.focus(); ta.select(); } }
  else if(overlay.inbox){ d.innerHTML = `<div class="dialog pop" role="dialog"><h3>${t("setInbox",overlay.items.length)}</h3><div class="inbox">${overlay.items.length?overlay.items.map(x=>`<div><b>${esc(x.category||"")}</b> · ${esc(x.course||"")} ${esc(x.qid||"")} · ${esc((x.time||"").slice(0,16))}<br>${esc(x.message||"")}${x.prompt?`<br><i>${esc(String(x.prompt).slice(0,160))}</i>`:""}</div>`).join(""):`<p>${t("inboxEmpty")}</p>`}</div><button class="big" data-a="closeov">${t("cont")}</button></div>`; }
  else if(overlay.report){
    const isRep = overlay.report==="report", ctx = overlay.ctx;
    d.innerHTML = `<div class="dialog pop" role="dialog" aria-label="${isRep?t("repTitle"):t("fbTitle")}"><h3>${isRep?t("repTitle"):t("fbTitle")}</h3>
      ${isRep?`<p>${t("repWhat")}</p><div class="chips">${t("repCats").map((c,i)=>`<button class="${overlay.cat===i?"on":""}" data-a="repcat" data-i="${i}">${esc(c)}</button>`).join("")}</div>`:""}
      ${ctx?`<div class="ctx">${esc(ctx.prompt.slice(0,220))}${ctx.userAnswer?`<br>${t("yourAnswer")}: ${esc(ctx.userAnswer)}`:""}</div>`:""}
      <textarea id="repmsg" placeholder="${esc(isRep?t("repMsg"):t("fbMsg"))}" aria-label="${esc(isRep?t("repMsg"):t("fbMsg"))}"></textarea>
      <input type="email" id="repmail" placeholder="${esc(t("repEmail"))}" aria-label="${esc(t("repEmail"))}" autocomplete="email">
      <button class="big" data-a="repsend">${t("send")}</button><button class="big ghost" data-a="closeov">${t("cancel")}</button></div>`;
  }
  document.body.appendChild(d);
  const lg = document.getElementById("lgcode") || document.getElementById("lgmail");
  if(lg){ lg.focus(); lg.addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); d.querySelector('[data-a="lgverify"],[data-a="lgsend"]')?.click(); } }); }
  const fi = document.getElementById("bkfilein");
  if(fi) fi.addEventListener("change", async ()=>{ const f = fi.files && fi.files[0]; if(!f) return; document.getElementById("bkin").value = await f.text(); });
}

// ---------- teori og forkunnskaper ----------
let TH = null; // {code, u, go:{u,k}|null}
function openTheory(code, u, go){ TH = { code, u, go }; (S.theorySeen ||= {})[code+":"+u] = 1; bdgToast(checkBadges()); save(); overlay = null; screen = "theory"; render(); window.scrollTo(0,0); }
function theoryBody(code, u, quiz){ const doc = theoryOf(code, u); if(!doc) return `<p>${esc(t("noTheory"))}</p>`; const src = withSims(code, u, withFigs(code, u, doc[LANG] || doc.nb));
  return tyKeyHTML(src) + richDoc(src) + (quiz ? cyHTML(code, u) : ""); }
function renderTheory(){
  if(!TH){ screen = "home"; renderHome(); return; }
  const c = COURSE(TH.code);
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="home" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="th-t"><small>${esc(courseName(c))} · ${esc(t("unit", TH.u+1))}</small><b>${esc(unitTitle(c, TH.u))}</b></div><span class="th-ic" aria-hidden="true">${I.book}</span></div></div>
    <main class="wrap theory">${teacherBubble(TH.code, esc(t("tchTheory", unitTitle(c, TH.u))), 52, "tch-th")}<button class="gd-cta" data-a="thguided">${I.steps}<span><b>${esc(t("gdCta"))}</b><small>${esc(t("gdCtaSub"))}</small></span>${I.chevron}</button>${pfTheoryHTML(TH.code, TH.u)}${theoryBody(TH.code, TH.u, true)}</main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="thstart">${esc(t(TH.go ? "thStartFirst" : "thStart"))}</button></div></div>`;
}
function theorySheetHTML(o){
  const c = COURSE(o.code);
  return `<div class="sc thsheet" role="dialog" aria-modal="true" aria-label="${esc(t("theoryFor", unitTitle(c, o.u)))}">
    <div class="wrap sc-top"><div class="th-t"><small>${esc(t("theory"))}</small><b>${esc(unitTitle(c, o.u))}</b></div><button class="iconbtn" data-a="closeov" aria-label="${esc(t("scClose"))}">${I.x}</button></div>
    <div class="thbody"><div class="wrap theory">${theoryBody(o.code, o.u)}</div></div></div>`;
}
function preReady(code){ const c = COURSES.find(x=>x.code===code); if(!c) return true; const {d,tot} = courseProgress(c); return tot>0 && d/tot >= 0.6; }
const knownCodes = list => (list||[]).filter(k => COURSES.some(x=>x.code===k));
function preCardHTML(c){
  const P = preOf(c.code), need = knownCodes(P.need);
  if(!need.length || (S.preHidden||{})[c.code] || need.every(preReady)) return "";
  const chips = need.map(k=>{ const cc = COURSE(k), {d,tot} = courseProgress(cc), ok = preReady(k);
    return `<button class="prechip ${ok?"ok":""}" data-a="choose" data-c="${esc(k)}" aria-label="${esc(courseName(cc)+": "+(ok?t("preDone"):Math.round(d/tot*100)+" %"))}"><span class="badge">${esc(courseShort(cc))}</span><span class="n">${esc(courseName(cc))}</span><span class="pc">${ok?"✓":Math.round(d/tot*100)+" %"}</span></button>`; }).join("");
  const nice = knownCodes(P.nice);
  return `<div class="precard"><div class="precard-h">${I.steps}<b>${esc(t("preTitle"))}</b><button class="exlink" data-a="prehide">${esc(t("preHide"))}</button></div>
    <div class="prechips">${chips}</div>${nice.length?`<p class="prenice">${esc(t("preNice", nice.map(k=>courseName(COURSE(k))).join(", ")))}</p>`:""}</div>`;
}
// ---------- render og hendelser ----------
// Dato som «26. sep. 2026» / «26 Sept 2026».
const fmtDate = x => { const d = new Date(typeof x === "string" && /^\d{4}-\d\d-\d\d$/.test(x) ? x + "T12:00:00" : x); return isNaN(d) ? "" : d.toLocaleDateString(LANG === "en" ? "en-GB" : "nb-NO", { day: "numeric", month: "short", year: "numeric" }); };
// «Medlem siden»: tidligste vi vet om – merker, dager med XP, eller kontoen i Supabase (settes i frLoad).
function sinceUpdate(extra){
  const c = [Date.now(), +S.since || Infinity, ...Object.values(S.badges || {}).map(Number), ...Object.keys(S.daily || {}).map(k => Date.parse(k + "T12:00:00")), extra ? Date.parse(extra) : Infinity].filter(Number.isFinite);
  const v = Math.min(...c); if(v !== S.since){ S.since = v; saveLocal(); }
}
// Tema: "auto" følger systemet, ellers tvinges lys eller mørk (data-theme i styles.css). theme-color følger med.
function applyTheme(){
  const th = S.theme === "dark" || S.theme === "light" ? S.theme : null, de = document.documentElement;
  if(th) de.setAttribute("data-theme", th); else de.removeAttribute("data-theme");
  const dark = th ? th === "dark" : !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0F151B" : "#2B59C3");
}
try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme); }catch(e){}
function render(){
  applyTheme();
  document.documentElement.lang = LANG==="en" ? "en" : "nb";
  document.title = T(CONFIG.appName.nb, CONFIG.appName.en);
  if(screen==="home") renderHome();
  else if(screen==="pick") renderPick();
  else if(screen==="settings") renderSettings();
  else if(screen==="lesson") renderLesson();
  else if(screen==="done") renderDone();
  else if(screen==="fail") renderFail();
  else if(screen==="theory") renderTheory();
  else if(screen==="guided") renderGuided();
  else if(screen==="proofs") renderProofs();
  else if(screen==="snacks") renderSnacks();
  else if(screen==="sprint") renderSprint();
  else if(screen==="match") renderMatch();
  else if(screen==="truefalse") renderTF();
  else if(screen==="duel") renderDuel();
  else if(screen==="local") renderLocal();
  else if(screen==="community") renderCommunity();
  else if(screen==="ccedit") renderCCEdit();
  else if(screen==="book") renderBook();
  else if(screen==="friends") renderFriends();
  else if(screen==="avatar") renderAvatarEditor();
  else if(screen==="badges") renderBadges();
  else if(screen==="person") renderPerson();
  else if(screen==="admin") renderAdmin();
  else if(screen==="profile") renderProfile();
  else if(screen==="practice") renderPractice();
  else if(screen==="examSetup") renderExamSetup();
  else if(screen==="exam") renderExam();
  else if(screen==="examResult") renderExamResult();
  else if(screen==="examReview") renderExamReview();
  renderTabbar();
  renderOverlay();
  routeSync(); // adressen følger skjermen (route.js)
  // valgt studie-fane skal alltid synes, også når fanene ikke får plass på en smal skjerm
  document.querySelectorAll(".study-tabs").forEach(r => { const b = r.querySelector(".on"); if(b && (b.offsetLeft + b.offsetWidth > r.scrollLeft + r.clientWidth || b.offsetLeft < r.scrollLeft)) r.scrollLeft = b.offsetLeft - 8; });
}
function goHome(){ stBrowse = false; screen="home"; L=null; overlay=null; render(); window.scrollTo(0,0); }
// Trykk utenfor en meny/dialog (på det mørke bakteppet) lukker den – bare når trykket både starter og slutter utenfor.
let scrimDown = false;
document.addEventListener("pointerdown", e=>{ scrimDown = !!(e.target.classList && e.target.classList.contains("scrim")); }, true);
function scrimClose(){
  if(!overlay || overlay==="langpick" || (overlay.studypick && overlay.first)) return; // språk og studie må velges første gang
  if(overlay.crop){ cropClose(); return; }
  if(overlay==="dcpop"){ overlay=null; renderOverlay(); toast(t("dcPopLaterToast")); return; }
  overlay=null; renderOverlay(); if(screen==="friends") render();
}
document.addEventListener("click", async e=>{
  if(e.target.classList && e.target.classList.contains("scrim")){ if(scrimDown) scrimClose(); scrimDown = false; return; }
  const b = e.target.closest("[data-a]"); if(!b) return;
  const a = b.dataset.a;
  if(examClick(a, b)) return; // eksamensmodus (handlinger som starter med "ex")
  if(guidedClick(a, b)) return; // steg for steg
  if(communityClick(a, b)) return; // fellesskapskurs
  if(a==="community"){ openCommunity(); return; }
  if(a==="home" && L && L.kind==="community" && (screen==="done" || screen==="fail")){ const back = CC.edit ? "ccedit" : "community"; L = null; screen = back; render(); window.scrollTo(0,0); return; }
  if(a==="quitok" && L && L.kind==="community"){ const back = CC.edit ? "ccedit" : "community"; overlay = null; L = null; screen = back; render(); window.scrollTo(0,0); return; }
  if(a==="report" && L && L.kind==="community"){ if(L.meta.cid && L.meta.cid !== "preview"){ overlay = { frrep: { kind: "course", id: null, target: L.meta.cid, reason: null } }; renderOverlay(); } else toast(t("ccPreviewNoReport")); return; }
  if(favClick(a, b)) return; // favoritter og kilder til dagens utfordring
  if(bookClick(a, b)) return; // teoriboka (handlinger som starter med "bk")
  if(grClick(a, b)) return; // grupper (handlinger som starter med "gr")
  if(studyClick(a, b)) return; // studier (studies.js)
  if(pfClick(a, b)) return; // bevis (proofs.js)
  if(snEntryClick(a) || snClick(a, b) || spClick(a, b) || gmClick(a, b) || gmMenuClick(a, b) || duClick(a, b)) return; // snacks og lynrunde (snacks.js)
  if(adminClick(a, b)) return; // adminpanel og kunngjøringer (admin.js)
  if(psClick(a, b)) return; // profilsiden til andre + hvilke merker du viser (person.js)
  if(friendsClick(a, b)) return; // venner (handlinger som starter med "fr")
  if(avatarClick(a, b)) return; // avatar-bygger (handlinger som starter med "av")
  if(profileClick(a, b)) return; // tab-meny, profil og infoark
  if(a==="pick"){ screen="pick"; render(); window.scrollTo(0,0); }
  else if(a==="home"){ goHome(); }
  else if(a==="settings"){ overlay=null; screen="settings"; render(); window.scrollTo(0,0); }
  else if(a==="dcstart"){ if(!dcDoneToday()) startChallenge(); }
  else if(a==="drstart"){ startDrill(b.dataset.t || "all"); }
  else if(a==="dcpopgo"){ buzz(true); overlay=null; renderOverlay(); if(!dcDoneToday()) startChallenge(); }
  else if(a==="dclater"){ overlay=null; renderOverlay(); toast(t("dcPopLaterToast")); }
  else if(a==="badges"){ screen="badges"; render(); window.scrollTo(0,0); }
  else if(a==="choose"){ S.current=b.dataset.c; save(); goHome(); }
  else if(a==="node"){ const c = COURSE(S.current), u=+b.dataset.u, k=+b.dataset.k;
    if(!isUnlocked(c,u,k)){ toast(k===3 ? t("lockedMaster") : t("lockedNode")); return; }
    if(k===0 && !sub(c.code).done[u+"-0"] && theoryOf(c.code,u) && !(S.theorySeen||{})[c.code+":"+u]){ gdOpen(c.code,u,{u,k}); return; }
    startUnitLesson(c.code,u,k); }
  else if(a==="theory"){ gdOpen(S.current, +b.dataset.u, null); }
  else if(a==="thguided"){ const th=TH; if(th) gdOpen(th.code, th.u, th.go); }
  else if(a==="thstart"){ const th=TH; if(!th) return; const c=COURSE(th.code); const nn=nextNode(c); let u=th.u, k=0;
    if(th.go) { u=th.go.u; k=th.go.k; } else if(nn && nn[0]===th.u) k=nn[1]; else if(sub(c.code).done[th.u+"-2"]) k=3;
    if(!isUnlocked(c,u,k)){ goHome(); toast(t("lockedNode")); return; } TH=null; startUnitLesson(c.code,u,k); }
  else if(a==="thov"){ const it=L&&L.queue[0]; if(!it) return; overlay={theory:{code:L.code,u:+it.id.split(".")[0]}}; renderOverlay(); }
  else if(a==="prehide"){ (S.preHidden ||= {})[S.current]=1; save(); render(); }
  else if(a==="pickmode"){ S.pickMode=b.dataset.m; save(); render(); }
  else if(a==="jump"){ overlay={jump:+b.dataset.u}; renderOverlay(); }
  else if(a==="jumpok"){ const u=overlay.jump; overlay=null; renderOverlay(); startJump(S.current,u); }
  else if(a==="retry"){ const m=L.meta, k=L.kind, code=L.code; if(k==="jump") startJump(code,m.u); else startUnitLesson(code,m.u,m.k); }
  else if(a==="review"){ startReview(S.current); }
  else if(a==="flipshow"){ if(L && !L.flipShown){ L.flipShown = true; render(); sfx("flip"); } }
  else if(a==="flipyes" || a==="flipno"){ if(L && L.flipShown) flipGrade(a==="flipyes"); }
  else if(a==="drmode"){ S.drMode = b.dataset.m === "flip" ? "flip" : "mc"; saveLocal(); render(); }
  else if(a==="sel"){ if(!L.answered){ L.sel=+b.dataset.i; render(); sfx("tap"); } }
  else if(a==="check"){ checkAnswer(); }
  else if(a==="next"){ nextQuestion(); window.scrollTo(0,0); }
  else if(a==="quit"){ overlay="quit"; renderOverlay(); }
  else if(a==="stay" || a==="closeov"){ overlay=null; renderOverlay(); if(screen==="friends") render(); } // Venner kan ha lastet ferdig mens dialogen var åpen
  else if(a==="quitok"){ goHome(); }
  else if(a==="reset"){ overlay="reset"; renderOverlay(); }
  else if(a==="backup"){ overlay = { backup:"out", code: bkEncode(backupSnapshot()) }; renderOverlay(); }
  else if(a==="restore"){ overlay = { backup:"in" }; renderOverlay(); }
  else if(a==="bkcopy"){ const ta = document.getElementById("bkcode"); ta.select(); (navigator.clipboard ? navigator.clipboard.writeText(overlay.code) : Promise.reject()).then(()=>toast(t("bkCopied")), ()=>{ try{ document.execCommand("copy"); toast(t("bkCopied")); }catch(e){} }); }
  else if(a==="bkfile") downloadBackup(overlay.code);
  else if(a==="bkshare") navigator.share({ title: backupFileName(), text: overlay.code }).catch(()=>{});
  else if(a==="bkimport"){ const v = document.getElementById("bkin").value; if(!v.trim()){ toast(t("bkEmpty")); return; }
    if(importBackup(v)){ LANG = S.lang || LANG; overlay = null; renderOverlay(); render(); toast(t("bkDone")); } else toast(t("bkBad")); }
  else if(a==="aclogin"){ overlay = { login:1, step:"email", email:"" }; renderOverlay(); }
  else if(a==="lgsend"){ const email = (document.getElementById("lgmail").value||"").trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ overlay.err = t("acBadEmail"); renderOverlay(); return; }
    overlay = { login:1, step:"email", email, busy:true }; renderOverlay();
    cloudSendCode(email).then(()=>{ if(overlay && overlay.login){ overlay = { login:1, step:"code", email }; renderOverlay(); } },
      e=>{ if(overlay && overlay.login){ overlay = { login:1, step:"email", email, err: acErr(e, true) }; renderOverlay(); } }); }
  else if(a==="lgverify"){ const code = (document.getElementById("lgcode").value||"").replace(/\D/g,""), email = overlay.email;
    if(code.length < 6){ overlay.err = t("acBadCode"); renderOverlay(); return; }
    overlay = { login:1, step:"code", email, busy:true }; renderOverlay();
    cloudVerify(email, code).then(()=>{ LANG = S.lang || LANG; S.acEver = 1; saveLocal(); overlay = null; renderOverlay(); render(); toast(t("acLoggedIn", email)); },
      e=>{ if(overlay && overlay.login){ overlay = { login:1, step:"code", email, err: acErr(e) }; renderOverlay(); } }); }
  else if(a==="lgback"){ overlay = { login:1, step:"email", email: overlay.email }; renderOverlay(); }
  else if(a==="acsync"){ cloudSync().then(()=>{ if(CLOUD.status==="ok") toast(t("acSyncedToast")); else if(CLOUD.status==="offline") toast(t("acOffline")); else if(CLOUD.status==="error") toast(t("acError")); }); }
  else if(a==="aclogout"){ clearTimeout(CLOUD.timer); cloudSync().finally(()=>cloudSignOut().then(()=>{ render(); toast(t("acLoggedOut")); })); }
  else if(a==="acdelete"){ overlay = "acdelete"; renderOverlay(); }
  else if(a==="acemail"){ overlay = { acemail: { step: "form", email: "" } }; renderOverlay(); setTimeout(()=>document.getElementById("acnewmail")?.focus(), 50); }
  else if(a==="acemailsend"){ const o = overlay.acemail, v = ((document.getElementById("acnewmail")||{}).value||"").trim().toLowerCase(); o.email = v;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ o.err = t("acEmailBad"); renderOverlay(); return; }
    if(AUTH && v === String(AUTH.email||"").toLowerCase()){ o.err = t("acEmailSame"); renderOverlay(); return; }
    o.busy = true; o.err = null; renderOverlay();
    cloudChangeEmail(v).then(()=>{ o.busy = false; o.step = "sent"; render(); }, e=>{ o.busy = false; o.err = /email_exists|already.*registered/i.test((e.code||"") + " " + (e.msg||"")) ? t("acEmailTaken") : acErr(e); renderOverlay(); }); }
  else if(a==="acdeleteok"){ cloudDeleteAccount().then(()=>{ overlay = null; renderOverlay(); render(); toast(t("acDeleted")); }, e=>{ toast(acErr(e)); }); }
  else if(a==="resetok"){ const keep={current:S.current, lang:S.lang, goal:S.goal, reminder:S.reminder, haptics:S.haptics, sound:S.sound, outbox:S.outbox, examPrefs:S.examPrefs}; S=Object.assign(blank(),keep); save(); clearTimeout(CLOUD.timer); cloudSync(true); examStopTicker(); EX.res=null; goHome(); toast(t("resetDone")); }
  // innstillinger
  else if(a==="setlang"){ LANG = b.dataset.l; S.lang = LANG; S.langSet = 1; save(); render(); if(S.reminder.on){ scheduleReminder(); pushResync(true); } }
  else if(a==="settheme"){ S.theme = b.dataset.m; save(); render(); }
  else if(a==="langpick"){ LANG = b.dataset.l; S.lang = LANG; S.langSet = 1; save(); overlay = null; renderOverlay(); render(); setTimeout(bootPrompts, 250); }
  else if(a==="setgoal"){ S.goal = +b.dataset.g; save(); render(); }
  else if(a==="sndtoggle"){ S.sound = S.sound === false; save(); render(); if(S.sound) sfx("ok", 3); }
  else if(a==="haptoggle"){ S.haptics = !S.haptics; save(); render(); if(S.haptics) buzz(true); }
  else if(a==="remtoggle"){ await reminderToggle(); }
  else if(a==="pushtest"){ pushTest(); }
  else if(a==="remask"){ S.remPromptAt = Date.now(); save(); await reminderToggle(); render(); }
  else if(a==="remasknot"){ S.remPromptAt = Date.now(); S.remPromptN = (+S.remPromptN || 0) + 1; if(S.remPromptN >= 2) S.remPromptOff = 1; save(); render(); }
  else if(a==="privacy"){ overlay="privacy"; renderOverlay(); }
  else if(a==="feedback"){ openReport("feedback"); }
  else if(a==="inbox"){ let items=[]; try{ const snap = await claudeDb.collection("feedback").orderBy("time","desc").limit(100).get(); items = snap.docs.map(d=>d.data()); }catch(err){} overlay={inbox:true, items}; renderOverlay(); }
  // rapport
  else if(a==="report"){ openReport("report"); }
  else if(a==="repcat"){ overlay.cat = +b.dataset.i; document.querySelectorAll('[data-a="repcat"]').forEach(x=>x.classList.toggle("on", +x.dataset.i===overlay.cat)); }
  else if(a==="repsend"){
    const msg = (document.getElementById("repmsg")||{}).value||"", mail = ((document.getElementById("repmail")||{}).value||"").trim();
    const isRep = overlay.report==="report";
    if(!isRep && !msg.trim()){ toast(t("needText")); return; }
    const p = { kind: overlay.report, category: isRep ? UI.nb.repCats[overlay.cat] : "Tilbakemelding", message: msg.trim(), email: mail,
      ...(overlay.ctx||{}), lang: LANG, version: CONFIG.appVersion, platform: PLATFORM, time: new Date().toISOString() };
    overlay = null; renderOverlay(); sendFeedback(p);
  }
  // kladd
  else if(a==="scratch"){ if(SN && b.dataset.c != null) SN.scCard = +b.dataset.c; overlay={scratch:true}; renderOverlay(); }
  else if(a==="scclose"){ overlay=null; renderOverlay(); if(screen==="lesson"||screen==="exam") render(); }
  else if(a==="scinput"){ S.scInput = b.dataset.m; save(); renderOverlay(); toast(t("scInTip_"+scMode())); }
  else if(a==="sctab"){ scratchState().tab = b.dataset.t; renderOverlay(); }
  else if(a==="sctool"){ scratchState().tool = b.dataset.t; document.querySelectorAll('[data-a="sctool"]').forEach(x=>x.classList.toggle("on", x.dataset.t===b.dataset.t)); }
  else if(a==="sccolor"){ const st=scratchState(); st.color = +b.dataset.i; st.tool="pen"; document.querySelectorAll('[data-a="sccolor"]').forEach(x=>x.classList.toggle("on", +x.dataset.i===st.color)); document.querySelectorAll('[data-a="sctool"]').forEach(x=>x.classList.toggle("on", x.dataset.t==="pen")); }
  else if(a==="scundo"){ scUndo(); }
  else if(a==="scclear"){ const st=scratchState(); if(st.strokes.length){ st.hist.push({clear:st.strokes}); st.strokes=[]; scDraw(); } }
  else if(a==="sczoom"){ scZoom(+b.dataset.f); }
  else if(a==="scfit"){ scFit(); }
  else if(a==="calckey"){ const inp=document.getElementById("calcin"); if(inp){ const k=b.dataset.k, s=inp.selectionStart??inp.value.length, en=inp.selectionEnd??s; inp.value = inp.value.slice(0,s)+k+inp.value.slice(en); inp.focus(); inp.setSelectionRange(s+k.length, s+k.length); } }
  else if(a==="calcmode"){ const c=scratchState().calc; c.mode = c.mode==="deg"?"rad":"deg"; b.textContent = c.mode==="deg"?"DEG":"RAD"; }
  else if(a==="calcgo"){ calcRun(); }
  else if(a==="calcuse"){ const c=scratchState().calc; const inp=document.getElementById("calcin"); if(inp && inp.value.trim()) calcRun(); if(c.ans!=null){ scHost().setAnswer(fmtCalc(c.ans).replace("−","-")); overlay=null; renderOverlay(); render(); toast(t("calcUsed")); } }
});
document.addEventListener("input", e=>{
  if(e.target.id==="numin" && L && !L.answered){
    const had = L.input.trim()!==""; L.input = e.target.value;
    if(had !== (L.input.trim()!=="")){ const btn=document.querySelector('[data-a="check"]'); if(btn) btn.disabled = L.input.trim()===""; }
  }
  else if(e.target.id==="exnum" || e.target.id==="excustom") examInput(e.target);
});
document.addEventListener("keydown", e=>{
  if(overlay){ if(e.key==="Escape"){ const wasScratch = !!overlay.scratch; overlay=null; renderOverlay(); if(wasScratch && (screen==="lesson"||screen==="exam")) render(); } return; }
  if(screen==="exam"){ examKey(e); return; }
  if(screen!=="lesson"){ if((screen==="done"||screen==="fail") && e.key==="Enter"){ goHome(); } else if(screen==="theory" && e.key==="Escape"){ goHome(); } return; }
  if(e.key==="Enter"){ e.preventDefault(); L.answered ? nextQuestion() : checkAnswer(); }
  else if(!L.answered && L.queue[0].type==="mc" && /^[1-6]$/.test(e.key)){ const i=+e.key-1; if(i<L.queue[0].opts.length){ L.sel=i; render(); } }
});

examBoot(true); // pågående eksamen: fortsett, eller lever hvis tiden gikk ut mens appen var lukket
sinceUpdate();
routeBoot(); // #/teori/FAST/2 osv.: fortsett der man var før oppdatering
if(frBootLink()) screen = "friends";
if(grBootLink()) screen = "friends"; // axle.no/?gruppe=KODE
(function langLink(){ // ?lang=en er allerede brukt (i18n.js); fjern det fra adressen
  if(!LANG_URL) return; try{ const q = new URLSearchParams(location.search); q.delete("lang"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }catch(e){}
})();
(function fagLink(){ // axle.no/?fag=KODE fra de åpne fagsidene: velg faget
  let code = null; try{ code = new URLSearchParams(location.search).get("fag"); }catch(e){}
  if(!code) return;
  if(COURSES.some(c => c.code === code)){ S.current = code; if(!S.studySet){ S.study = studyOf(COURSE(code)); S.studySet = 1; } saveLocal(); } // faget avgjør studiet første gang
  try{ const q = new URLSearchParams(location.search); q.delete("fag"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }catch(e){}
})();
if(window.STUDY_URL && !S.studySet){ S.study = window.STUDY_URL; S.studySet = 1; if(!inStudy(COURSE(S.current), S.study)) S.current = STUDY(S.study).home; saveLocal(); } // axle.no/?studie=…
if(checkBadges().length) saveLocal(); // merker for fremgang fra før merkene fantes (uten varsel)
render();
AUTH_READY.then(()=>{ setTimeout(bootPrompts, 900); pushResync(); setTimeout(pioneerFetch, 1500); setTimeout(noticeFetch, 1200); }); // innlogging og dagens utfordring som popup ved første åpning i dag
flushOutbox();
window.addEventListener("online", flushOutbox);
cloudBoot();

// ---------- app (Capacitor) ----------
if(NATIVE){
  nativeLoad();
  if(PL.App) PL.App.addListener("backButton", ()=>{
    if(overlay){ const wasScratch = !!overlay.scratch; overlay=null; renderOverlay(); if(wasScratch && (screen==="lesson"||screen==="exam")) render(); }
    else if(screen==="lesson"){ overlay="quit"; renderOverlay(); }
    else if(screen==="exam"){ examFlush(); overlay={exam:"close"}; renderOverlay(); }
    else if(screen==="examReview"){ screen="examResult"; render(); window.scrollTo(0,0); }
    else if(screen==="book"){ bookBack(); }
    else if(screen!=="home"){ goHome(); }
    else PL.App.exitApp();
  });
  if(S.reminder.on) scheduleReminder();
}
// ---------- nettversjon: offline og installerbar ----------
if(!NATIVE && !window.claude && "serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(()=>{});
  // Ny versjon tatt i bruk: last siden på nytt når det ikke avbryter en leksjon eller eksamen.
  let swReloaded = false; const hadSW = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", ()=>{
    if(!hadSW || swReloaded) return;
    if(["home","pick","settings","book","friends","theory"].includes(screen) && !overlay){ swReloaded = true; location.reload(); }
  });
}
// ---------- valgfritt: Claude-artifact (synk og rapporter) ----------
(async ()=>{
  if(!window.claude || typeof window.claude.use!=="function") return;
  try{
    const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
    if(!db) return;
    claudeDb = db; isOwner = user ? await user.isOwner() : false;
    flushOutbox();
    if(screen==="settings") render();
    const uid = user ? await user.id() : null; if(!uid) return;
    const ref = db.doc("data/users/"+uid+"/progress");
    const snap = await ref.get(); remoteRef = ref;
    const r = snap.exists ? snap.data().state : null;
    if(r && r.v===1 && (r.updatedAt||0) > (S.updatedAt||0)){
      const outbox = S.outbox; S = Object.assign(blank(), JSON.parse(JSON.stringify(r)), {outbox}); LANG = S.lang || LANG; saveLocal();
      examBoot(false);
      if(screen==="home" || screen==="pick" || screen==="settings") render();
    } else if(S.updatedAt > ((r && r.updatedAt)||0)) pushRemote();
  }catch(e){ remoteRef = null; }
})();
