const MenuItem = require("../models/MenuItem");

// GET ALL MENU ITEMS
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("GET MENU ERROR:", err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// ADD NEW MENU ITEM (Image URL only)
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !price)
      return res
        .status(400)
        .json({ success: false, error: "Name & Price are required" });

    const newItem = new MenuItem({
      name,
      description: description || "",
      price: Number(price),
      category: category || "General",
      image: image || "",
      available: true,
    });

    await newItem.save();

    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error("ADD MENU ERROR:", err);
    res.status(500).json({ success: false, error: "Failed to add menu item" });
  }
};

// UPDATE ITEM
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await MenuItem.findByIdAndUpdate(id, updates, { new: true });

    if (!updated)
      return res.status(404).json({ success: false, error: "Item not found" });

    res.status(200).json({ success: true, item: updated });
  } catch (err) {
    console.error("UPDATE MENU ERROR:", err);
    res.status(500).json({ success: false, error: "Failed to update item" });
  }
};

// DELETE ITEM
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MenuItem.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, error: "Item not found" });

    res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (err) {
    console.error("DELETE MENU ERROR:", err);
    res.status(500).json({ success: false, error: "Failed to delete item" });
  }
};
