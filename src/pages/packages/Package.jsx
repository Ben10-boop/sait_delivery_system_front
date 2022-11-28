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
import { useError } from "../../context/UseError";

const Package = () => {
  const { setError: setHeaderError } = useError();
  const { putPackage, getPackage } = usePackages();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState(0);
  const [address, setAddress] = useState("");
  const [recipientId, setRecipientId] = useState(0);
  const [deliveryId, setDeliveryId] = useState(0);
  const [state, setState] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    getPackage(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  const handleEditPackage = async (e) => {
    e.preventDefault();
    if ([weight < 0, recipientId < 0, deliveryId < 0].includes(true)) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      setHeaderError(null);
      await putPackage(
        params.identifier,
        size,
        weight,
        address,
        recipientId,
        deliveryId,
        state
      );
      navigate("/packages");
    } catch (err) {
      console.log(err);
      setHeaderError(err.response.data);
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
          <form onSubmit={handleEditPackage}>
            <Stack spacing={2}>
              <Typography variant="h5">
                View, edit package {params.identifier}
              </Typography>
              <InputLabel id="sizeSelect">Size : {details["size"]}</InputLabel>
              <Select
                labelId="sizeSelect"
                id="sizeSelectThing"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <MenuItem value={"small"}>Small</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"large"}>Large</MenuItem>
                <MenuItem value={"very large"}>Very large</MenuItem>
              </Select>
              <InputLabel id="weightInput">
                Weight : {details["weight"]}
              </InputLabel>
              <TextField
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
              {error && weight < 0 ? (
                <label style={{ color: "#f44336" }}>
                  Weight cannot be negative
                </label>
              ) : (
                ""
              )}
              <InputLabel id="addressInput">
                Address : {details["address"]}
              </InputLabel>
              <TextField
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputLabel id="recIdInput">
                Recipient ID : {details["recipientId"]}
              </InputLabel>
              <TextField
                type="number"
                value={recipientId}
                onChange={(e) => setRecipientId(parseInt(e.target.value))}
              />
              {error && recipientId < 0 ? (
                <label style={{ color: "#f44336" }}>
                  Recipient ID cannot be negative
                </label>
              ) : (
                ""
              )}
              <InputLabel id="delivIdInput">
                Delivery ID :{details["assignedToDeliveryId"] ?? "Not assigned"}
              </InputLabel>
              <TextField
                type="number"
                value={deliveryId}
                onChange={(e) => setDeliveryId(parseInt(e.target.value))}
              />
              {error && deliveryId < 0 ? (
                <label style={{ color: "#f44336" }}>
                  Delivery ID cannot be negative
                </label>
              ) : (
                ""
              )}
              <InputLabel id="stateSelect">
                State : {details["state"]}
              </InputLabel>
              <Select
                labelId="stateSelect"
                id="stateSelectThing"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <MenuItem value={"in warehouse"}>In warehouse</MenuItem>
                <MenuItem value={"being delivered"}>Being delivered</MenuItem>
                <MenuItem value={"delivered"}>Delivered</MenuItem>
              </Select>
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

export default Package;
