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

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">

              Leave Management

            </h1>

            <p className="mt-2 text-gray-400">

              Manage Employee Leave Requests

            </p>

          </div>

          <div className="rounded-2xl bg-cyan-500/20 px-6 py-3">

            <h2 className="text-xl font-bold">

              Pending :

              {

                leaves.filter(

                  (l)=>

                  l.status==="Pending"

                ).length

              }

            </h2>

          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10">

                  <th className="py-4 text-left">

                    Employee

                  </th>

                  <th className="py-4 text-left">

                    Department

                  </th>

                  <th className="py-4 text-left">

                    Leave

                  </th>

                  <th className="py-4 text-left">

                    From

                  </th>

                  <th className="py-4 text-left">

                    To

                  </th>

                  <th className="py-4 text-left">

                    Days

                  </th>

                  <th className="py-4 text-left">

                    Status

                  </th>

                  <th className="py-4 text-center">

                    Action

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

                        colSpan={8}

                        className="py-10 text-center"

                      >

                        Loading...

                      </td>

                    </tr>

                  )

                  :

                  leaves.length===0

                  ?

                  (

                    <tr>

                      <td

                        colSpan={8}

                        className="py-10 text-center"

                      >

                        No Leave Requests

                      </td>

                    </tr>

                  )

                  :

                  leaves.map((leave)=>(

                   
                    <React.Fragment key={leave._id}>
                    <tr
  className="border-b border-white/10 hover:bg-white/5 transition"
>

                      <td className="py-5">

                        <div className="font-semibold">

                          {leave.employeeName}

                        </div>

                      </td>

                      <td className="py-5">

                        {leave.department}

                      </td>

                      <td className="py-5">

                        {leave.leaveType}

                      </td>

                      <td className="py-5">

                        {

                          new Date(

                            leave.fromDate

                          ).toLocaleDateString()

                        }

                      </td>

                      <td className="py-5">

                        {

                          new Date(

                            leave.toDate

                          ).toLocaleDateString()

                        }

                      </td>

                      <td className="py-5">

                        {leave.totalDays}

                      </td>

                      <td className="py-5">

                        <span

                          className={`

                            px-3

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

                      <td className="py-5">

                        <div className="flex items-center gap-2">


                          {

                            leave.status==="Pending"

                            &&

                              <>

                              <button

                                onClick={()=>

                                  handleApprove(

                                    leave._id

                                  )

                                }

                                className="rounded-lg bg-green-600 p-2 hover:bg-green-700"

                              >

                                <Check size={18}/>

                              </button>

                              <button

                                onClick={()=>

                                  handleReject(

                                    leave._id

                                  )

                                }

                                className="rounded-lg bg-red-600 p-2 hover:bg-red-700"

                              >

                                <X size={18}/>

                              </button>

                              </>

                          }

                          <button

                            onClick={()=>

                              setExpanded(

                                expanded===leave._id

                                ?

                                null

                                :

                                leave._id

                              )

                            }

                            className="rounded-lg bg-cyan-500 p-2 text-black"

                          >

                            {

                              expanded===leave._id

                              ?

                              <ChevronUp size={18}/>

                              :

                              <ChevronDown size={18}/>

                            }

                          </button>

                        </div>

                      </td>

                    </tr>
                  

                    {

                      expanded===leave._id

                      &&

                      <tr>

                        <td

                          colSpan={8}

                          className="bg-[#0f172a] p-6"

                        >

                          <div className="grid gap-6 md:grid-cols-2">
                                                      <div className="space-y-4">

                              <div className="flex items-center gap-3">

                                <User
                                  size={18}
                                  className="text-cyan-400"
                                />

                                <div>

                                  <p className="text-sm text-gray-400">

                                    Employee

                                  </p>

                                  <h3 className="font-semibold">

                                    {leave.employeeName}

                                  </h3>

                                </div>

                              </div>

                              <div className="flex items-center gap-3">

                                <Calendar
                                  size={18}
                                  className="text-cyan-400"
                                />

                                <div>

                                  <p className="text-sm text-gray-400">

                                    Applied On

                                  </p>

                                  <h3>

                                    {

                                      leave.createdAt

                                      ?

                                      new Date(

                                        leave.createdAt

                                      ).toLocaleString()

                                      :

                                      "-"

                                    }

                                  </h3>

                                </div>

                              </div>

                            </div>

                            <div className="space-y-4">

                              <div className="flex items-start gap-3">

                                <FileText
                                  size={18}
                                  className="mt-1 text-cyan-400"
                                />

                                <div>

                                  <p className="text-sm text-gray-400">

                                    Reason

                                  </p>

                                  <p className="mt-1 whitespace-pre-wrap">

                                    {

                                      leave.reason ||

                                      "No reason provided"

                                    }

                                  </p>

                                </div>

                              </div>

                              {

                                leave.rejectionReason

                                &&

                                <div>

                                  <p className="text-sm text-red-400">

                                    Rejection Reason

                                  </p>

                                  <p className="mt-1">

                                    {

                                      leave.rejectionReason

                                    }

                                  </p>

                                </div>

                              }

                            </div>

                          </div>

                        </td>

                      </tr>

                    }

                  </React.Fragment>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </HRLayout>

);

}