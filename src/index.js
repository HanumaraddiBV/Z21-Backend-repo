const express = require("express");

const mutulFundDataController = require("./controllers/mutulFund.controller");
const app = express();
app.use(express.json());




app.use("/datas", mutulFundDataController);

module.exports = app;
