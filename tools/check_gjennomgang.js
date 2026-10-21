// Gjennomgang (#/gjennomgang): innlogging, manglende SQL, ett emne med knapper, snarveier og merket på emnesiden.
// 375 og 1280 px, lyst og mørkt. Supabase-kallene fanges, så siden kan prøves før SQL-filen er kjørt.
// Bruk: python3 build.py && (cd release/www && python3 -m http.server 8765) & node tools/check_gjennomgang.js
let chromium; try{ ({ chromium } = require("playwright")); }catch(e){ ({ chromium } = require("playwright-core")); }
const URL0 = process.env.AXLE_URL || "http://127.0.0.1:8765/";
const UID = "11111111-1111-1111-1111-111111111111";
const SIZES = [[375, 760, "light"], [375, 760, "dark"], [1280, 860, "light"], [1280, 860, "dark"]];
const fails = [], fail = (t, m) => fails.push(t + ": " + m);

function auth(){
  return { at: "test-token", rt: "test-refresh", exp: Math.floor(Date.now() / 1000) + 86400, uid: UID, email: "kari@skole.no" };
}
async function stub(page, mode, bag){
  await page.route(/supabase\.co/, route => {
    const url = route.request().url(), method = route.request().method();
    const send = (status, body) => route.fulfill({ status, contentType: "application/json", body: body == null ? "null" : typeof body === "string" ? body : JSON.stringify(body) });
    if(url.includes("/rpc/review_me")){
      if(mode === "missing") return send(404, { code: "PGRST202", message: "Could not find the function public.review_me in the schema cache" });
      if(mode === "denied") return send(200, { ok: false, reason: "not_reviewer" });
      return send(200, { ok: true, role: "reviewer", name: "Kari", subjects: ["VG1T"], active: true });
    }
    if(url.includes("/rpc/review_state")) return send(200, []);
    if(url.includes("/rpc/review_submit")){ bag.submits.push(route.request().postData() || ""); return send(204, ""); }
    if(url.includes("/rpc/review_suggest")){ bag.suggests.push(route.request().postData() || ""); return send(204, ""); }
    if(url.includes("/rpc/review_seal")){ bag.seals++; return send(404, { code: "PGRST202", message: "Could not find the function public.review_seal in the schema cache" }); }
    if(url.includes("/rest/v1/progress") && method === "GET") return send(200, []);
    if(method === "GET") return send(200, null);
    return route.fulfill({ status: 204, body: "" });
  });
}
async function boot(browser, w, h, theme, mode){
  const bag = { submits: [], suggests: [], seals: 0 };
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 900 });
  if(mode !== "out") await ctx.addInitScript(a => localStorage.setItem("axle.auth", JSON.stringify(a)), auth());
  await ctx.addInitScript(() => localStorage.setItem("ingeniordrill.v1", JSON.stringify({ v: 1, lang: "nb", langSet: 1, study: "vgs", studySet: 1, acEver: 1 })));
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(e.message));
  await stub(page, mode, bag);
  return { ctx, page, bag, errs };
}
async function openReview(page, code){
  await page.goto(URL0 + "#/gjennomgang" + (code ? "/" + code : ""), { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => typeof RV !== "undefined" && RV.phase && RV.phase !== "boot" && RV.phase !== "loading", null, { timeout: 15000 });
}
function measure(){
  const vw = innerWidth, over = document.documentElement.scrollWidth - vw;
  const wide = [...document.querySelectorAll("body *")].filter(e => { const s = getComputedStyle(e); if(s.position === "fixed" || s.display === "none" || s.visibility === "hidden") return false; const r = e.getBoundingClientRect(); if(!r.width) return false;
    let a = e.parentElement; while(a && a !== document.body){ const o = getComputedStyle(a); if(/auto|scroll|hidden|clip/.test(o.overflowX)) return false; a = a.parentElement; } return r.right > vw + 1 || r.left < -1; }).slice(0, 3).map(e => (e.tagName + "." + String(e.className).split(" ")[0]).slice(0, 40));
  const small = [...document.querySelectorAll("input:not([type=checkbox]):not([type=radio]):not([type=hidden]),select,textarea")].filter(e => e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 16).map(e => (e.id || e.className || e.tagName).toString().slice(0, 30));
  const cut = [...document.querySelectorAll(".rv button")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1); }).map(e => (e.textContent || "").trim().slice(0, 24));
  return { over, wide, small, cut, phase: typeof RV !== "undefined" ? RV.phase : "" };
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  for(const [w, h, theme] of SIZES){
    const tag = w + "px " + theme;
    const s = await boot(browser, w, h, theme, "reviewer");
    await openReview(s.page, "VG1T");
    if(s.errs.length) fail(tag, "JS-feil: " + s.errs.slice(0, 2).join(" | "));
    if(!await s.page.locator("[data-a=rvok]").count()) fail(tag, "fant ikke Godkjent (fase " + await s.page.evaluate(() => RV.phase + " " + (RV.err || "")) + ")");
    else {
      const box = await s.page.evaluate(measure);
      if(box.over > 1) fail(tag, "siden flyter " + box.over + " px (" + box.wide.join(", ") + ")");
      if(box.small.length) fail(tag, "tekstfelt under 16 px: " + box.small.join(", "));
      if(box.cut.length) fail(tag, "knapper utenfor skjermen: " + box.cut.join(", "));
      const text = (await s.page.locator("main.rv").innerText()).toLowerCase();
      for(const bit of ["emner godkjent", "teori", "gjennomregnet eksempel", "fasit", "kontrollsjekk", "godkjent", "flagg", "foreslå endring"]) if(!text.includes(bit)) fail(tag, "mangler «" + bit + "»");
      const tabs = await s.page.locator(".tabbar, nav.tabs").count();
      if(tabs) fail(tag, "fanelinjen ligger over handlingsraden");
    }
    if(w === 375 && theme === "light"){
      const title = await s.page.locator(".rv-card h1").innerText();
      await s.page.locator("[data-a=rvflag]").click();
      await s.page.locator("[data-a=rvflagsend]").click();
      await s.page.waitForSelector(".toast");
      if((await s.page.locator(".rv-card h1").innerText()) !== title) fail(tag, "flagg uten kommentar gikk videre");
      if(!s.bag.submits.length){
        await s.page.locator("#rvflag").fill("Feil i eksempelet");
        await s.page.locator("#rvflag").press("Enter");
        await s.page.waitForFunction(t => { const h = document.querySelector(".rv-card h1"); return h && h.textContent !== t; }, title, { timeout: 8000 }).catch(() => {});
      }
      if(!s.bag.submits.length) fail(tag, "flagg ble ikke sendt");
      else if(!/"flagged"/.test(s.bag.submits[0]) || !/Feil i eksempelet/.test(s.bag.submits[0])) fail(tag, "flagg-kall: " + s.bag.submits[0].slice(0, 180));
      const id = await s.page.evaluate(() => RV.items[RV.i] && RV.items[RV.i].id);
      const before = await s.page.evaluate(() => { const it = RV.items[RV.i]; return it ? it.nb.theory : ""; });
      await s.page.locator("[data-a=rvedit]").first().click();
      const note = await s.page.locator(".rv-note").innerText();
      if(!/publiseres ikke/.test(note)) fail(tag, "forslag sier ikke at det ikke publiseres");
      await s.page.locator("#rvedit").fill(before + " Ekstra setning.");
      await s.page.locator("[data-a=rvsuggest]").click();
      await s.page.waitForTimeout(400);
      if(!s.bag.suggests.length) fail(tag, "forslag ble ikke lagret");
      const same = await s.page.evaluate(i => { const it = (RV.items || []).find(x => x.id === i); return it ? it.nb.theory : ""; }, id);
      if(same !== before) fail(tag, "forslaget endret teksten i emnet");
      await s.page.locator("body").click({ position: { x: 8, y: 8 } });
      const t2 = await s.page.locator(".rv-card h1").innerText().catch(() => "");
      await s.page.keyboard.press("g");
      await s.page.waitForTimeout(500);
      if(!s.bag.submits.some(x => /"approved"/.test(x))) fail(tag, "G godkjente ikke");
      const t3 = await s.page.locator(".rv-card h1, .rv h1").first().innerText().catch(() => "");
      if(t2 && t3 === t2 && await s.page.locator("[data-a=rvok]").count()) fail(tag, "godkjenning gikk ikke videre");
    }
    if(w === 1280 && theme === "light"){
      await s.page.keyboard.press("f");
      if(!await s.page.locator("#rvflag").count()) fail(tag, "F åpnet ikke flagg");
      await s.page.keyboard.press("Escape");
      if(await s.page.locator("#rvflag").count()) fail(tag, "Escape lukket ikke flagg");
      const pos = await s.page.evaluate(() => RV.i);
      await s.page.keyboard.press("n");
      const pos2 = await s.page.evaluate(() => RV.i);
      if(pos2 !== pos + 1) fail(tag, "N gikk ikke til neste");
      await s.page.keyboard.press("p");
      if(await s.page.evaluate(() => RV.i) !== pos) fail(tag, "P gikk ikke tilbake");
    }
    await s.ctx.close();

    if(theme === "light"){
      const out = await boot(browser, w, h, theme, "out");
      await openReview(out.page, "");
      const wall = await out.page.locator("main.rv").innerText();
      if(!/Logg inn for å gjennomgå/.test(wall)) fail(tag + " utlogget", wall.slice(0, 140));
      await out.page.locator("[data-a=aclogin]").click();
      if(!await out.page.locator(".dialog, [data-a=lgsend], input[type=email]").count()) fail(tag + " utlogget", "innlogging åpnet ikke");
      if(out.errs.length) fail(tag + " utlogget", out.errs[0]);
      await out.ctx.close();

      const off = await boot(browser, w, h, theme, "missing");
      await openReview(off.page, "");
      const msg = await off.page.locator("main.rv").innerText();
      if(!/supabase\/gjennomgang\.sql/.test(msg)) fail(tag + " uten SQL", msg.slice(0, 180));
      await off.page.locator("[data-a=home]").click();
      await off.page.waitForFunction(() => document.body.dataset.scr === "home" || !document.querySelector("main.rv"));
      if(off.errs.length) fail(tag + " uten SQL", off.errs[0]);
      await off.ctx.close();

      const no = await boot(browser, w, h, theme, "denied");
      await openReview(no.page, "");
      const denied = await no.page.locator("main.rv").innerText();
      if(!/Ingen tilgang/.test(denied) || !/invitasjonslenke/.test(denied)) fail(tag + " ikke fagperson", denied.slice(0, 160));
      await no.ctx.close();

      const book = await boot(browser, w, h, theme, "reviewer");
      await book.page.goto(URL0, { waitUntil: "domcontentloaded" });
      await book.page.waitForTimeout(600);
      const opened = await book.page.evaluate(async () => {
        const ok = await ensureCourse("VG1T");
        const tp = (typeof topicsFlat === "function" ? topicsFlat("VG1T") : []).find(x => x.tp && x.tp.id && !x.tp.stub);
        if(!ok || !tp) return "";
        BK = { v: "topic", code: "VG1T", u: tp.u, tab: "topics", q: "", topic: tp.tp.id };
        screen = "book"; render();
        return tp.tp.id;
      });
      if(!opened) fail(tag + " emneside", "fikk ikke åpnet et emne");
      else {
        await book.page.waitForTimeout(800);
        if(await book.page.locator(".rv-badge").count()) fail(tag + " emneside", "merket vises uten godkjent hash");
        if(!book.bag.seals) fail(tag + " emneside", "review_seal ble ikke spurt");
        const h1 = await book.page.locator("h1").first().innerText();
        if(!h1) fail(tag + " emneside", "emnet tegnes ikke");
        if(book.errs.length) fail(tag + " emneside", book.errs[0]);
      }
      await book.ctx.close();
    }
  }
  await browser.close();
  console.log("gjennomgang-visning: " + SIZES.length + " flater, feil: " + fails.length);
  fails.forEach(f => console.log(" - " + f));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
