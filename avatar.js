// ============================================================
//  AVATARER OG LÆRERE
//  Én tegnefunksjon (SVG) brukes både til din egen avatar og til lærerne i fagene.
//  En avatar lagres som en kort kode: "hud-hår-hårfarge-øyne-munn-tilbehør-bakgrunn-genser-skjegg".
// ============================================================
const AV_SKIN = ["#FBD9C0", "#F1C19C", "#D9A274", "#B97F52", "#8D5A36", "#5E3A22"];
const AV_HAIRC = ["#1F1A17", "#4A2E1D", "#8A5A2B", "#D9B25F", "#B5472B", "#9AA3AB", "#3F6ED8", "#D65DA0"];
const AV_BG = ["#DCE5F8", "#D5F0E6", "#FCE8C4", "#F6DAE6", "#E6DEF6", "#D8EEF3", "#EEE7DC", "#E3E8EC"];
const AV_SHIRT = ["#2B59C3", "#0F8A83", "#7A4BC2", "#E9A100", "#D2452F", "#2E7D32", "#37474F", "#E86A92"];
const AV_PARTS = { s: AV_SKIN.length, h: 8, hc: AV_HAIRC.length, e: 4, m: 4, a: 7, bg: AV_BG.length, sh: AV_SHIRT.length, f: 3 };
const AV_KEYS = ["s", "h", "hc", "e", "m", "a", "bg", "sh", "f"];

function avParse(code){
  const v = String(code || "").split("-").map(n => parseInt(n, 10));
  const o = {}; AV_KEYS.forEach((k, i) => { const x = v[i]; o[k] = Number.isInteger(x) && x >= 0 && x < AV_PARTS[k] ? x : 0; });
  return o;
}
const avCode = o => AV_KEYS.map(k => o[k] || 0).join("-");
function avRandom(){ const o = {}; AV_KEYS.forEach(k => { o[k] = Math.floor(Math.random() * AV_PARTS[k]); }); if(Math.random() < 0.7) o.f = 0; return avCode(o); }

