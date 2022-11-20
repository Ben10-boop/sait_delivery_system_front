import axios from "axios";

const API_URL =
  "https://ben10-boopsaitynaideliverysystem.azurewebsites.net/api/Delivery";

export const useDeliveries = () => {
  const getDeliveries = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  };

  const getDelivery = async (id) => {
    const response = await axios.get(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  const postDelivery = async (
    deliveryVehicleId,
    deliveryCourierId,
    route,
    deliveryDate
  ) => {
    console.log({
      deliveryVehicleId,
      deliveryCourierId,
      route,
      deliveryDate,
    });
    const response = await axios.post(API_URL, {
      deliveryVehicleId,
      deliveryCourierId,
      route,
      deliveryDate,
    });
    console.log(response.data);
    return response.data;
  };

  const putDelivery = async (
    id,
    deliveryVehicleId,
    deliveryCourierId,
    route,
    deliveryDate
  ) => {
    console.log({
      deliveryVehicleId,
      deliveryCourierId,
      route,
      deliveryDate,
    });
    const response = await axios.put(API_URL + `/${id}`, {
      deliveryVehicleId,
      deliveryCourierId,
      route,
      deliveryDate,
    });
    console.log(response.data);
    return response.data;
  };

  const deleteDelivery = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    console.log(response.data);
    return response.data;
  };

  return {
    getDeliveries,
    getDelivery,
    postDelivery,
    putDelivery,
    deleteDelivery,
  };
};
