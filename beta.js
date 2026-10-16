// ---------- BETA: fag der feil kan gjøre skade (førerkort, helse, jus) ----------
// Innholdet er ikke gjennomgått av fagperson ennå. Vi viser det tydelig, med kildene vi har kontrollert mot og datoen.
// Når en fagperson har gått gjennom et område: sett reviewedBy (navn/rolle) og oppdater checked, så forsvinner BETA-merket.
const BETA_AREAS = {
  forer: { checked: "2026-10-10", reviewedBy: "", who: ["lovteksten, Statens vegvesen og kjørelæreren din", "the law, the Norwegian Public Roads Administration and your driving instructor"],
    src: [["Vegtrafikkloven og trafikkreglene (Lovdata)", "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747"],
          ["Skiltforskriften (Lovdata)", "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219"],
          ["Statens vegvesen: førerkort og teoriprøve", "https://www.vegvesen.no/forerkort/"]] },
  syk: { checked: "2026-10-10", reviewedBy: "", who: ["Felleskatalogen, lokale prosedyrer, lærebok og veileder", "the drug reference, local procedures, your textbook and supervisor"],
    src: [["Felleskatalogen", "https://www.felleskatalogen.no/"],
          ["Helsedirektoratet", "https://www.helsedirektoratet.no/"],
          ["NEWS2 (Royal College of Physicians)", "https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/"]] },
  jus: { checked: "2026-10-10", reviewedBy: "", who: ["lovteksten, rettspraksis og pensum", "the statute, case law and your syllabus"],
    src: [["Lovdata (gjeldende lover)", "https://lovdata.no/"],
          ["Domstol.no", "https://www.domstol.no/"]] }
};
// Fag med mange nye oppgaver (egne oppgaver på hvert nivå, add_zlv_*.js, okt. 2026) som faglærer ikke har sett på ennå.
// Fjern koden fra lista når en faglærer har gått gjennom faget. Førerkort, helse og jus dekkes av områdene over.
BETA_AREAS.nye = { checked: "2026-10-16", reviewedBy: "", newq: true,
  codes: ["ARKF", "ARKH", "ARKT", "GEO", "GS57", "GSNAT", "GUNAT", "OBED", "OMAT", "OREG", "OSAM", "OSTAT", "PROD", "STKD6610",
          "VG1P", "VG2P", "VGBI1", "VGBI2", "VGGEO", "VGHIS", "VGKJ1", "VGKJ2", "VGNAT", "VGNOR", "VGR2", "VGREL", "VGSAMF"],
  who: ["læreboka og faglæreren din", "your textbook and teacher"], src: [] };
const betaArea = c => { const a = BETA_AREAS[c.study]; if(a && !a.reviewedBy) return a; const n = BETA_AREAS.nye; return !n.reviewedBy && n.codes.includes(c.code) ? n : null; };
function betaOf(code){
  const c = typeof COURSE === "function" ? COURSE(code) : null; return c ? betaArea(c) : null;
}
const betaDate = iso => { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; };
function betaTagHTML(code){ const a = betaOf(code); return a ? `<span class="betatag" title="${esc(a.newq ? T("Nye oppgaver, ikke kontrollert av faglærer ennå", "New questions, not yet reviewed by a teacher") : T("Ikke kontrollert av fagperson ennå", "Not yet reviewed by an expert"))}">BETA</span>` : ""; }
function betaNoteHTML(code){
  const a = betaOf(code); if(!a) return "";
  const src = a.src.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(", ");
  const head = a.newq ? T("Nye oppgaver, ikke kontrollert av faglærer ennå", "New questions, not yet reviewed by a teacher") : T("Ikke kontrollert av fagperson ennå", "Not yet reviewed by an expert");
  const intro = a.newq ? T(`Mange av oppgavene i dette faget er nye og er ikke gjennomgått av en faglærer ennå, så det kan forekomme feil. Ved tvil gjelder alltid ${a.who[0]}.`, `Many of the questions in this subject are new and have not yet been reviewed by a teacher, so mistakes can occur. When in doubt, ${a.who[1]} always apply.`)
    : T(`Vi har sjekket innholdet mot offisielle kilder, men det kan forekomme feil. Ved tvil gjelder alltid ${a.who[0]}.`, `We have checked the content against official sources, but mistakes can occur. When in doubt, ${a.who[1]} always apply.`);
  // Kort linje som standard; «Les mer» folder ut forklaring, kilder og dato
  return `<details class="beta-note"><summary><span class="betatag">BETA</span><b>${esc(head)}</b><span class="beta-more"><span class="bm-o">${esc(T("Les mer", "Read more"))}</span><span class="bm-c">${esc(T("Skjul", "Hide"))}</span></span></summary>
    <div class="beta-body"><p>${esc(intro)}</p>
    ${src ? `<p class="beta-src">${esc(T("Kilder", "Sources"))}: ${src}</p>` : ""}
    <p class="beta-src">${esc(a.newq ? T("Lagt til", "Added") : T("Sist kontrollert", "Last checked"))} ${betaDate(a.checked)} · <button class="linkbtn" data-a="feedback">${esc(T("Meld fra om feil", "Report a mistake"))}</button></p></div></details>`;
}
