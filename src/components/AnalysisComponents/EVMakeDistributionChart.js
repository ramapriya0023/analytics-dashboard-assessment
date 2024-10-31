import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  Button,
  Collapse,
} from "@mui/material";

const Container = styled(Card)({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "15px",
  maxWidth: "45%",
  width: "45%",
  //width: "940px",
  height: "100%",
});

const ChartContent = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const EVMakeDistributionChart = ({ id, title }) => {
  const [xLabels, setXLabels] = useState([]);
  const [evCounts, setEvCounts] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ev-makes");
        const result = await response.json();

        const labels = result.map((item) =>
          item.make === "CHEVROLET"
            ? "CHEVY"
            : item.make === "VOLKSWAGEN"
            ? "VW"
            : item.make
        );
        const counts = result.map((item) => item.count);

        setXLabels(labels);
        setEvCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container elevation={4}>
      <ChartContent>
        <BarChart
          width={600}
          height={400}
          series={[{ data: evCounts, label: "EV Count", id: "evCountId" }]}
          yAxis={[
            {
              label: "Count",
            },
          ]}
          xAxis={[
            {
              label: "Model",
              data: xLabels,
              scaleType: "band",
              tickLabelStyle: {
                fontSize: "10px",
              },
            },
          ]}
        />
      </ChartContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Button
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          Show more
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default EVMakeDistributionChart;
