import React, {

  useEffect,

  useState,

} from "react";

import HRLayout from "../../components/layout/HRLayout";

import {

  ChevronDown,

  ChevronUp,

  Check,

  X,

  Calendar,

  User,

  FileText,

} from "lucide-react";

import {

  getLeaves,

  approveLeave,

  rejectLeave,

} from "../../services/leave/leaveApi";

export default function LeavePage() {

  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(null);

  useEffect(() => {

    loadLeaves();

  }, []);

  async function loadLeaves() {

    try {

      setLoading(true);

      const data = await getLeaves();

      setLeaves(data);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  }

  async function handleApprove(id) {

    try {

      await approveLeave(id);

      await loadLeaves();

      alert("Leave Approved Successfully");

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        err.message

      );

    }

  }

  async function handleReject(id) {

  try {

    await rejectLeave(

      id,

      "Rejected by HR"

    );

    await loadLeaves();

    alert("Leave Rejected");

  }

  catch (err) {

    alert(

      err.response?.data?.message ||

      err.message

    );

  }

}

  return (
    <HRLayout>
      <div className="space-y-8 font-sans">
        {/* Title Header */}
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Leave Management
            </h1>
            <p className="mt-1.5 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
              Review and manage employee leave requests across departments.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200/80 px-5 py-2.5 self-start sm:self-auto shadow-2xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
              Pending: <span className="font-mono text-sm font-black">{leaves.filter((l) => l.status === "Pending").length}</span>
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-900 text-[11px] font-black uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 font-outfit">Employee</th>
                  <th className="p-4 font-outfit">Department</th>
                  <th className="p-4 font-outfit">Leave Type</th>
                  <th className="p-4 font-outfit">From</th>
                  <th className="p-4 font-outfit">To</th>
                  <th className="p-4 font-outfit">Days</th>
                  <th className="p-4 font-outfit">Status</th>
                  <th className="p-4 font-outfit text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-500">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-semibold">Loading leave requests...</span>
                      </div>
                    </td>
                  </tr>
                ) : leaves.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-500 font-bold font-outfit">
                      No Leave Requests Found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <React.Fragment key={leave._id}>
                      <tr className="hover:bg-slate-50/80 transition-colors duration-150">
                        <td className="p-4 font-bold text-slate-900 font-outfit">
                          {leave.employeeName}
                        </td>
                        <td className="p-4">{leave.department}</td>
                        <td className="p-4">{leave.leaveType}</td>
                        <td className="p-4 font-mono text-slate-600">
                          {new Date(leave.fromDate).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-mono text-slate-600">
                          {new Date(leave.toDate).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-900">{leave.totalDays}d</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              leave.status === "Approved"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/90"
                                : leave.status === "Rejected"
                                ? "bg-rose-50 text-rose-800 border border-rose-200/90"
                                : "bg-amber-50 text-amber-900 border border-amber-200/90"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            {leave.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(leave._id)}
                                  className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center transition cursor-pointer"
                                  title="Approve Leave"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={() => handleReject(leave._id)}
                                  className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 flex items-center justify-center transition cursor-pointer"
                                  title="Reject Leave"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => setExpanded(expanded === leave._id ? null : leave._id)}
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center transition cursor-pointer"
                              title="Toggle Details"
                            >
                              {expanded === leave._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expanded === leave._id && (
                        <tr>
                          <td colSpan={8} className="bg-slate-50 p-6 border-b border-slate-200">
                            <div className="grid gap-6 md:grid-cols-2 text-xs">
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-700">
                                    <User size={15} />
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Employee Name</p>
                                    <h3 className="font-bold text-slate-900">{leave.employeeName}</h3>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-700">
                                    <Calendar size={15} />
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Applied On</p>
                                    <h3 className="font-mono text-slate-900 font-bold">
                                      {leave.createdAt ? new Date(leave.createdAt).toLocaleString() : "-"}
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-indigo-700 mt-0.5">
                                    <FileText size={15} />
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Reason</p>
                                    <p className="mt-1 whitespace-pre-wrap font-medium text-slate-800 leading-relaxed">
                                      {leave.reason || "No reason provided"}
                                    </p>
                                  </div>
                                </div>

                                {leave.rejectionReason && (
                                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                                    <p className="text-[10px] uppercase font-extrabold text-rose-800">Rejection Reason</p>
                                    <p className="mt-0.5 font-medium text-rose-900">{leave.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HRLayout>
  );
}