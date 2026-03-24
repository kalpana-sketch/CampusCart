const Wishlist = require("../models/Wishlist");

// GET WISHLIST FOR A USER
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.find({ userId }).populate("itemId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    // Check if already in wishlist
    const exists = await Wishlist.findOne({ userId, itemId });
    if (exists) return res.status(400).json({ message: "Item already in wishlist" });

    const newItem = new Wishlist({ userId, itemId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE FROM WISHLIST
exports.removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.query; // Usually passed as query or body
    const userId = req.user.id;

    await Wishlist.findOneAndDelete({ userId, itemId: req.params.itemId || itemId });
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
