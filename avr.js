// ============================================================
//  AVR-ASSEMBLY (ATmega328P, brikken på Arduino Uno) – assembler og simulator til kodelaben.
//  avrRun(kilde, { init, maxCycles }) → { ok, error: { line, msg }, out (UART), r, mem, cycles, halt, log, ... }
//  Støtter det vanlige instruksjonssettet (aritmetikk, logikk, hopp, stakk, LD/ST, LPM, IN/OUT, SBI/CBI, MUL),
//  direktivene .equ .def .org .db .dw .include (ignoreres) og navnene fra m328pdef.inc for portene.
//  Klokke 16 MHz. Data: r0–r31 på 0x00–0x1F, I/O på 0x20–0x5F (IN/OUT bruker 0x00–0x3F), SRAM 0x100–0x8FF.
//  Programmet stopper ved en evig løkke på slutten (slutt: rjmp slutt), SLEEP/BREAK, når det går forbi siste
//  instruksjon, eller etter maxCycles (da kjører det videre for alltid på en ekte brikke).
// ============================================================
const AVR_HZ = 16e6;
const AVR_SYM = (() => {
  const S = { PINB: 0x03, DDRB: 0x04, PORTB: 0x05, PINC: 0x06, DDRC: 0x07, PORTC: 0x08, PIND: 0x09, DDRD: 0x0A, PORTD: 0x0B,
    TIFR0: 0x15, EIFR: 0x1C, EIMSK: 0x1D, GPIOR0: 0x1E, TCCR0A: 0x24, TCCR0B: 0x25, TCNT0: 0x26, OCR0A: 0x27, OCR0B: 0x28,
    SPL: 0x3D, SPH: 0x3E, SREG: 0x3F,
    // utvidet I/O (bare med LDS/STS)
    UCSR0A: 0xC0, UCSR0B: 0xC1, UCSR0C: 0xC2, UBRR0L: 0xC4, UBRR0H: 0xC5, UDR0: 0xC6, ADCL: 0x78, ADCH: 0x79, ADCSRA: 0x7A, ADMUX: 0x7C,
    RAMSTART: 0x100, RAMEND: 0x8FF, FLASHEND: 0x3FFF,
    UDRE0: 5, TXC0: 6, RXC0: 7, TXEN0: 3, RXEN0: 4, UCSZ00: 1, UCSZ01: 2,
    SREG_C: 0, SREG_Z: 1, SREG_N: 2, SREG_V: 3, SREG_S: 4, SREG_H: 5, SREG_T: 6, SREG_I: 7 };
  for(let b = 0; b < 8; b++){ for(const p of "BCD"){ S["P" + p + b] = b; S["PIN" + p + b] = b; S["DD" + p + b] = b; S["PORT" + p + b] = b; } }
  return S;
})();
const AVR_IO_NAME = Object.fromEntries(Object.entries(AVR_SYM).filter(([k, v]) => /^(PIN|DDR|PORT)[BCD]$|^SP[LH]$|^SREG$/.test(k)).map(([k, v]) => [v, k]));
const AVR_REGNAME = { XL: 26, XH: 27, YL: 28, YH: 29, ZL: 30, ZH: 31 };
// Instruksjoner: antall ord (2 for JMP/CALL/LDS/STS) og operandtyper.
// d = register, r = register, K = konstant, k = adresse/etikett, b = bitnummer, A = I/O-adresse, P = peker (X, Y+, -Z …), q = Y+q/Z+q
const AVR_OPS = {
  nop: "", ldi: "d,K", mov: "d,r", movw: "d,r", add: "d,r", adc: "d,r", sub: "d,r", subi: "d,K", sbc: "d,r", sbci: "d,K", and: "d,r", andi: "d,K",
  or: "d,r", ori: "d,K", eor: "d,r", com: "d", neg: "d", inc: "d", dec: "d", tst: "d", clr: "d", ser: "d", cp: "d,r", cpc: "d,r", cpi: "d,K",
  cpse: "d,r", lsl: "d", lsr: "d", rol: "d", ror: "d", asr: "d", swap: "d", mul: "d,r", muls: "d,r", adiw: "d,K", sbiw: "d,K", sbr: "d,K", cbr: "d,K",
  rjmp: "k", jmp: "k", rcall: "k", call: "k", ret: "", reti: "", ijmp: "", icall: "",
  breq: "k", brne: "k", brcs: "k", brcc: "k", brlo: "k", brsh: "k", brmi: "k", brpl: "k", brge: "k", brlt: "k", brvs: "k", brvc: "k",
  brhs: "k", brhc: "k", brts: "k", brtc: "k", brie: "k", brid: "k", brbs: "b,k", brbc: "b,k",
  sbrc: "r,b", sbrs: "r,b", sbic: "A,b", sbis: "A,b", sbi: "A,b", cbi: "A,b", in: "d,A", out: "A,r",
  lds: "d,k", sts: "k,r", ld: "d,P", st: "P,r", ldd: "d,q", std: "q,r", lpm: "*", push: "r", pop: "d",
  sec: "", clc: "", sez: "", clz: "", sen: "", cln: "", sev: "", clv: "", ses: "", cls: "", seh: "", clh: "", set: "", clt: "", sei: "", cli: "",
  bset: "b", bclr: "b", bst: "r,b", bld: "d,b", sleep: "", break: "", wdr: "" };
const AVR_TWO = new Set(["jmp", "call", "lds", "sts"]);
const AVR_BR = { breq: [1, 1], brne: [1, 0], brcs: [0, 1], brlo: [0, 1], brcc: [0, 0], brsh: [0, 0], brmi: [2, 1], brpl: [2, 0], brvs: [3, 1], brvc: [3, 0],
  brlt: [4, 1], brge: [4, 0], brhs: [5, 1], brhc: [5, 0], brts: [6, 1], brtc: [6, 0], brie: [7, 1], brid: [7, 0] };
const AVR_FLAGS = { sec: 0, sez: 1, sen: 2, sev: 3, ses: 4, seh: 5, set: 6, sei: 7, clc: 0, clz: 1, cln: 2, clv: 3, cls: 4, clh: 5, clt: 6, cli: 7 };

