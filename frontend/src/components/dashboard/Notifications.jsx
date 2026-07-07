import { Bell } from "lucide-react";

const notifications = [
"Payroll generated successfully",
"New Lead assigned",
"Warehouse stock updated",
"Nora completed AI analysis"
];

export default function Notifications(){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<div className="flex items-center gap-3 mb-8">

<Bell className="text-cyan-400"/>

<h2 className="text-2xl font-bold">

Notifications

</h2>

</div>

<div className="space-y-5">

{

notifications.map((item,index)=>(

<div
key={index}
className="border-b border-white/10 pb-4"
>

<p>{item}</p>

<p className="text-xs text-gray-500 mt-2">

Just now

</p>

</div>

))

}

</div>

</div>

)

}