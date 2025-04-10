import { NativeModules } from "react-native";
import { requireNativeModule } from "expo-modules-core";
import {
  InitializeParams,
  TrackEventParams,
  IdentifyParams,
  TrackingStatus,
} from "./ExpoTiktokSdk.types";

interface ExpoTiktokSdkModule {
  initialize(params: InitializeParams): Promise<void>;
  trackEvent(params: TrackEventParams): Promise<void>;
  identify(params: IdentifyParams): Promise<void>;
  logout(): Promise<void>;
  getTrackingStatus(): Promise<TrackingStatus>;
}

const module = requireNativeModule<ExpoTiktokSdkModule>("ExpoTiktokSdk");

export async function initialize(params: InitializeParams): Promise<void> {
  return await module.initialize(params);
}

export async function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): Promise<void> {
  return await module.trackEvent({ eventName, properties });
}

export async function identify(params: IdentifyParams): Promise<void> {
  return await module.identify(params);
}

export async function logout(): Promise<void> {
  return await module.logout();
}

export async function getTrackingStatus(): Promise<TrackingStatus> {
  return await module.getTrackingStatus();
}

export default {
  initialize,
  trackEvent,
  identify,
  logout,
  getTrackingStatus,
};
