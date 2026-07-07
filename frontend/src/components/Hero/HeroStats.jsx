export default function HeroStats() {

    const stats=[
        ["9200+","Businesses"],
        ["$1.8B","Managed"],
        ["60%","Faster Ops"]
    ]

    return(

<div className="flex gap-12 mt-14">

{stats.map((item)=>(
<div key={item[0]}>

<h2 className="text-3xl font-bold text-cyan-400">{item[0]}</h2>

<p className="text-gray-400">{item[1]}</p>

</div>
))}

</div>

    )

}