import { Link, Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../styles/colors";

export default function HomeLayout() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Olá, bem vindo</Text>

        <Link style={styles.status} href="/PackagesList">
          Status
        </Link>
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
    backgroundColor: colors.darkBlue,
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: colors.smoklyWhite,
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
    color: colors.white,
  },
});
