import DashboardLayout from "../../components/layout/DashboardLayout";
import NoraPanel from "../../components/nora/NoraPanel";

import { useAgent } from "../../context/AgentContext";

const agents = [

{
title:"Nora AI",
id:"nora"
},

{
title:"HR Agent",
id:"hr"
},

{
title:"Finance Agent",
id:"finance"
},

{
title:"Inventory Agent",
id:"inventory"
},

{
title:"CRM Agent",
id:"crm"
},

{
title:"Sales Agent",
id:"sales"
}

];

export default function AIAgentsPage(){

const {agent,setAgent}=useAgent();

return(

<DashboardLayout>

<div className="space-y-10">

<h1 className="text-5xl font-black">

AI Agents

</h1>

<div className="grid lg:grid-cols-3 gap-6">

{

agents.map((item)=>(

<div

key={item.id}

className={`rounded-3xl
p-8
border

${
agent.id===item.id
?

"border-cyan-400"

:

"border-white/10"

}

bg-white/5`}

>

<div className="text-5xl">

🤖

</div>

<h2 className="text-2xl mt-5">

{item.title}

</h2>

<button

onClick={()=>setAgent(item)}

className="mt-6 bg-cyan-400 text-black px-6 py-3 rounded-xl"

>

{

agent.id===item.id

?

"Selected"

:

"Activate"

}

</button>

</div>

))

}

</div>

<NoraPanel/>

</div>

</DashboardLayout>

)

}