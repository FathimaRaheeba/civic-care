import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuUsers } from 'react-icons/lu';

export default function TrendingCard({ title, location, percentage, views }) {
  return (
    <div className="p-5 bg-[#FFFBF7] border border-orange-100/70 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all duration-200">
      
      {/* Top Row: Title & Percentage Badge */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <h4 className="text-base font-bold text-slate-800 leading-snug tracking-tight">
          {title}
        </h4>
        <span className="bg-red-50 text-red-500 text-xs font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
          {percentage}
        </span>
      </div>

      {/* Bottom Row: Location Info & View Count Metrics */}
      <div className="flex justify-between items-center text-slate-400 text-sm">
        <div className="flex items-center">
          <HiOutlineLocationMarker className="w-4 h-4 mr-1 text-slate-400" />
          <span className="font-medium text-slate-500">{location}</span>
        </div>
        <div className="flex items-center space-x-1 font-semibold text-slate-500">
          <LuUsers className="w-4 h-4 text-slate-400" />
          <span>{views}</span>
        </div>
      </div>

    </div>
  );
}