// ---------- uttrykk: 0x1F, $1F, 0b101, 'A', (1<<PB5), low(tekst*2) … ----------
function avrExpr(src, sym, line){
  const toks = []; let i = 0; const s = src.trim();
  const err = m => { throw { line, msg: m }; };
  while(i < s.length){
    const c = s[i];
    if(/\s/.test(c)){ i++; continue; }
    let m;
    if((m = s.slice(i).match(/^(0x[0-9a-f]+|\$[0-9a-f]+|0b[01]+|\d+)/i))){ const t = m[1]; toks.push({ n: t[0] === "$" ? parseInt(t.slice(1), 16) : /^0b/i.test(t) ? parseInt(t.slice(2), 2) : Number(t) }); i += t.length; continue; }
    if((m = s.slice(i).match(/^'(\\?.)'/))){ const ch = m[1].length === 2 ? { n: 10, t: 9, r: 13, 0: 0, "\\": 92, "'": 39 }[m[1][1]] : m[1].charCodeAt(0); toks.push({ n: ch }); i += m[0].length; continue; }
    if((m = s.slice(i).match(/^[A-Za-z_]\w*/))){ toks.push({ id: m[0] }); i += m[0].length; continue; }
    if((m = s.slice(i).match(/^(<<|>>|<=|>=|==|!=|&&|\|\||[-+*/%&|^~!()<>])/))){ toks.push({ op: m[1] }); i += m[1].length; continue; }
    err(T(`forstår ikke «${c}» i «${s}»`, `cannot read "${c}" in "${s}"`));
  }
  let p = 0;
  const FN = { LOW: v => v & 0xFF, LO8: v => v & 0xFF, HIGH: v => (v >> 8) & 0xFF, HI8: v => (v >> 8) & 0xFF, BYTE1: v => v & 0xFF, BYTE2: v => (v >> 8) & 0xFF, BYTE3: v => (v >> 16) & 0xFF, ABS: Math.abs };
  const prim = () => {
    const t = toks[p++]; if(!t) err(T(`uttrykket «${s}» slutter for tidlig`, `the expression "${s}" ends too early`));
    if(t.n != null) return t.n;
    if(t.op === "(") { const v = bin(0); if(!toks[p] || toks[p].op !== ")") err(T(`mangler «)» i «${s}»`, `missing ")" in "${s}"`)); p++; return v; }
    if(t.op === "-") return -prim(); if(t.op === "~") return ~prim(); if(t.op === "!") return prim() ? 0 : 1; if(t.op === "+") return prim();
    if(t.id){ const u = t.id.toUpperCase();
      if(FN[u] && toks[p] && toks[p].op === "("){ p++; const v = bin(0); if(!toks[p] || toks[p].op !== ")") err(T(`mangler «)» etter ${t.id}(`, `missing ")" after ${t.id}(`)); p++; return FN[u](v); }
      if(sym[u] != null) return sym[u];
      err(T(`ukjent navn «${t.id}»`, `unknown name "${t.id}"`)); }
    err(T(`forstår ikke «${s}»`, `cannot read "${s}"`));
  };
  const PREC = { "||": 1, "&&": 2, "|": 3, "^": 4, "&": 5, "==": 6, "!=": 6, "<": 7, ">": 7, "<=": 7, ">=": 7, "<<": 8, ">>": 8, "+": 9, "-": 9, "*": 10, "/": 10, "%": 10 };
  const bin = min => { let a = prim();
    while(toks[p] && toks[p].op && PREC[toks[p].op] > min){ const o = toks[p++].op, b = bin(PREC[o]);
      switch(o){ case "||": a = a || b ? 1 : 0; break; case "&&": a = a && b ? 1 : 0; break; case "|": a |= b; break; case "^": a ^= b; break; case "&": a &= b; break;
        case "==": a = +(a === b); break; case "!=": a = +(a !== b); break; case "<": a = +(a < b); break; case ">": a = +(a > b); break; case "<=": a = +(a <= b); break; case ">=": a = +(a >= b); break;
        case "<<": a <<= b; break; case ">>": a >>= b; break; case "+": a += b; break; case "-": a -= b; break; case "*": a *= b; break;
        case "/": if(!b) err(T("deling på null", "division by zero")); a = Math.trunc(a / b); break; case "%": if(!b) err(T("deling på null", "division by zero")); a %= b; break; } }
    return a; };
  const v = bin(0); if(p < toks.length) err(T(`forstår ikke «${s}»`, `cannot read "${s}"`));
  return v;
}
// Deler en linje ved komma, men ikke inne i '…' eller "…".
function avrSplit(s){ const out = []; let cur = "", q = null;
  for(const c of s){ if(q){ cur += c; if(c === q) q = null; continue; } if(c === "'" || c === '"'){ q = c; cur += c; continue; } if(c === ","){ out.push(cur.trim()); cur = ""; continue; } cur += c; }
  if(cur.trim() || out.length) out.push(cur.trim()); return out; }
function avrStrip(line){ let q = null;
  for(let i = 0; i < line.length; i++){ const c = line[i];
    if(q){ if(c === "\\"){ i++; continue; } if(c === q) q = null; continue; }
    if(c === "'" || c === '"'){ q = c; continue; }
    if(c === ";" || (c === "/" && line[i + 1] === "/")) return line.slice(0, i); }
  return line; }

