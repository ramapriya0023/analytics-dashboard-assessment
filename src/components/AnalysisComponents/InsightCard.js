import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const InsightCard = ({
  title,
  number,
  description,
  backgroundColor,
  numberColor,
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        maxWidth: 250,
        maxHeight: 220,
        margin: "10px",
        borderRadius: 3,
        backgroundColor: backgroundColor || "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.0), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          {title}
        </Typography>
        <Box mt={2} mb={1}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", color: numberColor || "#424242" }}
          >
            {number}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
