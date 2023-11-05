import { getStatusAsync, BackgroundFetchResult } from "expo-background-fetch";
import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import { getNetworkStateAsync } from "expo-network";
import { defineTask } from "expo-task-manager";
import { v4 as uuidv4 } from "uuid";
import { newPoint } from "../../api/packages";

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
  console.log("useEffect getStatusAsync: ", await getStatusAsync());

  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  if (error) {
    console.log(error);
    return;
  }

  const isConnected = (await getNetworkStateAsync()).isConnected;

  console.log("isConnected: ", isConnected);

  if (data) {
    const { locations } = data;
    console.log("data locations", locations);

    const point = {
      id: uuidv4(),
      latitude: locations[0].coords.latitude,
      longitude: locations[0].coords.longitude,
      speed: locations[0].coords.speed,
      time: new Date(),
    };

    if (isConnected) return; //await newPoint(point);
  }

  return BackgroundFetchResult.NewData;
});

export const startUpdateLocation = async (timeInterval: number) => {
  await startLocationUpdatesAsync(UPDATE_LOCATION_TASK, {
    timeInterval: timeInterval,
    accuracy: 6,
    distanceInterval: 0,
  });
};

export const stopUpdateLocation = async () => {
  await stopLocationUpdatesAsync(UPDATE_LOCATION_TASK);
};

export const requestPermissions = async (timeInterval: number) => {
  const { status: foregroundStatus } =
    await requestForegroundPermissionsAsync();

  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await requestBackgroundPermissionsAsync();

    if (backgroundStatus === "granted") {
      console.log("startLocationUpdatesAsync");

      await startUpdateLocation(timeInterval);
    }
  }
};
