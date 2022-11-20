/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { usePackages } from "../../hooks/UsePackages";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicles } from "../../hooks/UseVehicles";

const Vehicle = () => {
  const { putVehicle, getVehicle } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [regNumbers, setRegNumbers] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPayload, setMaxPayload] = useState(0);
  const [driverId, setDriverId] = useState(0);
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    getVehicle(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  const handleEditVehicle = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await putVehicle(
        params.identifier,
        regNumbers,
        brand,
        model,
        maxPayload,
        driverId
      );
      navigate("/vehicles");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6}>
        <Box
          sx={{
            padding: "24px",
          }}
        >
          <form onSubmit={handleEditVehicle}>
            <Stack spacing={2}>
              <Typography variant="h5">
                View, edit vehicle {params.identifier}
              </Typography>
              <InputLabel id="regNrInput">
                Registration numbers : {details["regNumbers"]}
              </InputLabel>
              <TextField
                type="text"
                value={regNumbers}
                onChange={(e) => setRegNumbers(e.target.value)}
              />
              <InputLabel id="brandInput">
                Brand : {details["brand"]}
              </InputLabel>
              <TextField
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <InputLabel id="modelInput">
                Model : {details["model"]}
              </InputLabel>
              <TextField
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">
                Maximum payload : {details["maxPayload"]}
              </InputLabel>
              <TextField
                type="number"
                value={maxPayload}
                onChange={(e) => setMaxPayload(parseInt(e.target.value))}
              />
              <InputLabel id="driverIdInput">
                Driver ID :{details["driverId"] ?? "Not assigned"}
              </InputLabel>
              <TextField
                type="number"
                value={driverId}
                onChange={(e) => setDriverId(parseInt(e.target.value))}
              />
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                Submit Changes
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Vehicle;
