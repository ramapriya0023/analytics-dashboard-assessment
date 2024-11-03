import React from "react";
import { styled } from "@mui/material/styles";
import DashboardContainer from "./components/Dashboard/DashboardContainer";

const Container = styled("div")({
  margin: "50px",
});

const AnalyticsDashboard = () => {
  return (
    <Container>
      <DashboardContainer />
    </Container>
  );
};

export default AnalyticsDashboard;
