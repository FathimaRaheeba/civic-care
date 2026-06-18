import React from 'react';

export default function HeroSection() {
  return (
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 overflow-hidden bg-gradient-to-tr from-slate-50 via-blue-50/30 to-purple-50/40 text-slate-900 antialiased">      
      {/* Decorative ambient background blur lights to match the mesh gradient look */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Main Heading Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
          Empower Your Community.
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Real Change.
          </span>
        </h1>

        {/* Sub-description Text */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-500 font-normal leading-relaxed mb-16 px-4">
          Join thousands of citizens making their voices heard. Report issues, track progress, and create real change in your community.
        </p>

        {/* Stats Grid Layout with subtle borders */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12 md:space-x-16">
          
          {/* Stat 1 */}
          <div className="text-center sm:pr-12 md:pr-16 sm:border-r border-slate-200 last:border-0 w-full sm:w-auto">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              7.8M+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium uppercase tracking-wider">
              Active Users
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center sm:pr-12 md:pr-16 sm:border-r border-slate-200 last:border-0 w-full sm:w-auto">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              50K+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium uppercase tracking-wider">
              Issues Resolved
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center w-full sm:w-auto">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              15K+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium uppercase tracking-wider">
              Communities
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}