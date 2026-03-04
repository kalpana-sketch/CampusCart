const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    image: { type: String }, // Base64 or URL
    category: { type: String, required: true },
    condition: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["available", "sold"], default: "available" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);