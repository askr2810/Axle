// ============================================================
//  LÆRINGSKART (AX-22): forslag til læringsveier gjennom fagene som finnes i Axle.
//  Rent data – tegnes av laeringskart.js og blir egne sider i tools/seo.js. Sjekkes av tools/test_laeringskart.js.
//  Nytt kart (elektro, bygg …): legg til et objekt i LK_MAPS med samme felt.
//   id        brukes i adressen (#/laeringskart/<id>) og på den åpne siden (axle.no/laeringskart/<id>/)
//   t, intro  tittel og kort ingress (bokmål)
//   sections  [{ id, t, sub }] – trinn i rekkefølge, ovenfra og ned
//   nodes     [{ id, sec, t, code?, why }] – code = fagkoden i COURSES (lenkes til fagets teoriside).
//             Uten code vises noden som «kommer» (faget finnes ikke i Axle ennå). Ikke finn på innhold.
//   edges     [[fra, til], …] – «til» bygger på «fra» (forkunnskap). Bare mellom noder i samme kart.
//  Rekkefølgen i VGS følger LK20: 1T (vg1) → R1 og Fysikk 1 (vg2) → R2 og Fysikk 2 (vg3).
// ============================================================
const LK_DISCLAIMER = "Forslag til læringsvei, ikke et offisielt studieløp. Innholdet er AI-laget og ikke kvalitetssikret av lærere.";
const LK_MAPS = [
  {
    id: "maskiningenior",
    t: "Veien til maskiningeniør",
    intro: "Fra matte og fysikk på videregående til de sentrale ingeniørfagene i en maskinbachelor. Hvert steg bygger på de forrige.",
    sections: [
      { id: "vg1", t: "Vg1", sub: "Felles grunnlag" },
      { id: "vg2", t: "Vg2", sub: "Programfag: R1 og Fysikk 1" },
      { id: "vg3", t: "Vg3", sub: "Programfag: R2 og Fysikk 2" },
      { id: "aar1", t: "1. studieår", sub: "Matematikk, mekanikk og programmering" },
      { id: "aar2", t: "2. studieår", sub: "Kjernefagene i maskinfaget" },
      { id: "aar3", t: "Fordypning", sub: "Konstruksjon, energi og beregning" }
    ],
    nodes: [
      { id: "1t", sec: "vg1", t: "Matematikk 1T", code: "VG1T", why: "Algebra, funksjoner og trigonometri du trenger videre." },
      { id: "r1", sec: "vg2", t: "Matematikk R1", code: "VGR1", why: "Derivasjon, vektorer og logaritmer." },
      { id: "fy1", sec: "vg2", t: "Fysikk 1", code: "VGFY1", why: "Bevegelse, krefter og energi." },
      { id: "r2", sec: "vg3", t: "Matematikk R2", code: "VGR2", why: "Integrasjon, rekker og differensiallikninger." },
      { id: "fy2", sec: "vg3", t: "Fysikk 2", code: "VGFY2", why: "Kast, sirkelbevegelse og elektromagnetisme." },
      { id: "mat1", sec: "aar1", t: "Matematikk 1000", code: "MEK1000", why: "Kalkulus på ingeniørnivå." },
      { id: "mek", sec: "aar1", t: "Mekanikk: statikk og dynamikk", code: "MAPE1300", why: "Likevekt, fagverk, bjelker og bevegelse." },
      { id: "fys", sec: "aar1", t: "Fysikk", code: "MEK1400", why: "Svingninger, bølger og rotasjon." },
      { id: "prog1", sec: "aar1", t: "Programmering 1", code: "MEK1300", why: "Python fra bunnen av." },
      { id: "mat", sec: "aar1", t: "Materialteknologi", code: "MATS1500", why: "Struktur og mekaniske egenskaper til materialer." },
      { id: "cad", sec: "aar1", t: "Teknisk tegning og CAD", why: "Tegningslesing og 3D-modellering." },
      { id: "linalg", sec: "aar2", t: "Matematikk 2000: lineær algebra og differensiallikninger", code: "MEK2000", why: "Matriser, egenverdier og differensiallikninger." },
      { id: "fast", sec: "aar2", t: "Fasthetslære", code: "FAST", why: "Spenning, tøyning, bøyning og knekking." },
      { id: "termo", sec: "aar2", t: "Termodynamikk", code: "MATS2100", why: "Energi, entropi og kretsprosesser." },
      { id: "fluid", sec: "aar2", t: "Fluidmekanikk", code: "FLUID", why: "Trykk, Bernoulli og rørstrømning." },
      { id: "stat", sec: "aar2", t: "Statistikk og risikoanalyse", code: "MEK2200", why: "Sannsynlighet, fordelinger og regresjon." },
      { id: "prog2", sec: "aar2", t: "Programmering 2", code: "MEK3100", why: "Algoritmer og numerikk med NumPy." },
      { id: "mat3", sec: "aar2", t: "Matematikk 3000", code: "DAVE3700", why: "Partielle deriverte, multiple integraler og vektoranalyse." },
      { id: "design", sec: "aar3", t: "Mekanisk design", code: "MATS1600", why: "Dimensjonering og maskinelementer." },
      { id: "sving", sec: "aar3", t: "Maskindynamikk og svingninger", code: "SVING", why: "Frie, dempede og tvungne svingninger." },
      { id: "varme", sec: "aar3", t: "Varmeoverføring", code: "VARME", why: "Ledning, konveksjon og stråling." },
      { id: "num", sec: "aar3", t: "Numeriske metoder", code: "NUM", why: "Regn ut det som ikke kan løses for hånd." },
      { id: "fem", sec: "aar3", t: "Elementmetoden", code: "FEM", why: "Beregning av konstruksjoner med datamaskin." },
      { id: "kyb", sec: "aar3", t: "Kybernetikk", code: "ELFT2400", why: "Regulering og PID." },
      { id: "prod", sec: "aar3", t: "Produktutvikling", code: "PROD", why: "Fra kundebehov til ferdig produkt." },
      { id: "tilv", sec: "aar3", t: "Produksjonsteknikk", why: "Maskinering, støping og sammenføying." }
    ],
    edges: [
      ["1t", "r1"], ["1t", "fy1"], ["r1", "r2"], ["r1", "fy1"], ["fy1", "fy2"], ["r2", "fy2"],
      ["r2", "mat1"], ["fy2", "mek"], ["r2", "mek"], ["fy2", "fys"], ["mat1", "fys"], ["1t", "prog1"], ["fy1", "mat"],
      ["mat1", "linalg"], ["mek", "fast"], ["mat", "fast"], ["fys", "termo"], ["mat1", "termo"], ["mek", "fluid"], ["mat1", "fluid"],
      ["mat1", "stat"], ["prog1", "prog2"], ["mat1", "mat3"],
      ["fast", "design"], ["cad", "design"], ["mek", "sving"], ["linalg", "sving"], ["termo", "varme"], ["fluid", "varme"],
      ["linalg", "num"], ["prog2", "num"], ["fast", "fem"], ["num", "fem"], ["linalg", "kyb"], ["design", "prod"], ["mat", "tilv"]
    ]
  }
];
const lkMap = id => LK_MAPS.find(m => m.id === id) || null;
const lkPrereq = (m, id) => m.edges.filter(e => e[1] === id).map(e => m.nodes.find(n => n.id === e[0])).filter(Boolean);
if(typeof module !== "undefined") module.exports = { LK_MAPS, LK_DISCLAIMER, lkMap, lkPrereq };
