import React from "react";
import { styled } from "@mui/material/styles";
import TopMileageGauges from "../AnalysisComponents/TopMileageGauges";
import SimplePieChart from "../AnalysisComponents/EVTypePieChart";
import EVMakeDistributionChart from "../AnalysisComponents/EVMakeDistributionChart";
import SalesFrequencyLineChart from "../AnalysisComponents/SalesFrequencyLineChart";
import CAFVEligibilityChart from "../AnalysisComponents/CAFVEligibilityChart";
import HighlightsContainer from "../AnalysisComponents/HighlightsContainer";
import EVInsightsScatterPlot from "../AnalysisComponents/InsightsScatterPlot";

const DashboardContainer = styled("div")({
  display: "flex",
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CAFVEligibilityChart
          id="city-cafv-chart"
          title="CAFV Eligibility by City"
        />
        <EVInsightsScatterPlot
          id="ev-insights-scatterplot"
          title={"Price and Range Dynamics"}
        />
      </div>
    </DashboardContainer>
  );
};

export default DashboardContent;
