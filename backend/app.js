const express = require("express");
const aggregateRoutes = require("./src/routes/aggregate.route");

const app = express();
const cors = require("cors");
app.use(cors());


app.use(express.json());

app.use("/api/v1", aggregateRoutes);

module.exports = app;
