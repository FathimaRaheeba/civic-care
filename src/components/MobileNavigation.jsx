import React from 'react';
import { 
  HiHome, 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiMegaphone, 
  HiOutlineMapPin, 
  HiOutlineUsers 
} from 'react-icons/hi2';

export default function MobileNavigation({ activeTab, onTabClick, onPostConcernClick }) {
  const items = [
    { name: 'Home', iconOutline: HiOutlineHome, iconSolid: HiHome, index: 0 },
    { name: 'Feed', iconOutline: HiOutlineDocumentText, iconSolid: HiOutlineDocumentText, index: 1 },
    { name: 'Post Concern', iconOutline: HiMegaphone, iconSolid: HiMegaphone, index: 2, isFab: true },
    { name: 'Map', iconOutline: HiOutlineMapPin, iconSolid: HiOutlineMapPin, index: 3 },
    { name: 'Communities', iconOutline: HiOutlineUsers, iconSolid: HiOutlineUsers, index: 4 }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[430px] h-[68px] z-45 md:hidden flex items-end select-none">
      {/* 
         Unified Background Canvas with SVG curved middle hump.
         Apply backdrop-blur-lg, transparent white layers, and a refractive glass top border path.
      */}
      <div className="absolute inset-0 flex items-end pointer-events-none z-0 filter drop-shadow-[0_12px_28px_rgba(108,93,211,0.1)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.01)]">
        {/* Left wing background pill section with high-transparency frosted glass */}
        <div className="h-[56px] flex-1 bg-white/40 backdrop-blur-lg rounded-l-[28px] border-y border-l border-white/30" />
        
        {/* Center hump container with crop mask to restrict backdrop blur strictly to the curved shape */}
        <div 
          className="w-[84px] h-[68px] relative -mb-[1px] -mx-[0.5px] backdrop-blur-lg"
          style={{ clipPath: 'url(#hump-clip)' }}
        >
          <svg viewBox="0 0 84 68" className="w-full h-full">
            <defs>
              <clipPath id="hump-clip">
                <path d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12 L 84 68 L 0 68 Z" />
              </clipPath>
            </defs>
            {/* Hump background fill with matching glass opacity */}
            <path 
              d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12 L 84 68 L 0 68 Z" 
              fill="rgba(255, 255, 255, 0.40)"
            />
            {/* Top edge refract highlight outline connecting seamlessly with the wing borders */}
            <path 
              d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.45)" 
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Right wing background pill section with high-transparency frosted glass */}
        <div className="h-[56px] flex-1 bg-white/40 backdrop-blur-lg rounded-r-[28px] border-y border-r border-white/30" />
      </div>

      {/* Button slots layered directly above the shadow outline background */}
      <div className="relative z-10 w-full h-[68px] flex items-end pb-[2px]">
        {items.map((item) => {
          const IconOutline = item.iconOutline;
          const IconSolid = item.iconSolid;
          const isActive = activeTab === item.index;

          if (item.isFab) {
            return (
              <div key={item.name} className="w-[84px] h-[68px] flex flex-col items-center justify-start z-10">
                {/* Raised Circular Gradient Center Action Button */}
                <button
                  onClick={onPostConcernClick}
                  className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#155DFC] to-[#9810FA] flex items-center justify-center shadow-lg shadow-[#155DFC]/20 hover:opacity-95 active:scale-95 transition-all duration-300 cursor-pointer -mt-4.5"
                  aria-label="Post Concern"
                >
                  <HiMegaphone className="w-5 h-5 text-white" />
                </button>
                {/* Label centered below the white background bar line */}
                <span className="text-[9px] font-bold mt-1.5 text-[#155DFC] tracking-tight whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => onTabClick(item.index)}
              className="flex-1 flex flex-col items-center justify-start pt-1.5 h-[56px] z-10 cursor-pointer"
            >
              {/* Highlight background pill wrapper for active items */}
              <div 
                className={`w-[44px] h-[34px] rounded-[12px] flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#F2EFFF] text-[#155DFC]' 
                    : 'bg-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {isActive ? <IconSolid className="w-5 h-5" /> : <IconOutline className="w-5 h-5" />}
              </div>
              
              {/* Icon label text */}
              <span 
                className={`text-[8.5px] font-extrabold mt-1 text-center tracking-tight leading-none max-w-[70px] truncate ${
                  isActive ? 'text-[#155DFC]' : 'text-slate-500'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
