import React from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import RecentIssuesCard from './RecentIssuesCard'; 

export default function RecentIssues() {
  // Local structural mock array corresponding to image_9691fb.jpg data
  const issuesData = [
    {
      id: 1,
      title: "Pothole on MG Road causing accidents",
      location: "Ernakulam",
      status: "pending",
      likes: 234,
      comments: 45,
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=150&auto=format&fit=crop&q=60" 
    },
    {
      id: 2,
      title: "Water supply disruption for 3 days",
      location: "Thiruvananthapuram",
      status: "in progress",
      likes: 189,
      comments: 32,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=150&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Garbage not collected in residential area",
      location: "Kochi",
      status: "pending",
      likes: 156,
      comments: 28,
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=150&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      title: "Street lights not working for weeks",
      location: "Kozhikode",
      status: "resolved",
      likes: 301,
      comments: 67,
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=150&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-50/50 rounded-3xl mt-6">
      {/* Section Header Display matching image_9691fb.jpg */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center space-x-2">
          <HiOutlineExclamationTriangle className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Recent Issues
          </h2>
        </div>
        <a 
          href="#all" 
          className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Grid Stack Mapping Engine */}
      <div className="flex flex-col space-y-4">
        {issuesData.map((issue) => (
          <RecentIssuesCard
            key={issue.id}
            image={issue.image}
            title={issue.title}
            location={issue.location}
            status={issue.status}
            likes={issue.likes}
            comments={issue.comments}
          />
        ))}
      </div>
    </div>
  );
}