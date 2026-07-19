import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { useEmployee } from "../../context/EmployeeContext";
import {
  updateProfile,
  changePassword,
  uploadAvatar,
  removeAvatar,
  updatePreferences,
  getProfileCompletion,
} from "../../services/employeeApi";
import {
  User, Shield, Settings, MapPin, Phone, Camera, Trash2,
  Eye, EyeOff, Check, AlertCircle, Clock, ChevronRight,
} from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: <User size={18} /> },
  { id: "personal", label: "Personal Info", icon: <User size={18} /> },
  { id: "address", label: "Address", icon: <MapPin size={18} /> },
  { id: "emergency", label: "Emergency", icon: <Phone size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "preferences", label: "Preferences", icon: <Settings size={18} /> },
];

export default function ProfilePage() {
  const { employee, refreshEmployee } = useEmployee();
  const [activeTab, setActiveTab] = useState("overview");
  const [saving, setSaving] = useState(false);
  const [completion, setCompletion] = useState(null);

  useEffect(() => {
    if (employee?._id) {
      getProfileCompletion(employee._id)
        .then((res) => setCompletion(res.data))
        .catch(() => {});
    }
  }, [employee]);

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-5xl font-black text-white">Employee Profile</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage your personal information, security, and preferences.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === "overview" && (
            <OverviewTab
              employee={employee}
              completion={completion}
              refreshEmployee={refreshEmployee}
              setSaving={setSaving}
              saving={saving}
              setCompletion={setCompletion}
            />
          )}
          {activeTab === "personal" && (
            <PersonalInfoTab
              employee={employee}
              refreshEmployee={refreshEmployee}
              setSaving={setSaving}
              saving={saving}
              setCompletion={setCompletion}
            />
          )}
          {activeTab === "address" && (
            <AddressTab
              employee={employee}
              refreshEmployee={refreshEmployee}
              setSaving={setSaving}
              saving={saving}
              setCompletion={setCompletion}
            />
          )}
          {activeTab === "emergency" && (
            <EmergencyTab
              employee={employee}
              refreshEmployee={refreshEmployee}
              setSaving={setSaving}
              saving={saving}
              setCompletion={setCompletion}
            />
          )}
          {activeTab === "security" && (
            <SecurityTab employee={employee} refreshEmployee={refreshEmployee} />
          )}
          {activeTab === "preferences" && (
            <PreferencesTab
              employee={employee}
              refreshEmployee={refreshEmployee}
              setSaving={setSaving}
              saving={saving}
            />
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

/* ===================================================================
   OVERVIEW TAB
=================================================================== */

function OverviewTab({ employee, completion, refreshEmployee, setSaving, saving, setCompletion }) {
  const fileInputRef = useRef(null);

  async function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP formats are supported");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    setSaving(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await uploadAvatar(employee._id, reader.result);
        await refreshEmployee();
        const res = await getProfileCompletion(employee._id);
        setCompletion(res.data);
        toast.success("Avatar uploaded successfully");
      } catch (err) {
        toast.error(err.response?.data?.message || "Avatar upload failed");
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleRemoveAvatar() {
    if (!employee?.profilePhoto) return;
    setSaving(true);
    try {
      await removeAvatar(employee._id);
      await refreshEmployee();
      const res = await getProfileCompletion(employee._id);
      setCompletion(res.data);
      toast.success("Avatar removed");
    } catch (err) {
      toast.error("Failed to remove avatar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left: Avatar + Identity */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative group">
          {employee?.profilePhoto ? (
            <img
              src={employee.profilePhoto}
              alt={employee?.firstName}
              className="w-36 h-36 rounded-full object-cover border-4 border-cyan-400/30 shadow-xl shadow-cyan-500/10"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-cyan-500 flex items-center justify-center text-7xl font-black text-black uppercase shadow-xl shadow-cyan-500/10">
              {employee?.firstName?.charAt(0)}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="absolute bottom-1 right-1 p-2.5 bg-cyan-400 rounded-full text-black hover:bg-cyan-300 transition shadow-lg opacity-0 group-hover:opacity-100"
            title="Upload Photo"
          >
            <Camera size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>

        {employee?.profilePhoto && (
          <button
            onClick={handleRemoveAvatar}
            disabled={saving}
            className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            <Trash2 size={12} /> Remove Photo
          </button>
        )}

        <h2 className="text-3xl font-bold mt-6 text-white">
          {employee?.firstName} {employee?.lastName}
        </h2>
        <p className="text-cyan-400 mt-1">{employee?.designation || "Staff"}</p>
        <span className="mt-3 px-4 py-1.5 bg-white/10 border border-white/5 rounded-full text-xs font-mono text-gray-300">
          {employee?.employeeId}
        </span>
        <p className="text-gray-400 text-sm mt-3">{employee?.department || "General"}</p>

        {employee?.bio && (
          <p className="mt-4 text-gray-400 text-sm italic border-t border-white/5 pt-4 leading-relaxed">
            "{employee.bio}"
          </p>
        )}
      </div>

      {/* Right: Completion + Activity */}
      <div className="xl:col-span-2 space-y-8">
        {/* Profile Completion */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Profile Completion</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={completion?.percentage >= 80 ? "#22d3ee" : completion?.percentage >= 50 ? "#facc15" : "#ef4444"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(completion?.percentage || 0) * 2.64} 264`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white">
                {completion?.percentage || 0}%
              </span>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-sm">
                {completion?.filled || 0} of {completion?.total || 13} fields completed
              </p>
              <div className="w-full bg-white/10 h-2.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${completion?.percentage || 0}%`,
                    background: completion?.percentage >= 80
                      ? "linear-gradient(to right, #06b6d4, #22d3ee)"
                      : completion?.percentage >= 50
                      ? "linear-gradient(to right, #eab308, #facc15)"
                      : "linear-gradient(to right, #dc2626, #ef4444)",
                  }}
                />
              </div>

              {completion?.missing?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 font-semibold mb-2">Complete your profile:</p>
                  <div className="flex flex-wrap gap-2">
                    {completion.missing.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-cyan-400" size={22} /> Activity Log
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityItem label="Last Login" value={employee?.activityLog?.lastLogin} />
            <ActivityItem label="Last Profile Update" value={employee?.activityLog?.lastProfileUpdate} />
            <ActivityItem label="Last Password Change" value={employee?.activityLog?.lastPasswordChange} />
            <ActivityItem label="Last Avatar Upload" value={employee?.activityLog?.lastAvatarUpload} />
            <ActivityItem label="Account Created" value={employee?.createdAt} />
            <ActivityItem label="Joined Company" value={employee?.joiningDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ label, value }) {
  const formatted = value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      }) + " • " + new Date(value).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit",
      })
    : "Not recorded";

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`text-sm font-mono ${value ? "text-white" : "text-gray-600"}`}>
        {formatted}
      </span>
    </div>
  );
}

/* ===================================================================
   PERSONAL INFO TAB
=================================================================== */

function PersonalInfoTab({ employee, refreshEmployee, setSaving, saving, setCompletion }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    gender: "Male", dateOfBirth: "", bloodGroup: "", bio: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        gender: employee.gender || "Male",
        dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.substring(0, 10) : "",
        bloodGroup: employee.bloodGroup || "",
        bio: employee.bio || "",
      });
    }
  }, [employee]);

  async function handleSave(e) {
    e.preventDefault();
    if (!form.firstName.trim()) { toast.error("First name is required"); return; }
    if (!form.email.trim()) { toast.error("Email is required"); return; }
    if (form.phone && !/^\+?[\d\s-]{7,15}$/.test(form.phone)) {
      toast.error("Invalid phone number"); return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Invalid email address"); return;
    }

    setSaving(true);
    try {
      await updateProfile(employee._id, form);
      await refreshEmployee();
      const res = await getProfileCompletion(employee._id);
      setCompletion(res.data);
      toast.success("Personal information updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
      <form onSubmit={handleSave} className="space-y-6">
        {/* Read-only fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReadOnlyField label="Employee ID" value={employee?.employeeId} />
          <ReadOnlyField
            label="Joining Date"
            value={employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "--"}
          />
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="First Name *" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
          <FormField label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
          <FormField label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <FormField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 98765 43210" />
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <FormField label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(v) => setForm({ ...form, dateOfBirth: v })} />
          <FormField label="Blood Group" value={form.bloodGroup} onChange={(v) => setForm({ ...form, bloodGroup: v })} placeholder="e.g. O+" />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Write a short bio about yourself..."
            className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
          />
        </div>
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ===================================================================
   ADDRESS TAB
=================================================================== */

function AddressTab({ employee, refreshEmployee, setSaving, saving, setCompletion }) {
  const [form, setForm] = useState({
    address: "", city: "", state: "", country: "India", pincode: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        address: employee.address || "",
        city: employee.city || "",
        state: employee.state || "",
        country: employee.country || "India",
        pincode: employee.pincode || "",
      });
    }
  }, [employee]);

  async function handleSave(e) {
    e.preventDefault();
    if (form.pincode && !/^\d{4,10}$/.test(form.pincode)) {
      toast.error("Invalid pincode format"); return;
    }

    setSaving(true);
    try {
      await updateProfile(employee._id, form);
      await refreshEmployee();
      const res = await getProfileCompletion(employee._id);
      setCompletion(res.data);
      toast.success("Address updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Address Information</h3>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">Street Address</label>
          <textarea
            rows={2}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Building, Street, Locality..."
            className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
          <FormField label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
          <FormField label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
          <FormField label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} placeholder="e.g. 110001" />
        </div>
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ===================================================================
   EMERGENCY TAB
=================================================================== */

function EmergencyTab({ employee, refreshEmployee, setSaving, saving, setCompletion }) {
  const [form, setForm] = useState({
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelationship: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        emergencyContactName: employee.emergencyContactName || "",
        emergencyContactNumber: employee.emergencyContactNumber || "",
        emergencyContactRelationship: employee.emergencyContactRelationship || "",
      });
    }
  }, [employee]);

  async function handleSave(e) {
    e.preventDefault();
    if (form.emergencyContactNumber && !/^\+?[\d\s-]{7,15}$/.test(form.emergencyContactNumber)) {
      toast.error("Invalid emergency contact number"); return;
    }

    setSaving(true);
    try {
      await updateProfile(employee._id, form);
      await refreshEmployee();
      const res = await getProfileCompletion(employee._id);
      setCompletion(res.data);
      toast.success("Emergency contacts updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Emergency Contact</h3>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Contact Name" value={form.emergencyContactName} onChange={(v) => setForm({ ...form, emergencyContactName: v })} placeholder="e.g. Rajesh Sharma" />
          <FormField label="Contact Number" value={form.emergencyContactNumber} onChange={(v) => setForm({ ...form, emergencyContactNumber: v })} placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">Relationship</label>
          <select
            value={form.emergencyContactRelationship}
            onChange={(e) => setForm({ ...form, emergencyContactRelationship: e.target.value })}
            className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="">Select Relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ===================================================================
   SECURITY TAB
=================================================================== */

function SecurityTab({ employee, refreshEmployee }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const strength = getPasswordStrength(form.newPassword);

  async function handleChange(e) {
    e.preventDefault();

    if (!form.newPassword) {
      toast.error("New password is required"); return;
    }
    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters"); return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match"); return;
    }
    if (strength.score < 4) {
      toast.error("Password must contain uppercase, lowercase, number, and special character"); return;
    }

    setSaving(true);
    try {
      await changePassword(employee._id, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      await refreshEmployee();
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Change Password Form */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Change Password</h3>
        <form onSubmit={handleChange} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                placeholder="Enter current password (if set)"
                className="w-full bg-[#0B1120] border border-white/10 p-4 pr-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-4 text-gray-400 hover:text-white">
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                placeholder="Minimum 8 characters"
                className="w-full bg-[#0B1120] border border-white/10 p-4 pr-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-4 text-gray-400 hover:text-white">
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength Meter */}
            {form.newPassword && (
              <div className="mt-3 space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        i <= strength.score ? strength.color : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-semibold ${strength.textColor}`}>{strength.label}</p>
                <div className="space-y-1">
                  <RuleCheck passed={/[A-Z]/.test(form.newPassword)} label="Uppercase letter" />
                  <RuleCheck passed={/[a-z]/.test(form.newPassword)} label="Lowercase letter" />
                  <RuleCheck passed={/\d/.test(form.newPassword)} label="Number" />
                  <RuleCheck passed={/[@$!%*?&#]/.test(form.newPassword)} label="Special character (@$!%*?&#)" />
                  <RuleCheck passed={form.newPassword.length >= 8} label="At least 8 characters" />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Re-enter new password"
              className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            {form.confirmPassword && form.newPassword !== form.confirmPassword && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-3.5 rounded-xl font-bold disabled:opacity-50 transition shadow-lg shadow-cyan-400/10"
          >
            {saving ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

      {/* Security Info */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Security Information</h3>
        <div className="space-y-4">
          <SecurityItem label="Last Login Device" value={employee?.security?.lastLoginDevice} />
          <SecurityItem label="Last Login Browser" value={employee?.security?.lastLoginBrowser} />
          <SecurityItem label="Last Login IP" value={employee?.security?.lastLoginIP} />
          <SecurityItem
            label="Last Active"
            value={
              employee?.security?.lastActive
                ? new Date(employee.security.lastActive).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  }) + " • " + new Date(employee.security.lastActive).toLocaleTimeString("en-US", {
                    hour: "2-digit", minute: "2-digit",
                  })
                : null
            }
          />
          <SecurityItem
            label="Last Password Change"
            value={
              employee?.activityLog?.lastPasswordChange
                ? new Date(employee.activityLog.lastPasswordChange).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  }) + " • " + new Date(employee.activityLog.lastPasswordChange).toLocaleTimeString("en-US", {
                    hour: "2-digit", minute: "2-digit",
                  })
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}

function SecurityItem({ label, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`text-sm font-mono ${value ? "text-white" : "text-gray-600"}`}>
        {value || "Not recorded"}
      </span>
    </div>
  );
}

function RuleCheck({ passed, label }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${passed ? "text-green-400" : "text-gray-500"}`}>
      {passed ? <Check size={12} /> : <ChevronRight size={12} />}
      {label}
    </div>
  );
}

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "", textColor: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&#]/.test(password)) score++;

  const levels = [
    { score: 0, label: "", color: "", textColor: "" },
    { score: 1, label: "Very Weak", color: "bg-red-500", textColor: "text-red-400" },
    { score: 2, label: "Weak", color: "bg-orange-500", textColor: "text-orange-400" },
    { score: 3, label: "Fair", color: "bg-yellow-500", textColor: "text-yellow-400" },
    { score: 4, label: "Strong", color: "bg-green-500", textColor: "text-green-400" },
    { score: 5, label: "Very Strong", color: "bg-cyan-400", textColor: "text-cyan-400" },
  ];

  return levels[score] || levels[0];
}

/* ===================================================================
   PREFERENCES TAB
=================================================================== */

function PreferencesTab({ employee, refreshEmployee, setSaving, saving }) {
  const [prefs, setPrefs] = useState({
    darkMode: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    language: "English",
    timezone: "Asia/Kolkata",
  });

  useEffect(() => {
    if (employee?.preferences) {
      setPrefs({
        darkMode: employee.preferences.darkMode ?? true,
        emailNotifications: employee.preferences.emailNotifications ?? true,
        smsNotifications: employee.preferences.smsNotifications ?? false,
        pushNotifications: employee.preferences.pushNotifications ?? true,
        language: employee.preferences.language || "English",
        timezone: employee.preferences.timezone || "Asia/Kolkata",
      });
    }
  }, [employee]);

  async function handleSave() {
    setSaving(true);
    try {
      await updatePreferences(employee._id, prefs);
      await refreshEmployee();
      toast.success("Preferences saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Preferences</h3>
      <div className="space-y-6">
        <ToggleSwitch label="Dark Mode" value={prefs.darkMode} onChange={(v) => setPrefs({ ...prefs, darkMode: v })} />
        <ToggleSwitch label="Email Notifications" value={prefs.emailNotifications} onChange={(v) => setPrefs({ ...prefs, emailNotifications: v })} />
        <ToggleSwitch label="SMS Notifications" value={prefs.smsNotifications} onChange={(v) => setPrefs({ ...prefs, smsNotifications: v })} />
        <ToggleSwitch label="Push Notifications" value={prefs.pushNotifications} onChange={(v) => setPrefs({ ...prefs, pushNotifications: v })} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/10">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Language</label>
            <select
              value={prefs.language}
              onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
              className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Kannada">Kannada</option>
              <option value="Marathi">Marathi</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Timezone</label>
            <select
              value={prefs.timezone}
              onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
              className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-3.5 rounded-xl font-bold disabled:opacity-50 transition shadow-lg shadow-cyan-400/10"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}

function ToggleSwitch({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-300 font-semibold">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
          value ? "bg-cyan-400" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
            value ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* ===================================================================
   SHARED FORM COMPONENTS
=================================================================== */

function FormField({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
      />
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-semibold mb-2">{label}</label>
      <div className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-gray-400 font-mono cursor-not-allowed">
        {value || "--"}
      </div>
    </div>
  );
}

function SaveButton({ saving }) {
  return (
    <div className="flex justify-end pt-4 border-t border-white/10">
      <button
        type="submit"
        disabled={saving}
        className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-3.5 rounded-xl font-bold disabled:opacity-50 transition shadow-lg shadow-cyan-400/10"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}