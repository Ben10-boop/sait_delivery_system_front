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

const AddDelivery = () => {
  const { postDelivery } = useDeliveries();
  const [deliveryVehicleId, setDeliveryVehicleId] = useState(0);
  const [deliveryCourierId, setDeliveryCourierId] = useState(0);
  const [route, setRoute] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddDelivery = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await postDelivery(
        deliveryVehicleId,
        deliveryCourierId,
        route,
        deliveryDate
      );
      navigate("/deliveries");
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
          <form onSubmit={handleAddDelivery}>
            <Stack spacing={2}>
              <Typography variant="h5">Add new delivery</Typography>
              <InputLabel id="vehicleIdInput">Vehicle ID</InputLabel>
              <TextField
                type="number"
                value={deliveryVehicleId}
                onChange={(e) => setDeliveryVehicleId(parseInt(e.target.value))}
              />
              <InputLabel id="courierIdInput">Courier ID</InputLabel>
              <TextField
                type="number"
                value={deliveryCourierId}
                onChange={(e) => setDeliveryCourierId(parseInt(e.target.value))}
              />
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
