import React from 'react';

export default function LikeCard({ icon: Icon, count, label, iconColor }) {
  return (
    <div className="bg-slate-50/60 border border-slate-100/80 rounded-xl p-3 flex items-center space-x-3 transition-all duration-200 hover:bg-slate-50 hover:border-slate-200">
      <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs border border-slate-100 ${iconColor}`}>
        <Icon className="w-4 h-4 stroke-[2.2]" />
      </div>
      <div>
        <span className="block text-sm font-black text-slate-800 tracking-tight leading-none">
          {count}
        </span>
        <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase block mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}