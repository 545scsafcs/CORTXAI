 const activity=[

"New employee joined",

"Inventory updated",

"Invoice generated",

"Nora completed payroll",

"Monthly report exported"

]

export default function RecentActivity(){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-bold mb-8">

Recent Activity

</h2>

<div className="space-y-5">

{

activity.map((item,index)=>(

<div

key={index}

className="flex justify-between border-b border-white/10 pb-4"

>

<p>

{item}

</p>

<span className="text-gray-400">

2 min ago

</span>

</div>

))

}

</div>

</div>

)

}