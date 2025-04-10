import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as ExpoTiktokSdk from "expo-tiktok-sdk";

export default function App() {
  const [status, setStatus] = useState("initializing...");

  useEffect(() => {
    initializeTikTok();
  }, []);

  async function initializeTikTok() {
    try {
      await ExpoTiktokSdk.initialize({
        ios: {
          appId: "6502907052",
          tiktokAppId: "7486311276579553296",
          accessToken: "TTcbLIYumx68BAC5kZf0vks4qkaSOGfc",
        },
        android: {
          appId: "app.trevi.fintech",
          tiktokAppId: "7486876279556620304",
          accessToken: "TTWNceGdeMAxYiVC3SIy1NEs8kxcRjfF",
        },
        debug: true,
      });
      setStatus("initialized");
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "ERR_INVALID_ARGS_NUMBER") {
        errorMessage = "Invalid arguments passed to TikTok SDK";
      }
      setStatus(`failed: ${errorMessage}`);
    }
  }

  async function trackTestEvent() {
    try {
      await ExpoTiktokSdk.trackEvent("test_event", {
        value: 123.45,
        currency: "USD",
        content_type: "product",
        content_id: "test_123",
        content_name: "Test Product",
      });
      setStatus("event tracked");
    } catch (error) {
      console.error("Error tracking event:", error);
      setStatus(`tracking failed: ${error.message}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Status: {status}</Text>
      <Button title="Track Test Event" onPress={trackTestEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
