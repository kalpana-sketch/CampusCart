const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);