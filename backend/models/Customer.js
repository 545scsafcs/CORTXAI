import mongoose from "mongoose";

const contactPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  designation: {
    type: String,
    default: "",
    trim: true,
  },
});

const interactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["Call", "Email", "Meeting", "WhatsApp", "Note"],
    required: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const customerSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    gstIn: {
      type: String,
      default: "",
      trim: true,
    },
    pan: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    website: {
      type: String,
      default: "",
      trim: true,
    },
    contacts: [contactPersonSchema],
    timeline: [
      {
        date: { type: Date, default: Date.now },
        event: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    interactionHistory: [interactionSchema],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.index({ company: 1 });
customerSchema.index({ email: 1 });
customerSchema.index({ createdAt: -1 });

export default mongoose.model("Customer", customerSchema);
