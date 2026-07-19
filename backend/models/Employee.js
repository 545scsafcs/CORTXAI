import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },

    designation: {
      type: String,
      default: "",
      trim: true,
    },

    salary: {
      type: Number,
      default: 0,
      min: 0,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
    },

    emergencyContactName: {
      type: String,
      default: "",
      trim: true,
    },

    emergencyContactNumber: {
      type: String,
      default: "",
      trim: true,
    },

    emergencyContactRelationship: {
      type: String,
      default: "",
      trim: true,
    },

    bloodGroup: {
      type: String,
      default: "",
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    leaveBalance: {
      casual: {
        type: Number,
        default: 12,
      },

      sick: {
        type: Number,
        default: 12,
      },

      earned: {
        type: Number,
        default: 15,
      },

      unpaid: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
        "On Leave",
      ],
      default: "Active",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    /* ===========================
        User Preferences
    =========================== */

    preferences: {
      darkMode: {
        type: Boolean,
        default: true,
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: "English",
      },
      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },

    /* ===========================
          Activity Log
    =========================== */

    activityLog: {
      lastLogin: {
        type: Date,
        default: null,
      },
      lastProfileUpdate: {
        type: Date,
        default: null,
      },
      lastPasswordChange: {
        type: Date,
        default: null,
      },
      lastAvatarUpload: {
        type: Date,
        default: null,
      },
    },

    /* ===========================
        Security Metadata
    =========================== */

    security: {
      lastLoginDevice: {
        type: String,
        default: "",
      },
      lastLoginBrowser: {
        type: String,
        default: "",
      },
      lastLoginIP: {
        type: String,
        default: "",
      },
      lastActive: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

employeeSchema.set("toJSON", {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret.password;
    return ret;
  },
});

employeeSchema.set("toObject", {
  virtuals: true,
});

export default mongoose.model(
  "Employee",
  employeeSchema
);