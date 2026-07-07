import {
Plus,
Users,
Package,
Wallet,
Bot
} from "lucide-react";

const actions = [
{
title:"Add Employee",
icon:Users
},
{
title:"New Product",
icon:Package
},
{
title:"Create Invoice",
icon:Wallet
},
{
title:"Run AI Agent",
icon:Bot
},
{
title:"New Project",
icon:Plus
}
];

export default function QuickActions(){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-bold mb-8">

Quick Actions

</h2>

<div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">

{

actions.map((item)=>{

const Icon=item.icon

return(

<button

key={item.title}

className="rounded-2xl border border-white/10 p-6 hover:bg-cyan-500/10 transition-all duration-300"

>

<Icon className="mx-auto text-cyan-400"/>

<p className="mt-4">

{item.title}

</p>

</button>

)

})

}

</div>

</div>

)

}