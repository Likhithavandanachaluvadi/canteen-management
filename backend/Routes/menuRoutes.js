const express = require("express");
const router = express.Router();

const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menuController");

const { protect, isAdmin } = require("../middleware/auth");

// Public – Students can view menu
router.get("/", getMenuItems);

// Admin – Add menu item
router.post("/", protect, isAdmin, addMenuItem);

// Admin – Edit item
router.put("/:id", protect, isAdmin, updateMenuItem);

// Admin – Delete item
router.delete("/:id", protect, isAdmin, deleteMenuItem);

module.exports = router;
