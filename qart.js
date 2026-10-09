// ============================================================
//  qart.js – en illustrasjon på (nesten) hver oppgave.
//  1) Har oppgaven selv en figur, brukes den.
//  2) Ellers en figur fra emnet oppgaven handler om (emnesidene og FIG_MAP for enheten).
//  3) Ellers et enkelt linje-piktogram for temaet (derivasjon, brøk, krefter, kjemi, jus, trafikk …),
//     valgt fra enhetens tittel, så man ser med en gang hva oppgaven dreier seg om.
//  Piktogrammene er tegnet i 64 × 64 med to farger: strek i tekstfarge og aksent (qp-a / qp-g / qp-f).
// ============================================================
const QP_SVG = (p) => `<svg viewBox="0 0 64 64" class="qp" aria-hidden="true">${p}</svg>`;
const QP = {
  deriv: '<path d="M8 54h50M10 56V8" class="qp-m"/><path d="M12 48C22 46 30 38 36 26S48 12 56 10"/><path d="M18 46 54 18" class="qp-a"/><circle cx="34" cy="30" r="4" class="qp-gf"/>',
  integral: '<path d="M18 54V36c6-6 12-8 18-6s10 4 14 4v20z" class="qp-sf"/><path d="M8 54h50M10 56V8" class="qp-m"/><path d="M12 42C20 30 30 26 38 30s12 4 18 2"/><path d="M18 36v18M50 34v20" class="qp-a"/>',
  limit: '<path d="M8 32h48" class="qp-m qp-dash"/><path d="M8 52C20 48 26 38 34 34S48 32 58 32" class="qp-a"/><circle cx="14" cy="50" r="2.5" class="qp-gf"/><circle cx="24" cy="44" r="2.5" class="qp-gf"/><circle cx="34" cy="36" r="2.5" class="qp-gf"/><circle cx="44" cy="33" r="2.5" class="qp-gf"/>',
  complex: '<path d="M8 32h48M32 56V8" class="qp-m"/><path d="M32 32 48 16" class="qp-a"/><circle cx="48" cy="16" r="4" class="qp-gf"/><path d="M48 16v16M32 16h16" class="qp-m qp-dash"/>',
  fraction: '<circle cx="32" cy="32" r="22"/><path d="M32 32V10A22 22 0 0 1 53 38z" class="qp-gfill"/><path d="M32 10v22l21 6"/>',
  percent: '<circle cx="20" cy="20" r="7" class="qp-a"/><circle cx="44" cy="44" r="7" class="qp-a"/><path d="M48 12 16 52"/>',
  power: '<rect x="8" y="24" width="30" height="30" class="qp-sf"/><path d="M8 24h30v30H8zM18 24v30M28 24v30M8 34h30M8 44h30"/><path d="M36 14h4l4 8 6-16h10" class="qp-a"/>',
  equation: '<path d="M32 12v40M20 56h24M10 18h44"/><circle cx="32" cy="12" r="3.5" class="qp-gf"/><path d="M10 18l-6 14M10 18l6 14M54 18l-6 14M54 18l6 14" class="qp-m"/><path d="M2 32h16a8 8 0 0 1-16 0zM46 32h16a8 8 0 0 1-16 0z" class="qp-f"/><path d="M2 32h16a8 8 0 0 1-16 0zM46 32h16a8 8 0 0 1-16 0z"/><rect x="5" y="23" width="10" height="9" rx="1.5" class="qp-af"/><circle cx="50" cy="29" r="2.6" class="qp-gf"/><circle cx="56" cy="29" r="2.6" class="qp-gf"/><circle cx="53" cy="24.5" r="2.6" class="qp-gf"/>',
  linear: '<path d="M8 54h50M10 56V8" class="qp-m"/><path d="M12 50 56 14" class="qp-a"/><path d="M26 39h12v-10" class="qp-m qp-dash"/>',
  func: '<path d="M8 54h50M10 56V8" class="qp-m"/><path d="M12 14C20 50 28 54 34 40S46 12 56 18" class="qp-a"/>',
  exp: '<path d="M8 54h50M10 56V8" class="qp-m"/><path d="M12 50C28 50 38 44 44 34S52 14 54 8" class="qp-a"/><path d="M12 30C20 18 30 14 56 12" class="qp-g"/>',
  trig: '<path d="M10 52h40V18z" class="qp-f"/><path d="M10 52h40V18z"/><path d="M44 52v-6h6" class="qp-m"/><path d="M22 52a12 12 0 0 0-2-7" class="qp-a"/>',
  circle: '<circle cx="32" cy="32" r="22"/><path d="M8 32h48M32 8v48" class="qp-m"/><path d="M32 32 48 16" class="qp-a"/><circle cx="48" cy="16" r="3.5" class="qp-gf"/><path d="M40 32a8 8 0 0 0-2-6" class="qp-a"/>',
  vector: '<path d="M12 52 44 20" class="qp-a"/><path d="M44 20h-10M44 20v10" class="qp-a"/><path d="M12 52h38" /><path d="M50 52l-7-4M50 52l-7 4"/><path d="M44 20v32" class="qp-m qp-dash"/>',
  stats: '<path d="M8 56h50" class="qp-m"/><rect x="12" y="34" width="8" height="22" class="qp-sf"/><rect x="26" y="20" width="8" height="36" class="qp-sf"/><rect x="40" y="28" width="8" height="28" class="qp-sf"/><path d="M12 30 30 14l14 10 12-10" class="qp-a"/>',
  normal: '<path d="M8 54h50" class="qp-m"/><path d="M8 52C18 52 22 14 32 14S46 52 56 52" class="qp-a"/><path d="M32 14v40" class="qp-m qp-dash"/>',
  dice: '<rect x="8" y="18" width="28" height="28" rx="6" class="qp-f"/><rect x="8" y="18" width="28" height="28" rx="6"/><rect x="30" y="10" width="26" height="26" rx="6" class="qp-f"/><rect x="30" y="10" width="26" height="26" rx="6"/><circle cx="16" cy="26" r="2.4" class="qp-gf"/><circle cx="28" cy="38" r="2.4" class="qp-gf"/><circle cx="22" cy="32" r="2.4" class="qp-gf"/><circle cx="38" cy="18" r="2.4" class="qp-af"/><circle cx="48" cy="28" r="2.4" class="qp-af"/>',
  matrix: '<path d="M16 10h-6v44h6M48 10h6v44h-6"/><circle cx="22" cy="20" r="3" class="qp-af"/><circle cx="32" cy="20" r="3"/><circle cx="42" cy="20" r="3"/><circle cx="22" cy="32" r="3"/><circle cx="32" cy="32" r="3" class="qp-af"/><circle cx="42" cy="32" r="3"/><circle cx="22" cy="44" r="3"/><circle cx="32" cy="44" r="3"/><circle cx="42" cy="44" r="3" class="qp-af"/>',
  ode: '<path d="M6 32h52" class="qp-m"/><path d="M8.0 12.0L8.6 12.8L9.2 14.3L9.9 16.4L10.5 19.0L11.1 22.0L11.8 25.3L12.4 28.6L13.0 32.0L13.6 35.2L14.2 38.2L14.9 40.8L15.5 43.0L16.1 44.6L16.8 45.7L17.4 46.3L18.0 46.2L18.6 45.7L19.2 44.6L19.9 43.1L20.5 41.2L21.1 39.1L21.8 36.8L22.4 34.4L23.0 32.0L23.6 29.7L24.2 27.6L24.9 25.7L25.5 24.2L26.1 23.0L26.8 22.2L27.4 21.8L28.0 21.9L28.6 22.3L29.2 23.0L29.9 24.1L30.5 25.4L31.1 26.9L31.8 28.6L32.4 30.3L33.0 32.0L33.6 33.6L34.2 35.1L34.9 36.5L35.5 37.6L36.1 38.4L36.8 39.0L37.4 39.2L38.0 39.2L38.6 38.9L39.2 38.4L39.9 37.6L40.5 36.7L41.1 35.6L41.8 34.4L42.4 33.2L43.0 32.0L43.6 30.8L44.2 29.8L44.9 28.8L45.5 28.0L46.1 27.5L46.8 27.1L47.4 26.9L48.0 26.9L48.6 27.1L49.2 27.5L49.9 28.0L50.5 28.7L51.1 29.4L51.8 30.3L52.4 31.1L53.0 32.0L53.6 32.8L54.2 33.6L54.9 34.3L55.5 34.8L56.1 35.2L56.8 35.5L57.4 35.7L58.0 35.7" class="qp-a"/><circle cx="8" cy="12" r="4" class="qp-gf"/>',
  code: '<rect x="6" y="12" width="52" height="40" rx="6"/><path d="M6 22h52" class="qp-m"/><path d="M22 30l-7 7 7 7M42 30l7 7-7 7" class="qp-a"/><path d="M35 28l-6 18" class="qp-g"/>',
  logic: '<path d="M14 14h14a18 18 0 0 1 0 36H14z" class="qp-f"/><path d="M14 14h14a18 18 0 0 1 0 36H14z"/><path d="M6 24h8M6 40h8M46 32h12" class="qp-a"/>',
  network: '<path d="M18 18l14 10M46 18 32 28M32 28v16M18 18l14 26M46 18 32 44" class="qp-a"/><circle cx="16" cy="16" r="6" class="qp-f"/><circle cx="16" cy="16" r="6"/><circle cx="48" cy="16" r="6" class="qp-f"/><circle cx="48" cy="16" r="6"/><circle cx="32" cy="48" r="6" class="qp-f"/><circle cx="32" cy="48" r="6"/><circle cx="32" cy="28" r="4.5" class="qp-gf"/><circle cx="32" cy="28" r="4.5"/>',
  database: '<path d="M14 14v36c0 3.3 8 6 18 6s18-2.7 18-6V14z" class="qp-f"/><path d="M14 14v36c0 3.3 8 6 18 6s18-2.7 18-6V14"/><ellipse cx="32" cy="14" rx="18" ry="6" class="qp-sf"/><ellipse cx="32" cy="14" rx="18" ry="6"/><path d="M14 26c0 3.3 8 6 18 6s18-2.7 18-6M14 38c0 3.3 8 6 18 6s18-2.7 18-6" class="qp-a"/>',
  security: '<path d="M32 8 12 16v14c0 12 8 22 20 26 12-4 20-14 20-26V16z" class="qp-f"/><path d="M32 8 12 16v14c0 12 8 22 20 26 12-4 20-14 20-26V16z"/><path d="M24 32l6 6 11-12" class="qp-a"/>',
  beam: '<rect x="6" y="30" width="52" height="7" rx="1" class="qp-sf"/><rect x="6" y="30" width="52" height="7" rx="1"/><path d="M12 37l-5 9h10zM52 37l-5 9h10z" class="qp-f"/><path d="M12 37l-5 9h10zM52 37l-5 9h10z"/><path d="M4 50h16M44 50h16" class="qp-m"/><path d="M32 8v19M32 27l-4.5-7M32 27l4.5-7" class="qp-r"/>',
  force: '<rect x="18" y="26" width="22" height="22" rx="2" class="qp-f"/><rect x="18" y="26" width="22" height="22" rx="2"/><path d="M4 54h56" class="qp-m"/><path d="M40 37h18M58 37l-6-4M58 37l-6 4" class="qp-r"/><path d="M29 48v10" class="qp-a"/><path d="M29 26V12M29 12l-4 6M29 12l4 6" class="qp-a"/>',
  motion: '<path d="M6 54h52" class="qp-m"/><path d="M10 52C16 20 46 20 54 52" class="qp-m qp-dash"/><circle cx="19" cy="32" r="6" class="qp-gf"/><circle cx="19" cy="32" r="6"/><path d="M24 27l15-11M39 16h-8M39 16l-2.5 7.5" class="qp-a"/>',
  energy: '<path d="M36 6 16 36h14l-4 22 22-32H34z" class="qp-gfill"/><path d="M36 6 16 36h14l-4 22 22-32H34z"/>',
  wave: '<path d="M4 32h56" class="qp-m"/><path d="M4 32c5-18 10-18 15 0s10 18 15 0 10-18 15 0 8 12 11 6" class="qp-a"/><path d="M12 14h15" class="qp-g"/><path d="M12 10v8M27 10v8" class="qp-g"/>',
  circuit: '<path d="M14 24V12h6l3-6 4 12 4-12 4 12 4-12 3 6h8v14M50 40v12H14V38"/><path d="M5 28h18"/><path d="M9 34h10" class="qp-a" stroke-width="4.5"/><circle cx="50" cy="33" r="7" class="qp-gfill"/><circle cx="50" cy="33" r="7"/><path d="M45.5 28.5l9 9M54.5 28.5l-9 9"/>',
  magnet: '<path d="M14 10v22a18 18 0 0 0 36 0V10H40v22a8 8 0 0 1-16 0V10z" class="qp-f"/><path d="M14 10v22a18 18 0 0 0 36 0V10H40v22a8 8 0 0 1-16 0V10z"/><path d="M14 18h10M40 18h10" class="qp-r"/>',
  heat: '<path d="M26 10a6 6 0 0 1 12 0v26a11 11 0 1 1-12 0z"/><circle cx="32" cy="45" r="6" class="qp-rf"/><path d="M32 22v20" class="qp-r"/><path d="M44 16h6M44 24h6M44 32h6" class="qp-m"/>',
  fluid: '<path d="M32 8C24 22 16 30 16 40a16 16 0 0 0 32 0c0-10-8-18-16-32z" class="qp-f"/><path d="M32 8C24 22 16 30 16 40a16 16 0 0 0 32 0c0-10-8-18-16-32z"/><path d="M24 42a8 8 0 0 0 8 8" class="qp-a"/>',
  material: '<path d="M10 22h12l4 6h12l4-6h12v20H42l-4-6H26l-4 6H10z" class="qp-f"/><path d="M10 22h12l4 6h12l4-6h12v20H42l-4-6H26l-4 6H10z"/><path d="M2 32h6M56 32h6" class="qp-r"/>',
  gear: '<path d="M50.6 27.9L56.8 28.6L56.8 35.4L50.6 36.1L48.0 42.2L51.9 47.1L47.1 51.9L42.2 48.0L36.1 50.6L35.4 56.8L28.6 56.8L27.9 50.6L21.8 48.0L16.9 51.9L12.1 47.1L16.0 42.2L13.4 36.1L7.2 35.4L7.2 28.6L13.4 27.9L16.0 21.8L12.1 16.9L16.9 12.1L21.8 16.0L27.9 13.4L28.6 7.2L35.4 7.2L36.1 13.4L42.2 16.0L47.1 12.1L51.9 16.9L48.0 21.8z" class="qp-f"/><path d="M50.6 27.9L56.8 28.6L56.8 35.4L50.6 36.1L48.0 42.2L51.9 47.1L47.1 51.9L42.2 48.0L36.1 50.6L35.4 56.8L28.6 56.8L27.9 50.6L21.8 48.0L16.9 51.9L12.1 47.1L16.0 42.2L13.4 36.1L7.2 35.4L7.2 28.6L13.4 27.9L16.0 21.8L12.1 16.9L16.9 12.1L21.8 16.0L27.9 13.4L28.6 7.2L35.4 7.2L36.1 13.4L42.2 16.0L47.1 12.1L51.9 16.9L48.0 21.8z"/><circle cx="32" cy="32" r="8" class="qp-af"/><circle cx="32" cy="32" r="8"/>',
  chem: '<path d="M24 8h16M27 8v16L12 50a4 4 0 0 0 3.5 6h33a4 4 0 0 0 3.5-6L37 24V8"/><path d="M17 42h30l5 8a4 4 0 0 1-3.5 6h-33A4 4 0 0 1 12 50z" class="qp-f"/><circle cx="28" cy="48" r="2.5" class="qp-gf"/><circle cx="37" cy="45" r="2" class="qp-gf"/>',
  atom: '<circle cx="32" cy="32" r="5" class="qp-gf"/><ellipse cx="32" cy="32" rx="24" ry="9"/><ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(60 32 32)" class="qp-a"/><ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-60 32 32)"/>',
  acid: '<rect x="22" y="8" width="20" height="48" rx="10" class="qp-f"/><path d="M22 8v38a10 10 0 0 0 20 0V8"/><path d="M18 8h28"/><path d="M22 34h20" class="qp-a"/><circle cx="32" cy="44" r="3" class="qp-gf"/>',
  cell: '<ellipse cx="32" cy="32" rx="26" ry="20" class="qp-f"/><ellipse cx="32" cy="32" rx="26" ry="20"/><circle cx="36" cy="30" r="8" class="qp-af"/><circle cx="18" cy="38" r="3" class="qp-gf"/><path d="M14 24c4-2 6 2 10 0" class="qp-m"/>',
  dna: '<path d="M17 6c0 12 30 16 30 26S17 46 17 58M47 6c0 12-30 16-30 26s30 14 30 26" /><path d="M21 11h22M22 26h20M22 38h20M21 53h22" class="qp-a"/>',
  leaf: '<path d="M12 52C12 26 28 10 54 10c0 28-16 42-42 42z" class="qp-f"/><path d="M12 52C12 26 28 10 54 10c0 28-16 42-42 42z"/><path d="M12 52 40 24" class="qp-a"/>',
  climate: '<circle cx="22" cy="22" r="9" class="qp-gfill"/><path d="M22 6v4M6 22h4M10 10l3 3M34 10l-3 3"/><path d="M20 50h30a9 9 0 0 0 0-18 13 13 0 0 0-25 3 8 8 0 0 0-5 15z" class="qp-f"/><path d="M20 50h30a9 9 0 0 0 0-18 13 13 0 0 0-25 3 8 8 0 0 0-5 15z"/>',
  heart: '<path d="M32 54S8 40 8 24a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 16-24 30-24 30z" class="qp-rf"/><path d="M32 54S8 40 8 24a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 16-24 30-24 30z"/><path d="M14 32h10l4-8 6 14 4-6h12" class="qp-w"/>',
  pulse: '<rect x="6" y="12" width="52" height="40" rx="6"/><path d="M10 34h10l4-12 6 22 6-16 4 6h14" class="qp-r"/>',
  pill: '<g transform="rotate(-40 26 30)"><rect x="6" y="20" width="40" height="20" rx="10" class="qp-f"/><path d="M26 20H16a10 10 0 0 0 0 20h10z" class="qp-af"/><rect x="6" y="20" width="40" height="20" rx="10"/><path d="M26 20v20"/></g><circle cx="47" cy="47" r="10" class="qp-f"/><circle cx="47" cy="47" r="10"/><path d="M40 47h14" class="qp-m"/>',
  syringe: '<path d="M44 8l12 12M50 14l-6 6M20 44l-8 8"/><path d="M42 18 18 42l4 4 24-24z" class="qp-f"/><path d="M42 18 18 42l4 4 24-24z"/><path d="M34 26l4 4M28 32l4 4" class="qp-a"/>',
  germ: '<circle cx="32" cy="32" r="14" class="qp-f"/><circle cx="32" cy="32" r="14"/><path d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M16 48l6-6M42 22l6-6" class="qp-a"/><circle cx="28" cy="29" r="2.5" class="qp-gf"/><circle cx="36" cy="36" r="2" class="qp-gf"/>',
  law: '<path d="M32 8v44M20 56h24M10 18h44"/><path d="M10 18 4 32h12zM54 18l-6 14h12z" class="qp-gfill"/><path d="M4 32a6 6 0 0 0 12 0M48 32a6 6 0 0 0 12 0"/>',
  paragraph: '<rect x="12" y="6" width="32" height="44" rx="4" class="qp-f"/><rect x="12" y="6" width="32" height="44" rx="4"/><path d="M19 16h18M19 24h18M19 32h10" class="qp-m"/><circle cx="44" cy="46" r="11" class="qp-af"/><path d="M39 46l4 4 6-7" class="qp-w"/>',
  coins: '<rect x="8" y="44" width="30" height="10" rx="5" class="qp-gfill"/><rect x="8" y="44" width="30" height="10" rx="5"/><rect x="11" y="34" width="30" height="10" rx="5" class="qp-gfill"/><rect x="11" y="34" width="30" height="10" rx="5"/><rect x="8" y="24" width="30" height="10" rx="5" class="qp-gfill"/><rect x="8" y="24" width="30" height="10" rx="5"/><circle cx="46" cy="22" r="12" class="qp-gfill"/><circle cx="46" cy="22" r="12"/><circle cx="46" cy="22" r="6.5" class="qp-m"/>',
  market: '<path d="M8 54h50M10 56V8" class="qp-m"/><path d="M14 12 54 50" class="qp-a"/><path d="M14 50 54 12" class="qp-g"/><circle cx="34" cy="31" r="3.5" class="qp-gf"/>',
  ledger: '<rect x="12" y="8" width="40" height="48" rx="4" class="qp-f"/><rect x="12" y="8" width="40" height="48" rx="4"/><path d="M32 8v48" class="qp-m"/><path d="M18 20h8M18 28h8M38 20h8M38 28h8" /><path d="M18 44h8M38 44h8" class="qp-a"/>',
  history: '<path d="M8 20 32 8l24 12z" class="qp-f"/><path d="M8 20 32 8l24 12zM8 20h48M12 56h40M8 56h48"/><path d="M14 24v28M24 24v28M40 24v28M50 24v28" class="qp-a"/>',
  scroll: '<rect x="14" y="12" width="36" height="40" class="qp-f"/><path d="M14 12v40M50 12v40"/><rect x="10" y="6" width="44" height="9" rx="4.5" class="qp-gfill"/><rect x="10" y="6" width="44" height="9" rx="4.5"/><rect x="10" y="49" width="44" height="9" rx="4.5" class="qp-gfill"/><rect x="10" y="49" width="44" height="9" rx="4.5"/><path d="M22 24h20M22 32h20M22 40h12" class="qp-m"/>',
  globe: '<circle cx="32" cy="32" r="24" class="qp-f"/><circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8c-10 10-10 38 0 48M32 8c10 10 10 38 0 48" class="qp-a"/>',
  map: '<path d="M8 14l16-6 16 6 16-6v42l-16 6-16-6-16 6z" class="qp-f"/><path d="M8 14l16-6 16 6 16-6v42l-16 6-16-6-16 6zM24 8v42M40 14v42"/><circle cx="32" cy="28" r="4" class="qp-rf"/>',
  space: '<circle cx="32" cy="32" r="14" class="qp-f"/><circle cx="32" cy="32" r="14"/><ellipse cx="32" cy="32" rx="28" ry="8" transform="rotate(-20 32 32)" class="qp-a"/><circle cx="52" cy="12" r="2" class="qp-gf"/><circle cx="10" cy="50" r="1.6" class="qp-gf"/>',
  book: '<path d="M32 16C26 11 16 10 8 12v38c8-2 18-1 24 4 6-5 16-6 24-4V12c-8-2-18-1-24 4z" class="qp-f"/><path d="M32 16C26 11 16 10 8 12v38c8-2 18-1 24 4 6-5 16-6 24-4V12c-8-2-18-1-24 4zM32 16v38"/><path d="M14 22h12M38 22h12M14 30h12" class="qp-a"/>',
  speech: '<path d="M8 12h40a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H24l-12 10V42H8a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z" class="qp-f"/><path d="M8 12h40a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H24l-12 10V42H8a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z"/><path d="M14 24h28M14 32h18" class="qp-a"/>',
  idea: '<path d="M32 7a16 16 0 0 0-9.5 28.9c2 1.5 3.5 3.6 3.5 6.1v2h12v-2c0-2.5 1.5-4.6 3.5-6.1A16 16 0 0 0 32 7z" class="qp-gfill"/><path d="M32 7a16 16 0 0 0-9.5 28.9c2 1.5 3.5 3.6 3.5 6.1v2h12v-2c0-2.5 1.5-4.6 3.5-6.1A16 16 0 0 0 32 7z"/><path d="M26 50h12M28 56h8"/><path d="M27 26l5 5 5-5M32 31v13" class="qp-m"/><path d="M6 23h5M53 23h5M12 8l3.5 3.5M52 8l-3.5 3.5" class="qp-g"/>',
  society: '<circle cx="20" cy="20" r="6"/><circle cx="44" cy="20" r="6"/><circle cx="32" cy="16" r="7" class="qp-af"/><path d="M8 50c0-10 6-16 12-16M56 50c0-10-6-16-12-16"/><path d="M18 54c0-12 6-20 14-20s14 8 14 20z" class="qp-f"/><path d="M18 54c0-12 6-20 14-20s14 8 14 20"/>',
  vote: '<rect x="10" y="30" width="44" height="26" rx="3" class="qp-f"/><rect x="10" y="30" width="44" height="26" rx="3"/><path d="M22 38h20" /><path d="M24 8h18v22H24z"/><path d="M28 18l4 4 6-8" class="qp-a"/>',
  house: '<path d="M8 30 32 10l24 20" /><path d="M14 26v30h36V26" class="qp-f"/><path d="M14 26v30h36V26"/><path d="M27 56V42h10v14" class="qp-a"/>',
  drafting: '<path d="M8 56V16l40 40z" class="qp-sf"/><path d="M8 56V16l40 40zM16 48V36l12 12z"/><path d="M50 6l8 8-24 24-10 2 2-10z" class="qp-gfill"/><path d="M50 6l8 8-24 24-10 2 2-10zM45 11l8 8"/>',
  road: '<path d="M22 58 28 6M42 58 36 6"/><path d="M32 12v6M32 26v8M32 42v10" class="qp-g"/><path d="M14 58h36" class="qp-m"/>',
  sign: '<path d="M32 8 58 52H6z" class="qp-wf"/><path d="M32 8 58 52H6z" class="qp-r"/><path d="M32 22v14" /><circle cx="32" cy="44" r="2.5" class="qp-kf"/>',
  wheel: '<circle cx="32" cy="32" r="24" class="qp-f"/><circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="18" class="qp-m"/><path d="M14 32h12M38 32h12M32 38v12"/><circle cx="32" cy="32" r="6" class="qp-af"/>',
  firstaid: '<rect x="8" y="16" width="48" height="36" rx="6" class="qp-f"/><rect x="8" y="16" width="48" height="36" rx="6"/><path d="M24 16v-6h16v6"/><path d="M32 24v20M22 34h20" class="qp-r"/>',
  clock: '<circle cx="32" cy="32" r="24" class="qp-f"/><circle cx="32" cy="32" r="24"/><path d="M32 16v16l10 6" class="qp-a"/><path d="M32 10v3M32 51v3M10 32h3M51 32h3" class="qp-m"/>',
  shapes: '<circle cx="18" cy="20" r="10" class="qp-f"/><circle cx="18" cy="20" r="10"/><rect x="36" y="10" width="20" height="20" rx="2" class="qp-af"/><path d="M32 36 46 58H18z" class="qp-gfill"/><path d="M32 36 46 58H18z"/>',
  numbers: '<rect x="8" y="8" width="11" height="48" rx="2" class="qp-sf"/><rect x="8" y="8" width="11" height="48" rx="2"/><path d="M8 17.6h11M8 27.2h11M8 36.8h11M8 46.4h11" class="qp-m"/><rect x="26" y="45" width="11" height="11" rx="2" class="qp-gfill"/><rect x="26" y="45" width="11" height="11" rx="2"/><rect x="41" y="45" width="11" height="11" rx="2" class="qp-gfill"/><rect x="41" y="45" width="11" height="11" rx="2"/><rect x="26" y="31" width="11" height="11" rx="2" class="qp-gfill"/><rect x="26" y="31" width="11" height="11" rx="2"/>',
  ruler: '<rect x="4" y="22" width="56" height="20" rx="3" class="qp-f"/><rect x="4" y="22" width="56" height="20" rx="3"/><path d="M12 22v8M20 22v5M28 22v8M36 22v5M44 22v8M52 22v5" class="qp-a"/>',
  robot: '<path d="M6 57h30" /><rect x="11" y="48" width="20" height="9" rx="2" class="qp-f"/><rect x="11" y="48" width="20" height="9" rx="2"/><path d="M21 48 27 28 46 20" class="qp-a" stroke-width="5"/><circle cx="21" cy="46" r="4.5" class="qp-gf"/><circle cx="27" cy="28" r="4.5" class="qp-gf"/><circle cx="46" cy="20" r="4" class="qp-kf"/><path d="M47 18l7-7M48 22l9 1"/>',
  loop: '<path d="M2 22h4"/><circle cx="11" cy="22" r="5" class="qp-f"/><circle cx="11" cy="22" r="5"/><path d="M16 22h6"/><rect x="22" y="12" width="20" height="20" rx="3" class="qp-sf"/><rect x="22" y="12" width="20" height="20" rx="3"/><path d="M42 22h18M56 18l4 4-4 4"/><path d="M50 22v26H11V27" class="qp-a"/><path d="M7.5 33 11 27l3.5 6" class="qp-a"/>',
  neural: '<path d="M15 18l14-6M15 18l14 14M15 46l14-14M15 46l14 6M35 12l14 18M35 32h14M35 52l14-18" class="qp-m"/><circle cx="12" cy="18" r="5" class="qp-f"/><circle cx="12" cy="18" r="5"/><circle cx="12" cy="46" r="5" class="qp-f"/><circle cx="12" cy="46" r="5"/><circle cx="32" cy="12" r="5" class="qp-af"/><circle cx="32" cy="32" r="5" class="qp-af"/><circle cx="32" cy="52" r="5" class="qp-af"/><circle cx="52" cy="32" r="5.5" class="qp-gf"/><circle cx="52" cy="32" r="5.5"/>',
  brain: '<path d="M30 12a10 10 0 0 0-18 6 10 10 0 0 0-2 18 10 10 0 0 0 10 14 10 10 0 0 0 10 2zM34 12a10 10 0 0 1 18 6 10 10 0 0 1 2 18 10 10 0 0 1-10 14 10 10 0 0 1-10 2z" class="qp-f"/><path d="M30 12a10 10 0 0 0-18 6 10 10 0 0 0-2 18 10 10 0 0 0 10 14 10 10 0 0 0 10 2zM34 12a10 10 0 0 1 18 6 10 10 0 0 1 2 18 10 10 0 0 1-10 14 10 10 0 0 1-10 2zM32 12v40"/><path d="M18 28c4 0 6 4 10 4M46 28c-4 0-6 4-10 4" class="qp-a"/>',
  lungs: '<path d="M32 6v20M32 22l-6 6M32 22l6 6"/><path d="M26 18c-6 0-10 6-14 16S6 54 14 56c6 1 12-2 12-8V18z" class="qp-sf"/><path d="M38 18c6 0 10 6 14 16s6 20-2 22c-6 1-12-2-12-8V18z" class="qp-sf"/><path d="M26 18c-6 0-10 6-14 16S6 54 14 56c6 1 12-2 12-8V18zM38 18c6 0 10 6 14 16s6 20-2 22c-6 1-12-2-12-8V18z"/>',
  kidney: '<path d="M22 10c-10 2-14 14-12 26s10 20 18 16 2-12 4-18-2-10-2-14-4-12-8-10z" class="qp-sf"/><path d="M42 10c10 2 14 14 12 26s-10 20-18 16-2-12-4-18 2-10 2-14 4-12 8-10z" class="qp-sf"/><path d="M22 10c-10 2-14 14-12 26s10 20 18 16 2-12 4-18-2-10-2-14-4-12-8-10zM42 10c10 2 14 14 12 26s-10 20-18 16-2-12-4-18 2-10 2-14 4-12 8-10z"/>',
  drop: '<path d="M32 6c-8 14-16 22-16 32a16 16 0 0 0 32 0c0-10-8-18-16-32z" class="qp-f"/><path d="M32 6c-8 14-16 22-16 32a16 16 0 0 0 32 0c0-10-8-18-16-32z"/><path d="M32 30v16M24 38h16" class="qp-a"/>',
  digital: '<rect x="14" y="14" width="36" height="36" rx="4" class="qp-f"/><rect x="14" y="14" width="36" height="36" rx="4"/><path d="M22 6v8M32 6v8M42 6v8M22 50v8M32 50v8M42 50v8M6 22h8M6 32h8M6 42h8M50 22h8M50 32h8M50 42h8" class="qp-m"/><rect x="24" y="24" width="16" height="16" rx="2" class="qp-af"/>',
  soil: '<path d="M4 20h56v36H4z" class="qp-f"/><path d="M4 32h56v12H4z" class="qp-sf"/><path d="M4 44h56v12H4z" class="qp-gfill"/><path d="M4 20h56v36H4zM4 32h56M4 44h56"/><circle cx="16" cy="26" r="2.5" class="qp-kf"/><circle cx="40" cy="27" r="2" class="qp-kf"/><circle cx="26" cy="38" r="3" class="qp-kf"/><circle cx="50" cy="39" r="2.5" class="qp-kf"/><path d="M22 20V6l10 5-10 4" class="qp-r"/>',
  motor: '<rect x="6" y="18" width="36" height="26" rx="4" class="qp-sf"/><rect x="6" y="18" width="36" height="26" rx="4"/><path d="M14 18v26M22 18v26M30 18v26" class="qp-m"/><path d="M42 31h16"/><circle cx="58" cy="31" r="2" class="qp-kf"/><path d="M10 44v6M38 44v6M4 52h40"/>',
};
// Tittelord → piktogram (første treff vinner). Ordene sjekkes mot enhetens tittel, så mot fagets navn og gruppe.
const QP_RULES = [
  [/førstehjelp|ulykke/i, "firstaid"], [/vikeplikt|forkjørs|skilt|trafikklys|signal/i, "sign"], [/kjøreteknikk|plassering|feltskift|forbikjør|kurver|bremsing|stopplengde|fart, avstand|myke trafikant|veggrep|føre|mørke|vinter/i, "road"], [/førerkort|mc-klasser|kjøretøy|tilhenger|passasjer|vedlikehold|økonomisk kjøring|rus, trøtt/i, "wheel"],
  [/legemiddelregning|dose|tablett|infusjon|dråpe|fortynning|insulin|enheter og omregning/i, "syringe"], [/farmako|legemiddel/i, "pill"], [/mikroorg|smitte|antibiotika|infeksjon|sepsis|immun/i, "germ"],
  [/vitale|news2|akutt syke/i, "pulse"], [/væske|elektrolytt|nyre/i, "kidney"], [/respirasjon|lunge/i, "lungs"], [/nerve|hjerne|hormon/i, "brain"], [/hjerte|sirkulasjon|kar/i, "heart"],
  [/fordøyelse|ernæring|bmi|diabetes/i, "drop"], [/helsepersonel|pasientrettig|samtykke|taushets/i, "paragraph"], [/kommunikasjon|dokumentasjon|retorikk|argument/i, "speech"],
  [/derivasjon|deriverte|tangent|vekstfart|drøfting|optimering|marginal|elastisitet/i, "deriv"], [/integra|areal og volum/i, "integral"], [/grense|kontinuitet|følger og rekker|rekker/i, "limit"], [/kompleks/i, "complex"],
  [/brøk/i, "fraction"], [/prosent|vekstfaktor|desimal/i, "percent"], [/potens|rot|røtter|standardform|tierpotens/i, "power"],
  [/ulikhet|fortegn/i, "linear"], [/likning|ligning|algebra|faktoriser|polynom|enkle likn/i, "equation"], [/lineær(e)? (funksjon|modell)|regresjon|korrelasjon/i, "linear"],
  [/eksponent|logaritm|vekst/i, "exp"], [/enhetssirkel|trigonometriske|sirkelbeveg/i, "circle"], [/trigonometri|geometri|areal og omkrets|målestokk/i, "trig"], [/vektor|parameterfram|linjer og plan/i, "vector"],
  [/matrise|egenverd|lineære system|stivhetsmatris/i, "matrix"], [/differensial|pde|fourier|laplace|svingning|demping|stegrespons|frekvens/i, "ode"],
  [/sannsynlighet|kombinatorikk/i, "dice"], [/fordeling|konfidens|hypotese|inferens/i, "normal"], [/statistikk|nøkkeltall/i, "stats"],
  [/python|programmering|løkker|funksjoner og datastr|filer, feil|objektorient|algoritm|numpy|numerikk|interpolasjon|ligningsløsning/i, "code"], [/logikk|bevis|induksjon|mengder/i, "logic"], [/tallsystem|digital|mikrokontroll|innebygd/i, "digital"],
  [/nettverk|ip-|subnet|grafer og modul/i, "network"], [/database|sql/i, "database"], [/sikkerhet/i, "security"], [/maskinlæring|klassifisering|gradient|data og grunnbegr/i, "neural"],
  [/robot|kinematikk|rotasjoner og transf/i, "robot"], [/regulering|pid|overføringsfunk/i, "loop"],
  [/bjelke|bøyning|fagverk|statikk|laster|bæresystem|torsjon|knekking/i, "beam"], [/krefter|newton|friksjon|dynamikk/i, "force"], [/bevegelse|kast|kinemat/i, "motion"],
  [/energi|arbeid|effekt|impuls/i, "energy"], [/bølge|lyd|lys|stråling/i, "wave"], [/magnet|elektromagnet|transformator/i, "magnet"], [/motor|maskiner/i, "motor"],
  [/elektris|krets|likestrøm|vekselstrøm|kondensator|trefase|diode|transistor|operasjonsfors|filtre|kraftsystem/i, "circuit"],
  [/varme|termo|entropi|kretsprosess|kjøle|konveksjon|temperatur/i, "heat"], [/hydro|bernoulli|rørstrøm|pump|fluid|trykk|tetthet/i, "fluid"],
  [/spenning|tøyning|mekaniske egensk|material|korrosjon|struktur|varmebehandling/i, "material"], [/toleranse|maskinelement|skrue|sveis|elementtyper|mesh|formfunksjon|svak form|stavelement/i, "gear"],
  [/jord|geotek|bæreevne|setning|effektivspenning/i, "soil"], [/landmåling|kart/i, "map"], [/bygningsfysikk|universell utforming|regelverk|bygg/i, "house"],
  [/form og komp|proporsjon|arkitekturtegning|lys, rom/i, "drafting"], [/antikken|middelalder|renessanse|barokk|1800-tallet|modernism|arkitektur/i, "history"],
  [/naturvitenskapelig metode/i, "chem"], [/atom|periodesystem|kvante|radioaktiv/i, "atom"], [/syre|base|ph|buffer|titrering/i, "acid"], [/mol|støkiometri|stoffmengde|binding|redoks|elektrokjemi|termokjemi|gasslov|organisk|likevekt|stoffer|reaksjon|kjemi/i, "chem"],
  [/celle|vev|homeostase|kroppen/i, "cell"], [/gen|arv|evolusjon|protein|bioteknologi/i, "dna"], [/økologi|planter|dyr|fotosyntese|mangfold|bærekraft|livsløp/i, "leaf"], [/klima|vær/i, "climate"],
  [/univers|verdensrom|jorda og|gravitasjon/i, "space"], [/platetekton|jordas indre|naturfarer|befolkning|migrasjon|geografi/i, "globe"],
  [/rente|tidsverdi|investering|nåverdi|sparing|lån|økonomi|kostnad|lønnsom|dekningsbidrag|budsjett|likviditet|penger|valuta|inflasjon|bnp/i, "coins"], [/tilbud|etterspørsel|markeds|konkurranse|handel/i, "market"],
  [/resultat og balanse|avskrivning|merverdiavgift|regnskap/i, "ledger"],
  [/rettskild|lovtolk|domstol|grunnlov|maktfordel|menneskerett|eøs|avtale|ugyldig|kjøp|erstatning|arbeidsgiver|vedtak|klage|innsyn|straff|nødverge|forvaltning|rettsstat/i, "law"],
  [/demokrati|politikk|valg/i, "vote"], [/identitet|sosialiser|kultur|samfunn|minoritet|samer/i, "society"], [/medier|kildekritikk/i, "speech"],
  [/vikingtid|reformasjon|opplysning|revolusjon|1814|verdenskrig|kalde krig|historie/i, "scroll"],
  [/religion|kristendom|islam|jødedom|hindu|buddh|livssyn|etikk|filosofi/i, "idea"], [/litteratur|språkhistorie|sjanger|virkemidl|norsk/i, "book"],
  [/klokka|tid/i, "clock"], [/former|mønstre/i, "shapes"], [/tall og plassverdi|pluss|minus|gangetabell|deling|regnerekkef|tall/i, "numbers"], [/måling|enheter|størrelser/i, "ruler"],
  [/prosess og kundebehov|konsept|design for x|produktutvikling/i, "idea"], [/funksjon|graf|modell/i, "func"],
  // fag og grupper som reserve
  [/matemat|kalkulus|analyse/i, "func"], [/fysikk/i, "force"], [/elektro/i, "circuit"], [/mekanikk|konstruksjon/i, "beam"], [/sykepleie/i, "heart"], [/jus/i, "law"], [/økonomi/i, "coins"], [/program|data/i, "code"]
];
function qpFor(code, u){
  const c = COURSE(code); if(!c || !c.units[u]) return null;
  const tries = [c.units[u].title, unitTitle(c, u), c.name || "", courseName(c), c.group || ""];
  for(const s of tries) for(const [re, k] of QP_RULES) if(re.test(s)) return k;
  return null;
}
// Ord fra oppgaveteksten som kan peke på et emne (uten formler og småord)
const qaWords = s => new Set(String(s).replace(/\$[^$]*\$/g, " ").toLowerCase().match(/[a-zæøå]{5,}/g) || []);
function qaTopicArt(code, u, prompt){
  const tps = topicsOf(code, u).filter(tp => tp.fig || tp.art); if(!tps.length) return "";
  const w = qaWords(prompt); let best = null, bs = 0;
  for(const tp of tps){
    const x = tpText(tp), tw = qaWords([x.t, x.intro].join(" ")); let s = 0;
    for(const a of w) for(const b of tw) if(a.slice(0, 6) === b.slice(0, 6)){ s += 1; break; }
    if(s > bs){ bs = s; best = tp; }
  }
  if(!best && tps.length === 1) best = tps[0];
  if(!best) return "";
  try{ return typeof best.art === "function" ? `<div class="tpart q-fig" aria-hidden="true">${best.art()}</div>` : best.fig ? `<div class="tpfig q-fig" aria-hidden="true">${best.fig}</div>` : ""; }catch(e){ return ""; }
}
// Illustrasjonen over oppgaven: { fig } når vi har en figur som passer, ellers { pic } – piktogrammet for temaet.
// Regler (så figuren aldri forvirrer):
//  1) Har oppgaven en figur laget av sine egne tall (it.fig, se FIGQ i learn.js), brukes den. Før svaret tegnes den
//     uten det som avslører svaret (p.hide), etter svaret i sin helhet. only: "after" = bare etter svaret.
//  2) I barneskolen og ungdomsskolen vises ellers bare piktogrammet – aldri et fast eksempel med andre tall.
//  3) I andre fag kan en fast figur fra emnet vises, men da med merket «Eksempel», og ikke hvis tallene i den kan
//     forveksles med oppgaven (svaret, eller to av tallene i oppgaveteksten, står i figuren).
const QA_KIDS = ["barn", "ungdom"];
const qaKids = c => [].concat(c.study || []).some(s => QA_KIDS.includes(s));
const qaNums = s => (String(s).replace(/\\frac\{(\d+)\}\{(\d+)\}/g, " $1 $2 ").replace(/(\d)[ \u00a0](\d{3})\b/g, "$1$2").replace(/(\d),(\d)/g, "$1.$2").replace(/[−–]/g, "-").match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
const qaSvgNums = html => qaNums(String(html).replace(/<text[^>]*fg-tick[^>]*>[\s\S]*?<\/text>/g, " ").replace(/<(?!\/?(text|tspan)\b)[^>]*>/g, " ").replace(/<text[^>]*>|<tspan[^>]*>|<\/text>|<\/tspan>/g, " ").replace(/&[a-z]+;/g, " "));
const qaAnswerNums = it => it.type === "num" ? [it.n] : it.ansN != null ? [it.ansN] : (it.opts || []).filter(o => o.ok).flatMap(o => qaNums(o.t));
// Kan tallene i figuren forveksles med oppgaven? Små tall (0, 1, 2) teller ikke – de står nesten overalt.
function qaClash(html, it){
  const inFig = new Set(qaSvgNums(html).map(x => Math.abs(x))), big = x => Math.abs(x) > 2;
  if(qaAnswerNums(it).filter(big).some(x => inFig.has(Math.abs(x)))) return true;
  return [...new Set(qaNums(it.prompt).filter(big).map(Math.abs))].filter(x => inFig.has(x)).length >= 2;
}
// Figuren laget av oppgavens egne tall: HTML eller "" (ikke tegnet før svaret, eller tallene får ikke plass)
function qaOwnFig(it, answered){
  const sp = it.fig; if(!sp || !FIGS[sp.f] || (sp.only === "after" && !answered)) return "";
  try{ const r = FIGS[sp.f](Object.assign({}, sp.p, answered ? sp.after || {} : { hide: true }));
    return r ? `<div class="fig q-fig q-own" aria-hidden="true"><svg viewBox="0 0 320 180">${r.svg}</svg></div>` : ""; }catch(e){ return ""; }
}
const qaExample = html => html.replace(/^(<div class="[^"]*q-fig)([^"]*")([^>]*>)/, `$1 q-ex$2$3<span class="q-exb">${esc(T("Eksempel", "Example"))}</span>`);
function qArt(it, answered){
  if(!it || !it.cc || /<svg|!\[fig:|<figure/.test(String(it.prompt))) return {};
  const c = COURSE(it.cc); if(!c || !c.units[it.cu]) return {};
  const k = qpFor(it.cc, it.cu), pic = k ? QP_SVG(QP[k]) : "", name = unitTitle(c, it.cu);
  const own = qaOwnFig(it, answered);
  if(own || it.fig || qaKids(c)) return { fig: own, own: !!own, pic, name };
  let fig = qaTopicArt(it.cc, it.cu, it.prompt);
  if(!fig && typeof FIG_MAP !== "undefined"){ const n = [].concat(FIG_MAP[it.cc + ":" + it.cu] || [])[0]; if(n && FIGS[n]){ try{ fig = `<div class="fig q-fig" aria-hidden="true"><svg viewBox="0 0 320 180">${FIGS[n]().svg}</svg></div>`; }catch(e){} } }
  if(fig && qaClash(fig, it)) fig = "";
  return { fig: fig ? qaExample(fig) : "", example: !!fig, pic, name };
}
