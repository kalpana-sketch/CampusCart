const express = require("express");
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlistController");
const auth = require("../middleware/authMiddleware");

router.get("/:userId", auth, getWishlist);
router.post("/add", auth, addToWishlist);
router.delete("/remove/:itemId", auth, removeFromWishlist);

module.exports = router;