// ---------- assembler ----------
function avrAssemble(src){
  const sym = Object.assign({}, AVR_SYM), defs = {}, lines = String(src).replace(/\r/g, "").split("\n");
  const prog = [], flash = new Uint8Array(0x8000), labels = {}, used = new Set();
  const items = [];
  // pass 1: etiketter og adresser
  let pc = 0;
  for(let li = 0; li < lines.length; li++){
    let s = avrStrip(lines[li]).trim(); const ln = li + 1; if(!s) continue;
    let m;
    while((m = s.match(/^([A-Za-z_]\w*)\s*:/)) && !/^\w+\s*:\s*=/.test(s)){ const L = m[1].toUpperCase();
      if(labels[L] != null || AVR_OPS[m[1].toLowerCase()]) throw { line: ln, msg: T(`etiketten «${m[1]}» er brukt fra før`, `the label "${m[1]}" is already used`) };
      labels[L] = pc; sym[L] = pc; s = s.slice(m[0].length).trim(); }
    if(!s) continue;
    if(s[0] === "."){
      const dm = s.match(/^\.(\w+)\s*(.*)$/), d = dm[1].toLowerCase(), rest = dm[2];
      if(d === "org"){ pc = avrExpr(rest, sym, ln); continue; }
      if(d === "db" || d === "dw"){ items.push({ ln, d, rest, at: pc }); let n = 0; for(const a of avrSplit(rest)){ if(/^".*"$/.test(a)) n += avrUnq(a).length; else n += d === "dw" ? 2 : 1; } pc += Math.ceil(n / 2); continue; }
      if(d === "equ" || d === "set"){ const q = rest.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/); if(!q) throw { line: ln, msg: T("skriv .equ NAVN = verdi", "write .equ NAME = value") }; sym[q[1].toUpperCase()] = avrExpr(q[2], sym, ln); continue; }
      if(d === "def"){ const q = rest.match(/^([A-Za-z_]\w*)\s*=\s*[rR](\d+)$/); if(!q || +q[2] > 31) throw { line: ln, msg: T("skriv .def navn = r16", "write .def name = r16") }; defs[q[1].toUpperCase()] = +q[2]; continue; }
      if(!/^(include|device|cseg|dseg|eseg|list|nolist|exit|message|warning)$/.test(d)) throw { line: ln, msg: T(`ukjent direktiv «.${dm[1]}»`, `unknown directive ".${dm[1]}"`) };
      continue;
    }
    const im = s.match(/^([A-Za-z]+)\b\s*(.*)$/); if(!im) throw { line: ln, msg: T(`forstår ikke linjen «${s}»`, `cannot read the line "${s}"`) };
    const op = im[1].toLowerCase(); if(AVR_OPS[op] == null) throw { line: ln, msg: T(`ukjent instruksjon «${im[1]}»`, `unknown instruction "${im[1]}"`) };
    items.push({ ln, op, args: im[2].trim() ? avrSplit(im[2]) : [], at: pc }); pc += AVR_TWO.has(op) ? 2 : 1;
  }
  // pass 2: operander
  const reg = (a, ln, lo = 0) => { const t = a.trim(), u = t.toUpperCase(); let n = null;
    if(/^r\d+$/i.test(t)) n = +t.slice(1); else if(defs[u] != null) n = defs[u]; else if(AVR_REGNAME[u] != null) n = AVR_REGNAME[u];
    if(n == null || n > 31) throw { line: ln, msg: T(`«${t}» er ikke et register (r0–r31)`, `"${t}" is not a register (r0–r31)`) };
    if(n < lo) throw { line: ln, msg: T(`denne instruksjonen virker bare på r${lo}–r31, ikke ${t}`, `this instruction only works on r${lo}–r31, not ${t}`) };
    return n; };
  const val = (a, ln, lo, hi, what) => { const v = avrExpr(a, sym, ln); if(v < lo || v > hi) throw { line: ln, msg: T(`${what} ${v} er utenfor ${lo}–${hi}`, `${what} ${v} is outside ${lo}–${hi}`) }; return v; };
  for(const it of items){
    const ln = it.ln;
    if(it.d === "db" || it.d === "dw"){ let b = it.at * 2;
      for(const a of avrSplit(it.rest)){ if(/^".*"$/.test(a)){ for(const ch of avrUnq(a)) flash[b++] = ch.charCodeAt(0) & 0xFF; } else { const v = avrExpr(a, sym, ln); if(it.d === "dw"){ flash[b++] = v & 0xFF; flash[b++] = (v >> 8) & 0xFF; } else flash[b++] = v & 0xFF; } }
      continue; }
    if(it.d) continue;
    const { op, args } = it, sig = AVR_OPS[op], want = sig === "" ? 0 : sig === "*" ? -1 : sig.split(",").length;
    if(want >= 0 && args.length !== want) throw { line: ln, msg: T(`${op.toUpperCase()} skal ha ${want} operand${want === 1 ? "" : "er"}`, `${op.toUpperCase()} takes ${want} operand${want === 1 ? "" : "s"}`) };
    const I = { op, ln, at: it.at, size: AVR_TWO.has(op) ? 2 : 1 };
    const imm = ["ldi", "subi", "sbci", "andi", "ori", "cpi", "sbr", "cbr"].includes(op);
    if(imm){ I.d = reg(args[0], ln, 16); I.k = avrExpr(args[1], sym, ln); if(I.k < -128 || I.k > 255) throw { line: ln, msg: T(`verdien ${I.k} passer ikke i 8 bit (0–255)`, `the value ${I.k} does not fit in 8 bits (0–255)`) }; I.k &= 0xFF; if(op === "cbr"){ I.op = "andi"; I.k = ~I.k & 0xFF; } if(op === "sbr") I.op = "ori"; }
    else if(["mov", "add", "adc", "sub", "sbc", "and", "or", "eor", "cp", "cpc", "cpse", "mul"].includes(op)){ I.d = reg(args[0], ln); I.r = reg(args[1], ln); }
    else if(op === "muls"){ I.d = reg(args[0], ln, 16); I.r = reg(args[1], ln, 16); }
    else if(op === "movw"){ I.d = reg(args[0], ln); I.r = reg(args[1], ln); if(I.d % 2 || I.r % 2) throw { line: ln, msg: T("MOVW bruker registerpar med partall: r24, r26 …", "MOVW uses even register pairs: r24, r26 …") }; }
    else if(["com", "neg", "inc", "dec", "tst", "clr", "lsl", "lsr", "rol", "ror", "asr", "swap", "pop"].includes(op)) I.d = reg(args[0], ln);
    else if(op === "ser"){ I.d = reg(args[0], ln, 16); }
    else if(op === "push"){ I.r = reg(args[0], ln); }
    else if(op === "adiw" || op === "sbiw"){ I.d = reg(args[0], ln); if(![24, 26, 28, 30].includes(I.d)) throw { line: ln, msg: T(`${op.toUpperCase()} virker bare på r24, r26 (X), r28 (Y) og r30 (Z)`, `${op.toUpperCase()} only works on r24, r26 (X), r28 (Y) and r30 (Z)`) }; I.k = val(args[1], ln, 0, 63, T("konstanten", "the constant")); }
    else if(sig === "k" || op === "brbs" || op === "brbc"){ const a = args[args.length - 1]; I.k = avrExpr(a, sym, ln); if(op === "brbs" || op === "brbc") I.b = val(args[0], ln, 0, 7, "bit");
      if(op.startsWith("br")){ const off = I.k - (it.at + 1); if(off < -64 || off > 63) throw { line: ln, msg: T(`hoppet til «${a}» er for langt for ${op.toUpperCase()} (maks 64 ord). Snu betingelsen og bruk RJMP.`, `the jump to "${a}" is too far for ${op.toUpperCase()} (max 64 words). Invert the condition and use RJMP.`) }; }
      if(op === "rjmp" || op === "rcall"){ const off = I.k - (it.at + 1); if(off < -2048 || off > 2047) throw { line: ln, msg: T("hoppet er for langt for RJMP/RCALL; bruk JMP/CALL", "the jump is too far for RJMP/RCALL; use JMP/CALL") }; } }
    else if(op === "sbrc" || op === "sbrs"){ I.r = reg(args[0], ln); I.b = val(args[1], ln, 0, 7, "bit"); }
    else if(op === "bst"){ I.r = reg(args[0], ln); I.b = val(args[1], ln, 0, 7, "bit"); }
    else if(op === "bld"){ I.d = reg(args[0], ln); I.b = val(args[1], ln, 0, 7, "bit"); }
    else if(op === "sbic" || op === "sbis" || op === "sbi" || op === "cbi"){ I.a = avrExpr(args[0], sym, ln); if(I.a > 0x1F) throw { line: ln, msg: T(`${op.toUpperCase()} når bare I/O-adressene 0–31 (PORTB, DDRB, PINB …). Bruk IN/OUT eller LDS/STS.`, `${op.toUpperCase()} only reaches I/O addresses 0–31 (PORTB, DDRB, PINB …). Use IN/OUT or LDS/STS.`) }; I.b = val(args[1], ln, 0, 7, "bit"); }
    else if(op === "in"){ I.d = reg(args[0], ln); I.a = avrExpr(args[1], sym, ln); if(I.a > 0x3F) throw { line: ln, msg: T(`IN når bare I/O-adressene 0–63. ${args[1]} ligger høyere: bruk LDS.`, `IN only reaches I/O addresses 0–63. ${args[1]} is higher: use LDS.`) }; }
    else if(op === "out"){ I.a = avrExpr(args[0], sym, ln); I.r = reg(args[1], ln); if(I.a > 0x3F) throw { line: ln, msg: T(`OUT når bare I/O-adressene 0–63. ${args[0]} ligger høyere: bruk STS.`, `OUT only reaches I/O addresses 0–63. ${args[0]} is higher: use STS.`) }; }
    else if(op === "lds"){ I.d = reg(args[0], ln); I.k = val(args[1], ln, 0, 0xFFFF, T("adressen", "the address")); }
    else if(op === "sts"){ I.k = val(args[0], ln, 0, 0xFFFF, T("adressen", "the address")); I.r = reg(args[1], ln); }
    else if(op === "ld" || op === "st"){ const pa = op === "ld" ? args[1] : args[0]; I.p = avrPtr(pa, ln); if(op === "ld") I.d = reg(args[0], ln); else I.r = reg(args[1], ln); }
    else if(op === "ldd" || op === "std"){ const pa = (op === "ldd" ? args[1] : args[0]).replace(/\s+/g, ""), q = pa.match(/^([YZ])\+(.+)$/i); if(!q) throw { line: ln, msg: T(`skriv Y+q eller Z+q, ikke «${pa}»`, `write Y+q or Z+q, not "${pa}"`) };
      I.p = { base: q[1].toUpperCase() === "Y" ? 28 : 30, mode: "q", q: val(q[2], ln, 0, 63, "q") }; if(op === "ldd") I.d = reg(args[0], ln); else I.r = reg(args[1], ln); }
    else if(op === "lpm"){ if(!args.length){ I.d = 0; I.inc = false; } else { if(args.length !== 2) throw { line: ln, msg: T("skriv LPM, LPM r16, Z eller LPM r16, Z+", "write LPM, LPM r16, Z or LPM r16, Z+") }; I.d = reg(args[0], ln); const z = args[1].replace(/\s+/g, "").toUpperCase(); if(z !== "Z" && z !== "Z+") throw { line: ln, msg: T("LPM leser bare via Z eller Z+", "LPM only reads via Z or Z+") }; I.inc = z === "Z+"; } }
    else if(op === "bset" || op === "bclr"){ I.b = val(args[0], ln, 0, 7, "bit"); }
    used.add(I.op); prog.push(I);
  }
  const at = new Map(prog.map((I, i) => [I.at, i]));
  return { prog, at, flash, labels, sym, used, end: prog.length ? Math.max(...prog.map(I => I.at + I.size)) : 0 };
}
function avrUnq(a){ return a.slice(1, -1).replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\0/g, "\0").replace(/\\(.)/g, "$1"); }
function avrPtr(a, ln){ const t = a.replace(/\s+/g, "").toUpperCase(), m = t.match(/^(-?)([XYZ])(\+?)$/);
  if(!m || (m[1] && m[3])) throw { line: ln, msg: T(`pekeren skal være X, X+, -X (eller Y, Z), ikke «${a}»`, `the pointer must be X, X+, -X (or Y, Z), not "${a}"`) };
  return { base: { X: 26, Y: 28, Z: 30 }[m[2]], mode: m[1] ? "pre" : m[3] ? "post" : "" }; }

