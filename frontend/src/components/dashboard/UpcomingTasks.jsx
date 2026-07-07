const tasks = [

"Review Payroll",

"Approve Leave",

"Inventory Audit",

"Generate GST Report",

"Call Premium Client"

];

export default function UpcomingTasks(){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-bold mb-8">

Upcoming Tasks

</h2>

<div className="space-y-5">

{

tasks.map(task=>(

<div

key={task}

className="rounded-xl bg-white/5 p-4"

>

{task}

</div>

))

}

</div>

</div>

)

}