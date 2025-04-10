import ExpoTiktokSdkModule from "./ExpoTiktokSdkModule";

export async function initialize(config: {
  android?: {
    appId: string;
    tiktokAppId: string;
    accessToken?: string;
  };
  ios?: {
    appId: string;
    tiktokAppId: string;
    accessToken?: string;
  };
  debug?: boolean;
  disableAutoEvents?: boolean;
}): Promise<void> {
  return await ExpoTiktokSdkModule.initialize(config);
}

export async function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): Promise<void> {
  return await ExpoTiktokSdkModule.trackEvent(eventName, properties);
}

export async function identify(params: {
  externalId?: string;
  externalUserName?: string;
  phoneNumber?: string;
  email?: string;
}): Promise<void> {
  return await ExpoTiktokSdkModule.identify(params);
}

export async function logout(): Promise<void> {
  return await ExpoTiktokSdkModule.logout();
}

export async function getTrackingStatus(): Promise<
  "authorized" | "denied" | "unavailable"
> {
  return await ExpoTiktokSdkModule.getTrackingStatus();
}

export default {
  initialize,
  trackEvent,
  identify,
  logout,
  getTrackingStatus,
};
