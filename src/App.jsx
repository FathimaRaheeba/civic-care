import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderLanding from './components/HeaderLanding';
import HeroSection from './components/HeroSection';
import RecentIssues from './components/RecentIssues';
import RecentIssuesCard from './components/RecentIssuesCard';
import Trending from './components/Trending';
import TrendingCard from './components/TrendingCard';
import DistrictHotspots from './components/DistrictHotspots';
import PlatformFeatures from './components/PlatformFeatures';
import AppDownload from './components/AppDownload';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserHeader from './components/UserHeader';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import IssueMap from './components/IssueMap';
import PostManagement from './components/PostManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeaderLanding />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/recent-issues" element={<RecentIssues />} />
        <Route path="/recent-issues-card" element={<RecentIssuesCard />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/hotspots" element={<DistrictHotspots />} />
        <Route path="/features" element={<PlatformFeatures />} />
        <Route path="/download" element={<AppDownload />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userheader" element={<UserHeader />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/issue-map" element={<IssueMap />} />
        <Route path="/post-management" element={<PostManagement />} />
      </Routes>
    </Router>
  );
}

export default App;