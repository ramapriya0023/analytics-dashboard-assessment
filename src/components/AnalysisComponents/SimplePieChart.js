import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  CardActions,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";

const LegendContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Legend = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
});

const Container = styled(Card)({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "15px",
  maxWidth: "30%",
  width: "30%",
  height: "100%",
});

const ChartContent = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",
});

const SimplePieChart = ({ id, title }) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ev-types");
        const result = await response.json();

        const formattedData = result.map((item, index) => ({
          id: index,
          value: item.count,
          label: item.type,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pieParams = {
    margin: { right: 5 },
  };
  return (
    <Container elevation={4}>
      <ChartContent>
        <PieChart
          colors={["skyblue", "pink"]}
          series={[
            {
              data: data,
              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
              arcLabel: (params) => params.formattedValue,
            },
          ]}
          width={200}
          height={200}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
          {...pieParams}
          slotProps={{
            legend: {
              position: { vertical: "middle", horizontal: "right" },
              padding: 0,
              hidden: true,
            },
          }}
        />
        <LegendContainer>
          <Legend>
            <span
              style={{
                border: "1px solid skyblue",
                width: "20px",
                height: "20px",
                backgroundColor: "skyblue",
              }}
            ></span>
            <div style={{ width: "170px" }}>
              {" "}
              {`Battery Electric Vehicle (BEV)`}
            </div>
          </Legend>
          <Legend>
            <span
              style={{
                border: "1px solid pink",
                width: "20px",
                height: "20px",
                backgroundColor: "pink",
              }}
            ></span>
            <div
              style={{ width: "170px" }}
            >{`Plug-in Hybrid Electric Vehicle (PHEV)`}</div>
          </Legend>
        </LegendContainer>
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

export default SimplePieChart;
