import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
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
  height: "100%",
});

const ChartContent = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const SalesFrequencyLineChart = ({ id, title }) => {
  const [chartData, setChartData] = useState(null);
  const yearFormatter = (date) => date.toString();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/ev-sales-frequency")
      .then((response) => response.json())
      .then((data) => {
        const allYears = Array.from(
          new Set(
            data.flatMap((manufacturerData) =>
              manufacturerData.frequencies.map((entry) => entry.year)
            )
          )
        ).sort((a, b) => a - b);

        const seriesData = data.map((manufacturerData) => ({
          label: manufacturerData.make,
          data: allYears.map(
            (year) =>
              manufacturerData.frequencies.find((entry) => entry.year === year)
                ?.frequency || null
          ),
          showMark: false,
        }));

        setChartData({
          series: seriesData,
          yAxis: [
            {
              label: "Count",
              labelStyle: {
                fontSize: "15px",
              },
            },
          ],
          xAxis: [
            {
              data: allYears,
              scaleType: "linear",
              valueFormatter: yearFormatter,
              label: "Year",
              labelStyle: {
                fontSize: "15px",
              },
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container elevation={4}>
      <ChartContent>
        {chartData ? (
          <LineChart
            {...chartData}
            width={600}
            height={400}
            series={chartData.series}
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

export default SalesFrequencyLineChart;
