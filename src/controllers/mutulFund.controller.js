const express = require("express");

const router = express.Router();
const Data = require("../models/mutulfundData.model");
/////////
//get method for all collection
router.get("/", async (req, res) => {
  try {
    const data_list = await Data.find().lean().exec();
    console.log("data_list:", data_list);
    return res.status(200).send(data_list);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

// get method for top 10 documents based on netAssetValue
const sort = { netAssetValue: -1 };
router.get("/top_ten", async (req, res) => {
  try {
    const data = await Data.find().sort(sort).limit(10);

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

// get method for top 10 documents based on netAssetValue and date on last 7 days
router.get("/last_7days", async (req, res) => {
  try {
    const data = await Data.find()
      .sort({ date: 1, code: -1, netAssetValue: 1 })
      .limit(10);

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

//post method for adding new data to the database
router.post("/list", async (req, res) => {
  try {
    const data = await Data.create(req.body);

    return res.status(201).send(data);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = router;
