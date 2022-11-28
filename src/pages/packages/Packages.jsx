import React, { useState, useEffect } from "react";
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
import { useUser } from "../../hooks/UseUser";
import { useError } from "../../context/UseError";

const Packages = () => {
  const { setError: setHeaderError } = useError();
  const { getUser } = useUser();
  const { getPackages, deletePackage } = usePackages();
  const { getVehiclePackages } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [valuesChanged, setValuesChanged] = useState(true);
  const [vehicleId, setVehicleId] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const userRole =
    getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

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
      await deletePackage(packageId);
      setValuesChanged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterPackages = async (vehicleId) => {
    if (vehicleId < 0) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      setHeaderError(null);
      setPackages(await getVehiclePackages(vehicleId));
    } catch (err) {
      console.log(err);
      setHeaderError(err.response.data);
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
      <Stack
        spacing={2}
        sx={{
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h5">Package list</Typography>
        <InputLabel id="idInput">Filter by vehicle ID</InputLabel>
        <TextField
          type="number"
          value={vehicleId}
          onChange={(e) => setVehicleId(parseInt(e.target.value))}
        />
        {error && vehicleId < 0 ? (
          <label style={{ color: "#f44336" }}>
            Vehicle ID cannot be negative
          </label>
        ) : (
          ""
        )}
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
            overflowX: "auto",
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
                      {userRole === "Administrator" ? (
                        <Button
                          onClick={() => {
                            handleDeletePackage(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {userRole === "Administrator" ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/addPackage");
            }}
          >
            Add new package
          </Button>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Packages;
