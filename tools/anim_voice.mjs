// Lager fortellerstemmen for en animasjon i anim.js som ferdige lydfiler, én per replikk, pluss manifest.json med varighet og et
// fingeravtrykk av teksten. Appen spiller bare av filene; den lager aldri tale og kontakter ingen tjeneste. Se docs/ANIMASJONER.md.
//
//   node tools/anim_voice.mjs derivasjon --provider elevenlabs [--lang nb]   publiseres: assets/anim/<id>/ (i Git, kopieres av build.py)
//   node tools/anim_voice.mjs derivasjon --provider say [--lang nb]          bare lokalt: local/anim-audio/<id>/ (i .gitignore)
//   … --dry-run   viser manus, språk, stemme-ID, modell, antall tegn og hvilke replikker som må lages, uten å lage noe
//   … --force     lager alle replikkene på nytt (ellers bare de der teksten eller stemmen er endret)
//   node tools/anim_voice.mjs --plan                       viser ElevenLabs-planen (nivå, status, tegn brukt), aldri nøkkelen
//   node tools/anim_voice.mjs --voices                     viser stemmene på kontoen (navn, ID, språk)
//   node tools/anim_voice.mjs derivasjon --provider elevenlabs --sample [l01,l08]
//                  privat stemmeprøve til local/anim-voice-sample/ (i .gitignore). Aldri i repoet, i bygget eller på axle.no.
//
// Lisens: lyd fra gratisplanen har ingen kommersiell lisens og får det ikke ved senere oppgradering. Endelig lyd (uten --sample)
// lages derfor bare når planen er betalt og aktiv (status «active», nivå ≠ «free»). Planen som ble sjekket, lagres i manifestet.
// Ikke bruk Beta-modeller til lyd som skal publiseres: kontroller at ELEVENLABS_MODEL ikke er merket Beta hos ElevenLabs.
//
// ElevenLabs: ELEVENLABS_API_KEY og ELEVENLABS_VOICE_ID leses bare fra miljøet, skrives aldri ut og lagres ikke. ELEVENLABS_MODEL
// (standard eleven_multilingual_v2) og ELEVENLABS_SPEED (standard 0,95) kan settes. Bare manusteksten sendes. Les vilkårene for bruk av lyden først.
// say: macOS sin talesyntese. Apples lisens tillater bare personlig, ikke-kommersiell bruk av systemstemmene (ingen publisering),
// så disse filene er bare for å prøve tempo og synkronisering lokalt. Med --install kopieres de inn i release/www for en lokal test.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const KEY = () => process.env.ELEVENLABS_API_KEY || '';
async function el(pathname){ // GET mot ElevenLabs; nøkkelen sendes bare i headeren og skrives aldri ut
  const r = await fetch('https://api.elevenlabs.io' + pathname, { headers: { 'xi-api-key': KEY() } });
  if (!r.ok) throw new Error(`ElevenLabs svarte ${r.status} på ${pathname}`); return r.json(); }
async function plan(){ const s = await el('/v1/user/subscription');
  return { tier: s.tier, status: s.status, used: s.character_count, limit: s.character_limit, paid: s.status === 'active' && s.tier && s.tier !== 'free' }; }
