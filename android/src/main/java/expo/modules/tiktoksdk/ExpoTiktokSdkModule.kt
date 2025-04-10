package expo.modules.tiktoksdk

import android.content.pm.PackageManager
import com.tiktok.TikTokBusinessSdk
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.CodedException

class ExpoTiktokSdkModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoTiktokSdk")

    AsyncFunction("initialize") { config: Map<String, Any> ->
      val context = appContext.reactContext ?: 
        throw CodedException("CONTEXT_UNAVAILABLE", "React context is not available")

      try {
        val androidConfig = config["android"] as? Map<String, Any> ?:
          throw CodedException("INVALID_CONFIG", "Android configuration missing")
          
        val ttConfig = TikTokBusinessSdk.TTConfig(context)
          .setAppId(androidConfig["appId"] as? String ?: 
            throw CodedException("INVALID_CONFIG", "appId is required"))
          .setTTAppId(androidConfig["tiktokAppId"] as? String ?: 
            throw CodedException("INVALID_CONFIG", "tiktokAppId is required"))

        androidConfig["accessToken"]?.let { ttConfig.setAccessToken(it as String) }

        // Configure debug mode
        if (config["debug"] == true) {
          ttConfig.openDebugMode()
          ttConfig.setLogLevel(TikTokBusinessSdk.LogLevel.DEBUG)
        }

        // Configure automatic events
        if (config["disableAutoEvents"] == true) {
          ttConfig.disableAutoEvents()
          ttConfig.disableInstallLogging()
          ttConfig.disableLaunchLogging()
          ttConfig.disableRetentionLogging()
        }

        // Disable tracking initially
        ttConfig.disableAutoStart()

        TikTokBusinessSdk.initializeSdk(ttConfig) { success ->
          if (success) {
            // Start tracking after successful initialization
            TikTokBusinessSdk.startTrack()
          }
        }
      } catch (e: Exception) {
        throw CodedException("INIT_FAILED", "Failed to initialize TikTok SDK", e)
      }
    }

    AsyncFunction("trackEvent") { eventName: String, properties: Map<String, Any>? ->
      try {
        if (properties != null) {
          TikTokBusinessSdk.trackEvent(eventName, properties)
        } else {
          TikTokBusinessSdk.trackEvent(eventName)
        }
      } catch (e: Exception) {
        throw CodedException("TRACK_FAILED", "Failed to track event", e)
      }
    }

    AsyncFunction("identify") { params: Map<String, Any?> ->
      try {
        TikTokBusinessSdk.identify(
          params["externalId"] as? String,
          params["externalUserName"] as? String,
          params["phoneNumber"] as? String,
          params["email"] as? String
        )
      } catch (e: Exception) {
        throw CodedException("IDENTIFY_FAILED", "Failed to identify user", e)
      }
    }

    AsyncFunction("logout") {
      try {
        TikTokBusinessSdk.logout()
      } catch (e: Exception) {
        throw CodedException("LOGOUT_FAILED", "Failed to logout", e)
      }
    }

    AsyncFunction("getTrackingStatus") {
      try {
        val context = appContext.reactContext ?: return@AsyncFunction "unavailable"
        val packageManager = context.packageManager
        val applicationInfo = packageManager.getApplicationInfo(
          context.packageName, 
          PackageManager.GET_META_DATA
        )
        val bundle = applicationInfo.metaData
        
        val trackingEnabled = bundle.getString("TikTokTrackingEnabled", "1") == "1"
        if (trackingEnabled) "authorized" else "denied"
      } catch (e: Exception) {
        "unavailable"
      }
    }
  }
}