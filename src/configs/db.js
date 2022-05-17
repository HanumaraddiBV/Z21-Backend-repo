require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    process.env.databaseLINK,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected")
  );
};