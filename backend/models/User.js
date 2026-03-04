const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    college: { type: String, required: true },
    password: { type: String, required: true },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", default: [] }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);