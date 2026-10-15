// ============================================================
//  ELEVPROFILER – lærerens klasser og elever uten e-post (supabase/elever.sql, supabase/functions/elever, cloud.js).
//  Læreren: #/elever (fra Lærerverktøy). Lag klasse, legg til elever (ett navn per linje), skriv ut innloggingene, finn elev,
//  se framgang og leksesvar, gi nytt engangspassord, fjern elev. Klassekode (valgfri) lar eldre elever bli med selv.
//  Eleven: «Elev? Logg inn med brukernavn» i innloggingen, eller lenken #/klasse/KODE fra læreren.
//  Mangler databasen eller funksjonen, sier skjermen hva eieren må gjøre (supabase/ELEVER.md); resten av appen påvirkes ikke.
// ============================================================
let EL = null;
const EL_MAX = 200;
const elT = (nb, en) => T(nb, en);
function elErrText(e){
  const c = String((e && (e.code || e.msg || e.message)) || "");
  if(/not_deployed/.test(c)) return elT("Elevprofiler er ikke slått på ennå: funksjonen «elever» er ikke satt opp (se supabase/ELEVER.md).", "Student profiles are not enabled yet: the «elever» function is not set up (see supabase/ELEVER.md).");
  if(/not_installed|does not exist|schema cache|PGRST202/.test(c) || (e && e.status === 404)) return elT("Elevprofiler er ikke slått på ennå: kjør supabase/elever.sql (se supabase/ELEVER.md).", "Student profiles are not enabled yet: run supabase/elever.sql (see supabase/ELEVER.md).");
  if(/too_many_students/.test(c)) return elT(`Du har nådd grensen på ${EL_MAX} elevprofiler. Fjern elever du ikke trenger lenger.`, `You have reached the limit of ${EL_MAX} student profiles. Remove students you no longer need.`);
  if(/too_many_classes/.test(c)) return elT("Du har nådd grensen på 30 klasser.", "You have reached the limit of 30 classes.");
  if(/student_account/.test(c)) return elT("En elevprofil kan ikke ha elever.", "A student profile cannot have students.");
  if(/username_taken/.test(c)) return elT("Brukernavnet er tatt i klassen. Velg et annet.", "That username is taken in the class. Pick another one.");
  if(/bad_code/.test(c)) return elT("Klassekoden virker ikke. Spør læreren om en ny.", "The class code does not work. Ask your teacher for a new one.");
  if(/bad_username/.test(c)) return elT("Brukernavnet kan bare ha a–z, 0–9, - og _ (2–20 tegn).", "The username can only use a–z, 0–9, - and _ (2–20 characters).");
  if(/weak_password/.test(c)) return elT("Passordet må ha minst 8 tegn og ikke inneholde brukernavnet.", "The password needs at least 8 characters and must not contain the username.");
  if(/badlogin/.test(c) || (e && e.kind === "badlogin")) return elT("Feil innloggingsnavn eller passord. Spør læreren om et nytt passord hvis du har glemt det.", "Wrong login name or password. Ask your teacher for a new password if you have forgotten it.");
  if(e && e.kind === "offline") return elT("Ingen nettforbindelse.", "No connection.");
  return elT("Noe gikk galt. Prøv igjen.", "Something went wrong. Try again.");
}
function elOpen(from){ EL = { from: from || screen || "teach", classes: null, count: 0, cls: null, q: "", busy: false, err: null, created: null, reset: null, res: {} }; screen = "elever"; render(); window.scrollTo(0, 0); elLoad(); }
async function elLoad(){
  if(!EL) return; if(!AUTH || isElev()){ render(); return; }
  try{ const r = await frRpc("klasse_list", {}); EL.classes = r.classes || []; EL.count = r.count || 0; EL.err = null; if(!EL.cls || !EL.classes.some(c => c.id === EL.cls)) EL.cls = EL.classes[0] ? EL.classes[0].id : null; }
  catch(e){ EL.classes = []; EL.err = elErrText(e); }
  if(screen === "elever") render();
}
const elAgo = iso => { if(!iso) return elT("aldri", "never"); const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); return d <= 0 ? elT("i dag", "today") : d === 1 ? elT("i går", "yesterday") : elT(`for ${d} dager siden`, `${d} days ago`); };
function renderElever(){
  if(!EL) return elOpen();
  const top = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="elback" aria-label="${esc(t("back"))}">${I.left}</button><div class="th-t"><small>${esc(elT("Lærerverktøy", "Teacher tools"))}</small><b>${esc(elT("Elevprofiler", "Student profiles"))}</b></div></div></div>`;
  let body;
  if(!AUTH) body = `<section class="tc-card"><p>${esc(elT("Logg inn med lærerkontoen din for å lage elevprofiler.", "Log in with your teacher account to create student profiles."))}</p><button class="big" data-a="aclogin">${esc(elT("Logg inn", "Log in"))}</button></section>`;
  else if(isElev()) body = `<section class="tc-card"><p>${esc(elT("Du er logget inn med en elevprofil. Bare lærere kan lage og administrere elevprofiler.", "You are logged in with a student profile. Only teachers can create and manage student profiles."))}</p></section>`;
  else if(EL.classes == null) body = `<p class="tc-note">${esc(elT("Henter klassene …", "Loading the classes …"))}</p>`;
  else if(EL.err) body = `<section class="tc-card el-off"><h3>${esc(elT("Ikke slått på ennå", "Not enabled yet"))}</h3><p>${esc(EL.err)}</p><button class="big ghost" data-a="elreload">${esc(elT("Prøv igjen", "Try again"))}</button></section>`;
  else body = elMainHTML();
  $app.innerHTML = `${top}<main class="wrap el">${body}</main>${EL.created ? elPrintHTML() : ""}`;
  const q = document.getElementById("elq"); if(q) q.addEventListener("input", () => { EL.q = q.value; const L = document.getElementById("ellist"); if(L) L.innerHTML = elListHTML(); });
}
function elMainHTML(){
  const C = EL.classes, c = C.find(x => x.id === EL.cls);
  const head = `<section class="tc-hero el-hero"><h2>${esc(elT("Elever uten e-post", "Students without email"))}</h2><p>${esc(elT("Lag en innlogging til hver elev. Eleven logger inn med brukernavn og passord, og du ser framgangen og leksene til hver enkelt.", "Create a login for each student. The student logs in with a username and password, and you see each student's progress and homework."))}</p>
    <p class="el-count" aria-live="polite"><b>${EL.count}</b> ${esc(elT(`av ${EL_MAX} elevprofiler`, `of ${EL_MAX} student profiles`))}</p></section>`;
  const tabs = `<div class="chips el-classes" role="radiogroup" aria-label="${esc(elT("Klasser", "Classes"))}">${C.map(x => `<button role="radio" aria-checked="${x.id === EL.cls}" class="${x.id === EL.cls ? "on" : ""}" data-a="elcls" data-id="${x.id}">${esc(x.name)} <small>${x.students.length}</small></button>`).join("")}<button data-a="elnewcls">${I.plus} ${esc(elT("Ny klasse", "New class"))}</button></div>`;
  if(!c) return head + tabs + `<section class="tc-card"><p>${esc(elT("Start med å lage en klasse, for eksempel «7A».", "Start by creating a class, for example \"7A\"."))}</p><button class="big" data-a="elnewcls">${esc(elT("Lag en klasse", "Create a class"))}</button></section>`;
  const add = `<section class="tc-card"><h3>${esc(elT("Legg til elever", "Add students"))}</h3>
    <label class="tc-f"><span>${esc(elT("Ett navn per linje (gjerne bare fornavn)", "One name per line (first names are enough)"))}</span><textarea id="elnames" class="ed-in" rows="4" maxlength="2500" placeholder="${esc(elT("Ola\nKari\nAhmed", "Ola\nKari\nAhmed"))}"></textarea></label>
    <button class="big" data-a="eladd" ${EL.busy ? "disabled" : ""}>${esc(EL.busy ? elT("Lager innlogginger …", "Creating logins …") : elT("Lag innlogging", "Create logins"))}</button>
    <p class="tc-note">${esc(elT("Hver elev får et brukernavn (f.eks. «ola." + c.tag + "») og et engangspassord som du ser én gang. Glemmer eleven passordet, lager du et nytt her.", "Each student gets a username (e.g. \"ola." + c.tag + "\") and a one-time password that you see once. If a student forgets it, you create a new one here."))}</p></section>`;
  const created = EL.created ? `<section class="tc-card el-new" aria-live="polite"><h3>${esc(elT("Nye innlogginger – vises bare nå", "New logins – shown only now"))}</h3>
    <p class="tc-note">${esc(elT("Skriv ut eller kopier før du går videre. Passordene lagres ikke og kan ikke vises igjen.", "Print or copy before you continue. The passwords are not stored and cannot be shown again."))}</p>
    <div class="el-table" role="table">${EL.created.map(s => s.error ? `<div role="row" class="el-bad"><span role="cell">${esc(s.name || "–")}</span><span role="cell">${esc(elErrText({ code: s.error }))}</span></div>` : `<div role="row"><span role="cell"><b>${esc(s.name)}</b></span><span role="cell"><code>${esc(s.login)}</code></span><span role="cell"><code>${esc(s.password)}</code></span></div>`).join("")}</div>
    <div class="el-btns"><button class="big" data-a="elprint">${esc(elT("Skriv ut lapper", "Print slips"))}</button><button class="big ghost" data-a="elcopy">${esc(elT("Kopier", "Copy"))}</button><button class="big ghost" data-a="eldone">${esc(elT("Ferdig", "Done"))}</button></div></section>` : "";
  const reset = EL.reset ? `<section class="tc-card el-new" aria-live="polite"><h3>${esc(elT("Nytt passord – vises bare nå", "New password – shown only now"))}</h3><div class="el-table"><div role="row"><span role="cell"><b>${esc(EL.reset.name)}</b></span><span role="cell"><code>${esc(EL.reset.login)}</code></span><span role="cell"><code>${esc(EL.reset.password)}</code></span></div></div><div class="el-btns"><button class="big ghost" data-a="eldone">${esc(elT("Ferdig", "Done"))}</button></div></section>` : "";
  const link = c.code ? `${location.origin}${location.pathname.replace(/[^/]*$/, "")}#/klasse/${c.code}` : "";
  const code = `<section class="tc-card"><h3>${esc(elT("Klassekode (valgfritt)", "Class code (optional)"))}</h3>
    <p class="tc-note">${esc(elT("For elever på 13 år eller eldre: de lager eget brukernavn og passord med koden. Koden gir bare lov til å bli med i klassen.", "For students aged 13 or older: they create their own username and password with the code. The code only lets them join the class."))}</p>
    ${c.code ? `<p class="el-code"><b>${esc(c.code)}</b></p><input class="tc-url" readonly value="${esc(link)}" aria-label="${esc(elT("Lenke", "Link"))}"><div class="el-btns"><button class="big ghost" data-a="tccopy" data-u="${esc(link)}">${esc(elT("Kopier lenken", "Copy the link"))}</button><button class="big ghost" data-a="elcode" data-on="1">${esc(elT("Ny kode", "New code"))}</button><button class="big ghost" data-a="elcode" data-on="0">${esc(elT("Slå av", "Turn off"))}</button></div>`
      : `<button class="big ghost" data-a="elcode" data-on="1">${esc(elT("Slå på klassekode", "Turn on class code"))}</button>`}</section>`;
  const list = `<section class="tc-card"><h3>${esc(elT(`Elevene i ${c.name}`, `Students in ${c.name}`))}</h3>
    ${c.students.length > 6 ? `<input id="elq" class="ed-in el-q" type="search" value="${esc(EL.q)}" placeholder="${esc(elT("Finn elev (navn eller brukernavn)", "Find a student (name or username)"))}" aria-label="${esc(elT("Finn elev", "Find a student"))}">` : ""}
    <div id="ellist">${elListHTML()}</div>
    <div class="el-btns el-cls"><button class="kbtn ghost" data-a="elrename">${esc(elT("Gi klassen nytt navn", "Rename the class"))}</button><button class="kbtn ghost el-danger" data-a="eldelcls">${esc(elT("Slett klassen", "Delete the class"))}</button></div></section>`;
  return head + tabs + created + reset + add + list + code;
}
function elListHTML(){
  const c = EL.classes.find(x => x.id === EL.cls); if(!c) return "";
  const q = String(EL.q || "").trim().toLowerCase(), rows = c.students.filter(s => !q || (s.name + " " + s.login).toLowerCase().includes(q));
  if(!c.students.length) return `<p class="tc-note">${esc(elT("Ingen elever ennå.", "No students yet."))}</p>`;
  if(!rows.length) return `<p class="tc-note">${esc(elT("Fant ingen elev med det navnet.", "No student with that name."))}</p>`;
  return `<ul class="el-list">${rows.map(s => { const r = EL.res[s.uid];
    return `<li class="el-row"><div class="el-who"><b>${esc(s.name)}</b><small><code>${esc(s.login)}</code>${s.self ? ` · ${esc(elT("med kode", "via code"))}` : ""}</small></div>
      <div class="el-stat"><span><b>${Math.round(+s.week_xp || 0)}</b> ${esc(elT("XP siste 7 dager", "XP last 7 days"))}</span><span>${esc(elT("Sist aktiv", "Last active"))} ${esc(elAgo(s.active_at))}</span></div>
      <div class="el-acts"><button class="kbtn ghost" data-a="elres" data-u="${s.uid}" aria-expanded="${!!r}">${esc(elT("Lekser", "Homework"))}</button><button class="kbtn ghost" data-a="elreset" data-u="${s.uid}">${esc(elT("Nytt passord", "New password"))}</button><button class="kbtn ghost el-danger" data-a="elremove" data-u="${s.uid}">${esc(elT("Fjern", "Remove"))}</button></div>
      ${r ? `<div class="el-res">${r === "busy" ? esc(elT("Henter …", "Loading …")) : !r.length ? esc(elT("Ingen leksesvar ennå.", "No homework answers yet.")) : `<ul>${r.map(x => `<li>${esc(elHwName(x.key))}: <b>${x.ok}</b> ${esc(elT("riktige", "correct"))} · ${esc(elAgo(x.at))}</li>`).join("")}</ul>`}</div>` : ""}</li>`; }).join("")}</ul>`;
}
const elHwName = key => { const l = (S.tcLinks || []).find(x => x.key === key); return l ? l.title : elT("Lekse", "Homework"); };
// utskrift: én lapp per elev med navn, innloggingsnavn og passord (bare i utskriften og på skjermen nå; lagres ikke)
function elPrintHTML(){
  const ok = (EL.created || []).filter(s => !s.error), host = location.host || "axle.no";
  return `<div id="elprint" aria-hidden="true">${ok.map(s => `<div class="el-slip"><b>${esc(s.name)}</b><p>${esc(elT("Gå til", "Go to"))} ${esc(host)} → ${esc(elT("Logg inn → «Elev? Logg inn med brukernavn»", "Log in → \"Student? Log in with a username\""))}</p><p>${esc(elT("Brukernavn", "Username"))}: <code>${esc(s.login)}</code></p><p>${esc(elT("Passord", "Password"))}: <code>${esc(s.password)}</code></p></div>`).join("")}</div>`;
}

