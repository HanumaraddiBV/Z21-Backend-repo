const mongoose = require("mongoose");

const LatestFundDataSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
    ISIN: { type: String, required: true },
    standardDiv: { type: String, required: true },
    netAssetValue: { type: Number, required: true },
    latest_return: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Data = mongoose.model("latest", LatestFundDataSchema);
module.exports = Data;
