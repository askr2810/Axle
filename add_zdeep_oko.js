// ============================================================
//  add_zdeep_oko.js – fordypning i økonomi og administrasjon (bedriftsøkonomi, regnskap, matematikk,
//  statistikk og samfunnsøkonomi). DEEP ligger i learn.js.
// ============================================================
(() => {
// ================= BEDRIFTSØKONOMI =================
DEEP("OBED", "Dekningsbidrag og nullpunkt",
`## Kostnader som oppfører seg ulikt
Det viktigste grepet i bedriftsøkonomi er å dele kostnadene etter hvordan de reagerer på **aktivitetsnivået** (antall produserte og solgte enheter):
- **Faste kostnader** (FK) er uavhengige av volumet på kort sikt: husleie, forsikring, administrasjon, avskrivninger på maskiner, fastlønn. De er like store om du selger 0 eller 10 000 enheter – innenfor en viss **kapasitet**. Øker produksjonen så mye at du trenger et nytt lokale, hopper de faste kostnadene til et nytt nivå (**sprangvise kostnader**).
- **Variable kostnader** (VK) øker med volumet: råvarer, emballasje, frakt per pakke, provisjon, timelønn i produksjonen. Vi regner som regel med en konstant **variabel enhetskostnad** (VEK), slik at $\\text{VK} = \\text{VEK} \\cdot x$.
- **Totale kostnader**: $\\text{TK}(x) = \\text{FK} + \\text{VEK} \\cdot x$. **Gjennomsnittskostnaden** (enhetskostnaden) $\\dfrac{\\text{TK}}{x}$ synker når volumet øker, fordi de faste kostnadene fordeles på flere enheter. Dette er **stordriftsfordeler**.

## Dekningsbidraget
Hver solgt enhet gir en salgsinntekt $p$ og koster $\\text{VEK}$. Det som er igjen, **dekningsbidraget** $\\text{DB} = p - \\text{VEK}$, går først til å dekke de faste kostnadene og deretter til overskudd. Resultatet blir derfor
$$\\text{Resultat} = \\text{DB} \\cdot x - \\text{FK}.$$
**Dekningsgraden** $\\text{DG} = \\text{DB}/p$ sier hvor stor andel av hver salgskrone som er dekningsbidrag. Den er nyttig når bedriften selger mange varer med ulik pris: totalt dekningsbidrag $= \\text{DG} \\cdot \\text{omsetning}$.

## Nullpunkt og sikkerhetsmargin
**Nullpunktet** (break-even) er volumet der resultatet er null: $x_0 = \\text{FK}/\\text{DB}$. Under nullpunktet går bedriften med underskudd, over det gir hver enhet hele sitt DB i overskudd.
- **Nullpunktsomsetning**: $\\text{FK}/\\text{DG}$ (eller $p \\cdot x_0$).
- **Sikkerhetsmargin**: budsjettert salg minus nullpunktssalg, ofte i prosent av budsjettert salg. En margin på 20 % betyr at salget kan falle med en femdel før bedriften taper penger.
- **Ønsket resultat**: skal bedriften tjene $R$ kroner, må den selge $x = \\dfrac{\\text{FK} + R}{\\text{DB}}$ enheter.

## Slik brukes analysen
- **Prisendring**: senker du prisen med 10 %, synker DB mye mer enn 10 % hvis VEK er høy. Du må selge mange flere enheter for å tjene det samme.
- **Kostnadsstruktur**: en bedrift med høye faste og lave variable kostnader (for eksempel en programvarebedrift) har høy **driftsmessig risiko**: lavt salg gir store tap, men høyt salg gir svært gode resultater.
- **Tilleggsordre**: har du ledig kapasitet, lønner en ekstraordre seg så lenge prisen er over VEK, fordi de faste kostnadene allerede er dekket.
- **Flaskehals**: når kapasiteten er begrenset, prioriterer du produktene med høyest DB **per enhet av flaskehalsen** (for eksempel per maskintime), ikke høyest DB per enhet.

> Forutsetningene er forenklinger: konstant pris og VEK, alt som produseres blir solgt, og FK er faste innenfor kapasiteten.`,
`## Costs that behave differently
The key idea in business economics is to split costs by how they react to the **activity level** (the number of units produced and sold):
- **Fixed costs** (FC) do not depend on volume in the short run: rent, insurance, administration, depreciation of machines, fixed salaries. They are the same whether you sell 0 or 10,000 units – within a certain **capacity**. If output grows so much that you need new premises, fixed costs jump to a new level (**step costs**).
- **Variable costs** (VC) grow with volume: materials, packaging, shipping per parcel, commission, hourly wages in production. We usually assume a constant **variable cost per unit**, so that $\\text{VC} = \\text{VC}_{\\text{unit}} \\cdot x$.
- **Total cost**: $\\text{TC}(x) = \\text{FC} + \\text{VC}_{\\text{unit}} \\cdot x$. The **average cost** $\\dfrac{\\text{TC}}{x}$ falls as volume rises, because fixed costs are spread over more units. These are **economies of scale**.

## The contribution margin
Each unit sold brings in a price $p$ and costs $\\text{VC}_{\\text{unit}}$. What is left, the **contribution margin** $\\text{CM} = p - \\text{VC}_{\\text{unit}}$, first covers the fixed costs and then becomes profit. So
$$\\text{Profit} = \\text{CM} \\cdot x - \\text{FC}.$$
The **contribution margin ratio** $\\text{CM}/p$ tells you what share of each krone of sales is contribution. It is useful when a company sells many products at different prices: total contribution $= \\text{ratio} \\cdot \\text{revenue}$.

## Break-even and margin of safety
The **break-even point** is the volume where profit is zero: $x_0 = \\text{FC}/\\text{CM}$. Below it the company makes a loss; above it each unit adds its whole CM to profit.
- **Break-even revenue**: $\\text{FC}/\\text{CM ratio}$ (or $p \\cdot x_0$).
- **Margin of safety**: budgeted sales minus break-even sales, often as a percentage of budgeted sales. A 20 % margin means sales can fall by a fifth before the company loses money.
- **Target profit**: to earn $R$, the company must sell $x = \\dfrac{\\text{FC} + R}{\\text{CM}}$ units.

## How the analysis is used
- **Price changes**: cut the price by 10 % and the CM falls by far more than 10 % if variable cost is high. You need to sell many more units to earn the same.
- **Cost structure**: a company with high fixed and low variable costs (such as a software firm) has high **operating risk**: low sales mean big losses, but high sales give very good results.
- **Special orders**: with spare capacity an extra order pays off as long as its price is above variable cost, because fixed costs are already covered.
- **Bottlenecks**: when capacity is limited, prioritise the products with the highest CM **per unit of the bottleneck** (for example per machine hour), not the highest CM per unit.

> The assumptions are simplifications: constant price and unit variable cost, everything produced is sold, and FC is fixed within capacity.`);

DEEP("OBED", "Budsjett og likviditet",
`## Budsjettprosessen
Et **budsjett** er en tallfestet handlingsplan for en periode, vanligvis ett år fordelt på måneder. Det brukes til **planlegging** (hva skal vi gjøre?), **koordinering** (passer salg, produksjon og innkjøp sammen?), **motivasjon** (konkrete mål) og **kontroll** (hvordan gikk det i forhold til planen?). Arbeidet starter som regel med **salgsbudsjettet**, fordi salget bestemmer hvor mye som skal produseres og kjøpes inn. Så følger produksjons-, innkjøps-, lønns- og kostnadsbudsjetter, og til slutt de tre hovedbudsjettene:
- **Resultatbudsjettet**: forventede inntekter og kostnader, og dermed forventet overskudd.
- **Likviditetsbudsjettet**: forventede inn- og utbetalinger måned for måned.
- **Budsjettert balanse**: hvordan eiendeler, gjeld og egenkapital ser ut ved periodens slutt.

## Resultat og likviditet er ikke det samme
Forskjellen ligger i **tidspunktet**:
- Et salg på 30 dagers kreditt er en **inntekt** i januar, men en **innbetaling** i februar. Mellom de to står beløpet som en **kundefordring**.
- En vare kjøpt på kreditt er en **utbetaling** først når leverandøren betales; i mellomtiden er den **leverandørgjeld**.
- Kjøp av en maskin er en stor **utbetaling** med én gang, men en **kostnad** først etter hvert, gjennom avskrivningene.
- Avskrivninger er kostnader uten utbetaling. Avdrag på lån er utbetalinger uten kostnad (bare renten er en kostnad).
- Mva, skattetrekk og arbeidsgiveravgift samles opp og betales til staten i terminer, ofte annenhver måned.

## Å lage et likviditetsbudsjett
For hver måned: inngående beholdning + innbetalinger − utbetalinger = utgående beholdning, som blir neste måneds inngående. Typiske innbetalinger er kontantsalg, innbetalinger fra kunder, nye lån og innskutt egenkapital. Typiske utbetalinger er varekjøp, lønn, husleie, investeringer, renter og avdrag, skatt og mva.

## Når likviditeten blir for svak
Hvis budsjettet viser minus i en måned, må bedriften handle i forkant:
- avtale **kassekreditt** (en fleksibel lånegrense i banken), eller ta opp et lån
- få kundene til å betale raskere (kortere kredittid, kontantrabatt, factoring) eller be om lengre kredittid hos leverandørene
- utsette investeringer, eller **lease** i stedet for å kjøpe
- redusere varelageret, som binder penger

Vekst er en typisk felle: når salget øker, må bedriften kjøpe inn og betale lønn før kundene betaler. Mange bedrifter som går konkurs, er lønnsomme på papiret, men går tom for penger.

> Budsjettavvik: sammenlign faktiske tall med budsjettet hver måned og spør hvorfor de avviker – pris, volum eller kostnader?`,
`## The budgeting process
A **budget** is a quantified action plan for a period, usually a year split into months. It is used for **planning** (what will we do?), **coordination** (do sales, production and purchasing fit together?), **motivation** (concrete targets) and **control** (how did we do compared with the plan?). The work usually starts with the **sales budget**, because sales decide how much must be produced and bought. Then come production, purchasing, payroll and cost budgets, and finally the three master budgets:
- **The income budget**: expected revenue and expenses, and so the expected profit.
- **The cash budget**: expected receipts and payments month by month.
- **The budgeted balance sheet**: what assets, liabilities and equity will look like at the end of the period.

## Profit and liquidity are not the same thing
The difference lies in **timing**:
- A sale on 30 days' credit is **revenue** in January but a **receipt** in February. In between, the amount sits as a **receivable**.
- Goods bought on credit are a **payment** only when the supplier is paid; until then they are **accounts payable**.
- Buying a machine is a large **payment** at once, but an **expense** only gradually, through depreciation.
- Depreciation is an expense without a payment. Loan instalments are payments without an expense (only the interest is an expense).
- VAT, tax withheld and employer's contributions are collected and paid to the state in instalments, often every two months.

## Building a cash budget
For each month: opening balance + receipts − payments = closing balance, which becomes the next month's opening balance. Typical receipts are cash sales, payments from customers, new loans and new equity. Typical payments are purchases, wages, rent, investments, interest and instalments, tax and VAT.

## When liquidity gets too weak
If the budget shows a negative balance in some month, the company must act in advance:
- arrange an **overdraft facility** (a flexible credit line at the bank), or take out a loan
- get customers to pay faster (shorter credit terms, cash discounts, factoring) or ask suppliers for longer credit
- postpone investments, or **lease** instead of buying
- cut inventory, which ties up money

Growth is a classic trap: when sales rise, the company must buy goods and pay wages before customers pay. Many companies that go bankrupt are profitable on paper but run out of cash.

> Budget variances: compare actual figures with the budget every month and ask why they differ – price, volume or costs?`);

// ================= REGNSKAP =================
DEEP("OREG", "Resultat og balanse",
`## Hvorfor føre regnskap?
Regnskapet er bedriftens hukommelse. **Eierne** vil vite om pengene forvaltes godt, **banken** om lånet blir betalt, **Skatteetaten** hvor mye skatt som skal betales, og **ledelsen** trenger tall for å ta beslutninger. I Norge krever **bokføringsloven** at alle transaksjoner dokumenteres med bilag, og **regnskapsloven** at blant annet aksjeselskaper lager **årsregnskap** med resultatregnskap, balanse og noter. Årsregnskapet sendes til **Regnskapsregisteret** i Brønnøysund, der det er offentlig.

## Resultatregnskapet steg for steg
- **Driftsinntekter**: salgsinntekter og andre inntekter fra driften.
- − **Driftskostnader**: varekostnad, lønnskostnader, avskrivninger, andre driftskostnader (husleie, strøm, reklame).
- = **Driftsresultat**: hva selve driften tjener.
- + **Finansinntekter** (renteinntekter) − **finanskostnader** (rentekostnader).
- = **Ordinært resultat før skatt**.
- − skattekostnad = **Årsresultat**, som enten deles ut som **utbytte** eller holdes tilbake og øker **egenkapitalen** (opptjent egenkapital).

## Balansen
**Eiendelssiden** viser hva kapitalen er brukt til, **finansieringssiden** hvor den kommer fra:
- **Anleggsmidler** er beregnet til varig eie eller bruk: tomter, bygninger, maskiner, biler, langsiktige investeringer.
- **Omløpsmidler** er knyttet til vareomløpet: varelager, kundefordringer, bankinnskudd og kontanter.
- **Egenkapital**: innskutt kapital (aksjekapital) pluss opptjent egenkapital.
- **Langsiktig gjeld** forfaller om mer enn ett år (pantelån). **Kortsiktig gjeld** forfaller innen ett år: leverandørgjeld, skyldig mva, skattetrekk og feriepenger.

## Debet og kredit
I **dobbelt bokføring** påvirker hver transaksjon minst to kontoer med like store beløp, én i **debet** (venstre side) og én i **kredit** (høyre side). Derfor er summen av debet alltid lik summen av kredit. Huskeregel:
- Eiendeler og kostnader: øker i debet, minker i kredit.
- Gjeld, egenkapital og inntekter: øker i kredit, minker i debet.

Eksempler: kontantsalg → debet bank, kredit salgsinntekt. Lønn betalt → debet lønnskostnad, kredit bank. Avdrag på lån → debet lån, kredit bank.

## Periodisering
Regnskapet følger **opptjeningsprinsippet** og **sammenstillingsprinsippet**: inntekter føres når de er opptjent (varen er levert), og kostnader føres i samme periode som inntektene de hjelper til å skape – uansett når pengene flyttes. Forskuddsbetalt husleie for neste år er derfor en eiendel nå og en kostnad neste år.

> Kontoplanen (NS 4102) nummererer kontoene: klasse 1 eiendeler, 2 egenkapital og gjeld, 3 inntekter, 4–7 kostnader, 8 finans og skatt.`,
`## Why keep accounts?
The accounts are the company's memory. **Owners** want to know whether their money is managed well, the **bank** whether the loan will be repaid, the **tax authorities** how much tax is due, and **management** needs figures to make decisions. In Norway the **Bookkeeping Act** requires every transaction to be documented with a voucher, and the **Accounting Act** requires, among others, limited companies to prepare **annual accounts** with an income statement, balance sheet and notes. The annual accounts are filed with the public **Register of Company Accounts** in Brønnøysund.

## The income statement step by step
- **Operating revenue**: sales and other income from operations.
- − **Operating expenses**: cost of goods sold, payroll, depreciation, other operating expenses (rent, power, advertising).
- = **Operating profit**: what the operations themselves earn.
- + **Financial income** (interest received) − **financial expenses** (interest paid).
- = **Profit before tax**.
- − tax expense = **Net income**, which is either paid out as **dividends** or retained, increasing **equity** (retained earnings).

## The balance sheet
The **assets side** shows what the capital has been used for, the **financing side** where it came from:
- **Non-current assets** are meant for long-term ownership or use: land, buildings, machines, vehicles, long-term investments.
- **Current assets** are tied to the flow of goods: inventory, receivables, bank deposits and cash.
- **Equity**: paid-in capital (share capital) plus retained earnings.
- **Long-term liabilities** fall due in more than a year (mortgages). **Short-term liabilities** fall due within a year: accounts payable, VAT owed, tax withheld and holiday pay.

## Debit and credit
In **double-entry bookkeeping** each transaction affects at least two accounts with equal amounts, one on the **debit** (left) side and one on the **credit** (right) side. So total debits always equal total credits. Rule of thumb:
- Assets and expenses: increase on debit, decrease on credit.
- Liabilities, equity and revenue: increase on credit, decrease on debit.

Examples: cash sale → debit bank, credit sales revenue. Wages paid → debit payroll expense, credit bank. Loan instalment → debit loan, credit bank.

## Accruals
The accounts follow the **realisation principle** and the **matching principle**: revenue is recorded when it is earned (the goods are delivered), and expenses in the same period as the revenue they help create – whenever the money actually moves. Rent prepaid for next year is therefore an asset now and an expense next year.

> The Norwegian chart of accounts (NS 4102) numbers the accounts: class 1 assets, 2 equity and liabilities, 3 revenue, 4–7 expenses, 8 financial items and tax.`);

DEEP("OREG", "Avskrivninger",
`## Hvorfor avskriver vi?
Et **driftsmiddel** er en eiendel som brukes i driften i flere år: maskiner, biler, datautstyr, bygninger. Det gir inntekter over hele levetiden, og etter **sammenstillingsprinsippet** skal kostnaden da fordeles over de samme årene. Avskrivningen er altså årets «forbruk» av eiendelen. Tomter avskrives ikke, fordi de ikke slites.

## Lineær avskrivning
Den vanligste metoden i **finansregnskapet** (årsregnskapet til eierne):
$$\\text{årlig avskrivning} = \\frac{\\text{anskaffelseskost} - \\text{utrangeringsverdi}}{\\text{levetid}}.$$
**Anskaffelseskost** omfatter kjøpspris pluss frakt og montering (uten fradragsberettiget mva). **Utrangeringsverdien** (restverdien) er det du venter å få for eiendelen til slutt. Bokført verdi synker like mye hvert år, som en rett linje.

## Saldoavskrivning
I **skatteregnskapet** bruker norske bedrifter **saldoavskrivning**. Driftsmidlene deles i **saldogrupper** med en makssats, for eksempel: kontormaskiner (a) 30 %, varebiler (c) 24 %, personbiler og maskiner (d) 20 %, forretningsbygg (i) 2 %. Hvert år avskrives satsen av **saldoen** (gjenværende verdi):
$$\\text{saldo etter } n \\text{ år} = K(1 - p)^n.$$
Avskrivningen blir størst de første årene og minker deretter. Saldoen blir aldri null av seg selv; er den lav nok, kan den føres til kostnad. Eiendeler under en viss verdi (**15 000 kr** inkl. mva for næringsdrivende) eller med levetid under tre år kan kostnadsføres direkte.

## Bokføring og virkninger
Avskrivningen føres som **debet avskrivningskostnad** og **kredit driftsmidlet** (eller en egen konto for akkumulerte avskrivninger). Virkningene er:
- **Resultatet** blir lavere, og dermed blir også **skatten** lavere – avskrivninger gir et **skattemessig skjold**.
- **Likviditeten** påvirkes ikke direkte, fordi pengene gikk ut da driftsmidlet ble kjøpt. Derfor legger man avskrivningene til igjen når man regner ut **kontantstrømmen** fra driften.
- **Balansen** viser driftsmidlet til bokført verdi.

## Gevinst og tap ved salg
Selges et driftsmiddel for mer enn bokført verdi, oppstår en **regnskapsmessig gevinst**; for mindre, et **tap**. Eksempel: bokført verdi 60 000 kr, salgspris 75 000 kr gir gevinst 15 000 kr.

> Ulike metoder gir samme totale kostnad over levetiden – bare fordelingen mellom årene er forskjellig.`,
`## Why do we depreciate?
A **fixed asset** is something used in operations for several years: machines, vehicles, computers, buildings. It generates revenue throughout its life, and under the **matching principle** its cost should be spread over the same years. Depreciation is thus the year's "consumption" of the asset. Land is not depreciated because it does not wear out.

## Straight-line depreciation
The most common method in **financial accounting** (the annual accounts for owners):
$$\\text{annual depreciation} = \\frac{\\text{acquisition cost} - \\text{residual value}}{\\text{useful life}}.$$
**Acquisition cost** includes the purchase price plus shipping and installation (excluding deductible VAT). The **residual value** is what you expect to get for the asset at the end. Book value falls by the same amount every year, as a straight line.

## Declining balance
In the **tax accounts**, Norwegian businesses use **declining-balance depreciation**. Assets are grouped into **balance groups** with a maximum rate, for example: office machines (a) 30 %, vans (c) 24 %, cars and machinery (d) 20 %, commercial buildings (i) 2 %. Each year the rate is applied to the **balance** (remaining value):
$$\\text{balance after } n \\text{ years} = K(1 - p)^n.$$
Depreciation is largest in the first years and then shrinks. The balance never reaches zero by itself; when it is low enough it may be expensed. Assets below a certain value (**15,000 NOK** incl. VAT for businesses) or with a life under three years can be expensed directly.

## Bookkeeping and effects
Depreciation is posted as **debit depreciation expense** and **credit the asset** (or a separate accumulated depreciation account). The effects are:
- **Profit** is lower, and so is **tax** – depreciation gives a **tax shield**.
- **Cash** is not affected directly, because the money left when the asset was bought. That is why depreciation is added back when calculating **cash flow** from operations.
- The **balance sheet** shows the asset at book value.

## Gains and losses on sale
If an asset is sold for more than its book value, there is an **accounting gain**; for less, a **loss**. Example: book value 60,000 NOK, sale price 75,000 NOK gives a gain of 15,000 NOK.

> Different methods give the same total expense over the asset's life – only the split between years differs.`);

DEEP("OREG", "Nøkkeltall og analyse",
`## Fra tall til innsikt
Et regnskap med millioner av kroner sier lite alene. **Nøkkeltall** setter tallene i forhold til hverandre, slik at du kan sammenligne bedriften med seg selv over tid (**tidsserie**), med andre i samme bransje (**bransjesammenligning**) og med budsjettet. Analysen svarer på tre spørsmål: Tjener bedriften nok (**lønnsomhet**)? Kan den betale regningene sine (**likviditet**)? Tåler den tap (**soliditet**)?

## Lønnsomhet
- **Resultatgrad / driftsmargin** = driftsresultat / salgsinntekt. Hvor mange øre av hver salgskrone blir igjen etter driftskostnadene? Varierer mye mellom bransjer: dagligvare har lav margin og høyt volum, programvare høy margin.
- **Totalkapitalens rentabilitet** = (driftsresultat + finansinntekter) / gjennomsnittlig totalkapital. Hvor godt forrentes all kapitalen i bedriften, uavhengig av hvordan den er finansiert?
- **Egenkapitalens rentabilitet** = resultat før skatt / gjennomsnittlig egenkapital. Eiernes avkastning; bør være høyere enn det de kunne fått med tilsvarende risiko andre steder.
- **Kapitalens omløpshastighet** = salgsinntekt / totalkapital. Hvor mange ganger kapitalen «snur» i løpet av året. Totalkapitalens rentabilitet = resultatgrad × omløpshastighet.

## Gearing
Når totalkapitalen forrentes bedre enn gjeldsrenten, øker egenkapitalrentabiliteten jo mer gjeld bedriften har – dette kalles **gearing** eller **finansiell giring**. Men det virker begge veier: går det dårlig, faller egenkapitalrentabiliteten ekstra mye, og risikoen øker.

## Likviditet
- **Likviditetsgrad 1** = omløpsmidler / kortsiktig gjeld. Tommelfingerregel: minst 2.
- **Likviditetsgrad 2** = (omløpsmidler − varelager) / kortsiktig gjeld. Varelageret er ikke alltid lett å gjøre om til penger. Tommelfingerregel: minst 1.
- **Arbeidskapital** = omløpsmidler − kortsiktig gjeld, i kroner.
- **Kundekredittid** = gjennomsnittlige kundefordringer / kredittsalg (inkl. mva) · 365 dager. Hvor lenge venter vi på pengene?

## Soliditet
- **Egenkapitalandel** = egenkapital / totalkapital. Hvor stor del av eiendelene som er finansiert av eierne; jo høyere, jo bedre tåler bedriften tap. Mange banker vil se minst 20–30 %.
- **Gjeldsgrad** = gjeld / egenkapital. En gjeldsgrad på 2 betyr 2 kroner gjeld per krone egenkapital.

## Fallgruver
Nøkkeltall er **symptomer**, ikke diagnoser. Ulike avskrivningsmetoder, sesongsvingninger (balansen er et øyeblikksbilde 31. desember) og bransjeforskjeller kan gi misvisende tall. Se alltid flere nøkkeltall sammen og over flere år.

> Lønnsomhet uten likviditet gir konkurs; likviditet uten lønnsomhet tømmer kassen sakte.`,
`## From figures to insight
A set of accounts with millions of kroner says little on its own. **Key ratios** relate the figures to each other, so that you can compare the company with itself over time (**trend analysis**), with others in the same industry (**benchmarking**) and with the budget. The analysis answers three questions: Does the company earn enough (**profitability**)? Can it pay its bills (**liquidity**)? Can it absorb losses (**solvency**)?

## Profitability
- **Operating margin** = operating profit / sales revenue. How many øre of each krone of sales remain after operating costs? Varies a lot between industries: groceries have low margins and high volume, software high margins.
- **Return on assets** = (operating profit + financial income) / average total assets. How well is all the capital in the company earning, regardless of how it is financed?
- **Return on equity** = profit before tax / average equity. The owners' return; it should beat what they could earn elsewhere at similar risk.
- **Asset turnover** = sales revenue / total assets. How many times the capital "turns over" during the year. Return on assets = operating margin × asset turnover.

## Leverage
When total assets earn more than the interest rate on debt, return on equity rises the more debt the company has – this is called **financial leverage** or **gearing**. But it works both ways: when things go badly, return on equity falls extra fast and risk increases.

## Liquidity
- **Current ratio** = current assets / current liabilities. Rule of thumb: at least 2.
- **Quick ratio** = (current assets − inventory) / current liabilities. Inventory is not always easy to turn into cash. Rule of thumb: at least 1.
- **Working capital** = current assets − current liabilities, in kroner.
- **Days sales outstanding** = average receivables / credit sales (incl. VAT) · 365 days. How long do we wait for our money?

## Solvency
- **Equity ratio** = equity / total assets. The share of assets financed by owners; the higher, the better the company can absorb losses. Many banks want at least 20–30 %.
- **Debt-to-equity ratio** = liabilities / equity. A ratio of 2 means 2 kroner of debt per krone of equity.

## Pitfalls
Ratios are **symptoms**, not diagnoses. Different depreciation methods, seasonal swings (the balance sheet is a snapshot on 31 December) and industry differences can give misleading figures. Always look at several ratios together and over several years.

> Profit without liquidity leads to bankruptcy; liquidity without profit slowly drains the till.`);

DEEP("OREG", "Merverdiavgift",
`## Slik fungerer mva-systemet
Merverdiavgift er en **indirekte skatt** på forbruk. Den legges på i hvert ledd i verdikjeden, men hver bedrift får trekke fra mvaen den selv har betalt. Dermed betales det bare avgift av **merverdien** – verdien som legges til i hvert ledd – og hele avgiften ender til slutt hos **forbrukeren**, som ikke får fradrag.

Eksempel på en kjede med 25 % mva:
- Produsenten selger råvarer for 400 kr + 100 kr mva. Betaler 100 kr til staten.
- Fabrikken selger varen til butikken for 1000 kr + 250 kr mva. Har betalt 100 kr inngående, betaler 250 − 100 = 150 kr.
- Butikken selger til kunden for 1600 kr + 400 kr mva. Betaler 400 − 250 = 150 kr.
- Til sammen har staten fått 100 + 150 + 150 = 400 kr = 25 % av sluttprisen eks. mva, og kunden har betalt alt.

## Registrering og satser
En virksomhet må registrere seg i **Merverdiavgiftsregisteret** når omsetningen av avgiftspliktige varer og tjenester overstiger **50 000 kr** i løpet av tolv måneder. Satsene er 25 % (alminnelig), 15 % (næringsmidler) og 12 % (persontransport, overnatting, kino, idrettsarrangementer). Noe er **fritatt** med 0 % sats (for eksempel eksport, aviser), mens annet er helt **unntatt** fra loven (for eksempel helsetjenester, undervisning, finans, utleie av bolig). Forskjellen er viktig: ved fritak får bedriften likevel fradrag for inngående mva, ved unntak gjør den ikke det.

## Bokføring og mva-melding
- Salg: debet bank/kunde (inkl. mva), kredit salgsinntekt (eks. mva) og kredit **utgående mva**.
- Kjøp: debet varekostnad (eks. mva) og debet **inngående mva**, kredit bank/leverandør.
- Skyldig mva er **kortsiktig gjeld** til staten. Vanligvis sendes **mva-meldingen** og betales seks ganger i året (annenhver måned). Er inngående mva størst, får bedriften penger tilbake.

## Regnestykker
- Pris eks. mva → inkl.: gang med $(1 + s)$, der $s$ er satsen som desimaltall.
- Pris inkl. → eks.: del på $(1 + s)$.
- Mva i en pris inkl. mva: $\\text{pris} \\cdot \\dfrac{s}{1 + s}$. Med 25 %: én femdel. Med 15 %: $\\dfrac{15}{115}$.

> Fradrag forutsetter at kjøpet gjelder den avgiftspliktige virksomheten – privat forbruk og representasjon gir ikke fradrag.`,
`## How the VAT system works
Value added tax is an **indirect tax** on consumption. It is charged at every link in the value chain, but each business may deduct the VAT it has paid itself. So tax is paid only on the **value added** at each step, and the whole tax ends up with the **consumer**, who gets no deduction.

Example chain at 25 % VAT:
- The producer sells raw materials for 400 NOK + 100 NOK VAT. Pays 100 NOK to the state.
- The factory sells the product to the shop for 1000 NOK + 250 NOK VAT. Having paid 100 NOK input VAT, it pays 250 − 100 = 150 NOK.
- The shop sells to the customer for 1600 NOK + 400 NOK VAT. Pays 400 − 250 = 150 NOK.
- In total the state has received 100 + 150 + 150 = 400 NOK = 25 % of the final price excl. VAT, and the customer has paid all of it.

## Registration and rates
A business must register in the **VAT Register** when its sales of taxable goods and services exceed **50,000 NOK** within twelve months. The rates are 25 % (standard), 15 % (foodstuffs) and 12 % (passenger transport, accommodation, cinema, sporting events). Some supplies are **zero-rated** at 0 % (for example exports, newspapers), while others are fully **exempt** from the Act (for example health care, education, finance, residential rent). The difference matters: zero-rated businesses still deduct input VAT, exempt ones do not.

## Bookkeeping and VAT returns
- Sale: debit bank/customer (incl. VAT), credit sales revenue (excl. VAT) and credit **output VAT**.
- Purchase: debit cost of goods (excl. VAT) and debit **input VAT**, credit bank/supplier.
- VAT owed is a **short-term liability** to the state. Usually the **VAT return** is filed and paid six times a year (every two months). If input VAT is larger, the business gets a refund.

## Calculations
- Price excl. → incl. VAT: multiply by $(1 + s)$, where $s$ is the rate as a decimal.
- Price incl. → excl.: divide by $(1 + s)$.
- VAT inside a price incl. VAT: $\\text{price} \\cdot \\dfrac{s}{1 + s}$. At 25 %: one fifth. At 15 %: $\\dfrac{15}{115}$.

> Deductions require the purchase to relate to the taxable business – private consumption and entertainment give no deduction.`);

// ================= MATEMATIKK FOR ØKONOMER =================
DEEP("OMAT", "Funksjoner, marginalanalyse og elastisitet",
`## Økonomiske funksjoner
Økonomer beskriver sammenhenger med funksjoner av mengden $x$:
- **Kostnadsfunksjonen** $K(x)$: totale kostnader ved produksjon av $x$ enheter. Ofte $K(x) = ax^2 + bx + c$, der $c$ er de faste kostnadene og kvadratleddet fanger opp at produksjonen blir dyrere nær kapasitetsgrensen.
- **Inntektsfunksjonen** $I(x) = p \\cdot x$ ved fast pris. Må prisen senkes for å selge mer, er prisen en funksjon av mengden, $p(x)$, og $I(x) = p(x) \\cdot x$.
- **Overskuddsfunksjonen** $O(x) = I(x) - K(x)$.
- **Enhetskostnaden** $E(x) = \\dfrac{K(x)}{x}$.

## Marginalanalyse
**Grensekostnaden** $K'(x)$ er omtrent hva det koster å produsere én enhet til, og **grenseinntekten** $I'(x)$ hva én enhet til gir i inntekt. Den viktigste regelen i mikroøkonomi følger direkte:
$$O'(x) = I'(x) - K'(x) = 0 \\iff I'(x) = K'(x).$$
Overskuddet er størst der **grenseinntekt = grensekostnad**. Er grenseinntekten større, lønner det seg å produsere mer; er grensekostnaden større, bør man produsere mindre. Sjekk at det er et toppunkt med $O''(x) < 0$ eller fortegnslinje.

En annen nyttig regel: enhetskostnaden er **minst** der den er lik grensekostnaden, $E(x) = K'(x)$. Når grensekostnaden er lavere enn snittet, trekker en ny enhet snittet ned; når den er høyere, trekkes snittet opp. Denne mengden kalles **kostnadsoptimum**.

## Elastisitet
Elastisitet måler hvor **følsom** én størrelse er for endringer i en annen, i **prosent**. Priselastisiteten til etterspørselen er
$$E_p = \\frac{\\text{prosentvis endring i mengde}}{\\text{prosentvis endring i pris}} = \\frac{x'(p) \\cdot p}{x(p)}.$$
Tolkning: $E_p = -2$ betyr at 1 % høyere pris gir omtrent 2 % lavere etterspurt mengde.
- $|E_p| > 1$: **elastisk** etterspørsel. Prisøkning gir **lavere** inntekt (mange alternativer: en bestemt brusmerkevare, flyreiser på fritiden).
- $|E_p| < 1$: **uelastisk**. Prisøkning gir **høyere** inntekt (strøm, bensin og medisiner på kort sikt, tobakk).
- $|E_p| = 1$: inntekten er størst.

Tilsvarende finnes **inntektselastisitet** (hvordan etterspørselen reagerer på inntekten: positive for normale goder, over 1 for luksusgoder, negative for mindreverdige goder) og **krysspriselastisitet** (positiv for substitutter som smør og margarin, negativ for komplementer som printer og blekk).

> Derivert = endring per enhet. Elastisitet = endring i prosent per prosent.`,
`## Economic functions
Economists describe relationships with functions of the quantity $x$:
- **The cost function** $C(x)$: total cost of producing $x$ units. Often $C(x) = ax^2 + bx + c$, where $c$ is fixed cost and the squared term captures that production gets more expensive near capacity.
- **The revenue function** $R(x) = p \\cdot x$ at a fixed price. If the price must fall to sell more, price is a function of quantity, $p(x)$, and $R(x) = p(x) \\cdot x$.
- **The profit function** $P(x) = R(x) - C(x)$.
- **Average cost** $A(x) = \\dfrac{C(x)}{x}$.

## Marginal analysis
**Marginal cost** $C'(x)$ is roughly what it costs to produce one more unit, and **marginal revenue** $R'(x)$ what one more unit brings in. The most important rule in microeconomics follows directly:
$$P'(x) = R'(x) - C'(x) = 0 \\iff R'(x) = C'(x).$$
Profit is highest where **marginal revenue = marginal cost**. If marginal revenue is larger, it pays to produce more; if marginal cost is larger, produce less. Check that it is a maximum with $P''(x) < 0$ or a sign chart.

Another useful rule: average cost is **lowest** where it equals marginal cost, $A(x) = C'(x)$. When marginal cost is below the average, one more unit pulls the average down; when it is above, it pulls it up. This quantity is the **cost optimum**.

## Elasticity
Elasticity measures how **sensitive** one quantity is to changes in another, in **percent**. The price elasticity of demand is
$$E_p = \\frac{\\text{percentage change in quantity}}{\\text{percentage change in price}} = \\frac{x'(p) \\cdot p}{x(p)}.$$
Interpretation: $E_p = -2$ means that a 1 % higher price gives about 2 % lower quantity demanded.
- $|E_p| > 1$: **elastic** demand. A price rise gives **lower** revenue (many alternatives: a particular soft-drink brand, leisure flights).
- $|E_p| < 1$: **inelastic**. A price rise gives **higher** revenue (electricity, petrol and medicines in the short run, tobacco).
- $|E_p| = 1$: revenue is at its maximum.

Similarly there is **income elasticity** (how demand responds to income: positive for normal goods, above 1 for luxuries, negative for inferior goods) and **cross-price elasticity** (positive for substitutes such as butter and margarine, negative for complements such as printers and ink).

> Derivative = change per unit. Elasticity = percentage change per percent.`);

// ================= STATISTIKK =================
DEEP("OSTAT", "Beskrivende statistikk",
`## Data og variabler
Statistikk starter med **data**: observasjoner av en eller flere **variabler**. Det er nyttig å skille mellom
- **kategoriske** variabler (kjønn, bransje, fylke) – her teller du opp **frekvenser** og bruker søyle- eller sektordiagram
- **numeriske** variabler, som kan være **diskrete** (antall barn, antall solgte biler) eller **kontinuerlige** (inntekt, høyde, tid). Her bruker du **histogram**, boksplott og mål for sentrum og spredning.

Skiller også mellom **populasjonen** (alle enhetene du vil si noe om) og **utvalget** (de du faktisk har målt). Beskrivende statistikk oppsummerer utvalget; **inferens** (konfidensintervall, hypotesetesting) generaliserer til populasjonen.

## Mål for sentrum
- **Gjennomsnitt** $\\bar{x} = \\dfrac{1}{n}\\sum x_i$. Påvirkes sterkt av ekstreme verdier.
- **Median**: den midterste verdien når dataene er sortert (snittet av de to midterste ved partall). **Robust** mot ekstremverdier – derfor oppgir SSB ofte medianinntekt.
- **Typetall** (modus): verdien som forekommer oftest; den eneste som gir mening for kategoriske data.

Ved **høyreskjeve** fordelinger (som inntekt og boligpriser: mange lave verdier og noen få svært høye) er gjennomsnittet større enn medianen.

## Mål for spredning
- **Variasjonsbredde**: største minus minste verdi.
- **Kvartiler**: $Q_1$ (25 % under), medianen ($Q_2$) og $Q_3$ (75 % under). **Kvartilbredden** $Q_3 - Q_1$ viser spredningen i de midterste 50 %.
- **Utvalgsvarians** $s^2 = \\dfrac{1}{n-1}\\sum (x_i - \\bar{x})^2$ og **standardavvik** $s = \\sqrt{s^2}$. Standardavviket har samme enhet som dataene og kan tolkes som et typisk avvik fra snittet. Vi deler på $n - 1$ i utvalg for å få en forventningsrett estimator.
- **Variasjonskoeffisient** $s / \\bar{x}$: relativ spredning, nyttig når du sammenligner variabler med ulik størrelse.

## Boksplott og uteliggere
Et **boksplott** viser minimum, $Q_1$, median, $Q_3$ og maksimum. Verdier mer enn $1{,}5 \\cdot (Q_3 - Q_1)$ utenfor boksen markeres ofte som **uteliggere**. Undersøk dem: er det en målefeil, eller en ekte og interessant observasjon?

## Sammenheng mellom to variabler
Et **spredningsplott** viser sammenhengen mellom to numeriske variabler. **Korrelasjonskoeffisienten** $r$ ligger mellom −1 og 1 og måler hvor sterk den **lineære** sammenhengen er. $r$ nær 0 betyr ingen lineær sammenheng (men kanskje en krum). Husk: **korrelasjon er ikke kausalitet** – iskremsalg og drukningsulykker korrelerer, fordi begge øker om sommeren.

> Rapporter alltid både sentrum og spredning: snittlønn 600 000 kr sier lite uten å vite om nesten alle tjener det, eller om noen få tjener millioner.`,
`## Data and variables
Statistics starts with **data**: observations of one or more **variables**. It helps to distinguish between
- **categorical** variables (gender, industry, county) – here you count **frequencies** and use bar or pie charts
- **numerical** variables, which can be **discrete** (number of children, cars sold) or **continuous** (income, height, time). Here you use **histograms**, box plots and measures of centre and spread.

Also distinguish the **population** (all the units you want to say something about) from the **sample** (those you actually measured). Descriptive statistics summarises the sample; **inference** (confidence intervals, hypothesis tests) generalises to the population.

## Measures of centre
- **Mean** $\\bar{x} = \\dfrac{1}{n}\\sum x_i$. Strongly affected by extreme values.
- **Median**: the middle value when the data are sorted (the average of the two middle values for an even count). **Robust** to extremes – which is why Statistics Norway often reports median income.
- **Mode**: the most frequent value; the only one that makes sense for categorical data.

For **right-skewed** distributions (such as income and house prices: many low values and a few very high ones) the mean is larger than the median.

## Measures of spread
- **Range**: largest minus smallest value.
- **Quartiles**: $Q_1$ (25 % below), the median ($Q_2$) and $Q_3$ (75 % below). The **interquartile range** $Q_3 - Q_1$ shows the spread of the middle 50 %.
- **Sample variance** $s^2 = \\dfrac{1}{n-1}\\sum (x_i - \\bar{x})^2$ and **standard deviation** $s = \\sqrt{s^2}$. The standard deviation has the same unit as the data and can be read as a typical distance from the mean. We divide by $n - 1$ in samples to get an unbiased estimator.
- **Coefficient of variation** $s / \\bar{x}$: relative spread, useful when comparing variables of different size.

## Box plots and outliers
A **box plot** shows the minimum, $Q_1$, median, $Q_3$ and maximum. Values more than $1.5 \\cdot (Q_3 - Q_1)$ outside the box are often marked as **outliers**. Investigate them: a measurement error, or a real and interesting observation?

## Relationships between two variables
A **scatter plot** shows the relationship between two numerical variables. The **correlation coefficient** $r$ lies between −1 and 1 and measures how strong the **linear** relationship is. $r$ near 0 means no linear relationship (but maybe a curved one). Remember: **correlation is not causation** – ice-cream sales and drownings correlate because both rise in summer.

> Always report both centre and spread: an average salary of 600,000 NOK says little unless you know whether nearly everyone earns that, or a few earn millions.`);

DEEP("OSTAT", "Konfidensintervall",
`## Fra utvalg til populasjon
Vi vil vite noe om en **parameter** i populasjonen – for eksempel gjennomsnittlig handlebeløp $\\mu$ blant alle kundene eller andelen $p$ som vil stemme på et parti. Vi kan ikke spørre alle, så vi trekker et **tilfeldig utvalg** og regner ut en **estimator**: $\\bar{x}$ for $\\mu$, $\\hat{p}$ for $p$. Et nytt utvalg ville gitt et litt annet svar. Denne **utvalgsvariasjonen** er grunnen til at vi oppgir et intervall i stedet for ett tall.

## Sentralgrenseteoremet
Hvis utvalget er stort nok (tommelfingerregel $n \\geq 30$), er $\\bar{x}$ tilnærmet **normalfordelt** med forventning $\\mu$ og standardavvik $\\dfrac{\\sigma}{\\sqrt{n}}$ – uansett hvordan selve dataene er fordelt. $\\dfrac{\\sigma}{\\sqrt{n}}$ kalles **standardfeilen**. Den minker med kvadratroten av $n$: for å halvere usikkerheten trenger du **fire ganger** så stort utvalg.

## Intervallet for et gjennomsnitt
$$\\bar{x} \\pm z \\cdot \\frac{s}{\\sqrt{n}}.$$
- $z = 1{,}645$ for 90 %, $z = 1{,}96$ for 95 % og $z = 2{,}576$ for 99 % konfidens.
- Når $\\sigma$ er ukjent og estimeres med $s$, og særlig ved små utvalg, bruker man **t-fordelingen** med $n - 1$ frihetsgrader i stedet for $z$. Den har tykkere haler, slik at intervallet blir litt bredere. For store $n$ er $t$ og $z$ nesten like.
- Leddet $z \\cdot \\dfrac{s}{\\sqrt{n}}$ kalles **feilmarginen**.

## Intervallet for en andel
$$\\hat{p} \\pm z \\sqrt{\\frac{\\hat{p}(1 - \\hat{p})}{n}}.$$
Eksempel: i en meningsmåling med 1000 personer svarer 25 % at de vil stemme på et parti. Feilmarginen blir $1{,}96\\sqrt{0{,}25 \\cdot 0{,}75 / 1000} \\approx 0{,}027$, altså 95 %-intervallet 22,3 % til 27,7 %. Derfor er endringer på ett-to prosentpoeng mellom målinger ofte bare støy.

## Hvordan tolke et konfidensintervall
Riktig: «Metoden gir intervaller som fanger den sanne verdien i 95 % av tilfellene.» Gjentar vi undersøkelsen 100 ganger, vil omtrent 95 av intervallene inneholde $\\mu$. Feil: «Det er 95 % sannsynlig at $\\mu$ ligger akkurat i dette intervallet» – $\\mu$ er et fast tall, det er intervallet som varierer.

## Hva påvirker bredden?
- Høyere **konfidensnivå** → bredere intervall (sikrere, men mindre presist).
- Større **utvalg** → smalere intervall.
- Større **spredning** i dataene → bredere intervall.
- **Nødvendig utvalgsstørrelse** for feilmargin $E$: $n = \\left(\\dfrac{z \\sigma}{E}\\right)^2$.

> Konfidensintervallet tar bare høyde for tilfeldig utvalgsvariasjon – ikke for skjeve utvalg, frafall eller ledende spørsmål.`,
`## From sample to population
We want to know a **parameter** of the population – for example the average purchase $\\mu$ among all customers, or the share $p$ who will vote for a party. We cannot ask everyone, so we draw a **random sample** and calculate an **estimator**: $\\bar{x}$ for $\\mu$, $\\hat{p}$ for $p$. A new sample would give a slightly different answer. This **sampling variation** is why we report an interval instead of a single number.

## The central limit theorem
If the sample is large enough (rule of thumb $n \\geq 30$), $\\bar{x}$ is approximately **normally distributed** with mean $\\mu$ and standard deviation $\\dfrac{\\sigma}{\\sqrt{n}}$ – whatever the distribution of the data themselves. $\\dfrac{\\sigma}{\\sqrt{n}}$ is called the **standard error**. It shrinks with the square root of $n$: to halve the uncertainty you need a sample **four times** as large.

## The interval for a mean
$$\\bar{x} \\pm z \\cdot \\frac{s}{\\sqrt{n}}.$$
- $z = 1.645$ for 90 %, $z = 1.96$ for 95 % and $z = 2.576$ for 99 % confidence.
- When $\\sigma$ is unknown and estimated by $s$, especially in small samples, the **t-distribution** with $n - 1$ degrees of freedom is used instead of $z$. It has heavier tails, so the interval gets a little wider. For large $n$, $t$ and $z$ are almost equal.
- The term $z \\cdot \\dfrac{s}{\\sqrt{n}}$ is the **margin of error**.

## The interval for a proportion
$$\\hat{p} \\pm z \\sqrt{\\frac{\\hat{p}(1 - \\hat{p})}{n}}.$$
Example: in a poll of 1000 people, 25 % say they will vote for a party. The margin of error is $1.96\\sqrt{0.25 \\cdot 0.75 / 1000} \\approx 0.027$, giving the 95 % interval 22.3 % to 27.7 %. That is why changes of one or two percentage points between polls are often just noise.

## How to interpret a confidence interval
Right: "The method gives intervals that capture the true value 95 % of the time." If we repeated the survey 100 times, about 95 of the intervals would contain $\\mu$. Wrong: "There is a 95 % probability that $\\mu$ lies in exactly this interval" – $\\mu$ is a fixed number; it is the interval that varies.

## What affects the width?
- Higher **confidence level** → wider interval (more certain, but less precise).
- Larger **sample** → narrower interval.
- More **spread** in the data → wider interval.
- **Required sample size** for margin of error $E$: $n = \\left(\\dfrac{z \\sigma}{E}\\right)^2$.

> A confidence interval only accounts for random sampling variation – not for biased samples, non-response or leading questions.`);

// ================= SAMFUNNSØKONOMI =================
DEEP("OSAM", "Tilbud og etterspørsel",
`## Etterspørselen
**Etterspørselskurven** viser hvor mye forbrukerne vil kjøpe ved ulike priser. Den heller **nedover**: når prisen stiger, kjøper vi mindre, fordi vi bytter til andre varer (**substitusjonseffekten**) og fordi vi får mindre råd (**inntektseffekten**). En prisendring gir en bevegelse **langs** kurven. Andre forhold **forskyver** hele kurven:
- **inntekt** (høyere inntekt → mer etterspørsel etter normale goder, mindre etter mindreverdige goder)
- prisen på **substitutter** (dyrere smør → mer margarin) og **komplementer** (dyrere bensin → færre bensinbiler)
- **preferanser**, mote, reklame og forventninger (venter folk prisøkning, kjøper de nå)
- antall kjøpere i markedet

## Tilbudet
**Tilbudskurven** viser hvor mye produsentene vil selge ved ulike priser. Den heller **oppover**: høyere pris gjør det lønnsomt å produsere mer og lokker nye bedrifter inn. Kurven forskyves av **produksjonskostnader** (råvarer, lønn, energi), **teknologi**, **skatter og subsidier**, vær og avlinger, og antall produsenter.

## Likevekt
Der kurvene krysser, er **likevektsprisen** og **likevektskvantumet**. Er prisen høyere, blir det **overskuddstilbud**: varene hoper seg opp, og selgerne setter ned prisen. Er den lavere, blir det **overskuddsetterspørsel**: køer og utsolgte hyller, og prisen presses opp. Markedet «rydder» seg selv – Adam Smiths **usynlige hånd**.

Slik analyserer du en endring: 1) Hvilken kurve påvirkes? 2) Forskyves den til høyre eller venstre? 3) Hva skjer med pris og mengde? Eksempel: tørke gir dårlig avling → tilbudet forskyves til venstre → høyere pris, lavere mengde.

## Velferd
- **Konsumentoverskudd**: forskjellen mellom hva kjøperne var villige til å betale og det de faktisk betaler (arealet under etterspørselskurven og over prisen).
- **Produsentoverskudd**: forskjellen mellom prisen og produsentenes kostnad (arealet over tilbudskurven og under prisen).
- I et frikonkurransemarked uten eksterne virkninger er summen størst i likevekt – markedet er **effektivt**.

## Når staten griper inn
- **Avgift**: forskyver tilbudskurven opp; prisen stiger, mengden faller. Hvem som bærer avgiften, avhenger av **elastisitetene**: den siden som er minst prisfølsom, bærer mest. Avgiften gir et **effektivitetstap** (dødvektstap) fordi noen lønnsomme handler ikke blir gjort.
- **Maksimalpris** under likevekt (husleieregulering) gir mangel og køer. **Minstepris** over likevekt (minstelønn, landbrukspriser) gir overskudd.
- **Subsidier** senker prisen og øker mengden, men koster staten penger.

> Forskyvning av kurven ≠ bevegelse langs kurven. Pris på varen selv gir bevegelse; alt annet gir forskyvning.`,
`## Demand
The **demand curve** shows how much consumers want to buy at different prices. It slopes **downward**: when the price rises we buy less, because we switch to other goods (the **substitution effect**) and because we can afford less (the **income effect**). A price change gives a movement **along** the curve. Other factors **shift** the whole curve:
- **income** (higher income → more demand for normal goods, less for inferior goods)
- the price of **substitutes** (dearer butter → more margarine) and **complements** (dearer petrol → fewer petrol cars)
- **preferences**, fashion, advertising and expectations (if people expect a price rise, they buy now)
- the number of buyers in the market

## Supply
The **supply curve** shows how much producers want to sell at different prices. It slopes **upward**: a higher price makes it profitable to produce more and attracts new firms. The curve shifts with **production costs** (materials, wages, energy), **technology**, **taxes and subsidies**, weather and harvests, and the number of producers.

## Equilibrium
Where the curves cross we find the **equilibrium price** and **equilibrium quantity**. If the price is higher, there is **excess supply**: goods pile up and sellers cut prices. If it is lower, there is **excess demand**: queues and empty shelves, and the price is pushed up. The market "clears" itself – Adam Smith's **invisible hand**.

To analyse a change: 1) Which curve is affected? 2) Does it shift right or left? 3) What happens to price and quantity? Example: drought ruins the harvest → supply shifts left → higher price, lower quantity.

## Welfare
- **Consumer surplus**: the difference between what buyers were willing to pay and what they actually pay (the area under the demand curve and above the price).
- **Producer surplus**: the difference between the price and producers' cost (the area above the supply curve and below the price).
- In a perfectly competitive market without externalities, the total is largest at equilibrium – the market is **efficient**.

## When the state intervenes
- **A tax**: shifts the supply curve up; the price rises and quantity falls. Who bears the tax depends on the **elasticities**: the less price-sensitive side bears more. The tax creates an **efficiency loss** (deadweight loss) because some profitable trades no longer happen.
- A **price ceiling** below equilibrium (rent control) creates shortages and queues. A **price floor** above equilibrium (minimum wage, agricultural prices) creates a surplus.
- **Subsidies** lower the price and raise quantity, but cost the state money.

> A shift of the curve ≠ a movement along it. The good's own price gives a movement; everything else gives a shift.`);

DEEP("OSAM", "Markedsformer og konkurranse",
`## Fullkommen konkurranse
I **frikonkurranse** er det mange små kjøpere og selgere, varene er **like** (homogene), alle har full informasjon, og det er fri etablering. Ingen enkeltbedrift kan påvirke prisen – den er **pristaker**. Bedriften produserer der **pris = grensekostnad**. På lang sikt lokker overskudd nye bedrifter inn til prisen er presset ned til laveste gjennomsnittskostnad, og det **økonomiske overskuddet** blir null. Markeder for råvarer, fisk og aksjer ligner mest på dette.

## Monopol
En **monopolist** er eneste selger av en vare uten nære substitutter. Den møter hele den fallende etterspørselskurven og er **prissetter**. Fordi den må senke prisen på alle enheter for å selge én til, er **grenseinntekten lavere enn prisen**. Monopolisten produserer der grenseinntekt = grensekostnad og tar en pris over grensekostnaden. Resultatet er **høyere pris, lavere mengde** og et **effektivitetstap** sammenlignet med frikonkurranse.

Monopoler oppstår gjennom
- **naturlige monopol**: så store faste kostnader at én aktør er billigst (strømnett, jernbanenett) – reguleres gjerne av staten
- **juridiske** etableringshindringer: patenter, opphavsrett, lisenser (Vinmonopolet er et politisk valgt monopol)
- kontroll over en knapp ressurs eller sterke **nettverkseffekter** (sosiale medier: tjenesten blir mer verdifull jo flere som bruker den)

## Monopolistisk konkurranse
Mange bedrifter selger **litt ulike** varer – frisører, restauranter, klesmerker. Hver har litt markedsmakt gjennom merkevare, beliggenhet og kvalitet, men fri etablering presser overskuddet mot null på lang sikt. Reklame og produktutvikling er viktige konkurransevirkemidler.

## Oligopol
Noen få store aktører dominerer: dagligvarekjedene i Norge (NorgesGruppen, Rema 1000, Coop), mobiloperatører, flyselskaper. Bedriftene er **gjensidig avhengige** – hva én gjør, påvirker de andre. Dette analyseres med **spillteori**. Oligopolister har fristelse til å **samarbeide** (karteller) for å holde prisene oppe, men hver enkelt tjener på å bryte avtalen – et **fangens dilemma**. Ofte konkurrerer de heller på reklame, lojalitetsprogrammer og produktutvalg enn på pris.

## Konkurransepolitikk
**Konkurranseloven** forbyr **prissamarbeid** og andre konkurransebegrensende avtaler (§ 10) og **misbruk av dominerende stilling** (§ 11), for eksempel underprising for å presse ut konkurrenter. **Konkurransetilsynet** håndhever loven, kan gi store gebyrer og må godkjenne større **fusjoner** og oppkjøp. EØS-avtalen gir tilsvarende regler for hele det indre markedet.

> Jo færre aktører og jo større etableringshindringer, desto mer markedsmakt – og desto høyere priser for forbrukerne.`,
`## Perfect competition
In **perfect competition** there are many small buyers and sellers, the goods are **identical** (homogeneous), everyone has full information and entry is free. No single firm can affect the price – it is a **price taker**. The firm produces where **price = marginal cost**. In the long run profits attract new firms until the price is pushed down to the lowest average cost, and **economic profit** is zero. Markets for commodities, fish and shares come closest.

## Monopoly
A **monopolist** is the only seller of a good without close substitutes. It faces the whole downward-sloping demand curve and is a **price maker**. Because it must lower the price on all units to sell one more, **marginal revenue is below the price**. The monopolist produces where marginal revenue = marginal cost and charges a price above marginal cost. The result is a **higher price, lower quantity** and an **efficiency loss** compared with perfect competition.

Monopolies arise through
- **natural monopolies**: fixed costs so large that a single firm is cheapest (power grids, rail networks) – often regulated by the state
- **legal** barriers to entry: patents, copyright, licences (Vinmonopolet is a politically chosen monopoly)
- control of a scarce resource or strong **network effects** (social media: the service becomes more valuable the more people use it)

## Monopolistic competition
Many firms sell **slightly different** products – hairdressers, restaurants, clothing brands. Each has some market power through brand, location and quality, but free entry pushes profits towards zero in the long run. Advertising and product development are key competitive tools.

## Oligopoly
A few large players dominate: the grocery chains in Norway (NorgesGruppen, Rema 1000, Coop), mobile operators, airlines. The firms are **interdependent** – what one does affects the others. This is analysed with **game theory**. Oligopolists are tempted to **cooperate** (cartels) to keep prices high, but each gains by breaking the agreement – a **prisoner's dilemma**. They often compete on advertising, loyalty schemes and product range rather than on price.

## Competition policy
The **Competition Act** prohibits **price fixing** and other anti-competitive agreements (section 10) and **abuse of a dominant position** (section 11), such as predatory pricing to drive out rivals. The **Norwegian Competition Authority** enforces the Act, can impose large fines and must approve larger **mergers** and acquisitions. The EEA Agreement gives similar rules for the whole internal market.

> The fewer the players and the higher the barriers to entry, the more market power – and the higher the prices for consumers.`);

DEEP("OSAM", "Makroøkonomi: BNP, inflasjon og rente",
`## Bruttonasjonalprodukt
**BNP** er verdien av alle varer og tjenester produsert i et land i løpet av et år, minus innsatsfaktorene (for å unngå dobbelttelling). Det kan regnes ut på tre måter som skal gi samme svar: summen av **verdiskaping** i alle næringer, summen av **inntekter** (lønn og overskudd), eller summen av **anvendelsen**:
$$\\text{BNP} = C + I + G + (X - M),$$
privat konsum + investeringer + offentlig konsum + eksport minus import. I Norge skiller vi ofte ut olje og gass og ser på **Fastlands-Norge**, fordi petroleumsproduksjonen svinger mye og ikke sier så mye om resten av økonomien.
- **Nominelt** BNP måles i dagens priser; **reelt** BNP er justert for prisendringer og viser den faktiske produksjonsveksten.
- BNP **per innbygger** brukes til å sammenligne levestandard, men måler ikke fordeling, fritid, ubetalt arbeid eller miljøskader.

## Konjunkturer
Økonomien vokser ikke jevnt. Perioder med høy vekst og lav ledighet (**høykonjunktur**) veksler med lav vekst og stigende ledighet (**lavkonjunktur**). To kvartaler på rad med fallende BNP kalles ofte **resesjon**. Avstanden mellom faktisk og «normal» produksjon kalles **produksjonsgapet**.

## Inflasjon
**Inflasjon** er en vedvarende økning i det generelle prisnivået, målt med **konsumprisindeksen** (KPI) fra SSB. Når prisene stiger, får du mindre for hver krone – **kjøpekraften** synker. Årsaker:
- **Etterspørselspress**: høy etterspørsel i høykonjunktur gjør at bedriftene kan sette opp prisene.
- **Kostnadspress**: dyrere energi, råvarer eller lønn sendes videre til kundene.
- **Svakere krone**: importvarer blir dyrere.
- **Forventninger**: venter alle høy inflasjon, krever de høyere lønn og setter opp prisene – en selvforsterkende spiral.

**Reallønnsvekst** ≈ nominell lønnsvekst − inflasjon. **Realrente** ≈ nominell rente − inflasjon.

## Norges Bank og renten
Norges Bank har et **inflasjonsmål** på **2 %** over tid. Det viktigste virkemiddelet er **styringsrenten** – renten bankene får på innskudd i sentralbanken, som påvirker alle andre renter. Virkningene av en renteøkning:
- Lån blir dyrere, folk sparer mer og bruker mindre, og bedriftene investerer mindre.
- **Kronekursen** styrkes, så importvarer blir billigere.
- Etterspørselen og presset i økonomien dempes, og inflasjonen faller etter hvert – men ledigheten kan øke.

Virkningen kommer med **forsinkelse** på ett til to år, så Norges Bank må styre etter prognoser.

## Finanspolitikk
Regjeringen og Stortinget påvirker økonomien gjennom **statsbudsjettet**: skatter, avgifter og offentlige utgifter. I lavkonjunktur kan staten øke utgiftene eller kutte skatter (**ekspansiv** politikk); i høykonjunktur stramme inn. **Handlingsregelen** sier at bruken av oljepenger over tid skal følge den forventede realavkastningen av **Statens pensjonsfond utland**, anslått til **3 %**.

> Pengepolitikk = Norges Bank og renten. Finanspolitikk = regjering/Storting og statsbudsjettet.`,
`## Gross domestic product
**GDP** is the value of all goods and services produced in a country in a year, minus intermediate inputs (to avoid double counting). It can be calculated in three ways that should give the same answer: the sum of **value added** in all industries, the sum of **incomes** (wages and profits), or the sum of **expenditure**:
$$\\text{GDP} = C + I + G + (X - M),$$
private consumption + investment + government consumption + exports minus imports. In Norway oil and gas are often separated out to give **mainland Norway**, because petroleum output swings a lot and says little about the rest of the economy.
- **Nominal** GDP is measured at current prices; **real** GDP is adjusted for price changes and shows actual growth in output.
- GDP **per capita** is used to compare living standards, but it does not measure distribution, leisure, unpaid work or environmental damage.

## Business cycles
The economy does not grow evenly. Periods of high growth and low unemployment (**booms**) alternate with low growth and rising unemployment (**downturns**). Two consecutive quarters of falling GDP are often called a **recession**. The gap between actual and "normal" output is the **output gap**.

## Inflation
**Inflation** is a sustained rise in the general price level, measured by Statistics Norway's **consumer price index** (CPI). When prices rise, each krone buys less – **purchasing power** falls. Causes:
- **Demand pressure**: high demand in a boom lets firms raise prices.
- **Cost pressure**: dearer energy, materials or wages are passed on to customers.
- **A weaker krone**: imports become more expensive.
- **Expectations**: if everyone expects high inflation, they demand higher wages and raise prices – a self-reinforcing spiral.

**Real wage growth** ≈ nominal wage growth − inflation. **Real interest rate** ≈ nominal rate − inflation.

## Norges Bank and the interest rate
Norges Bank has an **inflation target** of **2 %** over time. Its main tool is the **policy rate** – the rate banks get on deposits at the central bank, which feeds through to all other rates. Effects of a rate rise:
- Loans become dearer, people save more and spend less, and firms invest less.
- The **krone** strengthens, so imports get cheaper.
- Demand and pressure in the economy ease, and inflation eventually falls – but unemployment may rise.

The effect comes with a **lag** of one to two years, so Norges Bank must steer by forecasts.

## Fiscal policy
The government and parliament influence the economy through the **state budget**: taxes, duties and public spending. In a downturn the state can raise spending or cut taxes (**expansionary** policy); in a boom it can tighten. The **fiscal rule** says that spending of oil money should over time follow the expected real return on the **Government Pension Fund Global**, estimated at **3 %**.

> Monetary policy = Norges Bank and the interest rate. Fiscal policy = government/parliament and the state budget.`);

DEEP("OSAM", "Utenrikshandel og valuta",
`## Hvorfor handler land med hverandre?
Ingen land kan produsere alt like godt. **Adam Smith** pekte på **absolutte fortrinn**: land bør produsere det de er mest effektive til. **David Ricardo** viste noe mer overraskende: selv om ett land er best til alt, lønner handel seg hvis hvert land spesialiserer seg der det har **komparativt fortrinn** – der **alternativkostnaden** er lavest. Eksempel: en advokat som skriver raskere enn sekretæren sin, tjener likevel på å overlate skrivingen og bruke tiden på saker. Norges komparative fortrinn ligger blant annet i olje og gass, fisk, vannkraft og kraftkrevende industri (aluminium).

Andre gevinster av handel: **stordriftsfordeler** (større markeder), mer **konkurranse**, flere varer å velge mellom og spredning av **teknologi**. Men handel gir også tapere: bransjer som møter importkonkurranse, kan miste arbeidsplasser.

## Handelshindringer
- **Toll**: en skatt på importvarer. Norge har høy toll på mange landbruksvarer (kjøtt, ost) for å beskytte norsk landbruk.
- **Kvoter**: tak på hvor mye som kan importeres.
- **Subsidier** til egne produsenter, og tekniske krav og standarder.

Argumenter for proteksjonisme er matsikkerhet, distriktspolitikk, beskyttelse av nye næringer og nasjonal sikkerhet. Kostnaden er høyere priser for forbrukerne og et effektivitetstap. **WTO** arbeider for frihandel og løser handelstvister. **EØS-avtalen** gir Norge adgang til EUs indre marked med fri flyt av varer, tjenester, kapital og personer – men ikke for de fleste landbruks- og fiskeprodukter.

## Driftsbalansen
**Driftsbalansen** viser eksport minus import av varer og tjenester, pluss netto renter, utbytter og overføringer fra utlandet. Norge har hatt store **overskudd**, først og fremst på grunn av petroleumseksporten. Overskuddet plasseres i utlandet, blant annet i oljefondet.

## Valutakurser
**Valutakursen** er prisen på en valuta målt i en annen, for eksempel 11,50 kr per euro. Kronen er **flytende**: kursen bestemmes av tilbud og etterspørsel.
- **Kronen styrkes** (apprecierer) når det trengs færre kroner per euro. Import og utenlandsferier blir billigere, men eksportbedriftene får dårligere betalt og taper konkurranseevne.
- **Kronen svekkes** (deprecierer) når det trengs flere kroner per euro. Eksporten tjener, men importvarer blir dyrere og inflasjonen øker.

Hva påvirker kronekursen?
- **Renteforskjeller**: høyere norsk rente enn i utlandet gjør det mer attraktivt å plassere penger i kroner → sterkere krone.
- **Oljeprisen**: høy oljepris gir mer etterspørsel etter kroner.
- **Uro i verdensøkonomien**: investorer søker til store, «trygge» valutaer, og små valutaer som kronen svekkes ofte.
- Forventninger og spekulasjon.

## Regneregler
- Fra euro til kroner: gang med kursen. 200 € à 11,50 = 2300 kr.
- Fra kroner til euro: del på kursen.
- Krysskurs: kroner per dollar delt på kroner per euro gir euro per dollar.

> Sterk krone: billig å handle i utlandet, vanskelig å eksportere. Svak krone: det motsatte.`,
`## Why do countries trade?
No country can produce everything equally well. **Adam Smith** pointed to **absolute advantage**: countries should produce what they are most efficient at. **David Ricardo** showed something more surprising: even if one country is best at everything, trade pays if each specialises where it has a **comparative advantage** – where its **opportunity cost** is lowest. Example: a lawyer who types faster than their secretary still gains by delegating the typing and spending the time on cases. Norway's comparative advantages include oil and gas, fish, hydropower and power-intensive industry (aluminium).

Other gains from trade: **economies of scale** (larger markets), more **competition**, more goods to choose from and the spread of **technology**. But trade also creates losers: industries facing import competition may lose jobs.

## Trade barriers
- **Tariffs**: a tax on imports. Norway has high tariffs on many agricultural products (meat, cheese) to protect Norwegian farming.
- **Quotas**: caps on how much can be imported.
- **Subsidies** to domestic producers, and technical requirements and standards.

Arguments for protectionism include food security, regional policy, protecting infant industries and national security. The cost is higher prices for consumers and an efficiency loss. The **WTO** works for free trade and settles trade disputes. The **EEA Agreement** gives Norway access to the EU's internal market with free movement of goods, services, capital and people – but not for most agricultural and fish products.

## The current account
The **current account** shows exports minus imports of goods and services, plus net interest, dividends and transfers from abroad. Norway has run large **surpluses**, mainly because of petroleum exports. The surplus is invested abroad, including in the oil fund.

## Exchange rates
The **exchange rate** is the price of one currency in another, for example 11.50 NOK per euro. The krone **floats**: its rate is set by supply and demand.
- **The krone strengthens** (appreciates) when fewer kroner are needed per euro. Imports and holidays abroad get cheaper, but exporters are paid less and lose competitiveness.
- **The krone weakens** (depreciates) when more kroner are needed per euro. Exporters gain, but imports get dearer and inflation rises.

What moves the krone?
- **Interest rate differences**: a higher Norwegian rate than abroad makes it more attractive to hold kroner → a stronger krone.
- **The oil price**: a high oil price raises demand for kroner.
- **Global turmoil**: investors flee to large "safe" currencies, and small currencies such as the krone often weaken.
- Expectations and speculation.

## Calculation rules
- From euro to kroner: multiply by the rate. 200 € at 11.50 = 2300 NOK.
- From kroner to euro: divide by the rate.
- Cross rate: kroner per dollar divided by kroner per euro gives euros per dollar.

> Strong krone: cheap to shop abroad, hard to export. Weak krone: the opposite.`);
})();
