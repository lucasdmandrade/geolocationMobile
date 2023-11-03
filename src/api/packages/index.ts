import api from "../../services/axios";

export const getAllPackages = async () => {
  try {
    const response = await api.get("/points");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const newPoint = async (locationPoint: LocationPoint) => {
  try {
    const response = await api.post(`/points/${locationPoint.id}`, {
      locationPoint,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
