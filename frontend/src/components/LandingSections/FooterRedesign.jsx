import React from "react";

export default function FooterRedesign() {
  return (
    <footer className="py-24 bg-[#FCFBF9] text-[#0f172a] border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-start">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-6">
            <h2 className="text-2xl font-black font-outfit tracking-tight text-slate-900">
              CortxAI
            </h2>
            <p className="text-sm text-slate-400 max-w-xs font-sans leading-relaxed">
              The AI Business Operating System. Empowering progressive organizations through autonomous coordination.
            </p>
            <div className="text-xs text-slate-400 font-mono">
              Designed by CORTXAI Design Team.
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6 font-outfit">Product</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-sans">
              <li><a href="#features" className="hover:text-slate-900 transition">Features</a></li>
              <li><a href="#solutions" className="hover:text-slate-900 transition">Solutions</a></li>
              <li><a href="#pricing" className="hover:text-slate-900 transition">Pricing Scale</a></li>
              <li><a href="/login" className="hover:text-slate-900 transition">Portal Login</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6 font-outfit">Developer</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-sans">
              <li><a href="#" className="hover:text-slate-900 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">System APIs</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Status Matrix</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Sovereignty Cloud</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6 font-outfit">Organization</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-sans">
              <li><a href="#" className="hover:text-slate-900 transition">About CORTX</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Compliance Desk</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Legal Columns</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Contact Representative</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-sans gap-4">
          <span>© 2026 CortxAI. All rights reserved globally.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition">Privacy parameters</a>
            <a href="#" className="hover:text-slate-900 transition">Terms of operation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
