import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SquareContainer from "../../../../components/SquareContainer";
import { colors, opacity } from "../../../../styles/colors";

const timestampOptions = [10, 5, 3, 1];

const TrackerHandler: FC = () => {
  const [isActive, setIsActive] = useState(true);
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

  const toggleSwitch = useCallback(
    () => setIsActive((previousState) => !previousState),
    [setIsActive]
  );

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
