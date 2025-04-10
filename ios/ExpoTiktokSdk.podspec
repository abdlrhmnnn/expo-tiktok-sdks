require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoTiktokSdk'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '13.0',
    :tvos => '13.0'
  }
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/abdlrhmnnn/expo-tiktok-sdk.git' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'TikTokBusinessSDK'  # Changed from TikTokAppEventsSDK to TikTokBusinessSDK

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64',
    'OTHER_LDFLAGS' => '-ObjC'  # Added for TikTok SDK requirement
  }

  s.user_target_xcconfig = {
    'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64'
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
  s.exclude_files = "ios/ExpoTiktokSdkAppDelegate.swift"
end
