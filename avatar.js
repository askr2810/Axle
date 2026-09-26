// ============================================================
//  AVATARER OG LÆRERE
//  Én tegnefunksjon (SVG) brukes både til din egen avatar og til lærerne i fagene.
//  En avatar lagres som en kort kode med tall skilt av bindestrek, i rekkefølgen AV_KEYS.
//  Eldre koder (9 tall, der «tilbehør» også inneholdt briller) oversettes automatisk.
// ============================================================
const AV_SKIN = ["#FBD9C0", "#F1C19C", "#D9A274", "#B97F52", "#8D5A36", "#5E3A22"];
const AV_HAIRC = ["#1F1A17", "#4A2E1D", "#8A5A2B", "#D9B25F", "#B5472B", "#9AA3AB", "#3F6ED8", "#D65DA0", "#EDE3CC", "#2E9E5B", "#7A4BC2"];
const AV_BG = ["#DCE5F8", "#D5F0E6", "#FCE8C4", "#F6DAE6", "#E6DEF6", "#D8EEF3", "#EEE7DC", "#E3E8EC"];
const AV_SHIRT = ["#2B59C3", "#0F8A83", "#7A4BC2", "#E9A100", "#D2452F", "#2E7D32", "#37474F", "#E86A92"];
// Navn på valgene (norsk, engelsk) – brukes som bildetekst i avatar-byggeren
const AV_NAMES = {
  h: [["Kort", "Short"], ["Langt", "Long"], ["Knute", "Bun"], ["Krøller", "Curls"], ["Skallet", "Bald"], ["Piggete", "Spiky"], ["Bob", "Bob"], ["Hanekam", "Mohawk"], ["Midtskill", "Middle part"], ["Taper fade", "Taper fade"], ["Buzz cut", "Buzz cut"], ["Fletter", "Braids"], ["Afro", "Afro"], ["Man bun", "Man bun"], ["Sideskill", "Side part"], ["Lugg", "Bangs"], ["Hestehale", "Ponytail"], ["Krøllete topp", "Curly top"], ["Langt bølgete", "Long wavy"]],
  e: [["Prikker", "Dots"], ["Glade", "Happy"], ["Store", "Big"], ["Blunk", "Wink"], ["Kule", "Cool"], ["Stjerner", "Stars"]],
  m: [["Smil", "Smile"], ["Glis", "Grin"], ["Rolig", "Calm"], ["Oi!", "Wow!"], ["Tunge ut", "Tongue out"], ["Skjevt smil", "Smirk"]],
  f: [["Ingen", "None"], ["Fullskjegg", "Full beard"], ["Bart", "Moustache"], ["Skjeggstubb", "Stubble"], ["Fippskjegg", "Goatee"]],
  g: [["Ingen", "None"], ["Vanlige", "Classic"], ["Solbriller", "Sunglasses"], ["Aviator", "Aviator"], ["Cartier-stil", "Cartier style"], ["Cat-eye", "Cat-eye"], ["Runde retro", "Round retro"], ["Sportsvisir", "Sport shield"], ["Hjerter", "Hearts"], ["Nerd", "Nerd"]],
  a: [["Ingen", "None"], ["Lue", "Beanie"], ["Hjelm", "Hard hat"], ["Hodetelefoner", "Headphones"], ["Vernebriller", "Goggles"], ["Caps", "Cap"], ["Krone", "Crown"], ["Bøttehatt", "Bucket hat"], ["Caps bakvendt", "Backwards cap"], ["Cowboyhatt", "Cowboy hat"], ["Hårbånd", "Headband"], ["Partyhatt", "Party hat"], ["Hijab", "Hijab"], ["Vikinghjelm", "Viking helmet"], ["Kokkelue", "Chef hat"]],
  o: [["T-skjorte", "T-shirt"], ["Hettegenser", "Hoodie"], ["Dress", "Suit"], ["Labfrakk", "Lab coat"], ["Astronaut", "Astronaut"], ["Superhelt", "Superhero"], ["Hawaiiskjorte", "Hawaiian shirt"], ["Refleksvest", "Hi-vis vest"], ["Rullekrage", "Turtleneck"], ["Smoking", "Tuxedo"], ["Fotballdrakt", "Football kit"]],
  x: [["Ingen", "None"], ["Øredobber", "Earrings"], ["Gullkjede", "Gold chain"], ["Fregner", "Freckles"], ["AirPods", "AirPods"], ["Nesering", "Nose ring"], ["Dråpeøredobber", "Drop earrings"], ["Perlekjede", "Pearl necklace"]],
  // Samling: ting du låser opp (se unlocks.js). Rekkefølgen må aldri endres, bare legges til på slutten.
  p: [["Ingen", "None"], ["Regnbue", "Rainbow"], ["Øgle", "Lizard"], ["Tannhjul", "Gear buddy"], ["Lyndrone", "Spark drone"], ["Robot", "Robot"], ["Pi-ugle", "Pi owl"], ["Vindturbin", "Wind turbine"],
      ["Trafikkjegle", "Traffic cone"], ["Lyspære", "Light bulb"], ["Spire", "Sprout"], ["Pokal", "Trophy"], ["Flammeaura", "Flame aura"], ["Glorie", "Halo"], ["Stjernestøv", "Stardust"], ["UFO", "UFO"], ["Nattmåne", "Night moon"], ["Kommandør", "Commander"], ["Vokter", "Guardian"], ["Dino-konge", "Dino King"]]
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
    case 10: body = `<path d="${bodyPath}" fill="${sh}"/><path d="M34 76v28M44 72v32M56 72v32M66 76v28" stroke="rgba(255,255,255,.55)" stroke-width="3"/><text x="50" y="98" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="11" fill="#fff">10</text><path d="M43 72q7 5 14 0" stroke="#fff" stroke-width="2" fill="none"/>`; break;
  }
  const eyes = [
    `<circle cx="42" cy="46" r="2.8" fill="${dark}"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0M54.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<circle cx="42" cy="46" r="4.3" fill="#fff"/><circle cx="58" cy="46" r="4.3" fill="#fff"/><circle cx="42.8" cy="46.6" r="2.3" fill="${dark}"/><circle cx="58.8" cy="46.6" r="2.3" fill="${dark}"/>`,
    `<path d="M38.5 47q3.5-4 7 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="58" cy="46" r="2.8" fill="${dark}"/>`,
    `<circle cx="42" cy="47" r="2.6" fill="${dark}"/><circle cx="58" cy="47" r="2.6" fill="${dark}"/><path d="M38 45h8M54 45h8" stroke="${skin}" stroke-width="3.4"/><path d="M38 44.8h8M54 44.8h8" stroke="${dark}" stroke-width="1.6" stroke-linecap="round"/>`,
    [42, 58].map(x => `<path d="M${x} 41.5l1.4 3 3.2.4-2.3 2.2.6 3.2-2.9-1.5-2.9 1.5.6-3.2-2.3-2.2 3.2-.4z" fill="#F2B51D"/>`).join("")
  ][o.e];
  const mouth = [
    `<path d="M43.5 55.5q6.5 6 13 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    `<path d="M42.5 54h15q-1 8-7.5 8t-7.5-8z" fill="${dark}"/><path d="M45 58.5q5 3 10 0" fill="#E86A6A"/>`,
    `<path d="M45 57h10" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>`,
    `<ellipse cx="50" cy="57" rx="3.2" ry="3.8" fill="${dark}"/>`,
    `<path d="M43.5 55.5q6.5 5 13 0" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M47 57.5h6v3.5a3 3 0 0 1-6 0z" fill="#E86A6A"/>`,
    `<path d="M44 57q6 1 12-3" stroke="${dark}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
  ][o.m];
  const beard = [
    "",
    `<path d="M31 48c1 14 9 22 19 22s18-8 19-22c-3 5-6 7-9 7-3-3-6-4-10-4s-7 1-10 4c-3 0-6-2-9-7z" fill="${hair}"/>`,
    `<path d="M41 53c3-3 6-3 9-1 3-2 6-2 9 1-3 2-6 2-9 1-3 1-6 1-9-1z" fill="${hair}"/>`,
    `<path d="M31 49c1 13 9 20 19 20s18-7 19-20c-4 7-10 10-19 10s-15-3-19-10z" fill="${hair}" opacity=".28"/>`,
    `<path d="M45 61c1 4 3 6 5 6s4-2 5-6c-3 1-7 1-10 0z" fill="${hair}"/><path d="M43 53.5c3-2 5-2 7-1 2-1 4-1 7 1" stroke="${hair}" stroke-width="2" fill="none"/>`
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
    `<rect x="34" y="41.5" width="14" height="9.5" rx="1.5" fill="rgba(255,255,255,.12)" stroke="#111" stroke-width="3"/><rect x="52" y="41.5" width="14" height="9.5" rx="1.5" fill="rgba(255,255,255,.12)" stroke="#111" stroke-width="3"/><path d="M48 45h4" stroke="#111" stroke-width="2.4"/>`
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
  }
  const nose = `<path d="M49 50.5q1.2 2.2 2.4 0" stroke="rgba(0,0,0,.18)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  return `<svg class="av ${extraClass}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs>
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
function aveUpdate(){
  const prev = document.querySelector(".ave-prev"), grid = document.querySelector(".ave-grid");
  if(!prev || !grid){ render(); return; }
  checkUnlocks(avParse(AVE.code)); // fargepåskeegg sjekkes mens du bygger
  const { opts, colorTab } = aveOptsHTML();
  prev.innerHTML = avatarSVG(AVE.code, 150); grid.innerHTML = opts; grid.classList.toggle("colors", !!colorTab);
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
