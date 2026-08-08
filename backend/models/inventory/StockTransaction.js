import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["In", "Out", "Transfer", "Adjustment"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
      min: 0,
    },
    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },
    referenceDocument: {
      type: String, // Invoice No / PO No / SO No
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

stockTransactionSchema.index({ product: 1 });
stockTransactionSchema.index({ warehouse: 1 });

export default mongoose.model("StockTransaction", stockTransactionSchema);
