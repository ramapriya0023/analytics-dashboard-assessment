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

const EVMakeDistributionChart = ({ id, title }) => {
  const [xLabels, setXLabels] = useState([]);
  const [evCounts, setEvCounts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

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
    <Container elevation={2} ref={contentRef}>
      <ChartContent>
        <BarChart
          width={620}
          height={350}
          series={[
            {
              data: evCounts,
              label: "EV Count",
              id: "evCountId",
              color: "#13aed6",
            },
          ]}
          xAxis={[
            {
              label: "Model",
              data: xLabels,
              scaleType: "band",
              tickLabelStyle: {
                fontSize: "11px",
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
            This bar chart shows production volumes by model, with Tesla leading
            by a wide margin at over 25,000 units. Other manufacturers,
            including Nissan, Chevrolet, BMW, and Ford, contribute smaller
            shares. Tesla’s dominant production reflects its focus on scaling EV
            manufacturing to meet growing demand.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default EVMakeDistributionChart;
