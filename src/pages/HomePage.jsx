import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import Dashboard from '../components/Dashboard';
import Report from '../components/Report';
import IssueMap from '../components/IssueMap';
import PostManagement, { defaultPostMockData } from '../components/PostManagement';
import EngagementInsights from '../components/EngagementInsights';
import MobileNavigation from '../components/MobileNavigation';
import MobileDrawer from '../components/MobileDrawer';
import ReportConcernModal from '../components/ReportConcernModal';

export default function HomePage() {
  const navigate = useNavigate();
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userConcerns, setUserConcerns] = useState(() => {
    const saved = localStorage.getItem('civic_care_user_concerns');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const posts = [
    ...userConcerns.map(concern => {
      let categoryColor = "bg-slate-50 text-slate-600 border-slate-100";
      let tag = concern.category.toLowerCase();

      if (tag === 'bribery') {
        categoryColor = "bg-rose-50 text-rose-600 border-rose-100";
        tag = "bribe";
      } else if (tag === 'potholes') {
        categoryColor = "bg-orange-50 text-orange-600 border-orange-100";
        tag = "pothole";
      } else if (tag === 'water') {
        categoryColor = "bg-blue-50 text-blue-600 border-blue-100";
        tag = "water";
      } else if (tag === 'electricity') {
        categoryColor = "bg-yellow-50 text-[#B7791F] border-yellow-100/60";
        tag = "electricity";
      } else if (tag === 'waste') {
        categoryColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
        tag = "garbage";
      }

      return {
        id: concern.id,
        tag: tag,
        categoryColor: categoryColor,
        title: concern.title,
        text: concern.description,
        author: "Fathima",
        date: concern.date,
        interactions: "1",
        stats: { likes: "1", comments: "0", shares: "0", views: "1" }
      };
    }),
    ...defaultPostMockData
  ];

  const handleSubmitConcern = (newConcern) => {
    const concernWithMeta = {
      id: Date.now(),
      category: newConcern.category,
      title: newConcern.title,
      description: newConcern.description,
      location: newConcern.location,
      photo: newConcern.photo,
      date: new Date().toLocaleDateString('en-GB')
    };

    const updatedConcerns = [concernWithMeta, ...userConcerns];
    setUserConcerns(updatedConcerns);
    localStorage.setItem('civic_care_user_concerns', JSON.stringify(updatedConcerns));
    setIsReportModalOpen(false);
  };

  // Smooth scroll handler triggered when mobile bar tabs are clicked
  const handleTabClick = (index) => {
    if (index === 2) {
      navigate('/report-issue'); // Renders dedicated report path without modal interference
      return;
    }

    setActiveMobileTab(index);
    let targetId = '';
    switch (index) {
      case 0:
        targetId = 'home-section';
        break;
      case 1:
        targetId = 'feed-section';
        break;
      case 3:
        targetId = 'map-section';
        break;
      case 4:
        targetId = 'report-section';
        break;
      default:
        break;
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Scroll Spy: Sync active tab highlight state with viewport intersections
  useEffect(() => {
    const sections = ['home-section', 'feed-section', 'map-section', 'report-section'];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'home-section') setActiveMobileTab(0);
          else if (id === 'feed-section') setActiveMobileTab(1);
          else if (id === 'map-section') setActiveMobileTab(3);
          else if (id === 'report-section') setActiveMobileTab(4);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center box-border bg-[linear-gradient(to_right_bottom_in_oklab,rgb(239,246,255)_0%,rgb(250,245,255)_50%,rgb(253,242,248)_100%)] relative text-[16px] font-sans font-normal leading-normal text-[rgb(0,0,0)] antialiased">

      {/* 1. Sticky User Header */}
      <UserHeader onMenuClick={() => setIsDrawerOpen(true)} onPostClick={() => setIsReportModalOpen(true)} />

      {/* Centered bounding box to keep data blocks consistently arranged up to 1324px */}
      <div className="w-full max-w-[1324px] px-[16px] pt-2 pb-[112px] md:pb-[48px] flex flex-col items-center justify-center">

        {/* Main dashboard body components stacked with anchor IDs for scroll-spy */}
        <main className="w-full flex flex-col items-center justify-center mt-0">

          {/* 2. Dashboard metrics block */}
          <div id="home-section" className="w-full scroll-mt-[80px]">
            <Dashboard onOpenInsights={() => setIsInsightsOpen(true)} />
          </div>

          {/* 3. Reports categorizations grid */}
          <div id="report-section" className="w-full scroll-mt-[80px]">
            <Report />
          </div>

          {/* 4. Interactive map */}
          <div id="map-section" className="w-full scroll-mt-[80px]">
            <IssueMap />
          </div>

          {/* 5. Feed feed management listing */}
          <div id="feed-section" className="w-full scroll-mt-[80px]">
            <PostManagement posts={posts} />
          </div>

        </main>

      </div>

      {/* Floating Bottom Navigation Tab Bar */}
      <MobileNavigation
        activeTab={activeMobileTab}
        onTabClick={handleTabClick}
        onPostConcernClick={() => setIsReportModalOpen(true)}
      />

      {/* Drawer navigation panel side menu */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeMobileTab}
        onTabClick={handleTabClick}
      />

      {/* Engagement Insights Modal Dialog Box */}
      {isInsightsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsInsightsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <EngagementInsights onClose={() => setIsInsightsOpen(false)} />
          </div>
        </div>
      )}

      {/* Report a Concern Modal Dialog Box */}
      {isReportModalOpen && (
        <ReportConcernModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleSubmitConcern}
        />
      )}
    </div>
  );
}