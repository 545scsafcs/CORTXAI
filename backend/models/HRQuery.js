import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    senderRole: {
      type: String,
      enum: ["employee", "hr"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const hrQuerySchema = new mongoose.Schema(
  {
    /* === Employee who raised the query === */
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    employeeCode: {
      type: String,
      required: true,
      trim: true,
    },
    employeeEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      trim: true,
    },

    /* === Ticket Details === */
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "General Query",
        "Payroll Issue",
        "Leave Dispute",
        "IT Support",
        "Policy Clarification",
        "Workplace Issue",
        "Benefits",
        "Other",
      ],
      default: "General Query",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending",
    },

    /* === Assignment === */
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    /* === Conversation === */
    replies: [replySchema],

    /* === Internal HR Notes (not visible to employee) === */
    internalNotes: {
      type: String,
      default: "",
      trim: true,
    },

    /* === Resolution Tracking === */
    resolvedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* === Indexes for performance === */
hrQuerySchema.index({ department: 1, status: 1 });
hrQuerySchema.index({ employee: 1 });
hrQuerySchema.index({ createdAt: -1 });

export default mongoose.model("HRQuery", hrQuerySchema);
