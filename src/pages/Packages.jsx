import React, { useState, useRef, useEffect } from "react";
import { usePackages } from "../hooks/UsePackages";

const Packages = () => {
  const { getPackages } = usePackages();
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      handleGetPackages();
      hasFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetPackages = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      console.log("i'm in handlePackages before getPackages");
      setPackages(await getPackages());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  //console.log("i'm before handleGetPackages");
  //console.log("i'm after handleGetPackages");
  //console.log(packages);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Size</td>
            <td>Weight</td>
            <td>Delivery Address</td>
            <td>Package State</td>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.size}</td>
                <td>{item.weight}</td>
                <td>{item.address}</td>
                <td>{item.state}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Packages;
