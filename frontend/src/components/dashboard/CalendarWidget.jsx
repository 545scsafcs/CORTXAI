export default function CalendarWidget() {

  const days = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];

  return (

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="text-2xl font-bold mb-8">

        July 2026

      </h2>

      <div className="grid grid-cols-7 gap-3">

        {days.map(day=>(

          <div
            key={day}
            className="text-center text-gray-400"
          >

            {day}

          </div>

        ))}

        {Array.from({length:31},(_,i)=>(

          <button

            key={i}

            className="aspect-square rounded-xl hover:bg-cyan-500/20 transition"

          >

            {i+1}

          </button>

        ))}

      </div>

    </div>

  );

}