import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, FlatList } from "react-native";
import * as Location from "expo-location";
import Package from "../Package";
import { getAllPackages, getPackage, newPoint } from "../../../../api/packages";
import { LocationPoint } from "../../../../api/models";
import { getAllPoints } from "../../../../services/storage";
import { OrderedPackages } from "./types";

const PackageList = () => {
  const [synchronizedPackages, setSynchronizedPackages] = useState<
    LocationPoint[]
  >([]);
  const [storagePackages, setStoragePackages] = useState<LocationPoint[]>([]);
  const [location, setLocation] = useState<Location.LocationObject>();

  const orderedPackages: OrderedPackages[] = useMemo(() => {
    console.log("storagePackages: ", storagePackages.length);
    console.log("synchronizedPackages: ", synchronizedPackages.length);
    const storageWithIsSynchronized = storagePackages?.map((pkg) => ({
      ...pkg,
      isSynchronized: false,
    }));
    const synchronizedWithIsSynchronized = synchronizedPackages?.map((pkg) => ({
      ...pkg,
      isSynchronized: true,
    }));

    // Combine os arrays com os novos campos isSynchronized
    const combinedPackages = [
      ...storageWithIsSynchronized,
      ...synchronizedWithIsSynchronized,
    ];

    // Ordene os elementos pela data (supondo que a data esteja no campo 'time')
    combinedPackages.sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);

      // Inverta a ordem da comparação para mostrar os pacotes mais recentes primeiro
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

    return combinedPackages;
  }, [storagePackages, synchronizedPackages]);

  const fetchPackages = useCallback(async () => {
    const allPackages = await getAllPackages();

    if (!allPackages?.keys.length) return;

    Promise.all(
      allPackages?.keys?.map((PackageKeys) => getPackage(PackageKeys))
    )
      .then((value: { points: LocationPoint }[]) => {
        const points = value.map((element) => element.points);

        setSynchronizedPackages(points);
      })
      .catch((e) => console.log("Promise.all getPackage error: ", e));
  }, [setSynchronizedPackages]);

  const renderItem = useCallback(
    ({ item }: { item: OrderedPackages }) => (
      <Package
        packageId={item?.id}
        time={item?.time}
        isSynchronized={item.isSynchronized}
      />
    ),
    []
  );

  const fetchStoragedPoints = useCallback(async () => {
    const allPoints = await getAllPoints();
    if (!allPoints.length) return;

    setStoragePackages(allPoints);
  }, [setStoragePackages]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, [Location]);

  useEffect(() => {
    fetchPackages();
    fetchStoragedPoints();
  }, []);

  return (
    <>
      <FlatList data={orderedPackages} renderItem={renderItem} />

      <Button title="Teste" onPress={() => newPoint(location)} />
    </>
  );
};

export default PackageList;
