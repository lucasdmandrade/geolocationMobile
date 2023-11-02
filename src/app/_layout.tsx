import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function HomeLayout() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Olá, bem vindo</Text>

        <Text style={styles.status}>Status</Text>
      </View>

      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "blue",
    marginTop: Constants.statusBarHeight,
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: "#bebebe",
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
    color: "#fefefe",
  },
});
