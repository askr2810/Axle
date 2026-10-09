// Uavhengig kontroll av fasiter (særlig helse, jus og trafikk). Bruk: node tools/test_answers.js [kjøringer per generator, standard 400]
//  1) SLMR (legemiddelregning) og SKLIN (NEWS2, BMI, væske): hver generator kjøres mange ganger med fast seed. Svaret regnes ut
//     på nytt fra tallene i oppgaveteksten med egne formler (ikke kopiert fra generatoren), og sjekkes for realisme
//     (ingen infusjonshastighet over 999 ml/t, tabletter bare i hele eller halve, osv.). NEWS2 regnes med den offisielle tabellen.
//  2) Faste spørsmål i førerkort (FKB, FKMC), sykepleie (SLMR, SANA, SFARM, SMIK, SKLIN, SSYK, SLOV) og jus (J*):
//     minst 10 håndkontrollerte per fag, med kilde. Testen feiler hvis fasiten (første alternativ / tallsvaret) endres.
//  3) Matte og fysikk: 5 stikkprøver per fag der en generator regner – svaret regnes ut på nytt fra oppgaveteksten.
const fs = require('fs'), path = require('path'); const ROOT = path.join(__dirname, '..');
// fast seed (mulberry32), så kjøringene blir like hver gang
let seed = 20261009; Math.random = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
global.navigator = { language: 'nb' }; global.localStorage = { getItem(){ return null; }, setItem(){} };
const order = ['config.js','i18n.js','data.js','gens.js','gens_b.js','more.js','more2.js','more2_b.js','subjects2.js','subjects2_b.js','more3.js'];
const files = [...order, ...fs.readdirSync(ROOT).filter(f => /^en_static_.*\.js$/.test(f)).sort(), 'learn.js', ...fs.readdirSync(ROOT).filter(f => /^add_.*\.js$/.test(f)).sort()];
const tmp = path.join(require('os').tmpdir(), 'axle_ans_' + process.pid + '.js');
fs.writeFileSync(tmp, files.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n') + ';module.exports={COURSES,setLang:l=>{LANG=l}};');
const M = require(tmp); fs.unlinkSync(tmp); M.setLang('nb');
const RUNS = +process.argv[2] || 400, errs = []; const E = (w, m) => { if(errs.length < 200) errs.push(w + ': ' + m); };
const C = code => M.COURSES.find(c => c.code === code);
const gen = (code, id) => { const [u, j] = id.split('.g').map(Number), g = C(code) && C(code).units[u] && (C(code).units[u].gen || [])[j]; if(!g) throw new Error(`${code} ${id}: finnes ikke`); return g; };
// tall fra norsk tekst: 1,5 · 1{,}5 · 10 000 · −3
const num = s => +String(s).replace(/\{,\}/g, '.').replace(/,/g, '.').replace(/[−–]/g, '-').replace(/\s/g, '');
const N = '(-?\\d+(?:[.,]\\d+|\\{,\\}\\d+)?)', re = s => new RegExp(s.replace(/#/g, N));
const close = (a, b, tol) => Math.abs(a - b) <= Math.max(tol || 0, Math.abs(b) * 0.002, 1e-9);
let nChecked = 0;
// Kjører generatoren, finner malen, regner selv og sammenligner. real(svar, m, q) kan returnere en feilmelding (realisme).
function check(code, id, pattern, calc, real){
  const g = gen(code, id), rx = re(pattern); let hit = 0;
  for(let k = 0; k < RUNS; k++){ const q = g(), m = q[0].replace(/\$/g, '').match(rx); if(!m) continue; hit++; nChecked++;
    const want = calc(m.slice(1).map(num), m), got = q[1].n;
    if(!close(got, want, q[1].tol)) { E(`${code} ${id}`, `fasit ${got}, egen utregning ${+want.toFixed(6)} – «${q[0].slice(0, 110)}»`); return; }
    const bad = real && real(got, m.slice(1).map(num), q); if(bad) { E(`${code} ${id}`, `urealistisk: ${bad} – «${q[0].slice(0, 110)}»`); return; } }
  if(hit < Math.min(20, RUNS / 20)) E(`${code} ${id}`, `malen ble bare funnet ${hit} av ${RUNS} ganger – har oppgaveteksten endret seg?`);
}

// ================= 1) SLMR: legemiddelregning =================
const rate = v => v > 999 ? `${v} ml/t er mer enn en vanlig pumpe kan` : v <= 0 ? 'hastighet ≤ 0' : null;
check('SLMR', '0.g0', 'Hvor mange mikrogram er # mg', ([a]) => a * 1000);
check('SLMR', '0.g0', 'Hvor mange mg er # g\\?', ([a]) => a * 1000);
check('SLMR', '0.g0', 'Hvor mange mg er # mikrogram', ([a]) => a / 1000);
check('SLMR', '0.g1', 'virkestoff er det i # ml av en # % løsning', ([v, p]) => v * p / 100);            // p % = p g per 100 ml
check('SLMR', '0.g2', 'En løsning er # %\\. Hvor mange mg/ml', ([p]) => p * 10);                          // 1 % = 10 mg/ml
check('SLMR', '1.g0', 'Forordnet dose er # mg\\. Tablettene er à # mg \\(med delestrek\\)', ([d, s]) => d / s,
  v => Math.abs(v * 2 - Math.round(v * 2)) > 1e-9 ? `${v} tabletter kan ikke deles med delestrek` : v > 4 ? `${v} tabletter i én dose` : null);
check('SLMR', '1.g1', 'Forordnet # mg\\. Miksturen har styrke # mg/ml', ([d, s]) => d / s, v => v > 50 ? `${v} ml mikstur` : null);
check('SLMR', '1.g2', 'barn på # kg skal ha # mg/kg/døgn fordelt på # doser\\. Miksturen er # mg/ml', ([kg, mgkg, n, s]) => kg * mgkg / n / s, v => v > 20 ? `${v} ml mikstur per dose` : null);
check('SLMR', '1.g3', 'Forordnet # g\\. Tabletter à # mg', ([g, mg]) => g * 1000 / mg, v => !Number.isInteger(v) ? `${v} tabletter uten delestrek` : v > 4 ? `${v} tabletter i én dose` : null);
check('SLMR', '2.g0', '# ml skal gis over # timer på infusjonspumpe', ([v, t]) => v / t, rate);
check('SLMR', '2.g1', '# ml skal gå over # timer\\. Infusjonssettet gir # dråper/ml', ([v, t, f]) => Math.round(v * f / (t * 60)), v => v > 100 ? `${v} dråper/min er for raskt for et vanlig infusjonssett` : null);
check('SLMR', '2.g2', 'En infusjon på # ml går med # ml/t', ([v, r]) => v / r, (v, [, r]) => rate(r));
check('SLMR', '2.g3', '# mg legemiddel er løst i # ml\\. Pasienten skal ha # mg/t', ([mg, ml, d]) => d / (mg / ml), rate);
check('SLMR', '3.g0', 'Ampullen inneholder # mg/ml\\. Forordnet dose er # mg', ([c, d]) => d / c, v => v > 20 ? `${v} ml fra ampuller` : null);
check('SLMR', '3.g1', 'Du har # ml av en løsning på # mg/ml og skal fortynne til # mg/ml', ([v1, c1, c2]) => v1 * c1 / c2 - v1);   // C1V1 = C2V2
check('SLMR', '3.g2', 'Du har en # % løsning\\. Pasienten skal ha # mg', ([p, mg]) => mg / (p * 10));
check('SLMR', '4.g0', 'skal ha # IE hurtigvirkende insulin\\. Styrken er # IE/ml', ([ie, s]) => ie / s, v => v > 1 ? `${v} ml insulin` : null);
check('SLMR', '4.g1', 'Ampullen inneholder # IE/ml\\. Forordnet dose er # IE', ([s, ie]) => ie / s);
check('SLMR', '4.g2', 'pasient på # kg skal ha # IE/kg\\. Styrken er # IE/ml', ([kg, iekg, s]) => kg * iekg / s);
check('SLMR', '4.g3', '# mg \\(# mikrogram\\) er løst i # ml\\. Pasienten på # kg skal ha # mikrogram/kg/min', ([mg, mcg, ml, kg, d]) => {
  if(Math.abs(mg * 1000 - mcg) > 1e-9) throw new Error('mg og mikrogram stemmer ikke'); return d * kg * 60 / (mcg / ml); }, rate);

// ================= 1) SKLIN: NEWS2, BMI og væske =================
// NEWS2 (Royal College of Physicians 2017, norsk versjon fra Helsedirektoratet/Nasjonal kompetansetjeneste). SpO₂ skala 1.
const NEWS2 = {
  rr: v => v <= 8 ? 3 : v <= 11 ? 1 : v <= 20 ? 0 : v <= 24 ? 2 : 3,
  spo2: v => v <= 91 ? 3 : v <= 93 ? 2 : v <= 95 ? 1 : 0,
  o2: on => on ? 2 : 0,
  sbp: v => v <= 90 ? 3 : v <= 100 ? 2 : v <= 110 ? 1 : v <= 219 ? 0 : 3,
  hr: v => v <= 40 ? 3 : v <= 50 ? 1 : v <= 90 ? 0 : v <= 110 ? 1 : v <= 130 ? 2 : 3,
  cvpu: alert => alert ? 0 : 3,
  temp: v => v <= 35.0 ? 3 : v <= 36.0 ? 1 : v <= 38.0 ? 0 : v <= 39.0 ? 1 : 2,
};
// Fasit fra den offisielle tabellen, punkt for punkt (grenseverdiene), så en feil i tabellen over også oppdages
[['rr', [8, 3], [9, 1], [11, 1], [12, 0], [20, 0], [21, 2], [24, 2], [25, 3]], ['spo2', [91, 3], [92, 2], [93, 2], [94, 1], [95, 1], [96, 0]],
 ['sbp', [90, 3], [91, 2], [100, 2], [101, 1], [110, 1], [111, 0], [219, 0], [220, 3]], ['hr', [40, 3], [41, 1], [50, 1], [51, 0], [90, 0], [91, 1], [110, 1], [111, 2], [130, 2], [131, 3]],
 ['temp', [35.0, 3], [35.1, 1], [36.0, 1], [36.1, 0], [38.0, 0], [38.1, 1], [39.0, 1], [39.1, 2]]]
  .forEach(([k, ...pts]) => pts.forEach(([v, p]) => { if(NEWS2[k](v) !== p) E('NEWS2-tabell', `${k} ${v} skal gi ${p} poeng`); }));
check('SKLIN', '1.g0', 'Respirasjonsfrekvens #/min, SpO₂ # %, (romluft|får oksygen), blodtrykk #/# mmHg, puls #/min, (våken og orientert|nyoppstått forvirring), temperatur # °C', (v, m) => {
  const rr = num(m[1]), sp = num(m[2]), o2 = m[3] === 'får oksygen', sbp = num(m[4]), hr = num(m[6]), alert = m[7] === 'våken og orientert', t = num(m[8]);
  return NEWS2.rr(rr) + NEWS2.spo2(sp) + NEWS2.o2(o2) + NEWS2.sbp(sbp) + NEWS2.hr(hr) + NEWS2.cvpu(alert) + NEWS2.temp(t); });
check('SKLIN', '1.g1', 'NEWS2-poeng gir en puls på #/min', ([v]) => NEWS2.hr(v));
check('SKLIN', '1.g1', 'NEWS2-poeng gir en temperatur på # °C', ([v]) => NEWS2.temp(v));
check('SKLIN', '1.g1', 'NEWS2-poeng gir et systolisk blodtrykk på # mmHg', ([v]) => NEWS2.sbp(v));
check('SKLIN', '1.g1', 'NEWS2-poeng gir en respirasjonsfrekvens på #/min', ([v]) => NEWS2.rr(v));
check('SKLIN', '2.g0', 'pasient veier # kg og er # m høy', ([kg, m]) => kg / (m * m), v => v < 12 || v > 70 ? `BMI ${v}` : null);
check('SKLIN', '2.g1', 'drukket # ml og fått # ml intravenøst\\. Urin var # ml og dren/oppkast # ml', ([a, b, c, d]) => a + b - c - d);
check('SKLIN', '2.g2', 'voksen på # kg per døgn, regnet med # ml/kg', ([kg, r]) => kg * r);
check('SKLIN', '2.g3', 'drukket # mL og fått # mL intravenøst\\. Urin: # mL, oppkast/dren: # mL', ([a, b, c, d]) => a + b - c - d);
check('SKLIN', '2.g4', 'pasient på # kg har et beregnet energibehov på # kcal/kg', ([kg, k]) => kg * k);

// ================= 2) Faste spørsmål, håndkontrollerte =================
// [fag, enhet.nr, første ord i oppgaveteksten (for å sjekke at det er samme spørsmål), riktig svar, kilde]
const FIXED = [
  // ---------- Førerkort klasse B (trafikkreglene = forskrift om kjørende og gående trafikk, skiltforskriften) ----------
  ['FKB', '0.0', 'Du kommer til et kryss uten skilt', 'Kjørende som kommer fra høyre', 'Trafikkreglene § 7 nr. 2 (høyreregelen)'],
  ['FKB', '0.16', 'En trikk kommer fra venstre', 'Du, kjørende har vikeplikt for sporvogn', 'Trafikkreglene § 7 nr. 3'],
  ['FKB', '0.21', 'Du skal svinge til venstre, og den møtende', 'Du, som svinger til venstre', 'Trafikkreglene § 7 nr. 4: venstresvingende viker for møtende'],
  ['FKB', '1.0', 'Hva slags skilt er en trekant med rød kant', 'Fareskilt', 'Skiltforskriften § 4 (fareskilt)'],
  ['FKB', '1.1', 'Hva slags skilt er rundt og blått', 'Påbudsskilt', 'Skiltforskriften § 6 (påbudsskilt)'],
  ['FKB', '2.0', 'Hva er den generelle fartsgrensen i tettbygd', '50 km/t', 'Trafikkreglene § 13 nr. 1'],
  ['FKB', '2.1', 'Hva er den generelle fartsgrensen utenfor', '80 km/t', 'Trafikkreglene § 13 nr. 1'],
  ['FKB', '2.4', 'Du kjører i 72 km/t', '20 meter', '72 km/t = 20 m/s, 1 s reaksjonstid'],
  ['FKB', '2.8', 'Hva er høyeste tillatte fart for bil med tilhenger uten', '60 km/t', 'Trafikkreglene § 13 nr. 5'],
  ['FKB', '2.12', 'Hvor mange meter per sekund tilsvarer 90', '25 m/s', '90 / 3,6 = 25'],
  ['FKB', '2.17', 'Hva er høyeste tillatte fart for personbil med tilhenger med', '80 km/t', 'Trafikkreglene § 13 nr. 5'],
  ['FKB', '2.18', 'Bremselengden er 14 meter i 50', '56 meter', 'Bremselengden ∝ v²: 14 · 2² = 56'],
  ['FKB', '3.9', 'Hvor nær et gangfelt kan du stanse', 'Ikke i gangfeltet og ikke nærmere enn 5 meter foran det', 'Trafikkreglene § 17 nr. 2 a'],
  ['FKB', '3.10', 'Hva er forbudt på motorveg', 'Å snu og å rygge', 'Trafikkreglene § 20'],
  // ---------- Førerkort MC (førerkortforskriften kap. 3 og 4, kjøretøyforskriften) ----------
  ['FKMC', '0.0', 'Hvor gammel må du være for å ta førerkort klasse A1', '16 år', 'Førerkortforskriften § 3-1'],
  ['FKMC', '0.1', 'Hva er største tillatte slagvolum', '125 cm³', 'Førerkortforskriften § 2-2 (klasse A1)'],
  ['FKMC', '0.2', 'Hvor stor effekt kan en motorsykkel i klasse A2', '35 kW', 'Førerkortforskriften § 2-2 (klasse A2)'],
  ['FKMC', '0.3', 'Fra hvilken alder kan du ta klasse A direkte', '24 år', 'Førerkortforskriften § 3-1'],
  ['FKMC', '0.4', 'Hvem må bruke hjelm på motorsykkel', 'Både fører og passasjer', 'Bruk av kjøretøy-forskriften § 3-1 (verneutstyr)'],
  ['FKMC', '0.7', 'Hvor stor effekt kan en motorsykkel i klasse A1', '11 kW', 'Førerkortforskriften § 2-2 (klasse A1)'],
  ['FKMC', '0.8', 'Hva er kravet til effekt per vekt', 'Høyst 0,2 kW per kg', 'Førerkortforskriften § 2-2 (klasse A2)'],
  ['FKMC', '0.9', 'Kan en kraftig motorsykkel strupes', 'Ja, hvis den opprinnelig ikke har mer enn 70 kW', 'Førerkortforskriften § 2-2 (A2: ikke mer enn det dobbelte)'],
  ['FKMC', '0.10', 'Hvilken klasse gir rett til å kjøre alle motorsykler', 'A', 'Førerkortforskriften § 2-2'],
  ['FKMC', '1.1', 'Du vil svinge til høyre i 60 km/t', 'Høyre', 'Motstyring: press fram på den siden du vil svinge (Statens vegvesen, læreplan klasse A)'],
  ['FKMC', '2.0', 'Hvilken brems gir mest bremsekraft', 'Forbremsen', 'Vekten flyttes fram ved bremsing (Statens vegvesen, læreplan klasse A)'],
  ['FKMC', '2.4', 'Du dobler farten på motorsykkelen', 'Den blir fire ganger så lang', 'Bremselengden ∝ v²'],
  ['FKMC', '6.4', 'Hvor stor mønsterdybde skal dekkene på en motorsykkel', '1 mm', 'Kjøretøyforskriften § 28-6'],
  // ---------- Sykepleie: legemiddelregning ----------
  ['SLMR', '0.0', 'Hvor mange mikrogram (µg) er 0,25 mg', 250, '1 mg = 1000 µg'],
  ['SLMR', '0.2', 'Hvor mange mg/ml tilsvarer NaCl 9', 9, '9 ‰ = 9 g/l = 9 mg/ml'],
  ['SLMR', '0.3', 'Hvor mange gram glukose er det i 1 liter glukose 5', 50, '5 % = 5 g per 100 ml'],
  ['SLMR', '1.0', 'Forordnet: 1 g paracetamol', 2, '1000 mg / 500 mg'],
  ['SLMR', '1.2', 'Et barn skal ha 10 mg/kg per dose og veier 22', 220, '10 · 22'],
  ['SLMR', '1.3', 'Forordnet 7,5 mg. Tabletter à 5 mg', 1.5, '7,5 / 5 (delestrek)'],
  ['SLMR', '1.5', 'Døgndosen er 1200 mg fordelt på 4', 300, '1200 / 4'],
  ['SLMR', '2.0', '500 ml skal gå over 4 timer', 125, '500 / 4'],
  ['SLMR', '2.1', 'Hvor mange dråper per ml gir et vanlig infusjonssett', '20', 'Standard infusjonssett: 20 dråper/ml'],
  ['SLMR', '2.2', 'Med mikrodryppsett (60 dråper/ml)', 30, '30 ml/t · 60 / 60 min'],
  ['SLMR', '3.0', 'En ampulle inneholder 10 mg/ml. Du skal gi 25', 2.5, '25 / 10'],
  ['SLMR', '3.2', '2 ml av 40 mg/ml fortynnes til 20 ml', 4, 'C₁V₁ = C₂V₂: 80 mg / 20 ml'],
  ['SLMR', '4.0', 'Pasienten skal ha 24 IE insulin', 0.24, '24 / 100'],
  ['SLMR', '4.2', 'Heparin 5000 IE/ml. Forordnet 2500', 0.5, '2500 / 5000'],
  // ---------- Sykepleie: anatomi og fysiologi ----------
  ['SANA', '0.0', 'Hvilken del av cellen lager mesteparten', 'Mitokondriene', 'Sand m.fl., Kropp og helse (anatomi og fysiologi)'],
  ['SANA', '0.1', 'Hvilken vevstype er blod', 'Bindevev', 'Sand m.fl., Kropp og helse'],
  ['SANA', '1.0', 'Hvilket hjertekammer har den tykkeste', 'Venstre ventrikkel', 'Sand m.fl., Kropp og helse'],
  ['SANA', '1.1', 'Hvor ligger hjertets naturlige pacemaker', 'Sinusknuten i høyre forkammer', 'Sand m.fl., Kropp og helse'],
  ['SANA', '1.2', 'Hvilken blodåre fører oksygenfattig blod', 'Lungearterien', 'Sand m.fl., Kropp og helse'],
  ['SANA', '1.3', 'Hvilken klaff ligger mellom venstre forkammer', 'Mitralklaffen', 'Sand m.fl., Kropp og helse'],
  ['SANA', '1.4', 'Slagvolumet er 70 ml og pulsen 72', 5.04, 'Minuttvolum = slagvolum · puls = 5040 ml/min'],
  ['SANA', '1.8', 'Hjertefrekvens 70/min og slagvolum 70', 4.9, '70 · 70 = 4900 ml/min'],
  ['SANA', '1.9', 'Blodtrykk 120/80', 93, 'MAP ≈ diastolisk + (systolisk − diastolisk)/3 = 93'],
  ['SANA', '2.1', 'Hva er den viktigste inspirasjonsmuskelen', 'Diafragma', 'Sand m.fl., Kropp og helse'],
  ['SANA', '3.3', 'Hvilken del av hjernen er viktigst for balanse', 'Lillehjernen', 'Sand m.fl., Kropp og helse'],
  ['SANA', '3.8', 'Hva er normal verdi på Glasgow Coma Scale', 15, 'GCS 3–15, 15 = våken og orientert'],
  ['SANA', '4.4', 'En pasient på 80 kg. Hva er omtrent den laveste urinproduksjonen', 40, '0,5 ml/kg/t · 80 kg'],
  ['SANA', '5.2', 'Hvilket hormon senker blodsukkeret', 'Insulin', 'Sand m.fl., Kropp og helse'],
  ['SANA', '5.3', 'Hvilke vitaminer er fettløselige', 'A, D, E og K', 'Helsedirektoratet, Kostrådene'],
  ['SANA', '5.8', 'Hvor mange kcal gir 1 gram fett', 9, 'Atwater-faktor: fett 9 kcal/g'],
  // ---------- Sykepleie: farmakologi ----------
  ['SFARM', '0.0', 'Hva er biotilgjengeligheten ved intravenøs', '100 %', 'Simonsen og Aarbakke, Klinisk farmakologi'],
  ['SFARM', '0.2', 'Hvor mange halveringstider tar det omtrent å nå steady state', '4–5', 'Simonsen og Aarbakke, Klinisk farmakologi'],
  ['SFARM', '0.3', 'Et legemiddel har halveringstid 6 timer. Du gir 400', 100, '12 t = 2 halveringstider: 400 / 4'],
  ['SFARM', '0.6', 'Hvilket organ skiller ut de fleste legemidler', 'Nyrene', 'Simonsen og Aarbakke, Klinisk farmakologi'],
  ['SFARM', '0.7', 'Halveringstiden er 6 timer. Hvor mye er igjen etter 24', 6.25, '24 t = 4 halveringstider: (1/2)⁴ = 6,25 %'],
  ['SFARM', '1.0', 'Hva gjør en antagonist', 'Blokkerer reseptoren', 'Simonsen og Aarbakke, Klinisk farmakologi'],
  ['SFARM', '2.0', 'Hva er motgiften mot opioider', 'Nalokson', 'Felleskatalogen: nalokson'],
  ['SFARM', '2.1', 'Hvilken blodprøve brukes for å følge opp warfarin', 'INR', 'Felleskatalogen: warfarin'],
  ['SFARM', '2.2', 'Hvilken elektrolyttforstyrrelse er vanlig ved bruk av furosemid', 'Lav kalium (hypokalemi)', 'Felleskatalogen: furosemid'],
  ['SFARM', '2.4', 'Hva er vanlig maksimal døgndose paracetamol', '4 g', 'Felleskatalogen: paracetamol (voksne)'],
  ['SFARM', '2.8', 'Hvilket legemiddel brukes mot anafylaksi', 'Adrenalin', 'Norsk elektronisk legehåndbok / Helsebiblioteket: anafylaksi'],
  ['SFARM', '3.0', 'Hva betyr s.c.', 'Subkutant (under huden)', 'Forkortelser i legemiddelhåndtering'],
  ['SFARM', '3.7', 'Kan depottabletter knuses', 'Nei, da kan hele dosen frigjøres på én gang', 'Felleskatalogen / Legemiddelhåndboka'],
  // ---------- Sykepleie: mikrobiologi og smittevern ----------
  ['SMIK', '0.0', 'Hvorfor virker ikke antibiotika mot virus', 'Virus er ikke celler og har ikke det antibiotika angriper', 'FHI, Smittevernveilederen'],
  ['SMIK', '0.1', 'Hvilken håndhygiene er riktig ved Clostridioides', 'Vask med såpe og vann', 'FHI: sporer drepes ikke av alkohol'],
  ['SMIK', '0.5', 'Hvilken mikrobe forårsaker oftest urinveisinfeksjon', 'E. coli', 'Helsedirektoratet, Antibiotikabruk i primærhelsetjenesten'],
  ['SMIK', '1.0', 'Hva er det viktigste enkelttiltaket for å hindre smitte på sykehus', 'Håndhygiene', 'FHI, Smittevernveilederen'],
  ['SMIK', '1.1', 'Hva er den vanligste smittemåten i helsetjenesten', 'Kontaktsmitte', 'FHI, Smittevernveilederen'],
  ['SMIK', '1.2', 'Erstatter hansker håndhygiene', 'Nei, du skal ha håndhygiene før og etter bruk av hansker', 'FHI, Basale smittevernrutiner'],
  ['SMIK', '1.3', 'Et urinkateter er et eksempel på hvilket ledd', 'Inngangsport', 'FHI, smittekjeden'],
  ['SMIK', '2.1', 'Hva står MRSA for', 'Meticillinresistente gule stafylokokker', 'FHI, MRSA-veilederen'],
  ['SMIK', '2.2', 'Hva skal pasienten gjøre med antibiotika som blir til overs', 'Levere det på apoteket', 'Legemiddelverket: lever rester på apoteket'],
  ['SMIK', '2.5', 'Hvilken antibiotikagruppe er penicillin', 'Betalaktamer', 'Felleskatalogen'],
  // ---------- Sykepleie: klinisk observasjon (NEWS2, ABCDE, ISBAR) ----------
  ['SKLIN', '0.2', 'Hva er normal oksygenmetning hos en lungefrisk', '96–100 %', 'NEWS2: SpO₂ ≥ 96 gir 0 poeng'],
  ['SKLIN', '0.3', 'Hva er normal hvilepuls hos en voksen', '60–100 slag/min', 'Norsk elektronisk legehåndbok'],
  ['SKLIN', '0.4', 'Hvilket pulsområde gir 0 poeng i NEWS2', '51–90 slag per minutt', 'NEWS2-tabellen'],
  ['SKLIN', '0.5', 'Hvilket systolisk blodtrykk gir 3 poeng i NEWS2', '90 mmHg eller lavere', 'NEWS2-tabellen'],
  ['SKLIN', '0.7', 'Pasienten har temperatur 38,6', 'Feber', 'Feber: over 38 °C'],
  ['SKLIN', '1.0', 'Hvor mange NEWS2-poeng gir en respirasjonsfrekvens på 26', 3, 'NEWS2: RF ≥ 25 gir 3 poeng'],
  ['SKLIN', '1.1', 'Hva står A-en i ABCDE for', 'Airway (frie luftveier)', 'ABCDE-metoden'],
  ['SKLIN', '1.3', 'Hva står R-en i ISBAR for', 'Råd (hva du trenger fra mottakeren)', 'Helsedirektoratet / Pasientsikkerhetsprogrammet: ISBAR'],
  ['SKLIN', '1.4', 'Pasienten har fått nyoppstått forvirring', 3, 'NEWS2: C(VPU) gir 3 poeng'],
  ['SKLIN', '2.0', 'En person veier 70 kg og er 1,75 m høy', 22.9, '70 / 1,75² = 22,9'],
  ['SKLIN', '2.2', 'Hvilken BMI regnes som risiko for underernæring hos en person over 70', 'Under 22', 'Helsedirektoratet, Forebygging og behandling av underernæring'],
  ['SKLIN', '2.4', 'Hva er BMI for en person på 80 kg og 1,80', 24.7, '80 / 1,8² = 24,7'],
  // ---------- Sykepleie: sykdomslære ----------
  ['SSYK', '0.1', 'Hvorfor får mange med atrieflimmer blodfortynnende', 'For å redusere risikoen for hjerneslag', 'Norsk elektronisk legehåndbok: atrieflimmer'],
  ['SSYK', '0.4', 'Hva er vanligste årsak til hjerteinfarkt', 'En blodpropp i en kransarterie', 'Norsk elektronisk legehåndbok: hjerteinfarkt'],
  ['SSYK', '0.7', 'Hva regnes som høyt blodtrykk hos voksne', '140/90 mmHg eller høyere', 'Helsedirektoratet, Retningslinje for forebygging av hjerte- og karsykdom'],
  ['SSYK', '1.0', 'Hva er et vanlig mål for oksygenmetning hos noen med alvorlig KOLS', '88–92 %', 'Helsedirektoratet, KOLS-retningslinjen'],
  ['SSYK', '2.0', 'En våken pasient med diabetes er svett, skjelven', 'Gir raske karbohydrater, for eksempel juice eller druesukker', 'Helsedirektoratet, Diabetesretningslinjen: hypoglykemi'],
  ['SSYK', '2.1', 'Hva viser HbA1c', 'Gjennomsnittlig blodsukker de siste 2–3 månedene', 'Helsedirektoratet, Diabetesretningslinjen'],
  ['SSYK', '2.2', 'Hva er årsaken til type 1-diabetes', 'Kroppen lager ikke insulin', 'Helsedirektoratet, Diabetesretningslinjen'],
  ['SSYK', '3.0', 'Hvilke tre kriterier er med i qSOFA', 'Respirasjonsfrekvens ≥ 22, endret mental status, systolisk blodtrykk ≤ 100', 'Sepsis-3 (Singer m.fl., JAMA 2016)'],
  ['SSYK', '4.2', 'Hva er laveste og høyeste mulige GCS-poeng', '3 og 15', 'Glasgow Coma Scale'],
  ['SSYK', '4.4', 'Hva står FAST for ved mistanke om hjerneslag', 'Face, Arm, Speech, Time', 'Helsedirektoratet, «Prate – Smile – Løfte»'],
  ['SSYK', '4.6', 'Et hjerneslag i venstre hjernehalvdel gir oftest lammelse i', 'høyre side av kroppen', 'Banene krysser over til motsatt side'],
  // ---------- Sykepleie: lov og etikk ----------
  ['SLOV', '0.0', 'En venn spør om en kjent person som er innlagt', 'Sier ingenting, verken bekrefter eller avkrefter', 'Helsepersonelloven § 21'],
  ['SLOV', '0.2', 'Gjelder taushetsplikten etter at du har sluttet', 'Ja', 'Helsepersonelloven § 21 (gjelder også etter at arbeidet er avsluttet)'],
  ['SLOV', '0.4', 'Hvem har taushetsplikt etter helsepersonelloven', 'Alt helsepersonell, også studenter i praksis', 'Helsepersonelloven §§ 3 og 21'],
  ['SLOV', '0.5', 'Når har helsepersonell opplysningsplikt til barnevernet', 'Ved grunn til å tro at et barn blir mishandlet eller utsatt for alvorlig omsorgssvikt', 'Helsepersonelloven § 33'],
  ['SLOV', '1.0', 'Hva er helserettslig myndighetsalder i Norge', '16 år', 'Pasient- og brukerrettighetsloven § 4-3'],
  ['SLOV', '1.2', 'Kan en pasient trekke tilbake et samtykke', 'Ja, når som helst', 'Pasient- og brukerrettighetsloven § 4-1'],
  ['SLOV', '1.3', 'Har pasienten rett til å lese sin egen journal', 'Ja, som hovedregel', 'Pasient- og brukerrettighetsloven § 5-1'],
  ['SLOV', '1.5', 'Fra hvilken alder kan man som hovedregel samtykke selv', 16, 'Pasient- og brukerrettighetsloven § 4-3'],
  ['SLOV', '2.0', 'Hvilket prinsipp handler om pasientens rett til å bestemme', 'Autonomi', 'Beauchamp og Childress, de fire prinsippene'],
  ['SLOV', '2.2', 'Hvilken teoretiker er kjent for menneske-til-menneske', 'Joyce Travelbee', 'Travelbee, Mellommenneskelige forhold i sykepleie'],
  ['SLOV', '2.5', 'Hvilken sykepleieteoretiker er kjent for teorien om egenomsorg', 'Dorothea Orem', 'Orem, Nursing: Concepts of Practice'],
  ['SLOV', '3.1', 'Pasienten snakker lite norsk', 'Bestiller kvalifisert tolk', 'Tolkeloven § 6 (barn skal ikke brukes som tolk)'],
  // ---------- Jus: metode og domstoler ----------
  ['JMET', '0.0', 'Hvilken rettskilde står høyest', 'Grunnloven', 'Lex superior; Grunnloven § 89'],
  ['JMET', '0.1', 'En lov og en forskrift er i strid', 'Loven', 'Lex superior'],
  ['JMET', '0.2', 'Hva betyr lex specialis', 'Den spesielle regelen går foran den generelle', 'Alminnelig rettskildelære'],
  ['JMET', '0.5', 'Hvilket prinsipp krever lovhjemmel', 'Legalitetsprinsippet', 'Grunnloven § 113'],
  ['JMET', '1.1', 'Regelen får et snevrere område enn ordlyden', 'Innskrenkende tolkning', 'Alminnelig rettskildelære'],
  ['JMET', '1.2', 'En regel brukes på et tilfelle som ligner', 'Analogi', 'Alminnelig rettskildelære'],
  ['JMET', '1.3', 'Hvor er analogi til skade for tiltalte ikke tillatt', 'I strafferetten', 'Grunnloven § 96'],
  ['JMET', '1.4', '«Bare ektefeller har rett til X»', 'De har ikke rett til X', 'Antitetisk tolkning'],
  ['JMET', '2.0', 'Hvilken domstol behandler straffesaker i første instans', 'Tingretten', 'Straffeprosessloven § 5'],
  ['JMET', '2.1', 'Hvor mange dommere avgjør vanligvis en sak i Høyesterett', 5, 'Domstolloven § 5 første ledd'],
  ['JMET', '2.2', 'Hvor mange dommere sitter i storkammer', 11, 'Domstolloven § 5 fjerde ledd'],
  ['JMET', '2.3', 'Hvem avgjør om en anke slipper inn til Høyesterett', 'Høyesteretts ankeutvalg', 'Tvisteloven § 30-4, straffeprosessloven § 323'],
  // ---------- Jus: statsrett og menneskerettigheter ----------
  ['JSTAT', '0.0', 'Hvor mange representanter har Stortinget', 169, 'Grunnloven § 57'],
  ['JSTAT', '0.1', 'Hvor ofte er det stortingsvalg', 4, 'Grunnloven § 54'],
  ['JSTAT', '0.2', 'Hvilken statsmakt har den lovgivende makten', 'Stortinget', 'Grunnloven § 75 a'],
  ['JSTAT', '0.4', 'Hvilken paragraf forbyr lover med tilbakevirkende kraft', '§ 97', 'Grunnloven § 97'],
  ['JSTAT', '0.5', 'Hvilket flertall kreves for å endre Grunnloven', 'To tredjedeler', 'Grunnloven § 121'],
  ['JSTAT', '0.6', 'Hva skjer etter parlamentarismen hvis Stortinget vedtar mistillit', 'Regjeringen må gå av', 'Grunnloven § 15'],
  ['JSTAT', '1.0', 'Hvilken lov gir EMK forrang', 'Menneskerettsloven § 3', 'Menneskerettsloven § 3'],
  ['JSTAT', '1.1', 'Hvor ligger Den europeiske menneskerettsdomstolen', 'Strasbourg', 'EMK art. 19'],
  ['JSTAT', '1.2', 'Hvilken domstol tolker EØS-avtalen for Norge', 'EFTA-domstolen', 'ODA-avtalen art. 32'],
  ['JSTAT', '1.4', 'Hvor mange konvensjoner er tatt inn i menneskerettsloven', 5, 'Menneskerettsloven § 2'],
  // ---------- Jus: avtale- og kjøpsrett ----------
  ['JAVT', '0.1', 'Aksepten kommer etter fristen', 'Et nytt tilbud', 'Avtaleloven § 4 første ledd'],
  ['JAVT', '0.2', 'Aksepten endrer prisen', 'Et avslag og et nytt tilbud', 'Avtaleloven § 6 første ledd'],
  ['JAVT', '0.3', 'Er en muntlig avtale bindende', 'Ja, det er formfrihet', 'Alminnelig avtalerett (NL 5-1-2)'],
  ['JAVT', '0.5', 'Når må et tilbakekall komme frem', 'Før eller samtidig med tilbudet', 'Avtaleloven § 7'],
  ['JAVT', '1.0', 'Hvilken paragraf lar domstolen endre en urimelig avtale', '§ 36', 'Avtaleloven § 36'],
  ['JAVT', '1.1', 'En nettbutikk skriver 10 kr for en PC', 'Feilskrift, § 32', 'Avtaleloven § 32'],
  ['JAVT', '1.2', 'Selgeren lyver om at bilen aldri', 'Svik, § 30', 'Avtaleloven § 30'],
  ['JAVT', '1.4', 'Noen trues med vold til å signere', 'Avtalen er ugyldig, også mot godtroende', 'Avtaleloven § 28 (råere tvang)'],
  ['JAVT', '2.0', 'Hva er den absolutte reklamasjonsfristen for vanlige varer', 2, 'Forbrukerkjøpsloven § 27 annet ledd'],
  ['JAVT', '2.1', 'Hva er fristen for ting som skal vare vesentlig lenger', 5, 'Forbrukerkjøpsloven § 27 annet ledd'],
  ['JAVT', '2.3', 'En forbruker har kjøpt en vare med mangel', 'Når mangelen ikke er uvesentlig', 'Forbrukerkjøpsloven § 32'],
  ['JAVT', '2.4', 'Hvilken frist har en forbruker alltid', 2, 'Forbrukerkjøpsloven § 27 første ledd'],
  // ---------- Jus: erstatningsrett ----------
  ['JERS', '0.0', 'Hvor mange grunnvilkår må være oppfylt for erstatning', 3, 'Ansvarsgrunnlag, økonomisk tap og årsakssammenheng'],
  ['JERS', '0.1', 'Hva er det vanligste ansvarsgrunnlaget', 'Skyld (culpa)', 'Alminnelig erstatningsrett'],
  ['JERS', '0.3', 'Hva kalles penger for krenkelse', 'Oppreisning', 'Skadeserstatningsloven § 3-5'],
  ['JERS', '0.4', 'Skadelidte var selv uaktsom', 'Erstatningen kan settes ned (medvirkning)', 'Skadeserstatningsloven § 5-1'],
  ['JERS', '1.0', 'Hva er den alminnelige foreldelsesfristen', 3, 'Foreldelsesloven § 2 og § 9'],
  ['JERS', '1.1', 'Hva er den ytterste fristen for erstatningskrav', 20, 'Foreldelsesloven § 9 annet ledd'],
  ['JERS', '1.2', 'En ansatt i et flyttebyrå mister et piano', 'Arbeidsgiveren', 'Skadeserstatningsloven § 2-1'],
  ['JERS', '1.3', 'Hva er objektivt ansvar', 'Ansvar uten skyld', 'Alminnelig erstatningsrett'],
  ['JERS', '1.4', 'Hva avbryter foreldelse', 'At skyldneren erkjenner kravet', 'Foreldelsesloven § 14'],
  ['JERS', '1.5', 'Hvilken type ansvar gjelder for skade voldt av bil', 'Objektivt ansvar', 'Bilansvarslova § 4'],
  // ---------- Jus: forvaltningsrett ----------
  ['JFORV', '0.0', 'Kommunen avslår en byggesøknad fra Lise', 'Et enkeltvedtak', 'Forvaltningsloven § 2 første ledd b'],
  ['JFORV', '0.1', 'Et vedtak som gjelder et ubestemt antall personer', 'forskrift', 'Forvaltningsloven § 2 første ledd c'],
  ['JFORV', '0.2', 'Saksbehandleren skal avgjøre søknaden til sin egen bror', 'Hen er inhabil', 'Forvaltningsloven § 6 første ledd b'],
  ['JFORV', '0.3', 'Hvilken paragraf krever at enkeltvedtak begrunnes', '§ 24', 'Forvaltningsloven § 24'],
  ['JFORV', '0.5', 'Hvilken plikt har forvaltningen etter § 11', 'Veiledningsplikt', 'Forvaltningsloven § 11'],
  ['JFORV', '1.0', 'Hva er klagefristen for enkeltvedtak', 3, 'Forvaltningsloven § 29'],
  ['JFORV', '1.1', 'Fra når regnes klagefristen', 'Fra vedtaket kom frem til parten', 'Forvaltningsloven § 29 første ledd'],
  ['JFORV', '1.2', 'Hvor skal klagen sendes', 'Til organet som traff vedtaket', 'Forvaltningsloven § 32'],
  ['JFORV', '1.3', 'Kan klageinstansen prøve skjønnet', 'Ja, alle sider av saken', 'Forvaltningsloven § 34'],
  ['JFORV', '1.5', 'Hvem er vanligvis klageinstans for vedtak fra kommunen etter plan', 'Statsforvalteren', 'Plan- og bygningsloven § 1-9'],
  ['JFORV', '2.0', 'Hvem kan kreve innsyn etter offentleglova', 'Alle', 'Offentleglova § 3'],
  ['JFORV', '2.1', 'Må du begrunne et innsynskrav', 'Nei', 'Offentleglova § 28'],
  // ---------- Jus: strafferett ----------
  ['JSTR', '0.0', 'Hvor mange straffbarhetsvilkår er det', 4, 'Straffeloven: straffebud, ingen frifinnelsesgrunn, skyld, tilregnelighet'],
  ['JSTR', '0.1', 'Hva er den strafferettslige lavalderen', 15, 'Straffeloven § 20 første ledd a'],
  ['JSTR', '0.2', 'Hvilken skyldform er hovedregelen', 'Forsett', 'Straffeloven § 21'],
  ['JSTR', '0.3', 'Hvilken paragraf i Grunnloven krever lovhjemmel for straff', '§ 96', 'Grunnloven § 96'],
  ['JSTR', '0.4', 'Hvilket beviskrav gjelder for skyld i straffesaker', 'Utover enhver rimelig tvil', 'Rt. 1993 s. 1077 / EMK art. 6 nr. 2'],
  ['JSTR', '1.0', 'Du blir angrepet og slår tilbake', 'Nødverge, § 18', 'Straffeloven § 18'],
  ['JSTR', '1.1', 'Hva kreves for nødrett', 'At skaden som avverges, er betydelig større enn skaden man volder', 'Straffeloven § 17'],
  ['JSTR', '1.2', 'Hva skjer med den som frivillig trekker seg fra et forsøk', 'Hen straffes ikke for forsøket', 'Straffeloven § 16 første ledd'],
  ['JSTR', '1.4', 'Nødverge kan ikke gå', 'klart ut over det som er forsvarlig', 'Straffeloven § 18 første ledd c'],
  ['JSTR', '2.0', 'Hva er et forelegg', 'Et tilbud om bot uten rettssak', 'Straffeprosessloven § 255'],
  ['JSTR', '2.3', 'Hvilken aldersgruppe kan få ungdomsstraff', '15–17 år', 'Straffeloven § 52 a'],
];
const perCourse = {};
for(const [code, id, start, want, src] of FIXED){
  const c = C(code), [u, i] = id.split('.').map(Number), q = c && c.units[u] && c.units[u].qs[i], w = `${code} ${id}`;
  if(!src) E(w, 'mangler kilde');
  if(!q) { E(w, 'finnes ikke lenger'); continue; }
  if(!String(q[0]).startsWith(start)) { E(w, `spørsmålet er byttet ut eller flyttet: «${String(q[0]).slice(0, 80)}»`); continue; }
  const got = Array.isArray(q[1]) ? q[1][0] : q[1].n;
  if(typeof want === 'number' ? !close(got, want, Array.isArray(q[1]) ? 0 : q[1].tol) : got !== want) E(w, `fasiten er endret: «${got}» (håndkontrollert: «${want}», ${src})`);
  perCourse[code] = (perCourse[code] || 0) + 1; nChecked++;
}
for(const code of ['FKB', 'FKMC', 'SLMR', 'SANA', 'SFARM', 'SMIK', 'SKLIN', 'SSYK', 'SLOV', ...M.COURSES.filter(c => /^J/.test(c.code)).map(c => c.code)])
  if((perCourse[code] || 0) < 10) E(code, `bare ${perCourse[code] || 0} håndkontrollerte spørsmål (skal ha minst 10)`);

// ================= 3) Matte og fysikk: 5 stikkprøver per fag =================
const D = Math.PI / 180, g0 = 9.81;
const MP = {
  GMAT: [['0.g4', 'endres fra # kr til # kr', ([a, b]) => (b - a) / a * 100], ['2.g0', 'Løs ligningen #x \\+ # = #', ([a, b, c]) => (c - b) / a],
    ['3.g0', 'gjennom punktene \\(#, #\\) og \\(#, #\\)', ([x1, y1, x2, y2]) => (y2 - y1) / (x2 - x1)], ['4.g1', 'setter inn # kr på en konto med # % rente per år\\. Hvor mye står på kontoen etter # år', ([k, p, n]) => k * (1 + p / 100) ** n],
    ['5.g1', 'En stige på # m står mot en loddrett vegg med foten # m', ([l, a]) => Math.sqrt(l * l - a * a)]],
  GFYS: [['0.g1', 'Hva er # km/h i m/s', ([v]) => v / 3.6], ['1.g1', 'farten jevnt fra # m/s til # m/s på # s', ([a, b, t]) => (b - a) / t],
    ['1.g3', 'kastes rett opp med farten # m/s', ([v]) => v * v / (2 * g0)], ['3.g1', 'massen # kg og farten # m/s', ([m, v]) => m * v * v / 2],
    ['5.g4', 'To motstander på # Ω og # Ω er koblet i parallell til et batteri på # V', ([a, b, U]) => U / (a * b / (a + b))]],
  MEK1000: [['0.g4', 'tangenten til y = x\\^\\{#\\} i punktet x = #', ([n, x]) => n * x ** (n - 1)], ['0.g6', 'f\\(x\\) = #\\\\sqrt\\{x\\}\\. Hva er f\'\\(#\\)', ([a, x]) => a / (2 * Math.sqrt(x))],
    ['1.g0', '\\\\int_0\\^\\{#\\} \\(#x\\^2 \\+ #\\)', ([b, a, c]) => a * b ** 3 / 3 + c * b], ['2.g0', '\\|# ([+-]) #i\\|', (v, m) => Math.hypot(num(m[1]), num(m[3]))],
    ['3.g3', 'Du løser x\\^2 - # = 0 med Newtons metode og starter i x_0 = #', ([c, x]) => x - (x * x - c) / (2 * x)]],
  MEK1400: [['0.g0', 'fjær med k = # N/m bærer en masse på # kg', ([k, m]) => Math.sqrt(k / m)], ['0.g1', 'pendel med lengde # m', ([l]) => 2 * Math.PI * Math.sqrt(l / g0)],
    ['0.g2', 'bølge med frekvens # Hz går med farten # m/s', ([f, v]) => v / f], ['0.g4', 'fjær med k = # N/m trykkes # cm sammen', ([k, x]) => k * (x / 100) ** 2 / 2],
    ['2.g7', 'jernbanevogn på # tonn ruller med # m/s og støter inn i en vogn på # tonn som står i ro', ([m1, v, m2]) => m1 * v / (m1 + m2)]],
  MEK2000: [['0.g0', '\\\\det\\\\begin\\{pmatrix\\}#&#\\\\\\\\#&#\\\\end', ([a, b, c, d]) => a * d - b * c], ['0.g1', '^\\(#, #, #\\)\\\\cdot\\(#, #, #\\)', ([a, b, c, d, e, f]) => a * d + b * e + c * f],
    ['0.g4', 'Hva er lengden av vektoren \\(#, #, #\\)', ([a, b, c]) => Math.hypot(a, b, c)], ['2.g2', 'perioden til løsningene av y\'\' \\+ #y = 0', ([k]) => 2 * Math.PI / Math.sqrt(k)],
    ['2.g3', 'likevektsløsningen \\(stasjonær verdi\\) til y\' = # - #y', ([a, b]) => a / b]],
  MEK2200: [['0.g0', '# uavhengige komponenter i parallell har pålitelighet # hver', ([n, r]) => 1 - (1 - r) ** n], ['0.g2', 'P\\(A\\) = #, P\\(B\\) = # og P\\(A\\\\cap B\\) = #', ([a, b, c]) => a + b - c],
    ['1.g0', 'X\\\\sim\\\\text\\{Bin\\}\\(#,\\\\ #\\)\\. Hva er \\\\text\\{Var\\}', ([n, p]) => n * p * (1 - p)], ['1.g3', 'normalfordelt med \\\\mu = # og \\\\sigma = #\\. Hva er z-verdien til x = #', ([mu, s, x]) => (x - mu) / s],
    ['2.g3', 'MTBF = # h og MTTR = # h', ([a, b]) => a / (a + b)]],
  DAVE3700: [['1.g0', 'iint_\\{\\[0,#\\]\\\\times\\[0,#\\]\\} xy', ([a, b]) => a * a / 2 * b * b / 2], ['1.g1', 'disk med radius #', ([r]) => Math.PI * r * r],
    ['1.g4', 'volumet av en sylinder med radius # og høyde #', ([r, h]) => Math.PI * r * r * h], ['1.g5', 'arealet av rektangelet R=\\[0,#\\]\\\\times\\[0,#\\]', ([a, b]) => a * b],
    ['1.g6', 'ringen \\(annulus\\) mellom radius # og radius #', ([a, b]) => Math.PI * (b * b - a * a)]],
  DAVE3705: [['1.g3', 'Hva er b_\\{#\\}', ([n]) => 2 * (-1) ** (n + 1) / n], ['2.g4', 'stav med lengde # har u\\(0\\) = # og u\\(#\\) = #\\. Hva er u\\(#\\)', ([L, a, , b, x]) => a + (b - a) * x / L],
    ['2.g5', 'bølgefarten c i u_\\{tt\\} = #\\\\,u_\\{xx\\}', ([k]) => Math.sqrt(k)], ['2.g1', 'streng med lengde # og bølgefart c = # er fast i begge ender\\. Hva er vinkelfrekvensen til mode #', ([L, c, n]) => n * Math.PI * c / L],
    ['2.g3', 'X\\(0\\) = X\\(#\\) = 0\\. Hva er egenverdi nummer #', ([L, n]) => (n * Math.PI / L) ** 2]],
  NUM: [['0.g1', 'Ett Newton-steg på f\\(x\\) = x\\^3 - # fra x_0 = #', ([c, x]) => x - (x ** 3 - c) / (3 * x * x)], ['0.g4', 'f\\(x\\)=x\\^2-#=0\\. Bruk ett steg fra x_0=#', ([c, x]) => x - (x * x - c) / (2 * x)],
    ['1.g0', 'mellom \\(#, #\\) og \\(#, #\\)\\. Hva er y i x = #', ([x1, y1, x2, y2, x]) => y1 + (y2 - y1) * (x - x1) / (x2 - x1)], ['1.g4', 'midtpunktregelen med ett intervall til å tilnærme \\\\displaystyle\\\\int_\\{#\\}\\^\\{#\\} x\\^2', ([a, b]) => (b - a) * ((a + b) / 2) ** 2],
    ['2.g0', 'To steg med Eulers metode for y\' = y, y\\(0\\) = # og h = #', ([y, h]) => y * (1 + h) ** 2]],
  VG1T: [['0.g0', 'Løs likningen #x - # = #', ([a, b, c]) => (c + b) / a], ['1.g0', 'En rett linje går gjennom \\(#, #\\) og \\(#, #\\)', ([x1, y1, x2, y2]) => (y2 - y1) / (x2 - x1)],
    ['3.g2', 'a = #, b = # og C = #\\^\\\\circ\\. Finn siden c', ([a, b, C]) => Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * D))], ['3.g3', 'sidene a = # og b = #, og vinkelen mellom dem er #\\^\\\\circ\\. Hva er arealet', ([a, b, C]) => a * b * Math.sin(C * D) / 2],
    ['7.g4', 'En verdi er # kr og synker med # % per år\\. Hva er verdien etter # år', ([k, p, n]) => k * (1 - p / 100) ** n]],
  VGR1: [['0.g1', 'Løs # \\\\cdot #\\^x = #', ([a, b, c]) => Math.log(c / a) / Math.log(b)], ['2.g0', 'Regn ut \\[#, #\\] \\\\cdot \\[#, #\\]', ([a, b, c, d]) => a * c + b * d],
    ['2.g1', 'avstanden fra A\\(#, #\\) til B\\(#, #\\)', ([a, b, c, d]) => Math.hypot(c - a, d - b)], ['3.g0', 'velge # av # personer', ([k, n]) => fact(n) / (fact(k) * fact(n - k))],
    ['3.g3', '# løpere deltar\\. På hvor mange måter kan gull, sølv, bronse fordeles', ([n]) => n * (n - 1) * (n - 2)]],
  VGR2: [['1.g0', 'aritmetisk følge har a_1 = # og d = #\\. Finn a_\\{#\\}', ([a, d, n]) => a + (n - 1) * d], ['1.g1', 'uendelige geometriske rekken med a_1 = # og k = #', ([a, k]) => a / (1 - k)],
    ['1.g2', 'de # første leddene i den geometriske rekken med a_1 = # og k = #', ([n, a, k]) => a * (k ** n - 1) / (k - 1)], ['7.g0', 'Regn ut 1 \\+ 2 \\+ 3 \\+ \\\\dots \\+ #', ([n]) => n * (n + 1) / 2],
    ['7.g2', 'Regn ut 1\\^2 \\+ 2\\^2 \\+ \\\\dots \\+ #\\^2', ([n]) => n * (n + 1) * (2 * n + 1) / 6]],
  VGS1: [['0.g1', 'En jakke koster # kr etter # % rabatt', ([p, r]) => p / (1 - r / 100)], ['0.g2', 'Løs likningen #x \\+ # = #x \\+ #', ([a, b, c, d]) => (d - b) / (a - c)],
    ['1.g2', 'koster # kr i fastpris og # kr per time\\. Hvor mange timer får du for # kr', ([f, r, t]) => (t - f) / r], ['3.g1', 'suksess i ett forsøk er #\\. Hva er sannsynligheten for minst én suksess på # forsøk', ([p, n]) => 1 - (1 - p) ** n],
    ['6.g4', 'En verdi er # kr og øker med # % per år\\. Hva er verdien etter # år', ([k, p, n]) => k * (1 + p / 100) ** n]],
  VGS2: [['0.g0', 'aritmetisk følge har a_1 = # og d = #\\. Finn a_\\{#\\}', ([a, d, n]) => a + (n - 1) * d], ['0.g3', 'aritmetisk rekke har a_1 = # og differanse d = #\\. Hva er summen av de # første', ([a, d, n]) => n * (2 * a + (n - 1) * d) / 2],
    ['1.g1', 'annuitetslån på # kr har # % rente og # årlige terminer', ([K, p, n]) => { const r = p / 100; return K * r / (1 - (1 + r) ** -n); }],
    ['1.g3', 'Serielån på # kr, # årlige terminer, # % rente\\. Hva er terminbeløp nummer #', ([K, n, p, k]) => K / n + (K - (k - 1) * K / n) * p / 100],
    ['4.g1', 'binomisk med n = # og p = #\\. Hva er standardavviket', ([n, p]) => Math.sqrt(n * p * (1 - p))]],
  VG1P: [['0.g0', 'En vare koster # kr\\. Prisen settes ned med # %', ([p, r]) => p * (1 - r / 100)], ['1.g0', 'Du sparer # kr med # % årlig rente\\. Hvor mye står på kontoen etter # år', ([k, p, n]) => k * (1 + p / 100) ** n],
    ['1.g1', 'Bruttolønnen er # kr i måneden, og skattetrekket er # %', ([b, s]) => b * (1 - s / 100)], ['2.g0', 'målestokk 1 : #\\. Hvor mange km er # cm', ([m, c]) => m * c / 100000],
    ['3.g0', 'Tilbud A koster # \\+ #x kr og tilbud B # \\+ #x kr', ([a, b, c, d]) => (c - a) / (b - d)]],
  VG2P: [['0.g1', 'Finn gjennomsnittet til (.+)\\.$', (v, m) => { const xs = m[1].split(/,\s*/).map(num); return xs.reduce((s, x) => s + x, 0) / xs.length; }],
    ['0.g0', 'Finn medianen til (.+)\\.$', (v, m) => { const xs = m[1].split(/,\s*/).map(num).sort((a, b) => a - b), n = xs.length; return n % 2 ? xs[(n - 1) / 2] : (xs[n / 2 - 1] + xs[n / 2]) / 2; }],
    ['1.g0', 'En størrelse er # og vokser # % i året\\. Hva er den etter # år', ([a, p, n]) => a * (1 + p / 100) ** n], ['2.g0', 'Hvilken eksponent n gir # \\\\cdot 10\\^\\{n\\} = #', ([a, b]) => Math.round(Math.log10(b / a))]], // faget har bare 4 generatorer
  VGFY1: [['0.g0', 'Hvor langt har den falt etter # s', ([t]) => g0 * t * t / 2], ['0.g1', 'bil med fart # m/s bremser med # m/s²', ([v, a]) => v * v / (2 * a)],
    ['0.g2', 'startfart # m/s og akselerasjon # m/s²\\. Hva er farten etter # s', ([v, a, t]) => v + a * t], ['1.g1', 'kasse på # kg skyves langs et vannrett gulv\\. Friksjonstallet er #', ([m, mu]) => mu * m * g0],
    ['3.g0', 'motstand på # Ω er koblet til # V', ([R, U]) => U / R]],
  VGFY2: [['0.g0', 'kastes med # m/s i # ?° vinkel over flat mark', ([v, a]) => v * v * Math.sin(2 * a * D) / g0], ['0.g1', 'kastes vannrett med # m/s fra # m høyde', ([v, h]) => v * Math.sqrt(2 * h / g0)],
    ['1.g1', 'masse # kg går i en sirkel med radius # m og fart # m/s', ([m, r, v]) => m * v * v / r], ['2.g0', 'leder med lengde # m beveger seg med # m/s vinkelrett på et magnetfelt på # T', ([l, v, B]) => l * v * B],
    ['3.g0', 'romskip har fart #c\\. Om bord går det # år', ([b, t]) => t / Math.sqrt(1 - b * b)]],
  GS14: [['0.g0', 'Hvilket tall er # hundrere, # tiere og # enere', ([h, t, e]) => 100 * h + 10 * t + e], ['1.g4', 'har # klistremerker og gir bort #', ([a, b]) => a - b],
    ['2.g0', 'Hva er # \\\\cdot #\\?', ([a, b]) => a * b], ['3.g1', 'Hva blir resten når du deler # på #', ([a, b]) => a % b], ['6.g0', 'Hvor mange centimeter er # meter', ([a]) => a * 100]],
  GS57: [['0.g0', 'Hva er \\\\frac\\{#\\}\\{#\\} av #', ([t, d, n]) => n / d * t], ['2.g0', 'Hva er # % av #', ([p, b]) => b * p / 100],
    ['3.g1', 'trekant har grunnlinje # cm og høyde # cm', ([g, h]) => g * h / 2], ['6.g2', 'Løs #x \\+ # = #', ([a, c, b]) => (b - c) / a], ['7.g1', 'Regn ut -# \\+ #', ([a, b]) => b - a]],
  GU810: [['0.g0', 'Regn ut # \\+ # \\\\cdot #', ([a, b, c]) => a + b * c], ['0.g1', 'Regn ut \\(# \\+ #\\) \\\\cdot #', ([a, b, c]) => (a + b) * c],
    ['1.g2', 'setter # kr i banken med # % rente per år\\. Hvor mye har du etter # år', ([k, p, n]) => Math.round(k * (1 + p / 100) ** n)], ['3.g2', 'Løs #\\(x \\+ #\\) = #', ([a, b, c]) => c / a - b],
    ['5.g2', 'arealet av en sirkel med radius # cm', ([r]) => Math.round(Math.PI * r * r * 10) / 10]],
};
function fact(n){ let f = 1; for(let i = 2; i <= n; i++) f *= i; return f; }
for(const [code, list] of Object.entries(MP)){
  const nGen = C(code).units.reduce((a, u) => a + (u.gen || []).length, 0);
  if(list.length < Math.min(5, nGen)) E(code, 'færre enn 5 stikkprøver');
  for(const [id, pat, f] of list) try{ check(code, id, pat, f); }catch(e){ E(`${code} ${id}`, e.message); }
}
console.log(`fasiter sjekket: ${nChecked} (generatorer kjørt ${RUNS} ganger hver), håndkontrollerte faste: ${FIXED.length}, matte/fysikk-fag: ${Object.keys(MP).length}, feil: ${errs.length}`);
errs.forEach(e => console.log(' - ' + e)); process.exit(errs.length ? 1 : 0);
