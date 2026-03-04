const express = require("express");
const Review = require("../models/Review");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { sellerId, rating, text } = req.body;

    if (req.user.id === sellerId) {
      return res.status(400).json({ message: "You cannot review yourself" });
    }

    const review = await Review.create({
      seller: sellerId,
      reviewer: req.user.id,
      rating,
      text
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:sellerId", async (req, res) => {
  const reviews = await Review.find({
    seller: req.params.sellerId
  }).populate("reviewer", "name");

  res.json(reviews);
});

module.exports = router;