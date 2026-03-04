const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// TOGGLE WATCHLIST
router.post("/watchlist/:itemId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const itemId = req.params.itemId;
    if (!user.watchlist) user.watchlist = [];

    const index = user.watchlist.findIndex(id => id.toString() === itemId);

    if (index === -1) {
      user.watchlist.push(itemId);
      await user.save();
      res.json({ message: "Added to watchlist", saved: true });
    } else {
      user.watchlist.splice(index, 1);
      await user.save();
      res.json({ message: "Removed from watchlist", saved: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET WATCHLIST
router.get("/watchlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out items that might have been deleted but are still in the reference list
    if (!user.watchlist) {
      return res.json([]);
    }

    const validItems = user.watchlist.filter(item => item !== null);
    res.json(validItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
