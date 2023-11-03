import { Button, FlatList } from "react-native";
import Package from "../Package";
import { useCallback, useEffect, useState } from "react";
import { getAllPackages, newPoint } from "../../../../api/packages";
import * as Location from "expo-location";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [location, setLocation] = useState();

  const fetchPackages = useCallback(async () => {
    const teste = await getAllPackages();

    console.log("teste: ", teste);
  }, []);

  const renderItem = useCallback(() => <Package />, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("location: ", location);
    })();
  }, []);

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <FlatList data={[{}, {}]} renderItem={renderItem} />
      <Button
        title="Teste"
        onPress={() =>
          newPoint({
            id: "1",
            latitude: 1,
            longitude: 1,
            speed: 1,
            time: new Date(),
          })
        }
      />
    </>
  );
};

export default PackageList;
