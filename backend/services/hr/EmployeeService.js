import bcrypt from "bcryptjs";
import EmployeeRepository from "../../repositories/EmployeeRepository.js";

class EmployeeService {

  async create(data) {
    return await EmployeeRepository.create(data);
  }

  async getAll() {
    return await EmployeeRepository.findAll();
  }

  async getOne(id) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async update(id, data) {
    const employee = await EmployeeRepository.update(id, data);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async delete(id) {
    const employee = await EmployeeRepository.delete(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async search(query) {
    if (!query || query.trim() === "") {
      return await EmployeeRepository.findAll();
    }
    return await EmployeeRepository.search(query);
  }

  /* ===========================
          Employee Login
  ============================ */

  async login(email, employeeId) {
    const employee = await EmployeeRepository.login(email, employeeId);
    return employee;
  }

  async getDashboardStats() {
    return await EmployeeRepository.getDashboardStats();
  }

  /* ===========================
       Profile Management
  ============================ */

  async updateProfile(id, data) {
    // Strip sensitive/immutable fields
    const sanitized = { ...data };
    delete sanitized.password;
    delete sanitized.employeeId;
    delete sanitized._id;
    delete sanitized.__v;
    delete sanitized.activityLog;
    delete sanitized.security;

    const employee = await EmployeeRepository.updateProfile(id, sanitized);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  /* ===========================
        Change Password
  ============================ */

  async changePassword(id, currentPassword, newPassword) {
    // Fetch employee WITH password field (not stripped by toJSON)
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // If employee has a password set, verify the current one
    if (employee.password && employee.password.length > 0) {
      const isMatch = await bcrypt.compare(currentPassword, employee.password);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updated = await EmployeeRepository.changePassword(id, hashedPassword);
    return updated;
  }

  /* ===========================
        Avatar Management
  ============================ */

  async uploadAvatar(id, base64Data) {
    if (!base64Data || typeof base64Data !== "string") {
      throw new Error("Invalid avatar data");
    }

    // Validate it's a proper data URI or base64 string
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    const base64Only = base64Data.split(",").pop();
    const sizeInBytes = (base64Only.length * 3) / 4;

    if (sizeInBytes > maxSizeBytes) {
      throw new Error("Image size exceeds 5MB limit");
    }

    const employee = await EmployeeRepository.updateAvatar(id, base64Data);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  async removeAvatar(id) {
    const employee = await EmployeeRepository.removeAvatar(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  /* ===========================
          Preferences
  ============================ */

  async updatePreferences(id, preferences) {
    if (!preferences || typeof preferences !== "object") {
      throw new Error("Invalid preferences data");
    }
    const employee = await EmployeeRepository.updatePreferences(id, preferences);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  /* ===========================
     Profile Completion Engine
  ============================ */

  getProfileCompletion(employee) {
    const fields = [
      { key: "profilePhoto", label: "Upload Photo" },
      { key: "firstName", label: "Add First Name" },
      { key: "phone", label: "Add Phone Number" },
      { key: "dateOfBirth", label: "Add Date of Birth" },
      { key: "gender", label: "Set Gender" },
      { key: "bloodGroup", label: "Add Blood Group" },
      { key: "address", label: "Add Address" },
      { key: "city", label: "Add City" },
      { key: "state", label: "Add State" },
      { key: "country", label: "Add Country" },
      { key: "pincode", label: "Add Pincode" },
      { key: "emergencyContactName", label: "Add Emergency Contact" },
      { key: "bio", label: "Write a Bio" },
    ];

    let filled = 0;
    const missing = [];

    for (const field of fields) {
      const value = employee[field.key];
      if (value && value !== "" && value !== null && value !== undefined) {
        filled++;
      } else {
        missing.push(field.label);
      }
    }

    const percentage = Math.round((filled / fields.length) * 100);

    return {
      percentage,
      filled,
      total: fields.length,
      missing,
    };
  }

  /* ===========================
       Security Tracking
  ============================ */

  async recordLoginActivity(id, userAgent, ip) {
    // Parse browser and device from User-Agent
    let browser = "Unknown";
    let device = "Unknown";

    if (userAgent) {
      if (userAgent.includes("Chrome")) browser = "Chrome";
      else if (userAgent.includes("Firefox")) browser = "Firefox";
      else if (userAgent.includes("Safari")) browser = "Safari";
      else if (userAgent.includes("Edge")) browser = "Edge";

      if (userAgent.includes("Mobile")) device = "Mobile";
      else if (userAgent.includes("Tablet")) device = "Tablet";
      else device = "Desktop";
    }

    await EmployeeRepository.updateActivityLog(id, "lastLogin", new Date());
    await EmployeeRepository.updateSecurityInfo(id, {
      lastLoginDevice: device,
      lastLoginBrowser: browser,
      lastLoginIP: ip || "",
      lastActive: new Date(),
    });
  }
}

export default new EmployeeService();
