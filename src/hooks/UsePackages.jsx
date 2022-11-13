import axios from "axios";
import { useUser } from "./UseUser";

const API_URL =
  "https://ben10-boopsaitynaideliverysystem.azurewebsites.net/api/Package";

export const usePackages = () => {
  const { setUser } = useUser();

  const getPackages = async () => {
    const response = await axios.get(API_URL);
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

  return { getPackages, postPackage };
};
