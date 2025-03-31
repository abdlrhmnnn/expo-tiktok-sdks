import * as React from 'react';

import { ExpoTiktokSdkViewProps } from './ExpoTiktokSdk.types';

export default function ExpoTiktokSdkView(props: ExpoTiktokSdkViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
