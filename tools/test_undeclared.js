// Statisk sjekk: finner identifikatorer som brukes uten å være deklarert (ReferenceError ved kjøring),
// og kode som er «svelget» av en //-kommentar (setninger etter // på samme linje).
// Kjøres på kildefilene i byggrekkefølgen (samme globale skop som app.bundle.js).
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const acorn = require("acorn");
const ROOT = path.join(__dirname, "..");
const files = JSON.parse(execSync(`python3 -B -c "import json,sys; sys.path.insert(0,'.'); import build; print(json.dumps(build.files()))"`, { cwd: ROOT }).toString());

// Nettleser-/kjøremiljø-globaler (CF_V/CF_IDX legges inn av tools/split.js, GSF settes på globalThis i figs_gs.js;
// MathfieldElement, qrcode og claude lastes/finnes bare av og til og brukes bak sjekker) og ting som settes av vendor-skript eller Capacitor.
const ENV = new Set(Object.getOwnPropertyNames(globalThis).concat(`window document navigator location history localStorage sessionStorage
 fetch Request Response Headers URL URLSearchParams Blob File FileReader FormData Image Audio AudioContext webkitAudioContext OfflineAudioContext
 HTMLElement HTMLCanvasElement HTMLInputElement HTMLImageElement Element Node NodeFilter Event CustomEvent KeyboardEvent PointerEvent MouseEvent TouchEvent
 getComputedStyle requestAnimationFrame cancelAnimationFrame matchMedia alert confirm prompt open close print scrollTo scrollBy innerWidth innerHeight
 devicePixelRatio screen performance crypto indexedDB caches self top parent opener frames visualViewport MutationObserver ResizeObserver IntersectionObserver
 DOMParser XMLSerializer Worker SharedWorker BroadcastChannel Notification ServiceWorker speechSynthesis SpeechSynthesisUtterance webkitSpeechRecognition SpeechRecognition
 Path2D ImageData OffscreenCanvas createImageBitmap DOMMatrix DOMRect TextEncoder TextDecoder CSS ClipboardItem MediaRecorder MediaStream WebSocket EventSource XMLHttpRequest
 katex pyodide loadPyodide Capacitor __TAURI__ d3 topojson structuredClone queueMicrotask btoa atob getSelection onerror onunhandledrejection addEventListener removeEventListener dispatchEvent
 scrollX scrollY pageXOffset pageYOffset outerWidth outerHeight name status origin isSecureContext Option ShadowRoot SVGElement CanvasRenderingContext2D Touch DataTransfer
 AbortController Intl WebAssembly console setTimeout clearTimeout setInterval clearInterval requestIdleCallback cancelIdleCallback PublicKeyCredential
 module require exports process global __dirname arguments DOMPoint
 MathfieldElement qrcode claude
 CF_V CF_IDX GSF`.split(/\s+/)));

