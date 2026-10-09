// ---------- BETA: fag der feil kan gjøre skade (førerkort, helse, jus) ----------
// Innholdet er ikke gjennomgått av fagperson ennå. Vi viser det tydelig, med kildene vi har kontrollert mot og datoen.
// Når en fagperson har gått gjennom et område: sett reviewedBy (navn/rolle) og oppdater checked, så forsvinner BETA-merket.
const BETA_AREAS = {
  forer: { checked: "2026-10-09", reviewedBy: "", who: ["lovteksten, Statens vegvesen og kjørelæreren din", "the law, the Norwegian Public Roads Administration and your driving instructor"],
    src: [["Vegtrafikkloven og trafikkreglene (Lovdata)", "https://lovdata.no/dokument/SF/forskrift/1986-03-21-747"],
          ["Skiltforskriften (Lovdata)", "https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219"],
          ["Statens vegvesen: førerkort og teoriprøve", "https://www.vegvesen.no/forerkort/"]] },
  syk: { checked: "2026-10-09", reviewedBy: "", who: ["Felleskatalogen, lokale prosedyrer, lærebok og veileder", "the drug reference, local procedures, your textbook and supervisor"],
    src: [["Felleskatalogen", "https://www.felleskatalogen.no/"],
          ["Helsedirektoratet", "https://www.helsedirektoratet.no/"],
          ["NEWS2 (Royal College of Physicians)", "https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/"]] },
  jus: { checked: "2026-10-09", reviewedBy: "", who: ["lovteksten, rettspraksis og pensum", "the statute, case law and your syllabus"],
    src: [["Lovdata (gjeldende lover)", "https://lovdata.no/"],
          ["Domstol.no", "https://www.domstol.no/"]] }
};
function betaOf(code){
  const c = typeof COURSE === "function" ? COURSE(code) : null; if(!c) return null;
  const a = BETA_AREAS[c.study]; return a && !a.reviewedBy ? a : null;
}
const betaDate = iso => { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; };
function betaTagHTML(code){ return betaOf(code) ? `<span class="betatag" title="${esc(T("Ikke kontrollert av fagperson ennå", "Not yet reviewed by an expert"))}">BETA</span>` : ""; }
function betaNoteHTML(code, compact){
  const a = betaOf(code); if(!a) return "";
  const src = a.src.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(", ");
  return `<aside class="beta-note${compact ? " compact" : ""}" role="note"><span class="betatag">BETA</span><div>
    <b>${esc(T("Ikke kontrollert av fagperson ennå", "Not yet reviewed by an expert"))}</b>
    <p>${esc(T(`Vi har sjekket innholdet mot offisielle kilder, men det kan forekomme feil. Ved tvil gjelder alltid ${a.who[0]}.`, `We have checked the content against official sources, but mistakes can occur. When in doubt, ${a.who[1]} always apply.`))}</p>
    ${compact ? "" : `<p class="beta-src">${esc(T("Kilder", "Sources"))}: ${src}</p>`}
    <p class="beta-src">${esc(T("Sist kontrollert", "Last checked"))} ${betaDate(a.checked)} · <button class="linkbtn" data-a="feedback">${esc(T("Meld fra om feil", "Report a mistake"))}</button></p></div></aside>`;
}
