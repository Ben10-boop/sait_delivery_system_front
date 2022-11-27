import React, { useEffect } from "react";
import Login from "./Login";
import Packages from "./packages/Packages";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedPage } from "./ProtectedPage";
import AddPackage from "./packages/AddPackage";
import Logout from "./Logout";
import Home from "./Home";
import Package from "./packages/Package";
import FindPackage from "./packages/FindPackage";
import Vehicles from "./vehicles/Vehicles";
import AddVehicle from "./vehicles/AddVehicle";
import Vehicle from "./vehicles/Vehicle";
import Deliveries from "./deliveries/Deliveries";
import AddDelivery from "./deliveries/AddDelivery";
import Delivery from "./deliveries/Delivery";
import Register from "./Register";
import { useError } from "../context/UseError";

function Pages() {
  const { setError } = useError();
  const location = useLocation();
  useEffect(() => {
    setError(null);
  }, [location, setError]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/packages"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <Packages />
          </ProtectedPage>
        }
      />
      <Route
        path="/addPackage"
        element={
          <ProtectedPage roles={["Administrator"]}>
            <AddPackage />
          </ProtectedPage>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedPage roles={["Administrator", "Courier", "Client"]}>
            <Logout />
          </ProtectedPage>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedPage roles={["Administrator", "Courier", "Client"]}>
            <Home />
          </ProtectedPage>
        }
      />
      <Route
        path="/package/:identifier"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <Package />
          </ProtectedPage>
        }
      />
      <Route
        path="/package/find"
        element={
          <ProtectedPage roles={["Administrator", "Courier", "Client"]}>
            <FindPackage />
          </ProtectedPage>
        }
      />
      <Route
        path="/vehicles"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <Vehicles />
          </ProtectedPage>
        }
      />
      <Route
        path="/addVehicle"
        element={
          <ProtectedPage roles={["Administrator"]}>
            <AddVehicle />
          </ProtectedPage>
        }
      />
      <Route
        path="/vehicle/:identifier"
        element={
          <ProtectedPage roles={["Administrator"]}>
            <Vehicle />
          </ProtectedPage>
        }
      />
      <Route
        path="/deliveries"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <Deliveries />
          </ProtectedPage>
        }
      />
      <Route
        path="/addDelivery"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <AddDelivery />
          </ProtectedPage>
        }
      />
      <Route
        path="/delivery/:identifier"
        element={
          <ProtectedPage roles={["Administrator", "Courier"]}>
            <Delivery />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default Pages;
