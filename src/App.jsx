import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import TrendingNow from './components/TrendingNow';
import TrendingTopics from './components/TrendingTopics';
import NearbyUpdates from './components/NearbyUpdates';


import LandingPage from './pages/LandingPage';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import FeedPage from './pages/FeedPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
         <Route path="/feed" element={<FeedPage />} />

        
        <Route path="/trending-now" element={<TrendingNow />} />
        <Route path="/trending-topics" element={<TrendingTopics />} />
        <Route path="/nearby-updates" element={<NearbyUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;