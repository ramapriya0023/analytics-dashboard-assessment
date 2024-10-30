const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const evDataFilePath = path.join(
  __dirname,
  "../data/Electric_Vehicle_Population_Data.csv"
);

const evData = [];

// Load CSV data into memory
fs.createReadStream(evDataFilePath)
  .pipe(csv())
  .on("data", (row) => evData.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed.");
  })
  .on("error", (err) => {
    console.error("Error reading CSV file:", err);
  });

// Helper function to get top N items
const getTopN = (data, field, n = 10) => {
  const counts = data.reduce((acc, row) => {
    acc[row[field]] = (acc[row[field]] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ [field]: key, count: value }));
};

// 1. Top 10 Electric Vehicle Makes
router.get("/ev-makes", (req, res) => {
  const topMakes = getTopN(evData, "Make");
  res.json(topMakes);
});

// 2. Electric Vehicle Types Distribution
router.get("/ev-types", (req, res) => {
  const types = evData.reduce((acc, row) => {
    acc[row["Electric Vehicle Type"]] =
      (acc[row["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});
  res.json(Object.entries(types).map(([type, count]) => ({ type, count })));
});

// 3. Electric Range by Model Year
router.get("/electric-range-by-year", (req, res) => {
  const rangeByYear = evData.reduce((acc, row) => {
    const year = row["Model Year"];
    const range = parseInt(row["Electric Range"], 10) || 0;
    if (!acc[year]) acc[year] = [];
    acc[year].push(range);
    return acc;
  }, {});
  res.json(rangeByYear);
});

// 4. CAFV Eligibility Status
router.get("/cafv-eligibility", (req, res) => {
  const eligibility = evData.reduce((acc, row) => {
    acc[row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] =
      (acc[row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]] || 0) + 1;
    return acc;
  }, {});
  res.json(
    Object.entries(eligibility).map(([status, count]) => ({ status, count }))
  );
});

// 5. Electric Range vs. Base MSRP
router.get("/range-vs-msrp", (req, res) => {
  const rangeVsMsrp = evData.map((row) => ({
    msrp: parseInt(row["Base MSRP"], 10) || 0,
    range: parseInt(row["Electric Range"], 10) || 0,
    type: row["Electric Vehicle Type"],
  }));
  res.json(rangeVsMsrp);
});

// 6. Top 10 Legislative Districts by EV Count
router.get("/legislative-districts", (req, res) => {
  const topDistricts = getTopN(evData, "Legislative District");
  res.json(topDistricts);
});

// 7. Electric Vehicle Count by Year and Make
router.get("/ev-count-by-year-make", (req, res) => {
  const countByYearMake = evData.reduce((acc, row) => {
    const year = row["Model Year"];
    const make = row["Make"];
    if (!acc[year]) acc[year] = {};
    acc[year][make] = (acc[year][make] || 0) + 1;
    return acc;
  }, {});
  res.json(countByYearMake);
});

module.exports = router;
