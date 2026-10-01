// Python i nettleseren for kodeoppgavene (code.js). Kjører Pyodide (vendor/pyodide, kopiert fra npm av tools/vendor.mjs)
// i en egen worker, så en evig løkke ikke låser appen – appen avslutter workeren ved tidsavbrudd.
// Inn: { id, code, check, stdin }  Ut: { id, t: "ready" | "out" | "err" | "done", … }
import { loadPyodide } from "./pyodide/pyodide.mjs";

// Liten erstatning for matplotlib.pyplot: plt.plot/scatter/bar/title/xlabel/ylabel/legend/grid/show samles og tegnes av appen.
const PRELUDE = `
import sys, types, math
_axle_plots = []
_axle_meta = {"title": None, "xlabel": None, "ylabel": None}
def _axle_list(v):
    try:
        return [float(x) for x in v]
    except TypeError:
        return [float(v)]
def _axle_add(kind, x, y=None, label=None, **kw):
    if y is None:
        y = x; x = list(range(len(_axle_list(y))))
    _axle_plots.append({"kind": kind, "x": _axle_list(x), "y": _axle_list(y), "label": label or kw.get("label")})
_plt = types.ModuleType("matplotlib.pyplot")
_plt.plot = lambda x, y=None, *a, label=None, **kw: _axle_add("line", x, y, label)
_plt.scatter = lambda x, y, *a, label=None, **kw: _axle_add("dot", x, y, label)
_plt.bar = lambda x, y, *a, label=None, **kw: _axle_add("bar", x, y, label)
def _meta(k):
    def f(s, *a, **kw): _axle_meta[k] = str(s)
    return f
_plt.title = _meta("title"); _plt.xlabel = _meta("xlabel"); _plt.ylabel = _meta("ylabel")
for _n in ("show", "legend", "grid", "figure", "tight_layout", "axhline", "axvline", "xlim", "ylim", "savefig"):
    setattr(_plt, _n, lambda *a, **kw: None)
_mpl = types.ModuleType("matplotlib"); _mpl.pyplot = _plt
sys.modules["matplotlib"] = _mpl; sys.modules["matplotlib.pyplot"] = _plt
`;
let py = null, ready = null, cur = null;
async function boot(){
  py = await loadPyodide({ indexURL: new URL("./pyodide/", import.meta.url).href });
  py.setStdout({ batched: s => cur != null && postMessage({ id: cur, t: "out", s: s + "\n" }) });
  py.setStderr({ batched: s => cur != null && postMessage({ id: cur, t: "err", s: s + "\n" }) });
  postMessage({ t: "ready" });
}
ready = boot().catch(e => postMessage({ t: "fail", s: String(e && e.message || e) }));
// Gjør Pythons feilmelding kort: bare linjene som gjelder brukerens kode.
function tidy(msg){
  const lines = String(msg).split("\n"), out = [];
  let skip = false;
  for(const l of lines){
    if(/^Traceback/.test(l)) continue;
    if(/^\s+File "(?!<exec>)/.test(l)){ skip = true; continue; }
    if(/^\s+File "<exec>"/.test(l)){ skip = false; out.push(l.replace('File "<exec>", line', "Linje").trim()); continue; }
    if(skip && /^\s{4}/.test(l)) continue;
    skip = false; if(l.trim()) out.push(l);
  }
  return out.join("\n");
}
onmessage = async e => {
  const { id, code, check, stdin } = e.data;
  await ready; if(!py) return postMessage({ id, t: "done", ok: false, error: "Python kunne ikke starte." });
  cur = id;
  const lines = String(stdin || "").split("\n");
  py.setStdin({ stdin: () => lines.length ? lines.shift() : null });
  const g = py.globals.get("dict")();
  g.set("__name__", "__main__"); g.set("__builtins__", py.globals.get("__builtins__"));
  let res = { id, t: "done", ok: true };
  try {
    await py.runPythonAsync(PRELUDE, { globals: g });
    await py.runPythonAsync(code, { globals: g });
  } catch(err){ res = { id, t: "done", ok: false, error: tidy(err.message) }; }
  if(res.ok && check){
    try { await py.runPythonAsync(check, { globals: g }); res.pass = true; }
    catch(err){ res.pass = false; const m = String(err.message).trim().split("\n").pop(); res.fail = m.replace(/^AssertionError:?\s*/, "") || "Testen feilet."; }
  }
  try {
    res.plots = g.get("_axle_plots").toJs({ dict_converter: Object.fromEntries });
    res.meta = g.get("_axle_meta").toJs({ dict_converter: Object.fromEntries });
  } catch(_){ res.plots = []; }
  g.destroy(); cur = null;
  postMessage(res);
};
