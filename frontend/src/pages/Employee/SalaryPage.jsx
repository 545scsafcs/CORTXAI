import EmployeeLayout from "../../components/layout/EmployeeLayout";

export default function SalaryPage() {
  return (
    <EmployeeLayout>

      <h1 className="text-5xl font-black">
        Salary
      </h1>

      <div className="mt-10 bg-white/5 rounded-3xl border border-white/10 p-8">

        <h2 className="text-gray-400">
          Current Salary
        </h2>

        <p className="text-6xl font-black mt-4">
          ₹45,000
        </p>

        <button className="mt-8 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold">
          Download Salary Slip
        </button>

      </div>

    </EmployeeLayout>
  );
}