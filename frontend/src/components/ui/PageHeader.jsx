import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  badge,
  badgeColor = "bg-[#0F172A] text-white",
  actions,
  children,
}) {
  return (
    <div className="mb-8 space-y-4 font-sans">
      {/* Top Breadcrumb & Badge Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="text-slate-400" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-slate-900 transition">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-black">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${badgeColor} shadow-sm`}>
            {badge}
          </span>
        )}
      </div>

      {/* Main Header Content & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-700 mt-1.5 leading-relaxed font-sans font-semibold max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
      </div>

      {/* Custom Secondary Toolbar / Filter Row */}
      {children}
    </div>
  );
}
