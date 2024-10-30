const express = require("express");
const evDataRoutes = require("./routes/evData");

const app = express();
const PORT = 6000;

// Use EV data routes
app.use("/api", evDataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
