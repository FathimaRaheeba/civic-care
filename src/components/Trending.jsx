import React from 'react';
// Correct Heroicons v2 icon name replacement
import { HiArrowTrendingUp } from 'react-icons/hi2'; 
import TrendingCard from './TrendingCard';

export default function Trending() {
  const trendingData = [
    {
      id: 1,
      title: "Corruption in building permit office",
      location: "Ernakulam",
      percentage: "+145%",
      views: "2.3K"
    },
    {
      id: 2,
      title: "Broken bridge endangering lives",
      location: "Kollam",
      percentage: "+98%",
      views: "1.8K"
    },
    {
      id: 3,
      title: "Public park needs maintenance",
      location: "Thrissur",
      percentage: "+76%",
      views: "1.2K"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white">
      {/* Title Segment using the verified HiArrowTrendingUp icon */}
      <div className="flex items-center space-x-2 mb-6">
        <HiArrowTrendingUp className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Trending
        </h2>
      </div>

      {/* Render Stack Grid mapping over TrendingCard child blocks */}
      <div className="flex flex-col space-y-4">
        {trendingData.map((card) => (
          <TrendingCard
            key={card.id}
            title={card.title}
            location={card.location}
            percentage={card.percentage}
            views={card.views}
          />
        ))}
      </div>
    </div>
  );
}