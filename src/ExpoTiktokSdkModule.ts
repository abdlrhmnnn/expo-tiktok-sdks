import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTiktokSdkModuleEvents } from './ExpoTiktokSdk.types';

declare class ExpoTiktokSdkModule extends NativeModule<ExpoTiktokSdkModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTiktokSdkModule>('ExpoTiktokSdk');
