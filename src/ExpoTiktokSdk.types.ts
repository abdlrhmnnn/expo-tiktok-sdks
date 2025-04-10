export type InitializeParams = {
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
};

export type TrackEventParams = {
  eventName: string;
  properties?: Record<string, any>;
};

export type IdentifyParams = {
  externalId?: string;
  externalUserName?: string;
  phoneNumber?: string;
  email?: string;
};

export type TrackingStatus = "authorized" | "denied" | "unavailable";
