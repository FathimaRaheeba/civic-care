import React from 'react';

export default function DistrictHotspotCard({ rank, name, category, count, color, maxCount = 120, isActive, onClick }) {
  // Map color class to progress bar colors
  const barColorClass = color || 'bg-red-500';

  return (
    <div 
      onClick={onClick}
      className={`w-full flex items-center bg-white border rounded-2xl px-5 py-4 transition-all duration-300 ease-out cursor-pointer select-none
        ${isActive 
          ? 'border-slate-800 shadow-md ring-2 ring-slate-800/5 -translate-y-0.5 scale-[1.01]' 
          : 'border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
        }`}
    >
      {/* Rank Counter */}
      <span className="w-8 text-xs font-semibold text-slate-400/80 text-left">
        {rank}
      </span>

      {/* Colored Status Dot Indicator */}
      <div className={`w-2.5 h-2.5 rounded-full ${barColorClass} mx-3 shrink-0 shadow-xs`} />

      {/* District Name */}
      <span className="flex-1 text-sm font-bold text-slate-800 truncate pr-2">
        {name}
      </span>

      {/* Category Type Indicator */}
      <span className="text-xs font-medium text-slate-400 w-24 hidden sm:block text-right pr-4">
        {category}
      </span>

      {/* Progress Bar */}
      <div className="w-24 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden mr-4 shrink-0">
        <div 
          className={`h-full ${barColorClass} rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${Math.min(100, Math.max(5, (count / maxCount) * 100))}%` }}
        />
      </div>

      {/* Quantifiable Data Counter */}
      <span className="w-8 text-xs font-extrabold text-slate-800 text-right">
        {count}
      </span>
    </div>
  );
}