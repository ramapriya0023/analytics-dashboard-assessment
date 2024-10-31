import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const InsightCard = ({ title, number, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        maxHeight: 200,
        padding: 2,
        margin: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          {title}
        </Typography>
        <Box mt={2} mb={1}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", color: "#424242" }}
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
