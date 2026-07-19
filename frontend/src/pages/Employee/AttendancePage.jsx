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

      <div className="space-y-8">

        <div>

          <h1 className="text-5xl font-black">

            Attendance

          </h1>

          <p className="text-gray-400 mt-2">

            Your attendance overview

          </p>

        </div>

        {/* Top Cards */}

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Today's Status

            </h3>

            <h2 className="text-4xl font-black mt-3 text-green-400">

              {

                attendance

                  ?

                  attendance.attendanceStatus

                  :

                  "Absent"

              }

            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Check In

            </h3>

            <h2 className="text-4xl font-black mt-3">

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

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Check Out

            </h3>

            <h2 className="text-4xl font-black mt-3">

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

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <h3 className="text-gray-400">

              Working Hours

            </h3>

            <h2 className="text-4xl font-black mt-3 text-cyan-400">

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

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <h2 className="text-3xl font-bold">

              Today's Attendance

            </h2>

            <div className="mt-8 space-y-5">

              <div className="rounded-xl bg-white/5 p-5">

                📅 Date :

                {" "}

                {

                  attendance?.date

                    ?

                    new Date(

                      attendance.date

                    ).toLocaleDateString()

                    :

                    "--"

                }

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                🟢 Status :

                {" "}

                {

                  attendance

                    ?

                    attendance.attendanceStatus

                    :

                    "--"

                }

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                🕒 Check In :

                {" "}

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

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                🕔 Check Out :

                {" "}

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

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <h2 className="text-3xl font-bold">

              Summary

            </h2>

            <div className="mt-8 space-y-5">

              <div className="rounded-xl bg-white/5 p-5">

                👤 {employee?.firstName} {employee?.lastName}

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                🆔 {employee?.employeeId}

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                🏢 {employee?.department}

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                💼 {employee?.designation}

              </div>

              <div className="rounded-xl bg-white/5 p-5">

                ⏱ Working Hours :

                {" "}

                {

                  attendance

                    ?

                    attendance.workingHours

                    :

                    0

                }h

              </div>

            </div>

          </div>

        </div>

      </div>

    </EmployeeLayout>

  );

}