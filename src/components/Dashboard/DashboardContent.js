import React from "react";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import SimpleBarChart from "../AnalysisComponents/SimpleBarChart";
import SimplePieChart from "../AnalysisComponents/SimplePieChart";
import ChartContainer from "../ChartComponents/ChartContainer";

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "10px",
});

const charts = [
  { id: "bar-chart", component: <SimpleBarChart /> },
  { id: "pie-chart", component: <SimplePieChart /> },
  {
    id: "additional-chart-1",
    component: (
      <Typography variant="h6">Additional Chart 1 Placeholder</Typography>
    ),
  },
  {
    id: "additional-chart-2",
    component: (
      <Typography variant="h6">Additional Chart 2 Placeholder</Typography>
    ),
  },
];

const DashboardContent = () => {
  return (
    <Container>
      {charts.map((chart) => (
        <ChartContainer chartData={chart} />
      ))}
    </Container>
  );
};

export default DashboardContent;
