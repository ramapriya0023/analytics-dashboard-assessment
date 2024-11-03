import { useState, useEffect, useRef } from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
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

const EVInsightsScatterPlot = ({ title }) => {
  const [chartData, setChartData] = useState([]);
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
    fetch("http://localhost:8000/api/ev-msrp-insights")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container elevation={2} ref={contentRef}>
      <ChartContent>
        {chartData.length > 0 ? (
          <ScatterChart
            series={chartData}
            width={620}
            height={350}
            xAxis={[
              {
                label: "City",
                labelStyle: {
                  fontSize: "15px",
                },
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
          />
        ) : (
          <div>Loading...</div>
        )}
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
            Electric vehicles are available in a wide price range, from
            affordable options to luxury models. There's a significant
            difference in the range offered by different EV models. Brands like
            Kia and MINI offer more affordable, shorter-range EVs, while Tesla
            and Porsche focus on high-performance, long-range models.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default EVInsightsScatterPlot;
