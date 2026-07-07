const data = [
  ["Today's Revenue", "₹3.2L"],
  ["Today's Orders", "54"],
  ["Attendance", "98%"],
  ["AI Requests", "284"],
];

export default function OverviewCards() {
  return (
    <div className="grid lg:grid-cols-4 gap-6">

      {data.map(([title, value]) => (

        <div
          key={title}
          className="rounded-3xl bg-gradient-to-br
          from-cyan-500/10
          to-white/5
          border border-white/10
          p-7"
        >

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {value}
          </h2>

        </div>

      ))}

    </div>
  );
}