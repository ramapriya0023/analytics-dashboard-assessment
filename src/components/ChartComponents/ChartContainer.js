import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import ChartHeader from "./ChartHeader";
import ChartContent from "./ChartContent";

const Container = styled(Paper)({
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "300px",
  height: "300px",
});

const ChartContainer = ({ chartData }) => {
  return (
    <Container>
      <ChartHeader />
      <ChartContent chart={chartData} />
    </Container>
  );
};

export default ChartContainer;
