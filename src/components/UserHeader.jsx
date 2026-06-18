import React, { useState } from 'react';
import { 
  HiOutlineHome, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineMap, 
  HiOutlineUsers, 
  HiOutlineBookOpen,
  HiOutlineBell,
  HiOutlineUser,
  HiPlus,
  HiMegaphone
} from 'react-icons/hi2';

export default function UserHeader() {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: HiOutlineHome },
    { name: 'Feed', icon: HiOutlineChatBubbleLeftRight },
    { name: 'Map', icon: HiOutlineMap },
    { name: 'Communities', icon: HiOutlineUsers },
    { name: 'Resources', icon: HiOutlineBookOpen },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-100 font-sans antialiased sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Original Brand Logo Layout */}
        <div className="flex items-center space-x-2.5 shrink-0 select-none">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-xs text-white">
            <HiMegaphone className="w-4 h-4 -rotate-12" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            CivicCare
          </span>
        </div>

        {/* Middle Side: Dynamic Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 stroke-[2.5] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Action Controls & User Account Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          
          {/* Create Post Action Button */}
          <button className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm rounded-full shadow-xs transform active:scale-98 transition-all">
            <HiPlus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Post</span>
          </button>

          {/* Notification Alert System */}
          <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            <HiOutlineBell className="w-5 h-5 stroke-[2.2]" />
            {/* Notification Badge Bubble */}
            <span className="absolute top-1 right-1 bg-rose-500 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
              2
            </span>
          </button>

          {/* User Account Panel Profile Block */}
          <div className="flex items-center space-x-2.5 pl-1 sm:pl-2 border-l border-slate-100 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 transition-transform group-hover:scale-105">
              <HiOutlineUser className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 hidden lg:inline max-w-[140px] truncate select-none">
              Anonymous User 1109
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}