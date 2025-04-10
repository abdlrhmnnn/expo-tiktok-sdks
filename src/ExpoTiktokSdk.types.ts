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

export interface EventProperties {
  value?: number;
  currency?: string;
  description?: string;
  content_type?: string;
  content_id?: string;
  content_name?: string;
  quantity?: number;
  [key: string]: any;
}

export interface TrackEventParams {
  eventName: string;
  properties?: EventProperties;
}

export type IdentifyParams = {
  externalId?: string;
  externalUserName?: string;
  phoneNumber?: string;
  email?: string;
};

export type TrackingStatus = "authorized" | "denied" | "unavailable";