// ---------- eleven: innlogging med brukernavn og klassekode (steg i innloggingsdialogen) ----------
function elLoginHTML(o){
  if(o.step === "elev") return `<div class="dialog pop" role="dialog" aria-label="${esc(elT("Logg inn som elev", "Log in as a student"))}"><h3>${esc(elT("Logg inn som elev", "Log in as a student"))}</h3>
    <p>${esc(elT("Bruk brukernavnet og passordet du har fått av læreren.", "Use the username and password you got from your teacher."))}</p>
    <input type="text" id="lglogin" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="${esc(elT("f.eks. ola.k7mq", "e.g. ola.k7mq"))}" aria-label="${esc(elT("Brukernavn", "Username"))}" value="${esc(o.ln || "")}">
    <input type="password" id="lgpw" autocomplete="current-password" placeholder="${esc(elT("Passord", "Password"))}" aria-label="${esc(elT("Passord", "Password"))}">
    ${o.err ? `<p class="lgerr">${esc(o.err)}</p>` : ""}
    <button class="big" data-a="lgelevgo" ${o.busy ? "disabled" : ""}>${esc(elT("Logg inn", "Log in"))}</button>
    <p class="lgnote">${esc(elT("Glemt passordet? Spør læreren, så får du et nytt.", "Forgot the password? Ask your teacher for a new one."))}</p>
    <button class="big ghost" data-a="lgjoin">${esc(elT("Har du en klassekode?", "Do you have a class code?"))}</button><button class="big ghost" data-a="lgback">${esc(elT("Logg inn med e-post i stedet", "Log in with email instead"))}</button></div>`;
  return `<div class="dialog pop" role="dialog" aria-label="${esc(elT("Bli med i klassen", "Join the class"))}"><h3>${esc(elT("Bli med i klassen", "Join the class"))}</h3>
    <p>${esc(elT("For elever på 13 år eller eldre. Er du yngre, får du innlogging av læreren.", "For students aged 13 or older. If you are younger, your teacher gives you a login."))}</p>
    <input type="text" id="lgjcode" autocapitalize="characters" spellcheck="false" maxlength="6" placeholder="${esc(elT("Klassekode", "Class code"))}" aria-label="${esc(elT("Klassekode", "Class code"))}" value="${esc(o.code || "")}">
    <input type="text" id="lgjname" autocomplete="given-name" maxlength="40" placeholder="${esc(elT("Fornavnet ditt (læreren ser det)", "Your first name (your teacher sees it)"))}" aria-label="${esc(elT("Fornavn", "First name"))}" value="${esc(o.name || "")}">
    <input type="text" id="lgjuser" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20" placeholder="${esc(elT("Velg et brukernavn (a–z, 0–9)", "Choose a username (a–z, 0–9)"))}" aria-label="${esc(elT("Brukernavn", "Username"))}" value="${esc(o.user || "")}">
    <input type="password" id="lgjpw" autocomplete="new-password" placeholder="${esc(elT("Lag et passord (minst 8 tegn)", "Make a password (at least 8 characters)"))}" aria-label="${esc(elT("Passord", "Password"))}">
    <input type="password" id="lgjpw2" autocomplete="new-password" placeholder="${esc(elT("Skriv passordet en gang til", "Type the password again"))}" aria-label="${esc(elT("Gjenta passordet", "Repeat the password"))}">
    ${o.err ? `<p class="lgerr">${esc(o.err)}</p>` : ""}
    <button class="big" data-a="lgjoingo" ${o.busy ? "disabled" : ""}>${esc(elT("Bli med", "Join"))}</button><button class="big ghost" data-a="lgelev">${esc(elT("Jeg har allerede innlogging", "I already have a login"))}</button></div>`;
}

