jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import AsyncStorage from "@react-native-async-storage/async-storage";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { setPoint, getAllPoints, sendStoragedPoints } from "./";
import { LocationPoint } from "../../api/models";

describe("Teste das funções relacionadas a AsyncStorage", () => {
  const mockLocationPoint = {
    id: "1",
    latitude: 123.456,
    longitude: 789.012,
    speed: 50,
    time: new Date("2023-11-07T01:33:11.438Z"),
  };

  let mock: MockAdapter;

  beforeAll(async () => {
    await AsyncStorage.clear();
    mock = new MockAdapter(axios);
  });

  it("setPoint deve armazenar um ponto corretamente", async () => {
    await setPoint(mockLocationPoint);
    const storedValue = await AsyncStorage.getItem(mockLocationPoint.id);

    expect(JSON.parse(storedValue)).toEqual(mockLocationPoint);
  });

  it("getAllPoints deve retornar os pontos armazenados", async () => {
    await setPoint(mockLocationPoint);
    const points = await getAllPoints();

    expect(points).toHaveLength(1);
    expect(points[0]).toEqual(mockLocationPoint);
  });

  it("sendStoragedPoints deve enviar pontos e removê-los", async () => {
    await setPoint(mockLocationPoint);
    const spyMultiRemove = jest.spyOn(AsyncStorage, "multiRemove");

    const locationPoint: LocationPoint = {
      id: "package3",
      latitude: 111.111,
      longitude: 222.222,
      speed: 30,
      time: new Date(),
    };

    // Configura a expectativa de que uma solicitação POST será feita para uma URL específica e com os dados esperados
    mock.onPost(`/points/${locationPoint.id}`, locationPoint).reply(200);

    await sendStoragedPoints();

    const storedValue = await AsyncStorage.getItem(mockLocationPoint.id);

    expect(spyMultiRemove).toHaveBeenCalledWith([mockLocationPoint.id]);
    expect(storedValue).toBeNull();

    spyMultiRemove.mockRestore();
  });
});