// ---------- simulator ----------
function avrRun(src, opt = {}){
  let A; try { A = avrAssemble(src); } catch(e){ return { ok: false, error: e.line ? e : { line: 0, msg: String(e.message || e) } }; }
  const r = new Uint8Array(32), mem = new Uint8Array(0x900), init = opt.init || {}, maxC = opt.maxCycles || 4e6;
  let sreg = 0, sp = 0x8FF, pc = 0, cyc = 0, out = "", halt = null, steps = 0, haltLine = 0;
  const pinIn = { B: 0xFF, C: 0xFF, D: 0xFF }; // knapper med pull-up: 1 = sluppet
  const counts = {}, log = [], firstWrite = {};
  const portsNow = () => [mem[0x25], mem[0x28], mem[0x2B], mem[0x24], mem[0x27], mem[0x2A]];
  for(const [k, v] of Object.entries(init)){ const u = k.toUpperCase();
    if(/^R\d+$/.test(u)) r[+u.slice(1)] = v & 0xFF;
    else if(/^PIN[BCD]$/.test(u)) pinIn[u[3]] = v & 0xFF;
    else if(AVR_SYM[u] != null && AVR_SYM[u] < 0x40) mem[AVR_SYM[u] + 0x20] = v & 0xFF;
    else if(/^M\d+$/.test(u)) mem[+u.slice(1)] = v & 0xFF; }
  const r0 = Uint8Array.from(r);
  log.push([0, ...portsNow()]);
  const F = b => (sreg >> b) & 1, setF = (b, v) => { sreg = v ? sreg | (1 << b) : sreg & ~(1 << b); };
  const NZS = (R, V) => { setF(2, R & 0x80); setF(1, (R & 0xFF) === 0); setF(3, V); setF(4, ((R >> 7) & 1) ^ (V ? 1 : 0)); };
  // I/O på dataadresse (0x20 + I/O-adresse)
  const rd = a => { a &= 0xFFFF;
    if(a < 0x20) return r[a];
    if(a === 0x5F) return sreg; if(a === 0x5D) return sp & 0xFF; if(a === 0x5E) return sp >> 8;
    if(a === 0x23 || a === 0x26 || a === 0x29){ const P = "BCD"[(a - 0x23) / 3], ddr = mem[a + 1], port = mem[a + 2]; return (port & ddr) | (pinIn[P] & ~ddr); }
    if(a === 0xC0) return mem[a] | 0x60; // UDRE0 og TXC0: klar til å sende
    if(a >= 0x900) return 0; return mem[a]; };
  const wr = (a, v) => { a &= 0xFFFF; v &= 0xFF;
    if(a < 0x20){ r[a] = v; return; }
    if(a === 0x5F){ sreg = v; return; } if(a === 0x5D){ sp = (sp & 0xFF00) | v; return; } if(a === 0x5E){ sp = (v << 8 | (sp & 0xFF)) & 0xFFFF; return; }
    if(a === 0x23 || a === 0x26 || a === 0x29){ mem[a + 2] ^= v; logPorts(); return; } // skriv 1 til PINx: veksle PORTx
    if(a === 0xC6){ out += String.fromCharCode(v); return; }
    if(a >= 0x900) return;
    mem[a] = v; if(a >= 0x24 && a <= 0x2B) logPorts(); };
  const logPorts = () => { const p = portsNow(), L = log[log.length - 1]; if(p.some((x, i) => x !== L[i + 1])){ if(log.length < 4000) log.push([cyc, ...p]); } };
  const push = v => { if(sp < 0x100) throw { msg: T("stakken har vokst ned i registrene (stack overflow)", "the stack has grown into the registers (stack overflow)") }; mem[sp] = v & 0xFF; sp = (sp - 1) & 0xFFFF; };
  const pop = () => { sp = (sp + 1) & 0xFFFF; if(sp > 0x8FF) throw { msg: T("POP/RET med tom stakk", "POP/RET with an empty stack") }; return mem[sp]; };
  const ptr = p => r[p.base] | (r[p.base + 1] << 8), setPtr = (p, v) => { r[p.base] = v & 0xFF; r[p.base + 1] = (v >> 8) & 0xFF; };
  const skip = () => { const j = A.at.get(pc); const n = j != null ? A.prog[j].size : 1; pc += n; cyc += n; };
  const sub = (d, k, c, keepZ) => { const R = (d - k - c) & 0xFF;
    setF(5, ((~d & k) | (k & R) | (R & ~d)) & 0x08); setF(0, d < k + c);
    const V = ((d & ~k & ~R) | (~d & k & R)) & 0x80; setF(2, R & 0x80); setF(1, keepZ ? F(1) && R === 0 : R === 0); setF(3, V); setF(4, ((R >> 7) & 1) ^ (V ? 1 : 0)); return R; };
  const add = (d, k, c) => { const R = (d + k + c) & 0xFF;
    setF(5, ((d & k) | (k & ~R) | (~R & d)) & 0x08); setF(0, d + k + c > 0xFF); NZS(R, ((d & k & ~R) | (~d & ~k & R)) & 0x80); return R; };
  try {
    while(true){
      if(cyc >= maxC){ halt = "limit"; break; }
      const j = A.at.get(pc);
      if(j == null){ if(pc >= A.end){ halt = "end"; break; } throw { msg: T(`programmet hoppet til adresse ${pc}, der det ikke er kode`, `the program jumped to address ${pc}, where there is no code`) }; }
      const I = A.prog[j]; steps++; counts[I.op] = (counts[I.op] || 0) + 1; haltLine = I.ln;
      let next = pc + I.size, c = 1;
      switch(I.op){
        case "nop": case "wdr": break;
        case "ldi": r[I.d] = I.k; break;
        case "ser": r[I.d] = 0xFF; break;
        case "mov": r[I.d] = r[I.r]; break;
        case "movw": r[I.d] = r[I.r]; r[I.d + 1] = r[I.r + 1]; break;
        case "add": r[I.d] = add(r[I.d], r[I.r], 0); break;
        case "adc": r[I.d] = add(r[I.d], r[I.r], F(0)); break;
        case "lsl": r[I.d] = add(r[I.d], r[I.d], 0); break;
        case "rol": r[I.d] = add(r[I.d], r[I.d], F(0)); break;
        case "sub": r[I.d] = sub(r[I.d], r[I.r], 0); break;
        case "subi": r[I.d] = sub(r[I.d], I.k, 0); break;
        case "sbc": r[I.d] = sub(r[I.d], r[I.r], F(0), true); break;
        case "sbci": r[I.d] = sub(r[I.d], I.k, F(0), true); break;
        case "cp": sub(r[I.d], r[I.r], 0); break;
        case "cpc": sub(r[I.d], r[I.r], F(0), true); break;
        case "cpi": sub(r[I.d], I.k, 0); break;
        case "and": r[I.d] &= r[I.r]; NZS(r[I.d], 0); break;
        case "andi": r[I.d] &= I.k; NZS(r[I.d], 0); break;
        case "or": r[I.d] |= r[I.r]; NZS(r[I.d], 0); break;
        case "ori": r[I.d] |= I.k; NZS(r[I.d], 0); break;
        case "eor": r[I.d] ^= r[I.r]; NZS(r[I.d], 0); break;
        case "clr": r[I.d] = 0; NZS(0, 0); break;
        case "tst": NZS(r[I.d], 0); break;
        case "com": r[I.d] = ~r[I.d] & 0xFF; NZS(r[I.d], 0); setF(0, 1); break;
        case "neg": { const d = r[I.d], R = (-d) & 0xFF; r[I.d] = R; setF(5, (R | d) & 0x08); setF(0, R !== 0); NZS(R, R === 0x80); break; }
        case "inc": { const R = (r[I.d] + 1) & 0xFF; r[I.d] = R; NZS(R, R === 0x80); break; }
        case "dec": { const R = (r[I.d] - 1) & 0xFF; r[I.d] = R; NZS(R, R === 0x7F); break; }
        case "lsr": { const d = r[I.d], R = d >> 1; r[I.d] = R; setF(0, d & 1); setF(2, 0); setF(1, R === 0); setF(3, d & 1); setF(4, d & 1); break; }
        case "ror": { const d = r[I.d], R = (F(0) << 7) | (d >> 1); r[I.d] = R; setF(0, d & 1); setF(2, R & 0x80); setF(1, R === 0); const V = ((R >> 7) & 1) ^ (d & 1); setF(3, V); setF(4, ((R >> 7) & 1) ^ V); break; }
        case "asr": { const d = r[I.d], R = (d & 0x80) | (d >> 1); r[I.d] = R; setF(0, d & 1); setF(2, R & 0x80); setF(1, R === 0); const V = ((R >> 7) & 1) ^ (d & 1); setF(3, V); setF(4, ((R >> 7) & 1) ^ V); break; }
        case "swap": r[I.d] = ((r[I.d] << 4) | (r[I.d] >> 4)) & 0xFF; break;
        case "mul": { const R = r[I.d] * r[I.r]; r[0] = R & 0xFF; r[1] = R >> 8; setF(0, R & 0x8000); setF(1, R === 0); c = 2; break; }
        case "muls": { const s8 = v => v > 127 ? v - 256 : v, R = (s8(r[I.d]) * s8(r[I.r])) & 0xFFFF; r[0] = R & 0xFF; r[1] = R >> 8; setF(0, R & 0x8000); setF(1, R === 0); c = 2; break; }
        case "adiw": case "sbiw": { const d = r[I.d] | (r[I.d + 1] << 8), R = (I.op === "adiw" ? d + I.k : d - I.k) & 0xFFFF, h7 = (d >> 15) & 1, R15 = (R >> 15) & 1;
          r[I.d] = R & 0xFF; r[I.d + 1] = R >> 8; const V = I.op === "adiw" ? !h7 && R15 : h7 && !R15; setF(0, I.op === "adiw" ? !R15 && h7 : R15 && !h7); setF(2, R15); setF(1, R === 0); setF(3, V); setF(4, R15 ^ (V ? 1 : 0)); c = 2; break; }
        case "rjmp": if(I.k === pc){ halt = "loop"; break; } next = I.k; c = 2; break;
        case "jmp": if(I.k === pc){ halt = "loop"; break; } next = I.k; c = 3; break;
        case "ijmp": next = ptr({ base: 30 }); c = 2; break;
        case "rcall": case "call": case "icall": { const ret = pc + I.size; push(ret & 0xFF); push(ret >> 8); next = I.op === "icall" ? ptr({ base: 30 }) : I.k; c = I.op === "call" ? 4 : 3; break; }
        case "ret": case "reti": { const hi = pop(), lo = pop(); next = (hi << 8) | lo; c = 4; if(I.op === "reti") setF(7, 1); break; }
        case "push": push(r[I.r]); c = 2; break;
        case "pop": r[I.d] = pop(); c = 2; break;
        case "brbs": case "brbc": if(F(I.b) === (I.op === "brbs" ? 1 : 0)){ next = I.k; c = 2; } break;
        case "cpse": if(r[I.d] === r[I.r]){ pc = next; skip(); next = pc; } break;
        case "sbrc": case "sbrs": if(((r[I.r] >> I.b) & 1) === (I.op === "sbrs" ? 1 : 0)){ pc = next; skip(); next = pc; } break;
        case "sbic": case "sbis": if(((rd(I.a + 0x20) >> I.b) & 1) === (I.op === "sbis" ? 1 : 0)){ pc = next; skip(); next = pc; } break;
        case "sbi": case "cbi": { const a = I.a + 0x20, isPin = a === 0x23 || a === 0x26 || a === 0x29;
          if(isPin){ if(I.op === "sbi") wr(a, 1 << I.b); } else wr(a, I.op === "sbi" ? rd(a) | (1 << I.b) : rd(a) & ~(1 << I.b)); c = 2; break; }
        case "in": r[I.d] = rd(I.a + 0x20); break;
        case "out": wr(I.a + 0x20, r[I.r]); break;
        case "lds": r[I.d] = rd(I.k); c = 2; break;
        case "sts": wr(I.k, r[I.r]); c = 2; break;
        case "ld": case "st": { let a = ptr(I.p); if(I.p.mode === "pre"){ a = (a - 1) & 0xFFFF; setPtr(I.p, a); } if(I.op === "ld") r[I.d] = rd(a); else wr(a, r[I.r]); if(I.p.mode === "post") setPtr(I.p, a + 1); c = 2; break; }
        case "ldd": r[I.d] = rd(ptr(I.p) + I.p.q); c = 2; break;
        case "std": wr(ptr(I.p) + I.p.q, r[I.r]); c = 2; break;
        case "lpm": { const z = ptr({ base: 30 }); r[I.d] = A.flash[z & 0x7FFF]; if(I.inc) setPtr({ base: 30 }, z + 1); c = 3; break; }
        case "bset": setF(I.b, 1); break; case "bclr": setF(I.b, 0); break;
        case "bst": setF(6, (r[I.r] >> I.b) & 1); break;
        case "bld": r[I.d] = F(6) ? r[I.d] | (1 << I.b) : r[I.d] & ~(1 << I.b); break;
        case "sleep": case "break": halt = "sleep"; break;
        default:
          if(AVR_BR[I.op]){ const [b, v] = AVR_BR[I.op]; if(F(b) === v){ next = I.k; c = 2; } }
          else if(AVR_FLAGS[I.op] != null) setF(AVR_FLAGS[I.op], I.op[0] === "s");
      }
      if(halt) break;
      cyc += c; pc = next;
    }
  } catch(e){ return { ok: false, error: { line: haltLine, msg: e.msg || String(e.message || e) }, out, cycles: cyc }; }
  logPorts(); log.push([cyc, ...portsNow()]);
  const io = name => { const u = String(name).toUpperCase(), a = AVR_SYM[u]; if(a == null) return undefined; return a < 0x40 ? rd(a + 0x20) : rd(a); };
  const pin = name => { const m = String(name).toUpperCase().match(/^P([BCD])(\d)$/); if(!m) return undefined; const base = { B: 0x24, C: 0x27, D: 0x2A }[m[1]]; return ((mem[base] & mem[base + 1]) >> +m[2]) & 1; };
  const col = { B: 1, C: 2, D: 3 };
  const toggles = name => { const m = String(name).toUpperCase().match(/^P([BCD])(\d)$/); if(!m) return 0; let n = 0, prev = null;
    for(const e of log){ const v = (e[col[m[1]]] & e[col[m[1]] + 3]) >> +m[2] & 1; if(prev != null && v !== prev) n++; prev = v; } return n; };
  return { ok: true, out, r, r0, mem, sreg, sp, cycles: cyc, steps, halt, haltLine, counts, used: A.used, log, flash: A.flash,
    reg: n => r[+String(n).replace(/^r/i, "")], word: n => r[n] | (r[n + 1] << 8), flag: f => (sreg >> "CZNVSHTI".indexOf(String(f).toUpperCase())) & 1,
    io, pin, toggles, count: op => counts[String(op).toLowerCase()] || 0,
    edges: name => { const m = String(name).toUpperCase().match(/^P([BCD])(\d)$/); if(!m) return []; const out = []; let prev = null;
      for(const e of log){ const v = (e[col[m[1]]] & e[col[m[1]] + 3]) >> +m[2] & 1; if(prev != null && v !== prev) out.push(e[0]); prev = v; } return out; } };
}
// Sjekk av en oppgave: kjører koden for hvert tilfelle (cases) og spør task.check(m, tilfelle) → true eller en forklaring.
function avrCheck(task, src){
  const cases = task.cases && task.cases.length ? task.cases : [{}];
  let first = null;
  for(const cs of cases){
    const m = avrRun(src, { init: cs, maxCycles: task.maxCycles });
    if(!first) first = m;
    if(!m.ok) return { pass: false, m, msg: T(`Linje ${m.error.line}: ${m.error.msg}`, `Line ${m.error.line}: ${m.error.msg}`) };
    const pre = Object.keys(cs).length ? T("Med ", "With ") + Object.entries(cs).map(([k, v]) => `${k} = ${avrFmtIn(k, v)}`).join(", ") + ": " : "";
    if(task.out != null && avrNorm(m.out) !== avrNorm(task.out)) return { pass: false, m, msg: pre + T("UART-utskriften er ikke lik. Forventet:", "The UART output does not match. Expected:") + "```" + task.out + "```" };
    if(task.check){ let v; try { v = task.check(m, cs); } catch(e){ v = String(e.message || e); } if(v !== true) return { pass: false, m, msg: pre + (typeof v === "string" ? v : T("Ikke riktig ennå.", "Not right yet.")) }; }
  }
  return { pass: true, m: first };
}
const avrNorm = s => String(s || "").replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
const avrFmtIn = (k, v) => /^PIN/i.test(k) ? "0b" + v.toString(2).padStart(8, "0") : String(v);
const avrHex = v => "0x" + v.toString(16).toUpperCase().padStart(2, "0");
const avrBin = v => "0b" + v.toString(2).padStart(8, "0");
if(typeof module !== "undefined") module.exports = { avrRun, avrAssemble, avrCheck };

