import React from 'react';
import Posts from './Posts';

export default function PostManagement() {
  const postMockData = [
    {
      id: 1,
      tag: "pothole",
      categoryColor: "bg-orange-50 text-orange-600 border-orange-100",
      title: "Large pothole on Main Street causing accidents",
      text: "There is a dangerous pothole near the intersection that has caused multiple vehicle damages. Immediate attention needed.",
      author: "John Citizen",
      date: "28/05/2026",
      interactions: "295",
      stats: { likes: "45", comments: "12", shares: "13", views: "225" }
    },
    {
      id: 2,
      tag: "water",
      categoryColor: "bg-blue-50 text-blue-600 border-blue-100",
      title: "Water supply irregular in residential area",
      text: "Water supply has been irregular for the past week. Residents are facing difficulties.",
      author: "Sarah Johnson",
      date: "29/05/2026",
      interactions: "209",
      stats: { likes: "32", comments: "14", shares: "8", views: "155" }
    },
    {
      id: 3,
      tag: "garbage",
      categoryColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      title: "Garbage not collected for 2 weeks",
      text: "Municipal workers have not collected garbage from our street for over two weeks. Health hazard.",
      author: "Mike Wilson",
      date: "30/05/2026",
      interactions: "437",
      stats: { likes: "68", comments: "24", shares: "20", views: "325" }
    },
    {
      id: 4,
      tag: "bribe",
      categoryColor: "bg-rose-50 text-rose-600 border-rose-100",
      title: "Bribery demand at Municipal Office",
      text: "Official demanded bribe for issuing building permit. This corruption needs to stop immediately.",
      author: "Anonymous User",
      date: "01/06/2026",
      interactions: "512",
      stats: { likes: "95", comments: "42", shares: "15", views: "360" }
    }
  ];

  return (
    <section className="w-full bg-slate-50/30 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block Section */}
        <div className="flex justify-between items-end border-b border-slate-100 pb-5 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Post Management</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">Manage all reported concerns</p>
          </div>
          <span className="text-xs font-bold text-slate-400 tracking-wide select-none">
            {postMockData.length} total posts
          </span>
        </div>

        {/* Dynamic Card Container Feed Rendering Stack */}
        <div className="space-y-4">
          {postMockData.map((post) => (
            <Posts
              key={post.id}
              tag={post.tag}
              categoryColor={post.categoryColor}
              title={post.title}
              text={post.text}
              author={post.author}
              date={post.date}
              interactions={post.interactions}
              stats={post.stats}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