if (args[0] === '--plan' || args[0] === '--voices') {
  if (!KEY()) { console.error('ELEVENLABS_API_KEY er ikke satt i dette skallet (nøkkelen må settes før kommandoen kjøres).'); process.exit(1); }
  console.log('ELEVENLABS_API_KEY: funnet (' + KEY().length + ' tegn, vises ikke)');
  if (args[0] === '--plan') { const p = await plan();
    console.log(`Plan: ${p.tier}  status: ${p.status}  tegn brukt: ${p.used} av ${p.limit}`);
    console.log(p.paid ? 'Betalt plan er aktiv: lyd laget nå har kommersiell lisens (unntatt Beta-tjenester). Kontroller vilkårene hos ElevenLabs.' : 'Ikke en aktiv betalt plan: lag bare private prøver (--sample). Endelig lyd blir nektet.'); }
  else { const v = await el('/v1/voices'); for (const x of v.voices || []) console.log(`${x.voice_id}  ${x.name}  ${[x.labels && x.labels.language, x.labels && x.labels.accent, x.labels && x.labels.gender, x.category].filter(Boolean).join(', ')}`); }
  process.exit(0);
}
const id = args[0], provider = opt('--provider') || 'say', lang = opt('--lang') || 'nb', dry = args.includes('--dry-run'), force = args.includes('--force');
const sample = args.includes('--sample'), sampleIds = (() => { const v = opt('--sample'); return v && !v.startsWith('--') ? v.split(',') : ['l01', 'l08']; })();
if (!id || id.startsWith('--') || !['say', 'elevenlabs'].includes(provider) || !['nb', 'en'].includes(lang)) {
  console.error('Bruk: node tools/anim_voice.mjs <id> --provider elevenlabs|say [--lang nb|en] [--dry-run] [--force] [--install]'); process.exit(1);
}
// manuset hentes fra anim.js (samme tekst som tekstingen)
const sandbox = `var LANG = ${JSON.stringify(lang)}, S = {}, screen = "", T = (a, b) => LANG === "en" ? b : a, esc = s => s, document = { addEventListener(){} };\n`;
const ANIMS = new Function(sandbox + fs.readFileSync(path.join(ROOT, 'anim.js'), 'utf8') + '\nreturn ANIMS;')();
const D = ANIMS[id]; if (!D) { console.error('Fant ikke animasjonen ' + id + ' i anim.js'); process.exit(1); }
const li = lang === 'en' ? 1 : 0;
// Uttale: en replikk kan ha say: [nb, en] når stemmen trenger en annen skrivemåte enn tekstingen.
const spoken = l => (l.say ? l.say[li] : l.vo[li]);
const sha = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);

const outRoot = sample ? path.join(ROOT, 'local', 'anim-voice-sample', id) : provider === 'elevenlabs' ? path.join(ROOT, 'assets', 'anim', id) : path.join(ROOT, 'local', 'anim-audio', id);
const ext = provider === 'elevenlabs' ? 'mp3' : 'm4a';
const manPath = path.join(outRoot, 'manifest.json');
const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};
// standardstemmer (AX-15b): nb «Sebastian» (eleven_flash_v2_5), en «Alice - Clear, Engaging Educator» (eleven_multilingual_v2);
// ELEVENLABS_VOICE_ID_NB/_EN eller ELEVENLABS_VOICE_ID overstyrer stemmen, ELEVENLABS_MODEL_NB/_EN eller ELEVENLABS_MODEL modellen
const DEF_VOICE = { nb: '4kCDY3HJwvO7Zp3con83', en: 'Xb7hH8MSUJpSbSDYk0k2' };
const DEF_MODEL = { nb: 'eleven_flash_v2_5', en: 'eleven_multilingual_v2' };
const model = process.env['ELEVENLABS_MODEL_' + lang.toUpperCase()] || process.env.ELEVENLABS_MODEL || DEF_MODEL[lang] || 'eleven_multilingual_v2';
const voice = provider === 'elevenlabs' ? (process.env['ELEVENLABS_VOICE_ID_' + lang.toUpperCase()] || process.env.ELEVENLABS_VOICE_ID || DEF_VOICE[lang]) : (opt('--voice') || 'Nora (Enhanced)');
const rate = +(opt('--rate') || 150); // say: ord per minutt (≈ 2,5 ord/s)
const voiceKey = provider === 'elevenlabs' ? `elevenlabs:${voice}:${model}` : `say:${voice}:${rate}`;
man[lang] = man[lang] || {};
const todo = sample ? D.lines.filter(l => sampleIds.includes(l.id)) : D.lines.filter(l => force || !man[lang][l.id] || man[lang][l.id].sha !== sha(spoken(l)) || man[lang][l.id].voice !== voiceKey);
console.log(`${D.t[li]} (${lang}, ${provider}${sample ? ', privat prøve' : ''}): ${D.lines.length} replikker, ${D.lines.reduce((n, l) => n + spoken(l).length, 0)} tegn; ${todo.length} skal lages (${todo.reduce((n, l) => n + spoken(l).length, 0)} tegn).`);
if (provider === 'elevenlabs') console.log(`Stemme-ID: ${voice || '(ELEVENLABS_VOICE_ID er ikke satt)'}  modell: ${model}  API-nøkkel: ${KEY() ? 'funnet (vises ikke)' : 'ikke satt'}`);
console.log('Mappe: ' + path.relative(ROOT, outRoot));
if (dry) { todo.forEach(l => console.log(`  ${l.id} (${l.d} s)  ${spoken(l)}`)); process.exit(0); }

