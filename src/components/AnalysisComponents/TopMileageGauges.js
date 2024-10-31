import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Gauge } from "@mui/x-charts/Gauge";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
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

const TopMileageGauges = ({ id, title }) => {
  const [topMileageModels, setTopMileageModels] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    <Container elevation={4}>
      <ChartContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          {topMileageModels.map((model, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Gauge
                width={150}
                height={150}
                value={model.mileage}
                valueMax={500}
                text={`${model.mileage} \r miles`}
              />
              <p>{model.make}</p>
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

export default TopMileageGauges;
