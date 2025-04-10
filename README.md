# expo-tiktok-sdk

A module for integrating TikTok SDK with Expo projects to enable TikTok-related functionalities

# API documentation

- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/tiktok-sdk/)
- [Documentation for the main branch](https://docs.expo.dev/versions/unversioned/sdk/tiktok-sdk/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-tiktok-sdk
```

### Configure for Android

### Configure for iOS

1. Make sure you have CocoaPods installed:

```bash
sudo gem install cocoapods
```

2. The module will automatically add the TikTok SDK to your project when you run:

```bash
npx pod-install
```

3. If you need to update the SDK version later, you can run:

```bash
cd ios && pod update TikTokBusinessSDK
```

Run `npx pod-install` after installing the npm package.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
