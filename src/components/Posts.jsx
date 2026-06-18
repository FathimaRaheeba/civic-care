import React, { useState } from 'react';
import { 
  HiOutlineShare, 
  HiOutlineInformationCircle, 
  HiOutlineChartBar, 
  HiOutlineChevronDown, 
  HiOutlineChevronUp,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye
} from 'react-icons/hi2';
import LikeCard from './LikeCard';

export default function Posts({ tag, categoryColor, title, text, author, date, interactions, stats }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_-5px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-slate-200/80">
      
      {/* Top Badge and Meta Controls Panel */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${categoryColor}`}>
          {tag}
        </span>
        <div className="flex items-center space-x-2 text-slate-400">
          <button className="p-1.5 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><HiOutlineShare className="w-4 h-4" /></button>
          <button className="p-1.5 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><HiOutlineInformationCircle className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Main Narrative Copy Section */}
      <h4 className="text-base font-black text-slate-800 tracking-tight leading-snug mb-1.5">
        {title}
      </h4>
      <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-4xl mb-3.5">
        {text}
      </p>

      {/* Origin Authorship Line */}
      <div className="text-xs font-semibold text-slate-400/90 mb-4 select-none">
        By {author} • {date}
      </div>

      {/* Collapsible Action Drawer Trigger Bar */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border border-slate-100 rounded-xl px-4 py-3 bg-slate-50/40 text-left transition-colors hover:bg-slate-50/80 group focus:outline-hidden"
      >
        <div className="flex items-center space-x-3">
          <HiOutlineChartBar className="w-4 h-4 text-blue-600 stroke-[2.2]" />
          <div>
            <span className="block text-xs font-bold text-slate-700 tracking-tight leading-none">Engagement Insights</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">{interactions} total interactions</span>
          </div>
        </div>
        {isOpen ? (
          <HiOutlineChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform" />
        ) : (
          <HiOutlineChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform" />
        )}
      </button>

      {/* Drawer Drawer Body Canvas Grid via Component 28 */}
      {isOpen && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3 pt-1 animate-fadeIn">
          <LikeCard icon={HiOutlineHeart} count={stats.likes} label="Likes" iconColor="text-rose-500" />
          <LikeCard icon={HiOutlineChatBubbleLeftRight} count={stats.comments} label="Comments" iconColor="text-blue-500" />
          <LikeCard icon={HiOutlineShare} count={stats.shares} label="Shares" iconColor="text-emerald-500" />
          <LikeCard icon={HiOutlineEye} count={stats.views} label="Views" iconColor="text-purple-500" />
        </div>
      )}

    </div>
  );
}