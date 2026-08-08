import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There are no records to display in this view yet.",
  icon: Icon = FolderOpen,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 font-sans">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-inner">
        <Icon size={28} />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold font-outfit text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 font-sans max-w-sm">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4 skeleton-shimmer-light font-sans">
      <div className="h-4 w-1/3 bg-slate-200 rounded" />
      <div className="h-8 w-2/3 bg-slate-200 rounded" />
      <div className="h-3 w-1/2 bg-slate-100 rounded" />
    </div>
  );
}
