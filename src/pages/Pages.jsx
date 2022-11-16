import React from "react";
import Login from "./Login";
import Packages from "./packages/Packages";
import { Route, Routes } from "react-router-dom";
import { ProtectedPage } from "./ProtectedPage";
import AddPackage from "./packages/AddPackage";
import Logout from "./Logout";
import Home from "./Home";
import Package from "./packages/Package";
import DeletePackage from "./packages/DeletePackage";
import FindPackage from "./packages/FindPackage";

function Pages() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
        path="/package/delete/:identifier"
        element={
          <ProtectedPage roles={["Administrator"]}>
            <DeletePackage />
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
    </Routes>
  );
}

export default Pages;
