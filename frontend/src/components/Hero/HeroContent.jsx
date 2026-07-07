import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="relative z-10 w-[45%]">

      <span className="text-cyan-400 font-semibold">
        AI Business Command Center
      </span>

      <h1 className="mt-8 text-7xl font-black leading-[1.05]">

<span className="text-white">
AI Powered
</span>

<br/>

<span className="bg-gradient-to-r
from-cyan-300
to-blue-500
bg-clip-text
text-transparent">

Business OS

</span>

</h1>

     <p className="mt-8 text-xl leading-9 text-slate-300 max-w-xl">

Run HR, CRM, Inventory, Finance,
Sales and AI Agents from a single
intelligent operating system powered
by Nora.

</p>
      <HeroButtons />

      <HeroStats />

    </div>
  );
}