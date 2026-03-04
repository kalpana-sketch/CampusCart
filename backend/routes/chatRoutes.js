const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

// START CHAT
router.post("/", auth, async (req, res) => {
  try {
    const { itemId, sellerId } = req.body;

    if (req.user.id === sellerId) {
      return res.status(400).json({ message: "You cannot chat with yourself" });
    }

    const myId = new mongoose.Types.ObjectId(req.user.id);
    const theirId = new mongoose.Types.ObjectId(sellerId);

    let chat = await Chat.findOne({
      item: itemId,
      participants: { $all: [myId, theirId] }
    });

    if (!chat) {
      chat = new Chat({
        item: itemId,
        participants: [myId, theirId],
        messages: []
      });

      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEND MESSAGE
router.post("/:chatId/message", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({
      sender: req.user.id,
      text,
      createdAt: new Date()
    });

    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOAD CHATS
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user.id
    })
      .populate("item")
      .populate("participants", "name email college");

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE CHAT
router.get("/:chatId", auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("item")
      .populate("participants", "name email college");
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
