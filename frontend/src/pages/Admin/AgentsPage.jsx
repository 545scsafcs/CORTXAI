import AdminLayout from "../../components/layout/AdminLayout";

const agents = [
  "Nora AI",
  "HR Agent",
  "Finance Agent",
  "Inventory Agent",
  "CRM Agent",
  "Sales Agent",
];

export default function AgentsPage() {

  return (

    <AdminLayout>

      <h1 className="text-5xl font-black">

        AI Agents

      </h1>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        {agents.map((agent) => (

          <div
            key={agent}
            className="rounded-3xl bg-white/5 border border-white/10 p-8"
          >

            <div className="text-5xl">

              🤖

            </div>

            <h2 className="text-3xl font-bold mt-6">

              {agent}

            </h2>

            <button className="mt-8 bg-cyan-400 text-black px-5 py-3 rounded-xl">

              Manage

            </button>

          </div>

        ))}

      </div>

    </AdminLayout>

  );

}