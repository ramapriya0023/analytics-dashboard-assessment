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

fs.createReadStream(evDataFilePath)
  .pipe(csv())
  .on("data", (row) => evData.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed.");
  })
  .on("error", (err) => {
    console.error("Error reading CSV file:", err);
  });

const getTopN = (data, field, n = 10) => {
  const counts = data.reduce((acc, row) => {
    acc[row[field]] = (acc[row[field]] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ [field.toLowerCase()]: key, count: value }));
};

router.get("/ev-makes", (req, res) => {
  const topMakes = getTopN(evData, "Make");
  res.json(topMakes);
});

router.get("/ev-types", (req, res) => {
  const types = evData.reduce((acc, row) => {
    acc[row["Electric Vehicle Type"]] =
      (acc[row["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});
  res.json(Object.entries(types).map(([type, count]) => ({ type, count })));
});

router.get("/ev-location-data", (req, res) => {
  const locationData = evData.reduce((acc, row) => {
    const location = row["City"] || row["County"];
    if (location) {
      acc[location] = (acc[location] || 0) + 1;
    }
    return acc;
  }, {});

  res.json(
    Object.entries(locationData).map(([location, count]) => ({
      location,
      count,
    }))
  );
});

router.get("/top-mileage-models", (req, res) => {
  const uniqueTopModels = [];
  const makesSet = new Set();

  const sortedModels = evData
    .filter((row) => row["Electric Range"] && !isNaN(row["Electric Range"]))
    .map((row) => ({
      make: row["Make"],
      model: row["Make"] + " " + row["Model"],
      mileage: parseFloat(row["Electric Range"]),
    }))
    .sort((a, b) => b.mileage - a.mileage);

  for (const model of sortedModels) {
    if (!makesSet.has(model.make)) {
      uniqueTopModels.push(model);
      makesSet.add(model.make);
    }
    if (uniqueTopModels.length === 5) break;
  }

  res.json(uniqueTopModels);
});

router.get("/ev-sales-frequency", (req, res) => {
  const manufacturers = ["TESLA", "CHEVROLET", "HYUNDAI"];

  const frequencyData = evData.reduce((acc, row) => {
    const make = row["Make"];
    const year = parseInt(row["Model Year"]);

    if (manufacturers.includes(make)) {
      if (!acc[make]) {
        acc[make] = {};
      }

      if (!acc[make][year]) {
        acc[make][year] = 0;
      }

      acc[make][year] += 1;
    }

    return acc;
  }, {});

  const formattedData = Object.entries(frequencyData).map(([make, years]) => ({
    make,
    frequencies: Object.entries(years).map(([year, count]) => ({
      year: parseInt(year),
      frequency: count,
    })),
  }));

  res.json(formattedData);
});

router.get("/cafv-eligibility", (req, res) => {
  const cityGroups = evData.reduce((acc, row) => {
    const city = row["City"];
    const eligibilityStatus =
      row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];

    if (!acc[city]) {
      acc[city] = {
        city: city,
        eligible: 0,
        eligibilityUnknown: 0,
        notEligible: 0,
      };
    }

    if (eligibilityStatus.includes("Eligible")) {
      acc[city].eligible += 1;
    } else if (eligibilityStatus.includes("unknown")) {
      acc[city].eligibilityUnknown += 1;
    } else if (eligibilityStatus.includes("Not eligible")) {
      acc[city].notEligible += 1;
    }

    return acc;
  }, {});

  const formattedData = Object.values(cityGroups);

  const specifiedCities = [
    "Seattle",
    "Vancouver",
    "Bellevue",
    "Sammamish",
    "Kirkland",
  ];
  const filteredData = formattedData.filter((cityGroup) =>
    specifiedCities.includes(cityGroup.city)
  );
  const response = [
    {
      label: "Eligible",
      data: filteredData.map((cityGroup) => cityGroup.eligible),
    },
    {
      label: "Not Eligible",
      data: filteredData.map((cityGroup) => cityGroup.notEligible),
    },
    {
      label: "Eligibility Unknown",
      data: filteredData.map((cityGroup) => cityGroup.eligibilityUnknown),
    },
  ];

  const xAxisLabels = filteredData.map((cityGroup) => cityGroup.city);

  res.json({ response, xAxisLabels });
});

module.exports = router;
