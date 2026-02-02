"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/10 p-10 rounded-3xl">
        <h1 className="text-3xl font-black mb-2 uppercase">Teach at AGT</h1>
        <p className="text-gray-500 mb-8 text-sm">Join the next-gen computer engineering faculty.</p>
        
        {!submitted ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <input type="text" placeholder="Full Name" className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all" required />
            <input type="email" placeholder="Email Address" className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all" required />
            <select className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none transition-all">
              <option>AI Specialist</option>
              <option>Robotics Engineer</option>
              <option>Full Stack Developer</option>
            </select>
            <button type="submit" className="w-full bg-robot-blue text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-sm">
              Submit Application
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="text-robot-blue text-5xl mb-4">✓</div>
            <p className="font-bold">Application Received!</p>
            <p className="text-gray-500 text-xs mt-2">We will review your CV within 48 hours.</p>
            <Link href="/"><button className="mt-8 text-xs underline uppercase font-black text-gray-500 hover:text-white">Back to Home</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}