import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SquareContainer from "../../../../components/SquareContainer";
import { colors, opacity } from "../../../../styles/colors";
import {
  BackgroundFetchResult,
  getStatusAsync,
  registerTaskAsync,
  unregisterTaskAsync,
} from "expo-background-fetch";
import { defineTask, isTaskRegisteredAsync } from "expo-task-manager";
import {
  Accuracy,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";

const timestampOptions = [10, 5, 3, 1];

const UPDATE_LOCATION_TASK = "Update_Location";

defineTask(UPDATE_LOCATION_TASK, async ({ error, data }) => {
  console.log("useEffect getStatusAsync: ", await getStatusAsync());
  Alert.alert("Aqui");

  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  if (error) {
    console.log(error);
    return;
  }

  if (data) {
    const { locations } = data;
    console.log("data locations", locations);
  }

  return BackgroundFetchResult.NewData;
});

const TrackerHandler: FC = () => {
  const [isActive, setIsActive] = useState<boolean>();
  const [squareSelectedIndex, setSquareSelectedIndex] = useState(0);

  const squaresColors = useMemo(
    () =>
      timestampOptions.map((timestampOption, key) =>
        key === squareSelectedIndex
          ? {
              background: colors.ligthGreen + opacity[10],
              border: colors.ligthGreen,
            }
          : { background: "transparent", border: colors.gray }
      ),
    [timestampOptions, squareSelectedIndex]
  );

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await requestForegroundPermissionsAsync();

    if (foregroundStatus === "granted") {
      console.log("requestBackgroundPermissionsAsync");
      const { status: backgroundStatus } =
        await requestBackgroundPermissionsAsync();

      console.log(backgroundStatus);

      if (backgroundStatus === "granted") {
        console.log("startLocationUpdatesAsync");

        await startLocationUpdatesAsync(UPDATE_LOCATION_TASK, {
          timeInterval: 10000,
          accuracy: 6,
          distanceInterval: 0,
        });
      }
    }
  };

  const toggleSwitch = () => {
    console.log(isActive);

    if (isActive) {
      console.log("unregisterTaskAsync: ", isActive);
      stopLocationUpdatesAsync(UPDATE_LOCATION_TASK);
    } else {
      console.log("registerTaskAsync: ", isActive);
      startLocationUpdatesAsync(UPDATE_LOCATION_TASK, {
        timeInterval: 10000,
        accuracy: 6,
        distanceInterval: 0,
      });
    }

    setIsActive((previousState) => !previousState);
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await getStatusAsync();
    const isRegistered = await isTaskRegisteredAsync(UPDATE_LOCATION_TASK);

    console.log("status: ", status);
    console.log("isRegistered: ", isRegistered);
    setIsActive(isRegistered);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.aside}>
          <Text style={styles.title}>Status do serviço</Text>
          <Text style={styles.subtitle}>Serviço ativo</Text>
        </View>

        <View style={styles.btnContainer}>
          <Switch
            value={isActive}
            onChange={toggleSwitch}
            trackColor={{ false: colors.smoklyWhite, true: colors.smoklyWhite }}
            thumbColor={isActive ? colors.ligthGreen : colors.ligtherGray}
          />
        </View>
      </View>

      <View style={styles.timestampContainer}>
        <Text style={styles.title}>Intervalo de comunicação</Text>

        <View style={styles.selectorContainer}>
          {timestampOptions.map((timestampOption, key) => (
            <TouchableOpacity
              key={`touchable-square-container-${key}`}
              onPress={() => setSquareSelectedIndex(key)}
            >
              <SquareContainer colors={squaresColors[key]}>
                <Text style={styles.title}>{timestampOption}s</Text>
              </SquareContainer>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default TrackerHandler;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 24,
  },
  aside: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  timestampContainer: {
    paddingHorizontal: 24,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
