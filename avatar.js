// ============================================================
//  AVATARER OG LÆRERE
//  Én tegnefunksjon (SVG) brukes både til din egen avatar og til lærerne i fagene.
//  En avatar lagres som en kort kode med tall skilt av bindestrek, i rekkefølgen AV_KEYS.
//  Eldre koder (9 tall, der «tilbehør» også inneholdt briller) oversettes automatisk.
// ============================================================
const AV_SKIN = ["#FBD9C0", "#F1C19C", "#D9A274", "#B97F52", "#8D5A36", "#5E3A22", "#FFE7D6", "#E8B48A", "#7A4A2C", "#3F2616"];
const AV_HAIRC = ["#1F1A17", "#4A2E1D", "#8A5A2B", "#D9B25F", "#B5472B", "#9AA3AB", "#3F6ED8", "#D65DA0", "#EDE3CC", "#2E9E5B", "#7A4BC2", "#F4E1A0", "#6B3E26", "#C9A0FF", "#2EC4B6", "#FF7B54", "#E6E6E6", "#0F2A5C", "#E03C31"];
const AV_BG = ["#DCE5F8", "#D5F0E6", "#FCE8C4", "#F6DAE6", "#E6DEF6", "#D8EEF3", "#EEE7DC", "#E3E8EC", "#FFE0CC", "#CFF5DC", "#EBD4FB", "#FDF6B2", "#C9E4FF", "#2B2D42", "#FFD6E0", "#1F4E5F"];
const AV_SHIRT = ["#2B59C3", "#0F8A83", "#7A4BC2", "#E9A100", "#D2452F", "#2E7D32", "#37474F", "#E86A92", "#111827", "#F2F2F2", "#8D6E63", "#00B4D8", "#FF7B54", "#9CCC65", "#B71C1C", "#1A237E", "#F48FB1", "#FFD54F"];
// Navn på valgene (norsk, engelsk) – brukes som bildetekst i avatar-byggeren
const AV_NAMES = {
  h: [["Kort", "Short"], ["Langt", "Long"], ["Knute", "Bun"], ["Krøller", "Curls"], ["Skallet", "Bald"], ["Piggete", "Spiky"], ["Bob", "Bob"], ["Hanekam", "Mohawk"], ["Midtskill", "Middle part"], ["Taper fade", "Taper fade"], ["Buzz cut", "Buzz cut"], ["Fletter", "Braids"], ["Afro", "Afro"], ["Man bun", "Man bun"], ["Sideskill", "Side part"], ["Lugg", "Bangs"], ["Hestehale", "Ponytail"], ["Krøllete topp", "Curly top"], ["Langt bølgete", "Long wavy"], ["Pixie", "Pixie"], ["Skulderlangt", "Shoulder length"], ["Veldig langt", "Very long"], ["Lange krøller", "Long curls"], ["Dreadlocks", "Dreadlocks"], ["To knuter", "Space buns"], ["Høy hestehale", "High ponytail"], ["Mullet", "Mullet"], ["Wolf cut", "Wolf cut"], ["Korte krøller", "Short curls"], ["Langt med lugg", "Long with bangs"], ["Quiff", "Quiff"], ["Undercut", "Undercut"], ["Krøllete bob", "Curly bob"], ["Langt med midtskill", "Long middle part"]],
  e: [["Prikker", "Dots"], ["Glade", "Happy"], ["Store", "Big"], ["Blunk", "Wink"], ["Kule", "Cool"], ["Stjerner", "Stars"], ["Øyevipper", "Lashes"], ["Søvnige", "Sleepy"], ["Hjerteøyne", "Heart eyes"], ["Sinte", "Angry"], ["Overrasket", "Surprised"], ["Glitrende", "Sparkly"]],
  m: [["Smil", "Smile"], ["Glis", "Grin"], ["Rolig", "Calm"], ["Oi!", "Wow!"], ["Tunge ut", "Tongue out"], ["Skjevt smil", "Smirk"], ["Stor latter", "Big laugh"], ["Tannregulering", "Braces"], ["Leppestift", "Lipstick"], ["Trist", "Sad"], ["Kyss", "Kiss"], ["Tenner", "Toothy grin"], ["Nervøs", "Nervous"]],
  f: [["Ingen", "None"], ["Fullskjegg", "Full beard"], ["Bart", "Moustache"], ["Skjeggstubb", "Stubble"], ["Fippskjegg", "Goatee"], ["Kinnskjegg", "Chinstrap"], ["Langt skjegg", "Long beard"], ["Sykkelstyre", "Handlebar"], ["Vikingflette", "Viking braid"], ["Soul patch", "Soul patch"]],
  g: [["Ingen", "None"], ["Vanlige", "Classic"], ["Solbriller", "Sunglasses"], ["Aviator", "Aviator"], ["Cartier-stil", "Cartier style"], ["Cat-eye", "Cat-eye"], ["Runde retro", "Round retro"], ["Sportsvisir", "Sport shield"], ["Hjerter", "Hearts"], ["Nerd", "Nerd"], ["Monokkel", "Monocle"], ["Halvramme", "Half-rim"], ["VR-briller", "VR headset"], ["Skibriller", "Ski goggles"], ["Ovale gull", "Gold ovals"], ["Stjerner", "Stars"]],
  a: [["Ingen", "None"], ["Lue", "Beanie"], ["Hjelm", "Hard hat"], ["Hodetelefoner", "Headphones"], ["Vernebriller", "Goggles"], ["Caps", "Cap"], ["Krone", "Crown"], ["Bøttehatt", "Bucket hat"], ["Caps bakvendt", "Backwards cap"], ["Cowboyhatt", "Cowboy hat"], ["Hårbånd", "Headband"], ["Partyhatt", "Party hat"], ["Hijab", "Hijab"], ["Vikinghjelm", "Viking helmet"], ["Kokkelue", "Chef hat"], ["Russelue", "Russ cap"], ["Alpelue", "Beret"], ["Topplue med dusk", "Pompom beanie"], ["Studenthatt", "Graduation cap"], ["Piratlue", "Pirate hat"], ["Flosshatt", "Top hat"], ["Bandana", "Bandana"], ["Katteører", "Cat ears"], ["Nisselue", "Santa hat"], ["Blomst", "Flower"], ["Sløyfe", "Hair bow"], ["Solskjerm", "Visor"], ["Pannebånd", "Headband"]],
  o: [["T-skjorte", "T-shirt"], ["Hettegenser", "Hoodie"], ["Dress", "Suit"], ["Labfrakk", "Lab coat"], ["Astronaut", "Astronaut"], ["Superhelt", "Superhero"], ["Hawaiiskjorte", "Hawaiian shirt"], ["Refleksvest", "Hi-vis vest"], ["Rullekrage", "Turtleneck"], ["Smoking", "Tuxedo"], ["Fotballdrakt", "Football kit"], ["Strikkegenser", "Knitted sweater"], ["Skjorte og slips", "Shirt and tie"], ["Jeansjakke", "Denim jacket"], ["Skinnjakke", "Leather jacket"], ["Flanellskjorte", "Flannel shirt"], ["Kjole", "Dress"], ["Sykehusuniform", "Scrubs"], ["Kokkejakke", "Chef jacket"], ["Russedress", "Russ overalls"], ["Collegejakke", "Varsity jacket"], ["Dunjakke", "Puffer jacket"], ["Regnjakke", "Raincoat"], ["Pikéskjorte", "Polo shirt"], ["Stripete genser", "Striped sweater"], ["Singlet", "Tank top"], ["Blazer", "Blazer"], ["Kimono", "Kimono"], ["Bunad", "Bunad"]],
  x: [["Ingen", "None"], ["Øredobber", "Earrings"], ["Gullkjede", "Gold chain"], ["Fregner", "Freckles"], ["AirPods", "AirPods"], ["Nesering", "Nose ring"], ["Dråpeøredobber", "Drop earrings"], ["Perlekjede", "Pearl necklace"], ["Skjerf", "Scarf"], ["Sløyfe", "Bow tie"], ["Føflekk", "Beauty mark"], ["Plaster", "Plaster"], ["Norsk flagg", "Norwegian flag"], ["Blyant bak øret", "Pencil behind ear"], ["Sminke", "Make-up"], ["Rødme", "Blush"], ["Medalje", "Medal"]],
  // Samling: ting du låser opp (se unlocks.js). Rekkefølgen må aldri endres, bare legges til på slutten.
  p: [["Ingen", "None"], ["Regnbue", "Rainbow"], ["Øgle", "Lizard"], ["Tannhjul", "Gear buddy"], ["Lyndrone", "Spark drone"], ["Robot", "Robot"], ["Pi-ugle", "Pi owl"], ["Vindturbin", "Wind turbine"],
      ["Trafikkjegle", "Traffic cone"], ["Lyspære", "Light bulb"], ["Spire", "Sprout"], ["Pokal", "Trophy"], ["Flammeaura", "Flame aura"], ["Glorie", "Halo"], ["Stjernestøv", "Stardust"], ["UFO", "UFO"], ["Nattmåne", "Night moon"], ["Kommandør", "Commander"], ["Vokter", "Guardian"], ["Dino-konge", "Dino King"], ["Agent", "Agent"], ["Konge", "King"]]
};
const AV_PARTS = { s: AV_SKIN.length, h: AV_NAMES.h.length, hc: AV_HAIRC.length, e: AV_NAMES.e.length, m: AV_NAMES.m.length, a: AV_NAMES.a.length, bg: AV_BG.length, sh: AV_SHIRT.length, f: AV_NAMES.f.length, g: AV_NAMES.g.length, o: AV_NAMES.o.length, x: AV_NAMES.x.length, p: AV_NAMES.p.length };
const AV_KEYS = ["s", "h", "hc", "e", "m", "a", "bg", "sh", "f", "g", "o", "x", "p"];

function avParse(code){
  const v = String(code || "").split("-").map(n => parseInt(n, 10));
  const o = {}; AV_KEYS.forEach((k, i) => { const x = v[i]; o[k] = Number.isInteger(x) && x >= 0 && x < AV_PARTS[k] ? x : 0; });
  if(v.length <= 9 && v[5] === 1){ o.a = 0; o.g = 1; }   // gammel kode: «tilbehør 1» var briller
  return o;
}
const avCode = o => AV_KEYS.map(k => o[k] || 0).join("-");
function avRandom(){
  const o = {}; AV_KEYS.forEach(k => { o[k] = Math.floor(Math.random() * AV_PARTS[k]); });
  if(Math.random() < 0.7) o.f = 0; if(Math.random() < 0.5) o.g = 0; if(Math.random() < 0.5) o.a = 0; if(Math.random() < 0.6) o.x = 0;
  o.p = typeof unlockedPets === "function" ? (AVE && avParse(AVE.code).p) || 0 : 0; // behold det du har låst opp
  return avCode(o);
}

