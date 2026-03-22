const express = require("express");
const router = express.Router();
const { getItems, getItemById, getUserItems, createItem, updateItem, deleteItem } = require("../controllers/itemController");
const auth = require("../middleware/authMiddleware");

router.get("/", getItems);
router.get("/:id", getItemById);
router.get("/user/:userId", getUserItems);
router.post("/", auth, createItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;