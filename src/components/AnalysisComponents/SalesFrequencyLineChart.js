import { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
} from "@mui/material";
import { apiUrl } from "../../utils/apiURL";

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

const SalesFrequencyLineChart = ({ id, title }) => {
  const [chartData, setChartData] = useState(null);
  const yearFormatter = (date) => date.toString();
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
    fetch(`${apiUrl}/ev-sales-frequency`)
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
    <Container elevation={2} ref={contentRef}>
      <ChartContent>
        {chartData ? (
          <LineChart
            {...chartData}
            width={620}
            height={350}
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
            The line chart illustrates the trend in sales frequency over time,
            with a notable increase around 2018, especially for Tesla. This
            upward trend aligns with the broader growth in EV adoption, with
            Tesla experiencing the most rapid growth, likely driven by expanding
            product lines and enhanced consumer interest in EVs.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default SalesFrequencyLineChart;
