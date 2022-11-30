import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { Alert, Divider, Drawer } from "@mui/material";
import { useError } from "../context/UseError";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";

const drawerWidth = 240;

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { error } = useError();
  const { getUser } = useUser();
  const navigate = useNavigate();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  let links = [];
  const userRole =
    getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (!userRole) {
    links = [
      { key: "Login", value: "/login" },
      { key: "Register", value: "/register" },
    ];
  } else if (["Administrator", "Courier"].includes(userRole)) {
    links = [
      { key: "Packages", value: "/packages" },
      { key: "Vehicles", value: "/vehicles" },
      { key: "Deliveries", value: "/deliveries" },
      { key: "Logout", value: "/logout" },
    ];
  } else {
    links = [
      { key: "Find package", value: "/package/find" },
      { key: "Logout", value: "/logout" },
    ];
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <Stack>
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
      </Stack>
    </Box>
  );

  const container = document.body;

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
      {/* need color #1565c0 */}
      <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SDS
          </Typography>

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {links.map((link) => {
            return (
              <Button
                sx={{ display: { xs: "none", sm: "inline" } }}
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
        </Toolbar>
      </AppBar>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
