import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineChatBubbleLeft, 
  HiOutlineMapPin, 
  HiOutlineUsers, 
  HiOutlineBookOpen,
  HiOutlineBell,
  HiPlus,
  HiMegaphone,
  HiBars3,
  HiOutlineShieldCheck
} from 'react-icons/hi2';

export default function UserHeader({ onMenuClick, onPostClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", icon: HiOutlineHome, path: "/home" },
    { name: "Feed", icon: HiOutlineChatBubbleLeft, path: "/feed" },
    { name: "Map", icon: HiOutlineMapPin, path: "/issue-map" },
    { name: "Communities", icon: HiOutlineUsers, path: "/community-board" },
    { name: "Resources", icon: HiOutlineBookOpen, path: "/dashboard" },
  ];

  const activeTab = navItems.findIndex(item => location.pathname === item.path) === -1 
    ? 0 
    : navItems.findIndex(item => location.pathname === item.path);


  return (
    <header className="w-full bg-white border-b border-slate-100 font-sans antialiased sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1216px] mx-auto h-[64px] flex items-center justify-between">        
        
        {/* Left Side: Brand Logo Layout */}
        <div 
          onClick={() => navigate('/home')} 
          className="flex items-center space-x-2.5 shrink-0 select-none cursor-pointer"
        >
          {/* Hamburger Menu on Mobile viewports */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick && onMenuClick();
            }}
            className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100/80 rounded-lg cursor-pointer transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            <HiBars3 className="w-5.5 h-5.5 stroke-[2]" />
          </button>

          <div className="w-[40px] h-[40px] rounded-[14px] bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center shadow-xs">
            <HiMegaphone className="w-5 h-5 text-white -rotate-12" />
          </div>
          {/* exact implementation of your gradient styling rules applied directly via text clip formatting */}
          <span className="w-[90.7969px] h-[28px] border-0 border-solid border-[rgba(0,0,0,0.1)] block box-border bg-gradient-to-r from-[rgb(21,93,252)] to-[rgb(152,16,250)] bg-clip-text text-[20px] font-bold leading-[1.4] text-[rgba(0,0,0,0)] tracking-tight">
            CivicCare
          </span>
        </div>

        {/* Middle Side: Navigation Links with slow down duration transition states */}
        <nav className="hidden md:flex items-center relative bg-slate-50 rounded-[18px] p-1">

          {/* Sliding Active Background */}
          <div
            className="absolute top-1 left-1 h-[42px] rounded-[14px]
                       bg-gradient-to-r from-[#155DFC] to-[#9810FA]
                       transition-all duration-[1200ms] ease-in-out"
            style={{
              width:
                activeTab === 0
                  ? "110px"
                  : activeTab === 1
                  ? "110px"
                  : activeTab === 2
                  ? "110px"
                  : activeTab === 3
                  ? "150px"
                  : "140px",

              transform:
                activeTab === 0
                  ? "translateX(0px)"
                  : activeTab === 1
                  ? "translateX(118px)"
                  : activeTab === 2
                  ? "translateX(236px)"
                  : activeTab === 3
                  ? "translateX(354px)"
                  : "translateX(512px)",
            }}
          />

          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative z-10 flex items-center justify-center gap-2
                  h-[42px]
                  font-semibold
                  transition-all duration-700
                  ${
                    index === 0
                      ? "w-[110px]"
                      : index === 1
                      ? "w-[110px]"
                      : index === 2
                      ? "w-[110px]"
                      : index === 3
                      ? "w-[150px]"
                      : "w-[140px]"
                  }
                  ${
                    activeTab === index
                      ? "text-white"
                      : "text-slate-600 hover:text-[#155DFC]"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Action Controls & User Account Profile */}
        <div className="flex items-center space-x-4 shrink-0">
          
          {/* Post Button */}
          <button 
            onClick={onPostClick}
            className="hidden sm:inline-flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-95 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/10 transform active:scale-98 transition-all duration-300 cursor-pointer"
          >
            <HiPlus className="w-4 h-4 stroke-[3]" />
            <span>Post</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full transition-colors duration-300 cursor-pointer">
            <HiOutlineBell className="w-[22px] h-[22px] stroke-[2]" />
            <span className="absolute top-0 right-0 bg-[#EA4335] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              2
            </span>
          </button>

          {/* User Account Panel Profile Block with Dropdown menu */}
          <div ref={dropdownRef} className="relative">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2.5 cursor-pointer group select-none"
            >
              {/* Account avatar updated to show 'F' as the first letter of Fathima */}
              <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center text-white text-sm font-black tracking-tight shadow-2xs transition-transform duration-500 group-hover:scale-105">
                F
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 hidden sm:inline max-w-[140px] truncate transition-colors duration-500">
                Fathima
              </span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3.5 w-[240px] bg-white border border-slate-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Header Profile Summary */}
                <div className="px-4 py-3 flex flex-col text-left">
                  <span className="text-[15px] font-bold text-slate-800 leading-tight">Fathima</span>
                  <span className="text-xs text-slate-400 font-semibold mt-0.5 truncate leading-normal">
                    fathima@civiccare.local
                  </span>
                </div>

                <div className="h-px bg-slate-100 my-2" />

                {/* Dropdown Item Actions */}
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/my-posts');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition text-left cursor-pointer"
                  >
                    <span>My Posts</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#155DFC] hover:bg-slate-50 transition text-left cursor-pointer"
                  >
                    <HiOutlineShieldCheck className="w-5 h-5 text-[#155DFC] stroke-[2.2]" />
                    <span>Admin Panel</span>
                  </button>

                  <button
                    onClick={() => {
                      const confirmLogout = window.confirm('Are you sure you want to logout?');
                      if (confirmLogout) {
                        setIsDropdownOpen(false);
                        navigate('/signin');
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#EA4335] hover:bg-red-50/50 transition text-left cursor-pointer"
                  >
                    <span>Logout</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}