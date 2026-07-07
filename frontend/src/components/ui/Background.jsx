export default function Background(){

return(

<div className="fixed inset-0 -z-10 overflow-hidden">

<div
className="absolute inset-0
bg-[#050816]"
/>

<div
className="absolute
left-1/2
top-1/2
h-[900px]
w-[900px]
-translate-x-1/2
-translate-y-1/2
rounded-full
bg-cyan-500/10
blur-[180px]"
/>

<div
className="absolute
right-0
top-0
h-[600px]
w-[600px]
rounded-full
bg-violet-500/10
blur-[180px]"
/>

<div
className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]
bg-[size:40px_40px]
opacity-30"
/>

</div>

)

}