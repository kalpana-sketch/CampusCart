const Item = require("../models/Item");

// GET ALL ITEMS
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("sellerId", "name email profileImage");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE ITEM
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("sellerId", "name email profileImage");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, description, price, category, images, condition, isDonation } = req.body;
    const newItem = new Item({
      title,
      description,
      price: isDonation ? 0 : price,
      category,
      images,
      condition,
      isDonation,
      sellerId: req.user.id
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Check ownership
    if (item.sellerId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description, price, category, images, condition, isDonation } = req.body;
    const updatedData = {};
    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (price !== undefined) updatedData.price = isDonation ? 0 : price;
    if (category !== undefined) updatedData.category = category;
    if (images !== undefined) updatedData.images = images;
    if (condition !== undefined) updatedData.condition = condition;
    if (isDonation !== undefined) updatedData.isDonation = isDonation;

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.sellerId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER ITEMS
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ sellerId: req.params.userId }).populate("sellerId", "name email profileImage");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
