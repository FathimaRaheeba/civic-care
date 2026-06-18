import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi2';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import CivicCareLogo from './CivicCareLogo';

export default function SignUp() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50/40 to-purple-50/30 flex flex-col items-center justify-center p-4 font-sans antialiased">
      
      <CivicCareLogo />

      <div className="w-full max-w-[440px] bg-white rounded-[28px] border border-slate-100/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="bg-slate-50/60 p-2 flex border-b border-slate-100">
          <Link to="/signin" className="flex-1 text-center py-2.5 text-sm font-bold rounded-xl text-slate-400 hover:text-slate-600 transition-all">
            Sign In
          </Link>
          <div className="flex-1 text-center py-2.5 text-sm font-bold rounded-xl bg-white text-slate-900 shadow-xs select-none">
            Sign Up
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create account</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Join thousands making Kerala better</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Full Name</label>
              <div className="relative flex items-center">
                <HiOutlineUser className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input type="text" placeholder="Your full name" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-purple-500 font-medium text-slate-800 placeholder-slate-300" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Email</label>
              <div className="relative flex items-center">
                <HiOutlineEnvelope className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input type="email" placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-purple-500 font-medium text-slate-800 placeholder-slate-300" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Password</label>
              <div className="relative flex items-center">
                <HiOutlineLockClosed className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input type="password" placeholder="Min. 6 characters" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-purple-500 font-medium text-slate-800 placeholder-slate-300" />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Confirm Password</label>
              <div className="relative flex items-center">
                <HiOutlineLockClosed className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input type="password" placeholder="Re-enter your password" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-purple-500 font-medium text-slate-800 placeholder-slate-300" />
              </div>
            </div>

            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-1.5 transform active:scale-98 transition-all">
              <span>Create Account</span>
              <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed px-4">
              By signing up, you agree to our{' '}
              <a href="#terms" className="font-bold text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="#privacy" className="font-bold text-blue-600 hover:underline">Privacy Policy</a>
            </p>
            <p className="text-sm font-medium text-slate-500 pt-2 border-t border-slate-100">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-blue-600 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <Link to="/" className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
        <FiArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}