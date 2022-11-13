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
} from "@mui/material";
import { usePackages } from "../hooks/UsePackages";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const { getPackages } = usePackages();
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasFetched.current) {
      handleGetPackages();
      hasFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  //console.log("i'm before handleGetPackages");
  //console.log("i'm after handleGetPackages");
  //console.log(packages);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2}>
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          maxWidth="xs"
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
