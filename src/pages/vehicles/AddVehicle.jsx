import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "../../hooks/UseVehicles";

const AddVehicle = () => {
  const { postVehicle } = useVehicles();
  const [regNumbers, setRegNumbers] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPayload, setMaxPayload] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await postVehicle(regNumbers, brand, model, maxPayload);
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
          <form onSubmit={handleAddPackage}>
            <Stack spacing={2}>
              <Typography variant="h5">Add new vehicle</Typography>
              <InputLabel id="regNumbersInput">Registration numbers</InputLabel>
              <TextField
                type="text"
                value={regNumbers}
                onChange={(e) => setRegNumbers(e.target.value)}
              />
              <InputLabel id="brandInput">Brand</InputLabel>
              <TextField
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <InputLabel id="modelInput">Model</InputLabel>
              <TextField
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <InputLabel id="maxPayloadInput">Maximum Payload</InputLabel>
              <TextField
                type="number"
                value={maxPayload}
                onChange={(e) => setMaxPayload(parseInt(e.target.value))}
              />
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddVehicle;
