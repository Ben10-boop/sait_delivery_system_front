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
import { useDeliveries } from "../../hooks/UseDeliveries";
import { useError } from "../../context/UseError";

const AddDelivery = () => {
  const { setError: setHeaderError } = useError();
  const { postDelivery } = useDeliveries();
  const [deliveryVehicleId, setDeliveryVehicleId] = useState(0);
  const [deliveryCourierId, setDeliveryCourierId] = useState(0);
  const [route, setRoute] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const navigate = useNavigate();

  const handleAddDelivery = async (e) => {
    e.preventDefault();
    if ([deliveryCourierId < 0, deliveryVehicleId < 0].includes(true)) {
      setError(true);
      return;
    }
    if (
      [deliveryVehicleId, deliveryCourierId].includes(0) ||
      [route, deliveryDate].includes("")
    ) {
      setEmptyError(true);
      return;
    }
    try {
      setIsLoading(true);
      setHeaderError(null);
      await postDelivery(
        deliveryVehicleId,
        deliveryCourierId,
        route,
        deliveryDate
      );
      navigate("/deliveries");
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
          <form onSubmit={handleAddDelivery}>
            <Stack spacing={2}>
              <Typography variant="h5">Add new delivery</Typography>
              <InputLabel id="vehicleIdInput">Vehicle ID</InputLabel>
              <TextField
                type="number"
                value={deliveryVehicleId}
                onChange={(e) => setDeliveryVehicleId(parseInt(e.target.value))}
              />
              {error && deliveryVehicleId < 0 ? (
                <label style={{ color: "#f44336" }}>
                  Vehicle ID cannot be negative
                </label>
              ) : (
                ""
              )}
              <InputLabel id="courierIdInput">Courier ID</InputLabel>
              <TextField
                type="number"
                value={deliveryCourierId}
                onChange={(e) => setDeliveryCourierId(parseInt(e.target.value))}
              />
              {error && deliveryCourierId < 0 ? (
                <label style={{ color: "#f44336" }}>
                  Courier ID cannot be negative
                </label>
              ) : (
                ""
              )}
              <InputLabel id="routeInput">Route</InputLabel>
              <TextField
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
              <InputLabel id="dateInput">Delivery date</InputLabel>
              <TextField
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
              {emptyError ? (
                <label style={{ color: "#f44336" }}>
                  All fields are required
                </label>
              ) : (
                ""
              )}
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

export default AddDelivery;
