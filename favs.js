// ============================================================
//  FAVORITTFAG OG KILDER TIL DAGENS UTFORDRING
//  S.favs   = ["MEK1000", "@m", …]  – favoritter (fagkoder, og «@m»/«@f» = grunnbegreper i matte/fysikk)
//  S.dcSrc  = "auto" | "favs" | "pick" – hvor dagens utfordring henter oppgaver fra
//  S.dcPick = [koder]                 – egne valg når dcSrc er «pick»
//  Favorittene vises øverst i fagvelgeren og Teoriboken, og som snarveier på forsiden.
// ============================================================
// Kortstokkene (grunnbegreper, sykepleie …) kan også være favoritter: "@" + stokk-id. [nb, en, stokk, symbol, studie, kortnavn]
const FAV_DRILL = Object.fromEntries(Object.entries(DR_DECKS).map(([k, d]) => ["@" + k, [d.nb, d.en, k, d.sym, d.study, d.short]]));
const srcValid = x => !!FAV_DRILL[x] || COURSES.some(c => c.code === x);
const srcName = x => FAV_DRILL[x] ? T(FAV_DRILL[x][0], FAV_DRILL[x][1]) : courseName(COURSE(x));
const srcShort = x => FAV_DRILL[x] ? FAV_DRILL[x][3] + " " + T(FAV_DRILL[x][5][0], FAV_DRILL[x][5][1]) : courseShort(COURSE(x));
const favList = () => (S.favs || []).filter(srcValid);
const isFav = x => favList().includes(x);
function favToggle(x){
  if(!srcValid(x)) return;
  const f = S.favs = favList(), i = f.indexOf(x);
  if(i >= 0) f.splice(i, 1); else f.push(x);
  save(); toast(t(i >= 0 ? "favRemoved" : "favAdded", srcName(x)));
}
const I_STAR_O = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.2l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`;
const I_STAR_F = I_STAR_O.replace('fill="none"', 'fill="currentColor"');
function favStarHTML(x){
  const on = isFav(x);
  return `<button class="fav-btn ${on ? "on" : ""}" data-a="fav" data-c="${esc(x)}" aria-pressed="${on}" aria-label="${esc(t(on ? "favRemove" : "favAdd", srcName(x)))}">${on ? I_STAR_F : I_STAR_O}</button>`;
}
// Snarveier på forsiden: favorittfagene (bytt fag) og grunnbegreper (start terping).
function favBarHTML(){
  const f = favList(); if(!f.length) return "";
  return `<div class="favbar" role="list" aria-label="${esc(t("favTitle"))}"><span class="favbar-ic" aria-hidden="true">${I_STAR_F}</span>${f.map(x => FAV_DRILL[x]
    ? `<button role="listitem" class="favchip dr" data-a="drstart" data-t="${FAV_DRILL[x][2]}">${esc(srcShort(x))}</button>`
    : `<button role="listitem" class="favchip ${x === S.current ? "on" : ""}" data-a="choose" data-c="${esc(x)}">${esc(courseName(COURSE(x)))}</button>`).join("")}</div>`;
}

// ---------- kilder til dagens utfordring ----------
function dcSources(){
  const src = S.dcSrc || "auto";
  let list = src === "favs" ? favList() : src === "pick" ? (S.dcPick || []).filter(srcValid) : [];
  if(!list.length){
    list = COURSES.filter(c => c.code === S.current || (courseProgress(c).d > 0 && inStudy(c, curStudy()))).map(c => c.code); // fag i studiet ditt som er startet
    if(!list.length) list = [S.current];
  }
  return list;
}
const dcSrcLabel = () => { const s = S.dcSrc || "auto"; return s === "favs" ? t("dcSrcFavs") : s === "pick" ? t("dcSrcPickN", dcSources().length) : t("dcSrcAuto"); };
function dcSrcHTML(){
  const s = S.dcSrc || "auto", nf = favList().length, pick = new Set(S.dcPick || []);
  const opt = (k, title, sub) => `<button class="dcs-opt ${s === k ? "on" : ""}" data-a="dcsrc" data-m="${k}" role="radio" aria-checked="${s === k}"><span class="dcs-dot"></span><span><b>${esc(title)}</b><small>${esc(sub)}</small></span></button>`;
  const row = x => `<button class="dcs-item ${pick.has(x) ? "on" : ""}" data-a="dcpick" data-c="${esc(x)}" aria-pressed="${pick.has(x)}"><span class="dcs-box">${pick.has(x) ? I.checkS : ""}</span><span class="dcs-code">${esc(srcShort(x))}</span><span class="dcs-nm">${esc(srcName(x))}</span>${isFav(x) ? `<span class="dcs-star">${I_STAR_F}</span>` : ""}</button>`;
  const order = [...Object.keys(FAV_DRILL), ...COURSES.map(c => c.code)].sort((a, b) => (isFav(b) - isFav(a)));
  return `<div class="dialog pop dcsrc" role="dialog" aria-label="${esc(t("dcSrcTitle"))}">
    <h3>${esc(t("dcSrcTitle"))}</h3><p>${esc(t("dcSrcText"))}</p>
    <div class="dcs-opts" role="radiogroup">
      ${opt("auto", t("dcSrcAuto"), t("dcSrcAutoSub"))}
      ${opt("favs", t("dcSrcFavs"), nf ? t("dcSrcFavsSub", favList().map(srcShort).join(", ")) : t("dcSrcFavsNone"))}
      ${opt("pick", t("dcSrcPick"), t("dcSrcPickSub"))}
    </div>
    ${s === "pick" ? `<div class="dcs-list">${order.map(row).join("")}</div>` : ""}
    ${s === "favs" && !nf ? `<p class="dcs-warn">${esc(t("dcSrcFavsHow"))}</p>` : ""}
    ${s === "pick" && !pick.size ? `<p class="dcs-warn">${esc(t("dcSrcPickNone"))}</p>` : ""}
    <button class="big" data-a="closeov">${esc(t("dcSrcDone"))}</button>
  </div>`;
}
// Klikk som hører til favoritter og kilder. Returnerer true om klikket er håndtert.
function favClick(a, b){
  if(a === "fav"){ favToggle(b.dataset.c); if(overlay && overlay.dcsrc) renderOverlay(); else render(); return true; }
  if(a === "closeov" && overlay && overlay.dcsrc){ overlay = null; renderOverlay(); render(); return true; } // kortet viser nye fag med en gang
  if(a === "dcsrcopen"){ overlay = { dcsrc: 1 }; renderOverlay(); return true; }
  if(a === "dcsrc"){ S.dcSrc = b.dataset.m; if(S.dcSrc === "pick" && !(S.dcPick || []).length) S.dcPick = favList().length ? favList() : dcSources(); save(); renderOverlay(); return true; }
  if(a === "dcpick"){ const x = b.dataset.c, p = S.dcPick = (S.dcPick || []).filter(srcValid), i = p.indexOf(x); if(i >= 0) p.splice(i, 1); else p.push(x); save();
    const sc = document.querySelector(".dcs-list")?.scrollTop; renderOverlay(); const l = document.querySelector(".dcs-list"); if(l && sc) l.scrollTop = sc; return true; }
  return false;
}