let AV_UID = 0;
function avatarSVG(code, size = 48, extraClass = ""){
  const o = avParse(code), skin = AV_SKIN[o.s], hair = AV_HAIRC[o.hc], id = "av" + (++AV_UID);
  const dark = "rgba(0,0,0,.72)";
  // hår bak hodet (langt hår og bob)
  const back = o.h === 1 ? `<path d="M27 44C27 19 39 13 50 13s23 6 23 31l2 30c-8 3-14-1-16-6H41c-2 5-8 9-16 6z" fill="${hair}"/>`
    : o.h === 6 ? `<path d="M27 46C27 20 39 14 50 14s23 6 23 32l-1 16H28z" fill="${hair}"/>` : "";
  const top = [
    `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/>`,                                   // kort
    `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-3-8-8-12-14-13-6 4-17 5-28 13z" fill="${hair}"/>`,                                  // langt (lugg)
    `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><circle cx="50" cy="12" r="8" fill="${hair}"/>`, // knute
    `<g fill="${hair}">${[[31,36],[35,27],[42,21],[50,19],[58,21],[65,27],[69,36]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>`, // krøller
    "",                                                                                                                                 // skallet
    `<path d="M29 40l3-16 5 7 4-12 5 9 4-12 4 12 5-9 4 12 5-7 3 16c-6-7-13-10-21-10s-15 3-21 10z" fill="${hair}"/>`,                   // piggete
    `<path d="M29 44C29 22 39 15 50 15s21 7 21 29c-2-10-9-15-21-15-6 0-11 2-14 5-3 2-5 6-7 10z" fill="${hair}"/>`,                     // bob / sideskill
    `<path d="M44 30c0-10 3-17 6-19 3 2 6 9 6 19z" fill="${hair}"/>`                                                                    // hanekam
  ][o.h];
  const eyes = [
    `<circle cx="42" cy="46" r="2.8" fill="${dark}"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0M54.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<circle cx="42" cy="46" r="4.3" fill="#fff"/><circle cx="58" cy="46" r="4.3" fill="#fff"/><circle cx="42.8" cy="46.6" r="2.3" fill="${dark}"/><circle cx="58.8" cy="46.6" r="2.3" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`
  ][o.e];
  const mouth = [
    `<path d="M43.5 55.5q6.5 6 13 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<path d="M42.5 54h15q-1 8-7.5 8t-7.5-8z" fill="${dark}"/><path d="M45 58.5q5 3 10 0" fill="#E86A6A"/>`,
    `<path d="M45 57h10" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>`,
    `<ellipse cx="50" cy="57" rx="3.2" ry="3.8" fill="${dark}"/>`
  ][o.m];
  const beard = [
    "",
    `<path d="M31 48c1 14 9 22 19 22s18-8 19-22c-3 5-6 7-9 7-3-3-6-4-10-4s-7 1-10 4c-3 0-6-2-9-7z" fill="${hair}"/>`,
    `<path d="M41 53c3-3 6-3 9-1 3-2 6-2 9 1-3 2-6 2-9 1-3 1-6 1-9-1z" fill="${hair}"/>`
  ][o.f];
  const acc = [
    "",
    `<g fill="none" stroke="#263238" stroke-width="2"><circle cx="42" cy="46" r="6.5"/><circle cx="58" cy="46" r="6.5"/><path d="M48.5 46h3M35.5 45l-5-2M64.5 45l5-2"/></g>`,        // briller
    `<path d="M27 36c0-14 10-23 23-23s23 9 23 23z" fill="#F2B51D"/><path d="M22 36h56v5H22z" fill="#E09A00"/><path d="M47 14h6v22h-6z" fill="#FFD04D"/>`, // hjelm
    `<path d="M27 46c0-17 10-27 23-27s23 10 23 27" fill="none" stroke="#263238" stroke-width="4"/><rect x="22" y="40" width="9" height="15" rx="4" fill="#263238"/><rect x="69" y="40" width="9" height="15" rx="4" fill="#263238"/>`, // hodetelefoner
    `<path d="M30 32h40v9H30z" fill="#37474F"/><circle cx="41" cy="36.5" r="5" fill="#8FD3F4" stroke="#37474F" stroke-width="2"/><circle cx="59" cy="36.5" r="5" fill="#8FD3F4" stroke="#37474F" stroke-width="2"/>`, // vernebriller
    `<path d="M28 36c0-13 10-21 22-21s22 8 22 21z" fill="${AV_SHIRT[(o.sh + 3) % AV_SHIRT.length]}"/><path d="M50 32h28q2 5-4 6H50z" fill="${AV_SHIRT[(o.sh + 3) % AV_SHIRT.length]}"/>`, // caps
    `<path d="M33 24l5 9 6-11 6 11 6-11 6 11 5-9 1 13H32z" fill="#F2B51D" stroke="#C98B00" stroke-width="1.2"/>`                                           // krone
  ][o.a];
  return `<svg class="av ${extraClass}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs>
    <g clip-path="url(#${id})"><rect width="100" height="100" fill="${AV_BG[o.bg]}"/>${back}
    <path d="M16 104c0-22 15-32 34-32s34 10 34 32z" fill="${AV_SHIRT[o.sh]}"/><path d="M43 60h14v13q-7 5-14 0z" fill="${skin}"/>
    <circle cx="29.5" cy="47" r="4.5" fill="${skin}"/><circle cx="70.5" cy="47" r="4.5" fill="${skin}"/>
    <ellipse cx="50" cy="45" rx="20.5" ry="22.5" fill="${skin}"/>${beard}
    <circle cx="37" cy="53" r="3.6" fill="#F28B82" opacity=".35"/><circle cx="63" cy="53" r="3.6" fill="#F28B82" opacity=".35"/>
    ${eyes}${mouth}${top}${acc}</g></svg>`;
}

