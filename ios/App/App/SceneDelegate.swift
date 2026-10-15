import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = AxleBridgeViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

// AXLE-PENCIL-START (lagt inn av tools/ios_pencil.mjs – endre i native/ios/AxleBridgeViewController.swift, ikke her)
// Dobbelttrykk (Apple Pencil 2 / Pro) og klem (Pro) veksler mellom penn og viskelær i kladdearket.
// Nettleseren får ingen hendelse for dette, så iOS-appen sender «axle-pencil-tap» til web-koden (app.js, scToggleTool).
// Brukerens valg i Innstillinger > Apple Pencil respekteres: bare «Bytt mellom gjeldende verktøy og viskelær» og
// «Bytt mellom gjeldende og forrige verktøy» veksler; «Av» og palettvalgene gjør ingenting her.

class AxleBridgeViewController: CAPBridgeViewController, UIPencilInteractionDelegate {
    private let pencil = UIPencilInteraction()

    override func viewDidLoad() {
        super.viewDidLoad()
        pencil.delegate = self
        view.addInteraction(pencil)
    }

    private func sendPencilTap() {
        let action = UIPencilInteraction.preferredTapAction
        guard action == .switchEraser || action == .switchPrevious else { return }
        bridge?.webView?.evaluateJavaScript("window.dispatchEvent(new Event('axle-pencil-tap'))", completionHandler: nil)
    }

    // iOS 17.5 og nyere: dobbelttrykk og klem kommer hit. Den gamle metoden under gjør ingenting der, så et trykk telles aldri to ganger.
    @available(iOS 17.5, *)
    func pencilInteraction(_ interaction: UIPencilInteraction, didReceiveTap tap: UIPencilInteraction.Tap) {
        sendPencilTap()
    }

    @available(iOS 17.5, *)
    func pencilInteraction(_ interaction: UIPencilInteraction, didReceiveSqueeze squeeze: UIPencilInteraction.Squeeze) {
        // Klem: brukerens valg for klem følger preferredSqueezeAction. Vi veksler bare når det er satt til å bytte verktøy, og bare når klemmet er ferdig.
        guard squeeze.phase == .ended else { return }
        let action = UIPencilInteraction.preferredSqueezeAction
        guard action == .switchEraser || action == .switchPrevious else { return }
        bridge?.webView?.evaluateJavaScript("window.dispatchEvent(new Event('axle-pencil-tap'))", completionHandler: nil)
    }

    // iOS 12.1–17.4.
    func pencilInteractionDidTap(_ interaction: UIPencilInteraction) {
        if #available(iOS 17.5, *) { return }
        sendPencilTap()
    }
}
// AXLE-PENCIL-END
