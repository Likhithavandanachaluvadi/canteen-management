// // backend/models/Order.js
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     table: {
//       type: String,
//       required: true,
//     },

//     items: [
//       {
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, default: 1 },
//       },
//     ],

//     totalPrice: { type: Number, required: true },

//     timeSlot: {
//       type: String,
//       default: "Not specified",
//     },

//     status: {
//       type: String,
//       enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
//       default: "Pending",
//     },

//     adminNote: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    table: {
      type: String,
      default: "Not specified",
      required: true,
    },

    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],

    totalPrice: { type: Number, required: true },

    timeSlot: {
      type: String,
      default: "Not specified",
    },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },

    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
