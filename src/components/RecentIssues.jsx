import React from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import RecentIssuesCard from './RecentIssuesCard';

export default function RecentIssues() {
  const issuesData = [
    {
      id: 1,
      title: "Pothole on MG Road causing accidents",
      location: "Ernakulam",
      status: "pending",
      likes: 234,
      comments: 45,
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Water supply disruption for 3 days",
      location: "Thiruvananthapuram",
      status: "in progress",
      likes: 189,
      comments: 32,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Garbage not collected in residential area",
      location: "Kochi",
      status: "pending",
      likes: 156,
      comments: 28,
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Street lights not working for weeks",
      location: "Kozhikode",
      status: "resolved",
      likes: 301,
      comments: 67,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <HiOutlineExclamationTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
            Recent Issues
          </h2>
        </div>

        <a
          href="#all"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {issuesData.map((issue) => (
          <RecentIssuesCard
            key={issue.id}
            {...issue}
          />
        ))}
      </div>

    </section>
  );
}