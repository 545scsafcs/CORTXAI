export default function KPICard({

title,

value,

change

}){

return(

<div className="rounded-3xl bg-white/5 border border-white/10 p-8">

<p className="text-gray-400">

{title}

</p>

<h2 className="text-4xl font-bold mt-4">

{value}

</h2>

<p className="text-cyan-400 mt-5">

{change}

</p>

</div>

)

}