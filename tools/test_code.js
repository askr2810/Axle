// Kjører alle kodeoppgavene (code_tasks.js) i ekte Python (Pyodide):
// løsningsforslaget skal bestå (utskrift og tester), startkoden skal ikke bestå.
// Samme forspill (matplotlib-erstatning) som vendor/pyworker.mjs.
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
(async () => {
  let loadPyodide;
  try { ({ loadPyodide } = await import("pyodide")); } catch(e){ console.log("kodeoppgaver: pyodide mangler (npm install) – hopper over"); return; }
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "code_tasks.js"), "utf8") + "\nthis.CODE_TASKS = CODE_TASKS;", ctx);
  const PRELUDE = fs.readFileSync(path.join(ROOT, "vendor", "pyworker.mjs"), "utf8").match(/const PRELUDE = `([\s\S]*?)`;/)[1];
  const py = await loadPyodide();
  const norm = s => String(s || "").replace(/\r/g, "").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
  const match = (out, want) => { const a = norm(out), e = norm(want); return a === e || (a.endsWith(e) && /[\s:]/.test(a[a.length - e.length - 1] || "")); };
  async function run(task, code){
    let out = ""; py.setStdout({ batched: s => { out += s + "\n"; } }); py.setStderr({ batched: () => {} });
    const lines = String(task.stdin || "").split("\n"); py.setStdin({ stdin: () => lines.length ? lines.shift() : null });
    const g = py.globals.get("dict")(); g.set("__name__", "__main__"); g.set("__builtins__", py.globals.get("__builtins__"));
    let err = null, fail = null;
    try { await py.runPythonAsync(PRELUDE, { globals: g }); await py.runPythonAsync(code, { globals: g }); } catch(e){ err = String(e.message).trim().split("\n").pop(); }
    if(!err && task.check){ try { await py.runPythonAsync(task.check, { globals: g }); } catch(e){ fail = String(e.message).trim().split("\n").pop(); } }
    g.destroy();
    const outOk = task.out == null || match(out, task.out);
    return { pass: !err && !fail && outOk, err, fail, out, outOk };
  }
  let n = 0, bad = 0; const ids = new Set();
  for(const key of Object.keys(ctx.CODE_TASKS)){
    for(const tk of ctx.CODE_TASKS[key]){
      n++;
      if(ids.has(tk.id)){ console.log(`  DUPLIKAT id ${tk.id}`); bad++; } ids.add(tk.id);
      for(const f of ["t", "p", "hint"]) if(!Array.isArray(tk[f]) || tk[f].length !== 2){ console.log(`  ${key} ${tk.id}: mangler ${f} [nb, en]`); bad++; }
      if(tk.out == null && !tk.check){ console.log(`  ${key} ${tk.id}: verken out eller check`); bad++; }
      if(process.env.V) console.log("..", tk.id);
      const s = await run(tk, tk.sol);
      if(!s.pass){ console.log(`  ${key} ${tk.id}: løsningen består ikke`, s.err || s.fail || `utskrift: ${JSON.stringify(s.out)}`); bad++; }
      const st = await run(tk, tk.start);
      if(st.pass){ console.log(`  ${key} ${tk.id}: startkoden består allerede`); bad++; }
    }
  }
  console.log(`kodeoppgaver: ${n}, feil: ${bad}`);
  process.exit(bad ? 1 : 0);
})();
