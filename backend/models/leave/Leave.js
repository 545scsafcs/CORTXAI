import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    leaveType: {
      type: String,
      enum: [
        "Casual",
        "Sick",
        "Earned",
        "Emergency",
        "Other",
      ],
      default: "Casual",
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
      default: 1,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    approvedBy: {
      type: String,
      default: "",
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Leave",
  leaveSchema
);