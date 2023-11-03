import { Link, Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../styles/colors";

const Layout = () => (
  <>
    <View style={styles.container}>
      <Text style={styles.goBackTitle}>Voltar</Text>

      <Link style={styles.title} href="/PackagesList">
        Status
      </Link>

      <View style={styles.imaginaryElement} />
    </View>

    <Slot />
  </>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.darkBlue,
    padding: 15,
    justifyContent: "center",
  },
  title: {
    flex: 2,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5,
    color: colors.smoklyWhite,
  },
  goBackTitle: {
    flex: 1,
    fontSize: 18,
    marginBottom: 5,
    color: colors.white,
  },
  imaginaryElement: {
    flex: 1,
  },
});

export default Layout;
