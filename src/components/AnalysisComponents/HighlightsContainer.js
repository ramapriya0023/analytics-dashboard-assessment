import React from "react";
import { Box } from "@mui/material";
import InsightCard from "./InsightCard";

const HighlightsContainer = () => {
  const insights = [
    {
      title: "Total Electric Vehicles",
      number: "28,735",
      description: "EVs currently on the road.",
    },
    {
      title: "Fastest Growing Make",
      number: "Tesla",
      description: "With the highest registration growth.",
    },
    {
      title: "Top EV Model",
      number: "Model Y",
      description: "Most popular model by registration.",
    },
    {
      title: "Popular Fuel Type",
      number: "98%",
      description: "EVs are primarily battery electric.",
    },
    {
      title: "Brand Diversity",
      number: "12",
      description: "Unique brands contributing to the EV market share.",
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
