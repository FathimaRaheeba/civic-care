import React from 'react';
import { 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiOutlineMapPin, 
  HiOutlineUsers, 
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import { FiX } from 'react-icons/fi';

export default function MobileDrawer({ isOpen, onClose, activeTab, onTabClick }) {
  if (!isOpen) return null;

  const menuItems = [
    { name: 'Home', icon: HiOutlineHome, index: 0 },
    { name: 'Feed', icon: HiOutlineDocumentText, index: 1 },
    { name: 'Map', icon: HiOutlineMapPin, index: 3 },
    { name: 'Communities', icon: HiOutlineUsers, index: 4 },
    { name: 'Resources', icon: HiOutlineBookOpen, index: 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-start select-none">
      
      {/* 
         Overlay Backdrop - Dark blur layer behind the drawer.
         Clicking it closes the sidebar drawer.
      */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
      />

      {/* 
         Drawer Content Panel - Slides in from the left.
         Width bounds mimic modern device drawers (w-[290px] h-full).
      */}
      <div className="relative w-[290px] h-full bg-white flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300 z-10">
        
        <div className="flex flex-col">
          
          {/* Drawer Header with Logo and Close trigger */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-[32px] h-[32px] rounded-[10px] bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center text-white text-xs font-black shadow-xs">
                CC
              </div>
              <span className="bg-gradient-to-r from-[rgb(21,93,252)] to-[rgb(152,16,250)] bg-clip-text text-[18px] font-bold text-transparent tracking-tight">
                CivicCare
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <FiX className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* User Account Profile block named 'Fathima' */}
          <div className="bg-slate-50/50 px-6 py-5 flex items-center gap-3.5 border-b border-slate-100/60">
            <div className="w-[44px] h-[44px] rounded-full bg-[#7D5DF2] flex items-center justify-center text-white shrink-0 shadow-xs">
              <HiOutlineUser className="w-5 h-5 stroke-[2.2]" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-800 leading-tight">Fathima</span>
              <span className="text-[11px] text-slate-400 font-semibold leading-normal truncate max-w-[170px] mt-0.5">
                fathima@civiccare.local
              </span>
              <span className="bg-[#F2EFFF] text-[#7D5DF2] text-[8.5px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 w-max tracking-wider uppercase">
                Citizen
              </span>
            </div>
          </div>

          {/* Primary menu items stack */}
          <nav className="p-4 space-y-1.5 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.index;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onTabClick(item.index);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-bold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-md shadow-blue-500/10' 
                      : 'text-[#344054] hover:text-[#155DFC] hover:bg-slate-50/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* Secondary footer items stack */}
        <div className="p-4 border-t border-slate-100">
          
          <button 
            onClick={() => {
              onTabClick(1); // Scroll to feed/PostManagement section
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-bold text-[#344054] hover:text-[#155DFC] hover:bg-slate-50/50 transition-all duration-300 cursor-pointer"
          >
            <HiOutlineDocumentText className="w-5 h-5 text-slate-400 shrink-0" />
            <span>My Posts</span>
          </button>

          <button 
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-bold text-[#344054] hover:text-[#155DFC] hover:bg-slate-50/50 transition-all duration-300 cursor-pointer"
          >
            <HiOutlineShieldCheck className="w-5 h-5 text-slate-400 shrink-0" />
            <span>Admin Panel</span>
          </button>

          <button 
            onClick={() => {
              onClose();
              window.location.href = '/signin';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-bold text-[#EA4335] hover:bg-red-50/30 transition-all duration-300 cursor-pointer mt-1"
          >
            <FiX className="w-5 h-5 text-[#EA4335] stroke-[2.2] shrink-0" />
            <span>Logout</span>
          </button>

        </div>

      </div>

    </div>
  );
}
