"use client";
import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/lib/getSpecs'; // Adjust path if your lib is elsewhere

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getCourses();
      setCourses(data);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans">
      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center border-b border-cyber-navy">
        <div className="flex items-center gap-2">
          <Bot className="text-robot-blue" size={32} />
          <span className="text-2xl font-bold tracking-tighter">ALUMNO GOT TALENT</span>
        </div>
        <Link href="/admin" className="text-sm text-gray-400 hover:text-robot-blue transition-colors">
          Admin Portal
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-navy border border-robot-blue/30 mb-6">
            <Sparkles size={14} className="text-robot-blue" />
            <span className="text-xs font-medium uppercase tracking-widest text-robot-blue">Next-Gen Learning</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            MASTER THE <span className="text-robot-blue">FUTURE.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Join the elite circle of students mastering AI, Robotics, and Computer Engineering. 
            Your startup journey starts here.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-robot-blue text-black px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
              Explore Courses <ArrowRight size={20} />
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Apply as Teacher
            </button>
          </div>
        </div>

        {/* Dynamic Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-cyber-navy/30 border border-white/10 p-8 rounded-2xl hover:border-robot-blue/50 transition-colors group">
              <Rocket className="text-robot-blue mb-6 group-hover:animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-400 mb-6">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-robot-blue font-mono font-bold">{course.price}</span>
                <button className="text-sm font-bold underline underline-offset-4">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}