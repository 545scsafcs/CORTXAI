import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "HR", value: 35 },
  { name: "Marketing", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Sales", value: 30 },
];

const colors = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
];

export default function ExpenseChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Expense Distribution
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}