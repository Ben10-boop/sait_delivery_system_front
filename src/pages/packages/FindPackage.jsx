/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useError } from "../../context/UseError";
import { usePackages } from "../../hooks/UsePackages";

const FindPackage = () => {
  const { setError: setHeaderError } = useError();
  const { getPackage } = usePackages();
  const [id, setId] = useState(0);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     if (id !== 0) {
  //       getPackage(id).then((data) => setDetails(data));
  //     }
  //   }, [id]);

  const handleFindItem = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setHeaderError(null);
      getPackage(id).then((data) => setDetails(data));
    } catch (err) {
      console.log(err);
      setHeaderError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <InputLabel id="idInput">Enter your package ID</InputLabel>
      <TextField
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />
      <LoadingButton
        sx={{
          padding: "16px",
          marginLeft: "10px",
        }}
        variant="contained"
        loading={isLoading}
        onClick={handleFindItem}
      >
        Find
      </LoadingButton>
      <Paper
        elevation={6}
        sx={{
          marginTop: "15px",
        }}
      >
        <Box
          sx={{
            padding: "24px",
          }}
        >
          <Typography variant="h5">Package information</Typography>
          <List>
            <ListItem>
              <ListItemText>Id : {details["id"] ?? ""}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Size : {details["size"] ?? ""}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Weight : {details["weight"] ?? ""}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Address : {details["address"] ?? ""}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Delivery ID : {details["assignedToDeliveryId"] ?? ""}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>State : {details["state"] ?? ""}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default FindPackage;