// ---------- lærerne ----------
const TEACHERS = {
  "Forkurs":                     { name: "Frida",      av: "1-2-2-1-0-1-1-5-0", nb: "grunnlaget",               en: "the foundations" },
  "Matematikk og fysikk":        { name: "Professor Pi", av: "0-4-5-2-0-1-4-2-1", nb: "matematikk og naturfag", en: "maths and science" },
  "Mekanikk og konstruksjon":    { name: "Ivar",       av: "2-0-1-0-1-2-2-6-2", nb: "mekanikk",                 en: "mechanics" },
  "Elektro og automasjon":       { name: "Elektra",    av: "3-5-6-2-1-4-5-3-0", nb: "elektro",                  en: "electrical engineering" },
  "Programmering og data":       { name: "Kai",        av: "4-7-0-3-0-3-0-0-0", nb: "programmering",            en: "programming" },
  "Energi og strømning":         { name: "Tina",       av: "0-1-4-0-1-5-7-1-0", nb: "energi og strømning",      en: "energy and fluids" },
  "Produktutvikling og økonomi": { name: "Dina",       av: "5-6-3-2-0-1-3-7-0", nb: "produktutvikling",         en: "product development" },
  "Samfunn og bærekraft":        { name: "Gro",        av: "1-3-4-1-0-0-1-5-0", nb: "bærekraft",                en: "sustainability" }
};
function teacherOf(code){ const c = COURSE(code); return TEACHERS[c.group] || TEACHERS["Matematikk og fysikk"]; }
const pickLine = arr => arr[Math.floor(Math.random() * arr.length)];
function teacherBubble(code, text, size = 52, cls = ""){
  const tc = teacherOf(code);
  return `<div class="tch ${cls}">${avatarSVG(tc.av, size, "tch-av")}<div class="tch-b"><b>${esc(tc.name)}</b><span>${text}</span></div></div>`;
}
const myAvatar = () => S.avatar || null;

// ---------- avatar-bygger ----------
let AVE = null; // { code, tab }
const AVE_TABS = [["s", "avSkin"], ["h", "avHair"], ["hc", "avHairColor"], ["e", "avEyes"], ["m", "avMouth"], ["f", "avBeard"], ["a", "avAcc"], ["sh", "avShirt"], ["bg", "avBg"]];
function openAvatarEditor(){ AVE = { code: S.avatar || avRandom(), tab: "h", back: screen }; screen = "avatar"; overlay = null; render(); window.scrollTo(0, 0); }
function renderAvatarEditor(){
  if(!AVE){ goHome(); return; }
  const o = avParse(AVE.code), k = AVE.tab;
  const colorTab = { s: AV_SKIN, hc: AV_HAIRC, sh: AV_SHIRT, bg: AV_BG }[k];
  const opts = Array.from({ length: AV_PARTS[k] }, (_, i) => {
    const on = o[k] === i;
    if(colorTab) return `<button class="ave-sw ${on ? "on" : ""}" data-a="avset" data-i="${i}" aria-label="${i + 1}" style="background:${colorTab[i]}"></button>`;
    const oo = Object.assign({}, o, { [k]: i });
    return `<button class="ave-opt ${on ? "on" : ""}" data-a="avset" data-i="${i}" aria-label="${i + 1}">${avatarSVG(avCode(oo), 56)}</button>`;
  }).join("");
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="avcancel" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="th-t"><small>${esc(t("avSub"))}</small><b>${esc(t("avTitle"))}</b></div><button class="iconbtn" data-a="avrandom" aria-label="${esc(t("avRandom"))}" title="${esc(t("avRandom"))}">${I.dice}</button></div></div>
    <main class="wrap ave">
      <div class="ave-prev">${avatarSVG(AVE.code, 150)}</div>
      <div class="ave-tabs">${AVE_TABS.map(([kk, lab]) => `<button class="${kk === k ? "on" : ""}" data-a="avtab" data-t="${kk}">${esc(t(lab))}</button>`).join("")}</div>
      <div class="ave-grid ${colorTab ? "colors" : ""}">${opts}</div>
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="avsave">${esc(t("avSave"))}</button></div></div>`;
}
function avatarClick(a, b){
  if(!a.startsWith("av")) return false;
  if(a === "avedit") openAvatarEditor();
  else if(a === "avtab"){ AVE.tab = b.dataset.t; render(); }
  else if(a === "avset"){ const o = avParse(AVE.code); o[AVE.tab] = +b.dataset.i; AVE.code = avCode(o); render(); }
  else if(a === "avrandom"){ AVE.code = avRandom(); render(); }
  else if(a === "avsave"){ S.avatar = AVE.code; save(); const back = AVE.back; AVE = null; toast(t("avSaved")); screen = back === "friends" ? "friends" : "settings"; if(screen === "friends") FR.rows = null; render(); window.scrollTo(0, 0); }
  else if(a === "avcancel"){ const back = AVE.back; AVE = null; screen = back === "friends" ? "friends" : "settings"; render(); }
  else return false;
  return true;
}
