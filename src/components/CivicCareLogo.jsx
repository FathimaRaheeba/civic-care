import React from 'react';
import { HiMegaphone } from 'react-icons/hi2';

export default function CivicCareLogo() {
  return (
    <div className="flex flex-col items-center mb-6 text-center select-none">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md mb-3 text-white">
        <HiMegaphone className="w-6 h-6 -rotate-12" />
      </div>
      <span className="text-2xl font-black text-slate-900 tracking-tight">CivicCare</span>
      <span className="text-xs text-slate-400 font-semibold mt-1">Your voice for community change</span>
    </div>
  );
}