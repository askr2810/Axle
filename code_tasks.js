// ============================================================
//  KODEOPPGAVER (Python) – data. Motoren og skjermen ligger i code.js.
//  Nøkkel "FAG:enhet" → liste med oppgaver:
//   { id, t: [nb, en], p: [nb, en] (oppgavetekst, markdown), start (startkode), sol (løsningsforslag),
//     out (forventet utskrift, sammenlignes linje for linje) og/eller check (Python som kjøres etter koden; assert … , "melding"),
//     hint: [nb, en], stdin (valgfri inndata til input()) }
//  tools/test_code.js kjører alle løsningsforslagene og sjekker at de består, og at startkoden ikke gjør det.
// ============================================================
const PY = String.raw;
const CODE_TASKS = {
  "MEK1300:0": [
    { id: "hei", t: ["Hei, verden!", "Hello, world!"],
      p: ["Skriv et program som skriver ut nøyaktig `Hei, verden!`", "Write a program that prints exactly `Hei, verden!`"],
      start: PY`# Skriv koden din her
`, sol: PY`print("Hei, verden!")
`, out: "Hei, verden!", hint: ["Bruk `print(\"...\")` med teksten i anførselstegn.", "Use `print(\"...\")` with the text in quotes."] },
    { id: "sirkel", t: ["Areal av en sirkel", "Area of a circle"],
      p: ["Regn ut arealet av en sirkel med radius `r = 2.5` og lagre det i variabelen `A`. Skriv ut `Arealet er 19.63` med to desimaler (bruk en f-streng).", "Compute the area of a circle with radius `r = 2.5` and store it in `A`. Print `Arealet er 19.63` with two decimals (use an f-string)."],
      start: PY`import math

r = 2.5
A = 0  # bytt ut 0 med formelen
print(f"Arealet er {A}")
`, sol: PY`import math

r = 2.5
A = math.pi * r**2
print(f"Arealet er {A:.2f}")
`, out: "Arealet er 19.63", check: PY`assert abs(A - 19.634954) < 1e-4, "A har feil verdi. Arealet er pi * r**2."`,
      hint: ["Arealet er `math.pi * r**2`. Med `{A:.2f}` i f-strengen får du to desimaler.", "The area is `math.pi * r**2`. `{A:.2f}` in the f-string gives two decimals."] },
    { id: "kmh", t: ["Fra km/t til m/s", "From km/h to m/s"],
      p: ["En bil kjører `72` km/t. Regn om til m/s og lagre svaret i `v`. Skriv så ut `v`.", "A car drives at `72` km/h. Convert to m/s, store it in `v` and print `v`."],
      start: PY`fart_kmh = 72
v =
print(v)
`, sol: PY`fart_kmh = 72
v = fart_kmh / 3.6
print(v)
`, check: PY`assert abs(v - 20) < 1e-9, f"v er {v}, men skal være 20 m/s. Del på 3.6."`,
      hint: ["1 m/s = 3,6 km/t, så del på 3.6.", "1 m/s = 3.6 km/h, so divide by 3.6."] },
    { id: "minutter", t: ["Timer og minutter", "Hours and minutes"],
      p: ["Gjør om `137` minutter til timer og minutter med `//` og `%`, og skriv ut `2 t 17 min`.", "Convert `137` minutes to hours and minutes with `//` and `%`, and print `2 t 17 min`."],
      start: PY`minutter = 137
timer =
rest =
print(f"{timer} t {rest} min")
`, sol: PY`minutter = 137
timer = minutter // 60
rest = minutter % 60
print(f"{timer} t {rest} min")
`, out: "2 t 17 min", check: PY`assert timer == 2 and rest == 17, f"timer = {timer} og rest = {rest}, men skal være 2 og 17."`,
      hint: ["`137 // 60` gir hele timer, `137 % 60` gir resten.", "`137 // 60` gives whole hours, `137 % 60` the remainder."] },
    { id: "input", t: ["Les inn et tall", "Read a number"],
      p: ["Les inn et tall med `input()`, gjør det om til `float` og skriv ut det dobbelte. Med inndata `4.5` skal utskriften bli `9.0`.", "Read a number with `input()`, convert it to `float` and print twice the value. With input `4.5` the output should be `9.0`."],
      start: PY`tekst = input("Skriv et tall: ")
`, sol: PY`tekst = input("Skriv et tall: ")
x = float(tekst)
print(2 * x)
`, stdin: "4.5", out: "9.0", hint: ["`input()` gir alltid tekst. Bruk `float(tekst)` før du regner.", "`input()` always returns text. Use `float(tekst)` before calculating."] },
  ],
  "MEK1300:1": [
    { id: "sum100", t: ["Summen 1 + 2 + … + 100", "The sum 1 + 2 + … + 100"],
      p: ["Bruk en `for`-løkke til å summere tallene fra 1 til og med 100 i variabelen `total`, og skriv den ut.", "Use a `for` loop to add the numbers 1 to 100 in `total`, and print it."],
      start: PY`total = 0
for i in range(1, 10):
    total = total + i
print(total)
`, sol: PY`total = 0
for i in range(1, 101):
    total += i
print(total)
`, out: "5050", check: PY`assert total == 5050, f"total er {total}. Husk at range(1, 101) stopper før 101."`,
      hint: ["`range(a, b)` tar med `a`, men stopper før `b`.", "`range(a, b)` includes `a` but stops before `b`."] },
    { id: "gange", t: ["Gangetabellen", "Times table"],
      p: ["Skriv ut 7-gangen fra `7 x 1 = 7` til `7 x 10 = 70`, én linje per regnestykke.", "Print the 7 times table from `7 x 1 = 7` to `7 x 10 = 70`, one line each."],
      start: PY`n = 7
`, sol: PY`n = 7
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
`, out: Array.from({ length: 10 }, (_, i) => `7 x ${i + 1} = ${7 * (i + 1)}`).join("\n"), hint: ["Løkke over `range(1, 11)` og `print(f\"{n} x {i} = {n * i}\")`.", "Loop over `range(1, 11)` and `print(f\"{n} x {i} = {n * i}\")`."] },
    { id: "fizz", t: ["FizzBuzz", "FizzBuzz"],
      p: ["Skriv ut tallene 1 til 15, men skriv `Fizz` for tall delelige med 3, `Buzz` for tall delelige med 5 og `FizzBuzz` for tall delelige med begge.", "Print 1 to 15, but `Fizz` for multiples of 3, `Buzz` for multiples of 5 and `FizzBuzz` for multiples of both."],
      start: PY`for i in range(1, 16):
    if i % 3 == 0:
        print("Fizz")
    else:
        print(i)
`, sol: PY`for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
`, out: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", hint: ["Sjekk «delelig med 15» først, ellers fanger `i % 3 == 0` opp 15 før du kommer dit.", "Check \"divisible by 15\" first, or `i % 3 == 0` catches 15 before you get there."] },
    { id: "rente", t: ["Doble pengene", "Double the money"],
      p: ["Du setter inn 10 000 kr til 5 % rente per år. Bruk en `while`-løkke og finn hvor mange år det tar før beløpet er minst 20 000 kr. Lagre svaret i `aar` og skriv det ut.", "You deposit 10 000 at 5 % interest per year. Use a `while` loop to find how many years until it is at least 20 000. Store it in `aar` and print it."],
      start: PY`belop = 10000
aar = 0
while False:  # bytt ut False med riktig betingelse
    belop *= 1.05
    aar += 1
print(aar)
`, sol: PY`belop = 10000
aar = 0
while belop < 20000:
    belop *= 1.05
    aar += 1
print(aar)
`, check: PY`assert aar == 15, f"aar er {aar}, men riktig svar er 15."`, hint: ["I løkka: `belop *= 1.05` og `aar += 1`.", "In the loop: `belop *= 1.05` and `aar += 1`."] },
  ],
  "MEK1300:2": [
    { id: "ctof", t: ["Celsius til Fahrenheit", "Celsius to Fahrenheit"],
      p: ["Lag funksjonen `c_til_f(c)` som returnerer temperaturen i Fahrenheit: $F = \\tfrac95 C + 32$.", "Write `c_til_f(c)` that returns the temperature in Fahrenheit: $F = \\tfrac95 C + 32$."],
      start: PY`def c_til_f(c):
    pass

print(c_til_f(100))
`, sol: PY`def c_til_f(c):
    return 9 / 5 * c + 32

print(c_til_f(100))
`, check: PY`for c, f in [(0, 32), (100, 212), (-40, -40), (37, 98.6)]:
    assert c_til_f(c) is not None, "Funksjonen returnerer ingenting. Har du glemt return?"
    assert abs(c_til_f(c) - f) < 1e-9, f"c_til_f({c}) ga {c_til_f(c)}, men skal være {f}."`, hint: ["Husk `return`; `print` inni funksjonen er ikke nok.", "Remember `return`; `print` inside the function is not enough."] },
    { id: "prim", t: ["Er det et primtall?", "Is it prime?"],
      p: ["Lag `er_primtall(n)` som returnerer `True` hvis `n` er et primtall og ellers `False`.", "Write `er_primtall(n)` that returns `True` if `n` is prime and `False` otherwise."],
      start: PY`def er_primtall(n):
    return False
`, sol: PY`def er_primtall(n):
    if n < 2:
        return False
    for d in range(2, int(n**0.5) + 1):
        if n % d == 0:
            return False
    return True
`, check: PY`P = [2, 3, 5, 7, 11, 13, 97, 7919]
for n in range(-3, 100):
    assert er_primtall(n) == (n in P or (n > 1 and all(n % d for d in range(2, n)))), f"er_primtall({n}) ga {er_primtall(n)}."
assert er_primtall(7919) is True, "7919 er et primtall."`, hint: ["Tall under 2 er ikke primtall. Prøv alle delere fra 2 opp til √n.", "Numbers below 2 are not prime. Try divisors from 2 up to √n."] },
    { id: "snitt", t: ["Gjennomsnitt og maks", "Mean and max"],
      p: ["Lag `statistikk(liste)` som returnerer en tuple `(gjennomsnitt, størst)` – uten å bruke `max()` eller `sum()`.", "Write `statistikk(liste)` returning a tuple `(mean, largest)` – without `max()` or `sum()`."],
      start: PY`def statistikk(liste):
    total = 0
    storst = liste[0]
    for x in liste:
        pass
    return total / len(liste), storst

print(statistikk([4, 8, 15, 16, 23, 42]))
`, sol: PY`def statistikk(liste):
    total = 0
    storst = liste[0]
    for x in liste:
        total += x
        if x > storst:
            storst = x
    return total / len(liste), storst

print(statistikk([4, 8, 15, 16, 23, 42]))
`, check: PY`for L in [[4, 8, 15, 16, 23, 42], [-5, -2, -9], [3.5]]:
    m, s = statistikk(L)
    assert abs(m - sum(L) / len(L)) < 1e-9 and s == max(L), f"statistikk({L}) ga {(m, s)}."`, hint: ["Legg til `x` i `total`, og oppdater `storst` når `x > storst`.", "Add `x` to `total`, and update `storst` when `x > storst`."] },
    { id: "ordbok", t: ["Tell bokstaver", "Count letters"],
      p: ["Lag `tell(tekst)` som returnerer en ordbok (`dict`) med hvor mange ganger hver bokstav forekommer. Mellomrom skal ikke telles.", "Write `tell(tekst)` returning a `dict` with how many times each letter occurs. Spaces are not counted."],
      start: PY`def tell(tekst):
    antall = {}
    return antall

print(tell("hei hei"))
`, sol: PY`def tell(tekst):
    antall = {}
    for b in tekst:
        if b != " ":
            antall[b] = antall.get(b, 0) + 1
    return antall

print(tell("hei hei"))
`, check: PY`assert tell("hei hei") == {"h": 2, "e": 2, "i": 2}, f"tell('hei hei') ga {tell('hei hei')}."
assert tell("aab a") == {"a": 3, "b": 1}, "Sjekk at mellomrom hoppes over."`, hint: ["`antall.get(b, 0) + 1` gir 1 første gang og teller opp etterpå.", "`antall.get(b, 0) + 1` gives 1 the first time and counts up after."] },
    { id: "plot", t: ["Tegn en graf", "Plot a graph"],
      p: ["Lag listene `x` (fra 0 til 2π i 50 steg) og `y = sin(x)`, og tegn grafen med `plt.plot(x, y)`. Grafen vises under koden.", "Make lists `x` (0 to 2π in 50 steps) and `y = sin(x)`, and draw it with `plt.plot(x, y)`. The graph appears below the code."],
      start: PY`import math
import matplotlib.pyplot as plt

x = [2 * math.pi * i / 49 for i in range(50)]
y = []
plt.plot(x, y)
plt.title("sin(x)")
plt.show()
`, sol: PY`import math
import matplotlib.pyplot as plt

x = [2 * math.pi * i / 49 for i in range(50)]
y = [math.sin(v) for v in x]
plt.plot(x, y)
plt.title("sin(x)")
plt.show()
`, check: PY`assert len(y) == 50, "y skal ha like mange verdier som x (50)."
assert all(abs(a - math.sin(b)) < 1e-9 for a, b in zip(y, x)), "y skal være sin(x) for hver x."
assert _axle_plots, "Tegn grafen med plt.plot(x, y)."`, hint: ["`y = [math.sin(v) for v in x]` lager lista på én linje.", "`y = [math.sin(v) for v in x]` builds the list in one line."] },
  ],
  "MEK1300:3": [
    { id: "deling", t: ["Trygg deling", "Safe division"],
      p: ["Lag `trygg_deling(a, b)` som returnerer `a / b`, men `None` hvis `b` er 0. Bruk `try`/`except ZeroDivisionError`.", "Write `trygg_deling(a, b)` returning `a / b`, but `None` if `b` is 0. Use `try`/`except ZeroDivisionError`."],
      start: PY`def trygg_deling(a, b):
    return a / b

print(trygg_deling(1, 0))
`, sol: PY`def trygg_deling(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(trygg_deling(1, 0))
`, check: PY`assert trygg_deling(6, 3) == 2, "6 / 3 skal gi 2."
assert trygg_deling(1, 0) is None, "Deling på 0 skal gi None."`, hint: ["Legg `return a / b` inni `try:` og `return None` i `except ZeroDivisionError:`.", "Put `return a / b` in `try:` and `return None` in `except ZeroDivisionError:`."] },
    { id: "csv", t: ["Les måledata", "Read measurements"],
      p: ["Måledata kommer som tekst: `\"3.2;4.1; 5.0;x;2.7\"`. Lag `snitt(tekst)` som deler opp på `;`, hopper over verdier som ikke er tall, og returnerer gjennomsnittet.", "Measurements arrive as text: `\"3.2;4.1; 5.0;x;2.7\"`. Write `snitt(tekst)` that splits on `;`, skips values that are not numbers and returns the mean."],
      start: PY`def snitt(tekst):
    deler = tekst.split(";")
    tall = []
    return sum(tall) / len(tall)

print(snitt("3.2;4.1; 5.0;x;2.7"))
`, sol: PY`def snitt(tekst):
    deler = tekst.split(";")
    tall = []
    for d in deler:
        try:
            tall.append(float(d))
        except ValueError:
            pass
    return sum(tall) / len(tall)

print(snitt("3.2;4.1; 5.0;x;2.7"))
`, check: PY`assert abs(snitt("3.2;4.1; 5.0;x;2.7") - 3.75) < 1e-9, "Gjennomsnittet av 3.2, 4.1, 5.0 og 2.7 er 3.75."
assert abs(snitt("1;;2;abc;3") - 2) < 1e-9, "Tomme felt og tekst skal hoppes over."`, hint: ["`float(\" 5.0\")` tåler mellomrom, men `float(\"x\")` gir `ValueError`. Fang den med `try`/`except`.", "`float(\" 5.0\")` handles spaces, but `float(\"x\")` raises `ValueError`. Catch it with `try`/`except`."] },
  ],
  "MEK3100:0": [
    { id: "vektor", t: ["Klassen Vektor", "The Vektor class"],
      p: ["Lag klassen `Vektor` med `x` og `y`, metoden `lengde()` og `__add__` slik at `Vektor(1, 2) + Vektor(3, 4)` gir `Vektor(4, 6)`.", "Write a `Vektor` class with `x` and `y`, a `lengde()` method and `__add__` so `Vektor(1, 2) + Vektor(3, 4)` gives `Vektor(4, 6)`."],
      start: PY`import math

class Vektor:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def lengde(self):
        pass

    def __add__(self, annen):
        pass

    def __repr__(self):
        return f"Vektor({self.x}, {self.y})"

print(Vektor(1, 2) + Vektor(3, 4))
`, sol: PY`import math

class Vektor:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def lengde(self):
        return math.hypot(self.x, self.y)

    def __add__(self, annen):
        return Vektor(self.x + annen.x, self.y + annen.y)

    def __repr__(self):
        return f"Vektor({self.x}, {self.y})"

print(Vektor(1, 2) + Vektor(3, 4))
`, check: PY`v = Vektor(3, 4)
assert v.lengde() == 5, f"Vektor(3, 4).lengde() ga {v.lengde()}, men skal være 5."
s = Vektor(1, 2) + Vektor(3, 4)
assert isinstance(s, Vektor) and (s.x, s.y) == (4, 6), "Summen skal være en ny Vektor(4, 6)."`, hint: ["`__add__` skal returnere en ny `Vektor(self.x + annen.x, self.y + annen.y)`.", "`__add__` should return a new `Vektor(self.x + annen.x, self.y + annen.y)`."] },
    { id: "konto", t: ["Bankkonto med unntak", "Bank account with exceptions"],
      p: ["Fullfør `Konto`: `innskudd(belop)` øker saldoen, og `uttak(belop)` trekker fra, men kaster `ValueError` hvis det ikke er dekning.", "Finish `Konto`: `innskudd(belop)` adds to the balance, and `uttak(belop)` withdraws but raises `ValueError` if funds are insufficient."],
      start: PY`class Konto:
    def __init__(self):
        self.saldo = 0

    def innskudd(self, belop):
        pass

    def uttak(self, belop):
        pass
`, sol: PY`class Konto:
    def __init__(self):
        self.saldo = 0

    def innskudd(self, belop):
        self.saldo += belop

    def uttak(self, belop):
        if belop > self.saldo:
            raise ValueError("Ikke dekning")
        self.saldo -= belop
`, check: PY`k = Konto(); k.innskudd(500); k.uttak(200)
assert k.saldo == 300, f"Saldoen ble {k.saldo}, men skal være 300."
try:
    k.uttak(1000)
    assert False, "uttak(1000) skulle kastet ValueError."
except ValueError:
    pass
assert k.saldo == 300, "Et uttak som feiler, skal ikke endre saldoen."`, hint: ["`raise ValueError(\"Ikke dekning\")` når `belop > self.saldo`.", "`raise ValueError(\"Ikke dekning\")` when `belop > self.saldo`."] },
  ],
  "MEK3100:1": [
    { id: "binsok", t: ["Binærsøk", "Binary search"],
      p: ["Lag `binsok(liste, x)` som returnerer indeksen til `x` i en sortert liste, eller `-1`. Halver søkeområdet hver gang.", "Write `binsok(liste, x)` returning the index of `x` in a sorted list, or `-1`. Halve the search range each time."],
      start: PY`def binsok(liste, x):
    lo, hi = 0, len(liste) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        break
    return -1
`, sol: PY`def binsok(liste, x):
    lo, hi = 0, len(liste) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if liste[mid] == x:
            return mid
        if liste[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`, check: PY`L = list(range(0, 200, 3))
for i, v in enumerate(L):
    assert binsok(L, v) == i, f"binsok fant ikke {v} (skal gi {i})."
for v in (-1, 1, 200):
    assert binsok(L, v) == -1, f"binsok(L, {v}) skal gi -1."
assert binsok([], 5) == -1, "Tom liste skal gi -1."`, hint: ["Er `liste[mid] < x`, ligger svaret til høyre: `lo = mid + 1`. Ellers `hi = mid - 1`.", "If `liste[mid] < x` the answer is to the right: `lo = mid + 1`. Otherwise `hi = mid - 1`."] },
    { id: "rekursjon", t: ["Rekursiv fakultet", "Recursive factorial"],
      p: ["Lag `fak(n)` som regner ut $n!$ rekursivt (funksjonen kaller seg selv). $0! = 1$.", "Write `fak(n)` computing $n!$ recursively (the function calls itself). $0! = 1$."],
      start: PY`def fak(n):
    pass
`, sol: PY`def fak(n):
    if n == 0:
        return 1
    return n * fak(n - 1)
`, check: PY`import math
for n in range(0, 15):
    assert fak(n) == math.factorial(n), f"fak({n}) ga {fak(n)}."`, hint: ["Basistilfellet er `n == 0`. Ellers `return n * fak(n - 1)`.", "The base case is `n == 0`. Otherwise `return n * fak(n - 1)`."] },
  ],
  "NUM:0": [
    { id: "newton", t: ["Newtons metode", "Newton's method"],
      p: ["Finn roten til $f(x) = x^2 - 2$ med Newtons metode fra $x_0 = 1$: $x_{n+1} = x_n - \\tfrac{f(x_n)}{f'(x_n)}$. Stopp når endringen er under $10^{-10}$, og lagre svaret i `rot`.", "Find the root of $f(x) = x^2 - 2$ with Newton's method from $x_0 = 1$. Stop when the change is below $10^{-10}$, and store it in `rot`."],
      start: PY`def f(x):
    return x**2 - 2

def df(x):
    return 2 * x

x = 1.0
while True:
    x_ny = x  # bytt ut med Newton-steget
    if abs(x_ny - x) < 1e-10:
        break
    x = x_ny
rot = x
print(rot)
`, sol: PY`def f(x):
    return x**2 - 2

def df(x):
    return 2 * x

x = 1.0
while True:
    x_ny = x - f(x) / df(x)
    if abs(x_ny - x) < 1e-10:
        break
    x = x_ny
rot = x_ny
print(rot)
`, check: PY`assert abs(rot - 2**0.5) < 1e-9, f"rot er {rot}, men skal være √2 ≈ 1.41421356."`, hint: ["Newton-steget: `x_ny = x - f(x) / df(x)`.", "The Newton step: `x_ny = x - f(x) / df(x)`."] },
  ],
  "NUM:1": [
    { id: "trapes", t: ["Trapesmetoden", "The trapezoidal rule"],
      p: ["Lag `trapes(f, a, b, n)` som tilnærmer $\\int_a^b f(x)\\,dx$ med $n$ trapeser. Test med $\\int_0^\\pi \\sin x\\,dx = 2$.", "Write `trapes(f, a, b, n)` approximating $\\int_a^b f(x)\\,dx$ with $n$ trapezoids. Test with $\\int_0^\\pi \\sin x\\,dx = 2$."],
      start: PY`import math

def trapes(f, a, b, n):
    h = (b - a) / n
    s = 0
    return s

print(trapes(math.sin, 0, math.pi, 100))
`, sol: PY`import math

def trapes(f, a, b, n):
    h = (b - a) / n
    s = (f(a) + f(b)) / 2
    for i in range(1, n):
        s += f(a + i * h)
    return s * h

print(trapes(math.sin, 0, math.pi, 100))
`, check: PY`assert abs(trapes(math.sin, 0, math.pi, 100) - 2) < 1e-3, "Med n = 100 skal svaret være nær 2."
assert abs(trapes(lambda x: x**2, 0, 3, 1000) - 9) < 1e-4, "Integralet av x² fra 0 til 3 skal bli 9."`, hint: ["$T = h\\left(\\tfrac{f(a) + f(b)}{2} + \\sum_{i=1}^{n-1} f(a + ih)\\right)$", "$T = h\\left(\\tfrac{f(a) + f(b)}{2} + \\sum_{i=1}^{n-1} f(a + ih)\\right)$"] },
  ],
  "NUM:2": [
    { id: "euler", t: ["Eulers metode med graf", "Euler's method with a graph"],
      p: ["Løs $y' = -2y$, $y(0) = 1$ fra $t = 0$ til $t = 2$ med Eulers metode og steglengde $h = 0{,}1$. Lagre verdiene i listene `t` og `y`, og tegn både løsningen og den eksakte $e^{-2t}$.", "Solve $y' = -2y$, $y(0) = 1$ from $t = 0$ to $t = 2$ with Euler's method and step $h = 0.1$. Store values in `t` and `y`, and plot both the solution and the exact $e^{-2t}$."],
      start: PY`import math
import matplotlib.pyplot as plt

h = 0.1
t = [0.0]
y = [1.0]
for i in range(20):
    pass  # legg til neste t og y

plt.plot(t, y, label="Euler")
plt.plot(t, [math.exp(-2 * s) for s in t], label="Eksakt")
plt.show()
`, sol: PY`import math
import matplotlib.pyplot as plt

h = 0.1
t = [0.0]
y = [1.0]
for i in range(20):
    y.append(y[-1] + h * (-2 * y[-1]))
    t.append(t[-1] + h)

plt.plot(t, y, label="Euler")
plt.plot(t, [math.exp(-2 * s) for s in t], label="Eksakt")
plt.show()
`, check: PY`assert len(t) == 21 and len(y) == 21, "Det skal være 21 punkter (t = 0, 0.1, …, 2)."
assert abs(y[-1] - 0.8**20) < 1e-9, f"y(2) ble {y[-1]}, men Euler gir 0.8^20 ≈ {0.8**20:.6f}."
assert len(_axle_plots) >= 1, "Tegn grafen med plt.plot."`, hint: ["Euler-steget: `y_ny = y + h * f(t, y)`, her `f = -2 * y`.", "The Euler step: `y_new = y + h * f(t, y)`, here `f = -2 * y`."] },
  ],
};
// ---------- flere oppgaver (lagt til i eget steg, så rekkefølgen i enhetene over står fast) ----------
const CODE_MORE = {
  "MEK1300:0": [
    { id: "initialer", t: ["Initialer", "Initials"],
      p: ["Lag initialene til navnet i `navn` og skriv dem ut med punktum, for eksempel `O.N.` for `\"Ola Nordmann\"`. Bruk `split()` og indeksering.", "Make the initials of the name in `navn` and print them with full stops, e.g. `O.N.` for `\"Ola Nordmann\"`. Use `split()` and indexing."],
      start: PY`navn = "Ola Nordmann"
deler = navn.split()
print(deler)
`, sol: PY`navn = "Ola Nordmann"
deler = navn.split()
print(deler[0][0] + "." + deler[1][0] + ".")
`, out: "O.N.", hint: ["`deler[0][0]` er første bokstav i første ord.", "`deler[0][0]` is the first letter of the first word."] },
  ],
  "MEK1300:1": [
    { id: "gyldig", t: ["Gyldig inndata", "Valid input"],
      p: ["Les inn tall med `input()` til brukeren skriver et positivt heltall. Hopp over tekst som ikke er tall og tall som ikke er positive. Skriv så ut `Takk: 5` (med tallet). Inndataene er `-3`, `abc` og `5`.", "Read numbers with `input()` until the user types a positive integer. Skip text that is not a number and numbers that are not positive. Then print `Takk: 5` (with the number). The input is `-3`, `abc` and `5`."],
      start: PY`tall = int(input())
print("Takk:", tall)
`, sol: PY`while True:
    tekst = input()
    try:
        tall = int(tekst)
    except ValueError:
        continue
    if tall > 0:
        break
print("Takk:", tall)
`, stdin: "-3\nabc\n5", out: "Takk: 5", hint: ["Bruk `while True:` med `try`/`except ValueError` og `break` når tallet er gyldig.", "Use `while True:` with `try`/`except ValueError` and `break` when the number is valid."] },
  ],
  "MEK1300:2": [
    { id: "topp3", t: ["De tre største", "The three largest"],
      p: ["Lag `topp3(liste)` som returnerer de tre største tallene i synkende rekkefølge. Lista skal ikke endres.", "Write `topp3(liste)` returning the three largest numbers in descending order. The list must not be changed."],
      start: PY`def topp3(liste):
    return liste[:3]

print(topp3([4, 19, 7, 25, 3, 11]))
`, sol: PY`def topp3(liste):
    return sorted(liste, reverse=True)[:3]

print(topp3([4, 19, 7, 25, 3, 11]))
`, check: PY`L = [4, 19, 7, 25, 3, 11]
assert topp3(L) == [25, 19, 11], f"topp3 ga {topp3(L)}, men skal gi [25, 19, 11]."
assert L == [4, 19, 7, 25, 3, 11], "Lista som ble sendt inn, skal ikke endres. Bruk sorted() i stedet for sort()."
assert topp3([5, 5, 1, 9]) == [9, 5, 5], "Like tall skal være med begge gangene."`, hint: ["`sorted(liste, reverse=True)` lager en ny sortert liste.", "`sorted(liste, reverse=True)` makes a new sorted list."] },
  ],
  "MEK3100:0": [
    { id: "arv", t: ["Arv: former og areal", "Inheritance: shapes and area"],
      p: ["Lag klassene `Sirkel(r)` og `Rektangel(b, h)` som arver fra `Form` og har metoden `areal()`. Fullfør så `total_areal(former)`.", "Create `Sirkel(r)` and `Rektangel(b, h)` that inherit from `Form` and have an `areal()` method. Then finish `total_areal(former)`."],
      start: PY`import math

class Form:
    def areal(self):
        raise NotImplementedError

class Sirkel(Form):
    def __init__(self, r):
        self.r = r

class Rektangel(Form):
    def __init__(self, b, h):
        self.b = b
        self.h = h

def total_areal(former):
    return 0
`, sol: PY`import math

class Form:
    def areal(self):
        raise NotImplementedError

class Sirkel(Form):
    def __init__(self, r):
        self.r = r
    def areal(self):
        return math.pi * self.r ** 2

class Rektangel(Form):
    def __init__(self, b, h):
        self.b = b
        self.h = h
    def areal(self):
        return self.b * self.h

def total_areal(former):
    return sum(f.areal() for f in former)
`, check: PY`assert isinstance(Sirkel(1), Form) and isinstance(Rektangel(1, 2), Form), "Klassene skal arve fra Form."
assert abs(Sirkel(2).areal() - 4 * math.pi) < 1e-9, "Sirkel(2).areal() skal være 4π."
assert Rektangel(3, 4).areal() == 12, "Rektangel(3, 4).areal() skal være 12."
assert abs(total_areal([Sirkel(1), Rektangel(2, 5)]) - (math.pi + 10)) < 1e-9, "total_areal skal summere arealene."`, hint: ["Hver underklasse får sin egen `def areal(self):`. `total_areal` kan bruke `sum(f.areal() for f in former)`.", "Each subclass gets its own `def areal(self):`. `total_areal` can use `sum(f.areal() for f in former)`."] },
  ],
  "MEK3100:1": [
    { id: "stakk", t: ["Balanserte parenteser", "Balanced brackets"],
      p: ["Lag `balansert(tekst)` som returnerer `True` hvis alle parenteser `()`, `[]` og `{}` er riktig lukket. Bruk en liste som stakk.", "Write `balansert(tekst)` returning `True` if all brackets `()`, `[]` and `{}` are properly closed. Use a list as a stack."],
      start: PY`def balansert(tekst):
    return tekst.count("(") == tekst.count(")")
`, sol: PY`def balansert(tekst):
    par = {")": "(", "]": "[", "}": "{"}
    stakk = []
    for t in tekst:
        if t in "([{":
            stakk.append(t)
        elif t in par:
            if not stakk or stakk.pop() != par[t]:
                return False
    return not stakk
`, check: PY`for s, ok in [("(a[b]{c})", True), ("([)]", False), ("((", False), ("", True), ("x)(", False), ("{[()()]}", True)]:
    assert balansert(s) == ok, f"balansert({s!r}) ga {balansert(s)}, men skal gi {ok}."`, hint: ["Legg åpne parenteser på stakken. Ved en lukkende må toppen av stakken være den matchende åpne.", "Push opening brackets. At a closing one, the top of the stack must be the matching opener."] },
  ],
  "MEK3100:2": [
    { id: "matmul", t: ["Matrisemultiplikasjon", "Matrix multiplication"],
      p: ["Lag `matmul(A, B)` som multipliserer to matriser lagret som lister av rader, uten NumPy: $C_{ij} = \\sum_k A_{ik} B_{kj}$.", "Write `matmul(A, B)` multiplying two matrices stored as lists of rows, without NumPy: $C_{ij} = \\sum_k A_{ik} B_{kj}$."],
      start: PY`def matmul(A, B):
    n, m, p = len(A), len(B), len(B[0])
    C = [[0] * p for _ in range(n)]
    return C
`, sol: PY`def matmul(A, B):
    n, m, p = len(A), len(B), len(B[0])
    C = [[0] * p for _ in range(n)]
    for i in range(n):
        for j in range(p):
            for k in range(m):
                C[i][j] += A[i][k] * B[k][j]
    return C
`, check: PY`assert matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]]) == [[19, 22], [43, 50]], "2×2-eksempelet skal gi [[19, 22], [43, 50]]."
assert matmul([[1, 2, 3]], [[1], [0], [2]]) == [[7]], "En 1×3 ganger 3×1 skal gi [[7]]."`, hint: ["Tre løkker: rad `i`, kolonne `j` og summen over `k`.", "Three loops: row `i`, column `j` and the sum over `k`."] },
  ],
  "NUM:0": [
    { id: "halvering", t: ["Halveringsmetoden", "The bisection method"],
      p: ["Finn roten til $f(x) = x^3 - x - 2$ i $[1, 2]$ med halveringsmetoden. Halver intervallet til det er kortere enn $10^{-8}$, og lagre midtpunktet i `rot`.", "Find the root of $f(x) = x^3 - x - 2$ in $[1, 2]$ by bisection. Halve the interval until it is shorter than $10^{-8}$, and store the midpoint in `rot`."],
      start: PY`def f(x):
    return x**3 - x - 2

a, b = 1.0, 2.0
while b - a > 1e-8:
    m = (a + b) / 2
    a = m  # velg riktig halvdel
rot = (a + b) / 2
print(rot)
`, sol: PY`def f(x):
    return x**3 - x - 2

a, b = 1.0, 2.0
while b - a > 1e-8:
    m = (a + b) / 2
    if f(a) * f(m) <= 0:
        b = m
    else:
        a = m
rot = (a + b) / 2
print(rot)
`, check: PY`assert abs(rot - 1.5213797068) < 1e-7, f"rot er {rot}, men roten er ≈ 1.52138."`, hint: ["Har `f(a)` og `f(m)` ulikt fortegn, ligger roten i `[a, m]`, ellers i `[m, b]`.", "If `f(a)` and `f(m)` have opposite signs, the root is in `[a, m]`, otherwise in `[m, b]`."] },
  ],
  "NUM:1": [
    { id: "derivert", t: ["Numerisk derivasjon", "Numerical derivative"],
      p: ["Lag `deriv(f, x, h=1e-5)` med sentraldifferanse: $f'(x) \\approx \\tfrac{f(x+h) - f(x-h)}{2h}$.", "Write `deriv(f, x, h=1e-5)` using the central difference: $f'(x) \\approx \\tfrac{f(x+h) - f(x-h)}{2h}$."],
      start: PY`import math

def deriv(f, x, h=1e-5):
    return (f(x + h) - f(x)) / h

print(deriv(math.sin, 0))
`, sol: PY`import math

def deriv(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)

print(deriv(math.sin, 0))
`, check: PY`for x in (0, 0.5, 1, 2):
    assert abs(deriv(math.sin, x) - math.cos(x)) < 1e-9, f"deriv(sin, {x}) skal være cos({x})."
assert abs(deriv(lambda t: t**3, 2, 0.1) - 12.01) < 1e-9, "Med h = 0.1 gir sentraldifferansen 12.01 for t³ i 2."`, hint: ["Bruk både `f(x + h)` og `f(x - h)`, og del på `2 * h`.", "Use both `f(x + h)` and `f(x - h)`, and divide by `2 * h`."] },
  ],
  "ML:0": [
    { id: "stdavvik", t: ["Standardavvik", "Standard deviation"],
      p: ["Lag `standardavvik(data)` som regner ut utvalgsstandardavviket: $s = \\sqrt{\\tfrac{1}{n-1}\\sum (x_i - \\bar x)^2}$, uten `statistics`-modulen.", "Write `standardavvik(data)` computing the sample standard deviation: $s = \\sqrt{\\tfrac{1}{n-1}\\sum (x_i - \\bar x)^2}$, without the `statistics` module."],
      start: PY`import math

def standardavvik(data):
    snitt = sum(data) / len(data)
    return 0

print(standardavvik([2, 4, 4, 4, 5, 5, 7, 9]))
`, sol: PY`import math

def standardavvik(data):
    snitt = sum(data) / len(data)
    return math.sqrt(sum((x - snitt) ** 2 for x in data) / (len(data) - 1))

print(standardavvik([2, 4, 4, 4, 5, 5, 7, 9]))
`, check: PY`import statistics
for d in ([2, 4, 4, 4, 5, 5, 7, 9], [1.5, 2.5], [10, 12, 23, 23, 16, 23, 21, 16]):
    assert abs(standardavvik(d) - statistics.stdev(d)) < 1e-9, f"standardavvik({d}) skal være {statistics.stdev(d):.4f}. Del på n − 1."`, hint: ["Summer `(x - snitt) ** 2`, del på `len(data) - 1` og ta kvadratroten.", "Sum `(x - snitt) ** 2`, divide by `len(data) - 1` and take the square root."] },
  ],
  "ML:1": [
    { id: "linfit", t: ["Lineær regresjon med graf", "Linear regression with a graph"],
      p: ["Lag `linfit(x, y)` som returnerer `(a, b)` for linjen $y = ax + b$ med minste kvadraters metode: $a = \\tfrac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sum (x_i-\\bar x)^2}$, $b = \\bar y - a\\bar x$. Tegn punktene og linjen.", "Write `linfit(x, y)` returning `(a, b)` for the line $y = ax + b$ by least squares: $a = \\tfrac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sum (x_i-\\bar x)^2}$, $b = \\bar y - a\\bar x$. Plot the points and the line."],
      start: PY`import matplotlib.pyplot as plt

def linfit(x, y):
    xm = sum(x) / len(x)
    ym = sum(y) / len(y)
    a = 0
    b = ym
    return a, b

x = [1, 2, 3, 4, 5, 6]
y = [2.1, 3.9, 6.2, 7.8, 10.1, 12.2]
a, b = linfit(x, y)
plt.scatter(x, y, label="Målinger")
plt.plot(x, [a * v + b for v in x], label="Linje")
plt.show()
`, sol: PY`import matplotlib.pyplot as plt

def linfit(x, y):
    xm = sum(x) / len(x)
    ym = sum(y) / len(y)
    a = sum((xi - xm) * (yi - ym) for xi, yi in zip(x, y)) / sum((xi - xm) ** 2 for xi in x)
    b = ym - a * xm
    return a, b

x = [1, 2, 3, 4, 5, 6]
y = [2.1, 3.9, 6.2, 7.8, 10.1, 12.2]
a, b = linfit(x, y)
plt.scatter(x, y, label="Målinger")
plt.plot(x, [a * v + b for v in x], label="Linje")
plt.show()
`, check: PY`a2, b2 = linfit([0, 1, 2], [1, 3, 5])
assert abs(a2 - 2) < 1e-9 and abs(b2 - 1) < 1e-9, f"linfit([0,1,2], [1,3,5]) skal gi (2, 1), men ga {(a2, b2)}."
a3, b3 = linfit(x, y)
assert abs(a3 - 2.02) < 1e-6 and abs(b3 + 0.02) < 1e-6, f"For målingene skal a ≈ 2.02 og b ≈ −0.02, men du fikk {(a3, b3)}."
assert len(_axle_plots) >= 2, "Tegn både punktene (scatter) og linjen (plot)."`, hint: ["Bruk `zip(x, y)` for å gå gjennom parene samtidig.", "Use `zip(x, y)` to loop over the pairs together."] },
  ],
  "ML:2": [
    { id: "presisjon", t: ["Nøyaktighet og presisjon", "Accuracy and precision"],
      p: ["Lag `evaluer(fasit, pred)` for binær klassifisering (0/1). Den skal returnere `(nøyaktighet, presisjon)`, der presisjon er andelen riktige blant dem modellen sa var 1.", "Write `evaluer(fasit, pred)` for binary classification (0/1). Return `(accuracy, precision)`, where precision is the share of correct ones among those the model predicted as 1."],
      start: PY`def evaluer(fasit, pred):
    riktige = 0
    return riktige / len(fasit), 0

print(evaluer([1, 0, 1, 1, 0, 0], [1, 0, 0, 1, 1, 0]))
`, sol: PY`def evaluer(fasit, pred):
    riktige = sum(1 for f, p in zip(fasit, pred) if f == p)
    tp = sum(1 for f, p in zip(fasit, pred) if f == 1 and p == 1)
    fp = sum(1 for f, p in zip(fasit, pred) if f == 0 and p == 1)
    presisjon = tp / (tp + fp) if tp + fp else 0
    return riktige / len(fasit), presisjon

print(evaluer([1, 0, 1, 1, 0, 0], [1, 0, 0, 1, 1, 0]))
`, check: PY`n, p = evaluer([1, 0, 1, 1, 0, 0], [1, 0, 0, 1, 1, 0])
assert abs(n - 4 / 6) < 1e-9, f"Nøyaktigheten skal være 4/6, men ble {n}."
assert abs(p - 2 / 3) < 1e-9, f"Presisjonen skal være 2/3 (2 sanne positive, 1 falsk positiv), men ble {p}."
assert evaluer([0, 0], [0, 0]) == (1.0, 0), "Uten positive prediksjoner skal presisjonen være 0 (unngå deling på null)."`, hint: ["Tell sanne positive (fasit 1, pred 1) og falske positive (fasit 0, pred 1).", "Count true positives (truth 1, pred 1) and false positives (truth 0, pred 1)."] },
  ],
  "DISK:0": [
    { id: "sannhet", t: ["Sannhetstabell", "Truth table"],
      p: ["Skriv ut sannhetstabellen for $p \\land \\lnot q$: én linje per kombinasjon med `p`, `q` og resultatet, for eksempel `True False True`. Start med `p = True, q = True`.", "Print the truth table for $p \\land \\lnot q$: one line per combination with `p`, `q` and the result, e.g. `True False True`. Start with `p = True, q = True`."],
      start: PY`for p in [True, False]:
    print(p)
`, sol: PY`for p in [True, False]:
    for q in [True, False]:
        print(p, q, p and not q)
`, out: "True True False\nTrue False True\nFalse True False\nFalse False False", hint: ["To nøstede løkker over `[True, False]`, og `print(p, q, p and not q)`.", "Two nested loops over `[True, False]`, and `print(p, q, p and not q)`."] },
  ],
  "DISK:1": [
    { id: "binom", t: ["Binomialkoeffisient", "Binomial coefficient"],
      p: ["Lag `binom(n, k)` som regner ut $\\binom{n}{k}$ uten `math.comb`, for eksempel med Pascals trekant: $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.", "Write `binom(n, k)` computing $\\binom{n}{k}$ without `math.comb`, e.g. with Pascal's triangle: $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$."],
      start: PY`def binom(n, k):
    return n * k
`, sol: PY`def binom(n, k):
    rad = [1]
    for _ in range(n):
        rad = [1] + [rad[i] + rad[i + 1] for i in range(len(rad) - 1)] + [1]
    return rad[k] if 0 <= k <= n else 0
`, check: PY`import math
for n in range(0, 25):
    for k in range(0, n + 1):
        assert binom(n, k) == math.comb(n, k), f"binom({n}, {k}) ga {binom(n, k)}, men skal være {math.comb(n, k)}."`, hint: ["Bygg rad for rad i Pascals trekant, eller bruk $n!/(k!(n-k)!)$ med heltallsdivisjon.", "Build Pascal's triangle row by row, or use $n!/(k!(n-k)!)$ with integer division."] },
  ],
  "DISK:2": [
    { id: "euklid", t: ["Euklids algoritme", "Euclid's algorithm"],
      p: ["Lag `sfd(a, b)` som finner største felles divisor med Euklids algoritme: erstatt $(a, b)$ med $(b, a \\bmod b)$ til $b = 0$.", "Write `sfd(a, b)` finding the greatest common divisor with Euclid's algorithm: replace $(a, b)$ with $(b, a \\bmod b)$ until $b = 0$."],
      start: PY`def sfd(a, b):
    return min(a, b)
`, sol: PY`def sfd(a, b):
    while b:
        a, b = b, a % b
    return a
`, check: PY`import math
for a, b in [(48, 18), (17, 5), (100, 75), (7, 0), (0, 9), (1071, 462)]:
    assert sfd(a, b) == math.gcd(a, b), f"sfd({a}, {b}) ga {sfd(a, b)}, men skal være {math.gcd(a, b)}."`, hint: ["`while b: a, b = b, a % b`, og returner `a`.", "`while b: a, b = b, a % b`, then return `a`."] },
  ],
};
for(const k of Object.keys(CODE_MORE)) (CODE_TASKS[k] ||= []).push(...CODE_MORE[k]);
