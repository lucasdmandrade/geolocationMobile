import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { osName } from "expo-device";
import TrackerHandler from "./components/TrackerHandler";
import TrackerHeader from "../../components/TrackerHeader";
import Divider from "../../components/Divider";
import { colors } from "../../styles/colors";

const Home = () => {
  useFocusEffect(() => {
    if (osName === "iOS") return;

    StatusBar.setBackgroundColor(colors.darkerBlue);
    StatusBar.setBarStyle("light-content");
  });

  return (
    <SafeAreaView style={styles.container}>
      <TrackerHeader />

      <Divider />

      <TrackerHandler />
    </SafeAreaView>
  );
};

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

export default Home;