function elClick(a, b){
  if(!a || !/^(el|lgelev|lgjoin)/.test(a)) return false;
  const d = (b && b.dataset) || {};
  if(a === "lgelev"){ overlay = { login: 1, step: "elev", ln: "" }; renderOverlay(); setTimeout(() => document.getElementById("lglogin")?.focus(), 30); return true; }
  if(a === "lgjoin"){ overlay = { login: 1, step: "join", code: (overlay && overlay.code) || "" }; renderOverlay(); return true; }
  if(a === "lgelevgo"){ const login = (document.getElementById("lglogin") || {}).value || "", pw = (document.getElementById("lgpw") || {}).value || "";
    overlay = { login: 1, step: "elev", ln: login, busy: true }; renderOverlay();
    cloudElevLogin(login, pw).then(() => { S.acEver = 1; saveLocal(); overlay = null; renderOverlay(); render(); toast(elT(`Logget inn som ${elevLogin()}`, `Logged in as ${elevLogin()}`)); },
      e => { if(overlay && overlay.login){ overlay = { login: 1, step: "elev", ln: login, err: elErrText(e) }; renderOverlay(); } });
    return true; }
  if(a === "lgjoingo"){ const v = id => ((document.getElementById(id) || {}).value || "").trim(), o = { login: 1, step: "join", code: v("lgjcode").toUpperCase(), name: v("lgjname"), user: v("lgjuser").toLowerCase() };
    const pw = (document.getElementById("lgjpw") || {}).value || "", pw2 = (document.getElementById("lgjpw2") || {}).value || "";
    if(!o.code || !o.name || !o.user){ o.err = elT("Fyll ut klassekode, fornavn og brukernavn.", "Fill in the class code, first name and username."); overlay = o; renderOverlay(); return true; }
    if(pw !== pw2){ o.err = elT("Passordene er ikke like.", "The passwords do not match."); overlay = o; renderOverlay(); return true; }
    overlay = Object.assign({}, o, { busy: true }); renderOverlay();
    elevFn("join", { code: o.code, username: o.user, name: o.name, password: pw }).then(r => cloudElevLogin(r.login, pw)).then(() => { S.acEver = 1; saveLocal(); overlay = null; renderOverlay(); render(); toast(elT(`Du er med i klassen. Brukernavnet ditt er ${elevLogin()}`, `You have joined the class. Your username is ${elevLogin()}`)); },
      e => { if(overlay && overlay.login){ overlay = Object.assign(o, { err: elErrText(e) }); renderOverlay(); } });
    return true; }
  if(!EL) return a === "elopen" ? (elOpen(screen), true) : false;
  if(a === "elopen"){ elOpen(screen); return true; }
  if(a === "elback"){ const f = EL.from; EL = null; if(f === "teach" && typeof tcOpen === "function"){ screen = "teach"; render(); } else goHome(); return true; }
  if(a === "elreload"){ EL.classes = null; render(); elLoad(); return true; }
  if(a === "elcls"){ EL.cls = d.id; EL.q = ""; EL.created = null; EL.reset = null; render(); return true; }
  if(a === "elnewcls"){ const name = prompt(elT("Navn på klassen (f.eks. 7A)", "Name of the class (e.g. 7A)"), ""); if(!name || !name.trim()) return true;
    frRpc("klasse_create", { p_name: name.trim().slice(0, 40) }).then(r => { EL.cls = r.id; return elLoad(); }, e => toast(elErrText(e))); return true; }
  if(a === "elrename"){ const c = EL.classes.find(x => x.id === EL.cls); const name = c && prompt(elT("Nytt navn på klassen", "New name for the class"), c.name); if(!name || !name.trim()) return true;
    frRpc("klasse_rename", { p_class: c.id, p_name: name.trim().slice(0, 40) }).then(elLoad, e => toast(elErrText(e))); return true; }
  if(a === "eldelcls"){ const c = EL.classes.find(x => x.id === EL.cls); if(!c) return true;
    if(!confirm(elT(`Slette klassen ${c.name} og alle ${c.students.length} elevprofilene i den? Framgangen deres slettes også. Dette kan ikke angres.`, `Delete the class ${c.name} and all ${c.students.length} student profiles in it? Their progress is deleted too. This cannot be undone.`))) return true;
    frRpc("klasse_delete", { p_class: c.id }).then(() => { EL.cls = null; return elLoad(); }, e => toast(elErrText(e))); return true; }
  if(a === "eladd"){ const names = ((document.getElementById("elnames") || {}).value || "").split(/\n|,/).map(x => x.trim()).filter(Boolean).slice(0, 50);
    if(!names.length){ toast(elT("Skriv minst ett navn.", "Write at least one name.")); return true; }
    if(EL.count + names.length > EL_MAX){ toast(elErrText({ code: "too_many_students" })); return true; }
    EL.busy = true; EL.reset = null; render();
    elevFn("create", { class_id: EL.cls, students: names.map(name => ({ name })) }).then(r => { EL.busy = false; EL.created = r.students || []; return elLoad(); },
      e => { EL.busy = false; render(); toast(elErrText(e)); });
    return true; }
  if(a === "elprint"){ document.body.classList.add("el-printing"); setTimeout(() => { window.print(); setTimeout(() => document.body.classList.remove("el-printing"), 500); }, 50); return true; }
  if(a === "elcopy"){ const txt = (EL.created || []).filter(s => !s.error).map(s => `${s.name}\t${s.login}\t${s.password}`).join("\n"); navigator.clipboard?.writeText(txt).then(() => toast(elT("Kopiert", "Copied")), () => {}); return true; }
  if(a === "eldone"){ EL.created = null; EL.reset = null; render(); return true; }
  if(a === "elcode"){ frRpc("klasse_code", { p_class: EL.cls, p_on: d.on === "1" }).then(elLoad, e => toast(elErrText(e))); return true; }
  const st = () => { for(const c of EL.classes) for(const s of c.students) if(s.uid === d.u) return s; return null; };
  if(a === "elres"){ if(EL.res[d.u]){ delete EL.res[d.u]; render(); return true; } EL.res[d.u] = "busy"; render();
    frRpc("elev_results", { p_user: d.u }).then(r => { EL.res[d.u] = r || []; render(); }, e => { delete EL.res[d.u]; render(); toast(elErrText(e)); }); return true; }
  if(a === "elreset"){ const s = st(); if(!s || !confirm(elT(`Lage nytt passord for ${s.name}? Det gamle slutter å virke.`, `Create a new password for ${s.name}? The old one stops working.`))) return true;
    elevFn("reset", { user_id: s.uid }).then(r => { EL.created = null; EL.reset = { name: s.name, login: r.login || s.login, password: r.password }; render(); window.scrollTo(0, 0); }, e => toast(elErrText(e))); return true; }
  if(a === "elremove"){ const s = st(); if(!s || !confirm(elT(`Fjerne ${s.name} (${s.login})? Elevprofilen og framgangen slettes. Dette kan ikke angres.`, `Remove ${s.name} (${s.login})? The student profile and progress are deleted. This cannot be undone.`))) return true;
    frRpc("elev_remove", { p_user: s.uid }).then(elLoad, e => toast(elErrText(e))); return true; }
  return false;
}
