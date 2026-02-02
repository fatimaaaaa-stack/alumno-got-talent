"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // This simulates the data being sent to your Google Sheet Applications tab
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-robot-blue/50 to-transparent" />

      <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 p-10 rounded-[2rem] shadow-2xl relative">
        <Link href="/" className="absolute -top-12 left-0 flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-robot-blue transition-colors">
          <ArrowLeft size={14} /> Back to HQ
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Bot className="text-robot-blue animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">Faculty Recruitment</span>
        </div>
        
        {!submitted ? (
          <>
            <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Join the <span className="text-robot-blue">Elite.</span></h1>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">We are looking for the best in AI, Robotics, and Computer Engineering.</p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-gray-500 ml-1">Full Name</label>
                <input required type="text" className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all text-sm font-medium" placeholder="e.g. Dr. Aris" />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-gray-500 ml-1">Specialization</label>
                <select className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all text-sm appearance-none cursor-pointer">
                  <option>Artificial Intelligence</option>
                  <option>Robotics & Automation</option>
                  <option>Digital Image Processing</option>
                  <option>Full Stack Engineering</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-gray-500 ml-1">LinkedIn / Portfolio URL</label>
                <input required type="url" className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all text-sm font-medium" placeholder="https://..." />
              </div>

              <button disabled={loading} type="submit" className="w-full bg-robot-blue text-black font-black py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(0,210,255,0.3)] disabled:opacity-50 transition-all uppercase tracking-widest text-xs mt-6">
                {loading ? 'Analyzing Credentials...' : 'Submit Application'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-robot-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-robot-blue/20">
              <CheckCircle className="text-robot-blue" size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase mb-3">Transmission Successful</h2>
            <p className="text-gray-500 text-xs leading-relaxed mb-8 px-4">Your profile has been added to our recruitment queue. Our lead engineers will review your CV within 48 hours.</p>
            <Link href="/">
              <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Dismiss
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}