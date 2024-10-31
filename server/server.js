const express = require("express");
const evDataRoutes = require("./routes/evData");

const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());

app.use("/api", evDataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
