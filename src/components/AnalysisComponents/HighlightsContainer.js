import React from "react";
import { Box } from "@mui/material";
import InsightCard from "./InsightCard";

const HighlightsContainer = () => {
  const insights = [
    {
      title: "Total Electric Vehicles",
      number: "28,735",
      description: "Driving the future—counting every EV on the road!",
    },
    {
      title: "Fastest Growing Make",
      number: "Tesla",
      description: "Leading the charge in popularity and growth!",
    },
    {
      title: "EV Average Mileage",
      number: "300 miles",
      description: "Go the distance—average range per charge!",
    },
    {
      title: "YoY Growth in US",
      number: "+ 57%",
      description:
        "Charging ahead—EV adoption surges with a year-over-year increase!",
    },
    {
      title: "Brand Diversity",
      number: "12",
      description: "A vibrant mix of brands shaping the EV market!",
    },
  ];

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {insights.map((insight, index) => (
        <InsightCard
          key={index}
          title={insight.title}
          number={insight.number}
          description={insight.description}
        />
      ))}
    </Box>
  );
};

export default HighlightsContainer;
