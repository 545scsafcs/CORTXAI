import mongoose from "mongoose";

const stockAlertSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    alertType: {
      type: String,
      enum: ["Low Stock", "Out of Stock"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
    },
    triggeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockAlert", stockAlertSchema);
