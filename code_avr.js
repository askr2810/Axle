// ============================================================
//  KODEOPPGAVER i AVR-assembly (ATmega328P / Arduino Uno) til ELFT2500 Innebygde systemer og måleteknikk.
//  Samme format som code_tasks.js, men med lang: "avr". Koden kjøres i simulatoren i avr.js.
//   cases: startverdier (r16, PIND, M256 = SRAM-adresse 0x100 …); koden kjøres én gang per tilfelle
//   check(m, tilfelle) → true eller en forklaring. m: r[], word(24), io("PORTB"), pin("PB5"), flag("Z"),
//     cycles, halt, out (UART), count("brne"), toggles("PB5"), edges("PB5") (klokkesykler for hvert nivåskifte)
//  tools/test_code.js sjekker at løsningsforslaget består og at startkoden ikke gjør det.
// ============================================================
const ASM = String.raw;
const avrLoop = m => Object.keys(AVR_BR).concat(["brbs", "brbc", "rjmp", "jmp", "cpse", "sbrc", "sbrs"]).reduce((n, op) => n + m.count(op), 0);
Object.assign(CODE_TASKS, {
  "ELFT2500:0": [
    { id: "avr-ldi", lang: "avr", t: ["Første assembly: LDI", "First assembly: LDI"],
      p: ["En AVR-mikrokontroller regner i 32 registre, `r0`–`r31`, på 8 bit hver. `ldi` (load immediate) legger en konstant i et register, men bare i `r16`–`r31`.\n\nLegg tallet **42** i `r16` skrevet som heksadesimalt, og **0b11110000** i `r17`. Trykk ▶ Kjør og se registrene under koden.",
          "An AVR microcontroller computes in 32 registers, `r0`–`r31`, 8 bits each. `ldi` (load immediate) puts a constant in a register, but only in `r16`–`r31`.\n\nPut the number **42** in `r16` written in hexadecimal, and **0b11110000** in `r17`. Press ▶ Run and look at the registers below the code."],
      start: ASM`; 42 i heks er 0x2A
    ldi r16, 0
    ldi r17, 0
slutt:
    rjmp slutt      ; evig løkke: programmet stopper her
`, sol: ASM`    ldi r16, 0x2A
    ldi r17, 0b11110000
slutt:
    rjmp slutt
`, check: m => m.r[16] !== 42 ? T(`r16 er ${m.r[16]}, men skal være 42 (0x2A).`, `r16 is ${m.r[16]}, but should be 42 (0x2A).`) : m.r[17] !== 0xF0 ? T(`r17 er ${avrBin(m.r[17])}, men skal være 0b11110000.`, `r17 is ${avrBin(m.r[17])}, but should be 0b11110000.`) : true,
      hint: ["`ldi r16, 0x2A` og `ldi r17, 0b11110000`. Du kan også skrive `$2A`.", "`ldi r16, 0x2A` and `ldi r17, 0b11110000`. You can also write `$2A`."] },
    { id: "avr-andi", lang: "avr", t: ["Maske med ANDI", "Masking with ANDI"],
      p: ["Behold bare de **fire nederste bitene** i `r16` og nullstill de fire øverste. Bruk `andi` med en maske. Koden testes med flere verdier i `r16`, så du kan ikke bare laste inn svaret.",
          "Keep only the **four lowest bits** of `r16` and clear the four highest. Use `andi` with a mask. The code is tested with several values in `r16`, so you cannot just load the answer."],
      cases: [{ r16: 0xB7 }, { r16: 0x5C }, { r16: 0x0F }],
      start: ASM`; r16 har allerede en verdi
    ; skriv koden her

slutt:
    rjmp slutt
`, sol: ASM`    andi r16, 0b00001111
slutt:
    rjmp slutt
`, check: (m, c) => m.r[16] === (c.r16 & 0x0F) || T(`r16 ble ${avrBin(m.r[16])}, men skal være ${avrBin(c.r16 & 0x0F)}.`, `r16 became ${avrBin(m.r[16])}, but should be ${avrBin(c.r16 & 0x0F)}.`),
      hint: ["AND med 1 beholder biten, AND med 0 nullstiller den. Masken blir `0b00001111` (0x0F).", "AND with 1 keeps the bit, AND with 0 clears it. The mask is `0b00001111` (0x0F)."] },
    { id: "avr-ori", lang: "avr", t: ["Sett bits med ORI", "Setting bits with ORI"],
      p: ["Sett **bit 3 og bit 0** i `r16` til 1 uten å endre de andre bitene. Bruk `ori`. Skriv gjerne masken som `(1<<3)|(1<<0)`.",
          "Set **bit 3 and bit 0** of `r16` to 1 without changing the other bits. Use `ori`. You can write the mask as `(1<<3)|(1<<0)`."],
      cases: [{ r16: 0x80 }, { r16: 0x22 }, { r16: 0x09 }],
      start: ASM`    ; skriv koden her

slutt:
    rjmp slutt
`, sol: ASM`    ori r16, (1<<3)|(1<<0)
slutt:
    rjmp slutt
`, check: (m, c) => m.r[16] === (c.r16 | 0x09) || T(`r16 ble ${avrBin(m.r[16])}, men skal være ${avrBin(c.r16 | 0x09)}.`, `r16 became ${avrBin(m.r[16])}, but should be ${avrBin(c.r16 | 0x09)}.`),
      hint: ["OR med 1 setter biten, OR med 0 lar den være. `(1<<3)|(1<<0)` = `0b00001001`.", "OR with 1 sets the bit, OR with 0 leaves it. `(1<<3)|(1<<0)` = `0b00001001`."] },
    { id: "avr-komplement", lang: "avr", t: ["Ener- og toerkomplement", "One's and two's complement"],
      p: ["Lag **toerkomplementet** (minus tallet) av `r16` i `r17`, og **enerkomplementet** (alle bits snudd) i `r16`. Bruk `mov`, `neg` og `com`.",
          "Put the **two's complement** (minus the number) of `r16` in `r17`, and the **one's complement** (all bits flipped) in `r16`. Use `mov`, `neg` and `com`."],
      cases: [{ r16: 5 }, { r16: 0x80 }, { r16: 0 }, { r16: 200 }],
      start: ASM`    ; r16 har en verdi. Ta vare på den i r17 først.

slutt:
    rjmp slutt
`, sol: ASM`    mov r17, r16
    neg r17         ; r17 = -r16 (toerkomplement)
    com r16         ; r16 = ~r16 (enerkomplement)
slutt:
    rjmp slutt
`, check: (m, c) => m.r[17] !== ((-c.r16) & 0xFF) ? T(`r17 ble ${m.r[17]}, men toerkomplementet av ${c.r16} er ${(-c.r16) & 0xFF}.`, `r17 became ${m.r[17]}, but the two's complement of ${c.r16} is ${(-c.r16) & 0xFF}.`)
        : m.r[16] !== (~c.r16 & 0xFF) ? T(`r16 ble ${avrBin(m.r[16])}, men enerkomplementet er ${avrBin(~c.r16 & 0xFF)}.`, `r16 became ${avrBin(m.r[16])}, but the one's complement is ${avrBin(~c.r16 & 0xFF)}.`) : true,
      hint: ["Kopier først: `mov r17, r16`. Så `neg r17` og `com r16`. Toerkomplementet er enerkomplementet + 1.", "Copy first: `mov r17, r16`. Then `neg r17` and `com r16`. The two's complement is the one's complement + 1."] },
    { id: "avr-tellbits", lang: "avr", t: ["Tell enerne", "Count the ones"],
      p: ["Tell hvor mange bits i `r16` som er 1, og legg svaret i `r17`. Skift `r16` mot høyre med `lsr` åtte ganger: biten som faller ut havner i C-flagget. Bruk `adc` med et register som er 0 for å legge til C.",
          "Count how many bits of `r16` are 1 and put the answer in `r17`. Shift `r16` right with `lsr` eight times: the bit that falls out lands in the C flag. Use `adc` with a register that is 0 to add C."],
      cases: [{ r16: 0xB7 }, { r16: 0 }, { r16: 0xFF }, { r16: 0x10 }],
      start: ASM`    clr r17         ; teller
    clr r18         ; alltid 0
    ldi r19, 8      ; 8 bits
neste:
    ; skift ut én bit og legg den til r17

    dec r19
    brne neste
slutt:
    rjmp slutt
`, sol: ASM`    clr r17
    clr r18
    ldi r19, 8
neste:
    lsr r16         ; bit 0 -> C
    adc r17, r18    ; r17 = r17 + 0 + C
    dec r19
    brne neste
slutt:
    rjmp slutt
`, check: (m, c) => { const n = c.r16.toString(2).split("").filter(x => x === "1").length; return m.r[17] === n || T(`r17 ble ${m.r[17]}, men ${avrBin(c.r16)} har ${n} enere.`, `r17 became ${m.r[17]}, but ${avrBin(c.r16)} has ${n} ones.`); },
      hint: ["I løkka: `lsr r16` og så `adc r17, r18`. Siden r18 er 0, legger `adc` bare til C-flagget.", "In the loop: `lsr r16` then `adc r17, r18`. Since r18 is 0, `adc` only adds the C flag."] },
  ],
  "ELFT2500:1": [
    { id: "avr-led13", lang: "avr", t: ["Tenn LED-en på pinne 13", "Light the LED on pin 13"],
      p: ["LED-en på Arduino Uno sitter på pinne 13, som er **PB5** (bit 5 i port B). En pinne må først gjøres til **utgang** i `DDRB`, så settes den høy i `PORTB`.\n\nTenn LED-en med `sbi` (set bit in I/O register).",
          "The LED on an Arduino Uno is on pin 13, which is **PB5** (bit 5 of port B). A pin must first be made an **output** in `DDRB`, then driven high in `PORTB`.\n\nLight the LED with `sbi` (set bit in I/O register)."],
      start: ASM`.include "m328pdef.inc"
    ; 1) gjør PB5 til utgang  2) sett PB5 høy

slutt:
    rjmp slutt
`, sol: ASM`.include "m328pdef.inc"
    sbi DDRB, PB5
    sbi PORTB, PB5
slutt:
    rjmp slutt
`, check: m => !(m.io("DDRB") >> 5 & 1) ? T("PB5 er ikke satt som utgang. Sett bit 5 i DDRB.", "PB5 is not an output. Set bit 5 of DDRB.") : !(m.io("PORTB") >> 5 & 1) ? T("PB5 er utgang, men lav. Sett bit 5 i PORTB.", "PB5 is an output but low. Set bit 5 of PORTB.") : true,
      hint: ["`sbi DDRB, PB5` og så `sbi PORTB, PB5`.", "`sbi DDRB, PB5` and then `sbi PORTB, PB5`."] },
    { id: "avr-fireled", lang: "avr", t: ["Fire LED-er med OUT", "Four LEDs with OUT"],
      p: ["Gjør **PB0–PB3** til utganger og tenn **PB0 og PB2**, mens PB1 og PB3 er av. Bruk `ldi` og `out` til hele registre på én gang.",
          "Make **PB0–PB3** outputs and light **PB0 and PB2**, while PB1 and PB3 are off. Use `ldi` and `out` for whole registers at once."],
      start: ASM`.include "m328pdef.inc"
    ldi r16, 0b00000000
    out DDRB, r16

slutt:
    rjmp slutt
`, sol: ASM`.include "m328pdef.inc"
    ldi r16, 0b00001111     ; PB0–PB3 utganger
    out DDRB, r16
    ldi r16, 0b00000101     ; PB0 og PB2 høye
    out PORTB, r16
slutt:
    rjmp slutt
`, check: m => (m.io("DDRB") & 0x0F) !== 0x0F ? T(`DDRB er ${avrBin(m.io("DDRB"))}: de fire nederste bitene må være 1.`, `DDRB is ${avrBin(m.io("DDRB"))}: the four lowest bits must be 1.`) : (m.io("PORTB") & 0x0F) !== 0x05 ? T(`PORTB er ${avrBin(m.io("PORTB"))}, men PB3–PB0 skal være 0101.`, `PORTB is ${avrBin(m.io("PORTB"))}, but PB3–PB0 should be 0101.`) : true,
      hint: ["`ldi r16, 0b00001111` → `out DDRB, r16`, så `ldi r16, 0b00000101` → `out PORTB, r16`.", "`ldi r16, 0b00001111` → `out DDRB, r16`, then `ldi r16, 0b00000101` → `out PORTB, r16`."] },
    { id: "avr-sum", lang: "avr", t: ["Løkke: 1 + 2 + … + 10", "Loop: 1 + 2 + … + 10"],
      p: ["Regn ut summen 1 + 2 + … + 10 i `r16` med en **løkke**. Tell ned med `dec` og hopp tilbake med `brne` (branch if not equal: hopper så lenge resultatet ikke ble 0).",
          "Compute the sum 1 + 2 + … + 10 in `r16` with a **loop**. Count down with `dec` and jump back with `brne` (branch if not equal: jumps as long as the result was not 0)."],
      start: ASM`    ldi r16, 0      ; summen
    ldi r17, 10     ; teller
loop:
    ; legg r17 til r16, tell ned og hopp tilbake

slutt:
    rjmp slutt
`, sol: ASM`    ldi r16, 0
    ldi r17, 10
loop:
    add r16, r17
    dec r17
    brne loop
slutt:
    rjmp slutt
`, check: m => m.r[16] !== 55 ? T(`r16 er ${m.r[16]}, men summen er 55.`, `r16 is ${m.r[16]}, but the sum is 55.`) : avrLoop(m) < 5 ? T("Svaret er riktig, men lag det med en løkke.", "The answer is right, but use a loop.") : true,
      hint: ["`add r16, r17`, `dec r17`, `brne loop`.", "`add r16, r17`, `dec r17`, `brne loop`."] },
    { id: "avr-mul", lang: "avr", t: ["Gange med MUL", "Multiplying with MUL"],
      p: ["Regn ut **13 · 11** med `mul`. Svaret er 16 bit og havner alltid i registerparet `r1:r0` (r1 er den høye byten).",
          "Compute **13 · 11** with `mul`. The result is 16 bits and always lands in the register pair `r1:r0` (r1 is the high byte)."],
      start: ASM`    ldi r16, 13
    ldi r17, 11

slutt:
    rjmp slutt
`, sol: ASM`    ldi r16, 13
    ldi r17, 11
    mul r16, r17    ; r1:r0 = 143
slutt:
    rjmp slutt
`, check: m => (m.word(0) === 143 && m.count("mul") > 0) || T(`r1:r0 er ${m.word(0)}, men skal være 143 regnet ut med MUL.`, `r1:r0 is ${m.word(0)}, but should be 143 computed with MUL.`),
      hint: ["Bare én linje: `mul r16, r17`.", "Just one line: `mul r16, r17`."] },
    { id: "avr-add16", lang: "avr", t: ["16-bit addisjon med mente", "16-bit addition with carry"],
      p: ["Et 16-bit tall ligger i to registre: `r25:r24` (høy:lav). Legg `r23:r22` til `r25:r24`. Legg sammen de lave bytene med `add`, og de høye med `adc` så menten (C) blir med.",
          "A 16-bit number lives in two registers: `r25:r24` (high:low). Add `r23:r22` to `r25:r24`. Add the low bytes with `add` and the high bytes with `adc`, so the carry (C) is included."],
      cases: [{ r24: 0xE8, r25: 0x03, r22: 0xD0, r23: 0x07 }, { r24: 0xFF, r25: 0x00, r22: 0x01, r23: 0x00 }, { r24: 0x34, r25: 0x12, r22: 0x11, r23: 0x11 }],
      start: ASM`    add r24, r22
    ; og de høye bytene?

slutt:
    rjmp slutt
`, sol: ASM`    add r24, r22    ; lav byte
    adc r25, r23    ; høy byte + mente
slutt:
    rjmp slutt
`, check: (m, c) => { const want = ((c.r25 << 8 | c.r24) + (c.r23 << 8 | c.r22)) & 0xFFFF; return m.word(24) === want || T(`r25:r24 ble ${m.word(24)}, men ${c.r25 << 8 | c.r24} + ${c.r23 << 8 | c.r22} = ${want}.`, `r25:r24 became ${m.word(24)}, but ${c.r25 << 8 | c.r24} + ${c.r23 << 8 | c.r22} = ${want}.`); },
      hint: ["`adc r25, r23` legger til menten fra den lave byten.", "`adc r25, r23` adds the carry from the low byte."] },
    { id: "avr-maks", lang: "avr", t: ["Den største av to", "The larger of two"],
      p: ["Legg den største av `r16` og `r18` i `r17` (tallene er uten fortegn, 0–255). Sammenlign med `cp` og hopp med `brsh` (same or higher) eller `brlo` (lower).",
          "Put the larger of `r16` and `r18` in `r17` (unsigned numbers, 0–255). Compare with `cp` and jump with `brsh` (same or higher) or `brlo` (lower)."],
      cases: [{ r16: 73, r18: 91 }, { r16: 200, r18: 15 }, { r16: 42, r18: 42 }, { r16: 129, r18: 128 }],
      start: ASM`    mov r17, r16    ; anta at r16 er størst

slutt:
    rjmp slutt
`, sol: ASM`    mov r17, r16
    cp r16, r18
    brsh ferdig     ; r16 >= r18: behold
    mov r17, r18
ferdig:
slutt:
    rjmp slutt
`, check: (m, c) => m.r[17] === Math.max(c.r16, c.r18) || T(`r17 ble ${m.r[17]}, men den største er ${Math.max(c.r16, c.r18)}.`, `r17 became ${m.r[17]}, but the larger is ${Math.max(c.r16, c.r18)}.`),
      hint: ["`cp r16, r18` regner r16 − r18 uten å lagre. `brsh` hopper hvis r16 ≥ r18; ellers `mov r17, r18`.", "`cp r16, r18` computes r16 − r18 without storing it. `brsh` jumps if r16 ≥ r18; otherwise `mov r17, r18`."] },
    { id: "avr-knapp", lang: "avr", t: ["Knapp styrer LED", "A button controls the LED"],
      p: ["En knapp på pinne 2, **PD2**, trekker pinnen **lav** når den er trykket (intern pull-up). Tenn LED-en på PB5 når knappen er trykket, ellers skal den være av. Bruk `sbic` (skip if bit in I/O is cleared) eller `sbis` på `PIND`.",
          "A button on pin 2, **PD2**, pulls the pin **low** when pressed (internal pull-up). Light the LED on PB5 when the button is pressed, otherwise keep it off. Use `sbic` (skip if bit in I/O is cleared) or `sbis` on `PIND`."],
      cases: [{ PIND: 0b11111011 }, { PIND: 0b11111111 }],
      start: ASM`.include "m328pdef.inc"
    sbi DDRB, PB5       ; LED-en er utgang

slutt:
    rjmp slutt
`, sol: ASM`.include "m328pdef.inc"
    sbi DDRB, PB5
    sbis PIND, PD2      ; hopp over neste hvis PD2 = 1 (ikke trykket)
    sbi PORTB, PB5      ; trykket: LED på
slutt:
    rjmp slutt
`, check: (m, c) => { const pressed = !(c.PIND >> 2 & 1); return m.pin("PB5") === (pressed ? 1 : 0) || (pressed ? T("Knappen er trykket (PD2 = 0), men LED-en er av.", "The button is pressed (PD2 = 0), but the LED is off.") : T("Knappen er sluppet (PD2 = 1), men LED-en er på.", "The button is released (PD2 = 1), but the LED is on.")); },
      hint: ["`sbis PIND, PD2` hopper over neste instruksjon når PD2 er 1. Neste instruksjon kan være `sbi PORTB, PB5`.", "`sbis PIND, PD2` skips the next instruction when PD2 is 1. The next instruction can be `sbi PORTB, PB5`."] },
    { id: "avr-sub", lang: "avr", t: ["Subrutine med RCALL og RET", "Subroutine with RCALL and RET"],
      p: ["Skriv en subrutine `dobbel` som dobler `r16` med `lsl`. Kall den **to ganger** med `rcall`, så `r16` blir fire ganger så stor. `ret` hopper tilbake dit den ble kalt fra (adressen ligger på stakken).",
          "Write a subroutine `dobbel` that doubles `r16` with `lsl`. Call it **twice** with `rcall`, so `r16` becomes four times as large. `ret` jumps back to where it was called from (the address is on the stack)."],
      cases: [{ r16: 3 }, { r16: 50 }],
      start: ASM`    ; kall subrutinen to ganger her

slutt:
    rjmp slutt

dobbel:
    ; doble r16 og returner
`, sol: ASM`    rcall dobbel
    rcall dobbel
slutt:
    rjmp slutt

dobbel:
    lsl r16
    ret
`, check: (m, c) => m.r[16] !== (c.r16 * 4 & 0xFF) ? T(`r16 ble ${m.r[16]}, men 4 · ${c.r16} = ${c.r16 * 4 & 0xFF}.`, `r16 became ${m.r[16]}, but 4 · ${c.r16} = ${c.r16 * 4 & 0xFF}.`) : m.count("rcall") + m.count("call") < 2 || m.count("ret") < 2 ? T("Riktig tall, men bruk subrutinen: to RCALL og RET.", "Right number, but use the subroutine: two RCALLs and RET.") : true,
      hint: ["Hovedprogram: `rcall dobbel` to ganger. Subrutinen: `lsl r16` og `ret`.", "Main program: `rcall dobbel` twice. Subroutine: `lsl r16` and `ret`."] },
    { id: "avr-delay", lang: "avr", t: ["Forsinkelse på 1 ms", "A 1 ms delay"],
      p: ["Ved 16 MHz tar 1 ms **16 000 klokkesykler**. Lag en nestet løkke som bruker 16 000 sykler ± 1 % fra start til `slutt`.\n\nI den indre løkka tar `dec` 1 sykel og `brne` 2 når den hopper (1 den siste gangen), så én runde er 3 sykler. Finn verdier for `r18` og `r19`. Simulatoren viser antall sykler.",
          "At 16 MHz, 1 ms is **16,000 clock cycles**. Make a nested loop that uses 16,000 cycles ± 1 % from start to `slutt`.\n\nIn the inner loop `dec` takes 1 cycle and `brne` 2 when it jumps (1 the last time), so one round is 3 cycles. Find values for `r18` and `r19`. The simulator shows the cycle count."],
      start: ASM`    ldi r18, 1      ; ytre teller
ytre:
    ldi r19, 1      ; indre teller
indre:
    dec r19
    brne indre
    dec r18
    brne ytre
slutt:
    rjmp slutt
`, sol: ASM`    ldi r18, 21     ; 21 · 768 ≈ 16 128 sykler
ytre:
    ldi r19, 255    ; 255 · 3 = 765 sykler
indre:
    dec r19
    brne indre
    dec r18
    brne ytre
slutt:
    rjmp slutt
`, check: m => (m.cycles >= 15840 && m.cycles <= 16160) || T(`Løkka brukte ${m.cycles} sykler (${avrTime(m.cycles)}). Målet er 15 840–16 160.`, `The loop used ${m.cycles} cycles (${avrTime(m.cycles)}). The target is 15,840–16,160.`),
      hint: ["Én ytre runde ≈ 3 · r19 + 3 sykler. Med r19 = 255 blir det 768, og 16 000 / 768 ≈ 21.", "One outer round ≈ 3 · r19 + 3 cycles. With r19 = 255 that is 768, and 16,000 / 768 ≈ 21."] },
    { id: "avr-blink", lang: "avr", t: ["Blink fem ganger", "Blink five times"],
      p: ["Blink LED-en på PB5 **fem ganger**, altså på og av fem ganger, som er 10 nivåskift, og stopp så i en evig løkke. Mellom hvert skift skal det gå minst 500 klokkesykler, så du kan se det i logikkanalysatoren. Tips: skriv `1` til en bit i `PINB` for å veksle pinnen.",
          "Blink the LED on PB5 **five times**, that is on and off five times, which is 10 level changes, and then stop in an endless loop. At least 500 clock cycles must pass between changes, so you can see it in the logic analyser. Tip: writing `1` to a bit of `PINB` toggles the pin."],
      start: ASM`.include "m328pdef.inc"
    sbi DDRB, PB5
    ldi r16, 10         ; 10 nivåskift
blink:
    ; veksle PB5, vent, tell ned

slutt:
    rjmp slutt

vent:
    ldi r17, 255
v1: dec r17
    brne v1
    ret
`, sol: ASM`.include "m328pdef.inc"
    sbi DDRB, PB5
    ldi r16, 10
blink:
    sbi PINB, PB5       ; veksle LED-en
    rcall vent
    dec r16
    brne blink
slutt:
    rjmp slutt

vent:
    ldi r17, 255
v1: dec r17
    brne v1
    ret
`, check: m => { const e = m.edges("PB5"); if(e.length !== 10) return T(`PB5 skiftet nivå ${e.length} ganger, men skal skifte 10 ganger (5 blink).`, `PB5 changed level ${e.length} times, but should change 10 times (5 blinks).`);
        if(m.halt !== "loop") return T("Stopp i en evig løkke etter blinkingen.", "Stop in an endless loop after the blinking.");
        for(let i = 1; i < e.length; i++) if(e[i] - e[i - 1] < 500) return T(`Bare ${e[i] - e[i - 1]} sykler mellom to skift. Kall vent-rutinen mellom hvert.`, `Only ${e[i] - e[i - 1]} cycles between two changes. Call the delay routine between each.`);
        return true; },
      hint: ["I løkka: `sbi PINB, PB5`, `rcall vent`, `dec r16`, `brne blink`.", "In the loop: `sbi PINB, PB5`, `rcall vent`, `dec r16`, `brne blink`."] },
    { id: "avr-uart", lang: "avr", t: ["Send «Hei» på UART", "Send \"Hei\" on the UART"],
      p: ["Seriellporten (UART) sender ett tegn når du skriver det til `UDR0`. `UDR0` ligger i utvidet I/O, så bruk `sts` i stedet for `out`. Send teksten **Hei**.",
          "The serial port (UART) sends a character when you write it to `UDR0`. `UDR0` is in extended I/O, so use `sts` instead of `out`. Send the text **Hei**."],
      start: ASM`.include "m328pdef.inc"
    ldi r16, 'H'

slutt:
    rjmp slutt
`, sol: ASM`.include "m328pdef.inc"
    ldi r16, 'H'
    sts UDR0, r16
    ldi r16, 'e'
    sts UDR0, r16
    ldi r16, 'i'
    sts UDR0, r16
slutt:
    rjmp slutt
`, out: "Hei", check: () => true,
      hint: ["For hvert tegn: `ldi r16, 'H'` og `sts UDR0, r16`.", "For each character: `ldi r16, 'H'` and `sts UDR0, r16`."] },
    { id: "avr-lpm", lang: "avr", t: ["Tekst fra programminnet", "Text from program memory"],
      p: ["Teksten ligger i programminnet med `.db`, avsluttet med 0. Les den tegn for tegn med `lpm r16, Z+` og send hvert tegn til `UDR0` til du møter 0. Programminnet er adressert i ord, så Z må peke på `tekst*2`.",
          "The text is stored in program memory with `.db`, ending with 0. Read it character by character with `lpm r16, Z+` and send each to `UDR0` until you reach 0. Program memory is word-addressed, so Z must point at `tekst*2`."],
      start: ASM`.include "m328pdef.inc"
    ldi ZL, low(tekst*2)
    ldi ZH, high(tekst*2)
neste:
    ; les et tegn, stopp på 0, send det og gjenta

slutt:
    rjmp slutt

tekst: .db "OsloMet", 0
`, sol: ASM`.include "m328pdef.inc"
    ldi ZL, low(tekst*2)
    ldi ZH, high(tekst*2)
neste:
    lpm r16, Z+
    tst r16
    breq slutt
    sts UDR0, r16
    rjmp neste
slutt:
    rjmp slutt

tekst: .db "OsloMet", 0
`, out: "OsloMet", check: m => m.count("lpm") >= 7 || T("Les tegnene fra programminnet med LPM.", "Read the characters from program memory with LPM."),
      hint: ["`lpm r16, Z+`, `tst r16`, `breq slutt`, `sts UDR0, r16`, `rjmp neste`.", "`lpm r16, Z+`, `tst r16`, `breq slutt`, `sts UDR0, r16`, `rjmp neste`."] },
    { id: "avr-sram", lang: "avr", t: ["Summer en tabell i SRAM", "Sum a table in SRAM"],
      p: ["Fem bytes ligger i SRAM fra adresse **0x0100**. Summer dem i `r16` (bare de nederste 8 bitene). Pek på tabellen med X (`r27:r26`) og les med `ld r17, X+`, som øker pekeren for hver lesing.",
          "Five bytes are stored in SRAM from address **0x0100**. Sum them in `r16` (only the lowest 8 bits). Point at the table with X (`r27:r26`) and read with `ld r17, X+`, which increments the pointer on each read."],
      cases: [{ M256: 10, M257: 20, M258: 30, M259: 40, M260: 50 }, { M256: 200, M257: 1, M258: 2, M259: 3, M260: 4 }],
      start: ASM`    ldi XL, low(0x0100)
    ldi XH, high(0x0100)
    clr r16
    ldi r18, 5
loop:
    ; les en byte og legg den til

    dec r18
    brne loop
slutt:
    rjmp slutt
`, sol: ASM`    ldi XL, low(0x0100)
    ldi XH, high(0x0100)
    clr r16
    ldi r18, 5
loop:
    ld r17, X+
    add r16, r17
    dec r18
    brne loop
slutt:
    rjmp slutt
`, check: (m, c) => { const s = (c.M256 + c.M257 + c.M258 + c.M259 + c.M260) & 0xFF; return m.r[16] === s || T(`r16 ble ${m.r[16]}, men summen (8 bit) er ${s}.`, `r16 became ${m.r[16]}, but the sum (8 bits) is ${s}.`); },
      hint: ["`ld r17, X+` og `add r16, r17` inne i løkka.", "`ld r17, X+` and `add r16, r17` inside the loop."] },
    { id: "avr-stakk", lang: "avr", t: ["Bytt med stakken", "Swap with the stack"],
      p: ["Bytt innholdet i `r16` og `r17` **uten** `mov`. Bruk stakken: `push` legger en byte på toppen, `pop` tar den øverste av (sist inn, først ut).",
          "Swap the contents of `r16` and `r17` **without** `mov`. Use the stack: `push` puts a byte on top, `pop` takes the top one off (last in, first out)."],
      cases: [{ r16: 1, r17: 2 }, { r16: 200, r17: 7 }],
      start: ASM`    ; bytt r16 og r17 med push og pop

slutt:
    rjmp slutt
`, sol: ASM`    push r16
    push r17
    pop r16         ; r16 får det som ble lagt på sist (r17)
    pop r17
slutt:
    rjmp slutt
`, check: (m, c) => m.count("mov") || m.count("movw") ? T("Prøv uten MOV: bare PUSH og POP.", "Try without MOV: only PUSH and POP.") : (m.r[16] === c.r17 && m.r[17] === c.r16) || T(`r16 = ${m.r[16]} og r17 = ${m.r[17]}, men skal være ${c.r17} og ${c.r16}.`, `r16 = ${m.r[16]} and r17 = ${m.r[17]}, but should be ${c.r17} and ${c.r16}.`),
      hint: ["`push r16`, `push r17`, så `pop r16` og `pop r17`.", "`push r16`, `push r17`, then `pop r16` and `pop r17`."] },
  ],
});
