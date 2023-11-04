import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

const Package: FC<OwnProps> = ({ packageId, time }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          Pacote ID: {packageId}
        </Text>

        <Text>Pendente sincronizar</Text>
      </View>

      <View>
        <Text>
          {time ? new Date(time).toLocaleString("pt-BR", options) : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
});

export default Package;
