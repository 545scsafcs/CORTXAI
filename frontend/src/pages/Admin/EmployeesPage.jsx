import AdminLayout from "../../components/layout/AdminLayout";

export default function EmployeesPage() {
  return (
    <AdminLayout>

      <h1 className="text-5xl font-black">Employees</h1>

      <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-8">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-white/10">

              <th className="pb-4">Name</th>

              <th className="pb-4">Department</th>

              <th className="pb-4">Role</th>

              <th className="pb-4">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="py-5">Vineet Yadav</td>

              <td>Development</td>

              <td>Software Intern</td>

              <td className="text-green-400">Active</td>

            </tr>

            <tr>

              <td className="py-5">Rahul Verma</td>

              <td>HR</td>

              <td>Manager</td>

              <td className="text-green-400">Active</td>

            </tr>

            <tr>

              <td className="py-5">Priya Sharma</td>

              <td>Finance</td>

              <td>Executive</td>

              <td className="text-yellow-400">On Leave</td>

            </tr>

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}