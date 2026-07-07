const team=[

["HR",94],

["Sales",82],

["Finance",76],

["CRM",89],

["Support",91]

]

export default function TeamPerformance(){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-bold mb-8">

Team Performance

</h2>

<div className="space-y-6">

{

team.map(([name,value])=>(

<div key={name}>

<div className="flex justify-between mb-2">

<span>{name}</span>

<span>{value}%</span>

</div>

<div className="h-3 rounded-full bg-white/10">

<div

className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"

style={{

width:`${value}%`

}}

>

</div>

</div>

</div>

))

}

</div>

</div>

)

}