import DashboardLayout from "../../components/layout/DashboardLayout";
import {
Wallet,
Receipt,
TrendingUp,
CircleDollarSign,
Plus
} from "lucide-react";

const invoices = [
{
id:"INV-1001",
client:"ABC Pvt Ltd",
amount:"₹45,000",
status:"Paid"
},
{
id:"INV-1002",
client:"XYZ Industries",
amount:"₹18,500",
status:"Pending"
},
{
id:"INV-1003",
client:"TechNova",
amount:"₹82,000",
status:"Paid"
},
{
id:"INV-1004",
client:"Sky Solutions",
amount:"₹12,800",
status:"Pending"
}
];

export default function FinancePage(){

return(

<DashboardLayout>

<div className="space-y-8">

<div className="flex justify-between items-center">

<div>

<h1 className="text-5xl font-black">

Finance

</h1>

<p className="text-gray-400 mt-2">

Track revenue, invoices and expenses.

</p>

</div>

<button className="flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 rounded-xl">

<Plus size={18}/>

New Invoice

</button>

</div>

<div className="grid lg:grid-cols-4 gap-6">

<Card title="Revenue" value="₹2.4 Cr" icon={<TrendingUp/>}/>

<Card title="Expenses" value="₹78 L" icon={<Wallet/>}/>

<Card title="Invoices" value="248" icon={<Receipt/>}/>

<Card title="Profit" value="₹1.62 Cr" icon={<CircleDollarSign/>}/>

</div>

<div className="rounded-3xl bg-white/5 border border-white/10 p-8">

<h2 className="text-2xl font-bold mb-8">

Recent Invoices

</h2>

<table className="w-full">

<thead>

<tr className="text-left text-gray-400">

<th>ID</th>

<th>Client</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

invoices.map((invoice)=>(

<tr key={invoice.id} className="border-t border-white/10">

<td className="py-5">

{invoice.id}

</td>

<td>

{invoice.client}

</td>

<td>

{invoice.amount}

</td>

<td>

<span className={`font-semibold ${
invoice.status==="Paid"
?"text-green-400"
:"text-yellow-400"
}`}>

{invoice.status}

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