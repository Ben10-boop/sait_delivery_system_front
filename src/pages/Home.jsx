import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Box sx={{ height: "70vh" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
        >
          Welcome to Saitynai Delivery System!
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
