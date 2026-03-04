const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/auth");
const router = express.Router();

// CREATE ITEM
router.post("/", auth, async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      seller: req.user.id
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ status: "available" })
      .populate("seller", "name college")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE ITEM
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("seller", "name college");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ITEM
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this item" });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK AS SOLD
router.put("/:id/sold", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    item.status = "sold";
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;