// ---------- visning i kodelaben ----------
function avrTime(c){ const t = c / AVR_HZ, f = (v, d) => (Math.round(v * 10 ** d) / 10 ** d).toString().replace(".", decPoint() ? "." : ",");
  return t < 1e-3 ? f(t * 1e6, 2) + " µs" : t < 1 ? f(t * 1e3, 3) + " ms" : f(t, 3) + " s"; }
function avrOutHTML(m){
  if(!m.ok){ const L = String(CD.src || "").split("\n")[m.error.line - 1];
    return `<div class="cd-err"><b>${esc(m.error.line ? T(`Linje ${m.error.line}:`, `Line ${m.error.line}:`) : T("Feil:", "Error:"))}</b> ${esc(m.error.msg)}${L != null && m.error.line ? `<pre>${esc(L.trim())}</pre>` : ""}</div>`; }
  const H = { loop: T(`Ferdig: programmet står i den evige løkka på linje ${m.haltLine}.`, `Done: the program sits in the endless loop on line ${m.haltLine}.`),
    end: T("Programmet gikk forbi siste instruksjon. Avslutt gjerne med en evig løkke: slutt: rjmp slutt", "The program ran past the last instruction. End with an endless loop: slutt: rjmp slutt"),
    sleep: T("Stoppet på SLEEP/BREAK.", "Stopped at SLEEP/BREAK."),
    limit: T("Stoppet her i simulatoren. På en ekte brikke går programmet videre for alltid.", "Stopped here in the simulator. On a real chip the program keeps running forever.") }[m.halt];
  let h = `<div class="avr-stat ${m.halt === "end" ? "warn" : ""}"><b>${esc(H)}</b><span>${esc(T(`${m.cycles.toLocaleString("nb")} klokkesykler = ${avrTime(m.cycles)} ved 16 MHz · ${m.steps.toLocaleString("nb")} instruksjoner`, `${m.cycles.toLocaleString("en")} clock cycles = ${avrTime(m.cycles)} at 16 MHz · ${m.steps.toLocaleString("en")} instructions`))}</span></div>`;
  if(m.out || m.used.has("sts")) h += `<div class="avr-h">UART (UDR0)</div><pre class="cd-con">${esc(m.out) || `<span class="cd-dim">${esc(T("(ingenting sendt)", "(nothing sent)"))}</span>`}</pre>`;
  // porter med LED-er
  const ARD = { B: [8, 9, 10, 11, 12, 13, null, null], C: ["A0", "A1", "A2", "A3", "A4", "A5", null, null], D: [0, 1, 2, 3, 4, 5, 6, 7] };
  const ports = ["B", "C", "D"].filter(P => { const ddr = m.io("DDR" + P), port = m.io("PORT" + P); return ddr || port || P === "B"; });
  h += `<div class="avr-h">${esc(T("Porter (lyser = utgang satt høy)", "Ports (lit = output driven high)"))}</div><div class="avr-ports">` + ports.map(P => { const ddr = m.io("DDR" + P), port = m.io("PORT" + P), pin = m.io("PIN" + P);
    return `<div class="avr-port"><b>PORT${P}</b><div class="avr-leds">${[7, 6, 5, 4, 3, 2, 1, 0].map(b => { const out = (ddr >> b) & 1, on = out && ((port >> b) & 1), a = ARD[P][b];
      return `<span class="avr-led ${on ? "on" : ""} ${out ? "" : "in"}" title="P${P}${b}${a != null ? " · Arduino " + a : ""}: ${out ? T("utgang", "output") : T("inngang", "input")}, PIN = ${(pin >> b) & 1}"><i></i><small>P${P}${b}</small><small>${a != null ? (P === "C" ? a : "D" + a) : ""}</small></span>`; }).join("")}</div>
      <small class="avr-pr">DDR${P} ${avrBin(ddr)} · PORT${P} ${avrBin(port)}</small></div>`; }).join("") + `</div>`;
  h += avrWaveHTML(m);
  // registre
  h += `<div class="avr-h">${esc(T("Registre (heks · desimal)", "Registers (hex · decimal)"))}</div><div class="avr-regs">` + Array.from({ length: 32 }, (_, i) => { const v = m.r[i], ch = v !== m.r0[i];
    return `<span class="avr-reg ${v ? "nz" : ""} ${ch ? "ch" : ""}" title="r${i} = ${v} = ${avrBin(v)}"><small>r${i}</small><b>${avrHex(v)}</b><small>${v}</small></span>`; }).join("") + `</div>`;
  h += `<div class="avr-flags"><span class="avr-h0">SREG</span>${"ITHSVNZC".split("").map(f => `<span class="avr-fl ${m.flag(f) ? "on" : ""}" title="${esc({ I: T("avbrudd på", "interrupts on"), T: T("T-bit (BST/BLD)", "T bit (BST/BLD)"), H: T("halv-mente (fra bit 3)", "half carry (from bit 3)"), S: T("fortegn, N ⊕ V", "sign, N ⊕ V"), V: T("overflyt med fortegn", "signed overflow"), N: T("negativ (bit 7)", "negative (bit 7)"), Z: T("null", "zero"), C: T("mente/lån", "carry/borrow") }[f])}">${f}<b>${m.flag(f)}</b></span>`).join("")}<span class="avr-sp">SP ${"0x" + m.sp.toString(16).toUpperCase()}</span></div>`;
  // SRAM brukt
  const used = []; for(let a = 0x100; a < 0x900; a++) if(m.mem[a]) used.push(a);
  if(used.length && used[0] < 0x8F0){ const a0 = used[0] & ~7; h += `<div class="avr-h">SRAM</div><div class="avr-ram">${Array.from({ length: 16 }, (_, i) => a0 + i).map(a => `<span title="0x${a.toString(16).toUpperCase()}"><small>${a.toString(16).toUpperCase()}</small>${avrHex(m.mem[a])}</span>`).join("")}</div>`; }
  return h;
}
// «Logikkanalysator»: pinner som har skiftet nivå, tegnet over tid.
function avrWaveHTML(m){
  const col = { B: 1, C: 2, D: 3 }, pins = [];
  for(const P of "BCD") for(let b = 0; b < 8; b++) if(m.toggles("P" + P + b) >= 2) pins.push([P, b]);
  if(!pins.length) return "";
  const sh = pins.slice(0, 4), W = 330, L = 34, R = 6, rowH = 26, Hh = sh.length * rowH + 18, end = Math.max(1, m.cycles), X = c => L + c / end * (W - L - R);
  let g = "";
  sh.forEach(([P, b], k) => { const y0 = 8 + k * rowH, hi = y0 + 4, lo = y0 + 18; let d = "", prev = null;
    for(const e of m.log){ const v = (e[col[P]] & e[col[P] + 3]) >> b & 1, x = X(e[0]).toFixed(1), y = v ? hi : lo; d += prev == null ? `M${x} ${y}` : `H${x}V${y}`; prev = v; }
    d += `H${W - R}`;
    g += `<text x="2" y="${lo - 2}" class="cd-tk" text-anchor="start">P${P}${b}</text><path d="${d}" style="fill:none;stroke:var(--c${k % 5 + 1});stroke-width:2"/>`; });
  g += `<text x="${L}" y="${Hh - 2}" class="cd-tk" text-anchor="start">0</text><text x="${W - R}" y="${Hh - 2}" class="cd-tk" text-anchor="end">${esc(avrTime(m.cycles))}</text>`;
  return `<div class="avr-h">${esc(T("Logikkanalysator", "Logic analyser"))}</div><div class="cd-plot avr-wave"><svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${esc(T("Pinnenivå over tid", "Pin levels over time"))}">${g}</svg></div>`;
}
function avrHelpHTML(){
  return `<details class="cd-help avr-help"><summary>${esc(T("Jukselapp: AVR-instruksjoner", "Cheat sheet: AVR instructions"))}</summary><div>${rich(T(
`- \`ldi r16, 42\` last en konstant (bare r16–r31) · \`mov r17, r16\` kopier
- \`add\`, \`adc\` (med mente), \`sub\`, \`subi\`, \`sbc\`, \`inc\`, \`dec\`, \`mul r16, r17\` (svar i r1:r0)
- \`and\`, \`andi\`, \`or\`, \`ori\`, \`eor\`, \`com\`, \`lsl\`, \`lsr\`, \`rol\`, \`ror\`, \`swap\`
- \`cp\`, \`cpi\` sammenlign, så \`breq\`, \`brne\`, \`brlo\`, \`brsh\`, \`brlt\`, \`brge\`
- \`rjmp\` hopp, \`rcall\` / \`ret\` subrutine, \`push\` / \`pop\` stakken
- \`sbi PORTB, PB5\` / \`cbi\` sett/nullstill én bit · \`sbis\` / \`sbic PIND, 2\` hopp over neste hvis bit er 1/0
- \`out DDRB, r16\` / \`in r16, PIND\` · \`sts UDR0, r16\` send et tegn på UART
- \`ld r16, X+\`, \`st Y, r16\`, \`lpm r16, Z+\` (les fra programminnet, \`ldi ZL, low(tekst*2)\`)
- Tall: \`42\`, \`0x2A\`, \`$2A\`, \`0b00101010\`, \`'A'\`, \`(1<<PB5)\`
- Avslutt med en evig løkke: \`slutt: rjmp slutt\``,
`- \`ldi r16, 42\` load a constant (only r16–r31) · \`mov r17, r16\` copy
- \`add\`, \`adc\` (with carry), \`sub\`, \`subi\`, \`sbc\`, \`inc\`, \`dec\`, \`mul r16, r17\` (result in r1:r0)
- \`and\`, \`andi\`, \`or\`, \`ori\`, \`eor\`, \`com\`, \`lsl\`, \`lsr\`, \`rol\`, \`ror\`, \`swap\`
- \`cp\`, \`cpi\` compare, then \`breq\`, \`brne\`, \`brlo\`, \`brsh\`, \`brlt\`, \`brge\`
- \`rjmp\` jump, \`rcall\` / \`ret\` subroutine, \`push\` / \`pop\` the stack
- \`sbi PORTB, PB5\` / \`cbi\` set/clear one bit · \`sbis\` / \`sbic PIND, 2\` skip next if bit is 1/0
- \`out DDRB, r16\` / \`in r16, PIND\` · \`sts UDR0, r16\` send a character on the UART
- \`ld r16, X+\`, \`st Y, r16\`, \`lpm r16, Z+\` (read program memory, \`ldi ZL, low(text*2)\`)
- Numbers: \`42\`, \`0x2A\`, \`$2A\`, \`0b00101010\`, \`'A'\`, \`(1<<PB5)\`
- End with an endless loop: \`slutt: rjmp slutt\``))}</div></details>`;
}
