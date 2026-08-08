import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    type: {
      type: String,
      enum: ["Call", "Email", "Meeting", "Note", "Status Change", "Assignment"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ leadId: 1 });
activitySchema.index({ customerId: 1 });
activitySchema.index({ createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
