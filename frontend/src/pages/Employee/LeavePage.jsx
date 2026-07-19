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

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">

              Leave Management

            </h1>

            <p className="text-gray-400 mt-2">

              Apply and Track Your Leave

            </p>

          </div>

          <button

            onClick={()=>

              setShowForm(

                !showForm

              )

            }

            className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"

          >

            Apply Leave

          </button>

        </div>
                {showForm && (

          <form

            onSubmit={submitLeave}

            className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-6"

          >

            <div className="grid lg:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2">

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

                  className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"

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

                <label className="block mb-2">

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

                  className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"

                />

              </div>

              <div>

                <label className="block mb-2">

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

                  className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"

                />

              </div>

              <div>

                <label className="block mb-2">

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

                  className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"

                />

              </div>

            </div>

            <div>

              <label className="block mb-2">

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

                className="w-full rounded-xl bg-slate-900 border border-white/10 p-4"

              />

            </div>

            <button

              type="submit"

              className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold"

            >

              Submit Leave Request

            </button>

          </form>

        )}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

          <h2 className="text-3xl font-bold">

            Leave History

          </h2>

          <div className="overflow-x-auto mt-8">

            <table className="w-full">
                          <thead>

                <tr className="border-b border-white/10">

                  <th className="text-left py-4">

                    Type

                  </th>

                  <th className="text-left py-4">

                    From

                  </th>

                  <th className="text-left py-4">

                    To

                  </th>

                  <th className="text-left py-4">

                    Days

                  </th>

                  <th className="text-left py-4">

                    Reason

                  </th>

                  <th className="text-left py-4">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  loading

                  ?

                  (

                    <tr>

                      <td

                        colSpan={6}

                        className="py-8 text-center text-gray-400"

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

                        className="py-8 text-center text-gray-400"

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

                        className="border-b border-white/10"

                      >

                        <td className="py-4">

                          {leave.leaveType}

                        </td>

                        <td className="py-4">

                          {

                            new Date(

                              leave.fromDate

                            ).toLocaleDateString()

                          }

                        </td>

                        <td className="py-4">

                          {

                            new Date(

                              leave.toDate

                            ).toLocaleDateString()

                          }

                        </td>

                        <td className="py-4">

                          {leave.totalDays}

                        </td>

                        <td className="py-4">

                          {leave.reason}

                        </td>

                        <td className="py-4">

                          <span

                            className={`

                              px-4

                              py-2

                              rounded-full

                              text-sm

                              font-semibold

                              ${

                                leave.status==="Approved"

                                ?

                                "bg-green-600"

                                :

                                leave.status==="Rejected"

                                ?

                                "bg-red-600"

                                :

                                "bg-yellow-500 text-black"

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