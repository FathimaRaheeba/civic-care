import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import LandingPage from './pages/LandingPage';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import FeedPage from './pages/FeedPage';
import MyPosts from './pages/MyPosts';

const WhitePage = () => <div className="min-h-screen w-full bg-white" />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/map" element={<WhitePage />} />
        <Route path="/communities" element={<WhitePage />} />
        <Route path="/resources" element={<WhitePage />} />
        <Route path="/issue-map" element={<WhitePage />} />
        <Route path="/community-board" element={<WhitePage />} />
        <Route path="/dashboard" element={<WhitePage />} />
      </Routes>
    </Router>
  );
}

export default App;