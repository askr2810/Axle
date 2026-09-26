// Ordfilteret (friends.js isClean, samme regler som public.is_clean i venner.sql):
// vanlige norske ord og gruppenavn skal slippe gjennom, stygge ord skal stoppes, og reglene i appen og databasen skal være like.
const fs = require('fs'), path = require('path'), ROOT = path.join(__dirname, '..');
const fr = fs.readFileSync(path.join(ROOT, 'friends.js'), 'utf8'), sql = fs.readFileSync(path.join(ROOT, 'supabase', 'venner.sql'), 'utf8');
const sub = fr.match(/const BAD_SUB = \/\((.*?)\)\//)[1], word = fr.match(/const BAD_WORD = \/ \((.*?)\) \//)[1];
let bad = 0; const fail = m => { bad++; console.log(m); };
if(!sql.includes(`squashed ~ '(${sub})'`)) fail('BAD_SUB i friends.js og venner.sql er ulike');
if(!sql.includes(`' (${word}) '`)) fail('BAD_WORD i friends.js og venner.sql er ulike');
const src = fr.slice(fr.indexOf('const BAD_SUB'), fr.indexOf('\n}', fr.indexOf('function isClean(')) + 2);
const isClean = new Function(src + '\nreturn isClean;')();
const ok = ['Fysikk-kollokvie', 'Faggruppe maskin', 'Avslutning 3. klasse', 'Sluttspurt eksamen', 'Profitten i prosjektet', 'Kull 2027', 'Termo-gjengen', 'Familien', 'Pikkolo og fløyte', 'Bastardfil', 'Elkraft 101', 'Statikk & dynamikk', 'Mekanikk-klubben', 'Anna Fagerli', 'Jon Slutvik'];
const no = ['fuck this', 'f u c k', 'slut', 'du er en hore', 'Faen', 'kkk', 'nazi gruppe', 'n1gger', 'p0rn', 'fitte'];
for(const x of ok) if(!isClean(x)) fail('stoppet (skulle slippe gjennom): ' + x);
for(const x of no) if(isClean(x)) fail('slapp gjennom (skulle stoppes): ' + x);
console.log(`ordfilter: ${ok.length + no.length} eksempler, feil: ${bad}`);
if(bad) process.exit(1);
