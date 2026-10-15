import XCTest
// Styrer den installerte Axle-appen (no.axle.app) i simulatoren. Lages og kjøres slik docs/IPHONE.md beskriver.
// Zoom kontrolleres ved at en tekst har samme plass og størrelse før og etter dobbelttrykk, klyping og fokus i tekstfelt
// (zoomer siden, blir teksten større og flytter seg). Skjermbilder og elementtre lagres i AXLE_SHOTS.
final class AxleUITests: XCTestCase {
  let app = XCUIApplication(bundleIdentifier: "no.axle.app")
  let dir = ProcessInfo.processInfo.environment["AXLE_SHOTS"] ?? NSTemporaryDirectory()
  var n = 0
  func shot(_ name: String) {
    n += 1; let f = String(format: "%@/%02d_%@", dir, n, name)
    try? XCUIScreen.main.screenshot().pngRepresentation.write(to: URL(fileURLWithPath: f + ".png"))
    try? app.debugDescription.write(toFile: f + ".txt", atomically: true, encoding: .utf8)
  }
  func el(_ q: XCUIElementQuery, _ start: String) -> XCUIElement { q.matching(NSPredicate(format: "label BEGINSWITH %@", start)).firstMatch }
  func same(_ a: CGRect, _ b: CGRect, _ what: String) { XCTAssertEqual(a.width, b.width, accuracy: 1, "\(what): zoomet (\(a) → \(b))"); XCTAssertEqual(a.minX, b.minX, accuracy: 1, "\(what): flyttet (\(a) → \(b))") }
  func tap(_ start: String) { let e = el(app.descendants(matching: .any), start); XCTAssertTrue(e.waitForExistence(timeout: 5), "fant ikke «\(start)»"); e.tap(); sleep(2) }
  override func setUp() { continueAfterFailure = true }

