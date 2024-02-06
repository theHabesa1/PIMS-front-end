import React from "react";
import { Box, Typography } from "@mui/material";
import notAuth from '../assets/403.jpg'


const ForbiddenPage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h1" component="h1" gutterBottom>
        403 - Not authorized
      </Typography>
      <img  src={notAuth} style={{ maxWidth: "40%", margin:'10px'}} alt="404 Image" />
    </Box>
  );
};

export default ForbiddenPage;