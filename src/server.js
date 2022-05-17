const app = require("./index");
require("dotenv").config();
const server = require("./configs/db");

// process.env.PORT
app.listen(process.env.PORT || 5000, async (req, res) => {
  try {
    await server();
    console.log("Default port is active on PORT");
  } catch (e) {
    console.log("e:", e);
  }
});
