import Employee from "../models/Employee.js";

class EmployeeRepository {

  async create(employeeData) {
    return await Employee.create(employeeData);
  }

  async findAll() {
    return await Employee.find().sort({
      createdAt: -1,
    });
  }

  async findById(id) {
    return await Employee.findById(id);
  }

  async findByIdWithPassword(id) {
    return await Employee.findById(id).select("+password");
  }

  async findByEmployeeId(employeeId) {
    return await Employee.findOne({
      employeeId,
    });
  }

  async findByEmail(email) {
    return await Employee.findOne({
      email,
    });
  }

  /* ==========================
          Employee Login
  ========================== */

  async login(email, employeeId) {
    return await Employee.findOne({
      email: email.toLowerCase(),
      employeeId,
      status: "Active",
    });
  }

  async update(id, data) {
    return await Employee.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id) {
    return await Employee.findByIdAndDelete(id);
  }

  async search(keyword) {
    return await Employee.find({
      $or: [
        { employeeId: { $regex: keyword, $options: "i" } },
        { firstName: { $regex: keyword, $options: "i" } },
        { lastName: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
        { department: { $regex: keyword, $options: "i" } },
        { designation: { $regex: keyword, $options: "i" } },
        { status: { $regex: keyword, $options: "i" } },
      ],
    });
  }

  async getDashboardStats() {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "Active" });
    const inactiveEmployees = await Employee.countDocuments({ status: "Inactive" });
    const onLeaveEmployees = await Employee.countDocuments({ status: "On Leave" });

    const deptStats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
    ]);

    const departmentWiseCount = {};
    deptStats.forEach((item) => {
      if (item._id) {
        departmentWiseCount[item._id] = item.count;
      }
    });

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      onLeaveEmployees,
      departmentWiseCount,
    };
  }

  /* ==========================
       Profile Management
  ========================== */

  async updateProfile(id, profileData) {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          ...profileData,
          "activityLog.lastProfileUpdate": new Date(),
        },
      },
      { new: true, runValidators: true }
    );
  }

  async changePassword(id, hashedPassword) {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          password: hashedPassword,
          "activityLog.lastPasswordChange": new Date(),
        },
      },
      { new: true }
    );
  }

  async updateAvatar(id, base64String) {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          profilePhoto: base64String,
          "activityLog.lastAvatarUpload": new Date(),
        },
      },
      { new: true }
    );
  }

  async removeAvatar(id) {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          profilePhoto: "",
          "activityLog.lastAvatarUpload": new Date(),
        },
      },
      { new: true }
    );
  }

  async updatePreferences(id, preferences) {
    const setFields = {};
    for (const [key, value] of Object.entries(preferences)) {
      setFields[`preferences.${key}`] = value;
    }
    return await Employee.findByIdAndUpdate(
      id,
      { $set: setFields },
      { new: true }
    );
  }

  async updateActivityLog(id, field, value) {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $set: { [`activityLog.${field}`]: value },
      },
      { new: true }
    );
  }

  async updateSecurityInfo(id, securityData) {
    const setFields = {};
    for (const [key, value] of Object.entries(securityData)) {
      setFields[`security.${key}`] = value;
    }
    return await Employee.findByIdAndUpdate(
      id,
      { $set: setFields },
      { new: true }
    );
  }
}

export default new EmployeeRepository();
