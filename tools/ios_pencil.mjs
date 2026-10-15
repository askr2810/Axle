// Legger Apple Pencil-broen (native/ios/AxleBridgeViewController.swift) inn i iOS-appen (oppgave 16 og 23).
// Kjøres etter «npx cap add ios» og av «npm run sync». Gjør ingenting hvis ios/ ikke finnes. Kan kjøres flere ganger.
// Koden legges i SceneDelegate.swift (som alltid er med i app-målet), så project.pbxproj trenger ingen endring,
// og CAPBridgeViewController() byttes med AxleBridgeViewController().
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(process.env.AXLE_IOS_DIR || path.join(ROOT, 'ios'), 'App', 'App', 'SceneDelegate.swift');
const src = fs.readFileSync(path.join(ROOT, 'native', 'ios', 'AxleBridgeViewController.swift'), 'utf8').trim();
if (!fs.existsSync(target)) { console.log('ios_pencil: fant ikke ' + path.relative(ROOT, target) + ' (ingen iOS-app her); hoppet over.'); process.exit(0); }

let s = fs.readFileSync(target, 'utf8');
// Fjern en tidligere versjon av broen, så endringer i native/ios kommer med.
s = s.replace(/\n*\/\/ AXLE-PENCIL-START[\s\S]*?\/\/ AXLE-PENCIL-END\n?/, '\n');
const body = src.replace(/^import (UIKit|Capacitor)\n/gm, '');
if (!/rootViewController = (CAPBridgeViewController|AxleBridgeViewController)\(\)/.test(s)) {
  console.error('ios_pencil: fant ikke «rootViewController = CAPBridgeViewController()» i SceneDelegate.swift. Capacitor-malen har endret seg; legg broen inn for hånd.');
  process.exit(1);
}
s = s.replace(/rootViewController = CAPBridgeViewController\(\)/, 'rootViewController = AxleBridgeViewController()');
s = s.trimEnd() + '\n\n' + body.trim() + '\n';
fs.writeFileSync(target, s);
console.log('ios_pencil: Pencil-broen er lagt inn i ' + path.relative(ROOT, target));
