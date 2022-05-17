const mongoose = require("mongoose");

const MutulFundDataSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
    ISIN: { type: String, required: true },
    netAssetValue: { type: Number, required: true },
    date: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Data = mongoose.model("data", MutulFundDataSchema)
module.exports = Data;
