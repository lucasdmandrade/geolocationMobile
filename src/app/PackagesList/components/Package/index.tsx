import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const Package: FC<OwnProps> = ({}) => (
  <View style={styles.container}>
    <View>
      <Text>Pacote ID: XXXXX</Text>

      <Text>Pendente sincronizar</Text>
    </View>

    <View>
      <Text>11:32</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
});

export default Package;
