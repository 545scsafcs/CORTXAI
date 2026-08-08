import { useEffect, useState } from "react";

import EmployeeLayout from "../../components/layout/EmployeeLayout";

import { useEmployee } from "../../context/EmployeeContext";

import {

  getEmployeeTodayAttendance,

} from "../../services/attendanceApi";

export default function AttendancePage() {

  const { employee } = useEmployee();

  const [attendance, setAttendance] = useState(null);

  useEffect(() => {

    if (employee?.employeeId) {

      // eslint-disable-next-line react-hooks/immutability
      loadAttendance();

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  async function loadAttendance() {

    try {

      const data =

        await getEmployeeTodayAttendance(

          employee.employeeId

        );

      setAttendance(data);

    }

    catch {

      setAttendance(null);

    }

  }

  return (

    <EmployeeLayout>

      <div className="space-y-8 text-slate-900 font-sans">

        <div>

          <h1 className="text-5xl font-black text-slate-900 font-outfit">

            Attendance

          </h1>

          <p className="text-slate-600 mt-2 font-medium">

            Your attendance overview

          </p>

        </div>

        {/* Top Cards */}

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-6">

            <h3 className="text-slate-500 font-extrabold text-xs uppercase tracking-wider">

              Today's Status

            </h3>

            <h2 className="text-4xl font-black mt-3 text-emerald-600 font-outfit">

              {

                attendance

                  ?

                  attendance.attendanceStatus

                  :

                  "Absent"

              }

            </h2>

          </div>

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-6">

            <h3 className="text-slate-500 font-extrabold text-xs uppercase tracking-wider">

              Check In

            </h3>

            <h2 className="text-4xl font-black mt-3 text-slate-900 font-outfit">

              {

                attendance?.checkIn

                  ?

                  new Date(

                    attendance.checkIn

                  ).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit",

                  })

                  :

                  "--"

              }

            </h2>

          </div>

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-6">

            <h3 className="text-slate-500 font-extrabold text-xs uppercase tracking-wider">

              Check Out

            </h3>

            <h2 className="text-4xl font-black mt-3 text-slate-900 font-outfit">

              {

                attendance?.checkOut

                  ?

                  new Date(

                    attendance.checkOut

                  ).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit",

                  })

                  :

                  "--"

              }

            </h2>

          </div>

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-6">

            <h3 className="text-slate-500 font-extrabold text-xs uppercase tracking-wider">

              Working Hours

            </h3>

            <h2 className="text-4xl font-black mt-3 text-emerald-600 font-outfit">

              {

                attendance

                  ?

                  attendance.workingHours

                  :

                  0

              }h

            </h2>

          </div>

        </div>

        {/* Details */}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-slate-900 font-outfit">

              Today's Attendance

            </h2>

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                📅 Date :

                {" "}

                <span className="text-slate-900 font-bold ml-1">
                {

                  attendance?.date

                    ?

                    new Date(

                      attendance.date

                    ).toLocaleDateString()

                    :

                    "--"

                }
                </span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                🟢 Status :

                {" "}

                <span className="text-emerald-700 font-bold ml-1">
                {

                  attendance

                    ?

                    attendance.attendanceStatus

                    :

                    "--"

                }
                </span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                🕒 Check In :

                {" "}

                <span className="text-slate-900 font-bold ml-1">
                {

                  attendance?.checkIn

                    ?

                    new Date(

                      attendance.checkIn

                    ).toLocaleTimeString([], {

                      hour: "2-digit",

                      minute: "2-digit",

                    })

                    :

                    "--"

                }
                </span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                🕔 Check Out :

                {" "}

                <span className="text-slate-900 font-bold ml-1">
                {

                  attendance?.checkOut

                    ?

                    new Date(

                      attendance.checkOut

                    ).toLocaleTimeString([], {

                      hour: "2-digit",

                      minute: "2-digit",

                    })

                    :

                    "--"

                }
                </span>

              </div>

            </div>

          </div>

          <div className="bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl p-8">

            <h2 className="text-2xl font-bold text-slate-900 font-outfit">

              Summary

            </h2>

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                👤 Name : <span className="text-slate-900 font-bold ml-1">{employee?.firstName} {employee?.lastName}</span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                🆔 ID : <span className="text-slate-900 font-mono font-bold ml-1">{employee?.employeeId}</span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                🏢 Dept : <span className="text-slate-900 font-bold ml-1">{employee?.department}</span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                💼 Role : <span className="text-slate-900 font-bold ml-1">{employee?.designation}</span>

              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm font-semibold text-slate-700">

                ⏱ Working Hours :

                {" "}

                <span className="text-emerald-700 font-bold ml-1">
                {

                  attendance

                    ?

                    attendance.workingHours

                    :

                    0

                }h
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </EmployeeLayout>

  );

}