// Reexport the native module. On web, it will be resolved to ExpoTiktokSdkModule.web.ts
// and on native platforms to ExpoTiktokSdkModule.ts
export { default } from './ExpoTiktokSdkModule';
export { default as ExpoTiktokSdkView } from './ExpoTiktokSdkView';
export * from  './ExpoTiktokSdk.types';
