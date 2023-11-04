import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import api from "../../services/axios";
import { AllPackagesKeys, LocationPoint } from "../models";

export const getAllPackages = async () => {
  try {
    const response = await api.get<AllPackagesKeys>("/points");

    console.log("getAllPackages response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("getAllPackages error: ", error);
  }
};

export const getPackage = async (id: string) => {
  try {
    const response = await api.get(`/points/${id}`);

    console.log("getPackage response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("getPackage error: ", error);
  }
};

export const newPoint = async (locationPoint: LocationPoint) => {
  const id = uuidv4();
  try {
    const response = await api.post(`/points/${id}`, {
      id,
      latitude: locationPoint.latitude,
      longitude: locationPoint.longitude,
      speed: locationPoint.speed,
      time: new Date(),
    });

    console.log("newPoint response: ", response.data);
  } catch (error) {
    console.error("newPoint error: ", error);
  }
};
