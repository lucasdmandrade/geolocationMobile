import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import TrackerHandler from "./home/components/TrackerHandler";
import TrackerHeader from "../components/TrackerHeader";
import Divider from "../components/Divider";
import { useFocusEffect } from "expo-router";

export default function Page() {
  useFocusEffect(() => StatusBar.setBackgroundColor("red"));

  return (
    <SafeAreaView style={styles.container}>
      <TrackerHeader />

      <Divider />

      <TrackerHandler />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 24,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "green",
  },
});
