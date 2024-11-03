import React, { useEffect, useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Collapse,
} from "@mui/material";

const Container = styled(Card)({
  display: "flex",
  flexDirection: "column",
  borderRadius: "15px",
  maxWidth: "63%",
  width: "63%",
  height: "100%",
  padding: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.0), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
});

const ChartContent = styled("div")({
  padding: "0px 10px 0px 10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

const TopMileageGauges = ({ id, title }) => {
  const [topMileageModels, setTopMileageModels] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
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
    const fetchTopMileageData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/top-mileage-models"
        );
        const data = await response.json();

        setTopMileageModels(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching top mileage data:", error);
      }
    };

    fetchTopMileageData();
  }, []);

  return (
    <Container elevation={2} ref={contentRef}>
      <ChartContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          {topMileageModels.map((model, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ position: "relative", top: "30px" }}
              >{`${model.mileage} miles`}</Typography>
              <GaugeContainer
                width={140}
                height={160}
                startAngle={-110}
                endAngle={110}
                value={model.mileage}
                valueMax={500}
              >
                <GaugeReferenceArc />
                <GaugeValueArc style={{ fill: "#000" }} />
                <GaugePointer />
              </GaugeContainer>
              <Typography
                variant="body1"
                sx={{ position: "relative", bottom: "20px" }}
              >
                {model.make}
              </Typography>
            </div>
          ))}
        </Stack>
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
            This chart compares the driving range of various EV models, showing
            Tesla at the top with a range of 337 miles. Chevrolet, Hyundai, Kia,
            and Jaguar follow, with ranges between 234 and 259 miles. This
            highlights Tesla's leadership in battery range technology, offering
            a significant advantage for long-distance driving.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default TopMileageGauges;
