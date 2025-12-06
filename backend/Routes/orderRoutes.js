const express = require("express");
const router = express.Router();

const {
  createOrder,
  getStudentOrders,
  getAllOrders,
  updateStatus,
  profitSummary,
  dailyProfit,
} = require("../Controllers/orderController");

const { protect, isAdmin } = require("../middleware/auth");

// Student Routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getStudentOrders);

// Admin Routes
router.get("/all", protect, isAdmin, getAllOrders);
router.patch("/:id/status", protect, isAdmin, updateStatus);

// Profit Routes
router.get("/summary/profit", protect, isAdmin, profitSummary);
router.get("/summary/daily", protect, isAdmin, dailyProfit);

module.exports = router;
