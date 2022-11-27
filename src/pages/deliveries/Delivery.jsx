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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDeliveries } from "../../hooks/UseDeliveries";

const Delivery = () => {
  const { putDelivery, getDelivery } = useDeliveries();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [deliveryVehicleId, setDeliveryVehicleId] = useState(0);
  const [deliveryCourierId, setDeliveryCourierId] = useState(0);
  const [route, setRoute] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  let params = useParams();

  useEffect(() => {
    getDelivery(params.identifier).then((data) => setDetails(data));
    console.log(details);
  }, [params.identifier]);

  const handleEditDelivery = async (e) => {
    e.preventDefault();
    if ([deliveryCourierId < 0, deliveryVehicleId < 0].includes(true)) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      await putDelivery(
        params.identifier,
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
          <form onSubmit={handleEditDelivery}>
            <Stack spacing={2}>
              <Typography variant="h5">
                View, edit delivery {params.identifier}
              </Typography>
              <InputLabel id="delVehicleInput">
                Vehicle ID : {details["deliveryVehicleId"]}
              </InputLabel>
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
              <InputLabel id="courierIdInput">
                Courier ID : {details["deliveryCourierId"]}
              </InputLabel>
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
              <InputLabel id="routeInput">
                Delivery route : {details["route"]}
              </InputLabel>
              <TextField
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
              <InputLabel id="delDateInput">
                Delivery Date : {details["deliveryDate"]}
              </InputLabel>
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
                Submit Changes
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Delivery;
