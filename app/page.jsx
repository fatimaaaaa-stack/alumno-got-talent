"use client";
import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, Rocket, ArrowRight, Users, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/lib/getSpecs';

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
    <div className="min-h-screen bg-black text-white selection:bg-robot-blue selection:text-black">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Bot className="text-robot-blue group-hover:rotate-12 transition-transform" size={32} />
            <span className="text-xl font-black tracking-tighter">ALUMNO GOT TALENT</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#courses" className="hover:text-robot-blue transition-colors">Courses</a>
            <a href="#team" className="hover:text-robot-blue transition-colors">Team</a>
            <Link href="/admin" className="hover:text-robot-blue transition-colors">Admin Portal</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-40 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-robot-blue/10 border border-robot-blue/20 mb-8">
          <Sparkles size={14} className="text-robot-blue" />
          <span className="text-xs font-bold uppercase tracking-widest text-robot-blue">Next-Gen EdTech</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
          MASTER THE <span className="text-robot-blue drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">FUTURE.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join the elite circle of students mastering AI, Robotics, and Computer Engineering. 
          Your startup journey starts here.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#courses">
            <button className="bg-robot-blue text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
              Explore Courses <ArrowRight size={20} />
            </button>
          </a>
          <Link href="/apply">
            <button className="bg-white/5 border border-white/10 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Apply as Teacher
            </button>
          </Link>
        </div>
      </header>

      {/* DYNAMIC COURSES GRID */}
      <section id="courses" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight">Available Masterclasses</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-robot-blue/50 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-robot-blue/50 transition-all duration-500 hover:-translate-y-2">
              <Rocket className="text-robot-blue mb-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-robot-blue font-mono font-black text-xl">{course.price}</span>
                <Link href={`https://wa.me/923000000000?text=I'm interested in ${course.title}`}>
                  <button className="text-xs font-black uppercase tracking-widest hover:text-robot-blue transition-colors">Enroll Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-24 bg-white/[0.01] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 uppercase">The Core Team</h2>
            <p className="text-gray-500">The engineers behind the Alumno Got Talent revolution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder Card */}
            <div className="p-8 rounded-3xl bg-black border border-white/10 text-center group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-robot-blue to-purple-600 mx-auto mb-6 shadow-[0_0_20px_rgba(0,210,255,0.2)]" />
              <h3 className="text-xl font-bold">Fatima Imran</h3>
              <p className="text-robot-blue font-mono text-xs uppercase tracking-widest mb-4">Founder & Lead Dev</p>
              <div className="flex justify-center gap-4 text-gray-500">
                <Mail size={18} className="hover:text-white cursor-pointer" />
                <Users size={18} className="hover:text-white cursor-pointer" />
              </div>
            </div>
            {/* Future Team Slots */}
            <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center opacity-50">
              <span className="text-gray-600 text-sm font-mono tracking-widest uppercase italic">Position Open</span>
            </div>
            <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center opacity-50">
              <span className="text-gray-600 text-sm font-mono tracking-widest uppercase italic">Position Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-white/5 text-center text-gray-600 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; 2026 Alumno Got Talent / Systems Operational
      </footer>
    </div>
  );
}