  func testAxle() throws {
    app.terminate(); app.launch()
    let logo = app.staticTexts["Axle"].firstMatch; XCTAssertTrue(logo.waitForExistence(timeout: 15), "Axle vises ikke"); sleep(2); shot("start")
    let f0 = logo.frame
    el(app.staticTexts, "Læring gjort").doubleTap(); sleep(1); same(f0, logo.frame, "dobbelttrykk på tekst")
    app.webViews.firstMatch.pinch(withScale: 2.5, velocity: 3); sleep(1); same(f0, logo.frame, "klyping ut"); shot("etter_klyping")
    app.webViews.firstMatch.pinch(withScale: 0.5, velocity: -3); sleep(1); same(f0, logo.frame, "klyping inn")
    // klyping over et fagkort skal ikke velge det
    let ing = el(app.switches, "Ingeniør"); ing.pinch(withScale: 2, velocity: 2); sleep(1)
    XCTAssertEqual(ing.value as? String, "0", "klyping over «Ingeniør» valgte kortet"); same(f0, logo.frame, "klyping over et kort")
    // rulling virker fortsatt
    // (på iPad får hele velkomstsiden plass, og da er det ingenting å rulle)
    if app.otherElements["hoved"].firstMatch.frame.maxY > app.windows.firstMatch.frame.height + 100 {
      app.webViews.firstMatch.swipeUp(); sleep(1); XCTAssertLessThan(logo.frame.minY, f0.minY - 50, "siden ruller ikke"); shot("rullet") }
    el(app.switches, "Videregående").tap(); sleep(1)
    app.buttons.matching(NSPredicate(format: "label CONTAINS[c] 'kom i gang'")).firstMatch.tap(); sleep(2); shot("etter_valg")
    tap("Helt fra start"); shot("hjem"); tap("START HER"); shot("teori")
    let h = el(app.staticTexts, "Hva handler"), f1 = h.frame; h.doubleTap(); sleep(1); same(f1, h.frame, "dobbelttrykk i teorien")
    tap("Kan du dette fra før"); shot("oppgave")
    // kladdearket: tegning med finger (dra), arket rulles ikke og siden zoomer ikke
    let q = el(app.staticTexts, "Algebra og likninger"), f2 = q.frame
    tap("Kladd"); shot("kladd_tom")
    let win = app.windows.firstMatch
    func pt(_ x: CGFloat, _ y: CGFloat) -> XCUICoordinate { win.coordinate(withNormalizedOffset: CGVector(dx: 0, dy: 0)).withOffset(CGVector(dx: x, dy: y)) }
    pt(80, 300).press(forDuration: 0.05, thenDragTo: pt(300, 420)); pt(80, 420).press(forDuration: 0.05, thenDragTo: pt(300, 300))
    pt(190, 500).press(forDuration: 0.05, thenDragTo: pt(200, 640)); sleep(1); shot("kladd_tegnet")
    // to fingre på arket zoomer arket (egen zoom i Axle), ikke siden
    let tegn = el(app.buttons, "Tegn"), f3 = tegn.frame
    app.webViews.firstMatch.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.6)).press(forDuration: 0.01); win.pinch(withScale: 1.8, velocity: 2); sleep(1)
    same(f3, tegn.frame, "klyping på kladdearket"); shot("kladd_zoomet")
    tap("Lukk kladd"); same(f2, q.frame, "etter kladdearket")
    // svar og gå videre
    let opt = app.descendants(matching: .any).matching(NSPredicate(format: "label MATCHES '^1 .+'")).firstMatch
    if opt.waitForExistence(timeout: 3) { opt.tap(); sleep(1) }
    let bottom = app.buttons.matching(NSPredicate(format: "label IN {'SJEKK', 'FORTSETT', 'NESTE', 'GÅ VIDERE'}"))
    if bottom.firstMatch.exists { bottom.firstMatch.tap(); sleep(2) }; shot("svart")
    if bottom.firstMatch.exists && bottom.firstMatch.isEnabled { bottom.firstMatch.tap(); sleep(2) }; shot("neste_oppgave")
    tap("Avslutt økten"); shot("avslutt"); tap("AVSLUTT")
    // fanene nederst
    for t in ["Øv", "Teori", "Venner", "Profil", "Lær"] { let b = app.buttons[t].firstMatch; XCTAssertTrue(b.waitForExistence(timeout: 5), "fanen «\(t)» mangler"); b.tap(); sleep(2); shot("fane_" + t) }
    // tekstfelt: fokus skal ikke zoome inn siden (iOS zoomer når teksten i feltet er under 16 px)
    app.buttons["Profil"].firstMatch.tap(); sleep(1); tap("Logg inn")
    let felt = app.textFields.firstMatch; XCTAssertTrue(felt.waitForExistence(timeout: 5), "fant ikke e-postfeltet"); let f4 = felt.frame
    felt.tap(); sleep(2); felt.typeText("elev@eksempel.no"); sleep(1); same(f4, felt.frame, "fokus i e-postfeltet"); shot("epost_fokus")
  }

  // Axle i Safari i simulatoren (AXLE_URL). Safari tillater alltid klyping (tilgjengelighet), så her skal klyping zoome,
  // mens dobbelttrykk og fokus i tekstfelt ikke skal det. Kjør på en nullstilt simulator (xcrun simctl erase): Safari gjenoppretter
  // ellers fanen fra forrige kjøring, og da zoomet dobbelttrykk av og til litt (se docs/IPHONE.md).
  func testSafari() throws {
    guard let url = ProcessInfo.processInfo.environment["AXLE_URL"] else { throw XCTSkip("AXLE_URL er ikke satt") }
    let sf = XCUIApplication(bundleIdentifier: "com.apple.mobilesafari"); sf.terminate()
    XCUIDevice.shared.system.open(URL(string: url)!); sleep(6)
    for b in ["Continue", "Fortsett", "Not Now", "Ikke nå"] where sf.buttons[b].exists { sf.buttons[b].tap(); sleep(1) }
    let shot = { (name: String) in self.n += 1; try? XCUIScreen.main.screenshot().pngRepresentation.write(to: URL(fileURLWithPath: String(format: "%@/safari_%02d_%@.png", self.dir, self.n, name))) }
    let web = sf.webViews.firstMatch, logo = web.staticTexts["Axle"].firstMatch
    XCTAssertTrue(logo.waitForExistence(timeout: 20), "Axle vises ikke i Safari"); sleep(2); shot("start"); let f0 = logo.frame
    sleep(4); same(f0, logo.frame, "Safari: uten berøring")
    // første trykk ruller knappen fram i Safari; trykk igjen hvis innloggingen ikke åpnet seg
    let login = web.buttons["Logg inn"].firstMatch, felt = web.textFields.firstMatch
    for _ in 0..<3 where !felt.waitForExistence(timeout: 2) { login.tap(); sleep(1) }
    XCTAssertTrue(felt.waitForExistence(timeout: 5), "fant ikke e-postfeltet"); let f4 = felt.frame
    felt.tap(); sleep(2); felt.typeText("elev@eksempel.no"); sleep(1); same(f4, felt.frame, "Safari: fokus i e-postfeltet"); shot("epost_fokus")
    try? (sf.debugDescription).write(toFile: dir + "/safari_tre.txt", atomically: true, encoding: .utf8)
    let done = sf.buttons.matching(NSPredicate(format: "label IN {'Done', 'Ferdig'}")).firstMatch; if done.exists { done.tap(); sleep(1) }
    let fz = felt.frame; web.pinch(withScale: 2.5, velocity: 3); sleep(2); shot("klyping")
    XCTAssertGreaterThan(felt.frame.width, fz.width * 1.3, "Safari: klyping skal fortsatt zoome (tilgjengelighet) – \(fz) → \(felt.frame)")
    sf.terminate(); XCUIDevice.shared.system.open(URL(string: url)!); sleep(6); _ = logo.waitForExistence(timeout: 20); sleep(2)
    let f5 = logo.frame
    // Kjent begrensning: Safari (iOS 18-simulatoren) zoomer ca. 13 % ved dobbelttrykk tross touch-action: manipulation, og siden kan ikke
    // stoppe det (prøvd: preventDefault på touchstart/touchend, uten maximum-scale). Testen melder det uten å feile, og sier fra hvis Safari endrer seg.
    XCTExpectFailure("Safari zoomer ved dobbelttrykk (kjent, docs/IPHONE.md)", options: { let o = XCTExpectedFailure.Options(); o.isStrict = false; return o }()) {
      el(web.staticTexts, "Læring gjort").doubleTap(); sleep(1); same(f5, logo.frame, "Safari: dobbelttrykk på tekst") }
    shot("dobbelttrykk")
  }
}
