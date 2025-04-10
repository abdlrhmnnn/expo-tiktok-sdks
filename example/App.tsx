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

      // Enable tracking after initialization
      ExpoTiktokSdk.getTrackingStatus()
        .then((status) => {
          if (status === "authorized") {
            console.log("Tracking is authorized");
          } else {
            console.log("Tracking is not authorized");
          }
        })
        .catch((error) => {
          console.error("Error getting tracking status:", error);
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
      // Using a standard event name from TikTok's documentation
      await ExpoTiktokSdk.trackEvent("CompletePayment", {
        value: 123.45,
        currency: "USD",
        description: "Test purchase",
        content_type: "product",
        content_id: "test_123",
        content_name: "Test Product",
        quantity: 1,
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
