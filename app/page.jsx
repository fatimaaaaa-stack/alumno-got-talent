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
        {/* FLOATING INTERACTIVE BOT */}
<div className="fixed bottom-10 right-10 z-[100] group">
  <div className="absolute -top-16 right-0 bg-robot-blue text-black px-4 py-2 rounded-2xl font-bold text-xs animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">
    Hi! Ready to master the future?
  </div>
  <div className="w-16 h-16 bg-robot-blue rounded-full shadow-[0_0_30px_rgba(0,210,255,0.6)] flex items-center justify-center cursor-pointer hover:scale-110 transition-all border-4 border-black">
    <Bot size={32} className="text-black" />
  </div>
</div>
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
      <section id="team" className="py-24 bg-black px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-black mb-16 text-center uppercase tracking-tighter">
      THE <span className="text-robot-blue text-glow">CORE TEAM</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { name: "Fatima Imran", role: "CEO & Founder", color: "from-blue-500" },
        { name: "Tech Lead", role: "Systems Architect", color: "from-robot-blue" },
        { name: "Growth Lead", role: "Social Media Manager", color: "from-purple-500" },
        { name: "Lead Instructor", role: "Curriculum Head", color: "from-orange-500" },
        { name: "UI/UX Designer", role: "Product Designer", color: "from-green-500" },
        { name: "Operations", role: "Project Manager", color: "from-red-500" }
      ].map((member, i) => (
        <div key={i} className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-robot-blue/50 transition-all duration-500 overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${member.color} to-transparent opacity-10 group-hover:opacity-30 blur-2xl transition-opacity`} />
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Users className="text-robot-blue" size={28} />
          </div>
          <h3 className="text-2xl font-bold">{member.name}</h3>
          <p className="text-robot-blue font-mono text-[10px] uppercase tracking-[0.2em] mt-1 mb-4">{member.role}</p>
          <p className="text-gray-500 text-sm leading-relaxed">Building the future of AGT.</p>
        </div>
      ))}
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