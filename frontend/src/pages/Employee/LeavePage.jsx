import EmployeeLayout from "../../components/layout/EmployeeLayout";

export default function LeavePage() {
  return (
    <EmployeeLayout>

      <h1 className="text-5xl font-black">
        Leave Management
      </h1>

      <div className="mt-10 bg-white/5 rounded-3xl border border-white/10 p-8">

        <h2 className="text-3xl font-bold">
          Leave Balance
        </h2>

        <p className="text-6xl font-black mt-5 text-cyan-400">
          12
        </p>

        <button className="mt-8 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold">
          Apply Leave
        </button>

      </div>

    </EmployeeLayout>
  );
}