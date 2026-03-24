const Message = require("../models/Message");

// GET CONVERSATIONS FOR A USER
exports.getUserConversations = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [{ senderId: currentUserId }, { receiverId: currentUserId }]
    })
      .populate("senderId", "name email profileImage")
      .populate("receiverId", "name email profileImage")
      .populate("itemId", "title images price isDonation")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MESSAGES FOR A USER (Either sender or receiver)
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, itemId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = new Message({
      senderId,
      receiverId,
      itemId,
      message
    });

    await newMessage.save();
    
    // Also, populate the newly saved message so that the UI can use the full details.
    await newMessage.populate([
      { path: "senderId", select: "name email profileImage" },
      { path: "receiverId", select: "name email profileImage" },
      { path: "itemId", select: "title images price isDonation" }
    ]);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
