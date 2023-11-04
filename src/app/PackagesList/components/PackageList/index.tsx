import { useCallback, useEffect, useState } from "react";
import { Button, FlatList } from "react-native";
import * as Location from "expo-location";
import Package from "../Package";
import { getAllPackages, getPackage, newPoint } from "../../../../api/packages";
import { LocationPoint } from "../../../../api/models";

const PackageList = () => {
  const [packages, setPackages] = useState<LocationPoint[]>([]);
  const [location, setLocation] = useState<Location.LocationObject>();

  const fetchPackages = useCallback(async () => {
    const allPackages = await getAllPackages();

    if (!allPackages?.keys.length) return;

    Promise.all(allPackages.keys.map((PackageKeys) => getPackage(PackageKeys)))
      .then((value: LocationPoint[]) => setPackages(value))
      .catch((e) => console.log("Promise.all getPackage error: ", e));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: { points: LocationPoint } }) => (
      <Package packageId={item.points.id} time={item.points.time} />
    ),
    []
  );

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
  }, [Location]);

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <FlatList data={packages} renderItem={renderItem} />

      <Button title="Teste" onPress={() => newPoint(location)} />
    </>
  );
};

export default PackageList;
