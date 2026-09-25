// ============================================================
//  add_courses2.js – nye fag etter norske ingeniørstudieplaner:
//  DBNET Databaser, nettverk og IKT-sikkerhet, ELKR Elkraft og elektriske maskiner.
// ============================================================
(() => {
const md = s => s.raw[0].replace(/´/g, "`");
const S = String.raw;
const CB = s => "```\n" + s + "\n```";
const SQ3 = Math.sqrt(3);

NEWCOURSE({ code: "DBNET", group: "Programmering og data", nb: "Databaser, nettverk og sikkerhet", en: "Databases, Networks and Security", s: ["DN", "DN"],
  eqText: { nb: "Data-ingeniør: SQL, IP-nettverk og IKT-sikkerhet", en: "Computer engineering: SQL, IP networks and cyber security" },
  units: [["Relasjonsdatabaser og SQL", "Relational databases and SQL"], ["IP-nettverk og subnetting", "IP networks and subnetting"], ["IKT-sikkerhet", "Cyber security"]] });
NEWCOURSE({ code: "ELKR", group: "Elektro og automasjon", nb: "Elkraft og elektriske maskiner", en: "Electric Power and Machines", s: ["EK", "EP"],
  eqText: { nb: "Elkraft: transformatorer, motorer og kraftsystemet", en: "Electric power: transformers, motors and the power system" },
  units: [["Transformatoren", "The transformer"], ["Elektriske motorer", "Electric motors"], ["Kraftsystemet og energi", "The power system and energy"]] });
Object.assign(PREREQ, { DBNET: { need: ["MEK1300"], nice: ["DISK"] }, ELKR: { need: ["ELPE1300"], nice: ["MEK1400"] } });

// ================= DBNET 0: SQL =================
THEORY("DBNET", 0, {
nb: md`## Hva handler det om?
Nesten alle apper lagrer dataene sine i en database: brukere, bestillinger, målinger. En **relasjonsdatabase** lagrer data i tabeller, og du henter ut akkurat det du trenger med spørrespråket **SQL**.

## Begreper og formler
- En **tabell** har kolonner (felt) og rader (poster).
- **Primærnøkkel:** en kolonne som identifiserer hver rad unikt, for eksempel ´student_id´.
- **Fremmednøkkel:** en kolonne som peker til primærnøkkelen i en annen tabell. Slik kobles tabeller sammen.
- Grunnformen i SQL:
´´´
SELECT kolonner FROM tabell WHERE betingelse ORDER BY kolonne;
´´´
- **Aggregatfunksjoner:** ´COUNT(*)´, ´SUM(x)´, ´AVG(x)´, ´MIN(x)´, ´MAX(x)´. Med ´GROUP BY´ regnes de per gruppe.
- **JOIN** setter sammen rader fra to tabeller der nøklene passer:
´´´
SELECT s.navn, e.emne FROM Student s JOIN Eksamen e ON e.student_id = s.id;
´´´
- **Normalisering:** hver opplysning lagres ett sted. Det hindrer motstridende kopier når noe endres.

## Slik løser du oppgavene
1. Les ´FROM´ først (hvilken tabell), så ´WHERE´ (hvilke rader), så ´SELECT´ (hva som vises).
2. Gå gjennom radene én for én og sjekk betingelsen.
3. Bruk aggregatfunksjonen på radene som er igjen.

### Eksempel
Tabellen Ansatt har lønnene 520 000, 610 000, 480 000 og 700 000. Hva gir ´SELECT COUNT(*) FROM Ansatt WHERE lonn > 500000;´?
1. Radene med lønn over 500 000: 520 000, 610 000 og 700 000.
2. ´COUNT(*)´ teller dem: resultatet er 3.

## Vanlige feil
- Å glemme ´WHERE´ i en ´UPDATE´ eller ´DELETE´. Da endres eller slettes alle radene.
- Å blande ´WHERE´ (filtrerer rader) og ´HAVING´ (filtrerer grupper etter ´GROUP BY´).
- Å lagre samme opplysning i flere tabeller, så de til slutt ikke stemmer.

> FROM → WHERE → GROUP BY → SELECT → ORDER BY. Primærnøkkel identifiserer, fremmednøkkel kobler.`,
en: md`## What is it about?
Almost every app stores its data in a database: users, orders, measurements. A **relational database** stores data in tables, and you fetch exactly what you need with the query language **SQL**.

## Concepts and formulas
- A **table** has columns (fields) and rows (records).
- **Primary key:** a column that identifies each row uniquely, for example ´student_id´.
- **Foreign key:** a column that points to the primary key of another table. This is how tables are linked.
- The basic form of SQL:
´´´
SELECT columns FROM table WHERE condition ORDER BY column;
´´´
- **Aggregate functions:** ´COUNT(*)´, ´SUM(x)´, ´AVG(x)´, ´MIN(x)´, ´MAX(x)´. With ´GROUP BY´ they are computed per group.
- **JOIN** combines rows from two tables where the keys match:
´´´
SELECT s.name, e.course FROM Student s JOIN Exam e ON e.student_id = s.id;
´´´
- **Normalization:** each fact is stored in one place. That prevents conflicting copies when something changes.

## How to solve the problems
1. Read ´FROM´ first (which table), then ´WHERE´ (which rows), then ´SELECT´ (what is shown).
2. Go through the rows one by one and check the condition.
3. Apply the aggregate function to the remaining rows.

### Example
The table Employee has the salaries 520,000, 610,000, 480,000 and 700,000. What does ´SELECT COUNT(*) FROM Employee WHERE salary > 500000;´ give?
1. The rows with salary above 500,000: 520,000, 610,000 and 700,000.
2. ´COUNT(*)´ counts them: the result is 3.

## Common mistakes
- Forgetting ´WHERE´ in an ´UPDATE´ or ´DELETE´. Then all rows are changed or deleted.
- Mixing up ´WHERE´ (filters rows) and ´HAVING´ (filters groups after ´GROUP BY´).
- Storing the same fact in several tables, so they end up disagreeing.

> FROM → WHERE → GROUP BY → SELECT → ORDER BY. Primary key identifies, foreign key links.`
});
BIQ("DBNET", 0, [
  ["Hva er en primærnøkkel i en tabell?",
   ["En kolonne som identifiserer hver rad unikt", "Den første kolonnen i tabellen", "En kolonne som peker til en annen tabell", "Et passord som beskytter tabellen"],
   "Primærnøkkelen er unik og aldri tom, så hver rad kan finnes igjen entydig. Kolonnen som peker til en annen tabell, er en fremmednøkkel.",
   "What is a primary key in a table?",
   ["A column that identifies each row uniquely", "The first column in the table", "A column that points to another table", "A password that protects the table"],
   "The primary key is unique and never empty, so each row can be found unambiguously. A column pointing to another table is a foreign key."],
  [md`Tabellen ´Ansatt´ har lønnene 520 000, 610 000, 480 000 og 700 000. Hva gir spørringen?` + CB("SELECT COUNT(*) FROM Ansatt WHERE lonn > 500000;"),
   { n: 3, tol: 0, u: "" }, "Radene over 500 000 er 520 000, 610 000 og 700 000. COUNT(*) gir 3.",
   md`The table ´Employee´ has the salaries 520,000, 610,000, 480,000 and 700,000. What does the query return?` + CB("SELECT COUNT(*) FROM Employee WHERE salary > 500000;"), null,
   "The rows above 500,000 are 520,000, 610,000 and 700,000. COUNT(*) gives 3."],
  ["Hva er en fremmednøkkel?",
   ["En kolonne som refererer til primærnøkkelen i en annen tabell", "En nøkkel som ikke kan brukes i Norge", "En kopi av hele tabellen", "En indeks som gjør søk raskere"],
   "Fremmednøkkelen kobler tabeller sammen. En eksamensrad kan for eksempel ha student_id som peker til riktig student.",
   "What is a foreign key?",
   ["A column that refers to the primary key of another table", "A key that cannot be used in Norway", "A copy of the whole table", "An index that makes searches faster"],
   "The foreign key links tables. An exam row can for example have a student_id pointing to the right student."],
  [md`Tabellen ´Ordre´ har kolonnen ´antall´ med verdiene 3, 5 og 2. Hva gir spørringen?` + CB("SELECT SUM(antall) FROM Ordre;"),
   { n: 10, tol: 0, u: "" }, "SUM legger sammen verdiene: 3 + 5 + 2 = 10.",
   md`The table ´Orders´ has the column ´quantity´ with the values 3, 5 and 2. What does the query return?` + CB("SELECT SUM(quantity) FROM Orders;"), null,
   "SUM adds the values: 3 + 5 + 2 = 10."],
  ["Hvilket SQL-nøkkelord sorterer resultatet?",
   [md`´ORDER BY´`, md`´GROUP BY´`, md`´SORT´`, md`´WHERE´`],
   md`´ORDER BY kolonne´ sorterer stigende, og ´ORDER BY kolonne DESC´ synkende. ´GROUP BY´ samler rader i grupper.`,
   "Which SQL keyword sorts the result?",
   [md`´ORDER BY´`, md`´GROUP BY´`, md`´SORT´`, md`´WHERE´`],
   md`´ORDER BY column´ sorts ascending, and ´ORDER BY column DESC´ descending. ´GROUP BY´ collects rows into groups.`],
  ["Hva brukes JOIN til?",
   ["Å sette sammen rader fra to tabeller der nøklene passer", "Å slette dupliserte rader", "Å lage en ny database", "Å kryptere tabellen"],
   "JOIN kombinerer for eksempel Student og Eksamen, så du får navnet og karakteren på samme rad.",
   "What is JOIN used for?",
   ["Combining rows from two tables where the keys match", "Deleting duplicate rows", "Creating a new database", "Encrypting the table"],
   "JOIN combines for example Student and Exam, so you get the name and the grade on the same row."],
  [md`Kolonnen ´temp´ har verdiene 4, 8 og 6. Hva gir ´SELECT AVG(temp) FROM Maling;´?`,
   { n: 6, tol: 0.001, u: "" }, S`AVG er gjennomsnittet: $(4 + 8 + 6)/3 = 6$.`,
   md`The column ´temp´ has the values 4, 8 and 6. What does ´SELECT AVG(temp) FROM Measurement;´ return?`, null,
   S`AVG is the mean: $(4 + 8 + 6)/3 = 6$.`],
  ["Hvorfor normaliserer man en database?",
   ["For å lagre hver opplysning ett sted og unngå motstridende kopier", "For å gjøre alle tall like store", "For å slette gamle data automatisk", "For å gjøre databasen kryptert"],
   "Står adressen til en kunde i ti ordrer, må alle ti endres når kunden flytter. Lagres den ett sted, holder én endring.",
   "Why do you normalize a database?",
   ["To store each fact in one place and avoid conflicting copies", "To make all numbers the same size", "To delete old data automatically", "To encrypt the database"],
   "If a customer's address is stored in ten orders, all ten must change when the customer moves. Stored in one place, one change is enough."]
]);
GEN("DBNET", 0,
 () => { const names = ["Ola", "Kari", "Per", "Siri", "Nils", "Ida", "Emil", "Nora"], n = R.i(4, 7), rows = names.slice(0, n).map(nm => [nm, R.i(40, 90) * 10000]), lim = R.p([500000, 600000, 700000]), cnt = rows.filter(r => r[1] > lim).length;
   const tbl = rows.map(r => `('${r[0]}', ${r[1]})`).join(", ");
   return [T(`Tabellen Ansatt(navn, lonn) har radene ${tbl}. Hva gir spørringen?${CB(`SELECT COUNT(*) FROM Ansatt WHERE lonn > ${lim};`)}`, `The table Employee(name, salary) has the rows ${tbl}. What does the query return?${CB(`SELECT COUNT(*) FROM Employee WHERE salary > ${lim};`)}`),
     { n: cnt, tol: 0, u: "" }, T(`Radene med lønn over ${nf(lim)}: ${rows.filter(r => r[1] > lim).map(r => r[0]).join(", ") || "ingen"}. COUNT gir ${cnt}.`, `The rows with salary above ${nf(lim)}: ${rows.filter(r => r[1] > lim).map(r => r[0]).join(", ") || "none"}. COUNT gives ${cnt}.`)]; },
 () => { const xs = Array.from({ length: R.i(3, 6) }, () => R.i(1, 40)), s = xs.reduce((a, b) => a + b);
   return [T(`Kolonnen antall i tabellen Ordre har verdiene ${xs.join(", ")}. Hva gir spørringen?${CB("SELECT SUM(antall) FROM Ordre;")}`, `The column quantity in the table Orders has the values ${xs.join(", ")}. What does the query return?${CB("SELECT SUM(quantity) FROM Orders;")}`),
     { n: s, tol: 0, u: "" }, T(`SUM: ${xs.join(" + ")} = ${s}.`, `SUM: ${xs.join(" + ")} = ${s}.`)]; },
 () => { const xs = Array.from({ length: R.i(3, 6) }, () => R.i(0, 30)), a = xs.reduce((p, q) => p + q) / xs.length;
   return [T(`Kolonnen temp har verdiene ${xs.join(", ")}. Hva gir spørringen?${CB("SELECT AVG(temp) FROM Maling;")}`, `The column temp has the values ${xs.join(", ")}. What does the query return?${CB("SELECT AVG(temp) FROM Measurement;")}`),
     { n: a, tol: 0.01, u: "" }, S`$(${xs.join(" + ")})/${xs.length} \approx ${mf(a)}$.`]; },
 () => { const cats = ["A", "B", "C"], rows = Array.from({ length: R.i(5, 9) }, () => R.p(cats)), c = R.p(cats), k = rows.filter(x => x === c).length || 1; if(!rows.includes(c)) rows[0] = c;
   const kk = rows.filter(x => x === c).length;
   return [T(`Tabellen Vare har kategori-kolonnen med verdiene ${rows.join(", ")}. Spørringen under gir én rad per kategori. Hvilket tall står ved kategori ${c}?${CB("SELECT kategori, COUNT(*) FROM Vare GROUP BY kategori;")}`,
             `The table Item has the category column with the values ${rows.join(", ")}. The query below gives one row per category. What number is shown for category ${c}?${CB("SELECT category, COUNT(*) FROM Item GROUP BY category;")}`),
     { n: kk, tol: 0, u: "" }, T(`GROUP BY teller radene i hver kategori. Kategori ${c} forekommer ${kk} ganger.`, `GROUP BY counts the rows in each category. Category ${c} occurs ${kk} times.`)]; }
);

// ================= DBNET 1: IP og subnetting =================
THEORY("DBNET", 1, {
nb: md`## Hva handler det om?
Alt som er koblet til internett, har en **IP-adresse**. For å dele et nettverk i mindre deler, for eksempel ett for kontoret og ett for produksjonen, brukes **subnetting**. Du må også kunne regne på hvor lang tid det tar å sende data.

## Begreper og formler
- En IPv4-adresse er 32 bit, skrevet som fire tall 0–255: ´192.168.1.10´.
- **Prefiks** ´/p´: de første $p$ bitene er nettverksdelen, resten er for maskiner (verter).
- Antall adresser i et subnett er $2^{32-p}$. Antall **brukbare** verter er
$$2^{32-p} - 2$$
  fordi nettverksadressen (første) og kringkastingsadressen (siste) ikke kan brukes av maskiner.
- /24 tilsvarer nettmasken ´255.255.255.0´ (256 adresser, 254 verter).
- **Nettverksadressen** finner du ved å runde siste del ned til et helt antall blokker: blokkstørrelsen er $2^{32-p}$.
- **Overføringstid:** $t = \dfrac{\text{datamengde i bit}}{\text{bithastighet}}$. Husk at 1 byte = 8 bit.
- Lag: IP er **nettverkslaget**, TCP og UDP er **transportlaget**. TCP garanterer levering i riktig rekkefølge. DNS oversetter navn til IP-adresser.

## Slik løser du oppgavene
1. Verter: regn $2^{32-p} - 2$.
2. Nettverksadresse: blokkstørrelse $2^{32-p}$, del siste oktett på den og rund ned.
3. Tid: gjør om MB til bit ($\cdot 8$) før du deler på Mbit/s.

### Eksempel
Hvor lang tid tar det å laste ned 100 MB med 50 Mbit/s?
1. $100\ \text{MB} = 800$ Mbit.
2. $t = 800/50 = 16$ s.

## Vanlige feil
- Å glemme de to reserverte adressene når du teller verter.
- Å blande MB (megabyte) og Mb (megabit), en faktor 8.
- Å tro at større prefiks gir flere adresser. Det er omvendt: /30 er mye mindre enn /24.

> Verter = 2^(32−p) − 2. Byte × 8 = bit.`,
en: md`## What is it about?
Everything connected to the internet has an **IP address**. To split a network into smaller parts, for example one for the office and one for production, you use **subnetting**. You also need to calculate how long it takes to send data.

## Concepts and formulas
- An IPv4 address is 32 bits, written as four numbers 0–255: ´192.168.1.10´.
- **Prefix** ´/p´: the first $p$ bits are the network part, the rest are for machines (hosts).
- The number of addresses in a subnet is $2^{32-p}$. The number of **usable** hosts is
$$2^{32-p} - 2$$
  because the network address (first) and the broadcast address (last) cannot be used by machines.
- /24 corresponds to the netmask ´255.255.255.0´ (256 addresses, 254 hosts).
- The **network address** is found by rounding the last part down to a whole number of blocks: the block size is $2^{32-p}$.
- **Transfer time:** $t = \dfrac{\text{data in bits}}{\text{bit rate}}$. Remember that 1 byte = 8 bits.
- Layers: IP is the **network layer**, TCP and UDP are the **transport layer**. TCP guarantees delivery in the right order. DNS translates names to IP addresses.

## How to solve the problems
1. Hosts: compute $2^{32-p} - 2$.
2. Network address: block size $2^{32-p}$, divide the last octet by it and round down.
3. Time: convert MB to bits ($\cdot 8$) before dividing by Mbit/s.

### Example
How long does it take to download 100 MB at 50 Mbit/s?
1. $100\ \text{MB} = 800$ Mbit.
2. $t = 800/50 = 16$ s.

## Common mistakes
- Forgetting the two reserved addresses when counting hosts.
- Mixing MB (megabytes) and Mb (megabits), a factor of 8.
- Thinking a larger prefix gives more addresses. It is the opposite: /30 is much smaller than /24.

> Hosts = 2^(32−p) − 2. Bytes × 8 = bits.`
});
BIQ("DBNET", 1, [
  ["Hvor mange brukbare vertsadresser har et /26-nett?", { n: 62, tol: 0, u: "" }, S`$2^{32-26} - 2 = 64 - 2 = 62$.`,
   "How many usable host addresses does a /26 network have?", null, S`$2^{32-26} - 2 = 64 - 2 = 62$.`],
  ["Hvilken nettmaske tilsvarer /24?", [md`´255.255.255.0´`, md`´255.255.0.0´`, md`´255.255.255.255´`, md`´255.255.255.128´`],
   "24 enere etterfulgt av 8 nuller: de tre første oktettene er 255 og den siste er 0.",
   "Which netmask corresponds to /24?", [md`´255.255.255.0´`, md`´255.255.0.0´`, md`´255.255.255.255´`, md`´255.255.255.128´`],
   "24 ones followed by 8 zeros: the first three octets are 255 and the last is 0."],
  ["Hvor lang tid tar det å overføre 100 MB med 50 Mbit/s?", { n: 16, tol: 0.01, u: "s" }, S`$100\ \text{MB} = 800$ Mbit, og $800/50 = 16$ s.`,
   "How long does it take to transfer 100 MB at 50 Mbit/s?", null, S`$100\ \text{MB} = 800$ Mbit, and $800/50 = 16$ s.`],
  ["Hvilket lag i nettverksmodellen hører IP til?", ["Nettverkslaget", "Transportlaget", "Applikasjonslaget", "Det fysiske laget"],
   "IP sørger for adressering og ruting mellom nettverk. TCP og UDP ligger over, på transportlaget.",
   "Which layer of the network model does IP belong to?", ["The network layer", "The transport layer", "The application layer", "The physical layer"],
   "IP handles addressing and routing between networks. TCP and UDP sit above, on the transport layer."],
  ["Hva gjør DNS?", ["Oversetter domenenavn som axle.no til IP-adresser", "Krypterer all trafikk", "Deler ut nettverkskabler", "Øker båndbredden"],
   "Når du skriver axle.no, spør maskinen en DNS-server om hvilken IP-adresse navnet har, og kobler seg så dit.",
   "What does DNS do?", ["Translates domain names like axle.no into IP addresses", "Encrypts all traffic", "Hands out network cables", "Increases bandwidth"],
   "When you type axle.no, the machine asks a DNS server which IP address the name has, and then connects there."],
  [md`Hva er siste oktett i nettverksadressen til ´192.168.1.130/25´?`, { n: 128, tol: 0, u: "" },
   S`Blokkstørrelsen er $2^{32-25} = 128$. $130/128$ rundet ned er 1 blokk, så nettverksadressen slutter på $1\cdot 128 = 128$.`,
   md`What is the last octet of the network address of ´192.168.1.130/25´?`, null,
   S`The block size is $2^{32-25} = 128$. $130/128$ rounded down is 1 block, so the network address ends in $1\cdot 128 = 128$.`],
  ["Hva er en viktig forskjell mellom TCP og UDP?", ["TCP garanterer at data kommer fram i riktig rekkefølge, UDP gjør ikke det", "UDP er alltid kryptert", "TCP brukes bare på trådløse nett", "Det finnes ingen forskjell"],
   "TCP bekrefter mottak og sender på nytt ved tap. UDP er raskere og enklere, og brukes for eksempel til videosamtaler der litt tap er greit.",
   "What is an important difference between TCP and UDP?", ["TCP guarantees data arrives in the right order, UDP does not", "UDP is always encrypted", "TCP is only used on wireless networks", "There is no difference"],
   "TCP acknowledges receipt and resends on loss. UDP is faster and simpler, used for example in video calls where some loss is fine."],
  ["Hvor mange adresser finnes det totalt i IPv4?", { n: Math.pow(2, 32), tol: 0, u: "" }, S`$2^{32} = 4\,294\,967\,296$, rundt 4,3 milliarder. Det er for lite for alle enheter i verden, og derfor finnes IPv6.`,
   "How many addresses exist in total in IPv4?", null, S`$2^{32} = 4\,294\,967\,296$, about 4.3 billion. That is too few for all devices in the world, which is why IPv6 exists.`]
]);
GEN("DBNET", 1,
 () => { const p = R.i(20, 30), h = Math.pow(2, 32 - p) - 2;
   return [T(`Hvor mange brukbare vertsadresser har et /${p}-nett?`, `How many usable host addresses does a /${p} network have?`), { n: h, tol: 0, u: "" }, S`$2^{32-${p}} - 2 = ${h}$.`]; },
 () => { const MB = R.p([5, 20, 50, 100, 250, 700, 1000, 4000]), r = R.p([10, 20, 50, 100, 250, 500, 1000]), s = MB * 8 / r;
   return [T(`Hvor lang tid tar det å overføre ${nf(MB)} MB med ${r} Mbit/s?`, `How long does it take to transfer ${nf(MB)} MB at ${r} Mbit/s?`), { n: s, tol: rel(s), u: "s" },
     S`$${MB}\cdot 8 = ${MB * 8}$ Mbit, $${MB * 8}/${r} = ${mf(s)}$ s.`]; },
 () => { const p = R.i(25, 30), blk = Math.pow(2, 32 - p), last = R.i(1, 254), net = Math.floor(last / blk) * blk;
   return [T(`Hva er siste oktett i nettverksadressen til 10.0.5.${last}/${p}?`, `What is the last octet of the network address of 10.0.5.${last}/${p}?`), { n: net, tol: 0, u: "" },
     T(S`Blokkstørrelse $2^{${32 - p}} = ${blk}$. $\lfloor ${last}/${blk} \rfloor = ${net / blk}$, så nettverksadressen slutter på $${net / blk}\cdot ${blk} = ${net}$.`, S`Block size $2^{${32 - p}} = ${blk}$. $\lfloor ${last}/${blk} \rfloor = ${net / blk}$, so the network address ends in $${net / blk}\cdot ${blk} = ${net}$.`)]; },
 () => { const need = R.i(3, 1000); let p = 30; while(Math.pow(2, 32 - p) - 2 < need) p--;
   return [T(`Et subnett skal ha plass til ${need} maskiner. Hva er det største prefikset (/p) som holder?`, `A subnet must have room for ${need} machines. What is the largest prefix (/p) that is enough?`), { n: p, tol: 0, u: "" },
     T(S`/${p} gir $2^{${32 - p}} - 2 = ${Math.pow(2, 32 - p) - 2}$ verter, mens /${p + 1} bare gir ${Math.pow(2, 31 - p) - 2}.`, S`/${p} gives $2^{${32 - p}} - 2 = ${Math.pow(2, 32 - p) - 2}$ hosts, while /${p + 1} only gives ${Math.pow(2, 31 - p) - 2}.`)]; }
);

// ================= DBNET 2: IKT-sikkerhet =================
THEORY("DBNET", 2, {
nb: md`## Hva handler det om?
Alle ingeniører må kunne grunnleggende IKT-sikkerhet: data skal holdes hemmelig, ikke endres i det skjulte, og være tilgjengelig når de trengs. Mange angrep starter med et svakt passord eller en lurt bruker.

## Begreper og formler
- **KIT/CIA:** konfidensialitet (bare de rette kan lese), integritet (data endres ikke uautorisert), tilgjengelighet (systemet virker når det trengs).
- **Passordstyrke** (entropi) i bit, når hvert tegn velges tilfeldig blant $N$ tegn og passordet har $L$ tegn:
$$H = L\cdot\log_2 N$$
- Antall mulige passord er $N^L$. **Tid for å prøve alle:** $N^L$ delt på antall forsøk per sekund.
- **Hashfunksjon:** gjør data om til et fingeravtrykk som ikke kan regnes tilbake. Passord lagres som hash (med salt), aldri i klartekst.
- **Symmetrisk kryptering:** samme nøkkel til å låse og låse opp. **Asymmetrisk:** offentlig nøkkel krypterer, bare den private nøkkelen dekrypterer.
- **Tofaktorautentisering:** noe du vet (passord) pluss noe du har (telefon eller kodebrikke).
- **Phishing:** falske e-poster eller sider som lurer brukeren til å gi fra seg passord.

## Slik løser du oppgavene
1. Entropi: gang lengden med $\log_2$ av antall mulige tegn.
2. Knekketid: regn $N^L$ og del på forsøk per sekund, og gjør om til passende enhet.

### Eksempel
Et passord på 8 små bokstaver (26 mulige tegn):
1. $H = 8\cdot\log_2 26 \approx 8\cdot 4{,}70 = 37{,}6$ bit.
2. $26^8 \approx 2{,}1\cdot 10^{11}$ muligheter. Med $10^{10}$ forsøk per sekund tar alt under et halvt minutt.

## Vanlige feil
- Å tro at kompliserte, korte passord er bedre enn lange. Lengde gir mest styrke.
- Å lagre passord i klartekst eller med rask hash uten salt.
- Å bruke samme passord flere steder.

> Styrke = lengde × log₂(antall tegn). Lengde slår kompleksitet.`,
en: md`## What is it about?
Every engineer needs basic cyber security: data must be kept secret, not changed behind your back, and be available when needed. Many attacks start with a weak password or a tricked user.

## Concepts and formulas
- **CIA:** confidentiality (only the right people can read), integrity (data is not changed without authorization), availability (the system works when needed).
- **Password strength** (entropy) in bits, when each character is chosen at random from $N$ characters and the password has $L$ characters:
$$H = L\cdot\log_2 N$$
- The number of possible passwords is $N^L$. **Time to try them all:** $N^L$ divided by the number of guesses per second.
- **Hash function:** turns data into a fingerprint that cannot be reversed. Passwords are stored as hashes (with salt), never in plain text.
- **Symmetric encryption:** the same key locks and unlocks. **Asymmetric:** the public key encrypts, only the private key decrypts.
- **Two-factor authentication:** something you know (password) plus something you have (phone or token).
- **Phishing:** fake emails or sites that trick the user into giving away passwords.

## How to solve the problems
1. Entropy: multiply the length by $\log_2$ of the number of possible characters.
2. Cracking time: compute $N^L$ and divide by guesses per second, then convert to a suitable unit.

### Example
A password of 8 lowercase letters (26 possible characters):
1. $H = 8\cdot\log_2 26 \approx 8\cdot 4.70 = 37.6$ bits.
2. $26^8 \approx 2.1\cdot 10^{11}$ possibilities. At $10^{10}$ guesses per second, all are tried in under half a minute.

## Common mistakes
- Thinking complicated short passwords beat long ones. Length gives the most strength.
- Storing passwords in plain text or with a fast hash without salt.
- Reusing the same password in several places.

> Strength = length × log₂(number of characters). Length beats complexity.`
});
BIQ("DBNET", 2, [
  ["Hvor mange bit entropi har et tilfeldig passord på 8 små bokstaver (26 mulige tegn)?", { n: 8 * Math.log2(26), tol: 0.1, u: "bit" }, S`$H = 8\cdot\log_2 26 \approx 8\cdot 4{,}70 = 37{,}6$ bit.`,
   "How many bits of entropy does a random password of 8 lowercase letters (26 possible characters) have?", null, S`$H = 8\cdot\log_2 26 \approx 8\cdot 4.70 = 37.6$ bits.`],
  [S`En angriper klarer $10^9$ forsøk per sekund. Hvor mange sekunder tar det å prøve alle passord på 6 små bokstaver?`, { n: Math.pow(26, 6) / 1e9, tol: 0.005, u: "s" },
   S`$26^6 = 308\,915\,776$ muligheter, og $308\,915\,776/10^9 \approx 0{,}309$ s. Korte passord er ubrukelige!`,
   S`An attacker manages $10^9$ guesses per second. How many seconds does it take to try all passwords of 6 lowercase letters?`, null,
   S`$26^6 = 308\,915\,776$ possibilities, and $308\,915\,776/10^9 \approx 0.309$ s. Short passwords are useless!`],
  ["Hva er en viktig egenskap ved en kryptografisk hashfunksjon?", ["Den er enveis: du kan ikke regne deg tilbake til originalen", "Den kan alltid dekrypteres med riktig nøkkel", "Den gjør dataene større", "Den er bare for bilder"],
   "Derfor lagres passord som hash: systemet sammenligner hashen av det du skriver med den lagrede, uten å kjenne passordet ditt.",
   "What is an important property of a cryptographic hash function?", ["It is one-way: you cannot compute your way back to the original", "It can always be decrypted with the right key", "It makes the data larger", "It is only for images"],
   "That is why passwords are stored as hashes: the system compares the hash of what you type with the stored one, without knowing your password."],
  ["Hva betyr integritet i informasjonssikkerhet?", ["At data ikke er endret av noen som ikke har lov", "At data er hemmelig", "At systemet alltid er oppe", "At brukerne er ærlige"],
   "Integritet handler om at du kan stole på innholdet. Konfidensialitet er hemmelighold, og tilgjengelighet er at systemet virker.",
   "What does integrity mean in information security?", ["That data has not been changed by anyone without permission", "That data is secret", "That the system is always up", "That the users are honest"],
   "Integrity is about being able to trust the content. Confidentiality is secrecy, and availability is that the system works."],
  ["Hvordan fungerer asymmetrisk kryptering?", ["Alle kan kryptere med den offentlige nøkkelen, men bare eieren av den private nøkkelen kan dekryptere", "Samme nøkkel brukes til å låse og låse opp", "Dataene deles i to halvdeler", "Det krever ingen nøkler"],
   "Slik fungerer for eksempel HTTPS: nettleseren bruker nettstedets offentlige nøkkel til å avtale en hemmelig nøkkel som bare nettstedet kan lese.",
   "How does asymmetric encryption work?", ["Anyone can encrypt with the public key, but only the owner of the private key can decrypt", "The same key locks and unlocks", "The data is split into two halves", "It needs no keys"],
   "This is how HTTPS works, for example: the browser uses the site's public key to agree on a secret key that only the site can read."],
  ["Hva kombinerer tofaktorautentisering typisk?", ["Noe du vet (passord) og noe du har (telefon eller kodebrikke)", "To forskjellige passord", "Brukernavn og e-post", "To nettlesere"],
   "Selv om passordet lekker, kommer ikke angriperen inn uten den andre faktoren.",
   "What does two-factor authentication typically combine?", ["Something you know (password) and something you have (phone or token)", "Two different passwords", "Username and email", "Two browsers"],
   "Even if the password leaks, the attacker cannot get in without the second factor."],
  ["Hvor mange bit entropi har et tilfeldig passord på 16 små bokstaver?", { n: 16 * Math.log2(26), tol: 0.1, u: "bit" }, S`$16\cdot\log_2 26 \approx 75{,}2$ bit, dobbelt så mye som med 8 tegn. Hver ekstra bit dobler arbeidet for angriperen.`,
   "How many bits of entropy does a random password of 16 lowercase letters have?", null, S`$16\cdot\log_2 26 \approx 75.2$ bits, twice as much as with 8 characters. Each extra bit doubles the attacker's work.`],
  ["Hva er phishing?", ["Falske e-poster eller nettsider som lurer brukere til å gi fra seg opplysninger", "Et virus som sletter harddisken", "En type brannmur", "Kryptering av e-post"],
   "Phishing retter seg mot mennesker, ikke maskiner. Sjekk alltid avsender og adresse før du logger inn via en lenke.",
   "What is phishing?", ["Fake emails or websites that trick users into giving away information", "A virus that erases the hard disk", "A type of firewall", "Email encryption"],
   "Phishing targets people, not machines. Always check the sender and address before logging in via a link."]
]);
GEN("DBNET", 2,
 () => { const sets = [[10, "sifre", "digits"], [26, "små bokstaver", "lowercase letters"], [52, "store og små bokstaver", "upper- and lowercase letters"], [62, "bokstaver og sifre", "letters and digits"], [94, "alle tastaturtegn", "all keyboard characters"]], [N, nb, en] = R.p(sets), L = R.i(4, 20), H = L * Math.log2(N);
   return [T(`Hvor mange bit entropi har et tilfeldig passord på ${L} tegn valgt blant ${N} ${nb}?`, `How many bits of entropy does a random ${L}-character password chosen from ${N} ${en} have?`), { n: H, tol: 0.1, u: "bit" },
     T(S`$H = ${L}\cdot\log_2 ${N} \approx ${L}\cdot ${mf(Math.log2(N), 3)} \approx ${mf(H, 1)}$ bit.`, S`$H = ${L}\cdot\log_2 ${N} \approx ${L}\cdot ${mf(Math.log2(N), 3)} \approx ${mf(H, 1)}$ bits.`)]; },
 () => { const N = R.p([10, 26, 36]), L = R.i(4, 7), rate = R.p([1e6, 1e7, 1e8, 1e9]), s = Math.pow(N, L) / rate;
   return [T(S`En angriper klarer $10^{${Math.log10(rate)}}$ forsøk per sekund. Hvor mange sekunder tar det å prøve alle passord på ${L} tegn fra ${N} mulige tegn?`, S`An attacker manages $10^{${Math.log10(rate)}}$ guesses per second. How many seconds does it take to try all ${L}-character passwords from ${N} possible characters?`),
     { n: s, tol: rel(s), u: "s" }, S`$${N}^{${L}} = ${Math.pow(N, L)}$ muligheter, $${Math.pow(N, L)}/10^{${Math.log10(rate)}} \approx ${mf(s, 4)}$ s.`.replace("muligheter", LANG === "en" ? "possibilities" : "muligheter")]; },
 () => { const N = R.p([26, 62, 94]), target = R.p([60, 80, 100, 128]), L = Math.ceil(target / Math.log2(N));
   return [T(`Hvor mange tegn må et tilfeldig passord ha for å få minst ${target} bit entropi når hvert tegn velges blant ${N} tegn?`, `How many characters must a random password have to get at least ${target} bits of entropy when each character is chosen from ${N} characters?`), { n: L, tol: 0, u: "" },
     S`$L \geq ${target}/\log_2 ${N} = ${target}/${mf(Math.log2(N), 3)} \approx ${mf(target / Math.log2(N))}$${T(", så", ", so")} $L = ${L}$.`]; }
);

// ================= ELKR 0: Transformatoren =================
THEORY("ELKR", 0, {
nb: md`## Hva handler det om?
Strømmen fra kraftverket sendes ut på høy spenning og transformeres ned i flere trinn før den kommer til stikkontakten. **Transformatoren** gjør dette med to spoler rundt en jernkjerne, uten bevegelige deler og med svært små tap.

## Begreper og formler
- Omsetningsforholdet er vindingstallene $N_1$ (primær) og $N_2$ (sekundær). For en ideell transformator:
$$\frac{U_1}{U_2} = \frac{N_1}{N_2}, \qquad \frac{I_1}{I_2} = \frac{N_2}{N_1}$$
- Effekten er den samme på begge sider (ideelt): $U_1 I_1 = U_2 I_2$. Ned i spenning betyr opp i strøm.
- Transformatorer merkes med **tilsynelatende effekt** i kVA. For trefase: $I = \dfrac{S}{\sqrt3\,U}$.
- **Virkningsgrad:** $\eta = \dfrac{P_{ut}}{P_{ut} + P_{tap}}$. Store transformatorer har ofte over 98 %.
- Transformatoren virker bare på **vekselstrøm**, fordi det må være et magnetfelt som endrer seg.
- Kraft overføres på høy spenning fordi strømmen da blir lav, og tapene i ledningene ($I^2 R$) blir små.

## Slik løser du oppgavene
1. Skriv opp forholdet $N_1/N_2$.
2. Spenning følger vindingene, strøm går motsatt vei.
3. Trefase: bruk $\sqrt3$ i strømformelen.

### Eksempel
En transformator har 1000 vindinger på primærsiden og 50 på sekundærsiden. Primærspenningen er 230 V.
1. $U_2 = U_1\cdot N_2/N_1 = 230\cdot 50/1000 = 11{,}5$ V.
2. Gir sekundærsiden 10 A, trekker primærsiden $10\cdot 50/1000 = 0{,}5$ A.

## Vanlige feil
- Å snu forholdet for strømmen: færre vindinger gir **lavere** spenning men **høyere** strøm.
- Å glemme $\sqrt3$ for trefase.
- Å tro at en transformator virker på likestrøm.

> U følger N, I går motsatt. Høy spenning gir lav strøm og små tap.`,
en: md`## What is it about?
Electricity from the power station is sent out at high voltage and transformed down in several steps before it reaches the socket. The **transformer** does this with two coils around an iron core, with no moving parts and very small losses.

## Concepts and formulas
- The turns ratio uses the numbers of turns $N_1$ (primary) and $N_2$ (secondary). For an ideal transformer:
$$\frac{U_1}{U_2} = \frac{N_1}{N_2}, \qquad \frac{I_1}{I_2} = \frac{N_2}{N_1}$$
- The power is the same on both sides (ideally): $U_1 I_1 = U_2 I_2$. Down in voltage means up in current.
- Transformers are rated in **apparent power** in kVA. For three-phase: $I = \dfrac{S}{\sqrt3\,U}$.
- **Efficiency:** $\eta = \dfrac{P_{out}}{P_{out} + P_{loss}}$. Large transformers often exceed 98 %.
- The transformer only works on **alternating current**, because it needs a changing magnetic field.
- Power is transmitted at high voltage because the current is then low, and the line losses ($I^2 R$) become small.

## How to solve the problems
1. Write down the ratio $N_1/N_2$.
2. Voltage follows the turns, current goes the opposite way.
3. Three-phase: use $\sqrt3$ in the current formula.

### Example
A transformer has 1000 turns on the primary side and 50 on the secondary side. The primary voltage is 230 V.
1. $U_2 = U_1\cdot N_2/N_1 = 230\cdot 50/1000 = 11.5$ V.
2. If the secondary delivers 10 A, the primary draws $10\cdot 50/1000 = 0.5$ A.

## Common mistakes
- Flipping the ratio for current: fewer turns give **lower** voltage but **higher** current.
- Forgetting $\sqrt3$ for three-phase.
- Thinking a transformer works on direct current.

> U follows N, I goes the other way. High voltage gives low current and small losses.`
});
BIQ("ELKR", 0, [
  [S`En transformator har $N_1 = 1000$ og $N_2 = 50$. Primærspenningen er 230 V. Hva er sekundærspenningen?`, { n: 11.5, tol: 0.01, u: "V" }, S`$U_2 = 230\cdot 50/1000 = 11{,}5$ V.`,
   S`A transformer has $N_1 = 1000$ and $N_2 = 50$. The primary voltage is 230 V. What is the secondary voltage?`, null, S`$U_2 = 230\cdot 50/1000 = 11.5$ V.`],
  ["En nettstasjon transformerer 22 kV ned til 230 V. Hva er omsetningsforholdet?", { n: 22000 / 230, tol: 0.1, u: "" }, S`$22\,000/230 \approx 95{,}65$.`,
   "A substation transforms 22 kV down to 230 V. What is the turns ratio?", null, S`$22\,000/230 \approx 95.65$.`],
  ["En transformator med forhold 10 : 1 (ned) leverer 100 A på sekundærsiden. Hvor stor strøm trekker primærsiden?", { n: 10, tol: 0.01, u: "A" }, S`Strømmen går motsatt vei av spenningen: $I_1 = 100/10 = 10$ A.`,
   "A 10 : 1 (step-down) transformer delivers 100 A on the secondary side. What current does the primary side draw?", null, S`Current goes opposite to voltage: $I_1 = 100/10 = 10$ A.`],
  ["En trefasetransformator på 100 kVA leverer 400 V. Hva er merkestrømmen på sekundærsiden?", { n: 100000 / (SQ3 * 400), tol: 0.2, u: "A" }, S`$I = \dfrac{S}{\sqrt3\,U} = \dfrac{100\,000}{\sqrt3\cdot 400} \approx 144{,}3$ A.`,
   "A 100 kVA three-phase transformer delivers 400 V. What is the rated secondary current?", null, S`$I = \dfrac{S}{\sqrt3\,U} = \dfrac{100\,000}{\sqrt3\cdot 400} \approx 144.3$ A.`],
  ["Hvorfor overføres kraft over lange avstander på høy spenning?", ["Strømmen blir lavere, så tapene I²R i ledningene blir mye mindre", "Høy spenning er tryggere", "Ledningene blir lettere av høy spenning", "Det er et krav fra EU"],
   "For samme effekt gir ti ganger høyere spenning en tidel av strømmen, og tapet går ned med faktor 100.",
   "Why is power transmitted over long distances at high voltage?", ["The current is lower, so the I²R losses in the lines are much smaller", "High voltage is safer", "The lines become lighter at high voltage", "It is an EU requirement"],
   "For the same power, ten times higher voltage gives a tenth of the current, and the loss drops by a factor of 100."],
  ["En transformator leverer 95 kW og har tap på 3 kW. Hva er virkningsgraden i prosent?", { n: 95 / 98 * 100, tol: 0.05, u: "%" }, S`$\eta = \dfrac{95}{95 + 3} \approx 0{,}9694$, altså 96,94 %.`,
   "A transformer delivers 95 kW and has losses of 3 kW. What is the efficiency in percent?", null, S`$\eta = \dfrac{95}{95 + 3} \approx 0.9694$, i.e. 96.94 %.`],
  ["Hvorfor virker ikke en transformator på likestrøm?", ["Den trenger et magnetfelt som endrer seg for å indusere spenning", "Likestrøm er for sterk", "Jernkjernen smelter", "Den virker like godt på likestrøm"],
   "Induksjon krever endring i magnetisk fluks. Med likestrøm er fluksen konstant, og sekundærsiden får ingen spenning.",
   "Why doesn't a transformer work on direct current?", ["It needs a changing magnetic field to induce a voltage", "Direct current is too strong", "The iron core melts", "It works just as well on DC"],
   "Induction requires a change in magnetic flux. With DC the flux is constant, and the secondary side gets no voltage."],
  [S`En transformator skal gjøre 230 V om til 12 V. Primærsiden har 460 vindinger. Hvor mange vindinger trengs på sekundærsiden?`, { n: 24, tol: 0.01, u: "" }, S`$N_2 = N_1\cdot U_2/U_1 = 460\cdot 12/230 = 24$.`,
   S`A transformer must convert 230 V to 12 V. The primary side has 460 turns. How many turns are needed on the secondary side?`, null, S`$N_2 = N_1\cdot U_2/U_1 = 460\cdot 12/230 = 24$.`]
]);
GEN("ELKR", 0,
 () => { const N1 = R.p([200, 400, 500, 800, 1000, 2000]), N2 = R.p([20, 40, 50, 100, 120, 250]), U1 = R.p([230, 400, 690]), U2 = U1 * N2 / N1;
   return [T(S`En transformator har $N_1 = ${N1}$ og $N_2 = ${N2}$. Primærspenningen er ${U1} V. Hva er sekundærspenningen?`, S`A transformer has $N_1 = ${N1}$ and $N_2 = ${N2}$. The primary voltage is ${U1} V. What is the secondary voltage?`),
     { n: U2, tol: rel(U2), u: "V" }, S`$U_2 = ${U1}\cdot ${N2}/${N1} = ${mf(U2)}$ V.`]; },
 () => { const r = R.p([2, 4, 5, 10, 20, 25, 50]), I2 = R.i(5, 400), I1 = I2 / r;
   return [T(`En transformator med forhold ${r} : 1 (ned) leverer ${I2} A på sekundærsiden. Hvor stor strøm trekker primærsiden?`, `A ${r} : 1 (step-down) transformer delivers ${I2} A on the secondary side. What current does the primary side draw?`),
     { n: I1, tol: rel(I1), u: "A" }, S`$I_1 = ${I2}/${r} = ${mf(I1)}$ A.`]; },
 () => { const Sk = R.p([50, 100, 160, 250, 315, 500, 800, 1000]), U = R.p([230, 400, 690]), I = Sk * 1000 / (SQ3 * U);
   return [T(`En trefasetransformator på ${Sk} kVA leverer ${U} V. Hva er merkestrømmen?`, `A ${Sk} kVA three-phase transformer delivers ${U} V. What is the rated current?`),
     { n: I, tol: rel(I), u: "A" }, S`$I = \dfrac{${Sk * 1000}}{\sqrt3\cdot ${U}} \approx ${mf(I, 1)}$ A.`]; },
 () => { const U1 = R.p([230, 400]), U2 = R.p([5, 6, 12, 24, 48]), N1 = R.p([230, 460, 690, 920, 1150]) * (U1 === 400 ? 1 : 1), N2 = N1 * U2 / U1;
   return [T(`En transformator skal gjøre ${U1} V om til ${U2} V. Primærsiden har ${N1} vindinger. Hvor mange vindinger trengs på sekundærsiden?`, `A transformer must convert ${U1} V to ${U2} V. The primary has ${N1} turns. How many turns are needed on the secondary side?`),
     { n: N2, tol: rel(N2, 0.01, 0.5), u: "" }, S`$N_2 = ${N1}\cdot ${U2}/${U1} \approx ${mf(N2, 1)}$.`]; },
 () => { const P = R.i(20, 900), L = R.f(0.5, 25, 0.5), e = P / (P + L) * 100;
   return [T(`En transformator leverer ${P} kW og har tap på ${nf(L)} kW. Hva er virkningsgraden i prosent?`, `A transformer delivers ${P} kW and has losses of ${nf(L)} kW. What is the efficiency in percent?`),
     { n: e, tol: 0.05, u: "%" }, S`$\eta = ${P}/(${P} + ${mf(L)}) \approx ${mf(e)}$ %.`]; }
);

// ================= ELKR 1: Elektriske motorer =================
THEORY("ELKR", 1, {
nb: md`## Hva handler det om?
Elektriske motorer står for nesten halvparten av strømforbruket i industrien: pumper, vifter, transportbånd, kompressorer. Den vanligste er **asynkronmotoren**, som er robust, billig og drives direkte av trefase vekselstrøm.

## Begreper og formler
- **Synkront turtall** er farten til det roterende magnetfeltet. Med frekvensen $f$ og $p$ poler:
$$n_s = \frac{120\,f}{p} \quad [\text{o/min}]$$
  En 4-polet motor på 50 Hz har $n_s = 1500$ o/min.
- **Sakking** (slipp): rotoren i en asynkronmotor går litt saktere enn feltet.
$$s = \frac{n_s - n}{n_s}$$
- **Dreiemoment** fra effekt og turtall:
$$T = \frac{P}{\omega} = \frac{60\,P}{2\pi n} \approx 9550\,\frac{P\,[\text{kW}]}{n\,[\text{o/min}]} \quad [\text{Nm}]$$
- **Virkningsgrad:** $\eta = P_{mek}/P_{el}$. Merkeskiltet oppgir den mekaniske akseleffekten.
- En **frekvensomformer** endrer frekvensen og dermed turtallet, som sparer mye energi i pumper og vifter.

## Slik løser du oppgavene
1. Finn $n_s$ fra frekvens og poltall.
2. Sakking eller rotorturtall: $n = n_s(1 - s)$.
3. Moment: $9550\cdot P/n$.

### Eksempel
En 4-polet motor på 50 Hz går med 1440 o/min og gir 11 kW.
1. $n_s = 120\cdot 50/4 = 1500$ o/min.
2. $s = (1500 - 1440)/1500 = 0{,}04 = 4$ %.
3. $T = 9550\cdot 11/1440 \approx 73$ Nm.

## Vanlige feil
- Å blande antall poler og antall polpar. $n_s = 60f/\text{polpar}$ er det samme som $120f/\text{poler}$.
- Å regne dreiemoment med rad/s og o/min om hverandre.
- Å tro at en asynkronmotor går nøyaktig synkront. Da blir det ingen indusert strøm i rotoren, og intet moment.

> nₛ = 120f/p. Sakking = (nₛ − n)/nₛ. Moment ≈ 9550·P/n.`,
en: md`## What is it about?
Electric motors account for almost half of the electricity used in industry: pumps, fans, conveyors, compressors. The most common is the **induction motor**, which is robust, cheap and runs directly on three-phase alternating current.

## Concepts and formulas
- The **synchronous speed** is the speed of the rotating magnetic field. With frequency $f$ and $p$ poles:
$$n_s = \frac{120\,f}{p} \quad [\text{rpm}]$$
  A 4-pole motor at 50 Hz has $n_s = 1500$ rpm.
- **Slip:** the rotor of an induction motor turns slightly slower than the field.
$$s = \frac{n_s - n}{n_s}$$
- **Torque** from power and speed:
$$T = \frac{P}{\omega} = \frac{60\,P}{2\pi n} \approx 9550\,\frac{P\,[\text{kW}]}{n\,[\text{rpm}]} \quad [\text{Nm}]$$
- **Efficiency:** $\eta = P_{mech}/P_{el}$. The rating plate gives the mechanical shaft power.
- A **variable frequency drive** changes the frequency and thus the speed, which saves a lot of energy in pumps and fans.

## How to solve the problems
1. Find $n_s$ from frequency and number of poles.
2. Slip or rotor speed: $n = n_s(1 - s)$.
3. Torque: $9550\cdot P/n$.

### Example
A 4-pole motor at 50 Hz runs at 1440 rpm and delivers 11 kW.
1. $n_s = 120\cdot 50/4 = 1500$ rpm.
2. $s = (1500 - 1440)/1500 = 0.04 = 4$ %.
3. $T = 9550\cdot 11/1440 \approx 73$ Nm.

## Common mistakes
- Mixing up number of poles and number of pole pairs. $n_s = 60f/\text{pole pairs}$ is the same as $120f/\text{poles}$.
- Mixing rad/s and rpm when computing torque.
- Thinking an induction motor runs exactly synchronously. Then no current is induced in the rotor, and there is no torque.

> nₛ = 120f/p. Slip = (nₛ − n)/nₛ. Torque ≈ 9550·P/n.`
});
BIQ("ELKR", 1, [
  ["Hva er det synkrone turtallet til en 4-polet motor på 50 Hz?", { n: 1500, tol: 0.5, u: "o/min" }, S`$n_s = 120\cdot 50/4 = 1500$ o/min.`,
   "What is the synchronous speed of a 4-pole motor at 50 Hz?", null, S`$n_s = 120\cdot 50/4 = 1500$ rpm.`],
  ["En 4-polet motor på 50 Hz går med 1440 o/min. Hva er sakkingen i prosent?", { n: 4, tol: 0.01, u: "%" }, S`$s = (1500 - 1440)/1500 = 0{,}04 = 4$ %.`,
   "A 4-pole motor at 50 Hz runs at 1440 rpm. What is the slip in percent?", null, S`$s = (1500 - 1440)/1500 = 0.04 = 4$ %.`],
  ["En motor gir 11 kW ved 1460 o/min. Hva er dreiemomentet?", { n: 11000 * 60 / (2 * Math.PI * 1460), tol: 0.3, u: "Nm" }, S`$T = \dfrac{60\cdot 11\,000}{2\pi\cdot 1460} \approx 71{,}9$ Nm.`,
   "A motor delivers 11 kW at 1460 rpm. What is the torque?", null, S`$T = \dfrac{60\cdot 11\,000}{2\pi\cdot 1460} \approx 71.9$ Nm.`],
  ["Hva er det synkrone turtallet til en 2-polet motor på 60 Hz (som i USA)?", { n: 3600, tol: 0.5, u: "o/min" }, S`$n_s = 120\cdot 60/2 = 3600$ o/min.`,
   "What is the synchronous speed of a 2-pole motor at 60 Hz (as in the USA)?", null, S`$n_s = 120\cdot 60/2 = 3600$ rpm.`],
  ["Hvordan endrer en frekvensomformer turtallet til en asynkronmotor?", ["Den endrer frekvensen på spenningen motoren får", "Den endrer antall poler", "Den kobler ut én fase", "Den bremser motoren mekanisk"],
   S`Det synkrone turtallet er proporsjonalt med frekvensen, $n_s = 120f/p$. Lavere frekvens gir lavere turtall.`,
   "How does a variable frequency drive change the speed of an induction motor?", ["It changes the frequency of the voltage the motor gets", "It changes the number of poles", "It disconnects one phase", "It brakes the motor mechanically"],
   S`The synchronous speed is proportional to the frequency, $n_s = 120f/p$. A lower frequency gives a lower speed.`],
  ["En motor gir 7,5 kW mekanisk og har virkningsgrad 0,9. Hvor mye elektrisk effekt trekker den?", { n: 7.5 / 0.9, tol: 0.01, u: "kW" }, S`$P_{el} = 7{,}5/0{,}9 \approx 8{,}33$ kW.`,
   "A motor delivers 7.5 kW of mechanical power and has an efficiency of 0.9. How much electrical power does it draw?", null, S`$P_{el} = 7.5/0.9 \approx 8.33$ kW.`],
  ["Hva betyr det at en motor er asynkron?", ["Rotoren går litt saktere enn det roterende magnetfeltet", "Motoren går baklengs", "Motoren trenger likestrøm", "Motoren har ingen rotor"],
   "Forskjellen i fart (sakkingen) induserer strøm i rotoren, og det er den strømmen som gir dreiemoment.",
   "What does it mean that a motor is asynchronous?", ["The rotor turns slightly slower than the rotating magnetic field", "The motor runs backwards", "The motor needs direct current", "The motor has no rotor"],
   "The difference in speed (the slip) induces current in the rotor, and that current produces the torque."],
  ["En 6-polet motor på 50 Hz har 3 % sakking. Hvilket turtall går rotoren med?", { n: 970, tol: 0.5, u: "o/min" }, S`$n_s = 120\cdot 50/6 = 1000$ o/min og $n = 1000\cdot(1 - 0{,}03) = 970$ o/min.`,
   "A 6-pole motor at 50 Hz has 3 % slip. At what speed does the rotor turn?", null, S`$n_s = 120\cdot 50/6 = 1000$ rpm and $n = 1000\cdot(1 - 0.03) = 970$ rpm.`]
]);
GEN("ELKR", 1,
 () => { const f = R.p([50, 60]), p = R.p([2, 4, 6, 8, 10, 12]), ns = 120 * f / p;
   return [T(`Hva er det synkrone turtallet til en ${p}-polet motor på ${f} Hz?`, `What is the synchronous speed of a ${p}-pole motor at ${f} Hz?`), { n: ns, tol: 0.5, u: "o/min" }, S`$n_s = 120\cdot ${f}/${p} = ${mf(ns)}$.`]; },
 () => { const p = R.p([2, 4, 6]), ns = 6000 / p, s = R.f(0.01, 0.07, 0.005), n = Math.round(ns * (1 - s)), sp = (ns - n) / ns * 100;
   return [T(`En ${p}-polet motor på 50 Hz går med ${n} o/min. Hva er sakkingen i prosent?`, `A ${p}-pole motor at 50 Hz runs at ${n} rpm. What is the slip in percent?`), { n: sp, tol: 0.02, u: "%" },
     S`$n_s = ${ns}$, $s = (${ns} - ${n})/${ns} \approx ${mf(sp)}$ %.`]; },
 () => { const P = R.p([0.75, 1.5, 3, 5.5, 7.5, 11, 15, 22, 30, 45, 55]), n = R.p([720, 960, 975, 1440, 1460, 2900, 2950]), T_ = P * 1000 * 60 / (2 * Math.PI * n);
   return [T(`En motor gir ${nf(P)} kW ved ${n} o/min. Hva er dreiemomentet?`, `A motor delivers ${nf(P)} kW at ${n} rpm. What is the torque?`), { n: T_, tol: rel(T_), u: "Nm" },
     S`$T = \dfrac{60\cdot ${mf(P * 1000, 0)}}{2\pi\cdot ${n}} \approx ${mf(T_, 1)}$ Nm.`]; },
 () => { const p = R.p([2, 4, 6, 8]), s = R.f(1, 6, 0.5), ns = 6000 / p, n = ns * (1 - s / 100);
   return [T(`En ${p}-polet motor på 50 Hz har ${nf(s)} % sakking. Hvilket turtall går rotoren med?`, `A ${p}-pole motor at 50 Hz has ${nf(s)} % slip. At what speed does the rotor turn?`), { n, tol: 0.5, u: "o/min" },
     S`$n_s = ${ns}$, $n = ${ns}\cdot(1 - ${mf(s / 100, 3)}) = ${mf(n, 1)}$.`]; },
 () => { const P = R.p([1.5, 3, 5.5, 7.5, 11, 15, 22]), e = R.f(0.8, 0.96, 0.01), Pe = P / e;
   return [T(`En motor gir ${nf(P)} kW mekanisk og har virkningsgrad ${nf(e)}. Hvor mye elektrisk effekt trekker den?`, `A motor delivers ${nf(P)} kW mechanical and has an efficiency of ${nf(e)}. How much electrical power does it draw?`), { n: Pe, tol: rel(Pe), u: "kW" },
     S`$P_{el} = ${mf(P)}/${mf(e)} \approx ${mf(Pe)}$ kW.`]; }
);

// ================= ELKR 2: Kraftsystemet og energi =================
THEORY("ELKR", 2, {
nb: md`## Hva handler det om?
Norge får nesten all strøm fra vannkraft, som sendes gjennom et nett av linjer og transformatorer ut til hver bolig og bedrift. Her lærer du å regne på energi og kostnad, tap i ledninger, spenningsfall og hvor mye effekt et vannkraftverk gir.

## Begreper og formler
- **Effekt** $P$ (W, kW) er hvor fort energi brukes. **Energi** $E = P\cdot t$ måles i kWh. En panelovn på 2 kW i 3 timer bruker 6 kWh.
- **Strømkostnad:** energi ganger pris per kWh.
- **Tap i en ledning:** $P_{tap} = I^2 R$. Dobbel spenning for samme effekt gir halv strøm og en firedel av tapet.
- **Spenningsfall** over en ledning med resistans $R$: $\Delta U = I R$. Oppgis ofte i prosent av nominell spenning.
- **Vannkraft:** effekten fra fallhøyden $H$ og vannføringen $Q$:
$$P = \rho g Q H \eta$$
- Frekvensen i nettet (50 Hz) holdes stabil ved at **produksjon og forbruk er i balanse hvert øyeblikk**.

## Slik løser du oppgavene
1. Skill mellom effekt (kW) og energi (kWh).
2. Tap og spenningsfall: finn strømmen først.
3. Vannkraft: $\rho = 1000$ kg/m³ og $g = 9{,}81$ m/s².

### Eksempel
Et kraftverk har fallhøyde 100 m, vannføring 10 m³/s og virkningsgrad 0,9.
1. $P = 1000\cdot 9{,}81\cdot 10\cdot 100\cdot 0{,}9$.
2. $P \approx 8\,829\,000$ W $\approx 8{,}83$ MW.

## Vanlige feil
- Å blande kW og kWh.
- Å regne tap med $I R$ i stedet for $I^2 R$.
- Å glemme virkningsgraden i vannkraftformelen.

> Energi = effekt × tid. Tap = I²R. Vannkraft: P = ρgQHη.`,
en: md`## What is it about?
Norway gets almost all of its electricity from hydropower, which is sent through a grid of lines and transformers to every home and business. Here you learn to calculate energy and cost, line losses, voltage drop and how much power a hydropower plant delivers.

## Concepts and formulas
- **Power** $P$ (W, kW) is how fast energy is used. **Energy** $E = P\cdot t$ is measured in kWh. A 2 kW heater for 3 hours uses 6 kWh.
- **Electricity cost:** energy times price per kWh.
- **Loss in a line:** $P_{loss} = I^2 R$. Double voltage for the same power gives half the current and a quarter of the loss.
- **Voltage drop** across a line with resistance $R$: $\Delta U = I R$. Often given as a percentage of the nominal voltage.
- **Hydropower:** the power from the head $H$ and the flow $Q$:
$$P = \rho g Q H \eta$$
- The grid frequency (50 Hz) is kept stable by **production and consumption being in balance at every moment**.

## How to solve the problems
1. Distinguish between power (kW) and energy (kWh).
2. Losses and voltage drop: find the current first.
3. Hydropower: $\rho = 1000$ kg/m³ and $g = 9.81$ m/s².

### Example
A power plant has a head of 100 m, a flow of 10 m³/s and an efficiency of 0.9.
1. $P = 1000\cdot 9.81\cdot 10\cdot 100\cdot 0.9$.
2. $P \approx 8\,829\,000$ W $\approx 8.83$ MW.

## Common mistakes
- Mixing kW and kWh.
- Computing losses with $I R$ instead of $I^2 R$.
- Forgetting the efficiency in the hydropower formula.

> Energy = power × time. Loss = I²R. Hydropower: P = ρgQHη.`
});
BIQ("ELKR", 2, [
  ["En panelovn på 2 kW står på i 3 timer. Hvor mye energi bruker den?", { n: 6, tol: 0.01, u: "kWh" }, S`$E = P\cdot t = 2\cdot 3 = 6$ kWh.`,
   "A 2 kW heater is on for 3 hours. How much energy does it use?", null, S`$E = P\cdot t = 2\cdot 3 = 6$ kWh.`],
  ["Strømmen koster 1,50 kr/kWh. Hva koster 6 kWh?", { n: 9, tol: 0.01, u: "kr" }, S`$6\cdot 1{,}50 = 9$ kr.`,
   "Electricity costs 1.50 NOK/kWh. What do 6 kWh cost?", null, S`$6\cdot 1.50 = 9$ NOK.`],
  [S`Gjennom en ledning med resistans $0{,}5\ \Omega$ går det 100 A. Hvor stort er tapet?`, { n: 5, tol: 0.01, u: "kW" }, S`$P_{tap} = I^2 R = 100^2\cdot 0{,}5 = 5000$ W $= 5$ kW.`,
   S`A current of 100 A flows through a line with resistance $0.5\ \Omega$. How large is the loss?`, null, S`$P_{loss} = I^2 R = 100^2\cdot 0.5 = 5000$ W $= 5$ kW.`],
  ["Samme effekt overføres med dobbelt så høy spenning. Hvor mange prosent av det opprinnelige tapet blir igjen?", { n: 25, tol: 0.01, u: "%" }, S`Strømmen halveres, og tapet $I^2 R$ blir $(1/2)^2 = 1/4 = 25$ %.`,
   "The same power is transmitted at twice the voltage. What percentage of the original loss remains?", null, S`The current is halved, and the loss $I^2 R$ becomes $(1/2)^2 = 1/4 = 25$ %.`],
  ["Et vannkraftverk har fallhøyde 100 m, vannføring 10 m³/s og virkningsgrad 0,9. Hvor stor effekt gir det?", { n: 1000 * 9.81 * 10 * 100 * 0.9 / 1e6, tol: 0.01, u: "MW" }, S`$P = 1000\cdot 9{,}81\cdot 10\cdot 100\cdot 0{,}9 \approx 8{,}83\cdot 10^6$ W $= 8{,}83$ MW.`,
   "A hydropower plant has a head of 100 m, a flow of 10 m³/s and an efficiency of 0.9. How much power does it deliver?", null, S`$P = 1000\cdot 9.81\cdot 10\cdot 100\cdot 0.9 \approx 8.83\cdot 10^6$ W $= 8.83$ MW.`],
  [S`En kabel har total resistans $0{,}2\ \Omega$ og fører 16 A. Hvor stort er spenningsfallet?`, { n: 3.2, tol: 0.01, u: "V" }, S`$\Delta U = I R = 16\cdot 0{,}2 = 3{,}2$ V, som er omtrent 1,4 % av 230 V.`,
   S`A cable has a total resistance of $0.2\ \Omega$ and carries 16 A. How large is the voltage drop?`, null, S`$\Delta U = I R = 16\cdot 0.2 = 3.2$ V, about 1.4 % of 230 V.`],
  ["Hvorfor må frekvensen i strømnettet holdes nær 50 Hz?", ["Den viser om produksjon og forbruk er i balanse, og utstyr er laget for 50 Hz", "Fordi høyere frekvens gir gratis strøm", "Frekvensen påvirker ikke noe", "For å gjøre strømmen likestrøm"],
   "Bruker vi mer enn det som produseres, bremses generatorene og frekvensen synker. Kraftverkene justeres hele tiden for å holde den stabil.",
   "Why must the grid frequency be kept close to 50 Hz?", ["It shows whether production and consumption are balanced, and equipment is built for 50 Hz", "Because higher frequency gives free electricity", "The frequency doesn't affect anything", "To make the current DC"],
   "If we use more than is produced, the generators slow down and the frequency drops. Power plants are adjusted constantly to keep it stable."],
  ["Hva er forskjellen på kW og kWh?", ["kW er effekt (hvor fort), kWh er energi (hvor mye)", "Det er det samme", "kWh er effekt og kW er energi", "kW brukes bare for vannkraft"],
   "En 1 kW ovn som står på i én time, bruker 1 kWh. Strømregningen betales for kWh.",
   "What is the difference between kW and kWh?", ["kW is power (how fast), kWh is energy (how much)", "They are the same", "kWh is power and kW is energy", "kW is only used for hydropower"],
   "A 1 kW heater that is on for one hour uses 1 kWh. The electricity bill is paid for kWh."]
]);
GEN("ELKR", 2,
 () => { const P = R.f(0.1, 10, 0.1), h = R.f(0.5, 24, 0.5), E = P * h;
   return [T(`Et apparat på ${nf(P)} kW står på i ${nf(h)} timer. Hvor mye energi bruker det?`, `An appliance of ${nf(P)} kW runs for ${nf(h)} hours. How much energy does it use?`), { n: E, tol: rel(E), u: "kWh" }, S`$E = ${mf(P)}\cdot ${mf(h)} = ${mf(E)}$ kWh.`]; },
 () => { const E = R.i(1, 3000), pr = R.f(0.3, 3, 0.05), c = E * pr;
   return [T(`Strømmen koster ${nf(pr)} kr/kWh. Hva koster ${E} kWh?`, `Electricity costs ${nf(pr)} NOK/kWh. What do ${E} kWh cost?`), { n: c, tol: rel(c), u: "kr" }, S`$${E}\cdot ${mf(pr)} = ${mf(c)}$.`]; },
 () => { const I = R.i(5, 400), Rr = R.f(0.05, 2, 0.05), P = I * I * Rr;
   return [T(S`Gjennom en ledning med resistans $${mf(Rr)}\ \Omega$ går det ${I} A. Hvor stort er tapet?`, S`A current of ${I} A flows through a line with resistance $${mf(Rr)}\ \Omega$. How large is the loss?`), { n: P, tol: rel(P), u: "W" }, S`$P = I^2 R = ${I}^2\cdot ${mf(Rr)} = ${mf(P)}$ W.`]; },
 () => { const H = R.i(20, 800), Q = R.f(1, 120, 1), e = R.f(0.8, 0.94, 0.01), P = 1000 * G_ * Q * H * e / 1e6;
   return [T(`Et vannkraftverk har fallhøyde ${H} m, vannføring ${nf(Q)} m³/s og virkningsgrad ${nf(e)}. Hvor stor effekt gir det?`, `A hydropower plant has a head of ${H} m, a flow of ${nf(Q)} m³/s and an efficiency of ${nf(e)}. How much power does it deliver?`), { n: P, tol: rel(P), u: "MW" },
     T(S`$P = 1000\cdot 9{,}81\cdot ${mf(Q)}\cdot ${H}\cdot ${mf(e)} \approx ${mf(P)}$ MW.`, S`$P = 1000\cdot 9.81\cdot ${mf(Q)}\cdot ${H}\cdot ${mf(e)} \approx ${mf(P)}$ MW.`)]; },
 () => { const I = R.i(6, 63), Rr = R.f(0.05, 0.8, 0.05), dU = I * Rr, pct = dU / 230 * 100;
   return [T(S`En kurs på 230 V har total ledningsresistans $${mf(Rr)}\ \Omega$ og fører ${I} A. Hvor mange prosent er spenningsfallet?`, S`A 230 V circuit has a total line resistance of $${mf(Rr)}\ \Omega$ and carries ${I} A. What is the voltage drop in percent?`), { n: pct, tol: rel(pct), u: "%" },
     S`$\Delta U = ${I}\cdot ${mf(Rr)} = ${mf(dU)}$ V, $${mf(dU)}/230\cdot 100 \approx ${mf(pct)}$ %.`]; }
);
})();
