import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    barcode: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    taxRate: {
      type: Number,
      default: 0, // e.g., 18 for 18% GST
      min: 0,
    },
    minStockLevel: {
      type: Number,
      default: 5,
      min: 0,
    },
    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ SKU: 1 });
productSchema.index({ name: 1 });

export default mongoose.model("Product", productSchema);
