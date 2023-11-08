import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SquareContainer from "../../../../components/SquareContainer";
import { colors } from "../../../../styles/colors";
import {
  UPDATE_LOCATION_TASK,
  requestPermissions,
  startUpdateLocation,
  stopUpdateLocation,
} from "../../../../services/backgroundTasks/updateLocation";
import { isTaskRegisteredAsync } from "expo-task-manager";

const timestampOptions = [10, 5, 3, 1];

const TrackerHandler: FC = () => {
  const [isActive, setIsActive] = useState<boolean>();
  const [squareSelectedIndex, setSquareSelectedIndex] = useState(0);

  const syncTimestamp = useMemo(
    () => timestampOptions[squareSelectedIndex] * 1000,
    [squareSelectedIndex]
  );

  const squaresColors = useMemo(
    () =>
      timestampOptions.map((timestampOption, key) =>
        key === squareSelectedIndex
          ? {
              background: colors.ligtherGreen,
              border: colors.ligthGreen,
            }
          : { background: "transparent", border: colors.gray }
      ),
    [timestampOptions, squareSelectedIndex]
  );

  const initUpdateLocation = useCallback(async () => {
    await requestPermissions(syncTimestamp);

    const isTaskActive = await isTaskRegisteredAsync(UPDATE_LOCATION_TASK);

    setIsActive(isTaskActive);
  }, [setIsActive, syncTimestamp]);

  const toggleSwitch = useCallback(async () => {
    isActive
      ? await stopUpdateLocation()
      : await startUpdateLocation(syncTimestamp);

    setIsActive((previousState) => !previousState);
  }, [setIsActive, isActive, syncTimestamp]);

  useEffect(() => {
    initUpdateLocation();
  }, []);

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
              disabled={isActive}
              key={`touchable-square-container-${key}`}
              onPress={() => setSquareSelectedIndex(key)}
            >
              <SquareContainer colors={squaresColors[key]}>
                <Text
                  style={[
                    styles.title,
                    { fontWeight: key === squareSelectedIndex ? "600" : "400" },
                  ]}
                >
                  {timestampOption}s
                </Text>
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
