const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { table, items, totalPrice, timeSlot } = req.body;

    //create order

    const order = await Order.create({
      user: req.user.id,
      table: table || "Not specified",
      items,
      totalPrice,
      timeSlot: timeSlot || "Not specified",
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};

// Student Orders
const getStudentOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching orders" });
  }
};

// Admin Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching admin orders" });
  }
};

// Update Status
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const order = await Order.findById(id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (status) {
      order.status = status;

      if (status === "Delivered") {
        order.deliveredAt = new Date();
      }
    }

    if (adminNote) order.adminNote = adminNote;

    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order updated", order });
  } catch (error) {
    console.error("❌ Error updating order:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating order" });
  }
};

// 📊 Overall Profit Summary
const profitSummary = async (req, res) => {
  try {
    const delivered = await Order.find({ status: "Delivered" });

    const totalProfit = delivered.reduce(
      (acc, o) => acc + o.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      totalOrders: delivered.length,
      totalProfit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in summary" });
  }
};

// 📊 Daily Profit Summary
const dailyProfit = async (req, res) => {
  try {
    const delivered = await Order.find({ status: "Delivered" });

    const byDay = {};

    delivered.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
      if (!byDay[date]) byDay[date] = 0;
      byDay[date] += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      dailyProfit: byDay,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching daily profit" });
  }
};

module.exports = {
  createOrder,
  getStudentOrders,
  getAllOrders,
  updateStatus,
  profitSummary,
  dailyProfit,
};
