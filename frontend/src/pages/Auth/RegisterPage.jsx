import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Shield,
  Building,
  User,
  Mail,
  Key,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Briefcase,
  Users,
  Globe,
  Coins,
  Clock,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Lock,
  FileText,
  Phone,
  Link2
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Current registration step
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrgId, setGeneratedOrgId] = useState("");

  // Master Form State
  const [formData, setFormData] = useState({
    // Step 1: Company Details
    companyName: "",
    businessType: "",
    industry: "",
    companySize: "",
    gstNumber: "",
    panNumber: "",
    companyEmail: "",
    companyPhone: "",
    website: "",
    companyLogo: null, // Stores file details { name, size, preview }

    // Step 2: Business Address
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",

    // Step 3: Owner Details
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    employeeId: "",
    password: "",
    confirmPassword: "",

    // Step 4: Business Information
    numberOfEmployees: "",
    departments: [],
    timezone: "UTC+05:30 (IST)",
    currency: "INR (₹)",
    financialYear: "April - March",

    // Step 5: Terms
    acceptTerms: false,
    acceptPrivacy: false
  });

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Available options
  const businessTypes = [
    "Private Limited Company",
    "Public Limited Company",
    "Limited Liability Partnership (LLP)",
    "Partnership Firm",
    "Sole Proprietorship",
    "Non-Profit Organization"
  ];

  const industries = [
    "Information Technology & Services",
    "Financial Services & Fintech",
    "Healthcare & Pharmaceuticals",
    "Manufacturing & Logistics",
    "E-commerce & Retail",
    "Education & Edtech",
    "Real Estate & Construction",
    "Other"
  ];

  const companySizes = [
    "1 - 10 Employees",
    "11 - 50 Employees",
    "51 - 200 Employees",
    "201 - 500 Employees",
    "500+ Employees"
  ];

  const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "Singapore", "Germany", "United Arab Emirates"];

  const timezones = [
    "UTC+05:30 (IST)",
    "UTC+00:00 (GMT/UTC)",
    "UTC-05:00 (EST)",
    "UTC-08:00 (PST)",
    "UTC+01:00 (CET)",
    "UTC+08:00 (SGT)"
  ];

  const currencies = [
    "INR (₹)",
    "USD ($)",
    "EUR (€)",
    "GBP (£)",
    "SGD (S$)",
    "AED (AED)"
  ];

  const financialYears = [
    "April - March",
    "January - December",
    "July - June"
  ];

  const availableDepartments = [
    "Engineering",
    "Sales & Marketing",
    "Human Resources",
    "Finance & Accounts",
    "Operations & Logistics",
    "Customer Support",
    "Product Management",
    "Legal & Administration"
  ];

  // Helper shortcuts
  const useCompanyEmailAsOwnerEmail = () => {
    if (formData.companyEmail) {
      setFormData(prev => ({ ...prev, ownerEmail: formData.companyEmail }));
    }
  };

  const useCompanyPhoneAsOwnerPhone = () => {
    if (formData.companyPhone) {
      setFormData(prev => ({ ...prev, ownerPhone: formData.companyPhone }));
    }
  };

  // Mock logo file handling
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      setFormData(prev => ({
        ...prev,
        companyLogo: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          preview: URL.createObjectURL(file)
        }
      }));
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, companyLogo: null }));
  };

  // Toggle department chip selections
  const toggleDepartment = (dept) => {
    setFormData(prev => {
      const depts = prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept];
      return { ...prev, departments: depts };
    });
  };

  // Password Strength scoring (0-3)
  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const getPasswordStrengthText = (score) => {
    if (score === 0) return "";
    if (score === 1) return "Weak (Use 8+ chars)";
    if (score === 2) return "Medium (Add numbers/caps)";
    return "Strong (Secured)";
  };

  const getPasswordStrengthColor = (score) => {
    if (score === 1) return "bg-rose-500";
    if (score === 2) return "bg-amber-400";
    if (score === 3) return "bg-emerald-400";
    return "bg-white/10";
  };

  // Validations per step
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.companyName.trim()) errs.companyName = "Company Name is required";
      if (!formData.businessType) errs.businessType = "Business Type is required";
      if (!formData.industry) errs.industry = "Industry is required";
      if (!formData.companySize) errs.companySize = "Company Size is required";

      if (!formData.companyEmail.trim()) {
        errs.companyEmail = "Company Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
        errs.companyEmail = "Invalid email format";
      }

      if (!formData.companyPhone.trim()) {
        errs.companyPhone = "Company Phone is required";
      } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.companyPhone.trim())) {
        errs.companyPhone = "Invalid phone number";
      }

      if (!formData.website.trim()) {
        errs.website = "Website is required";
      } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website.trim())) {
        errs.website = "Invalid website URL format";
      }

      if (formData.gstNumber.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber.trim().toUpperCase())) {
        errs.gstNumber = "Invalid GST format (e.g. 22AAAAA0000A1Z5)";
      }

      if (formData.panNumber.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.trim().toUpperCase())) {
        errs.panNumber = "Invalid PAN format (e.g. ABCDE1234F)";
      }
    }

    if (step === 2) {
      if (!formData.country) errs.country = "Country is required";
      if (!formData.state.trim()) errs.state = "State is required";
      if (!formData.city.trim()) errs.city = "City is required";
      if (!formData.address.trim()) errs.address = "Address is required";
      if (!formData.pincode.trim()) {
        errs.pincode = "Pincode/ZIP code is required";
      } else if (!/^\d{4,10}$/.test(formData.pincode.trim())) {
        errs.pincode = "Invalid pincode/ZIP format";
      }
    }

    if (step === 3) {
      if (!formData.ownerName.trim()) errs.ownerName = "Owner Name is required";
      if (!formData.ownerEmail.trim()) {
        errs.ownerEmail = "Work Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
        errs.ownerEmail = "Invalid email format";
      }
      if (!formData.ownerPhone.trim()) {
        errs.ownerPhone = "Phone number is required";
      } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.ownerPhone.trim())) {
        errs.ownerPhone = "Invalid phone number";
      }
      if (!formData.password) {
        errs.password = "Password is required";
      } else if (formData.password.length < 8) {
        errs.password = "Password must be at least 8 characters";
      }
      if (!formData.confirmPassword) {
        errs.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 4) {
      if (!formData.numberOfEmployees.trim()) {
        errs.numberOfEmployees = "Please specify number of employees";
      } else if (isNaN(formData.numberOfEmployees) || parseInt(formData.numberOfEmployees) <= 0) {
        errs.numberOfEmployees = "Enter a valid positive number";
      }
      if (formData.departments.length === 0) {
        errs.departments = "Please select at least one department";
      }
      if (!formData.timezone) errs.timezone = "Timezone selection is required";
      if (!formData.currency) errs.currency = "Currency selection is required";
      if (!formData.financialYear) errs.financialYear = "Financial year selection is required";
    }

    if (step === 5) {
      if (!formData.acceptTerms) errs.acceptTerms = "You must agree to terms";
      if (!formData.acceptPrivacy) errs.acceptPrivacy = "You must agree to the privacy policy";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(5)) {
      setIsSubmitting(true);
      // Simulate API registration delay
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        // Generate a mock unique organization code
        const code = `CORTX-${formData.companyName.replace(/\s+/g, "").slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-IN`;
        setGeneratedOrgId(code);
      }, 1500);
    }
  };

  // Steps configuration for layout
  const steps = [
    { num: 1, label: "Company", icon: Building },
    { num: 2, label: "Address", icon: MapPin },
    { num: 3, label: "Owner", icon: User },
    { num: 4, label: "Information", icon: Briefcase },
    { num: 5, label: "Terms", icon: Shield }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background radial blurs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[130px] pointer-events-none" />

      {/* Brand Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-3 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-slate-900 shadow-sm font-mono">
          <Shield size={14} className="text-indigo-600" /> CORTXAI SYSTEM REGISTRY
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
          Register Your Organization
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-sans">
          Create your business workspace on CORTXAI.
        </p>
      </div>

      {/* Main card panel */}
      <div className="w-full max-w-4xl rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-2xl shadow-slate-200/50 relative z-10 animate-fadeIn min-h-[500px] flex flex-col justify-between">

        {/* If successfully registered */}
        {isSuccess ? (
          <div className="text-center py-12 px-4 flex flex-col items-center justify-center flex-grow animate-fadeIn font-sans">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-6 text-emerald-600 shadow-sm animate-pulse">
              <CheckCircle2 size={44} />
            </div>

            <h2 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
              Organization Created Successfully!
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-md font-sans">
              Your dedicated company instance has been provisioned and allocated secure space on our servers.
            </p>

            {/* Generated Workspace Card */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 w-full max-w-md text-left space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Organization Name</span>
                <span className="text-sm font-bold text-slate-900">{formData.companyName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Workspace Identifier</span>
                <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">{generatedOrgId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Administrator Contact</span>
                <span className="text-sm font-medium text-slate-800">{formData.ownerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Modules</span>
                <span className="text-xs font-bold text-indigo-600">All Modules Enabled</span>
              </div>
            </div>

            <div className="mt-10 w-full max-w-md">
              <button
                onClick={() => navigate("/login/business")}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
              >
                Go to Business Owner Suite <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-200" />
              </button>
              <p className="text-[11px] text-slate-400 mt-4">
                Use your newly created owner credentials to login to the Business Suite.
              </p>
            </div>
          </div>
        ) : (
          /* Stepper Form */
          <>
            {/* Stepper Header Progress */}
            <div className="mb-10 font-sans">
              <div className="flex items-center justify-between relative max-w-xl mx-auto">
                {/* Connecting background progress track */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

                {/* Colored progress bar based on step */}
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-slate-900 -translate-y-1/2 z-0 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                />

                {steps.map((s) => {
                  const Icon = s.icon;
                  const isCompleted = currentStep > s.num;
                  const isActive = currentStep === s.num;

                  return (
                    <div key={s.num} className="flex flex-col items-center relative z-10">
                      <button
                        type="button"
                        onClick={() => {
                          if (s.num < currentStep) {
                            setCurrentStep(s.num);
                            setErrors({});
                          } else if (s.num > currentStep) {
                            let canProceed = true;
                            for (let stepCheck = currentStep; stepCheck < s.num; stepCheck++) {
                              if (!validateStep(stepCheck)) {
                                canProceed = false;
                                break;
                              }
                            }
                            if (canProceed) {
                              setCurrentStep(s.num);
                              setErrors({});
                            }
                          }
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border cursor-pointer ${isCompleted
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                            : isActive
                              ? "bg-slate-900 border-slate-900 text-white shadow-md ring-4 ring-slate-900/10 scale-110"
                              : "bg-white border-slate-300 text-slate-400 hover:border-slate-400"
                          }`}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
                      </button>
                      <span className={`text-[10px] uppercase font-bold tracking-wider mt-2.5 transition-colors duration-200 ${isActive ? "text-slate-900 font-extrabold" : isCompleted ? "text-emerald-700" : "text-slate-400"
                        }`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">

              {/* STEP 1: COMPANY DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                      <Building className="text-indigo-600" size={18} /> Company Details
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">Provide information about your business organization.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Company Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corporation"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.companyName ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.companyName && <p className="text-[10px] text-rose-600 font-bold">{errors.companyName}</p>}
                    </div>

                    {/* Business Type */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Business Type *</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.businessType ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-400">Select Business Type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type} className="text-slate-900">{type}</option>
                        ))}
                      </select>
                      {errors.businessType && <p className="text-[10px] text-rose-600 font-bold">{errors.businessType}</p>}
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Industry *</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.industry ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-400">Select Industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind} className="text-slate-900">{ind}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="text-[10px] text-rose-600 font-bold">{errors.industry}</p>}
                    </div>

                    {/* Company Size */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Company Size *</label>
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.companySize ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-400">Select Company Size</option>
                        {companySizes.map((size) => (
                          <option key={size} value={size} className="text-slate-900">{size}</option>
                        ))}
                      </select>
                      {errors.companySize && <p className="text-[10px] text-rose-600 font-bold">{errors.companySize}</p>}
                    </div>

                    {/* Company Email */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Company Email *</label>
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.companyEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.companyEmail ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.companyEmail && <p className="text-[10px] text-rose-600 font-bold">{errors.companyEmail}</p>}
                    </div>

                    {/* Company Phone */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Company Phone *</label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 555-0199"
                        value={formData.companyPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyPhone: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.companyPhone ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.companyPhone && <p className="text-[10px] text-rose-600 font-bold">{errors.companyPhone}</p>}
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Website *</label>
                      <input
                        type="text"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.website ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.website && <p className="text-[10px] text-rose-600 font-bold">{errors.website}</p>}
                    </div>

                    {/* GST Number (Optional) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">GST Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <input
                        type="text"
                        placeholder="15-digit GSTIN (India)"
                        value={formData.gstNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                        maxLength={15}
                        className={`w-full rounded-2xl border ${errors.gstNumber ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium uppercase`}
                      />
                      {errors.gstNumber && <p className="text-[10px] text-rose-600 font-bold">{errors.gstNumber}</p>}
                    </div>

                    {/* PAN Number (Optional) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">PAN Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <input
                        type="text"
                        placeholder="10-digit PAN ID (India)"
                        value={formData.panNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                        maxLength={10}
                        className={`w-full rounded-2xl border ${errors.panNumber ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium uppercase`}
                      />
                      {errors.panNumber && <p className="text-[10px] text-rose-600 font-bold">{errors.panNumber}</p>}
                    </div>

                    {/* Company Logo Drag and Drop (Optional) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Company Logo <span className="text-slate-400 font-normal">(Optional)</span></label>

                      {formData.companyLogo ? (
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200 animate-fadeIn">
                          <div className="flex items-center gap-3">
                            {formData.companyLogo.preview ? (
                              <img src={formData.companyLogo.preview} alt="Logo" className="w-10 h-10 object-cover rounded-xl border border-slate-200 bg-white" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">L</div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-slate-900 max-w-[180px] truncate">{formData.companyLogo.name}</p>
                              <p className="text-[10px] text-slate-500">{formData.companyLogo.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-[76px] rounded-2xl border border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-slate-100/60 cursor-pointer transition-all duration-200">
                          <div className="flex items-center gap-2.5">
                            <UploadCloud size={18} className="text-indigo-600" />
                            <span className="text-xs font-semibold text-slate-700">Upload business logo</span>
                            <span className="text-[10px] text-slate-400">(Max 2MB)</span>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BUSINESS ADDRESS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                      <MapPin className="text-indigo-600" size={18} /> Business Address
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">Specify where your corporate office or business is located.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Country */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Country *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.country ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select Country</option>
                        {countries.map((c) => (
                          <option key={c} value={c} className="text-slate-900">{c}</option>
                        ))}
                      </select>
                      {errors.country && <p className="text-[10px] text-rose-600 font-bold">{errors.country}</p>}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">State / Region *</label>
                      <input
                        type="text"
                        placeholder="e.g. Maharashtra or California"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.state ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.state && <p className="text-[10px] text-rose-600 font-bold">{errors.state}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai or San Francisco"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.city ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.city && <p className="text-[10px] text-rose-600 font-bold">{errors.city}</p>}
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Pincode / ZIP Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. 400001 or 94103"
                        value={formData.pincode}
                        onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.pincode ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                      />
                      {errors.pincode && <p className="text-[10px] text-rose-600 font-bold">{errors.pincode}</p>}
                    </div>

                    {/* Address Detail (Full width) */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Registered Office Address *</label>
                      <textarea
                        rows={3}
                        placeholder="Suite number, building name, block, street address..."
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className={`w-full rounded-2xl border ${errors.address ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium resize-none`}
                      />
                      {errors.address && <p className="text-[10px] text-rose-600 font-bold">{errors.address}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: OWNER DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                      <User className="text-indigo-600" size={18} /> Owner & Administrator Details
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">Specify credentials for the primary root owner account.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Owner Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Full Owner Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><User size={16} /></span>
                        <input
                          type="text"
                          placeholder="e.g. Vineet Yadav"
                          value={formData.ownerName}
                          onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.ownerName ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                      </div>
                      {errors.ownerName && <p className="text-[10px] text-rose-600 font-bold">{errors.ownerName}</p>}
                    </div>

                    {/* Employee ID (Optional) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Employee ID / Code <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. EMP-001"
                        value={formData.employeeId}
                        onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium"
                      />
                    </div>

                    {/* Owner Email */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Work Email *</label>
                        {formData.companyEmail && (
                          <button
                            type="button"
                            onClick={useCompanyEmailAsOwnerEmail}
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold tracking-wide"
                          >
                            Copy Company Email
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Mail size={16} /></span>
                        <input
                          type="email"
                          placeholder="owner@company.com"
                          value={formData.ownerEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, ownerEmail: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.ownerEmail ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                      </div>
                      {errors.ownerEmail && <p className="text-[10px] text-rose-600 font-bold">{errors.ownerEmail}</p>}
                    </div>

                    {/* Owner Phone */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Phone Number *</label>
                        {formData.companyPhone && (
                          <button
                            type="button"
                            onClick={useCompanyPhoneAsOwnerPhone}
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold tracking-wide"
                          >
                            Copy Company Phone
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Phone size={16} /></span>
                        <input
                          type="tel"
                          placeholder="e.g. +1 555-0199"
                          value={formData.ownerPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.ownerPhone ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                      </div>
                      {errors.ownerPhone && <p className="text-[10px] text-rose-600 font-bold">{errors.ownerPhone}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Owner Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Key size={16} /></span>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Min 8 characters"
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.password ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-12 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-500 hover:text-slate-900"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>

                      {/* Password strength indicators */}
                      {formData.password && (
                        <div className="space-y-1.5 pt-1.5 animate-fadeIn">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-500">Security Index:</span>
                            <span className={getPasswordStrength() === 3 ? "text-emerald-700" : getPasswordStrength() === 2 ? "text-amber-800" : "text-rose-700"}>
                              {getPasswordStrengthText(getPasswordStrength())}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            <div className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrength() >= 1 ? getPasswordStrengthColor(getPasswordStrength()) : "bg-slate-200"}`} />
                            <div className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrength() >= 2 ? getPasswordStrengthColor(getPasswordStrength()) : "bg-slate-200"}`} />
                            <div className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrength() >= 3 ? getPasswordStrengthColor(getPasswordStrength()) : "bg-slate-200"}`} />
                          </div>
                        </div>
                      )}

                      {errors.password && <p className="text-[10px] text-rose-600 font-bold">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Confirm Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Lock size={16} /></span>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.confirmPassword ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-[10px] text-rose-600 font-bold">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: BUSINESS INFORMATION */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                      <Briefcase className="text-indigo-600" size={18} /> Business Settings
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">Configure workspace defaults and department structures.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Exact Number of Employees */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Total Count of Employees *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Users size={16} /></span>
                        <input
                          type="number"
                          placeholder="e.g. 24"
                          value={formData.numberOfEmployees}
                          onChange={(e) => setFormData(prev => ({ ...prev, numberOfEmployees: e.target.value }))}
                          className={`w-full rounded-2xl border ${errors.numberOfEmployees ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-slate-50"} pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium`}
                        />
                      </div>
                      {errors.numberOfEmployees && <p className="text-[10px] text-rose-600 font-bold">{errors.numberOfEmployees}</p>}
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Corporate Timezone *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Clock size={16} /></span>
                        <select
                          value={formData.timezone}
                          onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer"
                        >
                          {timezones.map((tz) => (
                            <option key={tz} value={tz} className="text-slate-900">{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Financial Currency *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Coins size={16} /></span>
                        <select
                          value={formData.currency}
                          onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer"
                        >
                          {currencies.map((curr) => (
                            <option key={curr} value={curr} className="text-slate-900">{curr}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Financial Year */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Financial Year Calendar *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><FileText size={16} /></span>
                        <select
                          value={formData.financialYear}
                          onChange={(e) => setFormData(prev => ({ ...prev, financialYear: e.target.value }))}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all text-xs font-medium appearance-none cursor-pointer"
                        >
                          {financialYears.map((fy) => (
                            <option key={fy} value={fy} className="text-slate-900">{fy}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Departments (Full width chips select) */}
                    <div className="space-y-3.5 md:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Active Company Departments *</label>
                        <span className="text-[10px] text-slate-500 font-medium">Select all that apply</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {availableDepartments.map((dept) => {
                          const isSelected = formData.departments.includes(dept);
                          return (
                            <button
                              type="button"
                              key={dept}
                              onClick={() => toggleDepartment(dept)}
                              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer ${isSelected
                                  ? "bg-indigo-50 border-indigo-500 text-indigo-900 shadow-2xs"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                              {dept}
                            </button>
                          );
                        })}
                      </div>
                      {errors.departments && <p className="text-[10px] text-rose-600 font-bold">{errors.departments}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: TERMS & FINALIZATION */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                      <Shield className="text-indigo-600" size={18} /> Terms of Service & Privacy
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">Review legal criteria to deploy the CORTXAI workspace.</p>
                  </div>

                  <div className="space-y-4 max-w-2xl mx-auto py-4">
                    {/* Accept Terms Checkbox */}
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all duration-200 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 mt-0.5 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900">Accept Terms of Service</p>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          I agree to CORTXAI Cloud Systems Agreement, service terms, and automated agent provisioning terms.
                        </p>
                      </div>
                    </label>
                    {errors.acceptTerms && <p className="text-[10px] text-rose-600 font-bold pl-8">{errors.acceptTerms}</p>}

                    {/* Accept Privacy Checkbox */}
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all duration-200 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.acceptPrivacy}
                        onChange={(e) => setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 mt-0.5 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900">Accept Privacy Policy</p>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          I consent to information handling parameters as documented under GDPR compliance regulations.
                        </p>
                      </div>
                    </label>
                    {errors.acceptPrivacy && <p className="text-[10px] text-rose-600 font-bold pl-8">{errors.acceptPrivacy}</p>}
                  </div>

                  {/* Summary recap inside the page */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-slate-700 max-w-xl mx-auto flex gap-3 shadow-2xs font-medium">
                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Instance Summary</p>
                      <p className="mt-1 leading-relaxed">
                        You are registering <span className="text-indigo-900 font-bold">{formData.companyName || "your company"}</span>.
                        Root administrator access will be granted to <span className="text-indigo-900 font-bold">{formData.ownerName || "the owner"}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions Footer */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between font-sans">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700 transition duration-200 flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                </div>

                <div>
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-white transition duration-200 flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-white transition duration-200 flex items-center gap-2 shadow-md cursor-pointer ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Deploying Workspace...
                        </>
                      ) : (
                        <>
                          Create Organization <Check size={14} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </form>
          </>
        )}
      </div>

      {/* Already registered check */}
      {!isSuccess && (
        <p className="mt-8 text-center text-xs text-slate-500 relative z-10 font-sans">
          Already have a corporate workspace account?
          <Link
            to="/login"
            className="ml-1.5 text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
          >
            Sign In to Workspace
          </Link>
        </p>
      )}
    </div>
  );
}