class Scope { constructor(p, fn) { this.p = p; this.fn = fn; this.names = new Set(); } }
function patNames(p, out) {
  if (!p) return out;
  switch (p.type) {
    case "Identifier": out.push(p.name); break;
    case "ObjectPattern": p.properties.forEach(q => patNames(q.type === "RestElement" ? q.argument : q.value, out)); break;
    case "ArrayPattern": p.elements.forEach(e => patNames(e, out)); break;
    case "RestElement": patNames(p.argument, out); break;
    case "AssignmentPattern": patNames(p.left, out); break;
  }
  return out;
}
function fnScope(s) { while (!s.fn) s = s.p; return s; }
// Første runde: heis deklarasjoner inn i riktige skop (lagres på nodene).
function hoist(node, scope, refs) {
  const visit = (n, s) => {
    if (!n || typeof n.type !== "string") return;
    switch (n.type) {
      case "FunctionDeclaration": s.names.add(n.id.name); return fn(n, s);
      case "FunctionExpression": case "ArrowFunctionExpression": return fn(n, s);
      case "ClassDeclaration": s.names.add(n.id.name); break;
      case "ClassExpression": if (n.id) { const c = new Scope(s, false); c.names.add(n.id.name); n._s = c; return kids(n, c); } break;
      case "VariableDeclaration": {
        const t = n.kind === "var" ? fnScope(s) : s;
        n.declarations.forEach(d => patNames(d.id, []).forEach(x => t.names.add(x)));
        break;
      }
      case "BlockStatement": case "ForStatement": case "ForInStatement": case "ForOfStatement": case "SwitchStatement": case "StaticBlock": {
        if (n._fnBody) break;
        const b = new Scope(s, n.type === "StaticBlock"); n._s = b; return kids(n, b);
      }
      case "CatchClause": { const c = new Scope(s, false); patNames(n.param, []).forEach(x => c.names.add(x)); n._s = c; return kids(n, c); }
      case "Identifier": refs.push([n, s]); return;
      case "MemberExpression": visit(n.object, s); if (n.computed) visit(n.property, s); return;
      case "Property": case "PropertyDefinition": case "MethodDefinition":
        if (n.computed) visit(n.key, s);
        if (n.type === "Property" && n.shorthand && n.value.type === "Identifier") { visit(n.value, s); return; }
        visit(n.value, s); return;
      case "LabeledStatement": visit(n.body, s); return;
      case "BreakStatement": case "ContinueStatement": return;
      case "ExportSpecifier": case "ImportSpecifier": return;
    }
    kids(n, s);
  };
  const kids = (n, s) => { for (const k in n) { if (k === "type" || k[0] === "_") continue; const v = n[k]; if (Array.isArray(v)) v.forEach(x => x && visit(x, s)); else if (v && typeof v.type === "string") visit(v, s); } };
  const fn = (n, s) => {
    const f = new Scope(s, true); n._s = f;
    if (n.type === "FunctionExpression" && n.id) f.names.add(n.id.name);
    n.params.forEach(p => patNames(p, []).forEach(x => f.names.add(x)));
    n.params.forEach(p => visitParamDefaults(p, f));
    if (n.body.type === "BlockStatement") { n.body._fnBody = true; kids(n.body, f); } else visit(n.body, f);
  };
  const visitParamDefaults = (p, f) => {
    if (!p) return;
    if (p.type === "AssignmentPattern") { visit(p.right, f); visitParamDefaults(p.left, f); }
    else if (p.type === "ObjectPattern") p.properties.forEach(q => { if (q.type === "RestElement") return; if (q.computed) visit(q.key, f); visitParamDefaults(q.value, f); });
    else if (p.type === "ArrayPattern") p.elements.forEach(e => visitParamDefaults(e, f));
  };
  visit(node, scope);
}

function check(src, label) {
  const ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "script", locations: true, allowReturnOutsideFunction: true });
  const g = new Scope(null, true), refs = [];
  hoist(ast, g, refs);
  const bad = [];
  for (const [n, s] of refs) {
    let x = s, ok = false;
    while (x) { if (x.names.has(n.name)) { ok = true; break; } x = x.p; }
    if (!ok && !ENV.has(n.name)) bad.push({ name: n.name, line: n.loc.start.line });
  }
  return { bad, globals: g.names };
}

// Kode etter //-kommentar på samme linje: «// tekst const x=...;» o.l.
const SWALLOW = /\/\/[^\n]*?\s(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=[^\n]*;|\/\/[^\n]*?[;{}]\s*(?:if|for|while|return)\s*\(/;

if (require.main === module) {
  let fail = 0;
  // Bygg én kilde som bundlen, men husk fil/linje for meldinger.
  const parts = [], map = []; let line = 1;
  for (const f of files) { const s = fs.readFileSync(path.join(ROOT, f), "utf8") + "\n"; parts.push(s); map.push([line, f]); line += s.split("\n").length - 1; }
  const where = L => { let r = map[0]; for (const m of map) if (m[0] <= L) r = m; return `${r[1]}:${L - r[0] + 1}`; };
  const { bad } = check(parts.join(""), "bundle");
  const ALLOW = new Set((process.env.AXLE_UNDECL_ALLOW || "").split(",").filter(Boolean));
  for (const b of bad) if (!ALLOW.has(b.name)) { console.log(`udeklarert: ${b.name}  (${where(b.line)})`); fail++; }
  // Svelget kode: se på kommentarer med acorn (unngår treff i strenger).
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    acorn.parse(src, { ecmaVersion: "latest", sourceType: "script", allowReturnOutsideFunction: true, onComment: (block, text, start) => {
      if (block) return;
      if (SWALLOW.test("// " + text)) { const l = src.slice(0, start).split("\n").length; console.log(`kode i kommentar: ${f}:${l}: //${text.slice(0, 120)}`); fail++; }
    } });
  }
  if (fail) { console.log(`test_undeclared: ${fail} feil`); process.exit(1); }
  console.log("test_undeclared: ok (ingen udeklarerte navn, ingen kode i kommentarer)");
}
module.exports = { check };
