import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    capacity: {
      type: Number,
      default: 0, // In cubic meters or units
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Warehouse", warehouseSchema);
