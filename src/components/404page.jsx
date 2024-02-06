import React from "react";
import { Box, Typography } from "@mui/material";
import notFoundLogo from '../assets/404.jpg'

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h1" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <img  src={notFoundLogo} style={{ maxWidth: "40%", margin:'10px'}} alt="404 Image" />
    </Box>
  );
};

export default NotFoundPage;
