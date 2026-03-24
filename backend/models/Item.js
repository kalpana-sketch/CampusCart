const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    condition: { type: String, default: "Good" },
    isDonation: { type: Boolean, default: false },
    images: [{ type: String }], // Array of Base64 or URLs
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);