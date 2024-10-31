import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
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
  maxWidth: "60%",
  width: "60%",
  //width: "940px",
  height: "100%",
});

const ChartContent = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const CAFVEligibilityChart = ({ id, title }) => {
  const [series, setSeries] = useState([]);
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const highlightScope = {
    highlight: "series",
    fade: "global",
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/cafv-eligibility"
        ); // Adjust the URL as necessary
        const data = await response.json();

        setSeries(data.response.map((s) => ({ ...s, highlightScope })));
        setXAxisLabels(data.xAxisLabels);
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
          height={400}
          width={700}
          series={series}
          skipAnimation={false} // You can control the animation here
          yAxis={[
            {
              label: "Count",
              labelStyle: {
                fontSize: "15px",
              },
            },
          ]}
          xAxis={[
            {
              label: "City",
              data: xAxisLabels,
              scaleType: "band",
              labelStyle: {
                fontSize: "15px",
              },
              tickLabelStyle: {
                fontSize: "15px",
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

export default CAFVEligibilityChart;
