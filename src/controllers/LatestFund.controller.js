const express = require("express");

const router = express.Router();
const Data = require("../models/mutulfundData.model");
const Funds = require("../models/LatsetFund.model")

//get method for all collection
router.get("/", async (req, res) => {
  try {
    const data = await Data.find().lean().exec();
    // console.log('data:', data)
    let funds_list = []
    
    for(let i = 0; i < data.length; i++){
        for(let j = i+1; j< data.length;j++){
            if(data[i].code == data[j].code && data[i].date == "04-Apr-2022" && data[j].date == "11-Apr-2022"){
            let stdDiv_value = ((((data[j].netAssetValue -data[i].netAssetValue)/data[j].netAssetValue) * 100).toFixed(2) + "%")
            let latest_return = ((data[j].netAssetValue -data[i].netAssetValue)/data[j].netAssetValue).toFixed(6)
           let updated = await Funds.create({
                code: data[i].code,
                name: data[i].name,
                ISIN: data[i].ISIN,
                standardDiv: stdDiv_value,
                netAssetValue: data[j].netAssetValue,
                latest_return:latest_return,
            })
            funds_list.push(updated)
        }
        }
    }
    return res.status(201).send(funds_list);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

router.get("/funds", async (req, res) => {
  try {
    const data = await Data.find().lean().exec();
    // console.log('data:', data)
    let updated
    for(let i = 0; i < data.length; i++){
        for(let j = i+1; j< data.length;j++){
            if(data[i].code == data[j].code && data[i].date == "04-Apr-2022" && data[j].date == "11-Apr-2022"){
            let stdDiv_value = ((((data[j].netAssetValue -data[i].netAssetValue)/data[j].netAssetValue) * 100).toFixed(2) + "%")
            let latest_return = ((data[j].netAssetValue -data[i].netAssetValue)/data[j].netAssetValue).toFixed(6)
            updated = await Funds.create({
                code: data[i].code,
                name: data[i].name,
                ISIN: data[i].ISIN,
                standardDiv: stdDiv_value,
                netAssetValue: data[j].netAssetValue,
                latest_return:latest_return,
            })
        }
        }
    }
   let funds_list = await Funds.find().sort({standardDiv: -1}).limit(10)
    return res.status(200).send(funds_list);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

router.get("/latest_return", async (req, res) => {
    try {
      const data = await Funds.find().sort({latest_return: -1}).limit(10);
  
      return res.status(200).send(data);
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  });


module.exports = router;
