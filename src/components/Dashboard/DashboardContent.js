import React from "react";
import { styled } from "@mui/material/styles";
import TopMileageGauges from "../AnalysisComponents/TopMileageGauges";
import SimplePieChart from "../AnalysisComponents/SimplePieChart";
import EVMakeDistributionChart from "../AnalysisComponents/EVMakeDistributionChart";
import SalesFrequencyLineChart from "../AnalysisComponents/SalesFrequencyLineChart";
import CAFVEligibilityChart from "../AnalysisComponents/CAFVEligibilityChart";
import HighlightsContainer from "../AnalysisComponents/HighlightsContainer";

const DashboardContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "30px",
  flexDirection: "column",
});

const DashboardContent = () => {
  return (
    <DashboardContainer>
      <HighlightsContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TopMileageGauges
          id="top-mileage-guage-chart"
          title="Top Electric Ranges of Models"
        />
        <SimplePieChart id="pie-chart" title="EV Types count" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <EVMakeDistributionChart
          id="bar-chart"
          title="EV production by Model"
        />
        <SalesFrequencyLineChart
          id="price-trends-line-chart"
          title="Sales Frequency by Year of Top Models"
        />
      </div>
      <CAFVEligibilityChart
        id="city-cafv-chart"
        title="CAFV Eligibility by City"
      />
    </DashboardContainer>
  );
};

export default DashboardContent;
