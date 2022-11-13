import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { getUser } = useUser();
  const navigate = useNavigate();

  var links = [];
  if (
    getUser()[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] === "Administrator"
  ) {
    links = [{ key: "Packages", value: "/Packages" }];
  }
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SDS
          </Typography>
          {links.map((link) => {
            return (
              <Button
                key={link.key}
                onClick={() => {
                  navigate(link.value);
                }}
                color="inherit"
              >
                {link.key}
              </Button>
            );
          })}
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
