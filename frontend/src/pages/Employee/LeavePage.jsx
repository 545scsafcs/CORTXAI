import { useEffect, useState } from "react";

import EmployeeLayout from "../../components/layout/EmployeeLayout";

import { useEmployee } from "../../context/EmployeeContext";

import {

  applyLeave,

  getEmployeeLeaves,

} from "../../services/leave/leaveApi";

export default function LeavePage() {

  const { employee } = useEmployee();

  const [showForm, setShowForm] = useState(false);

  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({

    leaveType: "Casual",

    reason: "",

    fromDate: "",

    toDate: "",

    totalDays: 1,

  });

  useEffect(() => {

    if (employee?.employeeId) {

      loadLeaves();

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  async function loadLeaves() {

    try {

      const data =

        await getEmployeeLeaves(

          employee.employeeId

        );

      setLeaves(data);

    }

    catch {

      setLeaves([]);

    }

    finally {

      setLoading(false);

    }

  }

  async function submitLeave(e) {

    e.preventDefault();

    try {

      await applyLeave({

        employee: employee._id,

        employeeId: employee.employeeId,

        leaveType: form.leaveType,

        reason: form.reason,

        fromDate: form.fromDate,

        toDate: form.toDate,

        totalDays: Number(form.totalDays),

      });

      alert("Leave Applied Successfully");

      setShowForm(false);

      setForm({

        leaveType: "Casual",

        reason: "",

        fromDate: "",

        toDate: "",

        totalDays: 1,

      });

      await loadLeaves();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        err.message

      );

    }

  }

  return (

    <EmployeeLayout>

      <div className="space-y-8 text-slate-900 font-sans">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black text-slate-900 font-outfit">

              Leave Management

            </h1>

            <p className="text-slate-650 mt-2 font-medium">

              Apply and Track Your Leave

            </p>

          </div>

          <button

            onClick={()=>

              setShowForm(

                !showForm

              )

            }

            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition shadow-sm text-sm cursor-pointer"

          >

            Apply Leave

          </button>

        </div>

        {showForm && (

          <form

            onSubmit={submitLeave}

            className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-8 space-y-6"

          >

            <div className="grid lg:grid-cols-2 gap-6">

              <div>

                <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2">

                  Leave Type

                </label>

                <select

                  value={form.leaveType}

                  onChange={(e)=>

                    setForm({

                      ...form,

                      leaveType:e.target.value

                    })

                  }

                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/40 focus:bg-white transition"

                >

                  <option>

                    Casual

                  </option>

                  <option>

                    Sick

                  </option>

                  <option>

                    Earned

                  </option>

                  <option>

                    Emergency

                  </option>

                  <option>

                    Other

                  </option>

                </select>

              </div>

              <div>

                <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2">

                  Total Days

                </label>

                <input

                  type="number"

                  min="1"

                  value={form.totalDays}

                  onChange={(e)=>

                    setForm({

                      ...form,

                      totalDays:e.target.value

                    })

                  }

                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/40 focus:bg-white transition"

                />

              </div>

              <div>

                <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2">

                  From Date

                </label>

                <input

                  type="date"

                  value={form.fromDate}

                  onChange={(e)=>

                    setForm({

                      ...form,

                      fromDate:e.target.value

                    })

                  }

                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/40 focus:bg-white transition"

                />

              </div>

              <div>

                <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2">

                  To Date

                </label>

                <input

                  type="date"

                  value={form.toDate}

                  onChange={(e)=>

                    setForm({

                      ...form,

                      toDate:e.target.value

                    })

                  }

                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/40 focus:bg-white transition"

                />

              </div>

            </div>

            <div>

              <label className="block text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-2">

                Reason

              </label>

              <textarea

                rows={4}

                value={form.reason}

                onChange={(e)=>

                  setForm({

                    ...form,

                    reason:e.target.value

                  })

                }

                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/40 focus:bg-white transition resize-none"

              />

            </div>

            <button

              type="submit"

              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition shadow-sm text-sm cursor-pointer"

            >

              Submit Leave Request

            </button>

          </form>

        )}

        <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-slate-900 font-outfit">

            Leave History

          </h2>

          <div className="overflow-x-auto mt-8">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-200">

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    Type

                  </th>

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    From

                  </th>

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    To

                  </th>

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    Days

                  </th>

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    Reason

                  </th>

                  <th className="text-left py-4 text-slate-900 font-black uppercase text-[11px] tracking-wider">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody className="text-xs font-semibold text-slate-900">

                {

                  loading

                  ?

                  (

                    <tr>

                      <td

                        colSpan={6}

                        className="py-8 text-center text-slate-450"

                      >

                        Loading...

                      </td>

                    </tr>

                  )

                  :

                  leaves.length === 0

                  ?

                  (

                    <tr>

                      <td

                        colSpan={6}

                        className="py-8 text-center text-slate-450"

                      >

                        No Leave Applications Found

                      </td>

                    </tr>

                  )

                  :

                  (

                    leaves.map((leave)=>(

                      <tr

                        key={leave._id}

                        className="border-b border-slate-100"

                      >

                        <td className="py-4 font-bold text-slate-900">

                          {leave.leaveType}

                        </td>

                        <td className="py-4 text-slate-700">

                          {

                            new Date(

                              leave.fromDate

                            ).toLocaleDateString()

                          }

                        </td>

                        <td className="py-4 text-slate-700">

                          {

                            new Date(

                              leave.toDate

                            ).toLocaleDateString()

                          }

                        </td>

                        <td className="py-4 font-mono text-slate-900">

                          {leave.totalDays}

                        </td>

                        <td className="py-4 text-slate-700 max-w-xs truncate">

                          {leave.reason}

                        </td>

                        <td className="py-4">

                          <span

                            className={`

                              px-3

                              py-1.5

                              rounded-full

                              text-[10px]

                              font-extrabold

                              uppercase

                              tracking-wider

                              ${

                                leave.status==="Approved"

                                ?

                                "bg-emerald-100 text-emerald-800 border border-emerald-250"

                                :

                                leave.status==="Rejected"

                                ?

                                "bg-rose-100 text-rose-800 border border-rose-250"

                                :

                                "bg-amber-100 text-amber-800 border border-amber-250"

                              }

                            `}

                          >

                            {leave.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  )

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </EmployeeLayout>

  );

}