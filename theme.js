// =====================================================================
//  Temafarge og bakgrunn: valgfri aksentfarge, bakgrunnsmønster og papirtone.
//  Reglene skrives som en egen <style> slik at lys og mørk modus får hver sin variant.
//  S.accent, S.bg og S.paper (tom = standard).
// =====================================================================
const TH_ACCENTS = [ // id, nb, en, lys [farge, mørk kant, myk], mørk [farge, kant, myk]
  ["blue", "Blå", "Blue", ["#2B59C3", "#1C3F91", "#DCE5F8"], ["#5E8BF0", "#3A64C4", "#1D2A44"]],
  ["indigo", "Indigo", "Indigo", ["#4B3FC9", "#33289A", "#E3E0FA"], ["#8C80FF", "#6155D6", "#25213F"]],
  ["purple", "Lilla", "Purple", ["#7A3FC2", "#592A93", "#EEE3FA"], ["#B07CF2", "#8352C7", "#2D2140"]],
  ["pink", "Rosa", "Pink", ["#C2347E", "#92205C", "#FBE0EE"], ["#F07AB4", "#C24E87", "#3D1D2D"]],
  ["red", "Rød", "Red", ["#C7382F", "#962720", "#FADFDC"], ["#F27068", "#C24840", "#3D1C1B"]],
  ["orange", "Oransje", "Orange", ["#D2600F", "#9E4608", "#FCE6D3"], ["#F59A4A", "#C77428", "#3D2716"]],
  ["amber", "Gul", "Amber", ["#B98100", "#8A5F00", "#FBEFCC"], ["#F2C14E", "#C29424", "#3A2F14"]],
  ["green", "Grønn", "Green", ["#21884C", "#166236", "#D9F1E2"], ["#4FCB82", "#2F9C5C", "#16321F"]],
  ["teal", "Turkis", "Teal", ["#0E8580", "#0A605D", "#D3F0EE"], ["#3FC9C1", "#23968F", "#123331"]],
  ["sky", "Himmel", "Sky", ["#1979B8", "#115887", "#D7ECF8"], ["#5CB4EE", "#3488BF", "#152C3C"]],
  ["slate", "Skifer", "Slate", ["#46566A", "#2F3B4A", "#E1E6EC"], ["#9AAABD", "#6E7E91", "#232A33"]],
];
const TH_PAPERS = [ // id, nb, en, lys bakgrunn, mørk bakgrunn
  ["", "Standard", "Default", "#EEF2EC", "#0F151B"],
  ["neutral", "Nøytral", "Neutral", "#F3F4F6", "#0A0B0D"],
  ["cream", "Krem", "Cream", "#F5EFE3", "#17130F"],
  ["sky", "Lyseblå", "Pale blue", "#E7EEF8", "#0B1324"],
  ["rose", "Rosa", "Rose", "#F7EAEE", "#1A0F15"],
  ["mint", "Mint", "Mint", "#E3F3EC", "#0B1712"],
  ["lilac", "Lavendel", "Lavender", "#EEEAF7", "#140F1D"],
];
const TH_BGS = [ // id, nb, en
  ["", "Rutenett", "Grid"], ["dots", "Prikker", "Dots"], ["lines", "Linjer", "Lines"], ["diag", "Skrå", "Diagonal"], ["glow", "Glød", "Glow"], ["plain", "Ensfarget", "Plain"],
];
function thCSS(){
  const v = (a, p) => `--accent:${a[0]};--accent-deep:${a[1]};--accent-soft:${a[2]};--u0:${a[0]};`;
  const dk = sel => `@media (prefers-color-scheme: dark){:root${sel}:not([data-theme="light"]){X}}:root${sel}[data-theme="dark"]{X}`;
  let css = "";
  for(const [id, , , l, d] of TH_ACCENTS) if(id !== "blue") css += `:root[data-acc="${id}"]{${v(l)}}` + dk(`[data-acc="${id}"]`).replace(/X/g, v(d));
  for(const [id, , , l, d] of TH_PAPERS) if(id) css += `:root[data-paper="${id}"]{--paper:${l}}` + dk(`[data-paper="${id}"]`).replace(/X/g, `--paper:${d}`);
  css += `:root[data-bg="dots"] body{background-image:radial-gradient(var(--grid) 1.6px,transparent 1.8px);background-size:18px 18px}
:root[data-bg="lines"] body{background-image:linear-gradient(var(--grid) 1px,transparent 1px);background-size:100% 28px}
:root[data-bg="diag"] body{background-image:repeating-linear-gradient(45deg,var(--grid) 0 1px,transparent 1px 16px);background-size:auto}
:root[data-bg="glow"] body{background-image:radial-gradient(900px 520px at 0% -10%,var(--accent-soft),transparent 70%),radial-gradient(700px 480px at 110% 30%,var(--accent-soft),transparent 65%);background-size:auto;background-attachment:fixed}
:root[data-bg="plain"] body{background-image:none}`;
  return css;
}
function thApply(){
  const de = document.documentElement;
  if(!document.getElementById("th-css")){ const st = document.createElement("style"); st.id = "th-css"; st.textContent = thCSS(); document.head.appendChild(st); }
  const set = (k, v) => v ? de.setAttribute(k, v) : de.removeAttribute(k);
  set("data-acc", S.accent && S.accent !== "blue" ? S.accent : ""); set("data-paper", S.paper || ""); set("data-bg", S.bg || "");
}
const thAccent = () => TH_ACCENTS.find(a => a[0] === (S.accent || "blue")) || TH_ACCENTS[0];
function thSettingsHTML(){
  const acc = S.accent || "blue", pap = S.paper || "", bg = S.bg || "";
  const sw = (a, on, id, style, label) => `<button class="th-sw ${on ? "on" : ""}" data-a="${a}" data-v="${id}" style="${style}" aria-pressed="${on}" aria-label="${esc(label)}" title="${esc(label)}"></button>`;
  return `<div class="srow th-row"><span class="lbl">${esc(T("Temafarge", "Accent colour"))}</span><div class="th-sws">${TH_ACCENTS.map(a => sw("thacc", acc === a[0], a[0], `background:${a[3][0]}`, T(a[1], a[2]))).join("")}</div></div>
    <div class="srow th-row"><span class="lbl">${esc(T("Bakgrunnsfarge", "Background colour"))}</span><div class="th-sws">${TH_PAPERS.map(p => sw("thpaper", pap === p[0], p[0], `background:linear-gradient(135deg,${p[3]} 50%,${p[4]} 50%)`, T(p[1], p[2]))).join("")}</div></div>
    <div class="srow th-row"><span class="lbl">${esc(T("Bakgrunnsmønster", "Background pattern"))}</span><div class="th-bgs">${TH_BGS.map(b => `<button class="th-bg ${bg === b[0] ? "on" : ""}" data-a="thbg" data-v="${b[0]}" aria-pressed="${bg === b[0]}"><i class="th-bgi" data-p="${b[0] || "grid"}"></i>${esc(T(b[1], b[2]))}</button>`).join("")}</div></div>`;
}
function thClick(a, b){
  if(a === "thacc"){ S.accent = b.dataset.v === "blue" ? "" : b.dataset.v; }
  else if(a === "thpaper"){ S.paper = b.dataset.v; }
  else if(a === "thbg"){ S.bg = b.dataset.v; }
  else return false;
  save(); render(); return true;
}
