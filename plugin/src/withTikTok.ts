import {
  ConfigPlugin,
  withInfoPlist,
  withAndroidManifest,
  AndroidConfig,
} from "@expo/config-plugins";

const withTikTok: ConfigPlugin<{
  iosAppId?: string;
  androidAppId?: string;
  iosDeepLinkScheme?: string;
  androidDeepLinkHost?: string;
}> = (config, props = {}) => {
  // Modify Android
  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    // Add TikTok App ID
    if (props.androidAppId) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        mainApplication,
        "com.tiktok.sdk.AppId",
        props.androidAppId
      );
    }

    // Add Deep Link Host
    if (props.androidDeepLinkHost) {
      const activity = mainApplication.activity?.find(
        (item) =>
          item.$?.["android:name"] === "com.tiktok.sdk.TikTokEntryActivity"
      );
      if (activity) {
        const intentFilter = activity["intent-filter"]?.[0];
        if (intentFilter) {
          intentFilter.data = [
            {
              $: {
                "android:scheme": "https",
                "android:host": props.androidDeepLinkHost,
              },
            },
          ];
        }
      }
    }

    return config;
  });

  // Modify iOS
  config = withInfoPlist(config, (config) => {
    // Add TikTok App ID
    if (props.iosAppId) {
      config.modResults.TikTokAppID = props.iosAppId;
    }

    // Add URL Schemes
    if (props.iosDeepLinkScheme) {
      config.modResults.CFBundleURLTypes = [
        {
          CFBundleURLSchemes: [props.iosDeepLinkScheme],
        },
      ];
    }

    // Add required query schemes
    config.modResults.LSApplicationQueriesSchemes = [
      "tiktokopensdk",
      "tiktoksharesdk",
      "snssdk1180",
      "snssdk1233",
    ];

    return config;
  });

  return config;
};

export default withTikTok;
