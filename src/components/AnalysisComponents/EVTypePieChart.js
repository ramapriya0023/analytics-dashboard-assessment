import React, { useState, useEffect, useRef } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
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
  display: "flex",
  flexDirection: "column",
  borderRadius: "15px",
  maxWidth: "33%",
  width: "33%",
  height: "100%",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.0), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
});

const ChartContent = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",
});

const SimplePieChart = ({ title }) => {
  const [data, setData] = useState([]);
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
    <Container elevation={2} ref={contentRef}>
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
                width: "15px",
                height: "15px",
                backgroundColor: "skyblue",
              }}
            ></span>
            <div style={{ width: "170px", fontSize: "13px" }}>
              {`Battery Electric Vehicle (BEV)`}
            </div>
          </Legend>
          <Legend>
            <span
              style={{
                border: "1px solid pink",
                width: "15px",
                height: "15px",
                backgroundColor: "pink",
              }}
            ></span>
            <div
              style={{ width: "170px", fontSize: "13px" }}
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
          padding: "5px",
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
            The pie chart displays the distribution of EV types, with Battery
            Electric Vehicles (BEVs) significantly outnumbering Plug-in Hybrid
            Electric Vehicles (PHEVs) (39,461 vs. 10,539). This suggests a
            strong consumer preference for fully electric vehicles over hybrids,
            possibly due to advances in battery technology and the growing
            availability of charging infrastructure.
          </Typography>
        </CardContent>
      </Collapse>
    </Container>
  );
};

export default SimplePieChart;
