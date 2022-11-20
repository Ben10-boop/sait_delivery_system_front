import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeliveries } from "../../hooks/UseDeliveries";

const Deliveries = () => {
  const { getDeliveries, deleteDelivery } = useDeliveries();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetDeliveries = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setDeliveries(await getDeliveries());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDelivery = async (deliveryId) => {
    try {
      setIsLoading(true);
      await deleteDelivery(deliveryId);
      setValuesChanged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5">Delivery list</Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: 960,
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Courier ID</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.deliveryVehicleId}</TableCell>
                    <TableCell>{item.deliveryCourierId}</TableCell>
                    <TableCell>{item.route}</TableCell>
                    <TableCell>{item.deliveryDate}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/delivery/" + item.id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDeleteDelivery(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/addDelivery");
          }}
        >
          Add new delivery
        </Button>
      </Stack>
    </Box>
  );
};

export default Deliveries;
