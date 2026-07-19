import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(

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
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      default: () => new Date(),
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    overtimeHours: {
      type: Number,
      default: 0,
    },

    lateMinutes: {
      type: Number,
      default: 0,
    },

    attendanceStatus: {
      type: String,
      enum: [
        "Present",
        "Absent",
        "Leave",
        "Half Day",
      ],
      default: "Present",
    },

    location: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "Web",
    },

  },

  {
    timestamps: true,
  }

);

attendanceSchema.index(
  {
    employeeId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);
