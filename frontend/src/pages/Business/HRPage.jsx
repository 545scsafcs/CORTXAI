import DashboardLayout from "../../components/layout/DashboardLayout";
import {
Users,
UserPlus,
CalendarCheck,
Wallet
} from "lucide-react";

const employees=[
{
name:"Rahul Sharma",
role:"Developer",
status:"Present"
},
{
name:"Priya Singh",
role:"HR",
status:"Leave"
},
{
name:"Aman Verma",
role:"Sales",
status:"Present"
},
{
name:"Neha Gupta",
role:"Finance",
status:"Present"
}
];

export default function HRPage(){

return(

<DashboardLayout>

<div className="space-y-8">

<div className="flex justify-between items-center">

<div>

<h1 className="text-5xl font-black">

HR Management

</h1>

<p className="text-gray-400 mt-2">

Manage employees and payroll.

</p>

</div>

<button className="bg-cyan-400 text-black px-6 py-3 rounded-xl flex gap-2">

<UserPlus size={20}/>

Add Employee

</button>

</div>

<div className="grid lg:grid-cols-4 gap-6">

<Card title="Employees" value="126" icon={<Users/>}/>

<Card title="Present" value="118" icon={<CalendarCheck/>}/>

<Card title="Payroll" value="₹18.2L" icon={<Wallet/>}/>

<Card title="Departments" value="8" icon={<Users/>}/>

</div>

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-bold mb-8">

Employee List

</h2>

<table className="w-full">

<thead>

<tr className="text-left text-gray-400">

<th>Name</th>

<th>Role</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

employees.map(emp=>(

<tr key={emp.name} className="border-t border-white/10">

<td className="py-5">

{emp.name}

</td>

<td>

{emp.role}

</td>

<td>

<span className="text-cyan-400">

{emp.status}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</DashboardLayout>

)

}

function Card({title,value,icon}){

return(

<div className="rounded-3xl bg-white/5 border border-white/10 p-6">

<div className="text-cyan-400">

{icon}

</div>

<p className="text-gray-400 mt-5">

{title}

</p>

<h2 className="text-4xl font-bold mt-3">

{value}

</h2>

</div>

)

}