import axios from "axios";

const API_URL =
  "https://ben10-boopsaitynaideliverysystem.azurewebsites.net/api/Package";

export const usePackages = () => {
  const getPackages = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  };

  const getPackage = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  const postPackage = async (size, weight, address, recipientId, state) => {
    console.log({
      size,
      weight,
      address,
      recipientId,
      state,
    });
    const response = await axios.post(API_URL, {
      size,
      weight,
      address,
      recipientId,
      state,
    });
    console.log(response.data);
    return response.data;
  };

  const putPackage = async (
    id,
    size,
    weight,
    address,
    recipientId,
    assignedToDeliveryId,
    state
  ) => {
    console.log({
      size,
      weight,
      address,
      recipientId,
      state,
    });
    const response = await axios.put(API_URL + `/${id}`, {
      size,
      weight,
      address,
      recipientId,
      assignedToDeliveryId,
      state,
    });
    console.log(response.data);
    return response.data;
  };

  const deletePackage = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return { getPackages, getPackage, postPackage, putPackage, deletePackage };
};
