import mongoose from "mongoose";

const inventoryLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Audit", "Stockin", "Stockout"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("InventoryLog", inventoryLogSchema);
