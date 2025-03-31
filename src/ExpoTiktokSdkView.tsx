import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTiktokSdkViewProps } from './ExpoTiktokSdk.types';

const NativeView: React.ComponentType<ExpoTiktokSdkViewProps> =
  requireNativeView('ExpoTiktokSdk');

export default function ExpoTiktokSdkView(props: ExpoTiktokSdkViewProps) {
  return <NativeView {...props} />;
}
