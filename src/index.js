const express = require("express");

const mutulFundDataController = require("./controllers/mutulFund.controller");
const LatestFundController = require("./controllers/LatestFund.controller")
const app = express();
app.use(express.json());




app.use("/datas", mutulFundDataController);
app.use("/latests", LatestFundController);

module.exports = app;
