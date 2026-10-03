// ============================================================
//  add_zdeep_ing.js – fordypning i de korteste ingeniør- og grunnfagsenhetene (diskret matte, databaser og nett,
//  elkraft, geoteknikk, maskinlæring, bygg, gasslover, statistikk og bølger). DEEP ligger i learn.js.
// ============================================================
(() => {
// ================= DISKRET MATEMATIKK =================
DEEP("DISK", "Logikk og mengder",
`## Utsagnslogikk i praksis
Et **utsagn** er en påstand som enten er sann eller usann. Med **konnektiver** bygger vi sammensatte utsagn: ikke ($\\neg$), og ($\\wedge$), eller ($\\vee$), hvis–så ($\\to$) og hvis og bare hvis ($\\leftrightarrow$). En **sannhetsverditabell** med $2^n$ rader for $n$ variabler gir alltid svaret.
- **Implikasjonen** $p \\to q$ er bare usann når $p$ er sann og $q$ usann. «Hvis det regner, er bakken våt» brytes bare av regn og tørr bakke.
- **Kontraposisjonen** $\\neg q \\to \\neg p$ er ekvivalent med $p \\to q$, mens **den omvendte** $q \\to p$ ikke er det. Mange bevis går via kontraposisjon.
- **De Morgans lover**: $\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q$ og $\\neg(p \\vee q) \\equiv \\neg p \\wedge \\neg q$. De brukes daglig i programmering for å forenkle betingelser.
- En **tautologi** er alltid sann, en **kontradiksjon** alltid usann.

## Kvantorer
«For alle» ($\\forall$) og «det finnes» ($\\exists$). Negasjonen bytter kvantor: $\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)$. For å motbevise «alle primtall er odde» holder det med ett **moteksempel**: 2.

## Mengder
En **mengde** er en samling ulike elementer. Viktige operasjoner er **union** $A \\cup B$, **snitt** $A \\cap B$, **differanse** $A \\setminus B$ og **komplement** $A^c$. **Venndiagram** gjør dem konkrete. **Inklusjon–eksklusjon**: $|A \\cup B| = |A| + |B| - |A \\cap B|$. **Potensmengden** til en mengde med $n$ elementer har $2^n$ delmengder – hvert element er enten med eller ikke. **Kartesisk produkt** $A \\times B$ er alle ordnede par, med $|A| \\cdot |B|$ elementer.

## Hvorfor ingeniører trenger dette
Logikk er grunnlaget for **digitale kretser** (porter AND, OR, NOT), **databasespørringer** (WHERE-betingelser) og **programverifisering**. Mengder brukes i databaser (relasjoner er mengder av rader), sannsynlighet (hendelser er mengder av utfall) og algoritmer.`,
`## Propositional logic in practice
A **proposition** is a statement that is either true or false. With **connectives** we build compound statements: not ($\\neg$), and ($\\wedge$), or ($\\vee$), if–then ($\\to$) and if and only if ($\\leftrightarrow$). A **truth table** with $2^n$ rows for $n$ variables always gives the answer.
- **The implication** $p \\to q$ is false only when $p$ is true and $q$ false. "If it rains, the ground is wet" is broken only by rain and dry ground.
- **The contrapositive** $\\neg q \\to \\neg p$ is equivalent to $p \\to q$, while **the converse** $q \\to p$ is not. Many proofs go via the contrapositive.
- **De Morgan's laws**: $\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q$ and $\\neg(p \\vee q) \\equiv \\neg p \\wedge \\neg q$. They are used daily in programming to simplify conditions.
- A **tautology** is always true, a **contradiction** always false.

## Quantifiers
"For all" ($\\forall$) and "there exists" ($\\exists$). Negation swaps the quantifier: $\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)$. To disprove "all primes are odd" a single **counterexample** suffices: 2.

## Sets
A **set** is a collection of distinct elements. Key operations are **union** $A \\cup B$, **intersection** $A \\cap B$, **difference** $A \\setminus B$ and **complement** $A^c$. **Venn diagrams** make them concrete. **Inclusion–exclusion**: $|A \\cup B| = |A| + |B| - |A \\cap B|$. The **power set** of a set with $n$ elements has $2^n$ subsets – each element is either in or out. The **Cartesian product** $A \\times B$ is all ordered pairs, with $|A| \\cdot |B|$ elements.

## Why engineers need this
Logic underlies **digital circuits** (AND, OR, NOT gates), **database queries** (WHERE conditions) and **program verification**. Sets are used in databases (relations are sets of rows), probability (events are sets of outcomes) and algorithms.`);

DEEP("DISK", "Kombinatorikk",
`## Fire grunnsituasjoner
Det meste av kombinatorikk handler om å avgjøre to ting: **betyr rekkefølgen noe**, og **kan samme ting velges flere ganger**?
- Rekkefølge, med gjentak: $n^k$ – PIN-koder, passord, bitstrenger.
- Rekkefølge, uten gjentak: $P(n,k) = \\dfrac{n!}{(n-k)!}$ – pallplasseringer, rekkefølge på oppgaver.
- Uten rekkefølge, uten gjentak: $\\binom{n}{k}$ – lag, komiteer, lottorekker.
- Uten rekkefølge, med gjentak: $\\binom{n+k-1}{k}$ – å velge $k$ kuler med is fra $n$ smaker (stjerner og streker).

## Additions- og multiplikasjonsprinsippet
Når valgene skjer **etter hverandre**, ganger vi. Når vi teller **adskilte tilfeller** som ikke overlapper, legger vi sammen. «Passord med 4 eller 5 sifre» gir $10^4 + 10^5$. Overlapper tilfellene, må du trekke fra det som er telt to ganger (**inklusjon–eksklusjon**).

## Komplementtelling
Ofte er det lettere å telle det du **ikke** vil ha. «Minst én» → alle minus «ingen». Antall bitstrenger av lengde 8 med minst én 1-er er $2^8 - 1 = 255$.

## Binomialkoeffisienter og Pascals trekant
$\\binom{n}{k}$ er tallene i **Pascals trekant**, der hvert tall er summen av de to over: $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$. **Binomialformelen** $(a+b)^n = \\sum_k \\binom{n}{k} a^{n-k} b^k$ forklarer navnet. Symmetrien $\\binom{n}{k} = \\binom{n}{n-k}$ sier at å velge hvem som er med, er det samme som å velge hvem som ikke er med.

## Duehullprinsippet
Legger du $n+1$ brev i $n$ hull, må minst ett hull få to. Enkelt, men kraftig: blant 367 personer har minst to samme bursdag, og enhver **hashfunksjon** som avbilder mange inndata på færre verdier, må ha **kollisjoner**.

## Anvendelser
- **Sikkerhet**: et passord med 12 tegn fra 70 mulige gir $70^{12} \\approx 1{,}4 \\cdot 10^{22}$ muligheter – lengde teller mer enn spesialtegn.
- **Algoritmer**: å sjekke alle delmengder er $2^n$ og alle rekkefølger $n!$ – det eksploderer raskt, og derfor trengs smartere metoder.
- **Sannsynlighet**: gunstige over mulige utfall når alle utfall er like sannsynlige.`,
`## Four basic situations
Most combinatorics comes down to two questions: **does order matter**, and **can the same item be chosen more than once**?
- Order, with repetition: $n^k$ – PIN codes, passwords, bit strings.
- Order, without repetition: $P(n,k) = \\dfrac{n!}{(n-k)!}$ – podium places, order of tasks.
- No order, no repetition: $\\binom{n}{k}$ – teams, committees, lottery rows.
- No order, with repetition: $\\binom{n+k-1}{k}$ – choosing $k$ scoops of ice cream from $n$ flavours (stars and bars).

## The sum and product rules
When choices happen **one after another**, multiply. When counting **separate cases** that do not overlap, add. "Passwords with 4 or 5 digits" gives $10^4 + 10^5$. If the cases overlap, subtract what is counted twice (**inclusion–exclusion**).

## Counting the complement
It is often easier to count what you **don't** want. "At least one" → all minus "none". The number of bit strings of length 8 with at least one 1 is $2^8 - 1 = 255$.

## Binomial coefficients and Pascal's triangle
$\\binom{n}{k}$ are the numbers in **Pascal's triangle**, where each number is the sum of the two above: $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$. The **binomial theorem** $(a+b)^n = \\sum_k \\binom{n}{k} a^{n-k} b^k$ explains the name. The symmetry $\\binom{n}{k} = \\binom{n}{n-k}$ says that choosing who is in is the same as choosing who is out.

## The pigeonhole principle
Put $n+1$ letters into $n$ holes and at least one hole gets two. Simple but powerful: among 367 people at least two share a birthday, and any **hash function** mapping many inputs to fewer values must have **collisions**.

## Applications
- **Security**: a 12-character password from 70 possible characters gives $70^{12} \\approx 1.4 \\cdot 10^{22}$ possibilities – length matters more than special characters.
- **Algorithms**: checking all subsets is $2^n$ and all orderings $n!$ – this explodes quickly, which is why smarter methods are needed.
- **Probability**: favourable over possible outcomes when all outcomes are equally likely.`);

DEEP("DISK", "Grafer og modulregning",
`## Grafer
En **graf** består av **noder** (hjørner) og **kanter** mellom dem. Den kan være **rettet** (enveiskjørte gater, lenker på nettet) eller urettet, og kantene kan ha **vekter** (avstand, kostnad, kapasitet).
- **Gradtallet** til en node er antall kanter den har. **Håndhilselemmaet**: summen av alle gradtall er $2 \\cdot$ antall kanter – derfor er antallet noder med odde grad alltid partall.
- En **sti** går langs kanter uten å gjenta noder; en **sykel** kommer tilbake til start. Et **tre** er en sammenhengende graf uten sykler; med $n$ noder har det alltid $n - 1$ kanter.
- **Euler-vei** (hver kant nøyaktig én gang) finnes hvis grafen er sammenhengende og har 0 eller 2 noder med odde grad – svaret på Königsberg-broene.
- Grafer lagres som **nabomatrise** ($n \\times n$) eller **nabolister** (best for glisne grafer).

## Viktige algoritmer
- **Bredde-først-søk** (BFS) finner korteste vei i antall kanter; **dybde-først-søk** (DFS) utforsker og finner sykler og sammenhengende komponenter.
- **Dijkstras algoritme** finner korteste vei med positive vekter – grunnlaget for ruteplanlegging og ruting i nettverk.
- **Minimalt spenntre** (Kruskal, Prim): billigste måte å koble sammen alle noder – kabler, rør, veier.

## Modulregning
$a \\bmod n$ er **resten** når $a$ deles på $n$. Vi skriver $a \\equiv b \\pmod n$ når $a$ og $b$ gir samme rest. Regning «på klokka»: 10 timer etter klokka 20 er klokka $30 \\bmod 24 = 6$.
- Du kan **redusere underveis**: $(a + b) \\bmod n$ og $(a \\cdot b) \\bmod n$ kan regnes med restene. Det gjør store potenser håndterbare – **rask potensering** ved gjentatt kvadrering.
- **Største felles divisor** finnes med **Euklids algoritme**: $\\gcd(a, b) = \\gcd(b, a \\bmod b)$.
- En **invers** til $a$ modulo $n$ finnes hvis og bare hvis $\\gcd(a, n) = 1$.

## Anvendelser
Modulregning er overalt i informatikk: **hashtabeller** (indeks = nøkkel mod tabellstørrelse), **kontrollsifre** (personnummer, ISBN, bankkontonummer med mod 11), **sykliske buffere**, tilfeldige tall og **kryptografi** – RSA bygger på at det er lett å regne potenser modulo et stort tall, men svært vanskelig å faktorisere det.`,
`## Graphs
A **graph** consists of **vertices** (nodes) and **edges** between them. It can be **directed** (one-way streets, web links) or undirected, and edges can have **weights** (distance, cost, capacity).
- The **degree** of a vertex is the number of edges it has. **The handshake lemma**: the sum of all degrees is $2 \\cdot$ the number of edges – so the number of odd-degree vertices is always even.
- A **path** follows edges without repeating vertices; a **cycle** returns to the start. A **tree** is a connected graph without cycles; with $n$ vertices it always has $n - 1$ edges.
- An **Euler path** (every edge exactly once) exists if the graph is connected and has 0 or 2 vertices of odd degree – the answer to the Königsberg bridges.
- Graphs are stored as an **adjacency matrix** ($n \\times n$) or **adjacency lists** (best for sparse graphs).

## Key algorithms
- **Breadth-first search** (BFS) finds the shortest path in number of edges; **depth-first search** (DFS) explores and finds cycles and connected components.
- **Dijkstra's algorithm** finds shortest paths with positive weights – the basis of route planning and network routing.
- **Minimum spanning tree** (Kruskal, Prim): the cheapest way to connect all vertices – cables, pipes, roads.

## Modular arithmetic
$a \\bmod n$ is the **remainder** when $a$ is divided by $n$. We write $a \\equiv b \\pmod n$ when $a$ and $b$ leave the same remainder. Clock arithmetic: 10 hours after 20:00 is $30 \\bmod 24 = 6$.
- You can **reduce as you go**: $(a + b) \\bmod n$ and $(a \\cdot b) \\bmod n$ can be computed from the remainders. This makes large powers manageable – **fast exponentiation** by repeated squaring.
- The **greatest common divisor** is found with **Euclid's algorithm**: $\\gcd(a, b) = \\gcd(b, a \\bmod b)$.
- An **inverse** of $a$ modulo $n$ exists if and only if $\\gcd(a, n) = 1$.

## Applications
Modular arithmetic is everywhere in computing: **hash tables** (index = key mod table size), **check digits** (national ID numbers, ISBN, bank account numbers with mod 11), **circular buffers**, random numbers and **cryptography** – RSA relies on it being easy to compute powers modulo a large number but very hard to factor it.`);

// ================= DATABASER OG NETTVERK =================
DEEP("DBNET", "Relasjonsdatabaser og SQL",
`## Relasjonsmodellen
En **relasjonsdatabase** lagrer data i **tabeller** (relasjoner) med **rader** (poster) og **kolonner** (attributter). Hver tabell har en **primærnøkkel** som identifiserer hver rad entydig, og tabeller kobles med **fremmednøkler** som peker på primærnøkkelen i en annen tabell. En ordre peker for eksempel på kunden med kolonnen kunde_id.

## Normalisering
Målet er å unngå **redundans** – at samme opplysning lagres flere steder og kan bli inkonsistent.
- **1NF**: hver celle har én verdi, ingen gjentatte grupper.
- **2NF**: alle kolonner avhenger av **hele** primærnøkkelen.
- **3NF**: ingen kolonner avhenger av andre ikke-nøkkelkolonner (postnummer → poststed hører i en egen tabell).

Et **ER-diagram** (entitet–relasjon) brukes til å modellere før man lager tabellene. Forhold kan være én-til-én, én-til-mange og mange-til-mange; det siste løses med en **koblingstabell**.

## SQL i et nøtteskall
- **SELECT** kolonner **FROM** tabell **WHERE** betingelse **ORDER BY** kolonne.
- **JOIN** kobler tabeller: INNER JOIN gir bare rader med treff i begge, LEFT JOIN beholder alle rader fra venstre tabell.
- **GROUP BY** med **aggregatfunksjoner** (COUNT, SUM, AVG, MIN, MAX); **HAVING** filtrerer grupper, mens WHERE filtrerer rader.
- **INSERT**, **UPDATE**, **DELETE** endrer data – glem aldri WHERE på UPDATE og DELETE.
- **CREATE TABLE** med datatyper og **begrensninger** (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE).

## Transaksjoner og ACID
En **transaksjon** er en gruppe operasjoner som skal skje helt eller ikke i det hele tatt – som en bankoverføring. **ACID** står for **atomisitet** (alt eller ingenting), **konsistens** (reglene holder), **isolasjon** (samtidige transaksjoner forstyrrer ikke hverandre) og **holdbarhet** (det som er bekreftet, overlever et strømbrudd).

## Ytelse og sikkerhet
**Indekser** gjør søk raske, men gjør innsetting litt tregere. **SQL-injeksjon** – at brukerens input tolkes som SQL – er en av de vanligste sikkerhetsfeilene; bruk alltid **parametriserte spørringer**. NoSQL-databaser (dokument, nøkkel–verdi, graf) er alternativer når data ikke passer i faste tabeller.`,
`## The relational model
A **relational database** stores data in **tables** (relations) with **rows** (records) and **columns** (attributes). Each table has a **primary key** that uniquely identifies each row, and tables are linked by **foreign keys** pointing to the primary key in another table. An order, for example, points to the customer with a customer_id column.

## Normalisation
The aim is to avoid **redundancy** – the same fact stored in several places that can become inconsistent.
- **1NF**: each cell holds one value, no repeating groups.
- **2NF**: every column depends on the **whole** primary key.
- **3NF**: no column depends on another non-key column (postcode → town belongs in a separate table).

An **ER diagram** (entity–relationship) is used to model before creating tables. Relationships can be one-to-one, one-to-many and many-to-many; the last is resolved with a **junction table**.

## SQL in a nutshell
- **SELECT** columns **FROM** table **WHERE** condition **ORDER BY** column.
- **JOIN** connects tables: INNER JOIN gives only rows matching in both, LEFT JOIN keeps all rows from the left table.
- **GROUP BY** with **aggregate functions** (COUNT, SUM, AVG, MIN, MAX); **HAVING** filters groups, while WHERE filters rows.
- **INSERT**, **UPDATE**, **DELETE** change data – never forget WHERE on UPDATE and DELETE.
- **CREATE TABLE** with data types and **constraints** (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE).

## Transactions and ACID
A **transaction** is a group of operations that must happen completely or not at all – like a bank transfer. **ACID** stands for **atomicity** (all or nothing), **consistency** (the rules hold), **isolation** (concurrent transactions do not interfere) and **durability** (what is committed survives a power cut).

## Performance and security
**Indexes** make searches fast but slow down inserts a little. **SQL injection** – user input interpreted as SQL – is one of the most common security flaws; always use **parameterised queries**. NoSQL databases (document, key–value, graph) are alternatives when data does not fit fixed tables.`);

DEEP("DBNET", "IP-nettverk og subnetting",
`## Lagmodellen
Nettverkskommunikasjon deles i **lag**, der hvert lag bruker tjenestene til laget under. I **TCP/IP-modellen**:
- **Linklaget**: overføring innen ett lokalt nett, med **MAC-adresser** (Ethernet, Wi-Fi). **Svitsjer** jobber her.
- **Nettverkslaget**: **IP** adresserer og **ruter** pakker mellom nett. **Rutere** jobber her.
- **Transportlaget**: **TCP** gir pålitelig, ordnet strøm med kvitteringer og retransmisjon (nett, e-post, filer); **UDP** er raskt uten garantier (video, spill, DNS). **Portnumre** skiller tjenester: 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS.
- **Applikasjonslaget**: HTTP, DNS, SMTP med flere.

## Adresser i praksis
- **Private adresser** (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) brukes innenfor hjem og bedrifter. **NAT** i ruteren oversetter dem til én offentlig adresse.
- **DHCP** deler ut IP-adresse, nettmaske, standard **gateway** og DNS-server automatisk.
- **ARP** finner MAC-adressen som hører til en IP-adresse i det lokale nettet.
- En maskin sender direkte til mottakere i **samme subnett**; alt annet går via **gatewayen**.

## Mer om subnetting
Prefikset bestemmer størrelsen: hver bit du låner fra vertsdelen, **halverer** subnettet og **dobler** antall subnett. Et /24 kan deles i to /25 (126 verter hver), fire /26 (62) eller åtte /27 (30). **VLSM** lar deg bruke ulike størrelser etter behov, for eksempel /30 (2 verter) for punkt-til-punkt-lenker mellom rutere. Planlegg alltid med vekst.

## IPv6
IPv4 har bare rundt 4,3 milliarder adresser, og de er brukt opp. **IPv6** har 128-bits adresser skrevet heksadesimalt (2001:db8::1), så mange at hver enhet kan få en offentlig adresse uten NAT.

## Feilsøking
**ping** tester om en maskin svarer, **traceroute/tracert** viser veien gjennom ruterne, **ipconfig/ip addr** viser egen konfigurasjon, og **nslookup** tester DNS. Ofte er problemet feil gateway, feil nettmaske eller DNS.`,
`## The layer model
Network communication is split into **layers**, each using the services of the layer below. In the **TCP/IP model**:
- **Link layer**: transfer within one local network, with **MAC addresses** (Ethernet, Wi-Fi). **Switches** work here.
- **Network layer**: **IP** addresses and **routes** packets between networks. **Routers** work here.
- **Transport layer**: **TCP** gives a reliable, ordered stream with acknowledgements and retransmission (web, email, files); **UDP** is fast with no guarantees (video, games, DNS). **Port numbers** separate services: 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS.
- **Application layer**: HTTP, DNS, SMTP and others.

## Addresses in practice
- **Private addresses** (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used inside homes and companies. **NAT** in the router translates them to one public address.
- **DHCP** hands out IP address, subnet mask, default **gateway** and DNS server automatically.
- **ARP** finds the MAC address belonging to an IP address on the local network.
- A host sends directly to receivers in the **same subnet**; everything else goes via the **gateway**.

## More on subnetting
The prefix sets the size: each bit borrowed from the host part **halves** the subnet and **doubles** the number of subnets. A /24 can be split into two /25 (126 hosts each), four /26 (62) or eight /27 (30). **VLSM** lets you use different sizes as needed, for example /30 (2 hosts) for point-to-point links between routers. Always plan for growth.

## IPv6
IPv4 has only about 4.3 billion addresses, and they have run out. **IPv6** has 128-bit addresses written in hexadecimal (2001:db8::1), so many that every device can have a public address without NAT.

## Troubleshooting
**ping** tests whether a host replies, **traceroute/tracert** shows the path through the routers, **ipconfig/ip addr** shows your own configuration, and **nslookup** tests DNS. Often the problem is a wrong gateway, wrong subnet mask or DNS.`);

DEEP("DBNET", "IKT-sikkerhet",
`## Hva skal beskyttes?
IKT-sikkerhet handler om å beskytte **konfidensialitet** (bare de rette får se), **integritet** (data endres ikke uautorisert) og **tilgjengelighet** (systemet virker når det trengs) – **KIT** (på engelsk CIA). En **risikovurdering** kombinerer **sannsynlighet** og **konsekvens** for å prioritere tiltakene.

## Vanlige angrep
- **Phishing** og **sosial manipulering**: falske e-poster eller telefoner som lurer folk til å gi fra seg passord eller klikke på skadelige lenker. Den vanligste veien inn.
- **Skadevare**: virus, ormer, trojanere og **løsepengevirus** (ransomware), som krypterer data og krever betaling.
- **Passordangrep**: gjetting, **credential stuffing** (lekkede passord prøvd på andre tjenester) og ordbokangrep mot lekkede hasher.
- **Tjenestenekt (DDoS)**: overbelastning fra mange maskiner samtidig.
- **Sårbarheter i programvare**: SQL-injeksjon, cross-site scripting, upatchede systemer.
- **Mann-i-midten**: avlytting eller endring av trafikk på usikre nett.

## Forsvar i flere lag
- **Autentisering**: lange passfraser, **passordhåndterer** og **flerfaktorautentisering** (MFA) – den mest effektive enkeltbarrieren mot kontokapring.
- **Minste privilegium**: brukere og programmer får bare de rettighetene de trenger.
- **Oppdateringer** (patching) tetter kjente hull; mange angrep utnytter sårbarheter som har hatt rettelse i månedsvis.
- **Kryptering**: TLS (HTTPS) for data i transport, kryptert disk for data i ro. Passord lagres som **saltede hasher** med en langsom algoritme, aldri i klartekst.
- **Brannmurer**, nettverkssegmentering og overvåking/logging.
- **Sikkerhetskopier** etter 3-2-1-regelen (tre kopier, to medier, én utenfor huset) – og test at gjenoppretting virker. Det er det beste vernet mot løsepengevirus.
- **Opplæring** av brukerne.

## Regelverk og hendelseshåndtering
**GDPR** krever at personopplysninger sikres, og at brudd meldes til **Datatilsynet** innen 72 timer. **NSM** (Nasjonal sikkerhetsmyndighet) gir grunnprinsipper for IKT-sikkerhet. Ved en hendelse: **oppdag, begrens, fjern, gjenopprett og lær** – og ha planen klar på forhånd.`,
`## What must be protected?
ICT security is about protecting **confidentiality** (only the right people can see), **integrity** (data is not changed without authorisation) and **availability** (the system works when needed) – the **CIA** triad. A **risk assessment** combines **likelihood** and **impact** to prioritise measures.

## Common attacks
- **Phishing** and **social engineering**: fake emails or calls that trick people into giving away passwords or clicking malicious links. The most common way in.
- **Malware**: viruses, worms, trojans and **ransomware**, which encrypts data and demands payment.
- **Password attacks**: guessing, **credential stuffing** (leaked passwords tried on other services) and dictionary attacks on leaked hashes.
- **Denial of service (DDoS)**: overload from many machines at once.
- **Software vulnerabilities**: SQL injection, cross-site scripting, unpatched systems.
- **Man-in-the-middle**: eavesdropping on or altering traffic on insecure networks.

## Defence in depth
- **Authentication**: long passphrases, a **password manager** and **multi-factor authentication** (MFA) – the single most effective barrier against account takeover.
- **Least privilege**: users and programs get only the rights they need.
- **Updates** (patching) close known holes; many attacks exploit vulnerabilities that have had fixes for months.
- **Encryption**: TLS (HTTPS) for data in transit, encrypted disks for data at rest. Passwords are stored as **salted hashes** with a slow algorithm, never in plain text.
- **Firewalls**, network segmentation and monitoring/logging.
- **Backups** following the 3-2-1 rule (three copies, two media, one off-site) – and test that restoring works. It is the best defence against ransomware.
- **User training**.

## Regulation and incident response
**GDPR** requires personal data to be secured and breaches to be reported to the **Data Protection Authority** within 72 hours. **NSM** (the Norwegian National Security Authority) publishes basic principles for ICT security. During an incident: **detect, contain, eradicate, recover and learn** – and have the plan ready in advance.`);

// ================= ELKRAFT =================
DEEP("ELKR", "Transformatoren",
`## Hvordan transformatoren virker
Vekselstrømmen i **primærviklingen** lager et magnetfelt som hele tiden skifter retning. **Jernkjernen** leder feltet gjennom **sekundærviklingen**, der den varierende fluksen **induserer** en spenning (Faradays induksjonslov). Hver vinding får samme spenning, så spenningen blir proporsjonal med antall vindinger. Ingen strøm går mellom viklingene – energien overføres **magnetisk**, og viklingene er **galvanisk skilt**, noe som også gir sikkerhet.

## Tap og virkningsgrad
En virkelig transformator har tap:
- **Jerntap** (tomgangstap): **hysterese** (kjernen magnetiseres om og om igjen) og **virvelstrømmer** i kjernen. Kjernen lages av tynne, isolerte **blikk** for å holde virvelstrømmene nede. Jerntapet er omtrent konstant så lenge spenningen er den samme – også uten last.
- **Kobbertap** (belastningstap): $I^2 R$ i viklingene. Øker med kvadratet av lasten.
- Virkningsgraden er høyest når kobbertapet er omtrent lik jerntapet.

Tapene blir til **varme**, som må ledes bort. Store transformatorer er fylt med **olje** for kjøling og isolasjon; små er tørrisolerte.

## Tomgang, kortslutning og merkeskilt
- **Tomgangsprøve**: full spenning, ingen last – måler jerntap og magnetiseringsstrøm.
- **Kortslutningsprøve**: sekundærsiden kortsluttes, og spenningen økes til merkestrøm går – måler kobbertap og **kortslutningsspenningen** $u_k$ (ofte 4–10 %). Lav $u_k$ gir liten spenningsvariasjon med lasten, men store kortslutningsstrømmer.
- På merkeskiltet står **merkeeffekt** (kVA), spenninger, frekvens, $u_k$ og **koblingsgruppe** (for eksempel Dyn11 for distribusjonstransformatorer: trekant på høyspent, stjerne med nøytralleder på lavspent).

## I kraftsystemet
Generatorspenningen (ofte 10–20 kV) transformeres **opp** til 132–420 kV for overføring, deretter **ned** til regionalnett, distribusjonsnett (typisk 22 kV eller 11 kV) og til slutt 230 V eller 400 V hos forbrukeren. I tillegg finnes **måletransformatorer** (strøm- og spenningstransformatorer) som skalerer ned til verdier som instrumenter og vern kan håndtere.`,
`## How the transformer works
The alternating current in the **primary winding** creates a magnetic field that constantly changes direction. The **iron core** guides the field through the **secondary winding**, where the changing flux **induces** a voltage (Faraday's law of induction). Each turn gets the same voltage, so the voltage is proportional to the number of turns. No current flows between the windings – energy is transferred **magnetically**, and the windings are **galvanically isolated**, which also improves safety.

## Losses and efficiency
A real transformer has losses:
- **Iron losses** (no-load losses): **hysteresis** (the core is magnetised back and forth) and **eddy currents** in the core. The core is made of thin, insulated **laminations** to keep eddy currents down. Iron loss is roughly constant as long as the voltage is the same – even with no load.
- **Copper losses** (load losses): $I^2 R$ in the windings. They rise with the square of the load.
- Efficiency is highest when copper loss is roughly equal to iron loss.

The losses become **heat**, which must be removed. Large transformers are filled with **oil** for cooling and insulation; small ones are dry-type.

## No-load, short-circuit and the rating plate
- **Open-circuit test**: full voltage, no load – measures iron loss and magnetising current.
- **Short-circuit test**: the secondary is short-circuited and the voltage raised until rated current flows – measures copper loss and the **short-circuit voltage** $u_k$ (often 4–10 %). A low $u_k$ gives little voltage variation with load, but large short-circuit currents.
- The rating plate shows **rated power** (kVA), voltages, frequency, $u_k$ and the **vector group** (for example Dyn11 for distribution transformers: delta on the high-voltage side, star with neutral on the low-voltage side).

## In the power system
Generator voltage (often 10–20 kV) is stepped **up** to 132–420 kV for transmission, then **down** to regional networks, distribution networks (typically 22 kV or 11 kV) and finally 230 V or 400 V for consumers. There are also **instrument transformers** (current and voltage transformers) that scale down to values instruments and protection relays can handle.`);

DEEP("ELKR", "Elektriske motorer",
`## Fra strøm til bevegelse
Alle elektriske motorer bygger på at en strømførende leder i et magnetfelt får en **kraft** ($F = BIL$). Motoren har en fast del, **statoren**, og en roterende del, **rotoren**. Den mekaniske effekten er
$$P = T \\cdot \\omega = T \\cdot \\frac{2\\pi n}{60},$$
der $T$ er dreiemomentet i Nm og $n$ turtallet i o/min.

## Asynkronmotoren – industriens arbeidshest
Den **trefasede asynkronmotoren** (induksjonsmotoren) er robust, billig og nesten vedlikeholdsfri. De tre fasene i statoren lager et **roterende magnetfelt** med **synkront turtall**
$$n_s = \\frac{60 f}{p},$$
der $p$ er antall **polpar**. Ved 50 Hz gir ett polpar 3000 o/min, to polpar 1500 o/min. Feltet induserer strømmer i **kortslutningsrotoren** («ekornburet»), og rotoren drar etter feltet – men alltid litt **saktere**. Forskjellen kalles **sakking** (slip): $s = \\dfrac{n_s - n}{n_s}$, typisk 2–6 % ved full last.
- **Startstrømmen** kan være 5–8 ganger merkestrømmen. Derfor brukes ofte **stjerne-trekant-start**, mykstarter eller **frekvensomformer**.
- **Frekvensomformeren** endrer frekvensen og dermed turtallet trinnløst. Den sparer mye energi i pumper og vifter, der effekten øker omtrent med turtallet i tredje potens.
- **Snu rotasjonsretningen** ved å bytte to av fasene.

## Andre motortyper
- **Synkronmotoren** går nøyaktig med synkront turtall; rotoren har permanentmagneter eller magnetiseres med likestrøm. **Permanentmagnetmotorer** har høy virkningsgrad og brukes i elbiler.
- **Likestrømsmotoren** gir enkel turtallsregulering og høyt startmoment; turtallet er omtrent proporsjonalt med spenningen.
- **Børsteløse DC-motorer** og **trinnmotorer** brukes i droner, datautstyr og presis posisjonering.

## Merkeskilt og drift
På merkeskiltet står avgitt **mekanisk** merkeeffekt, spenning (for eksempel 400 V Y / 230 V Δ), merkestrøm, turtall, $\\cos\\varphi$ og virkningsgrad. Tilført elektrisk effekt er $P_{inn} = \\sqrt3\\, U I \\cos\\varphi$, og $\\eta = P_{ut}/P_{inn}$. Motoren må beskyttes mot **overlast** (motorvern) og kortslutning. Motorer står for en stor del av industriens strømforbruk, så **virkningsgradsklasser** (IE1–IE4) har stor betydning for energibruken.`,
`## From current to motion
All electric motors rely on a current-carrying conductor in a magnetic field experiencing a **force** ($F = BIL$). The motor has a fixed part, the **stator**, and a rotating part, the **rotor**. The mechanical power is
$$P = T \\cdot \\omega = T \\cdot \\frac{2\\pi n}{60},$$
where $T$ is torque in Nm and $n$ the speed in rpm.

## The induction motor – the workhorse of industry
The **three-phase induction motor** (asynchronous motor) is robust, cheap and almost maintenance-free. The three phases in the stator create a **rotating magnetic field** with **synchronous speed**
$$n_s = \\frac{60 f}{p},$$
where $p$ is the number of **pole pairs**. At 50 Hz one pole pair gives 3000 rpm, two pole pairs 1500 rpm. The field induces currents in the **squirrel-cage rotor**, and the rotor follows the field – but always a little **slower**. The difference is called **slip**: $s = \\dfrac{n_s - n}{n_s}$, typically 2–6 % at full load.
- **Starting current** can be 5–8 times rated current. That is why **star–delta starting**, soft starters or **variable frequency drives** are often used.
- The **variable frequency drive** changes the frequency and thus the speed continuously. It saves a lot of energy in pumps and fans, where power rises roughly with the cube of speed.
- **Reverse the direction** by swapping two of the phases.

## Other motor types
- **The synchronous motor** runs at exactly synchronous speed; the rotor has permanent magnets or is excited with DC. **Permanent magnet motors** have high efficiency and are used in electric cars.
- **The DC motor** gives simple speed control and high starting torque; speed is roughly proportional to voltage.
- **Brushless DC motors** and **stepper motors** are used in drones, computer equipment and precise positioning.

## Rating plate and operation
The rating plate shows rated **mechanical** output power, voltage (for example 400 V Y / 230 V Δ), rated current, speed, $\\cos\\varphi$ and efficiency. Electrical input power is $P_{in} = \\sqrt3\\, U I \\cos\\varphi$, and $\\eta = P_{out}/P_{in}$. The motor must be protected against **overload** (motor protection) and short circuits. Motors account for a large share of industrial electricity use, so **efficiency classes** (IE1–IE4) matter a great deal for energy use.`);

DEEP("ELKR", "Kraftsystemet og energi",
`## Det norske kraftsystemet
Norge har et kraftsystem som er unikt i verden: rundt **90 %** av produksjonen kommer fra **vannkraft**, og resten hovedsakelig fra **vindkraft**, med litt varmekraft og sol. Vannkraft kan **reguleres** – magasinene lagrer energi fra snøsmelting og nedbør, og produksjonen kan økes og senkes raskt etter behov. Det gjør vannkraften svært verdifull i et Europa med mer uregulerbar sol- og vindkraft.

## Nettet i tre nivåer
- **Transmisjonsnettet** (tidligere sentralnettet), 300–420 kV, binder sammen landsdelene og har **utenlandsforbindelser** til Sverige, Danmark, Finland, Nederland, Tyskland og Storbritannia. **Statnett** er systemansvarlig og eier det meste.
- **Regionalnettet**, typisk 33–132 kV.
- **Distribusjonsnettet**, 22 kV ned til 230/400 V, eid av lokale nettselskaper.

Statnett må sørge for **momentan balanse** mellom produksjon og forbruk. Ubalanse viser seg som avvik i **frekvensen** fra 50 Hz: mer forbruk enn produksjon får frekvensen til å falle. **Reserver** som automatisk øker eller senker produksjonen, holder frekvensen stabil.

## Kraftmarkedet
Kraft omsettes på kraftbørsen **Nord Pool**. Prisen settes time for time (og nå i kortere intervaller) der tilbud møter etterspørsel. Norge er delt i fem **prisområder** (NO1–NO5); når nettet mellom områdene er fullt, kan prisene bli svært ulike. Strømregningen består av **kraftpris**, **nettleie** (til nettselskapet) og **avgifter**.

## Energi og effekt
Skillet er viktig: **effekt** (kW, MW) er hvor raskt energi brukes eller produseres i øyeblikket, mens **energi** (kWh, GWh, TWh) er effekt ganger tid. Norges årlige kraftproduksjon er i størrelsesorden 150 TWh. Nettet må dimensjoneres for **effekttoppene** – kalde vintermorgener – ikke for snittforbruket. Derfor har nettleien et **effektledd**, og det lønner seg å flytte forbruk (elbillading, varmtvann) bort fra toppene.

## Overføringstap og spenning
Tapet i en linje er $P_{tap} = I^2 R$. For en gitt effekt er $I = P/U$, så tapet blir
$$P_{tap} = \\frac{P^2 R}{U^2}.$$
Dobles spenningen, blir tapet **en firedel**. Det er grunnen til at kraft overføres på svært høy spenning. Lange sjøkabler bruker ofte **likestrøm** (HVDC), fordi vekselstrøm i kabler gir store ladestrømmer.

## Energiomstillingen
Elektrifisering av transport, industri og sokkel øker forbruket, mens ny produksjon og nett tar tid å bygge. **Energieffektivisering** (varmepumper, etterisolering, effektive motorer) er ofte den billigste «nye» energien.`,
`## The Norwegian power system
Norway has a power system unique in the world: around **90 %** of production comes from **hydropower**, the rest mainly from **wind**, with a little thermal power and solar. Hydropower can be **regulated** – reservoirs store energy from snowmelt and rainfall, and output can be raised and lowered quickly as needed. This makes hydropower very valuable in a Europe with more variable solar and wind.

## The grid in three levels
- **The transmission grid**, 300–420 kV, links the regions and has **interconnectors** to Sweden, Denmark, Finland, the Netherlands, Germany and the UK. **Statnett** is the system operator and owns most of it.
- **The regional grid**, typically 33–132 kV.
- **The distribution grid**, 22 kV down to 230/400 V, owned by local grid companies.

Statnett must ensure **instantaneous balance** between production and consumption. Imbalance shows up as deviation of the **frequency** from 50 Hz: more consumption than production makes the frequency fall. **Reserves** that automatically raise or lower output keep the frequency stable.

## The power market
Electricity is traded on the **Nord Pool** exchange. The price is set hour by hour (and now in shorter intervals) where supply meets demand. Norway is divided into five **price areas** (NO1–NO5); when the lines between areas are full, prices can differ widely. The electricity bill consists of the **energy price**, **grid tariff** (to the grid company) and **taxes**.

## Energy and power
The distinction matters: **power** (kW, MW) is how fast energy is used or produced at a given moment, while **energy** (kWh, GWh, TWh) is power times time. Norway's annual power production is on the order of 150 TWh. The grid must be sized for **peak demand** – cold winter mornings – not average use. That is why the grid tariff has a **capacity charge**, and it pays to shift consumption (EV charging, hot water) away from the peaks.

## Transmission losses and voltage
The loss in a line is $P_{loss} = I^2 R$. For a given power $I = P/U$, so the loss becomes
$$P_{loss} = \\frac{P^2 R}{U^2}.$$
Double the voltage and the loss falls to **a quarter**. That is why power is transmitted at very high voltage. Long subsea cables often use **direct current** (HVDC), because alternating current in cables causes large charging currents.

## The energy transition
Electrification of transport, industry and offshore installations increases demand, while new production and grids take time to build. **Energy efficiency** (heat pumps, insulation, efficient motors) is often the cheapest "new" energy.`);

// ================= GEOTEKNIKK =================
DEEP("GEO", "Jord og klassifisering",
`## Hvordan norsk jord ble til
Nesten all løsmasse i Norge er avsatt etter **siste istid**. Isbreene knuste fjell og la igjen **morene** – en usortert blanding av alt fra leire til blokker, ofte fast og god å bygge på. Smeltevannselver sorterte materialet i **sand og grus** (breelvavsetninger). Da isen trakk seg tilbake, lå store områder under havet, og fine partikler sank til bunns som **marin leire**. Landhevingen løftet senere leira over havet – den **marine grensen** ligger opptil omkring 220 moh. i Oslo-området og Trøndelag.

## Kvikkleire
Den marine leira ble avsatt i saltvann, der saltet fungerte som «lim» mellom leirpartiklene i en åpen kortstokkstruktur. Når grunnvann over tusenvis av år **vasker ut saltet**, beholder leira strukturen, men mister limet. Det er **kvikkleire**: fast i uforstyrret tilstand, men ved omrøring kollapser den og blir flytende. Små inngrep – en utgraving, en fylling, erosjon i en bekk – kan utløse **skred** som brer seg bakover som en domino (Rissa 1978, Gjerdrum 2020). Kvikkleire kan bare finnes **under marin grense**, og NVE kartlegger faresoner.

## Klassifisering
- **Kornfordeling**: grove masser (grus, sand) sorteres med **sikteanalyse**, fine masser (silt, leire) med **slemmeanalyse** (sedimentasjon). Kornfordelingskurven viser om massen er **velgradert** (mange størrelser, pakker seg godt) eller ensgradert.
- **Kohesjonsjord** (leire) har styrke fra bindinger mellom partiklene og tetthet som gjør at vann beveger seg sakte. **Friksjonsjord** (sand, grus) har styrke fra friksjon mellom kornene og drenerer raskt.
- **Vanninnhold** $w$ = vannets masse / tørrstoffets masse, og **konsistensgrensene** (flytegrense, plastisitetsgrense) beskriver hvor plastisk en leire er.
- **Sensitivitet** $S_t$ = uforstyrret skjærfasthet / omrørt skjærfasthet. Kvikkleire har svært høy sensitivitet og omrørt skjærfasthet under 0,5 kPa.

## Grunnundersøkelser
Før man bygger, må grunnen undersøkes: **sonderinger** (dreietrykk, totalsondering) gir lagdeling og dybde til fjell, **CPTU** (trykksondering med poretrykksmåling) gir styrke og lagdeling, og **prøvetaking** med stempelprøver gir uforstyrrede leirprøver til laboratoriet. **Grunnvannsmålinger** med piezometre er nødvendig for å regne effektivspenninger.`,
`## How Norwegian soils formed
Almost all loose deposits in Norway were laid down after the **last ice age**. Glaciers crushed bedrock and left **moraine** (till) – an unsorted mix of everything from clay to boulders, often dense and good to build on. Meltwater rivers sorted the material into **sand and gravel** (glaciofluvial deposits). As the ice retreated, large areas lay under the sea, and fine particles settled as **marine clay**. Land uplift later raised the clay above sea level – the **marine limit** reaches about 220 m above sea level around Oslo and Trøndelag.

## Quick clay
Marine clay was deposited in salt water, where the salt acted as "glue" between clay particles in an open, house-of-cards structure. When groundwater **leaches out the salt** over thousands of years, the clay keeps its structure but loses the glue. That is **quick clay**: firm when undisturbed, but when remoulded it collapses and becomes liquid. Small interventions – an excavation, a fill, stream erosion – can trigger **landslides** that spread backwards like dominoes (Rissa 1978, Gjerdrum 2020). Quick clay can only occur **below the marine limit**, and NVE maps hazard zones.

## Classification
- **Grain size distribution**: coarse soils (gravel, sand) are sorted by **sieve analysis**, fine soils (silt, clay) by **hydrometer analysis** (sedimentation). The grading curve shows whether the soil is **well graded** (many sizes, packs well) or uniformly graded.
- **Cohesive soils** (clay) gain strength from bonds between particles and are so tight that water moves slowly. **Frictional soils** (sand, gravel) gain strength from friction between grains and drain quickly.
- **Water content** $w$ = mass of water / mass of solids, and the **consistency limits** (liquid limit, plastic limit) describe how plastic a clay is.
- **Sensitivity** $S_t$ = undisturbed shear strength / remoulded shear strength. Quick clay has very high sensitivity and remoulded shear strength below 0.5 kPa.

## Site investigations
Before building, the ground must be investigated: **soundings** (rotary pressure, total sounding) give layering and depth to bedrock, **CPTU** (cone penetration with pore pressure) gives strength and layering, and **sampling** with piston samplers gives undisturbed clay samples for the laboratory. **Groundwater measurements** with piezometers are needed to calculate effective stresses.`);

DEEP("GEO", "Effektivspenning og setninger",
`## Hvorfor effektivspenning styrer alt
Jord er et skjelett av korn med porer fylt av vann (og luft). En last fordeles mellom **kornskjelettet** og **porevannet**. Vann har ingen skjærstyrke, så det er bare den delen kornene bærer – **effektivspenningen** – som bestemmer både **styrken** (friksjonen mellom kornene) og **deformasjonene**. Endrer du poretrykket, endrer du jordas styrke uten å røre lasten. Derfor er kraftig regn og høyt grunnvann ofte utløsende for skred.

## Konsolidering
Når en ny last (en fylling eller et bygg) settes på en **mettet leire**, kan vannet ikke strømme ut med én gang. Først bæres lasten av et **poreovertrykk**. Etter hvert som vannet presses ut, overføres lasten gradvis til kornene, effektivspenningen øker, og leira **setter seg**. Denne prosessen – **konsolidering** – kan ta **år til tiår** i tykke leirlag, fordi leire har svært lav permeabilitet. Konsolideringstiden øker med **kvadratet** av dreneringsveien: et dobbelt så tykt lag tar fire ganger så lang tid. **Vertikaldren** kan korte ned veien og fremskynde setningene.

## Normalkonsolidert og overkonsolidert leire
- **Forkonsolideringsspenningen** $p_c'$ er den største effektivspenningen leira har vært utsatt for tidligere.
- **Overkonsolidert** leire (belastet mer før, for eksempel av is eller erodert overlagring) er stiv så lenge den nye spenningen holder seg under $p_c'$ – setningene blir små.
- **Normalkonsolidert** leire ($\\sigma' \\approx p_c'$) er mye mykere: selv små tilleggslaster gir store setninger.
- Ødometerforsøket i laboratoriet gir sammenhengen mellom spenning og tøyning, og dermed modulen $M$.

## Typer setninger
- **Umiddelbar** (elastisk) setning, mest i sand.
- **Konsolideringssetning** i leire, som beskrevet over.
- **Kryp** (sekundær setning), som fortsetter langsomt etter at poreovertrykket er borte.

**Ulike setninger** under et bygg (differensialsetninger) gir skjeve gulv og sprekker, og er ofte et større problem enn store, jevne setninger.

## Grunnvannssenking
Senkes grunnvannet – for eksempel ved en byggegrop med lekkasje eller en tunnel – synker poretrykket, effektivspenningen øker, og leira under nabobyggene kan sette seg. Mange eldre bygg i Oslo står på **trepeler** som råtner hvis de kommer over grunnvannet. Derfor overvåkes poretrykket nøye i store byggeprosjekter, og man **infiltrerer** vann ved behov.`,
`## Why effective stress governs everything
Soil is a skeleton of grains with pores filled with water (and air). A load is shared between the **grain skeleton** and the **pore water**. Water has no shear strength, so only the part carried by the grains – the **effective stress** – determines both **strength** (friction between grains) and **deformation**. Change the pore pressure and you change the soil's strength without touching the load. That is why heavy rain and high groundwater often trigger landslides.

## Consolidation
When a new load (a fill or building) is placed on a **saturated clay**, the water cannot flow out at once. At first the load is carried by **excess pore pressure**. As water is squeezed out, the load is gradually transferred to the grains, effective stress rises, and the clay **settles**. This process – **consolidation** – can take **years to decades** in thick clay layers, because clay has very low permeability. Consolidation time increases with the **square** of the drainage path: a layer twice as thick takes four times as long. **Vertical drains** can shorten the path and speed up settlement.

## Normally consolidated and overconsolidated clay
- **The preconsolidation stress** $p_c'$ is the largest effective stress the clay has experienced before.
- **Overconsolidated** clay (loaded more in the past, for example by ice or since-eroded overburden) is stiff as long as the new stress stays below $p_c'$ – settlements are small.
- **Normally consolidated** clay ($\\sigma' \\approx p_c'$) is much softer: even small additional loads cause large settlements.
- The oedometer test in the laboratory gives the stress–strain relationship and thus the modulus $M$.

## Types of settlement
- **Immediate** (elastic) settlement, mostly in sand.
- **Consolidation settlement** in clay, as described above.
- **Creep** (secondary settlement), which continues slowly after the excess pore pressure is gone.

**Uneven settlement** under a building (differential settlement) causes sloping floors and cracks, and is often a bigger problem than large, uniform settlement.

## Groundwater lowering
If the groundwater is lowered – for example by a leaking excavation or a tunnel – pore pressure falls, effective stress rises, and the clay under neighbouring buildings can settle. Many older buildings in Oslo stand on **timber piles** that rot if they end up above the groundwater. That is why pore pressure is closely monitored in large construction projects, and water is **infiltrated** when needed.`);

DEEP("GEO", "Jordtrykk, bæreevne og stabilitet",
`## Jordtrykk mot konstruksjoner
En vegg som holder igjen jord, får et **jordtrykk** som avhenger av hvor mye veggen beveger seg:
- **Hviletrykk** ($K_0$): veggen står helt stille, som en kjellervegg støpt mot fjell. For normalkonsolidert jord er $K_0 \\approx 1 - \\sin\\varphi'$.
- **Aktivt trykk** ($K_a$): veggen beveger seg litt **bort** fra jorda, som en støttemur som får gi seg. Jorda «henger seg på» og trykket blir **minst**.
- **Passivt trykk** ($K_p$): veggen presses **mot** jorda, som foten av en spunt. Motstanden blir **størst**, men krever store bevegelser for å mobiliseres.

For friksjonsjord etter Rankine: $K_a = \\tan^2(45° - \\varphi/2)$ og $K_p = \\tan^2(45° + \\varphi/2)$. Med $\\varphi = 30°$ blir $K_a = 1/3$ og $K_p = 3$. Jordtrykket øker lineært med dybden, og **vanntrykk** kommer i tillegg – derfor må støttemurer **dreneres**.

## Bæreevne
Et fundament kan svikte ved at jorda under **skjærer** ut til siden (brudd), eller ved at det **setter seg** for mye (bruksgrense). Bæreevnen avhenger av jordas styrke, fundamentets bredde og **dybde**: et fundament som er satt dypere, får motvekt fra jorda ved siden av. For leire under rask belastning (**udrenert**) styres bæreevnen av udrenert skjærfasthet $c_u$; for sand (**drenert**) av friksjonsvinkelen $\\varphi'$. Når grunnen er for dårlig, brukes **peler** ned til fjell eller fast grunn, **kompensert fundamentering** (fjerne like mye jord som bygget veier) eller grunnforsterkning som **kalk-sement-stabilisering**.

## Skråningsstabilitet
Stabiliteten uttrykkes med en **sikkerhetsfaktor**
$$F = \\frac{\\text{tilgjengelig skjærfasthet}}{\\text{nødvendig skjærfasthet for likevekt}}.$$
$F = 1$ betyr at skråningen så vidt står. Byggeforskriftene krever en betydelig margin, og strengere krav i kvikkleireområder. Beregningene gjøres med **glideflatemetoder**: man prøver mange mulige glideflater og finner den med lavest $F$.

Stabiliteten **reduseres** av: fylling på toppen, graving i foten, erosjon fra bekker og elver, høyt poretrykk etter nedbør og snøsmelting, og vibrasjoner i sensitiv leire. Den **bedres** av: avlastning på toppen, motfylling i foten, drenering og erosjonssikring. Mange kvikkleireskred starter som et lite utglidning ved en bekk og forplanter seg bakover – derfor er **erosjonssikring** et av de viktigste tiltakene.`,
`## Earth pressure on structures
A wall retaining soil feels an **earth pressure** that depends on how much the wall moves:
- **At-rest pressure** ($K_0$): the wall does not move at all, like a basement wall cast against rock. For normally consolidated soil $K_0 \\approx 1 - \\sin\\varphi'$.
- **Active pressure** ($K_a$): the wall moves slightly **away** from the soil, like a retaining wall allowed to yield. The soil "holds itself up" and the pressure is **lowest**.
- **Passive pressure** ($K_p$): the wall is pushed **into** the soil, like the toe of a sheet pile. The resistance is **greatest**, but needs large movements to mobilise.

For frictional soil, after Rankine: $K_a = \\tan^2(45° - \\varphi/2)$ and $K_p = \\tan^2(45° + \\varphi/2)$. With $\\varphi = 30°$, $K_a = 1/3$ and $K_p = 3$. Earth pressure rises linearly with depth, and **water pressure** comes on top – that is why retaining walls must be **drained**.

## Bearing capacity
A foundation can fail by the soil beneath **shearing** out sideways (failure), or by **settling** too much (serviceability). Bearing capacity depends on the soil's strength, the foundation's width and **depth**: a deeper foundation gains counterweight from the soil beside it. For clay under rapid loading (**undrained**) bearing capacity is governed by undrained shear strength $c_u$; for sand (**drained**) by the friction angle $\\varphi'$. When the ground is too poor, **piles** to rock or firm ground, **compensated foundations** (removing as much soil as the building weighs) or ground improvement such as **lime–cement stabilisation** are used.

## Slope stability
Stability is expressed by a **factor of safety**
$$F = \\frac{\\text{available shear strength}}{\\text{shear strength needed for equilibrium}}.$$
$F = 1$ means the slope is just standing. Building regulations require a considerable margin, with stricter demands in quick clay areas. Calculations use **slip surface methods**: many possible slip surfaces are tried to find the one with the lowest $F$.

Stability is **reduced** by: fill at the top, excavation at the toe, erosion by streams and rivers, high pore pressure after rain and snowmelt, and vibrations in sensitive clay. It is **improved** by: unloading the top, counterfill at the toe, drainage and erosion protection. Many quick clay slides begin as a small slip by a stream and propagate backwards – that is why **erosion protection** is among the most important measures.`);

// ================= MASKINLÆRING =================
DEEP("ML", "Data og grunnbegreper",
`## Hva er maskinlæring?
I vanlig programmering skriver vi **reglene** selv. I maskinlæring gir vi datamaskinen **eksempler**, og den finner reglene – en **modell** – ved å tilpasse parametere slik at feilen blir minst mulig. Tre hovedformer:
- **Veiledet læring**: dataene har **fasit** (merkelapper). **Regresjon** forutsier et tall (boligpris), **klassifisering** en kategori (spam/ikke spam).
- **Ikke-veiledet læring**: ingen fasit. Modellen finner **struktur**, for eksempel **klynger** av like kunder eller færre dimensjoner (PCA).
- **Forsterkende læring**: en agent lærer ved å prøve og få **belønning** – spill, robotstyring.

## Data er det viktigste
«Søppel inn, søppel ut.» Det meste av arbeidet i et ML-prosjekt er å samle, rense og forstå dataene:
- **Egenskaper** (features) er inndataene; **målvariabelen** er det vi vil forutsi.
- **Manglende verdier** må fjernes eller fylles inn; **uteliggere** må undersøkes.
- **Kategoriske** variabler gjøres om til tall, for eksempel med **one-hot-koding**.
- **Skalering** (normalisering eller standardisering) gjør at egenskaper med store tall ikke dominerer, og at gradientnedstigning konvergerer raskere.
- **Skjevhet i dataene** (bias) gir skjeve modeller: er en gruppe underrepresentert, blir modellen dårligere for den.

## Trening, validering og test
Dataene deles i **treningssett** (modellen lærer), **valideringssett** (velge modell og hyperparametere) og **testsett** (én endelig, ærlig vurdering). Testdata må **aldri** brukes under utviklingen – da måler man bare hvor godt modellen har lært testsettet utenat. **Kryssvalidering** roterer hvilken del som brukes til validering, og gir et mer stabilt estimat når dataene er få. Pass også på **datalekkasje**: informasjon fra fremtiden eller fra målvariabelen som sniker seg inn i egenskapene.

## Over- og undertilpasning
- **Undertilpasning** (underfitting): modellen er for enkel og bommer både på trening og test.
- **Overtilpasning** (overfitting): modellen pugger støyen i treningsdataene og generaliserer dårlig – lav treningsfeil, høy testfeil.
- Botemidler: mer data, enklere modell, **regularisering** (straff for store vekter), tidlig stopp og dropout i nevrale nett.

Dette er **bias–varians-avveiningen**: enkle modeller har høy bias, komplekse høy varians. Målet er balansen som gir lavest feil på **nye** data.`,
`## What is machine learning?
In ordinary programming we write the **rules** ourselves. In machine learning we give the computer **examples**, and it finds the rules – a **model** – by adjusting parameters so that the error is as small as possible. Three main forms:
- **Supervised learning**: the data have **labels**. **Regression** predicts a number (house price), **classification** a category (spam/not spam).
- **Unsupervised learning**: no labels. The model finds **structure**, for example **clusters** of similar customers or fewer dimensions (PCA).
- **Reinforcement learning**: an agent learns by trial and **reward** – games, robot control.

## Data matter most
"Garbage in, garbage out." Most of the work in an ML project is collecting, cleaning and understanding the data:
- **Features** are the inputs; the **target** is what we want to predict.
- **Missing values** must be removed or imputed; **outliers** must be investigated.
- **Categorical** variables are converted to numbers, for example with **one-hot encoding**.
- **Scaling** (normalisation or standardisation) stops features with large numbers from dominating and helps gradient descent converge faster.
- **Bias in the data** gives biased models: if a group is under-represented, the model performs worse for it.

## Training, validation and test
The data are split into a **training set** (the model learns), a **validation set** (choosing model and hyperparameters) and a **test set** (one final, honest assessment). Test data must **never** be used during development – otherwise you only measure how well the model has memorised the test set. **Cross-validation** rotates which part is used for validation and gives a more stable estimate when data are scarce. Also watch out for **data leakage**: information from the future or from the target sneaking into the features.

## Under- and overfitting
- **Underfitting**: the model is too simple and misses on both training and test data.
- **Overfitting**: the model memorises the noise in the training data and generalises poorly – low training error, high test error.
- Remedies: more data, a simpler model, **regularisation** (a penalty on large weights), early stopping and dropout in neural networks.

This is the **bias–variance trade-off**: simple models have high bias, complex ones high variance. The goal is the balance that gives the lowest error on **new** data.`);

DEEP("ML", "Lineær regresjon og gradientnedstigning",
`## Fra én til mange variabler
Med flere egenskaper blir modellen $\\hat y = w_1 x_1 + w_2 x_2 + \\dots + w_d x_d + b$, kompakt skrevet $\\hat y = \\mathbf{w}^T \\mathbf{x} + b$. Hver vekt sier hvor mye $\\hat y$ endres når den egenskapen øker med én, mens de andre holdes fast. **Polynomregresjon** legger til egenskaper som $x^2$ og $x^3$ og kan da tilpasse kurver – men modellen er fortsatt lineær i **vektene**, så de samme metodene virker.

## Hvorfor kvadratisk feil?
MSE straffer store feil mye hardere enn små, er glatt og har ett enkelt minimum for lineær regresjon (tapsflaten er en «skål»). Ulempen er at **uteliggere** får stor innflytelse. **MAE** (gjennomsnittlig absoluttfeil) er mer robust. Roten av MSE, **RMSE**, har samme enhet som $y$ og er lettere å tolke.

## Gradientnedstigning i praksis
Gradienten peker i retningen der tapet øker raskest; vi går motsatt vei. Varianter:
- **Batch**: bruker alle dataene i hvert steg – stabilt, men tregt på store datasett.
- **Stokastisk (SGD)**: ett eksempel om gangen – raskt og støyete, kan hoppe ut av dårlige lokale minimum.
- **Mini-batch**: for eksempel 32–256 eksempler per steg – standarden i praksis, særlig for nevrale nett.
- **Momentum** og **Adam** tilpasser steglengden underveis og konvergerer ofte raskere.

En **epoke** er én gjennomgang av hele treningssettet. Følg med på en **tapskurve** for trening og validering: synker treningstapet mens valideringstapet stiger, overtilpasser modellen.

## Læringsraten
Læringsraten $\\eta$ er den viktigste **hyperparameteren**. For stor: tapet svinger eller divergerer. For liten: treningen kryper. Vanlige grep er å starte med for eksempel 0,01 og prøve ti ganger større og mindre, eller la $\\eta$ **avta** underveis. **Skalering** av egenskapene gjør skålen rundere og gradientnedstigningen mye mer effektiv.

## Regularisering
- **Ridge (L2)** legger til $\\lambda \\sum w_j^2$ i tapet: vektene krympes mot null, og modellen blir mer stabil.
- **Lasso (L1)** legger til $\\lambda \\sum |w_j|$: noen vekter blir nøyaktig null, så modellen **velger ut** egenskaper.

## Fra regresjon til nevrale nett
Et **nevralt nett** er mange lineære lag med en **ikke-lineær aktiveringsfunksjon** (som ReLU) mellom. Gradientene regnes ut med **tilbakepropagering** (kjerneregelen), og vektene oppdateres med akkurat den samme gradientnedstigningen som her.`,
`## From one to many variables
With several features the model becomes $\\hat y = w_1 x_1 + w_2 x_2 + \\dots + w_d x_d + b$, compactly $\\hat y = \\mathbf{w}^T \\mathbf{x} + b$. Each weight says how much $\\hat y$ changes when that feature increases by one while the others are held fixed. **Polynomial regression** adds features such as $x^2$ and $x^3$ and can then fit curves – but the model is still linear in the **weights**, so the same methods work.

## Why squared error?
MSE punishes large errors much harder than small ones, is smooth and has a single minimum for linear regression (the loss surface is a "bowl"). The downside is that **outliers** have great influence. **MAE** (mean absolute error) is more robust. The square root of MSE, **RMSE**, has the same unit as $y$ and is easier to interpret.

## Gradient descent in practice
The gradient points in the direction where the loss rises fastest; we go the opposite way. Variants:
- **Batch**: uses all data in each step – stable, but slow on large datasets.
- **Stochastic (SGD)**: one example at a time – fast and noisy, can jump out of poor local minima.
- **Mini-batch**: for example 32–256 examples per step – the standard in practice, especially for neural networks.
- **Momentum** and **Adam** adapt the step size along the way and often converge faster.

An **epoch** is one pass through the whole training set. Watch a **loss curve** for training and validation: if training loss falls while validation loss rises, the model is overfitting.

## The learning rate
The learning rate $\\eta$ is the most important **hyperparameter**. Too large: the loss oscillates or diverges. Too small: training crawls. Common practice is to start at, say, 0.01 and try ten times larger and smaller, or let $\\eta$ **decay** during training. **Scaling** the features makes the bowl rounder and gradient descent far more efficient.

## Regularisation
- **Ridge (L2)** adds $\\lambda \\sum w_j^2$ to the loss: weights shrink towards zero and the model becomes more stable.
- **Lasso (L1)** adds $\\lambda \\sum |w_j|$: some weights become exactly zero, so the model **selects** features.

## From regression to neural networks
A **neural network** is many linear layers with a **non-linear activation function** (such as ReLU) in between. Gradients are computed by **backpropagation** (the chain rule), and the weights are updated with exactly the same gradient descent as here.`);

DEEP("ML", "Klassifisering og evaluering",
`## Logistisk regresjon
For klassifisering trenger vi en **sannsynlighet** mellom 0 og 1. **Logistisk regresjon** sender den lineære kombinasjonen gjennom **sigmoidfunksjonen** $\\sigma(z) = \\dfrac{1}{1 + e^{-z}}$. Er sannsynligheten over en **terskel** (ofte 0,5), velges klasse 1. Modellen trenes ved å minimere **kryssentropi** (log-tap), som straffer selvsikre feil hardt. Med mange klasser brukes **softmax**.

## Andre klassifiserere
- **k nærmeste naboer** (kNN): se hvilke klasser de $k$ nærmeste treningspunktene har. Enkel, men treg på store datasett og avhengig av skalering.
- **Beslutningstrær**: en rekke ja/nei-spørsmål. Lette å tolke, men overtilpasser lett. **Random forest** og **gradient boosting** kombinerer mange trær og er blant de sterkeste metodene for tabelldata.
- **Støttevektormaskiner** (SVM): finner skillelinjen med størst margin.
- **Nevrale nett**: dominerer for bilder, lyd og tekst.

## Forvirringsmatrisen
For to klasser teller vi **sanne positive** (TP), **falske positive** (FP), **sanne negative** (TN) og **falske negative** (FN). Fra disse:
- **Nøyaktighet** (accuracy) $= \\dfrac{TP + TN}{\\text{alle}}$.
- **Presisjon** $= \\dfrac{TP}{TP + FP}$: av dem vi sa var positive, hvor mange var det?
- **Treffrate/sensitivitet** (recall) $= \\dfrac{TP}{TP + FN}$: av alle positive, hvor mange fant vi?
- **F1** er det harmoniske snittet av presisjon og treffrate.

## Når nøyaktighet lurer
Ved **ubalanserte klasser** er nøyaktighet misvisende. Hvis 1 % av transaksjonene er svindel, får en modell som alltid sier «ikke svindel», 99 % nøyaktighet – og finner ingenting. Da må man se på presisjon, treffrate og F1, og eventuelt vekte klassene eller endre terskelen.

## Terskel og ROC
Å senke terskelen gir **flere positive**: høyere treffrate, men lavere presisjon. Hva som er riktig, avhenger av **kostnaden** ved feil: i kreftscreening er en oversett syk (FN) mye verre enn en ekstra kontroll (FP); i et spamfilter er det verre å kaste en viktig e-post (FP). **ROC-kurven** viser treffrate mot falsk positiv-rate for alle terskler, og **AUC** (arealet under) oppsummerer hvor godt modellen skiller klassene – 0,5 er tilfeldig gjetting, 1 er perfekt.

## Ansvarlig bruk
Modeller kan forsterke skjevheter i dataene og ta beslutninger som påvirker mennesker. Evaluer ytelsen for ulike **grupper**, vær åpen om begrensningene, og la mennesker ha siste ord i viktige beslutninger. EUs **KI-forordning** stiller egne krav til høyrisikosystemer.`,
`## Logistic regression
For classification we need a **probability** between 0 and 1. **Logistic regression** passes the linear combination through the **sigmoid function** $\\sigma(z) = \\dfrac{1}{1 + e^{-z}}$. If the probability is above a **threshold** (often 0.5), class 1 is chosen. The model is trained by minimising **cross-entropy** (log loss), which punishes confident mistakes hard. With many classes, **softmax** is used.

## Other classifiers
- **k-nearest neighbours** (kNN): look at the classes of the $k$ nearest training points. Simple, but slow on large datasets and dependent on scaling.
- **Decision trees**: a sequence of yes/no questions. Easy to interpret, but overfit easily. **Random forests** and **gradient boosting** combine many trees and are among the strongest methods for tabular data.
- **Support vector machines** (SVM): find the boundary with the largest margin.
- **Neural networks**: dominate for images, sound and text.

## The confusion matrix
For two classes we count **true positives** (TP), **false positives** (FP), **true negatives** (TN) and **false negatives** (FN). From these:
- **Accuracy** $= \\dfrac{TP + TN}{\\text{all}}$.
- **Precision** $= \\dfrac{TP}{TP + FP}$: of those we called positive, how many were?
- **Recall/sensitivity** $= \\dfrac{TP}{TP + FN}$: of all positives, how many did we find?
- **F1** is the harmonic mean of precision and recall.

## When accuracy misleads
With **imbalanced classes** accuracy is misleading. If 1 % of transactions are fraud, a model that always says "not fraud" gets 99 % accuracy – and finds nothing. Then you must look at precision, recall and F1, and perhaps weight the classes or change the threshold.

## Threshold and ROC
Lowering the threshold gives **more positives**: higher recall but lower precision. What is right depends on the **cost** of errors: in cancer screening a missed case (FN) is much worse than an extra check (FP); in a spam filter it is worse to discard an important email (FP). The **ROC curve** shows recall against false positive rate for all thresholds, and the **AUC** (area under it) summarises how well the model separates the classes – 0.5 is random guessing, 1 is perfect.

## Responsible use
Models can amplify biases in the data and make decisions that affect people. Evaluate performance for different **groups**, be open about limitations, and let humans have the final say in important decisions. The EU **AI Act** sets specific requirements for high-risk systems.`);

// ================= BYGG =================
DEEP("BYGG", "Laster og lastkombinasjoner",
`## Hvilke laster virker på et bygg?
- **Permanente laster** (egenlast, $G$): vekten av konstruksjonen selv og fast utstyr – betong ca. 25 kN/m³, stål ca. 78,5 kN/m³, tre ca. 5 kN/m³. Kan beregnes ganske nøyaktig.
- **Nyttelast** ($Q$): mennesker, møbler og lager. Angis i standarden etter **bruksklasse** – for eksempel omkring 2 kN/m² for boliger og 3–5 kN/m² for kontorer, forsamlingslokaler og lager, avhengig av bruk.
- **Snølast**: $s = \\mu \\cdot s_k$, der $s_k$ er **karakteristisk snølast på mark** for kommunen (fra under 2 til over 10 kN/m² i Norge, høyest i innlandet og fjellet) og $\\mu$ er en **formfaktor** for taket. Bratte tak holder på mindre snø; ved høydesprang og takoppbygg kan det bli **snøfonner** med mye høyere last.
- **Vindlast**: avhenger av **referansevindhastigheten** på stedet, terrengkategori, høyde over bakken og byggets form. Vind gir både trykk og **sug** – sug på tak og hjørner river ofte av taktekking.
- I tillegg: **jordtrykk**, vanntrykk, temperaturlast, jordskjelv og **ulykkeslaster** (påkjørsel, eksplosjon, brann).

## Grensetilstander
**Eurokode 0** (NS-EN 1990) bygger på **grensetilstandsmetoden**:
- **Bruddgrensetilstand** (ULS): konstruksjonen skal ikke kollapse. Lastene **forstørres** med partialfaktorer, og materialfastheten **reduseres**.
- **Bruksgrensetilstand** (SLS): konstruksjonen skal fungere godt i bruk – begrensninger på **nedbøyning**, svingninger og riss. Her brukes lastene uten (eller med mindre) faktorer.

## Lastkombinasjoner
Fordi alle variable laster neppe opptrer med full styrke samtidig, kombineres de: én **dominerende** variabel last tas med fullt, de andre reduseres med **kombinasjonsfaktorer** $\\psi_0$. En typisk ULS-kombinasjon er
$$1{,}2\\,G + 1{,}5\\,Q_1 + 1{,}5 \\sum \\psi_{0,i}\\, Q_i,$$
og man må sjekke flere kombinasjoner der ulike laster dominerer, og ta den verste. Når egenlasten virker **gunstig** (for eksempel mot velting eller oppløft), brukes en lav faktor (0,9 eller 1,0) på den. I Norge angir det **nasjonale tillegget** de faktorene som skal brukes.

## Lastvei
En god konstruktør følger **lastveien**: fra taket og dekkene via bjelker og søyler eller bærevegger ned til fundamentene og grunnen. Alle laster – også horisontale fra vind – må ha en sammenhengende vei til grunnen. Horisontal **avstivning** (skiver, stagkryss, kjerner) er like viktig som å bære vertikal last.`,
`## Which loads act on a building?
- **Permanent loads** (self-weight, $G$): the weight of the structure itself and fixed equipment – concrete about 25 kN/m³, steel about 78.5 kN/m³, timber about 5 kN/m³. They can be calculated fairly precisely.
- **Imposed loads** ($Q$): people, furniture and storage. Given in the standard by **category of use** – for example around 2 kN/m² for dwellings and 3–5 kN/m² for offices, assembly areas and storage, depending on use.
- **Snow load**: $s = \\mu \\cdot s_k$, where $s_k$ is the **characteristic ground snow load** for the municipality (from under 2 to over 10 kN/m² in Norway, highest inland and in the mountains) and $\\mu$ is a **shape coefficient** for the roof. Steep roofs hold less snow; at changes in roof height and roof structures **drifts** can give much higher loads.
- **Wind load**: depends on the site's **reference wind speed**, terrain category, height above ground and building shape. Wind gives both pressure and **suction** – suction on roofs and corners often tears off roofing.
- Also: **earth pressure**, water pressure, thermal loads, earthquakes and **accidental loads** (impact, explosion, fire).

## Limit states
**Eurocode 0** (NS-EN 1990) is based on the **limit state method**:
- **Ultimate limit state** (ULS): the structure must not collapse. Loads are **increased** by partial factors, and material strength is **reduced**.
- **Serviceability limit state** (SLS): the structure must perform well in use – limits on **deflection**, vibration and cracking. Here loads are used without (or with smaller) factors.

## Load combinations
Since all variable loads are unlikely to act at full strength simultaneously, they are combined: one **leading** variable load is taken in full, the others are reduced by **combination factors** $\\psi_0$. A typical ULS combination is
$$1.2\\,G + 1.5\\,Q_1 + 1.5 \\sum \\psi_{0,i}\\, Q_i,$$
and several combinations with different leading loads must be checked, taking the worst. When self-weight acts **favourably** (for example against overturning or uplift), a low factor (0.9 or 1.0) is used. In Norway the **National Annex** sets the factors to use.

## Load path
A good structural engineer follows the **load path**: from the roof and floors via beams and columns or load-bearing walls down to the foundations and the ground. All loads – including horizontal wind loads – need a continuous path to the ground. Horizontal **bracing** (diaphragms, cross-bracing, cores) is as important as carrying vertical load.`);

DEEP("BYGG", "Bygningsfysikk: varme og fukt",
`## Varmetransport
Varme går alltid fra varmt til kaldt, på tre måter: **ledning** gjennom materialer, **konveksjon** med luft som beveger seg (også luftlekkasjer) og **stråling**. Isolasjonsevnen til et materiale angis med **varmekonduktiviteten** $\\lambda$ (W/mK): mineralull ca. 0,035, tre ca. 0,12, betong ca. 2. Isolasjon virker fordi den holder på **stillestående luft**.

## U-verdi
En konstruksjon med flere lag har **varmemotstand** $R = \\sum d_i/\\lambda_i$ pluss overgangsmotstander på innside og utside. **U-verdien** er $U = 1/R_{tot}$ (W/m²K), og varmetapet er
$$\\Phi = U \\cdot A \\cdot \\Delta T.$$
**TEK17** stiller krav til energibruk og minstekrav som yttervegg $U \\leq 0{,}22$, tak $U \\leq 0{,}18$, gulv $U \\leq 0{,}18$ og vinduer $U \\leq 1{,}2$ W/m²K. Vinduer er fortsatt det svakeste punktet i de fleste bygg.

## Kuldebroer og lufttetthet
- **Kuldebroer** er steder der varme lekker lettere – gjennomgående betong i balkonger, stålbjelker, stendere og hjørner. De gir varmetap, kalde innvendige flater og risiko for kondens og muggsopp.
- **Lufttetthet**: utette bygg mister mye varme og kan få fuktskader når varm, fuktig inneluft lekker ut. Den måles med **trykktest** som luftlekkasjetall $n_{50}$; TEK17 krever høyst 0,6 luftvekslinger per time ved 50 Pa.

## Fukt
Luft kan holde mer vanndamp jo varmere den er. **Relativ fuktighet** (RF) er forholdet mellom faktisk og maksimal fuktmengde ved temperaturen. Kjøles luft ned, stiger RF, og ved **duggpunktet** (100 %) kondenserer vannet. Muggsopp kan vokse ved RF over omkring 75–80 % over tid.

Prinsippene for en fuktsikker yttervegg i et kaldt klima:
- **Dampsperre** (plastfolie) på den **varme innsiden** hindrer fuktig inneluft i å trenge inn og kondensere i den kalde delen av veggen. Den må være tett i skjøter og rundt gjennomføringer.
- **Vindsperre** på utsiden av isolasjonen hindrer kald vind i å blåse gjennom isolasjonen, men må være **dampåpen**, så fukt kan tørke ut.
- **Luftet kledning** med lufte­spalte bak sørger for at slagregn som trenger forbi kledningen, renner ned og tørker ut – **totrinnstetting**.
- Tommelfingerregel: konstruksjonen skal være **minst 10 ganger tettere** for damp på innsiden enn på utsiden, så fukt som kommer inn, kommer ut.

## Fuktkilder
Byggfukt (betong må tørke før gulvlegging), nedbør og slagregn, fukt fra grunnen (kapillærsug – derfor kapillærbrytende sjikt under såler), lekkasjer og **inneluftfukt** fra dusj, matlaging og mennesker. God **ventilasjon** fjerner fukt og forurensninger innenfra.`,
`## Heat transfer
Heat always flows from warm to cold, in three ways: **conduction** through materials, **convection** with moving air (including air leaks) and **radiation**. A material's insulating ability is given by its **thermal conductivity** $\\lambda$ (W/mK): mineral wool about 0.035, timber about 0.12, concrete about 2. Insulation works because it traps **still air**.

## U-value
A construction with several layers has **thermal resistance** $R = \\sum d_i/\\lambda_i$ plus surface resistances inside and outside. The **U-value** is $U = 1/R_{tot}$ (W/m²K), and the heat loss is
$$\\Phi = U \\cdot A \\cdot \\Delta T.$$
**TEK17** (the Norwegian building regulations) sets energy requirements and minimum values such as external walls $U \\leq 0.22$, roofs $U \\leq 0.18$, floors $U \\leq 0.18$ and windows $U \\leq 1.2$ W/m²K. Windows remain the weakest point in most buildings.

## Thermal bridges and airtightness
- **Thermal bridges** are places where heat escapes more easily – continuous concrete in balconies, steel beams, studs and corners. They cause heat loss, cold interior surfaces and a risk of condensation and mould.
- **Airtightness**: leaky buildings lose a lot of heat and can suffer moisture damage when warm, humid indoor air leaks out. It is measured by a **blower-door test** as the air change rate $n_{50}$; TEK17 requires at most 0.6 air changes per hour at 50 Pa.

## Moisture
Air can hold more water vapour the warmer it is. **Relative humidity** (RH) is the ratio of actual to maximum moisture at that temperature. When air cools, RH rises, and at the **dew point** (100 %) water condenses. Mould can grow at RH above about 75–80 % over time.

Principles of a moisture-safe external wall in a cold climate:
- A **vapour barrier** (plastic membrane) on the **warm inside** stops humid indoor air from entering and condensing in the cold part of the wall. It must be sealed at joints and around penetrations.
- A **wind barrier** outside the insulation stops cold wind from blowing through the insulation, but must be **vapour-open** so moisture can dry out.
- **Ventilated cladding** with an air gap behind lets driving rain that gets past the cladding run down and dry out – **two-stage protection**.
- Rule of thumb: the construction should be **at least 10 times tighter** to vapour on the inside than on the outside, so moisture that gets in can get out.

## Sources of moisture
Construction moisture (concrete must dry before flooring), precipitation and driving rain, ground moisture (capillary suction – hence capillary-breaking layers under slabs), leaks and **indoor moisture** from showers, cooking and people. Good **ventilation** removes moisture and pollutants from inside.`);

DEEP("BYGG", "Landmåling",
`## Hvorfor landmåling?
Alt som bygges, må plasseres riktig: på riktig tomt, i riktig høyde og med riktig form. **Landmåling** (geomatikk) omfatter å **måle inn** det som finnes (terreng, eksisterende bygg, ledninger) og å **sette ut** det som skal bygges (hjørner, akser, høyder). Feil i utsettingen kan bli svært dyre.

## Koordinatsystemer og høyder
- I Norge brukes **EUREF89** som geodetisk grunnlag, med kartprojeksjonen **UTM** (sone 32, 33 og 35) eller **NTM** (Norsk transversal Mercator, med smalere soner og mindre målestokkfeil, mye brukt i bygg og anlegg).
- Koordinater angis som **nord** (N, x) og **øst** (E, y). Merk at landmålere tradisjonelt bruker x mot nord – omvendt av matematikken.
- Høyder angis i høydesystemet **NN2000**, med utgangspunkt i middelvannstanden. Satellittmålinger gir høyde over en **ellipsoide**, og må korrigeres med en **geoidemodell** for å få høyde over havet.

## Instrumenter og metoder
- **Nivellering**: et nivellerinstrument gir en horisontal siktelinje, og man leser av på en **stang** på to punkter. Høydeforskjellen er bakover­avlesning minus foroveravlesning. Svært nøyaktig, millimeternivå.
- **Totalstasjon**: måler **horisontalvinkel**, **vertikalvinkel** og **avstand** (med laser). Fra en kjent stasjon kan koordinatene til nye punkter regnes ut med polar beregning: $\\Delta N = s \\cos\\alpha$, $\\Delta E = s \\sin\\alpha$, der $\\alpha$ er **retningsvinkelen** fra nord.
- **GNSS** (GPS, Galileo, GLONASS, BeiDou): enkle mottakere gir meternøyaktighet; med **RTK** (sanntidskorreksjoner fra basestasjoner, for eksempel CPOS fra Kartverket) oppnås 1–3 cm. Fungerer dårlig under trær, nær høye bygg og i tunneler.
- **Laserskanning** og **droner** med fotogrammetri gir punktskyer og detaljerte 3D-modeller av terreng og bygg.

## Vinkler og retning
Landmålere bruker ofte **gon** (400 gon på en hel sirkel), ikke grader. 100 gon = 90°. Retningsvinkler regnes **med klokka fra nord**.

## Feil og kontroll
Alle målinger har feil: **grove feil** (feilavlesning, feil punkt), **systematiske feil** (feil kalibrering, temperatur) og **tilfeldige feil**. Derfor måles alltid med **kontroll**: tilbake til kjent punkt, overbestemmelse (flere målinger enn nødvendig) og **utjevning** etter minste kvadraters metode. Et **polygondrag** som starter og slutter i kjente punkter, avslører om noe er galt.

## Fra måling til modell
Målingene brukes i **BIM** og maskinstyring: gravemaskiner og asfaltutleggere med GNSS kan arbeide direkte etter 3D-modellen, uten stikker i terrenget.`,
`## Why surveying?
Everything built must be placed correctly: on the right plot, at the right height and with the right shape. **Surveying** (geomatics) covers **measuring** what exists (terrain, existing buildings, utilities) and **setting out** what is to be built (corners, axes, levels). Setting-out errors can be very expensive.

## Coordinate systems and heights
- Norway uses **EUREF89** as the geodetic datum, with the map projection **UTM** (zones 32, 33 and 35) or **NTM** (Norwegian Transverse Mercator, with narrower zones and smaller scale error, widely used in construction).
- Coordinates are given as **north** (N, x) and **east** (E, y). Note that surveyors traditionally use x towards north – the opposite of mathematics.
- Heights are given in the **NN2000** height system, based on mean sea level. Satellite measurements give height above an **ellipsoid**, which must be corrected with a **geoid model** to get height above sea level.

## Instruments and methods
- **Levelling**: a level gives a horizontal line of sight, and readings are taken on a **staff** at two points. The height difference is the backsight minus the foresight. Very accurate, to the millimetre.
- **Total station**: measures **horizontal angle**, **vertical angle** and **distance** (by laser). From a known station, coordinates of new points are calculated by polar calculation: $\\Delta N = s \\cos\\alpha$, $\\Delta E = s \\sin\\alpha$, where $\\alpha$ is the **bearing** from north.
- **GNSS** (GPS, Galileo, GLONASS, BeiDou): simple receivers give metre accuracy; with **RTK** (real-time corrections from base stations, for example CPOS from the Norwegian Mapping Authority) 1–3 cm is achieved. Works poorly under trees, near tall buildings and in tunnels.
- **Laser scanning** and **drones** with photogrammetry give point clouds and detailed 3D models of terrain and buildings.

## Angles and direction
Surveyors often use **gon** (400 gon in a full circle), not degrees. 100 gon = 90°. Bearings are measured **clockwise from north**.

## Errors and checks
All measurements contain errors: **gross errors** (misreading, wrong point), **systematic errors** (calibration, temperature) and **random errors**. That is why measurements are always **checked**: back to a known point, redundancy (more measurements than needed) and **adjustment** by least squares. A **traverse** that starts and ends at known points reveals if something is wrong.

## From measurement to model
Measurements feed into **BIM** and machine control: excavators and pavers with GNSS can work directly from the 3D model, without pegs in the ground.`);

// ================= GRUNNFAG =================
DEEP("KJEMI", "Gasslover",
`## Den kinetiske gassteorien
Gassloven blir forståelig når man ser for seg gassen som et enormt antall små molekyler i rask, tilfeldig bevegelse. **Trykket** er resultatet av at molekylene kolliderer med veggene. **Temperaturen** er et mål for molekylenes gjennomsnittlige **kinetiske energi** – derfor må temperaturen alltid regnes i **kelvin**, der 0 K er det absolutte nullpunktet der bevegelsen (klassisk sett) stopper. Øker temperaturen, treffer molekylene veggene oftere og hardere, og trykket stiger.

## De klassiske lovene
Alle er spesialtilfeller av $pV = nRT$:
- **Boyles lov** (konstant $T$ og $n$): $p_1 V_1 = p_2 V_2$. Halvert volum gir dobbelt trykk – slik virker en sprøyte og en sykkelpumpe.
- **Charles' lov** (konstant $p$): $V_1/T_1 = V_2/T_2$. En ballong krymper i kulda.
- **Gay-Lussacs lov** (konstant $V$): $p_1/T_1 = p_2/T_2$. Derfor kan en spraybokse eksplodere i varme, og dekktrykket faller om vinteren.
- **Avogadros lov**: like volumer av ulike gasser ved samme $p$ og $T$ inneholder like mange molekyler. Ved 0 °C og 1 atm fyller ett mol gass omtrent 22,4 liter (**molart volum**); ved 25 °C omtrent 24,5 liter.
- **Kombinert gasslov**: $\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}$ når stoffmengden er konstant.

## Gassblandinger
**Daltons lov**: totaltrykket er summen av **partialtrykkene**, og hver gass bidrar i forhold til sin **molbrøk**. Luft ved havnivå (ca. 101 kPa) har omtrent 21 % oksygen, så partialtrykket av O₂ er omtrent 21 kPa. På høyfjellet er totaltrykket lavere, og dermed også oksygentrykket – derfor blir man andpusten. Dykkere må ta hensyn til at partialtrykket øker med dybden.

## Gasser i reaksjoner
Med $n = pV/(RT)$ kan du gå fra **volum av gass** til **mol**, og videre med **reaksjonslikningen**. Eksempel: hvor mye CO₂ dannes når 1 mol propan forbrennes? Likningen $\\text{C}_3\\text{H}_8 + 5\\,\\text{O}_2 \\to 3\\,\\text{CO}_2 + 4\\,\\text{H}_2\\text{O}$ gir 3 mol CO₂, som ved 25 °C og 1 atm fyller omtrent 73 liter.

## Når idealgassloven ikke holder
Idealgassloven antar at molekylene ikke tar plass og ikke tiltrekker hverandre. Det stemmer godt ved **lavt trykk og høy temperatur**. Ved høyt trykk og lav temperatur – nær **kondensasjon** – avviker virkelige gasser, og man bruker korreksjoner som **van der Waals-likningen**.

## Enheter
$R = 8{,}314$ J/(mol·K) passer med trykk i **Pa** og volum i **m³**. 1 atm = 101 325 Pa, 1 bar = 100 000 Pa, 1 L = 0,001 m³. Mange feil skyldes at liter og pascal blandes uten omregning.`,
`## The kinetic theory of gases
The gas laws make sense when you picture a gas as an enormous number of tiny molecules in rapid, random motion. **Pressure** results from molecules colliding with the walls. **Temperature** measures the molecules' average **kinetic energy** – which is why temperature must always be in **kelvin**, where 0 K is absolute zero, where motion (classically) stops. As temperature rises, the molecules hit the walls more often and harder, and pressure rises.

## The classic laws
All are special cases of $pV = nRT$:
- **Boyle's law** (constant $T$ and $n$): $p_1 V_1 = p_2 V_2$. Halving the volume doubles the pressure – this is how a syringe and a bicycle pump work.
- **Charles's law** (constant $p$): $V_1/T_1 = V_2/T_2$. A balloon shrinks in the cold.
- **Gay-Lussac's law** (constant $V$): $p_1/T_1 = p_2/T_2$. This is why an aerosol can may explode in heat, and tyre pressure drops in winter.
- **Avogadro's law**: equal volumes of different gases at the same $p$ and $T$ contain the same number of molecules. At 0 °C and 1 atm one mole of gas fills about 22.4 litres (**molar volume**); at 25 °C about 24.5 litres.
- **Combined gas law**: $\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}$ when the amount of substance is constant.

## Gas mixtures
**Dalton's law**: the total pressure is the sum of the **partial pressures**, and each gas contributes in proportion to its **mole fraction**. Air at sea level (about 101 kPa) is about 21 % oxygen, so the partial pressure of O₂ is about 21 kPa. In the mountains total pressure is lower, and so is the oxygen pressure – which is why you get out of breath. Divers must account for partial pressure rising with depth.

## Gases in reactions
With $n = pV/(RT)$ you can go from **gas volume** to **moles**, and on via the **reaction equation**. Example: how much CO₂ forms when 1 mol of propane burns? The equation $\\text{C}_3\\text{H}_8 + 5\\,\\text{O}_2 \\to 3\\,\\text{CO}_2 + 4\\,\\text{H}_2\\text{O}$ gives 3 mol CO₂, which at 25 °C and 1 atm fills about 73 litres.

## When the ideal gas law fails
The ideal gas law assumes molecules take up no space and do not attract each other. This holds well at **low pressure and high temperature**. At high pressure and low temperature – near **condensation** – real gases deviate, and corrections such as the **van der Waals equation** are used.

## Units
$R = 8.314$ J/(mol·K) fits pressure in **Pa** and volume in **m³**. 1 atm = 101,325 Pa, 1 bar = 100,000 Pa, 1 L = 0.001 m³. Many mistakes come from mixing litres and pascals without converting.`);

DEEP("GMAT", "Statistikk og sannsynlighet",
`## Fra data til beslutninger
Ingeniører bruker statistikk for å **kvalitetssikre** produksjon, **dimensjonere** mot naturlaster (hvor stor blir 100-årsflommen?), vurdere **måleusikkerhet** og tolke forsøk. Grunnlaget er å beskrive data og å regne med tilfeldighet.

## Beskrive data
- **Sentrum**: gjennomsnitt $\\bar x$ og median. Medianen er robust mot uteliggere.
- **Spredning**: standardavviket $s = \\sqrt{\\dfrac{1}{n-1}\\sum (x_i - \\bar x)^2}$, kvartiler og variasjonsbredde.
- **Grafer**: histogram for fordelingen, boksplott for å sammenligne grupper, spredningsplott for sammenhenger.

## Sannsynlighetsregler
- Sannsynligheter ligger mellom 0 og 1. **Komplement**: $P(\\bar A) = 1 - P(A)$.
- **Addisjonsregelen**: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.
- **Uavhengige** hendelser: $P(A \\cap B) = P(A) \\cdot P(B)$. To uavhengige pumper som hver svikter med sannsynlighet 0,05, svikter begge med sannsynlighet 0,0025 – grunnen til **redundans** i sikkerhetskritiske systemer.
- **Betinget sannsynlighet**: $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$. **Bayes' setning** snur betingelsen – avgjørende for å tolke tester og alarmer: selv en god test gir mange falske alarmer når det den leter etter, er sjeldent.

## Viktige fordelinger
- **Binomisk**: antall «suksesser» i $n$ uavhengige forsøk med samme sannsynlighet $p$, for eksempel antall defekte enheter i en prøve. Forventning $np$.
- **Normalfordelingen**: den klokkeformede kurven. Omtrent **68 %** av verdiene ligger innenfor ett standardavvik fra snittet, **95 %** innenfor to og **99,7 %** innenfor tre. Mange målefeil og produksjonsmål er tilnærmet normalfordelte, og **sentralgrenseteoremet** sier at gjennomsnitt blir det uansett.
- **Eksponentialfordelingen**: tid til svikt når svikt skjer tilfeldig med konstant rate – brukt i **pålitelighetsanalyse**.

## Gjentaksintervall
En «100-årsflom» har sannsynlighet $1/100$ for å inntreffe **hvert år**. Sannsynligheten for at den skjer minst én gang i løpet av 50 år er $1 - 0{,}99^{50} \\approx 0{,}39$ – nesten 40 %, ikke «usannsynlig». Dette brukes når konstruksjoner dimensjoneres for vind, snø, flom og bølger.

## Statistisk prosesskontroll
I produksjon følger man med på målinger i **kontrollkort** med grenser på $\\bar x \\pm 3\\sigma$. Punkter utenfor grensene, eller systematiske mønstre, tyder på at prosessen har endret seg og må undersøkes før det produseres mye feil.`,
`## From data to decisions
Engineers use statistics to **quality-assure** production, **design** against natural loads (how big is the 100-year flood?), assess **measurement uncertainty** and interpret experiments. The foundation is describing data and calculating with randomness.

## Describing data
- **Centre**: the mean $\\bar x$ and the median. The median is robust to outliers.
- **Spread**: the standard deviation $s = \\sqrt{\\dfrac{1}{n-1}\\sum (x_i - \\bar x)^2}$, quartiles and range.
- **Graphs**: histograms for the distribution, box plots to compare groups, scatter plots for relationships.

## Probability rules
- Probabilities lie between 0 and 1. **Complement**: $P(\\bar A) = 1 - P(A)$.
- **The addition rule**: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.
- **Independent** events: $P(A \\cap B) = P(A) \\cdot P(B)$. Two independent pumps that each fail with probability 0.05 both fail with probability 0.0025 – the reason for **redundancy** in safety-critical systems.
- **Conditional probability**: $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$. **Bayes' theorem** reverses the condition – crucial for interpreting tests and alarms: even a good test gives many false alarms when what it looks for is rare.

## Important distributions
- **Binomial**: the number of "successes" in $n$ independent trials with the same probability $p$, for example the number of defective units in a sample. Expected value $np$.
- **The normal distribution**: the bell curve. About **68 %** of values lie within one standard deviation of the mean, **95 %** within two and **99.7 %** within three. Many measurement errors and production dimensions are approximately normal, and the **central limit theorem** says averages become normal regardless.
- **The exponential distribution**: time to failure when failures occur randomly at a constant rate – used in **reliability analysis**.

## Return periods
A "100-year flood" has probability $1/100$ of occurring **every year**. The probability of it happening at least once in 50 years is $1 - 0.99^{50} \\approx 0.39$ – nearly 40 %, not "unlikely". This is used when structures are designed for wind, snow, floods and waves.

## Statistical process control
In production, measurements are tracked on **control charts** with limits at $\\bar x \\pm 3\\sigma$. Points outside the limits, or systematic patterns, suggest the process has changed and must be investigated before many defects are produced.`);

DEEP("GFYS", "Bølger, lyd og lys",
`## Hva er en bølge?
En bølge transporterer **energi** uten å transportere stoff: vannet i en havbølge beveger seg stort sett opp og ned, mens bølgen farer videre. **Mekaniske bølger** (lyd, vannbølger, bølger på en streng) trenger et medium. **Elektromagnetiske bølger** (lys, radio, røntgen) klarer seg i vakuum.
- **Transversale** bølger svinger på tvers av fartsretningen (en streng, lys).
- **Longitudinale** bølger svinger langs fartsretningen, som fortetninger og fortynninger (lyd i luft).

Grunnlikningen $v = f\\lambda$ gjelder alle bølger. **Frekvensen** bestemmes av kilden og endres ikke når bølgen går over i et nytt medium; det er **farten** og **bølgelengden** som endres.

## Lyd
Lydfarten i luft er omtrent **343 m/s** ved 20 °C (øker med temperaturen), omtrent 1500 m/s i vann og over 5000 m/s i stål. Mennesket hører omtrent **20 Hz – 20 kHz**; over det er **ultralyd** (medisinsk avbildning, ekkolodd), under er infralyd.
- **Lydnivå** måles i **desibel**: $L = 10 \\log_{10}(I/I_0)$. +10 dB betyr ti ganger så stor intensitet og oppleves omtrent som dobbelt så sterkt; +3 dB er en dobling av intensiteten. Langvarig støy over omtrent 80–85 dB kan gi varige hørselsskader.
- **Dopplereffekten**: når kilden nærmer seg, presses bølgene sammen og frekvensen stiger – sirenen synker i tone når ambulansen har passert. Brukes i radar, fartskontroll og ultralyd av blodstrøm.

## Interferens og stående bølger
Når bølger møtes, **adderes** utslagene. Topp mot topp gir **konstruktiv** interferens, topp mot bunn **destruktiv** – prinsippet bak **støydempende hodetelefoner**. På en streng eller i et rør oppstår **stående bølger** med noder og bukler; bare bestemte frekvenser (grunntone og **overtoner**) passer inn. Det gir musikkinstrumenter deres tone og klang. **Resonans** – når en konstruksjon påvirkes med sin egenfrekvens – kan gi farlig store svingninger i bruer og maskiner.

## Lys
Lys er **elektromagnetisk stråling**. Synlig lys har bølgelengder omtrent **400 nm (fiolett) til 700 nm (rødt)**; spekteret fortsetter med UV, røntgen og gammastråling på den ene siden og infrarødt, mikrobølger og radio på den andre. Lysfarten i vakuum er $c \\approx 3{,}00 \\cdot 10^8$ m/s.
- **Refleksjon**: innfallsvinkel = utfallsvinkel.
- **Brytning** (refraksjon): lyset endrer retning når farten endres – **Snells lov** $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$, der brytningsindeksen $n = c/v$. Ulike farger brytes ulikt (**dispersjon**), og derfor gir et prisme og regndråper regnbuer.
- **Totalrefleksjon**: fra et tettere mot et tynnere medium over **grensevinkelen** reflekteres alt lys. Det er prinsippet bak **optiske fibre**, som frakter internett-trafikken.
- **Diffraksjon og interferens** i et **gitter** gir $d \\sin\\theta = m\\lambda$ og brukes til å måle bølgelengder og analysere lys fra stjerner (spektroskopi).
- Lys har også **partikkelegenskaper**: fotoner med energi $E = hf$. Det forklarer hvorfor UV-lys kan skade hud og DNA, mens rødt lys ikke kan.`,
`## What is a wave?
A wave carries **energy** without carrying matter: the water in an ocean wave mostly moves up and down while the wave travels on. **Mechanical waves** (sound, water waves, waves on a string) need a medium. **Electromagnetic waves** (light, radio, X-rays) can travel through a vacuum.
- **Transverse** waves oscillate across the direction of travel (a string, light).
- **Longitudinal** waves oscillate along it, as compressions and rarefactions (sound in air).

The basic equation $v = f\\lambda$ applies to all waves. The **frequency** is set by the source and does not change when the wave enters a new medium; it is the **speed** and **wavelength** that change.

## Sound
The speed of sound in air is about **343 m/s** at 20 °C (rising with temperature), about 1500 m/s in water and over 5000 m/s in steel. Humans hear roughly **20 Hz – 20 kHz**; above that is **ultrasound** (medical imaging, sonar), below is infrasound.
- **Sound level** is measured in **decibels**: $L = 10 \\log_{10}(I/I_0)$. +10 dB means ten times the intensity and is perceived as roughly twice as loud; +3 dB doubles the intensity. Long exposure to noise above about 80–85 dB can cause permanent hearing damage.
- **The Doppler effect**: when the source approaches, the waves are squeezed and the frequency rises – a siren drops in pitch once the ambulance has passed. Used in radar, speed cameras and ultrasound of blood flow.

## Interference and standing waves
When waves meet, their displacements **add**. Crest on crest gives **constructive** interference, crest on trough **destructive** – the principle behind **noise-cancelling headphones**. On a string or in a pipe **standing waves** form with nodes and antinodes; only certain frequencies (the fundamental and **overtones**) fit. This gives musical instruments their pitch and timbre. **Resonance** – driving a structure at its natural frequency – can cause dangerously large oscillations in bridges and machines.

## Light
Light is **electromagnetic radiation**. Visible light has wavelengths of about **400 nm (violet) to 700 nm (red)**; the spectrum continues with UV, X-rays and gamma rays on one side and infrared, microwaves and radio on the other. The speed of light in vacuum is $c \\approx 3.00 \\cdot 10^8$ m/s.
- **Reflection**: angle of incidence = angle of reflection.
- **Refraction**: light changes direction when its speed changes – **Snell's law** $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$, where the refractive index $n = c/v$. Different colours refract differently (**dispersion**), which is why prisms and raindrops make rainbows.
- **Total internal reflection**: from a denser to a less dense medium beyond the **critical angle**, all light is reflected. This is the principle behind **optical fibres**, which carry internet traffic.
- **Diffraction and interference** in a **grating** give $d \\sin\\theta = m\\lambda$ and are used to measure wavelengths and analyse starlight (spectroscopy).
- Light also has **particle properties**: photons with energy $E = hf$. This explains why UV light can damage skin and DNA while red light cannot.`);
})();
