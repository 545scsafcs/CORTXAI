import EmployeeLayout from "../../components/layout/EmployeeLayout";

export default function ProfilePage() {
  return (
    <EmployeeLayout>

      <h1 className="text-5xl font-black">
        Employee Profile
      </h1>

      <div className="mt-10 bg-white/5 rounded-3xl border border-white/10 p-10 max-w-xl">

        <div className="w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-bold">
          V
        </div>

        <h2 className="text-4xl font-bold mt-8">
          Vineet Yadav
        </h2>

        <p className="text-gray-400 mt-2">
          Software Engineer Intern
        </p>

        <div className="space-y-3 mt-8">

          <p>📧 vineet@email.com</p>

          <p>📱 +91 XXXXX XXXXX</p>

          <p>🏢 CORTXAI</p>

          <p>🆔 EMP001</p>

        </div>

      </div>

    </EmployeeLayout>
  );
}