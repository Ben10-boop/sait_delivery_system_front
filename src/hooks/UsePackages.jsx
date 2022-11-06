import axios from "axios";
import { useUser } from "./UseUser";

const API_URL =
  "https://ben10-boopsaitynaideliverysystem.azurewebsites.net/api/Package";

export const usePackages = () => {
  const { setUser } = useUser();

  const getPackages = async () => {
    console.log("am before get");
    const response = await axios.get(API_URL);
    console.log(response.data);
    console.log("am after get");
    return response.data;
  };

  return { getPackages };
};
