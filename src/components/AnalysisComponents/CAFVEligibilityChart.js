import { useState, useEffect, useRef } from "react";
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
  maxWidth: "47%",
  width: "47%",
  height: "100%",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.0), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
});

const ChartContent = styled("div")({
  padding: "0px 10px 0px 10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const CAFVEligibilityChart = ({ title }) => {
  const [series, setSeries] = useState([]);
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const contentRef = useRef(null);
  const highlightScope = {
    highlight: "series",
    fade: "global",
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prev) => {
      if (!prev) {
        setTimeout(() => {
          contentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/cafv-eligibility"
        );
        const data = await response.json();
        const colors = ["#55d491", "#13aed6", "#4FC3F7", "#FF8A65", "#BA68C8"];
        setSeries(
          data.response.map((s, index) => ({
            ...s,
            highlightScope,
            color: colors[index % colors.length],
          }))
        );
        setXAxisLabels(data.xAxisLabels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container elevation={2} ref={contentRef}>
      <ChartContent>
        <BarChart
          width={620}
          height={350}
          series={series}
          skipAnimation={false}
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
          padding: "0px",
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
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            This bar chart provides a breakdown of Clean Alternative Fuel
            Vehicle (CAEV) incentive eligibility across different cities.
            Seattle has the highest number of eligible vehicles, followed by
            Vancouver and Bellevue. This indicates strong local policies and
            incentives in certain areas that are driving EV adoption, with some
            cities showing higher support than others.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default CAFVEligibilityChart;
