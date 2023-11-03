import { router, useFocusEffect } from "expo-router";
import { Text } from "react-native";

const startScreenHanler = () => {
  useFocusEffect(() => router.replace("/Home"));
};

export default startScreenHanler;
