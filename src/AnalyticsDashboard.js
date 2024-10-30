import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import DashboardContainer from "./components/Dashboard/DashboardContainer";

const Container = styled("div")({
  padding: "20px",
});

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <Container>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <DashboardContainer />
    </Container>
  );
};

export default AnalyticsDashboard;
