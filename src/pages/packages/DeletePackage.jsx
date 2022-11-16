/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { usePackages } from "../../hooks/UsePackages";

const DeletePackage = () => {
  const { deletePackage } = usePackages();
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    deletePackage(params.identifier);
    navigate("/packages");
  }, []);

  return <Typography variant="h3">This is delete package</Typography>;
};

export default DeletePackage;
