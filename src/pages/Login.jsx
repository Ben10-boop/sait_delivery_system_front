import React, { useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
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

const Login = () => {
  const { login } = useAuth();
  const { getUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(email, password);
      console.log(
        getUser()[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      navigate("/packages");
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
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <Typography variant="h3">Login</Typography>
              <InputLabel id="emailItem">Email</InputLabel>
              <TextField
                // labelId="emailItem"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputLabel id="passItem">Password</InputLabel>
              <TextField
                // labelId="passItem"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoadingButton
                variant="contained"
                loading={isLoading}
                type="submit"
              >
                Log in
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
