import React from "react";
import { Typography, Box } from "@mui/material";

const HeaderContainer = {
  textAlign: "center",
  marginBottom: "32px",
};

const Title = {
  fontWeight: "bold",
  color: "#1976d2",
};

const Subtitle = {
  color: "#555",
  marginTop: "8px",
};

const DashboardHeader = () => {
  return (
    <Box sx={HeaderContainer}>
      <Typography variant="h4" gutterBottom sx={Title}>
        Analytics Dashboard
      </Typography>
      <Typography variant="h6" sx={Subtitle}>
        Electric Vehicle Population Analysis
      </Typography>
    </Box>
  );
};

export default DashboardHeader;
