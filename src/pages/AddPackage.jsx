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
  Select,
  MenuItem,
} from "@mui/material";
import { usePackages } from "../hooks/UsePackages";
import { useNavigate } from "react-router-dom";

const AddPackage = () => {
  const { postPackage } = usePackages();
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState(0);
  const [address, setAddress] = useState("");
  const [recipientId, setRecipientId] = useState(0);
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await postPackage(size, weight, address, recipientId, state);
      navigate("/packages");
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
              <Typography variant="h5">Add new package</Typography>
              <InputLabel id="sizeSelect">Size</InputLabel>
              <Select
                labelId="sizeSelect"
                id="sizeSelectThing"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <MenuItem value={"Small"}>Small</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Large"}>Large</MenuItem>
                <MenuItem value={"Very large"}>Very large</MenuItem>
              </Select>
              <InputLabel id="weightInput">Weight</InputLabel>
              <TextField
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <InputLabel id="addressInput">Address</InputLabel>
              <TextField
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputLabel id="recIdInput">Recipient ID</InputLabel>
              <TextField
                type="number"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
              <InputLabel id="stateSelect">State</InputLabel>
              <Select
                labelId="stateSelect"
                id="stateSelectThing"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <MenuItem value={"In warehouse"}>In warehouse</MenuItem>
                <MenuItem value={"Being delivered"}>Being delivered</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
              </Select>
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

export default AddPackage;
