import { registerWebModule, NativeModule } from 'expo';

import { ExpoTiktokSdkModuleEvents } from './ExpoTiktokSdk.types';

class ExpoTiktokSdkModule extends NativeModule<ExpoTiktokSdkModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTiktokSdkModule);
