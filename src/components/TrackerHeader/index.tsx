import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My GPS - Tracking</Text>

      <Text style={styles.subtitle}>online</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "green",
  },
});