let AV_UID = 0;
function avatarSVG(code, size = 48, extraClass = ""){
  const o = avParse(code), skin = AV_SKIN[o.s], hair = AV_HAIRC[o.hc], sh = AV_SHIRT[o.sh], id = "av" + (++AV_UID);
  if(o.p === 19 && typeof dinoSVG === "function") return dinoSVG(o, id, size, extraClass); // Dino-konge (admin): hele avataren er en dinosaur
  if(o.p === 20){ o.o = 2; o.g = 2; }          // Agent (mod): dress og solbriller som glinser
  if(o.p === 21){ o.a = 6; o.m = 1; }          // Konge: krone og stort smil
  const dark = "rgba(0,0,0,.72)", gold = "#E0B43A", goldD = "#B98612";
  const fadeSides = `<path d="M30 33Q28.8 40 30 47L33.4 46Q32.6 40 33.8 32Z" fill="${hair}" opacity=".35"/><path d="M70 33Q71.2 40 70 47L66.6 46Q67.4 40 66.2 32Z" fill="${hair}" opacity=".35"/>`;
  // ---------- hår: bak hodet, oppå hodet og foran skuldrene ----------
  let hb = "", ht = "", hf = "";
  switch(o.h){
    case 0: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/>`; break;
    case 1: hb = `<path d="M27 44C27 19 39 13 50 13s23 6 23 31l2 30c-8 3-14-1-16-6H41c-2 5-8 9-16 6z" fill="${hair}"/>`;
            ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-3-8-8-12-14-13-6 4-17 5-28 13z" fill="${hair}"/>`; break;
    case 2: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><circle cx="50" cy="12" r="8" fill="${hair}"/>`; break;
    case 3: ht = `<g fill="${hair}">${[[31,36],[35,27],[42,21],[50,19],[58,21],[65,27],[69,36]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>`; break;
    case 4: break;
    case 5: ht = `<path d="M29 40l3-16 5 7 4-12 5 9 4-12 4 12 5-9 4 12 5-7 3 16c-6-7-13-10-21-10s-15 3-21 10z" fill="${hair}"/>`; break;
    case 6: hb = `<path d="M27 46C27 20 39 14 50 14s23 6 23 32l-1 16H28z" fill="${hair}"/>`;
            ht = `<path d="M29 44C29 22 39 15 50 15s21 7 21 29c-2-10-9-15-21-15-6 0-11 2-14 5-3 2-5 6-7 10z" fill="${hair}"/>`; break;
    case 7: ht = `<path d="M44 30c0-10 3-17 6-19 3 2 6 9 6 19z" fill="${hair}"/>${fadeSides}`; break;
    case 8: ht = `<path d="M50 18C38 16 28.5 24 28.5 45C31 36 37 30.5 47 30C49 26 50 22 50 18Z" fill="${hair}"/><path d="M50 18C62 16 71.5 24 71.5 45C69 36 63 30.5 53 30C51 26 50 22 50 18Z" fill="${hair}"/>`; break;
    case 9: ht = `${fadeSides}<path d="M32 33C32 20 41 15 51 15s18 5 18 18c-4-4-9-5-18-5s-15 1-19 5z" fill="${hair}"/><path d="M38 22l4 3M46 18l3 4M55 18l2 4M62 21l1 4" stroke="rgba(0,0,0,.25)" stroke-width="1.4" stroke-linecap="round"/>`; break;
    case 10: ht = `<path d="M29.6 42C29.6 27 38 22.6 50 22.6S70.4 27 70.4 42C66 32.5 58 29.5 50 29.5S34 32.5 29.6 42Z" fill="${hair}" opacity=".7"/>`; break;
    case 11: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><path d="M50 15v14" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/>`;
             hf = [30, 70].map(x => `<g fill="${hair}">${[48, 55, 62, 69, 76].map((y, i) => `<ellipse cx="${x + (x < 50 ? -1 : 1) * i * 0.6}" cy="${y}" rx="${4.4 - i * 0.3}" ry="4"/>`).join("")}<circle cx="${x + (x < 50 ? -3 : 3)}" cy="81" r="1.8" fill="${sh}"/></g>`).join(""); break;
    case 12: hb = `<circle cx="50" cy="36" r="29" fill="${hair}"/>`; ht = `<path d="M30 38C31 26 40 21 50 21s19 5 20 17c-5-5-12-7-20-7s-15 2-20 7z" fill="${hair}"/>`; break;
    case 13: ht = `${fadeSides}<path d="M32 33C32 22 41 17 51 17s17 5 17 16c-4-3-9-4-17-4s-14 1-19 4z" fill="${hair}"/><circle cx="50" cy="14" r="7" fill="${hair}"/><path d="M45 15h10" stroke="rgba(0,0,0,.25)" stroke-width="1.6"/>`; break;
    case 14: ht = `<path d="M29 40C29 22 40 15 52 15c11 0 19 7 19 23-3-8-9-12-17-12-4 0-6 1-8 3-5-3-11-4-17 11z" fill="${hair}"/><path d="M44 17c-2 5-2 9 0 12" stroke="rgba(255,255,255,.3)" stroke-width="1.4" fill="none"/>`; break;
    case 15: ht = `<path d="M29 41C29 21 39 15 50 15s21 6 21 26c-1-4-2-6-4-7H33c-2 1-3 3-4 7z" fill="${hair}"/>`; break;
    case 16: hb = `<path d="M62 20c15 3 17 22 13 38-2 7-7 7-7 1 2-12 2-24-6-30z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><circle cx="66" cy="24" r="3" fill="${sh}"/>`; break;
    case 17: ht = `${fadeSides}<g fill="${hair}">${[[35,28],[41,22],[48,19],[55,20],[62,23],[66,30],[44,26],[53,25]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5.5"/>`).join("")}</g>`; break;
    case 18: hb = `<path d="M27 44C27 19 39 13 50 13s23 6 23 31c2 8-2 12 1 20s-2 16-8 18c-2-6 1-10-2-14H38c-3 4 0 8-2 14-6-2-11-10-8-18s-3-12-1-20z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-3-8-8-12-14-13-6 4-17 5-28 13z" fill="${hair}"/>`; break;
    case 19: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-1-5-3-8-6-10-6 5-18 8-28 6-3 1-6 3-8 4z" fill="${hair}"/>${fadeSides}`; break;
    case 20: hb = `<path d="M27 44C27 19 39 13 50 13s23 6 23 31l1 22c-5 3-10 1-12-3H38c-2 4-7 6-12 3z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-3-8-8-12-14-13-6 4-17 5-28 13z" fill="${hair}"/>`; break;
    case 21: hb = `<path d="M26 44C26 18 39 12 50 12s24 6 24 32l4 62H22z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-8-10-12-17-13l-4 5-4-5c-7 1-13 5-16 13z" fill="${hair}"/>`;
             hf = `<path d="M28.5 58c-2 16-4 30-5 46h11c1-16 0-31-1-45zM71.5 58c2 16 4 30 5 46H65.5c-1-16 0-31 1-45z" fill="${hair}"/>`; break;
    case 22: hb = `<g fill="${hair}">${[[27,30],[25,40],[25,50],[26,60],[28,70],[30,79],[73,30],[75,40],[75,50],[74,60],[72,70],[70,79],[33,20],[67,20]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7.5"/>`).join("")}</g>`;
             ht = `<g fill="${hair}">${[[31,36],[35,27],[42,21],[50,19],[58,21],[65,27],[69,36]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>`;
             hf = `<g fill="${hair}">${[[28,66],[31,75],[72,66],[69,75]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join("")}</g>`; break;
    case 23: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><g fill="${hair}">${[31,36,42,58,64,69].map(x => `<rect x="${x - 2.4}" y="22" width="4.8" height="12" rx="2.4"/>`).join("")}</g>`;
             hb = `<g fill="${hair}">${[25,29.5,34,66,70.5,75].map((x, i) => `<rect x="${x - 2.5}" y="${30 + (i % 3) * 2}" width="5" height="${44 - (i % 3) * 4}" rx="2.5"/>`).join("")}</g>`;
             hf = `<g fill="${hair}">${[27,31.5,68.5,73].map(x => `<rect x="${x - 2.3}" y="56" width="4.6" height="${x < 50 ? 22 : 22}" rx="2.3"/><path d="M${x - 2.3} 62h4.6M${x - 2.3} 70h4.6" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`).join("")}</g>`; break;
    case 24: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><circle cx="32" cy="18" r="8" fill="${hair}"/><circle cx="68" cy="18" r="8" fill="${hair}"/><path d="M27 17q5 3 10 0M63 17q5 3 10 0" stroke="rgba(0,0,0,.2)" stroke-width="1.2" fill="none"/>`; break;
    case 25: ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-4-9-12-13-21-13s-17 4-21 13z" fill="${hair}"/><circle cx="50" cy="13" r="5" fill="${hair}"/><path d="M53 10c13-5 24 5 22 26-3-9-8-15-19-18z" fill="${hair}"/><path d="M47 13h6" stroke="${sh}" stroke-width="2.4" stroke-linecap="round"/>`; break;
    case 26: hb = `<path d="M30 40C30 20 39 14 50 14s20 6 20 26l3 30c-5 3-10 2-13-2H40c-3 4-8 5-13 2z" fill="${hair}"/>`;
             ht = `${fadeSides}<path d="M32 34C32 21 41 16 51 16s17 5 17 18c-4-4-9-6-17-6s-14 2-19 6z" fill="${hair}"/>`; break;
    case 27: hb = `<path d="M27 44C27 19 39 13 50 13s23 6 23 31l0 16-4 6-2-6-4 7V60H38v7l-4-7-2 6-4-6z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27c-2-5-4-8-7-10l-2 6-3-7-3 6-3-7-3 6-4-6-3 6-3-5c-3 2-6 6-7 11z" fill="${hair}"/>`; break;
    case 28: ht = `<g fill="${hair}">${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (1.05 + 0.9 * i / 10); return `<circle cx="${(50 + 20 * Math.cos(a)).toFixed(1)}" cy="${(40 + 19 * Math.sin(a)).toFixed(1)}" r="5"/>`; }).join("")}<circle cx="44" cy="24" r="4.5"/><circle cx="56" cy="24" r="4.5"/><circle cx="50" cy="22" r="4.5"/></g>`; break;
    case 29: hb = `<path d="M27 44C27 19 39 13 50 13s23 6 23 31l2 30c-8 3-14-1-16-6H41c-2 5-8 9-16 6z" fill="${hair}"/>`;
             ht = `<path d="M29 42C29 22 39 15 50 15s21 7 21 27v-5c-1-3-3-4-5-4H34c-2 0-4 1-5 4z" fill="${hair}"/><path d="M36 34v2M43 34v3M50 34v3M57 34v3M64 34v2" stroke="rgba(0,0,0,.14)" stroke-width="1.2"/>`; break;
    case 30: ht = `${fadeSides}<path d="M31 36C31 20 40 15 51 15c10 0 18 5 18 14-4-2-8-2-12 0 2-4 0-8-6-9 4 4 3 8-2 10-7-1-14 1-18 6z" fill="${hair}"/><path d="M47 14c6-6 16-4 19 3-5-2-10-2-14 1z" fill="${hair}"/>`; break;
    case 31: ht = `${fadeSides}<path d="M31 35c0-13 9-20 20-20 11 0 18 6 19 14l-1 7c-7-9-20-12-38-1z" fill="${hair}"/><path d="M40 22q12-3 24 5" stroke="rgba(0,0,0,.18)" stroke-width="1.3" fill="none"/>`; break;
    case 32: hb = `<g fill="${hair}">${[[27,32],[25,42],[26,52],[29,60],[73,32],[75,42],[74,52],[71,60],[34,22],[66,22]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>`;
             ht = `<g fill="${hair}">${[[31,36],[35,27],[42,21],[50,19],[58,21],[65,27],[69,36]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="6.5"/>`).join("")}</g>`; break;
    case 33: hb = `<path d="M26 44C26 18 39 12 50 12s24 6 24 32l3 44c-9 4-17 1-20-5H43c-3 6-11 9-20 5z" fill="${hair}"/>`;
             ht = `<path d="M50 18C38 16 28.5 24 28.5 45C31 36 37 30.5 47 30C49 26 50 22 50 18Z" fill="${hair}"/><path d="M50 18C62 16 71.5 24 71.5 45C69 36 63 30.5 53 30C51 26 50 22 50 18Z" fill="${hair}"/>`; break;
  }
  // ---------- klær ----------
  const bodyPath = "M16 104c0-22 15-32 34-32s34 10 34 32z";
  let ob = "", body = "";
  const tint = (c, a) => `color-mix(in srgb,${c} ${a}%,#fff)`;
  switch(o.o){
    case 0: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M42 73q8 6 16 0" stroke="rgba(0,0,0,.18)" stroke-width="2" fill="none"/>`; break;
    case 1: body = `<path d="M30 78c4-5 10-7 20-7s16 2 20 7l-4 4c-4-3-9-4-16-4s-12 1-16 4z" fill="${sh}"/><path d="M30 78c4-5 10-7 20-7s16 2 20 7l-4 4c-4-3-9-4-16-4s-12 1-16 4z" fill="rgba(0,0,0,0.15)"/><path d="${bodyPath}" fill="${sh}"/><path d="M36 76c4 5 9 7 14 7s10-2 14-7" stroke="rgba(0,0,0,.25)" stroke-width="2" fill="none"/><path d="M45 82v10M55 82v10" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M38 96h24v8H38z" fill="rgba(0,0,0,.12)"/>`; break;
    case 2: body = `<path d="${bodyPath}" fill="${sh}"/><path d="${bodyPath}" fill="rgba(0,0,0,0.4)"/><path d="M42 72l8 18 8-18z" fill="#F4F4F4"/><path d="M48.5 76h3l1.5 3-1.5 17h-3L47 79z" fill="#C0392B"/><path d="M42 72l-6 6 10 26M58 72l6 6-10 26" stroke="rgba(0,0,0,.35)" stroke-width="1.6" fill="none"/>`; break;
    case 3: body = `<path d="${bodyPath}" fill="#F7F8FA"/><path d="M42 72l8 12 8-12z" fill="${sh}"/><path d="M42 72l-7 8 9 24M58 72l7 8-9 24" stroke="#C8CED4" stroke-width="1.6" fill="none"/><rect x="60" y="88" width="9" height="7" rx="1" fill="none" stroke="#C8CED4" stroke-width="1.4"/><path d="M63 85v6" stroke="#2B59C3" stroke-width="1.8" stroke-linecap="round"/>`; break;
    case 4: body = `<path d="${bodyPath}" fill="#EEF1F4"/><path d="M34 76c5-4 11-6 16-6s11 2 16 6l-2 5c-4-3-9-4-14-4s-10 1-14 4z" fill="#AEB7C0"/><rect x="58" y="86" width="12" height="8" rx="1.5" fill="${sh}"/><path d="M58 90h12" stroke="#fff" stroke-width="1.2"/><circle cx="38" cy="92" r="3" fill="#D2452F"/>`; break;
    case 5: ob = `<path d="M22 80c-4 10-5 20-6 26h68c-1-6-2-16-6-26-9-5-19-7-28-7s-19 2-28 7z" fill="#C0392B"/>`;
            body = `<path d="${bodyPath}" fill="${sh}"/><path d="M50 82l7 4v6l-7 5-7-5v-6z" fill="#F2B51D"/><path d="M51 84l-3 5h3l-2 5 5-7h-3l2-3z" fill="${sh}"/>`; break;
    case 6: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M43 72l7 9 7-9" stroke="#fff" stroke-width="2" fill="none"/>${[[30,88],[40,98],[62,86],[70,97],[52,100],[34,100]].map(([x, y]) => `<g fill="#FFD166"><circle cx="${x}" cy="${y}" r="2.6"/><circle cx="${x + 3}" cy="${y - 1}" r="2"/><circle cx="${x - 2}" cy="${y + 2}" r="2"/></g><circle cx="${x}" cy="${y}" r="1" fill="#E86A92"/>`).join("")}`; break;
    case 7: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M26 86c3-8 8-12 14-14l4 32H24c0-7 0-12 2-18zM74 86c-3-8-8-12-14-14l-4 32h20c0-7 0-12-2-18z" fill="#D7F22B"/><path d="M25 94h19M56 94h19" stroke="#D9E1E6" stroke-width="3"/>`; break;
    case 8: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M41 64h18v12q-9 4-18 0z" fill="${sh}"/><path d="M41 64h18v12q-9 4-18 0z" fill="rgba(0,0,0,0.1)"/><path d="M42 68h16M42 72h16" stroke="rgba(0,0,0,.15)" stroke-width="1.2"/>`; break;
    case 9: body = `<path d="${bodyPath}" fill="#1B1F24"/><path d="M42 72l8 22 8-22z" fill="#F4F4F4"/><path d="M44 76l6 3-6 3zM56 76l-6 3 6 3z" fill="${sh}"/><circle cx="50" cy="79" r="1.8" fill="${sh}"/><path d="M60 84l6-1 1 4-6 1z" fill="${sh}"/><path d="M42 72l-6 6 10 26M58 72l6 6-10 26" stroke="#3A4048" stroke-width="1.8" fill="none"/>`; break;
    case 10: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M34 76v28M44 72v32M56 72v32M66 76v28" stroke="rgba(255,255,255,.55)" stroke-width="3"/><text x="50" y="98" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="11" fill="#fff">10</text><path d="M43 72q7 5 14 0" stroke="#fff" stroke-width="2" fill="none"/>`; break;    case 11: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M38 73q12 7 24 0l1 4q-13 7-26 0z" fill="rgba(255,255,255,.35)"/><g clip-path="url(#${id}b)"><path d="M10 88h80v8H10z" fill="rgba(255,255,255,.18)"/>${[16,24,32,40,48,56,64,72,80].map(x => `<path d="M${x} 89l3 3-3 3-3-3z" fill="#fff" opacity=".85"/>`).join("")}<path d="M10 99h80" stroke="rgba(255,255,255,.35)" stroke-width="1.4" stroke-dasharray="2 2"/></g>`; break;
    case 12: body = `<path d="${bodyPath}" fill="#F4F6F8"/><path d="M41 71l9 7-6 5zM59 71l-9 7 6 5z" fill="#fff" stroke="#CFD8DC" stroke-width="1"/><path d="M48 78h4l1.5 4-2 20h-3l-2-20z" fill="${sh}"/><path d="M48 78h4l.8 2.5h-5.6z" fill="rgba(0,0,0,.2)"/>`; break;
    case 13: body = `<path d="${bodyPath}" fill="#4A74A8"/><path d="M42 72h16l-3 32H45z" fill="${sh}"/><path d="M42 72l-7 7 8 25M58 72l7 7-8 25" stroke="#35557D" stroke-width="2" fill="none"/><path d="M26 90h12M62 90h12" stroke="#E8C170" stroke-width="1" stroke-dasharray="2 1.5"/><circle cx="33" cy="94" r="1.2" fill="#E8C170"/><circle cx="67" cy="94" r="1.2" fill="#E8C170"/>`; break;
    case 14: body = `<path d="${bodyPath}" fill="#1E2126"/><path d="M43 72h14l-2 32H45z" fill="${sh}"/><path d="M43 72l-9 6 9 11-3 15M57 72l9 6-9 11 3 15" fill="#2B2F36" stroke="#3A3F47" stroke-width="1.2"/><path d="M57.5 80l-2 24" stroke="#B0BEC5" stroke-width="1.4"/><circle cx="36" cy="97" r="1.2" fill="#B0BEC5"/>`; break;
    case 15: body = `<path d="${bodyPath}" fill="${sh}"/><g clip-path="url(#${id}b)"><g stroke="rgba(0,0,0,.25)" stroke-width="2.2"><path d="M10 84h80M10 96h80M30 72v32M50 72v32M70 72v32"/></g><g stroke="rgba(255,255,255,.3)" stroke-width="1"><path d="M10 90h80M40 72v32M60 72v32"/></g></g><path d="M42 72l8 7 8-7-3 6-5 3-5-3z" fill="${sh}" stroke="rgba(0,0,0,.3)" stroke-width="1"/>`; break;
    case 16: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M40 72q10 10 20 0" fill="${skin}"/><path d="M36 74l4-2M64 74l-4-2" stroke="${sh}" stroke-width="3"/><path d="M26 96q24 6 48 0" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>`; break;
    case 17: body = `<path d="${bodyPath}" fill="${tint(sh, 55)}"/><path d="M42 72l8 11 8-11" fill="${skin}"/><path d="M42 72l8 11 8-11" stroke="rgba(0,0,0,.2)" stroke-width="1.6" fill="none"/><rect x="58" y="88" width="11" height="9" rx="1.5" fill="none" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/><path d="M61 86v5M64 86v5" stroke="#2B59C3" stroke-width="1.4"/>`; break;
    case 18: body = `<path d="${bodyPath}" fill="#FAFAFA"/><path d="M40 72h20v5H40z" fill="#EDEFF1"/><path d="M50 77v27" stroke="#DDE2E6" stroke-width="1.4"/>${[[44,84],[44,92],[44,100],[56,84],[56,92],[56,100]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#9AA3AB"/>`).join("")}`; break;
    case 19: body = `<path d="M${"16 104c0-10 3-18 8-23l6 23z"}" fill="#F4F4F4"/><path d="M84 104c0-10-3-18-8-23l-6 23z" fill="#F4F4F4"/><path d="M26 104V80c7-5 15-8 24-8s17 3 24 8v24z" fill="#F4F4F4"/><path d="M33 104V84h34v20z" fill="${sh}"/><path d="M33 84l-4-11M67 84l4-11" stroke="${sh}" stroke-width="5" stroke-linecap="round"/><rect x="44" y="89" width="12" height="8" rx="1" fill="rgba(0,0,0,.18)"/><g transform="translate(58 90)"><rect width="8" height="6" fill="#BA0C2F"/><path d="M2.4 0v6M0 3h8" stroke="#fff" stroke-width="1.6"/><path d="M2.4 0v6M0 3h8" stroke="#00205B" stroke-width=".8"/></g>`; break;
    case 20: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M16 104c0-12 4-20 10-25l6 25zM84 104c0-12-4-20-10-25l-6 25z" fill="#F2F2F2"/><path d="M40 72q10 7 20 0l-1 4q-9 5-18 0z" fill="#fff"/><path d="M22 90h8M70 90h8" stroke="${sh}" stroke-width="2"/><text x="36" y="95" text-anchor="middle" font-family="Georgia,serif" font-weight="800" font-size="12" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width=".6">A</text><path d="M50 76v28" stroke="rgba(0,0,0,.2)" stroke-width="1.2" stroke-dasharray="1.6 2"/>`; break;
    case 21: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M38 64h24v10q-12 4-24 0z" fill="${sh}"/><path d="M38 64h24v10q-12 4-24 0z" fill="rgba(0,0,0,.12)"/><g clip-path="url(#${id}b)" stroke="rgba(0,0,0,.2)" stroke-width="1.6" fill="none"><path d="M10 88q40 5 80 0M10 98q40 5 80 0M10 80q40 4 80 0"/></g><path d="M50 68v36" stroke="rgba(255,255,255,.55)" stroke-width="1.4"/>`; break;
    case 22: ob = `<path d="M30 70c3-8 11-12 20-12s17 4 20 12l-5 4c-3-4-9-6-15-6s-12 2-15 6z" fill="#E5B321"/>`;
             body = `<path d="${bodyPath}" fill="#F2C12E"/><path d="M50 74v30" stroke="#C99A12" stroke-width="1.6"/>${[80,88,96].map(y => `<rect x="47.5" y="${y}" width="5" height="3" rx="1" fill="#C99A12"/>`).join("")}<path d="M24 92l10-2M76 92l-10-2" stroke="#C99A12" stroke-width="1.4"/>`; break;
    case 23: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M41 71l9 5 9-5-3 7-6 2-6-2z" fill="${sh}" stroke="rgba(0,0,0,.25)" stroke-width="1"/><path d="M50 78v9" stroke="rgba(0,0,0,.2)" stroke-width="1.2"/><circle cx="50" cy="81" r="1" fill="#fff"/><circle cx="50" cy="85" r="1" fill="#fff"/><path d="M60 88l4-3 4 3" stroke="rgba(255,255,255,.7)" stroke-width="1.2" fill="none"/>`; break;
    case 24: body = `<path d="${bodyPath}" fill="#FAFAFA"/><g clip-path="url(#${id}b)" stroke="${sh}" stroke-width="3.2">${[78,85,92,99].map(y => `<path d="M10 ${y}h80"/>`).join("")}</g><path d="M40 72q10 7 20 0" stroke="${sh}" stroke-width="2" fill="none"/>`; break;
    case 25: body = `<path d="${bodyPath}" fill="${skin}"/><path d="M33 104V84c0-6 3-10 7-12h3q7 6 14 0h3c4 2 7 6 7 12v20z" fill="${sh}"/><path d="M40 72v6M60 72v6" stroke="${sh}" stroke-width="3"/>`; break;
    case 26: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M43 72h14l-3 32h-8z" fill="#F4F4F4"/><path d="M43 72l-8 7 8 12-2 13M57 72l8 7-8 12 2 13" fill="${sh}" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/><path d="M62 84l6-1" stroke="rgba(255,255,255,.7)" stroke-width="1.4"/><circle cx="45" cy="98" r="1.3" fill="rgba(0,0,0,.4)"/>`; break;
    case 27: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M40 72l20 32M60 72l-14 18" stroke="${tint(sh, 45)}" stroke-width="4" fill="none"/><path d="M10 92h80v6H10z" fill="rgba(0,0,0,.3)" clip-path="url(#${id}b)"/><path d="M58 92l6 9M62 92l4 7" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`; break;
    case 28: body = `<path d="${bodyPath}" fill="#1B1F24"/><path d="M38 104V76q12-4 24 0v28z" fill="#F7F7F7"/><path d="M31 104V78l7-2 3 28zM69 104V78l-7-2-3 28z" fill="#B71C1C"/><g fill="#F2B51D">${[[34,84],[34,92],[34,100],[66,84],[66,92],[66,100]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="1.3"/>`).join("")}</g><circle cx="50" cy="79" r="3.4" fill="#D9DDE1" stroke="#9AA3AB" stroke-width="1"/><circle cx="50" cy="79" r="1.3" fill="#9AA3AB"/><path d="M47 83l-1 4M53 83l1 4" stroke="#D9DDE1" stroke-width="1.4"/>`; break;
  }
  const eyes = [
    `<circle cx="42" cy="46" r="2.8" fill="${dark}"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0M54.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<circle cx="42" cy="46" r="4.3" fill="#fff"/><circle cx="58" cy="46" r="4.3" fill="#fff"/><circle cx="42.8" cy="46.6" r="2.3" fill="${dark}"/><circle cx="58.8" cy="46.6" r="2.3" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`,
    `<circle cx="42" cy="47" r="2.6" fill="${dark}"/><circle cx="58" cy="47" r="2.6" fill="${dark}"/><path d="M38 45h8M54 45h8" stroke="${skin}" stroke-width="3.4"/><path d="M38 44.8h8M54 44.8h8" stroke="${dark}" stroke-width="1.6" stroke-linecap="round"/>`,
    [42, 58].map(x => `<path d="M${x} 41.5l1.4 3 3.2.4-2.3 2.2.6 3.2-2.9-1.5-2.9 1.5.6-3.2-2.3-2.2 3.2-.4z" fill="#F2B51D"/>`).join(""),
    `<circle cx="42" cy="46.5" r="2.8" fill="${dark}"/><circle cx="58" cy="46.5" r="2.8" fill="${dark}"/><path d="M38.5 44.5l-2-2M40.5 43.5l-1-2.4M61.5 44.5l2-2M59.5 43.5l1-2.4" stroke="${dark}" stroke-width="1.3" stroke-linecap="round"/>`,
    `<path d="M38.5 46.5h7M54.5 46.5h7" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/><path d="M39 45.2q3.5-2 6.5 0M55 45.2q3.5-2 6.5 0" stroke="${dark}" stroke-width="1.2" fill="none" opacity=".6"/>`,
    [42, 58].map(x => `<path d="M${x} 50l-4.4-4a2.6 2.6 0 0 1 4.4-3 2.6 2.6 0 0 1 4.4 3z" fill="#E53950"/>`).join(""),
    `<circle cx="42" cy="47" r="2.6" fill="${dark}"/><circle cx="58" cy="47" r="2.6" fill="${dark}"/><path d="M37.5 41.5l8 2.5M62.5 41.5l-8 2.5" stroke="${dark}" stroke-width="2.2" stroke-linecap="round"/>`,
    `<circle cx="42" cy="46" r="4.6" fill="#fff" stroke="${dark}" stroke-width="1"/><circle cx="58" cy="46" r="4.6" fill="#fff" stroke="${dark}" stroke-width="1"/><circle cx="42" cy="46" r="1.6" fill="${dark}"/><circle cx="58" cy="46" r="1.6" fill="${dark}"/><path d="M37.5 38.5q4.5-2.5 9 0M53.5 38.5q4.5-2.5 9 0" stroke="${dark}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    `<circle cx="42" cy="46" r="4" fill="${dark}"/><circle cx="58" cy="46" r="4" fill="${dark}"/><circle cx="43.3" cy="44.5" r="1.5" fill="#fff"/><circle cx="59.3" cy="44.5" r="1.5" fill="#fff"/><circle cx="41" cy="47.8" r=".8" fill="#fff"/><circle cx="57" cy="47.8" r=".8" fill="#fff"/>`
  ][o.e];
  const mouth = [
    `<path d="M43.5 55.5q6.5 6 13 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<path d="M42.5 54h15q-1 8-7.5 8t-7.5-8z" fill="${dark}"/><path d="M45 58.5q5 3 10 0" fill="#E86A6A"/>`,
    `<path d="M45 57h10" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>`,
    `<ellipse cx="50" cy="57" rx="3.2" ry="3.8" fill="${dark}"/>`,
    `<path d="M43.5 55.5q6.5 5 13 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M47 57.5h6v3.5a3 3 0 0 1-6 0z" fill="#E86A6A"/>`,
    `<path d="M44 57q6 1 12-3" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<path d="M41.5 53h17q-1 10-8.5 10T41.5 53z" fill="${dark}"/><path d="M42.5 53.5h15v2h-15z" fill="#fff"/><path d="M45 60q5 3 10 0" fill="#E86A6A"/>`,
    `<path d="M42.5 54h15q-1 7-7.5 7t-7.5-7z" fill="#fff" stroke="${dark}" stroke-width="1.6"/><path d="M43.5 56.5h13" stroke="#9AA3AB" stroke-width="1.4"/>${[45.5, 48.5, 51.5, 54.5].map(x => `<rect x="${x - .8}" y="55.6" width="1.6" height="1.8" fill="#78909C"/>`).join("")}`,
    `<path d="M44 56q6-3.2 12 0q-6 4.8-12 0z" fill="#D2385B"/><path d="M44 56q6 1.4 12 0" stroke="#A31F40" stroke-width=".9" fill="none"/>`,
    `<path d="M44 59q6-5 12 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<path d="M48 53.5q3.5 1 0 2.5q3.5 1 0 2.5" stroke="${dark}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53 50l1.5-1.4a1.1 1.1 0 0 1 1.6 1.4l-1.6 1.6-1.6-1.6z" fill="#E53950" opacity=".85"/>`,
    `<path d="M42.5 54h15q-1 6-7.5 6t-7.5-6z" fill="#fff" stroke="${dark}" stroke-width="1.8"/><path d="M46 54v5.4M50 54v6M54 54v5.4M42.8 56.5h14.4" stroke="${dark}" stroke-width=".9" opacity=".5"/>`,
    `<path d="M43 57l2.3-1.6 2.3 1.6 2.4-1.6 2.3 1.6 2.4-1.6 2.3 1.6" stroke="${dark}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  ][o.m];
  const beard = [
    "",
    `<path d="M31 48c1 14 9 22 19 22s18-8 19-22c-3 5-6 7-9 7-3-3-6-4-10-4s-7 1-10 4c-3 0-6-2-9-7z" fill="${hair}"/>`,
    `<path d="M41 53c3-3 6-3 9-1 3-2 6-2 9 1-3 2-6 2-9 1-3 1-6 1-9-1z" fill="${hair}"/>`,
    `<path d="M31 49c1 13 9 20 19 20s18-7 19-20c-4 7-10 10-19 10s-15-3-19-10z" fill="${hair}" opacity=".28"/>`,
    `<path d="M45 61c1 4 3 6 5 6s4-2 5-6c-3 1-7 1-10 0z" fill="${hair}"/><path d="M43 53.5c3-2 5-2 7-1 2-1 4-1 7 1" stroke="${hair}" stroke-width="2" fill="none"/>`,
    `<path d="M30.5 47c1 13 9 21 19.5 21s18.5-8 19.5-21" stroke="${hair}" stroke-width="3.2" fill="none"/>`,
    `<path d="M31 48c1 14 7 34 19 44 12-10 18-30 19-44-3 5-6 7-9 7-3-3-6-4-10-4s-7 1-10 4c-3 0-6-2-9-7z" fill="${hair}"/><path d="M46 70l4 12 4-12" stroke="rgba(0,0,0,.15)" stroke-width="1.2" fill="none"/>`,
    `<path d="M50 53c-3-2-8-2-12 0-3 1-5-1-6-4 1 6 4 9 9 8 4-1 6-3 9-4 3 1 5 3 9 4 5 1 8-2 9-8-1 3-3 5-6 4-4-2-9-2-12 0z" fill="${hair}"/>`,
    `<path d="M31 48c1 14 9 22 19 22s18-8 19-22c-3 5-6 7-9 7-3-3-6-4-10-4s-7 1-10 4c-3 0-6-2-9-7z" fill="${hair}"/><g fill="${hair}">${[72, 78, 84, 90].map(y => `<ellipse cx="50" cy="${y}" rx="3.6" ry="3.4"/>`).join("")}</g><circle cx="50" cy="94" r="1.8" fill="${gold}"/>`,
    `<path d="M48 60.5h4l-2 4z" fill="${hair}"/>`
  ][o.f];
  const glasses = [
    "",
    `<g fill="none" stroke="#263238" stroke-width="2"><circle cx="42" cy="46" r="6.5"/><circle cx="58" cy="46" r="6.5"/><path d="M48.5 46h3M35.5 45l-5-2M64.5 45l5-2"/></g>`,
    `<path d="M34.5 41.5h13l-1 7.5c-.8 3-10.2 3-11 0zM52.5 41.5h13l-1 7.5c-.8 3-10.2 3-11 0z" fill="#15191D"/><path d="M33 41.5h34" stroke="#15191D" stroke-width="2.6"/><path d="M36.5 43.5l3 0M54.5 43.5l3 0" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/><path d="M34 42l-4-1M66 42l4-1" stroke="#15191D" stroke-width="2"/>`,
    `<path d="M35 42.5c3-2 9-2 12 0 1 5-1 9.5-6 9.5s-7-4.5-6-9.5zM53 42.5c3-2 9-2 12 0 1 5-1 9.5-6 9.5s-7-4.5-6-9.5z" fill="rgba(90,60,30,.55)" stroke="${gold}" stroke-width="1.5"/><path d="M47 42.6q3-1.5 6 0M47 45q3-1 6 0" stroke="${gold}" stroke-width="1.3" fill="none"/><path d="M35 43l-5-2M65 43l5-2" stroke="${gold}" stroke-width="1.3"/>`,
    `<rect x="34.5" y="41.5" width="13" height="9.5" rx="3.5" fill="rgba(120,78,35,.55)"/><rect x="52.5" y="41.5" width="13" height="9.5" rx="3.5" fill="rgba(120,78,35,.55)"/><path d="M47.5 44.5q2.5-2 5 0" stroke="${gold}" stroke-width="1.4" fill="none"/><path d="M34.5 43l-4.5-1.5M65.5 43l4.5-1.5" stroke="${gold}" stroke-width="1.6"/>${[[34.5, 43], [65.5, 43]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="${gold}" stroke="${goldD}" stroke-width=".6"/>`).join("")}<path d="M36 42.8h3M54 42.8h3" stroke="rgba(255,255,255,.5)" stroke-width="1.2" stroke-linecap="round"/>`,
    `<path d="M33 40.5c5 1 10 1 14 2.5l-1 5.5c-2.5 3-8.5 3-10.5 0zM67 40.5c-5 1-10 1-14 2.5l1 5.5c2.5 3 8.5 3 10.5 0z" fill="rgba(0,0,0,.08)" stroke="#1B1F24" stroke-width="2.4" stroke-linejoin="round"/><path d="M47 44h6" stroke="#1B1F24" stroke-width="2"/>`,
    `<g fill="rgba(160,110,60,.12)" stroke="#7A4A22" stroke-width="2.8"><circle cx="42" cy="46" r="6"/><circle cx="58" cy="46" r="6"/></g><path d="M48 45.5q2-1.5 4 0" stroke="#7A4A22" stroke-width="2.2" fill="none"/><path d="M36 44l-5-2M64 44l5-2" stroke="#7A4A22" stroke-width="2"/>`,
    `<path d="M32 41.5c9-3.5 27-3.5 36 0l-2 7.5c-7 3.5-25 3.5-32 0z" fill="rgba(70,150,240,.65)" stroke="#263238" stroke-width="1.6"/><path d="M36 43.5c5-1.5 10-1.5 14-1.5" stroke="rgba(255,255,255,.6)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    [42, 58].map(x => `<path d="M${x} 51.5l-6-5.5a3.4 3.4 0 0 1 6-3.8 3.4 3.4 0 0 1 6 3.8z" fill="rgba(232,106,146,.75)" stroke="#C2185B" stroke-width="1.3"/>`).join("") + `<path d="M48 44.5h4" stroke="#C2185B" stroke-width="1.4"/>`,
    `<rect x="34" y="41.5" width="14" height="9.5" rx="1.5" fill="rgba(255,255,255,.12)" stroke="#111" stroke-width="3"/><rect x="52" y="41.5" width="14" height="9.5" rx="1.5" fill="rgba(255,255,255,.12)" stroke="#111" stroke-width="3"/><path d="M48 45h4" stroke="#111" stroke-width="2.4"/>`,
    `<circle cx="58" cy="46" r="6.5" fill="rgba(255,255,255,.12)" stroke="${gold}" stroke-width="2"/><path d="M64 49q4 10-2 22" stroke="${gold}" stroke-width="1" fill="none" stroke-dasharray="1.5 1"/>`,
    `<path d="M35 43h13M52 43h13" stroke="#263238" stroke-width="3" stroke-linecap="round"/><path d="M35 43q0 7 6.5 7t6.5-7M52 43q0 7 6.5 7t6.5-7" stroke="#263238" stroke-width=".8" fill="none" opacity=".5"/><path d="M48 44h4M35 43.5l-5-1.5M65 43.5l5-1.5" stroke="#263238" stroke-width="2"/>`,
    `<rect x="31" y="39" width="38" height="14" rx="5" fill="#2B2F36"/><rect x="33" y="41" width="34" height="10" rx="4" fill="#3F6ED8" opacity=".85"/><path d="M36 43h10" stroke="rgba(255,255,255,.55)" stroke-width="1.4" stroke-linecap="round"/><path d="M31 44l-3-1M69 44l3-1" stroke="#2B2F36" stroke-width="3"/>`,
    `<path d="M28 44h44" stroke="${sh}" stroke-width="5"/><path d="M33 39c6-2 28-2 34 0 2 3 2 9 0 12-6 2-28 2-34 0-2-3-2-9 0-12z" fill="url(#${id}g)" stroke="#263238" stroke-width="1.6"/><defs><linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="#FF8A00"/><stop offset=".5" stop-color="#FF4FD8"/><stop offset="1" stop-color="#3FA7FF"/></linearGradient></defs>`,
    `<g fill="none" stroke="${gold}" stroke-width="1.6"><ellipse cx="42" cy="46" rx="5.5" ry="4.5"/><ellipse cx="58" cy="46" rx="5.5" ry="4.5"/><path d="M47.5 45.5h5M36.5 45l-5-2M63.5 45l5-2"/></g>`,
    [42, 58].map(x => `<path d="M${x} 39l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="rgba(255,209,102,.55)" stroke="#E0A200" stroke-width="1.4" stroke-linejoin="round"/>`).join("") + `<path d="M48.5 46h3" stroke="#E0A200" stroke-width="1.4"/>`
  ][o.g];
  // ---------- hodeplagg ----------
  const hatC = sh; // hodeplagg følger klesfargen du velger
  let hat = "", hatBack = "";
  switch(o.a){
    case 1: hat = `<path d="M28 39c0-15 10-23 22-23s22 8 22 23z" fill="${hatC}"/><path d="M27 34h46v7H27z" fill="${hatC}"/><path d="M27 34h46v7H27z" fill="rgba(0,0,0,0.2)"/><circle cx="50" cy="14" r="5" fill="#fff"/>`; break;
    case 2: hat = `<path d="M27 36c0-14 10-23 23-23s23 9 23 23z" fill="#F2B51D"/><path d="M22 36h56v5H22z" fill="#E09A00"/><path d="M47 14h6v22h-6z" fill="#FFD04D"/>`; break;
    case 3: hat = `<path d="M27 46c0-17 10-27 23-27s23 10 23 27" fill="none" stroke="#263238" stroke-width="4"/><rect x="22" y="40" width="9" height="15" rx="4" fill="#263238"/><rect x="69" y="40" width="9" height="15" rx="4" fill="#263238"/>`; break;
    case 4: hat = `<path d="M30 32h40v9H30z" fill="#37474F"/><circle cx="41" cy="36.5" r="5" fill="#8FD3F4" stroke="#37474F" stroke-width="2"/><circle cx="59" cy="36.5" r="5" fill="#8FD3F4" stroke="#37474F" stroke-width="2"/>`; break;
    case 5: hat = `<path d="M28 36c0-13 10-21 22-21s22 8 22 21z" fill="${hatC}"/><path d="M50 32h28q2 5-4 6H50z" fill="${hatC}"/>`; break;
    case 6: hat = `<path d="M33 24l5 9 6-11 6 11 6-11 6 11 5-9 1 13H32z" fill="#F2B51D" stroke="#C98B00" stroke-width="1.2"/><circle cx="50" cy="31" r="2" fill="#E86A92"/>`; break;
    case 7: hat = `<path d="M31 33c1-11 9-16 19-16s18 5 19 16z" fill="${hatC}"/><path d="M23 35c8-5 46-5 54 0l-3 5c-8-3-40-3-48 0z" fill="${hatC}"/><path d="M23 35c8-5 46-5 54 0l-3 5c-8-3-40-3-48 0z" fill="rgba(0,0,0,0.15)"/>`; break;
    case 8: hat = `<path d="M28 36c0-13 10-21 22-21s22 8 22 21z" fill="${hatC}"/><path d="M22 34h18q-1 5-7 5h-9z" fill="${hatC}"/><path d="M22 34h18q-1 5-7 5h-9z" fill="rgba(0,0,0,0.2)"/><rect x="44" y="30" width="12" height="4" rx="2" fill="rgba(0,0,0,.25)"/>`; break;
    case 9: hat = `<path d="M15 34c10 6 60 6 70 0-3 7-10 9-35 9s-32-2-35-9z" fill="#8B5A2B"/><path d="M33 34c0-12 4-18 9-18 3 0 5 3 8 3s5-3 8-3c5 0 9 6 9 18z" fill="#A0693A"/><path d="M33 31h34v3H33z" fill="#5D3A1A"/>`; break;
    case 10: hat = `<path d="M29.5 34c4-8 12-12 20.5-12s16.5 4 20.5 12" stroke="${hatC}" stroke-width="5" fill="none" stroke-linecap="round"/>`; break;
    case 11: hat = `<path d="M38 26L52 -2 62 24z" fill="${hatC}"/><path d="M42 18l14 2M46 10l10 1" stroke="#fff" stroke-width="2"/><circle cx="52" cy="-2" r="3.5" fill="#F2B51D"/>`; break;
    case 12: hatBack = `<path d="M24 50c0-24 11-35 26-35s26 11 26 35c0 12-3 20-6 26H30c-3-6-6-14-6-26z" fill="${hatC}"/>`;
             hat = `<path fill-rule="evenodd" d="M26 48c0-22 10-32 24-32s24 10 24 32c0 10-2 17-5 23-5 4-12 6-19 6s-14-2-19-6c-3-6-5-13-5-23zM50 27c-9 0-16 7-16 19 0 10 7 18 16 18s16-8 16-18c0-12-7-19-16-19z" fill="${hatC}"/>`; break;
    case 13: hat = `<path d="M28 38c0-15 10-23 22-23s22 8 22 23z" fill="#9AA3AB"/><path d="M26 38h48v5H26z" fill="#6D7780"/><path d="M47 16h6v22h-6z" fill="#B7BEC5"/><path d="M29 30c-8-2-12-10-11-18 3 6 7 9 13 10zM71 30c8-2 12-10 11-18-3 6-7 9-13 10z" fill="#F4EEDC" stroke="#C9BFA2" stroke-width="1"/>`; break;
    case 14: hat = `<path d="M31 32h38v8H31z" fill="#fff" stroke="#DDE2E6" stroke-width="1"/><path d="M31 33c-6-2-7-11-1-14 1-7 9-10 13-6 3-5 11-5 14 0 4-4 12-1 13 6 6 3 5 12-1 14z" fill="#fff" stroke="#DDE2E6" stroke-width="1"/>`; break;
    case 15: hat = `<path d="M28 36c0-13 10-21 22-21s22 8 22 21z" fill="${hatC}"/><path d="M25 35h50q-2 6-9 6H34q-7 0-9-6z" fill="#15191D"/><path d="M50 15q14-2 22 8 3 5 3 16" stroke="#15191D" stroke-width="1.6" fill="none"/><path d="M73 38l2 12 3-12z" fill="#15191D"/><circle cx="75" cy="38" r="2.4" fill="#15191D"/><circle cx="50" cy="15" r="2.2" fill="#15191D"/>`; break;
    case 16: hat = `<path d="M26 33c2-11 14-17 27-16 12 1 20 7 21 14-7 4-41 6-48 2z" fill="${hatC}"/><path d="M26 33c9 3 38 2 48-2" stroke="rgba(0,0,0,.2)" stroke-width="1.4" fill="none"/><path d="M53 17l1-4" stroke="${hatC}" stroke-width="2.4" stroke-linecap="round"/>`; break;
    case 17: hat = `<path d="M28 39c0-15 10-23 22-23s22 8 22 23z" fill="${hatC}"/><path d="M30 27h40M28.5 33h43" stroke="rgba(255,255,255,.55)" stroke-width="2.6"/><path d="M27 35h46v7H27z" fill="${hatC}"/><path d="M27 35h46v7H27z" fill="rgba(0,0,0,.18)"/><g fill="#fff">${[[50,12,5.5],[46,10,2.6],[54,10,2.6],[50,7,2.6]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`; break;
    case 18: hat = `<path d="M34 28v9c10 4 22 4 32 0v-9z" fill="#1B1F24"/><path d="M20 26l30-11 30 11-30 10z" fill="#23272E"/><path d="M50 21l18 7v14" stroke="${gold}" stroke-width="1.4" fill="none"/><path d="M66 42l2 7 2-7z" fill="${gold}"/><circle cx="50" cy="21" r="1.6" fill="${gold}"/>`; break;
    case 19: hat = `<path d="M22 34c6-18 50-18 56 0-5-3-12-3-17 1-4-4-18-4-22 0-5-4-12-4-17-1z" fill="#1B1F24"/><path d="M26 30c10-5 38-5 48 0" stroke="${gold}" stroke-width="1.4" fill="none"/><circle cx="50" cy="24" r="3.4" fill="#fff"/><path d="M46.5 28.5l7 3M53.5 28.5l-7 3" stroke="#fff" stroke-width="1.3"/><circle cx="48.8" cy="23.6" r=".8" fill="#1B1F24"/><circle cx="51.2" cy="23.6" r=".8" fill="#1B1F24"/>`; break;
    case 20: hat = `<rect x="34" y="3" width="32" height="30" rx="2" fill="#15191D"/><path d="M34 26h32v5H34z" fill="${hatC}"/><path d="M22 33c4-3 52-3 56 0-2 4-8 5-28 5s-26-1-28-5z" fill="#15191D"/>`; break;
    case 21: hat = `<path d="M28 39c0-14 10-22 22-22s22 8 22 22c-6-4-14-6-22-6s-16 2-22 6z" fill="${hatC}"/><path d="M71 34l7 6-4 1 3 5-6-4z" fill="${hatC}"/><g fill="#fff" opacity=".8">${[[36,28],[44,24],[52,23],[60,25],[66,30],[40,33],[56,30]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="1.2"/>`).join("")}</g>`; break;
    case 22: hat = `<path d="M29.5 34c4-8 12-12 20.5-12s16.5 4 20.5 12" stroke="#1B1F24" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M30 27l2-13 10 8zM70 27l-2-13-10 8z" fill="${hatC}" stroke="#1B1F24" stroke-width="1.4" stroke-linejoin="round"/><path d="M33 23l.8-5 4 3zM67 23l-.8-5-4 3z" fill="#F48FB1"/>`; break;
    case 23: hat = `<path d="M28 36c2-16 12-22 24-21 12 2 20 12 26 28-6-6-10-8-14-9z" fill="#D32F2F"/><path d="M26 33c8-4 40-4 48 0l-1 7c-8-3-38-3-46 0z" fill="#fff"/><circle cx="79" cy="45" r="5" fill="#fff"/>`; break;
    case 24: hat = `<g transform="translate(34 27)">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="-5" rx="3.6" ry="5.4" fill="${hatC}" transform="rotate(${r})"/>`).join("")}<circle r="3" fill="#FFD54F"/></g><path d="M40 30l5-1M39 34l5 1" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>`; break;
    case 25: hat = `<g transform="translate(63 23) rotate(20)"><path d="M0 0l-11-7q-3 7 0 14zM0 0l11-7q3 7 0 14z" fill="${hatC}"/><path d="M0 0l-11-7q-3 7 0 14zM0 0l11-7q3 7 0 14z" fill="rgba(0,0,0,.12)"/><circle r="3" fill="${hatC}"/><path d="M-2 2l-3 9M2 2l3 9" stroke="${hatC}" stroke-width="2.4" stroke-linecap="round"/></g>`; break;
    case 26: hat = `<path d="M29 33h42v6H29z" fill="${hatC}"/><path d="M42 36h36q2 6-6 7H42z" fill="${hatC}"/><path d="M42 36h36q2 6-6 7H42z" fill="rgba(0,0,0,.15)"/>`; break;
    case 27: hat = `<path d="M29 32h42v6H29z" fill="${hatC}"/><path d="M71 34l9 3-7 3 8 6-10-3z" fill="${hatC}"/><circle cx="50" cy="35" r="2.2" fill="#fff" opacity=".8"/>`; break;
  }
  // ---------- ekstra ----------
  let ex = "", exBody = "";
  switch(o.x){
    case 1: ex = `<circle cx="29" cy="51.5" r="1.6" fill="${gold}"/><circle cx="71" cy="51.5" r="1.6" fill="${gold}"/>`; break;
    case 2: exBody = `<path d="M40 73q10 12 20 0" stroke="${gold}" stroke-width="2" fill="none" stroke-dasharray="2 1"/><circle cx="50" cy="80" r="2.4" fill="${gold}"/>`; break;
    case 3: ex = [[36, 51], [39, 53], [37, 55], [61, 51], [64, 53], [62, 55], [48, 50], [52, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#A0522D" opacity=".7"/>`).join(""); break;
    case 4: ex = `<path d="M27 49h3v7h-2z" fill="#fff" stroke="#CFD8DC" stroke-width=".6"/><path d="M73 49h-3v7h2z" fill="#fff" stroke="#CFD8DC" stroke-width=".6"/>`; break;
    case 5: ex = `<circle cx="52.5" cy="52.5" r="1.5" fill="none" stroke="${gold}" stroke-width="1"/>`; break;
    case 6: ex = [29, 71].map(x => `<path d="M${x} 51v3" stroke="${gold}" stroke-width=".8"/><path d="M${x} 54l2 4-2 2-2-2z" fill="#4FC3F7" stroke="${gold}" stroke-width=".6"/>`).join(""); break;
    case 7: exBody = `<g fill="#FAF7F0" stroke="#D8D2C4" stroke-width=".5">${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 10); return `<circle cx="${(50 - 11 * Math.cos(a)).toFixed(1)}" cy="${(72 + 7 * Math.sin(a)).toFixed(1)}" r="1.5"/>`; }).join("")}</g>`; break;
    case 8: exBody = `<path d="M34 70q16 9 32 0l2 7q-18 10-36 0z" fill="#D2452F"/><path d="M58 76l3 20h6l-2-21z" fill="#D2452F"/><path d="M36 73l28 0M59 82h6M60 88h6" stroke="rgba(255,255,255,.5)" stroke-width="1.4"/>`; break;
    case 9: exBody = `<path d="M50 74l-8-4v8zM50 74l8-4v8z" fill="#B71C1C"/><circle cx="50" cy="74" r="2" fill="#8E1515"/>`; break;
    case 10: ex = `<circle cx="61" cy="55" r="1" fill="#3E2716"/>`; break;
    case 11: ex = `<g transform="rotate(-25 62 50)"><rect x="57" y="48" width="10" height="4.4" rx="2" fill="#F1C9A5" stroke="#D2A679" stroke-width=".6"/><rect x="60.5" y="48" width="3" height="4.4" fill="#E8B88E"/></g>`; break;
    case 12: ex = `<g transform="translate(32 51)"><rect width="8" height="5.6" fill="#BA0C2F"/><path d="M2.4 0v5.6M0 2.8h8" stroke="#fff" stroke-width="1.6"/><path d="M2.4 0v5.6M0 2.8h8" stroke="#00205B" stroke-width=".8"/></g>`; break;
    case 13: ex = `<g transform="rotate(-70 73 38)"><rect x="60" y="36" width="24" height="3.2" fill="#F2B51D"/><path d="M84 36l4 1.6-4 1.6z" fill="#F1C9A5"/><path d="M87 37.2l1 .4-1 .4z" fill="#333"/><rect x="58" y="36" width="3" height="3.2" fill="#F48FB1"/></g>`; break;
    case 14: ex = `<path d="M37.5 43q4.5-3 9 0M53.5 43q4.5-3 9 0" stroke="#9C6ADE" stroke-width="2.6" fill="none" opacity=".55" stroke-linecap="round"/><path d="M44 56q6-3 12 0q-6 4-12 0z" fill="#D2385B" opacity=".75"/>`; break;
    case 15: ex = `<ellipse cx="37" cy="53" rx="5" ry="3.2" fill="#F06292" opacity=".45"/><ellipse cx="63" cy="53" rx="5" ry="3.2" fill="#F06292" opacity=".45"/>`; break;
    case 16: exBody = `<path d="M44 72l6 12 6-12" stroke="#2B59C3" stroke-width="3" fill="none"/><path d="M44 72l6 12 6-12" stroke="#D2452F" stroke-width="1.2" fill="none"/><circle cx="50" cy="88" r="5" fill="${gold}" stroke="${goldD}" stroke-width="1"/><path d="M50 85.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#fff" opacity=".85"/>`; break;
  }
  const nose = `<path d="M49 50.5q1.2 2.2 2.4 0" stroke="rgba(0,0,0,.18)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  return `<svg class="av ${extraClass}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath><clipPath id="${id}b"><path d="${bodyPath}"/></clipPath></defs>
    <g clip-path="url(#${id})"><rect width="100" height="100" fill="${AV_BG[o.bg]}"/>${o.p && typeof petBack === "function" ? petBack(o.p, id) : ""}${hatBack}${o.a === 12 ? "" : hb}${ob}
    ${body}<path d="M43 60h14v13q-7 5-14 0z" fill="${skin}"/>${exBody}${o.a === 12 ? "" : hf}
    <circle cx="29.5" cy="47" r="4.5" fill="${skin}"/><circle cx="70.5" cy="47" r="4.5" fill="${skin}"/>
    <ellipse cx="50" cy="45" rx="20.5" ry="22.5" fill="${skin}"/>${beard}
    <circle cx="37" cy="53" r="3.6" fill="#F28B82" opacity=".35"/><circle cx="63" cy="53" r="3.6" fill="#F28B82" opacity=".35"/>
    ${nose}${eyes}${mouth}${o.a === 12 ? "" : ht}${glasses}${ex}${hat}${o.p && typeof petFront === "function" ? petFront(o.p, id) : ""}</g></svg>`;
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
  "Bygg og anlegg":              { name: "Berit",      av: "2-6-1-0-1-2-6-4-0", nb: "bygg",                     en: "civil engineering" },
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
const AVE_TABS = [["p", "avPets"], ["h", "avHair"], ["hc", "avHairColor"], ["g", "avGlasses"], ["a", "avAcc"], ["o", "avOutfit"], ["sh", "avShirt"], ["x", "avExtra"], ["e", "avEyes"], ["m", "avMouth"], ["f", "avBeard"], ["s", "avSkin"], ["bg", "avBg"]];
let AVE_LAST_TAB = "h"; // husker fanen du sist var på
function openAvatarEditor(){ AVE = { code: S.avatar || avRandom(), tab: AVE_LAST_TAB, back: screen }; screen = "avatar"; overlay = null; render(); window.scrollTo(0, 0); aveTabIntoView(); }
// ---------- profilbilde (valgfritt, vises i stedet for avataren) ----------
const PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;
const isPhoto = p => typeof p === "string" && p.length < 24000 && PHOTO_RE.test(p);
function photoImg(src, size, cls = ""){ return `<img class="av-photo ${cls}" src="${src}" width="${size}" height="${size}" alt="" draggable="false">`; }
// Din egen figur: profilbilde hvis du har ett, ellers avatar.
function meAvHTML(size, cls = ""){ return isPhoto(S.photo) ? photoImg(S.photo, size, cls) : S.avatar ? avatarSVG(S.avatar, size, cls) : ""; }
const hasMeAv = () => isPhoto(S.photo) || !!S.avatar;
// ---------- profilbilde: beskjæring med zoom og flytting ----------
// CROP = { src, img, w, h, z, cx, cy, url }: z = zoom (1 = bildet akkurat dekker sirkelen), (cx, cy) = bildepunktet i midten.
let CROP = null;
const CROP_V = 280, CROP_ZMAX = 5;
const cropScale = () => CROP_V / Math.min(CROP.w, CROP.h) * CROP.z;
function cropClamp(){
  CROP.z = Math.min(CROP_ZMAX, Math.max(1, CROP.z));
  const he = CROP_V / 2 / cropScale();
  CROP.cx = Math.min(CROP.w - he, Math.max(he, CROP.cx)); CROP.cy = Math.min(CROP.h - he, Math.max(he, CROP.cy));
}
function cropStyle(){ const s = cropScale(); return `width:${(CROP.w * s).toFixed(1)}px;height:${(CROP.h * s).toFixed(1)}px;transform:translate(${(CROP_V / 2 - CROP.cx * s).toFixed(1)}px,${(CROP_V / 2 - CROP.cy * s).toFixed(1)}px)`; }
function cropApply(){ cropClamp(); const im = document.querySelector(".crop-img"); if(im) im.setAttribute("style", cropStyle()); const r = document.querySelector(".crop-zoom"); if(r && +r.value !== CROP.z) r.value = CROP.z; }
function cropOpen(src, url){
  const img = new Image();
  img.onload = () => { CROP = { src, img, url, w: img.naturalWidth, h: img.naturalHeight, z: 1, cx: img.naturalWidth / 2, cy: img.naturalHeight / 2 }; cropClamp(); overlay = { crop: 1 }; renderOverlay(); };
  img.onerror = () => { if(url) URL.revokeObjectURL(url); toast(t("avPhotoBad")); };
  img.src = src;
}
function cropClose(){ if(CROP && CROP.url) URL.revokeObjectURL(CROP.url); CROP = null; overlay = null; renderOverlay(); }
function cropHTML(){
  if(!CROP) return "";
  return `<div class="dialog pop crop-dlg" role="dialog" aria-label="${esc(t("avCropTitle"))}"><h3>${esc(t("avCropTitle"))}</h3><p>${esc(t("avCropText"))}</p>
    <div class="crop-view" style="width:${CROP_V}px;height:${CROP_V}px"><img class="crop-img" src="${CROP.src}" alt="" draggable="false" style="${cropStyle()}"><div class="crop-ring"></div></div>
    <label class="crop-zl"><span aria-hidden="true">−</span><input type="range" class="crop-zoom" min="1" max="${CROP_ZMAX}" step="0.01" value="${CROP.z}" aria-label="${esc(t("avCropZoom"))}"><span aria-hidden="true">+</span></label>
    <button class="big" data-a="avcropsave">${esc(t("avCropSave"))}</button><button class="big ghost" data-a="avcropcancel">${esc(t("cancel"))}</button></div>`;
}
// Samme JPEG-koding som før (160 px, under 24 000 tegn), men med utsnittet brukeren valgte.
function photoEncode(draw){
  const N = 160, c = document.createElement("canvas"); c.width = c.height = N;
  const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, N, N); g.imageSmoothingQuality = "high"; draw(g, N);
  let q = 0.82, d = c.toDataURL("image/jpeg", q);
  while(d.length > 22000 && q > 0.3){ q -= 0.12; d = c.toDataURL("image/jpeg", q); }
  return isPhoto(d) ? d : null;
}
function cropSave(){
  if(!CROP) return; cropClamp();
  const he = CROP_V / 2 / cropScale(), d = photoEncode((g, N) => g.drawImage(CROP.img, CROP.cx - he, CROP.cy - he, 2 * he, 2 * he, 0, 0, N, N));
  cropClose();
  if(!d){ toast(t("avPhotoBad")); return; }
  S.photo = d; toast(t("avPhotoSaved")); avPhotoSaved();
}
// Dra med én finger/mus, klyp med to fingre, musehjul eller glidebryter for zoom.
const CROP_P = new Map(); let CROP_PINCH = null;
document.addEventListener("pointerdown", e => {
  const v = e.target.closest && e.target.closest(".crop-view"); if(!v || !CROP) return;
  e.preventDefault(); v.setPointerCapture && v.setPointerCapture(e.pointerId); CROP_P.set(e.pointerId, [e.clientX, e.clientY]);
  if(CROP_P.size === 2){ const [a, b] = [...CROP_P.values()]; CROP_PINCH = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z: CROP.z }; }
});
document.addEventListener("pointermove", e => {
  if(!CROP || !CROP_P.has(e.pointerId)) return;
  const prev = CROP_P.get(e.pointerId); CROP_P.set(e.pointerId, [e.clientX, e.clientY]);
  if(CROP_P.size >= 2 && CROP_PINCH){ const [a, b] = [...CROP_P.values()]; CROP.z = CROP_PINCH.z * (Math.hypot(a[0] - b[0], a[1] - b[1]) || 1) / CROP_PINCH.d; }
  else { const s = cropScale(); CROP.cx -= (e.clientX - prev[0]) / s; CROP.cy -= (e.clientY - prev[1]) / s; }
  cropApply();
});
const cropUp = e => { CROP_P.delete(e.pointerId); if(CROP_P.size < 2) CROP_PINCH = null; };
document.addEventListener("pointerup", cropUp); document.addEventListener("pointercancel", cropUp);
document.addEventListener("wheel", e => { if(!CROP || !(e.target.closest && e.target.closest(".crop-view"))) return; e.preventDefault(); CROP.z *= Math.exp(-e.deltaY * 0.0015); cropApply(); }, { passive: false });
document.addEventListener("input", e => { if(CROP && e.target.classList && e.target.classList.contains("crop-zoom")){ CROP.z = +e.target.value; cropApply(); } });
function avPhotoSaved(){ save(); if(typeof frPushSoon === "function") frPushSoon(); render(); }
document.addEventListener("change", e => {
  if(e.target && e.target.id === "avfile"){
    const f = e.target.files && e.target.files[0]; e.target.value = "";
    if(!f || !/^image\//.test(f.type)){ toast(t("avPhotoBad")); return; }
    const url = URL.createObjectURL(f); cropOpen(url, url);
  }
});
function aveTabIntoView(){ const el = document.querySelector(".ave-tabs button.on"); if(el) el.scrollIntoView({ block: "nearest", inline: "center" }); }
function aveOptsHTML(){
  const o = avParse(AVE.code), k = AVE.tab;
  const colorTab = { s: AV_SKIN, hc: AV_HAIRC, sh: AV_SHIRT, bg: AV_BG }[k];
  const opts = Array.from({ length: AV_PARTS[k] }, (_, i) => {
    const on = o[k] === i;
    if(colorTab) return `<button class="ave-sw ${on ? "on" : ""}" data-a="avset" data-i="${i}" aria-label="${i + 1}" style="background:${colorTab[i]}"></button>`;
    const oo = Object.assign({}, o, { [k]: i });
    const nm = AV_NAMES[k] && AV_NAMES[k][i] ? T(AV_NAMES[k][i][0], AV_NAMES[k][i][1]) : String(i + 1);
    if(k === "p" && !petVisible(i)) return ""; // mod- og admin-skinn vises bare for dem som har rollen
    if(k === "p" && !unlockedPets().has(i)){ // låst: vis hengelås og hint (hemmelige heter «???»)
      const pet = PETS.find(p => p[0] === i), secret = pet && pet[2];
      return `<button class="ave-opt locked ${secret ? "secret" : ""}" data-a="avlocked" data-i="${i}" aria-label="${esc(secret ? "???" : nm)}"><span class="ave-lock">${secret ? "?" : I.lock}</span><small>${esc(secret ? "???" : nm)}</small></button>`;
    }
    return `<button class="ave-opt ${on ? "on" : ""}" data-a="avset" data-i="${i}" aria-label="${esc(nm)}">${avatarSVG(avCode(oo), 60)}<small>${esc(nm)}</small></button>`;
  }).join("");
  return { opts, colorTab };
}
// Oppdaterer bare forhåndsvisningen og valgene, så fanene og rullingen står stille.
// Forhåndsvisningene i rutenettet står stille (bare den store avataren animeres): mindre å tegne, og Safari på iPhone
// mister ikke plasseringen til «Lagre»-knappen nederst.
function aveStill(){ document.querySelectorAll(".ave-grid svg").forEach(sv => { try{ sv.pauseAnimations(); sv.setCurrentTime(0); }catch(e){} }); }
function aveUpdate(){
  const prev = document.querySelector(".ave-prev"), grid = document.querySelector(".ave-grid");
  if(!prev || !grid){ render(); return; }
  checkUnlocks(avParse(AVE.code)); // fargepåskeegg sjekkes mens du bygger
  const { opts, colorTab } = aveOptsHTML();
  prev.innerHTML = avatarSVG(AVE.code, 150); grid.innerHTML = opts; grid.classList.toggle("colors", !!colorTab);
  aveStill();
  document.querySelectorAll(".ave-tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === AVE.tab));
  const cnt = document.querySelector(".ave-cnt"); if(cnt) cnt.textContent = `${unlockedPets().size - 1}/${petTotal()}`;
}
function renderAvatarEditor(){
  if(!AVE){ goHome(); return; }
  const k = AVE.tab, { opts, colorTab } = aveOptsHTML(), ph = isPhoto(S.photo);
  const photoCard = `<div class="ave-photo">${ph ? photoImg(S.photo, 52) : `<span class="ave-ph0">${I.person}</span>`}<div class="ave-pt"><b>${esc(t(ph ? "avPhotoOn" : "avPhotoTitle"))}</b><small>${esc(t(ph ? "avPhotoOnSub" : "avPhotoSub"))}</small></div>
      <label class="ave-pbtn">${esc(t(ph ? "avPhotoChange" : "avPhotoUpload"))}<input type="file" id="avfile" accept="image/*" hidden></label>${ph ? `<button class="ave-pbtn ghost" data-a="avphotoadj">${esc(t("avCropAdjust"))}</button><button class="ave-pbtn ghost" data-a="avphotodel">${esc(t("avPhotoRemove"))}</button>` : ""}</div>`;
  $app.innerHTML = `<div class="top"><div class="wrap"><button class="iconbtn" data-a="avcancel" aria-label="${esc(t("back"))}">${I.x}</button>
      <div class="th-t"><small>${esc(t("avSub"))}</small><b>${esc(t("avTitle"))}</b></div><button class="iconbtn" data-a="avrandom" aria-label="${esc(t("avRandom"))}" title="${esc(t("avRandom"))}">${I.dice}</button></div></div>
    <main class="wrap ave">
      ${photoCard}
      <div class="ave-prev" data-a="avpreview">${avatarSVG(AVE.code, 150)}</div>
      <div class="ave-tabs">${AVE_TABS.map(([kk, lab]) => `<button class="${kk === k ? "on" : ""}" data-a="avtab" data-t="${kk}">${esc(t(lab))}${kk === "p" ? ` <em class="ave-cnt">${unlockedPets().size - 1}/${petTotal()}</em>` : ""}</button>`).join("")}</div>
      <div class="ave-grid ${colorTab ? "colors" : ""}">${opts}</div>
    </main>
    <div class="lfoot"><div class="wrap"><button class="big" data-a="avsave">${esc(t(ph ? "avSaveUse" : "avSave"))}</button></div></div>`;
  aveStill();
}
function avatarClick(a, b){
  if(!a.startsWith("av")) return false;
  if(a === "avedit") openAvatarEditor();
  else if(a === "avtab"){ AVE.tab = AVE_LAST_TAB = b.dataset.t; aveUpdate(); b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); }
  else if(a === "avset"){ const o = avParse(AVE.code); o[AVE.tab] = +b.dataset.i; AVE.code = avCode(o); aveUpdate(); }
  else if(a === "avrandom"){ AVE.code = avRandom(); aveUpdate(); }
  else if(a === "avlocked"){ const pet = PETS.find(p => p[0] === +b.dataset.i); if(pet) toast((pet[2] ? "🤫 " : "🔒 ") + (pet[1] === "rainbow" ? `🎨 ${Math.min(avColors(avParse(AVE.code)), RAINBOW_N)} / ${RAINBOW_N}` : T(pet[4], pet[5]))); } // regnbue: vis hvor mange farger du har nå
  else if(a === "avpreview"){ AVE.taps = (AVE.taps || 0) + 1; const el = document.querySelector(".ave-prev"); if(el){ el.classList.remove("wob"); void el.offsetWidth; el.classList.add("wob"); }
    if(AVE.taps >= 7 && !(S.unlocks || {}).ufo){ S.stats ||= {}; S.stats.ufo = 1; checkUnlocks(); aveUpdate(); } }
  else if(a === "avcropsave") cropSave();
  else if(a === "avcropcancel") cropClose();
  else if(a === "avphotoadj"){ if(isPhoto(S.photo)) cropOpen(S.photo, null); }
  else if(a === "avphotodel"){ S.photo = null; toast(t("avPhotoRemoved")); avPhotoSaved(); }
  else if(a === "avsave"){ S.avatar = AVE.code; S.photo = null; save(); if(typeof frPushSoon === "function") frPushSoon(); const back = AVE.back; AVE = null; toast(t("avSaved")); screen = ["friends", "profile"].includes(back) ? back : "settings"; if(screen === "friends") FR.rows = null; render(); window.scrollTo(0, 0); }
  else if(a === "avcancel"){ const back = AVE.back; AVE = null; screen = ["friends", "profile"].includes(back) ? back : "settings"; render(); }
  else return false;
  return true;
}
