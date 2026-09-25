// ============================================================
//  KONTO OG SYNKRONISERING (Supabase) – valgfritt.
//  Innlogging med engangskode på e-post. Fremgangen lagres som én JSON-rad per bruker
//  (tabellen «progress», se supabase/oppsett.sql) og slås sammen med mergeState, så ingenting overskrives.
//  Uten nett eller uten konto virker appen som før.
// ============================================================
const AUTH_KEY = "axle.auth";
const CLOUD_ON = !!(CONFIG.supabaseUrl && CONFIG.supabaseKey) && !window.claude; // ikke i Claude-artifact
let AUTH = (()=>{ try{ const a = JSON.parse(localStorage.getItem(AUTH_KEY)); return a && a.rt ? a : null; }catch(e){ return null; } })();
const CLOUD = { status: "idle", at: 0, timer: null, chain: Promise.resolve(), refreshing: null };

function authStore(){ try{ if(AUTH) localStorage.setItem(AUTH_KEY, JSON.stringify(AUTH)); else localStorage.removeItem(AUTH_KEY); }catch(e){} if(PL.Preferences) PL.Preferences.set({ key: AUTH_KEY, value: AUTH ? JSON.stringify(AUTH) : "" }).catch(()=>{}); }
function authFromSession(s){
  if(!s || !s.access_token || !s.refresh_token) return null;
  const exp = s.expires_at || (Math.floor(Date.now()/1000) + (s.expires_in || 3600));
  return { at: s.access_token, rt: s.refresh_token, exp, uid: s.user && s.user.id, email: s.user && s.user.email };
}

class CloudError extends Error { constructor(kind, status, code){ super(kind); this.kind = kind; this.status = status; this.code = code; } }
async function sbFetch(path, opts, token){
  const headers = { apikey: CONFIG.supabaseKey, "Content-Type": "application/json" };
  if(token) headers.Authorization = "Bearer " + token;
  Object.assign(headers, (opts && opts.headers) || {});
  let r;
  try{ r = await fetch(CONFIG.supabaseUrl + path, Object.assign({}, opts, { headers })); }
  catch(e){ throw new CloudError("offline", 0); }
  if(!r.ok){
    let body = {}; try{ body = await r.json(); }catch(e){}
    const code = String(body.error_code || body.code || body.error || "");
    const kind = r.status === 429 || /rate/i.test(code) ? "rate"
      : /otp_expired|invalid|token/i.test(code) && path.startsWith("/auth/v1/verify") ? "badcode"
      : r.status === 401 || r.status === 403 ? "auth" : "server";
    throw new CloudError(kind, r.status, code.slice(0, 40));
  }
  if(r.status === 204) return null;
  const txt = await r.text(); return txt ? JSON.parse(txt) : null;
}

