// Axle som skrivebordsapp: et vindu som viser den samme web-appen som axle.no (release/www).
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("Axle kunne ikke starte");
}
