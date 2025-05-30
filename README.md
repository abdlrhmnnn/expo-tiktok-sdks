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

# Development

To build and test the module locally:

1. Build the package and plugin:

```bash
npm run build
npm run build:plugin
```

2. Clean install dependencies:

```bash
rm -rf node_modules
npm install
```

3. Rebuild native code:

```bash
npx expo prebuild --clean
```

4. Run iOS simulator:

```bash
npx expo run:ios
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
