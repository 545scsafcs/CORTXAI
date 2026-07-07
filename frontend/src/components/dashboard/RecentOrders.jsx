const orders = [

["#1023","Rahul","₹1200","Completed"],

["#1024","Aman","₹3500","Pending"],

["#1025","Priya","₹800","Completed"],

["#1026","Ankit","₹6400","Completed"],

];

export default function RecentOrders(){

return(

<div className="rounded-3xl bg-white/5 border border-white/10 p-8">

<h2 className="text-2xl font-bold mb-8">

Recent Orders

</h2>

<table className="w-full">

<thead>

<tr className="text-left text-gray-400">

<th>ID</th>

<th>Customer</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

orders.map((item)=>(

<tr key={item[0]} className="border-t border-white/10">

<td className="py-5">{item[0]}</td>

<td>{item[1]}</td>

<td>{item[2]}</td>

<td>

<span className="text-cyan-400">

{item[3]}

</span>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}