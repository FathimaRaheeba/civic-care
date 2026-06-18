import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import CivicCareLogo from './CivicCareLogo';

export default function SignIn() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50/40 to-purple-50/30 flex flex-col items-center justify-center p-4 font-sans antialiased">
      
      <CivicCareLogo />

      <div className="w-full max-w-[440px] bg-white rounded-[28px] border border-slate-100/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="bg-slate-50/60 p-2 flex border-b border-slate-100">
          <div className="flex-1 text-center py-2.5 text-sm font-bold rounded-xl bg-white text-slate-900 shadow-xs select-none">
            Sign In
          </div>
          <Link to="/signup" className="flex-1 text-center py-2.5 text-sm font-bold rounded-xl text-slate-400 hover:text-slate-600 transition-all">
            Sign Up
          </Link>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Sign in to your CivicCare account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                <input type="password" placeholder="Enter your password" className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-purple-500 font-medium text-slate-800 placeholder-slate-300" />
              </div>
            </div>

            <div className="flex justify-end pt-0.5">
              <a href="#forgot" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-1.5 transform active:scale-98 transition-all">
              <span>Sign In</span>
              <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Separator Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-300 tracking-wide uppercase">or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Google SSO Button */}
          <button className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl flex items-center justify-center space-x-2.5 shadow-xs transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.444 2.244 15.63 1 12.24 1A11 11 0 0 0 1.24 12a11 11 0 0 0 11 11c5.73 0 9.543-4.033 9.543-9.715 0-.653-.07-1.154-.156-1.585H12.24z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-blue-600 hover:underline">Sign up free</Link>
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