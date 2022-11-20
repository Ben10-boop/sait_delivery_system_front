import axios from "axios";

const API_URL =
  "https://ben10-boopsaitynaideliverysystem.azurewebsites.net/api/Vehicle";

export const useVehicles = () => {
  const getVehicles = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  };

  const getVehicle = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  const postVehicle = async (regNumbers, brand, model, maxPayload) => {
    console.log({
      regNumbers,
      brand,
      model,
      maxPayload,
    });
    const response = await axios.post(API_URL, {
      regNumbers,
      brand,
      model,
      maxPayload,
    });
    console.log(response.data);
    return response.data;
  };

  const putVehicle = async (
    id,
    regNumbers,
    brand,
    model,
    maxPayload,
    driverId
  ) => {
    console.log({
      regNumbers,
      brand,
      model,
      maxPayload,
      driverId,
    });
    const response = await axios.put(API_URL + `/${id}`, {
      regNumbers,
      brand,
      model,
      maxPayload,
      driverId,
    });
    console.log(response.data);
    return response.data;
  };

  const deleteVehicle = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  const getVehiclePackages = async (id) => {
    const response = await axios.get(API_URL + `/${id}/Packages`);
    console.log(response.data);
    return response.data;
  };

  return {
    getVehicles,
    getVehicle,
    postVehicle,
    putVehicle,
    deleteVehicle,
    getVehiclePackages,
  };
};
