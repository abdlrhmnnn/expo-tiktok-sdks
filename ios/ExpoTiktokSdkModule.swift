import ExpoModulesCore
import TikTokBusinessSDK

public class ExpoTiktokSdkModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoTiktokSdk")
        
        AsyncFunction("initialize") { (config: [String: Any], promise: Promise) in
            DispatchQueue.main.async {
                guard let iosConfig = config["ios"] as? [String: Any],
                      let appId = iosConfig["appId"] as? String,
                      let tiktokAppId = iosConfig["tiktokAppId"] as? String else {
                    promise.reject("INVALID_CONFIG", "iOS configuration missing required fields (appId and tiktokAppId)")
                    return
                }
                
                let accessToken = iosConfig["accessToken"] as? String ?? ""
                guard let ttConfig = TikTokConfig(
                    accessToken: accessToken,
                    appId: appId,
                    tiktokAppId: tiktokAppId
                ) else {
                    promise.reject("INIT_FAILED", "Failed to create TikTok configuration")
                    return
                }
                
                // Configure debug mode if specified
                if let debug = config["debug"] as? Bool, debug {
                    ttConfig.enableDebugMode()
                    ttConfig.setLogLevel(TikTokLogLevelDebug)
                }
                
                // Configure automatic events if specified
                if let disableAutoEvents = config["disableAutoEvents"] as? Bool, disableAutoEvents {
                    ttConfig.disableAutomaticTracking()
                }
                
                // Initialize the SDK
                TikTokBusiness.initializeSdk(ttConfig) { success, error in
                    if success {
                        promise.resolve(nil)
                    } else if let error = error {
                        promise.reject("INIT_FAILED", error.localizedDescription)
                    } else {
                        promise.reject("INIT_FAILED", "Failed to initialize TikTok SDK")
                    }
                }
            }
        }
        
        AsyncFunction("trackEvent") { (eventName: String, properties: [String: Any]?, promise: Promise) in
            DispatchQueue.main.async {
                if let properties = properties {
                    TikTokBusiness.trackEvent(eventName, withProperties: properties)
                } else {
                    TikTokBusiness.trackEvent(eventName)
                }
                promise.resolve(nil)
            }
        }
        
        AsyncFunction("identify") { (params: [String: Any?], promise: Promise) in
            DispatchQueue.main.async {
                TikTokBusiness.identify(
                    withExternalID: params["externalId"] as? String,
                    externalUserName: params["externalUserName"] as? String,
                    phoneNumber: params["phoneNumber"] as? String,
                    email: params["email"] as? String
                )
                promise.resolve(nil)
            }
        }

        AsyncFunction("logout") { (promise: Promise) in
            DispatchQueue.main.async {
                TikTokBusiness.logout()
                promise.resolve(nil)
            }
        }

        AsyncFunction("getTrackingStatus") { (promise: Promise) in
            DispatchQueue.main.async {
                let trackingEnabled = Bundle.main.object(
                    forInfoDictionaryKey: "TikTokTrackingEnabled"
                ) as? String ?? "1"
                
                promise.resolve(trackingEnabled == "1" ? "authorized" : "denied")
            }
        }
    }
}