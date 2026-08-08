import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
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
      enum: ["Call", "Meeting", "Email", "WhatsApp", "Reminder"],
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
    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Missed"],
      default: "Upcoming",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

followUpSchema.index({ assignedTo: 1, status: 1 });
followUpSchema.index({ scheduledAt: 1 });

export default mongoose.model("FollowUp", followUpSchema);
