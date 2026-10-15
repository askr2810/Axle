// ============================================================
//  BILDER I EGNE QUIZER OG LEKSER (oppgave 35) – som på Kahoot: læreren legger et bilde til et spørsmål.
//  • Bildet lagres i Supabase Storage, bøtta «quizbilder» (supabase/laerer.sql), i mappa til den som laster opp.
//    Spørsmålet får img = "<bruker-id>/<bilde-id>.webp|jpg" og alt = bildetekst for skjermleser.
//  • Appen viser bare bilder fra denne bøtta, aldri vilkårlige adresser (feltet kan ellers inneholde hva som helst).
//  • Før opplasting skaleres bildet ned (maks 1280 px) og lagres på nytt i nettleseren. Da blir det lite, og
//    EXIF-data (f.eks. GPS-posisjon og kameraets serienummer) blir ikke med.
//  • Elevkontoer kan ikke laste opp bilder (også stoppet i databasen). Uten SQL-oppsettet sier appen fra i stedet for å feile.
//  Brukes av redigeringen i Fellesskap (community.js, w = "cc") og lærerens oppgaver (teach.js, w = "te").
// ============================================================
const QIMG_BUCKET = "quizbilder", QIMG_MAX = 1280, QIMG_BYTES = 400 * 1024;
const QIMG_RE = /^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(webp|jpg)$/;
const qimgOk = p => typeof p === "string" && QIMG_RE.test(p);
const qimgURL = p => qimgOk(p) && CONFIG.supabaseUrl ? `${CONFIG.supabaseUrl}/storage/v1/object/public/${QIMG_BUCKET}/${p}` : "";
// Bildet til et lagret spørsmål ({ img, alt }) som det følger med en oppgave (it.qimg), eller null.
const qimgOf = x => x && qimgOk(x.img) ? { src: x.img, alt: String(x.alt || "").trim().slice(0, 200) } : null;
// Feltene som lagres med spørsmålet (tomt objekt uten bilde, så gamle spørsmål er uendret).
const qimgKeep = x => qimgOk(x && x.img) ? { img: x.img, alt: String(x.alt || "").trim().slice(0, 200) } : {};
function qimgHTML(im, cls = ""){
  const u = im && qimgURL(im.src); if(!u) return "";
  return `<figure class="qimg ${cls}"><img src="${esc(u)}" alt="${esc(im.alt || T("Bilde til oppgaven", "Image for the question"))}" decoding="async"></figure>`;
}
const qimgCan = () => !!(CLOUD_ON && AUTH && !isElev());
// Bildedelen i redigeringen av ett spørsmål.
function qimgEditHTML(x, w, i){
  const im = qimgOf(x), busy = QIMG.busy === w + i, d = `data-w="${w}" data-i="${i}"`;
  if(im) return `<div class="qimg-ed">${qimgHTML(im, "sm")}<label class="cc-lbl">${esc(T("Bildetekst for skjermleser", "Image description for screen readers"))}
      <input data-qalt ${d} maxlength="200" value="${esc(im.alt)}" placeholder="${esc(T("F.eks. «Trekant med sidene 3, 4 og 5 cm»", "E.g. 'Triangle with sides 3, 4 and 5 cm'"))}"></label>
      <button class="exlink" data-a="qimgdel" ${d}>${esc(T("Fjern bildet", "Remove the image"))}</button></div>`;
  if(!qimgCan()) return "";
  return `<div class="qimg-ed"><button class="te-more" data-a="qimgadd" ${d} ${busy ? "disabled" : ""}>${busy ? esc(T("Laster opp …", "Uploading …")) : "＋ " + esc(T("Bilde (valgfritt)", "Image (optional)"))}</button>
    ${QIMG.err && QIMG.err.k === w + i ? `<p class="du-err">${esc(QIMG.err.m)}</p>` : ""}
    <small class="cc-help">${esc(T("Bruk bare bilder du har lov til å bruke, og ikke bilder av elever eller andre personer uten samtykke.", "Only use images you are allowed to use, and no pictures of pupils or other people without consent."))}</small></div>`;
}
// trash: bilder som er fjernet eller byttet ut; de slettes først når quizen er lagret (qimgFlush), så en lagret quiz aldri peker på et slettet bilde.
const QIMG = { busy: null, err: null, trash: [] };
// Spørsmålet knappen hører til.
const qimgTarget = (w, i) => w === "te" ? (typeof TE !== "undefined" && TE && TE.qs[+i]) : (typeof CC !== "undefined" && CC && CC.qedit && CC.qedit.x);
const qimgDraft = w => { if(w === "te" && typeof teDraft === "function") teDraft(); };
async function qimgShrink(file){
  const url = URL.createObjectURL(file);
  try{
    const img = await new Promise((ok, bad) => { const el = new Image(); el.onload = () => ok(el); el.onerror = bad; el.src = url; });
    const s = Math.min(1, QIMG_MAX / Math.max(img.naturalWidth, img.naturalHeight)), w = Math.max(1, Math.round(img.naturalWidth * s)), h = Math.max(1, Math.round(img.naturalHeight * s));
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h; const g = cv.getContext("2d");
    g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h); // hvit bakgrunn bak gjennomsiktige PNG-er
    for(const [type, ext] of [["image/webp", "webp"], ["image/jpeg", "jpg"]]) for(const q of [0.82, 0.7, 0.55]){
      const b = await new Promise(r => cv.toBlob(r, type, q)); if(b && b.type === type && b.size <= QIMG_BYTES) return { blob: b, ext }; } // Safari lager ikke WebP: da blir det JPEG
    throw new Error("big");
  } finally { URL.revokeObjectURL(url); }
}
const qimgUuid = () => (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
async function qimgUpload(w, i, file){
  const k = w + i; QIMG.busy = k; QIMG.err = null; render();
  try{
    if(!/^image\//.test(file.type)) throw new Error("type");
    const { blob, ext } = await qimgShrink(file), path = `${AUTH.uid}/${qimgUuid()}.${ext}`;
    await sbFetch(`/storage/v1/object/${QIMG_BUCKET}/${path}`, { method: "POST", body: blob, headers: { "Content-Type": blob.type, "x-upsert": "false" } }, await authToken());
    const x = qimgTarget(w, i); if(x){ if(qimgOk(x.img)) QIMG.trash.push(x.img); x.img = path; x.alt = x.alt || ""; qimgDraft(w); }
  }catch(e){
    const m = e && e.message === "type" ? T("Velg en bildefil (JPG, PNG, WebP eller HEIC som nettleseren kan åpne).", "Choose an image file (JPG, PNG, WebP or HEIC your browser can open).")
      : e && e.message === "big" ? T("Bildet ble for stort selv etter nedskalering. Prøv et enklere bilde.", "The image is too large even after resizing. Try a simpler one.")
      : e && e.kind === "offline" ? T("Ingen nettforbindelse. Prøv igjen.", "No connection. Try again.")
      : T("Bildeopplasting er ikke slått på ennå. Prøv igjen senere.", "Image upload is not switched on yet. Try again later.");
    QIMG.err = { k, m };
  }
  QIMG.busy = null; render();
}
// Sletter et opplastet bilde (best effort: står det igjen, gjør det ingen skade).
async function qimgRemove(path){ if(!qimgOk(path) || !AUTH || !path.startsWith(AUTH.uid + "/")) return;
  try{ await sbFetch(`/storage/v1/object/${QIMG_BUCKET}/${path}`, { method: "DELETE" }, await authToken()); }catch(e){} }
// Etter vellykket lagring: slett bildene som ikke lenger brukes i de lagrede spørsmålene. Er quizen delt med andre, slettes ingenting,
// fordi en kopi (lekse_copy) kan peke på de samme bildene. Søppellista tømmes også når en annen quiz åpnes (qimgReset).
function qimgFlush(saved, shared){ const used = new Set((saved || []).map(x => x && x.img).filter(Boolean)); if(!shared) QIMG.trash.filter(p => !used.has(p)).forEach(qimgRemove); QIMG.trash = []; }
const qimgReset = () => { QIMG.trash = []; QIMG.err = null; QIMG.busy = null; };
function qimgClick(a, b){
  if(a === "qimgadd"){ const w = b.dataset.w, i = b.dataset.i, inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    inp.addEventListener("change", () => { const f = inp.files && inp.files[0]; if(f) qimgUpload(w, i, f); }); inp.click(); return true; }
  if(a === "qimgdel"){ const x = qimgTarget(b.dataset.w, b.dataset.i); if(x){ if(qimgOk(x.img)) QIMG.trash.push(x.img); delete x.img; delete x.alt; qimgDraft(b.dataset.w); } render(); return true; }
  return false;
}
// Bildeteksten oppdateres mens man skriver (uten ny tegning, så markøren blir stående).
document.addEventListener("input", e => { const el = e.target; if(!el || !el.matches || !el.matches("[data-qalt]")) return;
  const x = qimgTarget(el.dataset.w, el.dataset.i); if(x){ x.alt = el.value.slice(0, 200); qimgDraft(el.dataset.w); } });
