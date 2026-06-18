import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

// Added default values inside the arguments list so it never shows up blank
export default function RecentIssuesCard({ 
  image = "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=150&auto=format&fit=crop&q=60", 
  title = "Pothole on MG Road causing accidents", 
  location = "Ernakulam", 
  status = "pending", 
  likes = 234, 
  comments = 45 
}) {
  
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-red-50 text-red-500';
      case 'in progress':
        return 'bg-amber-50 text-amber-600';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
      
      {/* Visual Thumbnail */}
      <img 
        src={image} 
        alt={title} 
        className="w-full sm:w-24 h-32 sm:h-24 rounded-xl object-cover mb-4 sm:mb-0 sm:mr-5 flex-shrink-0"
      />

      {/* Content Meta Text Block */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate max-w-full">
            {title}
          </h3>
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${getStatusStyles(status)}`}>
            {status}
          </span>
        </div>

        {/* Location Region Row */}
        <div className="flex items-center text-slate-400 text-sm mb-4">
          <HiOutlineLocationMarker className="w-4 h-4 mr-1 text-slate-400" />
          <span className="font-medium">{location}</span>
        </div>

        {/* User Interaction Metrics */}
        <div className="flex items-center space-x-6 text-slate-400 text-sm">
          <div className="flex items-center space-x-1.5 hover:text-indigo-600 cursor-pointer transition-colors">
            <FiThumbsUp className="w-4 h-4" />
            <span className="font-semibold">{likes}</span>
          </div>
          <div className="flex items-center space-x-1.5 hover:text-indigo-600 cursor-pointer transition-colors">
            <FiMessageSquare className="w-4 h-4" />
            <span className="font-semibold">{comments}</span>
          </div>
        </div>
      </div>

    </div>
  );
}