// Gyldig tilgangsnøkkel, fornyes automatisk. Returnerer null uten nett; logger ut hvis økten er ugyldig.
async function authToken(){
  if(!AUTH) return null;
  if(AUTH.exp - 60 > Date.now()/1000) return AUTH.at;
  if(!CLOUD.refreshing) CLOUD.refreshing = (async ()=>{
    try{
      const s = await sbFetch("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: AUTH.rt }) });
      const a = authFromSession(s); if(a){ AUTH = Object.assign({}, AUTH, a, { uid: a.uid || AUTH.uid, email: a.email || AUTH.email }); authStore(); }
    }catch(e){ if(e.kind === "auth" || e.status === 400){ AUTH = null; authStore(); } }
    finally{ CLOUD.refreshing = null; }
  })();
  await CLOUD.refreshing;
  return AUTH && AUTH.exp - 60 > Date.now()/1000 ? AUTH.at : null;
}

async function cloudSendCode(email){
  await sbFetch("/auth/v1/otp", { method: "POST", body: JSON.stringify({ email, create_user: true }) });
}
async function cloudVerify(email, code){
  const s = await sbFetch("/auth/v1/verify", { method: "POST", body: JSON.stringify({ type: "email", email, token: code }) });
  const a = authFromSession(s); if(!a) throw new CloudError("badcode", 0);
  AUTH = Object.assign(a, { email: a.email || email }); authStore();
  await cloudSync();
}
async function cloudSignOut(){
  const tok = AUTH && AUTH.at;
  AUTH = null; authStore(); CLOUD.status = "idle";
  if(tok) sbFetch("/auth/v1/logout", { method: "POST" }, tok).catch(()=>{});
}
async function cloudDeleteAccount(){
  const tok = await authToken(); if(!tok) throw new CloudError(AUTH ? "offline" : "auth", 0);
  await sbFetch("/rest/v1/rpc/delete_my_account", { method: "POST", body: "{}" }, tok);
  AUTH = null; authStore(); CLOUD.status = "idle";
}

function cloudSnapshot(){ const s = JSON.parse(JSON.stringify(S)); delete s.outbox; delete s.examRun; return s; }
async function cloudPush(tok){
  await sbFetch("/rest/v1/progress?on_conflict=user_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ user_id: AUTH.uid, state: cloudSnapshot(), updated_at: new Date().toISOString() }) }, tok);
}
// Henter fremgangen i skyen, slår den sammen med den lokale og laster opp resultatet.
// overwrite=true hopper over sammenslåingen (brukes når fremgangen nullstilles).
function cloudSync(overwrite){
  if(!CLOUD_ON || !AUTH) return Promise.resolve();
  CLOUD.chain = CLOUD.chain.then(async ()=>{
    CLOUD.status = "busy"; cloudRefreshUI();
    try{
      const tok = await authToken();
      if(!tok){ CLOUD.status = AUTH ? "offline" : "idle"; return; }
      if(!overwrite){
        const rows = await sbFetch("/rest/v1/progress?select=state&user_id=eq." + encodeURIComponent(AUTH.uid), { method: "GET" }, tok);
        const remote = rows && rows[0] && rows[0].state;
        if(remote && remote.v === 1){
          const before = JSON.stringify(cloudSnapshot());
          S = Object.assign(blank(), mergeState(S, remote));
          if(JSON.stringify(cloudSnapshot()) !== before){ S.updatedAt = Date.now(); saveLocal(); nativeSave(); cloudChanged = true; }
        }
      }
      await cloudPush(tok);
      CLOUD.status = "ok"; CLOUD.at = Date.now();
    }catch(e){
      if(e.kind === "auth"){ AUTH = null; authStore(); CLOUD.status = "idle"; }
      else CLOUD.status = e.kind === "offline" ? "offline" : "error";
    }
    cloudRefreshUI();
  });
  return CLOUD.chain;
}
let cloudChanged = false;
function cloudRefreshUI(){
  if(typeof screen === "undefined") return;
  if(cloudChanged && (screen === "home" || screen === "pick")){ cloudChanged = false; render(); return; }
  if(screen === "settings" && !overlay) render();
}
// Kalles fra save(): laster opp litt etter siste endring.
function cloudSchedule(){
  if(!CLOUD_ON || !AUTH) return;
  clearTimeout(CLOUD.timer); CLOUD.timer = setTimeout(()=>cloudSync(), 2500);
}
// Innlogging fra lenke i e-post (reserve hvis e-posten inneholder lenke i stedet for kode).
async function cloudFromLink(){
  const h = location.hash || ""; if(h.indexOf("access_token=") < 0) return false;
  const p = new URLSearchParams(h.slice(1)); history.replaceState(null, "", location.pathname + location.search);
  const at = p.get("access_token"), rt = p.get("refresh_token"); if(!at || !rt) return false;
  try{
    const u = await sbFetch("/auth/v1/user", { method: "GET" }, at);
    AUTH = { at, rt, exp: +p.get("expires_at") || Math.floor(Date.now()/1000) + (+p.get("expires_in") || 3600), uid: u.id, email: u.email }; authStore();
    return true;
  }catch(e){ return false; }
}
async function cloudBoot(){
  if(!CLOUD_ON) return;
  if(!AUTH && PL.Preferences){ try{ const { value } = await PL.Preferences.get({ key: AUTH_KEY }); if(value){ AUTH = JSON.parse(value); authStore(); } }catch(e){} }
  const viaLink = await cloudFromLink();
  if(AUTH){ await cloudSync(); if(viaLink) toast(t("acLoggedIn", AUTH.email)); }
  document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState === "visible") cloudSync(); });
  window.addEventListener("online", ()=>cloudSync());
}
function cloudStatusText(){
  const s = CLOUD.status;
  if(s === "busy") return t("acSyncing");
  if(s === "ok") return t("acSynced", new Date(CLOUD.at).toTimeString().slice(0,5));
  if(s === "offline") return t("acOffline");
  if(s === "error") return t("acError");
  return t("acSyncOn");
}
