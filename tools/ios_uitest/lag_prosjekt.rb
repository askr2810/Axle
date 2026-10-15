# Lager et lite Xcode-prosjekt med en UI-test (XCUITest) som styrer den installerte Axle-appen (no.axle.app) i simulatoren:
# trykk, dobbelttrykk, klyping, dra og tekstfelt. Capacitor-prosjektet i ios/ endres ikke.
# Bruk: ruby tools/ios_uitest/lag_prosjekt.rb <mappe>   (trenger: gem install --user-install xcodeproj). Se docs/IPHONE.md.
require 'xcodeproj'; require 'fileutils'
dir = File.expand_path(ARGV[0] || 'local/ios_uitest'); src = __dir__
FileUtils.mkdir_p(["#{dir}/Host", "#{dir}/AxleUITests"])
File.write("#{dir}/Host/HostApp.swift", "import SwiftUI\n@main struct HostApp: App { var body: some Scene { WindowGroup { Text(\"Axle UI-test\") } } }\n")
FileUtils.cp("#{src}/AxleUITests.swift", "#{dir}/AxleUITests/AxleUITests.swift")
p = Xcodeproj::Project.new("#{dir}/AxleUITest.xcodeproj")
host = p.new_target(:application, 'Host', :ios, '16.0'); tests = p.new_target(:ui_test_bundle, 'AxleUITests', :ios, '16.0')
host.add_file_references([p.main_group.new_group('Host', 'Host').new_file('HostApp.swift')])
tests.add_file_references([p.main_group.new_group('AxleUITests', 'AxleUITests').new_file('AxleUITests.swift')])
tests.add_dependency(host)
[host, tests].each { |t| t.build_configurations.each { |c| s = c.build_settings
  s['GENERATE_INFOPLIST_FILE'] = 'YES'; s['SWIFT_VERSION'] = '5.0'; s['CODE_SIGNING_ALLOWED'] = 'NO'; s['TARGETED_DEVICE_FAMILY'] = '1,2'
  s['PRODUCT_BUNDLE_IDENTIFIER'] = t == host ? 'no.axle.uitest.host' : 'no.axle.uitest'
  s['INFOPLIST_KEY_UILaunchScreen_Generation'] = 'YES' if t == host
  s['TEST_TARGET_NAME'] = 'Host' if t == tests } }
p.save
sch = Xcodeproj::XCScheme.new; sch.add_build_target(host); sch.add_test_target(tests); sch.save_as(p.path, 'AxleUITests', true)
puts "laget #{p.path}"
