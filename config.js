// ============================================================
//  KONFIGURASJON – det eneste du normalt trenger å endre
// ============================================================
const CONFIG = {
  appVersion: "1.0.0",
  // Nøkkel fra https://web3forms.com (gratis). Lim inn nøkkelen du får på e-post.
  // Da sendes alle feilrapporter og tilbakemeldinger til e-posten din.
  web3formsKey: "",
  // Offentlig adresse til personvernerklæringen (kreves av App Store og Google Play).
  privacyUrl: "https://axle.no/privacy.html",
  siteUrl: "https://axle.no",
  // Kontaktadresse (vises i appen). Brukes også som reserve: uten Web3Forms-nøkkel åpnes e-postappen med rapporten ferdig utfylt.
  contactEmail: "engidrilli@gmail.com",
  // Kontoer og synkronisering (Supabase). Den offentlige «publishable»-nøkkelen skal ligge her.
  // Den hemmelige «secret»-nøkkelen skal ALDRI inn i appen. Tomme verdier = ingen kontoer.
  supabaseUrl: "https://yhzgdipjpdmovegbkybx.supabase.co",
  supabaseKey: "sb_publishable_p-YFBer52Oq_e8KMGBzzkQ_VVhkLIqT",
  // Offentlig VAPID-nøkkel for påminnelser i nettleseren (web push). Den private nøkkelen ligger bare i Supabase (Edge Function-secret).
  vapidPublicKey: "BNyz9NRf8XCFb7UuP384TEXYjqDZ6An2io4EYv4JJtQePWcPeFQeXD8UK94kdPEdLXZ1SIxFlFutUmbjQP0iTy0",
  appName: { nb: "Axle", en: "Axle" },
  storeName: { nb: "Axle – ingeniørtrening", en: "Axle: Engineering Practice" }
};
