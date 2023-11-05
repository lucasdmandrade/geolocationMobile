import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/colors";

const Home = () => (
  <View style={styles.container}>
    <Text style={styles.title}>My GPS - Tracking</Text>

    <Text style={styles.subtitle}>online</Text>
  </View>
);

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
    color: colors.ligthGreen,
  },
});

export default Home;
function defineTask(BACKGROUND_FETCH_TASK: any, arg1: () => Promise<any>) {
  throw new Error("Function not implemented.");
}
