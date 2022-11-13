import React from "react";
import Login from "./Login";
import Packages from "./Packages";
import { Route, Routes } from "react-router-dom";
import { ProtectedPage } from "./ProtectedPage";
import AddPackage from "./AddPackage";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
    </Routes>
  );
}

export default Pages;
