import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  getBackgroundPermissionsAsync,
} from "expo-location";
import { getNetworkStateAsync } from "expo-network";
import { defineTask } from "expo-task-manager";
import { v4 as uuidv4 } from "uuid";
import { newPoint } from "../../api/packages";
import { sendStoragedPoints, setPoint } from "../storage";

export const UPDATE_LOCATION_TASK = "Update_Location";

interface Coords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface UpdateLocation {
  locations: {
    coords: Coords;
    timestamp: number;
  }[];
}

defineTask<UpdateLocation>(UPDATE_LOCATION_TASK, async ({ error, data }) => {
  if (error) {
    console.log("defineTask error: ", error);
    return;
  }

  const isConnected = (await getNetworkStateAsync()).isConnected;

  if (data) {
    const { locations } = data;

    const point = {
      id: uuidv4(),
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      speed: locations[0].coords.speed,
      time: new Date(),
    };

    if (isConnected) {
      await sendStoragedPoints();

      return await newPoint(point);
    }

    return await setPoint(point);
  }
});

export const startUpdateLocation = async (timeInterval: number) =>
  await startLocationUpdatesAsync(UPDATE_LOCATION_TASK, {
    timeInterval: timeInterval,
    accuracy: 6,
    distanceInterval: 0,
  });

export const stopUpdateLocation = async () =>
  await stopLocationUpdatesAsync(UPDATE_LOCATION_TASK);

export const requestPermissions = async (timeInterval: number) => {
  const backgroundPermissions = await getBackgroundPermissionsAsync();
  if (backgroundPermissions.granted) return;

  const { status: foregroundStatus } =
    await requestForegroundPermissionsAsync();

  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await requestBackgroundPermissionsAsync();

    if (backgroundStatus === "granted") {
      await startUpdateLocation(timeInterval);
    }
  }
};
