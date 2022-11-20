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
  TextField,
  InputLabel,
} from "@mui/material";
import { usePackages } from "../../hooks/UsePackages";
import { useNavigate } from "react-router-dom";
import { useVehicles } from "../../hooks/UseVehicles";
import { LoadingButton } from "@mui/lab";

const Packages = () => {
  const { getPackages, deletePackage } = usePackages();
  const { getVehiclePackages } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [vehicleId, setVehicleId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setValuesChanged(false);
    handleGetPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesChanged]);

  const handleGetPackages = async () => {
    //e.preventDefault();
    try {
      setIsLoading(true);
      console.log("i'm in handlePackages before getPackages");
      setPackages(await getPackages());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      setIsLoading(true);
      await getVehiclePackages(packageId);
      setValuesChanged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterPackages = async (vehicleId) => {
    try {
      setIsLoading(true);
      setPackages(await getVehiclePackages(vehicleId));
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
        <Typography variant="h5">Package list</Typography>
        <InputLabel id="idInput">Filter by vehicle ID</InputLabel>
        <TextField
          type="number"
          value={vehicleId}
          onChange={(e) => setVehicleId(parseInt(e.target.value))}
        />
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={() => {
            handleFilterPackages(vehicleId);
          }}
        >
          Filter
        </LoadingButton>
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
                <TableCell>Size</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Delivery Address</TableCell>
                <TableCell>Package State</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate("/package/" + item.id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDeletePackage(item.id);
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
            navigate("/addPackage");
          }}
        >
          Add new package
        </Button>
      </Stack>
    </Box>
  );
};

export default Packages;