if (provider === 'elevenlabs' && (!KEY() || !voice)) {
  console.error('ELEVENLABS_API_KEY må være satt i miljøet. Ingenting er laget.'); process.exit(1);
}
let planInfo = null;
if (provider === 'elevenlabs') {
  planInfo = await plan();
  console.log(`Plan: ${planInfo.tier} (${planInfo.status})`);
  if (!sample && !planInfo.paid) { console.error('Endelig lyd lages bare med en aktiv betalt plan (kommersiell lisens). Lag en privat prøve med --sample, eller aktiver en betalt plan først.'); process.exit(1); }
}
if (provider === 'say' && !execFileSync('say', ['-v', '?']).toString().includes(voice.replace(/ \(Enhanced\)$/, ''))) { console.error('Fant ikke stemmen ' + voice); process.exit(1); }
fs.mkdirSync(path.join(outRoot, lang), { recursive: true });
const durOf = f => { try { return Math.round(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString() * 100) / 100; } catch (e) {}
  const m = execFileSync('afinfo', [f]).toString().match(/estimated duration: ([\d.]+)/); return m ? Math.round(+m[1] * 100) / 100 : null; };
// filnavnet har et fingeravtrykk av stemme + tekst, så endret tekst gir ny fil (og gamle filer i cache brukes aldri for ny tekst)
const fileId = (l, text) => provider === 'elevenlabs' && !sample ? `${l.id}-${crypto.createHash('sha1').update(voiceKey + '\n' + text).digest('hex').slice(0, 10)}` : l.id;

for (const l of todo) {
  const k = D.lines.indexOf(l), text = spoken(l), file = path.join(outRoot, lang, `${fileId(l, text)}.${ext}`);
  if (provider === 'say') {
    const aiff = file.replace(/\.m4a$/, '.aiff');
    execFileSync('say', ['-v', voice, '-r', String(rate), '-o', aiff, text]);
    execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', aiff, file]); fs.unlinkSync(aiff);
  } else {
    const body = { text, model_id: model, language_code: lang === 'en' ? 'en' : 'no', seed: 7,
      previous_text: k > 0 ? spoken(D.lines[k - 1]) : undefined, next_text: k < D.lines.length - 1 ? spoken(D.lines[k + 1]) : undefined,
      voice_settings: { speed: +(process.env.ELEVENLABS_SPEED || 0.95) } };
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, body: JSON.stringify(body) });
    if (!r.ok) { console.error(`  ${l.id}: feil ${r.status} ${(await r.text()).slice(0, 200)}`); process.exit(1); }
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    // komprimer til 64 kbit/s mono (tale) hvis ffmpeg finnes
    try { execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file, '-ac', '1', '-b:a', '64k', '-map_metadata', '-1', file + '.tmp.mp3']); fs.renameSync(file + '.tmp.mp3', file); } catch (e) {}
    const old = man[lang][l.id] && man[lang][l.id].file; if (old && old !== `${lang}/${path.basename(file)}`) fs.rmSync(path.join(outRoot, old), { force: true });
  }
  const dur = durOf(file);
  man[lang][l.id] = { file: `${lang}/${path.basename(file)}`, dur, sha: sha(text), voice: voiceKey };
  const fits = dur + 0.4 <= l.d;
  console.log(`  ${l.id}: ${dur} s av ${l.d} s${fits ? '' : '  ← lengre enn replikken: bildet venter ved slutten'}  (${(text.split(/\s+/).length / dur).toFixed(2)} ord/s)`);
  fs.writeFileSync(manPath, JSON.stringify(man, null, 1));
}
man._meta = { provider, voice: voiceKey, made: new Date().toISOString().slice(0, 10), publish: provider === 'elevenlabs' && !sample,
  plan: planInfo ? { tier: planInfo.tier, status: planInfo.status, paid: planInfo.paid, checked: new Date().toISOString().slice(0, 10) } : null, sample };
fs.writeFileSync(manPath, JSON.stringify(man, null, 1));
if (args.includes('--install')) {
  const dst = path.join(ROOT, 'release', 'www', 'anim', id); fs.mkdirSync(dst, { recursive: true }); fs.cpSync(outRoot, dst, { recursive: true });
  console.log('Kopiert til ' + path.relative(ROOT, dst) + ' (bare lokalt; neste python3 build.py fjerner den, og den kommer aldri med på axle.no, som bygges fra repoet).');
}
console.log('Ferdig: ' + path.relative(ROOT, manPath));
