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
import { useVehicles } from "../../hooks/UseVehicles";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const { getVehicles, deleteVehicle } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetVehicles = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      setVehicles(await getVehicles());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      setIsLoading(true);
      await deleteVehicle(vehicleId);
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
        <Typography variant="h5">Vehicle list</Typography>
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
                <TableCell>Registration numbers</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Maximum payload</TableCell>
                <TableCell>Driver ID</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.regNumbers}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.maxPayload}</TableCell>
                    <TableCell>{item.driverId}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/vehicle/" + item.id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDeleteVehicle(item.id);
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
            navigate("/addVehicle");
          }}
        >
          Add new vehicle
        </Button>
      </Stack>
    </Box>
  );
};

export default Vehicles;
