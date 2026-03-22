const express = require("express");
const router = express.Router();
const { getMessages, sendMessage, getUserConversations } = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

router.get("/conversations", auth, getUserConversations);
router.get("/:userId", auth, getMessages);
router.post("/send", auth, sendMessage);

module.exports = router;
